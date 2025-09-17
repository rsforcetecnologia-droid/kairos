const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Criar estabelecimento e dono
router.post('/establishments', async (req, res) => {
    const { establishmentId, name, ownerEmail, ownerPassword } = req.body;
    if (!establishmentId || !name || !ownerEmail || !ownerPassword) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {
        const { db, auth } = req;
        const userRecord = await auth.createUser({
            email: ownerEmail,
            password: ownerPassword,
            displayName: name,
        });
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        await establishmentRef.set({
            name: name,
            ownerUid: userRecord.uid,
            status: 'active',
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        await auth.setCustomUserClaims(userRecord.uid, { role: 'owner', establishmentId: establishmentId });
        res.status(201).json({ message: 'Estabelecimento e dono criados com sucesso!', uid: userRecord.uid });
    } catch (error) {
        console.error("Erro ao criar estabelecimento:", error);
        if (error.code === 'auth/email-already-exists') {
            return res.status(409).json({ message: 'Este e-mail já está sendo utilizado.' });
        }
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Listar todos os estabelecimentos
router.get('/establishments', async (req, res) => {
    try {
        const { db } = req;
        const snapshot = await db.collection('establishments').get();
        if (snapshot.empty) {
            return res.status(200).json([]);
        }
        const establishments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(establishments);
    } catch (error) {
        console.error("Erro ao listar estabelecimentos:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Atualizar status do estabelecimento (active/inactive)
router.patch('/establishments/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || (status !== 'active' && status !== 'inactive')) {
        return res.status(400).json({ message: "O status deve ser 'active' ou 'inactive'." });
    }
    try {
        const { db } = req;
        const establishmentRef = db.collection('establishments').doc(id);
        await establishmentRef.update({ status: status });
        res.status(200).json({ message: `Estabelecimento ${id} foi atualizado para ${status}.` });
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Habilitar/desabilitar acesso mobile para o estabelecimento
router.patch('/establishments/:id/mobile-access', async (req, res) => {
    const { id } = req.params;
    const { enabled } = req.body;
    if (typeof enabled !== 'boolean') {
        return res.status(400).json({ message: "O campo 'enabled' deve ser um valor booleano (true ou false)." });
    }
    try {
        const { db } = req;
        const establishmentRef = db.collection('establishments').doc(id);
        await establishmentRef.update({ mobileAccessEnabled: enabled });
        const statusText = enabled ? 'habilitado' : 'desabilitado';
        res.status(200).json({ message: `Acesso ao aplicativo mobile para ${id} foi ${statusText}.` });
    } catch (error) {
        console.error("Erro ao atualizar acesso ao app mobile:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Criar novo super admin
router.post('/users', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }
    try {
        const { auth } = req;
        const userRecord = await auth.createUser({ email, password });
        await auth.setCustomUserClaims(userRecord.uid, { role: 'super-admin' });
        res.status(201).json({ message: 'Utilizador administrador criado com sucesso!', uid: userRecord.uid });
    } catch (error) {
        console.error("Erro ao criar utilizador:", error);
        if (error.code === 'auth/email-already-exists') {
            return res.status(409).json({ message: 'Este e-mail já está em uso.' });
        }
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Listar super admins
router.get('/users', async (req, res) => {
    try {
        const { auth } = req;
        const listUsersResult = await auth.listUsers(1000);
        const adminUsers = listUsersResult.users
            .filter(user => user.customClaims && user.customClaims.role === 'super-admin')
            .map(user => ({
                uid: user.uid,
                email: user.email,
                role: user.customClaims.role
            }));
        res.status(200).json(adminUsers);
    } catch (error) {
        console.error("Erro ao listar utilizadores:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Deletar super admin
router.delete('/users/:uid', async (req, res) => {
    const { uid } = req.params;
    const requestingUserUid = req.user.uid;
    if (uid === requestingUserUid) {
        return res.status(403).json({ message: 'Não pode apagar a sua própria conta.' });
    }
    try {
        const { auth } = req;
        await auth.deleteUser(uid);
        res.status(200).json({ message: 'Utilizador apagado com sucesso.' });
    } catch (error) {
        console.error("Erro ao apagar utilizador:", error);
        if (error.code === 'auth/user-not-found') {
            return res.status(404).json({ message: 'Utilizador não encontrado.' });
        }
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// ✅ ESSA LINHA RESOLVE O ERRO
module.exports = router;