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
// Agora preparado para ler a estrutura enviada dentro de 'data' pelo backend
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Mensagem recebida em background:', payload);

  // Tenta extrair dados do payload.data (prioridade) ou payload.notification (fallback)
  const data = payload.data || {};
  const notification = payload.notification || {};

  const title = data.title || notification.title || 'Nova Notificação';
  const body = data.body || notification.body || '';
  const url = data.url || '/app.html';

  const notificationOptions = {
    body: body,
    icon: '/assets/icon.png',
    badge: '/assets/icon.png', // Ícone pequeno na barra de status (Android)
    
    // --- Configurações CRÍTICAS para Popup (Heads-up) no Android/PWA ---
    vibrate: [200, 100, 200, 100, 200, 100, 200], // Vibração longa e chamativa
    tag: 'kairos-notification', // Agrupa notificações (opcional, remove se quiseres empilhar todas)
    renotify: true, // IMPORTANTE: Alerta novamente (som/vibração) mesmo se a tag já existir
    requireInteraction: true, // Mantém a notificação na tela até o usuário interagir
    
    // Dados extras para usar no evento de clique
    data: {
      url: url 
    }
  };

  return self.registration.showNotification(title, notificationOptions);
});

// 3. O QUE FAZER QUANDO O USUÁRIO CLICA NA NOTIFICAÇÃO
self.addEventListener('notificationclick', function(event) {
  console.log('[SW] Notificação clicada');
  
  event.notification.close(); // Fecha a notificação visual imediatamente

  // Recupera a URL enviada no payload data (padrão para /app.html se vazio)
  const urlToOpen = event.notification.data?.url || '/app.html';

  // Tenta focar na janela aberta ou abre uma nova
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
      // 1. Se já houver uma aba/janela do app aberta, foca nela
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        // Verifica se a URL corresponde à base do app
        if (client.url.includes('app.html') && 'focus' in client) {
          return client.focus().then((focusedClient) => {
             // Opcional: Se quiseres navegar a aba focada para a URL específica:
             // return focusedClient.navigate(urlToOpen);
          });
        }
      }
      // 2. Se não houver, abre uma nova janela com a URL correta
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});