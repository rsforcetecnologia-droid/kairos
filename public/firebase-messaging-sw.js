importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// 1. Configuração do Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBmeKlOJ_kMshsuintO0j8CXOvM9ywBMnk",
  authDomain: "kairos-agenda-us.firebaseapp.com",
  projectId: "kairos-agenda-us",
  storageBucket: "kairos-agenda-us.firebasestorage.app",
  messagingSenderId: "407358446276",
  appId: "1:407358446276:web:c6229ea999b56701558791"
});

const messaging = firebase.messaging();

// 2. Handler de mensagens em Background
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Mensagem recebida em background:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/icon.png',
    badge: '/assets/icon.png',
    // Adiciona tag para não empilhar muitas notificações iguais
    tag: 'kairos-notification', 
    // Dados extras para usar no clique
    data: {
      url: '/app.html' // URL para abrir ao clicar
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 3. O QUE FAZER QUANDO O USUÁRIO CLICA NA NOTIFICAÇÃO
self.addEventListener('notificationclick', function(event) {
  console.log('[SW] Notificação clicada');
  
  event.notification.close(); // Fecha a notificação

  // Tenta focar na janela aberta ou abre uma nova
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
      // Se já houver uma aba/janela do app aberta, foca nela
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url.includes('app.html') && 'focus' in client) {
          return client.focus();
        }
      }
      // Se não houver, abre o app
      if (clients.openWindow) {
        return clients.openWindow('/app.html');
      }
    })
  );
});