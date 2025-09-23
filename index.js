// --- CONFIGURAÇÃO INICIAL ---
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');

// --- INICIALIZAÇÃO DO FIREBASE ---
try {
    const serviceAccount = require('./firebase-credentials.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase Admin SDK inicializado com sucesso!");
} catch (error) {
    console.error("Erro Crítico ao inicializar o Firebase Admin SDK:", error);
    console.log("VERIFIQUE: Você criou o arquivo 'firebase-credentials.json' e o colocou na mesma pasta que o 'index.js'?");
    process.exit(1); // Encerra a aplicação se o Firebase não puder ser inicializado
}

// --- CONFIGURAÇÃO DO EXPRESS ---
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// --- MIDDLEWARES ---
const {
    addFirebaseInstances,
    verifyToken,
    isSuperAdmin,
    isOwner,
    hasAccess
} = require('./middlewares/auth');

// Aplica o middleware que adiciona instâncias do Firebase a todas as rotas da API
app.use('/api', addFirebaseInstances);


// --- IMPORTAÇÃO E MONTAGEM DAS ROTAS DA API ---

// Importação de todos os arquivos de rotas
const adminRoutes = require('./routes/admin');
const analyticsRoutes = require('./routes/analytics');
const appointmentRoutes = require('./routes/appointments');
const availabilityRoutes = require('./routes/availability');
const blockageRoutes = require('./routes/blockages');
const cashierRoutes = require('./routes/cashier');
const clientRoutes = require('./routes/clients');
const establishmentRoutes = require('./routes/establishments');
const productRoutes = require('./routes/products');
const professionalRoutes = require('./routes/professionals');
const reportRoutes = require('./routes/reports');
const saleRoutes = require('./routes/sales');
const serviceRoutes = require('./routes/services');
const userRoutes = require('./routes/users');
const comandasRoutes = require('./routes/comandas'); // <-- ROTA ADICIONADA
const clientPortalRoutes = require('./routes/clientPortal'); // <-- NOVA ROTA
// NOVO: Importação das rotas de financeiro
const financialRoutes = require('./routes/financial');


// 1. Rotas de Super Admin (só acessíveis por super-admin)
app.use('/api/admin', verifyToken, isSuperAdmin, adminRoutes);

// 2. Rotas de Dono (só acessíveis pelo dono do estabelecimento)
app.use('/api/users', verifyToken, isOwner, userRoutes);

// 3. Rotas de Acesso Geral (acessíveis por dono e funcionários)
app.use('/api/analytics', verifyToken, hasAccess, analyticsRoutes);
app.use('/api/blockages', verifyToken, hasAccess, blockageRoutes);
app.use('/api/cashier', verifyToken, hasAccess, cashierRoutes);
app.use('/api/clients', verifyToken, hasAccess, clientRoutes);
app.use('/api/products', verifyToken, hasAccess, productRoutes);
app.use('/api/reports', verifyToken, hasAccess, reportRoutes);
app.use('/api/sales', verifyToken, hasAccess, saleRoutes);
app.use('/api/comandas', verifyToken, hasAccess, comandasRoutes); // <-- ROTA MONTADA
// NOVO: Montagem das rotas de financeiro
app.use('/api/financial', verifyToken, hasAccess, financialRoutes);


// 4. Rotas com Lógicas de Acesso Mistas (públicas e privadas dentro do mesmo arquivo)
app.use('/api/appointments', appointmentRoutes);
app.use('/api/establishments', establishmentRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/services', serviceRoutes);

// 5. Rotas Públicas (não precisam de verificação)
app.use('/api/availability', availabilityRoutes);
app.use('/api/client-portal', addFirebaseInstances, clientPortalRoutes); // <-- NOVA ROTA MONTADA


// --- ROTAS PARA SERVIR AS PÁGINAS HTML ---
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });
app.get('/agendar', (req, res) => { res.sendFile(path.join(__dirname, 'cliente.html')); });
app.get('/admin', (req, res) => { res.sendFile(path.join(__dirname, 'admin.html')); });
app.get('/login', (req, res) => { res.sendFile(path.join(__dirname, 'login.html')); });
app.get('/admin-login', (req, res) => { res.sendFile(path.join(__dirname, 'admin-login.html')); });
app.get('/mobile-app', (req, res) => { res.sendFile(path.join(__dirname, 'mobile-app.html')); });


// --- TRATAMENTO DE ERROS ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado no servidor!');
});


// --- INICIALIZAÇÃO DO SERVIDOR ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
