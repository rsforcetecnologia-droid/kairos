// --- CONFIGURAÇÃO INICIAL ---
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');
const multer = require('multer'); 

// --- INICIALIZAÇÃO DO FIREBASE (CRÍTICO: Robustez) ---
try {
    let serviceAccount;
    
    // 1. Tenta carregar do Secret (ambiente Cloud Run)
    if (process.env.FIREBASE_CONFIG_SECRET) {
        console.log("Tentando carregar credenciais via Variável de Ambiente...");
        serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG_SECRET);
    } 
    // 2. Tenta carregar do arquivo local (Desenvolvimento local)
    else {
        console.log("Variável FIREBASE_CONFIG_SECRET não encontrada. Tentando arquivo local...");
        try {
            serviceAccount = require('./firebase-credentials.json');
        } catch (e) {
            console.warn("Arquivo local firebase-credentials.json não encontrado.");
        }
    }

    // Validação Rigorosa
    if (!serviceAccount || Object.keys(serviceAccount).length === 0) {
        throw new Error("NENHUMA credencial do Firebase encontrada. O servidor não pode funcionar sem DB.");
    }

    // Inicializa o Admin SDK
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            // ATUALIZADO: Nome do bucket correto para a região US
            storageBucket: 'kairos-agenda-us.firebasestorage.app' 
        });
        console.log("✅ Firebase Admin SDK inicializado com sucesso!");
    } else {
        console.log("ℹ️ Firebase Admin SDK já estava inicializado.");
    }

} catch (error) {
    // ERRO CRÍTICO: Mata o processo para o erro aparecer no log do Cloud Run
    console.error("🚨 ERRO FATAL NA INICIALIZAÇÃO DO FIREBASE 🚨");
    console.error(error.message);
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

// --- IMPORTAÇÃO DAS ROTAS ---
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
const stripeWebhookRoutes = require('./routes/stripeWebhook');

// --- 0. ROTAS DE WEBHOOK ---
app.use('/api/webhook/stripe', addFirebaseInstances, stripeWebhookRoutes); 

// --- 1. ROTA DE UPLOAD DE LOGOTIPO ---
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

app.post('/api/admin/config/logo', 
    addFirebaseInstances, 
    verifyToken,          
    isSuperAdmin,         
    upload.single('logoFile'), 
    async (req, res) => {
        try {
            if (!req.file) return res.status(400).json({ message: 'Nenhum ficheiro enviado.' });
            
            const { db } = req; 
            // CORREÇÃO: Bucket US
            const bucket = admin.storage().bucket('kairos-agenda-us.firebasestorage.app'); 
            const fileName = `platform-logo/logo-${Date.now()}-${req.file.originalname}`;
            const fileUpload = bucket.file(fileName);

            const blobStream = fileUpload.createWriteStream({ metadata: { contentType: req.file.mimetype } });
            blobStream.on('error', (error) => {
                console.error("Erro no stream de upload:", error);
                res.status(500).json({ message: 'Erro ao fazer upload.' });
            });

            blobStream.on('finish', async () => {
                await fileUpload.makePublic();
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
                await db.collection('config').doc('plataforma').set({ logoUrl: publicUrl }, { merge: true });
                res.status(200).json({ message: 'Logótipo atualizado!', logoUrl: publicUrl });
            });

            blobStream.end(req.file.buffer);
        } catch (error) {
            console.error("Erro no upload:", error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
        }
    }
);

// --- PARSER JSON E API ---
app.use(express.json({ limit: '10mb' })); 
app.use('/api', addFirebaseInstances); 

// ======================================================================
// SERVIR a pasta do BUILD
// ======================================================================
app.use(express.static(path.join(__dirname, 'cap-dist')));

// --- ROTAS DA API ---
app.use('/api/admin', verifyToken, isSuperAdmin, adminRoutes);
app.use('/api/subscriptions', verifyToken, isSuperAdmin, subscriptionsRoutes);
app.use('/api/import', importRoutes);
app.use('/api/dbexplorer', verifyToken, isSuperAdmin, dbexplorerRoutes);
app.use('/api/users', verifyToken, checkSubscription, isOwner, userRoutes);
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
app.use('/api/establishments', verifyToken, hasAccess, establishmentRoutes);
app.use('/api/professionals', verifyToken, hasAccess, professionalRoutes);
app.use('/api/services', verifyToken, hasAccess, serviceRoutes);
app.use('/api/availability', verifyToken, hasAccess, availabilityRoutes);
app.use('/api/client-portal', clientPortalRoutes);
app.use('/api/public/subscriptions', publicSubscriptionsRoutes);
app.use('/api/public/register', addFirebaseInstances, publicRegisterRoutes);
app.use('/api/appointments', appointmentRoutes);

// ======================================================================
// ROTAS PARA PÁGINAS HTML (Redirecionam para cap-dist)
// ======================================================================
const sendBuildFile = (res, filename) => {
    res.sendFile(path.join(__dirname, 'cap-dist', filename));
};

app.get('/', (req, res) => sendBuildFile(res, 'landing.html')); 
app.get('/funcionalidades.html', (req, res) => sendBuildFile(res, 'funcionalidades.html'));
app.get('/precos.html', (req, res) => sendBuildFile(res, 'precos.html'));
app.get('/contato_kairos.html', (req, res) => sendBuildFile(res, 'contato_kairos.html'));

app.get('/painel', (req, res) => sendBuildFile(res, 'index.html'));
app.get('/agendar', (req, res) => sendBuildFile(res, 'cliente.html'));
app.get('/admin', (req, res) => sendBuildFile(res, 'admin.html'));
app.get('/login', (req, res) => sendBuildFile(res, 'login.html'));
app.get('/admin-login', (req, res) => sendBuildFile(res, 'admin-login.html'));
app.get('/mobile-app', (req, res) => sendBuildFile(res, 'mobile-app.html'));
app.get('/import', (req, res) => sendBuildFile(res, 'import.html'));
app.get('/dbexplorer', (req, res) => sendBuildFile(res, 'dbexplorer.html'));
app.get('/datadictionary', (req, res) => sendBuildFile(res, 'datadictionary.html'));

// --- TRATAMENTO DE ERROS FINAL ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado no servidor!');
});

// --- INICIALIZAÇÃO DO SERVIDOR ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});