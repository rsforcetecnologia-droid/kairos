// rsforcetecnologia-droid/kairos/kairos-aaa61fc2d5245a1c14d229ce794eaaa3acd28154/routes/services.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

// --- ROTAS DE CATEGORIAS DE SERVIÇOS ---

// Criar nova categoria
router.post('/categories', verifyToken, hasAccess, async (req, res) => {
    try {
        const { establishmentId } = req.user;
        const { name, parentId } = req.body;
        if (!establishmentId || !name) return res.status(400).json({ message: 'ID do estabelecimento e nome da categoria são obrigatórios.' });
        const { db } = req;
        const newCategory = { establishmentId, name, parentId: parentId || null, createdAt: admin.firestore.FieldValue.serverTimestamp() };
        const docRef = await db.collection('serviceCategories').add(newCategory);
        res.status(201).json({ message: 'Categoria criada com sucesso!', id: docRef.id, data: newCategory });
    } catch (error) {
        console.error("Erro ao criar categoria de serviço:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Listar categorias
router.get('/categories/:establishmentId', verifyToken, hasAccess, async (req, res) => {
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

// Deletar categoria
router.delete('/categories/:categoryId', verifyToken, hasAccess, async (req, res) => {
    const { categoryId } = req.params;
    try {
        const { db } = req;
        await db.collection('serviceCategories').doc(categoryId).delete();
        // Opcional: Remover a categoria dos serviços que a utilizam
        res.status(200).json({ message: 'Categoria apagada com sucesso.' });
    } catch (error) {
        console.error("Erro ao apagar categoria de serviço:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});


// Criar novo serviço (Rota Privada)
router.post('/', verifyToken, hasAccess, async (req, res) => {
    try {
        const { establishmentId, name, price, duration, bufferTime, photo, active, commissionRate, commissionType, professionalCommissions, notes, categoryId } = req.body;
        if (!establishmentId || !name || price === undefined || duration === undefined) {
            return res.status(400).json({ message: 'Os campos establishmentId, name, price e duration são obrigatórios.' });
        }
        const { db } = req;
        const newService = {
            establishmentId, name,
            price: Number(price),
            duration: Number(duration),
            bufferTime: Number(bufferTime) || 0,
            commissionRate: Number(commissionRate) || 0,
            commissionType: commissionType || 'default', // 'default' ou 'custom'
            professionalCommissions: professionalCommissions || {}, // Objeto para comissões personalizadas
            notes: notes || '',
            active: active !== false,
            photo: photo || null,
            categoryId: categoryId || null, // <-- ADICIONADO
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };
        const docRef = await db.collection('services').add(newService);
        res.status(201).json({ message: 'Serviço criado com sucesso!', serviceId: docRef.id, data: newService });
    } catch (error) {
        console.error("Erro ao criar serviço:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao tentar criar o serviço.' });
    }
});

// Listar todos os serviços para o admin (Rota Privada)
router.get('/:establishmentId', verifyToken, hasAccess, async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { db } = req;
        const snapshot = await db.collection('services').where('establishmentId', '==', establishmentId).get();
        if (snapshot.empty) return res.status(200).json([]);
        const servicesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(servicesList);
    } catch (error) {
        console.error("Erro ao listar serviços:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao tentar listar os serviços.' });
    }
});

// Listar serviços ativos (Rota Pública)
router.get('/public/:establishmentId', async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { db } = req;
        const snapshot = await db.collection('services')
            .where('establishmentId', '==', establishmentId)
            .where('active', '==', true)
            .get();
        if (snapshot.empty) return res.status(200).json([]);
        const servicesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(servicesList);
    } catch (error) {
        console.error("Erro ao listar serviços públicos:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao tentar listar os serviços.' });
    }
});

// Atualizar serviço (Rota Privada)
router.put('/:serviceId', verifyToken, hasAccess, async (req, res) => {
    const { serviceId } = req.params;
    const data = req.body;
    try {
        const { db } = req;
        const updatedData = {
            ...data,
            price: Number(data.price),
            duration: Number(data.duration),
            bufferTime: Number(data.bufferTime) || 0,
            commissionRate: Number(data.commissionRate) || 0,
            commissionType: data.commissionType || 'default',
            professionalCommissions: data.professionalCommissions || {},
            categoryId: data.categoryId || null // <-- ADICIONADO
        };
        await db.collection('services').doc(serviceId).update(updatedData);
        res.status(200).json({ message: 'Serviço atualizado com sucesso.' });
    } catch (error) {
        console.error("Erro ao atualizar serviço:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Ativar/desativar serviço (Rota Privada)
router.patch('/:serviceId/status', verifyToken, hasAccess, async (req, res) => {
    const { serviceId } = req.params;
    const { active } = req.body;
    if (typeof active !== 'boolean') return res.status(400).json({ message: "O campo 'active' deve ser um booleano." });
    try {
        const { db } = req;
        await db.collection('services').doc(serviceId).update({ active: active });
        res.status(200).json({ message: `Status do serviço ${serviceId} atualizado para ${active}.` });
    } catch (error) {
        console.error("Erro ao atualizar status do serviço:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Deletar serviço (Rota Privada)
router.delete('/:serviceId', verifyToken, hasAccess, async (req, res) => {
    try {
        const { serviceId } = req.params;
        const { db } = req;
        if (!serviceId) return res.status(400).json({ message: 'O ID do serviço é obrigatório.' });
        await db.collection('services').doc(serviceId).delete();
        res.status(200).json({ message: `Serviço com ID ${serviceId} foi apagado com sucesso.` });
    } catch (error) {
        console.error("Erro ao apagar serviço:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;