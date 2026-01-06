// public/firebase-messaging-sw.js

// 1. Usamos a versão 10 (Compat) que é a mais estável para Service Workers atualmente
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

// 2. Sua configuração exata
const firebaseConfig = {
    apiKey: "AIzaSyBmeKlOJ_kMshsuintO0j8CXOvM9ywBMnk",
    authDomain: "kairos-agenda-us.firebaseapp.com",
    projectId: "kairos-agenda-us",
    storageBucket: "kairos-agenda-us.firebasestorage.app",
    messagingSenderId: "407358446276",
    appId: "1:407358446276:web:c6229ea999b56701558791"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 3. Handler de Background (O Ponto Crítico)
// Este código roda quando o app está fechado ou minimizado no celular
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Mensagem recebida do servidor:', payload);

  // Garante que temos título e corpo, mesmo que o servidor mande formato diferente
  const title = payload.notification?.title || payload.data?.title || 'Novo Agendamento';
  const body = payload.notification?.body || payload.data?.body || 'Você tem uma nova notificação.';
  
  // Configuração visual da notificação nativa do Android
  const notificationOptions = {
    body: body,
    icon: '/icon.png',      // Ícone grande (deve existir em public/icon.png)
    badge: '/icon.png',     // Ícone pequeno da barra de status
    
    // Dados para o clique
    data: payload.data,     
    
    // Comportamento
    tag: 'kairos-update',   // Substitui notificações antigas para não encher a barra
    renotify: true,         // Vibra/Toca som novamente
    requireInteraction: false 
  };

  // [IMPORTANTE] Força a exibição manual da notificação
  return self.registration.showNotification(title, notificationOptions);
});

// 4. Clique na Notificação
self.addEventListener('notificationclick', function(event) {
  console.log('[SW] Notificação clicada.');
  
  event.notification.close();

  // Tenta focar na janela aberta ou abre uma nova
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      // Procura aba já aberta
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if ((client.url.includes('app.html') || client.url.includes('index.html')) && 'focus' in client) {
          return client.focus();
        }
      }
      // Se não achar, abre o app
      if (clients.openWindow) {
        return clients.openWindow('/app.html'); 
      }
    })
  );
});