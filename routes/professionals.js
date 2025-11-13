const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

router.post('/', verifyToken, hasAccess, async (req, res) => {
    const { db } = req;
    const { establishmentId } = req.user;
    const { name, specialty, dob, cpf, services, workingHours, photo } = req.body;

    if (!establishmentId || !name || !specialty) {
        return res.status(400).json({ message: 'Os campos establishmentId, name e specialty são obrigatórios.' });
    }

    try {
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        const professionalsRef = db.collection('professionals')
            .where('establishmentId', '==', establishmentId)
            .where('status', '!=', 'inactive');

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
                establishmentId, name, specialty,
                dob: dob || null, cpf: cpf || null, services: services || [],
                workingHours: workingHours || {}, photo: photo || null,
                status: 'active',
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            };

            const newProfessionalRef = db.collection('professionals').doc();
            transaction.set(newProfessionalRef, newProfessionalData);
        });

        res.status(201).json({ message: 'Profissional criado com sucesso!' });

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
        let query = db.collection('professionals').where('establishmentId', '==', establishmentId);
        
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

        if (!isAuthenticated) {
            query = query.where('status', '==', 'active').where('showOnAgenda', '==', true);
        }

        const snapshot = await query.get();
        if (snapshot.empty) return res.status(200).json([]);
        
        const professionalsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
        
        // Verificação de segurança: Garante que o profissional pertença ao estabelecimento do usuário logado
        if (data.establishmentId !== establishmentId) {
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
        await db.collection('professionals').doc(professionalId).update(data);
        res.status(200).json({ message: 'Dados do profissional atualizados com sucesso.' });
    } catch (error) {
        console.error("Erro ao atualizar profissional:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;