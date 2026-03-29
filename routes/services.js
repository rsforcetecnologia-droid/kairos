// routes/services.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// --- CATEGORIAS DE SERVIÇOS ---
router.post('/categories', async (req, res) => {
    try {
        const { establishmentId, name, accessibleIn } = req.body;
        if (!establishmentId || !name) return res.status(400).json({ message: 'ID do estabelecimento e nome da categoria são obrigatórios.' });
        
        const { db } = req;
        const newCategory = { 
            establishmentId, 
            name, 
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
        
        const [legacySnap, newSnap] = await Promise.all([
            db.collection('serviceCategories').where('establishmentId', '==', establishmentId).get(),
            db.collection('serviceCategories').where('accessibleIn', 'array-contains', establishmentId).get()
        ]);

        const categoriesMap = new Map();
        
        // 🔥 FILTRO SEVERO: Descarta a criação se foi explicitamente desmarcado na rede
        legacySnap.docs.forEach(doc => {
            const data = doc.data();
            if (Array.isArray(data.accessibleIn)) {
                if (data.accessibleIn.includes(establishmentId)) {
                    categoriesMap.set(doc.id, { id: doc.id, ...data });
                }
            } else {
                categoriesMap.set(doc.id, { id: doc.id, ...data });
            }
        });
        
        newSnap.docs.forEach(doc => categoriesMap.set(doc.id, { id: doc.id, ...doc.data() }));

        if (categoriesMap.size === 0) return res.status(200).json([]);
        
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
            professionalCommissions, accessibleIn 
        } = req.body;

        if (!establishmentId || !name || price === undefined || duration === undefined) {
            return res.status(400).json({ message: 'Os campos obrigatórios estão faltando.' });
        }
        
        const { db } = req;
        
        const newService = {
            establishmentId, 
            accessibleIn: Array.isArray(accessibleIn) ? accessibleIn : [establishmentId],
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

        const [legacySnap, newSnap] = await Promise.all([
            db.collection('services').where('establishmentId', '==', establishmentId).get(),
            db.collection('services').where('accessibleIn', 'array-contains', establishmentId).get()
        ]);

        const servicesMap = new Map();

        // 🔥 FILTRO SEVERO: Verifica se o serviço realmente deve aparecer aqui
        legacySnap.docs.forEach(doc => {
            const data = doc.data();
            if (Array.isArray(data.accessibleIn)) {
                if (data.accessibleIn.includes(establishmentId)) {
                    servicesMap.set(doc.id, { id: doc.id, ...data });
                }
            } else {
                servicesMap.set(doc.id, { id: doc.id, ...data });
            }
        });
        
        newSnap.docs.forEach(doc => servicesMap.set(doc.id, { id: doc.id, ...doc.data() }));

        if (servicesMap.size === 0) {
            return res.status(200).json([]);
        }
        
        const servicesList = Array.from(servicesMap.values()).sort((a, b) => a.name.localeCompare(b.name));
        res.status(200).json(servicesList);

    } catch (error) {
        console.error("Erro ao listar serviços:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.get('/stats/most-popular/:establishmentId', async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { db } = req;

        const appointmentsSnapshot = await db.collection('appointments').where('establishmentId', '==', establishmentId).get();
        if (appointmentsSnapshot.empty) return res.status(200).json({ name: 'N/A', count: 0 });

        const serviceCounts = {};
        appointmentsSnapshot.docs.forEach(doc => {
            const appointment = doc.data();
            if (Array.isArray(appointment.services)) {
                appointment.services.forEach(service => {
                    if (service.id) serviceCounts[service.id] = (serviceCounts[service.id] || 0) + 1;
                });
            }
        });

        if (Object.keys(serviceCounts).length === 0) return res.status(200).json({ name: 'N/A', count: 0 });

        let mostPopularId = null, maxCount = 0;
        for (const serviceId in serviceCounts) {
            if (serviceCounts[serviceId] > maxCount) {
                maxCount = serviceCounts[serviceId];
                mostPopularId = serviceId;
            }
        }

        if (!mostPopularId) return res.status(200).json({ name: 'Nenhum', count: 0 });

        const serviceDoc = await db.collection('services').doc(mostPopularId).get();
        if (!serviceDoc.exists) return res.status(200).json({ name: 'Serviço Apagado', count: maxCount });

        res.status(200).json({ name: serviceDoc.data().name, count: maxCount });
    } catch (error) {
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

        if (data.accessibleIn && Array.isArray(data.accessibleIn)) {
            updatedData.accessibleIn = data.accessibleIn;
        }

        await serviceRef.update(updatedData);
        res.status(200).json({ message: 'Serviço atualizado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.patch('/:serviceId/status', async (req, res) => {
    const { serviceId } = req.params;
    const { active } = req.body;
    try {
        const { db } = req;
        await db.collection('services').doc(serviceId).update({ active });
        res.status(200).json({ message: 'Status do serviço atualizado.' });
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.delete('/:serviceId', async (req, res) => {
    const { serviceId } = req.params;
    try {
        const { db } = req;
        if (!serviceId) return res.status(400).json({ message: 'O ID é obrigatório.' });
        await db.collection('services').doc(serviceId).delete();
        res.status(200).json({ message: 'Serviço removido.' });
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;