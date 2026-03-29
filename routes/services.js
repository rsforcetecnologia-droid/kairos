// routes/services.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// --- CATEGORIAS DE SERVIÇOS ---
router.post('/categories', async (req, res) => {
    try {
        // Agora recebemos também o accessibleIn (array de IDs)
        const { establishmentId, name, accessibleIn } = req.body;
        if (!establishmentId || !name) return res.status(400).json({ message: 'ID do estabelecimento e nome da categoria são obrigatórios.' });
        
        const { db } = req;
        const newCategory = { 
            establishmentId, 
            name, 
            // Se não enviarem o array, criamos um array com o ID atual (retrocompatibilidade)
            accessibleIn: Array.isArray(accessibleIn) ? accessibleIn : [establishmentId],
            createdAt: admin.firestore.FieldValue.serverTimestamp() 
        };
        
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
        
        // 🔄 DUPLA QUERY (Retrocompatibilidade)
        // Busca as categorias antigas (apenas establishmentId) e as novas (no array accessibleIn)
        const [legacySnap, newSnap] = await Promise.all([
            db.collection('serviceCategories').where('establishmentId', '==', establishmentId).get(),
            db.collection('serviceCategories').where('accessibleIn', 'array-contains', establishmentId).get()
        ]);

        // Usa um Map para juntar e evitar duplicações
        const categoriesMap = new Map();
        
        legacySnap.docs.forEach(doc => categoriesMap.set(doc.id, { id: doc.id, ...doc.data() }));
        newSnap.docs.forEach(doc => categoriesMap.set(doc.id, { id: doc.id, ...doc.data() }));

        if (categoriesMap.size === 0) return res.status(200).json([]);
        
        // Converte para array e ordena por nome
        const categoriesList = Array.from(categoriesMap.values()).sort((a, b) => a.name.localeCompare(b.name));
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
        const { 
            establishmentId, name, price, duration, commissionRate, active, 
            photo, notes, categoryId, bufferTime, commissionType, 
            professionalCommissions, accessibleIn // Novo campo array
        } = req.body;

        if (!establishmentId || !name || price === undefined || duration === undefined) {
            return res.status(400).json({ message: 'Os campos establishmentId, name, price e duration são obrigatórios.' });
        }
        
        const { db } = req;
        
        const newService = {
            establishmentId, // Mantemos como criador/dono do registo original
            accessibleIn: Array.isArray(accessibleIn) ? accessibleIn : [establishmentId], // O segredo da rede!
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

        // 🔄 DUPLA QUERY (Retrocompatibilidade)
        // Permite encontrar serviços antigos (criados antes da atualização) e os novos (partilhados na rede)
        const [legacySnap, newSnap] = await Promise.all([
            db.collection('services').where('establishmentId', '==', establishmentId).get(),
            db.collection('services').where('accessibleIn', 'array-contains', establishmentId).get()
        ]);

        const servicesMap = new Map();

        legacySnap.docs.forEach(doc => servicesMap.set(doc.id, { id: doc.id, ...doc.data() }));
        newSnap.docs.forEach(doc => servicesMap.set(doc.id, { id: doc.id, ...doc.data() }));

        if (servicesMap.size === 0) {
            return res.status(200).json([]);
        }
        
        // Converte o Map para Array e ordena alfabeticamente
        const servicesList = Array.from(servicesMap.values()).sort((a, b) => a.name.localeCompare(b.name));
        res.status(200).json(servicesList);

    } catch (error) {
        console.error("Erro ao listar serviços:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao tentar listar os serviços.' });
    }
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++ LÓGICA DO CARD "MAIS USADOS" ++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/stats/most-popular/:establishmentId', async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { db } = req;

        // 1. Busca todos os agendamentos (concluídos ou agendados) do estabelecimento
        const appointmentsSnapshot = await db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .get();

        if (appointmentsSnapshot.empty) {
            return res.status(200).json({ name: 'N/A', count: 0 });
        }

        const serviceCounts = {};

        // 2. Itera por todos os agendamentos e conta os serviços
        appointmentsSnapshot.docs.forEach(doc => {
            const appointment = doc.data();
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
        
        const updatedData = {
            ...data,
            price: Number(data.price) || 0,
            duration: Number(data.duration) || 0,
            bufferTime: Number(data.bufferTime) || 0,
            commissionRate: Number(data.commissionRate) || 0,
        };

        // Garante que se vier um array de acessos, ele é gravado corretamente
        if (data.accessibleIn && Array.isArray(data.accessibleIn)) {
            updatedData.accessibleIn = data.accessibleIn;
        }

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