// routes/establishments.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, isOwner, hasAccess } = require('../middlewares/auth');

/**
 * Rota GET para buscar detalhes de UM estabelecimento.
 * ATUALIZADO: Busca por urlId (slug) ou docId.
 */
router.get('/:establishmentId', async (req, res) => { 
    const { establishmentId } = req.params;
    const { db } = req; 

    try {
        let doc;
        let establishmentRef;

        // 1. Tenta buscar pelo campo personalizado 'urlId' (Slug)
        const slugQuery = await db.collection('establishments')
            .where('urlId', '==', establishmentId)
            .limit(1)
            .get();

        if (!slugQuery.empty) {
            doc = slugQuery.docs[0];
            establishmentRef = doc.ref;
        } else {
            // 2. Fallback: Tenta buscar pelo ID do documento (comportamento antigo)
            establishmentRef = db.collection('establishments').doc(establishmentId);
            doc = await establishmentRef.get();
        }

        if (!doc || !doc.exists) {
            return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        }
        
        const data = doc.data();
        const realDocId = doc.id; // ID real do documento

        // Verifica se é um usuário autenticado (dono/funcionário)
        const { authorization } = req.headers;
        let isAuthenticated = false;
        if (authorization && authorization.startsWith('Bearer ')) {
            const token = authorization.split('Bearer ')[1];
            try {
                const decodedToken = await admin.auth().verifyIdToken(token);
                if (decodedToken.establishmentId === realDocId) {
                    isAuthenticated = true;
                }
            } catch (error) {
                isAuthenticated = false; 
            }
        }

        // Se for autenticado (vindo do painel admin), retorna todos os dados
        if (isAuthenticated) {
            return res.status(200).json({ id: realDocId, ...data });
        }
        
        // Se for acesso público (cliente.html):
        if (data.publicBookingEnabled === false) {
             return res.status(403).json({ message: 'Este estabelecimento não está aceitando agendamentos online no momento.' });
        }

        // 2. Retorna dados públicos
        const publicData = {
            id: realDocId, // Retorna o ID real para as operações internas
            urlId: data.urlId || realDocId, // Retorna o ID visual
            name: data.name,
            logo: data.logo || null,
            themeColor: data.themeColor || 'indigo',
            primaryColor: data.primaryColor || null,
            textColor: data.textColor || '#111827',
            backgroundImage: data.backgroundImage || null,
            welcomeMessage: data.welcomeMessage || 'Seja bem-vindo(a)!'
        };
        
        res.status(200).json(publicData);

    } catch (error) {
        console.error("Erro ao buscar detalhes do estabelecimento:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});


/**
 * Rota PUT para atualizar os detalhes de UM estabelecimento.
 */
router.put('/:establishmentId', verifyToken, isOwner, async (req, res) => {
    const { establishmentId } = req.params;
    const { db } = req;
    const updatedData = req.body; 

    try {
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        const doc = await establishmentRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        }

        if (doc.id !== req.user.establishmentId) {
             return res.status(403).json({ message: 'Acesso negado.' });
        }

        // Proteção: Não permitir alterar urlId por aqui sem validação (feito pelo Admin)
        delete updatedData.urlId; 

        await establishmentRef.set(updatedData, { merge: true });

        res.status(200).json({ message: 'Estabelecimento atualizado com sucesso.' });

    } catch (error) {
        console.error("Erro ao atualizar estabelecimento:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

/**
 * Rota PATCH para atualizar SOMENTE o status do agendamento público.
 */
router.patch('/:establishmentId/booking-status', verifyToken, isOwner, async (req, res) => {
    const { establishmentId } = req.params;
    const { db } = req;
    const { publicBookingEnabled } = req.body; 

    if (typeof publicBookingEnabled !== 'boolean') {
        return res.status(400).json({ message: 'O valor de "publicBookingEnabled" deve ser um booleano (true/false).' });
    }

    try {
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        const doc = await establishmentRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        }

        if (doc.id !== req.user.establishmentId) {
             return res.status(403).json({ message: 'Acesso negado.' });
        }

        await establishmentRef.update({
            publicBookingEnabled: publicBookingEnabled
        });

        res.status(200).json({ message: `Agendamento online ${publicBookingEnabled ? 'ativado' : 'desativado'} com sucesso.` });

    } catch (error) {
        console.error("Erro ao atualizar status do agendamento:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

/**
 * Rota PATCH para atualizar SOMENTE o e-mail do proprietário.
 */
router.patch('/:establishmentId/owner-email', verifyToken, isOwner, async (req, res) => {
    const { establishmentId } = req.params;
    const { db } = req;
    const { newEmail } = req.body;

    if (!newEmail || typeof newEmail !== 'string') {
        return res.status(400).json({ message: 'O "newEmail" é obrigatório.' });
    }

    if (establishmentId !== req.user.establishmentId) {
        return res.status(403).json({ message: 'Acesso negado.' });
    }

    try {
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        
        await establishmentRef.update({
            ownerEmail: newEmail
        });

        res.status(200).json({ message: `E-mail do proprietário atualizado com sucesso.` });

    } catch (error) {
        console.error("Erro ao atualizar e-mail do proprietário:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

/**
 * Rota DELETE para o DONO cancelar sua própria conta (CHURN).
 * Inativa o estabelecimento e expira a assinatura imediatamente, sem apagar dados.
 */
router.delete('/:establishmentId', verifyToken, isOwner, async (req, res) => {
    const { establishmentId } = req.params;
    const { db, auth } = req;

    try {
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        const doc = await establishmentRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        }

        // Segurança: Garante que o ID da rota bate com o token do usuário logado
        if (doc.id !== req.user.establishmentId) {
             return res.status(403).json({ message: 'Acesso negado.' });
        }

        const now = new Date();

        // --- LÓGICA DE CHURN / INATIVAÇÃO ---
        // Não apagamos nada. Apenas alteramos o estado.
        await establishmentRef.update({
            status: 'inactive', // Define como inativo para o painel Admin contar como Churn
            
            // Registra o fim da assinatura como agora
            'subscription.expiryDate': admin.firestore.Timestamp.fromDate(now), 
            'subscription.status': 'canceled',
            
            // Metadados de cancelamento para auditoria
            canceledAt: admin.firestore.Timestamp.fromDate(now),
            cancellationReason: 'Solicitado pelo próprio usuário (Botão Excluir)'
        });

        // Desabilitar o acesso do usuário Dono no Auth para bloquear login imediato
        if (doc.data().ownerUid) {
            try {
                await auth.updateUser(doc.data().ownerUid, { disabled: true });
            } catch (e) {
                console.warn("Não foi possível desabilitar o usuário Auth (pode já estar deletado):", e.message);
            }
        }

        res.status(200).json({ message: 'Conta cancelada e inativada com sucesso.' });

    } catch (error) {
        console.error("Erro ao processar cancelamento:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;