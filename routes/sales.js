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
    // Extraímos loyaltyRedemption do corpo da requisição
    const { items, totalAmount, payments, clientName, clientPhone, professionalId, cashierSessionId, discount, loyaltyRedemption } = req.body;

    // Log de auditoria para monitoramento
    console.log(`>>> [AUDITORIA] Iniciando Nova Venda Avulsa (R$ ${totalAmount})`);

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
        
        // 1. Buscar dados do Estabelecimento
        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();
        const establishmentData = establishmentDoc.data() || {};
        
        const financialIntegration = establishmentData.financialIntegration || {};
        const { defaultNaturezaId, defaultCentroDeCustoId } = financialIntegration;
        
        // Configurações de Fidelidade
        const loyaltyProgram = establishmentData.loyaltyProgram || {};

        // 2. Calcular Pontos de Fidelidade (Regra Fixa por Visita)
        let pointsToAward = 0;
        if (loyaltyProgram.enabled) {
            const rawPoints = loyaltyProgram.pointsPerVisit;
            pointsToAward = parseInt(rawPoints);
            
            // Garante pelo menos 1 ponto se a configuração for inválida
            if (isNaN(pointsToAward) || pointsToAward <= 0) {
                pointsToAward = 1;
            }
        }

        // >>> REGRA DE EXCEÇÃO: Se houver resgate, NÃO gera pontos de visita <<<
        if (loyaltyRedemption) {
            console.log(">>> [AUDITORIA] Resgate de prémio detectado. Pontos desta venda foram zerados (0).");
            pointsToAward = 0;
        }

        console.log("--- CÁLCULO FINAL ---");
        console.log("Pontos a serem atribuídos:", pointsToAward);
        
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
            loyaltyPointsEarned: pointsToAward, 
            // Salva o objeto de resgate se existir
            loyaltyRedemption: loyaltyRedemption || null,
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
            
            // 4. ATUALIZAR PONTOS DO CLIENTE
            if (safeClientId) {
                const clientRef = db.collection('clients').doc(safeClientId);
                const clientDoc = await transaction.get(clientRef);
                
                if (clientDoc.exists) {
                    // CENÁRIO A: Resgate de Prémio (DÉBITO)
                    if (loyaltyRedemption) {
                        const cost = Number(loyaltyRedemption.cost || 0);
                        if (cost > 0) {
                            console.log(`[DB WRITE] Debitando ${cost} pontos do cliente ${safeClientId} pelo resgate.`);
                            
                            transaction.update(clientRef, { 
                                loyaltyPoints: admin.firestore.FieldValue.increment(-cost),
                                lastVisit: paidAtTimestamp
                            });

                            const historyRef = clientRef.collection('loyaltyHistory').doc();
                            transaction.set(historyRef, {
                                type: 'redeem', // Tipo 'resgate'
                                points: -cost,
                                source: 'sale',
                                description: `Resgate: ${loyaltyRedemption.name || 'Prémio'}`,
                                transactionId: saleRef.id,
                                timestamp: paidAtTimestamp
                            });
                        }
                    } 
                    // CENÁRIO B: Ganho de Pontos (CRÉDITO)
                    else if (pointsToAward > 0) {
                        console.log(`[DB WRITE] Incrementando ${pointsToAward} pontos para o cliente ${safeClientId}`);
                        
                        transaction.update(clientRef, { 
                            loyaltyPoints: admin.firestore.FieldValue.increment(pointsToAward),
                            lastVisit: paidAtTimestamp
                        });

                        const historyRef = clientRef.collection('loyaltyHistory').doc();
                        transaction.set(historyRef, {
                            type: 'earn', // Tipo 'ganho'
                            points: pointsToAward,
                            source: 'sale', 
                            description: 'Compra Avulsa (PDV)',
                            transactionId: saleRef.id,
                            timestamp: paidAtTimestamp
                        });
                    }
                }
            }

            // 5. Criar Registro de Venda
            transaction.set(saleRef, saleData);

            // 6. INTEGRAÇÃO FINANCEIRA
            payments.forEach(payment => {
                // Se não vier definido parcelas, assume 1
                const installmentCount = (payment.installments && payment.installments > 1) ? payment.installments : 1;
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

                // --- MODIFICAÇÃO AQUI: CREDIÁRIO E FIADO ---
                // Ambos entram aqui para gerar parcelas (ou parcela única) PENDENTES
                if (paymentMethod === 'crediario' || paymentMethod === 'fiado') {
                    const installmentValue = parseFloat((payment.value / installmentCount).toFixed(2));
                    let totalButLast = installmentValue * (installmentCount - 1);
                    
                    const typeLabel = paymentMethod === 'fiado' ? 'Fiado' : 'Crediário';

                    for (let i = 1; i <= installmentCount; i++) {
                        // Ajuste de centavos na última parcela
                        const currentInstallmentValue = (i === installmentCount) ? payment.value - totalButLast : installmentValue;
                        
                        // Lógica de Datas:
                        // i=1: Data de hoje (Entrada/Primeira parcela)
                        // i=2: Data de hoje + 1 mês
                        const dueDate = new Date();
                        if (i > 1) {
                            dueDate.setMonth(dueDate.getMonth() + (i - 1));
                        }
                        const dueDateString = dueDate.toISOString().split('T')[0];
                        
                        const description = `Venda Avulsa: ${clientName || 'Cliente Avulso'} (Parcela ${i}/${installmentCount} - ${typeLabel})`;
                        const financialRef = db.collection('financial_receivables').doc();
                        
                        transaction.set(financialRef, {
                            establishmentId,
                            description,
                            amount: currentInstallmentValue,
                            dueDate: dueDateString,
                            paymentDate: null, // Fica NULL pois é pendente
                            status: 'pending', // Status PENDENTE para aparecer na cobrança
                            transactionId: saleRef.id,
                            createdAt: paidAtTimestamp,
                            naturezaId: defaultNaturezaId || null,
                            centroDeCustoId: defaultCentroDeCustoId || null,
                        });
                    }
                    return;
                }

                // OUTROS (Dinheiro, PIX, Débito) - Pagamentos imediatos
                const financialRef = db.collection('financial_receivables').doc();
                transaction.set(financialRef, {
                    establishmentId,
                    description: `Venda Avulsa: ${clientName || 'Cliente Avulso'} (${payment.method})`,
                    amount: payment.value,
                    dueDate: paidDate, 
                    paymentDate: paidDate,
                    status: 'paid', // Baixa automática
                    transactionId: saleRef.id,
                    createdAt: paidAtTimestamp,
                    naturezaId: defaultNaturezaId || null,
                    centroDeCustoId: defaultCentroDeCustoId || null,
                });
            });
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

            // Estornar Pontos de Fidelidade
            if (saleData.clientId) {
                const clientRef = db.collection('clients').doc(saleData.clientId);
                const clientDoc = await transaction.get(clientRef);
                if (clientDoc.exists) {
                    // 1. Reverter Pontos GANHOS
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

                    // 2. Devolver Pontos GASTOS (se houve resgate)
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

            const productsToRestock = (saleData.items || []).filter(item => item.type === 'product');
            if (productsToRestock.length > 0) {
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