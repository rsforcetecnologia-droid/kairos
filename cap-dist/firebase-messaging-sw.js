importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// 1. Configuração do Firebase (Pode copiar do seu firebase-config.js, mas sem o 'export')
firebase.initializeApp({
  apiKey: "AIzaSyBmeKlOJ_kMshsuintO0j8CXOvM9ywBMnk",
  authDomain: "kairos-agenda-us.firebaseapp.com",
  projectId: "kairos-agenda-us",
  storageBucket: "kairos-agenda-us.firebasestorage.app",
  messagingSenderId: "407358446276",
  appId: "1:407358446276:web:c6229ea999b56701558791"
});

// 2. Inicializa o Messaging em background
const messaging = firebase.messaging();

// 3. Handler para mensagens em background (quando o app está fechado/minimizado)
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensagem recebida em background:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/icon.png', // Caminho do seu ícone
    badge: '/assets/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});