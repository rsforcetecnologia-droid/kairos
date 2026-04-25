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

// Criar nova venda avulsa (PDV)
router.post('/', async (req, res) => {
    const { db } = req;
    const { establishmentId, uid } = req.user;
    let { items, totalAmount, payments, clientName, clientPhone, professionalId, cashierSessionId, discount, loyaltyRedemption } = req.body;

    console.log(`>>> [AUDITORIA] Iniciando Nova Venda Avulsa (R$ ${totalAmount})`);

    if (!items || items.length === 0 || totalAmount === undefined || !payments) {
        return res.status(400).json({ message: "Dados da venda incompletos." });
    }
    
    const paidAtTimestamp = admin.firestore.FieldValue.serverTimestamp();
    const safeClientId = cleanId(clientPhone);

    try {
        let professionalName = 'Indefinido';
        if (professionalId) {
            const professionalDoc = await db.collection('professionals').doc(professionalId).get();
            if (professionalDoc.exists) {
                professionalName = professionalDoc.data().name;
            }
        }
        
        // 1. Buscar dados do Estabelecimento
        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();
        const establishmentData = establishmentDoc.data() || {};
        
        const financialIntegration = establishmentData.financialIntegration || {};
        const { defaultNaturezaId, defaultCentroDeCustoId } = financialIntegration;
        const loyaltyProgram = establishmentData.loyaltyProgram || {};

        let pointsToAward = 0;
        const saleRef = db.collection('sales').doc();

        await db.runTransaction(async (transaction) => {
            
            // 🚀 NOVA LÓGICA: INTERCEÇÃO DE PLANOS VIP NO PDV
            let coveredByPlan = false;
            let subscriptionId = null;
            let planDiscount = 0;

            if (safeClientId) {
                const subQuery = await transaction.get(
                    db.collection('client_subscriptions')
                      .where('clientId', '==', safeClientId)
                      .where('status', '==', 'active')
                );

                if (!subQuery.empty) {
                    const subDoc = subQuery.docs[0];
                    const subscription = subDoc.data();

                    // Verifica se existem SERVIÇOS na venda que estão cobertos pelo plano
                    const coveredItems = items.filter(item => 
                        item.type === 'service' && 
                        subscription.servicesIncluded.includes(item.id || item.itemId)
                    );

                    if (coveredItems.length > 0) {
                        const limit = subscription.usageLimit;
                        const currentUsage = subscription.usageCurrentMonth || 0;

                        if (!limit || currentUsage < limit) {
                            coveredByPlan = true;
                            subscriptionId = subDoc.id;

                            // Calcula o desconto apenas sobre os serviços cobertos
                            coveredItems.forEach(item => {
                                const itemPrice = Number(item.price || item.salePrice || 0);
                                const itemQty = Number(item.quantity || 1);
                                planDiscount += (itemPrice * itemQty);
                            });

                            // Garante que o desconto do plano não é maior que o total da venda
                            if (planDiscount > totalAmount) planDiscount = totalAmount;

                            totalAmount = Number(totalAmount) - planDiscount;

                            // Incrementa o uso
                            transaction.update(subDoc.ref, {
                                usageCurrentMonth: admin.firestore.FieldValue.increment(1)
                            });

                            console.log(`[ASSINATURAS] Venda PDV. Cliente ${safeClientId} usou Clube VIP. Desconto: R$ ${planDiscount}`);
                        }
                    }
                }
            }

            // 2. Calcular Pontos de Fidelidade
            if (loyaltyProgram.enabled) {
                // Não ganha pontos de visita se resgatou prémio OU se a venda saiu 100% grátis pelo plano VIP
                if (loyaltyRedemption || (coveredByPlan && totalAmount === 0)) {
                    pointsToAward = 0;
                } else {
                    const rawPoints = loyaltyProgram.pointsPerVisit;
                    pointsToAward = parseInt(rawPoints) > 0 ? parseInt(rawPoints) : 1;
                }
            }

            // 3. Validar e Atualizar Estoque (Produtos)
            const productsToUpdate = items.filter(item => item.type === 'product');
            if (productsToUpdate.length > 0) {
                const realProducts = productsToUpdate.filter(item => item.id && !String(item.id).startsWith('reward-'));

                if (realProducts.length > 0) {
                    const productRefs = realProducts.map(item => db.collection('products').doc(item.id || item.itemId));
                    const productDocs = await transaction.getAll(...productRefs);
                    const updates = [];

                    for (let i = 0; i < productDocs.length; i++) {
                        const productDoc = productDocs[i];
                        const productItem = realProducts[i];
                        if (!productDoc.exists) throw new Error(`Produto não encontrado no stock.`);
                        const newStock = (productDoc.data().currentStock || 0) - (productItem.quantity || 1); 
                        updates.push({ ref: productDoc.ref, newStock: newStock });
                    }
                    
                    updates.forEach(update => transaction.update(update.ref, { currentStock: update.newStock }));
                }
            }
            
            // 4. Atualizar Cliente (Pontos e Dívidas)
            if (safeClientId) {
                const clientRef = db.collection('clients').doc(safeClientId);
                const clientDoc = await transaction.get(clientRef);
                
                if (clientDoc.exists) {
                    if (loyaltyRedemption) {
                        const cost = Number(loyaltyRedemption.cost || 0);
                        if (cost > 0) {
                            transaction.update(clientRef, { 
                                loyaltyPoints: admin.firestore.FieldValue.increment(-cost),
                                lastVisit: paidAtTimestamp
                            });
                            const historyRef = clientRef.collection('loyaltyHistory').doc();
                            transaction.set(historyRef, {
                                type: 'redeem', points: -cost, source: 'sale',
                                description: `Resgate: ${loyaltyRedemption.name || 'Prémio'}`,
                                transactionId: saleRef.id, timestamp: paidAtTimestamp
                            });
                        }
                    } else if (pointsToAward > 0) {
                        transaction.update(clientRef, { 
                            loyaltyPoints: admin.firestore.FieldValue.increment(pointsToAward),
                            lastVisit: paidAtTimestamp
                        });
                        const historyRef = clientRef.collection('loyaltyHistory').doc();
                        transaction.set(historyRef, {
                            type: 'earn', points: pointsToAward, source: 'sale', 
                            description: 'Compra Avulsa (PDV)', transactionId: saleRef.id,
                            timestamp: paidAtTimestamp
                        });
                    }
                }
            }

            // 5. Criar Registro de Venda
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
                loyaltyPointsEarned: pointsToAward, 
                loyaltyRedemption: loyaltyRedemption || null,
                // 🚀 ADICIONADO DADOS DO PLANO AQUI
                coveredByPlan,
                subscriptionId,
                planDiscount,
                transaction: {
                    paidAt: paidAtTimestamp,
                    payments: payments,
                    totalAmount: Number(totalAmount),
                    discount: discount || null 
                }
            };
            
            transaction.set(saleRef, saleData);

            // 6. INTEGRAÇÃO FINANCEIRA SÓ SE HOUVER VALOR A COBRAR
            if (Number(totalAmount) > 0 && payments && payments.length > 0) {
                payments.forEach(payment => {
                    const installmentCount = (payment.installments && payment.installments > 1) ? payment.installments : 1;
                    const paymentMethod = payment.method.toLowerCase();
                    const paidDate = new Date().toISOString().split('T')[0];

                    if (paymentMethod === 'credito') {
                        const financialRef = db.collection('financial_receivables').doc();
                        const notes = installmentCount > 1 
                            ? `Parcelado em ${installmentCount}x no cartão de crédito`
                            : 'Pagamento à vista no cartão de crédito';

                        transaction.set(financialRef, {
                            establishmentId,
                            description: `Venda Avulsa: ${clientName || 'Cliente Avulso'} (Crédito ${installmentCount}x)`,
                            amount: payment.value, dueDate: paidDate, paymentDate: paidDate, status: 'paid',
                            transactionId: saleRef.id, createdAt: paidAtTimestamp,
                            naturezaId: defaultNaturezaId || null, centroDeCustoId: defaultCentroDeCustoId || null,
                            notes: notes, paymentDetails: { method: 'credito', installments: installmentCount }
                        });
                        return;
                    }

                    if (paymentMethod === 'crediario' || paymentMethod === 'fiado') {
                        const installmentValue = parseFloat((payment.value / installmentCount).toFixed(2));
                        let totalButLast = installmentValue * (installmentCount - 1);
                        const typeLabel = paymentMethod === 'fiado' ? 'Fiado' : 'Crediário';

                        for (let i = 1; i <= installmentCount; i++) {
                            const currentInstallmentValue = (i === installmentCount) ? payment.value - totalButLast : installmentValue;
                            const dueDate = new Date();
                            if (i > 1) dueDate.setMonth(dueDate.getMonth() + (i - 1));
                            
                            const financialRef = db.collection('financial_receivables').doc();
                            transaction.set(financialRef, {
                                establishmentId,
                                description: `Venda Avulsa: ${clientName || 'Cliente Avulso'} (Parcela ${i}/${installmentCount} - ${typeLabel})`,
                                amount: currentInstallmentValue, dueDate: dueDate.toISOString().split('T')[0],
                                paymentDate: null, status: 'pending', transactionId: saleRef.id, createdAt: paidAtTimestamp,
                                naturezaId: defaultNaturezaId || null, centroDeCustoId: defaultCentroDeCustoId || null,
                            });
                        }
                        return;
                    }

                    const financialRef = db.collection('financial_receivables').doc();
                    transaction.set(financialRef, {
                        establishmentId,
                        description: `Venda Avulsa: ${clientName || 'Cliente Avulso'} (${payment.method})`,
                        amount: payment.value, dueDate: paidDate, paymentDate: paidDate, status: 'paid',
                        transactionId: saleRef.id, createdAt: paidAtTimestamp,
                        naturezaId: defaultNaturezaId || null, centroDeCustoId: defaultCentroDeCustoId || null,
                    });
                });
            }
        });
        
        res.status(201).json({ message: 'Venda criada com sucesso!', saleId: saleRef.id, pointsEarned: pointsToAward });

    } catch (error) {
        console.error("Erro CRÍTICO ao criar venda:", error);
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

            // 🚀 NOVA LÓGICA: Devolver o Uso do Plano de Assinatura
            if (saleData.coveredByPlan && saleData.subscriptionId) {
                const subRef = db.collection('client_subscriptions').doc(saleData.subscriptionId);
                transaction.update(subRef, { usageCurrentMonth: admin.firestore.FieldValue.increment(-1) });
            }

            // Buscar lançamentos financeiros para deletar
            const financialSnapshot = await db.collection('financial_receivables')
                .where('transactionId', '==', saleId)
                .get();
            financialSnapshot.forEach(doc => financialEntriesToDelete.push(doc.id));
            
            // Estornar Stock
            const productsToRestock = saleData.items.filter(item => item.type === 'product');
            if (productsToRestock.length > 0) {
                const productRefs = productsToRestock
                    .filter(item => item.id && !String(item.id).startsWith('reward-'))
                    .map(item => db.collection('products').doc(item.id || item.itemId));
                
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

            // Estornar Pontos de Fidelidade
            if (saleData.clientId) {
                const clientRef = db.collection('clients').doc(saleData.clientId);
                const clientDoc = await transaction.get(clientRef);
                if (clientDoc.exists) {
                    if (saleData.loyaltyPointsEarned > 0) {
                        transaction.update(clientRef, { 
                            loyaltyPoints: admin.firestore.FieldValue.increment(-saleData.loyaltyPointsEarned) 
                        });
                        
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

                    if (saleData.loyaltyRedemption && saleData.loyaltyRedemption.cost > 0) {
                        const pointsToRefund = Number(saleData.loyaltyRedemption.cost);
                        
                        transaction.update(clientRef, { 
                            loyaltyPoints: admin.firestore.FieldValue.increment(pointsToRefund) 
                        });

                        const refundRef = clientRef.collection('loyaltyHistory').doc();
                        transaction.set(refundRef, {
                            type: 'earn', 
                            points: pointsToRefund,
                            source: 'sale_reopen',
                            description: 'Estorno de Resgate (Venda Cancelada)',
                            transactionId: saleId,
                            timestamp: admin.firestore.FieldValue.serverTimestamp()
                        });
                    }
                }
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

            // 🚀 NOVA LÓGICA: Devolver o Uso do Plano de Assinatura
            if (saleData.coveredByPlan && saleData.subscriptionId) {
                const subRef = db.collection('client_subscriptions').doc(saleData.subscriptionId);
                transaction.update(subRef, { usageCurrentMonth: admin.firestore.FieldValue.increment(-1) });
            }

            const productsToRestock = (saleData.items || []).filter(item => item.type === 'product');
            if (productsToRestock.length > 0) {
                const productRefs = productsToRestock
                    .filter(i => i.id && !String(i.id).startsWith('reward-'))
                    .map(item => db.collection('products').doc(item.id || item.itemId));
                
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