// routes/sales.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// --- Helper para limpar ID ---
function cleanId(id) {
    if (!id) return '';
    return String(id).replace(/\D/g, '');
}

// Listar vendas (não implementado)
router.get('/', async (req, res) => {
    res.status(501).json({ message: 'Ainda não implementado' });
});

// Criar nova venda avulsa (PDV) - COM FIDELIDADE DINÂMICA
router.post('/', async (req, res) => {
    const { db } = req;
    const { establishmentId, uid } = req.user;
    const { items, totalAmount, payments, clientName, clientPhone, professionalId, cashierSessionId, discount } = req.body;

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
        
        // 1. Buscar dados do Estabelecimento (Financeiro e Fidelidade)
        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();
        const establishmentData = establishmentDoc.data() || {};
        
        const financialIntegration = establishmentData.financialIntegration || {};
        const { defaultNaturezaId, defaultCentroDeCustoId } = financialIntegration;
        
        // Configurações de Fidelidade
        const loyaltyProgram = establishmentData.loyaltyProgram || {};

        // 2. Calcular Pontos de Fidelidade (MODIFICADO: Apenas Pontos por Visita)
        let pointsToAward = 0;
        if (loyaltyProgram.enabled) {
            // Regra Simplificada: Ignora o tipo configurado e usa sempre Pontos por Visita
            // Se não houver configuração, define 1 ponto padrão por venda
            pointsToAward = parseInt(loyaltyProgram.pointsPerVisit || 1);
        }

        const safeClientId = cleanId(clientPhone);

        const saleData = {
            type: 'walk-in',
            establishmentId,
            items,
            totalAmount: Number(totalAmount),
            discount: discount || null, 
            clientName: clientName || "Cliente Avulso",
            clientPhone: clientPhone || null,
            clientId: safeClientId || null,
            professionalId: professionalId || null,
            professionalName: professionalName,
            cashierSessionId: cashierSessionId || null,
            createdBy: uid,
            status: 'completed', 
            startTime: paidAtTimestamp,
            // Armazena quantos pontos gerou para registro histórico
            loyaltyPointsEarned: pointsToAward, 
            transaction: {
                paidAt: paidAtTimestamp,
                payments: payments,
                totalAmount: Number(totalAmount),
                discount: discount || null 
            }
        };
        
        const saleRef = db.collection('sales').doc();

        await db.runTransaction(async (transaction) => {
            const productsToUpdate = items.filter(item => item.type === 'product');
            
            // 3. Validar e Atualizar Estoque
            if (productsToUpdate.length > 0) {
                // Filtra rewards virtuais
                const realProducts = productsToUpdate.filter(item => item.id && !String(item.id).startsWith('reward-'));

                if (realProducts.length > 0) {
                    const productRefs = realProducts.map(item => db.collection('products').doc(item.id));
                    const productDocs = await transaction.getAll(...productRefs);
                    const updates = [];

                    for (let i = 0; i < productDocs.length; i++) {
                        const productDoc = productDocs[i];
                        const productItem = realProducts[i];
                        if (!productDoc.exists) throw new Error(`Produto ${productItem.name} não encontrado no stock.`);
                        const newStock = (productDoc.data().currentStock || 0) - (productItem.quantity || 1); 
                        updates.push({ ref: productDoc.ref, newStock: newStock });
                    }
                    
                    updates.forEach(update => transaction.update(update.ref, { currentStock: update.newStock }));
                }
            }
            
            // 4. ATUALIZAR PONTOS DO CLIENTE (SE EXISTIR)
            if (safeClientId && pointsToAward > 0) {
                const clientRef = db.collection('clients').doc(safeClientId);
                const clientDoc = await transaction.get(clientRef);
                
                if (clientDoc.exists) {
                    // Incrementa pontos
                    transaction.update(clientRef, { 
                        loyaltyPoints: admin.firestore.FieldValue.increment(pointsToAward),
                        lastVisit: paidAtTimestamp
                    });

                    // Registra no histórico de fidelidade do cliente
                    const historyRef = clientRef.collection('loyaltyHistory').doc();
                    transaction.set(historyRef, {
                        type: 'earn',
                        points: pointsToAward,
                        source: 'sale', 
                        description: 'Compra Avulsa (PDV)',
                        transactionId: saleRef.id,
                        timestamp: paidAtTimestamp
                    });
                }
            }

            // 5. Criar Registro de Venda
            transaction.set(saleRef, saleData);

            // 6. INTEGRAÇÃO FINANCEIRA
            payments.forEach(payment => {
                const installmentCount = payment.installments && payment.installments > 1 ? payment.installments : 1;
                const paymentMethod = payment.method.toLowerCase();
                const paidDate = new Date().toISOString().split('T')[0];

                // CRÉDITO
                if (paymentMethod === 'credito') {
                    const financialRef = db.collection('financial_receivables').doc();
                    const notes = installmentCount > 1 
                        ? `Parcelado em ${installmentCount}x no cartão de crédito`
                        : 'Pagamento à vista no cartão de crédito';

                    transaction.set(financialRef, {
                        establishmentId,
                        description: `Venda Avulsa: ${clientName || 'Cliente Avulso'} (Crédito ${installmentCount}x)`,
                        amount: payment.value,
                        dueDate: paidDate, 
                        paymentDate: paidDate,
                        status: 'paid',
                        transactionId: saleRef.id,
                        createdAt: paidAtTimestamp,
                        naturezaId: defaultNaturezaId || null,
                        centroDeCustoId: defaultCentroDeCustoId || null,
                        notes: notes,
                        paymentDetails: { method: 'credito', installments: installmentCount }
                    });
                    return;
                }

                // CREDIÁRIO
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
                    return;
                }

                // OUTROS (Dinheiro, PIX, Débito)
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
        
        res.status(201).json({ message: 'Venda criada com sucesso!', saleId: saleRef.id, pointsEarned: pointsToAward });

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

            // Buscar lançamentos financeiros para deletar
            const financialSnapshot = await db.collection('financial_receivables')
                .where('transactionId', '==', saleId)
                .get();
            financialSnapshot.forEach(doc => financialEntriesToDelete.push(doc.id));
            
            // Estornar Stock
            const productsToRestock = saleData.items.filter(item => item.type === 'product');
            if (productsToRestock.length > 0) {
                // Filtrar rewards virtuais ao estornar
                const productRefs = productsToRestock
                    .filter(item => item.id && !String(item.id).startsWith('reward-'))
                    .map(item => db.collection('products').doc(item.id));
                
                if (productRefs.length > 0) {
                    const productDocs = await transaction.getAll(...productRefs);
                    productDocs.forEach((doc, index) => {
                        if (doc.exists) {
                            const qty = productsToRestock[index].quantity || 1;
                            transaction.update(doc.ref, { currentStock: admin.firestore.FieldValue.increment(qty) });
                        }
                    });
                }
            }

            // Estornar Pontos de Fidelidade (Se houver cliente vinculado)
            if (saleData.clientId && saleData.loyaltyPointsEarned > 0) {
                const clientRef = db.collection('clients').doc(saleData.clientId);
                const clientDoc = await transaction.get(clientRef);
                if (clientDoc.exists) {
                    transaction.update(clientRef, { 
                        loyaltyPoints: admin.firestore.FieldValue.increment(-saleData.loyaltyPointsEarned) 
                    });
                    
                    // Opcional: Registrar estorno no histórico
                    const historyRef = clientRef.collection('loyaltyHistory').doc();
                    transaction.set(historyRef, {
                        type: 'revert',
                        points: -saleData.loyaltyPointsEarned,
                        source: 'sale_reopen',
                        description: 'Estorno de Venda Avulsa',
                        transactionId: saleId,
                        timestamp: admin.firestore.FieldValue.serverTimestamp()
                    });
                }
            }

            transaction.delete(saleRef);
            return saleData;
        });

        // Deletar financeiro fora da transação principal (ou em batch)
        const batchDeleteFinancial = db.batch();
        financialEntriesToDelete.forEach(id => {
            batchDeleteFinancial.delete(db.collection('financial_receivables').doc(id));
        });
        if (financialEntriesToDelete.length > 0) {
             await batchDeleteFinancial.commit();
        }

        res.status(200).json({ 
            message: 'Venda revertida com sucesso.',
            reopenedSale: reopenedSaleData 
        });
    } catch (error) {
        console.error("Erro ao reabrir venda:", error);
        res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

// ROTA PARA EXCLUIR VENDA AVULSA
router.delete('/:saleId', async (req, res) => {
    const { saleId } = req.params;
    const { establishmentId } = req.user; 
    const { db } = req;
    
    const saleRef = db.collection('sales').doc(saleId);
    const financialEntriesToDelete = [];

    try {
        await db.runTransaction(async (transaction) => {
            const saleDoc = await transaction.get(saleRef);
            if (!saleDoc.exists) throw new Error("Venda não encontrada.");
            
            const saleData = saleDoc.data();
            
            if (saleData.establishmentId !== establishmentId) throw new Error("Acesso negado.");
            if (saleData.type !== 'walk-in') throw new Error("Exclua agendamentos pela agenda.");
            if (saleData.status === 'completed') throw new Error("Venda finalizada: Use 'Reabrir' para estornar valores corretamente.");

            // Devolver estoque se necessário (para vendas pendentes ou canceladas via delete)
            const productsToRestock = (saleData.items || []).filter(item => item.type === 'product');
            if (productsToRestock.length > 0) {
                // Filtrar rewards virtuais ao excluir
                const productRefs = productsToRestock
                    .filter(i => i.id && !String(i.id).startsWith('reward-'))
                    .map(item => db.collection('products').doc(item.id));
                
                if (productRefs.length > 0) {
                    const productDocs = await transaction.getAll(...productRefs);
                    productDocs.forEach((doc, index) => {
                        if (doc.exists) {
                            const qty = productsToRestock[index].quantity || 1;
                            transaction.update(doc.ref, { currentStock: admin.firestore.FieldValue.increment(qty) });
                        }
                    });
                }
            }
            
            const financialSnapshot = await db.collection('financial_receivables').where('transactionId', '==', saleId).get();
            financialSnapshot.forEach(doc => financialEntriesToDelete.push(doc.id));
            
            transaction.delete(saleRef);
        });

        const batch = db.batch();
        financialEntriesToDelete.forEach(id => batch.delete(db.collection('financial_receivables').doc(id)));
        if (financialEntriesToDelete.length > 0) await batch.commit();

        res.status(200).json({ message: 'Venda avulsa excluída com sucesso.' });
    } catch (error) {
        console.error("Erro ao excluir venda avulsa:", error);
        res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;