const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// ============================================================================
// 📝 CRIAR PACOTE
// ============================================================================
router.post('/', async (req, res) => {
    // req.user contém dados do token, mas damos prioridade ao companyId do body se existir
    const tokenEstId = req.user.establishmentId; 
    
    const { 
        companyId, establishmentIds, establishmentId,
        name, items, price, originalPrice, validityDays, status, 
        description, commissionRate, sellStartDate, sellEndDate, salesLimit 
    } = req.body;

    if (!name || !items || items.length === 0 || price === undefined) {
        return res.status(400).json({ message: 'Nome, itens e preço final são obrigatórios.' });
    }

    try {
        const { db } = req;
        
        // Assegura que temos um array de IDs para suportar pacotes em múltiplas filiais
        const targetEstIds = (establishmentIds && establishmentIds.length > 0) 
            ? establishmentIds 
            : [establishmentId || tokenEstId];

        const newPackage = {
            companyId: companyId || req.user.companyId || null,
            establishmentId: targetEstIds[0], // Mantido como fallback de compatibilidade (string)
            establishmentIds: targetEstIds,   // Novo padrão multi-unidades (array)
            name: name.trim(),
            description: description ? description.trim() : null,
            items: items,
            originalPrice: Number(originalPrice) || 0,
            price: Number(price),
            validityDays: validityDays ? Number(validityDays) : null,
            status: status || 'active',
            commissionRate: Number(commissionRate) || 0,
            sellStartDate: sellStartDate || null,
            sellEndDate: sellEndDate || null,
            salesLimit: salesLimit ? Number(salesLimit) : null,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('servicePackages').add(newPackage);
        res.status(201).json({ message: 'Pacote criado com sucesso!', id: docRef.id });
    } catch (error) {
        console.error("Erro ao criar pacote:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao criar o pacote.' });
    }
});

// ============================================================================
// 🔍 LER PACOTES (Retrocompatível com Single e Multi-Units)
// ============================================================================
router.get('/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;

    try {
        const { db } = req;
        const packagesMap = new Map();

        // 1. Busca no Padrão Novo (Array de filiais)
        const snapMulti = await db.collection('servicePackages')
            .where('establishmentIds', 'array-contains', establishmentId)
            .get();

        snapMulti.forEach(doc => {
            packagesMap.set(doc.id, { id: doc.id, ...doc.data() });
        });

        // 2. Busca no Padrão Antigo (String) - Evita que pacotes antigos sumam
        const snapSingle = await db.collection('servicePackages')
            .where('establishmentId', '==', establishmentId)
            .get();

        snapSingle.forEach(doc => {
            if (!packagesMap.has(doc.id)) {
                packagesMap.set(doc.id, { id: doc.id, ...doc.data() });
            }
        });

        const packages = Array.from(packagesMap.values());
        
        // Ordena alfabeticamente no servidor
        packages.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

        res.status(200).json(packages);
    } catch (error) {
        console.error("Erro ao carregar pacotes:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao carregar os pacotes.' });
    }
});

// ============================================================================
// 🔄 ATUALIZAR PACOTE
// ============================================================================
router.put('/:packageId', async (req, res) => {
    const { packageId } = req.params;
    
    const { 
        establishmentIds, establishmentId,
        name, items, price, originalPrice, validityDays, status, 
        description, commissionRate, sellStartDate, sellEndDate, salesLimit 
    } = req.body;

    if (!name || !items || items.length === 0 || price === undefined) {
        return res.status(400).json({ message: 'Dados incompletos para atualizar o pacote.' });
    }

    try {
        const { db } = req;
        const packageRef = db.collection('servicePackages').doc(packageId);

        // Se enviou o array de filiais atualizado, usamos ele; se não, mantemos fallback
        const targetEstIds = (establishmentIds && establishmentIds.length > 0) 
            ? establishmentIds 
            : [establishmentId];

        const updatedData = {
            name: name.trim(),
            description: description ? description.trim() : null,
            items: items,
            originalPrice: Number(originalPrice) || 0,
            price: Number(price),
            validityDays: validityDays ? Number(validityDays) : null,
            status: status || 'active',
            commissionRate: Number(commissionRate) || 0,
            sellStartDate: sellStartDate || null,
            sellEndDate: sellEndDate || null,
            salesLimit: salesLimit ? Number(salesLimit) : null,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };

        // Apenas atualiza o vínculo de estabelecimento se for explicitamente fornecido
        if (targetEstIds[0]) {
            updatedData.establishmentIds = targetEstIds;
            updatedData.establishmentId = targetEstIds[0];
        }

        await packageRef.update(updatedData);
        res.status(200).json({ message: 'Pacote atualizado com sucesso!' });
    } catch (error) {
        console.error("Erro ao atualizar pacote:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao atualizar o pacote.' });
    }
});

// ============================================================================
// 🗑️ APAGAR PACOTE
// ============================================================================
router.delete('/:packageId', async (req, res) => {
    const { packageId } = req.params;

    try {
        const { db } = req;
        await db.collection('servicePackages').doc(packageId).delete();
        res.status(200).json({ message: 'Pacote apagado com sucesso.' });
    } catch (error) {
        console.error("Erro ao apagar pacote:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao apagar o pacote.' });
    }
});

module.exports = router;