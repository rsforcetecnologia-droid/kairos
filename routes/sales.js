const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Listar vendas (não implementado)
router.get('/', async (req, res) => {
    res.status(501).json({ message: 'Ainda não implementado' });
});

// Criar nova venda avulsa (PDV)
router.post('/', async (req, res) => {
    const { db } = req;
    const { establishmentId, uid } = req.user;
    const { items, totalAmount, payments, clientName, clientPhone, professionalId, cashierSessionId } = req.body;

    if (!items || items.length === 0 || !totalAmount || !payments) {
        return res.status(400).json({ message: "Dados da venda incompletos." });
    }

    try {
        let professionalName = 'Indefinido';
        if (professionalId) {
            const professionalDoc = await db.collection('professionals').doc(professionalId).get();
            if (professionalDoc.exists) {
                professionalName = professionalDoc.data().name;
            }
        }

        const saleData = {
            type: 'walk-in',
            establishmentId,
            items,
            totalAmount,
            clientName: clientName || "Cliente Avulso",
            clientPhone: clientPhone || null,
            professionalId: professionalId || null,
            professionalName: professionalName,
            cashierSessionId: cashierSessionId || null,
            createdBy: uid,
            status: 'completed', 
            startTime: admin.firestore.FieldValue.serverTimestamp(),
            transaction: {
                paidAt: admin.firestore.FieldValue.serverTimestamp(),
                payments: payments,
                totalAmount: totalAmount
            }
        };
        const saleRef = db.collection('sales').doc();

        await db.runTransaction(async (transaction) => {
            const productsToUpdate = items.filter(item => item.type === 'product');
            if (productsToUpdate.length === 0) {
                transaction.set(saleRef, saleData);
                return;
            }
            
            productsToUpdate.forEach((item, index) => {
                if (!item.id || typeof item.id !== 'string' || item.id.trim() === '') {
                    throw new Error(`Item inválido na venda: O ID do produto na posição ${index} está em falta.`);
                }
            });

            const productRefs = productsToUpdate.map(item => db.collection('products').doc(item.id));
            
            // 1. FASE DE LEITURA
            const productDocs = await transaction.getAll(...productRefs);
            const updates = [];

            // 2. FASE DE VALIDAÇÃO
            for (let i = 0; i < productDocs.length; i++) {
                const productDoc = productDocs[i];
                const productItem = productsToUpdate[i];
                if (!productDoc.exists) throw new Error(`Produto ${productItem.name} não encontrado no stock.`);
                const newStock = (productDoc.data().currentStock || 0) - 1;
                if (newStock < 0) throw new Error(`Stock insuficiente para o produto ${productItem.name}.`);
                updates.push({ ref: productDoc.ref, newStock: newStock });
            }
            
            // 3. FASE DE ESCRITA
            updates.forEach(update => transaction.update(update.ref, { currentStock: update.newStock }));
            transaction.set(saleRef, saleData);
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

    try {
        const reopenedSaleData = await db.runTransaction(async (transaction) => {
            const saleDoc = await transaction.get(saleRef);
            if (!saleDoc.exists) throw new Error("Venda não encontrada.");
            
            const saleData = saleDoc.data();
            if (saleData.type !== 'walk-in') throw new Error("Esta função só pode ser usada para reabrir vendas avulsas.");

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
                        transaction.update(doc.ref, { currentStock: admin.firestore.FieldValue.increment(1) });
                    }
                });
            }

            // Apaga a venda antiga
            transaction.delete(saleRef);
            
            // Retorna os dados da venda que foi apagada para o frontend recriá-la
            return saleData;
        });

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

