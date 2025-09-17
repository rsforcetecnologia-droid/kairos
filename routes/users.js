const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Criar novo usuário (funcionário)
router.post('/', async (req, res) => {
    const { email, password, name, permissions } = req.body;
    const { establishmentId } = req.user;
    if (!email || !password || !name || !permissions) {
        return res.status(400).json({ message: 'Email, senha, nome e permissões são obrigatórios.' });
    }
    try {
        const { db, auth } = req;
        const userRecord = await auth.createUser({
            email, password, displayName: name,
        });
        await auth.setCustomUserClaims(userRecord.uid, {
            role: 'employee',
            establishmentId: establishmentId
        });
        await db.collection('users').doc(userRecord.uid).set({
            name, email, establishmentId, permissions,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(201).json({ message: 'Usuário criado com sucesso!', uid: userRecord.uid });
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        if (error.code === 'auth/email-already-exists') {
            return res.status(409).json({ message: 'Este e-mail já está em uso.' });
        }
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
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

// Atualizar dados do usuário (nome, permissões)
router.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { name, permissions } = req.body;
    if (!name || !permissions) {
        return res.status(400).json({ message: 'Nome e permissões são obrigatórios.' });
    }
    try {
        const { db, auth } = req;
        await auth.updateUser(userId, { displayName: name });
        await db.collection('users').doc(userId).update({ name, permissions });
        res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
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

// ✅ ESSA LINHA RESOLVE O ERRO
module.exports = router;