const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Lista de módulos padrão que podem ser habilitados/desabilitados
// Deve estar sincronizado com o 'additionalModulesDefinition' do admin.html
const defaultModules = {
    agenda: true,
    comandas: true,
    relatorios: true,
    'sales-report': true, // Relatório de Vendas
    financial: true,
    servicos: true,
    produtos: true,
    suppliers: true,      // NOVO: Fornecedores
    profissionais: true,
    ausencias: true,      // NOVO: Ausências/Bloqueios
    clientes: true,
    packages: true,       // NOVO: Pacotes
    commissions: true,    // NOVO: Comissões
    estabelecimento: true,
    users: true,
    mobileApp: true
};

// Define o objeto de permissões totais para o "Usuário Master" (Dono)
// Garante que o dono tenha acesso total a TUDO ao criar a conta
const masterPermissions = {
    'agenda-section': { view: true, create: true, edit: true, view_all_prof: true },
    'comandas-section': { view: true, create: true, edit: true, view_all_prof: true },
    'relatorios-section': { view: true, create: true, edit: true },
    'sales-report-section': { view: true, create: true, edit: true }, // NOVO
    'financial-section': { view: true, create: true, edit: true },
    'servicos-section': { view: true, create: true, edit: true },
    'produtos-section': { view: true, create: true, edit: true },
    'suppliers-section': { view: true, create: true, edit: true },    // NOVO
    'profissionais-section': { view: true, create: true, edit: true },
    'ausencias-section': { view: true, create: true, edit: true },    // NOVO
    'clientes-section': { view: true, create: true, edit: true },
    'packages-section': { view: true, create: true, edit: true },
    'commissions-section': { view: true, create: true, edit: true },
    'estabelecimento-section': { view: true, create: true, edit: true },
    'users-section': { view: true, create: true, edit: true }
};

// --- FUNÇÃO AUXILIAR PARA TRATAMENTO SEGURO DE DATAS ---
// Previne o erro 500 quando o campo não é um Timestamp válido
const getSafeDate = (dateVal) => {
    if (!dateVal) return null;
    if (typeof dateVal.toDate === 'function') {
        return dateVal.toDate(); // É um Timestamp do Firestore
    }
    const d = new Date(dateVal); // Tenta converter string ou número
    return isNaN(d.getTime()) ? null : d;
};

