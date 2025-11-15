// routes/users.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.post('/', async (req, res) => {
    const { email, password, name, permissions, professionalId } = req.body;
    const { establishmentId } = req.user;
    const { db, auth } = req;

    if (!email || !password || !name || !permissions) {
        return res.status(400).json({ message: 'Email, senha, nome e permissões são obrigatórios.' });
    }

    try {
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        const usersRef = db.collection('users')
            .where('establishmentId', '==', establishmentId)
            .where('status', '!=', 'inactive');

        // 1. VERIFICAÇÃO DE LIMITE DO PLANO (DENTRO DA TRANSAÇÃO)
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
            const maxUsers = planLimits.maxUsers || 0;

            const currentActiveUsersSnapshot = await transaction.get(usersRef);

            if (currentActiveUsersSnapshot.size + 1 >= maxUsers) {
                throw new Error('Limite de usuários ativos atingido para o seu plano.');
            }
        });
        
        // 2. CRIAÇÃO DO UTILIZADOR (FORA DA TRANSAÇÃO)
        const userRecord = await auth.createUser({
            email, password, displayName: name,
        });

        await auth.setCustomUserClaims(userRecord.uid, {
            role: 'employee',
            establishmentId: establishmentId
        });

        const newUserRef = db.collection('users').doc(userRecord.uid);
        await newUserRef.set({
            name, email, establishmentId, permissions,
            professionalId: professionalId || null,
            status: 'active',
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(201).json({ message: 'Usuário criado com sucesso!' });

    } catch (error) {
        console.error("Erro ao criar usuário:", error);

        // ####################################################################
        // ### INÍCIO DA CORREÇÃO ###
        // ####################################################################
        
        // 3. LÓGICA DE RECUPERAÇÃO DE UTILIZADOR "ÓRFÃO"
        if (error.code === 'auth/email-already-exists') {
            try {
                // O e-mail já existe. Vamos verificar a quem pertence.
                const existingUser = await auth.getUserByEmail(email);
                const claims = existingUser.customClaims || {};

                // Verifica se o utilizador pertence a ESTE estabelecimento
                if (claims.establishmentId === establishmentId) {
                    
                    // O e-mail é deste estabelecimento.
                    // Vamos verificar se ele está "órfão" (sem documento no Firestore)
                    const userDoc = await db.collection('users').doc(existingUser.uid).get();
                    
                    if (!userDoc.exists) {
                        // Este é um utilizador órfão (Auth existe, Firestore não).
                        // Vamos "recuperar" esta conta atualizando-a com os novos dados.

                        await auth.updateUser(existingUser.uid, {
                            password: password,
                            displayName: name,
                            disabled: false // Garante que está ativo
                        });
                        
                        // Garante que as claims estão corretas
                        await auth.setCustomUserClaims(existingUser.uid, {
                            role: 'employee',
                            establishmentId: establishmentId
                        });
                        
                        // (Re)Cria o documento no Firestore
                        await db.collection('users').doc(existingUser.uid).set({
                            name, email, establishmentId, permissions,
                            professionalId: professionalId || null,
                            status: 'active', // Define como ativo
                            createdAt: admin.firestore.FieldValue.serverTimestamp() // Trata como novo
                        });
                        
                        // Retorna sucesso como se fosse uma criação normal
                        return res.status(201).json({ message: 'Usuário (órfão) recuperado e atualizado com sucesso!' });
                    }
                    
                    // Se o documento existe, o e-mail está legitimamente em uso.
                    if (userDoc.data().status === 'inactive') {
                        return res.status(409).json({ message: 'Este e-mail já pertence a um usuário inativo. Use o botão "Excluir" (lixeira) para apagar o usuário inativo antes de reutilizar o e-mail.' });
                    }
                }
                
                // Se o e-mail existe mas pertence a outro estabelecimento
                return res.status(409).json({ message: 'Este e-mail já está em uso.' });

            } catch (lookupError) {
                // Erro ao tentar recuperar o utilizador
                console.error("Erro ao tentar recuperar usuário órfão:", lookupError);
                return res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor.' });
            }
        }
        // ####################################################################
        // ### FIM DA CORREÇÃO ###
        // ####################################################################

        res.status(403).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

// Listar usuários do estabelecimento
router.get('/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    try {
        const { db } = req;
        const snapshot = await db.collection('users').where('establishmentId', '==', establishmentId).get();
        if (snapshot.empty) return res.status(200).json([]);
        const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(usersList);
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Rota para ativar ou inativar um usuário
router.patch('/:userId/status', async (req, res) => {
    const { userId } = req.params;
    const { status } = req.body;
    const { establishmentId } = req.user;

    if (!status || (status !== 'active' && status !== 'inactive')) {
        return res.status(400).json({ message: "O status deve ser 'active' ou 'inactive'." });
    }

    try {
        const { db, auth } = req;
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists || userDoc.data().establishmentId !== establishmentId) {
            return res.status(403).json({ message: "Acesso negado ou usuário não encontrado." });
        }

        const shouldBeDisabled = status === 'inactive';
        await auth.updateUser(userId, { disabled: shouldBeDisabled });
        await userRef.update({ status: status });

        res.status(200).json({ message: `Usuário ${status === 'active' ? 'ativado' : 'inativado'} com sucesso.` });
    } catch (error) {
        console.error("Erro ao atualizar status do usuário:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
});

// Atualizar dados do usuário (nome, permissões, professionalId E E-MAIL)
router.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { name, permissions, professionalId, email } = req.body; 
    
    if (!name || !permissions) {
        return res.status(400).json({ message: 'Nome e permissões são obrigatórios.' });
    }
    try {
        const { db, auth } = req;

        const authUpdatePayload = { displayName: name };
        if (email) {
            authUpdatePayload.email = email;
        }

        await auth.updateUser(userId, authUpdatePayload);
        
        const updateData = { name, permissions };
        
        if (professionalId !== undefined) {
             updateData.professionalId = professionalId || null;
        }
        if (email) {
            updateData.email = email;
        }

        await db.collection('users').doc(userId).update(updateData);
        
        res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    
    } catch (error) {
        if (error.code === 'auth/email-already-exists') {
            return res.status(409).json({ message: 'Este e-mail já está em uso por outra conta.' });
        }
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Atualizar senha do usuário
router.put('/:userId/password', async (req, res) => {
    const { userId } = req.params;
    const { password } = req.body;
    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'A nova senha é obrigatória e deve ter pelo menos 6 caracteres.' });
    }
    try {
        const { auth } = req;
        const userToEdit = await auth.getUser(userId);
        if (userToEdit.customClaims.establishmentId !== req.user.establishmentId) {
             return res.status(403).json({ message: 'Acesso negado. Você não pode alterar usuários de outro estabelecimento.' });
        }
        await auth.updateUser(userId, { password: password });
        res.status(200).json({ message: 'Senha do usuário atualizada com sucesso.' });
    } catch (error) {
        console.error("Erro ao atualizar senha do usuário:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Deletar usuário
router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const { db, auth } = req;
        await auth.deleteUser(userId);
        await db.collection('users').doc(userId).delete();
        res.status(200).json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;