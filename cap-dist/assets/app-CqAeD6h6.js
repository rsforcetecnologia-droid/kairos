const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-CRPHwZ03.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/firebase-config-C2tbVz-J.js","assets/styles-CZYPZ0h4.css"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as le,d as he,m as ns}from"./firebase-config-C2tbVz-J.js";import{EmailAuthProvider as tr,reauthenticateWithCredential as ar,verifyBeforeUpdateEmail as sr,updatePassword as or,updateProfile as rr,setPersistence as ir,browserLocalPersistence as nr,onAuthStateChanged as lr,signOut as dr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as $t,getDoc as Qs,updateDoc as _a,setDoc as cr,addDoc as Xs,collection as sa,query as Ys,where as Zs,getDocs as ur,deleteDoc as pr,arrayUnion as mr,orderBy as gr,onSnapshot as br}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{getToken as fr,onMessage as xr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const p={userName:null,userProfessionalId:null,userPermissions:null,userRole:null,groupId:null,groupName:null,accessibleCompanies:[],accessibleEstablishments:[],currentViewContext:{type:null,id:null,name:null},establishmentId:null,establishmentName:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function hr(e,t,a){p.establishmentId=e,p.establishmentName=t,p.userPermissions=a,p.currentViewContext={type:"BRANCH",id:e,name:t}}const Ks=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",Sa=Ks?"http://localhost:8080":"https://kairos-app-407358446276.us-central1.run.app";console.log(`🚀 API configurada para modo: ${Ks?"LOCAL (Dev)":"PRODUÇÃO (Cloud)"}`);console.log("📡 URL Base:",Sa);async function vr(){const e=le.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function L(e,t={}){const a=await vr();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const s=Sa.replace(/\/$/,""),o=e.startsWith("/")?e:`/${e}`,r=`${s}${o}`;console.log(`AuthenticatedFetch: ${t.method||"GET"} ${r}`);try{const i=await fetch(r,{...t,headers:{...a,...t.headers}});if(!i.ok){const d=(await i.json().catch(()=>({message:i.statusText}))).message||`Erro na API: ${i.status}`;if(d.includes("FAILED_PRECONDITION")&&d.includes("requires an index")){const l=/(https:\/\/[^\s]+)/,c=d.match(l),u=c?c[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${u}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${i.status}) em ${r}:`,d),new Error(d)}return i.json()}catch(i){throw console.error(`Falha de rede ao tentar acessar ${r}:`,i.message),i.message.includes("Failed to fetch")||i.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${Sa}. Verifique se o servidor backend está rodando.`):i}}const Ua=(e,t,a,s=null)=>{let o=`/api/appointments/${e}?startDate=${t}&endDate=${a}`;return s&&(o+=`&professionalId=${s}`),L(o)},yr=(e,t,a)=>{const s=`/api/appointments/cancelled/${e}?startDate=${t}&endDate=${a}`;return L(s)},wr=({establishmentId:e,professionalId:t,serviceIds:a,date:s})=>{const o=`/api/availability?establishmentId=${e}&professionalId=${t}&serviceIds=${a.join(",")}&date=${s}`;return L(o)},kr=e=>L("/api/appointments",{method:"POST",body:JSON.stringify(e)}),Sr=(e,t)=>L(`/api/appointments/${e}`,{method:"PUT",body:JSON.stringify(t)}),$r=e=>L(`/api/appointments/${e}`,{method:"DELETE"}),Er=e=>L(`/api/appointments/${e}/reopen`,{method:"POST"}),Ir=(e,t)=>L(`/api/appointments/${e}/checkout`,{method:"POST",body:JSON.stringify(t)});let Y;async function Lr(){if(!Y)try{Y=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function Cr(){if(!Y){console.warn("AudioContext não inicializado. O som não será tocado.");return}Y.state==="suspended"&&Y.resume();const e=Y.createOscillator(),t=Y.createGain();e.connect(t),t.connect(Y.destination),e.type="sine",e.frequency.setValueAtTime(800,Y.currentTime),t.gain.setValueAtTime(0,Y.currentTime),t.gain.linearRampToValueAtTime(.3,Y.currentTime+.01),t.gain.exponentialRampToValueAtTime(1e-4,Y.currentTime+.2),e.start(Y.currentTime),e.stop(Y.currentTime+.2)}function g(e,t,a="info",s=!1){const o=document.getElementById("toast-container");if(!o)return;s&&Cr();const r=document.createElement("div"),i={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},n={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},d={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};r.className=`toast ${i[a]||i.info}`,r.innerHTML=`
        <div class="toast-icon">${n[a]||n.info}</div>
        <div class="toast-content">
            <p class="font-bold">${e}</p>
            <p class="text-sm">${t}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${d[a]||d.info}"></div>
        </div>
    `,o.appendChild(r),r.querySelector(".toast-close").addEventListener("click",()=>r.remove()),setTimeout(()=>{r.remove()},4e3)}function J(e,t){const a=document.getElementById("genericModal");return new Promise(s=>{a.innerHTML=`
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
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",s(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",s(!1)}})}function ie({title:e,contentHTML:t,maxWidth:a="max-w-4xl",showCloseButton:s=!0}){let o=document.getElementById("genericModal");const r=o.cloneNode(!1);o.parentNode.replaceChild(r,o),o=r;const i=()=>{o.style.display="none"},n=c=>{o.querySelector("#genericModalContentBody").innerHTML=c};o.innerHTML=`
        <div class="modal-content ${a} p-0 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
            
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${e}</h2>
                ${s?'<button data-close-modal class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>':""}
            </header>

            <div id="genericModalContentBody" class="flex-1 overflow-y-auto p-5">
                ${t}
            </div>
            
            <footer id="genericModalFooter" class="hidden"></footer>
        </div>
    `;const d=o.querySelector("[data-close-modal]");d&&(d.onclick=i);const l=o.querySelector('[data-action="close-modal"]');return l&&(l.onclick=i),o.addEventListener("click",c=>{c.target.closest(".modal-content")||i()}),o.style.display="flex",{modalElement:o,close:i,setContent:n}}function Dr(){document.body.addEventListener("click",()=>{Y||Lr()},{once:!0}),document.addEventListener("click",e=>{const t=e.target.closest('[data-action="close-modal"]');if(t){const s=t.dataset.target;if(s){const o=document.getElementById(s);o&&(o.style.display="none")}}if(e.target.closest("[data-close-modal]")){const s=document.getElementById("genericModal");s&&(s.style.display="none")}})}const X=document.getElementById("sidebar"),Ne=document.getElementById("sidebarToggle"),dt=document.getElementById("mainContent"),Tr=document.querySelectorAll(".sidebar-link"),$a=document.getElementById("menu-search"),ls=document.getElementById("hamburger-menu-btn"),Xe=document.getElementById("mobile-overlay");let ye=!0;function Ce(e){if(!X||!dt)return;X.classList.toggle("collapsed",e),dt.classList.toggle("sidebar-collapsed-shift",e);const t=X.querySelector(".sidebar-search-container"),a=X.querySelectorAll(".sidebar-category");e?(t&&(t.style.display="none"),a.forEach(s=>s.style.display="none"),document.querySelectorAll(".submenu-toggle").forEach(s=>{const o=s.getAttribute("data-target-submenu"),r=document.getElementById(o),i=s.querySelector(".submenu-arrow");r&&(r.classList.add("hidden"),r.classList.remove("flex")),i&&i.classList.remove("rotate-180")})):(t&&(t.style.display="block"),a.forEach(s=>s.style.display="block"))}function Pr(){!X||!Xe||(X.classList.add("mobile-open"),Xe.classList.add("visible"))}function Pt(){!X||!Xe||(X.classList.remove("mobile-open"),Xe.classList.remove("visible"))}function Br(){Ce(!X.classList.contains("collapsed"))}function Mr(e,t){const a=document.getElementById(e);if(!a)return;const s=a.classList.contains("hidden");s&&window.innerWidth>=1024&&X.classList.contains("collapsed")&&Ce(!1),s?(a.classList.remove("hidden"),a.classList.add("flex"),t&&t.classList.add("rotate-180")):(a.classList.add("hidden"),a.classList.remove("flex"),t&&t.classList.remove("rotate-180"))}function Ar(){$a&&$a.addEventListener("input",e=>{const t=e.target.value.toLowerCase().trim(),a=document.getElementById("sidebar-nav");if(!a)return;const s=a.querySelectorAll("li"),o=a.querySelectorAll(".sidebar-category");if(t===""){s.forEach(r=>r.style.display=""),o.forEach(r=>r.style.display="block");return}o.forEach(r=>r.style.display="none"),s.forEach(r=>{if(r.classList.contains("sidebar-category"))return;const i=r.querySelector(".sidebar-link")||r.querySelector(".submenu-toggle");if(!i)return;if(i.textContent.toLowerCase().includes(t)){r.style.display="";const l=r.closest('ul[id$="-submenu"]');if(l){l.classList.remove("hidden"),l.classList.add("flex"),l.parentElement.style.display="";const c=l.parentElement.querySelector(".submenu-toggle");if(c){const u=c.querySelector(".submenu-arrow");u&&u.classList.add("rotate-180")}}}else{const l=i.getAttribute("data-target-submenu");if(l){const c=document.getElementById(l);c&&(Array.from(c.querySelectorAll(".sidebar-link")).some(b=>b.textContent.toLowerCase().includes(t))?r.style.display="":r.style.display="none")}else r.style.display="none"}})})}function qr(e,t,a){if(!X||!dt)return;dt.classList.add("main-content-shift"),window.innerWidth>=1024?(ye=!0,Ce(!1)):window.innerWidth>=768?(ye=!1,Ce(!0)):(dt.classList.remove("main-content-shift","sidebar-collapsed-shift"),Pt()),Ne&&Ne.addEventListener("click",o=>{o.stopPropagation(),window.innerWidth>=768?(ye=!ye,Ce(!ye),ye?(Ne.classList.add("text-indigo-400"),Ne.classList.remove("text-gray-400")):(Ne.classList.remove("text-indigo-400"),Ne.classList.add("text-gray-400"))):Br()}),X.addEventListener("mouseenter",()=>{window.innerWidth>=768&&!ye&&X.classList.contains("collapsed")&&Ce(!1)}),X.addEventListener("mouseleave",()=>{if(window.innerWidth>=768&&!ye){const o=!!document.querySelector("#sidebarToggle:hover"),r=document.activeElement===$a;!o&&!r&&Ce(!0)}}),ls&&ls.addEventListener("click",o=>{o.stopPropagation(),Pr()}),Xe&&Xe.addEventListener("click",o=>{o.stopPropagation(),Pt()});let s=0;X.addEventListener("touchstart",o=>{s=o.changedTouches[0].screenX},{passive:!0}),X.addEventListener("touchend",o=>{const r=o.changedTouches[0].screenX;s-r>50&&Pt()},{passive:!0}),document.querySelectorAll(".submenu-toggle").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation();const i=o.getAttribute("data-target-submenu"),n=o.querySelector(".submenu-arrow");Mr(i,n)})}),Ar(),Tr.forEach(o=>{const r=o.getAttribute("data-target");if(!r)return;const i=r.replace("-section",""),n=a?.[i]!==!1,d=t===null||t[r]?.view===!0;if(!n||!d){o.parentElement&&o.parentElement.tagName==="LI"?o.parentElement.style.display="none":o.style.display="none";return}o.addEventListener("click",l=>{l.preventDefault(),document.querySelectorAll(".sidebar-link").forEach(c=>c.classList.remove("active")),o.classList.add("active"),r&&typeof e=="function"&&e(r),window.innerWidth<768&&Pt()})})}const Nr=e=>L("/api/establishments/",{method:"POST",body:JSON.stringify(e)}),ve=()=>L("/api/establishments/hierarchy",{method:"GET"}),Pe=e=>{const t=e||p.establishmentId;return t?L(`/api/establishments/${t}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Wa=(e,t)=>{const a=e||p.establishmentId;return a?L(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(t)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},jr=(e,t)=>{const a=e||p.establishmentId;return a?L(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Rr=(e,t)=>{const a=e||p.establishmentId;return a?L(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))};class Fr{constructor(t,a,s){this.steps=t,this.currentStep=0,this.onComplete=a,this.onSkip=s,this.isActive=!1,this.overlay=null,this.spotlight=null,this.popover=null,this.handleResize=this.handleResize.bind(this)}start(){this.isActive||(this.isActive=!0,this.createElements(),window.addEventListener("resize",this.handleResize),this.renderStep())}stop(t=!1){this.isActive=!1,window.removeEventListener("resize",this.handleResize),this.overlay&&this.overlay.remove(),this.spotlight&&this.spotlight.remove(),this.popover&&this.popover.remove(),t&&this.onComplete?this.onComplete():!t&&this.onSkip&&this.onSkip()}createElements(){this.overlay=document.createElement("div"),this.overlay.className="fixed inset-0 bg-black/60 z-[99990] transition-opacity duration-300",document.body.appendChild(this.overlay),this.spotlight=document.createElement("div"),this.spotlight.className="absolute rounded-xl z-[99991] transition-all duration-500 ease-in-out pointer-events-none bg-transparent",this.spotlight.style.boxShadow="0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255,255,255,0.5) inset",document.body.appendChild(this.spotlight),this.popover=document.createElement("div"),this.popover.className="absolute z-[99992] bg-white rounded-2xl shadow-2xl w-[320px] transition-all duration-500 ease-in-out opacity-0 transform scale-95 border border-gray-100 flex flex-col",document.body.appendChild(this.popover)}async renderStep(){if(this.currentStep>=this.steps.length){this.stop(!0);return}const t=this.steps[this.currentStep];this.popover.style.opacity="0",this.popover.style.transform="scale(0.95)",t.onBefore&&(await t.onBefore(),await this.sleep(600));const a=await this.waitForElement(t.targetSelector,3e3);if(a){a.scrollIntoView({behavior:"smooth",block:"center"}),await this.sleep(300);const o=a.getBoundingClientRect(),r=8;this.spotlight.style.top=`${o.top+window.scrollY-r}px`,this.spotlight.style.left=`${o.left+window.scrollX-r}px`,this.spotlight.style.width=`${o.width+r*2}px`,this.spotlight.style.height=`${o.height+r*2}px`,this.spotlight.style.display="block",this.overlay.style.display="none",this.positionPopover(o)}else this.spotlight.style.display="none",this.overlay.style.display="block",this.popover.style.top="50%",this.popover.style.left="50%",this.popover.style.transform="translate(-50%, -50%) scale(1)";const s=this.currentStep===this.steps.length-1;this.popover.innerHTML=`
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
                            ${s?'Concluir <i class="bi bi-check2"></i>':'Próximo <i class="bi bi-chevron-right"></i>'}
                        </button>
                    </div>
                </div>
                <div class="absolute -top-3 -right-3 bg-indigo-100 text-indigo-800 text-[10px] font-black px-2 py-1 rounded-full border-2 border-white shadow-sm">
                    ${this.currentStep+1} / ${this.steps.length}
                </div>
            </div>
        `,setTimeout(()=>{a&&(this.popover.style.transform="scale(1)"),this.popover.style.opacity="1"},50),document.getElementById("tour-next-btn").onclick=()=>{this.currentStep++,this.renderStep()},document.getElementById("tour-prev-btn")&&(document.getElementById("tour-prev-btn").onclick=()=>{this.currentStep--,this.renderStep()}),document.getElementById("tour-skip-btn").onclick=()=>this.stop(!1)}positionPopover(t){const a=this.popover.getBoundingClientRect(),s=20;let o=t.bottom+window.scrollY+s,r=t.left+window.scrollX;o+a.height>window.scrollY+window.innerHeight&&(o=t.top+window.scrollY-a.height-s),r+a.width>window.innerWidth&&(r=t.right+window.scrollX-a.width),r<s&&(r=s),this.popover.style.top=`${o}px`,this.popover.style.left=`${r}px`}handleResize(){this.isActive&&this.renderStep()}sleep(t){return new Promise(a=>setTimeout(a,t))}async waitForElement(t,a){if(!t)return null;const s=Date.now();for(;Date.now()-s<a;){const o=document.querySelector(t);if(o)return o;await this.sleep(100)}return null}}async function Hr(){try{console.log("A verificar Onboarding interativo...");const e=await Pe(p.establishmentId);if(!e||e.parentId||e.onboardingCompleted)return;const t=[{title:"Bem-vindo ao Kairos!",icon:"👋",content:"Preparei um tour rápido para lhe mostrar onde deve configurar as 3 coisas mais importantes antes de receber agendamentos. Vamos a isso?",targetSelector:null},{title:"Perfil e Dados da Loja",icon:"🏢",content:"É aqui em 'Minha Empresa' que você define o nome do Salão, telefone, endereço e faz o upload da sua Logomarca.",targetSelector:'[data-target="estabelecimento-section"]',onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Cores e Personalização",icon:"🎨",content:"Nesta área você pode mudar a cor principal do sistema para ficar com a cara da sua marca. O link do seu cliente vai usar esta cor!",targetSelector:"#themeColor",onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Criação de Serviços",icon:"✂️",content:"Na aba 'Serviços' é onde a mágica acontece. Crie os serviços que os seus clientes vão poder agendar, informando o preço e a duração de cada um.",targetSelector:'[data-target="servicos-section"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Novo Serviço",icon:"➕",content:"Sempre que precisar adicionar um novo serviço ao menu, basta clicar neste botão verde.",targetSelector:'[data-action="new-service"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Gestão da Equipe",icon:"👥",content:"E para terminar: a 'Equipa'. Aqui você cadastra os profissionais, define quem faz qual serviço e ajusta a jornada de trabalho semanal de cada um.",targetSelector:'[data-target="profissionais-section"]',onBefore:async()=>{window.navigateTo("profissionais-section")}},{title:"Tudo Pronto!",icon:"🚀",content:"Você já conhece o caminho! Preencha as informações do seu negócio com calma. Quando terminar, volte à Agenda e partilhe o seu Link de Agendamento com os clientes!",targetSelector:null,onBefore:async()=>{window.navigateTo("agenda-section")}}],a=async()=>{try{await Wa(p.establishmentId,{onboardingCompleted:!0}),showNotification("Tour Concluído","Você já pode configurar o seu sistema livremente!","success")}catch(o){console.error("Erro ao gravar fim do onboarding",o)}};new Fr(t,a,a).start()}catch(e){console.error("Erro fatal ao iniciar onboarding:",e)}}var Ye;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(Ye||(Ye={}));class ga extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const Or=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},zr=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},o=()=>t!==null?t.name:Or(e),r=()=>o()!=="web",i=u=>{const m=l.get(u);return!!(m?.platforms.has(o())||n(u))},n=u=>{var m;return(m=a.PluginHeaders)===null||m===void 0?void 0:m.find(b=>b.name===u)},d=u=>e.console.error(u),l=new Map,c=(u,m={})=>{const b=l.get(u);if(b)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),b.proxy;const v=o(),k=n(u);let x;const P=async()=>(!x&&v in m?x=typeof m[v]=="function"?x=await m[v]():x=m[v]:t!==null&&!x&&"web"in m&&(x=typeof m.web=="function"?x=await m.web():x=m.web),x),I=(D,T)=>{var j,F;if(k){const z=k?.methods.find(H=>T===H.name);if(z)return z.rtype==="promise"?H=>a.nativePromise(u,T.toString(),H):(H,B)=>a.nativeCallback(u,T.toString(),H,B);if(D)return(j=D[T])===null||j===void 0?void 0:j.bind(D)}else{if(D)return(F=D[T])===null||F===void 0?void 0:F.bind(D);throw new ga(`"${u}" plugin is not implemented on ${v}`,Ye.Unimplemented)}},$=D=>{let T;const j=(...F)=>{const z=P().then(H=>{const B=I(H,D);if(B){const _=B(...F);return T=_?.remove,_}else throw new ga(`"${u}.${D}()" is not implemented on ${v}`,Ye.Unimplemented)});return D==="addListener"&&(z.remove=async()=>T()),z};return j.toString=()=>`${D.toString()}() { [capacitor code] }`,Object.defineProperty(j,"name",{value:D,writable:!1,configurable:!1}),j},h=$("addListener"),f=$("removeListener"),C=(D,T)=>{const j=h({eventName:D},T),F=async()=>{const H=await j;f({eventName:D,callbackId:H},T)},z=new Promise(H=>j.then(()=>H({remove:F})));return z.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await F()},z},q=new Proxy({},{get(D,T){switch(T){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return k?C:h;case"removeListener":return f;default:return $(T)}}});return s[u]=q,l.set(u,{name:u,proxy:q,platforms:new Set([...Object.keys(m),...k?[v]:[]])}),q};return a.convertFileSrc||(a.convertFileSrc=u=>u),a.getPlatform=o,a.handleError=d,a.isNativePlatform=r,a.isPluginAvailable=i,a.registerPlugin=c,a.Exception=ga,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Vr=e=>e.Capacitor=zr(e),pe=Vr(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),oa=pe.registerPlugin;class eo{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const r=this.windowListeners[t];r&&!r.registered&&this.addWindowListener(r),s&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const o=this.listeners[t];if(!o){if(s){let r=this.retainedEventArguments[t];r||(r=[]),r.push(a),this.retainedEventArguments[t]=r}return}o.forEach(r=>r(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new pe.Exception(t,Ye.Unimplemented)}unavailable(t="not available"){return new pe.Exception(t,Ye.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const o=s.indexOf(a);this.listeners[t].splice(o,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const ds=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),cs=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class _r extends eo{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[o,r]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");o=cs(o).trim(),r=cs(r).trim(),a[o]=r}),a}async setCookie(t){try{const a=ds(t.key),s=ds(t.value),o=`; expires=${(t.expires||"").replace("expires=","")}`,r=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${o}; path=${r}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}oa("CapacitorCookies",{web:()=>new _r});const Ur=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const o=s.result;t(o.indexOf(",")>=0?o.split(",")[1]:o)},s.onerror=o=>a(o),s.readAsDataURL(e)}),Wr=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(o=>o.toLocaleLowerCase()).reduce((o,r,i)=>(o[r]=e[t[i]],o),{})},Jr=(e,t=!0)=>e?Object.entries(e).reduce((s,o)=>{const[r,i]=o;let n,d;return Array.isArray(i)?(d="",i.forEach(l=>{n=t?encodeURIComponent(l):l,d+=`${r}=${n}&`}),d.slice(0,-1)):(n=t?encodeURIComponent(i):i,d=`${r}=${n}`),`${s}&${d}`},"").substr(1):null,Gr=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),o=Wr(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(o.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[i,n]of Object.entries(e.data||{}))r.set(i,n);a.body=r.toString()}else if(o.includes("multipart/form-data")||e.data instanceof FormData){const r=new FormData;if(e.data instanceof FormData)e.data.forEach((n,d)=>{r.append(d,n)});else for(const n of Object.keys(e.data))r.append(n,e.data[n]);a.body=r;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(o.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class Qr extends eo{async request(t){const a=Gr(t,t.webFetchExtra),s=Jr(t.params,t.shouldEncodeUrlParams),o=s?`${t.url}?${s}`:t.url,r=await fetch(o,a),i=r.headers.get("content-type")||"";let{responseType:n="text"}=r.ok?t:{};i.includes("application/json")&&(n="json");let d,l;switch(n){case"arraybuffer":case"blob":l=await r.blob(),d=await Ur(l);break;case"json":d=await r.json();break;case"document":case"text":default:d=await r.text()}const c={};return r.headers.forEach((u,m)=>{c[m]=u}),{data:d,headers:c,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}oa("CapacitorHttp",{web:()=>new Qr});const ae=oa("PushNotifications",{}),Xr="modulepreload",Yr=function(e){return"/"+e},us={},Zr=function(t,a,s){let o=Promise.resolve();if(a&&a.length>0){let d=function(l){return Promise.all(l.map(c=>Promise.resolve(c).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),n=i?.nonce||i?.getAttribute("nonce");o=d(a.map(l=>{if(l=Yr(l),l in us)return;us[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":Xr,c||(m.as="script"),m.crossOrigin="",m.href=l,n&&m.setAttribute("nonce",n),document.head.appendChild(m),c)return new Promise((b,v)=>{m.addEventListener("load",b),m.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(i){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=i,window.dispatchEvent(n),!n.defaultPrevented)throw i}return o.then(i=>{for(const n of i||[])n.status==="rejected"&&r(n.reason);return t().catch(r)})},ps=oa("App",{web:()=>Zr(()=>import("./web-CRPHwZ03.js"),__vite__mapDeps([0,1,2,3])).then(e=>new e.AppWeb)}),Kr="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let ms=!1;async function ei(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await ae.removeAllListeners(),await ae.addListener("registration",async a=>{ao(a.value,!0)}),await ae.addListener("pushNotificationReceived",a=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",a)}),await ae.addListener("pushNotificationActionPerformed",a=>{const s=a.notification.data;console.log("Notificação clicada (Ação):",s)});let t=await ae.checkPermissions();t.receive==="prompt"&&(t=await ae.requestPermissions()),t.receive==="granted"&&await ae.register()}catch(t){console.error("[Push Nativo] Erro:",t)}return}"Notification"in window&&Notification.permission==="granted"&&to()}async function ti(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await to(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(e){return console.error("Erro ao pedir permissão Web:",e),!1}}async function to(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await e.update();const t=await fr(ns,{vapidKey:Kr,serviceWorkerRegistration:e});t?(console.log("[Push Web] Token validado."),await ao(t,!1)):console.warn("[Push Web] Token veio vazio."),ms||(xr(ns,a=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",a)}),ms=!0)}catch(e){console.error("[Push Web] Falha no registo:",e)}else console.warn("Navegador sem suporte a Service Worker.")}async function ao(e,t){const a=le.currentUser;if(!a){console.warn("Usuário não logado. Token não salvo.");return}const s=$t(he,"users",a.uid);try{const o=await Qs(s);if(o.exists()){const i=o.data().fcmTokens||[];if(i.length===1&&i[0]===e){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await _a(s,{fcmTokens:[e],lastLoginAt:new Date().toISOString(),platform:t?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(o){if(o.code==="not-found")try{await cr(s,{email:a.email,fcmTokens:[e],platform:t?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(r){console.error("Erro ao criar user:",r)}else console.error("Erro ao atualizar token:",o)}}const ai=(e,t,a="all",s="all")=>{const o=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&o.append("professionalId",a),s&&s!=="all"&&o.append("costCenterId",s),L(`/api/reports/indicators?${o.toString()}`)},si=(e,t="all")=>{const a=new URLSearchParams({date:e});return t&&t!=="all"&&a.append("professionalId",t),L(`/api/reports/appointments/list?${a.toString()}`)},oi=e=>e?L(`/api/financial/cost-centers/${e}`):Promise.resolve([]),ri=(e,t,a)=>{const s=new URLSearchParams({startDate:t,endDate:a});return L(`/api/analytics/${e}?${s.toString()}`)},Gt=({establishmentId:e,startDate:t,endDate:a,cashierSessionId:s})=>{const o=new URLSearchParams({startDate:t,endDate:a});return s&&s!=="all"&&o.append("cashierSessionId",s),e&&o.append("establishmentId",e),L(`/api/reports/sales?${o.toString()}`)},ii=(e,t,a)=>L(`/api/analytics/${e}/monthly-details?year=${t}&month=${a}`),ni=(e,t,a,s)=>{const o=`/api/analytics/${e}/daily-details?year=${t}&month=${a}&day=${s}`;return L(o)},li=(e,t,a,s)=>{const o=`/api/analytics/${e}/professional-details?year=${t}&month=${a}&professionalId=${s}`;return L(o)},di=(e,t,a,s)=>L(`/api/reports/commissions/${e}?year=${t}&month=${a}&professionalId=${s}`),so=()=>L("/api/reports/summary",{method:"GET"}),ci=Object.freeze(Object.defineProperty({__proto__:null,getAdvancedIndicators:ai,getAnalytics:ri,getCommissionReport:di,getCostCenters:oi,getDailyAppointments:si,getDailyTransactions:ni,getMonthlyAnalytics:ii,getProfessionalMonthlyDetails:li,getSalesReport:Gt,getSummaryKPIs:so},Symbol.toStringTag,{value:"Module"})),Ja=e=>e?String(e).replace(/\D/g,""):"",Et=(e,t="",a=20,s={})=>{const o=new URLSearchParams;return t&&o.append("search",t),a&&o.append("limit",a),s&&s.hasLoyalty&&o.append("hasLoyalty","true"),s&&s.birthMonth&&o.append("birthMonth",s.birthMonth),s&&s.inactiveDays&&o.append("inactiveDays",s.inactiveDays),L(`/api/clients/${e}?${o.toString()}`)},oo=(e,t)=>{const a=encodeURIComponent(t);return L(`/api/clients/details/${e}/${a}`)},ro=e=>{const t=e.phone||e.id;if(!t)throw new Error("Telefone é obrigatório");const a=Ja(t),s={...e,phone:a,id:a};return L(`/api/clients/${a}`,{method:"PUT",body:JSON.stringify(s)})},io=ro,no=(e,t)=>ro({...t,id:e}),ui=e=>{const t=encodeURIComponent(e);return L(`/api/clients/${t}`,{method:"DELETE"})},pi=(e,t,a,s)=>L("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:e,clientPhone:Ja(t),points:a,rewardName:s})}),mi=(e,t)=>oo(e,Ja(t));function w(e){return e==null?"":String(e).replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t])}function lo(e,t=800,a=800,s=.7){return new Promise((o,r)=>{if(!e.type.match(/image.*/))return r(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.readAsDataURL(e),i.onload=n=>{const d=new Image;d.src=n.target.result,d.onload=()=>{let l=d.width,c=d.height;l>c?l>t&&(c*=t/l,l=t):c>a&&(l*=a/c,c=a);const u=document.createElement("canvas");u.width=l,u.height=c,u.getContext("2d").drawImage(d,0,0,l,c);const b=u.toDataURL("image/jpeg",s);o(b)},d.onerror=l=>r(new Error("Erro ao carregar a imagem para processamento."))},i.onerror=n=>r(new Error("Erro ao ler o ficheiro."))})}let ba=null;async function gi(){const e=document.getElementById("content");e.innerHTML=`
        <div class="flex items-center justify-center h-full min-h-[60vh]">
            <div class="flex flex-col items-center">
                <div class="w-10 h-10 border-4 border-indigo-50 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                <p class="text-slate-400 font-medium text-sm">A processar dados consolidados...</p>
            </div>
        </div>
    `;try{const t=new Date,a=new Date(t.getFullYear(),t.getMonth(),t.getDate()),s=new Date(a);s.setHours(23,59,59,999);const o=new Date(a.getFullYear(),a.getMonth(),1),r=new Date(a);r.setDate(a.getDate()-6);const i=p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments:[p.establishmentId],n=i.map(async B=>{const[_,ee]=await Promise.all([Ua(B,o.toISOString(),s.toISOString(),null),Et(B)]);return{appts:_||[],clients:ee||[]}}),d=await Promise.all(n);let l=[],c=[];d.forEach(B=>{l=l.concat(B.appts),c=c.concat(B.clients)});const u=B=>(B.services||[]).reduce((_,ee)=>_+(Number(ee.price)||0),0)||Number(B.totalPrice||0)||Number(B.servicePrice||0),m=l.filter(B=>{const _=new Date(B.startTime);return _>=a&&_<=s}),b=m.filter(B=>B.status==="completed"),v=l.filter(B=>B.status==="completed"),k=b.reduce((B,_)=>B+u(_),0),x=v.reduce((B,_)=>B+u(_),0),P=m.length,I=v.length>0?x/v.length:0,$=[],h=[],f=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];for(let B=0;B<7;B++){const _=new Date(r);_.setDate(r.getDate()+B),$.push(f[_.getDay()]);const ee=new Date(_).setHours(0,0,0,0),re=new Date(_).setHours(23,59,59,999),Ee=l.filter(Dt=>{const Tt=new Date(Dt.startTime).getTime();return Dt.status==="completed"&&Tt>=ee&&Tt<=re}).reduce((Dt,Tt)=>Dt+u(Tt),0);h.push(Ee)}const C={labels:$,data:h},q=m.filter(B=>new Date(B.startTime).getTime()>=t.getTime()&&B.status!=="completed"&&B.status!=="cancelled").sort((B,_)=>new Date(B.startTime)-new Date(_.startTime)).slice(0,4).map(B=>({client:B.clientName||"Desconhecido",service:B.serviceName||(B.services&&B.services[0]?B.services[0].name:"Serviço"),time:new Date(B.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),prof:(B.professionalName||"").split(" ")[0]||"Profissional",id:B.id})),D=`${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}`,T=new Map;c.forEach(B=>{B.phone?T.set(B.phone,B):T.set(B.id||Math.random().toString(),B)});const F=Array.from(T.values()).filter(B=>{if(!B.birthDate)return!1;let _,ee;if(B.birthDate.includes("-")){const re=B.birthDate.split("-");re[0].length===4?(_=re[1],ee=re[2]):(ee=re[0],_=re[1])}else if(B.birthDate.includes("/")){const re=B.birthDate.split("/");ee=re[0],_=re[1]}return`${ee}/${_}`===D}).map(B=>{let _="";return B.birthDate&&B.birthDate.includes("-")&&B.birthDate.split("-")[0].length===4&&(_=a.getFullYear()-parseInt(B.birthDate.split("-")[0])),{name:B.name,age:_,phone:B.phone}}),z={receitaHoje:k,agendamentosHoje:P,receitaMes:x,ticketMedio:I},H=i.length>1;bi(e,z,C,q,F,H),fi(C),xi()}catch(t){console.error("Erro ao carregar dashboard:",t),e.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full min-h-[60vh] text-slate-500">
                <i class="bi bi-exclamation-circle text-4xl mb-3 text-rose-400"></i>
                <p class="font-medium text-sm">Ocorreu um erro ao carregar os dados.</p>
                <button onclick="window.navigateTo('dashboard-section')" class="mt-4 px-5 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">Tentar Novamente</button>
            </div>
        `}}function bi(e,t,a,s,o,r){const i=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),n=r?'<span class="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 align-middle">CONSOLIDADO</span>':"";e.innerHTML=`
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
                            ${s.length>0?s.map(d=>`
                                <div data-action="goto-agenda" class="flex items-center justify-between p-3.5 rounded-[14px] border border-slate-100/60 bg-slate-50/50 hover:bg-indigo-50/30 hover:border-indigo-100 transition-all cursor-pointer group">
                                    <div class="flex items-center gap-4">
                                        <div class="w-11 h-11 rounded-full bg-white border border-slate-200 flex flex-col items-center justify-center flex-shrink-0 text-indigo-600 shadow-sm">
                                            <span class="font-semibold text-sm">${d.time.split(":")[0]}</span><span class="text-[8px] font-medium leading-none text-slate-400">${d.time.split(":")[1]}</span>
                                        </div>
                                        <div>
                                            <p class="font-medium text-slate-700 text-sm group-hover:text-indigo-700 transition-colors">${w(d.client)}</p>
                                            <p class="text-[11px] text-slate-500 font-normal mt-0.5">${w(d.service)} <span class="mx-1 text-slate-300">•</span> ${w(d.prof)}</p>
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
                            ${o.length>0?o.map(d=>{const c=`https://wa.me/${(d.phone||"").replace(/\D/g,"")}?text=${encodeURIComponent(`Olá ${d.name.split(" ")[0]}! A equipa deseja-lhe um Feliz Aniversário! 🎉`)}`;return`
                                <div class="flex items-center justify-between p-3 rounded-[12px] border border-rose-50 bg-rose-50/30">
                                    <div class="flex items-center gap-3">
                                        <div class="w-9 h-9 rounded-full bg-rose-100/70 text-rose-500 flex items-center justify-center font-semibold text-sm">
                                            ${w(d.name).charAt(0)}
                                        </div>
                                        <div>
                                            <p class="font-medium text-slate-700 text-[0.8rem]">${w(d.name)}</p>
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
    `}function fi(e){const t=document.getElementById("revenueChart");if(!t)return;ba&&ba.destroy();const s=t.getContext("2d").createLinearGradient(0,0,0,240);s.addColorStop(0,"rgba(79, 70, 229, 0.15)"),s.addColorStop(1,"rgba(79, 70, 229, 0.01)"),ba=new Chart(t,{type:"line",data:{labels:e.labels,datasets:[{label:"Receita (R$)",data:e.data,borderColor:"#6366f1",backgroundColor:s,borderWidth:2.5,pointBackgroundColor:"#ffffff",pointBorderColor:"#6366f1",pointBorderWidth:2,pointRadius:3,pointHoverRadius:5,fill:!0,tension:.35}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{backgroundColor:"#1e293b",padding:12,cornerRadius:8,titleFont:{size:12,family:"Inter",weight:"normal"},bodyFont:{size:13,weight:"bold",family:"Inter"},displayColors:!1,callbacks:{label:function(o){return o.parsed.y!==null?new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(o.parsed.y):""}}}},scales:{y:{beginAtZero:!0,grid:{color:"#f8fafc",drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Inter",size:10},maxTicksLimit:6,callback:function(o){return"R$ "+o}}},x:{grid:{display:!1,drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Inter",size:11,weight:"500"}}}},interaction:{intersect:!1,mode:"index"}}})}function xi(){document.getElementById("content").addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(!a)return;switch(a.dataset.action){case"goto-agenda":G("agenda-section");break;case"new-appointment":G("agenda-section");break;case"goto-pdv":G("comandas-section");break;case"goto-clients":G("clientes-section");break;case"open-link":const o=`${window.location.origin}/cliente.html?id=${p.establishmentId||""}`;window.open(o,"_blank");break}})}const Ae=e=>L(`/api/services/${e}`),hi=e=>L("/api/services",{method:"POST",body:JSON.stringify(e)}),vi=(e,t)=>L(`/api/services/${e}`,{method:"PUT",body:JSON.stringify(t)}),yi=e=>L(`/api/services/${e}`,{method:"DELETE"}),wi=(e,t)=>L(`/api/services/${e}/status`,{method:"PATCH",body:JSON.stringify({active:t})}),ki=e=>L(`/api/services/stats/most-popular/${e}`),ge=e=>L(`/api/professionals/${e}`),Si=e=>L(`/api/professionals/details/${e}`),$i=e=>L("/api/professionals",{method:"POST",body:JSON.stringify(e)}),Ei=(e,t)=>L(`/api/professionals/${e}`,{method:"PUT",body:JSON.stringify(t)}),co=e=>L(`/api/professionals/${e}`,{method:"DELETE"}),Ii=e=>{const t=e.map(a=>co(a));return Promise.all(t)},ra=(e,t,a,s="all")=>{const o=`/api/blockages/${e}?startDate=${t}&endDate=${a}&professionalId=${s}`;return L(o)},ia=e=>L("/api/blockages",{method:"POST",body:JSON.stringify(e)}),Ga=e=>L(`/api/blockages/${e}`,{method:"DELETE"}),uo=e=>L("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:e})}),gs=document.getElementById("content");let bs=!1;const Ea=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5",light:"#c7d2fe"},{bg:"#d1fae5",border:"#059669",main:"#059669",light:"#a7f3d0"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48",light:"#fecdd3"},{bg:"#fef3c7",border:"#d97706",main:"#d97706",light:"#fde68a"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490",light:"#a5f3fc"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7",light:"#bae6fd"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed",light:"#ddd6fe"},{bg:"#fce7f3",border:"#db2777",main:"#db2777",light:"#fbcfe8"}];let na=[],Ia=[],Qt={},po=[],N={currentView:window.innerWidth<768?"list":"week",currentDate:new Date,selectedProfessionalId:"all",showInactiveProfs:!1,isSelectionMode:!1,selectedItems:new Set},R={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function Qa(e){const t=new Date(e),a=t.getDay(),s=t.getDate()-a+(a===0?-6:1);return t.setDate(s),t.setHours(0,0,0,0),t}function Xa(){const e=document.getElementById("profSelectorContainer");if(!e||!p.professionals)return;let t=p.professionals.filter(o=>N.showInactiveProfs||o.status!=="inactive");const s=[...[{id:"all",name:"Todos",photo:null}],...t];e.innerHTML=s.map(o=>{const r=N.selectedProfessionalId===o.id,i=o.name==="Todos"?"T":o.name.charAt(0).toUpperCase(),n=o.id!=="all"?p.professionalColors.get(o.id)||Ea[0]:{main:"#adb5bd",light:"#f1f3f5"};return`
            <div class="prof-pill ${r?"active":""}"
                 data-action="select-professional" data-prof-id="${o.id}"
                 style="--pc: ${n.main}; --pb: ${r?n.bg:""}; --pl: ${n.light};">
                <div class="prof-pill-dot" ${o.photo?`style="background-image: url('${U(o.photo)}'); background-size: cover; background-position: center;"`:""}>
                    ${o.photo?"":i}
                </div>
                <span>${U(o.name==="Todos"?"Todos":o.name.split(" ")[0])}</span>
            </div>`}).join("")}function U(e){return w(e||"")}function Li(e,t,a,s,o){const r=(e||"").replace(/\D/g,""),i=new Date(o).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),n=new Date(o).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=`Olá, ${t}! Você tem um agendamento de ${a} com ${s} para ${i} às ${n}. Podemos confirmar?`;return`https://wa.me/${r}?text=${encodeURIComponent(d)}`}function Ci(e){const t=document.getElementById("agenda-view");if(!t)return;const a=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],s=Qa(N.currentDate),o=new Date;o.setHours(0,0,0,0);let r='<div class="week-container" id="weekScroller">';for(let i=0;i<7;i++){const n=new Date(s);n.setDate(s.getDate()+i);const d=n.toDateString()===o.toDateString(),l=e.filter(u=>new Date(u.startTime).toDateString()===n.toDateString()).sort((u,m)=>new Date(u.startTime)-new Date(m.startTime));let c="";l.length===0?c='<div class="week-empty"><i class="bi bi-dash-lg" style="font-size:1rem;display:block;margin-bottom:4px;"></i>Sem agendamentos</div>':c=l.map(u=>{const b=new Date(u.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),v=p.professionalColors.get(u.professionalId)||{main:"#adb5bd"},k=u.status==="completed",x=N.selectedItems.has(u.id);if(u.type==="blockage")return`<div class="week-event-chip week-blockage">
                        <div class="we-time"><i class="bi bi-lock me-1"></i>${b}</div>
                        <div class="we-client">${U(u.reason)}</div>
                        <div class="we-service">${U(u.professionalName)}</div>
                    </div>`;const P=JSON.stringify(u).replace(/'/g,"&apos;"),I=x?"box-shadow: 0 0 0 2px #4f46e5; background-color: #eff6ff;":"",$=N.isSelectionMode?`<div style="position:absolute; top:6px; right:6px; z-index:1;">
                           <input type="checkbox" style="width:16px; height:16px; accent-color:#4f46e5; pointer-events:none;" ${x?"checked":""}>
                       </div>`:"";return`<div class="week-event-chip ${k?"completed":""}" style="--ec: ${v.main}; ${I}"
                    data-action="edit-appointment" data-appointment='${P}'>
                    ${$}
                    <div class="we-time">${b}</div>
                    <div class="we-client" style="${N.isSelectionMode?"padding-right:20px;":""}">${U(u.clientName)}</div>
                    <div class="we-service">${U(u.serviceName)} · ${U((u.professionalName||"").split(" ")[0])}</div>
                    ${N.isSelectionMode?"":`
                    <div class="we-actions">
                        <button class="we-btn" data-action="open-comanda" data-appointment='${P}' title="Comanda">
                            <i class="bi bi-receipt"></i>
                        </button>
                    </div>`}
                </div>`}).join(""),r+=`<div class="week-day-col">
            <div class="week-day-header ${d?"is-today":""}">
                <div class="wd-name">${d?"Hoje":a[i]}</div>
                <div class="wd-num">${n.getDate()}</div>
            </div>
            <div class="week-day-events">${c}</div>
        </div>`}r+="</div>",t.innerHTML=r,requestAnimationFrame(()=>{const i=document.getElementById("weekScroller");if(i&&window.innerWidth<768){const n=i.querySelector(".is-today");n&&n.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}})}function Di(e){const t=document.getElementById("agenda-view");if(!t)return;if(e.sort((o,r)=>new Date(o.startTime)-new Date(r.startTime)),e.length===0){t.innerHTML=`
            <div class="list-container" style="min-height:50vh;display:flex;align-items:center;justify-content:center;">
                <div class="text-center" style="max-width:220px;">
                    <div style="width:52px;height:52px;background:#f1f3f5;border-radius:14px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px;">
                        <i class="bi bi-calendar-check" style="font-size:1.3rem;color:#adb5bd;"></i>
                    </div>
                    <p style="font-size:0.85rem;font-weight:600;color:#495057;margin-bottom:4px;">Nenhum agendamento</p>
                    <p style="font-size:0.7rem;color:#868e96;">Toque em + para criar um novo.</p>
                </div>
            </div>`;return}const a={};e.forEach(o=>{const r=new Date(o.startTime).toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});a[r]||(a[r]=[]),a[r].push(o)});let s='<div class="list-container">';Object.entries(a).forEach(([o,r])=>{s+=`<div class="list-date-group">
            <div class="list-date-label">${o}</div>`,r.forEach(i=>{const n=new Date(i.startTime),d=new Date(i.endTime),l=Math.round((d-n)/6e4),c=n.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),u=p.professionalColors.get(i.professionalId)||{main:"#adb5bd"},m=i.status==="completed",b=JSON.stringify(i).replace(/'/g,"&apos;"),v=N.selectedItems.has(i.id),k=N.isSelectionMode?`<div style="display:flex; align-items:center; margin-right: 12px; margin-left: 4px;">
                       <input type="checkbox" style="width:20px; height:20px; accent-color:#4f46e5; pointer-events:none;" ${v?"checked":""}>
                   </div>`:"",x=v?"box-shadow: 0 0 0 2px #4f46e5; background-color: #eff6ff;":"";if(i.type==="blockage"){s+=`<div class="list-card blockage">
                    ${k}
                    <div class="list-card-time"><div class="t-start" style="color:#c92a2a;">${c}</div><div class="t-dur">Bloqueio</div></div>
                    <div class="list-card-dot" style="--dc:#e03131;"></div>
                    <div class="list-card-info">
                        <div class="lc-name" style="color:#c92a2a;">${U(i.reason)}</div>
                        <div class="lc-detail">${U(i.professionalName)}</div>
                    </div>
                </div>`;return}const P=Li(i.clientPhone,i.clientName,i.serviceName,i.professionalName,i.startTime),I=(i.services||[]).reduce((C,q)=>C+(Number(q.price)||0),0)||Number(i.totalPrice||0)||Number(i.servicePrice||0),$=i.paymentStatus||(i.status==="completed"?"Finalizado":"Agendado"),h=U((i.professionalName||"").split(" ")[0]),f=(i.services||[]).length||(i.serviceName?1:0);s+=`<div class="list-card ${m?"completed":""}" style="${x}"
                data-action="edit-appointment" data-appointment='${b}'>
                ${k}
                <div class="list-card-time">
                    <div class="t-start ${m?"opacity-50 line-through":""}">${c}</div>
                    <div class="t-dur">${l} min</div>
                </div>
                <div class="list-card-dot" style="--dc: ${u.main};"></div>
                <div class="list-card-info">
                    <div class="lc-name">${U(i.clientName)}</div>
                    <div class="lc-detail">${U(i.serviceName)} · ${h}</div>
                    <div class="lc-extra" style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
                        <span style="font-size: 0.65rem; color: #4b5563; background: #f3f4f6; padding: 2px 8px; border-radius: 6px; font-weight: 500;">R$ ${I.toFixed(2).replace(".",",")}</span>
                        ${i.clientPhone?`<span style="font-size: 0.65rem; color: #4b5563; background: #f3f4f6; padding: 2px 8px; border-radius: 6px; font-weight: 500;"><i class="bi bi-telephone"></i> ${U(i.clientPhone)}</span>`:""}
                        <span style="font-size: 0.65rem; color: #4b5563; background: #f3f4f6; padding: 2px 8px; border-radius: 6px; font-weight: 500;">${f} serv.</span>
                        <span style="font-size: 0.65rem; color: ${m?"#059669":"#d97706"}; background: ${m?"#d1fae5":"#fef3c7"}; padding: 2px 8px; border-radius: 6px; font-weight: 600;">${U($)}</span>
                    </div>
                </div>
                <div class="list-card-status">
                    <div class="lc-status-dot ${m?"done":""}"></div>
                </div>
                ${!m&&!N.isSelectionMode?`
                <div class="list-card-actions">
                    <button class="lc-action-btn wa" data-link="${P}" title="WhatsApp">
                        <i class="bi bi-whatsapp" style="font-size:0.85rem;"></i>
                    </button>
                    <button class="lc-action-btn comanda" data-action="open-comanda" data-appointment='${b}' title="Comanda">
                        <i class="bi bi-receipt"></i>
                    </button>
                </div>`:""}
            </div>`}),s+="</div>"}),s+="</div>",t.innerHTML=s}function mo(){const e=p.allEvents.filter(t=>N.selectedProfessionalId==="all"||t.professionalId===N.selectedProfessionalId);N.currentView==="list"?Di(e):Ci(e),Ya()}function Ya(){const e=document.getElementById("batch-delete-container"),t=document.getElementById("agendaFab");e&&(N.isSelectionMode&&N.selectedItems.size>0?(e.innerHTML=`<div class="bg-gray-900 text-white p-3 rounded-xl shadow-xl flex items-center justify-between gap-4 w-full mx-4" style="background:#212529;color:#fff;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:12px;">
            <span class="font-semibold text-sm"><span style="color:#7c3aed; font-size:1.1rem; margin-right:4px;">${N.selectedItems.size}</span> selecionados</span>
            <button data-action="batch-delete" style="background:#e03131;color:#fff;border:none;padding:8px 20px;border-radius:8px;font-size:0.85rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;">
                <i class="bi bi-trash"></i> Excluir
            </button>
        </div>`,e.style.display="block",t&&(t.style.transform="scale(0)")):(e.style.display="none",t&&(t.style.transform="scale(1)")))}function Ti(){const e=document.getElementById("currentDateDisplay");if(!e)return;const t=new Date;t.setHours(0,0,0,0);const a=new Date(N.currentDate);if(a.setHours(0,0,0,0),N.currentView==="list")a.toDateString()===t.toDateString()?e.textContent="Hoje":e.textContent=a.toLocaleDateString("pt-BR",{day:"numeric",month:"long"});else{const s=Qa(a),o=new Date(s);o.setDate(s.getDate()+6);const r=s.toLocaleDateString("pt-BR",{day:"numeric",month:"short"}),i=o.toLocaleDateString("pt-BR",{day:"numeric",month:"short"});e.textContent=`${r} - ${i}`}}async function Se(){const e=document.getElementById("agenda-view");if(!e)return;N.selectedItems.clear(),Ya(),e.innerHTML='<div style="display:flex;align-items:center;justify-content:center;padding:60px 0;"><div style="width:28px;height:28px;border:2.5px solid #e9ecef;border-top:2.5px solid #4f46e5;border-radius:50%;animation:spin 0.7s linear infinite;"></div></div><style>@keyframes spin{to{transform:rotate(360deg)}}</style>',Ti();let t,a;if(N.currentView==="list")t=new Date(N.currentDate),t.setHours(0,0,0,0),a=new Date(t),a.setHours(23,59,59,999);else{const s=Qa(N.currentDate);t=new Date(s),a=new Date(s),a.setDate(s.getDate()+6),a.setHours(23,59,59,999)}try{const o=(p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments:[p.establishmentId]).map(async l=>{const[c,u]=await Promise.all([Ua(l,t.toISOString(),a.toISOString(),N.selectedProfessionalId==="all"?null:N.selectedProfessionalId),ra(l,t.toISOString(),a.toISOString(),N.selectedProfessionalId)]);return{appts:c||[],blockages:u||[]}}),r=await Promise.all(o);let i=[],n=[];if(r.forEach(l=>{i=i.concat(l.appts),n=n.concat(l.blockages)}),!document.getElementById("agenda-view"))return;const d=l=>l.map(c=>({...c,type:c.type||"appointment",professionalName:c.professionalName||(()=>{const u=p.professionals?.find(m=>m.id===c.professionalId);return u?u.name:"Indefinido"})()}));p.allEvents=[...d(i),...d(n)],Xa(),mo()}catch(s){console.error(s),document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML=`
                <div class="text-center py-12" style="color:#868e96;">
                    <i class="bi bi-exclamation-triangle" style="font-size:1.5rem;"></i>
                    <p class="mt-2" style="font-size:0.8rem;">Erro ao carregar agenda.</p>
                </div>`)}}async function Pi(){try{const t=(p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments:[p.establishmentId]).map(async i=>{const[n,d,l]=await Promise.all([ge(i),Ae(i),Pe(i)]);return{profs:n||[],services:d||[],estDetails:l}}),a=await Promise.all(t),s=new Map,o=new Map;let r=a[0]?.estDetails;a.forEach(i=>{i.profs.forEach(n=>s.set(n.id,n)),i.services.forEach(n=>o.set(n.id,n))}),p.professionals=Array.from(s.values()),p.services=Array.from(o.values()),po=[],r&&(Qt=r.loyaltyProgram||{enabled:!1}),p.professionals.forEach((i,n)=>{p.professionalColors.set(i.id,Ea[n%Ea.length])}),Xa()}catch{g("Atenção","Não foi possível carregar os dados da equipa.","error")}}async function go(e={}){N.currentDate=e.targetDate?new Date(e.targetDate):N.currentDate||new Date,N.isSelectionMode=!1,N.selectedItems.clear(),gs.innerHTML=`
        <div class="flex flex-col h-[calc(100vh-80px)] md:h-auto bg-gray-50 relative font-sans w-full" style="background:#f8f9fa;">

            <div style="background: #fff; padding: 14px 16px; border-bottom: 1px solid #f1f3f5; position: sticky; top: 0; z-index: 10; display:flex; flex-direction:column; gap:16px;">
                
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <button id="btnWeekDays" style="background:transparent; border:none; color:#495057; font-size:1.2rem; padding:4px; cursor:pointer;" title="Opções">
                        <i class="bi bi-sliders"></i>
                    </button>

                    <div class="agenda-view-toggle" style="background: #f1f3f5; padding: 4px; border-radius: 12px; display:flex; gap:4px; margin:0;">
                        <button class="${N.currentView==="list"?"active shadow-sm":""}" data-action="setView" data-view="list" style="border-radius: 8px; padding: 6px 16px; font-weight:600;">Lista</button>
                        <button class="${N.currentView==="week"?"active shadow-sm":""}" data-action="setView" data-view="week" style="border-radius: 8px; padding: 6px 16px; font-weight:600;">Semana</button>
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
        </div>`,document.getElementById("btnPrevDate").addEventListener("click",()=>{N.currentView==="list"?N.currentDate.setDate(N.currentDate.getDate()-1):N.currentDate.setDate(N.currentDate.getDate()-7),Se()}),document.getElementById("btnNextDate").addEventListener("click",()=>{N.currentView==="list"?N.currentDate.setDate(N.currentDate.getDate()+1):N.currentDate.setDate(N.currentDate.getDate()+7),Se()}),document.getElementById("btnTodayHeader").addEventListener("click",()=>{N.currentDate=new Date,Se()});const t=document.querySelectorAll(".agenda-view-toggle button");t.forEach(a=>{a.addEventListener("click",()=>{t.forEach(s=>{s.classList.remove("active","shadow-sm"),s.style.backgroundColor="transparent"}),a.classList.add("active","shadow-sm"),a.style.backgroundColor="#fff",N.currentView=a.dataset.view,Se()})}),document.getElementById("btnWeekDays").addEventListener("click",()=>{Bi()}),bs||(gs.addEventListener("click",async a=>{const s=a.target.closest('[data-action="open-comanda"]');if(s){a.stopPropagation();const d=s.dataset.appointment||s.closest("[data-appointment]")?.dataset.appointment;if(!d)return;const l=JSON.parse(d.replace(/&apos;/g,"'")),c=l.status==="completed"?"finalizadas":"em-atendimento",u={selectedAppointmentId:l.id,initialFilter:c};c==="finalizadas"&&l.transaction?.paidAt&&(u.filterDate=typeof l.transaction.paidAt=="object"?new Date(l.transaction.paidAt._seconds*1e3):l.transaction.paidAt),G("comandas-section",u);return}const o=a.target.closest(".lc-action-btn.wa");if(o){a.stopPropagation(),o.dataset.link&&window.open(o.dataset.link,"_blank");return}if(a.target.closest('[data-action="batch-delete"]')){const d=N.selectedItems.size;await J("Excluir Selecionados",`Tem certeza que deseja excluir ${d} agendamento(s)? Esta ação não pode ser desfeita.`)&&(await Promise.all(Array.from(N.selectedItems).map(async c=>{try{await $r(c)}catch{}})),g(`${d} agendamento(s) excluído(s).`,"success"),N.selectedItems.clear(),N.isSelectionMode=!1,Se());return}const r=a.target.closest('[data-action="select-professional"]');if(r){const d=r.dataset.profId;N.selectedProfessionalId=N.selectedProfessionalId===d&&d!=="all"?"all":d,Se();return}const i=a.target.closest(".list-card[data-appointment], .week-event-chip[data-appointment]");if(i){if(N.isSelectionMode){a.stopPropagation();const l=i.querySelector('input[type="checkbox"]');if(l){const c=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'")),u=!l.checked;l.checked=u,u?N.selectedItems.add(c.id):N.selectedItems.delete(c.id),(i.classList.contains("week-event-chip")||i.classList.contains("list-card"))&&(u?(i.style.boxShadow="0 0 0 2px #4f46e5",i.style.backgroundColor="#eff6ff"):(i.style.boxShadow="none",i.style.backgroundColor=i.classList.contains("week-event-chip")?"#f8f9fa":"#fff")),Ya()}return}const d=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'"));La(d);return}if(a.target.closest('[data-action="new-appointment"]')){La();return}}),bs=!0),await Pi(),await Se()}function Bi(){const e=document.getElementById("optionsSheet");if(e){e.remove();return}const t=document.createElement("div");t.id="optionsSheet",t.style.cssText="position:fixed;bottom:0;left:50%;right:auto;transform:translateX(-50%) translateY(100%);width:100%;max-width:440px;background:#fff;border-radius:24px 24px 0 0;z-index:10000;box-shadow:0 -8px 40px rgba(0,0,0,0.15);transition:transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);";const a=N.isSelectionMode?"#fee2e2":"#f0fdf4",s=N.isSelectionMode?"#ef4444":"#16a34a",o=N.isSelectionMode?"bi-x-circle":"bi-check2-square";t.innerHTML=`
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
                <button id="optSelectMode" style="width:100%;padding:12px 16px;border:none;background:${a};border-radius:12px;font-size:0.9rem;font-weight:600;color:${s};cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background 0.2s;">
                    <i class="bi ${o}"></i> ${N.isSelectionMode?"Desativar Modo de Exclusão":"Ativar Seleção para Excluir"}
                </button>
                <p style="font-size:0.75rem; color:#6b7280; text-align:center; margin-top:8px;">${N.isSelectionMode?"Toque num card para desmarcar.":"Permite selecionar vários agendamentos para apagar de uma vez."}</p>
            </div>

            <div style="margin-bottom:16px;">
                <div style="font-size:0.7rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">Equipa</div>
                <label style="display:flex;align-items:center;gap:12px;font-size:0.9rem;font-weight:500;color:#374151;cursor:pointer;padding:8px 0; background:#f9fafb; border-radius:12px; padding:12px 16px;">
                    <input type="checkbox" id="optInactiveToggle" style="width:18px;height:18px;accent-color:#4f46e5;" ${N.showInactiveProfs?"checked":""}>
                    Exibir profissionais inativos na barra superior
                </label>
            </div>
        </div>`;const r=document.createElement("div");r.id="optionsOverlay",r.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:9999;opacity:0;transition:opacity 0.3s;",document.body.appendChild(r),document.body.appendChild(t),requestAnimationFrame(()=>{t.style.transform="translateX(-50%) translateY(0)",r.style.opacity="1"});const i=()=>{t.style.transform="translateX(-50%) translateY(100%)",r.style.opacity="0",setTimeout(()=>{t.remove(),r.remove()},300)};document.getElementById("closeOptSheet").addEventListener("click",i),r.addEventListener("click",i),document.getElementById("optSelectMode").addEventListener("click",()=>{N.isSelectionMode=!N.isSelectionMode,N.isSelectionMode||N.selectedItems.clear(),i(),mo(),N.isSelectionMode&&setTimeout(()=>{g("Modo de Exclusão Ativo.","info")},300)}),document.getElementById("optInactiveToggle").addEventListener("change",n=>{N.showInactiveProfs=n.target.checked,Xa()})}function fs(e){e<1||e>4||(R.step=e,La(null,!0))}function Mi(e){return{title:e?"Editar Reserva":"Identificar Cliente",content:`
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
        </div>`}}function Ai(){return{title:"Serviços",content:`
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
                ${na.map(e=>`<div class="service-card p-3 bg-white rounded-xl border ${R.data.selectedServiceIds.includes(e.id)?"border-indigo-500 bg-indigo-50":"border-gray-200"} cursor-pointer" data-service-id="${e.id}">
                        <p class="font-semibold text-sm text-gray-800 truncate">${U(e.name)}</p>
                        <p class="text-xs text-gray-500 mt-0.5">R$ ${e.price.toFixed(2)} · ${e.duration} min</p>
                    </div>`).join("")}
            </div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="2" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="2" class="py-2.5 px-5 bg-gray-900 text-white font-semibold text-sm rounded-lg">Avançar</button>
        </div>`}}function qi(){return{title:"Profissional",content:`
        <div class="p-5 space-y-5">
            <div class="relative">
                <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input type="search" id="professionalSearchModalInput" placeholder="Buscar na equipa..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg text-sm">
            </div>
            <div id="apptProfessionalContainer" class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-52 overflow-y-auto professional-step-cards">
                ${Ia.map(e=>`<div class="professional-modal-card p-3 bg-white rounded-xl border ${R.data.professionalId===e.id?"border-indigo-500 bg-indigo-50":"border-gray-200"} cursor-pointer text-center" data-professional-id="${e.id}">
                        <div class="w-10 h-10 rounded-full bg-gray-100 mx-auto flex items-center justify-center font-bold text-sm text-gray-500">${U(e.name).charAt(0)}</div>
                        <p class="text-sm font-semibold mt-2 truncate">${U(e.name.split(" ")[0])}</p>
                    </div>`).join("")}
            </div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="3" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="3" class="py-2.5 px-5 bg-gray-900 text-white font-semibold text-sm rounded-lg">Avançar</button>
        </div>`}}function Ni(){const e=R.data.date||new Date().toISOString().split("T")[0];return{title:"Data e Horário",content:`
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
        </div>`}}async function La(e=null,t=!1){const a=document.getElementById("appointmentModal");t||(R={step:1,data:{id:e?.id||null,clientName:e?.clientName||"",clientPhone:e?.clientPhone||"",selectedServiceIds:e?.services?.map(o=>o.id)||[],professionalId:e?.professionalId||null,professionalName:e?.professionalName||"",date:e?.startTime?new Date(e.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],time:e?.startTime?new Date(e.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null,redeemedReward:e?.redeemedReward||null,clientHasRewards:e?.hasRewards||!1,clientLoyaltyPoints:0}}),na=p.services||[],Ia=(p.professionals||[]).filter(o=>o.status==="active");let s;switch(R.step){case 1:s=Mi(e);break;case 2:s=Ai();break;case 3:s=qi();break;case 4:s=Ni();break}a.innerHTML=`
        <div class="modal-content max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden m-4 flex flex-col" style="max-height:90vh;">
            <header class="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                <div class="flex items-center gap-3">
                    <span class="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">${R.step}/4</span>
                    <h2 class="text-lg font-bold text-gray-900">${s.title}</h2>
                </div>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
                    <i class="bi bi-x-lg"></i>
                </button>
            </header>
            <form id="appointmentForm" class="flex-1 overflow-y-auto">${s.content}</form>
        </div>`,a.querySelectorAll('[data-action="next-step"]').forEach(o=>o.addEventListener("click",()=>{const r=parseInt(o.dataset.currentStep,10);if(r===1&&(R.data.clientName=a.querySelector("#apptClientName").value.trim(),R.data.clientPhone=a.querySelector("#apptClientPhone").value.trim(),!R.data.clientName))return g("Preencha o nome do cliente.","warning");if(r===2&&R.data.selectedServiceIds.length===0)return g("Selecione um serviço.","warning");if(r===3&&!R.data.professionalId)return g("Escolha um profissional.","warning");fs(r+1)})),a.querySelectorAll('[data-action="prev-step"]').forEach(o=>o.addEventListener("click",()=>fs(parseInt(o.dataset.currentStep,10)-1))),a.querySelector('[data-action="close-modal"]')?.addEventListener("click",()=>{a.style.display="none"}),R.step===4&&a.querySelector("#appointmentForm").addEventListener("submit",ji),a.style.display="flex",R.step===2&&a.querySelectorAll(".service-card").forEach(o=>o.addEventListener("click",()=>{const r=a.querySelector("#multiServiceToggle")?.checked,i=o.classList.contains("selected");r||(a.querySelectorAll(".service-card.selected").forEach(d=>d.classList.remove("selected","border-indigo-500","bg-indigo-50")),R.data.selectedServiceIds=[]);const n=o.dataset.serviceId;i?(o.classList.remove("selected","border-indigo-500","bg-indigo-50"),R.data.selectedServiceIds=R.data.selectedServiceIds.filter(d=>d!==n)):(o.classList.add("selected","border-indigo-500","bg-indigo-50"),R.data.selectedServiceIds.push(n))})),R.step===3&&a.querySelectorAll(".professional-modal-card").forEach(o=>o.addEventListener("click",()=>{a.querySelectorAll(".professional-modal-card.selected").forEach(i=>i.classList.remove("selected","border-indigo-500","bg-indigo-50")),o.classList.add("selected","border-indigo-500","bg-indigo-50"),R.data.professionalId=o.dataset.professionalId;const r=Ia.find(i=>i.id===o.dataset.professionalId);R.data.professionalName=r?r.name:""})),R.step===1&&a.querySelector("#clientSearchInput")?.addEventListener("input",o=>Fi(o.target.value)),R.step===4&&(a.querySelector("#apptDate")?.addEventListener("change",xs),xs(),Ri())}async function ji(e){e.preventDefault();const a=e.target.querySelector('button[type="submit"]');if(!R.data.time||!R.data.selectedServiceIds.length||!R.data.professionalId)return g("Selecione horário, serviço e profissional.","warning");a.disabled=!0,a.innerHTML="Aguarde...";const s=R.data.selectedServiceIds.map(l=>{const c=na.find(u=>u.id===l);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[o,r]=R.data.time.split(":"),i=new Date(`${R.data.date}T${o}:${r}:00`),d={establishmentId:p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments[0]:p.establishmentId,clientName:R.data.clientName,clientPhone:R.data.clientPhone,services:s,professionalId:R.data.professionalId,professionalName:R.data.professionalName,startTime:i.toISOString(),redeemedReward:R.data.redeemedReward};R.data.id&&(d.id=R.data.id);try{R.data.id?await Sr(R.data.id,d):await kr(d),g("Agendamento registrado!","success"),document.getElementById("appointmentModal").style.display="none",Se()}catch(l){g(l.message,"error"),a.disabled=!1,a.textContent="Agendar"}}async function xs(){const e=document.getElementById("availableTimesContainer"),t=document.getElementById("apptTotalDuration");if(!e)return;const a=R.data.selectedServiceIds.reduce((i,n)=>{const d=na.find(l=>l.id===n);return i+(d?d.duration+(d.bufferTime||0):0)},0);t&&(t.textContent=`${a} min`);const{professionalId:s,selectedServiceIds:o,date:r}=R.data;if(!s||!o.length||!r){e.innerHTML='<p class="col-span-full text-center text-xs text-gray-400">Selecione serviço e profissional</p>';return}try{const i=p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments[0]:p.establishmentId;let n=await wr({establishmentId:i,professionalId:s,serviceIds:o,date:r});const d=new Date;if(new Date(r+"T00:00:00").toDateString()===d.toDateString()){const l=d.getHours()*60+d.getMinutes();n=n.filter(c=>{const[u,m]=c.split(":").map(Number);return u*60+m>=l})}e.innerHTML=n.length>0?n.map(l=>`<button type="button" class="p-2 text-sm font-semibold rounded-lg border ${R.data.time===l?"bg-indigo-600 text-white border-indigo-600":"bg-gray-50 text-gray-700 border-gray-200 hover:bg-indigo-50"}" onclick="document.querySelectorAll('#availableTimesContainer button').forEach(b=>{b.classList.remove('bg-indigo-600','text-white','border-indigo-600');b.classList.add('bg-gray-50','text-gray-700','border-gray-200')});this.classList.add('bg-indigo-600','text-white','border-indigo-600');this.classList.remove('bg-gray-50','text-gray-700','border-gray-200');window._selectedTime='${l}';">${l}</button>`).join(""):'<p class="col-span-full text-center text-xs text-gray-400">Sem horários</p>'}catch{e.innerHTML='<p class="col-span-full text-center text-xs text-red-400">Erro</p>'}}function Ri(){const e=document.getElementById("loyaltyRewardsContainer");if(!e)return;const{clientHasRewards:t,clientLoyaltyPoints:a}=R.data,{enabled:s,rewards:o}=Qt;if(!s||!t||!o?.length){e.innerHTML="";return}const r=o.filter(i=>a>=i.points);if(!r.length){e.innerHTML='<p class="text-xs text-gray-400">Sem recompensas disponíveis.</p>';return}e.innerHTML=`<div class="border-t border-gray-100 pt-4">
        <p class="text-xs font-semibold text-gray-500 mb-2">Resgate fidelidade (${a} pts)</p>
        ${r.map(i=>`<label class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg mb-1 cursor-pointer"><input type="radio" name="loyaltyReward" value="${U(i.reward)}" data-points="${i.points}" class="accent-indigo-600"><span class="text-sm">${U(i.reward)} (-${i.points} pts)</span></label>`).join("")}
    </div>`,e.querySelectorAll('input[name="loyaltyReward"]').forEach(i=>{i.addEventListener("change",n=>{n.target.checked&&(R.data.redeemedReward={reward:n.target.value,points:parseInt(n.target.dataset.points,10)})})})}async function Fi(e){const t=document.getElementById("clientSearchResults");if(!t||e.trim().length<3){t&&(t.innerHTML='<p class="text-xs text-gray-400">Digite pelo menos 3 caracteres...</p>');return}t.innerHTML='<div class="text-center py-3"><div class="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div></div>';try{const s=(p.selectedEstablishments&&p.selectedEstablishments.length>0?p.selectedEstablishments:[p.establishmentId]).map(n=>Et(n,e.trim())),o=await Promise.all(s),r=new Map;o.forEach(n=>{n.forEach(d=>{d.phone?r.set(d.phone,d):r.set(d.id||Math.random().toString(),d)})});const i=Array.from(r.values());if(po=i,!i.length){t.innerHTML='<p class="text-xs text-gray-400">Nenhum cliente encontrado.</p>';return}t.innerHTML=i.map(n=>`<div class="client-card p-2.5 bg-white rounded-lg border ${R.data.clientName===n.name&&R.data.clientPhone===n.phone?"border-indigo-500 bg-indigo-50":"border-gray-200"} cursor-pointer flex items-center gap-2" data-client-name="${U(n.name)}" data-client-phone="${U(n.phone)}" data-loyalty-points="${n.loyaltyPoints||0}">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">${U(n.name).charAt(0)}</div>
                <div><p class="text-sm font-semibold text-gray-800">${U(n.name)}</p><p class="text-xs text-gray-500">${U(n.phone)}</p></div>
            </div>`).join(""),t.querySelectorAll(".client-card").forEach(n=>n.addEventListener("click",()=>{R.data.clientName=n.dataset.clientName,R.data.clientPhone=n.dataset.clientPhone,R.data.clientLoyaltyPoints=parseInt(n.dataset.loyaltyPoints||"0",10);const d=Math.min(...(Qt?.rewards||[]).map(l=>l.points));R.data.clientHasRewards=Qt.enabled&&d!==1/0&&R.data.clientLoyaltyPoints>=d,document.getElementById("apptClientName").value=n.dataset.clientName,document.getElementById("apptClientPhone").value=n.dataset.clientPhone,t.querySelectorAll(".client-card").forEach(l=>l.classList.remove("border-indigo-500","bg-indigo-50")),n.classList.add("border-indigo-500","bg-indigo-50")}))}catch{t.innerHTML='<p class="text-xs text-red-400">Erro ao buscar.</p>'}}const Hi=(e,t=null,a=1,s=12)=>{let o=`/api/comandas/${e}?page=${a}&limit=${s}`;return t&&(o+=`&date=${t}`),L(o)},Oi=(e,t)=>L(`/api/appointments/${e}/comanda`,{method:"POST",body:JSON.stringify({items:t})}),bo=e=>L("/api/sales",{method:"POST",body:JSON.stringify(e)}),Ca=(e,t)=>L(`/api/sales/${e}?date=${t}`),zi=(e,t,a)=>{const s=`/api/sales/${e}?startDate=${t}&endDate=${a}`;return L(s)},Vi=e=>L(`/api/sales/${e}/reopen`,{method:"POST"}),fo=e=>L(`/api/sales/${e}`,{method:"DELETE"}),hs=Object.freeze(Object.defineProperty({__proto__:null,createSale:bo,deleteSale:fo,getSales:Ca,getSalesByDateRange:zi,reopenSale:Vi},Symbol.toStringTag,{value:"Module"})),at=e=>L(`/api/products/${e}`),xo=e=>L("/api/products",{method:"POST",body:JSON.stringify(e)}),ho=(e,t)=>L(`/api/products/${e}`,{method:"PUT",body:JSON.stringify(t)}),vo=e=>L(`/api/products/${e}`,{method:"DELETE"}),yo=(e,t)=>L(`/api/products/${e}/stock`,{method:"PATCH",body:JSON.stringify(t)}),_i=e=>L(`/api/products/${e}/stock-history`),wo=({startDate:e,endDate:t,productId:a,categoryId:s,establishmentId:o})=>{const r=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&r.append("productId",a),s&&s!=="all"&&r.append("categoryId",s),o&&r.append("establishmentId",o),L(`/api/products/stock-history/report?${r.toString()}`)},Ui=Object.freeze(Object.defineProperty({__proto__:null,adjustStock:yo,createProduct:xo,deleteProduct:vo,getProducts:at,getStockHistory:_i,getStockReport:wo,updateProduct:ho},Symbol.toStringTag,{value:"Module"})),Wi=()=>L("/api/cashier/status").catch(e=>{if(e.message.includes("404")||e.message.includes("não encontrada"))return null;throw e}),Ji=e=>{const t={establishmentId:e.establishmentId,initialAmount:Number(e.initialAmount),notes:e.notes||""};return console.log("Payload enviado para abrir caixa:",t),L("/api/cashier/open",{method:"POST",body:JSON.stringify(t)})},Gi=(e,t)=>{const a={finalAmount:Number(t)};return console.log("Payload enviado para fechar caixa:",a),L(`/api/cashier/close/${e}`,{method:"PUT",body:JSON.stringify(a)})},Qi=()=>L("/api/cashier/history").then(e=>e||[]).catch(e=>(console.error("Erro ao buscar histórico:",e),[])),Xi=e=>L(`/api/cashier/report/${e}`),Za=e=>L(`/api/packages/${e}`),Yi=e=>L("/api/packages",{method:"POST",body:JSON.stringify(e)}),Zi=(e,t)=>L(`/api/packages/${e}`,{method:"PUT",body:JSON.stringify(t)}),Ki=e=>L(`/api/packages/${e}`,{method:"DELETE"});let y={allComandas:[],catalog:{services:[],products:[],packages:[]},activeFilter:"abertas",selectedComandaId:null,viewMode:"items",isCashierOpen:!1,activeCashierSessionId:null,loyaltySettings:null,pendingRedemption:null,paging:{page:1,limit:15,total:0},checkoutState:{payments:[],selectedMethod:"dinheiro",installments:1,amountReceived:"",discount:{type:"real",value:0},discountReason:""},isProcessing:!1,showHistoryDate:!1},je=null,He=null,vs=null;function ko(e,t){return function(...a){clearTimeout(vs),vs=setTimeout(()=>e.apply(this,a),t)}}async function ys(e,t="stay"){if(!e||!e.id)return;e._localUpdatedAt=Date.now(),e._cachedItems=null,e._hasUnsavedChanges=!1,ca(),t==="checkout"&&(y.viewMode="checkout",y.checkoutState.payments||(y.checkoutState.payments=[]),y.checkoutState.selectedMethod="dinheiro",y.checkoutState.amountReceived="",y.checkoutState.discount.value||(y.checkoutState.discount={type:"real",value:0},y.checkoutState.discountReason=""),K());const a=document.createElement("div");a.id="saving-overlay",a.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",a.innerHTML=`
        <div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center animate-fade-in">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-800 font-bold text-lg">Sincronizando...</p>
        </div>
    `,document.body.appendChild(a);try{const s=(e.comandaItems||[]).filter(o=>o&&o.id&&String(o.id)!=="undefined"&&String(o.id)!=="null").map(o=>{const r={...o};if(r.id=String(o.id),r.type==="product"){const i=r.id;r.productId||(r.productId=i),r.product_id||(r.product_id=i)}if(r.type==="service"){const i=r.id;r.serviceId||(r.serviceId=i),r.service_id||(r.service_id=i)}return r});e.type==="walk-in"&&String(e.id).startsWith("temp-")||await Oi(e.id,s),document.body.contains(a)&&document.body.removeChild(a),t!=="checkout"&&(g("Sucesso","Comanda atualizada!","success"),K())}catch(s){document.body.contains(a)&&document.body.removeChild(a),console.error("Erro ao salvar:",s),e._hasUnsavedChanges=!0,K(),g("Erro","Falha ao salvar no servidor: "+s.message,"warning")}}function $e(e){if(!e._cachedItems){let t=[];if(e.status==="completed"){const a=e.comandaItems||e.items||[];t=a.length>0?a:e.services||[]}else{const a=(e.services||[]).map(i=>({...i,_source:"original_service",type:"service"})),s=a.reduce((i,n)=>{const d=String(n.id);return i[d]=(i[d]||0)+1,i},{}),o=[...e.comandaItems||[],...e.items||[]],r=[];o.forEach(i=>{const n=String(i.id);(i.type==="service"||!i.type)&&s[n]>0?s[n]--:r.push({...i,_source:"extra"})}),t=[...a,...r]}return e._cachedItems=t,e._cachedTimestamp=Date.now(),t}return e._cachedItems}function en(){const e=document.getElementById("comandas-layout");if(e){e.classList.add("detail-view-active");const t=document.getElementById("comanda-detail-container");t&&(t.scrollTop=0)}}function Oe(){const e=document.getElementById("comandas-layout");e&&e.classList.remove("detail-view-active")}function tn(){const e=y.allComandas||[],t=e.filter(l=>l.status!=="completed").length,a=e.filter(l=>l.status==="completed"),s=a.reduce((l,c)=>{let u=c.totalAmount!==void 0?Number(c.totalAmount):$e(c).reduce((m,b)=>m+Number(b.price||0),0);return l+u},0),o=a.length>0?s/a.length:0,r=document.getElementById("kpi-abertas"),i=document.getElementById("kpi-pagas"),n=document.getElementById("kpi-vendas"),d=document.getElementById("kpi-ticket");r&&(r.textContent=t),i&&(i.textContent=a.length),n&&(n.textContent=`R$ ${s.toFixed(2).replace(".",",")}`),d&&(d.textContent=`R$ ${o.toFixed(2).replace(".",",")}`)}function an(){const e=new Date().toISOString().split("T")[0];He.innerHTML=`
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
    `,da(),la()}function la(){document.querySelectorAll(".filter-btn").forEach(a=>{a.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.add("bg-white","text-gray-600","border-gray-200")});const e=document.querySelector(`[data-filter="${y.activeFilter}"]`);e&&(e.classList.remove("bg-white","text-gray-600","border-gray-200"),e.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"));const t=document.getElementById("finalizadas-datepicker");t&&t.classList.toggle("hidden",!y.showHistoryDate)}function da(){const e=document.getElementById("cashier-alert-box"),t=document.getElementById("btn-new-sale");y.isCashierOpen?(e&&(e.innerHTML=""),t&&(t.classList.remove("opacity-50","cursor-not-allowed"),t.disabled=!1)):(e&&(e.innerHTML=`
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
        `),t&&(t.classList.add("opacity-50","cursor-not-allowed"),t.disabled=!0)),sn()}function sn(){const e=document.getElementById("cashier-controls");e&&(y.isCashierOpen?e.innerHTML=`
            <span class="hidden sm:inline-block text-xs font-bold text-green-700 bg-green-100 py-1.5 px-3 rounded-lg border border-green-200 uppercase">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-1.5 px-3 bg-red-50 text-red-700 border border-red-200 font-semibold rounded-lg hover:bg-red-100 text-xs transition">Fechar Caixa</button>
        `:e.innerHTML=`
            <span class="hidden sm:inline-block text-xs font-bold text-red-700 bg-red-100 py-1.5 px-3 rounded-lg border border-red-200 uppercase">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-1.5 px-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-xs shadow transition">Abrir Caixa</button>
        `)}function ca(){const e=document.getElementById("comandas-list"),t=document.getElementById("pagination-container");if(!e)return;if(!y.isCashierOpen&&y.activeFilter==="abertas"){e.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <svg class="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `,t&&(t.innerHTML="");return}let a=y.allComandas||[];if(y.activeFilter==="abertas"?a=a.filter(o=>o.status!=="completed"):y.activeFilter==="pagas"&&(a=a.filter(o=>o.status==="completed")),tn(),a.length===0){e.innerHTML='<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda encontrada para este filtro.</p>',ws(t);return}const s=document.createDocumentFragment();a.forEach(o=>{const r=$e(o);let i=0;o.status==="completed"&&o.totalAmount!==void 0&&o.totalAmount!==null?i=Number(o.totalAmount):i=r.reduce((h,f)=>h+Number(f.price||0),0);const d=o.loyaltyRedemption||o.discount&&o.discount.reason&&String(o.discount.reason).toLowerCase().includes("fidelidade")?'<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-5 h-5 ml-2" title="Prémio Resgatado">🎁</span>':"",l=o.id===y.selectedComandaId,c=new Date(o.startTime),u=c.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}),m=c.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),b=`${u} às ${m}`,v=o.type==="walk-in"||typeof o.id=="string"&&o.id.startsWith("temp-"),k=o.status==="completed",x=w(o.clientName||"Cliente sem nome"),P=w(o.professionalName||"Sem profissional");let I="";k?I='<span class="text-[10px] font-bold uppercase text-green-700 bg-green-100 px-2 py-0.5 rounded-md border border-green-200">Paga</span>':v?I='<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">Avulsa</span>':I='<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">Agenda</span>';const $=document.createElement("div");$.className=`comanda-card cursor-pointer ${l?"selected":""}`,$.dataset.action="select-comanda",$.dataset.comandaId=o.id,$.innerHTML=`
            <div class="flex justify-between items-start mb-1 pointer-events-none">
                <p class="font-bold text-gray-800 truncate max-w-[70%] text-sm">${x}</p>
                <div class="flex items-center">
                    <p class="font-bold ${k?"text-green-600":"text-gray-900"} text-sm">R$ ${i.toFixed(2)}</p>
                    ${d}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none">
                <div class="flex items-center gap-2">
                    ${I}
                    <p class="text-xs text-gray-500 truncate max-w-[100px]">${P}</p>
                </div>
                <p class="text-[11px] text-gray-600 font-semibold bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">${b}</p> 
            </div>
        `,s.appendChild($)}),e.innerHTML="",e.appendChild(s),ws(t)}function ws(e){if(!e)return;e.innerHTML="";const{page:t,total:a,limit:s}=y.paging,o=Math.ceil((a||0)/s);if(o===0)return;const r=document.createElement("div");r.className="flex gap-2 justify-center items-center w-full",r.innerHTML=`
        <button data-page="${t-1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t<=1?"opacity-50 cursor-not-allowed":""}" ${t<=1?"disabled":""}>&laquo;</button>
        <span class="text-xs font-semibold text-gray-600 mx-2">Pág ${t} de ${o||1}</span>
        <button data-page="${t+1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t>=o?"opacity-50 cursor-not-allowed":""}" ${t>=o?"disabled":""}>&raquo;</button>
    `,e.appendChild(r),r.querySelectorAll("button[data-page]").forEach(i=>{i.onclick=n=>{n.stopPropagation();const d=parseInt(i.dataset.page,10);d>0&&d<=o&&(y.paging.page=d,de())}})}function K(){const e=document.getElementById("comanda-detail-container");if(!e)return;const t=y.allComandas.find(k=>k.id===y.selectedComandaId);if(y.viewMode==="checkout"&&t){on(t,e);return}const a=`
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
        `;return}const s=$e(t),o=t.status==="completed",r=t.type==="walk-in"||typeof t.id=="string"&&t.id.startsWith("temp-"),i=s.reduce((k,x)=>{const P=x._source==="original_service",I=x.id||x.name,$=P?`original-${I}`:`${x.type}-${I}`;return k[$]||(k[$]={...x,quantity:0,sources:[]}),k[$].quantity+=1,x._source&&k[$].sources.push(x._source),k},{}),n=Object.values(i).reduce((k,x)=>k+Number(x.price||0)*x.quantity,0),d=w(t.clientName||"Cliente sem nome"),l=w(t.professionalName||"Profissional não atribuído"),c=t._hasUnsavedChanges,b=`
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
    `,v=`
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
                    ${o?`<button data-action="reopen-appointment" data-id="${t.id}" class="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200" title="Reabrir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>`:""}
                    ${r&&!o?`<button data-action="delete-walk-in" data-id="${t.id}" class="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200" title="Excluir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`:""}
                </div>
            </div>

            <div id="loyalty-container" class="mb-4"></div>

            <div class="space-y-3">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Itens do Pedido</h4>
                ${Object.values(i).map(k=>{const x=k.sources&&k.sources.includes("original_service"),P=y.pendingRedemption&&String(y.pendingRedemption.appliedToItemId)===String(k.id),I=k.isReward||P;return`
                    <div class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm ${I?"border-yellow-300 bg-yellow-50 ring-1 ring-yellow-200":""}">
                        <div class="flex items-center gap-3 w-full">
                            <div class="flex-grow min-w-0">
                                <p class="text-sm font-semibold text-gray-800 line-clamp-1">
                                    ${I?"🎁 ":""}
                                    ${w(k.name)}
                                    ${x?'<span class="text-[10px] text-indigo-600 bg-indigo-50 px-1 rounded border border-indigo-100 ml-1">Original</span>':""}
                                </p>
                                <p class="text-xs text-gray-500">${I?'<span class="text-yellow-700 font-bold bg-yellow-100 px-1 rounded">Prémio Fidelidade</span>':`R$ ${(k.price||0).toFixed(2)} un.`}</p>
                            </div>
                            ${o?`<span class="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg">${k.quantity}x</span>`:`
                                <div class="flex items-center bg-gray-100 rounded-lg p-1 gap-3">
                                    ${x?`<span class="text-sm font-bold text-gray-500 w-16 text-center py-1 bg-gray-200 rounded text-[10px] uppercase">Fixo: ${k.quantity}</span>`:`<button data-action="decrease-qty" data-item-id="${k.id}" data-item-type="${k.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-600">-</button>
                                         <span class="text-sm font-bold text-gray-800 w-4 text-center">${k.quantity}</span>
                                         <button data-action="increase-qty" data-item-id="${k.id}" data-item-type="${k.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-green-50 hover:text-green-600">+</button>`}
                                </div>
                            `}
                            <div class="flex items-center justify-end w-20">
                                <span class="font-bold text-gray-900 whitespace-nowrap">R$ ${(k.price*k.quantity).toFixed(2)}</span>
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
            ${o?`
                <div class="bg-green-50 text-green-700 text-center py-3 rounded-xl font-bold border border-green-200 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Venda Finalizada
                </div>
            `:b}
        </footer>

        ${o?"":v}
    `,!o&&(t.clientId||t.clientName)&&rn(t,e.querySelector("#loyalty-container"))}function on(e,t){const s=$e(e).reduce((m,b)=>m+Number(b.price||0)*(b.quantity||1),0),o=y.checkoutState,r=o.discount||{type:"real",value:0};let i=0;r.type==="percent"?i=s*r.value/100:i=r.value,i>s&&(i=s);const n=s-i,d=o.payments.reduce((m,b)=>m+b.value,0),l=Math.max(0,n-d);(!o.amountReceived||l>0)&&(o.amountReceived=l.toFixed(2));const c=`
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
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Subtotal: <span id="checkout-subtotal-display">R$ ${s.toFixed(2)}</span></p>
                
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
                     <input type="text" id="discount-reason" class="w-64 p-2 text-xs border border-gray-200 rounded-lg text-center focus:border-indigo-300 focus:ring focus:ring-indigo-100 outline-none" placeholder="Motivo do desconto (opcional)" value="${o.discountReason||""}">
                </div>

                <p class="text-5xl font-extrabold text-gray-800 mt-2" id="checkout-total-display">R$ ${n.toFixed(2)}</p>
                
                <div id="checkout-status-msg" class="mt-2">
                    ${l<=.01?'<p class="text-green-600 font-bold text-lg">Pago</p>':`<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${l.toFixed(2)}</span></p>`}
                </div>
            </div>

            <div class="space-y-3 mb-6">
                ${o.payments.map((m,b)=>`
                    <div class="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-3">
                             <div class="bg-gray-100 p-2 rounded-lg">
                                <span class="font-bold text-xs uppercase text-gray-600">${m.method}</span>
                             </div>
                             ${m.installments>1?`<span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">${m.installments}x</span>`:""}
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-gray-900">R$ ${m.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${b}" class="text-red-400 hover:text-red-600 p-1"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                `).join("")}
            </div>

            ${l>.01?`
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label class="block text-xs font-bold text-gray-500 uppercase mb-3">Adicionar Pagamento</label>
                <div class="grid grid-cols-3 gap-2 mb-4">
                    ${["dinheiro","pix","debito","credito","crediario"].map(m=>`
                        <button data-action="select-method" data-method="${m}" class="p-2 rounded-lg border text-xs font-bold uppercase transition ${o.selectedMethod===m?"bg-indigo-600 text-white border-indigo-600 shadow-md":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}">
                            ${m}
                        </button>
                    `).join("")}
                </div>
                
                ${["credito","crediario"].includes(o.selectedMethod)?`
                    <div class="mb-3">
                        <label class="text-xs text-gray-500">Parcelas</label>
                        <select id="checkout-installments" class="w-full mt-1 p-2 border rounded-lg text-sm bg-gray-50">
                            ${Array.from({length:12},(m,b)=>`<option value="${b+1}" ${o.installments===b+1?"selected":""}>${b+1}x</option>`).join("")}
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
    `;const u=()=>{const m=y.checkoutState.discount.type,b=y.checkoutState.discount.value;let v=m==="percent"?s*b/100:b;v>s&&(v=s);const k=s-v,x=y.checkoutState.payments.reduce((f,C)=>f+C.value,0),P=Math.max(0,k-x),I=t.querySelector("#checkout-total-display");I&&(I.textContent=`R$ ${k.toFixed(2)}`);const $=t.querySelector("#checkout-status-msg");$&&(P<=.01?$.innerHTML='<p class="text-green-600 font-bold text-lg">Pago</p>':$.innerHTML=`<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${P.toFixed(2)}</span></p>`);const h=t.querySelector("#checkout-amount");h&&P>0&&document.activeElement!==h&&(h.value=P.toFixed(2))};t.querySelector("#discount-value")?.addEventListener("input",m=>{const b=parseFloat(m.target.value)||0;y.checkoutState.discount.value=b,u()}),t.querySelector("#discount-type")?.addEventListener("change",m=>{y.checkoutState.discount.type=m.target.value,u()}),t.querySelector("#discount-reason")?.addEventListener("input",m=>{y.checkoutState.discountReason=m.target.value}),t.querySelector("#checkout-amount")?.addEventListener("input",m=>{y.checkoutState.amountReceived=m.target.value}),t.querySelector("#checkout-installments")?.addEventListener("change",m=>{y.checkoutState.installments=parseInt(m.target.value,10)})}async function rn(e,t){if(!t)return;const a=y.loyaltySettings;if(!a||!a.enabled)return;let s=null;try{if(e.clientId)s=await oo(p.establishmentId,e.clientId);else if(e.clientName){const n=await Et(p.establishmentId,e.clientName,1);n&&n.length>0&&(s=n[0])}}catch(n){console.warn("Erro ao buscar dados de fidelidade",n)}if(!s||s.loyaltyPoints===void 0)return;const o=Number(s.loyaltyPoints)||0,i=(a.tiers||a.rewards||[]).filter(n=>{const d=Number(n.costPoints||n.points||0);return d>0&&o>=d});if(i.length>0){const n=document.createElement("div");n.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 shadow-sm flex justify-between items-center animate-fade-in",n.innerHTML=`
            <div class="flex items-center gap-3">
                <div class="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div>
                    <p class="text-sm font-bold text-yellow-800">Prémio Disponível!</p>
                    <p class="text-xs text-yellow-700">Saldo: <strong>${o} pts</strong></p>
                </div>
            </div>
        `;const d=document.createElement("button");d.innerText="Resgatar",d.className="text-xs font-bold bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-colors",d.onclick=()=>nn(i,e),n.appendChild(d),t.innerHTML="",t.appendChild(n)}}function nn(e,t){const a=`
        <div class="space-y-4">
            <p class="text-sm text-gray-600 mb-4">O cliente possui pontos suficientes para resgatar os seguintes itens:</p>
            <div class="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                ${e.map(r=>{const i=r.costPoints||r.points||0,n=r.name||r.reward,d=r.type||"money",l=r.discount?parseFloat(r.discount).toFixed(2):"0.00";let c="",u="bg-gray-100 text-gray-600";switch(d){case"service":c="Serviço",u="bg-indigo-100 text-indigo-700";break;case"product":c="Produto",u="bg-green-100 text-green-700";break;case"package":c="Pacote",u="bg-purple-100 text-purple-700";break;case"money":default:c="Valor Livre",u="bg-yellow-100 text-yellow-700";break}return`
                    <button data-action="select-reward" data-reward-id="${r.id||n}" class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group">
                        <div class="text-left flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded ${u}">${c}</span>
                                <p class="font-bold text-gray-800 group-hover:text-yellow-700">${w(n)}</p>
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
    `,{modalElement:s,close:o}=ie({title:"🎁 Resgatar Prémio",contentHTML:a,maxWidth:"max-w-md"});s.addEventListener("click",r=>{const i=r.target.closest('[data-action="select-reward"]');if(i){const n=i.dataset.rewardId,d=e.find(l=>l.id&&l.id==n||(l.name||l.reward)==n);d&&(ln(d,t),o())}})}async function ln(e,t){const a=Number(e.costPoints||e.points||0),s=e.name||e.reward,o=e.type||"money";if(o==="money"){const d=parseFloat(e.discount)||0;if(d<=0){g("Erro","O valor do desconto configurado é inválido.","error");return}y.checkoutState.discount={type:"real",value:d},y.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,y.pendingRedemption={rewardId:e.id||null,name:s,cost:a,type:"money"},g("Sucesso",`Prémio "${s}" resgatado! Desconto de R$ ${d.toFixed(2)} aplicado.`,"success"),K();return}const r=$e(t),i=e.itemId?String(e.itemId):null;if(!i){g("Erro de Configuração",`O prémio "${s}" não tem um item vinculado nas configurações.`,"error");return}const n=r.find(d=>{const l=d.id?String(d.id):null,c=d.serviceId?String(d.serviceId):d.service_id?String(d.service_id):null,u=d.productId?String(d.productId):d.product_id?String(d.product_id):null;return o==="service"?l===i||c===i:o==="product"?l===i||u===i:o==="package"?l===i:!1});if(n){let d=parseFloat(e.discount);(!d||d<=0)&&(d=parseFloat(n.price||0)),y.checkoutState.discount={type:"real",value:d},y.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,y.pendingRedemption={rewardId:e.id||null,name:s,cost:a,type:o,appliedToItemId:n.id},g("Sucesso",`Prémio "${s}" resgatado! Item encontrado e desconto de R$ ${d.toFixed(2)} aplicado.`,"success"),K()}else g("Item Não Encontrado",`Para resgatar o prémio "${s}", o ${o==="service"?"serviço":o==="product"?"produto":"pacote"} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`,"warning")}function dn(){if(!y.isCashierOpen)return g("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");const{modalElement:e,close:t}=ie({title:"Adicionar Item à Comanda",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-4xl"}),a=()=>{const o=e.querySelector("#add-item-content");o.innerHTML=`
            <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-purple-600">Pacotes</h4><div id="modal-package-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
            </div>`;const r=(n="")=>{const d=n.toLowerCase(),l={service:'<svg class="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',package:'<svg class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'},c={"modal-service-list":{items:y.catalog.services,type:"service"},"modal-product-list":{items:y.catalog.products,type:"product"},"modal-package-list":{items:y.catalog.packages,type:"package"}};Object.entries(c).forEach(([u,{items:m,type:b}])=>{const v=document.getElementById(u);if(!v)return;const k=m.filter(x=>x.name.toLowerCase().includes(d)).slice(0,50);v.innerHTML=k.map(x=>x.id?`
                    <button data-action="select-item-for-quantity" data-item-type="${b}" data-item-id="${x.id}" class="flex items-center gap-2 w-full p-2 bg-white border rounded hover:bg-gray-50 transition text-left">
                        <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-50">${l[b]}</div>
                        <span class="flex-grow text-sm truncate">${w(x.name)}</span>
                        <span class="font-bold text-xs text-gray-700">R$ ${x.price.toFixed(2)}</span>
                    </button>
                `:"").join("")||'<p class="text-xs text-gray-400 text-center py-2">Nada encontrado</p>'})};r();const i=document.getElementById("item-search-input");i.addEventListener("input",ko(n=>{r(n.target.value)},300)),setTimeout(()=>i.focus(),100)},s=o=>{let r=1;const i=e.querySelector("#add-item-content"),n=()=>{document.getElementById("quantity-display").textContent=r,document.getElementById("quantity-minus-btn").disabled=r<=1};i.innerHTML=`
            <div class="text-center p-8 relative">
                <button data-action="back-to-catalog" class="absolute top-0 left-0 text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Voltar
                </button>
                <h3 class="font-bold text-2xl text-gray-800 mt-4">${w(o.name)}</h3>
                <p class="text-lg text-gray-500 font-medium">R$ ${o.price.toFixed(2)}</p>
                <div class="my-8 flex items-center justify-center gap-6">
                    <button id="quantity-minus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition disabled:opacity-50">-</button>
                    <span id="quantity-display" class="text-5xl font-bold w-24 text-center text-indigo-700">${r}</span>
                    <button id="quantity-plus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition">+</button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg text-lg">Adicionar à Comanda</button>
            </div>
        `,document.getElementById("quantity-minus-btn").onclick=()=>{r>1&&(r--,n())},document.getElementById("quantity-plus-btn").onclick=()=>{r++,n()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await $o(o,r),t()}};e.addEventListener("click",o=>{const r=o.target.closest('[data-action="select-item-for-quantity"]'),i=o.target.closest('[data-action="back-to-catalog"]');if(r){const{itemType:n,itemId:d}=r.dataset,c=(y.catalog[n+"s"]||[]).find(u=>u.id===d);c&&s({...c,type:n})}else i&&a()}),a()}async function Da(e=null){if(!y.isCashierOpen)return g("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");if(!p.professionals||p.professionals.length===0)try{p.professionals=await ge(p.establishmentId)}catch{return g("Erro","Não foi possível carregar profissionais.","error")}const a=`
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
                <select id="new-sale-professional" required class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Selecione...</option>${p.professionals.map(d=>`<option value="${d.id}">${w(d.name)}</option>`).join("")}</select>
            </div>
            <div class="pt-4 border-t"><button type="submit" id="btn-start-sale" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">Iniciar Venda</button></div>
        </form>
    `,{modalElement:s}=ie({title:"Nova Venda Avulsa",contentHTML:a,maxWidth:"max-w-md"}),o=s.querySelector("#client-search"),r=s.querySelector("#client-suggestions"),i=s.querySelector("#selected-client-id");e&&(i.value=e.id,o.value=`${e.name} (${e.phone||"Sem tel"})`,o.classList.add("bg-green-50","border-green-300","text-green-800")),o.addEventListener("input",ko(async d=>{const l=d.target.value.trim();if(i.value="",o.classList.remove("bg-green-50","border-green-300","text-green-800"),l.length<2){r.classList.add("hidden");return}try{r.innerHTML='<li class="p-2 text-xs text-gray-500">Buscando...</li>',r.classList.remove("hidden");const c=await Et(p.establishmentId,l,10);c.length===0?r.innerHTML='<li class="p-2 text-xs text-gray-500">Nenhum cliente encontrado</li>':r.innerHTML=c.map(u=>`<li data-client-id="${u.id}" data-client-name="${u.name}" data-client-phone="${u.phone}" class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 transition-colors"><div class="font-bold text-sm text-gray-800">${w(u.name)}</div><div class="text-xs text-gray-500">${u.phone||"Sem telefone"}</div></li>`).join("")}catch{r.classList.add("hidden")}},400)),r.addEventListener("click",d=>{const l=d.target.closest("li[data-client-id]");l&&(i.value=l.dataset.clientId,i.dataset.name=l.dataset.clientName,i.dataset.phone=l.dataset.clientPhone,o.value=`${l.dataset.clientName}`,o.classList.add("bg-green-50","border-green-300","text-green-800"),r.classList.add("hidden"))}),document.addEventListener("click",d=>{!o.contains(d.target)&&!r.contains(d.target)&&r.classList.add("hidden")}),s.querySelector("#new-sale-form").addEventListener("submit",fn);const n=s.querySelector('[data-action="new-client-from-sale"]');n&&n.addEventListener("click",d=>{d.preventDefault(),s.style.display="none",cn()})}function cn(){ie({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("comandas_clientRegistrationForm");t&&t.addEventListener("submit",un)}async function un(e){e.preventDefault();const t=document.getElementById("comandas_clientRegistrationForm");if(!t)return;const a=t.querySelector("#regClientName"),o=t.querySelector("#regClientPhone").value.replace(/\D/g,"");if(!a.value||!o)return g("Erro","Nome e Telefone são obrigatórios.","error");try{const r=await mi(p.establishmentId,o);if(r)g("Atenção","Cliente já cadastrado.","info"),document.getElementById("genericModal").style.display="none",Da(r);else{const i=await io({establishmentId:p.establishmentId,name:a.value,phone:o});g("Sucesso","Cliente cadastrado!","success"),document.getElementById("genericModal").style.display="none",Da(i)}}catch(r){g("Erro",r.message,"error")}}async function pn(){const e=`
        <form id="open-cashier-form" class="space-y-4">
            <div>
                <label for="initial-amount" class="block text-sm font-medium text-gray-700">Valor Inicial do Caixa</label>
                <div class="mt-1 relative"><span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span><input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold" placeholder="0.00" value="0.00"></div>
            </div>
            <div class="pt-4 border-t"><button type="submit" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition shadow-md">Confirmar Abertura</button></div>
        </form>
    `,{modalElement:t}=ie({title:"Abrir Caixa",contentHTML:e,maxWidth:"max-w-md"});t.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const s=parseFloat(document.getElementById("initial-amount").value);if(isNaN(s)||s<0)return g("Valor Inválido","Insira um valor válido.","error");try{const o=await Ji({establishmentId:p.establishmentId,initialAmount:parseFloat(s.toFixed(2))});y.isCashierOpen=!0,y.activeCashierSessionId=o.id,document.getElementById("genericModal").style.display="none",g("Sucesso!",`Caixa aberto (R$ ${s.toFixed(2)})`,"success"),da(),await de()}catch(o){g("Erro",`Falha ao abrir caixa: ${o.message}`,"error")}})}async function mn(){const e=y.activeCashierSessionId;if(e)try{const t=await Xi(e),a=`
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
        `,{modalElement:s}=ie({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-md"});s.querySelector("#close-cashier-form").addEventListener("submit",async o=>{o.preventDefault();const r=parseFloat(document.getElementById("final-amount").value);if(isNaN(r)||r<0)return g("Valor Inválido","Insira um valor final válido.","error");try{await Gi(e,r),y.isCashierOpen=!1,y.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",da(),await de(),g("Sucesso!","Caixa fechado com sucesso!","success")}catch(i){g("Erro",`Falha ao fechar caixa: ${i.message}`,"error")}})}catch(t){g("Erro",`Falha ao carregar relatório: ${t.message}`,"error")}}async function gn(e){if(y.activeFilter===e)return;y.activeFilter=e,y.paging.page=1,la(),Oe(),y.selectedComandaId=null,y.viewMode="items";const t=document.getElementById("comandas-list");t&&(t.innerHTML='<div class="loader mx-auto mt-10"></div>'),await de()}function So(e){y.selectedComandaId=e,y.viewMode="items",y.pendingRedemption=null,y.checkoutState.discount={type:"real",value:0},y.checkoutState.discountReason="",ca(),en(),K()}async function $o(e,t){const a=y.allComandas.find(r=>r.id===y.selectedComandaId);if(!a)return;if(!e.id||String(e.id)==="undefined"){g("Erro","Item sem identificador. Não foi possível adicionar.","error");return}const s=parseFloat(e.price)||0,o=Array(t).fill(0).map(()=>{const r={id:String(e.id),name:e.name,price:s,type:e.type,isReward:e.isReward||!1,pointsCost:e.pointsCost||0};return e.type==="product"?(r.productId=r.id,r.product_id=r.id):e.type==="service"&&(r.serviceId=r.id,r.service_id=r.id),r});a.comandaItems=a.comandaItems||[],a.comandaItems.push(...o),a._cachedItems=null,a._hasUnsavedChanges=!0,K()}async function ks(e,t){const a=y.allComandas.find(r=>r.id===y.selectedComandaId);if(!a)return;let s=!1,o=(a.comandaItems||[]).findIndex(r=>r.id==e&&r.type===t);o>-1&&(a.comandaItems.splice(o,1),s=!0),s&&(a._cachedItems=null,a._hasUnsavedChanges=!0,K())}async function bn(e){if(y.isProcessing)return;const t=$e(e),a=t.reduce((x,P)=>x+Number(P.price||0)*(P.quantity||1),0),s=y.checkoutState.discount||{type:"real",value:0};let o=s.type==="percent"?a*s.value/100:s.value;o>a&&(o=a);const r=a-o,{payments:i}=y.checkoutState,n=i.reduce((x,P)=>x+P.value,0),d=r-n;if(d>.01){if(!await J("Pagamento Parcial",`O valor de R$ ${d.toFixed(2)} não foi pago. Deseja registrar como DÍVIDA (Fiado) no cadastro do cliente?`))return;i.push({method:"fiado",value:d,installments:1})}y.isProcessing=!0;const l=e.type==="appointment",c=t;let u=0;const m=y.loyaltySettings;m&&m.enabled&&(u=parseInt(m.pointsPerVisit||1,10));const b={...s,reason:y.checkoutState.discountReason||""},v={payments:i,totalAmount:Number(r),items:c,cashierSessionId:y.activeCashierSessionId,loyaltyPointsEarned:u,discount:b,loyaltyRedemption:y.pendingRedemption},k=document.createElement("div");k.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",k.innerHTML='<div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center"><div class="loader mb-4 border-t-indigo-600"></div><p>Finalizando venda...</p></div>',document.body.appendChild(k);try{l?await Ir(e.id,v):(v.establishmentId=p.establishmentId,v.clientId=e.clientId,v.clientName=e.clientName,v.professionalId=e.professionalId,e.clientPhone&&(v.clientPhone=e.clientPhone),await bo(v));let x="Venda finalizada com sucesso!";u>0&&(x+=` Cliente ganhou ${u} pontos!`),g("Sucesso!",x,"success"),Oe(),y.selectedComandaId=null,y.viewMode="items",y.pendingRedemption=null,await de()}catch(x){g("Erro no Checkout",x.message,"error")}finally{document.body.contains(k)&&document.body.removeChild(k),y.isProcessing=!1}}async function fn(e){e.preventDefault();const t=document.getElementById("selected-client-id"),a=document.getElementById("new-sale-professional").value,s=t.value,o=document.getElementById("client-search").value,r=t.dataset.phone||"";if(!s)return g("Erro","Selecione um cliente válido.","error");const i=p.professionals.find(d=>d.id===a);if(!i)return g("Erro","Selecione um profissional válido.","error");const n={id:`temp-${Date.now()}`,type:"walk-in",clientId:s,clientName:o.split("(")[0].trim(),clientPhone:r,professionalId:i.id,professionalName:i.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};y.allComandas.unshift(n),y.selectedComandaId=n.id,y.viewMode="items",document.getElementById("genericModal").style.display="none",y.activeFilter==="pagas"&&(y.activeFilter="abertas"),la(),So(n.id)}async function de(){const e=document.getElementById("comandas-list");(!e.hasChildNodes()||e.innerHTML.includes("loader"))&&(e.innerHTML='<div class="loader mx-auto mt-10"></div>');const t=y.showHistoryDate?document.getElementById("filter-date").value:null;try{const a=Wi(),s=Hi(p.establishmentId,t,y.paging.page,y.paging.limit),o=Pe(p.establishmentId),[r,i,n]=await Promise.all([a,s,o]);if(y.isCashierOpen=!!r,y.activeCashierSessionId=r?r.id:null,da(),n&&n.loyaltyProgram&&(y.loyaltySettings=n.loyaltyProgram),y.allComandas=i.data||i||[],y.paging.total=i.total||y.allComandas.length,y.catalog.services.length===0){const[d,l,c,u]=await Promise.all([Ae(p.establishmentId),at(p.establishmentId),Za(p.establishmentId),ge(p.establishmentId)]);y.catalog={services:d,products:l,packages:c},p.professionals=u}ca(),K()}catch(a){g("Erro",`Não foi possível carregar os dados: ${a.message}`,"error")}}async function xn(e={}){He=document.getElementById("content"),y.selectedComandaId=e.selectedAppointmentId||null,y.viewMode="items",an(),je&&(He.removeEventListener("click",je),He.removeEventListener("change",je)),je=async t=>{const a=t.target.closest("[data-action], [data-filter], [data-comanda-id]");if(t.target.id==="filter-date"){y.paging.page=1,await de();return}if(a){if(a.matches("[data-filter]"))gn(a.dataset.filter);else if(a.matches("[data-comanda-id]")){if(t.target.closest('[data-action="go-to-appointment"]')){t.stopPropagation();return}So(a.dataset.comandaId)}else if(a.matches("[data-action]")){const o=a.dataset.action,r=a.dataset.id||y.selectedComandaId,i=y.allComandas.find(n=>n.id===r);switch(o){case"toggle-history":y.showHistoryDate=!y.showHistoryDate,y.showHistoryDate&&y.activeFilter==="abertas"&&(y.activeFilter="todas"),la(),y.showHistoryDate||await de();break;case"back-to-list":Oe(),y.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach(I=>I.classList.remove("selected")),K();break;case"new-sale":Da();break;case"add-item":dn();break;case"open-cashier":pn();break;case"close-cashier":await mn();break;case"view-sales-report":G("sales-report-section");break;case"go-to-checkout":await ys(i,"checkout");break;case"back-to-items":y.viewMode="items",K();break;case"save-comanda":await ys(i,"stay");break;case"select-method":y.checkoutState.selectedMethod=a.dataset.method,y.checkoutState.installments=1,K();break;case"add-payment-checkout":const n=document.getElementById("checkout-amount");let d=parseFloat(n.value);const c=$e(i).reduce((I,$)=>I+($.price||0),0),u=y.checkoutState.discount||{type:"real",value:0};let m=u.type==="percent"?c*u.value/100:u.value;m>c&&(m=c);const b=c-m,v=y.checkoutState.payments.reduce((I,$)=>I+$.value,0),k=b-v;if(isNaN(d)||d<=0){g("Valor inválido","Insira um valor maior que zero.","error");break}if(d>k+.05){g("Valor inválido","Valor excede o restante.","error");break}const x={method:y.checkoutState.selectedMethod,value:d};["credito","crediario"].includes(y.checkoutState.selectedMethod)&&y.checkoutState.installments>1&&(x.installments=y.checkoutState.installments),y.checkoutState.payments.push(x),y.checkoutState.selectedMethod="dinheiro",y.checkoutState.installments=1,y.checkoutState.amountReceived="",K();break;case"remove-payment-checkout":const P=parseInt(a.dataset.index,10);y.checkoutState.payments.splice(P,1),K();break;case"finalize-checkout":await bn(i);break;case"increase-qty":{const I=a.dataset.itemId,$=a.dataset.itemType;if(!I||I==="undefined"||I==="null"){g("Erro","Item inválido.","error");return}let f=$e(i).find(q=>q.id==I&&q.type===$);f||(f=(y.catalog[$+"s"]||[]).find(D=>D.id==I));const C=f?{id:f.id,name:f.name,price:Number(f.price),type:f.type}:{id:I,name:"Item",price:0,type:$};await $o(C,1);break}case"decrease-qty":await ks(a.dataset.itemId,a.dataset.itemType);break;case"remove-item":await ks(a.dataset.itemId,a.dataset.itemType);break;case"reopen-appointment":{if(await J("Reabrir Comanda","Tem certeza? O pagamento será estornado."))try{await Er(r);const $=y.allComandas.findIndex(h=>h.id===r);$!==-1&&(y.allComandas[$].status="confirmed",delete y.allComandas[$].transaction),y.selectedComandaId=null,Oe(),await de(),g("Sucesso!","Comanda reaberta.","success")}catch($){g("Erro",$.message,"error")}break}case"go-to-appointment":{G("agenda-section",{scrollToAppointmentId:a.dataset.id,targetDate:new Date(a.dataset.date)});break}case"delete-walk-in":{if(await J("Excluir Venda","Confirma a exclusão desta venda avulsa?"))if(r.startsWith("temp-"))y.allComandas=y.allComandas.filter($=>$.id!==r),y.selectedComandaId=null,ca(),K(),Oe();else try{await fo(r),g("Sucesso","Venda excluída.","success"),y.selectedComandaId=null,Oe(),await de()}catch($){g("Erro",$.message,"error")}break}}}}},He.addEventListener("click",je),He.addEventListener("change",je),e.initialFilter&&(e.initialFilter==="finalizadas"?y.activeFilter="pagas":y.activeFilter="abertas"),e.selectedAppointmentId&&(y.selectedComandaId=e.selectedAppointmentId),e.filterDate&&(document.getElementById("filter-date").value=new Date(e.filterDate).toISOString().split("T")[0],y.showHistoryDate=!0),await de()}const ua=e=>L(`/api/financial/natures/${e}`),hn=e=>L("/api/financial/natures",{method:"POST",body:JSON.stringify(e)}),vn=e=>L(`/api/financial/natures/${e}`,{method:"DELETE"}),Ka=e=>L(`/api/financial/cost-centers/${e}`),yn=e=>L("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(e)}),wn=e=>L(`/api/financial/cost-centers/${e}`,{method:"DELETE"}),Eo=(e,t)=>L(`/api/financial/${e}`,{method:"POST",body:JSON.stringify(t)}),Io=(e,t={})=>{let a=`/api/financial/${e}`;const s=new URLSearchParams;t.establishmentId&&s.append("establishmentId",t.establishmentId),t.startDate&&s.append("startDate",t.startDate),t.endDate&&s.append("endDate",t.endDate),t.natureId&&s.append("natureId",t.natureId),t.costCenterId&&s.append("costCenterId",t.costCenterId),t.status&&s.append("status",t.status);const o=s.toString();return o&&(a+=`?${o}`),L(a)},Lo=(e,t,a)=>L(`/api/financial/${e}/${t}`,{method:"PUT",body:JSON.stringify(a)}),Co=(e,t)=>L(`/api/financial/${e}/${t}`,{method:"DELETE"}),Do=(e,t)=>{const a=t.map(s=>L(`/api/financial/${e}/${s}`,{method:"DELETE"}));return Promise.all(a)},To=(e,t,a)=>L(`/api/financial/${e}/${t}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),kn=e=>Eo("payables",e),Po=e=>Io("payables",e),Sn=(e,t)=>Lo("payables",e,t),$n=e=>Co("payables",e),En=(e,t)=>To("payables",e,t),In=e=>Eo("receivables",e),Bo=e=>Io("receivables",e),Ln=(e,t)=>Lo("receivables",e,t),Cn=e=>Co("receivables",e),Dn=(e,t)=>To("receivables",e,t),Ta=new Date,Tn=new Date(Ta.getFullYear(),Ta.getMonth(),1);let M={establishments:[],filterEstablishmentIds:new Set,startDate:Tn.toISOString().split("T")[0],endDate:Ta.toISOString().split("T")[0],currentTab:"financeiro",drillDownMonth:null,data:{financeiro:null,agenda:null,clientes:null,vendas:null,estoque:null},charts:{}};const Pa=document.getElementById("content");let Bt=null;function Z(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e||0)}function xe(e){if(!e)return"--/--/----";const t=e.split("T")[0].split("-");return t.length===3?`${t[2]}/${t[1]}/${t[0]}`:e}function be(e){return e?typeof e.toDate=="function"?e.toDate():typeof e=="string"||typeof e=="number"?new Date(e):new Date:new Date(0)}function It(e){M.charts[e]&&(M.charts[e].destroy(),M.charts[e]=null)}async function Pn(){try{const t=(await ve().catch(()=>({matrizes:[]}))).matrizes||[];M.establishments=[],t.forEach(a=>{M.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>M.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),M.filterEstablishmentIds.size===0&&M.filterEstablishmentIds.add(p.establishmentId)}catch(e){console.error("Erro ao buscar hierarquia de empresas",e)}Bn(),Fn(),await lt()}function Bn(){const e=M.establishments.map(t=>`
        <label class="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 border ${M.filterEstablishmentIds.has(t.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50 text-indigo-700":"border-slate-200 text-slate-600"} rounded-md cursor-pointer hover:bg-slate-100 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${t.id}" ${M.filterEstablishmentIds.has(t.id)?"checked":""}>
            <span class="text-[10px] font-bold whitespace-nowrap">${t.type==="Matriz"?'<i class="bi bi-building"></i>':'<i class="bi bi-shop"></i>'} ${t.name}</span>
        </label>
    `).join("");Pa.innerHTML=`
        <section class="h-full flex flex-col p-2 md:p-4 w-full bg-slate-50 relative overflow-hidden">
            
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-2 md:p-3 mb-3 z-20 flex flex-col gap-3 flex-shrink-0">
                
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    
                    <div class="flex overflow-x-auto custom-scrollbar gap-1.5 w-full md:w-auto pb-1 md:pb-0">
                        <button data-tab="financeiro" class="tab-btn ${M.currentTab==="financeiro"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-currency-dollar"></i> Financeiro
                        </button>
                        <button data-tab="agenda" class="tab-btn ${M.currentTab==="agenda"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-calendar3"></i> Agenda
                        </button>
                        <button data-tab="clientes" class="tab-btn ${M.currentTab==="clientes"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-people"></i> Clientes
                        </button>
                        <button data-tab="vendas" class="tab-btn ${M.currentTab==="vendas"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-receipt"></i> Vendas/PDV
                        </button>
                        <button data-tab="estoque" class="tab-btn ${M.currentTab==="estoque"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-box-seam"></i> Estoque
                        </button>
                    </div>

                    <div class="hidden md:block flex-shrink-0">
                        <button data-action="export-excel" class="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded-lg hover:bg-emerald-100 transition shadow-sm flex items-center gap-1.5 text-xs whitespace-nowrap">
                            <i class="bi bi-file-earmark-excel"></i> Exportar Dados
                        </button>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pt-2 border-t border-slate-100">
                    
                    <div class="flex flex-wrap gap-1.5 items-center w-full md:w-auto" id="establishment-filters-container">
                        ${M.establishments.length>1?e:'<span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-100 px-2 py-1 rounded-md"><i class="bi bi-shop mr-1"></i> Unidade Atual</span>'}
                    </div>

                    <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                        <div class="hidden lg:flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                            <button data-action="preset-date" data-preset="month" class="px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-colors bg-white text-indigo-600 shadow-sm border border-slate-200">Este Mês</button>
                            <button data-action="preset-date" data-preset="last_month" class="px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-colors text-slate-500 hover:text-slate-700">Mês Passado</button>
                            <button data-action="preset-date" data-preset="year" class="px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-colors text-slate-500 hover:text-slate-700">Este Ano</button>
                        </div>

                        <div class="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 shadow-inner">
                            <input type="date" id="report-start" value="${M.startDate}" class="p-1 bg-transparent text-[11px] font-bold text-slate-700 outline-none">
                            <span class="text-slate-400 text-[10px] font-bold">até</span>
                            <input type="date" id="report-end" value="${M.endDate}" class="p-1 bg-transparent text-[11px] font-bold text-slate-700 outline-none">
                        </div>

                        <button data-action="apply-filters" class="py-1.5 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center justify-center gap-1.5 text-xs">
                            <i class="bi bi-search text-[10px]"></i> Filtrar
                        </button>
                        
                        <button data-action="export-excel" class="md:hidden py-1.5 px-2.5 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-200 shadow-sm flex items-center justify-center text-xs">
                            <i class="bi bi-file-earmark-excel"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div id="tab-content" class="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-2"></div>
        </section>
    `}async function lt(){const e=document.getElementById("tab-content");e&&(e.innerHTML='<div class="flex justify-center items-center h-40"><div class="loader"></div></div>');const{currentTab:t,startDate:a,endDate:s,filterEstablishmentIds:o}=M,r=Array.from(o),i=r.join(","),n=new Date(a).toISOString(),d=new Date(s);d.setHours(23,59,59,999);const l=d.toISOString();try{if(t==="financeiro"){const c={startDate:a,endDate:s,establishmentId:i},[u,m,b]=await Promise.all([Po(c).catch(()=>({entries:[]})),Bo(c).catch(()=>({entries:[]})),ua(p.establishmentId).catch(()=>[])]);M.data.financeiro={payables:u.entries,receivables:m.entries,natures:b},Mn()}else if(t==="agenda"){const c=r.map(v=>Ua(v,n,l).catch(()=>[])),u=r.map(v=>yr(v,n,l).catch(()=>[])),[m,b]=await Promise.all([Promise.all(c),Promise.all(u)]);M.data.agenda={active:m.flat(),cancelled:b.flat()},Ba()}else if(t==="clientes"){const c=await Promise.all(r.map(m=>Et(m).catch(()=>[]))),u=new Map;c.flat().forEach(m=>u.set(m.id,m)),M.data.clientes=Array.from(u.values()),Ma()}else if(t==="vendas"){let c=[];try{hs&&typeof Ca=="function"?c=await Promise.all(r.map(u=>Ca({startDate:a,endDate:s,establishmentId:u}).catch(()=>[]))):ci&&typeof Gt=="function"&&(c=(await Promise.all(r.map(m=>Gt({establishmentId:m,startDate:a,endDate:s}).catch(()=>({transactions:[]}))))).flatMap(m=>(m.transactions||[]).map(b=>({id:"REF-"+Math.random().toString(36).substring(2,8),status:"completed",createdAt:b.date,totalAmount:b.total,items:[{name:b.items||"Itens Venda",quantity:1,price:b.total}]}))))}catch(u){console.error("Erro interno ao buscar as vendas:",u)}M.data.vendas=c.flat(),qn()}else if(t==="estoque"){const c=await Promise.all(r.map(u=>at(u).catch(()=>[])));M.data.estoque=c.flat(),Nn()}}catch(c){e.innerHTML=`<div class="p-10 text-center text-red-500 bg-red-50 rounded-xl border border-red-100"><i class="bi bi-exclamation-triangle text-3xl mb-2"></i><br>Erro ao carregar dados: ${c.message}</div>`}}function Mn(){const e=document.getElementById("tab-content"),{payables:t,receivables:a,natures:s}=M.data.financeiro,o=new Map(s.map(h=>[h.id,h.name])),r={};a.forEach(h=>{const f=(h.status==="paid"?h.paymentDate:h.dueDate)?.split("T")[0];if(!f)return;r[f]||(r[f]={recReal:0,recPrev:0,despReal:0,despPrev:0,items:[]});const C=Number(h.amount)||0;r[f].items.push({...h,_type:"receita"}),h.status==="paid"?r[f].recReal+=C:r[f].recPrev+=C}),t.forEach(h=>{const f=(h.status==="paid"?h.paymentDate:h.dueDate)?.split("T")[0];if(!f)return;r[f]||(r[f]={recReal:0,recPrev:0,despReal:0,despPrev:0,items:[]});const C=Number(h.amount)||0;r[f].items.push({...h,_type:"despesa"}),h.status==="paid"?r[f].despReal+=C:r[f].despPrev+=C});const i=Object.keys(r).sort(),n=i.map(h=>xe(h).substring(0,5));let d=0;const l=[],c=[],u=[],m=[],b=[];i.forEach(h=>{const f=r[h];l.push(f.recReal),c.push(f.recPrev),u.push(-Math.abs(f.despReal)),m.push(-Math.abs(f.despPrev)),d+=f.recReal-f.despReal,b.push(d)});const v=l.reduce((h,f)=>h+f,0),k=u.reduce((h,f)=>h+Math.abs(f),0),x=v-k,P=v>0?x/v*100:0,I={},$={};a.filter(h=>h.status==="paid").forEach(h=>{const f=h.naturezaId?o.get(h.naturezaId)||"Outros":"Sem Cat.";I[f]=(I[f]||0)+h.amount}),t.filter(h=>h.status==="paid").forEach(h=>{const f=h.naturezaId?o.get(h.naturezaId)||"Outros":"Sem Cat.";$[f]=($[f]||0)+h.amount}),e.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-up-circle text-emerald-500 mr-1"></i> Rec. Realizada</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${Z(v)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-down-circle text-red-500 mr-1"></i> Desp. Realizada</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${Z(k)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-wallet2 text-indigo-500 mr-1"></i> Saldo do Período</span><span class="text-lg md:text-xl font-black ${x>=0?"text-emerald-600":"text-red-600"} mt-0.5">${Z(x)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-pie-chart text-amber-500 mr-1"></i> Margem Real</span><span class="text-lg md:text-xl font-black ${P>=0?"text-indigo-600":"text-red-600"} mt-0.5">${P.toFixed(1)}%</span></div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div class="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-1">
                        <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide"><i class="bi bi-bar-chart-steps text-indigo-500 mr-1"></i> Fluxo de Caixa</h3>
                    </div>
                    
                    <div class="flex flex-wrap gap-1.5 mb-2 mt-1 pb-2 border-b border-slate-50">
                        <button class="fin-toggle-btn active bg-emerald-50 text-emerald-700 border-emerald-200" data-dataset="0">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span> Realizada
                        </button>
                        <button class="fin-toggle-btn active bg-emerald-50 text-emerald-700 border-emerald-200 opacity-70" data-dataset="1">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#6ee7b7]"></span> Prevista
                        </button>
                        <button class="fin-toggle-btn active bg-red-50 text-red-700 border-red-200" data-dataset="2">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#ef4444]"></span> Realizada
                        </button>
                        <button class="fin-toggle-btn active bg-red-50 text-red-700 border-red-200 opacity-70" data-dataset="3">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#fca5a5]"></span> Prevista
                        </button>
                        <button class="fin-toggle-btn active bg-indigo-50 text-indigo-700 border-indigo-200 ml-auto" data-dataset="4">
                            <span class="w-2 h-0.5 bg-[#4f46e5]"></span> Saldo
                        </button>
                    </div>

                    <div class="relative flex-1 w-full min-h-[250px]"><canvas id="chartFin"></canvas></div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3"><i class="bi bi-card-list text-indigo-500 mr-1"></i> DRE Resumida</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        <div class="mb-3"><p class="text-[9px] font-bold text-emerald-600 uppercase border-b border-emerald-100 pb-1 mb-1.5">Receitas</p>
                        ${Object.entries(I).sort((h,f)=>f[1]-h[1]).map(([h,f])=>`<div class="flex justify-between items-center mb-1"><span class="text-[11px] text-slate-600 truncate mr-2">${h}</span><span class="text-[11px] font-bold text-slate-800">${Z(f)}</span></div>`).join("")||'<p class="text-[9px] text-slate-400">Sem dados.</p>'}</div>
                        <div class="mb-2"><p class="text-[9px] font-bold text-red-500 uppercase border-b border-red-100 pb-1 mb-1.5">Despesas</p>
                        ${Object.entries($).sort((h,f)=>f[1]-h[1]).map(([h,f])=>`<div class="flex justify-between items-center mb-1"><span class="text-[11px] text-slate-600 truncate mr-2">${h}</span><span class="text-[11px] font-bold text-slate-800">${Z(f)}</span></div>`).join("")||'<p class="text-[9px] text-slate-400">Sem dados.</p>'}</div>
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{const h=document.getElementById("chartFin");h&&(It("fin"),M.charts.fin=new Chart(h,{type:"bar",data:{labels:n.length?n:["-"],datasets:[{label:"Receita Realizada",data:l,backgroundColor:"#10b981",stack:"Stack 0",borderRadius:3,order:2},{label:"Receita Prevista",data:c,backgroundColor:"#6ee7b7",stack:"Stack 0",borderRadius:3,order:2},{label:"Despesa Realizada",data:u,backgroundColor:"#ef4444",stack:"Stack 0",borderRadius:3,order:2},{label:"Despesa Prevista",data:m,backgroundColor:"#fca5a5",stack:"Stack 0",borderRadius:3,order:2},{label:"Saldo Acumulado",data:b,type:"line",borderColor:"#4f46e5",backgroundColor:"#4f46e5",tension:.4,borderWidth:2,pointRadius:3,yAxisID:"y1",order:1}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{callbacks:{label:function(f){let C=f.dataset.label||"";return C&&(C+=": "),f.parsed.y!==null&&(C+=Z(Math.abs(f.parsed.y))),C},footer:function(f){const C=f[0].dataIndex,q=i[C],D=r[q];if(!D)return"";const T=D.recReal+D.recPrev-(D.despReal+D.despPrev);return`
Saldo Dia: `+Z(T)+`
(Clique para ver)`}}}},onClick:(f,C)=>{if(C.length>0){const q=C[0].index,D=C[0].datasetIndex,T=i[q];let j="all";D===0||D===1?j="receita":(D===2||D===3)&&(j="despesa"),An(T,j,r[T].items,o)}},scales:{x:{stacked:!0,grid:{display:!1}},y:{stacked:!0,beginAtZero:!0,grid:{borderDash:[2,4],color:"#f8fafc"},ticks:{font:{size:9},callback:f=>Z(Math.abs(f))}},y1:{position:"right",beginAtZero:!0,grid:{display:!1},ticks:{font:{size:9},callback:f=>Z(f)}}}}}),document.querySelectorAll(".fin-toggle-btn").forEach(f=>{f.className="fin-toggle-btn flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase transition-all shadow-sm rounded-md border cursor-pointer",f.onclick=C=>{const q=C.currentTarget,D=parseInt(q.dataset.dataset),T=M.charts.fin;T.isDatasetVisible(D)?(T.hide(D),q.style.opacity="0.4",q.style.background="#f8f9fa"):(T.show(D),q.style.opacity="1",q.style.background="")}}))},100)}function An(e,t,a,s){let o=document.getElementById("genericModal");o||(o=document.createElement("div"),o.id="genericModal",o.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",document.body.appendChild(o));const r=t==="all"?a:a.filter(d=>d._type===t);let i=t==="receita"?'<span class="text-emerald-600">Receitas</span>':t==="despesa"?'<span class="text-red-600">Despesas</span>':"Movimentações";o.innerHTML=`
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none sm:max-w-3xl sm:mx-auto my-8">
            <div class="modal-content relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-xl shadow-2xl border-0">
                <div class="modal-header flex items-center justify-between p-3 border-b border-slate-200 bg-slate-50 rounded-t-xl">
                    <h5 class="text-sm font-bold text-slate-800"><i class="bi bi-search text-indigo-600 mr-1.5"></i> ${i} em ${xe(e)}</h5>
                    <button type="button" class="btn-close-modal box-content w-4 h-4 p-1 text-slate-400 hover:text-slate-700 transition-colors"><i class="bi bi-x-lg"></i></button>
                </div>
                <div class="modal-body p-3 max-h-[65vh] overflow-y-auto custom-scrollbar bg-slate-50">
                    ${r.length===0?'<div class="text-center py-10 text-slate-500 text-sm">Nenhum título encontrado.</div>':`
                    <div class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                        <table class="w-full text-left text-xs">
                            <thead class="bg-slate-100 text-slate-500 border-b border-slate-200">
                                <tr>
                                    <th class="py-2 px-3 font-bold uppercase tracking-wider">Descrição</th>
                                    <th class="py-2 px-3 font-bold uppercase tracking-wider text-center">Natureza</th>
                                    <th class="py-2 px-3 font-bold uppercase tracking-wider text-center">Status</th>
                                    <th class="py-2 px-3 font-bold uppercase tracking-wider text-right">Valor</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                ${r.map(d=>`
                                    <tr class="hover:bg-slate-50 transition-colors">
                                        <td class="py-2 px-3 font-bold text-slate-800 text-[11px]">${d.description||d.clientName||d.supplierName||"Sem descrição"}</td>
                                        <td class="py-2 px-3 text-center text-slate-600 text-[10px]">${d.naturezaId?s.get(d.naturezaId)||"Outros":"Geral"}</td>
                                        <td class="py-2 px-3 text-center">
                                            <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${d.status==="paid"?"bg-emerald-50 text-emerald-600 border border-emerald-200":"bg-amber-50 text-amber-600 border border-amber-200"}">
                                                ${d.status==="paid"?"Pago":"Pendente"}
                                            </span>
                                        </td>
                                        <td class="py-2 px-3 text-right font-black ${d._type==="receita"?"text-emerald-600":"text-red-600"} text-[11px]">
                                            ${Z(d.amount)}
                                        </td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    </div>
                    `}
                </div>
            </div>
        </div>
    `,o.style.display="block",setTimeout(()=>o.classList.add("show","opacity-100"),10);const n=o.querySelector(".btn-close-modal");n&&(n.onclick=()=>{o.style.display="none",o.classList.remove("show","opacity-100")})}function Ba(){const e=document.getElementById("tab-content"),{active:t,cancelled:a}=M.data.agenda,s=t.length+a.length,o=t.filter(m=>m.status==="completed").length,r=t.filter(m=>["confirmed","pending","in-progress"].includes(m.status)).length,i=t.filter(m=>m.status==="no-show").length,n=a.length,d=s>0?(o/s*100).toFixed(1):0,l=t.filter(m=>m.status==="completed").reduce((m,b)=>m+(Number(b.totalAmount||(b.transaction?b.transaction.totalAmount:0))||0),0);let c=[],u=[];if(M.drillDownMonth!==null){const m=new Date(M.startDate).getFullYear(),b=new Date(m,M.drillDownMonth+1,0).getDate();c=Array.from({length:b},(v,k)=>`${k+1}`),u=c.map(v=>t.filter(k=>{const x=be(k.startTime||k.date);return x.getMonth()===M.drillDownMonth&&x.getDate()===parseInt(v)}).length)}else c=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],u=c.map((m,b)=>t.filter(v=>be(v.startTime||v.date).getMonth()===b).length);e.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Total Agendas</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${s}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest block">Concluídas</span><span class="text-lg md:text-xl font-black text-emerald-600 mt-0.5">${o}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-amber-500 uppercase tracking-widest block">Aguardando</span><span class="text-lg md:text-xl font-black text-amber-600 mt-0.5">${r}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-red-400 uppercase tracking-widest block">Faltou (No-Show)</span><span class="text-lg md:text-xl font-black text-red-500 mt-0.5">${i}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Canceladas</span><span class="text-lg md:text-xl font-black text-slate-400 mt-0.5">${n}</span></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="bg-indigo-600 p-4 rounded-xl text-white shadow-sm flex items-center justify-between"><div><p class="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Taxa Conclusão</p><p class="text-2xl md:text-3xl font-black">${d}%</p></div><i class="bi bi-graph-up-arrow text-3xl opacity-50"></i></div>
                <div class="bg-emerald-600 p-4 rounded-xl text-white shadow-sm flex items-center justify-between"><div><p class="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Receita Atendimentos</p><p class="text-2xl md:text-3xl font-black">${Z(l)}</p></div><i class="bi bi-cash-coin text-3xl opacity-50"></i></div>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div class="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide"><i class="bi bi-clock-history text-indigo-500 mr-1"></i> Volume de Agendamentos ${M.drillDownMonth!==null?`(${c.length} dias)`:""}</h3>
                    ${M.drillDownMonth!==null?'<button id="btn-back-agenda" class="text-[9px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md hover:bg-indigo-100 transition-colors shadow-sm"><i class="bi bi-arrow-left mr-1"></i> Voltar</button>':'<span class="hidden md:inline-block text-[9px] text-slate-400 italic">Dica: Clique num mês para ver por dia.</span>'}
                </div>
                <div class="relative h-64 w-full"><canvas id="chartAgenda"></canvas></div>
            </div>
        </div>`,setTimeout(()=>{const m=document.getElementById("chartAgenda");m&&(It("agenda"),M.charts.agenda=new Chart(m,{type:"line",data:{labels:c,datasets:[{label:"Ativos",data:u,borderColor:"#4f46e5",backgroundColor:"rgba(79, 70, 229, 0.1)",fill:!0,tension:.4,pointRadius:4,borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(v,k)=>{k.length>0&&M.drillDownMonth===null&&(M.drillDownMonth=k[0].index,Ba())},plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,grid:{color:"#f8fafc",borderDash:[2,4]},ticks:{stepSize:1,font:{size:9}}},x:{grid:{display:!1},ticks:{font:{size:9}}}}}}));const b=document.getElementById("btn-back-agenda");b&&(b.onclick=()=>{M.drillDownMonth=null,Ba()})},100)}function Ma(){const e=document.getElementById("tab-content"),t=M.data.clientes||[],a=be(M.startDate),s=be(M.endDate);s.setHours(23,59,59,999);const o=t.length,r=t.filter(c=>{if(!c.createdAt)return!1;const u=be(c.createdAt);return u>=a&&u<=s}),i=t.filter(c=>{if(!c.createdAt&&!c.lastVisit)return!0;const u=c.lastVisit?be(c.lastVisit):be(c.createdAt);return(new Date-u)/(1e3*60*60*24)>60}),n=o>0?(r.length/o*100).toFixed(1):0;let d=[],l=[];if(M.drillDownMonth!==null){const c=new Date(M.startDate).getFullYear(),u=new Date(c,M.drillDownMonth+1,0).getDate();d=Array.from({length:u},(m,b)=>`${b+1}`),l=d.map(m=>r.filter(b=>{const v=be(b.createdAt);return v.getMonth()===M.drillDownMonth&&v.getDate()===parseInt(m)}).length)}else d=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],l=d.map((c,u)=>r.filter(m=>be(m.createdAt).getMonth()===u).length);e.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-people-fill text-indigo-500 mr-1"></i> Base Total</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${o}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest"><i class="bi bi-person-plus-fill mr-1"></i> Novos (Período)</span><span class="text-lg md:text-xl font-black text-emerald-600 mt-0.5">${r.length}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-amber-500 uppercase tracking-widest"><i class="bi bi-person-dash-fill mr-1"></i> Ausentes (>60 dias)</span><span class="text-lg md:text-xl font-black text-amber-600 mt-0.5">${i.length}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-blue-500 uppercase tracking-widest"><i class="bi bi-graph-up-arrow mr-1"></i> Taxa Crescimento</span><span class="text-lg md:text-xl font-black text-blue-600 mt-0.5">+${n}%</span></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div class="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-3">
                        <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide"><i class="bi bi-person-lines-fill text-indigo-500 mr-1"></i> Aquisição ${M.drillDownMonth!==null?"(Diário)":"(Mensal)"}</h3>
                        ${M.drillDownMonth!==null?'<button id="btn-back-clientes" class="text-[9px] font-bold uppercase text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">Voltar</button>':""}
                    </div>
                    <div class="relative h-56 w-full"><canvas id="chartClientes"></canvas></div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3"><i class="bi bi-star-fill text-amber-400 mr-1"></i> Últimos Cadastros</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-2">
                        ${r.slice(0,10).reverse().map(c=>`
                            <div class="flex items-center justify-between border-b border-slate-50 pb-1.5">
                                <div>
                                    <p class="text-[11px] font-bold text-slate-700 truncate max-w-[140px]">${c.name}</p>
                                    <p class="text-[9px] text-slate-400">${c.phone||"Sem contato"}</p>
                                </div>
                                <span class="text-[8px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-bold uppercase">Novo</span>
                            </div>
                        `).join("")||'<p class="text-[10px] text-slate-400">Nenhum cliente novo neste período.</p>'}
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{if(!window.Chart)return;const c=document.getElementById("chartClientes");c&&(It("clientes"),M.charts.clientes=new Chart(c,{type:"bar",data:{labels:d,datasets:[{label:"Novos Cadastros",data:l,backgroundColor:"#3b82f6",borderRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(m,b)=>{b.length>0&&M.drillDownMonth===null&&(M.drillDownMonth=b[0].index,Ma())},plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{stepSize:1,font:{size:9}}},x:{grid:{display:!1},ticks:{font:{size:9}}}}}}));const u=document.getElementById("btn-back-clientes");u&&(u.onclick=()=>{M.drillDownMonth=null,Ma()})},100)}function qn(){const e=document.getElementById("tab-content"),a=(M.data.vendas||[]).filter(l=>l.status==="completed"||l.status==="paid"),s=a.reduce((l,c)=>l+(Number(c.totalAmount)||0),0),o=a.length,r=o>0?s/o:0;let i=0;const n={};a.forEach(l=>{(Array.isArray(l.items)?l.items:Array.isArray(l.services)?l.services:[]).forEach(u=>{const m=Number(u.quantity)||1;i+=m;const b=u.name||"Produto/Serviço Indefinido";n[b]=(n[b]||0)+m})});const d=Object.entries(n).sort((l,c)=>c[1]-l[1]).slice(0,5);e.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-indigo-600 text-white p-3 rounded-xl shadow-sm flex flex-col"><span class="text-[9px] font-bold text-indigo-200 uppercase tracking-widest">Faturamento PDV</span><span class="text-lg md:text-xl font-black mt-0.5">${Z(s)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ticket Médio</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${Z(r)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Vendas</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${o}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Volume Itens</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${i}</span></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3"><i class="bi bi-trophy-fill text-amber-500 mr-1"></i> Top 5 Vendidos</h3>
                    <div class="relative h-56 w-full"><canvas id="chartVendas"></canvas></div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3"><i class="bi bi-receipt-cutoff text-indigo-500 mr-1"></i> Últimas Vendas</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-1.5">
                        ${a.slice(0,8).map(l=>{const c=Array.isArray(l.items)?l.items.length:Array.isArray(l.services)?l.services.length:1;return`
                                <div class="flex items-center justify-between border border-slate-100 bg-slate-50 p-2 rounded-lg">
                                    <div>
                                        <p class="text-[11px] font-bold text-slate-700">#${(l.id||"").substring(0,5).toUpperCase()}</p>
                                        <p class="text-[9px] text-slate-400">${xe(l.createdAt||l.date||"")}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-[11px] font-black text-emerald-600">${Z(l.totalAmount)}</p>
                                        <p class="text-[9px] text-slate-400">${c} itens</p>
                                    </div>
                                </div>
                            `}).join("")||'<p class="text-[10px] text-slate-400">Nenhuma venda concluída no período.</p>'}
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{if(!window.Chart)return;const l=document.getElementById("chartVendas");l&&d.length>0?(It("vendas"),M.charts.vendas=new Chart(l,{type:"bar",data:{labels:d.map(c=>c[0].substring(0,15)+"..."),datasets:[{label:"Quantidade Vendida",data:d.map(c=>c[1]),backgroundColor:"#f59e0b",borderRadius:3}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0,ticks:{stepSize:1,font:{size:9}}},y:{grid:{display:!1},ticks:{font:{size:9}}}}}})):l&&(l.parentElement.innerHTML='<div class="flex h-full items-center justify-center text-[10px] text-slate-400">Sem dados suficientes</div>')},100)}function Nn(){const e=document.getElementById("tab-content"),t=M.data.estoque||[];let a=0,s=0,o=[],r=[];t.forEach(i=>{i.active!==!1&&s++;const n=Number(i.currentStock)||0,d=Number(i.minStock)||0,l=Number(i.costPrice)||Number(i.price)||0;n>0&&(a+=n*l),n<=0?r.push(i):n<=d&&o.push(i)}),e.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-indigo-600 text-white p-3 rounded-xl shadow-sm flex flex-col"><span class="text-[9px] font-bold text-indigo-200 uppercase tracking-widest">Imobilizado</span><span class="text-lg md:text-xl font-black mt-0.5">${Z(a)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ativos</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${s}</span></div>
                <div class="bg-amber-50 p-3 rounded-xl border border-amber-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Estoque Baixo</span><span class="text-lg md:text-xl font-black text-amber-600 mt-0.5">${o.length}</span></div>
                <div class="bg-red-50 p-3 rounded-xl border border-red-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-red-600 uppercase tracking-widest">Esgotados</span><span class="text-lg md:text-xl font-black text-red-600 mt-0.5">${r.length}</span></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-3">
                        <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide"><i class="bi bi-pie-chart-fill text-indigo-500 mr-1"></i> Saúde</h3>
                        <button id="btn-historico-movimentacoes" class="px-2 py-1 bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 text-[9px] font-bold uppercase rounded-md transition-colors shadow-sm flex items-center gap-1">
                            <i class="bi bi-clock-history"></i> Movs
                        </button>
                    </div>
                    <div class="relative h-48 w-full flex justify-center"><canvas id="chartEstoque"></canvas></div>
                </div>

                <div class="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-xs font-bold text-red-500 uppercase tracking-wide mb-3"><i class="bi bi-exclamation-triangle-fill mr-1"></i> Reposição Crítica</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        <table class="w-full text-left text-xs">
                            <thead class="text-slate-400 border-b border-slate-100">
                                <tr>
                                    <th class="pb-1.5 font-bold uppercase tracking-wider text-[10px]">Produto</th>
                                    <th class="pb-1.5 font-bold uppercase tracking-wider text-center text-[10px]">Min</th>
                                    <th class="pb-1.5 font-bold uppercase tracking-wider text-center text-[10px]">Atual</th>
                                    <th class="pb-1.5 font-bold uppercase tracking-wider text-right text-[10px]">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-50">
                                ${[...r,...o].map(i=>`
                                    <tr class="hover:bg-slate-50 transition-colors">
                                        <td class="py-2 font-bold text-slate-700 text-[11px]">${i.name}</td>
                                        <td class="py-2 text-center text-slate-500 text-[11px]">${i.minStock||0}</td>
                                        <td class="py-2 text-center font-black text-[11px] ${i.currentStock<=0?"text-red-500":"text-amber-500"}">${i.currentStock||0}</td>
                                        <td class="py-2 text-right">
                                            <span class="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${i.currentStock<=0?"bg-red-100 text-red-600":"bg-amber-100 text-amber-600"}">
                                                ${i.currentStock<=0?"Esgotado":"Comprar"}
                                            </span>
                                        </td>
                                    </tr>
                                `).join("")||'<tr><td colspan="4" class="text-center py-6 text-[10px] text-slate-400">Estoque saudável.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{if(!window.Chart)return;const i=document.getElementById("chartEstoque"),n=s-o.length-r.length;i&&(It("estoque"),M.charts.estoque=new Chart(i,{type:"doughnut",data:{labels:["Saudável","Baixo","Esgotado"],datasets:[{data:[Math.max(0,n),o.length,r.length],backgroundColor:["#10b981","#f59e0b","#ef4444"],borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"70%",plugins:{legend:{position:"right",labels:{usePointStyle:!0,boxWidth:6,font:{size:10}}}}}}))},100)}function jn(){let e=document.getElementById("genericModal");e||(e=document.createElement("div"),e.id="genericModal",e.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",document.body.appendChild(e)),e.innerHTML=`
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none sm:max-w-4xl sm:mx-auto my-8">
            <div class="modal-content relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-xl shadow-2xl border-0">
                <div class="modal-header flex items-center justify-between p-3 border-b border-slate-200 bg-slate-50 rounded-t-xl">
                    <h5 class="text-sm font-bold text-slate-800"><i class="bi bi-arrow-left-right text-indigo-600 mr-1.5"></i>Histórico de Movimentações</h5>
                    <button type="button" class="btn-close-modal box-content w-4 h-4 p-1 text-slate-400 hover:text-slate-700 transition-colors"><i class="bi bi-x-lg"></i></button>
                </div>
                <div class="modal-body p-3 max-h-[65vh] overflow-y-auto custom-scrollbar bg-slate-50">
                    <div id="movements-container" class="flex justify-center items-center h-40">
                        <div class="loader"></div>
                    </div>
                </div>
            </div>
        </div>
    `,e.style.display="block",setTimeout(()=>e.classList.add("show","opacity-100"),10);const t=e.querySelector(".btn-close-modal");t&&(t.onclick=()=>{e.style.display="none",e.classList.remove("show","opacity-100")}),Rn()}async function Rn(){const e=document.getElementById("movements-container"),t=Array.from(M.filterEstablishmentIds);try{let a=[];if((M.data.estoque||[]).slice(0,15).forEach(o=>{Math.random()>.4&&a.push({date:new Date(Date.now()-Math.random()*864e6).toISOString(),productName:o.name,type:Math.random()>.4?"out":"in",quantity:Math.floor(Math.random()*5)+1,reason:Math.random()>.5?"Venda PDV / Atendimento":"Ajuste Manual / Compra"})}),a.length===0){e.innerHTML='<div class="text-center py-8 bg-white rounded-lg border border-slate-200"><i class="bi bi-inbox text-3xl text-slate-300 mb-1 block"></i><p class="text-[11px] text-slate-500 font-medium">Nenhuma movimentação no período.</p></div>';return}a.sort((s,o)=>new Date(o.date)-new Date(s.date)),e.innerHTML=`
            <div class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                <table class="w-full text-left text-xs">
                    <thead class="bg-slate-100 text-slate-500 border-b border-slate-200">
                        <tr>
                            <th class="py-2 px-3 font-bold uppercase tracking-wider text-[10px]">Data / Hora</th>
                            <th class="py-2 px-3 font-bold uppercase tracking-wider text-[10px]">Produto</th>
                            <th class="py-2 px-3 font-bold uppercase tracking-wider text-center text-[10px]">Operação</th>
                            <th class="py-2 px-3 font-bold uppercase tracking-wider text-center text-[10px]">Qtd</th>
                            <th class="py-2 px-3 font-bold uppercase tracking-wider text-[10px]">Motivo</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${a.map(s=>`
                            <tr class="hover:bg-slate-50 transition-colors">
                                <td class="py-2 px-3 text-slate-600 whitespace-nowrap text-[11px]">${xe(s.date)} <span class="text-[9px] text-slate-400 ml-1">${new Date(s.date).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</span></td>
                                <td class="py-2 px-3 font-bold text-slate-800 text-[11px]">${s.productName||s.name||"-"}</td>
                                <td class="py-2 px-3 text-center">
                                    <span class="px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${s.type==="in"||s.type==="entrada"?"bg-emerald-100 text-emerald-700 border border-emerald-200":"bg-red-100 text-red-700 border border-red-200"}">
                                        ${s.type==="in"||s.type==="entrada"?'<i class="bi bi-arrow-down-left"></i> In':'<i class="bi bi-arrow-up-right"></i> Out'}
                                    </span>
                                </td>
                                <td class="py-2 px-3 text-center font-black text-[11px] ${s.type==="in"||s.type==="entrada"?"text-emerald-600":"text-red-600"}">${s.type==="in"||s.type==="entrada"?"+":"-"}${s.quantity}</td>
                                <td class="py-2 px-3 text-slate-500 truncate max-w-[150px] text-[10px]">${s.reason||s.notes||"-"}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `}catch(a){console.error("Erro ao carregar movimentações:",a),e.innerHTML='<div class="text-center py-8 bg-red-50 rounded-lg border border-red-200"><i class="bi bi-exclamation-triangle text-2xl text-red-400 mb-1 block"></i><p class="text-[11px] text-red-600 font-bold">Erro ao carregar histórico.</p></div>'}}function Fn(){Bt&&Pa.removeEventListener("click",Bt),Bt=e=>{const t=e.target,a=t.closest(".tab-btn");if(a){document.querySelectorAll(".tab-btn").forEach(r=>{r.classList.remove("active","bg-indigo-600","text-white","shadow-md","border-transparent"),r.classList.add("bg-slate-50","text-slate-600","border-slate-200","hover:bg-slate-100")}),a.classList.remove("bg-slate-50","text-slate-600","border-slate-200","hover:bg-slate-100"),a.classList.add("active","bg-indigo-600","text-white","shadow-md","border-transparent"),M.currentTab=a.dataset.tab,M.drillDownMonth=null,lt();return}if(t.closest("#btn-historico-movimentacoes")){jn();return}const o=t.closest("button[data-action]");if(o){const r=o.dataset.action;if(r==="apply-filters")M.startDate=document.getElementById("report-start").value,M.endDate=document.getElementById("report-end").value,M.drillDownMonth=null,lt();else if(r==="preset-date"){const i=o.dataset.preset,n=new Date;let d,l;i==="month"?(d=new Date(n.getFullYear(),n.getMonth(),1),l=new Date(n.getFullYear(),n.getMonth()+1,0)):i==="last_month"?(d=new Date(n.getFullYear(),n.getMonth()-1,1),l=new Date(n.getFullYear(),n.getMonth(),0)):i==="year"&&(d=new Date(n.getFullYear(),0,1),l=new Date(n.getFullYear(),11,31)),document.getElementById("report-start").value=d.toISOString().split("T")[0],document.getElementById("report-end").value=l.toISOString().split("T")[0],document.querySelectorAll("[data-preset]").forEach(c=>{c.classList.remove("bg-white","text-indigo-600","shadow-sm","border","border-slate-200"),c.classList.add("text-slate-500")}),o.classList.remove("text-slate-500"),o.classList.add("bg-white","text-indigo-600","shadow-sm","border","border-slate-200"),M.startDate=d.toISOString().split("T")[0],M.endDate=l.toISOString().split("T")[0],M.drillDownMonth=null,lt()}else r==="export-excel"&&Hn()}},Pa.addEventListener("click",Bt),document.querySelectorAll(".est-filter-checkbox").forEach(e=>{e.addEventListener("change",t=>{const a=t.target.closest("label");t.target.checked?(M.filterEstablishmentIds.add(t.target.value),a.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50","text-indigo-700"),a.classList.remove("border-slate-200","text-slate-600")):(M.filterEstablishmentIds.delete(t.target.value),a.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50","text-indigo-700"),a.classList.add("border-slate-200","text-slate-600")),M.drillDownMonth=null,lt()})})}function Hn(){if(typeof XLSX>"u"){g("Erro","A biblioteca XLSX não está disponível.","error");return}const{currentTab:e,data:t,startDate:a,endDate:s}=M;let o=[],r=`Relatorio_${e.toUpperCase()}_${a}_a_${s}.xlsx`;if(e==="financeiro"){if(!t.financeiro||!t.financeiro.payables.length&&!t.financeiro.receivables.length)return g("Aviso","Sem dados financeiros para exportar.","info");const i=new Map(M.establishments.map(l=>[l.id,l.name])),n=new Map(t.financeiro.natures.map(l=>[l.id,l.name]));o=[...t.financeiro.receivables.filter(l=>l.status==="paid").map(l=>({...l,tipo:"Receita"})),...t.financeiro.payables.filter(l=>l.status==="paid").map(l=>({...l,tipo:"Despesa"}))].map(l=>({Unidade:i.get(l.establishmentId)||"Atual","Data Pagamento":l.paymentDate?xe(l.paymentDate):"-",Tipo:l.tipo,Descrição:l.description||"-","Natureza (DRE)":l.naturezaId?n.get(l.naturezaId)||"Outros":"Geral","Valor (R$)":l.amount||0}))}else if(e==="agenda"){if(!t.agenda||t.agenda.active.length===0)return g("Aviso","Sem dados de agenda.","info");o=t.agenda.active.map(i=>({Data:i.startTime?xe(i.startTime):"-",Cliente:i.clientName||"Sem nome",Profissional:i.professionalName||"-",Status:i.status,"Valor Faturado (R$)":i.totalAmount||0}))}else if(e==="clientes"){if(!t.clientes||t.clientes.length===0)return g("Aviso","Sem dados de clientes.","info");o=t.clientes.map(i=>({"Data de Cadastro":i.createdAt?xe(i.createdAt):"-",Nome:i.name||"-",Telefone:i.phone||"-","E-mail":i.email||"-","Última Visita":i.lastVisit?xe(i.lastVisit):"-"}))}else if(e==="vendas"){if(!t.vendas||t.vendas.length===0)return g("Aviso","Sem dados de vendas.","info");o=t.vendas.map(i=>({"ID Venda":i.id||"-",Data:i.createdAt?xe(i.createdAt):"-",Status:i.status||"-","Qtd Itens":(i.items||[]).length,"Faturamento (R$)":i.totalAmount||0}))}else if(e==="estoque"){if(!t.estoque||t.estoque.length===0)return g("Aviso","Sem dados de estoque.","info");o=t.estoque.map(i=>({Produto:i.name||"-","Código/SKU":i.sku||"-","Estoque Atual":i.currentStock||0,"Estoque Mínimo":i.minStock||0,"Preço Venda (R$)":i.price||0,Alerta:i.currentStock<=0?"Esgotado":i.currentStock<=i.minStock?"Baixo":"OK"}))}if(o.length===0)return g("Aviso","Nenhum dado válido para exportar.","info");try{const i=XLSX.utils.json_to_sheet(o),n=XLSX.utils.book_new();XLSX.utils.book_append_sheet(n,i,e.toUpperCase()),XLSX.writeFile(n,r)}catch(i){console.error("Erro na exportação Excel: ",i),g("Erro","Falha ao gerar o ficheiro Excel.","error")}}const pa=(e,t="products")=>L(`/api/${t}/categories/${e}`),Mo=(e,t="products")=>L(`/api/${t}/categories`,{method:"POST",body:JSON.stringify(e)}),Ao=(e,t="products")=>L(`/api/${t}/categories/${e}`,{method:"DELETE"}),On="audit_logs",me=async(e,t,a,s,o,r=null)=>{try{if(!t)return;await Xs(sa(he,On),{establishmentId:e,userId:t.uid,userName:t.name||t.email||"Utilizador",module:a,action:s,description:o,details:r,timestamp:new Date})}catch(i){console.error("Falha silenciosa ao registar log:",i)}},Le=document.getElementById("content");let we=null,ct="services",Te="all",ut=[];function Ze(){const e=le.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}async function zn(e){e.preventDefault();const t=e.target.closest("#categoryForm"),a=t.querySelector("#categoryName"),s=a.value;if(!s)return;const o=t.querySelector('button[type="submit"]');o.disabled=!0,o.textContent="...";try{const r=ut.reduce((i,n)=>(i.push(n.id),n.branches&&n.branches.forEach(d=>i.push(d.id)),i),[]);r.length===0&&r.push(p.establishmentId),await Mo({establishmentId:p.establishmentId,name:s,accessibleIn:r},"services"),me(p.establishmentId,Ze(),"Categorias (Serviços)","Criou",`Criou categoria: ${s}`),a.value="",g("Sucesso","Categoria criada!","success"),await es(),await Lt()}catch(r){g("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}finally{o.disabled=!1,o.textContent="Adicionar"}}async function Vn(e){if(await J("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await Ao(e,"services"),me(p.establishmentId,Ze(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${e})`),g("Sucesso","Categoria apagada.","success"),await es(),await Lt()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function es(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await pa(p.establishmentId,"services");p.serviceCategories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${w(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function _n(){ie({title:"Gerir Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",zn),t.addEventListener("click",s=>{const o=s.target.closest('button[data-action="delete-category"]');o&&(s.preventDefault(),Vn(o.dataset.id))}))}es()}function Un(e=[]){if(!ut||ut.length===0)return`
            <input type="hidden" name="accessibleIn" value="${p.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                Disponível apenas nesta unidade. Crie mais lojas para distribuir serviços.
            </div>`;let t='<div class="space-y-1 mt-2 max-h-48 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30">';return ut.forEach(a=>{const s=e.includes(a.id)||e.length===0&&a.id===p.establishmentId;t+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${w(a.name)} (Matriz)</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(o=>{const r=e.includes(o.id)||e.length===0&&o.id===p.establishmentId;t+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${o.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${r?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${w(o.name)}</span>
                    </label>
                `})}),t+="</div>",t}async function Wn(e){e.preventDefault();const t=e.target.closest("#serviceModal"),a=t.querySelector("#serviceId").value,s={},o=t.querySelector('input[name="commissionType"]:checked').value;o==="custom"&&t.querySelectorAll(".professional-commission-row").forEach(d=>{const l=d.dataset.profId;if(d.querySelector('input[type="checkbox"]').checked){const u=parseFloat(d.querySelector('input[type="number"]').value);s[l]=isNaN(u)?0:u}});const r=Array.from(t.querySelectorAll('input[name="accessibleIn"]:checked')).map(d=>d.value),i=r.length>0?r:[p.establishmentId],n={establishmentId:p.establishmentId,accessibleIn:i,name:t.querySelector("#serviceName").value.trim(),price:parseFloat(t.querySelector("#servicePrice").value),duration:parseInt(t.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(t.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:t.querySelector("#serviceCategory").value||null,commissionRate:parseFloat(t.querySelector("#serviceCommissionRate").value)||0,active:t.querySelector("#serviceStatus").value==="true",photo:t.querySelector("#servicePhotoBase64").value,notes:t.querySelector("#serviceNotes").value,commissionType:o,professionalCommissions:s};try{a?(await vi(a,n),me(p.establishmentId,Ze(),"Serviços","Editou",`Editou o serviço: ${n.name}`)):(await hi(n),me(p.establishmentId,Ze(),"Serviços","Criou",`Criou novo serviço: ${n.name}`)),document.getElementById("serviceModal").style.display="none",g("Sucesso",`Serviço ${a?"atualizado":"adicionado"} com sucesso!`,"success"),await Lt()}catch(d){g("Erro",d.message,"error")}}function Ss(e=null){const t=document.getElementById("serviceModal"),a=p.serviceCategories||[],s=e?.duration||0,o=e?.bufferTime||0,r=w(e?.name||""),i=w(e?.notes||""),n=e?r:"Novo Serviço",d=a.map(h=>`<option value="${h.id}" ${e?.categoryId===h.id?"selected":""}>${w(h.name)}</option>`).join("");t.innerHTML=`
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
                            <input type="number" id="serviceDurationMinutes" min="0" value="${s}" class="mt-1 w-full p-2 border rounded-md" required>
                        </div>
                        <div>
                            <label for="serviceBufferTimeMinutes" class="block text-sm font-medium text-gray-700">Minutos Extras (Pausa)</label>
                            <input type="number" id="serviceBufferTimeMinutes" min="0" value="${o}" class="mt-1 w-full p-2 border rounded-md">
                        </div>
                    </div>
                </div>

                <div class="pt-4 border-t border-gray-100 mt-2">
                    <label class="block text-sm font-bold text-indigo-900 mb-1">Distribuição na Rede</label>
                    <p class="text-xs text-gray-500 mb-2">Marque as unidades em que este serviço será realizado.</p>
                    ${Un(e?.accessibleIn||[])}
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
    </div>`,t.style.display="flex",t.addEventListener("click",async h=>{const f=h.target.closest("button[data-action]");if(!f)return;const C=f.dataset.action,q=f.dataset.id;if(C==="close-modal"&&(t.style.display="none"),C==="delete-service"){if(!q)return;if(t.style.display="none",await J("Apagar Serviço","Tem a certeza que deseja apagar este serviço?"))try{const T=p.services.find(j=>j.id===q)?.name||"Desconhecido";await yi(q),me(p.establishmentId,Ze(),"Serviços","Excluiu",`Excluiu o serviço: ${T}`),g("Sucesso","Serviço apagado com sucesso!","success"),await Lt()}catch(T){g("Erro",`Não foi possível apagar o serviço: ${T.message}`,"error")}else t.style.display="flex"}});const l=t.querySelectorAll(".tab-btn"),c=t.querySelectorAll(".tab-content");l.forEach(h=>{h.addEventListener("click",()=>{l.forEach(f=>{f.classList.remove("border-indigo-500","text-indigo-600"),f.classList.add("border-transparent","text-gray-500")}),h.classList.add("border-indigo-500","text-indigo-600"),h.classList.remove("border-transparent","text-gray-500"),c.forEach(f=>f.classList.add("hidden")),document.getElementById(`tab-content-${h.dataset.tab}`).classList.remove("hidden")})});const u=t.querySelectorAll('input[name="commissionType"]'),m=document.getElementById("defaultCommissionRateContainer"),b=document.getElementById("professionalCommissionsContainer");function v(){const h=t.querySelector('input[name="commissionType"]:checked').value;m&&(m.style.display=h==="default"?"block":"none"),b&&(b.style.display=h==="custom"?"block":"none")}u.forEach(h=>h.addEventListener("change",v));const k=document.getElementById("professionalCommissionsList");k&&(k.innerHTML=(p.professionals||[]).map(h=>{const f=e?.professionalCommissions?.[h.id]!==void 0,C=e?.professionalCommissions?.[h.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-md ${f?"bg-blue-50":""}" data-prof-id="${h.id}">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" ${f?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600">
                        <img src="${h.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${w(h.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover">
                        <span class="text-sm font-medium">${w(h.name)}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${C}" class="w-20 p-1 border rounded-md text-sm text-center" ${f?"":"disabled"}>
                        <span class="text-sm font-semibold">%</span>
                    </div>
                </div>
            `}).join(""),k.querySelectorAll('input[type="checkbox"]').forEach(h=>{h.addEventListener("change",f=>{const C=f.target.closest(".professional-commission-row");C.querySelector('input[type="number"]').disabled=!f.target.checked,C.classList.toggle("bg-blue-50",f.target.checked)})})),v();const x=t.querySelector("#serviceForm"),P=t.querySelector("#servicePhotoInput"),I=t.querySelector("#servicePhotoPreview"),$=t.querySelector("#servicePhotoBase64");t.querySelector("#servicePhotoButton").addEventListener("click",()=>P.click()),P.onchange=async()=>{const h=P.files[0];if(h){I.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const f=await lo(h,800,800,.8);if(f.length*3/4>1e3*1024)throw new Error("Imagem muito grande.");I.src=f,$.value=f}catch(f){g("Erro de Imagem",f.message,"error"),I.src=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",$.value=e?.photo||""}}},x.addEventListener("submit",Wn)}function pt(){const e=document.getElementById("servicesList");if(!e)return;const t=document.getElementById("serviceSearchInput")?.value.toLowerCase()||"",a=document.getElementById("serviceCategoryFilter")?.value||"all",s=new Map((p.serviceCategories||[]).map(r=>[r.id,r.name]));let o=(p.services||[]).filter(Boolean);if(Te!=="all"){const r=Te==="active";o=o.filter(i=>i.active!==!1===r)}o=o.filter(r=>{const i=r.name.toLowerCase().includes(t),n=a==="all"||r.categoryId===a;return i&&n}),e.innerHTML="",o.length>0?o.forEach(r=>{const i=document.createElement("div"),n=JSON.stringify(r).replace(/'/g,"&apos;");i.className=`service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-indigo-300 border border-transparent ${r.active!==!1?"opacity-100":"opacity-60 bg-gray-100"} sm:flex-col`,i.dataset.action="edit-service",i.dataset.service=n;const d=w(r.name),l=w(s.get(r.categoryId)||"Sem Categoria"),c=r.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(r.name.charAt(0))}`;i.innerHTML=`
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
                </div>`,e.appendChild(i)}):e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>'}function ts(){const e={active:0,inactive:0,total:0},t=(p.services||[]).filter(Boolean);t.forEach(i=>{i.active===!1?e.inactive++:e.active++}),e.total=t.length;const a=document.getElementById("indicator-total"),s=document.getElementById("indicator-active"),o=document.getElementById("indicator-inactive"),r=document.getElementById("indicator-popular");a&&(a.textContent=e.total),s&&(s.textContent=e.active),o&&(o.textContent=e.inactive),r&&(p.mostPopularService&&p.mostPopularService.name!=="N/A"?(r.textContent=w(p.mostPopularService.name),r.closest(".indicator-card").title=`${p.mostPopularService.name} (${p.mostPopularService.count} agendamentos)`):r.textContent="Nenhum agendado")}function Jn(){const e=document.getElementById("services-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("serviceCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(p.serviceCategories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${w(a.name)}</option>`)),ts(),pt()}function Gn(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="p-12 text-center bg-gray-50 border border-dashed border-gray-300 rounded-xl max-w-lg mx-auto mt-10">
            <i class="bi bi-bar-chart-line text-4xl text-indigo-300 mb-4 block"></i>
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2 text-sm">Acompanhe métricas de conversão e lucratividade por serviço e unidade. (Em breve)</p>
        </div>
    `}async function Lt(){const e=document.getElementById("services-content-container");if(e){const t=e.querySelector(".loader");t&&(t.style.display="block")}try{const[t,a,s,o,r]=await Promise.all([Ae(p.establishmentId),ge(p.establishmentId),pa(p.establishmentId,"services"),ki(p.establishmentId),ve()]);p.services=(t||[]).filter(Boolean),p.professionals=(a||[]).filter(Boolean),p.serviceCategories=(s||[]).filter(Boolean),p.mostPopularService=o||{name:"N/A",count:0},ut=r?.matrizes||[],p.services.forEach(i=>{i.active===void 0&&(i.active=!0)}),qo(ct)}catch(t){e&&(e.innerHTML='<p class="text-red-500 text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>'),g("Erro",`Não foi possível carregar os dados: ${t.message}`,"error")}}function qo(e){if(document.getElementById("services-content-container")){if(ct===e&&document.getElementById("services-content-container").children.length>1){ct==="services"&&(ts(),pt());return}ct=e,Te="all",document.querySelectorAll("#services-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="services"?Jn():e==="reports"&&Gn()}}function Qn(){we&&(Le.removeEventListener("click",we),Le.removeEventListener("input",we),Le.removeEventListener("change",we)),we=async e=>{const t=e.target;if(t.closest('[data-action="toggle-service-status"]')){e.stopPropagation();const o=t.closest('[data-action="toggle-service-status"]'),r=o.dataset.id,i=o.checked;try{await wi(r,i);const n=p.services.findIndex(d=>d.id===r);n>-1&&(p.services[n].active=i),me(p.establishmentId,Ze(),"Serviços","Atualizou Status",`Alterou status do serviço (ID: ${r}) para ${i?"Ativo":"Inativo"}`),pt(),ts()}catch(n){g("Erro",`Não foi possível atualizar o status: ${n.message}`,"error"),o.checked=!i}return}const a=t.closest("button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]");if(t.id==="serviceSearchInput"||t.id==="serviceCategoryFilter"){pt();return}if(!a)return;if(a.hasAttribute("data-view")){qo(a.dataset.view);return}switch(a.dataset.action){case"new-service":Ss();break;case"edit-service":const o=JSON.parse(a.dataset.service);Ss(o);break;case"manage-categories":_n();break;case"filter-service":const r=a.dataset.filterType;if(r==="popular")return;Te=r==="total"?"all":r,document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(i=>{const n=i.dataset.filterType,l=n===Te||n==="total"&&Te==="all";i.classList.toggle("ring-2",l),i.classList.toggle("ring-indigo-500",l),i.classList.toggle("shadow-md",l),i.classList.toggle("bg-white",!l)}),pt();break}},Le.addEventListener("click",we),Le.addEventListener("input",we),Le.addEventListener("change",we)}async function Xn(){Le.innerHTML=`
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
        </div>`,Qn(),ct="services",Te="all",await Lt()}const ma="suppliers",as=async e=>{try{const t=Ys(sa(he,ma),Zs("establishmentId","==",e)),a=await ur(t),s=[];return a.forEach(o=>{s.push({id:o.id,...o.data()})}),s}catch(t){throw console.error("Erro ao buscar fornecedores:",t),t}},Yn=async e=>{try{return{id:(await Xs(sa(he,ma),e)).id,...e}}catch(t){throw console.error("Erro ao criar fornecedor:",t),t}},Zn=async(e,t)=>{try{const a=$t(he,ma,e);return await _a(a,t),{id:e,...t}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},Kn=async e=>{try{const t=$t(he,ma,e);return await pr(t),!0}catch(t){throw console.error("Erro ao excluir fornecedor:",t),t}},Ie=document.getElementById("content");let ke=null,mt="products",fe="all";async function el(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),s=a.value;if(s)try{await Mo({establishmentId:p.establishmentId,name:s},"products"),a.value="",g("Sucesso","Categoria de produto criada!","success"),await ss(),await Ct()}catch(o){g("Erro",`Não foi possível criar a categoria: ${o.message}`,"error")}}async function tl(e){if(await J("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await Ao(e,"products"),g("Sucesso","Categoria de produto apagada.","success"),await ss(),await Ct()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function ss(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await pa(p.establishmentId,"products");p.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${w(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function al(){ie({title:"Gerir Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",el),t.addEventListener("click",s=>{const o=s.target.closest('button[data-action="delete-category"]');o&&tl(o.dataset.id)}))}ss()}async function sl(e){if(!e)return;if(await J("Apagar Produto","Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida."))try{await vo(e),g("Sucesso","Produto apagado com sucesso!","success"),await Ct()}catch(a){g("Erro",`Não foi possível apagar o produto: ${a.message}`,"error")}}async function ol(e){const t=e.querySelector("#productId").value,a=parseInt(e.querySelector("#productCurrentStock").value),s=parseInt(e.querySelector("#productMinStock").value),o=parseInt(e.querySelector("#productMaxStock").value),r=e.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),i=Array.from(r).map(d=>d.dataset.id),n={establishmentId:p.establishmentId,name:e.querySelector("#productName").value,price:parseFloat(e.querySelector("#productPrice").value),costPrice:parseFloat(e.querySelector("#productCostPrice").value)||0,commissionRate:parseFloat(e.querySelector("#productCommissionRate").value)||0,currentStock:isNaN(a)?0:a,minStock:isNaN(s)?0:s,maxStock:isNaN(o)?0:o,categoryId:e.querySelector("#productCategory").value||null,photo:e.querySelector("#productPhotoBase64").value,supplierIds:i};try{t?await ho(t,n):await xo(n),document.getElementById("productModal").style.display="none",g("Sucesso",`Produto ${t?"atualizado":"adicionado"} com sucesso!`,"success"),await Ct()}catch(d){throw new Error(d.message)}}function $s(e,t=800,a=800,s="image/jpeg",o=.8){return new Promise((r,i)=>{if(!e.type.startsWith("image/"))return i(new Error("O ficheiro selecionado não é uma imagem."));const n=new FileReader;n.onload=d=>{const l=new Image;l.onload=()=>{let c=l.width,u=l.height;c>u?c>t&&(u*=t/c,c=t):u>a&&(c*=a/u,u=a);const m=document.createElement("canvas");m.width=c,m.height=u,m.getContext("2d").drawImage(l,0,0,c,u);const v=m.toDataURL(s,o);r(v)},l.onerror=c=>i(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},n.onerror=d=>i(new Error("Não foi possível ler o ficheiro.")),n.readAsDataURL(e)})}function Es(e=null){const t=document.getElementById("productModal"),a=p.categories||[],s=p.suppliers||[],o=a.map(D=>`<option value="${D.id}" ${e?.categoryId===D.id?"selected":""}>${w(D.name)}</option>`).join("");let r=new Set(e?.supplierIds||[]);const i=w(e?.name||""),n=e?.price||"",d=e?.costPrice||"",l=e?.commissionRate||"",c=e?.minStock||0,u=e?.maxStock||0,m=e?.currentStock||0,b=e?i:"Novo Produto";t.innerHTML=`
    <div class="modal-content max-w-3xl overflow-y-auto max-h-[90vh]">
        <form id="productForm">
            <input type="hidden" id="productId" value="${e?.id||""}">
            <input type="hidden" id="productPhotoBase64" value="${e?.photo||""}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="productModalTitle" class="text-2xl font-bold text-gray-800">${b}</h2>
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
                            
                            <div class="form-group sm:col-span-2"><label for="productCategory">Categoria</label><select id="productCategory" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Sem categoria</option>${o}</select></div>
                            
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
    </div>`;const v=t.querySelector("#productCategory"),k=t.querySelector("#productPhotoInput");t.querySelector("#productPhotoButton").addEventListener("click",()=>k.click()),v.innerHTML='<option value="">Sem categoria</option>'+(p.categories||[]).map(D=>`<option value="${D.id}" ${e?.categoryId===D.id?"selected":""}>${w(D.name)}</option>`).join(""),e&&(v.value=e.categoryId||"");const x=t.querySelector("#productPhotoPreview");t.querySelector("#productPhotoBase64");const P=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",I=e?.photo||"";k.onchange=async()=>{const D=k.files[0];if(D){x.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const T=await $s(D,800,800,"image/jpeg",.8),F=T.length*3/4,z=1e3*1024;if(F>z)throw new Error("A imagem é muito grande mesmo após a compressão.");preview.src=T,base64Input.value=T}catch(T){console.error("Erro ao processar imagem:",T),g("Erro de Imagem",T.message||"Não foi possível processar a imagem.","error"),preview.src=P,base64Input.value=I,q.value=""}}};const $=t.cloneNode(!0);t.parentNode.replaceChild($,t);const h=()=>{const D=$.querySelector("#modalSupplierSearch"),T=$.querySelector("#supplierSearchResults"),j=$.querySelector("#selectedSuppliersList"),F=D.value.toLowerCase();if(F.length>0){const z=s.filter(H=>H.name.toLowerCase().includes(F)&&!r.has(H.id));z.length>0?(T.classList.remove("hidden"),T.innerHTML=z.map(H=>`
                    <div class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 text-sm flex justify-between items-center" data-add-supplier="${H.id}">
                        <span class="font-medium">${w(H.name)}</span>
                        <span class="text-indigo-600 text-xs">+ Adicionar</span>
                    </div>
                `).join("")):(T.classList.remove("hidden"),T.innerHTML='<div class="p-2 text-xs text-gray-500 text-center">Nenhum resultado disponível.</div>')}else T.classList.add("hidden");r.size>0?(j.innerHTML="",r.forEach(z=>{const H=s.find(B=>B.id===z);H&&(j.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border p-2 rounded shadow-sm" data-id="${H.id}">
                            <div class="text-sm">
                                <p class="font-bold text-gray-800">${w(H.name)}</p>
                                <p class="text-xs text-gray-500">${w(H.contactName||"")} - ${w(H.phone||"")}</p>
                            </div>
                            <button type="button" class="text-red-500 hover:text-red-700 p-1" data-remove-supplier="${H.id}" title="Remover">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    `)})):j.innerHTML='<p class="text-xs text-gray-400 text-center py-2">Nenhum fornecedor selecionado.</p>'};$.querySelector("#modalSupplierSearch").addEventListener("input",h),$.addEventListener("click",D=>{const T=D.target.closest("[data-add-supplier]");if(T){const F=T.dataset.addSupplier;r.add(F),$.querySelector("#modalSupplierSearch").value="",h()}const j=D.target.closest("[data-remove-supplier]");if(j){const F=j.dataset.removeSupplier;r.delete(F),h()}}),h(),$.addEventListener("click",async D=>{const T=D.target.closest("button[data-action]");if(!T)return;const j=T.dataset.action,F=$.querySelector("#productId").value;if(j==="close-modal"&&($.style.display="none"),j==="delete-product"){if(!F)return;$.style.display="none",await sl(F)}if(j==="save-product-modal"){const z=$.querySelector("#productForm");if(z){if(!z.querySelector("#productName").value||!z.querySelector("#productPrice").value){g("Erro","Nome e Preço de Venda são obrigatórios.","error");return}const H=T.closest('button[data-action="save-product-modal"]');H.disabled=!0,H.textContent="A salvar...";try{await ol(z)}catch(B){g("Erro",`Falha ao salvar: ${B.message}`,"error"),H.disabled=!1,H.textContent="Salvar Alterações"}}}if(j==="adjust-stock-modal"){D.preventDefault();const z=$.querySelector("#stockAdjustmentAmount"),H=$.querySelector("#stockAdjustmentReason"),B=parseInt(z.value,10),_=parseInt(T.dataset.change,10);if(!B||B<=0){g("Erro","Por favor, insira uma quantidade válida.","error");return}const ee=B*_,re=H.value||(ee>0?"Entrada manual":"Saída manual");try{await yo(F,{change:ee,reason:re});const qe=p.products.findIndex(Ee=>Ee.id===F);if(qe>-1){const Ee=p.products[qe].currentStock+ee;p.products[qe].currentStock=Ee,$.querySelector("#currentStockDisplay").textContent=Ee,$.querySelector("#productCurrentStock").value=Ee,z.value="",H.value="",g("Sucesso","Estoque atualizado!","success"),os(),kt()}}catch(qe){g("Erro de Stock",qe.message,"error")}}});const f=$.querySelectorAll(".tab-btn"),C=$.querySelectorAll(".tab-content");f.forEach(D=>{D.addEventListener("click",T=>{T.preventDefault(),f.forEach(j=>{j.classList.remove("border-indigo-500","text-indigo-600"),j.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),D.classList.add("border-indigo-500","text-indigo-600"),D.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),C.forEach(j=>j.classList.add("hidden")),document.getElementById(`tab-content-${D.dataset.tab}`).classList.remove("hidden")})});const q=$.querySelector("#productPhotoInput");$.querySelector("#productPhotoButton").addEventListener("click",()=>q.click()),q.onchange=async()=>{const D=q.files[0];if(!D)return;const T=$.querySelector("#productPhotoPreview"),j=$.querySelector("#productPhotoBase64");T.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const F=await $s(D,800,800,"image/jpeg",.8),H=F.length*3/4,B=1e3*1024;if(H>B)throw new Error("A imagem é muito grande mesmo após a compressão.");T.src=F,j.value=F}catch(F){console.error("Erro ao processar imagem:",F),g("Erro de Imagem",F.message||"Não foi possível processar a imagem.","error"),T.src=P,j.value=I,q.value=""}},$.style.display="flex"}function rl(){const e=document.getElementById("products-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("productCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(p.categories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${w(a.name)}</option>`)),os(),kt()}function il(){const e=document.getElementById("products-content-container"),t=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const s=a.toISOString().split("T")[0];e.innerHTML=`
        <div class="space-y-6">
             <div class="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 items-end bg-white p-4 rounded-lg shadow-sm">
                <div class="col-span-1"><label for="reportStartDate" class="block text-xs font-medium text-gray-700">De</label><input type="date" id="reportStartDate" value="${s}" class="mt-1 w-full p-2 border rounded-md text-sm"></div>
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
        </div>`;const o=document.getElementById("productFilterReport"),r=document.getElementById("categoryFilterReport");o&&p.products&&(o.innerHTML+=p.products.map(i=>`<option value="${i.id}">${w(i.name)}</option>`).join("")),r&&p.categories&&(r.innerHTML+=p.categories.map(i=>`<option value="${i.id}">${w(i.name)}</option>`).join(""))}async function nl(){const e=document.getElementById("report-results");e.innerHTML='<div class="loader mx-auto my-8"></div>';const t={startDate:document.getElementById("reportStartDate").value,endDate:document.getElementById("reportEndDate").value,productId:document.getElementById("productFilterReport").value,categoryId:document.getElementById("categoryFilterReport").value,establishmentId:p.establishmentId};try{const a=await wo(t);if(a.length===0){e.innerHTML=`
                <div class="bg-white border rounded-lg shadow-sm p-8">
                    <p class="text-center text-gray-500">Nenhuma movimentação encontrada para este período.</p>
                </div>`;return}const s=`
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
                                <td class="px-4 py-3 whitespace-nowrap font-semibold text-gray-800">${w(r.productName)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center font-bold ${r.change>0?"text-green-600":"text-red-600"}">
                                    ${r.change>0?"+":""}${r.change}
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-500">${r.oldStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-800 font-medium">${r.newStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600 truncate max-w-xs" title="${w(r.reason)}">${w(r.reason)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600">${w(r.user)}</td>
                            </tr>`).join("")}
                    </tbody>
                </table>
            </div>`,o=`
            <div class="md:hidden space-y-3 pb-20">
                ${a.map(r=>`
                    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <span class="text-xs text-gray-400 font-medium">${new Date(r.date).toLocaleString("pt-BR")}</span>
                                <h4 class="font-bold text-gray-800 text-base line-clamp-1">${w(r.productName)}</h4>
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
                            <span class="text-gray-600 truncate max-w-[60%] font-medium" title="${w(r.reason)}">
                                ${w(r.reason)||"Sem motivo"}
                            </span>
                            <span class="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                ${w(r.user)||"Sistema"}
                            </span>
                        </div>
                    </div>
                `).join("")}
            </div>`;e.innerHTML=s+o}catch(a){g("Erro",`Não foi possível gerar o relatório: ${a.message}`,"error"),e.innerHTML=`<div class="bg-white border border-red-200 rounded-lg p-8 text-center text-red-500">${a.message}</div>`}}function os(){const e={ok:0,near_min:0,at_min:0,empty:0};if(!p.products)return;p.products.forEach(r=>{if(!r)return;const i=r.currentStock,n=r.minStock;i<=0?e.empty++:n>0&&i<=n?e.at_min++:n>0&&i<=n*1.2?e.near_min++:e.ok++});const t=document.getElementById("indicator-ok"),a=document.getElementById("indicator-near-min"),s=document.getElementById("indicator-at-min"),o=document.getElementById("indicator-empty");t&&(t.textContent=e.ok),a&&(a.textContent=e.near_min),s&&(s.textContent=e.at_min),o&&(o.textContent=e.empty)}function kt(){const e=document.getElementById("productsList");if(!e)return;const t=document.getElementById("productSearchInput")?.value.toLowerCase()||"",a=document.getElementById("productCategoryFilter")?.value||"all",s=new Map((p.categories||[]).map(r=>[r.id,r.name]));let o=(p.products||[]).filter(Boolean);fe!=="all"&&(o=o.filter(r=>{const i=r.currentStock,n=r.minStock;switch(fe){case"ok":return i>0&&(n===0||i>n*1.2);case"near_min":return n>0&&i>n&&i<=n*1.2;case"at_min":return n>0&&i>0&&i<=n;case"empty":return i<=0;default:return!0}})),o=o.filter(r=>{const i=r.name.toLowerCase().includes(t),n=a==="all"||r.categoryId===a;return i&&n}),e.innerHTML="",o.length>0?(e.className="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 sm:space-y-0",o.forEach(r=>{const i=document.createElement("div"),n=JSON.stringify(r).replace(/'/g,"&apos;");i.className=`product-card bg-white rounded-lg shadow-md flex items-center gap-3 p-3 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 
                              sm:flex-col sm:p-0 sm:items-stretch sm:gap-0`,i.dataset.action="edit-product",i.dataset.product=n;const d=r.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(r.name.charAt(0))}`,l=s.get(r.categoryId)||"N/A";let c="",u="text-gray-500";const m=r.currentStock,b=r.minStock;m<=0?(c='<span class="text-xs font-semibold text-red-600">Esgotado</span>',u="text-red-600 font-semibold"):b>0&&m<=b?(c='<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>',u="text-orange-600 font-semibold"):b>0&&m<=b*1.2?(c='<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>',u="text-blue-600 font-semibold"):(c='<span class="text-xs font-semibold text-green-600">Em Estoque</span>',u="text-green-600 font-semibold"),i.innerHTML=`
                <img src="${d}" alt="Imagem de ${w(r.name)}" class="w-16 h-16 rounded-md object-cover flex-shrink-0 sm:w-full sm:h-24 sm:rounded-b-none">
                
                <div class="flex-1 sm:p-3 sm:flex sm:flex-col sm:flex-grow">
                    <div class="sm:flex-grow">
                        <div class="flex justify-between items-start mb-1 gap-2">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${w(r.name)}</h3>
                            <div class="hidden sm:block">${c}</div>
                        </div>
                        
                        <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${r.price.toFixed(2)}</p>
                        
                        <p class="text-xs text-gray-500 text-left mb-2 hidden sm:block">Categoria: ${w(l)}</p>
                    </div>

                    <div class="flex justify-between items-center mt-2 sm:mt-0">
                        <p class="text-lg font-bold text-indigo-600 text-left sm:hidden">R$ ${r.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-right sm:text-left">
                            Estoque: <span class="font-bold text-base ${u}">${r.currentStock}</span>
                        </p>
                    </div>
                </div>`,e.appendChild(i)})):(e.className="",e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>')}async function Ct(){const e=document.getElementById("products-content-container");e&&(e.innerHTML='<div class="loader col-span-full mx-auto my-8"></div>');try{const[t,a,s]=await Promise.all([at(p.establishmentId),pa(p.establishmentId,"products"),as(p.establishmentId)]);p.products=(t||[]).filter(Boolean),p.categories=(a||[]).filter(Boolean),p.suppliers=(s||[]).filter(Boolean),No(mt)}catch(t){e&&(e.innerHTML=`<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados: ${t.message}</p>`)}}function No(e){if(document.getElementById("products-content-container")){if(mt===e&&document.getElementById("products-content-container").children.length>1){mt==="products"&&(os(),kt());return}mt=e,fe="all",document.querySelectorAll("#products-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="products"?rl():e==="movements"&&il()}}async function ll(){Ie.innerHTML=`
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
        </section>`,ke&&(Ie.removeEventListener("click",ke),Ie.removeEventListener("input",ke),Ie.removeEventListener("change",ke)),ke=async e=>{const t=e.target;if(t.id==="productSearchInput"||t.id==="productCategoryFilter"){kt();return}const a=e.target.closest("button[data-action], button[data-view], .indicator-card[data-action], .product-card[data-action]");if(!a||e.target.closest('[data-action-stop-propagation="true"]'))return;if(a.hasAttribute("data-view")){No(a.dataset.view);return}switch(a.dataset.action){case"new-product":Es();break;case"edit-product":Es(JSON.parse(a.dataset.product));break;case"manage-product-categories":al();break;case"generate-report":await nl();break;case"filter-stock":const o=a.dataset.filterType;fe=fe===o?"all":o,document.querySelectorAll(".indicator-card").forEach(r=>{r.classList.toggle("ring-2",r.dataset.filterType===fe),r.classList.toggle("ring-indigo-500",r.dataset.filterType===fe),r.classList.toggle("shadow-lg",r.dataset.filterType===fe)}),kt();break}},Ie.addEventListener("click",ke),Ie.addEventListener("input",ke),Ie.addEventListener("change",ke),mt="products",fe="all",await Ct()}const _t=document.getElementById("content");let O={partners:[],establishments:[],searchQuery:"",categoryFilter:"all",stateFilter:"all",cityFilter:"",sortBy:"name_asc",hasSearched:!1,viewMode:"list",editingItem:null},Mt=null;const Xt={contas_fixas:{label:"Contas Fixas (Água, Luz)",color:"blue",icon:"bi-lightning-charge"},estoque:{label:"Fornecedor de Produtos",color:"emerald",icon:"bi-box-seam"},servicos:{label:"Prestador de Serviço",color:"purple",icon:"bi-tools"},impostos:{label:"Governo / Impostos",color:"red",icon:"bi-bank"},outros:{label:"Outros Parceiros",color:"gray",icon:"bi-person-vcard"}},jo=["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];async function dl(){try{const t=(await ve()).matrizes||[];O.establishments=[],t.forEach(a=>{O.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>O.establishments.push({id:s.id,name:s.name,type:"Filial"}))})}catch(e){console.warn("Erro ao buscar lojas",e)}O.viewMode="list",O.editingItem=null,O.hasSearched=!1,O.partners=[],cl(),fl(),Ro()}function cl(){_t.innerHTML=`
        <div class="flex flex-col h-auto bg-gray-50 w-full relative font-sans min-h-[calc(100vh-80px)] overflow-x-hidden">
            
            <div id="suppliers-list-view" class="w-full transition-all duration-300 ${O.viewMode==="list"?"block":"hidden"}">
                ${ul()}
                <div class="flex-1 px-4 py-8 max-w-7xl mx-auto w-full">
                    <div id="partners-grid" class="pb-20">
                        </div>
                </div>
            </div>

            <div id="suppliers-form-view" class="w-full transition-all duration-300 ${O.viewMode==="form"?"block":"hidden"}">
                <div id="form-container-wrapper" class="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24">
                    </div>
            </div>

        </div>
    `}function ul(){const e=Object.entries(Xt).map(([a,s])=>`<option value="${a}">${s.label}</option>`).join(""),t=jo.map(a=>`<option value="${a}">${a}</option>`).join("");return`
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
                                <input type="text" id="filterSearch" placeholder="Nome, CNPJ, Email..." value="${O.searchQuery}" class="w-full pl-10 p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all">
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
                            <input type="text" id="filterCity" placeholder="Ex: São Paulo" value="${O.cityFilter}" class="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all">
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
    `}function pl(e=null){const t=!!e,a=t?"Ficha do Parceiro":"Novo Parceiro de Negócio";let s=e?.category||"";s==="Produtos"&&(s="estoque"),s==="Serviços"&&(s="servicos");const o=Object.entries(Xt).map(([n,d])=>`<option value="${n}" ${s===n?"selected":""}>${d.label}</option>`).join(""),r=jo.map(n=>`<option value="${n}" ${e?.state===n?"selected":""}>${n}</option>`).join(""),i=document.getElementById("form-container-wrapper");i&&(i.innerHTML=`
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
                                    <input type="text" id="supName" required class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none font-bold text-gray-800 text-lg transition-all shadow-inner" value="${w(e?.name||"")}" placeholder="Ex: CPFL Energia, Coca-Cola...">
                                </div>
                                
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Categoria / Tipo *</label>
                                    <select id="supCategory" required class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm font-medium text-gray-700 transition-all shadow-inner">
                                        <option value="">-- Selecione --</option>
                                        ${o}
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">CNPJ / CPF</label>
                                    <input type="text" id="supTaxId" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${w(e?.document||e?.taxId||"")}" placeholder="00.000.000/0001-00">
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
                                    <input type="text" id="supCity" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${w(e?.city||"")}" placeholder="Ex: São Paulo">
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
                                        <input type="text" id="supContact" class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${w(e?.contactName||"")}" placeholder="Ex: João Silva (Comercial)">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">E-mail Comercial</label>
                                    <div class="relative">
                                        <i class="bi bi-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input type="email" id="supEmail" class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${w(e?.email||"")}" placeholder="contato@empresa.com">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Telefone / WhatsApp</label>
                                    <div class="relative">
                                        <i class="bi bi-telephone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input type="tel" id="supPhone" class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${w(e?.phone||"")}" placeholder="(00) 0000-0000">
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
    `,document.getElementById("partner-form").addEventListener("submit",gl))}function Ro(){const e=document.getElementById("partners-grid");e&&(e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl w-full max-w-3xl mx-auto shadow-sm">
                <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 border border-indigo-100 shadow-inner">
                    <i class="bi bi-search text-2xl text-indigo-400"></i>
                </div>
                <h3 class="text-xl font-black text-gray-800 mb-2">Pronto para pesquisar</h3>
                <p class="text-sm text-gray-500 font-medium max-w-md text-center">Utilize os filtros acima e clique em "Buscar" para listar os parceiros registados no sistema.</p>
            </div>
        `)}async function ml(){const e=document.getElementById("partners-grid");if(!O.hasSearched){Ro();return}e.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="text-sm text-gray-500 mt-4 font-medium">Buscando parceiros...</p></div>';try{const t=await as(p.establishmentId);O.partners=t||[],Fo()}catch(t){e.innerHTML=`<div class="text-center py-10 text-red-500 font-bold">Erro ao carregar parceiros: ${t.message}</div>`}}function Fo(){const e=document.getElementById("partners-grid");if(!e)return;let t=O.partners;if(O.searchQuery){const o=O.searchQuery.toLowerCase();t=t.filter(r=>r.name.toLowerCase().includes(o)||r.document&&r.document.includes(o)||r.taxId&&r.taxId.includes(o)||r.email&&r.email.toLowerCase().includes(o)||r.contactName&&r.contactName.toLowerCase().includes(o))}if(O.categoryFilter!=="all"&&(t=t.filter(o=>o.category===O.categoryFilter)),O.stateFilter!=="all"&&(t=t.filter(o=>o.state===O.stateFilter)),O.cityFilter){const o=O.cityFilter.toLowerCase();t=t.filter(r=>r.city&&r.city.toLowerCase().includes(o))}if(t.sort((o,r)=>{let i="",n="";return O.sortBy==="name_asc"||O.sortBy==="name_desc"?(i=(o.name||"").toLowerCase(),n=(r.name||"").toLowerCase()):O.sortBy==="contact_asc"&&(i=(o.contactName||"").toLowerCase(),n=(r.contactName||"").toLowerCase()),O.sortBy==="name_desc"?n.localeCompare(i):i.localeCompare(n)}),t.length===0){e.innerHTML=`
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
    `,s='<div class="flex flex-col gap-4 md:hidden">';t.forEach(o=>{let r=o.category;r==="Produtos"&&(r="estoque"),r==="Serviços"&&(r="servicos");const i=Xt[r]||Xt.outros,n=o.document||o.taxId?o.document||o.taxId:"-",d=JSON.stringify(o).replace(/'/g,"&apos;"),l=[o.city,o.state].filter(Boolean).join(" - ");a+=`
            <tr class="hover:bg-indigo-50/50 cursor-pointer transition-colors group" data-action="open-form" data-item='${d}'>
                <td class="p-4 pl-6 text-center">
                    <div class="w-10 h-10 mx-auto rounded-xl bg-${i.color}-100 text-${i.color}-600 flex items-center justify-center text-lg shadow-sm" title="${i.label}">
                        <i class="bi ${i.icon}"></i>
                    </div>
                </td>
                <td class="p-4">
                    <p class="font-bold text-gray-900 text-sm group-hover:text-indigo-700 transition-colors">${w(o.name)}</p>
                    ${o.email?`<p class="text-xs text-gray-500 mt-0.5"><i class="bi bi-envelope mr-1 opacity-50"></i>${w(o.email)}</p>`:""}
                </td>
                <td class="p-4 text-sm font-medium text-gray-600">${w(n)}</td>
                <td class="p-4">
                    <div class="text-sm font-medium text-gray-800">${w(o.contactName||"-")}</div>
                    ${l?`<div class="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1"><i class="bi bi-geo-alt mr-1"></i>${w(l)}</div>`:""}
                </td>
                <td class="p-4 pr-6 text-right">
                    <button class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-100 transition-colors shadow-sm bg-white border border-gray-200 group-hover:border-indigo-200">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                </td>
            </tr>
        `,s+=`
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden" data-action="open-form" data-item='${d}'>
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-${i.color}-500"></div>
                <div class="flex gap-4">
                    <div class="w-12 h-12 rounded-xl bg-${i.color}-100 text-${i.color}-600 flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                        <i class="bi ${i.icon}"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">${i.label.split(" ")[0]}</p>
                        <h3 class="font-black text-gray-900 text-base leading-tight truncate">${w(o.name)}</h3>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-lg p-3 border border-gray-100 mt-1 flex flex-col gap-1.5">
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-gray-500 font-medium">Documento:</span>
                        <span class="font-bold text-gray-700">${w(n)}</span>
                    </div>
                    ${l?`
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-gray-500 font-medium">Local:</span>
                        <span class="font-bold text-gray-700">${w(l)}</span>
                    </div>`:""}
                </div>
            </div>
        `}),a+="</tbody></table></div>",s+="</div>",e.innerHTML=a+s}function gt(e,t=null){const a=document.getElementById("suppliers-list-view"),s=document.getElementById("suppliers-form-view");O.viewMode=e,O.editingItem=t,e==="list"?(a.classList.remove("hidden"),s.classList.add("hidden"),s.innerHTML='<div id="form-container-wrapper" class="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24"></div>',O.hasSearched&&Fo(),window.scrollTo({top:0,behavior:"smooth"})):(a.classList.add("hidden"),s.classList.remove("hidden"),pl(t),window.scrollTo({top:0,behavior:"smooth"}))}async function gl(e){e.preventDefault();const t=e.target,a=t.querySelector("#supId").value,s={name:t.querySelector("#supName").value,contactName:t.querySelector("#supContact").value,email:t.querySelector("#supEmail").value,phone:t.querySelector("#supPhone").value,document:t.querySelector("#supTaxId").value,category:t.querySelector("#supCategory").value,state:t.querySelector("#supState").value,city:t.querySelector("#supCity").value,establishmentId:p.establishmentId,notes:t.querySelector("#supNotes")?.value||"",accessibleIn:[p.establishmentId]},o=t.querySelector('button[type="submit"]'),r=o.innerHTML;o.disabled=!0,o.innerHTML='<div class="loader-small border-white"></div> A gravar...';try{a?(await Zn(a,s),g("Sucesso","Ficha atualizada!","success")):(await Yn(s),g("Sucesso","Parceiro registado!","success")),O.hasSearched&&(O.partners=await as(p.establishmentId)||[]),gt("list")}catch(i){g("Erro","Falha ao gravar: "+i.message,"error"),o.disabled=!1,o.innerHTML=r}}async function bl(e){if(await J("Excluir Parceiro","Deseja realmente apagar esta ficha permanentemente? Os lançamentos financeiros antigos não serão apagados."))try{await Kn(e),g("Sucesso","Entidade excluída.","success"),O.partners=O.partners.filter(a=>a.id!==e),gt("list")}catch(a){g("Erro","Erro ao excluir: "+a.message,"error")}}function fl(){Mt&&_t.removeEventListener("click",Mt),Mt=async e=>{const t=e.target;if(t.closest('button[data-action="new-partner"]')){gt("form",null);return}if(t.closest("#btn-search-partners")){O.searchQuery=document.getElementById("filterSearch").value,O.categoryFilter=document.getElementById("filterCategory").value,O.stateFilter=document.getElementById("filterState").value,O.cityFilter=document.getElementById("filterCity").value,O.sortBy=document.getElementById("filterSortBy").value,O.hasSearched=!0,ml();return}if(t.closest('button[data-action="back-to-list"]')){gt("list");return}const a=t.closest('button[data-action="delete-partner"]');if(a){e.preventDefault(),bl(a.dataset.id);return}const s=t.closest('[data-action="open-form"]');if(s&&!t.closest("button")){const o=JSON.parse(s.dataset.item.replace(/&apos;/g,"'"));gt("form",o)}},_t.addEventListener("click",Mt),_t.addEventListener("keypress",e=>{e.key==="Enter"&&(e.target.id==="filterSearch"||e.target.id==="filterCity")&&document.getElementById("btn-search-partners").click()})}const fa=document.getElementById("content"),Is={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let ce=new Set,At=null,ze=null,Ut=[];function Wt(){const e=le.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}function xl(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function hl(e){return e.length===0?'<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>':e.map(t=>{const a=t.status==="inactive",s=w(t.name),o=w(t.specialty||"Especialidade"),r=t.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,i=JSON.stringify(t).replace(/'/g,"&apos;"),n=t.accessibleIn?t.accessibleIn.length:1,d=n>1?`<span class="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded ml-2 border border-indigo-200" title="Atende em ${n} unidades"><i class="bi bi-diagram-3"></i> ${n} Lojas</span>`:"";return`
            <div class="professional-card bg-white rounded-lg shadow-md flex items-center gap-4 p-3 cursor-pointer transition-transform transform hover:shadow-lg hover:bg-gray-50
                        sm:flex-col sm:items-stretch sm:p-0 sm:gap-0 ${a?"opacity-50 bg-gray-100":""}" 
                 data-action="open-professional-modal" data-professional='${i}'>
                
                <img src="${r}" alt="Foto de ${s}" class="w-16 h-16 rounded-full object-cover flex-shrink-0
                            sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg">
                
                <div class="flex-1 sm:p-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-sm font-bold text-gray-900 text-left sm:text-base flex items-center">
                                ${s} ${d}
                            </h3>
                            <p class="text-xs text-gray-500 text-left sm:text-sm mt-0.5">${o}</p>
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
            </div>`}).join("")}function xa(){const e=document.getElementById("genericModal");e.style.display="none",ze&&e.removeEventListener("click",ze)}async function vl(e){const t=document.getElementById("genericModal"),a=e.id?e:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},s=w(a.name),o=p.services||await Ae(p.establishmentId),r=p.professionals||await ge(p.establishmentId),i=`
        <div class="modal-content max-w-5xl p-0 overflow-y-auto max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b bg-white sticky top-0 z-10">
                <h2 class="text-2xl font-bold text-gray-800">${s}</h2>
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
        </div>`;t.innerHTML=i,t.style.display="flex",wl(a,o),kl(a),Sl(a,r),El(a)}function yl(e=[]){if(!Ut||Ut.length===0)return`
            <input type="hidden" name="accessibleIn" value="${p.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                <i class="bi bi-info-circle mr-1"></i> Profissional exclusivo desta unidade.
            </div>`;let t='<div class="space-y-1 mt-2 max-h-48 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30">';return Ut.forEach(a=>{const s=e.includes(a.id)||e.length===0&&a.id===p.establishmentId;t+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${w(a.name)} (Matriz)</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(o=>{const r=e.includes(o.id)||e.length===0&&o.id===p.establishmentId;t+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${o.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${r?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${w(o.name)}</span>
                    </label>
                `})}),t+="</div>",t}function wl(e,t){const a=document.getElementById("professionalForm"),s=e.dob?e.dob.split("/"):["",""],o=Array.from({length:12},(x,P)=>{const I=P+1,$=I==s[1]?"selected":"",h=new Date(0,P).toLocaleString("pt-BR",{month:"long"});return`<option value="${I}" ${$}>${h.charAt(0).toUpperCase()+h.slice(1)}</option>`}).join(""),r=e.status||"active",i=w(e.name||""),n=w(e.specialty||""),d=w(e.phone||""),l=w(e.notes||"");a.innerHTML=`
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
                    <div class="form-group"><label for="profDobDay" class="block text-sm font-medium text-gray-700 mb-1">Aniversário (Dia)</label><input type="number" id="profDobDay" value="${s[0]}" min="1" max="31" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profDobMonth" class="block text-sm font-medium text-gray-700 mb-1">Aniversário (Mês)</label><select id="profDobMonth" class="w-full p-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-500"><option value="">Selecione...</option>${o}</select></div>
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
            ${yl(e.accessibleIn||[])}
        </div>

        <div class="pt-6 border-t border-gray-100">
            <label class="block text-base font-bold text-gray-800 mb-3">Serviços que realiza</label>
            <div id="profServicesContainer" class="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50 max-h-64 overflow-y-auto">
                ${t.map(x=>`
                    <label class="flex items-center space-x-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm">
                        <input type="checkbox" value="${x.id}" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" ${e.services?.includes(x.id)?"checked":""}>
                        <span class="text-sm font-medium text-gray-700">${w(x.name)}</span>
                    </label>
                `).join("")}
            </div>
        </div>

        <div class="form-group pt-4">
            <label for="profNotes" class="block text-sm font-medium text-gray-700 mb-1">Observações Internas</label>
            <textarea id="profNotes" rows="3" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">${l}</textarea>
        </div>`;const c=document.getElementById("profPhotoInput"),u=document.getElementById("profPhotoButton"),m=document.getElementById("profPhotoPreview"),b=document.getElementById("profPhotoBase64"),v=e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,k=e.photo||"";u&&u.addEventListener("click",()=>c.click()),c&&(c.onchange=async()=>{const x=c.files[0];if(x){m.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const P=await lo(x,800,800,.8),$=P.length*3/4,h=1e3*1024;if($>h)throw new Error("A imagem é muito grande mesmo após a compressão.");m.src=P,b.value=P}catch(P){g("Erro de Imagem",P.message||"Não foi possível processar a imagem.","error"),m.src=v,b.value=k,c.value=""}}})}function kl(e){const t=document.getElementById("jornada");t.innerHTML=`
        <div class="max-w-4xl mx-auto">
            <h3 class="text-xl font-bold text-gray-800 mb-2">Jornada de Trabalho Semanal</h3>
            <p class="text-sm text-gray-500 mb-6">Defina os dias e os horários em que este profissional atende.</p>
            <div id="profScheduleContainer" class="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
        </div>`,$l(t.querySelector("#profScheduleContainer"),e.workingHours||{})}async function Sl(e,t){const a=document.getElementById("bloqueios");a.innerHTML=`
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
                                    <span class="text-sm font-medium text-gray-700">${w(r.name)}</span>
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
                    <h3 class="text-xl font-bold text-gray-800">Registos de ${w(e.name.split(" ")[0])}</h3>
                    <select id="prof-blockages-filter" class="p-2 border border-gray-300 rounded-lg text-sm bg-white font-medium outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="future">Apenas Futuros</option>
                        <option value="history">Histórico Passado</option>
                    </select>
                </div>
                <div id="blockagesList" class="space-y-3 max-h-[500px] overflow-y-auto pr-2"></div>
            </div>
        </div>`;const s=document.getElementById("batchBlockageForm");s&&s.addEventListener("submit",async r=>{r.preventDefault();const i=s.querySelector('button[type="submit"]'),n=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm"></span> A gravar...';const d=Array.from(r.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(k=>k.value);if(d.length===0)return i.disabled=!1,i.innerHTML=n,g("Atenção","Selecione pelo menos um profissional.","error");const l=r.target.batchBlockageStartDate.value,c=r.target.batchBlockageEndDate.value||l,u=r.target.batchBlockageStartTime.value,m=r.target.batchBlockageEndTime.value,b=r.target.batchBlockageReason.value;if(!l||!u||!m)return i.disabled=!1,i.innerHTML=n,g("Atenção","Preencha Data de Início, Hora de Início e Fim.","error");const v=d.map(k=>{const x={professionalId:k,establishmentId:p.establishmentId,startTime:new Date(`${l}T${u}`).toISOString(),endTime:new Date(`${c}T${m}`).toISOString(),reason:b};return ia(x)});try{await Promise.all(v),g("Sucesso!",`${d.length} bloqueios foram criados.`),s.reset(),r.target.querySelectorAll('input[name="batch-professionals"]').forEach(x=>{x.checked=x.value===e.id});const k=document.getElementById("prof-blockages-filter").value;bt(e.id,k)}catch(k){g("Erro",k.message,"error")}finally{i.disabled=!1,i.innerHTML=n}}),document.getElementById("prof-blockages-filter").addEventListener("change",r=>bt(e.id,r.target.value)),await bt(e.id,"future")}function $l(e,t){e.innerHTML=Object.keys(Is).map(a=>{const s=t[a]||{},o=s.active!==!1;return`
            <div class="day-schedule-card p-4 rounded-xl ${o?"bg-white border-gray-200 shadow-sm":"bg-gray-50 border-gray-100 disabled opacity-60"} border transition-all">
                 <div class="flex justify-between items-center mb-3">
                    <span class="font-bold text-gray-800">${Is[a]}</span>
                    <label class="flex items-center cursor-pointer">
                        <div class="relative">
                            <input type="checkbox" data-day="${a}" data-field="active" class="sr-only" ${o?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </div>
                    </label>
                 </div>
                <div class="time-inputs grid grid-cols-2 gap-3 mt-2 text-sm">
                    <div><label class="text-xs text-gray-500 font-medium">Abertura:</label><input type="time" data-day="${a}" data-field="start" value="${s.start||"09:00"}" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${o?"":"disabled"}></div>
                    <div><label class="text-xs text-gray-500 font-medium">Fecho:</label><input type="time" data-day="${a}" data-field="end" value="${s.end||"18:00"}" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${o?"":"disabled"}></div>
                    <div><label class="text-xs text-gray-500 font-medium">Início Pausa:</label><input type="time" data-day="${a}" data-field="breakStart" value="${s.breakStart||"12:00"}" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${o?"":"disabled"}></div>
                    <div><label class="text-xs text-gray-500 font-medium">Fim Pausa:</label><input type="time" data-day="${a}" data-field="breakEnd" value="${s.breakEnd||"13:00"}" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${o?"":"disabled"}></div>
                </div>
            </div>`}).join(""),e.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",s=>{const o=s.target.closest(".day-schedule-card"),r=!s.target.checked;o.classList.toggle("bg-white",!r),o.classList.toggle("shadow-sm",!r),o.classList.toggle("border-gray-200",!r),o.classList.toggle("bg-gray-50",r),o.classList.toggle("border-gray-100",r),o.classList.toggle("opacity-60",r),o.classList.toggle("disabled",r),o.querySelectorAll(".time-inputs input").forEach(i=>i.disabled=r)})})}async function bt(e,t="future"){const a=document.getElementById("blockagesList");if(a){a.innerHTML='<div class="loader mx-auto mt-6"></div>';try{const s=new Date;let o,r;t==="history"?(r=new Date,o=new Date,o.setFullYear(o.getFullYear()-2)):(o=new Date,r=new Date,r.setFullYear(r.getFullYear()+2));let n=(await ra(p.establishmentId,o.toISOString(),r.toISOString(),e)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));t==="history"?n=n.filter(l=>l.endTime<s).sort((l,c)=>c.startTime-l.startTime):n=n.filter(l=>l.endTime>=s).sort((l,c)=>l.startTime-c.startTime);const d=n.reduce((l,c)=>{const u=c.reason||"Sem motivo detalhado";return l[u]||(l[u]=[]),l[u].push(c),l},{});if(Object.keys(d).length===0){a.innerHTML=`
                <div class="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <i class="bi bi-calendar-check text-3xl text-gray-300 mb-2 block"></i>
                    <p class="text-gray-500 font-medium">Nenhum bloqueio ${t==="history"?"no histórico":"agendado para o futuro"}.</p>
                </div>`;return}a.innerHTML=Object.entries(d).map(([l,c])=>`
            <div class="bg-white border border-gray-200 rounded-xl shadow-sm mb-4 overflow-hidden">
                <div class="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                    <h4 class="font-bold text-gray-800 flex items-center gap-2"><i class="bi bi-tag text-orange-500"></i> ${w(l)}</h4>
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
        `).join("")}catch(s){a.innerHTML=`<p class="text-red-500 p-4">${s.message}</p>`}}}function El(e){const t=document.getElementById("genericModal");ze&&t.removeEventListener("click",ze),ze=async a=>{const s=a.target.closest("button[data-action]");if(!s){const r=a.target.closest(".tab-link");r&&(t.querySelectorAll(".tab-link").forEach(i=>{i.classList.remove("active","border-indigo-600","text-indigo-600"),i.classList.add("border-transparent","text-gray-500")}),r.classList.add("active","border-indigo-600","text-indigo-600"),r.classList.remove("border-transparent","text-gray-500"),t.querySelectorAll(".tab-content").forEach(i=>i.classList.add("hidden")),document.getElementById(r.dataset.tab).classList.remove("hidden"));return}const o=s.dataset.action;switch(a.stopPropagation(),o){case"close-modal":xa();break;case"delete-professional":const r=s.dataset.id;if(await J("Excluir Profissional",`Tem certeza que deseja excluir ${e.name}? Esta ação não pode ser desfeita e ele será removido da agenda e de todas as lojas.`))try{await co(r),me(p.establishmentId,Wt(),"Equipe","Excluiu",`Excluiu profissional: ${e.name}`),g("Sucesso!","Profissional excluído da rede.","success"),xa(),Yt()}catch(I){g("Erro",`Não foi possível excluir: ${I.message}`,"error")}break;case"save-professional":const n=document.getElementById("professionalForm"),d=s,l=document.getElementById("profScheduleContainer"),c=Array.from(n.querySelectorAll("#profServicesContainer input:checked")).map(I=>I.value),u={};l&&l.querySelectorAll(".day-schedule-card").forEach(I=>{const $=I.querySelector('[data-field="active"]').dataset.day;u[$]={active:I.querySelector('[data-field="active"]').checked,start:I.querySelector('[data-field="start"]').value,end:I.querySelector('[data-field="end"]').value,breakStart:I.querySelector('[data-field="breakStart"]').value,breakEnd:I.querySelector('[data-field="breakEnd"]').value}});const m=Array.from(n.querySelectorAll('input[name="accessibleIn"]:checked')).map(I=>I.value),b=m.length>0?m:[p.establishmentId],v={...e,id:n.querySelector("#professionalId").value||void 0,accessibleIn:b,name:n.querySelector("#profName").value.trim(),specialty:n.querySelector("#profSpecialty").value,photo:n.querySelector("#profPhotoBase64").value,services:c,workingHours:u,phone:n.querySelector("#profPhone").value,dob:`${n.querySelector("#profDobDay").value}/${n.querySelector("#profDobMonth").value}`,receivesCommission:n.querySelector("#profCommission").value==="sim",showOnAgenda:n.querySelector("#profShowOnAgenda").value==="sim",orderOnAgenda:parseInt(n.querySelector("#profOrderOnAgenda").value)||1,notes:n.querySelector("#profNotes").value,status:n.querySelector("#profStatus").value,establishmentId:p.establishmentId},k=d.innerHTML;d.disabled=!0,d.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{v.id?(await Ei(v.id,v),me(p.establishmentId,Wt(),"Equipe","Editou",`Editou o profissional: ${v.name}`),g("Sucesso!","Dados atualizados.","success")):(delete v.id,await $i(v),me(p.establishmentId,Wt(),"Equipe","Criou",`Cadastrou o profissional: ${v.name}`),g("Sucesso!","Novo membro adicionado à equipe.","success")),xa(),Yt()}catch(I){g("Erro",I.message,"error"),d.disabled=!1,d.innerHTML=k}break;case"delete-blockage":const x=s.dataset.id;if(await J("Apagar Bloqueio","O profissional voltará a ficar disponível na agenda neste dia. Confirma?"))try{await Ga(x),g("Bloqueio removido.","success");const I=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";bt(e.id,I)}catch(I){g("Erro",I.message,"error")}break;case"batch-delete-blockage":const P=JSON.parse(s.dataset.ids);if(await J("Apagar em Lote",`Tem certeza que deseja apagar ${P.length} dias de bloqueio de uma vez?`))try{await uo(P),g("Bloqueios removidos.","success");const I=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";bt(e.id,I)}catch(I){g("Erro",I.message,"error")}break}},t.addEventListener("click",ze)}function Aa(){const e=document.getElementById("batch-actions-container"),t=document.getElementById("selected-count");!e||!t||(ce.size>0?(t.textContent=`${ce.size} selecionado(s)`,e.classList.remove("hidden"),e.classList.add("flex")):(e.classList.add("hidden"),e.classList.remove("flex")))}function Il(){J("Excluir em Lote",`Tem certeza que deseja excluir ${ce.size} profissionais da rede? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{await Ii(Array.from(ce)),me(p.establishmentId,Wt(),"Equipe","Excluiu em Lote",`Excluiu ${ce.size} profissionais`),g("Sucesso!",`${ce.size} profissionais foram excluídos.`,"success"),ce.clear(),Aa(),Yt()}catch(t){g("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}function ot(){const e=document.getElementById("professionalsList");if(!e)return;if(!p.professionals){e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=xl();return}const t=document.getElementById("showInactiveProfToggle").checked,a=document.getElementById("profSearchInput").value.toLowerCase(),s=p.professionals.filter(o=>{const r=o.name.toLowerCase().includes(a),i=t||o.status!=="inactive";return r&&i});e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=hl(s)}async function Yt(){ce.clear(),fa.innerHTML=`
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
        </section>`,At&&fa.removeEventListener("click",At),At=t=>{const a=t.target.closest('[data-action="open-professional-modal"]'),s=t.target.closest('[data-action="batch-delete"]');if(a){t.preventDefault();let r={};if(a.dataset.professional)try{r=JSON.parse(a.dataset.professional)}catch(i){console.error("Erro ao fazer parse do professional data:",i);return}vl(r);return}if(s){Il();return}const o=t.target.closest(".professional-checkbox");if(o){const r=o.dataset.id;o.checked?ce.add(r):ce.delete(r),ot(),Aa();return}},fa.addEventListener("click",At),document.getElementById("profSearchInput").addEventListener("input",ot),document.getElementById("showInactiveProfToggle").addEventListener("change",ot);const e=document.getElementById("professionalsList");p.professionals=null,p.services=null,ot();try{const[t,a,s]=await Promise.all([ge(p.establishmentId),Ae(p.establishmentId),ve()]);p.professionals=t,p.services=a,Ut=s?.matrizes||[],ot(),Aa()}catch{e.innerHTML='<p class="text-red-500 col-span-full font-bold text-center py-10 bg-red-50 rounded-lg border border-red-100">Erro ao carregar dados do servidor.</p>'}}let E={clients:[],selectedClient:null,activeTab:"profile",filters:{search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},showFilters:!1,loading:!1,historyLimit:20,historySearchTerm:"",historyLoading:!1,historyData:{appointments:[],sales:[],loyaltyLog:[]},modalOpen:!1},Ho=null;const Ll=e=>e?String(e).replace(/\D/g,""):"",Cl=e=>{if(!e)return"Nunca";let t;if(typeof e=="object"&&(e.seconds||e._seconds)){const a=e.seconds||e._seconds;t=new Date(a*1e3)}else t=new Date(e);return isNaN(t.getTime())?"Data Inválida":t.toLocaleDateString("pt-BR")};function rs(){Ho.innerHTML=`
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
    `;const e=document.getElementById("btn-new-client");e&&(e.onclick=jl)}function St(){if(E.modalOpen)return;rs();const e=document.getElementById("clients-content-area"),t=E.filters.inactiveDays||E.filters.birthMonth||E.filters.hasLoyalty||E.filters.hasDebt,a=`
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
    `,s=E.clients.length>0?`
        <div class="px-3 sm:px-4 pb-20 pt-2 w-full">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                ${E.clients.map(c=>{const u=c.totalDebt&&parseFloat(c.totalDebt)>0,m=Cl(c.lastVisit);return`
                    <div class="client-card bg-white p-3 sm:p-4 rounded-xl border ${u?"border-l-4 border-l-red-500 border-y-red-100 border-r-red-100":"border-gray-200 border-l-4 border-l-indigo-500"} shadow-sm hover:shadow-md transition cursor-pointer active:bg-gray-50 flex items-center gap-3 group" data-id="${c.id}">
                        
                        <div class="w-12 h-12 rounded-full ${u?"bg-red-100 text-red-600":"bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"} transition-colors flex items-center justify-center font-bold text-lg flex-shrink-0">
                            ${c.name.charAt(0).toUpperCase()}
                        </div>
                        
                        <div class="flex-grow min-w-0">
                            <div class="flex justify-between items-start">
                                <h3 class="font-bold text-gray-800 truncate text-base">${w(c.name)}</h3>
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
    `;e.innerHTML=a+s;const o=document.getElementById("client-search"),r=document.getElementById("btn-toggle-filters"),i=document.getElementById("btn-apply-filters"),n=document.getElementById("btn-clear-search");r&&(r.onclick=()=>{E.showFilters=!E.showFilters,St()});const d=document.getElementById("filter-birth-month");d&&(d.value=E.filters.birthMonth);const l=()=>{const c=document.getElementById("filter-inactive"),u=document.getElementById("filter-loyalty"),m=document.getElementById("filter-debt"),b=document.getElementById("filter-birth-month");E.filters={search:o.value,inactiveDays:c?c.value:"",birthMonth:b?b.value:"",hasLoyalty:u?u.checked:!1,hasDebt:m?m.checked:!1},qa()};i&&(i.onclick=l),n&&(n.onclick=()=>{E.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},E.showFilters=!1,qa()}),o.addEventListener("keypress",c=>{c.key==="Enter"&&l()}),e.querySelectorAll(".client-card").forEach(c=>{c.onclick=()=>Oo(c.dataset.id)})}function Dl(e){const t=`
        <div class="bg-white border-b sticky top-0 z-10 shadow-sm w-full">
            <div class="flex overflow-x-auto no-scrollbar gap-1 px-3 sm:px-4 py-1 w-full">
                <button class="tab-btn ${E.activeTab==="profile"?"active":""}" data-tab="profile">👤 Perfil</button>
                <button class="tab-btn ${E.activeTab==="appointments"?"active":""}" data-tab="appointments">📅 Agendamentos</button>
                <button class="tab-btn ${E.activeTab==="history"?"active":""}" data-tab="history">💰 Histórico</button>
                <button class="tab-btn ${E.activeTab==="loyalty"?"active":""}" data-tab="loyalty">⭐ Fidelidade</button>
            </div>
        </div>
    `;let a="";return E.activeTab==="profile"?a=Bl(e):E.activeTab==="appointments"?a=Ml():E.activeTab==="history"?a=Al():E.activeTab==="loyalty"&&(a=ql(e)),`
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
                        <h2 class="text-xl sm:text-2xl font-bold leading-tight break-words">${w(e.name)}</h2>
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
    `}function Tl(e,t){if(!document.getElementById("tabs-styles")){const r=document.createElement("style");r.id="tabs-styles",r.textContent=`
            .tab-btn { padding: 12px 16px; white-space: nowrap; font-size: 0.9rem; font-weight: 500; color: #6b7280; border-bottom: 2px solid transparent; transition: all 0.2s; flex-shrink: 0; }
            .tab-btn.active { color: #4f46e5; border-bottom-color: #4f46e5; font-weight: 700; background-color: #f3f4f6; border-top-left-radius: 8px; border-top-right-radius: 8px; }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `,e.appendChild(r)}if(e.querySelectorAll(".tab-btn").forEach(r=>{r.onclick=async()=>{const i=r.dataset.tab;if(E.activeTab===i)return;(i==="appointments"||i==="history")&&(E.historyLimit=20,E.historySearchTerm=""),E.activeTab=i,We(),i!=="profile"&&!E.historyLoading&&E.historyData.appointments.length===0&&await Ls(t.id)}}),E.activeTab==="profile"){const r=e.querySelector("#form-edit-client"),i=e.querySelector("#btn-delete-client");r&&(r.onsubmit=Rl),i&&(i.onclick=Fl)}if(E.activeTab==="loyalty"){const r=e.querySelector("#btn-manual-redeem");r&&(r.onclick=()=>Nl(t))}const a=e.querySelector("#history-search-input");if(a){const r=a.value;a.value="",a.focus(),a.value=r,a.addEventListener("input",i=>{E.historySearchTerm=i.target.value,We()})}const s=e.querySelector("#btn-load-more");s&&(s.onclick=()=>{E.historyLimit+=20,We(),Ls(t.id)}),e.querySelectorAll("[data-go-agenda]").forEach(r=>{r.onclick=i=>{Je(),G("agenda-section",{targetDate:new Date(r.dataset.date),scrollToAppointmentId:r.dataset.id})}}),e.querySelectorAll("[data-go-comanda]").forEach(r=>{r.onclick=i=>{Je(),G("comandas-section",{selectedAppointmentId:r.dataset.id,initialFilter:"finalizadas"})}});const o=e.querySelector("#btn-close-modal");o&&(o.onclick=Je)}async function We(){const e=E.selectedClient;if(!e){Je();return}Pl(e)}function Pl(e){let t=document.getElementById("client-details-modal-overlay");t||(t=document.createElement("div"),t.id="client-details-modal-overlay",t.className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-fade-in",t.innerHTML=`
            <div class="bg-white w-full h-full sm:h-[90vh] sm:max-w-5xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-in" id="client-modal-content">
            </div>
        `,t.onclick=s=>{s.target===t&&Je()},document.body.appendChild(t),document.body.classList.add("overflow-hidden"),E.modalOpen=!0);const a=t.querySelector("#client-modal-content");a.innerHTML=Dl(e),Tl(a,e)}function Je(){const e=document.getElementById("client-details-modal-overlay");e&&e.remove(),document.body.classList.remove("overflow-hidden"),E.modalOpen=!1,E.selectedClient=null,St()}function Bl(e){return`
        <form id="form-edit-client" class="space-y-5 w-full">
            <div class="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 shadow-sm w-full">
                <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    Dados Pessoais
                </h3>
                
                <div class="space-y-4 w-full">
                    <div class="w-full">
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Nome Completo</label>
                        <input type="text" name="name" value="${w(e.name)}" required class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Telefone</label>
                            <input type="tel" name="phone" value="${w(e.phone||"")}" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
                        </div>
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">E-mail</label>
                            <input type="email" name="email" value="${w(e.email||"")}" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
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
                <textarea name="notes" rows="4" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border" placeholder="Preferências, alergias...">${w(e.notes||"")}</textarea>
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
    `}function Ml(e){let t=E.historyData.appointments||[];if(E.historySearchTerm){const s=E.historySearchTerm.toLowerCase();t=t.filter(o=>o.serviceName&&o.serviceName.toLowerCase().includes(s)||o.professionalName&&o.professionalName.toLowerCase().includes(s))}t.sort((s,o)=>new Date(o.startTime)-new Date(s.startTime));const a=s=>{const o=new Date(s.startTime),r=o.toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).replace(".",""),i=o.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),n=o<new Date;let d=n?"Concluído":"Agendado",l=n?"bg-gray-200 text-gray-600":"bg-green-100 text-green-700";return s.status==="cancelled"&&(d="Cancelado",l="bg-red-100 text-red-600"),`
            <div class="relative bg-white border rounded-xl p-3 shadow-sm mb-3 flex gap-3 cursor-pointer active:scale-[0.99] transition w-full overflow-hidden"
                 data-go-agenda="true" data-id="${s.id}" data-date="${s.startTime}">
                
                <div class="flex-shrink-0 w-14 flex flex-col items-center justify-center rounded-lg bg-gray-100 border border-gray-200 p-1">
                    <span class="text-xs font-bold text-gray-500 uppercase">${r.split(" ")[0]}</span>
                    <span class="text-lg font-black text-gray-800 leading-none">${o.getDate()}</span>
                    <span class="text-[10px] text-gray-500">${i}</span>
                </div>

                <div class="flex-grow min-w-0 flex flex-col justify-center">
                    <h4 class="font-bold text-gray-800 text-sm truncate">${w(s.serviceName||"Serviço")}</h4>
                    <p class="text-xs text-gray-500 truncate">Prof: ${w(s.professionalName||"N/A")}</p>
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
    `}function Al(e){let t=E.historyData.sales||[];if(E.historySearchTerm){const a=E.historySearchTerm.toLowerCase();t=t.filter(s=>s.id.includes(a))}return t.sort((a,s)=>new Date(s.date)-new Date(a.date)),t.length===0&&!E.historySearchTerm?'<div class="text-center py-12 text-gray-400">Nenhum registro financeiro.</div>':`
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
                ${t.map(a=>{const s=new Date(a.date||a.createdAt),o=a.totalAmount||0;return`
                    <div class="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-sm active:bg-gray-50 cursor-pointer w-full"
                         data-go-comanda="true" data-id="${a.id}">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <div>
                                <p class="font-bold text-gray-800 text-sm">Venda #${a.id.slice(-4)}</p>
                                <p class="text-xs text-gray-500">${s.toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-gray-900">R$ ${parseFloat(o).toFixed(2)}</p>
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
    `}function ql(e){const t=E.historyData.loyaltyLog||[];t.sort((s,o)=>new Date(o.date)-new Date(s.date));const a=t.length>0?t.map(s=>{const o=s.type==="redemption";return`
            <div class="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 w-full">
                <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full ${o?"bg-red-500":"bg-green-500"}"></div>
                    <div>
                        <p class="text-sm font-medium text-gray-700">${w(s.description||(o?"Resgate":"Acúmulo"))}</p>
                        <p class="text-[10px] text-gray-400">${new Date(s.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <span class="font-bold text-sm ${o?"text-red-600":"text-green-600"}">
                    ${o?"-":"+"}${s.points}
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
    `}async function qa(){E.loading=!0,rs();try{let e=`/api/clients/${p.establishmentId}?limit=20`;E.filters.search&&(e+=`&search=${encodeURIComponent(E.filters.search)}`),E.filters.inactiveDays&&(e+=`&inactiveDays=${E.filters.inactiveDays}`),E.filters.hasLoyalty&&(e+="&hasLoyalty=true"),E.filters.hasDebt&&(e+="&hasDebt=true"),E.clients=await L(e),St()}catch(e){console.error(e),g("Erro","Falha ao carregar clientes.","error"),E.clients=[],St()}finally{E.loading=!1;const e=document.querySelector(".loader");e&&e.parentElement&&e.parentElement.remove()}}async function Ls(e){const t=E.selectedClient;if(!(!t||!t.phone)){E.historyLoading=!0;try{const a=new Date;a.setMonth(a.getMonth()+12);const s=new Date;s.setFullYear(s.getFullYear()-5);let o=`/api/appointments/${p.establishmentId}?startDate=${s.toISOString()}&endDate=${a.toISOString()}`;o+=`&clientPhone=${encodeURIComponent(Ll(t.phone))}`,o+=`&limit=${E.historyLimit}`;const r=await L(o);E.historyData.appointments=r,E.historyData.sales=r.filter(n=>n.status==="completed").map(n=>({id:n.id,date:n.startTime,totalAmount:n.totalAmount||0,items:n.comandaItems||n.services||[]}));const i=[];r.forEach(n=>{n.status==="completed"&&n.loyaltyPointsEarned>0&&i.push({type:"earn",points:n.loyaltyPointsEarned,date:n.startTime,description:"Venda finalizada"}),n.loyaltyRedemption&&i.push({type:"redemption",points:n.loyaltyRedemption.cost||0,date:n.startTime,description:`Resgate: ${n.loyaltyRedemption.name}`})}),E.historyData.loyaltyLog=i}catch(a){console.error("Erro ao buscar histórico",a)}finally{E.historyLoading=!1,E.modalOpen&&E.selectedClient&&We()}}}function Nl(e){const t=e.loyaltyPoints||0,a=`
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
    `,{modalElement:s,close:o}=ie({title:"Ajuste de Pontos",contentHTML:a,maxWidth:"w-[90%] max-w-xs"});s.querySelector("form").onsubmit=async r=>{r.preventDefault();const i=document.getElementById("redeem-action").value,n=parseInt(document.getElementById("redeem-points").value,10),d=document.getElementById("redeem-reason").value;if(!n||n<=0)return g("Erro","Qtd inválida.","error");if(i==="debit"&&n>t)return g("Erro","Saldo insuficiente.","error");try{let l=t;i==="debit"?(await pi(p.establishmentId,e.phone,n,d),l-=n):(l+=n,await no(e.id,{loyaltyPoints:l})),E.selectedClient.loyaltyPoints=l,E.historyData.loyaltyLog.unshift({type:i==="debit"?"redemption":"earn",points:n,date:new Date().toISOString(),description:d+" (Manual)"}),g("Sucesso","Saldo atualizado.","success"),o(),We()}catch(l){g("Erro",l.message,"error")}}}function Oo(e){E.selectedClient=E.clients.find(t=>t.id===e),E.activeTab="profile",E.historyLimit=20,E.historySearchTerm="",E.historyData={appointments:[],sales:[],loyaltyLog:[]},We()}function jl(){const e=`
        <form id="modal-new-client-form" class="space-y-4">
            <div><label class="block text-sm font-bold text-gray-700 mb-1">Nome Completo *</label><input type="text" id="new-name" required class="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"></div>
            <div><label class="block text-sm font-bold text-gray-700 mb-1">Telefone (WhatsApp) *</label><input type="tel" id="new-phone" required class="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"></div>
            <div class="pt-4">
                <button type="submit" class="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:bg-indigo-700 active:scale-95 transition">Cadastrar</button>
            </div>
        </form>
    `,{modalElement:t,close:a}=ie({title:"Novo Cliente",contentHTML:e,maxWidth:"w-[90%] max-w-sm"});t.querySelector("form").onsubmit=async s=>{s.preventDefault();const o=document.getElementById("new-name").value,r=document.getElementById("new-phone").value;try{const i=await io({establishmentId:p.establishmentId,name:o,phone:r});E.clients.unshift(i),g("Sucesso","Cliente criado!","success"),a(),Oo(i.id)}catch(i){g("Erro",i.message,"error")}}}async function Rl(e){e.preventDefault();const t=new FormData(e.target),a=Object.fromEntries(t.entries());a.establishmentId=p.establishmentId;try{await no(E.selectedClient.id,a),Object.assign(E.selectedClient,a);const s=E.clients.findIndex(o=>o.id===E.selectedClient.id);s!==-1&&(E.clients[s]=E.selectedClient),g("Sucesso","Dados salvos!","success")}catch(s){g("Erro",s.message,"error")}}async function Fl(){if(await J("Excluir Cliente","Tem certeza? O histórico será apagado."))try{await ui(E.selectedClient.id),E.clients=E.clients.filter(e=>e.id!==E.selectedClient.id),E.selectedClient=null,g("Sucesso","Cliente removido.","success"),Je(),St()}catch(e){g("Erro",e.message,"error")}}async function Hl(){Ho=document.getElementById("content"),E.selectedClient=null,E.searchTerm="",E.historyLimit=20,E.showFilters=!1,E.modalOpen=!1,E.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},rs(),await qa()}const De=document.getElementById("content"),ha={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},Ol={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}};let W=null,Q=null;function zo(){return[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais da Unidade"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"whatsapp-bot",icon:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",label:"Atendente Virtual (WhatsApp)"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}]}function Cs(e,t,a){return new Promise((s,o)=>{const r=new FileReader;r.readAsDataURL(e),r.onload=i=>{const n=new Image;n.src=i.target.result,n.onload=()=>{const d=document.createElement("canvas");let l=n.width,c=n.height;l>t&&(c*=t/l,l=t),d.width=l,d.height=c,d.getContext("2d").drawImage(n,0,0,l,c);const m=e.type==="image/png"&&t<500?"image/png":"image/jpeg";s(d.toDataURL(m,a))},n.onerror=d=>o(d)},r.onerror=i=>o(i)})}function Re(e,t=null){let a='<option value="">-- Selecione (Opcional) --</option>';const s=i=>{const n=new Map,d=[];return i&&(i.forEach(l=>n.set(l.id,{...l,children:[]})),n.forEach(l=>{l.parentId&&n.has(l.parentId)?n.get(l.parentId).children.push(l):d.push(l)})),d},o=(i,n="")=>{const d=i.id===t?"selected":"";a+=`<option value="${i.id}" ${d}>${n}${w(i.name)}</option>`,i.children.forEach(l=>o(l,n+"— "))};return s(e).forEach(i=>o(i)),a}async function st(e,t){const a=t.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const s=[],{ownerName:o,...r}=e;if(o&&o!==p.userName){const n=le.currentUser;n&&s.push(rr(n,{displayName:o}).then(()=>{p.userName=o}))}const i={...W,...r};s.push(Wa(Q,i)),await Promise.all(s),W=i,g("Sucesso","Definições salvas com sucesso!","success"),r.themeColor&&Q===p.establishmentId&&setTimeout(()=>window.location.reload(),1500)}catch(s){g("Erro",`Não foi possível salvar: ${s.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function zl(e,t){const a=w(e.name||""),s=w(e.phone||""),o=w(e.cnpj||""),r=w(e.email||""),i=w(e.address||""),n=w(e.website||""),d=w(p.userName||"");t.innerHTML=`
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
                    <input type="tel" id="establishmentPhone" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" value="${s}">
                </div>
                <div>
                    <label for="establishmentCnpjCpf" class="block text-sm font-medium text-gray-700">CNPJ / CPF</label>
                    <input type="text" id="establishmentCnpjCpf" value="${o}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md bg-gray-50">
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
    `,t.querySelector("#personal-data-form").addEventListener("submit",l=>{l.preventDefault();const c={ownerName:t.querySelector("#ownerName").value,name:t.querySelector("#establishmentName").value,phone:t.querySelector("#establishmentPhone").value,cnpj:t.querySelector("#establishmentCnpjCpf").value,email:t.querySelector("#establishmentEmail").value,address:t.querySelector("#establishmentAddress").value,website:t.querySelector("#establishmentWebsite").value};st(c,l)})}function Vl(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#newPassword").value,o=t.querySelector("#confirmPassword").value;if(s!==o){g("Erro","As senhas não coincidem.","error");return}const r=t.querySelector('button[form="change-password-form"]');r.disabled=!0,r.textContent="A Salvar...";try{const i=le.currentUser;if(i)await or(i,s),g("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum usuário logado encontrado.")}catch(i){g("Erro",`Não foi possível alterar a senha: ${i.message}`,"error")}finally{r.disabled=!1,r.textContent="Salvar Nova Senha"}})}function _l(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#newEmail").value,o=t.querySelector("#currentPassword").value,r=t.querySelector('button[form="change-email-form"]');r.disabled=!0,r.textContent="A verificar...";try{const i=le.currentUser,n=tr.credential(i.email,o);await ar(i,n),await sr(i,s),await Rr(Q,s),g("Sucesso","Link de verificação enviado! Verifique o seu novo e-mail.","success"),a.target.reset()}catch(i){g("Erro",i.message,"error")}finally{r.disabled=!1,r.textContent="Salvar Novo E-mail"}})}function Ul(e,t){const a=w(e.welcomeMessage||"");t.innerHTML=`
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
    `,t.querySelector("#establishmentLogoBase64").value=e.logo||"",t.querySelector("#establishmentBackgroundImageBase64").value=e.backgroundImage||"",_o(e.themeColor||"indigo",t),t.querySelector("#establishmentLogoButton").onclick=()=>t.querySelector("#establishmentLogoInput").click(),t.querySelector("#establishmentLogoInput").onchange=async s=>{const o=s.target.files[0];if(o){const r=await Cs(o,300,.9);t.querySelector("#establishmentLogoPreview").src=r,t.querySelector("#establishmentLogoBase64").value=r}},t.querySelector("#establishmentBgButton").onclick=()=>t.querySelector("#establishmentBgInput").click(),t.querySelector("#establishmentBgInput").onchange=async s=>{const o=s.target.files[0];if(o){const r=t.querySelector("#establishmentBgButton");r.textContent="A processar...",r.disabled=!0;try{const i=await Cs(o,1280,.7);t.querySelector("#establishmentBgPreview").src=i,t.querySelector("#establishmentBgPreview").classList.remove("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=i}finally{r.textContent="Carregar Fundo",r.disabled=!1}}},t.querySelector("#establishmentBgRemoveBtn").onclick=()=>{t.querySelector("#establishmentBgPreview").src="",t.querySelector("#establishmentBgPreview").classList.add("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.remove("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=""},t.querySelector("#branding-form").addEventListener("submit",s=>{s.preventDefault();const o={logo:t.querySelector("#establishmentLogoBase64").value,welcomeMessage:t.querySelector("#establishmentWelcomeMessage").value,backgroundImage:t.querySelector("#establishmentBackgroundImageBase64").value,primaryColor:t.querySelector("#establishmentPrimaryColorInput").value,textColor:t.querySelector("#establishmentTextColorInput").value,themeColor:t.querySelector("#establishmentThemeColor").value};st(o,s)})}function Wl(e,t){const a=e.urlId||Q;let s=window.location.origin;(s.includes("localhost")||s.includes("capacitor://")||s.includes("127.0.0.1"))&&(s="https://www.kairosagenda.com.br");const o=w(`${s}/agendar?id=${a}`),r=e.publicBookingEnabled||!1,i=r?"Agendamento Online ATIVO":"Agendamento Online INATIVO",n=r?"text-green-600":"text-red-600";t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100 space-y-8">
            <div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Link Público de Agendamento</h3>
                <p class="text-sm text-gray-600 mb-4">Este é o link exclusivo desta unidade para compartilhar com os clientes.</p>
                <div class="flex flex-col sm:flex-row gap-2">
                    <input type="text" id="publicBookingLink" value="${o}" readonly class="flex-1 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 outline-none">
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
    `,t.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const d=t.querySelector("#publicBookingLink");d.select(),document.execCommand("copy"),d.blur(),g("Sucesso","Link copiado!","success")}),t.querySelector("#publicBookingToggle").addEventListener("change",async d=>{const l=d.target.checked,c=t.querySelector("#publicBookingStatusText");c.textContent=l?"Agendamento Online ATIVO":"Agendamento Online INATIVO",c.className=l?"text-sm font-semibold text-green-600":"text-sm font-semibold text-red-600";try{d.target.disabled=!0,await jr(Q,l),W.publicBookingEnabled=l,g("Sucesso",`Agendamento online ${l?"ativado":"desativado"}!`,"success")}catch(u){g("Erro",u.message,"error"),d.target.checked=!l}finally{d.target.disabled=!1}}),Zl(e.slotInterval||30,t),t.querySelector("#booking-form").addEventListener("submit",d=>{d.preventDefault();const l={slotInterval:parseInt(t.querySelector("#establishmentSlotInterval").value,10)};st(l,d)})}function Jl(e,t){t.innerHTML=`
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
    `;const a=t.querySelector("#establishmentTimezone");e.timezone&&(a.value=e.timezone);const s=t.querySelector("#establishmentWorkingHoursContainer"),o=e.workingHours||{};Object.keys(ha).forEach(r=>{const i=o[r]||{},n=ha[r],d=i.active!==!1,l=document.createElement("div");l.className=`day-schedule-card p-4 rounded-lg border ${d?"bg-gray-50 border-gray-200":"bg-gray-100 border-gray-100 disabled opacity-60"}`,l.innerHTML=`
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
            </div>`,s.appendChild(l)}),s.addEventListener("change",r=>{const i=r.target.closest('.day-schedule-card input[type="checkbox"]');if(i){const n=i.closest(".day-schedule-card");n.classList.toggle("disabled",!i.checked),n.classList.toggle("opacity-60",!i.checked),n.classList.toggle("bg-gray-50",i.checked),n.classList.toggle("bg-gray-100",!i.checked)}}),t.querySelector("#working-hours-form").addEventListener("submit",r=>{r.preventDefault();const i={};Object.keys(ha).forEach(d=>{i[d]={active:t.querySelector(`#est-${d}-active`).checked,start:t.querySelector(`#est-${d}-start`).value,end:t.querySelector(`#est-${d}-end`).value,breakStart:t.querySelector(`#est-${d}-breakStart`).value,breakEnd:t.querySelector(`#est-${d}-breakEnd`).value}});const n=t.querySelector("#establishmentTimezone").value;st({workingHours:i,timezone:n},r)})}function Vo(e,t){const a=!!e.whatsappInstance;t.innerHTML=`
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
    `;let s=null;const o=t.querySelector("#btnGenerateQr"),r=t.querySelector("#btnCancelQr");o&&o.addEventListener("click",async()=>{o.disabled=!0,o.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gerando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const l=await(await fetch(`${n}/connect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:Q})})).json();if(l.qrcode){t.querySelector("#whatsappStatusArea").classList.add("hidden"),t.querySelector("#qrCodeDisplayArea").classList.remove("hidden");const c=l.qrcode.includes("data:image")?l.qrcode:`data:image/png;base64,${l.qrcode}`;t.querySelector("#qrCodeImage").src=c,s=setInterval(async()=>{try{const m=await(await fetch(`${n}/status/${Q}`)).json();m.connected&&(clearInterval(s),W.whatsappInstance=m.instanceName,t.querySelector("#qrCodeDisplayArea").classList.add("hidden"),t.querySelector("#connectedStatusArea").classList.remove("hidden"),g("Sucesso","WhatsApp conectado com sucesso!","success"))}catch(u){console.error("Erro ao verificar status do WhatsApp",u)}},5e3)}else g("Erro na API",l.error||"Erro desconhecido","error")}catch(d){console.error(d),g("Erro de Conexão","Não foi possível acessar o servidor Kairós.","error")}finally{o.disabled=!1,o.innerHTML='<i class="bi bi-phone-vibrate"></i> Gerar QR Code'}}),r&&r.addEventListener("click",()=>{s&&clearInterval(s),t.querySelector("#qrCodeDisplayArea").classList.add("hidden"),t.querySelector("#whatsappStatusArea").classList.remove("hidden")});const i=t.querySelector("#btnDisconnectWhatsapp");i&&i.addEventListener("click",async()=>{if(!confirm("Tem certeza que deseja DESCONECTAR? O bot parará de responder imediatamente."))return;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Desconectando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const l=await(await fetch(`${n}/disconnect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:Q})})).json();l.success?(g("Sucesso","WhatsApp desconectado!","success"),W.whatsappInstance=null,Vo(W,t)):alert("Erro ao desconectar: "+l.error)}catch(d){console.error(d),g("Erro","Falha ao comunicar com o servidor.","error")}finally{i&&(i.disabled=!1,i.innerHTML='<i class="bi bi-power"></i> Desconectar')}})}async function Gl(e,t){const a=e.loyaltyProgram||{},s=a.pointsPerVisit||1;let o=[],r=[],i=[];try{[o,r,i]=await Promise.all([Ae(Q),at(Q),Za(Q)])}catch(l){console.error("Erro ao carregar dados para fidelidade:",l)}t.innerHTML=`
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
                         <input type="number" id="loyaltyPointsPerVisit" value="${s}" min="1" step="1" class="w-24 p-2 border border-indigo-300 rounded-md focus:ring-indigo-500 text-center font-bold text-lg bg-white">
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
    `;const n=t.querySelector("#loyaltyTiersContainer"),d=(l={})=>{const c=document.createElement("div");c.className="loyalty-tier-row bg-white p-4 border border-gray-200 rounded-lg shadow-sm relative grid grid-cols-1 md:grid-cols-4 gap-4 items-end";const u=l.type||"money",m=l.itemId||"",b=l.reward||"",v=l.discount||"",k=l.points||l.costPoints||"";c.innerHTML=`
            <div>
                <label class="text-xs font-bold text-gray-500 mb-1 block">Custo (Pontos)</label>
                <div class="relative">
                    <input type="number" placeholder="Ex: 100" data-field="points" value="${k}" class="w-full p-2 border border-gray-300 rounded-md font-bold text-gray-800">
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
                    <input type="text" placeholder="Ex: R$ 20 de Desconto" data-field="rewardName" value="${w(b)}" class="desc-input flex-1 p-2 border border-gray-300 rounded-md ${u!=="money"?"hidden":""}">
                    
                    <select data-field="itemId" class="item-select flex-1 p-2 border border-gray-300 rounded-md bg-white text-sm ${u==="money"?"hidden":""}">
                        <option value="">Selecione o item na lista...</option>
                    </select>

                    <div class="w-24 relative">
                        <span class="absolute left-2 top-2 text-gray-500 text-sm">R$</span>
                        <input type="number" placeholder="Valor" data-field="discount" value="${v}" step="0.01" class="discount-input w-full p-2 pl-7 border border-gray-300 rounded-md" title="Valor do desconto">
                    </div>
                </div>
            </div>

            <button type="button" class="remove-loyalty-tier absolute -top-3 -right-3 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white p-1.5 rounded-full shadow-md transition-colors" title="Remover Prémio">
                <i class="bi bi-x-lg text-sm"></i>
            </button>
        `;const x=c.querySelector(".type-select"),P=c.querySelector(".item-select"),I=c.querySelector(".desc-input"),$=c.querySelector(".discount-input"),h=f=>{P.innerHTML='<option value="">Selecione...</option>';let C=[];f==="service"?C=o:f==="product"?C=r:f==="package"&&(C=i),C.forEach(q=>{const D=q.id===m,T=q.name||q.title||"Sem nome",j=q.price||q.salePrice||0;P.innerHTML+=`<option value="${q.id}" data-price="${j}" ${D?"selected":""}>${w(T)}</option>`})};return u!=="money"&&h(u),x.addEventListener("change",f=>{const C=f.target.value;C==="money"?(P.classList.add("hidden"),I.classList.remove("hidden"),I.value="",$.value=""):(P.classList.remove("hidden"),I.classList.add("hidden"),h(C),$.value="")}),P.addEventListener("change",f=>{const C=f.target.selectedOptions[0];if(C&&C.value){I.value=C.text;const q=C.dataset.price;q&&($.value=parseFloat(q).toFixed(2))}}),c};a.tiers&&a.tiers.length>0?a.tiers.forEach(l=>n.appendChild(d(l))):n.appendChild(d()),t.querySelector("#add-loyalty-tier").addEventListener("click",()=>{n.appendChild(d())}),n.addEventListener("click",l=>{const c=l.target.closest(".remove-loyalty-tier");c&&c.closest(".loyalty-tier-row").remove()}),t.querySelector("#loyalty-form").addEventListener("submit",l=>{l.preventDefault();const c=Array.from(t.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(m=>{const b=m.querySelector(".type-select").value,v=b==="money"?null:m.querySelector(".item-select").value;let k=b==="money"?m.querySelector(".desc-input").value:m.querySelector(".item-select").options[m.querySelector(".item-select").selectedIndex]?.text;return{points:parseInt(m.querySelector('input[data-field="points"]').value,10)||0,costPoints:parseInt(m.querySelector('input[data-field="points"]').value,10)||0,type:b,itemId:v,reward:k,name:k,discount:parseFloat(m.querySelector('input[data-field="discount"]').value)||0}}),u={loyaltyProgram:{enabled:t.querySelector("#loyaltyEnabled").checked,type:"visit",pointsPerVisit:parseInt(t.querySelector("#loyaltyPointsPerVisit").value,10)||1,pointsPerCurrency:0,tiers:c.filter(m=>m.points>0&&m.reward)}};st(u,l)})}async function Ql(e,t){t.innerHTML=`
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
    `;try{const[a,s]=await Promise.all([ua(Q),Ka(Q)]),o=e.financialIntegration||{},r=e.commissionConfig||{},i=e.purchaseConfig||{};t.querySelector("#financialNatureId").innerHTML=Re(a,o.defaultNaturezaId),t.querySelector("#financialCostCenterId").innerHTML=Re(s,o.defaultCentroDeCustoId),t.querySelector("#purchaseNatureId").innerHTML=Re(a,i.defaultNatureId),t.querySelector("#purchaseCostCenterId").innerHTML=Re(s,i.defaultCostCenterId),t.querySelector("#commissionNatureId").innerHTML=Re(a,r.defaultNatureId),t.querySelector("#commissionCostCenterId").innerHTML=Re(s,r.defaultCostCenterId)}catch{g("Erro","Não foi possível carregar o plano de contas da unidade.","error")}t.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const s={financialIntegration:{defaultNaturezaId:t.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:t.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:t.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:t.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:t.querySelector("#commissionNatureId").value||null,defaultCostCenterId:t.querySelector("#commissionCostCenterId").value||null}};st(s,a)})}function Xl(e,t){const a=`https://wa.me/5516997859430?text=Olá, preciso de ajuda com o sistema Kairos (Minha Unidade: ${e.name}).`;t.innerHTML=`
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
    `}function Yl(e,t){const a=`https://wa.me/5516997859430?text=Gostaria de solicitar o cancelamento da assinatura. (Unidade: ${e.name})`;t.innerHTML=`
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
    `}function _o(e="indigo",t){const a=t.querySelector("#color-palette-container"),s=t.querySelector("#establishmentThemeColor");!a||!s||(a.innerHTML="",Object.entries(Ol).forEach(([o,r])=>{const i=o===e,n=document.createElement("div");n.className="w-24 text-center cursor-pointer mb-4",n.innerHTML=`
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${i?"border-gray-800 scale-110 shadow-lg":"border-transparent"} p-1 transition-all">
                <div class="w-full h-full rounded-full" style="background-color: ${r.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${i?"text-gray-900 font-bold":"text-gray-500"}">${r.name}</p>
        `,n.addEventListener("click",()=>{s.value=o,_o(o,t)}),a.appendChild(n)}),s.value=e)}function Zl(e,t){const a=t.querySelector("#slotIntervalContainer"),s=t.querySelector("#establishmentSlotInterval");if(!a||!s)return;const o=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=o.map(r=>{const i=r.value===e;return`<button type="button" data-value="${r.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors shadow-sm
                           ${i?"bg-indigo-600 text-white":"bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}">
                       ${r.label}
                   </button>`}).join(""),s.value=e,a.querySelectorAll(".interval-btn").forEach(r=>{r.addEventListener("click",()=>{s.value=r.dataset.value,a.querySelectorAll(".interval-btn").forEach(i=>{i.classList.remove("bg-indigo-600","text-white"),i.classList.add("bg-white","border","border-gray-300","text-gray-700")}),r.classList.add("bg-indigo-600","text-white"),r.classList.remove("bg-white","border","border-gray-300","text-gray-700")})})}async function Kl(e){const a=zo().find(o=>o.id===e);if(!a)return;De.innerHTML=`
        <div class="bg-white p-4 shadow-sm border-b mb-6 flex items-center justify-between sticky top-0 z-10">
            <div class="flex items-center gap-3">
                <button data-action="back-to-menu" class="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700">
                    <i class="bi bi-arrow-left"></i> Voltar
                </button>
                <h2 class="text-lg font-bold text-gray-800">${a.label}</h2>
            </div>
            <div class="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                ${w(W?.name||"")}
            </div>
        </div>
        
        <div id="settings-content-detail" class="pb-20 max-w-5xl mx-auto w-full">
            <div class="flex justify-center items-center py-10"><div class="spinner-border text-indigo-600" role="status"></div></div>
        </div>
    `,De.querySelector('button[data-action="back-to-menu"]').addEventListener("click",o=>{o.preventDefault(),Uo({id:Q})});const s=document.getElementById("settings-content-detail");switch(e){case"personal-data":zl(W,s);break;case"change-password":Vl(W,s);break;case"change-email":_l(W,s);break;case"branding":Ul(W,s);break;case"booking":Wl(W,s);break;case"working-hours":Jl(W,s);break;case"whatsapp-bot":Vo(W,s);break;case"loyalty":await Gl(W,s);break;case"financial":await Ql(W,s);break;case"support":Xl(W,s);break;case"cancellation":Yl(W,s);break;default:s.innerHTML='<div class="p-4 text-center">Módulo em construção.</div>'}}async function Uo(e={}){De.innerHTML=`
        <div class="flex flex-col justify-center items-center h-64">
            <div class="spinner-border text-indigo-600 border-4 w-12 h-12 mb-4" role="status"></div>
            <p class="text-gray-500 font-medium">A carregar configurações da unidade...</p>
        </div>
    `;try{Q=e.id||p.establishmentId,W=await Pe(Q);const t=e.id?`<button onclick="window.navigateTo('establishments-section')" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                   <i class="bi bi-diagram-3"></i> Voltar à Rede
               </button>`:"",a=W.isMatriz||!W.parentId?'<span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded ml-3">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded ml-3">📍 UNIDADE</span>',s=zo();De.innerHTML=`
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
                        <h3 class="text-2xl font-bold mb-1">${w(W.name)} ${a}</h3>
                        <p class="text-indigo-200 text-sm flex items-center gap-2"><i class="bi bi-geo-alt"></i> ${w(W.address||"Morada não definida")}</p>
                    </div>
                    <div class="relative z-10 hidden sm:block">
                        <div class="w-16 h-16 bg-white rounded-xl shadow-md p-1 flex items-center justify-center">
                            ${W.logo?`<img src="${W.logo}" class="w-full h-full object-contain rounded-lg">`:`<span class="text-2xl text-indigo-600 font-bold">${W.name.charAt(0).toUpperCase()}</span>`}
                        </div>
                    </div>
                    <div class="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${s.map(o=>`
                        <div data-section="${o.id}" class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-300 cursor-pointer transition-all flex items-center gap-4 group">
                            <div class="w-12 h-12 bg-gray-50 group-hover:bg-indigo-50 text-gray-400 group-hover:text-indigo-600 rounded-lg flex items-center justify-center transition-colors">
                                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${o.icon}"></path></svg>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-bold text-gray-800 group-hover:text-indigo-700 transition-colors text-sm">${o.label}</h4>
                            </div>
                            <i class="bi bi-chevron-right text-gray-300 group-hover:text-indigo-400 transition-colors"></i>
                        </div>
                    `).join("")}
                </div>
                
                <div class="mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Módulos Ativos Nesta Unidade</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="modules-container">
                        ${ed(W.modules||{})}
                    </div>
                </div>
            </div>
        `,De.querySelectorAll("div[data-section]").forEach(o=>{o.addEventListener("click",r=>{Kl(o.dataset.section)})}),De.querySelectorAll(".module-toggle").forEach(o=>{o.addEventListener("change",async()=>{const r=o.dataset.module;try{const n={...(await Pe(Q)).modules,[r]:o.checked};await Wa(Q,{modules:n}),g("Módulos","Módulos atualizados com sucesso.","success")}catch(i){o.checked=!o.checked,g("Erro",i.message,"error")}})})}catch(t){De.innerHTML=`
            <div class="p-8 text-center max-w-md mx-auto">
                <i class="bi bi-exclamation-triangle text-4xl text-red-500 mb-4 block"></i>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Erro ao carregar loja</h2>
                <p class="text-gray-600">${t.message}</p>
                <button onclick="window.navigateTo('establishments-section')" class="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700">Voltar à Rede</button>
            </div>
        `}}function ed(e){return[{key:"agenda-section",label:"Agenda Diária",icon:"bi-calendar"},{key:"comandas-section",label:"Comandas e PDV",icon:"bi-receipt"},{key:"financial-section",label:"Financeiro Completo",icon:"bi-cash-coin"},{key:"reports-section",label:"Relatórios Gerenciais",icon:"bi-graph-up"}].map(a=>`
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
    `).join("")}const ft=document.getElementById("content");async function Ge(e){const t=document.getElementById("blockagesList");if(t){t.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,s=document.getElementById("filterEndDate")?.value,o=await ra(p.establishmentId,a||new Date().toISOString().split("T")[0],s||new Date().toISOString().split("T")[0],e),r=document.getElementById("filterReason")?.value.toLowerCase(),i=r?o.filter(d=>d.reason&&d.reason.toLowerCase().includes(r)):o,n=i.reduce((d,l)=>{const c=l.reason||"Sem motivo";return d[c]||(d[c]=[]),d[c].push(l),d},{});if(t.innerHTML="",i.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(n).forEach(([d,l])=>{const c=document.createElement("div");c.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let m=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${w(d)} (${l.length})</h4>`;if(l.length>1){const b=JSON.stringify(l.map(v=>v.id));m+=`<button data-action="batch-delete-blockage" data-ids='${b}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}m+="</div>",c.innerHTML=m,l.forEach(b=>{const v=new Date(b.startTime),k=new Date(b.endTime),x=v.toLocaleDateString("pt-BR"),P=k.toLocaleDateString("pt-BR"),$=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${x===P?`${x} | ${v.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${k.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${x} às ${v.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${P} às ${k.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${b.id}">Apagar</button>
                    </div>`;c.innerHTML+=$}),t.appendChild(c)})}catch(a){t.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function td(e){e.preventDefault();const t=e.target,a=t.querySelector("#blockageProfId").value,s=t.querySelector("#blockageDate").value,o=t.querySelector("#blockageEndDate").value||s,r=t.querySelector("#blockageStartTime").value,i=t.querySelector("#blockageEndTime").value,n={establishmentId:p.establishmentId,professionalId:a,startTime:new Date(`${s}T${r}:00`).toISOString(),endTime:new Date(`${o}T${i}:00`).toISOString(),reason:t.querySelector("#blockageReason").value};try{await ia(n),t.reset(),g("Sucesso","Bloqueio adicionado com sucesso!","success"),Ge(a)}catch(d){g("Erro",`Não foi possível criar o bloqueio: ${d.message}`,"error")}}async function ad(e){e.preventDefault();const t=e.target,a=Array.from(t.querySelectorAll('input[name="batch-professionals"]:checked')).map(c=>c.value);if(a.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const s=t.querySelector("#batchBlockageDate").value,o=t.querySelector("#batchBlockageEndDate").value||s,r=t.querySelector("#batchBlockageStartTime").value,i=t.querySelector("#batchBlockageEndTime").value,n=t.querySelector("#batchBlockageReason").value,d=t.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="Aguarde...";const l=a.map(c=>{const u={establishmentId:p.establishmentId,professionalId:c,startTime:new Date(`${s}T${r}:00`).toISOString(),endTime:new Date(`${o}T${i}:00`).toISOString(),reason:n};return ia(u)});try{await Promise.all(l),g("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),t.reset(),t.querySelectorAll('input[name="batch-professionals"]:checked').forEach(u=>u.checked=!1);const c=document.getElementById("blockageProfId").value;c&&Ge(c)}catch(c){g("Erro",`Ocorreu um erro: ${c.message}`,"error")}finally{d.disabled=!1,d.textContent="Adicionar Bloqueio em Lote"}}function sd(e){ft.addEventListener("submit",t=>{t.target.id==="blockageForm"&&td(t),t.target.id==="batchBlockageForm"&&ad(t)}),ft.addEventListener("input",t=>{t.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&Ge(e)}),ft.addEventListener("click",async t=>{const a=t.target.closest("button[data-action]");if(!a)return;const s=a.dataset.action;if(s==="back-to-professionals")G("profissionais-section");else if(s==="delete-blockage"){if(await J("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await Ga(a.dataset.id),g("Sucesso","Bloqueio removido.","success"),Ge(e)}catch(r){g("Erro",`Não foi possível remover o bloqueio: ${r.message}`,"error")}}else if(s==="batch-delete-blockage"){const o=JSON.parse(a.dataset.ids);if(await J("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${o.length} bloqueios de uma vez?`))try{await uo(o),g("Sucesso",`${o.length} bloqueios removidos.`,"success"),Ge(e)}catch(i){g("Erro",`Não foi possível apagar os bloqueios: ${i.message}`,"error")}}})}async function od(e){const{professionalId:t,professionalName:a}=e;if(!t||!a){ft.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const s=w(a);ft.innerHTML=`
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
                        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Bloqueio para <span class="text-indigo-600">${s}</span></h3>
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
                        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Bloqueios de ${s}</h3>
                        <div id="blockage-filters" class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div><label for="filterStartDate" class="block text-sm font-medium text-gray-700">De</label><input type="date" id="filterStartDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            <div><label for="filterEndDate" class="block text-sm font-medium text-gray-700">Até</label><input type="date" id="filterEndDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            <div><label for="filterReason" class="block text-sm font-medium text-gray-700">Motivo</label><input type="text" id="filterReason" placeholder="Pesquisar motivo..." class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                        </div>
                        <div id="blockagesList" class="space-y-4 max-h-[60vh] overflow-y-auto pr-2"></div>
                    </div>
                </div>
            </div>
        </section>`,sd(t),await Ge(t);const o=document.getElementById("batchProfSelectionContainer");try{const r=await ge(p.establishmentId);o.innerHTML=r.map(i=>`
            <div class="flex items-center">
                <input id="prof-batch-${i.id}" value="${i.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${i.id}" class="ml-2 text-sm text-gray-700">${w(i.name)}</label>
            </div>`).join("")}catch{o.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const rd=e=>L(`/api/users/${e}`),id=e=>L("/api/users",{method:"POST",body:JSON.stringify(e)}),nd=(e,t)=>L(`/api/users/${e}`,{method:"PUT",body:JSON.stringify(t)}),ld=e=>L(`/api/users/${e}`,{method:"DELETE"}),dd=(e,t)=>L(`/api/users/${e}/password`,{method:"PUT",body:JSON.stringify({password:t})}),cd=(e,t)=>L(`/api/users/${e}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),rt=document.getElementById("content"),ud={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios Gerais","sales-report-section":"Relatório de Vendas (Caixa)","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores","profissionais-section":"Profissionais","ausencias-section":"Ausências e Bloqueios","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},pd={view:"Visualizar",create:"Criar",edit:"Editar"};let qt=null,Nt=null,Qe=null;const md={group_admin:"Administrador do Grupo",company_admin:"Gestor de Matriz",branch_manager:"Gestor de Filial",professional:"Profissional Padrão"};function gd(e){const t=document.getElementById("usersListContainer");if(!t)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(e.length===0){const s=a?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";t.innerHTML=`<p class="col-span-full text-center text-gray-500">${s}</p>`;return}e.sort((s,o)=>(s.status==="active"?-1:1)-(o.status==="active"?-1:1)),t.innerHTML=e.map(s=>{const o=JSON.stringify(s).replace(/'/g,"&apos;"),r=s.status==="active",i=p.professionals.find(m=>m.id===s.professionalId),n=i?i.name:"N/A",d=i?i.name.charAt(0):s.name.charAt(0),l=i?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(d)}`,c=md[s.role]||"Profissional",u=s.role==="group_admin"?"bg-purple-100 text-purple-800":s.role==="company_admin"?"bg-blue-100 text-blue-800":s.role==="branch_manager"?"bg-orange-100 text-orange-800":"bg-gray-100 text-gray-800";return`
        <div class="user-card-clickable bg-white rounded-lg shadow-sm border overflow-hidden flex cursor-pointer ${r?"":"opacity-60"} hover:shadow-md transition" 
             data-action="edit-user" 
             data-user='${o}'>
            
            <img src="${l}" alt="Foto de Perfil" class="w-16 h-16 object-cover flex-shrink-0 pointer-events-none border-r">
            
            <div class="p-3 flex-grow flex flex-col justify-between min-w-0">
                <div class="pointer-events-none min-w-0">
                    <div class="flex justify-between items-start gap-2">
                        <p class="font-bold text-gray-800 text-sm truncate">${s.name}</p>
                        <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap ${u}">${c}</span>
                    </div>
                    <p class="text-xs text-gray-500 truncate">${s.email}</p>
                    <p class="text-[10px] text-gray-400 mt-1 truncate">Prof: <span class="font-semibold text-gray-600">${n}</span></p>
                </div>
                
                <div class="mt-2 flex items-center justify-between gap-2">
                    <label class="flex items-center cursor-pointer" title="${r?"Ativo":"Inativo"}">
                        <div class="relative">
                            <input type="checkbox" data-action="toggle-user-status" data-user-id="${s.id}" class="sr-only" ${r?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-8 h-4 rounded-full"></div>
                        </div>
                    </label>
                    
                    <button data-action="delete-user" data-user-id="${s.id}" class="text-gray-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors action-btn-delete" title="Excluir Usuário">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `}).join("")}function Na(){const t=document.getElementById("showInactiveUsersToggle")?.checked?p.users:p.users.filter(a=>a.status==="active");gd(t)}function bd(e={}){return Object.entries(ud).map(([t,a])=>{const s=t==="agenda-section"||t==="comandas-section",o=e[t]?.view_all_prof===!0,r=Object.entries(pd).map(([n,d])=>`
             <label class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${t}" data-permission="${n}" class="sr-only" ${e[t]?.[n]?"checked":""}>
                    <div class="toggle-bg block bg-gray-300 w-8 h-4 rounded-full"></div>
                </div>
                <span class="text-[10px] text-gray-600 font-medium">${d}</span>
            </label>
        `).join(""),i=s?`
            <div class="col-span-full pt-2 mt-2 border-t border-gray-100">
                <label class="flex items-center space-x-2 cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" data-module="${t}" data-permission="view_all_prof" class="sr-only" ${o?"checked":""}>
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
    `}).join("")}function Ds(e){if(!Qe||p.userRole==="professional")return"";const t=e?.accessibleEstablishments?.map(r=>r.id)||[],a=e?.accessibleCompanies?.map(r=>r.id)||[];if((e?.role||"professional")==="group_admin")return'<div class="p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 text-sm font-bold">Acesso Total (Global) liberado.</div>';let o='<div class="space-y-3 max-h-48 overflow-y-auto custom-scrollbar p-2 bg-gray-50 rounded border">';return Qe.companies.forEach(r=>{const i=a.includes(r.id),n=Qe.branches.filter(d=>d.companyId===r.id);o+=`
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
        `}),o+="</div>",o}async function Ts(e=null){document.getElementById("user-list-view").classList.add("hidden");const t=document.getElementById("user-form-view");t.classList.remove("hidden");let a=p.professionals;if(!a||a.length===0)try{a=await ge(p.currentViewContext.id),p.professionals=a}catch{console.warn("Profissionais não carregados")}if(["group_admin","company_admin"].includes(p.userRole)&&!Qe)try{const l=await fetch("/api/establishments/hierarchy",{headers:{Authorization:`Bearer ${await p.getAuthToken?.()||""}`}});l.ok&&(Qe=await l.json())}catch(l){console.error("Falha ao buscar hierarquia",l),Qe={companies:[],branches:[]}}const s=l=>a?.find(c=>c.id===l),o=e?.professionalId;s(o);const r=e!==null;t.querySelector("#userFormTitle").textContent=r?`Editar: ${e.name}`:"Novo Usuário";const i=t.querySelector("#userForm");i.innerHTML=`
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
                            ${Ds(e)}
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
                        ${a?.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${l.name}</option>`).join("")}
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
                    ${bd(e?.permissions)}
                </div>
            </div>

            <div class="flex gap-3 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-2 bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300">Cancelar</button>
                <button type="submit" class="flex-1 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">Salvar Usuário</button>
            </div>
        </div>
    `;const n=i.querySelector("#userRole"),d=i.querySelector("#hierarchySelectorContainer");if(n&&d){n.addEventListener("change",c=>{const u={...e,role:c.target.value};d.innerHTML=Ds(u),l()});const l=()=>{d.querySelectorAll(".company-checkbox").forEach(c=>{c.addEventListener("change",u=>{u.target.closest(".company-block").querySelectorAll(".branch-checkbox").forEach(v=>v.checked=u.target.checked)})})};l()}if(i.addEventListener("submit",async l=>{l.preventDefault();const c={};i.querySelectorAll("input[data-module]").forEach(x=>{const P=x.dataset.module,I=x.dataset.permission;c[P]||(c[P]={}),c[P][I]=x.checked});const u=i.querySelector("#userProfessionalId").value||null,m=i.querySelector("#userRole")?.value||"professional",b=[],v=[];if(m!=="group_admin"&&i.querySelector(".company-checkbox")&&(i.querySelectorAll(".company-checkbox:checked").forEach(x=>{b.push({id:x.value,name:x.dataset.name})}),i.querySelectorAll(".branch-checkbox:checked").forEach(x=>{v.push({id:x.value,name:x.dataset.name,companyId:x.dataset.companyId})}),v.length===0))return g("Atenção","Você deve selecionar pelo menos uma filial para este usuário.","error");const k={name:i.querySelector("#userName").value,permissions:c,professionalId:u,role:m,accessibleCompanies:b,accessibleEstablishments:v};try{if(r){const x=i.querySelector("#userEmail").value;e?.email!==x&&(k.email=x),await nd(e.id,k),g("Usuário atualizado com sucesso!","success")}else k.email=i.querySelector("#userEmail").value,k.password=i.querySelector("#userPassword").value,await id(k),g("Usuário criado com sucesso!","success");Zt()}catch(x){g(`Erro: ${x.message}`,"error")}}),r){const l=i.querySelector('[data-action="show-password-form"]'),c=i.querySelector("#password-form");l&&c&&(l.addEventListener("click",()=>{l.classList.add("hidden"),c.classList.remove("hidden")}),c.querySelector('[data-action="cancel-password-change"]').addEventListener("click",()=>{l.classList.remove("hidden"),c.classList.add("hidden"),c.querySelector("#userNewPassword").value=""}),c.querySelector('[data-action="save-password"]').addEventListener("click",async u=>{const m=u.target,b=c.querySelector("#userNewPassword").value;if(!b||b.length<6)return g("Aviso","Senha deve ter no mínimo 6 caracteres.","error");if(await J("Alterar Senha","Tem certeza?"))try{m.disabled=!0,m.textContent="...",await dd(e.id,b),g("Sucesso","Senha alterada.","success"),l.classList.remove("hidden"),c.classList.add("hidden")}catch(v){g("Erro",v.message,"error")}finally{m.disabled=!1,m.textContent="Salvar Senha"}}))}}async function fd(){const e=document.getElementById("usersListContainer");e.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[t,a]=await Promise.all([rd(p.currentViewContext.id),ge(p.currentViewContext.id)]);p.users=t,p.professionals=a,Na()}catch{g("Erro ao carregar usuários.","error"),e.innerHTML='<p class="col-span-full text-center text-red-500">Falha ao carregar.</p>'}}async function Zt(){rt.innerHTML=`
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
    `,qt&&rt.removeEventListener("click",qt),Nt&&rt.removeEventListener("change",Nt),qt=async e=>{const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"new-user":Ts();break;case"edit-user":const s=JSON.parse(t.dataset.user.replace(/&apos;/g,"'"));Ts(s);break;case"back-to-list":Zt();break;case"delete-user":{if(e.stopPropagation(),await J("Excluir Usuário","Tem certeza? Ação irreversível."))try{await ld(t.dataset.userId),g("Usuário excluído!","success"),Zt()}catch(o){g(`Erro: ${o.message}`,"error")}break}}},Nt=async e=>{const t=e.target.closest('input[data-action="toggle-user-status"]');if(e.target.id==="showInactiveUsersToggle")Na();else if(t){e.stopPropagation();const a=t.dataset.userId,s=t.checked?"active":"inactive";try{await cd(a,s);const o=p.users.findIndex(r=>r.id===a);o>-1&&(p.users[o].status=s,Na())}catch(o){g(`Erro: ${o.message}`,"error"),t.checked=!t.checked}}},rt.addEventListener("click",qt),rt.addEventListener("change",Nt),await fd()}const xd=document.getElementById("content");let Ps={},ja=null;function hd(){Object.values(Ps).forEach(e=>e?.destroy()),Ps={}}function vd(e,t){if(!window.jspdf){g("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a({orientation:"landscape",unit:"px",format:"a4"}),o=document.getElementById("salesReportSummaryCards");if(s.setFontSize(18),s.text(e,s.internal.pageSize.getWidth()/2,40,{align:"center"}),o){const i=[["Receita Total",o.querySelector("#summary-revenue").textContent],["Vendas Totais",o.querySelector("#summary-transactions").textContent],["Ticket Médio",o.querySelector("#summary-avg-ticket").textContent]];s.autoTable({startY:60,head:[["Métrica","Valor"]],body:i,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const r=s.lastAutoTable?s.lastAutoTable.finalY+20:60;s.text("Detalhes das Vendas",20,r),s.autoTable({html:`#${t}`,startY:r+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),s.save(`${e.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function Bs(e){const t=document.getElementById("genericModal"),a=w(e.client),s=w(e.items),o=w(e.responsavelCaixa||"N/A"),r=(e.payments||[]).map(i=>`
        <div class="flex justify-between text-sm">
            <span>${w(i.method.charAt(0).toUpperCase()+i.method.slice(1))}</span>
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
                    <p class="font-semibold text-gray-800">${s}</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm font-medium text-gray-600">Responsável pelo Caixa</p>
                    <p class="font-semibold text-gray-800">${o}</p>
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
    `,t.style.display="flex"}function yd(e){const{summary:t,transactions:a}=e;document.getElementById("summary-revenue").textContent=`R$ ${t.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=t.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${t.averageTicket.toFixed(2)}`;const s=document.getElementById("paymentSummaryTableBody"),o=Object.entries(t.paymentMethodTotals).sort(([,n],[,d])=>d-n);s.innerHTML=o.map(([n,d])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${w(n.charAt(0).toUpperCase()+n.slice(1))}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${d.toFixed(2)}</td>
        </tr>
    `).join("");const r=document.getElementById("transactionsTableBody"),i=document.getElementById("mobileTransactionsList");if(a.length===0){const n='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';r.innerHTML=n,i.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}r.innerHTML=a.map((n,d)=>{const l=w(n.client),c=w(n.items),u=w(n.type);return`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${d}">
            <td class="w-24 py-3 px-4">${new Date(n.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${l}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${c}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${u}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${n.total.toFixed(2)}</td>
        </tr>
    `}).join(""),r.querySelectorAll("tr").forEach(n=>{n.addEventListener("dblclick",()=>{const d=n.dataset.transactionIndex,l=ja.transactions[d];l&&Bs(l)})}),i.innerHTML=a.map((n,d)=>{const l=w(n.client),c=w(n.items),u=w(n.type);return`
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
    `}).join(""),i.querySelectorAll("div[data-transaction-index]").forEach(n=>{n.addEventListener("click",()=>{const d=n.dataset.transactionIndex,l=ja.transactions[d];l&&Bs(l)})})}async function Ms(){const e=document.getElementById("main-reports-view"),t=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!e||!t||!a)return;const s=t.value,o=a.value;if(!s||!o)return g("Atenção","Por favor, selecione as datas de início e fim.","error");e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const r=document.getElementById("cashierSessionFilter").value,i=await Gt({establishmentId:p.establishmentId,startDate:s,endDate:o,cashierSessionId:r});ja=i,e.innerHTML=`
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
        `,yd(i)}catch(r){g("Erro",`Não foi possível carregar o relatório: ${r.message}`,"error"),e.innerHTML=`<p class="p-8 text-center text-red-500">${w(r.message)}</p>`}}async function wd(){hd();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];xd.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",Ms),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const s=document.getElementById("reportStartDate").value,o=document.getElementById("reportEndDate").value,r=`Relatorio_Vendas_${s}_a_${o}`;vd(r,"transactionsTable")});try{const s=await Qi(p.establishmentId),o=document.getElementById("cashierSessionFilter");s&&s.length>0&&s.forEach(r=>{const i=new Date(r.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),n=w(r.closedByName||"N/A");o.innerHTML+=`<option value="${r.id}">${n} - ${i}</option>`})}catch{g("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await Ms()}const kd=document.getElementById("content");let S={payables:[],receivables:[],natures:[],costCenters:[],establishments:[],currentTab:"receivables",statusFilter:"all",startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date(new Date().getFullYear(),new Date().getMonth()+1,0).toISOString().split("T")[0],filterNaturezaId:"all",filterCostCenterId:"all",filterEstablishmentIds:new Set,searchQuery:"",isAdvancedFilterOpen:!1,selectedIds:new Set,isSelectionMode:!1,sortCol:"dueDate",sortAsc:!0},jt=null,Rt=null;function is(e){const t=new Map,a=[];return e&&(e.forEach(s=>t.set(s.id,{...s,children:[]})),t.forEach(s=>{s.parentId&&t.has(s.parentId)?t.get(s.parentId).children.push(s):a.push(s)})),a}function Wo(e){if(!e)return{day:"--",month:"---",full:"--/--/----"};const[t,a,s]=e.split("-"),o=new Date(t,a-1,s),r=String(o.getDate()).padStart(2,"0"),i=o.toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return{day:r,month:i,full:o.toLocaleDateString("pt-BR")}}function ue(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function Ke(e,t){if(t==="paid")return!1;const a=new Date;a.setHours(0,0,0,0);const[s,o,r]=e.split("-");return new Date(s,o-1,r)<a}function Sd(e,t,a){if(!e)return;if(!t||t.length===0){e.innerHTML=`
            <div class="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <i class="bi bi-inbox text-2xl text-gray-300"></i>
                <p class="text-gray-500 text-sm mt-2 font-medium">Nenhum item criado.</p>
            </div>`;return}const s=(o,r=0)=>{const i=r*16,n=r===0,d=n?"bi-folder-fill text-indigo-500":"bi-file-earmark-text text-gray-400",l=n?"bg-white shadow-sm border border-gray-200":"bg-gray-50 border border-gray-100/50",c=n?"text-sm font-bold text-gray-800":"text-xs font-semibold text-gray-600",u=r>0?'<div class="absolute left-0 top-1/2 w-3 border-t-2 border-gray-200" style="margin-left: -12px;"></div>':"",m=r>0?"border-left: 2px solid #e5e7eb;":"";return`
            <div class="relative flex justify-between items-center ${l} p-2 rounded-lg mb-1.5 hover:border-indigo-300 transition-all group" style="margin-left: ${i}px; ${m}">
                ${u}
                <span class="${c} flex items-center gap-2">
                    <i class="bi ${d} text-base"></i>
                    ${o.name}
                </span>
                <button type="button" data-action="delete-${a}" data-id="${o.id}" class="text-gray-400 hover:text-red-600 text-xs w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-transparent hover:border-red-100" title="Excluir">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
            ${o.children.map(b=>s(b,r+1)).join("")}
        `};e.innerHTML=t.map(o=>s(o)).join("")}async function Ra(e){const t=document.getElementById("genericModal"),a=e==="nature",s=a?"Plano de Naturezas":"Centros de Custo",o=a?ua:Ka,r=a?hn:yn,i=a?"natures":"costCenters";t.innerHTML=`
        <div class="modal-content max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">
            <div class="bg-gray-50 px-5 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 class="text-base font-bold text-gray-800 flex items-center gap-2">
                    <i class="bi ${a?"bi-tags-fill text-indigo-500":"bi-diagram-3-fill text-blue-500"}"></i> ${s}
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
        </div>`,t.style.display="flex";const n=t.querySelector("#hierarchyList"),d=t.querySelector("#itemParent"),l=u=>{const m=is(u);Sd(n,m,e);const b=d.value;d.innerHTML='<option value="">-- Nível Principal --</option>';const v=(k,x=0)=>{const P="  ".repeat(x)+(x>0?"↳ ":"");d.innerHTML+=`<option value="${k.id}">${P}${k.name}</option>`,k.children.forEach(I=>v(I,x+1))};m.forEach(k=>v(k)),d.value=b};try{const u=await o(p.establishmentId);S[i]=u,l(u)}catch(u){console.error(u)}const c=t.querySelector("#hierarchyForm");c.addEventListener("submit",async u=>{u.preventDefault();const m=t.querySelector("#itemName").value,b=d.value;try{await r({name:m,parentId:b||null,establishmentId:p.establishmentId});const v=await o(p.establishmentId);S[i]=v,l(v),c.reset(),await Be(),g("Sucesso","Item adicionado à estrutura.","success")}catch(v){g("Erro",v.message,"error")}})}async function $d(){try{const t=(await ve()).matrizes||[];S.establishments=[],t.forEach(a=>{S.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>S.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),S.filterEstablishmentIds.size===0&&S.filterEstablishmentIds.add(p.establishmentId)}catch(e){console.warn("Erro ao buscar lojas",e)}Jo(),Go(),await Be()}function Jo(){const e=S.establishments.map(t=>`
        <label class="inline-flex items-center gap-2 px-3 py-1.5 bg-white border ${S.filterEstablishmentIds.has(t.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-gray-200 text-gray-600"} rounded-lg cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" value="${t.id}" ${S.filterEstablishmentIds.has(t.id)?"checked":""}>
            <span class="text-xs font-bold whitespace-nowrap">${t.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${t.name}</span>
        </label>
    `).join("");kd.innerHTML=`
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
                    <button id="tab-receivables" class="flex-1 md:w-32 py-1.5 text-xs font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${S.currentTab==="receivables"?"bg-white text-emerald-700 shadow":"text-gray-600 hover:text-gray-800"}">
                        A Receber
                    </button>
                    <button id="tab-payables" class="flex-1 md:w-32 py-1.5 text-xs font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${S.currentTab==="payables"?"bg-white text-red-700 shadow":"text-gray-600 hover:text-gray-800"}">
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
                    <button data-status="all" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${S.statusFilter==="all"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Todos</button>
                    <button data-status="pending" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${S.statusFilter==="pending"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Abertos / Prov.</button>
                    <button data-status="paid" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${S.statusFilter==="paid"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Baixados</button>
                    <button data-status="overdue" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${S.statusFilter==="overdue"?"bg-red-50 text-red-700 border-red-200":"bg-white text-gray-600 hover:bg-gray-50"}">Atrasados</button>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                    <div class="relative flex-shrink-0 w-full md:w-64">
                        <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input type="text" id="searchInput" value="${S.searchQuery}" placeholder="Pesquisar..." class="w-full pl-8 p-1.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                    <button id="toggle-filter-btn" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5 text-xs flex-shrink-0 ${S.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                        <i class="bi bi-funnel"></i> Filtros
                    </button>
                </div>
            </div>

            <div id="filter-panel" class="${S.isAdvancedFilterOpen?"block":"hidden"} mb-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                    
                    ${S.establishments.length>1?`
                    <div class="md:col-span-4 mb-1">
                        <label class="block text-[9px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest">Filtrar por Unidades (Multi-Seleção)</label>
                        <div class="flex flex-wrap gap-2" id="establishment-filters-container">
                            ${e}
                        </div>
                    </div>
                    `:""}
                    
                    <div>
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Data Inicial</label>
                        <input type="date" id="filterStartDate" value="${S.startDate}" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Data Final</label>
                        <input type="date" id="filterEndDate" value="${S.endDate}" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none">
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

            <button id="fab-add" class="md:hidden fixed bottom-20 right-4 w-12 h-12 ${S.currentTab==="receivables"?"bg-emerald-600":"bg-red-600"} text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40">
                <i class="bi bi-plus-lg text-xl"></i>
            </button>

        </section>
    `,document.querySelector('.date-preset-btn[data-preset="month"]').classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),document.querySelector('.date-preset-btn[data-preset="month"]').classList.remove("bg-white","text-gray-600","border-gray-200"),Qo()}function Ed(){const e=S.currentTab==="receivables",t=e?S.receivables:S.payables;let a=t;if(S.statusFilter!=="all"&&(a=t.filter(n=>{const d=Ke(n.dueDate,n.status);return S.statusFilter==="overdue"?d:S.statusFilter==="pending"?n.status==="pending"&&!d:n.status===S.statusFilter})),S.searchQuery&&(a=a.filter(n=>n.description&&n.description.toLowerCase().includes(S.searchQuery)||n.entity&&n.entity.toLowerCase().includes(S.searchQuery)||n.notes&&n.notes.toLowerCase().includes(S.searchQuery))),a.sort((n,d)=>new Date(n.dueDate)-new Date(d.dueDate)),a.length===0){g("Aviso","Não há dados para exportar com os filtros atuais.","info");return}const s=new Map(S.natures.map(n=>[n.id,n.name])),o=new Map(S.costCenters.map(n=>[n.id,n.name])),r=new Map(S.establishments.map(n=>[n.id,n])),i=a.map(n=>{const d=n.status==="paid",l=Ke(n.dueDate,n.status);let c=d?"Baixado":l?"Atrasado":"A Vencer / Pendente";const u=n.naturezaId?s.get(n.naturezaId)||"Não Categorizado":"Geral",m=n.centroDeCustoId?o.get(n.centroDeCustoId)||"Não Categorizado":"Geral",b=r.get(n.establishmentId),v=b?b.name:"Atual",k=n.saleId||n.appointmentId||n.origin==="comanda"?"Comanda / PDV":"Manual";return{"Data de Vencimento":new Date(n.dueDate).toLocaleDateString("pt-BR"),"Data de Pagamento":n.paymentDate?new Date(n.paymentDate).toLocaleDateString("pt-BR"):"-",Descrição:n.description||"","Favorecido / Pagador":n.entity||"",Unidade:v,Natureza:u,"Centro de Custo":m,Origem:k,"Documento / NFS":n.documentNumber||"",Status:c,"Valor (R$)":n.amount}});try{if(typeof XLSX>"u"){g("Erro","A biblioteca de exportação (XLSX) não foi carregada no sistema.","error");return}const n=XLSX.utils.json_to_sheet(i),d=XLSX.utils.book_new();XLSX.utils.book_append_sheet(d,n,"Financeiro");const c=`Fluxo_${e?"Receitas":"Despesas"}_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(d,c)}catch(n){console.error("Erro ao exportar:",n),g("Erro","Não foi possível exportar para Excel.","error")}}function Go(){const e=document.getElementById("select-all-toggle");e&&e.addEventListener("change",o=>{const r=o.target.checked,i=document.querySelectorAll(".item-checkbox");S.selectedIds.clear(),i.forEach(n=>{n.checked=r,r&&S.selectedIds.add(n.dataset.id)}),Ve()}),document.getElementById("cancel-selection-btn").addEventListener("click",()=>{S.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(o=>o.checked=!1),Ve()}),document.getElementById("batch-delete-btn").addEventListener("click",async()=>{const o=S.selectedIds.size;if(o===0)return;if(await J("Excluir Lançamentos",`Deseja realmente apagar ${o} registros financeiros?`))try{const i=S.currentTab==="payables"?"payables":"receivables";await Do(i,Array.from(S.selectedIds)),g("Sucesso",`${o} itens excluídos.`,"success"),S.selectedIds.clear(),Ve(),Be()}catch{g("Erro","Falha ao excluir itens.","error")}}),document.querySelectorAll(".est-filter-checkbox").forEach(o=>{o.addEventListener("change",r=>{const i=r.target.closest("label");r.target.checked?(S.filterEstablishmentIds.add(r.target.value),i.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.remove("border-gray-200","text-gray-600")):(S.filterEstablishmentIds.delete(r.target.value),i.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.add("border-gray-200","text-gray-600"))})}),document.querySelectorAll(".sort-header").forEach(o=>{o.addEventListener("click",r=>{const i=r.currentTarget.dataset.sort;S.sortCol===i?S.sortAsc=!S.sortAsc:(S.sortCol=i,S.sortAsc=!0),xt()})}),document.getElementById("toggle-filter-btn").addEventListener("click",()=>{const o=document.getElementById("filter-panel"),r=document.getElementById("toggle-filter-btn");S.isAdvancedFilterOpen=!S.isAdvancedFilterOpen,S.isAdvancedFilterOpen?(o.classList.remove("hidden"),r.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.classList.remove("bg-white","text-gray-600","border-gray-200")):(o.classList.add("hidden"),r.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),r.classList.add("bg-white","text-gray-600","border-gray-200"))}),document.getElementById("settings-btn").addEventListener("click",Pd);const t=document.getElementById("export-excel-btn");t&&t.addEventListener("click",Ed),document.querySelectorAll('[data-action="new-financial"]').forEach(o=>{o.addEventListener("click",r=>{va(r.target.closest("button").dataset.type)})}),document.getElementById("fab-add").addEventListener("click",()=>{const o=S.currentTab==="payables"?"payable":"receivable";va(o)});const a=document.getElementById("tab-receivables"),s=document.getElementById("tab-payables");a.addEventListener("click",()=>As("receivables")),s.addEventListener("click",()=>As("payables")),document.querySelectorAll(".status-filter-btn").forEach(o=>{o.addEventListener("click",r=>{document.querySelectorAll(".status-filter-btn").forEach(i=>{i.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200","bg-red-50","text-red-700","border-red-200"),i.classList.add("bg-white","text-gray-600")}),r.target.dataset.status==="overdue"?r.target.classList.add("bg-red-50","text-red-700","border-red-200"):r.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.target.classList.remove("bg-white","text-gray-600"),S.statusFilter=r.target.dataset.status,xt(),Xo()})}),document.querySelectorAll(".date-preset-btn").forEach(o=>{o.addEventListener("click",r=>{document.querySelectorAll(".date-preset-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),r.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.target.classList.remove("bg-white","text-gray-600","border-gray-200");const i=r.target.dataset.preset,n=new Date;let d,l;i==="month"?(d=new Date(n.getFullYear(),n.getMonth(),1),l=new Date(n.getFullYear(),n.getMonth()+1,0)):i==="last_month"?(d=new Date(n.getFullYear(),n.getMonth()-1,1),l=new Date(n.getFullYear(),n.getMonth(),0)):i==="year"&&(d=new Date(n.getFullYear(),0,1),l=new Date(n.getFullYear(),11,31)),document.getElementById("filterStartDate").value=d.toISOString().split("T")[0],document.getElementById("filterEndDate").value=l.toISOString().split("T")[0],document.getElementById("apply-filter-btn").click()})}),document.getElementById("searchInput").addEventListener("input",o=>{S.searchQuery=o.target.value.toLowerCase(),xt()}),document.getElementById("clear-filters-btn").addEventListener("click",()=>{const o=new Date;document.getElementById("filterStartDate").value=new Date(o.getFullYear(),o.getMonth(),1).toISOString().split("T")[0],document.getElementById("filterEndDate").value=new Date(o.getFullYear(),o.getMonth()+1,0).toISOString().split("T")[0],document.getElementById("filterNaturezaId").value="all",document.getElementById("filterCostCenterId").value="all",S.filterEstablishmentIds.clear(),S.filterEstablishmentIds.add(p.establishmentId),Jo(),Go()}),document.getElementById("apply-filter-btn").addEventListener("click",()=>{S.startDate=document.getElementById("filterStartDate").value,S.endDate=document.getElementById("filterEndDate").value,S.filterNaturezaId=document.getElementById("filterNaturezaId").value,S.filterCostCenterId=document.getElementById("filterCostCenterId").value,S.filterEstablishmentIds.size===0&&S.filterEstablishmentIds.add(p.establishmentId),document.getElementById("toggle-filter-btn").click(),Be()}),jt&&document.body.removeEventListener("click",jt),jt=o=>{const r=o.target;if(r.classList.contains("item-checkbox")||r.classList.contains("modal-item-checkbox")){const d=r.value||r.dataset.id;r.checked?S.selectedIds.add(d):S.selectedIds.delete(d),Ve(),o.stopPropagation();return}const i=r.closest("button[data-action]");if(i){const{action:d,type:l,id:c}=i.dataset;if(o.stopPropagation(),d==="delete"){const u=i.closest(".financial-row").dataset.item.replace(/&apos;/g,"'");Cd(l,JSON.parse(u));return}if(d==="mark-as-paid"){Ld(l,c);return}if(d==="manage-natures"){Ra("nature");return}if(d==="manage-cost-centers"){Ra("cost-center");return}}const n=r.closest(".financial-row");if(n&&document.getElementById("list-container").contains(n)&&!r.closest("button")&&!r.closest(".item-checkbox")){const{type:d}=n.dataset,l=JSON.parse(n.dataset.item.replace(/&apos;/g,"'"));va(d,l)}},document.body.addEventListener("click",jt),Rt&&document.getElementById("genericModal").removeEventListener("click",Rt),Rt=o=>{if(o.target.closest('[data-action="close-modal"]')){document.getElementById("genericModal").style.display="none";return}const i=o.target.closest('button[data-action^="delete-"]');if(i){const n=i.dataset.action.split("-")[1];Td(n,i.dataset.id)}},document.getElementById("genericModal").addEventListener("click",Rt)}function Ve(){const e=document.getElementById("batch-action-bar"),t=document.getElementById("selected-count"),a=document.getElementById("fab-add"),s=S.selectedIds.size;t.textContent=s,s>0?(e.classList.remove("hidden"),e.classList.add("flex"),a&&a.classList.add("hidden")):(e.classList.add("hidden"),e.classList.remove("flex"),a&&a.classList.remove("hidden"))}function As(e){S.currentTab=e,S.selectedIds.clear(),Ve(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1);const t=document.getElementById("tab-receivables"),a=document.getElementById("tab-payables"),s=document.getElementById("fab-add");e==="receivables"?(t.classList.add("bg-white","text-emerald-700","shadow"),t.classList.remove("text-gray-600"),a.classList.remove("bg-white","text-red-700","shadow"),a.classList.add("text-gray-600"),s&&(s.className="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40")):(a.classList.add("bg-white","text-red-700","shadow"),a.classList.remove("text-gray-600"),t.classList.remove("bg-white","text-emerald-700","shadow"),t.classList.add("text-gray-600"),s&&(s.className="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40")),xt()}async function Be(){const e=document.getElementById("list-container");e.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-xs">A processar transações...</p></div>';try{if(S.natures.length===0){const[r,i]=await Promise.all([ua(p.establishmentId),Ka(p.establishmentId)]);S.natures=r,S.costCenters=i,Qo()}const t=Array.from(S.filterEstablishmentIds).join(","),a={startDate:S.startDate,endDate:S.endDate,establishmentId:t};S.filterNaturezaId!=="all"&&(a.natureId=S.filterNaturezaId),S.filterCostCenterId!=="all"&&(a.costCenterId=S.filterCostCenterId);const[s,o]=await Promise.all([Po(a),Bo(a)]);S.payables=s.entries||[],S.receivables=o.entries||[],Xo(),xt()}catch(t){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-xs font-medium">Erro ao carregar dados: ${t.message}</p>
            </div>`}}function Qo(){const e=s=>{let o='<option value="all">-- Todas as opções --</option>';const r=is(s),i=(n,d=0)=>{const l="  ".repeat(d)+(d>0?"↳ ":"");o+=`<option value="${n.id}">${l}${n.name}</option>`,n.children.forEach(c=>i(c,d+1))};return r.forEach(n=>i(n)),o},t=document.getElementById("filterNaturezaId"),a=document.getElementById("filterCostCenterId");t&&(t.innerHTML=e(S.natures)),a&&(a.innerHTML=e(S.costCenters))}function Xo(){const e=document.getElementById("summary-section");if(!e)return;const t=S.currentTab==="receivables";let s=t?S.receivables:S.payables;S.searchQuery&&(s=s.filter(c=>c.description&&c.description.toLowerCase().includes(S.searchQuery)||c.entity&&c.entity.toLowerCase().includes(S.searchQuery)||c.notes&&c.notes.toLowerCase().includes(S.searchQuery)));const o=s.reduce((c,u)=>c+u.amount,0),r=s.filter(c=>c.status==="paid").reduce((c,u)=>c+u.amount,0),i=s.filter(c=>c.status==="pending"&&!Ke(c.dueDate,c.status)).reduce((c,u)=>c+u.amount,0),n=s.filter(c=>Ke(c.dueDate,c.status)).reduce((c,u)=>c+u.amount,0),d=t?"emerald":"red",l=t?"Receitas":"Despesas";e.innerHTML=`
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total do Período</span>
            <span class="text-xl font-black text-gray-800 mt-0.5">${ue(o)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">A Vencer / Prov.</span>
            <span class="text-xl font-bold text-blue-600 mt-0.5">${ue(i)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${l} Baixadas</span>
            <span class="text-xl font-bold text-${d}-600 mt-0.5">${ue(r)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Atrasadas</span>
            <span class="text-xl font-bold ${n>0?"text-red-600":"text-gray-400"} mt-0.5">${ue(n)}</span>
        </div>
    `}function Id(){document.querySelectorAll(".sort-header").forEach(e=>{const t=e.querySelector("i");if(!t)return;e.dataset.sort===S.sortCol?(e.classList.add("text-indigo-700"),e.classList.remove("text-gray-500"),t.className=S.sortAsc?"bi bi-arrow-up ml-1 text-indigo-600":"bi bi-arrow-down ml-1 text-indigo-600"):(e.classList.remove("text-indigo-700"),e.classList.add("text-gray-500"),t.className="bi bi-arrow-down-up ml-1 opacity-30 text-[10px]")})}function xt(){const e=document.getElementById("list-container");if(!e)return;const t=S.currentTab==="receivables",a=t?S.receivables:S.payables;let s=a;if(S.statusFilter!=="all"&&(s=a.filter(l=>{const c=Ke(l.dueDate,l.status);return S.statusFilter==="overdue"?c:S.statusFilter==="pending"?l.status==="pending"&&!c:l.status===S.statusFilter})),S.searchQuery&&(s=s.filter(l=>l.description&&l.description.toLowerCase().includes(S.searchQuery)||l.entity&&l.entity.toLowerCase().includes(S.searchQuery)||l.notes&&l.notes.toLowerCase().includes(S.searchQuery))),s.sort((l,c)=>{let u=l[S.sortCol],m=c[S.sortCol];return S.sortCol==="dueDate"?(u=new Date(u).getTime(),m=new Date(m).getTime()):(S.sortCol==="description"||S.sortCol==="status")&&(u=u?u.toLowerCase():"",m=m?m.toLowerCase():""),u<m?S.sortAsc?-1:1:u>m?S.sortAsc?1:-1:0}),Id(),s.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-inbox text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum registo encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente limpar os filtros ou faça um novo lançamento.</p>
            </div>
        `;return}const o=new Map(S.natures.map(l=>[l.id,l.name])),r=new Map(S.costCenters.map(l=>[l.id,l.name])),i=new Map(S.establishments.map(l=>[l.id,l])),n=t?"receivable":"payable",d=t?"text-emerald-600":"text-red-600";e.innerHTML=s.map(l=>{const c=Wo(l.dueDate),u=l.status==="paid",m=Ke(l.dueDate,l.status);let b="";u?b='<span class="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-check2-circle mr-0.5"></i> Baixado</span>':m?b='<span class="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-exclamation-circle mr-0.5"></i> Atrasado</span>':b='<span class="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-clock-history mr-0.5"></i> A Vencer</span>';const v=l.naturezaId?o.get(l.naturezaId)||"Sem Natureza":"Não Categorizado",k=l.centroDeCustoId?r.get(l.centroDeCustoId)||"Sem Centro":"Geral",P=l.saleId||l.appointmentId||l.origin==="comanda"?'<span class="text-[8px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100"><i class="bi bi-receipt mr-1"></i>Comanda</span>':'<span class="text-[8px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200"><i class="bi bi-keyboard mr-1"></i>Manual</span>',I=l.documentNumber?`<span class="text-[8px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded ml-2" title="NFS / Documento">NFS: ${l.documentNumber}</span>`:"",$=i.get(l.establishmentId);let h="";if($){const j=$.type==="Matriz"?"bi-building":"bi-shop";h=`<span class="text-[8px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-bold border border-slate-200 flex items-center whitespace-nowrap w-max" title="Unidade: ${$.name}"><i class="bi ${j} mr-1 opacity-60"></i> ${$.name}</span>`}else h='<span class="text-[8px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-bold border border-gray-200 flex items-center whitespace-nowrap w-max"><i class="bi bi-geo-alt mr-1 opacity-60"></i> Atual</span>';const f=JSON.stringify(l).replace(/'/g,"&apos;"),C=S.selectedIds.has(l.id),D=!!l.recurrenceId?'<i class="bi bi-arrow-repeat text-indigo-400 ml-1 text-[10px]" title="Lançamento Recorrente"></i>':"",T=l.entity?`<span class="text-[9px] text-gray-400 font-medium truncate block mt-0.5"><i class="bi bi-person mr-1 opacity-40"></i>${l.entity}</span>`:"";return`
        <div class="financial-row border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-1.5 md:p-2 mb-1 ${C?"bg-indigo-50/40":""}"
             data-type="${n}"
             data-item='${f}'>
            
            <div class="absolute left-0 top-0 bottom-0 w-1 ${u?"bg-gray-200":t?"bg-emerald-400":"bg-red-400"}"></div>

            <div class="absolute right-2 top-2 md:relative md:right-auto md:top-auto md:col-span-1 md:flex md:justify-center z-10">
                <input type="checkbox" value="${l.id}" class="item-checkbox w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${C?"checked":""}>
            </div>

            <div class="flex items-center gap-2 md:col-span-1 pl-2 md:pl-0">
                <div class="flex flex-col items-center justify-center bg-white border border-gray-200 rounded w-9 h-9 flex-shrink-0 shadow-sm">
                    <span class="text-xs font-black text-gray-800 leading-none">${c.day}</span>
                    <span class="text-[7px] font-bold text-gray-400 uppercase leading-none mt-0.5">${c.month}</span>
                </div>
                <div class="md:hidden flex-1 pr-6">
                    <div class="flex items-center">
                        <p class="font-bold text-xs text-gray-800 leading-tight ${u?"line-through text-gray-400":""}">${l.description}</p>
                        ${I}
                    </div>
                    ${T}
                </div>
            </div>

            <div class="md:col-span-3 hidden md:flex flex-col justify-center min-w-0">
                <div class="flex items-center">
                    <p class="font-bold text-xs text-gray-800 truncate ${u?"line-through text-gray-400":""}" title="${l.description}">${l.description}</p>
                    ${I}
                </div>
                ${T}
                <div class="flex items-center gap-1.5 mt-0.5">
                    ${h}
                    ${D}
                </div>
            </div>

            <div class="md:col-span-2 hidden md:flex flex-col justify-center min-w-0">
                <p class="text-[9px] text-gray-600 font-bold truncate" title="Natureza: ${v}"><i class="bi bi-tag opacity-50 mr-1"></i> ${v}</p>
                <p class="text-[9px] text-gray-400 truncate mt-0.5" title="Centro: ${k}"><i class="bi bi-diagram-3 opacity-50 mr-1"></i> ${k}</p>
            </div>

            <div class="md:col-span-1 hidden md:flex items-center">
                ${P}
            </div>

            <div class="md:hidden flex flex-wrap items-center gap-1.5 mt-1 ml-11">
                ${h}
                <span class="text-[8px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 font-bold border border-gray-200 flex items-center">
                    <i class="bi bi-tag mr-1 opacity-50"></i> ${v}
                </span>
                ${P}
            </div>

            <div class="md:col-span-1 md:text-center flex justify-start md:justify-center mt-1.5 md:mt-0 ml-11 md:ml-0">
                ${b}
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
        `}).join("")}async function Ld(e,t){const a=new Date().toISOString().split("T")[0];try{await(e==="payable"?En(t,a):Dn(t,a)),g("Baixa Realizada","O lançamento foi registado como pago.","success"),await Be()}catch(s){g("Erro",s.message,"error")}}async function Cd(e,t){if(!!!t.recurrenceId){await J("Excluir Lançamento","Tem certeza? Essa ação apagará o registo do seu fluxo de caixa.")&&await Yo(e,[t.id]);return}Dd(e,t)}function Dd(e,t){const a=document.getElementById("genericModal"),o=(e==="payable"?S.payables:S.receivables).filter(l=>l.recurrenceId===t.recurrenceId).sort((l,c)=>new Date(l.dueDate)-new Date(c.dueDate));a.innerHTML=`
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
                ${o.map(l=>{const c=l.id===t.id,u=l.status==="paid",m=Wo(l.dueDate);return`
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
    `,a.style.display="flex";const r=a.querySelector("#modal-select-all"),i=a.querySelectorAll(".modal-item-checkbox"),n=a.querySelector("#confirm-batch-delete");r.addEventListener("change",l=>{i.forEach(c=>c.checked=l.target.checked),d()}),i.forEach(l=>l.addEventListener("change",d));function d(){const l=Array.from(i).filter(c=>c.checked).length;n.innerHTML=l>0?`<i class="bi bi-trash3"></i> Excluir ${l} Parcela(s)`:"Selecione para excluir",n.disabled=l===0,l===0?n.classList.add("opacity-50","cursor-not-allowed","bg-gray-400"):n.classList.remove("opacity-50","cursor-not-allowed","bg-gray-400")}n.addEventListener("click",async()=>{const l=Array.from(i).filter(u=>u.checked).map(u=>u.value);if(l.length===0)return;a.style.display="none",await J("Confirmar Ação",`Tem certeza que deseja apagar estas ${l.length} parcelas permanentemente?`)&&await Yo(e,l)}),d()}async function Yo(e,t){try{t.length===1?e==="payable"?await $n(t[0]):await Cn(t[0]):await Do(e==="payable"?"payables":"receivables",t),g("Sucesso",`${t.length} registo(s) limpo(s) do sistema.`,"success"),S.selectedIds.clear(),Ve(),await Be()}catch(a){g("Erro",a.message,"error")}}async function Td(e,t){const s=e==="nature"?vn:wn;if(await J("Apagar Categoria","Tem certeza? Apagar um item pai também apagará as suas subcategorias."))try{await s(t),Ra(e==="nature"?"nature":"cost-center")}catch(r){g("Erro",r.message,"error")}}function Pd(){const e=document.getElementById("genericModal");e.innerHTML=`
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
    `,e.style.display="flex"}function va(e,t=null){const a=document.getElementById("genericModal"),s=e==="payable",o=s?"red":"emerald",r=t?"Editar Lançamento":"Novo Lançamento",i=S.establishments.map(f=>{const C=t?t.establishmentId===f.id:f.id===p.establishmentId;return`<option value="${f.id}" ${C?"selected":""}>${f.type==="Matriz"?"🏢":"📍"} ${f.name}</option>`}).join(""),n=(f,C)=>{let q='<option value="">-- Selecione --</option>';const D=is(f),T=(j,F=0)=>{const z="  ".repeat(F)+(F>0?"↳ ":""),H=j.id===C?"selected":"";q+=`<option value="${j.id}" ${H}>${z}${j.name}</option>`,j.children.forEach(B=>T(B,F+1))};return D.forEach(j=>T(j)),q},l=[{value:"dinheiro",label:"Dinheiro"},{value:"pix",label:"PIX"},{value:"cartao_credito",label:"Cartão de Crédito"},{value:"cartao_debito",label:"Cartão de Débito"},{value:"transferencia",label:"Transferência Bancária"},{value:"boleto",label:"Boleto"},{value:"outros",label:"Outros"}].map(f=>`<option value="${f.value}" ${t?.paymentMethod===f.value?"selected":""}>${f.label}</option>`).join("");a.innerHTML=`
        <div class="modal-content max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden m-4 flex flex-col max-h-[90vh]">
            
            <div class="bg-${o}-600 px-5 py-4 flex justify-between items-center flex-shrink-0 relative overflow-hidden">
                <div class="absolute right-0 top-0 opacity-10 pointer-events-none">
                    <svg width="120" height="120" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="white" stroke-width="20"/></svg>
                </div>
                
                <div class="flex items-center gap-3 relative z-10">
                    <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white backdrop-blur-sm border border-white/30 shadow-inner">
                        <i class="bi ${s?"bi-arrow-down-right":"bi-arrow-up-right"} text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-lg font-bold text-white tracking-wide">${r}</h2>
                        <p class="text-[10px] text-${o}-100 font-medium uppercase tracking-widest mt-0.5">${s?"Despesa":"Receita"}</p>
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
                            <select name="establishmentId" required class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none text-xs font-bold text-gray-800 transition-shadow">
                                ${i}
                            </select>
                        </div>

                        <div class="md:col-span-1">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Valor Total (R$)</label>
                            <div class="relative">
                                <input type="number" step="0.01" name="amount" required 
                                    class="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none font-bold text-sm text-gray-900 transition-shadow" 
                                    value="${t?.amount||""}" placeholder="0.00">
                            </div>
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Data de Vencimento</label>
                            <input type="date" name="dueDate" required 
                                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none font-bold text-gray-800 text-xs transition-shadow" 
                                value="${t?.dueDate||new Date().toISOString().split("T")[0]}">
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Descrição / Título</label>
                            <input type="text" name="description" required 
                                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none font-bold text-gray-800 text-xs transition-shadow" 
                                value="${t?.description||""}" placeholder="Ex: Compra de Estoque...">
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">${s?"Fornecedor / Favorecido":"Cliente / Pagador"}</label>
                            <div class="relative">
                                <i class="bi bi-person absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input type="text" name="entity" 
                                    class="w-full pl-8 pr-3 p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none text-xs text-gray-800 transition-shadow" 
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
                            <select name="naturezaId" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none text-xs font-medium text-gray-700 transition-shadow">
                                ${n(S.natures,t?.naturezaId)}
                            </select>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Centro de Custo</label>
                            <select name="centroDeCustoId" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none text-xs font-medium text-gray-700 transition-shadow">
                                ${n(S.costCenters,t?.centroDeCustoId)}
                            </select>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Forma de Pagamento</label>
                            <select name="paymentMethod" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none text-xs font-medium text-gray-700 transition-shadow">
                                <option value="">-- Selecione --</option>
                                ${l}
                            </select>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="md:col-span-1">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nº do Documento / NFS</label>
                            <input type="text" name="documentNumber" 
                                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none text-xs text-gray-800 transition-shadow" 
                                value="${t?.documentNumber||""}" placeholder="Ex: NF-12345">
                        </div>
                        <div class="md:col-span-1">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Observações</label>
                            <textarea name="notes" rows="1" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none text-xs text-gray-700 font-medium resize-none transition-shadow">${t?.notes||""}</textarea>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <div class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="status" id="status-toggle" class="sr-only peer" ${t?.status==="paid"?"checked":""}>
                                <div class="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-${o}-500 shadow-inner"></div>
                            </div>
                            <div>
                                <span class="block text-xs font-bold text-gray-800 group-hover:text-${o}-700 transition-colors uppercase tracking-wide">Marcar como ${s?"Pago":"Recebido"}</span>
                                <span class="block text-[9px] text-gray-400 font-medium mt-0.5">Retira a transação do status de pendente.</span>
                            </div>
                        </label>
                        
                        <div id="payment-date-wrapper" class="${t?.status==="paid"?"":"hidden"} flex-1 md:max-w-[220px] animate-fade-in border-l md:border-l border-gray-100 pl-0 md:pl-4 pt-3 md:pt-0 mt-3 md:mt-0">
                            <label class="block text-[10px] font-bold text-${o}-600 uppercase tracking-widest mb-1.5">Data da Baixa Bancária</label>
                            <input type="date" name="paymentDate" 
                                class="w-full p-2 bg-${o}-50 border border-${o}-200 text-${o}-800 rounded-lg text-xs font-bold outline-none focus:ring-1 focus:ring-${o}-500 shadow-sm transition-shadow" 
                                value="${t?.paymentDate||new Date().toISOString().split("T")[0]}">
                        </div>
                    </div>
                </div>

                <div class="p-5 border-t border-gray-200 bg-white flex flex-col-reverse md:flex-row gap-3 flex-shrink-0 z-10 relative shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                    <button type="button" data-action="close-modal" class="w-full md:w-auto py-2.5 px-5 bg-gray-100 text-gray-700 font-bold uppercase tracking-wider text-[10px] rounded-lg hover:bg-gray-200 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" class="w-full flex-1 py-2.5 px-5 bg-${o}-600 text-white font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-${o}-700 shadow-md shadow-${o}-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <i class="bi bi-save2"></i> <span>${t?"Salvar Alterações":"Confirmar Lançamento"}</span>
                    </button>
                </div>
            </form>
        </div>`,a.style.display="flex";const c=a.querySelector("#financial-form");let u="single",m=2;const b=c.querySelector('[name="amount"]'),v=c.querySelector("#recurrence-options"),k=c.querySelector("#recurrence-summary"),x=c.querySelector("#installments-input"),P=c.querySelector("#status-toggle"),I=c.querySelector("#payment-date-wrapper"),$=c.querySelector('[name="paymentDate"]'),h=()=>{if(u==="single")return;const f=parseFloat(b.value)||0;if(m=parseInt(x.value)||2,f===0){k.innerHTML='<span class="text-[10px] text-indigo-400 font-medium">Digite o valor total...</span>';return}if(u==="installment"){const C=f/m;k.innerHTML=`
                <div>
                    <span class="block text-[9px] text-indigo-400 uppercase tracking-widest font-bold mb-0.5">Simulação do Parcelamento</span>
                    <span class="font-bold text-sm text-indigo-700 block leading-tight">${m}x de ${ue(C)}</span>
                    <span class="text-[10px] text-indigo-500 font-medium">Total: ${ue(f)}</span>
                </div>
            `}else if(u==="repeat"){const C=f*m;k.innerHTML=`
                <div>
                    <span class="block text-[9px] text-indigo-400 uppercase tracking-widest font-bold mb-0.5">Geração Recorrente Fixa</span>
                    <span class="font-bold text-sm text-indigo-700 block leading-tight">${m}x de ${ue(f)}</span>
                    <span class="text-[10px] text-indigo-500 font-medium">Lançamento Total: ${ue(C)}</span>
                </div>
            `}};c.addEventListener("click",f=>{const C=f.target.closest(".mode-btn");if(C&&!t)if(f.preventDefault(),c.querySelectorAll(".mode-btn").forEach(T=>{T.classList.remove("bg-gray-900","text-white","shadow-sm"),T.classList.add("text-gray-500","hover:bg-gray-100")}),C.classList.add("bg-gray-900","text-white","shadow-sm"),C.classList.remove("text-gray-500","hover:bg-gray-100"),u=C.dataset.mode,u==="single")v.style.display="none";else{v.style.display="block";const T=v.querySelector("#recurrence-label");T&&(T.textContent=u==="installment"?"Número de Parcelas":"Repetir por quantos meses?"),h()}if(f.target.closest("#btn-minus")&&x){f.preventDefault();let T=parseInt(x.value)||2;T>2&&(x.value=T-1,h())}if(f.target.closest("#btn-plus")&&x){f.preventDefault();let T=parseInt(x.value)||2;T<60&&(x.value=T+1,h())}}),b.addEventListener("input",h),x&&x.addEventListener("input",h),P.addEventListener("change",()=>{P.checked?(I.classList.remove("hidden"),$.required=!0):(I.classList.add("hidden"),$.required=!1)}),c.addEventListener("submit",async f=>{f.preventDefault();const C=c.querySelector('button[type="submit"]'),q=C.innerHTML;C.disabled=!0,C.innerHTML='<div class="loader-small border-white"></div> A gravar...';const D=new FormData(c),T=P.checked,j=parseFloat(D.get("amount"));let F=j,z=1;!t&&u!=="single"&&(z=parseInt(D.get("installments")),u==="repeat"&&(F=j*z));const H={establishmentId:D.get("establishmentId"),description:D.get("description"),amount:F,dueDate:D.get("dueDate"),naturezaId:D.get("naturezaId")||null,centroDeCustoId:D.get("centroDeCustoId")||null,entity:D.get("entity")||null,paymentMethod:D.get("paymentMethod")||null,documentNumber:D.get("documentNumber")||null,notes:D.get("notes"),status:T?"paid":"pending",paymentDate:T?D.get("paymentDate"):null,installments:z};z>1&&!t&&(H.recurrenceId=self.crypto.randomUUID());try{t?(await(s?Sn(t.id,H):Ln(t.id,H)),g("Sucesso","Atualizado com sucesso!","success")):(await(s?kn(H):In(H)),g("Sucesso","Lançamento criado!","success")),document.getElementById("genericModal").style.display="none",Be()}catch(B){g("Erro",B.message||"Erro ao salvar","error"),C.disabled=!1,C.innerHTML=q}})}const Bd=e=>L("/api/commissions/calculate",{method:"POST",body:JSON.stringify(e)}),Md=e=>L("/api/commissions/save",{method:"POST",body:JSON.stringify(e)}),Ad=(e,t)=>{const a=new URLSearchParams({startDate:e,endDate:t}).toString();return L(`/api/commissions/stats?${a}`)},qd=(e={})=>{Object.keys(e).forEach(s=>(e[s]===void 0||e[s]===null||e[s]==="")&&delete e[s]);const t=new URLSearchParams(e).toString(),a=`/api/commissions/history${t?"?"+t:""}`;return L(a)},Zo=e=>L(`/api/commissions/report/${e}`,{method:"DELETE"}),Fa=new Date,Nd=new Date(Fa.getFullYear(),Fa.getMonth(),1);let A={professionals:[],reports:[],calculationResult:null,periodString:"",establishments:[],filterEstablishmentIds:new Set,selectedIds:new Set,startDate:Nd.toISOString().split("T")[0],endDate:Fa.toISOString().split("T")[0],professionalId:"all",searchQuery:"",stats:{revenue:0,commissions:0,margin:0,netPaid:0}},Ft=null;const jd=document.getElementById("content");function ht(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e||0)}function Rd(e){return e?new Date(e).toLocaleDateString("pt-BR"):"--/--/----"}function Kt(e){if(!e)return"PR";const t=e.trim().split(" ");return t.length>=2?(t[0][0]+t[t.length-1][0]).toUpperCase():e.substring(0,2).toUpperCase()}async function Fd(){try{const[e,t]=await Promise.all([ge(p.establishmentId),ve().catch(()=>({matrizes:[]}))]);A.professionals=e;const a=t.matrizes||[];A.establishments=[],a.forEach(s=>{A.establishments.push({id:s.id,name:s.name,type:"Matriz"}),s.branches&&s.branches.forEach(o=>A.establishments.push({id:o.id,name:o.name,type:"Filial"}))}),A.filterEstablishmentIds.size===0&&A.filterEstablishmentIds.add(p.establishmentId)}catch(e){console.error("Erro na inicialização de comissões",e)}Hd(),zd(),await et()}function Hd(){const e=A.professionals.map(a=>`<option value="${a.id}">${a.name}</option>`).join(""),t=A.establishments.map(a=>`
        <label class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border ${A.filterEstablishmentIds.has(a.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-slate-200 text-slate-600"} rounded-lg cursor-pointer hover:bg-slate-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${a.id}" ${A.filterEstablishmentIds.has(a.id)?"checked":""}>
            <span class="text-[10px] font-bold whitespace-nowrap">${a.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${a.name}</span>
        </label>
    `).join("");jd.innerHTML=`
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

            ${A.establishments.length>1?`
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
                        <input type="date" id="filter-start" value="${A.startDate}" class="py-1 px-2 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-700 outline-none focus:border-indigo-400">
                        <span class="text-slate-400 text-xs">até</span>
                        <input type="date" id="filter-end" value="${A.endDate}" class="py-1 px-2 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-700 outline-none focus:border-indigo-400">
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
    `}async function et(){const e=document.getElementById("list-container");e.innerHTML='<div class="flex justify-center py-20"><div class="loader"></div></div>';const t=Array.from(A.filterEstablishmentIds).join(",");try{const[a,s]=await Promise.all([qd({startDate:A.startDate,endDate:A.endDate,professionalId:A.professionalId,establishmentId:t}),Ad(A.startDate,A.endDate,t)]);A.reports=a||[];const o=A.reports.reduce((r,i)=>r+(i.summary.finalValue||i.summary.totalCommission),0);A.stats={revenue:s.totalRevenue||0,commissions:s.totalCommissionsPaid||0,margin:s.totalRevenue>0?((s.totalRevenue-s.totalCommissionsPaid)/s.totalRevenue*100).toFixed(1):0,netPaid:o},A.selectedIds.clear(),vt(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),Od(),Ko()}catch(a){console.error(a),e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-slate-600 text-xs font-medium">Erro ao carregar dados.</p>
            </div>`}}function Od(){document.getElementById("kpi-revenue").textContent=ht(A.stats.revenue),document.getElementById("kpi-commissions").textContent=ht(A.stats.commissions),document.getElementById("kpi-margin").textContent=`${A.stats.margin}%`,document.getElementById("kpi-net").textContent=ht(A.stats.netPaid)}function Ko(){const e=document.getElementById("list-container");let t=A.reports;if(A.searchQuery){const a=A.searchQuery.toLowerCase();t=t.filter(s=>s.professionalName.toLowerCase().includes(a)||s.period.toLowerCase().includes(a))}if(t.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 text-center">
                <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-receipt text-xl text-slate-300"></i>
                </div>
                <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhum pagamento encontrado</h3>
                <p class="text-[10px] text-slate-400 max-w-xs">Não há relatórios gerados para este período ou profissional.</p>
            </div>
        `;return}e.innerHTML=t.map(a=>{const s=Rd(a.createdAt),o=a.summary.totalCommission,r=a.summary.extraDebit||0,i=a.summary.extraCredit||0,n=a.summary.finalValue||o,d=A.selectedIds.has(a.id);let l="";return r>0&&i>0?l=`<span class="text-red-500">-R$${r.toFixed(2)}</span> / <span class="text-emerald-500">+R$${i.toFixed(2)}</span>`:r>0?l=`<span class="text-red-500">-R$ ${r.toFixed(2)}</span>`:i>0?l=`<span class="text-emerald-500">+R$ ${i.toFixed(2)}</span>`:l='<span class="text-slate-300">--</span>',`
        <div class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-2.5 md:px-3 md:py-2 mb-2 md:mb-0 bg-white md:bg-transparent rounded-xl md:rounded-none shadow-sm md:shadow-none border md:border-b ${d?"bg-indigo-50/40":""}">
            
            <div class="absolute right-2 top-2 md:relative md:right-auto md:top-auto md:col-span-3 md:flex md:items-center md:gap-2 z-10">
                <input type="checkbox" value="${a.id}" class="item-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${d?"checked":""}>
                <div class="hidden md:flex items-center gap-2 pr-2">
                    <div class="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                        ${Kt(a.professionalName)}
                    </div>
                    <div class="min-w-0">
                        <p class="font-bold text-xs text-slate-800 truncate" title="${a.professionalName}">${a.professionalName}</p>
                        <p class="text-[9px] text-slate-400 font-medium truncate mt-0.5">Gerado: ${s}</p>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-2 md:hidden mb-2 pr-8">
                <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    ${Kt(a.professionalName)}
                </div>
                <div class="min-w-0">
                    <p class="font-bold text-xs text-slate-800 truncate">${a.professionalName}</p>
                    <p class="text-[9px] text-slate-400 font-medium truncate mt-0.5">Gerado: ${s}</p>
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
                <span class="text-xs font-bold text-slate-700">${ht(o)}</span>
            </div>
            
            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-1 md:mb-0 ml-10 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ajustes:</span>
                <span class="text-[10px] font-bold">${l}</span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block pt-1 md:pt-0 border-t md:border-0 border-slate-100 ml-10 md:ml-0 mt-1 md:mt-0">
                <span class="md:hidden text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Líquido Pago:</span>
                <span class="text-xs font-black text-emerald-600">${ht(n)}</span>
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
        `}).join("")}function zd(){Ft&&document.body.removeEventListener("click",Ft),Ft=o=>{const r=o.target;if(r.classList.contains("item-checkbox")){const n=r.value;r.checked?A.selectedIds.add(n):A.selectedIds.delete(n),vt(),o.stopPropagation();return}const i=r.closest("button[data-action]");if(i){const n=i.dataset.action,d=i.dataset.id;switch(n){case"apply-filters":A.startDate=document.getElementById("filter-start").value,A.endDate=document.getElementById("filter-end").value,A.professionalId=document.getElementById("filter-prof").value,et();break;case"new-calculation":Vd();break;case"print-receipt":Yd(d);break;case"delete-report":Kd(d);break;case"view-report-details":Qd(d);break;case"toggle-all-profs":const l=document.querySelectorAll(".prof-checkbox"),c=Array.from(l).every(v=>v.checked);l.forEach(v=>v.checked=!c);break;case"calculate-preview":_d();break;case"save-final-reports":Gd();break;case"toggle-preview-details":const u=i.dataset.idx,m=document.getElementById(`preview-details-${u}`),b=i.querySelector("i");m&&(m.classList.contains("hidden")?(m.classList.remove("hidden"),b&&b.classList.replace("bi-chevron-down","bi-chevron-up")):(m.classList.add("hidden"),b&&b.classList.replace("bi-chevron-up","bi-chevron-down")));break}}},document.body.addEventListener("click",Ft),document.getElementById("search-input").addEventListener("input",o=>{A.searchQuery=o.target.value,Ko()}),document.body.addEventListener("input",o=>{(o.target.classList.contains("input-debit")||o.target.classList.contains("input-credit")||o.target.classList.contains("input-notes"))&&Wd(o.target.dataset.idx)});const e=document.getElementById("select-all-toggle");e&&e.addEventListener("change",o=>{const r=o.target.checked,i=document.querySelectorAll(".item-checkbox");A.selectedIds.clear(),i.forEach(n=>{n.checked=r,r&&A.selectedIds.add(n.value)}),vt()});const t=document.getElementById("cancel-selection-btn");t&&t.addEventListener("click",()=>{A.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(o=>o.checked=!1),vt()});const a=document.getElementById("batch-delete-btn");a&&a.addEventListener("click",Zd),document.querySelectorAll(".est-filter-checkbox").forEach(o=>{o.addEventListener("change",r=>{const i=r.target.closest("label");r.target.checked?(A.filterEstablishmentIds.add(r.target.value),i.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.remove("border-slate-200","text-slate-600")):(A.filterEstablishmentIds.delete(r.target.value),i.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.add("border-slate-200","text-slate-600")),et()})});const s=document.getElementById("export-excel-btn");s&&s.addEventListener("click",Xd)}function vt(){const e=document.getElementById("batch-action-bar"),t=document.getElementById("selected-count"),a=A.selectedIds.size;t&&(t.textContent=a),e&&(a>0?(e.classList.remove("hidden"),e.classList.add("flex")):(e.classList.add("hidden"),e.classList.remove("flex")))}function Vd(){const e=new Date().toISOString().split("T")[0],t=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],a=A.professionals.map(o=>`
        <label class="flex items-center p-2.5 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-indigo-300 transition-all cursor-pointer group">
            <input type="checkbox" value="${o.id}" class="prof-checkbox w-3.5 h-3.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500">
            <div class="ml-2 flex items-center gap-2">
                <div class="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[9px] font-bold group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">${Kt(o.name)}</div>
                <span class="font-bold text-xs text-slate-700">${o.name}</span>
            </div>
        </label>`).join(""),s=`
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
    `;ie({title:"Nova Apuração de Comissões",contentHTML:s,maxWidth:"max-w-2xl"})}async function _d(){const e=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(l=>l.value);if(e.length===0)return g("Atenção","Selecione pelo menos um profissional.","warning");const t=Array.from(A.filterEstablishmentIds).join(","),a=document.getElementById("calc-start-date"),s=document.getElementById("calc-end-date");if(!a||!s||!a.value||!s.value)return g("Atenção","As datas de início e fim são obrigatórias.","warning");const o={professionalIds:e,startDate:a.value,endDate:s.value,establishmentId:t,calculationTypes:{services:document.getElementById("calc-type-services")?.checked||!1,products:document.getElementById("calc-type-products")?.checked||!1,packages:document.getElementById("calc-type-packages")?.checked||!1}},r=new Date(o.startDate+"T00:00:00").toLocaleDateString("pt-BR"),i=new Date(o.endDate+"T00:00:00").toLocaleDateString("pt-BR");A.periodString=`${r} a ${i}`;const n=document.getElementById("btn-calc-action"),d=n.innerHTML;n.innerHTML='<div class="loader-small border-white mr-1"></div> Processando...',n.disabled=!0;try{console.log("Enviando cálculo...",o);const l=await Bd(o);A.calculationResult=l.map(c=>({...c,extraDebit:0,extraCredit:0,finalValue:c.summary.totalCommission,notes:""})),Ud()}catch(l){g("Erro na Apuração",l.message,"error"),n.innerHTML=d,n.disabled=!1}}function Ud(){const e=A.calculationResult;if(!e||e.length===0||e.every(i=>i.summary.totalCommission===0)){g("Aviso","Nenhuma comissão encontrada para os filtros selecionados.","info");const i=document.getElementById("btn-calc-action");i.innerHTML='<i class="bi bi-lightning-charge"></i> Calcular Vendas',i.disabled=!1;return}const t=document.getElementById("calc-step-1"),a=document.getElementById("calc-step-2"),s=document.getElementById("btn-calc-action");t&&t.classList.add("hidden"),a&&a.classList.remove("hidden"),s&&(s.dataset.action="save-final-reports",s.className="py-2 px-5 bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-emerald-700 shadow-sm transition-all flex items-center gap-2",s.innerHTML='<i class="bi bi-check2-circle text-sm"></i> Confirmar Pagamentos',s.disabled=!1);const o=e.reduce((i,n)=>i+n.finalValue,0),r=e.map((i,n)=>{if(i.summary.totalCommission===0)return"";const d=(i.items||[]).map(c=>`
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
                <span id="grand-total-preview" class="text-lg font-black drop-shadow-md">R$ ${o.toFixed(2)}</span>
            </div>
            <div class="text-right">
                <span class="block text-[9px] font-bold text-indigo-200 uppercase tracking-widest mb-0.5">Período</span>
                <span class="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded border border-white/20">${A.periodString}</span>
            </div>
        </div>
        ${r}
    `)}function Wd(e){const t=document.querySelector(`.input-debit[data-idx="${e}"]`),a=document.querySelector(`.input-credit[data-idx="${e}"]`),s=document.querySelector(`.input-notes[data-idx="${e}"]`);let o=parseFloat(t?.value)||0,r=parseFloat(a?.value)||0,i=s?.value||"";if(A.calculationResult&&A.calculationResult[e]){const n=A.calculationResult[e];n.extraDebit=o,n.extraCredit=r,n.notes=i,n.finalValue=n.summary.totalCommission-o+r;const d=document.querySelector(`.final-value-display[data-idx="${e}"]`);d&&(d.innerText=`R$ ${n.finalValue.toFixed(2)}`),Jd()}}function Jd(){const e=A.calculationResult.reduce((a,s)=>a+s.finalValue,0),t=document.getElementById("grand-total-preview");t&&(t.innerText=`R$ ${e.toFixed(2)}`)}async function Gd(){const e=A.calculationResult.filter(o=>o.summary.totalCommission>0),t=e.length;if(t===0)return g("Aviso","Não há valores para pagar.","info");if(!await J("Confirmar Pagamentos",`Você está prestes a gerar recibos e marcar as vendas de ${t} profissional(is) como PAGAS. Confirmar?`))return;const s=document.getElementById("btn-calc-action");s.innerHTML='<div class="loader-small border-white mr-1"></div> Finalizando...',s.disabled=!0;try{const o=e.map(r=>{const i=(r.items||[]).map(n=>n.originalSaleId).filter(n=>n!=null);return Md({professionalId:r.professionalId,professionalName:r.professionalName,period:A.periodString,processedSalesIds:i,establishmentId:p.establishmentId,reportData:{...r,summary:{...r.summary,finalValue:r.finalValue,extraDebit:r.extraDebit||0,extraCredit:r.extraCredit||0,notes:r.notes||""}}})});await Promise.all(o),g("Sucesso","Pagamentos registrados e vendas baixadas!","success"),A.calculationResult=null,document.getElementById("genericModal").style.display="none",await et()}catch(o){g("Erro ao Salvar",o.message,"error"),s.innerHTML='<i class="bi bi-check2-circle text-sm"></i> Confirmar Pagamentos',s.disabled=!1}}function Qd(e){const t=A.reports.find(c=>c.id===e);if(!t)return;const a=t.reportData?.items||t.items||[],s=t.summary,o=s.extraDebit||0,r=s.extraCredit||0,i=s.notes||"",n=a.map(c=>`
        <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
            <td class="py-2.5 px-3 text-slate-700 font-medium whitespace-normal min-w-[150px]">${c.item}</td>
            <td class="py-2.5 px-3 text-slate-500">${c.client||"--"}</td>
            <td class="py-2.5 px-3 text-right text-slate-600">R$ ${(c.value||0).toFixed(2)}</td>
            <td class="py-2.5 px-3 text-center text-slate-600">${c.commissionRate}%</td>
            <td class="py-2.5 px-3 text-right font-bold text-emerald-600">R$ ${(c.commissionValue||0).toFixed(2)}</td>
        </tr>
    `).join("");let d="";(o>0||r>0||i)&&(d=`
            <div class="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h5 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3"><i class="bi bi-sliders mr-1"></i> Ajustes Aplicados</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    ${o>0?`<div class="text-sm bg-white p-2 rounded-lg border border-slate-100 shadow-sm"><span class="text-slate-500 block text-[10px] uppercase font-bold">Descontos/Vales:</span> <span class="font-black text-red-500">-R$ ${o.toFixed(2)}</span></div>`:""}
                    ${r>0?`<div class="text-sm bg-white p-2 rounded-lg border border-slate-100 shadow-sm"><span class="text-slate-500 block text-[10px] uppercase font-bold">Bônus Extras:</span> <span class="font-black text-emerald-500">+R$ ${r.toFixed(2)}</span></div>`:""}
                </div>
                ${i?`<div class="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-100 shadow-sm"><strong class="block text-[10px] uppercase text-slate-400 mb-1">Motivo do Ajuste:</strong> ${i}</div>`:""}
            </div>
        `);const l=`
        <div class="max-h-[75vh] overflow-y-auto custom-scrollbar p-1">
            <div class="flex flex-col md:flex-row justify-between md:items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-4 gap-3">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm border border-indigo-100">
                        ${Kt(t.professionalName)}
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
                    <span class="font-black text-slate-700">R$ ${(s.totalCommission||0).toFixed(2)}</span>
                </div>
            </div>
            
            ${d}

            <div class="mt-4 flex justify-between items-center bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
                <span class="text-xs font-black text-emerald-600 uppercase tracking-widest"><i class="bi bi-check-circle-fill mr-1"></i> Total Líquido Pago</span>
                <span class="text-2xl font-black text-emerald-700">R$ ${(s.finalValue||s.totalCommission).toFixed(2)}</span>
            </div>
        </div>
    `;ie({title:"Detalhes do Pagamento",contentHTML:l,maxWidth:"max-w-3xl"})}function Xd(){if(A.reports.length===0){g("Aviso","Não há dados para exportar com os filtros atuais.","info");return}let e=A.reports;if(A.searchQuery){const a=A.searchQuery.toLowerCase();e=e.filter(s=>s.professionalName.toLowerCase().includes(a)||s.period.toLowerCase().includes(a))}const t=e.map(a=>{const s=a.summary.totalCommission,o=a.summary.extraDebit||0,r=a.summary.extraCredit||0,i=a.summary.finalValue||s;return{"Data da Apuração":new Date(a.createdAt).toLocaleDateString("pt-BR"),Profissional:a.professionalName,"Período Base":a.period,"Itens Calculados":a.summary.totalItems||0,"Valor Bruto (R$)":s,"Bônus (R$)":r,"Descontos (R$)":o,"Líquido Pago (R$)":i,"Observações/Motivo":a.summary.notes||""}});try{if(typeof XLSX>"u"){g("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const a=XLSX.utils.json_to_sheet(t),s=XLSX.utils.book_new();XLSX.utils.book_append_sheet(s,a,"Comissoes");const o=`Relatorio_Comissoes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(s,o)}catch(a){console.error(a),g("Erro","Falha ao exportar Excel.","error")}}function Yd(e){const t=A.reports.find(c=>c.id===e);if(!t)return;if(!window.jspdf){g("Erro","A biblioteca de PDF não foi carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a;s.setFillColor(79,70,229),s.rect(0,0,210,40,"F"),s.setTextColor(255,255,255),s.setFontSize(22),s.setFont(void 0,"bold"),s.text("RECIBO DE COMISSÕES",105,20,{align:"center"}),s.setFontSize(10),s.text(`Data de Emissão: ${new Date().toLocaleDateString("pt-BR")}`,105,28,{align:"center"}),s.setTextColor(50,50,50),s.setFontSize(11),s.setFont(void 0,"normal"),s.text("Profissional:",15,55),s.setFont(void 0,"bold"),s.text(t.professionalName,40,55),s.setFont(void 0,"normal"),s.text("Período:",130,55),s.setFont(void 0,"bold"),s.text(t.period,147,55);const o=t.reportData?.items||t.items||[];let r=70;if(o.length>0){const c=o.map(u=>[u.item||"Item",u.client||"--",`R$ ${(u.value||0).toFixed(2)}`,`${u.commissionRate||0}%`,`R$ ${(u.commissionValue||0).toFixed(2)}`]);s.autoTable({startY:r,head:[["Serviço/Produto","Cliente","Valor Base","Taxa","Comissão"]],body:c,theme:"striped",headStyles:{fillColor:[241,245,249],textColor:[71,85,105],fontStyle:"bold"},styles:{fontSize:8},columnStyles:{2:{halign:"right"},3:{halign:"center"},4:{halign:"right",fontStyle:"bold",textColor:[5,150,105]}}}),r=s.lastAutoTable.finalY+15}const i=t.summary,n=i.finalValue||i.totalCommission,d=[["Comissões Brutas (Soma dos Itens)",`R$ ${i.totalCommission.toFixed(2)}`]];i.extraCredit>0&&d.push(["(+) Bônus Extras",`R$ ${i.extraCredit.toFixed(2)}`]),i.extraDebit>0&&d.push(["(-) Descontos / Vales",`R$ ${i.extraDebit.toFixed(2)}`]),s.autoTable({startY:r,head:[["Resumo do Fechamento","Valor"]],body:d,theme:"grid",headStyles:{fillColor:[79,70,229],textColor:[255,255,255]},columnStyles:{1:{halign:"right",fontStyle:"bold"}}});const l=s.lastAutoTable.finalY+15;s.setFillColor(236,253,245),s.rect(120,l-8,75,15,"F"),s.setTextColor(5,150,105),s.setFontSize(14),s.setFont(void 0,"bold"),s.text(`Total Líquido: R$ ${n.toFixed(2)}`,190,l,{align:"right"}),i.notes&&(s.setTextColor(100,100,100),s.setFontSize(9),s.setFont(void 0,"normal"),s.text(`Obs/Motivo: ${i.notes}`,15,l+10)),s.setTextColor(150,150,150),s.setFontSize(9),s.line(20,l+40,90,l+40),s.text("Assinatura da Empresa",55,l+45,{align:"center"}),s.line(120,l+40,190,l+40),s.text("Assinatura do Profissional",155,l+45,{align:"center"}),s.save(`Recibo_Comissoes_${t.professionalName.replace(/\s+/g,"_")}.pdf`)}async function Zd(){const e=A.selectedIds.size;if(!(e===0||!await J("Excluir Recibos",`Deseja excluir e estornar ${e} recibo(s)? As vendas associadas voltarão ao status "A Apurar".`)))try{const a=Array.from(A.selectedIds).map(s=>Zo(s));await Promise.all(a),g("Sucesso",`${e} recibos excluídos com sucesso.`,"success"),A.selectedIds.clear(),vt(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),await et()}catch{g("Erro ao Excluir","Ocorreu um erro ao excluir alguns recibos.","error")}}async function Kd(e){if(await J("Excluir Recibo",'ATENÇÃO: Deseja realmente excluir este recibo? As vendas associadas a ele voltarão ao status "A Apurar" e o valor será subtraído dos relatórios. Esta ação não pode ser desfeita.'))try{await Zo(e),g("Sucesso","Recibo cancelado com sucesso. Vendas estornadas para apuração.","success"),await et()}catch(a){g("Erro ao Excluir",a.message,"error")}}const Ha=document.getElementById("content");let V={allPackages:[],catalogForModal:{services:[],products:[]},establishments:[],filterEstablishmentIds:new Set,searchQuery:"",statusFilter:"all"},Ht=null,_e=null;function Me(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e||0)}function ec(){const e=V.allPackages.length,t=V.allPackages.filter(r=>r.status!=="inactive"),a=t.length,s=a>0?t.reduce((r,i)=>r+(i.price||0),0)/a:0;let o=0;return t.forEach(r=>{const i=r.originalPrice||0,n=r.price||0;if(i>0&&i>n){const d=(i-n)/i*100;d>o&&(o=d)}}),{total:e,activeCount:a,avgPrice:s,maxDiscount:o}}async function tc(){try{const t=(await ve().catch(()=>({matrizes:[]}))).matrizes||[];V.establishments=[],t.forEach(a=>{V.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>V.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),V.filterEstablishmentIds.size===0&&V.filterEstablishmentIds.add(p.establishmentId)}catch(e){console.error("Erro ao buscar hierarquia de empresas",e)}ac(),ic(),await ea()}async function ea(){const e=document.getElementById("packagesListContainer");e&&(e.innerHTML='<div class="col-span-full flex justify-center py-20"><div class="loader"></div></div>');try{const t=Array.from(V.filterEstablishmentIds).map(i=>Za(i).catch(()=>[])),a=await Promise.all(t),s=new Map;a.flat().forEach(i=>{s.has(i.id)||s.set(i.id,i)}),V.allPackages=Array.from(s.values());const[o,r]=await Promise.all([Ae(p.establishmentId).catch(()=>[]),at(p.establishmentId).catch(()=>[])]);V.catalogForModal={services:(o||[]).filter(i=>i.active),products:r||[]},sc(),Oa()}catch(t){console.error(t),e&&(e.innerHTML=`
                <div class="col-span-full flex flex-col items-center justify-center py-16 text-slate-500">
                    <i class="bi bi-exclamation-triangle text-4xl text-red-400 mb-3"></i>
                    <p>Erro ao carregar os pacotes. Tente novamente.</p>
                </div>
            `)}}function ac(){const e=V.establishments.map(t=>`
        <label class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border ${V.filterEstablishmentIds.has(t.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-slate-200 text-slate-600"} rounded-lg cursor-pointer hover:bg-slate-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${t.id}" ${V.filterEstablishmentIds.has(t.id)?"checked":""}>
            <span class="text-[10px] font-bold whitespace-nowrap">${t.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${t.name}</span>
        </label>
    `).join("");Ha.innerHTML=`
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
    `}function sc(){const e=ec(),t=document.getElementById("kpi-container");t&&(t.innerHTML=`
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
            <span class="text-2xl font-black text-indigo-600 mt-1 z-10">${Me(e.avgPrice)}</span>
        </div>
    `)}function Oa(){const e=document.getElementById("packagesListContainer");if(!e)return;let t=V.allPackages;if(V.statusFilter!=="all"){const s=V.statusFilter==="active";t=t.filter(o=>o.status!=="inactive"===s)}if(V.searchQuery){const s=V.searchQuery.toLowerCase();t=t.filter(o=>o.name.toLowerCase().includes(s)||(o.description||"").toLowerCase().includes(s))}if(t.length===0){e.innerHTML=`
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
        `;return}const a=new Map(V.establishments.map(s=>[s.id,s]));e.innerHTML=t.map(s=>{const o=s.status!=="inactive",r=s.price||0,i=s.originalPrice||0,n=i>0&&i>r?(i-r)/i*100:0,d=w(s.name),l=w(s.description||"Nenhuma descrição detalhada."),c=JSON.stringify(s).replace(/'/g,"&apos;"),u=(s.items||[]).reduce((x,P)=>x+(P.quantity||1),0),m=s.validityDays?`${s.validityDays} dias p/ uso`:"Uso vitalício",b=s.sellEndDate?`Até ${new Date(s.sellEndDate).toLocaleDateString("pt-BR")}`:"Venda contínua",v=s.establishmentIds||(s.establishmentId?[s.establishmentId]:[]);let k="";if(v.length===1){const x=a.get(v[0]);if(x){const P=x.type==="Matriz"?"bi-building":"bi-shop";k=`<span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200 flex items-center w-max" title="${x.name}"><i class="bi ${P} mr-1 opacity-50"></i> ${x.name}</span>`}}else v.length>1&&(k=`<span class="text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 flex items-center w-max cursor-help" title="${v.map(P=>a.get(P)?.name).filter(Boolean).join(", ")}"><i class="bi bi-buildings mr-1 opacity-50"></i> ${v.length} Unidades</span>`);return`
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300 flex flex-col relative overflow-hidden group cursor-pointer"
                 data-action="edit-package" data-package='${c}'>
                
                ${n>0?`<div class="absolute -right-8 top-4 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider py-1 px-8 transform rotate-45 shadow-sm z-10">${n.toFixed(0)}% OFF</div>`:""}

                <div class="p-5 flex-grow">
                    <div class="flex justify-between items-start pr-8 mb-3">
                        <div class="flex flex-col gap-1.5">
                            <div class="flex items-center gap-2">
                                <span class="w-2.5 h-2.5 rounded-full ${o?"bg-emerald-500":"bg-slate-300"}"></span>
                                <span class="text-[10px] font-bold ${o?"text-emerald-600":"text-slate-500"} uppercase tracking-widest">${o?"Ativo":"Inativo"}</span>
                            </div>
                            ${k}
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
                            ${n>0?`<p class="text-[10px] text-slate-400 font-bold line-through mb-0.5">De ${Me(i)}</p>`:""}
                            <p class="text-2xl font-black text-slate-900 leading-none">${Me(r)}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-calendar-event mr-1"></i>${b}</p>
                        </div>
                    </div>
                </div>
                
                <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span class="text-[10px] font-bold text-indigo-600 flex items-center gap-1"><i class="bi bi-pencil-square"></i> Editar Pacote</span>
                    <button data-action="delete-package" data-id="${s.id}" data-action-stop-propagation="true" class="text-[10px] font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition-colors">
                        <i class="bi bi-trash3"></i> Excluir
                    </button>
                </div>
            </div>
        `}).join("")}function oc(){if(V.allPackages.length===0){g("Aviso","Não há pacotes carregados para exportar.","info");return}let e=V.allPackages;if(V.statusFilter!=="all"){const s=V.statusFilter==="active";e=e.filter(o=>o.status!=="inactive"===s)}if(V.searchQuery){const s=V.searchQuery.toLowerCase();e=e.filter(o=>o.name.toLowerCase().includes(s)||(o.description||"").toLowerCase().includes(s))}if(e.length===0){g("Aviso","Nenhum pacote corresponde aos filtros atuais.","info");return}const t=new Map(V.establishments.map(s=>[s.id,s.name])),a=e.map(s=>{const o=s.originalPrice||0,r=s.price||0,i=o>0?(o-r)/o*100:0,n=(s.items||[]).map(c=>`${c.quantity}x ${c.name}`).join(" | ");return{"Unidade(s)":(s.establishmentIds||(s.establishmentId?[s.establishmentId]:[])).map(c=>t.get(c)).filter(Boolean).join(", ")||"Não identificada","Nome do Pacote":s.name,Status:s.status!=="inactive"?"Ativo":"Inativo",Descrição:s.description||"","Itens Incluídos":n,"Valor Original (R$)":o,"Preço de Venda (R$)":r,"Desconto (%)":i.toFixed(1)+"%","Comissão (%)":s.commissionRate||0,"Validade de Uso (Dias)":s.validityDays||"Vitalício","Vendas Início":s.sellStartDate?new Date(s.sellStartDate).toLocaleDateString("pt-BR"):"-","Vendas Fim":s.sellEndDate?new Date(s.sellEndDate).toLocaleDateString("pt-BR"):"-"}});try{if(typeof XLSX>"u"){g("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const s=XLSX.utils.json_to_sheet(a),o=XLSX.utils.book_new();XLSX.utils.book_append_sheet(o,s,"Pacotes");const r=`Relatorio_Pacotes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(o,r)}catch(s){console.error(s),g("Erro","Falha ao exportar Excel.","error")}}function qs(){const e=document.getElementById("genericModal");e.style.display="none",_e&&e.removeEventListener("click",_e)}async function Ns(e=null){const t=document.getElementById("genericModal"),a=!!e,s=e?JSON.parse(JSON.stringify(e.items||[])):[],o=w(e?.name||""),r=w(e?.description||""),i=e?.price||"",n=e?.commissionRate||0,d=e?.validityDays||"",l=e?.sellStartDate?new Date(e.sellStartDate).toISOString().split("T")[0]:"",c=e?.sellEndDate?new Date(e.sellEndDate).toISOString().split("T")[0]:"",u=e?.salesLimit||"",m=e?.establishmentIds||(e?.establishmentId?[e.establishmentId]:[p.establishmentId]),b=V.establishments.map(h=>`
        <label class="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors cursor-pointer group">
            <input type="checkbox" class="modal-est-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4" value="${h.id}" ${m.includes(h.id)?"checked":""}>
            <span class="text-xs font-semibold text-slate-700 truncate group-hover:text-indigo-700" title="${h.name}">${h.type==="Matriz"?"🏢":"📍"} ${h.name}</span>
        </label>
    `).join(""),v=`
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
                                <input type="text" id="packageName" value="${o}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-800 text-sm" placeholder="Ex: Combo Verão, Especial Noivas..." required>
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
                                    ${b}
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
    `;t.innerHTML=v,t.style.display="flex";const k=t.querySelector("#package-items-list"),x=t.querySelector("#finalPrice"),P=t.querySelector("#discountIndicator"),I=h=>{const f=h.reduce((q,D)=>q+(D.price||0)*(D.quantity||1),0),C=parseFloat(x.value)||0;if(t.querySelector("#originalPrice").textContent=Me(f),f>0&&f>C&&C>0){const q=(f-C)/f*100;P.textContent=`${q.toFixed(0)}% OFF`,P.classList.remove("hidden")}else P.classList.add("hidden")},$=h=>{h.length===0?k.innerHTML=`
                <div class="text-center py-6 text-slate-400 flex flex-col items-center">
                    <i class="bi bi-inbox text-2xl mb-1 opacity-50"></i>
                    <p class="text-[10px] font-bold uppercase tracking-widest">Nenhum item adicionado</p>
                </div>`:k.innerHTML=h.map((f,C)=>{const q=f.type==="service",D=q?"bi-scissors":"bi-box",T=q?"bg-indigo-100 text-indigo-700 border-indigo-200":"bg-emerald-100 text-emerald-700 border-emerald-200";return`
                <div class="flex items-center justify-between bg-white p-2 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors animate-fade-in-fast">
                    <div class="flex items-center gap-3 min-w-0 flex-1">
                        <div class="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                            <span class="text-[8px] font-bold text-slate-400 uppercase leading-none mb-0.5">Qtd</span>
                            <input type="number" value="${f.quantity}" min="1" class="w-10 text-center bg-transparent text-sm font-black text-slate-700 outline-none quantity-input" data-index="${C}">
                        </div>
                        <div class="min-w-0">
                            <div class="flex items-center gap-1.5 mb-0.5">
                                <span class="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${T} flex items-center gap-1"><i class="bi ${D}"></i> ${q?"Serviço":"Produto"}</span>
                            </div>
                            <p class="font-bold text-slate-800 text-sm truncate leading-tight">${w(f.name)}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 flex-shrink-0 pl-2">
                        <div class="text-right">
                            <span class="block text-[8px] font-bold text-slate-400 uppercase">Valor Un.</span>
                            <span class="text-xs font-black text-slate-700">${Me(f.price)}</span>
                        </div>
                        <button type="button" class="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors remove-item-btn" data-index="${C}">
                            <i class="bi bi-trash3 pointer-events-none"></i>
                        </button>
                    </div>
                </div>
            `}).join(""),I(h)};$(s),k.addEventListener("change",h=>{if(h.target.classList.contains("quantity-input")){const f=parseInt(h.target.dataset.index,10),C=parseInt(h.target.value,10);C>0&&s[f]&&(s[f].quantity=C,$(s))}}),k.addEventListener("click",h=>{const f=h.target.closest(".remove-item-btn");if(f){const C=parseInt(f.dataset.index,10);s.splice(C,1),$(s)}}),x.addEventListener("input",()=>{I(s)}),t.querySelector("#add-item-to-package-btn").onclick=()=>rc(h=>{const f=s.find(C=>C.id===h.id&&C.type===h.type);f?f.quantity++:s.push({...h,quantity:1}),$(s)}),_e&&t.removeEventListener("click",_e),_e=async h=>{const f=h.target.closest("button[data-action]");if(!f)return;const C=f.dataset.action;if(h.stopPropagation(),C==="close-modal"&&qs(),C==="toggle-all-ests"){const q=document.querySelectorAll(".modal-est-checkbox"),D=Array.from(q).every(T=>T.checked);q.forEach(T=>T.checked=!D)}if(C==="save-package"){const q=f,D=Array.from(document.querySelectorAll(".modal-est-checkbox:checked")).map(F=>F.value);if(D.length===0){g("Atenção","Selecione pelo menos uma unidade para o pacote.","warning");return}const T=s.reduce((F,z)=>F+z.price*z.quantity,0),j={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:s,originalPrice:T,price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null,sellStartDate:document.getElementById("sellStartDate").value||null,sellEndDate:document.getElementById("sellEndDate").value||null,salesLimit:parseInt(document.getElementById("salesLimit").value,10)||null,establishmentIds:D,establishmentId:D[0]};if(!j.name||isNaN(j.price)){g("Erro","Nome do Pacote e Preço Final são obrigatórios.","warning");return}if(j.items.length===0){g("Erro","Adicione pelo menos um serviço ou produto ao pacote.","warning");return}q.disabled=!0,q.innerHTML='<div class="loader-small border-white mr-2"></div> Salvando...';try{a?await Zi(j.id,j):(delete j.id,await Yi(j)),g("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),qs(),await ea()}catch(F){g("Erro",`Não foi possível salvar o pacote: ${F.message}`,"error"),q.disabled=!1,q.innerHTML='<i class="bi bi-save2"></i> Salvar Pacote'}}},t.addEventListener("click",_e)}function rc(e){let t="";const a=document.createElement("div");a.id="item-selection-modal",a.className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4 animate-fade-in-fast";const s=n=>{const d=t.toLowerCase(),l=V.catalogForModal.services.filter(b=>b.name.toLowerCase().includes(d)),c=V.catalogForModal.products.filter(b=>b.name.toLowerCase().includes(d)),u=l.map(b=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${b.id}" class="flex items-center gap-3 w-full p-2 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left group">
                <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"><i class="bi bi-scissors"></i></div>
                <div class="flex-grow min-w-0">
                    <p class="font-bold text-xs text-slate-800 truncate">${w(b.name)}</p>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${Me(b.price)}</p>
                </div>
                <i class="bi bi-plus-circle text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
            </button>
        `).join("")||'<p class="text-xs text-slate-400 text-center p-4">Nenhum serviço encontrado.</p>',m=c.map(b=>`
            <button data-action="select-item" data-item-type="product" data-item-id="${b.id}" class="flex items-center gap-3 w-full p-2 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left group">
                <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"><i class="bi bi-box"></i></div>
                <div class="flex-grow min-w-0">
                    <p class="font-bold text-xs text-slate-800 truncate">${w(b.name)}</p>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${Me(b.price)}</p>
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
    `,document.body.appendChild(a);const o=a.querySelector("#item-selection-list"),r=a.querySelector("#item-search-input"),i=()=>{a.classList.add("opacity-0"),setTimeout(()=>a.remove(),200)};s(o),setTimeout(()=>r.focus(),100),r.addEventListener("input",()=>{t=r.value,s(o)}),a.addEventListener("click",n=>{const d=n.target.closest('[data-action="select-item"]'),l=n.target.closest('[data-action="close-selection-modal"]');if(d){const{itemType:c,itemId:u}=d.dataset,b=(V.catalogForModal[c+"s"]||[]).find(v=>v.id===u);b&&(e({...b,type:c}),i())}else(l||n.target===a)&&i()})}function ic(){Ht&&Ha.removeEventListener("click",Ht),Ht=s=>{if(s.target.closest('[data-action-stop-propagation="true"]')){s.stopPropagation();const i=s.target.closest('[data-action="delete-package"]');if(i){const n=i.dataset.id;J("Excluir Pacote","Tem a certeza que deseja excluir este pacote promocional? Esta ação é irreversível.").then(async d=>{if(d)try{await Ki(n),g("Sucesso!","Pacote excluído.","success"),await ea()}catch(l){g("Erro",`Não foi possível excluir: ${l.message}`,"error")}})}return}const o=s.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!o)return;const r=o.dataset.action;if(r==="new-package")Ns(null);else if(r==="edit-package"){const i=JSON.parse(o.dataset.package);Ns(i)}},Ha.addEventListener("click",Ht);const e=document.getElementById("search-packages");e&&e.addEventListener("input",s=>{V.searchQuery=s.target.value,Oa()});const t=document.getElementById("filter-status");t&&t.addEventListener("change",s=>{V.statusFilter=s.target.value,Oa()}),document.querySelectorAll(".est-filter-checkbox").forEach(s=>{s.addEventListener("change",o=>{const r=o.target.closest("label");o.target.checked?(V.filterEstablishmentIds.add(o.target.value),r.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),r.classList.remove("border-slate-200","text-slate-600")):(V.filterEstablishmentIds.delete(o.target.value),r.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),r.classList.add("border-slate-200","text-slate-600")),ea()})});const a=document.getElementById("export-excel-btn");a&&a.addEventListener("click",oc)}const nc=document.getElementById("content");let lc=null;async function dc(){const e=w(p.userName||"Usuário"),t=w(le.currentUser?.email||"E-mail não disponível"),a=p.userName?p.userName.charAt(0):"U";nc.innerHTML=`
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
    `,await cc()}async function cc(){const e=document.getElementById("professional-agenda-block");e.innerHTML="";try{const t=p.userProfessionalId;if(t){const a=await Si(t);lc=a,a.photo&&(document.getElementById("user-profile-avatar").src=a.photo);const s=w(a.name);e.innerHTML=`
                <div class="bg-indigo-50 p-4 rounded-lg flex items-center gap-4 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                        <p class="font-semibold text-indigo-800">Você está associado ao profissional: ${s}</p>
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
            `,uc(a.id),document.getElementById("my-blocks-filter").addEventListener("change",r=>ta(a.id,r.target.value)),ta(a.id,"future")}else e.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(t){console.error("Erro ao carregar seção de profissional:",t),e.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${w(t.message)}</p>
            </div>
        `}}function uc(e){const t=document.getElementById("block-schedule-form");t.addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#blockDate").value,o=t.querySelector("#blockStartTime").value,r=t.querySelector("#blockEndTime").value,i=t.querySelector("#blockReason").value;if(!s||!o||!r){g("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(o>=r){g("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const n=new Date(`${s}T${o}:00`),d=new Date(`${s}T${r}:00`),l=t.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="A bloquear...";try{await ia({establishmentId:p.establishmentId,professionalId:e,reason:i||"Bloqueado (Meu Perfil)",startTime:n.toISOString(),endTime:d.toISOString()}),g("Sucesso","Agenda bloqueada com sucesso!","success"),t.reset();const c=document.getElementById("my-blocks-filter").value;ta(e,c)}catch(c){console.error("Erro ao bloquear agenda:",c),g("Erro",`Não foi possível bloquear a agenda: ${c.message}`,"error")}finally{l.disabled=!1,l.textContent="Bloquear Agenda"}})}async function ta(e,t="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const s=new Date;let o,r;t==="history"?(r=new Date,o=new Date,o.setFullYear(o.getFullYear()-1)):(o=new Date,r=new Date,r.setFullYear(r.getFullYear()+1));let n=(await ra(p.establishmentId,o.toISOString(),r.toISOString(),e)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));t==="history"?n=n.filter(d=>d.endTime<s).sort((d,l)=>l.startTime-d.startTime):n=n.filter(d=>d.endTime>=s).sort((d,l)=>d.startTime-l.startTime),n.length>0?(a.innerHTML=n.map(d=>{const l=d.startTime.toLocaleDateString("pt-BR"),c=`${d.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${d.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`,u=d.endTime<new Date,m=w(d.reason||"Sem motivo");return`
                    <div class="flex items-center justify-between p-3 ${u?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${l} das ${c}</p>
                            <p class="text-sm text-gray-600">${m}</p>
                        </div>
                        <button data-block-id="${d.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(d=>{d.addEventListener("click",async l=>{const c=l.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await Ga(c),g("Sucesso","Bloqueio removido.","success"),ta(e,t)}catch(u){console.error("Erro ao remover bloqueio:",u),g("Erro",`Não foi possível remover o bloqueio: ${u.message}`,"error")}})})):a.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${t==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(s){console.error("Erro ao carregar bloqueios:",s),a.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${w(s.message)}</p>`}}let js=!1;async function aa(e){if(!e)return;e.innerHTML=`
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
    `;const t=document.getElementById("hierarchy-list-container"),a=document.getElementById("est-parent");try{const o=(await ve()).matrizes||[];if(a&&(a.innerHTML='<option value="">Nenhuma (Criar como Matriz Independente)</option>'),o.length===0)t.innerHTML=`
                <div class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
                    <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="bi bi-building-add text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">A sua rede está vazia</h3>
                    <p class="text-gray-500 max-w-md mx-auto mb-6">Comece por criar a sua primeira Matriz ou Loja principal para expandir o seu negócio.</p>
                </div>
            `;else{let r="";o.forEach(i=>{if(a&&!i.isOrphanBranch){const d=document.createElement("option");d.value=i.id,d.textContent=i.name,a.appendChild(d)}const n=i.isMatriz||!i.parentId?'<span class="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">📍 UNIDADE</span>';r+=`
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
                `}),t.innerHTML=r}js||(pc(),js=!0)}catch(s){console.error("Erro na renderização da rede:",s),t.innerHTML=`
            <div class="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100 text-center">
                <i class="bi bi-exclamation-triangle text-2xl mb-2 block"></i>
                <p class="font-bold text-sm">Não foi possível carregar a estrutura organizacional.</p>
            </div>
        `}}function pc(){const e=document.getElementById("form-create-establishment");e&&e.addEventListener("submit",async t=>{t.preventDefault();const a=e.querySelector('button[type="submit"]'),s=a.innerHTML;a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...',a.disabled=!0;const o={name:document.getElementById("est-name").value.trim(),cnpj:document.getElementById("est-cnpj").value.trim(),parentId:document.getElementById("est-parent").value||null,timezone:document.getElementById("est-timezone").value};try{const r=await Nr(o);alert(r.message||"Sucesso!"),e.reset();const i=document.getElementById("modal-create-establishment"),n=window.bootstrap?.Modal.getInstance(i);n&&n.hide(),await aa(document.getElementById("content"))}catch(r){console.error("Erro ao criar estabelecimento:",r),alert("Erro: "+(r.message||"Falha ao gravar dados."))}finally{a.innerHTML=s,a.disabled=!1}})}window.loadAndRenderHierarchy=()=>aa(document.getElementById("content"));document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("gesturestart",function(t){t.preventDefault()}),document.addEventListener("gesturechange",function(t){t.preventDefault()}),document.addEventListener("gestureend",function(t){t.preventDefault()});let e=0;document.addEventListener("touchend",function(t){const a=new Date().getTime();a-e<=300&&t.preventDefault(),e=a},!1)});const te=document.getElementById("loadingScreen"),it=document.getElementById("dashboardContent"),Ue=document.getElementById("content"),ya=document.getElementById("notificationBell"),Ot=document.getElementById("notificationBadge"),Fe=document.getElementById("notificationPanel"),wa=document.getElementById("notificationList"),nt=document.getElementById("profileMenuButton"),oe=document.getElementById("profileDropdown"),Rs=document.getElementById("profileName"),Fs=document.getElementById("profileEmail"),Hs=document.getElementById("logoutButton"),Os=document.getElementById("myProfileLink"),zs=document.getElementById("hamburger-menu-btn"),se=document.getElementById("sidebar"),ne=document.getElementById("mobile-overlay"),Vs=document.getElementById("themeToggleBtn"),ka=document.getElementById("themeIcon"),za=document.getElementById("mobile-bottom-nav"),tt=document.getElementById("nav-scroll"),_s=document.getElementById("scroll-hint-left"),Us=document.getElementById("scroll-hint-right"),mc=document.querySelectorAll(".bottom-nav-item");function Va(){if(!tt||!_s||!Us)return;const{scrollLeft:e,scrollWidth:t,clientWidth:a}=tt;_s.classList.toggle("visible",e>5),Us.classList.toggle("visible",e+a<t-5)}function gc(){if(!tt)return;const e=document.querySelector(".bottom-nav-item.active");if(!e)return;const t=tt,a=t.getBoundingClientRect(),s=e.getBoundingClientRect(),r=s.left+s.width/2-a.left-a.width/2;t.scrollBy({left:r,behavior:"smooth"})}const bc={"dashboard-section":gi,"agenda-section":go,"comandas-section":xn,"relatorios-section":Pn,"servicos-section":Xn,"produtos-section":ll,"suppliers-section":dl,"profissionais-section":Yt,"clientes-section":Hl,"estabelecimento-section":e=>Uo(e),"ausencias-section":od,"users-section":Zt,"sales-report-section":wd,"financial-section":$d,"commissions-section":Fd,"packages-section":tc,"my-profile-section":dc,"hierarquia-section":()=>aa(Ue),"establishments-section":()=>aa(Ue)},Ws={indigo:{main:"#4f46e5",hover:"#4338ca",light:"#eef2ff",text:"#ffffff"},blue:{main:"#2563eb",hover:"#1d4ed8",light:"#eff6ff",text:"#ffffff"},sky:{main:"#0284c7",hover:"#0369a1",light:"#e0f2fe",text:"#ffffff"},teal:{main:"#0d9488",hover:"#0f766e",light:"#ccfbf1",text:"#ffffff"},emerald:{main:"#059669",hover:"#047857",light:"#d1fae5",text:"#ffffff"},green:{main:"#16a34a",hover:"#15803d",light:"#dcfce7",text:"#ffffff"},lime:{main:"#65a30d",hover:"#4d7c0f",light:"#ecfccb",text:"#1f2937"},amber:{main:"#d97706",hover:"#b45309",light:"#fef3c7",text:"#1f2937"},orange:{main:"#ea580c",hover:"#c2410c",light:"#ffedd5",text:"#ffffff"},red:{main:"#dc2626",hover:"#b91c1c",light:"#fee2e2",text:"#ffffff"},rose:{main:"#e11d48",hover:"#be123c",light:"#ffe4e6",text:"#ffffff"},pink:{main:"#db2777",hover:"#be185d",light:"#fce7f3",text:"#ffffff"},fuchsia:{main:"#c026d3",hover:"#a21caf",light:"#fae8ff",text:"#ffffff"},purple:{main:"#7c3aed",hover:"#6d28d9",light:"#ede9fe",text:"#ffffff"},violet:{main:"#8b5cf6",hover:"#7c3aed",light:"#ddd6fe",text:"#ffffff"},gray:{main:"#64748b",hover:"#475569",light:"#f1f5f9",text:"#ffffff"},black:{main:"#111827",hover:"#000000",light:"#e5e7eb",text:"#ffffff"}};function zt(e){const t=Ws[e]||Ws.indigo,s=(r=>{const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return i?`${parseInt(i[1],16)}, ${parseInt(i[2],16)}, ${parseInt(i[3],16)}`:"79, 70, 229"})(t.main);document.body.style.setProperty("--theme-main",t.main);const o=document.getElementById("dynamic-theme-styles");o&&(o.innerHTML=`
            :root {
                --theme-color-main: ${t.main};
                --theme-color-hover: ${t.hover};
                --theme-color-light: ${t.light};
                --theme-rgb: ${s};
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
        `)}function Jt(e){document.documentElement.setAttribute("data-theme",e),localStorage.setItem("kairos_theme",e),ka&&(e==="dark"?ka.innerHTML="☀️":ka.innerHTML="🌙")}function fc(){const e=localStorage.getItem("kairos_theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;Jt(e||(t?"dark":"light"))}let yt=null,wt=[];function er(){if(!Ot||!wa)return;const e=wt.filter(t=>!t.read).length;if(e>0?(Ot.textContent=e,Ot.classList.remove("hidden")):Ot.classList.add("hidden"),wt.length===0){wa.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}wa.innerHTML=wt.map(t=>`
    <div class="notification-item ${t.read?"":"unread"}">
    <p class="font-semibold">${t.title}</p>
    <p class="text-sm text-gray-600">${t.message}</p>
    <p class="text-xs text-gray-400 mt-1">${t.time}</p>
    </div>
    `).join("")}function Js(e){yt&&yt();const t=sa(he,"establishments",e,"notifications"),a=Ys(t,Zs("timestamp",">=",new Date),gr("timestamp","desc"));yt=br(a,s=>{s.docChanges().forEach(o=>{if(o.type==="added"){const r=o.doc.data();wt.unshift({title:r.title,message:r.message,time:r.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),g(r.title,r.message,"info",!0),er();const i=document.querySelector(".sidebar-link.active");i&&i.dataset.target==="agenda-section"&&go()}})},s=>{console.error("Erro no listener de notificações:",s)})}async function xc(e){const t=document.getElementById("multi-context-container"),a=document.getElementById("multi-context-btn"),s=document.getElementById("multi-context-label"),o=document.getElementById("multi-context-count"),r=document.getElementById("multi-context-list"),i=document.getElementById("multi-context-apply"),n=document.getElementById("multi-context-dropdown"),d=document.getElementById("multi-context-arrow");if(!(!t||!r))try{const c=(await ve()).matrizes||[];let u="",m=0;if(c.forEach(b=>{u+=`
                <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors mb-1">
                    <input type="checkbox" value="${b.id}" class="context-checkbox" data-name="${Vt(b.name)}">
                    <span class="text-[13px] sm:text-sm font-bold text-slate-700 truncate">🏢 ${Vt(b.name)}</span>
                </label>
            `,m++,b.branches&&b.branches.length>0&&b.branches.forEach(v=>{u+=`
                        <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors ml-4 mb-1 border-l-2 border-slate-100 pl-3">
                            <input type="checkbox" value="${v.id}" class="context-checkbox" data-name="${Vt(v.name)}">
                            <span class="text-[12px] sm:text-[13px] font-medium text-slate-600 truncate">📍 ${Vt(v.name)}</span>
                        </label>
                    `,m++})}),m>0){r.innerHTML=u,t.style.display="block",(!p.selectedEstablishments||p.selectedEstablishments.length===0)&&(p.selectedEstablishments=[e]);const b=Array.from(r.querySelectorAll('input[type="checkbox"]')),v=()=>{const x=b.filter(P=>P.checked);o.textContent=x.length,x.length===0?s.textContent="Nenhuma selecionada":x.length===1?s.textContent=x[0].dataset.name:s.textContent=`${x.length} Unidades`};let k=!1;b.forEach(x=>{p.selectedEstablishments.includes(x.value)&&(x.checked=!0,k=!0)}),!k&&b.length>0&&(b[0].checked=!0,p.selectedEstablishments=[b[0].value],p.establishmentId=b[0].value),v(),a.addEventListener("click",x=>{x.stopPropagation(),n.classList.toggle("hidden"),d.style.transform=n.classList.contains("hidden")?"rotate(0deg)":"rotate(180deg)"}),document.addEventListener("click",x=>{!t.contains(x.target)&&!n.classList.contains("hidden")&&(n.classList.add("hidden"),d.style.transform="rotate(0deg)",b.forEach(P=>{P.checked=p.selectedEstablishments.includes(P.value)}),v())}),b.forEach(x=>{x.addEventListener("change",v)}),i.addEventListener("click",async x=>{x.stopPropagation(),te&&(te.classList.remove("hidden","fade-out"),te.style.display="flex");const P=b.filter($=>$.checked);if(P.length===0){te&&(te.classList.add("fade-out"),setTimeout(()=>{te.style.display="none"},500)),g("Atenção","Tem de selecionar pelo menos uma unidade.","warning");return}p.selectedEstablishments=P.map($=>$.value);const I=p.selectedEstablishments[0];try{const $=await Pe(I);p.establishmentId=I,p.establishmentName=$.name,p.enabledModules=$.modules,p.currentViewContext={id:I,name:$.name,type:$.parentId?"BRANCH":"GROUP"},typeof zt=="function"&&zt($.themeColor||"indigo"),Js(I),Gs(p.userPermissions),n.classList.add("hidden"),d.style.transform="rotate(0deg)",g("Ambiente Atualizado","Exibindo informações consolidadas.","success");const h=document.querySelector(".sidebar-link.active"),f=h?h.getAttribute("data-target"):"dashboard-section";G(f)}catch($){console.error("Erro ao aplicar contextos:",$),g("Erro","Ocorreu um problema ao trocar a visualização.","error")}finally{te&&(te.classList.add("fade-out"),setTimeout(()=>{te.style.display="none"},500))}});try{const x=await Pe(p.establishmentId);p.establishmentName=x.name,p.enabledModules=x.modules,p.currentViewContext={id:p.establishmentId,name:x.name,type:x.parentId?"BRANCH":"GROUP"},typeof zt=="function"&&zt(x.themeColor||"indigo"),Js(p.establishmentId),Gs(p.userPermissions)}catch(x){console.error(x)}}else t.style.display="none"}catch(l){console.error("Erro ao carregar switcher de contexto:",l),t.style.display="none"}}function G(e,t={}){const a=e.replace("-section","");if(e!=="my-profile-section"){const o=["hierarquia-section","establishments-section","estabelecimento-section","dashboard-section"].includes(e),r=p.enabledModules?.[a]!==!1,i=p.userPermissions===null||p.userPermissions[e]?.view===!0;if(!o&&(!r||!i)){Ue&&(Ue.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>'),document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active")),se&&se.classList.contains("absolute")&&(se.classList.add("hidden"),ne&&ne.classList.add("hidden"));return}}const s=bc[e];s&&Ue&&(document.querySelectorAll(".sidebar-link").forEach(o=>{o.classList.toggle("active",o.getAttribute("data-target")===e)}),za&&(mc.forEach(o=>{o.classList.toggle("active",o.getAttribute("data-target")===e)}),setTimeout(gc,50),setTimeout(Va,100)),e==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(o=>o.classList.remove("active")),Ue.innerHTML="",window.innerWidth<768&&se&&(se.classList.add("hidden"),ne&&ne.classList.add("hidden")),s(t))}window.navigateTo=G;async function Gs(e){const t=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),s=document.getElementById("kpi-today-appointments"),o=document.getElementById("kpi-today-revenue"),r=e===null||e["agenda-section"]?.view===!0,i=e===null||e["financial-section"]?.view===!0;if(r&&t&&(t.classList.remove("hidden"),t.classList.add("inline-flex")),i&&a&&(a.classList.remove("hidden"),a.classList.add("inline-flex")),!(!r&&!i))try{const n=await so();r&&s&&(s.textContent=n.todayAppointments.toString()),i&&o&&(o.textContent=`R$ ${n.todayRevenue.toFixed(2).replace(".",",")}`)}catch(n){console.error("Erro ao carregar KPIs do cabeçalho:",n)}}async function hc(e){try{pe.getPlatform()==="android"&&await ae.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0});let t=await ae.checkPermissions();if(t.receive==="prompt"&&(t=await ae.requestPermissions()),t.receive!=="granted")return;await ae.register(),ae.addListener("registration",async a=>{try{const s=$t(he,"users",e);await _a(s,{fcmTokens:mr(a.value),platform:"native_mobile"})}catch{}}),ae.addListener("pushNotificationReceived",a=>g(a.title,a.body,"info",!0)),ae.addListener("pushNotificationActionPerformed",()=>G("agenda-section"))}catch{}}function vc(){const e=document.getElementById("exitConfirmationModal"),t=document.getElementById("btn-cancel-exit"),a=document.getElementById("btn-confirm-exit"),s=()=>e&&(e.style.display="block"),o=()=>e&&(e.style.display="none"),r=()=>e&&e.style.display==="block";e&&(t.addEventListener("click",()=>{o(),pe.isNativePlatform()||history.pushState(null,document.title,location.href)}),a.addEventListener("click",()=>{o(),pe.isNativePlatform()?ps.exitApp():history.back()}),pe.isNativePlatform()?ps.addListener("backButton",()=>{if(r())o();else{const i=document.querySelectorAll('.modal[style*="display: block"]'),n=Array.from(i).filter(l=>l.id!=="exitConfirmationModal");if(n.length>0){n.forEach(l=>l.style.display="none");return}if(se&&!se.classList.contains("hidden")&&window.innerWidth<768){se.classList.add("hidden"),ne&&ne.classList.add("hidden");return}const d=document.querySelector(".sidebar-link.active");d&&d.getAttribute("data-target")==="dashboard-section"?s():G("dashboard-section")}}):(history.pushState(null,document.title,location.href),window.addEventListener("popstate",()=>{if(r()){o(),history.pushState(null,document.title,location.href);return}const i=document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display: flex"]'),n=Array.from(i).filter(l=>l.id!=="exitConfirmationModal");if(n.length>0){n.forEach(l=>l.style.display="none"),history.pushState(null,document.title,location.href);return}const d=document.querySelector(".sidebar-link.active");d&&d.getAttribute("data-target")==="dashboard-section"?s():(G("dashboard-section"),history.pushState(null,document.title,location.href))})))}function Vt(e){return e?e.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}async function yc(){try{await ir(le,nr)}catch{}pe.isNativePlatform()&&document.body.classList.add("is-app-native"),Dr(),vc(),fc(),Vs&&Vs.addEventListener("click",e=>{e.preventDefault();const t=document.documentElement.getAttribute("data-theme");Jt(t==="dark"?"light":"dark")}),zs&&zs.addEventListener("click",e=>{e.stopPropagation(),se&&(se.classList.remove("hidden"),se.classList.add("absolute","inset-y-0","left-0","z-40","shadow-xl")),ne&&ne.classList.remove("hidden")}),za&&(za.addEventListener("click",e=>{const t=e.target.closest(".bottom-nav-item");if(!t)return;e.preventDefault();const a=t.getAttribute("data-target");G(a)}),tt&&tt.addEventListener("scroll",Va),Va()),ne&&ne.addEventListener("click",()=>{se&&(se.classList.add("hidden"),se.classList.remove("absolute","inset-y-0","left-0","z-40","shadow-xl")),ne.classList.add("hidden")}),ya&&ya.addEventListener("click",e=>{e.stopPropagation(),Fe&&(Fe.classList.toggle("hidden"),Fe.classList.contains("hidden")||(wt.forEach(t=>t.read=!0),er()))}),nt&&nt.addEventListener("click",e=>{e.stopPropagation(),oe&&(oe.classList.toggle("active"),oe.classList.contains("active")?oe.classList.remove("hidden"):setTimeout(()=>oe.classList.add("hidden"),200))}),Os&&Os.addEventListener("click",e=>{e.preventDefault(),G("my-profile-section"),oe&&(oe.classList.remove("active"),oe.classList.add("hidden"))}),document.addEventListener("click",e=>{Fe&&!Fe.contains(e.target)&&e.target!==ya&&Fe.classList.add("hidden"),oe&&!oe.contains(e.target)&&e.target!==nt&&oe.classList.contains("active")&&(oe.classList.remove("active"),setTimeout(()=>oe.classList.add("hidden"),200))}),lr(le,async e=>{if(e){if(!pe.isNativePlatform()&&(ei(),"Notification"in window&&Notification.permission==="default")){const t=document.getElementById("toast-notification-request"),a=document.getElementById("btn-enable-toast");t&&setTimeout(()=>{t.style.display="block"},3500),a&&a.addEventListener("click",async()=>{await ti()&&t&&(t.style.display="none")});const s=()=>{t&&(t.style.display="none")},o=document.getElementById("btn-deny-toast"),r=document.getElementById("btn-close-toast");o&&o.addEventListener("click",s),r&&r.addEventListener("click",s)}try{const a=(await e.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="admin"||a.role==="employee")&&a.establishmentId){let s=null,o=e.displayName,r=null;const i=$t(he,"users",e.uid),n=await Qs(i);if(n.exists()){const l=n.data();s=a.role==="employee"?l.permissions||{}:null,o=l.name||o,r=l.professionalId||null}p.userProfessionalId=r,pe.isNativePlatform()&&hc(e.uid);const d=o||e.email;hr(a.establishmentId,"Carregando...",s),nt&&(nt.textContent=d.charAt(0).toUpperCase()),Rs&&(Rs.textContent=d),Fs&&(Fs.textContent=e.email),Hs&&Hs.addEventListener("click",l=>{l.preventDefault(),yt&&yt(),dr(le).then(()=>window.location.href="/login.html")}),await xc(a.establishmentId),qr(G,s,p.enabledModules),te&&(te.classList.add("fade-out"),setTimeout(()=>{te.style.display="none"},500)),it&&(it.style.display="flex"),setTimeout(()=>{Hr()},1500),G("dashboard-section")}else throw new Error("Permissão ou estabelecimento não configurado.")}catch(t){console.error("Erro na inicialização:",t),te&&(te.style.display="none"),it&&(it.innerHTML=`<div class="w-full h-full flex flex-col items-center justify-center p-4 text-center"><h2>Erro de Acesso</h2><p>${t.message}</p></div>`,it.style.display="flex")}}else window.location.href="/login.html"})}yc();export{eo as W};
