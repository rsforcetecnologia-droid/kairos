const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-Dp5i_Loz.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/firebase-config-C2tbVz-J.js","assets/styles-CZYPZ0h4.css"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as le,d as fe,m as Ka}from"./firebase-config-C2tbVz-J.js";import{EmailAuthProvider as Vo,reauthenticateWithCredential as _o,verifyBeforeUpdateEmail as Uo,updatePassword as Wo,updateProfile as Jo,setPersistence as Go,browserLocalPersistence as Qo,onAuthStateChanged as Xo,signOut as Yo}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as yt,getDoc as Vs,updateDoc as Ra,setDoc as Zo,addDoc as _s,collection as Yt,query as Us,where as Ws,getDocs as Ko,deleteDoc as er,arrayUnion as tr,orderBy as ar,onSnapshot as sr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{getToken as or,onMessage as rr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const p={userName:null,userProfessionalId:null,userPermissions:null,userRole:null,groupId:null,groupName:null,accessibleCompanies:[],accessibleEstablishments:[],currentViewContext:{type:null,id:null,name:null},establishmentId:null,establishmentName:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function ir(e,t,a){p.establishmentId=e,p.establishmentName=t,p.userPermissions=a,p.currentViewContext={type:"BRANCH",id:e,name:t}}const Js=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",va=Js?"http://localhost:8080":"https://kairos-app-407358446276.us-central1.run.app";console.log(`🚀 API configurada para modo: ${Js?"LOCAL (Dev)":"PRODUÇÃO (Cloud)"}`);console.log("📡 URL Base:",va);async function nr(){const e=le.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function C(e,t={}){const a=await nr();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const o=va.replace(/\/$/,""),s=e.startsWith("/")?e:`/${e}`,r=`${o}${s}`;console.log(`AuthenticatedFetch: ${t.method||"GET"} ${r}`);try{const i=await fetch(r,{...t,headers:{...a,...t.headers}});if(!i.ok){const d=(await i.json().catch(()=>({message:i.statusText}))).message||`Erro na API: ${i.status}`;if(d.includes("FAILED_PRECONDITION")&&d.includes("requires an index")){const l=/(https:\/\/[^\s]+)/,c=d.match(l),u=c?c[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${u}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${i.status}) em ${r}:`,d),new Error(d)}return i.json()}catch(i){throw console.error(`Falha de rede ao tentar acessar ${r}:`,i.message),i.message.includes("Failed to fetch")||i.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${va}. Verifique se o servidor backend está rodando.`):i}}const Na=(e,t,a,o=null)=>{let s=`/api/appointments/${e}?startDate=${t}&endDate=${a}`;return o&&(s+=`&professionalId=${o}`),C(s)},lr=({establishmentId:e,professionalId:t,serviceIds:a,date:o})=>{const s=`/api/availability?establishmentId=${e}&professionalId=${t}&serviceIds=${a.join(",")}&date=${o}`;return C(s)},dr=e=>C("/api/appointments",{method:"POST",body:JSON.stringify(e)}),cr=(e,t)=>C(`/api/appointments/${e}`,{method:"PUT",body:JSON.stringify(t)}),ur=e=>C(`/api/appointments/${e}`,{method:"DELETE"}),pr=e=>C(`/api/appointments/${e}/reopen`,{method:"POST"}),mr=(e,t)=>C(`/api/appointments/${e}/checkout`,{method:"POST",body:JSON.stringify(t)});let Y;async function gr(){if(!Y)try{Y=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function br(){if(!Y){console.warn("AudioContext não inicializado. O som não será tocado.");return}Y.state==="suspended"&&Y.resume();const e=Y.createOscillator(),t=Y.createGain();e.connect(t),t.connect(Y.destination),e.type="sine",e.frequency.setValueAtTime(800,Y.currentTime),t.gain.setValueAtTime(0,Y.currentTime),t.gain.linearRampToValueAtTime(.3,Y.currentTime+.01),t.gain.exponentialRampToValueAtTime(1e-4,Y.currentTime+.2),e.start(Y.currentTime),e.stop(Y.currentTime+.2)}function g(e,t,a="info",o=!1){const s=document.getElementById("toast-container");if(!s)return;o&&br();const r=document.createElement("div"),i={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},n={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},d={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};r.className=`toast ${i[a]||i.info}`,r.innerHTML=`
        <div class="toast-icon">${n[a]||n.info}</div>
        <div class="toast-content">
            <p class="font-bold">${e}</p>
            <p class="text-sm">${t}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${d[a]||d.info}"></div>
        </div>
    `,s.appendChild(r),r.querySelector(".toast-close").addEventListener("click",()=>r.remove()),setTimeout(()=>{r.remove()},4e3)}function J(e,t){const a=document.getElementById("genericModal");return new Promise(o=>{a.innerHTML=`
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
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",o(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",o(!1)}})}function ie({title:e,contentHTML:t,maxWidth:a="max-w-4xl",showCloseButton:o=!0}){let s=document.getElementById("genericModal");const r=s.cloneNode(!1);s.parentNode.replaceChild(r,s),s=r;const i=()=>{s.style.display="none"},n=c=>{s.querySelector("#genericModalContentBody").innerHTML=c};s.innerHTML=`
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
    `;const d=s.querySelector("[data-close-modal]");d&&(d.onclick=i);const l=s.querySelector('[data-action="close-modal"]');return l&&(l.onclick=i),s.addEventListener("click",c=>{c.target.closest(".modal-content")||i()}),s.style.display="flex",{modalElement:s,close:i,setContent:n}}function fr(){document.body.addEventListener("click",()=>{Y||gr()},{once:!0}),document.addEventListener("click",e=>{const t=e.target.closest('[data-action="close-modal"]');if(t){const o=t.dataset.target;if(o){const s=document.getElementById(o);s&&(s.style.display="none")}}if(e.target.closest("[data-close-modal]")){const o=document.getElementById("genericModal");o&&(o.style.display="none")}})}const X=document.getElementById("sidebar"),Ae=document.getElementById("sidebarToggle"),rt=document.getElementById("mainContent"),xr=document.querySelectorAll(".sidebar-link"),ya=document.getElementById("menu-search"),es=document.getElementById("hamburger-menu-btn"),Ge=document.getElementById("mobile-overlay");let xe=!0;function Ie(e){if(!X||!rt)return;X.classList.toggle("collapsed",e),rt.classList.toggle("sidebar-collapsed-shift",e);const t=X.querySelector(".sidebar-search-container"),a=X.querySelectorAll(".sidebar-category");e?(t&&(t.style.display="none"),a.forEach(o=>o.style.display="none"),document.querySelectorAll(".submenu-toggle").forEach(o=>{const s=o.getAttribute("data-target-submenu"),r=document.getElementById(s),i=o.querySelector(".submenu-arrow");r&&(r.classList.add("hidden"),r.classList.remove("flex")),i&&i.classList.remove("rotate-180")})):(t&&(t.style.display="block"),a.forEach(o=>o.style.display="block"))}function hr(){!X||!Ge||(X.classList.add("mobile-open"),Ge.classList.add("visible"))}function Et(){!X||!Ge||(X.classList.remove("mobile-open"),Ge.classList.remove("visible"))}function vr(){Ie(!X.classList.contains("collapsed"))}function yr(e,t){const a=document.getElementById(e);if(!a)return;const o=a.classList.contains("hidden");o&&window.innerWidth>=1024&&X.classList.contains("collapsed")&&Ie(!1),o?(a.classList.remove("hidden"),a.classList.add("flex"),t&&t.classList.add("rotate-180")):(a.classList.add("hidden"),a.classList.remove("flex"),t&&t.classList.remove("rotate-180"))}function wr(){ya&&ya.addEventListener("input",e=>{const t=e.target.value.toLowerCase().trim(),a=document.getElementById("sidebar-nav");if(!a)return;const o=a.querySelectorAll("li"),s=a.querySelectorAll(".sidebar-category");if(t===""){o.forEach(r=>r.style.display=""),s.forEach(r=>r.style.display="block");return}s.forEach(r=>r.style.display="none"),o.forEach(r=>{if(r.classList.contains("sidebar-category"))return;const i=r.querySelector(".sidebar-link")||r.querySelector(".submenu-toggle");if(!i)return;if(i.textContent.toLowerCase().includes(t)){r.style.display="";const l=r.closest('ul[id$="-submenu"]');if(l){l.classList.remove("hidden"),l.classList.add("flex"),l.parentElement.style.display="";const c=l.parentElement.querySelector(".submenu-toggle");if(c){const u=c.querySelector(".submenu-arrow");u&&u.classList.add("rotate-180")}}}else{const l=i.getAttribute("data-target-submenu");if(l){const c=document.getElementById(l);c&&(Array.from(c.querySelectorAll(".sidebar-link")).some(f=>f.textContent.toLowerCase().includes(t))?r.style.display="":r.style.display="none")}else r.style.display="none"}})})}function kr(e,t,a){if(!X||!rt)return;rt.classList.add("main-content-shift"),window.innerWidth>=1024?(xe=!0,Ie(!1)):window.innerWidth>=768?(xe=!1,Ie(!0)):(rt.classList.remove("main-content-shift","sidebar-collapsed-shift"),Et()),Ae&&Ae.addEventListener("click",s=>{s.stopPropagation(),window.innerWidth>=768?(xe=!xe,Ie(!xe),xe?(Ae.classList.add("text-indigo-400"),Ae.classList.remove("text-gray-400")):(Ae.classList.remove("text-indigo-400"),Ae.classList.add("text-gray-400"))):vr()}),X.addEventListener("mouseenter",()=>{window.innerWidth>=768&&!xe&&X.classList.contains("collapsed")&&Ie(!1)}),X.addEventListener("mouseleave",()=>{if(window.innerWidth>=768&&!xe){const s=!!document.querySelector("#sidebarToggle:hover"),r=document.activeElement===ya;!s&&!r&&Ie(!0)}}),es&&es.addEventListener("click",s=>{s.stopPropagation(),hr()}),Ge&&Ge.addEventListener("click",s=>{s.stopPropagation(),Et()});let o=0;X.addEventListener("touchstart",s=>{o=s.changedTouches[0].screenX},{passive:!0}),X.addEventListener("touchend",s=>{const r=s.changedTouches[0].screenX;o-r>50&&Et()},{passive:!0}),document.querySelectorAll(".submenu-toggle").forEach(s=>{s.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation();const i=s.getAttribute("data-target-submenu"),n=s.querySelector(".submenu-arrow");yr(i,n)})}),wr(),xr.forEach(s=>{const r=s.getAttribute("data-target");if(!r)return;const i=r.replace("-section",""),n=a?.[i]!==!1,d=t===null||t[r]?.view===!0;if(!n||!d){s.parentElement&&s.parentElement.tagName==="LI"?s.parentElement.style.display="none":s.style.display="none";return}s.addEventListener("click",l=>{l.preventDefault(),document.querySelectorAll(".sidebar-link").forEach(c=>c.classList.remove("active")),s.classList.add("active"),r&&typeof e=="function"&&e(r),window.innerWidth<768&&Et()})})}const Sr=e=>C("/api/establishments/",{method:"POST",body:JSON.stringify(e)}),ke=()=>C("/api/establishments/hierarchy",{method:"GET"}),De=e=>{const t=e||p.establishmentId;return t?C(`/api/establishments/${t}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},ja=(e,t)=>{const a=e||p.establishmentId;return a?C(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(t)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},$r=(e,t)=>{const a=e||p.establishmentId;return a?C(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Er=(e,t)=>{const a=e||p.establishmentId;return a?C(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))};class Ir{constructor(t,a,o){this.steps=t,this.currentStep=0,this.onComplete=a,this.onSkip=o,this.isActive=!1,this.overlay=null,this.spotlight=null,this.popover=null,this.handleResize=this.handleResize.bind(this)}start(){this.isActive||(this.isActive=!0,this.createElements(),window.addEventListener("resize",this.handleResize),this.renderStep())}stop(t=!1){this.isActive=!1,window.removeEventListener("resize",this.handleResize),this.overlay&&this.overlay.remove(),this.spotlight&&this.spotlight.remove(),this.popover&&this.popover.remove(),t&&this.onComplete?this.onComplete():!t&&this.onSkip&&this.onSkip()}createElements(){this.overlay=document.createElement("div"),this.overlay.className="fixed inset-0 bg-black/60 z-[99990] transition-opacity duration-300",document.body.appendChild(this.overlay),this.spotlight=document.createElement("div"),this.spotlight.className="absolute rounded-xl z-[99991] transition-all duration-500 ease-in-out pointer-events-none bg-transparent",this.spotlight.style.boxShadow="0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255,255,255,0.5) inset",document.body.appendChild(this.spotlight),this.popover=document.createElement("div"),this.popover.className="absolute z-[99992] bg-white rounded-2xl shadow-2xl w-[320px] transition-all duration-500 ease-in-out opacity-0 transform scale-95 border border-gray-100 flex flex-col",document.body.appendChild(this.popover)}async renderStep(){if(this.currentStep>=this.steps.length){this.stop(!0);return}const t=this.steps[this.currentStep];this.popover.style.opacity="0",this.popover.style.transform="scale(0.95)",t.onBefore&&(await t.onBefore(),await this.sleep(600));const a=await this.waitForElement(t.targetSelector,3e3);if(a){a.scrollIntoView({behavior:"smooth",block:"center"}),await this.sleep(300);const s=a.getBoundingClientRect(),r=8;this.spotlight.style.top=`${s.top+window.scrollY-r}px`,this.spotlight.style.left=`${s.left+window.scrollX-r}px`,this.spotlight.style.width=`${s.width+r*2}px`,this.spotlight.style.height=`${s.height+r*2}px`,this.spotlight.style.display="block",this.overlay.style.display="none",this.positionPopover(s)}else this.spotlight.style.display="none",this.overlay.style.display="block",this.popover.style.top="50%",this.popover.style.left="50%",this.popover.style.transform="translate(-50%, -50%) scale(1)";const o=this.currentStep===this.steps.length-1;this.popover.innerHTML=`
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
        `,setTimeout(()=>{a&&(this.popover.style.transform="scale(1)"),this.popover.style.opacity="1"},50),document.getElementById("tour-next-btn").onclick=()=>{this.currentStep++,this.renderStep()},document.getElementById("tour-prev-btn")&&(document.getElementById("tour-prev-btn").onclick=()=>{this.currentStep--,this.renderStep()}),document.getElementById("tour-skip-btn").onclick=()=>this.stop(!1)}positionPopover(t){const a=this.popover.getBoundingClientRect(),o=20;let s=t.bottom+window.scrollY+o,r=t.left+window.scrollX;s+a.height>window.scrollY+window.innerHeight&&(s=t.top+window.scrollY-a.height-o),r+a.width>window.innerWidth&&(r=t.right+window.scrollX-a.width),r<o&&(r=o),this.popover.style.top=`${s}px`,this.popover.style.left=`${r}px`}handleResize(){this.isActive&&this.renderStep()}sleep(t){return new Promise(a=>setTimeout(a,t))}async waitForElement(t,a){if(!t)return null;const o=Date.now();for(;Date.now()-o<a;){const s=document.querySelector(t);if(s)return s;await this.sleep(100)}return null}}async function Lr(){try{console.log("A verificar Onboarding interativo...");const e=await De(p.establishmentId);if(!e||e.parentId||e.onboardingCompleted)return;const t=[{title:"Bem-vindo ao Kairos!",icon:"👋",content:"Preparei um tour rápido para lhe mostrar onde deve configurar as 3 coisas mais importantes antes de receber agendamentos. Vamos a isso?",targetSelector:null},{title:"Perfil e Dados da Loja",icon:"🏢",content:"É aqui em 'Minha Empresa' que você define o nome do Salão, telefone, endereço e faz o upload da sua Logomarca.",targetSelector:'[data-target="estabelecimento-section"]',onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Cores e Personalização",icon:"🎨",content:"Nesta área você pode mudar a cor principal do sistema para ficar com a cara da sua marca. O link do seu cliente vai usar esta cor!",targetSelector:"#themeColor",onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Criação de Serviços",icon:"✂️",content:"Na aba 'Serviços' é onde a mágica acontece. Crie os serviços que os seus clientes vão poder agendar, informando o preço e a duração de cada um.",targetSelector:'[data-target="servicos-section"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Novo Serviço",icon:"➕",content:"Sempre que precisar adicionar um novo serviço ao menu, basta clicar neste botão verde.",targetSelector:'[data-action="new-service"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Gestão da Equipe",icon:"👥",content:"E para terminar: a 'Equipa'. Aqui você cadastra os profissionais, define quem faz qual serviço e ajusta a jornada de trabalho semanal de cada um.",targetSelector:'[data-target="profissionais-section"]',onBefore:async()=>{window.navigateTo("profissionais-section")}},{title:"Tudo Pronto!",icon:"🚀",content:"Você já conhece o caminho! Preencha as informações do seu negócio com calma. Quando terminar, volte à Agenda e partilhe o seu Link de Agendamento com os clientes!",targetSelector:null,onBefore:async()=>{window.navigateTo("agenda-section")}}],a=async()=>{try{await ja(p.establishmentId,{onboardingCompleted:!0}),showNotification("Tour Concluído","Você já pode configurar o seu sistema livremente!","success")}catch(s){console.error("Erro ao gravar fim do onboarding",s)}};new Ir(t,a,a).start()}catch(e){console.error("Erro fatal ao iniciar onboarding:",e)}}var Qe;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(Qe||(Qe={}));class ca extends Error{constructor(t,a,o){super(t),this.message=t,this.code=a,this.data=o}}const Cr=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},Dr=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},o=a.Plugins=a.Plugins||{},s=()=>t!==null?t.name:Cr(e),r=()=>s()!=="web",i=u=>{const m=l.get(u);return!!(m?.platforms.has(s())||n(u))},n=u=>{var m;return(m=a.PluginHeaders)===null||m===void 0?void 0:m.find(f=>f.name===u)},d=u=>e.console.error(u),l=new Map,c=(u,m={})=>{const f=l.get(u);if(f)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),f.proxy;const x=s(),y=n(u);let b;const I=async()=>(!b&&x in m?b=typeof m[x]=="function"?b=await m[x]():b=m[x]:t!==null&&!b&&"web"in m&&(b=typeof m.web=="function"?b=await m.web():b=m.web),b),$=(T,D)=>{var N,F;if(y){const O=y?.methods.find(H=>D===H.name);if(O)return O.rtype==="promise"?H=>a.nativePromise(u,D.toString(),H):(H,B)=>a.nativeCallback(u,D.toString(),H,B);if(T)return(N=T[D])===null||N===void 0?void 0:N.bind(T)}else{if(T)return(F=T[D])===null||F===void 0?void 0:F.bind(T);throw new ca(`"${u}" plugin is not implemented on ${x}`,Qe.Unimplemented)}},k=T=>{let D;const N=(...F)=>{const O=I().then(H=>{const B=$(H,T);if(B){const _=B(...F);return D=_?.remove,_}else throw new ca(`"${u}.${T}()" is not implemented on ${x}`,Qe.Unimplemented)});return T==="addListener"&&(O.remove=async()=>D()),O};return N.toString=()=>`${T.toString()}() { [capacitor code] }`,Object.defineProperty(N,"name",{value:T,writable:!1,configurable:!1}),N},L=k("addListener"),S=k("removeListener"),P=(T,D)=>{const N=L({eventName:T},D),F=async()=>{const H=await N;S({eventName:T,callbackId:H},D)},O=new Promise(H=>N.then(()=>H({remove:F})));return O.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await F()},O},j=new Proxy({},{get(T,D){switch(D){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return y?P:L;case"removeListener":return S;default:return k(D)}}});return o[u]=j,l.set(u,{name:u,proxy:j,platforms:new Set([...Object.keys(m),...y?[x]:[]])}),j};return a.convertFileSrc||(a.convertFileSrc=u=>u),a.getPlatform=s,a.handleError=d,a.isNativePlatform=r,a.isPluginAvailable=i,a.registerPlugin=c,a.Exception=ca,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Tr=e=>e.Capacitor=Dr(e),me=Tr(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Zt=me.registerPlugin;class Gs{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let o=!1;this.listeners[t]||(this.listeners[t]=[],o=!0),this.listeners[t].push(a);const r=this.windowListeners[t];r&&!r.registered&&this.addWindowListener(r),o&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,o){const s=this.listeners[t];if(!s){if(o){let r=this.retainedEventArguments[t];r||(r=[]),r.push(a),this.retainedEventArguments[t]=r}return}s.forEach(r=>r(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:o=>{this.notifyListeners(a,o)}}}unimplemented(t="not implemented"){return new me.Exception(t,Qe.Unimplemented)}unavailable(t="not available"){return new me.Exception(t,Qe.Unavailable)}async removeListener(t,a){const o=this.listeners[t];if(!o)return;const s=o.indexOf(a);this.listeners[t].splice(s,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(o=>{this.notifyListeners(t,o)}))}}const ts=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),as=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Br extends Gs{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(o=>{if(o.length<=0)return;let[s,r]=o.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=as(s).trim(),r=as(r).trim(),a[s]=r}),a}async setCookie(t){try{const a=ts(t.key),o=ts(t.value),s=`; expires=${(t.expires||"").replace("expires=","")}`,r=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${o||""}${s}; path=${r}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}Zt("CapacitorCookies",{web:()=>new Br});const Pr=async e=>new Promise((t,a)=>{const o=new FileReader;o.onload=()=>{const s=o.result;t(s.indexOf(",")>=0?s.split(",")[1]:s)},o.onerror=s=>a(s),o.readAsDataURL(e)}),Mr=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(s=>s.toLocaleLowerCase()).reduce((s,r,i)=>(s[r]=e[t[i]],s),{})},Ar=(e,t=!0)=>e?Object.entries(e).reduce((o,s)=>{const[r,i]=s;let n,d;return Array.isArray(i)?(d="",i.forEach(l=>{n=t?encodeURIComponent(l):l,d+=`${r}=${n}&`}),d.slice(0,-1)):(n=t?encodeURIComponent(i):i,d=`${r}=${n}`),`${o}&${d}`},"").substr(1):null,qr=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),s=Mr(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(s.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[i,n]of Object.entries(e.data||{}))r.set(i,n);a.body=r.toString()}else if(s.includes("multipart/form-data")||e.data instanceof FormData){const r=new FormData;if(e.data instanceof FormData)e.data.forEach((n,d)=>{r.append(d,n)});else for(const n of Object.keys(e.data))r.append(n,e.data[n]);a.body=r;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(s.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class Rr extends Gs{async request(t){const a=qr(t,t.webFetchExtra),o=Ar(t.params,t.shouldEncodeUrlParams),s=o?`${t.url}?${o}`:t.url,r=await fetch(s,a),i=r.headers.get("content-type")||"";let{responseType:n="text"}=r.ok?t:{};i.includes("application/json")&&(n="json");let d,l;switch(n){case"arraybuffer":case"blob":l=await r.blob(),d=await Pr(l);break;case"json":d=await r.json();break;case"document":case"text":default:d=await r.text()}const c={};return r.headers.forEach((u,m)=>{c[m]=u}),{data:d,headers:c,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}Zt("CapacitorHttp",{web:()=>new Rr});const te=Zt("PushNotifications",{}),Nr="modulepreload",jr=function(e){return"/"+e},ss={},Fr=function(t,a,o){let s=Promise.resolve();if(a&&a.length>0){let d=function(l){return Promise.all(l.map(c=>Promise.resolve(c).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),n=i?.nonce||i?.getAttribute("nonce");s=d(a.map(l=>{if(l=jr(l),l in ss)return;ss[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":Nr,c||(m.as="script"),m.crossOrigin="",m.href=l,n&&m.setAttribute("nonce",n),document.head.appendChild(m),c)return new Promise((f,x)=>{m.addEventListener("load",f),m.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(i){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=i,window.dispatchEvent(n),!n.defaultPrevented)throw i}return s.then(i=>{for(const n of i||[])n.status==="rejected"&&r(n.reason);return t().catch(r)})},os=Zt("App",{web:()=>Fr(()=>import("./web-Dp5i_Loz.js"),__vite__mapDeps([0,1,2,3])).then(e=>new e.AppWeb)}),Hr="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let rs=!1;async function zr(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await te.removeAllListeners(),await te.addListener("registration",async a=>{Xs(a.value,!0)}),await te.addListener("pushNotificationReceived",a=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",a)}),await te.addListener("pushNotificationActionPerformed",a=>{const o=a.notification.data;console.log("Notificação clicada (Ação):",o)});let t=await te.checkPermissions();t.receive==="prompt"&&(t=await te.requestPermissions()),t.receive==="granted"&&await te.register()}catch(t){console.error("[Push Nativo] Erro:",t)}return}"Notification"in window&&Notification.permission==="granted"&&Qs()}async function Or(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await Qs(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(e){return console.error("Erro ao pedir permissão Web:",e),!1}}async function Qs(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await e.update();const t=await or(Ka,{vapidKey:Hr,serviceWorkerRegistration:e});t?(console.log("[Push Web] Token validado."),await Xs(t,!1)):console.warn("[Push Web] Token veio vazio."),rs||(rr(Ka,a=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",a)}),rs=!0)}catch(e){console.error("[Push Web] Falha no registo:",e)}else console.warn("Navegador sem suporte a Service Worker.")}async function Xs(e,t){const a=le.currentUser;if(!a){console.warn("Usuário não logado. Token não salvo.");return}const o=yt(fe,"users",a.uid);try{const s=await Vs(o);if(s.exists()){const i=s.data().fcmTokens||[];if(i.length===1&&i[0]===e){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await Ra(o,{fcmTokens:[e],lastLoginAt:new Date().toISOString(),platform:t?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(s){if(s.code==="not-found")try{await Zo(o,{email:a.email,fcmTokens:[e],platform:t?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(r){console.error("Erro ao criar user:",r)}else console.error("Erro ao atualizar token:",s)}}const Vr=(e,t,a="all",o="all")=>{const s=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&s.append("professionalId",a),o&&o!=="all"&&s.append("costCenterId",o),C(`/api/reports/indicators?${s.toString()}`)},_r=e=>e?C(`/api/financial/cost-centers/${e}`):Promise.resolve([]),Ur=({establishmentId:e,startDate:t,endDate:a,cashierSessionId:o})=>{const s=new URLSearchParams({startDate:t,endDate:a});return o&&o!=="all"&&s.append("cashierSessionId",o),e&&s.append("establishmentId",e),C(`/api/reports/sales?${s.toString()}`)},Wr=()=>C("/api/reports/summary",{method:"GET"}),Fa=e=>e?String(e).replace(/\D/g,""):"",Kt=(e,t="",a=20,o={})=>{const s=new URLSearchParams;return t&&s.append("search",t),a&&s.append("limit",a),o&&o.hasLoyalty&&s.append("hasLoyalty","true"),o&&o.birthMonth&&s.append("birthMonth",o.birthMonth),o&&o.inactiveDays&&s.append("inactiveDays",o.inactiveDays),C(`/api/clients/${e}?${s.toString()}`)},Ys=(e,t)=>{const a=encodeURIComponent(t);return C(`/api/clients/details/${e}/${a}`)},Zs=e=>{const t=e.phone||e.id;if(!t)throw new Error("Telefone é obrigatório");const a=Fa(t),o={...e,phone:a,id:a};return C(`/api/clients/${a}`,{method:"PUT",body:JSON.stringify(o)})},Ks=Zs,eo=(e,t)=>Zs({...t,id:e}),Jr=e=>{const t=encodeURIComponent(e);return C(`/api/clients/${t}`,{method:"DELETE"})},Gr=(e,t,a,o)=>C("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:e,clientPhone:Fa(t),points:a,rewardName:o})}),Qr=(e,t)=>Ys(e,Fa(t));function h(e){return e==null?"":String(e).replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t])}function to(e,t=800,a=800,o=.7){return new Promise((s,r)=>{if(!e.type.match(/image.*/))return r(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.readAsDataURL(e),i.onload=n=>{const d=new Image;d.src=n.target.result,d.onload=()=>{let l=d.width,c=d.height;l>c?l>t&&(c*=t/l,l=t):c>a&&(l*=a/c,c=a);const u=document.createElement("canvas");u.width=l,u.height=c,u.getContext("2d").drawImage(d,0,0,l,c);const f=u.toDataURL("image/jpeg",o);s(f)},d.onerror=l=>r(new Error("Erro ao carregar a imagem para processamento."))},i.onerror=n=>r(new Error("Erro ao ler o ficheiro."))})}let ua=null;async function Xr(){const e=document.getElementById("content");e.innerHTML=`
        <div class="flex items-center justify-center h-full min-h-[60vh]">
            <div class="flex flex-col items-center">
                <div class="w-10 h-10 border-4 border-indigo-50 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                <p class="text-slate-400 font-medium text-sm">A processar dados consolidados...</p>
            </div>
        </div>
    `;try{const t=new Date,a=new Date(t.getFullYear(),t.getMonth(),t.getDate()),o=new Date(a);o.setHours(23,59,59,999);const s=new Date(a.getFullYear(),a.getMonth(),1),r=new Date(a);r.setDate(a.getDate()-6);const i=p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments:[p.establishmentId],n=i.map(async B=>{const[_,K]=await Promise.all([Na(B,s.toISOString(),o.toISOString(),null),Kt(B)]);return{appts:_||[],clients:K||[]}}),d=await Promise.all(n);let l=[],c=[];d.forEach(B=>{l=l.concat(B.appts),c=c.concat(B.clients)});const u=B=>(B.services||[]).reduce((_,K)=>_+(Number(K.price)||0),0)||Number(B.totalPrice||0)||Number(B.servicePrice||0),m=l.filter(B=>{const _=new Date(B.startTime);return _>=a&&_<=o}),f=m.filter(B=>B.status==="completed"),x=l.filter(B=>B.status==="completed"),y=f.reduce((B,_)=>B+u(_),0),b=x.reduce((B,_)=>B+u(_),0),I=m.length,$=x.length>0?b/x.length:0,k=[],L=[],S=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];for(let B=0;B<7;B++){const _=new Date(r);_.setDate(r.getDate()+B),k.push(S[_.getDay()]);const K=new Date(_).setHours(0,0,0,0),re=new Date(_).setHours(23,59,59,999),Se=l.filter(St=>{const $t=new Date(St.startTime).getTime();return St.status==="completed"&&$t>=K&&$t<=re}).reduce((St,$t)=>St+u($t),0);L.push(Se)}const P={labels:k,data:L},j=m.filter(B=>new Date(B.startTime).getTime()>=t.getTime()&&B.status!=="completed"&&B.status!=="cancelled").sort((B,_)=>new Date(B.startTime)-new Date(_.startTime)).slice(0,4).map(B=>({client:B.clientName||"Desconhecido",service:B.serviceName||(B.services&&B.services[0]?B.services[0].name:"Serviço"),time:new Date(B.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),prof:(B.professionalName||"").split(" ")[0]||"Profissional",id:B.id})),T=`${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}`,D=new Map;c.forEach(B=>{B.phone?D.set(B.phone,B):D.set(B.id||Math.random().toString(),B)});const F=Array.from(D.values()).filter(B=>{if(!B.birthDate)return!1;let _,K;if(B.birthDate.includes("-")){const re=B.birthDate.split("-");re[0].length===4?(_=re[1],K=re[2]):(K=re[0],_=re[1])}else if(B.birthDate.includes("/")){const re=B.birthDate.split("/");K=re[0],_=re[1]}return`${K}/${_}`===T}).map(B=>{let _="";return B.birthDate&&B.birthDate.includes("-")&&B.birthDate.split("-")[0].length===4&&(_=a.getFullYear()-parseInt(B.birthDate.split("-")[0])),{name:B.name,age:_,phone:B.phone}}),O={receitaHoje:y,agendamentosHoje:I,receitaMes:b,ticketMedio:$},H=i.length>1;Yr(e,O,P,j,F,H),Zr(P),Kr()}catch(t){console.error("Erro ao carregar dashboard:",t),e.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full min-h-[60vh] text-slate-500">
                <i class="bi bi-exclamation-circle text-4xl mb-3 text-rose-400"></i>
                <p class="font-medium text-sm">Ocorreu um erro ao carregar os dados.</p>
                <button onclick="window.navigateTo('dashboard-section')" class="mt-4 px-5 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">Tentar Novamente</button>
            </div>
        `}}function Yr(e,t,a,o,s,r){const i=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),n=r?'<span class="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 align-middle">CONSOLIDADO</span>':"";e.innerHTML=`
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
                            ${o.length>0?o.map(d=>`
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
    `}function Zr(e){const t=document.getElementById("revenueChart");if(!t)return;ua&&ua.destroy();const o=t.getContext("2d").createLinearGradient(0,0,0,240);o.addColorStop(0,"rgba(79, 70, 229, 0.15)"),o.addColorStop(1,"rgba(79, 70, 229, 0.01)"),ua=new Chart(t,{type:"line",data:{labels:e.labels,datasets:[{label:"Receita (R$)",data:e.data,borderColor:"#6366f1",backgroundColor:o,borderWidth:2.5,pointBackgroundColor:"#ffffff",pointBorderColor:"#6366f1",pointBorderWidth:2,pointRadius:3,pointHoverRadius:5,fill:!0,tension:.35}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{backgroundColor:"#1e293b",padding:12,cornerRadius:8,titleFont:{size:12,family:"Inter",weight:"normal"},bodyFont:{size:13,weight:"bold",family:"Inter"},displayColors:!1,callbacks:{label:function(s){return s.parsed.y!==null?new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(s.parsed.y):""}}}},scales:{y:{beginAtZero:!0,grid:{color:"#f8fafc",drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Inter",size:10},maxTicksLimit:6,callback:function(s){return"R$ "+s}}},x:{grid:{display:!1,drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Inter",size:11,weight:"500"}}}},interaction:{intersect:!1,mode:"index"}}})}function Kr(){document.getElementById("content").addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(!a)return;switch(a.dataset.action){case"goto-agenda":G("agenda-section");break;case"new-appointment":G("agenda-section");break;case"goto-pdv":G("comandas-section");break;case"goto-clients":G("clientes-section");break;case"open-link":const s=`${window.location.origin}/cliente.html?id=${p.establishmentId||""}`;window.open(s,"_blank");break}})}const Pe=e=>C(`/api/services/${e}`),ei=e=>C("/api/services",{method:"POST",body:JSON.stringify(e)}),ti=(e,t)=>C(`/api/services/${e}`,{method:"PUT",body:JSON.stringify(t)}),ai=e=>C(`/api/services/${e}`,{method:"DELETE"}),si=(e,t)=>C(`/api/services/${e}/status`,{method:"PATCH",body:JSON.stringify({active:t})}),oi=e=>C(`/api/services/stats/most-popular/${e}`),de=e=>C(`/api/professionals/${e}`),ri=e=>C(`/api/professionals/details/${e}`),ii=e=>C("/api/professionals",{method:"POST",body:JSON.stringify(e)}),ni=(e,t)=>C(`/api/professionals/${e}`,{method:"PUT",body:JSON.stringify(t)}),ao=e=>C(`/api/professionals/${e}`,{method:"DELETE"}),li=e=>{const t=e.map(a=>ao(a));return Promise.all(t)},ea=(e,t,a,o="all")=>{const s=`/api/blockages/${e}?startDate=${t}&endDate=${a}&professionalId=${o}`;return C(s)},ta=e=>C("/api/blockages",{method:"POST",body:JSON.stringify(e)}),Ha=e=>C(`/api/blockages/${e}`,{method:"DELETE"}),so=e=>C("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:e})}),is=document.getElementById("content");let ns=!1;const wa=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5",light:"#c7d2fe"},{bg:"#d1fae5",border:"#059669",main:"#059669",light:"#a7f3d0"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48",light:"#fecdd3"},{bg:"#fef3c7",border:"#d97706",main:"#d97706",light:"#fde68a"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490",light:"#a5f3fc"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7",light:"#bae6fd"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed",light:"#ddd6fe"},{bg:"#fce7f3",border:"#db2777",main:"#db2777",light:"#fbcfe8"}];let aa=[],ka=[],Ot={},oo=[],A={currentView:window.innerWidth<768?"list":"week",currentDate:new Date,selectedProfessionalId:"all",showInactiveProfs:!1,isSelectionMode:!1,selectedItems:new Set},R={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function za(e){const t=new Date(e),a=t.getDay(),o=t.getDate()-a+(a===0?-6:1);return t.setDate(o),t.setHours(0,0,0,0),t}function Oa(){const e=document.getElementById("profSelectorContainer");if(!e||!p.professionals)return;let t=p.professionals.filter(s=>A.showInactiveProfs||s.status!=="inactive");const o=[...[{id:"all",name:"Todos",photo:null}],...t];e.innerHTML=o.map(s=>{const r=A.selectedProfessionalId===s.id,i=s.name==="Todos"?"T":s.name.charAt(0).toUpperCase(),n=s.id!=="all"?p.professionalColors.get(s.id)||wa[0]:{main:"#adb5bd",light:"#f1f3f5"};return`
            <div class="prof-pill ${r?"active":""}"
                 data-action="select-professional" data-prof-id="${s.id}"
                 style="--pc: ${n.main}; --pb: ${r?n.bg:""}; --pl: ${n.light};">
                <div class="prof-pill-dot" ${s.photo?`style="background-image: url('${U(s.photo)}'); background-size: cover; background-position: center;"`:""}>
                    ${s.photo?"":i}
                </div>
                <span>${U(s.name==="Todos"?"Todos":s.name.split(" ")[0])}</span>
            </div>`}).join("")}function U(e){return h(e||"")}function di(e,t,a,o,s){const r=(e||"").replace(/\D/g,""),i=new Date(s).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),n=new Date(s).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=`Olá, ${t}! Você tem um agendamento de ${a} com ${o} para ${i} às ${n}. Podemos confirmar?`;return`https://wa.me/${r}?text=${encodeURIComponent(d)}`}function ci(e){const t=document.getElementById("agenda-view");if(!t)return;const a=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],o=za(A.currentDate),s=new Date;s.setHours(0,0,0,0);let r='<div class="week-container" id="weekScroller">';for(let i=0;i<7;i++){const n=new Date(o);n.setDate(o.getDate()+i);const d=n.toDateString()===s.toDateString(),l=e.filter(u=>new Date(u.startTime).toDateString()===n.toDateString()).sort((u,m)=>new Date(u.startTime)-new Date(m.startTime));let c="";l.length===0?c='<div class="week-empty"><i class="bi bi-dash-lg" style="font-size:1rem;display:block;margin-bottom:4px;"></i>Sem agendamentos</div>':c=l.map(u=>{const f=new Date(u.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),x=p.professionalColors.get(u.professionalId)||{main:"#adb5bd"},y=u.status==="completed",b=A.selectedItems.has(u.id);if(u.type==="blockage")return`<div class="week-event-chip week-blockage">
                        <div class="we-time"><i class="bi bi-lock me-1"></i>${f}</div>
                        <div class="we-client">${U(u.reason)}</div>
                        <div class="we-service">${U(u.professionalName)}</div>
                    </div>`;const I=JSON.stringify(u).replace(/'/g,"&apos;"),$=b?"box-shadow: 0 0 0 2px #4f46e5; background-color: #eff6ff;":"",k=A.isSelectionMode?`<div style="position:absolute; top:6px; right:6px; z-index:1;">
                           <input type="checkbox" style="width:16px; height:16px; accent-color:#4f46e5; pointer-events:none;" ${b?"checked":""}>
                       </div>`:"";return`<div class="week-event-chip ${y?"completed":""}" style="--ec: ${x.main}; ${$}"
                    data-action="edit-appointment" data-appointment='${I}'>
                    ${k}
                    <div class="we-time">${f}</div>
                    <div class="we-client" style="${A.isSelectionMode?"padding-right:20px;":""}">${U(u.clientName)}</div>
                    <div class="we-service">${U(u.serviceName)} · ${U((u.professionalName||"").split(" ")[0])}</div>
                    ${A.isSelectionMode?"":`
                    <div class="we-actions">
                        <button class="we-btn" data-action="open-comanda" data-appointment='${I}' title="Comanda">
                            <i class="bi bi-receipt"></i>
                        </button>
                    </div>`}
                </div>`}).join(""),r+=`<div class="week-day-col">
            <div class="week-day-header ${d?"is-today":""}">
                <div class="wd-name">${d?"Hoje":a[i]}</div>
                <div class="wd-num">${n.getDate()}</div>
            </div>
            <div class="week-day-events">${c}</div>
        </div>`}r+="</div>",t.innerHTML=r,requestAnimationFrame(()=>{const i=document.getElementById("weekScroller");if(i&&window.innerWidth<768){const n=i.querySelector(".is-today");n&&n.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}})}function ui(e){const t=document.getElementById("agenda-view");if(!t)return;if(e.sort((s,r)=>new Date(s.startTime)-new Date(r.startTime)),e.length===0){t.innerHTML=`
            <div class="list-container" style="min-height:50vh;display:flex;align-items:center;justify-content:center;">
                <div class="text-center" style="max-width:220px;">
                    <div style="width:52px;height:52px;background:#f1f3f5;border-radius:14px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px;">
                        <i class="bi bi-calendar-check" style="font-size:1.3rem;color:#adb5bd;"></i>
                    </div>
                    <p style="font-size:0.85rem;font-weight:600;color:#495057;margin-bottom:4px;">Nenhum agendamento</p>
                    <p style="font-size:0.7rem;color:#868e96;">Toque em + para criar um novo.</p>
                </div>
            </div>`;return}const a={};e.forEach(s=>{const r=new Date(s.startTime).toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});a[r]||(a[r]=[]),a[r].push(s)});let o='<div class="list-container">';Object.entries(a).forEach(([s,r])=>{o+=`<div class="list-date-group">
            <div class="list-date-label">${s}</div>`,r.forEach(i=>{const n=new Date(i.startTime),d=new Date(i.endTime),l=Math.round((d-n)/6e4),c=n.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),u=p.professionalColors.get(i.professionalId)||{main:"#adb5bd"},m=i.status==="completed",f=JSON.stringify(i).replace(/'/g,"&apos;"),x=A.selectedItems.has(i.id),y=A.isSelectionMode?`<div style="display:flex; align-items:center; margin-right: 12px; margin-left: 4px;">
                       <input type="checkbox" style="width:20px; height:20px; accent-color:#4f46e5; pointer-events:none;" ${x?"checked":""}>
                   </div>`:"",b=x?"box-shadow: 0 0 0 2px #4f46e5; background-color: #eff6ff;":"";if(i.type==="blockage"){o+=`<div class="list-card blockage">
                    ${y}
                    <div class="list-card-time"><div class="t-start" style="color:#c92a2a;">${c}</div><div class="t-dur">Bloqueio</div></div>
                    <div class="list-card-dot" style="--dc:#e03131;"></div>
                    <div class="list-card-info">
                        <div class="lc-name" style="color:#c92a2a;">${U(i.reason)}</div>
                        <div class="lc-detail">${U(i.professionalName)}</div>
                    </div>
                </div>`;return}const I=di(i.clientPhone,i.clientName,i.serviceName,i.professionalName,i.startTime),$=(i.services||[]).reduce((P,j)=>P+(Number(j.price)||0),0)||Number(i.totalPrice||0)||Number(i.servicePrice||0),k=i.paymentStatus||(i.status==="completed"?"Finalizado":"Agendado"),L=U((i.professionalName||"").split(" ")[0]),S=(i.services||[]).length||(i.serviceName?1:0);o+=`<div class="list-card ${m?"completed":""}" style="${b}"
                data-action="edit-appointment" data-appointment='${f}'>
                ${y}
                <div class="list-card-time">
                    <div class="t-start ${m?"opacity-50 line-through":""}">${c}</div>
                    <div class="t-dur">${l} min</div>
                </div>
                <div class="list-card-dot" style="--dc: ${u.main};"></div>
                <div class="list-card-info">
                    <div class="lc-name">${U(i.clientName)}</div>
                    <div class="lc-detail">${U(i.serviceName)} · ${L}</div>
                    <div class="lc-extra" style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
                        <span style="font-size: 0.65rem; color: #4b5563; background: #f3f4f6; padding: 2px 8px; border-radius: 6px; font-weight: 500;">R$ ${$.toFixed(2).replace(".",",")}</span>
                        ${i.clientPhone?`<span style="font-size: 0.65rem; color: #4b5563; background: #f3f4f6; padding: 2px 8px; border-radius: 6px; font-weight: 500;"><i class="bi bi-telephone"></i> ${U(i.clientPhone)}</span>`:""}
                        <span style="font-size: 0.65rem; color: #4b5563; background: #f3f4f6; padding: 2px 8px; border-radius: 6px; font-weight: 500;">${S} serv.</span>
                        <span style="font-size: 0.65rem; color: ${m?"#059669":"#d97706"}; background: ${m?"#d1fae5":"#fef3c7"}; padding: 2px 8px; border-radius: 6px; font-weight: 600;">${U(k)}</span>
                    </div>
                </div>
                <div class="list-card-status">
                    <div class="lc-status-dot ${m?"done":""}"></div>
                </div>
                ${!m&&!A.isSelectionMode?`
                <div class="list-card-actions">
                    <button class="lc-action-btn wa" data-link="${I}" title="WhatsApp">
                        <i class="bi bi-whatsapp" style="font-size:0.85rem;"></i>
                    </button>
                    <button class="lc-action-btn comanda" data-action="open-comanda" data-appointment='${f}' title="Comanda">
                        <i class="bi bi-receipt"></i>
                    </button>
                </div>`:""}
            </div>`}),o+="</div>"}),o+="</div>",t.innerHTML=o}function ro(){const e=p.allEvents.filter(t=>A.selectedProfessionalId==="all"||t.professionalId===A.selectedProfessionalId);A.currentView==="list"?ui(e):ci(e),Va()}function Va(){const e=document.getElementById("batch-delete-container"),t=document.getElementById("agendaFab");e&&(A.isSelectionMode&&A.selectedItems.size>0?(e.innerHTML=`<div class="bg-gray-900 text-white p-3 rounded-xl shadow-xl flex items-center justify-between gap-4 w-full mx-4" style="background:#212529;color:#fff;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:12px;">
            <span class="font-semibold text-sm"><span style="color:#7c3aed; font-size:1.1rem; margin-right:4px;">${A.selectedItems.size}</span> selecionados</span>
            <button data-action="batch-delete" style="background:#e03131;color:#fff;border:none;padding:8px 20px;border-radius:8px;font-size:0.85rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;">
                <i class="bi bi-trash"></i> Excluir
            </button>
        </div>`,e.style.display="block",t&&(t.style.transform="scale(0)")):(e.style.display="none",t&&(t.style.transform="scale(1)")))}function pi(){const e=document.getElementById("currentDateDisplay");if(!e)return;const t=new Date;t.setHours(0,0,0,0);const a=new Date(A.currentDate);if(a.setHours(0,0,0,0),A.currentView==="list")a.toDateString()===t.toDateString()?e.textContent="Hoje":e.textContent=a.toLocaleDateString("pt-BR",{day:"numeric",month:"long"});else{const o=za(a),s=new Date(o);s.setDate(o.getDate()+6);const r=o.toLocaleDateString("pt-BR",{day:"numeric",month:"short"}),i=s.toLocaleDateString("pt-BR",{day:"numeric",month:"short"});e.textContent=`${r} - ${i}`}}async function ye(){const e=document.getElementById("agenda-view");if(!e)return;A.selectedItems.clear(),Va(),e.innerHTML='<div style="display:flex;align-items:center;justify-content:center;padding:60px 0;"><div style="width:28px;height:28px;border:2.5px solid #e9ecef;border-top:2.5px solid #4f46e5;border-radius:50%;animation:spin 0.7s linear infinite;"></div></div><style>@keyframes spin{to{transform:rotate(360deg)}}</style>',pi();let t,a;if(A.currentView==="list")t=new Date(A.currentDate),t.setHours(0,0,0,0),a=new Date(t),a.setHours(23,59,59,999);else{const o=za(A.currentDate);t=new Date(o),a=new Date(o),a.setDate(o.getDate()+6),a.setHours(23,59,59,999)}try{const s=(p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments:[p.establishmentId]).map(async l=>{const[c,u]=await Promise.all([Na(l,t.toISOString(),a.toISOString(),A.selectedProfessionalId==="all"?null:A.selectedProfessionalId),ea(l,t.toISOString(),a.toISOString(),A.selectedProfessionalId)]);return{appts:c||[],blockages:u||[]}}),r=await Promise.all(s);let i=[],n=[];if(r.forEach(l=>{i=i.concat(l.appts),n=n.concat(l.blockages)}),!document.getElementById("agenda-view"))return;const d=l=>l.map(c=>({...c,type:c.type||"appointment",professionalName:c.professionalName||(()=>{const u=p.professionals?.find(m=>m.id===c.professionalId);return u?u.name:"Indefinido"})()}));p.allEvents=[...d(i),...d(n)],Oa(),ro()}catch(o){console.error(o),document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML=`
                <div class="text-center py-12" style="color:#868e96;">
                    <i class="bi bi-exclamation-triangle" style="font-size:1.5rem;"></i>
                    <p class="mt-2" style="font-size:0.8rem;">Erro ao carregar agenda.</p>
                </div>`)}}async function mi(){try{const t=(p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments:[p.establishmentId]).map(async i=>{const[n,d,l]=await Promise.all([de(i),Pe(i),De(i)]);return{profs:n||[],services:d||[],estDetails:l}}),a=await Promise.all(t),o=new Map,s=new Map;let r=a[0]?.estDetails;a.forEach(i=>{i.profs.forEach(n=>o.set(n.id,n)),i.services.forEach(n=>s.set(n.id,n))}),p.professionals=Array.from(o.values()),p.services=Array.from(s.values()),oo=[],r&&(Ot=r.loyaltyProgram||{enabled:!1}),p.professionals.forEach((i,n)=>{p.professionalColors.set(i.id,wa[n%wa.length])}),Oa()}catch{g("Atenção","Não foi possível carregar os dados da equipa.","error")}}async function io(e={}){A.currentDate=e.targetDate?new Date(e.targetDate):A.currentDate||new Date,A.isSelectionMode=!1,A.selectedItems.clear(),is.innerHTML=`
        <div class="flex flex-col h-[calc(100vh-80px)] md:h-auto bg-gray-50 relative font-sans w-full" style="background:#f8f9fa;">

            <div style="background: #fff; padding: 14px 16px; border-bottom: 1px solid #f1f3f5; position: sticky; top: 0; z-index: 10; display:flex; flex-direction:column; gap:16px;">
                
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <button id="btnWeekDays" style="background:transparent; border:none; color:#495057; font-size:1.2rem; padding:4px; cursor:pointer;" title="Opções">
                        <i class="bi bi-sliders"></i>
                    </button>

                    <div class="agenda-view-toggle" style="background: #f1f3f5; padding: 4px; border-radius: 12px; display:flex; gap:4px; margin:0;">
                        <button class="${A.currentView==="list"?"active shadow-sm":""}" data-action="setView" data-view="list" style="border-radius: 8px; padding: 6px 16px; font-weight:600;">Lista</button>
                        <button class="${A.currentView==="week"?"active shadow-sm":""}" data-action="setView" data-view="week" style="border-radius: 8px; padding: 6px 16px; font-weight:600;">Semana</button>
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
        </div>`,document.getElementById("btnPrevDate").addEventListener("click",()=>{A.currentView==="list"?A.currentDate.setDate(A.currentDate.getDate()-1):A.currentDate.setDate(A.currentDate.getDate()-7),ye()}),document.getElementById("btnNextDate").addEventListener("click",()=>{A.currentView==="list"?A.currentDate.setDate(A.currentDate.getDate()+1):A.currentDate.setDate(A.currentDate.getDate()+7),ye()}),document.getElementById("btnTodayHeader").addEventListener("click",()=>{A.currentDate=new Date,ye()});const t=document.querySelectorAll(".agenda-view-toggle button");t.forEach(a=>{a.addEventListener("click",()=>{t.forEach(o=>{o.classList.remove("active","shadow-sm"),o.style.backgroundColor="transparent"}),a.classList.add("active","shadow-sm"),a.style.backgroundColor="#fff",A.currentView=a.dataset.view,ye()})}),document.getElementById("btnWeekDays").addEventListener("click",()=>{gi()}),ns||(is.addEventListener("click",async a=>{const o=a.target.closest('[data-action="open-comanda"]');if(o){a.stopPropagation();const d=o.dataset.appointment||o.closest("[data-appointment]")?.dataset.appointment;if(!d)return;const l=JSON.parse(d.replace(/&apos;/g,"'")),c=l.status==="completed"?"finalizadas":"em-atendimento",u={selectedAppointmentId:l.id,initialFilter:c};c==="finalizadas"&&l.transaction?.paidAt&&(u.filterDate=typeof l.transaction.paidAt=="object"?new Date(l.transaction.paidAt._seconds*1e3):l.transaction.paidAt),G("comandas-section",u);return}const s=a.target.closest(".lc-action-btn.wa");if(s){a.stopPropagation(),s.dataset.link&&window.open(s.dataset.link,"_blank");return}if(a.target.closest('[data-action="batch-delete"]')){const d=A.selectedItems.size;await J("Excluir Selecionados",`Tem certeza que deseja excluir ${d} agendamento(s)? Esta ação não pode ser desfeita.`)&&(await Promise.all(Array.from(A.selectedItems).map(async c=>{try{await ur(c)}catch{}})),g(`${d} agendamento(s) excluído(s).`,"success"),A.selectedItems.clear(),A.isSelectionMode=!1,ye());return}const r=a.target.closest('[data-action="select-professional"]');if(r){const d=r.dataset.profId;A.selectedProfessionalId=A.selectedProfessionalId===d&&d!=="all"?"all":d,ye();return}const i=a.target.closest(".list-card[data-appointment], .week-event-chip[data-appointment]");if(i){if(A.isSelectionMode){a.stopPropagation();const l=i.querySelector('input[type="checkbox"]');if(l){const c=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'")),u=!l.checked;l.checked=u,u?A.selectedItems.add(c.id):A.selectedItems.delete(c.id),(i.classList.contains("week-event-chip")||i.classList.contains("list-card"))&&(u?(i.style.boxShadow="0 0 0 2px #4f46e5",i.style.backgroundColor="#eff6ff"):(i.style.boxShadow="none",i.style.backgroundColor=i.classList.contains("week-event-chip")?"#f8f9fa":"#fff")),Va()}return}const d=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'"));Sa(d);return}if(a.target.closest('[data-action="new-appointment"]')){Sa();return}}),ns=!0),await mi(),await ye()}function gi(){const e=document.getElementById("optionsSheet");if(e){e.remove();return}const t=document.createElement("div");t.id="optionsSheet",t.style.cssText="position:fixed;bottom:0;left:50%;right:auto;transform:translateX(-50%) translateY(100%);width:100%;max-width:440px;background:#fff;border-radius:24px 24px 0 0;z-index:10000;box-shadow:0 -8px 40px rgba(0,0,0,0.15);transition:transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);";const a=A.isSelectionMode?"#fee2e2":"#f0fdf4",o=A.isSelectionMode?"#ef4444":"#16a34a",s=A.isSelectionMode?"bi-x-circle":"bi-check2-square";t.innerHTML=`
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
                <button id="optSelectMode" style="width:100%;padding:12px 16px;border:none;background:${a};border-radius:12px;font-size:0.9rem;font-weight:600;color:${o};cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background 0.2s;">
                    <i class="bi ${s}"></i> ${A.isSelectionMode?"Desativar Modo de Exclusão":"Ativar Seleção para Excluir"}
                </button>
                <p style="font-size:0.75rem; color:#6b7280; text-align:center; margin-top:8px;">${A.isSelectionMode?"Toque num card para desmarcar.":"Permite selecionar vários agendamentos para apagar de uma vez."}</p>
            </div>

            <div style="margin-bottom:16px;">
                <div style="font-size:0.7rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">Equipa</div>
                <label style="display:flex;align-items:center;gap:12px;font-size:0.9rem;font-weight:500;color:#374151;cursor:pointer;padding:8px 0; background:#f9fafb; border-radius:12px; padding:12px 16px;">
                    <input type="checkbox" id="optInactiveToggle" style="width:18px;height:18px;accent-color:#4f46e5;" ${A.showInactiveProfs?"checked":""}>
                    Exibir profissionais inativos na barra superior
                </label>
            </div>
        </div>`;const r=document.createElement("div");r.id="optionsOverlay",r.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:9999;opacity:0;transition:opacity 0.3s;",document.body.appendChild(r),document.body.appendChild(t),requestAnimationFrame(()=>{t.style.transform="translateX(-50%) translateY(0)",r.style.opacity="1"});const i=()=>{t.style.transform="translateX(-50%) translateY(100%)",r.style.opacity="0",setTimeout(()=>{t.remove(),r.remove()},300)};document.getElementById("closeOptSheet").addEventListener("click",i),r.addEventListener("click",i),document.getElementById("optSelectMode").addEventListener("click",()=>{A.isSelectionMode=!A.isSelectionMode,A.isSelectionMode||A.selectedItems.clear(),i(),ro(),A.isSelectionMode&&setTimeout(()=>{g("Modo de Exclusão Ativo.","info")},300)}),document.getElementById("optInactiveToggle").addEventListener("change",n=>{A.showInactiveProfs=n.target.checked,Oa()})}function ls(e){e<1||e>4||(R.step=e,Sa(null,!0))}function bi(e){return{title:e?"Editar Reserva":"Identificar Cliente",content:`
        <div class="p-5 space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-gray-500 mb-1.5">Nome *</label>
                    <input type="text" id="apptClientName" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" value="${U(R.data.clientName)}">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-gray-500 mb-1.5">Telefone/WhatsApp *</label>
                    <input type="tel" id="apptClientPhone" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" value="${U(R.data.clientPhone)}">
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
        </div>`}}function fi(){return{title:"Serviços",content:`
        <div class="p-5 space-y-5">
            <div class="flex items-center gap-3">
                <div class="relative flex-1">
                    <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input type="search" id="serviceSearchModalInput" placeholder="Buscar serviço..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg text-sm">
                </div>
                <label class="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                    <input type="checkbox" id="multiServiceToggle" class="w-4 h-4 rounded" ${R.data.selectedServiceIds.length>1?"checked":""}>
                    <span class="text-xs font-semibold text-gray-600">Múltiplos</span>
                </label>
            </div>
            <div id="apptServicesContainer" class="grid grid-cols-2 gap-3 max-h-56 overflow-y-auto">
                ${aa.map(e=>`<div class="service-card p-3 bg-white rounded-xl border ${R.data.selectedServiceIds.includes(e.id)?"border-indigo-500 bg-indigo-50":"border-gray-200"} cursor-pointer" data-service-id="${e.id}">
                        <p class="font-semibold text-sm text-gray-800 truncate">${U(e.name)}</p>
                        <p class="text-xs text-gray-500 mt-0.5">R$ ${e.price.toFixed(2)} · ${e.duration} min</p>
                    </div>`).join("")}
            </div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="2" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="2" class="py-2.5 px-5 bg-gray-900 text-white font-semibold text-sm rounded-lg">Avançar</button>
        </div>`}}function xi(){return{title:"Profissional",content:`
        <div class="p-5 space-y-5">
            <div class="relative">
                <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input type="search" id="professionalSearchModalInput" placeholder="Buscar na equipa..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg text-sm">
            </div>
            <div id="apptProfessionalContainer" class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-52 overflow-y-auto professional-step-cards">
                ${ka.map(e=>`<div class="professional-modal-card p-3 bg-white rounded-xl border ${R.data.professionalId===e.id?"border-indigo-500 bg-indigo-50":"border-gray-200"} cursor-pointer text-center" data-professional-id="${e.id}">
                        <div class="w-10 h-10 rounded-full bg-gray-100 mx-auto flex items-center justify-center font-bold text-sm text-gray-500">${U(e.name).charAt(0)}</div>
                        <p class="text-sm font-semibold mt-2 truncate">${U(e.name.split(" ")[0])}</p>
                    </div>`).join("")}
            </div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="3" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="3" class="py-2.5 px-5 bg-gray-900 text-white font-semibold text-sm rounded-lg">Avançar</button>
        </div>`}}function hi(){const e=R.data.date||new Date().toISOString().split("T")[0];return{title:"Data e Horário",content:`
        <div class="p-5 space-y-5">
            <div class="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
                <div class="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">${U(R.data.clientName).charAt(0)}</div>
                <div class="min-w-0">
                    <p class="font-semibold text-sm text-gray-900 truncate">${U(R.data.clientName)}</p>
                    <p class="text-xs text-gray-500 truncate">${U(R.data.professionalName)}</p>
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
            <button type="submit" class="py-2.5 px-8 bg-indigo-600 text-white font-semibold text-sm rounded-lg flex items-center gap-2"><i class="bi bi-calendar-check"></i> ${R.data.id?"Salvar":"Agendar"}</button>
        </div>`}}async function Sa(e=null,t=!1){const a=document.getElementById("appointmentModal");t||(R={step:1,data:{id:e?.id||null,clientName:e?.clientName||"",clientPhone:e?.clientPhone||"",selectedServiceIds:e?.services?.map(s=>s.id)||[],professionalId:e?.professionalId||null,professionalName:e?.professionalName||"",date:e?.startTime?new Date(e.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],time:e?.startTime?new Date(e.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null,redeemedReward:e?.redeemedReward||null,clientHasRewards:e?.hasRewards||!1,clientLoyaltyPoints:0}}),aa=p.services||[],ka=(p.professionals||[]).filter(s=>s.status==="active");let o;switch(R.step){case 1:o=bi(e);break;case 2:o=fi();break;case 3:o=xi();break;case 4:o=hi();break}a.innerHTML=`
        <div class="modal-content max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden m-4 flex flex-col" style="max-height:90vh;">
            <header class="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                <div class="flex items-center gap-3">
                    <span class="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">${R.step}/4</span>
                    <h2 class="text-lg font-bold text-gray-900">${o.title}</h2>
                </div>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
                    <i class="bi bi-x-lg"></i>
                </button>
            </header>
            <form id="appointmentForm" class="flex-1 overflow-y-auto">${o.content}</form>
        </div>`,a.querySelectorAll('[data-action="next-step"]').forEach(s=>s.addEventListener("click",()=>{const r=parseInt(s.dataset.currentStep,10);if(r===1&&(R.data.clientName=a.querySelector("#apptClientName").value.trim(),R.data.clientPhone=a.querySelector("#apptClientPhone").value.trim(),!R.data.clientName))return g("Preencha o nome do cliente.","warning");if(r===2&&R.data.selectedServiceIds.length===0)return g("Selecione um serviço.","warning");if(r===3&&!R.data.professionalId)return g("Escolha um profissional.","warning");ls(r+1)})),a.querySelectorAll('[data-action="prev-step"]').forEach(s=>s.addEventListener("click",()=>ls(parseInt(s.dataset.currentStep,10)-1))),a.querySelector('[data-action="close-modal"]')?.addEventListener("click",()=>{a.style.display="none"}),R.step===4&&a.querySelector("#appointmentForm").addEventListener("submit",vi),a.style.display="flex",R.step===2&&a.querySelectorAll(".service-card").forEach(s=>s.addEventListener("click",()=>{const r=a.querySelector("#multiServiceToggle")?.checked,i=s.classList.contains("selected");r||(a.querySelectorAll(".service-card.selected").forEach(d=>d.classList.remove("selected","border-indigo-500","bg-indigo-50")),R.data.selectedServiceIds=[]);const n=s.dataset.serviceId;i?(s.classList.remove("selected","border-indigo-500","bg-indigo-50"),R.data.selectedServiceIds=R.data.selectedServiceIds.filter(d=>d!==n)):(s.classList.add("selected","border-indigo-500","bg-indigo-50"),R.data.selectedServiceIds.push(n))})),R.step===3&&a.querySelectorAll(".professional-modal-card").forEach(s=>s.addEventListener("click",()=>{a.querySelectorAll(".professional-modal-card.selected").forEach(i=>i.classList.remove("selected","border-indigo-500","bg-indigo-50")),s.classList.add("selected","border-indigo-500","bg-indigo-50"),R.data.professionalId=s.dataset.professionalId;const r=ka.find(i=>i.id===s.dataset.professionalId);R.data.professionalName=r?r.name:""})),R.step===1&&a.querySelector("#clientSearchInput")?.addEventListener("input",s=>wi(s.target.value)),R.step===4&&(a.querySelector("#apptDate")?.addEventListener("change",ds),ds(),yi())}async function vi(e){e.preventDefault();const a=e.target.querySelector('button[type="submit"]');if(!R.data.time||!R.data.selectedServiceIds.length||!R.data.professionalId)return g("Selecione horário, serviço e profissional.","warning");a.disabled=!0,a.innerHTML="Aguarde...";const o=R.data.selectedServiceIds.map(l=>{const c=aa.find(u=>u.id===l);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[s,r]=R.data.time.split(":"),i=new Date(`${R.data.date}T${s}:${r}:00`),d={establishmentId:p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments[0]:p.establishmentId,clientName:R.data.clientName,clientPhone:R.data.clientPhone,services:o,professionalId:R.data.professionalId,professionalName:R.data.professionalName,startTime:i.toISOString(),redeemedReward:R.data.redeemedReward};R.data.id&&(d.id=R.data.id);try{R.data.id?await cr(R.data.id,d):await dr(d),g("Agendamento registrado!","success"),document.getElementById("appointmentModal").style.display="none",ye()}catch(l){g(l.message,"error"),a.disabled=!1,a.textContent="Agendar"}}async function ds(){const e=document.getElementById("availableTimesContainer"),t=document.getElementById("apptTotalDuration");if(!e)return;const a=R.data.selectedServiceIds.reduce((i,n)=>{const d=aa.find(l=>l.id===n);return i+(d?d.duration+(d.bufferTime||0):0)},0);t&&(t.textContent=`${a} min`);const{professionalId:o,selectedServiceIds:s,date:r}=R.data;if(!o||!s.length||!r){e.innerHTML='<p class="col-span-full text-center text-xs text-gray-400">Selecione serviço e profissional</p>';return}try{const i=p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments[0]:p.establishmentId;let n=await lr({establishmentId:i,professionalId:o,serviceIds:s,date:r});const d=new Date;if(new Date(r+"T00:00:00").toDateString()===d.toDateString()){const l=d.getHours()*60+d.getMinutes();n=n.filter(c=>{const[u,m]=c.split(":").map(Number);return u*60+m>=l})}e.innerHTML=n.length>0?n.map(l=>`<button type="button" class="p-2 text-sm font-semibold rounded-lg border ${R.data.time===l?"bg-indigo-600 text-white border-indigo-600":"bg-gray-50 text-gray-700 border-gray-200 hover:bg-indigo-50"}" onclick="document.querySelectorAll('#availableTimesContainer button').forEach(b=>{b.classList.remove('bg-indigo-600','text-white','border-indigo-600');b.classList.add('bg-gray-50','text-gray-700','border-gray-200')});this.classList.add('bg-indigo-600','text-white','border-indigo-600');this.classList.remove('bg-gray-50','text-gray-700','border-gray-200');window._selectedTime='${l}';">${l}</button>`).join(""):'<p class="col-span-full text-center text-xs text-gray-400">Sem horários</p>'}catch{e.innerHTML='<p class="col-span-full text-center text-xs text-red-400">Erro</p>'}}function yi(){const e=document.getElementById("loyaltyRewardsContainer");if(!e)return;const{clientHasRewards:t,clientLoyaltyPoints:a}=R.data,{enabled:o,rewards:s}=Ot;if(!o||!t||!s?.length){e.innerHTML="";return}const r=s.filter(i=>a>=i.points);if(!r.length){e.innerHTML='<p class="text-xs text-gray-400">Sem recompensas disponíveis.</p>';return}e.innerHTML=`<div class="border-t border-gray-100 pt-4">
        <p class="text-xs font-semibold text-gray-500 mb-2">Resgate fidelidade (${a} pts)</p>
        ${r.map(i=>`<label class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg mb-1 cursor-pointer"><input type="radio" name="loyaltyReward" value="${U(i.reward)}" data-points="${i.points}" class="accent-indigo-600"><span class="text-sm">${U(i.reward)} (-${i.points} pts)</span></label>`).join("")}
    </div>`,e.querySelectorAll('input[name="loyaltyReward"]').forEach(i=>{i.addEventListener("change",n=>{n.target.checked&&(R.data.redeemedReward={reward:n.target.value,points:parseInt(n.target.dataset.points,10)})})})}async function wi(e){const t=document.getElementById("clientSearchResults");if(!t||e.trim().length<3){t&&(t.innerHTML='<p class="text-xs text-gray-400">Digite pelo menos 3 caracteres...</p>');return}t.innerHTML='<div class="text-center py-3"><div class="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div></div>';try{const o=(p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments:[p.establishmentId]).map(n=>Kt(n,e.trim())),s=await Promise.all(o),r=new Map;s.forEach(n=>{n.forEach(d=>{d.phone?r.set(d.phone,d):r.set(d.id||Math.random().toString(),d)})});const i=Array.from(r.values());if(oo=i,!i.length){t.innerHTML='<p class="text-xs text-gray-400">Nenhum cliente encontrado.</p>';return}t.innerHTML=i.map(n=>`<div class="client-card p-2.5 bg-white rounded-lg border ${R.data.clientName===n.name&&R.data.clientPhone===n.phone?"border-indigo-500 bg-indigo-50":"border-gray-200"} cursor-pointer flex items-center gap-2" data-client-name="${U(n.name)}" data-client-phone="${U(n.phone)}" data-loyalty-points="${n.loyaltyPoints||0}">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">${U(n.name).charAt(0)}</div>
                <div><p class="text-sm font-semibold text-gray-800">${U(n.name)}</p><p class="text-xs text-gray-500">${U(n.phone)}</p></div>
            </div>`).join(""),t.querySelectorAll(".client-card").forEach(n=>n.addEventListener("click",()=>{R.data.clientName=n.dataset.clientName,R.data.clientPhone=n.dataset.clientPhone,R.data.clientLoyaltyPoints=parseInt(n.dataset.loyaltyPoints||"0",10);const d=Math.min(...(Ot?.rewards||[]).map(l=>l.points));R.data.clientHasRewards=Ot.enabled&&d!==1/0&&R.data.clientLoyaltyPoints>=d,document.getElementById("apptClientName").value=n.dataset.clientName,document.getElementById("apptClientPhone").value=n.dataset.clientPhone,t.querySelectorAll(".client-card").forEach(l=>l.classList.remove("border-indigo-500","bg-indigo-50")),n.classList.add("border-indigo-500","bg-indigo-50")}))}catch{t.innerHTML='<p class="text-xs text-red-400">Erro ao buscar.</p>'}}const ki=(e,t=null,a=1,o=12)=>{let s=`/api/comandas/${e}?page=${a}&limit=${o}`;return t&&(s+=`&date=${t}`),C(s)},Si=(e,t)=>C(`/api/appointments/${e}/comanda`,{method:"POST",body:JSON.stringify({items:t})}),$i=e=>C("/api/sales",{method:"POST",body:JSON.stringify(e)}),Ei=e=>C(`/api/sales/${e}`,{method:"DELETE"}),sa=e=>C(`/api/products/${e}`),Ii=e=>C("/api/products",{method:"POST",body:JSON.stringify(e)}),Li=(e,t)=>C(`/api/products/${e}`,{method:"PUT",body:JSON.stringify(t)}),Ci=e=>C(`/api/products/${e}`,{method:"DELETE"}),Di=(e,t)=>C(`/api/products/${e}/stock`,{method:"PATCH",body:JSON.stringify(t)}),Ti=({startDate:e,endDate:t,productId:a,categoryId:o,establishmentId:s})=>{const r=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&r.append("productId",a),o&&o!=="all"&&r.append("categoryId",o),s&&r.append("establishmentId",s),C(`/api/products/stock-history/report?${r.toString()}`)},Bi=()=>C("/api/cashier/status").catch(e=>{if(e.message.includes("404")||e.message.includes("não encontrada"))return null;throw e}),Pi=e=>{const t={establishmentId:e.establishmentId,initialAmount:Number(e.initialAmount),notes:e.notes||""};return console.log("Payload enviado para abrir caixa:",t),C("/api/cashier/open",{method:"POST",body:JSON.stringify(t)})},Mi=(e,t)=>{const a={finalAmount:Number(t)};return console.log("Payload enviado para fechar caixa:",a),C(`/api/cashier/close/${e}`,{method:"PUT",body:JSON.stringify(a)})},Ai=()=>C("/api/cashier/history").then(e=>e||[]).catch(e=>(console.error("Erro ao buscar histórico:",e),[])),qi=e=>C(`/api/cashier/report/${e}`),_a=e=>C(`/api/packages/${e}`),Ri=e=>C("/api/packages",{method:"POST",body:JSON.stringify(e)}),Ni=(e,t)=>C(`/api/packages/${e}`,{method:"PUT",body:JSON.stringify(t)}),ji=e=>C(`/api/packages/${e}`,{method:"DELETE"});let v={allComandas:[],catalog:{services:[],products:[],packages:[]},activeFilter:"abertas",selectedComandaId:null,viewMode:"items",isCashierOpen:!1,activeCashierSessionId:null,loyaltySettings:null,pendingRedemption:null,paging:{page:1,limit:15,total:0},checkoutState:{payments:[],selectedMethod:"dinheiro",installments:1,amountReceived:"",discount:{type:"real",value:0},discountReason:""},isProcessing:!1,showHistoryDate:!1},qe=null,je=null,cs=null;function no(e,t){return function(...a){clearTimeout(cs),cs=setTimeout(()=>e.apply(this,a),t)}}async function us(e,t="stay"){if(!e||!e.id)return;e._localUpdatedAt=Date.now(),e._cachedItems=null,e._hasUnsavedChanges=!1,ia(),t==="checkout"&&(v.viewMode="checkout",v.checkoutState.payments||(v.checkoutState.payments=[]),v.checkoutState.selectedMethod="dinheiro",v.checkoutState.amountReceived="",v.checkoutState.discount.value||(v.checkoutState.discount={type:"real",value:0},v.checkoutState.discountReason=""),Z());const a=document.createElement("div");a.id="saving-overlay",a.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",a.innerHTML=`
        <div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center animate-fade-in">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-800 font-bold text-lg">Sincronizando...</p>
        </div>
    `,document.body.appendChild(a);try{const o=(e.comandaItems||[]).filter(s=>s&&s.id&&String(s.id)!=="undefined"&&String(s.id)!=="null").map(s=>{const r={...s};if(r.id=String(s.id),r.type==="product"){const i=r.id;r.productId||(r.productId=i),r.product_id||(r.product_id=i)}if(r.type==="service"){const i=r.id;r.serviceId||(r.serviceId=i),r.service_id||(r.service_id=i)}return r});e.type==="walk-in"&&String(e.id).startsWith("temp-")||await Si(e.id,o),document.body.contains(a)&&document.body.removeChild(a),t!=="checkout"&&(g("Sucesso","Comanda atualizada!","success"),Z())}catch(o){document.body.contains(a)&&document.body.removeChild(a),console.error("Erro ao salvar:",o),e._hasUnsavedChanges=!0,Z(),g("Erro","Falha ao salvar no servidor: "+o.message,"warning")}}function we(e){if(!e._cachedItems){let t=[];if(e.status==="completed"){const a=e.comandaItems||e.items||[];t=a.length>0?a:e.services||[]}else{const a=(e.services||[]).map(i=>({...i,_source:"original_service",type:"service"})),o=a.reduce((i,n)=>{const d=String(n.id);return i[d]=(i[d]||0)+1,i},{}),s=[...e.comandaItems||[],...e.items||[]],r=[];s.forEach(i=>{const n=String(i.id);(i.type==="service"||!i.type)&&o[n]>0?o[n]--:r.push({...i,_source:"extra"})}),t=[...a,...r]}return e._cachedItems=t,e._cachedTimestamp=Date.now(),t}return e._cachedItems}function Fi(){const e=document.getElementById("comandas-layout");if(e){e.classList.add("detail-view-active");const t=document.getElementById("comanda-detail-container");t&&(t.scrollTop=0)}}function Fe(){const e=document.getElementById("comandas-layout");e&&e.classList.remove("detail-view-active")}function Hi(){const e=v.allComandas||[],t=e.filter(l=>l.status!=="completed").length,a=e.filter(l=>l.status==="completed"),o=a.reduce((l,c)=>{let u=c.totalAmount!==void 0?Number(c.totalAmount):we(c).reduce((m,f)=>m+Number(f.price||0),0);return l+u},0),s=a.length>0?o/a.length:0,r=document.getElementById("kpi-abertas"),i=document.getElementById("kpi-pagas"),n=document.getElementById("kpi-vendas"),d=document.getElementById("kpi-ticket");r&&(r.textContent=t),i&&(i.textContent=a.length),n&&(n.textContent=`R$ ${o.toFixed(2).replace(".",",")}`),d&&(d.textContent=`R$ ${s.toFixed(2).replace(".",",")}`)}function zi(){const e=new Date().toISOString().split("T")[0];je.innerHTML=`
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
    `,ra(),oa()}function oa(){document.querySelectorAll(".filter-btn").forEach(a=>{a.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.add("bg-white","text-gray-600","border-gray-200")});const e=document.querySelector(`[data-filter="${v.activeFilter}"]`);e&&(e.classList.remove("bg-white","text-gray-600","border-gray-200"),e.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"));const t=document.getElementById("finalizadas-datepicker");t&&t.classList.toggle("hidden",!v.showHistoryDate)}function ra(){const e=document.getElementById("cashier-alert-box"),t=document.getElementById("btn-new-sale");v.isCashierOpen?(e&&(e.innerHTML=""),t&&(t.classList.remove("opacity-50","cursor-not-allowed"),t.disabled=!1)):(e&&(e.innerHTML=`
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
        `),t&&(t.classList.add("opacity-50","cursor-not-allowed"),t.disabled=!0)),Oi()}function Oi(){const e=document.getElementById("cashier-controls");e&&(v.isCashierOpen?e.innerHTML=`
            <span class="hidden sm:inline-block text-xs font-bold text-green-700 bg-green-100 py-1.5 px-3 rounded-lg border border-green-200 uppercase">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-1.5 px-3 bg-red-50 text-red-700 border border-red-200 font-semibold rounded-lg hover:bg-red-100 text-xs transition">Fechar Caixa</button>
        `:e.innerHTML=`
            <span class="hidden sm:inline-block text-xs font-bold text-red-700 bg-red-100 py-1.5 px-3 rounded-lg border border-red-200 uppercase">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-1.5 px-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-xs shadow transition">Abrir Caixa</button>
        `)}function ia(){const e=document.getElementById("comandas-list"),t=document.getElementById("pagination-container");if(!e)return;if(!v.isCashierOpen&&v.activeFilter==="abertas"){e.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <svg class="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `,t&&(t.innerHTML="");return}let a=v.allComandas||[];if(v.activeFilter==="abertas"?a=a.filter(s=>s.status!=="completed"):v.activeFilter==="pagas"&&(a=a.filter(s=>s.status==="completed")),Hi(),a.length===0){e.innerHTML='<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda encontrada para este filtro.</p>',ps(t);return}const o=document.createDocumentFragment();a.forEach(s=>{const r=we(s);let i=0;s.status==="completed"&&s.totalAmount!==void 0&&s.totalAmount!==null?i=Number(s.totalAmount):i=r.reduce((L,S)=>L+Number(S.price||0),0);const d=s.loyaltyRedemption||s.discount&&s.discount.reason&&String(s.discount.reason).toLowerCase().includes("fidelidade")?'<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-5 h-5 ml-2" title="Prémio Resgatado">🎁</span>':"",l=s.id===v.selectedComandaId,c=new Date(s.startTime),u=c.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}),m=c.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),f=`${u} às ${m}`,x=s.type==="walk-in"||typeof s.id=="string"&&s.id.startsWith("temp-"),y=s.status==="completed",b=h(s.clientName||"Cliente sem nome"),I=h(s.professionalName||"Sem profissional");let $="";y?$='<span class="text-[10px] font-bold uppercase text-green-700 bg-green-100 px-2 py-0.5 rounded-md border border-green-200">Paga</span>':x?$='<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">Avulsa</span>':$='<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">Agenda</span>';const k=document.createElement("div");k.className=`comanda-card cursor-pointer ${l?"selected":""}`,k.dataset.action="select-comanda",k.dataset.comandaId=s.id,k.innerHTML=`
            <div class="flex justify-between items-start mb-1 pointer-events-none">
                <p class="font-bold text-gray-800 truncate max-w-[70%] text-sm">${b}</p>
                <div class="flex items-center">
                    <p class="font-bold ${y?"text-green-600":"text-gray-900"} text-sm">R$ ${i.toFixed(2)}</p>
                    ${d}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none">
                <div class="flex items-center gap-2">
                    ${$}
                    <p class="text-xs text-gray-500 truncate max-w-[100px]">${I}</p>
                </div>
                <p class="text-[11px] text-gray-600 font-semibold bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">${f}</p> 
            </div>
        `,o.appendChild(k)}),e.innerHTML="",e.appendChild(o),ps(t)}function ps(e){if(!e)return;e.innerHTML="";const{page:t,total:a,limit:o}=v.paging,s=Math.ceil((a||0)/o);if(s===0)return;const r=document.createElement("div");r.className="flex gap-2 justify-center items-center w-full",r.innerHTML=`
        <button data-page="${t-1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t<=1?"opacity-50 cursor-not-allowed":""}" ${t<=1?"disabled":""}>&laquo;</button>
        <span class="text-xs font-semibold text-gray-600 mx-2">Pág ${t} de ${s||1}</span>
        <button data-page="${t+1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t>=s?"opacity-50 cursor-not-allowed":""}" ${t>=s?"disabled":""}>&raquo;</button>
    `,e.appendChild(r),r.querySelectorAll("button[data-page]").forEach(i=>{i.onclick=n=>{n.stopPropagation();const d=parseInt(i.dataset.page,10);d>0&&d<=s&&(v.paging.page=d,ce())}})}function Z(){const e=document.getElementById("comanda-detail-container");if(!e)return;const t=v.allComandas.find(y=>y.id===v.selectedComandaId);if(v.viewMode==="checkout"&&t){Vi(t,e);return}const a=`
        <div class="mobile-only-header">
            <button data-action="back-to-list" class="btn-back-mobile">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h3 class="font-bold text-lg text-gray-800 ml-2">Detalhes</h3>
        </div>
    `;if(!v.isCashierOpen){e.innerHTML=`
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
        `;return}const o=we(t),s=t.status==="completed",r=t.type==="walk-in"||typeof t.id=="string"&&t.id.startsWith("temp-"),i=o.reduce((y,b)=>{const I=b._source==="original_service",$=b.id||b.name,k=I?`original-${$}`:`${b.type}-${$}`;return y[k]||(y[k]={...b,quantity:0,sources:[]}),y[k].quantity+=1,b._source&&y[k].sources.push(b._source),y},{}),n=Object.values(i).reduce((y,b)=>y+Number(b.price||0)*b.quantity,0),d=h(t.clientName||"Cliente sem nome"),l=h(t.professionalName||"Profissional não atribuído"),c=t._hasUnsavedChanges,f=`
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
    `,x=`
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
                ${Object.values(i).map(y=>{const b=y.sources&&y.sources.includes("original_service"),I=v.pendingRedemption&&String(v.pendingRedemption.appliedToItemId)===String(y.id),$=y.isReward||I;return`
                    <div class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm ${$?"border-yellow-300 bg-yellow-50 ring-1 ring-yellow-200":""}">
                        <div class="flex items-center gap-3 w-full">
                            <div class="flex-grow min-w-0">
                                <p class="text-sm font-semibold text-gray-800 line-clamp-1">
                                    ${$?"🎁 ":""}
                                    ${h(y.name)}
                                    ${b?'<span class="text-[10px] text-indigo-600 bg-indigo-50 px-1 rounded border border-indigo-100 ml-1">Original</span>':""}
                                </p>
                                <p class="text-xs text-gray-500">${$?'<span class="text-yellow-700 font-bold bg-yellow-100 px-1 rounded">Prémio Fidelidade</span>':`R$ ${(y.price||0).toFixed(2)} un.`}</p>
                            </div>
                            ${s?`<span class="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg">${y.quantity}x</span>`:`
                                <div class="flex items-center bg-gray-100 rounded-lg p-1 gap-3">
                                    ${b?`<span class="text-sm font-bold text-gray-500 w-16 text-center py-1 bg-gray-200 rounded text-[10px] uppercase">Fixo: ${y.quantity}</span>`:`<button data-action="decrease-qty" data-item-id="${y.id}" data-item-type="${y.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-600">-</button>
                                         <span class="text-sm font-bold text-gray-800 w-4 text-center">${y.quantity}</span>
                                         <button data-action="increase-qty" data-item-id="${y.id}" data-item-type="${y.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-green-50 hover:text-green-600">+</button>`}
                                </div>
                            `}
                            <div class="flex items-center justify-end w-20">
                                <span class="font-bold text-gray-900 whitespace-nowrap">R$ ${(y.price*y.quantity).toFixed(2)}</span>
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
            `:f}
        </footer>

        ${s?"":x}
    `,!s&&(t.clientId||t.clientName)&&_i(t,e.querySelector("#loyalty-container"))}function Vi(e,t){const o=we(e).reduce((m,f)=>m+Number(f.price||0)*(f.quantity||1),0),s=v.checkoutState,r=s.discount||{type:"real",value:0};let i=0;r.type==="percent"?i=o*r.value/100:i=r.value,i>o&&(i=o);const n=o-i,d=s.payments.reduce((m,f)=>m+f.value,0),l=Math.max(0,n-d);(!s.amountReceived||l>0)&&(s.amountReceived=l.toFixed(2));const c=`
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
                    ${l<=.01?'<p class="text-green-600 font-bold text-lg">Pago</p>':`<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${l.toFixed(2)}</span></p>`}
                </div>
            </div>

            <div class="space-y-3 mb-6">
                ${s.payments.map((m,f)=>`
                    <div class="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-3">
                             <div class="bg-gray-100 p-2 rounded-lg">
                                <span class="font-bold text-xs uppercase text-gray-600">${m.method}</span>
                             </div>
                             ${m.installments>1?`<span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">${m.installments}x</span>`:""}
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-gray-900">R$ ${m.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${f}" class="text-red-400 hover:text-red-600 p-1"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
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
                            ${Array.from({length:12},(m,f)=>`<option value="${f+1}" ${s.installments===f+1?"selected":""}>${f+1}x</option>`).join("")}
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
    `;const u=()=>{const m=v.checkoutState.discount.type,f=v.checkoutState.discount.value;let x=m==="percent"?o*f/100:f;x>o&&(x=o);const y=o-x,b=v.checkoutState.payments.reduce((S,P)=>S+P.value,0),I=Math.max(0,y-b),$=t.querySelector("#checkout-total-display");$&&($.textContent=`R$ ${y.toFixed(2)}`);const k=t.querySelector("#checkout-status-msg");k&&(I<=.01?k.innerHTML='<p class="text-green-600 font-bold text-lg">Pago</p>':k.innerHTML=`<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${I.toFixed(2)}</span></p>`);const L=t.querySelector("#checkout-amount");L&&I>0&&document.activeElement!==L&&(L.value=I.toFixed(2))};t.querySelector("#discount-value")?.addEventListener("input",m=>{const f=parseFloat(m.target.value)||0;v.checkoutState.discount.value=f,u()}),t.querySelector("#discount-type")?.addEventListener("change",m=>{v.checkoutState.discount.type=m.target.value,u()}),t.querySelector("#discount-reason")?.addEventListener("input",m=>{v.checkoutState.discountReason=m.target.value}),t.querySelector("#checkout-amount")?.addEventListener("input",m=>{v.checkoutState.amountReceived=m.target.value}),t.querySelector("#checkout-installments")?.addEventListener("change",m=>{v.checkoutState.installments=parseInt(m.target.value,10)})}async function _i(e,t){if(!t)return;const a=v.loyaltySettings;if(!a||!a.enabled)return;let o=null;try{if(e.clientId)o=await Ys(p.establishmentId,e.clientId);else if(e.clientName){const n=await Kt(p.establishmentId,e.clientName,1);n&&n.length>0&&(o=n[0])}}catch(n){console.warn("Erro ao buscar dados de fidelidade",n)}if(!o||o.loyaltyPoints===void 0)return;const s=Number(o.loyaltyPoints)||0,i=(a.tiers||a.rewards||[]).filter(n=>{const d=Number(n.costPoints||n.points||0);return d>0&&s>=d});if(i.length>0){const n=document.createElement("div");n.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 shadow-sm flex justify-between items-center animate-fade-in",n.innerHTML=`
            <div class="flex items-center gap-3">
                <div class="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div>
                    <p class="text-sm font-bold text-yellow-800">Prémio Disponível!</p>
                    <p class="text-xs text-yellow-700">Saldo: <strong>${s} pts</strong></p>
                </div>
            </div>
        `;const d=document.createElement("button");d.innerText="Resgatar",d.className="text-xs font-bold bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-colors",d.onclick=()=>Ui(i,e),n.appendChild(d),t.innerHTML="",t.appendChild(n)}}function Ui(e,t){const a=`
        <div class="space-y-4">
            <p class="text-sm text-gray-600 mb-4">O cliente possui pontos suficientes para resgatar os seguintes itens:</p>
            <div class="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                ${e.map(r=>{const i=r.costPoints||r.points||0,n=r.name||r.reward,d=r.type||"money",l=r.discount?parseFloat(r.discount).toFixed(2):"0.00";let c="",u="bg-gray-100 text-gray-600";switch(d){case"service":c="Serviço",u="bg-indigo-100 text-indigo-700";break;case"product":c="Produto",u="bg-green-100 text-green-700";break;case"package":c="Pacote",u="bg-purple-100 text-purple-700";break;case"money":default:c="Valor Livre",u="bg-yellow-100 text-yellow-700";break}return`
                    <button data-action="select-reward" data-reward-id="${r.id||n}" class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group">
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
    `,{modalElement:o,close:s}=ie({title:"🎁 Resgatar Prémio",contentHTML:a,maxWidth:"max-w-md"});o.addEventListener("click",r=>{const i=r.target.closest('[data-action="select-reward"]');if(i){const n=i.dataset.rewardId,d=e.find(l=>l.id&&l.id==n||(l.name||l.reward)==n);d&&(Wi(d,t),s())}})}async function Wi(e,t){const a=Number(e.costPoints||e.points||0),o=e.name||e.reward,s=e.type||"money";if(s==="money"){const d=parseFloat(e.discount)||0;if(d<=0){g("Erro","O valor do desconto configurado é inválido.","error");return}v.checkoutState.discount={type:"real",value:d},v.checkoutState.discountReason=`Resgate Fidelidade: ${o}`,v.pendingRedemption={rewardId:e.id||null,name:o,cost:a,type:"money"},g("Sucesso",`Prémio "${o}" resgatado! Desconto de R$ ${d.toFixed(2)} aplicado.`,"success"),Z();return}const r=we(t),i=e.itemId?String(e.itemId):null;if(!i){g("Erro de Configuração",`O prémio "${o}" não tem um item vinculado nas configurações.`,"error");return}const n=r.find(d=>{const l=d.id?String(d.id):null,c=d.serviceId?String(d.serviceId):d.service_id?String(d.service_id):null,u=d.productId?String(d.productId):d.product_id?String(d.product_id):null;return s==="service"?l===i||c===i:s==="product"?l===i||u===i:s==="package"?l===i:!1});if(n){let d=parseFloat(e.discount);(!d||d<=0)&&(d=parseFloat(n.price||0)),v.checkoutState.discount={type:"real",value:d},v.checkoutState.discountReason=`Resgate Fidelidade: ${o}`,v.pendingRedemption={rewardId:e.id||null,name:o,cost:a,type:s,appliedToItemId:n.id},g("Sucesso",`Prémio "${o}" resgatado! Item encontrado e desconto de R$ ${d.toFixed(2)} aplicado.`,"success"),Z()}else g("Item Não Encontrado",`Para resgatar o prémio "${o}", o ${s==="service"?"serviço":s==="product"?"produto":"pacote"} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`,"warning")}function Ji(){if(!v.isCashierOpen)return g("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");const{modalElement:e,close:t}=ie({title:"Adicionar Item à Comanda",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-4xl"}),a=()=>{const s=e.querySelector("#add-item-content");s.innerHTML=`
            <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-purple-600">Pacotes</h4><div id="modal-package-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
            </div>`;const r=(n="")=>{const d=n.toLowerCase(),l={service:'<svg class="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',package:'<svg class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'},c={"modal-service-list":{items:v.catalog.services,type:"service"},"modal-product-list":{items:v.catalog.products,type:"product"},"modal-package-list":{items:v.catalog.packages,type:"package"}};Object.entries(c).forEach(([u,{items:m,type:f}])=>{const x=document.getElementById(u);if(!x)return;const y=m.filter(b=>b.name.toLowerCase().includes(d)).slice(0,50);x.innerHTML=y.map(b=>b.id?`
                    <button data-action="select-item-for-quantity" data-item-type="${f}" data-item-id="${b.id}" class="flex items-center gap-2 w-full p-2 bg-white border rounded hover:bg-gray-50 transition text-left">
                        <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-50">${l[f]}</div>
                        <span class="flex-grow text-sm truncate">${h(b.name)}</span>
                        <span class="font-bold text-xs text-gray-700">R$ ${b.price.toFixed(2)}</span>
                    </button>
                `:"").join("")||'<p class="text-xs text-gray-400 text-center py-2">Nada encontrado</p>'})};r();const i=document.getElementById("item-search-input");i.addEventListener("input",no(n=>{r(n.target.value)},300)),setTimeout(()=>i.focus(),100)},o=s=>{let r=1;const i=e.querySelector("#add-item-content"),n=()=>{document.getElementById("quantity-display").textContent=r,document.getElementById("quantity-minus-btn").disabled=r<=1};i.innerHTML=`
            <div class="text-center p-8 relative">
                <button data-action="back-to-catalog" class="absolute top-0 left-0 text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Voltar
                </button>
                <h3 class="font-bold text-2xl text-gray-800 mt-4">${h(s.name)}</h3>
                <p class="text-lg text-gray-500 font-medium">R$ ${s.price.toFixed(2)}</p>
                <div class="my-8 flex items-center justify-center gap-6">
                    <button id="quantity-minus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition disabled:opacity-50">-</button>
                    <span id="quantity-display" class="text-5xl font-bold w-24 text-center text-indigo-700">${r}</span>
                    <button id="quantity-plus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition">+</button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg text-lg">Adicionar à Comanda</button>
            </div>
        `,document.getElementById("quantity-minus-btn").onclick=()=>{r>1&&(r--,n())},document.getElementById("quantity-plus-btn").onclick=()=>{r++,n()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await co(s,r),t()}};e.addEventListener("click",s=>{const r=s.target.closest('[data-action="select-item-for-quantity"]'),i=s.target.closest('[data-action="back-to-catalog"]');if(r){const{itemType:n,itemId:d}=r.dataset,c=(v.catalog[n+"s"]||[]).find(u=>u.id===d);c&&o({...c,type:n})}else i&&a()}),a()}async function $a(e=null){if(!v.isCashierOpen)return g("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");if(!p.professionals||p.professionals.length===0)try{p.professionals=await de(p.establishmentId)}catch{return g("Erro","Não foi possível carregar profissionais.","error")}const a=`
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
    `,{modalElement:o}=ie({title:"Nova Venda Avulsa",contentHTML:a,maxWidth:"max-w-md"}),s=o.querySelector("#client-search"),r=o.querySelector("#client-suggestions"),i=o.querySelector("#selected-client-id");e&&(i.value=e.id,s.value=`${e.name} (${e.phone||"Sem tel"})`,s.classList.add("bg-green-50","border-green-300","text-green-800")),s.addEventListener("input",no(async d=>{const l=d.target.value.trim();if(i.value="",s.classList.remove("bg-green-50","border-green-300","text-green-800"),l.length<2){r.classList.add("hidden");return}try{r.innerHTML='<li class="p-2 text-xs text-gray-500">Buscando...</li>',r.classList.remove("hidden");const c=await Kt(p.establishmentId,l,10);c.length===0?r.innerHTML='<li class="p-2 text-xs text-gray-500">Nenhum cliente encontrado</li>':r.innerHTML=c.map(u=>`<li data-client-id="${u.id}" data-client-name="${u.name}" data-client-phone="${u.phone}" class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 transition-colors"><div class="font-bold text-sm text-gray-800">${h(u.name)}</div><div class="text-xs text-gray-500">${u.phone||"Sem telefone"}</div></li>`).join("")}catch{r.classList.add("hidden")}},400)),r.addEventListener("click",d=>{const l=d.target.closest("li[data-client-id]");l&&(i.value=l.dataset.clientId,i.dataset.name=l.dataset.clientName,i.dataset.phone=l.dataset.clientPhone,s.value=`${l.dataset.clientName}`,s.classList.add("bg-green-50","border-green-300","text-green-800"),r.classList.add("hidden"))}),document.addEventListener("click",d=>{!s.contains(d.target)&&!r.contains(d.target)&&r.classList.add("hidden")}),o.querySelector("#new-sale-form").addEventListener("submit",en);const n=o.querySelector('[data-action="new-client-from-sale"]');n&&n.addEventListener("click",d=>{d.preventDefault(),o.style.display="none",Gi()})}function Gi(){ie({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("comandas_clientRegistrationForm");t&&t.addEventListener("submit",Qi)}async function Qi(e){e.preventDefault();const t=document.getElementById("comandas_clientRegistrationForm");if(!t)return;const a=t.querySelector("#regClientName"),s=t.querySelector("#regClientPhone").value.replace(/\D/g,"");if(!a.value||!s)return g("Erro","Nome e Telefone são obrigatórios.","error");try{const r=await Qr(p.establishmentId,s);if(r)g("Atenção","Cliente já cadastrado.","info"),document.getElementById("genericModal").style.display="none",$a(r);else{const i=await Ks({establishmentId:p.establishmentId,name:a.value,phone:s});g("Sucesso","Cliente cadastrado!","success"),document.getElementById("genericModal").style.display="none",$a(i)}}catch(r){g("Erro",r.message,"error")}}async function Xi(){const e=`
        <form id="open-cashier-form" class="space-y-4">
            <div>
                <label for="initial-amount" class="block text-sm font-medium text-gray-700">Valor Inicial do Caixa</label>
                <div class="mt-1 relative"><span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span><input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold" placeholder="0.00" value="0.00"></div>
            </div>
            <div class="pt-4 border-t"><button type="submit" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition shadow-md">Confirmar Abertura</button></div>
        </form>
    `,{modalElement:t}=ie({title:"Abrir Caixa",contentHTML:e,maxWidth:"max-w-md"});t.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const o=parseFloat(document.getElementById("initial-amount").value);if(isNaN(o)||o<0)return g("Valor Inválido","Insira um valor válido.","error");try{const s=await Pi({establishmentId:p.establishmentId,initialAmount:parseFloat(o.toFixed(2))});v.isCashierOpen=!0,v.activeCashierSessionId=s.id,document.getElementById("genericModal").style.display="none",g("Sucesso!",`Caixa aberto (R$ ${o.toFixed(2)})`,"success"),ra(),await ce()}catch(s){g("Erro",`Falha ao abrir caixa: ${s.message}`,"error")}})}async function Yi(){const e=v.activeCashierSessionId;if(e)try{const t=await qi(e),a=`
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
        `,{modalElement:o}=ie({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-md"});o.querySelector("#close-cashier-form").addEventListener("submit",async s=>{s.preventDefault();const r=parseFloat(document.getElementById("final-amount").value);if(isNaN(r)||r<0)return g("Valor Inválido","Insira um valor final válido.","error");try{await Mi(e,r),v.isCashierOpen=!1,v.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",ra(),await ce(),g("Sucesso!","Caixa fechado com sucesso!","success")}catch(i){g("Erro",`Falha ao fechar caixa: ${i.message}`,"error")}})}catch(t){g("Erro",`Falha ao carregar relatório: ${t.message}`,"error")}}async function Zi(e){if(v.activeFilter===e)return;v.activeFilter=e,v.paging.page=1,oa(),Fe(),v.selectedComandaId=null,v.viewMode="items";const t=document.getElementById("comandas-list");t&&(t.innerHTML='<div class="loader mx-auto mt-10"></div>'),await ce()}function lo(e){v.selectedComandaId=e,v.viewMode="items",v.pendingRedemption=null,v.checkoutState.discount={type:"real",value:0},v.checkoutState.discountReason="",ia(),Fi(),Z()}async function co(e,t){const a=v.allComandas.find(r=>r.id===v.selectedComandaId);if(!a)return;if(!e.id||String(e.id)==="undefined"){g("Erro","Item sem identificador. Não foi possível adicionar.","error");return}const o=parseFloat(e.price)||0,s=Array(t).fill(0).map(()=>{const r={id:String(e.id),name:e.name,price:o,type:e.type,isReward:e.isReward||!1,pointsCost:e.pointsCost||0};return e.type==="product"?(r.productId=r.id,r.product_id=r.id):e.type==="service"&&(r.serviceId=r.id,r.service_id=r.id),r});a.comandaItems=a.comandaItems||[],a.comandaItems.push(...s),a._cachedItems=null,a._hasUnsavedChanges=!0,Z()}async function ms(e,t){const a=v.allComandas.find(r=>r.id===v.selectedComandaId);if(!a)return;let o=!1,s=(a.comandaItems||[]).findIndex(r=>r.id==e&&r.type===t);s>-1&&(a.comandaItems.splice(s,1),o=!0),o&&(a._cachedItems=null,a._hasUnsavedChanges=!0,Z())}async function Ki(e){if(v.isProcessing)return;const t=we(e),a=t.reduce((b,I)=>b+Number(I.price||0)*(I.quantity||1),0),o=v.checkoutState.discount||{type:"real",value:0};let s=o.type==="percent"?a*o.value/100:o.value;s>a&&(s=a);const r=a-s,{payments:i}=v.checkoutState,n=i.reduce((b,I)=>b+I.value,0),d=r-n;if(d>.01){if(!await J("Pagamento Parcial",`O valor de R$ ${d.toFixed(2)} não foi pago. Deseja registrar como DÍVIDA (Fiado) no cadastro do cliente?`))return;i.push({method:"fiado",value:d,installments:1})}v.isProcessing=!0;const l=e.type==="appointment",c=t;let u=0;const m=v.loyaltySettings;m&&m.enabled&&(u=parseInt(m.pointsPerVisit||1,10));const f={...o,reason:v.checkoutState.discountReason||""},x={payments:i,totalAmount:Number(r),items:c,cashierSessionId:v.activeCashierSessionId,loyaltyPointsEarned:u,discount:f,loyaltyRedemption:v.pendingRedemption},y=document.createElement("div");y.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",y.innerHTML='<div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center"><div class="loader mb-4 border-t-indigo-600"></div><p>Finalizando venda...</p></div>',document.body.appendChild(y);try{l?await mr(e.id,x):(x.establishmentId=p.establishmentId,x.clientId=e.clientId,x.clientName=e.clientName,x.professionalId=e.professionalId,e.clientPhone&&(x.clientPhone=e.clientPhone),await $i(x));let b="Venda finalizada com sucesso!";u>0&&(b+=` Cliente ganhou ${u} pontos!`),g("Sucesso!",b,"success"),Fe(),v.selectedComandaId=null,v.viewMode="items",v.pendingRedemption=null,await ce()}catch(b){g("Erro no Checkout",b.message,"error")}finally{document.body.contains(y)&&document.body.removeChild(y),v.isProcessing=!1}}async function en(e){e.preventDefault();const t=document.getElementById("selected-client-id"),a=document.getElementById("new-sale-professional").value,o=t.value,s=document.getElementById("client-search").value,r=t.dataset.phone||"";if(!o)return g("Erro","Selecione um cliente válido.","error");const i=p.professionals.find(d=>d.id===a);if(!i)return g("Erro","Selecione um profissional válido.","error");const n={id:`temp-${Date.now()}`,type:"walk-in",clientId:o,clientName:s.split("(")[0].trim(),clientPhone:r,professionalId:i.id,professionalName:i.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};v.allComandas.unshift(n),v.selectedComandaId=n.id,v.viewMode="items",document.getElementById("genericModal").style.display="none",v.activeFilter==="pagas"&&(v.activeFilter="abertas"),oa(),lo(n.id)}async function ce(){const e=document.getElementById("comandas-list");(!e.hasChildNodes()||e.innerHTML.includes("loader"))&&(e.innerHTML='<div class="loader mx-auto mt-10"></div>');const t=v.showHistoryDate?document.getElementById("filter-date").value:null;try{const a=Bi(),o=ki(p.establishmentId,t,v.paging.page,v.paging.limit),s=De(p.establishmentId),[r,i,n]=await Promise.all([a,o,s]);if(v.isCashierOpen=!!r,v.activeCashierSessionId=r?r.id:null,ra(),n&&n.loyaltyProgram&&(v.loyaltySettings=n.loyaltyProgram),v.allComandas=i.data||i||[],v.paging.total=i.total||v.allComandas.length,v.catalog.services.length===0){const[d,l,c,u]=await Promise.all([Pe(p.establishmentId),sa(p.establishmentId),_a(p.establishmentId),de(p.establishmentId)]);v.catalog={services:d,products:l,packages:c},p.professionals=u}ia(),Z()}catch(a){g("Erro",`Não foi possível carregar os dados: ${a.message}`,"error")}}async function tn(e={}){je=document.getElementById("content"),v.selectedComandaId=e.selectedAppointmentId||null,v.viewMode="items",zi(),qe&&(je.removeEventListener("click",qe),je.removeEventListener("change",qe)),qe=async t=>{const a=t.target.closest("[data-action], [data-filter], [data-comanda-id]");if(t.target.id==="filter-date"){v.paging.page=1,await ce();return}if(a){if(a.matches("[data-filter]"))Zi(a.dataset.filter);else if(a.matches("[data-comanda-id]")){if(t.target.closest('[data-action="go-to-appointment"]')){t.stopPropagation();return}lo(a.dataset.comandaId)}else if(a.matches("[data-action]")){const s=a.dataset.action,r=a.dataset.id||v.selectedComandaId,i=v.allComandas.find(n=>n.id===r);switch(s){case"toggle-history":v.showHistoryDate=!v.showHistoryDate,v.showHistoryDate&&v.activeFilter==="abertas"&&(v.activeFilter="todas"),oa(),v.showHistoryDate||await ce();break;case"back-to-list":Fe(),v.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach($=>$.classList.remove("selected")),Z();break;case"new-sale":$a();break;case"add-item":Ji();break;case"open-cashier":Xi();break;case"close-cashier":await Yi();break;case"view-sales-report":G("sales-report-section");break;case"go-to-checkout":await us(i,"checkout");break;case"back-to-items":v.viewMode="items",Z();break;case"save-comanda":await us(i,"stay");break;case"select-method":v.checkoutState.selectedMethod=a.dataset.method,v.checkoutState.installments=1,Z();break;case"add-payment-checkout":const n=document.getElementById("checkout-amount");let d=parseFloat(n.value);const c=we(i).reduce(($,k)=>$+(k.price||0),0),u=v.checkoutState.discount||{type:"real",value:0};let m=u.type==="percent"?c*u.value/100:u.value;m>c&&(m=c);const f=c-m,x=v.checkoutState.payments.reduce(($,k)=>$+k.value,0),y=f-x;if(isNaN(d)||d<=0){g("Valor inválido","Insira um valor maior que zero.","error");break}if(d>y+.05){g("Valor inválido","Valor excede o restante.","error");break}const b={method:v.checkoutState.selectedMethod,value:d};["credito","crediario"].includes(v.checkoutState.selectedMethod)&&v.checkoutState.installments>1&&(b.installments=v.checkoutState.installments),v.checkoutState.payments.push(b),v.checkoutState.selectedMethod="dinheiro",v.checkoutState.installments=1,v.checkoutState.amountReceived="",Z();break;case"remove-payment-checkout":const I=parseInt(a.dataset.index,10);v.checkoutState.payments.splice(I,1),Z();break;case"finalize-checkout":await Ki(i);break;case"increase-qty":{const $=a.dataset.itemId,k=a.dataset.itemType;if(!$||$==="undefined"||$==="null"){g("Erro","Item inválido.","error");return}let S=we(i).find(j=>j.id==$&&j.type===k);S||(S=(v.catalog[k+"s"]||[]).find(T=>T.id==$));const P=S?{id:S.id,name:S.name,price:Number(S.price),type:S.type}:{id:$,name:"Item",price:0,type:k};await co(P,1);break}case"decrease-qty":await ms(a.dataset.itemId,a.dataset.itemType);break;case"remove-item":await ms(a.dataset.itemId,a.dataset.itemType);break;case"reopen-appointment":{if(await J("Reabrir Comanda","Tem certeza? O pagamento será estornado."))try{await pr(r);const k=v.allComandas.findIndex(L=>L.id===r);k!==-1&&(v.allComandas[k].status="confirmed",delete v.allComandas[k].transaction),v.selectedComandaId=null,Fe(),await ce(),g("Sucesso!","Comanda reaberta.","success")}catch(k){g("Erro",k.message,"error")}break}case"go-to-appointment":{G("agenda-section",{scrollToAppointmentId:a.dataset.id,targetDate:new Date(a.dataset.date)});break}case"delete-walk-in":{if(await J("Excluir Venda","Confirma a exclusão desta venda avulsa?"))if(r.startsWith("temp-"))v.allComandas=v.allComandas.filter(k=>k.id!==r),v.selectedComandaId=null,ia(),Z(),Fe();else try{await Ei(r),g("Sucesso","Venda excluída.","success"),v.selectedComandaId=null,Fe(),await ce()}catch(k){g("Erro",k.message,"error")}break}}}}},je.addEventListener("click",qe),je.addEventListener("change",qe),e.initialFilter&&(e.initialFilter==="finalizadas"?v.activeFilter="pagas":v.activeFilter="abertas"),e.selectedAppointmentId&&(v.selectedComandaId=e.selectedAppointmentId),e.filterDate&&(document.getElementById("filter-date").value=new Date(e.filterDate).toISOString().split("T")[0],v.showHistoryDate=!0),await ce()}const na=e=>C(`/api/financial/natures/${e}`),an=e=>C("/api/financial/natures",{method:"POST",body:JSON.stringify(e)}),sn=e=>C(`/api/financial/natures/${e}`,{method:"DELETE"}),Ua=e=>C(`/api/financial/cost-centers/${e}`),on=e=>C("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(e)}),rn=e=>C(`/api/financial/cost-centers/${e}`,{method:"DELETE"}),uo=(e,t)=>C(`/api/financial/${e}`,{method:"POST",body:JSON.stringify(t)}),po=(e,t={})=>{let a=`/api/financial/${e}`;const o=new URLSearchParams;t.establishmentId&&o.append("establishmentId",t.establishmentId),t.startDate&&o.append("startDate",t.startDate),t.endDate&&o.append("endDate",t.endDate),t.natureId&&o.append("natureId",t.natureId),t.costCenterId&&o.append("costCenterId",t.costCenterId),t.status&&o.append("status",t.status);const s=o.toString();return s&&(a+=`?${s}`),C(a)},mo=(e,t,a)=>C(`/api/financial/${e}/${t}`,{method:"PUT",body:JSON.stringify(a)}),go=(e,t)=>C(`/api/financial/${e}/${t}`,{method:"DELETE"}),bo=(e,t)=>{const a=t.map(o=>C(`/api/financial/${e}/${o}`,{method:"DELETE"}));return Promise.all(a)},fo=(e,t,a)=>C(`/api/financial/${e}/${t}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),nn=e=>uo("payables",e),xo=e=>po("payables",e),ln=(e,t)=>mo("payables",e,t),dn=e=>go("payables",e),cn=(e,t)=>fo("payables",e,t),un=e=>uo("receivables",e),ho=e=>po("receivables",e),pn=(e,t)=>mo("receivables",e,t),mn=e=>go("receivables",e),gn=(e,t)=>fo("receivables",e,t),Ea=document.getElementById("content");let oe={};const It={creditRealized:"#10b981",creditProvisioned:"#6ee7b7",debitRealized:"#ef4444",debitProvisioned:"#fca5a5"},bn=["#4f46e5","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4"],q={startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],selectedProfessional:"all",selectedCostCenter:"all",professionalsList:[],costCentersList:[],naturesList:[],rawPayables:[],rawReceivables:[],processedDRE:null,processedCashFlow:null,processedDailyRevenue:null,backendData:null,appointmentsData:[],currentTab:"dashboards",isFilterOpen:!1};async function fn(){if(!window.Chart)return new Promise((e,t)=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js",a.onload=e,a.onerror=t,document.head.appendChild(a)})}async function xn(){Ea.innerHTML=`
        <div class="flex flex-col items-center justify-center h-[calc(100vh-100px)] w-full">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-500 font-medium animate-pulse">Carregando inteligência...</p>
        </div>`;try{await fn();const[e,t,a]=await Promise.all([de(p.establishmentId),_r(p.establishmentId).catch(()=>[]),na(p.establishmentId).catch(()=>[])]);q.professionalsList=e||[],q.costCentersList=t||[],q.naturesList=a||[],hn(),await vo()}catch(e){console.error("Erro no loadReportsPage:",e),Ea.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full text-red-500 p-6 text-center w-full">
                <div class="bg-red-50 p-4 rounded-full mb-4"><svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                <h3 class="text-lg font-bold text-gray-800">Ops! Algo deu errado.</h3>
                <p class="text-sm text-gray-600 mt-2 max-w-xs mx-auto break-words">${h(e.message)}</p>
                <button onclick="window.location.reload()" class="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-transform active:scale-95">Tentar Novamente</button>
            </div>`}}function hn(){const e=q.professionalsList.map(a=>`<option value="${a.id}">${h(a.name)}</option>`).join(""),t=q.costCentersList.map(a=>`<option value="${a.id}">${h(a.name)}</option>`).join("");Ea.innerHTML=`
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
                                ${Vt(q.startDate)} até ${Vt(q.endDate)}
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
                            <input type="date" id="report-start" value="${q.startDate}" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Fim</label>
                            <input type="date" id="report-end" value="${q.endDate}" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
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
    `,document.getElementById("toggle-filters-btn").onclick=gs,document.getElementById("btn-apply-filters").onclick=()=>{vn(),gs()},document.querySelectorAll(".tab-btn").forEach(a=>{a.onclick=()=>{q.currentTab=a.dataset.tab,bs(),yo(),window.scrollTo({top:0,behavior:"smooth"})}}),bs()}function gs(){const e=document.getElementById("filters-container"),t=document.getElementById("toggle-filters-btn");q.isFilterOpen=!q.isFilterOpen,q.isFilterOpen?(e.classList.remove("hidden"),t.classList.add("bg-indigo-100","text-indigo-800")):(e.classList.add("hidden"),t.classList.remove("bg-indigo-100","text-indigo-800"))}function bs(){document.querySelectorAll(".tab-btn").forEach(e=>{const t=e.dataset.tab===q.currentTab;e.className=t?"tab-btn py-2 px-6 rounded-full text-xs md:text-sm font-bold bg-indigo-600 text-white shadow-md transform scale-105 transition-all whitespace-nowrap border-transparent":"tab-btn py-2 px-6 rounded-full text-xs md:text-sm font-medium text-gray-500 bg-white border-gray-200 hover:bg-gray-50 transition-all whitespace-nowrap"})}function Vt(e){if(!e)return"";const t=e.split("-");return`${t[2]}/${t[1]}`}async function vn(){q.startDate=document.getElementById("report-start").value,q.endDate=document.getElementById("report-end").value,q.selectedProfessional=document.getElementById("report-prof").value,q.selectedCostCenter=document.getElementById("report-cost").value,document.getElementById("date-range-display").textContent=`${Vt(q.startDate)} até ${Vt(q.endDate)}`,await vo()}function yn(e,t){const a=new Map;q.naturesList.forEach(s=>a.set(s.id,s.name));const o={revenues:{},expenses:{},totalRevenues:0,totalExpenses:0,netResult:0};return t.forEach(s=>{if(s.status==="paid"){const r=s.naturezaId?a.get(s.naturezaId)||"Outras Receitas":"Geral";o.revenues[r]||(o.revenues[r]=0),o.revenues[r]+=s.amount,o.totalRevenues+=s.amount}}),e.forEach(s=>{if(s.status==="paid"){const r=s.naturezaId?a.get(s.naturezaId)||"Outras Despesas":"Geral";o.expenses[r]||(o.expenses[r]=0),o.expenses[r]+=s.amount,o.totalExpenses+=s.amount}}),o.netResult=o.totalRevenues-o.totalExpenses,o}function wn(e,t){const a={},o=l=>{a[l]||(a[l]={realizedCredit:0,provisionedCredit:0,realizedDebit:0,provisionedDebit:0})};let s=new Date(q.startDate);const r=new Date(q.endDate);for(;s<=r;)o(s.toISOString().split("T")[0]),s.setDate(s.getDate()+1);t.forEach(l=>{const c=l.dueDate.split("T")[0];a[c]&&(l.status==="paid"?a[c].realizedCredit+=l.amount:a[c].provisionedCredit+=l.amount)}),e.forEach(l=>{const c=l.dueDate.split("T")[0];a[c]&&(l.status==="paid"?a[c].realizedDebit+=l.amount:a[c].provisionedDebit+=l.amount)});const i=Object.keys(a).sort(),n=[];let d=0;return i.forEach(l=>{const c=a[l],u=c.realizedCredit+c.provisionedCredit-(c.realizedDebit+c.provisionedDebit);d+=u,n.push(d)}),{labels:i,realizedCredit:i.map(l=>a[l].realizedCredit),provisionedCredit:i.map(l=>a[l].provisionedCredit),realizedDebit:i.map(l=>a[l].realizedDebit*-1),provisionedDebit:i.map(l=>a[l].provisionedDebit*-1),balance:n}}function kn(e){const t={};let a=new Date(q.startDate);const o=new Date(q.endDate);for(;a<=o;)t[a.toISOString().split("T")[0]]=0,a.setDate(a.getDate()+1);e.forEach(i=>{if(i.status==="paid"){const n=i.dueDate.split("T")[0];t.hasOwnProperty(n)&&(t[n]+=i.amount)}});const s=Object.keys(t).sort(),r=s.map(i=>t[i]);return{labels:s,data:r}}function Sn(e){const t=e.length;if(t<2)return{trendData:Array(t).fill(e[0]||0),color:"#9ca3af"};let a=0,o=0,s=0,r=0;for(let c=0;c<t;c++)a+=c,o+=e[c],s+=c*e[c],r+=c*c;const i=(t*s-a*o)/(t*r-a*a),n=(o-i*a)/t,d=[];for(let c=0;c<t;c++)d.push(i*c+n);const l=i>=0?"#10b981":"#ef4444";return{trendData:d,color:l}}async function vo(){const e=document.getElementById("report-content");e.innerHTML='<div class="flex justify-center py-20 w-full"><div class="loader border-t-indigo-600"></div></div>';try{const t={startDate:q.startDate,endDate:q.endDate,establishmentId:p.establishmentId};q.selectedCostCenter!=="all"&&(t.costCenterId=q.selectedCostCenter);const[a,o]=await Promise.all([xo(t),ho(t)]);q.rawPayables=a.entries||[],q.rawReceivables=o.entries||[];const s=await Vr(q.startDate,q.endDate,q.selectedProfessional,q.selectedCostCenter).catch(()=>({charts:{professionals:{labels:[],data:[]},salesMonthly:{labels:[],data:[]}}}));q.backendData=s,q.processedDRE=yn(q.rawPayables,q.rawReceivables),q.processedCashFlow=wn(q.rawPayables,q.rawReceivables),q.processedDailyRevenue=kn(q.rawReceivables);const r=new Date(q.startDate+"T00:00:00").toISOString(),i=new Date(q.endDate+"T23:59:59").toISOString(),n=q.selectedProfessional==="all"?null:q.selectedProfessional,d=await Na(p.establishmentId,r,i,n).catch(()=>[]);q.appointmentsData=Array.isArray(d)?d:[],yo()}catch(t){console.error(t),e.innerHTML=`
            <div class="bg-red-50 border border-red-100 p-6 rounded-2xl text-center mx-4 w-full">
                <p class="font-bold text-gray-800">Não foi possível carregar</p>
                <p class="text-sm text-gray-500 mt-1">${h(t.message||"Verifique sua conexão.")}</p>
            </div>`}}function yo(){const e=document.getElementById("report-content");switch(q.currentTab){case"dashboards":$n(e);break;case"appointments":En(e);break;case"dre":In(e);break}}function $n(e){const t=q.processedDRE,a=q.processedDailyRevenue,o=q.backendData.charts?.salesMonthly||{labels:[],data:[]},s=q.backendData.charts?.professionals||{labels:[],data:[]};e.innerHTML=`
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
    `,Ln("chart-cashflow-modern",q.processedCashFlow),fs("chart-daily-revenue","Receita Diária",a.labels.map(r=>r.split("-").reverse().slice(0,2).join("/")),a.data),fs("chart-monthly","Receita Mensal",o.labels,o.data),Dn("chart-profs","doughnut","Total Vendas",s.labels,s.data,bn),document.querySelectorAll(".chart-toggle").forEach(r=>{r.addEventListener("change",i=>{const n=oe["chart-cashflow-modern"];if(n){const d=parseInt(i.target.dataset.dataset);n.setDatasetVisibility(d,i.target.checked),n.update()}})})}function En(e){const t=q.appointmentsData,a=t.length;let o=0,s=0,r=0;const i={},n={};let d=new Date(q.startDate);const l=new Date(q.endDate);for(;d<=l;)i[d.toISOString().split("T")[0]]={active:0,cancelled:0},d.setDate(d.getDate()+1);t.forEach(x=>{const y=parseFloat(x.totalAmount||x.price||0),b=(x.status||"").toLowerCase();let I="";if(x.startTime){const k=x.startTime.toDate?x.startTime.toDate():new Date(x.startTime);isNaN(k)||(I=k.toISOString().split("T")[0])}const $=x.professionalName||"Sem Profissional";n[$]||(n[$]={name:$,count:0,value:0}),["cancelled","cancelado","no-show","cancelada"].includes(b)?(s++,I&&i[I]&&i[I].cancelled++):(["completed","finalized","paid"].includes(b)&&o++,r+=y,I&&i[I]&&i[I].active++,n[$].count++,n[$].value+=y)});const c=Object.keys(i).sort(),u=c.map(x=>i[x].active),m=c.map(x=>i[x].cancelled),f=Object.values(n).sort((x,y)=>y.value-x.value);e.innerHTML=`
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
                        ${f.map((x,y)=>{const b=f[0]?.value||1,I=x.value/b*100;return`
                            <tr class="group">
                                <td class="p-3 md:p-4 w-8 md:w-12 text-center font-bold text-gray-300">${y+1}</td>
                                <td class="p-3 md:p-4 pl-0 min-w-[100px]">
                                    <p class="font-bold text-gray-800 truncate max-w-[120px] md:max-w-xs">${h(x.name)}</p>
                                    <div class="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                        <div class="h-full bg-indigo-500 rounded-full" style="width: ${I}%"></div>
                                    </div>
                                </td>
                                <td class="p-3 md:p-4 text-center">
                                    <span class="bg-indigo-50 text-indigo-700 px-2 md:px-2.5 py-1 rounded-lg font-bold text-xs">${x.count}</span>
                                </td>
                                <td class="p-3 md:p-4 text-right font-bold text-gray-700 whitespace-nowrap">R$ ${x.value.toLocaleString("pt-BR",{minimumFractionDigits:0})}</td>
                            </tr>
                        `}).join("")}
                        ${f.length===0?'<tr><td colspan="4" class="p-8 text-center text-gray-400">Sem dados.</td></tr>':""}
                    </tbody>
                </table>
            </div>
        </div>
    `,Cn("chart-appointments-daily",c,u,m),document.querySelectorAll(".app-chart-toggle").forEach(x=>{x.addEventListener("change",y=>{const b=oe["chart-appointments-daily"];if(b){const I=parseInt(y.target.dataset.dataset);b.setDatasetVisibility(I,y.target.checked),b.update()}})})}function In(e){const t=q.processedDRE;if(!t)return;const a=t.totalRevenues,o=(n,d,l,c=!1)=>{const u=a>0?d/a*100:0,m=c?"- ":"";return`
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
        </div>`},s=Object.entries(t.revenues).map(([n,d])=>o(n,d,"text-emerald-600",!1)).join(""),r=Object.entries(t.expenses).map(([n,d])=>o(n,d,"text-red-500",!0)).join(""),i=t.netResult>=0?"Lucro Real":"Prejuízo Real";e.innerHTML=`
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
    `}function Ln(e,t){const a=document.getElementById(e);if(!a)return;const o=a.getContext("2d");oe[e]&&oe[e].destroy();const s=o.createLinearGradient(0,0,0,400);s.addColorStop(0,"rgba(59, 130, 246, 0.4)"),s.addColorStop(1,"rgba(59, 130, 246, 0.0)");const r=t.labels.map(i=>i.split("-").reverse().slice(0,2).join("/"));oe[e]=new Chart(o,{type:"bar",data:{labels:r,datasets:[{label:"Créd. Realizado",data:t.realizedCredit,backgroundColor:It.creditRealized,borderRadius:3,barPercentage:.7,order:1},{label:"Créd. Provisionado",data:t.provisionedCredit,backgroundColor:It.creditProvisioned,borderRadius:3,borderWidth:1,borderColor:"#fff",borderDash:[5,5],barPercentage:.7,order:2},{label:"Déb. Realizado",data:t.realizedDebit,backgroundColor:It.debitRealized,borderRadius:3,barPercentage:.7,order:3},{label:"Déb. Provisionado",data:t.provisionedDebit,backgroundColor:It.debitProvisioned,borderRadius:3,borderWidth:1,borderColor:"#fff",borderDash:[5,5],barPercentage:.7,order:4},{label:"Saldo Acumulado",data:t.balance,type:"line",borderColor:"#3b82f6",backgroundColor:s,borderWidth:3,pointRadius:3,pointBackgroundColor:"#fff",pointBorderColor:"#3b82f6",pointBorderWidth:2,pointHoverRadius:8,hitRadius:30,fill:!0,tension:.4,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{backgroundColor:"#fff",titleColor:"#111",bodyColor:"#444",borderColor:"#eee",borderWidth:1,padding:10,callbacks:{label:function(i){let n=i.dataset.label||"";return n&&(n+=": "),i.parsed.y!==null&&(n+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(Math.abs(i.parsed.y))),n}}}},scales:{x:{stacked:!0,grid:{display:!1},ticks:{font:{size:10}}},y:{stacked:!0,display:!0,grid:{color:"#f3f4f6",borderDash:[4,4]},ticks:{callback:i=>new Intl.NumberFormat("pt-BR",{notation:"compact"}).format(Math.abs(i)),font:{size:10}}}}}})}function Cn(e,t,a,o){const s=document.getElementById(e);if(!s)return;const r=s.getContext("2d");oe[e]&&oe[e].destroy();const i=t.map(n=>n.split("-").reverse().slice(0,2).join("/"));oe[e]=new Chart(r,{type:"bar",data:{labels:i,datasets:[{label:"Realizados",data:a,backgroundColor:"#4f46e5",borderRadius:3,barPercentage:.6,order:1},{label:"Cancelados",data:o,backgroundColor:"#ef4444",borderRadius:3,barPercentage:.6,order:2}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{backgroundColor:"#fff",titleColor:"#111",bodyColor:"#444",borderColor:"#eee",borderWidth:1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10}}},y:{beginAtZero:!0,grid:{color:"#f3f4f6"},ticks:{stepSize:1,font:{size:10}}}}}})}function fs(e,t,a,o){const s=document.getElementById(e);if(!s)return;const r=s.getContext("2d");oe[e]&&oe[e].destroy();const{trendData:i,color:n}=Sn(o),d=i.map((u,m)=>m===i.length-1?"triangle":"circle"),l=i.map((u,m)=>m===i.length-1?6:3),c=i.map((u,m)=>m===i.length-1&&n==="#ef4444"?180:0);oe[e]=new Chart(r,{type:"bar",data:{labels:a,datasets:[{label:t,data:o,backgroundColor:"#4f46e5",borderRadius:4,order:1},{label:"Tendência",data:i,type:"line",borderColor:n,borderWidth:3,pointStyle:d,pointRadius:l,pointRotation:c,pointBackgroundColor:"#fff",pointBorderColor:n,pointBorderWidth:2,pointHoverRadius:8,hitRadius:30,fill:!1,tension:0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:9}}},y:{grid:{color:"#f3f4f6"},beginAtZero:!0,ticks:{font:{size:9},callback:u=>new Intl.NumberFormat("pt-BR",{notation:"compact"}).format(u)}}}}})}function Dn(e,t,a,o,s,r){const i=document.getElementById(e);if(!i)return;const n=i.getContext("2d");oe[e]&&oe[e].destroy(),new Chart(n,{type:t,data:{labels:o,datasets:[{label:a,data:s,backgroundColor:r,borderColor:Array.isArray(r)?"#fff":r,borderWidth:1,tension:.3,fill:t==="line"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:t==="doughnut",position:"right",labels:{usePointStyle:!0,boxWidth:8,font:{size:10}}}},scales:{}}})}const la=(e,t="products")=>C(`/api/${t}/categories/${e}`),wo=(e,t="products")=>C(`/api/${t}/categories`,{method:"POST",body:JSON.stringify(e)}),ko=(e,t="products")=>C(`/api/${t}/categories/${e}`,{method:"DELETE"}),Tn="audit_logs",ge=async(e,t,a,o,s,r=null)=>{try{if(!t)return;await _s(Yt(fe,Tn),{establishmentId:e,userId:t.uid,userName:t.name||t.email||"Utilizador",module:a,action:o,description:s,details:r,timestamp:new Date})}catch(i){console.error("Falha silenciosa ao registar log:",i)}},Ee=document.getElementById("content");let he=null,it="services",Ce="all",nt=[];function Xe(){const e=le.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}async function Bn(e){e.preventDefault();const t=e.target.closest("#categoryForm"),a=t.querySelector("#categoryName"),o=a.value;if(!o)return;const s=t.querySelector('button[type="submit"]');s.disabled=!0,s.textContent="...";try{const r=nt.reduce((i,n)=>(i.push(n.id),n.branches&&n.branches.forEach(d=>i.push(d.id)),i),[]);r.length===0&&r.push(p.establishmentId),await wo({establishmentId:p.establishmentId,name:o,accessibleIn:r},"services"),ge(p.establishmentId,Xe(),"Categorias (Serviços)","Criou",`Criou categoria: ${o}`),a.value="",g("Sucesso","Categoria criada!","success"),await Wa(),await wt()}catch(r){g("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}finally{s.disabled=!1,s.textContent="Adicionar"}}async function Pn(e){if(await J("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await ko(e,"services"),ge(p.establishmentId,Xe(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${e})`),g("Sucesso","Categoria apagada.","success"),await Wa(),await wt()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function Wa(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await la(p.establishmentId,"services");p.serviceCategories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${h(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function Mn(){ie({title:"Gerir Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",Bn),t.addEventListener("click",o=>{const s=o.target.closest('button[data-action="delete-category"]');s&&(o.preventDefault(),Pn(s.dataset.id))}))}Wa()}function An(e=[]){if(!nt||nt.length===0)return`
            <input type="hidden" name="accessibleIn" value="${p.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                Disponível apenas nesta unidade. Crie mais lojas para distribuir serviços.
            </div>`;let t='<div class="space-y-1 mt-2 max-h-48 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30">';return nt.forEach(a=>{const o=e.includes(a.id)||e.length===0&&a.id===p.establishmentId;t+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${h(a.name)} (Matriz)</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(s=>{const r=e.includes(s.id)||e.length===0&&s.id===p.establishmentId;t+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${s.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${r?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${h(s.name)}</span>
                    </label>
                `})}),t+="</div>",t}async function qn(e){e.preventDefault();const t=e.target.closest("#serviceModal"),a=t.querySelector("#serviceId").value,o={},s=t.querySelector('input[name="commissionType"]:checked').value;s==="custom"&&t.querySelectorAll(".professional-commission-row").forEach(d=>{const l=d.dataset.profId;if(d.querySelector('input[type="checkbox"]').checked){const u=parseFloat(d.querySelector('input[type="number"]').value);o[l]=isNaN(u)?0:u}});const r=Array.from(t.querySelectorAll('input[name="accessibleIn"]:checked')).map(d=>d.value),i=r.length>0?r:[p.establishmentId],n={establishmentId:p.establishmentId,accessibleIn:i,name:t.querySelector("#serviceName").value.trim(),price:parseFloat(t.querySelector("#servicePrice").value),duration:parseInt(t.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(t.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:t.querySelector("#serviceCategory").value||null,commissionRate:parseFloat(t.querySelector("#serviceCommissionRate").value)||0,active:t.querySelector("#serviceStatus").value==="true",photo:t.querySelector("#servicePhotoBase64").value,notes:t.querySelector("#serviceNotes").value,commissionType:s,professionalCommissions:o};try{a?(await ti(a,n),ge(p.establishmentId,Xe(),"Serviços","Editou",`Editou o serviço: ${n.name}`)):(await ei(n),ge(p.establishmentId,Xe(),"Serviços","Criou",`Criou novo serviço: ${n.name}`)),document.getElementById("serviceModal").style.display="none",g("Sucesso",`Serviço ${a?"atualizado":"adicionado"} com sucesso!`,"success"),await wt()}catch(d){g("Erro",d.message,"error")}}function xs(e=null){const t=document.getElementById("serviceModal"),a=p.serviceCategories||[],o=e?.duration||0,s=e?.bufferTime||0,r=h(e?.name||""),i=h(e?.notes||""),n=e?r:"Novo Serviço",d=a.map(L=>`<option value="${L.id}" ${e?.categoryId===L.id?"selected":""}>${h(L.name)}</option>`).join("");t.innerHTML=`
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
                            ${d}
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
                    ${An(e?.accessibleIn||[])}
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
    </div>`,t.style.display="flex",t.addEventListener("click",async L=>{const S=L.target.closest("button[data-action]");if(!S)return;const P=S.dataset.action,j=S.dataset.id;if(P==="close-modal"&&(t.style.display="none"),P==="delete-service"){if(!j)return;if(t.style.display="none",await J("Apagar Serviço","Tem a certeza que deseja apagar este serviço?"))try{const D=p.services.find(N=>N.id===j)?.name||"Desconhecido";await ai(j),ge(p.establishmentId,Xe(),"Serviços","Excluiu",`Excluiu o serviço: ${D}`),g("Sucesso","Serviço apagado com sucesso!","success"),await wt()}catch(D){g("Erro",`Não foi possível apagar o serviço: ${D.message}`,"error")}else t.style.display="flex"}});const l=t.querySelectorAll(".tab-btn"),c=t.querySelectorAll(".tab-content");l.forEach(L=>{L.addEventListener("click",()=>{l.forEach(S=>{S.classList.remove("border-indigo-500","text-indigo-600"),S.classList.add("border-transparent","text-gray-500")}),L.classList.add("border-indigo-500","text-indigo-600"),L.classList.remove("border-transparent","text-gray-500"),c.forEach(S=>S.classList.add("hidden")),document.getElementById(`tab-content-${L.dataset.tab}`).classList.remove("hidden")})});const u=t.querySelectorAll('input[name="commissionType"]'),m=document.getElementById("defaultCommissionRateContainer"),f=document.getElementById("professionalCommissionsContainer");function x(){const L=t.querySelector('input[name="commissionType"]:checked').value;m&&(m.style.display=L==="default"?"block":"none"),f&&(f.style.display=L==="custom"?"block":"none")}u.forEach(L=>L.addEventListener("change",x));const y=document.getElementById("professionalCommissionsList");y&&(y.innerHTML=(p.professionals||[]).map(L=>{const S=e?.professionalCommissions?.[L.id]!==void 0,P=e?.professionalCommissions?.[L.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-md ${S?"bg-blue-50":""}" data-prof-id="${L.id}">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" ${S?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600">
                        <img src="${L.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${h(L.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover">
                        <span class="text-sm font-medium">${h(L.name)}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${P}" class="w-20 p-1 border rounded-md text-sm text-center" ${S?"":"disabled"}>
                        <span class="text-sm font-semibold">%</span>
                    </div>
                </div>
            `}).join(""),y.querySelectorAll('input[type="checkbox"]').forEach(L=>{L.addEventListener("change",S=>{const P=S.target.closest(".professional-commission-row");P.querySelector('input[type="number"]').disabled=!S.target.checked,P.classList.toggle("bg-blue-50",S.target.checked)})})),x();const b=t.querySelector("#serviceForm"),I=t.querySelector("#servicePhotoInput"),$=t.querySelector("#servicePhotoPreview"),k=t.querySelector("#servicePhotoBase64");t.querySelector("#servicePhotoButton").addEventListener("click",()=>I.click()),I.onchange=async()=>{const L=I.files[0];if(L){$.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const S=await to(L,800,800,.8);if(S.length*3/4>1e3*1024)throw new Error("Imagem muito grande.");$.src=S,k.value=S}catch(S){g("Erro de Imagem",S.message,"error"),$.src=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",k.value=e?.photo||""}}},b.addEventListener("submit",qn)}function lt(){const e=document.getElementById("servicesList");if(!e)return;const t=document.getElementById("serviceSearchInput")?.value.toLowerCase()||"",a=document.getElementById("serviceCategoryFilter")?.value||"all",o=new Map((p.serviceCategories||[]).map(r=>[r.id,r.name]));let s=(p.services||[]).filter(Boolean);if(Ce!=="all"){const r=Ce==="active";s=s.filter(i=>i.active!==!1===r)}s=s.filter(r=>{const i=r.name.toLowerCase().includes(t),n=a==="all"||r.categoryId===a;return i&&n}),e.innerHTML="",s.length>0?s.forEach(r=>{const i=document.createElement("div"),n=JSON.stringify(r).replace(/'/g,"&apos;");i.className=`service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-indigo-300 border border-transparent ${r.active!==!1?"opacity-100":"opacity-60 bg-gray-100"} sm:flex-col`,i.dataset.action="edit-service",i.dataset.service=n;const d=h(r.name),l=h(o.get(r.categoryId)||"Sem Categoria"),c=r.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(r.name.charAt(0))}`;i.innerHTML=`
                <img src="${c}" alt="Imagem" class="w-24 h-24 object-cover flex-shrink-0 sm:w-full sm:h-32">
                <div class="p-3 flex flex-col flex-grow justify-between w-full">
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="text-sm font-bold text-gray-900 flex-1 text-left truncate pr-2">${d}</h3>
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
                            <p class="text-xs text-gray-500 text-left mb-1 truncate">${l}</p>
                            <p class="text-xs text-gray-500 text-left">${r.duration} min</p>
                        </div>
                        <div class="flex justify-between items-center sm:hidden mt-2">
                            <p class="text-lg font-bold text-indigo-600 text-left">R$ ${r.price.toFixed(2)}</p>
                            <p class="text-xs text-gray-500 text-right">${r.duration} min</p>
                        </div>
                    </div>
                </div>`,e.appendChild(i)}):e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>'}function Ja(){const e={active:0,inactive:0,total:0},t=(p.services||[]).filter(Boolean);t.forEach(i=>{i.active===!1?e.inactive++:e.active++}),e.total=t.length;const a=document.getElementById("indicator-total"),o=document.getElementById("indicator-active"),s=document.getElementById("indicator-inactive"),r=document.getElementById("indicator-popular");a&&(a.textContent=e.total),o&&(o.textContent=e.active),s&&(s.textContent=e.inactive),r&&(p.mostPopularService&&p.mostPopularService.name!=="N/A"?(r.textContent=h(p.mostPopularService.name),r.closest(".indicator-card").title=`${p.mostPopularService.name} (${p.mostPopularService.count} agendamentos)`):r.textContent="Nenhum agendado")}function Rn(){const e=document.getElementById("services-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("serviceCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(p.serviceCategories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${h(a.name)}</option>`)),Ja(),lt()}function Nn(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="p-12 text-center bg-gray-50 border border-dashed border-gray-300 rounded-xl max-w-lg mx-auto mt-10">
            <i class="bi bi-bar-chart-line text-4xl text-indigo-300 mb-4 block"></i>
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2 text-sm">Acompanhe métricas de conversão e lucratividade por serviço e unidade. (Em breve)</p>
        </div>
    `}async function wt(){const e=document.getElementById("services-content-container");if(e){const t=e.querySelector(".loader");t&&(t.style.display="block")}try{const[t,a,o,s,r]=await Promise.all([Pe(p.establishmentId),de(p.establishmentId),la(p.establishmentId,"services"),oi(p.establishmentId),ke()]);p.services=(t||[]).filter(Boolean),p.professionals=(a||[]).filter(Boolean),p.serviceCategories=(o||[]).filter(Boolean),p.mostPopularService=s||{name:"N/A",count:0},nt=r?.matrizes||[],p.services.forEach(i=>{i.active===void 0&&(i.active=!0)}),So(it)}catch(t){e&&(e.innerHTML='<p class="text-red-500 text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>'),g("Erro",`Não foi possível carregar os dados: ${t.message}`,"error")}}function So(e){if(document.getElementById("services-content-container")){if(it===e&&document.getElementById("services-content-container").children.length>1){it==="services"&&(Ja(),lt());return}it=e,Ce="all",document.querySelectorAll("#services-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="services"?Rn():e==="reports"&&Nn()}}function jn(){he&&(Ee.removeEventListener("click",he),Ee.removeEventListener("input",he),Ee.removeEventListener("change",he)),he=async e=>{const t=e.target;if(t.closest('[data-action="toggle-service-status"]')){e.stopPropagation();const s=t.closest('[data-action="toggle-service-status"]'),r=s.dataset.id,i=s.checked;try{await si(r,i);const n=p.services.findIndex(d=>d.id===r);n>-1&&(p.services[n].active=i),ge(p.establishmentId,Xe(),"Serviços","Atualizou Status",`Alterou status do serviço (ID: ${r}) para ${i?"Ativo":"Inativo"}`),lt(),Ja()}catch(n){g("Erro",`Não foi possível atualizar o status: ${n.message}`,"error"),s.checked=!i}return}const a=t.closest("button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]");if(t.id==="serviceSearchInput"||t.id==="serviceCategoryFilter"){lt();return}if(!a)return;if(a.hasAttribute("data-view")){So(a.dataset.view);return}switch(a.dataset.action){case"new-service":xs();break;case"edit-service":const s=JSON.parse(a.dataset.service);xs(s);break;case"manage-categories":Mn();break;case"filter-service":const r=a.dataset.filterType;if(r==="popular")return;Ce=r==="total"?"all":r,document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(i=>{const n=i.dataset.filterType,l=n===Ce||n==="total"&&Ce==="all";i.classList.toggle("ring-2",l),i.classList.toggle("ring-indigo-500",l),i.classList.toggle("shadow-md",l),i.classList.toggle("bg-white",!l)}),lt();break}},Ee.addEventListener("click",he),Ee.addEventListener("input",he),Ee.addEventListener("change",he)}async function Fn(){Ee.innerHTML=`
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
        </div>`,jn(),it="services",Ce="all",await wt()}const da="suppliers",Ga=async e=>{try{const t=Us(Yt(fe,da),Ws("establishmentId","==",e)),a=await Ko(t),o=[];return a.forEach(s=>{o.push({id:s.id,...s.data()})}),o}catch(t){throw console.error("Erro ao buscar fornecedores:",t),t}},Hn=async e=>{try{return{id:(await _s(Yt(fe,da),e)).id,...e}}catch(t){throw console.error("Erro ao criar fornecedor:",t),t}},zn=async(e,t)=>{try{const a=yt(fe,da,e);return await Ra(a,t),{id:e,...t}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},On=async e=>{try{const t=yt(fe,da,e);return await er(t),!0}catch(t){throw console.error("Erro ao excluir fornecedor:",t),t}},$e=document.getElementById("content");let ve=null,dt="products",be="all";async function Vn(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),o=a.value;if(o)try{await wo({establishmentId:p.establishmentId,name:o},"products"),a.value="",g("Sucesso","Categoria de produto criada!","success"),await Qa(),await kt()}catch(s){g("Erro",`Não foi possível criar a categoria: ${s.message}`,"error")}}async function _n(e){if(await J("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await ko(e,"products"),g("Sucesso","Categoria de produto apagada.","success"),await Qa(),await kt()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function Qa(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await la(p.establishmentId,"products");p.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${h(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function Un(){ie({title:"Gerir Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",Vn),t.addEventListener("click",o=>{const s=o.target.closest('button[data-action="delete-category"]');s&&_n(s.dataset.id)}))}Qa()}async function Wn(e){if(!e)return;if(await J("Apagar Produto","Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida."))try{await Ci(e),g("Sucesso","Produto apagado com sucesso!","success"),await kt()}catch(a){g("Erro",`Não foi possível apagar o produto: ${a.message}`,"error")}}async function Jn(e){const t=e.querySelector("#productId").value,a=parseInt(e.querySelector("#productCurrentStock").value),o=parseInt(e.querySelector("#productMinStock").value),s=parseInt(e.querySelector("#productMaxStock").value),r=e.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),i=Array.from(r).map(d=>d.dataset.id),n={establishmentId:p.establishmentId,name:e.querySelector("#productName").value,price:parseFloat(e.querySelector("#productPrice").value),costPrice:parseFloat(e.querySelector("#productCostPrice").value)||0,commissionRate:parseFloat(e.querySelector("#productCommissionRate").value)||0,currentStock:isNaN(a)?0:a,minStock:isNaN(o)?0:o,maxStock:isNaN(s)?0:s,categoryId:e.querySelector("#productCategory").value||null,photo:e.querySelector("#productPhotoBase64").value,supplierIds:i};try{t?await Li(t,n):await Ii(n),document.getElementById("productModal").style.display="none",g("Sucesso",`Produto ${t?"atualizado":"adicionado"} com sucesso!`,"success"),await kt()}catch(d){throw new Error(d.message)}}function hs(e,t=800,a=800,o="image/jpeg",s=.8){return new Promise((r,i)=>{if(!e.type.startsWith("image/"))return i(new Error("O ficheiro selecionado não é uma imagem."));const n=new FileReader;n.onload=d=>{const l=new Image;l.onload=()=>{let c=l.width,u=l.height;c>u?c>t&&(u*=t/c,c=t):u>a&&(c*=a/u,u=a);const m=document.createElement("canvas");m.width=c,m.height=u,m.getContext("2d").drawImage(l,0,0,c,u);const x=m.toDataURL(o,s);r(x)},l.onerror=c=>i(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},n.onerror=d=>i(new Error("Não foi possível ler o ficheiro.")),n.readAsDataURL(e)})}function vs(e=null){const t=document.getElementById("productModal"),a=p.categories||[],o=p.suppliers||[],s=a.map(T=>`<option value="${T.id}" ${e?.categoryId===T.id?"selected":""}>${h(T.name)}</option>`).join("");let r=new Set(e?.supplierIds||[]);const i=h(e?.name||""),n=e?.price||"",d=e?.costPrice||"",l=e?.commissionRate||"",c=e?.minStock||0,u=e?.maxStock||0,m=e?.currentStock||0,f=e?i:"Novo Produto";t.innerHTML=`
    <div class="modal-content max-w-3xl overflow-y-auto max-h-[90vh]">
        <form id="productForm">
            <input type="hidden" id="productId" value="${e?.id||""}">
            <input type="hidden" id="productPhotoBase64" value="${e?.photo||""}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="productModalTitle" class="text-2xl font-bold text-gray-800">${f}</h2>
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
    </div>`;const x=t.querySelector("#productCategory"),y=t.querySelector("#productPhotoInput");t.querySelector("#productPhotoButton").addEventListener("click",()=>y.click()),x.innerHTML='<option value="">Sem categoria</option>'+(p.categories||[]).map(T=>`<option value="${T.id}" ${e?.categoryId===T.id?"selected":""}>${h(T.name)}</option>`).join(""),e&&(x.value=e.categoryId||"");const b=t.querySelector("#productPhotoPreview");t.querySelector("#productPhotoBase64");const I=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",$=e?.photo||"";y.onchange=async()=>{const T=y.files[0];if(T){b.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const D=await hs(T,800,800,"image/jpeg",.8),F=D.length*3/4,O=1e3*1024;if(F>O)throw new Error("A imagem é muito grande mesmo após a compressão.");preview.src=D,base64Input.value=D}catch(D){console.error("Erro ao processar imagem:",D),g("Erro de Imagem",D.message||"Não foi possível processar a imagem.","error"),preview.src=I,base64Input.value=$,j.value=""}}};const k=t.cloneNode(!0);t.parentNode.replaceChild(k,t);const L=()=>{const T=k.querySelector("#modalSupplierSearch"),D=k.querySelector("#supplierSearchResults"),N=k.querySelector("#selectedSuppliersList"),F=T.value.toLowerCase();if(F.length>0){const O=o.filter(H=>H.name.toLowerCase().includes(F)&&!r.has(H.id));O.length>0?(D.classList.remove("hidden"),D.innerHTML=O.map(H=>`
                    <div class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 text-sm flex justify-between items-center" data-add-supplier="${H.id}">
                        <span class="font-medium">${h(H.name)}</span>
                        <span class="text-indigo-600 text-xs">+ Adicionar</span>
                    </div>
                `).join("")):(D.classList.remove("hidden"),D.innerHTML='<div class="p-2 text-xs text-gray-500 text-center">Nenhum resultado disponível.</div>')}else D.classList.add("hidden");r.size>0?(N.innerHTML="",r.forEach(O=>{const H=o.find(B=>B.id===O);H&&(N.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border p-2 rounded shadow-sm" data-id="${H.id}">
                            <div class="text-sm">
                                <p class="font-bold text-gray-800">${h(H.name)}</p>
                                <p class="text-xs text-gray-500">${h(H.contactName||"")} - ${h(H.phone||"")}</p>
                            </div>
                            <button type="button" class="text-red-500 hover:text-red-700 p-1" data-remove-supplier="${H.id}" title="Remover">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    `)})):N.innerHTML='<p class="text-xs text-gray-400 text-center py-2">Nenhum fornecedor selecionado.</p>'};k.querySelector("#modalSupplierSearch").addEventListener("input",L),k.addEventListener("click",T=>{const D=T.target.closest("[data-add-supplier]");if(D){const F=D.dataset.addSupplier;r.add(F),k.querySelector("#modalSupplierSearch").value="",L()}const N=T.target.closest("[data-remove-supplier]");if(N){const F=N.dataset.removeSupplier;r.delete(F),L()}}),L(),k.addEventListener("click",async T=>{const D=T.target.closest("button[data-action]");if(!D)return;const N=D.dataset.action,F=k.querySelector("#productId").value;if(N==="close-modal"&&(k.style.display="none"),N==="delete-product"){if(!F)return;k.style.display="none",await Wn(F)}if(N==="save-product-modal"){const O=k.querySelector("#productForm");if(O){if(!O.querySelector("#productName").value||!O.querySelector("#productPrice").value){g("Erro","Nome e Preço de Venda são obrigatórios.","error");return}const H=D.closest('button[data-action="save-product-modal"]');H.disabled=!0,H.textContent="A salvar...";try{await Jn(O)}catch(B){g("Erro",`Falha ao salvar: ${B.message}`,"error"),H.disabled=!1,H.textContent="Salvar Alterações"}}}if(N==="adjust-stock-modal"){T.preventDefault();const O=k.querySelector("#stockAdjustmentAmount"),H=k.querySelector("#stockAdjustmentReason"),B=parseInt(O.value,10),_=parseInt(D.dataset.change,10);if(!B||B<=0){g("Erro","Por favor, insira uma quantidade válida.","error");return}const K=B*_,re=H.value||(K>0?"Entrada manual":"Saída manual");try{await Di(F,{change:K,reason:re});const Me=p.products.findIndex(Se=>Se.id===F);if(Me>-1){const Se=p.products[Me].currentStock+K;p.products[Me].currentStock=Se,k.querySelector("#currentStockDisplay").textContent=Se,k.querySelector("#productCurrentStock").value=Se,O.value="",H.value="",g("Sucesso","Estoque atualizado!","success"),Xa(),ht()}}catch(Me){g("Erro de Stock",Me.message,"error")}}});const S=k.querySelectorAll(".tab-btn"),P=k.querySelectorAll(".tab-content");S.forEach(T=>{T.addEventListener("click",D=>{D.preventDefault(),S.forEach(N=>{N.classList.remove("border-indigo-500","text-indigo-600"),N.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),T.classList.add("border-indigo-500","text-indigo-600"),T.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),P.forEach(N=>N.classList.add("hidden")),document.getElementById(`tab-content-${T.dataset.tab}`).classList.remove("hidden")})});const j=k.querySelector("#productPhotoInput");k.querySelector("#productPhotoButton").addEventListener("click",()=>j.click()),j.onchange=async()=>{const T=j.files[0];if(!T)return;const D=k.querySelector("#productPhotoPreview"),N=k.querySelector("#productPhotoBase64");D.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const F=await hs(T,800,800,"image/jpeg",.8),H=F.length*3/4,B=1e3*1024;if(H>B)throw new Error("A imagem é muito grande mesmo após a compressão.");D.src=F,N.value=F}catch(F){console.error("Erro ao processar imagem:",F),g("Erro de Imagem",F.message||"Não foi possível processar a imagem.","error"),D.src=I,N.value=$,j.value=""}},k.style.display="flex"}function Gn(){const e=document.getElementById("products-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("productCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(p.categories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${h(a.name)}</option>`)),Xa(),ht()}function Qn(){const e=document.getElementById("products-content-container"),t=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const o=a.toISOString().split("T")[0];e.innerHTML=`
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
        </div>`;const s=document.getElementById("productFilterReport"),r=document.getElementById("categoryFilterReport");s&&p.products&&(s.innerHTML+=p.products.map(i=>`<option value="${i.id}">${h(i.name)}</option>`).join("")),r&&p.categories&&(r.innerHTML+=p.categories.map(i=>`<option value="${i.id}">${h(i.name)}</option>`).join(""))}async function Xn(){const e=document.getElementById("report-results");e.innerHTML='<div class="loader mx-auto my-8"></div>';const t={startDate:document.getElementById("reportStartDate").value,endDate:document.getElementById("reportEndDate").value,productId:document.getElementById("productFilterReport").value,categoryId:document.getElementById("categoryFilterReport").value,establishmentId:p.establishmentId};try{const a=await Ti(t);if(a.length===0){e.innerHTML=`
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
                                <td class="px-4 py-3 whitespace-nowrap font-semibold text-gray-800">${h(r.productName)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center font-bold ${r.change>0?"text-green-600":"text-red-600"}">
                                    ${r.change>0?"+":""}${r.change}
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-500">${r.oldStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-800 font-medium">${r.newStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600 truncate max-w-xs" title="${h(r.reason)}">${h(r.reason)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600">${h(r.user)}</td>
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
                                <h4 class="font-bold text-gray-800 text-base line-clamp-1">${h(r.productName)}</h4>
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
                            <span class="text-gray-600 truncate max-w-[60%] font-medium" title="${h(r.reason)}">
                                ${h(r.reason)||"Sem motivo"}
                            </span>
                            <span class="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                ${h(r.user)||"Sistema"}
                            </span>
                        </div>
                    </div>
                `).join("")}
            </div>`;e.innerHTML=o+s}catch(a){g("Erro",`Não foi possível gerar o relatório: ${a.message}`,"error"),e.innerHTML=`<div class="bg-white border border-red-200 rounded-lg p-8 text-center text-red-500">${a.message}</div>`}}function Xa(){const e={ok:0,near_min:0,at_min:0,empty:0};if(!p.products)return;p.products.forEach(r=>{if(!r)return;const i=r.currentStock,n=r.minStock;i<=0?e.empty++:n>0&&i<=n?e.at_min++:n>0&&i<=n*1.2?e.near_min++:e.ok++});const t=document.getElementById("indicator-ok"),a=document.getElementById("indicator-near-min"),o=document.getElementById("indicator-at-min"),s=document.getElementById("indicator-empty");t&&(t.textContent=e.ok),a&&(a.textContent=e.near_min),o&&(o.textContent=e.at_min),s&&(s.textContent=e.empty)}function ht(){const e=document.getElementById("productsList");if(!e)return;const t=document.getElementById("productSearchInput")?.value.toLowerCase()||"",a=document.getElementById("productCategoryFilter")?.value||"all",o=new Map((p.categories||[]).map(r=>[r.id,r.name]));let s=(p.products||[]).filter(Boolean);be!=="all"&&(s=s.filter(r=>{const i=r.currentStock,n=r.minStock;switch(be){case"ok":return i>0&&(n===0||i>n*1.2);case"near_min":return n>0&&i>n&&i<=n*1.2;case"at_min":return n>0&&i>0&&i<=n;case"empty":return i<=0;default:return!0}})),s=s.filter(r=>{const i=r.name.toLowerCase().includes(t),n=a==="all"||r.categoryId===a;return i&&n}),e.innerHTML="",s.length>0?(e.className="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 sm:space-y-0",s.forEach(r=>{const i=document.createElement("div"),n=JSON.stringify(r).replace(/'/g,"&apos;");i.className=`product-card bg-white rounded-lg shadow-md flex items-center gap-3 p-3 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 
                              sm:flex-col sm:p-0 sm:items-stretch sm:gap-0`,i.dataset.action="edit-product",i.dataset.product=n;const d=r.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(r.name.charAt(0))}`,l=o.get(r.categoryId)||"N/A";let c="",u="text-gray-500";const m=r.currentStock,f=r.minStock;m<=0?(c='<span class="text-xs font-semibold text-red-600">Esgotado</span>',u="text-red-600 font-semibold"):f>0&&m<=f?(c='<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>',u="text-orange-600 font-semibold"):f>0&&m<=f*1.2?(c='<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>',u="text-blue-600 font-semibold"):(c='<span class="text-xs font-semibold text-green-600">Em Estoque</span>',u="text-green-600 font-semibold"),i.innerHTML=`
                <img src="${d}" alt="Imagem de ${h(r.name)}" class="w-16 h-16 rounded-md object-cover flex-shrink-0 sm:w-full sm:h-24 sm:rounded-b-none">
                
                <div class="flex-1 sm:p-3 sm:flex sm:flex-col sm:flex-grow">
                    <div class="sm:flex-grow">
                        <div class="flex justify-between items-start mb-1 gap-2">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${h(r.name)}</h3>
                            <div class="hidden sm:block">${c}</div>
                        </div>
                        
                        <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${r.price.toFixed(2)}</p>
                        
                        <p class="text-xs text-gray-500 text-left mb-2 hidden sm:block">Categoria: ${h(l)}</p>
                    </div>

                    <div class="flex justify-between items-center mt-2 sm:mt-0">
                        <p class="text-lg font-bold text-indigo-600 text-left sm:hidden">R$ ${r.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-right sm:text-left">
                            Estoque: <span class="font-bold text-base ${u}">${r.currentStock}</span>
                        </p>
                    </div>
                </div>`,e.appendChild(i)})):(e.className="",e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>')}async function kt(){const e=document.getElementById("products-content-container");e&&(e.innerHTML='<div class="loader col-span-full mx-auto my-8"></div>');try{const[t,a,o]=await Promise.all([sa(p.establishmentId),la(p.establishmentId,"products"),Ga(p.establishmentId)]);p.products=(t||[]).filter(Boolean),p.categories=(a||[]).filter(Boolean),p.suppliers=(o||[]).filter(Boolean),$o(dt)}catch(t){e&&(e.innerHTML=`<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados: ${t.message}</p>`)}}function $o(e){if(document.getElementById("products-content-container")){if(dt===e&&document.getElementById("products-content-container").children.length>1){dt==="products"&&(Xa(),ht());return}dt=e,be="all",document.querySelectorAll("#products-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="products"?Gn():e==="movements"&&Qn()}}async function Yn(){$e.innerHTML=`
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
        </section>`,ve&&($e.removeEventListener("click",ve),$e.removeEventListener("input",ve),$e.removeEventListener("change",ve)),ve=async e=>{const t=e.target;if(t.id==="productSearchInput"||t.id==="productCategoryFilter"){ht();return}const a=e.target.closest("button[data-action], button[data-view], .indicator-card[data-action], .product-card[data-action]");if(!a||e.target.closest('[data-action-stop-propagation="true"]'))return;if(a.hasAttribute("data-view")){$o(a.dataset.view);return}switch(a.dataset.action){case"new-product":vs();break;case"edit-product":vs(JSON.parse(a.dataset.product));break;case"manage-product-categories":Un();break;case"generate-report":await Xn();break;case"filter-stock":const s=a.dataset.filterType;be=be===s?"all":s,document.querySelectorAll(".indicator-card").forEach(r=>{r.classList.toggle("ring-2",r.dataset.filterType===be),r.classList.toggle("ring-indigo-500",r.dataset.filterType===be),r.classList.toggle("shadow-lg",r.dataset.filterType===be)}),ht();break}},$e.addEventListener("click",ve),$e.addEventListener("input",ve),$e.addEventListener("change",ve),dt="products",be="all",await kt()}const jt=document.getElementById("content");let z={partners:[],establishments:[],searchQuery:"",categoryFilter:"all",stateFilter:"all",cityFilter:"",sortBy:"name_asc",hasSearched:!1,viewMode:"list",editingItem:null},Lt=null;const _t={contas_fixas:{label:"Contas Fixas (Água, Luz)",color:"blue",icon:"bi-lightning-charge"},estoque:{label:"Fornecedor de Produtos",color:"emerald",icon:"bi-box-seam"},servicos:{label:"Prestador de Serviço",color:"purple",icon:"bi-tools"},impostos:{label:"Governo / Impostos",color:"red",icon:"bi-bank"},outros:{label:"Outros Parceiros",color:"gray",icon:"bi-person-vcard"}},Eo=["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];async function Zn(){try{const t=(await ke()).matrizes||[];z.establishments=[],t.forEach(a=>{z.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(o=>z.establishments.push({id:o.id,name:o.name,type:"Filial"}))})}catch(e){console.warn("Erro ao buscar lojas",e)}z.viewMode="list",z.editingItem=null,z.hasSearched=!1,z.partners=[],Kn(),rl(),Io()}function Kn(){jt.innerHTML=`
        <div class="flex flex-col h-auto bg-gray-50 w-full relative font-sans min-h-[calc(100vh-80px)] overflow-x-hidden">
            
            <div id="suppliers-list-view" class="w-full transition-all duration-300 ${z.viewMode==="list"?"block":"hidden"}">
                ${el()}
                <div class="flex-1 px-4 py-8 max-w-7xl mx-auto w-full">
                    <div id="partners-grid" class="pb-20">
                        </div>
                </div>
            </div>

            <div id="suppliers-form-view" class="w-full transition-all duration-300 ${z.viewMode==="form"?"block":"hidden"}">
                <div id="form-container-wrapper" class="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24">
                    </div>
            </div>

        </div>
    `}function el(){const e=Object.entries(_t).map(([a,o])=>`<option value="${a}">${o.label}</option>`).join(""),t=Eo.map(a=>`<option value="${a}">${a}</option>`).join("");return`
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
                                <input type="text" id="filterSearch" placeholder="Nome, CNPJ, Email..." value="${z.searchQuery}" class="w-full pl-10 p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all">
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
                            <input type="text" id="filterCity" placeholder="Ex: São Paulo" value="${z.cityFilter}" class="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all">
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
    `}function tl(e=null){const t=!!e,a=t?"Ficha do Parceiro":"Novo Parceiro de Negócio";let o=e?.category||"";o==="Produtos"&&(o="estoque"),o==="Serviços"&&(o="servicos");const s=Object.entries(_t).map(([n,d])=>`<option value="${n}" ${o===n?"selected":""}>${d.label}</option>`).join(""),r=Eo.map(n=>`<option value="${n}" ${e?.state===n?"selected":""}>${n}</option>`).join(""),i=document.getElementById("form-container-wrapper");i&&(i.innerHTML=`
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
                                        ${r}
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
    `,document.getElementById("partner-form").addEventListener("submit",sl))}function Io(){const e=document.getElementById("partners-grid");e&&(e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl w-full max-w-3xl mx-auto shadow-sm">
                <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 border border-indigo-100 shadow-inner">
                    <i class="bi bi-search text-2xl text-indigo-400"></i>
                </div>
                <h3 class="text-xl font-black text-gray-800 mb-2">Pronto para pesquisar</h3>
                <p class="text-sm text-gray-500 font-medium max-w-md text-center">Utilize os filtros acima e clique em "Buscar" para listar os parceiros registados no sistema.</p>
            </div>
        `)}async function al(){const e=document.getElementById("partners-grid");if(!z.hasSearched){Io();return}e.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="text-sm text-gray-500 mt-4 font-medium">Buscando parceiros...</p></div>';try{const t=await Ga(p.establishmentId);z.partners=t||[],Lo()}catch(t){e.innerHTML=`<div class="text-center py-10 text-red-500 font-bold">Erro ao carregar parceiros: ${t.message}</div>`}}function Lo(){const e=document.getElementById("partners-grid");if(!e)return;let t=z.partners;if(z.searchQuery){const s=z.searchQuery.toLowerCase();t=t.filter(r=>r.name.toLowerCase().includes(s)||r.document&&r.document.includes(s)||r.taxId&&r.taxId.includes(s)||r.email&&r.email.toLowerCase().includes(s)||r.contactName&&r.contactName.toLowerCase().includes(s))}if(z.categoryFilter!=="all"&&(t=t.filter(s=>s.category===z.categoryFilter)),z.stateFilter!=="all"&&(t=t.filter(s=>s.state===z.stateFilter)),z.cityFilter){const s=z.cityFilter.toLowerCase();t=t.filter(r=>r.city&&r.city.toLowerCase().includes(s))}if(t.sort((s,r)=>{let i="",n="";return z.sortBy==="name_asc"||z.sortBy==="name_desc"?(i=(s.name||"").toLowerCase(),n=(r.name||"").toLowerCase()):z.sortBy==="contact_asc"&&(i=(s.contactName||"").toLowerCase(),n=(r.contactName||"").toLowerCase()),z.sortBy==="name_desc"?n.localeCompare(i):i.localeCompare(n)}),t.length===0){e.innerHTML=`
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
    `,o='<div class="flex flex-col gap-4 md:hidden">';t.forEach(s=>{let r=s.category;r==="Produtos"&&(r="estoque"),r==="Serviços"&&(r="servicos");const i=_t[r]||_t.outros,n=s.document||s.taxId?s.document||s.taxId:"-",d=JSON.stringify(s).replace(/'/g,"&apos;"),l=[s.city,s.state].filter(Boolean).join(" - ");a+=`
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
        `,o+=`
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
        `}),a+="</tbody></table></div>",o+="</div>",e.innerHTML=a+o}function ct(e,t=null){const a=document.getElementById("suppliers-list-view"),o=document.getElementById("suppliers-form-view");z.viewMode=e,z.editingItem=t,e==="list"?(a.classList.remove("hidden"),o.classList.add("hidden"),o.innerHTML='<div id="form-container-wrapper" class="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24"></div>',z.hasSearched&&Lo(),window.scrollTo({top:0,behavior:"smooth"})):(a.classList.add("hidden"),o.classList.remove("hidden"),tl(t),window.scrollTo({top:0,behavior:"smooth"}))}async function sl(e){e.preventDefault();const t=e.target,a=t.querySelector("#supId").value,o={name:t.querySelector("#supName").value,contactName:t.querySelector("#supContact").value,email:t.querySelector("#supEmail").value,phone:t.querySelector("#supPhone").value,document:t.querySelector("#supTaxId").value,category:t.querySelector("#supCategory").value,state:t.querySelector("#supState").value,city:t.querySelector("#supCity").value,establishmentId:p.establishmentId,notes:t.querySelector("#supNotes")?.value||"",accessibleIn:[p.establishmentId]},s=t.querySelector('button[type="submit"]'),r=s.innerHTML;s.disabled=!0,s.innerHTML='<div class="loader-small border-white"></div> A gravar...';try{a?(await zn(a,o),g("Sucesso","Ficha atualizada!","success")):(await Hn(o),g("Sucesso","Parceiro registado!","success")),z.hasSearched&&(z.partners=await Ga(p.establishmentId)||[]),ct("list")}catch(i){g("Erro","Falha ao gravar: "+i.message,"error"),s.disabled=!1,s.innerHTML=r}}async function ol(e){if(await J("Excluir Parceiro","Deseja realmente apagar esta ficha permanentemente? Os lançamentos financeiros antigos não serão apagados."))try{await On(e),g("Sucesso","Entidade excluída.","success"),z.partners=z.partners.filter(a=>a.id!==e),ct("list")}catch(a){g("Erro","Erro ao excluir: "+a.message,"error")}}function rl(){Lt&&jt.removeEventListener("click",Lt),Lt=async e=>{const t=e.target;if(t.closest('button[data-action="new-partner"]')){ct("form",null);return}if(t.closest("#btn-search-partners")){z.searchQuery=document.getElementById("filterSearch").value,z.categoryFilter=document.getElementById("filterCategory").value,z.stateFilter=document.getElementById("filterState").value,z.cityFilter=document.getElementById("filterCity").value,z.sortBy=document.getElementById("filterSortBy").value,z.hasSearched=!0,al();return}if(t.closest('button[data-action="back-to-list"]')){ct("list");return}const a=t.closest('button[data-action="delete-partner"]');if(a){e.preventDefault(),ol(a.dataset.id);return}const o=t.closest('[data-action="open-form"]');if(o&&!t.closest("button")){const s=JSON.parse(o.dataset.item.replace(/&apos;/g,"'"));ct("form",s)}},jt.addEventListener("click",Lt),jt.addEventListener("keypress",e=>{e.key==="Enter"&&(e.target.id==="filterSearch"||e.target.id==="filterCity")&&document.getElementById("btn-search-partners").click()})}const pa=document.getElementById("content"),ys={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let ue=new Set,Ct=null,He=null,Ft=[];function Ht(){const e=le.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}function il(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function nl(e){return e.length===0?'<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>':e.map(t=>{const a=t.status==="inactive",o=h(t.name),s=h(t.specialty||"Especialidade"),r=t.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,i=JSON.stringify(t).replace(/'/g,"&apos;"),n=t.accessibleIn?t.accessibleIn.length:1,d=n>1?`<span class="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded ml-2 border border-indigo-200" title="Atende em ${n} unidades"><i class="bi bi-diagram-3"></i> ${n} Lojas</span>`:"";return`
            <div class="professional-card bg-white rounded-lg shadow-md flex items-center gap-4 p-3 cursor-pointer transition-transform transform hover:shadow-lg hover:bg-gray-50
                        sm:flex-col sm:items-stretch sm:p-0 sm:gap-0 ${a?"opacity-50 bg-gray-100":""}" 
                 data-action="open-professional-modal" data-professional='${i}'>
                
                <img src="${r}" alt="Foto de ${o}" class="w-16 h-16 rounded-full object-cover flex-shrink-0
                            sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg">
                
                <div class="flex-1 sm:p-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-sm font-bold text-gray-900 text-left sm:text-base flex items-center">
                                ${o} ${d}
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
            </div>`}).join("")}function ma(){const e=document.getElementById("genericModal");e.style.display="none",He&&e.removeEventListener("click",He)}async function ll(e){const t=document.getElementById("genericModal"),a=e.id?e:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},o=h(a.name),s=p.services||await Pe(p.establishmentId),r=p.professionals||await de(p.establishmentId),i=`
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
        </div>`;t.innerHTML=i,t.style.display="flex",cl(a,s),ul(a),pl(a,r),gl(a)}function dl(e=[]){if(!Ft||Ft.length===0)return`
            <input type="hidden" name="accessibleIn" value="${p.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                <i class="bi bi-info-circle mr-1"></i> Profissional exclusivo desta unidade.
            </div>`;let t='<div class="space-y-1 mt-2 max-h-48 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30">';return Ft.forEach(a=>{const o=e.includes(a.id)||e.length===0&&a.id===p.establishmentId;t+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${h(a.name)} (Matriz)</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(s=>{const r=e.includes(s.id)||e.length===0&&s.id===p.establishmentId;t+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${s.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${r?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${h(s.name)}</span>
                    </label>
                `})}),t+="</div>",t}function cl(e,t){const a=document.getElementById("professionalForm"),o=e.dob?e.dob.split("/"):["",""],s=Array.from({length:12},(b,I)=>{const $=I+1,k=$==o[1]?"selected":"",L=new Date(0,I).toLocaleString("pt-BR",{month:"long"});return`<option value="${$}" ${k}>${L.charAt(0).toUpperCase()+L.slice(1)}</option>`}).join(""),r=e.status||"active",i=h(e.name||""),n=h(e.specialty||""),d=h(e.phone||""),l=h(e.notes||"");a.innerHTML=`
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
                    <div class="form-group"><label for="profPhone" class="block text-sm font-medium text-gray-700 mb-1">WhatsApp / Telefone</label><input type="tel" id="profPhone" value="${d}" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
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
            ${dl(e.accessibleIn||[])}
        </div>

        <div class="pt-6 border-t border-gray-100">
            <label class="block text-base font-bold text-gray-800 mb-3">Serviços que realiza</label>
            <div id="profServicesContainer" class="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50 max-h-64 overflow-y-auto">
                ${t.map(b=>`
                    <label class="flex items-center space-x-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm">
                        <input type="checkbox" value="${b.id}" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" ${e.services?.includes(b.id)?"checked":""}>
                        <span class="text-sm font-medium text-gray-700">${h(b.name)}</span>
                    </label>
                `).join("")}
            </div>
        </div>

        <div class="form-group pt-4">
            <label for="profNotes" class="block text-sm font-medium text-gray-700 mb-1">Observações Internas</label>
            <textarea id="profNotes" rows="3" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">${l}</textarea>
        </div>`;const c=document.getElementById("profPhotoInput"),u=document.getElementById("profPhotoButton"),m=document.getElementById("profPhotoPreview"),f=document.getElementById("profPhotoBase64"),x=e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,y=e.photo||"";u&&u.addEventListener("click",()=>c.click()),c&&(c.onchange=async()=>{const b=c.files[0];if(b){m.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const I=await to(b,800,800,.8),k=I.length*3/4,L=1e3*1024;if(k>L)throw new Error("A imagem é muito grande mesmo após a compressão.");m.src=I,f.value=I}catch(I){g("Erro de Imagem",I.message||"Não foi possível processar a imagem.","error"),m.src=x,f.value=y,c.value=""}}})}function ul(e){const t=document.getElementById("jornada");t.innerHTML=`
        <div class="max-w-4xl mx-auto">
            <h3 class="text-xl font-bold text-gray-800 mb-2">Jornada de Trabalho Semanal</h3>
            <p class="text-sm text-gray-500 mb-6">Defina os dias e os horários em que este profissional atende.</p>
            <div id="profScheduleContainer" class="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
        </div>`,ml(t.querySelector("#profScheduleContainer"),e.workingHours||{})}async function pl(e,t){const a=document.getElementById("bloqueios");a.innerHTML=`
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
                                    <span class="text-sm font-medium text-gray-700">${h(r.name)}</span>
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
        </div>`;const o=document.getElementById("batchBlockageForm");o&&o.addEventListener("submit",async r=>{r.preventDefault();const i=o.querySelector('button[type="submit"]'),n=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm"></span> A gravar...';const d=Array.from(r.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(y=>y.value);if(d.length===0)return i.disabled=!1,i.innerHTML=n,g("Atenção","Selecione pelo menos um profissional.","error");const l=r.target.batchBlockageStartDate.value,c=r.target.batchBlockageEndDate.value||l,u=r.target.batchBlockageStartTime.value,m=r.target.batchBlockageEndTime.value,f=r.target.batchBlockageReason.value;if(!l||!u||!m)return i.disabled=!1,i.innerHTML=n,g("Atenção","Preencha Data de Início, Hora de Início e Fim.","error");const x=d.map(y=>{const b={professionalId:y,establishmentId:p.establishmentId,startTime:new Date(`${l}T${u}`).toISOString(),endTime:new Date(`${c}T${m}`).toISOString(),reason:f};return ta(b)});try{await Promise.all(x),g("Sucesso!",`${d.length} bloqueios foram criados.`),o.reset(),r.target.querySelectorAll('input[name="batch-professionals"]').forEach(b=>{b.checked=b.value===e.id});const y=document.getElementById("prof-blockages-filter").value;ut(e.id,y)}catch(y){g("Erro",y.message,"error")}finally{i.disabled=!1,i.innerHTML=n}}),document.getElementById("prof-blockages-filter").addEventListener("change",r=>ut(e.id,r.target.value)),await ut(e.id,"future")}function ml(e,t){e.innerHTML=Object.keys(ys).map(a=>{const o=t[a]||{},s=o.active!==!1;return`
            <div class="day-schedule-card p-4 rounded-xl ${s?"bg-white border-gray-200 shadow-sm":"bg-gray-50 border-gray-100 disabled opacity-60"} border transition-all">
                 <div class="flex justify-between items-center mb-3">
                    <span class="font-bold text-gray-800">${ys[a]}</span>
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
            </div>`}).join(""),e.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",o=>{const s=o.target.closest(".day-schedule-card"),r=!o.target.checked;s.classList.toggle("bg-white",!r),s.classList.toggle("shadow-sm",!r),s.classList.toggle("border-gray-200",!r),s.classList.toggle("bg-gray-50",r),s.classList.toggle("border-gray-100",r),s.classList.toggle("opacity-60",r),s.classList.toggle("disabled",r),s.querySelectorAll(".time-inputs input").forEach(i=>i.disabled=r)})})}async function ut(e,t="future"){const a=document.getElementById("blockagesList");if(a){a.innerHTML='<div class="loader mx-auto mt-6"></div>';try{const o=new Date;let s,r;t==="history"?(r=new Date,s=new Date,s.setFullYear(s.getFullYear()-2)):(s=new Date,r=new Date,r.setFullYear(r.getFullYear()+2));let n=(await ea(p.establishmentId,s.toISOString(),r.toISOString(),e)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));t==="history"?n=n.filter(l=>l.endTime<o).sort((l,c)=>c.startTime-l.startTime):n=n.filter(l=>l.endTime>=o).sort((l,c)=>l.startTime-c.startTime);const d=n.reduce((l,c)=>{const u=c.reason||"Sem motivo detalhado";return l[u]||(l[u]=[]),l[u].push(c),l},{});if(Object.keys(d).length===0){a.innerHTML=`
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
        `).join("")}catch(o){a.innerHTML=`<p class="text-red-500 p-4">${o.message}</p>`}}}function gl(e){const t=document.getElementById("genericModal");He&&t.removeEventListener("click",He),He=async a=>{const o=a.target.closest("button[data-action]");if(!o){const r=a.target.closest(".tab-link");r&&(t.querySelectorAll(".tab-link").forEach(i=>{i.classList.remove("active","border-indigo-600","text-indigo-600"),i.classList.add("border-transparent","text-gray-500")}),r.classList.add("active","border-indigo-600","text-indigo-600"),r.classList.remove("border-transparent","text-gray-500"),t.querySelectorAll(".tab-content").forEach(i=>i.classList.add("hidden")),document.getElementById(r.dataset.tab).classList.remove("hidden"));return}const s=o.dataset.action;switch(a.stopPropagation(),s){case"close-modal":ma();break;case"delete-professional":const r=o.dataset.id;if(await J("Excluir Profissional",`Tem certeza que deseja excluir ${e.name}? Esta ação não pode ser desfeita e ele será removido da agenda e de todas as lojas.`))try{await ao(r),ge(p.establishmentId,Ht(),"Equipe","Excluiu",`Excluiu profissional: ${e.name}`),g("Sucesso!","Profissional excluído da rede.","success"),ma(),Ut()}catch($){g("Erro",`Não foi possível excluir: ${$.message}`,"error")}break;case"save-professional":const n=document.getElementById("professionalForm"),d=o,l=document.getElementById("profScheduleContainer"),c=Array.from(n.querySelectorAll("#profServicesContainer input:checked")).map($=>$.value),u={};l&&l.querySelectorAll(".day-schedule-card").forEach($=>{const k=$.querySelector('[data-field="active"]').dataset.day;u[k]={active:$.querySelector('[data-field="active"]').checked,start:$.querySelector('[data-field="start"]').value,end:$.querySelector('[data-field="end"]').value,breakStart:$.querySelector('[data-field="breakStart"]').value,breakEnd:$.querySelector('[data-field="breakEnd"]').value}});const m=Array.from(n.querySelectorAll('input[name="accessibleIn"]:checked')).map($=>$.value),f=m.length>0?m:[p.establishmentId],x={...e,id:n.querySelector("#professionalId").value||void 0,accessibleIn:f,name:n.querySelector("#profName").value.trim(),specialty:n.querySelector("#profSpecialty").value,photo:n.querySelector("#profPhotoBase64").value,services:c,workingHours:u,phone:n.querySelector("#profPhone").value,dob:`${n.querySelector("#profDobDay").value}/${n.querySelector("#profDobMonth").value}`,receivesCommission:n.querySelector("#profCommission").value==="sim",showOnAgenda:n.querySelector("#profShowOnAgenda").value==="sim",orderOnAgenda:parseInt(n.querySelector("#profOrderOnAgenda").value)||1,notes:n.querySelector("#profNotes").value,status:n.querySelector("#profStatus").value,establishmentId:p.establishmentId},y=d.innerHTML;d.disabled=!0,d.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{x.id?(await ni(x.id,x),ge(p.establishmentId,Ht(),"Equipe","Editou",`Editou o profissional: ${x.name}`),g("Sucesso!","Dados atualizados.","success")):(delete x.id,await ii(x),ge(p.establishmentId,Ht(),"Equipe","Criou",`Cadastrou o profissional: ${x.name}`),g("Sucesso!","Novo membro adicionado à equipe.","success")),ma(),Ut()}catch($){g("Erro",$.message,"error"),d.disabled=!1,d.innerHTML=y}break;case"delete-blockage":const b=o.dataset.id;if(await J("Apagar Bloqueio","O profissional voltará a ficar disponível na agenda neste dia. Confirma?"))try{await Ha(b),g("Bloqueio removido.","success");const $=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";ut(e.id,$)}catch($){g("Erro",$.message,"error")}break;case"batch-delete-blockage":const I=JSON.parse(o.dataset.ids);if(await J("Apagar em Lote",`Tem certeza que deseja apagar ${I.length} dias de bloqueio de uma vez?`))try{await so(I),g("Bloqueios removidos.","success");const $=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";ut(e.id,$)}catch($){g("Erro",$.message,"error")}break}},t.addEventListener("click",He)}function Ia(){const e=document.getElementById("batch-actions-container"),t=document.getElementById("selected-count");!e||!t||(ue.size>0?(t.textContent=`${ue.size} selecionado(s)`,e.classList.remove("hidden"),e.classList.add("flex")):(e.classList.add("hidden"),e.classList.remove("flex")))}function bl(){J("Excluir em Lote",`Tem certeza que deseja excluir ${ue.size} profissionais da rede? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{await li(Array.from(ue)),ge(p.establishmentId,Ht(),"Equipe","Excluiu em Lote",`Excluiu ${ue.size} profissionais`),g("Sucesso!",`${ue.size} profissionais foram excluídos.`,"success"),ue.clear(),Ia(),Ut()}catch(t){g("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}function tt(){const e=document.getElementById("professionalsList");if(!e)return;if(!p.professionals){e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=il();return}const t=document.getElementById("showInactiveProfToggle").checked,a=document.getElementById("profSearchInput").value.toLowerCase(),o=p.professionals.filter(s=>{const r=s.name.toLowerCase().includes(a),i=t||s.status!=="inactive";return r&&i});e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=nl(o)}async function Ut(){ue.clear(),pa.innerHTML=`
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
        </section>`,Ct&&pa.removeEventListener("click",Ct),Ct=t=>{const a=t.target.closest('[data-action="open-professional-modal"]'),o=t.target.closest('[data-action="batch-delete"]');if(a){t.preventDefault();let r={};if(a.dataset.professional)try{r=JSON.parse(a.dataset.professional)}catch(i){console.error("Erro ao fazer parse do professional data:",i);return}ll(r);return}if(o){bl();return}const s=t.target.closest(".professional-checkbox");if(s){const r=s.dataset.id;s.checked?ue.add(r):ue.delete(r),tt(),Ia();return}},pa.addEventListener("click",Ct),document.getElementById("profSearchInput").addEventListener("input",tt),document.getElementById("showInactiveProfToggle").addEventListener("change",tt);const e=document.getElementById("professionalsList");p.professionals=null,p.services=null,tt();try{const[t,a,o]=await Promise.all([de(p.establishmentId),Pe(p.establishmentId),ke()]);p.professionals=t,p.services=a,Ft=o?.matrizes||[],tt(),Ia()}catch{e.innerHTML='<p class="text-red-500 col-span-full font-bold text-center py-10 bg-red-50 rounded-lg border border-red-100">Erro ao carregar dados do servidor.</p>'}}let E={clients:[],selectedClient:null,activeTab:"profile",filters:{search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},showFilters:!1,loading:!1,historyLimit:20,historySearchTerm:"",historyLoading:!1,historyData:{appointments:[],sales:[],loyaltyLog:[]},modalOpen:!1},Co=null;const fl=e=>e?String(e).replace(/\D/g,""):"",xl=e=>{if(!e)return"Nunca";let t;if(typeof e=="object"&&(e.seconds||e._seconds)){const a=e.seconds||e._seconds;t=new Date(a*1e3)}else t=new Date(e);return isNaN(t.getTime())?"Data Inválida":t.toLocaleDateString("pt-BR")};function Ya(){Co.innerHTML=`
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
                ${E.loading?'<div class="flex justify-center pt-20"><div class="loader"></div></div>':""}
            </div>
        </section>
    `;const e=document.getElementById("btn-new-client");e&&(e.onclick=Il)}function vt(){if(E.modalOpen)return;Ya();const e=document.getElementById("clients-content-area"),t=E.filters.inactiveDays||E.filters.birthMonth||E.filters.hasLoyalty||E.filters.hasDebt,a=`
        <div class="sticky top-0 bg-gray-50 z-20 px-3 sm:px-4 pt-4 pb-2 w-full">
            <div class="flex gap-2 items-center">
                <div class="relative flex-grow shadow-sm">
                    <input type="text" id="client-search" 
                        class="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition bg-white" 
                        placeholder="Buscar cliente..." 
                        value="${E.filters.search}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                
                <button id="btn-toggle-filters" class="flex-shrink-0 p-3 rounded-xl border transition flex items-center gap-2 font-medium ${E.showFilters||t?"bg-indigo-50 border-indigo-200 text-indigo-700":"bg-white border-gray-300 text-gray-600 hover:bg-gray-50"}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                    <span class="hidden sm:inline">Filtros</span>
                    ${t?'<span class="flex h-2 w-2 rounded-full bg-indigo-600"></span>':""}
                </button>
            </div>

            <div id="filter-panel" class="${E.showFilters?"max-h-96 opacity-100 mt-3":"max-h-0 opacity-0 overflow-hidden"} transition-all duration-300 ease-in-out">
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase">Dias Ausente (Min)</label>
                        <div class="relative">
                            <input type="number" id="filter-inactive" min="1"
                                class="w-full p-2.5 pl-9 rounded-lg border border-gray-300 focus:ring-indigo-500 text-sm bg-gray-50 outline-none" 
                                placeholder="Ex: 30 dias" 
                                value="${E.filters.inactiveDays}">
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
                            <input type="checkbox" id="filter-loyalty" class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" ${E.filters.hasLoyalty?"checked":""}>
                            <span class="ml-2 text-sm text-gray-700 font-medium">Com Pontos Fidelidade</span>
                        </label>
                        <label class="flex items-center cursor-pointer hover:bg-red-50 p-1 rounded transition">
                            <input type="checkbox" id="filter-debt" class="rounded text-red-600 focus:ring-red-500 w-4 h-4" ${E.filters.hasDebt?"checked":""}>
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
    `,o=E.clients.length>0?`
        <div class="px-3 sm:px-4 pb-20 pt-2 w-full">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                ${E.clients.map(c=>{const u=c.totalDebt&&parseFloat(c.totalDebt)>0,m=xl(c.lastVisit);return`
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
    `;e.innerHTML=a+o;const s=document.getElementById("client-search"),r=document.getElementById("btn-toggle-filters"),i=document.getElementById("btn-apply-filters"),n=document.getElementById("btn-clear-search");r&&(r.onclick=()=>{E.showFilters=!E.showFilters,vt()});const d=document.getElementById("filter-birth-month");d&&(d.value=E.filters.birthMonth);const l=()=>{const c=document.getElementById("filter-inactive"),u=document.getElementById("filter-loyalty"),m=document.getElementById("filter-debt"),f=document.getElementById("filter-birth-month");E.filters={search:s.value,inactiveDays:c?c.value:"",birthMonth:f?f.value:"",hasLoyalty:u?u.checked:!1,hasDebt:m?m.checked:!1},La()};i&&(i.onclick=l),n&&(n.onclick=()=>{E.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},E.showFilters=!1,La()}),s.addEventListener("keypress",c=>{c.key==="Enter"&&l()}),e.querySelectorAll(".client-card").forEach(c=>{c.onclick=()=>Do(c.dataset.id)})}function hl(e){const t=`
        <div class="bg-white border-b sticky top-0 z-10 shadow-sm w-full">
            <div class="flex overflow-x-auto no-scrollbar gap-1 px-3 sm:px-4 py-1 w-full">
                <button class="tab-btn ${E.activeTab==="profile"?"active":""}" data-tab="profile">👤 Perfil</button>
                <button class="tab-btn ${E.activeTab==="appointments"?"active":""}" data-tab="appointments">📅 Agendamentos</button>
                <button class="tab-btn ${E.activeTab==="history"?"active":""}" data-tab="history">💰 Histórico</button>
                <button class="tab-btn ${E.activeTab==="loyalty"?"active":""}" data-tab="loyalty">⭐ Fidelidade</button>
            </div>
        </div>
    `;let a="";return E.activeTab==="profile"?a=wl(e):E.activeTab==="appointments"?a=kl():E.activeTab==="history"?a=Sl():E.activeTab==="loyalty"&&(a=$l(e)),`
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
                ${E.historyLoading?'<div class="absolute inset-0 bg-white/80 flex items-start justify-center pt-20 z-20"><div class="loader"></div></div>':""}
                <div class="animate-fade-in max-w-4xl mx-auto w-full pb-10">
                    ${a}
                </div>
            </div>
        </div>
    `}function vl(e,t){if(!document.getElementById("tabs-styles")){const r=document.createElement("style");r.id="tabs-styles",r.textContent=`
            .tab-btn { padding: 12px 16px; white-space: nowrap; font-size: 0.9rem; font-weight: 500; color: #6b7280; border-bottom: 2px solid transparent; transition: all 0.2s; flex-shrink: 0; }
            .tab-btn.active { color: #4f46e5; border-bottom-color: #4f46e5; font-weight: 700; background-color: #f3f4f6; border-top-left-radius: 8px; border-top-right-radius: 8px; }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `,e.appendChild(r)}if(e.querySelectorAll(".tab-btn").forEach(r=>{r.onclick=async()=>{const i=r.dataset.tab;if(E.activeTab===i)return;(i==="appointments"||i==="history")&&(E.historyLimit=20,E.historySearchTerm=""),E.activeTab=i,_e(),i!=="profile"&&!E.historyLoading&&E.historyData.appointments.length===0&&await ws(t.id)}}),E.activeTab==="profile"){const r=e.querySelector("#form-edit-client"),i=e.querySelector("#btn-delete-client");r&&(r.onsubmit=Ll),i&&(i.onclick=Cl)}if(E.activeTab==="loyalty"){const r=e.querySelector("#btn-manual-redeem");r&&(r.onclick=()=>El(t))}const a=e.querySelector("#history-search-input");if(a){const r=a.value;a.value="",a.focus(),a.value=r,a.addEventListener("input",i=>{E.historySearchTerm=i.target.value,_e()})}const o=e.querySelector("#btn-load-more");o&&(o.onclick=()=>{E.historyLimit+=20,_e(),ws(t.id)}),e.querySelectorAll("[data-go-agenda]").forEach(r=>{r.onclick=i=>{Ue(),G("agenda-section",{targetDate:new Date(r.dataset.date),scrollToAppointmentId:r.dataset.id})}}),e.querySelectorAll("[data-go-comanda]").forEach(r=>{r.onclick=i=>{Ue(),G("comandas-section",{selectedAppointmentId:r.dataset.id,initialFilter:"finalizadas"})}});const s=e.querySelector("#btn-close-modal");s&&(s.onclick=Ue)}async function _e(){const e=E.selectedClient;if(!e){Ue();return}yl(e)}function yl(e){let t=document.getElementById("client-details-modal-overlay");t||(t=document.createElement("div"),t.id="client-details-modal-overlay",t.className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-fade-in",t.innerHTML=`
            <div class="bg-white w-full h-full sm:h-[90vh] sm:max-w-5xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-in" id="client-modal-content">
            </div>
        `,t.onclick=o=>{o.target===t&&Ue()},document.body.appendChild(t),document.body.classList.add("overflow-hidden"),E.modalOpen=!0);const a=t.querySelector("#client-modal-content");a.innerHTML=hl(e),vl(a,e)}function Ue(){const e=document.getElementById("client-details-modal-overlay");e&&e.remove(),document.body.classList.remove("overflow-hidden"),E.modalOpen=!1,E.selectedClient=null,vt()}function wl(e){return`
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
    `}function kl(e){let t=E.historyData.appointments||[];if(E.historySearchTerm){const o=E.historySearchTerm.toLowerCase();t=t.filter(s=>s.serviceName&&s.serviceName.toLowerCase().includes(o)||s.professionalName&&s.professionalName.toLowerCase().includes(o))}t.sort((o,s)=>new Date(s.startTime)-new Date(o.startTime));const a=o=>{const s=new Date(o.startTime),r=s.toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).replace(".",""),i=s.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),n=s<new Date;let d=n?"Concluído":"Agendado",l=n?"bg-gray-200 text-gray-600":"bg-green-100 text-green-700";return o.status==="cancelled"&&(d="Cancelado",l="bg-red-100 text-red-600"),`
            <div class="relative bg-white border rounded-xl p-3 shadow-sm mb-3 flex gap-3 cursor-pointer active:scale-[0.99] transition w-full overflow-hidden"
                 data-go-agenda="true" data-id="${o.id}" data-date="${o.startTime}">
                
                <div class="flex-shrink-0 w-14 flex flex-col items-center justify-center rounded-lg bg-gray-100 border border-gray-200 p-1">
                    <span class="text-xs font-bold text-gray-500 uppercase">${r.split(" ")[0]}</span>
                    <span class="text-lg font-black text-gray-800 leading-none">${s.getDate()}</span>
                    <span class="text-[10px] text-gray-500">${i}</span>
                </div>

                <div class="flex-grow min-w-0 flex flex-col justify-center">
                    <h4 class="font-bold text-gray-800 text-sm truncate">${h(o.serviceName||"Serviço")}</h4>
                    <p class="text-xs text-gray-500 truncate">Prof: ${h(o.professionalName||"N/A")}</p>
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
                        value="${E.historySearchTerm}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            <div class="w-full">
                ${t.length?t.map(a).join(""):'<p class="text-center text-gray-400 py-10 italic">Nenhum agendamento encontrado.</p>'}
            </div>
            
            ${t.length>=E.historyLimit?`
            <button id="btn-load-more" class="w-full py-3 text-sm text-indigo-600 font-bold bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                Carregar mais antigos...
            </button>`:""}
        </div>
    `}function Sl(e){let t=E.historyData.sales||[];if(E.historySearchTerm){const a=E.historySearchTerm.toLowerCase();t=t.filter(o=>o.id.includes(a))}return t.sort((a,o)=>new Date(o.date)-new Date(a.date)),t.length===0&&!E.historySearchTerm?'<div class="text-center py-12 text-gray-400">Nenhum registro financeiro.</div>':`
        <div class="space-y-4 w-full">
            <div class="sticky top-0 bg-gray-50 pt-2 pb-2 z-10 w-full">
                <div class="relative w-full">
                    <input type="text" id="history-search-input" 
                        class="w-full p-3 pl-10 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm" 
                        placeholder="Buscar código da venda..." 
                        value="${E.historySearchTerm}">
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
            
             ${t.length>=E.historyLimit?`
            <button id="btn-load-more" class="w-full py-3 text-sm text-indigo-600 font-bold bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                Carregar mais...
            </button>`:""}
        </div>
    `}function $l(e){const t=E.historyData.loyaltyLog||[];t.sort((o,s)=>new Date(s.date)-new Date(o.date));const a=t.length>0?t.map(o=>{const s=o.type==="redemption";return`
            <div class="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 w-full">
                <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full ${s?"bg-red-500":"bg-green-500"}"></div>
                    <div>
                        <p class="text-sm font-medium text-gray-700">${h(o.description||(s?"Resgate":"Acúmulo"))}</p>
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
    `}async function La(){E.loading=!0,Ya();try{let e=`/api/clients/${p.establishmentId}?limit=20`;E.filters.search&&(e+=`&search=${encodeURIComponent(E.filters.search)}`),E.filters.inactiveDays&&(e+=`&inactiveDays=${E.filters.inactiveDays}`),E.filters.hasLoyalty&&(e+="&hasLoyalty=true"),E.filters.hasDebt&&(e+="&hasDebt=true"),E.clients=await C(e),vt()}catch(e){console.error(e),g("Erro","Falha ao carregar clientes.","error"),E.clients=[],vt()}finally{E.loading=!1;const e=document.querySelector(".loader");e&&e.parentElement&&e.parentElement.remove()}}async function ws(e){const t=E.selectedClient;if(!(!t||!t.phone)){E.historyLoading=!0;try{const a=new Date;a.setMonth(a.getMonth()+12);const o=new Date;o.setFullYear(o.getFullYear()-5);let s=`/api/appointments/${p.establishmentId}?startDate=${o.toISOString()}&endDate=${a.toISOString()}`;s+=`&clientPhone=${encodeURIComponent(fl(t.phone))}`,s+=`&limit=${E.historyLimit}`;const r=await C(s);E.historyData.appointments=r,E.historyData.sales=r.filter(n=>n.status==="completed").map(n=>({id:n.id,date:n.startTime,totalAmount:n.totalAmount||0,items:n.comandaItems||n.services||[]}));const i=[];r.forEach(n=>{n.status==="completed"&&n.loyaltyPointsEarned>0&&i.push({type:"earn",points:n.loyaltyPointsEarned,date:n.startTime,description:"Venda finalizada"}),n.loyaltyRedemption&&i.push({type:"redemption",points:n.loyaltyRedemption.cost||0,date:n.startTime,description:`Resgate: ${n.loyaltyRedemption.name}`})}),E.historyData.loyaltyLog=i}catch(a){console.error("Erro ao buscar histórico",a)}finally{E.historyLoading=!1,E.modalOpen&&E.selectedClient&&_e()}}}function El(e){const t=e.loyaltyPoints||0,a=`
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
    `,{modalElement:o,close:s}=ie({title:"Ajuste de Pontos",contentHTML:a,maxWidth:"w-[90%] max-w-xs"});o.querySelector("form").onsubmit=async r=>{r.preventDefault();const i=document.getElementById("redeem-action").value,n=parseInt(document.getElementById("redeem-points").value,10),d=document.getElementById("redeem-reason").value;if(!n||n<=0)return g("Erro","Qtd inválida.","error");if(i==="debit"&&n>t)return g("Erro","Saldo insuficiente.","error");try{let l=t;i==="debit"?(await Gr(p.establishmentId,e.phone,n,d),l-=n):(l+=n,await eo(e.id,{loyaltyPoints:l})),E.selectedClient.loyaltyPoints=l,E.historyData.loyaltyLog.unshift({type:i==="debit"?"redemption":"earn",points:n,date:new Date().toISOString(),description:d+" (Manual)"}),g("Sucesso","Saldo atualizado.","success"),s(),_e()}catch(l){g("Erro",l.message,"error")}}}function Do(e){E.selectedClient=E.clients.find(t=>t.id===e),E.activeTab="profile",E.historyLimit=20,E.historySearchTerm="",E.historyData={appointments:[],sales:[],loyaltyLog:[]},_e()}function Il(){const e=`
        <form id="modal-new-client-form" class="space-y-4">
            <div><label class="block text-sm font-bold text-gray-700 mb-1">Nome Completo *</label><input type="text" id="new-name" required class="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"></div>
            <div><label class="block text-sm font-bold text-gray-700 mb-1">Telefone (WhatsApp) *</label><input type="tel" id="new-phone" required class="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"></div>
            <div class="pt-4">
                <button type="submit" class="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:bg-indigo-700 active:scale-95 transition">Cadastrar</button>
            </div>
        </form>
    `,{modalElement:t,close:a}=ie({title:"Novo Cliente",contentHTML:e,maxWidth:"w-[90%] max-w-sm"});t.querySelector("form").onsubmit=async o=>{o.preventDefault();const s=document.getElementById("new-name").value,r=document.getElementById("new-phone").value;try{const i=await Ks({establishmentId:p.establishmentId,name:s,phone:r});E.clients.unshift(i),g("Sucesso","Cliente criado!","success"),a(),Do(i.id)}catch(i){g("Erro",i.message,"error")}}}async function Ll(e){e.preventDefault();const t=new FormData(e.target),a=Object.fromEntries(t.entries());a.establishmentId=p.establishmentId;try{await eo(E.selectedClient.id,a),Object.assign(E.selectedClient,a);const o=E.clients.findIndex(s=>s.id===E.selectedClient.id);o!==-1&&(E.clients[o]=E.selectedClient),g("Sucesso","Dados salvos!","success")}catch(o){g("Erro",o.message,"error")}}async function Cl(){if(await J("Excluir Cliente","Tem certeza? O histórico será apagado."))try{await Jr(E.selectedClient.id),E.clients=E.clients.filter(e=>e.id!==E.selectedClient.id),E.selectedClient=null,g("Sucesso","Cliente removido.","success"),Ue(),vt()}catch(e){g("Erro",e.message,"error")}}async function Dl(){Co=document.getElementById("content"),E.selectedClient=null,E.searchTerm="",E.historyLimit=20,E.showFilters=!1,E.modalOpen=!1,E.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},Ya(),await La()}const Le=document.getElementById("content"),ga={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},Tl={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}};let W=null,Q=null;function To(){return[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais da Unidade"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"whatsapp-bot",icon:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",label:"Atendente Virtual (WhatsApp)"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}]}function ks(e,t,a){return new Promise((o,s)=>{const r=new FileReader;r.readAsDataURL(e),r.onload=i=>{const n=new Image;n.src=i.target.result,n.onload=()=>{const d=document.createElement("canvas");let l=n.width,c=n.height;l>t&&(c*=t/l,l=t),d.width=l,d.height=c,d.getContext("2d").drawImage(n,0,0,l,c);const m=e.type==="image/png"&&t<500?"image/png":"image/jpeg";o(d.toDataURL(m,a))},n.onerror=d=>s(d)},r.onerror=i=>s(i)})}function Re(e,t=null){let a='<option value="">-- Selecione (Opcional) --</option>';const o=i=>{const n=new Map,d=[];return i&&(i.forEach(l=>n.set(l.id,{...l,children:[]})),n.forEach(l=>{l.parentId&&n.has(l.parentId)?n.get(l.parentId).children.push(l):d.push(l)})),d},s=(i,n="")=>{const d=i.id===t?"selected":"";a+=`<option value="${i.id}" ${d}>${n}${h(i.name)}</option>`,i.children.forEach(l=>s(l,n+"— "))};return o(e).forEach(i=>s(i)),a}async function et(e,t){const a=t.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const o=[],{ownerName:s,...r}=e;if(s&&s!==p.userName){const n=le.currentUser;n&&o.push(Jo(n,{displayName:s}).then(()=>{p.userName=s}))}const i={...W,...r};o.push(ja(Q,i)),await Promise.all(o),W=i,g("Sucesso","Definições salvas com sucesso!","success"),r.themeColor&&Q===p.establishmentId&&setTimeout(()=>window.location.reload(),1500)}catch(o){g("Erro",`Não foi possível salvar: ${o.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function Bl(e,t){const a=h(e.name||""),o=h(e.phone||""),s=h(e.cnpj||""),r=h(e.email||""),i=h(e.address||""),n=h(e.website||""),d=h(p.userName||"");t.innerHTML=`
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
    `,t.querySelector("#personal-data-form").addEventListener("submit",l=>{l.preventDefault();const c={ownerName:t.querySelector("#ownerName").value,name:t.querySelector("#establishmentName").value,phone:t.querySelector("#establishmentPhone").value,cnpj:t.querySelector("#establishmentCnpjCpf").value,email:t.querySelector("#establishmentEmail").value,address:t.querySelector("#establishmentAddress").value,website:t.querySelector("#establishmentWebsite").value};et(c,l)})}function Pl(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const o=t.querySelector("#newPassword").value,s=t.querySelector("#confirmPassword").value;if(o!==s){g("Erro","As senhas não coincidem.","error");return}const r=t.querySelector('button[form="change-password-form"]');r.disabled=!0,r.textContent="A Salvar...";try{const i=le.currentUser;if(i)await Wo(i,o),g("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum usuário logado encontrado.")}catch(i){g("Erro",`Não foi possível alterar a senha: ${i.message}`,"error")}finally{r.disabled=!1,r.textContent="Salvar Nova Senha"}})}function Ml(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const o=t.querySelector("#newEmail").value,s=t.querySelector("#currentPassword").value,r=t.querySelector('button[form="change-email-form"]');r.disabled=!0,r.textContent="A verificar...";try{const i=le.currentUser,n=Vo.credential(i.email,s);await _o(i,n),await Uo(i,o),await Er(Q,o),g("Sucesso","Link de verificação enviado! Verifique o seu novo e-mail.","success"),a.target.reset()}catch(i){g("Erro",i.message,"error")}finally{r.disabled=!1,r.textContent="Salvar Novo E-mail"}})}function Al(e,t){const a=h(e.welcomeMessage||"");t.innerHTML=`
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
    `,t.querySelector("#establishmentLogoBase64").value=e.logo||"",t.querySelector("#establishmentBackgroundImageBase64").value=e.backgroundImage||"",Po(e.themeColor||"indigo",t),t.querySelector("#establishmentLogoButton").onclick=()=>t.querySelector("#establishmentLogoInput").click(),t.querySelector("#establishmentLogoInput").onchange=async o=>{const s=o.target.files[0];if(s){const r=await ks(s,300,.9);t.querySelector("#establishmentLogoPreview").src=r,t.querySelector("#establishmentLogoBase64").value=r}},t.querySelector("#establishmentBgButton").onclick=()=>t.querySelector("#establishmentBgInput").click(),t.querySelector("#establishmentBgInput").onchange=async o=>{const s=o.target.files[0];if(s){const r=t.querySelector("#establishmentBgButton");r.textContent="A processar...",r.disabled=!0;try{const i=await ks(s,1280,.7);t.querySelector("#establishmentBgPreview").src=i,t.querySelector("#establishmentBgPreview").classList.remove("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=i}finally{r.textContent="Carregar Fundo",r.disabled=!1}}},t.querySelector("#establishmentBgRemoveBtn").onclick=()=>{t.querySelector("#establishmentBgPreview").src="",t.querySelector("#establishmentBgPreview").classList.add("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.remove("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=""},t.querySelector("#branding-form").addEventListener("submit",o=>{o.preventDefault();const s={logo:t.querySelector("#establishmentLogoBase64").value,welcomeMessage:t.querySelector("#establishmentWelcomeMessage").value,backgroundImage:t.querySelector("#establishmentBackgroundImageBase64").value,primaryColor:t.querySelector("#establishmentPrimaryColorInput").value,textColor:t.querySelector("#establishmentTextColorInput").value,themeColor:t.querySelector("#establishmentThemeColor").value};et(s,o)})}function ql(e,t){const a=e.urlId||Q;let o=window.location.origin;(o.includes("localhost")||o.includes("capacitor://")||o.includes("127.0.0.1"))&&(o="https://www.kairosagenda.com.br");const s=h(`${o}/agendar?id=${a}`),r=e.publicBookingEnabled||!1,i=r?"Agendamento Online ATIVO":"Agendamento Online INATIVO",n=r?"text-green-600":"text-red-600";t.innerHTML=`
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
    `,t.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const d=t.querySelector("#publicBookingLink");d.select(),document.execCommand("copy"),d.blur(),g("Sucesso","Link copiado!","success")}),t.querySelector("#publicBookingToggle").addEventListener("change",async d=>{const l=d.target.checked,c=t.querySelector("#publicBookingStatusText");c.textContent=l?"Agendamento Online ATIVO":"Agendamento Online INATIVO",c.className=l?"text-sm font-semibold text-green-600":"text-sm font-semibold text-red-600";try{d.target.disabled=!0,await $r(Q,l),W.publicBookingEnabled=l,g("Sucesso",`Agendamento online ${l?"ativado":"desativado"}!`,"success")}catch(u){g("Erro",u.message,"error"),d.target.checked=!l}finally{d.target.disabled=!1}}),zl(e.slotInterval||30,t),t.querySelector("#booking-form").addEventListener("submit",d=>{d.preventDefault();const l={slotInterval:parseInt(t.querySelector("#establishmentSlotInterval").value,10)};et(l,d)})}function Rl(e,t){t.innerHTML=`
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
    `;const a=t.querySelector("#establishmentTimezone");e.timezone&&(a.value=e.timezone);const o=t.querySelector("#establishmentWorkingHoursContainer"),s=e.workingHours||{};Object.keys(ga).forEach(r=>{const i=s[r]||{},n=ga[r],d=i.active!==!1,l=document.createElement("div");l.className=`day-schedule-card p-4 rounded-lg border ${d?"bg-gray-50 border-gray-200":"bg-gray-100 border-gray-100 disabled opacity-60"}`,l.innerHTML=`
            <div class="flex justify-between items-center mb-4">
                <span class="font-bold text-gray-800">${n}</span>
                <label class="flex items-center cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" id="est-${r}-active" class="sr-only" ${d?"checked":""}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                </label>
            </div>
            <div class="time-inputs grid grid-cols-2 gap-3">
                <div><label class="text-xs text-gray-500">Abertura:</label><input type="time" id="est-${r}-start" value="${i.start||"09:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Fecho:</label><input type="time" id="est-${r}-end" value="${i.end||"18:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Início Pausa:</label><input type="time" id="est-${r}-breakStart" value="${i.breakStart||"12:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Fim Pausa:</label><input type="time" id="est-${r}-breakEnd" value="${i.breakEnd||"13:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
            </div>`,o.appendChild(l)}),o.addEventListener("change",r=>{const i=r.target.closest('.day-schedule-card input[type="checkbox"]');if(i){const n=i.closest(".day-schedule-card");n.classList.toggle("disabled",!i.checked),n.classList.toggle("opacity-60",!i.checked),n.classList.toggle("bg-gray-50",i.checked),n.classList.toggle("bg-gray-100",!i.checked)}}),t.querySelector("#working-hours-form").addEventListener("submit",r=>{r.preventDefault();const i={};Object.keys(ga).forEach(d=>{i[d]={active:t.querySelector(`#est-${d}-active`).checked,start:t.querySelector(`#est-${d}-start`).value,end:t.querySelector(`#est-${d}-end`).value,breakStart:t.querySelector(`#est-${d}-breakStart`).value,breakEnd:t.querySelector(`#est-${d}-breakEnd`).value}});const n=t.querySelector("#establishmentTimezone").value;et({workingHours:i,timezone:n},r)})}function Bo(e,t){const a=!!e.whatsappInstance;t.innerHTML=`
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
    `;let o=null;const s=t.querySelector("#btnGenerateQr"),r=t.querySelector("#btnCancelQr");s&&s.addEventListener("click",async()=>{s.disabled=!0,s.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gerando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const l=await(await fetch(`${n}/connect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:Q})})).json();if(l.qrcode){t.querySelector("#whatsappStatusArea").classList.add("hidden"),t.querySelector("#qrCodeDisplayArea").classList.remove("hidden");const c=l.qrcode.includes("data:image")?l.qrcode:`data:image/png;base64,${l.qrcode}`;t.querySelector("#qrCodeImage").src=c,o=setInterval(async()=>{try{const m=await(await fetch(`${n}/status/${Q}`)).json();m.connected&&(clearInterval(o),W.whatsappInstance=m.instanceName,t.querySelector("#qrCodeDisplayArea").classList.add("hidden"),t.querySelector("#connectedStatusArea").classList.remove("hidden"),g("Sucesso","WhatsApp conectado com sucesso!","success"))}catch(u){console.error("Erro ao verificar status do WhatsApp",u)}},5e3)}else g("Erro na API",l.error||"Erro desconhecido","error")}catch(d){console.error(d),g("Erro de Conexão","Não foi possível acessar o servidor Kairós.","error")}finally{s.disabled=!1,s.innerHTML='<i class="bi bi-phone-vibrate"></i> Gerar QR Code'}}),r&&r.addEventListener("click",()=>{o&&clearInterval(o),t.querySelector("#qrCodeDisplayArea").classList.add("hidden"),t.querySelector("#whatsappStatusArea").classList.remove("hidden")});const i=t.querySelector("#btnDisconnectWhatsapp");i&&i.addEventListener("click",async()=>{if(!confirm("Tem certeza que deseja DESCONECTAR? O bot parará de responder imediatamente."))return;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Desconectando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const l=await(await fetch(`${n}/disconnect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:Q})})).json();l.success?(g("Sucesso","WhatsApp desconectado!","success"),W.whatsappInstance=null,Bo(W,t)):alert("Erro ao desconectar: "+l.error)}catch(d){console.error(d),g("Erro","Falha ao comunicar com o servidor.","error")}finally{i&&(i.disabled=!1,i.innerHTML='<i class="bi bi-power"></i> Desconectar')}})}async function Nl(e,t){const a=e.loyaltyProgram||{},o=a.pointsPerVisit||1;let s=[],r=[],i=[];try{[s,r,i]=await Promise.all([Pe(Q),sa(Q),_a(Q)])}catch(l){console.error("Erro ao carregar dados para fidelidade:",l)}t.innerHTML=`
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
    `;const n=t.querySelector("#loyaltyTiersContainer"),d=(l={})=>{const c=document.createElement("div");c.className="loyalty-tier-row bg-white p-4 border border-gray-200 rounded-lg shadow-sm relative grid grid-cols-1 md:grid-cols-4 gap-4 items-end";const u=l.type||"money",m=l.itemId||"",f=l.reward||"",x=l.discount||"",y=l.points||l.costPoints||"";c.innerHTML=`
            <div>
                <label class="text-xs font-bold text-gray-500 mb-1 block">Custo (Pontos)</label>
                <div class="relative">
                    <input type="number" placeholder="Ex: 100" data-field="points" value="${y}" class="w-full p-2 border border-gray-300 rounded-md font-bold text-gray-800">
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
                    <input type="text" placeholder="Ex: R$ 20 de Desconto" data-field="rewardName" value="${h(f)}" class="desc-input flex-1 p-2 border border-gray-300 rounded-md ${u!=="money"?"hidden":""}">
                    
                    <select data-field="itemId" class="item-select flex-1 p-2 border border-gray-300 rounded-md bg-white text-sm ${u==="money"?"hidden":""}">
                        <option value="">Selecione o item na lista...</option>
                    </select>

                    <div class="w-24 relative">
                        <span class="absolute left-2 top-2 text-gray-500 text-sm">R$</span>
                        <input type="number" placeholder="Valor" data-field="discount" value="${x}" step="0.01" class="discount-input w-full p-2 pl-7 border border-gray-300 rounded-md" title="Valor do desconto">
                    </div>
                </div>
            </div>

            <button type="button" class="remove-loyalty-tier absolute -top-3 -right-3 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white p-1.5 rounded-full shadow-md transition-colors" title="Remover Prémio">
                <i class="bi bi-x-lg text-sm"></i>
            </button>
        `;const b=c.querySelector(".type-select"),I=c.querySelector(".item-select"),$=c.querySelector(".desc-input"),k=c.querySelector(".discount-input"),L=S=>{I.innerHTML='<option value="">Selecione...</option>';let P=[];S==="service"?P=s:S==="product"?P=r:S==="package"&&(P=i),P.forEach(j=>{const T=j.id===m,D=j.name||j.title||"Sem nome",N=j.price||j.salePrice||0;I.innerHTML+=`<option value="${j.id}" data-price="${N}" ${T?"selected":""}>${h(D)}</option>`})};return u!=="money"&&L(u),b.addEventListener("change",S=>{const P=S.target.value;P==="money"?(I.classList.add("hidden"),$.classList.remove("hidden"),$.value="",k.value=""):(I.classList.remove("hidden"),$.classList.add("hidden"),L(P),k.value="")}),I.addEventListener("change",S=>{const P=S.target.selectedOptions[0];if(P&&P.value){$.value=P.text;const j=P.dataset.price;j&&(k.value=parseFloat(j).toFixed(2))}}),c};a.tiers&&a.tiers.length>0?a.tiers.forEach(l=>n.appendChild(d(l))):n.appendChild(d()),t.querySelector("#add-loyalty-tier").addEventListener("click",()=>{n.appendChild(d())}),n.addEventListener("click",l=>{const c=l.target.closest(".remove-loyalty-tier");c&&c.closest(".loyalty-tier-row").remove()}),t.querySelector("#loyalty-form").addEventListener("submit",l=>{l.preventDefault();const c=Array.from(t.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(m=>{const f=m.querySelector(".type-select").value,x=f==="money"?null:m.querySelector(".item-select").value;let y=f==="money"?m.querySelector(".desc-input").value:m.querySelector(".item-select").options[m.querySelector(".item-select").selectedIndex]?.text;return{points:parseInt(m.querySelector('input[data-field="points"]').value,10)||0,costPoints:parseInt(m.querySelector('input[data-field="points"]').value,10)||0,type:f,itemId:x,reward:y,name:y,discount:parseFloat(m.querySelector('input[data-field="discount"]').value)||0}}),u={loyaltyProgram:{enabled:t.querySelector("#loyaltyEnabled").checked,type:"visit",pointsPerVisit:parseInt(t.querySelector("#loyaltyPointsPerVisit").value,10)||1,pointsPerCurrency:0,tiers:c.filter(m=>m.points>0&&m.reward)}};et(u,l)})}async function jl(e,t){t.innerHTML=`
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
    `;try{const[a,o]=await Promise.all([na(Q),Ua(Q)]),s=e.financialIntegration||{},r=e.commissionConfig||{},i=e.purchaseConfig||{};t.querySelector("#financialNatureId").innerHTML=Re(a,s.defaultNaturezaId),t.querySelector("#financialCostCenterId").innerHTML=Re(o,s.defaultCentroDeCustoId),t.querySelector("#purchaseNatureId").innerHTML=Re(a,i.defaultNatureId),t.querySelector("#purchaseCostCenterId").innerHTML=Re(o,i.defaultCostCenterId),t.querySelector("#commissionNatureId").innerHTML=Re(a,r.defaultNatureId),t.querySelector("#commissionCostCenterId").innerHTML=Re(o,r.defaultCostCenterId)}catch{g("Erro","Não foi possível carregar o plano de contas da unidade.","error")}t.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const o={financialIntegration:{defaultNaturezaId:t.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:t.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:t.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:t.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:t.querySelector("#commissionNatureId").value||null,defaultCostCenterId:t.querySelector("#commissionCostCenterId").value||null}};et(o,a)})}function Fl(e,t){const a=`https://wa.me/5516997859430?text=Olá, preciso de ajuda com o sistema Kairos (Minha Unidade: ${e.name}).`;t.innerHTML=`
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
    `}function Hl(e,t){const a=`https://wa.me/5516997859430?text=Gostaria de solicitar o cancelamento da assinatura. (Unidade: ${e.name})`;t.innerHTML=`
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
    `}function Po(e="indigo",t){const a=t.querySelector("#color-palette-container"),o=t.querySelector("#establishmentThemeColor");!a||!o||(a.innerHTML="",Object.entries(Tl).forEach(([s,r])=>{const i=s===e,n=document.createElement("div");n.className="w-24 text-center cursor-pointer mb-4",n.innerHTML=`
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${i?"border-gray-800 scale-110 shadow-lg":"border-transparent"} p-1 transition-all">
                <div class="w-full h-full rounded-full" style="background-color: ${r.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${i?"text-gray-900 font-bold":"text-gray-500"}">${r.name}</p>
        `,n.addEventListener("click",()=>{o.value=s,Po(s,t)}),a.appendChild(n)}),o.value=e)}function zl(e,t){const a=t.querySelector("#slotIntervalContainer"),o=t.querySelector("#establishmentSlotInterval");if(!a||!o)return;const s=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=s.map(r=>{const i=r.value===e;return`<button type="button" data-value="${r.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors shadow-sm
                           ${i?"bg-indigo-600 text-white":"bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}">
                       ${r.label}
                   </button>`}).join(""),o.value=e,a.querySelectorAll(".interval-btn").forEach(r=>{r.addEventListener("click",()=>{o.value=r.dataset.value,a.querySelectorAll(".interval-btn").forEach(i=>{i.classList.remove("bg-indigo-600","text-white"),i.classList.add("bg-white","border","border-gray-300","text-gray-700")}),r.classList.add("bg-indigo-600","text-white"),r.classList.remove("bg-white","border","border-gray-300","text-gray-700")})})}async function Ol(e){const a=To().find(s=>s.id===e);if(!a)return;Le.innerHTML=`
        <div class="bg-white p-4 shadow-sm border-b mb-6 flex items-center justify-between sticky top-0 z-10">
            <div class="flex items-center gap-3">
                <button data-action="back-to-menu" class="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700">
                    <i class="bi bi-arrow-left"></i> Voltar
                </button>
                <h2 class="text-lg font-bold text-gray-800">${a.label}</h2>
            </div>
            <div class="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                ${h(W?.name||"")}
            </div>
        </div>
        
        <div id="settings-content-detail" class="pb-20 max-w-5xl mx-auto w-full">
            <div class="flex justify-center items-center py-10"><div class="spinner-border text-indigo-600" role="status"></div></div>
        </div>
    `,Le.querySelector('button[data-action="back-to-menu"]').addEventListener("click",s=>{s.preventDefault(),Mo({id:Q})});const o=document.getElementById("settings-content-detail");switch(e){case"personal-data":Bl(W,o);break;case"change-password":Pl(W,o);break;case"change-email":Ml(W,o);break;case"branding":Al(W,o);break;case"booking":ql(W,o);break;case"working-hours":Rl(W,o);break;case"whatsapp-bot":Bo(W,o);break;case"loyalty":await Nl(W,o);break;case"financial":await jl(W,o);break;case"support":Fl(W,o);break;case"cancellation":Hl(W,o);break;default:o.innerHTML='<div class="p-4 text-center">Módulo em construção.</div>'}}async function Mo(e={}){Le.innerHTML=`
        <div class="flex flex-col justify-center items-center h-64">
            <div class="spinner-border text-indigo-600 border-4 w-12 h-12 mb-4" role="status"></div>
            <p class="text-gray-500 font-medium">A carregar configurações da unidade...</p>
        </div>
    `;try{Q=e.id||p.establishmentId,W=await De(Q);const t=e.id?`<button onclick="window.navigateTo('establishments-section')" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                   <i class="bi bi-diagram-3"></i> Voltar à Rede
               </button>`:"",a=W.isMatriz||!W.parentId?'<span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded ml-3">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded ml-3">📍 UNIDADE</span>',o=To();Le.innerHTML=`
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
                        <h3 class="text-2xl font-bold mb-1">${h(W.name)} ${a}</h3>
                        <p class="text-indigo-200 text-sm flex items-center gap-2"><i class="bi bi-geo-alt"></i> ${h(W.address||"Morada não definida")}</p>
                    </div>
                    <div class="relative z-10 hidden sm:block">
                        <div class="w-16 h-16 bg-white rounded-xl shadow-md p-1 flex items-center justify-center">
                            ${W.logo?`<img src="${W.logo}" class="w-full h-full object-contain rounded-lg">`:`<span class="text-2xl text-indigo-600 font-bold">${W.name.charAt(0).toUpperCase()}</span>`}
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
                        ${Vl(W.modules||{})}
                    </div>
                </div>
            </div>
        `,Le.querySelectorAll("div[data-section]").forEach(s=>{s.addEventListener("click",r=>{Ol(s.dataset.section)})}),Le.querySelectorAll(".module-toggle").forEach(s=>{s.addEventListener("change",async()=>{const r=s.dataset.module;try{const n={...(await De(Q)).modules,[r]:s.checked};await ja(Q,{modules:n}),g("Módulos","Módulos atualizados com sucesso.","success")}catch(i){s.checked=!s.checked,g("Erro",i.message,"error")}})})}catch(t){Le.innerHTML=`
            <div class="p-8 text-center max-w-md mx-auto">
                <i class="bi bi-exclamation-triangle text-4xl text-red-500 mb-4 block"></i>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Erro ao carregar loja</h2>
                <p class="text-gray-600">${t.message}</p>
                <button onclick="window.navigateTo('establishments-section')" class="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700">Voltar à Rede</button>
            </div>
        `}}function Vl(e){return[{key:"agenda-section",label:"Agenda Diária",icon:"bi-calendar"},{key:"comandas-section",label:"Comandas e PDV",icon:"bi-receipt"},{key:"financial-section",label:"Financeiro Completo",icon:"bi-cash-coin"},{key:"reports-section",label:"Relatórios Gerenciais",icon:"bi-graph-up"}].map(a=>`
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
    `).join("")}const pt=document.getElementById("content");async function We(e){const t=document.getElementById("blockagesList");if(t){t.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,o=document.getElementById("filterEndDate")?.value,s=await ea(p.establishmentId,a||new Date().toISOString().split("T")[0],o||new Date().toISOString().split("T")[0],e),r=document.getElementById("filterReason")?.value.toLowerCase(),i=r?s.filter(d=>d.reason&&d.reason.toLowerCase().includes(r)):s,n=i.reduce((d,l)=>{const c=l.reason||"Sem motivo";return d[c]||(d[c]=[]),d[c].push(l),d},{});if(t.innerHTML="",i.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(n).forEach(([d,l])=>{const c=document.createElement("div");c.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let m=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${h(d)} (${l.length})</h4>`;if(l.length>1){const f=JSON.stringify(l.map(x=>x.id));m+=`<button data-action="batch-delete-blockage" data-ids='${f}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}m+="</div>",c.innerHTML=m,l.forEach(f=>{const x=new Date(f.startTime),y=new Date(f.endTime),b=x.toLocaleDateString("pt-BR"),I=y.toLocaleDateString("pt-BR"),k=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${b===I?`${b} | ${x.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${y.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${b} às ${x.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${I} às ${y.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${f.id}">Apagar</button>
                    </div>`;c.innerHTML+=k}),t.appendChild(c)})}catch(a){t.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function _l(e){e.preventDefault();const t=e.target,a=t.querySelector("#blockageProfId").value,o=t.querySelector("#blockageDate").value,s=t.querySelector("#blockageEndDate").value||o,r=t.querySelector("#blockageStartTime").value,i=t.querySelector("#blockageEndTime").value,n={establishmentId:p.establishmentId,professionalId:a,startTime:new Date(`${o}T${r}:00`).toISOString(),endTime:new Date(`${s}T${i}:00`).toISOString(),reason:t.querySelector("#blockageReason").value};try{await ta(n),t.reset(),g("Sucesso","Bloqueio adicionado com sucesso!","success"),We(a)}catch(d){g("Erro",`Não foi possível criar o bloqueio: ${d.message}`,"error")}}async function Ul(e){e.preventDefault();const t=e.target,a=Array.from(t.querySelectorAll('input[name="batch-professionals"]:checked')).map(c=>c.value);if(a.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const o=t.querySelector("#batchBlockageDate").value,s=t.querySelector("#batchBlockageEndDate").value||o,r=t.querySelector("#batchBlockageStartTime").value,i=t.querySelector("#batchBlockageEndTime").value,n=t.querySelector("#batchBlockageReason").value,d=t.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="Aguarde...";const l=a.map(c=>{const u={establishmentId:p.establishmentId,professionalId:c,startTime:new Date(`${o}T${r}:00`).toISOString(),endTime:new Date(`${s}T${i}:00`).toISOString(),reason:n};return ta(u)});try{await Promise.all(l),g("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),t.reset(),t.querySelectorAll('input[name="batch-professionals"]:checked').forEach(u=>u.checked=!1);const c=document.getElementById("blockageProfId").value;c&&We(c)}catch(c){g("Erro",`Ocorreu um erro: ${c.message}`,"error")}finally{d.disabled=!1,d.textContent="Adicionar Bloqueio em Lote"}}function Wl(e){pt.addEventListener("submit",t=>{t.target.id==="blockageForm"&&_l(t),t.target.id==="batchBlockageForm"&&Ul(t)}),pt.addEventListener("input",t=>{t.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&We(e)}),pt.addEventListener("click",async t=>{const a=t.target.closest("button[data-action]");if(!a)return;const o=a.dataset.action;if(o==="back-to-professionals")G("profissionais-section");else if(o==="delete-blockage"){if(await J("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await Ha(a.dataset.id),g("Sucesso","Bloqueio removido.","success"),We(e)}catch(r){g("Erro",`Não foi possível remover o bloqueio: ${r.message}`,"error")}}else if(o==="batch-delete-blockage"){const s=JSON.parse(a.dataset.ids);if(await J("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${s.length} bloqueios de uma vez?`))try{await so(s),g("Sucesso",`${s.length} bloqueios removidos.`,"success"),We(e)}catch(i){g("Erro",`Não foi possível apagar os bloqueios: ${i.message}`,"error")}}})}async function Jl(e){const{professionalId:t,professionalName:a}=e;if(!t||!a){pt.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const o=h(a);pt.innerHTML=`
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
        </section>`,Wl(t),await We(t);const s=document.getElementById("batchProfSelectionContainer");try{const r=await de(p.establishmentId);s.innerHTML=r.map(i=>`
            <div class="flex items-center">
                <input id="prof-batch-${i.id}" value="${i.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${i.id}" class="ml-2 text-sm text-gray-700">${h(i.name)}</label>
            </div>`).join("")}catch{s.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Gl=e=>C(`/api/users/${e}`),Ql=e=>C("/api/users",{method:"POST",body:JSON.stringify(e)}),Xl=(e,t)=>C(`/api/users/${e}`,{method:"PUT",body:JSON.stringify(t)}),Yl=e=>C(`/api/users/${e}`,{method:"DELETE"}),Zl=(e,t)=>C(`/api/users/${e}/password`,{method:"PUT",body:JSON.stringify({password:t})}),Kl=(e,t)=>C(`/api/users/${e}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),at=document.getElementById("content"),ed={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios Gerais","sales-report-section":"Relatório de Vendas (Caixa)","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores","profissionais-section":"Profissionais","ausencias-section":"Ausências e Bloqueios","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},td={view:"Visualizar",create:"Criar",edit:"Editar"};let Dt=null,Tt=null,Je=null;const ad={group_admin:"Administrador do Grupo",company_admin:"Gestor de Matriz",branch_manager:"Gestor de Filial",professional:"Profissional Padrão"};function sd(e){const t=document.getElementById("usersListContainer");if(!t)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(e.length===0){const o=a?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";t.innerHTML=`<p class="col-span-full text-center text-gray-500">${o}</p>`;return}e.sort((o,s)=>(o.status==="active"?-1:1)-(s.status==="active"?-1:1)),t.innerHTML=e.map(o=>{const s=JSON.stringify(o).replace(/'/g,"&apos;"),r=o.status==="active",i=p.professionals.find(m=>m.id===o.professionalId),n=i?i.name:"N/A",d=i?i.name.charAt(0):o.name.charAt(0),l=i?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(d)}`,c=ad[o.role]||"Profissional",u=o.role==="group_admin"?"bg-purple-100 text-purple-800":o.role==="company_admin"?"bg-blue-100 text-blue-800":o.role==="branch_manager"?"bg-orange-100 text-orange-800":"bg-gray-100 text-gray-800";return`
        <div class="user-card-clickable bg-white rounded-lg shadow-sm border overflow-hidden flex cursor-pointer ${r?"":"opacity-60"} hover:shadow-md transition" 
             data-action="edit-user" 
             data-user='${s}'>
            
            <img src="${l}" alt="Foto de Perfil" class="w-16 h-16 object-cover flex-shrink-0 pointer-events-none border-r">
            
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
    `}).join("")}function Ca(){const t=document.getElementById("showInactiveUsersToggle")?.checked?p.users:p.users.filter(a=>a.status==="active");sd(t)}function od(e={}){return Object.entries(ed).map(([t,a])=>{const o=t==="agenda-section"||t==="comandas-section",s=e[t]?.view_all_prof===!0,r=Object.entries(td).map(([n,d])=>`
             <label class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${t}" data-permission="${n}" class="sr-only" ${e[t]?.[n]?"checked":""}>
                    <div class="toggle-bg block bg-gray-300 w-8 h-4 rounded-full"></div>
                </div>
                <span class="text-[10px] text-gray-600 font-medium">${d}</span>
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
    `}).join("")}function Ss(e){if(!Je||p.userRole==="professional")return"";const t=e?.accessibleEstablishments?.map(r=>r.id)||[],a=e?.accessibleCompanies?.map(r=>r.id)||[];if((e?.role||"professional")==="group_admin")return'<div class="p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 text-sm font-bold">Acesso Total (Global) liberado.</div>';let s='<div class="space-y-3 max-h-48 overflow-y-auto custom-scrollbar p-2 bg-gray-50 rounded border">';return Je.companies.forEach(r=>{const i=a.includes(r.id),n=Je.branches.filter(d=>d.companyId===r.id);s+=`
            <div class="company-block">
                <label class="flex items-center space-x-2 cursor-pointer mb-1">
                    <input type="checkbox" class="company-checkbox rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" value="${r.id}" data-name="${r.name}" ${i?"checked":""}>
                    <span class="text-sm font-bold text-gray-800">🏢 ${r.name}</span>
                </label>
                <div class="pl-6 space-y-1 border-l-2 border-gray-200 ml-2">
                    ${n.map(d=>{const l=t.includes(d.id)||i;return`
                            <label class="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" class="branch-checkbox rounded text-indigo-500 h-3 w-3" value="${d.id}" data-name="${d.name}" data-company-id="${r.id}" ${l?"checked":""}>
                                <span class="text-xs text-gray-600">📍 ${d.name}</span>
                            </label>
                        `}).join("")}
                </div>
            </div>
        `}),s+="</div>",s}async function $s(e=null){document.getElementById("user-list-view").classList.add("hidden");const t=document.getElementById("user-form-view");t.classList.remove("hidden");let a=p.professionals;if(!a||a.length===0)try{a=await de(p.currentViewContext.id),p.professionals=a}catch{console.warn("Profissionais não carregados")}if(["group_admin","company_admin"].includes(p.userRole)&&!Je)try{const l=await fetch("/api/establishments/hierarchy",{headers:{Authorization:`Bearer ${await p.getAuthToken?.()||""}`}});l.ok&&(Je=await l.json())}catch(l){console.error("Falha ao buscar hierarquia",l),Je={companies:[],branches:[]}}const o=l=>a?.find(c=>c.id===l),s=e?.professionalId;o(s);const r=e!==null;t.querySelector("#userFormTitle").textContent=r?`Editar: ${e.name}`:"Novo Usuário";const i=t.querySelector("#userForm");i.innerHTML=`
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
                            ${Ss(e)}
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
                    ${od(e?.permissions)}
                </div>
            </div>

            <div class="flex gap-3 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-2 bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300">Cancelar</button>
                <button type="submit" class="flex-1 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">Salvar Usuário</button>
            </div>
        </div>
    `;const n=i.querySelector("#userRole"),d=i.querySelector("#hierarchySelectorContainer");if(n&&d){n.addEventListener("change",c=>{const u={...e,role:c.target.value};d.innerHTML=Ss(u),l()});const l=()=>{d.querySelectorAll(".company-checkbox").forEach(c=>{c.addEventListener("change",u=>{u.target.closest(".company-block").querySelectorAll(".branch-checkbox").forEach(x=>x.checked=u.target.checked)})})};l()}if(i.addEventListener("submit",async l=>{l.preventDefault();const c={};i.querySelectorAll("input[data-module]").forEach(b=>{const I=b.dataset.module,$=b.dataset.permission;c[I]||(c[I]={}),c[I][$]=b.checked});const u=i.querySelector("#userProfessionalId").value||null,m=i.querySelector("#userRole")?.value||"professional",f=[],x=[];if(m!=="group_admin"&&i.querySelector(".company-checkbox")&&(i.querySelectorAll(".company-checkbox:checked").forEach(b=>{f.push({id:b.value,name:b.dataset.name})}),i.querySelectorAll(".branch-checkbox:checked").forEach(b=>{x.push({id:b.value,name:b.dataset.name,companyId:b.dataset.companyId})}),x.length===0))return g("Atenção","Você deve selecionar pelo menos uma filial para este usuário.","error");const y={name:i.querySelector("#userName").value,permissions:c,professionalId:u,role:m,accessibleCompanies:f,accessibleEstablishments:x};try{if(r){const b=i.querySelector("#userEmail").value;e?.email!==b&&(y.email=b),await Xl(e.id,y),g("Usuário atualizado com sucesso!","success")}else y.email=i.querySelector("#userEmail").value,y.password=i.querySelector("#userPassword").value,await Ql(y),g("Usuário criado com sucesso!","success");Wt()}catch(b){g(`Erro: ${b.message}`,"error")}}),r){const l=i.querySelector('[data-action="show-password-form"]'),c=i.querySelector("#password-form");l&&c&&(l.addEventListener("click",()=>{l.classList.add("hidden"),c.classList.remove("hidden")}),c.querySelector('[data-action="cancel-password-change"]').addEventListener("click",()=>{l.classList.remove("hidden"),c.classList.add("hidden"),c.querySelector("#userNewPassword").value=""}),c.querySelector('[data-action="save-password"]').addEventListener("click",async u=>{const m=u.target,f=c.querySelector("#userNewPassword").value;if(!f||f.length<6)return g("Aviso","Senha deve ter no mínimo 6 caracteres.","error");if(await J("Alterar Senha","Tem certeza?"))try{m.disabled=!0,m.textContent="...",await Zl(e.id,f),g("Sucesso","Senha alterada.","success"),l.classList.remove("hidden"),c.classList.add("hidden")}catch(x){g("Erro",x.message,"error")}finally{m.disabled=!1,m.textContent="Salvar Senha"}}))}}async function rd(){const e=document.getElementById("usersListContainer");e.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[t,a]=await Promise.all([Gl(p.currentViewContext.id),de(p.currentViewContext.id)]);p.users=t,p.professionals=a,Ca()}catch{g("Erro ao carregar usuários.","error"),e.innerHTML='<p class="col-span-full text-center text-red-500">Falha ao carregar.</p>'}}async function Wt(){at.innerHTML=`
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
    `,Dt&&at.removeEventListener("click",Dt),Tt&&at.removeEventListener("change",Tt),Dt=async e=>{const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"new-user":$s();break;case"edit-user":const o=JSON.parse(t.dataset.user.replace(/&apos;/g,"'"));$s(o);break;case"back-to-list":Wt();break;case"delete-user":{if(e.stopPropagation(),await J("Excluir Usuário","Tem certeza? Ação irreversível."))try{await Yl(t.dataset.userId),g("Usuário excluído!","success"),Wt()}catch(s){g(`Erro: ${s.message}`,"error")}break}}},Tt=async e=>{const t=e.target.closest('input[data-action="toggle-user-status"]');if(e.target.id==="showInactiveUsersToggle")Ca();else if(t){e.stopPropagation();const a=t.dataset.userId,o=t.checked?"active":"inactive";try{await Kl(a,o);const s=p.users.findIndex(r=>r.id===a);s>-1&&(p.users[s].status=o,Ca())}catch(s){g(`Erro: ${s.message}`,"error"),t.checked=!t.checked}}},at.addEventListener("click",Dt),at.addEventListener("change",Tt),await rd()}const id=document.getElementById("content");let Es={},Da=null;function nd(){Object.values(Es).forEach(e=>e?.destroy()),Es={}}function ld(e,t){if(!window.jspdf){g("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:a}=window.jspdf,o=new a({orientation:"landscape",unit:"px",format:"a4"}),s=document.getElementById("salesReportSummaryCards");if(o.setFontSize(18),o.text(e,o.internal.pageSize.getWidth()/2,40,{align:"center"}),s){const i=[["Receita Total",s.querySelector("#summary-revenue").textContent],["Vendas Totais",s.querySelector("#summary-transactions").textContent],["Ticket Médio",s.querySelector("#summary-avg-ticket").textContent]];o.autoTable({startY:60,head:[["Métrica","Valor"]],body:i,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const r=o.lastAutoTable?o.lastAutoTable.finalY+20:60;o.text("Detalhes das Vendas",20,r),o.autoTable({html:`#${t}`,startY:r+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),o.save(`${e.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function Is(e){const t=document.getElementById("genericModal"),a=h(e.client),o=h(e.items),s=h(e.responsavelCaixa||"N/A"),r=(e.payments||[]).map(i=>`
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
    `,t.style.display="flex"}function dd(e){const{summary:t,transactions:a}=e;document.getElementById("summary-revenue").textContent=`R$ ${t.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=t.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${t.averageTicket.toFixed(2)}`;const o=document.getElementById("paymentSummaryTableBody"),s=Object.entries(t.paymentMethodTotals).sort(([,n],[,d])=>d-n);o.innerHTML=s.map(([n,d])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${h(n.charAt(0).toUpperCase()+n.slice(1))}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${d.toFixed(2)}</td>
        </tr>
    `).join("");const r=document.getElementById("transactionsTableBody"),i=document.getElementById("mobileTransactionsList");if(a.length===0){const n='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';r.innerHTML=n,i.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}r.innerHTML=a.map((n,d)=>{const l=h(n.client),c=h(n.items),u=h(n.type);return`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${d}">
            <td class="w-24 py-3 px-4">${new Date(n.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${l}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${c}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${u}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${n.total.toFixed(2)}</td>
        </tr>
    `}).join(""),r.querySelectorAll("tr").forEach(n=>{n.addEventListener("dblclick",()=>{const d=n.dataset.transactionIndex,l=Da.transactions[d];l&&Is(l)})}),i.innerHTML=a.map((n,d)=>{const l=h(n.client),c=h(n.items),u=h(n.type);return`
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
    `}).join(""),i.querySelectorAll("div[data-transaction-index]").forEach(n=>{n.addEventListener("click",()=>{const d=n.dataset.transactionIndex,l=Da.transactions[d];l&&Is(l)})})}async function Ls(){const e=document.getElementById("main-reports-view"),t=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!e||!t||!a)return;const o=t.value,s=a.value;if(!o||!s)return g("Atenção","Por favor, selecione as datas de início e fim.","error");e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const r=document.getElementById("cashierSessionFilter").value,i=await Ur({establishmentId:p.establishmentId,startDate:o,endDate:s,cashierSessionId:r});Da=i,e.innerHTML=`
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
        `,dd(i)}catch(r){g("Erro",`Não foi possível carregar o relatório: ${r.message}`,"error"),e.innerHTML=`<p class="p-8 text-center text-red-500">${h(r.message)}</p>`}}async function cd(){nd();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];id.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",Ls),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const o=document.getElementById("reportStartDate").value,s=document.getElementById("reportEndDate").value,r=`Relatorio_Vendas_${o}_a_${s}`;ld(r,"transactionsTable")});try{const o=await Ai(p.establishmentId),s=document.getElementById("cashierSessionFilter");o&&o.length>0&&o.forEach(r=>{const i=new Date(r.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),n=h(r.closedByName||"N/A");s.innerHTML+=`<option value="${r.id}">${n} - ${i}</option>`})}catch{g("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await Ls()}const ud=document.getElementById("content");let w={payables:[],receivables:[],natures:[],costCenters:[],establishments:[],currentTab:"receivables",statusFilter:"all",startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date(new Date().getFullYear(),new Date().getMonth()+1,0).toISOString().split("T")[0],filterNaturezaId:"all",filterCostCenterId:"all",filterEstablishmentIds:new Set,searchQuery:"",isAdvancedFilterOpen:!1,selectedIds:new Set,isSelectionMode:!1,sortCol:"dueDate",sortAsc:!0},Bt=null,Pt=null;function Za(e){const t=new Map,a=[];return e&&(e.forEach(o=>t.set(o.id,{...o,children:[]})),t.forEach(o=>{o.parentId&&t.has(o.parentId)?t.get(o.parentId).children.push(o):a.push(o)})),a}function Ao(e){if(!e)return{day:"--",month:"---",full:"--/--/----"};const[t,a,o]=e.split("-"),s=new Date(t,a-1,o),r=String(s.getDate()).padStart(2,"0"),i=s.toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return{day:r,month:i,full:s.toLocaleDateString("pt-BR")}}function pe(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function Ye(e,t){if(t==="paid")return!1;const a=new Date;a.setHours(0,0,0,0);const[o,s,r]=e.split("-");return new Date(o,s-1,r)<a}function pd(e,t,a){if(!e)return;if(!t||t.length===0){e.innerHTML=`
            <div class="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <i class="bi bi-inbox text-2xl text-gray-300"></i>
                <p class="text-gray-500 text-sm mt-2 font-medium">Nenhum item criado.</p>
            </div>`;return}const o=(s,r=0)=>{const i=r*16,n=r===0,d=n?"bi-folder-fill text-indigo-500":"bi-file-earmark-text text-gray-400",l=n?"bg-white shadow-sm border border-gray-200":"bg-gray-50 border border-gray-100/50",c=n?"text-sm font-bold text-gray-800":"text-xs font-semibold text-gray-600",u=r>0?'<div class="absolute left-0 top-1/2 w-3 border-t-2 border-gray-200" style="margin-left: -12px;"></div>':"",m=r>0?"border-left: 2px solid #e5e7eb;":"";return`
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
            ${s.children.map(f=>o(f,r+1)).join("")}
        `};e.innerHTML=t.map(s=>o(s)).join("")}async function Ta(e){const t=document.getElementById("genericModal"),a=e==="nature",o=a?"Plano de Naturezas":"Centros de Custo",s=a?na:Ua,r=a?an:on,i=a?"natures":"costCenters";t.innerHTML=`
        <div class="modal-content max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">
            <div class="bg-gray-50 px-5 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 class="text-base font-bold text-gray-800 flex items-center gap-2">
                    <i class="bi ${a?"bi-tags-fill text-indigo-500":"bi-diagram-3-fill text-blue-500"}"></i> ${o}
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
        </div>`,t.style.display="flex";const n=t.querySelector("#hierarchyList"),d=t.querySelector("#itemParent"),l=u=>{const m=Za(u);pd(n,m,e);const f=d.value;d.innerHTML='<option value="">-- Nível Principal --</option>';const x=(y,b=0)=>{const I="  ".repeat(b)+(b>0?"↳ ":"");d.innerHTML+=`<option value="${y.id}">${I}${y.name}</option>`,y.children.forEach($=>x($,b+1))};m.forEach(y=>x(y)),d.value=f};try{const u=await s(p.establishmentId);w[i]=u,l(u)}catch(u){console.error(u)}const c=t.querySelector("#hierarchyForm");c.addEventListener("submit",async u=>{u.preventDefault();const m=t.querySelector("#itemName").value,f=d.value;try{await r({name:m,parentId:f||null,establishmentId:p.establishmentId});const x=await s(p.establishmentId);w[i]=x,l(x),c.reset(),await Te(),g("Sucesso","Item adicionado à estrutura.","success")}catch(x){g("Erro",x.message,"error")}})}async function md(){try{const t=(await ke()).matrizes||[];w.establishments=[],t.forEach(a=>{w.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(o=>w.establishments.push({id:o.id,name:o.name,type:"Filial"}))}),w.filterEstablishmentIds.size===0&&w.filterEstablishmentIds.add(p.establishmentId)}catch(e){console.warn("Erro ao buscar lojas",e)}qo(),Ro(),await Te()}function qo(){const e=w.establishments.map(t=>`
        <label class="inline-flex items-center gap-2 px-3 py-1.5 bg-white border ${w.filterEstablishmentIds.has(t.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-gray-200 text-gray-600"} rounded-lg cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" value="${t.id}" ${w.filterEstablishmentIds.has(t.id)?"checked":""}>
            <span class="text-xs font-bold whitespace-nowrap">${t.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${t.name}</span>
        </label>
    `).join("");ud.innerHTML=`
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
    `,document.querySelector('.date-preset-btn[data-preset="month"]').classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),document.querySelector('.date-preset-btn[data-preset="month"]').classList.remove("bg-white","text-gray-600","border-gray-200"),No()}function gd(){const e=w.currentTab==="receivables",t=e?w.receivables:w.payables;let a=t;if(w.statusFilter!=="all"&&(a=t.filter(n=>{const d=Ye(n.dueDate,n.status);return w.statusFilter==="overdue"?d:w.statusFilter==="pending"?n.status==="pending"&&!d:n.status===w.statusFilter})),w.searchQuery&&(a=a.filter(n=>n.description&&n.description.toLowerCase().includes(w.searchQuery)||n.entity&&n.entity.toLowerCase().includes(w.searchQuery)||n.notes&&n.notes.toLowerCase().includes(w.searchQuery))),a.sort((n,d)=>new Date(n.dueDate)-new Date(d.dueDate)),a.length===0){g("Aviso","Não há dados para exportar com os filtros atuais.","info");return}const o=new Map(w.natures.map(n=>[n.id,n.name])),s=new Map(w.costCenters.map(n=>[n.id,n.name])),r=new Map(w.establishments.map(n=>[n.id,n])),i=a.map(n=>{const d=n.status==="paid",l=Ye(n.dueDate,n.status);let c=d?"Baixado":l?"Atrasado":"A Vencer / Pendente";const u=n.naturezaId?o.get(n.naturezaId)||"Não Categorizado":"Geral",m=n.centroDeCustoId?s.get(n.centroDeCustoId)||"Não Categorizado":"Geral",f=r.get(n.establishmentId),x=f?f.name:"Atual",y=n.saleId||n.appointmentId||n.origin==="comanda"?"Comanda / PDV":"Manual";return{"Data de Vencimento":new Date(n.dueDate).toLocaleDateString("pt-BR"),"Data de Pagamento":n.paymentDate?new Date(n.paymentDate).toLocaleDateString("pt-BR"):"-",Descrição:n.description||"","Favorecido / Pagador":n.entity||"",Unidade:x,Natureza:u,"Centro de Custo":m,Origem:y,"Documento / NFS":n.documentNumber||"",Status:c,"Valor (R$)":n.amount}});try{if(typeof XLSX>"u"){g("Erro","A biblioteca de exportação (XLSX) não foi carregada no sistema.","error");return}const n=XLSX.utils.json_to_sheet(i),d=XLSX.utils.book_new();XLSX.utils.book_append_sheet(d,n,"Financeiro");const c=`Fluxo_${e?"Receitas":"Despesas"}_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(d,c)}catch(n){console.error("Erro ao exportar:",n),g("Erro","Não foi possível exportar para Excel.","error")}}function Ro(){const e=document.getElementById("select-all-toggle");e&&e.addEventListener("change",s=>{const r=s.target.checked,i=document.querySelectorAll(".item-checkbox");w.selectedIds.clear(),i.forEach(n=>{n.checked=r,r&&w.selectedIds.add(n.dataset.id)}),ze()}),document.getElementById("cancel-selection-btn").addEventListener("click",()=>{w.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(s=>s.checked=!1),ze()}),document.getElementById("batch-delete-btn").addEventListener("click",async()=>{const s=w.selectedIds.size;if(s===0)return;if(await J("Excluir Lançamentos",`Deseja realmente apagar ${s} registros financeiros?`))try{const i=w.currentTab==="payables"?"payables":"receivables";await bo(i,Array.from(w.selectedIds)),g("Sucesso",`${s} itens excluídos.`,"success"),w.selectedIds.clear(),ze(),Te()}catch{g("Erro","Falha ao excluir itens.","error")}}),document.querySelectorAll(".est-filter-checkbox").forEach(s=>{s.addEventListener("change",r=>{const i=r.target.closest("label");r.target.checked?(w.filterEstablishmentIds.add(r.target.value),i.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.remove("border-gray-200","text-gray-600")):(w.filterEstablishmentIds.delete(r.target.value),i.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.add("border-gray-200","text-gray-600"))})}),document.querySelectorAll(".sort-header").forEach(s=>{s.addEventListener("click",r=>{const i=r.currentTarget.dataset.sort;w.sortCol===i?w.sortAsc=!w.sortAsc:(w.sortCol=i,w.sortAsc=!0),mt()})}),document.getElementById("toggle-filter-btn").addEventListener("click",()=>{const s=document.getElementById("filter-panel"),r=document.getElementById("toggle-filter-btn");w.isAdvancedFilterOpen=!w.isAdvancedFilterOpen,w.isAdvancedFilterOpen?(s.classList.remove("hidden"),r.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.classList.remove("bg-white","text-gray-600","border-gray-200")):(s.classList.add("hidden"),r.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),r.classList.add("bg-white","text-gray-600","border-gray-200"))}),document.getElementById("settings-btn").addEventListener("click",yd);const t=document.getElementById("export-excel-btn");t&&t.addEventListener("click",gd),document.querySelectorAll('[data-action="new-financial"]').forEach(s=>{s.addEventListener("click",r=>{ba(r.target.closest("button").dataset.type)})}),document.getElementById("fab-add").addEventListener("click",()=>{const s=w.currentTab==="payables"?"payable":"receivable";ba(s)});const a=document.getElementById("tab-receivables"),o=document.getElementById("tab-payables");a.addEventListener("click",()=>Cs("receivables")),o.addEventListener("click",()=>Cs("payables")),document.querySelectorAll(".status-filter-btn").forEach(s=>{s.addEventListener("click",r=>{document.querySelectorAll(".status-filter-btn").forEach(i=>{i.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200","bg-red-50","text-red-700","border-red-200"),i.classList.add("bg-white","text-gray-600")}),r.target.dataset.status==="overdue"?r.target.classList.add("bg-red-50","text-red-700","border-red-200"):r.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.target.classList.remove("bg-white","text-gray-600"),w.statusFilter=r.target.dataset.status,mt(),jo()})}),document.querySelectorAll(".date-preset-btn").forEach(s=>{s.addEventListener("click",r=>{document.querySelectorAll(".date-preset-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),r.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.target.classList.remove("bg-white","text-gray-600","border-gray-200");const i=r.target.dataset.preset,n=new Date;let d,l;i==="month"?(d=new Date(n.getFullYear(),n.getMonth(),1),l=new Date(n.getFullYear(),n.getMonth()+1,0)):i==="last_month"?(d=new Date(n.getFullYear(),n.getMonth()-1,1),l=new Date(n.getFullYear(),n.getMonth(),0)):i==="year"&&(d=new Date(n.getFullYear(),0,1),l=new Date(n.getFullYear(),11,31)),document.getElementById("filterStartDate").value=d.toISOString().split("T")[0],document.getElementById("filterEndDate").value=l.toISOString().split("T")[0],document.getElementById("apply-filter-btn").click()})}),document.getElementById("searchInput").addEventListener("input",s=>{w.searchQuery=s.target.value.toLowerCase(),mt()}),document.getElementById("clear-filters-btn").addEventListener("click",()=>{const s=new Date;document.getElementById("filterStartDate").value=new Date(s.getFullYear(),s.getMonth(),1).toISOString().split("T")[0],document.getElementById("filterEndDate").value=new Date(s.getFullYear(),s.getMonth()+1,0).toISOString().split("T")[0],document.getElementById("filterNaturezaId").value="all",document.getElementById("filterCostCenterId").value="all",w.filterEstablishmentIds.clear(),w.filterEstablishmentIds.add(p.establishmentId),qo(),Ro()}),document.getElementById("apply-filter-btn").addEventListener("click",()=>{w.startDate=document.getElementById("filterStartDate").value,w.endDate=document.getElementById("filterEndDate").value,w.filterNaturezaId=document.getElementById("filterNaturezaId").value,w.filterCostCenterId=document.getElementById("filterCostCenterId").value,w.filterEstablishmentIds.size===0&&w.filterEstablishmentIds.add(p.establishmentId),document.getElementById("toggle-filter-btn").click(),Te()}),Bt&&document.body.removeEventListener("click",Bt),Bt=s=>{const r=s.target;if(r.classList.contains("item-checkbox")||r.classList.contains("modal-item-checkbox")){const d=r.value||r.dataset.id;r.checked?w.selectedIds.add(d):w.selectedIds.delete(d),ze(),s.stopPropagation();return}const i=r.closest("button[data-action]");if(i){const{action:d,type:l,id:c}=i.dataset;if(s.stopPropagation(),d==="delete"){const u=i.closest(".financial-row").dataset.item.replace(/&apos;/g,"'");xd(l,JSON.parse(u));return}if(d==="mark-as-paid"){fd(l,c);return}if(d==="manage-natures"){Ta("nature");return}if(d==="manage-cost-centers"){Ta("cost-center");return}}const n=r.closest(".financial-row");if(n&&document.getElementById("list-container").contains(n)&&!r.closest("button")&&!r.closest(".item-checkbox")){const{type:d}=n.dataset,l=JSON.parse(n.dataset.item.replace(/&apos;/g,"'"));ba(d,l)}},document.body.addEventListener("click",Bt),Pt&&document.getElementById("genericModal").removeEventListener("click",Pt),Pt=s=>{if(s.target.closest('[data-action="close-modal"]')){document.getElementById("genericModal").style.display="none";return}const i=s.target.closest('button[data-action^="delete-"]');if(i){const n=i.dataset.action.split("-")[1];vd(n,i.dataset.id)}},document.getElementById("genericModal").addEventListener("click",Pt)}function ze(){const e=document.getElementById("batch-action-bar"),t=document.getElementById("selected-count"),a=document.getElementById("fab-add"),o=w.selectedIds.size;t.textContent=o,o>0?(e.classList.remove("hidden"),e.classList.add("flex"),a&&a.classList.add("hidden")):(e.classList.add("hidden"),e.classList.remove("flex"),a&&a.classList.remove("hidden"))}function Cs(e){w.currentTab=e,w.selectedIds.clear(),ze(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1);const t=document.getElementById("tab-receivables"),a=document.getElementById("tab-payables"),o=document.getElementById("fab-add");e==="receivables"?(t.classList.add("bg-white","text-emerald-700","shadow"),t.classList.remove("text-gray-600"),a.classList.remove("bg-white","text-red-700","shadow"),a.classList.add("text-gray-600"),o&&(o.className="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40")):(a.classList.add("bg-white","text-red-700","shadow"),a.classList.remove("text-gray-600"),t.classList.remove("bg-white","text-emerald-700","shadow"),t.classList.add("text-gray-600"),o&&(o.className="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40")),mt()}async function Te(){const e=document.getElementById("list-container");e.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-xs">A processar transações...</p></div>';try{if(w.natures.length===0){const[r,i]=await Promise.all([na(p.establishmentId),Ua(p.establishmentId)]);w.natures=r,w.costCenters=i,No()}const t=Array.from(w.filterEstablishmentIds).join(","),a={startDate:w.startDate,endDate:w.endDate,establishmentId:t};w.filterNaturezaId!=="all"&&(a.natureId=w.filterNaturezaId),w.filterCostCenterId!=="all"&&(a.costCenterId=w.filterCostCenterId);const[o,s]=await Promise.all([xo(a),ho(a)]);w.payables=o.entries||[],w.receivables=s.entries||[],jo(),mt()}catch(t){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-xs font-medium">Erro ao carregar dados: ${t.message}</p>
            </div>`}}function No(){const e=o=>{let s='<option value="all">-- Todas as opções --</option>';const r=Za(o),i=(n,d=0)=>{const l="  ".repeat(d)+(d>0?"↳ ":"");s+=`<option value="${n.id}">${l}${n.name}</option>`,n.children.forEach(c=>i(c,d+1))};return r.forEach(n=>i(n)),s},t=document.getElementById("filterNaturezaId"),a=document.getElementById("filterCostCenterId");t&&(t.innerHTML=e(w.natures)),a&&(a.innerHTML=e(w.costCenters))}function jo(){const e=document.getElementById("summary-section");if(!e)return;const t=w.currentTab==="receivables";let o=t?w.receivables:w.payables;w.searchQuery&&(o=o.filter(c=>c.description&&c.description.toLowerCase().includes(w.searchQuery)||c.entity&&c.entity.toLowerCase().includes(w.searchQuery)||c.notes&&c.notes.toLowerCase().includes(w.searchQuery)));const s=o.reduce((c,u)=>c+u.amount,0),r=o.filter(c=>c.status==="paid").reduce((c,u)=>c+u.amount,0),i=o.filter(c=>c.status==="pending"&&!Ye(c.dueDate,c.status)).reduce((c,u)=>c+u.amount,0),n=o.filter(c=>Ye(c.dueDate,c.status)).reduce((c,u)=>c+u.amount,0),d=t?"emerald":"red",l=t?"Receitas":"Despesas";e.innerHTML=`
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total do Período</span>
            <span class="text-xl font-black text-gray-800 mt-0.5">${pe(s)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">A Vencer / Prov.</span>
            <span class="text-xl font-bold text-blue-600 mt-0.5">${pe(i)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${l} Baixadas</span>
            <span class="text-xl font-bold text-${d}-600 mt-0.5">${pe(r)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Atrasadas</span>
            <span class="text-xl font-bold ${n>0?"text-red-600":"text-gray-400"} mt-0.5">${pe(n)}</span>
        </div>
    `}function bd(){document.querySelectorAll(".sort-header").forEach(e=>{const t=e.querySelector("i");if(!t)return;e.dataset.sort===w.sortCol?(e.classList.add("text-indigo-700"),e.classList.remove("text-gray-500"),t.className=w.sortAsc?"bi bi-arrow-up ml-1 text-indigo-600":"bi bi-arrow-down ml-1 text-indigo-600"):(e.classList.remove("text-indigo-700"),e.classList.add("text-gray-500"),t.className="bi bi-arrow-down-up ml-1 opacity-30 text-[10px]")})}function mt(){const e=document.getElementById("list-container");if(!e)return;const t=w.currentTab==="receivables",a=t?w.receivables:w.payables;let o=a;if(w.statusFilter!=="all"&&(o=a.filter(l=>{const c=Ye(l.dueDate,l.status);return w.statusFilter==="overdue"?c:w.statusFilter==="pending"?l.status==="pending"&&!c:l.status===w.statusFilter})),w.searchQuery&&(o=o.filter(l=>l.description&&l.description.toLowerCase().includes(w.searchQuery)||l.entity&&l.entity.toLowerCase().includes(w.searchQuery)||l.notes&&l.notes.toLowerCase().includes(w.searchQuery))),o.sort((l,c)=>{let u=l[w.sortCol],m=c[w.sortCol];return w.sortCol==="dueDate"?(u=new Date(u).getTime(),m=new Date(m).getTime()):(w.sortCol==="description"||w.sortCol==="status")&&(u=u?u.toLowerCase():"",m=m?m.toLowerCase():""),u<m?w.sortAsc?-1:1:u>m?w.sortAsc?1:-1:0}),bd(),o.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-inbox text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum registo encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente limpar os filtros ou faça um novo lançamento.</p>
            </div>
        `;return}const s=new Map(w.natures.map(l=>[l.id,l.name])),r=new Map(w.costCenters.map(l=>[l.id,l.name])),i=new Map(w.establishments.map(l=>[l.id,l])),n=t?"receivable":"payable",d=t?"text-emerald-600":"text-red-600";e.innerHTML=o.map(l=>{const c=Ao(l.dueDate),u=l.status==="paid",m=Ye(l.dueDate,l.status);let f="";u?f='<span class="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-check2-circle mr-0.5"></i> Baixado</span>':m?f='<span class="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-exclamation-circle mr-0.5"></i> Atrasado</span>':f='<span class="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-clock-history mr-0.5"></i> A Vencer</span>';const x=l.naturezaId?s.get(l.naturezaId)||"Sem Natureza":"Não Categorizado",y=l.centroDeCustoId?r.get(l.centroDeCustoId)||"Sem Centro":"Geral",I=l.saleId||l.appointmentId||l.origin==="comanda"?'<span class="text-[8px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100"><i class="bi bi-receipt mr-1"></i>Comanda</span>':'<span class="text-[8px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200"><i class="bi bi-keyboard mr-1"></i>Manual</span>',$=l.documentNumber?`<span class="text-[8px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded ml-2" title="NFS / Documento">NFS: ${l.documentNumber}</span>`:"",k=i.get(l.establishmentId);let L="";if(k){const N=k.type==="Matriz"?"bi-building":"bi-shop";L=`<span class="text-[8px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-bold border border-slate-200 flex items-center whitespace-nowrap w-max" title="Unidade: ${k.name}"><i class="bi ${N} mr-1 opacity-60"></i> ${k.name}</span>`}else L='<span class="text-[8px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-bold border border-gray-200 flex items-center whitespace-nowrap w-max"><i class="bi bi-geo-alt mr-1 opacity-60"></i> Atual</span>';const S=JSON.stringify(l).replace(/'/g,"&apos;"),P=w.selectedIds.has(l.id),T=!!l.recurrenceId?'<i class="bi bi-arrow-repeat text-indigo-400 ml-1 text-[10px]" title="Lançamento Recorrente"></i>':"",D=l.entity?`<span class="text-[9px] text-gray-400 font-medium truncate block mt-0.5"><i class="bi bi-person mr-1 opacity-40"></i>${l.entity}</span>`:"";return`
        <div class="financial-row border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-1.5 md:p-2 mb-1 ${P?"bg-indigo-50/40":""}"
             data-type="${n}"
             data-item='${S}'>
            
            <div class="absolute left-0 top-0 bottom-0 w-1 ${u?"bg-gray-200":t?"bg-emerald-400":"bg-red-400"}"></div>

            <div class="absolute right-2 top-2 md:relative md:right-auto md:top-auto md:col-span-1 md:flex md:justify-center z-10">
                <input type="checkbox" value="${l.id}" class="item-checkbox w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${P?"checked":""}>
            </div>

            <div class="flex items-center gap-2 md:col-span-1 pl-2 md:pl-0">
                <div class="flex flex-col items-center justify-center bg-white border border-gray-200 rounded w-9 h-9 flex-shrink-0 shadow-sm">
                    <span class="text-xs font-black text-gray-800 leading-none">${c.day}</span>
                    <span class="text-[7px] font-bold text-gray-400 uppercase leading-none mt-0.5">${c.month}</span>
                </div>
                <div class="md:hidden flex-1 pr-6">
                    <div class="flex items-center">
                        <p class="font-bold text-xs text-gray-800 leading-tight ${u?"line-through text-gray-400":""}">${l.description}</p>
                        ${$}
                    </div>
                    ${D}
                </div>
            </div>

            <div class="md:col-span-3 hidden md:flex flex-col justify-center min-w-0">
                <div class="flex items-center">
                    <p class="font-bold text-xs text-gray-800 truncate ${u?"line-through text-gray-400":""}" title="${l.description}">${l.description}</p>
                    ${$}
                </div>
                ${D}
                <div class="flex items-center gap-1.5 mt-0.5">
                    ${L}
                    ${T}
                </div>
            </div>

            <div class="md:col-span-2 hidden md:flex flex-col justify-center min-w-0">
                <p class="text-[9px] text-gray-600 font-bold truncate" title="Natureza: ${x}"><i class="bi bi-tag opacity-50 mr-1"></i> ${x}</p>
                <p class="text-[9px] text-gray-400 truncate mt-0.5" title="Centro: ${y}"><i class="bi bi-diagram-3 opacity-50 mr-1"></i> ${y}</p>
            </div>

            <div class="md:col-span-1 hidden md:flex items-center">
                ${I}
            </div>

            <div class="md:hidden flex flex-wrap items-center gap-1.5 mt-1 ml-11">
                ${L}
                <span class="text-[8px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 font-bold border border-gray-200 flex items-center">
                    <i class="bi bi-tag mr-1 opacity-50"></i> ${x}
                </span>
                ${I}
            </div>

            <div class="md:col-span-1 md:text-center flex justify-start md:justify-center mt-1.5 md:mt-0 ml-11 md:ml-0">
                ${f}
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:justify-end mt-1.5 md:mt-0 ml-11 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-gray-400 uppercase tracking-wide">Valor:</span>
                <p class="font-black text-sm ${u?"text-gray-400":d}">${pe(l.amount)}</p>
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
        `}).join("")}async function fd(e,t){const a=new Date().toISOString().split("T")[0];try{await(e==="payable"?cn(t,a):gn(t,a)),g("Baixa Realizada","O lançamento foi registado como pago.","success"),await Te()}catch(o){g("Erro",o.message,"error")}}async function xd(e,t){if(!!!t.recurrenceId){await J("Excluir Lançamento","Tem certeza? Essa ação apagará o registo do seu fluxo de caixa.")&&await Fo(e,[t.id]);return}hd(e,t)}function hd(e,t){const a=document.getElementById("genericModal"),s=(e==="payable"?w.payables:w.receivables).filter(l=>l.recurrenceId===t.recurrenceId).sort((l,c)=>new Date(l.dueDate)-new Date(c.dueDate));a.innerHTML=`
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
                ${s.map(l=>{const c=l.id===t.id,u=l.status==="paid",m=Ao(l.dueDate);return`
                    <label class="flex items-center gap-4 p-3 bg-white rounded-xl border ${c?"border-red-400 ring-1 ring-red-100 shadow-sm bg-red-50/30":"border-gray-200 hover:bg-gray-50"} cursor-pointer transition-all">
                        <input type="checkbox" class="modal-item-checkbox w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" value="${l.id}" ${c?"checked":""}>
                        
                        <div class="flex-shrink-0 w-11 h-11 bg-white rounded-lg flex flex-col items-center justify-center border border-gray-200 shadow-sm">
                            <span class="text-sm font-black text-gray-800 leading-none">${m.day}</span>
                            <span class="text-[8px] font-bold text-gray-500 uppercase leading-none mt-1">${m.month}</span>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-bold text-gray-800 truncate">${l.description}</p>
                            <p class="text-xs font-medium text-gray-500 mt-0.5">${pe(l.amount)} ${u?'<span class="text-emerald-600 font-bold ml-1">(Baixado)</span>':""}</p>
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
    `,a.style.display="flex";const r=a.querySelector("#modal-select-all"),i=a.querySelectorAll(".modal-item-checkbox"),n=a.querySelector("#confirm-batch-delete");r.addEventListener("change",l=>{i.forEach(c=>c.checked=l.target.checked),d()}),i.forEach(l=>l.addEventListener("change",d));function d(){const l=Array.from(i).filter(c=>c.checked).length;n.innerHTML=l>0?`<i class="bi bi-trash3"></i> Excluir ${l} Parcela(s)`:"Selecione para excluir",n.disabled=l===0,l===0?n.classList.add("opacity-50","cursor-not-allowed","bg-gray-400"):n.classList.remove("opacity-50","cursor-not-allowed","bg-gray-400")}n.addEventListener("click",async()=>{const l=Array.from(i).filter(u=>u.checked).map(u=>u.value);if(l.length===0)return;a.style.display="none",await J("Confirmar Ação",`Tem certeza que deseja apagar estas ${l.length} parcelas permanentemente?`)&&await Fo(e,l)}),d()}async function Fo(e,t){try{t.length===1?e==="payable"?await dn(t[0]):await mn(t[0]):await bo(e==="payable"?"payables":"receivables",t),g("Sucesso",`${t.length} registo(s) limpo(s) do sistema.`,"success"),w.selectedIds.clear(),ze(),await Te()}catch(a){g("Erro",a.message,"error")}}async function vd(e,t){const o=e==="nature"?sn:rn;if(await J("Apagar Categoria","Tem certeza? Apagar um item pai também apagará as suas subcategorias."))try{await o(t),Ta(e==="nature"?"nature":"cost-center")}catch(r){g("Erro",r.message,"error")}}function yd(){const e=document.getElementById("genericModal");e.innerHTML=`
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
    `,e.style.display="flex"}function ba(e,t=null){const a=document.getElementById("genericModal"),o=e==="payable",s=o?"red":"emerald",r=t?"Editar Lançamento":"Novo Lançamento",i=w.establishments.map(S=>{const P=t?t.establishmentId===S.id:S.id===p.establishmentId;return`<option value="${S.id}" ${P?"selected":""}>${S.type==="Matriz"?"🏢":"📍"} ${S.name}</option>`}).join(""),n=(S,P)=>{let j='<option value="">-- Selecione --</option>';const T=Za(S),D=(N,F=0)=>{const O="  ".repeat(F)+(F>0?"↳ ":""),H=N.id===P?"selected":"";j+=`<option value="${N.id}" ${H}>${O}${N.name}</option>`,N.children.forEach(B=>D(B,F+1))};return T.forEach(N=>D(N)),j},l=[{value:"dinheiro",label:"Dinheiro"},{value:"pix",label:"PIX"},{value:"cartao_credito",label:"Cartão de Crédito"},{value:"cartao_debito",label:"Cartão de Débito"},{value:"transferencia",label:"Transferência Bancária"},{value:"boleto",label:"Boleto"},{value:"outros",label:"Outros"}].map(S=>`<option value="${S.value}" ${t?.paymentMethod===S.value?"selected":""}>${S.label}</option>`).join("");a.innerHTML=`
        <div class="modal-content max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden m-4 flex flex-col max-h-[90vh]">
            
            <div class="bg-${s}-600 px-5 py-4 flex justify-between items-center flex-shrink-0 relative overflow-hidden">
                <div class="absolute right-0 top-0 opacity-10 pointer-events-none">
                    <svg width="120" height="120" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="white" stroke-width="20"/></svg>
                </div>
                
                <div class="flex items-center gap-3 relative z-10">
                    <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white backdrop-blur-sm border border-white/30 shadow-inner">
                        <i class="bi ${o?"bi-arrow-down-right":"bi-arrow-up-right"} text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-lg font-bold text-white tracking-wide">${r}</h2>
                        <p class="text-[10px] text-${s}-100 font-medium uppercase tracking-widest mt-0.5">${o?"Despesa":"Receita"}</p>
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
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">${o?"Fornecedor / Favorecido":"Cliente / Pagador"}</label>
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
                                <span class="block text-xs font-bold text-gray-800 group-hover:text-${s}-700 transition-colors uppercase tracking-wide">Marcar como ${o?"Pago":"Recebido"}</span>
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
        </div>`,a.style.display="flex";const c=a.querySelector("#financial-form");let u="single",m=2;const f=c.querySelector('[name="amount"]'),x=c.querySelector("#recurrence-options"),y=c.querySelector("#recurrence-summary"),b=c.querySelector("#installments-input"),I=c.querySelector("#status-toggle"),$=c.querySelector("#payment-date-wrapper"),k=c.querySelector('[name="paymentDate"]'),L=()=>{if(u==="single")return;const S=parseFloat(f.value)||0;if(m=parseInt(b.value)||2,S===0){y.innerHTML='<span class="text-[10px] text-indigo-400 font-medium">Digite o valor total...</span>';return}if(u==="installment"){const P=S/m;y.innerHTML=`
                <div>
                    <span class="block text-[9px] text-indigo-400 uppercase tracking-widest font-bold mb-0.5">Simulação do Parcelamento</span>
                    <span class="font-bold text-sm text-indigo-700 block leading-tight">${m}x de ${pe(P)}</span>
                    <span class="text-[10px] text-indigo-500 font-medium">Total: ${pe(S)}</span>
                </div>
            `}else if(u==="repeat"){const P=S*m;y.innerHTML=`
                <div>
                    <span class="block text-[9px] text-indigo-400 uppercase tracking-widest font-bold mb-0.5">Geração Recorrente Fixa</span>
                    <span class="font-bold text-sm text-indigo-700 block leading-tight">${m}x de ${pe(S)}</span>
                    <span class="text-[10px] text-indigo-500 font-medium">Lançamento Total: ${pe(P)}</span>
                </div>
            `}};c.addEventListener("click",S=>{const P=S.target.closest(".mode-btn");if(P&&!t)if(S.preventDefault(),c.querySelectorAll(".mode-btn").forEach(D=>{D.classList.remove("bg-gray-900","text-white","shadow-sm"),D.classList.add("text-gray-500","hover:bg-gray-100")}),P.classList.add("bg-gray-900","text-white","shadow-sm"),P.classList.remove("text-gray-500","hover:bg-gray-100"),u=P.dataset.mode,u==="single")x.style.display="none";else{x.style.display="block";const D=x.querySelector("#recurrence-label");D&&(D.textContent=u==="installment"?"Número de Parcelas":"Repetir por quantos meses?"),L()}if(S.target.closest("#btn-minus")&&b){S.preventDefault();let D=parseInt(b.value)||2;D>2&&(b.value=D-1,L())}if(S.target.closest("#btn-plus")&&b){S.preventDefault();let D=parseInt(b.value)||2;D<60&&(b.value=D+1,L())}}),f.addEventListener("input",L),b&&b.addEventListener("input",L),I.addEventListener("change",()=>{I.checked?($.classList.remove("hidden"),k.required=!0):($.classList.add("hidden"),k.required=!1)}),c.addEventListener("submit",async S=>{S.preventDefault();const P=c.querySelector('button[type="submit"]'),j=P.innerHTML;P.disabled=!0,P.innerHTML='<div class="loader-small border-white"></div> A gravar...';const T=new FormData(c),D=I.checked,N=parseFloat(T.get("amount"));let F=N,O=1;!t&&u!=="single"&&(O=parseInt(T.get("installments")),u==="repeat"&&(F=N*O));const H={establishmentId:T.get("establishmentId"),description:T.get("description"),amount:F,dueDate:T.get("dueDate"),naturezaId:T.get("naturezaId")||null,centroDeCustoId:T.get("centroDeCustoId")||null,entity:T.get("entity")||null,paymentMethod:T.get("paymentMethod")||null,documentNumber:T.get("documentNumber")||null,notes:T.get("notes"),status:D?"paid":"pending",paymentDate:D?T.get("paymentDate"):null,installments:O};O>1&&!t&&(H.recurrenceId=self.crypto.randomUUID());try{t?(await(o?ln(t.id,H):pn(t.id,H)),g("Sucesso","Atualizado com sucesso!","success")):(await(o?nn(H):un(H)),g("Sucesso","Lançamento criado!","success")),document.getElementById("genericModal").style.display="none",Te()}catch(B){g("Erro",B.message||"Erro ao salvar","error"),P.disabled=!1,P.innerHTML=j}})}const wd=e=>C("/api/commissions/calculate",{method:"POST",body:JSON.stringify(e)}),kd=e=>C("/api/commissions/save",{method:"POST",body:JSON.stringify(e)}),Sd=(e,t)=>{const a=new URLSearchParams({startDate:e,endDate:t}).toString();return C(`/api/commissions/stats?${a}`)},$d=(e={})=>{Object.keys(e).forEach(o=>(e[o]===void 0||e[o]===null||e[o]==="")&&delete e[o]);const t=new URLSearchParams(e).toString(),a=`/api/commissions/history${t?"?"+t:""}`;return C(a)},Ho=e=>C(`/api/commissions/report/${e}`,{method:"DELETE"}),Ba=new Date,Ed=new Date(Ba.getFullYear(),Ba.getMonth(),1);let M={professionals:[],reports:[],calculationResult:null,periodString:"",establishments:[],filterEstablishmentIds:new Set,selectedIds:new Set,startDate:Ed.toISOString().split("T")[0],endDate:Ba.toISOString().split("T")[0],professionalId:"all",searchQuery:"",stats:{revenue:0,commissions:0,margin:0,netPaid:0}},Mt=null;const Id=document.getElementById("content");function gt(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e||0)}function Ld(e){return e?new Date(e).toLocaleDateString("pt-BR"):"--/--/----"}function Jt(e){if(!e)return"PR";const t=e.trim().split(" ");return t.length>=2?(t[0][0]+t[t.length-1][0]).toUpperCase():e.substring(0,2).toUpperCase()}async function Cd(){try{const[e,t]=await Promise.all([de(p.establishmentId),ke().catch(()=>({matrizes:[]}))]);M.professionals=e;const a=t.matrizes||[];M.establishments=[],a.forEach(o=>{M.establishments.push({id:o.id,name:o.name,type:"Matriz"}),o.branches&&o.branches.forEach(s=>M.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),M.filterEstablishmentIds.size===0&&M.filterEstablishmentIds.add(p.establishmentId)}catch(e){console.error("Erro na inicialização de comissões",e)}Dd(),Bd(),await Ze()}function Dd(){const e=M.professionals.map(a=>`<option value="${a.id}">${a.name}</option>`).join(""),t=M.establishments.map(a=>`
        <label class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border ${M.filterEstablishmentIds.has(a.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-slate-200 text-slate-600"} rounded-lg cursor-pointer hover:bg-slate-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${a.id}" ${M.filterEstablishmentIds.has(a.id)?"checked":""}>
            <span class="text-[10px] font-bold whitespace-nowrap">${a.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${a.name}</span>
        </label>
    `).join("");Id.innerHTML=`
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

            ${M.establishments.length>1?`
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
                        <input type="date" id="filter-start" value="${M.startDate}" class="py-1 px-2 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-700 outline-none focus:border-indigo-400">
                        <span class="text-slate-400 text-xs">até</span>
                        <input type="date" id="filter-end" value="${M.endDate}" class="py-1 px-2 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-700 outline-none focus:border-indigo-400">
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
    `}async function Ze(){const e=document.getElementById("list-container");e.innerHTML='<div class="flex justify-center py-20"><div class="loader"></div></div>';const t=Array.from(M.filterEstablishmentIds).join(",");try{const[a,o]=await Promise.all([$d({startDate:M.startDate,endDate:M.endDate,professionalId:M.professionalId,establishmentId:t}),Sd(M.startDate,M.endDate,t)]);M.reports=a||[];const s=M.reports.reduce((r,i)=>r+(i.summary.finalValue||i.summary.totalCommission),0);M.stats={revenue:o.totalRevenue||0,commissions:o.totalCommissionsPaid||0,margin:o.totalRevenue>0?((o.totalRevenue-o.totalCommissionsPaid)/o.totalRevenue*100).toFixed(1):0,netPaid:s},M.selectedIds.clear(),bt(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),Td(),zo()}catch(a){console.error(a),e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-slate-600 text-xs font-medium">Erro ao carregar dados.</p>
            </div>`}}function Td(){document.getElementById("kpi-revenue").textContent=gt(M.stats.revenue),document.getElementById("kpi-commissions").textContent=gt(M.stats.commissions),document.getElementById("kpi-margin").textContent=`${M.stats.margin}%`,document.getElementById("kpi-net").textContent=gt(M.stats.netPaid)}function zo(){const e=document.getElementById("list-container");let t=M.reports;if(M.searchQuery){const a=M.searchQuery.toLowerCase();t=t.filter(o=>o.professionalName.toLowerCase().includes(a)||o.period.toLowerCase().includes(a))}if(t.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 text-center">
                <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-receipt text-xl text-slate-300"></i>
                </div>
                <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhum pagamento encontrado</h3>
                <p class="text-[10px] text-slate-400 max-w-xs">Não há relatórios gerados para este período ou profissional.</p>
            </div>
        `;return}e.innerHTML=t.map(a=>{const o=Ld(a.createdAt),s=a.summary.totalCommission,r=a.summary.extraDebit||0,i=a.summary.extraCredit||0,n=a.summary.finalValue||s,d=M.selectedIds.has(a.id);let l="";return r>0&&i>0?l=`<span class="text-red-500">-R$${r.toFixed(2)}</span> / <span class="text-emerald-500">+R$${i.toFixed(2)}</span>`:r>0?l=`<span class="text-red-500">-R$ ${r.toFixed(2)}</span>`:i>0?l=`<span class="text-emerald-500">+R$ ${i.toFixed(2)}</span>`:l='<span class="text-slate-300">--</span>',`
        <div class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-2.5 md:px-3 md:py-2 mb-2 md:mb-0 bg-white md:bg-transparent rounded-xl md:rounded-none shadow-sm md:shadow-none border md:border-b ${d?"bg-indigo-50/40":""}">
            
            <div class="absolute right-2 top-2 md:relative md:right-auto md:top-auto md:col-span-3 md:flex md:items-center md:gap-2 z-10">
                <input type="checkbox" value="${a.id}" class="item-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${d?"checked":""}>
                <div class="hidden md:flex items-center gap-2 pr-2">
                    <div class="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                        ${Jt(a.professionalName)}
                    </div>
                    <div class="min-w-0">
                        <p class="font-bold text-xs text-slate-800 truncate" title="${a.professionalName}">${a.professionalName}</p>
                        <p class="text-[9px] text-slate-400 font-medium truncate mt-0.5">Gerado: ${o}</p>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-2 md:hidden mb-2 pr-8">
                <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    ${Jt(a.professionalName)}
                </div>
                <div class="min-w-0">
                    <p class="font-bold text-xs text-slate-800 truncate">${a.professionalName}</p>
                    <p class="text-[9px] text-slate-400 font-medium truncate mt-0.5">Gerado: ${o}</p>
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
                <span class="text-xs font-bold text-slate-700">${gt(s)}</span>
            </div>
            
            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-1 md:mb-0 ml-10 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ajustes:</span>
                <span class="text-[10px] font-bold">${l}</span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block pt-1 md:pt-0 border-t md:border-0 border-slate-100 ml-10 md:ml-0 mt-1 md:mt-0">
                <span class="md:hidden text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Líquido Pago:</span>
                <span class="text-xs font-black text-emerald-600">${gt(n)}</span>
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
        `}).join("")}function Bd(){Mt&&document.body.removeEventListener("click",Mt),Mt=s=>{const r=s.target;if(r.classList.contains("item-checkbox")){const n=r.value;r.checked?M.selectedIds.add(n):M.selectedIds.delete(n),bt(),s.stopPropagation();return}const i=r.closest("button[data-action]");if(i){const n=i.dataset.action,d=i.dataset.id;switch(n){case"apply-filters":M.startDate=document.getElementById("filter-start").value,M.endDate=document.getElementById("filter-end").value,M.professionalId=document.getElementById("filter-prof").value,Ze();break;case"new-calculation":Pd();break;case"print-receipt":Hd(d);break;case"delete-report":Od(d);break;case"view-report-details":jd(d);break;case"toggle-all-profs":const l=document.querySelectorAll(".prof-checkbox"),c=Array.from(l).every(x=>x.checked);l.forEach(x=>x.checked=!c);break;case"calculate-preview":Md();break;case"save-final-reports":Nd();break;case"toggle-preview-details":const u=i.dataset.idx,m=document.getElementById(`preview-details-${u}`),f=i.querySelector("i");m&&(m.classList.contains("hidden")?(m.classList.remove("hidden"),f&&f.classList.replace("bi-chevron-down","bi-chevron-up")):(m.classList.add("hidden"),f&&f.classList.replace("bi-chevron-up","bi-chevron-down")));break}}},document.body.addEventListener("click",Mt),document.getElementById("search-input").addEventListener("input",s=>{M.searchQuery=s.target.value,zo()}),document.body.addEventListener("input",s=>{(s.target.classList.contains("input-debit")||s.target.classList.contains("input-credit")||s.target.classList.contains("input-notes"))&&qd(s.target.dataset.idx)});const e=document.getElementById("select-all-toggle");e&&e.addEventListener("change",s=>{const r=s.target.checked,i=document.querySelectorAll(".item-checkbox");M.selectedIds.clear(),i.forEach(n=>{n.checked=r,r&&M.selectedIds.add(n.value)}),bt()});const t=document.getElementById("cancel-selection-btn");t&&t.addEventListener("click",()=>{M.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(s=>s.checked=!1),bt()});const a=document.getElementById("batch-delete-btn");a&&a.addEventListener("click",zd),document.querySelectorAll(".est-filter-checkbox").forEach(s=>{s.addEventListener("change",r=>{const i=r.target.closest("label");r.target.checked?(M.filterEstablishmentIds.add(r.target.value),i.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.remove("border-slate-200","text-slate-600")):(M.filterEstablishmentIds.delete(r.target.value),i.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.add("border-slate-200","text-slate-600")),Ze()})});const o=document.getElementById("export-excel-btn");o&&o.addEventListener("click",Fd)}function bt(){const e=document.getElementById("batch-action-bar"),t=document.getElementById("selected-count"),a=M.selectedIds.size;t&&(t.textContent=a),e&&(a>0?(e.classList.remove("hidden"),e.classList.add("flex")):(e.classList.add("hidden"),e.classList.remove("flex")))}function Pd(){const e=new Date().toISOString().split("T")[0],t=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],a=M.professionals.map(s=>`
        <label class="flex items-center p-2.5 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-indigo-300 transition-all cursor-pointer group">
            <input type="checkbox" value="${s.id}" class="prof-checkbox w-3.5 h-3.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500">
            <div class="ml-2 flex items-center gap-2">
                <div class="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[9px] font-bold group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">${Jt(s.name)}</div>
                <span class="font-bold text-xs text-slate-700">${s.name}</span>
            </div>
        </label>`).join(""),o=`
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
    `;ie({title:"Nova Apuração de Comissões",contentHTML:o,maxWidth:"max-w-2xl"})}async function Md(){const e=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(l=>l.value);if(e.length===0)return g("Atenção","Selecione pelo menos um profissional.","warning");const t=Array.from(M.filterEstablishmentIds).join(","),a=document.getElementById("calc-start-date"),o=document.getElementById("calc-end-date");if(!a||!o||!a.value||!o.value)return g("Atenção","As datas de início e fim são obrigatórias.","warning");const s={professionalIds:e,startDate:a.value,endDate:o.value,establishmentId:t,calculationTypes:{services:document.getElementById("calc-type-services")?.checked||!1,products:document.getElementById("calc-type-products")?.checked||!1,packages:document.getElementById("calc-type-packages")?.checked||!1}},r=new Date(s.startDate+"T00:00:00").toLocaleDateString("pt-BR"),i=new Date(s.endDate+"T00:00:00").toLocaleDateString("pt-BR");M.periodString=`${r} a ${i}`;const n=document.getElementById("btn-calc-action"),d=n.innerHTML;n.innerHTML='<div class="loader-small border-white mr-1"></div> Processando...',n.disabled=!0;try{console.log("Enviando cálculo...",s);const l=await wd(s);M.calculationResult=l.map(c=>({...c,extraDebit:0,extraCredit:0,finalValue:c.summary.totalCommission,notes:""})),Ad()}catch(l){g("Erro na Apuração",l.message,"error"),n.innerHTML=d,n.disabled=!1}}function Ad(){const e=M.calculationResult;if(!e||e.length===0||e.every(i=>i.summary.totalCommission===0)){g("Aviso","Nenhuma comissão encontrada para os filtros selecionados.","info");const i=document.getElementById("btn-calc-action");i.innerHTML='<i class="bi bi-lightning-charge"></i> Calcular Vendas',i.disabled=!1;return}const t=document.getElementById("calc-step-1"),a=document.getElementById("calc-step-2"),o=document.getElementById("btn-calc-action");t&&t.classList.add("hidden"),a&&a.classList.remove("hidden"),o&&(o.dataset.action="save-final-reports",o.className="py-2 px-5 bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-emerald-700 shadow-sm transition-all flex items-center gap-2",o.innerHTML='<i class="bi bi-check2-circle text-sm"></i> Confirmar Pagamentos',o.disabled=!1);const s=e.reduce((i,n)=>i+n.finalValue,0),r=e.map((i,n)=>{if(i.summary.totalCommission===0)return"";const d=(i.items||[]).map(c=>`
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
                <span class="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded border border-white/20">${M.periodString}</span>
            </div>
        </div>
        ${r}
    `)}function qd(e){const t=document.querySelector(`.input-debit[data-idx="${e}"]`),a=document.querySelector(`.input-credit[data-idx="${e}"]`),o=document.querySelector(`.input-notes[data-idx="${e}"]`);let s=parseFloat(t?.value)||0,r=parseFloat(a?.value)||0,i=o?.value||"";if(M.calculationResult&&M.calculationResult[e]){const n=M.calculationResult[e];n.extraDebit=s,n.extraCredit=r,n.notes=i,n.finalValue=n.summary.totalCommission-s+r;const d=document.querySelector(`.final-value-display[data-idx="${e}"]`);d&&(d.innerText=`R$ ${n.finalValue.toFixed(2)}`),Rd()}}function Rd(){const e=M.calculationResult.reduce((a,o)=>a+o.finalValue,0),t=document.getElementById("grand-total-preview");t&&(t.innerText=`R$ ${e.toFixed(2)}`)}async function Nd(){const e=M.calculationResult.filter(s=>s.summary.totalCommission>0),t=e.length;if(t===0)return g("Aviso","Não há valores para pagar.","info");if(!await J("Confirmar Pagamentos",`Você está prestes a gerar recibos e marcar as vendas de ${t} profissional(is) como PAGAS. Confirmar?`))return;const o=document.getElementById("btn-calc-action");o.innerHTML='<div class="loader-small border-white mr-1"></div> Finalizando...',o.disabled=!0;try{const s=e.map(r=>{const i=(r.items||[]).map(n=>n.originalSaleId).filter(n=>n!=null);return kd({professionalId:r.professionalId,professionalName:r.professionalName,period:M.periodString,processedSalesIds:i,establishmentId:p.establishmentId,reportData:{...r,summary:{...r.summary,finalValue:r.finalValue,extraDebit:r.extraDebit||0,extraCredit:r.extraCredit||0,notes:r.notes||""}}})});await Promise.all(s),g("Sucesso","Pagamentos registrados e vendas baixadas!","success"),M.calculationResult=null,document.getElementById("genericModal").style.display="none",await Ze()}catch(s){g("Erro ao Salvar",s.message,"error"),o.innerHTML='<i class="bi bi-check2-circle text-sm"></i> Confirmar Pagamentos',o.disabled=!1}}function jd(e){const t=M.reports.find(c=>c.id===e);if(!t)return;const a=t.reportData?.items||t.items||[],o=t.summary,s=o.extraDebit||0,r=o.extraCredit||0,i=o.notes||"",n=a.map(c=>`
        <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
            <td class="py-2.5 px-3 text-slate-700 font-medium whitespace-normal min-w-[150px]">${c.item}</td>
            <td class="py-2.5 px-3 text-slate-500">${c.client||"--"}</td>
            <td class="py-2.5 px-3 text-right text-slate-600">R$ ${(c.value||0).toFixed(2)}</td>
            <td class="py-2.5 px-3 text-center text-slate-600">${c.commissionRate}%</td>
            <td class="py-2.5 px-3 text-right font-bold text-emerald-600">R$ ${(c.commissionValue||0).toFixed(2)}</td>
        </tr>
    `).join("");let d="";(s>0||r>0||i)&&(d=`
            <div class="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h5 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3"><i class="bi bi-sliders mr-1"></i> Ajustes Aplicados</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    ${s>0?`<div class="text-sm bg-white p-2 rounded-lg border border-slate-100 shadow-sm"><span class="text-slate-500 block text-[10px] uppercase font-bold">Descontos/Vales:</span> <span class="font-black text-red-500">-R$ ${s.toFixed(2)}</span></div>`:""}
                    ${r>0?`<div class="text-sm bg-white p-2 rounded-lg border border-slate-100 shadow-sm"><span class="text-slate-500 block text-[10px] uppercase font-bold">Bônus Extras:</span> <span class="font-black text-emerald-500">+R$ ${r.toFixed(2)}</span></div>`:""}
                </div>
                ${i?`<div class="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-100 shadow-sm"><strong class="block text-[10px] uppercase text-slate-400 mb-1">Motivo do Ajuste:</strong> ${i}</div>`:""}
            </div>
        `);const l=`
        <div class="max-h-[75vh] overflow-y-auto custom-scrollbar p-1">
            <div class="flex flex-col md:flex-row justify-between md:items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-4 gap-3">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm border border-indigo-100">
                        ${Jt(t.professionalName)}
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
                    <span class="font-black text-slate-700">R$ ${(o.totalCommission||0).toFixed(2)}</span>
                </div>
            </div>
            
            ${d}

            <div class="mt-4 flex justify-between items-center bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
                <span class="text-xs font-black text-emerald-600 uppercase tracking-widest"><i class="bi bi-check-circle-fill mr-1"></i> Total Líquido Pago</span>
                <span class="text-2xl font-black text-emerald-700">R$ ${(o.finalValue||o.totalCommission).toFixed(2)}</span>
            </div>
        </div>
    `;ie({title:"Detalhes do Pagamento",contentHTML:l,maxWidth:"max-w-3xl"})}function Fd(){if(M.reports.length===0){g("Aviso","Não há dados para exportar com os filtros atuais.","info");return}let e=M.reports;if(M.searchQuery){const a=M.searchQuery.toLowerCase();e=e.filter(o=>o.professionalName.toLowerCase().includes(a)||o.period.toLowerCase().includes(a))}const t=e.map(a=>{const o=a.summary.totalCommission,s=a.summary.extraDebit||0,r=a.summary.extraCredit||0,i=a.summary.finalValue||o;return{"Data da Apuração":new Date(a.createdAt).toLocaleDateString("pt-BR"),Profissional:a.professionalName,"Período Base":a.period,"Itens Calculados":a.summary.totalItems||0,"Valor Bruto (R$)":o,"Bônus (R$)":r,"Descontos (R$)":s,"Líquido Pago (R$)":i,"Observações/Motivo":a.summary.notes||""}});try{if(typeof XLSX>"u"){g("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const a=XLSX.utils.json_to_sheet(t),o=XLSX.utils.book_new();XLSX.utils.book_append_sheet(o,a,"Comissoes");const s=`Relatorio_Comissoes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(o,s)}catch(a){console.error(a),g("Erro","Falha ao exportar Excel.","error")}}function Hd(e){const t=M.reports.find(c=>c.id===e);if(!t)return;if(!window.jspdf){g("Erro","A biblioteca de PDF não foi carregada.","error");return}const{jsPDF:a}=window.jspdf,o=new a;o.setFillColor(79,70,229),o.rect(0,0,210,40,"F"),o.setTextColor(255,255,255),o.setFontSize(22),o.setFont(void 0,"bold"),o.text("RECIBO DE COMISSÕES",105,20,{align:"center"}),o.setFontSize(10),o.text(`Data de Emissão: ${new Date().toLocaleDateString("pt-BR")}`,105,28,{align:"center"}),o.setTextColor(50,50,50),o.setFontSize(11),o.setFont(void 0,"normal"),o.text("Profissional:",15,55),o.setFont(void 0,"bold"),o.text(t.professionalName,40,55),o.setFont(void 0,"normal"),o.text("Período:",130,55),o.setFont(void 0,"bold"),o.text(t.period,147,55);const s=t.reportData?.items||t.items||[];let r=70;if(s.length>0){const c=s.map(u=>[u.item||"Item",u.client||"--",`R$ ${(u.value||0).toFixed(2)}`,`${u.commissionRate||0}%`,`R$ ${(u.commissionValue||0).toFixed(2)}`]);o.autoTable({startY:r,head:[["Serviço/Produto","Cliente","Valor Base","Taxa","Comissão"]],body:c,theme:"striped",headStyles:{fillColor:[241,245,249],textColor:[71,85,105],fontStyle:"bold"},styles:{fontSize:8},columnStyles:{2:{halign:"right"},3:{halign:"center"},4:{halign:"right",fontStyle:"bold",textColor:[5,150,105]}}}),r=o.lastAutoTable.finalY+15}const i=t.summary,n=i.finalValue||i.totalCommission,d=[["Comissões Brutas (Soma dos Itens)",`R$ ${i.totalCommission.toFixed(2)}`]];i.extraCredit>0&&d.push(["(+) Bônus Extras",`R$ ${i.extraCredit.toFixed(2)}`]),i.extraDebit>0&&d.push(["(-) Descontos / Vales",`R$ ${i.extraDebit.toFixed(2)}`]),o.autoTable({startY:r,head:[["Resumo do Fechamento","Valor"]],body:d,theme:"grid",headStyles:{fillColor:[79,70,229],textColor:[255,255,255]},columnStyles:{1:{halign:"right",fontStyle:"bold"}}});const l=o.lastAutoTable.finalY+15;o.setFillColor(236,253,245),o.rect(120,l-8,75,15,"F"),o.setTextColor(5,150,105),o.setFontSize(14),o.setFont(void 0,"bold"),o.text(`Total Líquido: R$ ${n.toFixed(2)}`,190,l,{align:"right"}),i.notes&&(o.setTextColor(100,100,100),o.setFontSize(9),o.setFont(void 0,"normal"),o.text(`Obs/Motivo: ${i.notes}`,15,l+10)),o.setTextColor(150,150,150),o.setFontSize(9),o.line(20,l+40,90,l+40),o.text("Assinatura da Empresa",55,l+45,{align:"center"}),o.line(120,l+40,190,l+40),o.text("Assinatura do Profissional",155,l+45,{align:"center"}),o.save(`Recibo_Comissoes_${t.professionalName.replace(/\s+/g,"_")}.pdf`)}async function zd(){const e=M.selectedIds.size;if(!(e===0||!await J("Excluir Recibos",`Deseja excluir e estornar ${e} recibo(s)? As vendas associadas voltarão ao status "A Apurar".`)))try{const a=Array.from(M.selectedIds).map(o=>Ho(o));await Promise.all(a),g("Sucesso",`${e} recibos excluídos com sucesso.`,"success"),M.selectedIds.clear(),bt(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),await Ze()}catch{g("Erro ao Excluir","Ocorreu um erro ao excluir alguns recibos.","error")}}async function Od(e){if(await J("Excluir Recibo",'ATENÇÃO: Deseja realmente excluir este recibo? As vendas associadas a ele voltarão ao status "A Apurar" e o valor será subtraído dos relatórios. Esta ação não pode ser desfeita.'))try{await Ho(e),g("Sucesso","Recibo cancelado com sucesso. Vendas estornadas para apuração.","success"),await Ze()}catch(a){g("Erro ao Excluir",a.message,"error")}}const Pa=document.getElementById("content");let V={allPackages:[],catalogForModal:{services:[],products:[]},establishments:[],filterEstablishmentIds:new Set,searchQuery:"",statusFilter:"all"},At=null,Oe=null;function Be(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e||0)}function Vd(){const e=V.allPackages.length,t=V.allPackages.filter(r=>r.status!=="inactive"),a=t.length,o=a>0?t.reduce((r,i)=>r+(i.price||0),0)/a:0;let s=0;return t.forEach(r=>{const i=r.originalPrice||0,n=r.price||0;if(i>0&&i>n){const d=(i-n)/i*100;d>s&&(s=d)}}),{total:e,activeCount:a,avgPrice:o,maxDiscount:s}}async function _d(){try{const t=(await ke().catch(()=>({matrizes:[]}))).matrizes||[];V.establishments=[],t.forEach(a=>{V.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(o=>V.establishments.push({id:o.id,name:o.name,type:"Filial"}))}),V.filterEstablishmentIds.size===0&&V.filterEstablishmentIds.add(p.establishmentId)}catch(e){console.error("Erro ao buscar hierarquia de empresas",e)}Ud(),Qd(),await Gt()}async function Gt(){const e=document.getElementById("packagesListContainer");e&&(e.innerHTML='<div class="col-span-full flex justify-center py-20"><div class="loader"></div></div>');try{const t=Array.from(V.filterEstablishmentIds).map(i=>_a(i).catch(()=>[])),a=await Promise.all(t),o=new Map;a.flat().forEach(i=>{o.has(i.id)||o.set(i.id,i)}),V.allPackages=Array.from(o.values());const[s,r]=await Promise.all([Pe(p.establishmentId).catch(()=>[]),sa(p.establishmentId).catch(()=>[])]);V.catalogForModal={services:(s||[]).filter(i=>i.active),products:r||[]},Wd(),Ma()}catch(t){console.error(t),e&&(e.innerHTML=`
                <div class="col-span-full flex flex-col items-center justify-center py-16 text-slate-500">
                    <i class="bi bi-exclamation-triangle text-4xl text-red-400 mb-3"></i>
                    <p>Erro ao carregar os pacotes. Tente novamente.</p>
                </div>
            `)}}function Ud(){const e=V.establishments.map(t=>`
        <label class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border ${V.filterEstablishmentIds.has(t.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-slate-200 text-slate-600"} rounded-lg cursor-pointer hover:bg-slate-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${t.id}" ${V.filterEstablishmentIds.has(t.id)?"checked":""}>
            <span class="text-[10px] font-bold whitespace-nowrap">${t.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${t.name}</span>
        </label>
    `).join("");Pa.innerHTML=`
        <section class="h-full flex flex-col p-3 md:p-6 w-full bg-slate-50 relative">
            
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div class="relative w-full md:w-96">
                    <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                    <input type="text" id="search-packages" placeholder="Buscar pacotes..." class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm font-medium text-slate-700">
                </div>
                
                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <select id="filter-status" class="flex-1 md:flex-none py-2 px-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-bold text-slate-700 shadow-sm cursor-pointer h-10">
                        <option value="all">Todos os Status</option>
                        <option value="active">Apenas Ativos</option>
                        <option value="inactive">Apenas Inativos</option>
                    </select>
                    <button id="export-excel-btn" class="py-2 px-3 bg-white border border-slate-300 text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition shadow-sm flex items-center justify-center gap-2 text-xs h-10">
                        <i class="bi bi-file-earmark-excel-fill text-base"></i> <span class="hidden md:inline">Exportar Excel</span>
                    </button>
                    <button data-action="new-package" class="flex-1 md:flex-none py-2 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-200 flex items-center justify-center gap-2 text-xs h-10">
                        <i class="bi bi-plus-lg"></i> Novo Pacote
                    </button>
                </div>
            </div>

            ${V.establishments.length>1?`
            <div class="mb-4">
                <div class="flex flex-wrap gap-2" id="establishment-filters-container">
                    ${e}
                </div>
            </div>
            `:""}

            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6" id="kpi-container"></div>

            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20"></div>
            
        </section>
    `}function Wd(){const e=Vd(),t=document.getElementById("kpi-container");t&&(t.innerHTML=`
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
            <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-box-seam text-6xl"></i></div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest z-10">Total de Pacotes</span>
            <span class="text-2xl font-black text-slate-800 mt-1 z-10">${e.total}</span>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
            <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-check-circle text-6xl"></i></div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest z-10">Pacotes Ativos</span>
            <span class="text-2xl font-black text-emerald-600 mt-1 z-10">${e.activeCount}</span>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
            <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-tags text-6xl"></i></div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest z-10">Maior Desconto</span>
            <span class="text-2xl font-black text-red-500 mt-1 z-10">${e.maxDiscount.toFixed(0)}% OFF</span>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
            <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-graph-up-arrow text-6xl"></i></div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest z-10">Ticket Médio</span>
            <span class="text-2xl font-black text-indigo-600 mt-1 z-10">${Be(e.avgPrice)}</span>
        </div>
    `)}function Ma(){const e=document.getElementById("packagesListContainer");if(!e)return;let t=V.allPackages;if(V.statusFilter!=="all"){const o=V.statusFilter==="active";t=t.filter(s=>s.status!=="inactive"===o)}if(V.searchQuery){const o=V.searchQuery.toLowerCase();t=t.filter(s=>s.name.toLowerCase().includes(o)||(s.description||"").toLowerCase().includes(o))}if(t.length===0){e.innerHTML=`
            <div class="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <i class="bi bi-box2 text-3xl text-slate-300"></i>
                </div>
                <h3 class="text-base font-bold text-slate-700 mb-1">Nenhum pacote encontrado</h3>
                <p class="text-xs text-slate-500 mb-4 max-w-sm text-center">Não existem pacotes com os filtros selecionados.</p>
                <button data-action="new-package" class="px-5 py-2.5 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition-colors text-sm">
                    <i class="bi bi-plus-lg mr-1"></i> Criar Pacote
                </button>
            </div>
        `;return}const a=new Map(V.establishments.map(o=>[o.id,o]));e.innerHTML=t.map(o=>{const s=o.status!=="inactive",r=o.price||0,i=o.originalPrice||0,n=i>0&&i>r?(i-r)/i*100:0,d=h(o.name),l=h(o.description||"Nenhuma descrição detalhada."),c=JSON.stringify(o).replace(/'/g,"&apos;"),u=(o.items||[]).reduce((b,I)=>b+(I.quantity||1),0),m=o.validityDays?`${o.validityDays} dias p/ uso`:"Uso vitalício",f=o.sellEndDate?`Até ${new Date(o.sellEndDate).toLocaleDateString("pt-BR")}`:"Venda contínua",x=o.establishmentIds||(o.establishmentId?[o.establishmentId]:[]);let y="";if(x.length===1){const b=a.get(x[0]);if(b){const I=b.type==="Matriz"?"bi-building":"bi-shop";y=`<span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200 flex items-center w-max" title="${b.name}"><i class="bi ${I} mr-1 opacity-50"></i> ${b.name}</span>`}}else x.length>1&&(y=`<span class="text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 flex items-center w-max cursor-help" title="${x.map(I=>a.get(I)?.name).filter(Boolean).join(", ")}"><i class="bi bi-buildings mr-1 opacity-50"></i> ${x.length} Unidades</span>`);return`
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300 flex flex-col relative overflow-hidden group cursor-pointer"
                 data-action="edit-package" data-package='${c}'>
                
                ${n>0?`<div class="absolute -right-8 top-4 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider py-1 px-8 transform rotate-45 shadow-sm z-10">${n.toFixed(0)}% OFF</div>`:""}

                <div class="p-5 flex-grow">
                    <div class="flex justify-between items-start pr-8 mb-3">
                        <div class="flex flex-col gap-1.5">
                            <div class="flex items-center gap-2">
                                <span class="w-2.5 h-2.5 rounded-full ${s?"bg-emerald-500":"bg-slate-300"}"></span>
                                <span class="text-[10px] font-bold ${s?"text-emerald-600":"text-slate-500"} uppercase tracking-widest">${s?"Ativo":"Inativo"}</span>
                            </div>
                            ${y}
                        </div>
                    </div>
                    
                    <h3 class="text-lg font-black text-slate-800 leading-tight line-clamp-1 mb-1" title="${d}">${d}</h3>
                    <p class="text-xs text-slate-500 line-clamp-2 min-h-[2rem] mb-4">${l}</p>

                    <div class="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-[10px] font-bold text-slate-400 uppercase">Conteúdo</span>
                            <span class="text-xs font-black text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">${u} Itens</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-[10px] font-bold text-slate-400 uppercase">Validade</span>
                            <span class="text-[10px] font-semibold text-slate-700"><i class="bi bi-clock-history mr-1 opacity-50"></i>${m}</span>
                        </div>
                    </div>

                    <div class="flex justify-between items-end">
                        <div>
                            ${n>0?`<p class="text-[10px] text-slate-400 font-bold line-through mb-0.5">De ${Be(i)}</p>`:""}
                            <p class="text-2xl font-black text-slate-900 leading-none">${Be(r)}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-calendar-event mr-1"></i>${f}</p>
                        </div>
                    </div>
                </div>
                
                <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span class="text-[10px] font-bold text-indigo-600 flex items-center gap-1"><i class="bi bi-pencil-square"></i> Editar Pacote</span>
                    <button data-action="delete-package" data-id="${o.id}" data-action-stop-propagation="true" class="text-[10px] font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition-colors">
                        <i class="bi bi-trash3"></i> Excluir
                    </button>
                </div>
            </div>
        `}).join("")}function Jd(){if(V.allPackages.length===0){g("Aviso","Não há pacotes carregados para exportar.","info");return}let e=V.allPackages;if(V.statusFilter!=="all"){const o=V.statusFilter==="active";e=e.filter(s=>s.status!=="inactive"===o)}if(V.searchQuery){const o=V.searchQuery.toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(o)||(s.description||"").toLowerCase().includes(o))}if(e.length===0){g("Aviso","Nenhum pacote corresponde aos filtros atuais.","info");return}const t=new Map(V.establishments.map(o=>[o.id,o.name])),a=e.map(o=>{const s=o.originalPrice||0,r=o.price||0,i=s>0?(s-r)/s*100:0,n=(o.items||[]).map(c=>`${c.quantity}x ${c.name}`).join(" | ");return{"Unidade(s)":(o.establishmentIds||(o.establishmentId?[o.establishmentId]:[])).map(c=>t.get(c)).filter(Boolean).join(", ")||"Não identificada","Nome do Pacote":o.name,Status:o.status!=="inactive"?"Ativo":"Inativo",Descrição:o.description||"","Itens Incluídos":n,"Valor Original (R$)":s,"Preço de Venda (R$)":r,"Desconto (%)":i.toFixed(1)+"%","Comissão (%)":o.commissionRate||0,"Validade de Uso (Dias)":o.validityDays||"Vitalício","Vendas Início":o.sellStartDate?new Date(o.sellStartDate).toLocaleDateString("pt-BR"):"-","Vendas Fim":o.sellEndDate?new Date(o.sellEndDate).toLocaleDateString("pt-BR"):"-"}});try{if(typeof XLSX>"u"){g("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const o=XLSX.utils.json_to_sheet(a),s=XLSX.utils.book_new();XLSX.utils.book_append_sheet(s,o,"Pacotes");const r=`Relatorio_Pacotes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(s,r)}catch(o){console.error(o),g("Erro","Falha ao exportar Excel.","error")}}function Ds(){const e=document.getElementById("genericModal");e.style.display="none",Oe&&e.removeEventListener("click",Oe)}async function Ts(e=null){const t=document.getElementById("genericModal"),a=!!e,o=e?JSON.parse(JSON.stringify(e.items||[])):[],s=h(e?.name||""),r=h(e?.description||""),i=e?.price||"",n=e?.commissionRate||0,d=e?.validityDays||"",l=e?.sellStartDate?new Date(e.sellStartDate).toISOString().split("T")[0]:"",c=e?.sellEndDate?new Date(e.sellEndDate).toISOString().split("T")[0]:"",u=e?.salesLimit||"",m=e?.establishmentIds||(e?.establishmentId?[e.establishmentId]:[p.establishmentId]),f=V.establishments.map(L=>`
        <label class="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors cursor-pointer group">
            <input type="checkbox" class="modal-est-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4" value="${L.id}" ${m.includes(L.id)?"checked":""}>
            <span class="text-xs font-semibold text-slate-700 truncate group-hover:text-indigo-700" title="${L.name}">${L.type==="Matriz"?"🏢":"📍"} ${L.name}</span>
        </label>
    `).join(""),x=`
        <div class="modal-content max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <header class="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-lg shadow-sm">
                        <i class="bi ${a?"bi-pencil-square":"bi-box2-heart"}"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-black text-slate-800 tracking-tight">${a?"Editar Pacote":"Novo Pacote Promocional"}</h2>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Configuração de Venda</p>
                    </div>
                </div>
                <button type="button" data-action="close-modal" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
                    <i class="bi bi-x-lg"></i>
                </button>
            </header>

            <form id="package-form" class="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-6 bg-slate-50/30">
                <input type="hidden" id="packageId" value="${e?.id||""}">
                
                <div>
                    <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><i class="bi bi-info-circle text-indigo-400"></i> Detalhes Básicos</h3>
                    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div class="md:col-span-3">
                                <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nome Comercial do Pacote *</label>
                                <input type="text" id="packageName" value="${s}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-800 text-sm" placeholder="Ex: Combo Verão, Especial Noivas..." required>
                            </div>
                            <div class="md:col-span-1">
                                <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Status</label>
                                <select id="packageStatus" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-800 text-sm">
                                    <option value="active" ${e?.status!=="inactive"?"selected":""}>Ativo (Disponível)</option>
                                    <option value="inactive" ${e?.status==="inactive"?"selected":""}>Inativo (Pausado)</option>
                                </select>
                            </div>
                            
                            <div class="md:col-span-4 mt-1 border-t border-slate-100 pt-3">
                                <div class="flex justify-between items-center mb-2">
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase">Unidades Disponíveis *</label>
                                    <button type="button" data-action="toggle-all-ests" class="text-[9px] font-bold text-indigo-500 hover:text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">Selecionar Todas</button>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto custom-scrollbar p-1">
                                    ${f}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Descrição para o Cliente (Opcional)</label>
                            <textarea id="packageDescription" rows="2" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-700 resize-none" placeholder="Descreva os benefícios e condições do pacote...">${r}</textarea>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="flex justify-between items-center mb-3">
                        <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><i class="bi bi-layers text-indigo-400"></i> Composição do Pacote</h3>
                        <button type="button" id="add-item-to-package-btn" class="py-1.5 px-3 bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold rounded-lg text-xs hover:bg-indigo-100 transition shadow-sm flex items-center gap-1">
                            <i class="bi bi-plus-circle"></i> Inserir Serviço/Produto
                        </button>
                    </div>
                    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div id="package-items-list" class="max-h-60 overflow-y-auto custom-scrollbar bg-slate-50/50 p-2 min-h-[5rem] space-y-2">
                            </div>
                        <div class="bg-slate-100 p-3 border-t border-slate-200 flex justify-between items-center">
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Soma Original dos Itens</span>
                            <span id="originalPrice" class="text-base font-black text-slate-700">R$ 0,00</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><i class="bi bi-currency-dollar text-indigo-400"></i> Precificação e Regras de Venda</h3>
                    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div class="md:col-span-2 relative">
                                <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Preço Final do Pacote *</label>
                                <div class="relative">
                                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600 font-black">R$</span>
                                    <input type="number" step="0.01" id="finalPrice" value="${i}" class="w-full pl-10 p-3 bg-indigo-50/30 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-lg text-indigo-700 transition-colors" required placeholder="0.00">
                                </div>
                                <p id="discountIndicator" class="absolute right-0 -top-5 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded hidden">0% OFF</p>
                            </div>
                            
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Comissão Base (%)</label>
                                <input type="number" id="commissionRate" value="${n}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700" placeholder="Ex: 10">
                            </div>

                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1" title="Prazo para o cliente usar os itens após a compra">Validade de Uso</label>
                                <div class="relative">
                                    <input type="number" id="validityDays" value="${d}" class="w-full p-3 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700" placeholder="Vitalício">
                                    <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] font-bold text-slate-400">Dias</span>
                                </div>
                            </div>
                        </div>

                        <div class="border-t border-slate-100 pt-4 mt-2">
                            <p class="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-1"><i class="bi bi-lightning-charge"></i> Gatilhos Promocionais de Venda (Opcionais)</p>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Vender a partir de</label>
                                    <input type="date" id="sellStartDate" value="${l}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-semibold text-slate-700">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Vender até</label>
                                    <input type="date" id="sellEndDate" value="${c}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-semibold text-slate-700">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Limite de Estoque</label>
                                    <input type="number" id="salesLimit" value="${u}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700 text-sm" placeholder="Qtd máxima">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
            <footer class="p-4 border-t border-slate-200 bg-white flex justify-end gap-3 z-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                <button type="button" data-action="close-modal" class="py-2.5 px-5 bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors">Cancelar</button>
                <button type="button" data-action="save-package" class="py-2.5 px-6 bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all flex items-center gap-2">
                    <i class="bi bi-save2"></i> Salvar Pacote
                </button>
            </footer>
        </div>
    `;t.innerHTML=x,t.style.display="flex";const y=t.querySelector("#package-items-list"),b=t.querySelector("#finalPrice"),I=t.querySelector("#discountIndicator"),$=L=>{const S=L.reduce((j,T)=>j+(T.price||0)*(T.quantity||1),0),P=parseFloat(b.value)||0;if(t.querySelector("#originalPrice").textContent=Be(S),S>0&&S>P&&P>0){const j=(S-P)/S*100;I.textContent=`${j.toFixed(0)}% OFF`,I.classList.remove("hidden")}else I.classList.add("hidden")},k=L=>{L.length===0?y.innerHTML=`
                <div class="text-center py-6 text-slate-400 flex flex-col items-center">
                    <i class="bi bi-inbox text-2xl mb-1 opacity-50"></i>
                    <p class="text-[10px] font-bold uppercase tracking-widest">Nenhum item adicionado</p>
                </div>`:y.innerHTML=L.map((S,P)=>{const j=S.type==="service",T=j?"bi-scissors":"bi-box",D=j?"bg-indigo-100 text-indigo-700 border-indigo-200":"bg-emerald-100 text-emerald-700 border-emerald-200";return`
                <div class="flex items-center justify-between bg-white p-2 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors animate-fade-in-fast">
                    <div class="flex items-center gap-3 min-w-0 flex-1">
                        <div class="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                            <span class="text-[8px] font-bold text-slate-400 uppercase leading-none mb-0.5">Qtd</span>
                            <input type="number" value="${S.quantity}" min="1" class="w-10 text-center bg-transparent text-sm font-black text-slate-700 outline-none quantity-input" data-index="${P}">
                        </div>
                        <div class="min-w-0">
                            <div class="flex items-center gap-1.5 mb-0.5">
                                <span class="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${D} flex items-center gap-1"><i class="bi ${T}"></i> ${j?"Serviço":"Produto"}</span>
                            </div>
                            <p class="font-bold text-slate-800 text-sm truncate leading-tight">${h(S.name)}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 flex-shrink-0 pl-2">
                        <div class="text-right">
                            <span class="block text-[8px] font-bold text-slate-400 uppercase">Valor Un.</span>
                            <span class="text-xs font-black text-slate-700">${Be(S.price)}</span>
                        </div>
                        <button type="button" class="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors remove-item-btn" data-index="${P}">
                            <i class="bi bi-trash3 pointer-events-none"></i>
                        </button>
                    </div>
                </div>
            `}).join(""),$(L)};k(o),y.addEventListener("change",L=>{if(L.target.classList.contains("quantity-input")){const S=parseInt(L.target.dataset.index,10),P=parseInt(L.target.value,10);P>0&&o[S]&&(o[S].quantity=P,k(o))}}),y.addEventListener("click",L=>{const S=L.target.closest(".remove-item-btn");if(S){const P=parseInt(S.dataset.index,10);o.splice(P,1),k(o)}}),b.addEventListener("input",()=>{$(o)}),t.querySelector("#add-item-to-package-btn").onclick=()=>Gd(L=>{const S=o.find(P=>P.id===L.id&&P.type===L.type);S?S.quantity++:o.push({...L,quantity:1}),k(o)}),Oe&&t.removeEventListener("click",Oe),Oe=async L=>{const S=L.target.closest("button[data-action]");if(!S)return;const P=S.dataset.action;if(L.stopPropagation(),P==="close-modal"&&Ds(),P==="toggle-all-ests"){const j=document.querySelectorAll(".modal-est-checkbox"),T=Array.from(j).every(D=>D.checked);j.forEach(D=>D.checked=!T)}if(P==="save-package"){const j=S,T=Array.from(document.querySelectorAll(".modal-est-checkbox:checked")).map(F=>F.value);if(T.length===0){g("Atenção","Selecione pelo menos uma unidade para o pacote.","warning");return}const D=o.reduce((F,O)=>F+O.price*O.quantity,0),N={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:o,originalPrice:D,price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null,sellStartDate:document.getElementById("sellStartDate").value||null,sellEndDate:document.getElementById("sellEndDate").value||null,salesLimit:parseInt(document.getElementById("salesLimit").value,10)||null,establishmentIds:T,establishmentId:T[0]};if(!N.name||isNaN(N.price)){g("Erro","Nome do Pacote e Preço Final são obrigatórios.","warning");return}if(N.items.length===0){g("Erro","Adicione pelo menos um serviço ou produto ao pacote.","warning");return}j.disabled=!0,j.innerHTML='<div class="loader-small border-white mr-2"></div> Salvando...';try{a?await Ni(N.id,N):(delete N.id,await Ri(N)),g("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),Ds(),await Gt()}catch(F){g("Erro",`Não foi possível salvar o pacote: ${F.message}`,"error"),j.disabled=!1,j.innerHTML='<i class="bi bi-save2"></i> Salvar Pacote'}}},t.addEventListener("click",Oe)}function Gd(e){let t="";const a=document.createElement("div");a.id="item-selection-modal",a.className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4 animate-fade-in-fast";const o=n=>{const d=t.toLowerCase(),l=V.catalogForModal.services.filter(f=>f.name.toLowerCase().includes(d)),c=V.catalogForModal.products.filter(f=>f.name.toLowerCase().includes(d)),u=l.map(f=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-2 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left group">
                <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"><i class="bi bi-scissors"></i></div>
                <div class="flex-grow min-w-0">
                    <p class="font-bold text-xs text-slate-800 truncate">${h(f.name)}</p>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${Be(f.price)}</p>
                </div>
                <i class="bi bi-plus-circle text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
            </button>
        `).join("")||'<p class="text-xs text-slate-400 text-center p-4">Nenhum serviço encontrado.</p>',m=c.map(f=>`
            <button data-action="select-item" data-item-type="product" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-2 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left group">
                <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"><i class="bi bi-box"></i></div>
                <div class="flex-grow min-w-0">
                    <p class="font-bold text-xs text-slate-800 truncate">${h(f.name)}</p>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${Be(f.price)}</p>
                </div>
                <i class="bi bi-plus-circle text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
            </button>
        `).join("")||'<p class="text-xs text-slate-400 text-center p-4">Nenhum produto encontrado.</p>';n.innerHTML=`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-100 pb-1">Serviços</h4>
                    <div id="modal-service-list" class="space-y-2 max-h-72 overflow-y-auto custom-scrollbar pr-1">${u}</div>
                </div>
                <div>
                    <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-100 pb-1">Produtos</h4>
                    <div id="modal-product-list" class="space-y-2 max-h-72 overflow-y-auto custom-scrollbar pr-1">${m}</div>
                </div>
            </div>
        `};a.innerHTML=`
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[85vh] overflow-hidden transform scale-100">
            <header class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 class="text-base font-black text-slate-800">Selecione o Item para o Pacote</h2>
                <button data-action="close-selection-modal" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors"><i class="bi bi-x-lg"></i></button>
            </header>
            <div class="p-4 border-b border-slate-100 bg-white">
                <div class="relative">
                    <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                    <input type="search" id="item-search-input" placeholder="Procurar serviço ou produto..." class="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm text-slate-700">
                </div>
            </div>
            <div id="item-selection-list" class="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-50/30">
            </div>
        </div>
    `,document.body.appendChild(a);const s=a.querySelector("#item-selection-list"),r=a.querySelector("#item-search-input"),i=()=>{a.classList.add("opacity-0"),setTimeout(()=>a.remove(),200)};o(s),setTimeout(()=>r.focus(),100),r.addEventListener("input",()=>{t=r.value,o(s)}),a.addEventListener("click",n=>{const d=n.target.closest('[data-action="select-item"]'),l=n.target.closest('[data-action="close-selection-modal"]');if(d){const{itemType:c,itemId:u}=d.dataset,f=(V.catalogForModal[c+"s"]||[]).find(x=>x.id===u);f&&(e({...f,type:c}),i())}else(l||n.target===a)&&i()})}function Qd(){At&&Pa.removeEventListener("click",At),At=o=>{if(o.target.closest('[data-action-stop-propagation="true"]')){o.stopPropagation();const i=o.target.closest('[data-action="delete-package"]');if(i){const n=i.dataset.id;J("Excluir Pacote","Tem a certeza que deseja excluir este pacote promocional? Esta ação é irreversível.").then(async d=>{if(d)try{await ji(n),g("Sucesso!","Pacote excluído.","success"),await Gt()}catch(l){g("Erro",`Não foi possível excluir: ${l.message}`,"error")}})}return}const s=o.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!s)return;const r=s.dataset.action;if(r==="new-package")Ts(null);else if(r==="edit-package"){const i=JSON.parse(s.dataset.package);Ts(i)}},Pa.addEventListener("click",At);const e=document.getElementById("search-packages");e&&e.addEventListener("input",o=>{V.searchQuery=o.target.value,Ma()});const t=document.getElementById("filter-status");t&&t.addEventListener("change",o=>{V.statusFilter=o.target.value,Ma()}),document.querySelectorAll(".est-filter-checkbox").forEach(o=>{o.addEventListener("change",s=>{const r=s.target.closest("label");s.target.checked?(V.filterEstablishmentIds.add(s.target.value),r.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),r.classList.remove("border-slate-200","text-slate-600")):(V.filterEstablishmentIds.delete(s.target.value),r.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),r.classList.add("border-slate-200","text-slate-600")),Gt()})});const a=document.getElementById("export-excel-btn");a&&a.addEventListener("click",Jd)}const Xd=document.getElementById("content");let Yd=null;async function Zd(){const e=h(p.userName||"Usuário"),t=h(le.currentUser?.email||"E-mail não disponível"),a=p.userName?p.userName.charAt(0):"U";Xd.innerHTML=`
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
    `,await Kd()}async function Kd(){const e=document.getElementById("professional-agenda-block");e.innerHTML="";try{const t=p.userProfessionalId;if(t){const a=await ri(t);Yd=a,a.photo&&(document.getElementById("user-profile-avatar").src=a.photo);const o=h(a.name);e.innerHTML=`
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
            `,ec(a.id),document.getElementById("my-blocks-filter").addEventListener("change",r=>Qt(a.id,r.target.value)),Qt(a.id,"future")}else e.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(t){console.error("Erro ao carregar seção de profissional:",t),e.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${h(t.message)}</p>
            </div>
        `}}function ec(e){const t=document.getElementById("block-schedule-form");t.addEventListener("submit",async a=>{a.preventDefault();const o=t.querySelector("#blockDate").value,s=t.querySelector("#blockStartTime").value,r=t.querySelector("#blockEndTime").value,i=t.querySelector("#blockReason").value;if(!o||!s||!r){g("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(s>=r){g("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const n=new Date(`${o}T${s}:00`),d=new Date(`${o}T${r}:00`),l=t.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="A bloquear...";try{await ta({establishmentId:p.establishmentId,professionalId:e,reason:i||"Bloqueado (Meu Perfil)",startTime:n.toISOString(),endTime:d.toISOString()}),g("Sucesso","Agenda bloqueada com sucesso!","success"),t.reset();const c=document.getElementById("my-blocks-filter").value;Qt(e,c)}catch(c){console.error("Erro ao bloquear agenda:",c),g("Erro",`Não foi possível bloquear a agenda: ${c.message}`,"error")}finally{l.disabled=!1,l.textContent="Bloquear Agenda"}})}async function Qt(e,t="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const o=new Date;let s,r;t==="history"?(r=new Date,s=new Date,s.setFullYear(s.getFullYear()-1)):(s=new Date,r=new Date,r.setFullYear(r.getFullYear()+1));let n=(await ea(p.establishmentId,s.toISOString(),r.toISOString(),e)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));t==="history"?n=n.filter(d=>d.endTime<o).sort((d,l)=>l.startTime-d.startTime):n=n.filter(d=>d.endTime>=o).sort((d,l)=>d.startTime-l.startTime),n.length>0?(a.innerHTML=n.map(d=>{const l=d.startTime.toLocaleDateString("pt-BR"),c=`${d.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${d.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`,u=d.endTime<new Date,m=h(d.reason||"Sem motivo");return`
                    <div class="flex items-center justify-between p-3 ${u?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${l} das ${c}</p>
                            <p class="text-sm text-gray-600">${m}</p>
                        </div>
                        <button data-block-id="${d.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(d=>{d.addEventListener("click",async l=>{const c=l.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await Ha(c),g("Sucesso","Bloqueio removido.","success"),Qt(e,t)}catch(u){console.error("Erro ao remover bloqueio:",u),g("Erro",`Não foi possível remover o bloqueio: ${u.message}`,"error")}})})):a.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${t==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(o){console.error("Erro ao carregar bloqueios:",o),a.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${h(o.message)}</p>`}}let Bs=!1;async function Xt(e){if(!e)return;e.innerHTML=`
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
    `;const t=document.getElementById("hierarchy-list-container"),a=document.getElementById("est-parent");try{const s=(await ke()).matrizes||[];if(a&&(a.innerHTML='<option value="">Nenhuma (Criar como Matriz Independente)</option>'),s.length===0)t.innerHTML=`
                <div class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
                    <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="bi bi-building-add text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">A sua rede está vazia</h3>
                    <p class="text-gray-500 max-w-md mx-auto mb-6">Comece por criar a sua primeira Matriz ou Loja principal para expandir o seu negócio.</p>
                </div>
            `;else{let r="";s.forEach(i=>{if(a&&!i.isOrphanBranch){const d=document.createElement("option");d.value=i.id,d.textContent=i.name,a.appendChild(d)}const n=i.isMatriz||!i.parentId?'<span class="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">📍 UNIDADE</span>';r+=`
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
                `,i.branches&&i.branches.length>0?i.branches.forEach(d=>{r+=`
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
                        `}):r+=`
                        <div class="col-span-full py-4 text-center border border-dashed border-gray-100 rounded-lg bg-gray-50/30">
                            <p class="text-xs text-gray-400 italic">Nenhuma filial vinculada.</p>
                        </div>
                    `,r+=`
                            </div>
                        </div>
                    </div>
                `}),t.innerHTML=r}Bs||(tc(),Bs=!0)}catch(o){console.error("Erro na renderização da rede:",o),t.innerHTML=`
            <div class="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100 text-center">
                <i class="bi bi-exclamation-triangle text-2xl mb-2 block"></i>
                <p class="font-bold text-sm">Não foi possível carregar a estrutura organizacional.</p>
            </div>
        `}}function tc(){const e=document.getElementById("form-create-establishment");e&&e.addEventListener("submit",async t=>{t.preventDefault();const a=e.querySelector('button[type="submit"]'),o=a.innerHTML;a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...',a.disabled=!0;const s={name:document.getElementById("est-name").value.trim(),cnpj:document.getElementById("est-cnpj").value.trim(),parentId:document.getElementById("est-parent").value||null,timezone:document.getElementById("est-timezone").value};try{const r=await Sr(s);alert(r.message||"Sucesso!"),e.reset();const i=document.getElementById("modal-create-establishment"),n=window.bootstrap?.Modal.getInstance(i);n&&n.hide(),await Xt(document.getElementById("content"))}catch(r){console.error("Erro ao criar estabelecimento:",r),alert("Erro: "+(r.message||"Falha ao gravar dados."))}finally{a.innerHTML=o,a.disabled=!1}})}window.loadAndRenderHierarchy=()=>Xt(document.getElementById("content"));document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("gesturestart",function(t){t.preventDefault()}),document.addEventListener("gesturechange",function(t){t.preventDefault()}),document.addEventListener("gestureend",function(t){t.preventDefault()});let e=0;document.addEventListener("touchend",function(t){const a=new Date().getTime();a-e<=300&&t.preventDefault(),e=a},!1)});const ee=document.getElementById("loadingScreen"),st=document.getElementById("dashboardContent"),Ve=document.getElementById("content"),fa=document.getElementById("notificationBell"),qt=document.getElementById("notificationBadge"),Ne=document.getElementById("notificationPanel"),xa=document.getElementById("notificationList"),ot=document.getElementById("profileMenuButton"),se=document.getElementById("profileDropdown"),Ps=document.getElementById("profileName"),Ms=document.getElementById("profileEmail"),As=document.getElementById("logoutButton"),qs=document.getElementById("myProfileLink"),Rs=document.getElementById("hamburger-menu-btn"),ae=document.getElementById("sidebar"),ne=document.getElementById("mobile-overlay"),Ns=document.getElementById("themeToggleBtn"),ha=document.getElementById("themeIcon"),Aa=document.getElementById("mobile-bottom-nav"),Ke=document.getElementById("nav-scroll"),js=document.getElementById("scroll-hint-left"),Fs=document.getElementById("scroll-hint-right"),ac=document.querySelectorAll(".bottom-nav-item");function qa(){if(!Ke||!js||!Fs)return;const{scrollLeft:e,scrollWidth:t,clientWidth:a}=Ke;js.classList.toggle("visible",e>5),Fs.classList.toggle("visible",e+a<t-5)}function sc(){if(!Ke)return;const e=document.querySelector(".bottom-nav-item.active");if(!e)return;const t=Ke,a=t.getBoundingClientRect(),o=e.getBoundingClientRect(),r=o.left+o.width/2-a.left-a.width/2;t.scrollBy({left:r,behavior:"smooth"})}const oc={"dashboard-section":Xr,"agenda-section":io,"comandas-section":tn,"relatorios-section":xn,"servicos-section":Fn,"produtos-section":Yn,"suppliers-section":Zn,"profissionais-section":Ut,"clientes-section":Dl,"estabelecimento-section":e=>Mo(e),"ausencias-section":Jl,"users-section":Wt,"sales-report-section":cd,"financial-section":md,"commissions-section":Cd,"packages-section":_d,"my-profile-section":Zd,"hierarquia-section":()=>Xt(Ve),"establishments-section":()=>Xt(Ve)},Hs={indigo:{main:"#4f46e5",hover:"#4338ca",light:"#eef2ff",text:"#ffffff"},blue:{main:"#2563eb",hover:"#1d4ed8",light:"#eff6ff",text:"#ffffff"},sky:{main:"#0284c7",hover:"#0369a1",light:"#e0f2fe",text:"#ffffff"},teal:{main:"#0d9488",hover:"#0f766e",light:"#ccfbf1",text:"#ffffff"},emerald:{main:"#059669",hover:"#047857",light:"#d1fae5",text:"#ffffff"},green:{main:"#16a34a",hover:"#15803d",light:"#dcfce7",text:"#ffffff"},lime:{main:"#65a30d",hover:"#4d7c0f",light:"#ecfccb",text:"#1f2937"},amber:{main:"#d97706",hover:"#b45309",light:"#fef3c7",text:"#1f2937"},orange:{main:"#ea580c",hover:"#c2410c",light:"#ffedd5",text:"#ffffff"},red:{main:"#dc2626",hover:"#b91c1c",light:"#fee2e2",text:"#ffffff"},rose:{main:"#e11d48",hover:"#be123c",light:"#ffe4e6",text:"#ffffff"},pink:{main:"#db2777",hover:"#be185d",light:"#fce7f3",text:"#ffffff"},fuchsia:{main:"#c026d3",hover:"#a21caf",light:"#fae8ff",text:"#ffffff"},purple:{main:"#7c3aed",hover:"#6d28d9",light:"#ede9fe",text:"#ffffff"},violet:{main:"#8b5cf6",hover:"#7c3aed",light:"#ddd6fe",text:"#ffffff"},gray:{main:"#64748b",hover:"#475569",light:"#f1f5f9",text:"#ffffff"},black:{main:"#111827",hover:"#000000",light:"#e5e7eb",text:"#ffffff"}};function Rt(e){const t=Hs[e]||Hs.indigo,o=(r=>{const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return i?`${parseInt(i[1],16)}, ${parseInt(i[2],16)}, ${parseInt(i[3],16)}`:"79, 70, 229"})(t.main);document.body.style.setProperty("--theme-main",t.main);const s=document.getElementById("dynamic-theme-styles");s&&(s.innerHTML=`
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
        `)}function zt(e){document.documentElement.setAttribute("data-theme",e),localStorage.setItem("kairos_theme",e),ha&&(e==="dark"?ha.innerHTML="☀️":ha.innerHTML="🌙")}function rc(){const e=localStorage.getItem("kairos_theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;zt(e||(t?"dark":"light"))}let ft=null,xt=[];function Oo(){if(!qt||!xa)return;const e=xt.filter(t=>!t.read).length;if(e>0?(qt.textContent=e,qt.classList.remove("hidden")):qt.classList.add("hidden"),xt.length===0){xa.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}xa.innerHTML=xt.map(t=>`
    <div class="notification-item ${t.read?"":"unread"}">
    <p class="font-semibold">${t.title}</p>
    <p class="text-sm text-gray-600">${t.message}</p>
    <p class="text-xs text-gray-400 mt-1">${t.time}</p>
    </div>
    `).join("")}function zs(e){ft&&ft();const t=Yt(fe,"establishments",e,"notifications"),a=Us(t,Ws("timestamp",">=",new Date),ar("timestamp","desc"));ft=sr(a,o=>{o.docChanges().forEach(s=>{if(s.type==="added"){const r=s.doc.data();xt.unshift({title:r.title,message:r.message,time:r.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),g(r.title,r.message,"info",!0),Oo();const i=document.querySelector(".sidebar-link.active");i&&i.dataset.target==="agenda-section"&&io()}})},o=>{console.error("Erro no listener de notificações:",o)})}async function ic(e){const t=document.getElementById("multi-context-container"),a=document.getElementById("multi-context-btn"),o=document.getElementById("multi-context-label"),s=document.getElementById("multi-context-count"),r=document.getElementById("multi-context-list"),i=document.getElementById("multi-context-apply"),n=document.getElementById("multi-context-dropdown"),d=document.getElementById("multi-context-arrow");if(!(!t||!r))try{const c=(await ke()).matrizes||[];let u="",m=0;if(c.forEach(f=>{u+=`
                <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors mb-1">
                    <input type="checkbox" value="${f.id}" class="context-checkbox" data-name="${Nt(f.name)}">
                    <span class="text-[13px] sm:text-sm font-bold text-slate-700 truncate">🏢 ${Nt(f.name)}</span>
                </label>
            `,m++,f.branches&&f.branches.length>0&&f.branches.forEach(x=>{u+=`
                        <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors ml-4 mb-1 border-l-2 border-slate-100 pl-3">
                            <input type="checkbox" value="${x.id}" class="context-checkbox" data-name="${Nt(x.name)}">
                            <span class="text-[12px] sm:text-[13px] font-medium text-slate-600 truncate">📍 ${Nt(x.name)}</span>
                        </label>
                    `,m++})}),m>0){r.innerHTML=u,t.style.display="block",(!p.selectedEstablishments||p.selectedEstablishments.length===0)&&(p.selectedEstablishments=[e]);const f=Array.from(r.querySelectorAll('input[type="checkbox"]')),x=()=>{const b=f.filter(I=>I.checked);s.textContent=b.length,b.length===0?o.textContent="Nenhuma selecionada":b.length===1?o.textContent=b[0].dataset.name:o.textContent=`${b.length} Unidades`};let y=!1;f.forEach(b=>{p.selectedEstablishments.includes(b.value)&&(b.checked=!0,y=!0)}),!y&&f.length>0&&(f[0].checked=!0,p.selectedEstablishments=[f[0].value],p.establishmentId=f[0].value),x(),a.addEventListener("click",b=>{b.stopPropagation(),n.classList.toggle("hidden"),d.style.transform=n.classList.contains("hidden")?"rotate(0deg)":"rotate(180deg)"}),document.addEventListener("click",b=>{!t.contains(b.target)&&!n.classList.contains("hidden")&&(n.classList.add("hidden"),d.style.transform="rotate(0deg)",f.forEach(I=>{I.checked=p.selectedEstablishments.includes(I.value)}),x())}),f.forEach(b=>{b.addEventListener("change",x)}),i.addEventListener("click",async b=>{b.stopPropagation(),ee&&(ee.classList.remove("hidden","fade-out"),ee.style.display="flex");const I=f.filter(k=>k.checked);if(I.length===0){ee&&(ee.classList.add("fade-out"),setTimeout(()=>{ee.style.display="none"},500)),g("Atenção","Tem de selecionar pelo menos uma unidade.","warning");return}p.selectedEstablishments=I.map(k=>k.value);const $=p.selectedEstablishments[0];try{const k=await De($);p.establishmentId=$,p.establishmentName=k.name,p.enabledModules=k.modules,p.currentViewContext={id:$,name:k.name,type:k.parentId?"BRANCH":"GROUP"},typeof Rt=="function"&&Rt(k.themeColor||"indigo"),zs($),Os(p.userPermissions),n.classList.add("hidden"),d.style.transform="rotate(0deg)",g("Ambiente Atualizado","Exibindo informações consolidadas.","success");const L=document.querySelector(".sidebar-link.active"),S=L?L.getAttribute("data-target"):"dashboard-section";G(S)}catch(k){console.error("Erro ao aplicar contextos:",k),g("Erro","Ocorreu um problema ao trocar a visualização.","error")}finally{ee&&(ee.classList.add("fade-out"),setTimeout(()=>{ee.style.display="none"},500))}});try{const b=await De(p.establishmentId);p.establishmentName=b.name,p.enabledModules=b.modules,p.currentViewContext={id:p.establishmentId,name:b.name,type:b.parentId?"BRANCH":"GROUP"},typeof Rt=="function"&&Rt(b.themeColor||"indigo"),zs(p.establishmentId),Os(p.userPermissions)}catch(b){console.error(b)}}else t.style.display="none"}catch(l){console.error("Erro ao carregar switcher de contexto:",l),t.style.display="none"}}function G(e,t={}){const a=e.replace("-section","");if(e!=="my-profile-section"){const s=["hierarquia-section","establishments-section","estabelecimento-section","dashboard-section"].includes(e),r=p.enabledModules?.[a]!==!1,i=p.userPermissions===null||p.userPermissions[e]?.view===!0;if(!s&&(!r||!i)){Ve&&(Ve.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>'),document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active")),ae&&ae.classList.contains("absolute")&&(ae.classList.add("hidden"),ne&&ne.classList.add("hidden"));return}}const o=oc[e];o&&Ve&&(document.querySelectorAll(".sidebar-link").forEach(s=>{s.classList.toggle("active",s.getAttribute("data-target")===e)}),Aa&&(ac.forEach(s=>{s.classList.toggle("active",s.getAttribute("data-target")===e)}),setTimeout(sc,50),setTimeout(qa,100)),e==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(s=>s.classList.remove("active")),Ve.innerHTML="",window.innerWidth<768&&ae&&(ae.classList.add("hidden"),ne&&ne.classList.add("hidden")),o(t))}window.navigateTo=G;async function Os(e){const t=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),o=document.getElementById("kpi-today-appointments"),s=document.getElementById("kpi-today-revenue"),r=e===null||e["agenda-section"]?.view===!0,i=e===null||e["financial-section"]?.view===!0;if(r&&t&&(t.classList.remove("hidden"),t.classList.add("inline-flex")),i&&a&&(a.classList.remove("hidden"),a.classList.add("inline-flex")),!(!r&&!i))try{const n=await Wr();r&&o&&(o.textContent=n.todayAppointments.toString()),i&&s&&(s.textContent=`R$ ${n.todayRevenue.toFixed(2).replace(".",",")}`)}catch(n){console.error("Erro ao carregar KPIs do cabeçalho:",n)}}async function nc(e){try{me.getPlatform()==="android"&&await te.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0});let t=await te.checkPermissions();if(t.receive==="prompt"&&(t=await te.requestPermissions()),t.receive!=="granted")return;await te.register(),te.addListener("registration",async a=>{try{const o=yt(fe,"users",e);await Ra(o,{fcmTokens:tr(a.value),platform:"native_mobile"})}catch{}}),te.addListener("pushNotificationReceived",a=>g(a.title,a.body,"info",!0)),te.addListener("pushNotificationActionPerformed",()=>G("agenda-section"))}catch{}}function lc(){const e=document.getElementById("exitConfirmationModal"),t=document.getElementById("btn-cancel-exit"),a=document.getElementById("btn-confirm-exit"),o=()=>e&&(e.style.display="block"),s=()=>e&&(e.style.display="none"),r=()=>e&&e.style.display==="block";e&&(t.addEventListener("click",()=>{s(),me.isNativePlatform()||history.pushState(null,document.title,location.href)}),a.addEventListener("click",()=>{s(),me.isNativePlatform()?os.exitApp():history.back()}),me.isNativePlatform()?os.addListener("backButton",()=>{if(r())s();else{const i=document.querySelectorAll('.modal[style*="display: block"]'),n=Array.from(i).filter(l=>l.id!=="exitConfirmationModal");if(n.length>0){n.forEach(l=>l.style.display="none");return}if(ae&&!ae.classList.contains("hidden")&&window.innerWidth<768){ae.classList.add("hidden"),ne&&ne.classList.add("hidden");return}const d=document.querySelector(".sidebar-link.active");d&&d.getAttribute("data-target")==="dashboard-section"?o():G("dashboard-section")}}):(history.pushState(null,document.title,location.href),window.addEventListener("popstate",()=>{if(r()){s(),history.pushState(null,document.title,location.href);return}const i=document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display: flex"]'),n=Array.from(i).filter(l=>l.id!=="exitConfirmationModal");if(n.length>0){n.forEach(l=>l.style.display="none"),history.pushState(null,document.title,location.href);return}const d=document.querySelector(".sidebar-link.active");d&&d.getAttribute("data-target")==="dashboard-section"?o():(G("dashboard-section"),history.pushState(null,document.title,location.href))})))}function Nt(e){return e?e.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}async function dc(){try{await Go(le,Qo)}catch{}me.isNativePlatform()&&document.body.classList.add("is-app-native"),fr(),lc(),rc(),Ns&&Ns.addEventListener("click",e=>{e.preventDefault();const t=document.documentElement.getAttribute("data-theme");zt(t==="dark"?"light":"dark")}),Rs&&Rs.addEventListener("click",e=>{e.stopPropagation(),ae&&(ae.classList.remove("hidden"),ae.classList.add("absolute","inset-y-0","left-0","z-40","shadow-xl")),ne&&ne.classList.remove("hidden")}),Aa&&(Aa.addEventListener("click",e=>{const t=e.target.closest(".bottom-nav-item");if(!t)return;e.preventDefault();const a=t.getAttribute("data-target");G(a)}),Ke&&Ke.addEventListener("scroll",qa),qa()),ne&&ne.addEventListener("click",()=>{ae&&(ae.classList.add("hidden"),ae.classList.remove("absolute","inset-y-0","left-0","z-40","shadow-xl")),ne.classList.add("hidden")}),fa&&fa.addEventListener("click",e=>{e.stopPropagation(),Ne&&(Ne.classList.toggle("hidden"),Ne.classList.contains("hidden")||(xt.forEach(t=>t.read=!0),Oo()))}),ot&&ot.addEventListener("click",e=>{e.stopPropagation(),se&&(se.classList.toggle("active"),se.classList.contains("active")?se.classList.remove("hidden"):setTimeout(()=>se.classList.add("hidden"),200))}),qs&&qs.addEventListener("click",e=>{e.preventDefault(),G("my-profile-section"),se&&(se.classList.remove("active"),se.classList.add("hidden"))}),document.addEventListener("click",e=>{Ne&&!Ne.contains(e.target)&&e.target!==fa&&Ne.classList.add("hidden"),se&&!se.contains(e.target)&&e.target!==ot&&se.classList.contains("active")&&(se.classList.remove("active"),setTimeout(()=>se.classList.add("hidden"),200))}),Xo(le,async e=>{if(e){if(!me.isNativePlatform()&&(zr(),"Notification"in window&&Notification.permission==="default")){const t=document.getElementById("toast-notification-request"),a=document.getElementById("btn-enable-toast");t&&setTimeout(()=>{t.style.display="block"},3500),a&&a.addEventListener("click",async()=>{await Or()&&t&&(t.style.display="none")});const o=()=>{t&&(t.style.display="none")},s=document.getElementById("btn-deny-toast"),r=document.getElementById("btn-close-toast");s&&s.addEventListener("click",o),r&&r.addEventListener("click",o)}try{const a=(await e.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="admin"||a.role==="employee")&&a.establishmentId){let o=null,s=e.displayName,r=null;const i=yt(fe,"users",e.uid),n=await Vs(i);if(n.exists()){const l=n.data();o=a.role==="employee"?l.permissions||{}:null,s=l.name||s,r=l.professionalId||null}p.userProfessionalId=r,me.isNativePlatform()&&nc(e.uid);const d=s||e.email;ir(a.establishmentId,"Carregando...",o),ot&&(ot.textContent=d.charAt(0).toUpperCase()),Ps&&(Ps.textContent=d),Ms&&(Ms.textContent=e.email),As&&As.addEventListener("click",l=>{l.preventDefault(),ft&&ft(),Yo(le).then(()=>window.location.href="/login.html")}),await ic(a.establishmentId),kr(G,o,p.enabledModules),ee&&(ee.classList.add("fade-out"),setTimeout(()=>{ee.style.display="none"},500)),st&&(st.style.display="flex"),setTimeout(()=>{Lr()},1500),G("dashboard-section")}else throw new Error("Permissão ou estabelecimento não configurado.")}catch(t){console.error("Erro na inicialização:",t),ee&&(ee.style.display="none"),st&&(st.innerHTML=`<div class="w-full h-full flex flex-col items-center justify-center p-4 text-center"><h2>Erro de Acesso</h2><p>${t.message}</p></div>`,st.style.display="flex")}}else window.location.href="/login.html"})}dc();export{Gs as W};
