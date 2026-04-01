const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-DVkpBk-z.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/firebase-config-C2tbVz-J.js","assets/styles-vhIfPenq.css"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as oe,d as me,m as qa}from"./firebase-config-C2tbVz-J.js";import{EmailAuthProvider as Ls,reauthenticateWithCredential as Cs,verifyBeforeUpdateEmail as Ts,updatePassword as Ds,updateProfile as Ps,setPersistence as Bs,browserLocalPersistence as Ms,onAuthStateChanged as As,signOut as qs}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as ct,getDoc as Eo,updateDoc as fa,setDoc as Rs,addDoc as Io,collection as Ft,query as Lo,where as Co,getDocs as Ns,deleteDoc as js,arrayUnion as Fs,orderBy as Hs,onSnapshot as Os}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{getToken as zs,onMessage as Vs}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const m={userName:null,userProfessionalId:null,userPermissions:null,userRole:null,groupId:null,groupName:null,accessibleCompanies:[],accessibleEstablishments:[],currentViewContext:{type:null,id:null,name:null},establishmentId:null,establishmentName:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function Us(e,t,a){m.establishmentId=e,m.establishmentName=t,m.userPermissions=a,m.currentViewContext={type:"BRANCH",id:e,name:t}}const To=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",ra=To?"http://localhost:8080":"https://kairos-app-407358446276.us-central1.run.app";console.log(`🚀 API configurada para modo: ${To?"LOCAL (Dev)":"PRODUÇÃO (Cloud)"}`);console.log("📡 URL Base:",ra);async function _s(){const e=oe.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function I(e,t={}){const a=await _s();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const o=ra.replace(/\/$/,""),s=e.startsWith("/")?e:`/${e}`,r=`${o}${s}`;console.log(`AuthenticatedFetch: ${t.method||"GET"} ${r}`);try{const i=await fetch(r,{...t,headers:{...a,...t.headers}});if(!i.ok){const l=(await i.json().catch(()=>({message:i.statusText}))).message||`Erro na API: ${i.status}`;if(l.includes("FAILED_PRECONDITION")&&l.includes("requires an index")){const d=/(https:\/\/[^\s]+)/,c=l.match(d),u=c?c[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${u}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${i.status}) em ${r}:`,l),new Error(l)}return i.json()}catch(i){throw console.error(`Falha de rede ao tentar acessar ${r}:`,i.message),i.message.includes("Failed to fetch")||i.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${ra}. Verifique se o servidor backend está rodando.`):i}}const Do=(e,t,a,o=null)=>{let s=`/api/appointments/${e}?startDate=${t}&endDate=${a}`;return o&&(s+=`&professionalId=${o}`),I(s)},Ws=({establishmentId:e,professionalId:t,serviceIds:a,date:o})=>{const s=`/api/availability?establishmentId=${e}&professionalId=${t}&serviceIds=${a.join(",")}&date=${o}`;return I(s)},Js=e=>I("/api/appointments",{method:"POST",body:JSON.stringify(e)}),Gs=(e,t)=>I(`/api/appointments/${e}`,{method:"PUT",body:JSON.stringify(t)}),Ra=e=>I(`/api/appointments/${e}`,{method:"DELETE"}),Qs=e=>I(`/api/appointments/${e}/reopen`,{method:"POST"}),Ys=(e,t)=>I(`/api/appointments/${e}/checkout`,{method:"POST",body:JSON.stringify(t)});let G;async function Xs(){if(!G)try{G=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function Zs(){if(!G){console.warn("AudioContext não inicializado. O som não será tocado.");return}G.state==="suspended"&&G.resume();const e=G.createOscillator(),t=G.createGain();e.connect(t),t.connect(G.destination),e.type="sine",e.frequency.setValueAtTime(800,G.currentTime),t.gain.setValueAtTime(0,G.currentTime),t.gain.linearRampToValueAtTime(.3,G.currentTime+.01),t.gain.exponentialRampToValueAtTime(1e-4,G.currentTime+.2),e.start(G.currentTime),e.stop(G.currentTime+.2)}function g(e,t,a="info",o=!1){const s=document.getElementById("toast-container");if(!s)return;o&&Zs();const r=document.createElement("div"),i={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},n={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},l={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};r.className=`toast ${i[a]||i.info}`,r.innerHTML=`
        <div class="toast-icon">${n[a]||n.info}</div>
        <div class="toast-content">
            <p class="font-bold">${e}</p>
            <p class="text-sm">${t}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${l[a]||l.info}"></div>
        </div>
    `,s.appendChild(r),r.querySelector(".toast-close").addEventListener("click",()=>r.remove()),setTimeout(()=>{r.remove()},4e3)}function V(e,t){const a=document.getElementById("genericModal");return new Promise(o=>{a.innerHTML=`
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
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",o(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",o(!1)}})}function se({title:e,contentHTML:t,maxWidth:a="max-w-4xl",showCloseButton:o=!0}){let s=document.getElementById("genericModal");const r=s.cloneNode(!1);s.parentNode.replaceChild(r,s),s=r;const i=()=>{s.style.display="none"},n=c=>{s.querySelector("#genericModalContentBody").innerHTML=c};s.innerHTML=`
        <div class="modal-content ${a} p-0 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
            
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${e}</h2>
                ${o?'<button data-close-modal class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>':""}
            </header>

            <div id="genericModalContentBody" class="flex-1 overflow-y-auto p-5">
                ${t}
            </div>
            
            <footer id="genericModalFooter" class="hidden"></footer>
        </div>
    `;const l=s.querySelector("[data-close-modal]");l&&(l.onclick=i);const d=s.querySelector('[data-action="close-modal"]');return d&&(d.onclick=i),s.addEventListener("click",c=>{c.target.closest(".modal-content")||i()}),s.style.display="flex",{modalElement:s,close:i,setContent:n}}function Ks(){document.body.addEventListener("click",()=>{G||Xs()},{once:!0}),document.addEventListener("click",e=>{const t=e.target.closest('[data-action="close-modal"]');if(t){const o=t.dataset.target;if(o){const s=document.getElementById(o);s&&(s.style.display="none")}}if(e.target.closest("[data-close-modal]")){const o=document.getElementById("genericModal");o&&(o.style.display="none")}})}const W=document.getElementById("sidebar"),Na=document.getElementById("sidebarToggle"),Ye=document.getElementById("mainContent"),er=document.querySelectorAll(".sidebar-link"),ia=document.getElementById("menu-search"),ja=document.getElementById("hamburger-menu-btn"),je=document.getElementById("mobile-overlay");function Xe(e){if(!W||!Ye)return;W.classList.toggle("collapsed",e),Ye.classList.toggle("sidebar-collapsed-shift",e);const t=W.querySelector(".sidebar-search-container"),a=W.querySelectorAll(".sidebar-category");e?(t&&(t.style.display="none"),a.forEach(o=>o.style.display="none"),document.querySelectorAll(".submenu-toggle").forEach(o=>{const s=o.getAttribute("data-target-submenu"),r=document.getElementById(s),i=o.querySelector(".submenu-arrow");r&&(r.classList.add("hidden"),r.classList.remove("flex")),i&&i.classList.remove("rotate-180")})):(t&&(t.style.display="block"),a.forEach(o=>o.style.display="block"))}function tr(){!W||!je||(W.classList.add("mobile-open"),je.classList.add("visible"))}function pt(){!W||!je||(W.classList.remove("mobile-open"),je.classList.remove("visible"))}function ar(){Xe(!W.classList.contains("collapsed"))}function or(e,t){const a=document.getElementById(e);if(!a)return;const o=a.classList.contains("hidden");o&&window.innerWidth>=1024&&W.classList.contains("collapsed")&&Xe(!1),o?(a.classList.remove("hidden"),a.classList.add("flex"),t&&t.classList.add("rotate-180")):(a.classList.add("hidden"),a.classList.remove("flex"),t&&t.classList.remove("rotate-180"))}function sr(){ia&&ia.addEventListener("input",e=>{const t=e.target.value.toLowerCase().trim(),a=document.getElementById("sidebar-nav");if(!a)return;const o=a.querySelectorAll("li"),s=a.querySelectorAll(".sidebar-category");if(t===""){o.forEach(r=>r.style.display=""),s.forEach(r=>r.style.display="block");return}s.forEach(r=>r.style.display="none"),o.forEach(r=>{if(r.classList.contains("sidebar-category"))return;const i=r.querySelector(".sidebar-link")||r.querySelector(".submenu-toggle");if(!i)return;if(i.textContent.toLowerCase().includes(t)){r.style.display="";const d=r.closest('ul[id$="-submenu"]');if(d){d.classList.remove("hidden"),d.classList.add("flex"),d.parentElement.style.display="";const c=d.parentElement.querySelector(".submenu-toggle");if(c){const u=c.querySelector(".submenu-arrow");u&&u.classList.add("rotate-180")}}}else{const d=i.getAttribute("data-target-submenu");if(d){const c=document.getElementById(d);c&&(Array.from(c.querySelectorAll(".sidebar-link")).some(v=>v.textContent.toLowerCase().includes(t))?r.style.display="":r.style.display="none")}else r.style.display="none"}})})}function rr(e,t,a){if(!W||!Ye)return;Ye.classList.add("main-content-shift"),window.innerWidth>=768?Xe(W.classList.contains("collapsed")):(Ye.classList.remove("main-content-shift","sidebar-collapsed-shift"),pt()),Na&&Na.addEventListener("click",s=>{s.stopPropagation(),ar()}),W.addEventListener("mouseenter",()=>{window.innerWidth>=1024&&W.classList.contains("collapsed")&&Xe(!1)}),W.addEventListener("mouseleave",()=>{if(window.innerWidth>=1024){const s=!!document.querySelector("#sidebarToggle:hover"),r=document.activeElement===ia;!s&&!r&&Xe(!0)}}),ja&&ja.addEventListener("click",s=>{s.stopPropagation(),tr()}),je&&je.addEventListener("click",s=>{s.stopPropagation(),pt()});let o=0;W.addEventListener("touchstart",s=>{o=s.changedTouches[0].screenX},{passive:!0}),W.addEventListener("touchend",s=>{const r=s.changedTouches[0].screenX;o-r>50&&pt()},{passive:!0}),document.querySelectorAll(".submenu-toggle").forEach(s=>{s.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation();const i=s.getAttribute("data-target-submenu"),n=s.querySelector(".submenu-arrow");or(i,n)})}),sr(),er.forEach(s=>{const r=s.getAttribute("data-target");if(!r)return;const i=r.replace("-section",""),n=a?.[i]!==!1,l=t===null||t[r]?.view===!0;if(!n||!l){s.parentElement&&s.parentElement.tagName==="LI"?s.parentElement.style.display="none":s.style.display="none";return}s.addEventListener("click",d=>{d.preventDefault(),document.querySelectorAll(".sidebar-link").forEach(c=>c.classList.remove("active")),s.classList.add("active"),r&&typeof e=="function"&&e(r),window.innerWidth<768&&pt()})})}const ir=e=>I("/api/establishments/",{method:"POST",body:JSON.stringify(e)}),Oe=()=>I("/api/establishments/hierarchy",{method:"GET"}),be=e=>{const t=e||m.establishmentId;return t?I(`/api/establishments/${t}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},xa=(e,t)=>{const a=e||m.establishmentId;return a?I(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(t)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},nr=(e,t)=>{const a=e||m.establishmentId;return a?I(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},lr=(e,t)=>{const a=e||m.establishmentId;return a?I(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))};class dr{constructor(t,a,o){this.steps=t,this.currentStep=0,this.onComplete=a,this.onSkip=o,this.isActive=!1,this.overlay=null,this.spotlight=null,this.popover=null,this.handleResize=this.handleResize.bind(this)}start(){this.isActive||(this.isActive=!0,this.createElements(),window.addEventListener("resize",this.handleResize),this.renderStep())}stop(t=!1){this.isActive=!1,window.removeEventListener("resize",this.handleResize),this.overlay&&this.overlay.remove(),this.spotlight&&this.spotlight.remove(),this.popover&&this.popover.remove(),t&&this.onComplete?this.onComplete():!t&&this.onSkip&&this.onSkip()}createElements(){this.overlay=document.createElement("div"),this.overlay.className="fixed inset-0 bg-black/60 z-[99990] transition-opacity duration-300",document.body.appendChild(this.overlay),this.spotlight=document.createElement("div"),this.spotlight.className="absolute rounded-xl z-[99991] transition-all duration-500 ease-in-out pointer-events-none bg-transparent",this.spotlight.style.boxShadow="0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255,255,255,0.5) inset",document.body.appendChild(this.spotlight),this.popover=document.createElement("div"),this.popover.className="absolute z-[99992] bg-white rounded-2xl shadow-2xl w-[320px] transition-all duration-500 ease-in-out opacity-0 transform scale-95 border border-gray-100 flex flex-col",document.body.appendChild(this.popover)}async renderStep(){if(this.currentStep>=this.steps.length){this.stop(!0);return}const t=this.steps[this.currentStep];this.popover.style.opacity="0",this.popover.style.transform="scale(0.95)",t.onBefore&&(await t.onBefore(),await this.sleep(600));const a=await this.waitForElement(t.targetSelector,3e3);if(a){a.scrollIntoView({behavior:"smooth",block:"center"}),await this.sleep(300);const s=a.getBoundingClientRect(),r=8;this.spotlight.style.top=`${s.top+window.scrollY-r}px`,this.spotlight.style.left=`${s.left+window.scrollX-r}px`,this.spotlight.style.width=`${s.width+r*2}px`,this.spotlight.style.height=`${s.height+r*2}px`,this.spotlight.style.display="block",this.overlay.style.display="none",this.positionPopover(s)}else this.spotlight.style.display="none",this.overlay.style.display="block",this.popover.style.top="50%",this.popover.style.left="50%",this.popover.style.transform="translate(-50%, -50%) scale(1)";const o=this.currentStep===this.steps.length-1;this.popover.innerHTML=`
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
                            ${o?'Concluir <i class="bi bi-check2"></i>':'Próximo <i class="bi bi-chevron-right"></i>'}
                        </button>
                    </div>
                </div>
                <div class="absolute -top-3 -right-3 bg-indigo-100 text-indigo-800 text-[10px] font-black px-2 py-1 rounded-full border-2 border-white shadow-sm">
                    ${this.currentStep+1} / ${this.steps.length}
                </div>
            </div>
        `,setTimeout(()=>{a&&(this.popover.style.transform="scale(1)"),this.popover.style.opacity="1"},50),document.getElementById("tour-next-btn").onclick=()=>{this.currentStep++,this.renderStep()},document.getElementById("tour-prev-btn")&&(document.getElementById("tour-prev-btn").onclick=()=>{this.currentStep--,this.renderStep()}),document.getElementById("tour-skip-btn").onclick=()=>this.stop(!1)}positionPopover(t){const a=this.popover.getBoundingClientRect(),o=20;let s=t.bottom+window.scrollY+o,r=t.left+window.scrollX;s+a.height>window.scrollY+window.innerHeight&&(s=t.top+window.scrollY-a.height-o),r+a.width>window.innerWidth&&(r=t.right+window.scrollX-a.width),r<o&&(r=o),this.popover.style.top=`${s}px`,this.popover.style.left=`${r}px`}handleResize(){this.isActive&&this.renderStep()}sleep(t){return new Promise(a=>setTimeout(a,t))}async waitForElement(t,a){if(!t)return null;const o=Date.now();for(;Date.now()-o<a;){const s=document.querySelector(t);if(s)return s;await this.sleep(100)}return null}}async function cr(){try{console.log("A verificar Onboarding interativo...");const e=await be(m.establishmentId);if(!e||e.parentId||e.onboardingCompleted)return;const t=[{title:"Bem-vindo ao Kairos!",icon:"👋",content:"Preparei um tour rápido para lhe mostrar onde deve configurar as 3 coisas mais importantes antes de receber agendamentos. Vamos a isso?",targetSelector:null},{title:"Perfil e Dados da Loja",icon:"🏢",content:"É aqui em 'Minha Empresa' que você define o nome do Salão, telefone, endereço e faz o upload da sua Logomarca.",targetSelector:'[data-target="estabelecimento-section"]',onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Cores e Personalização",icon:"🎨",content:"Nesta área você pode mudar a cor principal do sistema para ficar com a cara da sua marca. O link do seu cliente vai usar esta cor!",targetSelector:"#themeColor",onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Criação de Serviços",icon:"✂️",content:"Na aba 'Serviços' é onde a mágica acontece. Crie os serviços que os seus clientes vão poder agendar, informando o preço e a duração de cada um.",targetSelector:'[data-target="servicos-section"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Novo Serviço",icon:"➕",content:"Sempre que precisar adicionar um novo serviço ao menu, basta clicar neste botão verde.",targetSelector:'[data-action="new-service"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Gestão da Equipe",icon:"👥",content:"E para terminar: a 'Equipa'. Aqui você cadastra os profissionais, define quem faz qual serviço e ajusta a jornada de trabalho semanal de cada um.",targetSelector:'[data-target="profissionais-section"]',onBefore:async()=>{window.navigateTo("profissionais-section")}},{title:"Tudo Pronto!",icon:"🚀",content:"Você já conhece o caminho! Preencha as informações do seu negócio com calma. Quando terminar, volte à Agenda e partilhe o seu Link de Agendamento com os clientes!",targetSelector:null,onBefore:async()=>{window.navigateTo("agenda-section")}}],a=async()=>{try{await xa(m.establishmentId,{onboardingCompleted:!0}),showNotification("Tour Concluído","Você já pode configurar o seu sistema livremente!","success")}catch(s){console.error("Erro ao gravar fim do onboarding",s)}};new dr(t,a,a).start()}catch(e){console.error("Erro fatal ao iniciar onboarding:",e)}}var Fe;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(Fe||(Fe={}));class Xt extends Error{constructor(t,a,o){super(t),this.message=t,this.code=a,this.data=o}}const ur=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},mr=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},o=a.Plugins=a.Plugins||{},s=()=>t!==null?t.name:ur(e),r=()=>s()!=="web",i=u=>{const p=d.get(u);return!!(p?.platforms.has(s())||n(u))},n=u=>{var p;return(p=a.PluginHeaders)===null||p===void 0?void 0:p.find(v=>v.name===u)},l=u=>e.console.error(u),d=new Map,c=(u,p={})=>{const v=d.get(u);if(v)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),v.proxy;const f=s(),x=n(u);let h;const E=async()=>(!h&&f in p?h=typeof p[f]=="function"?h=await p[f]():h=p[f]:t!==null&&!h&&"web"in p&&(h=typeof p.web=="function"?h=await p.web():h=p.web),h),S=(T,M)=>{var q,H;if(x){const O=x?.methods.find(R=>M===R.name);if(O)return O.rtype==="promise"?R=>a.nativePromise(u,M.toString(),R):(R,U)=>a.nativeCallback(u,M.toString(),R,U);if(T)return(q=T[M])===null||q===void 0?void 0:q.bind(T)}else{if(T)return(H=T[M])===null||H===void 0?void 0:H.bind(T);throw new Xt(`"${u}" plugin is not implemented on ${f}`,Fe.Unimplemented)}},k=T=>{let M;const q=(...H)=>{const O=E().then(R=>{const U=S(R,T);if(U){const $e=U(...H);return M=$e?.remove,$e}else throw new Xt(`"${u}.${T}()" is not implemented on ${f}`,Fe.Unimplemented)});return T==="addListener"&&(O.remove=async()=>M()),O};return q.toString=()=>`${T.toString()}() { [capacitor code] }`,Object.defineProperty(q,"name",{value:T,writable:!1,configurable:!1}),q},D=k("addListener"),L=k("removeListener"),A=(T,M)=>{const q=D({eventName:T},M),H=async()=>{const R=await q;L({eventName:T,callbackId:R},M)},O=new Promise(R=>q.then(()=>R({remove:H})));return O.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await H()},O},j=new Proxy({},{get(T,M){switch(M){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return x?A:D;case"removeListener":return L;default:return k(M)}}});return o[u]=j,d.set(u,{name:u,proxy:j,platforms:new Set([...Object.keys(p),...x?[f]:[]])}),j};return a.convertFileSrc||(a.convertFileSrc=u=>u),a.getPlatform=s,a.handleError=l,a.isNativePlatform=r,a.isPluginAvailable=i,a.registerPlugin=c,a.Exception=Xt,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},pr=e=>e.Capacitor=mr(e),le=pr(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Ht=le.registerPlugin;class Po{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let o=!1;this.listeners[t]||(this.listeners[t]=[],o=!0),this.listeners[t].push(a);const r=this.windowListeners[t];r&&!r.registered&&this.addWindowListener(r),o&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,o){const s=this.listeners[t];if(!s){if(o){let r=this.retainedEventArguments[t];r||(r=[]),r.push(a),this.retainedEventArguments[t]=r}return}s.forEach(r=>r(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:o=>{this.notifyListeners(a,o)}}}unimplemented(t="not implemented"){return new le.Exception(t,Fe.Unimplemented)}unavailable(t="not available"){return new le.Exception(t,Fe.Unavailable)}async removeListener(t,a){const o=this.listeners[t];if(!o)return;const s=o.indexOf(a);this.listeners[t].splice(s,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(o=>{this.notifyListeners(t,o)}))}}const Fa=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ha=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class gr extends Po{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(o=>{if(o.length<=0)return;let[s,r]=o.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=Ha(s).trim(),r=Ha(r).trim(),a[s]=r}),a}async setCookie(t){try{const a=Fa(t.key),o=Fa(t.value),s=`; expires=${(t.expires||"").replace("expires=","")}`,r=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${o||""}${s}; path=${r}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}Ht("CapacitorCookies",{web:()=>new gr});const br=async e=>new Promise((t,a)=>{const o=new FileReader;o.onload=()=>{const s=o.result;t(s.indexOf(",")>=0?s.split(",")[1]:s)},o.onerror=s=>a(s),o.readAsDataURL(e)}),fr=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(s=>s.toLocaleLowerCase()).reduce((s,r,i)=>(s[r]=e[t[i]],s),{})},xr=(e,t=!0)=>e?Object.entries(e).reduce((o,s)=>{const[r,i]=s;let n,l;return Array.isArray(i)?(l="",i.forEach(d=>{n=t?encodeURIComponent(d):d,l+=`${r}=${n}&`}),l.slice(0,-1)):(n=t?encodeURIComponent(i):i,l=`${r}=${n}`),`${o}&${l}`},"").substr(1):null,vr=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),s=fr(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(s.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[i,n]of Object.entries(e.data||{}))r.set(i,n);a.body=r.toString()}else if(s.includes("multipart/form-data")||e.data instanceof FormData){const r=new FormData;if(e.data instanceof FormData)e.data.forEach((n,l)=>{r.append(l,n)});else for(const n of Object.keys(e.data))r.append(n,e.data[n]);a.body=r;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(s.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class hr extends Po{async request(t){const a=vr(t,t.webFetchExtra),o=xr(t.params,t.shouldEncodeUrlParams),s=o?`${t.url}?${o}`:t.url,r=await fetch(s,a),i=r.headers.get("content-type")||"";let{responseType:n="text"}=r.ok?t:{};i.includes("application/json")&&(n="json");let l,d;switch(n){case"arraybuffer":case"blob":d=await r.blob(),l=await br(d);break;case"json":l=await r.json();break;case"document":case"text":default:l=await r.text()}const c={};return r.headers.forEach((u,p)=>{c[p]=u}),{data:l,headers:c,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}Ht("CapacitorHttp",{web:()=>new hr});const Q=Ht("PushNotifications",{}),yr="modulepreload",wr=function(e){return"/"+e},Oa={},kr=function(t,a,o){let s=Promise.resolve();if(a&&a.length>0){let l=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),n=i?.nonce||i?.getAttribute("nonce");s=l(a.map(d=>{if(d=wr(d),d in Oa)return;Oa[d]=!0;const c=d.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":yr,c||(p.as="script"),p.crossOrigin="",p.href=d,n&&p.setAttribute("nonce",n),document.head.appendChild(p),c)return new Promise((v,f)=>{p.addEventListener("load",v),p.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(i){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=i,window.dispatchEvent(n),!n.defaultPrevented)throw i}return s.then(i=>{for(const n of i||[])n.status==="rejected"&&r(n.reason);return t().catch(r)})},za=Ht("App",{web:()=>kr(()=>import("./web-DVkpBk-z.js"),__vite__mapDeps([0,1,2,3])).then(e=>new e.AppWeb)}),Sr="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let Va=!1;async function $r(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await Q.removeAllListeners(),await Q.addListener("registration",async a=>{Mo(a.value,!0)}),await Q.addListener("pushNotificationReceived",a=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",a)}),await Q.addListener("pushNotificationActionPerformed",a=>{const o=a.notification.data;console.log("Notificação clicada (Ação):",o)});let t=await Q.checkPermissions();t.receive==="prompt"&&(t=await Q.requestPermissions()),t.receive==="granted"&&await Q.register()}catch(t){console.error("[Push Nativo] Erro:",t)}return}"Notification"in window&&Notification.permission==="granted"&&Bo()}async function Er(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await Bo(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(e){return console.error("Erro ao pedir permissão Web:",e),!1}}async function Bo(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await e.update();const t=await zs(qa,{vapidKey:Sr,serviceWorkerRegistration:e});t?(console.log("[Push Web] Token validado."),await Mo(t,!1)):console.warn("[Push Web] Token veio vazio."),Va||(Vs(qa,a=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",a)}),Va=!0)}catch(e){console.error("[Push Web] Falha no registo:",e)}else console.warn("Navegador sem suporte a Service Worker.")}async function Mo(e,t){const a=oe.currentUser;if(!a){console.warn("Usuário não logado. Token não salvo.");return}const o=ct(me,"users",a.uid);try{const s=await Eo(o);if(s.exists()){const i=s.data().fcmTokens||[];if(i.length===1&&i[0]===e){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await fa(o,{fcmTokens:[e],lastLoginAt:new Date().toISOString(),platform:t?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(s){if(s.code==="not-found")try{await Rs(o,{email:a.email,fcmTokens:[e],platform:t?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(r){console.error("Erro ao criar user:",r)}else console.error("Erro ao atualizar token:",s)}}const Ir=(e,t,a="all",o="all")=>{const s=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&s.append("professionalId",a),o&&o!=="all"&&s.append("costCenterId",o),I(`/api/reports/indicators?${s.toString()}`)},Lr=e=>e?I(`/api/financial/cost-centers/${e}`):Promise.resolve([]),Cr=({establishmentId:e,startDate:t,endDate:a,cashierSessionId:o})=>{const s=new URLSearchParams({startDate:t,endDate:a});return o&&o!=="all"&&s.append("cashierSessionId",o),e&&s.append("establishmentId",e),I(`/api/reports/sales?${s.toString()}`)},Tr=()=>I("/api/reports/summary",{method:"GET"}),Se=e=>I(`/api/services/${e}`),Dr=e=>I("/api/services",{method:"POST",body:JSON.stringify(e)}),Pr=(e,t)=>I(`/api/services/${e}`,{method:"PUT",body:JSON.stringify(t)}),Br=e=>I(`/api/services/${e}`,{method:"DELETE"}),Mr=(e,t)=>I(`/api/services/${e}/status`,{method:"PATCH",body:JSON.stringify({active:t})}),Ar=e=>I(`/api/services/stats/most-popular/${e}`),re=e=>I(`/api/professionals/${e}`),qr=e=>I(`/api/professionals/details/${e}`),Rr=e=>I("/api/professionals",{method:"POST",body:JSON.stringify(e)}),Nr=(e,t)=>I(`/api/professionals/${e}`,{method:"PUT",body:JSON.stringify(t)}),Ao=e=>I(`/api/professionals/${e}`,{method:"DELETE"}),jr=e=>{const t=e.map(a=>Ao(a));return Promise.all(t)},Ot=(e,t,a,o="all")=>{const s=`/api/blockages/${e}?startDate=${t}&endDate=${a}&professionalId=${o}`;return I(s)},zt=e=>I("/api/blockages",{method:"POST",body:JSON.stringify(e)}),va=e=>I(`/api/blockages/${e}`,{method:"DELETE"}),qo=e=>I("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:e})}),ha=e=>e?String(e).replace(/\D/g,""):"",ya=(e,t="",a=20,o={})=>{const s=new URLSearchParams;return t&&s.append("search",t),a&&s.append("limit",a),o&&o.hasLoyalty&&s.append("hasLoyalty","true"),o&&o.birthMonth&&s.append("birthMonth",o.birthMonth),o&&o.inactiveDays&&s.append("inactiveDays",o.inactiveDays),I(`/api/clients/${e}?${s.toString()}`)},Ro=(e,t)=>{const a=encodeURIComponent(t);return I(`/api/clients/details/${e}/${a}`)},No=e=>{const t=e.phone||e.id;if(!t)throw new Error("Telefone é obrigatório");const a=ha(t),o={...e,phone:a,id:a};return I(`/api/clients/${a}`,{method:"PUT",body:JSON.stringify(o)})},jo=No,Fo=(e,t)=>No({...t,id:e}),Fr=e=>{const t=encodeURIComponent(e);return I(`/api/clients/${t}`,{method:"DELETE"})},Hr=(e,t,a,o)=>I("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:e,clientPhone:ha(t),points:a,rewardName:o})}),Or=(e,t)=>Ro(e,ha(t));function b(e){return e==null?"":String(e).replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t])}function Ho(e,t=800,a=800,o=.7){return new Promise((s,r)=>{if(!e.type.match(/image.*/))return r(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.readAsDataURL(e),i.onload=n=>{const l=new Image;l.src=n.target.result,l.onload=()=>{let d=l.width,c=l.height;d>c?d>t&&(c*=t/d,d=t):c>a&&(d*=a/c,c=a);const u=document.createElement("canvas");u.width=d,u.height=c,u.getContext("2d").drawImage(l,0,0,d,c);const v=u.toDataURL("image/jpeg",o);s(v)},l.onerror=d=>r(new Error("Erro ao carregar a imagem para processamento."))},i.onerror=n=>r(new Error("Erro ao ler o ficheiro."))})}const Ua=document.getElementById("content");let _a=!1;const na=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5",light:"#c7d2fe"},{bg:"#d1fae5",border:"#059669",main:"#059669",light:"#a7f3d0"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48",light:"#fecdd3"},{bg:"#fef3c7",border:"#d97706",main:"#d97706",light:"#fde68a"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490",light:"#a5f3fc"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7",light:"#bae6fd"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed",light:"#ddd6fe"},{bg:"#fce7f3",border:"#db2777",main:"#db2777",light:"#fbcfe8"}];let Vt=[],wa=[],Lt={},Oo=[],C={currentView:window.innerWidth<768?"list":"week",weekViewDays:window.innerWidth<768?3:7,currentDate:new Date,selectedProfessionalId:"all",profSearchTerm:"",showInactiveProfs:!1,scrollToAppointmentId:null,isSelectionMode:!1,selectedItems:new Set},B={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function zo(){return C.weekViewDays||7}function Vo(e){const t=new Date(e);if(t.setHours(0,0,0,0),C.currentView==="week"&&C.weekViewDays===7){const a=t.getDay(),o=t.getDate()-a+(a===0?-6:1);return new Date(t.setDate(o))}return t}function ka(){const e=document.getElementById("profSelectorContainer");if(!e||!m.professionals)return;let t=m.professionals.filter(s=>C.showInactiveProfs||s.status!=="inactive");const o=[...[{id:"all",name:"Todos",photo:null,status:"active"}],...t];e.innerHTML=o.map(s=>{const r=C.selectedProfessionalId===s.id,i=s.name==="Todos"?"Todos":s.name.split(" ")[0],n=s.name==="Todos"?"T":s.name.charAt(0).toUpperCase(),l=s.status!=="inactive",d=na[0],c=s.id!=="all"?m.professionalColors.get(s.id)||d:{main:"#6b7280",light:"#f3f4f6"},u=r?`ring-2 ring-offset-2 ring-[${c.main}]`:"ring-1 ring-gray-200 hover:ring-gray-300",p=l?"":"opacity-50 grayscale",v=s.photo?`background-image: url('${s.photo}'); background-size: cover; background-position: center;`:`background-color: ${c.light}; color: ${c.main};`;return`
            <div class="flex flex-col items-center gap-1 cursor-pointer group flex-shrink-0 ${p}" data-action="select-professional" data-prof-id="${s.id}">
                <div class="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-sm ${u}" style="${v}">
                    ${s.photo?"":n}
                </div>
                <span class="text-xs font-medium ${r?"text-gray-900 font-bold":"text-gray-500"} truncate w-14 text-center">${b(i)}</span>
            </div>
        `}).join("")}function zr(e,t,a,o,s){const r=(e||"").replace(/\D/g,""),i=new Date(s).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),n=new Date(s).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=`Olá, ${t}! Você tem um agendamento de ${a} com o(a) profissional ${o} para o dia ${i} às ${n}. Podemos confirmar? Agradecemos a preferência!`;return`https://wa.me/${r}?text=${encodeURIComponent(l)}`}function Vr(e){const t=document.getElementById("agenda-view");if(!t)return;if(e.sort((o,s)=>new Date(o.startTime)-new Date(s.startTime)),e.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-xl mx-4 mt-4 w-full max-w-4xl">
                <div class="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-3 border border-gray-100">
                    <i class="bi bi-calendar-x text-xl text-gray-400"></i>
                </div>
                <h3 class="text-base font-semibold text-gray-800 mb-1">Agenda Livre</h3>
                <p class="text-sm text-gray-500">Nenhum evento programado para este dia.</p>
            </div>
        `;return}const a=e.map(o=>{const s=new Date(o.startTime),r=new Date(o.endTime),i=s.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),n=r.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=m.professionalColors.get(o.professionalId)||{border:"#cbd5e1"},d=C.selectedItems.has(o.id),c=C.isSelectionMode?`
            <div class="flex items-center justify-center pr-4 border-r border-gray-100 mr-4">
                 <input type="checkbox" class="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer" data-action="toggle-select-item" data-id="${o.id}" ${d?"checked":""}>
            </div>`:"";if(o.type==="blockage")return`
                <div class="bg-red-50/30 hover:bg-red-50 transition-colors border border-red-100 rounded-lg p-4 flex items-center shadow-sm relative overflow-hidden group">
                    <div class="absolute left-0 top-0 bottom-0 w-1" style="background-color: ${l.border};"></div>
                    ${c}
                    <div class="w-20 text-left border-r border-red-100 pr-4 mr-4">
                        <p class="font-bold text-lg text-red-900">${i}</p>
                        <p class="text-xs text-red-400 mt-0.5">${n}</p>
                    </div>
                    <div class="flex-1 min-w-0 text-left">
                        <p class="font-semibold text-red-800 truncate text-base">${b(o.reason)}</p>
                        <p class="text-sm text-red-500 truncate flex items-center gap-1 mt-0.5"><i class="bi bi-person-slash"></i> ${b(o.professionalName)}</p>
                    </div>
                    <span class="bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-1 rounded hidden md:block">Bloqueio</span>
                </div>`;const u=o.status==="completed",p=o.redeemedReward?.points>0,v=o.hasRewards&&!p,f=JSON.stringify(o).replace(/'/g,"&apos;"),x=zr(o.clientPhone,o.clientName,o.serviceName,o.professionalName,o.startTime),h=C.isSelectionMode?"":'data-action="open-comanda"';return`
            <div class="bg-white hover:bg-gray-50 transition-colors border ${u?"border-emerald-100":"border-gray-200"} rounded-lg p-4 flex items-center shadow-sm relative overflow-hidden group cursor-pointer" data-appointment='${f}'>
                <div class="absolute left-0 top-0 bottom-0 w-1" style="background-color: ${l.border};"></div>
                ${c}
                
                <div class="w-20 text-left border-r border-gray-100 pr-4 mr-4" ${h}>
                    <p class="font-bold text-lg text-gray-900 ${u?"opacity-50 line-through":""}">${i}</p>
                    <p class="text-xs text-gray-400 mt-0.5">${n}</p>
                </div>
                
                <div class="flex-1 min-w-0 text-left" ${h}>
                    <div class="flex items-center gap-2 mb-1">
                        <p class="font-semibold text-gray-800 truncate text-base ${u?"opacity-50":""}">${v?"🎁 ":""}${b(o.clientName)}</p>
                        ${p?'<span class="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded">Resgate</span>':""}
                        ${u?'<span class="bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-medium px-2 py-0.5 rounded"><i class="bi bi-check2"></i> Finalizado</span>':""}
                    </div>
                    <p class="text-sm text-gray-600 truncate mb-1">${b(o.serviceName)}</p>
                    <p class="text-sm text-gray-400 truncate flex items-center gap-1"><i class="bi bi-person text-gray-300"></i> ${b(o.professionalName)}</p>
                </div>

                <div class="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity pl-4">
                    ${u?"":`
                        <a href="${x}" target="_blank" class="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors shadow-sm" title="Confirmar WhatsApp" onclick="event.stopPropagation()">
                            <i class="bi bi-whatsapp"></i>
                        </a>
                        <button data-action="edit-appointment" data-appointment='${f}' class="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors shadow-sm" title="Editar">
                            <i class="bi bi-pencil"></i>
                        </button>
                    `}
                    <button data-action="delete-appointment" data-id="${o.id}" class="w-9 h-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors shadow-sm" title="Excluir">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>`}).join("");t.innerHTML=`<div class="w-full px-4 pt-4 pb-24 space-y-3 bg-white min-h-[50vh]">${a}</div>`}function Ur(e){const t=document.getElementById("agenda-view");if(!t)return;const a=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],o=Vo(C.currentDate),s=zo(),n=100/(window.innerWidth<768?3:s),l=`flex: 0 0 ${n}%; width: ${n}%; max-width: ${n}%;`;let d=`
        <style>
            .agenda-scroll-container::-webkit-scrollbar { height: 6px; }
            .agenda-scroll-container::-webkit-scrollbar-track { background: #f9fafb; }
            .agenda-scroll-container::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        </style>
        <div class="flex h-full min-h-[70vh] overflow-x-auto overflow-y-hidden snap-x snap-mandatory agenda-scroll-container divide-x divide-gray-100 bg-white w-full">
    `;for(let c=0;c<s;c++){const u=new Date(o);u.setDate(u.getDate()+c);const p=new Date,v=u.toDateString()===p.toDateString(),f=e.filter(k=>new Date(k.startTime).toDateString()===u.toDateString()).sort((k,D)=>new Date(k.startTime)-new Date(D.startTime));let x='<div class="flex-grow overflow-y-auto px-2 py-3 space-y-2 pb-24 custom-scrollbar bg-white">';f.length>0?x+=f.map(k=>{const D=new Date(k.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),L=m.professionalColors.get(k.professionalId)||{main:"#9ca3af"},A=b(k.professionalName||"Indefinido");if(k.type==="blockage")return`
                        <div class="relative p-2.5 rounded-lg bg-red-50/50 border border-red-100 overflow-hidden flex flex-col text-left">
                            <div class="absolute left-0 top-0 bottom-0 w-1 bg-red-400"></div>
                            <span class="font-semibold text-xs text-red-800 mb-0.5">${D}</span>
                            <p class="font-medium text-xs text-red-600 leading-tight truncate">${b(k.reason)}</p>
                        </div>
                    `;const j=JSON.stringify(k).replace(/'/g,"&apos;"),T=k.status==="completed";return`
                    <div class="relative p-2.5 rounded-lg bg-white border border-gray-200 hover:border-gray-300 shadow-sm cursor-pointer transition-all flex flex-col group text-left ${T?"opacity-60 bg-gray-50":""}" 
                         data-action="open-comanda" data-appointment='${j}'>
                        <div class="absolute left-0 top-0 bottom-0 w-1" style="background-color: ${L.main};"></div>
                        <div class="flex justify-between items-start mb-1">
                            <span class="font-semibold text-xs text-gray-900">${D}</span>
                            ${T?'<i class="bi bi-check2 text-emerald-500"></i>':""}
                        </div>
                        <p class="font-semibold text-sm text-gray-800 leading-tight truncate mb-1">${b(k.clientName)}</p>
                        <p class="text-xs text-gray-500 truncate">${A.split(" ")[0]}</p>
                    </div>
                `}).join(""):x+='<div class="flex flex-col items-center justify-center pt-10 opacity-40"><span class="text-xs font-medium text-gray-400">Livre</span></div>',x+="</div>";const h=v?"bg-indigo-50 border-b-2 border-indigo-500":"bg-gray-50 border-b border-gray-200",E=v?"text-indigo-600":"text-gray-500",S=v?"text-indigo-900":"text-gray-800";d+=`
            <div class="flex flex-col snap-start shrink-0 relative" style="${l}">
                <div class="sticky top-0 z-10 text-center py-3 ${h}">
                    <p class="text-xs font-semibold ${E} mb-0.5">${a[u.getDay()]}</p>
                    <span class="text-xl font-bold ${S} leading-none">${u.getDate()}</span>
                </div>
                ${x}
            </div>
        `}d+="</div>",t.innerHTML=d}function Uo(){const e=m.allEvents.filter(t=>C.selectedProfessionalId==="all"||t.professionalId===C.selectedProfessionalId);C.currentView==="list"?Vr(e):Ur(e),Sa()}function Sa(){const e=document.getElementById("batch-delete-container"),t=document.querySelector('[data-action="new-appointment"]');e&&(C.isSelectionMode&&C.selectedItems.size>0?(e.innerHTML=`
            <div class="bg-gray-900 text-white p-3 rounded-xl shadow-xl flex items-center justify-between gap-4 animate-fade-in-up">
                <span class="font-semibold text-sm ml-2"><span class="text-indigo-400">${C.selectedItems.size}</span> itens selecionados</span>
                <button data-action="batch-delete" class="bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 shadow-md text-sm flex items-center gap-2 transition-colors">
                    <i class="bi bi-trash"></i> Excluir
                </button>
            </div>
        `,e.style.display="block",t&&(t.style.display="none")):(e.style.display="none",t&&(t.style.display="flex")))}async function ee(){const e=document.getElementById("agenda-view");if(!e)return;C.selectedItems.clear(),Sa(),e.innerHTML='<div class="loader mx-auto my-16 border-gray-400"></div>';let t,a;const o=document.getElementById("current-date-display");if(C.currentView==="list")t=new Date(C.currentDate),t.setHours(0,0,0,0),a=new Date(C.currentDate),a.setHours(23,59,59,999),o&&(o.textContent=t.toLocaleDateString("pt-BR",{day:"2-digit",month:"long",year:"numeric"}).replace(" de "," de "));else{const s=zo();if(t=Vo(new Date(C.currentDate)),a=new Date(t),a.setDate(t.getDate()+(s-1)),a.setHours(23,59,59,999),o){const r=t.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"}),i=a.toLocaleDateString("pt-BR",{day:"2-digit",month:"short",year:"numeric"});o.textContent=`${r} — ${i}`}}try{const[s,r]=await Promise.all([Do(m.establishmentId,t.toISOString(),a.toISOString(),C.selectedProfessionalId==="all"?null:C.selectedProfessionalId),Ot(m.establishmentId,t.toISOString(),a.toISOString(),C.selectedProfessionalId)]);if(!document.getElementById("agenda-view"))return;const i=s.map(l=>{let d=l.professionalName;if(!d&&l.professionalId){const c=m.professionals?m.professionals.find(u=>u.id===l.professionalId):null;c&&(d=c.name)}return{...l,type:"appointment",professionalName:d||"Indefinido"}}),n=r.map(l=>{let d=l.professionalName;if(!d&&l.professionalId){const c=m.professionals?m.professionals.find(u=>u.id===l.professionalId):null;c&&(d=c.name)}return{...l,type:"blockage",professionalName:d||"Indefinido"}});m.allEvents=[...i,...n],ka(),Uo()}catch{document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML='<div class="p-6 text-center text-red-500 font-medium">Falha ao carregar dados da agenda.</div>')}}async function _r(){try{const[e,t,a]=await Promise.all([re(m.establishmentId),Se(m.establishmentId),be(m.establishmentId)]);m.professionals=e||[],m.services=t||[],Oo=[],a&&(Lt=a.loyaltyProgram||{enabled:!1}),m.professionals.forEach((o,s)=>{m.professionalColors.set(o.id,na[s%na.length])}),ka()}catch{g("Atenção","Não foi possível pré-carregar os dados da equipa.","error")}}async function _o(e={}){C.currentDate=e.targetDate?new Date(e.targetDate):C.currentDate||new Date,C.scrollToAppointmentId=e.scrollToAppointmentId||null,C.isSelectionMode=!1,C.selectedItems.clear(),Ua.innerHTML=`
        <div class="flex flex-col h-[calc(100vh-80px)] md:h-auto bg-gray-50 relative font-sans w-full overflow-x-hidden">
            
            <div class="bg-white border-b border-gray-200 z-30 w-full shadow-sm sticky top-0">
                <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between gap-4 md:items-center">
                    
                    <div class="flex items-center justify-between md:justify-start gap-4">
                        <div class="flex items-center bg-white rounded-lg border border-gray-300 p-1 shadow-sm">
                            <button id="btn-prev-date" class="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-all"><i class="bi bi-chevron-left"></i></button>
                            <button id="btn-today" class="px-4 py-1.5 text-sm font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-all">Hoje</button>
                            <button id="btn-next-date" class="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-all"><i class="bi bi-chevron-right"></i></button>
                        </div>
                        <div class="relative flex-1 text-right md:text-left">
                            <h2 id="current-date-display" class="font-semibold text-lg text-gray-800 cursor-pointer hover:text-indigo-600 transition-colors">Carregando...</h2>
                            <input type="date" id="dateFilterInput" class="absolute inset-0 opacity-0 cursor-pointer w-full">
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <div class="flex bg-gray-100 p-1 rounded-lg border border-gray-200 w-full md:w-auto shadow-inner">
                            <button data-view="list" class="view-btn flex-1 md:flex-none px-5 py-2 text-sm font-semibold rounded-md transition-all ${C.currentView==="list"?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}">Lista</button>
                            <button data-view="week" class="view-btn flex-1 md:flex-none px-5 py-2 text-sm font-semibold rounded-md transition-all ${C.currentView==="week"?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}">Semana</button>
                        </div>
                        
                        <div class="relative">
                            <button id="btn-agenda-options" class="w-10 h-10 flex items-center justify-center text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg shadow-sm transition-all"><i class="bi bi-three-dots-vertical"></i></button>
                            
                            <div id="agenda-options-menu" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50 py-2 animate-fade-in-down origin-top-right">
                                <button id="btn-toggle-select" class="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors flex items-center gap-3">
                                    <i class="bi bi-check2-square text-lg"></i> Modo Seleção
                                </button>
                                
                                <div class="px-4 py-2.5 border-t border-gray-100 mt-1">
                                    <label class="flex items-center gap-3 text-sm font-medium text-gray-700 cursor-pointer">
                                        <input type="checkbox" id="showInactiveProfsToggle" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"> 
                                        Exibir Equipa Inativa
                                    </label>
                                </div>

                                <div id="week-days-menu" class="px-4 py-3 border-t border-gray-100 ${C.currentView==="week"?"block":"hidden"}">
                                    <span class="text-xs font-semibold text-gray-500 mb-2 block">Dias (Visão Semanal)</span>
                                    <div class="flex gap-2">
                                        <button data-days="3" class="week-days-btn flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${C.weekViewDays===3?"bg-gray-800 text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200"}">3</button>
                                        <button data-days="5" class="week-days-btn hidden md:block flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${C.weekViewDays===5?"bg-gray-800 text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200"}">5</button>
                                        <button data-days="7" class="week-days-btn hidden md:block flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${C.weekViewDays===7?"bg-gray-800 text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200"}">7</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white border-b border-gray-200">
                    <div id="profSelectorContainer" class="max-w-7xl mx-auto px-4 py-3 flex overflow-x-auto hide-scrollbar gap-4 items-start">
                        <div class="loader-small mx-auto my-2 border-gray-400"></div>
                    </div>
                </div>
            </div> 
            
            <div id="agenda-view" class="flex-1 w-full bg-white"></div>
            
            <button data-action="new-appointment" class="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 hover:-translate-y-1 transition-all z-40">
                <i class="bi bi-plus text-3xl"></i>
            </button>

            <div id="batch-delete-container" class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 hidden w-[90%] max-w-md"></div>
        </div>`,document.getElementById("btn-prev-date").addEventListener("click",()=>{C.currentView==="list"?C.currentDate.setDate(C.currentDate.getDate()-1):C.currentDate.setDate(C.currentDate.getDate()-C.weekViewDays),ee()}),document.getElementById("btn-next-date").addEventListener("click",()=>{C.currentView==="list"?C.currentDate.setDate(C.currentDate.getDate()+1):C.currentDate.setDate(C.currentDate.getDate()+C.weekViewDays),ee()}),document.getElementById("btn-today").addEventListener("click",()=>{C.currentDate=new Date,ee()}),document.getElementById("dateFilterInput").addEventListener("change",o=>{if(o.target.value){const[s,r,i]=o.target.value.split("-");C.currentDate=new Date(s,r-1,i),ee()}}),document.querySelectorAll(".view-btn").forEach(o=>{o.addEventListener("click",s=>{const r=s.target.dataset.view;if(C.currentView===r)return;document.querySelectorAll(".view-btn").forEach(n=>{n.classList.remove("bg-white","text-gray-900","shadow-sm"),n.classList.add("text-gray-500")}),s.target.classList.add("bg-white","text-gray-900","shadow-sm"),s.target.classList.remove("text-gray-500"),C.currentView=r;const i=document.getElementById("week-days-menu");r==="week"?i.classList.remove("hidden"):i.classList.add("hidden"),ee()})});const t=document.getElementById("btn-agenda-options"),a=document.getElementById("agenda-options-menu");t.addEventListener("click",o=>{o.stopPropagation(),a.classList.toggle("hidden")}),document.addEventListener("click",o=>{!a.contains(o.target)&&o.target!==t&&a.classList.add("hidden")}),document.getElementById("btn-toggle-select").addEventListener("click",()=>{C.isSelectionMode=!C.isSelectionMode,C.isSelectionMode||C.selectedItems.clear(),a.classList.add("hidden"),Uo()}),document.getElementById("showInactiveProfsToggle").addEventListener("change",o=>{C.showInactiveProfs=o.target.checked,ka()}),document.querySelectorAll(".week-days-btn").forEach(o=>{o.addEventListener("click",s=>{const r=parseInt(s.target.dataset.days,10);document.querySelectorAll(".week-days-btn").forEach(i=>{i.classList.remove("bg-gray-800","text-white"),i.classList.add("bg-gray-100","text-gray-600")}),s.target.classList.add("bg-gray-800","text-white"),s.target.classList.remove("bg-gray-100","text-gray-600"),C.weekViewDays=r,a.classList.add("hidden"),ee()})}),_a||(Ua.addEventListener("click",async o=>{const s=o.target.closest("[data-action]");if(o.target.dataset.action==="toggle-select-item"){const l=o.target.dataset.id;o.target.checked?C.selectedItems.add(l):C.selectedItems.delete(l),Sa();return}if(s&&s.dataset.action==="batch-delete"){const l=C.selectedItems.size;if(await V("Excluir em Lote",`Tem certeza que deseja excluir ${l} agendamento(s)? Esta ação não pode ser desfeita.`)){const c=Array.from(C.selectedItems);let u=0;try{await Promise.all(c.map(async p=>{try{await Ra(p),u++}catch{}})),g(`${u} agendamento(s) excluído(s).`,"success"),C.selectedItems.clear(),C.isSelectionMode=!1,ee()}catch{g("Erro ao processar exclusão.","error")}}return}if(o.target.closest('[data-action="select-professional"]')){const d=o.target.closest('[data-action="select-professional"]').dataset.profId,c=C.selectedProfessionalId===d&&d!=="all";C.selectedProfessionalId=c?"all":d,await ee();return}if(!s)return;const r=s.dataset.action;let i=null;const n=o.target.closest("[data-appointment]");switch(n&&(i=JSON.parse(n.dataset.appointment.replace(/&apos;/g,"'"))),r){case"new-appointment":la();break;case"edit-appointment":if(C.isSelectionMode||!i)return;if(i.status==="completed"){g("Atenção","Agendamentos finalizados não podem ser editados.","warning");return}la(i);break;case"delete-appointment":{if(C.isSelectionMode)return;o.stopPropagation();const l=s.dataset.id;if(await V("Confirmar Exclusão","Apagar este agendamento do sistema?"))try{await Ra(l),g("Agendamento apagado.","success"),ee()}catch(c){g(`Não foi possível apagar: ${c.message}`,"error")}break}case"open-comanda":if(C.isSelectionMode)return;if(i){const l=i.status==="completed"?"finalizadas":"em-atendimento",d={selectedAppointmentId:i.id,initialFilter:l};if(l==="finalizadas"){let c=i.startTime;i.transaction&&i.transaction.paidAt&&(c=typeof i.transaction.paidAt=="object"?new Date(i.transaction.paidAt._seconds*1e3):i.transaction.paidAt),d.filterDate=c}X("comandas-section",d)}break}}),_a=!0),await _r(),await ee()}function Wa(e){e<1||e>4||(B.step=e,la(null,!0))}function Wr(e,t){const a=document.getElementById("multiServiceToggle"),o=a&&a.checked,s=t.classList.contains("selected"),r=B.data.selectedServiceIds.indexOf(e);if(s)t.classList.remove("selected","border-indigo-500"),r>-1&&B.data.selectedServiceIds.splice(r,1);else{if(!o){B.data.selectedServiceIds=[];const i=document.getElementById("apptServicesContainer");i&&i.querySelectorAll(".service-card.selected").forEach(n=>n.classList.remove("selected","border-indigo-500"))}t.classList.add("selected","border-indigo-500"),B.data.selectedServiceIds.push(e)}}function Jr(e,t){const a=document.querySelector(".professional-step-cards");if(!a)return;a.querySelectorAll(".professional-modal-card").forEach(s=>s.classList.remove("selected","border-indigo-500")),t.classList.add("selected","border-indigo-500");const o=wa.find(s=>s.id===e);B.data.professionalId=e,B.data.professionalName=o?o.name:"Indefinido"}async function Ja(){const e=document.getElementById("apptTotalDuration"),t=document.getElementById("availableTimesContainer");if(!e||!t)return;const a=B.data.professionalId,o=B.data.selectedServiceIds,s=document.getElementById("apptDate").value;B.data.date=s;const r=o.reduce((i,n)=>{const l=Vt.find(d=>d.id===n);return i+(l?l.duration+(l.bufferTime||0):0)},0);if(e.textContent=`${r} min`,r===0||!a||!s){t.innerHTML='<p class="col-span-full text-center text-sm text-gray-500">Selecione o serviço e o profissional primeiro.</p>';return}t.innerHTML='<div class="loader-small mx-auto col-span-full border-gray-400"></div>';try{let i=await Ws({establishmentId:m.establishmentId,professionalId:a,serviceIds:o,date:s});const n=new Date;if(new Date(s+"T00:00:00").toDateString()===n.toDateString()){const d=n.getHours()*60+n.getMinutes();i=i.filter(c=>{const[u,p]=c.split(":").map(Number);return u*60+p>=d})}t.innerHTML="",i.length>0?i.forEach(d=>{const c=document.createElement("button");c.type="button",c.className=`time-slot-card p-2 text-sm bg-gray-100 font-semibold text-gray-700 rounded-lg hover:bg-indigo-50 transition-colors ${B.data.time===d?"selected bg-indigo-600 text-white":""}`,c.textContent=d,c.addEventListener("click",()=>{t.querySelectorAll(".time-slot-card").forEach(u=>{u.classList.remove("selected","bg-indigo-600","text-white"),u.classList.add("bg-gray-100","text-gray-700")}),c.classList.remove("bg-gray-100","text-gray-700"),c.classList.add("selected","bg-indigo-600","text-white"),B.data.time=d}),t.appendChild(c)}):t.innerHTML='<p class="col-span-full text-center text-sm text-gray-500">Nenhum horário livre encontrado.</p>'}catch{t.innerHTML='<p class="col-span-full text-center text-sm text-red-500">Erro ao buscar horários.</p>'}}function Gr(){const e=document.getElementById("loyaltyRewardsContainer");if(!e)return;const{clientHasRewards:t,clientLoyaltyPoints:a,redeemedReward:o}=B.data,{enabled:s,rewards:r}=Lt;if(!s||!t||!r||r.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");const i=r.filter(l=>a>=l.points);let n=`<h4 class="text-sm font-semibold text-gray-700 mb-3"><i class="bi bi-gift mr-1"></i> Resgate de Fidelidade (${a} pts)</h4>`;i.length>0?(n+='<div class="space-y-2">',n+=i.map(l=>{const d=o?.reward===l.reward;return`
                <label class="flex items-center p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="radio" name="loyaltyReward" class="form-radio text-indigo-600 focus:ring-indigo-500" value="${b(l.reward)}" data-points="${l.points}" ${d?"checked":""}>
                    <span class="ml-3"><span class="font-semibold text-gray-800 text-sm">${b(l.reward)}</span><span class="text-xs text-gray-500 ml-2"> (-${l.points} pts)</span></span>
                </label>
            `}).join(""),n+="</div>"):n+='<p class="text-xs text-gray-500">Pontos insuficientes para as recompensas atuais.</p>',e.innerHTML=n,e.querySelectorAll('input[name="loyaltyReward"]').forEach(l=>{l.addEventListener("change",d=>{d.target.checked&&(B.data.redeemedReward={reward:d.target.value,points:parseInt(d.target.dataset.points,10)})})}),e.insertAdjacentHTML("beforeend",`
        <label class="flex items-center p-3 mt-2 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
            <input type="radio" name="loyaltyReward" class="form-radio text-gray-400" value="none" ${o?"":"checked"}>
            <span class="ml-3 text-sm text-gray-500 font-medium">Não utilizar pontos agora</span>
        </label>
    `),e.querySelector('input[value="none"]').addEventListener("change",l=>{l.target.checked&&(B.data.redeemedReward=null)})}async function Qr(e){e.preventDefault();const t=e.target,a=t.querySelector('button[type="submit"]');if(!B.data.time||B.data.selectedServiceIds.length===0||!B.data.professionalId)return g("Atenção","Por favor, selecione horário, serviço e profissional.","warning");a.disabled=!0,a.innerHTML='<div class="loader-small border-white"></div>';const o=B.data.selectedServiceIds.map(d=>{const c=Vt.find(u=>u.id===d);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[s,r]=B.data.time.split(":"),i=new Date(`${B.data.date}T${s}:${r}:00`),n={establishmentId:m.establishmentId,clientName:B.data.clientName,clientPhone:B.data.clientPhone,services:o,professionalId:B.data.professionalId,professionalName:B.data.professionalName,startTime:i.toISOString(),redeemedReward:B.data.redeemedReward},l=t.querySelector("#appointmentId").value;l&&(n.id=l);try{l?await Gs(l,n):await Js(n),g("Sucesso","Agendamento registado com sucesso!","success"),document.getElementById("appointmentModal").style.display="none",ee()}catch(d){g("Erro",d.message,"error"),a.disabled=!1,a.innerHTML="Confirmar Agendamento"}}function Yr(e){return`
        <div class="client-search-card p-3 bg-white rounded-lg border border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 ${B.data.clientName===e.name&&B.data.clientPhone===e.phone?"selected border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/30":""}" 
             data-action="select-client" data-client-name="${b(e.name)}" data-client-phone="${b(e.phone)}" data-loyalty-points="${e.loyaltyPoints||0}">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">${b(e.name).charAt(0).toUpperCase()}</div>
                <div><p class="font-semibold text-sm text-gray-800 leading-tight">${b(e.name)}</p><p class="text-xs text-gray-500 mt-0.5">${b(e.phone)}</p></div>
            </div>
        </div>
    `}async function Xr(e){const t=document.getElementById("clientSearchResults");if(!t||e.trim().length<3){t&&(t.innerHTML='<p class="text-xs font-medium text-gray-400">Digite pelo menos 3 letras do nome...</p>');return}t.innerHTML='<div class="loader-small mx-auto my-4 border-gray-400"></div>';try{const a=await ya(m.establishmentId,e.trim());if(Oo=a,a.length===0){t.innerHTML='<p class="text-sm text-gray-500">Nenhum cliente na base de dados.</p>';return}t.innerHTML=a.map(Yr).join(""),t.querySelectorAll('[data-action="select-client"]').forEach(o=>{o.addEventListener("click",()=>{B.data.clientName=o.dataset.clientName,B.data.clientPhone=o.dataset.clientPhone,B.data.clientLoyaltyPoints=parseInt(o.dataset.loyaltyPoints||"0",10);const s=Math.min(...(Lt?.rewards||[]).map(r=>r.points));B.data.clientHasRewards=Lt.enabled&&s!==1/0&&B.data.clientLoyaltyPoints>=s,document.getElementById("apptClientName").value=o.dataset.clientName,document.getElementById("apptClientPhone").value=o.dataset.clientPhone,document.querySelectorAll(".client-search-card").forEach(r=>r.classList.remove("selected","border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/30")),o.classList.add("selected","border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/30")})})}catch{t.innerHTML='<p class="text-sm text-red-500">Erro na procura.</p>'}}function Zr(e,t){return{title:e?"Editar Reserva":"Identificar Cliente",content:`
        <div class="p-6 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Nome do Cliente *</label>
                    <input type="text" id="apptClientName" required class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-gray-800" value="${b(B.data.clientName)}">
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Telefone / WhatsApp *</label>
                    <input type="tel" id="apptClientPhone" required class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-gray-800" value="${b(B.data.clientPhone)}">
                </div>
            </div>
            
            <div class="border-t border-gray-100 pt-6">
                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Já é cliente? Busque pelo nome:</label>
                <div class="relative w-full">
                    <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input type="text" id="clientSearchInput" placeholder="Procurar na base de dados..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
                </div>
                <div id="clientSearchResults" class="mt-3 space-y-2 max-h-40 overflow-y-auto p-1 custom-scrollbar"></div>
            </div>
        </div>
        <footer class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
            <button type="button" data-action="close-modal" data-target="appointmentModal" class="py-2.5 px-6 bg-white border border-gray-300 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-50">Cancelar</button>
            <button type="button" data-action="next-step" data-current-step="1" class="py-2.5 px-6 bg-gray-900 text-white font-bold text-sm rounded-lg hover:bg-gray-800">Avançar</button>
        </footer>
    `}}function Kr(){return{title:"Quais serviços deseja?",content:`
        <div class="p-6 space-y-6">
             <div class="flex flex-col sm:flex-row items-center gap-4">
                 <div class="relative w-full sm:flex-grow">
                     <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                     <input type="search" id="serviceSearchModalInput" placeholder="Filtrar menu..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                 </div>
                 <label class="flex items-center space-x-2 cursor-pointer flex-shrink-0 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                     <input type="checkbox" id="multiServiceToggle" class="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" ${B.data.selectedServiceIds.length>1?"checked":""}>
                     <span class="text-xs font-bold text-gray-600 uppercase tracking-widest">Múltiplos</span>
                 </label>
            </div>
            
            <div id="apptServicesContainer" class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1 custom-scrollbar">
                 ${Vt.map(e=>`
                         <div class="service-card p-3 bg-white rounded-xl border border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 ${B.data.selectedServiceIds.includes(e.id)?"selected border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/30":""}" data-service-id="${e.id}">
                             <div class="flex items-center gap-3">
                                 <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-400 border border-gray-200"><i class="bi bi-scissors"></i></div>
                                 <div class="flex-1 min-w-0">
                                     <p class="font-bold text-sm text-gray-800 leading-tight truncate">${b(e.name)}</p>
                                     <p class="text-xs font-medium text-gray-500 mt-0.5">R$ ${e.price.toFixed(2)} • ${e.duration}m</p>
                                 </div>
                             </div>
                         </div>`).join("")}
            </div>
        </div>
        <footer class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="2" class="py-2.5 px-6 bg-white border border-gray-300 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-50">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="2" class="py-2.5 px-6 bg-gray-900 text-white font-bold text-sm rounded-lg hover:bg-gray-800">Avançar</button>
        </footer>
    `}}function ei(){return{title:"Quem fará o atendimento?",content:`
        <div class="p-6 space-y-6">
             <div class="relative w-full">
                 <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                 <input type="search" id="professionalSearchModalInput" placeholder="Procurar na equipa..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
             </div>
             
             <div id="apptProfessionalContainer" class="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-1 custom-scrollbar professional-step-cards">
                 ${wa.map(e=>{const t=B.data.professionalId===e.id,a=e.photo?`background-image: url('${e.photo}'); background-size: cover; background-position: center;`:"";return`
                         <div class="professional-modal-card p-3 bg-white rounded-xl border border-gray-200 text-center cursor-pointer transition-colors hover:bg-gray-50 flex flex-col items-center gap-2 ${t?"selected border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/30":""}" data-professional-id="${e.id}">
                             <div class="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-500 shadow-sm" style="${a}">
                                 ${e.photo?"":b(e.name).charAt(0).toUpperCase()}
                             </div>
                             <div class="w-full">
                                <p class="text-sm font-bold text-gray-800 truncate leading-tight">${b(e.name).split(" ")[0]}</p>
                                <p class="text-[10px] text-gray-500 uppercase tracking-widest truncate mt-0.5">${b(e.specialty||"Staff")}</p>
                             </div>
                         </div>`}).join("")}
             </div>
        </div>
        <footer class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="3" class="py-2.5 px-6 bg-white border border-gray-300 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-50">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="3" class="py-2.5 px-6 bg-gray-900 text-white font-bold text-sm rounded-lg hover:bg-gray-800">Avançar</button>
        </footer>
    `}}function ti(e){const t=e?"Revisão e Data":"Agendar Data e Horário",a=B.data.date||new Date().toISOString().split("T")[0];return{title:t,content:`
        <div class="p-6 space-y-6">
            
            <div class="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0"><i class="bi bi-person"></i></div>
                <div class="flex-1 min-w-0">
                    <p class="font-bold text-gray-900 truncate leading-tight">${b(B.data.clientName)}</p>
                    <p class="text-xs text-gray-500 font-medium truncate mt-0.5">Com: ${b(B.data.professionalName)}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Escolha o Dia</label>
                    <input type="date" id="apptDate" required class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-gray-700 transition-all shadow-inner" value="${a}">
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Tempo Necessário</label>
                    <div class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 flex items-center gap-2 shadow-inner">
                        <i class="bi bi-clock-history text-gray-400"></i> <span id="apptTotalDuration">Calculando...</span>
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-100 pt-5">
                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Horários Livres Encontrados</label>
                <div id="availableTimesContainer" class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar"></div>
            </div>

            <div id="loyaltyRewardsContainer" class="hidden bg-gray-50 p-4 rounded-xl border border-gray-200"></div>
        </div>
        <footer class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="4" class="py-2.5 px-6 bg-white border border-gray-300 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-50">Voltar</button>
            <button type="submit" class="py-2.5 px-8 bg-indigo-600 text-white font-bold text-sm rounded-lg hover:bg-indigo-700 shadow-md active:scale-95 transition-transform flex items-center gap-2">
                <i class="bi bi-calendar-check"></i> ${e?"Salvar":"Agendar"}
            </button>
        </footer>
    `}}async function la(e=null,t=!1){const a=document.getElementById("appointmentModal");t||(B={step:1,data:{id:e?.id||null,clientName:e?.clientName||"",clientPhone:e?.clientPhone||"",selectedServiceIds:e?.services?.map(s=>s.id)||[],professionalId:e?.professionalId||null,professionalName:e?.professionalName||"",date:e?.startTime?new Date(e.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],time:e?.startTime?new Date(e.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null,redeemedReward:e?.redeemedReward||null,clientHasRewards:e?.hasRewards||!1,clientLoyaltyPoints:0}}),Vt=m.services,wa=m.professionals.filter(s=>s.status==="active");let o={title:"Erro",content:""};switch(B.step){case 1:o=Zr(e);break;case 2:o=Kr();break;case 3:o=ei();break;case 4:o=ti(e);break}a.innerHTML=`
        <div class="modal-content max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden m-4 flex flex-col max-h-[90vh]">
            <header class="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-10 shadow-sm relative">
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shadow-inner border border-indigo-200">
                        ${B.step}/4
                    </span>
                    <h2 class="text-xl font-black text-gray-900 tracking-tight">${o.title}</h2>
                </div>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                    <i class="bi bi-x-lg text-lg"></i>
                </button>
            </header>
            <form id="appointmentForm" class="flex flex-col h-full bg-white relative">
                <input type="hidden" id="appointmentId" value="${B.data.id||""}">
                <div class="flex-1 overflow-y-auto custom-scrollbar">${o.content}</div>
            </form>
        </div>`,a.querySelectorAll('[data-action="next-step"]').forEach(s=>s.addEventListener("click",()=>{const r=parseInt(s.dataset.currentStep,10);if(r===1&&(B.data.clientName=a.querySelector("#apptClientName").value.trim(),B.data.clientPhone=a.querySelector("#apptClientPhone").value.trim(),!B.data.clientName))return g("Atenção","O nome do cliente é obrigatório.","warning");if(r===2&&B.data.selectedServiceIds.length===0)return g("Atenção","Selecione pelo menos um serviço do menu.","warning");if(r===3&&!B.data.professionalId)return g("Atenção","Escolha o membro da equipa para este atendimento.","warning");Wa(r+1)})),a.querySelectorAll('[data-action="prev-step"]').forEach(s=>s.addEventListener("click",()=>Wa(parseInt(s.dataset.currentStep,10)-1))),B.step===4&&a.querySelector("#appointmentForm").addEventListener("submit",Qr),a.style.display="flex",B.step===2&&a.querySelectorAll(".service-card").forEach(s=>s.addEventListener("click",()=>Wr(s.dataset.serviceId,s))),B.step===3&&a.querySelectorAll(".professional-modal-card").forEach(s=>s.addEventListener("click",()=>Jr(s.dataset.professionalId,s))),B.step===1&&a.querySelector("#clientSearchInput")?.addEventListener("input",s=>Xr(s.target.value)),B.step===4&&(a.querySelector("#apptDate")?.addEventListener("change",Ja),Ja(),Gr())}const ai=(e,t=null,a=1,o=12)=>{let s=`/api/comandas/${e}?page=${a}&limit=${o}`;return t&&(s+=`&date=${t}`),I(s)},oi=(e,t)=>I(`/api/appointments/${e}/comanda`,{method:"POST",body:JSON.stringify({items:t})}),si=e=>I("/api/sales",{method:"POST",body:JSON.stringify(e)}),ri=e=>I(`/api/sales/${e}`,{method:"DELETE"}),Ut=e=>I(`/api/products/${e}`),ii=e=>I("/api/products",{method:"POST",body:JSON.stringify(e)}),ni=(e,t)=>I(`/api/products/${e}`,{method:"PUT",body:JSON.stringify(t)}),li=e=>I(`/api/products/${e}`,{method:"DELETE"}),di=(e,t)=>I(`/api/products/${e}/stock`,{method:"PATCH",body:JSON.stringify(t)}),ci=({startDate:e,endDate:t,productId:a,categoryId:o,establishmentId:s})=>{const r=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&r.append("productId",a),o&&o!=="all"&&r.append("categoryId",o),s&&r.append("establishmentId",s),I(`/api/products/stock-history/report?${r.toString()}`)},ui=()=>I("/api/cashier/status").catch(e=>{if(e.message.includes("404")||e.message.includes("não encontrada"))return null;throw e}),mi=e=>{const t={establishmentId:e.establishmentId,initialAmount:Number(e.initialAmount),notes:e.notes||""};return console.log("Payload enviado para abrir caixa:",t),I("/api/cashier/open",{method:"POST",body:JSON.stringify(t)})},pi=(e,t)=>{const a={finalAmount:Number(t)};return console.log("Payload enviado para fechar caixa:",a),I(`/api/cashier/close/${e}`,{method:"PUT",body:JSON.stringify(a)})},gi=()=>I("/api/cashier/history").then(e=>e||[]).catch(e=>(console.error("Erro ao buscar histórico:",e),[])),bi=e=>I(`/api/cashier/report/${e}`),$a=e=>I(`/api/packages/${e}`),fi=e=>I("/api/packages",{method:"POST",body:JSON.stringify(e)}),xi=(e,t)=>I(`/api/packages/${e}`,{method:"PUT",body:JSON.stringify(t)}),vi=e=>I(`/api/packages/${e}`,{method:"DELETE"});let y={allComandas:[],catalog:{services:[],products:[],packages:[]},activeFilter:"atendimento",selectedComandaId:null,viewMode:"items",isCashierOpen:!1,activeCashierSessionId:null,loyaltySettings:null,pendingRedemption:null,paging:{page:1,limit:10,total:0},checkoutState:{payments:[],selectedMethod:"dinheiro",installments:1,amountReceived:"",discount:{type:"real",value:0},discountReason:""},isProcessing:!1},Ee=null,Ce=null,Ga=null;function Wo(e,t){return function(...a){clearTimeout(Ga),Ga=setTimeout(()=>e.apply(this,a),t)}}async function Qa(e,t="stay"){if(!e||!e.id)return;e._localUpdatedAt=Date.now(),e._cachedItems=null,e._hasUnsavedChanges=!1,nt(),t==="checkout"&&(y.viewMode="checkout",y.checkoutState.payments||(y.checkoutState.payments=[]),y.checkoutState.selectedMethod="dinheiro",y.checkoutState.amountReceived="",y.checkoutState.discount.value||(y.checkoutState.discount={type:"real",value:0},y.checkoutState.discountReason=""),J());const a=document.createElement("div");a.id="saving-overlay",a.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",a.innerHTML=`
        <div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center animate-fade-in">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-800 font-bold text-lg">Sincronizando...</p>
        </div>
    `,document.body.appendChild(a);try{const o=(e.comandaItems||[]).filter(s=>s&&s.id&&String(s.id)!=="undefined"&&String(s.id)!=="null").map(s=>{const r={...s};if(r.id=String(s.id),r.type==="product"){const i=r.id;r.productId||(r.productId=i),r.product_id||(r.product_id=i)}if(r.type==="service"){const i=r.id;r.serviceId||(r.serviceId=i),r.service_id||(r.service_id=i)}return r});e.type==="walk-in"&&String(e.id).startsWith("temp-")||await oi(e.id,o),document.body.contains(a)&&document.body.removeChild(a),t!=="checkout"&&(g("Sucesso","Comanda atualizada!","success"),J())}catch(o){document.body.contains(a)&&document.body.removeChild(a),console.error("Erro ao salvar:",o),e._hasUnsavedChanges=!0,J(),g("Erro","Falha ao salvar no servidor: "+o.message,"warning")}}function we(e){if(!e._cachedItems){let t=[];if(e.status==="completed"){const a=e.comandaItems||e.items||[];t=a.length>0?a:e.services||[]}else{const a=(e.services||[]).map(i=>({...i,_source:"original_service",type:"service"})),o=a.reduce((i,n)=>{const l=String(n.id);return i[l]=(i[l]||0)+1,i},{}),s=[...e.comandaItems||[],...e.items||[]],r=[];s.forEach(i=>{const n=String(i.id);(i.type==="service"||!i.type)&&o[n]>0?o[n]--:r.push({...i,_source:"extra"})}),t=[...a,...r]}return e._cachedItems=t,e._cachedTimestamp=Date.now(),t}return e._cachedItems}function hi(){const e=document.getElementById("comandas-layout");if(e){e.classList.add("detail-view-active");const t=document.getElementById("comanda-detail-container");t&&(t.scrollTop=0)}}function Te(){const e=document.getElementById("comandas-layout");e&&e.classList.remove("detail-view-active")}function yi(){const e=new Date().toISOString().split("T")[0];Ce.innerHTML=`
        <section class="h-full flex flex-col">
            <div class="flex flex-wrap justify-between items-center mb-4 gap-4 px-1">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Ponto de Venda</h2>
                <div id="cashier-controls" class="flex items-center gap-2">
                    <div class="loader-sm"></div>
                </div>
            </div>

            <div id="cashier-alert-box"></div>

            <div id="comandas-layout">
                <div id="comandas-list-column" class="flex flex-col h-full">
                    <div class="p-4 pb-2 sticky top-0 bg-white z-10 border-b border-gray-100 shadow-sm flex-shrink-0">
                        <button 
                            id="btn-new-sale"
                            data-action="new-sale" 
                            class="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md flex items-center justify-center gap-2 mb-3"
                        >
                            <span>+</span> NOVA VENDA
                        </button>
                        
                        <div class="flex bg-gray-100 rounded-lg p-1">
                            <button data-filter="atendimento" class="filter-btn flex-1 text-sm font-medium py-2 rounded-md transition-all">Em Aberto</button>
                            <button data-filter="finalizadas" class="filter-btn flex-1 text-sm font-medium py-2 rounded-md transition-all">Finalizadas</button>
                        </div>
                    </div>

                    <div id="finalizadas-datepicker" class="hidden px-4 py-2 bg-gray-50 border-b flex-shrink-0">
                        <label for="filter-date" class="text-xs font-semibold text-gray-500 uppercase">Data:</label>
                        <input type="date" id="filter-date" value="${e}" class="w-full mt-1 p-2 border rounded-md bg-white text-sm">
                    </div>

                    <div id="comandas-list" class="p-3 space-y-2 overflow-y-auto custom-scrollbar flex-grow">
                        <div class="loader mx-auto mt-10"></div>
                    </div>
                    
                    <div id="pagination-container" class="p-2 border-t bg-gray-50 flex-shrink-0 min-h-[50px] flex justify-center items-center"></div>
                </div>

                <div id="comanda-detail-container">
                    <div class="hidden lg:flex flex-col items-center justify-center h-full text-center text-gray-400">
                        <p>Selecione uma venda para ver os detalhes</p>
                    </div>
                </div>
            </div>
        </section>
    `,_t()}function _t(){const e=document.getElementById("cashier-alert-box"),t=document.getElementById("btn-new-sale");y.isCashierOpen?(e&&(e.innerHTML=""),t&&(t.classList.remove("opacity-50","cursor-not-allowed"),t.disabled=!1)):(e&&(e.innerHTML=`
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg animate-fade-in">
                <div class="flex">
                    <div class="flex-shrink-0">⚠️</div>
                    <div class="ml-3">
                        <p class="text-sm text-yellow-700">
                            <strong>Caixa Fechado!</strong> Abra o caixa para realizar vendas.
                        </p>
                    </div>
                </div>
            </div>
        `),t&&(t.classList.add("opacity-50","cursor-not-allowed"),t.disabled=!0)),wi()}function wi(){const e=document.getElementById("cashier-controls");e&&(y.isCashierOpen?e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-green-700 bg-green-100 py-1 px-3 rounded-full border border-green-200">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-2 px-4 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 text-sm transition">Fechar Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm transition">Relatório</button>
        `:e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-red-700 bg-red-100 py-1 px-3 rounded-full border border-red-200">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-sm shadow transition">Abrir Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm transition">Relatório</button>
        `)}function nt(){const e=document.getElementById("comandas-list"),t=document.getElementById("pagination-container");if(!e)return;if(!y.isCashierOpen&&y.activeFilter==="atendimento"){e.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <svg class="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `,t&&(t.innerHTML="");return}const o={atendimento:"confirmed",finalizadas:"completed"}[y.activeFilter],s=y.allComandas.filter(i=>i.status===o);if(s.length===0){e.innerHTML='<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda encontrada.</p>',Ya(t);return}const r=document.createDocumentFragment();s.forEach(i=>{const n=we(i);let l=0;i.status==="completed"&&i.totalAmount!==void 0&&i.totalAmount!==null?l=Number(i.totalAmount):l=n.reduce((S,k)=>S+Number(k.price||0),0);const c=i.loyaltyRedemption||i.discount&&i.discount.reason&&String(i.discount.reason).toLowerCase().includes("fidelidade")?'<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-5 h-5 ml-2" title="Prémio Resgatado">🎁</span>':"",u=i.id===y.selectedComandaId,p=new Date(i.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),v=i.type==="walk-in"||typeof i.id=="string"&&i.id.startsWith("temp-"),f=b(i.clientName||"Cliente sem nome"),x=b(i.professionalName||"Sem profissional"),h=v?'<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">Avulso</span>':'<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">Agenda</span>',E=document.createElement("div");E.className=`comanda-card cursor-pointer ${u?"selected":""}`,E.dataset.action="select-comanda",E.dataset.comandaId=i.id,E.innerHTML=`
            <div class="flex justify-between items-start mb-1 pointer-events-none">
                <p class="font-bold text-gray-800 truncate max-w-[70%] text-sm">${f}</p>
                <div class="flex items-center">
                    <p class="font-bold text-gray-900 text-sm">R$ ${l.toFixed(2)}</p>
                    ${c}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none">
                <div class="flex items-center gap-2">
                    ${h}
                    <p class="text-xs text-gray-500 truncate max-w-[100px]">${x}</p>
                </div>
                <p class="text-xs text-gray-400 font-medium">${p}</p> 
            </div>
        `,r.appendChild(E)}),e.innerHTML="",e.appendChild(r),Ya(t)}function Ya(e){if(!e)return;e.innerHTML="";const{page:t,total:a,limit:o}=y.paging,s=Math.ceil((a||0)/o);if(s===0)return;const r=document.createElement("div");r.className="flex gap-2 justify-center items-center w-full",r.innerHTML=`
        <button data-page="${t-1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t<=1?"opacity-50 cursor-not-allowed":""}" ${t<=1?"disabled":""}>&laquo;</button>
        <span class="text-xs font-semibold text-gray-600 mx-2">Pág ${t} de ${s||1}</span>
        <button data-page="${t+1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t>=s?"opacity-50 cursor-not-allowed":""}" ${t>=s?"disabled":""}>&raquo;</button>
    `,e.appendChild(r),r.querySelectorAll("button[data-page]").forEach(i=>{i.onclick=n=>{n.stopPropagation();const l=parseInt(i.dataset.page,10);l>0&&l<=s&&(y.paging.page=l,ue())}})}function J(){const e=document.getElementById("comanda-detail-container");if(!e)return;const t=y.allComandas.find(x=>x.id===y.selectedComandaId);if(y.viewMode==="checkout"&&t){ki(t,e);return}const a=`
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
                <p class="text-sm">Toque em um item à esquerda para ver os detalhes</p>
            </div>
        `;return}const o=we(t),s=t.status==="completed",r=t.type==="walk-in"||typeof t.id=="string"&&t.id.startsWith("temp-"),i=o.reduce((x,h)=>{const E=h._source==="original_service",S=h.id||h.name,k=E?`original-${S}`:`${h.type}-${S}`;return x[k]||(x[k]={...h,quantity:0,sources:[]}),x[k].quantity+=1,h._source&&x[k].sources.push(h._source),x},{}),n=Object.values(i).reduce((x,h)=>x+Number(h.price||0)*h.quantity,0),l=b(t.clientName||"Cliente sem nome"),d=b(t.professionalName||"Profissional não atribuído"),c=t._hasUnsavedChanges,v=`
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
    `,f=`
        <div class="mobile-fabs-container">
            <button data-action="add-item" class="fab-btn-secondary" title="Adicionar Item">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            </button>
            <button data-action="save-comanda" class="fab-btn-secondary ${c?"bg-amber-500 text-white hover:bg-amber-600":"bg-gray-600 text-white hover:bg-gray-700"}" title="Salvar Alterações">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
            </button>
            <button data-action="go-to-checkout" class="fab-btn-primary" title="Receber / Pagar">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
        </div>
    `;e.innerHTML=`
        ${a} 
        <div class="flex-grow overflow-y-auto p-4 pb-24 custom-scrollbar"> 
            <div class="flex justify-between items-start mb-6 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800 truncate max-w-[200px]">${l}</h3>
                    <p class="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        ${d}
                    </p>
                    ${r?'<span class="mt-2 inline-block px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-md">Venda Avulsa</span>':`<button data-action="go-to-appointment" data-id="${t.id}" data-date="${t.startTime}" class="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1 mt-2">
                             Ver na Agenda <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                         </button>`}
                </div>
                <div class="flex gap-2">
                    ${s?`<button data-action="reopen-appointment" data-id="${t.id}" class="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200" title="Reabrir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>`:""}
                    ${r&&!s?`<button data-action="delete-walk-in" data-id="${t.id}" class="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200" title="Excluir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`:""}
                </div>
            </div>

            <div id="loyalty-container" class="mb-4"></div>

            <div class="space-y-3">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Itens do Pedido</h4>
                ${Object.values(i).map(x=>{const h=x.sources&&x.sources.includes("original_service"),E=y.pendingRedemption&&String(y.pendingRedemption.appliedToItemId)===String(x.id),S=x.isReward||E;return`
                    <div class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm ${S?"border-yellow-300 bg-yellow-50 ring-1 ring-yellow-200":""}">
                        <div class="flex items-center gap-3 w-full">
                            <div class="flex-grow min-w-0">
                                <p class="text-sm font-semibold text-gray-800 line-clamp-1">
                                    ${S?"🎁 ":""}
                                    ${b(x.name)}
                                    ${h?'<span class="text-[10px] text-indigo-600 bg-indigo-50 px-1 rounded border border-indigo-100 ml-1">Original</span>':""}
                                </p>
                                <p class="text-xs text-gray-500">${S?'<span class="text-yellow-700 font-bold bg-yellow-100 px-1 rounded">Prémio Fidelidade</span>':`R$ ${(x.price||0).toFixed(2)} un.`}</p>
                            </div>
                            ${s?`<span class="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg">${x.quantity}x</span>`:`
                                <div class="flex items-center bg-gray-100 rounded-lg p-1 gap-3">
                                    ${h?`<span class="text-sm font-bold text-gray-500 w-16 text-center py-1 bg-gray-200 rounded text-[10px] uppercase">Fixo: ${x.quantity}</span>`:`<button data-action="decrease-qty" data-item-id="${x.id}" data-item-type="${x.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-600">-</button>
                                         <span class="text-sm font-bold text-gray-800 w-4 text-center">${x.quantity}</span>
                                         <button data-action="increase-qty" data-item-id="${x.id}" data-item-type="${x.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-green-50 hover:text-green-600">+</button>`}
                                </div>
                            `}
                            <div class="flex items-center justify-end w-20">
                                <span class="font-bold text-gray-900 whitespace-nowrap">R$ ${(x.price*x.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                `}).join("")}
                ${Object.keys(i).length===0?'<div class="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg text-sm">Nenhum item adicionado</div>':""}
            </div>
        </div>

        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div class="flex flex-col items-start lg:flex-row lg:justify-between lg:items-end mb-4">
                <span class="text-sm text-gray-500 font-medium">Total a Pagar</span>
                <span class="text-4xl lg:text-3xl font-extrabold text-gray-900 mt-1 lg:mt-0">R$ ${n.toFixed(2)}</span>
            </div>
            ${s?`
                <div class="bg-green-50 text-green-700 text-center py-3 rounded-xl font-bold border border-green-200 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Venda Finalizada
                </div>
            `:v}
        </footer>

        ${s?"":f}
    `,!s&&(t.clientId||t.clientName)&&Si(t,e.querySelector("#loyalty-container"))}function ki(e,t){const o=we(e).reduce((p,v)=>p+Number(v.price||0)*(v.quantity||1),0),s=y.checkoutState,r=s.discount||{type:"real",value:0};let i=0;r.type==="percent"?i=o*r.value/100:i=r.value,i>o&&(i=o);const n=o-i,l=s.payments.reduce((p,v)=>p+v.value,0),d=Math.max(0,n-l);(!s.amountReceived||d>0)&&(s.amountReceived=d.toFixed(2));const c=`
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
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Subtotal: <span id="checkout-subtotal-display">R$ ${o.toFixed(2)}</span></p>
                
                <div class="flex flex-col items-center justify-center gap-2 mt-4 mb-2">
                     <div class="flex items-center gap-2">
                         <span class="text-xs font-bold text-red-500">Desconto:</span>
                         <div class="flex border rounded-lg bg-white overflow-hidden shadow-sm w-40">
                             <input type="number" id="discount-value" value="${r.value}" class="w-20 p-1 text-center text-sm font-bold text-red-600 outline-none" placeholder="0">
                             <select id="discount-type" class="bg-gray-100 text-xs font-bold text-gray-700 border-l p-1 outline-none">
                                 <option value="real" ${r.type==="real"?"selected":""}>R$</option>
                                 <option value="percent" ${r.type==="percent"?"selected":""}>%</option>
                             </select>
                         </div>
                     </div>
                     <input type="text" id="discount-reason" class="w-64 p-2 text-xs border border-gray-200 rounded-lg text-center focus:border-indigo-300 focus:ring focus:ring-indigo-100 outline-none" placeholder="Motivo do desconto (opcional)" value="${s.discountReason||""}">
                </div>

                <p class="text-5xl font-extrabold text-gray-800 mt-2" id="checkout-total-display">R$ ${n.toFixed(2)}</p>
                
                <div id="checkout-status-msg" class="mt-2">
                    ${d<=.01?'<p class="text-green-600 font-bold text-lg">Pago</p>':`<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${d.toFixed(2)}</span></p>`}
                </div>
            </div>

            <div class="space-y-3 mb-6">
                ${s.payments.map((p,v)=>`
                    <div class="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-3">
                             <div class="bg-gray-100 p-2 rounded-lg">
                                <span class="font-bold text-xs uppercase text-gray-600">${p.method}</span>
                             </div>
                             ${p.installments>1?`<span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">${p.installments}x</span>`:""}
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-gray-900">R$ ${p.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${v}" class="text-red-400 hover:text-red-600 p-1"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                `).join("")}
            </div>

            ${d>.01?`
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label class="block text-xs font-bold text-gray-500 uppercase mb-3">Adicionar Pagamento</label>
                <div class="grid grid-cols-3 gap-2 mb-4">
                    ${["dinheiro","pix","debito","credito","crediario"].map(p=>`
                        <button data-action="select-method" data-method="${p}" class="p-2 rounded-lg border text-xs font-bold uppercase transition ${s.selectedMethod===p?"bg-indigo-600 text-white border-indigo-600 shadow-md":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}">
                            ${p}
                        </button>
                    `).join("")}
                </div>
                
                ${["credito","crediario"].includes(s.selectedMethod)?`
                    <div class="mb-3">
                        <label class="text-xs text-gray-500">Parcelas</label>
                        <select id="checkout-installments" class="w-full mt-1 p-2 border rounded-lg text-sm bg-gray-50">
                            ${Array.from({length:12},(p,v)=>`<option value="${v+1}" ${s.installments===v+1?"selected":""}>${v+1}x</option>`).join("")}
                        </select>
                    </div>
                `:""}

                <div class="flex items-end gap-2">
                    <div class="flex-grow">
                        <label class="text-xs text-gray-500">Valor</label>
                        <input type="number" id="checkout-amount" step="0.01" class="w-full p-2 border rounded-lg text-lg font-bold" value="${d.toFixed(2)}">
                    </div>
                    <button data-action="add-payment-checkout" class="h-[46px] px-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition">OK</button>
                </div>
            </div>
            `:""}
        </div>

        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] grid grid-cols-2 gap-3">
            <button data-action="back-to-items" class="py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition">Voltar</button>
            <button data-action="finalize-checkout" class="py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200">Finalizar</button>
        </footer>
    `;const u=()=>{const p=y.checkoutState.discount.type,v=y.checkoutState.discount.value;let f=p==="percent"?o*v/100:v;f>o&&(f=o);const x=o-f,h=y.checkoutState.payments.reduce((L,A)=>L+A.value,0),E=Math.max(0,x-h),S=t.querySelector("#checkout-total-display");S&&(S.textContent=`R$ ${x.toFixed(2)}`);const k=t.querySelector("#checkout-status-msg");k&&(E<=.01?k.innerHTML='<p class="text-green-600 font-bold text-lg">Pago</p>':k.innerHTML=`<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${E.toFixed(2)}</span></p>`);const D=t.querySelector("#checkout-amount");D&&E>0&&document.activeElement!==D&&(D.value=E.toFixed(2))};t.querySelector("#discount-value")?.addEventListener("input",p=>{const v=parseFloat(p.target.value)||0;y.checkoutState.discount.value=v,u()}),t.querySelector("#discount-type")?.addEventListener("change",p=>{y.checkoutState.discount.type=p.target.value,u()}),t.querySelector("#discount-reason")?.addEventListener("input",p=>{y.checkoutState.discountReason=p.target.value}),t.querySelector("#checkout-amount")?.addEventListener("input",p=>{y.checkoutState.amountReceived=p.target.value}),t.querySelector("#checkout-installments")?.addEventListener("change",p=>{y.checkoutState.installments=parseInt(p.target.value,10)})}async function Si(e,t){if(!t)return;const a=y.loyaltySettings;if(!a||!a.enabled)return;let o=null;try{if(e.clientId)o=await Ro(m.establishmentId,e.clientId);else if(e.clientName){const n=await ya(m.establishmentId,e.clientName,1);n&&n.length>0&&(o=n[0])}}catch(n){console.warn("Erro ao buscar dados de fidelidade",n)}if(!o||o.loyaltyPoints===void 0)return;const s=Number(o.loyaltyPoints)||0,i=(a.tiers||a.rewards||[]).filter(n=>{const l=Number(n.costPoints||n.points||0);return l>0&&s>=l});if(i.length>0){const n=document.createElement("div");n.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 shadow-sm flex justify-between items-center animate-fade-in",n.innerHTML=`
            <div class="flex items-center gap-3">
                <div class="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div>
                    <p class="text-sm font-bold text-yellow-800">Prémio Disponível!</p>
                    <p class="text-xs text-yellow-700">Saldo: <strong>${s} pts</strong></p>
                </div>
            </div>
        `;const l=document.createElement("button");l.innerText="Resgatar",l.className="text-xs font-bold bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-colors",l.onclick=()=>$i(i,e),n.appendChild(l),t.innerHTML="",t.appendChild(n)}}function $i(e,t){const a=`
        <div class="space-y-4">
            <p class="text-sm text-gray-600 mb-4">O cliente possui pontos suficientes para resgatar os seguintes itens:</p>
            <div class="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                ${e.map(r=>{const i=r.costPoints||r.points||0,n=r.name||r.reward,l=r.type||"money",d=r.discount?parseFloat(r.discount).toFixed(2):"0.00";let c="",u="bg-gray-100 text-gray-600";switch(l){case"service":c="Serviço",u="bg-indigo-100 text-indigo-700";break;case"product":c="Produto",u="bg-green-100 text-green-700";break;case"package":c="Pacote",u="bg-purple-100 text-purple-700";break;case"money":default:c="Valor Livre",u="bg-yellow-100 text-yellow-700";break}return`
                    <button data-action="select-reward" data-reward-id="${r.id||n}" class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group">
                        <div class="text-left flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded ${u}">${c}</span>
                                <p class="font-bold text-gray-800 group-hover:text-yellow-700">${b(n)}</p>
                            </div>
                            <p class="text-xs text-gray-500">Custo: ${i} pontos</p>
                        </div>
                        <div class="text-right">
                            <span class="block text-sm font-bold text-green-600">Desc. R$ ${d}</span>
                        </div>
                    </button>
                `}).join("")}
            </div>
        </div>
    `,{modalElement:o,close:s}=se({title:"🎁 Resgatar Prémio",contentHTML:a,maxWidth:"max-w-md"});o.addEventListener("click",r=>{const i=r.target.closest('[data-action="select-reward"]');if(i){const n=i.dataset.rewardId,l=e.find(d=>d.id&&d.id==n||(d.name||d.reward)==n);l&&(Ei(l,t),s())}})}async function Ei(e,t){const a=Number(e.costPoints||e.points||0),o=e.name||e.reward,s=e.type||"money";if(s==="money"){const l=parseFloat(e.discount)||0;if(l<=0){g("Erro","O valor do desconto configurado é inválido.","error");return}y.checkoutState.discount={type:"real",value:l},y.checkoutState.discountReason=`Resgate Fidelidade: ${o}`,y.pendingRedemption={rewardId:e.id||null,name:o,cost:a,type:"money"},g("Sucesso",`Prémio "${o}" resgatado! Desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),J();return}const r=we(t),i=e.itemId?String(e.itemId):null;if(!i){g("Erro de Configuração",`O prémio "${o}" não tem um item vinculado nas configurações.`,"error");return}const n=r.find(l=>{const d=l.id?String(l.id):null,c=l.serviceId?String(l.serviceId):l.service_id?String(l.service_id):null,u=l.productId?String(l.productId):l.product_id?String(l.product_id):null;return s==="service"?d===i||c===i:s==="product"?d===i||u===i:s==="package"?d===i:!1});if(n){let l=parseFloat(e.discount);(!l||l<=0)&&(l=parseFloat(n.price||0)),y.checkoutState.discount={type:"real",value:l},y.checkoutState.discountReason=`Resgate Fidelidade: ${o}`,y.pendingRedemption={rewardId:e.id||null,name:o,cost:a,type:s,appliedToItemId:n.id},g("Sucesso",`Prémio "${o}" resgatado! Item encontrado e desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),J()}else g("Item Não Encontrado",`Para resgatar o prémio "${o}", o ${s==="service"?"serviço":s==="product"?"produto":"pacote"} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`,"warning")}function Ii(){if(!y.isCashierOpen)return g("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");const{modalElement:e,close:t}=se({title:"Adicionar Item à Comanda",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-4xl"}),a=()=>{const s=e.querySelector("#add-item-content");s.innerHTML=`
            <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-purple-600">Pacotes</h4><div id="modal-package-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
            </div>`;const r=(n="")=>{const l=n.toLowerCase(),d={service:'<svg class="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',package:'<svg class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'},c={"modal-service-list":{items:y.catalog.services,type:"service"},"modal-product-list":{items:y.catalog.products,type:"product"},"modal-package-list":{items:y.catalog.packages,type:"package"}};Object.entries(c).forEach(([u,{items:p,type:v}])=>{const f=document.getElementById(u);if(!f)return;const x=p.filter(h=>h.name.toLowerCase().includes(l)).slice(0,50);f.innerHTML=x.map(h=>h.id?`
                    <button data-action="select-item-for-quantity" data-item-type="${v}" data-item-id="${h.id}" class="flex items-center gap-2 w-full p-2 bg-white border rounded hover:bg-gray-50 transition text-left">
                        <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-50">${d[v]}</div>
                        <span class="flex-grow text-sm truncate">${b(h.name)}</span>
                        <span class="font-bold text-xs text-gray-700">R$ ${h.price.toFixed(2)}</span>
                    </button>
                `:"").join("")||'<p class="text-xs text-gray-400 text-center py-2">Nada encontrado</p>'})};r();const i=document.getElementById("item-search-input");i.addEventListener("input",Wo(n=>{r(n.target.value)},300)),setTimeout(()=>i.focus(),100)},o=s=>{let r=1;const i=e.querySelector("#add-item-content"),n=()=>{document.getElementById("quantity-display").textContent=r,document.getElementById("quantity-minus-btn").disabled=r<=1};i.innerHTML=`
            <div class="text-center p-8 relative">
                <button data-action="back-to-catalog" class="absolute top-0 left-0 text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Voltar
                </button>
                <h3 class="font-bold text-2xl text-gray-800 mt-4">${b(s.name)}</h3>
                <p class="text-lg text-gray-500 font-medium">R$ ${s.price.toFixed(2)}</p>
                <div class="my-8 flex items-center justify-center gap-6">
                    <button id="quantity-minus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition disabled:opacity-50">-</button>
                    <span id="quantity-display" class="text-5xl font-bold w-24 text-center text-indigo-700">${r}</span>
                    <button id="quantity-plus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition">+</button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg text-lg">Adicionar à Comanda</button>
            </div>
        `,document.getElementById("quantity-minus-btn").onclick=()=>{r>1&&(r--,n())},document.getElementById("quantity-plus-btn").onclick=()=>{r++,n()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await Go(s,r),t()}};e.addEventListener("click",s=>{const r=s.target.closest('[data-action="select-item-for-quantity"]'),i=s.target.closest('[data-action="back-to-catalog"]');if(r){const{itemType:n,itemId:l}=r.dataset,c=(y.catalog[n+"s"]||[]).find(u=>u.id===l);c&&o({...c,type:n})}else i&&a()}),a()}async function da(e=null){if(!y.isCashierOpen)return g("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");if(!m.professionals||m.professionals.length===0)try{m.professionals=await re(m.establishmentId)}catch{return g("Erro","Não foi possível carregar profissionais.","error")}const a=`
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
                <select id="new-sale-professional" required class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Selecione...</option>${m.professionals.map(l=>`<option value="${l.id}">${b(l.name)}</option>`).join("")}</select>
            </div>
            <div class="pt-4 border-t"><button type="submit" id="btn-start-sale" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">Iniciar Venda</button></div>
        </form>
    `,{modalElement:o}=se({title:"Nova Venda Avulsa",contentHTML:a,maxWidth:"max-w-md"}),s=o.querySelector("#client-search"),r=o.querySelector("#client-suggestions"),i=o.querySelector("#selected-client-id");e&&(i.value=e.id,s.value=`${e.name} (${e.phone||"Sem tel"})`,s.classList.add("bg-green-50","border-green-300","text-green-800")),s.addEventListener("input",Wo(async l=>{const d=l.target.value.trim();if(i.value="",s.classList.remove("bg-green-50","border-green-300","text-green-800"),d.length<2){r.classList.add("hidden");return}try{r.innerHTML='<li class="p-2 text-xs text-gray-500">Buscando...</li>',r.classList.remove("hidden");const c=await ya(m.establishmentId,d,10);c.length===0?r.innerHTML='<li class="p-2 text-xs text-gray-500">Nenhum cliente encontrado</li>':r.innerHTML=c.map(u=>`<li data-client-id="${u.id}" data-client-name="${u.name}" data-client-phone="${u.phone}" class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 transition-colors"><div class="font-bold text-sm text-gray-800">${b(u.name)}</div><div class="text-xs text-gray-500">${u.phone||"Sem telefone"}</div></li>`).join("")}catch{r.classList.add("hidden")}},400)),r.addEventListener("click",l=>{const d=l.target.closest("li[data-client-id]");d&&(i.value=d.dataset.clientId,i.dataset.name=d.dataset.clientName,i.dataset.phone=d.dataset.clientPhone,s.value=`${d.dataset.clientName}`,s.classList.add("bg-green-50","border-green-300","text-green-800"),r.classList.add("hidden"))}),document.addEventListener("click",l=>{!s.contains(l.target)&&!r.contains(l.target)&&r.classList.add("hidden")}),o.querySelector("#new-sale-form").addEventListener("submit",Mi);const n=o.querySelector('[data-action="new-client-from-sale"]');n&&n.addEventListener("click",l=>{l.preventDefault(),o.style.display="none",Li()})}function Li(){se({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("comandas_clientRegistrationForm");t&&t.addEventListener("submit",Ci)}async function Ci(e){e.preventDefault();const t=document.getElementById("comandas_clientRegistrationForm");if(!t)return;const a=t.querySelector("#regClientName"),s=t.querySelector("#regClientPhone").value.replace(/\D/g,"");if(!a.value||!s)return g("Erro","Nome e Telefone são obrigatórios.","error");try{const r=await Or(m.establishmentId,s);if(r)g("Atenção","Cliente já cadastrado.","info"),document.getElementById("genericModal").style.display="none",da(r);else{const i=await jo({establishmentId:m.establishmentId,name:a.value,phone:s});g("Sucesso","Cliente cadastrado!","success"),document.getElementById("genericModal").style.display="none",da(i)}}catch(r){g("Erro",r.message,"error")}}async function Ti(){const e=`
        <form id="open-cashier-form" class="space-y-4">
            <div>
                <label for="initial-amount" class="block text-sm font-medium text-gray-700">Valor Inicial do Caixa</label>
                <div class="mt-1 relative"><span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span><input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold" placeholder="0.00" value="0.00"></div>
            </div>
            <div class="pt-4 border-t"><button type="submit" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition shadow-md">Confirmar Abertura</button></div>
        </form>
    `,{modalElement:t}=se({title:"Abrir Caixa",contentHTML:e,maxWidth:"max-w-md"});t.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const o=parseFloat(document.getElementById("initial-amount").value);if(isNaN(o)||o<0)return g("Valor Inválido","Insira um valor válido.","error");try{const s=await mi({establishmentId:m.establishmentId,initialAmount:parseFloat(o.toFixed(2))});y.isCashierOpen=!0,y.activeCashierSessionId=s.id,document.getElementById("genericModal").style.display="none",g("Sucesso!",`Caixa aberto (R$ ${o.toFixed(2)})`,"success"),_t(),await ue()}catch(s){g("Erro",`Falha ao abrir caixa: ${s.message}`,"error")}})}async function Di(){const e=y.activeCashierSessionId;if(e)try{const t=await bi(e),a=`
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
        `,{modalElement:o}=se({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-md"});o.querySelector("#close-cashier-form").addEventListener("submit",async s=>{s.preventDefault();const r=parseFloat(document.getElementById("final-amount").value);if(isNaN(r)||r<0)return g("Valor Inválido","Insira um valor final válido.","error");try{await pi(e,r),y.isCashierOpen=!1,y.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",_t(),await ue(),g("Sucesso!","Caixa fechado com sucesso!","success")}catch(i){g("Erro",`Falha ao fechar caixa: ${i.message}`,"error")}})}catch(t){g("Erro",`Falha ao carregar relatório: ${t.message}`,"error")}}async function Pi(e){if(y.activeFilter===e)return;y.activeFilter=e,y.paging.page=1,document.querySelectorAll(".filter-btn").forEach(a=>a.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${e}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",e!=="finalizadas"),Te(),y.selectedComandaId=null,y.viewMode="items";const t=document.getElementById("comandas-list");t&&(t.innerHTML='<div class="loader mx-auto mt-10"></div>'),await ue(),J()}function Jo(e){y.selectedComandaId=e,y.viewMode="items",y.pendingRedemption=null,y.checkoutState.discount={type:"real",value:0},y.checkoutState.discountReason="",nt(),hi(),J()}async function Go(e,t){const a=y.allComandas.find(r=>r.id===y.selectedComandaId);if(!a)return;if(!e.id||String(e.id)==="undefined"){console.error("Tentativa de adicionar item sem ID:",e),g("Erro","Item sem identificador. Não foi possível adicionar.","error");return}const o=parseFloat(e.price)||0,s=Array(t).fill(0).map(()=>{const r={id:String(e.id),name:e.name,price:o,type:e.type,isReward:e.isReward||!1,pointsCost:e.pointsCost||0};return e.type==="product"?(r.productId=r.id,r.product_id=r.id):e.type==="service"&&(r.serviceId=r.id,r.service_id=r.id),r});a.comandaItems=a.comandaItems||[],a.comandaItems.push(...s),a._cachedItems=null,a._hasUnsavedChanges=!0,J()}async function Xa(e,t){const a=y.allComandas.find(r=>r.id===y.selectedComandaId);if(!a)return;let o=!1,s=(a.comandaItems||[]).findIndex(r=>r.id==e&&r.type===t);s>-1&&(a.comandaItems.splice(s,1),o=!0),o&&(a._cachedItems=null,a._hasUnsavedChanges=!0,J())}async function Bi(e){if(y.isProcessing)return;const t=we(e),a=t.reduce((h,E)=>h+Number(E.price||0)*(E.quantity||1),0),o=y.checkoutState.discount||{type:"real",value:0};let s=o.type==="percent"?a*o.value/100:o.value;s>a&&(s=a);const r=a-s,{payments:i}=y.checkoutState,n=i.reduce((h,E)=>h+E.value,0),l=r-n;if(l>.01){if(!await V("Pagamento Parcial",`O valor de R$ ${l.toFixed(2)} não foi pago. Deseja registrar como DÍVIDA (Fiado) no cadastro do cliente?`))return;i.push({method:"fiado",value:l,installments:1})}y.isProcessing=!0;const d=e.type==="appointment",c=t;let u=0;const p=y.loyaltySettings;p&&p.enabled&&(u=parseInt(p.pointsPerVisit||1,10),console.log(`Fidelidade: Cliente ganhou ${u} pontos fixos pela visita.`));const v={...o,reason:y.checkoutState.discountReason||""},f={payments:i,totalAmount:Number(r),items:c,cashierSessionId:y.activeCashierSessionId,loyaltyPointsEarned:u,discount:v,loyaltyRedemption:y.pendingRedemption},x=document.createElement("div");x.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",x.innerHTML='<div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center"><div class="loader mb-4 border-t-indigo-600"></div><p>Finalizando venda...</p></div>',document.body.appendChild(x);try{d?await Ys(e.id,f):(f.establishmentId=m.establishmentId,f.clientId=e.clientId,f.clientName=e.clientName,f.professionalId=e.professionalId,e.clientPhone&&(f.clientPhone=e.clientPhone),await si(f));let h="Venda finalizada com sucesso!";u>0&&(h+=` Cliente ganhou ${u} pontos!`),g("Sucesso!",h,"success"),Te(),y.selectedComandaId=null,y.viewMode="items",y.pendingRedemption=null,await ue()}catch(h){g("Erro no Checkout",h.message,"error")}finally{document.body.contains(x)&&document.body.removeChild(x),y.isProcessing=!1}}async function Mi(e){e.preventDefault();const t=document.getElementById("selected-client-id"),a=document.getElementById("new-sale-professional").value,o=t.value,s=document.getElementById("client-search").value,r=t.dataset.phone||"";if(!o)return g("Erro","Selecione um cliente válido.","error");const i=m.professionals.find(l=>l.id===a);if(!i)return g("Erro","Selecione um profissional válido.","error");const n={id:`temp-${Date.now()}`,type:"walk-in",clientId:o,clientName:s.split("(")[0].trim(),clientPhone:r,professionalId:i.id,professionalName:i.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};y.allComandas.unshift(n),y.selectedComandaId=n.id,y.viewMode="items",document.getElementById("genericModal").style.display="none",Jo(n.id)}async function ue(){const e=document.getElementById("comandas-list");(!e.hasChildNodes()||e.innerHTML.includes("loader"))&&(e.innerHTML='<div class="loader mx-auto mt-10"></div>');const t=y.activeFilter==="finalizadas"?document.getElementById("filter-date").value:null;try{const a=ui(),o=ai(m.establishmentId,t,y.paging.page,y.paging.limit),s=be(m.establishmentId),[r,i,n]=await Promise.all([a,o,s]);if(y.isCashierOpen=!!r,y.activeCashierSessionId=r?r.id:null,_t(),n&&n.loyaltyProgram&&(y.loyaltySettings=n.loyaltyProgram),!y.isCashierOpen&&y.activeFilter==="atendimento"){nt(),J();return}if(y.allComandas=i.data||i,y.paging.total=i.total||i.length,y.catalog.services.length===0){const[l,d,c,u]=await Promise.all([Se(m.establishmentId),Ut(m.establishmentId),$a(m.establishmentId),re(m.establishmentId)]);y.catalog={services:l,products:d,packages:c},m.professionals=u}nt(),J()}catch(a){g("Erro",`Não foi possível carregar os dados: ${a.message}`,"error")}}async function Ai(e={}){Ce=document.getElementById("content"),y.selectedComandaId=e.selectedAppointmentId||null,y.viewMode="items",yi(),Ee&&(Ce.removeEventListener("click",Ee),Ce.removeEventListener("change",Ee)),Ee=async t=>{const a=t.target.closest("[data-action], [data-filter], [data-comanda-id]");if(t.target.id==="filter-date"&&y.activeFilter==="finalizadas"){y.paging.page=1,await ue();return}if(a){if(a.matches("[data-filter]"))Pi(a.dataset.filter);else if(a.matches("[data-comanda-id]")){if(t.target.closest('[data-action="go-to-appointment"]')){t.stopPropagation();return}Jo(a.dataset.comandaId)}else if(a.matches("[data-action]")){const s=a.dataset.action,r=a.dataset.id||y.selectedComandaId,i=y.allComandas.find(n=>n.id===r);switch(s){case"back-to-list":Te(),y.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach(S=>S.classList.remove("selected")),J();break;case"new-sale":da();break;case"add-item":Ii();break;case"open-cashier":Ti();break;case"close-cashier":await Di();break;case"view-sales-report":X("sales-report-section");break;case"go-to-checkout":await Qa(i,"checkout");break;case"back-to-items":y.viewMode="items",J();break;case"save-comanda":await Qa(i,"stay");break;case"select-method":y.checkoutState.selectedMethod=a.dataset.method,y.checkoutState.installments=1,J();break;case"add-payment-checkout":const n=document.getElementById("checkout-amount");let l=parseFloat(n.value);const c=we(i).reduce((S,k)=>S+(k.price||0),0),u=y.checkoutState.discount||{type:"real",value:0};let p=u.type==="percent"?c*u.value/100:u.value;p>c&&(p=c);const v=c-p,f=y.checkoutState.payments.reduce((S,k)=>S+k.value,0),x=v-f;if(isNaN(l)||l<=0){g("Valor inválido","Insira um valor maior que zero.","error");break}if(l>x+.05){g("Valor inválido","Valor excede o restante.","error");break}const h={method:y.checkoutState.selectedMethod,value:l};["credito","crediario"].includes(y.checkoutState.selectedMethod)&&y.checkoutState.installments>1&&(h.installments=y.checkoutState.installments),y.checkoutState.payments.push(h),y.checkoutState.selectedMethod="dinheiro",y.checkoutState.installments=1,y.checkoutState.amountReceived="",J();break;case"remove-payment-checkout":const E=parseInt(a.dataset.index,10);y.checkoutState.payments.splice(E,1),J();break;case"finalize-checkout":await Bi(i);break;case"increase-qty":{const S=a.dataset.itemId,k=a.dataset.itemType;if(!S||S==="undefined"||S==="null"){g("Erro","Item inválido para adição.","error");return}let L=we(i).find(j=>j.id==S&&j.type===k);L||(L=(y.catalog[k+"s"]||[]).find(T=>T.id==S));const A=L?{id:L.id,name:L.name,price:Number(L.price),type:L.type}:{id:S,name:"Item Indisponível",price:0,type:k};await Go(A,1);break}case"decrease-qty":{await Xa(a.dataset.itemId,a.dataset.itemType);break}case"remove-item":await Xa(a.dataset.itemId,a.dataset.itemType);break;case"reopen-appointment":{if(await V("Reabrir Comanda","Tem certeza? O pagamento será estornado."))try{await Qs(r);const k=y.allComandas.findIndex(D=>D.id===r);k!==-1&&(y.allComandas[k].status="confirmed",delete y.allComandas[k].transaction),y.selectedComandaId=null,Te(),await ue(),g("Sucesso!","Comanda reaberta.","success")}catch(k){g("Erro",k.message,"error")}break}case"go-to-appointment":{const S=a.dataset.id,k=a.dataset.date;X("agenda-section",{scrollToAppointmentId:S,targetDate:new Date(k)});break}case"delete-walk-in":{if(await V("Excluir Venda","Confirma a exclusão desta venda avulsa?"))if(r.startsWith("temp-"))y.allComandas=y.allComandas.filter(k=>k.id!==r),y.selectedComandaId=null,nt(),J(),Te();else try{await ri(r),g("Sucesso","Venda excluída.","success"),y.selectedComandaId=null,Te(),await ue()}catch(k){g("Erro",k.message,"error")}break}}}}},Ce.addEventListener("click",Ee),Ce.addEventListener("change",Ee),e.initialFilter&&(y.activeFilter=e.initialFilter==="finalizadas"?"finalizadas":"atendimento"),e.selectedAppointmentId&&(y.selectedComandaId=e.selectedAppointmentId),document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${y.activeFilter}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",y.activeFilter!=="finalizadas"),e.filterDate&&(document.getElementById("filter-date").value=new Date(e.filterDate).toISOString().split("T")[0]),await ue()}const Wt=e=>I(`/api/financial/natures/${e}`),qi=e=>I("/api/financial/natures",{method:"POST",body:JSON.stringify(e)}),Ri=e=>I(`/api/financial/natures/${e}`,{method:"DELETE"}),Ea=e=>I(`/api/financial/cost-centers/${e}`),Ni=e=>I("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(e)}),ji=e=>I(`/api/financial/cost-centers/${e}`,{method:"DELETE"}),Qo=(e,t)=>I(`/api/financial/${e}`,{method:"POST",body:JSON.stringify(t)}),Yo=(e,t={})=>{let a=`/api/financial/${e}`;const o=new URLSearchParams;t.establishmentId&&o.append("establishmentId",t.establishmentId),t.startDate&&o.append("startDate",t.startDate),t.endDate&&o.append("endDate",t.endDate),t.natureId&&o.append("natureId",t.natureId),t.costCenterId&&o.append("costCenterId",t.costCenterId),t.status&&o.append("status",t.status);const s=o.toString();return s&&(a+=`?${s}`),I(a)},Xo=(e,t,a)=>I(`/api/financial/${e}/${t}`,{method:"PUT",body:JSON.stringify(a)}),Zo=(e,t)=>I(`/api/financial/${e}/${t}`,{method:"DELETE"}),Ko=(e,t)=>{const a=t.map(o=>I(`/api/financial/${e}/${o}`,{method:"DELETE"}));return Promise.all(a)},es=(e,t,a)=>I(`/api/financial/${e}/${t}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),Fi=e=>Qo("payables",e),ts=e=>Yo("payables",e),Hi=(e,t)=>Xo("payables",e,t),Oi=e=>Zo("payables",e),zi=(e,t)=>es("payables",e,t),Vi=e=>Qo("receivables",e),as=e=>Yo("receivables",e),Ui=(e,t)=>Xo("receivables",e,t),_i=e=>Zo("receivables",e),Wi=(e,t)=>es("receivables",e,t),ca=document.getElementById("content");let K={};const gt={creditRealized:"#10b981",creditProvisioned:"#6ee7b7",debitRealized:"#ef4444",debitProvisioned:"#fca5a5"},Ji=["#4f46e5","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4"],P={startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],selectedProfessional:"all",selectedCostCenter:"all",professionalsList:[],costCentersList:[],naturesList:[],rawPayables:[],rawReceivables:[],processedDRE:null,processedCashFlow:null,processedDailyRevenue:null,backendData:null,appointmentsData:[],currentTab:"dashboards",isFilterOpen:!1};async function Gi(){if(!window.Chart)return new Promise((e,t)=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js",a.onload=e,a.onerror=t,document.head.appendChild(a)})}async function Qi(){ca.innerHTML=`
        <div class="flex flex-col items-center justify-center h-[calc(100vh-100px)] w-full">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-500 font-medium animate-pulse">Carregando inteligência...</p>
        </div>`;try{await Gi();const[e,t,a]=await Promise.all([re(m.establishmentId),Lr(m.establishmentId).catch(()=>[]),Wt(m.establishmentId).catch(()=>[])]);P.professionalsList=e||[],P.costCentersList=t||[],P.naturesList=a||[],Yi(),await os()}catch(e){console.error("Erro no loadReportsPage:",e),ca.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full text-red-500 p-6 text-center w-full">
                <div class="bg-red-50 p-4 rounded-full mb-4"><svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                <h3 class="text-lg font-bold text-gray-800">Ops! Algo deu errado.</h3>
                <p class="text-sm text-gray-600 mt-2 max-w-xs mx-auto break-words">${b(e.message)}</p>
                <button onclick="window.location.reload()" class="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-transform active:scale-95">Tentar Novamente</button>
            </div>`}}function Yi(){const e=P.professionalsList.map(a=>`<option value="${a.id}">${b(a.name)}</option>`).join(""),t=P.costCentersList.map(a=>`<option value="${a.id}">${b(a.name)}</option>`).join("");ca.innerHTML=`
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
                                ${Ct(P.startDate)} até ${Ct(P.endDate)}
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
                            <input type="date" id="report-start" value="${P.startDate}" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Fim</label>
                            <input type="date" id="report-end" value="${P.endDate}" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
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
    `,document.getElementById("toggle-filters-btn").onclick=Za,document.getElementById("btn-apply-filters").onclick=()=>{Xi(),Za()},document.querySelectorAll(".tab-btn").forEach(a=>{a.onclick=()=>{P.currentTab=a.dataset.tab,Ka(),ss(),window.scrollTo({top:0,behavior:"smooth"})}}),Ka()}function Za(){const e=document.getElementById("filters-container"),t=document.getElementById("toggle-filters-btn");P.isFilterOpen=!P.isFilterOpen,P.isFilterOpen?(e.classList.remove("hidden"),t.classList.add("bg-indigo-100","text-indigo-800")):(e.classList.add("hidden"),t.classList.remove("bg-indigo-100","text-indigo-800"))}function Ka(){document.querySelectorAll(".tab-btn").forEach(e=>{const t=e.dataset.tab===P.currentTab;e.className=t?"tab-btn py-2 px-6 rounded-full text-xs md:text-sm font-bold bg-indigo-600 text-white shadow-md transform scale-105 transition-all whitespace-nowrap border-transparent":"tab-btn py-2 px-6 rounded-full text-xs md:text-sm font-medium text-gray-500 bg-white border-gray-200 hover:bg-gray-50 transition-all whitespace-nowrap"})}function Ct(e){if(!e)return"";const t=e.split("-");return`${t[2]}/${t[1]}`}async function Xi(){P.startDate=document.getElementById("report-start").value,P.endDate=document.getElementById("report-end").value,P.selectedProfessional=document.getElementById("report-prof").value,P.selectedCostCenter=document.getElementById("report-cost").value,document.getElementById("date-range-display").textContent=`${Ct(P.startDate)} até ${Ct(P.endDate)}`,await os()}function Zi(e,t){const a=new Map;P.naturesList.forEach(s=>a.set(s.id,s.name));const o={revenues:{},expenses:{},totalRevenues:0,totalExpenses:0,netResult:0};return t.forEach(s=>{if(s.status==="paid"){const r=s.naturezaId?a.get(s.naturezaId)||"Outras Receitas":"Geral";o.revenues[r]||(o.revenues[r]=0),o.revenues[r]+=s.amount,o.totalRevenues+=s.amount}}),e.forEach(s=>{if(s.status==="paid"){const r=s.naturezaId?a.get(s.naturezaId)||"Outras Despesas":"Geral";o.expenses[r]||(o.expenses[r]=0),o.expenses[r]+=s.amount,o.totalExpenses+=s.amount}}),o.netResult=o.totalRevenues-o.totalExpenses,o}function Ki(e,t){const a={},o=d=>{a[d]||(a[d]={realizedCredit:0,provisionedCredit:0,realizedDebit:0,provisionedDebit:0})};let s=new Date(P.startDate);const r=new Date(P.endDate);for(;s<=r;)o(s.toISOString().split("T")[0]),s.setDate(s.getDate()+1);t.forEach(d=>{const c=d.dueDate.split("T")[0];a[c]&&(d.status==="paid"?a[c].realizedCredit+=d.amount:a[c].provisionedCredit+=d.amount)}),e.forEach(d=>{const c=d.dueDate.split("T")[0];a[c]&&(d.status==="paid"?a[c].realizedDebit+=d.amount:a[c].provisionedDebit+=d.amount)});const i=Object.keys(a).sort(),n=[];let l=0;return i.forEach(d=>{const c=a[d],u=c.realizedCredit+c.provisionedCredit-(c.realizedDebit+c.provisionedDebit);l+=u,n.push(l)}),{labels:i,realizedCredit:i.map(d=>a[d].realizedCredit),provisionedCredit:i.map(d=>a[d].provisionedCredit),realizedDebit:i.map(d=>a[d].realizedDebit*-1),provisionedDebit:i.map(d=>a[d].provisionedDebit*-1),balance:n}}function en(e){const t={};let a=new Date(P.startDate);const o=new Date(P.endDate);for(;a<=o;)t[a.toISOString().split("T")[0]]=0,a.setDate(a.getDate()+1);e.forEach(i=>{if(i.status==="paid"){const n=i.dueDate.split("T")[0];t.hasOwnProperty(n)&&(t[n]+=i.amount)}});const s=Object.keys(t).sort(),r=s.map(i=>t[i]);return{labels:s,data:r}}function tn(e){const t=e.length;if(t<2)return{trendData:Array(t).fill(e[0]||0),color:"#9ca3af"};let a=0,o=0,s=0,r=0;for(let c=0;c<t;c++)a+=c,o+=e[c],s+=c*e[c],r+=c*c;const i=(t*s-a*o)/(t*r-a*a),n=(o-i*a)/t,l=[];for(let c=0;c<t;c++)l.push(i*c+n);const d=i>=0?"#10b981":"#ef4444";return{trendData:l,color:d}}async function os(){const e=document.getElementById("report-content");e.innerHTML='<div class="flex justify-center py-20 w-full"><div class="loader border-t-indigo-600"></div></div>';try{const t={startDate:P.startDate,endDate:P.endDate,establishmentId:m.establishmentId};P.selectedCostCenter!=="all"&&(t.costCenterId=P.selectedCostCenter);const[a,o]=await Promise.all([ts(t),as(t)]);P.rawPayables=a.entries||[],P.rawReceivables=o.entries||[];const s=await Ir(P.startDate,P.endDate,P.selectedProfessional,P.selectedCostCenter).catch(()=>({charts:{professionals:{labels:[],data:[]},salesMonthly:{labels:[],data:[]}}}));P.backendData=s,P.processedDRE=Zi(P.rawPayables,P.rawReceivables),P.processedCashFlow=Ki(P.rawPayables,P.rawReceivables),P.processedDailyRevenue=en(P.rawReceivables);const r=new Date(P.startDate+"T00:00:00").toISOString(),i=new Date(P.endDate+"T23:59:59").toISOString(),n=P.selectedProfessional==="all"?null:P.selectedProfessional,l=await Do(m.establishmentId,r,i,n).catch(()=>[]);P.appointmentsData=Array.isArray(l)?l:[],ss()}catch(t){console.error(t),e.innerHTML=`
            <div class="bg-red-50 border border-red-100 p-6 rounded-2xl text-center mx-4 w-full">
                <p class="font-bold text-gray-800">Não foi possível carregar</p>
                <p class="text-sm text-gray-500 mt-1">${b(t.message||"Verifique sua conexão.")}</p>
            </div>`}}function ss(){const e=document.getElementById("report-content");switch(P.currentTab){case"dashboards":an(e);break;case"appointments":on(e);break;case"dre":sn(e);break}}function an(e){const t=P.processedDRE,a=P.processedDailyRevenue,o=P.backendData.charts?.salesMonthly||{labels:[],data:[]},s=P.backendData.charts?.professionals||{labels:[],data:[]};e.innerHTML=`
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
    `,rn("chart-cashflow-modern",P.processedCashFlow),eo("chart-daily-revenue","Receita Diária",a.labels.map(r=>r.split("-").reverse().slice(0,2).join("/")),a.data),eo("chart-monthly","Receita Mensal",o.labels,o.data),ln("chart-profs","doughnut","Total Vendas",s.labels,s.data,Ji),document.querySelectorAll(".chart-toggle").forEach(r=>{r.addEventListener("change",i=>{const n=K["chart-cashflow-modern"];if(n){const l=parseInt(i.target.dataset.dataset);n.setDatasetVisibility(l,i.target.checked),n.update()}})})}function on(e){const t=P.appointmentsData,a=t.length;let o=0,s=0,r=0;const i={},n={};let l=new Date(P.startDate);const d=new Date(P.endDate);for(;l<=d;)i[l.toISOString().split("T")[0]]={active:0,cancelled:0},l.setDate(l.getDate()+1);t.forEach(f=>{const x=parseFloat(f.totalAmount||f.price||0),h=(f.status||"").toLowerCase();let E="";if(f.startTime){const k=f.startTime.toDate?f.startTime.toDate():new Date(f.startTime);isNaN(k)||(E=k.toISOString().split("T")[0])}const S=f.professionalName||"Sem Profissional";n[S]||(n[S]={name:S,count:0,value:0}),["cancelled","cancelado","no-show","cancelada"].includes(h)?(s++,E&&i[E]&&i[E].cancelled++):(["completed","finalized","paid"].includes(h)&&o++,r+=x,E&&i[E]&&i[E].active++,n[S].count++,n[S].value+=x)});const c=Object.keys(i).sort(),u=c.map(f=>i[f].active),p=c.map(f=>i[f].cancelled),v=Object.values(n).sort((f,x)=>x.value-f.value);e.innerHTML=`
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 animate-slide-up w-full">
            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1 w-full">
                <p class="text-[10px] text-gray-500 font-bold uppercase truncate">Agendamentos</p>
                <div class="flex items-end gap-2 mt-1">
                    <p class="text-2xl md:text-3xl font-black text-gray-800">${a}</p>
                </div>
            </div>
            
            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 w-full">
                <p class="text-[10px] text-gray-500 font-bold uppercase truncate">Concluídos</p>
                <p class="text-lg md:text-xl font-black text-indigo-600 mt-1">${a>0?Math.round(o/a*100):0}%</p>
            </div>
             <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 w-full">
                <p class="text-[10px] text-gray-500 font-bold uppercase truncate">Cancelados</p>
                <p class="text-lg md:text-xl font-black text-red-500 mt-1">${s}</p>
            </div>

            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1 w-full">
                <p class="text-[10px] text-gray-500 font-bold uppercase truncate">Valor Estimado</p>
                 <p class="text-xl md:text-2xl font-black text-gray-800 mt-1 truncate">R$ ${r.toLocaleString("pt-BR",{minimumFractionDigits:0})}</p>
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
                        ${v.map((f,x)=>{const h=v[0]?.value||1,E=f.value/h*100;return`
                            <tr class="group">
                                <td class="p-3 md:p-4 w-8 md:w-12 text-center font-bold text-gray-300">${x+1}</td>
                                <td class="p-3 md:p-4 pl-0 min-w-[100px]">
                                    <p class="font-bold text-gray-800 truncate max-w-[120px] md:max-w-xs">${b(f.name)}</p>
                                    <div class="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                        <div class="h-full bg-indigo-500 rounded-full" style="width: ${E}%"></div>
                                    </div>
                                </td>
                                <td class="p-3 md:p-4 text-center">
                                    <span class="bg-indigo-50 text-indigo-700 px-2 md:px-2.5 py-1 rounded-lg font-bold text-xs">${f.count}</span>
                                </td>
                                <td class="p-3 md:p-4 text-right font-bold text-gray-700 whitespace-nowrap">R$ ${f.value.toLocaleString("pt-BR",{minimumFractionDigits:0})}</td>
                            </tr>
                        `}).join("")}
                        ${v.length===0?'<tr><td colspan="4" class="p-8 text-center text-gray-400">Sem dados.</td></tr>':""}
                    </tbody>
                </table>
            </div>
        </div>
    `,nn("chart-appointments-daily",c,u,p),document.querySelectorAll(".app-chart-toggle").forEach(f=>{f.addEventListener("change",x=>{const h=K["chart-appointments-daily"];if(h){const E=parseInt(x.target.dataset.dataset);h.setDatasetVisibility(E,x.target.checked),h.update()}})})}function sn(e){const t=P.processedDRE;if(!t)return;const a=t.totalRevenues,o=(n,l,d,c=!1)=>{const u=a>0?l/a*100:0,p=c?"- ":"";return`
        <div class="flex items-center justify-between py-2 md:py-3 px-3 md:px-4 border-b border-dashed border-gray-100 last:border-0 w-full">
            <div class="flex-1 pr-2 md:pr-4 overflow-hidden min-w-0">
                <p class="text-[10px] md:text-xs font-semibold text-gray-600 truncate">${b(n)}</p>
                <div class="w-full h-1 bg-gray-100 rounded-full mt-1.5 overflow-hidden max-w-[80px] md:max-w-[100px]">
                    <div class="h-full ${d.replace("text-","bg-")} opacity-40" style="width: ${Math.min(u,100)}%"></div>
                </div>
            </div>
            <div class="text-right flex-shrink-0">
                <p class="text-xs md:text-sm font-bold ${d}">${p}R$ ${l.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
                <p class="text-[9px] md:text-[10px] text-gray-400 font-medium">${u.toFixed(1)}%</p>
            </div>
        </div>`},s=Object.entries(t.revenues).map(([n,l])=>o(n,l,"text-emerald-600",!1)).join(""),r=Object.entries(t.expenses).map(([n,l])=>o(n,l,"text-red-500",!0)).join(""),i=t.netResult>=0?"Lucro Real":"Prejuízo Real";e.innerHTML=`
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
                    <div>${r||'<p class="text-xs text-gray-400 p-4 text-center">Nenhuma despesa baixada.</p>'}</div>
                </div>
            </div>
        </div>
    `}function rn(e,t){const a=document.getElementById(e);if(!a)return;const o=a.getContext("2d");K[e]&&K[e].destroy();const s=o.createLinearGradient(0,0,0,400);s.addColorStop(0,"rgba(59, 130, 246, 0.4)"),s.addColorStop(1,"rgba(59, 130, 246, 0.0)");const r=t.labels.map(i=>i.split("-").reverse().slice(0,2).join("/"));K[e]=new Chart(o,{type:"bar",data:{labels:r,datasets:[{label:"Créd. Realizado",data:t.realizedCredit,backgroundColor:gt.creditRealized,borderRadius:3,barPercentage:.7,order:1},{label:"Créd. Provisionado",data:t.provisionedCredit,backgroundColor:gt.creditProvisioned,borderRadius:3,borderWidth:1,borderColor:"#fff",borderDash:[5,5],barPercentage:.7,order:2},{label:"Déb. Realizado",data:t.realizedDebit,backgroundColor:gt.debitRealized,borderRadius:3,barPercentage:.7,order:3},{label:"Déb. Provisionado",data:t.provisionedDebit,backgroundColor:gt.debitProvisioned,borderRadius:3,borderWidth:1,borderColor:"#fff",borderDash:[5,5],barPercentage:.7,order:4},{label:"Saldo Acumulado",data:t.balance,type:"line",borderColor:"#3b82f6",backgroundColor:s,borderWidth:3,pointRadius:3,pointBackgroundColor:"#fff",pointBorderColor:"#3b82f6",pointBorderWidth:2,pointHoverRadius:8,hitRadius:30,fill:!0,tension:.4,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{backgroundColor:"#fff",titleColor:"#111",bodyColor:"#444",borderColor:"#eee",borderWidth:1,padding:10,callbacks:{label:function(i){let n=i.dataset.label||"";return n&&(n+=": "),i.parsed.y!==null&&(n+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(Math.abs(i.parsed.y))),n}}}},scales:{x:{stacked:!0,grid:{display:!1},ticks:{font:{size:10}}},y:{stacked:!0,display:!0,grid:{color:"#f3f4f6",borderDash:[4,4]},ticks:{callback:i=>new Intl.NumberFormat("pt-BR",{notation:"compact"}).format(Math.abs(i)),font:{size:10}}}}}})}function nn(e,t,a,o){const s=document.getElementById(e);if(!s)return;const r=s.getContext("2d");K[e]&&K[e].destroy();const i=t.map(n=>n.split("-").reverse().slice(0,2).join("/"));K[e]=new Chart(r,{type:"bar",data:{labels:i,datasets:[{label:"Realizados",data:a,backgroundColor:"#4f46e5",borderRadius:3,barPercentage:.6,order:1},{label:"Cancelados",data:o,backgroundColor:"#ef4444",borderRadius:3,barPercentage:.6,order:2}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{backgroundColor:"#fff",titleColor:"#111",bodyColor:"#444",borderColor:"#eee",borderWidth:1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10}}},y:{beginAtZero:!0,grid:{color:"#f3f4f6"},ticks:{stepSize:1,font:{size:10}}}}}})}function eo(e,t,a,o){const s=document.getElementById(e);if(!s)return;const r=s.getContext("2d");K[e]&&K[e].destroy();const{trendData:i,color:n}=tn(o),l=i.map((u,p)=>p===i.length-1?"triangle":"circle"),d=i.map((u,p)=>p===i.length-1?6:3),c=i.map((u,p)=>p===i.length-1&&n==="#ef4444"?180:0);K[e]=new Chart(r,{type:"bar",data:{labels:a,datasets:[{label:t,data:o,backgroundColor:"#4f46e5",borderRadius:4,order:1},{label:"Tendência",data:i,type:"line",borderColor:n,borderWidth:3,pointStyle:l,pointRadius:d,pointRotation:c,pointBackgroundColor:"#fff",pointBorderColor:n,pointBorderWidth:2,pointHoverRadius:8,hitRadius:30,fill:!1,tension:0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:9}}},y:{grid:{color:"#f3f4f6"},beginAtZero:!0,ticks:{font:{size:9},callback:u=>new Intl.NumberFormat("pt-BR",{notation:"compact"}).format(u)}}}}})}function ln(e,t,a,o,s,r){const i=document.getElementById(e);if(!i)return;const n=i.getContext("2d");K[e]&&K[e].destroy(),new Chart(n,{type:t,data:{labels:o,datasets:[{label:a,data:s,backgroundColor:r,borderColor:Array.isArray(r)?"#fff":r,borderWidth:1,tension:.3,fill:t==="line"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:t==="doughnut",position:"right",labels:{usePointStyle:!0,boxWidth:8,font:{size:10}}}},scales:{}}})}const Jt=(e,t="products")=>I(`/api/${t}/categories/${e}`),rs=(e,t="products")=>I(`/api/${t}/categories`,{method:"POST",body:JSON.stringify(e)}),is=(e,t="products")=>I(`/api/${t}/categories/${e}`,{method:"DELETE"}),dn="audit_logs",de=async(e,t,a,o,s,r=null)=>{try{if(!t)return;await Io(Ft(me,dn),{establishmentId:e,userId:t.uid,userName:t.name||t.email||"Utilizador",module:a,action:o,description:s,details:r,timestamp:new Date})}catch(i){console.error("Falha silenciosa ao registar log:",i)}},xe=document.getElementById("content");let pe=null,Ze="services",he="all",Ke=[];function He(){const e=oe.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}async function cn(e){e.preventDefault();const t=e.target.closest("#categoryForm"),a=t.querySelector("#categoryName"),o=a.value;if(!o)return;const s=t.querySelector('button[type="submit"]');s.disabled=!0,s.textContent="...";try{const r=Ke.reduce((i,n)=>(i.push(n.id),n.branches&&n.branches.forEach(l=>i.push(l.id)),i),[]);r.length===0&&r.push(m.establishmentId),await rs({establishmentId:m.establishmentId,name:o,accessibleIn:r},"services"),de(m.establishmentId,He(),"Categorias (Serviços)","Criou",`Criou categoria: ${o}`),a.value="",g("Sucesso","Categoria criada!","success"),await Ia(),await ut()}catch(r){g("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}finally{s.disabled=!1,s.textContent="Adicionar"}}async function un(e){if(await V("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await is(e,"services"),de(m.establishmentId,He(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${e})`),g("Sucesso","Categoria apagada.","success"),await Ia(),await ut()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function Ia(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await Jt(m.establishmentId,"services");m.serviceCategories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${b(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function mn(){se({title:"Gerir Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",cn),t.addEventListener("click",o=>{const s=o.target.closest('button[data-action="delete-category"]');s&&(o.preventDefault(),un(s.dataset.id))}))}Ia()}function pn(e=[]){if(!Ke||Ke.length===0)return`
            <input type="hidden" name="accessibleIn" value="${m.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                Disponível apenas nesta unidade. Crie mais lojas para distribuir serviços.
            </div>`;let t='<div class="space-y-1 mt-2 max-h-48 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30">';return Ke.forEach(a=>{const o=e.includes(a.id)||e.length===0&&a.id===m.establishmentId;t+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${b(a.name)} (Matriz)</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(s=>{const r=e.includes(s.id)||e.length===0&&s.id===m.establishmentId;t+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${s.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${r?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${b(s.name)}</span>
                    </label>
                `})}),t+="</div>",t}async function gn(e){e.preventDefault();const t=e.target.closest("#serviceModal"),a=t.querySelector("#serviceId").value,o={},s=t.querySelector('input[name="commissionType"]:checked').value;s==="custom"&&t.querySelectorAll(".professional-commission-row").forEach(l=>{const d=l.dataset.profId;if(l.querySelector('input[type="checkbox"]').checked){const u=parseFloat(l.querySelector('input[type="number"]').value);o[d]=isNaN(u)?0:u}});const r=Array.from(t.querySelectorAll('input[name="accessibleIn"]:checked')).map(l=>l.value),i=r.length>0?r:[m.establishmentId],n={establishmentId:m.establishmentId,accessibleIn:i,name:t.querySelector("#serviceName").value.trim(),price:parseFloat(t.querySelector("#servicePrice").value),duration:parseInt(t.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(t.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:t.querySelector("#serviceCategory").value||null,commissionRate:parseFloat(t.querySelector("#serviceCommissionRate").value)||0,active:t.querySelector("#serviceStatus").value==="true",photo:t.querySelector("#servicePhotoBase64").value,notes:t.querySelector("#serviceNotes").value,commissionType:s,professionalCommissions:o};try{a?(await Pr(a,n),de(m.establishmentId,He(),"Serviços","Editou",`Editou o serviço: ${n.name}`)):(await Dr(n),de(m.establishmentId,He(),"Serviços","Criou",`Criou novo serviço: ${n.name}`)),document.getElementById("serviceModal").style.display="none",g("Sucesso",`Serviço ${a?"atualizado":"adicionado"} com sucesso!`,"success"),await ut()}catch(l){g("Erro",l.message,"error")}}function to(e=null){const t=document.getElementById("serviceModal"),a=m.serviceCategories||[],o=e?.duration||0,s=e?.bufferTime||0,r=b(e?.name||""),i=b(e?.notes||""),n=e?r:"Novo Serviço",l=a.map(D=>`<option value="${D.id}" ${e?.categoryId===D.id?"selected":""}>${b(D.name)}</option>`).join("");t.innerHTML=`
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
                        <input type="text" id="serviceName" value="${r}" class="mt-1 w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label for="servicePrice" class="block text-sm font-medium text-gray-700">Preço (a partir de:)</label>
                        <input type="number" id="servicePrice" step="0.01" value="${e?.price!==void 0?e.price:""}" class="mt-1 w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label for="serviceCategory" class="block text-sm font-medium text-gray-700">Categoria</label>
                        <select id="serviceCategory" class="mt-1 w-full p-2 border rounded-md bg-white">
                            <option value="">Sem Categoria</option>
                            ${l}
                        </select>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4 md:col-span-2">
                        <div>
                            <label for="serviceDurationMinutes" class="block text-sm font-medium text-gray-700">Duração (minutos)</label>
                            <input type="number" id="serviceDurationMinutes" min="0" value="${o}" class="mt-1 w-full p-2 border rounded-md" required>
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
                    ${pn(e?.accessibleIn||[])}
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
    </div>`,t.style.display="flex",t.addEventListener("click",async D=>{const L=D.target.closest("button[data-action]");if(!L)return;const A=L.dataset.action,j=L.dataset.id;if(A==="close-modal"&&(t.style.display="none"),A==="delete-service"){if(!j)return;if(t.style.display="none",await V("Apagar Serviço","Tem a certeza que deseja apagar este serviço?"))try{const M=m.services.find(q=>q.id===j)?.name||"Desconhecido";await Br(j),de(m.establishmentId,He(),"Serviços","Excluiu",`Excluiu o serviço: ${M}`),g("Sucesso","Serviço apagado com sucesso!","success"),await ut()}catch(M){g("Erro",`Não foi possível apagar o serviço: ${M.message}`,"error")}else t.style.display="flex"}});const d=t.querySelectorAll(".tab-btn"),c=t.querySelectorAll(".tab-content");d.forEach(D=>{D.addEventListener("click",()=>{d.forEach(L=>{L.classList.remove("border-indigo-500","text-indigo-600"),L.classList.add("border-transparent","text-gray-500")}),D.classList.add("border-indigo-500","text-indigo-600"),D.classList.remove("border-transparent","text-gray-500"),c.forEach(L=>L.classList.add("hidden")),document.getElementById(`tab-content-${D.dataset.tab}`).classList.remove("hidden")})});const u=t.querySelectorAll('input[name="commissionType"]'),p=document.getElementById("defaultCommissionRateContainer"),v=document.getElementById("professionalCommissionsContainer");function f(){const D=t.querySelector('input[name="commissionType"]:checked').value;p&&(p.style.display=D==="default"?"block":"none"),v&&(v.style.display=D==="custom"?"block":"none")}u.forEach(D=>D.addEventListener("change",f));const x=document.getElementById("professionalCommissionsList");x&&(x.innerHTML=(m.professionals||[]).map(D=>{const L=e?.professionalCommissions?.[D.id]!==void 0,A=e?.professionalCommissions?.[D.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-md ${L?"bg-blue-50":""}" data-prof-id="${D.id}">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" ${L?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600">
                        <img src="${D.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${b(D.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover">
                        <span class="text-sm font-medium">${b(D.name)}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${A}" class="w-20 p-1 border rounded-md text-sm text-center" ${L?"":"disabled"}>
                        <span class="text-sm font-semibold">%</span>
                    </div>
                </div>
            `}).join(""),x.querySelectorAll('input[type="checkbox"]').forEach(D=>{D.addEventListener("change",L=>{const A=L.target.closest(".professional-commission-row");A.querySelector('input[type="number"]').disabled=!L.target.checked,A.classList.toggle("bg-blue-50",L.target.checked)})})),f();const h=t.querySelector("#serviceForm"),E=t.querySelector("#servicePhotoInput"),S=t.querySelector("#servicePhotoPreview"),k=t.querySelector("#servicePhotoBase64");t.querySelector("#servicePhotoButton").addEventListener("click",()=>E.click()),E.onchange=async()=>{const D=E.files[0];if(D){S.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const L=await Ho(D,800,800,.8);if(L.length*3/4>1e3*1024)throw new Error("Imagem muito grande.");S.src=L,k.value=L}catch(L){g("Erro de Imagem",L.message,"error"),S.src=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",k.value=e?.photo||""}}},h.addEventListener("submit",gn)}function et(){const e=document.getElementById("servicesList");if(!e)return;const t=document.getElementById("serviceSearchInput")?.value.toLowerCase()||"",a=document.getElementById("serviceCategoryFilter")?.value||"all",o=new Map((m.serviceCategories||[]).map(r=>[r.id,r.name]));let s=(m.services||[]).filter(Boolean);if(he!=="all"){const r=he==="active";s=s.filter(i=>i.active!==!1===r)}s=s.filter(r=>{const i=r.name.toLowerCase().includes(t),n=a==="all"||r.categoryId===a;return i&&n}),e.innerHTML="",s.length>0?s.forEach(r=>{const i=document.createElement("div"),n=JSON.stringify(r).replace(/'/g,"&apos;");i.className=`service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-indigo-300 border border-transparent ${r.active!==!1?"opacity-100":"opacity-60 bg-gray-100"} sm:flex-col`,i.dataset.action="edit-service",i.dataset.service=n;const l=b(r.name),d=b(o.get(r.categoryId)||"Sem Categoria"),c=r.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(r.name.charAt(0))}`;i.innerHTML=`
                <img src="${c}" alt="Imagem" class="w-24 h-24 object-cover flex-shrink-0 sm:w-full sm:h-32">
                <div class="p-3 flex flex-col flex-grow justify-between w-full">
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="text-sm font-bold text-gray-900 flex-1 text-left truncate pr-2">${l}</h3>
                        <label class="flex items-center cursor-pointer ml-2" data-action-stop-propagation="true">
                            <div class="relative">
                                <input type="checkbox" data-action="toggle-service-status" data-id="${r.id}" class="sr-only" ${r.active!==!1?"checked":""}>
                                <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                            </div>
                        </label>
                    </div>
                    <p class="text-lg font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${r.price.toFixed(2)}</p>
                    <div>
                        <div class="hidden sm:block">
                            <p class="text-xs text-gray-500 text-left mb-1 truncate">${d}</p>
                            <p class="text-xs text-gray-500 text-left">${r.duration} min</p>
                        </div>
                        <div class="flex justify-between items-center sm:hidden mt-2">
                            <p class="text-lg font-bold text-indigo-600 text-left">R$ ${r.price.toFixed(2)}</p>
                            <p class="text-xs text-gray-500 text-right">${r.duration} min</p>
                        </div>
                    </div>
                </div>`,e.appendChild(i)}):e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>'}function La(){const e={active:0,inactive:0,total:0},t=(m.services||[]).filter(Boolean);t.forEach(i=>{i.active===!1?e.inactive++:e.active++}),e.total=t.length;const a=document.getElementById("indicator-total"),o=document.getElementById("indicator-active"),s=document.getElementById("indicator-inactive"),r=document.getElementById("indicator-popular");a&&(a.textContent=e.total),o&&(o.textContent=e.active),s&&(s.textContent=e.inactive),r&&(m.mostPopularService&&m.mostPopularService.name!=="N/A"?(r.textContent=b(m.mostPopularService.name),r.closest(".indicator-card").title=`${m.mostPopularService.name} (${m.mostPopularService.count} agendamentos)`):r.textContent="Nenhum agendado")}function bn(){const e=document.getElementById("services-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("serviceCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(m.serviceCategories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${b(a.name)}</option>`)),La(),et()}function fn(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="p-12 text-center bg-gray-50 border border-dashed border-gray-300 rounded-xl max-w-lg mx-auto mt-10">
            <i class="bi bi-bar-chart-line text-4xl text-indigo-300 mb-4 block"></i>
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2 text-sm">Acompanhe métricas de conversão e lucratividade por serviço e unidade. (Em breve)</p>
        </div>
    `}async function ut(){const e=document.getElementById("services-content-container");if(e){const t=e.querySelector(".loader");t&&(t.style.display="block")}try{const[t,a,o,s,r]=await Promise.all([Se(m.establishmentId),re(m.establishmentId),Jt(m.establishmentId,"services"),Ar(m.establishmentId),Oe()]);m.services=(t||[]).filter(Boolean),m.professionals=(a||[]).filter(Boolean),m.serviceCategories=(o||[]).filter(Boolean),m.mostPopularService=s||{name:"N/A",count:0},Ke=r?.matrizes||[],m.services.forEach(i=>{i.active===void 0&&(i.active=!0)}),ns(Ze)}catch(t){e&&(e.innerHTML='<p class="text-red-500 text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>'),g("Erro",`Não foi possível carregar os dados: ${t.message}`,"error")}}function ns(e){if(document.getElementById("services-content-container")){if(Ze===e&&document.getElementById("services-content-container").children.length>1){Ze==="services"&&(La(),et());return}Ze=e,he="all",document.querySelectorAll("#services-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="services"?bn():e==="reports"&&fn()}}function xn(){pe&&(xe.removeEventListener("click",pe),xe.removeEventListener("input",pe),xe.removeEventListener("change",pe)),pe=async e=>{const t=e.target;if(t.closest('[data-action="toggle-service-status"]')){e.stopPropagation();const s=t.closest('[data-action="toggle-service-status"]'),r=s.dataset.id,i=s.checked;try{await Mr(r,i);const n=m.services.findIndex(l=>l.id===r);n>-1&&(m.services[n].active=i),de(m.establishmentId,He(),"Serviços","Atualizou Status",`Alterou status do serviço (ID: ${r}) para ${i?"Ativo":"Inativo"}`),et(),La()}catch(n){g("Erro",`Não foi possível atualizar o status: ${n.message}`,"error"),s.checked=!i}return}const a=t.closest("button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]");if(t.id==="serviceSearchInput"||t.id==="serviceCategoryFilter"){et();return}if(!a)return;if(a.hasAttribute("data-view")){ns(a.dataset.view);return}switch(a.dataset.action){case"new-service":to();break;case"edit-service":const s=JSON.parse(a.dataset.service);to(s);break;case"manage-categories":mn();break;case"filter-service":const r=a.dataset.filterType;if(r==="popular")return;he=r==="total"?"all":r,document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(i=>{const n=i.dataset.filterType,d=n===he||n==="total"&&he==="all";i.classList.toggle("ring-2",d),i.classList.toggle("ring-indigo-500",d),i.classList.toggle("shadow-md",d),i.classList.toggle("bg-white",!d)}),et();break}},xe.addEventListener("click",pe),xe.addEventListener("input",pe),xe.addEventListener("change",pe)}async function vn(){xe.innerHTML=`
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
        </div>`,xn(),Ze="services",he="all",await ut()}const Gt="suppliers",Ca=async e=>{try{const t=Lo(Ft(me,Gt),Co("establishmentId","==",e)),a=await Ns(t),o=[];return a.forEach(s=>{o.push({id:s.id,...s.data()})}),o}catch(t){throw console.error("Erro ao buscar fornecedores:",t),t}},hn=async e=>{try{return{id:(await Io(Ft(me,Gt),e)).id,...e}}catch(t){throw console.error("Erro ao criar fornecedor:",t),t}},yn=async(e,t)=>{try{const a=ct(me,Gt,e);return await fa(a,t),{id:e,...t}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},wn=async e=>{try{const t=ct(me,Gt,e);return await js(t),!0}catch(t){throw console.error("Erro ao excluir fornecedor:",t),t}},fe=document.getElementById("content");let ge=null,tt="products",ce="all";async function kn(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),o=a.value;if(o)try{await rs({establishmentId:m.establishmentId,name:o},"products"),a.value="",g("Sucesso","Categoria de produto criada!","success"),await Ta(),await mt()}catch(s){g("Erro",`Não foi possível criar a categoria: ${s.message}`,"error")}}async function Sn(e){if(await V("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await is(e,"products"),g("Sucesso","Categoria de produto apagada.","success"),await Ta(),await mt()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function Ta(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await Jt(m.establishmentId,"products");m.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${b(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function $n(){se({title:"Gerir Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",kn),t.addEventListener("click",o=>{const s=o.target.closest('button[data-action="delete-category"]');s&&Sn(s.dataset.id)}))}Ta()}async function En(e){if(!e)return;if(await V("Apagar Produto","Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida."))try{await li(e),g("Sucesso","Produto apagado com sucesso!","success"),await mt()}catch(a){g("Erro",`Não foi possível apagar o produto: ${a.message}`,"error")}}async function In(e){const t=e.querySelector("#productId").value,a=parseInt(e.querySelector("#productCurrentStock").value),o=parseInt(e.querySelector("#productMinStock").value),s=parseInt(e.querySelector("#productMaxStock").value),r=e.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),i=Array.from(r).map(l=>l.dataset.id),n={establishmentId:m.establishmentId,name:e.querySelector("#productName").value,price:parseFloat(e.querySelector("#productPrice").value),costPrice:parseFloat(e.querySelector("#productCostPrice").value)||0,commissionRate:parseFloat(e.querySelector("#productCommissionRate").value)||0,currentStock:isNaN(a)?0:a,minStock:isNaN(o)?0:o,maxStock:isNaN(s)?0:s,categoryId:e.querySelector("#productCategory").value||null,photo:e.querySelector("#productPhotoBase64").value,supplierIds:i};try{t?await ni(t,n):await ii(n),document.getElementById("productModal").style.display="none",g("Sucesso",`Produto ${t?"atualizado":"adicionado"} com sucesso!`,"success"),await mt()}catch(l){throw new Error(l.message)}}function ao(e,t=800,a=800,o="image/jpeg",s=.8){return new Promise((r,i)=>{if(!e.type.startsWith("image/"))return i(new Error("O ficheiro selecionado não é uma imagem."));const n=new FileReader;n.onload=l=>{const d=new Image;d.onload=()=>{let c=d.width,u=d.height;c>u?c>t&&(u*=t/c,c=t):u>a&&(c*=a/u,u=a);const p=document.createElement("canvas");p.width=c,p.height=u,p.getContext("2d").drawImage(d,0,0,c,u);const f=p.toDataURL(o,s);r(f)},d.onerror=c=>i(new Error("Não foi possível carregar a imagem.")),d.src=l.target.result},n.onerror=l=>i(new Error("Não foi possível ler o ficheiro.")),n.readAsDataURL(e)})}function oo(e=null){const t=document.getElementById("productModal"),a=m.categories||[],o=m.suppliers||[],s=a.map(T=>`<option value="${T.id}" ${e?.categoryId===T.id?"selected":""}>${b(T.name)}</option>`).join("");let r=new Set(e?.supplierIds||[]);const i=b(e?.name||""),n=e?.price||"",l=e?.costPrice||"",d=e?.commissionRate||"",c=e?.minStock||0,u=e?.maxStock||0,p=e?.currentStock||0,v=e?i:"Novo Produto";t.innerHTML=`
    <div class="modal-content max-w-3xl overflow-y-auto max-h-[90vh]">
        <form id="productForm">
            <input type="hidden" id="productId" value="${e?.id||""}">
            <input type="hidden" id="productPhotoBase64" value="${e?.photo||""}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="productModalTitle" class="text-2xl font-bold text-gray-800">${v}</h2>
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
                            
                            <div class="form-group"><label for="productCostPrice">Preço de Custo Médio (R$)</label><input type="number" id="productCostPrice" step="0.01" value="${l}" class="mt-1 w-full p-2 border rounded-md" placeholder="0.00"></div>
                            
                            <div class="form-group"><label for="productCommissionRate">Comissão (%)</label><input type="number" id="productCommissionRate" placeholder="Ex: 10" value="${d}" class="mt-1 w-full p-2 border rounded-md"></div>
                        </div></div>
                    </div>
                    <div class="mt-6 pt-6 border-t"><h3 class="text-lg font-semibold text-gray-700 text-left mb-4">Controlo de Stock (Definições)</h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div class="form-group"><label for="productCurrentStock">Atual</label><input type="number" id="productCurrentStock" value="${p}" readonly class="mt-1 w-full p-2 border rounded-md bg-gray-100"></div>
                        <div class="form-group"><label for="productMinStock">Mínimo (Alerta)</label><input type="number" id="productMinStock" value="${c}" class="mt-1 w-full p-2 border rounded-md"></div>
                        <div class="form-group"><label for="productMaxStock">Máximo</label><input type="number" id="productMaxStock" value="${u}" class="mt-1 w-full p-2 border rounded-md"></div>
                    </div></div>
                </div>

                <div id="tab-content-stock" class="tab-content hidden space-y-6">
                    <p class="text-sm text-gray-600">Use esta secção para registar entradas (compras) ou saídas (perdas) manuais. O estoque atual é <strong id="currentStockDisplay" class="text-lg">${p}</strong>.</p>
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
    </div>`;const f=t.querySelector("#productCategory"),x=t.querySelector("#productPhotoInput");t.querySelector("#productPhotoButton").addEventListener("click",()=>x.click()),f.innerHTML='<option value="">Sem categoria</option>'+(m.categories||[]).map(T=>`<option value="${T.id}" ${e?.categoryId===T.id?"selected":""}>${b(T.name)}</option>`).join(""),e&&(f.value=e.categoryId||"");const h=t.querySelector("#productPhotoPreview");t.querySelector("#productPhotoBase64");const E=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",S=e?.photo||"";x.onchange=async()=>{const T=x.files[0];if(T){h.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const M=await ao(T,800,800,"image/jpeg",.8),H=M.length*3/4,O=1e3*1024;if(H>O)throw new Error("A imagem é muito grande mesmo após a compressão.");preview.src=M,base64Input.value=M}catch(M){console.error("Erro ao processar imagem:",M),g("Erro de Imagem",M.message||"Não foi possível processar a imagem.","error"),preview.src=E,base64Input.value=S,j.value=""}}};const k=t.cloneNode(!0);t.parentNode.replaceChild(k,t);const D=()=>{const T=k.querySelector("#modalSupplierSearch"),M=k.querySelector("#supplierSearchResults"),q=k.querySelector("#selectedSuppliersList"),H=T.value.toLowerCase();if(H.length>0){const O=o.filter(R=>R.name.toLowerCase().includes(H)&&!r.has(R.id));O.length>0?(M.classList.remove("hidden"),M.innerHTML=O.map(R=>`
                    <div class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 text-sm flex justify-between items-center" data-add-supplier="${R.id}">
                        <span class="font-medium">${b(R.name)}</span>
                        <span class="text-indigo-600 text-xs">+ Adicionar</span>
                    </div>
                `).join("")):(M.classList.remove("hidden"),M.innerHTML='<div class="p-2 text-xs text-gray-500 text-center">Nenhum resultado disponível.</div>')}else M.classList.add("hidden");r.size>0?(q.innerHTML="",r.forEach(O=>{const R=o.find(U=>U.id===O);R&&(q.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border p-2 rounded shadow-sm" data-id="${R.id}">
                            <div class="text-sm">
                                <p class="font-bold text-gray-800">${b(R.name)}</p>
                                <p class="text-xs text-gray-500">${b(R.contactName||"")} - ${b(R.phone||"")}</p>
                            </div>
                            <button type="button" class="text-red-500 hover:text-red-700 p-1" data-remove-supplier="${R.id}" title="Remover">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    `)})):q.innerHTML='<p class="text-xs text-gray-400 text-center py-2">Nenhum fornecedor selecionado.</p>'};k.querySelector("#modalSupplierSearch").addEventListener("input",D),k.addEventListener("click",T=>{const M=T.target.closest("[data-add-supplier]");if(M){const H=M.dataset.addSupplier;r.add(H),k.querySelector("#modalSupplierSearch").value="",D()}const q=T.target.closest("[data-remove-supplier]");if(q){const H=q.dataset.removeSupplier;r.delete(H),D()}}),D(),k.addEventListener("click",async T=>{const M=T.target.closest("button[data-action]");if(!M)return;const q=M.dataset.action,H=k.querySelector("#productId").value;if(q==="close-modal"&&(k.style.display="none"),q==="delete-product"){if(!H)return;k.style.display="none",await En(H)}if(q==="save-product-modal"){const O=k.querySelector("#productForm");if(O){if(!O.querySelector("#productName").value||!O.querySelector("#productPrice").value){g("Erro","Nome e Preço de Venda são obrigatórios.","error");return}const R=M.closest('button[data-action="save-product-modal"]');R.disabled=!0,R.textContent="A salvar...";try{await In(O)}catch(U){g("Erro",`Falha ao salvar: ${U.message}`,"error"),R.disabled=!1,R.textContent="Salvar Alterações"}}}if(q==="adjust-stock-modal"){T.preventDefault();const O=k.querySelector("#stockAdjustmentAmount"),R=k.querySelector("#stockAdjustmentReason"),U=parseInt(O.value,10),$e=parseInt(M.dataset.change,10);if(!U||U<=0){g("Erro","Por favor, insira uma quantidade válida.","error");return}const Yt=U*$e,Is=R.value||(Yt>0?"Entrada manual":"Saída manual");try{await di(H,{change:Yt,reason:Is});const Ve=m.products.findIndex(Ue=>Ue.id===H);if(Ve>-1){const Ue=m.products[Ve].currentStock+Yt;m.products[Ve].currentStock=Ue,k.querySelector("#currentStockDisplay").textContent=Ue,k.querySelector("#productCurrentStock").value=Ue,O.value="",R.value="",g("Sucesso","Estoque atualizado!","success"),Da(),lt()}}catch(Ve){g("Erro de Stock",Ve.message,"error")}}});const L=k.querySelectorAll(".tab-btn"),A=k.querySelectorAll(".tab-content");L.forEach(T=>{T.addEventListener("click",M=>{M.preventDefault(),L.forEach(q=>{q.classList.remove("border-indigo-500","text-indigo-600"),q.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),T.classList.add("border-indigo-500","text-indigo-600"),T.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),A.forEach(q=>q.classList.add("hidden")),document.getElementById(`tab-content-${T.dataset.tab}`).classList.remove("hidden")})});const j=k.querySelector("#productPhotoInput");k.querySelector("#productPhotoButton").addEventListener("click",()=>j.click()),j.onchange=async()=>{const T=j.files[0];if(!T)return;const M=k.querySelector("#productPhotoPreview"),q=k.querySelector("#productPhotoBase64");M.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const H=await ao(T,800,800,"image/jpeg",.8),R=H.length*3/4,U=1e3*1024;if(R>U)throw new Error("A imagem é muito grande mesmo após a compressão.");M.src=H,q.value=H}catch(H){console.error("Erro ao processar imagem:",H),g("Erro de Imagem",H.message||"Não foi possível processar a imagem.","error"),M.src=E,q.value=S,j.value=""}},k.style.display="flex"}function Ln(){const e=document.getElementById("products-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("productCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(m.categories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${b(a.name)}</option>`)),Da(),lt()}function Cn(){const e=document.getElementById("products-content-container"),t=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const o=a.toISOString().split("T")[0];e.innerHTML=`
        <div class="space-y-6">
             <div class="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 items-end bg-white p-4 rounded-lg shadow-sm">
                <div class="col-span-1"><label for="reportStartDate" class="block text-xs font-medium text-gray-700">De</label><input type="date" id="reportStartDate" value="${o}" class="mt-1 w-full p-2 border rounded-md text-sm"></div>
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
        </div>`;const s=document.getElementById("productFilterReport"),r=document.getElementById("categoryFilterReport");s&&m.products&&(s.innerHTML+=m.products.map(i=>`<option value="${i.id}">${b(i.name)}</option>`).join("")),r&&m.categories&&(r.innerHTML+=m.categories.map(i=>`<option value="${i.id}">${b(i.name)}</option>`).join(""))}async function Tn(){const e=document.getElementById("report-results");e.innerHTML='<div class="loader mx-auto my-8"></div>';const t={startDate:document.getElementById("reportStartDate").value,endDate:document.getElementById("reportEndDate").value,productId:document.getElementById("productFilterReport").value,categoryId:document.getElementById("categoryFilterReport").value,establishmentId:m.establishmentId};try{const a=await ci(t);if(a.length===0){e.innerHTML=`
                <div class="bg-white border rounded-lg shadow-sm p-8">
                    <p class="text-center text-gray-500">Nenhuma movimentação encontrada para este período.</p>
                </div>`;return}const o=`
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
                        ${a.map(r=>`
                            <tr class="hover:bg-gray-50">
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600">${new Date(r.date).toLocaleString("pt-BR")}</td>
                                <td class="px-4 py-3 whitespace-nowrap font-semibold text-gray-800">${b(r.productName)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center font-bold ${r.change>0?"text-green-600":"text-red-600"}">
                                    ${r.change>0?"+":""}${r.change}
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-500">${r.oldStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-800 font-medium">${r.newStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600 truncate max-w-xs" title="${b(r.reason)}">${b(r.reason)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600">${b(r.user)}</td>
                            </tr>`).join("")}
                    </tbody>
                </table>
            </div>`,s=`
            <div class="md:hidden space-y-3 pb-20">
                ${a.map(r=>`
                    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <span class="text-xs text-gray-400 font-medium">${new Date(r.date).toLocaleString("pt-BR")}</span>
                                <h4 class="font-bold text-gray-800 text-base line-clamp-1">${b(r.productName)}</h4>
                            </div>
                            <span class="text-lg font-bold ${r.change>0?"text-green-600":"text-red-600"}">
                                ${r.change>0?"+":""}${r.change}
                            </span>
                        </div>
                        
                        <div class="flex items-center justify-between bg-gray-50 p-2 rounded mb-3 text-sm border border-gray-100">
                            <span class="text-gray-500">Estoque:</span>
                            <div class="flex items-center gap-2 font-mono">
                                <span class="text-gray-400">${r.oldStock}</span>
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                <span class="text-gray-800 font-bold">${r.newStock}</span>
                            </div>
                        </div>

                        <div class="flex justify-between items-center text-xs border-t pt-2 border-dashed border-gray-200">
                            <span class="text-gray-600 truncate max-w-[60%] font-medium" title="${b(r.reason)}">
                                ${b(r.reason)||"Sem motivo"}
                            </span>
                            <span class="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                ${b(r.user)||"Sistema"}
                            </span>
                        </div>
                    </div>
                `).join("")}
            </div>`;e.innerHTML=o+s}catch(a){g("Erro",`Não foi possível gerar o relatório: ${a.message}`,"error"),e.innerHTML=`<div class="bg-white border border-red-200 rounded-lg p-8 text-center text-red-500">${a.message}</div>`}}function Da(){const e={ok:0,near_min:0,at_min:0,empty:0};if(!m.products)return;m.products.forEach(r=>{if(!r)return;const i=r.currentStock,n=r.minStock;i<=0?e.empty++:n>0&&i<=n?e.at_min++:n>0&&i<=n*1.2?e.near_min++:e.ok++});const t=document.getElementById("indicator-ok"),a=document.getElementById("indicator-near-min"),o=document.getElementById("indicator-at-min"),s=document.getElementById("indicator-empty");t&&(t.textContent=e.ok),a&&(a.textContent=e.near_min),o&&(o.textContent=e.at_min),s&&(s.textContent=e.empty)}function lt(){const e=document.getElementById("productsList");if(!e)return;const t=document.getElementById("productSearchInput")?.value.toLowerCase()||"",a=document.getElementById("productCategoryFilter")?.value||"all",o=new Map((m.categories||[]).map(r=>[r.id,r.name]));let s=(m.products||[]).filter(Boolean);ce!=="all"&&(s=s.filter(r=>{const i=r.currentStock,n=r.minStock;switch(ce){case"ok":return i>0&&(n===0||i>n*1.2);case"near_min":return n>0&&i>n&&i<=n*1.2;case"at_min":return n>0&&i>0&&i<=n;case"empty":return i<=0;default:return!0}})),s=s.filter(r=>{const i=r.name.toLowerCase().includes(t),n=a==="all"||r.categoryId===a;return i&&n}),e.innerHTML="",s.length>0?(e.className="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 sm:space-y-0",s.forEach(r=>{const i=document.createElement("div"),n=JSON.stringify(r).replace(/'/g,"&apos;");i.className=`product-card bg-white rounded-lg shadow-md flex items-center gap-3 p-3 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 
                              sm:flex-col sm:p-0 sm:items-stretch sm:gap-0`,i.dataset.action="edit-product",i.dataset.product=n;const l=r.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(r.name.charAt(0))}`,d=o.get(r.categoryId)||"N/A";let c="",u="text-gray-500";const p=r.currentStock,v=r.minStock;p<=0?(c='<span class="text-xs font-semibold text-red-600">Esgotado</span>',u="text-red-600 font-semibold"):v>0&&p<=v?(c='<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>',u="text-orange-600 font-semibold"):v>0&&p<=v*1.2?(c='<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>',u="text-blue-600 font-semibold"):(c='<span class="text-xs font-semibold text-green-600">Em Estoque</span>',u="text-green-600 font-semibold"),i.innerHTML=`
                <img src="${l}" alt="Imagem de ${b(r.name)}" class="w-16 h-16 rounded-md object-cover flex-shrink-0 sm:w-full sm:h-24 sm:rounded-b-none">
                
                <div class="flex-1 sm:p-3 sm:flex sm:flex-col sm:flex-grow">
                    <div class="sm:flex-grow">
                        <div class="flex justify-between items-start mb-1 gap-2">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${b(r.name)}</h3>
                            <div class="hidden sm:block">${c}</div>
                        </div>
                        
                        <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${r.price.toFixed(2)}</p>
                        
                        <p class="text-xs text-gray-500 text-left mb-2 hidden sm:block">Categoria: ${b(d)}</p>
                    </div>

                    <div class="flex justify-between items-center mt-2 sm:mt-0">
                        <p class="text-lg font-bold text-indigo-600 text-left sm:hidden">R$ ${r.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-right sm:text-left">
                            Estoque: <span class="font-bold text-base ${u}">${r.currentStock}</span>
                        </p>
                    </div>
                </div>`,e.appendChild(i)})):(e.className="",e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>')}async function mt(){const e=document.getElementById("products-content-container");e&&(e.innerHTML='<div class="loader col-span-full mx-auto my-8"></div>');try{const[t,a,o]=await Promise.all([Ut(m.establishmentId),Jt(m.establishmentId,"products"),Ca(m.establishmentId)]);m.products=(t||[]).filter(Boolean),m.categories=(a||[]).filter(Boolean),m.suppliers=(o||[]).filter(Boolean),ls(tt)}catch(t){e&&(e.innerHTML=`<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados: ${t.message}</p>`)}}function ls(e){if(document.getElementById("products-content-container")){if(tt===e&&document.getElementById("products-content-container").children.length>1){tt==="products"&&(Da(),lt());return}tt=e,ce="all",document.querySelectorAll("#products-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="products"?Ln():e==="movements"&&Cn()}}async function Dn(){fe.innerHTML=`
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
        </section>`,ge&&(fe.removeEventListener("click",ge),fe.removeEventListener("input",ge),fe.removeEventListener("change",ge)),ge=async e=>{const t=e.target;if(t.id==="productSearchInput"||t.id==="productCategoryFilter"){lt();return}const a=e.target.closest("button[data-action], button[data-view], .indicator-card[data-action], .product-card[data-action]");if(!a||e.target.closest('[data-action-stop-propagation="true"]'))return;if(a.hasAttribute("data-view")){ls(a.dataset.view);return}switch(a.dataset.action){case"new-product":oo();break;case"edit-product":oo(JSON.parse(a.dataset.product));break;case"manage-product-categories":$n();break;case"generate-report":await Tn();break;case"filter-stock":const s=a.dataset.filterType;ce=ce===s?"all":s,document.querySelectorAll(".indicator-card").forEach(r=>{r.classList.toggle("ring-2",r.dataset.filterType===ce),r.classList.toggle("ring-indigo-500",r.dataset.filterType===ce),r.classList.toggle("shadow-lg",r.dataset.filterType===ce)}),lt();break}},fe.addEventListener("click",ge),fe.addEventListener("input",ge),fe.addEventListener("change",ge),tt="products",ce="all",await mt()}const $t=document.getElementById("content");let F={partners:[],establishments:[],searchQuery:"",categoryFilter:"all",stateFilter:"all",cityFilter:"",sortBy:"name_asc",hasSearched:!1,viewMode:"list",editingItem:null},bt=null;const Tt={contas_fixas:{label:"Contas Fixas (Água, Luz)",color:"blue",icon:"bi-lightning-charge"},estoque:{label:"Fornecedor de Produtos",color:"emerald",icon:"bi-box-seam"},servicos:{label:"Prestador de Serviço",color:"purple",icon:"bi-tools"},impostos:{label:"Governo / Impostos",color:"red",icon:"bi-bank"},outros:{label:"Outros Parceiros",color:"gray",icon:"bi-person-vcard"}},ds=["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];async function Pn(){try{const t=(await Oe()).matrizes||[];F.establishments=[],t.forEach(a=>{F.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(o=>F.establishments.push({id:o.id,name:o.name,type:"Filial"}))})}catch(e){console.warn("Erro ao buscar lojas",e)}F.viewMode="list",F.editingItem=null,F.hasSearched=!1,F.partners=[],Bn(),jn(),cs()}function Bn(){$t.innerHTML=`
        <div class="flex flex-col h-auto bg-gray-50 w-full relative font-sans min-h-[calc(100vh-80px)] overflow-x-hidden">
            
            <div id="suppliers-list-view" class="w-full transition-all duration-300 ${F.viewMode==="list"?"block":"hidden"}">
                ${Mn()}
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
    `}function Mn(){const e=Object.entries(Tt).map(([a,o])=>`<option value="${a}">${o.label}</option>`).join(""),t=ds.map(a=>`<option value="${a}">${a}</option>`).join("");return`
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
    `}function An(e=null){const t=!!e,a=t?"Ficha do Parceiro":"Novo Parceiro de Negócio";let o=e?.category||"";o==="Produtos"&&(o="estoque"),o==="Serviços"&&(o="servicos");const s=Object.entries(Tt).map(([n,l])=>`<option value="${n}" ${o===n?"selected":""}>${l.label}</option>`).join(""),r=ds.map(n=>`<option value="${n}" ${e?.state===n?"selected":""}>${n}</option>`).join(""),i=document.getElementById("form-container-wrapper");i&&(i.innerHTML=`
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
                                    <input type="text" id="supName" required class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none font-bold text-gray-800 text-lg transition-all shadow-inner" value="${b(e?.name||"")}" placeholder="Ex: CPFL Energia, Coca-Cola...">
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
                                    <input type="text" id="supTaxId" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${b(e?.document||e?.taxId||"")}" placeholder="00.000.000/0001-00">
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
                                        ${r}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Cidade</label>
                                    <input type="text" id="supCity" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${b(e?.city||"")}" placeholder="Ex: São Paulo">
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
                                        <input type="text" id="supContact" class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${b(e?.contactName||"")}" placeholder="Ex: João Silva (Comercial)">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">E-mail Comercial</label>
                                    <div class="relative">
                                        <i class="bi bi-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input type="email" id="supEmail" class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${b(e?.email||"")}" placeholder="contato@empresa.com">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Telefone / WhatsApp</label>
                                    <div class="relative">
                                        <i class="bi bi-telephone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input type="tel" id="supPhone" class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${b(e?.phone||"")}" placeholder="(00) 0000-0000">
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
    `,document.getElementById("partner-form").addEventListener("submit",Rn))}function cs(){const e=document.getElementById("partners-grid");e&&(e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl w-full max-w-3xl mx-auto shadow-sm">
                <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 border border-indigo-100 shadow-inner">
                    <i class="bi bi-search text-2xl text-indigo-400"></i>
                </div>
                <h3 class="text-xl font-black text-gray-800 mb-2">Pronto para pesquisar</h3>
                <p class="text-sm text-gray-500 font-medium max-w-md text-center">Utilize os filtros acima e clique em "Buscar" para listar os parceiros registados no sistema.</p>
            </div>
        `)}async function qn(){const e=document.getElementById("partners-grid");if(!F.hasSearched){cs();return}e.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="text-sm text-gray-500 mt-4 font-medium">Buscando parceiros...</p></div>';try{const t=await Ca(m.establishmentId);F.partners=t||[],us()}catch(t){e.innerHTML=`<div class="text-center py-10 text-red-500 font-bold">Erro ao carregar parceiros: ${t.message}</div>`}}function us(){const e=document.getElementById("partners-grid");if(!e)return;let t=F.partners;if(F.searchQuery){const s=F.searchQuery.toLowerCase();t=t.filter(r=>r.name.toLowerCase().includes(s)||r.document&&r.document.includes(s)||r.taxId&&r.taxId.includes(s)||r.email&&r.email.toLowerCase().includes(s)||r.contactName&&r.contactName.toLowerCase().includes(s))}if(F.categoryFilter!=="all"&&(t=t.filter(s=>s.category===F.categoryFilter)),F.stateFilter!=="all"&&(t=t.filter(s=>s.state===F.stateFilter)),F.cityFilter){const s=F.cityFilter.toLowerCase();t=t.filter(r=>r.city&&r.city.toLowerCase().includes(s))}if(t.sort((s,r)=>{let i="",n="";return F.sortBy==="name_asc"||F.sortBy==="name_desc"?(i=(s.name||"").toLowerCase(),n=(r.name||"").toLowerCase()):F.sortBy==="contact_asc"&&(i=(s.contactName||"").toLowerCase(),n=(r.contactName||"").toLowerCase()),F.sortBy==="name_desc"?n.localeCompare(i):i.localeCompare(n)}),t.length===0){e.innerHTML=`
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
    `,o='<div class="flex flex-col gap-4 md:hidden">';t.forEach(s=>{let r=s.category;r==="Produtos"&&(r="estoque"),r==="Serviços"&&(r="servicos");const i=Tt[r]||Tt.outros,n=s.document||s.taxId?s.document||s.taxId:"-",l=JSON.stringify(s).replace(/'/g,"&apos;"),d=[s.city,s.state].filter(Boolean).join(" - ");a+=`
            <tr class="hover:bg-indigo-50/50 cursor-pointer transition-colors group" data-action="open-form" data-item='${l}'>
                <td class="p-4 pl-6 text-center">
                    <div class="w-10 h-10 mx-auto rounded-xl bg-${i.color}-100 text-${i.color}-600 flex items-center justify-center text-lg shadow-sm" title="${i.label}">
                        <i class="bi ${i.icon}"></i>
                    </div>
                </td>
                <td class="p-4">
                    <p class="font-bold text-gray-900 text-sm group-hover:text-indigo-700 transition-colors">${b(s.name)}</p>
                    ${s.email?`<p class="text-xs text-gray-500 mt-0.5"><i class="bi bi-envelope mr-1 opacity-50"></i>${b(s.email)}</p>`:""}
                </td>
                <td class="p-4 text-sm font-medium text-gray-600">${b(n)}</td>
                <td class="p-4">
                    <div class="text-sm font-medium text-gray-800">${b(s.contactName||"-")}</div>
                    ${d?`<div class="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1"><i class="bi bi-geo-alt mr-1"></i>${b(d)}</div>`:""}
                </td>
                <td class="p-4 pr-6 text-right">
                    <button class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-100 transition-colors shadow-sm bg-white border border-gray-200 group-hover:border-indigo-200">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                </td>
            </tr>
        `,o+=`
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden" data-action="open-form" data-item='${l}'>
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-${i.color}-500"></div>
                <div class="flex gap-4">
                    <div class="w-12 h-12 rounded-xl bg-${i.color}-100 text-${i.color}-600 flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                        <i class="bi ${i.icon}"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">${i.label.split(" ")[0]}</p>
                        <h3 class="font-black text-gray-900 text-base leading-tight truncate">${b(s.name)}</h3>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-lg p-3 border border-gray-100 mt-1 flex flex-col gap-1.5">
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-gray-500 font-medium">Documento:</span>
                        <span class="font-bold text-gray-700">${b(n)}</span>
                    </div>
                    ${d?`
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-gray-500 font-medium">Local:</span>
                        <span class="font-bold text-gray-700">${b(d)}</span>
                    </div>`:""}
                </div>
            </div>
        `}),a+="</tbody></table></div>",o+="</div>",e.innerHTML=a+o}function at(e,t=null){const a=document.getElementById("suppliers-list-view"),o=document.getElementById("suppliers-form-view");F.viewMode=e,F.editingItem=t,e==="list"?(a.classList.remove("hidden"),o.classList.add("hidden"),o.innerHTML='<div id="form-container-wrapper" class="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24"></div>',F.hasSearched&&us(),window.scrollTo({top:0,behavior:"smooth"})):(a.classList.add("hidden"),o.classList.remove("hidden"),An(t),window.scrollTo({top:0,behavior:"smooth"}))}async function Rn(e){e.preventDefault();const t=e.target,a=t.querySelector("#supId").value,o={name:t.querySelector("#supName").value,contactName:t.querySelector("#supContact").value,email:t.querySelector("#supEmail").value,phone:t.querySelector("#supPhone").value,document:t.querySelector("#supTaxId").value,category:t.querySelector("#supCategory").value,state:t.querySelector("#supState").value,city:t.querySelector("#supCity").value,establishmentId:m.establishmentId,notes:t.querySelector("#supNotes")?.value||"",accessibleIn:[m.establishmentId]},s=t.querySelector('button[type="submit"]'),r=s.innerHTML;s.disabled=!0,s.innerHTML='<div class="loader-small border-white"></div> A gravar...';try{a?(await yn(a,o),g("Sucesso","Ficha atualizada!","success")):(await hn(o),g("Sucesso","Parceiro registado!","success")),F.hasSearched&&(F.partners=await Ca(m.establishmentId)||[]),at("list")}catch(i){g("Erro","Falha ao gravar: "+i.message,"error"),s.disabled=!1,s.innerHTML=r}}async function Nn(e){if(await V("Excluir Parceiro","Deseja realmente apagar esta ficha permanentemente? Os lançamentos financeiros antigos não serão apagados."))try{await wn(e),g("Sucesso","Entidade excluída.","success"),F.partners=F.partners.filter(a=>a.id!==e),at("list")}catch(a){g("Erro","Erro ao excluir: "+a.message,"error")}}function jn(){bt&&$t.removeEventListener("click",bt),bt=async e=>{const t=e.target;if(t.closest('button[data-action="new-partner"]')){at("form",null);return}if(t.closest("#btn-search-partners")){F.searchQuery=document.getElementById("filterSearch").value,F.categoryFilter=document.getElementById("filterCategory").value,F.stateFilter=document.getElementById("filterState").value,F.cityFilter=document.getElementById("filterCity").value,F.sortBy=document.getElementById("filterSortBy").value,F.hasSearched=!0,qn();return}if(t.closest('button[data-action="back-to-list"]')){at("list");return}const a=t.closest('button[data-action="delete-partner"]');if(a){e.preventDefault(),Nn(a.dataset.id);return}const o=t.closest('[data-action="open-form"]');if(o&&!t.closest("button")){const s=JSON.parse(o.dataset.item.replace(/&apos;/g,"'"));at("form",s)}},$t.addEventListener("click",bt),$t.addEventListener("keypress",e=>{e.key==="Enter"&&(e.target.id==="filterSearch"||e.target.id==="filterCity")&&document.getElementById("btn-search-partners").click()})}const Zt=document.getElementById("content"),so={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let ie=new Set,ft=null,De=null,Et=[];function It(){const e=oe.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}function Fn(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function Hn(e){return e.length===0?'<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>':e.map(t=>{const a=t.status==="inactive",o=b(t.name),s=b(t.specialty||"Especialidade"),r=t.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,i=JSON.stringify(t).replace(/'/g,"&apos;"),n=t.accessibleIn?t.accessibleIn.length:1,l=n>1?`<span class="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded ml-2 border border-indigo-200" title="Atende em ${n} unidades"><i class="bi bi-diagram-3"></i> ${n} Lojas</span>`:"";return`
            <div class="professional-card bg-white rounded-lg shadow-md flex items-center gap-4 p-3 cursor-pointer transition-transform transform hover:shadow-lg hover:bg-gray-50
                        sm:flex-col sm:items-stretch sm:p-0 sm:gap-0 ${a?"opacity-50 bg-gray-100":""}" 
                 data-action="open-professional-modal" data-professional='${i}'>
                
                <img src="${r}" alt="Foto de ${o}" class="w-16 h-16 rounded-full object-cover flex-shrink-0
                            sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg">
                
                <div class="flex-1 sm:p-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-sm font-bold text-gray-900 text-left sm:text-base flex items-center">
                                ${o} ${l}
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
            </div>`}).join("")}function Kt(){const e=document.getElementById("genericModal");e.style.display="none",De&&e.removeEventListener("click",De)}async function On(e){const t=document.getElementById("genericModal"),a=e.id?e:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},o=b(a.name),s=m.services||await Se(m.establishmentId),r=m.professionals||await re(m.establishmentId),i=`
        <div class="modal-content max-w-5xl p-0 overflow-y-auto max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b bg-white sticky top-0 z-10">
                <h2 class="text-2xl font-bold text-gray-800">${o}</h2>
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
        </div>`;t.innerHTML=i,t.style.display="flex",Vn(a,s),Un(a),_n(a,r),Jn(a)}function zn(e=[]){if(!Et||Et.length===0)return`
            <input type="hidden" name="accessibleIn" value="${m.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                <i class="bi bi-info-circle mr-1"></i> Profissional exclusivo desta unidade.
            </div>`;let t='<div class="space-y-1 mt-2 max-h-48 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30">';return Et.forEach(a=>{const o=e.includes(a.id)||e.length===0&&a.id===m.establishmentId;t+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${b(a.name)} (Matriz)</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(s=>{const r=e.includes(s.id)||e.length===0&&s.id===m.establishmentId;t+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${s.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${r?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${b(s.name)}</span>
                    </label>
                `})}),t+="</div>",t}function Vn(e,t){const a=document.getElementById("professionalForm"),o=e.dob?e.dob.split("/"):["",""],s=Array.from({length:12},(h,E)=>{const S=E+1,k=S==o[1]?"selected":"",D=new Date(0,E).toLocaleString("pt-BR",{month:"long"});return`<option value="${S}" ${k}>${D.charAt(0).toUpperCase()+D.slice(1)}</option>`}).join(""),r=e.status||"active",i=b(e.name||""),n=b(e.specialty||""),l=b(e.phone||""),d=b(e.notes||"");a.innerHTML=`
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
                        <option value="active" ${r!=="inactive"?"selected":""}>Ativo</option>
                        <option value="inactive" ${r==="inactive"?"selected":""}>Inativo</option>
                    </select>
                </div>
            </div>

            <div class="md:col-span-2 space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="form-group"><label for="profName" class="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label><input type="text" id="profName" value="${i}" required class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profSpecialty" class="block text-sm font-medium text-gray-700 mb-1">Especialidade / Cargo</label><input type="text" id="profSpecialty" value="${n}" required class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profPhone" class="block text-sm font-medium text-gray-700 mb-1">WhatsApp / Telefone</label><input type="tel" id="profPhone" value="${l}" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profOrderOnAgenda" class="block text-sm font-medium text-gray-700 mb-1">Ordem de exibição na agenda</label><input type="number" id="profOrderOnAgenda" value="${e.orderOnAgenda||"1"}" min="1" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profDobDay" class="block text-sm font-medium text-gray-700 mb-1">Aniversário (Dia)</label><input type="number" id="profDobDay" value="${o[0]}" min="1" max="31" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
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
            ${zn(e.accessibleIn||[])}
        </div>

        <div class="pt-6 border-t border-gray-100">
            <label class="block text-base font-bold text-gray-800 mb-3">Serviços que realiza</label>
            <div id="profServicesContainer" class="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50 max-h-64 overflow-y-auto">
                ${t.map(h=>`
                    <label class="flex items-center space-x-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm">
                        <input type="checkbox" value="${h.id}" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" ${e.services?.includes(h.id)?"checked":""}>
                        <span class="text-sm font-medium text-gray-700">${b(h.name)}</span>
                    </label>
                `).join("")}
            </div>
        </div>

        <div class="form-group pt-4">
            <label for="profNotes" class="block text-sm font-medium text-gray-700 mb-1">Observações Internas</label>
            <textarea id="profNotes" rows="3" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">${d}</textarea>
        </div>`;const c=document.getElementById("profPhotoInput"),u=document.getElementById("profPhotoButton"),p=document.getElementById("profPhotoPreview"),v=document.getElementById("profPhotoBase64"),f=e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,x=e.photo||"";u&&u.addEventListener("click",()=>c.click()),c&&(c.onchange=async()=>{const h=c.files[0];if(h){p.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const E=await Ho(h,800,800,.8),k=E.length*3/4,D=1e3*1024;if(k>D)throw new Error("A imagem é muito grande mesmo após a compressão.");p.src=E,v.value=E}catch(E){g("Erro de Imagem",E.message||"Não foi possível processar a imagem.","error"),p.src=f,v.value=x,c.value=""}}})}function Un(e){const t=document.getElementById("jornada");t.innerHTML=`
        <div class="max-w-4xl mx-auto">
            <h3 class="text-xl font-bold text-gray-800 mb-2">Jornada de Trabalho Semanal</h3>
            <p class="text-sm text-gray-500 mb-6">Defina os dias e os horários em que este profissional atende.</p>
            <div id="profScheduleContainer" class="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
        </div>`,Wn(t.querySelector("#profScheduleContainer"),e.workingHours||{})}async function _n(e,t){const a=document.getElementById("bloqueios");a.innerHTML=`
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div>
                <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><i class="bi bi-calendar-x text-orange-500"></i> Lançar Bloqueio / Férias</h3>
                <form id="batchBlockageForm" class="p-5 bg-orange-50/50 border border-orange-100 rounded-xl space-y-4">
                    <div>
                        <h4 class="font-bold text-gray-700 mb-2 text-sm">Aplicar aos Profissionais:</h4>
                        <div id="batchProfSelectionContainer" class="max-h-40 overflow-y-auto p-3 border border-orange-200 rounded-lg bg-white space-y-2 shadow-sm">
                            ${t.map(r=>`
                                <label class="flex items-center space-x-3 hover:bg-orange-50 p-1 rounded cursor-pointer transition-colors">
                                    <input type="checkbox" name="batch-professionals" value="${r.id}" class="rounded border-gray-300 text-orange-500 focus:ring-orange-500" ${r.id===e.id?"checked":""}>
                                    <span class="text-sm font-medium text-gray-700">${b(r.name)}</span>
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
                    <h3 class="text-xl font-bold text-gray-800">Registos de ${b(e.name.split(" ")[0])}</h3>
                    <select id="prof-blockages-filter" class="p-2 border border-gray-300 rounded-lg text-sm bg-white font-medium outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="future">Apenas Futuros</option>
                        <option value="history">Histórico Passado</option>
                    </select>
                </div>
                <div id="blockagesList" class="space-y-3 max-h-[500px] overflow-y-auto pr-2"></div>
            </div>
        </div>`;const o=document.getElementById("batchBlockageForm");o&&o.addEventListener("submit",async r=>{r.preventDefault();const i=o.querySelector('button[type="submit"]'),n=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm"></span> A gravar...';const l=Array.from(r.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(x=>x.value);if(l.length===0)return i.disabled=!1,i.innerHTML=n,g("Atenção","Selecione pelo menos um profissional.","error");const d=r.target.batchBlockageStartDate.value,c=r.target.batchBlockageEndDate.value||d,u=r.target.batchBlockageStartTime.value,p=r.target.batchBlockageEndTime.value,v=r.target.batchBlockageReason.value;if(!d||!u||!p)return i.disabled=!1,i.innerHTML=n,g("Atenção","Preencha Data de Início, Hora de Início e Fim.","error");const f=l.map(x=>{const h={professionalId:x,establishmentId:m.establishmentId,startTime:new Date(`${d}T${u}`).toISOString(),endTime:new Date(`${c}T${p}`).toISOString(),reason:v};return zt(h)});try{await Promise.all(f),g("Sucesso!",`${l.length} bloqueios foram criados.`),o.reset(),r.target.querySelectorAll('input[name="batch-professionals"]').forEach(h=>{h.checked=h.value===e.id});const x=document.getElementById("prof-blockages-filter").value;ot(e.id,x)}catch(x){g("Erro",x.message,"error")}finally{i.disabled=!1,i.innerHTML=n}}),document.getElementById("prof-blockages-filter").addEventListener("change",r=>ot(e.id,r.target.value)),await ot(e.id,"future")}function Wn(e,t){e.innerHTML=Object.keys(so).map(a=>{const o=t[a]||{},s=o.active!==!1;return`
            <div class="day-schedule-card p-4 rounded-xl ${s?"bg-white border-gray-200 shadow-sm":"bg-gray-50 border-gray-100 disabled opacity-60"} border transition-all">
                 <div class="flex justify-between items-center mb-3">
                    <span class="font-bold text-gray-800">${so[a]}</span>
                    <label class="flex items-center cursor-pointer">
                        <div class="relative">
                            <input type="checkbox" data-day="${a}" data-field="active" class="sr-only" ${s?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </div>
                    </label>
                 </div>
                <div class="time-inputs grid grid-cols-2 gap-3 mt-2 text-sm">
                    <div><label class="text-xs text-gray-500 font-medium">Abertura:</label><input type="time" data-day="${a}" data-field="start" value="${o.start||"09:00"}" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${s?"":"disabled"}></div>
                    <div><label class="text-xs text-gray-500 font-medium">Fecho:</label><input type="time" data-day="${a}" data-field="end" value="${o.end||"18:00"}" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${s?"":"disabled"}></div>
                    <div><label class="text-xs text-gray-500 font-medium">Início Pausa:</label><input type="time" data-day="${a}" data-field="breakStart" value="${o.breakStart||"12:00"}" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${s?"":"disabled"}></div>
                    <div><label class="text-xs text-gray-500 font-medium">Fim Pausa:</label><input type="time" data-day="${a}" data-field="breakEnd" value="${o.breakEnd||"13:00"}" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${s?"":"disabled"}></div>
                </div>
            </div>`}).join(""),e.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",o=>{const s=o.target.closest(".day-schedule-card"),r=!o.target.checked;s.classList.toggle("bg-white",!r),s.classList.toggle("shadow-sm",!r),s.classList.toggle("border-gray-200",!r),s.classList.toggle("bg-gray-50",r),s.classList.toggle("border-gray-100",r),s.classList.toggle("opacity-60",r),s.classList.toggle("disabled",r),s.querySelectorAll(".time-inputs input").forEach(i=>i.disabled=r)})})}async function ot(e,t="future"){const a=document.getElementById("blockagesList");if(a){a.innerHTML='<div class="loader mx-auto mt-6"></div>';try{const o=new Date;let s,r;t==="history"?(r=new Date,s=new Date,s.setFullYear(s.getFullYear()-2)):(s=new Date,r=new Date,r.setFullYear(r.getFullYear()+2));let n=(await Ot(m.establishmentId,s.toISOString(),r.toISOString(),e)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));t==="history"?n=n.filter(d=>d.endTime<o).sort((d,c)=>c.startTime-d.startTime):n=n.filter(d=>d.endTime>=o).sort((d,c)=>d.startTime-c.startTime);const l=n.reduce((d,c)=>{const u=c.reason||"Sem motivo detalhado";return d[u]||(d[u]=[]),d[u].push(c),d},{});if(Object.keys(l).length===0){a.innerHTML=`
                <div class="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <i class="bi bi-calendar-check text-3xl text-gray-300 mb-2 block"></i>
                    <p class="text-gray-500 font-medium">Nenhum bloqueio ${t==="history"?"no histórico":"agendado para o futuro"}.</p>
                </div>`;return}a.innerHTML=Object.entries(l).map(([d,c])=>`
            <div class="bg-white border border-gray-200 rounded-xl shadow-sm mb-4 overflow-hidden">
                <div class="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                    <h4 class="font-bold text-gray-800 flex items-center gap-2"><i class="bi bi-tag text-orange-500"></i> ${b(d)}</h4>
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
        `).join("")}catch(o){a.innerHTML=`<p class="text-red-500 p-4">${o.message}</p>`}}}function Jn(e){const t=document.getElementById("genericModal");De&&t.removeEventListener("click",De),De=async a=>{const o=a.target.closest("button[data-action]");if(!o){const r=a.target.closest(".tab-link");r&&(t.querySelectorAll(".tab-link").forEach(i=>{i.classList.remove("active","border-indigo-600","text-indigo-600"),i.classList.add("border-transparent","text-gray-500")}),r.classList.add("active","border-indigo-600","text-indigo-600"),r.classList.remove("border-transparent","text-gray-500"),t.querySelectorAll(".tab-content").forEach(i=>i.classList.add("hidden")),document.getElementById(r.dataset.tab).classList.remove("hidden"));return}const s=o.dataset.action;switch(a.stopPropagation(),s){case"close-modal":Kt();break;case"delete-professional":const r=o.dataset.id;if(await V("Excluir Profissional",`Tem certeza que deseja excluir ${e.name}? Esta ação não pode ser desfeita e ele será removido da agenda e de todas as lojas.`))try{await Ao(r),de(m.establishmentId,It(),"Equipe","Excluiu",`Excluiu profissional: ${e.name}`),g("Sucesso!","Profissional excluído da rede.","success"),Kt(),Dt()}catch(S){g("Erro",`Não foi possível excluir: ${S.message}`,"error")}break;case"save-professional":const n=document.getElementById("professionalForm"),l=o,d=document.getElementById("profScheduleContainer"),c=Array.from(n.querySelectorAll("#profServicesContainer input:checked")).map(S=>S.value),u={};d&&d.querySelectorAll(".day-schedule-card").forEach(S=>{const k=S.querySelector('[data-field="active"]').dataset.day;u[k]={active:S.querySelector('[data-field="active"]').checked,start:S.querySelector('[data-field="start"]').value,end:S.querySelector('[data-field="end"]').value,breakStart:S.querySelector('[data-field="breakStart"]').value,breakEnd:S.querySelector('[data-field="breakEnd"]').value}});const p=Array.from(n.querySelectorAll('input[name="accessibleIn"]:checked')).map(S=>S.value),v=p.length>0?p:[m.establishmentId],f={...e,id:n.querySelector("#professionalId").value||void 0,accessibleIn:v,name:n.querySelector("#profName").value.trim(),specialty:n.querySelector("#profSpecialty").value,photo:n.querySelector("#profPhotoBase64").value,services:c,workingHours:u,phone:n.querySelector("#profPhone").value,dob:`${n.querySelector("#profDobDay").value}/${n.querySelector("#profDobMonth").value}`,receivesCommission:n.querySelector("#profCommission").value==="sim",showOnAgenda:n.querySelector("#profShowOnAgenda").value==="sim",orderOnAgenda:parseInt(n.querySelector("#profOrderOnAgenda").value)||1,notes:n.querySelector("#profNotes").value,status:n.querySelector("#profStatus").value,establishmentId:m.establishmentId},x=l.innerHTML;l.disabled=!0,l.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{f.id?(await Nr(f.id,f),de(m.establishmentId,It(),"Equipe","Editou",`Editou o profissional: ${f.name}`),g("Sucesso!","Dados atualizados.","success")):(delete f.id,await Rr(f),de(m.establishmentId,It(),"Equipe","Criou",`Cadastrou o profissional: ${f.name}`),g("Sucesso!","Novo membro adicionado à equipe.","success")),Kt(),Dt()}catch(S){g("Erro",S.message,"error"),l.disabled=!1,l.innerHTML=x}break;case"delete-blockage":const h=o.dataset.id;if(await V("Apagar Bloqueio","O profissional voltará a ficar disponível na agenda neste dia. Confirma?"))try{await va(h),g("Bloqueio removido.","success");const S=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";ot(e.id,S)}catch(S){g("Erro",S.message,"error")}break;case"batch-delete-blockage":const E=JSON.parse(o.dataset.ids);if(await V("Apagar em Lote",`Tem certeza que deseja apagar ${E.length} dias de bloqueio de uma vez?`))try{await qo(E),g("Bloqueios removidos.","success");const S=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";ot(e.id,S)}catch(S){g("Erro",S.message,"error")}break}},t.addEventListener("click",De)}function ua(){const e=document.getElementById("batch-actions-container"),t=document.getElementById("selected-count");!e||!t||(ie.size>0?(t.textContent=`${ie.size} selecionado(s)`,e.classList.remove("hidden"),e.classList.add("flex")):(e.classList.add("hidden"),e.classList.remove("flex")))}function Gn(){V("Excluir em Lote",`Tem certeza que deseja excluir ${ie.size} profissionais da rede? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{await jr(Array.from(ie)),de(m.establishmentId,It(),"Equipe","Excluiu em Lote",`Excluiu ${ie.size} profissionais`),g("Sucesso!",`${ie.size} profissionais foram excluídos.`,"success"),ie.clear(),ua(),Dt()}catch(t){g("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}function _e(){const e=document.getElementById("professionalsList");if(!e)return;if(!m.professionals){e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Fn();return}const t=document.getElementById("showInactiveProfToggle").checked,a=document.getElementById("profSearchInput").value.toLowerCase(),o=m.professionals.filter(s=>{const r=s.name.toLowerCase().includes(a),i=t||s.status!=="inactive";return r&&i});e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Hn(o)}async function Dt(){ie.clear(),Zt.innerHTML=`
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
        </section>`,ft&&Zt.removeEventListener("click",ft),ft=t=>{const a=t.target.closest('[data-action="open-professional-modal"]'),o=t.target.closest('[data-action="batch-delete"]');if(a){t.preventDefault();let r={};if(a.dataset.professional)try{r=JSON.parse(a.dataset.professional)}catch(i){console.error("Erro ao fazer parse do professional data:",i);return}On(r);return}if(o){Gn();return}const s=t.target.closest(".professional-checkbox");if(s){const r=s.dataset.id;s.checked?ie.add(r):ie.delete(r),_e(),ua();return}},Zt.addEventListener("click",ft),document.getElementById("profSearchInput").addEventListener("input",_e),document.getElementById("showInactiveProfToggle").addEventListener("change",_e);const e=document.getElementById("professionalsList");m.professionals=null,m.services=null,_e();try{const[t,a,o]=await Promise.all([re(m.establishmentId),Se(m.establishmentId),Oe()]);m.professionals=t,m.services=a,Et=o?.matrizes||[],_e(),ua()}catch{e.innerHTML='<p class="text-red-500 col-span-full font-bold text-center py-10 bg-red-50 rounded-lg border border-red-100">Erro ao carregar dados do servidor.</p>'}}let w={clients:[],selectedClient:null,activeTab:"profile",filters:{search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},showFilters:!1,loading:!1,historyLimit:20,historySearchTerm:"",historyLoading:!1,historyData:{appointments:[],sales:[],loyaltyLog:[]},modalOpen:!1},ms=null;const Qn=e=>e?String(e).replace(/\D/g,""):"",Yn=e=>{if(!e)return"Nunca";let t;if(typeof e=="object"&&(e.seconds||e._seconds)){const a=e.seconds||e._seconds;t=new Date(a*1e3)}else t=new Date(e);return isNaN(t.getTime())?"Data Inválida":t.toLocaleDateString("pt-BR")};function Pa(){ms.innerHTML=`
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
                ${w.loading?'<div class="flex justify-center pt-20"><div class="loader"></div></div>':""}
            </div>
        </section>
    `;const e=document.getElementById("btn-new-client");e&&(e.onclick=rl)}function dt(){if(w.modalOpen)return;Pa();const e=document.getElementById("clients-content-area"),t=w.filters.inactiveDays||w.filters.birthMonth||w.filters.hasLoyalty||w.filters.hasDebt,a=`
        <div class="sticky top-0 bg-gray-50 z-20 px-3 sm:px-4 pt-4 pb-2 w-full">
            <div class="flex gap-2 items-center">
                <div class="relative flex-grow shadow-sm">
                    <input type="text" id="client-search" 
                        class="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition bg-white" 
                        placeholder="Buscar cliente..." 
                        value="${w.filters.search}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                
                <button id="btn-toggle-filters" class="flex-shrink-0 p-3 rounded-xl border transition flex items-center gap-2 font-medium ${w.showFilters||t?"bg-indigo-50 border-indigo-200 text-indigo-700":"bg-white border-gray-300 text-gray-600 hover:bg-gray-50"}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                    <span class="hidden sm:inline">Filtros</span>
                    ${t?'<span class="flex h-2 w-2 rounded-full bg-indigo-600"></span>':""}
                </button>
            </div>

            <div id="filter-panel" class="${w.showFilters?"max-h-96 opacity-100 mt-3":"max-h-0 opacity-0 overflow-hidden"} transition-all duration-300 ease-in-out">
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase">Dias Ausente (Min)</label>
                        <div class="relative">
                            <input type="number" id="filter-inactive" min="1"
                                class="w-full p-2.5 pl-9 rounded-lg border border-gray-300 focus:ring-indigo-500 text-sm bg-gray-50 outline-none" 
                                placeholder="Ex: 30 dias" 
                                value="${w.filters.inactiveDays}">
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
                            <input type="checkbox" id="filter-loyalty" class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" ${w.filters.hasLoyalty?"checked":""}>
                            <span class="ml-2 text-sm text-gray-700 font-medium">Com Pontos Fidelidade</span>
                        </label>
                        <label class="flex items-center cursor-pointer hover:bg-red-50 p-1 rounded transition">
                            <input type="checkbox" id="filter-debt" class="rounded text-red-600 focus:ring-red-500 w-4 h-4" ${w.filters.hasDebt?"checked":""}>
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
    `,o=w.clients.length>0?`
        <div class="px-3 sm:px-4 pb-20 pt-2 w-full">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                ${w.clients.map(c=>{const u=c.totalDebt&&parseFloat(c.totalDebt)>0,p=Yn(c.lastVisit);return`
                    <div class="client-card bg-white p-3 sm:p-4 rounded-xl border ${u?"border-l-4 border-l-red-500 border-y-red-100 border-r-red-100":"border-gray-200 border-l-4 border-l-indigo-500"} shadow-sm hover:shadow-md transition cursor-pointer active:bg-gray-50 flex items-center gap-3 group" data-id="${c.id}">
                        
                        <div class="w-12 h-12 rounded-full ${u?"bg-red-100 text-red-600":"bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"} transition-colors flex items-center justify-center font-bold text-lg flex-shrink-0">
                            ${c.name.charAt(0).toUpperCase()}
                        </div>
                        
                        <div class="flex-grow min-w-0">
                            <div class="flex justify-between items-start">
                                <h3 class="font-bold text-gray-800 truncate text-base">${b(c.name)}</h3>
                                ${c.dobDay&&c.dobMonth==new Date().getMonth()+1?'<span class="text-xs bg-pink-100 text-pink-600 px-1.5 py-0.5 rounded font-bold">🎂 Mês</span>':""}
                            </div>
                            <p class="text-sm text-gray-500 truncate">${c.phone||"Sem telefone"}</p>
                            
                            <div class="flex flex-wrap gap-2 mt-1.5 items-center">
                                ${c.loyaltyPoints?`<span class="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">⭐ ${c.loyaltyPoints}</span>`:""}
                                ${u?`<span class="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full border border-red-200">Devendo: R$ ${parseFloat(c.totalDebt).toFixed(2)}</span>`:""}
                                <span class="text-[10px] text-gray-400 flex items-center gap-1 ml-auto">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    ${p==="Nunca"?"Novo":p}
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
    `;e.innerHTML=a+o;const s=document.getElementById("client-search"),r=document.getElementById("btn-toggle-filters"),i=document.getElementById("btn-apply-filters"),n=document.getElementById("btn-clear-search");r&&(r.onclick=()=>{w.showFilters=!w.showFilters,dt()});const l=document.getElementById("filter-birth-month");l&&(l.value=w.filters.birthMonth);const d=()=>{const c=document.getElementById("filter-inactive"),u=document.getElementById("filter-loyalty"),p=document.getElementById("filter-debt"),v=document.getElementById("filter-birth-month");w.filters={search:s.value,inactiveDays:c?c.value:"",birthMonth:v?v.value:"",hasLoyalty:u?u.checked:!1,hasDebt:p?p.checked:!1},ma()};i&&(i.onclick=d),n&&(n.onclick=()=>{w.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},w.showFilters=!1,ma()}),s.addEventListener("keypress",c=>{c.key==="Enter"&&d()}),e.querySelectorAll(".client-card").forEach(c=>{c.onclick=()=>ps(c.dataset.id)})}function Xn(e){const t=`
        <div class="bg-white border-b sticky top-0 z-10 shadow-sm w-full">
            <div class="flex overflow-x-auto no-scrollbar gap-1 px-3 sm:px-4 py-1 w-full">
                <button class="tab-btn ${w.activeTab==="profile"?"active":""}" data-tab="profile">👤 Perfil</button>
                <button class="tab-btn ${w.activeTab==="appointments"?"active":""}" data-tab="appointments">📅 Agendamentos</button>
                <button class="tab-btn ${w.activeTab==="history"?"active":""}" data-tab="history">💰 Histórico</button>
                <button class="tab-btn ${w.activeTab==="loyalty"?"active":""}" data-tab="loyalty">⭐ Fidelidade</button>
            </div>
        </div>
    `;let a="";return w.activeTab==="profile"?a=el(e):w.activeTab==="appointments"?a=tl():w.activeTab==="history"?a=al():w.activeTab==="loyalty"&&(a=ol(e)),`
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
                        <h2 class="text-xl sm:text-2xl font-bold leading-tight break-words">${b(e.name)}</h2>
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
                ${w.historyLoading?'<div class="absolute inset-0 bg-white/80 flex items-start justify-center pt-20 z-20"><div class="loader"></div></div>':""}
                <div class="animate-fade-in max-w-4xl mx-auto w-full pb-10">
                    ${a}
                </div>
            </div>
        </div>
    `}function Zn(e,t){if(!document.getElementById("tabs-styles")){const r=document.createElement("style");r.id="tabs-styles",r.textContent=`
            .tab-btn { padding: 12px 16px; white-space: nowrap; font-size: 0.9rem; font-weight: 500; color: #6b7280; border-bottom: 2px solid transparent; transition: all 0.2s; flex-shrink: 0; }
            .tab-btn.active { color: #4f46e5; border-bottom-color: #4f46e5; font-weight: 700; background-color: #f3f4f6; border-top-left-radius: 8px; border-top-right-radius: 8px; }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `,e.appendChild(r)}if(e.querySelectorAll(".tab-btn").forEach(r=>{r.onclick=async()=>{const i=r.dataset.tab;if(w.activeTab===i)return;(i==="appointments"||i==="history")&&(w.historyLimit=20,w.historySearchTerm=""),w.activeTab=i,Ae(),i!=="profile"&&!w.historyLoading&&w.historyData.appointments.length===0&&await ro(t.id)}}),w.activeTab==="profile"){const r=e.querySelector("#form-edit-client"),i=e.querySelector("#btn-delete-client");r&&(r.onsubmit=il),i&&(i.onclick=nl)}if(w.activeTab==="loyalty"){const r=e.querySelector("#btn-manual-redeem");r&&(r.onclick=()=>sl(t))}const a=e.querySelector("#history-search-input");if(a){const r=a.value;a.value="",a.focus(),a.value=r,a.addEventListener("input",i=>{w.historySearchTerm=i.target.value,Ae()})}const o=e.querySelector("#btn-load-more");o&&(o.onclick=()=>{w.historyLimit+=20,Ae(),ro(t.id)}),e.querySelectorAll("[data-go-agenda]").forEach(r=>{r.onclick=i=>{qe(),X("agenda-section",{targetDate:new Date(r.dataset.date),scrollToAppointmentId:r.dataset.id})}}),e.querySelectorAll("[data-go-comanda]").forEach(r=>{r.onclick=i=>{qe(),X("comandas-section",{selectedAppointmentId:r.dataset.id,initialFilter:"finalizadas"})}});const s=e.querySelector("#btn-close-modal");s&&(s.onclick=qe)}async function Ae(){const e=w.selectedClient;if(!e){qe();return}Kn(e)}function Kn(e){let t=document.getElementById("client-details-modal-overlay");t||(t=document.createElement("div"),t.id="client-details-modal-overlay",t.className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-fade-in",t.innerHTML=`
            <div class="bg-white w-full h-full sm:h-[90vh] sm:max-w-5xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-in" id="client-modal-content">
            </div>
        `,t.onclick=o=>{o.target===t&&qe()},document.body.appendChild(t),document.body.classList.add("overflow-hidden"),w.modalOpen=!0);const a=t.querySelector("#client-modal-content");a.innerHTML=Xn(e),Zn(a,e)}function qe(){const e=document.getElementById("client-details-modal-overlay");e&&e.remove(),document.body.classList.remove("overflow-hidden"),w.modalOpen=!1,w.selectedClient=null,dt()}function el(e){return`
        <form id="form-edit-client" class="space-y-5 w-full">
            <div class="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 shadow-sm w-full">
                <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    Dados Pessoais
                </h3>
                
                <div class="space-y-4 w-full">
                    <div class="w-full">
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Nome Completo</label>
                        <input type="text" name="name" value="${b(e.name)}" required class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Telefone</label>
                            <input type="tel" name="phone" value="${b(e.phone||"")}" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
                        </div>
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">E-mail</label>
                            <input type="email" name="email" value="${b(e.email||"")}" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
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
                <textarea name="notes" rows="4" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border" placeholder="Preferências, alergias...">${b(e.notes||"")}</textarea>
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
    `}function tl(e){let t=w.historyData.appointments||[];if(w.historySearchTerm){const o=w.historySearchTerm.toLowerCase();t=t.filter(s=>s.serviceName&&s.serviceName.toLowerCase().includes(o)||s.professionalName&&s.professionalName.toLowerCase().includes(o))}t.sort((o,s)=>new Date(s.startTime)-new Date(o.startTime));const a=o=>{const s=new Date(o.startTime),r=s.toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).replace(".",""),i=s.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),n=s<new Date;let l=n?"Concluído":"Agendado",d=n?"bg-gray-200 text-gray-600":"bg-green-100 text-green-700";return o.status==="cancelled"&&(l="Cancelado",d="bg-red-100 text-red-600"),`
            <div class="relative bg-white border rounded-xl p-3 shadow-sm mb-3 flex gap-3 cursor-pointer active:scale-[0.99] transition w-full overflow-hidden"
                 data-go-agenda="true" data-id="${o.id}" data-date="${o.startTime}">
                
                <div class="flex-shrink-0 w-14 flex flex-col items-center justify-center rounded-lg bg-gray-100 border border-gray-200 p-1">
                    <span class="text-xs font-bold text-gray-500 uppercase">${r.split(" ")[0]}</span>
                    <span class="text-lg font-black text-gray-800 leading-none">${s.getDate()}</span>
                    <span class="text-[10px] text-gray-500">${i}</span>
                </div>

                <div class="flex-grow min-w-0 flex flex-col justify-center">
                    <h4 class="font-bold text-gray-800 text-sm truncate">${b(o.serviceName||"Serviço")}</h4>
                    <p class="text-xs text-gray-500 truncate">Prof: ${b(o.professionalName||"N/A")}</p>
                    <div class="mt-1">
                        <span class="inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${d}">
                            ${l}
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
                        value="${w.historySearchTerm}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            <div class="w-full">
                ${t.length?t.map(a).join(""):'<p class="text-center text-gray-400 py-10 italic">Nenhum agendamento encontrado.</p>'}
            </div>
            
            ${t.length>=w.historyLimit?`
            <button id="btn-load-more" class="w-full py-3 text-sm text-indigo-600 font-bold bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                Carregar mais antigos...
            </button>`:""}
        </div>
    `}function al(e){let t=w.historyData.sales||[];if(w.historySearchTerm){const a=w.historySearchTerm.toLowerCase();t=t.filter(o=>o.id.includes(a))}return t.sort((a,o)=>new Date(o.date)-new Date(a.date)),t.length===0&&!w.historySearchTerm?'<div class="text-center py-12 text-gray-400">Nenhum registro financeiro.</div>':`
        <div class="space-y-4 w-full">
            <div class="sticky top-0 bg-gray-50 pt-2 pb-2 z-10 w-full">
                <div class="relative w-full">
                    <input type="text" id="history-search-input" 
                        class="w-full p-3 pl-10 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm" 
                        placeholder="Buscar código da venda..." 
                        value="${w.historySearchTerm}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            <div class="space-y-3 w-full">
                ${t.map(a=>{const o=new Date(a.date||a.createdAt),s=a.totalAmount||0;return`
                    <div class="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-sm active:bg-gray-50 cursor-pointer w-full"
                         data-go-comanda="true" data-id="${a.id}">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <div>
                                <p class="font-bold text-gray-800 text-sm">Venda #${a.id.slice(-4)}</p>
                                <p class="text-xs text-gray-500">${o.toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-gray-900">R$ ${parseFloat(s).toFixed(2)}</p>
                            <p class="text-[10px] text-indigo-500 font-medium">Ver detalhes</p>
                        </div>
                    </div>
                    `}).join("")}
            </div>
            
             ${t.length>=w.historyLimit?`
            <button id="btn-load-more" class="w-full py-3 text-sm text-indigo-600 font-bold bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                Carregar mais...
            </button>`:""}
        </div>
    `}function ol(e){const t=w.historyData.loyaltyLog||[];t.sort((o,s)=>new Date(s.date)-new Date(o.date));const a=t.length>0?t.map(o=>{const s=o.type==="redemption";return`
            <div class="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 w-full">
                <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full ${s?"bg-red-500":"bg-green-500"}"></div>
                    <div>
                        <p class="text-sm font-medium text-gray-700">${b(o.description||(s?"Resgate":"Acúmulo"))}</p>
                        <p class="text-[10px] text-gray-400">${new Date(o.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <span class="font-bold text-sm ${s?"text-red-600":"text-green-600"}">
                    ${s?"-":"+"}${o.points}
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
    `}async function ma(){w.loading=!0,Pa();try{let e=`/api/clients/${m.establishmentId}?limit=20`;w.filters.search&&(e+=`&search=${encodeURIComponent(w.filters.search)}`),w.filters.inactiveDays&&(e+=`&inactiveDays=${w.filters.inactiveDays}`),w.filters.hasLoyalty&&(e+="&hasLoyalty=true"),w.filters.hasDebt&&(e+="&hasDebt=true"),w.clients=await I(e),dt()}catch(e){console.error(e),g("Erro","Falha ao carregar clientes.","error"),w.clients=[],dt()}finally{w.loading=!1;const e=document.querySelector(".loader");e&&e.parentElement&&e.parentElement.remove()}}async function ro(e){const t=w.selectedClient;if(!(!t||!t.phone)){w.historyLoading=!0;try{const a=new Date;a.setMonth(a.getMonth()+12);const o=new Date;o.setFullYear(o.getFullYear()-5);let s=`/api/appointments/${m.establishmentId}?startDate=${o.toISOString()}&endDate=${a.toISOString()}`;s+=`&clientPhone=${encodeURIComponent(Qn(t.phone))}`,s+=`&limit=${w.historyLimit}`;const r=await I(s);w.historyData.appointments=r,w.historyData.sales=r.filter(n=>n.status==="completed").map(n=>({id:n.id,date:n.startTime,totalAmount:n.totalAmount||0,items:n.comandaItems||n.services||[]}));const i=[];r.forEach(n=>{n.status==="completed"&&n.loyaltyPointsEarned>0&&i.push({type:"earn",points:n.loyaltyPointsEarned,date:n.startTime,description:"Venda finalizada"}),n.loyaltyRedemption&&i.push({type:"redemption",points:n.loyaltyRedemption.cost||0,date:n.startTime,description:`Resgate: ${n.loyaltyRedemption.name}`})}),w.historyData.loyaltyLog=i}catch(a){console.error("Erro ao buscar histórico",a)}finally{w.historyLoading=!1,w.modalOpen&&w.selectedClient&&Ae()}}}function sl(e){const t=e.loyaltyPoints||0,a=`
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
    `,{modalElement:o,close:s}=se({title:"Ajuste de Pontos",contentHTML:a,maxWidth:"w-[90%] max-w-xs"});o.querySelector("form").onsubmit=async r=>{r.preventDefault();const i=document.getElementById("redeem-action").value,n=parseInt(document.getElementById("redeem-points").value,10),l=document.getElementById("redeem-reason").value;if(!n||n<=0)return g("Erro","Qtd inválida.","error");if(i==="debit"&&n>t)return g("Erro","Saldo insuficiente.","error");try{let d=t;i==="debit"?(await Hr(m.establishmentId,e.phone,n,l),d-=n):(d+=n,await Fo(e.id,{loyaltyPoints:d})),w.selectedClient.loyaltyPoints=d,w.historyData.loyaltyLog.unshift({type:i==="debit"?"redemption":"earn",points:n,date:new Date().toISOString(),description:l+" (Manual)"}),g("Sucesso","Saldo atualizado.","success"),s(),Ae()}catch(d){g("Erro",d.message,"error")}}}function ps(e){w.selectedClient=w.clients.find(t=>t.id===e),w.activeTab="profile",w.historyLimit=20,w.historySearchTerm="",w.historyData={appointments:[],sales:[],loyaltyLog:[]},Ae()}function rl(){const e=`
        <form id="modal-new-client-form" class="space-y-4">
            <div><label class="block text-sm font-bold text-gray-700 mb-1">Nome Completo *</label><input type="text" id="new-name" required class="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"></div>
            <div><label class="block text-sm font-bold text-gray-700 mb-1">Telefone (WhatsApp) *</label><input type="tel" id="new-phone" required class="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"></div>
            <div class="pt-4">
                <button type="submit" class="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:bg-indigo-700 active:scale-95 transition">Cadastrar</button>
            </div>
        </form>
    `,{modalElement:t,close:a}=se({title:"Novo Cliente",contentHTML:e,maxWidth:"w-[90%] max-w-sm"});t.querySelector("form").onsubmit=async o=>{o.preventDefault();const s=document.getElementById("new-name").value,r=document.getElementById("new-phone").value;try{const i=await jo({establishmentId:m.establishmentId,name:s,phone:r});w.clients.unshift(i),g("Sucesso","Cliente criado!","success"),a(),ps(i.id)}catch(i){g("Erro",i.message,"error")}}}async function il(e){e.preventDefault();const t=new FormData(e.target),a=Object.fromEntries(t.entries());a.establishmentId=m.establishmentId;try{await Fo(w.selectedClient.id,a),Object.assign(w.selectedClient,a);const o=w.clients.findIndex(s=>s.id===w.selectedClient.id);o!==-1&&(w.clients[o]=w.selectedClient),g("Sucesso","Dados salvos!","success")}catch(o){g("Erro",o.message,"error")}}async function nl(){if(await V("Excluir Cliente","Tem certeza? O histórico será apagado."))try{await Fr(w.selectedClient.id),w.clients=w.clients.filter(e=>e.id!==w.selectedClient.id),w.selectedClient=null,g("Sucesso","Cliente removido.","success"),qe(),dt()}catch(e){g("Erro",e.message,"error")}}async function ll(){ms=document.getElementById("content"),w.selectedClient=null,w.searchTerm="",w.historyLimit=20,w.showFilters=!1,w.modalOpen=!1,w.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},Pa(),await ma()}const ve=document.getElementById("content"),ea={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},dl={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}};let z=null,_=null;function gs(){return[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais da Unidade"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"whatsapp-bot",icon:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",label:"Atendente Virtual (WhatsApp)"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}]}function io(e,t,a){return new Promise((o,s)=>{const r=new FileReader;r.readAsDataURL(e),r.onload=i=>{const n=new Image;n.src=i.target.result,n.onload=()=>{const l=document.createElement("canvas");let d=n.width,c=n.height;d>t&&(c*=t/d,d=t),l.width=d,l.height=c,l.getContext("2d").drawImage(n,0,0,d,c);const p=e.type==="image/png"&&t<500?"image/png":"image/jpeg";o(l.toDataURL(p,a))},n.onerror=l=>s(l)},r.onerror=i=>s(i)})}function Ie(e,t=null){let a='<option value="">-- Selecione (Opcional) --</option>';const o=i=>{const n=new Map,l=[];return i&&(i.forEach(d=>n.set(d.id,{...d,children:[]})),n.forEach(d=>{d.parentId&&n.has(d.parentId)?n.get(d.parentId).children.push(d):l.push(d)})),l},s=(i,n="")=>{const l=i.id===t?"selected":"";a+=`<option value="${i.id}" ${l}>${n}${b(i.name)}</option>`,i.children.forEach(d=>s(d,n+"— "))};return o(e).forEach(i=>s(i)),a}async function ze(e,t){const a=t.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const o=[],{ownerName:s,...r}=e;if(s&&s!==m.userName){const n=oe.currentUser;n&&o.push(Ps(n,{displayName:s}).then(()=>{m.userName=s}))}const i={...z,...r};o.push(xa(_,i)),await Promise.all(o),z=i,g("Sucesso","Definições salvas com sucesso!","success"),r.themeColor&&_===m.establishmentId&&setTimeout(()=>window.location.reload(),1500)}catch(o){g("Erro",`Não foi possível salvar: ${o.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function cl(e,t){const a=b(e.name||""),o=b(e.phone||""),s=b(e.cnpj||""),r=b(e.email||""),i=b(e.address||""),n=b(e.website||""),l=b(m.userName||"");t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Dados Gerais e de Contato</h3>
                <button type="submit" form="personal-data-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar</button>
            </div>
            <form id="personal-data-form" class="space-y-4">
                <div>
                    <label for="ownerName" class="block text-sm font-medium text-gray-700">Seu nome (Responsável)</label>
                    <input type="text" id="ownerName" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" value="${l}">
                </div>
                <div>
                    <label for="establishmentName" class="block text-sm font-medium text-gray-700">Nome da Unidade</label>
                    <input type="text" id="establishmentName" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" value="${a}">
                </div>
                <div>
                    <label for="establishmentPhone" class="block text-sm font-medium text-gray-700">Telefone Principal</label>
                    <input type="tel" id="establishmentPhone" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" value="${o}">
                </div>
                <div>
                    <label for="establishmentCnpjCpf" class="block text-sm font-medium text-gray-700">CNPJ / CPF</label>
                    <input type="text" id="establishmentCnpjCpf" value="${s}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md bg-gray-50">
                </div>
                <div>
                    <label for="establishmentEmail" class="block text-sm font-medium text-gray-700">E-mail de Contato</label>
                    <input type="email" id="establishmentEmail" value="${r}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none">
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
    `,t.querySelector("#personal-data-form").addEventListener("submit",d=>{d.preventDefault();const c={ownerName:t.querySelector("#ownerName").value,name:t.querySelector("#establishmentName").value,phone:t.querySelector("#establishmentPhone").value,cnpj:t.querySelector("#establishmentCnpjCpf").value,email:t.querySelector("#establishmentEmail").value,address:t.querySelector("#establishmentAddress").value,website:t.querySelector("#establishmentWebsite").value};ze(c,d)})}function ul(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const o=t.querySelector("#newPassword").value,s=t.querySelector("#confirmPassword").value;if(o!==s){g("Erro","As senhas não coincidem.","error");return}const r=t.querySelector('button[form="change-password-form"]');r.disabled=!0,r.textContent="A Salvar...";try{const i=oe.currentUser;if(i)await Ds(i,o),g("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum usuário logado encontrado.")}catch(i){g("Erro",`Não foi possível alterar a senha: ${i.message}`,"error")}finally{r.disabled=!1,r.textContent="Salvar Nova Senha"}})}function ml(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const o=t.querySelector("#newEmail").value,s=t.querySelector("#currentPassword").value,r=t.querySelector('button[form="change-email-form"]');r.disabled=!0,r.textContent="A verificar...";try{const i=oe.currentUser,n=Ls.credential(i.email,s);await Cs(i,n),await Ts(i,o),await lr(_,o),g("Sucesso","Link de verificação enviado! Verifique o seu novo e-mail.","success"),a.target.reset()}catch(i){g("Erro",i.message,"error")}finally{r.disabled=!1,r.textContent="Salvar Novo E-mail"}})}function pl(e,t){const a=b(e.welcomeMessage||"");t.innerHTML=`
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
    `,t.querySelector("#establishmentLogoBase64").value=e.logo||"",t.querySelector("#establishmentBackgroundImageBase64").value=e.backgroundImage||"",bs(e.themeColor||"indigo",t),t.querySelector("#establishmentLogoButton").onclick=()=>t.querySelector("#establishmentLogoInput").click(),t.querySelector("#establishmentLogoInput").onchange=async o=>{const s=o.target.files[0];if(s){const r=await io(s,300,.9);t.querySelector("#establishmentLogoPreview").src=r,t.querySelector("#establishmentLogoBase64").value=r}},t.querySelector("#establishmentBgButton").onclick=()=>t.querySelector("#establishmentBgInput").click(),t.querySelector("#establishmentBgInput").onchange=async o=>{const s=o.target.files[0];if(s){const r=t.querySelector("#establishmentBgButton");r.textContent="A processar...",r.disabled=!0;try{const i=await io(s,1280,.7);t.querySelector("#establishmentBgPreview").src=i,t.querySelector("#establishmentBgPreview").classList.remove("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=i}finally{r.textContent="Carregar Fundo",r.disabled=!1}}},t.querySelector("#establishmentBgRemoveBtn").onclick=()=>{t.querySelector("#establishmentBgPreview").src="",t.querySelector("#establishmentBgPreview").classList.add("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.remove("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=""},t.querySelector("#branding-form").addEventListener("submit",o=>{o.preventDefault();const s={logo:t.querySelector("#establishmentLogoBase64").value,welcomeMessage:t.querySelector("#establishmentWelcomeMessage").value,backgroundImage:t.querySelector("#establishmentBackgroundImageBase64").value,primaryColor:t.querySelector("#establishmentPrimaryColorInput").value,textColor:t.querySelector("#establishmentTextColorInput").value,themeColor:t.querySelector("#establishmentThemeColor").value};ze(s,o)})}function gl(e,t){const a=e.urlId||_;let o=window.location.origin;(o.includes("localhost")||o.includes("capacitor://")||o.includes("127.0.0.1"))&&(o="https://www.kairosagenda.com.br");const s=b(`${o}/agendar?id=${a}`),r=e.publicBookingEnabled||!1,i=r?"Agendamento Online ATIVO":"Agendamento Online INATIVO",n=r?"text-green-600":"text-red-600";t.innerHTML=`
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
                            <input type="checkbox" id="publicBookingToggle" class="sr-only" ${r?"checked":""}>
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
    `,t.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const l=t.querySelector("#publicBookingLink");l.select(),document.execCommand("copy"),l.blur(),g("Sucesso","Link copiado!","success")}),t.querySelector("#publicBookingToggle").addEventListener("change",async l=>{const d=l.target.checked,c=t.querySelector("#publicBookingStatusText");c.textContent=d?"Agendamento Online ATIVO":"Agendamento Online INATIVO",c.className=d?"text-sm font-semibold text-green-600":"text-sm font-semibold text-red-600";try{l.target.disabled=!0,await nr(_,d),z.publicBookingEnabled=d,g("Sucesso",`Agendamento online ${d?"ativado":"desativado"}!`,"success")}catch(u){g("Erro",u.message,"error"),l.target.checked=!d}finally{l.target.disabled=!1}}),wl(e.slotInterval||30,t),t.querySelector("#booking-form").addEventListener("submit",l=>{l.preventDefault();const d={slotInterval:parseInt(t.querySelector("#establishmentSlotInterval").value,10)};ze(d,l)})}function bl(e,t){t.innerHTML=`
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
    `;const a=t.querySelector("#establishmentTimezone");e.timezone&&(a.value=e.timezone);const o=t.querySelector("#establishmentWorkingHoursContainer"),s=e.workingHours||{};Object.keys(ea).forEach(r=>{const i=s[r]||{},n=ea[r],l=i.active!==!1,d=document.createElement("div");d.className=`day-schedule-card p-4 rounded-lg border ${l?"bg-gray-50 border-gray-200":"bg-gray-100 border-gray-100 disabled opacity-60"}`,d.innerHTML=`
            <div class="flex justify-between items-center mb-4">
                <span class="font-bold text-gray-800">${n}</span>
                <label class="flex items-center cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" id="est-${r}-active" class="sr-only" ${l?"checked":""}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                </label>
            </div>
            <div class="time-inputs grid grid-cols-2 gap-3">
                <div><label class="text-xs text-gray-500">Abertura:</label><input type="time" id="est-${r}-start" value="${i.start||"09:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Fecho:</label><input type="time" id="est-${r}-end" value="${i.end||"18:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Início Pausa:</label><input type="time" id="est-${r}-breakStart" value="${i.breakStart||"12:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Fim Pausa:</label><input type="time" id="est-${r}-breakEnd" value="${i.breakEnd||"13:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
            </div>`,o.appendChild(d)}),o.addEventListener("change",r=>{const i=r.target.closest('.day-schedule-card input[type="checkbox"]');if(i){const n=i.closest(".day-schedule-card");n.classList.toggle("disabled",!i.checked),n.classList.toggle("opacity-60",!i.checked),n.classList.toggle("bg-gray-50",i.checked),n.classList.toggle("bg-gray-100",!i.checked)}}),t.querySelector("#working-hours-form").addEventListener("submit",r=>{r.preventDefault();const i={};Object.keys(ea).forEach(l=>{i[l]={active:t.querySelector(`#est-${l}-active`).checked,start:t.querySelector(`#est-${l}-start`).value,end:t.querySelector(`#est-${l}-end`).value,breakStart:t.querySelector(`#est-${l}-breakStart`).value,breakEnd:t.querySelector(`#est-${l}-breakEnd`).value}});const n=t.querySelector("#establishmentTimezone").value;ze({workingHours:i,timezone:n},r)})}function fl(e,t){const a=!!e.whatsappInstance;t.innerHTML=`
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
                    <p class="text-sm text-gray-600 max-w-md mx-auto mb-6">O bot da Inteligência Artificial já está ativo no número desta unidade. Experimente enviar um "Oi" para ele!</p>
                    
                    <div class="flex justify-center gap-4">
                        <button type="button" id="btnDisconnectWhatsapp" class="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
                            <i class="bi bi-power"></i> Desconectar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    `;let o=null;const s=t.querySelector("#btnGenerateQr"),r=t.querySelector("#btnCancelQr");s&&s.addEventListener("click",async()=>{s.disabled=!0,s.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gerando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp/connect";try{const d=await(await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:_})})).json();d.qrcode?(t.querySelector("#whatsappStatusArea").classList.add("hidden"),t.querySelector("#qrCodeDisplayArea").classList.remove("hidden"),t.querySelector("#qrCodeImage").src=d.qrcode,o=setInterval(async()=>{try{const c=await be(_);c.whatsappInstance&&(clearInterval(o),z.whatsappInstance=c.whatsappInstance,t.querySelector("#qrCodeDisplayArea").classList.add("hidden"),t.querySelector("#connectedStatusArea").classList.remove("hidden"),g("Sucesso","WhatsApp conectado com sucesso!","success"))}catch(c){console.error("Erro ao verificar status do WhatsApp",c)}},5e3)):d.message&&d.message.includes("já está conectado")?(t.querySelector("#whatsappStatusArea").classList.add("hidden"),t.querySelector("#qrCodeDisplayArea").classList.add("hidden"),t.querySelector("#connectedStatusArea").classList.remove("hidden"),g("Aviso","O WhatsApp já estava conectado nesta unidade.","success")):g("Erro na API",d.error||"Desconhecido","error")}catch(l){console.error(l),g("Erro de Conexão","Não foi possível acessar o servidor Kairós.","error")}finally{s.disabled=!1,s.innerHTML='<i class="bi bi-phone-vibrate"></i> Gerar QR Code'}}),r&&r.addEventListener("click",()=>{o&&clearInterval(o),t.querySelector("#qrCodeDisplayArea").classList.add("hidden"),t.querySelector("#whatsappStatusArea").classList.remove("hidden")});const i=t.querySelector("#btnDisconnectWhatsapp");i&&i.addEventListener("click",async()=>{if(confirm("Tem certeza que deseja DESCONECTAR o bot desta unidade? O sistema não responderá mais os clientes via WhatsApp automaticamente.")){i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Desconectando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp/disconnect";try{const l=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:_})});if(l.ok)z.whatsappInstance=null,t.querySelector("#connectedStatusArea").classList.add("hidden"),t.querySelector("#whatsappStatusArea").classList.remove("hidden"),g("Sucesso","WhatsApp desconectado da unidade.","success");else{const d=await l.json();g("Erro",d.error||"Não foi possível desconectar.","error")}}catch(l){console.error(l),g("Erro de Conexão","Falha ao comunicar com o servidor.","error")}finally{i.disabled=!1,i.innerHTML='<i class="bi bi-power"></i> Desconectar'}}})}async function xl(e,t){const a=e.loyaltyProgram||{},o=a.pointsPerVisit||1;let s=[],r=[],i=[];try{[s,r,i]=await Promise.all([Se(_),Ut(_),$a(_)])}catch(d){console.error("Erro ao carregar dados para fidelidade:",d)}t.innerHTML=`
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
                         <input type="number" id="loyaltyPointsPerVisit" value="${o}" min="1" step="1" class="w-24 p-2 border border-indigo-300 rounded-md focus:ring-indigo-500 text-center font-bold text-lg bg-white">
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
    `;const n=t.querySelector("#loyaltyTiersContainer"),l=(d={})=>{const c=document.createElement("div");c.className="loyalty-tier-row bg-white p-4 border border-gray-200 rounded-lg shadow-sm relative grid grid-cols-1 md:grid-cols-4 gap-4 items-end";const u=d.type||"money",p=d.itemId||"",v=d.reward||"",f=d.discount||"",x=d.points||d.costPoints||"";c.innerHTML=`
            <div>
                <label class="text-xs font-bold text-gray-500 mb-1 block">Custo (Pontos)</label>
                <div class="relative">
                    <input type="number" placeholder="Ex: 100" data-field="points" value="${x}" class="w-full p-2 border border-gray-300 rounded-md font-bold text-gray-800">
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
                    <input type="text" placeholder="Ex: R$ 20 de Desconto" data-field="rewardName" value="${b(v)}" class="desc-input flex-1 p-2 border border-gray-300 rounded-md ${u!=="money"?"hidden":""}">
                    
                    <select data-field="itemId" class="item-select flex-1 p-2 border border-gray-300 rounded-md bg-white text-sm ${u==="money"?"hidden":""}">
                        <option value="">Selecione o item na lista...</option>
                    </select>

                    <div class="w-24 relative">
                        <span class="absolute left-2 top-2 text-gray-500 text-sm">R$</span>
                        <input type="number" placeholder="Valor" data-field="discount" value="${f}" step="0.01" class="discount-input w-full p-2 pl-7 border border-gray-300 rounded-md" title="Valor do desconto">
                    </div>
                </div>
            </div>

            <button type="button" class="remove-loyalty-tier absolute -top-3 -right-3 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white p-1.5 rounded-full shadow-md transition-colors" title="Remover Prémio">
                <i class="bi bi-x-lg text-sm"></i>
            </button>
        `;const h=c.querySelector(".type-select"),E=c.querySelector(".item-select"),S=c.querySelector(".desc-input"),k=c.querySelector(".discount-input"),D=L=>{E.innerHTML='<option value="">Selecione...</option>';let A=[];L==="service"?A=s:L==="product"?A=r:L==="package"&&(A=i),A.forEach(j=>{const T=j.id===p,M=j.name||j.title||"Sem nome",q=j.price||j.salePrice||0;E.innerHTML+=`<option value="${j.id}" data-price="${q}" ${T?"selected":""}>${b(M)}</option>`})};return u!=="money"&&D(u),h.addEventListener("change",L=>{const A=L.target.value;A==="money"?(E.classList.add("hidden"),S.classList.remove("hidden"),S.value="",k.value=""):(E.classList.remove("hidden"),S.classList.add("hidden"),D(A),k.value="")}),E.addEventListener("change",L=>{const A=L.target.selectedOptions[0];if(A&&A.value){S.value=A.text;const j=A.dataset.price;j&&(k.value=parseFloat(j).toFixed(2))}}),c};a.tiers&&a.tiers.length>0?a.tiers.forEach(d=>n.appendChild(l(d))):n.appendChild(l()),t.querySelector("#add-loyalty-tier").addEventListener("click",()=>{n.appendChild(l())}),n.addEventListener("click",d=>{const c=d.target.closest(".remove-loyalty-tier");c&&c.closest(".loyalty-tier-row").remove()}),t.querySelector("#loyalty-form").addEventListener("submit",d=>{d.preventDefault();const c=Array.from(t.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(p=>{const v=p.querySelector(".type-select").value,f=v==="money"?null:p.querySelector(".item-select").value;let x=v==="money"?p.querySelector(".desc-input").value:p.querySelector(".item-select").options[p.querySelector(".item-select").selectedIndex]?.text;return{points:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,costPoints:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,type:v,itemId:f,reward:x,name:x,discount:parseFloat(p.querySelector('input[data-field="discount"]').value)||0}}),u={loyaltyProgram:{enabled:t.querySelector("#loyaltyEnabled").checked,type:"visit",pointsPerVisit:parseInt(t.querySelector("#loyaltyPointsPerVisit").value,10)||1,pointsPerCurrency:0,tiers:c.filter(p=>p.points>0&&p.reward)}};ze(u,d)})}async function vl(e,t){t.innerHTML=`
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
    `;try{const[a,o]=await Promise.all([Wt(_),Ea(_)]),s=e.financialIntegration||{},r=e.commissionConfig||{},i=e.purchaseConfig||{};t.querySelector("#financialNatureId").innerHTML=Ie(a,s.defaultNaturezaId),t.querySelector("#financialCostCenterId").innerHTML=Ie(o,s.defaultCentroDeCustoId),t.querySelector("#purchaseNatureId").innerHTML=Ie(a,i.defaultNatureId),t.querySelector("#purchaseCostCenterId").innerHTML=Ie(o,i.defaultCostCenterId),t.querySelector("#commissionNatureId").innerHTML=Ie(a,r.defaultNatureId),t.querySelector("#commissionCostCenterId").innerHTML=Ie(o,r.defaultCostCenterId)}catch{g("Erro","Não foi possível carregar o plano de contas da unidade.","error")}t.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const o={financialIntegration:{defaultNaturezaId:t.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:t.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:t.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:t.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:t.querySelector("#commissionNatureId").value||null,defaultCostCenterId:t.querySelector("#commissionCostCenterId").value||null}};ze(o,a)})}function hl(e,t){const a=`https://wa.me/5516997859430?text=Olá, preciso de ajuda com o sistema Kairos (Minha Unidade: ${e.name}).`;t.innerHTML=`
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
    `}function yl(e,t){const a=`https://wa.me/5516997859430?text=Gostaria de solicitar o cancelamento da assinatura. (Unidade: ${e.name})`;t.innerHTML=`
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
    `}function bs(e="indigo",t){const a=t.querySelector("#color-palette-container"),o=t.querySelector("#establishmentThemeColor");!a||!o||(a.innerHTML="",Object.entries(dl).forEach(([s,r])=>{const i=s===e,n=document.createElement("div");n.className="w-24 text-center cursor-pointer mb-4",n.innerHTML=`
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${i?"border-gray-800 scale-110 shadow-lg":"border-transparent"} p-1 transition-all">
                <div class="w-full h-full rounded-full" style="background-color: ${r.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${i?"text-gray-900 font-bold":"text-gray-500"}">${r.name}</p>
        `,n.addEventListener("click",()=>{o.value=s,bs(s,t)}),a.appendChild(n)}),o.value=e)}function wl(e,t){const a=t.querySelector("#slotIntervalContainer"),o=t.querySelector("#establishmentSlotInterval");if(!a||!o)return;const s=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=s.map(r=>{const i=r.value===e;return`<button type="button" data-value="${r.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors shadow-sm
                           ${i?"bg-indigo-600 text-white":"bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}">
                       ${r.label}
                   </button>`}).join(""),o.value=e,a.querySelectorAll(".interval-btn").forEach(r=>{r.addEventListener("click",()=>{o.value=r.dataset.value,a.querySelectorAll(".interval-btn").forEach(i=>{i.classList.remove("bg-indigo-600","text-white"),i.classList.add("bg-white","border","border-gray-300","text-gray-700")}),r.classList.add("bg-indigo-600","text-white"),r.classList.remove("bg-white","border","border-gray-300","text-gray-700")})})}async function kl(e){const a=gs().find(s=>s.id===e);if(!a)return;ve.innerHTML=`
        <div class="bg-white p-4 shadow-sm border-b mb-6 flex items-center justify-between sticky top-0 z-10">
            <div class="flex items-center gap-3">
                <button data-action="back-to-menu" class="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700">
                    <i class="bi bi-arrow-left"></i> Voltar
                </button>
                <h2 class="text-lg font-bold text-gray-800">${a.label}</h2>
            </div>
            <div class="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                ${b(z?.name||"")}
            </div>
        </div>
        
        <div id="settings-content-detail" class="pb-20 max-w-5xl mx-auto w-full">
            <div class="flex justify-center items-center py-10"><div class="spinner-border text-indigo-600" role="status"></div></div>
        </div>
    `,ve.querySelector('button[data-action="back-to-menu"]').addEventListener("click",s=>{s.preventDefault(),fs({id:_})});const o=document.getElementById("settings-content-detail");switch(e){case"personal-data":cl(z,o);break;case"change-password":ul(z,o);break;case"change-email":ml(z,o);break;case"branding":pl(z,o);break;case"booking":gl(z,o);break;case"working-hours":bl(z,o);break;case"whatsapp-bot":fl(z,o);break;case"loyalty":await xl(z,o);break;case"financial":await vl(z,o);break;case"support":hl(z,o);break;case"cancellation":yl(z,o);break;default:o.innerHTML='<div class="p-4 text-center">Módulo em construção.</div>'}}async function fs(e={}){ve.innerHTML=`
        <div class="flex flex-col justify-center items-center h-64">
            <div class="spinner-border text-indigo-600 border-4 w-12 h-12 mb-4" role="status"></div>
            <p class="text-gray-500 font-medium">A carregar configurações da unidade...</p>
        </div>
    `;try{_=e.id||m.establishmentId,z=await be(_);const t=e.id?`<button onclick="window.navigateTo('establishments-section')" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                   <i class="bi bi-diagram-3"></i> Voltar à Rede
               </button>`:"",a=z.isMatriz||!z.parentId?'<span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded ml-3">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded ml-3">📍 UNIDADE</span>',o=gs();ve.innerHTML=`
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
                        <h3 class="text-2xl font-bold mb-1">${b(z.name)} ${a}</h3>
                        <p class="text-indigo-200 text-sm flex items-center gap-2"><i class="bi bi-geo-alt"></i> ${b(z.address||"Morada não definida")}</p>
                    </div>
                    <div class="relative z-10 hidden sm:block">
                        <div class="w-16 h-16 bg-white rounded-xl shadow-md p-1 flex items-center justify-center">
                            ${z.logo?`<img src="${z.logo}" class="w-full h-full object-contain rounded-lg">`:`<span class="text-2xl text-indigo-600 font-bold">${z.name.charAt(0).toUpperCase()}</span>`}
                        </div>
                    </div>
                    <div class="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${o.map(s=>`
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
                        ${Sl(z.modules||{})}
                    </div>
                </div>
            </div>
        `,ve.querySelectorAll("div[data-section]").forEach(s=>{s.addEventListener("click",r=>{kl(s.dataset.section)})}),ve.querySelectorAll(".module-toggle").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.module;try{const n={...(await be(_)).modules,[r]:s.checked};await xa(_,{modules:n}),g("Módulos","Módulos atualizados com sucesso.","success")}catch(i){s.checked=!s.checked,g("Erro",i.message,"error")}})})}catch(t){ve.innerHTML=`
            <div class="p-8 text-center max-w-md mx-auto">
                <i class="bi bi-exclamation-triangle text-4xl text-red-500 mb-4 block"></i>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Erro ao carregar loja</h2>
                <p class="text-gray-600">${t.message}</p>
                <button onclick="window.navigateTo('establishments-section')" class="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700">Voltar à Rede</button>
            </div>
        `}}function Sl(e){return[{key:"agenda-section",label:"Agenda Diária",icon:"bi-calendar"},{key:"comandas-section",label:"Comandas e PDV",icon:"bi-receipt"},{key:"financial-section",label:"Financeiro Completo",icon:"bi-cash-coin"},{key:"reports-section",label:"Relatórios Gerenciais",icon:"bi-graph-up"}].map(a=>`
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
    `).join("")}const st=document.getElementById("content");async function Re(e){const t=document.getElementById("blockagesList");if(t){t.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,o=document.getElementById("filterEndDate")?.value,s=await Ot(m.establishmentId,a||new Date().toISOString().split("T")[0],o||new Date().toISOString().split("T")[0],e),r=document.getElementById("filterReason")?.value.toLowerCase(),i=r?s.filter(l=>l.reason&&l.reason.toLowerCase().includes(r)):s,n=i.reduce((l,d)=>{const c=d.reason||"Sem motivo";return l[c]||(l[c]=[]),l[c].push(d),l},{});if(t.innerHTML="",i.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(n).forEach(([l,d])=>{const c=document.createElement("div");c.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let p=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${b(l)} (${d.length})</h4>`;if(d.length>1){const v=JSON.stringify(d.map(f=>f.id));p+=`<button data-action="batch-delete-blockage" data-ids='${v}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}p+="</div>",c.innerHTML=p,d.forEach(v=>{const f=new Date(v.startTime),x=new Date(v.endTime),h=f.toLocaleDateString("pt-BR"),E=x.toLocaleDateString("pt-BR"),k=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${h===E?`${h} | ${f.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${x.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${h} às ${f.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${E} às ${x.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${v.id}">Apagar</button>
                    </div>`;c.innerHTML+=k}),t.appendChild(c)})}catch(a){t.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function $l(e){e.preventDefault();const t=e.target,a=t.querySelector("#blockageProfId").value,o=t.querySelector("#blockageDate").value,s=t.querySelector("#blockageEndDate").value||o,r=t.querySelector("#blockageStartTime").value,i=t.querySelector("#blockageEndTime").value,n={establishmentId:m.establishmentId,professionalId:a,startTime:new Date(`${o}T${r}:00`).toISOString(),endTime:new Date(`${s}T${i}:00`).toISOString(),reason:t.querySelector("#blockageReason").value};try{await zt(n),t.reset(),g("Sucesso","Bloqueio adicionado com sucesso!","success"),Re(a)}catch(l){g("Erro",`Não foi possível criar o bloqueio: ${l.message}`,"error")}}async function El(e){e.preventDefault();const t=e.target,a=Array.from(t.querySelectorAll('input[name="batch-professionals"]:checked')).map(c=>c.value);if(a.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const o=t.querySelector("#batchBlockageDate").value,s=t.querySelector("#batchBlockageEndDate").value||o,r=t.querySelector("#batchBlockageStartTime").value,i=t.querySelector("#batchBlockageEndTime").value,n=t.querySelector("#batchBlockageReason").value,l=t.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="Aguarde...";const d=a.map(c=>{const u={establishmentId:m.establishmentId,professionalId:c,startTime:new Date(`${o}T${r}:00`).toISOString(),endTime:new Date(`${s}T${i}:00`).toISOString(),reason:n};return zt(u)});try{await Promise.all(d),g("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),t.reset(),t.querySelectorAll('input[name="batch-professionals"]:checked').forEach(u=>u.checked=!1);const c=document.getElementById("blockageProfId").value;c&&Re(c)}catch(c){g("Erro",`Ocorreu um erro: ${c.message}`,"error")}finally{l.disabled=!1,l.textContent="Adicionar Bloqueio em Lote"}}function Il(e){st.addEventListener("submit",t=>{t.target.id==="blockageForm"&&$l(t),t.target.id==="batchBlockageForm"&&El(t)}),st.addEventListener("input",t=>{t.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&Re(e)}),st.addEventListener("click",async t=>{const a=t.target.closest("button[data-action]");if(!a)return;const o=a.dataset.action;if(o==="back-to-professionals")X("profissionais-section");else if(o==="delete-blockage"){if(await V("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await va(a.dataset.id),g("Sucesso","Bloqueio removido.","success"),Re(e)}catch(r){g("Erro",`Não foi possível remover o bloqueio: ${r.message}`,"error")}}else if(o==="batch-delete-blockage"){const s=JSON.parse(a.dataset.ids);if(await V("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${s.length} bloqueios de uma vez?`))try{await qo(s),g("Sucesso",`${s.length} bloqueios removidos.`,"success"),Re(e)}catch(i){g("Erro",`Não foi possível apagar os bloqueios: ${i.message}`,"error")}}})}async function Ll(e){const{professionalId:t,professionalName:a}=e;if(!t||!a){st.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const o=b(a);st.innerHTML=`
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
                        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Bloqueio para <span class="text-indigo-600">${o}</span></h3>
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
                        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Bloqueios de ${o}</h3>
                        <div id="blockage-filters" class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div><label for="filterStartDate" class="block text-sm font-medium text-gray-700">De</label><input type="date" id="filterStartDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            <div><label for="filterEndDate" class="block text-sm font-medium text-gray-700">Até</label><input type="date" id="filterEndDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            <div><label for="filterReason" class="block text-sm font-medium text-gray-700">Motivo</label><input type="text" id="filterReason" placeholder="Pesquisar motivo..." class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                        </div>
                        <div id="blockagesList" class="space-y-4 max-h-[60vh] overflow-y-auto pr-2"></div>
                    </div>
                </div>
            </div>
        </section>`,Il(t),await Re(t);const s=document.getElementById("batchProfSelectionContainer");try{const r=await re(m.establishmentId);s.innerHTML=r.map(i=>`
            <div class="flex items-center">
                <input id="prof-batch-${i.id}" value="${i.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${i.id}" class="ml-2 text-sm text-gray-700">${b(i.name)}</label>
            </div>`).join("")}catch{s.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Cl=e=>I(`/api/users/${e}`),Tl=e=>I("/api/users",{method:"POST",body:JSON.stringify(e)}),Dl=(e,t)=>I(`/api/users/${e}`,{method:"PUT",body:JSON.stringify(t)}),Pl=e=>I(`/api/users/${e}`,{method:"DELETE"}),Bl=(e,t)=>I(`/api/users/${e}/password`,{method:"PUT",body:JSON.stringify({password:t})}),Ml=(e,t)=>I(`/api/users/${e}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),We=document.getElementById("content"),Al={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios Gerais","sales-report-section":"Relatório de Vendas (Caixa)","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores","profissionais-section":"Profissionais","ausencias-section":"Ausências e Bloqueios","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},ql={view:"Visualizar",create:"Criar",edit:"Editar"};let xt=null,vt=null,Ne=null;const Rl={group_admin:"Administrador do Grupo",company_admin:"Gestor de Matriz",branch_manager:"Gestor de Filial",professional:"Profissional Padrão"};function Nl(e){const t=document.getElementById("usersListContainer");if(!t)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(e.length===0){const o=a?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";t.innerHTML=`<p class="col-span-full text-center text-gray-500">${o}</p>`;return}e.sort((o,s)=>(o.status==="active"?-1:1)-(s.status==="active"?-1:1)),t.innerHTML=e.map(o=>{const s=JSON.stringify(o).replace(/'/g,"&apos;"),r=o.status==="active",i=m.professionals.find(p=>p.id===o.professionalId),n=i?i.name:"N/A",l=i?i.name.charAt(0):o.name.charAt(0),d=i?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(l)}`,c=Rl[o.role]||"Profissional",u=o.role==="group_admin"?"bg-purple-100 text-purple-800":o.role==="company_admin"?"bg-blue-100 text-blue-800":o.role==="branch_manager"?"bg-orange-100 text-orange-800":"bg-gray-100 text-gray-800";return`
        <div class="user-card-clickable bg-white rounded-lg shadow-sm border overflow-hidden flex cursor-pointer ${r?"":"opacity-60"} hover:shadow-md transition" 
             data-action="edit-user" 
             data-user='${s}'>
            
            <img src="${d}" alt="Foto de Perfil" class="w-16 h-16 object-cover flex-shrink-0 pointer-events-none border-r">
            
            <div class="p-3 flex-grow flex flex-col justify-between min-w-0">
                <div class="pointer-events-none min-w-0">
                    <div class="flex justify-between items-start gap-2">
                        <p class="font-bold text-gray-800 text-sm truncate">${o.name}</p>
                        <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap ${u}">${c}</span>
                    </div>
                    <p class="text-xs text-gray-500 truncate">${o.email}</p>
                    <p class="text-[10px] text-gray-400 mt-1 truncate">Prof: <span class="font-semibold text-gray-600">${n}</span></p>
                </div>
                
                <div class="mt-2 flex items-center justify-between gap-2">
                    <label class="flex items-center cursor-pointer" title="${r?"Ativo":"Inativo"}">
                        <div class="relative">
                            <input type="checkbox" data-action="toggle-user-status" data-user-id="${o.id}" class="sr-only" ${r?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-8 h-4 rounded-full"></div>
                        </div>
                    </label>
                    
                    <button data-action="delete-user" data-user-id="${o.id}" class="text-gray-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors action-btn-delete" title="Excluir Usuário">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `}).join("")}function pa(){const t=document.getElementById("showInactiveUsersToggle")?.checked?m.users:m.users.filter(a=>a.status==="active");Nl(t)}function jl(e={}){return Object.entries(Al).map(([t,a])=>{const o=t==="agenda-section"||t==="comandas-section",s=e[t]?.view_all_prof===!0,r=Object.entries(ql).map(([n,l])=>`
             <label class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${t}" data-permission="${n}" class="sr-only" ${e[t]?.[n]?"checked":""}>
                    <div class="toggle-bg block bg-gray-300 w-8 h-4 rounded-full"></div>
                </div>
                <span class="text-[10px] text-gray-600 font-medium">${l}</span>
            </label>
        `).join(""),i=o?`
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
                ${r}
            </div>
            ${i}
        </div>
    `}).join("")}function no(e){if(!Ne||m.userRole==="professional")return"";const t=e?.accessibleEstablishments?.map(r=>r.id)||[],a=e?.accessibleCompanies?.map(r=>r.id)||[];if((e?.role||"professional")==="group_admin")return'<div class="p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 text-sm font-bold">Acesso Total (Global) liberado.</div>';let s='<div class="space-y-3 max-h-48 overflow-y-auto custom-scrollbar p-2 bg-gray-50 rounded border">';return Ne.companies.forEach(r=>{const i=a.includes(r.id),n=Ne.branches.filter(l=>l.companyId===r.id);s+=`
            <div class="company-block">
                <label class="flex items-center space-x-2 cursor-pointer mb-1">
                    <input type="checkbox" class="company-checkbox rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" value="${r.id}" data-name="${r.name}" ${i?"checked":""}>
                    <span class="text-sm font-bold text-gray-800">🏢 ${r.name}</span>
                </label>
                <div class="pl-6 space-y-1 border-l-2 border-gray-200 ml-2">
                    ${n.map(l=>{const d=t.includes(l.id)||i;return`
                            <label class="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" class="branch-checkbox rounded text-indigo-500 h-3 w-3" value="${l.id}" data-name="${l.name}" data-company-id="${r.id}" ${d?"checked":""}>
                                <span class="text-xs text-gray-600">📍 ${l.name}</span>
                            </label>
                        `}).join("")}
                </div>
            </div>
        `}),s+="</div>",s}async function lo(e=null){document.getElementById("user-list-view").classList.add("hidden");const t=document.getElementById("user-form-view");t.classList.remove("hidden");let a=m.professionals;if(!a||a.length===0)try{a=await re(m.currentViewContext.id),m.professionals=a}catch{console.warn("Profissionais não carregados")}if(["group_admin","company_admin"].includes(m.userRole)&&!Ne)try{const d=await fetch("/api/establishments/hierarchy",{headers:{Authorization:`Bearer ${await m.getAuthToken?.()||""}`}});d.ok&&(Ne=await d.json())}catch(d){console.error("Falha ao buscar hierarquia",d),Ne={companies:[],branches:[]}}const o=d=>a?.find(c=>c.id===d),s=e?.professionalId;o(s);const r=e!==null;t.querySelector("#userFormTitle").textContent=r?`Editar: ${e.name}`:"Novo Usuário";const i=t.querySelector("#userForm");i.innerHTML=`
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

            ${["group_admin","company_admin"].includes(m.userRole)?`
            <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100 space-y-3">
                 <h3 class="font-bold text-sm text-indigo-800 border-b border-indigo-200 pb-1">Nível de Acesso (Enterprise)</h3>
                 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="text-xs font-bold text-indigo-700 block mb-1">Perfil do Usuário</label>
                        <select id="userRole" class="w-full p-2 border border-indigo-300 rounded text-sm bg-white font-semibold">
                            ${m.userRole==="group_admin"?`<option value="group_admin" ${e?.role==="group_admin"?"selected":""}>Administrador Global (Acesso a tudo)</option>`:""}
                            <option value="company_admin" ${e?.role==="company_admin"?"selected":""}>Gestor de Empresa/Matriz</option>
                            <option value="branch_manager" ${e?.role==="branch_manager"?"selected":""}>Gestor de Filial (Loja)</option>
                            <option value="professional" ${e?.role==="professional"?"selected":""}>Profissional Padrão (Barbeiro)</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-xs font-bold text-indigo-700 block mb-1">Locais Permitidos</label>
                        <div id="hierarchySelectorContainer">
                            ${no(e)}
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
                        ${a?.map(d=>`<option value="${d.id}" ${d.id===s?"selected":""}>${d.name}</option>`).join("")}
                    </select>
                    <p class="text-[10px] text-yellow-600 mt-1">Garante que o profissional só veja os agendamentos dele.</p>
                </div>
            </div>
            
            ${r?`
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
                    ${jl(e?.permissions)}
                </div>
            </div>

            <div class="flex gap-3 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-2 bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300">Cancelar</button>
                <button type="submit" class="flex-1 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">Salvar Usuário</button>
            </div>
        </div>
    `;const n=i.querySelector("#userRole"),l=i.querySelector("#hierarchySelectorContainer");if(n&&l){n.addEventListener("change",c=>{const u={...e,role:c.target.value};l.innerHTML=no(u),d()});const d=()=>{l.querySelectorAll(".company-checkbox").forEach(c=>{c.addEventListener("change",u=>{u.target.closest(".company-block").querySelectorAll(".branch-checkbox").forEach(f=>f.checked=u.target.checked)})})};d()}if(i.addEventListener("submit",async d=>{d.preventDefault();const c={};i.querySelectorAll("input[data-module]").forEach(h=>{const E=h.dataset.module,S=h.dataset.permission;c[E]||(c[E]={}),c[E][S]=h.checked});const u=i.querySelector("#userProfessionalId").value||null,p=i.querySelector("#userRole")?.value||"professional",v=[],f=[];if(p!=="group_admin"&&i.querySelector(".company-checkbox")&&(i.querySelectorAll(".company-checkbox:checked").forEach(h=>{v.push({id:h.value,name:h.dataset.name})}),i.querySelectorAll(".branch-checkbox:checked").forEach(h=>{f.push({id:h.value,name:h.dataset.name,companyId:h.dataset.companyId})}),f.length===0))return g("Atenção","Você deve selecionar pelo menos uma filial para este usuário.","error");const x={name:i.querySelector("#userName").value,permissions:c,professionalId:u,role:p,accessibleCompanies:v,accessibleEstablishments:f};try{if(r){const h=i.querySelector("#userEmail").value;e?.email!==h&&(x.email=h),await Dl(e.id,x),g("Usuário atualizado com sucesso!","success")}else x.email=i.querySelector("#userEmail").value,x.password=i.querySelector("#userPassword").value,await Tl(x),g("Usuário criado com sucesso!","success");Pt()}catch(h){g(`Erro: ${h.message}`,"error")}}),r){const d=i.querySelector('[data-action="show-password-form"]'),c=i.querySelector("#password-form");d&&c&&(d.addEventListener("click",()=>{d.classList.add("hidden"),c.classList.remove("hidden")}),c.querySelector('[data-action="cancel-password-change"]').addEventListener("click",()=>{d.classList.remove("hidden"),c.classList.add("hidden"),c.querySelector("#userNewPassword").value=""}),c.querySelector('[data-action="save-password"]').addEventListener("click",async u=>{const p=u.target,v=c.querySelector("#userNewPassword").value;if(!v||v.length<6)return g("Aviso","Senha deve ter no mínimo 6 caracteres.","error");if(await V("Alterar Senha","Tem certeza?"))try{p.disabled=!0,p.textContent="...",await Bl(e.id,v),g("Sucesso","Senha alterada.","success"),d.classList.remove("hidden"),c.classList.add("hidden")}catch(f){g("Erro",f.message,"error")}finally{p.disabled=!1,p.textContent="Salvar Senha"}}))}}async function Fl(){const e=document.getElementById("usersListContainer");e.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[t,a]=await Promise.all([Cl(m.currentViewContext.id),re(m.currentViewContext.id)]);m.users=t,m.professionals=a,pa()}catch{g("Erro ao carregar usuários.","error"),e.innerHTML='<p class="col-span-full text-center text-red-500">Falha ao carregar.</p>'}}async function Pt(){We.innerHTML=`
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
    `,xt&&We.removeEventListener("click",xt),vt&&We.removeEventListener("change",vt),xt=async e=>{const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"new-user":lo();break;case"edit-user":const o=JSON.parse(t.dataset.user.replace(/&apos;/g,"'"));lo(o);break;case"back-to-list":Pt();break;case"delete-user":{if(e.stopPropagation(),await V("Excluir Usuário","Tem certeza? Ação irreversível."))try{await Pl(t.dataset.userId),g("Usuário excluído!","success"),Pt()}catch(s){g(`Erro: ${s.message}`,"error")}break}}},vt=async e=>{const t=e.target.closest('input[data-action="toggle-user-status"]');if(e.target.id==="showInactiveUsersToggle")pa();else if(t){e.stopPropagation();const a=t.dataset.userId,o=t.checked?"active":"inactive";try{await Ml(a,o);const s=m.users.findIndex(r=>r.id===a);s>-1&&(m.users[s].status=o,pa())}catch(s){g(`Erro: ${s.message}`,"error"),t.checked=!t.checked}}},We.addEventListener("click",xt),We.addEventListener("change",vt),await Fl()}const Hl=document.getElementById("content");let co={},ga=null;function Ol(){Object.values(co).forEach(e=>e?.destroy()),co={}}function zl(e,t){if(!window.jspdf){g("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:a}=window.jspdf,o=new a({orientation:"landscape",unit:"px",format:"a4"}),s=document.getElementById("salesReportSummaryCards");if(o.setFontSize(18),o.text(e,o.internal.pageSize.getWidth()/2,40,{align:"center"}),s){const i=[["Receita Total",s.querySelector("#summary-revenue").textContent],["Vendas Totais",s.querySelector("#summary-transactions").textContent],["Ticket Médio",s.querySelector("#summary-avg-ticket").textContent]];o.autoTable({startY:60,head:[["Métrica","Valor"]],body:i,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const r=o.lastAutoTable?o.lastAutoTable.finalY+20:60;o.text("Detalhes das Vendas",20,r),o.autoTable({html:`#${t}`,startY:r+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),o.save(`${e.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function uo(e){const t=document.getElementById("genericModal"),a=b(e.client),o=b(e.items),s=b(e.responsavelCaixa||"N/A"),r=(e.payments||[]).map(i=>`
        <div class="flex justify-between text-sm">
            <span>${b(i.method.charAt(0).toUpperCase()+i.method.slice(1))}</span>
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
                    <p class="font-semibold text-gray-800">${o}</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm font-medium text-gray-600">Responsável pelo Caixa</p>
                    <p class="font-semibold text-gray-800">${s}</p>
                </div>
                 <div class="border-t pt-4 mt-4">
                     <h3 class="font-semibold mb-2">Pagamento</h3>
                     <div class="space-y-1">
                        ${r}
                     </div>
                     <div class="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                         <span>TOTAL</span>
                         <span>R$ ${e.total.toFixed(2)}</span>
                     </div>
                </div>
            </div>
        </div>
    `,t.style.display="flex"}function Vl(e){const{summary:t,transactions:a}=e;document.getElementById("summary-revenue").textContent=`R$ ${t.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=t.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${t.averageTicket.toFixed(2)}`;const o=document.getElementById("paymentSummaryTableBody"),s=Object.entries(t.paymentMethodTotals).sort(([,n],[,l])=>l-n);o.innerHTML=s.map(([n,l])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${b(n.charAt(0).toUpperCase()+n.slice(1))}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${l.toFixed(2)}</td>
        </tr>
    `).join("");const r=document.getElementById("transactionsTableBody"),i=document.getElementById("mobileTransactionsList");if(a.length===0){const n='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';r.innerHTML=n,i.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}r.innerHTML=a.map((n,l)=>{const d=b(n.client),c=b(n.items),u=b(n.type);return`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${l}">
            <td class="w-24 py-3 px-4">${new Date(n.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${d}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${c}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${u}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${n.total.toFixed(2)}</td>
        </tr>
    `}).join(""),r.querySelectorAll("tr").forEach(n=>{n.addEventListener("dblclick",()=>{const l=n.dataset.transactionIndex,d=ga.transactions[l];d&&uo(d)})}),i.innerHTML=a.map((n,l)=>{const d=b(n.client),c=b(n.items),u=b(n.type);return`
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 active:bg-gray-50 cursor-pointer transition-colors" data-transaction-index="${l}">
            <div class="flex justify-between items-start mb-2">
                <div class="flex flex-col">
                    <span class="text-xs text-gray-500 font-medium">${new Date(n.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</span>
                    <span class="font-bold text-gray-800 text-lg">${d}</span>
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
    `}).join(""),i.querySelectorAll("div[data-transaction-index]").forEach(n=>{n.addEventListener("click",()=>{const l=n.dataset.transactionIndex,d=ga.transactions[l];d&&uo(d)})})}async function mo(){const e=document.getElementById("main-reports-view"),t=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!e||!t||!a)return;const o=t.value,s=a.value;if(!o||!s)return g("Atenção","Por favor, selecione as datas de início e fim.","error");e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const r=document.getElementById("cashierSessionFilter").value,i=await Cr({establishmentId:m.establishmentId,startDate:o,endDate:s,cashierSessionId:r});ga=i,e.innerHTML=`
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
        `,Vl(i)}catch(r){g("Erro",`Não foi possível carregar o relatório: ${r.message}`,"error"),e.innerHTML=`<p class="p-8 text-center text-red-500">${b(r.message)}</p>`}}async function Ul(){Ol();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];Hl.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",mo),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const o=document.getElementById("reportStartDate").value,s=document.getElementById("reportEndDate").value,r=`Relatorio_Vendas_${o}_a_${s}`;zl(r,"transactionsTable")});try{const o=await gi(m.establishmentId),s=document.getElementById("cashierSessionFilter");o&&o.length>0&&o.forEach(r=>{const i=new Date(r.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),n=b(r.closedByName||"N/A");s.innerHTML+=`<option value="${r.id}">${n} - ${i}</option>`})}catch{g("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await mo()}const _l=document.getElementById("content");let $={payables:[],receivables:[],natures:[],costCenters:[],establishments:[],currentTab:"receivables",statusFilter:"all",startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date(new Date().getFullYear(),new Date().getMonth()+1,0).toISOString().split("T")[0],filterNaturezaId:"all",filterCostCenterId:"all",filterEstablishmentIds:new Set,searchQuery:"",isAdvancedFilterOpen:!1,selectedIds:new Set,isSelectionMode:!1},ht=null,yt=null;function Ba(e){const t=new Map,a=[];return e&&(e.forEach(o=>t.set(o.id,{...o,children:[]})),t.forEach(o=>{o.parentId&&t.has(o.parentId)?t.get(o.parentId).children.push(o):a.push(o)})),a}function xs(e){if(!e)return{day:"--",month:"---",full:"--/--/----"};const[t,a,o]=e.split("-"),s=new Date(t,a-1,o),r=String(s.getDate()).padStart(2,"0"),i=s.toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return{day:r,month:i,full:s.toLocaleDateString("pt-BR")}}function ne(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function Bt(e,t){if(t==="paid")return!1;const a=new Date;a.setHours(0,0,0,0);const[o,s,r]=e.split("-");return new Date(o,s-1,r)<a}function Wl(e,t,a){if(!e)return;if(!t||t.length===0){e.innerHTML='<p class="text-center text-gray-400 text-sm py-4">Nenhum item criado.</p>';return}const o=(s,r=0)=>`
            <div class="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg border border-gray-100 mb-1 hover:bg-gray-100 transition-colors" style="margin-left: ${r*16}px;">
                <span class="text-sm font-medium text-gray-700"><i class="bi ${r===0?"bi-folder2-open text-indigo-500":"bi-arrow-return-right text-gray-400"} mr-2"></i>${s.name}</span>
                <button data-action="delete-${a}" data-id="${s.id}" class="text-red-500 hover:text-white text-xs font-bold px-2.5 py-1.5 rounded-md hover:bg-red-500 transition-colors">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
            ${s.children.map(n=>o(n,r+1)).join("")}
        `;e.innerHTML=t.map(s=>o(s)).join("")}async function ba(e){const t=document.getElementById("genericModal"),a=e==="nature",o=a?"Plano de Contas (Naturezas)":"Centros de Custo",s=a?Wt:Ea,r=a?qi:Ni,i=a?"natures":"costCenters";t.innerHTML=`
        <div class="modal-content max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <i class="bi ${a?"bi-tags-fill text-indigo-500":"bi-diagram-3-fill text-blue-500"}"></i> ${o}
                </h2>
                <button type="button" data-action="close-modal" class="text-gray-400 hover:text-red-500 text-2xl font-bold transition-colors">&times;</button>
            </div>
            
            <div class="p-6">
                <form id="hierarchyForm" class="space-y-4 mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div>
                        <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Nome da Categoria</label>
                        <input type="text" id="itemName" placeholder="Ex: Receitas de Vendas, Despesas Fixas..." required class="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Sub-categoria de (Opcional)</label>
                        <select id="itemParent" class="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                            <option value="">-- Nível Principal --</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center gap-2">
                        <i class="bi bi-plus-lg"></i> Adicionar
                    </button>
                </form>

                <div class="border-t border-gray-100 pt-4">
                    <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Estrutura Atual</h3>
                    <div id="hierarchyList" class="space-y-1 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                        <div class="loader mx-auto"></div>
                    </div>
                </div>
            </div>
        </div>`,t.style.display="flex";const n=t.querySelector("#hierarchyList"),l=t.querySelector("#itemParent"),d=u=>{const p=Ba(u);Wl(n,p,e);const v=l.value;l.innerHTML='<option value="">-- Nível Principal --</option>';const f=(x,h=0)=>{const E="  ".repeat(h)+(h>0?"↳ ":"");l.innerHTML+=`<option value="${x.id}">${E}${x.name}</option>`,x.children.forEach(S=>f(S,h+1))};p.forEach(x=>f(x)),l.value=v};try{const u=await s(m.establishmentId);$[i]=u,d(u)}catch(u){console.error(u)}const c=t.querySelector("#hierarchyForm");c.addEventListener("submit",async u=>{u.preventDefault();const p=t.querySelector("#itemName").value,v=l.value;try{await r({name:p,parentId:v||null,establishmentId:m.establishmentId});const f=await s(m.establishmentId);$[i]=f,d(f),c.reset(),await ke(),g("Sucesso","Item adicionado ao plano de contas.","success")}catch(f){g("Erro",f.message,"error")}})}async function Jl(){try{const t=(await Oe()).matrizes||[];$.establishments=[],t.forEach(a=>{$.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(o=>$.establishments.push({id:o.id,name:o.name,type:"Filial"}))}),$.filterEstablishmentIds.size===0&&$.filterEstablishmentIds.add(m.establishmentId)}catch(e){console.warn("Erro ao buscar lojas",e)}vs(),hs(),await ke()}function vs(){const e=$.establishments.map(t=>`
        <label class="inline-flex items-center gap-2 px-3 py-2 bg-white border ${$.filterEstablishmentIds.has(t.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-gray-200 text-gray-600"} rounded-xl cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4" value="${t.id}" ${$.filterEstablishmentIds.has(t.id)?"checked":""}>
            <span class="text-xs font-bold whitespace-nowrap">${t.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${t.name}</span>
        </label>
    `).join("");_l.innerHTML=`
        <div class="flex flex-col h-[calc(100vh-80px)] md:h-auto bg-gray-100 w-full overflow-hidden relative font-sans">
            
            <div id="batch-action-bar" class="hidden absolute top-4 left-4 right-4 z-30 bg-gray-900 text-white rounded-xl shadow-2xl p-3 items-center justify-between animate-fade-in-down">
                <div class="flex items-center gap-4">
                    <button id="cancel-selection-btn" class="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <span class="font-bold text-sm tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Selecionados</span>
                </div>
                <button id="batch-delete-btn" class="flex items-center gap-2 px-5 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg">
                    <i class="bi bi-trash3"></i> Excluir
                </button>
            </div>

            <div class="bg-white shadow-sm border-b border-gray-200 z-20 w-full">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div>
                            <h1 class="text-2xl font-black text-gray-900 tracking-tight">Gestão Financeira</h1>
                            <p class="text-sm text-gray-500 font-medium">Controle de contas a pagar, receber e fluxo de caixa.</p>
                        </div>
                        <div class="flex flex-wrap gap-2 w-full md:w-auto">
                            <button id="settings-btn" class="p-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-200 shadow-sm" title="Plano de Contas e Centros de Custo">
                                <i class="bi bi-gear-fill"></i>
                            </button>
                            <button data-action="new-financial" data-type="payable" class="flex-1 md:flex-none px-4 py-2.5 bg-red-50 text-red-700 border border-red-200 font-bold rounded-lg hover:bg-red-100 transition-colors shadow-sm flex items-center justify-center gap-2">
                                <i class="bi bi-arrow-down-circle"></i> Nova Despesa
                            </button>
                            <button data-action="new-financial" data-type="receivable" class="flex-1 md:flex-none px-4 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                <i class="bi bi-arrow-up-circle"></i> Nova Receita
                            </button>
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row gap-3 items-center w-full">
                        <div class="relative w-full md:w-96 flex-shrink-0">
                            <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input type="text" id="searchInput" value="${$.searchQuery}" placeholder="Pesquisar descrição ou obs..." class="w-full pl-10 p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                        </div>
                        
                        <div class="flex-1 flex overflow-x-auto gap-2 pb-1 md:pb-0 hide-scrollbar w-full">
                            <button class="date-preset-btn px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg whitespace-nowrap hover:bg-gray-200 transition-colors" data-preset="month">Este Mês</button>
                            <button class="date-preset-btn px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg whitespace-nowrap hover:bg-gray-200 transition-colors" data-preset="last_month">Mês Passado</button>
                            <button class="date-preset-btn px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg whitespace-nowrap hover:bg-gray-200 transition-colors" data-preset="year">Este Ano</button>
                        </div>

                        <button id="toggle-filter-btn" class="w-full md:w-auto px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2 flex-shrink-0 ${$.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-300":""}">
                            <i class="bi bi-funnel"></i> Filtros Avançados
                        </button>
                    </div>

                    <div id="filter-panel" class="${$.isAdvancedFilterOpen?"block":"hidden"} mt-4 bg-indigo-50/50 p-5 rounded-xl border border-indigo-100 shadow-inner">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            
                            ${$.establishments.length>1?`
                            <div class="md:col-span-4 mb-2">
                                <label class="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Filtrar por Unidades (Multi-Seleção)</label>
                                <div class="flex flex-wrap gap-2" id="establishment-filters-container">
                                    ${e}
                                </div>
                            </div>
                            `:""}
                            
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Data Inicial</label>
                                <input type="date" id="filterStartDate" value="${$.startDate}" class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Data Final</label>
                                <input type="date" id="filterEndDate" value="${$.endDate}" class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                            
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Plano de Contas</label>
                                <select id="filterNaturezaId" class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option value="all">Todas as naturezas</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Centro de Custo</label>
                                <select id="filterCostCenterId" class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option value="all">Todos os centros</option>
                                </select>
                            </div>

                            <div class="md:col-span-4 mt-2 flex flex-col md:flex-row justify-between items-center pt-4 border-t border-indigo-100 gap-4">
                                <button id="clear-filters-btn" class="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Redefinir Filtros</button>
                                <button id="apply-filter-btn" class="w-full md:w-auto px-8 py-2.5 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 active:scale-95 transition-all">
                                    Aplicar Consulta
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="flex mt-6 bg-gray-100/80 p-1 rounded-xl border border-gray-200">
                        <button id="tab-receivables" class="flex-1 py-2.5 text-sm font-black rounded-lg shadow-sm transition-all flex justify-center items-center gap-2 ${$.currentTab==="receivables"?"bg-white text-emerald-700":"text-gray-500"}">
                            A Receber / Entradas
                        </button>
                        <button id="tab-payables" class="flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${$.currentTab==="payables"?"bg-white text-red-700 shadow-sm":"text-gray-500 hover:text-gray-700"}">
                            A Pagar / Saídas
                        </button>
                    </div>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto px-4 py-6 max-w-7xl mx-auto w-full space-y-6 custom-scrollbar">
                
                <div id="summary-section" class="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up"></div>

                <div class="flex flex-wrap gap-2 mb-4 bg-white p-2 rounded-xl shadow-sm border border-gray-200">
                    <button data-status="all" class="status-filter-btn px-4 py-2 text-xs font-bold rounded-lg transition-colors ${$.statusFilter==="all"?"bg-gray-800 text-white shadow-sm":"bg-gray-100 text-gray-600 hover:bg-gray-200"}">Todos</button>
                    <button data-status="pending" class="status-filter-btn px-4 py-2 text-xs font-bold rounded-lg transition-colors ${$.statusFilter==="pending"?"bg-gray-800 text-white shadow-sm":"bg-gray-100 text-gray-600 hover:bg-gray-200"}">Abertos / Prov.</button>
                    <button data-status="paid" class="status-filter-btn px-4 py-2 text-xs font-bold rounded-lg transition-colors ${$.statusFilter==="paid"?"bg-gray-800 text-white shadow-sm":"bg-gray-100 text-gray-600 hover:bg-gray-200"}">Baixados</button>
                    <button data-status="overdue" class="status-filter-btn px-4 py-2 text-xs font-bold rounded-lg transition-colors ${$.statusFilter==="overdue"?"bg-gray-800 text-white shadow-sm":"bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-700"}">Atrasados</button>
                </div>

                <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-[10px] font-black text-gray-500 uppercase tracking-widest items-center">
                        <div class="col-span-1 flex justify-center">
                            <input type="checkbox" id="select-all-toggle" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                        </div>
                        <div class="col-span-2">Vencimento</div>
                        <div class="col-span-4">Descrição e Empresa</div>
                        <div class="col-span-2 text-center">Status</div>
                        <div class="col-span-2 text-right">Valor (R$)</div>
                        <div class="col-span-1 text-center">Ações</div>
                    </div>

                    <div id="list-container" class="divide-y divide-gray-100 pb-2 md:pb-0">
                        <div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-sm">Carregando dados financeiros...</p></div>
                    </div>
                </div>
            </div>

            <button id="fab-add" class="md:hidden fixed bottom-6 right-6 w-14 h-14 ${$.currentTab==="receivables"?"bg-emerald-600 hover:scale-105":"bg-red-600 hover:scale-105"} text-white rounded-full shadow-xl flex items-center justify-center transition-all z-40">
                <i class="bi bi-plus-lg text-2xl"></i>
            </button>

        </div>
    `,document.querySelector('.date-preset-btn[data-preset="month"]').classList.add("bg-indigo-100","text-indigo-700"),ys()}function hs(){const e=document.getElementById("select-all-toggle");e&&e.addEventListener("change",o=>{const s=o.target.checked,r=document.querySelectorAll(".item-checkbox");$.selectedIds.clear(),r.forEach(i=>{i.checked=s,s&&$.selectedIds.add(i.dataset.id)}),Pe()}),document.getElementById("cancel-selection-btn").addEventListener("click",()=>{$.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(o=>o.checked=!1),Pe()}),document.getElementById("batch-delete-btn").addEventListener("click",async()=>{const o=$.selectedIds.size;if(o===0)return;if(await V("Excluir Lançamentos",`Deseja realmente apagar ${o} registros financeiros?`))try{const r=$.currentTab==="payables"?"payables":"receivables";await Ko(r,Array.from($.selectedIds)),g("Sucesso",`${o} itens excluídos.`,"success"),$.selectedIds.clear(),Pe(),ke()}catch{g("Erro","Falha ao excluir itens.","error")}}),document.querySelectorAll(".est-filter-checkbox").forEach(o=>{o.addEventListener("change",s=>{const r=s.target.closest("label");s.target.checked?($.filterEstablishmentIds.add(s.target.value),r.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),r.classList.remove("border-gray-200","text-gray-600")):($.filterEstablishmentIds.delete(s.target.value),r.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),r.classList.add("border-gray-200","text-gray-600"))})}),document.getElementById("toggle-filter-btn").addEventListener("click",()=>{const o=document.getElementById("filter-panel"),s=document.getElementById("toggle-filter-btn");$.isAdvancedFilterOpen=!$.isAdvancedFilterOpen,$.isAdvancedFilterOpen?(o.classList.remove("hidden"),s.classList.add("bg-indigo-50","text-indigo-700","border-indigo-300")):(o.classList.add("hidden"),s.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-300"))}),document.getElementById("settings-btn").addEventListener("click",Zl),document.querySelectorAll('[data-action="new-financial"]').forEach(o=>{o.addEventListener("click",s=>{ta(s.target.closest("button").dataset.type)})}),document.getElementById("fab-add").addEventListener("click",()=>{const o=$.currentTab==="payables"?"payable":"receivable";ta(o)});const t=document.getElementById("tab-receivables"),a=document.getElementById("tab-payables");t.addEventListener("click",()=>po("receivables")),a.addEventListener("click",()=>po("payables")),document.querySelectorAll(".status-filter-btn").forEach(o=>{o.addEventListener("click",s=>{document.querySelectorAll(".status-filter-btn").forEach(r=>{r.classList.remove("bg-gray-800","text-white","shadow-sm"),r.classList.add("bg-gray-100","text-gray-600")}),s.target.classList.add("bg-gray-800","text-white","shadow-sm"),s.target.classList.remove("bg-gray-100","text-gray-600","hover:bg-gray-200","hover:bg-red-100"),$.statusFilter=s.target.dataset.status,Mt(),ws()})}),document.querySelectorAll(".date-preset-btn").forEach(o=>{o.addEventListener("click",s=>{document.querySelectorAll(".date-preset-btn").forEach(d=>d.classList.remove("bg-indigo-100","text-indigo-700")),s.target.classList.add("bg-indigo-100","text-indigo-700");const r=s.target.dataset.preset,i=new Date;let n,l;r==="month"?(n=new Date(i.getFullYear(),i.getMonth(),1),l=new Date(i.getFullYear(),i.getMonth()+1,0)):r==="last_month"?(n=new Date(i.getFullYear(),i.getMonth()-1,1),l=new Date(i.getFullYear(),i.getMonth(),0)):r==="year"&&(n=new Date(i.getFullYear(),0,1),l=new Date(i.getFullYear(),11,31)),document.getElementById("filterStartDate").value=n.toISOString().split("T")[0],document.getElementById("filterEndDate").value=l.toISOString().split("T")[0],document.getElementById("apply-filter-btn").click()})}),document.getElementById("searchInput").addEventListener("input",o=>{$.searchQuery=o.target.value.toLowerCase(),Mt()}),document.getElementById("clear-filters-btn").addEventListener("click",()=>{const o=new Date;document.getElementById("filterStartDate").value=new Date(o.getFullYear(),o.getMonth(),1).toISOString().split("T")[0],document.getElementById("filterEndDate").value=new Date(o.getFullYear(),o.getMonth()+1,0).toISOString().split("T")[0],document.getElementById("filterNaturezaId").value="all",document.getElementById("filterCostCenterId").value="all",$.filterEstablishmentIds.clear(),$.filterEstablishmentIds.add(m.establishmentId),vs(),hs()}),document.getElementById("apply-filter-btn").addEventListener("click",()=>{$.startDate=document.getElementById("filterStartDate").value,$.endDate=document.getElementById("filterEndDate").value,$.filterNaturezaId=document.getElementById("filterNaturezaId").value,$.filterCostCenterId=document.getElementById("filterCostCenterId").value,$.filterEstablishmentIds.size===0&&$.filterEstablishmentIds.add(m.establishmentId),document.getElementById("toggle-filter-btn").click(),ke()}),ht&&document.body.removeEventListener("click",ht),ht=o=>{const s=o.target;if(s.classList.contains("item-checkbox")||s.classList.contains("modal-item-checkbox")){const n=s.value||s.dataset.id;s.checked?$.selectedIds.add(n):$.selectedIds.delete(n),Pe(),o.stopPropagation();return}const r=s.closest("button[data-action]");if(r){const{action:n,type:l,id:d}=r.dataset;if(o.stopPropagation(),n==="delete"){const c=r.closest(".financial-row").dataset.item.replace(/&apos;/g,"'");Ql(l,JSON.parse(c));return}if(n==="mark-as-paid"){Gl(l,d);return}if(n==="manage-natures"){ba("nature");return}if(n==="manage-cost-centers"){ba("cost-center");return}}const i=s.closest(".financial-row");if(i&&document.getElementById("list-container").contains(i)&&!s.closest("button")&&!s.closest(".item-checkbox")){const{type:n}=i.dataset,l=JSON.parse(i.dataset.item.replace(/&apos;/g,"'"));ta(n,l)}},document.body.addEventListener("click",ht),yt&&document.getElementById("genericModal").removeEventListener("click",yt),yt=o=>{if(o.target.closest('[data-action="close-modal"]')){document.getElementById("genericModal").style.display="none";return}const r=o.target.closest('button[data-action^="delete-"]');if(r){const i=r.dataset.action.split("-")[1];Xl(i,r.dataset.id)}},document.getElementById("genericModal").addEventListener("click",yt)}function Pe(){const e=document.getElementById("batch-action-bar"),t=document.getElementById("selected-count"),a=document.getElementById("fab-add"),o=$.selectedIds.size;t.textContent=o,o>0?(e.classList.remove("hidden"),e.classList.add("flex"),a&&a.classList.add("hidden")):(e.classList.add("hidden"),e.classList.remove("flex"),a&&a.classList.remove("hidden"))}function po(e){$.currentTab=e,$.selectedIds.clear(),Pe(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1);const t=document.getElementById("tab-receivables"),a=document.getElementById("tab-payables"),o=document.getElementById("fab-add");e==="receivables"?(t.classList.add("bg-white","text-emerald-700","shadow-sm"),t.classList.remove("text-gray-500"),a.classList.remove("bg-white","text-red-700","shadow-sm"),a.classList.add("text-gray-500"),o&&(o.className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-all z-40")):(a.classList.add("bg-white","text-red-700","shadow-sm"),a.classList.remove("text-gray-500"),t.classList.remove("bg-white","text-emerald-700","shadow-sm"),t.classList.add("text-gray-500"),o&&(o.className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-all z-40")),Mt()}async function ke(){const e=document.getElementById("list-container");e.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-sm">A processar transações...</p></div>';try{if($.natures.length===0){const[r,i]=await Promise.all([Wt(m.establishmentId),Ea(m.establishmentId)]);$.natures=r,$.costCenters=i,ys()}const t=Array.from($.filterEstablishmentIds).join(","),a={startDate:$.startDate,endDate:$.endDate,establishmentId:t};$.filterNaturezaId!=="all"&&(a.natureId=$.filterNaturezaId),$.filterCostCenterId!=="all"&&(a.costCenterId=$.filterCostCenterId);const[o,s]=await Promise.all([ts(a),as(a)]);$.payables=o.entries||[],$.receivables=s.entries||[],ws(),Mt()}catch(t){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-4xl text-red-400 mb-3"></i>
                <p class="text-gray-600 font-medium">Erro ao carregar dados: ${t.message}</p>
            </div>`}}function ys(){const e=o=>{let s='<option value="all">-- Todas as opções --</option>';const r=Ba(o),i=(n,l=0)=>{const d="  ".repeat(l)+(l>0?"↳ ":"");s+=`<option value="${n.id}">${d}${n.name}</option>`,n.children.forEach(c=>i(c,l+1))};return r.forEach(n=>i(n)),s},t=document.getElementById("filterNaturezaId"),a=document.getElementById("filterCostCenterId");t&&(t.innerHTML=e($.natures)),a&&(a.innerHTML=e($.costCenters))}function ws(){const e=document.getElementById("summary-section");if(!e)return;const t=$.currentTab==="receivables";let o=t?$.receivables:$.payables;$.searchQuery&&(o=o.filter(c=>c.description&&c.description.toLowerCase().includes($.searchQuery)||c.entity&&c.entity.toLowerCase().includes($.searchQuery)||c.notes&&c.notes.toLowerCase().includes($.searchQuery)));const s=o.reduce((c,u)=>c+u.amount,0),r=o.filter(c=>c.status==="paid").reduce((c,u)=>c+u.amount,0),i=o.filter(c=>c.status==="pending"&&!Bt(c.dueDate,c.status)).reduce((c,u)=>c+u.amount,0),n=o.filter(c=>Bt(c.dueDate,c.status)).reduce((c,u)=>c+u.amount,0),l=t?"emerald":"red",d=t?"Receitas":"Despesas";e.innerHTML=`
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-center relative overflow-hidden">
            <div class="absolute right-0 top-0 h-full w-1 bg-gray-800"></div>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Total do Período</p>
            <p class="text-2xl font-black text-gray-900">${ne(s)}</p>
        </div>
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-center relative overflow-hidden">
            <div class="absolute right-0 top-0 h-full w-1 bg-blue-500"></div>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">A Vencer / Prov.</p>
            <p class="text-xl font-bold text-blue-600">${ne(i)}</p>
        </div>
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-center relative overflow-hidden">
            <div class="absolute right-0 top-0 h-full w-1 bg-${l}-500"></div>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">${d} Baixadas</p>
            <p class="text-xl font-bold text-${l}-600">${ne(r)}</p>
        </div>
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-center relative overflow-hidden">
            <div class="absolute right-0 top-0 h-full w-1 bg-red-600"></div>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Atrasadas</p>
            <p class="text-xl font-bold ${n>0?"text-red-600":"text-gray-400"}">${ne(n)}</p>
        </div>
    `}function Mt(){const e=document.getElementById("list-container");if(!e)return;const t=$.currentTab==="receivables",a=t?$.receivables:$.payables;let o=a;if($.statusFilter!=="all"&&(o=a.filter(l=>{const d=Bt(l.dueDate,l.status);return $.statusFilter==="overdue"?d:$.statusFilter==="pending"?l.status==="pending"&&!d:l.status===$.statusFilter})),$.searchQuery&&(o=o.filter(l=>l.description&&l.description.toLowerCase().includes($.searchQuery)||l.entity&&l.entity.toLowerCase().includes($.searchQuery)||l.notes&&l.notes.toLowerCase().includes($.searchQuery))),o.sort((l,d)=>new Date(l.dueDate)-new Date(d.dueDate)),o.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16 bg-white border border-dashed border-gray-300 rounded-xl mt-2">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i class="bi bi-inbox text-2xl text-gray-400"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-1">Nenhum registo encontrado</h3>
                <p class="text-sm text-gray-500">Tente limpar os filtros ou faça um novo lançamento.</p>
            </div>
        `;return}const s=new Map($.natures.map(l=>[l.id,l.name])),r=new Map($.establishments.map(l=>[l.id,l])),i=t?"receivable":"payable",n=t?"text-emerald-600":"text-red-600";e.innerHTML=o.map(l=>{const d=xs(l.dueDate),c=l.status==="paid",u=Bt(l.dueDate,l.status);let p="";c?p='<span class="bg-gray-100 text-gray-600 border border-gray-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide"><i class="bi bi-check2-circle mr-1"></i>Baixado</span>':u?p='<span class="bg-red-50 text-red-600 border border-red-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide"><i class="bi bi-exclamation-circle mr-1"></i>Atrasado</span>':p='<span class="bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide"><i class="bi bi-clock-history mr-1"></i>A Vencer</span>';const v=l.naturezaId?s.get(l.naturezaId)||"Não Categorizado":"Geral",f=r.get(l.establishmentId);let x="";if(f){const L=f.type==="Matriz"?"bi-building":"bi-shop";x=`<span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200 flex items-center whitespace-nowrap w-max" title="Unidade: ${f.name}"><i class="bi ${L} mr-1 opacity-60"></i> ${f.name}</span>`}else x='<span class="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-bold border border-gray-200 flex items-center whitespace-nowrap w-max"><i class="bi bi-geo-alt mr-1 opacity-60"></i> Atual</span>';const h=JSON.stringify(l).replace(/'/g,"&apos;"),E=$.selectedIds.has(l.id),k=!!l.recurrenceId?'<i class="bi bi-arrow-repeat text-indigo-400 ml-1.5 text-xs" title="Lançamento Recorrente"></i>':"",D=l.entity?`<span class="text-xs text-gray-500 font-medium truncate block"><i class="bi bi-person mr-1 opacity-50"></i>${l.entity}</span>`:"";return`
        <div class="financial-row md:grid md:grid-cols-12 md:gap-4 md:items-center bg-white p-4 md:p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer relative group flex flex-col gap-3 ${E?"bg-indigo-50/30":""}"
             data-type="${i}"
             data-item='${h}'>
            
            <div class="absolute left-0 top-0 bottom-0 w-1 ${c?"bg-gray-300":t?"bg-emerald-500":"bg-red-500"}"></div>

            <div class="absolute right-4 top-4 md:relative md:right-auto md:top-auto md:col-span-1 md:flex md:justify-center z-10">
                <input type="checkbox" value="${l.id}" class="item-checkbox w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${E?"checked":""}>
            </div>

            <div class="flex items-center gap-3 md:col-span-2">
                <div class="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-lg w-12 h-12 flex-shrink-0 shadow-sm">
                    <span class="text-base font-black text-gray-800 leading-none">${d.day}</span>
                    <span class="text-[9px] font-bold text-gray-500 uppercase leading-none mt-1">${d.month}</span>
                </div>
                <div class="md:hidden flex-1 pr-8">
                    <p class="font-bold text-sm text-gray-900 leading-tight ${c?"line-through text-gray-400":""}">${l.description}</p>
                    ${D}
                </div>
            </div>

            <div class="md:col-span-4 hidden md:flex flex-col justify-center">
                <p class="font-bold text-sm text-gray-900 truncate ${c?"line-through text-gray-400":""}" title="${l.description}">${l.description}</p>
                ${D}
                <div class="flex items-center gap-2 mt-1">
                    ${x}
                    <p class="text-[10px] text-gray-500 flex items-center font-medium">
                        <i class="bi bi-tag mr-1 opacity-50"></i> ${v} ${k}
                    </p>
                </div>
            </div>

            <div class="md:hidden flex flex-wrap items-center gap-2 mt-1">
                ${x}
                <span class="text-[10px] px-2 py-1 rounded bg-gray-100 text-gray-600 font-bold border border-gray-200 flex items-center">
                    <i class="bi bi-tag mr-1.5 opacity-50"></i> ${v} ${k}
                </span>
            </div>

            <div class="md:col-span-2 md:text-center flex justify-start md:justify-center">
                ${p}
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:justify-end border-t border-gray-100 md:border-t-0 pt-3 md:pt-0 mt-1 md:mt-0">
                <span class="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wide">Valor:</span>
                <p class="font-black text-base ${c?"text-gray-400":n}">${ne(l.amount)}</p>
            </div>

            <div class="absolute right-4 bottom-4 md:relative md:right-auto md:bottom-auto md:col-span-1 md:flex md:justify-center z-10 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-white/90 md:bg-transparent rounded-lg p-1 md:p-0">
                ${c?"":`
                    <button data-action="mark-as-paid" data-type="${i}" data-id="${l.id}" class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 border border-transparent hover:border-green-200 transition-all shadow-sm" title="Dar Baixa">
                        <i class="bi bi-check2-all text-lg"></i>
                    </button>
                `}
                <button data-action="delete" data-type="${i}" data-id="${l.id}" class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all shadow-sm" title="Excluir">
                    <i class="bi bi-trash3 text-sm"></i>
                </button>
            </div>
        </div>
        `}).join("")}async function Gl(e,t){const a=new Date().toISOString().split("T")[0];try{await(e==="payable"?zi(t,a):Wi(t,a)),g("Baixa Realizada","O lançamento foi registado como pago.","success"),await ke()}catch(o){g("Erro",o.message,"error")}}async function Ql(e,t){if(!!!t.recurrenceId){await V("Excluir Lançamento","Tem certeza? Essa ação apagará o registo do seu fluxo de caixa.")&&await ks(e,[t.id]);return}Yl(e,t)}function Yl(e,t){const a=document.getElementById("genericModal"),s=(e==="payable"?$.payables:$.receivables).filter(d=>d.recurrenceId===t.recurrenceId).sort((d,c)=>new Date(d.dueDate)-new Date(c.dueDate));a.innerHTML=`
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
                ${s.map(d=>{const c=d.id===t.id,u=d.status==="paid",p=xs(d.dueDate);return`
                    <label class="flex items-center gap-4 p-3 bg-white rounded-xl border ${c?"border-red-400 ring-1 ring-red-100 shadow-sm bg-red-50/30":"border-gray-200 hover:bg-gray-50"} cursor-pointer transition-all">
                        <input type="checkbox" class="modal-item-checkbox w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" value="${d.id}" ${c?"checked":""}>
                        
                        <div class="flex-shrink-0 w-11 h-11 bg-white rounded-lg flex flex-col items-center justify-center border border-gray-200 shadow-sm">
                            <span class="text-sm font-black text-gray-800 leading-none">${p.day}</span>
                            <span class="text-[8px] font-bold text-gray-500 uppercase leading-none mt-1">${p.month}</span>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-bold text-gray-800 truncate">${d.description}</p>
                            <p class="text-xs font-medium text-gray-500 mt-0.5">${ne(d.amount)} ${u?'<span class="text-emerald-600 font-bold ml-1">(Baixado)</span>':""}</p>
                        </div>
                        
                        ${c?'<span class="text-[10px] bg-red-600 text-white px-2 py-1 rounded-md font-bold uppercase tracking-wider shadow-sm">Alvo</span>':""}
                    </label>
                    `}).join("")}
            </div>

            <div class="p-4 border-t border-gray-200 bg-gray-50">
                <button id="confirm-batch-delete" class="w-full py-3 bg-red-600 text-white font-black uppercase tracking-wider rounded-xl hover:bg-red-700 shadow-lg active:scale-[0.98] transition-all flex justify-center items-center gap-2">
                    Excluir Selecionados
                </button>
            </div>
        </div>
    `,a.style.display="flex";const r=a.querySelector("#modal-select-all"),i=a.querySelectorAll(".modal-item-checkbox"),n=a.querySelector("#confirm-batch-delete");r.addEventListener("change",d=>{i.forEach(c=>c.checked=d.target.checked),l()}),i.forEach(d=>d.addEventListener("change",l));function l(){const d=Array.from(i).filter(c=>c.checked).length;n.innerHTML=d>0?`<i class="bi bi-trash3"></i> Excluir ${d} Parcela(s)`:"Selecione para excluir",n.disabled=d===0,d===0?n.classList.add("opacity-50","cursor-not-allowed","bg-gray-400"):n.classList.remove("opacity-50","cursor-not-allowed","bg-gray-400")}n.addEventListener("click",async()=>{const d=Array.from(i).filter(u=>u.checked).map(u=>u.value);if(d.length===0)return;a.style.display="none",await V("Confirmar Ação",`Tem certeza que deseja apagar estas ${d.length} parcelas permanentemente?`)&&await ks(e,d)}),l()}async function ks(e,t){try{t.length===1?e==="payable"?await Oi(t[0]):await _i(t[0]):await Ko(e==="payable"?"payables":"receivables",t),g("Sucesso",`${t.length} registo(s) limpo(s) do sistema.`,"success"),$.selectedIds.clear(),Pe(),await ke()}catch(a){g("Erro",a.message,"error")}}async function Xl(e,t){const o=e==="nature"?Ri:ji;if(await V("Apagar Categoria","Tem certeza? Apagar um item pai também apagará as suas subcategorias."))try{await o(t),ba(e==="nature"?"nature":"cost-center")}catch(r){g("Erro",r.message,"error")}}function Zl(){const e=document.getElementById("genericModal");e.innerHTML=`
        <div class="modal-content max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            <div class="p-8 text-center relative">
                <button type="button" data-action="close-modal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                    <i class="bi bi-gear-fill text-2xl text-gray-600"></i>
                </div>
                <h2 class="text-xl font-black text-gray-900 mb-6">Configurações de ERP</h2>
                <div class="space-y-3">
                    <button data-action="manage-natures" class="w-full py-4 px-5 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 flex items-center justify-between group border border-indigo-100 transition-colors shadow-sm">
                        <span class="flex items-center gap-3"><i class="bi bi-tags-fill"></i> Plano de Contas</span>
                        <i class="bi bi-chevron-right text-indigo-400 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                    <button data-action="manage-cost-centers" class="w-full py-4 px-5 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 flex items-center justify-between group border border-blue-100 transition-colors shadow-sm">
                        <span class="flex items-center gap-3"><i class="bi bi-diagram-3-fill"></i> Centros de Custo</span>
                        <i class="bi bi-chevron-right text-blue-400 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </div>
            </div>
        </div>
    `,e.style.display="flex"}function ta(e,t=null){const a=document.getElementById("genericModal"),o=e==="payable",s=o?"red":"emerald",r=t?"Editar Lançamento":"Novo Lançamento",i=$.establishments.map(L=>{const A=t?t.establishmentId===L.id:L.id===m.establishmentId;return`<option value="${L.id}" ${A?"selected":""}>${L.type==="Matriz"?"🏢":"📍"} ${L.name}</option>`}).join(""),n=(L,A)=>{let j='<option value="">-- Selecione --</option>';const T=Ba(L),M=(q,H=0)=>{const O="  ".repeat(H)+(H>0?"↳ ":""),R=q.id===A?"selected":"";j+=`<option value="${q.id}" ${R}>${O}${q.name}</option>`,q.children.forEach(U=>M(U,H+1))};return T.forEach(q=>M(q)),j},d=[{value:"dinheiro",label:"Dinheiro"},{value:"pix",label:"PIX"},{value:"cartao_credito",label:"Cartão de Crédito"},{value:"cartao_debito",label:"Cartão de Débito"},{value:"transferencia",label:"Transferência Bancária"},{value:"boleto",label:"Boleto"},{value:"outros",label:"Outros"}].map(L=>`<option value="${L.value}" ${t?.paymentMethod===L.value?"selected":""}>${L.label}</option>`).join("");a.innerHTML=`
        <div class="modal-content max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden m-4 flex flex-col max-h-[90vh]">
            
            <div class="bg-${s}-600 px-6 py-5 flex justify-between items-center flex-shrink-0 relative overflow-hidden">
                <div class="absolute right-0 top-0 opacity-10 pointer-events-none">
                    <svg width="120" height="120" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="white" stroke-width="20"/></svg>
                </div>
                
                <div class="flex items-center gap-4 relative z-10">
                    <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-sm border border-white/30 shadow-inner">
                        <i class="bi ${o?"bi-arrow-down-right":"bi-arrow-up-right"} text-2xl"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-black text-white tracking-wide">${r}</h2>
                        <p class="text-xs text-${s}-100 font-medium uppercase tracking-widest mt-0.5">${o?"Contas a Pagar / Despesa":"Contas a Receber / Receita"}</p>
                    </div>
                </div>
                <button type="button" data-action="close-modal" class="relative z-10 text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                    <i class="bi bi-x-lg text-xl font-bold"></i>
                </button>
            </div>
            
            <form id="financial-form" class="flex-1 overflow-y-auto custom-scrollbar bg-gray-50">
                <div class="p-6 space-y-6">

                    ${t?"":`
                    <div class="bg-white p-1.5 rounded-xl flex border border-gray-200 shadow-sm">
                        <button type="button" class="mode-btn flex-1 py-2 text-xs uppercase tracking-wider font-bold rounded-lg shadow-sm bg-gray-900 text-white transition-all" data-mode="single">Único</button>
                        <button type="button" class="mode-btn flex-1 py-2 text-xs uppercase tracking-wider font-bold rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all" data-mode="installment">Parcelado</button>
                        <button type="button" class="mode-btn flex-1 py-2 text-xs uppercase tracking-wider font-bold rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all" data-mode="repeat">Recorrente</button>
                    </div>
                    `}

                    <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-5">
                        
                        <div class="md:col-span-3">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Unidade / Filial</label>
                            <select name="establishmentId" required class="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-${s}-500 outline-none text-sm font-bold text-gray-800 transition-shadow">
                                ${i}
                            </select>
                        </div>

                        <div class="md:col-span-1">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Valor Total (R$)</label>
                            <div class="relative">
                                <input type="number" step="0.01" name="amount" required 
                                    class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-${s}-500 outline-none font-black text-xl text-gray-900 transition-shadow" 
                                    value="${t?.amount||""}" placeholder="0.00">
                            </div>
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Data de Vencimento</label>
                            <input type="date" name="dueDate" required 
                                class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-${s}-500 outline-none font-bold text-gray-800 text-lg transition-shadow" 
                                value="${t?.dueDate||new Date().toISOString().split("T")[0]}">
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Descrição / Título</label>
                            <input type="text" name="description" required 
                                class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-${s}-500 outline-none font-bold text-gray-800 text-base transition-shadow" 
                                value="${t?.description||""}" placeholder="Ex: Compra de Estoque, Energia, Salário...">
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">${o?"Fornecedor / Favorecido":"Cliente / Pagador"}</label>
                            <div class="relative">
                                <i class="bi bi-person absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                                <input type="text" name="entity" 
                                    class="w-full pl-10 pr-3 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-${s}-500 outline-none text-sm text-gray-800 transition-shadow" 
                                    value="${t?.entity||""}" placeholder="Nome de quem paga ou recebe...">
                            </div>
                        </div>
                    </div>

                    <div id="recurrence-options" class="hidden animate-fade-in bg-indigo-50 p-5 rounded-2xl border border-indigo-100 shadow-inner">
                        <div class="flex flex-col md:flex-row gap-5 items-center">
                            <div class="w-full md:w-1/2">
                                <label class="block text-[10px] font-black text-indigo-800 uppercase tracking-widest mb-2">Quantidade de Meses</label>
                                <div class="flex items-center shadow-sm rounded-xl overflow-hidden border border-indigo-200">
                                    <button type="button" id="btn-minus" class="w-12 h-12 bg-white text-indigo-600 hover:bg-indigo-100 font-black text-xl transition-colors">-</button>
                                    <input type="number" id="installments-input" name="installments" min="2" max="60" value="2" 
                                        class="w-full h-12 border-x border-indigo-100 text-center font-black text-lg text-indigo-900 outline-none bg-indigo-50/50 appearance-none">
                                    <button type="button" id="btn-plus" class="w-12 h-12 bg-white text-indigo-600 hover:bg-indigo-100 font-black text-xl transition-colors">+</button>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2 flex items-center justify-center">
                                <div class="text-sm text-indigo-900 bg-white px-4 py-3 rounded-xl border border-indigo-100 w-full shadow-sm">
                                    <span id="recurrence-summary">Calculando...</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Plano de Contas</label>
                            <select name="naturezaId" class="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-${s}-500 outline-none text-sm font-medium text-gray-700 transition-shadow">
                                ${n($.natures,t?.naturezaId)}
                            </select>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Centro de Custo</label>
                            <select name="centroDeCustoId" class="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-${s}-500 outline-none text-sm font-medium text-gray-700 transition-shadow">
                                ${n($.costCenters,t?.centroDeCustoId)}
                            </select>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Forma de Pagamento</label>
                            <select name="paymentMethod" class="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-${s}-500 outline-none text-sm font-medium text-gray-700 transition-shadow">
                                <option value="">-- Selecione --</option>
                                ${d}
                            </select>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="md:col-span-1">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Nº do Documento / Recibo</label>
                            <input type="text" name="documentNumber" 
                                class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-${s}-500 outline-none text-sm text-gray-800 transition-shadow" 
                                value="${t?.documentNumber||""}" placeholder="Ex: NF-12345">
                        </div>
                        <div class="md:col-span-1">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Observações Adicionais</label>
                            <textarea name="notes" rows="1" class="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-${s}-500 outline-none text-sm text-gray-700 font-medium resize-none transition-shadow">${t?.notes||""}</textarea>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
                        <label class="flex items-center gap-4 cursor-pointer group">
                            <div class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="status" id="status-toggle" class="sr-only peer" ${t?.status==="paid"?"checked":""}>
                                <div class="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-${s}-500 shadow-inner"></div>
                            </div>
                            <div>
                                <span class="block text-sm font-black text-gray-800 group-hover:text-${s}-700 transition-colors uppercase tracking-wide">Marcar como ${o?"Pago":"Recebido"}</span>
                                <span class="block text-[10px] text-gray-400 font-medium mt-0.5">Retira a transação do status de pendente.</span>
                            </div>
                        </label>
                        
                        <div id="payment-date-wrapper" class="${t?.status==="paid"?"":"hidden"} flex-1 md:max-w-[250px] animate-fade-in border-l md:border-l-2 border-gray-100 pl-0 md:pl-5 pt-4 md:pt-0 mt-4 md:mt-0">
                            <label class="block text-[10px] font-bold text-${s}-600 uppercase tracking-widest mb-1.5">Data da Baixa Bancária</label>
                            <input type="date" name="paymentDate" 
                                class="w-full p-2.5 bg-${s}-50 border border-${s}-200 text-${s}-800 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-${s}-500 shadow-sm transition-shadow" 
                                value="${t?.paymentDate||new Date().toISOString().split("T")[0]}">
                        </div>
                    </div>
                </div>

                <div class="p-6 border-t border-gray-200 bg-white flex flex-col-reverse md:flex-row gap-3 flex-shrink-0 z-10 relative shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                    <button type="button" data-action="close-modal" class="w-full md:w-auto py-3.5 px-6 bg-gray-100 text-gray-700 font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-gray-200 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" class="w-full flex-1 py-3.5 px-6 bg-${s}-600 text-white font-black uppercase tracking-wider text-sm rounded-xl hover:bg-${s}-700 shadow-lg shadow-${s}-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <i class="bi bi-save2"></i> <span>${t?"Salvar Alterações":"Confirmar Lançamento"}</span>
                    </button>
                </div>
            </form>
        </div>`,a.style.display="flex";const c=a.querySelector("#financial-form");let u="single",p=2;const v=c.querySelector('[name="amount"]'),f=c.querySelector("#recurrence-options"),x=c.querySelector("#recurrence-summary"),h=c.querySelector("#installments-input"),E=c.querySelector("#status-toggle"),S=c.querySelector("#payment-date-wrapper"),k=c.querySelector('[name="paymentDate"]'),D=()=>{if(u==="single")return;const L=parseFloat(v.value)||0;if(p=parseInt(h.value)||2,L===0){x.innerHTML='<span class="text-xs text-indigo-400 font-medium">Digite o valor total...</span>';return}if(u==="installment"){const A=L/p;x.innerHTML=`
                <div>
                    <span class="block text-[10px] text-indigo-400 uppercase tracking-widest font-bold mb-1">Simulação do Parcelamento</span>
                    <span class="font-black text-lg text-indigo-700 block leading-tight">${p}x de ${ne(A)}</span>
                    <span class="text-xs text-indigo-500 font-medium">Total: ${ne(L)}</span>
                </div>
            `}else if(u==="repeat"){const A=L*p;x.innerHTML=`
                <div>
                    <span class="block text-[10px] text-indigo-400 uppercase tracking-widest font-bold mb-1">Geração Recorrente Fixa</span>
                    <span class="font-black text-lg text-indigo-700 block leading-tight">${p}x de ${ne(L)}</span>
                    <span class="text-xs text-indigo-500 font-medium">Lançamento Total: ${ne(A)}</span>
                </div>
            `}};t||a.querySelectorAll(".mode-btn").forEach(L=>{L.addEventListener("click",A=>{if(a.querySelectorAll(".mode-btn").forEach(j=>{j.classList.remove("bg-gray-900","text-white","shadow-sm"),j.classList.add("text-gray-500","hover:bg-gray-100")}),A.target.classList.add("bg-gray-900","text-white","shadow-sm"),A.target.classList.remove("text-gray-500","hover:bg-gray-100"),u=A.target.dataset.mode,u==="single")f.classList.add("hidden");else{f.classList.remove("hidden");const j=f.querySelector("label");j.textContent=u==="installment"?"Número de Parcelas":"Repetir por quantos meses?",D()}})}),v.addEventListener("input",D),h&&(h.addEventListener("input",D),c.querySelector("#btn-minus").addEventListener("click",()=>{let L=parseInt(h.value)||2;L>2&&(h.value=L-1,D())}),c.querySelector("#btn-plus").addEventListener("click",()=>{let L=parseInt(h.value)||2;L<60&&(h.value=L+1,D())})),E.addEventListener("change",()=>{E.checked?(S.classList.remove("hidden"),k.required=!0):(S.classList.add("hidden"),k.required=!1)}),c.addEventListener("submit",async L=>{L.preventDefault();const A=c.querySelector('button[type="submit"]'),j=A.innerHTML;A.disabled=!0,A.innerHTML='<div class="loader-small border-white"></div> A gravar...';const T=new FormData(c),M=E.checked,q=parseFloat(T.get("amount"));let H=q,O=1;!t&&u!=="single"&&(O=parseInt(T.get("installments")),u==="repeat"&&(H=q*O));const R={establishmentId:T.get("establishmentId"),description:T.get("description"),amount:H,dueDate:T.get("dueDate"),naturezaId:T.get("naturezaId")||null,centroDeCustoId:T.get("centroDeCustoId")||null,entity:T.get("entity")||null,paymentMethod:T.get("paymentMethod")||null,documentNumber:T.get("documentNumber")||null,notes:T.get("notes"),status:M?"paid":"pending",paymentDate:M?T.get("paymentDate"):null,installments:O};O>1&&!t&&(R.recurrenceId=self.crypto.randomUUID());try{t?(await(o?Hi(t.id,R):Ui(t.id,R)),g("Sucesso","Atualizado com sucesso!","success")):(await(o?Fi(R):Vi(R)),g("Sucesso","Lançamento criado!","success")),document.getElementById("genericModal").style.display="none",ke()}catch(U){g("Erro",U.message||"Erro ao salvar","error"),A.disabled=!1,A.innerHTML=j}})}const Kl=e=>I("/api/commissions/calculate",{method:"POST",body:JSON.stringify(e)}),ed=e=>I("/api/commissions/save",{method:"POST",body:JSON.stringify(e)}),td=(e,t)=>{const a=new URLSearchParams({startDate:e,endDate:t}).toString();return I(`/api/commissions/stats?${a}`)},ad=(e={})=>{Object.keys(e).forEach(o=>(e[o]===void 0||e[o]===null||e[o]==="")&&delete e[o]);const t=new URLSearchParams(e).toString(),a=`/api/commissions/history${t?"?"+t:""}`;return I(a)},od=e=>I(`/api/commissions/report/${e}`,{method:"DELETE"}),At=new Date,go=new Date(At.getFullYear(),At.getMonth(),1),N={currentTab:"dashboard",professionals:[],calculationResult:null,historyData:[],periodString:"",dashStartDate:go.toISOString().split("T")[0],dashEndDate:At.toISOString().split("T")[0],dashStats:{revenue:0,commissions:0},histStartDate:go.toISOString().split("T")[0],histEndDate:At.toISOString().split("T")[0],histProfessionalId:"all"};let wt=null;const Qe=document.getElementById("content");async function sd(){try{N.professionals=await re(m.establishmentId)}catch(e){console.error("Erro profissionais",e)}bd(),rd(),Qt(),Rt("dashboard")}function rd(){wt&&Qe.removeEventListener("click",wt),wt=e=>{const t=e.target.closest("button");if(!t)return;const a=t.dataset.action,o=t.dataset.id,s=t.dataset.idx;switch(a){case"tab-nav":Rt(t.dataset.tab);break;case"toggle-all-profs":id();break;case"back-to-filters":N.calculationResult=null,qt(document.getElementById("commissions-content"));break;case"view-preview-items":gd(s);break;case"save-final-report":ld();break;case"start-new-calc":Rt("calculator");break;case"print-receipt":dd(o);break;case"delete-report":cd(o);break;case"filter-dashboard":Qt();break;case"filter-history":Ma();break}},Qe.addEventListener("click",wt),Qe.oninput=e=>{if(e.target.classList.contains("input-debit")||e.target.classList.contains("input-credit")){const t=e.target.dataset.idx;md(t)}},Qe.onsubmit=e=>{e.target.id==="calc-form"&&(e.preventDefault(),nd())}}async function Qt(){const e=document.getElementById("dash-start"),t=document.getElementById("dash-end");e&&(N.dashStartDate=e.value),t&&(N.dashEndDate=t.value);const a=document.getElementById("dashboard-stats-container");a&&(a.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>');try{const o=await td(N.dashStartDate,N.dashEndDate);N.dashStats={revenue:o.totalRevenue||0,commissions:o.totalCommissionsPaid||0},N.currentTab==="dashboard"&&Ss(document.getElementById("commissions-content"))}catch(o){console.error(o),a&&(a.innerHTML='<p class="text-red-500 text-center">Erro ao carregar dados.</p>')}}async function Ma(){const e=document.getElementById("hist-start"),t=document.getElementById("hist-end"),a=document.getElementById("hist-prof");e&&(N.histStartDate=e.value),t&&(N.histEndDate=t.value),a&&(N.histProfessionalId=a.value);const o=document.getElementById("history-list-container");if(o){o.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>';try{const s=await ad({startDate:N.histStartDate,endDate:N.histEndDate,professionalId:N.histProfessionalId});N.historyData=s,$s(o,s)}catch{o.innerHTML='<p class="text-red-500 text-center py-4">Erro ao buscar registros.</p>'}}}function id(){const e=document.querySelectorAll(".prof-checkbox"),t=Array.from(e).every(a=>a.checked);e.forEach(a=>a.checked=!t)}async function nd(){const e=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(r=>r.value);if(e.length===0)return g("Atenção","Selecione profissionais","error");const t={professionalIds:e,startDate:document.getElementById("start-date").value,endDate:document.getElementById("end-date").value,calculationTypes:{services:document.getElementById("type-services").checked,products:document.getElementById("type-products").checked,packages:document.getElementById("type-packages").checked}},a=new Date(t.startDate+"T00:00:00").toLocaleDateString("pt-BR"),o=new Date(t.endDate+"T00:00:00").toLocaleDateString("pt-BR");N.periodString=`${a} a ${o}`;const s=document.getElementById("commissions-content");s.innerHTML='<div class="flex flex-col items-center justify-center py-20"><div class="loader mb-4"></div><p class="text-gray-500 animate-pulse">Calculando...</p></div>';try{const r=await Kl(t);N.calculationResult=r.map(i=>({...i,extraDebit:0,extraCredit:0,finalValue:i.summary.totalCommission,notes:""})),qt(s)}catch(r){g("Erro",r.message,"error"),N.calculationResult=null,qt(s)}}async function ld(){const e=N.calculationResult.length;if(await V("Confirmar",`Gerar ${e} relatórios? Isso marcará as vendas como pagas.`))try{const a=N.calculationResult.map(o=>{const s=o.items.map(r=>r.originalSaleId).filter(r=>r!=null);return ed({professionalId:o.professionalId,professionalName:o.professionalName,period:N.periodString,processedSalesIds:s,reportData:{...o,summary:{...o.summary,finalValue:o.finalValue,extraDebit:o.extraDebit||0,extraCredit:o.extraCredit||0,notes:o.notes||""}}})});await Promise.all(a),g("Sucesso","Pagamentos registrados!","success"),N.calculationResult=null,Qt(),Rt("history")}catch(a){g("Erro",a.message,"error")}}function dd(e){const t=N.historyData.find(a=>a.id===e);t&&ud(t)}async function cd(e){if(await V("Excluir","Deseja remover este registro? As vendas voltarão a ficar disponíveis para cálculo."))try{await od(e),g("Sucesso","Registro removido.","success"),Ma(),Qt()}catch(a){g("Erro",a.message,"error")}}function ud(e){const{jsPDF:t}=window.jspdf;if(!t)return g("Erro","PDF lib não carregada.","error");const a=new t,o=a.internal.pageSize.getWidth()/2;a.setFontSize(18),a.setFont(void 0,"bold"),a.text("RECIBO DE PAGAMENTO DE COMISSÃO",o,20,{align:"center"}),a.setFontSize(12),a.setFont(void 0,"normal"),a.text(`Profissional: ${e.professionalName}`,15,40),a.text(`Período: ${e.period}`,15,48);const s=[["Comissão Bruta",`R$ ${e.summary.totalCommission.toFixed(2)}`]];e.summary.extraCredit>0&&s.push(["(+) Bônus",`R$ ${e.summary.extraCredit.toFixed(2)}`]),e.summary.extraDebit>0&&s.push(["(-) Descontos",`R$ ${e.summary.extraDebit.toFixed(2)}`]),a.autoTable({startY:60,head:[["Descrição","Valor"]],body:s,theme:"grid"});const r=a.lastAutoTable.finalY+10;a.setFontSize(14),a.setFont(void 0,"bold"),a.text(`Total Líquido: R$ ${(e.summary.finalValue||e.summary.totalCommission).toFixed(2)}`,190,r,{align:"right"}),a.save(`Recibo_${e.professionalName}.pdf`)}function md(e){const t=document.querySelectorAll(`.input-debit[data-idx="${e}"]`),a=document.querySelectorAll(`.input-credit[data-idx="${e}"]`);let o=0,s=0;if(t.forEach(r=>{r.value&&(o=parseFloat(r.value))}),a.forEach(r=>{r.value&&(s=parseFloat(r.value))}),N.calculationResult&&N.calculationResult[e]){const r=N.calculationResult[e];r.extraDebit=o,r.extraCredit=s,r.finalValue=r.summary.totalCommission-o+s,t.forEach(n=>{n!==document.activeElement&&(n.value=o||"")}),a.forEach(n=>{n!==document.activeElement&&(n.value=s||"")}),document.querySelectorAll(`.final-value-display[data-idx="${e}"]`).forEach(n=>n.innerText=`R$ ${r.finalValue.toFixed(2)}`),pd()}}function pd(){const e=N.calculationResult.reduce((a,o)=>a+o.finalValue,0);document.querySelectorAll("#grand-total-display").forEach(a=>a.innerText=`R$ ${e.toFixed(2)}`)}function gd(e){const t=N.calculationResult[e];if(!t)return;const a=t.items.map(o=>`
        <div class="flex justify-between items-center p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50">
            <div class="flex-1">
                <p class="text-sm font-bold text-gray-800">${o.item}</p>
                <p class="text-xs text-gray-500">${new Date(o.date).toLocaleDateString("pt-BR")} • ${o.client}</p>
            </div>
            <div class="text-right">
                <p class="text-sm font-bold text-green-600">R$ ${o.commissionValue.toFixed(2)}</p>
                <p class="text-xs text-gray-400">${o.commissionRate}% de R$ ${o.value.toFixed(2)}</p>
            </div>
        </div>
    `).join("");se({title:"Detalhes da Comissão",contentHTML:`<div class="bg-gray-50 p-3 rounded-lg mb-4 flex justify-between items-center"><div><p class="text-xs text-gray-500">Profissional</p><p class="font-bold text-gray-800">${t.professionalName}</p></div><div class="text-right"><p class="text-xs text-gray-500">Total Itens</p><p class="font-bold text-gray-800">${t.items.length}</p></div></div><div class="border rounded-lg overflow-hidden max-h-[60vh] overflow-y-auto">${a}</div>`,maxWidth:"max-w-md"})}function qt(e){if(N.calculationResult){const t=N.calculationResult,a=t.reduce((r,i)=>r+i.finalValue,0),o=t.map((r,i)=>`
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
                <div class="flex justify-between items-start mb-3 border-b border-gray-100 pb-2">
                    <div><h4 class="font-bold text-gray-900 text-lg">${r.professionalName}</h4><p class="text-xs text-gray-500">${r.summary.totalItems} itens</p></div>
                    <div class="text-right"><p class="text-xs text-gray-500">Bruto</p><p class="font-bold text-gray-700">R$ ${r.summary.totalCommission.toFixed(2)}</p></div>
                </div>
                <div class="grid grid-cols-2 gap-3 mb-3">
                    <div><label class="text-xs font-bold text-red-500 uppercase">Desc.</label><input type="number" step="0.01" data-idx="${i}" class="input-debit w-full mt-1 p-2 border border-red-200 rounded-lg bg-red-50 font-bold text-red-700" value="${r.extraDebit||""}"></div>
                    <div><label class="text-xs font-bold text-green-500 uppercase">Bônus</label><input type="number" step="0.01" data-idx="${i}" class="input-credit w-full mt-1 p-2 border border-green-200 rounded-lg bg-green-50 font-bold text-green-700" value="${r.extraCredit||""}"></div>
                </div>
                <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg"><span class="text-sm font-medium">Líquido</span><span class="text-xl font-bold text-indigo-700 final-value-display" data-idx="${i}">R$ ${r.finalValue.toFixed(2)}</span></div>
                <button data-action="view-preview-items" data-idx="${i}" class="w-full mt-3 py-2 text-indigo-600 font-medium text-sm border border-indigo-100 rounded-lg">Ver Detalhes</button>
            </div>`).join(""),s=t.map((r,i)=>`
            <tr class="hover:bg-gray-50"><td class="px-6 py-4 font-bold text-gray-900">${r.professionalName}</td><td class="px-6 py-4 text-right">R$ ${r.summary.totalCommission.toFixed(2)}</td>
            <td class="px-6 py-4 text-right"><input type="number" step="0.01" data-idx="${i}" class="input-debit w-24 text-right border-gray-300 rounded bg-red-50 text-red-700" value="${r.extraDebit||""}"></td>
            <td class="px-6 py-4 text-right"><input type="number" step="0.01" data-idx="${i}" class="input-credit w-24 text-right border-gray-300 rounded bg-green-50 text-green-700" value="${r.extraCredit||""}"></td>
            <td class="px-6 py-4 text-right font-bold text-indigo-700 final-value-display" data-idx="${i}">R$ ${r.finalValue.toFixed(2)}</td>
            <td class="px-6 py-4 text-center"><button data-action="view-preview-items" data-idx="${i}" class="text-indigo-600 hover:underline text-sm">Ver Itens</button></td></tr>`).join("");e.innerHTML=`
            <div class="space-y-4 animate-fade-in pb-20">
                <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 sticky top-0 z-10 flex justify-between items-center">
                    <div><button data-action="back-to-filters" class="text-sm text-gray-500 hover:text-indigo-600">← Voltar</button><h2 class="text-lg md:text-2xl font-bold text-gray-800">Prévia</h2></div>
                    <div class="text-right"><p class="text-xs uppercase font-bold text-gray-500">Total a Pagar</p><p id="grand-total-display" class="text-2xl md:text-3xl font-extrabold text-green-600">R$ ${a.toFixed(2)}</p></div>
                </div>
                <div class="block md:hidden space-y-4">${o}</div>
                <div class="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-bold uppercase">Profissional</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">Bruto</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">(-) Desc.</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">(+) Bônus</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">Líquido</th><th class="px-6 py-3 text-center text-xs font-bold uppercase">Ações</th></tr></thead><tbody>${s}</tbody></table></div>
                <div class="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-200 shadow-lg md:static md:bg-transparent md:border-0 md:shadow-none z-30 flex justify-end gap-3">
                    <button data-action="back-to-filters" class="hidden md:block px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-bold">Cancelar</button>
                    <button data-action="save-final-report" class="w-full md:w-auto px-6 py-4 md:py-3 bg-green-600 text-white rounded-xl font-bold shadow-md hover:bg-green-700 transition">Finalizar Apuração</button>
                </div>
            </div>`}else{const t=new Date().toISOString().split("T")[0],a=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],o=N.professionals.map(s=>`
            <label class="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm active:bg-indigo-50 transition cursor-pointer">
                <input type="checkbox" value="${s.id}" class="prof-checkbox w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500">
                <span class="ml-3 font-medium text-gray-700">${s.name}</span>
            </label>`).join("");e.innerHTML=`
            <form id="calc-form" class="space-y-6 max-w-3xl mx-auto animate-fade-in">
                <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 class="font-bold text-gray-800 mb-4">Novo Cálculo</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="text-xs font-bold text-gray-500 uppercase">Início</label><input type="date" id="start-date" value="${a}" class="w-full mt-1 rounded-lg border-gray-300"></div>
                        <div><label class="text-xs font-bold text-gray-500 uppercase">Fim</label><input type="date" id="end-date" value="${t}" class="w-full mt-1 rounded-lg border-gray-300"></div>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div class="flex justify-between items-center mb-4"><h3 class="font-bold text-gray-800">Profissionais</h3><button type="button" data-action="toggle-all-profs" class="text-sm text-indigo-600 font-medium">Selecionar Todos</button></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">${o}</div>
                </div>
                <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 class="font-bold text-gray-800 mb-3">Tipos</h3>
                    <div class="flex flex-col md:flex-row gap-3">
                        <label class="flex items-center p-3 border rounded-lg bg-gray-50"><input type="checkbox" id="type-services" checked class="text-indigo-600 rounded mr-2"> Serviços</label>
                        <label class="flex items-center p-3 border rounded-lg bg-gray-50"><input type="checkbox" id="type-products" checked class="text-indigo-600 rounded mr-2"> Produtos</label>
                        <label class="flex items-center p-3 border rounded-lg bg-gray-50"><input type="checkbox" id="type-packages" class="text-indigo-600 rounded mr-2"> Pacotes</label>
                    </div>
                </div>
                <button type="submit" class="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition">Calcular Prévia</button>
            </form>`}}function bd(){Qe.innerHTML=`
        <div class="flex flex-col min-h-screen bg-gray-50 pb-20 md:pb-0">
            <header class="bg-white shadow-sm border-b sticky top-0 z-20">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="flex flex-col md:flex-row justify-between h-auto md:h-16 items-center py-2 md:py-0">
                        <div class="flex items-center gap-2 w-full md:w-auto mb-2 md:mb-0">
                            <span class="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </span>
                            <h1 class="text-xl font-bold text-gray-800">Comissões</h1>
                        </div>
                        <nav class="flex w-full md:w-auto space-x-2 bg-gray-50 p-1 rounded-lg overflow-x-auto scrollbar-hide">
                            <button data-action="tab-nav" data-tab="dashboard" id="tab-dashboard" class="flex-1 md:flex-none text-center px-4 py-2 rounded-md text-sm font-medium transition-all">Visão Geral</button>
                            <button data-action="tab-nav" data-tab="calculator" id="tab-calculator" class="flex-1 md:flex-none text-center px-4 py-2 rounded-md text-sm font-medium transition-all">Nova Apuração</button>
                            <button data-action="tab-nav" data-tab="history" id="tab-history" class="flex-1 md:flex-none text-center px-4 py-2 rounded-md text-sm font-medium transition-all">Pesquisar Pagamentos</button>
                        </nav>
                    </div>
                </div>
            </header>
            <main id="commissions-content" class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8"></main>
        </div>
    `}function Rt(e){N.currentTab=e,["dashboard","calculator","history"].forEach(a=>{const o=document.getElementById(`tab-${a}`);a===e?o.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold bg-white text-indigo-600 shadow-sm border border-gray-100":o.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"});const t=document.getElementById("commissions-content");e==="dashboard"&&Ss(t),e==="calculator"&&qt(t),e==="history"&&fd(t)}function Ss(e){const{revenue:t,commissions:a}=N.dashStats,o=t>0?(a/t*100).toFixed(1):0;e.innerHTML=`
        <div class="space-y-6 animate-fade-in">
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-end">
                <div class="flex-1 w-full">
                    <label class="text-xs font-bold text-gray-500 uppercase">Data Inicial</label>
                    <input type="date" id="dash-start" value="${N.dashStartDate}" class="w-full mt-1 rounded-lg border-gray-300">
                </div>
                <div class="flex-1 w-full">
                    <label class="text-xs font-bold text-gray-500 uppercase">Data Final</label>
                    <input type="date" id="dash-end" value="${N.dashEndDate}" class="w-full mt-1 rounded-lg border-gray-300">
                </div>
                <button data-action="filter-dashboard" class="w-full md:w-auto bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition h-[42px]">
                    Filtrar
                </button>
            </div>

            <div id="dashboard-stats-container">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-blue-500 border-gray-100">
                        <p class="text-sm text-gray-500 font-bold uppercase">Faturamento (Vendas)</p>
                        <p class="text-2xl font-extrabold text-gray-800 mt-2">R$ ${t.toFixed(2)}</p>
                        <p class="text-xs text-gray-400 mt-1">Total vendido no período</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-green-500 border-gray-100">
                        <p class="text-sm text-gray-500 font-bold uppercase">Comissões Pagas</p>
                        <p class="text-2xl font-extrabold text-gray-800 mt-2">R$ ${a.toFixed(2)}</p>
                        <p class="text-xs text-gray-400 mt-1">Total de relatórios gerados</p>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-6">
                    <h3 class="font-bold text-gray-800 mb-4">Proporção de Comissão sobre Vendas</h3>
                    <div class="relative pt-1">
                        <div class="flex mb-2 items-center justify-between">
                            <div>
                                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                    Impacto
                                </span>
                            </div>
                            <div class="text-right">
                                <span class="text-xs font-semibold inline-block text-indigo-600">
                                    ${o}%
                                </span>
                            </div>
                        </div>
                        <div class="overflow-hidden h-4 mb-4 text-xs flex rounded bg-indigo-100">
                            <div style="width:${Math.min(o,100)}%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"></div>
                        </div>
                        <p class="text-sm text-gray-500">
                            De cada R$ 100,00 vendidos, <strong>R$ ${o}</strong> foram pagos em comissões neste período.
                        </p>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl shadow-xl p-6 md:p-8 text-white text-center mt-6">
                <h2 class="text-xl md:text-2xl font-bold mb-2">Novo Fechamento</h2>
                <p class="text-gray-300 mb-6 text-sm">Pronto para calcular as comissões do próximo período?</p>
                <button data-action="start-new-calc" class="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold shadow hover:bg-gray-100 transition transform hover:scale-105">
                    Iniciar Nova Apuração
                </button>
            </div>
        </div>
    `}function fd(e){const t=N.professionals.map(a=>`<option value="${a.id}" ${N.histProfessionalId===a.id?"selected":""}>${a.name}</option>`).join("");e.innerHTML=`
        <div class="space-y-6">
            <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    Pesquisar Pagamentos
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">De (Data Pagto)</label>
                        <input type="date" id="hist-start" value="${N.histStartDate}" class="w-full mt-1 rounded-lg border-gray-300">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">Até</label>
                        <input type="date" id="hist-end" value="${N.histEndDate}" class="w-full mt-1 rounded-lg border-gray-300">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">Profissional</label>
                        <select id="hist-prof" class="w-full mt-1 rounded-lg border-gray-300">
                            <option value="all">Todos</option>
                            ${t}
                        </select>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                    <button data-action="filter-history" class="w-full md:w-auto bg-indigo-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition">
                        Pesquisar
                    </button>
                </div>
            </div>

            <div id="history-list-container">
                <div class="text-center py-10 text-gray-500">Clique em "Pesquisar" para ver os registros.</div>
            </div>
        </div>
    `,N.historyData.length>0?$s(document.getElementById("history-list-container"),N.historyData):Ma()}function $s(e,t){if(t.length===0){e.innerHTML=`
            <div class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum registro encontrado</h3>
                <p class="mt-1 text-sm text-gray-500">Tente ajustar os filtros de data.</p>
            </div>`;return}const a=t.map(s=>`
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-3 animate-fade-in">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <p class="text-xs text-gray-400 uppercase">Pago em: ${new Date(s.createdAt).toLocaleDateString("pt-BR")}</p>
                    <h4 class="font-bold text-gray-800 text-lg">${s.professionalName}</h4>
                </div>
                <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Pago</span>
            </div>
            <div class="flex justify-between items-end mb-4">
                <p class="text-sm text-gray-500">Ref: ${s.period}</p>
                <p class="text-xl font-bold text-gray-900">R$ ${(s.summary.finalValue||s.summary.totalCommission).toFixed(2)}</p>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <button data-action="print-receipt" data-id="${s.id}" class="flex items-center justify-center py-2 bg-indigo-50 text-indigo-600 rounded-lg font-bold text-sm hover:bg-indigo-100">
                    📄 Recibo
                </button>
                <button data-action="delete-report" data-id="${s.id}" class="flex items-center justify-center py-2 bg-red-50 text-red-600 rounded-lg font-bold text-sm hover:bg-red-100">
                    🗑️ Excluir
                </button>
            </div>
        </div>
    `).join(""),o=t.map(s=>`
        <tr class="hover:bg-gray-50 border-b border-gray-100">
            <td class="px-6 py-4 text-sm text-gray-500">${new Date(s.createdAt).toLocaleDateString("pt-BR")}</td>
            <td class="px-6 py-4 font-bold text-gray-900">${s.professionalName}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${s.period}</td>
            <td class="px-6 py-4 text-right font-bold text-green-600">R$ ${(s.summary.finalValue||s.summary.totalCommission).toFixed(2)}</td>
            <td class="px-6 py-4 text-right space-x-2">
                <button data-action="print-receipt" data-id="${s.id}" class="text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded">Recibo</button>
                <button data-action="delete-report" data-id="${s.id}" class="text-red-600 hover:bg-red-50 px-3 py-1 rounded">Excluir</button>
            </td>
        </tr>
    `).join("");e.innerHTML=`
        <div class="block md:hidden pb-20">${a}</div>
        <div class="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table class="min-w-full text-left">
                <thead class="bg-gray-50 text-gray-500 uppercase text-xs">
                    <tr><th class="px-6 py-3">Data Pagto</th><th class="px-6 py-3">Profissional</th><th class="px-6 py-3">Ref. Período</th><th class="px-6 py-3 text-right">Valor Pago</th><th class="px-6 py-3 text-right">Ações</th></tr>
                </thead>
                <tbody>${o}</tbody>
            </table>
        </div>
    `}const aa=document.getElementById("content");let ye={allPackages:[],catalogForModal:{services:[],products:[]}},kt=null,Be=null;function xd(e=6){let t="";for(let a=0;a<e;a++)t+=`
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
        `;return t}function vd(){const e=document.getElementById("packagesListContainer");if(e){if(ye.allPackages.length===0){e.innerHTML=`
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
            </div>`;return}e.innerHTML=ye.allPackages.map(t=>{const a=t.status==="active",o=JSON.stringify(t).replace(/'/g,"&apos;"),s=t.price||0,r=t.originalPrice||0,i=r>s?r-s:0,n=r>0?(r-s)/r*100:0,l=b(t.name),d=b(t.description||"Sem descrição");return`
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col cursor-pointer"
                 data-action="edit-package" data-package='${o}'>
                
                <div class="p-4 flex-grow">
                    <div class="flex justify-between items-start">
                        <div class="min-w-0 pr-2">
                            <h3 class="text-base font-bold text-gray-900 truncate">${l}</h3>
                            <p class="text-xs text-gray-500 truncate">${d}</p>
                        </div>
                        <span class="text-xs font-semibold py-0.5 px-2 rounded-full flex-shrink-0 ${a?"bg-green-100 text-green-700":"bg-gray-100 text-gray-700"}">
                            ${a?"Ativo":"Inativo"}
                        </span>
                    </div>

                    <div class="mt-3 pt-3 border-t flex justify-between items-end">
                        <div>
                            <p class="text-2xl font-extrabold text-indigo-600">R$ ${s.toFixed(2)}</p>
                            ${i>0?`<p class="text-xs text-gray-500 line-through">De R$ ${r.toFixed(2)}</p>
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
        `}).join("")}}function bo(){const e=document.getElementById("genericModal");e.style.display="none",Be&&e.removeEventListener("click",Be)}async function fo(e=null){const t=document.getElementById("genericModal"),a=!!e,o=e?JSON.parse(JSON.stringify(e.items||[])):[],s=b(e?.name||""),r=b(e?.description||""),i=e?.price||"",n=e?.commissionRate||0,l=e?.validityDays||30,d=`
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
                            <textarea id="packageDescription" rows="2" class="mt-1 w-full p-2 border rounded-md">${r}</textarea>
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
                                <input type="number" id="validityDays" value="${l}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: 30, 60, 90">
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
    `;t.innerHTML=d,t.style.display="flex";const c=t.querySelector("#package-items-list"),u=(v,f)=>{const x=f.querySelector("#originalPrice"),h=v.reduce((E,S)=>E+S.price*S.quantity,0);x&&(x.textContent=`R$ ${h.toFixed(2)}`)},p=v=>{v.length===0?c.innerHTML='<p class="text-center text-gray-500 p-4">Nenhum item adicionado.</p>':c.innerHTML=v.map((f,x)=>{const h=f.type==="service",E=h?"Serviço":"Produto",S=h?"bg-indigo-100 text-indigo-800":"bg-green-100 text-green-800";return`
                <div class="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-200">
                    <div class="flex items-center gap-3 min-w-0">
                        <input type="number" value="${f.quantity}" min="1" class="w-12 p-1 border rounded-md text-sm quantity-input flex-shrink-0" data-index="${x}">
                        <span class="text-xs font-medium px-2 py-0.5 rounded-full ${S}">${E}</span>
                        <span class="font-medium text-gray-800 truncate">${b(f.name)}</span>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="text-sm text-gray-600">R$ ${f.price.toFixed(2)}</span>
                        <button type="button" class="text-red-500 hover:text-red-700 remove-item-btn font-bold" data-index="${x}">&times;</button>
                    </div>
                </div>
            `}).join(""),u(v,t)};p(o),c.addEventListener("change",v=>{if(v.target.classList.contains("quantity-input")){const f=parseInt(v.target.dataset.index,10),x=parseInt(v.target.value,10);x>0&&o[f]&&(o[f].quantity=x,p(o))}}),c.addEventListener("click",v=>{if(v.target.classList.contains("remove-item-btn")){const f=parseInt(v.target.dataset.index,10);o.splice(f,1),p(o)}}),t.querySelector("#add-item-to-package-btn").onclick=()=>hd(v=>{const f=o.find(x=>x.id===v.id&&x.type===v.type);f?f.quantity++:o.push({...v,quantity:1}),p(o)}),Be&&t.removeEventListener("click",Be),Be=async v=>{const f=v.target.closest("button[data-action]");if(!f)return;const x=f.dataset.action;if(v.stopPropagation(),x==="close-modal"&&bo(),x==="save-package"){const h=f,E={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:o,originalPrice:o.reduce((S,k)=>S+k.price*k.quantity,0),price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null,establishmentId:m.establishmentId};if(!E.name||!E.price){g("Erro","Nome do Pacote e Preço Final são obrigatórios.","error");return}if(E.items.length===0){g("Erro","Adicione pelo menos um item ao pacote.","error");return}h.disabled=!0,h.textContent="A salvar...";try{a?await xi(E.id,E):(delete E.id,await fi(E)),g("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),bo(),await Aa()}catch(S){g("Erro",`Não foi possível salvar o pacote: ${S.message}`,"error"),h.disabled=!1,h.textContent="Salvar Pacote"}}},t.addEventListener("click",Be)}function hd(e){let t="";const a=document.createElement("div");a.id="item-selection-modal",a.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[110]";const o={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'},s=l=>{const d=t.toLowerCase(),c=ye.catalogForModal.services.filter(f=>f.name.toLowerCase().includes(d)),u=ye.catalogForModal.products.filter(f=>f.name.toLowerCase().includes(d)),p=c.map(f=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${o.service}</div>
                <span class="flex-grow text-left min-w-0 truncate">${b(f.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${f.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum serviço encontrado.</p>',v=u.map(f=>`
            <button data-action="select-item" data-item-type="product" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${o.product}</div>
                <span class="flex-grow text-left min-w-0 truncate">${b(f.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${f.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum produto encontrado.</p>';l.innerHTML=`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto">${p}</div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-96 overflow-y-auto">${v}</div></div>
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
    `,document.body.appendChild(a);const r=a.querySelector("#item-selection-list"),i=a.querySelector("#item-search-input"),n=()=>{a.remove()};s(r),i.addEventListener("input",()=>{t=i.value,s(r)}),a.addEventListener("click",l=>{const d=l.target.closest('[data-action="select-item"]'),c=l.target.closest('[data-action="close-selection-modal"]');if(d){const{itemType:u,itemId:p}=d.dataset,f=(ye.catalogForModal[u+"s"]||[]).find(x=>x.id===p);f&&(e({...f,type:u}),n())}else(c||l.target===a)&&n()})}async function Aa(){aa.innerHTML=`
        <section id="packages-page" class="p-4 sm:p-6">
             <div class="sticky top-0 z-10 bg-gray-100 sm:bg-transparent pt-3 pb-4 mb-6 -mx-4 -mt-4 sm:mx-0 sm:mt-0 sm:bg-transparent sm:pt-0 sm:pb-0 sm:static">
                <div class="flex justify-between items-center px-4 sm:px-0">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                </div>
            </div>
            
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20">
                ${xd()}
            </div>
            
            <button data-action="new-package" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>
    `,kt&&aa.removeEventListener("click",kt),kt=e=>{if(e.target.closest('[data-action-stop-propagation="true"]')){e.stopPropagation();const o=e.target.closest('[data-action="delete-package"]');if(o){const s=o.dataset.id;V("Excluir Pacote","Tem a certeza que deseja excluir este pacote? Esta ação é irreversível.").then(async r=>{if(r)try{await vi(s),g("Sucesso!","Pacote excluído.","success"),await Aa()}catch(i){g("Erro",`Não foi possível excluir: ${i.message}`,"error")}})}return}const t=e.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!t)return;const a=t.dataset.action;if(a==="new-package")fo(null);else if(a==="edit-package"){const o=JSON.parse(t.dataset.package);fo(o)}},aa.addEventListener("click",kt);try{const[e,t,a]=await Promise.all([$a(m.establishmentId),Se(m.establishmentId),Ut(m.establishmentId)]);ye.allPackages=e,ye.catalogForModal={services:t.filter(o=>o.active),products:a},vd()}catch{document.getElementById("packagesListContainer").innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar pacotes.</p>'}}const yd=document.getElementById("content");let wd=null;async function kd(){const e=b(m.userName||"Usuário"),t=b(oe.currentUser?.email||"E-mail não disponível"),a=m.userName?m.userName.charAt(0):"U";yd.innerHTML=`
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
    `,await Sd()}async function Sd(){const e=document.getElementById("professional-agenda-block");e.innerHTML="";try{const t=m.userProfessionalId;if(t){const a=await qr(t);wd=a,a.photo&&(document.getElementById("user-profile-avatar").src=a.photo);const o=b(a.name);e.innerHTML=`
                <div class="bg-indigo-50 p-4 rounded-lg flex items-center gap-4 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                        <p class="font-semibold text-indigo-800">Você está associado ao profissional: ${o}</p>
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
            `,$d(a.id),document.getElementById("my-blocks-filter").addEventListener("change",r=>Nt(a.id,r.target.value)),Nt(a.id,"future")}else e.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(t){console.error("Erro ao carregar seção de profissional:",t),e.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${b(t.message)}</p>
            </div>
        `}}function $d(e){const t=document.getElementById("block-schedule-form");t.addEventListener("submit",async a=>{a.preventDefault();const o=t.querySelector("#blockDate").value,s=t.querySelector("#blockStartTime").value,r=t.querySelector("#blockEndTime").value,i=t.querySelector("#blockReason").value;if(!o||!s||!r){g("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(s>=r){g("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const n=new Date(`${o}T${s}:00`),l=new Date(`${o}T${r}:00`),d=t.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="A bloquear...";try{await zt({establishmentId:m.establishmentId,professionalId:e,reason:i||"Bloqueado (Meu Perfil)",startTime:n.toISOString(),endTime:l.toISOString()}),g("Sucesso","Agenda bloqueada com sucesso!","success"),t.reset();const c=document.getElementById("my-blocks-filter").value;Nt(e,c)}catch(c){console.error("Erro ao bloquear agenda:",c),g("Erro",`Não foi possível bloquear a agenda: ${c.message}`,"error")}finally{d.disabled=!1,d.textContent="Bloquear Agenda"}})}async function Nt(e,t="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const o=new Date;let s,r;t==="history"?(r=new Date,s=new Date,s.setFullYear(s.getFullYear()-1)):(s=new Date,r=new Date,r.setFullYear(r.getFullYear()+1));let n=(await Ot(m.establishmentId,s.toISOString(),r.toISOString(),e)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));t==="history"?n=n.filter(l=>l.endTime<o).sort((l,d)=>d.startTime-l.startTime):n=n.filter(l=>l.endTime>=o).sort((l,d)=>l.startTime-d.startTime),n.length>0?(a.innerHTML=n.map(l=>{const d=l.startTime.toLocaleDateString("pt-BR"),c=`${l.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${l.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`,u=l.endTime<new Date,p=b(l.reason||"Sem motivo");return`
                    <div class="flex items-center justify-between p-3 ${u?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${d} das ${c}</p>
                            <p class="text-sm text-gray-600">${p}</p>
                        </div>
                        <button data-block-id="${l.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(l=>{l.addEventListener("click",async d=>{const c=d.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await va(c),g("Sucesso","Bloqueio removido.","success"),Nt(e,t)}catch(u){console.error("Erro ao remover bloqueio:",u),g("Erro",`Não foi possível remover o bloqueio: ${u.message}`,"error")}})})):a.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${t==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(o){console.error("Erro ao carregar bloqueios:",o),a.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${b(o.message)}</p>`}}let xo=!1;async function jt(e){if(!e)return;e.innerHTML=`
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
    `;const t=document.getElementById("hierarchy-list-container"),a=document.getElementById("est-parent");try{const s=(await Oe()).matrizes||[];if(a&&(a.innerHTML='<option value="">Nenhuma (Criar como Matriz Independente)</option>'),s.length===0)t.innerHTML=`
                <div class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
                    <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="bi bi-building-add text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">A sua rede está vazia</h3>
                    <p class="text-gray-500 max-w-md mx-auto mb-6">Comece por criar a sua primeira Matriz ou Loja principal para expandir o seu negócio.</p>
                </div>
            `;else{let r="";s.forEach(i=>{if(a&&!i.isOrphanBranch){const l=document.createElement("option");l.value=i.id,l.textContent=i.name,a.appendChild(l)}const n=i.isMatriz||!i.parentId?'<span class="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">📍 UNIDADE</span>';r+=`
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
                `,i.branches&&i.branches.length>0?i.branches.forEach(l=>{r+=`
                            <div class="border border-gray-100 rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer bg-gray-50 flex justify-between items-center group/item"
                                 onclick="event.stopPropagation(); window.navigateTo('estabelecimento-section', { id: '${l.id}' })">
                                <div class="pl-2 border-l-2 border-indigo-400">
                                    <h5 class="font-bold text-gray-800 text-sm group-hover/item:text-indigo-700 transition-colors">${l.name}</h5>
                                    <p class="text-[11px] text-gray-500 mt-0.5 truncate max-w-[150px]">
                                        <i class="bi bi-geo-alt"></i> ${l.address||"Configurar morada"}
                                    </p>
                                </div>
                                <i class="bi bi-chevron-right text-gray-300 group-hover/item:text-indigo-500 transition-all"></i>
                            </div>
                        `}):r+=`
                        <div class="col-span-full py-4 text-center border border-dashed border-gray-100 rounded-lg bg-gray-50/30">
                            <p class="text-xs text-gray-400 italic">Nenhuma filial vinculada.</p>
                        </div>
                    `,r+=`
                            </div>
                        </div>
                    </div>
                `}),t.innerHTML=r}xo||(Ed(),xo=!0)}catch(o){console.error("Erro na renderização da rede:",o),t.innerHTML=`
            <div class="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100 text-center">
                <i class="bi bi-exclamation-triangle text-2xl mb-2 block"></i>
                <p class="font-bold text-sm">Não foi possível carregar a estrutura organizacional.</p>
            </div>
        `}}function Ed(){const e=document.getElementById("form-create-establishment");e&&e.addEventListener("submit",async t=>{t.preventDefault();const a=e.querySelector('button[type="submit"]'),o=a.innerHTML;a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...',a.disabled=!0;const s={name:document.getElementById("est-name").value.trim(),cnpj:document.getElementById("est-cnpj").value.trim(),parentId:document.getElementById("est-parent").value||null,timezone:document.getElementById("est-timezone").value};try{const r=await ir(s);alert(r.message||"Sucesso!"),e.reset();const i=document.getElementById("modal-create-establishment"),n=window.bootstrap?.Modal.getInstance(i);n&&n.hide(),await jt(document.getElementById("content"))}catch(r){console.error("Erro ao criar estabelecimento:",r),alert("Erro: "+(r.message||"Falha ao gravar dados."))}finally{a.innerHTML=o,a.disabled=!1}})}window.loadAndRenderHierarchy=()=>jt(document.getElementById("content"));document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("gesturestart",function(t){t.preventDefault()}),document.addEventListener("gesturechange",function(t){t.preventDefault()}),document.addEventListener("gestureend",function(t){t.preventDefault()});let e=0;document.addEventListener("touchend",function(t){const a=new Date().getTime();a-e<=300&&t.preventDefault(),e=a},!1)});const te=document.getElementById("loadingScreen"),Je=document.getElementById("dashboardContent"),Me=document.getElementById("content"),oa=document.getElementById("notificationBell"),St=document.getElementById("notificationBadge"),Le=document.getElementById("notificationPanel"),sa=document.getElementById("notificationList"),Ge=document.getElementById("profileMenuButton"),Z=document.getElementById("profileDropdown"),vo=document.getElementById("profileName"),ho=document.getElementById("profileEmail"),yo=document.getElementById("logoutButton"),wo=document.getElementById("myProfileLink"),ko=document.getElementById("hamburger-menu-btn"),Y=document.getElementById("sidebar"),ae=document.getElementById("mobile-overlay"),Id={"agenda-section":_o,"comandas-section":Ai,"relatorios-section":Qi,"servicos-section":vn,"produtos-section":Dn,"suppliers-section":Pn,"profissionais-section":Dt,"clientes-section":ll,"estabelecimento-section":e=>fs(e),"ausencias-section":Ll,"users-section":Pt,"sales-report-section":Ul,"financial-section":Jl,"commissions-section":sd,"packages-section":Aa,"my-profile-section":kd,"hierarquia-section":()=>jt(Me),"establishments-section":()=>jt(Me)},So={indigo:{main:"#4f46e5",hover:"#4338ca",light:"#e0e7ff",text:"#ffffff"},blue:{main:"#2563eb",hover:"#1d4ed8",light:"#dbeafe",text:"#ffffff"},sky:{main:"#0284c7",hover:"#0369a1",light:"#e0f2fe",text:"#ffffff"},teal:{main:"#0d9488",hover:"#0f766e",light:"#ccfbf1",text:"#ffffff"},emerald:{main:"#059669",hover:"#047857",light:"#d1fae5",text:"#ffffff"},green:{main:"#16a34a",hover:"#15803d",light:"#dcfce7",text:"#ffffff"},lime:{main:"#65a30d",hover:"#4d7c0f",light:"#ecfccb",text:"#ffffff"},amber:{main:"#d97706",hover:"#b45309",light:"#fef3c7",text:"#1f2937"},orange:{main:"#ea580c",hover:"#c2410c",light:"#ffedd5",text:"#ffffff"},red:{main:"#dc2626",hover:"#b91c1c",light:"#fee2e2",text:"#ffffff"},rose:{main:"#e11d48",hover:"#be123c",light:"#ffe4e6",text:"#ffffff"},pink:{main:"#db2777",hover:"#be185d",light:"#fce7f3",text:"#ffffff"},fuchsia:{main:"#c026d3",hover:"#a21caf",light:"#fae8ff",text:"#ffffff"},purple:{main:"#7c3aed",hover:"#6d28d9",light:"#ede9fe",text:"#ffffff"},violet:{main:"#8b5cf6",hover:"#7c3aed",light:"#ddd6fe",text:"#ffffff"},gray:{main:"#4b5563",hover:"#374151",light:"#f3f4f6",text:"#ffffff"},black:{main:"#111827",hover:"#000000",light:"#e5e7eb",text:"#ffffff"}};function $o(e){const t=So[e]||So.indigo,o=(r=>{const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return i?`${parseInt(i[1],16)}, ${parseInt(i[2],16)}, ${parseInt(i[3],16)}`:"79, 70, 229"})(t.main);document.body.style.setProperty("--theme-main",t.main);const s=document.getElementById("dynamic-theme-styles");s&&(s.innerHTML=`
            :root {
                --theme-color-main: ${t.main};
                --theme-color-hover: ${t.hover};
                --theme-color-light: ${t.light};
                --theme-rgb: ${o};
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
        `)}let rt=null,it=[];function Es(){if(!St||!sa)return;const e=it.filter(t=>!t.read).length;if(e>0?(St.textContent=e,St.classList.remove("hidden")):St.classList.add("hidden"),it.length===0){sa.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}sa.innerHTML=it.map(t=>`
    <div class="notification-item ${t.read?"":"unread"}">
    <p class="font-semibold">${t.title}</p>
    <p class="text-sm text-gray-600">${t.message}</p>
    <p class="text-xs text-gray-400 mt-1">${t.time}</p>
    </div>
    `).join("")}function Ld(e){rt&&rt();const t=Ft(me,"establishments",e,"notifications"),a=Lo(t,Co("timestamp",">=",new Date),Hs("timestamp","desc"));rt=Os(a,o=>{o.docChanges().forEach(s=>{if(s.type==="added"){const r=s.doc.data();it.unshift({title:r.title,message:r.message,time:r.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),g(r.title,r.message,"info",!0),Es();const i=document.querySelector(".sidebar-link.active");i&&i.dataset.target==="agenda-section"&&_o()}})},o=>{console.error("Erro no listener de notificações:",o)})}async function Cd(e){const t=document.getElementById("global-context-switcher"),a=t?.parentElement;if(!(!t||!a))try{const s=(await Oe()).matrizes||[];let r="",i=0;if(s.forEach(n=>{r+=`<option value="${n.id}" class="font-bold">🏢 ${n.name}</option>`,i++,n.branches&&n.branches.length>0&&n.branches.forEach(l=>{r+=`<option value="${l.id}">&nbsp;&nbsp;&nbsp;📍 ${l.name}</option>`,i++})}),i>0){t.innerHTML=r,a.classList.remove("hidden"),a.classList.add("flex");let n=e;Array.from(t.options).some(u=>u.value===e)||(n=t.options[0].value),t.value=n;const l=t.cloneNode(!0);t.parentNode.replaceChild(l,t);const d=async(u,p,v=!1)=>{te&&!v&&(te.classList.remove("hidden","fade-out"),te.style.display="flex");try{const f=await be(u);if(m.establishmentId=u,m.establishmentName=p,m.enabledModules=f.modules,m.currentViewContext={id:u,name:p,type:f.parentId?"BRANCH":"GROUP"},typeof $o=="function"&&$o(f.themeColor||"indigo"),Ld(u),Td(m.userPermissions),!v){g("Unidade Alterada",`Agora a gerir: ${p}`,"info");const x=document.querySelector(".sidebar-link.active"),h=x?x.getAttribute("data-target"):"agenda-section";X(h)}}catch(f){console.error("Erro ao trocar de contexto:",f),v||g("Erro","Falha ao aceder aos dados desta unidade.","error")}finally{te&&!v&&(te.classList.add("fade-out"),setTimeout(()=>{te.style.display="none"},500))}},c=l.options[l.selectedIndex].text.replace(/🏢 |📍 |&nbsp;/g,"").trim();await d(n,c,!0),l.addEventListener("change",async u=>{const p=u.target.value,v=u.target.options[u.target.selectedIndex].text.replace(/🏢 |📍 |&nbsp;/g,"").trim();await d(p,v,!1)})}else a.classList.add("hidden"),a.classList.remove("flex")}catch(o){console.error("Erro ao carregar switcher de contexto:",o),a.classList.add("hidden")}}function X(e,t={}){const a=e.replace("-section","");if(e!=="my-profile-section"){const s=["hierarquia-section","establishments-section","estabelecimento-section"].includes(e),r=m.enabledModules?.[a]!==!1,i=m.userPermissions===null||m.userPermissions[e]?.view===!0;if(!s&&(!r||!i)){Me&&(Me.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>'),document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active")),Y&&Y.classList.contains("absolute")&&(Y.classList.add("hidden"),ae&&ae.classList.add("hidden"));return}}const o=Id[e];o&&Me&&(document.querySelectorAll(".sidebar-link").forEach(s=>{s.classList.toggle("active",s.getAttribute("data-target")===e)}),e==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(s=>s.classList.remove("active")),Me.innerHTML="",window.innerWidth<768&&Y&&(Y.classList.add("hidden"),ae&&ae.classList.add("hidden")),o(t))}window.navigateTo=X;async function Td(e){const t=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),o=document.getElementById("kpi-today-appointments"),s=document.getElementById("kpi-today-revenue"),r=e===null||e["agenda-section"]?.view===!0,i=e===null||e["financial-section"]?.view===!0;if(r&&t&&(t.classList.remove("hidden"),t.classList.add("inline-flex")),i&&a&&(a.classList.remove("hidden"),a.classList.add("inline-flex")),!(!r&&!i))try{const n=await Tr();r&&o&&(o.textContent=n.todayAppointments.toString()),i&&s&&(s.textContent=`R$ ${n.todayRevenue.toFixed(2).replace(".",",")}`)}catch(n){console.error("Erro ao carregar KPIs do cabeçalho:",n)}}async function Dd(e){try{le.getPlatform()==="android"&&await Q.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0});let t=await Q.checkPermissions();if(t.receive==="prompt"&&(t=await Q.requestPermissions()),t.receive!=="granted")return;await Q.register(),Q.addListener("registration",async a=>{try{const o=ct(me,"users",e);await fa(o,{fcmTokens:Fs(a.value),platform:"native_mobile"})}catch{}}),Q.addListener("pushNotificationReceived",a=>g(a.title,a.body,"info",!0)),Q.addListener("pushNotificationActionPerformed",()=>X("agenda-section"))}catch{}}function Pd(){const e=document.getElementById("exitConfirmationModal"),t=document.getElementById("btn-cancel-exit"),a=document.getElementById("btn-confirm-exit"),o=()=>e&&(e.style.display="block"),s=()=>e&&(e.style.display="none"),r=()=>e&&e.style.display==="block";e&&(t.addEventListener("click",()=>{s(),le.isNativePlatform()||history.pushState(null,document.title,location.href)}),a.addEventListener("click",()=>{s(),le.isNativePlatform()?za.exitApp():history.back()}),le.isNativePlatform()?za.addListener("backButton",()=>{if(r())s();else{const i=document.querySelectorAll('.modal[style*="display: block"]'),n=Array.from(i).filter(d=>d.id!=="exitConfirmationModal");if(n.length>0){n.forEach(d=>d.style.display="none");return}if(Y&&!Y.classList.contains("hidden")&&window.innerWidth<768){Y.classList.add("hidden"),ae&&ae.classList.add("hidden");return}const l=document.querySelector(".sidebar-link.active");l&&l.getAttribute("data-target")==="agenda-section"?o():X("agenda-section")}}):(history.pushState(null,document.title,location.href),window.addEventListener("popstate",()=>{if(r()){s(),history.pushState(null,document.title,location.href);return}const i=document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display: flex"]'),n=Array.from(i).filter(d=>d.id!=="exitConfirmationModal");if(n.length>0){n.forEach(d=>d.style.display="none"),history.pushState(null,document.title,location.href);return}const l=document.querySelector(".sidebar-link.active");l&&l.getAttribute("data-target")==="agenda-section"?o():(X("agenda-section"),history.pushState(null,document.title,location.href))})))}async function Bd(){try{await Bs(oe,Ms)}catch{}le.isNativePlatform()&&document.body.classList.add("is-app-native"),Ks(),Pd(),ko&&ko.addEventListener("click",e=>{e.stopPropagation(),Y&&(Y.classList.remove("hidden"),Y.classList.add("absolute","inset-y-0","left-0","z-40","shadow-xl")),ae&&ae.classList.remove("hidden")}),ae&&ae.addEventListener("click",()=>{Y&&(Y.classList.add("hidden"),Y.classList.remove("absolute","inset-y-0","left-0","z-40","shadow-xl")),ae.classList.add("hidden")}),oa&&oa.addEventListener("click",e=>{e.stopPropagation(),Le&&(Le.classList.toggle("hidden"),Le.classList.contains("hidden")||(it.forEach(t=>t.read=!0),Es()))}),Ge&&Ge.addEventListener("click",e=>{e.stopPropagation(),Z&&(Z.classList.toggle("active"),Z.classList.contains("active")?Z.classList.remove("hidden"):setTimeout(()=>Z.classList.add("hidden"),200))}),wo&&wo.addEventListener("click",e=>{e.preventDefault(),X("my-profile-section"),Z&&(Z.classList.remove("active"),Z.classList.add("hidden"))}),document.addEventListener("click",e=>{Le&&!Le.contains(e.target)&&e.target!==oa&&Le.classList.add("hidden"),Z&&!Z.contains(e.target)&&e.target!==Ge&&Z.classList.contains("active")&&(Z.classList.remove("active"),setTimeout(()=>Z.classList.add("hidden"),200))}),As(oe,async e=>{if(e){if(!le.isNativePlatform()&&($r(),"Notification"in window&&Notification.permission==="default")){const t=document.getElementById("toast-notification-request"),a=document.getElementById("btn-enable-toast");t&&setTimeout(()=>{t.style.display="block"},3500),a&&a.addEventListener("click",async()=>{await Er()&&t&&(t.style.display="none")});const o=()=>{t&&(t.style.display="none")},s=document.getElementById("btn-deny-toast"),r=document.getElementById("btn-close-toast");s&&s.addEventListener("click",o),r&&r.addEventListener("click",o)}try{const a=(await e.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="admin"||a.role==="employee")&&a.establishmentId){const o=await be(a.establishmentId);let s=null,r=e.displayName,i=null;const n=ct(me,"users",e.uid),l=await Eo(n);if(l.exists()){const c=l.data();s=a.role==="employee"?c.permissions||{}:null,r=c.name||r,i=c.professionalId||null}m.userProfessionalId=i,le.isNativePlatform()&&Dd(e.uid);const d=r||e.email;Us(a.establishmentId,o.name,s),Ge&&(Ge.textContent=d.charAt(0).toUpperCase()),vo&&(vo.textContent=d),ho&&(ho.textContent=e.email),yo&&yo.addEventListener("click",c=>{c.preventDefault(),rt&&rt(),qs(oe).then(()=>window.location.href="/login.html")}),await Cd(a.establishmentId),rr(X,s,m.enabledModules),te&&(te.classList.add("fade-out"),setTimeout(()=>{te.style.display="none"},500)),Je&&(Je.style.display="flex"),setTimeout(()=>{cr()},1500),X("agenda-section")}else throw new Error("Permissão ou estabelecimento não configurado.")}catch(t){console.error("Erro na inicialização:",t),te&&(te.style.display="none"),Je&&(Je.innerHTML=`<div class="w-full h-full flex flex-col items-center justify-center p-4 text-center"><h2>Erro de Acesso</h2><p>${t.message}</p></div>`,Je.style.display="flex")}}else window.location.href="/login.html"})}Bd();export{Po as W};
