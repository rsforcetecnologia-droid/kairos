// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// --- 1. Configuração do Firebase (IGUAL à do seu projeto) ---
// Copie exatamente a mesma config do seu firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyBmeKlOJ_kMshsuintO0j8CXOvM9ywBMnk",
    authDomain: "kairos-agenda-us.firebaseapp.com",
    projectId: "kairos-agenda-us",
    storageBucket: "kairos-agenda-us.firebasestorage.app",
    messagingSenderId: "407358446276",
    appId: "1:407358446276:web:c6229ea999b56701558791"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// --- 2. Handler de Background (Quando a app está fechada) ---
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Notificação recebida em background:', payload);

  // Personaliza a notificação visual
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png', // Caminho para o ícone do seu app na pasta public
    badge: '/icon.png', // Ícone pequeno monocromático (opcional)
    data: payload.data // Guarda dados extras (como URL de destino)
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// --- 3. Clique na Notificação ---
self.addEventListener('notificationclick', function(event) {
  event.notification.close(); // Fecha a notificação

  // Abre a app ao clicar
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      // Se a aba já estiver aberta, foca nela
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url.includes('app.html') && 'focus' in client) {
          return client.focus();
        }
      }
      // Se não, abre uma nova
      if (clients.openWindow) {
        return clients.openWindow('/app.html');
      }
    })
  );
});