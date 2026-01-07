// public/firebase-messaging-sw.js
// --- VERSÃO ESTÁVEL (COMPAT v10) COM SUPORTE A HEADS-UP NOTIFICATION ---

importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

// Configuração do projeto (A que enviaste)
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

// Handler de Background (Quando o App está fechado/minimizado)
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Mensagem recebida no Background:', payload);

  const title = payload.notification?.title || payload.data?.title || 'Novo Agendamento';
  const body = payload.notification?.body || payload.data?.body || 'Você tem uma nova notificação.';
  
  const notificationOptions = {
    body: body,
    icon: '/icon.png',
    badge: '/icon.png', // Ícone pequeno monocromático (se tiveres)
    
    // Dados para o clique
    data: payload.data,     
    
    // --- O SEGREDO DO "POP-UP" (HEADS-UP) ESTÁ AQUI ---
    tag: 'kairos-update',   
    renotify: true,         // Importante: faz vibrar novamente se chegar outra msg seguida
    requireInteraction: false, // Mantive false como pediste (fecha sozinho após uns segundos)
    
    // [ADICIONADO] Vibração é OBRIGATÓRIA para o Android "acordar" e mostrar o pop-up
    vibrate: [500, 200, 500] 
  };

  return self.registration.showNotification(title, notificationOptions);
});

// Clique na Notificação
self.addEventListener('notificationclick', function(event) {
  console.log('[SW] Notificação clicada.');
  
  event.notification.close();

  // Lógica para focar na janela existente ou abrir nova
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      // 1. Tenta achar uma aba já aberta do app
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        // Verifica se a URL corresponde ao teu app e foca nela
        if ((client.url.includes('app.html') || client.url.includes('index.html') || client.url === '/') && 'focus' in client) {
          return client.focus();
        }
      }
      // 2. Se não achar, abre o app do zero
      if (clients.openWindow) {
        return clients.openWindow('/app.html'); 
      }
    })
  );
});