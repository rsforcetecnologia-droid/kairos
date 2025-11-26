// --- CONFIGURAÇÃO INICIAL ---
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');
const multer = require('multer');

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
    process.exit(1);
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
// const dbexplorerRoutes = require('./routes/dbexplorer'); // REMOVIDO
const commissionsRoutes = require('./routes/commissions'); 
const packagesRoutes = require('./routes/packages'); 

const publicSubscriptionsRoutes = require('./routes/publicSubscriptions'); 
const publicRegisterRoutes = require('./routes/publicRegister'); 
const stripeWebhookRoutes = require('./routes/stripeWebhook');

// --- 0. ROTAS DE WEBHOOK (DEVE VIR ANTES DO PARSER DE JSON) ---
app.use('/api/webhook/stripe', addFirebaseInstances, stripeWebhookRoutes); 

// --- 1. ROTA DE UPLOAD DE LOGOTIPO (DEVE VIR ANTES DO express.json()) ---
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

app.post('/api/admin/config/logo', 
    addFirebaseInstances,
    verifyToken,
    isSuperAdmin,
    upload.single('logoFile'),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Nenhum ficheiro enviado.' });
            }
            
            const { db } = req;
            const bucket = admin.storage().bucket('kairos-system.firebasestorage.app'); 
            const fileName = `platform-logo/logo-${Date.now()}-${req.file.originalname}`;
            const fileUpload = bucket.file(fileName);

            const blobStream = fileUpload.createWriteStream({
                metadata: { contentType: req.file.mimetype }
            });

            blobStream.on('error', (error) => {
                console.error("Erro no stream de upload do Storage:", error);
                res.status(500).json({ message: 'Erro ao fazer upload do ficheiro.' });
            });

            blobStream.on('finish', async () => {
                await fileUpload.makePublic();
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

                await db.collection('config').doc('plataforma').set({
                    logoUrl: publicUrl
                }, { merge: true });

                res.status(200).json({ 
                    message: 'Logótipo atualizado com sucesso!',
                    logoUrl: publicUrl
                });
            });

            blobStream.end(req.file.buffer);

        } catch (error) {
            console.error("Erro no upload do logótipo:", error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
        }
    }
);

// IMPORTANTE: Parser de JSON para rotas comuns
app.use(express.json({ limit: '10mb' })); 

// Aplica middleware de instâncias
app.use('/api', addFirebaseInstances);

// --- [CORREÇÃO CRÍTICA] SERVIR ARQUIVOS DA PASTA BUILD (cap-dist) ---
app.use(express.static(path.join(__dirname, 'cap-dist')));


// 1. Rotas de Super Admin
app.use('/api/admin', verifyToken, isSuperAdmin, adminRoutes);
app.use('/api/subscriptions', verifyToken, isSuperAdmin, subscriptionsRoutes);
app.use('/api/import', importRoutes);
// app.use('/api/dbexplorer', verifyToken, isSuperAdmin, dbexplorerRoutes); // REMOVIDO

// 2. Rotas de Dono
app.use('/api/users', verifyToken, checkSubscription, isOwner, userRoutes);

// 3. Rotas de Acesso Geral
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

// 4. Rotas Mistas
app.use('/api/appointments', appointmentRoutes);
app.use('/api/establishments', establishmentRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/services', serviceRoutes);

// 5. Rotas Públicas
app.use('/api/availability', availabilityRoutes);
app.use('/api/client-portal', clientPortalRoutes);
app.use('/api/public/subscriptions', publicSubscriptionsRoutes); 
app.use('/api/public/register', addFirebaseInstances, publicRegisterRoutes); 


// --- ROTAS PARA SERVIR AS PÁGINAS HTML (Apontando para cap-dist) ---

// Rota Principal (Agora serve o landing.html compilado)
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'cap-dist', 'landing.html')); }); 

// Páginas Institucionais
app.get('/funcionalidades.html', (req, res) => { res.sendFile(path.join(__dirname, 'cap-dist', 'funcionalidades.html')); });
app.get('/precos.html', (req, res) => { res.sendFile(path.join(__dirname, 'cap-dist', 'precos.html')); });
app.get('/contato_kairos.html', (req, res) => { res.sendFile(path.join(__dirname, 'cap-dist', 'contato_kairos.html')); });

// Páginas da Aplicação
app.get('/painel', (req, res) => { res.sendFile(path.join(__dirname, 'cap-dist', 'index.html')); });
app.get('/agendar', (req, res) => { res.sendFile(path.join(__dirname, 'cap-dist', 'cliente.html')); });
app.get('/admin', (req, res) => { res.sendFile(path.join(__dirname, 'cap-dist', 'admin.html')); });
app.get('/login', (req, res) => { res.sendFile(path.join(__dirname, 'cap-dist', 'login.html')); });
app.get('/admin-login', (req, res) => { res.sendFile(path.join(__dirname, 'cap-dist', 'admin-login.html')); });
app.get('/mobile-app', (req, res) => { res.sendFile(path.join(__dirname, 'cap-dist', 'mobile-app.html')); });
app.get('/import', (req, res) => { res.sendFile(path.join(__dirname, 'cap-dist', 'import.html')); });
app.get('/datadictionary', (req, res) => { res.sendFile(path.join(__dirname, 'cap-dist', 'datadictionary.html')); });

// Tratamento de rotas não encontradas (Redireciona para Landing se não for API)
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
         res.sendFile(path.join(__dirname, 'cap-dist', 'landing.html'));
    }
});

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