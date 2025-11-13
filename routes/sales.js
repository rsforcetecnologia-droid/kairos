// routes/sales.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Listar vendas (não implementado)
router.get('/', async (req, res) => {
    res.status(501).json({ message: 'Ainda não implementado' });
});

// Criar nova venda avulsa (PDV) - COM INTEGRAÇÃO FINANCEIRA CORRIGIDA
router.post('/', async (req, res) => {
    const { db } = req;
    const { establishmentId, uid } = req.user;
    const { items, totalAmount, payments, clientName, clientPhone, professionalId, cashierSessionId } = req.body;

    if (!items || items.length === 0 || totalAmount === undefined || !payments) {
        return res.status(400).json({ message: "Dados da venda incompletos." });
    }
    
    const paidAtTimestamp = admin.firestore.FieldValue.serverTimestamp();

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
            startTime: paidAtTimestamp,
            transaction: {
                paidAt: paidAtTimestamp,
                payments: payments,
                totalAmount: Number(totalAmount)
            }
        };
        const saleRef = db.collection('sales').doc();

        await db.runTransaction(async (transaction) => {
            const productsToUpdate = items.filter(item => item.type === 'product');
            
            // 1. Validar e Atualizar Estoque
            if (productsToUpdate.length > 0) {
                productsToUpdate.forEach((item, index) => {
                    if (!item.id || typeof item.id !== 'string' || item.id.trim() === '') {
                        throw new Error(`Item inválido na venda: O ID do produto na posição ${index} está em falta.`);
                    }
                });

                const productRefs = productsToUpdate.map(item => db.collection('products').doc(item.id));
                const productDocs = await transaction.getAll(...productRefs);
                const updates = [];

                for (let i = 0; i < productDocs.length; i++) {
                    const productDoc = productDocs[i];
                    const productItem = productsToUpdate[i];
                    if (!productDoc.exists) throw new Error(`Produto ${productItem.name} não encontrado no stock.`);
                    const newStock = (productDoc.data().currentStock || 0) - 1; 
                    if (newStock < 0) throw new Error(`Stock insuficiente para o produto ${productItem.name}.`);
                    updates.push({ ref: productDoc.ref, newStock: newStock });
                }
                
                updates.forEach(update => transaction.update(update.ref, { currentStock: update.newStock }));
            }
            
            // 2. Criar Registro de Venda
            transaction.set(saleRef, saleData);

            // 3. INTEGRAÇÃO FINANCEIRA (JÁ EXISTENTE E CORRETA)
            payments.forEach(payment => {
                const installmentCount = payment.installments && payment.installments > 1 ? payment.installments : 1;
                const paymentMethod = payment.method.toLowerCase();
                const paidDate = new Date().toISOString().split('T')[0];

                // CRÉDITO: SEMPRE entra à vista, independente de parcelas
                if (paymentMethod === 'credito') {
                    const financialRef = db.collection('financial_receivables').doc();
                    
                    const notes = installmentCount > 1 
                        ? `Parcelado em ${installmentCount}x no cartão de crédito (estabelecimento recebe à vista)`
                        : 'Pagamento à vista no cartão de crédito';

                    transaction.set(financialRef, {
                        establishmentId,
                        description: `Venda Avulsa: ${clientName || 'Cliente Avulso'} (Crédito ${installmentCount}x)`,
                        amount: payment.value, // VALOR TOTAL À VISTA
                        dueDate: paidDate, 
                        paymentDate: paidDate,
                        status: 'paid',
                        transactionId: saleRef.id,
                        createdAt: paidAtTimestamp,
                        naturezaId: defaultNaturezaId || null,
                        centroDeCustoId: defaultCentroDeCustoId || null,
                        notes: notes,
                        paymentDetails: {
                            method: 'credito',
                            installments: installmentCount
                        }
                    });
                    return; // Não processa mais nada para crédito
                }

                // CREDIÁRIO/FIADO: SEMPRE projeta parcelas
                if (paymentMethod === 'crediario') {
                    const installmentValue = parseFloat((payment.value / installmentCount).toFixed(2));
                    let totalButLast = installmentValue * (installmentCount - 1);

                    for (let i = 1; i <= installmentCount; i++) {
                        const currentInstallmentValue = (i === installmentCount) ? payment.value - totalButLast : installmentValue;
                        const dueDate = new Date();
                        if (i > 1) {
                            dueDate.setMonth(dueDate.getMonth() + (i - 1));
                        }
                        const dueDateString = dueDate.toISOString().split('T')[0];
                        const description = `Venda Avulsa: ${clientName || 'Cliente Avulso'} (Parcela ${i}/${installmentCount} - Fiado)`;
                        const financialRef = db.collection('financial_receivables').doc();
                        
                        transaction.set(financialRef, {
                            establishmentId,
                            description,
                            amount: currentInstallmentValue,
                            dueDate: dueDateString,
                            paymentDate: null,
                            status: 'pending',
                            transactionId: saleRef.id,
                            createdAt: paidAtTimestamp,
                            naturezaId: defaultNaturezaId || null,
                            centroDeCustoId: defaultCentroDeCustoId || null,
                        });
                    }
                    return; // Já processou crediário
                }

                // OUTROS MÉTODOS (Dinheiro, PIX, Débito): SEMPRE à vista
                const financialRef = db.collection('financial_receivables').doc();
                transaction.set(financialRef, {
                    establishmentId,
                    description: `Venda Avulsa: ${clientName || 'Cliente Avulso'} (${payment.method})`,
                    amount: payment.value,
                    dueDate: paidDate, 
                    paymentDate: paidDate,
                    status: 'paid',
                    transactionId: saleRef.id,
                    createdAt: paidAtTimestamp,
                    naturezaId: defaultNaturezaId || null,
                    centroDeCustoId: defaultCentroDeCustoId || null,
                });
            });
        });
        
        res.status(201).json({ message: 'Venda criada com sucesso!', saleId: saleRef.id });

    } catch (error) {
        console.error("Erro ao criar venda:", error);
        res.status(500).json({ message: error.message || "Ocorreu um erro no servidor." });
    }
});

