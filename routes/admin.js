const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const defaultModules = {
    agenda: true,
    comandas: true,
    relatorios: true,
    'sales-report': true,
    financial: true,
    servicos: true,
    produtos: true,
    profissionais: true,
    clientes: true,
    estabelecimento: true,
    users: true,
    mobileApp: true
};

router.get('/dashboard-stats', async (req, res) => {
    try {
        const { db } = req;
        const establishmentsSnapshot = await db.collection('establishments').get();
        
        let activeCount = 0;
        establishmentsSnapshot.forEach(doc => {
            if (doc.data().status === 'active') {
                activeCount++;
            }
        });

        res.status(200).json({
            total: establishmentsSnapshot.size,
            active: activeCount,
            inactive: establishmentsSnapshot.size - activeCount
        });
    } catch (error) {
        console.error("Erro ao buscar estatísticas do dashboard:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.post('/establishments', async (req, res) => {
    const { establishmentId, name, ownerEmail, ownerPassword, modules, subscription } = req.body;
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

        const establishmentData = {
            name: name,
            ownerUid: userRecord.uid,
            ownerEmail: ownerEmail,
            status: 'active',
            modules: modules || defaultModules,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        if (subscription && subscription.planId && subscription.expiryDate) {
            establishmentData.subscription = {
                planId: subscription.planId,
                expiryDate: admin.firestore.Timestamp.fromDate(new Date(subscription.expiryDate))
            };
        } else {
            const trialDays = 7;
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + trialDays);
            
            establishmentData.subscription = {
                planId: 'trial',
                expiryDate: admin.firestore.Timestamp.fromDate(expiryDate)
            };
        }
        
        await db.collection('establishments').doc(establishmentId).set(establishmentData);
        
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

router.get('/establishments', async (req, res) => {
    try {
        const { db } = req;
        const { includeDeleted } = req.query;

        let query = db.collection('establishments');

        if (includeDeleted === 'true') {
            query = query.where('status', '==', 'deleted');
        } else {
            query = query.where('status', 'in', ['active', 'inactive']);
        }

        const snapshot = await query.orderBy('createdAt', 'desc').get();
        if (snapshot.empty) return res.status(200).json([]);
        
        const establishments = snapshot.docs.map(doc => {
            const data = doc.data();
            return { 
                id: doc.id, 
                ...data,
                modules: data.modules || defaultModules 
            };
        });
        res.status(200).json(establishments);
    } catch (error) {
        console.error("Erro ao listar estabelecimentos:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});


router.delete('/establishments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { db, auth } = req;
        const establishmentRef = db.collection('establishments').doc(id);
        const doc = await establishmentRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        }

        const establishment = doc.data();
        if (establishment.ownerUid) {
            await auth.updateUser(establishment.ownerUid, { disabled: true });
        }

        await establishmentRef.update({
            status: 'deleted',
            deletedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(200).json({ message: 'Estabelecimento movido para a lixeira.' });
    } catch (error) {
        console.error("Erro ao mover para lixeira:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.post('/establishments/:id/restore', async (req, res) => {
    const { id } = req.params;
    try {
        const { db, auth } = req;
        const establishmentRef = db.collection('establishments').doc(id);
        const doc = await establishmentRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        }

        const establishment = doc.data();
        if (establishment.ownerUid) {
            await auth.updateUser(establishment.ownerUid, { disabled: false });
        }

        await establishmentRef.update({
            status: 'active',
            deletedAt: admin.firestore.FieldValue.delete()
        });
        res.status(200).json({ message: 'Estabelecimento restaurado com sucesso.' });
    } catch (error) {
        console.error("Erro ao restaurar estabelecimento:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});


router.put('/establishments/:id/details', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "O nome é obrigatório." });

    try {
        const { db } = req;
        await db.collection('establishments').doc(id).update({ name });
        res.status(200).json({ message: 'Nome do estabelecimento atualizado.' });
    } catch (error) {
        console.error("Erro ao atualizar nome:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});


router.patch('/establishments/:id/modules', async (req, res) => {
    const { id } = req.params;
    const { modules } = req.body;

    if (!modules || typeof modules !== 'object') {
        return res.status(400).json({ message: "O campo 'modules' deve ser um objeto." });
    }
    try {
        const { db } = req;
        await db.collection('establishments').doc(id).update({ modules });
        res.status(200).json({ message: `Módulos para ${id} foram atualizados.` });
    } catch (error) {
        console.error("Erro ao atualizar módulos:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.patch('/establishments/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || (status !== 'active' && status !== 'inactive')) {
        return res.status(400).json({ message: "O status deve ser 'active' ou 'inactive'." });
    }
    try {
        const { db, auth } = req;
        const establishmentRef = db.collection('establishments').doc(id);
        const doc = await establishmentRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        }
        
        const establishment = doc.data();
        const shouldBeDisabled = status === 'inactive';
        
        const allUsersToUpdate = [];

        // Adiciona o dono à lista de usuários para atualizar
        if (establishment.ownerUid) {
            allUsersToUpdate.push(establishment.ownerUid);
        }

        // Busca todos os funcionários do estabelecimento
        const employeesSnapshot = await db.collection('users').where('establishmentId', '==', id).get();
        employeesSnapshot.forEach(employeeDoc => {
            allUsersToUpdate.push(employeeDoc.id);
        });

        // Atualiza todos os usuários (dono e funcionários) em paralelo
        const userUpdatePromises = allUsersToUpdate.map(uid => auth.updateUser(uid, { disabled: shouldBeDisabled }));
        await Promise.all(userUpdatePromises);
        
        // Atualiza o status do estabelecimento
        await establishmentRef.update({ status: status });
        
        res.status(200).json({ message: `Estabelecimento ${id} e todos os seus ${allUsersToUpdate.length} usuários foram ${status === 'active' ? 'ativados' : 'inativados'}.` });
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

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
            return res.status(409).json({ message: 'Este e-mail já está sendo utilizado.' });
        }
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

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

module.exports = router;