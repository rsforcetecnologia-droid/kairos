// criarAdmin.js
const admin = require('firebase-admin');

// 1. Carrega as credenciais corretas (nome do arquivo atualizado)
const serviceAccount = require('./firebase-credentials.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();

// 2. Defina os dados do seu Super Admin
// IMPORTANTE: Altere para o seu e-mail e senha desejados
const ADMIN_EMAIL = 'sistemakairosagenda@gmail.com'; 
const ADMIN_PASSWORD = 'SNKRlcl@2025'; 

async function createSuperAdmin() {
  try {
    let userRecord;
    
    // Tenta encontrar o usuário pelo e-mail
    try {
      userRecord = await auth.getUserByEmail(ADMIN_EMAIL);
      console.log(`✅ Usuário encontrado: ${userRecord.uid}`);
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        // Se não existir, cria um novo
        console.log('⚠️ Usuário não existe. Criando novo usuário no Authentication...');
        userRecord = await auth.createUser({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          displayName: 'Super Admin',
          emailVerified: true // Importante para evitar bloqueios
        });
        console.log(`✅ Usuário criado com sucesso! UID: ${userRecord.uid}`);
      } else {
        throw e;
      }
    }

    // 3. Define a "Custom Claim" (A Tatuagem Digital)
    // O admin-login.html verifica explicitamente se role === 'super-admin'
    console.log('👑 Definindo permissão de Super Admin...');
    await auth.setCustomUserClaims(userRecord.uid, { 
        role: 'super-admin' 
    });

    console.log('---------------------------------------------------');
    console.log(`🎉 SUCESSO! O e-mail ${ADMIN_EMAIL} agora é SUPER ADMIN.`);
    console.log('---------------------------------------------------');
    console.log('👉 Agora pode fazer login em: /admin-login.html');

  } catch (error) {
    console.error('❌ ERRO:', error);
  } finally {
      process.exit(); // Encerra o script
  }
}

createSuperAdmin();