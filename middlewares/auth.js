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

module.exports = {
    addFirebaseInstances,
    verifyToken,
    isSuperAdmin,
    isOwner,
    hasAccess
};