const admin = require('firebase-admin');

// Adiciona instâncias do Firebase (db, auth) a cada requisição
const addFirebaseInstances = (req, res, next) => {
    if (!admin.apps.length) {
        return res.status(503).json({ message: "Serviço indisponível. O servidor ainda está inicializando." });
    }
    req.db = admin.firestore();
    req.auth = admin.auth();
    next();
};

// 1. Verifica se o token é válido e adiciona os dados do usuário em req.user
const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido ou em formato inválido.' });
    }
    const token = authorization.split('Bearer ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Adiciona o payload do token ao objeto da requisição
        
        // NOVO: Se for um employee, busca os dados da collection 'users'
        if (req.user.role === 'employee' && req.user.establishmentId) {
             const userDoc = await admin.firestore().collection('users').doc(req.user.uid).get();
             if (userDoc.exists) {
                 const userData = userDoc.data();
                 // Adiciona o professionalId e o nome (que pode ter sido atualizado no painel) ao req.user
                 req.user.professionalId = userData.professionalId || null; // <-- ADICIONADO
                 req.user.name = userData.name || req.user.name; // <-- ADICIONADO
             }
        }

        next();
    } catch (error) {
        console.error("Erro ao verificar o token:", error);
        return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
};

// 2. Verifica se o usuário (já validado por verifyToken) é um Super Admin
const isSuperAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'super-admin') {
        return next();
    }
    return res.status(403).json({ message: 'Acesso negado. Requer permissão de Super Administrador.' });
};

// 3. Verifica se o usuário é um Dono (Owner)
const isOwner = (req, res, next) => {
    if (req.user && req.user.role === 'owner') {
        return next();
    }
    return res.status(403).json({ message: 'Acesso negado. Requer permissão de Dono do Estabelecimento.' });
};

// 4. Verifica se o usuário tem acesso geral (Dono OU Funcionário)
const hasAccess = (req, res, next) => {
    if (req.user && (req.user.role === 'owner' || req.user.role === 'employee')) {
        return next();
    }
    return res.status(403).json({ message: 'Acesso negado. Permissões insuficientes.' });
};

// 5. NOVO MIDDLEWARE: Verifica se a assinatura está ativa ou dentro do período de carência
const checkSubscription = async (req, res, next) => {
    // Apenas aplica a lógica se for um usuário de estabelecimento (Owner ou Employee)
    if (!req.user || !req.user.establishmentId) {
        return next();
    }
    
    // Usuários sem permissões (proprietários de novos estabelecimentos) também devem passar.
    if (req.user.role === 'owner' || req.user.role === 'employee') {
        
        const { establishmentId } = req.user;
        const GRACE_PERIOD_DAYS = 5; // Período de carência
        const currentDate = new Date();
        
        try {
            const db = admin.firestore();
            const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();

            if (!establishmentDoc.exists) {
                return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
            }

            const subscription = establishmentDoc.data().subscription;

            // Se não houver plano ou data de expiração, bloqueia o acesso (ou usa o módulo de teste)
            if (!subscription || !subscription.expiryDate) {
                return res.status(403).json({ message: 'Acesso negado. O estabelecimento não possui um plano de assinatura ativo.' });
            }

            const expiryTimestamp = subscription.expiryDate;
            const expiryDate = expiryTimestamp.toDate();
            
            // Calcula a data limite (expiração + carência)
            const gracePeriodEnd = new Date(expiryDate);
            gracePeriodEnd.setDate(gracePeriodEnd.getDate() + GRACE_PERIOD_DAYS);

            if (currentDate > gracePeriodEnd) {
                // Acesso bloqueado (expirado + carência)
                return res.status(403).json({ 
                    message: `Assinatura expirada. Contacte o administrador para regularizar a situação.` 
                });
            }
            
            // Aviso (opcional, mas bom para o fluxo) para o frontend
            if (currentDate > expiryDate && currentDate <= gracePeriodEnd) {
                res.setHeader('X-Subscription-Status', 'grace_period');
            } else if (currentDate <= expiryDate) {
                res.setHeader('X-Subscription-Status', 'active');
            }

            next();

        } catch (error) {
            console.error("Erro no middleware de assinatura:", error);
            return res.status(500).json({ message: 'Erro interno ao verificar a assinatura.' });
        }
    } else {
        // Para outros tipos de usuário (e.g., Super Admin), apenas segue
        next();
    }
};

module.exports = {
    addFirebaseInstances,
    verifyToken,
    isSuperAdmin,
    isOwner,
    hasAccess,
    checkSubscription
};