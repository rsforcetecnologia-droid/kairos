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
    
    // Garante um timestamp consistente para toda a transação
    const paidAtTimestamp = admin.firestore.FieldValue.serverTimestamp();

    try {
        let professionalName = 'Indefinido';
        if (professionalId) {
            const professionalDoc = await db.collection('professionals').doc(professionalId).get();
            if (professionalDoc.exists) {
                professionalName = professionalDoc.data().name;
            }
        }
        
        // --- NOVO: Busca as configurações financeiras padrão do estabelecimento ---
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
            
            // 1. Validar e Atualizar Estoque (se houver produtos)
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
                    // A venda avulsa presume 1 unidade por item, subtraímos do estoque.
                    const newStock = (productDoc.data().currentStock || 0) - 1; 
                    if (newStock < 0) throw new Error(`Stock insuficiente para o produto ${productItem.name}.`);
                    updates.push({ ref: productDoc.ref, newStock: newStock });
                }
                
                updates.forEach(update => transaction.update(update.ref, { currentStock: update.newStock }));
            }
            
            // 2. Criar Registro de Venda (Sales)
            transaction.set(saleRef, saleData);

            // 3. INTEGRAÇÃO FINANCEIRA: Criar Contas a Receber (financial_receivables)
            const paidDate = new Date().toISOString().split('T')[0];
            payments.forEach(payment => {
                const financialRef = db.collection('financial_receivables').doc();
                transaction.set(financialRef, {
                    establishmentId,
                    description: `Venda Avulsa: ${clientName || 'Cliente Avulso'} (Método: ${payment.method})`,
                    amount: payment.value,
                    dueDate: paidDate, 
                    paymentDate: paidDate,
                    status: 'paid', // Já está pago
                    transactionId: saleRef.id,
                    createdAt: paidAtTimestamp,
                    naturezaId: defaultNaturezaId || null, // USANDO NATUREZA PADRÃO
                    centroDeCustoId: defaultCentroDeCustoId || null, // USANDO CENTRO DE CUSTO PADRÃO
                });
            });
        });
        
        res.status(201).json({ message: 'Venda criada com sucesso!', saleId: saleRef.id });

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
    // Lista para deletar do financeiro fora da transação principal, pois não é essencial
    const financialEntriesToDelete = [];

    try {
        const reopenedSaleData = await db.runTransaction(async (transaction) => {
            const saleDoc = await transaction.get(saleRef);
            if (!saleDoc.exists) throw new Error("Venda não encontrada.");
            
            const saleData = saleDoc.data();
            if (saleData.type !== 'walk-in') throw new Error("Esta função só pode ser usada para reabrir vendas avulsas.");

            // Buscar IDs do financeiro para exclusão posterior
            const financialSnapshot = await db.collection('financial_receivables')
                .where('transactionId', '==', saleId)
                .get();
            financialSnapshot.forEach(doc => financialEntriesToDelete.push(doc.id));
            
            // Devolve os produtos ao stock
            const productsToRestock = saleData.items.filter(item => item.type === 'product');
            if (productsToRestock.length > 0) {
                productsToRestock.forEach(item => {
                    if (!item.id) throw new Error('Item de produto na venda sem ID, não é possível devolver ao stock.');
                });

                const productRefs = productsToRestock.map(item => db.collection('products').doc(item.id));
                const productDocs = await transaction.getAll(...productRefs);
                
                productDocs.forEach(doc => {
                    if (doc.exists) {
                        // Devolve 1 item para cada produto vendido
                        transaction.update(doc.ref, { currentStock: admin.firestore.FieldValue.increment(1) });
                    }
                });
            }

            // Apaga a venda antiga
            transaction.delete(saleRef);
            
            return saleData;
        });

        // Deletar entradas financeiras (fora da transação para evitar bloqueios longos)
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
