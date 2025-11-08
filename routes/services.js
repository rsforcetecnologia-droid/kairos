const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// --- CATEGORIAS DE SERVIÇOS ---
// (Rotas de categorias que já existiam... - removidas da minha resposta anterior por estarem em /api/products)
// Assumindo que as rotas de categorias de serviço estão aqui
router.post('/categories', async (req, res) => {
    try {
        const { establishmentId, name } = req.body;
        if (!establishmentId || !name) return res.status(400).json({ message: 'ID do estabelecimento e nome da categoria são obrigatórios.' });
        const { db } = req;
        const newCategory = { establishmentId, name, createdAt: admin.firestore.FieldValue.serverTimestamp() };
        const docRef = await db.collection('serviceCategories').add(newCategory);
        res.status(201).json({ message: 'Categoria criada com sucesso!', id: docRef.id, data: newCategory });
    } catch (error) {
        console.error("Erro ao criar categoria de serviço:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.get('/categories/:establishmentId', async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { db } = req;
        const snapshot = await db.collection('serviceCategories').where('establishmentId', '==', establishmentId).orderBy('name').get();
        if (snapshot.empty) return res.status(200).json([]);
        const categoriesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(categoriesList);
    } catch (error) {
        console.error("Erro ao listar categorias de serviço:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.delete('/categories/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    try {
        const { db } = req;
        await db.collection('serviceCategories').doc(categoryId).delete();
        res.status(200).json({ message: 'Categoria de serviço apagada com sucesso.' });
    } catch (error) {
        console.error("Erro ao apagar categoria de serviço:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});


// --- SERVIÇOS ---
router.post('/', async (req, res) => {
    try {
        const { establishmentId, name, price, duration, commissionRate, active, photo, notes, categoryId, bufferTime, commissionType, professionalCommissions } = req.body;
        if (!establishmentId || !name || price === undefined || duration === undefined) {
            return res.status(400).json({ message: 'Os campos establishmentId, name, price e duration são obrigatórios.' });
        }
        const { db } = req;
        const newService = {
            establishmentId,
            name,
            price: Number(price) || 0,
            duration: Number(duration) || 0,
            bufferTime: Number(bufferTime) || 0,
            commissionRate: Number(commissionRate) || 0,
            active: active !== undefined ? active : true,
            photo: photo || null,
            notes: notes || '',
            categoryId: categoryId || null,
            commissionType: commissionType || 'default',
            professionalCommissions: professionalCommissions || {},
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };
        const docRef = await db.collection('services').add(newService);
        res.status(201).json({ message: 'Serviço criado com sucesso!', serviceId: docRef.id, data: newService });
    } catch (error) {
        console.error("Erro ao criar serviço:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao tentar criar o serviço.' });
    }
});

router.get('/:establishmentId', async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { db } = req;
        const snapshot = await db.collection('services').where('establishmentId', '==', establishmentId).orderBy('name').get();
        if (snapshot.empty) {
            return res.status(200).json([]);
        }
        const servicesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(servicesList);
    } catch (error) {
        console.error("Erro ao listar serviços:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao tentar listar os serviços.' });
    }
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++ NOVA ROTA: LÓGICA DO CARD "MAIS USADOS" ++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/stats/most-popular/:establishmentId', async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { db } = req;

        // 1. Busca todos os agendamentos (concluídos ou agendados) do estabelecimento
        const appointmentsSnapshot = await db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            // Opcional: filtrar por status, ex: .where('status', 'in', ['completed', 'scheduled'])
            .get();

        if (appointmentsSnapshot.empty) {
            return res.status(200).json({ name: 'N/A', count: 0 });
        }

        const serviceCounts = {};

        // 2. Itera por todos os agendamentos e conta os serviços
        appointmentsSnapshot.docs.forEach(doc => {
            const appointment = doc.data();
            // Verifica se 'services' existe e é um array
            if (Array.isArray(appointment.services)) {
                appointment.services.forEach(service => {
                    if (service.id) {
                        serviceCounts[service.id] = (serviceCounts[service.id] || 0) + 1;
                    }
                });
            }
        });

        if (Object.keys(serviceCounts).length === 0) {
            return res.status(200).json({ name: 'N/A', count: 0 });
        }

        // 3. Encontra o ID do serviço mais popular
        let mostPopularId = null;
        let maxCount = 0;
        for (const serviceId in serviceCounts) {
            if (serviceCounts[serviceId] > maxCount) {
                maxCount = serviceCounts[serviceId];
                mostPopularId = serviceId;
            }
        }

        if (!mostPopularId) {
            return res.status(200).json({ name: 'Nenhum', count: 0 });
        }

        // 4. Busca o nome do serviço mais popular
        const serviceDoc = await db.collection('services').doc(mostPopularId).get();
        
        if (!serviceDoc.exists) {
            // Caso o serviço tenha sido apagado mas ainda exista em agendamentos
            return res.status(200).json({ name: 'Serviço Apagado', count: maxCount });
        }

        // 5. Retorna o nome e a contagem
        res.status(200).json({ name: serviceDoc.data().name, count: maxCount });

    } catch (error) {
        console.error("Erro ao buscar serviço mais popular:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});


router.put('/:serviceId', async (req, res) => {
    const { serviceId } = req.params;
    const data = req.body;
    try {
        const { db } = req;
        const serviceRef = db.collection('services').doc(serviceId);
        
        // Converte os números para garantir
        const updatedData = {
            ...data,
            price: Number(data.price) || 0,
            duration: Number(data.duration) || 0,
            bufferTime: Number(data.bufferTime) || 0,
            commissionRate: Number(data.commissionRate) || 0,
        };

        await serviceRef.update(updatedData);
        res.status(200).json({ message: 'Serviço atualizado com sucesso.' });
    } catch (error) {
        console.error("Erro ao atualizar serviço:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.patch('/:serviceId/status', async (req, res) => {
    const { serviceId } = req.params;
    const { active } = req.body;
    try {
        const { db } = req;
        await db.collection('services').doc(serviceId).update({ active });
        res.status(200).json({ message: 'Status do serviço atualizado com sucesso.' });
    } catch (error) {
        console.error("Erro ao atualizar status do serviço:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.delete('/:serviceId', async (req, res) => {
    const { serviceId } = req.params;
    try {
        const { db } = req;
        if (!serviceId) return res.status(400).json({ message: 'O ID do serviço é obrigatório.' });
        await db.collection('services').doc(serviceId).delete();
        res.status(200).json({ message: 'Serviço removido com sucesso.' });
    } catch (error) {
        console.error("Erro ao remover serviço:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;