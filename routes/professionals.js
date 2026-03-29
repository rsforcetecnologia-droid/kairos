// routes/professionals.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

router.post('/', verifyToken, hasAccess, async (req, res) => {
    const { db } = req;
    const { establishmentId } = req.user;
    // Capturamos o accessibleIn (array de filiais onde o profissional atende)
    const { name, specialty, dob, cpf, services, workingHours, photo, accessibleIn } = req.body;

    if (!establishmentId || !name || !specialty) {
        return res.status(400).json({ message: 'Os campos establishmentId, name e specialty são obrigatórios.' });
    }

    try {
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        // A contagem para o limite do plano continua a ser baseada na loja "Mãe" que o criou
        const professionalsRef = db.collection('professionals')
            .where('establishmentId', '==', establishmentId)
            .where('status', '!=', 'inactive');

        let newDocId = null;

        await db.runTransaction(async (transaction) => {
            const establishmentDoc = await transaction.get(establishmentRef);
            if (!establishmentDoc.exists) {
                throw new Error('Estabelecimento não encontrado.');
            }

            const subscription = establishmentDoc.data().subscription;
            if (!subscription || !subscription.planId) {
                throw new Error('Nenhum plano de assinatura ativo encontrado para este estabelecimento.');
            }
            
            let planDoc;
            if (subscription.planId === 'trial') {
                planDoc = {
                    exists: true,
                    data: () => ({ maxProfessionals: 1, maxUsers: 1 })
                };
            } else {
                planDoc = await transaction.get(db.collection('subscriptionPlans').doc(subscription.planId));
            }
            
            if (!planDoc.exists) {
                throw new Error('Plano de assinatura não encontrado ou inválido.');
            }

            const planLimits = planDoc.data();
            const maxProfessionals = planLimits.maxProfessionals || 0;

            const currentActiveProfessionalsSnapshot = await transaction.get(professionalsRef);
            
            if (currentActiveProfessionalsSnapshot.size >= maxProfessionals) {
                throw new Error('Limite de profissionais ativos atingido para o seu plano.');
            }
            
            const newProfessionalData = {
                establishmentId, // Mantemos para a faturação/limites
                accessibleIn: Array.isArray(accessibleIn) ? accessibleIn : [establishmentId], // O array mágico da rede!
                name, 
                specialty,
                dob: dob || null, 
                cpf: cpf || null, 
                services: services || [],
                workingHours: workingHours || {}, 
                photo: photo || null,
                status: 'active',
                showOnAgenda: true, // Por padrão, os novos vão para a agenda
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            };

            const newProfessionalRef = db.collection('professionals').doc();
            newDocId = newProfessionalRef.id;
            transaction.set(newProfessionalRef, newProfessionalData);
        });

        res.status(201).json({ message: 'Profissional criado com sucesso!', professionalId: newDocId });

    } catch (error) {
        console.error("Erro ao criar profissional:", error);
        res.status(403).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

// Listar profissionais (Rota Pública E Privada)
router.get('/:establishmentId', async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { db } = req;
        
        // Verifica a autenticação para decidir se deve retornar profissionais inativos
        const { authorization } = req.headers;
        let isAuthenticated = false;
        if (authorization && authorization.startsWith('Bearer ')) {
            const token = authorization.split('Bearer ')[1];
            try {
                await admin.auth().verifyIdToken(token);
                isAuthenticated = true;
            } catch (error) {
                isAuthenticated = false;
            }
        }

        // 🔄 DUPLA QUERY (Retrocompatibilidade e Distribuição)
        const [legacySnap, newSnap] = await Promise.all([
            db.collection('professionals').where('establishmentId', '==', establishmentId).get(),
            db.collection('professionals').where('accessibleIn', 'array-contains', establishmentId).get()
        ]);

        const profMap = new Map();

        legacySnap.docs.forEach(doc => profMap.set(doc.id, { id: doc.id, ...doc.data() }));
        newSnap.docs.forEach(doc => profMap.set(doc.id, { id: doc.id, ...doc.data() }));

        let professionalsList = Array.from(profMap.values());

        // Se for o cliente final a aceder (sem login), filtramos os inativos/ocultos
        if (!isAuthenticated) {
            professionalsList = professionalsList.filter(p => p.status === 'active' && p.showOnAgenda === true);
        }

        // Ordenamos alfabeticamente para uma melhor apresentação
        professionalsList.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

        res.status(200).json(professionalsList);

    } catch (error) {
        console.error("Erro ao listar profissionais:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// --- INÍCIO DA NOVA ROTA ---
// Rota GET para buscar detalhes de UM profissional (usado pela tela 'Meu Perfil')
router.get('/details/:professionalId', verifyToken, hasAccess, async (req, res) => {
    const { professionalId } = req.params;
    const { establishmentId } = req.user;
    const { db } = req;

    try {
        const professionalRef = db.collection('professionals').doc(professionalId);
        const doc = await professionalRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Profissional não encontrado.' });
        }

        const data = doc.data();
        
        // Verificação de segurança Híbrida: Permite se for o criador original OU se a loja logada estiver no array accessibleIn
        const hasLegacyAccess = data.establishmentId === establishmentId;
        const hasArrayAccess = Array.isArray(data.accessibleIn) && data.accessibleIn.includes(establishmentId);

        if (!hasLegacyAccess && !hasArrayAccess) {
            return res.status(403).json({ message: 'Acesso negado.' });
        }
        
        res.status(200).json({ id: doc.id, ...data });

    } catch (error) {
        console.error("Erro ao buscar detalhes do profissional:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});
// --- FIM DA NOVA ROTA ---

// Deletar profissional (Rota Privada)
router.delete('/:professionalId', verifyToken, hasAccess, async (req, res) => {
    const { professionalId } = req.params;
    try {
        const { db } = req;
        if (!professionalId) return res.status(400).json({ message: 'O ID do profissional é obrigatório.' });
        await db.collection('professionals').doc(professionalId).delete();
        res.status(200).json({ message: 'Profissional removido com sucesso.' });
    } catch (error) {
        console.error("Erro ao remover profissional:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Atualizar dados do profissional (Rota Privada)
router.put('/:professionalId', verifyToken, hasAccess, async (req, res) => {
    const { professionalId } = req.params;
    const data = req.body;
    try {
        const { db } = req;
        
        // Garantimos que se enviaram um novo array de acessos, ele substitui
        const updateData = { ...data };
        if (data.accessibleIn && Array.isArray(data.accessibleIn)) {
            updateData.accessibleIn = data.accessibleIn;
        }

        await db.collection('professionals').doc(professionalId).update(updateData);
        res.status(200).json({ message: 'Dados do profissional atualizados com sucesso.' });
    } catch (error) {
        console.error("Erro ao atualizar profissional:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;