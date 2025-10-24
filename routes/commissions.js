// routes/commissions.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

// Aplica o middleware de autenticação em todas as rotas deste arquivo
router.use(verifyToken, hasAccess);

// --- ROTAS DE CÁLCULO E RELATÓRIO DE COMISSÃO (SEU CÓDIGO EXISTENTE) ---

// Rota para CALCULAR a comissão (sem salvar)
router.post('/calculate', async (req, res) => {
    const { establishmentId } = req.user;
    const { professionalIds, startDate, endDate, calculationTypes } = req.body;

    if (!professionalIds || professionalIds.length === 0 || !startDate || !endDate || !calculationTypes) {
        return res.status(400).json({ message: 'Profissionais, período e tipos de cálculo são obrigatórios.' });
    }

    try {
        const { db } = req;
        const start = new Date(startDate);
        const end = new Date(endDate + "T23:59:59");
        let professionalsToProcess = [];
        const allProfessionals = await db.collection('professionals').where('establishmentId', '==', establishmentId).get();
        const allProfessionalsMap = new Map(allProfessionals.docs.map(doc => [doc.id, doc.data()]));

        if (professionalIds.includes('all')) {
            professionalsToProcess = allProfessionals.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
            professionalsToProcess = professionalIds.map(id => ({ id, ...allProfessionalsMap.get(id) }));
        }

        const results = [];

        for (const prof of professionalsToProcess) {
            const salesQuery = db.collection('sales')
                .where('establishmentId', '==', establishmentId)
                .where('professionalId', '==', prof.id)
                .where('transaction.paidAt', '>=', start)
                .where('transaction.paidAt', '<=', end);

            const salesSnapshot = await salesQuery.get();
            if (salesSnapshot.empty) {
                continue; // Pula para o próximo profissional se não houver vendas
            }

            let totalCommissionableValue = 0;
            let totalCommission = 0;
            const commissionableItems = [];

            for (const saleDoc of salesSnapshot.docs) {
                const saleData = saleDoc.data();
                const items = saleData.items || [];

                for (const item of items) {
                    let commissionRate = 0;
                    const price = item.price || 0;
                    let isCommissionable = false;

                    // CORREÇÃO DE SEGURANÇA: Verifica se o item.id é válido antes de tentar consultar o Firestore
                    if (!item.id || typeof item.id !== 'string' || item.id.trim() === '') {
                        console.warn(`[COMMISSION_CALC] Item sem ID encontrado na venda ${saleDoc.id}. Pulando item: ${item.name}`);
                        continue; 
                    }

                    if (item.type === 'service' && calculationTypes.services) {
                        const serviceDoc = await db.collection('services').doc(item.id).get();
                        if (serviceDoc.exists) {
                            const serviceData = serviceDoc.data();
                            commissionRate = serviceData.commissionType === 'custom' && serviceData.professionalCommissions?.[prof.id] !== undefined
                                ? serviceData.professionalCommissions[prof.id]
                                : serviceData.commissionRate || 0;
                            isCommissionable = true;
                        }
                    } else if (item.type === 'product' && calculationTypes.products) {
                        const productDoc = await db.collection('products').doc(item.id).get();
                        if (productDoc.exists) {
                            commissionRate = productDoc.data().commissionRate || 0;
                            isCommissionable = true;
                        }
                    } else if (item.type === 'package' && calculationTypes.packages) {
                        const packageDoc = await db.collection('servicePackages').doc(item.id).get();
                        if (packageDoc.exists) {
                            commissionRate = packageDoc.data().commissionRate || 0;
                            isCommissionable = true;
                        }
                    }

                    if (isCommissionable) {
                        const itemCommission = price * (commissionRate / 100);
                        totalCommissionableValue += price;
                        totalCommission += itemCommission;

                        commissionableItems.push({
                            date: saleData.transaction.paidAt.toDate(),
                            client: saleData.clientName,
                            item: item.name,
                            value: price,
                            commissionRate: commissionRate,
                            commissionValue: itemCommission,
                            type: item.type
                        });
                    }
                }
            }
            
            if (commissionableItems.length > 0) {
                 results.push({
                    professionalId: prof.id,
                    professionalName: prof.name,
                    summary: { totalCommissionableValue, totalCommission, totalItems: commissionableItems.length },
                    items: commissionableItems.sort((a, b) => new Date(a.date) - new Date(b.date))
                });
            }
        }

        res.status(200).json(results);

    } catch (error) {
        console.error("Erro ao calcular comissão:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao calcular a comissão.' });
    }
});


router.post('/save', async (req, res) => {
    const { establishmentId } = req.user;
    const { professionalId, professionalName, period, reportData } = req.body;

    if (!professionalId || !period || !reportData) {
        return res.status(400).json({ message: 'Dados insuficientes para salvar o relatório.' });
    }

    try {
        const { db } = req;
        const report = {
            establishmentId, professionalId, professionalName,
            period,
            summary: reportData.summary,
            // Armazena os itens detalhados para permitir a regeneração do recibo
            items: reportData.items.map(item => ({
                ...item,
                // Garantir que datas que são objetos Date sejam salvas corretamente
                date: item.date instanceof Date ? admin.firestore.Timestamp.fromDate(item.date) : item.date,
            })),
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('commission_reports').add(report);
        res.status(201).json({ message: 'Relatório de comissão salvo com sucesso!', id: docRef.id });
    } catch (error) {
        console.error("Erro ao salvar relatório de comissão:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// ROTA ATUALIZADA: Obter histórico de todos os relatórios, com filtros
router.get('/history', async (req, res) => {
    const { establishmentId } = req.user;
    const { professionalId, period } = req.query; // Pega os filtros da query string

    try {
        const { db } = req;
        let query = db.collection('commission_reports')
            .where('establishmentId', '==', establishmentId);
        
        // Aplica filtro por profissional, se fornecido
        if (professionalId) {
            query = query.where('professionalId', '==', professionalId);
        }

        const snapshot = await query.get();

        if (snapshot.empty) {
            return res.status(200).json([]);
      _   }

        let history = snapshot.docs.map(doc => {
            const data = doc.data();
            return { 
                id: doc.id, 
                ...data,
                // Inclui items no relatório para o recibo (corrigido para o caso de salvar)
                items: data.items, 
                // Converte data de criação com segurança
                createdAt: data.createdAt && typeof data.createdAt.toDate === 'function' ? data.createdAt.toDate().toISOString() : data.createdAt 
            };
        });
        
        // Filtro em memória pelo mês/período
        if (period) {
            // Esperamos `period` como 'YYYY-MM' do cliente
            const [year, month] = period.split('-');
            const periodMonthYear = `${month}/${year}`; 
            
            // Filtra se a string de período do relatório contém o mês/ano
            history = history.filter(report => report.period.includes(periodMonthYear)); 
        }

        // Ordena os resultados no servidor antes de enviar (mais recente primeiro)
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json(history);
    } catch (error) {
        console.error("Erro ao buscar histórico de comissões:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// NOVA ROTA: Excluir um relatório
router.delete('/report/:reportId', async (req, res) => {
    const { establishmentId } = req.user;
    const { reportId } = req.params;

    if (!reportId) {
        return res.status(400).json({ message: 'ID do relatório é obrigatório para exclusão.' });
    }

    try {
        const { db } = req;
        const reportRef = db.collection('commission_reports').doc(reportId);
        const reportDoc = await reportRef.get();

        if (!reportDoc.exists) {
            return res.status(404).json({ message: 'Relatório não encontrado.' });
        }
        
        // Verifica se o relatório pertence ao estabelecimento do utilizador autenticado (segurança)
        if (reportDoc.data().establishmentId !== establishmentId) {
            return res.status(403).json({ message: 'Acesso negado. Este relatório não pertence ao seu estabelecimento.' });
        }

        await reportRef.delete();
        res.status(204).send(); // 204 No Content indica sucesso na exclusão

    } catch (error) {
        console.error("Erro ao excluir relatório de comissão:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao excluir o relatório.' });
    }
});


// --- INÍCIO DAS NOVAS ROTAS CRUD PARA REGRAS DE COMISSÃO ---
// (Estas rotas são chamadas por js/ui/commissions.js)

// Rota para buscar todas as REGRAS de comissão
router.get('/', async (req, res) => {
    try {
        const { establishmentId } = req.user;
        const { db } = req;
        // A coleção 'commissions' dentro do documento do estabelecimento guarda as REGRAS
        const commissionsRef = db.collection('establishments').doc(establishmentId).collection('commissions');
        const snapshot = await commissionsRef.get();

        if (snapshot.empty) {
            return res.status(200).send([]);
        }

        let commissions = [];
        snapshot.forEach(doc => {
            commissions.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json(commissions);
    } catch (error) {
        console.error('Erro ao buscar regras de comissão:', error);
        res.status(500).send('Erro interno do servidor ao buscar regras.');
    }
});

// Rota para criar uma nova REGRA de comissão
router.post('/', async (req, res) => {
    try {
        const { establishmentId } = req.user;
        const { db } = req;
        const newCommissionRule = req.body;

        const commissionRef = await db.collection('establishments').doc(establishmentId)
                                  .collection('commissions').add(newCommissionRule);

        res.status(201).send({ id: commissionRef.id, ...newCommissionRule });
    } catch (error) {
        console.error('Erro ao criar regra de comissão:', error);
        res.status(500).send('Erro interno do servidor ao criar regra.');
    }
});

// Rota para buscar uma REGRA de comissão específica (por ID)
router.get('/:id', async (req, res) => {
    try {
        const { establishmentId } = req.user;
        const { id } = req.params;
        const { db } = req;
        
        const commissionRef = db.collection('establishments').doc(establishmentId)
                              .collection('commissions').doc(id);
        const doc = await commissionRef.get();

        if (!doc.exists) {
            return res.status(404).send('Regra de comissão não encontrada');
        }

        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error('Erro ao buscar regra de comissão:', error);
        res.status(500).send('Erro interno do servidor ao buscar regra.');
    }
});

// Rota para atualizar uma REGRA de comissão
router.put('/:id', async (req, res) => {
    try {
        const { establishmentId } = req.user;
        const { id } = req.params;
        const { db } = req;
        const updatedData = req.body;

        const commissionRef = db.collection('establishments').doc(establishmentId)
                              .collection('commissions').doc(id);
        
        // Verifica se o documento existe antes de atualizar
        const doc = await commissionRef.get();
        if (!doc.exists) {
            return res.status(404).send('Regra de comissão não encontrada para atualização');
        }

        await commissionRef.update(updatedData);

        res.status(200).send({ id: id, ...updatedData });
    } catch (error) {
        console.error('Erro ao atualizar regra de comissão:', error);
        res.status(500).send('Erro interno do servidor ao atualizar regra.');
    }
});

// Rota para excluir uma REGRA de comissão
// (Esta é a rota que o js/ui/commissions.js chama e que estava faltando)
router.delete('/:id', async (req, res) => {
    try {
        const { establishmentId } = req.user;
        // --- CORREÇÃO AQUI ---
        // O parâmetro da rota é 'id', que vem da URL
        const { id } = req.params; 
        const { db } = req;

        if (!id) {
            return res.status(400).send('ID da regra de comissão não fornecido');
        }

        const commissionRef = db.collection('establishments').doc(establishmentId)
                              .collection('commissions').doc(id);

        const commissionDoc = await commissionRef.get();

        if (!commissionDoc.exists) {
            return res.status(404).send('Regra de comissão não encontrada');
        }

        await commissionRef.delete();
        res.status(200).send({ id: id, message: 'Regra de comissão excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir regra de comissão:', error);
        res.status(500).send('Erro interno do servidor ao excluir regra.');
    }
});

// --- FIM DAS NOVAS ROTAS CRUD ---


module.exports = router;

