// --- CONFIGURAÇÃO INICIAL ---
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');

// --- INICIALIZAÇÃO DO FIREBASE (MODIFICADO PARA GOOGLE CLOUD) ---
try {
    let serviceAccount;
    // No Cloud Run, usa o secret. Localmente, usa o arquivo.
    if (process.env.FIREBASE_CONFIG_SECRET) {
        serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG_SECRET);
    } else {
        serviceAccount = require('./firebase-credentials.json');
    }

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

// --- MIDDLEWARES ---
const {
    addFirebaseInstances,
    verifyToken,
    isSuperAdmin,
    isOwner,
    hasAccess,
    checkSubscription
} = require('./middlewares/auth');

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
const comandasRoutes = require('./routes/comandas');
const clientPortalRoutes = require('./routes/clientPortal');
const financialRoutes = require('./routes/financial');
const subscriptionsRoutes = require('./routes/subscriptions');
const importRoutes = require('./routes/import');
const dbexplorerRoutes = require('./routes/dbexplorer');
const commissionsRoutes = require('./routes/commissions'); 
const packagesRoutes = require('./routes/packages'); 

const publicSubscriptionsRoutes = require('./routes/publicSubscriptions'); 
const publicRegisterRoutes = require('./routes/publicRegister'); 
const stripeWebhookRoutes = require('./routes/stripeWebhook'); // ADICIONADO: Importa a rota do Webhook

// --- 0. ROTAS DE WEBHOOK (DEVE VIR ANTES DO PARSER DE JSON) ---
// Aplica o parser 'raw' e o middleware de instância para o Webhook do Stripe
app.use('/api/webhook/stripe', addFirebaseInstances, stripeWebhookRoutes); 

// IMPORTANTE: Parser de JSON para rotas comuns (DEPOIS do Webhook)
app.use(express.json({ limit: '10mb' })); 

// Aplica o middleware que adiciona instâncias do Firebase a todas as rotas da API
app.use('/api', addFirebaseInstances);

// Serve arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname)));


// 1. Rotas de Super Admin (só acessíveis por super-admin)
app.use('/api/admin', verifyToken, isSuperAdmin, adminRoutes);
app.use('/api/subscriptions', verifyToken, isSuperAdmin, subscriptionsRoutes);
app.use('/api/import', importRoutes);
app.use('/api/dbexplorer', verifyToken, isSuperAdmin, dbexplorerRoutes);


// 2. Rotas de Dono (só acessíveis pelo dono do estabelecimento)
app.use('/api/users', verifyToken, checkSubscription, isOwner, userRoutes);

// 3. Rotas de Acesso Geral (acessíveis por dono e funcionários)
app.use('/api/analytics', verifyToken, checkSubscription, hasAccess, analyticsRoutes);
app.use('/api/blockages', verifyToken, checkSubscription, hasAccess, blockageRoutes);
app.use('/api/cashier', verifyToken, checkSubscription, hasAccess, cashierRoutes);
app.use('/api/clients', verifyToken, checkSubscription, hasAccess, clientRoutes);
app.use('/api/products', verifyToken, checkSubscription, hasAccess, productRoutes);
app.use('/api/reports', verifyToken, checkSubscription, hasAccess, reportRoutes);
app.use('/api/sales', verifyToken, checkSubscription, hasAccess, saleRoutes);
app.use('/api/comandas', verifyToken, checkSubscription, hasAccess, comandasRoutes);
app.use('/api/financial', verifyToken, checkSubscription, hasAccess, financialRoutes);
app.use('/api/commissions', verifyToken, checkSubscription, hasAccess, commissionsRoutes); 
app.use('/api/packages', verifyToken, checkSubscription, hasAccess, packagesRoutes); 


// 4. Rotas com Lógicas de Acesso Mistas (públicas e privadas dentro do mesmo arquivo)
app.use('/api/appointments', appointmentRoutes);
app.use('/api/establishments', establishmentRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/services', serviceRoutes);

// 5. Rotas Públicas (acesso totalmente desprotegido)
app.use('/api/availability', availabilityRoutes);
app.use('/api/client-portal', clientPortalRoutes);

app.use('/api/public/subscriptions', publicSubscriptionsRoutes); 
app.use('/api/public/register', addFirebaseInstances, publicRegisterRoutes); 


// --- ROTAS PARA SERVIR AS PÁGINAS HTML ---

// ** Rota Principal (/) agora serve o site institucional (home.html) **
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'home.html')); }); 

// ** Páginas do Site Institucional **
app.get('/funcionalidades.html', (req, res) => { res.sendFile(path.join(__dirname, 'funcionalidades.html')); });
app.get('/precos.html', (req, res) => { res.sendFile(path.join(__dirname, 'precos.html')); });
app.get('/contato_kairos.html', (req, res) => { res.sendFile(path.join(__dirname, 'contato_kairos.html')); });

// ** Páginas da Aplicação de Gestão **
// A sua aplicação original (index.html) agora é servida pela rota /painel
app.get('/painel', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

app.get('/agendar', (req, res) => { res.sendFile(path.join(__dirname, 'cliente.html')); });
app.get('/admin', (req, res) => { res.sendFile(path.join(__dirname, 'admin.html')); });
app.get('/login', (req, res) => { res.sendFile(path.join(__dirname, 'login.html')); });
app.get('/admin-login', (req, res) => { res.sendFile(path.join(__dirname, 'admin-login.html')); });
app.get('/mobile-app', (req, res) => { res.sendFile(path.join(__dirname, 'mobile-app.html')); });
app.get('/import', (req, res) => { res.sendFile(path.join(__dirname, 'import.html')); });
app.get('/dbexplorer', (req, res) => { res.sendFile(path.join(__dirname, 'dbexplorer.html')); });
app.get('/datadictionary', (req, res) => { res.sendFile(path.join(__dirname, 'datadictionary.html')); });


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
