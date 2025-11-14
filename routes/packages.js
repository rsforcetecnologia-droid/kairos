const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Rota para criar um novo pacote de serviços
router.post('/', async (req, res) => {
    const { establishmentId } = req.user; // Obtido do token de autenticação
    // CORREÇÃO: 'services' foi renomeado para 'items'
    const { name, items, price, validityDays, status, originalPrice, description, commissionRate } = req.body;

    // A validação `validityDays` foi removida para permitir valores nulos
    if (!name || !items || items.length === 0 || price === undefined) {
        return res.status(400).json({ message: 'Nome, itens e preço são obrigatórios.' });
    }

    try {
        const { db } = req;
        const newPackage = {
            establishmentId,
            name,
            description: description || null,
            items: items, // <-- CORREÇÃO
            originalPrice: Number(originalPrice) || 0,
            price: Number(price),
            validityDays: Number(validityDays) || null,
            status: status || 'active',
            commissionRate: Number(commissionRate) || 0, // Adiciona o campo de comissão
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('servicePackages').add(newPackage);
        res.status(201).json({ message: 'Pacote criado com sucesso!', id: docRef.id });
    } catch (error) {
        console.error("Erro ao criar pacote:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao criar o pacote.' });
    }
});

// Rota para obter todos os pacotes de um estabelecimento
router.get('/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;

    try {
        const { db } = req;
        const snapshot = await db.collection('servicePackages')
            .where('establishmentId', '==', establishmentId)
            .get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        const packages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        packages.sort((a, b) => a.name.localeCompare(b.name));

        res.status(200).json(packages);
    } catch (error) {
        console.error("Erro ao carregar pacotes:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao carregar os pacotes.' });
    }
});

// Rota para atualizar um pacote
router.put('/:packageId', async (req, res) => {
    const { packageId } = req.params;
    // CORREÇÃO: 'services' foi renomeado para 'items'
    const { name, items, price, validityDays, status, originalPrice, description, commissionRate } = req.body;

    // A validação `validityDays` foi removida para permitir valores nulos
    if (!name || !items || items.length === 0 || price === undefined) {
        return res.status(400).json({ message: 'Dados incompletos para atualizar o pacote.' });
    }

    try {
        const { db } = req;
        const packageRef = db.collection('servicePackages').doc(packageId);

        const updatedData = {
            name,
            description: description || null,
            items: items, // <-- CORREÇÃO
            originalPrice: Number(originalPrice) || 0,
            price: Number(price),
            validityDays: Number(validityDays) || null,
            status: status || 'active',
            commissionRate: Number(commissionRate) || 0 // Adiciona o campo de comissão
        };

        await packageRef.update(updatedData);
        res.status(200).json({ message: 'Pacote atualizado com sucesso!' });
    } catch (error) {
        console.error("Erro ao atualizar pacote:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Rota para apagar um pacote
router.delete('/:packageId', async (req, res) => {
    const { packageId } = req.params;

    try {
        const { db } = req;
        await db.collection('servicePackages').doc(packageId).delete();
        res.status(200).json({ message: 'Pacote apagado com sucesso.' });
    } catch (error) {
        console.error("Erro ao apagar pacote:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;