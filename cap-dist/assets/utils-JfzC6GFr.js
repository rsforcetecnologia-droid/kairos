import{a as w}from"./firebase-config-C2tbVz-J.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";const f=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",g=f?"http://localhost:8080":"https://kairos-app-407358446276.us-central1.run.app";console.log(`🚀 API configurada para modo: ${f?"LOCAL (Dev)":"PRODUÇÃO (Cloud)"}`);console.log("📡 URL Base:",g);async function p(){const e=w.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function k(e,o={}){const r=await p();if(!r)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const i=g.replace(/\/$/,""),n=e.startsWith("/")?e:`/${e}`,s=`${i}${n}`;console.log(`AuthenticatedFetch: ${o.method||"GET"} ${s}`);try{const t=await fetch(s,{...o,headers:{...r,...o.headers}});if(!t.ok){const a=(await t.json().catch(()=>({message:t.statusText}))).message||`Erro na API: ${t.status}`;if(a.includes("FAILED_PRECONDITION")&&a.includes("requires an index")){const d=/(https:\/\/[^\s]+)/,l=a.match(d),m=l?l[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${m}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${t.status}) em ${s}:`,a),new Error(a)}return t.json()}catch(t){throw console.error(`Falha de rede ao tentar acessar ${s}:`,t.message),t.message.includes("Failed to fetch")||t.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${g}. Verifique se o servidor backend está rodando.`):t}}let c;async function x(){if(!c)try{c=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function v(){if(!c){console.warn("AudioContext não inicializado. O som não será tocado.");return}c.state==="suspended"&&c.resume();const e=c.createOscillator(),o=c.createGain();e.connect(o),o.connect(c.destination),e.type="sine",e.frequency.setValueAtTime(800,c.currentTime),o.gain.setValueAtTime(0,c.currentTime),o.gain.linearRampToValueAtTime(.3,c.currentTime+.01),o.gain.exponentialRampToValueAtTime(1e-4,c.currentTime+.2),e.start(c.currentTime),e.stop(c.currentTime+.2)}function C(e,o,r="info",i=!1){const n=document.getElementById("toast-container");if(!n)return;i&&v();const s=document.createElement("div"),t={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},u={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},a={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};s.className=`toast ${t[r]||t.info}`,s.innerHTML=`
        <div class="toast-icon">${u[r]||u.info}</div>
        <div class="toast-content">
            <p class="font-bold">${e}</p>
            <p class="text-sm">${o}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${a[r]||a.info}"></div>
        </div>
    `,n.appendChild(s),s.querySelector(".toast-close").addEventListener("click",()=>s.remove()),setTimeout(()=>{s.remove()},4e3)}function B(e,o){const r=document.getElementById("genericModal");return new Promise(i=>{r.innerHTML=`
            <div class="modal-content max-w-sm p-0 rounded-xl overflow-hidden shadow-2xl">
                <div class="p-6 text-center">
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                        <svg class="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 class="text-xl leading-6 font-bold text-gray-900 mt-4">${e}</h3>
                    <div class="mt-2 text-sm text-gray-600">
                        <p>${o}</p>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 flex justify-center gap-3 border-t">
                    <button id="genericModalCancelBtn" class="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition text-sm">Cancelar</button>
                    <button id="genericModalConfirmBtn" class="flex-1 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition text-sm">Confirmar</button>
                </div>
            </div>`,r.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{r.style.display="none",i(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{r.style.display="none",i(!1)}})}function M({title:e,contentHTML:o,maxWidth:r="max-w-4xl",showCloseButton:i=!0}){let n=document.getElementById("genericModal");const s=n.cloneNode(!1);n.parentNode.replaceChild(s,n),n=s;const t=()=>{n.style.display="none"},u=l=>{n.querySelector("#genericModalContentBody").innerHTML=l};n.innerHTML=`
        <div class="modal-content ${r} p-0 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
            
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${e}</h2>
                ${i?'<button data-close-modal class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>':""}
            </header>

            <div id="genericModalContentBody" class="flex-1 overflow-y-auto p-5">
                ${o}
            </div>
            
            <footer id="genericModalFooter" class="hidden"></footer>
        </div>
    `;const a=n.querySelector("[data-close-modal]");a&&(a.onclick=t);const d=n.querySelector('[data-action="close-modal"]');return d&&(d.onclick=t),n.addEventListener("click",l=>{l.target.closest(".modal-content")||t()}),n.style.display="flex",{modalElement:n,close:t,setContent:u}}function $(){document.body.addEventListener("click",()=>{c||x()},{once:!0}),document.addEventListener("click",e=>{const o=e.target.closest('[data-action="close-modal"]');if(o){const i=o.dataset.target;if(i){const n=document.getElementById(i);n&&(n.style.display="none")}}if(e.target.closest("[data-close-modal]")){const i=document.getElementById("genericModal");i&&(i.style.display="none")}})}function T(e){return e==null?"":String(e).replace(/[&<>'"]/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[o])}function A(e,o=800,r=800,i=.7){return new Promise((n,s)=>{if(!e.type.match(/image.*/))return s(new Error("O ficheiro selecionado não é uma imagem."));const t=new FileReader;t.readAsDataURL(e),t.onload=u=>{const a=new Image;a.src=u.target.result,a.onload=()=>{let d=a.width,l=a.height;d>l?d>o&&(l*=o/d,d=o):l>r&&(d*=r/l,l=r);const m=document.createElement("canvas");m.width=d,m.height=l,m.getContext("2d").drawImage(a,0,0,d,l);const h=m.toDataURL("image/jpeg",i);n(h)},a.onerror=d=>s(new Error("Erro ao carregar a imagem para processamento."))},t.onerror=u=>s(new Error("Erro ao ler o ficheiro."))})}function I(e){const o=parseFloat(e);return isNaN(o)?"R$ 0,00":o.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}export{k as a,C as b,M as c,T as e,I as f,$ as i,A as r,B as s};