// ROTA PARA REABRIR VENDA AVULSA
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
                productsToRestock.forEach(item => {
                    if (!item.id) throw new Error('Item de produto na venda sem ID, não é possível devolver ao stock.');
                });

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

// ROTA PARA EXCLUIR VENDA AVULSA (APENAS 'walk-in')
router.delete('/:saleId', async (req, res) => {
    const { saleId } = req.params;
    const { establishmentId } = req.user; // Pega o ID do estabelecimento do token
    const { db } = req;
    
    const saleRef = db.collection('sales').doc(saleId);
    const financialEntriesToDelete = [];

    try {
        await db.runTransaction(async (transaction) => {
            const saleDoc = await transaction.get(saleRef);
            if (!saleDoc.exists) throw new Error("Venda não encontrada.");
            
            const saleData = saleDoc.data();
            
            // VERIFICAÇÃO DE SEGURANÇA:
            // 1. Só pode excluir se for do mesmo estabelecimento
            // 2. Só pode excluir se for 'walk-in'
            // 3. Só pode excluir se o status for 'confirmed' (em atendimento), NÃO 'completed'
            if (saleData.establishmentId !== establishmentId) {
                throw new Error("Acesso negado.");
            }
            if (saleData.type !== 'walk-in') {
                throw new Error("Não é possível excluir uma comanda de agendamento por aqui. Exclua pela agenda.");
            }
            if (saleData.status === 'completed') {
                throw new Error("Não é possível excluir uma venda avulsa já finalizada. Use a função 'Reabrir'.");
            }

            // Lógica de reverter estoque (igual à de reabrir)
            const productsToRestock = (saleData.items || []).filter(item => item.type === 'product');
            if (productsToRestock.length > 0) {
                productsToRestock.forEach(item => {
                    if (!item.id) throw new Error('Item de produto na venda sem ID, não é possível devolver ao stock.');
                });

                const productRefs = productsToRestock.map(item => db.collection('products').doc(item.id));
                const productDocs = await transaction.getAll(...productRefs);
                
                productDocs.forEach(doc => {
                    if (doc.exists) {
                        // Devolve 1 unidade ao estoque para cada item
                        transaction.update(doc.ref, { currentStock: admin.firestore.FieldValue.increment(1) });
                    }
                });
            }
            
            // Procura e marca para deletar lançamentos financeiros (embora vendas 'confirmed' não devam ter)
            const financialSnapshot = await db.collection('financial_receivables')
                .where('transactionId', '==', saleId)
                .get();
            financialSnapshot.forEach(doc => financialEntriesToDelete.push(doc.id));
            
            // Deleta a venda
            transaction.delete(saleRef);
        });

        // Deleta os lançamentos financeiros fora da transação principal
        const batchDeleteFinancial = db.batch();
        financialEntriesToDelete.forEach(id => {
            batchDeleteFinancial.delete(db.collection('financial_receivables').doc(id));
        });
        if (financialEntriesToDelete.length > 0) {
             await batchDeleteFinancial.commit();
        }

        res.status(200).json({ message: 'Venda avulsa excluída com sucesso.' });
    } catch (error) {
        console.error("Erro ao excluir venda avulsa:", error);
        res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;