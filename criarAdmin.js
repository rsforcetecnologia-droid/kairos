// criarAdmin.js
const admin = require('firebase-admin');

// 1. Carrega as credenciais corretas
const serviceAccount = require('./firebase-credentials.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();
// IMPORTANTE: Adicionamos a referência ao banco de dados Firestore
const db = admin.firestore();

// 2. Defina os dados do seu Super Admin
const ADMIN_EMAIL = 'sistemakairosagenda@gmail.com'; 
const ADMIN_PASSWORD = 'SNKRlcl@2025'; 

async function createSuperAdmin() {
  try {
    let userRecord;
    
    // Tenta encontrar o usuário pelo e-mail
    try {
      userRecord = await auth.getUserByEmail(ADMIN_EMAIL);
      console.log(`✅ Usuário encontrado no Auth: ${userRecord.uid}`);
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        // Se não existir, cria um novo
        console.log('⚠️ Usuário não existe. Criando novo usuário no Authentication...');
        userRecord = await auth.createUser({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          displayName: 'Super Admin',
          emailVerified: true 
        });
        console.log(`✅ Usuário criado com sucesso! UID: ${userRecord.uid}`);
      } else {
        throw e;
      }
    }

    // 3. Define a "Custom Claim" no Auth (opcional, mas bom manter para segurança extra)
    console.log('👑 Definindo permissão no Auth...');
    await auth.setCustomUserClaims(userRecord.uid, { 
        role: 'super_admin' // Atualizado para usar underline (_) combinando com o HTML
    });

    // 4. NOVO PASSO: Salva o usuário no banco de dados Firestore para o admin-login.html conseguir ler
    console.log('💾 Salvando permissão no banco de dados Firestore...');
    await db.collection('admin_users').doc(userRecord.uid).set({
        email: ADMIN_EMAIL,
        role: 'super_admin', // O admin-login.html procura exatamente por este valor
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('---------------------------------------------------');
    console.log(`🎉 SUCESSO! O e-mail ${ADMIN_EMAIL} agora é SUPER ADMIN no Auth e no Firestore.`);
    console.log('---------------------------------------------------');
    console.log('👉 Agora pode fazer login em: /admin-login.html');

  } catch (error) {
    console.error('❌ ERRO:', error);
  } finally {
      process.exit(); // Encerra o script
  }
}

createSuperAdmin();