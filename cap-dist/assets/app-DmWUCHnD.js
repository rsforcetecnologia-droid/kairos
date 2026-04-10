const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-Cq9B73Ah.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/firebase-config-C2tbVz-J.js","assets/styles-CZYPZ0h4.css"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as ne,d as be,m as Xa}from"./firebase-config-C2tbVz-J.js";import{EmailAuthProvider as zo,reauthenticateWithCredential as Oo,verifyBeforeUpdateEmail as Vo,updatePassword as _o,updateProfile as Uo,setPersistence as Wo,browserLocalPersistence as Jo,onAuthStateChanged as Go,signOut as Qo}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as vt,getDoc as zs,updateDoc as Ma,setDoc as Yo,addDoc as Os,collection as Qt,query as Vs,where as _s,getDocs as Xo,deleteDoc as Zo,arrayUnion as Ko,orderBy as er,onSnapshot as tr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{getToken as ar,onMessage as sr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const p={userName:null,userProfessionalId:null,userPermissions:null,userRole:null,groupId:null,groupName:null,accessibleCompanies:[],accessibleEstablishments:[],currentViewContext:{type:null,id:null,name:null},establishmentId:null,establishmentName:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function or(e,t,a){p.establishmentId=e,p.establishmentName=t,p.userPermissions=a,p.currentViewContext={type:"BRANCH",id:e,name:t}}const Us=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",ha=Us?"http://localhost:8080":"https://kairos-app-407358446276.us-central1.run.app";console.log(`🚀 API configurada para modo: ${Us?"LOCAL (Dev)":"PRODUÇÃO (Cloud)"}`);console.log("📡 URL Base:",ha);async function rr(){const e=ne.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function I(e,t={}){const a=await rr();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const r=ha.replace(/\/$/,""),s=e.startsWith("/")?e:`/${e}`,o=`${r}${s}`;console.log(`AuthenticatedFetch: ${t.method||"GET"} ${o}`);try{const i=await fetch(o,{...t,headers:{...a,...t.headers}});if(!i.ok){const d=(await i.json().catch(()=>({message:i.statusText}))).message||`Erro na API: ${i.status}`;if(d.includes("FAILED_PRECONDITION")&&d.includes("requires an index")){const l=/(https:\/\/[^\s]+)/,c=d.match(l),u=c?c[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${u}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${i.status}) em ${o}:`,d),new Error(d)}return i.json()}catch(i){throw console.error(`Falha de rede ao tentar acessar ${o}:`,i.message),i.message.includes("Failed to fetch")||i.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${ha}. Verifique se o servidor backend está rodando.`):i}}const Aa=(e,t,a,r=null)=>{let s=`/api/appointments/${e}?startDate=${t}&endDate=${a}`;return r&&(s+=`&professionalId=${r}`),I(s)},ir=({establishmentId:e,professionalId:t,serviceIds:a,date:r})=>{const s=`/api/availability?establishmentId=${e}&professionalId=${t}&serviceIds=${a.join(",")}&date=${r}`;return I(s)},nr=e=>I("/api/appointments",{method:"POST",body:JSON.stringify(e)}),lr=(e,t)=>I(`/api/appointments/${e}`,{method:"PUT",body:JSON.stringify(t)}),dr=e=>I(`/api/appointments/${e}`,{method:"DELETE"}),cr=e=>I(`/api/appointments/${e}/reopen`,{method:"POST"}),ur=(e,t)=>I(`/api/appointments/${e}/checkout`,{method:"POST",body:JSON.stringify(t)});let Y;async function pr(){if(!Y)try{Y=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function mr(){if(!Y){console.warn("AudioContext não inicializado. O som não será tocado.");return}Y.state==="suspended"&&Y.resume();const e=Y.createOscillator(),t=Y.createGain();e.connect(t),t.connect(Y.destination),e.type="sine",e.frequency.setValueAtTime(800,Y.currentTime),t.gain.setValueAtTime(0,Y.currentTime),t.gain.linearRampToValueAtTime(.3,Y.currentTime+.01),t.gain.exponentialRampToValueAtTime(1e-4,Y.currentTime+.2),e.start(Y.currentTime),e.stop(Y.currentTime+.2)}function g(e,t,a="info",r=!1){const s=document.getElementById("toast-container");if(!s)return;r&&mr();const o=document.createElement("div"),i={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},n={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},d={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};o.className=`toast ${i[a]||i.info}`,o.innerHTML=`
        <div class="toast-icon">${n[a]||n.info}</div>
        <div class="toast-content">
            <p class="font-bold">${e}</p>
            <p class="text-sm">${t}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${d[a]||d.info}"></div>
        </div>
    `,s.appendChild(o),o.querySelector(".toast-close").addEventListener("click",()=>o.remove()),setTimeout(()=>{o.remove()},4e3)}function W(e,t){const a=document.getElementById("genericModal");return new Promise(r=>{a.innerHTML=`
            <div class="modal-content max-w-sm p-0 rounded-xl overflow-hidden shadow-2xl">
                <div class="p-6 text-center">
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                        <svg class="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 class="text-xl leading-6 font-bold text-gray-900 mt-4">${e}</h3>
                    <div class="mt-2 text-sm text-gray-600">
                        <p>${t}</p>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 flex justify-center gap-3 border-t">
                    <button id="genericModalCancelBtn" class="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition text-sm">Cancelar</button>
                    <button id="genericModalConfirmBtn" class="flex-1 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition text-sm">Confirmar</button>
                </div>
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",r(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",r(!1)}})}function re({title:e,contentHTML:t,maxWidth:a="max-w-4xl",showCloseButton:r=!0}){let s=document.getElementById("genericModal");const o=s.cloneNode(!1);s.parentNode.replaceChild(o,s),s=o;const i=()=>{s.style.display="none"},n=c=>{s.querySelector("#genericModalContentBody").innerHTML=c};s.innerHTML=`
        <div class="modal-content ${a} p-0 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
            
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${e}</h2>
                ${r?'<button data-close-modal class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>':""}
            </header>

            <div id="genericModalContentBody" class="flex-1 overflow-y-auto p-5">
                ${t}
            </div>
            
            <footer id="genericModalFooter" class="hidden"></footer>
        </div>
    `;const d=s.querySelector("[data-close-modal]");d&&(d.onclick=i);const l=s.querySelector('[data-action="close-modal"]');return l&&(l.onclick=i),s.addEventListener("click",c=>{c.target.closest(".modal-content")||i()}),s.style.display="flex",{modalElement:s,close:i,setContent:n}}function gr(){document.body.addEventListener("click",()=>{Y||pr()},{once:!0}),document.addEventListener("click",e=>{const t=e.target.closest('[data-action="close-modal"]');if(t){const r=t.dataset.target;if(r){const s=document.getElementById(r);s&&(s.style.display="none")}}if(e.target.closest("[data-close-modal]")){const r=document.getElementById("genericModal");r&&(r.style.display="none")}})}const Q=document.getElementById("sidebar"),Me=document.getElementById("sidebarToggle"),ot=document.getElementById("mainContent"),br=document.querySelectorAll(".sidebar-link"),va=document.getElementById("menu-search"),Za=document.getElementById("hamburger-menu-btn"),Je=document.getElementById("mobile-overlay");let fe=!0;function $e(e){if(!Q||!ot)return;Q.classList.toggle("collapsed",e),ot.classList.toggle("sidebar-collapsed-shift",e);const t=Q.querySelector(".sidebar-search-container"),a=Q.querySelectorAll(".sidebar-category");e?(t&&(t.style.display="none"),a.forEach(r=>r.style.display="none"),document.querySelectorAll(".submenu-toggle").forEach(r=>{const s=r.getAttribute("data-target-submenu"),o=document.getElementById(s),i=r.querySelector(".submenu-arrow");o&&(o.classList.add("hidden"),o.classList.remove("flex")),i&&i.classList.remove("rotate-180")})):(t&&(t.style.display="block"),a.forEach(r=>r.style.display="block"))}function fr(){!Q||!Je||(Q.classList.add("mobile-open"),Je.classList.add("visible"))}function $t(){!Q||!Je||(Q.classList.remove("mobile-open"),Je.classList.remove("visible"))}function xr(){$e(!Q.classList.contains("collapsed"))}function hr(e,t){const a=document.getElementById(e);if(!a)return;const r=a.classList.contains("hidden");r&&window.innerWidth>=1024&&Q.classList.contains("collapsed")&&$e(!1),r?(a.classList.remove("hidden"),a.classList.add("flex"),t&&t.classList.add("rotate-180")):(a.classList.add("hidden"),a.classList.remove("flex"),t&&t.classList.remove("rotate-180"))}function vr(){va&&va.addEventListener("input",e=>{const t=e.target.value.toLowerCase().trim(),a=document.getElementById("sidebar-nav");if(!a)return;const r=a.querySelectorAll("li"),s=a.querySelectorAll(".sidebar-category");if(t===""){r.forEach(o=>o.style.display=""),s.forEach(o=>o.style.display="block");return}s.forEach(o=>o.style.display="none"),r.forEach(o=>{if(o.classList.contains("sidebar-category"))return;const i=o.querySelector(".sidebar-link")||o.querySelector(".submenu-toggle");if(!i)return;if(i.textContent.toLowerCase().includes(t)){o.style.display="";const l=o.closest('ul[id$="-submenu"]');if(l){l.classList.remove("hidden"),l.classList.add("flex"),l.parentElement.style.display="";const c=l.parentElement.querySelector(".submenu-toggle");if(c){const u=c.querySelector(".submenu-arrow");u&&u.classList.add("rotate-180")}}}else{const l=i.getAttribute("data-target-submenu");if(l){const c=document.getElementById(l);c&&(Array.from(c.querySelectorAll(".sidebar-link")).some(x=>x.textContent.toLowerCase().includes(t))?o.style.display="":o.style.display="none")}else o.style.display="none"}})})}function yr(e,t,a){if(!Q||!ot)return;ot.classList.add("main-content-shift"),window.innerWidth>=1024?(fe=!0,$e(!1)):window.innerWidth>=768?(fe=!1,$e(!0)):(ot.classList.remove("main-content-shift","sidebar-collapsed-shift"),$t()),Me&&Me.addEventListener("click",s=>{s.stopPropagation(),window.innerWidth>=768?(fe=!fe,$e(!fe),fe?(Me.classList.add("text-indigo-400"),Me.classList.remove("text-gray-400")):(Me.classList.remove("text-indigo-400"),Me.classList.add("text-gray-400"))):xr()}),Q.addEventListener("mouseenter",()=>{window.innerWidth>=768&&!fe&&Q.classList.contains("collapsed")&&$e(!1)}),Q.addEventListener("mouseleave",()=>{if(window.innerWidth>=768&&!fe){const s=!!document.querySelector("#sidebarToggle:hover"),o=document.activeElement===va;!s&&!o&&$e(!0)}}),Za&&Za.addEventListener("click",s=>{s.stopPropagation(),fr()}),Je&&Je.addEventListener("click",s=>{s.stopPropagation(),$t()});let r=0;Q.addEventListener("touchstart",s=>{r=s.changedTouches[0].screenX},{passive:!0}),Q.addEventListener("touchend",s=>{const o=s.changedTouches[0].screenX;r-o>50&&$t()},{passive:!0}),document.querySelectorAll(".submenu-toggle").forEach(s=>{s.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();const i=s.getAttribute("data-target-submenu"),n=s.querySelector(".submenu-arrow");hr(i,n)})}),vr(),br.forEach(s=>{const o=s.getAttribute("data-target");if(!o)return;const i=o.replace("-section",""),n=a?.[i]!==!1,d=t===null||t[o]?.view===!0;if(!n||!d){s.parentElement&&s.parentElement.tagName==="LI"?s.parentElement.style.display="none":s.style.display="none";return}s.addEventListener("click",l=>{l.preventDefault(),document.querySelectorAll(".sidebar-link").forEach(c=>c.classList.remove("active")),s.classList.add("active"),o&&typeof e=="function"&&e(o),window.innerWidth<768&&$t()})})}const wr=e=>I("/api/establishments/",{method:"POST",body:JSON.stringify(e)}),Te=()=>I("/api/establishments/hierarchy",{method:"GET"}),Ce=e=>{const t=e||p.establishmentId;return t?I(`/api/establishments/${t}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},qa=(e,t)=>{const a=e||p.establishmentId;return a?I(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(t)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},kr=(e,t)=>{const a=e||p.establishmentId;return a?I(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Sr=(e,t)=>{const a=e||p.establishmentId;return a?I(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))};class $r{constructor(t,a,r){this.steps=t,this.currentStep=0,this.onComplete=a,this.onSkip=r,this.isActive=!1,this.overlay=null,this.spotlight=null,this.popover=null,this.handleResize=this.handleResize.bind(this)}start(){this.isActive||(this.isActive=!0,this.createElements(),window.addEventListener("resize",this.handleResize),this.renderStep())}stop(t=!1){this.isActive=!1,window.removeEventListener("resize",this.handleResize),this.overlay&&this.overlay.remove(),this.spotlight&&this.spotlight.remove(),this.popover&&this.popover.remove(),t&&this.onComplete?this.onComplete():!t&&this.onSkip&&this.onSkip()}createElements(){this.overlay=document.createElement("div"),this.overlay.className="fixed inset-0 bg-black/60 z-[99990] transition-opacity duration-300",document.body.appendChild(this.overlay),this.spotlight=document.createElement("div"),this.spotlight.className="absolute rounded-xl z-[99991] transition-all duration-500 ease-in-out pointer-events-none bg-transparent",this.spotlight.style.boxShadow="0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255,255,255,0.5) inset",document.body.appendChild(this.spotlight),this.popover=document.createElement("div"),this.popover.className="absolute z-[99992] bg-white rounded-2xl shadow-2xl w-[320px] transition-all duration-500 ease-in-out opacity-0 transform scale-95 border border-gray-100 flex flex-col",document.body.appendChild(this.popover)}async renderStep(){if(this.currentStep>=this.steps.length){this.stop(!0);return}const t=this.steps[this.currentStep];this.popover.style.opacity="0",this.popover.style.transform="scale(0.95)",t.onBefore&&(await t.onBefore(),await this.sleep(600));const a=await this.waitForElement(t.targetSelector,3e3);if(a){a.scrollIntoView({behavior:"smooth",block:"center"}),await this.sleep(300);const s=a.getBoundingClientRect(),o=8;this.spotlight.style.top=`${s.top+window.scrollY-o}px`,this.spotlight.style.left=`${s.left+window.scrollX-o}px`,this.spotlight.style.width=`${s.width+o*2}px`,this.spotlight.style.height=`${s.height+o*2}px`,this.spotlight.style.display="block",this.overlay.style.display="none",this.positionPopover(s)}else this.spotlight.style.display="none",this.overlay.style.display="block",this.popover.style.top="50%",this.popover.style.left="50%",this.popover.style.transform="translate(-50%, -50%) scale(1)";const r=this.currentStep===this.steps.length-1;this.popover.innerHTML=`
            <div class="p-5">
                <div class="flex items-center gap-3 mb-3">
                    <span class="text-3xl">${t.icon||"✨"}</span>
                    <h3 class="text-lg font-bold text-gray-800 leading-tight">${t.title}</h3>
                </div>
                <p class="text-gray-600 text-sm leading-relaxed mb-6">${t.content}</p>
                
                <div class="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
                    <button id="tour-skip-btn" class="text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors">Pular Tour</button>
                    <div class="flex gap-2">
                        ${this.currentStep>0?'<button id="tour-prev-btn" class="px-4 py-2 text-xs font-bold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Voltar</button>':""}
                        <button id="tour-next-btn" class="px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-1">
                            ${r?'Concluir <i class="bi bi-check2"></i>':'Próximo <i class="bi bi-chevron-right"></i>'}
                        </button>
                    </div>
                </div>
                <div class="absolute -top-3 -right-3 bg-indigo-100 text-indigo-800 text-[10px] font-black px-2 py-1 rounded-full border-2 border-white shadow-sm">
                    ${this.currentStep+1} / ${this.steps.length}
                </div>
            </div>
        `,setTimeout(()=>{a&&(this.popover.style.transform="scale(1)"),this.popover.style.opacity="1"},50),document.getElementById("tour-next-btn").onclick=()=>{this.currentStep++,this.renderStep()},document.getElementById("tour-prev-btn")&&(document.getElementById("tour-prev-btn").onclick=()=>{this.currentStep--,this.renderStep()}),document.getElementById("tour-skip-btn").onclick=()=>this.stop(!1)}positionPopover(t){const a=this.popover.getBoundingClientRect(),r=20;let s=t.bottom+window.scrollY+r,o=t.left+window.scrollX;s+a.height>window.scrollY+window.innerHeight&&(s=t.top+window.scrollY-a.height-r),o+a.width>window.innerWidth&&(o=t.right+window.scrollX-a.width),o<r&&(o=r),this.popover.style.top=`${s}px`,this.popover.style.left=`${o}px`}handleResize(){this.isActive&&this.renderStep()}sleep(t){return new Promise(a=>setTimeout(a,t))}async waitForElement(t,a){if(!t)return null;const r=Date.now();for(;Date.now()-r<a;){const s=document.querySelector(t);if(s)return s;await this.sleep(100)}return null}}async function Er(){try{console.log("A verificar Onboarding interativo...");const e=await Ce(p.establishmentId);if(!e||e.parentId||e.onboardingCompleted)return;const t=[{title:"Bem-vindo ao Kairos!",icon:"👋",content:"Preparei um tour rápido para lhe mostrar onde deve configurar as 3 coisas mais importantes antes de receber agendamentos. Vamos a isso?",targetSelector:null},{title:"Perfil e Dados da Loja",icon:"🏢",content:"É aqui em 'Minha Empresa' que você define o nome do Salão, telefone, endereço e faz o upload da sua Logomarca.",targetSelector:'[data-target="estabelecimento-section"]',onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Cores e Personalização",icon:"🎨",content:"Nesta área você pode mudar a cor principal do sistema para ficar com a cara da sua marca. O link do seu cliente vai usar esta cor!",targetSelector:"#themeColor",onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Criação de Serviços",icon:"✂️",content:"Na aba 'Serviços' é onde a mágica acontece. Crie os serviços que os seus clientes vão poder agendar, informando o preço e a duração de cada um.",targetSelector:'[data-target="servicos-section"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Novo Serviço",icon:"➕",content:"Sempre que precisar adicionar um novo serviço ao menu, basta clicar neste botão verde.",targetSelector:'[data-action="new-service"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Gestão da Equipe",icon:"👥",content:"E para terminar: a 'Equipa'. Aqui você cadastra os profissionais, define quem faz qual serviço e ajusta a jornada de trabalho semanal de cada um.",targetSelector:'[data-target="profissionais-section"]',onBefore:async()=>{window.navigateTo("profissionais-section")}},{title:"Tudo Pronto!",icon:"🚀",content:"Você já conhece o caminho! Preencha as informações do seu negócio com calma. Quando terminar, volte à Agenda e partilhe o seu Link de Agendamento com os clientes!",targetSelector:null,onBefore:async()=>{window.navigateTo("agenda-section")}}],a=async()=>{try{await qa(p.establishmentId,{onboardingCompleted:!0}),showNotification("Tour Concluído","Você já pode configurar o seu sistema livremente!","success")}catch(s){console.error("Erro ao gravar fim do onboarding",s)}};new $r(t,a,a).start()}catch(e){console.error("Erro fatal ao iniciar onboarding:",e)}}var Ge;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(Ge||(Ge={}));class la extends Error{constructor(t,a,r){super(t),this.message=t,this.code=a,this.data=r}}const Ir=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},Lr=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},r=a.Plugins=a.Plugins||{},s=()=>t!==null?t.name:Ir(e),o=()=>s()!=="web",i=u=>{const m=l.get(u);return!!(m?.platforms.has(s())||n(u))},n=u=>{var m;return(m=a.PluginHeaders)===null||m===void 0?void 0:m.find(x=>x.name===u)},d=u=>e.console.error(u),l=new Map,c=(u,m={})=>{const x=l.get(u);if(x)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),x.proxy;const b=s(),v=n(u);let f;const E=async()=>(!f&&b in m?f=typeof m[b]=="function"?f=await m[b]():f=m[b]:t!==null&&!f&&"web"in m&&(f=typeof m.web=="function"?f=await m.web():f=m.web),f),S=(B,D)=>{var N,z;if(v){const O=v?.methods.find(j=>D===j.name);if(O)return O.rtype==="promise"?j=>a.nativePromise(u,D.toString(),j):(j,C)=>a.nativeCallback(u,D.toString(),j,C);if(B)return(N=B[D])===null||N===void 0?void 0:N.bind(B)}else{if(B)return(z=B[D])===null||z===void 0?void 0:z.bind(B);throw new la(`"${u}" plugin is not implemented on ${b}`,Ge.Unimplemented)}},k=B=>{let D;const N=(...z)=>{const O=E().then(j=>{const C=S(j,B);if(C){const V=C(...z);return D=V?.remove,V}else throw new la(`"${u}.${B}()" is not implemented on ${b}`,Ge.Unimplemented)});return B==="addListener"&&(O.remove=async()=>D()),O};return N.toString=()=>`${B.toString()}() { [capacitor code] }`,Object.defineProperty(N,"name",{value:B,writable:!1,configurable:!1}),N},T=k("addListener"),L=k("removeListener"),R=(B,D)=>{const N=T({eventName:B},D),z=async()=>{const j=await N;L({eventName:B,callbackId:j},D)},O=new Promise(j=>N.then(()=>j({remove:z})));return O.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await z()},O},H=new Proxy({},{get(B,D){switch(D){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return v?R:T;case"removeListener":return L;default:return k(D)}}});return r[u]=H,l.set(u,{name:u,proxy:H,platforms:new Set([...Object.keys(m),...v?[b]:[]])}),H};return a.convertFileSrc||(a.convertFileSrc=u=>u),a.getPlatform=s,a.handleError=d,a.isNativePlatform=o,a.isPluginAvailable=i,a.registerPlugin=c,a.Exception=la,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Cr=e=>e.Capacitor=Lr(e),pe=Cr(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Yt=pe.registerPlugin;class Ws{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let r=!1;this.listeners[t]||(this.listeners[t]=[],r=!0),this.listeners[t].push(a);const o=this.windowListeners[t];o&&!o.registered&&this.addWindowListener(o),r&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,r){const s=this.listeners[t];if(!s){if(r){let o=this.retainedEventArguments[t];o||(o=[]),o.push(a),this.retainedEventArguments[t]=o}return}s.forEach(o=>o(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:r=>{this.notifyListeners(a,r)}}}unimplemented(t="not implemented"){return new pe.Exception(t,Ge.Unimplemented)}unavailable(t="not available"){return new pe.Exception(t,Ge.Unavailable)}async removeListener(t,a){const r=this.listeners[t];if(!r)return;const s=r.indexOf(a);this.listeners[t].splice(s,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(r=>{this.notifyListeners(t,r)}))}}const Ka=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),es=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Dr extends Ws{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(r=>{if(r.length<=0)return;let[s,o]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=es(s).trim(),o=es(o).trim(),a[s]=o}),a}async setCookie(t){try{const a=Ka(t.key),r=Ka(t.value),s=`; expires=${(t.expires||"").replace("expires=","")}`,o=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${r||""}${s}; path=${o}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}Yt("CapacitorCookies",{web:()=>new Dr});const Tr=async e=>new Promise((t,a)=>{const r=new FileReader;r.onload=()=>{const s=r.result;t(s.indexOf(",")>=0?s.split(",")[1]:s)},r.onerror=s=>a(s),r.readAsDataURL(e)}),Br=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(s=>s.toLocaleLowerCase()).reduce((s,o,i)=>(s[o]=e[t[i]],s),{})},Pr=(e,t=!0)=>e?Object.entries(e).reduce((r,s)=>{const[o,i]=s;let n,d;return Array.isArray(i)?(d="",i.forEach(l=>{n=t?encodeURIComponent(l):l,d+=`${o}=${n}&`}),d.slice(0,-1)):(n=t?encodeURIComponent(i):i,d=`${o}=${n}`),`${r}&${d}`},"").substr(1):null,Mr=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),s=Br(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(s.includes("application/x-www-form-urlencoded")){const o=new URLSearchParams;for(const[i,n]of Object.entries(e.data||{}))o.set(i,n);a.body=o.toString()}else if(s.includes("multipart/form-data")||e.data instanceof FormData){const o=new FormData;if(e.data instanceof FormData)e.data.forEach((n,d)=>{o.append(d,n)});else for(const n of Object.keys(e.data))o.append(n,e.data[n]);a.body=o;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(s.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class Ar extends Ws{async request(t){const a=Mr(t,t.webFetchExtra),r=Pr(t.params,t.shouldEncodeUrlParams),s=r?`${t.url}?${r}`:t.url,o=await fetch(s,a),i=o.headers.get("content-type")||"";let{responseType:n="text"}=o.ok?t:{};i.includes("application/json")&&(n="json");let d,l;switch(n){case"arraybuffer":case"blob":l=await o.blob(),d=await Tr(l);break;case"json":d=await o.json();break;case"document":case"text":default:d=await o.text()}const c={};return o.headers.forEach((u,m)=>{c[m]=u}),{data:d,headers:c,status:o.status,url:o.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}Yt("CapacitorHttp",{web:()=>new Ar});const ee=Yt("PushNotifications",{}),qr="modulepreload",Rr=function(e){return"/"+e},ts={},Nr=function(t,a,r){let s=Promise.resolve();if(a&&a.length>0){let d=function(l){return Promise.all(l.map(c=>Promise.resolve(c).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),n=i?.nonce||i?.getAttribute("nonce");s=d(a.map(l=>{if(l=Rr(l),l in ts)return;ts[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":qr,c||(m.as="script"),m.crossOrigin="",m.href=l,n&&m.setAttribute("nonce",n),document.head.appendChild(m),c)return new Promise((x,b)=>{m.addEventListener("load",x),m.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(i){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=i,window.dispatchEvent(n),!n.defaultPrevented)throw i}return s.then(i=>{for(const n of i||[])n.status==="rejected"&&o(n.reason);return t().catch(o)})},as=Yt("App",{web:()=>Nr(()=>import("./web-Cq9B73Ah.js"),__vite__mapDeps([0,1,2,3])).then(e=>new e.AppWeb)}),jr="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let ss=!1;async function Fr(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await ee.removeAllListeners(),await ee.addListener("registration",async a=>{Gs(a.value,!0)}),await ee.addListener("pushNotificationReceived",a=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",a)}),await ee.addListener("pushNotificationActionPerformed",a=>{const r=a.notification.data;console.log("Notificação clicada (Ação):",r)});let t=await ee.checkPermissions();t.receive==="prompt"&&(t=await ee.requestPermissions()),t.receive==="granted"&&await ee.register()}catch(t){console.error("[Push Nativo] Erro:",t)}return}"Notification"in window&&Notification.permission==="granted"&&Js()}async function Hr(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await Js(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(e){return console.error("Erro ao pedir permissão Web:",e),!1}}async function Js(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await e.update();const t=await ar(Xa,{vapidKey:jr,serviceWorkerRegistration:e});t?(console.log("[Push Web] Token validado."),await Gs(t,!1)):console.warn("[Push Web] Token veio vazio."),ss||(sr(Xa,a=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",a)}),ss=!0)}catch(e){console.error("[Push Web] Falha no registo:",e)}else console.warn("Navegador sem suporte a Service Worker.")}async function Gs(e,t){const a=ne.currentUser;if(!a){console.warn("Usuário não logado. Token não salvo.");return}const r=vt(be,"users",a.uid);try{const s=await zs(r);if(s.exists()){const i=s.data().fcmTokens||[];if(i.length===1&&i[0]===e){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await Ma(r,{fcmTokens:[e],lastLoginAt:new Date().toISOString(),platform:t?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(s){if(s.code==="not-found")try{await Yo(r,{email:a.email,fcmTokens:[e],platform:t?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(o){console.error("Erro ao criar user:",o)}else console.error("Erro ao atualizar token:",s)}}const zr=(e,t,a="all",r="all")=>{const s=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&s.append("professionalId",a),r&&r!=="all"&&s.append("costCenterId",r),I(`/api/reports/indicators?${s.toString()}`)},Or=e=>e?I(`/api/financial/cost-centers/${e}`):Promise.resolve([]),Vr=({establishmentId:e,startDate:t,endDate:a,cashierSessionId:r})=>{const s=new URLSearchParams({startDate:t,endDate:a});return r&&r!=="all"&&s.append("cashierSessionId",r),e&&s.append("establishmentId",e),I(`/api/reports/sales?${s.toString()}`)},_r=()=>I("/api/reports/summary",{method:"GET"}),Ra=e=>e?String(e).replace(/\D/g,""):"",Xt=(e,t="",a=20,r={})=>{const s=new URLSearchParams;return t&&s.append("search",t),a&&s.append("limit",a),r&&r.hasLoyalty&&s.append("hasLoyalty","true"),r&&r.birthMonth&&s.append("birthMonth",r.birthMonth),r&&r.inactiveDays&&s.append("inactiveDays",r.inactiveDays),I(`/api/clients/${e}?${s.toString()}`)},Qs=(e,t)=>{const a=encodeURIComponent(t);return I(`/api/clients/details/${e}/${a}`)},Ys=e=>{const t=e.phone||e.id;if(!t)throw new Error("Telefone é obrigatório");const a=Ra(t),r={...e,phone:a,id:a};return I(`/api/clients/${a}`,{method:"PUT",body:JSON.stringify(r)})},Xs=Ys,Zs=(e,t)=>Ys({...t,id:e}),Ur=e=>{const t=encodeURIComponent(e);return I(`/api/clients/${t}`,{method:"DELETE"})},Wr=(e,t,a,r)=>I("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:e,clientPhone:Ra(t),points:a,rewardName:r})}),Jr=(e,t)=>Qs(e,Ra(t));function h(e){return e==null?"":String(e).replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t])}function Ks(e,t=800,a=800,r=.7){return new Promise((s,o)=>{if(!e.type.match(/image.*/))return o(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.readAsDataURL(e),i.onload=n=>{const d=new Image;d.src=n.target.result,d.onload=()=>{let l=d.width,c=d.height;l>c?l>t&&(c*=t/l,l=t):c>a&&(l*=a/c,c=a);const u=document.createElement("canvas");u.width=l,u.height=c,u.getContext("2d").drawImage(d,0,0,l,c);const x=u.toDataURL("image/jpeg",r);s(x)},d.onerror=l=>o(new Error("Erro ao carregar a imagem para processamento."))},i.onerror=n=>o(new Error("Erro ao ler o ficheiro."))})}let da=null;async function Gr(){const e=document.getElementById("content");e.innerHTML=`
        <div class="flex items-center justify-center h-full min-h-[60vh]">
            <div class="flex flex-col items-center">
                <div class="w-10 h-10 border-4 border-indigo-50 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                <p class="text-slate-400 font-medium text-sm">A processar dados consolidados...</p>
            </div>
        </div>
    `;try{const t=new Date,a=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=new Date(a);r.setHours(23,59,59,999);const s=new Date(a.getFullYear(),a.getMonth(),1),o=new Date(a);o.setDate(a.getDate()-6);const i=p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments:[p.establishmentId],n=i.map(async C=>{const[V,Z]=await Promise.all([Aa(C,s.toISOString(),r.toISOString(),null),Xt(C)]);return{appts:V||[],clients:Z||[]}}),d=await Promise.all(n);let l=[],c=[];d.forEach(C=>{l=l.concat(C.appts),c=c.concat(C.clients)});const u=C=>(C.services||[]).reduce((V,Z)=>V+(Number(Z.price)||0),0)||Number(C.totalPrice||0)||Number(C.servicePrice||0),m=l.filter(C=>{const V=new Date(C.startTime);return V>=a&&V<=r}),x=m.filter(C=>C.status==="completed"),b=l.filter(C=>C.status==="completed"),v=x.reduce((C,V)=>C+u(V),0),f=b.reduce((C,V)=>C+u(V),0),E=m.length,S=b.length>0?f/b.length:0,k=[],T=[],L=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];for(let C=0;C<7;C++){const V=new Date(o);V.setDate(o.getDate()+C),k.push(L[V.getDay()]);const Z=new Date(V).setHours(0,0,0,0),oe=new Date(V).setHours(23,59,59,999),we=l.filter(kt=>{const St=new Date(kt.startTime).getTime();return kt.status==="completed"&&St>=Z&&St<=oe}).reduce((kt,St)=>kt+u(St),0);T.push(we)}const R={labels:k,data:T},H=m.filter(C=>new Date(C.startTime).getTime()>=t.getTime()&&C.status!=="completed"&&C.status!=="cancelled").sort((C,V)=>new Date(C.startTime)-new Date(V.startTime)).slice(0,4).map(C=>({client:C.clientName||"Desconhecido",service:C.serviceName||(C.services&&C.services[0]?C.services[0].name:"Serviço"),time:new Date(C.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),prof:(C.professionalName||"").split(" ")[0]||"Profissional",id:C.id})),B=`${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}`,D=new Map;c.forEach(C=>{C.phone?D.set(C.phone,C):D.set(C.id||Math.random().toString(),C)});const z=Array.from(D.values()).filter(C=>{if(!C.birthDate)return!1;let V,Z;if(C.birthDate.includes("-")){const oe=C.birthDate.split("-");oe[0].length===4?(V=oe[1],Z=oe[2]):(Z=oe[0],V=oe[1])}else if(C.birthDate.includes("/")){const oe=C.birthDate.split("/");Z=oe[0],V=oe[1]}return`${Z}/${V}`===B}).map(C=>{let V="";return C.birthDate&&C.birthDate.includes("-")&&C.birthDate.split("-")[0].length===4&&(V=a.getFullYear()-parseInt(C.birthDate.split("-")[0])),{name:C.name,age:V,phone:C.phone}}),O={receitaHoje:v,agendamentosHoje:E,receitaMes:f,ticketMedio:S},j=i.length>1;Qr(e,O,R,H,z,j),Yr(R),Xr()}catch(t){console.error("Erro ao carregar dashboard:",t),e.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full min-h-[60vh] text-slate-500">
                <i class="bi bi-exclamation-circle text-4xl mb-3 text-rose-400"></i>
                <p class="font-medium text-sm">Ocorreu um erro ao carregar os dados.</p>
                <button onclick="window.navigateTo('dashboard-section')" class="mt-4 px-5 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">Tentar Novamente</button>
            </div>
        `}}function Qr(e,t,a,r,s,o){const i=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),n=o?'<span class="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 align-middle">CONSOLIDADO</span>':"";e.innerHTML=`
        <div class="p-5 md:p-8 max-w-7xl mx-auto space-y-6 pb-24 font-sans animate-fade-in">
            
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                    <h2 class="text-[1.4rem] font-semibold text-slate-700 tracking-tight">Visão Geral ${n}</h2>
                    <p class="text-[0.85rem] text-slate-500 font-normal mt-1">Acompanhe o desempenho em tempo real.</p>
                </div>
                <div class="text-right">
                    <p class="text-xs font-semibold text-indigo-600 bg-indigo-50/70 px-3 py-1.5 rounded-lg inline-block border border-indigo-100/50">
                        <i class="bi bi-calendar2-week me-1"></i> ${new Date().toLocaleDateString("pt-BR",{weekday:"short",day:"numeric",month:"long"})}
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                
                <div class="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100 flex flex-col justify-center hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-9 h-9 rounded-[10px] bg-emerald-50 text-emerald-500 flex items-center justify-center">
                            <i class="bi bi-cash-stack text-lg"></i>
                        </div>
                        <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Receita Hoje</span>
                    </div>
                    <h3 class="text-2xl md:text-[1.7rem] font-semibold text-slate-700 mt-1">${i.format(t.receitaHoje)}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100 flex flex-col justify-center hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-9 h-9 rounded-[10px] bg-indigo-50 text-indigo-500 flex items-center justify-center">
                            <i class="bi bi-calendar-check text-lg"></i>
                        </div>
                        <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Agendamentos</span>
                    </div>
                    <h3 class="text-2xl md:text-[1.7rem] font-semibold text-slate-700 mt-1">${t.agendamentosHoje}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100 flex flex-col justify-center hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-9 h-9 rounded-[10px] bg-blue-50 text-blue-500 flex items-center justify-center">
                            <i class="bi bi-graph-up-arrow text-lg"></i>
                        </div>
                        <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Receita (Mês)</span>
                    </div>
                    <h3 class="text-2xl md:text-[1.7rem] font-semibold text-slate-700 mt-1">${i.format(t.receitaMes)}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100 flex flex-col justify-center hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-9 h-9 rounded-[10px] bg-amber-50 text-amber-500 flex items-center justify-center">
                            <i class="bi bi-receipt text-lg"></i>
                        </div>
                        <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Ticket Médio</span>
                    </div>
                    <h3 class="text-2xl md:text-[1.7rem] font-semibold text-slate-700 mt-1">${i.format(t.ticketMedio)}</h3>
                </div>

            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
                
                <div class="lg:col-span-2 space-y-5 md:space-y-6">
                    
                    <div class="bg-white p-5 md:p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100">
                        <div class="flex justify-between items-center mb-5">
                            <h3 class="text-[0.95rem] font-semibold text-slate-700">Receita (Últimos 7 dias)</h3>
                            <button class="text-slate-400 hover:text-indigo-500 transition-colors"><i class="bi bi-three-dots"></i></button>
                        </div>
                        <div class="relative h-60 w-full">
                            <canvas id="revenueChart"></canvas>
                        </div>
                    </div>

                    <div class="bg-white p-5 md:p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-[0.95rem] font-semibold text-slate-700 flex items-center gap-2">
                                Próximos Agendamentos
                            </h3>
                            <button data-action="goto-agenda" class="text-[11px] font-medium text-indigo-500 hover:text-indigo-700 transition-colors">Ver Agenda Completa <i class="bi bi-arrow-right"></i></button>
                        </div>
                        
                        <div class="space-y-2.5">
                            ${r.length>0?r.map(d=>`
                                <div data-action="goto-agenda" class="flex items-center justify-between p-3.5 rounded-[14px] border border-slate-100/60 bg-slate-50/50 hover:bg-indigo-50/30 hover:border-indigo-100 transition-all cursor-pointer group">
                                    <div class="flex items-center gap-4">
                                        <div class="w-11 h-11 rounded-full bg-white border border-slate-200 flex flex-col items-center justify-center flex-shrink-0 text-indigo-600 shadow-sm">
                                            <span class="font-semibold text-sm">${d.time.split(":")[0]}</span><span class="text-[8px] font-medium leading-none text-slate-400">${d.time.split(":")[1]}</span>
                                        </div>
                                        <div>
                                            <p class="font-medium text-slate-700 text-sm group-hover:text-indigo-700 transition-colors">${h(d.client)}</p>
                                            <p class="text-[11px] text-slate-500 font-normal mt-0.5">${h(d.service)} <span class="mx-1 text-slate-300">•</span> ${h(d.prof)}</p>
                                        </div>
                                    </div>
                                    <button class="w-8 h-8 rounded-full text-slate-300 flex items-center justify-center group-hover:text-indigo-500 transition-colors">
                                        <i class="bi bi-chevron-right text-sm"></i>
                                    </button>
                                </div>
                            `).join(""):`
                                <div class="text-center py-8 text-slate-400">
                                    <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <i class="bi bi-cup-hot text-xl text-slate-300"></i>
                                    </div>
                                    <p class="text-sm font-medium text-slate-500">Agenda livre por agora.</p>
                                    <p class="text-xs font-normal mt-1">Nenhum agendamento pendente para hoje.</p>
                                </div>
                            `}
                        </div>
                    </div>

                </div>

                <div class="space-y-5 md:space-y-6">
                    
                    <div class="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100">
                        <h3 class="text-[0.95rem] font-semibold text-slate-700 mb-4">Ações Rápidas</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <button data-action="new-appointment" class="flex flex-col items-center justify-center p-4 bg-indigo-50/50 rounded-2xl text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors border border-indigo-100/50 group">
                                <i class="bi bi-plus-lg text-[1.3rem] mb-2 group-hover:scale-110 transition-transform"></i>
                                <span class="text-[11px] font-medium text-center">Agendamento</span>
                            </button>
                            
                            <button data-action="goto-pdv" class="flex flex-col items-center justify-center p-4 bg-emerald-50/50 rounded-2xl text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-emerald-100/50 group">
                                <i class="bi bi-cart2 text-[1.3rem] mb-2 group-hover:scale-110 transition-transform"></i>
                                <span class="text-[11px] font-medium text-center">Abrir PDV</span>
                            </button>
                            
                            <button data-action="goto-clients" class="flex flex-col items-center justify-center p-4 bg-blue-50/50 rounded-2xl text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors border border-blue-100/50 group">
                                <i class="bi bi-people text-[1.3rem] mb-2 group-hover:scale-110 transition-transform"></i>
                                <span class="text-[11px] font-medium text-center">Clientes</span>
                            </button>
                            
                            <button data-action="open-link" class="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors border border-slate-200/60 group">
                                <i class="bi bi-link-45deg text-[1.3rem] mb-2 group-hover:scale-110 transition-transform"></i>
                                <span class="text-[11px] font-medium text-center">O meu Link</span>
                            </button>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100">
                        <h3 class="text-[0.95rem] font-semibold text-slate-700 mb-4 flex items-center gap-2">
                            <i class="bi bi-gift text-rose-400"></i> Aniversariantes Hoje
                        </h3>
                        
                        <div class="space-y-3">
                            ${s.length>0?s.map(d=>{const c=`https://wa.me/${(d.phone||"").replace(/\D/g,"")}?text=${encodeURIComponent(`Olá ${d.name.split(" ")[0]}! A equipa deseja-lhe um Feliz Aniversário! 🎉`)}`;return`
                                <div class="flex items-center justify-between p-3 rounded-[12px] border border-rose-50 bg-rose-50/30">
                                    <div class="flex items-center gap-3">
                                        <div class="w-9 h-9 rounded-full bg-rose-100/70 text-rose-500 flex items-center justify-center font-semibold text-sm">
                                            ${h(d.name).charAt(0)}
                                        </div>
                                        <div>
                                            <p class="font-medium text-slate-700 text-[0.8rem]">${h(d.name)}</p>
                                            ${d.age?`<p class="text-[10px] font-medium text-rose-400 mt-0.5">${d.age} anos</p>`:""}
                                        </div>
                                    </div>
                                    <a href="${c}" target="_blank" class="w-8 h-8 rounded-full bg-white text-emerald-500 shadow-sm border border-emerald-50 flex items-center justify-center hover:bg-emerald-50 transition-colors" title="Enviar Parabéns pelo WhatsApp">
                                        <i class="bi bi-whatsapp text-[0.85rem]"></i>
                                    </a>
                                </div>
                            `}).join(""):`
                                <div class="text-center py-5 text-slate-400">
                                    <p class="text-xs font-normal">Sem aniversariantes hoje.</p>
                                </div>
                            `}
                        </div>
                    </div>

                </div>
            </div>
        </div>
        
        <style>
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        </style>
    `}function Yr(e){const t=document.getElementById("revenueChart");if(!t)return;da&&da.destroy();const r=t.getContext("2d").createLinearGradient(0,0,0,240);r.addColorStop(0,"rgba(79, 70, 229, 0.15)"),r.addColorStop(1,"rgba(79, 70, 229, 0.01)"),da=new Chart(t,{type:"line",data:{labels:e.labels,datasets:[{label:"Receita (R$)",data:e.data,borderColor:"#6366f1",backgroundColor:r,borderWidth:2.5,pointBackgroundColor:"#ffffff",pointBorderColor:"#6366f1",pointBorderWidth:2,pointRadius:3,pointHoverRadius:5,fill:!0,tension:.35}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{backgroundColor:"#1e293b",padding:12,cornerRadius:8,titleFont:{size:12,family:"Inter",weight:"normal"},bodyFont:{size:13,weight:"bold",family:"Inter"},displayColors:!1,callbacks:{label:function(s){return s.parsed.y!==null?new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(s.parsed.y):""}}}},scales:{y:{beginAtZero:!0,grid:{color:"#f8fafc",drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Inter",size:10},maxTicksLimit:6,callback:function(s){return"R$ "+s}}},x:{grid:{display:!1,drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Inter",size:11,weight:"500"}}}},interaction:{intersect:!1,mode:"index"}}})}function Xr(){document.getElementById("content").addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(!a)return;switch(a.dataset.action){case"goto-agenda":J("agenda-section");break;case"new-appointment":J("agenda-section");break;case"goto-pdv":J("comandas-section");break;case"goto-clients":J("clientes-section");break;case"open-link":const s=`${window.location.origin}/cliente.html?id=${p.establishmentId||""}`;window.open(s,"_blank");break}})}const Be=e=>I(`/api/services/${e}`),Zr=e=>I("/api/services",{method:"POST",body:JSON.stringify(e)}),Kr=(e,t)=>I(`/api/services/${e}`,{method:"PUT",body:JSON.stringify(t)}),ei=e=>I(`/api/services/${e}`,{method:"DELETE"}),ti=(e,t)=>I(`/api/services/${e}/status`,{method:"PATCH",body:JSON.stringify({active:t})}),ai=e=>I(`/api/services/stats/most-popular/${e}`),le=e=>I(`/api/professionals/${e}`),si=e=>I(`/api/professionals/details/${e}`),oi=e=>I("/api/professionals",{method:"POST",body:JSON.stringify(e)}),ri=(e,t)=>I(`/api/professionals/${e}`,{method:"PUT",body:JSON.stringify(t)}),eo=e=>I(`/api/professionals/${e}`,{method:"DELETE"}),ii=e=>{const t=e.map(a=>eo(a));return Promise.all(t)},Zt=(e,t,a,r="all")=>{const s=`/api/blockages/${e}?startDate=${t}&endDate=${a}&professionalId=${r}`;return I(s)},Kt=e=>I("/api/blockages",{method:"POST",body:JSON.stringify(e)}),Na=e=>I(`/api/blockages/${e}`,{method:"DELETE"}),to=e=>I("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:e})}),os=document.getElementById("content");let rs=!1;const ya=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5",light:"#c7d2fe"},{bg:"#d1fae5",border:"#059669",main:"#059669",light:"#a7f3d0"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48",light:"#fecdd3"},{bg:"#fef3c7",border:"#d97706",main:"#d97706",light:"#fde68a"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490",light:"#a5f3fc"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7",light:"#bae6fd"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed",light:"#ddd6fe"},{bg:"#fce7f3",border:"#db2777",main:"#db2777",light:"#fbcfe8"}];let ea=[],wa=[],zt={},ao=[],M={currentView:window.innerWidth<768?"list":"week",currentDate:new Date,selectedProfessionalId:"all",showInactiveProfs:!1,isSelectionMode:!1,selectedItems:new Set},q={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function ja(e){const t=new Date(e),a=t.getDay(),r=t.getDate()-a+(a===0?-6:1);return t.setDate(r),t.setHours(0,0,0,0),t}function Fa(){const e=document.getElementById("profSelectorContainer");if(!e||!p.professionals)return;let t=p.professionals.filter(s=>M.showInactiveProfs||s.status!=="inactive");const r=[...[{id:"all",name:"Todos",photo:null}],...t];e.innerHTML=r.map(s=>{const o=M.selectedProfessionalId===s.id,i=s.name==="Todos"?"T":s.name.charAt(0).toUpperCase(),n=s.id!=="all"?p.professionalColors.get(s.id)||ya[0]:{main:"#adb5bd",light:"#f1f3f5"};return`
            <div class="prof-pill ${o?"active":""}"
                 data-action="select-professional" data-prof-id="${s.id}"
                 style="--pc: ${n.main}; --pb: ${o?n.bg:""}; --pl: ${n.light};">
                <div class="prof-pill-dot" ${s.photo?`style="background-image: url('${_(s.photo)}'); background-size: cover; background-position: center;"`:""}>
                    ${s.photo?"":i}
                </div>
                <span>${_(s.name==="Todos"?"Todos":s.name.split(" ")[0])}</span>
            </div>`}).join("")}function _(e){return h(e||"")}function ni(e,t,a,r,s){const o=(e||"").replace(/\D/g,""),i=new Date(s).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),n=new Date(s).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=`Olá, ${t}! Você tem um agendamento de ${a} com ${r} para ${i} às ${n}. Podemos confirmar?`;return`https://wa.me/${o}?text=${encodeURIComponent(d)}`}function li(e){const t=document.getElementById("agenda-view");if(!t)return;const a=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],r=ja(M.currentDate),s=new Date;s.setHours(0,0,0,0);let o='<div class="week-container" id="weekScroller">';for(let i=0;i<7;i++){const n=new Date(r);n.setDate(r.getDate()+i);const d=n.toDateString()===s.toDateString(),l=e.filter(u=>new Date(u.startTime).toDateString()===n.toDateString()).sort((u,m)=>new Date(u.startTime)-new Date(m.startTime));let c="";l.length===0?c='<div class="week-empty"><i class="bi bi-dash-lg" style="font-size:1rem;display:block;margin-bottom:4px;"></i>Sem agendamentos</div>':c=l.map(u=>{const x=new Date(u.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),b=p.professionalColors.get(u.professionalId)||{main:"#adb5bd"},v=u.status==="completed",f=M.selectedItems.has(u.id);if(u.type==="blockage")return`<div class="week-event-chip week-blockage">
                        <div class="we-time"><i class="bi bi-lock me-1"></i>${x}</div>
                        <div class="we-client">${_(u.reason)}</div>
                        <div class="we-service">${_(u.professionalName)}</div>
                    </div>`;const E=JSON.stringify(u).replace(/'/g,"&apos;"),S=f?"box-shadow: 0 0 0 2px #4f46e5; background-color: #eff6ff;":"",k=M.isSelectionMode?`<div style="position:absolute; top:6px; right:6px; z-index:1;">
                           <input type="checkbox" style="width:16px; height:16px; accent-color:#4f46e5; pointer-events:none;" ${f?"checked":""}>
                       </div>`:"";return`<div class="week-event-chip ${v?"completed":""}" style="--ec: ${b.main}; ${S}"
                    data-action="edit-appointment" data-appointment='${E}'>
                    ${k}
                    <div class="we-time">${x}</div>
                    <div class="we-client" style="${M.isSelectionMode?"padding-right:20px;":""}">${_(u.clientName)}</div>
                    <div class="we-service">${_(u.serviceName)} · ${_((u.professionalName||"").split(" ")[0])}</div>
                    ${M.isSelectionMode?"":`
                    <div class="we-actions">
                        <button class="we-btn" data-action="open-comanda" data-appointment='${E}' title="Comanda">
                            <i class="bi bi-receipt"></i>
                        </button>
                    </div>`}
                </div>`}).join(""),o+=`<div class="week-day-col">
            <div class="week-day-header ${d?"is-today":""}">
                <div class="wd-name">${d?"Hoje":a[i]}</div>
                <div class="wd-num">${n.getDate()}</div>
            </div>
            <div class="week-day-events">${c}</div>
        </div>`}o+="</div>",t.innerHTML=o,requestAnimationFrame(()=>{const i=document.getElementById("weekScroller");if(i&&window.innerWidth<768){const n=i.querySelector(".is-today");n&&n.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}})}function di(e){const t=document.getElementById("agenda-view");if(!t)return;if(e.sort((s,o)=>new Date(s.startTime)-new Date(o.startTime)),e.length===0){t.innerHTML=`
            <div class="list-container" style="min-height:50vh;display:flex;align-items:center;justify-content:center;">
                <div class="text-center" style="max-width:220px;">
                    <div style="width:52px;height:52px;background:#f1f3f5;border-radius:14px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px;">
                        <i class="bi bi-calendar-check" style="font-size:1.3rem;color:#adb5bd;"></i>
                    </div>
                    <p style="font-size:0.85rem;font-weight:600;color:#495057;margin-bottom:4px;">Nenhum agendamento</p>
                    <p style="font-size:0.7rem;color:#868e96;">Toque em + para criar um novo.</p>
                </div>
            </div>`;return}const a={};e.forEach(s=>{const o=new Date(s.startTime).toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});a[o]||(a[o]=[]),a[o].push(s)});let r='<div class="list-container">';Object.entries(a).forEach(([s,o])=>{r+=`<div class="list-date-group">
            <div class="list-date-label">${s}</div>`,o.forEach(i=>{const n=new Date(i.startTime),d=new Date(i.endTime),l=Math.round((d-n)/6e4),c=n.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),u=p.professionalColors.get(i.professionalId)||{main:"#adb5bd"},m=i.status==="completed",x=JSON.stringify(i).replace(/'/g,"&apos;"),b=M.selectedItems.has(i.id),v=M.isSelectionMode?`<div style="display:flex; align-items:center; margin-right: 12px; margin-left: 4px;">
                       <input type="checkbox" style="width:20px; height:20px; accent-color:#4f46e5; pointer-events:none;" ${b?"checked":""}>
                   </div>`:"",f=b?"box-shadow: 0 0 0 2px #4f46e5; background-color: #eff6ff;":"";if(i.type==="blockage"){r+=`<div class="list-card blockage">
                    ${v}
                    <div class="list-card-time"><div class="t-start" style="color:#c92a2a;">${c}</div><div class="t-dur">Bloqueio</div></div>
                    <div class="list-card-dot" style="--dc:#e03131;"></div>
                    <div class="list-card-info">
                        <div class="lc-name" style="color:#c92a2a;">${_(i.reason)}</div>
                        <div class="lc-detail">${_(i.professionalName)}</div>
                    </div>
                </div>`;return}const E=ni(i.clientPhone,i.clientName,i.serviceName,i.professionalName,i.startTime),S=(i.services||[]).reduce((R,H)=>R+(Number(H.price)||0),0)||Number(i.totalPrice||0)||Number(i.servicePrice||0),k=i.paymentStatus||(i.status==="completed"?"Finalizado":"Agendado"),T=_((i.professionalName||"").split(" ")[0]),L=(i.services||[]).length||(i.serviceName?1:0);r+=`<div class="list-card ${m?"completed":""}" style="${f}"
                data-action="edit-appointment" data-appointment='${x}'>
                ${v}
                <div class="list-card-time">
                    <div class="t-start ${m?"opacity-50 line-through":""}">${c}</div>
                    <div class="t-dur">${l} min</div>
                </div>
                <div class="list-card-dot" style="--dc: ${u.main};"></div>
                <div class="list-card-info">
                    <div class="lc-name">${_(i.clientName)}</div>
                    <div class="lc-detail">${_(i.serviceName)} · ${T}</div>
                    <div class="lc-extra" style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
                        <span style="font-size: 0.65rem; color: #4b5563; background: #f3f4f6; padding: 2px 8px; border-radius: 6px; font-weight: 500;">R$ ${S.toFixed(2).replace(".",",")}</span>
                        ${i.clientPhone?`<span style="font-size: 0.65rem; color: #4b5563; background: #f3f4f6; padding: 2px 8px; border-radius: 6px; font-weight: 500;"><i class="bi bi-telephone"></i> ${_(i.clientPhone)}</span>`:""}
                        <span style="font-size: 0.65rem; color: #4b5563; background: #f3f4f6; padding: 2px 8px; border-radius: 6px; font-weight: 500;">${L} serv.</span>
                        <span style="font-size: 0.65rem; color: ${m?"#059669":"#d97706"}; background: ${m?"#d1fae5":"#fef3c7"}; padding: 2px 8px; border-radius: 6px; font-weight: 600;">${_(k)}</span>
                    </div>
                </div>
                <div class="list-card-status">
                    <div class="lc-status-dot ${m?"done":""}"></div>
                </div>
                ${!m&&!M.isSelectionMode?`
                <div class="list-card-actions">
                    <button class="lc-action-btn wa" data-link="${E}" title="WhatsApp">
                        <i class="bi bi-whatsapp" style="font-size:0.85rem;"></i>
                    </button>
                    <button class="lc-action-btn comanda" data-action="open-comanda" data-appointment='${x}' title="Comanda">
                        <i class="bi bi-receipt"></i>
                    </button>
                </div>`:""}
            </div>`}),r+="</div>"}),r+="</div>",t.innerHTML=r}function so(){const e=p.allEvents.filter(t=>M.selectedProfessionalId==="all"||t.professionalId===M.selectedProfessionalId);M.currentView==="list"?di(e):li(e),Ha()}function Ha(){const e=document.getElementById("batch-delete-container"),t=document.getElementById("agendaFab");e&&(M.isSelectionMode&&M.selectedItems.size>0?(e.innerHTML=`<div class="bg-gray-900 text-white p-3 rounded-xl shadow-xl flex items-center justify-between gap-4 w-full mx-4" style="background:#212529;color:#fff;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:12px;">
            <span class="font-semibold text-sm"><span style="color:#7c3aed; font-size:1.1rem; margin-right:4px;">${M.selectedItems.size}</span> selecionados</span>
            <button data-action="batch-delete" style="background:#e03131;color:#fff;border:none;padding:8px 20px;border-radius:8px;font-size:0.85rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;">
                <i class="bi bi-trash"></i> Excluir
            </button>
        </div>`,e.style.display="block",t&&(t.style.transform="scale(0)")):(e.style.display="none",t&&(t.style.transform="scale(1)")))}function ci(){const e=document.getElementById("currentDateDisplay");if(!e)return;const t=new Date;t.setHours(0,0,0,0);const a=new Date(M.currentDate);if(a.setHours(0,0,0,0),M.currentView==="list")a.toDateString()===t.toDateString()?e.textContent="Hoje":e.textContent=a.toLocaleDateString("pt-BR",{day:"numeric",month:"long"});else{const r=ja(a),s=new Date(r);s.setDate(r.getDate()+6);const o=r.toLocaleDateString("pt-BR",{day:"numeric",month:"short"}),i=s.toLocaleDateString("pt-BR",{day:"numeric",month:"short"});e.textContent=`${o} - ${i}`}}async function ve(){const e=document.getElementById("agenda-view");if(!e)return;M.selectedItems.clear(),Ha(),e.innerHTML='<div style="display:flex;align-items:center;justify-content:center;padding:60px 0;"><div style="width:28px;height:28px;border:2.5px solid #e9ecef;border-top:2.5px solid #4f46e5;border-radius:50%;animation:spin 0.7s linear infinite;"></div></div><style>@keyframes spin{to{transform:rotate(360deg)}}</style>',ci();let t,a;if(M.currentView==="list")t=new Date(M.currentDate),t.setHours(0,0,0,0),a=new Date(t),a.setHours(23,59,59,999);else{const r=ja(M.currentDate);t=new Date(r),a=new Date(r),a.setDate(r.getDate()+6),a.setHours(23,59,59,999)}try{const s=(p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments:[p.establishmentId]).map(async l=>{const[c,u]=await Promise.all([Aa(l,t.toISOString(),a.toISOString(),M.selectedProfessionalId==="all"?null:M.selectedProfessionalId),Zt(l,t.toISOString(),a.toISOString(),M.selectedProfessionalId)]);return{appts:c||[],blockages:u||[]}}),o=await Promise.all(s);let i=[],n=[];if(o.forEach(l=>{i=i.concat(l.appts),n=n.concat(l.blockages)}),!document.getElementById("agenda-view"))return;const d=l=>l.map(c=>({...c,type:c.type||"appointment",professionalName:c.professionalName||(()=>{const u=p.professionals?.find(m=>m.id===c.professionalId);return u?u.name:"Indefinido"})()}));p.allEvents=[...d(i),...d(n)],Fa(),so()}catch(r){console.error(r),document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML=`
                <div class="text-center py-12" style="color:#868e96;">
                    <i class="bi bi-exclamation-triangle" style="font-size:1.5rem;"></i>
                    <p class="mt-2" style="font-size:0.8rem;">Erro ao carregar agenda.</p>
                </div>`)}}async function ui(){try{const t=(p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments:[p.establishmentId]).map(async i=>{const[n,d,l]=await Promise.all([le(i),Be(i),Ce(i)]);return{profs:n||[],services:d||[],estDetails:l}}),a=await Promise.all(t),r=new Map,s=new Map;let o=a[0]?.estDetails;a.forEach(i=>{i.profs.forEach(n=>r.set(n.id,n)),i.services.forEach(n=>s.set(n.id,n))}),p.professionals=Array.from(r.values()),p.services=Array.from(s.values()),ao=[],o&&(zt=o.loyaltyProgram||{enabled:!1}),p.professionals.forEach((i,n)=>{p.professionalColors.set(i.id,ya[n%ya.length])}),Fa()}catch{g("Atenção","Não foi possível carregar os dados da equipa.","error")}}async function oo(e={}){M.currentDate=e.targetDate?new Date(e.targetDate):M.currentDate||new Date,M.isSelectionMode=!1,M.selectedItems.clear(),os.innerHTML=`
        <div class="flex flex-col h-[calc(100vh-80px)] md:h-auto bg-gray-50 relative font-sans w-full" style="background:#f8f9fa;">

            <div style="background: #fff; padding: 14px 16px; border-bottom: 1px solid #f1f3f5; position: sticky; top: 0; z-index: 10; display:flex; flex-direction:column; gap:16px;">
                
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <button id="btnWeekDays" style="background:transparent; border:none; color:#495057; font-size:1.2rem; padding:4px; cursor:pointer;" title="Opções">
                        <i class="bi bi-sliders"></i>
                    </button>

                    <div class="agenda-view-toggle" style="background: #f1f3f5; padding: 4px; border-radius: 12px; display:flex; gap:4px; margin:0;">
                        <button class="${M.currentView==="list"?"active shadow-sm":""}" data-action="setView" data-view="list" style="border-radius: 8px; padding: 6px 16px; font-weight:600;">Lista</button>
                        <button class="${M.currentView==="week"?"active shadow-sm":""}" data-action="setView" data-view="week" style="border-radius: 8px; padding: 6px 16px; font-weight:600;">Semana</button>
                    </div>

                    <button id="agendaFab" data-action="new-appointment" style="width: 38px; height: 38px; border-radius: 50%; background: #4f46e5; color: white; border: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(79,70,229,0.3); transition: transform 0.2s; cursor:pointer;" title="Novo Agendamento">
                        <i class="bi bi-plus-lg text-lg"></i>
                    </button>
                </div>

                <div style="display: flex; justify-content: center; align-items: center; gap: 24px;">
                    <button id="btnPrevDate" class="agenda-nav-btn" style="width: 36px; height: 36px; border-radius: 50%; background: #f8f9fa; border:1px solid #e9ecef; color:#495057;">
                        <i class="bi bi-chevron-left"></i>
                    </button>
                    
                    <div id="btnTodayHeader" style="display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; min-width: 140px; text-align: center; padding: 4px; border-radius:8px; transition: background 0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='transparent'">
                        <div id="currentDateDisplay" style="font-size: 1.1rem; font-weight: 700; color: #212529; line-height: 1.2;">Carregando...</div>
                        <div style="font-size: 0.65rem; font-weight: 700; color: #4f46e5; text-transform: uppercase; margin-top: 2px; letter-spacing: 0.5px;">Ir para Hoje</div>
                    </div>

                    <button id="btnNextDate" class="agenda-nav-btn" style="width: 36px; height: 36px; border-radius: 50%; background: #f8f9fa; border:1px solid #e9ecef; color:#495057;">
                        <i class="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>

            <div id="profSelectorContainer" class="agenda-prof-bar" style="border-bottom: 1px solid #f1f3f5; padding-top:8px; justify-content: center;">
                <div style="width:24px;height:24px;border:2px solid #e9ecef;border-top:2px solid #4f46e5;border-radius:50%;animation:spin 0.7s linear infinite;margin:8px auto;"></div>
            </div>

            <div id="agenda-view" style="flex:1;overflow-y:auto; padding-bottom:100px;"></div>

            <div id="batch-delete-container" style="position:fixed;bottom:80px;left:0;right:0;z-index:50;display:none;"></div>
        </div>`,document.getElementById("btnPrevDate").addEventListener("click",()=>{M.currentView==="list"?M.currentDate.setDate(M.currentDate.getDate()-1):M.currentDate.setDate(M.currentDate.getDate()-7),ve()}),document.getElementById("btnNextDate").addEventListener("click",()=>{M.currentView==="list"?M.currentDate.setDate(M.currentDate.getDate()+1):M.currentDate.setDate(M.currentDate.getDate()+7),ve()}),document.getElementById("btnTodayHeader").addEventListener("click",()=>{M.currentDate=new Date,ve()});const t=document.querySelectorAll(".agenda-view-toggle button");t.forEach(a=>{a.addEventListener("click",()=>{t.forEach(r=>{r.classList.remove("active","shadow-sm"),r.style.backgroundColor="transparent"}),a.classList.add("active","shadow-sm"),a.style.backgroundColor="#fff",M.currentView=a.dataset.view,ve()})}),document.getElementById("btnWeekDays").addEventListener("click",()=>{pi()}),rs||(os.addEventListener("click",async a=>{const r=a.target.closest('[data-action="open-comanda"]');if(r){a.stopPropagation();const d=r.dataset.appointment||r.closest("[data-appointment]")?.dataset.appointment;if(!d)return;const l=JSON.parse(d.replace(/&apos;/g,"'")),c=l.status==="completed"?"finalizadas":"em-atendimento",u={selectedAppointmentId:l.id,initialFilter:c};c==="finalizadas"&&l.transaction?.paidAt&&(u.filterDate=typeof l.transaction.paidAt=="object"?new Date(l.transaction.paidAt._seconds*1e3):l.transaction.paidAt),J("comandas-section",u);return}const s=a.target.closest(".lc-action-btn.wa");if(s){a.stopPropagation(),s.dataset.link&&window.open(s.dataset.link,"_blank");return}if(a.target.closest('[data-action="batch-delete"]')){const d=M.selectedItems.size;await W("Excluir Selecionados",`Tem certeza que deseja excluir ${d} agendamento(s)? Esta ação não pode ser desfeita.`)&&(await Promise.all(Array.from(M.selectedItems).map(async c=>{try{await dr(c)}catch{}})),g(`${d} agendamento(s) excluído(s).`,"success"),M.selectedItems.clear(),M.isSelectionMode=!1,ve());return}const o=a.target.closest('[data-action="select-professional"]');if(o){const d=o.dataset.profId;M.selectedProfessionalId=M.selectedProfessionalId===d&&d!=="all"?"all":d,ve();return}const i=a.target.closest(".list-card[data-appointment], .week-event-chip[data-appointment]");if(i){if(M.isSelectionMode){a.stopPropagation();const l=i.querySelector('input[type="checkbox"]');if(l){const c=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'")),u=!l.checked;l.checked=u,u?M.selectedItems.add(c.id):M.selectedItems.delete(c.id),(i.classList.contains("week-event-chip")||i.classList.contains("list-card"))&&(u?(i.style.boxShadow="0 0 0 2px #4f46e5",i.style.backgroundColor="#eff6ff"):(i.style.boxShadow="none",i.style.backgroundColor=i.classList.contains("week-event-chip")?"#f8f9fa":"#fff")),Ha()}return}const d=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'"));ka(d);return}if(a.target.closest('[data-action="new-appointment"]')){ka();return}}),rs=!0),await ui(),await ve()}function pi(){const e=document.getElementById("optionsSheet");if(e){e.remove();return}const t=document.createElement("div");t.id="optionsSheet",t.style.cssText="position:fixed;bottom:0;left:50%;right:auto;transform:translateX(-50%) translateY(100%);width:100%;max-width:440px;background:#fff;border-radius:24px 24px 0 0;z-index:10000;box-shadow:0 -8px 40px rgba(0,0,0,0.15);transition:transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);";const a=M.isSelectionMode?"#fee2e2":"#f0fdf4",r=M.isSelectionMode?"#ef4444":"#16a34a",s=M.isSelectionMode?"bi-x-circle":"bi-check2-square";t.innerHTML=`
        <div style="padding:20px 24px;">
            <div style="width: 40px; height: 4px; background: #e5e7eb; border-radius: 4px; margin: 0 auto 16px;"></div>
            
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <span style="font-size:1.1rem;font-weight:700;color:#111827;">Opções da Agenda</span>
                <button id="closeOptSheet" style="width:32px;height:32px;border:none;background:#f3f4f6;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;">
                    <i class="bi bi-x-lg" style="font-size:0.8rem;color:#4b5563;"></i>
                </button>
            </div>

            <div style="margin-bottom:20px;">
                <div style="font-size:0.7rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">Gestão em Lote</div>
                <button id="optSelectMode" style="width:100%;padding:12px 16px;border:none;background:${a};border-radius:12px;font-size:0.9rem;font-weight:600;color:${r};cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background 0.2s;">
                    <i class="bi ${s}"></i> ${M.isSelectionMode?"Desativar Modo de Exclusão":"Ativar Seleção para Excluir"}
                </button>
                <p style="font-size:0.75rem; color:#6b7280; text-align:center; margin-top:8px;">${M.isSelectionMode?"Toque num card para desmarcar.":"Permite selecionar vários agendamentos para apagar de uma vez."}</p>
            </div>

            <div style="margin-bottom:16px;">
                <div style="font-size:0.7rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">Equipa</div>
                <label style="display:flex;align-items:center;gap:12px;font-size:0.9rem;font-weight:500;color:#374151;cursor:pointer;padding:8px 0; background:#f9fafb; border-radius:12px; padding:12px 16px;">
                    <input type="checkbox" id="optInactiveToggle" style="width:18px;height:18px;accent-color:#4f46e5;" ${M.showInactiveProfs?"checked":""}>
                    Exibir profissionais inativos na barra superior
                </label>
            </div>
        </div>`;const o=document.createElement("div");o.id="optionsOverlay",o.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:9999;opacity:0;transition:opacity 0.3s;",document.body.appendChild(o),document.body.appendChild(t),requestAnimationFrame(()=>{t.style.transform="translateX(-50%) translateY(0)",o.style.opacity="1"});const i=()=>{t.style.transform="translateX(-50%) translateY(100%)",o.style.opacity="0",setTimeout(()=>{t.remove(),o.remove()},300)};document.getElementById("closeOptSheet").addEventListener("click",i),o.addEventListener("click",i),document.getElementById("optSelectMode").addEventListener("click",()=>{M.isSelectionMode=!M.isSelectionMode,M.isSelectionMode||M.selectedItems.clear(),i(),so(),M.isSelectionMode&&setTimeout(()=>{g("Modo de Exclusão Ativo.","info")},300)}),document.getElementById("optInactiveToggle").addEventListener("change",n=>{M.showInactiveProfs=n.target.checked,Fa()})}function is(e){e<1||e>4||(q.step=e,ka(null,!0))}function mi(e){return{title:e?"Editar Reserva":"Identificar Cliente",content:`
        <div class="p-5 space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-gray-500 mb-1.5">Nome *</label>
                    <input type="text" id="apptClientName" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" value="${_(q.data.clientName)}">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-gray-500 mb-1.5">Telefone/WhatsApp *</label>
                    <input type="tel" id="apptClientPhone" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" value="${_(q.data.clientPhone)}">
                </div>
            </div>
            <div class="border-t border-gray-100 pt-5">
                <label class="block text-xs font-semibold text-gray-500 mb-2">Buscar cliente:</label>
                <div class="relative">
                    <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input type="text" id="clientSearchInput" placeholder="Digite o nome..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg text-sm">
                </div>
                <div id="clientSearchResults" class="mt-3 space-y-2 max-h-36 overflow-y-auto"></div>
            </div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" data-action="close-modal" data-target="appointmentModal" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg">Cancelar</button>
            <button type="button" data-action="next-step" data-current-step="1" class="py-2.5 px-5 bg-gray-900 text-white font-semibold text-sm rounded-lg">Avançar</button>
        </div>`}}function gi(){return{title:"Serviços",content:`
        <div class="p-5 space-y-5">
            <div class="flex items-center gap-3">
                <div class="relative flex-1">
                    <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input type="search" id="serviceSearchModalInput" placeholder="Buscar serviço..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg text-sm">
                </div>
                <label class="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                    <input type="checkbox" id="multiServiceToggle" class="w-4 h-4 rounded" ${q.data.selectedServiceIds.length>1?"checked":""}>
                    <span class="text-xs font-semibold text-gray-600">Múltiplos</span>
                </label>
            </div>
            <div id="apptServicesContainer" class="grid grid-cols-2 gap-3 max-h-56 overflow-y-auto">
                ${ea.map(e=>`<div class="service-card p-3 bg-white rounded-xl border ${q.data.selectedServiceIds.includes(e.id)?"border-indigo-500 bg-indigo-50":"border-gray-200"} cursor-pointer" data-service-id="${e.id}">
                        <p class="font-semibold text-sm text-gray-800 truncate">${_(e.name)}</p>
                        <p class="text-xs text-gray-500 mt-0.5">R$ ${e.price.toFixed(2)} · ${e.duration} min</p>
                    </div>`).join("")}
            </div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="2" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="2" class="py-2.5 px-5 bg-gray-900 text-white font-semibold text-sm rounded-lg">Avançar</button>
        </div>`}}function bi(){return{title:"Profissional",content:`
        <div class="p-5 space-y-5">
            <div class="relative">
                <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input type="search" id="professionalSearchModalInput" placeholder="Buscar na equipa..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg text-sm">
            </div>
            <div id="apptProfessionalContainer" class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-52 overflow-y-auto professional-step-cards">
                ${wa.map(e=>`<div class="professional-modal-card p-3 bg-white rounded-xl border ${q.data.professionalId===e.id?"border-indigo-500 bg-indigo-50":"border-gray-200"} cursor-pointer text-center" data-professional-id="${e.id}">
                        <div class="w-10 h-10 rounded-full bg-gray-100 mx-auto flex items-center justify-center font-bold text-sm text-gray-500">${_(e.name).charAt(0)}</div>
                        <p class="text-sm font-semibold mt-2 truncate">${_(e.name.split(" ")[0])}</p>
                    </div>`).join("")}
            </div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="3" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="3" class="py-2.5 px-5 bg-gray-900 text-white font-semibold text-sm rounded-lg">Avançar</button>
        </div>`}}function fi(){const e=q.data.date||new Date().toISOString().split("T")[0];return{title:"Data e Horário",content:`
        <div class="p-5 space-y-5">
            <div class="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
                <div class="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">${_(q.data.clientName).charAt(0)}</div>
                <div class="min-w-0">
                    <p class="font-semibold text-sm text-gray-900 truncate">${_(q.data.clientName)}</p>
                    <p class="text-xs text-gray-500 truncate">${_(q.data.professionalName)}</p>
                </div>
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1.5">Data</label>
                <input type="date" id="apptDate" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold" value="${e}">
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1.5">Duração total: <span id="apptTotalDuration" class="text-indigo-600">--</span></label>
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-500 mb-3">Horários disponíveis</label>
                <div id="availableTimesContainer" class="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto"></div>
            </div>
            <div id="loyaltyRewardsContainer"></div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="4" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg">Voltar</button>
            <button type="submit" class="py-2.5 px-8 bg-indigo-600 text-white font-semibold text-sm rounded-lg flex items-center gap-2"><i class="bi bi-calendar-check"></i> ${q.data.id?"Salvar":"Agendar"}</button>
        </div>`}}async function ka(e=null,t=!1){const a=document.getElementById("appointmentModal");t||(q={step:1,data:{id:e?.id||null,clientName:e?.clientName||"",clientPhone:e?.clientPhone||"",selectedServiceIds:e?.services?.map(s=>s.id)||[],professionalId:e?.professionalId||null,professionalName:e?.professionalName||"",date:e?.startTime?new Date(e.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],time:e?.startTime?new Date(e.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null,redeemedReward:e?.redeemedReward||null,clientHasRewards:e?.hasRewards||!1,clientLoyaltyPoints:0}}),ea=p.services||[],wa=(p.professionals||[]).filter(s=>s.status==="active");let r;switch(q.step){case 1:r=mi(e);break;case 2:r=gi();break;case 3:r=bi();break;case 4:r=fi();break}a.innerHTML=`
        <div class="modal-content max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden m-4 flex flex-col" style="max-height:90vh;">
            <header class="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                <div class="flex items-center gap-3">
                    <span class="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">${q.step}/4</span>
                    <h2 class="text-lg font-bold text-gray-900">${r.title}</h2>
                </div>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
                    <i class="bi bi-x-lg"></i>
                </button>
            </header>
            <form id="appointmentForm" class="flex-1 overflow-y-auto">${r.content}</form>
        </div>`,a.querySelectorAll('[data-action="next-step"]').forEach(s=>s.addEventListener("click",()=>{const o=parseInt(s.dataset.currentStep,10);if(o===1&&(q.data.clientName=a.querySelector("#apptClientName").value.trim(),q.data.clientPhone=a.querySelector("#apptClientPhone").value.trim(),!q.data.clientName))return g("Preencha o nome do cliente.","warning");if(o===2&&q.data.selectedServiceIds.length===0)return g("Selecione um serviço.","warning");if(o===3&&!q.data.professionalId)return g("Escolha um profissional.","warning");is(o+1)})),a.querySelectorAll('[data-action="prev-step"]').forEach(s=>s.addEventListener("click",()=>is(parseInt(s.dataset.currentStep,10)-1))),a.querySelector('[data-action="close-modal"]')?.addEventListener("click",()=>{a.style.display="none"}),q.step===4&&a.querySelector("#appointmentForm").addEventListener("submit",xi),a.style.display="flex",q.step===2&&a.querySelectorAll(".service-card").forEach(s=>s.addEventListener("click",()=>{const o=a.querySelector("#multiServiceToggle")?.checked,i=s.classList.contains("selected");o||(a.querySelectorAll(".service-card.selected").forEach(d=>d.classList.remove("selected","border-indigo-500","bg-indigo-50")),q.data.selectedServiceIds=[]);const n=s.dataset.serviceId;i?(s.classList.remove("selected","border-indigo-500","bg-indigo-50"),q.data.selectedServiceIds=q.data.selectedServiceIds.filter(d=>d!==n)):(s.classList.add("selected","border-indigo-500","bg-indigo-50"),q.data.selectedServiceIds.push(n))})),q.step===3&&a.querySelectorAll(".professional-modal-card").forEach(s=>s.addEventListener("click",()=>{a.querySelectorAll(".professional-modal-card.selected").forEach(i=>i.classList.remove("selected","border-indigo-500","bg-indigo-50")),s.classList.add("selected","border-indigo-500","bg-indigo-50"),q.data.professionalId=s.dataset.professionalId;const o=wa.find(i=>i.id===s.dataset.professionalId);q.data.professionalName=o?o.name:""})),q.step===1&&a.querySelector("#clientSearchInput")?.addEventListener("input",s=>vi(s.target.value)),q.step===4&&(a.querySelector("#apptDate")?.addEventListener("change",ns),ns(),hi())}async function xi(e){e.preventDefault();const a=e.target.querySelector('button[type="submit"]');if(!q.data.time||!q.data.selectedServiceIds.length||!q.data.professionalId)return g("Selecione horário, serviço e profissional.","warning");a.disabled=!0,a.innerHTML="Aguarde...";const r=q.data.selectedServiceIds.map(l=>{const c=ea.find(u=>u.id===l);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[s,o]=q.data.time.split(":"),i=new Date(`${q.data.date}T${s}:${o}:00`),d={establishmentId:p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments[0]:p.establishmentId,clientName:q.data.clientName,clientPhone:q.data.clientPhone,services:r,professionalId:q.data.professionalId,professionalName:q.data.professionalName,startTime:i.toISOString(),redeemedReward:q.data.redeemedReward};q.data.id&&(d.id=q.data.id);try{q.data.id?await lr(q.data.id,d):await nr(d),g("Agendamento registrado!","success"),document.getElementById("appointmentModal").style.display="none",ve()}catch(l){g(l.message,"error"),a.disabled=!1,a.textContent="Agendar"}}async function ns(){const e=document.getElementById("availableTimesContainer"),t=document.getElementById("apptTotalDuration");if(!e)return;const a=q.data.selectedServiceIds.reduce((i,n)=>{const d=ea.find(l=>l.id===n);return i+(d?d.duration+(d.bufferTime||0):0)},0);t&&(t.textContent=`${a} min`);const{professionalId:r,selectedServiceIds:s,date:o}=q.data;if(!r||!s.length||!o){e.innerHTML='<p class="col-span-full text-center text-xs text-gray-400">Selecione serviço e profissional</p>';return}try{const i=p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments[0]:p.establishmentId;let n=await ir({establishmentId:i,professionalId:r,serviceIds:s,date:o});const d=new Date;if(new Date(o+"T00:00:00").toDateString()===d.toDateString()){const l=d.getHours()*60+d.getMinutes();n=n.filter(c=>{const[u,m]=c.split(":").map(Number);return u*60+m>=l})}e.innerHTML=n.length>0?n.map(l=>`<button type="button" class="p-2 text-sm font-semibold rounded-lg border ${q.data.time===l?"bg-indigo-600 text-white border-indigo-600":"bg-gray-50 text-gray-700 border-gray-200 hover:bg-indigo-50"}" onclick="document.querySelectorAll('#availableTimesContainer button').forEach(b=>{b.classList.remove('bg-indigo-600','text-white','border-indigo-600');b.classList.add('bg-gray-50','text-gray-700','border-gray-200')});this.classList.add('bg-indigo-600','text-white','border-indigo-600');this.classList.remove('bg-gray-50','text-gray-700','border-gray-200');window._selectedTime='${l}';">${l}</button>`).join(""):'<p class="col-span-full text-center text-xs text-gray-400">Sem horários</p>'}catch{e.innerHTML='<p class="col-span-full text-center text-xs text-red-400">Erro</p>'}}function hi(){const e=document.getElementById("loyaltyRewardsContainer");if(!e)return;const{clientHasRewards:t,clientLoyaltyPoints:a}=q.data,{enabled:r,rewards:s}=zt;if(!r||!t||!s?.length){e.innerHTML="";return}const o=s.filter(i=>a>=i.points);if(!o.length){e.innerHTML='<p class="text-xs text-gray-400">Sem recompensas disponíveis.</p>';return}e.innerHTML=`<div class="border-t border-gray-100 pt-4">
        <p class="text-xs font-semibold text-gray-500 mb-2">Resgate fidelidade (${a} pts)</p>
        ${o.map(i=>`<label class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg mb-1 cursor-pointer"><input type="radio" name="loyaltyReward" value="${_(i.reward)}" data-points="${i.points}" class="accent-indigo-600"><span class="text-sm">${_(i.reward)} (-${i.points} pts)</span></label>`).join("")}
    </div>`,e.querySelectorAll('input[name="loyaltyReward"]').forEach(i=>{i.addEventListener("change",n=>{n.target.checked&&(q.data.redeemedReward={reward:n.target.value,points:parseInt(n.target.dataset.points,10)})})})}async function vi(e){const t=document.getElementById("clientSearchResults");if(!t||e.trim().length<3){t&&(t.innerHTML='<p class="text-xs text-gray-400">Digite pelo menos 3 caracteres...</p>');return}t.innerHTML='<div class="text-center py-3"><div class="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div></div>';try{const r=(p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments:[p.establishmentId]).map(n=>Xt(n,e.trim())),s=await Promise.all(r),o=new Map;s.forEach(n=>{n.forEach(d=>{d.phone?o.set(d.phone,d):o.set(d.id||Math.random().toString(),d)})});const i=Array.from(o.values());if(ao=i,!i.length){t.innerHTML='<p class="text-xs text-gray-400">Nenhum cliente encontrado.</p>';return}t.innerHTML=i.map(n=>`<div class="client-card p-2.5 bg-white rounded-lg border ${q.data.clientName===n.name&&q.data.clientPhone===n.phone?"border-indigo-500 bg-indigo-50":"border-gray-200"} cursor-pointer flex items-center gap-2" data-client-name="${_(n.name)}" data-client-phone="${_(n.phone)}" data-loyalty-points="${n.loyaltyPoints||0}">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">${_(n.name).charAt(0)}</div>
                <div><p class="text-sm font-semibold text-gray-800">${_(n.name)}</p><p class="text-xs text-gray-500">${_(n.phone)}</p></div>
            </div>`).join(""),t.querySelectorAll(".client-card").forEach(n=>n.addEventListener("click",()=>{q.data.clientName=n.dataset.clientName,q.data.clientPhone=n.dataset.clientPhone,q.data.clientLoyaltyPoints=parseInt(n.dataset.loyaltyPoints||"0",10);const d=Math.min(...(zt?.rewards||[]).map(l=>l.points));q.data.clientHasRewards=zt.enabled&&d!==1/0&&q.data.clientLoyaltyPoints>=d,document.getElementById("apptClientName").value=n.dataset.clientName,document.getElementById("apptClientPhone").value=n.dataset.clientPhone,t.querySelectorAll(".client-card").forEach(l=>l.classList.remove("border-indigo-500","bg-indigo-50")),n.classList.add("border-indigo-500","bg-indigo-50")}))}catch{t.innerHTML='<p class="text-xs text-red-400">Erro ao buscar.</p>'}}const yi=(e,t=null,a=1,r=12)=>{let s=`/api/comandas/${e}?page=${a}&limit=${r}`;return t&&(s+=`&date=${t}`),I(s)},wi=(e,t)=>I(`/api/appointments/${e}/comanda`,{method:"POST",body:JSON.stringify({items:t})}),ki=e=>I("/api/sales",{method:"POST",body:JSON.stringify(e)}),Si=e=>I(`/api/sales/${e}`,{method:"DELETE"}),ta=e=>I(`/api/products/${e}`),$i=e=>I("/api/products",{method:"POST",body:JSON.stringify(e)}),Ei=(e,t)=>I(`/api/products/${e}`,{method:"PUT",body:JSON.stringify(t)}),Ii=e=>I(`/api/products/${e}`,{method:"DELETE"}),Li=(e,t)=>I(`/api/products/${e}/stock`,{method:"PATCH",body:JSON.stringify(t)}),Ci=({startDate:e,endDate:t,productId:a,categoryId:r,establishmentId:s})=>{const o=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&o.append("productId",a),r&&r!=="all"&&o.append("categoryId",r),s&&o.append("establishmentId",s),I(`/api/products/stock-history/report?${o.toString()}`)},Di=()=>I("/api/cashier/status").catch(e=>{if(e.message.includes("404")||e.message.includes("não encontrada"))return null;throw e}),Ti=e=>{const t={establishmentId:e.establishmentId,initialAmount:Number(e.initialAmount),notes:e.notes||""};return console.log("Payload enviado para abrir caixa:",t),I("/api/cashier/open",{method:"POST",body:JSON.stringify(t)})},Bi=(e,t)=>{const a={finalAmount:Number(t)};return console.log("Payload enviado para fechar caixa:",a),I(`/api/cashier/close/${e}`,{method:"PUT",body:JSON.stringify(a)})},Pi=()=>I("/api/cashier/history").then(e=>e||[]).catch(e=>(console.error("Erro ao buscar histórico:",e),[])),Mi=e=>I(`/api/cashier/report/${e}`),za=e=>I(`/api/packages/${e}`),Ai=e=>I("/api/packages",{method:"POST",body:JSON.stringify(e)}),qi=(e,t)=>I(`/api/packages/${e}`,{method:"PUT",body:JSON.stringify(t)}),Ri=e=>I(`/api/packages/${e}`,{method:"DELETE"});let y={allComandas:[],catalog:{services:[],products:[],packages:[]},activeFilter:"abertas",selectedComandaId:null,viewMode:"items",isCashierOpen:!1,activeCashierSessionId:null,loyaltySettings:null,pendingRedemption:null,paging:{page:1,limit:15,total:0},checkoutState:{payments:[],selectedMethod:"dinheiro",installments:1,amountReceived:"",discount:{type:"real",value:0},discountReason:""},isProcessing:!1,showHistoryDate:!1},Ae=null,Ne=null,ls=null;function ro(e,t){return function(...a){clearTimeout(ls),ls=setTimeout(()=>e.apply(this,a),t)}}async function ds(e,t="stay"){if(!e||!e.id)return;e._localUpdatedAt=Date.now(),e._cachedItems=null,e._hasUnsavedChanges=!1,oa(),t==="checkout"&&(y.viewMode="checkout",y.checkoutState.payments||(y.checkoutState.payments=[]),y.checkoutState.selectedMethod="dinheiro",y.checkoutState.amountReceived="",y.checkoutState.discount.value||(y.checkoutState.discount={type:"real",value:0},y.checkoutState.discountReason=""),X());const a=document.createElement("div");a.id="saving-overlay",a.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",a.innerHTML=`
        <div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center animate-fade-in">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-800 font-bold text-lg">Sincronizando...</p>
        </div>
    `,document.body.appendChild(a);try{const r=(e.comandaItems||[]).filter(s=>s&&s.id&&String(s.id)!=="undefined"&&String(s.id)!=="null").map(s=>{const o={...s};if(o.id=String(s.id),o.type==="product"){const i=o.id;o.productId||(o.productId=i),o.product_id||(o.product_id=i)}if(o.type==="service"){const i=o.id;o.serviceId||(o.serviceId=i),o.service_id||(o.service_id=i)}return o});e.type==="walk-in"&&String(e.id).startsWith("temp-")||await wi(e.id,r),document.body.contains(a)&&document.body.removeChild(a),t!=="checkout"&&(g("Sucesso","Comanda atualizada!","success"),X())}catch(r){document.body.contains(a)&&document.body.removeChild(a),console.error("Erro ao salvar:",r),e._hasUnsavedChanges=!0,X(),g("Erro","Falha ao salvar no servidor: "+r.message,"warning")}}function ye(e){if(!e._cachedItems){let t=[];if(e.status==="completed"){const a=e.comandaItems||e.items||[];t=a.length>0?a:e.services||[]}else{const a=(e.services||[]).map(i=>({...i,_source:"original_service",type:"service"})),r=a.reduce((i,n)=>{const d=String(n.id);return i[d]=(i[d]||0)+1,i},{}),s=[...e.comandaItems||[],...e.items||[]],o=[];s.forEach(i=>{const n=String(i.id);(i.type==="service"||!i.type)&&r[n]>0?r[n]--:o.push({...i,_source:"extra"})}),t=[...a,...o]}return e._cachedItems=t,e._cachedTimestamp=Date.now(),t}return e._cachedItems}function Ni(){const e=document.getElementById("comandas-layout");if(e){e.classList.add("detail-view-active");const t=document.getElementById("comanda-detail-container");t&&(t.scrollTop=0)}}function je(){const e=document.getElementById("comandas-layout");e&&e.classList.remove("detail-view-active")}function ji(){const e=y.allComandas||[],t=e.filter(l=>l.status!=="completed").length,a=e.filter(l=>l.status==="completed"),r=a.reduce((l,c)=>{let u=c.totalAmount!==void 0?Number(c.totalAmount):ye(c).reduce((m,x)=>m+Number(x.price||0),0);return l+u},0),s=a.length>0?r/a.length:0,o=document.getElementById("kpi-abertas"),i=document.getElementById("kpi-pagas"),n=document.getElementById("kpi-vendas"),d=document.getElementById("kpi-ticket");o&&(o.textContent=t),i&&(i.textContent=a.length),n&&(n.textContent=`R$ ${r.toFixed(2).replace(".",",")}`),d&&(d.textContent=`R$ ${s.toFixed(2).replace(".",",")}`)}function Fi(){const e=new Date().toISOString().split("T")[0];Ne.innerHTML=`
        <section class="h-full flex flex-col p-4 md:p-6 md:pl-8">
            
            <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 w-full">
                
                <div id="cashier-controls" class="flex items-center gap-2">
                    <div class="loader-sm"></div>
                </div>
                
                <div class="flex flex-wrap items-center gap-3">
                    <button data-action="toggle-history" class="py-2 px-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-sm">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        Histórico
                    </button>

                    <button id="btn-new-sale" data-action="new-sale" class="py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-md flex items-center gap-2 text-sm">
                        <span>+</span> Nova Comanda Avulsa
                    </button>
                </div>
            </div>

            <div id="cashier-alert-box"></div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                    <span class="text-xs font-semibold text-gray-500 uppercase">Comandas Abertas</span>
                    <span id="kpi-abertas" class="text-2xl font-bold text-indigo-600 mt-1">0</span>
                </div>
                <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                    <span class="text-xs font-semibold text-gray-500 uppercase">Vendas Hoje</span>
                    <span id="kpi-vendas" class="text-2xl font-bold text-green-600 mt-1">R$ 0,00</span>
                </div>
                <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                    <span class="text-xs font-semibold text-gray-500 uppercase">Comandas Pagas</span>
                    <span id="kpi-pagas" class="text-2xl font-bold text-gray-800 mt-1">0</span>
                </div>
                <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                    <span class="text-xs font-semibold text-gray-500 uppercase">Ticket Médio</span>
                    <span id="kpi-ticket" class="text-2xl font-bold text-blue-600 mt-1">R$ 0,00</span>
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                <div class="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto custom-scrollbar">
                    <button data-filter="todas" class="filter-btn px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition whitespace-nowrap">Todas</button>
                    <button data-filter="abertas" class="filter-btn px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition whitespace-nowrap">Abertas</button>
                    <button data-filter="pagas" class="filter-btn px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition whitespace-nowrap">Fechadas / Pagas</button>
                </div>
                
                <div id="finalizadas-datepicker" class="hidden flex items-center gap-2 bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm w-full md:w-auto">
                    <label for="filter-date" class="text-xs font-semibold text-gray-500 uppercase pl-2">Data:</label>
                    <input type="date" id="filter-date" value="${e}" class="w-full md:w-auto p-1.5 border-0 rounded bg-gray-50 text-sm outline-none focus:ring-1 focus:ring-indigo-500">
                </div>
            </div>

            <div id="comandas-layout" class="flex-grow gap-4 min-h-0 w-full">
                <div id="comandas-list-column" class="flex flex-col bg-white border border-gray-100 rounded-xl shadow-sm h-full">
                    <div id="comandas-list" class="p-3 space-y-2 overflow-y-auto custom-scrollbar flex-grow">
                        <div class="loader mx-auto mt-10"></div>
                    </div>
                    <div id="pagination-container" class="p-2 border-t border-gray-100 bg-gray-50/50 flex-shrink-0 min-h-[50px] flex justify-center items-center rounded-b-xl"></div>
                </div>

                <div id="comanda-detail-container" class="bg-white border border-gray-100 rounded-xl shadow-sm h-full flex flex-col relative overflow-hidden">
                    <div class="hidden lg:flex flex-col items-center justify-center h-full text-center text-gray-400">
                        <p>Selecione uma venda para ver os detalhes</p>
                    </div>
                </div>
            </div>
        </section>
    `,sa(),aa()}function aa(){document.querySelectorAll(".filter-btn").forEach(a=>{a.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.add("bg-white","text-gray-600","border-gray-200")});const e=document.querySelector(`[data-filter="${y.activeFilter}"]`);e&&(e.classList.remove("bg-white","text-gray-600","border-gray-200"),e.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"));const t=document.getElementById("finalizadas-datepicker");t&&t.classList.toggle("hidden",!y.showHistoryDate)}function sa(){const e=document.getElementById("cashier-alert-box"),t=document.getElementById("btn-new-sale");y.isCashierOpen?(e&&(e.innerHTML=""),t&&(t.classList.remove("opacity-50","cursor-not-allowed"),t.disabled=!1)):(e&&(e.innerHTML=`
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded-r-lg animate-fade-in mx-1">
                <div class="flex">
                    <div class="flex-shrink-0">⚠️</div>
                    <div class="ml-3">
                        <p class="text-sm text-yellow-700">
                            <strong>Caixa Fechado!</strong> Abra o caixa para realizar operações e novas vendas.
                        </p>
                    </div>
                </div>
            </div>
        `),t&&(t.classList.add("opacity-50","cursor-not-allowed"),t.disabled=!0)),Hi()}function Hi(){const e=document.getElementById("cashier-controls");e&&(y.isCashierOpen?e.innerHTML=`
            <span class="hidden sm:inline-block text-xs font-bold text-green-700 bg-green-100 py-1.5 px-3 rounded-lg border border-green-200 uppercase">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-1.5 px-3 bg-red-50 text-red-700 border border-red-200 font-semibold rounded-lg hover:bg-red-100 text-xs transition">Fechar Caixa</button>
        `:e.innerHTML=`
            <span class="hidden sm:inline-block text-xs font-bold text-red-700 bg-red-100 py-1.5 px-3 rounded-lg border border-red-200 uppercase">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-1.5 px-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-xs shadow transition">Abrir Caixa</button>
        `)}function oa(){const e=document.getElementById("comandas-list"),t=document.getElementById("pagination-container");if(!e)return;if(!y.isCashierOpen&&y.activeFilter==="abertas"){e.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <svg class="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `,t&&(t.innerHTML="");return}let a=y.allComandas||[];if(y.activeFilter==="abertas"?a=a.filter(s=>s.status!=="completed"):y.activeFilter==="pagas"&&(a=a.filter(s=>s.status==="completed")),ji(),a.length===0){e.innerHTML='<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda encontrada para este filtro.</p>',cs(t);return}const r=document.createDocumentFragment();a.forEach(s=>{const o=ye(s);let i=0;s.status==="completed"&&s.totalAmount!==void 0&&s.totalAmount!==null?i=Number(s.totalAmount):i=o.reduce((T,L)=>T+Number(L.price||0),0);const d=s.loyaltyRedemption||s.discount&&s.discount.reason&&String(s.discount.reason).toLowerCase().includes("fidelidade")?'<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-5 h-5 ml-2" title="Prémio Resgatado">🎁</span>':"",l=s.id===y.selectedComandaId,c=new Date(s.startTime),u=c.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}),m=c.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),x=`${u} às ${m}`,b=s.type==="walk-in"||typeof s.id=="string"&&s.id.startsWith("temp-"),v=s.status==="completed",f=h(s.clientName||"Cliente sem nome"),E=h(s.professionalName||"Sem profissional");let S="";v?S='<span class="text-[10px] font-bold uppercase text-green-700 bg-green-100 px-2 py-0.5 rounded-md border border-green-200">Paga</span>':b?S='<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">Avulsa</span>':S='<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">Agenda</span>';const k=document.createElement("div");k.className=`comanda-card cursor-pointer ${l?"selected":""}`,k.dataset.action="select-comanda",k.dataset.comandaId=s.id,k.innerHTML=`
            <div class="flex justify-between items-start mb-1 pointer-events-none">
                <p class="font-bold text-gray-800 truncate max-w-[70%] text-sm">${f}</p>
                <div class="flex items-center">
                    <p class="font-bold ${v?"text-green-600":"text-gray-900"} text-sm">R$ ${i.toFixed(2)}</p>
                    ${d}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none">
                <div class="flex items-center gap-2">
                    ${S}
                    <p class="text-xs text-gray-500 truncate max-w-[100px]">${E}</p>
                </div>
                <p class="text-[11px] text-gray-600 font-semibold bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">${x}</p> 
            </div>
        `,r.appendChild(k)}),e.innerHTML="",e.appendChild(r),cs(t)}function cs(e){if(!e)return;e.innerHTML="";const{page:t,total:a,limit:r}=y.paging,s=Math.ceil((a||0)/r);if(s===0)return;const o=document.createElement("div");o.className="flex gap-2 justify-center items-center w-full",o.innerHTML=`
        <button data-page="${t-1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t<=1?"opacity-50 cursor-not-allowed":""}" ${t<=1?"disabled":""}>&laquo;</button>
        <span class="text-xs font-semibold text-gray-600 mx-2">Pág ${t} de ${s||1}</span>
        <button data-page="${t+1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t>=s?"opacity-50 cursor-not-allowed":""}" ${t>=s?"disabled":""}>&raquo;</button>
    `,e.appendChild(o),o.querySelectorAll("button[data-page]").forEach(i=>{i.onclick=n=>{n.stopPropagation();const d=parseInt(i.dataset.page,10);d>0&&d<=s&&(y.paging.page=d,de())}})}function X(){const e=document.getElementById("comanda-detail-container");if(!e)return;const t=y.allComandas.find(v=>v.id===y.selectedComandaId);if(y.viewMode==="checkout"&&t){zi(t,e);return}const a=`
        <div class="mobile-only-header">
            <button data-action="back-to-list" class="btn-back-mobile">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h3 class="font-bold text-lg text-gray-800 ml-2">Detalhes</h3>
        </div>
    `;if(!y.isCashierOpen){e.innerHTML=`
            ${a}
            <div class="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
                <div class="bg-gray-100 p-4 rounded-full mb-4">🔒</div>
                <p class="font-semibold text-lg">Caixa Fechado</p>
                <button data-action="open-cashier" class="py-2 px-6 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow mt-4">Abrir Caixa</button>
            </div>
        `;return}if(!t){e.innerHTML=`
            <div class="hidden lg:flex flex-col items-center justify-center h-full text-center text-gray-400">
                <svg class="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
                <p class="text-lg font-medium">Selecione uma venda</p>
                <p class="text-sm">Clique em um card ao lado para gerenciar a comanda</p>
            </div>
        `;return}const r=ye(t),s=t.status==="completed",o=t.type==="walk-in"||typeof t.id=="string"&&t.id.startsWith("temp-"),i=r.reduce((v,f)=>{const E=f._source==="original_service",S=f.id||f.name,k=E?`original-${S}`:`${f.type}-${S}`;return v[k]||(v[k]={...f,quantity:0,sources:[]}),v[k].quantity+=1,f._source&&v[k].sources.push(f._source),v},{}),n=Object.values(i).reduce((v,f)=>v+Number(f.price||0)*f.quantity,0),d=h(t.clientName||"Cliente sem nome"),l=h(t.professionalName||"Profissional não atribuído"),c=t._hasUnsavedChanges,x=`
        <div class="grid grid-cols-3 gap-3 mobile-hidden pt-2">
            <button data-action="add-item" class="col-span-1 py-3 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition border border-blue-200 text-sm">
                + Item
            </button>
            <button data-action="save-comanda" class="col-span-1 py-3 font-bold rounded-xl transition text-sm ${c?"bg-amber-500 text-white hover:bg-amber-600 shadow-lg animate-pulse":"bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"}">
                ${c?"Salvar Alterações*":"Salvar"}
            </button>
            <button data-action="go-to-checkout" class="col-span-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200 text-sm">
                Receber
            </button>
        </div>
    `,b=`
        <div class="mobile-fabs-container">
            <button data-action="add-item" class="fab-btn-secondary" title="Adicionar Item">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            </button>
            <button data-action="save-comanda" class="fab-btn-secondary ${c?"bg-amber-500 text-white hover:bg-amber-600":"bg-gray-600 text-white hover:bg-gray-700"}" title="Salvar Alterações">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
            </button>
            <button data-action="go-to-checkout" class="fab-btn-primary" title="Receber / Pagar">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08-.402-2.599-1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
        </div>
    `;e.innerHTML=`
        ${a} 
        <div class="flex-grow overflow-y-auto p-4 pb-24 custom-scrollbar"> 
            <div class="flex justify-between items-start mb-6 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800 truncate max-w-[200px]">${d}</h3>
                    <p class="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        ${l}
                    </p>
                    ${o?'<span class="mt-2 inline-block px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-md">Venda Avulsa</span>':`<button data-action="go-to-appointment" data-id="${t.id}" data-date="${t.startTime}" class="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1 mt-2">
                             Ver na Agenda <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                         </button>`}
                </div>
                <div class="flex gap-2">
                    ${s?`<button data-action="reopen-appointment" data-id="${t.id}" class="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200" title="Reabrir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>`:""}
                    ${o&&!s?`<button data-action="delete-walk-in" data-id="${t.id}" class="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200" title="Excluir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`:""}
                </div>
            </div>

            <div id="loyalty-container" class="mb-4"></div>

            <div class="space-y-3">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Itens do Pedido</h4>
                ${Object.values(i).map(v=>{const f=v.sources&&v.sources.includes("original_service"),E=y.pendingRedemption&&String(y.pendingRedemption.appliedToItemId)===String(v.id),S=v.isReward||E;return`
                    <div class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm ${S?"border-yellow-300 bg-yellow-50 ring-1 ring-yellow-200":""}">
                        <div class="flex items-center gap-3 w-full">
                            <div class="flex-grow min-w-0">
                                <p class="text-sm font-semibold text-gray-800 line-clamp-1">
                                    ${S?"🎁 ":""}
                                    ${h(v.name)}
                                    ${f?'<span class="text-[10px] text-indigo-600 bg-indigo-50 px-1 rounded border border-indigo-100 ml-1">Original</span>':""}
                                </p>
                                <p class="text-xs text-gray-500">${S?'<span class="text-yellow-700 font-bold bg-yellow-100 px-1 rounded">Prémio Fidelidade</span>':`R$ ${(v.price||0).toFixed(2)} un.`}</p>
                            </div>
                            ${s?`<span class="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg">${v.quantity}x</span>`:`
                                <div class="flex items-center bg-gray-100 rounded-lg p-1 gap-3">
                                    ${f?`<span class="text-sm font-bold text-gray-500 w-16 text-center py-1 bg-gray-200 rounded text-[10px] uppercase">Fixo: ${v.quantity}</span>`:`<button data-action="decrease-qty" data-item-id="${v.id}" data-item-type="${v.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-600">-</button>
                                         <span class="text-sm font-bold text-gray-800 w-4 text-center">${v.quantity}</span>
                                         <button data-action="increase-qty" data-item-id="${v.id}" data-item-type="${v.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-green-50 hover:text-green-600">+</button>`}
                                </div>
                            `}
                            <div class="flex items-center justify-end w-20">
                                <span class="font-bold text-gray-900 whitespace-nowrap">R$ ${(v.price*v.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                `}).join("")}
                ${Object.keys(i).length===0?'<div class="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg text-sm">Nenhum item adicionado</div>':""}
            </div>
        </div>

        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
            <div class="flex flex-col items-start lg:flex-row lg:justify-between lg:items-end mb-4">
                <span class="text-sm text-gray-500 font-medium">Total a Pagar</span>
                <span class="text-4xl lg:text-3xl font-extrabold text-gray-900 mt-1 lg:mt-0">R$ ${n.toFixed(2)}</span>
            </div>
            ${s?`
                <div class="bg-green-50 text-green-700 text-center py-3 rounded-xl font-bold border border-green-200 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Venda Finalizada
                </div>
            `:x}
        </footer>

        ${s?"":b}
    `,!s&&(t.clientId||t.clientName)&&Oi(t,e.querySelector("#loyalty-container"))}function zi(e,t){const r=ye(e).reduce((m,x)=>m+Number(x.price||0)*(x.quantity||1),0),s=y.checkoutState,o=s.discount||{type:"real",value:0};let i=0;o.type==="percent"?i=r*o.value/100:i=o.value,i>r&&(i=r);const n=r-i,d=s.payments.reduce((m,x)=>m+x.value,0),l=Math.max(0,n-d);(!s.amountReceived||l>0)&&(s.amountReceived=l.toFixed(2));const c=`
        <div class="mobile-only-header">
            <button data-action="back-to-items" class="btn-back-mobile">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h3 class="font-bold text-lg text-gray-800 ml-2">Pagamento</h3>
        </div>
    `;t.innerHTML=`
        ${c}
        <div class="flex-grow overflow-y-auto p-4 pb-24 custom-scrollbar">
            
            <div class="text-center mb-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Subtotal: <span id="checkout-subtotal-display">R$ ${r.toFixed(2)}</span></p>
                
                <div class="flex flex-col items-center justify-center gap-2 mt-4 mb-2">
                     <div class="flex items-center gap-2">
                         <span class="text-xs font-bold text-red-500">Desconto:</span>
                         <div class="flex border rounded-lg bg-white overflow-hidden shadow-sm w-40">
                             <input type="number" id="discount-value" value="${o.value}" class="w-20 p-1 text-center text-sm font-bold text-red-600 outline-none" placeholder="0">
                             <select id="discount-type" class="bg-gray-100 text-xs font-bold text-gray-700 border-l p-1 outline-none">
                                 <option value="real" ${o.type==="real"?"selected":""}>R$</option>
                                 <option value="percent" ${o.type==="percent"?"selected":""}>%</option>
                             </select>
                         </div>
                     </div>
                     <input type="text" id="discount-reason" class="w-64 p-2 text-xs border border-gray-200 rounded-lg text-center focus:border-indigo-300 focus:ring focus:ring-indigo-100 outline-none" placeholder="Motivo do desconto (opcional)" value="${s.discountReason||""}">
                </div>

                <p class="text-5xl font-extrabold text-gray-800 mt-2" id="checkout-total-display">R$ ${n.toFixed(2)}</p>
                
                <div id="checkout-status-msg" class="mt-2">
                    ${l<=.01?'<p class="text-green-600 font-bold text-lg">Pago</p>':`<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${l.toFixed(2)}</span></p>`}
                </div>
            </div>

            <div class="space-y-3 mb-6">
                ${s.payments.map((m,x)=>`
                    <div class="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-3">
                             <div class="bg-gray-100 p-2 rounded-lg">
                                <span class="font-bold text-xs uppercase text-gray-600">${m.method}</span>
                             </div>
                             ${m.installments>1?`<span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">${m.installments}x</span>`:""}
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-gray-900">R$ ${m.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${x}" class="text-red-400 hover:text-red-600 p-1"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                `).join("")}
            </div>

            ${l>.01?`
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label class="block text-xs font-bold text-gray-500 uppercase mb-3">Adicionar Pagamento</label>
                <div class="grid grid-cols-3 gap-2 mb-4">
                    ${["dinheiro","pix","debito","credito","crediario"].map(m=>`
                        <button data-action="select-method" data-method="${m}" class="p-2 rounded-lg border text-xs font-bold uppercase transition ${s.selectedMethod===m?"bg-indigo-600 text-white border-indigo-600 shadow-md":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}">
                            ${m}
                        </button>
                    `).join("")}
                </div>
                
                ${["credito","crediario"].includes(s.selectedMethod)?`
                    <div class="mb-3">
                        <label class="text-xs text-gray-500">Parcelas</label>
                        <select id="checkout-installments" class="w-full mt-1 p-2 border rounded-lg text-sm bg-gray-50">
                            ${Array.from({length:12},(m,x)=>`<option value="${x+1}" ${s.installments===x+1?"selected":""}>${x+1}x</option>`).join("")}
                        </select>
                    </div>
                `:""}

                <div class="flex items-end gap-2">
                    <div class="flex-grow">
                        <label class="text-xs text-gray-500">Valor</label>
                        <input type="number" id="checkout-amount" step="0.01" class="w-full p-2 border rounded-lg text-lg font-bold" value="${l.toFixed(2)}">
                    </div>
                    <button data-action="add-payment-checkout" class="h-[46px] px-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition">OK</button>
                </div>
            </div>
            `:""}
        </div>

        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] grid grid-cols-2 gap-3 z-10">
            <button data-action="back-to-items" class="py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition">Voltar</button>
            <button data-action="finalize-checkout" class="py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200">Finalizar</button>
        </footer>
    `;const u=()=>{const m=y.checkoutState.discount.type,x=y.checkoutState.discount.value;let b=m==="percent"?r*x/100:x;b>r&&(b=r);const v=r-b,f=y.checkoutState.payments.reduce((L,R)=>L+R.value,0),E=Math.max(0,v-f),S=t.querySelector("#checkout-total-display");S&&(S.textContent=`R$ ${v.toFixed(2)}`);const k=t.querySelector("#checkout-status-msg");k&&(E<=.01?k.innerHTML='<p class="text-green-600 font-bold text-lg">Pago</p>':k.innerHTML=`<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${E.toFixed(2)}</span></p>`);const T=t.querySelector("#checkout-amount");T&&E>0&&document.activeElement!==T&&(T.value=E.toFixed(2))};t.querySelector("#discount-value")?.addEventListener("input",m=>{const x=parseFloat(m.target.value)||0;y.checkoutState.discount.value=x,u()}),t.querySelector("#discount-type")?.addEventListener("change",m=>{y.checkoutState.discount.type=m.target.value,u()}),t.querySelector("#discount-reason")?.addEventListener("input",m=>{y.checkoutState.discountReason=m.target.value}),t.querySelector("#checkout-amount")?.addEventListener("input",m=>{y.checkoutState.amountReceived=m.target.value}),t.querySelector("#checkout-installments")?.addEventListener("change",m=>{y.checkoutState.installments=parseInt(m.target.value,10)})}async function Oi(e,t){if(!t)return;const a=y.loyaltySettings;if(!a||!a.enabled)return;let r=null;try{if(e.clientId)r=await Qs(p.establishmentId,e.clientId);else if(e.clientName){const n=await Xt(p.establishmentId,e.clientName,1);n&&n.length>0&&(r=n[0])}}catch(n){console.warn("Erro ao buscar dados de fidelidade",n)}if(!r||r.loyaltyPoints===void 0)return;const s=Number(r.loyaltyPoints)||0,i=(a.tiers||a.rewards||[]).filter(n=>{const d=Number(n.costPoints||n.points||0);return d>0&&s>=d});if(i.length>0){const n=document.createElement("div");n.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 shadow-sm flex justify-between items-center animate-fade-in",n.innerHTML=`
            <div class="flex items-center gap-3">
                <div class="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div>
                    <p class="text-sm font-bold text-yellow-800">Prémio Disponível!</p>
                    <p class="text-xs text-yellow-700">Saldo: <strong>${s} pts</strong></p>
                </div>
            </div>
        `;const d=document.createElement("button");d.innerText="Resgatar",d.className="text-xs font-bold bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-colors",d.onclick=()=>Vi(i,e),n.appendChild(d),t.innerHTML="",t.appendChild(n)}}function Vi(e,t){const a=`
        <div class="space-y-4">
            <p class="text-sm text-gray-600 mb-4">O cliente possui pontos suficientes para resgatar os seguintes itens:</p>
            <div class="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                ${e.map(o=>{const i=o.costPoints||o.points||0,n=o.name||o.reward,d=o.type||"money",l=o.discount?parseFloat(o.discount).toFixed(2):"0.00";let c="",u="bg-gray-100 text-gray-600";switch(d){case"service":c="Serviço",u="bg-indigo-100 text-indigo-700";break;case"product":c="Produto",u="bg-green-100 text-green-700";break;case"package":c="Pacote",u="bg-purple-100 text-purple-700";break;case"money":default:c="Valor Livre",u="bg-yellow-100 text-yellow-700";break}return`
                    <button data-action="select-reward" data-reward-id="${o.id||n}" class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group">
                        <div class="text-left flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded ${u}">${c}</span>
                                <p class="font-bold text-gray-800 group-hover:text-yellow-700">${h(n)}</p>
                            </div>
                            <p class="text-xs text-gray-500">Custo: ${i} pontos</p>
                        </div>
                        <div class="text-right">
                            <span class="block text-sm font-bold text-green-600">Desc. R$ ${l}</span>
                        </div>
                    </button>
                `}).join("")}
            </div>
        </div>
    `,{modalElement:r,close:s}=re({title:"🎁 Resgatar Prémio",contentHTML:a,maxWidth:"max-w-md"});r.addEventListener("click",o=>{const i=o.target.closest('[data-action="select-reward"]');if(i){const n=i.dataset.rewardId,d=e.find(l=>l.id&&l.id==n||(l.name||l.reward)==n);d&&(_i(d,t),s())}})}async function _i(e,t){const a=Number(e.costPoints||e.points||0),r=e.name||e.reward,s=e.type||"money";if(s==="money"){const d=parseFloat(e.discount)||0;if(d<=0){g("Erro","O valor do desconto configurado é inválido.","error");return}y.checkoutState.discount={type:"real",value:d},y.checkoutState.discountReason=`Resgate Fidelidade: ${r}`,y.pendingRedemption={rewardId:e.id||null,name:r,cost:a,type:"money"},g("Sucesso",`Prémio "${r}" resgatado! Desconto de R$ ${d.toFixed(2)} aplicado.`,"success"),X();return}const o=ye(t),i=e.itemId?String(e.itemId):null;if(!i){g("Erro de Configuração",`O prémio "${r}" não tem um item vinculado nas configurações.`,"error");return}const n=o.find(d=>{const l=d.id?String(d.id):null,c=d.serviceId?String(d.serviceId):d.service_id?String(d.service_id):null,u=d.productId?String(d.productId):d.product_id?String(d.product_id):null;return s==="service"?l===i||c===i:s==="product"?l===i||u===i:s==="package"?l===i:!1});if(n){let d=parseFloat(e.discount);(!d||d<=0)&&(d=parseFloat(n.price||0)),y.checkoutState.discount={type:"real",value:d},y.checkoutState.discountReason=`Resgate Fidelidade: ${r}`,y.pendingRedemption={rewardId:e.id||null,name:r,cost:a,type:s,appliedToItemId:n.id},g("Sucesso",`Prémio "${r}" resgatado! Item encontrado e desconto de R$ ${d.toFixed(2)} aplicado.`,"success"),X()}else g("Item Não Encontrado",`Para resgatar o prémio "${r}", o ${s==="service"?"serviço":s==="product"?"produto":"pacote"} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`,"warning")}function Ui(){if(!y.isCashierOpen)return g("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");const{modalElement:e,close:t}=re({title:"Adicionar Item à Comanda",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-4xl"}),a=()=>{const s=e.querySelector("#add-item-content");s.innerHTML=`
            <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-purple-600">Pacotes</h4><div id="modal-package-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
            </div>`;const o=(n="")=>{const d=n.toLowerCase(),l={service:'<svg class="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',package:'<svg class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'},c={"modal-service-list":{items:y.catalog.services,type:"service"},"modal-product-list":{items:y.catalog.products,type:"product"},"modal-package-list":{items:y.catalog.packages,type:"package"}};Object.entries(c).forEach(([u,{items:m,type:x}])=>{const b=document.getElementById(u);if(!b)return;const v=m.filter(f=>f.name.toLowerCase().includes(d)).slice(0,50);b.innerHTML=v.map(f=>f.id?`
                    <button data-action="select-item-for-quantity" data-item-type="${x}" data-item-id="${f.id}" class="flex items-center gap-2 w-full p-2 bg-white border rounded hover:bg-gray-50 transition text-left">
                        <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-50">${l[x]}</div>
                        <span class="flex-grow text-sm truncate">${h(f.name)}</span>
                        <span class="font-bold text-xs text-gray-700">R$ ${f.price.toFixed(2)}</span>
                    </button>
                `:"").join("")||'<p class="text-xs text-gray-400 text-center py-2">Nada encontrado</p>'})};o();const i=document.getElementById("item-search-input");i.addEventListener("input",ro(n=>{o(n.target.value)},300)),setTimeout(()=>i.focus(),100)},r=s=>{let o=1;const i=e.querySelector("#add-item-content"),n=()=>{document.getElementById("quantity-display").textContent=o,document.getElementById("quantity-minus-btn").disabled=o<=1};i.innerHTML=`
            <div class="text-center p-8 relative">
                <button data-action="back-to-catalog" class="absolute top-0 left-0 text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Voltar
                </button>
                <h3 class="font-bold text-2xl text-gray-800 mt-4">${h(s.name)}</h3>
                <p class="text-lg text-gray-500 font-medium">R$ ${s.price.toFixed(2)}</p>
                <div class="my-8 flex items-center justify-center gap-6">
                    <button id="quantity-minus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition disabled:opacity-50">-</button>
                    <span id="quantity-display" class="text-5xl font-bold w-24 text-center text-indigo-700">${o}</span>
                    <button id="quantity-plus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition">+</button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg text-lg">Adicionar à Comanda</button>
            </div>
        `,document.getElementById("quantity-minus-btn").onclick=()=>{o>1&&(o--,n())},document.getElementById("quantity-plus-btn").onclick=()=>{o++,n()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await no(s,o),t()}};e.addEventListener("click",s=>{const o=s.target.closest('[data-action="select-item-for-quantity"]'),i=s.target.closest('[data-action="back-to-catalog"]');if(o){const{itemType:n,itemId:d}=o.dataset,c=(y.catalog[n+"s"]||[]).find(u=>u.id===d);c&&r({...c,type:n})}else i&&a()}),a()}async function Sa(e=null){if(!y.isCashierOpen)return g("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");if(!p.professionals||p.professionals.length===0)try{p.professionals=await le(p.establishmentId)}catch{return g("Erro","Não foi possível carregar profissionais.","error")}const a=`
        <form id="new-sale-form" class="space-y-4">
            <div class="relative">
                <label class="block text-sm font-medium text-gray-700">Cliente</label>
                <input type="text" id="client-search" class="mt-1 w-full p-2 border rounded-md bg-white focus:ring-2 focus:ring-indigo-500" placeholder="Digite nome ou telefone..." autocomplete="off">
                <input type="hidden" id="selected-client-id" required>
                <ul id="client-suggestions" class="hidden absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto mt-1"></ul>
                <button type="button" data-action="new-client-from-sale" class="text-xs text-blue-600 hover:underline mt-1 font-medium inline-block">+ Cadastrar Novo Cliente</button>
            </div>
            <div>
                <label for="new-sale-professional" class="block text-sm font-medium text-gray-700">Profissional</label>
                <select id="new-sale-professional" required class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Selecione...</option>${p.professionals.map(d=>`<option value="${d.id}">${h(d.name)}</option>`).join("")}</select>
            </div>
            <div class="pt-4 border-t"><button type="submit" id="btn-start-sale" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">Iniciar Venda</button></div>
        </form>
    `,{modalElement:r}=re({title:"Nova Venda Avulsa",contentHTML:a,maxWidth:"max-w-md"}),s=r.querySelector("#client-search"),o=r.querySelector("#client-suggestions"),i=r.querySelector("#selected-client-id");e&&(i.value=e.id,s.value=`${e.name} (${e.phone||"Sem tel"})`,s.classList.add("bg-green-50","border-green-300","text-green-800")),s.addEventListener("input",ro(async d=>{const l=d.target.value.trim();if(i.value="",s.classList.remove("bg-green-50","border-green-300","text-green-800"),l.length<2){o.classList.add("hidden");return}try{o.innerHTML='<li class="p-2 text-xs text-gray-500">Buscando...</li>',o.classList.remove("hidden");const c=await Xt(p.establishmentId,l,10);c.length===0?o.innerHTML='<li class="p-2 text-xs text-gray-500">Nenhum cliente encontrado</li>':o.innerHTML=c.map(u=>`<li data-client-id="${u.id}" data-client-name="${u.name}" data-client-phone="${u.phone}" class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 transition-colors"><div class="font-bold text-sm text-gray-800">${h(u.name)}</div><div class="text-xs text-gray-500">${u.phone||"Sem telefone"}</div></li>`).join("")}catch{o.classList.add("hidden")}},400)),o.addEventListener("click",d=>{const l=d.target.closest("li[data-client-id]");l&&(i.value=l.dataset.clientId,i.dataset.name=l.dataset.clientName,i.dataset.phone=l.dataset.clientPhone,s.value=`${l.dataset.clientName}`,s.classList.add("bg-green-50","border-green-300","text-green-800"),o.classList.add("hidden"))}),document.addEventListener("click",d=>{!s.contains(d.target)&&!o.contains(d.target)&&o.classList.add("hidden")}),r.querySelector("#new-sale-form").addEventListener("submit",Zi);const n=r.querySelector('[data-action="new-client-from-sale"]');n&&n.addEventListener("click",d=>{d.preventDefault(),r.style.display="none",Wi()})}function Wi(){re({title:"Cadastrar Novo Cliente",contentHTML:`
        <form id="comandas_clientRegistrationForm" class="flex flex-col h-full">
            <div class="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar" style="max-height: 80vh;">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label class="block text-sm font-medium text-gray-700">Nome *</label><input type="text" id="regClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></div>
                    <div><label class="block text-sm font-medium text-gray-700">Telefone (ID) *</label><input type="tel" id="regClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="Apenas números"></div>
                </div>
            </div>
            <footer class="p-5 border-t bg-gray-100 flex justify-end gap-3 flex-shrink-0">
                <button type="submit" class="py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md">Salvar Cliente</button>
            </footer>
        </form>
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("comandas_clientRegistrationForm");t&&t.addEventListener("submit",Ji)}async function Ji(e){e.preventDefault();const t=document.getElementById("comandas_clientRegistrationForm");if(!t)return;const a=t.querySelector("#regClientName"),s=t.querySelector("#regClientPhone").value.replace(/\D/g,"");if(!a.value||!s)return g("Erro","Nome e Telefone são obrigatórios.","error");try{const o=await Jr(p.establishmentId,s);if(o)g("Atenção","Cliente já cadastrado.","info"),document.getElementById("genericModal").style.display="none",Sa(o);else{const i=await Xs({establishmentId:p.establishmentId,name:a.value,phone:s});g("Sucesso","Cliente cadastrado!","success"),document.getElementById("genericModal").style.display="none",Sa(i)}}catch(o){g("Erro",o.message,"error")}}async function Gi(){const e=`
        <form id="open-cashier-form" class="space-y-4">
            <div>
                <label for="initial-amount" class="block text-sm font-medium text-gray-700">Valor Inicial do Caixa</label>
                <div class="mt-1 relative"><span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span><input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold" placeholder="0.00" value="0.00"></div>
            </div>
            <div class="pt-4 border-t"><button type="submit" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition shadow-md">Confirmar Abertura</button></div>
        </form>
    `,{modalElement:t}=re({title:"Abrir Caixa",contentHTML:e,maxWidth:"max-w-md"});t.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const r=parseFloat(document.getElementById("initial-amount").value);if(isNaN(r)||r<0)return g("Valor Inválido","Insira um valor válido.","error");try{const s=await Ti({establishmentId:p.establishmentId,initialAmount:parseFloat(r.toFixed(2))});y.isCashierOpen=!0,y.activeCashierSessionId=s.id,document.getElementById("genericModal").style.display="none",g("Sucesso!",`Caixa aberto (R$ ${r.toFixed(2)})`,"success"),sa(),await de()}catch(s){g("Erro",`Falha ao abrir caixa: ${s.message}`,"error")}})}async function Qi(){const e=y.activeCashierSessionId;if(e)try{const t=await Mi(e),a=`
            <form id="close-cashier-form" class="space-y-4">
                <div class="grid grid-cols-2 gap-4 text-center">
                    <div class="bg-blue-50 p-3 rounded-lg border border-blue-100"><p class="text-xs text-gray-500 uppercase font-bold">Abertura</p><p class="text-xl font-bold text-blue-700">R$ ${t.initialAmount.toFixed(2)}</p></div>
                    <div class="bg-green-50 p-3 rounded-lg border border-green-100"><p class="text-xs text-gray-500 uppercase font-bold">Vendas Dinheiro</p><p class="text-xl font-bold text-green-700">R$ ${t.cashSales.toFixed(2)}</p></div>
                </div>
                <div class="bg-gray-800 text-white p-4 rounded-lg text-center shadow-lg"><p class="text-sm font-medium opacity-80">Valor Esperado em Caixa</p><p class="text-3xl font-bold">R$ ${t.expectedAmount.toFixed(2)}</p></div>
                <hr>
                <div>
                    <label for="final-amount" class="block text-sm font-bold text-gray-700">Valor Final (Contado)</label>
                    <div class="mt-1 relative"><span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span><input type="number" step="0.01" min="0" id="final-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold border-gray-300 focus:ring-2 focus:ring-red-500" placeholder="0.00" value="${t.expectedAmount.toFixed(2)}"></div>
                </div>
                <div class="pt-4 border-t"><button type="submit" class="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition shadow-md">Confirmar e Fechar</button></div>
            </form>
        `,{modalElement:r}=re({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-md"});r.querySelector("#close-cashier-form").addEventListener("submit",async s=>{s.preventDefault();const o=parseFloat(document.getElementById("final-amount").value);if(isNaN(o)||o<0)return g("Valor Inválido","Insira um valor final válido.","error");try{await Bi(e,o),y.isCashierOpen=!1,y.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",sa(),await de(),g("Sucesso!","Caixa fechado com sucesso!","success")}catch(i){g("Erro",`Falha ao fechar caixa: ${i.message}`,"error")}})}catch(t){g("Erro",`Falha ao carregar relatório: ${t.message}`,"error")}}async function Yi(e){if(y.activeFilter===e)return;y.activeFilter=e,y.paging.page=1,aa(),je(),y.selectedComandaId=null,y.viewMode="items";const t=document.getElementById("comandas-list");t&&(t.innerHTML='<div class="loader mx-auto mt-10"></div>'),await de()}function io(e){y.selectedComandaId=e,y.viewMode="items",y.pendingRedemption=null,y.checkoutState.discount={type:"real",value:0},y.checkoutState.discountReason="",oa(),Ni(),X()}async function no(e,t){const a=y.allComandas.find(o=>o.id===y.selectedComandaId);if(!a)return;if(!e.id||String(e.id)==="undefined"){g("Erro","Item sem identificador. Não foi possível adicionar.","error");return}const r=parseFloat(e.price)||0,s=Array(t).fill(0).map(()=>{const o={id:String(e.id),name:e.name,price:r,type:e.type,isReward:e.isReward||!1,pointsCost:e.pointsCost||0};return e.type==="product"?(o.productId=o.id,o.product_id=o.id):e.type==="service"&&(o.serviceId=o.id,o.service_id=o.id),o});a.comandaItems=a.comandaItems||[],a.comandaItems.push(...s),a._cachedItems=null,a._hasUnsavedChanges=!0,X()}async function us(e,t){const a=y.allComandas.find(o=>o.id===y.selectedComandaId);if(!a)return;let r=!1,s=(a.comandaItems||[]).findIndex(o=>o.id==e&&o.type===t);s>-1&&(a.comandaItems.splice(s,1),r=!0),r&&(a._cachedItems=null,a._hasUnsavedChanges=!0,X())}async function Xi(e){if(y.isProcessing)return;const t=ye(e),a=t.reduce((f,E)=>f+Number(E.price||0)*(E.quantity||1),0),r=y.checkoutState.discount||{type:"real",value:0};let s=r.type==="percent"?a*r.value/100:r.value;s>a&&(s=a);const o=a-s,{payments:i}=y.checkoutState,n=i.reduce((f,E)=>f+E.value,0),d=o-n;if(d>.01){if(!await W("Pagamento Parcial",`O valor de R$ ${d.toFixed(2)} não foi pago. Deseja registrar como DÍVIDA (Fiado) no cadastro do cliente?`))return;i.push({method:"fiado",value:d,installments:1})}y.isProcessing=!0;const l=e.type==="appointment",c=t;let u=0;const m=y.loyaltySettings;m&&m.enabled&&(u=parseInt(m.pointsPerVisit||1,10));const x={...r,reason:y.checkoutState.discountReason||""},b={payments:i,totalAmount:Number(o),items:c,cashierSessionId:y.activeCashierSessionId,loyaltyPointsEarned:u,discount:x,loyaltyRedemption:y.pendingRedemption},v=document.createElement("div");v.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",v.innerHTML='<div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center"><div class="loader mb-4 border-t-indigo-600"></div><p>Finalizando venda...</p></div>',document.body.appendChild(v);try{l?await ur(e.id,b):(b.establishmentId=p.establishmentId,b.clientId=e.clientId,b.clientName=e.clientName,b.professionalId=e.professionalId,e.clientPhone&&(b.clientPhone=e.clientPhone),await ki(b));let f="Venda finalizada com sucesso!";u>0&&(f+=` Cliente ganhou ${u} pontos!`),g("Sucesso!",f,"success"),je(),y.selectedComandaId=null,y.viewMode="items",y.pendingRedemption=null,await de()}catch(f){g("Erro no Checkout",f.message,"error")}finally{document.body.contains(v)&&document.body.removeChild(v),y.isProcessing=!1}}async function Zi(e){e.preventDefault();const t=document.getElementById("selected-client-id"),a=document.getElementById("new-sale-professional").value,r=t.value,s=document.getElementById("client-search").value,o=t.dataset.phone||"";if(!r)return g("Erro","Selecione um cliente válido.","error");const i=p.professionals.find(d=>d.id===a);if(!i)return g("Erro","Selecione um profissional válido.","error");const n={id:`temp-${Date.now()}`,type:"walk-in",clientId:r,clientName:s.split("(")[0].trim(),clientPhone:o,professionalId:i.id,professionalName:i.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};y.allComandas.unshift(n),y.selectedComandaId=n.id,y.viewMode="items",document.getElementById("genericModal").style.display="none",y.activeFilter==="pagas"&&(y.activeFilter="abertas"),aa(),io(n.id)}async function de(){const e=document.getElementById("comandas-list");(!e.hasChildNodes()||e.innerHTML.includes("loader"))&&(e.innerHTML='<div class="loader mx-auto mt-10"></div>');const t=y.showHistoryDate?document.getElementById("filter-date").value:null;try{const a=Di(),r=yi(p.establishmentId,t,y.paging.page,y.paging.limit),s=Ce(p.establishmentId),[o,i,n]=await Promise.all([a,r,s]);if(y.isCashierOpen=!!o,y.activeCashierSessionId=o?o.id:null,sa(),n&&n.loyaltyProgram&&(y.loyaltySettings=n.loyaltyProgram),y.allComandas=i.data||i||[],y.paging.total=i.total||y.allComandas.length,y.catalog.services.length===0){const[d,l,c,u]=await Promise.all([Be(p.establishmentId),ta(p.establishmentId),za(p.establishmentId),le(p.establishmentId)]);y.catalog={services:d,products:l,packages:c},p.professionals=u}oa(),X()}catch(a){g("Erro",`Não foi possível carregar os dados: ${a.message}`,"error")}}async function Ki(e={}){Ne=document.getElementById("content"),y.selectedComandaId=e.selectedAppointmentId||null,y.viewMode="items",Fi(),Ae&&(Ne.removeEventListener("click",Ae),Ne.removeEventListener("change",Ae)),Ae=async t=>{const a=t.target.closest("[data-action], [data-filter], [data-comanda-id]");if(t.target.id==="filter-date"){y.paging.page=1,await de();return}if(a){if(a.matches("[data-filter]"))Yi(a.dataset.filter);else if(a.matches("[data-comanda-id]")){if(t.target.closest('[data-action="go-to-appointment"]')){t.stopPropagation();return}io(a.dataset.comandaId)}else if(a.matches("[data-action]")){const s=a.dataset.action,o=a.dataset.id||y.selectedComandaId,i=y.allComandas.find(n=>n.id===o);switch(s){case"toggle-history":y.showHistoryDate=!y.showHistoryDate,y.showHistoryDate&&y.activeFilter==="abertas"&&(y.activeFilter="todas"),aa(),y.showHistoryDate||await de();break;case"back-to-list":je(),y.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach(S=>S.classList.remove("selected")),X();break;case"new-sale":Sa();break;case"add-item":Ui();break;case"open-cashier":Gi();break;case"close-cashier":await Qi();break;case"view-sales-report":J("sales-report-section");break;case"go-to-checkout":await ds(i,"checkout");break;case"back-to-items":y.viewMode="items",X();break;case"save-comanda":await ds(i,"stay");break;case"select-method":y.checkoutState.selectedMethod=a.dataset.method,y.checkoutState.installments=1,X();break;case"add-payment-checkout":const n=document.getElementById("checkout-amount");let d=parseFloat(n.value);const c=ye(i).reduce((S,k)=>S+(k.price||0),0),u=y.checkoutState.discount||{type:"real",value:0};let m=u.type==="percent"?c*u.value/100:u.value;m>c&&(m=c);const x=c-m,b=y.checkoutState.payments.reduce((S,k)=>S+k.value,0),v=x-b;if(isNaN(d)||d<=0){g("Valor inválido","Insira um valor maior que zero.","error");break}if(d>v+.05){g("Valor inválido","Valor excede o restante.","error");break}const f={method:y.checkoutState.selectedMethod,value:d};["credito","crediario"].includes(y.checkoutState.selectedMethod)&&y.checkoutState.installments>1&&(f.installments=y.checkoutState.installments),y.checkoutState.payments.push(f),y.checkoutState.selectedMethod="dinheiro",y.checkoutState.installments=1,y.checkoutState.amountReceived="",X();break;case"remove-payment-checkout":const E=parseInt(a.dataset.index,10);y.checkoutState.payments.splice(E,1),X();break;case"finalize-checkout":await Xi(i);break;case"increase-qty":{const S=a.dataset.itemId,k=a.dataset.itemType;if(!S||S==="undefined"||S==="null"){g("Erro","Item inválido.","error");return}let L=ye(i).find(H=>H.id==S&&H.type===k);L||(L=(y.catalog[k+"s"]||[]).find(B=>B.id==S));const R=L?{id:L.id,name:L.name,price:Number(L.price),type:L.type}:{id:S,name:"Item",price:0,type:k};await no(R,1);break}case"decrease-qty":await us(a.dataset.itemId,a.dataset.itemType);break;case"remove-item":await us(a.dataset.itemId,a.dataset.itemType);break;case"reopen-appointment":{if(await W("Reabrir Comanda","Tem certeza? O pagamento será estornado."))try{await cr(o);const k=y.allComandas.findIndex(T=>T.id===o);k!==-1&&(y.allComandas[k].status="confirmed",delete y.allComandas[k].transaction),y.selectedComandaId=null,je(),await de(),g("Sucesso!","Comanda reaberta.","success")}catch(k){g("Erro",k.message,"error")}break}case"go-to-appointment":{J("agenda-section",{scrollToAppointmentId:a.dataset.id,targetDate:new Date(a.dataset.date)});break}case"delete-walk-in":{if(await W("Excluir Venda","Confirma a exclusão desta venda avulsa?"))if(o.startsWith("temp-"))y.allComandas=y.allComandas.filter(k=>k.id!==o),y.selectedComandaId=null,oa(),X(),je();else try{await Si(o),g("Sucesso","Venda excluída.","success"),y.selectedComandaId=null,je(),await de()}catch(k){g("Erro",k.message,"error")}break}}}}},Ne.addEventListener("click",Ae),Ne.addEventListener("change",Ae),e.initialFilter&&(e.initialFilter==="finalizadas"?y.activeFilter="pagas":y.activeFilter="abertas"),e.selectedAppointmentId&&(y.selectedComandaId=e.selectedAppointmentId),e.filterDate&&(document.getElementById("filter-date").value=new Date(e.filterDate).toISOString().split("T")[0],y.showHistoryDate=!0),await de()}const ra=e=>I(`/api/financial/natures/${e}`),en=e=>I("/api/financial/natures",{method:"POST",body:JSON.stringify(e)}),tn=e=>I(`/api/financial/natures/${e}`,{method:"DELETE"}),Oa=e=>I(`/api/financial/cost-centers/${e}`),an=e=>I("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(e)}),sn=e=>I(`/api/financial/cost-centers/${e}`,{method:"DELETE"}),lo=(e,t)=>I(`/api/financial/${e}`,{method:"POST",body:JSON.stringify(t)}),co=(e,t={})=>{let a=`/api/financial/${e}`;const r=new URLSearchParams;t.establishmentId&&r.append("establishmentId",t.establishmentId),t.startDate&&r.append("startDate",t.startDate),t.endDate&&r.append("endDate",t.endDate),t.natureId&&r.append("natureId",t.natureId),t.costCenterId&&r.append("costCenterId",t.costCenterId),t.status&&r.append("status",t.status);const s=r.toString();return s&&(a+=`?${s}`),I(a)},uo=(e,t,a)=>I(`/api/financial/${e}/${t}`,{method:"PUT",body:JSON.stringify(a)}),po=(e,t)=>I(`/api/financial/${e}/${t}`,{method:"DELETE"}),mo=(e,t)=>{const a=t.map(r=>I(`/api/financial/${e}/${r}`,{method:"DELETE"}));return Promise.all(a)},go=(e,t,a)=>I(`/api/financial/${e}/${t}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),on=e=>lo("payables",e),bo=e=>co("payables",e),rn=(e,t)=>uo("payables",e,t),nn=e=>po("payables",e),ln=(e,t)=>go("payables",e,t),dn=e=>lo("receivables",e),fo=e=>co("receivables",e),cn=(e,t)=>uo("receivables",e,t),un=e=>po("receivables",e),pn=(e,t)=>go("receivables",e,t),$a=document.getElementById("content");let se={};const Et={creditRealized:"#10b981",creditProvisioned:"#6ee7b7",debitRealized:"#ef4444",debitProvisioned:"#fca5a5"},mn=["#4f46e5","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4"],A={startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],selectedProfessional:"all",selectedCostCenter:"all",professionalsList:[],costCentersList:[],naturesList:[],rawPayables:[],rawReceivables:[],processedDRE:null,processedCashFlow:null,processedDailyRevenue:null,backendData:null,appointmentsData:[],currentTab:"dashboards",isFilterOpen:!1};async function gn(){if(!window.Chart)return new Promise((e,t)=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js",a.onload=e,a.onerror=t,document.head.appendChild(a)})}async function bn(){$a.innerHTML=`
        <div class="flex flex-col items-center justify-center h-[calc(100vh-100px)] w-full">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-500 font-medium animate-pulse">Carregando inteligência...</p>
        </div>`;try{await gn();const[e,t,a]=await Promise.all([le(p.establishmentId),Or(p.establishmentId).catch(()=>[]),ra(p.establishmentId).catch(()=>[])]);A.professionalsList=e||[],A.costCentersList=t||[],A.naturesList=a||[],fn(),await xo()}catch(e){console.error("Erro no loadReportsPage:",e),$a.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full text-red-500 p-6 text-center w-full">
                <div class="bg-red-50 p-4 rounded-full mb-4"><svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                <h3 class="text-lg font-bold text-gray-800">Ops! Algo deu errado.</h3>
                <p class="text-sm text-gray-600 mt-2 max-w-xs mx-auto break-words">${h(e.message)}</p>
                <button onclick="window.location.reload()" class="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-transform active:scale-95">Tentar Novamente</button>
            </div>`}}function fn(){const e=A.professionalsList.map(a=>`<option value="${a.id}">${h(a.name)}</option>`).join(""),t=A.costCentersList.map(a=>`<option value="${a.id}">${h(a.name)}</option>`).join("");$a.innerHTML=`
        <div class="flex flex-col min-h-screen bg-gray-50 pb-24 relative w-full max-w-[100vw] overflow-x-hidden">
            
            <div class="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300 w-full">
                <div class="max-w-7xl mx-auto px-3 md:px-4 py-3">
                    <div class="flex justify-between items-center">
                        <div class="flex-1 min-w-0 mr-2">
                            <h1 class="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                                <span class="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg flex-shrink-0 shadow-sm border border-indigo-100">
                                    <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                </span>
                                <span class="truncate">Relatórios</span>
                            </h1>
                            <p class="text-[10px] md:text-xs text-gray-500 mt-0.5 ml-1 truncate" id="date-range-display">
                                ${Ot(A.startDate)} até ${Ot(A.endDate)}
                            </p>
                        </div>
                        <button id="toggle-filters-btn" class="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors relative flex-shrink-0">
                            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                        </button>
                    </div>
                </div>

                <div id="filters-container" class="hidden border-t border-gray-100 bg-gray-50/50 overflow-hidden transition-all duration-300 w-full">
                    <div class="p-4 grid grid-cols-1 md:grid-cols-4 gap-3 max-w-7xl mx-auto w-full">
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Início</label>
                            <input type="date" id="report-start" value="${A.startDate}" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Fim</label>
                            <input type="date" id="report-end" value="${A.endDate}" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Profissional</label>
                            <select id="report-prof" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm text-gray-700">
                                <option value="all">Todos Profissionais</option>
                                ${e}
                            </select>
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Centro de Custo</label>
                            <select id="report-cost" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm text-gray-700">
                                <option value="all">Todos Centros</option>
                                ${t}
                            </select>
                        </div>
                        <button id="btn-apply-filters" class="md:col-span-4 mt-2 w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md active:scale-95 transition-transform flex justify-center items-center gap-2">
                            Aplicar Filtros
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto no-scrollbar border-t border-gray-100 bg-white w-full">
                    <div class="flex px-3 md:px-4 py-2 gap-2 min-w-max max-w-7xl mx-auto">
                        <button data-tab="dashboards" class="tab-btn flex-1 py-2 px-4 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap border">Financeiro</button>
                        <button data-tab="dre" class="tab-btn flex-1 py-2 px-4 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap border">DRE Contábil</button>
                        <button data-tab="appointments" class="tab-btn flex-1 py-2 px-4 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap border">Agendamentos</button>
                    </div>
                </div>
            </div>

            <main id="report-content" class="flex-1 max-w-7xl w-full mx-auto px-3 md:px-4 py-4 space-y-4 animate-fade-in overflow-hidden"></main>
        </div>
    `,document.getElementById("toggle-filters-btn").onclick=ps,document.getElementById("btn-apply-filters").onclick=()=>{xn(),ps()},document.querySelectorAll(".tab-btn").forEach(a=>{a.onclick=()=>{A.currentTab=a.dataset.tab,ms(),ho(),window.scrollTo({top:0,behavior:"smooth"})}}),ms()}function ps(){const e=document.getElementById("filters-container"),t=document.getElementById("toggle-filters-btn");A.isFilterOpen=!A.isFilterOpen,A.isFilterOpen?(e.classList.remove("hidden"),t.classList.add("bg-indigo-100","text-indigo-800")):(e.classList.add("hidden"),t.classList.remove("bg-indigo-100","text-indigo-800"))}function ms(){document.querySelectorAll(".tab-btn").forEach(e=>{const t=e.dataset.tab===A.currentTab;e.className=t?"tab-btn py-2 px-6 rounded-full text-xs md:text-sm font-bold bg-indigo-600 text-white shadow-md transform scale-105 transition-all whitespace-nowrap border-transparent":"tab-btn py-2 px-6 rounded-full text-xs md:text-sm font-medium text-gray-500 bg-white border-gray-200 hover:bg-gray-50 transition-all whitespace-nowrap"})}function Ot(e){if(!e)return"";const t=e.split("-");return`${t[2]}/${t[1]}`}async function xn(){A.startDate=document.getElementById("report-start").value,A.endDate=document.getElementById("report-end").value,A.selectedProfessional=document.getElementById("report-prof").value,A.selectedCostCenter=document.getElementById("report-cost").value,document.getElementById("date-range-display").textContent=`${Ot(A.startDate)} até ${Ot(A.endDate)}`,await xo()}function hn(e,t){const a=new Map;A.naturesList.forEach(s=>a.set(s.id,s.name));const r={revenues:{},expenses:{},totalRevenues:0,totalExpenses:0,netResult:0};return t.forEach(s=>{if(s.status==="paid"){const o=s.naturezaId?a.get(s.naturezaId)||"Outras Receitas":"Geral";r.revenues[o]||(r.revenues[o]=0),r.revenues[o]+=s.amount,r.totalRevenues+=s.amount}}),e.forEach(s=>{if(s.status==="paid"){const o=s.naturezaId?a.get(s.naturezaId)||"Outras Despesas":"Geral";r.expenses[o]||(r.expenses[o]=0),r.expenses[o]+=s.amount,r.totalExpenses+=s.amount}}),r.netResult=r.totalRevenues-r.totalExpenses,r}function vn(e,t){const a={},r=l=>{a[l]||(a[l]={realizedCredit:0,provisionedCredit:0,realizedDebit:0,provisionedDebit:0})};let s=new Date(A.startDate);const o=new Date(A.endDate);for(;s<=o;)r(s.toISOString().split("T")[0]),s.setDate(s.getDate()+1);t.forEach(l=>{const c=l.dueDate.split("T")[0];a[c]&&(l.status==="paid"?a[c].realizedCredit+=l.amount:a[c].provisionedCredit+=l.amount)}),e.forEach(l=>{const c=l.dueDate.split("T")[0];a[c]&&(l.status==="paid"?a[c].realizedDebit+=l.amount:a[c].provisionedDebit+=l.amount)});const i=Object.keys(a).sort(),n=[];let d=0;return i.forEach(l=>{const c=a[l],u=c.realizedCredit+c.provisionedCredit-(c.realizedDebit+c.provisionedDebit);d+=u,n.push(d)}),{labels:i,realizedCredit:i.map(l=>a[l].realizedCredit),provisionedCredit:i.map(l=>a[l].provisionedCredit),realizedDebit:i.map(l=>a[l].realizedDebit*-1),provisionedDebit:i.map(l=>a[l].provisionedDebit*-1),balance:n}}function yn(e){const t={};let a=new Date(A.startDate);const r=new Date(A.endDate);for(;a<=r;)t[a.toISOString().split("T")[0]]=0,a.setDate(a.getDate()+1);e.forEach(i=>{if(i.status==="paid"){const n=i.dueDate.split("T")[0];t.hasOwnProperty(n)&&(t[n]+=i.amount)}});const s=Object.keys(t).sort(),o=s.map(i=>t[i]);return{labels:s,data:o}}function wn(e){const t=e.length;if(t<2)return{trendData:Array(t).fill(e[0]||0),color:"#9ca3af"};let a=0,r=0,s=0,o=0;for(let c=0;c<t;c++)a+=c,r+=e[c],s+=c*e[c],o+=c*c;const i=(t*s-a*r)/(t*o-a*a),n=(r-i*a)/t,d=[];for(let c=0;c<t;c++)d.push(i*c+n);const l=i>=0?"#10b981":"#ef4444";return{trendData:d,color:l}}async function xo(){const e=document.getElementById("report-content");e.innerHTML='<div class="flex justify-center py-20 w-full"><div class="loader border-t-indigo-600"></div></div>';try{const t={startDate:A.startDate,endDate:A.endDate,establishmentId:p.establishmentId};A.selectedCostCenter!=="all"&&(t.costCenterId=A.selectedCostCenter);const[a,r]=await Promise.all([bo(t),fo(t)]);A.rawPayables=a.entries||[],A.rawReceivables=r.entries||[];const s=await zr(A.startDate,A.endDate,A.selectedProfessional,A.selectedCostCenter).catch(()=>({charts:{professionals:{labels:[],data:[]},salesMonthly:{labels:[],data:[]}}}));A.backendData=s,A.processedDRE=hn(A.rawPayables,A.rawReceivables),A.processedCashFlow=vn(A.rawPayables,A.rawReceivables),A.processedDailyRevenue=yn(A.rawReceivables);const o=new Date(A.startDate+"T00:00:00").toISOString(),i=new Date(A.endDate+"T23:59:59").toISOString(),n=A.selectedProfessional==="all"?null:A.selectedProfessional,d=await Aa(p.establishmentId,o,i,n).catch(()=>[]);A.appointmentsData=Array.isArray(d)?d:[],ho()}catch(t){console.error(t),e.innerHTML=`
            <div class="bg-red-50 border border-red-100 p-6 rounded-2xl text-center mx-4 w-full">
                <p class="font-bold text-gray-800">Não foi possível carregar</p>
                <p class="text-sm text-gray-500 mt-1">${h(t.message||"Verifique sua conexão.")}</p>
            </div>`}}function ho(){const e=document.getElementById("report-content");switch(A.currentTab){case"dashboards":kn(e);break;case"appointments":Sn(e);break;case"dre":$n(e);break}}function kn(e){const t=A.processedDRE,a=A.processedDailyRevenue,r=A.backendData.charts?.salesMonthly||{labels:[],data:[]},s=A.backendData.charts?.professionals||{labels:[],data:[]};e.innerHTML=`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 animate-slide-up w-full">
            <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group w-full">
                 <div class="flex items-center gap-2 mb-2">
                    <span class="p-2 bg-blue-50 text-blue-600 rounded-lg flex-shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" /></svg></span>
                    <p class="text-xs text-gray-500 font-bold uppercase tracking-wider truncate">Receita Realizada</p>
                </div>
                <p class="text-2xl font-black text-gray-800 tracking-tight truncate">R$ ${t.totalRevenues.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
            </div>
            <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden w-full">
                <div class="flex items-center gap-2 mb-2">
                    <span class="p-2 bg-red-50 text-red-600 rounded-lg flex-shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg></span>
                    <p class="text-xs text-gray-500 font-bold uppercase tracking-wider truncate">Despesa Realizada</p>
                </div>
                <p class="text-2xl font-black text-red-500 tracking-tight truncate">R$ ${t.totalExpenses.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
            </div>
            <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden w-full">
                <div class="flex items-center gap-2 mb-2">
                    <span class="p-2 bg-emerald-50 text-emerald-600 rounded-lg flex-shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                    <p class="text-xs text-gray-500 font-bold uppercase tracking-wider truncate">Saldo Realizado</p>
                </div>
                <p class="text-2xl font-black text-emerald-600 tracking-tight truncate">R$ ${t.netResult.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
            </div>
        </div>

        <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 mt-4 md:mt-6 animate-slide-up delay-100 w-full overflow-hidden">
            <div class="mb-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div>
                    <h3 class="text-base md:text-lg font-bold text-gray-800">Fluxo de Caixa</h3>
                    <p class="text-[10px] md:text-xs text-gray-400">Analise provisionado vs realizado.</p>
                </div>
                <div class="flex flex-wrap gap-2 md:gap-3">
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><input type="checkbox" checked class="chart-toggle w-4 h-4 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500" data-dataset="0"><span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Créd. Real.</span></label>
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><input type="checkbox" checked class="chart-toggle w-4 h-4 text-emerald-300 rounded border-gray-300 focus:ring-emerald-300" data-dataset="1"><span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Créd. Prov.</span></label>
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><input type="checkbox" checked class="chart-toggle w-4 h-4 text-red-500 rounded border-gray-300 focus:ring-red-500" data-dataset="2"><span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Déb. Real.</span></label>
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><input type="checkbox" checked class="chart-toggle w-4 h-4 text-red-300 rounded border-gray-300 focus:ring-red-300" data-dataset="3"><span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Déb. Prov.</span></label>
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><input type="checkbox" checked class="chart-toggle w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" data-dataset="4"><span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Saldo</span></label>
                </div>
            </div>
            <div class="relative w-full h-60 md:h-80"><canvas id="chart-cashflow-modern"></canvas></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6 animate-slide-up delay-200 w-full">
            <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 w-full overflow-hidden">
                <h3 class="font-bold text-gray-800 mb-4 text-xs md:text-sm uppercase tracking-wide truncate">Faturamento Diário (Realizado)</h3>
                <div class="relative h-56 md:h-64 w-full"><canvas id="chart-daily-revenue"></canvas></div>
            </div>
             <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 w-full overflow-hidden">
                <h3 class="font-bold text-gray-800 mb-4 text-xs md:text-sm uppercase tracking-wide truncate">Evolução Mensal (Realizada)</h3>
                <div class="relative h-56 md:h-64 w-full"><canvas id="chart-monthly"></canvas></div>
            </div>
            <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 w-full overflow-hidden lg:col-span-2">
                <h3 class="font-bold text-gray-800 mb-4 text-xs md:text-sm uppercase tracking-wide truncate">Faturamento por Profissional</h3>
                <div class="relative h-56 md:h-64 flex justify-center w-full"><canvas id="chart-profs"></canvas></div>
            </div>
        </div>
    `,En("chart-cashflow-modern",A.processedCashFlow),gs("chart-daily-revenue","Receita Diária",a.labels.map(o=>o.split("-").reverse().slice(0,2).join("/")),a.data),gs("chart-monthly","Receita Mensal",r.labels,r.data),Ln("chart-profs","doughnut","Total Vendas",s.labels,s.data,mn),document.querySelectorAll(".chart-toggle").forEach(o=>{o.addEventListener("change",i=>{const n=se["chart-cashflow-modern"];if(n){const d=parseInt(i.target.dataset.dataset);n.setDatasetVisibility(d,i.target.checked),n.update()}})})}function Sn(e){const t=A.appointmentsData,a=t.length;let r=0,s=0,o=0;const i={},n={};let d=new Date(A.startDate);const l=new Date(A.endDate);for(;d<=l;)i[d.toISOString().split("T")[0]]={active:0,cancelled:0},d.setDate(d.getDate()+1);t.forEach(b=>{const v=parseFloat(b.totalAmount||b.price||0),f=(b.status||"").toLowerCase();let E="";if(b.startTime){const k=b.startTime.toDate?b.startTime.toDate():new Date(b.startTime);isNaN(k)||(E=k.toISOString().split("T")[0])}const S=b.professionalName||"Sem Profissional";n[S]||(n[S]={name:S,count:0,value:0}),["cancelled","cancelado","no-show","cancelada"].includes(f)?(s++,E&&i[E]&&i[E].cancelled++):(["completed","finalized","paid"].includes(f)&&r++,o+=v,E&&i[E]&&i[E].active++,n[S].count++,n[S].value+=v)});const c=Object.keys(i).sort(),u=c.map(b=>i[b].active),m=c.map(b=>i[b].cancelled),x=Object.values(n).sort((b,v)=>v.value-b.value);e.innerHTML=`
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 animate-slide-up w-full">
            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1 w-full">
                <p class="text-[10px] text-gray-500 font-bold uppercase truncate">Agendamentos</p>
                <div class="flex items-end gap-2 mt-1">
                    <p class="text-2xl md:text-3xl font-black text-gray-800">${a}</p>
                </div>
            </div>
            
            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 w-full">
                <p class="text-[10px] text-gray-500 font-bold uppercase truncate">Concluídos</p>
                <p class="text-lg md:text-xl font-black text-indigo-600 mt-1">${a>0?Math.round(r/a*100):0}%</p>
            </div>
             <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 w-full">
                <p class="text-[10px] text-gray-500 font-bold uppercase truncate">Cancelados</p>
                <p class="text-lg md:text-xl font-black text-red-500 mt-1">${s}</p>
            </div>

            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1 w-full">
                <p class="text-[10px] text-gray-500 font-bold uppercase truncate">Valor Estimado</p>
                 <p class="text-xl md:text-2xl font-black text-gray-800 mt-1 truncate">R$ ${o.toLocaleString("pt-BR",{minimumFractionDigits:0})}</p>
            </div>
        </div>

        <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 mt-4 animate-slide-up delay-100 w-full overflow-hidden">
            <div class="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 class="text-base md:text-lg font-bold text-gray-800 truncate">Volume Diário</h3>
                
                <div class="flex flex-wrap gap-2">
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                        <input type="checkbox" checked class="app-chart-toggle w-4 h-4 text-indigo-500 rounded border-gray-300 focus:ring-indigo-500" data-dataset="0">
                        <span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Realizados</span>
                    </label>
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                        <input type="checkbox" checked class="app-chart-toggle w-4 h-4 text-red-500 rounded border-gray-300 focus:ring-red-500" data-dataset="1">
                        <span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Cancelados</span>
                    </label>
                </div>
            </div>
            
            <div class="relative w-full h-56 md:h-64">
                <canvas id="chart-appointments-daily"></canvas>
            </div>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mt-4 animate-slide-up delay-200 w-full">
            <div class="p-4 md:p-5 border-b border-gray-50 bg-gray-50/50">
                <h3 class="text-base md:text-lg font-bold text-gray-800 truncate">Ranking Profissional</h3>
            </div>
            <div class="overflow-x-auto no-scrollbar w-full">
                <table class="w-full text-xs md:text-sm min-w-full">
                    <tbody class="divide-y divide-gray-100">
                        ${x.map((b,v)=>{const f=x[0]?.value||1,E=b.value/f*100;return`
                            <tr class="group">
                                <td class="p-3 md:p-4 w-8 md:w-12 text-center font-bold text-gray-300">${v+1}</td>
                                <td class="p-3 md:p-4 pl-0 min-w-[100px]">
                                    <p class="font-bold text-gray-800 truncate max-w-[120px] md:max-w-xs">${h(b.name)}</p>
                                    <div class="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                        <div class="h-full bg-indigo-500 rounded-full" style="width: ${E}%"></div>
                                    </div>
                                </td>
                                <td class="p-3 md:p-4 text-center">
                                    <span class="bg-indigo-50 text-indigo-700 px-2 md:px-2.5 py-1 rounded-lg font-bold text-xs">${b.count}</span>
                                </td>
                                <td class="p-3 md:p-4 text-right font-bold text-gray-700 whitespace-nowrap">R$ ${b.value.toLocaleString("pt-BR",{minimumFractionDigits:0})}</td>
                            </tr>
                        `}).join("")}
                        ${x.length===0?'<tr><td colspan="4" class="p-8 text-center text-gray-400">Sem dados.</td></tr>':""}
                    </tbody>
                </table>
            </div>
        </div>
    `,In("chart-appointments-daily",c,u,m),document.querySelectorAll(".app-chart-toggle").forEach(b=>{b.addEventListener("change",v=>{const f=se["chart-appointments-daily"];if(f){const E=parseInt(v.target.dataset.dataset);f.setDatasetVisibility(E,v.target.checked),f.update()}})})}function $n(e){const t=A.processedDRE;if(!t)return;const a=t.totalRevenues,r=(n,d,l,c=!1)=>{const u=a>0?d/a*100:0,m=c?"- ":"";return`
        <div class="flex items-center justify-between py-2 md:py-3 px-3 md:px-4 border-b border-dashed border-gray-100 last:border-0 w-full">
            <div class="flex-1 pr-2 md:pr-4 overflow-hidden min-w-0">
                <p class="text-[10px] md:text-xs font-semibold text-gray-600 truncate">${h(n)}</p>
                <div class="w-full h-1 bg-gray-100 rounded-full mt-1.5 overflow-hidden max-w-[80px] md:max-w-[100px]">
                    <div class="h-full ${l.replace("text-","bg-")} opacity-40" style="width: ${Math.min(u,100)}%"></div>
                </div>
            </div>
            <div class="text-right flex-shrink-0">
                <p class="text-xs md:text-sm font-bold ${l}">${m}R$ ${d.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
                <p class="text-[9px] md:text-[10px] text-gray-400 font-medium">${u.toFixed(1)}%</p>
            </div>
        </div>`},s=Object.entries(t.revenues).map(([n,d])=>r(n,d,"text-emerald-600",!1)).join(""),o=Object.entries(t.expenses).map(([n,d])=>r(n,d,"text-red-500",!0)).join(""),i=t.netResult>=0?"Lucro Real":"Prejuízo Real";e.innerHTML=`
        <div class="max-w-xl mx-auto animate-slide-up pb-10 w-full">
            <div class="bg-gray-900 text-white rounded-3xl p-5 md:p-6 shadow-xl relative overflow-hidden mb-4 md:mb-6 w-full">
                <div class="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <svg class="w-32 h-32 md:w-48 md:h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <p class="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest mb-1 truncate">Resultado Líquido (Realizado)</p>
                <h2 class="text-3xl md:text-4xl font-black mb-2 truncate">R$ ${t.netResult.toLocaleString("pt-BR",{minimumFractionDigits:2})}</h2>
                <span class="inline-block px-2 py-1 md:px-3 md:py-1 bg-white/20 rounded-lg text-[10px] md:text-xs font-bold backdrop-blur-sm whitespace-nowrap">
                    ${i}: ${(a>0?t.netResult/a*100:0).toFixed(1)}% de Margem
                </span>
            </div>

            <div class="space-y-3 md:space-y-4 w-full">
                <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden w-full">
                    <div class="bg-gray-50/50 p-3 border-b border-gray-100 flex justify-between items-center">
                        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider pl-2 truncate">Receitas Baixadas</h3>
                        <span class="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex-shrink-0 whitespace-nowrap">Total: R$ ${t.totalRevenues.toLocaleString("pt-BR",{minimumFractionDigits:0})}</span>
                    </div>
                    <div>${s||'<p class="text-xs text-gray-400 p-4 text-center">Nenhuma receita baixada.</p>'}</div>
                </div>

                <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden w-full">
                    <div class="bg-gray-50/50 p-3 border-b border-gray-100 flex justify-between items-center">
                        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider pl-2 truncate">Despesas Baixadas</h3>
                        <span class="text-[10px] md:text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md flex-shrink-0 whitespace-nowrap">Total: R$ ${t.totalExpenses.toLocaleString("pt-BR",{minimumFractionDigits:0})}</span>
                    </div>
                    <div>${o||'<p class="text-xs text-gray-400 p-4 text-center">Nenhuma despesa baixada.</p>'}</div>
                </div>
            </div>
        </div>
    `}function En(e,t){const a=document.getElementById(e);if(!a)return;const r=a.getContext("2d");se[e]&&se[e].destroy();const s=r.createLinearGradient(0,0,0,400);s.addColorStop(0,"rgba(59, 130, 246, 0.4)"),s.addColorStop(1,"rgba(59, 130, 246, 0.0)");const o=t.labels.map(i=>i.split("-").reverse().slice(0,2).join("/"));se[e]=new Chart(r,{type:"bar",data:{labels:o,datasets:[{label:"Créd. Realizado",data:t.realizedCredit,backgroundColor:Et.creditRealized,borderRadius:3,barPercentage:.7,order:1},{label:"Créd. Provisionado",data:t.provisionedCredit,backgroundColor:Et.creditProvisioned,borderRadius:3,borderWidth:1,borderColor:"#fff",borderDash:[5,5],barPercentage:.7,order:2},{label:"Déb. Realizado",data:t.realizedDebit,backgroundColor:Et.debitRealized,borderRadius:3,barPercentage:.7,order:3},{label:"Déb. Provisionado",data:t.provisionedDebit,backgroundColor:Et.debitProvisioned,borderRadius:3,borderWidth:1,borderColor:"#fff",borderDash:[5,5],barPercentage:.7,order:4},{label:"Saldo Acumulado",data:t.balance,type:"line",borderColor:"#3b82f6",backgroundColor:s,borderWidth:3,pointRadius:3,pointBackgroundColor:"#fff",pointBorderColor:"#3b82f6",pointBorderWidth:2,pointHoverRadius:8,hitRadius:30,fill:!0,tension:.4,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{backgroundColor:"#fff",titleColor:"#111",bodyColor:"#444",borderColor:"#eee",borderWidth:1,padding:10,callbacks:{label:function(i){let n=i.dataset.label||"";return n&&(n+=": "),i.parsed.y!==null&&(n+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(Math.abs(i.parsed.y))),n}}}},scales:{x:{stacked:!0,grid:{display:!1},ticks:{font:{size:10}}},y:{stacked:!0,display:!0,grid:{color:"#f3f4f6",borderDash:[4,4]},ticks:{callback:i=>new Intl.NumberFormat("pt-BR",{notation:"compact"}).format(Math.abs(i)),font:{size:10}}}}}})}function In(e,t,a,r){const s=document.getElementById(e);if(!s)return;const o=s.getContext("2d");se[e]&&se[e].destroy();const i=t.map(n=>n.split("-").reverse().slice(0,2).join("/"));se[e]=new Chart(o,{type:"bar",data:{labels:i,datasets:[{label:"Realizados",data:a,backgroundColor:"#4f46e5",borderRadius:3,barPercentage:.6,order:1},{label:"Cancelados",data:r,backgroundColor:"#ef4444",borderRadius:3,barPercentage:.6,order:2}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{backgroundColor:"#fff",titleColor:"#111",bodyColor:"#444",borderColor:"#eee",borderWidth:1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10}}},y:{beginAtZero:!0,grid:{color:"#f3f4f6"},ticks:{stepSize:1,font:{size:10}}}}}})}function gs(e,t,a,r){const s=document.getElementById(e);if(!s)return;const o=s.getContext("2d");se[e]&&se[e].destroy();const{trendData:i,color:n}=wn(r),d=i.map((u,m)=>m===i.length-1?"triangle":"circle"),l=i.map((u,m)=>m===i.length-1?6:3),c=i.map((u,m)=>m===i.length-1&&n==="#ef4444"?180:0);se[e]=new Chart(o,{type:"bar",data:{labels:a,datasets:[{label:t,data:r,backgroundColor:"#4f46e5",borderRadius:4,order:1},{label:"Tendência",data:i,type:"line",borderColor:n,borderWidth:3,pointStyle:d,pointRadius:l,pointRotation:c,pointBackgroundColor:"#fff",pointBorderColor:n,pointBorderWidth:2,pointHoverRadius:8,hitRadius:30,fill:!1,tension:0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:9}}},y:{grid:{color:"#f3f4f6"},beginAtZero:!0,ticks:{font:{size:9},callback:u=>new Intl.NumberFormat("pt-BR",{notation:"compact"}).format(u)}}}}})}function Ln(e,t,a,r,s,o){const i=document.getElementById(e);if(!i)return;const n=i.getContext("2d");se[e]&&se[e].destroy(),new Chart(n,{type:t,data:{labels:r,datasets:[{label:a,data:s,backgroundColor:o,borderColor:Array.isArray(o)?"#fff":o,borderWidth:1,tension:.3,fill:t==="line"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:t==="doughnut",position:"right",labels:{usePointStyle:!0,boxWidth:8,font:{size:10}}}},scales:{}}})}const ia=(e,t="products")=>I(`/api/${t}/categories/${e}`),vo=(e,t="products")=>I(`/api/${t}/categories`,{method:"POST",body:JSON.stringify(e)}),yo=(e,t="products")=>I(`/api/${t}/categories/${e}`,{method:"DELETE"}),Cn="audit_logs",me=async(e,t,a,r,s,o=null)=>{try{if(!t)return;await Os(Qt(be,Cn),{establishmentId:e,userId:t.uid,userName:t.name||t.email||"Utilizador",module:a,action:r,description:s,details:o,timestamp:new Date})}catch(i){console.error("Falha silenciosa ao registar log:",i)}},Se=document.getElementById("content");let xe=null,rt="services",Ie="all",it=[];function Qe(){const e=ne.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}async function Dn(e){e.preventDefault();const t=e.target.closest("#categoryForm"),a=t.querySelector("#categoryName"),r=a.value;if(!r)return;const s=t.querySelector('button[type="submit"]');s.disabled=!0,s.textContent="...";try{const o=it.reduce((i,n)=>(i.push(n.id),n.branches&&n.branches.forEach(d=>i.push(d.id)),i),[]);o.length===0&&o.push(p.establishmentId),await vo({establishmentId:p.establishmentId,name:r,accessibleIn:o},"services"),me(p.establishmentId,Qe(),"Categorias (Serviços)","Criou",`Criou categoria: ${r}`),a.value="",g("Sucesso","Categoria criada!","success"),await Va(),await yt()}catch(o){g("Erro",`Não foi possível criar a categoria: ${o.message}`,"error")}finally{s.disabled=!1,s.textContent="Adicionar"}}async function Tn(e){if(await W("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await yo(e,"services"),me(p.establishmentId,Qe(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${e})`),g("Sucesso","Categoria apagada.","success"),await Va(),await yt()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function Va(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await ia(p.establishmentId,"services");p.serviceCategories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${h(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function Bn(){re({title:"Gerir Categorias de Serviços",contentHTML:`
        <div class="space-y-4">
            <div class="mb-4 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <p class="text-xs text-indigo-800 mb-3 font-medium">As categorias criadas aqui ficarão disponíveis para toda a rede.</p>
                <form id="categoryForm" class="flex flex-col sm:flex-row gap-4 sm:items-end">
                    <div class="flex-1 w-full">
                        <label for="categoryName" class="block text-sm font-medium text-gray-700">Nova Categoria</label>
                        <input type="text" id="categoryName" placeholder="Nome da categoria" required class="mt-1 w-full p-2 border rounded-md">
                    </div>
                    <button type="submit" class="w-full sm:w-auto py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Adicionar</button>
                </form>
            </div>
            <div id="categoryList" class="space-y-2 max-h-64 overflow-y-auto p-2 border rounded-md"></div>
        </div>
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",Dn),t.addEventListener("click",r=>{const s=r.target.closest('button[data-action="delete-category"]');s&&(r.preventDefault(),Tn(s.dataset.id))}))}Va()}function Pn(e=[]){if(!it||it.length===0)return`
            <input type="hidden" name="accessibleIn" value="${p.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                Disponível apenas nesta unidade. Crie mais lojas para distribuir serviços.
            </div>`;let t='<div class="space-y-1 mt-2 max-h-48 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30">';return it.forEach(a=>{const r=e.includes(a.id)||e.length===0&&a.id===p.establishmentId;t+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${r?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${h(a.name)} (Matriz)</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(s=>{const o=e.includes(s.id)||e.length===0&&s.id===p.establishmentId;t+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${s.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${h(s.name)}</span>
                    </label>
                `})}),t+="</div>",t}async function Mn(e){e.preventDefault();const t=e.target.closest("#serviceModal"),a=t.querySelector("#serviceId").value,r={},s=t.querySelector('input[name="commissionType"]:checked').value;s==="custom"&&t.querySelectorAll(".professional-commission-row").forEach(d=>{const l=d.dataset.profId;if(d.querySelector('input[type="checkbox"]').checked){const u=parseFloat(d.querySelector('input[type="number"]').value);r[l]=isNaN(u)?0:u}});const o=Array.from(t.querySelectorAll('input[name="accessibleIn"]:checked')).map(d=>d.value),i=o.length>0?o:[p.establishmentId],n={establishmentId:p.establishmentId,accessibleIn:i,name:t.querySelector("#serviceName").value.trim(),price:parseFloat(t.querySelector("#servicePrice").value),duration:parseInt(t.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(t.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:t.querySelector("#serviceCategory").value||null,commissionRate:parseFloat(t.querySelector("#serviceCommissionRate").value)||0,active:t.querySelector("#serviceStatus").value==="true",photo:t.querySelector("#servicePhotoBase64").value,notes:t.querySelector("#serviceNotes").value,commissionType:s,professionalCommissions:r};try{a?(await Kr(a,n),me(p.establishmentId,Qe(),"Serviços","Editou",`Editou o serviço: ${n.name}`)):(await Zr(n),me(p.establishmentId,Qe(),"Serviços","Criou",`Criou novo serviço: ${n.name}`)),document.getElementById("serviceModal").style.display="none",g("Sucesso",`Serviço ${a?"atualizado":"adicionado"} com sucesso!`,"success"),await yt()}catch(d){g("Erro",d.message,"error")}}function bs(e=null){const t=document.getElementById("serviceModal"),a=p.serviceCategories||[],r=e?.duration||0,s=e?.bufferTime||0,o=h(e?.name||""),i=h(e?.notes||""),n=e?o:"Novo Serviço",d=a.map(T=>`<option value="${T.id}" ${e?.categoryId===T.id?"selected":""}>${h(T.name)}</option>`).join("");t.innerHTML=`
    <div class="modal-content max-w-3xl overflow-y-auto max-h-[85vh] my-auto">
        <form id="serviceForm">
            <input type="hidden" id="serviceId" value="${e?.id||""}">
            <input type="hidden" id="servicePhotoBase64" value="${e?.photo||""}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="serviceModalTitle" class="text-2xl font-bold text-gray-800">${n}</h2>
                <button type="button" data-action="close-modal" data-target="serviceModal" class="text-2xl font-bold hover:text-red-500">&times;</button>
            </div>

            <div class="border-b border-gray-200 mb-6">
                <nav class="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    <button type="button" data-tab="dados" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">Dados do serviço</button>
                    <button type="button" data-tab="comissoes" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Personalizar comissões</button>
                </nav>
            </div>

            <div id="tab-content-dados" class="tab-content space-y-4">
                <div class="space-y-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Foto do Serviço</label>
                    <div class="mt-1 flex flex-col items-center">
                        <img id="servicePhotoPreview" src="${e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto"}" alt="Foto" class="w-32 h-32 rounded-lg object-cover mb-3 border-4 border-gray-200 bg-gray-50">
                        <input type="file" id="servicePhotoInput" class="hidden" accept="image/*">
                        <button type="button" id="servicePhotoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar Imagem</button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2">
                        <label for="serviceName" class="block text-sm font-medium text-gray-700">Nome do serviço</label>
                        <input type="text" id="serviceName" value="${o}" class="mt-1 w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label for="servicePrice" class="block text-sm font-medium text-gray-700">Preço (a partir de:)</label>
                        <input type="number" id="servicePrice" step="0.01" value="${e?.price!==void 0?e.price:""}" class="mt-1 w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label for="serviceCategory" class="block text-sm font-medium text-gray-700">Categoria</label>
                        <select id="serviceCategory" class="mt-1 w-full p-2 border rounded-md bg-white">
                            <option value="">Sem Categoria</option>
                            ${d}
                        </select>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4 md:col-span-2">
                        <div>
                            <label for="serviceDurationMinutes" class="block text-sm font-medium text-gray-700">Duração (minutos)</label>
                            <input type="number" id="serviceDurationMinutes" min="0" value="${r}" class="mt-1 w-full p-2 border rounded-md" required>
                        </div>
                        <div>
                            <label for="serviceBufferTimeMinutes" class="block text-sm font-medium text-gray-700">Minutos Extras (Pausa)</label>
                            <input type="number" id="serviceBufferTimeMinutes" min="0" value="${s}" class="mt-1 w-full p-2 border rounded-md">
                        </div>
                    </div>
                </div>

                <div class="pt-4 border-t border-gray-100 mt-2">
                    <label class="block text-sm font-bold text-indigo-900 mb-1">Distribuição na Rede</label>
                    <p class="text-xs text-gray-500 mb-2">Marque as unidades em que este serviço será realizado.</p>
                    ${Pn(e?.accessibleIn||[])}
                </div>

                <div class="pt-4 border-t border-gray-100 mt-2">
                    <label for="serviceNotes" class="block text-sm font-medium text-gray-700">Observações Internas</label>
                    <textarea id="serviceNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${i}</textarea>
                </div>
                <div>
                    <label for="serviceStatus" class="block text-sm font-medium text-gray-700">Status</label>
                    <select id="serviceStatus" class="mt-1 w-full p-2 border rounded-md bg-white">
                        <option value="true" ${e?.active!==!1?"selected":""}>Ativo (Visível na Agenda)</option>
                        <option value="false" ${e?.active===!1?"selected":""}>Inativo (Oculto)</option>
                    </select>
                </div>
            </div>
            
            <div id="tab-content-comissoes" class="tab-content hidden space-y-6">
                <div>
                    <label class="block text-lg font-medium text-gray-800">Tipo de comissão</label>
                    <p class="text-sm text-gray-500">Qual o tipo de comissão que é paga neste serviço?</p>
                    <div class="mt-2 space-y-2">
                        <label class="flex items-center p-3 border rounded-md has-[:checked]:bg-indigo-50 cursor-pointer">
                            <input type="radio" name="commissionType" value="default" class="h-4 w-4 text-indigo-600" ${e?.commissionType!=="custom"?"checked":""}>
                            <span class="ml-3 text-sm text-gray-700 font-medium">Padrão para todos os profissionais</span>
                        </label>
                        <label class="flex items-center p-3 border rounded-md has-[:checked]:bg-indigo-50 cursor-pointer">
                            <input type="radio" name="commissionType" value="custom" class="h-4 w-4 text-indigo-600" ${e?.commissionType==="custom"?"checked":""}>
                            <span class="ml-3 text-sm text-gray-700 font-medium">Diferente para cada profissional</span>
                        </label>
                    </div>
                </div>
                <div id="defaultCommissionRateContainer">
                    <label for="serviceCommissionRate" class="block text-sm font-medium text-gray-700">Comissão Padrão (%)</label>
                    <input type="number" id="serviceCommissionRate" value="${e?.commissionRate||0}" class="mt-1 w-32 p-2 border rounded-md">
                </div>
                <div id="professionalCommissionsContainer" class="hidden">
                     <label class="block text-lg font-medium text-gray-800">Comissão por Profissional</label>
                     <p class="text-sm text-gray-500 mb-2">Selecione os profissionais e informe a comissão de cada um.</p>
                     <div class="border rounded-lg overflow-hidden">
                         <div class="grid grid-cols-[1fr_auto] items-center p-2 bg-gray-50 font-semibold text-xs text-gray-600">
                             <span>Profissional</span>
                             <span class="text-center">Comissão</span>
                         </div>
                         <div id="professionalCommissionsList" class="space-y-1 max-h-48 overflow-y-auto p-2"></div>
                     </div>
                </div>
            </div>

            <div class="mt-6 pt-6 border-t flex flex-col-reverse sm:flex-row justify-between items-center gap-3">
                <button type="button" data-action="delete-service" data-id="${e?.id||""}" class="w-full sm:w-auto text-red-600 hover:text-red-800 font-medium ${e?"":"hidden"}">Excluir Serviço</button>
                <div class="flex flex-col-reverse sm:flex-row w-full sm:w-auto gap-3">
                    <button type="button" data-action="close-modal" data-target="serviceModal" class="w-full sm:w-auto py-2 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button type="submit" class="w-full sm:w-auto py-2 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">Salvar</button>
                </div>
            </div>
        </form>
    </div>`,t.style.display="flex",t.addEventListener("click",async T=>{const L=T.target.closest("button[data-action]");if(!L)return;const R=L.dataset.action,H=L.dataset.id;if(R==="close-modal"&&(t.style.display="none"),R==="delete-service"){if(!H)return;if(t.style.display="none",await W("Apagar Serviço","Tem a certeza que deseja apagar este serviço?"))try{const D=p.services.find(N=>N.id===H)?.name||"Desconhecido";await ei(H),me(p.establishmentId,Qe(),"Serviços","Excluiu",`Excluiu o serviço: ${D}`),g("Sucesso","Serviço apagado com sucesso!","success"),await yt()}catch(D){g("Erro",`Não foi possível apagar o serviço: ${D.message}`,"error")}else t.style.display="flex"}});const l=t.querySelectorAll(".tab-btn"),c=t.querySelectorAll(".tab-content");l.forEach(T=>{T.addEventListener("click",()=>{l.forEach(L=>{L.classList.remove("border-indigo-500","text-indigo-600"),L.classList.add("border-transparent","text-gray-500")}),T.classList.add("border-indigo-500","text-indigo-600"),T.classList.remove("border-transparent","text-gray-500"),c.forEach(L=>L.classList.add("hidden")),document.getElementById(`tab-content-${T.dataset.tab}`).classList.remove("hidden")})});const u=t.querySelectorAll('input[name="commissionType"]'),m=document.getElementById("defaultCommissionRateContainer"),x=document.getElementById("professionalCommissionsContainer");function b(){const T=t.querySelector('input[name="commissionType"]:checked').value;m&&(m.style.display=T==="default"?"block":"none"),x&&(x.style.display=T==="custom"?"block":"none")}u.forEach(T=>T.addEventListener("change",b));const v=document.getElementById("professionalCommissionsList");v&&(v.innerHTML=(p.professionals||[]).map(T=>{const L=e?.professionalCommissions?.[T.id]!==void 0,R=e?.professionalCommissions?.[T.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-md ${L?"bg-blue-50":""}" data-prof-id="${T.id}">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" ${L?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600">
                        <img src="${T.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${h(T.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover">
                        <span class="text-sm font-medium">${h(T.name)}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${R}" class="w-20 p-1 border rounded-md text-sm text-center" ${L?"":"disabled"}>
                        <span class="text-sm font-semibold">%</span>
                    </div>
                </div>
            `}).join(""),v.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.addEventListener("change",L=>{const R=L.target.closest(".professional-commission-row");R.querySelector('input[type="number"]').disabled=!L.target.checked,R.classList.toggle("bg-blue-50",L.target.checked)})})),b();const f=t.querySelector("#serviceForm"),E=t.querySelector("#servicePhotoInput"),S=t.querySelector("#servicePhotoPreview"),k=t.querySelector("#servicePhotoBase64");t.querySelector("#servicePhotoButton").addEventListener("click",()=>E.click()),E.onchange=async()=>{const T=E.files[0];if(T){S.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const L=await Ks(T,800,800,.8);if(L.length*3/4>1e3*1024)throw new Error("Imagem muito grande.");S.src=L,k.value=L}catch(L){g("Erro de Imagem",L.message,"error"),S.src=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",k.value=e?.photo||""}}},f.addEventListener("submit",Mn)}function nt(){const e=document.getElementById("servicesList");if(!e)return;const t=document.getElementById("serviceSearchInput")?.value.toLowerCase()||"",a=document.getElementById("serviceCategoryFilter")?.value||"all",r=new Map((p.serviceCategories||[]).map(o=>[o.id,o.name]));let s=(p.services||[]).filter(Boolean);if(Ie!=="all"){const o=Ie==="active";s=s.filter(i=>i.active!==!1===o)}s=s.filter(o=>{const i=o.name.toLowerCase().includes(t),n=a==="all"||o.categoryId===a;return i&&n}),e.innerHTML="",s.length>0?s.forEach(o=>{const i=document.createElement("div"),n=JSON.stringify(o).replace(/'/g,"&apos;");i.className=`service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-indigo-300 border border-transparent ${o.active!==!1?"opacity-100":"opacity-60 bg-gray-100"} sm:flex-col`,i.dataset.action="edit-service",i.dataset.service=n;const d=h(o.name),l=h(r.get(o.categoryId)||"Sem Categoria"),c=o.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(o.name.charAt(0))}`;i.innerHTML=`
                <img src="${c}" alt="Imagem" class="w-24 h-24 object-cover flex-shrink-0 sm:w-full sm:h-32">
                <div class="p-3 flex flex-col flex-grow justify-between w-full">
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="text-sm font-bold text-gray-900 flex-1 text-left truncate pr-2">${d}</h3>
                        <label class="flex items-center cursor-pointer ml-2" data-action-stop-propagation="true">
                            <div class="relative">
                                <input type="checkbox" data-action="toggle-service-status" data-id="${o.id}" class="sr-only" ${o.active!==!1?"checked":""}>
                                <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                            </div>
                        </label>
                    </div>
                    <p class="text-lg font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${o.price.toFixed(2)}</p>
                    <div>
                        <div class="hidden sm:block">
                            <p class="text-xs text-gray-500 text-left mb-1 truncate">${l}</p>
                            <p class="text-xs text-gray-500 text-left">${o.duration} min</p>
                        </div>
                        <div class="flex justify-between items-center sm:hidden mt-2">
                            <p class="text-lg font-bold text-indigo-600 text-left">R$ ${o.price.toFixed(2)}</p>
                            <p class="text-xs text-gray-500 text-right">${o.duration} min</p>
                        </div>
                    </div>
                </div>`,e.appendChild(i)}):e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>'}function _a(){const e={active:0,inactive:0,total:0},t=(p.services||[]).filter(Boolean);t.forEach(i=>{i.active===!1?e.inactive++:e.active++}),e.total=t.length;const a=document.getElementById("indicator-total"),r=document.getElementById("indicator-active"),s=document.getElementById("indicator-inactive"),o=document.getElementById("indicator-popular");a&&(a.textContent=e.total),r&&(r.textContent=e.active),s&&(s.textContent=e.inactive),o&&(p.mostPopularService&&p.mostPopularService.name!=="N/A"?(o.textContent=h(p.mostPopularService.name),o.closest(".indicator-card").title=`${p.mostPopularService.name} (${p.mostPopularService.count} agendamentos)`):o.textContent="Nenhum agendado")}function An(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="flex flex-col sm:flex-row gap-4 mb-6">
            <input type="search" id="serviceSearchInput" placeholder="Pesquisar por nome..." class="w-full sm:w-64 p-2.5 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-indigo-500">
            <select id="serviceCategoryFilter" class="w-full sm:w-auto p-2.5 border border-gray-300 rounded-lg bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="all">Todas as categorias</option>
            </select>
        </div>
        
        <div class="grid grid-cols-2 gap-3 mb-6 lg:grid-cols-4 lg:gap-4">
            <div data-action="filter-service" data-filter-type="total" class="indicator-card bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all hover:shadow-md ring-2 ring-indigo-500">
                <div class="bg-blue-100 p-2 rounded-lg"><i class="bi bi-ui-radios-grid text-xl text-blue-600"></i></div>
                <div><p class="text-xs text-gray-500 uppercase tracking-wider font-bold">Total</p><p id="indicator-total" class="text-2xl font-bold text-gray-800">0</p></div>
            </div>
            <div data-action="filter-service" data-filter-type="active" class="indicator-card bg-green-50 border border-green-100 p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all hover:shadow-md">
                <div class="bg-green-100 p-2 rounded-lg"><i class="bi bi-check-circle text-xl text-green-600"></i></div>
                <div><p class="text-xs text-gray-500 uppercase tracking-wider font-bold">Ativos</p><p id="indicator-active" class="text-2xl font-bold text-gray-800">0</p></div>
            </div>
            <div data-action="filter-service" data-filter-type="inactive" class="indicator-card bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all hover:shadow-md">
                <div class="bg-red-100 p-2 rounded-lg"><i class="bi bi-x-circle text-xl text-red-600"></i></div>
                <div><p class="text-xs text-gray-500 uppercase tracking-wider font-bold">Inativos</p><p id="indicator-inactive" class="text-2xl font-bold text-gray-800">0</p></div>
            </div>
            <div id="popular-card" data-action="filter-service" data-filter-type="popular" class="indicator-card bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-center gap-4 transition-all opacity-80">
                <div class="bg-amber-100 p-2 rounded-lg"><i class="bi bi-star-fill text-xl text-amber-600"></i></div>
                <div class="overflow-hidden w-full"><p class="text-xs text-gray-500 uppercase tracking-wider font-bold">Favorito</p><p id="indicator-popular" class="text-lg font-bold text-gray-800 truncate">...</p></div>
            </div>
        </div>

        <div id="servicesList" class="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4">
            <div class="loader col-span-full mx-auto my-10"></div>
        </div>
        
        <button data-action="new-service" class="fixed z-30 bottom-24 right-6 sm:bottom-8 sm:right-8 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110">
            <i class="bi bi-plus-lg text-2xl"></i>
        </button>
    `;const t=document.getElementById("serviceCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(p.serviceCategories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${h(a.name)}</option>`)),_a(),nt()}function qn(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="p-12 text-center bg-gray-50 border border-dashed border-gray-300 rounded-xl max-w-lg mx-auto mt-10">
            <i class="bi bi-bar-chart-line text-4xl text-indigo-300 mb-4 block"></i>
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2 text-sm">Acompanhe métricas de conversão e lucratividade por serviço e unidade. (Em breve)</p>
        </div>
    `}async function yt(){const e=document.getElementById("services-content-container");if(e){const t=e.querySelector(".loader");t&&(t.style.display="block")}try{const[t,a,r,s,o]=await Promise.all([Be(p.establishmentId),le(p.establishmentId),ia(p.establishmentId,"services"),ai(p.establishmentId),Te()]);p.services=(t||[]).filter(Boolean),p.professionals=(a||[]).filter(Boolean),p.serviceCategories=(r||[]).filter(Boolean),p.mostPopularService=s||{name:"N/A",count:0},it=o?.matrizes||[],p.services.forEach(i=>{i.active===void 0&&(i.active=!0)}),wo(rt)}catch(t){e&&(e.innerHTML='<p class="text-red-500 text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>'),g("Erro",`Não foi possível carregar os dados: ${t.message}`,"error")}}function wo(e){if(document.getElementById("services-content-container")){if(rt===e&&document.getElementById("services-content-container").children.length>1){rt==="services"&&(_a(),nt());return}rt=e,Ie="all",document.querySelectorAll("#services-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="services"?An():e==="reports"&&qn()}}function Rn(){xe&&(Se.removeEventListener("click",xe),Se.removeEventListener("input",xe),Se.removeEventListener("change",xe)),xe=async e=>{const t=e.target;if(t.closest('[data-action="toggle-service-status"]')){e.stopPropagation();const s=t.closest('[data-action="toggle-service-status"]'),o=s.dataset.id,i=s.checked;try{await ti(o,i);const n=p.services.findIndex(d=>d.id===o);n>-1&&(p.services[n].active=i),me(p.establishmentId,Qe(),"Serviços","Atualizou Status",`Alterou status do serviço (ID: ${o}) para ${i?"Ativo":"Inativo"}`),nt(),_a()}catch(n){g("Erro",`Não foi possível atualizar o status: ${n.message}`,"error"),s.checked=!i}return}const a=t.closest("button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]");if(t.id==="serviceSearchInput"||t.id==="serviceCategoryFilter"){nt();return}if(!a)return;if(a.hasAttribute("data-view")){wo(a.dataset.view);return}switch(a.dataset.action){case"new-service":bs();break;case"edit-service":const s=JSON.parse(a.dataset.service);bs(s);break;case"manage-categories":Bn();break;case"filter-service":const o=a.dataset.filterType;if(o==="popular")return;Ie=o==="total"?"all":o,document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(i=>{const n=i.dataset.filterType,l=n===Ie||n==="total"&&Ie==="all";i.classList.toggle("ring-2",l),i.classList.toggle("ring-indigo-500",l),i.classList.toggle("shadow-md",l),i.classList.toggle("bg-white",!l)}),nt();break}},Se.addEventListener("click",xe),Se.addEventListener("input",xe),Se.addEventListener("change",xe)}async function Nn(){Se.innerHTML=`
        <div class="max-w-7xl mx-auto w-full pb-20">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div id="services-tabs" class="border-b border-gray-200 bg-gray-50/50">
                    <nav class="-mb-px flex space-x-8 px-6 overflow-x-auto" aria-label="Tabs">
                        <button data-view="services" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm border-indigo-500 text-indigo-600 transition-colors">
                            <i class="bi bi-scissors mr-2"></i> Meus Serviços
                        </button>
                        <button data-action="manage-categories" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-colors">
                            <i class="bi bi-tags mr-2"></i> Categorias
                        </button>
                        <button data-view="reports" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-colors">
                            <i class="bi bi-graph-up mr-2"></i> Relatórios
                        </button>
                    </nav>
                </div>
                
                <div id="services-content-container" class="p-6 bg-white min-h-[500px] relative">
                    <div class="loader mx-auto mt-20"></div>
                </div>
            </div>
        </div>`,Rn(),rt="services",Ie="all",await yt()}const na="suppliers",Ua=async e=>{try{const t=Vs(Qt(be,na),_s("establishmentId","==",e)),a=await Xo(t),r=[];return a.forEach(s=>{r.push({id:s.id,...s.data()})}),r}catch(t){throw console.error("Erro ao buscar fornecedores:",t),t}},jn=async e=>{try{return{id:(await Os(Qt(be,na),e)).id,...e}}catch(t){throw console.error("Erro ao criar fornecedor:",t),t}},Fn=async(e,t)=>{try{const a=vt(be,na,e);return await Ma(a,t),{id:e,...t}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},Hn=async e=>{try{const t=vt(be,na,e);return await Zo(t),!0}catch(t){throw console.error("Erro ao excluir fornecedor:",t),t}},ke=document.getElementById("content");let he=null,lt="products",ge="all";async function zn(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),r=a.value;if(r)try{await vo({establishmentId:p.establishmentId,name:r},"products"),a.value="",g("Sucesso","Categoria de produto criada!","success"),await Wa(),await wt()}catch(s){g("Erro",`Não foi possível criar a categoria: ${s.message}`,"error")}}async function On(e){if(await W("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await yo(e,"products"),g("Sucesso","Categoria de produto apagada.","success"),await Wa(),await wt()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function Wa(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await ia(p.establishmentId,"products");p.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${h(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function Vn(){re({title:"Gerir Categorias de Produtos",contentHTML:`
        <div class="space-y-4">
            <div class="mb-4">
                <form id="categoryForm" class="flex flex-col sm:flex-row gap-4 sm:items-end">
                    <div class="flex-1 w-full">
                        <label for="categoryName" class="block text-sm font-medium text-gray-700">Nova Categoria</label>
                        <input type="text" id="categoryName" placeholder="Nome da nova categoria" required class="mt-1 w-full p-2 border rounded-md">
                    </div>
                    <button type="submit" class="w-full sm:w-auto py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Adicionar</button>
                </form>
            </div>
            <div id="categoryList" class="space-y-2 max-h-64 overflow-y-auto p-2 border rounded-md"></div>
        </div>
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",zn),t.addEventListener("click",r=>{const s=r.target.closest('button[data-action="delete-category"]');s&&On(s.dataset.id)}))}Wa()}async function _n(e){if(!e)return;if(await W("Apagar Produto","Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida."))try{await Ii(e),g("Sucesso","Produto apagado com sucesso!","success"),await wt()}catch(a){g("Erro",`Não foi possível apagar o produto: ${a.message}`,"error")}}async function Un(e){const t=e.querySelector("#productId").value,a=parseInt(e.querySelector("#productCurrentStock").value),r=parseInt(e.querySelector("#productMinStock").value),s=parseInt(e.querySelector("#productMaxStock").value),o=e.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),i=Array.from(o).map(d=>d.dataset.id),n={establishmentId:p.establishmentId,name:e.querySelector("#productName").value,price:parseFloat(e.querySelector("#productPrice").value),costPrice:parseFloat(e.querySelector("#productCostPrice").value)||0,commissionRate:parseFloat(e.querySelector("#productCommissionRate").value)||0,currentStock:isNaN(a)?0:a,minStock:isNaN(r)?0:r,maxStock:isNaN(s)?0:s,categoryId:e.querySelector("#productCategory").value||null,photo:e.querySelector("#productPhotoBase64").value,supplierIds:i};try{t?await Ei(t,n):await $i(n),document.getElementById("productModal").style.display="none",g("Sucesso",`Produto ${t?"atualizado":"adicionado"} com sucesso!`,"success"),await wt()}catch(d){throw new Error(d.message)}}function fs(e,t=800,a=800,r="image/jpeg",s=.8){return new Promise((o,i)=>{if(!e.type.startsWith("image/"))return i(new Error("O ficheiro selecionado não é uma imagem."));const n=new FileReader;n.onload=d=>{const l=new Image;l.onload=()=>{let c=l.width,u=l.height;c>u?c>t&&(u*=t/c,c=t):u>a&&(c*=a/u,u=a);const m=document.createElement("canvas");m.width=c,m.height=u,m.getContext("2d").drawImage(l,0,0,c,u);const b=m.toDataURL(r,s);o(b)},l.onerror=c=>i(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},n.onerror=d=>i(new Error("Não foi possível ler o ficheiro.")),n.readAsDataURL(e)})}function xs(e=null){const t=document.getElementById("productModal"),a=p.categories||[],r=p.suppliers||[],s=a.map(B=>`<option value="${B.id}" ${e?.categoryId===B.id?"selected":""}>${h(B.name)}</option>`).join("");let o=new Set(e?.supplierIds||[]);const i=h(e?.name||""),n=e?.price||"",d=e?.costPrice||"",l=e?.commissionRate||"",c=e?.minStock||0,u=e?.maxStock||0,m=e?.currentStock||0,x=e?i:"Novo Produto";t.innerHTML=`
    <div class="modal-content max-w-3xl overflow-y-auto max-h-[90vh]">
        <form id="productForm">
            <input type="hidden" id="productId" value="${e?.id||""}">
            <input type="hidden" id="productPhotoBase64" value="${e?.photo||""}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="productModalTitle" class="text-2xl font-bold text-gray-800">${x}</h2>
                <button type="button" data-action="close-modal" data-target="productModal" class="text-2xl font-bold">&times;</button>
            </div>

            <div class="p-0">
                <div class="border-b border-gray-200 mb-6">
                    <nav class="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                        <button type="button" data-tab="dados" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">Dados</button>
                        <button type="button" data-tab="stock" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 ${e?"":"hidden"}">Ajustar Estoque</button>
                        <button type="button" data-tab="suppliers" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Fornecedores</button>
                    </nav>
                </div>

                <div id="tab-content-dados" class="tab-content space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="md:col-span-1 space-y-4">
                            <div class="form-group"><label>Imagem do Produto</label><div class="mt-1 flex flex-col items-center"><img id="productPhotoPreview" src="${e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto"}" alt="Foto do Produto" class="w-32 h-32 rounded-lg object-cover mb-3 border-4 border-gray-200 bg-gray-50"><input type="file" id="productPhotoInput" class="hidden" accept="image/*"><button type="button" id="productPhotoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar Imagem</button></div></div>
                        </div>
                        <div class="md:col-span-2"><div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                            <div class="form-group sm:col-span-2"><label for="productName">Nome do Produto</label><input type="text" id="productName" value="${i}" required class="mt-1 w-full p-2 border rounded-md"></div>
                            
                            <div class="form-group sm:col-span-2"><label for="productCategory">Categoria</label><select id="productCategory" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Sem categoria</option>${s}</select></div>
                            
                            <div class="form-group"><label for="productPrice">Preço Venda (R$)</label><input type="number" id="productPrice" step="0.01" value="${n}" required class="mt-1 w-full p-2 border rounded-md"></div>
                            
                            <div class="form-group"><label for="productCostPrice">Preço de Custo Médio (R$)</label><input type="number" id="productCostPrice" step="0.01" value="${d}" class="mt-1 w-full p-2 border rounded-md" placeholder="0.00"></div>
                            
                            <div class="form-group"><label for="productCommissionRate">Comissão (%)</label><input type="number" id="productCommissionRate" placeholder="Ex: 10" value="${l}" class="mt-1 w-full p-2 border rounded-md"></div>
                        </div></div>
                    </div>
                    <div class="mt-6 pt-6 border-t"><h3 class="text-lg font-semibold text-gray-700 text-left mb-4">Controlo de Stock (Definições)</h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div class="form-group"><label for="productCurrentStock">Atual</label><input type="number" id="productCurrentStock" value="${m}" readonly class="mt-1 w-full p-2 border rounded-md bg-gray-100"></div>
                        <div class="form-group"><label for="productMinStock">Mínimo (Alerta)</label><input type="number" id="productMinStock" value="${c}" class="mt-1 w-full p-2 border rounded-md"></div>
                        <div class="form-group"><label for="productMaxStock">Máximo</label><input type="number" id="productMaxStock" value="${u}" class="mt-1 w-full p-2 border rounded-md"></div>
                    </div></div>
                </div>

                <div id="tab-content-stock" class="tab-content hidden space-y-6">
                    <p class="text-sm text-gray-600">Use esta secção para registar entradas (compras) ou saídas (perdas) manuais. O estoque atual é <strong id="currentStockDisplay" class="text-lg">${m}</strong>.</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                        <div class="form-group">
                            <label for="stockAdjustmentAmount">Quantidade</label>
                            <input type="number" id="stockAdjustmentAmount" min="1" placeholder="Ex: 10" class="w-full p-2 border rounded-md">
                        </div>
                        <div class="form-group">
                            <label for="stockAdjustmentReason">Motivo (Opcional)</label>
                            <input type="text" id="stockAdjustmentReason" placeholder="Ex: Compra, Perda" class="w-full p-2 border rounded-md">
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <button type="button" data-action="adjust-stock-modal" data-change="1" class="w-full sm:w-auto flex-1 py-3 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 flex items-center justify-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                            Registar Entrada
                        </button>
                        <button type="button" data-action="adjust-stock-modal" data-change="-1" class="w-full sm:w-auto flex-1 py-3 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 flex items-center justify-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                            Registar Saída
                        </button>
                    </div>
                </div>

                <div id="tab-content-suppliers" class="tab-content hidden space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Pesquisar Fornecedor</label>
                        <div class="relative">
                            <input type="text" id="modalSupplierSearch" placeholder="Digite o nome..." class="w-full p-2 border rounded-md pl-10">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                        </div>
                        
                        <div id="supplierSearchResults" class="mt-2 border rounded-md max-h-40 overflow-y-auto bg-white hidden shadow-sm"></div>
                    </div>

                    <div>
                        <h4 class="text-sm font-medium text-gray-700 mb-2">Fornecedores Vinculados:</h4>
                        <div id="selectedSuppliersList" class="space-y-2 max-h-40 overflow-y-auto border p-2 rounded-md bg-gray-50 min-h-[50px]">
                            <p class="text-xs text-gray-400 text-center py-2">Nenhum fornecedor selecionado.</p>
                        </div>
                    </div>
                </div>

            </div> 
            
            <div class="mt-8 pt-6 border-t flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                <button 
                    type="button" 
                    data-action="delete-product" 
                    data-id="${e?.id||""}" 
                    class="w-full sm:w-auto text-red-600 hover:text-red-800 transition-colors ${e?"":"hidden"}"
                    title="Excluir Produto"
                >
                    <svg class="w-6 h-6 mx-auto sm:mx-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
                <div class="flex flex-col-reverse sm:flex-row w-full sm:w-auto gap-3">
                    <button type="button" data-action="close-modal" data-target="productModal" class="w-full sm:w-auto py-2 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button type="button" data-action="save-product-modal" class="w-full sm:w-auto py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar Alterações</button>
                </div>
            </div>
        </form>
    </div>`;const b=t.querySelector("#productCategory"),v=t.querySelector("#productPhotoInput");t.querySelector("#productPhotoButton").addEventListener("click",()=>v.click()),b.innerHTML='<option value="">Sem categoria</option>'+(p.categories||[]).map(B=>`<option value="${B.id}" ${e?.categoryId===B.id?"selected":""}>${h(B.name)}</option>`).join(""),e&&(b.value=e.categoryId||"");const f=t.querySelector("#productPhotoPreview");t.querySelector("#productPhotoBase64");const E=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",S=e?.photo||"";v.onchange=async()=>{const B=v.files[0];if(B){f.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const D=await fs(B,800,800,"image/jpeg",.8),z=D.length*3/4,O=1e3*1024;if(z>O)throw new Error("A imagem é muito grande mesmo após a compressão.");preview.src=D,base64Input.value=D}catch(D){console.error("Erro ao processar imagem:",D),g("Erro de Imagem",D.message||"Não foi possível processar a imagem.","error"),preview.src=E,base64Input.value=S,H.value=""}}};const k=t.cloneNode(!0);t.parentNode.replaceChild(k,t);const T=()=>{const B=k.querySelector("#modalSupplierSearch"),D=k.querySelector("#supplierSearchResults"),N=k.querySelector("#selectedSuppliersList"),z=B.value.toLowerCase();if(z.length>0){const O=r.filter(j=>j.name.toLowerCase().includes(z)&&!o.has(j.id));O.length>0?(D.classList.remove("hidden"),D.innerHTML=O.map(j=>`
                    <div class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 text-sm flex justify-between items-center" data-add-supplier="${j.id}">
                        <span class="font-medium">${h(j.name)}</span>
                        <span class="text-indigo-600 text-xs">+ Adicionar</span>
                    </div>
                `).join("")):(D.classList.remove("hidden"),D.innerHTML='<div class="p-2 text-xs text-gray-500 text-center">Nenhum resultado disponível.</div>')}else D.classList.add("hidden");o.size>0?(N.innerHTML="",o.forEach(O=>{const j=r.find(C=>C.id===O);j&&(N.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border p-2 rounded shadow-sm" data-id="${j.id}">
                            <div class="text-sm">
                                <p class="font-bold text-gray-800">${h(j.name)}</p>
                                <p class="text-xs text-gray-500">${h(j.contactName||"")} - ${h(j.phone||"")}</p>
                            </div>
                            <button type="button" class="text-red-500 hover:text-red-700 p-1" data-remove-supplier="${j.id}" title="Remover">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    `)})):N.innerHTML='<p class="text-xs text-gray-400 text-center py-2">Nenhum fornecedor selecionado.</p>'};k.querySelector("#modalSupplierSearch").addEventListener("input",T),k.addEventListener("click",B=>{const D=B.target.closest("[data-add-supplier]");if(D){const z=D.dataset.addSupplier;o.add(z),k.querySelector("#modalSupplierSearch").value="",T()}const N=B.target.closest("[data-remove-supplier]");if(N){const z=N.dataset.removeSupplier;o.delete(z),T()}}),T(),k.addEventListener("click",async B=>{const D=B.target.closest("button[data-action]");if(!D)return;const N=D.dataset.action,z=k.querySelector("#productId").value;if(N==="close-modal"&&(k.style.display="none"),N==="delete-product"){if(!z)return;k.style.display="none",await _n(z)}if(N==="save-product-modal"){const O=k.querySelector("#productForm");if(O){if(!O.querySelector("#productName").value||!O.querySelector("#productPrice").value){g("Erro","Nome e Preço de Venda são obrigatórios.","error");return}const j=D.closest('button[data-action="save-product-modal"]');j.disabled=!0,j.textContent="A salvar...";try{await Un(O)}catch(C){g("Erro",`Falha ao salvar: ${C.message}`,"error"),j.disabled=!1,j.textContent="Salvar Alterações"}}}if(N==="adjust-stock-modal"){B.preventDefault();const O=k.querySelector("#stockAdjustmentAmount"),j=k.querySelector("#stockAdjustmentReason"),C=parseInt(O.value,10),V=parseInt(D.dataset.change,10);if(!C||C<=0){g("Erro","Por favor, insira uma quantidade válida.","error");return}const Z=C*V,oe=j.value||(Z>0?"Entrada manual":"Saída manual");try{await Li(z,{change:Z,reason:oe});const Pe=p.products.findIndex(we=>we.id===z);if(Pe>-1){const we=p.products[Pe].currentStock+Z;p.products[Pe].currentStock=we,k.querySelector("#currentStockDisplay").textContent=we,k.querySelector("#productCurrentStock").value=we,O.value="",j.value="",g("Sucesso","Estoque atualizado!","success"),Ja(),xt()}}catch(Pe){g("Erro de Stock",Pe.message,"error")}}});const L=k.querySelectorAll(".tab-btn"),R=k.querySelectorAll(".tab-content");L.forEach(B=>{B.addEventListener("click",D=>{D.preventDefault(),L.forEach(N=>{N.classList.remove("border-indigo-500","text-indigo-600"),N.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),B.classList.add("border-indigo-500","text-indigo-600"),B.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),R.forEach(N=>N.classList.add("hidden")),document.getElementById(`tab-content-${B.dataset.tab}`).classList.remove("hidden")})});const H=k.querySelector("#productPhotoInput");k.querySelector("#productPhotoButton").addEventListener("click",()=>H.click()),H.onchange=async()=>{const B=H.files[0];if(!B)return;const D=k.querySelector("#productPhotoPreview"),N=k.querySelector("#productPhotoBase64");D.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const z=await fs(B,800,800,"image/jpeg",.8),j=z.length*3/4,C=1e3*1024;if(j>C)throw new Error("A imagem é muito grande mesmo após a compressão.");D.src=z,N.value=z}catch(z){console.error("Erro ao processar imagem:",z),g("Erro de Imagem",z.message||"Não foi possível processar a imagem.","error"),D.src=E,N.value=S,H.value=""}},k.style.display="flex"}function Wn(){const e=document.getElementById("products-content-container");e.innerHTML=`
        <div class="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-6">
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <input type="text" id="productSearchInput" placeholder="Pesquisar..." class="w-full sm:w-64 p-2 border rounded-md">
                <select id="productCategoryFilter" class="w-full sm:w-auto p-2 border rounded-md bg-white">
                    <option value="all">Todas as categorias</option>
                </select>
            </div>
        </div>
        
        <div class="grid grid-cols-2 gap-3 mb-4 lg:grid-cols-4 lg:gap-4">
            <div data-action="filter-stock" data-filter-type="ok" class="indicator-card bg-green-50 border-l-4 border-green-500 p-3 rounded-r-lg flex items-center gap-3 cursor-pointer transition-all lg:p-4 lg:gap-4">
                <div class="bg-green-100 p-1.5 lg:p-2 rounded-full"><svg class="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.93L5.5 8m7 2H5m7 2v4m0 0H5"></path></svg></div>
                <div><p class="text-xs text-gray-500 lg:text-sm">Em dia</p><p id="indicator-ok" class="text-lg lg:text-2xl font-bold text-gray-800">0</p></div>
            </div>
            <div data-action="filter-stock" data-filter-type="near_min" class="indicator-card bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg flex items-center gap-3 cursor-pointer transition-all lg:p-4 lg:gap-4">
                <div class="bg-blue-100 p-1.5 lg:p-2 rounded-full"><svg class="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 transform -rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6z"></path><path fill-rule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-7a7 7 0 100 14 7 7 0 000-14z" clip-rule="evenodd"></path></svg></div>
                <div><p class="text-xs text-gray-500 lg:text-sm">Perto do Mín.</p><p id="indicator-near-min" class="text-lg lg:text-2xl font-bold text-gray-800">0</p></div>
            </div>
            <div data-action="filter-stock" data-filter-type="at_min" class="indicator-card bg-orange-50 border-l-4 border-orange-500 p-3 rounded-r-lg flex items-center gap-3 cursor-pointer transition-all lg:p-4 lg:gap-4">
                <div class="bg-orange-100 p-1.5 lg:p-2 rounded-full"><svg class="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div>
                <div><p class="text-xs text-gray-500 lg:text-sm">No Mínimo</p><p id="indicator-at-min" class="text-lg lg:text-2xl font-bold text-gray-800">0</p></div>
            </div>
            <div data-action="filter-stock" data-filter-type="empty" class="indicator-card bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg flex items-center gap-3 cursor-pointer transition-all lg:p-4 lg:gap-4">
                <div class="bg-red-100 p-1.5 lg:p-2 rounded-full"><svg class="w-5 h-5 lg:w-6 lg:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg></div>
                <div><p class="text-xs text-gray-500 lg:text-sm">Esgotado</p><p id="indicator-empty" class="text-lg lg:text-2xl font-bold text-gray-800">0</p></div>
            </div>
        </div>
        
        <div id="productsList" class="pb-20"> <div class="loader col-span-full mx-auto my-10"></div>
        </div>

        <button data-action="new-product" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        </button>
    `;const t=document.getElementById("productCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(p.categories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${h(a.name)}</option>`)),Ja(),xt()}function Jn(){const e=document.getElementById("products-content-container"),t=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const r=a.toISOString().split("T")[0];e.innerHTML=`
        <div class="space-y-6">
             <div class="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 items-end bg-white p-4 rounded-lg shadow-sm">
                <div class="col-span-1"><label for="reportStartDate" class="block text-xs font-medium text-gray-700">De</label><input type="date" id="reportStartDate" value="${r}" class="mt-1 w-full p-2 border rounded-md text-sm"></div>
                <div class="col-span-1"><label for="reportEndDate" class="block text-xs font-medium text-gray-700">Até</label><input type="date" id="reportEndDate" value="${t}" class="mt-1 w-full p-2 border rounded-md text-sm"></div>
                <div class="col-span-2 md:col-span-1"><label for="productFilterReport" class="block text-xs font-medium text-gray-700">Produto</label><select id="productFilterReport" class="mt-1 w-full p-2 border rounded-md bg-white text-sm"><option value="all">Todos</option></select></div>
                <div class="col-span-2 md:col-span-1"><label for="categoryFilterReport" class="block text-xs font-medium text-gray-700">Categoria</label><select id="categoryFilterReport" class="mt-1 w-full p-2 border rounded-md bg-white text-sm"><option value="all">Todas</option></select></div>
                <button data-action="generate-report" class="col-span-2 md:col-span-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 w-full text-sm">Gerar Relatório</button>
             </div>
             
             <div id="report-results">
                 <div class="bg-white border rounded-lg shadow-sm p-8">
                    <p class="text-center text-gray-500">Selecione os filtros e clique em "Gerar Relatório".</p>
                 </div>
             </div>
        </div>`;const s=document.getElementById("productFilterReport"),o=document.getElementById("categoryFilterReport");s&&p.products&&(s.innerHTML+=p.products.map(i=>`<option value="${i.id}">${h(i.name)}</option>`).join("")),o&&p.categories&&(o.innerHTML+=p.categories.map(i=>`<option value="${i.id}">${h(i.name)}</option>`).join(""))}async function Gn(){const e=document.getElementById("report-results");e.innerHTML='<div class="loader mx-auto my-8"></div>';const t={startDate:document.getElementById("reportStartDate").value,endDate:document.getElementById("reportEndDate").value,productId:document.getElementById("productFilterReport").value,categoryId:document.getElementById("categoryFilterReport").value,establishmentId:p.establishmentId};try{const a=await Ci(t);if(a.length===0){e.innerHTML=`
                <div class="bg-white border rounded-lg shadow-sm p-8">
                    <p class="text-center text-gray-500">Nenhuma movimentação encontrada para este período.</p>
                </div>`;return}const r=`
            <div class="hidden md:block bg-white border rounded-lg shadow-sm overflow-x-auto">
                <table class="min-w-full text-sm">
                    <thead class="bg-gray-50"><tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                        <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Alteração</th>
                        <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Anterior</th>
                        <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Novo</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilizador</th>
                    </tr></thead>
                    <tbody class="divide-y divide-gray-200">
                        ${a.map(o=>`
                            <tr class="hover:bg-gray-50">
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600">${new Date(o.date).toLocaleString("pt-BR")}</td>
                                <td class="px-4 py-3 whitespace-nowrap font-semibold text-gray-800">${h(o.productName)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center font-bold ${o.change>0?"text-green-600":"text-red-600"}">
                                    ${o.change>0?"+":""}${o.change}
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-500">${o.oldStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-800 font-medium">${o.newStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600 truncate max-w-xs" title="${h(o.reason)}">${h(o.reason)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600">${h(o.user)}</td>
                            </tr>`).join("")}
                    </tbody>
                </table>
            </div>`,s=`
            <div class="md:hidden space-y-3 pb-20">
                ${a.map(o=>`
                    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <span class="text-xs text-gray-400 font-medium">${new Date(o.date).toLocaleString("pt-BR")}</span>
                                <h4 class="font-bold text-gray-800 text-base line-clamp-1">${h(o.productName)}</h4>
                            </div>
                            <span class="text-lg font-bold ${o.change>0?"text-green-600":"text-red-600"}">
                                ${o.change>0?"+":""}${o.change}
                            </span>
                        </div>
                        
                        <div class="flex items-center justify-between bg-gray-50 p-2 rounded mb-3 text-sm border border-gray-100">
                            <span class="text-gray-500">Estoque:</span>
                            <div class="flex items-center gap-2 font-mono">
                                <span class="text-gray-400">${o.oldStock}</span>
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                <span class="text-gray-800 font-bold">${o.newStock}</span>
                            </div>
                        </div>

                        <div class="flex justify-between items-center text-xs border-t pt-2 border-dashed border-gray-200">
                            <span class="text-gray-600 truncate max-w-[60%] font-medium" title="${h(o.reason)}">
                                ${h(o.reason)||"Sem motivo"}
                            </span>
                            <span class="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                ${h(o.user)||"Sistema"}
                            </span>
                        </div>
                    </div>
                `).join("")}
            </div>`;e.innerHTML=r+s}catch(a){g("Erro",`Não foi possível gerar o relatório: ${a.message}`,"error"),e.innerHTML=`<div class="bg-white border border-red-200 rounded-lg p-8 text-center text-red-500">${a.message}</div>`}}function Ja(){const e={ok:0,near_min:0,at_min:0,empty:0};if(!p.products)return;p.products.forEach(o=>{if(!o)return;const i=o.currentStock,n=o.minStock;i<=0?e.empty++:n>0&&i<=n?e.at_min++:n>0&&i<=n*1.2?e.near_min++:e.ok++});const t=document.getElementById("indicator-ok"),a=document.getElementById("indicator-near-min"),r=document.getElementById("indicator-at-min"),s=document.getElementById("indicator-empty");t&&(t.textContent=e.ok),a&&(a.textContent=e.near_min),r&&(r.textContent=e.at_min),s&&(s.textContent=e.empty)}function xt(){const e=document.getElementById("productsList");if(!e)return;const t=document.getElementById("productSearchInput")?.value.toLowerCase()||"",a=document.getElementById("productCategoryFilter")?.value||"all",r=new Map((p.categories||[]).map(o=>[o.id,o.name]));let s=(p.products||[]).filter(Boolean);ge!=="all"&&(s=s.filter(o=>{const i=o.currentStock,n=o.minStock;switch(ge){case"ok":return i>0&&(n===0||i>n*1.2);case"near_min":return n>0&&i>n&&i<=n*1.2;case"at_min":return n>0&&i>0&&i<=n;case"empty":return i<=0;default:return!0}})),s=s.filter(o=>{const i=o.name.toLowerCase().includes(t),n=a==="all"||o.categoryId===a;return i&&n}),e.innerHTML="",s.length>0?(e.className="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 sm:space-y-0",s.forEach(o=>{const i=document.createElement("div"),n=JSON.stringify(o).replace(/'/g,"&apos;");i.className=`product-card bg-white rounded-lg shadow-md flex items-center gap-3 p-3 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 
                              sm:flex-col sm:p-0 sm:items-stretch sm:gap-0`,i.dataset.action="edit-product",i.dataset.product=n;const d=o.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(o.name.charAt(0))}`,l=r.get(o.categoryId)||"N/A";let c="",u="text-gray-500";const m=o.currentStock,x=o.minStock;m<=0?(c='<span class="text-xs font-semibold text-red-600">Esgotado</span>',u="text-red-600 font-semibold"):x>0&&m<=x?(c='<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>',u="text-orange-600 font-semibold"):x>0&&m<=x*1.2?(c='<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>',u="text-blue-600 font-semibold"):(c='<span class="text-xs font-semibold text-green-600">Em Estoque</span>',u="text-green-600 font-semibold"),i.innerHTML=`
                <img src="${d}" alt="Imagem de ${h(o.name)}" class="w-16 h-16 rounded-md object-cover flex-shrink-0 sm:w-full sm:h-24 sm:rounded-b-none">
                
                <div class="flex-1 sm:p-3 sm:flex sm:flex-col sm:flex-grow">
                    <div class="sm:flex-grow">
                        <div class="flex justify-between items-start mb-1 gap-2">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${h(o.name)}</h3>
                            <div class="hidden sm:block">${c}</div>
                        </div>
                        
                        <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${o.price.toFixed(2)}</p>
                        
                        <p class="text-xs text-gray-500 text-left mb-2 hidden sm:block">Categoria: ${h(l)}</p>
                    </div>

                    <div class="flex justify-between items-center mt-2 sm:mt-0">
                        <p class="text-lg font-bold text-indigo-600 text-left sm:hidden">R$ ${o.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-right sm:text-left">
                            Estoque: <span class="font-bold text-base ${u}">${o.currentStock}</span>
                        </p>
                    </div>
                </div>`,e.appendChild(i)})):(e.className="",e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>')}async function wt(){const e=document.getElementById("products-content-container");e&&(e.innerHTML='<div class="loader col-span-full mx-auto my-8"></div>');try{const[t,a,r]=await Promise.all([ta(p.establishmentId),ia(p.establishmentId,"products"),Ua(p.establishmentId)]);p.products=(t||[]).filter(Boolean),p.categories=(a||[]).filter(Boolean),p.suppliers=(r||[]).filter(Boolean),ko(lt)}catch(t){e&&(e.innerHTML=`<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados: ${t.message}</p>`)}}function ko(e){if(document.getElementById("products-content-container")){if(lt===e&&document.getElementById("products-content-container").children.length>1){lt==="products"&&(Ja(),xt());return}lt=e,ge="all",document.querySelectorAll("#products-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="products"?Wn():e==="movements"&&Jn()}}async function Qn(){ke.innerHTML=`
        <section class="p-4 sm:p-6 pb-24"> <div class="bg-white rounded-lg shadow-md">
                <div id="products-tabs" class="border-b border-gray-200">
                    <nav class="-mb-px flex space-x-6 px-4 sm:px-6 overflow-x-auto" aria-label="Tabs">
                        <button data-view="products" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">Produtos</button>
                        <button data-action="manage-product-categories" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Categorias</button>
                        <button data-view="movements" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Movimentações</button>
                    </nav>
                </div>
                <div id="products-content-container" class="p-4 sm:p-6">
                    <div class="loader mx-auto"></div>
                </div>
            </div>
        </section>`,he&&(ke.removeEventListener("click",he),ke.removeEventListener("input",he),ke.removeEventListener("change",he)),he=async e=>{const t=e.target;if(t.id==="productSearchInput"||t.id==="productCategoryFilter"){xt();return}const a=e.target.closest("button[data-action], button[data-view], .indicator-card[data-action], .product-card[data-action]");if(!a||e.target.closest('[data-action-stop-propagation="true"]'))return;if(a.hasAttribute("data-view")){ko(a.dataset.view);return}switch(a.dataset.action){case"new-product":xs();break;case"edit-product":xs(JSON.parse(a.dataset.product));break;case"manage-product-categories":Vn();break;case"generate-report":await Gn();break;case"filter-stock":const s=a.dataset.filterType;ge=ge===s?"all":s,document.querySelectorAll(".indicator-card").forEach(o=>{o.classList.toggle("ring-2",o.dataset.filterType===ge),o.classList.toggle("ring-indigo-500",o.dataset.filterType===ge),o.classList.toggle("shadow-lg",o.dataset.filterType===ge)}),xt();break}},ke.addEventListener("click",he),ke.addEventListener("input",he),ke.addEventListener("change",he),lt="products",ge="all",await wt()}const Nt=document.getElementById("content");let F={partners:[],establishments:[],searchQuery:"",categoryFilter:"all",stateFilter:"all",cityFilter:"",sortBy:"name_asc",hasSearched:!1,viewMode:"list",editingItem:null},It=null;const Vt={contas_fixas:{label:"Contas Fixas (Água, Luz)",color:"blue",icon:"bi-lightning-charge"},estoque:{label:"Fornecedor de Produtos",color:"emerald",icon:"bi-box-seam"},servicos:{label:"Prestador de Serviço",color:"purple",icon:"bi-tools"},impostos:{label:"Governo / Impostos",color:"red",icon:"bi-bank"},outros:{label:"Outros Parceiros",color:"gray",icon:"bi-person-vcard"}},So=["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];async function Yn(){try{const t=(await Te()).matrizes||[];F.establishments=[],t.forEach(a=>{F.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(r=>F.establishments.push({id:r.id,name:r.name,type:"Filial"}))})}catch(e){console.warn("Erro ao buscar lojas",e)}F.viewMode="list",F.editingItem=null,F.hasSearched=!1,F.partners=[],Xn(),sl(),$o()}function Xn(){Nt.innerHTML=`
        <div class="flex flex-col h-auto bg-gray-50 w-full relative font-sans min-h-[calc(100vh-80px)] overflow-x-hidden">
            
            <div id="suppliers-list-view" class="w-full transition-all duration-300 ${F.viewMode==="list"?"block":"hidden"}">
                ${Zn()}
                <div class="flex-1 px-4 py-8 max-w-7xl mx-auto w-full">
                    <div id="partners-grid" class="pb-20">
                        </div>
                </div>
            </div>

            <div id="suppliers-form-view" class="w-full transition-all duration-300 ${F.viewMode==="form"?"block":"hidden"}">
                <div id="form-container-wrapper" class="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24">
                    </div>
            </div>

        </div>
    `}function Zn(){const e=Object.entries(Vt).map(([a,r])=>`<option value="${a}">${r.label}</option>`).join(""),t=So.map(a=>`<option value="${a}">${a}</option>`).join("");return`
        <div class="bg-white shadow-sm border-b border-gray-200 z-20 w-full animate-fade-in">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 class="text-2xl font-black text-gray-900 tracking-tight">Parceiros de Negócio</h1>
                        <p class="text-sm text-gray-500 font-medium">Faça a gestão de fornecedores e entidades. Utilize os filtros para localizar registros.</p>
                    </div>
                    <button data-action="new-partner" class="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                        <i class="bi bi-plus-lg text-lg"></i> Novo Parceiro
                    </button>
                </div>

                <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-inner">
                    <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                        
                        <div class="md:col-span-3">
                            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Pesquisa Livre</label>
                            <div class="relative">
                                <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input type="text" id="filterSearch" placeholder="Nome, CNPJ, Email..." value="${F.searchQuery}" class="w-full pl-10 p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all">
                            </div>
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Categoria</label>
                            <select id="filterCategory" class="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all text-gray-700">
                                <option value="all">Todas as Categorias</option>
                                ${e}
                            </select>
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Estado (UF)</label>
                            <select id="filterState" class="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all text-gray-700">
                                <option value="all">Todos os Estados</option>
                                ${t}
                            </select>
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Cidade</label>
                            <input type="text" id="filterCity" placeholder="Ex: São Paulo" value="${F.cityFilter}" class="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all">
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Classificar por</label>
                            <select id="filterSortBy" class="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all text-gray-700">
                                <option value="name_asc">Razão Social (A-Z)</option>
                                <option value="name_desc">Razão Social (Z-A)</option>
                                <option value="contact_asc">Nome Contato (A-Z)</option>
                            </select>
                        </div>

                        <div class="md:col-span-1 flex items-end">
                            <button id="btn-search-partners" class="w-full p-2.5 bg-indigo-600 text-white font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-indigo-700 shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 h-[42px]">
                                <i class="bi bi-search"></i> Buscar
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    `}function Kn(e=null){const t=!!e,a=t?"Ficha do Parceiro":"Novo Parceiro de Negócio";let r=e?.category||"";r==="Produtos"&&(r="estoque"),r==="Serviços"&&(r="servicos");const s=Object.entries(Vt).map(([n,d])=>`<option value="${n}" ${r===n?"selected":""}>${d.label}</option>`).join(""),o=So.map(n=>`<option value="${n}" ${e?.state===n?"selected":""}>${n}</option>`).join(""),i=document.getElementById("form-container-wrapper");i&&(i.innerHTML=`
        <div class="animate-fade-in-up">
            <div class="flex items-center gap-4 mb-6">
                <button data-action="back-to-list" class="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm">
                    <i class="bi bi-arrow-left text-xl"></i>
                </button>
                <div>
                    <h2 class="text-2xl font-black text-gray-900 tracking-tight">${a}</h2>
                    <p class="text-sm text-gray-500 font-medium">Preencha as informações da entidade abaixo.</p>
                </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <form id="partner-form" class="flex flex-col">
                    <input type="hidden" id="supId" value="${e?.id||""}">

                    <div class="p-6 md:p-8 space-y-8">
                        
                        <div>
                            <h3 class="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2"><i class="bi bi-building"></i> Dados Empresariais</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="md:col-span-2">
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Razão Social / Nome da Empresa *</label>
                                    <input type="text" id="supName" required class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none font-bold text-gray-800 text-lg transition-all shadow-inner" value="${h(e?.name||"")}" placeholder="Ex: CPFL Energia, Coca-Cola...">
                                </div>
                                
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Categoria / Tipo *</label>
                                    <select id="supCategory" required class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm font-medium text-gray-700 transition-all shadow-inner">
                                        <option value="">-- Selecione --</option>
                                        ${s}
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">CNPJ / CPF</label>
                                    <input type="text" id="supTaxId" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${h(e?.document||e?.taxId||"")}" placeholder="00.000.000/0001-00">
                                </div>
                            </div>
                        </div>

                        <hr class="border-gray-100">

                        <div>
                            <h3 class="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2"><i class="bi bi-geo-alt"></i> Localização</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Estado (UF)</label>
                                    <select id="supState" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm font-medium text-gray-700 transition-all shadow-inner">
                                        <option value="">-- Selecione o Estado --</option>
                                        ${o}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Cidade</label>
                                    <input type="text" id="supCity" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${h(e?.city||"")}" placeholder="Ex: São Paulo">
                                </div>
                            </div>
                        </div>

                        <hr class="border-gray-100">

                        <div>
                            <h3 class="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2"><i class="bi bi-person-lines-fill"></i> Contactos Principais</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="md:col-span-2">
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Nome do Contato na Empresa</label>
                                    <div class="relative">
                                        <i class="bi bi-person absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                                        <input type="text" id="supContact" class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${h(e?.contactName||"")}" placeholder="Ex: João Silva (Comercial)">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">E-mail Comercial</label>
                                    <div class="relative">
                                        <i class="bi bi-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input type="email" id="supEmail" class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${h(e?.email||"")}" placeholder="contato@empresa.com">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Telefone / WhatsApp</label>
                                    <div class="relative">
                                        <i class="bi bi-telephone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input type="tel" id="supPhone" class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${h(e?.phone||"")}" placeholder="(00) 0000-0000">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr class="border-gray-100">

                        <div>
                            <h3 class="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2"><i class="bi bi-journal-text"></i> Informações Adicionais</h3>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Observações Internas (Ex: Dados Bancários, Chave PIX, Conta Contrato)</label>
                            <textarea id="supNotes" rows="4" class="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-700 font-medium resize-none transition-all shadow-inner">${e?.notes||""}</textarea>
                        </div>
                    </div>

                    <div class="px-6 py-5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        ${t?`
                            <button type="button" data-action="delete-partner" data-id="${e.id}" class="w-full sm:w-auto px-6 py-3 text-red-600 bg-white border border-red-200 rounded-xl font-bold hover:bg-red-50 hover:border-red-300 transition-colors flex items-center justify-center gap-2 shadow-sm">
                                <i class="bi bi-trash3"></i> Excluir Registro
                            </button>
                        `:"<div></div>"}
                        
                        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <button type="button" data-action="back-to-list" class="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-sm w-full sm:w-auto">
                                Cancelar
                            </button>
                            <button type="submit" class="px-8 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto">
                                <i class="bi bi-save2"></i> ${t?"Salvar Alterações":"Cadastrar Parceiro"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `,document.getElementById("partner-form").addEventListener("submit",tl))}function $o(){const e=document.getElementById("partners-grid");e&&(e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl w-full max-w-3xl mx-auto shadow-sm">
                <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 border border-indigo-100 shadow-inner">
                    <i class="bi bi-search text-2xl text-indigo-400"></i>
                </div>
                <h3 class="text-xl font-black text-gray-800 mb-2">Pronto para pesquisar</h3>
                <p class="text-sm text-gray-500 font-medium max-w-md text-center">Utilize os filtros acima e clique em "Buscar" para listar os parceiros registados no sistema.</p>
            </div>
        `)}async function el(){const e=document.getElementById("partners-grid");if(!F.hasSearched){$o();return}e.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="text-sm text-gray-500 mt-4 font-medium">Buscando parceiros...</p></div>';try{const t=await Ua(p.establishmentId);F.partners=t||[],Eo()}catch(t){e.innerHTML=`<div class="text-center py-10 text-red-500 font-bold">Erro ao carregar parceiros: ${t.message}</div>`}}function Eo(){const e=document.getElementById("partners-grid");if(!e)return;let t=F.partners;if(F.searchQuery){const s=F.searchQuery.toLowerCase();t=t.filter(o=>o.name.toLowerCase().includes(s)||o.document&&o.document.includes(s)||o.taxId&&o.taxId.includes(s)||o.email&&o.email.toLowerCase().includes(s)||o.contactName&&o.contactName.toLowerCase().includes(s))}if(F.categoryFilter!=="all"&&(t=t.filter(s=>s.category===F.categoryFilter)),F.stateFilter!=="all"&&(t=t.filter(s=>s.state===F.stateFilter)),F.cityFilter){const s=F.cityFilter.toLowerCase();t=t.filter(o=>o.city&&o.city.toLowerCase().includes(s))}if(t.sort((s,o)=>{let i="",n="";return F.sortBy==="name_asc"||F.sortBy==="name_desc"?(i=(s.name||"").toLowerCase(),n=(o.name||"").toLowerCase()):F.sortBy==="contact_asc"&&(i=(s.contactName||"").toLowerCase(),n=(o.contactName||"").toLowerCase()),F.sortBy==="name_desc"?n.localeCompare(i):i.localeCompare(n)}),t.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16 bg-white border border-dashed border-gray-300 rounded-2xl max-w-3xl mx-auto shadow-sm">
                <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100 shadow-inner">
                    <i class="bi bi-inbox text-2xl text-gray-400"></i>
                </div>
                <h3 class="text-lg font-black text-gray-800 mb-1">Nenhum parceiro encontrado</h3>
                <p class="text-sm text-gray-500 font-medium">Os filtros aplicados não retornaram resultados.</p>
            </div>
        `;return}let a=`
        <div class="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th class="p-4 pl-6 text-[10px] font-black text-gray-500 uppercase tracking-widest w-16 text-center">Tipo</th>
                        <th class="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Razão Social / Parceiro</th>
                        <th class="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Documento</th>
                        <th class="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Contacto / Localização</th>
                        <th class="p-4 pr-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Ação</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
    `,r='<div class="flex flex-col gap-4 md:hidden">';t.forEach(s=>{let o=s.category;o==="Produtos"&&(o="estoque"),o==="Serviços"&&(o="servicos");const i=Vt[o]||Vt.outros,n=s.document||s.taxId?s.document||s.taxId:"-",d=JSON.stringify(s).replace(/'/g,"&apos;"),l=[s.city,s.state].filter(Boolean).join(" - ");a+=`
            <tr class="hover:bg-indigo-50/50 cursor-pointer transition-colors group" data-action="open-form" data-item='${d}'>
                <td class="p-4 pl-6 text-center">
                    <div class="w-10 h-10 mx-auto rounded-xl bg-${i.color}-100 text-${i.color}-600 flex items-center justify-center text-lg shadow-sm" title="${i.label}">
                        <i class="bi ${i.icon}"></i>
                    </div>
                </td>
                <td class="p-4">
                    <p class="font-bold text-gray-900 text-sm group-hover:text-indigo-700 transition-colors">${h(s.name)}</p>
                    ${s.email?`<p class="text-xs text-gray-500 mt-0.5"><i class="bi bi-envelope mr-1 opacity-50"></i>${h(s.email)}</p>`:""}
                </td>
                <td class="p-4 text-sm font-medium text-gray-600">${h(n)}</td>
                <td class="p-4">
                    <div class="text-sm font-medium text-gray-800">${h(s.contactName||"-")}</div>
                    ${l?`<div class="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1"><i class="bi bi-geo-alt mr-1"></i>${h(l)}</div>`:""}
                </td>
                <td class="p-4 pr-6 text-right">
                    <button class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-100 transition-colors shadow-sm bg-white border border-gray-200 group-hover:border-indigo-200">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                </td>
            </tr>
        `,r+=`
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden" data-action="open-form" data-item='${d}'>
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-${i.color}-500"></div>
                <div class="flex gap-4">
                    <div class="w-12 h-12 rounded-xl bg-${i.color}-100 text-${i.color}-600 flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                        <i class="bi ${i.icon}"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">${i.label.split(" ")[0]}</p>
                        <h3 class="font-black text-gray-900 text-base leading-tight truncate">${h(s.name)}</h3>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-lg p-3 border border-gray-100 mt-1 flex flex-col gap-1.5">
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-gray-500 font-medium">Documento:</span>
                        <span class="font-bold text-gray-700">${h(n)}</span>
                    </div>
                    ${l?`
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-gray-500 font-medium">Local:</span>
                        <span class="font-bold text-gray-700">${h(l)}</span>
                    </div>`:""}
                </div>
            </div>
        `}),a+="</tbody></table></div>",r+="</div>",e.innerHTML=a+r}function dt(e,t=null){const a=document.getElementById("suppliers-list-view"),r=document.getElementById("suppliers-form-view");F.viewMode=e,F.editingItem=t,e==="list"?(a.classList.remove("hidden"),r.classList.add("hidden"),r.innerHTML='<div id="form-container-wrapper" class="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24"></div>',F.hasSearched&&Eo(),window.scrollTo({top:0,behavior:"smooth"})):(a.classList.add("hidden"),r.classList.remove("hidden"),Kn(t),window.scrollTo({top:0,behavior:"smooth"}))}async function tl(e){e.preventDefault();const t=e.target,a=t.querySelector("#supId").value,r={name:t.querySelector("#supName").value,contactName:t.querySelector("#supContact").value,email:t.querySelector("#supEmail").value,phone:t.querySelector("#supPhone").value,document:t.querySelector("#supTaxId").value,category:t.querySelector("#supCategory").value,state:t.querySelector("#supState").value,city:t.querySelector("#supCity").value,establishmentId:p.establishmentId,notes:t.querySelector("#supNotes")?.value||"",accessibleIn:[p.establishmentId]},s=t.querySelector('button[type="submit"]'),o=s.innerHTML;s.disabled=!0,s.innerHTML='<div class="loader-small border-white"></div> A gravar...';try{a?(await Fn(a,r),g("Sucesso","Ficha atualizada!","success")):(await jn(r),g("Sucesso","Parceiro registado!","success")),F.hasSearched&&(F.partners=await Ua(p.establishmentId)||[]),dt("list")}catch(i){g("Erro","Falha ao gravar: "+i.message,"error"),s.disabled=!1,s.innerHTML=o}}async function al(e){if(await W("Excluir Parceiro","Deseja realmente apagar esta ficha permanentemente? Os lançamentos financeiros antigos não serão apagados."))try{await Hn(e),g("Sucesso","Entidade excluída.","success"),F.partners=F.partners.filter(a=>a.id!==e),dt("list")}catch(a){g("Erro","Erro ao excluir: "+a.message,"error")}}function sl(){It&&Nt.removeEventListener("click",It),It=async e=>{const t=e.target;if(t.closest('button[data-action="new-partner"]')){dt("form",null);return}if(t.closest("#btn-search-partners")){F.searchQuery=document.getElementById("filterSearch").value,F.categoryFilter=document.getElementById("filterCategory").value,F.stateFilter=document.getElementById("filterState").value,F.cityFilter=document.getElementById("filterCity").value,F.sortBy=document.getElementById("filterSortBy").value,F.hasSearched=!0,el();return}if(t.closest('button[data-action="back-to-list"]')){dt("list");return}const a=t.closest('button[data-action="delete-partner"]');if(a){e.preventDefault(),al(a.dataset.id);return}const r=t.closest('[data-action="open-form"]');if(r&&!t.closest("button")){const s=JSON.parse(r.dataset.item.replace(/&apos;/g,"'"));dt("form",s)}},Nt.addEventListener("click",It),Nt.addEventListener("keypress",e=>{e.key==="Enter"&&(e.target.id==="filterSearch"||e.target.id==="filterCity")&&document.getElementById("btn-search-partners").click()})}const ca=document.getElementById("content"),hs={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let ce=new Set,Lt=null,Fe=null,jt=[];function Ft(){const e=ne.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}function ol(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function rl(e){return e.length===0?'<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>':e.map(t=>{const a=t.status==="inactive",r=h(t.name),s=h(t.specialty||"Especialidade"),o=t.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,i=JSON.stringify(t).replace(/'/g,"&apos;"),n=t.accessibleIn?t.accessibleIn.length:1,d=n>1?`<span class="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded ml-2 border border-indigo-200" title="Atende em ${n} unidades"><i class="bi bi-diagram-3"></i> ${n} Lojas</span>`:"";return`
            <div class="professional-card bg-white rounded-lg shadow-md flex items-center gap-4 p-3 cursor-pointer transition-transform transform hover:shadow-lg hover:bg-gray-50
                        sm:flex-col sm:items-stretch sm:p-0 sm:gap-0 ${a?"opacity-50 bg-gray-100":""}" 
                 data-action="open-professional-modal" data-professional='${i}'>
                
                <img src="${o}" alt="Foto de ${r}" class="w-16 h-16 rounded-full object-cover flex-shrink-0
                            sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg">
                
                <div class="flex-1 sm:p-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-sm font-bold text-gray-900 text-left sm:text-base flex items-center">
                                ${r} ${d}
                            </h3>
                            <p class="text-xs text-gray-500 text-left sm:text-sm mt-0.5">${s}</p>
                        </div>
                        <span class="text-[10px] font-bold py-1 px-2 rounded-full hidden sm:inline-block uppercase tracking-wider ${a?"bg-red-100 text-red-700":"bg-green-100 text-green-700"}">
                            ${a?"Inativo":"Ativo"}
                        </span>
                    </div>
                    <div class="mt-2 pt-2 border-t sm:hidden">
                        <span class="text-xs font-semibold ${a?"text-red-700":"text-green-700"}">${a?"Inativo":"Ativo"}</span>
                    </div>
                    <div class="hidden sm:block mt-3 pt-3 border-t">
                        <p class="text-xs text-gray-600">Serviços Habilitados: <span class="font-semibold text-indigo-600">${t.services?.length||0}</span></p>
                    </div>
                </div>
            </div>`}).join("")}function ua(){const e=document.getElementById("genericModal");e.style.display="none",Fe&&e.removeEventListener("click",Fe)}async function il(e){const t=document.getElementById("genericModal"),a=e.id?e:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},r=h(a.name),s=p.services||await Be(p.establishmentId),o=p.professionals||await le(p.establishmentId),i=`
        <div class="modal-content max-w-5xl p-0 overflow-y-auto max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b bg-white sticky top-0 z-10">
                <h2 class="text-2xl font-bold text-gray-800">${r}</h2>
                <button data-action="close-modal" class="text-gray-400 hover:text-red-500 transition-colors text-3xl leading-none">&times;</button>
            </div>
            <div class="modal-tabs px-6 border-b flex items-center overflow-x-auto bg-gray-50/50">
                <button class="tab-link active whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-indigo-600 text-indigo-600" data-tab="cadastro">Cadastro e Rede</button>
                <button class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700" data-tab="jornada">Jornada Semanal</button>
                <button class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700" data-tab="bloqueios">Bloqueios e Férias</button>
            </div>
            <div class="modal-body p-6 bg-white flex-1 overflow-y-auto"> 
                <div id="cadastro" class="tab-content active"><form id="professionalForm" class="space-y-6"></form></div>
                <div id="jornada" class="tab-content hidden"></div>
                <div id="bloqueios" class="tab-content hidden"></div>
            </div>
            <div class="modal-footer px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
                
                <button 
                    type="button" 
                    data-action="delete-professional" 
                    data-id="${a.id||""}" 
                    class="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-colors ${a.id?"":"hidden"}" 
                    title="Excluir Profissional"
                >
                    <i class="bi bi-trash3 mr-1"></i> Excluir Profissional
                </button>

                <div class="flex gap-3">
                    <button data-action="close-modal" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 shadow-sm transition-colors">Cancelar</button>
                    <button type="button" data-action="save-professional" class="py-2.5 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm flex items-center gap-2 transition-colors">
                        <i class="bi bi-save"></i> Salvar
                    </button>
                </div>
            </div>
        </div>`;t.innerHTML=i,t.style.display="flex",ll(a,s),dl(a),cl(a,o),pl(a)}function nl(e=[]){if(!jt||jt.length===0)return`
            <input type="hidden" name="accessibleIn" value="${p.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                <i class="bi bi-info-circle mr-1"></i> Profissional exclusivo desta unidade.
            </div>`;let t='<div class="space-y-1 mt-2 max-h-48 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30">';return jt.forEach(a=>{const r=e.includes(a.id)||e.length===0&&a.id===p.establishmentId;t+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${r?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${h(a.name)} (Matriz)</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(s=>{const o=e.includes(s.id)||e.length===0&&s.id===p.establishmentId;t+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${s.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${h(s.name)}</span>
                    </label>
                `})}),t+="</div>",t}function ll(e,t){const a=document.getElementById("professionalForm"),r=e.dob?e.dob.split("/"):["",""],s=Array.from({length:12},(f,E)=>{const S=E+1,k=S==r[1]?"selected":"",T=new Date(0,E).toLocaleString("pt-BR",{month:"long"});return`<option value="${S}" ${k}>${T.charAt(0).toUpperCase()+T.slice(1)}</option>`}).join(""),o=e.status||"active",i=h(e.name||""),n=h(e.specialty||""),d=h(e.phone||""),l=h(e.notes||"");a.innerHTML=`
        <input type="hidden" id="professionalId" value="${e.id||""}">
        <input type="hidden" id="profPhotoBase64" value="${e.photo||""}">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="md:col-span-1 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Foto de Perfil</label>
                    <div class="flex flex-col items-center p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                        <img id="profPhotoPreview" src="${e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`}" alt="Foto de Perfil" class="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-sm">
                        <input type="file" id="profPhotoInput" class="hidden" accept="image/*">
                        <button type="button" id="profPhotoButton" class="bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors w-full">Alterar Foto</button>
                    </div>
                </div>
                 <div class="form-group">
                    <label for="profStatus" class="block text-sm font-medium text-gray-700 mb-1">Status na Rede</label>
                    <select id="profStatus" class="mt-1 w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        <option value="active" ${o!=="inactive"?"selected":""}>Ativo</option>
                        <option value="inactive" ${o==="inactive"?"selected":""}>Inativo</option>
                    </select>
                </div>
            </div>

            <div class="md:col-span-2 space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="form-group"><label for="profName" class="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label><input type="text" id="profName" value="${i}" required class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profSpecialty" class="block text-sm font-medium text-gray-700 mb-1">Especialidade / Cargo</label><input type="text" id="profSpecialty" value="${n}" required class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profPhone" class="block text-sm font-medium text-gray-700 mb-1">WhatsApp / Telefone</label><input type="tel" id="profPhone" value="${d}" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profOrderOnAgenda" class="block text-sm font-medium text-gray-700 mb-1">Ordem de exibição na agenda</label><input type="number" id="profOrderOnAgenda" value="${e.orderOnAgenda||"1"}" min="1" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profDobDay" class="block text-sm font-medium text-gray-700 mb-1">Aniversário (Dia)</label><input type="number" id="profDobDay" value="${r[0]}" min="1" max="31" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profDobMonth" class="block text-sm font-medium text-gray-700 mb-1">Aniversário (Mês)</label><select id="profDobMonth" class="w-full p-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-500"><option value="">Selecione...</option>${s}</select></div>
                </div>
                 <div class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div class="form-group"><label for="profCommission" class="block text-sm font-medium text-gray-700 mb-1">Paga Comissão?</label><select id="profCommission" class="w-full p-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-500"><option value="sim" ${e.receivesCommission?"selected":""}>Sim</option><option value="nao" ${e.receivesCommission?"":"selected"}>Não</option></select></div>
                    <div class="form-group"><label for="profShowOnAgenda" class="block text-sm font-medium text-gray-700 mb-1">Exibir aos Clientes (App)</label><select id="profShowOnAgenda" class="w-full p-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-500"><option value="sim" ${e.showOnAgenda!==!1?"selected":""}>Sim</option><option value="nao" ${e.showOnAgenda===!1?"selected":""}>Não</option></select></div>
                </div>
            </div>
        </div>

        <div class="pt-6 border-t border-gray-100">
            <label class="block text-base font-bold text-indigo-900 mb-1">
                <i class="bi bi-diagram-3 mr-1"></i> Locais de Atendimento
            </label>
            <p class="text-xs text-gray-500 mb-3">Marque em quais unidades da rede este profissional trabalha e recebe agendamentos.</p>
            ${nl(e.accessibleIn||[])}
        </div>

        <div class="pt-6 border-t border-gray-100">
            <label class="block text-base font-bold text-gray-800 mb-3">Serviços que realiza</label>
            <div id="profServicesContainer" class="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50 max-h-64 overflow-y-auto">
                ${t.map(f=>`
                    <label class="flex items-center space-x-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm">
                        <input type="checkbox" value="${f.id}" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" ${e.services?.includes(f.id)?"checked":""}>
                        <span class="text-sm font-medium text-gray-700">${h(f.name)}</span>
                    </label>
                `).join("")}
            </div>
        </div>

        <div class="form-group pt-4">
            <label for="profNotes" class="block text-sm font-medium text-gray-700 mb-1">Observações Internas</label>
            <textarea id="profNotes" rows="3" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">${l}</textarea>
        </div>`;const c=document.getElementById("profPhotoInput"),u=document.getElementById("profPhotoButton"),m=document.getElementById("profPhotoPreview"),x=document.getElementById("profPhotoBase64"),b=e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,v=e.photo||"";u&&u.addEventListener("click",()=>c.click()),c&&(c.onchange=async()=>{const f=c.files[0];if(f){m.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const E=await Ks(f,800,800,.8),k=E.length*3/4,T=1e3*1024;if(k>T)throw new Error("A imagem é muito grande mesmo após a compressão.");m.src=E,x.value=E}catch(E){g("Erro de Imagem",E.message||"Não foi possível processar a imagem.","error"),m.src=b,x.value=v,c.value=""}}})}function dl(e){const t=document.getElementById("jornada");t.innerHTML=`
        <div class="max-w-4xl mx-auto">
            <h3 class="text-xl font-bold text-gray-800 mb-2">Jornada de Trabalho Semanal</h3>
            <p class="text-sm text-gray-500 mb-6">Defina os dias e os horários em que este profissional atende.</p>
            <div id="profScheduleContainer" class="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
        </div>`,ul(t.querySelector("#profScheduleContainer"),e.workingHours||{})}async function cl(e,t){const a=document.getElementById("bloqueios");a.innerHTML=`
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div>
                <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><i class="bi bi-calendar-x text-orange-500"></i> Lançar Bloqueio / Férias</h3>
                <form id="batchBlockageForm" class="p-5 bg-orange-50/50 border border-orange-100 rounded-xl space-y-4">
                    <div>
                        <h4 class="font-bold text-gray-700 mb-2 text-sm">Aplicar aos Profissionais:</h4>
                        <div id="batchProfSelectionContainer" class="max-h-40 overflow-y-auto p-3 border border-orange-200 rounded-lg bg-white space-y-2 shadow-sm">
                            ${t.map(o=>`
                                <label class="flex items-center space-x-3 hover:bg-orange-50 p-1 rounded cursor-pointer transition-colors">
                                    <input type="checkbox" name="batch-professionals" value="${o.id}" class="rounded border-gray-300 text-orange-500 focus:ring-orange-500" ${o.id===e.id?"checked":""}>
                                    <span class="text-sm font-medium text-gray-700">${h(o.name)}</span>
                                </label>`).join("")}
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label for="batchBlockageStartDate" class="block text-sm font-medium text-gray-700 mb-1">Data Início</label><input type="date" id="batchBlockageStartDate" required class="w-full p-2.5 border border-gray-300 rounded-lg"></div>
                        <div><label for="batchBlockageEndDate" class="block text-sm font-medium text-gray-700 mb-1">Data Fim (Opcional)</label><input type="date" id="batchBlockageEndDate" class="w-full p-2.5 border border-gray-300 rounded-lg"></div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="block text-sm font-medium text-gray-700 mb-1">Início</label><input type="time" id="batchBlockageStartTime" required class="w-full p-2.5 border border-gray-300 rounded-lg"></div>
                        <div><label class="block text-sm font-medium text-gray-700 mb-1">Fim</label><input type="time" id="batchBlockageEndTime" required class="w-full p-2.5 border border-gray-300 rounded-lg"></div>
                    </div>
                    <div><label class="block text-sm font-medium text-gray-700 mb-1">Motivo / Descrição</label><input type="text" id="batchBlockageReason" placeholder="Ex: Férias, Médico, Casamento" class="w-full p-2.5 border border-gray-300 rounded-lg"></div>
                    <button type="submit" class="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 shadow-sm transition-colors mt-2">Gravar Bloqueio</button>
                </form>
            </div>
            <div>
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                    <h3 class="text-xl font-bold text-gray-800">Registos de ${h(e.name.split(" ")[0])}</h3>
                    <select id="prof-blockages-filter" class="p-2 border border-gray-300 rounded-lg text-sm bg-white font-medium outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="future">Apenas Futuros</option>
                        <option value="history">Histórico Passado</option>
                    </select>
                </div>
                <div id="blockagesList" class="space-y-3 max-h-[500px] overflow-y-auto pr-2"></div>
            </div>
        </div>`;const r=document.getElementById("batchBlockageForm");r&&r.addEventListener("submit",async o=>{o.preventDefault();const i=r.querySelector('button[type="submit"]'),n=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm"></span> A gravar...';const d=Array.from(o.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(v=>v.value);if(d.length===0)return i.disabled=!1,i.innerHTML=n,g("Atenção","Selecione pelo menos um profissional.","error");const l=o.target.batchBlockageStartDate.value,c=o.target.batchBlockageEndDate.value||l,u=o.target.batchBlockageStartTime.value,m=o.target.batchBlockageEndTime.value,x=o.target.batchBlockageReason.value;if(!l||!u||!m)return i.disabled=!1,i.innerHTML=n,g("Atenção","Preencha Data de Início, Hora de Início e Fim.","error");const b=d.map(v=>{const f={professionalId:v,establishmentId:p.establishmentId,startTime:new Date(`${l}T${u}`).toISOString(),endTime:new Date(`${c}T${m}`).toISOString(),reason:x};return Kt(f)});try{await Promise.all(b),g("Sucesso!",`${d.length} bloqueios foram criados.`),r.reset(),o.target.querySelectorAll('input[name="batch-professionals"]').forEach(f=>{f.checked=f.value===e.id});const v=document.getElementById("prof-blockages-filter").value;ct(e.id,v)}catch(v){g("Erro",v.message,"error")}finally{i.disabled=!1,i.innerHTML=n}}),document.getElementById("prof-blockages-filter").addEventListener("change",o=>ct(e.id,o.target.value)),await ct(e.id,"future")}function ul(e,t){e.innerHTML=Object.keys(hs).map(a=>{const r=t[a]||{},s=r.active!==!1;return`
            <div class="day-schedule-card p-4 rounded-xl ${s?"bg-white border-gray-200 shadow-sm":"bg-gray-50 border-gray-100 disabled opacity-60"} border transition-all">
                 <div class="flex justify-between items-center mb-3">
                    <span class="font-bold text-gray-800">${hs[a]}</span>
                    <label class="flex items-center cursor-pointer">
                        <div class="relative">
                            <input type="checkbox" data-day="${a}" data-field="active" class="sr-only" ${s?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </div>
                    </label>
                 </div>
                <div class="time-inputs grid grid-cols-2 gap-3 mt-2 text-sm">
                    <div><label class="text-xs text-gray-500 font-medium">Abertura:</label><input type="time" data-day="${a}" data-field="start" value="${r.start||"09:00"}" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${s?"":"disabled"}></div>
                    <div><label class="text-xs text-gray-500 font-medium">Fecho:</label><input type="time" data-day="${a}" data-field="end" value="${r.end||"18:00"}" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${s?"":"disabled"}></div>
                    <div><label class="text-xs text-gray-500 font-medium">Início Pausa:</label><input type="time" data-day="${a}" data-field="breakStart" value="${r.breakStart||"12:00"}" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${s?"":"disabled"}></div>
                    <div><label class="text-xs text-gray-500 font-medium">Fim Pausa:</label><input type="time" data-day="${a}" data-field="breakEnd" value="${r.breakEnd||"13:00"}" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${s?"":"disabled"}></div>
                </div>
            </div>`}).join(""),e.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",r=>{const s=r.target.closest(".day-schedule-card"),o=!r.target.checked;s.classList.toggle("bg-white",!o),s.classList.toggle("shadow-sm",!o),s.classList.toggle("border-gray-200",!o),s.classList.toggle("bg-gray-50",o),s.classList.toggle("border-gray-100",o),s.classList.toggle("opacity-60",o),s.classList.toggle("disabled",o),s.querySelectorAll(".time-inputs input").forEach(i=>i.disabled=o)})})}async function ct(e,t="future"){const a=document.getElementById("blockagesList");if(a){a.innerHTML='<div class="loader mx-auto mt-6"></div>';try{const r=new Date;let s,o;t==="history"?(o=new Date,s=new Date,s.setFullYear(s.getFullYear()-2)):(s=new Date,o=new Date,o.setFullYear(o.getFullYear()+2));let n=(await Zt(p.establishmentId,s.toISOString(),o.toISOString(),e)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));t==="history"?n=n.filter(l=>l.endTime<r).sort((l,c)=>c.startTime-l.startTime):n=n.filter(l=>l.endTime>=r).sort((l,c)=>l.startTime-c.startTime);const d=n.reduce((l,c)=>{const u=c.reason||"Sem motivo detalhado";return l[u]||(l[u]=[]),l[u].push(c),l},{});if(Object.keys(d).length===0){a.innerHTML=`
                <div class="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <i class="bi bi-calendar-check text-3xl text-gray-300 mb-2 block"></i>
                    <p class="text-gray-500 font-medium">Nenhum bloqueio ${t==="history"?"no histórico":"agendado para o futuro"}.</p>
                </div>`;return}a.innerHTML=Object.entries(d).map(([l,c])=>`
            <div class="bg-white border border-gray-200 rounded-xl shadow-sm mb-4 overflow-hidden">
                <div class="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                    <h4 class="font-bold text-gray-800 flex items-center gap-2"><i class="bi bi-tag text-orange-500"></i> ${h(l)}</h4>
                    ${c.length>1?`<button data-action="batch-delete-blockage" data-ids='${JSON.stringify(c.map(u=>u.id))}' class="text-xs text-red-600 bg-red-50 hover:bg-red-100 font-bold px-2 py-1 rounded transition-colors">Apagar Grupo (${c.length})</button>`:""}
                </div>
                <div class="divide-y divide-gray-100">
                ${c.map(u=>`
                    <div class="flex justify-between items-center p-3 hover:bg-gray-50 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="bg-orange-100 text-orange-600 w-10 h-10 rounded-lg flex flex-col items-center justify-center leading-none">
                                <span class="font-bold text-sm">${u.startTime.getDate().toString().padStart(2,"0")}</span>
                                <span class="text-[9px] uppercase font-bold">${u.startTime.toLocaleString("pt-BR",{month:"short"})}</span>
                            </div>
                            <div>
                                <p class="text-sm font-bold text-gray-700">
                                   ${u.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} até ${u.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}
                                </p>
                                ${u.startTime.getDate()!==u.endTime.getDate()?`<p class="text-xs text-gray-400">Termina em ${u.endTime.toLocaleDateString("pt-BR")}</p>`:""}
                            </div>
                        </div>
                        <button data-action="delete-blockage" data-id="${u.id}" class="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors" title="Apagar Dia">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                `).join("")}
                </div>
            </div>
        `).join("")}catch(r){a.innerHTML=`<p class="text-red-500 p-4">${r.message}</p>`}}}function pl(e){const t=document.getElementById("genericModal");Fe&&t.removeEventListener("click",Fe),Fe=async a=>{const r=a.target.closest("button[data-action]");if(!r){const o=a.target.closest(".tab-link");o&&(t.querySelectorAll(".tab-link").forEach(i=>{i.classList.remove("active","border-indigo-600","text-indigo-600"),i.classList.add("border-transparent","text-gray-500")}),o.classList.add("active","border-indigo-600","text-indigo-600"),o.classList.remove("border-transparent","text-gray-500"),t.querySelectorAll(".tab-content").forEach(i=>i.classList.add("hidden")),document.getElementById(o.dataset.tab).classList.remove("hidden"));return}const s=r.dataset.action;switch(a.stopPropagation(),s){case"close-modal":ua();break;case"delete-professional":const o=r.dataset.id;if(await W("Excluir Profissional",`Tem certeza que deseja excluir ${e.name}? Esta ação não pode ser desfeita e ele será removido da agenda e de todas as lojas.`))try{await eo(o),me(p.establishmentId,Ft(),"Equipe","Excluiu",`Excluiu profissional: ${e.name}`),g("Sucesso!","Profissional excluído da rede.","success"),ua(),_t()}catch(S){g("Erro",`Não foi possível excluir: ${S.message}`,"error")}break;case"save-professional":const n=document.getElementById("professionalForm"),d=r,l=document.getElementById("profScheduleContainer"),c=Array.from(n.querySelectorAll("#profServicesContainer input:checked")).map(S=>S.value),u={};l&&l.querySelectorAll(".day-schedule-card").forEach(S=>{const k=S.querySelector('[data-field="active"]').dataset.day;u[k]={active:S.querySelector('[data-field="active"]').checked,start:S.querySelector('[data-field="start"]').value,end:S.querySelector('[data-field="end"]').value,breakStart:S.querySelector('[data-field="breakStart"]').value,breakEnd:S.querySelector('[data-field="breakEnd"]').value}});const m=Array.from(n.querySelectorAll('input[name="accessibleIn"]:checked')).map(S=>S.value),x=m.length>0?m:[p.establishmentId],b={...e,id:n.querySelector("#professionalId").value||void 0,accessibleIn:x,name:n.querySelector("#profName").value.trim(),specialty:n.querySelector("#profSpecialty").value,photo:n.querySelector("#profPhotoBase64").value,services:c,workingHours:u,phone:n.querySelector("#profPhone").value,dob:`${n.querySelector("#profDobDay").value}/${n.querySelector("#profDobMonth").value}`,receivesCommission:n.querySelector("#profCommission").value==="sim",showOnAgenda:n.querySelector("#profShowOnAgenda").value==="sim",orderOnAgenda:parseInt(n.querySelector("#profOrderOnAgenda").value)||1,notes:n.querySelector("#profNotes").value,status:n.querySelector("#profStatus").value,establishmentId:p.establishmentId},v=d.innerHTML;d.disabled=!0,d.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{b.id?(await ri(b.id,b),me(p.establishmentId,Ft(),"Equipe","Editou",`Editou o profissional: ${b.name}`),g("Sucesso!","Dados atualizados.","success")):(delete b.id,await oi(b),me(p.establishmentId,Ft(),"Equipe","Criou",`Cadastrou o profissional: ${b.name}`),g("Sucesso!","Novo membro adicionado à equipe.","success")),ua(),_t()}catch(S){g("Erro",S.message,"error"),d.disabled=!1,d.innerHTML=v}break;case"delete-blockage":const f=r.dataset.id;if(await W("Apagar Bloqueio","O profissional voltará a ficar disponível na agenda neste dia. Confirma?"))try{await Na(f),g("Bloqueio removido.","success");const S=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";ct(e.id,S)}catch(S){g("Erro",S.message,"error")}break;case"batch-delete-blockage":const E=JSON.parse(r.dataset.ids);if(await W("Apagar em Lote",`Tem certeza que deseja apagar ${E.length} dias de bloqueio de uma vez?`))try{await to(E),g("Bloqueios removidos.","success");const S=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";ct(e.id,S)}catch(S){g("Erro",S.message,"error")}break}},t.addEventListener("click",Fe)}function Ea(){const e=document.getElementById("batch-actions-container"),t=document.getElementById("selected-count");!e||!t||(ce.size>0?(t.textContent=`${ce.size} selecionado(s)`,e.classList.remove("hidden"),e.classList.add("flex")):(e.classList.add("hidden"),e.classList.remove("flex")))}function ml(){W("Excluir em Lote",`Tem certeza que deseja excluir ${ce.size} profissionais da rede? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{await ii(Array.from(ce)),me(p.establishmentId,Ft(),"Equipe","Excluiu em Lote",`Excluiu ${ce.size} profissionais`),g("Sucesso!",`${ce.size} profissionais foram excluídos.`,"success"),ce.clear(),Ea(),_t()}catch(t){g("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}function et(){const e=document.getElementById("professionalsList");if(!e)return;if(!p.professionals){e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=ol();return}const t=document.getElementById("showInactiveProfToggle").checked,a=document.getElementById("profSearchInput").value.toLowerCase(),r=p.professionals.filter(s=>{const o=s.name.toLowerCase().includes(a),i=t||s.status!=="inactive";return o&&i});e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=rl(r)}async function _t(){ce.clear(),ca.innerHTML=`
        <section id="professional-list-view" class="p-4 sm:p-6 max-w-7xl mx-auto">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                
                <div class="mb-8 border-b border-gray-100 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800">Equipa e Profissionais</h2>
                        <p class="text-sm text-gray-500 mt-1">Gira os membros da equipa e defina em quais lojas eles atendem.</p>
                    </div>
                    <button data-action="open-professional-modal" data-professional="{}" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-5 rounded-lg transition-colors shadow-sm flex items-center gap-2">
                        <i class="bi bi-person-plus-fill"></i> Novo Profissional
                    </button>
                </div>

                <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div class="relative w-full md:w-96">
                        <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input type="search" id="profSearchInput" placeholder="Pesquisar por nome..." class="w-full pl-10 p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm">
                    </div>
                    
                    <label class="flex items-center space-x-3 cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full md:w-auto shadow-sm">
                        <div class="relative">
                            <input type="checkbox" id="showInactiveProfToggle" class="sr-only">
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </div>
                        <span class="text-sm font-bold text-gray-700">Mostrar Inativos</span>
                    </label>
                </div>

                <div id="batch-actions-container" class="hidden bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl shadow-sm mb-6 justify-between items-center transition-all">
                    <span id="selected-count" class="font-bold text-lg"><i class="bi bi-check2-square"></i> </span>
                    <button data-action="batch-delete" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg shadow-sm flex items-center gap-2 transition-colors">
                        <i class="bi bi-trash3"></i> Excluir Todos
                    </button>
                </div>

                <div id="professionalsList" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
                    </div>
            </div>
        </section>`,Lt&&ca.removeEventListener("click",Lt),Lt=t=>{const a=t.target.closest('[data-action="open-professional-modal"]'),r=t.target.closest('[data-action="batch-delete"]');if(a){t.preventDefault();let o={};if(a.dataset.professional)try{o=JSON.parse(a.dataset.professional)}catch(i){console.error("Erro ao fazer parse do professional data:",i);return}il(o);return}if(r){ml();return}const s=t.target.closest(".professional-checkbox");if(s){const o=s.dataset.id;s.checked?ce.add(o):ce.delete(o),et(),Ea();return}},ca.addEventListener("click",Lt),document.getElementById("profSearchInput").addEventListener("input",et),document.getElementById("showInactiveProfToggle").addEventListener("change",et);const e=document.getElementById("professionalsList");p.professionals=null,p.services=null,et();try{const[t,a,r]=await Promise.all([le(p.establishmentId),Be(p.establishmentId),Te()]);p.professionals=t,p.services=a,jt=r?.matrizes||[],et(),Ea()}catch{e.innerHTML='<p class="text-red-500 col-span-full font-bold text-center py-10 bg-red-50 rounded-lg border border-red-100">Erro ao carregar dados do servidor.</p>'}}let $={clients:[],selectedClient:null,activeTab:"profile",filters:{search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},showFilters:!1,loading:!1,historyLimit:20,historySearchTerm:"",historyLoading:!1,historyData:{appointments:[],sales:[],loyaltyLog:[]},modalOpen:!1},Io=null;const gl=e=>e?String(e).replace(/\D/g,""):"",bl=e=>{if(!e)return"Nunca";let t;if(typeof e=="object"&&(e.seconds||e._seconds)){const a=e.seconds||e._seconds;t=new Date(a*1e3)}else t=new Date(e);return isNaN(t.getTime())?"Data Inválida":t.toLocaleDateString("pt-BR")};function Ga(){Io.innerHTML=`
        <section class="h-[calc(100vh-4rem)] sm:h-full flex flex-col bg-gray-50 overflow-x-hidden w-full">
            <div class="bg-white border-b shadow-sm z-30 flex-shrink-0">
                <div class="p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-3 max-w-7xl mx-auto w-full">
                    <div class="w-full sm:w-auto text-center sm:text-left">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Clientes</h2>
                        <p class="text-xs text-gray-500 hidden sm:block">Gerencie sua base de contatos</p>
                    </div>
                    
                    <div class="w-full sm:w-auto flex gap-2">
                        <button id="btn-new-client" class="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition shadow flex items-center justify-center gap-2 text-sm font-bold active:scale-95 transform duration-150">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            Novo
                        </button>
                    </div>
                </div>
            </div>

            <div id="clients-content-area" class="flex-grow overflow-y-auto custom-scrollbar w-full max-w-7xl mx-auto relative">
                ${$.loading?'<div class="flex justify-center pt-20"><div class="loader"></div></div>':""}
            </div>
        </section>
    `;const e=document.getElementById("btn-new-client");e&&(e.onclick=$l)}function ht(){if($.modalOpen)return;Ga();const e=document.getElementById("clients-content-area"),t=$.filters.inactiveDays||$.filters.birthMonth||$.filters.hasLoyalty||$.filters.hasDebt,a=`
        <div class="sticky top-0 bg-gray-50 z-20 px-3 sm:px-4 pt-4 pb-2 w-full">
            <div class="flex gap-2 items-center">
                <div class="relative flex-grow shadow-sm">
                    <input type="text" id="client-search" 
                        class="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition bg-white" 
                        placeholder="Buscar cliente..." 
                        value="${$.filters.search}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                
                <button id="btn-toggle-filters" class="flex-shrink-0 p-3 rounded-xl border transition flex items-center gap-2 font-medium ${$.showFilters||t?"bg-indigo-50 border-indigo-200 text-indigo-700":"bg-white border-gray-300 text-gray-600 hover:bg-gray-50"}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                    <span class="hidden sm:inline">Filtros</span>
                    ${t?'<span class="flex h-2 w-2 rounded-full bg-indigo-600"></span>':""}
                </button>
            </div>

            <div id="filter-panel" class="${$.showFilters?"max-h-96 opacity-100 mt-3":"max-h-0 opacity-0 overflow-hidden"} transition-all duration-300 ease-in-out">
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase">Dias Ausente (Min)</label>
                        <div class="relative">
                            <input type="number" id="filter-inactive" min="1"
                                class="w-full p-2.5 pl-9 rounded-lg border border-gray-300 focus:ring-indigo-500 text-sm bg-gray-50 outline-none" 
                                placeholder="Ex: 30 dias" 
                                value="${$.filters.inactiveDays}">
                            <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                    </div>

                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase">Aniversário em</label>
                        <select id="filter-birth-month" class="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-indigo-500 text-sm bg-gray-50 outline-none">
                            <option value="">Todos os meses</option>
                            <option value="1">Janeiro</option>
                            <option value="2">Fevereiro</option>
                            <option value="3">Março</option>
                            <option value="4">Abril</option>
                            <option value="5">Maio</option>
                            <option value="6">Junho</option>
                            <option value="7">Julho</option>
                            <option value="8">Agosto</option>
                            <option value="9">Setembro</option>
                            <option value="10">Outubro</option>
                            <option value="11">Novembro</option>
                            <option value="12">Dezembro</option>
                        </select>
                    </div>

                    <div class="flex flex-col justify-center gap-2 pt-4 sm:pt-0">
                        <label class="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded transition">
                            <input type="checkbox" id="filter-loyalty" class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" ${$.filters.hasLoyalty?"checked":""}>
                            <span class="ml-2 text-sm text-gray-700 font-medium">Com Pontos Fidelidade</span>
                        </label>
                        <label class="flex items-center cursor-pointer hover:bg-red-50 p-1 rounded transition">
                            <input type="checkbox" id="filter-debt" class="rounded text-red-600 focus:ring-red-500 w-4 h-4" ${$.filters.hasDebt?"checked":""}>
                            <span class="ml-2 text-sm font-semibold text-red-600">Com Débitos (Fiado)</span>
                        </label>
                    </div>

                    <div class="flex items-end">
                        <button id="btn-apply-filters" class="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-bold shadow hover:bg-gray-800 transition active:scale-95">
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,r=$.clients.length>0?`
        <div class="px-3 sm:px-4 pb-20 pt-2 w-full">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                ${$.clients.map(c=>{const u=c.totalDebt&&parseFloat(c.totalDebt)>0,m=bl(c.lastVisit);return`
                    <div class="client-card bg-white p-3 sm:p-4 rounded-xl border ${u?"border-l-4 border-l-red-500 border-y-red-100 border-r-red-100":"border-gray-200 border-l-4 border-l-indigo-500"} shadow-sm hover:shadow-md transition cursor-pointer active:bg-gray-50 flex items-center gap-3 group" data-id="${c.id}">
                        
                        <div class="w-12 h-12 rounded-full ${u?"bg-red-100 text-red-600":"bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"} transition-colors flex items-center justify-center font-bold text-lg flex-shrink-0">
                            ${c.name.charAt(0).toUpperCase()}
                        </div>
                        
                        <div class="flex-grow min-w-0">
                            <div class="flex justify-between items-start">
                                <h3 class="font-bold text-gray-800 truncate text-base">${h(c.name)}</h3>
                                ${c.dobDay&&c.dobMonth==new Date().getMonth()+1?'<span class="text-xs bg-pink-100 text-pink-600 px-1.5 py-0.5 rounded font-bold">🎂 Mês</span>':""}
                            </div>
                            <p class="text-sm text-gray-500 truncate">${c.phone||"Sem telefone"}</p>
                            
                            <div class="flex flex-wrap gap-2 mt-1.5 items-center">
                                ${c.loyaltyPoints?`<span class="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">⭐ ${c.loyaltyPoints}</span>`:""}
                                ${u?`<span class="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full border border-red-200">Devendo: R$ ${parseFloat(c.totalDebt).toFixed(2)}</span>`:""}
                                <span class="text-[10px] text-gray-400 flex items-center gap-1 ml-auto">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    ${m==="Nunca"?"Novo":m}
                                </span>
                            </div>
                        </div>
                        
                        <div class="text-gray-300 group-hover:text-indigo-500 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    </div>
                `}).join("")}
            </div>
        </div>
    `:`
        <div class="text-center py-20 px-6 opacity-60">
            <div class="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <p class="text-xl font-bold text-gray-800 mb-2">Nenhum cliente encontrado</p>
            <p class="text-sm text-gray-500 max-w-xs mx-auto">Tente ajustar seus filtros de busca ou cadastre um novo cliente.</p>
            ${t?'<button id="btn-clear-search" class="mt-4 text-indigo-600 font-bold text-sm hover:underline">Limpar Filtros</button>':""}
        </div>
    `;e.innerHTML=a+r;const s=document.getElementById("client-search"),o=document.getElementById("btn-toggle-filters"),i=document.getElementById("btn-apply-filters"),n=document.getElementById("btn-clear-search");o&&(o.onclick=()=>{$.showFilters=!$.showFilters,ht()});const d=document.getElementById("filter-birth-month");d&&(d.value=$.filters.birthMonth);const l=()=>{const c=document.getElementById("filter-inactive"),u=document.getElementById("filter-loyalty"),m=document.getElementById("filter-debt"),x=document.getElementById("filter-birth-month");$.filters={search:s.value,inactiveDays:c?c.value:"",birthMonth:x?x.value:"",hasLoyalty:u?u.checked:!1,hasDebt:m?m.checked:!1},Ia()};i&&(i.onclick=l),n&&(n.onclick=()=>{$.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},$.showFilters=!1,Ia()}),s.addEventListener("keypress",c=>{c.key==="Enter"&&l()}),e.querySelectorAll(".client-card").forEach(c=>{c.onclick=()=>Lo(c.dataset.id)})}function fl(e){const t=`
        <div class="bg-white border-b sticky top-0 z-10 shadow-sm w-full">
            <div class="flex overflow-x-auto no-scrollbar gap-1 px-3 sm:px-4 py-1 w-full">
                <button class="tab-btn ${$.activeTab==="profile"?"active":""}" data-tab="profile">👤 Perfil</button>
                <button class="tab-btn ${$.activeTab==="appointments"?"active":""}" data-tab="appointments">📅 Agendamentos</button>
                <button class="tab-btn ${$.activeTab==="history"?"active":""}" data-tab="history">💰 Histórico</button>
                <button class="tab-btn ${$.activeTab==="loyalty"?"active":""}" data-tab="loyalty">⭐ Fidelidade</button>
            </div>
        </div>
    `;let a="";return $.activeTab==="profile"?a=vl(e):$.activeTab==="appointments"?a=yl():$.activeTab==="history"?a=wl():$.activeTab==="loyalty"&&(a=kl(e)),`
        <div class="w-full bg-white shadow-sm min-h-full flex flex-col overflow-x-hidden">
            <div class="bg-gradient-to-br from-indigo-600 to-purple-700 p-4 sm:p-6 text-white relative overflow-hidden flex-shrink-0">
                
                <button id="btn-close-modal" class="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-full transition z-50 bg-black/10 sm:bg-transparent">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-6 sm:pt-0">
                    <div class="w-20 h-20 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold shadow-lg ring-4 ring-white/20 flex-shrink-0">
                        ${e.name.charAt(0).toUpperCase()}
                    </div>
                    
                    <div class="text-center sm:text-left flex-grow min-w-0">
                        <h2 class="text-xl sm:text-2xl font-bold leading-tight break-words">${h(e.name)}</h2>
                        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-1 mt-1 opacity-90 text-sm">
                            <span>${e.phone||"Sem telefone"}</span>
                            <span class="hidden sm:inline">•</span>
                            <span class="truncate max-w-[200px]">${e.email||""}</span>
                        </div>
                        
                        ${e.totalDebt&&e.totalDebt>0?`
                            <div class="mt-3 inline-block bg-red-900/40 backdrop-blur-md border border-red-400/30 px-3 py-1.5 rounded-full max-w-full">
                                <p class="text-xs font-bold text-red-50 flex items-center justify-center sm:justify-start gap-1 truncate">
                                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Débito: R$ ${parseFloat(e.totalDebt).toFixed(2)}
                                </p>
                            </div>
                        `:""}
                    </div>
                    
                    <div class="mt-2 sm:mt-0 bg-white/10 p-3 rounded-xl backdrop-blur-sm text-center min-w-[100px] border border-white/10">
                        <p class="text-[10px] uppercase font-bold tracking-wide opacity-80">Fidelidade</p>
                        <p class="text-2xl font-extrabold text-yellow-300 drop-shadow-md">${e.loyaltyPoints||0}</p>
                    </div>
                </div>
            </div>

            ${t}

            <div class="p-3 sm:p-6 flex-grow relative bg-gray-50/50 overflow-y-auto custom-scrollbar">
                ${$.historyLoading?'<div class="absolute inset-0 bg-white/80 flex items-start justify-center pt-20 z-20"><div class="loader"></div></div>':""}
                <div class="animate-fade-in max-w-4xl mx-auto w-full pb-10">
                    ${a}
                </div>
            </div>
        </div>
    `}function xl(e,t){if(!document.getElementById("tabs-styles")){const o=document.createElement("style");o.id="tabs-styles",o.textContent=`
            .tab-btn { padding: 12px 16px; white-space: nowrap; font-size: 0.9rem; font-weight: 500; color: #6b7280; border-bottom: 2px solid transparent; transition: all 0.2s; flex-shrink: 0; }
            .tab-btn.active { color: #4f46e5; border-bottom-color: #4f46e5; font-weight: 700; background-color: #f3f4f6; border-top-left-radius: 8px; border-top-right-radius: 8px; }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `,e.appendChild(o)}if(e.querySelectorAll(".tab-btn").forEach(o=>{o.onclick=async()=>{const i=o.dataset.tab;if($.activeTab===i)return;(i==="appointments"||i==="history")&&($.historyLimit=20,$.historySearchTerm=""),$.activeTab=i,Ve(),i!=="profile"&&!$.historyLoading&&$.historyData.appointments.length===0&&await vs(t.id)}}),$.activeTab==="profile"){const o=e.querySelector("#form-edit-client"),i=e.querySelector("#btn-delete-client");o&&(o.onsubmit=El),i&&(i.onclick=Il)}if($.activeTab==="loyalty"){const o=e.querySelector("#btn-manual-redeem");o&&(o.onclick=()=>Sl(t))}const a=e.querySelector("#history-search-input");if(a){const o=a.value;a.value="",a.focus(),a.value=o,a.addEventListener("input",i=>{$.historySearchTerm=i.target.value,Ve()})}const r=e.querySelector("#btn-load-more");r&&(r.onclick=()=>{$.historyLimit+=20,Ve(),vs(t.id)}),e.querySelectorAll("[data-go-agenda]").forEach(o=>{o.onclick=i=>{_e(),J("agenda-section",{targetDate:new Date(o.dataset.date),scrollToAppointmentId:o.dataset.id})}}),e.querySelectorAll("[data-go-comanda]").forEach(o=>{o.onclick=i=>{_e(),J("comandas-section",{selectedAppointmentId:o.dataset.id,initialFilter:"finalizadas"})}});const s=e.querySelector("#btn-close-modal");s&&(s.onclick=_e)}async function Ve(){const e=$.selectedClient;if(!e){_e();return}hl(e)}function hl(e){let t=document.getElementById("client-details-modal-overlay");t||(t=document.createElement("div"),t.id="client-details-modal-overlay",t.className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-fade-in",t.innerHTML=`
            <div class="bg-white w-full h-full sm:h-[90vh] sm:max-w-5xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-in" id="client-modal-content">
            </div>
        `,t.onclick=r=>{r.target===t&&_e()},document.body.appendChild(t),document.body.classList.add("overflow-hidden"),$.modalOpen=!0);const a=t.querySelector("#client-modal-content");a.innerHTML=fl(e),xl(a,e)}function _e(){const e=document.getElementById("client-details-modal-overlay");e&&e.remove(),document.body.classList.remove("overflow-hidden"),$.modalOpen=!1,$.selectedClient=null,ht()}function vl(e){return`
        <form id="form-edit-client" class="space-y-5 w-full">
            <div class="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 shadow-sm w-full">
                <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    Dados Pessoais
                </h3>
                
                <div class="space-y-4 w-full">
                    <div class="w-full">
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Nome Completo</label>
                        <input type="text" name="name" value="${h(e.name)}" required class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Telefone</label>
                            <input type="tel" name="phone" value="${h(e.phone||"")}" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
                        </div>
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">E-mail</label>
                            <input type="email" name="email" value="${h(e.email||"")}" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 w-full">
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Dia Nasc.</label>
                            <input type="number" name="dobDay" min="1" max="31" value="${e.dobDay||""}" class="block w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-base text-center box-border">
                        </div>
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Mês Nasc.</label>
                            <input type="number" name="dobMonth" min="1" max="12" value="${e.dobMonth||""}" class="block w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-base text-center box-border">
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 shadow-sm w-full">
                <h3 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    Anotações
                </h3>
                <textarea name="notes" rows="4" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border" placeholder="Preferências, alergias...">${h(e.notes||"")}</textarea>
            </div>
            
            <div class="flex flex-col gap-3 pt-2 w-full">
                <button type="submit" class="w-full bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition transform active:scale-95 text-base">
                    Salvar Alterações
                </button>
                <button type="button" id="btn-delete-client" class="w-full bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 px-6 py-3 rounded-xl font-bold transition text-sm flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Excluir Cliente
                </button>
            </div>
        </form>
    `}function yl(e){let t=$.historyData.appointments||[];if($.historySearchTerm){const r=$.historySearchTerm.toLowerCase();t=t.filter(s=>s.serviceName&&s.serviceName.toLowerCase().includes(r)||s.professionalName&&s.professionalName.toLowerCase().includes(r))}t.sort((r,s)=>new Date(s.startTime)-new Date(r.startTime));const a=r=>{const s=new Date(r.startTime),o=s.toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).replace(".",""),i=s.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),n=s<new Date;let d=n?"Concluído":"Agendado",l=n?"bg-gray-200 text-gray-600":"bg-green-100 text-green-700";return r.status==="cancelled"&&(d="Cancelado",l="bg-red-100 text-red-600"),`
            <div class="relative bg-white border rounded-xl p-3 shadow-sm mb-3 flex gap-3 cursor-pointer active:scale-[0.99] transition w-full overflow-hidden"
                 data-go-agenda="true" data-id="${r.id}" data-date="${r.startTime}">
                
                <div class="flex-shrink-0 w-14 flex flex-col items-center justify-center rounded-lg bg-gray-100 border border-gray-200 p-1">
                    <span class="text-xs font-bold text-gray-500 uppercase">${o.split(" ")[0]}</span>
                    <span class="text-lg font-black text-gray-800 leading-none">${s.getDate()}</span>
                    <span class="text-[10px] text-gray-500">${i}</span>
                </div>

                <div class="flex-grow min-w-0 flex flex-col justify-center">
                    <h4 class="font-bold text-gray-800 text-sm truncate">${h(r.serviceName||"Serviço")}</h4>
                    <p class="text-xs text-gray-500 truncate">Prof: ${h(r.professionalName||"N/A")}</p>
                    <div class="mt-1">
                        <span class="inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${l}">
                            ${d}
                        </span>
                    </div>
                </div>

                <div class="flex items-center text-gray-300">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
            </div>
        `};return`
        <div class="space-y-4 w-full">
            <div class="sticky top-0 bg-gray-50 pt-2 pb-2 z-10 w-full">
                <div class="relative w-full">
                    <input type="text" id="history-search-input" 
                        class="w-full p-3 pl-10 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm" 
                        placeholder="Filtrar histórico..." 
                        value="${$.historySearchTerm}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            <div class="w-full">
                ${t.length?t.map(a).join(""):'<p class="text-center text-gray-400 py-10 italic">Nenhum agendamento encontrado.</p>'}
            </div>
            
            ${t.length>=$.historyLimit?`
            <button id="btn-load-more" class="w-full py-3 text-sm text-indigo-600 font-bold bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                Carregar mais antigos...
            </button>`:""}
        </div>
    `}function wl(e){let t=$.historyData.sales||[];if($.historySearchTerm){const a=$.historySearchTerm.toLowerCase();t=t.filter(r=>r.id.includes(a))}return t.sort((a,r)=>new Date(r.date)-new Date(a.date)),t.length===0&&!$.historySearchTerm?'<div class="text-center py-12 text-gray-400">Nenhum registro financeiro.</div>':`
        <div class="space-y-4 w-full">
            <div class="sticky top-0 bg-gray-50 pt-2 pb-2 z-10 w-full">
                <div class="relative w-full">
                    <input type="text" id="history-search-input" 
                        class="w-full p-3 pl-10 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm" 
                        placeholder="Buscar código da venda..." 
                        value="${$.historySearchTerm}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            <div class="space-y-3 w-full">
                ${t.map(a=>{const r=new Date(a.date||a.createdAt),s=a.totalAmount||0;return`
                    <div class="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-sm active:bg-gray-50 cursor-pointer w-full"
                         data-go-comanda="true" data-id="${a.id}">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <div>
                                <p class="font-bold text-gray-800 text-sm">Venda #${a.id.slice(-4)}</p>
                                <p class="text-xs text-gray-500">${r.toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-gray-900">R$ ${parseFloat(s).toFixed(2)}</p>
                            <p class="text-[10px] text-indigo-500 font-medium">Ver detalhes</p>
                        </div>
                    </div>
                    `}).join("")}
            </div>
            
             ${t.length>=$.historyLimit?`
            <button id="btn-load-more" class="w-full py-3 text-sm text-indigo-600 font-bold bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                Carregar mais...
            </button>`:""}
        </div>
    `}function kl(e){const t=$.historyData.loyaltyLog||[];t.sort((r,s)=>new Date(s.date)-new Date(r.date));const a=t.length>0?t.map(r=>{const s=r.type==="redemption";return`
            <div class="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 w-full">
                <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full ${s?"bg-red-500":"bg-green-500"}"></div>
                    <div>
                        <p class="text-sm font-medium text-gray-700">${h(r.description||(s?"Resgate":"Acúmulo"))}</p>
                        <p class="text-[10px] text-gray-400">${new Date(r.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <span class="font-bold text-sm ${s?"text-red-600":"text-green-600"}">
                    ${s?"-":"+"}${r.points}
                </span>
            </div>
        `}).join(""):'<p class="text-center text-gray-400 py-4 text-xs italic">Sem histórico recente.</p>';return`
        <div class="space-y-6 w-full">
            <div class="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden w-full">
                <div class="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
                    <svg class="w-40 h-40" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                
                <p class="text-amber-100 font-bold uppercase tracking-wider text-xs mb-1">Saldo de Pontos</p>
                <div class="flex items-baseline gap-2">
                    <h1 class="text-4xl sm:text-5xl font-black">${e.loyaltyPoints||0}</h1>
                    <span class="text-lg opacity-80">pts</span>
                </div>
                
                <button id="btn-manual-redeem" class="mt-4 w-full bg-white/20 hover:bg-white/30 text-white text-sm font-bold py-3 px-4 rounded-xl backdrop-blur-md transition border border-white/30 flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Ajustar / Resgatar
                </button>
            </div>

            <div class="bg-white rounded-xl border border-gray-200 p-4 shadow-sm w-full">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 border-b pb-2">Últimas Movimentações</h4>
                ${a}
            </div>
        </div>
    `}async function Ia(){$.loading=!0,Ga();try{let e=`/api/clients/${p.establishmentId}?limit=20`;$.filters.search&&(e+=`&search=${encodeURIComponent($.filters.search)}`),$.filters.inactiveDays&&(e+=`&inactiveDays=${$.filters.inactiveDays}`),$.filters.hasLoyalty&&(e+="&hasLoyalty=true"),$.filters.hasDebt&&(e+="&hasDebt=true"),$.clients=await I(e),ht()}catch(e){console.error(e),g("Erro","Falha ao carregar clientes.","error"),$.clients=[],ht()}finally{$.loading=!1;const e=document.querySelector(".loader");e&&e.parentElement&&e.parentElement.remove()}}async function vs(e){const t=$.selectedClient;if(!(!t||!t.phone)){$.historyLoading=!0;try{const a=new Date;a.setMonth(a.getMonth()+12);const r=new Date;r.setFullYear(r.getFullYear()-5);let s=`/api/appointments/${p.establishmentId}?startDate=${r.toISOString()}&endDate=${a.toISOString()}`;s+=`&clientPhone=${encodeURIComponent(gl(t.phone))}`,s+=`&limit=${$.historyLimit}`;const o=await I(s);$.historyData.appointments=o,$.historyData.sales=o.filter(n=>n.status==="completed").map(n=>({id:n.id,date:n.startTime,totalAmount:n.totalAmount||0,items:n.comandaItems||n.services||[]}));const i=[];o.forEach(n=>{n.status==="completed"&&n.loyaltyPointsEarned>0&&i.push({type:"earn",points:n.loyaltyPointsEarned,date:n.startTime,description:"Venda finalizada"}),n.loyaltyRedemption&&i.push({type:"redemption",points:n.loyaltyRedemption.cost||0,date:n.startTime,description:`Resgate: ${n.loyaltyRedemption.name}`})}),$.historyData.loyaltyLog=i}catch(a){console.error("Erro ao buscar histórico",a)}finally{$.historyLoading=!1,$.modalOpen&&$.selectedClient&&Ve()}}}function Sl(e){const t=e.loyaltyPoints||0,a=`
        <div class="text-center mb-6">
            <p class="text-xs text-gray-500 uppercase font-bold">Saldo Atual</p>
            <h2 class="text-4xl font-black text-gray-800">${t}</h2>
        </div>
        <form id="manual-redeem-form" class="space-y-4">
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tipo de Ajuste</label>
                <select id="redeem-action" class="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="debit">🔻 Remover Pontos (Resgate)</option>
                    <option value="credit">➕ Adicionar Pontos (Correção)</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Quantidade</label>
                <input type="number" id="redeem-points" min="1" required class="w-full p-3 border rounded-xl text-lg font-bold outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Motivo</label>
                <input type="text" id="redeem-reason" required class="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ex: Brinde entregue">
            </div>
            <div class="pt-4">
                <button type="submit" class="w-full bg-indigo-600 text-white px-4 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 active:scale-95 transition">Confirmar</button>
            </div>
        </form>
    `,{modalElement:r,close:s}=re({title:"Ajuste de Pontos",contentHTML:a,maxWidth:"w-[90%] max-w-xs"});r.querySelector("form").onsubmit=async o=>{o.preventDefault();const i=document.getElementById("redeem-action").value,n=parseInt(document.getElementById("redeem-points").value,10),d=document.getElementById("redeem-reason").value;if(!n||n<=0)return g("Erro","Qtd inválida.","error");if(i==="debit"&&n>t)return g("Erro","Saldo insuficiente.","error");try{let l=t;i==="debit"?(await Wr(p.establishmentId,e.phone,n,d),l-=n):(l+=n,await Zs(e.id,{loyaltyPoints:l})),$.selectedClient.loyaltyPoints=l,$.historyData.loyaltyLog.unshift({type:i==="debit"?"redemption":"earn",points:n,date:new Date().toISOString(),description:d+" (Manual)"}),g("Sucesso","Saldo atualizado.","success"),s(),Ve()}catch(l){g("Erro",l.message,"error")}}}function Lo(e){$.selectedClient=$.clients.find(t=>t.id===e),$.activeTab="profile",$.historyLimit=20,$.historySearchTerm="",$.historyData={appointments:[],sales:[],loyaltyLog:[]},Ve()}function $l(){const e=`
        <form id="modal-new-client-form" class="space-y-4">
            <div><label class="block text-sm font-bold text-gray-700 mb-1">Nome Completo *</label><input type="text" id="new-name" required class="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"></div>
            <div><label class="block text-sm font-bold text-gray-700 mb-1">Telefone (WhatsApp) *</label><input type="tel" id="new-phone" required class="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"></div>
            <div class="pt-4">
                <button type="submit" class="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:bg-indigo-700 active:scale-95 transition">Cadastrar</button>
            </div>
        </form>
    `,{modalElement:t,close:a}=re({title:"Novo Cliente",contentHTML:e,maxWidth:"w-[90%] max-w-sm"});t.querySelector("form").onsubmit=async r=>{r.preventDefault();const s=document.getElementById("new-name").value,o=document.getElementById("new-phone").value;try{const i=await Xs({establishmentId:p.establishmentId,name:s,phone:o});$.clients.unshift(i),g("Sucesso","Cliente criado!","success"),a(),Lo(i.id)}catch(i){g("Erro",i.message,"error")}}}async function El(e){e.preventDefault();const t=new FormData(e.target),a=Object.fromEntries(t.entries());a.establishmentId=p.establishmentId;try{await Zs($.selectedClient.id,a),Object.assign($.selectedClient,a);const r=$.clients.findIndex(s=>s.id===$.selectedClient.id);r!==-1&&($.clients[r]=$.selectedClient),g("Sucesso","Dados salvos!","success")}catch(r){g("Erro",r.message,"error")}}async function Il(){if(await W("Excluir Cliente","Tem certeza? O histórico será apagado."))try{await Ur($.selectedClient.id),$.clients=$.clients.filter(e=>e.id!==$.selectedClient.id),$.selectedClient=null,g("Sucesso","Cliente removido.","success"),_e(),ht()}catch(e){g("Erro",e.message,"error")}}async function Ll(){Io=document.getElementById("content"),$.selectedClient=null,$.searchTerm="",$.historyLimit=20,$.showFilters=!1,$.modalOpen=!1,$.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},Ga(),await Ia()}const Ee=document.getElementById("content"),pa={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},Cl={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}};let U=null,G=null;function Co(){return[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais da Unidade"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"whatsapp-bot",icon:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",label:"Atendente Virtual (WhatsApp)"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}]}function ys(e,t,a){return new Promise((r,s)=>{const o=new FileReader;o.readAsDataURL(e),o.onload=i=>{const n=new Image;n.src=i.target.result,n.onload=()=>{const d=document.createElement("canvas");let l=n.width,c=n.height;l>t&&(c*=t/l,l=t),d.width=l,d.height=c,d.getContext("2d").drawImage(n,0,0,l,c);const m=e.type==="image/png"&&t<500?"image/png":"image/jpeg";r(d.toDataURL(m,a))},n.onerror=d=>s(d)},o.onerror=i=>s(i)})}function qe(e,t=null){let a='<option value="">-- Selecione (Opcional) --</option>';const r=i=>{const n=new Map,d=[];return i&&(i.forEach(l=>n.set(l.id,{...l,children:[]})),n.forEach(l=>{l.parentId&&n.has(l.parentId)?n.get(l.parentId).children.push(l):d.push(l)})),d},s=(i,n="")=>{const d=i.id===t?"selected":"";a+=`<option value="${i.id}" ${d}>${n}${h(i.name)}</option>`,i.children.forEach(l=>s(l,n+"— "))};return r(e).forEach(i=>s(i)),a}async function Ke(e,t){const a=t.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const r=[],{ownerName:s,...o}=e;if(s&&s!==p.userName){const n=ne.currentUser;n&&r.push(Uo(n,{displayName:s}).then(()=>{p.userName=s}))}const i={...U,...o};r.push(qa(G,i)),await Promise.all(r),U=i,g("Sucesso","Definições salvas com sucesso!","success"),o.themeColor&&G===p.establishmentId&&setTimeout(()=>window.location.reload(),1500)}catch(r){g("Erro",`Não foi possível salvar: ${r.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function Dl(e,t){const a=h(e.name||""),r=h(e.phone||""),s=h(e.cnpj||""),o=h(e.email||""),i=h(e.address||""),n=h(e.website||""),d=h(p.userName||"");t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Dados Gerais e de Contato</h3>
                <button type="submit" form="personal-data-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar</button>
            </div>
            <form id="personal-data-form" class="space-y-4">
                <div>
                    <label for="ownerName" class="block text-sm font-medium text-gray-700">Seu nome (Responsável)</label>
                    <input type="text" id="ownerName" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" value="${d}">
                </div>
                <div>
                    <label for="establishmentName" class="block text-sm font-medium text-gray-700">Nome da Unidade</label>
                    <input type="text" id="establishmentName" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" value="${a}">
                </div>
                <div>
                    <label for="establishmentPhone" class="block text-sm font-medium text-gray-700">Telefone Principal</label>
                    <input type="tel" id="establishmentPhone" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" value="${r}">
                </div>
                <div>
                    <label for="establishmentCnpjCpf" class="block text-sm font-medium text-gray-700">CNPJ / CPF</label>
                    <input type="text" id="establishmentCnpjCpf" value="${s}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md bg-gray-50">
                </div>
                <div>
                    <label for="establishmentEmail" class="block text-sm font-medium text-gray-700">E-mail de Contato</label>
                    <input type="email" id="establishmentEmail" value="${o}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <div>
                    <label for="establishmentAddress" class="block text-sm font-medium text-gray-700">Endereço Completo</label>
                    <input type="text" id="establishmentAddress" value="${i}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <div>
                    <label for="establishmentWebsite" class="block text-sm font-medium text-gray-700">Website</label>
                    <input type="url" id="establishmentWebsite" value="${n}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
            </form>
        </div>
    `,t.querySelector("#personal-data-form").addEventListener("submit",l=>{l.preventDefault();const c={ownerName:t.querySelector("#ownerName").value,name:t.querySelector("#establishmentName").value,phone:t.querySelector("#establishmentPhone").value,cnpj:t.querySelector("#establishmentCnpjCpf").value,email:t.querySelector("#establishmentEmail").value,address:t.querySelector("#establishmentAddress").value,website:t.querySelector("#establishmentWebsite").value};Ke(c,l)})}function Tl(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Alterar Senha</h3>
                <button type="submit" form="change-password-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar Nova Senha</button>
            </div>
            <form id="change-password-form" class="space-y-4">
                <div>
                    <label for="newPassword" class="block text-sm font-medium text-gray-700">Nova Senha</label>
                    <input type="password" id="newPassword" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md" required minlength="6">
                </div>
                <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
                    <input type="password" id="confirmPassword" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md" required>
                </div>
            </form>
        </div>
    `,t.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const r=t.querySelector("#newPassword").value,s=t.querySelector("#confirmPassword").value;if(r!==s){g("Erro","As senhas não coincidem.","error");return}const o=t.querySelector('button[form="change-password-form"]');o.disabled=!0,o.textContent="A Salvar...";try{const i=ne.currentUser;if(i)await _o(i,r),g("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum usuário logado encontrado.")}catch(i){g("Erro",`Não foi possível alterar a senha: ${i.message}`,"error")}finally{o.disabled=!1,o.textContent="Salvar Nova Senha"}})}function Bl(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Alterar E-mail de Acesso</h3>
                <button type="submit" form="change-email-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar Novo E-mail</button>
            </div>
            <form id="change-email-form" class="space-y-4">
                <p class="text-sm text-gray-600">Para alterar seu e-mail, confirme a sua senha atual. Um link será enviado para o **novo** endereço.</p>
                <div>
                    <label for="newEmail" class="block text-sm font-medium text-gray-700">Novo E-mail</label>
                    <input type="email" id="newEmail" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md" required>
                </div>
                <div>
                    <label for="currentPassword" class="block text-sm font-medium text-gray-700">Senha Atual</label>
                    <input type="password" id="currentPassword" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md" required>
                </div>
            </form>
        </div>
    `,t.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const r=t.querySelector("#newEmail").value,s=t.querySelector("#currentPassword").value,o=t.querySelector('button[form="change-email-form"]');o.disabled=!0,o.textContent="A verificar...";try{const i=ne.currentUser,n=zo.credential(i.email,s);await Oo(i,n),await Vo(i,r),await Sr(G,r),g("Sucesso","Link de verificação enviado! Verifique o seu novo e-mail.","success"),a.target.reset()}catch(i){g("Erro",i.message,"error")}finally{o.disabled=!1,o.textContent="Salvar Novo E-mail"}})}function Pl(e,t){const a=h(e.welcomeMessage||"");t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Identidade Visual</h3>
                <button type="submit" form="branding-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar Identidade</button>
            </div>
            <form id="branding-form" class="space-y-8">
                <input type="hidden" id="establishmentLogoBase64">
                <input type="hidden" id="establishmentBackgroundImageBase64">
                <input type="hidden" id="establishmentThemeColor">
                
                <div class="flex flex-col md:flex-row items-center gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Logotipo da Unidade</label>
                        <img id="establishmentLogoPreview" src="${e.logo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Logo"}" class="mt-2 h-24 w-24 rounded-lg object-contain border p-1 bg-gray-50">
                    </div>
                    <div class="flex-grow">
                        <input type="file" id="establishmentLogoInput" class="hidden" accept="image/*">
                        <button type="button" id="establishmentLogoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50">Alterar Logotipo</button>
                    </div>
                </div>

                <div class="border-t pt-4 mt-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Página de Agendamento</h4>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Imagem de Fundo</label>
                        <div class="mt-2 flex items-center gap-4">
                            <div class="h-32 w-20 bg-gray-100 border rounded-lg overflow-hidden relative">
                                 <img id="establishmentBgPreview" src="${e.backgroundImage||""}" class="w-full h-full object-cover ${e.backgroundImage?"":"hidden"}">
                                 <div id="establishmentBgPlaceholder" class="${e.backgroundImage?"hidden":"flex"} w-full h-full items-center justify-center text-gray-400 text-xs text-center p-1">Sem Imagem</div>
                            </div>
                            <div class="flex-grow">
                                <input type="file" id="establishmentBgInput" class="hidden" accept="image/*">
                                <button type="button" id="establishmentBgButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50">Carregar Fundo</button>
                                <button type="button" id="establishmentBgRemoveBtn" class="ml-2 text-red-600 text-sm hover:underline">Remover</button>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Cor Principal (Botões)</label>
                            <input type="color" id="establishmentPrimaryColorInput" value="${e.primaryColor||e.themeColor||"#4f46e5"}" class="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer">
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Cor do Texto Fundo</label>
                            <input type="color" id="establishmentTextColorInput" value="${e.textColor||"#111827"}" class="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer">
                        </div>
                    </div>
                    
                    <div>
                        <label for="establishmentWelcomeMessage" class="block text-sm font-medium text-gray-700">Mensagem de Boas-Vindas</label>
                        <input type="text" id="establishmentWelcomeMessage" class="mt-1 block w-full rounded-md border-gray-300 p-2.5 shadow-sm" value="${a}">
                    </div>
                </div>

                <div class="border-t pt-4 mt-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">Tema do Painel Administrativo</h4>
                    <p class="text-sm text-gray-600 mb-4">Escolha a cor base do sistema para esta unidade.</p>
                    <div id="color-palette-container" class="flex flex-wrap gap-4"></div>
                </div>
            </form>
        </div>
    `,t.querySelector("#establishmentLogoBase64").value=e.logo||"",t.querySelector("#establishmentBackgroundImageBase64").value=e.backgroundImage||"",To(e.themeColor||"indigo",t),t.querySelector("#establishmentLogoButton").onclick=()=>t.querySelector("#establishmentLogoInput").click(),t.querySelector("#establishmentLogoInput").onchange=async r=>{const s=r.target.files[0];if(s){const o=await ys(s,300,.9);t.querySelector("#establishmentLogoPreview").src=o,t.querySelector("#establishmentLogoBase64").value=o}},t.querySelector("#establishmentBgButton").onclick=()=>t.querySelector("#establishmentBgInput").click(),t.querySelector("#establishmentBgInput").onchange=async r=>{const s=r.target.files[0];if(s){const o=t.querySelector("#establishmentBgButton");o.textContent="A processar...",o.disabled=!0;try{const i=await ys(s,1280,.7);t.querySelector("#establishmentBgPreview").src=i,t.querySelector("#establishmentBgPreview").classList.remove("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=i}finally{o.textContent="Carregar Fundo",o.disabled=!1}}},t.querySelector("#establishmentBgRemoveBtn").onclick=()=>{t.querySelector("#establishmentBgPreview").src="",t.querySelector("#establishmentBgPreview").classList.add("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.remove("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=""},t.querySelector("#branding-form").addEventListener("submit",r=>{r.preventDefault();const s={logo:t.querySelector("#establishmentLogoBase64").value,welcomeMessage:t.querySelector("#establishmentWelcomeMessage").value,backgroundImage:t.querySelector("#establishmentBackgroundImageBase64").value,primaryColor:t.querySelector("#establishmentPrimaryColorInput").value,textColor:t.querySelector("#establishmentTextColorInput").value,themeColor:t.querySelector("#establishmentThemeColor").value};Ke(s,r)})}function Ml(e,t){const a=e.urlId||G;let r=window.location.origin;(r.includes("localhost")||r.includes("capacitor://")||r.includes("127.0.0.1"))&&(r="https://www.kairosagenda.com.br");const s=h(`${r}/agendar?id=${a}`),o=e.publicBookingEnabled||!1,i=o?"Agendamento Online ATIVO":"Agendamento Online INATIVO",n=o?"text-green-600":"text-red-600";t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100 space-y-8">
            <div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Link Público de Agendamento</h3>
                <p class="text-sm text-gray-600 mb-4">Este é o link exclusivo desta unidade para compartilhar com os clientes.</p>
                <div class="flex flex-col sm:flex-row gap-2">
                    <input type="text" id="publicBookingLink" value="${s}" readonly class="flex-1 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 outline-none">
                    <button type="button" id="copyBookingLinkBtn" class="py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">Copiar Link</button>
                </div>
            </div>

            <div>
                <h3 class="text-xl font-bold text-gray-800 mb-4">Status do Agendamento Online</h3>
                <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <label for="publicBookingToggle" class="flex items-center cursor-pointer">
                        <div class="relative">
                            <input type="checkbox" id="publicBookingToggle" class="sr-only" ${o?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                        </div>
                    </label>
                    <span id="publicBookingStatusText" class="text-sm font-semibold ${n}">${i}</span>
                </div>
            </div>

            <div class="pt-8 border-t">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800">Intervalo da Agenda</h3>
                    <button type="submit" form="booking-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar Intervalo</button>
                </div>
                <form id="booking-form" class="space-y-4">
                    <input type="hidden" id="establishmentSlotInterval">
                    <p class="text-sm text-gray-600 mb-2">De quanto em quanto tempo a agenda exibe horários disponíveis?</p>
                    <div id="slotIntervalContainer" class="flex flex-wrap gap-2"></div>
                </form>
            </div>
        </div>
    `,t.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const d=t.querySelector("#publicBookingLink");d.select(),document.execCommand("copy"),d.blur(),g("Sucesso","Link copiado!","success")}),t.querySelector("#publicBookingToggle").addEventListener("change",async d=>{const l=d.target.checked,c=t.querySelector("#publicBookingStatusText");c.textContent=l?"Agendamento Online ATIVO":"Agendamento Online INATIVO",c.className=l?"text-sm font-semibold text-green-600":"text-sm font-semibold text-red-600";try{d.target.disabled=!0,await kr(G,l),U.publicBookingEnabled=l,g("Sucesso",`Agendamento online ${l?"ativado":"desativado"}!`,"success")}catch(u){g("Erro",u.message,"error"),d.target.checked=!l}finally{d.target.disabled=!1}}),Fl(e.slotInterval||30,t),t.querySelector("#booking-form").addEventListener("submit",d=>{d.preventDefault();const l={slotInterval:parseInt(t.querySelector("#establishmentSlotInterval").value,10)};Ke(l,d)})}function Al(e,t){t.innerHTML=`
         <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
             <div class="flex justify-between items-center mb-6">
                 <h3 class="text-xl font-bold text-gray-800">Horário de Funcionamento</h3>
                 <button type="submit" form="working-hours-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar Horários</button>
             </div>
             
             <form id="working-hours-form">
                 <div class="mb-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <label for="establishmentTimezone" class="block text-sm font-bold text-gray-700 mb-2">Fuso Horário da Unidade</label>
                    <select id="establishmentTimezone" class="block w-full p-2.5 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="America/Sao_Paulo">Horário de Brasília (SP, RJ, MG, Sul, NE, GO, DF)</option>
                        <option value="America/Manaus">Horário do Amazonas (Manaus)</option>
                        <option value="America/Cuiaba">Horário do Mato Grosso / MS</option>
                        <option value="America/Rio_Branco">Horário do Acre</option>
                        <option value="America/Noronha">Fernando de Noronha</option>
                        <option value="Europe/Lisbon">Portugal (Lisboa)</option>
                    </select>
                 </div>

                 <div id="establishmentWorkingHoursContainer" class="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-4"></div>
             </form>
         </div>
    `;const a=t.querySelector("#establishmentTimezone");e.timezone&&(a.value=e.timezone);const r=t.querySelector("#establishmentWorkingHoursContainer"),s=e.workingHours||{};Object.keys(pa).forEach(o=>{const i=s[o]||{},n=pa[o],d=i.active!==!1,l=document.createElement("div");l.className=`day-schedule-card p-4 rounded-lg border ${d?"bg-gray-50 border-gray-200":"bg-gray-100 border-gray-100 disabled opacity-60"}`,l.innerHTML=`
            <div class="flex justify-between items-center mb-4">
                <span class="font-bold text-gray-800">${n}</span>
                <label class="flex items-center cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" id="est-${o}-active" class="sr-only" ${d?"checked":""}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                </label>
            </div>
            <div class="time-inputs grid grid-cols-2 gap-3">
                <div><label class="text-xs text-gray-500">Abertura:</label><input type="time" id="est-${o}-start" value="${i.start||"09:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Fecho:</label><input type="time" id="est-${o}-end" value="${i.end||"18:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Início Pausa:</label><input type="time" id="est-${o}-breakStart" value="${i.breakStart||"12:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Fim Pausa:</label><input type="time" id="est-${o}-breakEnd" value="${i.breakEnd||"13:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
            </div>`,r.appendChild(l)}),r.addEventListener("change",o=>{const i=o.target.closest('.day-schedule-card input[type="checkbox"]');if(i){const n=i.closest(".day-schedule-card");n.classList.toggle("disabled",!i.checked),n.classList.toggle("opacity-60",!i.checked),n.classList.toggle("bg-gray-50",i.checked),n.classList.toggle("bg-gray-100",!i.checked)}}),t.querySelector("#working-hours-form").addEventListener("submit",o=>{o.preventDefault();const i={};Object.keys(pa).forEach(d=>{i[d]={active:t.querySelector(`#est-${d}-active`).checked,start:t.querySelector(`#est-${d}-start`).value,end:t.querySelector(`#est-${d}-end`).value,breakStart:t.querySelector(`#est-${d}-breakStart`).value,breakEnd:t.querySelector(`#est-${d}-breakEnd`).value}});const n=t.querySelector("#establishmentTimezone").value;Ke({workingHours:i,timezone:n},o)})}function Do(e,t){const a=!!e.whatsappInstance;t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
            <div class="mb-6">
                <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <i class="bi bi-robot text-green-500"></i> Atendente Virtual Inteligente
                </h3>
                <p class="text-sm text-gray-600 mt-2">Conecte o WhatsApp desta unidade para que a nossa Inteligência Artificial atenda os clientes, responda dúvidas e faça os agendamentos de forma automática, 24 horas por dia.</p>
            </div>

            <div class="bg-green-50 p-6 rounded-xl border border-green-200 text-center">
                
                <div id="whatsappStatusArea" class="${a?"hidden":"block"}">
                    <div class="bg-white inline-block p-4 rounded-full shadow-sm mb-4">
                        <i class="bi bi-qr-code-scan text-4xl text-gray-700"></i>
                    </div>
                    <h4 class="text-lg font-bold text-gray-800 mb-2">Ligar o Bot a esta Unidade</h4>
                    <p class="text-sm text-gray-600 mb-6 max-w-md mx-auto">Clique no botão abaixo para gerar um QR Code. Escaneie-o com o celular da sua barbearia (em Aparelhos Conectados).</p>
                    
                    <button type="button" id="btnGenerateQr" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2 mx-auto">
                        <i class="bi bi-phone-vibrate"></i> Gerar QR Code
                    </button>
                </div>

                <div id="qrCodeDisplayArea" class="hidden">
                    <h4 class="text-lg font-bold text-indigo-800 mb-4 animate-pulse">Aguardando Conexão...</h4>
                    <div class="bg-white p-4 inline-block rounded-xl shadow-lg border-2 border-green-400">
                        <img id="qrCodeImage" src="" alt="QR Code WhatsApp" class="w-64 h-64 object-contain">
                    </div>
                    <ul class="text-sm text-left text-gray-700 max-w-sm mx-auto mt-6 space-y-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <li><span class="font-bold text-green-600">1.</span> Abra o WhatsApp no telemóvel da loja.</li>
                        <li><span class="font-bold text-green-600">2.</span> Vá a <b>Configurações</b> (ou Mais Opções).</li>
                        <li><span class="font-bold text-green-600">3.</span> Toque em <b>Aparelhos Conectados</b>.</li>
                        <li><span class="font-bold text-green-600">4.</span> Aponte a câmera para o quadrado acima.</li>
                    </ul>
                    <button type="button" id="btnCancelQr" class="mt-4 text-red-500 hover:text-red-700 font-semibold text-sm underline">Cancelar</button>
                </div>

                <div id="connectedStatusArea" class="${a?"block":"hidden"} mt-4">
                    <div class="bg-white inline-block p-4 rounded-full shadow-sm mb-4 border-4 border-green-500">
                        <i class="bi bi-check-circle-fill text-4xl text-green-500"></i>
                    </div>
                    <h4 class="text-xl font-bold text-green-700 mb-2">WhatsApp Conectado!</h4>
                    <p class="text-sm text-gray-600 max-w-md mx-auto mb-6">O bot da Inteligência Artificial já está ativo no número desta unidade.</p>
                    
                    <div class="flex justify-center gap-4">
                        <button type="button" id="btnDisconnectWhatsapp" class="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
                            <i class="bi bi-power"></i> Desconectar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    `;let r=null;const s=t.querySelector("#btnGenerateQr"),o=t.querySelector("#btnCancelQr");s&&s.addEventListener("click",async()=>{s.disabled=!0,s.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gerando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const l=await(await fetch(`${n}/connect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:G})})).json();if(l.qrcode){t.querySelector("#whatsappStatusArea").classList.add("hidden"),t.querySelector("#qrCodeDisplayArea").classList.remove("hidden");const c=l.qrcode.includes("data:image")?l.qrcode:`data:image/png;base64,${l.qrcode}`;t.querySelector("#qrCodeImage").src=c,r=setInterval(async()=>{try{const m=await(await fetch(`${n}/status/${G}`)).json();m.connected&&(clearInterval(r),U.whatsappInstance=m.instanceName,t.querySelector("#qrCodeDisplayArea").classList.add("hidden"),t.querySelector("#connectedStatusArea").classList.remove("hidden"),g("Sucesso","WhatsApp conectado com sucesso!","success"))}catch(u){console.error("Erro ao verificar status do WhatsApp",u)}},5e3)}else g("Erro na API",l.error||"Erro desconhecido","error")}catch(d){console.error(d),g("Erro de Conexão","Não foi possível acessar o servidor Kairós.","error")}finally{s.disabled=!1,s.innerHTML='<i class="bi bi-phone-vibrate"></i> Gerar QR Code'}}),o&&o.addEventListener("click",()=>{r&&clearInterval(r),t.querySelector("#qrCodeDisplayArea").classList.add("hidden"),t.querySelector("#whatsappStatusArea").classList.remove("hidden")});const i=t.querySelector("#btnDisconnectWhatsapp");i&&i.addEventListener("click",async()=>{if(!confirm("Tem certeza que deseja DESCONECTAR? O bot parará de responder imediatamente."))return;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Desconectando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const l=await(await fetch(`${n}/disconnect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:G})})).json();l.success?(g("Sucesso","WhatsApp desconectado!","success"),U.whatsappInstance=null,Do(U,t)):alert("Erro ao desconectar: "+l.error)}catch(d){console.error(d),g("Erro","Falha ao comunicar com o servidor.","error")}finally{i&&(i.disabled=!1,i.innerHTML='<i class="bi bi-power"></i> Desconectar')}})}async function ql(e,t){const a=e.loyaltyProgram||{},r=a.pointsPerVisit||1;let s=[],o=[],i=[];try{[s,o,i]=await Promise.all([Be(G),ta(G),za(G)])}catch(l){console.error("Erro ao carregar dados para fidelidade:",l)}t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
             <div class="flex justify-between items-center mb-6">
                 <h3 class="text-xl font-bold text-gray-800">Plano de Fidelidade</h3>
                 <button type="submit" form="loyalty-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar Fidelidade</button>
             </div>
             <form id="loyalty-form" class="space-y-6">
                 
                 <div class="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                     <label for="loyaltyEnabled" class="flex items-center cursor-pointer w-full">
                         <div class="relative"><input type="checkbox" id="loyaltyEnabled" class="sr-only" ${a.enabled?"checked":""}><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div>
                         <span class="ml-3 font-bold text-gray-700">Habilitar Programa de Fidelidade na Unidade</span>
                     </label>
                 </div>

                 <div id="loyalty-config-visit" class="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                     <label class="block text-sm font-bold text-indigo-900">Regra de Pontuação</label>
                     <p class="text-xs text-indigo-700 mb-3">Quantos pontos o cliente ganha a cada agendamento/venda?</p>
                     <div class="flex items-center gap-3">
                         <span class="text-gray-700 font-medium">Ganhar</span>
                         <input type="number" id="loyaltyPointsPerVisit" value="${r}" min="1" step="1" class="w-24 p-2 border border-indigo-300 rounded-md focus:ring-indigo-500 text-center font-bold text-lg bg-white">
                         <span class="text-gray-700 font-medium">pontos por visita</span>
                     </div>
                 </div>

                 <div class="pt-6 border-t border-gray-200">
                     <label class="block text-lg font-bold text-gray-800 mb-2">Recompensas e Resgates</label>
                     <p class="text-sm text-gray-500 mb-4">Defina os prémios que os seus clientes podem trocar pelos pontos.</p>
                     
                     <div id="loyaltyTiersContainer" class="space-y-4 bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300"></div>
                     
                     <button type="button" id="add-loyalty-tier" class="mt-4 flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 py-2 px-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors bg-white">
                        <i class="bi bi-plus-circle"></i> Adicionar Novo Prémio
                     </button>
                 </div>
             </form>
        </div>
    `;const n=t.querySelector("#loyaltyTiersContainer"),d=(l={})=>{const c=document.createElement("div");c.className="loyalty-tier-row bg-white p-4 border border-gray-200 rounded-lg shadow-sm relative grid grid-cols-1 md:grid-cols-4 gap-4 items-end";const u=l.type||"money",m=l.itemId||"",x=l.reward||"",b=l.discount||"",v=l.points||l.costPoints||"";c.innerHTML=`
            <div>
                <label class="text-xs font-bold text-gray-500 mb-1 block">Custo (Pontos)</label>
                <div class="relative">
                    <input type="number" placeholder="Ex: 100" data-field="points" value="${v}" class="w-full p-2 border border-gray-300 rounded-md font-bold text-gray-800">
                </div>
            </div>

            <div>
                <label class="text-xs font-bold text-gray-500 mb-1 block">Tipo de Recompensa</label>
                <select data-field="type" class="type-select w-full p-2 border border-gray-300 rounded-md bg-white text-sm">
                    <option value="money" ${u==="money"?"selected":""}>Desconto (R$)</option>
                    <option value="service" ${u==="service"?"selected":""}>Serviço Grátis</option>
                    <option value="product" ${u==="product"?"selected":""}>Produto Grátis</option>
                    <option value="package" ${u==="package"?"selected":""}>Pacote Grátis</option>
                </select>
            </div>

            <div class="relative md:col-span-2">
                <label class="text-xs font-bold text-gray-500 mb-1 block">O que o cliente ganha?</label>
                
                <div class="flex gap-2">
                    <input type="text" placeholder="Ex: R$ 20 de Desconto" data-field="rewardName" value="${h(x)}" class="desc-input flex-1 p-2 border border-gray-300 rounded-md ${u!=="money"?"hidden":""}">
                    
                    <select data-field="itemId" class="item-select flex-1 p-2 border border-gray-300 rounded-md bg-white text-sm ${u==="money"?"hidden":""}">
                        <option value="">Selecione o item na lista...</option>
                    </select>

                    <div class="w-24 relative">
                        <span class="absolute left-2 top-2 text-gray-500 text-sm">R$</span>
                        <input type="number" placeholder="Valor" data-field="discount" value="${b}" step="0.01" class="discount-input w-full p-2 pl-7 border border-gray-300 rounded-md" title="Valor do desconto">
                    </div>
                </div>
            </div>

            <button type="button" class="remove-loyalty-tier absolute -top-3 -right-3 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white p-1.5 rounded-full shadow-md transition-colors" title="Remover Prémio">
                <i class="bi bi-x-lg text-sm"></i>
            </button>
        `;const f=c.querySelector(".type-select"),E=c.querySelector(".item-select"),S=c.querySelector(".desc-input"),k=c.querySelector(".discount-input"),T=L=>{E.innerHTML='<option value="">Selecione...</option>';let R=[];L==="service"?R=s:L==="product"?R=o:L==="package"&&(R=i),R.forEach(H=>{const B=H.id===m,D=H.name||H.title||"Sem nome",N=H.price||H.salePrice||0;E.innerHTML+=`<option value="${H.id}" data-price="${N}" ${B?"selected":""}>${h(D)}</option>`})};return u!=="money"&&T(u),f.addEventListener("change",L=>{const R=L.target.value;R==="money"?(E.classList.add("hidden"),S.classList.remove("hidden"),S.value="",k.value=""):(E.classList.remove("hidden"),S.classList.add("hidden"),T(R),k.value="")}),E.addEventListener("change",L=>{const R=L.target.selectedOptions[0];if(R&&R.value){S.value=R.text;const H=R.dataset.price;H&&(k.value=parseFloat(H).toFixed(2))}}),c};a.tiers&&a.tiers.length>0?a.tiers.forEach(l=>n.appendChild(d(l))):n.appendChild(d()),t.querySelector("#add-loyalty-tier").addEventListener("click",()=>{n.appendChild(d())}),n.addEventListener("click",l=>{const c=l.target.closest(".remove-loyalty-tier");c&&c.closest(".loyalty-tier-row").remove()}),t.querySelector("#loyalty-form").addEventListener("submit",l=>{l.preventDefault();const c=Array.from(t.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(m=>{const x=m.querySelector(".type-select").value,b=x==="money"?null:m.querySelector(".item-select").value;let v=x==="money"?m.querySelector(".desc-input").value:m.querySelector(".item-select").options[m.querySelector(".item-select").selectedIndex]?.text;return{points:parseInt(m.querySelector('input[data-field="points"]').value,10)||0,costPoints:parseInt(m.querySelector('input[data-field="points"]').value,10)||0,type:x,itemId:b,reward:v,name:v,discount:parseFloat(m.querySelector('input[data-field="discount"]').value)||0}}),u={loyaltyProgram:{enabled:t.querySelector("#loyaltyEnabled").checked,type:"visit",pointsPerVisit:parseInt(t.querySelector("#loyaltyPointsPerVisit").value,10)||1,pointsPerCurrency:0,tiers:c.filter(m=>m.points>0&&m.reward)}};Ke(u,l)})}async function Rl(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Integração Financeira Automática</h3>
                <button type="submit" form="financial-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar Contas</button>
            </div>
            <form id="financial-form" class="space-y-6">
                
                <div class="bg-green-50 p-5 rounded-xl border border-green-100">
                    <h4 class="text-lg font-bold text-green-800 mb-1 flex items-center gap-2">
                        <i class="bi bi-graph-up-arrow"></i> Vendas da Unidade (Contas a Receber)
                    </h4>
                    <p class="text-sm text-green-700 mb-4">Como as vendas do PDV desta unidade devem entrar no financeiro?</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="financialNatureId" class="block text-sm font-bold text-gray-700">Natureza/Categoria Padrão</label>
                            <select id="financialNatureId" class="mt-1 block w-full p-2.5 border border-gray-300 rounded-md bg-white"></select>
                        </div>
                        <div>
                            <label for="financialCostCenterId" class="block text-sm font-bold text-gray-700">Centro de Custo</label>
                            <select id="financialCostCenterId" class="mt-1 block w-full p-2.5 border border-gray-300 rounded-md bg-white"></select>
                        </div>
                    </div>
                </div>

                <div class="bg-blue-50 p-5 rounded-xl border border-blue-100">
                    <h4 class="text-lg font-bold text-blue-800 mb-1 flex items-center gap-2">
                        <i class="bi bi-box-seam"></i> Compras de Stock (Contas a Pagar)
                    </h4>
                    <p class="text-sm text-blue-700 mb-4">Como os pedidos de fornecedores são classificados?</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="purchaseNatureId" class="block text-sm font-bold text-gray-700">Natureza/Categoria Padrão</label>
                            <select id="purchaseNatureId" class="mt-1 block w-full p-2.5 border border-gray-300 rounded-md bg-white"></select>
                        </div>
                        <div>
                            <label for="purchaseCostCenterId" class="block text-sm font-bold text-gray-700">Centro de Custo</label>
                            <select id="purchaseCostCenterId" class="mt-1 block w-full p-2.5 border border-gray-300 rounded-md bg-white"></select>
                        </div>
                    </div>
                </div>

                <div class="bg-red-50 p-5 rounded-xl border border-red-100">
                    <h4 class="text-lg font-bold text-red-800 mb-1 flex items-center gap-2">
                        <i class="bi bi-person-lines-fill"></i> Comissões Profissionais (Contas a Pagar)
                    </h4>
                    <p class="text-sm text-red-700 mb-4">Quando pagar a um profissional desta unidade, classificar como:</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="commissionNatureId" class="block text-sm font-bold text-gray-700">Natureza/Categoria Padrão</label>
                            <select id="commissionNatureId" class="mt-1 block w-full p-2.5 border border-gray-300 rounded-md bg-white"></select>
                        </div>
                        <div>
                            <label for="commissionCostCenterId" class="block text-sm font-bold text-gray-700">Centro de Custo</label>
                            <select id="commissionCostCenterId" class="mt-1 block w-full p-2.5 border border-gray-300 rounded-md bg-white"></select>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    `;try{const[a,r]=await Promise.all([ra(G),Oa(G)]),s=e.financialIntegration||{},o=e.commissionConfig||{},i=e.purchaseConfig||{};t.querySelector("#financialNatureId").innerHTML=qe(a,s.defaultNaturezaId),t.querySelector("#financialCostCenterId").innerHTML=qe(r,s.defaultCentroDeCustoId),t.querySelector("#purchaseNatureId").innerHTML=qe(a,i.defaultNatureId),t.querySelector("#purchaseCostCenterId").innerHTML=qe(r,i.defaultCostCenterId),t.querySelector("#commissionNatureId").innerHTML=qe(a,o.defaultNatureId),t.querySelector("#commissionCostCenterId").innerHTML=qe(r,o.defaultCostCenterId)}catch{g("Erro","Não foi possível carregar o plano de contas da unidade.","error")}t.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const r={financialIntegration:{defaultNaturezaId:t.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:t.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:t.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:t.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:t.querySelector("#commissionNatureId").value||null,defaultCostCenterId:t.querySelector("#commissionCostCenterId").value||null}};Ke(r,a)})}function Nl(e,t){const a=`https://wa.me/5516997859430?text=Olá, preciso de ajuda com o sistema Kairos (Minha Unidade: ${e.name}).`;t.innerHTML=`
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
            <div class="mb-6">
                <h3 class="text-2xl font-bold text-gray-800">Precisa de Ajuda?</h3>
                <p class="text-gray-600 mt-2">Estamos aqui para garantir que você tenha a melhor experiência possível.</p>
            </div>
            <div class="bg-green-50 border border-green-100 rounded-xl p-8 inline-block max-w-lg mx-auto w-full">
                <i class="bi bi-whatsapp text-6xl text-green-500 mb-4 inline-block"></i>
                <h4 class="text-xl font-bold text-gray-800 mb-6">Falar com Suporte</h4>
                <a href="${a}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg inline-flex items-center gap-2">
                    <i class="bi bi-chat-dots"></i> Iniciar Atendimento
                </a>
            </div>
        </div>
    `}function jl(e,t){const a=`https://wa.me/5516997859430?text=Gostaria de solicitar o cancelamento da assinatura. (Unidade: ${e.name})`;t.innerHTML=`
        <div class="bg-white p-6 rounded-lg shadow-md border border-red-100">
            <h3 class="text-xl font-bold text-red-600 mb-4">Cancelamento de Assinatura</h3>
            <p class="text-gray-700 mb-6">Lamentamos ver você partir. Para solicitar o cancelamento e exclusão dos dados desta unidade, por favor entre em contato com a nossa equipe financeira.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border border-gray-200 rounded-lg p-6 bg-gray-50 flex flex-col items-center text-center">
                    <i class="bi bi-envelope-paper text-3xl text-gray-400 mb-3"></i>
                    <h4 class="font-bold text-gray-800 mb-2">Via E-mail</h4>
                    <a href="mailto:sistemakairosagenda@gmail.com" class="text-indigo-600 font-semibold hover:underline">sistemakairosagenda@gmail.com</a>
                </div>
                <div class="border border-green-200 rounded-lg p-6 bg-green-50 flex flex-col items-center text-center">
                    <i class="bi bi-whatsapp text-3xl text-green-500 mb-3"></i>
                    <h4 class="font-bold text-gray-800 mb-4">Via WhatsApp</h4>
                    <a href="${a}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors text-sm">Solicitar Cancelamento</a>
                </div>
            </div>
        </div>
    `}function To(e="indigo",t){const a=t.querySelector("#color-palette-container"),r=t.querySelector("#establishmentThemeColor");!a||!r||(a.innerHTML="",Object.entries(Cl).forEach(([s,o])=>{const i=s===e,n=document.createElement("div");n.className="w-24 text-center cursor-pointer mb-4",n.innerHTML=`
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${i?"border-gray-800 scale-110 shadow-lg":"border-transparent"} p-1 transition-all">
                <div class="w-full h-full rounded-full" style="background-color: ${o.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${i?"text-gray-900 font-bold":"text-gray-500"}">${o.name}</p>
        `,n.addEventListener("click",()=>{r.value=s,To(s,t)}),a.appendChild(n)}),r.value=e)}function Fl(e,t){const a=t.querySelector("#slotIntervalContainer"),r=t.querySelector("#establishmentSlotInterval");if(!a||!r)return;const s=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=s.map(o=>{const i=o.value===e;return`<button type="button" data-value="${o.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors shadow-sm
                           ${i?"bg-indigo-600 text-white":"bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}">
                       ${o.label}
                   </button>`}).join(""),r.value=e,a.querySelectorAll(".interval-btn").forEach(o=>{o.addEventListener("click",()=>{r.value=o.dataset.value,a.querySelectorAll(".interval-btn").forEach(i=>{i.classList.remove("bg-indigo-600","text-white"),i.classList.add("bg-white","border","border-gray-300","text-gray-700")}),o.classList.add("bg-indigo-600","text-white"),o.classList.remove("bg-white","border","border-gray-300","text-gray-700")})})}async function Hl(e){const a=Co().find(s=>s.id===e);if(!a)return;Ee.innerHTML=`
        <div class="bg-white p-4 shadow-sm border-b mb-6 flex items-center justify-between sticky top-0 z-10">
            <div class="flex items-center gap-3">
                <button data-action="back-to-menu" class="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700">
                    <i class="bi bi-arrow-left"></i> Voltar
                </button>
                <h2 class="text-lg font-bold text-gray-800">${a.label}</h2>
            </div>
            <div class="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                ${h(U?.name||"")}
            </div>
        </div>
        
        <div id="settings-content-detail" class="pb-20 max-w-5xl mx-auto w-full">
            <div class="flex justify-center items-center py-10"><div class="spinner-border text-indigo-600" role="status"></div></div>
        </div>
    `,Ee.querySelector('button[data-action="back-to-menu"]').addEventListener("click",s=>{s.preventDefault(),Bo({id:G})});const r=document.getElementById("settings-content-detail");switch(e){case"personal-data":Dl(U,r);break;case"change-password":Tl(U,r);break;case"change-email":Bl(U,r);break;case"branding":Pl(U,r);break;case"booking":Ml(U,r);break;case"working-hours":Al(U,r);break;case"whatsapp-bot":Do(U,r);break;case"loyalty":await ql(U,r);break;case"financial":await Rl(U,r);break;case"support":Nl(U,r);break;case"cancellation":jl(U,r);break;default:r.innerHTML='<div class="p-4 text-center">Módulo em construção.</div>'}}async function Bo(e={}){Ee.innerHTML=`
        <div class="flex flex-col justify-center items-center h-64">
            <div class="spinner-border text-indigo-600 border-4 w-12 h-12 mb-4" role="status"></div>
            <p class="text-gray-500 font-medium">A carregar configurações da unidade...</p>
        </div>
    `;try{G=e.id||p.establishmentId,U=await Ce(G);const t=e.id?`<button onclick="window.navigateTo('establishments-section')" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                   <i class="bi bi-diagram-3"></i> Voltar à Rede
               </button>`:"",a=U.isMatriz||!U.parentId?'<span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded ml-3">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded ml-3">📍 UNIDADE</span>',r=Co();Ee.innerHTML=`
            <div class="max-w-5xl mx-auto w-full pb-20">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                            Configurações da Loja
                        </h2>
                        <p class="text-gray-500 text-sm mt-1">Gira os módulos, dados base e horários desta unidade individualmente.</p>
                    </div>
                    ${t}
                </div>

                <div class="bg-gradient-to-r from-indigo-900 to-indigo-700 rounded-xl shadow-lg p-6 mb-8 text-white flex justify-between items-center relative overflow-hidden">
                    <div class="relative z-10">
                        <h3 class="text-2xl font-bold mb-1">${h(U.name)} ${a}</h3>
                        <p class="text-indigo-200 text-sm flex items-center gap-2"><i class="bi bi-geo-alt"></i> ${h(U.address||"Morada não definida")}</p>
                    </div>
                    <div class="relative z-10 hidden sm:block">
                        <div class="w-16 h-16 bg-white rounded-xl shadow-md p-1 flex items-center justify-center">
                            ${U.logo?`<img src="${U.logo}" class="w-full h-full object-contain rounded-lg">`:`<span class="text-2xl text-indigo-600 font-bold">${U.name.charAt(0).toUpperCase()}</span>`}
                        </div>
                    </div>
                    <div class="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${r.map(s=>`
                        <div data-section="${s.id}" class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-300 cursor-pointer transition-all flex items-center gap-4 group">
                            <div class="w-12 h-12 bg-gray-50 group-hover:bg-indigo-50 text-gray-400 group-hover:text-indigo-600 rounded-lg flex items-center justify-center transition-colors">
                                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${s.icon}"></path></svg>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-bold text-gray-800 group-hover:text-indigo-700 transition-colors text-sm">${s.label}</h4>
                            </div>
                            <i class="bi bi-chevron-right text-gray-300 group-hover:text-indigo-400 transition-colors"></i>
                        </div>
                    `).join("")}
                </div>
                
                <div class="mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Módulos Ativos Nesta Unidade</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="modules-container">
                        ${zl(U.modules||{})}
                    </div>
                </div>
            </div>
        `,Ee.querySelectorAll("div[data-section]").forEach(s=>{s.addEventListener("click",o=>{Hl(s.dataset.section)})}),Ee.querySelectorAll(".module-toggle").forEach(s=>{s.addEventListener("change",async()=>{const o=s.dataset.module;try{const n={...(await Ce(G)).modules,[o]:s.checked};await qa(G,{modules:n}),g("Módulos","Módulos atualizados com sucesso.","success")}catch(i){s.checked=!s.checked,g("Erro",i.message,"error")}})})}catch(t){Ee.innerHTML=`
            <div class="p-8 text-center max-w-md mx-auto">
                <i class="bi bi-exclamation-triangle text-4xl text-red-500 mb-4 block"></i>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Erro ao carregar loja</h2>
                <p class="text-gray-600">${t.message}</p>
                <button onclick="window.navigateTo('establishments-section')" class="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700">Voltar à Rede</button>
            </div>
        `}}function zl(e){return[{key:"agenda-section",label:"Agenda Diária",icon:"bi-calendar"},{key:"comandas-section",label:"Comandas e PDV",icon:"bi-receipt"},{key:"financial-section",label:"Financeiro Completo",icon:"bi-cash-coin"},{key:"reports-section",label:"Relatórios Gerenciais",icon:"bi-graph-up"}].map(a=>`
        <div class="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <i class="bi ${a.icon}"></i>
                </div>
                <span class="text-sm font-bold text-gray-700">${a.label}</span>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input module-toggle cursor-pointer" type="checkbox" data-module="${a.key}" ${e[a.key]?"checked":""}>
            </div>
        </div>
    `).join("")}const ut=document.getElementById("content");async function Ue(e){const t=document.getElementById("blockagesList");if(t){t.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,r=document.getElementById("filterEndDate")?.value,s=await Zt(p.establishmentId,a||new Date().toISOString().split("T")[0],r||new Date().toISOString().split("T")[0],e),o=document.getElementById("filterReason")?.value.toLowerCase(),i=o?s.filter(d=>d.reason&&d.reason.toLowerCase().includes(o)):s,n=i.reduce((d,l)=>{const c=l.reason||"Sem motivo";return d[c]||(d[c]=[]),d[c].push(l),d},{});if(t.innerHTML="",i.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(n).forEach(([d,l])=>{const c=document.createElement("div");c.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let m=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${h(d)} (${l.length})</h4>`;if(l.length>1){const x=JSON.stringify(l.map(b=>b.id));m+=`<button data-action="batch-delete-blockage" data-ids='${x}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}m+="</div>",c.innerHTML=m,l.forEach(x=>{const b=new Date(x.startTime),v=new Date(x.endTime),f=b.toLocaleDateString("pt-BR"),E=v.toLocaleDateString("pt-BR"),k=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${f===E?`${f} | ${b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${v.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${f} às ${b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${E} às ${v.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${x.id}">Apagar</button>
                    </div>`;c.innerHTML+=k}),t.appendChild(c)})}catch(a){t.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function Ol(e){e.preventDefault();const t=e.target,a=t.querySelector("#blockageProfId").value,r=t.querySelector("#blockageDate").value,s=t.querySelector("#blockageEndDate").value||r,o=t.querySelector("#blockageStartTime").value,i=t.querySelector("#blockageEndTime").value,n={establishmentId:p.establishmentId,professionalId:a,startTime:new Date(`${r}T${o}:00`).toISOString(),endTime:new Date(`${s}T${i}:00`).toISOString(),reason:t.querySelector("#blockageReason").value};try{await Kt(n),t.reset(),g("Sucesso","Bloqueio adicionado com sucesso!","success"),Ue(a)}catch(d){g("Erro",`Não foi possível criar o bloqueio: ${d.message}`,"error")}}async function Vl(e){e.preventDefault();const t=e.target,a=Array.from(t.querySelectorAll('input[name="batch-professionals"]:checked')).map(c=>c.value);if(a.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const r=t.querySelector("#batchBlockageDate").value,s=t.querySelector("#batchBlockageEndDate").value||r,o=t.querySelector("#batchBlockageStartTime").value,i=t.querySelector("#batchBlockageEndTime").value,n=t.querySelector("#batchBlockageReason").value,d=t.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="Aguarde...";const l=a.map(c=>{const u={establishmentId:p.establishmentId,professionalId:c,startTime:new Date(`${r}T${o}:00`).toISOString(),endTime:new Date(`${s}T${i}:00`).toISOString(),reason:n};return Kt(u)});try{await Promise.all(l),g("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),t.reset(),t.querySelectorAll('input[name="batch-professionals"]:checked').forEach(u=>u.checked=!1);const c=document.getElementById("blockageProfId").value;c&&Ue(c)}catch(c){g("Erro",`Ocorreu um erro: ${c.message}`,"error")}finally{d.disabled=!1,d.textContent="Adicionar Bloqueio em Lote"}}function _l(e){ut.addEventListener("submit",t=>{t.target.id==="blockageForm"&&Ol(t),t.target.id==="batchBlockageForm"&&Vl(t)}),ut.addEventListener("input",t=>{t.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&Ue(e)}),ut.addEventListener("click",async t=>{const a=t.target.closest("button[data-action]");if(!a)return;const r=a.dataset.action;if(r==="back-to-professionals")J("profissionais-section");else if(r==="delete-blockage"){if(await W("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await Na(a.dataset.id),g("Sucesso","Bloqueio removido.","success"),Ue(e)}catch(o){g("Erro",`Não foi possível remover o bloqueio: ${o.message}`,"error")}}else if(r==="batch-delete-blockage"){const s=JSON.parse(a.dataset.ids);if(await W("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${s.length} bloqueios de uma vez?`))try{await to(s),g("Sucesso",`${s.length} bloqueios removidos.`,"success"),Ue(e)}catch(i){g("Erro",`Não foi possível apagar os bloqueios: ${i.message}`,"error")}}})}async function Ul(e){const{professionalId:t,professionalName:a}=e;if(!t||!a){ut.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const r=h(a);ut.innerHTML=`
        <section>
            <div class="flex items-center mb-6">
                <button data-action="back-to-professionals" class="mr-4 p-2 rounded-full hover:bg-gray-200 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <h2 class="text-3xl font-bold text-gray-800">Gerir Ausências</h2>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="space-y-8">
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Bloqueio para <span class="text-indigo-600">${r}</span></h3>
                        <form id="blockageForm" class="space-y-4">
                            <input type="hidden" id="blockageProfId" value="${t}">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label for="blockageDate" class="block text-sm font-medium text-gray-700">Data de Início</label><input type="date" id="blockageDate" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                                <div><label for="blockageEndDate" class="block text-sm font-medium text-gray-700">Data de Fim (opcional)</label><input type="date" id="blockageEndDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div><label for="blockageStartTime" class="block text-sm font-medium text-gray-700">Início</label><input type="time" id="blockageStartTime" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                                <div><label for="blockageEndTime" class="block text-sm font-medium text-gray-700">Fim</label><input type="time" id="blockageEndTime" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            </div>
                            <div><label for="blockageReason" class="block text-sm font-medium text-gray-700">Motivo</label><input type="text" id="blockageReason" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Férias, Folga"></div>
                            <button type="submit" class="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">Adicionar Bloqueio</button>
                        </form>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Lançamento em Lote</h3>
                        <form id="batchBlockageForm" class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Selecionar Profissionais</label>
                                <div id="batchProfSelectionContainer" class="mt-1 max-h-40 overflow-y-auto p-2 border rounded-md space-y-2"><div class="loader"></div></div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label for="batchBlockageDate" class="block text-sm font-medium text-gray-700">Data de Início</label><input type="date" id="batchBlockageDate" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                                <div><label for="batchBlockageEndDate" class="block text-sm font-medium text-gray-700">Data de Fim (opcional)</label><input type="date" id="batchBlockageEndDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div><label for="batchBlockageStartTime" class="block text-sm font-medium text-gray-700">Início</label><input type="time" id="batchBlockageStartTime" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                                <div><label for="batchBlockageEndTime" class="block text-sm font-medium text-gray-700">Fim</label><input type="time" id="batchBlockageEndTime" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            </div>
                            <div><label for="batchBlockageReason" class="block text-sm font-medium text-gray-700">Motivo</label><input type="text" id="batchBlockageReason" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Feriado, Evento"></div>
                            <button type="submit" class="w-full py-2 px-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition">Adicionar Bloqueio em Lote</button>
                        </form>
                    </div>
                </div>
                <div>
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Bloqueios de ${r}</h3>
                        <div id="blockage-filters" class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div><label for="filterStartDate" class="block text-sm font-medium text-gray-700">De</label><input type="date" id="filterStartDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            <div><label for="filterEndDate" class="block text-sm font-medium text-gray-700">Até</label><input type="date" id="filterEndDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            <div><label for="filterReason" class="block text-sm font-medium text-gray-700">Motivo</label><input type="text" id="filterReason" placeholder="Pesquisar motivo..." class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                        </div>
                        <div id="blockagesList" class="space-y-4 max-h-[60vh] overflow-y-auto pr-2"></div>
                    </div>
                </div>
            </div>
        </section>`,_l(t),await Ue(t);const s=document.getElementById("batchProfSelectionContainer");try{const o=await le(p.establishmentId);s.innerHTML=o.map(i=>`
            <div class="flex items-center">
                <input id="prof-batch-${i.id}" value="${i.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${i.id}" class="ml-2 text-sm text-gray-700">${h(i.name)}</label>
            </div>`).join("")}catch{s.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Wl=e=>I(`/api/users/${e}`),Jl=e=>I("/api/users",{method:"POST",body:JSON.stringify(e)}),Gl=(e,t)=>I(`/api/users/${e}`,{method:"PUT",body:JSON.stringify(t)}),Ql=e=>I(`/api/users/${e}`,{method:"DELETE"}),Yl=(e,t)=>I(`/api/users/${e}/password`,{method:"PUT",body:JSON.stringify({password:t})}),Xl=(e,t)=>I(`/api/users/${e}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),tt=document.getElementById("content"),Zl={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios Gerais","sales-report-section":"Relatório de Vendas (Caixa)","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores","profissionais-section":"Profissionais","ausencias-section":"Ausências e Bloqueios","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},Kl={view:"Visualizar",create:"Criar",edit:"Editar"};let Ct=null,Dt=null,We=null;const ed={group_admin:"Administrador do Grupo",company_admin:"Gestor de Matriz",branch_manager:"Gestor de Filial",professional:"Profissional Padrão"};function td(e){const t=document.getElementById("usersListContainer");if(!t)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(e.length===0){const r=a?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";t.innerHTML=`<p class="col-span-full text-center text-gray-500">${r}</p>`;return}e.sort((r,s)=>(r.status==="active"?-1:1)-(s.status==="active"?-1:1)),t.innerHTML=e.map(r=>{const s=JSON.stringify(r).replace(/'/g,"&apos;"),o=r.status==="active",i=p.professionals.find(m=>m.id===r.professionalId),n=i?i.name:"N/A",d=i?i.name.charAt(0):r.name.charAt(0),l=i?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(d)}`,c=ed[r.role]||"Profissional",u=r.role==="group_admin"?"bg-purple-100 text-purple-800":r.role==="company_admin"?"bg-blue-100 text-blue-800":r.role==="branch_manager"?"bg-orange-100 text-orange-800":"bg-gray-100 text-gray-800";return`
        <div class="user-card-clickable bg-white rounded-lg shadow-sm border overflow-hidden flex cursor-pointer ${o?"":"opacity-60"} hover:shadow-md transition" 
             data-action="edit-user" 
             data-user='${s}'>
            
            <img src="${l}" alt="Foto de Perfil" class="w-16 h-16 object-cover flex-shrink-0 pointer-events-none border-r">
            
            <div class="p-3 flex-grow flex flex-col justify-between min-w-0">
                <div class="pointer-events-none min-w-0">
                    <div class="flex justify-between items-start gap-2">
                        <p class="font-bold text-gray-800 text-sm truncate">${r.name}</p>
                        <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap ${u}">${c}</span>
                    </div>
                    <p class="text-xs text-gray-500 truncate">${r.email}</p>
                    <p class="text-[10px] text-gray-400 mt-1 truncate">Prof: <span class="font-semibold text-gray-600">${n}</span></p>
                </div>
                
                <div class="mt-2 flex items-center justify-between gap-2">
                    <label class="flex items-center cursor-pointer" title="${o?"Ativo":"Inativo"}">
                        <div class="relative">
                            <input type="checkbox" data-action="toggle-user-status" data-user-id="${r.id}" class="sr-only" ${o?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-8 h-4 rounded-full"></div>
                        </div>
                    </label>
                    
                    <button data-action="delete-user" data-user-id="${r.id}" class="text-gray-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors action-btn-delete" title="Excluir Usuário">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `}).join("")}function La(){const t=document.getElementById("showInactiveUsersToggle")?.checked?p.users:p.users.filter(a=>a.status==="active");td(t)}function ad(e={}){return Object.entries(Zl).map(([t,a])=>{const r=t==="agenda-section"||t==="comandas-section",s=e[t]?.view_all_prof===!0,o=Object.entries(Kl).map(([n,d])=>`
             <label class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${t}" data-permission="${n}" class="sr-only" ${e[t]?.[n]?"checked":""}>
                    <div class="toggle-bg block bg-gray-300 w-8 h-4 rounded-full"></div>
                </div>
                <span class="text-[10px] text-gray-600 font-medium">${d}</span>
            </label>
        `).join(""),i=r?`
            <div class="col-span-full pt-2 mt-2 border-t border-gray-100">
                <label class="flex items-center space-x-2 cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" data-module="${t}" data-permission="view_all_prof" class="sr-only" ${s?"checked":""}>
                        <div class="toggle-bg block bg-gray-300 w-8 h-4 rounded-full"></div>
                    </div>
                    <span class="text-xs font-bold text-indigo-600">Ver dados de toda a Equipe</span>
                </label>
            </div>
        `:"";return`
        <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <h4 class="font-bold text-xs text-gray-800 border-b pb-1.5 mb-2">${a}</h4>
            <div class="grid grid-cols-3 gap-1">
                ${o}
            </div>
            ${i}
        </div>
    `}).join("")}function ws(e){if(!We||p.userRole==="professional")return"";const t=e?.accessibleEstablishments?.map(o=>o.id)||[],a=e?.accessibleCompanies?.map(o=>o.id)||[];if((e?.role||"professional")==="group_admin")return'<div class="p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 text-sm font-bold">Acesso Total (Global) liberado.</div>';let s='<div class="space-y-3 max-h-48 overflow-y-auto custom-scrollbar p-2 bg-gray-50 rounded border">';return We.companies.forEach(o=>{const i=a.includes(o.id),n=We.branches.filter(d=>d.companyId===o.id);s+=`
            <div class="company-block">
                <label class="flex items-center space-x-2 cursor-pointer mb-1">
                    <input type="checkbox" class="company-checkbox rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" value="${o.id}" data-name="${o.name}" ${i?"checked":""}>
                    <span class="text-sm font-bold text-gray-800">🏢 ${o.name}</span>
                </label>
                <div class="pl-6 space-y-1 border-l-2 border-gray-200 ml-2">
                    ${n.map(d=>{const l=t.includes(d.id)||i;return`
                            <label class="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" class="branch-checkbox rounded text-indigo-500 h-3 w-3" value="${d.id}" data-name="${d.name}" data-company-id="${o.id}" ${l?"checked":""}>
                                <span class="text-xs text-gray-600">📍 ${d.name}</span>
                            </label>
                        `}).join("")}
                </div>
            </div>
        `}),s+="</div>",s}async function ks(e=null){document.getElementById("user-list-view").classList.add("hidden");const t=document.getElementById("user-form-view");t.classList.remove("hidden");let a=p.professionals;if(!a||a.length===0)try{a=await le(p.currentViewContext.id),p.professionals=a}catch{console.warn("Profissionais não carregados")}if(["group_admin","company_admin"].includes(p.userRole)&&!We)try{const l=await fetch("/api/establishments/hierarchy",{headers:{Authorization:`Bearer ${await p.getAuthToken?.()||""}`}});l.ok&&(We=await l.json())}catch(l){console.error("Falha ao buscar hierarquia",l),We={companies:[],branches:[]}}const r=l=>a?.find(c=>c.id===l),s=e?.professionalId;r(s);const o=e!==null;t.querySelector("#userFormTitle").textContent=o?`Editar: ${e.name}`:"Novo Usuário";const i=t.querySelector("#userForm");i.innerHTML=`
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
            
            <div class="bg-gray-50 p-4 rounded-lg border space-y-3">
                 <h3 class="font-bold text-sm text-gray-800 border-b pb-1">Dados de Acesso</h3>
                 <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="form-group">
                        <label class="text-xs font-bold text-gray-600">Nome Completo</label>
                        <input type="text" id="userName" required value="${e?.name||""}" class="w-full p-2 border rounded text-sm">
                    </div>
                    <div class="form-group">
                        <label class="text-xs font-bold text-gray-600">E-mail de Login</label>
                        <input type="email" id="userEmail" required value="${e?.email||""}" class="w-full p-2 border rounded text-sm">
                    </div>
                </div>
            </div>

            ${["group_admin","company_admin"].includes(p.userRole)?`
            <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100 space-y-3">
                 <h3 class="font-bold text-sm text-indigo-800 border-b border-indigo-200 pb-1">Nível de Acesso (Enterprise)</h3>
                 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="text-xs font-bold text-indigo-700 block mb-1">Perfil do Usuário</label>
                        <select id="userRole" class="w-full p-2 border border-indigo-300 rounded text-sm bg-white font-semibold">
                            ${p.userRole==="group_admin"?`<option value="group_admin" ${e?.role==="group_admin"?"selected":""}>Administrador Global (Acesso a tudo)</option>`:""}
                            <option value="company_admin" ${e?.role==="company_admin"?"selected":""}>Gestor de Empresa/Matriz</option>
                            <option value="branch_manager" ${e?.role==="branch_manager"?"selected":""}>Gestor de Filial (Loja)</option>
                            <option value="professional" ${e?.role==="professional"?"selected":""}>Profissional Padrão (Barbeiro)</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-xs font-bold text-indigo-700 block mb-1">Locais Permitidos</label>
                        <div id="hierarchySelectorContainer">
                            ${ws(e)}
                        </div>
                    </div>
                 </div>
            </div>
            `:`<input type="hidden" id="userRole" value="${e?.role||"professional"}">`}

            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-100 space-y-3">
                 <h3 class="font-bold text-sm text-yellow-800 border-b border-yellow-200 pb-1">Associação na Agenda</h3>
                <div class="form-group">
                    <label class="text-xs font-bold text-yellow-700">Vincular a qual Profissional?</label>
                    <select id="userProfessionalId" class="w-full p-2 border border-yellow-300 rounded text-sm bg-white">
                        <option value="">-- Não Associar --</option>
                        ${a?.map(l=>`<option value="${l.id}" ${l.id===s?"selected":""}>${l.name}</option>`).join("")}
                    </select>
                    <p class="text-[10px] text-yellow-600 mt-1">Garante que o profissional só veja os agendamentos dele.</p>
                </div>
            </div>
            
            ${o?`
            <div class="border-t pt-4 bg-gray-50 p-3 rounded mt-4">
                <button type="button" data-action="show-password-form" class="text-xs py-1.5 px-3 bg-gray-800 text-white font-bold rounded hover:bg-gray-900 transition">Alterar Senha do Usuário</button>
                <div id="password-form" class="hidden mt-3 max-w-xs space-y-2">
                    <input type="password" id="userNewPassword" placeholder="Nova Senha" class="w-full p-2 border rounded text-sm">
                    <div class="flex gap-2">
                         <button type="button" data-action="cancel-password-change" class="flex-1 py-1.5 bg-gray-300 text-gray-800 text-xs font-bold rounded">Cancelar</button>
                         <button type="button" data-action="save-password" class="flex-1 py-1.5 bg-red-600 text-white text-xs font-bold rounded">Salvar Senha</button>
                    </div>
                </div>
            </div>
            `:`
            <div class="bg-red-50 p-4 rounded-lg border border-red-100">
                 <h3 class="font-bold text-sm text-red-800 mb-2">Senha Inicial</h3>
                 <input type="password" id="userPassword" required placeholder="Mínimo 6 caracteres" class="w-full p-2 border border-red-200 rounded text-sm">
            </div>
            `}

            <div class="border-t pt-4 mt-4">
                <h3 class="text-sm font-bold mb-3 text-gray-800">Permissões de Módulos</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    ${ad(e?.permissions)}
                </div>
            </div>

            <div class="flex gap-3 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-2 bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300">Cancelar</button>
                <button type="submit" class="flex-1 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">Salvar Usuário</button>
            </div>
        </div>
    `;const n=i.querySelector("#userRole"),d=i.querySelector("#hierarchySelectorContainer");if(n&&d){n.addEventListener("change",c=>{const u={...e,role:c.target.value};d.innerHTML=ws(u),l()});const l=()=>{d.querySelectorAll(".company-checkbox").forEach(c=>{c.addEventListener("change",u=>{u.target.closest(".company-block").querySelectorAll(".branch-checkbox").forEach(b=>b.checked=u.target.checked)})})};l()}if(i.addEventListener("submit",async l=>{l.preventDefault();const c={};i.querySelectorAll("input[data-module]").forEach(f=>{const E=f.dataset.module,S=f.dataset.permission;c[E]||(c[E]={}),c[E][S]=f.checked});const u=i.querySelector("#userProfessionalId").value||null,m=i.querySelector("#userRole")?.value||"professional",x=[],b=[];if(m!=="group_admin"&&i.querySelector(".company-checkbox")&&(i.querySelectorAll(".company-checkbox:checked").forEach(f=>{x.push({id:f.value,name:f.dataset.name})}),i.querySelectorAll(".branch-checkbox:checked").forEach(f=>{b.push({id:f.value,name:f.dataset.name,companyId:f.dataset.companyId})}),b.length===0))return g("Atenção","Você deve selecionar pelo menos uma filial para este usuário.","error");const v={name:i.querySelector("#userName").value,permissions:c,professionalId:u,role:m,accessibleCompanies:x,accessibleEstablishments:b};try{if(o){const f=i.querySelector("#userEmail").value;e?.email!==f&&(v.email=f),await Gl(e.id,v),g("Usuário atualizado com sucesso!","success")}else v.email=i.querySelector("#userEmail").value,v.password=i.querySelector("#userPassword").value,await Jl(v),g("Usuário criado com sucesso!","success");Ut()}catch(f){g(`Erro: ${f.message}`,"error")}}),o){const l=i.querySelector('[data-action="show-password-form"]'),c=i.querySelector("#password-form");l&&c&&(l.addEventListener("click",()=>{l.classList.add("hidden"),c.classList.remove("hidden")}),c.querySelector('[data-action="cancel-password-change"]').addEventListener("click",()=>{l.classList.remove("hidden"),c.classList.add("hidden"),c.querySelector("#userNewPassword").value=""}),c.querySelector('[data-action="save-password"]').addEventListener("click",async u=>{const m=u.target,x=c.querySelector("#userNewPassword").value;if(!x||x.length<6)return g("Aviso","Senha deve ter no mínimo 6 caracteres.","error");if(await W("Alterar Senha","Tem certeza?"))try{m.disabled=!0,m.textContent="...",await Yl(e.id,x),g("Sucesso","Senha alterada.","success"),l.classList.remove("hidden"),c.classList.add("hidden")}catch(b){g("Erro",b.message,"error")}finally{m.disabled=!1,m.textContent="Salvar Senha"}}))}}async function sd(){const e=document.getElementById("usersListContainer");e.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[t,a]=await Promise.all([Wl(p.currentViewContext.id),le(p.currentViewContext.id)]);p.users=t,p.professionals=a,La()}catch{g("Erro ao carregar usuários.","error"),e.innerHTML='<p class="col-span-full text-center text-red-500">Falha ao carregar.</p>'}}async function Ut(){tt.innerHTML=`
        <style>
            .toggle-bg::after { content: ''; position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; background: white; border-radius: 50%; transition: transform 0.2s; }
            input:checked + .toggle-bg { background-color: #4f46e5; }
            input:checked + .toggle-bg::after { transform: translateX(16px); }
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 4px; }
        </style>
        <div id="user-list-view" class="relative min-h-full pb-24">
            <section>
                <div class="flex flex-wrap justify-between items-center mb-6 gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h2 class="text-xl font-bold text-gray-800">Equipe e Acessos</h2>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" id="showInactiveUsersToggle" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <span class="text-xs font-bold text-gray-600 uppercase">Exibir Inativos</span>
                    </label>
                </div>
                <div id="usersListContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"></div>
            </section>
            
            <button id="fab-new-user" data-action="new-user" title="Novo Usuário" class="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:bg-indigo-700 transition z-50 transform hover:scale-105">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
            </button>
        </div>

        <div id="user-form-view" class="hidden pb-20">
             <section>
                <div class="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm border">
                    <h2 id="userFormTitle" class="text-lg font-bold text-gray-800"></h2>
                    <button data-action="back-to-list" class="bg-gray-100 text-gray-600 hover:text-gray-900 font-bold py-1.5 px-3 rounded-md transition text-xs">Voltar</button>
                </div>
                <form id="userForm"></form>
            </section>
        </div>
    `,Ct&&tt.removeEventListener("click",Ct),Dt&&tt.removeEventListener("change",Dt),Ct=async e=>{const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"new-user":ks();break;case"edit-user":const r=JSON.parse(t.dataset.user.replace(/&apos;/g,"'"));ks(r);break;case"back-to-list":Ut();break;case"delete-user":{if(e.stopPropagation(),await W("Excluir Usuário","Tem certeza? Ação irreversível."))try{await Ql(t.dataset.userId),g("Usuário excluído!","success"),Ut()}catch(s){g(`Erro: ${s.message}`,"error")}break}}},Dt=async e=>{const t=e.target.closest('input[data-action="toggle-user-status"]');if(e.target.id==="showInactiveUsersToggle")La();else if(t){e.stopPropagation();const a=t.dataset.userId,r=t.checked?"active":"inactive";try{await Xl(a,r);const s=p.users.findIndex(o=>o.id===a);s>-1&&(p.users[s].status=r,La())}catch(s){g(`Erro: ${s.message}`,"error"),t.checked=!t.checked}}},tt.addEventListener("click",Ct),tt.addEventListener("change",Dt),await sd()}const od=document.getElementById("content");let Ss={},Ca=null;function rd(){Object.values(Ss).forEach(e=>e?.destroy()),Ss={}}function id(e,t){if(!window.jspdf){g("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:a}=window.jspdf,r=new a({orientation:"landscape",unit:"px",format:"a4"}),s=document.getElementById("salesReportSummaryCards");if(r.setFontSize(18),r.text(e,r.internal.pageSize.getWidth()/2,40,{align:"center"}),s){const i=[["Receita Total",s.querySelector("#summary-revenue").textContent],["Vendas Totais",s.querySelector("#summary-transactions").textContent],["Ticket Médio",s.querySelector("#summary-avg-ticket").textContent]];r.autoTable({startY:60,head:[["Métrica","Valor"]],body:i,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const o=r.lastAutoTable?r.lastAutoTable.finalY+20:60;r.text("Detalhes das Vendas",20,o),r.autoTable({html:`#${t}`,startY:o+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),r.save(`${e.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function $s(e){const t=document.getElementById("genericModal"),a=h(e.client),r=h(e.items),s=h(e.responsavelCaixa||"N/A"),o=(e.payments||[]).map(i=>`
        <div class="flex justify-between text-sm">
            <span>${h(i.method.charAt(0).toUpperCase()+i.method.slice(1))}</span>
            <span class="font-medium">R$ ${i.value.toFixed(2)}</span>
        </div>
    `).join("");t.innerHTML=`
        <div class="modal-content max-w-md w-full m-4">
            <div class="flex justify-between items-start">
                <div>
                    <h2 class="text-xl md:text-2xl font-bold text-gray-800">Detalhes da Venda</h2>
                    <p class="text-sm text-gray-500">${new Date(e.date).toLocaleString("pt-BR")}</p>
                </div>
                <button type="button" data-action="close-modal" data-target="genericModal" class="text-3xl font-bold p-2">&times;</button>
            </div>
            <div class="mt-6 space-y-4">
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm font-medium text-gray-600">Cliente</p>
                    <p class="font-semibold text-gray-800">${a}</p>
                </div>
                 <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm font-medium text-gray-600">Itens</p>
                    <p class="font-semibold text-gray-800">${r}</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm font-medium text-gray-600">Responsável pelo Caixa</p>
                    <p class="font-semibold text-gray-800">${s}</p>
                </div>
                 <div class="border-t pt-4 mt-4">
                     <h3 class="font-semibold mb-2">Pagamento</h3>
                     <div class="space-y-1">
                        ${o}
                     </div>
                     <div class="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                         <span>TOTAL</span>
                         <span>R$ ${e.total.toFixed(2)}</span>
                     </div>
                </div>
            </div>
        </div>
    `,t.style.display="flex"}function nd(e){const{summary:t,transactions:a}=e;document.getElementById("summary-revenue").textContent=`R$ ${t.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=t.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${t.averageTicket.toFixed(2)}`;const r=document.getElementById("paymentSummaryTableBody"),s=Object.entries(t.paymentMethodTotals).sort(([,n],[,d])=>d-n);r.innerHTML=s.map(([n,d])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${h(n.charAt(0).toUpperCase()+n.slice(1))}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${d.toFixed(2)}</td>
        </tr>
    `).join("");const o=document.getElementById("transactionsTableBody"),i=document.getElementById("mobileTransactionsList");if(a.length===0){const n='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';o.innerHTML=n,i.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}o.innerHTML=a.map((n,d)=>{const l=h(n.client),c=h(n.items),u=h(n.type);return`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${d}">
            <td class="w-24 py-3 px-4">${new Date(n.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${l}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${c}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${u}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${n.total.toFixed(2)}</td>
        </tr>
    `}).join(""),o.querySelectorAll("tr").forEach(n=>{n.addEventListener("dblclick",()=>{const d=n.dataset.transactionIndex,l=Ca.transactions[d];l&&$s(l)})}),i.innerHTML=a.map((n,d)=>{const l=h(n.client),c=h(n.items),u=h(n.type);return`
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 active:bg-gray-50 cursor-pointer transition-colors" data-transaction-index="${d}">
            <div class="flex justify-between items-start mb-2">
                <div class="flex flex-col">
                    <span class="text-xs text-gray-500 font-medium">${new Date(n.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</span>
                    <span class="font-bold text-gray-800 text-lg">${l}</span>
                </div>
                <div class="text-right">
                    <span class="block font-bold text-green-600 text-lg">R$ ${n.total.toFixed(2)}</span>
                    <span class="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200">${u}</span>
                </div>
            </div>
            <div class="mt-2 pt-2 border-t border-dashed border-gray-200">
                <p class="text-sm text-gray-600 line-clamp-2">${c}</p>
            </div>
            <p class="text-xs text-blue-500 mt-2 text-center font-medium">Toque para ver detalhes</p>
        </div>
    `}).join(""),i.querySelectorAll("div[data-transaction-index]").forEach(n=>{n.addEventListener("click",()=>{const d=n.dataset.transactionIndex,l=Ca.transactions[d];l&&$s(l)})})}async function Es(){const e=document.getElementById("main-reports-view"),t=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!e||!t||!a)return;const r=t.value,s=a.value;if(!r||!s)return g("Atenção","Por favor, selecione as datas de início e fim.","error");e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const o=document.getElementById("cashierSessionFilter").value,i=await Vr({establishmentId:p.establishmentId,startDate:r,endDate:s,cashierSessionId:o});Ca=i,e.innerHTML=`
            <div id="salesReportSummaryCards" class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
                <div class="bg-white p-3 md:p-4 rounded-lg shadow text-center border-b-4 border-green-500">
                    <h4 class="text-xs md:text-sm font-semibold text-gray-500 uppercase">Receita Total</h4>
                    <p id="summary-revenue" class="text-xl md:text-3xl font-bold text-green-600">R$ 0,00</p>
                </div>
                <div class="bg-white p-3 md:p-4 rounded-lg shadow text-center border-b-4 border-blue-500">
                    <h4 class="text-xs md:text-sm font-semibold text-gray-500 uppercase">Vendas</h4>
                    <p id="summary-transactions" class="text-xl md:text-3xl font-bold text-blue-600">0</p>
                </div>
                <div class="bg-white p-3 md:p-4 rounded-lg shadow text-center border-b-4 border-indigo-500">
                    <h4 class="text-xs md:text-sm font-semibold text-gray-500 uppercase">Ticket Médio</h4>
                    <p id="summary-avg-ticket" class="text-xl md:text-3xl font-bold text-indigo-600">R$ 0,00</p>
                </div>
                <div class="bg-white p-3 md:p-4 rounded-lg shadow col-span-2 lg:col-span-1">
                    <h4 class="text-xs md:text-sm font-semibold text-gray-700 text-center mb-2 uppercase">Por Pagamento</h4>
                    <table class="w-full text-xs md:text-sm"><tbody id="paymentSummaryTableBody"></tbody></table>
                </div>
            </div>

            <div class="bg-white md:p-6 rounded-lg md:shadow mt-4">
                <div class="p-4 md:p-0 mb-4 border-b md:border-none">
                    <h3 class="text-lg md:text-xl font-semibold">Detalhes das Transações</h3>
                    <p class="text-xs text-gray-500 hidden md:block">Dê um duplo clique numa linha para ver mais detalhes.</p>
                    <p class="text-xs text-gray-500 md:hidden">Toque num card para ver detalhes.</p>
                </div>

                <div class="hidden md:block overflow-x-auto rounded-lg border border-gray-100">
                    <table id="transactionsTable" class="min-w-full text-sm table-fixed">
                        <thead class="bg-gray-100 sticky top-0"><tr>
                            <th class="w-24 px-4 py-2 text-left font-semibold text-gray-600">Data/Hora</th>
                            <th class="w-40 px-4 py-2 text-left font-semibold text-gray-600">Cliente</th>
                            <th class="w-auto px-4 py-2 text-left font-semibold text-gray-600">Itens</th>
                            <th class="w-16 px-4 py-2 text-center font-semibold text-gray-600">Tipo</th>
                            <th class="w-24 px-4 py-2 text-right font-semibold text-gray-600">Total</th>
                        </tr></thead>
                        <tbody id="transactionsTableBody" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>

                <div id="mobileTransactionsList" class="md:hidden space-y-3 px-2 pb-4">
                    </div>
            </div>
        `,nd(i)}catch(o){g("Erro",`Não foi possível carregar o relatório: ${o.message}`,"error"),e.innerHTML=`<p class="p-8 text-center text-red-500">${h(o.message)}</p>`}}async function ld(){rd();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];od.innerHTML=`
        <section class="pb-20 md:pb-0"> <div class="flex flex-col gap-4 mb-6">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800 px-2 md:px-0">Relatório de Vendas</h2>
                
                <div class="w-full bg-white p-4 rounded-lg shadow-md space-y-4">
                    <div class="grid grid-cols-2 gap-3 md:flex md:items-center md:gap-4">
                        <div class="flex-1">
                            <label for="reportStartDate" class="block text-xs font-medium text-gray-500 mb-1">De:</label>
                            <input type="date" id="reportStartDate" value="${a}" class="w-full p-2 border rounded-md text-sm">
                        </div>
                        <div class="flex-1">
                            <label for="reportEndDate" class="block text-xs font-medium text-gray-500 mb-1">Até:</label>
                            <input type="date" id="reportEndDate" value="${e}" class="w-full p-2 border rounded-md text-sm">
                        </div>
                    </div>
                    
                    <div class="flex flex-col md:flex-row gap-3">
                         <div class="flex-grow">
                            <select id="cashierSessionFilter" class="w-full p-2 border rounded-md bg-white text-sm">
                                <option value="all">Todos os Caixas</option>
                            </select>
                         </div>
                         <div class="flex gap-2">
                             <button id="generateReportBtn" class="flex-1 md:flex-none py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 text-sm md:text-base">
                                Filtrar
                             </button>
                             <button id="exportPdfBtn" class="flex-1 md:flex-none py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-sm md:text-base flex items-center justify-center gap-2">
                                <span class="hidden md:inline">Exportar</span> PDF
                             </button>
                         </div>
                    </div>
                </div>
            </div>
            
            <div id="main-reports-view">
            </div>
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",Es),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const r=document.getElementById("reportStartDate").value,s=document.getElementById("reportEndDate").value,o=`Relatorio_Vendas_${r}_a_${s}`;id(o,"transactionsTable")});try{const r=await Pi(p.establishmentId),s=document.getElementById("cashierSessionFilter");r&&r.length>0&&r.forEach(o=>{const i=new Date(o.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),n=h(o.closedByName||"N/A");s.innerHTML+=`<option value="${o.id}">${n} - ${i}</option>`})}catch{g("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await Es()}const dd=document.getElementById("content");let w={payables:[],receivables:[],natures:[],costCenters:[],establishments:[],currentTab:"receivables",statusFilter:"all",startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date(new Date().getFullYear(),new Date().getMonth()+1,0).toISOString().split("T")[0],filterNaturezaId:"all",filterCostCenterId:"all",filterEstablishmentIds:new Set,searchQuery:"",isAdvancedFilterOpen:!1,selectedIds:new Set,isSelectionMode:!1,sortCol:"dueDate",sortAsc:!0},Tt=null,Bt=null;function Qa(e){const t=new Map,a=[];return e&&(e.forEach(r=>t.set(r.id,{...r,children:[]})),t.forEach(r=>{r.parentId&&t.has(r.parentId)?t.get(r.parentId).children.push(r):a.push(r)})),a}function Po(e){if(!e)return{day:"--",month:"---",full:"--/--/----"};const[t,a,r]=e.split("-"),s=new Date(t,a-1,r),o=String(s.getDate()).padStart(2,"0"),i=s.toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return{day:o,month:i,full:s.toLocaleDateString("pt-BR")}}function ue(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function Ye(e,t){if(t==="paid")return!1;const a=new Date;a.setHours(0,0,0,0);const[r,s,o]=e.split("-");return new Date(r,s-1,o)<a}function cd(e,t,a){if(!e)return;if(!t||t.length===0){e.innerHTML=`
            <div class="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <i class="bi bi-inbox text-2xl text-gray-300"></i>
                <p class="text-gray-500 text-sm mt-2 font-medium">Nenhum item criado.</p>
            </div>`;return}const r=(s,o=0)=>{const i=o*16,n=o===0,d=n?"bi-folder-fill text-indigo-500":"bi-file-earmark-text text-gray-400",l=n?"bg-white shadow-sm border border-gray-200":"bg-gray-50 border border-gray-100/50",c=n?"text-sm font-bold text-gray-800":"text-xs font-semibold text-gray-600",u=o>0?'<div class="absolute left-0 top-1/2 w-3 border-t-2 border-gray-200" style="margin-left: -12px;"></div>':"",m=o>0?"border-left: 2px solid #e5e7eb;":"";return`
            <div class="relative flex justify-between items-center ${l} p-2 rounded-lg mb-1.5 hover:border-indigo-300 transition-all group" style="margin-left: ${i}px; ${m}">
                ${u}
                <span class="${c} flex items-center gap-2">
                    <i class="bi ${d} text-base"></i>
                    ${s.name}
                </span>
                <button type="button" data-action="delete-${a}" data-id="${s.id}" class="text-gray-400 hover:text-red-600 text-xs w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-transparent hover:border-red-100" title="Excluir">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
            ${s.children.map(x=>r(x,o+1)).join("")}
        `};e.innerHTML=t.map(s=>r(s)).join("")}async function Da(e){const t=document.getElementById("genericModal"),a=e==="nature",r=a?"Plano de Naturezas":"Centros de Custo",s=a?ra:Oa,o=a?en:an,i=a?"natures":"costCenters";t.innerHTML=`
        <div class="modal-content max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">
            <div class="bg-gray-50 px-5 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 class="text-base font-bold text-gray-800 flex items-center gap-2">
                    <i class="bi ${a?"bi-tags-fill text-indigo-500":"bi-diagram-3-fill text-blue-500"}"></i> ${r}
                </h2>
                <button type="button" data-action="close-modal" class="text-gray-400 hover:text-red-500 text-xl font-bold transition-colors">&times;</button>
            </div>
            
            <div class="p-4">
                <form id="hierarchyForm" class="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row gap-3 items-end">
                    <div class="flex-1 w-full">
                        <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wide">Nome da Categoria</label>
                        <input type="text" id="itemName" placeholder="Ex: Receitas..." required class="w-full p-2 border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                    <div class="flex-1 w-full">
                        <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wide">Sub-categoria de (Opcional)</label>
                        <select id="itemParent" class="w-full p-2 bg-white border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                            <option value="">-- Nível Principal --</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full md:w-auto py-2 px-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-1.5 text-xs">
                        <i class="bi bi-plus-lg"></i> Add
                    </button>
                </form>

                <div class="border-t border-gray-100 pt-3">
                    <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Estrutura Atual</h3>
                    <div id="hierarchyList" class="space-y-1 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                        <div class="loader mx-auto"></div>
                    </div>
                </div>
            </div>
        </div>`,t.style.display="flex";const n=t.querySelector("#hierarchyList"),d=t.querySelector("#itemParent"),l=u=>{const m=Qa(u);cd(n,m,e);const x=d.value;d.innerHTML='<option value="">-- Nível Principal --</option>';const b=(v,f=0)=>{const E="  ".repeat(f)+(f>0?"↳ ":"");d.innerHTML+=`<option value="${v.id}">${E}${v.name}</option>`,v.children.forEach(S=>b(S,f+1))};m.forEach(v=>b(v)),d.value=x};try{const u=await s(p.establishmentId);w[i]=u,l(u)}catch(u){console.error(u)}const c=t.querySelector("#hierarchyForm");c.addEventListener("submit",async u=>{u.preventDefault();const m=t.querySelector("#itemName").value,x=d.value;try{await o({name:m,parentId:x||null,establishmentId:p.establishmentId});const b=await s(p.establishmentId);w[i]=b,l(b),c.reset(),await De(),g("Sucesso","Item adicionado à estrutura.","success")}catch(b){g("Erro",b.message,"error")}})}async function ud(){try{const t=(await Te()).matrizes||[];w.establishments=[],t.forEach(a=>{w.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(r=>w.establishments.push({id:r.id,name:r.name,type:"Filial"}))}),w.filterEstablishmentIds.size===0&&w.filterEstablishmentIds.add(p.establishmentId)}catch(e){console.warn("Erro ao buscar lojas",e)}Mo(),Ao(),await De()}function Mo(){const e=w.establishments.map(t=>`
        <label class="inline-flex items-center gap-2 px-3 py-1.5 bg-white border ${w.filterEstablishmentIds.has(t.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-gray-200 text-gray-600"} rounded-lg cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" value="${t.id}" ${w.filterEstablishmentIds.has(t.id)?"checked":""}>
            <span class="text-xs font-bold whitespace-nowrap">${t.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${t.name}</span>
        </label>
    `).join("");dd.innerHTML=`
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative">
            
            <div id="batch-action-bar" class="hidden absolute top-4 left-4 right-4 z-30 bg-gray-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down">
                <div class="flex items-center gap-3">
                    <button id="cancel-selection-btn" class="p-1.5 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <span class="font-bold text-sm tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Selecionados</span>
                </div>
                <button id="batch-delete-btn" class="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-sm">
                    <i class="bi bi-trash3"></i> Excluir
                </button>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full">
                
                <div class="flex bg-gray-200/80 p-1 rounded-xl border border-gray-300 w-full md:w-auto shadow-inner">
                    <button id="tab-receivables" class="flex-1 md:w-32 py-1.5 text-xs font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${w.currentTab==="receivables"?"bg-white text-emerald-700 shadow":"text-gray-600 hover:text-gray-800"}">
                        A Receber
                    </button>
                    <button id="tab-payables" class="flex-1 md:w-32 py-1.5 text-xs font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${w.currentTab==="payables"?"bg-white text-red-700 shadow":"text-gray-600 hover:text-gray-800"}">
                        A Pagar
                    </button>
                </div>

                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                    <button id="export-excel-btn" class="py-1.5 px-3 bg-white border border-gray-300 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition shadow-sm flex items-center gap-2 text-xs" title="Exportar para Excel">
                        <i class="bi bi-file-earmark-excel-fill text-green-600"></i> Excel
                    </button>
                    <button id="settings-btn" class="py-1.5 px-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-xs" title="Plano de Naturezas e Centros de Custo">
                        <i class="bi bi-gear-fill text-gray-400"></i> Ajustes
                    </button>
                    <button data-action="new-financial" data-type="payable" class="py-1.5 px-3 bg-red-50 text-red-700 border border-red-200 font-bold rounded-lg hover:bg-red-100 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-arrow-down-circle"></i> Nova Despesa
                    </button>
                    <button data-action="new-financial" data-type="receivable" class="py-1.5 px-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-arrow-up-circle"></i> Nova Receita
                    </button>
                </div>
            </div>

            <div id="summary-section" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3"></div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 w-full">
                <div class="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto custom-scrollbar">
                    <button data-status="all" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${w.statusFilter==="all"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Todos</button>
                    <button data-status="pending" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${w.statusFilter==="pending"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Abertos / Prov.</button>
                    <button data-status="paid" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${w.statusFilter==="paid"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Baixados</button>
                    <button data-status="overdue" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${w.statusFilter==="overdue"?"bg-red-50 text-red-700 border-red-200":"bg-white text-gray-600 hover:bg-gray-50"}">Atrasados</button>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                    <div class="relative flex-shrink-0 w-full md:w-64">
                        <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input type="text" id="searchInput" value="${w.searchQuery}" placeholder="Pesquisar..." class="w-full pl-8 p-1.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                    <button id="toggle-filter-btn" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5 text-xs flex-shrink-0 ${w.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                        <i class="bi bi-funnel"></i> Filtros
                    </button>
                </div>
            </div>

            <div id="filter-panel" class="${w.isAdvancedFilterOpen?"block":"hidden"} mb-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                    
                    ${w.establishments.length>1?`
                    <div class="md:col-span-4 mb-1">
                        <label class="block text-[9px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest">Filtrar por Unidades (Multi-Seleção)</label>
                        <div class="flex flex-wrap gap-2" id="establishment-filters-container">
                            ${e}
                        </div>
                    </div>
                    `:""}
                    
                    <div>
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Data Inicial</label>
                        <input type="date" id="filterStartDate" value="${w.startDate}" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Data Final</label>
                        <input type="date" id="filterEndDate" value="${w.endDate}" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none">
                    </div>
                    
                    <div>
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Plano de Naturezas</label>
                        <select id="filterNaturezaId" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white outline-none focus:ring-1 focus:ring-indigo-500">
                            <option value="all">Todas as naturezas</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Centro de Custo</label>
                        <select id="filterCostCenterId" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white outline-none focus:ring-1 focus:ring-indigo-500">
                            <option value="all">Todos os centros</option>
                        </select>
                    </div>

                    <div class="md:col-span-4 mt-1 flex flex-col md:flex-row justify-between items-center pt-3 border-t border-gray-100 gap-3">
                        <div class="flex gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                            <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest py-1.5 mr-1">Atalhos:</span>
                            <button class="date-preset-btn px-2.5 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-md whitespace-nowrap hover:bg-gray-50 transition shadow-sm" data-preset="month">Este Mês</button>
                            <button class="date-preset-btn px-2.5 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-md whitespace-nowrap hover:bg-gray-50 transition shadow-sm" data-preset="last_month">Mês Passado</button>
                            <button class="date-preset-btn px-2.5 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-md whitespace-nowrap hover:bg-gray-50 transition shadow-sm" data-preset="year">Este Ano</button>
                        </div>

                        <div class="flex gap-2 w-full md:w-auto">
                            <button id="clear-filters-btn" class="w-full md:w-auto px-4 py-1.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-xs">Limpar</button>
                            <button id="apply-filter-btn" class="w-full md:w-auto px-5 py-1.5 bg-indigo-600 text-white font-bold rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition-all text-xs">
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-1 flex flex-col min-h-0 w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                
                <div class="hidden md:grid grid-cols-12 gap-2 px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest items-center bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                    <div class="col-span-1 flex justify-center">
                        <input type="checkbox" id="select-all-toggle" class="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                    </div>
                    <div class="col-span-1 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center" data-sort="dueDate">
                        Venc. <i class="bi bi-arrow-down-up ml-1 opacity-40 text-xs"></i>
                    </div>
                    <div class="col-span-3 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center" data-sort="description">
                        Descrição / NFS <i class="bi bi-arrow-down-up ml-1 opacity-40 text-xs"></i>
                    </div>
                    <div class="col-span-2 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center" data-sort="naturezaId">
                        Natureza / Centro
                    </div>
                    <div class="col-span-1 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center" data-sort="origin">
                        Origem
                    </div>
                    <div class="col-span-1 text-center cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center justify-center" data-sort="status">
                        Status <i class="bi bi-arrow-down-up ml-1 opacity-40 text-xs"></i>
                    </div>
                    <div class="col-span-2 text-right cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center justify-end" data-sort="amount">
                        Valor (R$) <i class="bi bi-arrow-down-up ml-1 opacity-40 text-xs"></i>
                    </div>
                    <div class="col-span-1 text-center">Ações</div>
                </div>

                <div id="list-container" class="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-2">
                    <div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-xs">Carregando dados financeiros...</p></div>
                </div>
            </div>

            <button id="fab-add" class="md:hidden fixed bottom-20 right-4 w-12 h-12 ${w.currentTab==="receivables"?"bg-emerald-600":"bg-red-600"} text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40">
                <i class="bi bi-plus-lg text-xl"></i>
            </button>

        </section>
    `,document.querySelector('.date-preset-btn[data-preset="month"]').classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),document.querySelector('.date-preset-btn[data-preset="month"]').classList.remove("bg-white","text-gray-600","border-gray-200"),qo()}function pd(){const e=w.currentTab==="receivables",t=e?w.receivables:w.payables;let a=t;if(w.statusFilter!=="all"&&(a=t.filter(n=>{const d=Ye(n.dueDate,n.status);return w.statusFilter==="overdue"?d:w.statusFilter==="pending"?n.status==="pending"&&!d:n.status===w.statusFilter})),w.searchQuery&&(a=a.filter(n=>n.description&&n.description.toLowerCase().includes(w.searchQuery)||n.entity&&n.entity.toLowerCase().includes(w.searchQuery)||n.notes&&n.notes.toLowerCase().includes(w.searchQuery))),a.sort((n,d)=>new Date(n.dueDate)-new Date(d.dueDate)),a.length===0){g("Aviso","Não há dados para exportar com os filtros atuais.","info");return}const r=new Map(w.natures.map(n=>[n.id,n.name])),s=new Map(w.costCenters.map(n=>[n.id,n.name])),o=new Map(w.establishments.map(n=>[n.id,n])),i=a.map(n=>{const d=n.status==="paid",l=Ye(n.dueDate,n.status);let c=d?"Baixado":l?"Atrasado":"A Vencer / Pendente";const u=n.naturezaId?r.get(n.naturezaId)||"Não Categorizado":"Geral",m=n.centroDeCustoId?s.get(n.centroDeCustoId)||"Não Categorizado":"Geral",x=o.get(n.establishmentId),b=x?x.name:"Atual",v=n.saleId||n.appointmentId||n.origin==="comanda"?"Comanda / PDV":"Manual";return{"Data de Vencimento":new Date(n.dueDate).toLocaleDateString("pt-BR"),"Data de Pagamento":n.paymentDate?new Date(n.paymentDate).toLocaleDateString("pt-BR"):"-",Descrição:n.description||"","Favorecido / Pagador":n.entity||"",Unidade:b,Natureza:u,"Centro de Custo":m,Origem:v,"Documento / NFS":n.documentNumber||"",Status:c,"Valor (R$)":n.amount}});try{if(typeof XLSX>"u"){g("Erro","A biblioteca de exportação (XLSX) não foi carregada no sistema.","error");return}const n=XLSX.utils.json_to_sheet(i),d=XLSX.utils.book_new();XLSX.utils.book_append_sheet(d,n,"Financeiro");const c=`Fluxo_${e?"Receitas":"Despesas"}_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(d,c)}catch(n){console.error("Erro ao exportar:",n),g("Erro","Não foi possível exportar para Excel.","error")}}function Ao(){const e=document.getElementById("select-all-toggle");e&&e.addEventListener("change",s=>{const o=s.target.checked,i=document.querySelectorAll(".item-checkbox");w.selectedIds.clear(),i.forEach(n=>{n.checked=o,o&&w.selectedIds.add(n.dataset.id)}),He()}),document.getElementById("cancel-selection-btn").addEventListener("click",()=>{w.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(s=>s.checked=!1),He()}),document.getElementById("batch-delete-btn").addEventListener("click",async()=>{const s=w.selectedIds.size;if(s===0)return;if(await W("Excluir Lançamentos",`Deseja realmente apagar ${s} registros financeiros?`))try{const i=w.currentTab==="payables"?"payables":"receivables";await mo(i,Array.from(w.selectedIds)),g("Sucesso",`${s} itens excluídos.`,"success"),w.selectedIds.clear(),He(),De()}catch{g("Erro","Falha ao excluir itens.","error")}}),document.querySelectorAll(".est-filter-checkbox").forEach(s=>{s.addEventListener("change",o=>{const i=o.target.closest("label");o.target.checked?(w.filterEstablishmentIds.add(o.target.value),i.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.remove("border-gray-200","text-gray-600")):(w.filterEstablishmentIds.delete(o.target.value),i.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.add("border-gray-200","text-gray-600"))})}),document.querySelectorAll(".sort-header").forEach(s=>{s.addEventListener("click",o=>{const i=o.currentTarget.dataset.sort;w.sortCol===i?w.sortAsc=!w.sortAsc:(w.sortCol=i,w.sortAsc=!0),pt()})}),document.getElementById("toggle-filter-btn").addEventListener("click",()=>{const s=document.getElementById("filter-panel"),o=document.getElementById("toggle-filter-btn");w.isAdvancedFilterOpen=!w.isAdvancedFilterOpen,w.isAdvancedFilterOpen?(s.classList.remove("hidden"),o.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),o.classList.remove("bg-white","text-gray-600","border-gray-200")):(s.classList.add("hidden"),o.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),o.classList.add("bg-white","text-gray-600","border-gray-200"))}),document.getElementById("settings-btn").addEventListener("click",hd);const t=document.getElementById("export-excel-btn");t&&t.addEventListener("click",pd),document.querySelectorAll('[data-action="new-financial"]').forEach(s=>{s.addEventListener("click",o=>{ma(o.target.closest("button").dataset.type)})}),document.getElementById("fab-add").addEventListener("click",()=>{const s=w.currentTab==="payables"?"payable":"receivable";ma(s)});const a=document.getElementById("tab-receivables"),r=document.getElementById("tab-payables");a.addEventListener("click",()=>Is("receivables")),r.addEventListener("click",()=>Is("payables")),document.querySelectorAll(".status-filter-btn").forEach(s=>{s.addEventListener("click",o=>{document.querySelectorAll(".status-filter-btn").forEach(i=>{i.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200","bg-red-50","text-red-700","border-red-200"),i.classList.add("bg-white","text-gray-600")}),o.target.dataset.status==="overdue"?o.target.classList.add("bg-red-50","text-red-700","border-red-200"):o.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),o.target.classList.remove("bg-white","text-gray-600"),w.statusFilter=o.target.dataset.status,pt(),Ro()})}),document.querySelectorAll(".date-preset-btn").forEach(s=>{s.addEventListener("click",o=>{document.querySelectorAll(".date-preset-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),o.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),o.target.classList.remove("bg-white","text-gray-600","border-gray-200");const i=o.target.dataset.preset,n=new Date;let d,l;i==="month"?(d=new Date(n.getFullYear(),n.getMonth(),1),l=new Date(n.getFullYear(),n.getMonth()+1,0)):i==="last_month"?(d=new Date(n.getFullYear(),n.getMonth()-1,1),l=new Date(n.getFullYear(),n.getMonth(),0)):i==="year"&&(d=new Date(n.getFullYear(),0,1),l=new Date(n.getFullYear(),11,31)),document.getElementById("filterStartDate").value=d.toISOString().split("T")[0],document.getElementById("filterEndDate").value=l.toISOString().split("T")[0],document.getElementById("apply-filter-btn").click()})}),document.getElementById("searchInput").addEventListener("input",s=>{w.searchQuery=s.target.value.toLowerCase(),pt()}),document.getElementById("clear-filters-btn").addEventListener("click",()=>{const s=new Date;document.getElementById("filterStartDate").value=new Date(s.getFullYear(),s.getMonth(),1).toISOString().split("T")[0],document.getElementById("filterEndDate").value=new Date(s.getFullYear(),s.getMonth()+1,0).toISOString().split("T")[0],document.getElementById("filterNaturezaId").value="all",document.getElementById("filterCostCenterId").value="all",w.filterEstablishmentIds.clear(),w.filterEstablishmentIds.add(p.establishmentId),Mo(),Ao()}),document.getElementById("apply-filter-btn").addEventListener("click",()=>{w.startDate=document.getElementById("filterStartDate").value,w.endDate=document.getElementById("filterEndDate").value,w.filterNaturezaId=document.getElementById("filterNaturezaId").value,w.filterCostCenterId=document.getElementById("filterCostCenterId").value,w.filterEstablishmentIds.size===0&&w.filterEstablishmentIds.add(p.establishmentId),document.getElementById("toggle-filter-btn").click(),De()}),Tt&&document.body.removeEventListener("click",Tt),Tt=s=>{const o=s.target;if(o.classList.contains("item-checkbox")||o.classList.contains("modal-item-checkbox")){const d=o.value||o.dataset.id;o.checked?w.selectedIds.add(d):w.selectedIds.delete(d),He(),s.stopPropagation();return}const i=o.closest("button[data-action]");if(i){const{action:d,type:l,id:c}=i.dataset;if(s.stopPropagation(),d==="delete"){const u=i.closest(".financial-row").dataset.item.replace(/&apos;/g,"'");bd(l,JSON.parse(u));return}if(d==="mark-as-paid"){gd(l,c);return}if(d==="manage-natures"){Da("nature");return}if(d==="manage-cost-centers"){Da("cost-center");return}}const n=o.closest(".financial-row");if(n&&document.getElementById("list-container").contains(n)&&!o.closest("button")&&!o.closest(".item-checkbox")){const{type:d}=n.dataset,l=JSON.parse(n.dataset.item.replace(/&apos;/g,"'"));ma(d,l)}},document.body.addEventListener("click",Tt),Bt&&document.getElementById("genericModal").removeEventListener("click",Bt),Bt=s=>{if(s.target.closest('[data-action="close-modal"]')){document.getElementById("genericModal").style.display="none";return}const i=s.target.closest('button[data-action^="delete-"]');if(i){const n=i.dataset.action.split("-")[1];xd(n,i.dataset.id)}},document.getElementById("genericModal").addEventListener("click",Bt)}function He(){const e=document.getElementById("batch-action-bar"),t=document.getElementById("selected-count"),a=document.getElementById("fab-add"),r=w.selectedIds.size;t.textContent=r,r>0?(e.classList.remove("hidden"),e.classList.add("flex"),a&&a.classList.add("hidden")):(e.classList.add("hidden"),e.classList.remove("flex"),a&&a.classList.remove("hidden"))}function Is(e){w.currentTab=e,w.selectedIds.clear(),He(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1);const t=document.getElementById("tab-receivables"),a=document.getElementById("tab-payables"),r=document.getElementById("fab-add");e==="receivables"?(t.classList.add("bg-white","text-emerald-700","shadow"),t.classList.remove("text-gray-600"),a.classList.remove("bg-white","text-red-700","shadow"),a.classList.add("text-gray-600"),r&&(r.className="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40")):(a.classList.add("bg-white","text-red-700","shadow"),a.classList.remove("text-gray-600"),t.classList.remove("bg-white","text-emerald-700","shadow"),t.classList.add("text-gray-600"),r&&(r.className="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40")),pt()}async function De(){const e=document.getElementById("list-container");e.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-xs">A processar transações...</p></div>';try{if(w.natures.length===0){const[o,i]=await Promise.all([ra(p.establishmentId),Oa(p.establishmentId)]);w.natures=o,w.costCenters=i,qo()}const t=Array.from(w.filterEstablishmentIds).join(","),a={startDate:w.startDate,endDate:w.endDate,establishmentId:t};w.filterNaturezaId!=="all"&&(a.natureId=w.filterNaturezaId),w.filterCostCenterId!=="all"&&(a.costCenterId=w.filterCostCenterId);const[r,s]=await Promise.all([bo(a),fo(a)]);w.payables=r.entries||[],w.receivables=s.entries||[],Ro(),pt()}catch(t){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-xs font-medium">Erro ao carregar dados: ${t.message}</p>
            </div>`}}function qo(){const e=r=>{let s='<option value="all">-- Todas as opções --</option>';const o=Qa(r),i=(n,d=0)=>{const l="  ".repeat(d)+(d>0?"↳ ":"");s+=`<option value="${n.id}">${l}${n.name}</option>`,n.children.forEach(c=>i(c,d+1))};return o.forEach(n=>i(n)),s},t=document.getElementById("filterNaturezaId"),a=document.getElementById("filterCostCenterId");t&&(t.innerHTML=e(w.natures)),a&&(a.innerHTML=e(w.costCenters))}function Ro(){const e=document.getElementById("summary-section");if(!e)return;const t=w.currentTab==="receivables";let r=t?w.receivables:w.payables;w.searchQuery&&(r=r.filter(c=>c.description&&c.description.toLowerCase().includes(w.searchQuery)||c.entity&&c.entity.toLowerCase().includes(w.searchQuery)||c.notes&&c.notes.toLowerCase().includes(w.searchQuery)));const s=r.reduce((c,u)=>c+u.amount,0),o=r.filter(c=>c.status==="paid").reduce((c,u)=>c+u.amount,0),i=r.filter(c=>c.status==="pending"&&!Ye(c.dueDate,c.status)).reduce((c,u)=>c+u.amount,0),n=r.filter(c=>Ye(c.dueDate,c.status)).reduce((c,u)=>c+u.amount,0),d=t?"emerald":"red",l=t?"Receitas":"Despesas";e.innerHTML=`
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total do Período</span>
            <span class="text-xl font-black text-gray-800 mt-0.5">${ue(s)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">A Vencer / Prov.</span>
            <span class="text-xl font-bold text-blue-600 mt-0.5">${ue(i)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${l} Baixadas</span>
            <span class="text-xl font-bold text-${d}-600 mt-0.5">${ue(o)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Atrasadas</span>
            <span class="text-xl font-bold ${n>0?"text-red-600":"text-gray-400"} mt-0.5">${ue(n)}</span>
        </div>
    `}function md(){document.querySelectorAll(".sort-header").forEach(e=>{const t=e.querySelector("i");if(!t)return;e.dataset.sort===w.sortCol?(e.classList.add("text-indigo-700"),e.classList.remove("text-gray-500"),t.className=w.sortAsc?"bi bi-arrow-up ml-1 text-indigo-600":"bi bi-arrow-down ml-1 text-indigo-600"):(e.classList.remove("text-indigo-700"),e.classList.add("text-gray-500"),t.className="bi bi-arrow-down-up ml-1 opacity-30 text-[10px]")})}function pt(){const e=document.getElementById("list-container");if(!e)return;const t=w.currentTab==="receivables",a=t?w.receivables:w.payables;let r=a;if(w.statusFilter!=="all"&&(r=a.filter(l=>{const c=Ye(l.dueDate,l.status);return w.statusFilter==="overdue"?c:w.statusFilter==="pending"?l.status==="pending"&&!c:l.status===w.statusFilter})),w.searchQuery&&(r=r.filter(l=>l.description&&l.description.toLowerCase().includes(w.searchQuery)||l.entity&&l.entity.toLowerCase().includes(w.searchQuery)||l.notes&&l.notes.toLowerCase().includes(w.searchQuery))),r.sort((l,c)=>{let u=l[w.sortCol],m=c[w.sortCol];return w.sortCol==="dueDate"?(u=new Date(u).getTime(),m=new Date(m).getTime()):(w.sortCol==="description"||w.sortCol==="status")&&(u=u?u.toLowerCase():"",m=m?m.toLowerCase():""),u<m?w.sortAsc?-1:1:u>m?w.sortAsc?1:-1:0}),md(),r.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-inbox text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum registo encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente limpar os filtros ou faça um novo lançamento.</p>
            </div>
        `;return}const s=new Map(w.natures.map(l=>[l.id,l.name])),o=new Map(w.costCenters.map(l=>[l.id,l.name])),i=new Map(w.establishments.map(l=>[l.id,l])),n=t?"receivable":"payable",d=t?"text-emerald-600":"text-red-600";e.innerHTML=r.map(l=>{const c=Po(l.dueDate),u=l.status==="paid",m=Ye(l.dueDate,l.status);let x="";u?x='<span class="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-check2-circle mr-0.5"></i> Baixado</span>':m?x='<span class="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-exclamation-circle mr-0.5"></i> Atrasado</span>':x='<span class="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-clock-history mr-0.5"></i> A Vencer</span>';const b=l.naturezaId?s.get(l.naturezaId)||"Sem Natureza":"Não Categorizado",v=l.centroDeCustoId?o.get(l.centroDeCustoId)||"Sem Centro":"Geral",E=l.saleId||l.appointmentId||l.origin==="comanda"?'<span class="text-[8px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100"><i class="bi bi-receipt mr-1"></i>Comanda</span>':'<span class="text-[8px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200"><i class="bi bi-keyboard mr-1"></i>Manual</span>',S=l.documentNumber?`<span class="text-[8px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded ml-2" title="NFS / Documento">NFS: ${l.documentNumber}</span>`:"",k=i.get(l.establishmentId);let T="";if(k){const N=k.type==="Matriz"?"bi-building":"bi-shop";T=`<span class="text-[8px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-bold border border-slate-200 flex items-center whitespace-nowrap w-max" title="Unidade: ${k.name}"><i class="bi ${N} mr-1 opacity-60"></i> ${k.name}</span>`}else T='<span class="text-[8px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-bold border border-gray-200 flex items-center whitespace-nowrap w-max"><i class="bi bi-geo-alt mr-1 opacity-60"></i> Atual</span>';const L=JSON.stringify(l).replace(/'/g,"&apos;"),R=w.selectedIds.has(l.id),B=!!l.recurrenceId?'<i class="bi bi-arrow-repeat text-indigo-400 ml-1 text-[10px]" title="Lançamento Recorrente"></i>':"",D=l.entity?`<span class="text-[9px] text-gray-400 font-medium truncate block mt-0.5"><i class="bi bi-person mr-1 opacity-40"></i>${l.entity}</span>`:"";return`
        <div class="financial-row border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-1.5 md:p-2 mb-1 ${R?"bg-indigo-50/40":""}"
             data-type="${n}"
             data-item='${L}'>
            
            <div class="absolute left-0 top-0 bottom-0 w-1 ${u?"bg-gray-200":t?"bg-emerald-400":"bg-red-400"}"></div>

            <div class="absolute right-2 top-2 md:relative md:right-auto md:top-auto md:col-span-1 md:flex md:justify-center z-10">
                <input type="checkbox" value="${l.id}" class="item-checkbox w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${R?"checked":""}>
            </div>

            <div class="flex items-center gap-2 md:col-span-1 pl-2 md:pl-0">
                <div class="flex flex-col items-center justify-center bg-white border border-gray-200 rounded w-9 h-9 flex-shrink-0 shadow-sm">
                    <span class="text-xs font-black text-gray-800 leading-none">${c.day}</span>
                    <span class="text-[7px] font-bold text-gray-400 uppercase leading-none mt-0.5">${c.month}</span>
                </div>
                <div class="md:hidden flex-1 pr-6">
                    <div class="flex items-center">
                        <p class="font-bold text-xs text-gray-800 leading-tight ${u?"line-through text-gray-400":""}">${l.description}</p>
                        ${S}
                    </div>
                    ${D}
                </div>
            </div>

            <div class="md:col-span-3 hidden md:flex flex-col justify-center min-w-0">
                <div class="flex items-center">
                    <p class="font-bold text-xs text-gray-800 truncate ${u?"line-through text-gray-400":""}" title="${l.description}">${l.description}</p>
                    ${S}
                </div>
                ${D}
                <div class="flex items-center gap-1.5 mt-0.5">
                    ${T}
                    ${B}
                </div>
            </div>

            <div class="md:col-span-2 hidden md:flex flex-col justify-center min-w-0">
                <p class="text-[9px] text-gray-600 font-bold truncate" title="Natureza: ${b}"><i class="bi bi-tag opacity-50 mr-1"></i> ${b}</p>
                <p class="text-[9px] text-gray-400 truncate mt-0.5" title="Centro: ${v}"><i class="bi bi-diagram-3 opacity-50 mr-1"></i> ${v}</p>
            </div>

            <div class="md:col-span-1 hidden md:flex items-center">
                ${E}
            </div>

            <div class="md:hidden flex flex-wrap items-center gap-1.5 mt-1 ml-11">
                ${T}
                <span class="text-[8px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 font-bold border border-gray-200 flex items-center">
                    <i class="bi bi-tag mr-1 opacity-50"></i> ${b}
                </span>
                ${E}
            </div>

            <div class="md:col-span-1 md:text-center flex justify-start md:justify-center mt-1.5 md:mt-0 ml-11 md:ml-0">
                ${x}
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:justify-end mt-1.5 md:mt-0 ml-11 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-gray-400 uppercase tracking-wide">Valor:</span>
                <p class="font-black text-sm ${u?"text-gray-400":d}">${ue(l.amount)}</p>
            </div>

            <div class="absolute right-1 bottom-1 md:relative md:right-auto md:bottom-auto md:col-span-1 md:flex md:justify-center z-10 flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-white/90 md:bg-transparent rounded px-1">
                ${u?"":`
                    <button data-action="mark-as-paid" data-type="${n}" data-id="${l.id}" class="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors" title="Dar Baixa">
                        <i class="bi bi-check2-all text-sm"></i>
                    </button>
                `}
                <button data-action="delete" data-type="${n}" data-id="${l.id}" class="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Excluir">
                    <i class="bi bi-trash3 text-[10px]"></i>
                </button>
            </div>
        </div>
        `}).join("")}async function gd(e,t){const a=new Date().toISOString().split("T")[0];try{await(e==="payable"?ln(t,a):pn(t,a)),g("Baixa Realizada","O lançamento foi registado como pago.","success"),await De()}catch(r){g("Erro",r.message,"error")}}async function bd(e,t){if(!!!t.recurrenceId){await W("Excluir Lançamento","Tem certeza? Essa ação apagará o registo do seu fluxo de caixa.")&&await No(e,[t.id]);return}fd(e,t)}function fd(e,t){const a=document.getElementById("genericModal"),s=(e==="payable"?w.payables:w.receivables).filter(l=>l.recurrenceId===t.recurrenceId).sort((l,c)=>new Date(l.dueDate)-new Date(c.dueDate));a.innerHTML=`
        <div class="modal-content max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div class="bg-red-50 px-6 py-4 border-b border-red-100 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-white rounded-lg text-red-600 shadow-sm border border-red-100">
                        <i class="bi bi-trash3 text-lg"></i>
                    </div>
                    <div>
                        <h2 class="text-lg font-bold text-gray-800 leading-tight">Exclusão em Lote</h2>
                        <p class="text-xs text-red-600 font-medium">Este lançamento possui parcelas conectadas.</p>
                    </div>
                </div>
                <button type="button" data-action="close-modal" class="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
            </div>
            
            <div class="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <span class="text-xs text-gray-600 font-bold uppercase tracking-wider">Selecione as parcelas:</span>
                <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                    <input type="checkbox" id="modal-select-all" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    Marcar Todos
                </label>
            </div>

            <div class="overflow-y-auto p-3 space-y-2 custom-scrollbar flex-1 bg-white">
                ${s.map(l=>{const c=l.id===t.id,u=l.status==="paid",m=Po(l.dueDate);return`
                    <label class="flex items-center gap-4 p-3 bg-white rounded-xl border ${c?"border-red-400 ring-1 ring-red-100 shadow-sm bg-red-50/30":"border-gray-200 hover:bg-gray-50"} cursor-pointer transition-all">
                        <input type="checkbox" class="modal-item-checkbox w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" value="${l.id}" ${c?"checked":""}>
                        
                        <div class="flex-shrink-0 w-11 h-11 bg-white rounded-lg flex flex-col items-center justify-center border border-gray-200 shadow-sm">
                            <span class="text-sm font-black text-gray-800 leading-none">${m.day}</span>
                            <span class="text-[8px] font-bold text-gray-500 uppercase leading-none mt-1">${m.month}</span>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-bold text-gray-800 truncate">${l.description}</p>
                            <p class="text-xs font-medium text-gray-500 mt-0.5">${ue(l.amount)} ${u?'<span class="text-emerald-600 font-bold ml-1">(Baixado)</span>':""}</p>
                        </div>
                        
                        ${c?'<span class="text-[10px] bg-red-600 text-white px-2 py-1 rounded-md font-bold uppercase tracking-wider shadow-sm">Alvo</span>':""}
                    </label>
                    `}).join("")}
            </div>

            <div class="p-4 border-t border-gray-200 bg-gray-50">
                <button id="confirm-batch-delete" class="w-full py-3 bg-red-600 text-white font-bold uppercase tracking-wider rounded-xl hover:bg-red-700 shadow-lg active:scale-[0.98] transition-all flex justify-center items-center gap-2">
                    Excluir Selecionados
                </button>
            </div>
        </div>
    `,a.style.display="flex";const o=a.querySelector("#modal-select-all"),i=a.querySelectorAll(".modal-item-checkbox"),n=a.querySelector("#confirm-batch-delete");o.addEventListener("change",l=>{i.forEach(c=>c.checked=l.target.checked),d()}),i.forEach(l=>l.addEventListener("change",d));function d(){const l=Array.from(i).filter(c=>c.checked).length;n.innerHTML=l>0?`<i class="bi bi-trash3"></i> Excluir ${l} Parcela(s)`:"Selecione para excluir",n.disabled=l===0,l===0?n.classList.add("opacity-50","cursor-not-allowed","bg-gray-400"):n.classList.remove("opacity-50","cursor-not-allowed","bg-gray-400")}n.addEventListener("click",async()=>{const l=Array.from(i).filter(u=>u.checked).map(u=>u.value);if(l.length===0)return;a.style.display="none",await W("Confirmar Ação",`Tem certeza que deseja apagar estas ${l.length} parcelas permanentemente?`)&&await No(e,l)}),d()}async function No(e,t){try{t.length===1?e==="payable"?await nn(t[0]):await un(t[0]):await mo(e==="payable"?"payables":"receivables",t),g("Sucesso",`${t.length} registo(s) limpo(s) do sistema.`,"success"),w.selectedIds.clear(),He(),await De()}catch(a){g("Erro",a.message,"error")}}async function xd(e,t){const r=e==="nature"?tn:sn;if(await W("Apagar Categoria","Tem certeza? Apagar um item pai também apagará as suas subcategorias."))try{await r(t),Da(e==="nature"?"nature":"cost-center")}catch(o){g("Erro",o.message,"error")}}function hd(){const e=document.getElementById("genericModal");e.innerHTML=`
        <div class="modal-content max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            <div class="p-8 text-center relative">
                <button type="button" data-action="close-modal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                    <i class="bi bi-gear-fill text-2xl text-gray-600"></i>
                </div>
                <h2 class="text-xl font-bold text-gray-900 mb-6">Configurações de ERP</h2>
                <div class="space-y-3">
                    <button data-action="manage-natures" class="w-full py-4 px-5 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 flex items-center justify-between group border border-indigo-100 transition-colors shadow-sm">
                        <span class="flex items-center gap-3"><i class="bi bi-tags-fill"></i> Plano de Naturezas</span>
                        <i class="bi bi-chevron-right text-indigo-400 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                    <button data-action="manage-cost-centers" class="w-full py-4 px-5 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 flex items-center justify-between group border border-blue-100 transition-colors shadow-sm">
                        <span class="flex items-center gap-3"><i class="bi bi-diagram-3-fill"></i> Centros de Custo</span>
                        <i class="bi bi-chevron-right text-blue-400 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </div>
            </div>
        </div>
    `,e.style.display="flex"}function ma(e,t=null){const a=document.getElementById("genericModal"),r=e==="payable",s=r?"red":"emerald",o=t?"Editar Lançamento":"Novo Lançamento",i=w.establishments.map(L=>{const R=t?t.establishmentId===L.id:L.id===p.establishmentId;return`<option value="${L.id}" ${R?"selected":""}>${L.type==="Matriz"?"🏢":"📍"} ${L.name}</option>`}).join(""),n=(L,R)=>{let H='<option value="">-- Selecione --</option>';const B=Qa(L),D=(N,z=0)=>{const O="  ".repeat(z)+(z>0?"↳ ":""),j=N.id===R?"selected":"";H+=`<option value="${N.id}" ${j}>${O}${N.name}</option>`,N.children.forEach(C=>D(C,z+1))};return B.forEach(N=>D(N)),H},l=[{value:"dinheiro",label:"Dinheiro"},{value:"pix",label:"PIX"},{value:"cartao_credito",label:"Cartão de Crédito"},{value:"cartao_debito",label:"Cartão de Débito"},{value:"transferencia",label:"Transferência Bancária"},{value:"boleto",label:"Boleto"},{value:"outros",label:"Outros"}].map(L=>`<option value="${L.value}" ${t?.paymentMethod===L.value?"selected":""}>${L.label}</option>`).join("");a.innerHTML=`
        <div class="modal-content max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden m-4 flex flex-col max-h-[90vh]">
            
            <div class="bg-${s}-600 px-5 py-4 flex justify-between items-center flex-shrink-0 relative overflow-hidden">
                <div class="absolute right-0 top-0 opacity-10 pointer-events-none">
                    <svg width="120" height="120" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="white" stroke-width="20"/></svg>
                </div>
                
                <div class="flex items-center gap-3 relative z-10">
                    <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white backdrop-blur-sm border border-white/30 shadow-inner">
                        <i class="bi ${r?"bi-arrow-down-right":"bi-arrow-up-right"} text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-lg font-bold text-white tracking-wide">${o}</h2>
                        <p class="text-[10px] text-${s}-100 font-medium uppercase tracking-widest mt-0.5">${r?"Despesa":"Receita"}</p>
                    </div>
                </div>
                <button type="button" data-action="close-modal" class="relative z-10 text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                    <i class="bi bi-x-lg text-lg font-bold"></i>
                </button>
            </div>
            
            <form id="financial-form" class="flex-1 overflow-y-auto custom-scrollbar bg-gray-50">
                <div class="p-5 space-y-4">

                    ${t?"":`
                    <div class="bg-white p-1 rounded-lg flex border border-gray-200 shadow-sm" id="mode-switcher">
                        <button type="button" class="mode-btn flex-1 py-1.5 text-xs uppercase tracking-wider font-bold rounded-md shadow-sm bg-gray-900 text-white transition-all" data-mode="single">Único</button>
                        <button type="button" class="mode-btn flex-1 py-1.5 text-xs uppercase tracking-wider font-bold rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all" data-mode="installment">Parcelado</button>
                        <button type="button" class="mode-btn flex-1 py-1.5 text-xs uppercase tracking-wider font-bold rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all" data-mode="repeat">Recorrente</button>
                    </div>
                    `}

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        <div class="md:col-span-3">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Unidade / Filial</label>
                            <select name="establishmentId" required class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${s}-500 outline-none text-xs font-bold text-gray-800 transition-shadow">
                                ${i}
                            </select>
                        </div>

                        <div class="md:col-span-1">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Valor Total (R$)</label>
                            <div class="relative">
                                <input type="number" step="0.01" name="amount" required 
                                    class="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${s}-500 outline-none font-bold text-sm text-gray-900 transition-shadow" 
                                    value="${t?.amount||""}" placeholder="0.00">
                            </div>
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Data de Vencimento</label>
                            <input type="date" name="dueDate" required 
                                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${s}-500 outline-none font-bold text-gray-800 text-xs transition-shadow" 
                                value="${t?.dueDate||new Date().toISOString().split("T")[0]}">
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Descrição / Título</label>
                            <input type="text" name="description" required 
                                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${s}-500 outline-none font-bold text-gray-800 text-xs transition-shadow" 
                                value="${t?.description||""}" placeholder="Ex: Compra de Estoque...">
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">${r?"Fornecedor / Favorecido":"Cliente / Pagador"}</label>
                            <div class="relative">
                                <i class="bi bi-person absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input type="text" name="entity" 
                                    class="w-full pl-8 pr-3 p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${s}-500 outline-none text-xs text-gray-800 transition-shadow" 
                                    value="${t?.entity||""}" placeholder="Nome de quem paga ou recebe...">
                            </div>
                        </div>
                    </div>

                    <div id="recurrence-options" style="display: none;" class="bg-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-inner">
                        <div class="flex flex-col md:flex-row gap-4 items-center">
                            <div class="w-full md:w-1/2">
                                <label id="recurrence-label" class="block text-[10px] font-bold text-indigo-800 uppercase tracking-widest mb-1">Quantidade de Meses</label>
                                <div class="flex items-center shadow-sm rounded-lg overflow-hidden border border-indigo-200">
                                    <button type="button" id="btn-minus" class="w-10 h-10 bg-white text-indigo-600 hover:bg-indigo-100 font-bold text-lg transition-colors">-</button>
                                    <input type="number" id="installments-input" name="installments" min="2" max="60" value="2" 
                                        class="w-full h-10 border-x border-indigo-100 text-center font-bold text-sm text-indigo-900 outline-none bg-indigo-50/50 appearance-none">
                                    <button type="button" id="btn-plus" class="w-10 h-10 bg-white text-indigo-600 hover:bg-indigo-100 font-bold text-lg transition-colors">+</button>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2 flex items-center justify-center">
                                <div class="text-xs text-indigo-900 bg-white px-3 py-2 rounded-lg border border-indigo-100 w-full shadow-sm">
                                    <span id="recurrence-summary">Calculando...</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Plano de Naturezas</label>
                            <select name="naturezaId" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${s}-500 outline-none text-xs font-medium text-gray-700 transition-shadow">
                                ${n(w.natures,t?.naturezaId)}
                            </select>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Centro de Custo</label>
                            <select name="centroDeCustoId" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${s}-500 outline-none text-xs font-medium text-gray-700 transition-shadow">
                                ${n(w.costCenters,t?.centroDeCustoId)}
                            </select>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Forma de Pagamento</label>
                            <select name="paymentMethod" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${s}-500 outline-none text-xs font-medium text-gray-700 transition-shadow">
                                <option value="">-- Selecione --</option>
                                ${l}
                            </select>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="md:col-span-1">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nº do Documento / NFS</label>
                            <input type="text" name="documentNumber" 
                                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${s}-500 outline-none text-xs text-gray-800 transition-shadow" 
                                value="${t?.documentNumber||""}" placeholder="Ex: NF-12345">
                        </div>
                        <div class="md:col-span-1">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Observações</label>
                            <textarea name="notes" rows="1" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${s}-500 outline-none text-xs text-gray-700 font-medium resize-none transition-shadow">${t?.notes||""}</textarea>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <div class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="status" id="status-toggle" class="sr-only peer" ${t?.status==="paid"?"checked":""}>
                                <div class="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-${s}-500 shadow-inner"></div>
                            </div>
                            <div>
                                <span class="block text-xs font-bold text-gray-800 group-hover:text-${s}-700 transition-colors uppercase tracking-wide">Marcar como ${r?"Pago":"Recebido"}</span>
                                <span class="block text-[9px] text-gray-400 font-medium mt-0.5">Retira a transação do status de pendente.</span>
                            </div>
                        </label>
                        
                        <div id="payment-date-wrapper" class="${t?.status==="paid"?"":"hidden"} flex-1 md:max-w-[220px] animate-fade-in border-l md:border-l border-gray-100 pl-0 md:pl-4 pt-3 md:pt-0 mt-3 md:mt-0">
                            <label class="block text-[10px] font-bold text-${s}-600 uppercase tracking-widest mb-1.5">Data da Baixa Bancária</label>
                            <input type="date" name="paymentDate" 
                                class="w-full p-2 bg-${s}-50 border border-${s}-200 text-${s}-800 rounded-lg text-xs font-bold outline-none focus:ring-1 focus:ring-${s}-500 shadow-sm transition-shadow" 
                                value="${t?.paymentDate||new Date().toISOString().split("T")[0]}">
                        </div>
                    </div>
                </div>

                <div class="p-5 border-t border-gray-200 bg-white flex flex-col-reverse md:flex-row gap-3 flex-shrink-0 z-10 relative shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                    <button type="button" data-action="close-modal" class="w-full md:w-auto py-2.5 px-5 bg-gray-100 text-gray-700 font-bold uppercase tracking-wider text-[10px] rounded-lg hover:bg-gray-200 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" class="w-full flex-1 py-2.5 px-5 bg-${s}-600 text-white font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-${s}-700 shadow-md shadow-${s}-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <i class="bi bi-save2"></i> <span>${t?"Salvar Alterações":"Confirmar Lançamento"}</span>
                    </button>
                </div>
            </form>
        </div>`,a.style.display="flex";const c=a.querySelector("#financial-form");let u="single",m=2;const x=c.querySelector('[name="amount"]'),b=c.querySelector("#recurrence-options"),v=c.querySelector("#recurrence-summary"),f=c.querySelector("#installments-input"),E=c.querySelector("#status-toggle"),S=c.querySelector("#payment-date-wrapper"),k=c.querySelector('[name="paymentDate"]'),T=()=>{if(u==="single")return;const L=parseFloat(x.value)||0;if(m=parseInt(f.value)||2,L===0){v.innerHTML='<span class="text-[10px] text-indigo-400 font-medium">Digite o valor total...</span>';return}if(u==="installment"){const R=L/m;v.innerHTML=`
                <div>
                    <span class="block text-[9px] text-indigo-400 uppercase tracking-widest font-bold mb-0.5">Simulação do Parcelamento</span>
                    <span class="font-bold text-sm text-indigo-700 block leading-tight">${m}x de ${ue(R)}</span>
                    <span class="text-[10px] text-indigo-500 font-medium">Total: ${ue(L)}</span>
                </div>
            `}else if(u==="repeat"){const R=L*m;v.innerHTML=`
                <div>
                    <span class="block text-[9px] text-indigo-400 uppercase tracking-widest font-bold mb-0.5">Geração Recorrente Fixa</span>
                    <span class="font-bold text-sm text-indigo-700 block leading-tight">${m}x de ${ue(L)}</span>
                    <span class="text-[10px] text-indigo-500 font-medium">Lançamento Total: ${ue(R)}</span>
                </div>
            `}};c.addEventListener("click",L=>{const R=L.target.closest(".mode-btn");if(R&&!t)if(L.preventDefault(),c.querySelectorAll(".mode-btn").forEach(D=>{D.classList.remove("bg-gray-900","text-white","shadow-sm"),D.classList.add("text-gray-500","hover:bg-gray-100")}),R.classList.add("bg-gray-900","text-white","shadow-sm"),R.classList.remove("text-gray-500","hover:bg-gray-100"),u=R.dataset.mode,u==="single")b.style.display="none";else{b.style.display="block";const D=b.querySelector("#recurrence-label");D&&(D.textContent=u==="installment"?"Número de Parcelas":"Repetir por quantos meses?"),T()}if(L.target.closest("#btn-minus")&&f){L.preventDefault();let D=parseInt(f.value)||2;D>2&&(f.value=D-1,T())}if(L.target.closest("#btn-plus")&&f){L.preventDefault();let D=parseInt(f.value)||2;D<60&&(f.value=D+1,T())}}),x.addEventListener("input",T),f&&f.addEventListener("input",T),E.addEventListener("change",()=>{E.checked?(S.classList.remove("hidden"),k.required=!0):(S.classList.add("hidden"),k.required=!1)}),c.addEventListener("submit",async L=>{L.preventDefault();const R=c.querySelector('button[type="submit"]'),H=R.innerHTML;R.disabled=!0,R.innerHTML='<div class="loader-small border-white"></div> A gravar...';const B=new FormData(c),D=E.checked,N=parseFloat(B.get("amount"));let z=N,O=1;!t&&u!=="single"&&(O=parseInt(B.get("installments")),u==="repeat"&&(z=N*O));const j={establishmentId:B.get("establishmentId"),description:B.get("description"),amount:z,dueDate:B.get("dueDate"),naturezaId:B.get("naturezaId")||null,centroDeCustoId:B.get("centroDeCustoId")||null,entity:B.get("entity")||null,paymentMethod:B.get("paymentMethod")||null,documentNumber:B.get("documentNumber")||null,notes:B.get("notes"),status:D?"paid":"pending",paymentDate:D?B.get("paymentDate"):null,installments:O};O>1&&!t&&(j.recurrenceId=self.crypto.randomUUID());try{t?(await(r?rn(t.id,j):cn(t.id,j)),g("Sucesso","Atualizado com sucesso!","success")):(await(r?on(j):dn(j)),g("Sucesso","Lançamento criado!","success")),document.getElementById("genericModal").style.display="none",De()}catch(C){g("Erro",C.message||"Erro ao salvar","error"),R.disabled=!1,R.innerHTML=H}})}const vd=e=>I("/api/commissions/calculate",{method:"POST",body:JSON.stringify(e)}),yd=e=>I("/api/commissions/save",{method:"POST",body:JSON.stringify(e)}),wd=(e,t)=>{const a=new URLSearchParams({startDate:e,endDate:t}).toString();return I(`/api/commissions/stats?${a}`)},kd=(e={})=>{Object.keys(e).forEach(r=>(e[r]===void 0||e[r]===null||e[r]==="")&&delete e[r]);const t=new URLSearchParams(e).toString(),a=`/api/commissions/history${t?"?"+t:""}`;return I(a)},jo=e=>I(`/api/commissions/report/${e}`,{method:"DELETE"}),Ta=new Date,Sd=new Date(Ta.getFullYear(),Ta.getMonth(),1);let P={professionals:[],reports:[],calculationResult:null,periodString:"",establishments:[],filterEstablishmentIds:new Set,selectedIds:new Set,startDate:Sd.toISOString().split("T")[0],endDate:Ta.toISOString().split("T")[0],professionalId:"all",searchQuery:"",stats:{revenue:0,commissions:0,margin:0,netPaid:0}},Pt=null;const $d=document.getElementById("content");function mt(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e||0)}function Ed(e){return e?new Date(e).toLocaleDateString("pt-BR"):"--/--/----"}function Wt(e){if(!e)return"PR";const t=e.trim().split(" ");return t.length>=2?(t[0][0]+t[t.length-1][0]).toUpperCase():e.substring(0,2).toUpperCase()}async function Id(){try{const[e,t]=await Promise.all([le(p.establishmentId),Te().catch(()=>({matrizes:[]}))]);P.professionals=e;const a=t.matrizes||[];P.establishments=[],a.forEach(r=>{P.establishments.push({id:r.id,name:r.name,type:"Matriz"}),r.branches&&r.branches.forEach(s=>P.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),P.filterEstablishmentIds.size===0&&P.filterEstablishmentIds.add(p.establishmentId)}catch(e){console.error("Erro na inicialização de comissões",e)}Ld(),Dd(),await Xe()}function Ld(){const e=P.professionals.map(a=>`<option value="${a.id}">${a.name}</option>`).join(""),t=P.establishments.map(a=>`
        <label class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border ${P.filterEstablishmentIds.has(a.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-slate-200 text-slate-600"} rounded-lg cursor-pointer hover:bg-slate-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${a.id}" ${P.filterEstablishmentIds.has(a.id)?"checked":""}>
            <span class="text-[10px] font-bold whitespace-nowrap">${a.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${a.name}</span>
        </label>
    `).join("");$d.innerHTML=`
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative bg-slate-50">
            
            <div id="batch-action-bar" class="hidden absolute top-4 left-4 right-4 z-30 bg-slate-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down">
                <div class="flex items-center gap-3">
                    <button id="cancel-selection-btn" class="p-1.5 hover:bg-slate-700 rounded-full transition-colors text-slate-300 hover:text-white">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <span class="font-bold text-sm tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Selecionados</span>
                </div>
                <button id="batch-delete-btn" class="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-sm">
                    <i class="bi bi-trash3"></i> Excluir Recibos
                </button>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-3 w-full">
                <div class="flex items-center gap-2">
                    <div class="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-200">
                        <i class="bi bi-percent text-xl"></i>
                    </div>
                    <div>
                        <h1 class="text-lg font-black text-slate-800 tracking-tight">Comissões</h1>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gestão de Pagamentos</p>
                    </div>
                </div>

                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <button id="export-excel-btn" class="py-1.5 px-3 bg-white border border-slate-300 text-emerald-700 font-bold rounded-lg hover:bg-emerald-50 transition shadow-sm flex items-center gap-2 text-xs">
                        <i class="bi bi-file-earmark-excel-fill"></i> Excel
                    </button>
                    <button data-action="new-calculation" class="flex-1 md:flex-none py-1.5 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-sm flex items-center justify-center gap-2 text-xs">
                        <i class="bi bi-calculator"></i> Nova Apuração
                    </button>
                </div>
            </div>

            ${P.establishments.length>1?`
            <div class="mb-3">
                <div class="flex flex-wrap gap-2" id="establishment-filters-container">
                    ${t}
                </div>
            </div>
            `:""}

            <div id="kpi-section" class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-graph-up-arrow text-5xl"></i></div>
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest z-10">Faturamento Base</span>
                    <span id="kpi-revenue" class="text-base md:text-xl font-black text-slate-800 mt-0.5 z-10">R$ 0,00</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-cash-stack text-5xl"></i></div>
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest z-10">Comissões (Bruto)</span>
                    <span id="kpi-commissions" class="text-base md:text-xl font-bold text-amber-600 mt-0.5 z-10">R$ 0,00</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-pie-chart text-5xl"></i></div>
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest z-10">Retenção (Empresa)</span>
                    <span id="kpi-margin" class="text-base md:text-xl font-bold text-blue-600 mt-0.5 z-10">0%</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-check-circle text-5xl"></i></div>
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest z-10">Total Líquido Pago</span>
                    <span id="kpi-net" class="text-base md:text-xl font-bold text-emerald-600 mt-0.5 z-10">R$ 0,00</span>
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-2 w-full bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                <div class="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
                    <div class="flex items-center gap-1 w-full md:w-auto">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1 hidden md:block">Período:</span>
                        <input type="date" id="filter-start" value="${P.startDate}" class="py-1 px-2 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-700 outline-none focus:border-indigo-400">
                        <span class="text-slate-400 text-xs">até</span>
                        <input type="date" id="filter-end" value="${P.endDate}" class="py-1 px-2 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-700 outline-none focus:border-indigo-400">
                    </div>
                    
                    <div class="flex items-center gap-1 w-full md:w-auto">
                        <select id="filter-prof" class="py-1 px-2 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-700 outline-none focus:border-indigo-400 w-full md:w-40">
                            <option value="all">Todos os Profissionais</option>
                            ${e}
                        </select>
                    </div>

                    <button data-action="apply-filters" class="w-full md:w-auto py-1 px-3 bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold rounded hover:bg-indigo-100 transition shadow-sm text-xs">
                        Filtrar
                    </button>
                </div>

                <div class="relative w-full md:w-56 mt-1 md:mt-0">
                    <i class="bi bi-search absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400 text-[10px]"></i>
                    <input type="text" id="search-input" placeholder="Buscar relatório..." class="w-full pl-6 py-1 pr-2 bg-slate-50 border border-slate-200 rounded text-xs outline-none focus:border-indigo-400 font-semibold text-slate-700">
                </div>
            </div>

            <div class="flex-1 flex flex-col min-h-0 w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div class="hidden md:grid grid-cols-12 gap-2 px-3 py-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest items-center bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                    <div class="col-span-3 flex items-center gap-2">
                        <input type="checkbox" id="select-all-toggle" class="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                        Profissional
                    </div>
                    <div class="col-span-2">Período de Ref.</div>
                    <div class="col-span-2 text-right">Bruto (R$)</div>
                    <div class="col-span-2 text-right">Ajustes (R$)</div>
                    <div class="col-span-2 text-right text-indigo-600">Líquido Pago</div>
                    <div class="col-span-1 text-center">Ações</div>
                </div>

                <div id="list-container" class="flex-1 overflow-y-auto custom-scrollbar p-2 md:p-0">
                    <div class="flex justify-center py-20"><div class="loader"></div></div>
                </div>
            </div>
        </section>
    `}async function Xe(){const e=document.getElementById("list-container");e.innerHTML='<div class="flex justify-center py-20"><div class="loader"></div></div>';const t=Array.from(P.filterEstablishmentIds).join(",");try{const[a,r]=await Promise.all([kd({startDate:P.startDate,endDate:P.endDate,professionalId:P.professionalId,establishmentId:t}),wd(P.startDate,P.endDate,t)]);P.reports=a||[];const s=P.reports.reduce((o,i)=>o+(i.summary.finalValue||i.summary.totalCommission),0);P.stats={revenue:r.totalRevenue||0,commissions:r.totalCommissionsPaid||0,margin:r.totalRevenue>0?((r.totalRevenue-r.totalCommissionsPaid)/r.totalRevenue*100).toFixed(1):0,netPaid:s},P.selectedIds.clear(),gt(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),Cd(),Fo()}catch(a){console.error(a),e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-slate-600 text-xs font-medium">Erro ao carregar dados.</p>
            </div>`}}function Cd(){document.getElementById("kpi-revenue").textContent=mt(P.stats.revenue),document.getElementById("kpi-commissions").textContent=mt(P.stats.commissions),document.getElementById("kpi-margin").textContent=`${P.stats.margin}%`,document.getElementById("kpi-net").textContent=mt(P.stats.netPaid)}function Fo(){const e=document.getElementById("list-container");let t=P.reports;if(P.searchQuery){const a=P.searchQuery.toLowerCase();t=t.filter(r=>r.professionalName.toLowerCase().includes(a)||r.period.toLowerCase().includes(a))}if(t.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 text-center">
                <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-receipt text-xl text-slate-300"></i>
                </div>
                <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhum pagamento encontrado</h3>
                <p class="text-[10px] text-slate-400 max-w-xs">Não há relatórios gerados para este período ou profissional.</p>
            </div>
        `;return}e.innerHTML=t.map(a=>{const r=Ed(a.createdAt),s=a.summary.totalCommission,o=a.summary.extraDebit||0,i=a.summary.extraCredit||0,n=a.summary.finalValue||s,d=P.selectedIds.has(a.id);let l="";return o>0&&i>0?l=`<span class="text-red-500">-R$${o.toFixed(2)}</span> / <span class="text-emerald-500">+R$${i.toFixed(2)}</span>`:o>0?l=`<span class="text-red-500">-R$ ${o.toFixed(2)}</span>`:i>0?l=`<span class="text-emerald-500">+R$ ${i.toFixed(2)}</span>`:l='<span class="text-slate-300">--</span>',`
        <div class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-2.5 md:px-3 md:py-2 mb-2 md:mb-0 bg-white md:bg-transparent rounded-xl md:rounded-none shadow-sm md:shadow-none border md:border-b ${d?"bg-indigo-50/40":""}">
            
            <div class="absolute right-2 top-2 md:relative md:right-auto md:top-auto md:col-span-3 md:flex md:items-center md:gap-2 z-10">
                <input type="checkbox" value="${a.id}" class="item-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${d?"checked":""}>
                <div class="hidden md:flex items-center gap-2 pr-2">
                    <div class="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                        ${Wt(a.professionalName)}
                    </div>
                    <div class="min-w-0">
                        <p class="font-bold text-xs text-slate-800 truncate" title="${a.professionalName}">${a.professionalName}</p>
                        <p class="text-[9px] text-slate-400 font-medium truncate mt-0.5">Gerado: ${r}</p>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-2 md:hidden mb-2 pr-8">
                <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    ${Wt(a.professionalName)}
                </div>
                <div class="min-w-0">
                    <p class="font-bold text-xs text-slate-800 truncate">${a.professionalName}</p>
                    <p class="text-[9px] text-slate-400 font-medium truncate mt-0.5">Gerado: ${r}</p>
                </div>
            </div>

            <div class="md:col-span-2 mb-1 md:mb-0 flex items-center ml-10 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest w-16">Período:</span>
                <span class="text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                    <i class="bi bi-calendar3 opacity-50 mr-1"></i> ${a.period}
                </span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-1 md:mb-0 ml-10 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest">Bruto:</span>
                <span class="text-xs font-bold text-slate-700">${mt(s)}</span>
            </div>
            
            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-1 md:mb-0 ml-10 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ajustes:</span>
                <span class="text-[10px] font-bold">${l}</span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block pt-1 md:pt-0 border-t md:border-0 border-slate-100 ml-10 md:ml-0 mt-1 md:mt-0">
                <span class="md:hidden text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Líquido Pago:</span>
                <span class="text-xs font-black text-emerald-600">${mt(n)}</span>
            </div>

            <div class="md:col-span-1 flex justify-end gap-1 mt-2 md:mt-0 ml-10 md:ml-0">
                <button data-action="view-report-details" data-id="${a.id}" class="w-7 h-7 rounded-md flex items-center justify-center text-slate-600 bg-slate-50 hover:bg-slate-200 transition-colors border border-slate-200 shadow-sm" title="Ver Detalhes (Itens)">
                    <i class="bi bi-eye text-[10px]"></i>
                </button>
                <button data-action="print-receipt" data-id="${a.id}" class="w-7 h-7 rounded-md flex items-center justify-center text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-100 shadow-sm" title="Imprimir Recibo">
                    <i class="bi bi-printer text-[10px]"></i>
                </button>
                <button data-action="delete-report" data-id="${a.id}" class="w-7 h-7 rounded-md flex items-center justify-center text-red-500 bg-red-50 hover:bg-red-100 transition-colors border border-red-100 shadow-sm" title="Excluir e Estornar">
                    <i class="bi bi-trash3 text-[10px]"></i>
                </button>
            </div>
        </div>
        `}).join("")}function Dd(){Pt&&document.body.removeEventListener("click",Pt),Pt=s=>{const o=s.target;if(o.classList.contains("item-checkbox")){const n=o.value;o.checked?P.selectedIds.add(n):P.selectedIds.delete(n),gt(),s.stopPropagation();return}const i=o.closest("button[data-action]");if(i){const n=i.dataset.action,d=i.dataset.id;switch(n){case"apply-filters":P.startDate=document.getElementById("filter-start").value,P.endDate=document.getElementById("filter-end").value,P.professionalId=document.getElementById("filter-prof").value,Xe();break;case"new-calculation":Td();break;case"print-receipt":jd(d);break;case"delete-report":Hd(d);break;case"view-report-details":Rd(d);break;case"toggle-all-profs":const l=document.querySelectorAll(".prof-checkbox"),c=Array.from(l).every(b=>b.checked);l.forEach(b=>b.checked=!c);break;case"calculate-preview":Bd();break;case"save-final-reports":qd();break;case"toggle-preview-details":const u=i.dataset.idx,m=document.getElementById(`preview-details-${u}`),x=i.querySelector("i");m&&(m.classList.contains("hidden")?(m.classList.remove("hidden"),x&&x.classList.replace("bi-chevron-down","bi-chevron-up")):(m.classList.add("hidden"),x&&x.classList.replace("bi-chevron-up","bi-chevron-down")));break}}},document.body.addEventListener("click",Pt),document.getElementById("search-input").addEventListener("input",s=>{P.searchQuery=s.target.value,Fo()}),document.body.addEventListener("input",s=>{(s.target.classList.contains("input-debit")||s.target.classList.contains("input-credit")||s.target.classList.contains("input-notes"))&&Md(s.target.dataset.idx)});const e=document.getElementById("select-all-toggle");e&&e.addEventListener("change",s=>{const o=s.target.checked,i=document.querySelectorAll(".item-checkbox");P.selectedIds.clear(),i.forEach(n=>{n.checked=o,o&&P.selectedIds.add(n.value)}),gt()});const t=document.getElementById("cancel-selection-btn");t&&t.addEventListener("click",()=>{P.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(s=>s.checked=!1),gt()});const a=document.getElementById("batch-delete-btn");a&&a.addEventListener("click",Fd),document.querySelectorAll(".est-filter-checkbox").forEach(s=>{s.addEventListener("change",o=>{const i=o.target.closest("label");o.target.checked?(P.filterEstablishmentIds.add(o.target.value),i.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.remove("border-slate-200","text-slate-600")):(P.filterEstablishmentIds.delete(o.target.value),i.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.add("border-slate-200","text-slate-600")),Xe()})});const r=document.getElementById("export-excel-btn");r&&r.addEventListener("click",Nd)}function gt(){const e=document.getElementById("batch-action-bar"),t=document.getElementById("selected-count"),a=P.selectedIds.size;t&&(t.textContent=a),e&&(a>0?(e.classList.remove("hidden"),e.classList.add("flex")):(e.classList.add("hidden"),e.classList.remove("flex")))}function Td(){const e=new Date().toISOString().split("T")[0],t=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],a=P.professionals.map(s=>`
        <label class="flex items-center p-2.5 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-indigo-300 transition-all cursor-pointer group">
            <input type="checkbox" value="${s.id}" class="prof-checkbox w-3.5 h-3.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500">
            <div class="ml-2 flex items-center gap-2">
                <div class="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[9px] font-bold group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">${Wt(s.name)}</div>
                <span class="font-bold text-xs text-slate-700">${s.name}</span>
            </div>
        </label>`).join(""),r=`
        <div id="calc-flow-container" class="flex flex-col h-[70vh] md:h-auto max-h-[85vh] overflow-hidden">
            
            <div id="calc-step-1" class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50">
                <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                    <h3 class="text-xs font-bold text-slate-800 mb-2 flex items-center gap-2"><i class="bi bi-calendar-range text-indigo-500"></i> Período de Apuração</h3>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Início</label>
                            <input type="date" id="calc-start-date" value="${t}" class="w-full mt-0.5 p-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-semibold outline-none focus:border-indigo-400">
                        </div>
                        <div>
                            <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Fim</label>
                            <input type="date" id="calc-end-date" value="${e}" class="w-full mt-0.5 p-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-semibold outline-none focus:border-indigo-400">
                        </div>
                    </div>
                </div>

                <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                    <h3 class="text-xs font-bold text-slate-800 mb-2 flex items-center gap-2"><i class="bi bi-tags text-indigo-500"></i> Considerar nas vendas</h3>
                    <div class="grid grid-cols-3 gap-2">
                        <label class="flex items-center justify-center p-1.5 border border-slate-200 rounded bg-slate-50 cursor-pointer hover:bg-white transition-colors">
                            <input type="checkbox" id="calc-type-services" checked class="w-3 h-3 text-indigo-600 rounded">
                            <span class="ml-1.5 text-[10px] font-bold text-slate-600">Serviços</span>
                        </label>
                        <label class="flex items-center justify-center p-1.5 border border-slate-200 rounded bg-slate-50 cursor-pointer hover:bg-white transition-colors">
                            <input type="checkbox" id="calc-type-products" checked class="w-3 h-3 text-indigo-600 rounded">
                            <span class="ml-1.5 text-[10px] font-bold text-slate-600">Produtos</span>
                        </label>
                        <label class="flex items-center justify-center p-1.5 border border-slate-200 rounded bg-slate-50 cursor-pointer hover:bg-white transition-colors">
                            <input type="checkbox" id="calc-type-packages" class="w-3 h-3 text-indigo-600 rounded">
                            <span class="ml-1.5 text-[10px] font-bold text-slate-600">Pacotes</span>
                        </label>
                    </div>
                </div>

                <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-xs font-bold text-slate-800 flex items-center gap-2"><i class="bi bi-people text-indigo-500"></i> Equipe</h3>
                        <button type="button" data-action="toggle-all-profs" class="text-[9px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">Inverter</button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                        ${a}
                    </div>
                </div>
            </div>

            <div id="calc-step-2" class="hidden flex-1 overflow-y-auto p-3 md:p-4 space-y-3 custom-scrollbar bg-slate-50">
                </div>

            <footer class="p-3 border-t border-slate-200 bg-white flex justify-end gap-2 z-10 shadow-md">
                <button type="button" data-action="close-modal" class="py-2 px-4 bg-slate-100 text-slate-700 font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-slate-200 transition-colors">Cancelar</button>
                <button type="button" data-action="calculate-preview" id="btn-calc-action" class="py-2 px-5 bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-indigo-700 shadow-sm transition-all flex items-center gap-2">
                    <i class="bi bi-lightning-charge"></i> Calcular Vendas
                </button>
            </footer>
        </div>
    `;re({title:"Nova Apuração de Comissões",contentHTML:r,maxWidth:"max-w-2xl"})}async function Bd(){const e=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(l=>l.value);if(e.length===0)return g("Atenção","Selecione pelo menos um profissional.","warning");const t=Array.from(P.filterEstablishmentIds).join(","),a=document.getElementById("calc-start-date"),r=document.getElementById("calc-end-date");if(!a||!r||!a.value||!r.value)return g("Atenção","As datas de início e fim são obrigatórias.","warning");const s={professionalIds:e,startDate:a.value,endDate:r.value,establishmentId:t,calculationTypes:{services:document.getElementById("calc-type-services")?.checked||!1,products:document.getElementById("calc-type-products")?.checked||!1,packages:document.getElementById("calc-type-packages")?.checked||!1}},o=new Date(s.startDate+"T00:00:00").toLocaleDateString("pt-BR"),i=new Date(s.endDate+"T00:00:00").toLocaleDateString("pt-BR");P.periodString=`${o} a ${i}`;const n=document.getElementById("btn-calc-action"),d=n.innerHTML;n.innerHTML='<div class="loader-small border-white mr-1"></div> Processando...',n.disabled=!0;try{console.log("Enviando cálculo...",s);const l=await vd(s);P.calculationResult=l.map(c=>({...c,extraDebit:0,extraCredit:0,finalValue:c.summary.totalCommission,notes:""})),Pd()}catch(l){g("Erro na Apuração",l.message,"error"),n.innerHTML=d,n.disabled=!1}}function Pd(){const e=P.calculationResult;if(!e||e.length===0||e.every(i=>i.summary.totalCommission===0)){g("Aviso","Nenhuma comissão encontrada para os filtros selecionados.","info");const i=document.getElementById("btn-calc-action");i.innerHTML='<i class="bi bi-lightning-charge"></i> Calcular Vendas',i.disabled=!1;return}const t=document.getElementById("calc-step-1"),a=document.getElementById("calc-step-2"),r=document.getElementById("btn-calc-action");t&&t.classList.add("hidden"),a&&a.classList.remove("hidden"),r&&(r.dataset.action="save-final-reports",r.className="py-2 px-5 bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-emerald-700 shadow-sm transition-all flex items-center gap-2",r.innerHTML='<i class="bi bi-check2-circle text-sm"></i> Confirmar Pagamentos',r.disabled=!1);const s=e.reduce((i,n)=>i+n.finalValue,0),o=e.map((i,n)=>{if(i.summary.totalCommission===0)return"";const d=(i.items||[]).map(c=>`
            <tr class="border-b border-slate-100 last:border-0">
                <td class="py-1.5 truncate max-w-[120px] text-slate-700" title="${c.item}">${c.item}</td>
                <td class="py-1.5 text-slate-500">${c.client||"--"}</td>
                <td class="py-1.5 text-right text-slate-600">R$ ${(c.value||0).toFixed(2)}</td>
                <td class="py-1.5 text-center text-slate-600">${c.commissionRate}%</td>
                <td class="py-1.5 text-right font-bold text-emerald-600">R$ ${(c.commissionValue||0).toFixed(2)}</td>
            </tr>
        `).join(""),l=`
            <div id="preview-details-${n}" class="hidden mt-3 pt-3 border-t border-slate-100">
                <h5 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Itens Processados</h5>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-[10px]">
                        <thead class="text-slate-400">
                            <tr>
                                <th class="pb-1 font-bold">Serviço/Produto</th>
                                <th class="pb-1 font-bold">Cliente</th>
                                <th class="pb-1 font-bold text-right">Base</th>
                                <th class="pb-1 font-bold text-center">%</th>
                                <th class="pb-1 font-bold text-right">Comissão</th>
                            </tr>
                        </thead>
                        <tbody>${d||'<tr><td colspan="5" class="py-2 text-center text-slate-400">Nenhum item</td></tr>'}</tbody>
                    </table>
                </div>
            </div>
        `;return`
        <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-200 mb-2 relative overflow-hidden">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
            
            <div class="flex justify-between items-start mb-2 border-b border-slate-100 pb-2 pl-2">
                <div>
                    <h4 class="font-black text-slate-800 text-xs">${i.professionalName}</h4>
                    <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">${i.summary.totalItems} itens processados</p>
                </div>
                <div class="text-right bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    <p class="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Valor Bruto</p>
                    <p class="font-black text-slate-700 text-xs">R$ ${i.summary.totalCommission.toFixed(2)}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-2 pl-2 mb-2">
                <div>
                    <label class="text-[9px] font-bold text-red-400 uppercase tracking-widest"><i class="bi bi-dash-circle mr-1"></i>Descontos</label>
                    <div class="relative mt-0.5">
                        <span class="absolute left-2 top-1/2 transform -translate-y-1/2 text-red-400 font-bold text-[10px]">R$</span>
                        <input type="number" step="0.01" data-idx="${n}" class="input-debit w-full pl-6 p-1.5 border border-red-200 rounded bg-red-50/50 font-black text-xs text-red-600 outline-none focus:ring-1 focus:ring-red-400" placeholder="0.00">
                    </div>
                </div>
                <div>
                    <label class="text-[9px] font-bold text-emerald-400 uppercase tracking-widest"><i class="bi bi-plus-circle mr-1"></i>Bônus</label>
                    <div class="relative mt-0.5">
                        <span class="absolute left-2 top-1/2 transform -translate-y-1/2 text-emerald-400 font-bold text-[10px]">R$</span>
                        <input type="number" step="0.01" data-idx="${n}" class="input-credit w-full pl-6 p-1.5 border border-emerald-200 rounded bg-emerald-50/50 font-black text-xs text-emerald-600 outline-none focus:ring-1 focus:ring-emerald-400" placeholder="0.00">
                    </div>
                </div>
            </div>

            <div class="pl-2 mb-2">
                <input type="text" data-idx="${n}" class="input-notes w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-[10px] outline-none focus:border-indigo-400 text-slate-600" placeholder="Motivo dos ajustes (Opcional)">
            </div>
            
            <div class="flex justify-between items-center bg-indigo-50/50 border border-indigo-100 p-2 rounded-md pl-3 ml-2">
                <span class="text-[9px] font-black text-indigo-800 uppercase tracking-widest">Líquido a Pagar</span>
                <span class="text-sm font-black text-indigo-700 final-value-display drop-shadow-sm" data-idx="${n}">R$ ${i.finalValue.toFixed(2)}</span>
            </div>

            <div class="pl-2">
                <button type="button" data-action="toggle-preview-details" data-idx="${n}" class="text-[9px] font-bold text-indigo-500 hover:text-indigo-700 uppercase tracking-widest mt-2 flex items-center gap-1 transition-colors">
                    <i class="bi bi-chevron-down"></i> Ver Detalhes dos Itens
                </button>
                ${l}
            </div>
        </div>
        `}).join("");a&&(a.innerHTML=`
        <div class="bg-indigo-600 p-3 rounded-xl shadow-sm text-white mb-2 flex justify-between items-center">
            <div class="bg-indigo-900/40 p-1.5 px-2 rounded-md backdrop-blur-sm border border-indigo-400/30">
                <span class="block text-[9px] font-bold text-indigo-200 uppercase tracking-widest mb-0.5">Total a Pagar (Equipe)</span>
                <span id="grand-total-preview" class="text-lg font-black drop-shadow-md">R$ ${s.toFixed(2)}</span>
            </div>
            <div class="text-right">
                <span class="block text-[9px] font-bold text-indigo-200 uppercase tracking-widest mb-0.5">Período</span>
                <span class="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded border border-white/20">${P.periodString}</span>
            </div>
        </div>
        ${o}
    `)}function Md(e){const t=document.querySelector(`.input-debit[data-idx="${e}"]`),a=document.querySelector(`.input-credit[data-idx="${e}"]`),r=document.querySelector(`.input-notes[data-idx="${e}"]`);let s=parseFloat(t?.value)||0,o=parseFloat(a?.value)||0,i=r?.value||"";if(P.calculationResult&&P.calculationResult[e]){const n=P.calculationResult[e];n.extraDebit=s,n.extraCredit=o,n.notes=i,n.finalValue=n.summary.totalCommission-s+o;const d=document.querySelector(`.final-value-display[data-idx="${e}"]`);d&&(d.innerText=`R$ ${n.finalValue.toFixed(2)}`),Ad()}}function Ad(){const e=P.calculationResult.reduce((a,r)=>a+r.finalValue,0),t=document.getElementById("grand-total-preview");t&&(t.innerText=`R$ ${e.toFixed(2)}`)}async function qd(){const e=P.calculationResult.filter(s=>s.summary.totalCommission>0),t=e.length;if(t===0)return g("Aviso","Não há valores para pagar.","info");if(!await W("Confirmar Pagamentos",`Você está prestes a gerar recibos e marcar as vendas de ${t} profissional(is) como PAGAS. Confirmar?`))return;const r=document.getElementById("btn-calc-action");r.innerHTML='<div class="loader-small border-white mr-1"></div> Finalizando...',r.disabled=!0;try{const s=e.map(o=>{const i=(o.items||[]).map(n=>n.originalSaleId).filter(n=>n!=null);return yd({professionalId:o.professionalId,professionalName:o.professionalName,period:P.periodString,processedSalesIds:i,establishmentId:p.establishmentId,reportData:{...o,summary:{...o.summary,finalValue:o.finalValue,extraDebit:o.extraDebit||0,extraCredit:o.extraCredit||0,notes:o.notes||""}}})});await Promise.all(s),g("Sucesso","Pagamentos registrados e vendas baixadas!","success"),P.calculationResult=null,document.getElementById("genericModal").style.display="none",await Xe()}catch(s){g("Erro ao Salvar",s.message,"error"),r.innerHTML='<i class="bi bi-check2-circle text-sm"></i> Confirmar Pagamentos',r.disabled=!1}}function Rd(e){const t=P.reports.find(c=>c.id===e);if(!t)return;const a=t.reportData?.items||t.items||[],r=t.summary,s=r.extraDebit||0,o=r.extraCredit||0,i=r.notes||"",n=a.map(c=>`
        <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
            <td class="py-2.5 px-3 text-slate-700 font-medium whitespace-normal min-w-[150px]">${c.item}</td>
            <td class="py-2.5 px-3 text-slate-500">${c.client||"--"}</td>
            <td class="py-2.5 px-3 text-right text-slate-600">R$ ${(c.value||0).toFixed(2)}</td>
            <td class="py-2.5 px-3 text-center text-slate-600">${c.commissionRate}%</td>
            <td class="py-2.5 px-3 text-right font-bold text-emerald-600">R$ ${(c.commissionValue||0).toFixed(2)}</td>
        </tr>
    `).join("");let d="";(s>0||o>0||i)&&(d=`
            <div class="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h5 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3"><i class="bi bi-sliders mr-1"></i> Ajustes Aplicados</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    ${s>0?`<div class="text-sm bg-white p-2 rounded-lg border border-slate-100 shadow-sm"><span class="text-slate-500 block text-[10px] uppercase font-bold">Descontos/Vales:</span> <span class="font-black text-red-500">-R$ ${s.toFixed(2)}</span></div>`:""}
                    ${o>0?`<div class="text-sm bg-white p-2 rounded-lg border border-slate-100 shadow-sm"><span class="text-slate-500 block text-[10px] uppercase font-bold">Bônus Extras:</span> <span class="font-black text-emerald-500">+R$ ${o.toFixed(2)}</span></div>`:""}
                </div>
                ${i?`<div class="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-100 shadow-sm"><strong class="block text-[10px] uppercase text-slate-400 mb-1">Motivo do Ajuste:</strong> ${i}</div>`:""}
            </div>
        `);const l=`
        <div class="max-h-[75vh] overflow-y-auto custom-scrollbar p-1">
            <div class="flex flex-col md:flex-row justify-between md:items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-4 gap-3">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm border border-indigo-100">
                        ${Wt(t.professionalName)}
                    </div>
                    <div>
                        <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Profissional</p>
                        <p class="font-black text-indigo-900 text-base leading-tight">${t.professionalName}</p>
                    </div>
                </div>
                <div class="md:text-right border-t md:border-t-0 md:border-l border-indigo-200/50 pt-2 md:pt-0 md:pl-4">
                    <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Período Referência</p>
                    <p class="font-bold text-indigo-700 text-sm"><i class="bi bi-calendar3 mr-1 opacity-70"></i> ${t.period}</p>
                </div>
            </div>

            <div class="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div class="overflow-x-auto custom-scrollbar">
                    <table class="w-full text-left text-xs whitespace-nowrap">
                        <thead class="bg-slate-50 text-slate-500 border-b border-slate-200">
                            <tr>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px]">Item</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px]">Cliente</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px] text-right">Base</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px] text-center">%</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px] text-right">Comissão</th>
                            </tr>
                        </thead>
                        <tbody>${n||'<tr><td colspan="5" class="text-center py-6 text-slate-400">Nenhum item detalhado encontrado neste recibo.</td></tr>'}</tbody>
                    </table>
                </div>
                <div class="bg-slate-50 p-3 border-t border-slate-200 flex justify-between items-center">
                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Bruto Apurado</span>
                    <span class="font-black text-slate-700">R$ ${(r.totalCommission||0).toFixed(2)}</span>
                </div>
            </div>
            
            ${d}

            <div class="mt-4 flex justify-between items-center bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
                <span class="text-xs font-black text-emerald-600 uppercase tracking-widest"><i class="bi bi-check-circle-fill mr-1"></i> Total Líquido Pago</span>
                <span class="text-2xl font-black text-emerald-700">R$ ${(r.finalValue||r.totalCommission).toFixed(2)}</span>
            </div>
        </div>
    `;re({title:"Detalhes do Pagamento",contentHTML:l,maxWidth:"max-w-3xl"})}function Nd(){if(P.reports.length===0){g("Aviso","Não há dados para exportar com os filtros atuais.","info");return}let e=P.reports;if(P.searchQuery){const a=P.searchQuery.toLowerCase();e=e.filter(r=>r.professionalName.toLowerCase().includes(a)||r.period.toLowerCase().includes(a))}const t=e.map(a=>{const r=a.summary.totalCommission,s=a.summary.extraDebit||0,o=a.summary.extraCredit||0,i=a.summary.finalValue||r;return{"Data da Apuração":new Date(a.createdAt).toLocaleDateString("pt-BR"),Profissional:a.professionalName,"Período Base":a.period,"Itens Calculados":a.summary.totalItems||0,"Valor Bruto (R$)":r,"Bônus (R$)":o,"Descontos (R$)":s,"Líquido Pago (R$)":i,"Observações/Motivo":a.summary.notes||""}});try{if(typeof XLSX>"u"){g("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const a=XLSX.utils.json_to_sheet(t),r=XLSX.utils.book_new();XLSX.utils.book_append_sheet(r,a,"Comissoes");const s=`Relatorio_Comissoes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(r,s)}catch(a){console.error(a),g("Erro","Falha ao exportar Excel.","error")}}function jd(e){const t=P.reports.find(c=>c.id===e);if(!t)return;if(!window.jspdf){g("Erro","A biblioteca de PDF não foi carregada.","error");return}const{jsPDF:a}=window.jspdf,r=new a;r.setFillColor(79,70,229),r.rect(0,0,210,40,"F"),r.setTextColor(255,255,255),r.setFontSize(22),r.setFont(void 0,"bold"),r.text("RECIBO DE COMISSÕES",105,20,{align:"center"}),r.setFontSize(10),r.text(`Data de Emissão: ${new Date().toLocaleDateString("pt-BR")}`,105,28,{align:"center"}),r.setTextColor(50,50,50),r.setFontSize(11),r.setFont(void 0,"normal"),r.text("Profissional:",15,55),r.setFont(void 0,"bold"),r.text(t.professionalName,40,55),r.setFont(void 0,"normal"),r.text("Período:",130,55),r.setFont(void 0,"bold"),r.text(t.period,147,55);const s=t.reportData?.items||t.items||[];let o=70;if(s.length>0){const c=s.map(u=>[u.item||"Item",u.client||"--",`R$ ${(u.value||0).toFixed(2)}`,`${u.commissionRate||0}%`,`R$ ${(u.commissionValue||0).toFixed(2)}`]);r.autoTable({startY:o,head:[["Serviço/Produto","Cliente","Valor Base","Taxa","Comissão"]],body:c,theme:"striped",headStyles:{fillColor:[241,245,249],textColor:[71,85,105],fontStyle:"bold"},styles:{fontSize:8},columnStyles:{2:{halign:"right"},3:{halign:"center"},4:{halign:"right",fontStyle:"bold",textColor:[5,150,105]}}}),o=r.lastAutoTable.finalY+15}const i=t.summary,n=i.finalValue||i.totalCommission,d=[["Comissões Brutas (Soma dos Itens)",`R$ ${i.totalCommission.toFixed(2)}`]];i.extraCredit>0&&d.push(["(+) Bônus Extras",`R$ ${i.extraCredit.toFixed(2)}`]),i.extraDebit>0&&d.push(["(-) Descontos / Vales",`R$ ${i.extraDebit.toFixed(2)}`]),r.autoTable({startY:o,head:[["Resumo do Fechamento","Valor"]],body:d,theme:"grid",headStyles:{fillColor:[79,70,229],textColor:[255,255,255]},columnStyles:{1:{halign:"right",fontStyle:"bold"}}});const l=r.lastAutoTable.finalY+15;r.setFillColor(236,253,245),r.rect(120,l-8,75,15,"F"),r.setTextColor(5,150,105),r.setFontSize(14),r.setFont(void 0,"bold"),r.text(`Total Líquido: R$ ${n.toFixed(2)}`,190,l,{align:"right"}),i.notes&&(r.setTextColor(100,100,100),r.setFontSize(9),r.setFont(void 0,"normal"),r.text(`Obs/Motivo: ${i.notes}`,15,l+10)),r.setTextColor(150,150,150),r.setFontSize(9),r.line(20,l+40,90,l+40),r.text("Assinatura da Empresa",55,l+45,{align:"center"}),r.line(120,l+40,190,l+40),r.text("Assinatura do Profissional",155,l+45,{align:"center"}),r.save(`Recibo_Comissoes_${t.professionalName.replace(/\s+/g,"_")}.pdf`)}async function Fd(){const e=P.selectedIds.size;if(!(e===0||!await W("Excluir Recibos",`Deseja excluir e estornar ${e} recibo(s)? As vendas associadas voltarão ao status "A Apurar".`)))try{const a=Array.from(P.selectedIds).map(r=>jo(r));await Promise.all(a),g("Sucesso",`${e} recibos excluídos com sucesso.`,"success"),P.selectedIds.clear(),gt(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),await Xe()}catch{g("Erro ao Excluir","Ocorreu um erro ao excluir alguns recibos.","error")}}async function Hd(e){if(await W("Excluir Recibo",'ATENÇÃO: Deseja realmente excluir este recibo? As vendas associadas a ele voltarão ao status "A Apurar" e o valor será subtraído dos relatórios. Esta ação não pode ser desfeita.'))try{await jo(e),g("Sucesso","Recibo cancelado com sucesso. Vendas estornadas para apuração.","success"),await Xe()}catch(a){g("Erro ao Excluir",a.message,"error")}}const ga=document.getElementById("content");let Le={allPackages:[],catalogForModal:{services:[],products:[]}},Mt=null,ze=null;function zd(e=6){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div class="p-4 space-y-3">
                <div class="flex justify-between items-start">
                    <div class="space-y-2 flex-1 pr-4">
                        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div class="h-5 bg-gray-200 rounded-full w-14"></div>
                </div>
                <div class="mt-3 pt-3 border-t flex justify-between items-end">
                    <div class="space-y-2">
                        <div class="h-6 bg-gray-200 rounded w-24"></div>
                        <div class="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div class="space-y-2 text-right">
                        <div class="h-4 bg-gray-200 rounded w-20"></div>
                        <div class="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 h-10 border-t"></div>
        </div>
        `;return t}function Od(){const e=document.getElementById("packagesListContainer");if(e){if(Le.allPackages.length===0){e.innerHTML=`
            <div class="text-center py-16 px-4 bg-white rounded-lg shadow-md col-span-full">
                <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2h-2.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-1.414 0l-1.414-1.414A1 1 0 009.586 17H7a2 2 0 01-2-2v-2a2 2 0 012-2h12z"></path>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum pacote criado</h3>
                <p class="mt-1 text-sm text-gray-500">Crie pacotes para oferecer descontos e fidelizar clientes.</p>
                <div class="mt-6">
                    <button type="button" data-action="new-package" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        <svg class="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                        Criar Pacote
                    </button>
                </div>
            </div>`;return}e.innerHTML=Le.allPackages.map(t=>{const a=t.status==="active",r=JSON.stringify(t).replace(/'/g,"&apos;"),s=t.price||0,o=t.originalPrice||0,i=o>s?o-s:0,n=o>0?(o-s)/o*100:0,d=h(t.name),l=h(t.description||"Sem descrição");return`
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col cursor-pointer"
                 data-action="edit-package" data-package='${r}'>
                
                <div class="p-4 flex-grow">
                    <div class="flex justify-between items-start">
                        <div class="min-w-0 pr-2">
                            <h3 class="text-base font-bold text-gray-900 truncate">${d}</h3>
                            <p class="text-xs text-gray-500 truncate">${l}</p>
                        </div>
                        <span class="text-xs font-semibold py-0.5 px-2 rounded-full flex-shrink-0 ${a?"bg-green-100 text-green-700":"bg-gray-100 text-gray-700"}">
                            ${a?"Ativo":"Inativo"}
                        </span>
                    </div>

                    <div class="mt-3 pt-3 border-t flex justify-between items-end">
                        <div>
                            <p class="text-2xl font-extrabold text-indigo-600">R$ ${s.toFixed(2)}</p>
                            ${i>0?`<p class="text-xs text-gray-500 line-through">De R$ ${o.toFixed(2)}</p>
                                 <span class="text-xs font-semibold text-red-600 bg-red-100 px-1.5 rounded">${n.toFixed(0)}% OFF</span>`:'<p class="text-xs text-gray-500 line-through">Valor integral</p>'}
                        </div>
                        
                        <div class="text-right flex flex-col items-end">
                            <p class="text-sm font-semibold text-gray-800">${(t.items||[]).length} Itens</p> 
                            <p class="text-xs text-gray-500">${t.commissionRate||0}% Comissão</p>
                            <p class="text-xs text-gray-500 mt-1">${t.validityDays||"-"} Dias Validade</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 px-4 py-2 flex justify-end items-center gap-2 border-t">
                    <button data-action="delete-package" data-id="${t.id}" data-action-stop-propagation="true" class="text-sm font-semibold text-red-600 hover:text-red-800 py-1 px-2">Excluir</button>
                </div>
            </div>
        `}).join("")}}function Ls(){const e=document.getElementById("genericModal");e.style.display="none",ze&&e.removeEventListener("click",ze)}async function Cs(e=null){const t=document.getElementById("genericModal"),a=!!e,r=e?JSON.parse(JSON.stringify(e.items||[])):[],s=h(e?.name||""),o=h(e?.description||""),i=e?.price||"",n=e?.commissionRate||0,d=e?.validityDays||30,l=`
        <div class="modal-content max-w-4xl overflow-y-auto max-h-[90vh]">
            <form id="package-form" class="flex flex-col h-full">
                <div class="p-4 sm:p-6 border-b flex justify-between items-center">
                    <h2 class="text-2xl font-bold text-gray-800">${a?"Editar Pacote":"Criar Novo Pacote"}</h2>
                    <button type="button" data-action="close-modal" class="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
                </div>
                <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                    <input type="hidden" id="packageId" value="${e?.id||""}">
                    
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">Informações Básicas</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="packageName" class="block text-sm font-medium text-gray-700">Nome do Pacote</label>
                                <input type="text" id="packageName" value="${s}" class="mt-1 w-full p-2 border rounded-md" required>
                            </div>
                            <div>
                                <label for="packageStatus" class="block text-sm font-medium text-gray-700">Status</label>
                                <select id="packageStatus" class="mt-1 w-full p-2 border rounded-md bg-white">
                                    <option value="active" ${e?.status!=="inactive"?"selected":""}>Ativo</option>
                                    <option value="inactive" ${e?.status==="inactive"?"selected":""}>Inativo</option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-4">
                            <label for="packageDescription" class="block text-sm font-medium text-gray-700">Descrição (Opcional)</label>
                            <textarea id="packageDescription" rows="2" class="mt-1 w-full p-2 border rounded-md">${o}</textarea>
                        </div>
                    </div>

                    <div class="border-t pt-6">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="text-lg font-semibold text-gray-800">Itens Incluídos</h3>
                            <button type="button" id="add-item-to-package-btn" class="py-1 px-3 bg-indigo-600 text-white font-semibold rounded-lg text-sm hover:bg-indigo-700 transition shadow-sm">+ Adicionar Item</button>
                        </div>
                        <div id="package-items-list" class="space-y-2 max-h-48 overflow-y-auto p-2 border rounded-md bg-gray-50 min-h-[5rem]"></div>
                    </div>

                    <div class="border-t pt-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">Preço e Validade</h3>
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 items-end">
                            <div class="col-span-2 sm:col-span-1">
                                <label class="block text-sm font-bold text-gray-700">Valor Original</label>
                                <p id="originalPrice" class="text-xl font-bold text-gray-800 mt-1">R$ 0.00</p>
                            </div>
                            <div>
                                <label for="finalPrice" class="block text-sm font-medium text-gray-700">Preço Final</label>
                                <input type="number" step="0.01" id="finalPrice" value="${i}" class="mt-1 w-full p-2 border rounded-md" required>
                            </div>
                            <div>
                                <label for="commissionRate" class="block text-sm font-medium text-gray-700">Comissão (%)</label>
                                <input type="number" id="commissionRate" value="${n}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: 10">
                            </div>
                            <div>
                                <label for="validityDays" class="block text-sm font-medium text-gray-700">Validade (dias)</label>
                                <input type="number" id="validityDays" value="${d}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: 30, 60, 90">
                            </div>
                        </div>
                    </div>

                </div>
                <footer class="p-4 border-t bg-gray-100 flex justify-end gap-3 flex-shrink-0">
                    <button type="button" data-action="close-modal" class="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                    <button type="button" data-action="save-package" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Salvar Pacote</button>
                </footer>
            </form>
        </div>
    `;t.innerHTML=l,t.style.display="flex";const c=t.querySelector("#package-items-list"),u=(x,b)=>{const v=b.querySelector("#originalPrice"),f=x.reduce((E,S)=>E+S.price*S.quantity,0);v&&(v.textContent=`R$ ${f.toFixed(2)}`)},m=x=>{x.length===0?c.innerHTML='<p class="text-center text-gray-500 p-4">Nenhum item adicionado.</p>':c.innerHTML=x.map((b,v)=>{const f=b.type==="service",E=f?"Serviço":"Produto",S=f?"bg-indigo-100 text-indigo-800":"bg-green-100 text-green-800";return`
                <div class="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-200">
                    <div class="flex items-center gap-3 min-w-0">
                        <input type="number" value="${b.quantity}" min="1" class="w-12 p-1 border rounded-md text-sm quantity-input flex-shrink-0" data-index="${v}">
                        <span class="text-xs font-medium px-2 py-0.5 rounded-full ${S}">${E}</span>
                        <span class="font-medium text-gray-800 truncate">${h(b.name)}</span>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="text-sm text-gray-600">R$ ${b.price.toFixed(2)}</span>
                        <button type="button" class="text-red-500 hover:text-red-700 remove-item-btn font-bold" data-index="${v}">&times;</button>
                    </div>
                </div>
            `}).join(""),u(x,t)};m(r),c.addEventListener("change",x=>{if(x.target.classList.contains("quantity-input")){const b=parseInt(x.target.dataset.index,10),v=parseInt(x.target.value,10);v>0&&r[b]&&(r[b].quantity=v,m(r))}}),c.addEventListener("click",x=>{if(x.target.classList.contains("remove-item-btn")){const b=parseInt(x.target.dataset.index,10);r.splice(b,1),m(r)}}),t.querySelector("#add-item-to-package-btn").onclick=()=>Vd(x=>{const b=r.find(v=>v.id===x.id&&v.type===x.type);b?b.quantity++:r.push({...x,quantity:1}),m(r)}),ze&&t.removeEventListener("click",ze),ze=async x=>{const b=x.target.closest("button[data-action]");if(!b)return;const v=b.dataset.action;if(x.stopPropagation(),v==="close-modal"&&Ls(),v==="save-package"){const f=b,E={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:r,originalPrice:r.reduce((S,k)=>S+k.price*k.quantity,0),price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null,establishmentId:p.establishmentId};if(!E.name||!E.price){g("Erro","Nome do Pacote e Preço Final são obrigatórios.","error");return}if(E.items.length===0){g("Erro","Adicione pelo menos um item ao pacote.","error");return}f.disabled=!0,f.textContent="A salvar...";try{a?await qi(E.id,E):(delete E.id,await Ai(E)),g("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),Ls(),await Ya()}catch(S){g("Erro",`Não foi possível salvar o pacote: ${S.message}`,"error"),f.disabled=!1,f.textContent="Salvar Pacote"}}},t.addEventListener("click",ze)}function Vd(e){let t="";const a=document.createElement("div");a.id="item-selection-modal",a.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[110]";const r={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'},s=d=>{const l=t.toLowerCase(),c=Le.catalogForModal.services.filter(b=>b.name.toLowerCase().includes(l)),u=Le.catalogForModal.products.filter(b=>b.name.toLowerCase().includes(l)),m=c.map(b=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${b.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${r.service}</div>
                <span class="flex-grow text-left min-w-0 truncate">${h(b.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${b.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum serviço encontrado.</p>',x=u.map(b=>`
            <button data-action="select-item" data-item-type="product" data-item-id="${b.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${r.product}</div>
                <span class="flex-grow text-left min-w-0 truncate">${h(b.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${b.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum produto encontrado.</p>';d.innerHTML=`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto">${m}</div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-96 overflow-y-auto">${x}</div></div>
            </div>
        `};a.innerHTML=`
        <div class="bg-white rounded-lg shadow-xl w-full max-w-lg sm:max-w-3xl flex flex-col max-h-[80vh]">
            <header class="p-4 border-b flex justify-between items-center">
                <h2 class="text-xl font-bold text-gray-800">Selecionar Item</h2>
                <button data-action="close-selection-modal" class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>
            </header>
            <div class="p-4 border-b">
                <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
            <div id="item-selection-list" class="flex-1 overflow-y-auto p-4">
            </div>
        </div>
    `,document.body.appendChild(a);const o=a.querySelector("#item-selection-list"),i=a.querySelector("#item-search-input"),n=()=>{a.remove()};s(o),i.addEventListener("input",()=>{t=i.value,s(o)}),a.addEventListener("click",d=>{const l=d.target.closest('[data-action="select-item"]'),c=d.target.closest('[data-action="close-selection-modal"]');if(l){const{itemType:u,itemId:m}=l.dataset,b=(Le.catalogForModal[u+"s"]||[]).find(v=>v.id===m);b&&(e({...b,type:u}),n())}else(c||d.target===a)&&n()})}async function Ya(){ga.innerHTML=`
        <section id="packages-page" class="p-4 sm:p-6">
             <div class="sticky top-0 z-10 bg-gray-100 sm:bg-transparent pt-3 pb-4 mb-6 -mx-4 -mt-4 sm:mx-0 sm:mt-0 sm:bg-transparent sm:pt-0 sm:pb-0 sm:static">
                <div class="flex justify-between items-center px-4 sm:px-0">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                </div>
            </div>
            
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20">
                ${zd()}
            </div>
            
            <button data-action="new-package" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>
    `,Mt&&ga.removeEventListener("click",Mt),Mt=e=>{if(e.target.closest('[data-action-stop-propagation="true"]')){e.stopPropagation();const r=e.target.closest('[data-action="delete-package"]');if(r){const s=r.dataset.id;W("Excluir Pacote","Tem a certeza que deseja excluir este pacote? Esta ação é irreversível.").then(async o=>{if(o)try{await Ri(s),g("Sucesso!","Pacote excluído.","success"),await Ya()}catch(i){g("Erro",`Não foi possível excluir: ${i.message}`,"error")}})}return}const t=e.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!t)return;const a=t.dataset.action;if(a==="new-package")Cs(null);else if(a==="edit-package"){const r=JSON.parse(t.dataset.package);Cs(r)}},ga.addEventListener("click",Mt);try{const[e,t,a]=await Promise.all([za(p.establishmentId),Be(p.establishmentId),ta(p.establishmentId)]);Le.allPackages=e,Le.catalogForModal={services:t.filter(r=>r.active),products:a},Od()}catch{document.getElementById("packagesListContainer").innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar pacotes.</p>'}}const _d=document.getElementById("content");let Ud=null;async function Wd(){const e=h(p.userName||"Usuário"),t=h(ne.currentUser?.email||"E-mail não disponível"),a=p.userName?p.userName.charAt(0):"U";_d.innerHTML=`
        <div class="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Meu Perfil
            </h2>
        </div>
        <div id="my-profile-content" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div class="md:col-span-1">
                <div class="p-4 md:p-6 bg-white rounded-lg shadow-md">
                    <div class="flex flex-col items-center justify-center py-6">
                        <img id="user-profile-avatar" 
                             src="https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(a)}" 
                             alt="Avatar do Usuário" 
                             class="w-32 h-32 rounded-full object-cover border-4 border-indigo-200">
                        <h3 class="text-2xl font-bold text-gray-800 mt-4">${e}</h3>
                        <p class="text-md text-gray-600">${t}</p>
                    </div>
                </div>
            </div>

            <div class="md:col-span-2">
                 <div id="professional-agenda-block" class="p-4 md:p-6 bg-white rounded-lg shadow-md space-y-6">
                    <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
                </div>
            </div>
        </div>
    `,await Jd()}async function Jd(){const e=document.getElementById("professional-agenda-block");e.innerHTML="";try{const t=p.userProfessionalId;if(t){const a=await si(t);Ud=a,a.photo&&(document.getElementById("user-profile-avatar").src=a.photo);const r=h(a.name);e.innerHTML=`
                <div class="bg-indigo-50 p-4 rounded-lg flex items-center gap-4 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                        <p class="font-semibold text-indigo-800">Você está associado ao profissional: ${r}</p>
                        <p class="text-sm text-indigo-700">Use esta seção para gerenciar sua própria agenda rapidamente.</p>
                    </div>
                </div>

                <div class="mt-8">
                    <h4 class="text-xl font-bold text-gray-800 mb-4">Bloquear Agenda Rapidamente</h4>
                    <p class="text-sm text-gray-600 mb-4">Selecione uma data e horário para criar um bloqueio. Isso impedirá que agendamentos sejam criados nesse intervalo.</p>
                    <form id="block-schedule-form" class="space-y-4">
                        <div>
                            <label for="blockDate" class="block text-sm font-medium text-gray-700">Data do Bloqueio</label>
                            <input type="date" id="blockDate" class="mt-1 w-full p-2 border border-gray-300 rounded-md" required>
                        </div>
                        <div class="flex gap-4">
                            <div class="flex-1">
                                <label for="blockStartTime" class="block text-sm font-medium text-gray-700">Hora Início</label>
                                <input type="time" id="blockStartTime" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="09:00" required>
                            </div>
                            <div class="flex-1">
                                <label for="blockEndTime" class="block text-sm font-medium text-gray-700">Hora Fim</label>
                                <input type="time" id="blockEndTime" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="18:00" required>
                            </div>
                        </div>
                        <div>
                            <label for="blockReason" class="block text-sm font-medium text-gray-700">Motivo (Opcional)</label>
                            <input type="text" id="blockReason" class="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="Ex: Consulta médica, folga, etc.">
                        </div>
                        <button type="submit" class="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition">Bloquear Agenda</button>
                    </form>
                </div>

                <div class="mt-8 pt-6 border-t border-gray-200">
                    <div class="flex justify-between items-center mb-4">
                        <h4 class="text-xl font-bold text-gray-800">Meus Bloqueios</h4>
                        <select id="my-blocks-filter" class="p-2 border rounded-md text-sm bg-white">
                            <option value="future">Futuros</option>
                            <option value="history">Histórico (Passados)</option>
                        </select>
                    </div>
                    <div id="my-blocks-list" class="space-y-3">
                        <p class="text-gray-500">A carregar bloqueios...</p>
                    </div>
                </div>
            `,Gd(a.id),document.getElementById("my-blocks-filter").addEventListener("change",o=>Jt(a.id,o.target.value)),Jt(a.id,"future")}else e.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(t){console.error("Erro ao carregar seção de profissional:",t),e.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${h(t.message)}</p>
            </div>
        `}}function Gd(e){const t=document.getElementById("block-schedule-form");t.addEventListener("submit",async a=>{a.preventDefault();const r=t.querySelector("#blockDate").value,s=t.querySelector("#blockStartTime").value,o=t.querySelector("#blockEndTime").value,i=t.querySelector("#blockReason").value;if(!r||!s||!o){g("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(s>=o){g("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const n=new Date(`${r}T${s}:00`),d=new Date(`${r}T${o}:00`),l=t.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="A bloquear...";try{await Kt({establishmentId:p.establishmentId,professionalId:e,reason:i||"Bloqueado (Meu Perfil)",startTime:n.toISOString(),endTime:d.toISOString()}),g("Sucesso","Agenda bloqueada com sucesso!","success"),t.reset();const c=document.getElementById("my-blocks-filter").value;Jt(e,c)}catch(c){console.error("Erro ao bloquear agenda:",c),g("Erro",`Não foi possível bloquear a agenda: ${c.message}`,"error")}finally{l.disabled=!1,l.textContent="Bloquear Agenda"}})}async function Jt(e,t="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const r=new Date;let s,o;t==="history"?(o=new Date,s=new Date,s.setFullYear(s.getFullYear()-1)):(s=new Date,o=new Date,o.setFullYear(o.getFullYear()+1));let n=(await Zt(p.establishmentId,s.toISOString(),o.toISOString(),e)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));t==="history"?n=n.filter(d=>d.endTime<r).sort((d,l)=>l.startTime-d.startTime):n=n.filter(d=>d.endTime>=r).sort((d,l)=>d.startTime-l.startTime),n.length>0?(a.innerHTML=n.map(d=>{const l=d.startTime.toLocaleDateString("pt-BR"),c=`${d.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${d.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`,u=d.endTime<new Date,m=h(d.reason||"Sem motivo");return`
                    <div class="flex items-center justify-between p-3 ${u?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${l} das ${c}</p>
                            <p class="text-sm text-gray-600">${m}</p>
                        </div>
                        <button data-block-id="${d.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(d=>{d.addEventListener("click",async l=>{const c=l.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await Na(c),g("Sucesso","Bloqueio removido.","success"),Jt(e,t)}catch(u){console.error("Erro ao remover bloqueio:",u),g("Erro",`Não foi possível remover o bloqueio: ${u.message}`,"error")}})})):a.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${t==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(r){console.error("Erro ao carregar bloqueios:",r),a.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${h(r.message)}</p>`}}let Ds=!1;async function Gt(e){if(!e)return;e.innerHTML=`
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 class="text-xl font-bold text-gray-800 m-0">Gestão da Rede</h2>
                    <p class="text-sm text-gray-500">Clique numa unidade para gerir dados, módulos e identidade visual.</p>
                </div>
                <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-sm" 
                        data-bs-toggle="modal" data-bs-target="#modal-create-establishment">
                    <i class="bi bi-plus-lg"></i> Novo Estabelecimento
                </button>
            </div>
            
            <div id="hierarchy-list-container" class="space-y-6">
                <div class="text-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <div class="inline-block animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mb-3" role="status"></div>
                    <p class="text-gray-500 font-medium">A carregar estrutura organizacional...</p>
                </div>
            </div>
        </div>
    `;const t=document.getElementById("hierarchy-list-container"),a=document.getElementById("est-parent");try{const s=(await Te()).matrizes||[];if(a&&(a.innerHTML='<option value="">Nenhuma (Criar como Matriz Independente)</option>'),s.length===0)t.innerHTML=`
                <div class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
                    <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="bi bi-building-add text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">A sua rede está vazia</h3>
                    <p class="text-gray-500 max-w-md mx-auto mb-6">Comece por criar a sua primeira Matriz ou Loja principal para expandir o seu negócio.</p>
                </div>
            `;else{let o="";s.forEach(i=>{if(a&&!i.isOrphanBranch){const d=document.createElement("option");d.value=i.id,d.textContent=i.name,a.appendChild(d)}const n=i.isMatriz||!i.parentId?'<span class="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">📍 UNIDADE</span>';o+=`
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 transition-all hover:border-indigo-400 group">
                        <div class="bg-gray-50 border-b border-gray-200 p-4 md:p-5 flex justify-between items-center cursor-pointer hover:bg-gray-100/50" 
                             onclick="window.navigateTo('estabelecimento-section', { id: '${i.id}' })">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-sm group-hover:scale-105 transition-transform">
                                    ${i.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4 class="text-lg font-bold text-gray-800 flex items-center">
                                        ${i.name} ${n}
                                    </h4>
                                    <p class="text-sm text-gray-500 mt-0.5">Clique para configurar esta unidade</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="text-xs text-gray-400 font-medium hidden md:block">Gerir Unidade</span>
                                <i class="bi bi-gear text-gray-400 text-xl group-hover:text-indigo-600 transition-colors"></i>
                            </div>
                        </div>
                        
                        <div class="p-4 md:p-5 bg-white border-l-4 border-l-indigo-500">
                            <h5 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <i class="bi bi-diagram-3"></i> Unidades Vinculadas
                            </h5>
                            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                `,i.branches&&i.branches.length>0?i.branches.forEach(d=>{o+=`
                            <div class="border border-gray-100 rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer bg-gray-50 flex justify-between items-center group/item"
                                 onclick="event.stopPropagation(); window.navigateTo('estabelecimento-section', { id: '${d.id}' })">
                                <div class="pl-2 border-l-2 border-indigo-400">
                                    <h5 class="font-bold text-gray-800 text-sm group-hover/item:text-indigo-700 transition-colors">${d.name}</h5>
                                    <p class="text-[11px] text-gray-500 mt-0.5 truncate max-w-[150px]">
                                        <i class="bi bi-geo-alt"></i> ${d.address||"Configurar morada"}
                                    </p>
                                </div>
                                <i class="bi bi-chevron-right text-gray-300 group-hover/item:text-indigo-500 transition-all"></i>
                            </div>
                        `}):o+=`
                        <div class="col-span-full py-4 text-center border border-dashed border-gray-100 rounded-lg bg-gray-50/30">
                            <p class="text-xs text-gray-400 italic">Nenhuma filial vinculada.</p>
                        </div>
                    `,o+=`
                            </div>
                        </div>
                    </div>
                `}),t.innerHTML=o}Ds||(Qd(),Ds=!0)}catch(r){console.error("Erro na renderização da rede:",r),t.innerHTML=`
            <div class="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100 text-center">
                <i class="bi bi-exclamation-triangle text-2xl mb-2 block"></i>
                <p class="font-bold text-sm">Não foi possível carregar a estrutura organizacional.</p>
            </div>
        `}}function Qd(){const e=document.getElementById("form-create-establishment");e&&e.addEventListener("submit",async t=>{t.preventDefault();const a=e.querySelector('button[type="submit"]'),r=a.innerHTML;a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...',a.disabled=!0;const s={name:document.getElementById("est-name").value.trim(),cnpj:document.getElementById("est-cnpj").value.trim(),parentId:document.getElementById("est-parent").value||null,timezone:document.getElementById("est-timezone").value};try{const o=await wr(s);alert(o.message||"Sucesso!"),e.reset();const i=document.getElementById("modal-create-establishment"),n=window.bootstrap?.Modal.getInstance(i);n&&n.hide(),await Gt(document.getElementById("content"))}catch(o){console.error("Erro ao criar estabelecimento:",o),alert("Erro: "+(o.message||"Falha ao gravar dados."))}finally{a.innerHTML=r,a.disabled=!1}})}window.loadAndRenderHierarchy=()=>Gt(document.getElementById("content"));document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("gesturestart",function(t){t.preventDefault()}),document.addEventListener("gesturechange",function(t){t.preventDefault()}),document.addEventListener("gestureend",function(t){t.preventDefault()});let e=0;document.addEventListener("touchend",function(t){const a=new Date().getTime();a-e<=300&&t.preventDefault(),e=a},!1)});const K=document.getElementById("loadingScreen"),at=document.getElementById("dashboardContent"),Oe=document.getElementById("content"),ba=document.getElementById("notificationBell"),At=document.getElementById("notificationBadge"),Re=document.getElementById("notificationPanel"),fa=document.getElementById("notificationList"),st=document.getElementById("profileMenuButton"),ae=document.getElementById("profileDropdown"),Ts=document.getElementById("profileName"),Bs=document.getElementById("profileEmail"),Ps=document.getElementById("logoutButton"),Ms=document.getElementById("myProfileLink"),As=document.getElementById("hamburger-menu-btn"),te=document.getElementById("sidebar"),ie=document.getElementById("mobile-overlay"),qs=document.getElementById("themeToggleBtn"),xa=document.getElementById("themeIcon"),Ba=document.getElementById("mobile-bottom-nav"),Ze=document.getElementById("nav-scroll"),Rs=document.getElementById("scroll-hint-left"),Ns=document.getElementById("scroll-hint-right"),Yd=document.querySelectorAll(".bottom-nav-item");function Pa(){if(!Ze||!Rs||!Ns)return;const{scrollLeft:e,scrollWidth:t,clientWidth:a}=Ze;Rs.classList.toggle("visible",e>5),Ns.classList.toggle("visible",e+a<t-5)}function Xd(){if(!Ze)return;const e=document.querySelector(".bottom-nav-item.active");if(!e)return;const t=Ze,a=t.getBoundingClientRect(),r=e.getBoundingClientRect(),o=r.left+r.width/2-a.left-a.width/2;t.scrollBy({left:o,behavior:"smooth"})}const Zd={"dashboard-section":Gr,"agenda-section":oo,"comandas-section":Ki,"relatorios-section":bn,"servicos-section":Nn,"produtos-section":Qn,"suppliers-section":Yn,"profissionais-section":_t,"clientes-section":Ll,"estabelecimento-section":e=>Bo(e),"ausencias-section":Ul,"users-section":Ut,"sales-report-section":ld,"financial-section":ud,"commissions-section":Id,"packages-section":Ya,"my-profile-section":Wd,"hierarquia-section":()=>Gt(Oe),"establishments-section":()=>Gt(Oe)},js={indigo:{main:"#4f46e5",hover:"#4338ca",light:"#eef2ff",text:"#ffffff"},blue:{main:"#2563eb",hover:"#1d4ed8",light:"#eff6ff",text:"#ffffff"},sky:{main:"#0284c7",hover:"#0369a1",light:"#e0f2fe",text:"#ffffff"},teal:{main:"#0d9488",hover:"#0f766e",light:"#ccfbf1",text:"#ffffff"},emerald:{main:"#059669",hover:"#047857",light:"#d1fae5",text:"#ffffff"},green:{main:"#16a34a",hover:"#15803d",light:"#dcfce7",text:"#ffffff"},lime:{main:"#65a30d",hover:"#4d7c0f",light:"#ecfccb",text:"#1f2937"},amber:{main:"#d97706",hover:"#b45309",light:"#fef3c7",text:"#1f2937"},orange:{main:"#ea580c",hover:"#c2410c",light:"#ffedd5",text:"#ffffff"},red:{main:"#dc2626",hover:"#b91c1c",light:"#fee2e2",text:"#ffffff"},rose:{main:"#e11d48",hover:"#be123c",light:"#ffe4e6",text:"#ffffff"},pink:{main:"#db2777",hover:"#be185d",light:"#fce7f3",text:"#ffffff"},fuchsia:{main:"#c026d3",hover:"#a21caf",light:"#fae8ff",text:"#ffffff"},purple:{main:"#7c3aed",hover:"#6d28d9",light:"#ede9fe",text:"#ffffff"},violet:{main:"#8b5cf6",hover:"#7c3aed",light:"#ddd6fe",text:"#ffffff"},gray:{main:"#64748b",hover:"#475569",light:"#f1f5f9",text:"#ffffff"},black:{main:"#111827",hover:"#000000",light:"#e5e7eb",text:"#ffffff"}};function qt(e){const t=js[e]||js.indigo,r=(o=>{const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(o);return i?`${parseInt(i[1],16)}, ${parseInt(i[2],16)}, ${parseInt(i[3],16)}`:"79, 70, 229"})(t.main);document.body.style.setProperty("--theme-main",t.main);const s=document.getElementById("dynamic-theme-styles");s&&(s.innerHTML=`
            :root {
                --theme-color-main: ${t.main};
                --theme-color-hover: ${t.hover};
                --theme-color-light: ${t.light};
                --theme-rgb: ${r};
            }
            .sidebar-link.active { background-color: var(--theme-color-main) !important; color: ${t.text} !important; }
            .sidebar-link:not(.active):hover { background-color: rgba(var(--theme-rgb), 0.1) !important; color: var(--theme-color-main) !important; }
            .bg-indigo-600 { background-color: var(--theme-color-main) !important; }
            .hover\\:bg-indigo-700:hover { background-color: var(--theme-color-hover) !important; }
            .hover\\:bg-indigo-50:hover { background-color: rgba(var(--theme-rgb), 0.1) !important; }
            .text-indigo-600 { color: var(--theme-color-main) !important; }
            .hover\\:text-indigo-800:hover { color: var(--theme-color-hover) !important; }
            .hover\\:text-indigo-600:hover { color: var(--theme-color-main) !important; }
            .border-indigo-600 { border-color: var(--theme-color-main) !important; }
            .focus\\:ring-indigo-500:focus { --tw-ring-color: rgba(var(--theme-rgb), 0.5) !important; }
            .loading-bar-fill { background-color: var(--theme-color-main) !important; }
            .time-slot-card.selected { background-color: var(--theme-color-main) !important; border-color: var(--theme-color-main) !important; }
            input:checked + .toggle-bg { background-color: var(--theme-color-main) !important; }
            .bg-indigo-100 { background-color: var(--theme-color-light) !important; }
            .text-indigo-800 { color: var(--theme-color-hover) !important; }
        `)}function Ht(e){document.documentElement.setAttribute("data-theme",e),localStorage.setItem("kairos_theme",e),xa&&(e==="dark"?xa.innerHTML="☀️":xa.innerHTML="🌙")}function Kd(){const e=localStorage.getItem("kairos_theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;Ht(e||(t?"dark":"light"))}let bt=null,ft=[];function Ho(){if(!At||!fa)return;const e=ft.filter(t=>!t.read).length;if(e>0?(At.textContent=e,At.classList.remove("hidden")):At.classList.add("hidden"),ft.length===0){fa.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}fa.innerHTML=ft.map(t=>`
    <div class="notification-item ${t.read?"":"unread"}">
    <p class="font-semibold">${t.title}</p>
    <p class="text-sm text-gray-600">${t.message}</p>
    <p class="text-xs text-gray-400 mt-1">${t.time}</p>
    </div>
    `).join("")}function Fs(e){bt&&bt();const t=Qt(be,"establishments",e,"notifications"),a=Vs(t,_s("timestamp",">=",new Date),er("timestamp","desc"));bt=tr(a,r=>{r.docChanges().forEach(s=>{if(s.type==="added"){const o=s.doc.data();ft.unshift({title:o.title,message:o.message,time:o.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),g(o.title,o.message,"info",!0),Ho();const i=document.querySelector(".sidebar-link.active");i&&i.dataset.target==="agenda-section"&&oo()}})},r=>{console.error("Erro no listener de notificações:",r)})}async function ec(e){const t=document.getElementById("multi-context-container"),a=document.getElementById("multi-context-btn"),r=document.getElementById("multi-context-label"),s=document.getElementById("multi-context-count"),o=document.getElementById("multi-context-list"),i=document.getElementById("multi-context-apply"),n=document.getElementById("multi-context-dropdown"),d=document.getElementById("multi-context-arrow");if(!(!t||!o))try{const c=(await Te()).matrizes||[];let u="",m=0;if(c.forEach(x=>{u+=`
                <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors mb-1">
                    <input type="checkbox" value="${x.id}" class="context-checkbox" data-name="${Rt(x.name)}">
                    <span class="text-[13px] sm:text-sm font-bold text-slate-700 truncate">🏢 ${Rt(x.name)}</span>
                </label>
            `,m++,x.branches&&x.branches.length>0&&x.branches.forEach(b=>{u+=`
                        <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors ml-4 mb-1 border-l-2 border-slate-100 pl-3">
                            <input type="checkbox" value="${b.id}" class="context-checkbox" data-name="${Rt(b.name)}">
                            <span class="text-[12px] sm:text-[13px] font-medium text-slate-600 truncate">📍 ${Rt(b.name)}</span>
                        </label>
                    `,m++})}),m>0){o.innerHTML=u,t.style.display="block",(!p.selectedEstablishments||p.selectedEstablishments.length===0)&&(p.selectedEstablishments=[e]);const x=Array.from(o.querySelectorAll('input[type="checkbox"]')),b=()=>{const f=x.filter(E=>E.checked);s.textContent=f.length,f.length===0?r.textContent="Nenhuma selecionada":f.length===1?r.textContent=f[0].dataset.name:r.textContent=`${f.length} Unidades`};let v=!1;x.forEach(f=>{p.selectedEstablishments.includes(f.value)&&(f.checked=!0,v=!0)}),!v&&x.length>0&&(x[0].checked=!0,p.selectedEstablishments=[x[0].value],p.establishmentId=x[0].value),b(),a.addEventListener("click",f=>{f.stopPropagation(),n.classList.toggle("hidden"),d.style.transform=n.classList.contains("hidden")?"rotate(0deg)":"rotate(180deg)"}),document.addEventListener("click",f=>{!t.contains(f.target)&&!n.classList.contains("hidden")&&(n.classList.add("hidden"),d.style.transform="rotate(0deg)",x.forEach(E=>{E.checked=p.selectedEstablishments.includes(E.value)}),b())}),x.forEach(f=>{f.addEventListener("change",b)}),i.addEventListener("click",async f=>{f.stopPropagation(),K&&(K.classList.remove("hidden","fade-out"),K.style.display="flex");const E=x.filter(k=>k.checked);if(E.length===0){K&&(K.classList.add("fade-out"),setTimeout(()=>{K.style.display="none"},500)),g("Atenção","Tem de selecionar pelo menos uma unidade.","warning");return}p.selectedEstablishments=E.map(k=>k.value);const S=p.selectedEstablishments[0];try{const k=await Ce(S);p.establishmentId=S,p.establishmentName=k.name,p.enabledModules=k.modules,p.currentViewContext={id:S,name:k.name,type:k.parentId?"BRANCH":"GROUP"},typeof qt=="function"&&qt(k.themeColor||"indigo"),Fs(S),Hs(p.userPermissions),n.classList.add("hidden"),d.style.transform="rotate(0deg)",g("Ambiente Atualizado","Exibindo informações consolidadas.","success");const T=document.querySelector(".sidebar-link.active"),L=T?T.getAttribute("data-target"):"dashboard-section";J(L)}catch(k){console.error("Erro ao aplicar contextos:",k),g("Erro","Ocorreu um problema ao trocar a visualização.","error")}finally{K&&(K.classList.add("fade-out"),setTimeout(()=>{K.style.display="none"},500))}});try{const f=await Ce(p.establishmentId);p.establishmentName=f.name,p.enabledModules=f.modules,p.currentViewContext={id:p.establishmentId,name:f.name,type:f.parentId?"BRANCH":"GROUP"},typeof qt=="function"&&qt(f.themeColor||"indigo"),Fs(p.establishmentId),Hs(p.userPermissions)}catch(f){console.error(f)}}else t.style.display="none"}catch(l){console.error("Erro ao carregar switcher de contexto:",l),t.style.display="none"}}function J(e,t={}){const a=e.replace("-section","");if(e!=="my-profile-section"){const s=["hierarquia-section","establishments-section","estabelecimento-section","dashboard-section"].includes(e),o=p.enabledModules?.[a]!==!1,i=p.userPermissions===null||p.userPermissions[e]?.view===!0;if(!s&&(!o||!i)){Oe&&(Oe.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>'),document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active")),te&&te.classList.contains("absolute")&&(te.classList.add("hidden"),ie&&ie.classList.add("hidden"));return}}const r=Zd[e];r&&Oe&&(document.querySelectorAll(".sidebar-link").forEach(s=>{s.classList.toggle("active",s.getAttribute("data-target")===e)}),Ba&&(Yd.forEach(s=>{s.classList.toggle("active",s.getAttribute("data-target")===e)}),setTimeout(Xd,50),setTimeout(Pa,100)),e==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(s=>s.classList.remove("active")),Oe.innerHTML="",window.innerWidth<768&&te&&(te.classList.add("hidden"),ie&&ie.classList.add("hidden")),r(t))}window.navigateTo=J;async function Hs(e){const t=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),r=document.getElementById("kpi-today-appointments"),s=document.getElementById("kpi-today-revenue"),o=e===null||e["agenda-section"]?.view===!0,i=e===null||e["financial-section"]?.view===!0;if(o&&t&&(t.classList.remove("hidden"),t.classList.add("inline-flex")),i&&a&&(a.classList.remove("hidden"),a.classList.add("inline-flex")),!(!o&&!i))try{const n=await _r();o&&r&&(r.textContent=n.todayAppointments.toString()),i&&s&&(s.textContent=`R$ ${n.todayRevenue.toFixed(2).replace(".",",")}`)}catch(n){console.error("Erro ao carregar KPIs do cabeçalho:",n)}}async function tc(e){try{pe.getPlatform()==="android"&&await ee.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0});let t=await ee.checkPermissions();if(t.receive==="prompt"&&(t=await ee.requestPermissions()),t.receive!=="granted")return;await ee.register(),ee.addListener("registration",async a=>{try{const r=vt(be,"users",e);await Ma(r,{fcmTokens:Ko(a.value),platform:"native_mobile"})}catch{}}),ee.addListener("pushNotificationReceived",a=>g(a.title,a.body,"info",!0)),ee.addListener("pushNotificationActionPerformed",()=>J("agenda-section"))}catch{}}function ac(){const e=document.getElementById("exitConfirmationModal"),t=document.getElementById("btn-cancel-exit"),a=document.getElementById("btn-confirm-exit"),r=()=>e&&(e.style.display="block"),s=()=>e&&(e.style.display="none"),o=()=>e&&e.style.display==="block";e&&(t.addEventListener("click",()=>{s(),pe.isNativePlatform()||history.pushState(null,document.title,location.href)}),a.addEventListener("click",()=>{s(),pe.isNativePlatform()?as.exitApp():history.back()}),pe.isNativePlatform()?as.addListener("backButton",()=>{if(o())s();else{const i=document.querySelectorAll('.modal[style*="display: block"]'),n=Array.from(i).filter(l=>l.id!=="exitConfirmationModal");if(n.length>0){n.forEach(l=>l.style.display="none");return}if(te&&!te.classList.contains("hidden")&&window.innerWidth<768){te.classList.add("hidden"),ie&&ie.classList.add("hidden");return}const d=document.querySelector(".sidebar-link.active");d&&d.getAttribute("data-target")==="dashboard-section"?r():J("dashboard-section")}}):(history.pushState(null,document.title,location.href),window.addEventListener("popstate",()=>{if(o()){s(),history.pushState(null,document.title,location.href);return}const i=document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display: flex"]'),n=Array.from(i).filter(l=>l.id!=="exitConfirmationModal");if(n.length>0){n.forEach(l=>l.style.display="none"),history.pushState(null,document.title,location.href);return}const d=document.querySelector(".sidebar-link.active");d&&d.getAttribute("data-target")==="dashboard-section"?r():(J("dashboard-section"),history.pushState(null,document.title,location.href))})))}function Rt(e){return e?e.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}async function sc(){try{await Wo(ne,Jo)}catch{}pe.isNativePlatform()&&document.body.classList.add("is-app-native"),gr(),ac(),Kd(),qs&&qs.addEventListener("click",e=>{e.preventDefault();const t=document.documentElement.getAttribute("data-theme");Ht(t==="dark"?"light":"dark")}),As&&As.addEventListener("click",e=>{e.stopPropagation(),te&&(te.classList.remove("hidden"),te.classList.add("absolute","inset-y-0","left-0","z-40","shadow-xl")),ie&&ie.classList.remove("hidden")}),Ba&&(Ba.addEventListener("click",e=>{const t=e.target.closest(".bottom-nav-item");if(!t)return;e.preventDefault();const a=t.getAttribute("data-target");J(a)}),Ze&&Ze.addEventListener("scroll",Pa),Pa()),ie&&ie.addEventListener("click",()=>{te&&(te.classList.add("hidden"),te.classList.remove("absolute","inset-y-0","left-0","z-40","shadow-xl")),ie.classList.add("hidden")}),ba&&ba.addEventListener("click",e=>{e.stopPropagation(),Re&&(Re.classList.toggle("hidden"),Re.classList.contains("hidden")||(ft.forEach(t=>t.read=!0),Ho()))}),st&&st.addEventListener("click",e=>{e.stopPropagation(),ae&&(ae.classList.toggle("active"),ae.classList.contains("active")?ae.classList.remove("hidden"):setTimeout(()=>ae.classList.add("hidden"),200))}),Ms&&Ms.addEventListener("click",e=>{e.preventDefault(),J("my-profile-section"),ae&&(ae.classList.remove("active"),ae.classList.add("hidden"))}),document.addEventListener("click",e=>{Re&&!Re.contains(e.target)&&e.target!==ba&&Re.classList.add("hidden"),ae&&!ae.contains(e.target)&&e.target!==st&&ae.classList.contains("active")&&(ae.classList.remove("active"),setTimeout(()=>ae.classList.add("hidden"),200))}),Go(ne,async e=>{if(e){if(!pe.isNativePlatform()&&(Fr(),"Notification"in window&&Notification.permission==="default")){const t=document.getElementById("toast-notification-request"),a=document.getElementById("btn-enable-toast");t&&setTimeout(()=>{t.style.display="block"},3500),a&&a.addEventListener("click",async()=>{await Hr()&&t&&(t.style.display="none")});const r=()=>{t&&(t.style.display="none")},s=document.getElementById("btn-deny-toast"),o=document.getElementById("btn-close-toast");s&&s.addEventListener("click",r),o&&o.addEventListener("click",r)}try{const a=(await e.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="admin"||a.role==="employee")&&a.establishmentId){let r=null,s=e.displayName,o=null;const i=vt(be,"users",e.uid),n=await zs(i);if(n.exists()){const l=n.data();r=a.role==="employee"?l.permissions||{}:null,s=l.name||s,o=l.professionalId||null}p.userProfessionalId=o,pe.isNativePlatform()&&tc(e.uid);const d=s||e.email;or(a.establishmentId,"Carregando...",r),st&&(st.textContent=d.charAt(0).toUpperCase()),Ts&&(Ts.textContent=d),Bs&&(Bs.textContent=e.email),Ps&&Ps.addEventListener("click",l=>{l.preventDefault(),bt&&bt(),Qo(ne).then(()=>window.location.href="/login.html")}),await ec(a.establishmentId),yr(J,r,p.enabledModules),K&&(K.classList.add("fade-out"),setTimeout(()=>{K.style.display="none"},500)),at&&(at.style.display="flex"),setTimeout(()=>{Er()},1500),J("dashboard-section")}else throw new Error("Permissão ou estabelecimento não configurado.")}catch(t){console.error("Erro na inicialização:",t),K&&(K.style.display="none"),at&&(at.innerHTML=`<div class="w-full h-full flex flex-col items-center justify-center p-4 text-center"><h2>Erro de Acesso</h2><p>${t.message}</p></div>`,at.style.display="flex")}}else window.location.href="/login.html"})}sc();export{Ws as W};
