// routes/professionals.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

router.post('/', verifyToken, hasAccess, async (req, res) => {
    const { db } = req;
    const { establishmentId } = req.user;
    const { name, specialty, dob, cpf, services, workingHours, photo, accessibleIn } = req.body;

    if (!establishmentId || !name || !specialty) {
        return res.status(400).json({ message: 'Os campos establishmentId, name e specialty são obrigatórios.' });
    }

    try {
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        const professionalsRef = db.collection('professionals')
            .where('establishmentId', '==', establishmentId)
            .where('status', '!=', 'inactive');

        let newDocId = null;

        await db.runTransaction(async (transaction) => {
            const establishmentDoc = await transaction.get(establishmentRef);
            if (!establishmentDoc.exists) {
                throw new Error('Estabelecimento não encontrado.');
            }

            // 🔄 CORREÇÃO: Busca o planId de forma robusta (na raiz ou dentro de subscription)
            const subscription = establishmentDoc.data().subscription || {};
            const planId = subscription.planId || establishmentDoc.data().planId;
            
            if (!planId) {
                throw new Error('Nenhum plano de assinatura ativo encontrado.');
            }
            
            let planDoc;
            // 🔄 CORREÇÃO: Reconhece admin_manual e trial com limites altos
            if (planId === 'trial' || planId === 'admin_manual') {
                planDoc = { exists: true, data: () => ({ maxProfessionals: 999, maxUsers: 999 }) };
            } else {
                // 🔄 CORREÇÃO: Aponta para a nova tabela 'saas_plans'
                planDoc = await transaction.get(db.collection('saas_plans').doc(planId));
            }
            
            if (!planDoc.exists) throw new Error('Plano de assinatura inválido.');

            const planLimits = planDoc.data();
            const maxProfessionals = planLimits.maxProfessionals || 999; // Fallback para não travar se o plano não tiver limite definido

            const currentActiveProfessionalsSnapshot = await transaction.get(professionalsRef);
            
            if (currentActiveProfessionalsSnapshot.size >= maxProfessionals) {
                throw new Error('Limite de profissionais ativos atingido para o seu plano atual.');
            }
            
            const newProfessionalData = {
                establishmentId, 
                accessibleIn: Array.isArray(accessibleIn) ? accessibleIn : [establishmentId], 
                name, specialty, dob: dob || null, cpf: cpf || null, 
                services: services || [], workingHours: workingHours || {}, 
                photo: photo || null, status: 'active', showOnAgenda: true, 
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            };

            const newProfessionalRef = db.collection('professionals').doc();
            newDocId = newProfessionalRef.id;
            transaction.set(newProfessionalRef, newProfessionalData);
        });

        res.status(201).json({ message: 'Profissional criado!', professionalId: newDocId });

    } catch (error) {
        console.error("Erro ao criar profissional:", error);
        res.status(403).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

// Listar profissionais (Rota Pública e Privada)
router.get('/:establishmentId', async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { db } = req;
        
        const { authorization } = req.headers;
        let isAuthenticated = false;
        if (authorization && authorization.startsWith('Bearer ')) {
            try {
                await admin.auth().verifyIdToken(authorization.split('Bearer ')[1]);
                isAuthenticated = true;
            } catch (error) { isAuthenticated = false; }
        }

        const [legacySnap, newSnap] = await Promise.all([
            db.collection('professionals').where('establishmentId', '==', establishmentId).get(),
            db.collection('professionals').where('accessibleIn', 'array-contains', establishmentId).get()
        ]);

        const profMap = new Map();

        // 🔥 FILTRO SEVERO: Descarta o profissional se foi desmarcado para esta loja
        legacySnap.docs.forEach(doc => {
            const data = doc.data();
            if (Array.isArray(data.accessibleIn)) {
                if (data.accessibleIn.includes(establishmentId)) {
                    profMap.set(doc.id, { id: doc.id, ...data });
                }
            } else {
                profMap.set(doc.id, { id: doc.id, ...data });
            }
        });

        newSnap.docs.forEach(doc => profMap.set(doc.id, { id: doc.id, ...doc.data() }));

        let professionalsList = Array.from(profMap.values());

        if (!isAuthenticated) {
            professionalsList = professionalsList.filter(p => p.status === 'active' && p.showOnAgenda === true);
        }

        professionalsList.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

        res.status(200).json(professionalsList);

    } catch (error) {
        console.error("Erro ao listar profissionais:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.get('/details/:professionalId', verifyToken, hasAccess, async (req, res) => {
    const { professionalId } = req.params;
    const { establishmentId } = req.user;
    const { db } = req;

    try {
        const doc = await db.collection('professionals').doc(professionalId).get();
        if (!doc.exists) return res.status(404).json({ message: 'Profissional não encontrado.' });

        const data = doc.data();
        const hasLegacyAccess = data.establishmentId === establishmentId;
        const hasArrayAccess = Array.isArray(data.accessibleIn) && data.accessibleIn.includes(establishmentId);

        if (!hasLegacyAccess && !hasArrayAccess) {
            return res.status(403).json({ message: 'Acesso negado.' });
        }
        
        res.status(200).json({ id: doc.id, ...data });

    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.delete('/:professionalId', verifyToken, hasAccess, async (req, res) => {
    const { professionalId } = req.params;
    try {
        const { db } = req;
        if (!professionalId) return res.status(400).json({ message: 'O ID do profissional é obrigatório.' });
        await db.collection('professionals').doc(professionalId).delete();
        res.status(200).json({ message: 'Profissional removido com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.put('/:professionalId', verifyToken, hasAccess, async (req, res) => {
    const { professionalId } = req.params;
    const data = req.body;
    try {
        const { db } = req;
        
        const updateData = { ...data };
        if (data.accessibleIn && Array.isArray(data.accessibleIn)) {
            updateData.accessibleIn = data.accessibleIn;
        }

        await db.collection('professionals').doc(professionalId).update(updateData);
        res.status(200).json({ message: 'Dados do profissional atualizados com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;