// Rota para obter configurações da plataforma (ex: URL do Logotipo)
router.get('/config', async (req, res) => {
    try {
        const { db } = req;
        const configDoc = await db.collection('config').doc('plataforma').get();
        
        if (configDoc.exists && configDoc.data().logoUrl) {
            return res.status(200).json({ logoUrl: configDoc.data().logoUrl });
        }
        return res.status(200).json({});
    } catch (error) {
        console.error("Erro ao buscar configurações da plataforma:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// ####################################################################
// ### ROTA DO DASHBOARD (ANALYTICS AVANÇADO) ###
// ####################################################################
router.get('/dashboard-stats', async (req, res) => {
    try {
        const { db } = req;

        // 1. Buscar Planos (para saber os preços e calcular MRR)
        const plansSnapshot = await db.collection('subscriptionPlans').get();
        const planPrices = {};
        plansSnapshot.forEach(doc => {
            planPrices[doc.id] = doc.data().price || 0;
        });

        // 2. Buscar Estabelecimentos
        const establishmentsSnapshot = await db.collection('establishments').get();
        
        let totalEstablishments = 0;
        let activeCount = 0;
        let cancelledCount = 0;
        let mrr = 0;
        
        // Array para o gráfico (últimos 30 dias)
        const newSubscribersLast30Days = Array(30).fill(0); 
        const attentionList = [];
        
        const now = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);

        establishmentsSnapshot.forEach(doc => {
            totalEstablishments++;
            const est = doc.data();
            const sub = est.subscription || {};
            
            // --- Análise de Status, MRR e Atenção ---
            if (est.status === 'active') {
                activeCount++;
                
                // Soma ao MRR se tiver plano válido e preço numérico
                if (sub.planId && typeof planPrices[sub.planId] === 'number') {
                    mrr += planPrices[sub.planId];
                }

                // Verifica expiração (Lista de Atenção) com data segura
                const expiry = getSafeDate(sub.expiryDate);
                if (expiry) {
                    const diffTime = expiry - now;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    // Se expira em 5 dias ou menos (ou já venceu)
                    if (diffDays <= 5) {
                        attentionList.push({
                            id: doc.id,
                            name: est.name,
                            expiryDate: expiry,
                            daysLeft: diffDays,
                            status: diffDays < 0 ? 'Vencido' : 'A vencer'
                        });
                    }
                }

            } else if (est.status === 'deleted' || est.status === 'inactive') {
                cancelledCount++;
            }

            // --- Dados para o Gráfico (Criação nos últimos 30 dias) ---
            const created = getSafeDate(est.createdAt);
            if (created && created >= thirtyDaysAgo) {
                const daysAgo = Math.floor((now - created) / (1000 * 60 * 60 * 24));
                // Inverte o índice: 0 = hoje, 29 = 30 dias atrás
                if (daysAgo >= 0 && daysAgo < 30) {
                    newSubscribersLast30Days[29 - daysAgo]++; 
                }
            }
        });

        // Cálculo de Churn Rate
        const churnRate = totalEstablishments > 0 ? ((cancelledCount / totalEstablishments) * 100).toFixed(1) : 0;

        res.status(200).json({
            kpis: {
                mrr: mrr,
                activeUsers: activeCount,
                newSubscribersData: newSubscribersLast30Days,
                churnRate: churnRate,
                totalUsers: totalEstablishments
            },
            // Retorna apenas os top 5 mais urgentes
            attentionList: attentionList.sort((a, b) => a.daysLeft - b.daysLeft).slice(0, 5) 
        });

    } catch (error) {
        console.error("Erro ao buscar estatísticas do dashboard:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// ####################################################################
// ### ROTAS DE GESTÃO DE ESTABELECIMENTOS ###
// ####################################################################

// Rota POST para criar novo estabelecimento
router.post('/establishments', async (req, res) => {
    const { establishmentId, name, ownerEmail, ownerPassword, modules, subscription } = req.body;
    if (!establishmentId || !name || !ownerEmail || !ownerPassword) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {
        const { db, auth } = req;

        // ATUALIZAÇÃO: Verificar se o ID (que será o urlId inicial) já está em uso por OUTRO documento
        const slugCheck = await db.collection('establishments').where('urlId', '==', establishmentId).get();
        if (!slugCheck.empty) {
             return res.status(409).json({ message: 'Este ID de URL já está em uso.' });
        }

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
            urlId: establishmentId, // Salva o ID como urlId inicial
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
        
        // Usa o establishmentId como chave do documento
        await db.collection('establishments').doc(establishmentId).set(establishmentData);
        
        await auth.setCustomUserClaims(userRecord.uid, { role: 'owner', establishmentId: establishmentId });

        // Cria também um documento na coleção 'users' para o dono (master user)
        const newUserRef = db.collection('users').doc(userRecord.uid);
        await newUserRef.set({
            name: name,
            email: ownerEmail,
            establishmentId: establishmentId,
            permissions: masterPermissions,
            professionalId: null,
            status: 'active',
            isOwnerMaster: true,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(201).json({ message: 'Estabelecimento e dono criados com sucesso!', uid: userRecord.uid });
    } catch (error) {
        console.error("Erro ao criar estabelecimento:", error);
        if (error.code === 'auth/email-already-exists') {
            return res.status(409).json({ message: 'Este e-mail já está sendo utilizado.' });
        }
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Rota GET para listar estabelecimentos com PAGINAÇÃO, FILTROS e ORDENAÇÃO
router.get('/establishments', async (req, res) => {
    try {
        const { db } = req;
        
        // 1. Receber parâmetros da Query String
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = (req.query.search || '').toLowerCase();
        const status = req.query.status; // 'active', 'inactive', 'deleted', 'all'
        const planId = req.query.plan;
        const dateRange = req.query.dateRange; // 'this_month', etc.
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : 'desc';

        let query = db.collection('establishments');

        // 2. Aplicar Filtros de Banco de Dados (Firestore)
        
        // Filtro de Status
        if (status && status !== 'all') {
            query = query.where('status', '==', status);
        } else if (!status) {
            // Padrão: não mostrar deletados se não for solicitado especificamente
            query = query.where('status', 'in', ['active', 'inactive']);
        }

        // Filtro de Data (Criados este mês)
        if (dateRange === 'this_month') {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            query = query.where('createdAt', '>=', admin.firestore.Timestamp.fromDate(startOfMonth))
                         .where('createdAt', '<=', admin.firestore.Timestamp.fromDate(endOfMonth));
        }

        const snapshot = await query.get();
        let establishments = snapshot.docs.map(doc => {
            const data = doc.data();
            return { 
                id: doc.id, 
                ...data,
                // Normaliza dados para ordenação/filtro e evita crash com getSafeDate
                planId: data.subscription?.planId || 'N/A',
                urlId: data.urlId || doc.id, // Garante que urlId exista
                createdAtDate: getSafeDate(data.createdAt) || new Date(0)
            };
        });

        // 3. Aplicar Filtros em Memória (Busca textual e Plano)
        if (search) {
            establishments = establishments.filter(est => 
                (est.name && est.name.toLowerCase().includes(search)) || 
                (est.id && est.id.toLowerCase().includes(search)) ||
                (est.urlId && est.urlId.toLowerCase().includes(search)) || // Busca também pelo urlId
                (est.ownerEmail && est.ownerEmail.toLowerCase().includes(search))
            );
        }

        if (planId && planId !== 'all') {
            establishments = establishments.filter(est => est.planId === planId);
        }

        // 4. Ordenação
        establishments.sort((a, b) => {
            let valA = a[sortBy];
            let valB = b[sortBy];

            // Tratamento especial para datas
            if (sortBy === 'createdAt') {
                valA = a.createdAtDate; 
                valB = b.createdAtDate;
            } else {
                // Tratamento para strings
                if (typeof valA === 'string') valA = valA.toLowerCase();
                if (typeof valB === 'string') valB = valB.toLowerCase();
            }

            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        // 5. Paginação
        const total = establishments.length;
        const totalPages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedData = establishments.slice(startIndex, endIndex);

        // 6. Retorno formatado
        res.status(200).json({
            data: paginatedData,
            pagination: {
                total,
                page,
                limit,
                totalPages
            }
        });

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
        
        // --- CORREÇÃO: Tratamento robusto se o usuário não existir no Auth ---
        if (establishment.ownerUid) {
            try {
                await auth.updateUser(establishment.ownerUid, { disabled: true });
            } catch (authError) {
                if (authError.code === 'auth/user-not-found') {
                    console.warn(`Aviso: Usuário dono (UID: ${establishment.ownerUid}) não encontrado no Auth. Prosseguindo com a exclusão lógica.`);
                } else {
                    throw authError; // Lança se for outro erro (ex: rede)
                }
            }
        }
        // --------------------------------------------------------------------

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
        
        // Tenta reativar o usuário (se existir)
        if (establishment.ownerUid) {
            try {
                await auth.updateUser(establishment.ownerUid, { disabled: false });
            } catch (authError) {
                 if (authError.code === 'auth/user-not-found') {
                    console.warn(`Aviso: Usuário dono (UID: ${establishment.ownerUid}) não encontrado ao restaurar.`);
                }
            }
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

// Rota PUT para editar detalhes (Nome e URL Personalizada)
router.put('/establishments/:id/details', async (req, res) => {
    const { id } = req.params;
    const { name, urlId } = req.body;
    
    if (!name) return res.status(400).json({ message: "O nome é obrigatório." });

    try {
        const { db } = req;
        
        // Se foi enviado um urlId novo, verifica unicidade
        if (urlId) {
            const existing = await db.collection('establishments').where('urlId', '==', urlId).get();
            // Se existe algum doc com este urlId E não é o documento que estamos editando
            if (!existing.empty && existing.docs[0].id !== id) {
                return res.status(409).json({ message: 'Este ID Personalizado (URL) já está em uso por outro estabelecimento.' });
            }
        }

        const updateData = { name };
        if (urlId) updateData.urlId = urlId;

        await db.collection('establishments').doc(id).update(updateData);
        res.status(200).json({ message: 'Dados atualizados com sucesso.' });
    } catch (error) {
        console.error("Erro ao atualizar detalhes:", error);
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

        if (establishment.ownerUid) {
            allUsersToUpdate.push(establishment.ownerUid);
        }

        const employeesSnapshot = await db.collection('users').where('establishmentId', '==', id).get();
        employeesSnapshot.forEach(employeeDoc => {
            allUsersToUpdate.push(employeeDoc.id);
        });

        const userUpdatePromises = allUsersToUpdate.map(async (uid) => {
             try {
                 await auth.updateUser(uid, { disabled: shouldBeDisabled });
             } catch (e) {
                 // Ignora se usuário não existir
             }
        });
        await Promise.all(userUpdatePromises);
        
        await establishmentRef.update({ status: status });
        
        res.status(200).json({ message: `Estabelecimento ${id} e seus usuários foram ${status === 'active' ? 'ativados' : 'inativados'}.` });
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// ####################################################################
// ### ROTAS DE GESTÃO DE USUÁRIOS (SUPER ADMIN) ###
// ####################################################################

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

// ####################################################################
// ### ROTA DE IMPERSONATION (LOGIN COMO CLIENTE) ###
// ####################################################################

router.post('/establishments/:id/impersonate', async (req, res) => {
    const { id } = req.params;
    
    try {
        const { db, auth } = req;
        
        const doc = await db.collection('establishments').doc(id).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        }
        
        const establishment = doc.data();
        const ownerUid = establishment.ownerUid;

        if (!ownerUid) {
            return res.status(400).json({ message: 'Este estabelecimento não possui um dono vinculado.' });
        }

        const customToken = await auth.createCustomToken(ownerUid, { 
            role: 'owner', 
            establishmentId: id,
            impersonated: true 
        });

        res.status(200).json({ token: customToken });

    } catch (error) {
        console.error("Erro ao gerar token de impersonation:", error);
        res.status(500).json({ message: 'Erro ao gerar acesso.' });
    }
});

module.exports = router;