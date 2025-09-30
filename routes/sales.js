const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Listar vendas (não implementado)
router.get('/', async (req, res) => {
    res.status(501).json({ message: 'Ainda não implementado' });
});

// Criar nova venda avulsa (PDV) - COM INTEGRAÇÃO FINANCEIRA
router.post('/', async (req, res) => {
    const { db } = req;
    const { establishmentId, uid } = req.user;
    const { items, totalAmount, payments, clientName, clientPhone, professionalId, cashierSessionId } = req.body;

    if (!items || items.length === 0 || totalAmount === undefined || !payments) {
        return res.status(400).json({ message: "Dados da venda incompletos." });
    }
    
    const now = new Date();
    const nowTimestamp = admin.firestore.Timestamp.fromDate(now);

    try {
        let professionalName = 'Indefinido';
        if (professionalId) {
            const professionalDoc = await db.collection('professionals').doc(professionalId).get();
            if (professionalDoc.exists) {
                professionalName = professionalDoc.data().name;
            }
        }
        
        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();
        const financialIntegration = establishmentDoc.data()?.financialIntegration || {};
        const { defaultNaturezaId, defaultCentroDeCustoId } = financialIntegration;

        const saleData = {
            type: 'walk-in',
            establishmentId,
            items,
            totalAmount: Number(totalAmount),
            clientName: clientName || "Cliente Avulso",
            clientPhone: clientPhone || null,
            professionalId: professionalId || null,
            professionalName: professionalName,
            cashierSessionId: cashierSessionId || null,
            createdBy: uid,
            status: 'completed', 
            startTime: nowTimestamp,
            transaction: {
                paidAt: nowTimestamp,
                payments: payments,
                totalAmount: Number(totalAmount)
            }
        };
        const saleRef = db.collection('sales').doc();

        await db.runTransaction(async (transaction) => {
            const productsToUpdate = items.filter(item => item.type === 'product');
            
            if (productsToUpdate.length > 0) {
                const productRefs = productsToUpdate.map(item => db.collection('products').doc(item.id));
                const productDocs = await transaction.getAll(...productRefs);
                
                for (let i = 0; i < productDocs.length; i++) {
                    const productDoc = productDocs[i];
                    if (!productDoc.exists) throw new Error(`Produto ${productsToUpdate[i].name} não encontrado.`);
                    const newStock = (productDoc.data().currentStock || 0) - 1; 
                    if (newStock < 0) throw new Error(`Stock insuficiente para o produto ${productsToUpdate[i].name}.`);
                    transaction.update(productDoc.ref, { currentStock: newStock });
                }
            }
            
            transaction.set(saleRef, saleData);

            payments.forEach(payment => {
                const installmentCount = payment.installments && payment.installments > 1 ? payment.installments : 1;
                const isInstallmentPayment = installmentCount > 1;

                if (!isInstallmentPayment && payment.method !== 'crediario') {
                    const financialRef = db.collection('financial_receivables').doc();
                    const paidDate = now.toISOString().split('T')[0];
                    transaction.set(financialRef, {
                        establishmentId,
                        description: `Venda Avulsa: ${clientName || 'Cliente Avulso'} (Método: ${payment.method})`,
                        amount: payment.value,
                        dueDate: paidDate, 
                        paymentDate: paidDate,
                        status: 'paid',
                        transactionId: saleRef.id,
                        createdAt: nowTimestamp,
                        naturezaId: defaultNaturezaId || null,
                        centroDeCustoId: defaultCentroDeCustoId || null,
                    });
                    return;
                }

                const installmentValue = parseFloat((payment.value / installmentCount).toFixed(2));
                let totalButLast = installmentValue * (installmentCount - 1);

                for (let i = 1; i <= installmentCount; i++) {
                    const currentInstallmentValue = (i === installmentCount) ? payment.value - totalButLast : installmentValue;
                    const dueDate = new Date(now);
                    if (i > 1) {
                        dueDate.setMonth(dueDate.getMonth() + (i - 1));
                    }
                    const dueDateString = dueDate.toISOString().split('T')[0];
                    const description = `Venda Avulsa: ${clientName || 'Cliente Avulso'} (Parcela ${i}/${installmentCount} - ${payment.method})`;
                    const financialRef = db.collection('financial_receivables').doc();
                    
                    const status = 'pending';
                    const paymentDate = null;

                    transaction.set(financialRef, {
                        establishmentId, description, amount: currentInstallmentValue,
                        dueDate: dueDateString, paymentDate, status,
                        transactionId: saleRef.id, createdAt: nowTimestamp,
                        naturezaId: defaultNaturezaId || null,
                        centroDeCustoId: defaultCentroDeCustoId || null,
                    });
                }
            });
        });
        
        // CORREÇÃO: Retorna o objeto completo da venda para o frontend
        const responseData = {
            ...saleData,
            id: saleRef.id,
            startTime: now.toISOString(),
            createdAt: now.toISOString(), // Adicionado para consistência
            transaction: {
                ...saleData.transaction,
                paidAt: now.toISOString()
            }
        };

        res.status(201).json(responseData);

    } catch (error) {
        console.error("Erro ao criar venda:", error);
        res.status(500).json({ message: error.message || "Ocorreu um erro no servidor." });
    }
});

// ROTA PARA REABRIR VENDA AVULSA - LÓGICA ATUALIZADA
router.post('/:saleId/reopen', async (req, res) => {
    const { saleId } = req.params;
    const { db } = req;
    
    const saleRef = db.collection('sales').doc(saleId);
    const financialEntriesToDelete = [];

    try {
        const reopenedSaleData = await db.runTransaction(async (transaction) => {
            const saleDoc = await transaction.get(saleRef);
            if (!saleDoc.exists) throw new Error("Venda não encontrada.");
            
            const saleData = saleDoc.data();
            if (saleData.type !== 'walk-in') throw new Error("Esta função só pode ser usada para reabrir vendas avulsas.");

            const financialSnapshot = await db.collection('financial_receivables')
                .where('transactionId', '==', saleId)
                .get();
            financialSnapshot.forEach(doc => financialEntriesToDelete.push(doc.id));
            
            const productsToRestock = saleData.items.filter(item => item.type === 'product');
            if (productsToRestock.length > 0) {
                const productRefs = productsToRestock.map(item => db.collection('products').doc(item.id));
                const productDocs = await transaction.getAll(...productRefs);
                
                productDocs.forEach(doc => {
                    if (doc.exists) {
                        transaction.update(doc.ref, { currentStock: admin.firestore.FieldValue.increment(1) });
                    }
                });
            }

            transaction.delete(saleRef);
            return saleData;
        });

        const batchDeleteFinancial = db.batch();
        financialEntriesToDelete.forEach(id => {
            batchDeleteFinancial.delete(db.collection('financial_receivables').doc(id));
        });
        if (financialEntriesToDelete.length > 0) {
             await batchDeleteFinancial.commit();
        }

        res.status(200).json({ 
            message: 'Venda revertida com sucesso. A comanda foi carregada para edição.',
            reopenedSale: reopenedSaleData 
        });
    } catch (error) {
        console.error("Erro ao reabrir venda:", error);
        res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;