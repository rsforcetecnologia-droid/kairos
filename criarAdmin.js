// criarAdmin.js
const admin = require('firebase-admin');

// 1. Carregue as suas credenciais (ajuste o caminho se necessário)
// Se não tiver o arquivo key.json, use o caminho do serviceAccountKey.json ou gere um novo no console
const serviceAccount = require('./key.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

// 2. Defina o e-mail do seu admin
const ADMIN_EMAIL = 'rsforcetecnologia@gmail.com'; // <--- TROQUE PELO SEU E-MAIL REAL
const ADMIN_PASSWORD = 'SNKRlcl@2025';          // <--- TROQUE PELA SUA SENHA

async function createSuperAdmin() {
  try {
    let userRecord;
    
    // Tenta encontrar o usuário pelo e-mail
    try {
      userRecord = await auth.getUserByEmail(ADMIN_EMAIL);
      console.log(`Usuário encontrado: ${userRecord.uid}`);
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        // Se não existir, cria um novo
        console.log('Criando novo usuário no Authentication...');
        userRecord = await auth.createUser({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          displayName: 'Super Admin'
        });
      } else {
        throw e;
      }
    }

    // 3. Cria o documento no Firestore com a permissão de Super Admin
    console.log('Definindo permissões no Firestore...');
    const userData = {
      email: ADMIN_EMAIL,
      name: 'Super Admin',
      role: 'owner', // Ou 'superAdmin', dependendo de como seu sistema verifica
      permissions: ['super_admin'], // Flag importante
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      active: true
    };

    // Salva na coleção 'users' (ou 'admins', verifique seu código)
    // Pelo que vi nos seus arquivos, parece ser validação por Custom Claims ou na collection 'users'
    await db.collection('users').doc(userRecord.uid).set(userData, { merge: true });

    // 4. (Opcional) Define Custom Claims se o seu sistema usar
    await auth.setCustomUserClaims(userRecord.uid, { superAdmin: true, role: 'owner' });

    console.log('✅ SUCESSO! Super Admin criado/atualizado.');
    console.log(`Login: ${ADMIN_EMAIL}`);
    console.log('Tente fazer login no painel agora.');

  } catch (error) {
    console.error('❌ ERRO:', error);
  }
}

createSuperAdmin();