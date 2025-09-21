// js/mobile/index.js

// Importa as bibliotecas React e ReactDOM que estão disponíveis globalmente
const { React } = window;
const { ReactDOM } = window;

// ✅ CORREÇÃO: O caminho de importação agora começa com a barra (/) 
// para indicar que é um caminho absoluto a partir da raiz do seu site.
import App from '/js/mobile/App.js';

// Encontra o elemento 'root' no HTML e renderiza o nosso componente App dentro dele
ReactDOM.render(<App />, document.getElementById('root'));