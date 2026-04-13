const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-CIhCRBEa.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/firebase-config-C2tbVz-J.js","assets/styles-CZYPZ0h4.css"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as be,d as Se,m as ks}from"./firebase-config-C2tbVz-J.js";import{EmailAuthProvider as xr,reauthenticateWithCredential as hr,verifyBeforeUpdateEmail as yr,updatePassword as vr,updateProfile as wr,setPersistence as kr,browserLocalPersistence as $r,onAuthStateChanged as Er,signOut as Ir}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as Ct,getDoc as io,updateDoc as as,setDoc as Sr,addDoc as no,collection as ia,query as lo,where as co,getDocs as Lr,deleteDoc as Cr,arrayUnion as Dr,orderBy as Tr,onSnapshot as Pr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{getToken as Br,onMessage as Ar}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const g={userName:null,userProfessionalId:null,userPermissions:null,userRole:null,groupId:null,groupName:null,accessibleCompanies:[],accessibleEstablishments:[],currentViewContext:{type:null,id:null,name:null},establishmentId:null,establishmentName:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function Mr(e,t,a){g.establishmentId=e,g.establishmentName=t,g.userPermissions=a,g.currentViewContext={type:"BRANCH",id:e,name:t}}const uo=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",Ca=uo?"http://localhost:8080":"https://kairos-app-407358446276.us-central1.run.app";console.log(`🚀 API configurada para modo: ${uo?"LOCAL (Dev)":"PRODUÇÃO (Cloud)"}`);console.log("📡 URL Base:",Ca);async function qr(){const e=be.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function D(e,t={}){const a=await qr();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const s=Ca.replace(/\/$/,""),o=e.startsWith("/")?e:`/${e}`,r=`${s}${o}`;console.log(`AuthenticatedFetch: ${t.method||"GET"} ${r}`);try{const i=await fetch(r,{...t,headers:{...a,...t.headers}});if(!i.ok){const d=(await i.json().catch(()=>({message:i.statusText}))).message||`Erro na API: ${i.status}`;if(d.includes("FAILED_PRECONDITION")&&d.includes("requires an index")){const l=/(https:\/\/[^\s]+)/,c=d.match(l),u=c?c[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${u}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${i.status}) em ${r}:`,d),new Error(d)}return i.json()}catch(i){throw console.error(`Falha de rede ao tentar acessar ${r}:`,i.message),i.message.includes("Failed to fetch")||i.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${Ca}. Verifique se o servidor backend está rodando.`):i}}const ss=(e,t,a,s=null)=>{let o=`/api/appointments/${e}?startDate=${t}&endDate=${a}`;return s&&(o+=`&professionalId=${s}`),D(o)},jr=(e,t,a)=>{const s=`/api/appointments/cancelled/${e}?startDate=${t}&endDate=${a}`;return D(s)},Nr=({establishmentId:e,professionalId:t,serviceIds:a,date:s})=>{const o=`/api/availability?establishmentId=${e}&professionalId=${t}&serviceIds=${a.join(",")}&date=${s}`;return D(o)},Rr=e=>D("/api/appointments",{method:"POST",body:JSON.stringify(e)}),Fr=(e,t)=>D(`/api/appointments/${e}`,{method:"PUT",body:JSON.stringify(t)}),Hr=e=>D(`/api/appointments/${e}`,{method:"DELETE"}),Or=e=>D(`/api/appointments/${e}/reopen`,{method:"POST"}),zr=(e,t)=>D(`/api/appointments/${e}/checkout`,{method:"POST",body:JSON.stringify(t)});let oe;async function Vr(){if(!oe)try{oe=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function _r(){if(!oe){console.warn("AudioContext não inicializado. O som não será tocado.");return}oe.state==="suspended"&&oe.resume();const e=oe.createOscillator(),t=oe.createGain();e.connect(t),t.connect(oe.destination),e.type="sine",e.frequency.setValueAtTime(800,oe.currentTime),t.gain.setValueAtTime(0,oe.currentTime),t.gain.linearRampToValueAtTime(.3,oe.currentTime+.01),t.gain.exponentialRampToValueAtTime(1e-4,oe.currentTime+.2),e.start(oe.currentTime),e.stop(oe.currentTime+.2)}function b(e,t,a="info",s=!1){const o=document.getElementById("toast-container");if(!o)return;s&&_r();const r=document.createElement("div"),i={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},n={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},d={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};r.className=`toast ${i[a]||i.info}`,r.innerHTML=`
        <div class="toast-icon">${n[a]||n.info}</div>
        <div class="toast-content">
            <p class="font-bold">${e}</p>
            <p class="text-sm">${t}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${d[a]||d.info}"></div>
        </div>
    `,o.appendChild(r),r.querySelector(".toast-close").addEventListener("click",()=>r.remove()),setTimeout(()=>{r.remove()},4e3)}function Y(e,t){const a=document.getElementById("genericModal");return new Promise(s=>{a.innerHTML=`
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
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",s(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",s(!1)}})}function me({title:e,contentHTML:t,maxWidth:a="max-w-4xl",showCloseButton:s=!0}){let o=document.getElementById("genericModal");const r=o.cloneNode(!1);o.parentNode.replaceChild(r,o),o=r;const i=()=>{o.style.display="none"},n=c=>{o.querySelector("#genericModalContentBody").innerHTML=c};o.innerHTML=`
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
    `;const d=o.querySelector("[data-close-modal]");d&&(d.onclick=i);const l=o.querySelector('[data-action="close-modal"]');return l&&(l.onclick=i),o.addEventListener("click",c=>{c.target.closest(".modal-content")||i()}),o.style.display="flex",{modalElement:o,close:i,setContent:n}}function Ur(){document.body.addEventListener("click",()=>{oe||Vr()},{once:!0}),document.addEventListener("click",e=>{const t=e.target.closest('[data-action="close-modal"]');if(t){const s=t.dataset.target;if(s){const o=document.getElementById(s);o&&(o.style.display="none")}}if(e.target.closest("[data-close-modal]")){const s=document.getElementById("genericModal");s&&(s.style.display="none")}})}const ae=document.getElementById("sidebar"),Re=document.getElementById("sidebarToggle"),xt=document.getElementById("mainContent"),Wr=document.querySelectorAll(".sidebar-link"),Da=document.getElementById("menu-search"),$s=document.getElementById("hamburger-menu-btn"),Ye=document.getElementById("mobile-overlay");let Le=!0;function Ae(e){if(!ae||!xt)return;ae.classList.toggle("collapsed",e),xt.classList.toggle("sidebar-collapsed-shift",e);const t=ae.querySelector(".sidebar-search-container"),a=ae.querySelectorAll(".sidebar-category");e?(t&&(t.style.display="none"),a.forEach(s=>s.style.display="none"),document.querySelectorAll(".submenu-toggle").forEach(s=>{const o=s.getAttribute("data-target-submenu"),r=document.getElementById(o),i=s.querySelector(".submenu-arrow");r&&(r.classList.add("hidden"),r.classList.remove("flex")),i&&i.classList.remove("rotate-180")})):(t&&(t.style.display="block"),a.forEach(s=>s.style.display="block"))}function Jr(){!ae||!Ye||(ae.classList.add("mobile-open"),Ye.classList.add("visible"))}function Pt(){!ae||!Ye||(ae.classList.remove("mobile-open"),Ye.classList.remove("visible"))}function Gr(){Ae(!ae.classList.contains("collapsed"))}function Qr(e,t){const a=document.getElementById(e);if(!a)return;const s=a.classList.contains("hidden");s&&window.innerWidth>=1024&&ae.classList.contains("collapsed")&&Ae(!1),s?(a.classList.remove("hidden"),a.classList.add("flex"),t&&t.classList.add("rotate-180")):(a.classList.add("hidden"),a.classList.remove("flex"),t&&t.classList.remove("rotate-180"))}function Xr(){Da&&Da.addEventListener("input",e=>{const t=e.target.value.toLowerCase().trim(),a=document.getElementById("sidebar-nav");if(!a)return;const s=a.querySelectorAll("li"),o=a.querySelectorAll(".sidebar-category");if(t===""){s.forEach(r=>r.style.display=""),o.forEach(r=>r.style.display="block");return}o.forEach(r=>r.style.display="none"),s.forEach(r=>{if(r.classList.contains("sidebar-category"))return;const i=r.querySelector(".sidebar-link")||r.querySelector(".submenu-toggle");if(!i)return;if(i.textContent.toLowerCase().includes(t)){r.style.display="";const l=r.closest('ul[id$="-submenu"]');if(l){l.classList.remove("hidden"),l.classList.add("flex"),l.parentElement.style.display="";const c=l.parentElement.querySelector(".submenu-toggle");if(c){const u=c.querySelector(".submenu-arrow");u&&u.classList.add("rotate-180")}}}else{const l=i.getAttribute("data-target-submenu");if(l){const c=document.getElementById(l);c&&(Array.from(c.querySelectorAll(".sidebar-link")).some(m=>m.textContent.toLowerCase().includes(t))?r.style.display="":r.style.display="none")}else r.style.display="none"}})})}function Yr(e,t,a){if(!ae||!xt)return;xt.classList.add("main-content-shift"),window.innerWidth>=1024?(Le=!0,Ae(!1)):window.innerWidth>=768?(Le=!1,Ae(!0)):(xt.classList.remove("main-content-shift","sidebar-collapsed-shift"),Pt()),Re&&Re.addEventListener("click",o=>{o.stopPropagation(),window.innerWidth>=768?(Le=!Le,Ae(!Le),Le?(Re.classList.add("text-indigo-400"),Re.classList.remove("text-gray-400")):(Re.classList.remove("text-indigo-400"),Re.classList.add("text-gray-400"))):Gr()}),ae.addEventListener("mouseenter",()=>{window.innerWidth>=768&&!Le&&ae.classList.contains("collapsed")&&Ae(!1)}),ae.addEventListener("mouseleave",()=>{if(window.innerWidth>=768&&!Le){const o=!!document.querySelector("#sidebarToggle:hover"),r=document.activeElement===Da;!o&&!r&&Ae(!0)}}),$s&&$s.addEventListener("click",o=>{o.stopPropagation(),Jr()}),Ye&&Ye.addEventListener("click",o=>{o.stopPropagation(),Pt()});let s=0;ae.addEventListener("touchstart",o=>{s=o.changedTouches[0].screenX},{passive:!0}),ae.addEventListener("touchend",o=>{const r=o.changedTouches[0].screenX;s-r>50&&Pt()},{passive:!0}),document.querySelectorAll(".submenu-toggle").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation();const i=o.getAttribute("data-target-submenu"),n=o.querySelector(".submenu-arrow");Qr(i,n)})}),Xr(),Wr.forEach(o=>{const r=o.getAttribute("data-target");if(!r)return;const i=r.replace("-section",""),n=a?.[i]!==!1,d=t===null||t[r]?.view===!0;if(!n||!d){o.parentElement&&o.parentElement.tagName==="LI"?o.parentElement.style.display="none":o.style.display="none";return}o.addEventListener("click",l=>{l.preventDefault(),document.querySelectorAll(".sidebar-link").forEach(c=>c.classList.remove("active")),o.classList.add("active"),r&&typeof e=="function"&&e(r),window.innerWidth<768&&Pt()})})}const Kr=e=>D("/api/establishments/",{method:"POST",body:JSON.stringify(e)}),xe=()=>D("/api/establishments/hierarchy",{method:"GET"}),De=e=>{const t=e||g.establishmentId;return t?D(`/api/establishments/${t}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},os=(e,t)=>{const a=e||g.establishmentId;return a?D(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(t)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Zr=(e,t)=>{const a=e||g.establishmentId;return a?D(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},ei=(e,t)=>{const a=e||g.establishmentId;return a?D(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))};class ti{constructor(t,a,s){this.steps=t,this.currentStep=0,this.onComplete=a,this.onSkip=s,this.isActive=!1,this.overlay=null,this.spotlight=null,this.popover=null,this.handleResize=this.handleResize.bind(this)}start(){this.isActive||(this.isActive=!0,this.createElements(),window.addEventListener("resize",this.handleResize),this.renderStep())}stop(t=!1){this.isActive=!1,window.removeEventListener("resize",this.handleResize),this.overlay&&this.overlay.remove(),this.spotlight&&this.spotlight.remove(),this.popover&&this.popover.remove(),t&&this.onComplete?this.onComplete():!t&&this.onSkip&&this.onSkip()}createElements(){this.overlay=document.createElement("div"),this.overlay.className="fixed inset-0 bg-black/60 z-[99990] transition-opacity duration-300",document.body.appendChild(this.overlay),this.spotlight=document.createElement("div"),this.spotlight.className="absolute rounded-xl z-[99991] transition-all duration-500 ease-in-out pointer-events-none bg-transparent",this.spotlight.style.boxShadow="0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255,255,255,0.5) inset",document.body.appendChild(this.spotlight),this.popover=document.createElement("div"),this.popover.className="absolute z-[99992] bg-white rounded-2xl shadow-2xl w-[320px] transition-all duration-500 ease-in-out opacity-0 transform scale-95 border border-gray-100 flex flex-col",document.body.appendChild(this.popover)}async renderStep(){if(this.currentStep>=this.steps.length){this.stop(!0);return}const t=this.steps[this.currentStep];this.popover.style.opacity="0",this.popover.style.transform="scale(0.95)",t.onBefore&&(await t.onBefore(),await this.sleep(600));const a=await this.waitForElement(t.targetSelector,3e3);if(a){a.scrollIntoView({behavior:"smooth",block:"center"}),await this.sleep(300);const o=a.getBoundingClientRect(),r=8;this.spotlight.style.top=`${o.top+window.scrollY-r}px`,this.spotlight.style.left=`${o.left+window.scrollX-r}px`,this.spotlight.style.width=`${o.width+r*2}px`,this.spotlight.style.height=`${o.height+r*2}px`,this.spotlight.style.display="block",this.overlay.style.display="none",this.positionPopover(o)}else this.spotlight.style.display="none",this.overlay.style.display="block",this.popover.style.top="50%",this.popover.style.left="50%",this.popover.style.transform="translate(-50%, -50%) scale(1)";const s=this.currentStep===this.steps.length-1;this.popover.innerHTML=`
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
        `,setTimeout(()=>{a&&(this.popover.style.transform="scale(1)"),this.popover.style.opacity="1"},50),document.getElementById("tour-next-btn").onclick=()=>{this.currentStep++,this.renderStep()},document.getElementById("tour-prev-btn")&&(document.getElementById("tour-prev-btn").onclick=()=>{this.currentStep--,this.renderStep()}),document.getElementById("tour-skip-btn").onclick=()=>this.stop(!1)}positionPopover(t){const a=this.popover.getBoundingClientRect(),s=20;let o=t.bottom+window.scrollY+s,r=t.left+window.scrollX;o+a.height>window.scrollY+window.innerHeight&&(o=t.top+window.scrollY-a.height-s),r+a.width>window.innerWidth&&(r=t.right+window.scrollX-a.width),r<s&&(r=s),this.popover.style.top=`${o}px`,this.popover.style.left=`${r}px`}handleResize(){this.isActive&&this.renderStep()}sleep(t){return new Promise(a=>setTimeout(a,t))}async waitForElement(t,a){if(!t)return null;const s=Date.now();for(;Date.now()-s<a;){const o=document.querySelector(t);if(o)return o;await this.sleep(100)}return null}}async function ai(){try{console.log("A verificar Onboarding interativo...");const e=await De(g.establishmentId);if(!e||e.parentId||e.onboardingCompleted)return;const t=[{title:"Bem-vindo ao Kairos!",icon:"👋",content:"Preparei um tour rápido para lhe mostrar onde deve configurar as 3 coisas mais importantes antes de receber agendamentos. Vamos a isso?",targetSelector:null},{title:"Perfil e Dados da Loja",icon:"🏢",content:"É aqui em 'Minha Empresa' que você define o nome do Salão, telefone, endereço e faz o upload da sua Logomarca.",targetSelector:'[data-target="estabelecimento-section"]',onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Cores e Personalização",icon:"🎨",content:"Nesta área você pode mudar a cor principal do sistema para ficar com a cara da sua marca. O link do seu cliente vai usar esta cor!",targetSelector:"#themeColor",onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Criação de Serviços",icon:"✂️",content:"Na aba 'Serviços' é onde a mágica acontece. Crie os serviços que os seus clientes vão poder agendar, informando o preço e a duração de cada um.",targetSelector:'[data-target="servicos-section"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Novo Serviço",icon:"➕",content:"Sempre que precisar adicionar um novo serviço ao menu, basta clicar neste botão verde.",targetSelector:'[data-action="new-service"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Gestão da Equipe",icon:"👥",content:"E para terminar: a 'Equipa'. Aqui você cadastra os profissionais, define quem faz qual serviço e ajusta a jornada de trabalho semanal de cada um.",targetSelector:'[data-target="profissionais-section"]',onBefore:async()=>{window.navigateTo("profissionais-section")}},{title:"Tudo Pronto!",icon:"🚀",content:"Você já conhece o caminho! Preencha as informações do seu negócio com calma. Quando terminar, volte à Agenda e partilhe o seu Link de Agendamento com os clientes!",targetSelector:null,onBefore:async()=>{window.navigateTo("agenda-section")}}],a=async()=>{try{await os(g.establishmentId,{onboardingCompleted:!0}),showNotification("Tour Concluído","Você já pode configurar o seu sistema livremente!","success")}catch(o){console.error("Erro ao gravar fim do onboarding",o)}};new ti(t,a,a).start()}catch(e){console.error("Erro fatal ao iniciar onboarding:",e)}}var Ke;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(Ke||(Ke={}));class ha extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const si=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},oi=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},o=()=>t!==null?t.name:si(e),r=()=>o()!=="web",i=u=>{const p=l.get(u);return!!(p?.platforms.has(o())||n(u))},n=u=>{var p;return(p=a.PluginHeaders)===null||p===void 0?void 0:p.find(m=>m.name===u)},d=u=>e.console.error(u),l=new Map,c=(u,p={})=>{const m=l.get(u);if(m)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),m.proxy;const y=o(),w=n(u);let f;const S=async()=>(!f&&y in p?f=typeof p[y]=="function"?f=await p[y]():f=p[y]:t!==null&&!f&&"web"in p&&(f=typeof p.web=="function"?f=await p.web():f=p.web),f),T=(M,B)=>{var P,F;if(w){const V=w?.methods.find(_=>B===_.name);if(V)return V.rtype==="promise"?_=>a.nativePromise(u,B.toString(),_):(_,A)=>a.nativeCallback(u,B.toString(),_,A);if(M)return(P=M[B])===null||P===void 0?void 0:P.bind(M)}else{if(M)return(F=M[B])===null||F===void 0?void 0:F.bind(M);throw new ha(`"${u}" plugin is not implemented on ${y}`,Ke.Unimplemented)}},L=M=>{let B;const P=(...F)=>{const V=S().then(_=>{const A=T(_,M);if(A){const U=A(...F);return B=U?.remove,U}else throw new ha(`"${u}.${M}()" is not implemented on ${y}`,Ke.Unimplemented)});return M==="addListener"&&(V.remove=async()=>B()),V};return P.toString=()=>`${M.toString()}() { [capacitor code] }`,Object.defineProperty(P,"name",{value:M,writable:!1,configurable:!1}),P},k=L("addListener"),x=L("removeListener"),I=(M,B)=>{const P=k({eventName:M},B),F=async()=>{const _=await P;x({eventName:M,callbackId:_},B)},V=new Promise(_=>P.then(()=>_({remove:F})));return V.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await F()},V},C=new Proxy({},{get(M,B){switch(B){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return w?I:k;case"removeListener":return x;default:return L(B)}}});return s[u]=C,l.set(u,{name:u,proxy:C,platforms:new Set([...Object.keys(p),...w?[y]:[]])}),C};return a.convertFileSrc||(a.convertFileSrc=u=>u),a.getPlatform=o,a.handleError=d,a.isNativePlatform=r,a.isPluginAvailable=i,a.registerPlugin=c,a.Exception=ha,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},ri=e=>e.Capacitor=oi(e),we=ri(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),na=we.registerPlugin;class po{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const r=this.windowListeners[t];r&&!r.registered&&this.addWindowListener(r),s&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const o=this.listeners[t];if(!o){if(s){let r=this.retainedEventArguments[t];r||(r=[]),r.push(a),this.retainedEventArguments[t]=r}return}o.forEach(r=>r(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new we.Exception(t,Ke.Unimplemented)}unavailable(t="not available"){return new we.Exception(t,Ke.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const o=s.indexOf(a);this.listeners[t].splice(o,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const Es=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Is=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class ii extends po{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[o,r]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");o=Is(o).trim(),r=Is(r).trim(),a[o]=r}),a}async setCookie(t){try{const a=Es(t.key),s=Es(t.value),o=`; expires=${(t.expires||"").replace("expires=","")}`,r=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${o}; path=${r}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}na("CapacitorCookies",{web:()=>new ii});const ni=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const o=s.result;t(o.indexOf(",")>=0?o.split(",")[1]:o)},s.onerror=o=>a(o),s.readAsDataURL(e)}),li=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(o=>o.toLocaleLowerCase()).reduce((o,r,i)=>(o[r]=e[t[i]],o),{})},di=(e,t=!0)=>e?Object.entries(e).reduce((s,o)=>{const[r,i]=o;let n,d;return Array.isArray(i)?(d="",i.forEach(l=>{n=t?encodeURIComponent(l):l,d+=`${r}=${n}&`}),d.slice(0,-1)):(n=t?encodeURIComponent(i):i,d=`${r}=${n}`),`${s}&${d}`},"").substr(1):null,ci=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),o=li(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(o.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[i,n]of Object.entries(e.data||{}))r.set(i,n);a.body=r.toString()}else if(o.includes("multipart/form-data")||e.data instanceof FormData){const r=new FormData;if(e.data instanceof FormData)e.data.forEach((n,d)=>{r.append(d,n)});else for(const n of Object.keys(e.data))r.append(n,e.data[n]);a.body=r;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(o.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class ui extends po{async request(t){const a=ci(t,t.webFetchExtra),s=di(t.params,t.shouldEncodeUrlParams),o=s?`${t.url}?${s}`:t.url,r=await fetch(o,a),i=r.headers.get("content-type")||"";let{responseType:n="text"}=r.ok?t:{};i.includes("application/json")&&(n="json");let d,l;switch(n){case"arraybuffer":case"blob":l=await r.blob(),d=await ni(l);break;case"json":d=await r.json();break;case"document":case"text":default:d=await r.text()}const c={};return r.headers.forEach((u,p)=>{c[p]=u}),{data:d,headers:c,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}na("CapacitorHttp",{web:()=>new ui});const de=na("PushNotifications",{}),pi="modulepreload",gi=function(e){return"/"+e},Ss={},bi=function(t,a,s){let o=Promise.resolve();if(a&&a.length>0){let d=function(l){return Promise.all(l.map(c=>Promise.resolve(c).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),n=i?.nonce||i?.getAttribute("nonce");o=d(a.map(l=>{if(l=gi(l),l in Ss)return;Ss[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":pi,c||(p.as="script"),p.crossOrigin="",p.href=l,n&&p.setAttribute("nonce",n),document.head.appendChild(p),c)return new Promise((m,y)=>{p.addEventListener("load",m),p.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(i){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=i,window.dispatchEvent(n),!n.defaultPrevented)throw i}return o.then(i=>{for(const n of i||[])n.status==="rejected"&&r(n.reason);return t().catch(r)})},Ls=na("App",{web:()=>bi(()=>import("./web-CIhCRBEa.js"),__vite__mapDeps([0,1,2,3])).then(e=>new e.AppWeb)}),mi="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let Cs=!1;async function fi(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await de.removeAllListeners(),await de.addListener("registration",async a=>{bo(a.value,!0)}),await de.addListener("pushNotificationReceived",a=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",a)}),await de.addListener("pushNotificationActionPerformed",a=>{const s=a.notification.data;console.log("Notificação clicada (Ação):",s)});let t=await de.checkPermissions();t.receive==="prompt"&&(t=await de.requestPermissions()),t.receive==="granted"&&await de.register()}catch(t){console.error("[Push Nativo] Erro:",t)}return}"Notification"in window&&Notification.permission==="granted"&&go()}async function xi(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await go(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(e){return console.error("Erro ao pedir permissão Web:",e),!1}}async function go(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await e.update();const t=await Br(ks,{vapidKey:mi,serviceWorkerRegistration:e});t?(console.log("[Push Web] Token validado."),await bo(t,!1)):console.warn("[Push Web] Token veio vazio."),Cs||(Ar(ks,a=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",a)}),Cs=!0)}catch(e){console.error("[Push Web] Falha no registo:",e)}else console.warn("Navegador sem suporte a Service Worker.")}async function bo(e,t){const a=be.currentUser;if(!a){console.warn("Usuário não logado. Token não salvo.");return}const s=Ct(Se,"users",a.uid);try{const o=await io(s);if(o.exists()){const i=o.data().fcmTokens||[];if(i.length===1&&i[0]===e){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await as(s,{fcmTokens:[e],lastLoginAt:new Date().toISOString(),platform:t?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(o){if(o.code==="not-found")try{await Sr(s,{email:a.email,fcmTokens:[e],platform:t?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(r){console.error("Erro ao criar user:",r)}else console.error("Erro ao atualizar token:",o)}}const hi=(e,t,a="all",s="all")=>{const o=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&o.append("professionalId",a),s&&s!=="all"&&o.append("costCenterId",s),D(`/api/reports/indicators?${o.toString()}`)},yi=(e,t="all")=>{const a=new URLSearchParams({date:e});return t&&t!=="all"&&a.append("professionalId",t),D(`/api/reports/appointments/list?${a.toString()}`)},vi=e=>e?D(`/api/financial/cost-centers/${e}`):Promise.resolve([]),wi=(e,t,a)=>{const s=new URLSearchParams({startDate:t,endDate:a});return D(`/api/analytics/${e}?${s.toString()}`)},Yt=({establishmentId:e,startDate:t,endDate:a,cashierSessionId:s})=>{const o=new URLSearchParams({startDate:t,endDate:a});return s&&s!=="all"&&o.append("cashierSessionId",s),e&&o.append("establishmentId",e),D(`/api/reports/sales?${o.toString()}`)},ki=(e,t,a)=>D(`/api/analytics/${e}/monthly-details?year=${t}&month=${a}`),$i=(e,t,a,s)=>{const o=`/api/analytics/${e}/daily-details?year=${t}&month=${a}&day=${s}`;return D(o)},Ei=(e,t,a,s)=>{const o=`/api/analytics/${e}/professional-details?year=${t}&month=${a}&professionalId=${s}`;return D(o)},Ii=(e,t,a,s)=>D(`/api/reports/commissions/${e}?year=${t}&month=${a}&professionalId=${s}`),mo=()=>D("/api/reports/summary",{method:"GET"}),Si=Object.freeze(Object.defineProperty({__proto__:null,getAdvancedIndicators:hi,getAnalytics:wi,getCommissionReport:Ii,getCostCenters:vi,getDailyAppointments:yi,getDailyTransactions:$i,getMonthlyAnalytics:ki,getProfessionalMonthlyDetails:Ei,getSalesReport:Yt,getSummaryKPIs:mo},Symbol.toStringTag,{value:"Module"})),rs=e=>e?String(e).replace(/\D/g,""):"",it=(e,t="",a=20,s={})=>{const o=new URLSearchParams;return t&&o.append("search",t),a&&o.append("limit",a),s&&s.hasLoyalty&&o.append("hasLoyalty","true"),s&&s.birthMonth&&o.append("birthMonth",s.birthMonth),s&&s.inactiveDays&&o.append("inactiveDays",s.inactiveDays),D(`/api/clients/${e}?${o.toString()}`)},fo=(e,t)=>{const a=encodeURIComponent(t);return D(`/api/clients/details/${e}/${a}`)},xo=e=>{const t=e.phone||e.id;if(!t)throw new Error("Telefone é obrigatório");const a=rs(t),s={...e,phone:a,id:a};return D(`/api/clients/${a}`,{method:"PUT",body:JSON.stringify(s)})},ho=xo,yo=(e,t)=>xo({...t,id:e}),vo=e=>{const t=encodeURIComponent(e);return D(`/api/clients/${t}`,{method:"DELETE"})},Li=(e,t,a,s)=>D("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:e,clientPhone:rs(t),points:a,rewardName:s})}),Ci=(e,t)=>fo(e,rs(t));function h(e){return e==null?"":String(e).replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t])}function is(e,t=800,a=800,s=.7){return new Promise((o,r)=>{if(!e.type.match(/image.*/))return r(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.readAsDataURL(e),i.onload=n=>{const d=new Image;d.src=n.target.result,d.onload=()=>{let l=d.width,c=d.height;l>c?l>t&&(c*=t/l,l=t):c>a&&(l*=a/c,c=a);const u=document.createElement("canvas");u.width=l,u.height=c,u.getContext("2d").drawImage(d,0,0,l,c);const m=u.toDataURL("image/jpeg",s);o(m)},d.onerror=l=>r(new Error("Erro ao carregar a imagem para processamento."))},i.onerror=n=>r(new Error("Erro ao ler o ficheiro."))})}function ya(e){const t=parseFloat(e);return isNaN(t)?"R$ 0,00":t.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}let va=null;async function Di(){const e=document.getElementById("content");e.innerHTML=`
        <div class="flex items-center justify-center h-full min-h-[60vh]">
            <div class="flex flex-col items-center">
                <div class="w-10 h-10 border-4 border-indigo-50 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                <p class="text-slate-400 font-medium text-sm">A processar dados consolidados...</p>
            </div>
        </div>
    `;try{const t=new Date,a=new Date(t.getFullYear(),t.getMonth(),t.getDate()),s=new Date(a);s.setHours(23,59,59,999);const o=new Date(a.getFullYear(),a.getMonth(),1),r=new Date(a);r.setDate(a.getDate()-6);const i=g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId],n=i.map(async A=>{const[U,ne]=await Promise.all([ss(A,o.toISOString(),s.toISOString(),null),it(A)]);return{appts:U||[],clients:ne||[]}}),d=await Promise.all(n);let l=[],c=[];d.forEach(A=>{l=l.concat(A.appts),c=c.concat(A.clients)});const u=A=>(A.services||[]).reduce((U,ne)=>U+(Number(ne.price)||0),0)||Number(A.totalPrice||0)||Number(A.servicePrice||0),p=l.filter(A=>{const U=new Date(A.startTime);return U>=a&&U<=s}),m=p.filter(A=>A.status==="completed"),y=l.filter(A=>A.status==="completed"),w=m.reduce((A,U)=>A+u(U),0),f=y.reduce((A,U)=>A+u(U),0),S=p.length,T=y.length>0?f/y.length:0,L=[],k=[],x=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];for(let A=0;A<7;A++){const U=new Date(r);U.setDate(r.getDate()+A),L.push(x[U.getDay()]);const ne=new Date(U).setHours(0,0,0,0),ue=new Date(U).setHours(23,59,59,999),Tt=l.filter(Be=>{const J=new Date(Be.startTime).getTime();return Be.status==="completed"&&J>=ne&&J<=ue}).reduce((Be,J)=>Be+u(J),0);k.push(Tt)}const I={labels:L,data:k},C=p.filter(A=>new Date(A.startTime).getTime()>=t.getTime()&&A.status!=="completed"&&A.status!=="cancelled").sort((A,U)=>new Date(A.startTime)-new Date(U.startTime)).slice(0,4).map(A=>({client:A.clientName||"Desconhecido",service:A.serviceName||(A.services&&A.services[0]?A.services[0].name:"Serviço"),time:new Date(A.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),prof:(A.professionalName||"").split(" ")[0]||"Profissional",id:A.id})),M=`${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}`,B=new Map;c.forEach(A=>{A.phone?B.set(A.phone,A):B.set(A.id||Math.random().toString(),A)});const F=Array.from(B.values()).filter(A=>{if(!A.birthDate)return!1;let U,ne;if(A.birthDate.includes("-")){const ue=A.birthDate.split("-");ue[0].length===4?(U=ue[1],ne=ue[2]):(ne=ue[0],U=ue[1])}else if(A.birthDate.includes("/")){const ue=A.birthDate.split("/");ne=ue[0],U=ue[1]}return`${ne}/${U}`===M}).map(A=>{let U="";return A.birthDate&&A.birthDate.includes("-")&&A.birthDate.split("-")[0].length===4&&(U=a.getFullYear()-parseInt(A.birthDate.split("-")[0])),{name:A.name,age:U,phone:A.phone}}),V={receitaHoje:w,agendamentosHoje:S,receitaMes:f,ticketMedio:T},_=i.length>1;Ti(e,V,I,C,F,_),Pi(I),Bi()}catch(t){console.error("Erro ao carregar dashboard:",t),e.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full min-h-[60vh] text-slate-500">
                <i class="bi bi-exclamation-circle text-4xl mb-3 text-rose-400"></i>
                <p class="font-medium text-sm">Ocorreu um erro ao carregar os dados.</p>
                <button onclick="window.navigateTo('dashboard-section')" class="mt-4 px-5 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">Tentar Novamente</button>
            </div>
        `}}function Ti(e,t,a,s,o,r){const i=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),n=r?'<span class="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 align-middle">CONSOLIDADO</span>':"";e.innerHTML=`
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
                            ${o.length>0?o.map(d=>{const c=`https://wa.me/${(d.phone||"").replace(/\D/g,"")}?text=${encodeURIComponent(`Olá ${d.name.split(" ")[0]}! A equipa deseja-lhe um Feliz Aniversário! 🎉`)}`;return`
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
    `}function Pi(e){const t=document.getElementById("revenueChart");if(!t)return;va&&va.destroy();const s=t.getContext("2d").createLinearGradient(0,0,0,240);s.addColorStop(0,"rgba(79, 70, 229, 0.15)"),s.addColorStop(1,"rgba(79, 70, 229, 0.01)"),va=new Chart(t,{type:"line",data:{labels:e.labels,datasets:[{label:"Receita (R$)",data:e.data,borderColor:"#6366f1",backgroundColor:s,borderWidth:2.5,pointBackgroundColor:"#ffffff",pointBorderColor:"#6366f1",pointBorderWidth:2,pointRadius:3,pointHoverRadius:5,fill:!0,tension:.35}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{backgroundColor:"#1e293b",padding:12,cornerRadius:8,titleFont:{size:12,family:"Inter",weight:"normal"},bodyFont:{size:13,weight:"bold",family:"Inter"},displayColors:!1,callbacks:{label:function(o){return o.parsed.y!==null?new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(o.parsed.y):""}}}},scales:{y:{beginAtZero:!0,grid:{color:"#f8fafc",drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Inter",size:10},maxTicksLimit:6,callback:function(o){return"R$ "+o}}},x:{grid:{display:!1,drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Inter",size:11,weight:"500"}}}},interaction:{intersect:!1,mode:"index"}}})}function Bi(){document.getElementById("content").addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(!a)return;switch(a.dataset.action){case"goto-agenda":Z("agenda-section");break;case"new-appointment":Z("agenda-section");break;case"goto-pdv":Z("comandas-section");break;case"goto-clients":Z("clientes-section");break;case"open-link":const o=`${window.location.origin}/cliente.html?id=${g.establishmentId||""}`;window.open(o,"_blank");break}})}const nt=e=>D(`/api/services/${e}`),Ai=e=>D("/api/services",{method:"POST",body:JSON.stringify(e)}),Mi=(e,t)=>D(`/api/services/${e}`,{method:"PUT",body:JSON.stringify(t)}),wo=e=>D(`/api/services/${e}`,{method:"DELETE"}),ke=e=>D(`/api/professionals/${e}`),qi=e=>D(`/api/professionals/details/${e}`),ji=e=>D("/api/professionals",{method:"POST",body:JSON.stringify(e)}),Ni=(e,t)=>D(`/api/professionals/${e}`,{method:"PUT",body:JSON.stringify(t)}),ko=e=>D(`/api/professionals/${e}`,{method:"DELETE"}),Ri=e=>{const t=e.map(a=>ko(a));return Promise.all(t)},la=(e,t,a,s="all")=>{const o=`/api/blockages/${e}?startDate=${t}&endDate=${a}&professionalId=${s}`;return D(o)},da=e=>D("/api/blockages",{method:"POST",body:JSON.stringify(e)}),ns=e=>D(`/api/blockages/${e}`,{method:"DELETE"}),$o=e=>D("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:e})}),Ds=document.getElementById("content");let Ts=!1;const Ta=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5",light:"#c7d2fe"},{bg:"#d1fae5",border:"#059669",main:"#059669",light:"#a7f3d0"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48",light:"#fecdd3"},{bg:"#fef3c7",border:"#d97706",main:"#d97706",light:"#fde68a"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490",light:"#a5f3fc"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7",light:"#bae6fd"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed",light:"#ddd6fe"},{bg:"#fce7f3",border:"#db2777",main:"#db2777",light:"#fbcfe8"}];let ca=[],Pa=[],Kt={},Eo=[],R={currentView:window.innerWidth<768?"list":"week",currentDate:new Date,selectedProfessionalId:"all",showInactiveProfs:!1,isSelectionMode:!1,selectedItems:new Set},H={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function ls(e){const t=new Date(e),a=t.getDay(),s=t.getDate()-a+(a===0?-6:1);return t.setDate(s),t.setHours(0,0,0,0),t}function ds(){const e=document.getElementById("profSelectorContainer");if(!e||!g.professionals)return;let t=g.professionals.filter(o=>R.showInactiveProfs||o.status!=="inactive");const s=[...[{id:"all",name:"Todos",photo:null}],...t];e.innerHTML=s.map(o=>{const r=R.selectedProfessionalId===o.id,i=o.name==="Todos"?"T":o.name.charAt(0).toUpperCase(),n=o.id!=="all"?g.professionalColors.get(o.id)||Ta[0]:{main:"#adb5bd",light:"#f1f3f5"};return`
            <div class="prof-pill ${r?"active":""}"
                 data-action="select-professional" data-prof-id="${o.id}"
                 style="--pc: ${n.main}; --pb: ${r?n.bg:""}; --pl: ${n.light};">
                <div class="prof-pill-dot" ${o.photo?`style="background-image: url('${X(o.photo)}'); background-size: cover; background-position: center;"`:""}>
                    ${o.photo?"":i}
                </div>
                <span>${X(o.name==="Todos"?"Todos":o.name.split(" ")[0])}</span>
            </div>`}).join("")}function X(e){return h(e||"")}function Fi(e,t,a,s,o){const r=(e||"").replace(/\D/g,""),i=new Date(o).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),n=new Date(o).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=`Olá, ${t}! Você tem um agendamento de ${a} com ${s} para ${i} às ${n}. Podemos confirmar?`;return`https://wa.me/${r}?text=${encodeURIComponent(d)}`}function Hi(e){const t=document.getElementById("agenda-view");if(!t)return;const a=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],s=ls(R.currentDate),o=new Date;o.setHours(0,0,0,0);let r='<div class="week-container" id="weekScroller">';for(let i=0;i<7;i++){const n=new Date(s);n.setDate(s.getDate()+i);const d=n.toDateString()===o.toDateString(),l=e.filter(u=>new Date(u.startTime).toDateString()===n.toDateString()).sort((u,p)=>new Date(u.startTime)-new Date(p.startTime));let c="";l.length===0?c='<div class="week-empty"><i class="bi bi-dash-lg" style="font-size:1rem;display:block;margin-bottom:4px;"></i>Sem agendamentos</div>':c=l.map(u=>{const m=new Date(u.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),y=g.professionalColors.get(u.professionalId)||{main:"#adb5bd"},w=u.status==="completed",f=R.selectedItems.has(u.id);if(u.type==="blockage")return`<div class="week-event-chip week-blockage">
                        <div class="we-time"><i class="bi bi-lock me-1"></i>${m}</div>
                        <div class="we-client">${X(u.reason)}</div>
                        <div class="we-service">${X(u.professionalName)}</div>
                    </div>`;const S=JSON.stringify(u).replace(/'/g,"&apos;"),T=f?"box-shadow: 0 0 0 2px #4f46e5; background-color: #eff6ff;":"",L=R.isSelectionMode?`<div style="position:absolute; top:6px; right:6px; z-index:1;">
                           <input type="checkbox" style="width:16px; height:16px; accent-color:#4f46e5; pointer-events:none;" ${f?"checked":""}>
                       </div>`:"";return`<div class="week-event-chip ${w?"completed":""}" style="--ec: ${y.main}; ${T}"
                    data-action="edit-appointment" data-appointment='${S}'>
                    ${L}
                    <div class="we-time">${m}</div>
                    <div class="we-client" style="${R.isSelectionMode?"padding-right:20px;":""}">${X(u.clientName)}</div>
                    <div class="we-service">${X(u.serviceName)} · ${X((u.professionalName||"").split(" ")[0])}</div>
                    ${R.isSelectionMode?"":`
                    <div class="we-actions">
                        <button class="we-btn" data-action="open-comanda" data-appointment='${S}' title="Comanda">
                            <i class="bi bi-receipt"></i>
                        </button>
                    </div>`}
                </div>`}).join(""),r+=`<div class="week-day-col">
            <div class="week-day-header ${d?"is-today":""}">
                <div class="wd-name">${d?"Hoje":a[i]}</div>
                <div class="wd-num">${n.getDate()}</div>
            </div>
            <div class="week-day-events">${c}</div>
        </div>`}r+="</div>",t.innerHTML=r,requestAnimationFrame(()=>{const i=document.getElementById("weekScroller");if(i&&window.innerWidth<768){const n=i.querySelector(".is-today");n&&n.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}})}function Oi(e){const t=document.getElementById("agenda-view");if(!t)return;if(e.sort((o,r)=>new Date(o.startTime)-new Date(r.startTime)),e.length===0){t.innerHTML=`
            <div class="list-container" style="min-height:50vh;display:flex;align-items:center;justify-content:center;">
                <div class="text-center" style="max-width:220px;">
                    <div style="width:52px;height:52px;background:#f1f3f5;border-radius:14px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px;">
                        <i class="bi bi-calendar-check" style="font-size:1.3rem;color:#adb5bd;"></i>
                    </div>
                    <p style="font-size:0.85rem;font-weight:600;color:#495057;margin-bottom:4px;">Nenhum agendamento</p>
                    <p style="font-size:0.7rem;color:#868e96;">Toque em + para criar um novo.</p>
                </div>
            </div>`;return}const a={};e.forEach(o=>{const r=new Date(o.startTime).toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});a[r]||(a[r]=[]),a[r].push(o)});let s='<div class="list-container">';Object.entries(a).forEach(([o,r])=>{s+=`<div class="list-date-group">
            <div class="list-date-label">${o}</div>`,r.forEach(i=>{const n=new Date(i.startTime),d=new Date(i.endTime),l=Math.round((d-n)/6e4),c=n.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),u=g.professionalColors.get(i.professionalId)||{main:"#adb5bd"},p=i.status==="completed",m=JSON.stringify(i).replace(/'/g,"&apos;"),y=R.selectedItems.has(i.id),w=R.isSelectionMode?`<div style="display:flex; align-items:center; margin-right: 12px; margin-left: 4px;">
                       <input type="checkbox" style="width:20px; height:20px; accent-color:#4f46e5; pointer-events:none;" ${y?"checked":""}>
                   </div>`:"",f=y?"box-shadow: 0 0 0 2px #4f46e5; background-color: #eff6ff;":"";if(i.type==="blockage"){s+=`<div class="list-card blockage">
                    ${w}
                    <div class="list-card-time"><div class="t-start" style="color:#c92a2a;">${c}</div><div class="t-dur">Bloqueio</div></div>
                    <div class="list-card-dot" style="--dc:#e03131;"></div>
                    <div class="list-card-info">
                        <div class="lc-name" style="color:#c92a2a;">${X(i.reason)}</div>
                        <div class="lc-detail">${X(i.professionalName)}</div>
                    </div>
                </div>`;return}const S=Fi(i.clientPhone,i.clientName,i.serviceName,i.professionalName,i.startTime),T=(i.services||[]).reduce((I,C)=>I+(Number(C.price)||0),0)||Number(i.totalPrice||0)||Number(i.servicePrice||0),L=i.paymentStatus||(i.status==="completed"?"Finalizado":"Agendado"),k=X((i.professionalName||"").split(" ")[0]),x=(i.services||[]).length||(i.serviceName?1:0);s+=`<div class="list-card ${p?"completed":""}" style="${f}"
                data-action="edit-appointment" data-appointment='${m}'>
                ${w}
                <div class="list-card-time">
                    <div class="t-start ${p?"opacity-50 line-through":""}">${c}</div>
                    <div class="t-dur">${l} min</div>
                </div>
                <div class="list-card-dot" style="--dc: ${u.main};"></div>
                <div class="list-card-info">
                    <div class="lc-name">${X(i.clientName)}</div>
                    <div class="lc-detail">${X(i.serviceName)} · ${k}</div>
                    <div class="lc-extra" style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
                        <span style="font-size: 0.65rem; color: #4b5563; background: #f3f4f6; padding: 2px 8px; border-radius: 6px; font-weight: 500;">R$ ${T.toFixed(2).replace(".",",")}</span>
                        ${i.clientPhone?`<span style="font-size: 0.65rem; color: #4b5563; background: #f3f4f6; padding: 2px 8px; border-radius: 6px; font-weight: 500;"><i class="bi bi-telephone"></i> ${X(i.clientPhone)}</span>`:""}
                        <span style="font-size: 0.65rem; color: #4b5563; background: #f3f4f6; padding: 2px 8px; border-radius: 6px; font-weight: 500;">${x} serv.</span>
                        <span style="font-size: 0.65rem; color: ${p?"#059669":"#d97706"}; background: ${p?"#d1fae5":"#fef3c7"}; padding: 2px 8px; border-radius: 6px; font-weight: 600;">${X(L)}</span>
                    </div>
                </div>
                <div class="list-card-status">
                    <div class="lc-status-dot ${p?"done":""}"></div>
                </div>
                ${!p&&!R.isSelectionMode?`
                <div class="list-card-actions">
                    <button class="lc-action-btn wa" data-link="${S}" title="WhatsApp">
                        <i class="bi bi-whatsapp" style="font-size:0.85rem;"></i>
                    </button>
                    <button class="lc-action-btn comanda" data-action="open-comanda" data-appointment='${m}' title="Comanda">
                        <i class="bi bi-receipt"></i>
                    </button>
                </div>`:""}
            </div>`}),s+="</div>"}),s+="</div>",t.innerHTML=s}function Io(){const e=g.allEvents.filter(t=>R.selectedProfessionalId==="all"||t.professionalId===R.selectedProfessionalId);R.currentView==="list"?Oi(e):Hi(e),cs()}function cs(){const e=document.getElementById("batch-delete-container"),t=document.getElementById("agendaFab");e&&(R.isSelectionMode&&R.selectedItems.size>0?(e.innerHTML=`<div class="bg-gray-900 text-white p-3 rounded-xl shadow-xl flex items-center justify-between gap-4 w-full mx-4" style="background:#212529;color:#fff;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:12px;">
            <span class="font-semibold text-sm"><span style="color:#7c3aed; font-size:1.1rem; margin-right:4px;">${R.selectedItems.size}</span> selecionados</span>
            <button data-action="batch-delete" style="background:#e03131;color:#fff;border:none;padding:8px 20px;border-radius:8px;font-size:0.85rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;">
                <i class="bi bi-trash"></i> Excluir
            </button>
        </div>`,e.style.display="block",t&&(t.style.transform="scale(0)")):(e.style.display="none",t&&(t.style.transform="scale(1)")))}function zi(){const e=document.getElementById("currentDateDisplay");if(!e)return;const t=new Date;t.setHours(0,0,0,0);const a=new Date(R.currentDate);if(a.setHours(0,0,0,0),R.currentView==="list")a.toDateString()===t.toDateString()?e.textContent="Hoje":e.textContent=a.toLocaleDateString("pt-BR",{day:"numeric",month:"long"});else{const s=ls(a),o=new Date(s);o.setDate(s.getDate()+6);const r=s.toLocaleDateString("pt-BR",{day:"numeric",month:"short"}),i=o.toLocaleDateString("pt-BR",{day:"numeric",month:"short"});e.textContent=`${r} - ${i}`}}async function Ce(){const e=document.getElementById("agenda-view");if(!e)return;R.selectedItems.clear(),cs(),e.innerHTML='<div style="display:flex;align-items:center;justify-content:center;padding:60px 0;"><div style="width:28px;height:28px;border:2.5px solid #e9ecef;border-top:2.5px solid #4f46e5;border-radius:50%;animation:spin 0.7s linear infinite;"></div></div><style>@keyframes spin{to{transform:rotate(360deg)}}</style>',zi();let t,a;if(R.currentView==="list")t=new Date(R.currentDate),t.setHours(0,0,0,0),a=new Date(t),a.setHours(23,59,59,999);else{const s=ls(R.currentDate);t=new Date(s),a=new Date(s),a.setDate(s.getDate()+6),a.setHours(23,59,59,999)}try{const o=(g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId]).map(async l=>{const[c,u]=await Promise.all([ss(l,t.toISOString(),a.toISOString(),R.selectedProfessionalId==="all"?null:R.selectedProfessionalId),la(l,t.toISOString(),a.toISOString(),R.selectedProfessionalId)]);return{appts:c||[],blockages:u||[]}}),r=await Promise.all(o);let i=[],n=[];if(r.forEach(l=>{i=i.concat(l.appts),n=n.concat(l.blockages)}),!document.getElementById("agenda-view"))return;const d=l=>l.map(c=>({...c,type:c.type||"appointment",professionalName:c.professionalName||(()=>{const u=g.professionals?.find(p=>p.id===c.professionalId);return u?u.name:"Indefinido"})()}));g.allEvents=[...d(i),...d(n)],ds(),Io()}catch(s){console.error(s),document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML=`
                <div class="text-center py-12" style="color:#868e96;">
                    <i class="bi bi-exclamation-triangle" style="font-size:1.5rem;"></i>
                    <p class="mt-2" style="font-size:0.8rem;">Erro ao carregar agenda.</p>
                </div>`)}}async function Vi(){try{const t=(g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId]).map(async i=>{const[n,d,l]=await Promise.all([ke(i),nt(i),De(i)]);return{profs:n||[],services:d||[],estDetails:l}}),a=await Promise.all(t),s=new Map,o=new Map;let r=a[0]?.estDetails;a.forEach(i=>{i.profs.forEach(n=>s.set(n.id,n)),i.services.forEach(n=>o.set(n.id,n))}),g.professionals=Array.from(s.values()),g.services=Array.from(o.values()),Eo=[],r&&(Kt=r.loyaltyProgram||{enabled:!1}),g.professionals.forEach((i,n)=>{g.professionalColors.set(i.id,Ta[n%Ta.length])}),ds()}catch{b("Atenção","Não foi possível carregar os dados da equipa.","error")}}async function So(e={}){R.currentDate=e.targetDate?new Date(e.targetDate):R.currentDate||new Date,R.isSelectionMode=!1,R.selectedItems.clear(),Ds.innerHTML=`
        <div class="flex flex-col h-[calc(100vh-80px)] md:h-auto bg-gray-50 relative font-sans w-full" style="background:#f8f9fa;">

            <div style="background: #fff; padding: 14px 16px; border-bottom: 1px solid #f1f3f5; position: sticky; top: 0; z-index: 10; display:flex; flex-direction:column; gap:16px;">
                
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <button id="btnWeekDays" style="background:transparent; border:none; color:#495057; font-size:1.2rem; padding:4px; cursor:pointer;" title="Opções">
                        <i class="bi bi-sliders"></i>
                    </button>

                    <div class="agenda-view-toggle" style="background: #f1f3f5; padding: 4px; border-radius: 12px; display:flex; gap:4px; margin:0;">
                        <button class="${R.currentView==="list"?"active shadow-sm":""}" data-action="setView" data-view="list" style="border-radius: 8px; padding: 6px 16px; font-weight:600;">Lista</button>
                        <button class="${R.currentView==="week"?"active shadow-sm":""}" data-action="setView" data-view="week" style="border-radius: 8px; padding: 6px 16px; font-weight:600;">Semana</button>
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
        </div>`,document.getElementById("btnPrevDate").addEventListener("click",()=>{R.currentView==="list"?R.currentDate.setDate(R.currentDate.getDate()-1):R.currentDate.setDate(R.currentDate.getDate()-7),Ce()}),document.getElementById("btnNextDate").addEventListener("click",()=>{R.currentView==="list"?R.currentDate.setDate(R.currentDate.getDate()+1):R.currentDate.setDate(R.currentDate.getDate()+7),Ce()}),document.getElementById("btnTodayHeader").addEventListener("click",()=>{R.currentDate=new Date,Ce()});const t=document.querySelectorAll(".agenda-view-toggle button");t.forEach(a=>{a.addEventListener("click",()=>{t.forEach(s=>{s.classList.remove("active","shadow-sm"),s.style.backgroundColor="transparent"}),a.classList.add("active","shadow-sm"),a.style.backgroundColor="#fff",R.currentView=a.dataset.view,Ce()})}),document.getElementById("btnWeekDays").addEventListener("click",()=>{_i()}),Ts||(Ds.addEventListener("click",async a=>{const s=a.target.closest('[data-action="open-comanda"]');if(s){a.stopPropagation();const d=s.dataset.appointment||s.closest("[data-appointment]")?.dataset.appointment;if(!d)return;const l=JSON.parse(d.replace(/&apos;/g,"'")),c=l.status==="completed"?"finalizadas":"em-atendimento",u={selectedAppointmentId:l.id,initialFilter:c};c==="finalizadas"&&l.transaction?.paidAt&&(u.filterDate=typeof l.transaction.paidAt=="object"?new Date(l.transaction.paidAt._seconds*1e3):l.transaction.paidAt),Z("comandas-section",u);return}const o=a.target.closest(".lc-action-btn.wa");if(o){a.stopPropagation(),o.dataset.link&&window.open(o.dataset.link,"_blank");return}if(a.target.closest('[data-action="batch-delete"]')){const d=R.selectedItems.size;await Y("Excluir Selecionados",`Tem certeza que deseja excluir ${d} agendamento(s)? Esta ação não pode ser desfeita.`)&&(await Promise.all(Array.from(R.selectedItems).map(async c=>{try{await Hr(c)}catch{}})),b(`${d} agendamento(s) excluído(s).`,"success"),R.selectedItems.clear(),R.isSelectionMode=!1,Ce());return}const r=a.target.closest('[data-action="select-professional"]');if(r){const d=r.dataset.profId;R.selectedProfessionalId=R.selectedProfessionalId===d&&d!=="all"?"all":d,Ce();return}const i=a.target.closest(".list-card[data-appointment], .week-event-chip[data-appointment]");if(i){if(R.isSelectionMode){a.stopPropagation();const l=i.querySelector('input[type="checkbox"]');if(l){const c=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'")),u=!l.checked;l.checked=u,u?R.selectedItems.add(c.id):R.selectedItems.delete(c.id),(i.classList.contains("week-event-chip")||i.classList.contains("list-card"))&&(u?(i.style.boxShadow="0 0 0 2px #4f46e5",i.style.backgroundColor="#eff6ff"):(i.style.boxShadow="none",i.style.backgroundColor=i.classList.contains("week-event-chip")?"#f8f9fa":"#fff")),cs()}return}const d=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'"));Ba(d);return}if(a.target.closest('[data-action="new-appointment"]')){Ba();return}}),Ts=!0),await Vi(),await Ce()}function _i(){const e=document.getElementById("optionsSheet");if(e){e.remove();return}const t=document.createElement("div");t.id="optionsSheet",t.style.cssText="position:fixed;bottom:0;left:50%;right:auto;transform:translateX(-50%) translateY(100%);width:100%;max-width:440px;background:#fff;border-radius:24px 24px 0 0;z-index:10000;box-shadow:0 -8px 40px rgba(0,0,0,0.15);transition:transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);";const a=R.isSelectionMode?"#fee2e2":"#f0fdf4",s=R.isSelectionMode?"#ef4444":"#16a34a",o=R.isSelectionMode?"bi-x-circle":"bi-check2-square";t.innerHTML=`
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
                    <i class="bi ${o}"></i> ${R.isSelectionMode?"Desativar Modo de Exclusão":"Ativar Seleção para Excluir"}
                </button>
                <p style="font-size:0.75rem; color:#6b7280; text-align:center; margin-top:8px;">${R.isSelectionMode?"Toque num card para desmarcar.":"Permite selecionar vários agendamentos para apagar de uma vez."}</p>
            </div>

            <div style="margin-bottom:16px;">
                <div style="font-size:0.7rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">Equipa</div>
                <label style="display:flex;align-items:center;gap:12px;font-size:0.9rem;font-weight:500;color:#374151;cursor:pointer;padding:8px 0; background:#f9fafb; border-radius:12px; padding:12px 16px;">
                    <input type="checkbox" id="optInactiveToggle" style="width:18px;height:18px;accent-color:#4f46e5;" ${R.showInactiveProfs?"checked":""}>
                    Exibir profissionais inativos na barra superior
                </label>
            </div>
        </div>`;const r=document.createElement("div");r.id="optionsOverlay",r.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:9999;opacity:0;transition:opacity 0.3s;",document.body.appendChild(r),document.body.appendChild(t),requestAnimationFrame(()=>{t.style.transform="translateX(-50%) translateY(0)",r.style.opacity="1"});const i=()=>{t.style.transform="translateX(-50%) translateY(100%)",r.style.opacity="0",setTimeout(()=>{t.remove(),r.remove()},300)};document.getElementById("closeOptSheet").addEventListener("click",i),r.addEventListener("click",i),document.getElementById("optSelectMode").addEventListener("click",()=>{R.isSelectionMode=!R.isSelectionMode,R.isSelectionMode||R.selectedItems.clear(),i(),Io(),R.isSelectionMode&&setTimeout(()=>{b("Modo de Exclusão Ativo.","info")},300)}),document.getElementById("optInactiveToggle").addEventListener("change",n=>{R.showInactiveProfs=n.target.checked,ds()})}function Ps(e){e<1||e>4||(H.step=e,Ba(null,!0))}function Ui(e){return{title:e?"Editar Reserva":"Identificar Cliente",content:`
        <div class="p-5 space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-gray-500 mb-1.5">Nome *</label>
                    <input type="text" id="apptClientName" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" value="${X(H.data.clientName)}">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-gray-500 mb-1.5">Telefone/WhatsApp *</label>
                    <input type="tel" id="apptClientPhone" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" value="${X(H.data.clientPhone)}">
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
        </div>`}}function Wi(){return{title:"Serviços",content:`
        <div class="p-5 space-y-5">
            <div class="flex items-center gap-3">
                <div class="relative flex-1">
                    <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input type="search" id="serviceSearchModalInput" placeholder="Buscar serviço..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg text-sm">
                </div>
                <label class="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                    <input type="checkbox" id="multiServiceToggle" class="w-4 h-4 rounded" ${H.data.selectedServiceIds.length>1?"checked":""}>
                    <span class="text-xs font-semibold text-gray-600">Múltiplos</span>
                </label>
            </div>
            <div id="apptServicesContainer" class="grid grid-cols-2 gap-3 max-h-56 overflow-y-auto">
                ${ca.map(e=>`<div class="service-card p-3 bg-white rounded-xl border ${H.data.selectedServiceIds.includes(e.id)?"border-indigo-500 bg-indigo-50":"border-gray-200"} cursor-pointer" data-service-id="${e.id}">
                        <p class="font-semibold text-sm text-gray-800 truncate">${X(e.name)}</p>
                        <p class="text-xs text-gray-500 mt-0.5">R$ ${e.price.toFixed(2)} · ${e.duration} min</p>
                    </div>`).join("")}
            </div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="2" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="2" class="py-2.5 px-5 bg-gray-900 text-white font-semibold text-sm rounded-lg">Avançar</button>
        </div>`}}function Ji(){return{title:"Profissional",content:`
        <div class="p-5 space-y-5">
            <div class="relative">
                <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input type="search" id="professionalSearchModalInput" placeholder="Buscar na equipa..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg text-sm">
            </div>
            <div id="apptProfessionalContainer" class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-52 overflow-y-auto professional-step-cards">
                ${Pa.map(e=>`<div class="professional-modal-card p-3 bg-white rounded-xl border ${H.data.professionalId===e.id?"border-indigo-500 bg-indigo-50":"border-gray-200"} cursor-pointer text-center" data-professional-id="${e.id}">
                        <div class="w-10 h-10 rounded-full bg-gray-100 mx-auto flex items-center justify-center font-bold text-sm text-gray-500">${X(e.name).charAt(0)}</div>
                        <p class="text-sm font-semibold mt-2 truncate">${X(e.name.split(" ")[0])}</p>
                    </div>`).join("")}
            </div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="3" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="3" class="py-2.5 px-5 bg-gray-900 text-white font-semibold text-sm rounded-lg">Avançar</button>
        </div>`}}function Gi(){const e=H.data.date||new Date().toISOString().split("T")[0];return{title:"Data e Horário",content:`
        <div class="p-5 space-y-5">
            <div class="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
                <div class="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">${X(H.data.clientName).charAt(0)}</div>
                <div class="min-w-0">
                    <p class="font-semibold text-sm text-gray-900 truncate">${X(H.data.clientName)}</p>
                    <p class="text-xs text-gray-500 truncate">${X(H.data.professionalName)}</p>
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
            <button type="submit" class="py-2.5 px-8 bg-indigo-600 text-white font-semibold text-sm rounded-lg flex items-center gap-2"><i class="bi bi-calendar-check"></i> ${H.data.id?"Salvar":"Agendar"}</button>
        </div>`}}async function Ba(e=null,t=!1){const a=document.getElementById("appointmentModal");t||(H={step:1,data:{id:e?.id||null,clientName:e?.clientName||"",clientPhone:e?.clientPhone||"",selectedServiceIds:e?.services?.map(o=>o.id)||[],professionalId:e?.professionalId||null,professionalName:e?.professionalName||"",date:e?.startTime?new Date(e.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],time:e?.startTime?new Date(e.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null,redeemedReward:e?.redeemedReward||null,clientHasRewards:e?.hasRewards||!1,clientLoyaltyPoints:0}}),ca=g.services||[],Pa=(g.professionals||[]).filter(o=>o.status==="active");let s;switch(H.step){case 1:s=Ui(e);break;case 2:s=Wi();break;case 3:s=Ji();break;case 4:s=Gi();break}a.innerHTML=`
        <div class="modal-content max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden m-4 flex flex-col" style="max-height:90vh;">
            <header class="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                <div class="flex items-center gap-3">
                    <span class="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">${H.step}/4</span>
                    <h2 class="text-lg font-bold text-gray-900">${s.title}</h2>
                </div>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
                    <i class="bi bi-x-lg"></i>
                </button>
            </header>
            <form id="appointmentForm" class="flex-1 overflow-y-auto">${s.content}</form>
        </div>`,a.querySelectorAll('[data-action="next-step"]').forEach(o=>o.addEventListener("click",()=>{const r=parseInt(o.dataset.currentStep,10);if(r===1&&(H.data.clientName=a.querySelector("#apptClientName").value.trim(),H.data.clientPhone=a.querySelector("#apptClientPhone").value.trim(),!H.data.clientName))return b("Preencha o nome do cliente.","warning");if(r===2&&H.data.selectedServiceIds.length===0)return b("Selecione um serviço.","warning");if(r===3&&!H.data.professionalId)return b("Escolha um profissional.","warning");Ps(r+1)})),a.querySelectorAll('[data-action="prev-step"]').forEach(o=>o.addEventListener("click",()=>Ps(parseInt(o.dataset.currentStep,10)-1))),a.querySelector('[data-action="close-modal"]')?.addEventListener("click",()=>{a.style.display="none"}),H.step===4&&a.querySelector("#appointmentForm").addEventListener("submit",Qi),a.style.display="flex",H.step===2&&a.querySelectorAll(".service-card").forEach(o=>o.addEventListener("click",()=>{const r=a.querySelector("#multiServiceToggle")?.checked,i=o.classList.contains("selected");r||(a.querySelectorAll(".service-card.selected").forEach(d=>d.classList.remove("selected","border-indigo-500","bg-indigo-50")),H.data.selectedServiceIds=[]);const n=o.dataset.serviceId;i?(o.classList.remove("selected","border-indigo-500","bg-indigo-50"),H.data.selectedServiceIds=H.data.selectedServiceIds.filter(d=>d!==n)):(o.classList.add("selected","border-indigo-500","bg-indigo-50"),H.data.selectedServiceIds.push(n))})),H.step===3&&a.querySelectorAll(".professional-modal-card").forEach(o=>o.addEventListener("click",()=>{a.querySelectorAll(".professional-modal-card.selected").forEach(i=>i.classList.remove("selected","border-indigo-500","bg-indigo-50")),o.classList.add("selected","border-indigo-500","bg-indigo-50"),H.data.professionalId=o.dataset.professionalId;const r=Pa.find(i=>i.id===o.dataset.professionalId);H.data.professionalName=r?r.name:""})),H.step===1&&a.querySelector("#clientSearchInput")?.addEventListener("input",o=>Yi(o.target.value)),H.step===4&&(a.querySelector("#apptDate")?.addEventListener("change",Bs),Bs(),Xi())}async function Qi(e){e.preventDefault();const a=e.target.querySelector('button[type="submit"]');if(!H.data.time||!H.data.selectedServiceIds.length||!H.data.professionalId)return b("Selecione horário, serviço e profissional.","warning");a.disabled=!0,a.innerHTML="Aguarde...";const s=H.data.selectedServiceIds.map(l=>{const c=ca.find(u=>u.id===l);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[o,r]=H.data.time.split(":"),i=new Date(`${H.data.date}T${o}:${r}:00`),d={establishmentId:g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments[0]:g.establishmentId,clientName:H.data.clientName,clientPhone:H.data.clientPhone,services:s,professionalId:H.data.professionalId,professionalName:H.data.professionalName,startTime:i.toISOString(),redeemedReward:H.data.redeemedReward};H.data.id&&(d.id=H.data.id);try{H.data.id?await Fr(H.data.id,d):await Rr(d),b("Agendamento registrado!","success"),document.getElementById("appointmentModal").style.display="none",Ce()}catch(l){b(l.message,"error"),a.disabled=!1,a.textContent="Agendar"}}async function Bs(){const e=document.getElementById("availableTimesContainer"),t=document.getElementById("apptTotalDuration");if(!e)return;const a=H.data.selectedServiceIds.reduce((i,n)=>{const d=ca.find(l=>l.id===n);return i+(d?d.duration+(d.bufferTime||0):0)},0);t&&(t.textContent=`${a} min`);const{professionalId:s,selectedServiceIds:o,date:r}=H.data;if(!s||!o.length||!r){e.innerHTML='<p class="col-span-full text-center text-xs text-gray-400">Selecione serviço e profissional</p>';return}try{const i=g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments[0]:g.establishmentId;let n=await Nr({establishmentId:i,professionalId:s,serviceIds:o,date:r});const d=new Date;if(new Date(r+"T00:00:00").toDateString()===d.toDateString()){const l=d.getHours()*60+d.getMinutes();n=n.filter(c=>{const[u,p]=c.split(":").map(Number);return u*60+p>=l})}e.innerHTML=n.length>0?n.map(l=>`<button type="button" class="p-2 text-sm font-semibold rounded-lg border ${H.data.time===l?"bg-indigo-600 text-white border-indigo-600":"bg-gray-50 text-gray-700 border-gray-200 hover:bg-indigo-50"}" onclick="document.querySelectorAll('#availableTimesContainer button').forEach(b=>{b.classList.remove('bg-indigo-600','text-white','border-indigo-600');b.classList.add('bg-gray-50','text-gray-700','border-gray-200')});this.classList.add('bg-indigo-600','text-white','border-indigo-600');this.classList.remove('bg-gray-50','text-gray-700','border-gray-200');window._selectedTime='${l}';">${l}</button>`).join(""):'<p class="col-span-full text-center text-xs text-gray-400">Sem horários</p>'}catch{e.innerHTML='<p class="col-span-full text-center text-xs text-red-400">Erro</p>'}}function Xi(){const e=document.getElementById("loyaltyRewardsContainer");if(!e)return;const{clientHasRewards:t,clientLoyaltyPoints:a}=H.data,{enabled:s,rewards:o}=Kt;if(!s||!t||!o?.length){e.innerHTML="";return}const r=o.filter(i=>a>=i.points);if(!r.length){e.innerHTML='<p class="text-xs text-gray-400">Sem recompensas disponíveis.</p>';return}e.innerHTML=`<div class="border-t border-gray-100 pt-4">
        <p class="text-xs font-semibold text-gray-500 mb-2">Resgate fidelidade (${a} pts)</p>
        ${r.map(i=>`<label class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg mb-1 cursor-pointer"><input type="radio" name="loyaltyReward" value="${X(i.reward)}" data-points="${i.points}" class="accent-indigo-600"><span class="text-sm">${X(i.reward)} (-${i.points} pts)</span></label>`).join("")}
    </div>`,e.querySelectorAll('input[name="loyaltyReward"]').forEach(i=>{i.addEventListener("change",n=>{n.target.checked&&(H.data.redeemedReward={reward:n.target.value,points:parseInt(n.target.dataset.points,10)})})})}async function Yi(e){const t=document.getElementById("clientSearchResults");if(!t||e.trim().length<3){t&&(t.innerHTML='<p class="text-xs text-gray-400">Digite pelo menos 3 caracteres...</p>');return}t.innerHTML='<div class="text-center py-3"><div class="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div></div>';try{const s=(g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId]).map(n=>it(n,e.trim())),o=await Promise.all(s),r=new Map;o.forEach(n=>{n.forEach(d=>{d.phone?r.set(d.phone,d):r.set(d.id||Math.random().toString(),d)})});const i=Array.from(r.values());if(Eo=i,!i.length){t.innerHTML='<p class="text-xs text-gray-400">Nenhum cliente encontrado.</p>';return}t.innerHTML=i.map(n=>`<div class="client-card p-2.5 bg-white rounded-lg border ${H.data.clientName===n.name&&H.data.clientPhone===n.phone?"border-indigo-500 bg-indigo-50":"border-gray-200"} cursor-pointer flex items-center gap-2" data-client-name="${X(n.name)}" data-client-phone="${X(n.phone)}" data-loyalty-points="${n.loyaltyPoints||0}">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">${X(n.name).charAt(0)}</div>
                <div><p class="text-sm font-semibold text-gray-800">${X(n.name)}</p><p class="text-xs text-gray-500">${X(n.phone)}</p></div>
            </div>`).join(""),t.querySelectorAll(".client-card").forEach(n=>n.addEventListener("click",()=>{H.data.clientName=n.dataset.clientName,H.data.clientPhone=n.dataset.clientPhone,H.data.clientLoyaltyPoints=parseInt(n.dataset.loyaltyPoints||"0",10);const d=Math.min(...(Kt?.rewards||[]).map(l=>l.points));H.data.clientHasRewards=Kt.enabled&&d!==1/0&&H.data.clientLoyaltyPoints>=d,document.getElementById("apptClientName").value=n.dataset.clientName,document.getElementById("apptClientPhone").value=n.dataset.clientPhone,t.querySelectorAll(".client-card").forEach(l=>l.classList.remove("border-indigo-500","bg-indigo-50")),n.classList.add("border-indigo-500","bg-indigo-50")}))}catch{t.innerHTML='<p class="text-xs text-red-400">Erro ao buscar.</p>'}}const Ki=(e,t=null,a=1,s=12)=>{let o=`/api/comandas/${e}?page=${a}&limit=${s}`;return t&&(o+=`&date=${t}`),D(o)},Zi=(e,t)=>D(`/api/appointments/${e}/comanda`,{method:"POST",body:JSON.stringify({items:t})}),Lo=e=>D("/api/sales",{method:"POST",body:JSON.stringify(e)}),Aa=(e,t)=>D(`/api/sales/${e}?date=${t}`),en=(e,t,a)=>{const s=`/api/sales/${e}?startDate=${t}&endDate=${a}`;return D(s)},tn=e=>D(`/api/sales/${e}/reopen`,{method:"POST"}),Co=e=>D(`/api/sales/${e}`,{method:"DELETE"}),As=Object.freeze(Object.defineProperty({__proto__:null,createSale:Lo,deleteSale:Co,getSales:Aa,getSalesByDateRange:en,reopenSale:tn},Symbol.toStringTag,{value:"Module"})),lt=e=>D(`/api/products/${e}`),Do=e=>D("/api/products",{method:"POST",body:JSON.stringify(e)}),To=(e,t)=>D(`/api/products/${e}`,{method:"PUT",body:JSON.stringify(t)}),us=e=>D(`/api/products/${e}`,{method:"DELETE"}),Po=(e,t)=>D(`/api/products/${e}/stock`,{method:"PATCH",body:JSON.stringify(t)}),an=e=>D(`/api/products/${e}/stock-history`),Bo=({startDate:e,endDate:t,productId:a,categoryId:s,establishmentId:o})=>{const r=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&r.append("productId",a),s&&s!=="all"&&r.append("categoryId",s),o&&r.append("establishmentId",o),D(`/api/products/stock-history/report?${r.toString()}`)},sn=Object.freeze(Object.defineProperty({__proto__:null,adjustStock:Po,createProduct:Do,deleteProduct:us,getProducts:lt,getStockHistory:an,getStockReport:Bo,updateProduct:To},Symbol.toStringTag,{value:"Module"})),on=()=>D("/api/cashier/status").catch(e=>{if(e.message.includes("404")||e.message.includes("não encontrada"))return null;throw e}),rn=e=>{const t={establishmentId:e.establishmentId,initialAmount:Number(e.initialAmount),notes:e.notes||""};return console.log("Payload enviado para abrir caixa:",t),D("/api/cashier/open",{method:"POST",body:JSON.stringify(t)})},nn=(e,t)=>{const a={finalAmount:Number(t)};return console.log("Payload enviado para fechar caixa:",a),D(`/api/cashier/close/${e}`,{method:"PUT",body:JSON.stringify(a)})},ln=()=>D("/api/cashier/history").then(e=>e||[]).catch(e=>(console.error("Erro ao buscar histórico:",e),[])),dn=e=>D(`/api/cashier/report/${e}`),ps=e=>D(`/api/packages/${e}`),cn=e=>D("/api/packages",{method:"POST",body:JSON.stringify(e)}),un=(e,t)=>D(`/api/packages/${e}`,{method:"PUT",body:JSON.stringify(t)}),pn=e=>D(`/api/packages/${e}`,{method:"DELETE"}),ua=e=>D(`/api/financial/natures/${e}`),gn=e=>D("/api/financial/natures",{method:"POST",body:JSON.stringify(e)}),bn=e=>D(`/api/financial/natures/${e}`,{method:"DELETE"}),gs=e=>D(`/api/financial/cost-centers/${e}`),mn=e=>D("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(e)}),fn=e=>D(`/api/financial/cost-centers/${e}`,{method:"DELETE"}),Ao=(e,t)=>D(`/api/financial/${e}`,{method:"POST",body:JSON.stringify(t)}),Mo=(e,t={})=>{let a=`/api/financial/${e}`;const s=new URLSearchParams;t.establishmentId&&s.append("establishmentId",t.establishmentId),t.startDate&&s.append("startDate",t.startDate),t.endDate&&s.append("endDate",t.endDate),t.natureId&&s.append("natureId",t.natureId),t.costCenterId&&s.append("costCenterId",t.costCenterId),t.status&&s.append("status",t.status);const o=s.toString();return o&&(a+=`?${o}`),D(a)},qo=(e,t,a)=>D(`/api/financial/${e}/${t}`,{method:"PUT",body:JSON.stringify(a)}),jo=(e,t)=>D(`/api/financial/${e}/${t}`,{method:"DELETE"}),No=(e,t)=>{const a=t.map(s=>D(`/api/financial/${e}/${s}`,{method:"DELETE"}));return Promise.all(a)},Ro=(e,t,a)=>D(`/api/financial/${e}/${t}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),Fo=e=>Ao("payables",e),Ho=e=>Mo("payables",e),xn=(e,t)=>qo("payables",e,t),hn=e=>jo("payables",e),yn=(e,t)=>Ro("payables",e,t),Oo=e=>Ao("receivables",e),zo=e=>Mo("receivables",e),vn=(e,t)=>qo("receivables",e,t),wn=e=>jo("receivables",e),kn=(e,t)=>Ro("receivables",e,t);let v={allComandas:[],catalog:{services:[],products:[],packages:[]},activeFilter:"abertas",selectedComandaId:null,viewMode:"items",isCashierOpen:!1,activeCashierSessionId:null,loyaltySettings:null,establishmentConfig:null,pendingRedemption:null,paging:{page:1,limit:15,total:0},checkoutState:{payments:[],selectedMethod:"dinheiro",installments:1,amountReceived:"",discount:{type:"real",value:0},discountReason:""},isProcessing:!1,showHistoryDate:!1},Fe=null,ze=null,Ms=null;function Vo(e,t){return function(...a){clearTimeout(Ms),Ms=setTimeout(()=>e.apply(this,a),t)}}async function qs(e,t="stay"){if(!e||!e.id)return;e._localUpdatedAt=Date.now(),e._cachedItems=null,e._hasUnsavedChanges=!1,ba(),t==="checkout"&&(v.viewMode="checkout",v.checkoutState.payments||(v.checkoutState.payments=[]),v.checkoutState.selectedMethod="dinheiro",v.checkoutState.amountReceived="",v.checkoutState.discount.value||(v.checkoutState.discount={type:"real",value:0},v.checkoutState.discountReason=""),ie());const a=document.createElement("div");a.id="saving-overlay",a.className="fixed inset-0 bg-gray-900/50 z-[9999] flex items-center justify-center backdrop-blur-sm",a.innerHTML=`
        <div class="bg-white p-5 rounded-2xl shadow-xl flex flex-col items-center animate-fade-in">
            <div class="loader mb-3"></div>
            <p class="text-gray-800 font-bold text-sm">Sincronizando...</p>
        </div>
    `,document.body.appendChild(a);try{const s=(e.comandaItems||[]).filter(o=>o&&o.id&&String(o.id)!=="undefined"&&String(o.id)!=="null").map(o=>{const r={...o};if(r.id=String(o.id),r.type==="product"){const i=r.id;r.productId||(r.productId=i),r.product_id||(r.product_id=i)}if(r.type==="service"){const i=r.id;r.serviceId||(r.serviceId=i),r.service_id||(r.service_id=i)}return r});e.type==="walk-in"&&String(e.id).startsWith("temp-")||await Zi(e.id,s),document.body.contains(a)&&document.body.removeChild(a),t!=="checkout"&&(b("Sucesso","Comanda atualizada!","success"),ie())}catch(s){document.body.contains(a)&&document.body.removeChild(a),console.error("Erro ao salvar:",s),e._hasUnsavedChanges=!0,ie(),b("Erro","Falha ao salvar no servidor: "+s.message,"warning")}}function Te(e){if(!e._cachedItems){let t=[];if(e.status==="completed"){const a=e.comandaItems||e.items||[];t=a.length>0?a:e.services||[]}else{const a=(e.services||[]).map(i=>({...i,_source:"original_service",type:"service"})),s=a.reduce((i,n)=>{const d=String(n.id);return i[d]=(i[d]||0)+1,i},{}),o=[...e.comandaItems||[],...e.items||[]],r=[];o.forEach(i=>{const n=String(i.id);(i.type==="service"||!i.type)&&s[n]>0?s[n]--:r.push({...i,_source:"extra"})}),t=[...a,...r]}return e._cachedItems=t,e._cachedTimestamp=Date.now(),t}return e._cachedItems}function $n(){const e=document.getElementById("comandas-layout");if(e){e.classList.add("detail-view-active");const t=document.getElementById("comanda-detail-container");t&&(t.scrollTop=0)}}function Ve(){const e=document.getElementById("comandas-layout");e&&e.classList.remove("detail-view-active")}function En(){const e=v.allComandas||[],t=e.filter(l=>l.status!=="completed").length,a=e.filter(l=>l.status==="completed"),s=a.reduce((l,c)=>{let u=c.totalAmount!==void 0?Number(c.totalAmount):Te(c).reduce((p,m)=>p+Number(m.price||0),0);return l+u},0),o=a.length>0?s/a.length:0,r=document.getElementById("kpi-abertas"),i=document.getElementById("kpi-pagas"),n=document.getElementById("kpi-vendas"),d=document.getElementById("kpi-ticket");r&&(r.textContent=t),i&&(i.textContent=a.length),n&&(n.textContent=`R$ ${s.toFixed(2).replace(".",",")}`),d&&(d.textContent=`R$ ${o.toFixed(2).replace(".",",")}`)}function In(){const e=new Date().toISOString().split("T")[0];ze.innerHTML=`
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative">
            
            <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full animate-fade-in">
                <div id="cashier-controls" class="flex items-center gap-2">
                    <div class="loader-sm"></div>
                </div>
                
                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                    <button data-action="toggle-history" class="py-1.5 px-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-xs">
                        <i class="bi bi-clock-history"></i> Histórico
                    </button>
                    <button id="btn-new-sale" data-action="new-sale" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-plus-lg"></i> Nova Venda
                    </button>
                </div>
            </div>

            <div id="cashier-alert-box"></div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 animate-fade-in">
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Abertas</span>
                    <span id="kpi-abertas" class="text-xl font-black text-indigo-600 mt-0.5 z-10">0</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Vendas Hoje</span>
                    <span id="kpi-vendas" class="text-xl font-black text-green-600 mt-0.5 z-10">R$ 0,00</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Pagas</span>
                    <span id="kpi-pagas" class="text-xl font-black text-gray-800 mt-0.5 z-10">0</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Ticket Médio</span>
                    <span id="kpi-ticket" class="text-xl font-black text-blue-600 mt-0.5 z-10">R$ 0,00</span>
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 w-full animate-fade-in">
                <div class="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto custom-scrollbar">
                    <button data-filter="todas" class="filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition whitespace-nowrap shadow-sm">Todas</button>
                    <button data-filter="abertas" class="filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition whitespace-nowrap shadow-sm">Abertas</button>
                    <button data-filter="pagas" class="filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition whitespace-nowrap shadow-sm">Fechadas / Pagas</button>
                </div>
                
                <div id="finalizadas-datepicker" class="hidden flex items-center gap-2 bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm w-full md:w-auto">
                    <label for="filter-date" class="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-2">Data:</label>
                    <input type="date" id="filter-date" value="${e}" class="w-full md:w-auto p-1 border-0 rounded bg-gray-50 text-xs font-semibold outline-none focus:ring-1 focus:ring-indigo-500">
                </div>
            </div>

            <div id="comandas-layout" class="flex-1 flex gap-3 min-h-0 w-full animate-fade-in">
                <div id="comandas-list-column" class="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm h-full w-full md:w-80 lg:w-96 flex-shrink-0 transition-all duration-300">
                    <div id="comandas-list" class="p-2 space-y-1.5 overflow-y-auto custom-scrollbar flex-1">
                        <div class="loader mx-auto mt-10"></div>
                    </div>
                    <div id="pagination-container" class="p-2 border-t border-gray-100 bg-gray-50/50 flex-shrink-0 min-h-[40px] flex justify-center items-center rounded-b-xl"></div>
                </div>

                <div id="comanda-detail-container" class="bg-white border border-gray-200 rounded-xl shadow-sm h-full flex-col relative overflow-hidden hidden md:flex flex-1 min-w-0 transition-all duration-300">
                    <div class="flex flex-col items-center justify-center h-full text-center text-gray-400">
                        <i class="bi bi-receipt text-4xl opacity-20 mb-2"></i>
                        <p class="text-sm font-medium">Selecione uma venda</p>
                    </div>
                </div>
            </div>
        </section>
    `,ga(),pa()}function pa(){document.querySelectorAll(".filter-btn").forEach(a=>{a.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.add("bg-white","text-gray-600","border-gray-200")});const e=document.querySelector(`[data-filter="${v.activeFilter}"]`);e&&(e.classList.remove("bg-white","text-gray-600","border-gray-200"),e.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"));const t=document.getElementById("finalizadas-datepicker");t&&t.classList.toggle("hidden",!v.showHistoryDate)}function ga(){const e=document.getElementById("cashier-alert-box"),t=document.getElementById("btn-new-sale");v.isCashierOpen?(e&&(e.innerHTML=""),t&&(t.classList.remove("opacity-50","cursor-not-allowed"),t.disabled=!1)):(e&&(e.innerHTML=`
            <div class="bg-amber-50 border-l-4 border-amber-400 p-3 mb-3 rounded-r-lg animate-fade-in mx-1 shadow-sm">
                <div class="flex items-center">
                    <i class="bi bi-exclamation-triangle text-amber-500 mr-3 text-lg"></i>
                    <p class="text-xs text-amber-800">
                        <strong>Caixa Fechado!</strong> Abra o caixa para realizar operações e novas vendas.
                    </p>
                </div>
            </div>
        `),t&&(t.classList.add("opacity-50","cursor-not-allowed"),t.disabled=!0)),Sn()}function Sn(){const e=document.getElementById("cashier-controls");e&&(v.isCashierOpen?e.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-green-700 bg-green-100 py-1.5 px-2.5 rounded-lg border border-green-200 uppercase tracking-widest shadow-sm"><i class="bi bi-unlock-fill"></i> Caixa Aberto</span>
            <button data-action="close-cashier" class="py-1.5 px-3 bg-red-50 text-red-700 border border-red-200 font-bold rounded-lg hover:bg-red-100 text-xs transition shadow-sm">Fechar Caixa</button>
        `:e.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-red-700 bg-red-100 py-1.5 px-2.5 rounded-lg border border-red-200 uppercase tracking-widest shadow-sm"><i class="bi bi-lock-fill"></i> Caixa Fechado</span>
            <button data-action="open-cashier" class="py-1.5 px-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 text-xs shadow-sm transition">Abrir Caixa</button>
        `)}function ba(){const e=document.getElementById("comandas-list"),t=document.getElementById("pagination-container");if(!e)return;if(!v.isCashierOpen&&v.activeFilter==="abertas"){e.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <i class="bi bi-lock text-3xl text-gray-300 mb-2 block"></i>
                <p class="text-xs font-bold text-gray-600 uppercase tracking-widest">Caixa Fechado</p>
                <p class="text-[10px] text-gray-500 mt-1">Abra o caixa para ver as vendas</p>
            </div>
        `,t&&(t.innerHTML="");return}let a=v.allComandas||[];if(v.activeFilter==="abertas"?a=a.filter(o=>o.status!=="completed"):v.activeFilter==="pagas"&&(a=a.filter(o=>o.status==="completed")),En(),a.length===0){e.innerHTML='<p class="text-center text-gray-400 py-10 text-xs font-medium">Nenhuma venda encontrada para este filtro.</p>',js(t);return}const s=document.createDocumentFragment();a.forEach(o=>{const r=Te(o);let i=0;o.status==="completed"&&o.totalAmount!==void 0&&o.totalAmount!==null?i=Number(o.totalAmount):i=r.reduce((T,L)=>T+Number(L.price||0),0);const d=o.loyaltyRedemption||o.discount&&o.discount.reason&&String(o.discount.reason).toLowerCase().includes("fidelidade")?'<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-4 h-4 ml-1 text-[10px]" title="Prémio Resgatado">🎁</span>':"",l=o.id===v.selectedComandaId,u=new Date(o.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),p=o.type==="walk-in"||typeof o.id=="string"&&o.id.startsWith("temp-"),m=o.status==="completed",y=h(o.clientName||"Cliente sem nome"),w=h(o.professionalName||"Sem profissional");let f="";m?f='<span class="text-[9px] font-bold uppercase text-green-700 bg-green-100 px-1.5 py-0.5 rounded border border-green-200">Paga</span>':p?f='<span class="text-[9px] font-bold uppercase text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded border border-blue-200">Avulsa</span>':f='<span class="text-[9px] font-bold uppercase text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded border border-indigo-200">Agenda</span>';const S=document.createElement("div");S.className=`comanda-card cursor-pointer border border-gray-100 rounded-lg p-2.5 hover:bg-gray-50 transition-colors shadow-sm ${l?"ring-2 ring-indigo-500 bg-indigo-50/50":"bg-white"}`,S.dataset.action="select-comanda",S.dataset.comandaId=o.id,S.innerHTML=`
            <div class="flex justify-between items-start mb-1.5 pointer-events-none">
                <p class="font-bold text-gray-800 truncate flex-1 min-w-0 pr-2 text-xs">${y}</p>
                <div class="flex items-center flex-shrink-0">
                    <p class="font-black ${m?"text-green-600":"text-gray-800"} text-xs">R$ ${i.toFixed(2)}</p>
                    ${d}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none gap-2">
                <div class="flex items-center gap-1.5 min-w-0 flex-1">
                    ${f}
                    <p class="text-[10px] text-gray-500 truncate"><i class="bi bi-person mr-0.5 opacity-50"></i>${w}</p>
                </div>
                <p class="text-[10px] text-gray-500 font-bold flex-shrink-0"><i class="bi bi-clock mr-0.5 opacity-50"></i>${u}</p> 
            </div>
        `,s.appendChild(S)}),e.innerHTML="",e.appendChild(s),js(t)}function js(e){if(!e)return;e.innerHTML="";const{page:t,total:a,limit:s}=v.paging,o=Math.ceil((a||0)/s);if(o===0)return;const r=document.createElement("div");r.className="flex gap-2 justify-center items-center w-full",r.innerHTML=`
        <button data-page="${t-1}" class="px-2.5 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-600 shadow-sm ${t<=1?"opacity-50 cursor-not-allowed":""}" ${t<=1?"disabled":""}>&laquo;</button>
        <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mx-1">Pág ${t} de ${o||1}</span>
        <button data-page="${t+1}" class="px-2.5 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-600 shadow-sm ${t>=o?"opacity-50 cursor-not-allowed":""}" ${t>=o?"disabled":""}>&raquo;</button>
    `,e.appendChild(r),r.querySelectorAll("button[data-page]").forEach(i=>{i.onclick=n=>{n.stopPropagation();const d=parseInt(i.dataset.page,10);d>0&&d<=o&&(v.paging.page=d,he())}})}function ie(){const e=document.getElementById("comanda-detail-container");if(!e)return;const t=v.allComandas.find(w=>w.id===v.selectedComandaId);if(v.viewMode==="checkout"&&t){Ln(t,e);return}const a=`
        <div class="mobile-only-header p-3 border-b border-gray-200 bg-gray-50 flex items-center shadow-sm">
            <button data-action="back-to-list" class="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-100 shadow-sm">
                <i class="bi bi-arrow-left text-sm"></i>
            </button>
            <h3 class="font-bold text-sm text-gray-800 ml-3 uppercase tracking-wider">Detalhes</h3>
        </div>
    `;if(!v.isCashierOpen){e.innerHTML=`
            ${a}
            <div class="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
                <div class="bg-gray-50 p-4 rounded-full mb-3 border border-gray-100">
                    <i class="bi bi-lock text-3xl text-gray-300"></i>
                </div>
                <p class="font-bold text-sm text-gray-700">Caixa Fechado</p>
                <button data-action="open-cashier" class="py-2 px-5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-sm mt-3 text-xs">Abrir Caixa</button>
            </div>
        `;return}if(!t){e.innerHTML=`
            <div class="hidden md:flex flex-col items-center justify-center h-full text-center text-gray-400">
                <i class="bi bi-receipt text-4xl opacity-20 mb-2"></i>
                <p class="text-sm font-medium">Selecione uma venda</p>
                <p class="text-[10px] uppercase tracking-widest mt-1 opacity-70">Clique na lista ao lado</p>
            </div>
        `;return}const s=Te(t),o=t.status==="completed",r=t.type==="walk-in"||typeof t.id=="string"&&t.id.startsWith("temp-"),i=s.reduce((w,f)=>{const S=f._source==="original_service",T=f.id||f.name,L=S?`original-${T}`:`${f.type}-${T}`;return w[L]||(w[L]={...f,quantity:0,sources:[]}),w[L].quantity+=1,f._source&&w[L].sources.push(f._source),w},{}),n=Object.values(i).reduce((w,f)=>w+Number(f.price||0)*f.quantity,0),d=h(t.clientName||"Cliente sem nome"),l=h(t.professionalName||"Profissional não atribuído"),c=t._hasUnsavedChanges,m=`
        <div class="grid grid-cols-3 gap-2 mobile-hidden pt-1">
            <button data-action="add-item" class="col-span-1 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-lg hover:bg-indigo-100 transition border border-indigo-200 text-xs shadow-sm">
                + Item
            </button>
            <button data-action="save-comanda" class="col-span-1 py-2 font-bold rounded-lg transition text-xs ${c?"bg-amber-500 text-white hover:bg-amber-600 shadow-md animate-pulse border-transparent":"bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm"}">
                ${c?"Salvar*":"Salvar"}
            </button>
            <button data-action="go-to-checkout" class="col-span-1 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-sm text-xs">
                Receber
            </button>
        </div>
    `,y=`
        <div class="mobile-fabs-container">
            <button data-action="add-item" class="fab-btn-secondary" title="Adicionar Item">
                <i class="bi bi-plus-lg text-lg"></i>
            </button>
            <button data-action="save-comanda" class="fab-btn-secondary ${c?"bg-amber-500 text-white hover:bg-amber-600":"bg-gray-700 text-white hover:bg-gray-800"}" title="Salvar Alterações">
                <i class="bi bi-save2 text-lg"></i>
            </button>
            <button data-action="go-to-checkout" class="fab-btn-primary" title="Receber / Pagar">
                <i class="bi bi-currency-dollar text-xl"></i>
            </button>
        </div>
    `;e.innerHTML=`
        ${a} 
        <div class="flex-grow overflow-y-auto p-3 pb-24 custom-scrollbar bg-gray-50/30"> 
            <div class="flex justify-between items-start mb-4 border-b border-gray-100 pb-3">
                <div>
                    <h3 class="text-base font-black text-gray-800 truncate max-w-[200px]">${d}</h3>
                    <p class="text-xs text-gray-500 flex items-center gap-1 mt-0.5 font-medium">
                        <i class="bi bi-person opacity-50"></i> ${l}
                    </p>
                    ${r?'<span class="mt-1.5 inline-block px-1.5 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-700 rounded uppercase tracking-widest">Venda Avulsa</span>':`<button data-action="go-to-appointment" data-id="${t.id}" data-date="${t.startTime}" class="text-indigo-600 text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1 mt-1.5">
                             Ver na Agenda <i class="bi bi-arrow-right-short"></i>
                         </button>`}
                </div>
                <div class="flex gap-1.5">
                    ${o?`<button data-action="reopen-appointment" data-id="${t.id}" class="w-7 h-7 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 flex items-center justify-center border border-yellow-200 shadow-sm" title="Reabrir"><i class="bi bi-arrow-counterclockwise text-xs"></i></button>`:""}
                    ${r&&!o?`<button data-action="delete-walk-in" data-id="${t.id}" class="w-7 h-7 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center justify-center border border-red-200 shadow-sm" title="Excluir"><i class="bi bi-trash3 text-xs"></i></button>`:""}
                </div>
            </div>

            <div id="loyalty-container" class="mb-3"></div>

            <div class="space-y-2">
                <h4 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 px-1">Itens do Pedido</h4>
                ${Object.values(i).map(w=>{const f=w.sources&&w.sources.includes("original_service"),S=v.pendingRedemption&&String(v.pendingRedemption.appliedToItemId)===String(w.id),T=w.isReward||S;return`
                    <div class="flex items-center justify-between bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm ${T?"border-yellow-400 bg-yellow-50 ring-1 ring-yellow-200":""}">
                        <div class="flex flex-col w-full gap-2">
                            <div class="flex justify-between items-start">
                                <div class="min-w-0 flex-1 pr-2">
                                    <p class="text-xs font-bold text-gray-800 line-clamp-1 leading-tight">
                                        ${T?"🎁 ":""}
                                        ${h(w.name)}
                                    </p>
                                    <div class="flex items-center mt-1">
                                        ${f?'<span class="text-[8px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded border border-indigo-100 mr-2">Original</span>':""}
                                        <p class="text-[10px] text-gray-500 font-medium">${T?'<span class="text-yellow-700 font-bold bg-yellow-100 px-1 py-0.5 rounded border border-yellow-200">Prémio</span>':`R$ ${(w.price||0).toFixed(2)} un.`}</p>
                                    </div>
                                </div>
                                <span class="font-black text-sm text-gray-900 whitespace-nowrap">R$ ${(w.price*w.quantity).toFixed(2)}</span>
                            </div>
                            
                            <div class="flex justify-end">
                                ${o?`<span class="flex items-center justify-center px-2.5 py-1 bg-gray-100 border border-gray-200 text-gray-600 font-bold text-[10px] uppercase tracking-widest rounded-md">${w.quantity} Qtd</span>`:`
                                    <div class="flex items-center bg-gray-50 rounded-md border border-gray-200 shadow-inner">
                                        ${f?`<span class="text-[10px] font-bold text-gray-500 px-3 py-1 bg-gray-100 rounded-md uppercase tracking-wider">Fixo: ${w.quantity}</span>`:`<button data-action="decrease-qty" data-item-id="${w.id}" data-item-type="${w.type}" class="w-7 h-7 flex items-center justify-center rounded-l-md bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 border-r border-gray-200"><i class="bi bi-dash"></i></button>
                                             <span class="text-xs font-black text-gray-800 w-6 text-center">${w.quantity}</span>
                                             <button data-action="increase-qty" data-item-id="${w.id}" data-item-type="${w.type}" class="w-7 h-7 flex items-center justify-center rounded-r-md bg-white text-gray-600 hover:bg-green-50 hover:text-green-600 border-l border-gray-200"><i class="bi bi-plus"></i></button>`}
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>
                `}).join("")}
                ${Object.keys(i).length===0?'<div class="text-center py-6 text-gray-400 border border-dashed border-gray-300 bg-gray-50 rounded-lg text-xs font-medium">Nenhum item adicionado</div>':""}
            </div>
        </div>

        <footer class="p-3 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10 relative">
            <div class="flex justify-between items-end mb-3 px-1">
                <span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total a Pagar</span>
                <span class="text-2xl font-black text-gray-900 leading-none">R$ ${n.toFixed(2)}</span>
            </div>
            ${o?`
                <div class="bg-green-50 text-green-700 text-center py-2 rounded-lg font-bold border border-green-200 flex items-center justify-center gap-1.5 text-xs shadow-sm">
                    <i class="bi bi-check-circle-fill"></i> Venda Finalizada
                </div>
            `:m}
        </footer>

        ${o?"":y}
    `,!o&&(t.clientId||t.clientName)&&Cn(t,e.querySelector("#loyalty-container"))}function Ln(e,t){const s=Te(e).reduce((p,m)=>p+Number(m.price||0)*(m.quantity||1),0),o=v.checkoutState,r=o.discount||{type:"real",value:0};let i=0;r.type==="percent"?i=s*r.value/100:i=r.value,i>s&&(i=s);const n=s-i,d=o.payments.reduce((p,m)=>p+m.value,0),l=Math.max(0,n-d);(!o.amountReceived||l>0)&&(o.amountReceived=l.toFixed(2));const c=`
        <div class="mobile-only-header p-3 border-b border-gray-200 bg-gray-50 flex items-center shadow-sm">
            <button data-action="back-to-items" class="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-100 shadow-sm">
                <i class="bi bi-arrow-left text-sm"></i>
            </button>
            <h3 class="font-bold text-sm text-gray-800 ml-3 uppercase tracking-wider">Pagamento</h3>
        </div>
    `;t.innerHTML=`
        ${c}
        <div class="flex-grow overflow-y-auto p-4 pb-24 custom-scrollbar bg-gray-50/50">
            
            <div class="text-center mb-5 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subtotal: <span id="checkout-subtotal-display" class="text-gray-600">R$ ${s.toFixed(2)}</span></p>
                
                <div class="flex flex-col items-center justify-center gap-2 mt-3 mb-2">
                     <div class="flex items-center gap-2">
                         <span class="text-[10px] font-bold text-red-400 uppercase tracking-widest"><i class="bi bi-tag-fill mr-1"></i>Desc:</span>
                         <div class="flex border border-gray-300 rounded-lg bg-white overflow-hidden shadow-inner w-32">
                             <input type="number" id="discount-value" value="${r.value}" class="w-16 p-1.5 text-center text-xs font-black text-red-500 outline-none bg-transparent" placeholder="0">
                             <select id="discount-type" class="bg-gray-50 text-[10px] font-bold text-gray-600 border-l border-gray-200 p-1.5 outline-none">
                                 <option value="real" ${r.type==="real"?"selected":""}>R$</option>
                                 <option value="percent" ${r.type==="percent"?"selected":""}>%</option>
                             </select>
                         </div>
                     </div>
                     <input type="text" id="discount-reason" class="w-48 p-1.5 text-[10px] border border-gray-200 rounded-md text-center focus:border-indigo-400 outline-none text-gray-600 bg-gray-50" placeholder="Motivo do desconto" value="${o.discountReason||""}">
                </div>

                <p class="text-3xl font-black text-gray-900 mt-2" id="checkout-total-display">R$ ${n.toFixed(2)}</p>
                
                <div id="checkout-status-msg" class="mt-1.5">
                    ${l<=.01?'<p class="text-emerald-500 font-black text-sm uppercase tracking-widest"><i class="bi bi-check2-circle"></i> Pago</p>':`<p class="text-red-500 font-bold text-xs">Faltam: <span id="checkout-remaining-display">R$ ${l.toFixed(2)}</span></p>`}
                </div>
            </div>

            <div class="space-y-2 mb-5">
                ${o.payments.map((p,m)=>`
                    <div class="flex justify-between items-center bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-2">
                             <div class="bg-gray-100 px-2 py-1 rounded border border-gray-200">
                                <span class="font-bold text-[10px] uppercase tracking-widest text-gray-600">${p.method}</span>
                             </div>
                             ${p.installments>1?`<span class="text-[9px] font-bold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded border border-purple-200">${p.installments}x</span>`:""}
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="font-black text-sm text-gray-800">R$ ${p.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${m}" class="text-gray-400 hover:text-red-500 hover:bg-red-50 w-6 h-6 rounded flex items-center justify-center transition-colors"><i class="bi bi-trash3 text-[10px]"></i></button>
                        </div>
                    </div>
                `).join("")}
            </div>

            ${l>.01?`
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-100 pb-1.5">Adicionar Pagamento</label>
                <div class="grid grid-cols-3 gap-1.5 mb-3">
                    ${["dinheiro","pix","debito","credito","crediario"].map(p=>`
                        <button data-action="select-method" data-method="${p}" class="p-1.5 rounded-md border text-[9px] font-bold uppercase tracking-wider transition-colors ${o.selectedMethod===p?"bg-indigo-600 text-white border-indigo-600 shadow-sm":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-white"}">
                            ${p}
                        </button>
                    `).join("")}
                </div>
                
                ${["credito","crediario"].includes(o.selectedMethod)?`
                    <div class="mb-3">
                        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Parcelas</label>
                        <select id="checkout-installments" class="w-full mt-0.5 p-1.5 border border-gray-200 rounded-md text-xs font-bold text-gray-700 bg-gray-50 outline-none focus:border-indigo-400">
                            ${Array.from({length:12},(p,m)=>`<option value="${m+1}" ${o.installments===m+1?"selected":""}>${m+1}x</option>`).join("")}
                        </select>
                    </div>
                `:""}

                <div class="flex items-end gap-2">
                    <div class="flex-grow relative">
                        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Valor</label>
                        <span class="absolute left-2.5 bottom-2 text-gray-400 font-bold text-sm">R$</span>
                        <input type="number" id="checkout-amount" step="0.01" class="w-full p-1.5 pl-8 border border-gray-300 rounded-lg text-sm font-black text-gray-800 outline-none focus:border-indigo-500 shadow-inner mt-0.5" value="${l.toFixed(2)}">
                    </div>
                    <button data-action="add-payment-checkout" class="h-[34px] px-4 bg-gray-800 text-white font-bold text-xs rounded-lg hover:bg-gray-900 transition shadow-sm uppercase tracking-wider">OK</button>
                </div>
            </div>
            `:""}
        </div>

        <footer class="p-3 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] grid grid-cols-2 gap-2 z-10 relative">
            <button data-action="back-to-items" class="py-2.5 bg-white border border-gray-300 text-gray-700 font-bold text-xs rounded-lg hover:bg-gray-50 transition shadow-sm">Voltar</button>
            <button data-action="finalize-checkout" class="py-2.5 bg-green-600 text-white font-bold text-xs rounded-lg hover:bg-green-700 transition shadow-sm flex items-center justify-center gap-1.5"><i class="bi bi-check2-circle"></i> Finalizar</button>
        </footer>
    `;const u=()=>{const p=v.checkoutState.discount.type,m=v.checkoutState.discount.value;let y=p==="percent"?s*m/100:m;y>s&&(y=s);const w=s-y,f=v.checkoutState.payments.reduce((x,I)=>x+I.value,0),S=Math.max(0,w-f),T=t.querySelector("#checkout-total-display");T&&(T.textContent=`R$ ${w.toFixed(2)}`);const L=t.querySelector("#checkout-status-msg");L&&(S<=.01?L.innerHTML='<p class="text-emerald-500 font-black text-sm uppercase tracking-widest"><i class="bi bi-check2-circle"></i> Pago</p>':L.innerHTML=`<p class="text-red-500 font-bold text-xs">Faltam: <span id="checkout-remaining-display">R$ ${S.toFixed(2)}</span></p>`);const k=t.querySelector("#checkout-amount");k&&S>0&&document.activeElement!==k&&(k.value=S.toFixed(2))};t.querySelector("#discount-value")?.addEventListener("input",p=>{const m=parseFloat(p.target.value)||0;v.checkoutState.discount.value=m,u()}),t.querySelector("#discount-type")?.addEventListener("change",p=>{v.checkoutState.discount.type=p.target.value,u()}),t.querySelector("#discount-reason")?.addEventListener("input",p=>{v.checkoutState.discountReason=p.target.value}),t.querySelector("#checkout-amount")?.addEventListener("input",p=>{v.checkoutState.amountReceived=p.target.value}),t.querySelector("#checkout-installments")?.addEventListener("change",p=>{v.checkoutState.installments=parseInt(p.target.value,10)})}async function Cn(e,t){if(!t)return;const a=v.loyaltySettings;if(!a||!a.enabled)return;let s=null;try{if(e.clientId)s=await fo(g.establishmentId,e.clientId);else if(e.clientName){const n=await it(g.establishmentId,e.clientName,1);n&&n.length>0&&(s=n[0])}}catch(n){console.warn("Erro ao buscar dados de fidelidade",n)}if(!s||s.loyaltyPoints===void 0)return;const o=Number(s.loyaltyPoints)||0,i=(a.tiers||a.rewards||[]).filter(n=>{const d=Number(n.costPoints||n.points||0);return d>0&&o>=d});if(i.length>0){const n=document.createElement("div");n.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-3 shadow-sm flex justify-between items-center animate-fade-in",n.innerHTML=`
            <div class="flex items-center gap-2">
                <div class="bg-white p-1.5 rounded-lg text-yellow-500 shadow-sm border border-yellow-100">
                    <i class="bi bi-star-fill text-lg"></i>
                </div>
                <div>
                    <p class="text-[10px] font-black uppercase tracking-widest text-yellow-800">Prémio Disponível!</p>
                    <p class="text-[9px] text-yellow-700 font-bold">Saldo: ${o} pts</p>
                </div>
            </div>
        `;const d=document.createElement("button");d.innerHTML="<i class='bi bi-gift mr-1'></i> Resgatar",d.className="text-[9px] font-black uppercase tracking-wider bg-yellow-500 text-white px-2.5 py-1.5 rounded shadow-sm hover:bg-yellow-600 transition-colors",d.onclick=()=>Dn(i,e),n.appendChild(d),t.innerHTML="",t.appendChild(n)}}function Dn(e,t){const a=`
        <div class="space-y-3">
            <p class="text-xs text-gray-500 mb-3 font-medium">O cliente possui pontos suficientes para resgatar os seguintes itens:</p>
            <div class="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
                ${e.map(r=>{const i=r.costPoints||r.points||0,n=r.name||r.reward,d=r.type||"money",l=r.discount?parseFloat(r.discount).toFixed(2):"0.00";let c="",u="bg-gray-100 text-gray-600";switch(d){case"service":c="Serviço",u="bg-indigo-100 text-indigo-700";break;case"product":c="Produto",u="bg-green-100 text-green-700";break;case"package":c="Pacote",u="bg-purple-100 text-purple-700";break;case"money":default:c="Valor",u="bg-yellow-100 text-yellow-700";break}return`
                    <button data-action="select-reward" data-reward-id="${r.id||n}" class="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group shadow-sm">
                        <div class="text-left flex-1 min-w-0 pr-2">
                            <div class="flex items-center gap-1.5 mb-1">
                                <span class="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border border-white/0 group-hover:border-yellow-200 ${u}">${c}</span>
                                <p class="font-bold text-gray-800 group-hover:text-yellow-700 text-xs truncate">${h(n)}</p>
                            </div>
                            <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Custo: ${i} pts</p>
                        </div>
                        <div class="text-right flex-shrink-0">
                            <span class="block text-xs font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">Desc. R$ ${l}</span>
                        </div>
                    </button>
                `}).join("")}
            </div>
        </div>
    `,{modalElement:s,close:o}=me({title:"🎁 Resgatar Prémio",contentHTML:a,maxWidth:"max-w-md"});s.addEventListener("click",r=>{const i=r.target.closest('[data-action="select-reward"]');if(i){const n=i.dataset.rewardId,d=e.find(l=>l.id&&l.id==n||(l.name||l.reward)==n);d&&(Tn(d,t),o())}})}async function Tn(e,t){const a=Number(e.costPoints||e.points||0),s=e.name||e.reward,o=e.type||"money";if(o==="money"){const d=parseFloat(e.discount)||0;if(d<=0){b("Erro","O valor do desconto configurado é inválido.","error");return}v.checkoutState.discount={type:"real",value:d},v.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,v.pendingRedemption={rewardId:e.id||null,name:s,cost:a,type:"money"},b("Sucesso",`Prémio "${s}" resgatado! Desconto de R$ ${d.toFixed(2)} aplicado.`,"success"),ie();return}const r=Te(t),i=e.itemId?String(e.itemId):null;if(!i){b("Erro de Configuração",`O prémio "${s}" não tem um item vinculado nas configurações.`,"error");return}const n=r.find(d=>{const l=d.id?String(d.id):null,c=d.serviceId?String(d.serviceId):d.service_id?String(d.service_id):null,u=d.productId?String(d.productId):d.product_id?String(d.product_id):null;return o==="service"?l===i||c===i:o==="product"?l===i||u===i:o==="package"?l===i:!1});if(n){let d=parseFloat(e.discount);(!d||d<=0)&&(d=parseFloat(n.price||0)),v.checkoutState.discount={type:"real",value:d},v.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,v.pendingRedemption={rewardId:e.id||null,name:s,cost:a,type:o,appliedToItemId:n.id},b("Sucesso",`Prémio "${s}" resgatado! Item encontrado e desconto de R$ ${d.toFixed(2)} aplicado.`,"success"),ie()}else b("Item Não Encontrado",`Para resgatar o prémio "${s}", o ${o==="service"?"serviço":o==="product"?"produto":"pacote"} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`,"warning")}function Pn(){if(!v.isCashierOpen)return b("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");const{modalElement:e,close:t}=me({title:"Adicionar Item",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-3xl"}),a=()=>{const o=e.querySelector("#add-item-content");o.innerHTML=`
            <div class="relative mb-4">
                <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none text-xs bg-gray-50 focus:bg-white transition-colors">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-gray-50 p-2 rounded-xl border border-gray-100"><h4 class="font-black mb-2 text-center text-[10px] uppercase tracking-widest text-indigo-500">Serviços</h4><div id="modal-service-list" class="space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar"></div></div>
                <div class="bg-gray-50 p-2 rounded-xl border border-gray-100"><h4 class="font-black mb-2 text-center text-[10px] uppercase tracking-widest text-emerald-500">Produtos</h4><div id="modal-product-list" class="space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar"></div></div>
                <div class="bg-gray-50 p-2 rounded-xl border border-gray-100"><h4 class="font-black mb-2 text-center text-[10px] uppercase tracking-widest text-purple-500">Pacotes</h4><div id="modal-package-list" class="space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar"></div></div>
            </div>`;const r=(n="")=>{const d=n.toLowerCase(),l={service:'<i class="bi bi-scissors text-indigo-500"></i>',product:'<i class="bi bi-box-seam text-emerald-500"></i>',package:'<i class="bi bi-boxes text-purple-500"></i>'},c={"modal-service-list":{items:v.catalog.services,type:"service"},"modal-product-list":{items:v.catalog.products,type:"product"},"modal-package-list":{items:v.catalog.packages,type:"package"}};Object.entries(c).forEach(([u,{items:p,type:m}])=>{const y=document.getElementById(u);if(!y)return;const w=p.filter(f=>f.name.toLowerCase().includes(d)).slice(0,50);y.innerHTML=w.map(f=>f.id?`
                    <button data-action="select-item-for-quantity" data-item-type="${m}" data-item-id="${f.id}" class="flex items-center gap-2 w-full p-2 bg-white border border-gray-200 rounded hover:border-indigo-300 shadow-sm transition-all text-left group">
                        <div class="flex-shrink-0 w-6 h-6 rounded bg-gray-50 flex items-center justify-center text-xs group-hover:bg-indigo-50">${l[m]}</div>
                        <span class="flex-grow text-[10px] font-bold text-gray-700 truncate group-hover:text-indigo-700">${h(f.name)}</span>
                        <span class="font-black text-[10px] text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 whitespace-nowrap">R$ ${f.price.toFixed(2)}</span>
                    </button>
                `:"").join("")||'<p class="text-[9px] font-bold uppercase tracking-widest text-gray-400 text-center py-4 border border-dashed border-gray-300 rounded-lg">Vazio</p>'})};r();const i=document.getElementById("item-search-input");i.addEventListener("input",Vo(n=>{r(n.target.value)},300)),setTimeout(()=>i.focus(),100)},s=o=>{let r=1;const i=e.querySelector("#add-item-content"),n=()=>{document.getElementById("quantity-display").textContent=r,document.getElementById("quantity-minus-btn").disabled=r<=1};i.innerHTML=`
            <div class="text-center p-4 relative">
                <button data-action="back-to-catalog" class="absolute top-2 left-0 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-800 bg-gray-100 px-2 py-1 rounded border border-gray-200 transition-colors flex items-center gap-1">
                    <i class="bi bi-arrow-left"></i> Voltar
                </button>
                <div class="mt-8 mb-4">
                    <h3 class="font-black text-lg text-gray-800 leading-tight">${h(o.name)}</h3>
                    <p class="text-xs text-gray-500 font-bold mt-1 bg-gray-100 inline-block px-2 py-0.5 rounded-full border border-gray-200">R$ ${o.price.toFixed(2)} / un</p>
                </div>
                <div class="my-6 flex items-center justify-center gap-4">
                    <button id="quantity-minus-btn" class="w-10 h-10 rounded-lg bg-white border border-gray-300 text-lg font-black text-gray-600 hover:bg-gray-100 shadow-sm transition disabled:opacity-30"><i class="bi bi-dash"></i></button>
                    <span id="quantity-display" class="text-3xl font-black w-16 text-center text-indigo-600 bg-indigo-50 rounded-lg py-1 border border-indigo-100 shadow-inner">${r}</span>
                    <button id="quantity-plus-btn" class="w-10 h-10 rounded-lg bg-white border border-gray-300 text-lg font-black text-gray-600 hover:bg-gray-100 shadow-sm transition"><i class="bi bi-plus"></i></button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-3 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition shadow-sm uppercase tracking-widest">Adicionar Item</button>
            </div>
        `,document.getElementById("quantity-minus-btn").onclick=()=>{r>1&&(r--,n())},document.getElementById("quantity-plus-btn").onclick=()=>{r++,n()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await Uo(o,r),t()}};e.addEventListener("click",o=>{const r=o.target.closest('[data-action="select-item-for-quantity"]'),i=o.target.closest('[data-action="back-to-catalog"]');if(r){const{itemType:n,itemId:d}=r.dataset,c=(v.catalog[n+"s"]||[]).find(u=>u.id===d);c&&s({...c,type:n})}else i&&a()}),a()}async function Ma(e=null){if(!v.isCashierOpen)return b("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");if(!g.professionals||g.professionals.length===0)try{g.professionals=await ke(g.establishmentId)}catch{return b("Erro","Não foi possível carregar profissionais.","error")}const a=`
        <form id="new-sale-form" class="space-y-4">
            <div class="relative">
                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Cliente</label>
                <i class="bi bi-search absolute left-3 top-[28px] text-gray-400 text-xs"></i>
                <input type="text" id="client-search" class="w-full pl-8 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none text-xs font-semibold text-gray-800 transition-colors" placeholder="Digite nome ou telefone..." autocomplete="off">
                <input type="hidden" id="selected-client-id" required>
                <ul id="client-suggestions" class="hidden absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1 custom-scrollbar"></ul>
                <button type="button" data-action="new-client-from-sale" class="text-[10px] font-bold text-indigo-500 hover:text-indigo-700 uppercase tracking-widest mt-1.5 flex items-center gap-1 transition-colors"><i class="bi bi-person-plus-fill"></i> Cadastrar Novo Cliente</button>
            </div>
            <div>
                <label for="new-sale-professional" class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Profissional Atendente</label>
                <select id="new-sale-professional" required class="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 transition-colors">
                    <option value="">-- Selecione --</option>
                    ${g.professionals.map(d=>`<option value="${d.id}">${h(d.name)}</option>`).join("")}
                </select>
            </div>
            <div class="pt-2">
                <button type="submit" id="btn-start-sale" class="w-full bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest py-2.5 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 transition shadow-sm flex items-center justify-center gap-1.5">
                    <i class="bi bi-cart-plus"></i> Iniciar Venda
                </button>
            </div>
        </form>
    `,{modalElement:s}=me({title:"Nova Venda Avulsa",contentHTML:a,maxWidth:"max-w-sm"}),o=s.querySelector("#client-search"),r=s.querySelector("#client-suggestions"),i=s.querySelector("#selected-client-id");e&&(i.value=e.id,o.value=`${e.name} (${e.phone||"Sem tel"})`,o.classList.add("bg-green-50","border-green-300","text-green-800")),o.addEventListener("input",Vo(async d=>{const l=d.target.value.trim();if(i.value="",o.classList.remove("bg-green-50","border-green-300","text-green-800"),l.length<2){r.classList.add("hidden");return}try{r.innerHTML='<li class="p-2 text-xs text-gray-500 text-center"><div class="loader-small mx-auto"></div></li>',r.classList.remove("hidden");const c=await it(g.establishmentId,l,10);c.length===0?r.innerHTML='<li class="p-3 text-xs font-bold text-gray-400 text-center uppercase tracking-widest">Nenhum cliente</li>':r.innerHTML=c.map(u=>`<li data-client-id="${u.id}" data-client-name="${u.name}" data-client-phone="${u.phone}" class="p-2 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors"><div class="font-bold text-xs text-gray-800">${h(u.name)}</div><div class="text-[10px] font-medium text-gray-500"><i class="bi bi-telephone opacity-50 mr-1"></i>${u.phone||"Sem telefone"}</div></li>`).join("")}catch{r.classList.add("hidden")}},400)),r.addEventListener("click",d=>{const l=d.target.closest("li[data-client-id]");l&&(i.value=l.dataset.clientId,i.dataset.name=l.dataset.clientName,i.dataset.phone=l.dataset.clientPhone,o.value=`${l.dataset.clientName}`,o.classList.add("bg-green-50","border-green-300","text-green-800"),r.classList.add("hidden"))}),document.addEventListener("click",d=>{!o.contains(d.target)&&!r.contains(d.target)&&r.classList.add("hidden")}),s.querySelector("#new-sale-form").addEventListener("submit",Rn);const n=s.querySelector('[data-action="new-client-from-sale"]');n&&n.addEventListener("click",d=>{d.preventDefault(),s.style.display="none",Bn()})}function Bn(){me({title:"Cadastrar Novo Cliente",contentHTML:`
        <form id="comandas_clientRegistrationForm" class="flex flex-col h-full bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div class="grid grid-cols-1 gap-3 mb-4">
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Nome Completo *</label>
                    <input type="text" id="regClientName" required class="w-full p-2 rounded-lg border border-gray-300 text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 shadow-inner bg-white">
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">WhatsApp (ID) *</label>
                    <input type="tel" id="regClientPhone" required class="w-full p-2 rounded-lg border border-gray-300 text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 shadow-inner bg-white" placeholder="Apenas números">
                </div>
            </div>
            <button type="submit" class="w-full py-2.5 bg-green-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-green-700 transition shadow-sm flex items-center justify-center gap-1.5">
                <i class="bi bi-save2"></i> Salvar Cliente
            </button>
        </form>
    `,maxWidth:"max-w-sm"});const t=document.getElementById("comandas_clientRegistrationForm");t&&t.addEventListener("submit",An)}async function An(e){e.preventDefault();const t=document.getElementById("comandas_clientRegistrationForm");if(!t)return;const a=t.querySelector("#regClientName"),o=t.querySelector("#regClientPhone").value.replace(/\D/g,"");if(!a.value||!o)return b("Erro","Nome e Telefone são obrigatórios.","error");try{const r=await Ci(g.establishmentId,o);if(r)b("Atenção","Cliente já cadastrado.","info"),document.getElementById("genericModal").style.display="none",Ma(r);else{const i=await ho({establishmentId:g.establishmentId,name:a.value,phone:o});b("Sucesso","Cliente cadastrado!","success"),document.getElementById("genericModal").style.display="none",Ma(i)}}catch(r){b("Erro",r.message,"error")}}async function Mn(){const e=`
        <form id="open-cashier-form" class="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div>
                <label for="initial-amount" class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 text-center">Fundo de Caixa (Troco Inicial)</label>
                <div class="relative max-w-xs mx-auto">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-black text-sm">R$</span>
                    <input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-2 pl-9 border border-gray-300 rounded-lg text-lg font-black text-gray-900 bg-white focus:ring-2 focus:ring-green-500 outline-none shadow-inner text-center" placeholder="0.00" value="0.00">
                </div>
            </div>
            <button type="submit" class="w-full bg-green-600 text-white font-bold text-xs uppercase tracking-widest py-2.5 rounded-lg hover:bg-green-700 transition shadow-sm mt-4 flex items-center justify-center gap-1.5"><i class="bi bi-unlock-fill"></i> Confirmar Abertura</button>
        </form>
    `,{modalElement:t}=me({title:"Abrir Caixa",contentHTML:e,maxWidth:"max-w-xs"});t.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const s=parseFloat(document.getElementById("initial-amount").value);if(isNaN(s)||s<0)return b("Valor Inválido","Insira um valor válido.","error");try{const o=await rn({establishmentId:g.establishmentId,initialAmount:parseFloat(s.toFixed(2))});v.isCashierOpen=!0,v.activeCashierSessionId=o.id,document.getElementById("genericModal").style.display="none",b("Sucesso!",`Caixa aberto (R$ ${s.toFixed(2)})`,"success"),ga(),await he()}catch(o){b("Erro",`Falha ao abrir caixa: ${o.message}`,"error")}})}async function qn(){const e=v.activeCashierSessionId;if(e)try{const t=await dn(e),a=`
            <form id="close-cashier-form" class="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div class="grid grid-cols-2 gap-2 text-center mb-1">
                    <div class="bg-blue-50 p-2 rounded-lg border border-blue-100 shadow-sm"><p class="text-[9px] text-blue-500 uppercase font-bold tracking-widest mb-0.5">Abertura</p><p class="text-sm font-black text-blue-700">R$ ${t.initialAmount.toFixed(2)}</p></div>
                    <div class="bg-green-50 p-2 rounded-lg border border-green-100 shadow-sm"><p class="text-[9px] text-green-500 uppercase font-bold tracking-widest mb-0.5">Vendas Dinheiro</p><p class="text-sm font-black text-green-700">R$ ${t.cashSales.toFixed(2)}</p></div>
                </div>
                <div class="bg-gray-900 text-white p-3 rounded-xl text-center shadow-md mb-4 border border-gray-700">
                    <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Esperado em Gaveta</p>
                    <p class="text-3xl font-black tracking-tight text-white drop-shadow">R$ ${t.expectedAmount.toFixed(2)}</p>
                </div>
                
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                    <label for="final-amount" class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 text-center">Contagem Final (Gaveta)</label>
                    <div class="relative max-w-xs mx-auto">
                        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-black text-sm">R$</span>
                        <input type="number" step="0.01" min="0" id="final-amount" required class="w-full p-2 pl-9 border border-gray-300 rounded-lg text-lg font-black text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none shadow-inner text-center transition-colors" placeholder="0.00" value="${t.expectedAmount.toFixed(2)}">
                    </div>
                </div>
                <button type="submit" class="w-full bg-red-600 text-white font-bold text-xs uppercase tracking-widest py-2.5 rounded-lg hover:bg-red-700 transition shadow-sm mt-2 flex items-center justify-center gap-1.5"><i class="bi bi-lock-fill"></i> Confirmar Fecho</button>
            </form>
        `,{modalElement:s}=me({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-sm"});s.querySelector("#close-cashier-form").addEventListener("submit",async o=>{o.preventDefault();const r=parseFloat(document.getElementById("final-amount").value);if(isNaN(r)||r<0)return b("Valor Inválido","Insira um valor final válido.","error");try{await nn(e,r),v.isCashierOpen=!1,v.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",ga(),await he(),b("Sucesso!","Caixa fechado com sucesso!","success")}catch(i){b("Erro",`Falha ao fechar caixa: ${i.message}`,"error")}})}catch(t){b("Erro",`Falha ao carregar relatório: ${t.message}`,"error")}}async function jn(e){if(v.activeFilter===e)return;v.activeFilter=e,v.paging.page=1,pa(),Ve(),v.selectedComandaId=null,v.viewMode="items";const t=document.getElementById("comandas-list");t&&(t.innerHTML='<div class="loader mx-auto mt-10"></div>'),await he()}function _o(e){v.selectedComandaId=e,v.viewMode="items",v.pendingRedemption=null,v.checkoutState.discount={type:"real",value:0},v.checkoutState.discountReason="",ba(),$n(),ie()}async function Uo(e,t){const a=v.allComandas.find(r=>r.id===v.selectedComandaId);if(!a)return;if(!e.id||String(e.id)==="undefined"){b("Erro","Item sem identificador. Não foi possível adicionar.","error");return}const s=parseFloat(e.price)||0,o=Array(t).fill(0).map(()=>{const r={id:String(e.id),name:e.name,price:s,type:e.type,isReward:e.isReward||!1,pointsCost:e.pointsCost||0};return e.type==="product"?(r.productId=r.id,r.product_id=r.id):e.type==="service"&&(r.serviceId=r.id,r.service_id=r.id),r});a.comandaItems=a.comandaItems||[],a.comandaItems.push(...o),a._cachedItems=null,a._hasUnsavedChanges=!0,ie()}async function Ns(e,t){const a=v.allComandas.find(r=>r.id===v.selectedComandaId);if(!a)return;let s=!1,o=(a.comandaItems||[]).findIndex(r=>r.id==e&&r.type===t);o>-1&&(a.comandaItems.splice(o,1),s=!0),s&&(a._cachedItems=null,a._hasUnsavedChanges=!0,ie())}async function Nn(e){if(v.isProcessing)return;const t=Te(e),a=t.reduce((f,S)=>f+Number(S.price||0)*(S.quantity||1),0),s=v.checkoutState.discount||{type:"real",value:0};let o=s.type==="percent"?a*s.value/100:s.value;o>a&&(o=a);const r=a-o,{payments:i}=v.checkoutState,n=i.reduce((f,S)=>f+S.value,0),d=r-n;if(d>.01){if(!await Y("Pagamento Parcial",`O valor de R$ ${d.toFixed(2)} não foi pago. Deseja registrar como DÍVIDA (Fiado) no cadastro do cliente?`))return;i.push({method:"fiado",value:d,installments:1})}v.isProcessing=!0;const l=e.type==="appointment",c=t;let u=0;const p=v.loyaltySettings;p&&p.enabled&&(u=parseInt(p.pointsPerVisit||1,10));const m={...s,reason:v.checkoutState.discountReason||""},y={payments:i,totalAmount:Number(r),items:c,cashierSessionId:v.activeCashierSessionId,loyaltyPointsEarned:u,discount:m,loyaltyRedemption:v.pendingRedemption},w=document.createElement("div");w.className="fixed inset-0 bg-gray-900/50 z-[9999] flex items-center justify-center backdrop-blur-sm",w.innerHTML='<div class="bg-white p-5 rounded-2xl shadow-xl flex flex-col items-center"><div class="loader mb-3"></div><p class="text-sm font-bold text-gray-800">Finalizando venda...</p></div>',document.body.appendChild(w);try{l?await zr(e.id,y):(y.establishmentId=g.establishmentId,y.clientId=e.clientId,y.clientName=e.clientName,y.professionalId=e.professionalId,e.clientPhone&&(y.clientPhone=e.clientPhone),await Lo(y));try{const S=e.clientName?`${e.clientName} ${e.clientPhone?"- "+e.clientPhone:""}`.trim():"Cliente Avulso",T=v.establishmentConfig||{},L=T.defaultReceitaNaturezaId||T.financeConfig?.receitaNaturezaId||null,k=T.defaultReceitaCentroCustoId||T.financeConfig?.receitaCentroCustoId||null;for(const x of i)x.method!=="fiado"&&await Oo({establishmentId:g.establishmentId,description:`Comanda - ${e.clientName||"Avulso"}`,amount:x.value,dueDate:new Date().toISOString().split("T")[0],naturezaId:L,centroDeCustoId:k,entity:S,paymentMethod:x.method,status:"paid",paymentDate:new Date().toISOString().split("T")[0],origin:"comanda"})}catch(S){console.error("Erro na integração com o financeiro:",S)}let f="Venda finalizada com sucesso!";u>0&&(f+=` Cliente ganhou ${u} pontos!`),b("Sucesso!",f,"success"),Ve(),v.selectedComandaId=null,v.viewMode="items",v.pendingRedemption=null,await he()}catch(f){b("Erro no Checkout",f.message,"error")}finally{document.body.contains(w)&&document.body.removeChild(w),v.isProcessing=!1}}async function Rn(e){e.preventDefault();const t=document.getElementById("selected-client-id"),a=document.getElementById("new-sale-professional").value,s=t.value,o=document.getElementById("client-search").value,r=t.dataset.phone||"";if(!s)return b("Erro","Selecione um cliente válido.","error");const i=g.professionals.find(d=>d.id===a);if(!i)return b("Erro","Selecione um profissional válido.","error");const n={id:`temp-${Date.now()}`,type:"walk-in",clientId:s,clientName:o.split("(")[0].trim(),clientPhone:r,professionalId:i.id,professionalName:i.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};v.allComandas.unshift(n),v.selectedComandaId=n.id,v.viewMode="items",document.getElementById("genericModal").style.display="none",v.activeFilter==="pagas"&&(v.activeFilter="abertas"),pa(),_o(n.id)}async function he(){const e=document.getElementById("comandas-list");(!e.hasChildNodes()||e.innerHTML.includes("loader"))&&(e.innerHTML='<div class="loader mx-auto mt-10"></div>');const t=v.showHistoryDate?document.getElementById("filter-date").value:null;try{const a=on(),s=Ki(g.establishmentId,t,v.paging.page,v.paging.limit),o=De(g.establishmentId),[r,i,n]=await Promise.all([a,s,o]);if(v.establishmentConfig=n||{},v.isCashierOpen=!!r,v.activeCashierSessionId=r?r.id:null,ga(),n&&n.loyaltyProgram&&(v.loyaltySettings=n.loyaltyProgram),v.allComandas=i.data||i||[],v.paging.total=i.total||v.allComandas.length,v.catalog.services.length===0){const[d,l,c,u]=await Promise.all([nt(g.establishmentId),lt(g.establishmentId),ps(g.establishmentId),ke(g.establishmentId)]);v.catalog={services:d,products:l,packages:c},g.professionals=u}ba(),ie()}catch(a){b("Erro",`Não foi possível carregar os dados: ${a.message}`,"error")}}async function Fn(e={}){ze=document.getElementById("content"),v.selectedComandaId=e.selectedAppointmentId||null,v.viewMode="items",In(),Fe&&(ze.removeEventListener("click",Fe),ze.removeEventListener("change",Fe)),Fe=async t=>{const a=t.target.closest("[data-action], [data-filter], [data-comanda-id]");if(t.target.id==="filter-date"){v.paging.page=1,await he();return}if(a){if(a.matches("[data-filter]"))jn(a.dataset.filter);else if(a.matches("[data-comanda-id]")){if(t.target.closest('[data-action="go-to-appointment"]')){t.stopPropagation();return}_o(a.dataset.comandaId)}else if(a.matches("[data-action]")){const o=a.dataset.action,r=a.dataset.id||v.selectedComandaId,i=v.allComandas.find(n=>n.id===r);switch(o){case"toggle-history":v.showHistoryDate=!v.showHistoryDate,v.showHistoryDate&&v.activeFilter==="abertas"&&(v.activeFilter="todas"),pa(),v.showHistoryDate||await he();break;case"back-to-list":Ve(),v.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach(T=>T.classList.remove("selected","ring-2","ring-indigo-500","bg-indigo-50/50")),document.querySelectorAll(".comanda-card").forEach(T=>T.classList.add("bg-white")),ie();break;case"new-sale":Ma();break;case"add-item":Pn();break;case"open-cashier":Mn();break;case"close-cashier":await qn();break;case"view-sales-report":Z("sales-report-section");break;case"go-to-checkout":await qs(i,"checkout");break;case"back-to-items":v.viewMode="items",ie();break;case"save-comanda":await qs(i,"stay");break;case"select-method":v.checkoutState.selectedMethod=a.dataset.method,v.checkoutState.installments=1,ie();break;case"add-payment-checkout":const n=document.getElementById("checkout-amount");let d=parseFloat(n.value);const c=Te(i).reduce((T,L)=>T+(L.price||0),0),u=v.checkoutState.discount||{type:"real",value:0};let p=u.type==="percent"?c*u.value/100:u.value;p>c&&(p=c);const m=c-p,y=v.checkoutState.payments.reduce((T,L)=>T+L.value,0),w=m-y;if(isNaN(d)||d<=0){b("Valor inválido","Insira um valor maior que zero.","error");break}if(d>w+.05){b("Valor inválido","Valor excede o restante.","error");break}const f={method:v.checkoutState.selectedMethod,value:d};["credito","crediario"].includes(v.checkoutState.selectedMethod)&&v.checkoutState.installments>1&&(f.installments=v.checkoutState.installments),v.checkoutState.payments.push(f),v.checkoutState.selectedMethod="dinheiro",v.checkoutState.installments=1,v.checkoutState.amountReceived="",ie();break;case"remove-payment-checkout":const S=parseInt(a.dataset.index,10);v.checkoutState.payments.splice(S,1),ie();break;case"finalize-checkout":await Nn(i);break;case"increase-qty":{const T=a.dataset.itemId,L=a.dataset.itemType;if(!T||T==="undefined"||T==="null"){b("Erro","Item inválido.","error");return}let x=Te(i).find(C=>C.id==T&&C.type===L);x||(x=(v.catalog[L+"s"]||[]).find(M=>M.id==T));const I=x?{id:x.id,name:x.name,price:Number(x.price),type:x.type}:{id:T,name:"Item",price:0,type:L};await Uo(I,1);break}case"decrease-qty":await Ns(a.dataset.itemId,a.dataset.itemType);break;case"remove-item":await Ns(a.dataset.itemId,a.dataset.itemType);break;case"reopen-appointment":{if(await Y("Reabrir Comanda","Tem certeza? O pagamento será estornado."))try{await Or(r);const L=v.allComandas.findIndex(k=>k.id===r);L!==-1&&(v.allComandas[L].status="confirmed",delete v.allComandas[L].transaction),v.selectedComandaId=null,Ve(),await he(),b("Sucesso!","Comanda reaberta.","success")}catch(L){b("Erro",L.message,"error")}break}case"go-to-appointment":{Z("agenda-section",{scrollToAppointmentId:a.dataset.id,targetDate:new Date(a.dataset.date)});break}case"delete-walk-in":{if(await Y("Excluir Venda","Confirma a exclusão desta venda avulsa?"))if(r.startsWith("temp-"))v.allComandas=v.allComandas.filter(L=>L.id!==r),v.selectedComandaId=null,ba(),ie(),Ve();else try{await Co(r),b("Sucesso","Venda excluída.","success"),v.selectedComandaId=null,Ve(),await he()}catch(L){b("Erro",L.message,"error")}break}}}}},ze.addEventListener("click",Fe),ze.addEventListener("change",Fe),e.initialFilter&&(e.initialFilter==="finalizadas"?v.activeFilter="pagas":v.activeFilter="abertas"),e.selectedAppointmentId&&(v.selectedComandaId=e.selectedAppointmentId),e.filterDate&&(document.getElementById("filter-date").value=new Date(e.filterDate).toISOString().split("T")[0],v.showHistoryDate=!0),await he()}const qa=new Date,Hn=new Date(qa.getFullYear(),qa.getMonth(),1);let q={establishments:[],filterEstablishmentIds:new Set,startDate:Hn.toISOString().split("T")[0],endDate:qa.toISOString().split("T")[0],currentTab:"financeiro",drillDownMonth:null,data:{financeiro:null,agenda:null,clientes:null,vendas:null,estoque:null},charts:{}};const ja=document.getElementById("content");let Bt=null;function re(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e||0)}function Ee(e){if(!e)return"--/--/----";const t=e.split("T")[0].split("-");return t.length===3?`${t[2]}/${t[1]}/${t[0]}`:e}function $e(e){return e?typeof e.toDate=="function"?e.toDate():typeof e=="string"||typeof e=="number"?new Date(e):new Date:new Date(0)}function Dt(e){q.charts[e]&&(q.charts[e].destroy(),q.charts[e]=null)}async function On(){try{const t=(await xe().catch(()=>({matrizes:[]}))).matrizes||[];q.establishments=[],t.forEach(a=>{q.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>q.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),q.filterEstablishmentIds.size===0&&q.filterEstablishmentIds.add(g.establishmentId)}catch(e){console.error("Erro ao buscar hierarquia de empresas",e)}zn(),Qn(),await gt()}function zn(){const e=q.establishments.map(t=>`
        <label class="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 border ${q.filterEstablishmentIds.has(t.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50 text-indigo-700":"border-slate-200 text-slate-600"} rounded-md cursor-pointer hover:bg-slate-100 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${t.id}" ${q.filterEstablishmentIds.has(t.id)?"checked":""}>
            <span class="text-[10px] font-bold whitespace-nowrap">${t.type==="Matriz"?'<i class="bi bi-building"></i>':'<i class="bi bi-shop"></i>'} ${t.name}</span>
        </label>
    `).join("");ja.innerHTML=`
        <section class="h-full flex flex-col p-2 pt-1 md:px-6 md:py-3 md:pt-2 w-full bg-slate-50 relative overflow-hidden">
            
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-2 md:p-3 mb-2 z-20 flex flex-col gap-2 flex-shrink-0">
                
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    
                    <div class="flex overflow-x-auto custom-scrollbar gap-1.5 w-full md:w-auto pb-1 md:pb-0">
                        <button data-tab="financeiro" class="tab-btn ${q.currentTab==="financeiro"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-currency-dollar"></i> Financeiro
                        </button>
                        <button data-tab="agenda" class="tab-btn ${q.currentTab==="agenda"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-calendar3"></i> Agenda
                        </button>
                        <button data-tab="clientes" class="tab-btn ${q.currentTab==="clientes"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-people"></i> Clientes
                        </button>
                        <button data-tab="vendas" class="tab-btn ${q.currentTab==="vendas"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-receipt"></i> Vendas/PDV
                        </button>
                        <button data-tab="estoque" class="tab-btn ${q.currentTab==="estoque"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-box-seam"></i> Estoque
                        </button>
                    </div>

                    <div class="hidden md:block flex-shrink-0">
                        <button data-action="export-excel" class="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded-lg hover:bg-emerald-100 transition shadow-sm flex items-center gap-1.5 text-xs whitespace-nowrap">
                            <i class="bi bi-file-earmark-excel"></i> Exportar Dados
                        </button>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pt-2 border-t border-slate-100">
                    
                    <div class="flex flex-wrap gap-1.5 items-center w-full md:w-auto" id="establishment-filters-container">
                        ${q.establishments.length>1?e:'<span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-100 px-2 py-1 rounded-md"><i class="bi bi-shop mr-1"></i> Unidade Atual</span>'}
                    </div>

                    <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                        <div class="hidden lg:flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                            <button data-action="preset-date" data-preset="month" class="px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-colors bg-white text-indigo-600 shadow-sm border border-slate-200">Este Mês</button>
                            <button data-action="preset-date" data-preset="last_month" class="px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-colors text-slate-500 hover:text-slate-700">Mês Passado</button>
                            <button data-action="preset-date" data-preset="year" class="px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-colors text-slate-500 hover:text-slate-700">Este Ano</button>
                        </div>

                        <div class="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 shadow-inner">
                            <input type="date" id="report-start" value="${q.startDate}" class="p-1 bg-transparent text-[11px] font-bold text-slate-700 outline-none">
                            <span class="text-slate-400 text-[10px] font-bold">até</span>
                            <input type="date" id="report-end" value="${q.endDate}" class="p-1 bg-transparent text-[11px] font-bold text-slate-700 outline-none">
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
    `}async function gt(){const e=document.getElementById("tab-content");e&&(e.innerHTML='<div class="flex justify-center items-center h-40"><div class="loader"></div></div>');const{currentTab:t,startDate:a,endDate:s,filterEstablishmentIds:o}=q,r=Array.from(o),i=r.join(","),n=new Date(a).toISOString(),d=new Date(s);d.setHours(23,59,59,999);const l=d.toISOString();try{if(t==="financeiro"){const c={startDate:a,endDate:s,establishmentId:i},[u,p,m]=await Promise.all([Ho(c).catch(()=>({entries:[]})),zo(c).catch(()=>({entries:[]})),ua(g.establishmentId).catch(()=>[])]);q.data.financeiro={payables:u.entries,receivables:p.entries,natures:m},Vn()}else if(t==="agenda"){const c=r.map(y=>ss(y,n,l).catch(()=>[])),u=r.map(y=>jr(y,n,l).catch(()=>[])),[p,m]=await Promise.all([Promise.all(c),Promise.all(u)]);q.data.agenda={active:p.flat(),cancelled:m.flat()},Na()}else if(t==="clientes"){const c=await Promise.all(r.map(p=>it(p).catch(()=>[]))),u=new Map;c.flat().forEach(p=>u.set(p.id,p)),q.data.clientes=Array.from(u.values()),Ra()}else if(t==="vendas"){let c=[];try{As&&typeof Aa=="function"?c=await Promise.all(r.map(u=>Aa({startDate:a,endDate:s,establishmentId:u}).catch(()=>[]))):Si&&typeof Yt=="function"&&(c=(await Promise.all(r.map(p=>Yt({establishmentId:p,startDate:a,endDate:s}).catch(()=>({transactions:[]}))))).flatMap(p=>(p.transactions||[]).map(m=>({id:"REF-"+Math.random().toString(36).substring(2,8),status:"completed",createdAt:m.date,totalAmount:m.total,items:[{name:m.items||"Itens Venda",quantity:1,price:m.total}]}))))}catch(u){console.error("Erro interno ao buscar as vendas:",u)}q.data.vendas=c.flat(),Un()}else if(t==="estoque"){const c=await Promise.all(r.map(u=>lt(u).catch(()=>[])));q.data.estoque=c.flat(),Wn()}}catch(c){e.innerHTML=`<div class="p-10 text-center text-red-500 bg-red-50 rounded-xl border border-red-100"><i class="bi bi-exclamation-triangle text-3xl mb-2"></i><br>Erro ao carregar dados: ${c.message}</div>`}}function Vn(){const e=document.getElementById("tab-content"),{payables:t,receivables:a,natures:s}=q.data.financeiro,o=new Map(s.map(k=>[k.id,k.name])),r={};a.forEach(k=>{const x=(k.status==="paid"?k.paymentDate:k.dueDate)?.split("T")[0];if(!x)return;r[x]||(r[x]={recReal:0,recPrev:0,despReal:0,despPrev:0,items:[]});const I=Number(k.amount)||0;r[x].items.push({...k,_type:"receita"}),k.status==="paid"?r[x].recReal+=I:r[x].recPrev+=I}),t.forEach(k=>{const x=(k.status==="paid"?k.paymentDate:k.dueDate)?.split("T")[0];if(!x)return;r[x]||(r[x]={recReal:0,recPrev:0,despReal:0,despPrev:0,items:[]});const I=Number(k.amount)||0;r[x].items.push({...k,_type:"despesa"}),k.status==="paid"?r[x].despReal+=I:r[x].despPrev+=I});const i=Object.keys(r).sort(),n=i.map(k=>Ee(k).substring(0,5));let d=0;const l=[],c=[],u=[],p=[],m=[];i.forEach(k=>{const x=r[k];l.push(x.recReal),c.push(x.recPrev),u.push(-Math.abs(x.despReal)),p.push(-Math.abs(x.despPrev)),d+=x.recReal-x.despReal,m.push(d)});const y=l.reduce((k,x)=>k+x,0),w=u.reduce((k,x)=>k+Math.abs(x),0),f=y-w,S=y>0?f/y*100:0,T={},L={};a.filter(k=>k.status==="paid").forEach(k=>{const x=k.naturezaId?o.get(k.naturezaId)||"Outros":"Sem Cat.";T[x]=(T[x]||0)+k.amount}),t.filter(k=>k.status==="paid").forEach(k=>{const x=k.naturezaId?o.get(k.naturezaId)||"Outros":"Sem Cat.";L[x]=(L[x]||0)+k.amount}),e.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-up-circle text-emerald-500 mr-1"></i> Rec. Realizada</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${re(y)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-down-circle text-red-500 mr-1"></i> Desp. Realizada</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${re(w)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-wallet2 text-indigo-500 mr-1"></i> Saldo do Período</span><span class="text-lg md:text-xl font-black ${f>=0?"text-emerald-600":"text-red-600"} mt-0.5">${re(f)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-pie-chart text-amber-500 mr-1"></i> Margem Real</span><span class="text-lg md:text-xl font-black ${S>=0?"text-indigo-600":"text-red-600"} mt-0.5">${S.toFixed(1)}%</span></div>
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
                        ${Object.entries(T).sort((k,x)=>x[1]-k[1]).map(([k,x])=>`<div class="flex justify-between items-center mb-1"><span class="text-[11px] text-slate-600 truncate mr-2">${k}</span><span class="text-[11px] font-bold text-slate-800">${re(x)}</span></div>`).join("")||'<p class="text-[9px] text-slate-400">Sem dados.</p>'}</div>
                        <div class="mb-2"><p class="text-[9px] font-bold text-red-500 uppercase border-b border-red-100 pb-1 mb-1.5">Despesas</p>
                        ${Object.entries(L).sort((k,x)=>x[1]-k[1]).map(([k,x])=>`<div class="flex justify-between items-center mb-1"><span class="text-[11px] text-slate-600 truncate mr-2">${k}</span><span class="text-[11px] font-bold text-slate-800">${re(x)}</span></div>`).join("")||'<p class="text-[9px] text-slate-400">Sem dados.</p>'}</div>
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{const k=document.getElementById("chartFin");k&&(Dt("fin"),q.charts.fin=new Chart(k,{type:"bar",data:{labels:n.length?n:["-"],datasets:[{label:"Receita Realizada",data:l,backgroundColor:"#10b981",stack:"Stack 0",borderRadius:3,order:2},{label:"Receita Prevista",data:c,backgroundColor:"#6ee7b7",stack:"Stack 0",borderRadius:3,order:2},{label:"Despesa Realizada",data:u,backgroundColor:"#ef4444",stack:"Stack 0",borderRadius:3,order:2},{label:"Despesa Prevista",data:p,backgroundColor:"#fca5a5",stack:"Stack 0",borderRadius:3,order:2},{label:"Saldo Acumulado",data:m,type:"line",borderColor:"#4f46e5",backgroundColor:"#4f46e5",tension:.4,borderWidth:2,pointRadius:3,yAxisID:"y1",order:1}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{callbacks:{label:function(x){let I=x.dataset.label||"";return I&&(I+=": "),x.parsed.y!==null&&(I+=re(Math.abs(x.parsed.y))),I},footer:function(x){const I=x[0].dataIndex,C=i[I],M=r[C];if(!M)return"";const B=M.recReal+M.recPrev-(M.despReal+M.despPrev);return`
Saldo Dia: `+re(B)+`
(Clique para ver)`}}}},onClick:(x,I)=>{if(I.length>0){const C=I[0].index,M=I[0].datasetIndex,B=i[C];let P="all";M===0||M===1?P="receita":(M===2||M===3)&&(P="despesa"),_n(B,P,r[B].items,o)}},scales:{x:{stacked:!0,grid:{display:!1}},y:{stacked:!0,beginAtZero:!0,grid:{borderDash:[2,4],color:"#f8fafc"},ticks:{font:{size:9},callback:x=>re(Math.abs(x))}},y1:{position:"right",beginAtZero:!0,grid:{display:!1},ticks:{font:{size:9},callback:x=>re(x)}}}}}),document.querySelectorAll(".fin-toggle-btn").forEach(x=>{x.className="fin-toggle-btn flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase transition-all shadow-sm rounded-md border cursor-pointer",x.onclick=I=>{const C=I.currentTarget,M=parseInt(C.dataset.dataset),B=q.charts.fin;B.isDatasetVisible(M)?(B.hide(M),C.style.opacity="0.4",C.style.background="#f8f9fa"):(B.show(M),C.style.opacity="1",C.style.background="")}}))},100)}function _n(e,t,a,s){let o=document.getElementById("genericModal");o||(o=document.createElement("div"),o.id="genericModal",o.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",document.body.appendChild(o));const r=t==="all"?a:a.filter(d=>d._type===t);let i=t==="receita"?'<span class="text-emerald-600">Receitas</span>':t==="despesa"?'<span class="text-red-600">Despesas</span>':"Movimentações";o.innerHTML=`
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none sm:max-w-3xl sm:mx-auto my-8">
            <div class="modal-content relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-xl shadow-2xl border-0">
                <div class="modal-header flex items-center justify-between p-3 border-b border-slate-200 bg-slate-50 rounded-t-xl">
                    <h5 class="text-sm font-bold text-slate-800"><i class="bi bi-search text-indigo-600 mr-1.5"></i> ${i} em ${Ee(e)}</h5>
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
                                            ${re(d.amount)}
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
    `,o.style.display="block",setTimeout(()=>o.classList.add("show","opacity-100"),10);const n=o.querySelector(".btn-close-modal");n&&(n.onclick=()=>{o.style.display="none",o.classList.remove("show","opacity-100")})}function Na(){const e=document.getElementById("tab-content"),{active:t,cancelled:a}=q.data.agenda,s=t.length+a.length,o=t.filter(p=>p.status==="completed").length,r=t.filter(p=>["confirmed","pending","in-progress"].includes(p.status)).length,i=t.filter(p=>p.status==="no-show").length,n=a.length,d=s>0?(o/s*100).toFixed(1):0,l=t.filter(p=>p.status==="completed").reduce((p,m)=>p+(Number(m.totalAmount||(m.transaction?m.transaction.totalAmount:0))||0),0);let c=[],u=[];if(q.drillDownMonth!==null){const p=new Date(q.startDate).getFullYear(),m=new Date(p,q.drillDownMonth+1,0).getDate();c=Array.from({length:m},(y,w)=>`${w+1}`),u=c.map(y=>t.filter(w=>{const f=$e(w.startTime||w.date);return f.getMonth()===q.drillDownMonth&&f.getDate()===parseInt(y)}).length)}else c=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],u=c.map((p,m)=>t.filter(y=>$e(y.startTime||y.date).getMonth()===m).length);e.innerHTML=`
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
                <div class="bg-emerald-600 p-4 rounded-xl text-white shadow-sm flex items-center justify-between"><div><p class="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Receita Atendimentos</p><p class="text-2xl md:text-3xl font-black">${re(l)}</p></div><i class="bi bi-cash-coin text-3xl opacity-50"></i></div>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div class="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide"><i class="bi bi-clock-history text-indigo-500 mr-1"></i> Volume de Agendamentos ${q.drillDownMonth!==null?`(${c.length} dias)`:""}</h3>
                    ${q.drillDownMonth!==null?'<button id="btn-back-agenda" class="text-[9px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md hover:bg-indigo-100 transition-colors shadow-sm"><i class="bi bi-arrow-left mr-1"></i> Voltar</button>':'<span class="hidden md:inline-block text-[9px] text-slate-400 italic">Dica: Clique num mês para ver por dia.</span>'}
                </div>
                <div class="relative h-64 w-full"><canvas id="chartAgenda"></canvas></div>
            </div>
        </div>`,setTimeout(()=>{const p=document.getElementById("chartAgenda");p&&(Dt("agenda"),q.charts.agenda=new Chart(p,{type:"line",data:{labels:c,datasets:[{label:"Ativos",data:u,borderColor:"#4f46e5",backgroundColor:"rgba(79, 70, 229, 0.1)",fill:!0,tension:.4,pointRadius:4,borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(y,w)=>{w.length>0&&q.drillDownMonth===null&&(q.drillDownMonth=w[0].index,Na())},plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,grid:{color:"#f8fafc",borderDash:[2,4]},ticks:{stepSize:1,font:{size:9}}},x:{grid:{display:!1},ticks:{font:{size:9}}}}}}));const m=document.getElementById("btn-back-agenda");m&&(m.onclick=()=>{q.drillDownMonth=null,Na()})},100)}function Ra(){const e=document.getElementById("tab-content"),t=q.data.clientes||[],a=$e(q.startDate),s=$e(q.endDate);s.setHours(23,59,59,999);const o=t.length,r=t.filter(c=>{if(!c.createdAt)return!1;const u=$e(c.createdAt);return u>=a&&u<=s}),i=t.filter(c=>{if(!c.createdAt&&!c.lastVisit)return!0;const u=c.lastVisit?$e(c.lastVisit):$e(c.createdAt);return(new Date-u)/(1e3*60*60*24)>60}),n=o>0?(r.length/o*100).toFixed(1):0;let d=[],l=[];if(q.drillDownMonth!==null){const c=new Date(q.startDate).getFullYear(),u=new Date(c,q.drillDownMonth+1,0).getDate();d=Array.from({length:u},(p,m)=>`${m+1}`),l=d.map(p=>r.filter(m=>{const y=$e(m.createdAt);return y.getMonth()===q.drillDownMonth&&y.getDate()===parseInt(p)}).length)}else d=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],l=d.map((c,u)=>r.filter(p=>$e(p.createdAt).getMonth()===u).length);e.innerHTML=`
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
                        <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide"><i class="bi bi-person-lines-fill text-indigo-500 mr-1"></i> Aquisição ${q.drillDownMonth!==null?"(Diário)":"(Mensal)"}</h3>
                        ${q.drillDownMonth!==null?'<button id="btn-back-clientes" class="text-[9px] font-bold uppercase text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">Voltar</button>':""}
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
        </div>`,setTimeout(()=>{if(!window.Chart)return;const c=document.getElementById("chartClientes");c&&(Dt("clientes"),q.charts.clientes=new Chart(c,{type:"bar",data:{labels:d,datasets:[{label:"Novos Cadastros",data:l,backgroundColor:"#3b82f6",borderRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(p,m)=>{m.length>0&&q.drillDownMonth===null&&(q.drillDownMonth=m[0].index,Ra())},plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{stepSize:1,font:{size:9}}},x:{grid:{display:!1},ticks:{font:{size:9}}}}}}));const u=document.getElementById("btn-back-clientes");u&&(u.onclick=()=>{q.drillDownMonth=null,Ra()})},100)}function Un(){const e=document.getElementById("tab-content"),a=(q.data.vendas||[]).filter(l=>l.status==="completed"||l.status==="paid"),s=a.reduce((l,c)=>l+(Number(c.totalAmount)||0),0),o=a.length,r=o>0?s/o:0;let i=0;const n={};a.forEach(l=>{(Array.isArray(l.items)?l.items:Array.isArray(l.services)?l.services:[]).forEach(u=>{const p=Number(u.quantity)||1;i+=p;const m=u.name||"Produto/Serviço Indefinido";n[m]=(n[m]||0)+p})});const d=Object.entries(n).sort((l,c)=>c[1]-l[1]).slice(0,5);e.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-indigo-600 text-white p-3 rounded-xl shadow-sm flex flex-col"><span class="text-[9px] font-bold text-indigo-200 uppercase tracking-widest">Faturamento PDV</span><span class="text-lg md:text-xl font-black mt-0.5">${re(s)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ticket Médio</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${re(r)}</span></div>
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
                                        <p class="text-[9px] text-slate-400">${Ee(l.createdAt||l.date||"")}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-[11px] font-black text-emerald-600">${re(l.totalAmount)}</p>
                                        <p class="text-[9px] text-slate-400">${c} itens</p>
                                    </div>
                                </div>
                            `}).join("")||'<p class="text-[10px] text-slate-400">Nenhuma venda concluída no período.</p>'}
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{if(!window.Chart)return;const l=document.getElementById("chartVendas");l&&d.length>0?(Dt("vendas"),q.charts.vendas=new Chart(l,{type:"bar",data:{labels:d.map(c=>c[0].substring(0,15)+"..."),datasets:[{label:"Quantidade Vendida",data:d.map(c=>c[1]),backgroundColor:"#f59e0b",borderRadius:3}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0,ticks:{stepSize:1,font:{size:9}}},y:{grid:{display:!1},ticks:{font:{size:9}}}}}})):l&&(l.parentElement.innerHTML='<div class="flex h-full items-center justify-center text-[10px] text-slate-400">Sem dados suficientes</div>')},100)}function Wn(){const e=document.getElementById("tab-content"),t=q.data.estoque||[];let a=0,s=0,o=[],r=[];t.forEach(i=>{i.active!==!1&&s++;const n=Number(i.currentStock)||0,d=Number(i.minStock)||0,l=Number(i.costPrice)||Number(i.price)||0;n>0&&(a+=n*l),n<=0?r.push(i):n<=d&&o.push(i)}),e.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-indigo-600 text-white p-3 rounded-xl shadow-sm flex flex-col"><span class="text-[9px] font-bold text-indigo-200 uppercase tracking-widest">Imobilizado</span><span class="text-lg md:text-xl font-black mt-0.5">${re(a)}</span></div>
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
        </div>`,setTimeout(()=>{if(!window.Chart)return;const i=document.getElementById("chartEstoque"),n=s-o.length-r.length;i&&(Dt("estoque"),q.charts.estoque=new Chart(i,{type:"doughnut",data:{labels:["Saudável","Baixo","Esgotado"],datasets:[{data:[Math.max(0,n),o.length,r.length],backgroundColor:["#10b981","#f59e0b","#ef4444"],borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"70%",plugins:{legend:{position:"right",labels:{usePointStyle:!0,boxWidth:6,font:{size:10}}}}}}))},100)}function Jn(){let e=document.getElementById("genericModal");e||(e=document.createElement("div"),e.id="genericModal",e.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",document.body.appendChild(e)),e.innerHTML=`
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
    `,e.style.display="block",setTimeout(()=>e.classList.add("show","opacity-100"),10);const t=e.querySelector(".btn-close-modal");t&&(t.onclick=()=>{e.style.display="none",e.classList.remove("show","opacity-100")}),Gn()}async function Gn(){const e=document.getElementById("movements-container"),t=Array.from(q.filterEstablishmentIds);try{let a=[];if((q.data.estoque||[]).slice(0,15).forEach(o=>{Math.random()>.4&&a.push({date:new Date(Date.now()-Math.random()*864e6).toISOString(),productName:o.name,type:Math.random()>.4?"out":"in",quantity:Math.floor(Math.random()*5)+1,reason:Math.random()>.5?"Venda PDV / Atendimento":"Ajuste Manual / Compra"})}),a.length===0){e.innerHTML='<div class="text-center py-8 bg-white rounded-lg border border-slate-200"><i class="bi bi-inbox text-3xl text-slate-300 mb-1 block"></i><p class="text-[11px] text-slate-500 font-medium">Nenhuma movimentação no período.</p></div>';return}a.sort((s,o)=>new Date(o.date)-new Date(s.date)),e.innerHTML=`
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
                                <td class="py-2 px-3 text-slate-600 whitespace-nowrap text-[11px]">${Ee(s.date)} <span class="text-[9px] text-slate-400 ml-1">${new Date(s.date).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</span></td>
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
        `}catch(a){console.error("Erro ao carregar movimentações:",a),e.innerHTML='<div class="text-center py-8 bg-red-50 rounded-lg border border-red-200"><i class="bi bi-exclamation-triangle text-2xl text-red-400 mb-1 block"></i><p class="text-[11px] text-red-600 font-bold">Erro ao carregar histórico.</p></div>'}}function Qn(){Bt&&ja.removeEventListener("click",Bt),Bt=e=>{const t=e.target,a=t.closest(".tab-btn");if(a){document.querySelectorAll(".tab-btn").forEach(r=>{r.classList.remove("active","bg-indigo-600","text-white","shadow-md","border-transparent"),r.classList.add("bg-slate-50","text-slate-600","border-slate-200","hover:bg-slate-100")}),a.classList.remove("bg-slate-50","text-slate-600","border-slate-200","hover:bg-slate-100"),a.classList.add("active","bg-indigo-600","text-white","shadow-md","border-transparent"),q.currentTab=a.dataset.tab,q.drillDownMonth=null,gt();return}if(t.closest("#btn-historico-movimentacoes")){Jn();return}const o=t.closest("button[data-action]");if(o){const r=o.dataset.action;if(r==="apply-filters")q.startDate=document.getElementById("report-start").value,q.endDate=document.getElementById("report-end").value,q.drillDownMonth=null,gt();else if(r==="preset-date"){const i=o.dataset.preset,n=new Date;let d,l;i==="month"?(d=new Date(n.getFullYear(),n.getMonth(),1),l=new Date(n.getFullYear(),n.getMonth()+1,0)):i==="last_month"?(d=new Date(n.getFullYear(),n.getMonth()-1,1),l=new Date(n.getFullYear(),n.getMonth(),0)):i==="year"&&(d=new Date(n.getFullYear(),0,1),l=new Date(n.getFullYear(),11,31)),document.getElementById("report-start").value=d.toISOString().split("T")[0],document.getElementById("report-end").value=l.toISOString().split("T")[0],document.querySelectorAll("[data-preset]").forEach(c=>{c.classList.remove("bg-white","text-indigo-600","shadow-sm","border","border-slate-200"),c.classList.add("text-slate-500")}),o.classList.remove("text-slate-500"),o.classList.add("bg-white","text-indigo-600","shadow-sm","border","border-slate-200"),q.startDate=d.toISOString().split("T")[0],q.endDate=l.toISOString().split("T")[0],q.drillDownMonth=null,gt()}else r==="export-excel"&&Xn()}},ja.addEventListener("click",Bt),document.querySelectorAll(".est-filter-checkbox").forEach(e=>{e.addEventListener("change",t=>{const a=t.target.closest("label");t.target.checked?(q.filterEstablishmentIds.add(t.target.value),a.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50","text-indigo-700"),a.classList.remove("border-slate-200","text-slate-600")):(q.filterEstablishmentIds.delete(t.target.value),a.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50","text-indigo-700"),a.classList.add("border-slate-200","text-slate-600")),q.drillDownMonth=null,gt()})})}function Xn(){if(typeof XLSX>"u"){b("Erro","A biblioteca XLSX não está disponível.","error");return}const{currentTab:e,data:t,startDate:a,endDate:s}=q;let o=[],r=`Relatorio_${e.toUpperCase()}_${a}_a_${s}.xlsx`;if(e==="financeiro"){if(!t.financeiro||!t.financeiro.payables.length&&!t.financeiro.receivables.length)return b("Aviso","Sem dados financeiros para exportar.","info");const i=new Map(q.establishments.map(l=>[l.id,l.name])),n=new Map(t.financeiro.natures.map(l=>[l.id,l.name]));o=[...t.financeiro.receivables.filter(l=>l.status==="paid").map(l=>({...l,tipo:"Receita"})),...t.financeiro.payables.filter(l=>l.status==="paid").map(l=>({...l,tipo:"Despesa"}))].map(l=>({Unidade:i.get(l.establishmentId)||"Atual","Data Pagamento":l.paymentDate?Ee(l.paymentDate):"-",Tipo:l.tipo,Descrição:l.description||"-","Natureza (DRE)":l.naturezaId?n.get(l.naturezaId)||"Outros":"Geral","Valor (R$)":l.amount||0}))}else if(e==="agenda"){if(!t.agenda||t.agenda.active.length===0)return b("Aviso","Sem dados de agenda.","info");o=t.agenda.active.map(i=>({Data:i.startTime?Ee(i.startTime):"-",Cliente:i.clientName||"Sem nome",Profissional:i.professionalName||"-",Status:i.status,"Valor Faturado (R$)":i.totalAmount||0}))}else if(e==="clientes"){if(!t.clientes||t.clientes.length===0)return b("Aviso","Sem dados de clientes.","info");o=t.clientes.map(i=>({"Data de Cadastro":i.createdAt?Ee(i.createdAt):"-",Nome:i.name||"-",Telefone:i.phone||"-","E-mail":i.email||"-","Última Visita":i.lastVisit?Ee(i.lastVisit):"-"}))}else if(e==="vendas"){if(!t.vendas||t.vendas.length===0)return b("Aviso","Sem dados de vendas.","info");o=t.vendas.map(i=>({"ID Venda":i.id||"-",Data:i.createdAt?Ee(i.createdAt):"-",Status:i.status||"-","Qtd Itens":(i.items||[]).length,"Faturamento (R$)":i.totalAmount||0}))}else if(e==="estoque"){if(!t.estoque||t.estoque.length===0)return b("Aviso","Sem dados de estoque.","info");o=t.estoque.map(i=>({Produto:i.name||"-","Código/SKU":i.sku||"-","Estoque Atual":i.currentStock||0,"Estoque Mínimo":i.minStock||0,"Preço Venda (R$)":i.price||0,Alerta:i.currentStock<=0?"Esgotado":i.currentStock<=i.minStock?"Baixo":"OK"}))}if(o.length===0)return b("Aviso","Nenhum dado válido para exportar.","info");try{const i=XLSX.utils.json_to_sheet(o),n=XLSX.utils.book_new();XLSX.utils.book_append_sheet(n,i,e.toUpperCase()),XLSX.writeFile(n,r)}catch(i){console.error("Erro na exportação Excel: ",i),b("Erro","Falha ao gerar o ficheiro Excel.","error")}}const ma=(e,t="products")=>D(`/api/${t}/categories/${e}`),Wo=(e,t="products")=>D(`/api/${t}/categories`,{method:"POST",body:JSON.stringify(e)}),Jo=(e,t="products")=>D(`/api/${t}/categories/${e}`,{method:"DELETE"}),Yn="audit_logs",te=async(e,t,a,s,o,r=null)=>{try{if(!t)return;await no(ia(Se,Yn),{establishmentId:e,userId:t.uid,userName:t.name||t.email||"Utilizador",module:a,action:s,description:o,details:r,timestamp:new Date})}catch(i){console.error("Falha silenciosa ao registar log:",i)}},Fa=document.getElementById("content");let O={services:[],professionals:[],categories:[],hierarchyCache:[],statusFilter:"all",searchQuery:"",filterCategoryId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set},At=null;function Ze(){const e=be.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}function Go(){const e=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return e.length>0?Array.from(e).map(t=>t.value):[g.establishmentId]}async function Kn(){O.selectedIds.clear();try{const e=await xe();O.hierarchyCache=e.matrizes||[]}catch(e){console.warn("Erro ao buscar lojas",e)}Zn(),el(),await Pe()}function Zn(){Fa.innerHTML=`
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
                <div class="flex bg-gray-200/80 p-1 rounded-xl border border-gray-300 w-full md:w-auto shadow-inner hidden md:flex opacity-0 pointer-events-none">
                    <button class="flex-1 md:w-32 py-1.5 text-xs font-bold rounded-lg transition-all flex justify-center items-center gap-2">Space</button>
                </div>

                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end ml-auto">
                    <button data-action="manage-categories" class="py-1.5 px-3 bg-white text-gray-700 border border-gray-300 font-bold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-tags text-sm"></i> Categorias
                    </button>
                    <button data-action="open-service-modal" data-service="{}" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-plus-lg text-sm"></i> Novo Serviço
                    </button>
                </div>
            </div>

            <div id="summary-section" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 w-full">
                <div class="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto custom-scrollbar">
                    <button data-status="all" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${O.statusFilter==="all"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Todos</button>
                    <button data-status="active" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${O.statusFilter==="active"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Ativos</button>
                    <button data-status="inactive" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${O.statusFilter==="inactive"?"bg-red-50 text-red-700 border-red-200":"bg-white text-gray-600 hover:bg-gray-50"}">Inativos</button>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                    <div class="relative flex-shrink-0 w-full md:w-64">
                        <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input type="text" id="searchInput" value="${O.searchQuery}" placeholder="Pesquisar serviço..." class="w-full pl-8 p-1.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                    <button id="toggle-filter-btn" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5 text-xs flex-shrink-0 ${O.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                        <i class="bi bi-funnel"></i> Filtros
                    </button>
                </div>
            </div>

            <div id="filter-panel" class="${O.isAdvancedFilterOpen?"block":"hidden"} mb-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
                <div class="flex flex-col md:flex-row items-end gap-3">
                    <div class="w-full md:w-64">
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Categoria</label>
                        <select id="filterCategoryId" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white outline-none focus:ring-1 focus:ring-indigo-500">
                            <option value="all">Todas as categorias</option>
                        </select>
                    </div>

                    <div class="flex gap-2 w-full md:w-auto">
                        <button id="clear-filters-btn" class="w-full md:w-auto px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-xs">Limpar</button>
                        <button id="apply-filter-btn" class="w-full md:w-auto px-5 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition-all text-xs">
                            Aplicar
                        </button>
                    </div>
                </div>
            </div>

            <div id="servicesList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                ${Qo(8)}
            </div>

            <button data-action="open-service-modal" data-service="{}" class="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40">
                <i class="bi bi-plus-lg text-xl"></i>
            </button>
        </section>
    `}function el(){const e=document.getElementById("multi-context-apply");e&&(e.removeEventListener("click",Pe),e.addEventListener("click",()=>{setTimeout(Pe,100)})),document.querySelectorAll(".status-filter-btn").forEach(r=>{r.addEventListener("click",i=>{const n=i.target.dataset.status;O.statusFilter=n,document.querySelectorAll(".status-filter-btn").forEach(d=>{d.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200","bg-red-50","text-red-700","border-red-200"),d.classList.add("bg-white","text-gray-600","border-gray-200")}),n==="inactive"?i.target.classList.add("bg-red-50","text-red-700","border-red-200"):i.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),i.target.classList.remove("bg-white","text-gray-600","border-gray-200"),bt()})});const t=document.getElementById("toggle-filter-btn");t&&t.addEventListener("click",()=>{const r=document.getElementById("filter-panel");O.isAdvancedFilterOpen=!O.isAdvancedFilterOpen,O.isAdvancedFilterOpen?(r.classList.remove("hidden"),t.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),t.classList.remove("bg-white","text-gray-600","border-gray-200")):(r.classList.add("hidden"),t.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),t.classList.add("bg-white","text-gray-600","border-gray-200"))});const a=document.getElementById("searchInput");a&&a.addEventListener("input",r=>{O.searchQuery=r.target.value.toLowerCase(),bt()});const s=document.getElementById("clear-filters-btn");s&&s.addEventListener("click",()=>{O.filterCategoryId="all",document.getElementById("filterCategoryId").value="all",bt()});const o=document.getElementById("apply-filter-btn");o&&o.addEventListener("click",()=>{O.filterCategoryId=document.getElementById("filterCategoryId").value,document.getElementById("toggle-filter-btn").click(),bt()}),At&&Fa.removeEventListener("click",At),At=r=>{const i=r.target.closest('[data-action="open-service-modal"]');if(i){r.preventDefault();let u={};if(i.dataset.service)try{u=JSON.parse(i.dataset.service)}catch{}dl(u);return}if(r.target.closest('[data-action="manage-categories"]')){r.preventDefault(),il();return}const d=r.target.closest(".service-checkbox");if(d){const u=d.dataset.id;d.checked?O.selectedIds.add(u):O.selectedIds.delete(u),Ha(),r.stopPropagation();return}if(r.target.closest("#cancel-selection-btn")){O.selectedIds.clear(),document.querySelectorAll(".service-checkbox").forEach(u=>u.checked=!1),Ha();return}if(r.target.closest("#batch-delete-btn")){cl();return}},Fa.addEventListener("click",At)}async function Pe(){const e=document.getElementById("servicesList"),t=Go();try{const a=t.map(u=>nt(u)),s=t.map(u=>ke(u)),o=t.map(u=>ma(u,"services")),r=await Promise.all(a),i=await Promise.all(s),n=await Promise.all(o),d=new Map;r.flat().filter(Boolean).forEach(u=>d.set(u.id,u)),O.services=Array.from(d.values()),g.services=O.services;const l=new Map;i.flat().filter(Boolean).forEach(u=>l.set(u.id,u)),O.professionals=Array.from(l.values()),g.professionals=O.professionals;const c=new Map;n.flat().filter(Boolean).forEach(u=>c.set(u.id,u)),O.categories=Array.from(c.values()),g.serviceCategories=O.categories,tl(),bt()}catch(a){console.error(a),e.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>'}}function tl(){const e=document.getElementById("filterCategoryId");e&&O.categories&&(e.innerHTML='<option value="all">Todas as categorias</option>',O.categories.forEach(t=>{const a=document.createElement("option");a.value=t.id,a.textContent=h(t.name),O.filterCategoryId===t.id&&(a.selected=!0),e.appendChild(a)}))}function Ha(){const e=document.getElementById("batch-action-bar"),t=document.getElementById("selected-count"),a=O.selectedIds.size;!e||!t||(a>0?(t.textContent=a,e.classList.remove("hidden"),e.classList.add("flex")):(e.classList.add("hidden"),e.classList.remove("flex")))}function al(e){const t=document.getElementById("summary-section");if(!t)return;const a=e.length,s=e.filter(r=>r.active!==!1).length,o=a-s;t.innerHTML=`
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Serviços na Rede</span>
            <span class="text-xl font-black text-gray-800 mt-0.5">${a}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ativos</span>
            <span class="text-xl font-bold text-emerald-600 mt-0.5">${s}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inativos</span>
            <span class="text-xl font-bold text-red-500 mt-0.5">${o}</span>
        </div>
        <div class="bg-indigo-50 p-3 rounded-xl border border-indigo-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Filtrados / Exibidos</span>
            <span class="text-xl font-bold text-indigo-700 mt-0.5">${e.length}</span>
        </div>
    `}function bt(){const e=document.getElementById("servicesList");if(!e)return;if(!O.services||O.services.length===0){e.innerHTML=Qo(8);return}const t=Go(),a=O.services.filter(s=>{const o=s.name.toLowerCase().includes(O.searchQuery);let r=!0;O.statusFilter==="active"&&(r=s.active!==!1),O.statusFilter==="inactive"&&(r=s.active===!1);const i=O.filterCategoryId==="all"||s.categoryId===O.filterCategoryId,n=s.accessibleIn&&s.accessibleIn.length>0?s.accessibleIn:[s.establishmentId||g.establishmentId],d=t.some(l=>n.includes(l));return o&&r&&i&&d});al(a),e.innerHTML=sl(a)}function Qo(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center p-3 animate-pulse h-[74px]">
            <div class="w-10 h-10 rounded bg-gray-200 flex-shrink-0 mr-3"></div>
            <div class="flex-1 space-y-2">
                <div class="h-2.5 bg-gray-200 rounded w-3/4"></div>
                <div class="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function sl(e){if(e.length===0)return`
            <div class="col-span-full flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-scissors text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum serviço encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente ajustar os filtros ou verificar as unidades no topo.</p>
            </div>
        `;const t=new Map((O.categories||[]).map(a=>[a.id,a.name]));return e.map(a=>{const s=a.active===!1,o=h(a.name),r=h(t.get(a.categoryId)||"Sem Categoria"),i=a.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(a.name.charAt(0))}`,n=JSON.stringify(a).replace(/'/g,"&apos;"),d=a.accessibleIn?a.accessibleIn.length:1,l=O.selectedIds.has(a.id),c=a.price!==void 0?parseFloat(a.price).toFixed(2):"0.00",u=a.color||"#4f46e5";return`
            <div class="service-card relative bg-white rounded-xl border ${l?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-gray-200"} shadow-sm flex items-center p-3 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 ${s?"opacity-60 bg-gray-50":""}" 
                 data-action="open-service-modal" data-service='${n}'>
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" onclick="event.stopPropagation()">
                    <input type="checkbox" data-id="${a.id}" class="service-checkbox w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${l?"checked":""}>
                </div>

                <div class="relative flex-shrink-0 mr-3">
                    <img src="${i}" alt="${o}" class="w-12 h-12 rounded-lg object-cover border border-gray-100 shadow-sm" style="border-left: 3px solid ${u};">
                    <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${s?"bg-red-500":"bg-emerald-500"}" title="${s?"Inativo":"Ativo"}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-4">
                    <h3 class="text-xs font-bold text-gray-800 truncate leading-tight">
                        ${o}
                    </h3>
                    <p class="text-[10px] text-gray-500 truncate mt-0.5">${r}</p>
                    
                    <div class="flex items-center justify-between mt-1.5">
                        <span class="text-[11px] font-black text-indigo-600">R$ ${c}</span>
                        <div class="flex gap-1">
                            <span class="text-[8px] font-semibold text-gray-600 bg-gray-100 px-1 py-0.5 rounded border border-gray-200 flex items-center gap-1"><i class="bi bi-clock"></i> ${a.duration}m</span>
                            ${d>1?`<span class="text-[8px] font-bold bg-indigo-50 text-indigo-700 px-1 py-0.5 rounded border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${d}</span>`:""}
                        </div>
                    </div>
                </div>
            </div>`}).join("")}async function ol(e){e.preventDefault();const t=e.target.closest("#categoryForm"),a=t.querySelector("#categoryName"),s=a.value;if(!s)return;const o=t.querySelector('button[type="submit"]');o.disabled=!0,o.textContent="...";try{const r=O.hierarchyCache.reduce((i,n)=>(i.push(n.id),n.branches&&n.branches.forEach(d=>i.push(d.id)),i),[]);r.length===0&&r.push(g.establishmentId),await Wo({establishmentId:g.establishmentId,name:s,accessibleIn:r},"services"),te(g.establishmentId,Ze(),"Categorias (Serviços)","Criou",`Criou categoria: ${s}`),a.value="",b("Sucesso","Categoria criada!","success"),await bs(),await Pe()}catch(r){b("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}finally{o.disabled=!1,o.textContent="Adicionar"}}async function rl(e){if(await Y("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await Jo(e,"services"),te(g.establishmentId,Ze(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${e})`),b("Sucesso","Categoria apagada.","success"),await bs(),await Pe()}catch{b("Erro","Não foi possível apagar a categoria.","error")}}async function bs(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await ma(g.establishmentId,"services");O.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded mb-1">
                    <span class="text-sm font-medium text-gray-700">${h(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-xs bg-red-50 px-2 py-1 rounded">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500 text-sm">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center text-sm">Erro ao carregar categorias.</p>'}}}function il(){me({title:"Categorias de Serviços",contentHTML:`
        <div class="space-y-4">
            <div class="mb-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <p class="text-xs text-indigo-800 mb-3 font-medium">As categorias criadas aqui ficarão disponíveis para toda a rede de lojas.</p>
                <form id="categoryForm" class="flex flex-col sm:flex-row gap-3 sm:items-end">
                    <div class="flex-1 w-full">
                        <label for="categoryName" class="block text-[10px] font-bold text-indigo-900 uppercase tracking-wider mb-1">Nova Categoria</label>
                        <input type="text" id="categoryName" placeholder="Ex: Cabelo, Estética..." required class="w-full p-2 border border-indigo-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                    </div>
                    <button type="submit" class="w-full sm:w-auto py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm text-sm">Adicionar</button>
                </form>
            </div>
            <div id="categoryList" class="space-y-1 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-xl custom-scrollbar"></div>
        </div>
    `,maxWidth:"max-w-lg"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",ol),t.addEventListener("click",s=>{const o=s.target.closest('button[data-action="delete-category"]');o&&(s.preventDefault(),rl(o.dataset.id))}))}bs()}function nl(e=[]){if(!O.hierarchyCache||O.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${g.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                <i class="bi bi-info-circle mr-1"></i> Exclusivo desta unidade.
            </div>`;let t='<div class="space-y-1 mt-2 max-h-40 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30 custom-scrollbar">';return O.hierarchyCache.forEach(a=>{const s=e.includes(a.id)||e.length===0&&a.id===g.establishmentId;t+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${h(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(o=>{const r=e.includes(o.id)||e.length===0&&o.id===g.establishmentId;t+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${o.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${r?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${h(o.name)}</span>
                    </label>
                `})}),t+="</div>",t}async function ll(e){const t=e.target.closest("#serviceForm"),a=t.querySelector("#serviceId").value,s=t.querySelector('button[type="submit"]'),o={},r=t.querySelector('input[name="commissionType"]:checked').value;r==="custom"&&t.querySelectorAll(".professional-commission-row").forEach(c=>{const u=c.dataset.profId;if(c.querySelector('input[type="checkbox"]').checked){const m=parseFloat(c.querySelector('input[type="number"]').value);o[u]=isNaN(m)?0:m}});const i=Array.from(t.querySelectorAll('input[name="accessibleIn"]:checked')).map(c=>c.value),n=i.length>0?i:[g.establishmentId],d={establishmentId:g.establishmentId,accessibleIn:n,name:t.querySelector("#serviceName").value.trim(),price:parseFloat(t.querySelector("#servicePrice").value),duration:parseInt(t.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(t.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:t.querySelector("#serviceCategory").value||null,color:t.querySelector("#serviceColor").value,targetAudience:t.querySelector("#serviceAudience").value,loyaltyPoints:parseInt(t.querySelector("#serviceLoyaltyPoints").value,10)||0,publicDescription:t.querySelector("#servicePublicDescription").value.trim(),homeService:t.querySelector("#serviceHomeToggle").checked,commissionRate:parseFloat(t.querySelector("#serviceCommissionRate").value)||0,active:t.querySelector("#serviceStatusToggle").checked,photo:t.querySelector("#servicePhotoBase64").value,notes:t.querySelector("#serviceNotes").value,commissionType:r,professionalCommissions:o},l=s.innerHTML;s.disabled=!0,s.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{a?(await Mi(a,d),te(g.establishmentId,Ze(),"Serviços","Editou",`Editou o serviço: ${d.name}`),b("Sucesso","Serviço atualizado com sucesso!","success")):(await Ai(d),te(g.establishmentId,Ze(),"Serviços","Criou",`Criou novo serviço: ${d.name}`),b("Sucesso","Serviço adicionado à rede!","success")),document.getElementById("genericModal").style.display="none",await Pe()}catch(c){b("Erro",c.message,"error"),s.disabled=!1,s.innerHTML=l}}function dl(e=null){const t=document.getElementById("genericModal"),a=O.categories||[],s=e?.duration||0,o=e?.bufferTime||0,r=h(e?.name||""),i=h(e?.notes||""),n=h(e?.publicDescription||""),d=e?.id?r:"Novo Serviço",l=e?.color||"#4f46e5",c=e?.loyaltyPoints||0,u=a.map(P=>`<option value="${P.id}" ${e?.categoryId===P.id?"selected":""}>${h(P.name)}</option>`).join(""),p=e?.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(r?r.charAt(0):"S")}`,m=`
        <div class="modal-content max-w-4xl p-0 overflow-hidden flex flex-col max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b bg-white flex-shrink-0">
                <h2 class="text-xl font-bold text-gray-800">${d}</h2>
                <button data-action="close-modal" class="text-gray-400 hover:text-red-500 transition-colors text-3xl leading-none">&times;</button>
            </div>
            
            <div class="modal-tabs px-6 border-b flex items-center overflow-x-auto bg-gray-50 flex-shrink-0 custom-scrollbar">
                <button class="tab-link active whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors" data-tab="dados-basicos">1. Dados Básicos</button>
                <button class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-indigo-500 transition-colors" data-tab="config-avancadas">2. Configurações & App</button>
                <button class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-indigo-500 transition-colors" data-tab="comissoes-servico">3. Comissões</button>
            </div>
            
            <div class="modal-body p-6 bg-white flex-1 overflow-y-auto custom-scrollbar relative"> 
                <form id="serviceForm" class="h-full">
                    <input type="hidden" id="serviceId" value="${e?.id||""}">
                    <input type="hidden" id="servicePhotoBase64" value="${e?.photo||""}">
                    
                    <div id="dados-basicos" class="tab-content active space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="md:col-span-1 space-y-4">
                                <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                                    <label class="block text-sm font-bold text-gray-700 mb-3">Imagem do Serviço</label>
                                    <div class="relative group mx-auto w-32 h-32 mb-4 cursor-pointer" id="servicePhotoContainer">
                                        <img id="servicePhotoPreview" src="${p}" alt="Foto" class="w-32 h-32 rounded-lg object-cover border-4 border-gray-50 shadow-md transition-all group-hover:brightness-75">
                                        <div id="servicePhotoButtonOverlay" class="absolute inset-0 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                                            <i class="bi bi-camera-fill text-white text-3xl drop-shadow-md"></i>
                                        </div>
                                    </div>
                                    <input type="file" id="servicePhotoInput" class="hidden" accept="image/*">
                                    <button type="button" id="servicePhotoButton" class="text-indigo-600 text-sm font-semibold hover:text-indigo-800 transition-colors w-full">Alterar Imagem</button>
                                </div>

                                <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <label for="serviceColor" class="block text-sm font-bold text-gray-700 mb-2 text-center">Cor na Agenda</label>
                                    <div class="flex items-center justify-center gap-3">
                                        <input type="color" id="serviceColor" value="${l}" class="w-12 h-12 p-1 border border-gray-300 rounded cursor-pointer bg-white">
                                        <span class="text-xs text-gray-500 max-w-[120px] text-left leading-tight">Ajuda a identificar visualmente os agendamentos.</span>
                                    </div>
                                </div>
                            </div>

                            <div class="md:col-span-2 space-y-4">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div class="form-group sm:col-span-2">
                                        <label for="serviceName" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-tag text-indigo-500 mr-1"></i> Nome do Serviço <span class="text-red-500">*</span></label>
                                        <input type="text" id="serviceName" value="${r}" required placeholder="Ex: Corte Masculino Degradê" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors text-lg font-semibold text-gray-800">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="servicePrice" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-currency-dollar text-emerald-500 mr-1"></i> Preço (R$) <span class="text-red-500">*</span></label>
                                        <input type="number" id="servicePrice" step="0.01" value="${e?.price!==void 0?e.price:""}" required placeholder="0.00" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 focus:bg-white transition-colors font-bold text-gray-800">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="serviceCategory" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-folder2-open text-amber-500 mr-1"></i> Categoria</label>
                                        <select id="serviceCategory" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                                            <option value="">Sem Categoria</option>
                                            ${u}
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="serviceDurationMinutes" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-clock-history text-blue-500 mr-1"></i> Duração (minutos) <span class="text-red-500">*</span></label>
                                        <input type="number" id="serviceDurationMinutes" min="0" value="${s}" required placeholder="Ex: 45" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="serviceBufferTimeMinutes" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-cup-hot text-orange-400 mr-1"></i> Pausa Pós-Serviço (min)</label>
                                        <input type="number" id="serviceBufferTimeMinutes" min="0" value="${o}" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 focus:bg-white transition-colors" placeholder="Ex: 10 (limpeza, preparo)">
                                    </div>
                                </div>
                                
                                <div class="pt-2 border-t border-gray-100">
                                    <label class="block text-sm font-bold text-indigo-900 mb-1 flex items-center gap-2"><i class="bi bi-diagram-3"></i> Lojas que oferecem este serviço</label>
                                    <p class="text-xs text-gray-500 mb-2">Selecione as unidades onde o serviço pode ser agendado.</p>
                                    ${nl(e?.accessibleIn||[])}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="config-avancadas" class="tab-content hidden space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="space-y-4">
                                <h3 class="text-sm font-bold text-gray-800 border-b pb-2"><i class="bi bi-sliders mr-1"></i> Definições de Atendimento</h3>
                                
                                <div class="form-group">
                                    <label for="serviceAudience" class="block text-sm font-medium text-gray-700 mb-1">Público-Alvo</label>
                                    <select id="serviceAudience" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                                        <option value="todos" ${e?.targetAudience==="todos"?"selected":""}>Todos (Unissex)</option>
                                        <option value="feminino" ${e?.targetAudience==="feminino"?"selected":""}>Feminino</option>
                                        <option value="masculino" ${e?.targetAudience==="masculino"?"selected":""}>Masculino</option>
                                        <option value="infantil" ${e?.targetAudience==="infantil"?"selected":""}>Infantil</option>
                                    </select>
                                </div>

                                <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                                    <div>
                                        <p class="text-sm font-bold text-gray-800"><i class="bi bi-house-door text-indigo-500 mr-1"></i> Atende a domicílio?</p>
                                        <p class="text-[10px] text-gray-500 leading-tight mt-0.5">Permite que o cliente solicite que o profissional vá até ele.</p>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" id="serviceHomeToggle" class="sr-only peer" ${e?.homeService?"checked":""}>
                                        <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>

                                <div class="form-group pt-2">
                                    <label for="serviceNotes" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-journal-text text-gray-500 mr-1"></i> Observações Internas (Só Gestão)</label>
                                    <textarea id="serviceNotes" rows="3" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors placeholder-gray-400" placeholder="Detalhes técnicos, custo de produtos, etc...">${i}</textarea>
                                </div>
                            </div>

                            <div class="space-y-4">
                                <h3 class="text-sm font-bold text-gray-800 border-b pb-2"><i class="bi bi-phone mr-1"></i> Exibição no Aplicativo/Link</h3>

                                <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-center justify-between">
                                    <div>
                                        <p class="text-sm font-bold text-indigo-900">Visível no App / Online</p>
                                        <p class="text-[10px] text-indigo-700 leading-tight mt-0.5">Ative para permitir o agendamento público.</p>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" id="serviceStatusToggle" class="sr-only peer" ${e?.active!==!1?"checked":""}>
                                        <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                    </label>
                                </div>

                                <div class="form-group">
                                    <label for="serviceLoyaltyPoints" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-star text-amber-400 mr-1"></i> Pontos de Fidelidade Ganhos</label>
                                    <div class="flex items-center">
                                        <input type="number" id="serviceLoyaltyPoints" min="0" value="${c}" class="w-full p-2.5 border border-gray-300 rounded-l-lg outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50 focus:bg-white transition-colors" placeholder="0">
                                        <span class="bg-gray-100 border border-l-0 border-gray-300 px-4 py-2.5 rounded-r-lg text-sm font-bold text-gray-500">pts</span>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="servicePublicDescription" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-card-text text-gray-500 mr-1"></i> Descrição Pública para o Cliente</label>
                                    <textarea id="servicePublicDescription" rows="3" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors placeholder-gray-400" placeholder="Ex: Tratamento reconstrutor capilar feito com produtos premium...">${n}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="comissoes-servico" class="tab-content hidden space-y-6">
                        <div class="max-w-2xl mx-auto">
                            <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-6">
                                <label class="block text-base font-bold text-indigo-900 mb-1"><i class="bi bi-percent mr-1"></i> Regras de Comissão</label>
                                <p class="text-xs text-indigo-700 mb-3">Defina como o profissional é remunerado ao executar este serviço.</p>
                                
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                    <label class="flex items-center p-3 border border-indigo-200 bg-white rounded-lg cursor-pointer hover:border-indigo-400 transition-colors shadow-sm">
                                        <input type="radio" name="commissionType" value="default" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500" ${e?.commissionType!=="custom"?"checked":""}>
                                        <span class="ml-3 text-sm font-bold text-gray-700">Taxa Padrão (Igual p/ Todos)</span>
                                    </label>
                                    <label class="flex items-center p-3 border border-indigo-200 bg-white rounded-lg cursor-pointer hover:border-indigo-400 transition-colors shadow-sm">
                                        <input type="radio" name="commissionType" value="custom" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500" ${e?.commissionType==="custom"?"checked":""}>
                                        <span class="ml-3 text-sm font-bold text-gray-700">Taxa Personalizada (Por Membro)</span>
                                    </label>
                                </div>
                            </div>

                            <div id="defaultCommissionRateContainer" class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
                                <label for="serviceCommissionRate" class="block text-sm font-bold text-gray-700 mb-2">Qual a taxa de comissão padrão?</label>
                                <div class="flex items-center justify-center gap-2">
                                    <input type="number" id="serviceCommissionRate" value="${e?.commissionRate||0}" step="0.1" class="w-32 p-3 text-xl font-black text-center border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white text-indigo-600">
                                    <span class="text-xl font-black text-gray-400">%</span>
                                </div>
                            </div>
                            
                            <div id="professionalCommissionsContainer" class="hidden">
                                <div class="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                    <div class="grid grid-cols-[1fr_auto] items-center p-3 bg-gray-100 font-bold text-xs text-gray-600 uppercase tracking-wider border-b border-gray-200">
                                        <span>Profissional Habilitado</span>
                                        <span class="text-center w-24">Taxa (%)</span>
                                    </div>
                                    <div id="professionalCommissionsList" class="space-y-1 max-h-[300px] overflow-y-auto p-2 bg-white custom-scrollbar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            
            <div class="modal-footer px-6 py-4 bg-gray-50 border-t flex justify-between items-center flex-shrink-0">
                <button type="button" data-action="delete-service" data-id="${e?.id||""}" class="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-colors ${e?.id?"":"hidden"}" title="Excluir Serviço">
                    <i class="bi bi-trash3 mr-1"></i> Excluir
                </button>

                <div class="flex gap-3 ml-auto">
                    <button data-action="close-modal" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 shadow-sm transition-colors">Cancelar</button>
                    <button type="button" data-action="save-service" class="py-2.5 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm flex items-center gap-2 transition-colors">
                        <i class="bi bi-save"></i> Salvar
                    </button>
                </div>
            </div>
        </div>`;t.innerHTML=m,t.style.display="flex",t.querySelectorAll(".tab-link").forEach(P=>{P.addEventListener("click",()=>{t.querySelectorAll(".tab-link").forEach(F=>{F.classList.remove("active","border-indigo-600","text-indigo-600"),F.classList.add("border-transparent","text-gray-500")}),P.classList.add("active","border-indigo-600","text-indigo-600"),P.classList.remove("border-transparent","text-gray-500"),t.querySelectorAll(".tab-content").forEach(F=>F.classList.add("hidden")),document.getElementById(P.dataset.tab).classList.remove("hidden")})});const y=t.querySelectorAll('input[name="commissionType"]'),w=document.getElementById("defaultCommissionRateContainer"),f=document.getElementById("professionalCommissionsContainer");function S(){const P=t.querySelector('input[name="commissionType"]:checked').value;w&&(w.style.display=P==="default"?"block":"none"),f&&(f.style.display=P==="custom"?"block":"none")}y.forEach(P=>P.addEventListener("change",S));const T=document.getElementById("professionalCommissionsList");T&&(T.innerHTML=(O.professionals||[]).map(P=>{const F=e?.professionalCommissions?.[P.id]!==void 0,V=e?.professionalCommissions?.[P.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-lg border border-transparent hover:bg-gray-50 transition-colors ${F?"bg-indigo-50/50 border-indigo-100":""}" data-prof-id="${P.id}">
                    <label class="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                        <input type="checkbox" ${F?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <img src="${P.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${h(P.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0">
                        <span class="text-sm font-bold text-gray-700 truncate">${h(P.name)}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${V}" step="0.1" class="w-20 p-1.5 border border-gray-300 rounded-lg text-sm text-center outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${F?"":"disabled"}>
                        <span class="text-sm font-black text-gray-400">%</span>
                    </div>
                </div>
            `}).join(""),T.querySelectorAll('input[type="checkbox"]').forEach(P=>{P.addEventListener("change",F=>{const V=F.target.closest(".professional-commission-row");V.querySelector('input[type="number"]').disabled=!F.target.checked,V.classList.toggle("bg-indigo-50/50",F.target.checked),V.classList.toggle("border-indigo-100",F.target.checked),V.classList.toggle("border-transparent",!F.target.checked)})})),S();const L=t.querySelector("#servicePhotoInput"),k=t.querySelector("#servicePhotoButton"),x=t.querySelector("#servicePhotoContainer"),I=t.querySelector("#servicePhotoPreview"),C=t.querySelector("#servicePhotoBase64"),M=()=>L.click();k&&k.addEventListener("click",M),x&&x.addEventListener("click",M),L.onchange=async()=>{const P=L.files[0];if(P){I.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const F=await is(P,800,800,.8);if(F.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");I.src=F,C.value=F}catch(F){b("Erro de Imagem",F.message,"error"),I.src=p,C.value=e?.photo||""}}};const B=t.querySelector("#serviceForm");t.onclick=async P=>{const F=P.target.closest("button[data-action]");if(!F)return;const V=F.dataset.action,_=F.dataset.id;if(V==="close-modal"&&(t.style.display="none"),V==="save-service"&&B.reportValidity()&&ll({target:B}),V==="delete-service"){if(!_)return;if(await Y("Apagar Serviço","Tem certeza que deseja excluir este serviço da rede?"))try{const U=O.services.find(ne=>ne.id===_)?.name||"Desconhecido";await wo(_),te(g.establishmentId,Ze(),"Serviços","Excluiu",`Excluiu o serviço: ${U}`),b("Sucesso","Serviço apagado da rede.","success"),t.style.display="none",await Pe()}catch(U){b("Erro",`Não foi possível apagar o serviço: ${U.message}`,"error")}}}}function cl(){Y("Excluir em Lote",`Tem certeza que deseja excluir ${O.selectedIds.size} serviços da rede? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{const t=Array.from(O.selectedIds).map(a=>wo(a));await Promise.all(t),te(g.establishmentId,Ze(),"Serviços","Excluiu em Lote",`Excluiu ${O.selectedIds.size} serviços`),b("Sucesso",`${O.selectedIds.size} serviços foram excluídos.`,"success"),O.selectedIds.clear(),Ha(),Pe()}catch(t){b("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}const fa="suppliers",Lt=async e=>{try{const t=lo(ia(Se,fa),co("establishmentId","==",e)),a=await Lr(t),s=[];return a.forEach(o=>{s.push({id:o.id,...o.data()})}),s}catch(t){throw console.error("Erro ao buscar fornecedores:",t),t}},ul=async e=>{try{return{id:(await no(ia(Se,fa),e)).id,...e}}catch(t){throw console.error("Erro ao criar fornecedor:",t),t}},pl=async(e,t)=>{try{const a=Ct(Se,fa,e);return await as(a,t),{id:e,...t}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},gl=async e=>{try{const t=Ct(Se,fa,e);return await Cr(t),!0}catch(t){throw console.error("Erro ao excluir fornecedor:",t),t}},mt=document.getElementById("content");let j={products:[],categories:[],suppliers:[],hierarchyCache:[],currentTab:"catalogo",stockFilter:"all",searchQuery:"",filterCategoryId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set},Mt=null;function qe(){const e=be.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}function ms(){const e=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return e.length>0?Array.from(e).map(t=>t.value):[g.establishmentId]}function wa(e){return e?e._seconds?new Date(e._seconds*1e3):e.seconds?new Date(e.seconds*1e3):new Date(e):new Date}async function bl(){j.selectedIds.clear(),j.currentTab="catalogo";try{const e=await xe();j.hierarchyCache=e.matrizes||[]}catch(e){console.warn("Erro ao buscar lojas",e)}fs(),fl(),await Ie()}function fs(){mt.innerHTML=`
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative">
            
            <div class="mb-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-shrink-0">
                <nav class="flex overflow-x-auto custom-scrollbar">
                    <button data-main-tab="catalogo" class="flex-1 py-4 px-6 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${j.currentTab==="catalogo"?"border-indigo-600 text-indigo-600 bg-indigo-50/50":"border-transparent text-gray-500 hover:text-indigo-500 hover:bg-gray-50"}">
                        <i class="bi bi-box-seam mr-2"></i> Catálogo de Produtos
                    </button>
                    <button data-main-tab="movimentacoes" class="flex-1 py-4 px-6 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${j.currentTab==="movimentacoes"?"border-indigo-600 text-indigo-600 bg-indigo-50/50":"border-transparent text-gray-500 hover:text-indigo-500 hover:bg-gray-50"}">
                        <i class="bi bi-arrow-left-right mr-2"></i> Estoque e Movimentações
                    </button>
                </nav>
            </div>

            <div id="main-tab-content" class="flex-1 flex flex-col min-h-0 relative">
                </div>
        </section>
    `,ml()}function ml(){const e=document.getElementById("main-tab-content");if(e){if(j.currentTab==="catalogo")e.innerHTML=`
            <div id="batch-action-bar" class="hidden absolute top-0 left-0 right-0 z-30 bg-gray-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down mx-2">
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
                <div class="flex bg-gray-200/80 p-1 rounded-xl border border-gray-300 w-full md:w-auto shadow-inner hidden md:flex opacity-0 pointer-events-none">
                    <button class="flex-1 md:w-32 py-1.5 text-xs font-bold rounded-lg transition-all flex justify-center items-center gap-2">Space</button>
                </div>

                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end ml-auto">
                    <button data-action="manage-categories" class="py-1.5 px-3 bg-white text-gray-700 border border-gray-300 font-bold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-tags text-sm"></i> Categorias
                    </button>
                    <button data-action="open-product-modal" data-product="{}" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-plus-lg text-sm"></i> Novo Produto
                    </button>
                </div>
            </div>

            <div id="summary-section" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 flex-shrink-0"></div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 w-full flex-shrink-0">
                <div class="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto custom-scrollbar">
                    <button data-status="all" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${j.stockFilter==="all"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Todos</button>
                    <button data-status="ok" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${j.stockFilter==="ok"?"bg-green-50 text-green-700 border-green-200":"bg-white text-gray-600 hover:bg-gray-50"}">Em Dia</button>
                    <button data-status="alert" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${j.stockFilter==="alert"?"bg-orange-50 text-orange-700 border-orange-200":"bg-white text-gray-600 hover:bg-gray-50"}">Alerta</button>
                    <button data-status="empty" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${j.stockFilter==="empty"?"bg-red-50 text-red-700 border-red-200":"bg-white text-gray-600 hover:bg-gray-50"}">Esgotados</button>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                    <div class="relative flex-shrink-0 w-full md:w-64">
                        <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input type="text" id="searchInput" value="${j.searchQuery}" placeholder="Pesquisar produto..." class="w-full pl-8 p-1.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                    <button id="toggle-filter-btn" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5 text-xs flex-shrink-0 ${j.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                        <i class="bi bi-funnel"></i> Filtros
                    </button>
                </div>
            </div>

            <div id="filter-panel" class="${j.isAdvancedFilterOpen?"block":"hidden"} mb-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm animate-fade-in flex-shrink-0">
                <div class="flex flex-col md:flex-row items-end gap-3">
                    <div class="w-full md:w-64">
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Categoria</label>
                        <select id="filterCategoryId" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white outline-none focus:ring-1 focus:ring-indigo-500">
                            <option value="all">Todas as categorias</option>
                        </select>
                    </div>
                    <div class="flex gap-2 w-full md:w-auto">
                        <button id="clear-filters-btn" class="w-full md:w-auto px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-xs">Limpar</button>
                        <button id="apply-filter-btn" class="w-full md:w-auto px-5 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition-all text-xs">Aplicar</button>
                    </div>
                </div>
            </div>

            <div id="productsList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                ${Yo(8)}
            </div>

            <button data-action="open-product-modal" data-product="{}" class="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40">
                <i class="bi bi-plus-lg text-xl"></i>
            </button>
        `,Xo(),_e();else if(j.currentTab==="movimentacoes"){const t=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const s=a.toISOString().split("T")[0],o=(j.products||[]).map(i=>`<option value="${i.id}">${h(i.name)}</option>`).join(""),r=(j.categories||[]).map(i=>`<option value="${i.id}">${h(i.name)}</option>`).join("");e.innerHTML=`
            <div class="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div class="bg-white px-5 py-4 border-b border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4 flex-shrink-0">
                    <div>
                        <h2 class="text-base font-bold text-gray-800 flex items-center gap-2"><i class="bi bi-arrow-left-right text-indigo-500"></i> Histórico de Estoque</h2>
                        <p class="text-[11px] text-gray-500 mt-0.5">Acompanhe entradas e saídas de mercadoria consolidadas na rede.</p>
                    </div>
                    <button data-action="open-new-movement-modal" class="w-full md:w-auto py-2 px-5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2 text-xs">
                        <i class="bi bi-plus-circle"></i> Nova Movimentação
                    </button>
                </div>

                <div class="bg-gray-50 px-5 py-2.5 border-b border-gray-200 flex-shrink-0">
                    <div class="flex flex-wrap md:flex-nowrap gap-3 items-end">
                        <div class="w-full md:w-32">
                            <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Início</label>
                            <input type="date" id="reportStartDate" value="${s}" class="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs outline-none focus:border-indigo-500 bg-white h-[30px]">
                        </div>
                        <div class="w-full md:w-32">
                            <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Fim</label>
                            <input type="date" id="reportEndDate" value="${t}" class="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs outline-none focus:border-indigo-500 bg-white h-[30px]">
                        </div>
                        <div class="w-full md:w-auto flex-1">
                            <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Filtrar Produto</label>
                            <select id="productFilterReport" class="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs outline-none focus:border-indigo-500 bg-white h-[30px]">
                                <option value="all">Todos os produtos</option>${o}
                            </select>
                        </div>
                        <div class="w-full md:w-auto flex-1 hidden md:block">
                            <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Categoria</label>
                            <select id="categoryFilterReport" class="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs outline-none focus:border-indigo-500 bg-white h-[30px]">
                                <option value="all">Todas as categorias</option>${r}
                            </select>
                        </div>
                        <div class="w-full md:w-auto">
                            <button id="btn-generate-report" class="bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold px-4 py-1.5 rounded-md hover:bg-indigo-100 transition-colors text-xs w-full md:w-auto h-[30px] flex items-center justify-center gap-1.5">
                                <i class="bi bi-search"></i> Buscar
                            </button>
                        </div>
                    </div>
                </div>
                
                <div id="report-results" class="flex-1 overflow-hidden flex flex-col bg-white relative">
                    <div class="flex items-center justify-center h-full p-8 text-center">
                        <div class="loader"></div>
                    </div>
                </div>
            </div>
        `,document.getElementById("btn-generate-report").addEventListener("click",za),za()}}}function fl(){const e=document.getElementById("multi-context-apply");e&&(e.removeEventListener("click",Ie),e.addEventListener("click",()=>{setTimeout(Ie,100)})),Mt&&mt.removeEventListener("click",Mt),Mt=t=>{const a=t.target.closest("[data-main-tab]");if(a){j.currentTab=a.dataset.mainTab,fs();return}if(t.target.classList.contains("status-filter-btn")){const l=t.target.dataset.status;j.stockFilter=l,document.querySelectorAll(".status-filter-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200","bg-green-50","text-green-700","border-green-200","bg-orange-50","text-orange-700","border-orange-200","bg-red-50","text-red-700","border-red-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),l==="ok"?t.target.classList.add("bg-green-50","text-green-700","border-green-200"):l==="alert"?t.target.classList.add("bg-orange-50","text-orange-700","border-orange-200"):l==="empty"?t.target.classList.add("bg-red-50","text-red-700","border-red-200"):t.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),t.target.classList.remove("bg-white","text-gray-600","border-gray-200"),_e();return}const s=t.target.closest('[data-action="open-product-modal"]');if(s){t.preventDefault();let l={};if(s.dataset.product)try{l=JSON.parse(s.dataset.product)}catch{}El(l);return}if(t.target.closest('[data-action="manage-categories"]')){t.preventDefault(),wl();return}if(t.target.closest('[data-action="open-new-movement-modal"]')){t.preventDefault(),Ko();return}const i=t.target.closest(".product-checkbox");if(i){const l=i.dataset.id;i.checked?j.selectedIds.add(l):j.selectedIds.delete(l),Oa(),t.stopPropagation();return}if(t.target.closest("#cancel-selection-btn")){j.selectedIds.clear(),document.querySelectorAll(".product-checkbox").forEach(l=>l.checked=!1),Oa();return}if(t.target.closest("#batch-delete-btn")){Il();return}},mt.addEventListener("click",Mt),mt.addEventListener("input",t=>{t.target.id==="searchInput"&&(j.searchQuery=t.target.value.toLowerCase(),_e())}),mt.addEventListener("click",t=>{const a=t.target.closest("#toggle-filter-btn");if(a){const r=document.getElementById("filter-panel");j.isAdvancedFilterOpen=!j.isAdvancedFilterOpen,j.isAdvancedFilterOpen?(r.classList.remove("hidden"),a.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.remove("bg-white","text-gray-600","border-gray-200")):(r.classList.add("hidden"),a.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.add("bg-white","text-gray-600","border-gray-200"))}t.target.closest("#clear-filters-btn")&&(j.filterCategoryId="all",document.getElementById("filterCategoryId").value="all",_e()),t.target.closest("#apply-filter-btn")&&(j.filterCategoryId=document.getElementById("filterCategoryId").value,document.getElementById("toggle-filter-btn").click(),_e())})}async function Ie(){const e=ms();try{const t=e.map(n=>lt(n)),a=e.map(n=>ma(n,"products")),[s,o]=await Promise.all([Promise.all(t),Promise.all(a)]),r=new Map;s.flat().filter(Boolean).forEach(n=>r.set(n.id,n)),j.products=Array.from(r.values()),g.products=j.products;const i=new Map;o.flat().filter(Boolean).forEach(n=>i.set(n.id,n)),j.categories=Array.from(i.values()),g.categories=j.categories,j.currentTab==="catalogo"?(Xo(),_e()):j.currentTab==="movimentacoes"&&za(),j.suppliers=[],e.forEach(async n=>{try{let d=[];typeof Lt=="function"&&(d=await Lt(n)),d.forEach(l=>{j.suppliers.find(c=>c.id===l.id)||j.suppliers.push(l)}),g.suppliers=j.suppliers}catch(d){console.warn("Aviso: Falha ao carregar fornecedores em background.",d)}})}catch(t){console.error("Erro detalhado ao carregar produtos:",t);const a=document.getElementById("productsList");a&&(a.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>')}}function Xo(){const e=document.getElementById("filterCategoryId");e&&j.categories&&(e.innerHTML='<option value="all">Todas as categorias</option>',j.categories.forEach(t=>{const a=document.createElement("option");a.value=t.id,a.textContent=h(t.name),j.filterCategoryId===t.id&&(a.selected=!0),e.appendChild(a)}))}function Oa(){const e=document.getElementById("batch-action-bar"),t=document.getElementById("selected-count"),a=j.selectedIds.size;!e||!t||(a>0?(t.textContent=a,e.classList.remove("hidden"),e.classList.add("flex")):(e.classList.add("hidden"),e.classList.remove("flex")))}function xl(e){const t=document.getElementById("summary-section");if(!t)return;let a=e.length,s=0,o=0,r=0;e.forEach(i=>{const n=i.currentStock||0,d=i.minStock||0;n<=0?r++:d>0&&n<=d||d>0&&n<=d*1.2?o++:s++}),t.innerHTML=`
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Catálogo</span>
            <span class="text-xl font-black text-gray-800 mt-0.5">${a}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Estoque OK</span>
            <span class="text-xl font-bold text-emerald-600 mt-0.5">${s}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Alerta</span>
            <span class="text-xl font-bold text-orange-500 mt-0.5">${o}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-red-500 uppercase tracking-widest">Esgotados</span>
            <span class="text-xl font-bold text-red-600 mt-0.5">${r}</span>
        </div>
    `}function _e(){const e=document.getElementById("productsList");if(!e)return;if(!j.products||j.products.length===0){e.innerHTML=Yo(8);return}const t=ms(),a=j.products.filter(s=>{const o=s.name.toLowerCase().includes(j.searchQuery),r=s.currentStock||0,i=s.minStock||0;let n=!0;j.stockFilter==="ok"&&(n=r>0&&(i===0||r>i*1.2)),j.stockFilter==="alert"&&(n=i>0&&r>0&&r<=i*1.2),j.stockFilter==="empty"&&(n=r<=0);const d=j.filterCategoryId==="all"||s.categoryId===j.filterCategoryId,l=s.accessibleIn&&s.accessibleIn.length>0?s.accessibleIn:[s.establishmentId||g.establishmentId],c=t.some(u=>l.includes(u));return o&&n&&d&&c});xl(a),e.innerHTML=hl(a)}function Yo(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center p-3 animate-pulse h-[74px]">
            <div class="w-10 h-10 rounded-md bg-gray-200 flex-shrink-0 mr-3"></div>
            <div class="flex-1 space-y-2">
                <div class="h-2.5 bg-gray-200 rounded w-3/4"></div>
                <div class="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function hl(e){if(e.length===0)return`
            <div class="col-span-full flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-box-seam text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum produto encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente ajustar os filtros ou verificar as unidades no topo.</p>
            </div>
        `;const t=new Map((j.categories||[]).map(a=>[a.id,a.name]));return e.map(a=>{const s=h(a.name),o=h(t.get(a.categoryId)||"Sem Categoria"),r=a.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(a.name.charAt(0))}`,i=JSON.stringify(a).replace(/'/g,"&apos;"),n=a.accessibleIn?a.accessibleIn.length:1,d=j.selectedIds.has(a.id),l=a.price!==void 0?parseFloat(a.price).toFixed(2):"0.00",c=a.currentStock||0,u=a.minStock||0;let p="bg-emerald-500",m=!1;return c<=0?(p="bg-red-500",m=!0):u>0&&c<=u*1.2&&(p="bg-orange-500"),`
            <div class="product-card relative bg-white rounded-xl border ${d?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-gray-200"} shadow-sm flex items-center p-3 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 ${m?"opacity-70 bg-gray-50":""}" 
                 data-action="open-product-modal" data-product='${i}'>
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" onclick="event.stopPropagation()">
                    <input type="checkbox" data-id="${a.id}" class="product-checkbox w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${d?"checked":""}>
                </div>

                <div class="relative flex-shrink-0 mr-3">
                    <img src="${r}" alt="${s}" class="w-12 h-12 rounded-md object-cover border border-gray-100 shadow-sm">
                    <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${p}" title="Estoque: ${c}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-4">
                    <h3 class="text-xs font-bold text-gray-800 truncate leading-tight">
                        ${s}
                    </h3>
                    <p class="text-[10px] text-gray-500 truncate mt-0.5">${o}</p>
                    
                    <div class="flex items-center justify-between mt-1.5">
                        <span class="text-[11px] font-black text-indigo-600">R$ ${l}</span>
                        <div class="flex gap-1">
                            <span class="text-[8px] font-semibold text-gray-600 bg-gray-100 px-1 py-0.5 rounded border border-gray-200 flex items-center gap-1"><i class="bi bi-box2"></i> ${c}x</span>
                            ${n>1?`<span class="text-[8px] font-bold bg-indigo-50 text-indigo-700 px-1 py-0.5 rounded border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${n}</span>`:""}
                        </div>
                    </div>
                </div>
            </div>`}).join("")}async function yl(e){e.preventDefault();const t=e.target.closest("#categoryForm"),a=t.querySelector("#categoryName"),s=a.value;if(!s)return;const o=t.querySelector('button[type="submit"]');o.disabled=!0,o.textContent="...";try{const r=j.hierarchyCache.reduce((i,n)=>(i.push(n.id),n.branches&&n.branches.forEach(d=>i.push(d.id)),i),[]);r.length===0&&r.push(g.establishmentId),await Wo({establishmentId:g.establishmentId,name:s,accessibleIn:r},"products"),te(g.establishmentId,qe(),"Categorias (Produtos)","Criou",`Criou categoria: ${s}`),a.value="",b("Sucesso","Categoria criada!","success"),await xs(),await Ie()}catch(r){b("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}finally{o.disabled=!1,o.textContent="Adicionar"}}async function vl(e){if(await Y("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await Jo(e,"products"),te(g.establishmentId,qe(),"Categorias (Produtos)","Excluiu",`Excluiu uma categoria (ID: ${e})`),b("Sucesso","Categoria apagada.","success"),await xs(),await Ie()}catch{b("Erro","Não foi possível apagar a categoria.","error")}}async function xs(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await ma(g.establishmentId,"products");j.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded mb-1">
                    <span class="text-sm font-medium text-gray-700">${h(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-xs bg-red-50 px-2 py-1 rounded">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500 text-sm">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center text-sm">Erro ao carregar categorias.</p>'}}}function wl(){me({title:"Categorias de Produtos",contentHTML:`
        <div class="space-y-4">
            <div class="mb-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <p class="text-xs text-indigo-800 mb-3 font-medium">As categorias de produtos ficarão disponíveis para toda a rede de lojas.</p>
                <form id="categoryForm" class="flex flex-col sm:flex-row gap-3 sm:items-end">
                    <div class="flex-1 w-full">
                        <label for="categoryName" class="block text-[10px] font-bold text-indigo-900 uppercase tracking-wider mb-1">Nova Categoria</label>
                        <input type="text" id="categoryName" placeholder="Ex: Shampoos, Ferramentas..." required class="w-full p-2 border border-indigo-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                    </div>
                    <button type="submit" class="w-full sm:w-auto py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm text-sm">Adicionar</button>
                </form>
            </div>
            <div id="categoryList" class="space-y-1 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-xl custom-scrollbar"></div>
        </div>
    `,maxWidth:"max-w-lg"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",yl),t.addEventListener("click",s=>{const o=s.target.closest('button[data-action="delete-category"]');o&&(s.preventDefault(),vl(o.dataset.id))}))}xs()}function Ko(){const e=(j.products||[]).map(r=>`<option value="${r.id}">${h(r.name)} (Estoque: ${r.currentStock||0})</option>`).join(""),a=`
        <div class="space-y-4 p-2">
            <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-4">
                <p class="text-sm text-indigo-800 font-medium">Registre entradas de mercadorias ou saídas/perdas manuais no estoque.</p>
            </div>
            <form id="newMovementForm" class="space-y-4">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Unidade de Estoque <span class="text-red-500">*</span></label>
                        <select id="movEstablishmentId" required class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                            ${j.hierarchyCache.reduce((r,i)=>(r.push(`<option value="${i.id}">🏢 ${h(i.name)}</option>`),i.branches&&i.branches.forEach(n=>r.push(`<option value="${n.id}">📍 ${h(n.name)}</option>`)),r),[]).join("")}
                        </select>
                        <p class="text-[10px] text-gray-500 mt-1">Em qual loja este produto está entrando/saindo?</p>
                    </div>

                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Produto <span class="text-red-500">*</span></label>
                        <select id="movProductId" required class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="">Selecione o produto...</option>
                            ${e}
                        </select>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Tipo de Movimento</label>
                        <div class="flex gap-2">
                            <label class="flex-1 flex items-center justify-center p-2 border border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50 has-[:checked]:text-emerald-700">
                                <input type="radio" name="movType" value="in" checked class="sr-only">
                                <i class="bi bi-arrow-down-circle mr-2"></i> <span class="font-bold text-sm">Entrada</span>
                            </label>
                            <label class="flex-1 flex items-center justify-center p-2 border border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors has-[:checked]:border-red-500 has-[:checked]:bg-red-50 has-[:checked]:text-red-700">
                                <input type="radio" name="movType" value="out" class="sr-only">
                                <i class="bi bi-arrow-up-circle mr-2"></i> <span class="font-bold text-sm">Saída</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Quantidade <span class="text-red-500">*</span></label>
                        <input type="number" id="movAmount" required min="1" placeholder="Ex: 10" class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 font-bold">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Motivo / Observação <span class="text-red-500">*</span></label>
                    <input type="text" id="movReason" required placeholder="Ex: Compra com fornecedor, Quebra, Validade..." class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                </div>

                <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
                    <button type="button" onclick="document.getElementById('genericModal').style.display='none'" class="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancelar</button>
                    <button type="submit" class="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                        <i class="bi bi-check2"></i> Confirmar Lançamento
                    </button>
                </div>
            </form>
        </div>
    `;me({title:"Lançar Movimentação",contentHTML:a,maxWidth:"max-w-lg"});const s=document.getElementById("movEstablishmentId");s&&(s.value=g.establishmentId);const o=document.getElementById("newMovementForm");o.onsubmit=async r=>{r.preventDefault();const i=o.querySelector('button[type="submit"]'),n=i.innerHTML,d=document.getElementById("movProductId")?.value,l=document.getElementById("movEstablishmentId")?.value,c=o.querySelector('input[name="movType"]:checked')?.value,u=parseInt(document.getElementById("movAmount")?.value,10),p=document.getElementById("movReason")?.value.trim();if(!d||!u||u<=0||!p||!l){b("Erro","Preencha todos os campos corretamente.","warning");return}const m=c==="in"?u:-u;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> Salvando...';try{await Po(d,{change:m,reason:p,establishmentId:l});const y=j.products.find(w=>w.id===d)?.name||"Produto";te(l,qe(),"Estoque","Ajuste Manual",`Lançou movimentação (${m>0?"+":""}${m}) para ${y}`),b("Sucesso","Movimentação registrada com sucesso!","success"),document.getElementById("genericModal").style.display="none",await Ie()}catch(y){b("Erro",y.message,"error"),i.disabled=!1,i.innerHTML=n}}}function kl(e=[]){if(!j.hierarchyCache||j.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${g.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                <i class="bi bi-info-circle mr-1"></i> Exclusivo desta unidade.
            </div>`;let t='<div class="space-y-1 mt-2 max-h-40 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30 custom-scrollbar">';return j.hierarchyCache.forEach(a=>{const s=e.includes(a.id)||e.length===0&&a.id===g.establishmentId;t+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${h(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(o=>{const r=e.includes(o.id)||e.length===0&&o.id===g.establishmentId;t+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${o.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${r?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${h(o.name)}</span>
                    </label>
                `})}),t+="</div>",t}async function $l(e){e.preventDefault();const t=document.getElementById("productId")?.value||"",a=document.querySelector('#productForm button[type="submit"]'),s=parseInt(document.getElementById("productCurrentStock")?.value||"0",10),o=parseInt(document.getElementById("productMinStock")?.value||"0",10),r=parseInt(document.getElementById("productMaxStock")?.value||"0",10),i=document.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),n=Array.from(i).map(y=>y.dataset.id),d=Array.from(document.querySelectorAll('#productForm input[name="accessibleIn"]:checked')).map(y=>y.value),l=d.length>0?d:[g.establishmentId],c=document.getElementById("productName"),u=document.getElementById("productPrice");if(!c?.value||!u?.value){b("Aviso","Preencha o Nome e o Preço do produto.","warning");return}const p={establishmentId:g.establishmentId,accessibleIn:l,name:c.value.trim(),price:parseFloat(u.value),costPrice:parseFloat(document.getElementById("productCostPrice")?.value)||0,commissionRate:parseFloat(document.getElementById("productCommissionRate")?.value)||0,currentStock:isNaN(s)?0:s,minStock:isNaN(o)?0:o,maxStock:isNaN(r)?0:r,categoryId:document.getElementById("productCategory")?.value||null,photo:document.getElementById("productPhotoBase64")?.value||"",supplierIds:n},m=a?a.innerHTML:"Salvar";a&&(a.disabled=!0,a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...');try{t?(await To(t,p),te(g.establishmentId,qe(),"Produtos","Editou",`Editou o produto: ${p.name}`),b("Sucesso","Produto atualizado com sucesso!","success")):(await Do(p),te(g.establishmentId,qe(),"Produtos","Criou",`Criou novo produto: ${p.name}`),b("Sucesso","Produto adicionado à rede!","success")),document.getElementById("genericModal").style.display="none",await Ie()}catch(y){b("Erro",y.message,"error"),a&&(a.disabled=!1,a.innerHTML=m)}}function El(e=null){const t=document.getElementById("genericModal"),a=j.categories||[],s=h(e?.name||""),o=e?.price!==void 0?e.price:"",r=e?.costPrice!==void 0?e.costPrice:"",i=e?.commissionRate!==void 0?e.commissionRate:"",n=e?.currentStock||0,d=e?.minStock||0,l=e?.maxStock||0,c=e?.id?s:"Novo Produto",u=a.map(C=>`<option value="${C.id}" ${e?.categoryId===C.id?"selected":""}>${h(C.name)}</option>`).join(""),p=e?.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(s?s.charAt(0):"P")}`,m=`
        <div class="modal-content max-w-4xl p-0 overflow-hidden flex flex-col max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b bg-white flex-shrink-0">
                <h2 class="text-xl font-bold text-gray-800">${c}</h2>
                <button type="button" data-action="close-modal" class="text-gray-400 hover:text-red-500 transition-colors text-3xl leading-none">&times;</button>
            </div>
            
            <div class="modal-tabs px-6 border-b flex items-center overflow-x-auto bg-gray-50 flex-shrink-0 custom-scrollbar">
                <button type="button" class="tab-link active whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors" data-tab="dados-produto">1. Dados Básicos</button>
                <button type="button" class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-indigo-500 transition-colors" data-tab="estoque-produto">2. Estoque & Ajustes</button>
                <button type="button" class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-indigo-500 transition-colors" data-tab="fornecedores-produto">3. Fornecedores</button>
            </div>
            
            <form id="productForm" class="flex-1 flex flex-col overflow-hidden">
                <div class="modal-body p-6 bg-white flex-1 overflow-y-auto custom-scrollbar relative"> 
                    <input type="hidden" id="productId" value="${e?.id||""}">
                    <input type="hidden" id="productPhotoBase64" value="${e?.photo||""}">
                    
                    <div id="dados-produto" class="tab-content active space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="md:col-span-1 space-y-4">
                                <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                                    <label class="block text-sm font-bold text-gray-700 mb-3">Foto do Produto</label>
                                    <div class="relative group mx-auto w-32 h-32 mb-4 cursor-pointer" id="productPhotoContainer">
                                        <img id="productPhotoPreview" src="${p}" alt="Foto" class="w-32 h-32 rounded-lg object-cover border-4 border-gray-50 shadow-md transition-all group-hover:brightness-75">
                                        <div id="productPhotoButtonOverlay" class="absolute inset-0 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                                            <i class="bi bi-camera-fill text-white text-3xl drop-shadow-md"></i>
                                        </div>
                                    </div>
                                    <input type="file" id="productPhotoInput" class="hidden" accept="image/*">
                                    <button type="button" id="productPhotoButton" class="text-indigo-600 text-sm font-semibold hover:text-indigo-800 transition-colors w-full">Alterar Imagem</button>
                                </div>
                            </div>

                            <div class="md:col-span-2 space-y-4">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div class="form-group sm:col-span-2">
                                        <label for="productName" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-tag text-indigo-500 mr-1"></i> Nome do Produto <span class="text-red-500">*</span></label>
                                        <input type="text" id="productName" value="${s}" required placeholder="Ex: Shampoo Revitalizante 300ml" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors text-lg font-semibold text-gray-800">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="productCategory" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-folder2-open text-amber-500 mr-1"></i> Categoria</label>
                                        <select id="productCategory" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                                            <option value="">Sem Categoria</option>
                                            ${u}
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label for="productPrice" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-currency-dollar text-emerald-500 mr-1"></i> Preço de Venda (R$) <span class="text-red-500">*</span></label>
                                        <input type="number" id="productPrice" step="0.01" value="${o}" required placeholder="0.00" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 focus:bg-white transition-colors font-bold text-gray-800">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="productCostPrice" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-graph-down-arrow text-red-400 mr-1"></i> Custo Médio (R$)</label>
                                        <input type="number" id="productCostPrice" step="0.01" value="${r}" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-400 bg-gray-50 focus:bg-white transition-colors" placeholder="0.00">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="productCommissionRate" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-percent text-blue-500 mr-1"></i> Comissão ao Vender (%)</label>
                                        <input type="number" id="productCommissionRate" step="0.1" min="0" value="${i}" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors" placeholder="Ex: 10">
                                    </div>
                                </div>
                                
                                <div class="pt-2 border-t border-gray-100">
                                    <label class="block text-sm font-bold text-indigo-900 mb-1 flex items-center gap-2"><i class="bi bi-diagram-3"></i> Lojas que vendem o produto</label>
                                    <p class="text-xs text-gray-500 mb-2">Selecione as unidades onde o produto estará no catálogo.</p>
                                    ${kl(e?.accessibleIn||[])}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="estoque-produto" class="tab-content hidden space-y-6">
                        <div class="max-w-2xl mx-auto">
                            <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-6">
                                <h3 class="text-base font-bold text-gray-800 mb-4 flex items-center gap-2"><i class="bi bi-box-seam text-indigo-500"></i> Níveis de Estoque</h3>
                                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div class="form-group">
                                        <label for="productCurrentStock" class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Atual</label>
                                        <input type="number" id="productCurrentStock" value="${n}" readonly class="w-full p-3 border border-gray-200 rounded-lg bg-gray-100 font-black text-center text-lg text-gray-700 cursor-not-allowed">
                                    </div>
                                    <div class="form-group">
                                        <label for="productMinStock" class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Mínimo (Alerta)</label>
                                        <input type="number" id="productMinStock" value="${d}" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 font-bold text-center text-lg">
                                    </div>
                                    <div class="form-group">
                                        <label for="productMaxStock" class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Máximo (Ideal)</label>
                                        <input type="number" id="productMaxStock" value="${l}" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-center text-lg">
                                    </div>
                                </div>
                            </div>

                            <div class="bg-indigo-50 p-5 rounded-xl border border-indigo-100 ${e?.id?"":"hidden"}">
                                <h3 class="text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2"><i class="bi bi-arrow-left-right"></i> Ajuste Rápido Manual</h3>
                                <p class="text-xs text-indigo-700 mb-4">Deseja lançar entrada de mercadorias no estoque desta loja? Utilize a tela principal de Movimentações.</p>
                                <button type="button" data-action="open-new-movement-modal" class="w-full py-2.5 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-sm transition-colors">
                                    <i class="bi bi-box-arrow-in-right"></i> Lançar Movimentação Agora
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div id="fornecedores-produto" class="tab-content hidden space-y-6">
                        <div class="max-w-2xl mx-auto">
                            <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-6">
                                <label class="block text-sm font-bold text-gray-800 mb-2"><i class="bi bi-search text-indigo-500 mr-1"></i> Pesquisar e Adicionar Fornecedor</label>
                                <div class="relative">
                                    <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    <input type="text" id="modalSupplierSearch" placeholder="Digite o nome da empresa ou contato..." class="w-full pl-10 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                                </div>
                                <div id="supplierSearchResults" class="mt-2 border border-gray-200 rounded-lg max-h-40 overflow-y-auto bg-white hidden shadow-md absolute w-full z-10 custom-scrollbar"></div>
                            </div>

                            <div>
                                <h4 class="text-sm font-bold text-gray-700 mb-3"><i class="bi bi-truck text-gray-500 mr-1"></i> Fornecedores Vinculados</h4>
                                <div id="selectedSuppliersList" class="space-y-2 max-h-64 overflow-y-auto border border-dashed border-gray-300 p-3 rounded-xl bg-gray-50 min-h-[100px] custom-scrollbar flex flex-col justify-center">
                                    <p class="text-xs text-gray-400 text-center">Nenhum fornecedor adicionado ainda.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer px-6 py-4 bg-gray-50 border-t flex justify-between items-center flex-shrink-0">
                    <button type="button" data-action="delete-product" data-id="${e?.id||""}" class="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-colors ${e?.id?"":"hidden"}" title="Excluir Produto">
                        <i class="bi bi-trash3 mr-1"></i> Excluir
                    </button>

                    <div class="flex gap-3 ml-auto">
                        <button type="button" data-action="close-modal" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 shadow-sm transition-colors">Cancelar</button>
                        <button type="submit" class="py-2.5 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm flex items-center gap-2 transition-colors">
                            <i class="bi bi-save"></i> Salvar
                        </button>
                    </div>
                </div>
            </form>
        </div>`;t.innerHTML=m,t.style.display="flex",t.querySelectorAll(".tab-link").forEach(C=>{C.addEventListener("click",()=>{t.querySelectorAll(".tab-link").forEach(M=>{M.classList.remove("active","border-indigo-600","text-indigo-600"),M.classList.add("border-transparent","text-gray-500")}),C.classList.add("active","border-indigo-600","text-indigo-600"),C.classList.remove("border-transparent","text-gray-500"),t.querySelectorAll(".tab-content").forEach(M=>M.classList.add("hidden")),document.getElementById(C.dataset.tab).classList.remove("hidden")})});const y=document.getElementById("productForm");y.onsubmit=$l;let w=new Set(e?.supplierIds||[]);const f=()=>{const C=document.getElementById("modalSupplierSearch"),M=document.getElementById("supplierSearchResults"),B=document.getElementById("selectedSuppliersList"),P=C?.value.toLowerCase()||"",F=j.suppliers||[];if(P.length>0){const V=F.filter(_=>_.name.toLowerCase().includes(P)&&!w.has(_.id));V.length>0?(M.classList.remove("hidden"),M.innerHTML=V.map(_=>`
                    <div class="p-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-0 flex justify-between items-center transition-colors" data-add-supplier="${_.id}">
                        <span class="font-bold text-sm text-gray-700">${h(_.name)}</span>
                        <span class="text-indigo-600 text-xs font-bold px-2 py-1 bg-indigo-100 rounded">+ Adicionar</span>
                    </div>
                `).join("")):(M.classList.remove("hidden"),M.innerHTML='<div class="p-4 text-sm text-gray-500 text-center">Fornecedor não encontrado.</div>')}else M.classList.add("hidden");w.size>0?(B.classList.remove("justify-center"),B.classList.add("justify-start"),B.innerHTML="",w.forEach(V=>{const _=F.find(A=>A.id===V);_&&(B.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border border-gray-200 p-3 rounded-lg shadow-sm" data-id="${_.id}">
                            <div>
                                <p class="font-bold text-gray-800 text-sm">${h(_.name)}</p>
                                <p class="text-[10px] text-gray-500 mt-0.5"><i class="bi bi-person"></i> ${h(_.contactName||"N/I")} | <i class="bi bi-telephone"></i> ${h(_.phone||"N/I")}</p>
                            </div>
                            <button type="button" class="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors" data-remove-supplier="${_.id}" title="Remover">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                    `)})):(B.classList.add("justify-center"),B.classList.remove("justify-start"),B.innerHTML='<p class="text-xs text-gray-400 text-center">Nenhum fornecedor adicionado ainda.</p>')};document.getElementById("modalSupplierSearch")?.addEventListener("input",f),f();const S=document.getElementById("productPhotoInput"),T=document.getElementById("productPhotoButton"),L=document.getElementById("productPhotoContainer"),k=document.getElementById("productPhotoPreview"),x=document.getElementById("productPhotoBase64"),I=()=>S?.click();T&&T.addEventListener("click",I),L&&L.addEventListener("click",I),S&&(S.onchange=async()=>{const C=S.files[0];if(!C)return;const M=k.src;k.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const B=await is(C,800,800,.8);if(B.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");k.src=B,x.value=B}catch(B){b("Erro de Imagem",B.message,"error"),k.src=M,x.value=e?.photo||""}}),t.onclick=async C=>{const M=C.target.closest("[data-add-supplier]");if(M){w.add(M.dataset.addSupplier);const _=document.getElementById("modalSupplierSearch");_&&(_.value=""),f();return}const B=C.target.closest("[data-remove-supplier]");if(B){w.delete(B.dataset.removeSupplier),f();return}const P=C.target.closest("button[data-action]");if(!P)return;const F=P.dataset.action,V=P.dataset.id;if(F==="close-modal"&&(t.style.display="none"),F==="delete-product"){if(!V)return;if(await Y("Apagar Produto","Tem certeza que deseja excluir este produto do catálogo?"))try{const A=j.products.find(U=>U.id===V)?.name||"Desconhecido";await us(V),te(g.establishmentId,qe(),"Produtos","Excluiu",`Excluiu o produto: ${A}`),b("Sucesso","Produto apagado.","success"),t.style.display="none",await Ie()}catch(A){b("Erro",`Não foi possível apagar: ${A.message}`,"error")}}F==="open-new-movement-modal"&&(t.style.display="none",j.currentTab="movimentacoes",fs(),Ko())}}function Il(){Y("Excluir em Lote",`Tem certeza que deseja excluir ${j.selectedIds.size} produtos da rede?`).then(async e=>{if(e)try{const t=Array.from(j.selectedIds).map(a=>us(a));await Promise.all(t),te(g.establishmentId,qe(),"Produtos","Excluiu em Lote",`Excluiu ${j.selectedIds.size} produtos`),b("Sucesso",`${j.selectedIds.size} produtos foram excluídos.`,"success"),j.selectedIds.clear(),Oa(),Ie()}catch(t){b("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}async function za(){const e=document.getElementById("report-results");if(!e)return;e.innerHTML='<div class="flex items-center justify-center h-full"><div class="loader"></div></div>';const t={startDate:document.getElementById("reportStartDate")?.value||"",endDate:document.getElementById("reportEndDate")?.value||"",productId:document.getElementById("productFilterReport")?.value||"all",categoryId:document.getElementById("categoryFilterReport")?.value||"all"};try{const s=ms().map(n=>Bo({...t,establishmentId:n}).catch(d=>[])),o=await Promise.all(s);let r=[];if(o.forEach(n=>{if(!n)return;const d=Array.isArray(n)?n:Array.isArray(n.data)?n.data:Array.isArray(n.movements)?n.movements:[];r=r.concat(d)}),r.sort((n,d)=>wa(d.date)-wa(n.date)),r.length===0){e.innerHTML=`
                <div class="flex items-center justify-center h-full p-8 text-center">
                    <div>
                        <i class="bi bi-inboxes text-4xl text-gray-300 mb-2 block"></i>
                        <p class="text-gray-500 font-medium text-sm">Nenhuma movimentação encontrada neste período.</p>
                    </div>
                </div>`;return}const i=`
            <div class="overflow-y-auto custom-scrollbar h-full">
                <table class="min-w-full text-sm text-left">
                    <thead class="bg-gray-50 sticky top-0 shadow-sm z-10">
                        <tr>
                            <th class="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Data</th>
                            <th class="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Produto</th>
                            <th class="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 text-center">Movimento</th>
                            <th class="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 text-center">Estoque Novo</th>
                            <th class="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Motivo</th>
                            <th class="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Responsável</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        ${r.map(n=>{const d=n.change>0,l=d?"text-emerald-600 bg-emerald-50":"text-red-600 bg-red-50",c=d?'<i class="bi bi-arrow-down-left"></i>':'<i class="bi bi-arrow-up-right"></i>';return`
                            <tr class="hover:bg-gray-50 transition-colors">
                                <td class="px-4 py-3 whitespace-nowrap text-gray-500 text-xs">${wa(n.date).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"})}</td>
                                <td class="px-4 py-3 font-bold text-gray-800 text-xs">${h(n.productName)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center">
                                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md font-bold text-xs ${l}">
                                        ${c} ${d?"+":""}${n.change}
                                    </span>
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-800 font-bold font-mono text-xs">${n.newStock}</td>
                                <td class="px-4 py-3 text-gray-600 text-xs truncate max-w-[200px]" title="${h(n.reason)}">${h(n.reason)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-500 text-xs flex items-center gap-2">
                                    <i class="bi bi-person-circle text-gray-300"></i> ${h(n.user)}
                                </td>
                            </tr>`}).join("")}
                    </tbody>
                </table>
            </div>`;e.innerHTML=i}catch(a){b("Erro",`Não foi possível gerar: ${a.message}`,"error"),e.innerHTML='<div class="p-8 text-center text-red-500 font-bold">Falha ao buscar movimentações.</div>'}}const Jt=document.getElementById("content");let W={partners:[],establishments:[],searchQuery:"",categoryFilter:"all",stateFilter:"all",cityFilter:"",sortBy:"name_asc",hasSearched:!1,viewMode:"list",editingItem:null},qt=null;const Zt={contas_fixas:{label:"Contas Fixas (Água, Luz)",color:"blue",icon:"bi-lightning-charge"},estoque:{label:"Fornecedor de Produtos",color:"emerald",icon:"bi-box-seam"},servicos:{label:"Prestador de Serviço",color:"purple",icon:"bi-tools"},impostos:{label:"Governo / Impostos",color:"red",icon:"bi-bank"},outros:{label:"Outros Parceiros",color:"gray",icon:"bi-person-vcard"}},Zo=["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];async function Sl(){try{const t=(await xe()).matrizes||[];W.establishments=[],t.forEach(a=>{W.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>W.establishments.push({id:s.id,name:s.name,type:"Filial"}))})}catch(e){console.warn("Erro ao buscar lojas",e)}W.viewMode="list",W.editingItem=null,W.hasSearched=!1,W.partners=[],Ll(),Al(),er()}function Ll(){Jt.innerHTML=`
        <div class="flex flex-col h-full bg-gray-50 w-full relative min-h-0 overflow-hidden">
            
            <div id="suppliers-list-view" class="w-full h-full flex flex-col transition-all duration-300 ${W.viewMode==="list"?"flex":"hidden"} p-2 md:p-4 md:pl-6 relative">
                
                <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full animate-fade-in">
                    <div></div> <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                        <button data-action="new-partner" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                            <i class="bi bi-plus-lg"></i> Novo Parceiro
                        </button>
                    </div>
                </div>

                ${Cl()}

                <div class="flex-1 flex flex-col min-h-0 w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
                    <div id="partners-grid" class="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-2">
                    </div>
                </div>
            </div>

            <div id="suppliers-form-view" class="w-full h-full overflow-y-auto custom-scrollbar transition-all duration-300 ${W.viewMode==="form"?"block":"hidden"} p-2 md:p-4 md:pl-6">
                <div id="form-container-wrapper" class="max-w-4xl mx-auto w-full">
                </div>
            </div>

        </div>
    `}function Cl(){const e=Object.entries(Zt).map(([a,s])=>`<option value="${a}">${s.label}</option>`).join(""),t=Zo.map(a=>`<option value="${a}">${a}</option>`).join("");return`
        <div class="flex flex-col md:flex-row items-start md:items-center gap-2 mb-3 w-full animate-fade-in bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
            
            <div class="relative flex-shrink-0 w-full md:w-64">
                <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                <input type="text" id="filterSearch" placeholder="Nome, CNPJ, Email..." value="${W.searchQuery}" class="w-full pl-8 p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
            </div>
            
            <div class="flex gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                <select id="filterCategory" class="w-full md:w-auto p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-gray-700 flex-shrink-0">
                    <option value="all">Categorias</option>
                    ${e}
                </select>
                
                <select id="filterState" class="w-full md:w-auto p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-gray-700 flex-shrink-0">
                    <option value="all">Estados</option>
                    ${t}
                </select>

                <input type="text" id="filterCity" placeholder="Cidade" value="${W.cityFilter}" class="w-full md:w-32 p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all flex-shrink-0">
                
                <select id="filterSortBy" class="w-full md:w-auto p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-gray-700 flex-shrink-0">
                    <option value="name_asc">Nome (A-Z)</option>
                    <option value="name_desc">Nome (Z-A)</option>
                    <option value="contact_asc">Contato</option>
                </select>
            </div>

            <button id="btn-search-partners" class="w-full md:w-auto px-4 py-1.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 text-xs flex-shrink-0 ml-auto">
                <i class="bi bi-search text-[10px]"></i> Buscar
            </button>
        </div>
    `}function Dl(e=null){const t=!!e;let a=e?.category||"";a==="Produtos"&&(a="estoque"),a==="Serviços"&&(a="servicos");const s=Object.entries(Zt).map(([i,n])=>`<option value="${i}" ${a===i?"selected":""}>${n.label}</option>`).join(""),o=Zo.map(i=>`<option value="${i}" ${e?.state===i?"selected":""}>${i}</option>`).join(""),r=document.getElementById("form-container-wrapper");r&&(r.innerHTML=`
        <div class="animate-fade-in-up bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-3">
                <button data-action="back-to-list" class="w-8 h-8 bg-white border border-gray-200 rounded text-gray-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm flex items-center justify-center">
                    <i class="bi bi-arrow-left text-sm"></i>
                </button>
                <div>
                    <h2 class="text-sm font-bold text-gray-800 tracking-tight">${t?"Editar Parceiro":"Novo Parceiro"}</h2>
                </div>
            </div>

            <form id="partner-form" class="flex flex-col">
                <input type="hidden" id="supId" value="${e?.id||""}">

                <div class="p-4 space-y-4">
                    
                    <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-1.5"><i class="bi bi-building text-indigo-500"></i> Dados Empresariais</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div class="md:col-span-2">
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Razão Social / Nome *</label>
                                <input type="text" id="supName" required class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none font-semibold text-gray-800 text-xs transition-shadow" value="${h(e?.name||"")}" placeholder="Ex: CPFL Energia...">
                            </div>
                            
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Categoria / Tipo *</label>
                                <select id="supCategory" required class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs font-semibold text-gray-800 transition-shadow">
                                    <option value="">-- Selecione --</option>
                                    ${s}
                                </select>
                            </div>

                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">CNPJ / CPF</label>
                                <input type="text" id="supTaxId" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${h(e?.document||e?.taxId||"")}" placeholder="00.000.000/0001-00">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-1.5"><i class="bi bi-geo-alt text-indigo-500"></i> Localização</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Estado (UF)</label>
                                <select id="supState" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs font-semibold text-gray-800 transition-shadow">
                                    <option value="">-- Estado --</option>
                                    ${o}
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Cidade</label>
                                <input type="text" id="supCity" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${h(e?.city||"")}" placeholder="Ex: São Paulo">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-1.5"><i class="bi bi-person-lines-fill text-indigo-500"></i> Contatos</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div class="md:col-span-2">
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Nome do Contato</label>
                                <input type="text" id="supContact" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${h(e?.contactName||"")}" placeholder="Ex: João Silva (Comercial)">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">E-mail</label>
                                <input type="email" id="supEmail" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${h(e?.email||"")}" placeholder="contato@empresa.com">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Telefone / WhatsApp</label>
                                <input type="tel" id="supPhone" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${h(e?.phone||"")}" placeholder="(00) 0000-0000">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-1.5"><i class="bi bi-journal-text text-indigo-500"></i> Informações Adicionais</h3>
                        <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Observações (PIX, Dados Bancários)</label>
                        <textarea id="supNotes" rows="2" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 font-medium resize-none transition-shadow">${e?.notes||""}</textarea>
                    </div>
                </div>

                <div class="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    ${t?`
                        <button type="button" data-action="delete-partner" data-id="${e.id}" class="w-full sm:w-auto px-4 py-2 text-red-600 bg-white border border-red-200 rounded-lg font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm text-xs">
                            <i class="bi bi-trash3 text-[10px]"></i> Excluir
                        </button>
                    `:"<div></div>"}
                    
                    <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <button type="button" data-action="back-to-list" class="px-5 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-sm w-full sm:w-auto text-xs">
                            Cancelar
                        </button>
                        <button type="submit" class="px-5 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5 w-full sm:w-auto text-xs">
                            <i class="bi bi-save2 text-[10px]"></i> ${t?"Salvar Alterações":"Cadastrar"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `,document.getElementById("partner-form").addEventListener("submit",Pl))}function er(){const e=document.getElementById("partners-grid");e&&(e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-xl w-full max-w-2xl mx-auto shadow-sm mt-4">
                <div class="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3 border border-indigo-100 shadow-inner">
                    <i class="bi bi-search text-xl text-indigo-400"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-800 mb-1">Pronto para pesquisar</h3>
                <p class="text-[10px] text-gray-500 font-medium max-w-sm text-center">Utilize os filtros acima e clique em "Buscar" para listar os parceiros registados no sistema.</p>
            </div>
        `)}async function Tl(){const e=document.getElementById("partners-grid");if(!W.hasSearched){er();return}e.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="text-xs text-gray-500 mt-4 font-medium">Buscando parceiros...</p></div>';try{const t=await Lt(g.establishmentId);W.partners=t||[],tr()}catch(t){e.innerHTML=`<div class="text-center py-10 text-red-500 text-sm font-bold">Erro ao carregar parceiros: ${t.message}</div>`}}function tr(){const e=document.getElementById("partners-grid");if(!e)return;let t=W.partners;if(W.searchQuery){const o=W.searchQuery.toLowerCase();t=t.filter(r=>r.name.toLowerCase().includes(o)||r.document&&r.document.includes(o)||r.taxId&&r.taxId.includes(o)||r.email&&r.email.toLowerCase().includes(o)||r.contactName&&r.contactName.toLowerCase().includes(o))}if(W.categoryFilter!=="all"&&(t=t.filter(o=>o.category===W.categoryFilter)),W.stateFilter!=="all"&&(t=t.filter(o=>o.state===W.stateFilter)),W.cityFilter){const o=W.cityFilter.toLowerCase();t=t.filter(r=>r.city&&r.city.toLowerCase().includes(o))}if(t.sort((o,r)=>{let i="",n="";return W.sortBy==="name_asc"||W.sortBy==="name_desc"?(i=(o.name||"").toLowerCase(),n=(r.name||"").toLowerCase()):W.sortBy==="contact_asc"&&(i=(o.contactName||"").toLowerCase(),n=(r.contactName||"").toLowerCase()),W.sortBy==="name_desc"?n.localeCompare(i):i.localeCompare(n)}),t.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16 bg-white border border-dashed border-gray-300 rounded-xl max-w-2xl mx-auto shadow-sm mt-4">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3 border border-gray-100 shadow-inner">
                    <i class="bi bi-inbox text-xl text-gray-400"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-800 mb-1">Nenhum parceiro encontrado</h3>
                <p class="text-[10px] text-gray-500 font-medium">Os filtros aplicados não retornaram resultados.</p>
            </div>
        `;return}let a=`
        <div class="hidden md:block w-full bg-white">
            <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                    <tr>
                        <th class="px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest w-14 text-center">Tipo</th>
                        <th class="px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest">Razão Social / Parceiro</th>
                        <th class="px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest">Documento</th>
                        <th class="px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest">Contacto / Localização</th>
                        <th class="px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest text-center">Ações</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
    `,s='<div class="flex flex-col gap-2 md:hidden p-2">';t.forEach(o=>{let r=o.category;r==="Produtos"&&(r="estoque"),r==="Serviços"&&(r="servicos");const i=Zt[r]||Zt.outros,n=o.document||o.taxId?o.document||o.taxId:"-",d=JSON.stringify(o).replace(/'/g,"&apos;"),l=[o.city,o.state].filter(Boolean).join(" - ");a+=`
            <tr class="hover:bg-gray-50 cursor-pointer transition-colors group" data-action="open-form" data-item='${d}'>
                <td class="px-3 py-2 text-center">
                    <div class="w-8 h-8 mx-auto rounded-lg bg-${i.color}-100 text-${i.color}-600 flex items-center justify-center text-sm shadow-sm" title="${i.label}">
                        <i class="bi ${i.icon}"></i>
                    </div>
                </td>
                <td class="px-3 py-2">
                    <p class="font-bold text-gray-800 text-xs group-hover:text-indigo-700 transition-colors">${h(o.name)}</p>
                    ${o.email?`<p class="text-[9px] text-gray-500 mt-0.5 truncate max-w-[200px]"><i class="bi bi-envelope mr-1 opacity-50"></i>${h(o.email)}</p>`:""}
                </td>
                <td class="px-3 py-2 text-xs font-medium text-gray-600">${h(n)}</td>
                <td class="px-3 py-2">
                    <div class="text-xs font-medium text-gray-800">${h(o.contactName||"-")}</div>
                    ${l?`<div class="text-[9px] font-bold uppercase tracking-wider text-gray-400 mt-0.5"><i class="bi bi-geo-alt mr-1"></i>${h(l)}</div>`:""}
                </td>
                <td class="px-3 py-2 text-center">
                    <button class="w-6 h-6 mx-auto rounded flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-100 transition-colors shadow-sm bg-white border border-gray-200 group-hover:border-indigo-200">
                        <i class="bi bi-pencil-fill text-[10px]"></i>
                    </button>
                </td>
            </tr>
        `,s+=`
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex flex-col gap-2 active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden" data-action="open-form" data-item='${d}'>
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-${i.color}-500"></div>
                <div class="flex gap-3">
                    <div class="w-10 h-10 rounded-lg bg-${i.color}-100 text-${i.color}-600 flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                        <i class="bi ${i.icon}"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">${i.label.split(" ")[0]}</p>
                        <h3 class="font-bold text-gray-900 text-xs leading-tight truncate">${h(o.name)}</h3>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-lg p-2 border border-gray-100 mt-1 flex flex-col gap-1">
                    <div class="flex justify-between items-center text-[10px]">
                        <span class="text-gray-500 font-medium">Documento:</span>
                        <span class="font-bold text-gray-700">${h(n)}</span>
                    </div>
                    ${l?`
                    <div class="flex justify-between items-center text-[10px]">
                        <span class="text-gray-500 font-medium">Local:</span>
                        <span class="font-bold text-gray-700">${h(l)}</span>
                    </div>`:""}
                </div>
            </div>
        `}),a+="</tbody></table></div>",s+="</div>",e.innerHTML=a+s}function ht(e,t=null){const a=document.getElementById("suppliers-list-view"),s=document.getElementById("suppliers-form-view");W.viewMode=e,W.editingItem=t,e==="list"?(a.classList.remove("hidden"),a.classList.add("flex"),s.classList.add("hidden"),s.innerHTML='<div id="form-container-wrapper" class="max-w-4xl mx-auto w-full"></div>',W.hasSearched&&tr(),window.scrollTo({top:0,behavior:"smooth"})):(a.classList.add("hidden"),a.classList.remove("flex"),s.classList.remove("hidden"),Dl(t),window.scrollTo({top:0,behavior:"smooth"}))}async function Pl(e){e.preventDefault();const t=e.target,a=t.querySelector("#supId").value,s={name:t.querySelector("#supName").value,contactName:t.querySelector("#supContact").value,email:t.querySelector("#supEmail").value,phone:t.querySelector("#supPhone").value,document:t.querySelector("#supTaxId").value,category:t.querySelector("#supCategory").value,state:t.querySelector("#supState").value,city:t.querySelector("#supCity").value,establishmentId:g.establishmentId,notes:t.querySelector("#supNotes")?.value||"",accessibleIn:[g.establishmentId]},o=t.querySelector('button[type="submit"]'),r=o.innerHTML;o.disabled=!0,o.innerHTML='<div class="loader-small border-white"></div> A gravar...';try{a?(await pl(a,s),b("Sucesso","Ficha atualizada!","success")):(await ul(s),b("Sucesso","Parceiro registado!","success")),W.hasSearched&&(W.partners=await Lt(g.establishmentId)||[]),ht("list")}catch(i){b("Erro","Falha ao gravar: "+i.message,"error"),o.disabled=!1,o.innerHTML=r}}async function Bl(e){if(await Y("Excluir Parceiro","Deseja realmente apagar esta ficha permanentemente?"))try{await gl(e),b("Sucesso","Entidade excluída.","success"),W.partners=W.partners.filter(a=>a.id!==e),ht("list")}catch(a){b("Erro","Erro ao excluir: "+a.message,"error")}}function Al(){qt&&Jt.removeEventListener("click",qt),qt=async e=>{const t=e.target;if(t.closest('button[data-action="new-partner"]')){ht("form",null);return}if(t.closest("#btn-search-partners")){W.searchQuery=document.getElementById("filterSearch").value,W.categoryFilter=document.getElementById("filterCategory").value,W.stateFilter=document.getElementById("filterState").value,W.cityFilter=document.getElementById("filterCity").value,W.sortBy=document.getElementById("filterSortBy").value,W.hasSearched=!0,Tl();return}if(t.closest('button[data-action="back-to-list"]')){ht("list");return}const a=t.closest('button[data-action="delete-partner"]');if(a){e.preventDefault(),Bl(a.dataset.id);return}const s=t.closest('[data-action="open-form"]');if(s&&!t.closest("button")){const o=JSON.parse(s.dataset.item.replace(/&apos;/g,"'"));ht("form",o)}},Jt.addEventListener("click",qt),Jt.addEventListener("keypress",e=>{e.key==="Enter"&&(e.target.id==="filterSearch"||e.target.id==="filterCity")&&document.getElementById("btn-search-partners").click()})}const Va=document.getElementById("content"),Rs={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let z={professionals:[],services:[],hierarchyCache:[],statusFilter:"all",searchQuery:"",filterServiceId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set},jt=null,Ue=null;function Gt(){const e=be.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}function ar(){const e=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return e.length>0?Array.from(e).map(t=>t.value):[g.establishmentId]}async function Ml(){z.selectedIds.clear();try{const e=await xe();z.hierarchyCache=e.matrizes||[]}catch(e){console.warn("Erro ao buscar lojas",e)}ql(),jl(),await et()}function ql(){Va.innerHTML=`
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
                <div class="flex bg-gray-200/80 p-1 rounded-xl border border-gray-300 w-full md:w-auto shadow-inner hidden md:flex opacity-0 pointer-events-none">
                    <button class="flex-1 md:w-32 py-1.5 text-xs font-bold rounded-lg transition-all flex justify-center items-center gap-2">Space</button>
                </div>

                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end ml-auto">
                    <button data-action="open-professional-modal" data-professional="{}" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-person-plus-fill text-sm"></i> Novo Profissional
                    </button>
                </div>
            </div>

            <div id="summary-section" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 w-full">
                <div class="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto custom-scrollbar">
                    <button data-status="all" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${z.statusFilter==="all"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Todos</button>
                    <button data-status="active" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${z.statusFilter==="active"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Ativos</button>
                    <button data-status="inactive" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${z.statusFilter==="inactive"?"bg-red-50 text-red-700 border-red-200":"bg-white text-gray-600 hover:bg-gray-50"}">Inativos</button>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                    <div class="relative flex-shrink-0 w-full md:w-64">
                        <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input type="text" id="searchInput" value="${z.searchQuery}" placeholder="Nome ou especialidade..." class="w-full pl-8 p-1.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                    <button id="toggle-filter-btn" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5 text-xs flex-shrink-0 ${z.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                        <i class="bi bi-funnel"></i> Filtros
                    </button>
                </div>
            </div>

            <div id="filter-panel" class="${z.isAdvancedFilterOpen?"block":"hidden"} mb-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
                <div class="flex flex-col md:flex-row items-end gap-3">
                    <div class="w-full md:w-64">
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Serviço Habilitado</label>
                        <select id="filterServiceId" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white outline-none focus:ring-1 focus:ring-indigo-500">
                            <option value="all">Todos os serviços</option>
                        </select>
                    </div>

                    <div class="flex gap-2 w-full md:w-auto">
                        <button id="clear-filters-btn" class="w-full md:w-auto px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-xs">Limpar</button>
                        <button id="apply-filter-btn" class="w-full md:w-auto px-5 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition-all text-xs">
                            Aplicar
                        </button>
                    </div>
                </div>
            </div>

            <div id="professionalsList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                ${sr(8)}
            </div>

            <button data-action="open-professional-modal" data-professional="{}" class="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40">
                <i class="bi bi-plus-lg text-xl"></i>
            </button>
        </section>
    `}function jl(){const e=document.getElementById("multi-context-apply");e&&(e.removeEventListener("click",et),e.addEventListener("click",()=>{setTimeout(et,100)})),document.querySelectorAll(".status-filter-btn").forEach(r=>{r.addEventListener("click",i=>{const n=i.target.dataset.status;z.statusFilter=n,document.querySelectorAll(".status-filter-btn").forEach(d=>{d.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200","bg-red-50","text-red-700","border-red-200"),d.classList.add("bg-white","text-gray-600","border-gray-200")}),n==="inactive"?i.target.classList.add("bg-red-50","text-red-700","border-red-200"):i.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),i.target.classList.remove("bg-white","text-gray-600","border-gray-200"),ft()})});const t=document.getElementById("toggle-filter-btn");t&&t.addEventListener("click",()=>{const r=document.getElementById("filter-panel");z.isAdvancedFilterOpen=!z.isAdvancedFilterOpen,z.isAdvancedFilterOpen?(r.classList.remove("hidden"),t.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),t.classList.remove("bg-white","text-gray-600","border-gray-200")):(r.classList.add("hidden"),t.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),t.classList.add("bg-white","text-gray-600","border-gray-200"))});const a=document.getElementById("searchInput");a&&a.addEventListener("input",r=>{z.searchQuery=r.target.value.toLowerCase(),ft()});const s=document.getElementById("clear-filters-btn");s&&s.addEventListener("click",()=>{z.filterServiceId="all",document.getElementById("filterServiceId").value="all",ft()});const o=document.getElementById("apply-filter-btn");o&&o.addEventListener("click",()=>{z.filterServiceId=document.getElementById("filterServiceId").value,document.getElementById("toggle-filter-btn").click(),ft()}),jt&&Va.removeEventListener("click",jt),jt=r=>{const i=r.target.closest('[data-action="open-professional-modal"]');if(i){r.preventDefault();let c={};if(i.dataset.professional)try{c=JSON.parse(i.dataset.professional)}catch{}Hl(c);return}const n=r.target.closest(".professional-checkbox");if(n){const c=n.dataset.id;n.checked?z.selectedIds.add(c):z.selectedIds.delete(c),_a(),r.stopPropagation();return}if(r.target.closest("#cancel-selection-btn")){z.selectedIds.clear(),document.querySelectorAll(".professional-checkbox").forEach(c=>c.checked=!1),_a();return}if(r.target.closest("#batch-delete-btn")){Jl();return}},Va.addEventListener("click",jt)}async function et(){const e=document.getElementById("professionalsList"),t=ar();try{const a=t.map(d=>ke(d)),s=t.map(d=>nt(d)),o=await Promise.all(a),r=await Promise.all(s),i=new Map;o.flat().forEach(d=>i.set(d.id,d)),z.professionals=Array.from(i.values()),g.professionals=z.professionals;const n=new Map;r.flat().forEach(d=>n.set(d.id,d)),z.services=Array.from(n.values()),Nl(),ft()}catch(a){console.error(a),e.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>'}}function Nl(){const e=document.getElementById("filterServiceId");e&&z.services&&(e.innerHTML='<option value="all">Todos os serviços</option>',z.services.forEach(t=>{const a=document.createElement("option");a.value=t.id,a.textContent=h(t.name),z.filterServiceId===t.id&&(a.selected=!0),e.appendChild(a)}))}function _a(){const e=document.getElementById("batch-action-bar"),t=document.getElementById("selected-count"),a=z.selectedIds.size;!e||!t||(a>0?(t.textContent=a,e.classList.remove("hidden"),e.classList.add("flex")):(e.classList.add("hidden"),e.classList.remove("flex")))}function Rl(e){const t=document.getElementById("summary-section");if(!t)return;const a=e.length,s=e.filter(r=>r.status!=="inactive").length,o=a-s;t.innerHTML=`
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Membros na Unidade</span>
            <span class="text-xl font-black text-gray-800 mt-0.5">${a}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ativos</span>
            <span class="text-xl font-bold text-emerald-600 mt-0.5">${s}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inativos</span>
            <span class="text-xl font-bold text-red-500 mt-0.5">${o}</span>
        </div>
        <div class="bg-indigo-50 p-3 rounded-xl border border-indigo-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Filtrados / Exibidos</span>
            <span class="text-xl font-bold text-indigo-700 mt-0.5">${e.length}</span>
        </div>
    `}function ft(){const e=document.getElementById("professionalsList");if(!e)return;if(!z.professionals||z.professionals.length===0){e.innerHTML=sr(8);return}const t=ar(),a=z.professionals.filter(s=>{const o=s.name.toLowerCase().includes(z.searchQuery)||s.specialty&&s.specialty.toLowerCase().includes(z.searchQuery);let r=!0;z.statusFilter==="active"&&(r=s.status!=="inactive"),z.statusFilter==="inactive"&&(r=s.status==="inactive");const i=z.filterServiceId==="all"||s.services&&s.services.includes(z.filterServiceId),n=s.accessibleIn&&s.accessibleIn.length>0?s.accessibleIn:[s.establishmentId||g.establishmentId],d=t.some(l=>n.includes(l));return o&&r&&i&&d});Rl(a),e.innerHTML=Fl(a)}function sr(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center p-3 animate-pulse h-[74px]">
            <div class="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-3"></div>
            <div class="flex-1 space-y-2">
                <div class="h-2.5 bg-gray-200 rounded w-3/4"></div>
                <div class="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function Fl(e){return e.length===0?`
            <div class="col-span-full flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-people text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum profissional encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente ajustar os filtros ou verificar as unidades no topo.</p>
            </div>
        `:e.map(t=>{const a=t.status==="inactive",s=h(t.name),o=h(t.specialty||"Especialidade"),r=t.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,i=JSON.stringify(t).replace(/'/g,"&apos;"),n=t.accessibleIn?t.accessibleIn.length:1,d=t.services?t.services.length:0,l=z.selectedIds.has(t.id);return`
            <div class="professional-card relative bg-white rounded-xl border ${l?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-gray-200"} shadow-sm flex items-center p-3 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 ${a?"opacity-60 bg-gray-50":""}" 
                 data-action="open-professional-modal" data-professional='${i}'>
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" onclick="event.stopPropagation()">
                    <input type="checkbox" data-id="${t.id}" class="professional-checkbox w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${l?"checked":""}>
                </div>

                <div class="relative flex-shrink-0 mr-3">
                    <img src="${r}" alt="${s}" class="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm">
                    <span class="absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${a?"bg-red-500":"bg-emerald-500"}" title="${a?"Inativo":"Ativo"}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-4">
                    <h3 class="text-xs font-bold text-gray-800 truncate leading-tight">
                        ${s}
                    </h3>
                    <p class="text-[10px] text-gray-500 truncate mt-0.5">${o}</p>
                    
                    <div class="flex items-center gap-1 mt-1.5">
                        ${n>1?`<span class="text-[8px] font-bold bg-indigo-50 text-indigo-700 px-1 py-0.5 rounded border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${n}</span>`:'<span class="text-[8px] font-bold bg-gray-100 text-gray-600 px-1 py-0.5 rounded border border-gray-200 flex items-center gap-1"><i class="bi bi-geo-alt"></i> Única</span>'}
                        <span class="text-[8px] font-semibold text-gray-600 bg-gray-100 px-1 py-0.5 rounded border border-gray-200 flex items-center gap-1" title="${d} serviços habilitados"><i class="bi bi-scissors"></i> ${d}</span>
                    </div>
                </div>
            </div>`}).join("")}function ka(){const e=document.getElementById("genericModal");e.style.display="none",Ue&&e.removeEventListener("click",Ue)}async function Hl(e){const t=document.getElementById("genericModal"),a=e.id?e:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},o=`
        <div class="modal-content max-w-5xl p-0 overflow-hidden flex flex-col max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b bg-white flex-shrink-0">
                <h2 class="text-2xl font-bold text-gray-800">${h(a.name)}</h2>
                <button data-action="close-modal" class="text-gray-400 hover:text-red-500 transition-colors text-3xl leading-none">&times;</button>
            </div>
            
            <div class="modal-tabs px-6 border-b flex items-center overflow-x-auto bg-gray-50 flex-shrink-0 custom-scrollbar">
                <button class="tab-link active whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors" data-tab="dados-basicos">1. Dados Básicos</button>
                <button class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-indigo-500 transition-colors" data-tab="atuacao">2. Atuação (Rede & Serviços)</button>
                <button class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-indigo-500 transition-colors" data-tab="jornada">3. Jornada Semanal</button>
                <button class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-indigo-500 transition-colors" data-tab="bloqueios">4. Bloqueios e Férias</button>
            </div>
            
            <div class="modal-body p-6 bg-white flex-1 overflow-y-auto custom-scrollbar relative"> 
                <form id="professionalForm" class="h-full">
                    <input type="hidden" id="professionalId" value="${a.id||""}">
                    <input type="hidden" id="profPhotoBase64" value="${a.photo||""}">
                    
                    <div id="dados-basicos" class="tab-content active space-y-6"></div>
                    <div id="atuacao" class="tab-content hidden space-y-6"></div>
                </form>
                
                <div id="jornada" class="tab-content hidden"></div>
                <div id="bloqueios" class="tab-content hidden"></div>
            </div>
            
            <div class="modal-footer px-6 py-4 bg-gray-50 border-t flex justify-between items-center flex-shrink-0">
                <button type="button" data-action="delete-professional" data-id="${a.id||""}" class="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-colors ${a.id?"":"hidden"}" title="Excluir Profissional">
                    <i class="bi bi-trash3 mr-1"></i> Excluir
                </button>

                <div class="flex gap-3 ml-auto">
                    <button data-action="close-modal" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 shadow-sm transition-colors">Cancelar</button>
                    <button type="button" data-action="save-professional" class="py-2.5 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm flex items-center gap-2 transition-colors">
                        <i class="bi bi-save"></i> Salvar
                    </button>
                </div>
            </div>
        </div>`;t.innerHTML=o,t.style.display="flex",zl(a,z.services),Vl(a),_l(a,z.professionals),Wl(a)}function Ol(e=[]){if(!z.hierarchyCache||z.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${g.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                <i class="bi bi-info-circle mr-1"></i> Exclusivo desta unidade.
            </div>`;let t='<div class="space-y-1 mt-2 max-h-48 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30 custom-scrollbar">';return z.hierarchyCache.forEach(a=>{const s=e.includes(a.id)||e.length===0&&a.id===g.establishmentId;t+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${h(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(o=>{const r=e.includes(o.id)||e.length===0&&o.id===g.establishmentId;t+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${o.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${r?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${h(o.name)}</span>
                    </label>
                `})}),t+="</div>",t}function zl(e,t){const a=document.getElementById("dados-basicos"),s=document.getElementById("atuacao"),o=e.dob?e.dob.split("/"):["",""],r=Array.from({length:12},(L,k)=>{const x=k+1,I=x==o[1]?"selected":"",C=new Date(0,k).toLocaleString("pt-BR",{month:"long"});return`<option value="${x}" ${I}>${C.charAt(0).toUpperCase()+C.slice(1)}</option>`}).join(""),i=h(e.name||""),n=h(e.specialty||""),d=h(e.phone||""),l=h(e.notes||"");a.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="md:col-span-1 space-y-4">
                <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                    <label class="block text-sm font-bold text-gray-700 mb-3">Foto de Perfil</label>
                    <div class="relative group mx-auto w-32 h-32 mb-4 cursor-pointer" id="profPhotoContainer">
                        <img id="profPhotoPreview" src="${e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`}" alt="Foto de Perfil" class="w-32 h-32 rounded-full object-cover border-4 border-gray-50 shadow-md transition-all group-hover:brightness-75">
                        <div id="profPhotoButtonOverlay" class="absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                            <i class="bi bi-camera-fill text-white text-3xl drop-shadow-md"></i>
                        </div>
                    </div>
                    <input type="file" id="profPhotoInput" class="hidden" accept="image/*">
                    <button type="button" id="profPhotoButton" class="text-indigo-600 text-sm font-semibold hover:text-indigo-800 transition-colors w-full">Alterar Imagem</button>
                </div>

                 <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                    <div>
                        <p class="text-sm font-bold text-gray-700">Status do Perfil</p>
                        <p class="text-xs text-gray-500">Inativos não aparecem na agenda.</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="profStatusToggle" class="sr-only peer" ${e.status!=="inactive"?"checked":""}>
                        <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                </div>
            </div>

            <div class="md:col-span-2 space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="form-group sm:col-span-2">
                        <label for="profName" class="block text-sm font-medium text-gray-700 mb-1">Nome Completo <span class="text-red-500">*</span></label>
                        <input type="text" id="profName" value="${i}" required class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profSpecialty" class="block text-sm font-medium text-gray-700 mb-1">Especialidade / Cargo <span class="text-red-500">*</span></label>
                        <input type="text" id="profSpecialty" value="${n}" required placeholder="Ex: Cabeleireiro, Médico" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profPhone" class="block text-sm font-medium text-gray-700 mb-1">WhatsApp / Telefone</label>
                        <input type="tel" id="profPhone" value="${d}" placeholder="(00) 00000-0000" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profDobDay" class="block text-sm font-medium text-gray-700 mb-1">Aniversário (Dia)</label>
                        <input type="number" id="profDobDay" value="${o[0]}" min="1" max="31" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profDobMonth" class="block text-sm font-medium text-gray-700 mb-1">Aniversário (Mês)</label>
                        <select id="profDobMonth" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                            <option value="">Selecione...</option>${r}
                        </select>
                    </div>
                </div>

                <div class="form-group pt-2">
                    <label for="profNotes" class="block text-sm font-medium text-gray-700 mb-1">Observações Internas (Apenas Gestão)</label>
                    <textarea id="profNotes" rows="3" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors placeholder-gray-400" placeholder="Ex: Informações contratuais, detalhes de preferência...">${l}</textarea>
                </div>
            </div>
        </div>
    `,s.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div class="flex items-center justify-between border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-4">
                <div>
                    <p class="text-sm font-bold text-gray-800">Paga Comissão?</p>
                    <p class="text-[11px] text-gray-500 leading-tight mt-1">Gera comissão ao realizar serviços.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer ml-3">
                    <input type="checkbox" id="profCommissionToggle" class="sr-only peer" ${e.receivesCommission!==!1?"checked":""}>
                    <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
            </div>

            <div class="flex items-center justify-between border-b md:border-b-0 md:border-r border-gray-100 py-4 md:py-0 md:px-4">
                <div>
                    <p class="text-sm font-bold text-gray-800">Exibir no App</p>
                    <p class="text-[11px] text-gray-500 leading-tight mt-1">Clientes podem agendar online.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer ml-3">
                    <input type="checkbox" id="profShowOnAgendaToggle" class="sr-only peer" ${e.showOnAgenda!==!1?"checked":""}>
                    <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
            </div>

            <div class="pt-4 md:pt-0 md:pl-4">
                <label for="profOrderOnAgenda" class="block text-sm font-bold text-gray-800 mb-1">Ordem na Agenda</label>
                <div class="flex items-center gap-2">
                    <input type="number" id="profOrderOnAgenda" value="${e.orderOnAgenda||"1"}" min="1" class="w-20 p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-center bg-gray-50 focus:bg-white">
                    <span class="text-[11px] text-gray-500 leading-tight">Posição na visualização diária.</span>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <div class="flex items-center mb-3 text-indigo-900">
                    <div class="bg-indigo-100 p-2 rounded-lg mr-3"><i class="bi bi-diagram-3 text-lg"></i></div>
                    <div>
                        <h3 class="text-base font-bold">Lojas de Atendimento</h3>
                        <p class="text-xs text-gray-500">Unidades onde este membro atende.</p>
                    </div>
                </div>
                ${Ol(e.accessibleIn||[])}
            </div>

            <div>
                <div class="flex justify-between items-end mb-3">
                    <div class="flex items-center text-emerald-900">
                        <div class="bg-emerald-100 p-2 rounded-lg mr-3"><i class="bi bi-scissors text-lg"></i></div>
                        <div>
                            <h3 class="text-base font-bold">Serviços Habilitados</h3>
                            <p class="text-xs text-gray-500">O que este profissional faz.</p>
                        </div>
                    </div>
                    <button type="button" id="selectAllServicesBtn" class="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-md transition-colors">
                        Selecionar Todos
                    </button>
                </div>
                
                <div id="profServicesContainer" class="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 border border-gray-200 rounded-xl bg-gray-50 max-h-40 overflow-y-auto custom-scrollbar">
                    ${t.map(L=>`
                        <label class="flex items-center space-x-3 p-2.5 bg-white rounded-lg cursor-pointer transition-colors border border-gray-100 hover:border-indigo-300 hover:shadow-sm">
                            <input type="checkbox" value="${L.id}" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" ${e.services?.includes(L.id)?"checked":""}>
                            <span class="text-sm font-medium text-gray-700 truncate" title="${h(L.name)}">${h(L.name)}</span>
                        </label>
                    `).join("")}
                    ${t.length===0?'<p class="col-span-full text-center text-sm text-gray-500 py-4">Nenhum serviço cadastrado no sistema.</p>':""}
                </div>
            </div>
        </div>
    `;const c=document.getElementById("selectAllServicesBtn");if(c){c.addEventListener("click",()=>{const k=document.querySelectorAll('#profServicesContainer input[type="checkbox"]'),x=Array.from(k).every(I=>I.checked);k.forEach(I=>{I.checked=!x}),c.textContent=x?"Selecionar Todos":"Desmarcar Todos"});const L=document.querySelectorAll('#profServicesContainer input[type="checkbox"]');L.length>0&&Array.from(L).every(k=>k.checked)&&(c.textContent="Desmarcar Todos")}const u=document.getElementById("profPhotoInput"),p=document.getElementById("profPhotoButton"),m=document.getElementById("profPhotoContainer"),y=document.getElementById("profPhotoPreview"),w=document.getElementById("profPhotoBase64"),f=e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,S=e.photo||"",T=()=>u.click();p&&p.addEventListener("click",T),m&&m.addEventListener("click",T),u&&(u.onchange=async()=>{const L=u.files[0];if(L){y.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const k=await is(L,800,800,.8);if(k.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");y.src=k,w.value=k}catch(k){b("Erro de Imagem",k.message||"Não foi possível processar a imagem.","error"),y.src=f,w.value=S,u.value=""}}})}function Vl(e){const t=document.getElementById("jornada");t.innerHTML=`
        <div class="max-w-4xl mx-auto">
            <h3 class="text-xl font-bold text-gray-800 mb-2">Jornada de Trabalho Semanal</h3>
            <p class="text-sm text-gray-500 mb-6">Defina os dias e os horários em que este profissional atende.</p>
            <div id="profScheduleContainer" class="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
        </div>`,Ul(t.querySelector("#profScheduleContainer"),e.workingHours||{})}async function _l(e,t){const a=document.getElementById("bloqueios");a.innerHTML=`
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div>
                <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><i class="bi bi-calendar-x text-orange-500"></i> Lançar Bloqueio / Férias</h3>
                <form id="batchBlockageForm" class="p-5 bg-orange-50/50 border border-orange-100 rounded-xl space-y-4">
                    <div>
                        <h4 class="font-bold text-gray-700 mb-2 text-sm">Aplicar aos Profissionais:</h4>
                        <div id="batchProfSelectionContainer" class="max-h-40 overflow-y-auto custom-scrollbar p-3 border border-orange-200 rounded-lg bg-white space-y-2 shadow-sm">
                            ${t.map(r=>`
                                <label class="flex items-center space-x-3 hover:bg-orange-50 p-1 rounded cursor-pointer transition-colors">
                                    <input type="checkbox" name="batch-professionals" value="${r.id}" class="rounded border-gray-300 text-orange-500 focus:ring-orange-500" ${r.id===e.id?"checked":""}>
                                    <span class="text-sm font-medium text-gray-700">${h(r.name)}</span>
                                </label>`).join("")}
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label for="batchBlockageStartDate" class="block text-sm font-medium text-gray-700 mb-1">Data Início</label><input type="date" id="batchBlockageStartDate" required class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"></div>
                        <div><label for="batchBlockageEndDate" class="block text-sm font-medium text-gray-700 mb-1">Data Fim (Opcional)</label><input type="date" id="batchBlockageEndDate" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"></div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="block text-sm font-medium text-gray-700 mb-1">Início</label><input type="time" id="batchBlockageStartTime" required class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"></div>
                        <div><label class="block text-sm font-medium text-gray-700 mb-1">Fim</label><input type="time" id="batchBlockageEndTime" required class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"></div>
                    </div>
                    <div><label class="block text-sm font-medium text-gray-700 mb-1">Motivo / Descrição</label><input type="text" id="batchBlockageReason" placeholder="Ex: Férias, Médico, Casamento" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"></div>
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
                <div id="blockagesList" class="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2"></div>
            </div>
        </div>`;const s=document.getElementById("batchBlockageForm");s&&s.addEventListener("submit",async r=>{r.preventDefault();const i=s.querySelector('button[type="submit"]'),n=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm"></span> A gravar...';const d=Array.from(r.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(w=>w.value);if(d.length===0)return i.disabled=!1,i.innerHTML=n,b("Atenção","Selecione pelo menos um profissional.","error");const l=r.target.batchBlockageStartDate.value,c=r.target.batchBlockageEndDate.value||l,u=r.target.batchBlockageStartTime.value,p=r.target.batchBlockageEndTime.value,m=r.target.batchBlockageReason.value;if(!l||!u||!p)return i.disabled=!1,i.innerHTML=n,b("Atenção","Preencha Data de Início, Hora de Início e Fim.","error");const y=d.map(w=>{const f={professionalId:w,establishmentId:g.establishmentId,startTime:new Date(`${l}T${u}`).toISOString(),endTime:new Date(`${c}T${p}`).toISOString(),reason:m};return da(f)});try{await Promise.all(y),b("Sucesso!",`${d.length} bloqueios foram criados.`),s.reset(),r.target.querySelectorAll('input[name="batch-professionals"]').forEach(f=>{f.checked=f.value===e.id});const w=document.getElementById("prof-blockages-filter").value;yt(e.id,w)}catch(w){b("Erro",w.message,"error")}finally{i.disabled=!1,i.innerHTML=n}}),document.getElementById("prof-blockages-filter").addEventListener("change",r=>yt(e.id,r.target.value)),await yt(e.id,"future")}function Ul(e,t){e.innerHTML=Object.keys(Rs).map(a=>{const s=t[a]||{},o=s.active!==!1;return`
            <div class="day-schedule-card p-4 rounded-xl ${o?"bg-white border-gray-200 shadow-sm":"bg-gray-50 border-gray-100 disabled opacity-60"} border transition-all">
                 <div class="flex justify-between items-center mb-3">
                    <span class="font-bold text-gray-800">${Rs[a]}</span>
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
            </div>`}).join(""),e.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",s=>{const o=s.target.closest(".day-schedule-card"),r=!s.target.checked;o.classList.toggle("bg-white",!r),o.classList.toggle("shadow-sm",!r),o.classList.toggle("border-gray-200",!r),o.classList.toggle("bg-gray-50",r),o.classList.toggle("border-gray-100",r),o.classList.toggle("opacity-60",r),o.classList.toggle("disabled",r),o.querySelectorAll(".time-inputs input").forEach(i=>i.disabled=r)})})}async function yt(e,t="future"){const a=document.getElementById("blockagesList");if(a){a.innerHTML='<div class="loader mx-auto mt-6"></div>';try{const s=new Date;let o,r;t==="history"?(r=new Date,o=new Date,o.setFullYear(o.getFullYear()-2)):(o=new Date,r=new Date,r.setFullYear(r.getFullYear()+2));let n=(await la(g.establishmentId,o.toISOString(),r.toISOString(),e)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));t==="history"?n=n.filter(l=>l.endTime<s).sort((l,c)=>c.startTime-l.startTime):n=n.filter(l=>l.endTime>=s).sort((l,c)=>l.startTime-c.startTime);const d=n.reduce((l,c)=>{const u=c.reason||"Sem motivo detalhado";return l[u]||(l[u]=[]),l[u].push(c),l},{});if(Object.keys(d).length===0){a.innerHTML=`
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
        `).join("")}catch(s){a.innerHTML=`<p class="text-red-500 p-4">${s.message}</p>`}}}function Wl(e){const t=document.getElementById("genericModal");Ue&&t.removeEventListener("click",Ue),Ue=async a=>{const s=a.target.closest("button[data-action]");if(!s){const r=a.target.closest(".tab-link");r&&(t.querySelectorAll(".tab-link").forEach(i=>{i.classList.remove("active","border-indigo-600","text-indigo-600"),i.classList.add("border-transparent","text-gray-500")}),r.classList.add("active","border-indigo-600","text-indigo-600"),r.classList.remove("border-transparent","text-gray-500"),t.querySelectorAll(".tab-content").forEach(i=>i.classList.add("hidden")),document.getElementById(r.dataset.tab).classList.remove("hidden"));return}const o=s.dataset.action;switch(a.stopPropagation(),o){case"close-modal":ka();break;case"delete-professional":const r=s.dataset.id;if(await Y("Excluir Profissional",`Tem certeza que deseja excluir ${e.name}? Esta ação não pode ser desfeita.`))try{await ko(r),te(g.establishmentId,Gt(),"Equipe","Excluiu",`Excluiu profissional: ${e.name}`),b("Sucesso!","Profissional excluído da rede.","success"),ka(),et()}catch(x){b("Erro",`Não foi possível excluir: ${x.message}`,"error")}break;case"save-professional":const n=document.getElementById("professionalForm"),d=s,l=document.getElementById("profScheduleContainer"),c=Array.from(document.querySelectorAll('#profServicesContainer input[type="checkbox"]:checked')).map(x=>x.value),u={};l&&l.querySelectorAll(".day-schedule-card").forEach(x=>{const I=x.querySelector('[data-field="active"]').dataset.day;u[I]={active:x.querySelector('[data-field="active"]').checked,start:x.querySelector('[data-field="start"]').value,end:x.querySelector('[data-field="end"]').value,breakStart:x.querySelector('[data-field="breakStart"]').value,breakEnd:x.querySelector('[data-field="breakEnd"]').value}});const p=Array.from(n.querySelectorAll('input[name="accessibleIn"]:checked')).map(x=>x.value),m=p.length>0?p:[g.establishmentId],y=document.getElementById("profStatusToggle").checked,w=document.getElementById("profCommissionToggle").checked,f=document.getElementById("profShowOnAgendaToggle").checked,S={...e,id:document.getElementById("professionalId").value||void 0,accessibleIn:m,name:document.getElementById("profName").value.trim(),specialty:document.getElementById("profSpecialty").value,photo:document.getElementById("profPhotoBase64").value,services:c,workingHours:u,phone:document.getElementById("profPhone").value,dob:`${document.getElementById("profDobDay").value}/${document.getElementById("profDobMonth").value}`,receivesCommission:w,showOnAgenda:f,orderOnAgenda:parseInt(document.getElementById("profOrderOnAgenda").value)||1,notes:document.getElementById("profNotes").value,status:y?"active":"inactive",establishmentId:g.establishmentId},T=d.innerHTML;d.disabled=!0,d.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{S.id?(await Ni(S.id,S),te(g.establishmentId,Gt(),"Equipe","Editou",`Editou o profissional: ${S.name}`),b("Sucesso!","Dados atualizados.","success")):(delete S.id,await ji(S),te(g.establishmentId,Gt(),"Equipe","Criou",`Cadastrou o profissional: ${S.name}`),b("Sucesso!","Novo membro adicionado à equipe.","success")),ka(),et()}catch(x){b("Erro",x.message,"error"),d.disabled=!1,d.innerHTML=T}break;case"delete-blockage":const L=s.dataset.id;if(await Y("Apagar Bloqueio","O profissional voltará a ficar disponível na agenda neste dia. Confirma?"))try{await ns(L),b("Bloqueio removido.","success");const x=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";yt(e.id,x)}catch(x){b("Erro",x.message,"error")}break;case"batch-delete-blockage":const k=JSON.parse(s.dataset.ids);if(await Y("Apagar em Lote",`Tem certeza que deseja apagar ${k.length} dias de bloqueio de uma vez?`))try{await $o(k),b("Bloqueios removidos.","success");const x=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";yt(e.id,x)}catch(x){b("Erro",x.message,"error")}break}},t.addEventListener("click",Ue)}function Jl(){Y("Excluir em Lote",`Tem certeza que deseja excluir ${z.selectedIds.size} profissionais da rede? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{await Ri(Array.from(z.selectedIds)),te(g.establishmentId,Gt(),"Equipe","Excluiu em Lote",`Excluiu ${z.selectedIds.size} profissionais`),b("Sucesso!",`${z.selectedIds.size} profissionais foram excluídos.`,"success"),z.selectedIds.clear(),_a(),et()}catch(t){b("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}let E={clients:[],selectedClient:null,activeTab:"profile",establishments:[],filterEstablishmentIds:new Set,filters:{search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1,status:"all"},sortConfig:{key:"name",direction:"asc"},selectedIds:new Set,loading:!1,historyLimit:20,historySearchTerm:"",historyLoading:!1,historyData:{appointments:[],sales:[],loyaltyLog:[]},modalOpen:!1},ea=null,Nt=null;const or=e=>e?String(e).replace(/\D/g,""):"",Ua=e=>{if(!e)return"Nunca";let t;if(typeof e=="object"&&(e.seconds||e._seconds)){const a=e.seconds||e._seconds;t=new Date(a*1e3)}else t=new Date(e);return isNaN(t.getTime())?"Data Inválida":t.toLocaleDateString("pt-BR")},Wa=e=>{if(!e)return"CL";const t=e.trim().split(" ");return t.length>=2?(t[0][0]+t[t.length-1][0]).toUpperCase():e.substring(0,2).toUpperCase()};async function Gl(){ea=document.getElementById("content"),E.selectedClient=null,E.historyLimit=20,E.modalOpen=!1,E.selectedIds.clear(),E.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1,status:"all"},E.sortConfig={key:"name",direction:"asc"};try{const t=(await xe().catch(()=>({matrizes:[]}))).matrizes||[];E.establishments=[],t.forEach(a=>{E.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>E.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),E.filterEstablishmentIds.size===0&&E.filterEstablishmentIds.add(g.establishmentId)}catch(e){console.error("Erro ao buscar hierarquia",e)}Ql(),Yl(),await hs()}function Ql(){const e=E.establishments.map(t=>`
        <label class="inline-flex items-center gap-2 px-3 py-1.5 bg-white border ${E.filterEstablishmentIds.has(t.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-gray-200 text-gray-600"} rounded-lg cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" value="${t.id}" ${E.filterEstablishmentIds.has(t.id)?"checked":""}>
            <span class="text-xs font-bold whitespace-nowrap">${t.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${t.name}</span>
        </label>
    `).join("");ea.innerHTML=`
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative">
            
            <div id="batch-action-bar" class="hidden absolute top-4 left-4 right-4 z-30 bg-gray-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down">
                <div class="flex items-center gap-3">
                    <button id="cancel-selection-btn" class="p-1.5 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <span class="font-bold text-sm tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Selecionados</span>
                </div>
                <button id="batch-delete-btn" class="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-sm">
                    <i class="bi bi-trash3"></i> Excluir Clientes
                </button>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full animate-fade-in">
                <div></div> <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                    <button id="export-excel-btn" class="py-1.5 px-3 bg-white border border-gray-300 text-green-700 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-xs" title="Exportar para Excel">
                        <i class="bi bi-file-earmark-excel-fill text-green-600"></i> Excel
                    </button>
                    <button data-action="new-client" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-person-plus-fill"></i> Novo Cliente
                    </button>
                </div>
            </div>

            ${E.establishments.length>1?`
            <div class="mb-3 animate-fade-in">
                <div class="flex flex-wrap gap-2" id="establishment-filters-container">
                    ${e}
                </div>
            </div>
            `:""}

            <div id="kpi-section" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 animate-fade-in">
                <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden group cursor-pointer hover:border-indigo-300 transition-colors" data-filter="all">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Total de Clientes</span>
                    <span id="kpi-total" class="text-xl font-black text-gray-800 mt-0.5 z-10">0</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden group cursor-pointer hover:border-emerald-300 transition-colors" data-filter="novos">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Novos (Este Mês)</span>
                    <span id="kpi-novos" class="text-xl font-black text-emerald-600 mt-0.5 z-10">0</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden group cursor-pointer hover:border-red-300 transition-colors" data-filter="devendo">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Com Débitos (Fiado)</span>
                    <span id="kpi-devendo" class="text-xl font-black text-red-600 mt-0.5 z-10">0</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden group cursor-pointer hover:border-indigo-300 transition-colors" data-filter="aniversariantes">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Aniversariantes (Mês)</span>
                    <span id="kpi-niver" class="text-xl font-black text-indigo-600 mt-0.5 z-10">0</span>
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 w-full animate-fade-in">
                <div class="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto custom-scrollbar">
                    <label class="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer transition-all shadow-sm select-none flex-shrink-0 text-xs font-semibold">
                        <input type="checkbox" id="filter-loyalty" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5">
                        <i class="bi bi-star-fill text-amber-500"></i> Com Pontos
                    </label>
                    <div class="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm flex-shrink-0 gap-2">
                        <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Ausente ></span>
                        <input type="number" id="filter-inactive" placeholder="Dias" class="w-12 bg-gray-50 border border-gray-200 rounded text-xs outline-none font-bold text-indigo-600 text-center py-0.5">
                    </div>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto">
                    <div class="relative flex-shrink-0 w-full md:w-72">
                        <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input type="text" id="search-input" placeholder="Buscar por nome, telefone ou CPF..." class="w-full pl-8 p-1.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                </div>
            </div>

            <div class="flex-1 flex flex-col min-h-0 w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
                <div id="table-header-container"></div>
                <div id="list-container" class="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-2">
                    <div class="flex justify-center py-20"><div class="loader"></div></div>
                </div>
            </div>
        </section>
    `}function Xl(){const e=document.getElementById("table-header-container");if(!e)return;const t=a=>E.sortConfig.key!==a?'<i class="bi bi-arrow-down-up ml-1 opacity-40 text-xs"></i>':E.sortConfig.direction==="asc"?'<i class="bi bi-arrow-up ml-1 text-indigo-600"></i>':'<i class="bi bi-arrow-down ml-1 text-indigo-600"></i>';e.innerHTML=`
        <div class="hidden md:grid grid-cols-12 gap-2 px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest items-center bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <div class="col-span-4 pl-2 flex items-center gap-3">
                <input type="checkbox" id="select-all-toggle" class="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" ${E.selectedIds.size>0&&E.selectedIds.size===E.clients.length?"checked":""}>
                <div class="cursor-pointer flex items-center hover:text-indigo-700 transition-colors select-none" data-sort="name">
                    Cliente ${t("name")}
                </div>
            </div>
            <div class="col-span-3 cursor-pointer flex items-center hover:text-indigo-700 transition-colors select-none" data-sort="contact">
                Contato ${t("contact")}
            </div>
            <div class="col-span-2 text-center cursor-pointer flex items-center justify-center hover:text-indigo-700 transition-colors select-none" data-sort="lastVisit">
                Última Visita ${t("lastVisit")}
            </div>
            <div class="col-span-2 text-center cursor-pointer flex items-center justify-center hover:text-indigo-700 transition-colors select-none" data-sort="financial">
                Situação ${t("financial")}
            </div>
            <div class="col-span-1 text-center">Ações</div>
        </div>
    `}async function hs(){E.loading=!0;const e=document.getElementById("list-container");e&&(e.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-xs">Carregando clientes...</p></div>');try{const a=Array.from(E.filterEstablishmentIds).map(i=>{let n=`/api/clients/${i}?limit=1000`;return D(n).catch(()=>[])}),o=(await Promise.all(a)).flat(),r=new Map;o.forEach(i=>r.set(i.id,i)),E.clients=Array.from(r.values()),ys(),ye()}catch(t){console.error(t),b("Erro","Falha ao carregar clientes.","error"),e&&(e.innerHTML='<div class="text-center py-10 text-red-500 text-sm">Erro ao carregar dados.</div>')}finally{E.loading=!1}}function ys(){const e=new Date().getMonth()+1,t=new Date().getFullYear();let a=0,s=0,o=0;E.clients.forEach(r=>{if(r.totalDebt&&parseFloat(r.totalDebt)>0&&s++,r.dobMonth==e&&o++,r.createdAt){const i=new Date(r.createdAt);i.getMonth()+1===e&&i.getFullYear()===t&&a++}}),document.getElementById("kpi-total").textContent=E.clients.length,document.getElementById("kpi-novos").textContent=a,document.getElementById("kpi-devendo").textContent=s,document.getElementById("kpi-niver").textContent=o}function ye(){Xl();const e=document.getElementById("list-container");let t=E.clients;if(E.filters.search){const a=E.filters.search.toLowerCase();t=t.filter(s=>s.name.toLowerCase().includes(a)||s.phone&&s.phone.includes(a)||s.cpf&&s.cpf.includes(a))}if(E.filters.status==="devendo")t=t.filter(a=>a.totalDebt&&parseFloat(a.totalDebt)>0);else if(E.filters.status==="aniversariantes"){const a=new Date().getMonth()+1;t=t.filter(s=>s.dobMonth==a)}else if(E.filters.status==="novos"){const a=new Date().getMonth()+1,s=new Date().getFullYear();t=t.filter(o=>{if(!o.createdAt)return!1;const r=new Date(o.createdAt);return r.getMonth()+1===a&&r.getFullYear()===s})}if(E.filters.hasLoyalty&&(t=t.filter(a=>a.loyaltyPoints&&a.loyaltyPoints>0)),E.filters.inactiveDays){const a=parseInt(E.filters.inactiveDays),s=new Date;s.setDate(s.getDate()-a),t=t.filter(o=>{if(!o.lastVisit&&!o.createdAt)return!1;let r;if(o.lastVisit){const i=o.lastVisit.seconds||o.lastVisit._seconds;r=i?new Date(i*1e3):new Date(o.lastVisit)}else r=new Date(o.createdAt);return r<s})}if(t.sort((a,s)=>{let o,r;switch(E.sortConfig.key){case"name":return o=(a.name||"").toLowerCase(),r=(s.name||"").toLowerCase(),E.sortConfig.direction==="asc"?o.localeCompare(r):r.localeCompare(o);case"contact":return o=a.phone||"",r=s.phone||"",E.sortConfig.direction==="asc"?o.localeCompare(r):r.localeCompare(o);case"lastVisit":o=a.lastVisit?a.lastVisit.seconds?a.lastVisit.seconds:new Date(a.lastVisit).getTime()/1e3:a.createdAt?new Date(a.createdAt).getTime()/1e3:0,r=s.lastVisit?s.lastVisit.seconds?s.lastVisit.seconds:new Date(s.lastVisit).getTime()/1e3:s.createdAt?new Date(s.createdAt).getTime()/1e3:0;break;case"financial":o=parseFloat(a.totalDebt)||0,r=parseFloat(s.totalDebt)||0;break;default:o=a.name,r=s.name}return o<r?E.sortConfig.direction==="asc"?-1:1:o>r?E.sortConfig.direction==="asc"?1:-1:0}),t.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-people text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum cliente encontrado</h3>
                <p class="text-[10px] text-gray-400 max-w-xs text-center">Tente ajustar a busca ou os filtros ativos.</p>
            </div>`;return}e.innerHTML=t.map(a=>{const s=a.totalDebt&&parseFloat(a.totalDebt)>0,o=Ua(a.lastVisit),r=or(a.phone),i=new Date().getMonth()+1,n=a.dobMonth==i,d=E.selectedIds.has(a.id);let l="";return n&&(l+='<span class="bg-indigo-50 text-indigo-600 text-[8px] font-bold px-1.5 py-0.5 rounded border border-indigo-100 uppercase tracking-wider">🎂 Niver</span> '),a.loyaltyPoints>0&&(l+=`<span class="bg-amber-50 text-amber-600 text-[8px] font-bold px-1.5 py-0.5 rounded border border-amber-100 uppercase tracking-wider"><i class="bi bi-star-fill"></i> ${a.loyaltyPoints} pts</span> `),`
        <div class="border-b border-gray-100 hover:bg-gray-50 transition-colors relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-2.5 md:p-2 mb-2 md:mb-0 bg-white md:bg-transparent rounded-xl md:rounded-none shadow-sm md:shadow-none border md:border-b ${s?"border-l-4 border-l-red-400":"border-l-4 border-l-transparent hover:border-l-indigo-300"} ${d?"bg-indigo-50/40":""} cursor-pointer" data-action="open-modal" data-id="${a.id}">
            
            <div class="flex justify-between items-start md:hidden mb-2 relative">
                <div class="absolute -top-1 -right-1 z-20">
                    <input type="checkbox" value="${a.id}" class="item-checkbox w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${d?"checked":""}>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full ${s?"bg-red-100 text-red-600 border border-red-200":"bg-gray-100 text-gray-600 border border-gray-200"} flex items-center justify-center font-bold text-xs flex-shrink-0">
                        ${Wa(a.name)}
                    </div>
                    <div class="pr-6">
                        <p class="font-bold text-xs text-gray-800 truncate max-w-[180px]">${h(a.name)}</p>
                        <p class="text-[9px] text-gray-500 font-medium">${h(a.phone||"Sem contato")}</p>
                    </div>
                </div>
                ${r?`<button data-action="whatsapp" data-phone="${r}" class="w-7 h-7 mt-5 bg-[#25D366]/10 text-[#25D366] rounded flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors border border-[#25D366]/20"><i class="bi bi-whatsapp text-[10px]"></i></button>`:""}
            </div>

            <div class="hidden md:flex md:col-span-4 items-center gap-2 pl-1">
                <input type="checkbox" value="${a.id}" class="item-checkbox w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm z-20 flex-shrink-0" ${d?"checked":""}>
                <div class="w-8 h-8 rounded-full ${s?"bg-red-100 text-red-600 border border-red-200":"bg-gray-100 text-gray-600 border border-gray-200"} flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
                    ${Wa(a.name)}
                </div>
                <div class="min-w-0">
                    <p class="font-bold text-xs text-gray-800 truncate" title="${h(a.name)}">${h(a.name)}</p>
                    <div class="flex gap-1 mt-0.5">${l}</div>
                </div>
            </div>

            <div class="hidden md:block md:col-span-3">
                <p class="text-[10px] font-bold text-gray-700">${h(a.phone||"--")}</p>
                <p class="text-[9px] text-gray-400 truncate w-full" title="${h(a.email||"")}">${h(a.email||"--")}</p>
            </div>

            <div class="md:col-span-2 md:text-center flex justify-between md:block items-center mb-1 md:mb-0">
                <span class="md:hidden text-[9px] font-bold text-gray-400 uppercase tracking-widest">Última Visita:</span>
                <span class="text-[9px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 uppercase tracking-wider">
                    <i class="bi bi-calendar-check opacity-50 mr-1"></i> ${o}
                </span>
            </div>

            <div class="md:col-span-2 md:text-center flex justify-between md:block items-center mb-1 md:mb-0">
                <span class="md:hidden text-[9px] font-bold text-gray-400 uppercase tracking-widest">Situação:</span>
                ${s?`<span class="text-[9px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 uppercase tracking-wider">Débito: R$ ${parseFloat(a.totalDebt).toFixed(2)}</span>`:'<span class="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">Em dia</span>'}
            </div>

            <div class="hidden md:flex md:col-span-1 justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                ${r?`<button data-action="whatsapp" data-phone="${r}" class="w-6 h-6 rounded flex items-center justify-center text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white transition-colors border border-[#25D366]/20 shadow-sm z-20" title="WhatsApp"><i class="bi bi-whatsapp text-[10px]"></i></button>`:""}
                <button class="w-6 h-6 rounded flex items-center justify-center text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-100 shadow-sm" title="Editar / Ver Perfil"><i class="bi bi-pencil-fill text-[10px]"></i></button>
            </div>
            
            <div class="md:hidden flex gap-1 mt-2 border-t border-gray-50 pt-2">
                ${l}
            </div>
        </div>
        `}).join("")}function Yl(){Nt&&ea.removeEventListener("click",Nt),Nt=r=>{const i=r.target;if(i.classList.contains("item-checkbox")){const c=i.value;i.checked?E.selectedIds.add(c):E.selectedIds.delete(c),Qt(),r.stopPropagation();return}if(i.id==="select-all-toggle"){const c=i.checked,u=document.querySelectorAll(".item-checkbox");E.selectedIds.clear(),u.forEach(p=>{p.checked=c,c&&E.selectedIds.add(p.value)}),Qt(),r.stopPropagation();return}const n=i.closest("[data-sort]");if(n){const c=n.dataset.sort;E.sortConfig.key===c?E.sortConfig.direction=E.sortConfig.direction==="asc"?"desc":"asc":(E.sortConfig.key=c,E.sortConfig.direction="asc"),ye();return}const d=i.closest("[data-action]");if(d){const c=d.dataset.action,u=d.dataset.id;if(c==="new-client"){Ja(null);return}if(c==="open-modal"){Ja(u);return}if(c==="whatsapp"){r.stopPropagation();const p=d.dataset.phone;window.open(`https://wa.me/55${p}`,"_blank");return}if(c==="export-excel"){nd();return}}const l=i.closest("[data-filter]");l&&(document.querySelectorAll("[data-filter]").forEach(c=>c.classList.remove("ring-2","ring-offset-1","ring-indigo-400","border-indigo-300")),l.classList.add("ring-2","ring-offset-1","ring-indigo-400","border-indigo-300"),E.filters.status=l.dataset.filter,ye())},ea.addEventListener("click",Nt);const e=document.getElementById("cancel-selection-btn");e&&e.addEventListener("click",()=>{E.selectedIds.clear();const r=document.getElementById("select-all-toggle");r&&(r.checked=!1),document.querySelectorAll(".item-checkbox").forEach(i=>i.checked=!1),Qt()});const t=document.getElementById("batch-delete-btn");t&&t.addEventListener("click",Kl),document.querySelectorAll(".est-filter-checkbox").forEach(r=>{r.addEventListener("change",i=>{const n=i.target.closest("label");i.target.checked?(E.filterEstablishmentIds.add(i.target.value),n.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),n.classList.remove("border-gray-200","text-gray-600")):(E.filterEstablishmentIds.delete(i.target.value),n.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),n.classList.add("border-gray-200","text-gray-600")),hs()})});const a=document.getElementById("search-input");a&&a.addEventListener("input",r=>{E.filters.search=r.target.value,ye()});const s=document.getElementById("filter-inactive");s&&s.addEventListener("input",r=>{E.filters.inactiveDays=r.target.value,ye()});const o=document.getElementById("filter-loyalty");o&&o.addEventListener("change",r=>{E.filters.hasLoyalty=r.target.checked,ye()})}function Qt(){const e=document.getElementById("batch-action-bar"),t=document.getElementById("selected-count");if(!e||!t)return;const a=E.selectedIds.size;t.textContent=a,a>0?(e.classList.remove("hidden"),e.classList.add("flex")):(e.classList.add("hidden"),e.classList.remove("flex"))}async function Kl(){const e=E.selectedIds.size;if(!(e===0||!await Y("Excluir Clientes",`Deseja realmente excluir permanentemente ${e} cliente(s)? Esta ação não pode ser desfeita.`)))try{const a=Array.from(E.selectedIds).map(o=>vo(o));await Promise.all(a),b("Sucesso",`${e} cliente(s) excluído(s) com sucesso.`,"success"),E.selectedIds.clear(),Qt();const s=document.getElementById("select-all-toggle");s&&(s.checked=!1),await hs()}catch{b("Erro ao Excluir","Ocorreu um erro ao excluir alguns clientes.","error")}}function Ja(e=null){e?(E.selectedClient=E.clients.find(s=>s.id===e),E.selectedClient.isNew=!1):E.selectedClient={isNew:!0,id:"",name:"",phone:"",email:"",cpf:"",gender:"",dobDay:"",dobMonth:"",source:"",notes:"",loyaltyPoints:0,totalDebt:0},E.activeTab="profile",E.historyData={appointments:[],sales:[],loyaltyLog:[]};let t=document.getElementById("client-details-modal-overlay");t||(t=document.createElement("div"),t.id="client-details-modal-overlay",t.className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-gray-900/60 backdrop-blur-sm sm:p-4 animate-fade-in",t.innerHTML='<div class="bg-gray-50 w-full sm:w-[90vw] h-[90vh] sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-slide-up sm:animate-scale-in rounded-t-2xl" id="client-modal-content"></div>',t.onclick=s=>{s.target===t&&vt()},document.body.appendChild(t),document.body.classList.add("overflow-hidden"));const a=t.querySelector("#client-modal-content");a.innerHTML=tt(E.selectedClient),at(a,E.selectedClient)}function vt(){const e=document.getElementById("client-details-modal-overlay");e&&e.remove(),document.body.classList.remove("overflow-hidden"),E.modalOpen=!1,E.selectedClient=null,ye()}function tt(e){const t=e.isNew,a=`
        <div class="bg-white border-b border-gray-200 sticky top-0 z-10 w-full flex overflow-x-auto custom-scrollbar gap-2 px-4 sm:px-6 py-2.5">
            <button class="tab-btn ${E.activeTab==="profile"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"} border px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="profile">👤 Perfil e Dados</button>
            ${t?"":`
            <button class="tab-btn ${E.activeTab==="appointments"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"} border px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="appointments">📅 Agendamentos</button>
            <button class="tab-btn ${E.activeTab==="history"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"} border px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="history">💰 Finanças</button>
            <button class="tab-btn ${E.activeTab==="loyalty"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"} border px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="loyalty">⭐ Fidelidade</button>
            `}
        </div>
    `;let s="";return E.activeTab==="profile"?s=Zl(e):E.activeTab==="appointments"?s=ed():E.activeTab==="history"?s=td():E.activeTab==="loyalty"&&(s=ad(e)),`
        <div class="w-full bg-gray-50 min-h-full flex flex-col overflow-hidden">
            <div class="bg-indigo-600 px-4 py-4 sm:px-6 sm:py-5 text-white relative flex-shrink-0 w-full shadow-md z-20">
                <button id="btn-close-modal" class="absolute top-4 right-4 text-indigo-200 hover:text-white transition z-50">
                    <i class="bi bi-x-lg text-xl sm:text-2xl"></i>
                </button>

                <div class="flex items-center gap-4 sm:gap-5">
                    <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-indigo-600 flex items-center justify-center text-2xl font-black shadow-lg flex-shrink-0">
                        ${t?'<i class="bi bi-person-plus-fill"></i>':Wa(e.name)}
                    </div>
                    <div class="flex-grow min-w-0 pr-8">
                        <h2 class="text-lg sm:text-xl font-black leading-tight truncate">${t?"Novo Cliente":h(e.name)}</h2>
                        <p class="text-xs text-indigo-200 mt-0.5 truncate">
                            ${t?"Preencha as informações do novo registo":`<i class="bi bi-whatsapp mr-1"></i>${e.phone||"Sem telefone"}`}
                        </p>
                        ${!t&&e.totalDebt&&e.totalDebt>0?`<span class="inline-block mt-1.5 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-red-400 shadow-sm">Dívida: R$ ${parseFloat(e.totalDebt).toFixed(2)}</span>`:""}
                    </div>
                </div>
            </div>
            
            ${a}
            
            <div class="p-4 sm:p-5 flex-grow overflow-y-auto custom-scrollbar relative bg-gray-50 w-full">
                ${E.historyLoading?'<div class="absolute inset-0 bg-white/80 flex items-center justify-center z-20"><div class="loader"></div></div>':""}
                <div class="animate-fade-in w-full pb-10">${s}</div>
            </div>
        </div>
    `}function Zl(e){return`
        <form id="form-edit-client" class="space-y-4">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
                    <h3 class="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3 border-b border-gray-100 pb-2"><i class="bi bi-person-vcard text-indigo-500 mr-2"></i> Dados Pessoais</h3>
                    
                    <div>
                        <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Nome Completo *</label>
                        <input type="text" name="name" value="${h(e.name)}" required class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow">
                    </div>
                    
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">WhatsApp *</label>
                            <input type="tel" name="phone" value="${h(e.phone||"")}" required class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow">
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">CPF</label>
                            <input type="text" name="cpf" value="${h(e.cpf||"")}" placeholder="000.000.000-00" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow">
                        </div>
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">E-mail</label>
                        <input type="email" name="email" value="${h(e.email||"")}" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow">
                    </div>
                </div>

                <div class="space-y-4">
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <h3 class="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3 border-b border-gray-100 pb-2"><i class="bi bi-info-circle text-indigo-500 mr-2"></i> Adicionais</h3>
                        
                        <div class="grid grid-cols-2 gap-3 mb-3">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Dia Nasc.</label>
                                <input type="number" name="dobDay" min="1" max="31" value="${e.dobDay||""}" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 text-center transition-shadow">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Mês Nasc.</label>
                                <input type="number" name="dobMonth" min="1" max="12" value="${e.dobMonth||""}" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 text-center transition-shadow">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Gênero</label>
                                <select name="gender" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow">
                                    <option value="">Não informar</option>
                                    <option value="F" ${e.gender==="F"?"selected":""}>Feminino</option>
                                    <option value="M" ${e.gender==="M"?"selected":""}>Masculino</option>
                                    <option value="O" ${e.gender==="O"?"selected":""}>Outro</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Captação</label>
                                <select name="source" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow">
                                    <option value="">Como conheceu?</option>
                                    <option value="Instagram" ${e.source==="Instagram"?"selected":""}>Instagram</option>
                                    <option value="Indicacao" ${e.source==="Indicacao"?"selected":""}>Indicação</option>
                                    <option value="Passagem" ${e.source==="Passagem"?"selected":""}>Fachada</option>
                                    <option value="Google" ${e.source==="Google"?"selected":""}>Google</option>
                                    <option value="Outros" ${e.source==="Outros"?"selected":""}>Outros</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <h3 class="text-xs font-bold text-gray-800 uppercase tracking-wide mb-2 border-b border-gray-100 pb-2"><i class="bi bi-journal-text text-indigo-500 mr-2"></i> Anotações Internas</h3>
                        <textarea name="notes" rows="2" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow resize-none" placeholder="Histórico de alergias, preferências...">${h(e.notes||"")}</textarea>
                    </div>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row justify-end gap-3 pt-3 border-t border-gray-200 mt-2">
                <button type="submit" class="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold shadow hover:bg-indigo-700 transition flex items-center justify-center gap-2 text-xs">
                    <i class="bi bi-check2-circle text-sm"></i> ${e.isNew?"Cadastrar Cliente":"Salvar Alterações"}
                </button>
            </div>
        </form>
    `}function ed(e){let t=E.historyData.appointments||[];return t.sort((a,s)=>new Date(s.startTime)-new Date(a.startTime)),`
        <div class="space-y-2">
            ${t.length?t.map(a=>{const s=new Date(a.startTime);let r=s<new Date?'<span class="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border border-gray-200">Concluído</span>':'<span class="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border border-emerald-200">Agendado</span>';return a.status==="cancelled"&&(r='<span class="bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border border-red-200">Cancelado</span>'),`
                <div class="bg-white border border-gray-200 rounded-xl p-3 flex gap-3 shadow-sm items-center cursor-pointer hover:bg-gray-50 transition-colors" data-go-agenda="true" data-id="${a.id}" data-date="${a.startTime}">
                    <div class="flex-shrink-0 text-center w-10 border-r border-gray-100 pr-2">
                        <span class="block text-[8px] font-bold text-gray-400 uppercase">${s.toLocaleDateString("pt-BR",{month:"short"})}</span>
                        <span class="block text-base font-black text-gray-800 leading-none mt-0.5">${s.getDate()}</span>
                    </div>
                    <div class="flex-grow min-w-0">
                        <p class="font-bold text-xs text-gray-800 truncate">${h(a.serviceName||"Serviço")}</p>
                        <p class="text-[9px] text-gray-500 truncate mt-0.5"><i class="bi bi-person mr-1"></i>${h(a.professionalName||"N/A")} <span class="mx-1">•</span> <i class="bi bi-clock mr-1"></i>${s.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</p>
                    </div>
                    <div class="flex-shrink-0 text-right">
                        ${r}
                    </div>
                </div>`}).join(""):'<div class="text-center py-10 bg-white rounded-xl border border-gray-200"><p class="text-[10px] text-gray-400 font-medium">Nenhum agendamento encontrado.</p></div>'}
        </div>
    `}function td(e){let t=E.historyData.sales||[];t.sort((o,r)=>new Date(r.date)-new Date(o.date));const a=t.reduce((o,r)=>o+(Number(r.totalAmount)||0),0),s=t.length>0?a/t.length:0;return`
        <div class="space-y-4">
            <div class="grid grid-cols-2 gap-3 mb-2">
                <div class="bg-emerald-50 p-3 rounded-xl border border-emerald-100 shadow-sm flex flex-col text-center">
                    <span class="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">LTV (V. Vitalício)</span>
                    <span class="text-lg font-black text-emerald-700 mt-0.5">${ya(a)}</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col text-center">
                    <span class="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Ticket Médio</span>
                    <span class="text-lg font-black text-gray-800 mt-0.5">${ya(s)}</span>
                </div>
            </div>

            <div class="space-y-2">
                <h4 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 pl-1">Histórico de Vendas</h4>
                ${t.length?t.map(o=>`
                <div class="bg-white border border-gray-200 rounded-xl p-3 flex justify-between items-center shadow-sm hover:bg-gray-50 cursor-pointer transition-colors" data-go-comanda="true" data-id="${o.id}">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 text-xs"><i class="bi bi-receipt"></i></div>
                        <div>
                            <p class="font-bold text-gray-800 text-[10px] sm:text-xs">Venda #${o.id.slice(-5).toUpperCase()}</p>
                            <p class="text-[9px] text-gray-400 mt-0.5">${new Date(o.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-black text-emerald-600 text-xs">${ya(o.totalAmount)}</p>
                        <p class="text-[8px] text-indigo-500 font-bold uppercase mt-0.5 hover:underline">Ver Comanda <i class="bi bi-chevron-right"></i></p>
                    </div>
                </div>`).join(""):'<div class="text-center py-8 bg-white rounded-xl border border-gray-200"><p class="text-[10px] text-gray-400">Nenhum histórico financeiro.</p></div>'}
            </div>
        </div>
    `}function ad(e){const t=E.historyData.loyaltyLog||[];return t.sort((a,s)=>new Date(s.date)-new Date(a.date)),`
        <div class="space-y-4">
            <div class="bg-amber-400 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col items-center justify-center text-center">
                <div class="absolute right-[-20px] top-[-20px] opacity-20"><i class="bi bi-star-fill text-9xl"></i></div>
                <p class="text-amber-100 font-bold uppercase tracking-wider text-[10px] mb-1 z-10">Saldo de Pontos</p>
                <h1 class="text-5xl font-black z-10 drop-shadow-md">${e.loyaltyPoints||0}</h1>
                
                <button id="btn-manual-redeem" type="button" class="mt-4 bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-lg backdrop-blur-sm transition border border-white/30 flex items-center gap-2 z-10 shadow-sm">
                    <i class="bi bi-sliders"></i> Ajuste Manual
                </button>
            </div>

            <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div class="bg-gray-50 p-2.5 border-b border-gray-200"><h4 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Extrato de Pontos</h4></div>
                <div class="p-2 space-y-1 max-h-64 overflow-y-auto custom-scrollbar">
                    ${t.length>0?t.map(a=>{const s=a.type==="redemption";return`
                        <div class="flex justify-between items-center py-2 px-3 border-b border-gray-100 last:border-0">
                            <div>
                                <p class="text-[10px] font-bold text-gray-800">${h(a.description||(s?"Resgate":"Acúmulo"))}</p>
                                <p class="text-[9px] text-gray-400 mt-0.5">${new Date(a.date).toLocaleDateString()}</p>
                            </div>
                            <span class="font-black text-xs ${s?"text-red-500":"text-amber-500"}">
                                ${s?"-":"+"}${a.points}
                            </span>
                        </div>`}).join(""):'<p class="text-center text-gray-400 py-6 text-[10px]">Sem movimentações.</p>'}
                </div>
            </div>
        </div>
    `}function at(e,t){if(e.querySelectorAll(".tab-btn").forEach(s=>{s.onclick=async()=>{const o=s.dataset.tab;if(E.activeTab===o)return;E.activeTab=o;const r=document.getElementById("client-modal-content");r&&(r.innerHTML=tt(t),at(r,t)),o!=="profile"&&!E.historyLoading&&E.historyData.appointments.length===0&&await sd(t.id)}}),E.activeTab==="profile"){const s=e.querySelector("#form-edit-client");s&&(s.onsubmit=od);const o=e.querySelector("#btn-delete-client");o&&(o.onclick=rd)}if(E.activeTab==="loyalty"){const s=e.querySelector("#btn-manual-redeem");s&&(s.onclick=()=>id(t))}e.querySelectorAll("[data-go-agenda]").forEach(s=>{s.onclick=()=>{vt(),Z("agenda-section",{targetDate:new Date(s.dataset.date),scrollToAppointmentId:s.dataset.id})}}),e.querySelectorAll("[data-go-comanda]").forEach(s=>{s.onclick=()=>{vt(),Z("comandas-section",{selectedAppointmentId:s.dataset.id,initialFilter:"finalizadas"})}});const a=e.querySelector("#btn-close-modal");a&&(a.onclick=vt)}async function sd(e){const t=E.selectedClient;if(!t||!t.phone)return;E.historyLoading=!0;const a=document.getElementById("client-modal-content");a&&(a.innerHTML=tt(t),at(a,t));try{const s=new Date;s.setMonth(s.getMonth()+12);const o=new Date;o.setFullYear(o.getFullYear()-5);let r=`/api/appointments/${g.establishmentId}?startDate=${o.toISOString()}&endDate=${s.toISOString()}&clientPhone=${encodeURIComponent(or(t.phone))}&limit=50`;const i=await D(r);E.historyData.appointments=i,E.historyData.sales=i.filter(d=>d.status==="completed").map(d=>({id:d.id,date:d.startTime,totalAmount:d.totalAmount||0,items:d.comandaItems||d.services||[]}));const n=[];i.forEach(d=>{d.status==="completed"&&d.loyaltyPointsEarned>0&&n.push({type:"earn",points:d.loyaltyPointsEarned,date:d.startTime,description:"Venda finalizada"}),d.loyaltyRedemption&&n.push({type:"redemption",points:d.loyaltyRedemption.cost||0,date:d.startTime,description:`Resgate: ${d.loyaltyRedemption.name}`})}),E.historyData.loyaltyLog=n}catch(s){console.error("Erro histórico",s)}finally{E.historyLoading=!1;const s=document.getElementById("client-modal-content");s&&E.selectedClient&&(s.innerHTML=tt(E.selectedClient),at(s,E.selectedClient))}}async function od(e){e.preventDefault();const t=new FormData(e.target),a=Object.fromEntries(t.entries());a.establishmentId=g.establishmentId,a.dobDay&&(a.dobDay=parseInt(a.dobDay)),a.dobMonth&&(a.dobMonth=parseInt(a.dobMonth));try{if(E.selectedClient.isNew){const s=await ho(a);E.clients.unshift(s),b("Sucesso","Cliente cadastrado com sucesso!","success"),E.selectedClient=s,Ja(s.id)}else{await yo(E.selectedClient.id,a),Object.assign(E.selectedClient,a);const s=E.clients.findIndex(r=>r.id===E.selectedClient.id);s!==-1&&(E.clients[s]=E.selectedClient),b("Sucesso","Dados salvos com sucesso!","success");const o=document.getElementById("client-modal-content");o&&(o.innerHTML=tt(E.selectedClient),at(o,E.selectedClient))}ys(),ye()}catch(s){b("Erro",s.message,"error")}}async function rd(){if(await Y("Excluir Cliente","Tem certeza? O histórico será apagado e não pode ser desfeito."))try{await vo(E.selectedClient.id),E.clients=E.clients.filter(e=>e.id!==E.selectedClient.id),E.selectedClient=null,b("Sucesso","Cliente removido com sucesso.","success"),vt(),ys(),ye()}catch(e){b("Erro",e.message,"error")}}function id(e){const t=e.loyaltyPoints||0,a=`
        <div class="text-center mb-4">
            <p class="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Saldo Atual</p>
            <h2 class="text-3xl font-black text-amber-500">${t}</h2>
        </div>
        <form id="manual-redeem-form" class="space-y-3">
            <div>
                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Ação</label>
                <select id="redeem-action" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 bg-gray-50">
                    <option value="debit">Remover Pontos (Resgate)</option>
                    <option value="credit">Adicionar Pontos (Bônus)</option>
                </select>
            </div>
            <div>
                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Quantidade</label>
                <input type="number" id="redeem-points" min="1" required class="w-full p-2 border border-gray-300 rounded-lg text-sm font-black text-gray-900 text-center outline-none focus:ring-1 focus:ring-indigo-500 bg-gray-50" placeholder="Ex: 50">
            </div>
            <div>
                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Motivo/Obs</label>
                <input type="text" id="redeem-reason" required class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 bg-gray-50" placeholder="Ex: Brinde especial">
            </div>
            <div class="pt-2">
                <button type="submit" class="w-full bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-bold shadow-sm hover:bg-indigo-700 active:scale-95 transition text-xs">Confirmar Ajuste</button>
            </div>
        </form>
    `,{modalElement:s,close:o}=me({title:"Ajuste de Pontos",contentHTML:a,maxWidth:"w-[90%] max-w-xs"});s.querySelector("form").onsubmit=async r=>{r.preventDefault();const i=document.getElementById("redeem-action").value,n=parseInt(document.getElementById("redeem-points").value,10),d=document.getElementById("redeem-reason").value;if(!n||n<=0)return b("Erro","Qtd inválida.","error");if(i==="debit"&&n>t)return b("Erro","Saldo insuficiente.","error");try{let l=t;i==="debit"?(await Li(g.establishmentId,e.phone,n,d),l-=n):(l+=n,await yo(e.id,{loyaltyPoints:l})),E.selectedClient.loyaltyPoints=l,E.historyData.loyaltyLog.unshift({type:i==="debit"?"redemption":"earn",points:n,date:new Date().toISOString(),description:d+" (Manual)"}),b("Sucesso","Saldo atualizado.","success"),o();const c=document.getElementById("client-modal-content");c&&E.selectedClient&&(c.innerHTML=tt(E.selectedClient),at(c,E.selectedClient)),ye()}catch(l){b("Erro",l.message,"error")}}}function nd(){if(typeof XLSX>"u")return b("Erro","Biblioteca de exportação não carregada.","error");if(E.clients.length===0)return b("Aviso","Nenhum cliente para exportar.","info");const e=E.clients.map(t=>({Nome:t.name,Telefone:t.phone||"","E-mail":t.email||"",CPF:t.cpf||"",Gênero:t.gender==="M"?"Masculino":t.gender==="F"?"Feminino":t.gender==="O"?"Outro":"",Aniversário:t.dobDay&&t.dobMonth?`${t.dobDay}/${t.dobMonth}`:"",Origem:t.source||"",Cadastro:Ua(t.createdAt),"Última Visita":Ua(t.lastVisit),"Pontos Fidelidade":t.loyaltyPoints||0,"Débito/Fiado (R$)":t.totalDebt||0,Anotações:t.notes||""}));try{const t=XLSX.utils.json_to_sheet(e),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,t,"Clientes"),XLSX.writeFile(a,`KAIROS_Clientes_${new Date().toISOString().split("T")[0]}.xlsx`)}catch{b("Erro","Falha ao gerar o ficheiro.","error")}}const Me=document.getElementById("content"),$a={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},se=[{id:"clean-modern",name:"Clean Moderno",bg:"#f8fafc",text:"#4b5563",titleColor:"#0f172a",primary:"#2563eb",font:"Inter",btn:"rounded",cardBg:"#ffffff",cardBorder:"#e2e8f0"},{id:"dark-premium",name:"Dark Premium",bg:"#0f172a",text:"#9ca3af",titleColor:"#f8fafc",primary:"#f59e0b",font:"'Playfair Display'",btn:"square",cardBg:"#1e293b",cardBorder:"#334155"},{id:"spa-zen",name:"Spa & Wellness",bg:"#f0fdf4",text:"#166534",titleColor:"#064e3b",primary:"#10b981",font:"Poppins",btn:"pill",cardBg:"#ffffff",cardBorder:"#d1fae5"},{id:"neo-brutalism",name:"Neobrutalismo",bg:"#ffffff",text:"#000000",titleColor:"#000000",primary:"#ef4444",font:"Inter",btn:"square",cardBg:"#ffffff",cardBorder:"#000000"},{id:"tech-cyan",name:"Tech Night",bg:"#020617",text:"#94a3b8",titleColor:"#f1f5f9",primary:"#06b6d4",font:"Roboto",btn:"rounded",cardBg:"#0f172a",cardBorder:"#1e293b"},{id:"sunset-glam",name:"Sunset Glam",bg:"#fff7ed",text:"#831843",titleColor:"#4c0519",primary:"#f43f5e",font:"Poppins",btn:"pill",cardBg:"#ffffff",cardBorder:"#fce7f3"},{id:"luxury-mono",name:"Luxo Minimal",bg:"#fafafa",text:"#525252",titleColor:"#171717",primary:"#404040",font:"'Playfair Display'",btn:"square",cardBg:"#ffffff",cardBorder:"#e5e5e5"},{id:"deep-ocean",name:"Oceano Profundo",bg:"#172554",text:"#bfdbfe",titleColor:"#eff6ff",primary:"#3b82f6",font:"Montserrat",btn:"pill",cardBg:"#1e3a8a",cardBorder:"#1e40af"},{id:"rustic-vintage",name:"Rústico Vintage",bg:"#1c1917",text:"#a8a29e",titleColor:"#fafaf9",primary:"#ea580c",font:"Montserrat",btn:"rounded",cardBg:"#292524",cardBorder:"#44403c"},{id:"vibrant-purple",name:"Estúdio Criativo",bg:"#fdf4ff",text:"#701a75",titleColor:"#4a044e",primary:"#c026d3",font:"Inter",btn:"rounded",cardBg:"#ffffff",cardBorder:"#fae8ff"}];let K=null,ee=null;function rr(){return[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais da Unidade"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"whatsapp-bot",icon:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",label:"Atendente Virtual (WhatsApp)"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}]}function Fs(e,t,a){return new Promise((s,o)=>{const r=new FileReader;r.readAsDataURL(e),r.onload=i=>{const n=new Image;n.src=i.target.result,n.onload=()=>{const d=document.createElement("canvas");let l=n.width,c=n.height;l>t&&(c*=t/l,l=t),d.width=l,d.height=c,d.getContext("2d").drawImage(n,0,0,l,c);const p=e.type==="image/png"&&t<500?"image/png":"image/jpeg";s(d.toDataURL(p,a))},n.onerror=d=>o(d)},r.onerror=i=>o(i)})}function He(e,t=null){let a='<option value="">-- Selecione (Opcional) --</option>';const s=i=>{const n=new Map,d=[];return i&&(i.forEach(l=>n.set(l.id,{...l,children:[]})),n.forEach(l=>{l.parentId&&n.has(l.parentId)?n.get(l.parentId).children.push(l):d.push(l)})),d},o=(i,n="")=>{const d=i.id===t?"selected":"";a+=`<option value="${i.id}" ${d}>${n}${h(i.name)}</option>`,i.children.forEach(l=>o(l,n+"— "))};return s(e).forEach(i=>o(i)),a}async function dt(e,t){const a=t.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const s=[],{ownerName:o,...r}=e;if(o&&o!==g.userName){const n=be.currentUser;n&&s.push(wr(n,{displayName:o}).then(()=>{g.userName=o}))}const i={...K,...r};s.push(os(ee,i)),await Promise.all(s),K=i,b("Sucesso","Definições salvas com sucesso!","success"),r.themeColor&&ee===g.establishmentId&&setTimeout(()=>window.location.reload(),1500)}catch(s){b("Erro",`Não foi possível salvar: ${s.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function ld(e,t){const a=h(e.name||""),s=h(e.phone||""),o=h(e.cnpj||""),r=h(e.email||""),i=h(e.address||""),n=h(e.website||""),d=h(g.userName||"");t.innerHTML=`
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
    `,t.querySelector("#personal-data-form").addEventListener("submit",l=>{l.preventDefault();const c={ownerName:t.querySelector("#ownerName").value,name:t.querySelector("#establishmentName").value,phone:t.querySelector("#establishmentPhone").value,cnpj:t.querySelector("#establishmentCnpjCpf").value,email:t.querySelector("#establishmentEmail").value,address:t.querySelector("#establishmentAddress").value,website:t.querySelector("#establishmentWebsite").value};dt(c,l)})}function dd(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#newPassword").value,o=t.querySelector("#confirmPassword").value;if(s!==o){b("Erro","As senhas não coincidem.","error");return}const r=t.querySelector('button[form="change-password-form"]');r.disabled=!0,r.textContent="A Salvar...";try{const i=be.currentUser;if(i)await vr(i,s),b("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum utilizador logado encontrado.")}catch(i){b("Erro",`Não foi possível alterar a senha: ${i.message}`,"error")}finally{r.disabled=!1,r.textContent="Salvar Nova Senha"}})}function cd(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Alterar E-mail de Acesso</h3>
                <button type="submit" form="change-email-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar Novo E-mail</button>
            </div>
            <form id="change-email-form" class="space-y-4">
                <p class="text-sm text-gray-600">Para alterar o seu e-mail, confirme a sua senha atual. Um link será enviado para o **novo** endereço.</p>
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
    `,t.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#newEmail").value,o=t.querySelector("#currentPassword").value,r=t.querySelector('button[form="change-email-form"]');r.disabled=!0,r.textContent="A verificar...";try{const i=be.currentUser,n=xr.credential(i.email,o);await hr(i,n),await yr(i,s),await ei(ee,s),b("Sucesso","Link de verificação enviado! Verifique o seu novo e-mail.","success"),a.target.reset()}catch(i){b("Erro",i.message,"error")}finally{r.disabled=!1,r.textContent="Salvar Novo E-mail"}})}function ud(e,t){const a=h(e.welcomeMessage||"Agende o seu horário de forma rápida e fácil."),s=e.socialLinks||{},o=h(s.instagram||""),r=h(s.facebook||""),i=h(s.whatsapp||"");let n=e.primaryColor||e.themeColor||se[0].primary,d=e.backgroundColor||se[0].bg,l=e.textColor||se[0].text,c=e.titleColor||se[0].titleColor,u=e.buttonStyle||se[0].btn,p=e.typography||se[0].font,m=e.templateId?se.findIndex(J=>J.id===e.templateId):0;m===-1&&(m=0);const y=J=>J==="pill"?"9999px":J==="square"?"0.25rem":"0.75rem";t.innerHTML=`
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 flex-wrap gap-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800">Layout e Link na Bio</h3>
                    <p class="text-sm text-gray-500 mt-1">Personalize a vitrine digital para o seu cliente.</p>
                </div>
                <button type="submit" form="branding-form" class="bg-indigo-600 text-white font-semibold py-2.5 px-6 rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-95 flex items-center gap-2">
                    <i class="bi bi-save"></i> Publicar Alterações
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 h-full">
                
                <div class="lg:col-span-7 p-6 border-r border-gray-100 overflow-y-auto max-h-[850px] bg-white">
                    <form id="branding-form" class="space-y-8">
                        <input type="hidden" id="establishmentLogoBase64" value="${e.logo||""}">
                        <input type="hidden" id="establishmentBackgroundImageBase64" value="${e.backgroundImage||""}">
                        <input type="hidden" id="selectedTemplateId" value="${se[m].id}">
                        
                        <div class="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
                            <h4 class="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-3 text-center">1. Escolha um Tema Base</h4>
                            <div class="flex items-center justify-center gap-4">
                                <button type="button" id="prevTemplate" class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm transition-colors cursor-pointer border border-indigo-200">
                                    <i class="bi bi-chevron-left text-lg"></i>
                                </button>
                                <div class="text-center min-w-[160px]">
                                    <span id="templateNameDisplay" class="text-lg font-bold text-indigo-950">${se[m].name}</span>
                                </div>
                                <button type="button" id="nextTemplate" class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm transition-colors cursor-pointer border border-indigo-200">
                                    <i class="bi bi-chevron-right text-lg"></i>
                                </button>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                <i class="bi bi-image text-indigo-500"></i> 2. Logótipo e Capa
                            </h4>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition relative group" id="triggerBannerUpload">
                                    <input type="file" id="establishmentBgInput" class="hidden" accept="image/*">
                                    <div class="absolute inset-0 z-10 hidden group-hover:flex items-center justify-center bg-black bg-opacity-40 rounded-xl transition pointer-events-none">
                                        <span class="text-white font-semibold text-sm">Mudar Capa</span>
                                    </div>
                                    <div class="h-24 w-full bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center relative pointer-events-none">
                                        <img id="establishmentBgPreview" src="${e.backgroundImage||""}" class="w-full h-full object-cover ${e.backgroundImage?"":"hidden"}">
                                        <i class="bi bi-image text-3xl text-gray-300 ${e.backgroundImage?"hidden":""}" id="establishmentBgPlaceholder"></i>
                                    </div>
                                    <p class="text-xs font-semibold text-gray-700 pointer-events-none">Imagem de Capa (Fundo)</p>
                                </div>

                                <div class="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition relative group" id="triggerLogoUpload">
                                    <input type="file" id="establishmentLogoInput" class="hidden" accept="image/*">
                                    <div class="absolute inset-0 z-10 hidden group-hover:flex items-center justify-center bg-black bg-opacity-40 rounded-xl transition pointer-events-none">
                                        <span class="text-white font-semibold text-sm">Mudar Logo</span>
                                    </div>
                                    <div class="h-24 w-24 bg-gray-100 rounded-full mx-auto overflow-hidden mb-3 flex items-center justify-center border-4 border-white shadow-sm relative pointer-events-none">
                                        <img id="establishmentLogoPreview" src="${e.logo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Logo"}" class="w-full h-full object-contain bg-white">
                                    </div>
                                    <p class="text-xs font-semibold text-gray-700 pointer-events-none">Logótipo</p>
                                </div>
                            </div>
                        </div>

                        <hr class="border-gray-100">

                        <div class="space-y-4">
                            <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                <i class="bi bi-card-text text-indigo-500"></i> 3. Informações e Contactos
                            </h4>
                            <div>
                                <label for="establishmentWelcomeMessage" class="block text-xs font-semibold text-gray-600 mb-1">Descrição Curta</label>
                                <textarea id="establishmentWelcomeMessage" rows="2" class="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none" placeholder="Ex: Especialistas em cortes clássicos. Agende o seu horário!">${a}</textarea>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                                <div class="flex rounded-xl shadow-sm overflow-hidden border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                                    <span class="inline-flex items-center px-3 bg-gray-50 text-gray-500 border-r border-gray-300"><i class="bi bi-instagram text-pink-600"></i></span>
                                    <input type="text" id="socialInstagram" value="${o}" class="flex-1 p-2.5 outline-none text-xs" placeholder="Usuário (@)">
                                </div>
                                <div class="flex rounded-xl shadow-sm overflow-hidden border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                                    <span class="inline-flex items-center px-3 bg-gray-50 text-gray-500 border-r border-gray-300"><i class="bi bi-whatsapp text-green-500"></i></span>
                                    <input type="text" id="socialWhatsapp" value="${i}" class="flex-1 p-2.5 outline-none text-xs" placeholder="Número Whatsapp">
                                </div>
                                <div class="flex rounded-xl shadow-sm overflow-hidden border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                                    <span class="inline-flex items-center px-3 bg-gray-50 text-gray-500 border-r border-gray-300"><i class="bi bi-facebook text-blue-600"></i></span>
                                    <input type="text" id="socialFacebook" value="${r}" class="flex-1 p-2.5 outline-none text-xs" placeholder="Link da página">
                                </div>
                            </div>
                        </div>

                        <hr class="border-gray-100">

                        <div class="space-y-4 pb-4">
                            <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                <i class="bi bi-sliders text-indigo-500"></i> 4. Ajustes Finos (Opcional)
                            </h4>
                            
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div class="bg-gray-50 p-2 rounded-xl border border-gray-200">
                                    <label class="block text-[10px] font-semibold text-gray-500 mb-1 text-center">Botões</label>
                                    <div class="flex flex-col items-center gap-1">
                                        <input type="color" id="previewPrimaryColorInput" value="${n}" class="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent">
                                    </div>
                                </div>

                                <div class="bg-gray-50 p-2 rounded-xl border border-gray-200">
                                    <label class="block text-[10px] font-semibold text-gray-500 mb-1 text-center">Fundo</label>
                                    <div class="flex flex-col items-center gap-1">
                                        <input type="color" id="previewBgColorInput" value="${d}" class="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent">
                                    </div>
                                </div>

                                <div class="bg-gray-50 p-2 rounded-xl border border-gray-200">
                                    <label class="block text-[10px] font-semibold text-gray-500 mb-1 text-center">Nome</label>
                                    <div class="flex flex-col items-center gap-1">
                                        <input type="color" id="previewTitleColorInput" value="${c}" class="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent">
                                    </div>
                                </div>

                                <div class="bg-gray-50 p-2 rounded-xl border border-gray-200">
                                    <label class="block text-[10px] font-semibold text-gray-500 mb-1 text-center">Texto</label>
                                    <div class="flex flex-col items-center gap-1">
                                        <input type="color" id="previewTextColorInput" value="${l}" class="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent">
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                <div>
                                    <label class="block text-xs font-semibold text-gray-600 mb-1">Tipografia</label>
                                    <select id="typographyInput" class="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 bg-white">
                                        <option value="Inter" ${p==="Inter"?"selected":""}>Inter (Moderna)</option>
                                        <option value="Roboto" ${p==="Roboto"?"selected":""}>Roboto (Clássica)</option>
                                        <option value="'Playfair Display'" ${p==="'Playfair Display'"?"selected":""}>Playfair (Elegante)</option>
                                        <option value="Montserrat" ${p==="Montserrat"?"selected":""}>Montserrat (Forte)</option>
                                        <option value="Poppins" ${p==="Poppins"?"selected":""}>Poppins (Suave)</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-semibold text-gray-600 mb-1">Botões</label>
                                    <div class="flex bg-gray-100 p-1 rounded-xl">
                                        <label class="flex-1 text-center cursor-pointer">
                                            <input type="radio" name="buttonStyle" value="square" class="hidden peer" ${u==="square"?"checked":""}>
                                            <div class="py-1.5 px-2 text-xs font-semibold text-gray-500 rounded-lg peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition">Reto</div>
                                        </label>
                                        <label class="flex-1 text-center cursor-pointer">
                                            <input type="radio" name="buttonStyle" value="rounded" class="hidden peer" ${u==="rounded"?"checked":""}>
                                            <div class="py-1.5 px-2 text-xs font-semibold text-gray-500 rounded-lg peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition">Suave</div>
                                        </label>
                                        <label class="flex-1 text-center cursor-pointer">
                                            <input type="radio" name="buttonStyle" value="pill" class="hidden peer" ${u==="pill"?"checked":""}>
                                            <div class="py-1.5 px-2 text-xs font-semibold text-gray-500 rounded-lg peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition">Pílula</div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="lg:col-span-5 bg-gradient-to-br from-gray-100 to-gray-300 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    
                    <div class="relative w-[320px] h-[640px] bg-black rounded-[3rem] border-[10px] border-gray-900 shadow-2xl overflow-hidden shrink-0">
                        
                        <div class="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-xl w-32 mx-auto z-50"></div>

                        <div id="mockup-screen-wrapper" class="w-full h-full bg-white transition-all duration-300 transform scale-100 opacity-100 relative">
                            <div id="mockup-screen" class="w-full h-full overflow-y-auto no-scrollbar" style="
                                background-color: var(--preview-bg, ${d}); 
                                color: var(--preview-text, ${l}); 
                                font-family: var(--preview-font, ${p});
                                --preview-title-color: ${c};
                                --preview-primary: ${n};
                                --preview-btn-radius: ${y(u)};
                                --preview-card-bg: ${se[m].cardBg};
                                --preview-card-border: ${se[m].cardBorder};
                            ">
                                
                                <div class="relative h-36 w-full bg-gray-200 overflow-hidden">
                                    <img id="mockup-banner" src="${e.backgroundImage||""}" class="w-full h-full object-cover transition-opacity duration-300 ${e.backgroundImage?"":"hidden"}">
                                    <div id="mockup-banner-placeholder" class="w-full h-full flex items-center justify-center bg-gray-300 opacity-50 ${e.backgroundImage?"hidden":""}"></div>
                                    <div class="absolute inset-0 bg-gradient-to-t from-[var(--preview-bg)] to-transparent opacity-90"></div>
                                </div>

                                <div class="px-4 relative -mt-12 z-10 flex flex-col items-center text-center">
                                    
                                    <div class="w-24 h-24 bg-white rounded-full mx-auto border-[5px] shadow-sm overflow-hidden flex items-center justify-center transition-all duration-500" style="border-color: var(--preview-bg); background-color: var(--preview-bg);">
                                        <img id="mockup-logo" src="${e.logo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Logo"}" class="w-full h-full object-contain">
                                    </div>

                                    <div class="mt-2 w-full">
                                        <h1 class="text-xl font-bold truncate leading-tight" style="color: var(--preview-title-color);">${h(e.name||"Sua Empresa")}</h1>
                                        <p id="mockup-welcome" class="text-[11px] mt-1 opacity-70 leading-relaxed max-w-[260px] mx-auto">${a}</p>
                                    </div>

                                    <div class="flex justify-center gap-2 mt-3 w-full" id="mockup-social-row">
                                        <div id="mockup-insta-icon" class="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm transition-transform ${o?"":"hidden"}" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); color: var(--preview-primary)"><i class="bi bi-instagram"></i></div>
                                        <div id="mockup-whats-icon" class="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm transition-transform ${i?"":"hidden"}" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); color: var(--preview-primary)"><i class="bi bi-whatsapp"></i></div>
                                        <div id="mockup-face-icon" class="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm transition-transform ${r?"":"hidden"}" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); color: var(--preview-primary)"><i class="bi bi-facebook"></i></div>
                                    </div>
                                </div>

                                <div class="flex border-b border-gray-200 border-opacity-30 mt-4 px-4 gap-5">
                                    <div class="py-2 border-b-2 font-bold text-[13px]" style="border-color: var(--preview-primary); color: var(--preview-primary);">Serviços</div>
                                    <div class="py-2 text-[13px] opacity-50 font-semibold" style="color: var(--preview-title-color);">Profissionais</div>
                                </div>

                                <div class="w-full text-left p-4 space-y-3">
                                    <div class="p-3 transition-all flex justify-between items-center shadow-sm" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); border-radius: var(--preview-btn-radius);">
                                        <div>
                                            <p class="font-bold text-[13px]" style="color: var(--preview-title-color);">Corte Clássico</p>
                                            <p class="text-[11px] opacity-70 mt-0.5">30 min • R$ 40,00</p>
                                        </div>
                                        <div class="px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition-all" style="background-color: var(--preview-primary); border-radius: var(--preview-btn-radius);">+ Adicionar</div>
                                    </div>
                                    
                                    <div class="p-3 transition-all flex justify-between items-center shadow-sm" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); border-radius: var(--preview-btn-radius);">
                                        <div>
                                            <p class="font-bold text-[13px]" style="color: var(--preview-title-color);">Corte + Barba</p>
                                            <p class="text-[11px] opacity-70 mt-0.5">60 min • R$ 70,00</p>
                                        </div>
                                        <div class="px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition-all" style="background-color: var(--preview-primary); border-radius: var(--preview-btn-radius);">+ Adicionar</div>
                                    </div>
                                </div>

                                <div class="w-full text-left pt-2 pb-24 border-t border-gray-200 border-opacity-20 mt-2">
                                    <div class="px-4 flex items-center justify-between mb-3">
                                        <h2 class="text-[11px] font-bold uppercase tracking-wider opacity-60" style="color: var(--preview-title-color);">Avaliações</h2>
                                        <div class="flex items-center gap-1 text-yellow-500 text-[10px] bg-yellow-500/10 px-1.5 py-0.5 rounded-md">
                                            <i class="bi bi-star-fill"></i><span class="font-bold" style="color: var(--preview-title-color);">4.9</span>
                                        </div>
                                    </div>
                                    <div class="flex gap-2 overflow-x-auto px-4 pb-4 snap-x no-scrollbar">
                                        <div class="p-3 shadow-sm min-w-[200px] snap-center shrink-0 flex flex-col" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); border-radius: var(--preview-btn-radius);">
                                            <div class="flex gap-1 text-yellow-400 text-[8px] mb-2"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
                                            <p class="text-[10px] italic opacity-80 mb-3 flex-grow leading-relaxed" style="color: var(--preview-title-color);">"Atendimento impecável! O ambiente é ótimo e o serviço perfeito."</p>
                                            <div class="flex items-center gap-2 mt-auto pt-2 border-t border-gray-200 border-opacity-20">
                                                <div class="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style="background-color: var(--preview-primary);">MS</div>
                                                <span class="text-[10px] font-bold" style="color: var(--preview-title-color);">M. Silva</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                            <div class="absolute bottom-4 left-4 right-4 py-3 px-4 shadow-lg flex justify-between items-center z-20" style="background-color: var(--preview-primary); color: white; border-radius: var(--preview-btn-radius);">
                                <span class="text-xs font-semibold">1 serviço</span>
                                <span class="text-sm font-bold flex items-center gap-1">Continuar <i class="bi bi-arrow-right"></i></span>
                            </div>

                        </div>
                    </div>
                    </div>
            </div>
        </div>
    `;const w=t.querySelector("#mockup-screen-wrapper"),f=t.querySelector("#mockup-screen"),S=t.querySelector("#previewPrimaryColorInput"),T=t.querySelector("#previewBgColorInput"),L=t.querySelector("#previewTextColorInput"),k=t.querySelector("#previewTitleColorInput"),x=t.querySelector("#typographyInput"),I=t.querySelector("#establishmentWelcomeMessage"),C=t.querySelector("#mockup-welcome"),M=t.querySelector("#socialInstagram"),B=t.querySelector("#socialWhatsapp"),P=t.querySelector("#socialFacebook"),F=t.querySelector("#prevTemplate"),V=t.querySelector("#nextTemplate"),_=t.querySelector("#templateNameDisplay"),A=t.querySelector("#selectedTemplateId"),U=J=>{const Q=se[J];w.style.opacity="0.3",w.style.transform="scale(0.96)",setTimeout(()=>{S.value=Q.primary,T.value=Q.bg,L.value=Q.text,k.value=Q.titleColor||Q.text,x.value=Q.font,t.querySelectorAll('input[name="buttonStyle"]').forEach(ge=>{ge.checked=ge.value===Q.btn}),A.value=Q.id,_.textContent=Q.name,f.style.setProperty("--preview-primary",Q.primary),f.style.setProperty("--preview-bg",Q.bg),f.style.setProperty("--preview-text",Q.text),f.style.setProperty("--preview-title-color",Q.titleColor||Q.text),f.style.setProperty("--preview-font",Q.font),f.style.setProperty("--preview-btn-radius",y(Q.btn)),f.style.setProperty("--preview-card-bg",Q.cardBg),f.style.setProperty("--preview-card-border",Q.cardBorder),w.style.opacity="1",w.style.transform="scale(1)"},300)};F.addEventListener("click",()=>{m=(m-1+se.length)%se.length,U(m)}),V.addEventListener("click",()=>{m=(m+1)%se.length,U(m)}),S.addEventListener("input",J=>f.style.setProperty("--preview-primary",J.target.value)),T.addEventListener("input",J=>f.style.setProperty("--preview-bg",J.target.value)),L.addEventListener("input",J=>f.style.setProperty("--preview-text",J.target.value)),k.addEventListener("input",J=>f.style.setProperty("--preview-title-color",J.target.value)),x.addEventListener("change",J=>f.style.setProperty("--preview-font",J.target.value)),t.querySelectorAll('input[name="buttonStyle"]').forEach(J=>{J.addEventListener("change",Q=>{Q.target.checked&&f.style.setProperty("--preview-btn-radius",y(Q.target.value))})}),I.addEventListener("input",J=>C.textContent=J.target.value||"Mensagem...");const ne=()=>{t.querySelector("#mockup-insta-icon").classList.toggle("hidden",!M.value.trim()),t.querySelector("#mockup-whats-icon").classList.toggle("hidden",!B.value.trim()),t.querySelector("#mockup-face-icon").classList.toggle("hidden",!P.value.trim())};[M,B,P].forEach(J=>J.addEventListener("input",ne));const ue=t.querySelector("#establishmentLogoInput"),xa=t.querySelector("#establishmentBgInput"),Tt=t.querySelector("#establishmentLogoBase64"),Be=t.querySelector("#establishmentBackgroundImageBase64");t.querySelector("#triggerLogoUpload").addEventListener("click",J=>{J.target.id!=="establishmentLogoInput"&&ue.click()}),ue.onchange=async J=>{const Q=J.target.files[0];if(Q){const ge=await Fs(Q,300,.9);t.querySelector("#establishmentLogoPreview").src=ge,t.querySelector("#mockup-logo").src=ge,Tt.value=ge}},t.querySelector("#triggerBannerUpload").addEventListener("click",J=>{J.target.id!=="establishmentBgInput"&&xa.click()}),xa.onchange=async J=>{const Q=J.target.files[0];if(Q){const ge=await Fs(Q,1280,.8);t.querySelector("#establishmentBgPreview").src=ge,t.querySelector("#establishmentBgPreview").classList.remove("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),Be.value=ge,t.querySelector("#mockup-banner").src=ge,t.querySelector("#mockup-banner").classList.remove("hidden"),t.querySelector("#mockup-banner-placeholder").classList.add("hidden")}},t.querySelector("#branding-form").addEventListener("submit",J=>{J.preventDefault();let Q="rounded";t.querySelectorAll('input[name="buttonStyle"]').forEach(ws=>{ws.checked&&(Q=ws.value)});const ge={logo:Tt.value,backgroundImage:Be.value,welcomeMessage:I.value,templateId:A.value,primaryColor:S.value,backgroundColor:T.value,textColor:L.value,titleColor:k.value,typography:x.value,buttonStyle:Q,socialLinks:{instagram:M.value.trim(),whatsapp:B.value.trim(),facebook:P.value.trim()}};dt(ge,J)})}function pd(e,t){const a=e.urlId||ee;let s=window.location.origin;(s.includes("localhost")||s.includes("capacitor://")||s.includes("127.0.0.1"))&&(s="https://www.kairosagenda.com.br");const o=h(`${s}/agendar?id=${a}`),r=e.publicBookingEnabled||!1,i=r?"Agendamento Online ATIVO":"Agendamento Online INATIVO",n=r?"text-green-600":"text-red-600";t.innerHTML=`
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
    `,t.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const d=t.querySelector("#publicBookingLink");d.select(),document.execCommand("copy"),d.blur(),b("Sucesso","Link copiado!","success")}),t.querySelector("#publicBookingToggle").addEventListener("change",async d=>{const l=d.target.checked,c=t.querySelector("#publicBookingStatusText");c.textContent=l?"Agendamento Online ATIVO":"Agendamento Online INATIVO",c.className=l?"text-sm font-semibold text-green-600":"text-sm font-semibold text-red-600";try{d.target.disabled=!0,await Zr(ee,l),K.publicBookingEnabled=l,b("Sucesso",`Agendamento online ${l?"ativado":"desativado"}!`,"success")}catch(u){b("Erro",u.message,"error"),d.target.checked=!l}finally{d.target.disabled=!1}}),hd(e.slotInterval||30,t),t.querySelector("#booking-form").addEventListener("submit",d=>{d.preventDefault();const l={slotInterval:parseInt(t.querySelector("#establishmentSlotInterval").value,10)};dt(l,d)})}function gd(e,t){t.innerHTML=`
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
    `;const a=t.querySelector("#establishmentTimezone");e.timezone&&(a.value=e.timezone);const s=t.querySelector("#establishmentWorkingHoursContainer"),o=e.workingHours||{};Object.keys($a).forEach(r=>{const i=o[r]||{},n=$a[r],d=i.active!==!1,l=document.createElement("div");l.className=`day-schedule-card p-4 rounded-lg border ${d?"bg-gray-50 border-gray-200":"bg-gray-100 border-gray-100 disabled opacity-60"}`,l.innerHTML=`
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
            </div>`,s.appendChild(l)}),s.addEventListener("change",r=>{const i=r.target.closest('.day-schedule-card input[type="checkbox"]');if(i){const n=i.closest(".day-schedule-card");n.classList.toggle("disabled",!i.checked),n.classList.toggle("opacity-60",!i.checked),n.classList.toggle("bg-gray-50",i.checked),n.classList.toggle("bg-gray-100",!i.checked)}}),t.querySelector("#working-hours-form").addEventListener("submit",r=>{r.preventDefault();const i={};Object.keys($a).forEach(d=>{i[d]={active:t.querySelector(`#est-${d}-active`).checked,start:t.querySelector(`#est-${d}-start`).value,end:t.querySelector(`#est-${d}-end`).value,breakStart:t.querySelector(`#est-${d}-breakStart`).value,breakEnd:t.querySelector(`#est-${d}-breakEnd`).value}});const n=t.querySelector("#establishmentTimezone").value;dt({workingHours:i,timezone:n},r)})}function ir(e,t){const a=!!e.whatsappInstance;t.innerHTML=`
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
                    <p class="text-sm text-gray-600 mb-6 max-w-md mx-auto">Clique no botão abaixo para gerar um QR Code. Escaneie-o com o telemóvel do estabelecimento (em Aparelhos Conectados).</p>
                    
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
    `;let s=null;const o=t.querySelector("#btnGenerateQr"),r=t.querySelector("#btnCancelQr");o&&o.addEventListener("click",async()=>{o.disabled=!0,o.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gerando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const l=await(await fetch(`${n}/connect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:ee})})).json();if(l.qrcode){t.querySelector("#whatsappStatusArea").classList.add("hidden"),t.querySelector("#qrCodeDisplayArea").classList.remove("hidden");const c=l.qrcode.includes("data:image")?l.qrcode:`data:image/png;base64,${l.qrcode}`;t.querySelector("#qrCodeImage").src=c,s=setInterval(async()=>{try{const p=await(await fetch(`${n}/status/${ee}`)).json();p.connected&&(clearInterval(s),K.whatsappInstance=p.instanceName,t.querySelector("#qrCodeDisplayArea").classList.add("hidden"),t.querySelector("#connectedStatusArea").classList.remove("hidden"),b("Sucesso","WhatsApp conectado com sucesso!","success"))}catch(u){console.error("Erro ao verificar status do WhatsApp",u)}},5e3)}else b("Erro na API",l.error||"Erro desconhecido","error")}catch(d){console.error(d),b("Erro de Conexão","Não foi possível aceder ao servidor Kairós.","error")}finally{o.disabled=!1,o.innerHTML='<i class="bi bi-phone-vibrate"></i> Gerar QR Code'}}),r&&r.addEventListener("click",()=>{s&&clearInterval(s),t.querySelector("#qrCodeDisplayArea").classList.add("hidden"),t.querySelector("#whatsappStatusArea").classList.remove("hidden")});const i=t.querySelector("#btnDisconnectWhatsapp");i&&i.addEventListener("click",async()=>{if(!confirm("Tem certeza que deseja DESCONECTAR? O bot parará de responder imediatamente."))return;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Desconectando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const l=await(await fetch(`${n}/disconnect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:ee})})).json();l.success?(b("Sucesso","WhatsApp desconectado!","success"),K.whatsappInstance=null,ir(K,t)):alert("Erro ao desconectar: "+l.error)}catch(d){console.error(d),b("Erro","Falha ao comunicar com o servidor.","error")}finally{i&&(i.disabled=!1,i.innerHTML='<i class="bi bi-power"></i> Desconectar')}})}async function bd(e,t){const a=e.loyaltyProgram||{},s=a.pointsPerVisit||1;let o=[],r=[],i=[];try{[o,r,i]=await Promise.all([nt(ee),lt(ee),ps(ee)])}catch(l){console.error("Erro ao carregar dados para fidelidade:",l)}t.innerHTML=`
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
    `;const n=t.querySelector("#loyaltyTiersContainer"),d=(l={})=>{const c=document.createElement("div");c.className="loyalty-tier-row bg-white p-4 border border-gray-200 rounded-lg shadow-sm relative grid grid-cols-1 md:grid-cols-4 gap-4 items-end";const u=l.type||"money",p=l.itemId||"",m=l.reward||"",y=l.discount||"",w=l.points||l.costPoints||"";c.innerHTML=`
            <div>
                <label class="text-xs font-bold text-gray-500 mb-1 block">Custo (Pontos)</label>
                <div class="relative">
                    <input type="number" placeholder="Ex: 100" data-field="points" value="${w}" class="w-full p-2 border border-gray-300 rounded-md font-bold text-gray-800">
                </div>
            </div>

            <div>
                <label class="text-xs font-bold text-gray-500 mb-1 block">Tipo de Recompensa</label>
                <select data-field="type" class="type-select w-full p-2 border border-gray-300 rounded-md bg-white text-sm">
                    <option value="money" ${u==="money"?"selected":""}>Desconto (€/R$)</option>
                    <option value="service" ${u==="service"?"selected":""}>Serviço Grátis</option>
                    <option value="product" ${u==="product"?"selected":""}>Produto Grátis</option>
                    <option value="package" ${u==="package"?"selected":""}>Pacote Grátis</option>
                </select>
            </div>

            <div class="relative md:col-span-2">
                <label class="text-xs font-bold text-gray-500 mb-1 block">O que o cliente ganha?</label>
                
                <div class="flex gap-2">
                    <input type="text" placeholder="Ex: R$ 20 de Desconto" data-field="rewardName" value="${h(m)}" class="desc-input flex-1 p-2 border border-gray-300 rounded-md ${u!=="money"?"hidden":""}">
                    
                    <select data-field="itemId" class="item-select flex-1 p-2 border border-gray-300 rounded-md bg-white text-sm ${u==="money"?"hidden":""}">
                        <option value="">Selecione o item na lista...</option>
                    </select>

                    <div class="w-24 relative">
                        <span class="absolute left-2 top-2 text-gray-500 text-sm">$</span>
                        <input type="number" placeholder="Valor" data-field="discount" value="${y}" step="0.01" class="discount-input w-full p-2 pl-7 border border-gray-300 rounded-md" title="Valor do desconto">
                    </div>
                </div>
            </div>

            <button type="button" class="remove-loyalty-tier absolute -top-3 -right-3 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white p-1.5 rounded-full shadow-md transition-colors" title="Remover Prémio">
                <i class="bi bi-x-lg text-sm"></i>
            </button>
        `;const f=c.querySelector(".type-select"),S=c.querySelector(".item-select"),T=c.querySelector(".desc-input"),L=c.querySelector(".discount-input"),k=x=>{S.innerHTML='<option value="">Selecione...</option>';let I=[];x==="service"?I=o:x==="product"?I=r:x==="package"&&(I=i),I.forEach(C=>{const M=C.id===p,B=C.name||C.title||"Sem nome",P=C.price||C.salePrice||0;S.innerHTML+=`<option value="${C.id}" data-price="${P}" ${M?"selected":""}>${h(B)}</option>`})};return u!=="money"&&k(u),f.addEventListener("change",x=>{const I=x.target.value;I==="money"?(S.classList.add("hidden"),T.classList.remove("hidden"),T.value="",L.value=""):(S.classList.remove("hidden"),T.classList.add("hidden"),k(I),L.value="")}),S.addEventListener("change",x=>{const I=x.target.selectedOptions[0];if(I&&I.value){T.value=I.text;const C=I.dataset.price;C&&(L.value=parseFloat(C).toFixed(2))}}),c};a.tiers&&a.tiers.length>0?a.tiers.forEach(l=>n.appendChild(d(l))):n.appendChild(d()),t.querySelector("#add-loyalty-tier").addEventListener("click",()=>{n.appendChild(d())}),n.addEventListener("click",l=>{const c=l.target.closest(".remove-loyalty-tier");c&&c.closest(".loyalty-tier-row").remove()}),t.querySelector("#loyalty-form").addEventListener("submit",l=>{l.preventDefault();const c=Array.from(t.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(p=>{const m=p.querySelector(".type-select").value,y=m==="money"?null:p.querySelector(".item-select").value;let w=m==="money"?p.querySelector(".desc-input").value:p.querySelector(".item-select").options[p.querySelector(".item-select").selectedIndex]?.text;return{points:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,costPoints:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,type:m,itemId:y,reward:w,name:w,discount:parseFloat(p.querySelector('input[data-field="discount"]').value)||0}}),u={loyaltyProgram:{enabled:t.querySelector("#loyaltyEnabled").checked,type:"visit",pointsPerVisit:parseInt(t.querySelector("#loyaltyPointsPerVisit").value,10)||1,pointsPerCurrency:0,tiers:c.filter(p=>p.points>0&&p.reward)}};dt(u,l)})}async function md(e,t){t.innerHTML=`
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
    `;try{const[a,s]=await Promise.all([ua(ee),gs(ee)]),o=e.financialIntegration||{},r=e.commissionConfig||{},i=e.purchaseConfig||{};t.querySelector("#financialNatureId").innerHTML=He(a,o.defaultNaturezaId),t.querySelector("#financialCostCenterId").innerHTML=He(s,o.defaultCentroDeCustoId),t.querySelector("#purchaseNatureId").innerHTML=He(a,i.defaultNatureId),t.querySelector("#purchaseCostCenterId").innerHTML=He(s,i.defaultCostCenterId),t.querySelector("#commissionNatureId").innerHTML=He(a,r.defaultNatureId),t.querySelector("#commissionCostCenterId").innerHTML=He(s,r.defaultCostCenterId)}catch{b("Erro","Não foi possível carregar o plano de contas da unidade.","error")}t.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const s={financialIntegration:{defaultNaturezaId:t.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:t.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:t.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:t.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:t.querySelector("#commissionNatureId").value||null,defaultCostCenterId:t.querySelector("#commissionCostCenterId").value||null}};dt(s,a)})}function fd(e,t){const a=`https://wa.me/5516997859430?text=Olá, preciso de ajuda com o sistema Kairos (Minha Unidade: ${e.name}).`;t.innerHTML=`
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
            <div class="mb-6">
                <h3 class="text-2xl font-bold text-gray-800">Precisa de Ajuda?</h3>
                <p class="text-gray-600 mt-2">Estamos aqui para garantir que tenha a melhor experiência possível.</p>
            </div>
            <div class="bg-green-50 border border-green-100 rounded-xl p-8 inline-block max-w-lg mx-auto w-full">
                <i class="bi bi-whatsapp text-6xl text-green-500 mb-4 inline-block"></i>
                <h4 class="text-xl font-bold text-gray-800 mb-6">Falar com Suporte</h4>
                <a href="${a}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg inline-flex items-center gap-2">
                    <i class="bi bi-chat-dots"></i> Iniciar Atendimento
                </a>
            </div>
        </div>
    `}function xd(e,t){const a=`https://wa.me/5516997859430?text=Gostaria de solicitar o cancelamento da assinatura. (Unidade: ${e.name})`;t.innerHTML=`
        <div class="bg-white p-6 rounded-lg shadow-md border border-red-100">
            <h3 class="text-xl font-bold text-red-600 mb-4">Cancelamento de Assinatura</h3>
            <p class="text-gray-700 mb-6">Lamentamos ver-te partir. Para solicitar o cancelamento e exclusão dos dados desta unidade, por favor entre em contacto com a nossa equipa financeira.</p>
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
    `}function hd(e,t){const a=t.querySelector("#slotIntervalContainer"),s=t.querySelector("#establishmentSlotInterval");if(!a||!s)return;const o=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=o.map(r=>{const i=r.value===e;return`<button type="button" data-value="${r.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors shadow-sm
                           ${i?"bg-indigo-600 text-white":"bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}">
                       ${r.label}
                   </button>`}).join(""),s.value=e,a.querySelectorAll(".interval-btn").forEach(r=>{r.addEventListener("click",()=>{s.value=r.dataset.value,a.querySelectorAll(".interval-btn").forEach(i=>{i.classList.remove("bg-indigo-600","text-white"),i.classList.add("bg-white","border","border-gray-300","text-gray-700")}),r.classList.add("bg-indigo-600","text-white"),r.classList.remove("bg-white","border","border-gray-300","text-gray-700")})})}async function yd(e){const a=rr().find(o=>o.id===e);if(!a)return;Me.innerHTML=`
        <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-gray-200 border-opacity-50">
            <div class="flex items-center gap-3">
                <button data-action="back-to-menu" class="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 shadow-sm flex items-center gap-2 text-sm font-semibold">
                    <i class="bi bi-arrow-left"></i> Voltar
                </button>
                <h2 class="text-2xl font-bold text-gray-800">${a.label}</h2>
            </div>
            <div class="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                ${h(K?.name||"")}
            </div>
        </div>
        
        <div id="settings-content-detail" class="pb-20 max-w-6xl mx-auto w-full">
            <div class="flex justify-center items-center py-10"><div class="spinner-border text-indigo-600" role="status"></div></div>
        </div>
    `,Me.querySelector('button[data-action="back-to-menu"]').addEventListener("click",o=>{o.preventDefault(),nr({id:ee})});const s=document.getElementById("settings-content-detail");switch(e){case"personal-data":ld(K,s);break;case"change-password":dd(K,s);break;case"change-email":cd(K,s);break;case"branding":ud(K,s);break;case"booking":pd(K,s);break;case"working-hours":gd(K,s);break;case"whatsapp-bot":ir(K,s);break;case"loyalty":await bd(K,s);break;case"financial":await md(K,s);break;case"support":fd(K,s);break;case"cancellation":xd(K,s);break;default:s.innerHTML='<div class="p-4 text-center">Módulo em construção.</div>'}}async function nr(e={}){Me.innerHTML=`
        <div class="flex flex-col justify-center items-center h-64">
            <div class="spinner-border text-indigo-600 border-4 w-12 h-12 mb-4" role="status"></div>
            <p class="text-gray-500 font-medium">A carregar configurações da unidade...</p>
        </div>
    `;try{ee=e.id||g.establishmentId,K=await De(ee);const t=e.id?`<button onclick="window.navigateTo('establishments-section')" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                   <i class="bi bi-diagram-3"></i> Voltar à Rede
               </button>`:"",a=K.isMatriz||!K.parentId?'<span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded ml-3">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded ml-3">📍 UNIDADE</span>',s=rr();Me.innerHTML=`
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
                        <h3 class="text-2xl font-bold mb-1">${h(K.name)} ${a}</h3>
                        <p class="text-indigo-200 text-sm flex items-center gap-2"><i class="bi bi-geo-alt"></i> ${h(K.address||"Morada não definida")}</p>
                    </div>
                    <div class="relative z-10 hidden sm:block">
                        <div class="w-16 h-16 bg-white rounded-xl shadow-md p-1 flex items-center justify-center">
                            ${K.logo?`<img src="${K.logo}" class="w-full h-full object-contain rounded-lg">`:`<span class="text-2xl text-indigo-600 font-bold">${K.name.charAt(0).toUpperCase()}</span>`}
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
                        ${vd(K.modules||{})}
                    </div>
                </div>
            </div>
        `,Me.querySelectorAll("div[data-section]").forEach(o=>{o.addEventListener("click",r=>{yd(o.dataset.section)})}),Me.querySelectorAll(".module-toggle").forEach(o=>{o.addEventListener("change",async()=>{const r=o.dataset.module;try{const n={...(await De(ee)).modules,[r]:o.checked};await os(ee,{modules:n}),b("Módulos","Módulos atualizados com sucesso.","success")}catch(i){o.checked=!o.checked,b("Erro",i.message,"error")}})})}catch(t){Me.innerHTML=`
            <div class="p-8 text-center max-w-md mx-auto">
                <i class="bi bi-exclamation-triangle text-4xl text-red-500 mb-4 block"></i>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Erro ao carregar loja</h2>
                <p class="text-gray-600">${t.message}</p>
                <button onclick="window.navigateTo('establishments-section')" class="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700">Voltar à Rede</button>
            </div>
        `}}function vd(e){return[{key:"agenda-section",label:"Agenda Diária",icon:"bi-calendar"},{key:"comandas-section",label:"Comandas e PDV",icon:"bi-receipt"},{key:"financial-section",label:"Financeiro Completo",icon:"bi-cash-coin"},{key:"reports-section",label:"Relatórios Gerenciais",icon:"bi-graph-up"}].map(a=>`
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
    `).join("")}const wt=document.getElementById("content");async function Qe(e){const t=document.getElementById("blockagesList");if(t){t.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,s=document.getElementById("filterEndDate")?.value,o=await la(g.establishmentId,a||new Date().toISOString().split("T")[0],s||new Date().toISOString().split("T")[0],e),r=document.getElementById("filterReason")?.value.toLowerCase(),i=r?o.filter(d=>d.reason&&d.reason.toLowerCase().includes(r)):o,n=i.reduce((d,l)=>{const c=l.reason||"Sem motivo";return d[c]||(d[c]=[]),d[c].push(l),d},{});if(t.innerHTML="",i.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(n).forEach(([d,l])=>{const c=document.createElement("div");c.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let p=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${h(d)} (${l.length})</h4>`;if(l.length>1){const m=JSON.stringify(l.map(y=>y.id));p+=`<button data-action="batch-delete-blockage" data-ids='${m}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}p+="</div>",c.innerHTML=p,l.forEach(m=>{const y=new Date(m.startTime),w=new Date(m.endTime),f=y.toLocaleDateString("pt-BR"),S=w.toLocaleDateString("pt-BR"),L=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${f===S?`${f} | ${y.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${w.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${f} às ${y.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${S} às ${w.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${m.id}">Apagar</button>
                    </div>`;c.innerHTML+=L}),t.appendChild(c)})}catch(a){t.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function wd(e){e.preventDefault();const t=e.target,a=t.querySelector("#blockageProfId").value,s=t.querySelector("#blockageDate").value,o=t.querySelector("#blockageEndDate").value||s,r=t.querySelector("#blockageStartTime").value,i=t.querySelector("#blockageEndTime").value,n={establishmentId:g.establishmentId,professionalId:a,startTime:new Date(`${s}T${r}:00`).toISOString(),endTime:new Date(`${o}T${i}:00`).toISOString(),reason:t.querySelector("#blockageReason").value};try{await da(n),t.reset(),b("Sucesso","Bloqueio adicionado com sucesso!","success"),Qe(a)}catch(d){b("Erro",`Não foi possível criar o bloqueio: ${d.message}`,"error")}}async function kd(e){e.preventDefault();const t=e.target,a=Array.from(t.querySelectorAll('input[name="batch-professionals"]:checked')).map(c=>c.value);if(a.length===0)return b("Atenção","Selecione pelo menos um profissional.","error");const s=t.querySelector("#batchBlockageDate").value,o=t.querySelector("#batchBlockageEndDate").value||s,r=t.querySelector("#batchBlockageStartTime").value,i=t.querySelector("#batchBlockageEndTime").value,n=t.querySelector("#batchBlockageReason").value,d=t.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="Aguarde...";const l=a.map(c=>{const u={establishmentId:g.establishmentId,professionalId:c,startTime:new Date(`${s}T${r}:00`).toISOString(),endTime:new Date(`${o}T${i}:00`).toISOString(),reason:n};return da(u)});try{await Promise.all(l),b("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),t.reset(),t.querySelectorAll('input[name="batch-professionals"]:checked').forEach(u=>u.checked=!1);const c=document.getElementById("blockageProfId").value;c&&Qe(c)}catch(c){b("Erro",`Ocorreu um erro: ${c.message}`,"error")}finally{d.disabled=!1,d.textContent="Adicionar Bloqueio em Lote"}}function $d(e){wt.addEventListener("submit",t=>{t.target.id==="blockageForm"&&wd(t),t.target.id==="batchBlockageForm"&&kd(t)}),wt.addEventListener("input",t=>{t.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&Qe(e)}),wt.addEventListener("click",async t=>{const a=t.target.closest("button[data-action]");if(!a)return;const s=a.dataset.action;if(s==="back-to-professionals")Z("profissionais-section");else if(s==="delete-blockage"){if(await Y("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await ns(a.dataset.id),b("Sucesso","Bloqueio removido.","success"),Qe(e)}catch(r){b("Erro",`Não foi possível remover o bloqueio: ${r.message}`,"error")}}else if(s==="batch-delete-blockage"){const o=JSON.parse(a.dataset.ids);if(await Y("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${o.length} bloqueios de uma vez?`))try{await $o(o),b("Sucesso",`${o.length} bloqueios removidos.`,"success"),Qe(e)}catch(i){b("Erro",`Não foi possível apagar os bloqueios: ${i.message}`,"error")}}})}async function Ed(e){const{professionalId:t,professionalName:a}=e;if(!t||!a){wt.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const s=h(a);wt.innerHTML=`
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
        </section>`,$d(t),await Qe(t);const o=document.getElementById("batchProfSelectionContainer");try{const r=await ke(g.establishmentId);o.innerHTML=r.map(i=>`
            <div class="flex items-center">
                <input id="prof-batch-${i.id}" value="${i.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${i.id}" class="ml-2 text-sm text-gray-700">${h(i.name)}</label>
            </div>`).join("")}catch{o.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Id=e=>D(`/api/users/${e}`),Sd=e=>D("/api/users",{method:"POST",body:JSON.stringify(e)}),Ld=(e,t)=>D(`/api/users/${e}`,{method:"PUT",body:JSON.stringify(t)}),Cd=e=>D(`/api/users/${e}`,{method:"DELETE"}),Dd=(e,t)=>D(`/api/users/${e}/password`,{method:"PUT",body:JSON.stringify({password:t})}),Td=(e,t)=>D(`/api/users/${e}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),ct=document.getElementById("content"),Pd={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios Gerais","sales-report-section":"Relatório de Vendas (Caixa)","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores","profissionais-section":"Profissionais","ausencias-section":"Ausências e Bloqueios","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},Bd={view:"Visualizar",create:"Criar",edit:"Editar"};let Rt=null,Ft=null,Xe=null;const Ad={group_admin:"Administrador do Grupo",company_admin:"Gestor de Matriz",branch_manager:"Gestor de Filial",professional:"Profissional Padrão"};function Md(e){const t=document.getElementById("usersListContainer");if(!t)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(e.length===0){const s=a?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";t.innerHTML=`<p class="col-span-full text-center text-gray-500">${s}</p>`;return}e.sort((s,o)=>(s.status==="active"?-1:1)-(o.status==="active"?-1:1)),t.innerHTML=e.map(s=>{const o=JSON.stringify(s).replace(/'/g,"&apos;"),r=s.status==="active",i=g.professionals.find(p=>p.id===s.professionalId),n=i?i.name:"N/A",d=i?i.name.charAt(0):s.name.charAt(0),l=i?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(d)}`,c=Ad[s.role]||"Profissional",u=s.role==="group_admin"?"bg-purple-100 text-purple-800":s.role==="company_admin"?"bg-blue-100 text-blue-800":s.role==="branch_manager"?"bg-orange-100 text-orange-800":"bg-gray-100 text-gray-800";return`
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
    `}).join("")}function Ga(){const t=document.getElementById("showInactiveUsersToggle")?.checked?g.users:g.users.filter(a=>a.status==="active");Md(t)}function qd(e={}){return Object.entries(Pd).map(([t,a])=>{const s=t==="agenda-section"||t==="comandas-section",o=e[t]?.view_all_prof===!0,r=Object.entries(Bd).map(([n,d])=>`
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
    `}).join("")}function Hs(e){if(!Xe||g.userRole==="professional")return"";const t=e?.accessibleEstablishments?.map(r=>r.id)||[],a=e?.accessibleCompanies?.map(r=>r.id)||[];if((e?.role||"professional")==="group_admin")return'<div class="p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 text-sm font-bold">Acesso Total (Global) liberado.</div>';let o='<div class="space-y-3 max-h-48 overflow-y-auto custom-scrollbar p-2 bg-gray-50 rounded border">';return Xe.companies.forEach(r=>{const i=a.includes(r.id),n=Xe.branches.filter(d=>d.companyId===r.id);o+=`
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
        `}),o+="</div>",o}async function Os(e=null){document.getElementById("user-list-view").classList.add("hidden");const t=document.getElementById("user-form-view");t.classList.remove("hidden");let a=g.professionals;if(!a||a.length===0)try{a=await ke(g.currentViewContext.id),g.professionals=a}catch{console.warn("Profissionais não carregados")}if(["group_admin","company_admin"].includes(g.userRole)&&!Xe)try{const l=await fetch("/api/establishments/hierarchy",{headers:{Authorization:`Bearer ${await g.getAuthToken?.()||""}`}});l.ok&&(Xe=await l.json())}catch(l){console.error("Falha ao buscar hierarquia",l),Xe={companies:[],branches:[]}}const s=l=>a?.find(c=>c.id===l),o=e?.professionalId;s(o);const r=e!==null;t.querySelector("#userFormTitle").textContent=r?`Editar: ${e.name}`:"Novo Usuário";const i=t.querySelector("#userForm");i.innerHTML=`
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

            ${["group_admin","company_admin"].includes(g.userRole)?`
            <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100 space-y-3">
                 <h3 class="font-bold text-sm text-indigo-800 border-b border-indigo-200 pb-1">Nível de Acesso (Enterprise)</h3>
                 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="text-xs font-bold text-indigo-700 block mb-1">Perfil do Usuário</label>
                        <select id="userRole" class="w-full p-2 border border-indigo-300 rounded text-sm bg-white font-semibold">
                            ${g.userRole==="group_admin"?`<option value="group_admin" ${e?.role==="group_admin"?"selected":""}>Administrador Global (Acesso a tudo)</option>`:""}
                            <option value="company_admin" ${e?.role==="company_admin"?"selected":""}>Gestor de Empresa/Matriz</option>
                            <option value="branch_manager" ${e?.role==="branch_manager"?"selected":""}>Gestor de Filial (Loja)</option>
                            <option value="professional" ${e?.role==="professional"?"selected":""}>Profissional Padrão (Barbeiro)</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-xs font-bold text-indigo-700 block mb-1">Locais Permitidos</label>
                        <div id="hierarchySelectorContainer">
                            ${Hs(e)}
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
                    ${qd(e?.permissions)}
                </div>
            </div>

            <div class="flex gap-3 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-2 bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300">Cancelar</button>
                <button type="submit" class="flex-1 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">Salvar Usuário</button>
            </div>
        </div>
    `;const n=i.querySelector("#userRole"),d=i.querySelector("#hierarchySelectorContainer");if(n&&d){n.addEventListener("change",c=>{const u={...e,role:c.target.value};d.innerHTML=Hs(u),l()});const l=()=>{d.querySelectorAll(".company-checkbox").forEach(c=>{c.addEventListener("change",u=>{u.target.closest(".company-block").querySelectorAll(".branch-checkbox").forEach(y=>y.checked=u.target.checked)})})};l()}if(i.addEventListener("submit",async l=>{l.preventDefault();const c={};i.querySelectorAll("input[data-module]").forEach(f=>{const S=f.dataset.module,T=f.dataset.permission;c[S]||(c[S]={}),c[S][T]=f.checked});const u=i.querySelector("#userProfessionalId").value||null,p=i.querySelector("#userRole")?.value||"professional",m=[],y=[];if(p!=="group_admin"&&i.querySelector(".company-checkbox")&&(i.querySelectorAll(".company-checkbox:checked").forEach(f=>{m.push({id:f.value,name:f.dataset.name})}),i.querySelectorAll(".branch-checkbox:checked").forEach(f=>{y.push({id:f.value,name:f.dataset.name,companyId:f.dataset.companyId})}),y.length===0))return b("Atenção","Você deve selecionar pelo menos uma filial para este usuário.","error");const w={name:i.querySelector("#userName").value,permissions:c,professionalId:u,role:p,accessibleCompanies:m,accessibleEstablishments:y};try{if(r){const f=i.querySelector("#userEmail").value;e?.email!==f&&(w.email=f),await Ld(e.id,w),b("Usuário atualizado com sucesso!","success")}else w.email=i.querySelector("#userEmail").value,w.password=i.querySelector("#userPassword").value,await Sd(w),b("Usuário criado com sucesso!","success");ta()}catch(f){b(`Erro: ${f.message}`,"error")}}),r){const l=i.querySelector('[data-action="show-password-form"]'),c=i.querySelector("#password-form");l&&c&&(l.addEventListener("click",()=>{l.classList.add("hidden"),c.classList.remove("hidden")}),c.querySelector('[data-action="cancel-password-change"]').addEventListener("click",()=>{l.classList.remove("hidden"),c.classList.add("hidden"),c.querySelector("#userNewPassword").value=""}),c.querySelector('[data-action="save-password"]').addEventListener("click",async u=>{const p=u.target,m=c.querySelector("#userNewPassword").value;if(!m||m.length<6)return b("Aviso","Senha deve ter no mínimo 6 caracteres.","error");if(await Y("Alterar Senha","Tem certeza?"))try{p.disabled=!0,p.textContent="...",await Dd(e.id,m),b("Sucesso","Senha alterada.","success"),l.classList.remove("hidden"),c.classList.add("hidden")}catch(y){b("Erro",y.message,"error")}finally{p.disabled=!1,p.textContent="Salvar Senha"}}))}}async function jd(){const e=document.getElementById("usersListContainer");e.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[t,a]=await Promise.all([Id(g.currentViewContext.id),ke(g.currentViewContext.id)]);g.users=t,g.professionals=a,Ga()}catch{b("Erro ao carregar usuários.","error"),e.innerHTML='<p class="col-span-full text-center text-red-500">Falha ao carregar.</p>'}}async function ta(){ct.innerHTML=`
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
    `,Rt&&ct.removeEventListener("click",Rt),Ft&&ct.removeEventListener("change",Ft),Rt=async e=>{const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"new-user":Os();break;case"edit-user":const s=JSON.parse(t.dataset.user.replace(/&apos;/g,"'"));Os(s);break;case"back-to-list":ta();break;case"delete-user":{if(e.stopPropagation(),await Y("Excluir Usuário","Tem certeza? Ação irreversível."))try{await Cd(t.dataset.userId),b("Usuário excluído!","success"),ta()}catch(o){b(`Erro: ${o.message}`,"error")}break}}},Ft=async e=>{const t=e.target.closest('input[data-action="toggle-user-status"]');if(e.target.id==="showInactiveUsersToggle")Ga();else if(t){e.stopPropagation();const a=t.dataset.userId,s=t.checked?"active":"inactive";try{await Td(a,s);const o=g.users.findIndex(r=>r.id===a);o>-1&&(g.users[o].status=s,Ga())}catch(o){b(`Erro: ${o.message}`,"error"),t.checked=!t.checked}}},ct.addEventListener("click",Rt),ct.addEventListener("change",Ft),await jd()}const Nd=document.getElementById("content");let zs={},Qa=null;function Rd(){Object.values(zs).forEach(e=>e?.destroy()),zs={}}function Fd(e,t){if(!window.jspdf){b("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a({orientation:"landscape",unit:"px",format:"a4"}),o=document.getElementById("salesReportSummaryCards");if(s.setFontSize(18),s.text(e,s.internal.pageSize.getWidth()/2,40,{align:"center"}),o){const i=[["Receita Total",o.querySelector("#summary-revenue").textContent],["Vendas Totais",o.querySelector("#summary-transactions").textContent],["Ticket Médio",o.querySelector("#summary-avg-ticket").textContent]];s.autoTable({startY:60,head:[["Métrica","Valor"]],body:i,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const r=s.lastAutoTable?s.lastAutoTable.finalY+20:60;s.text("Detalhes das Vendas",20,r),s.autoTable({html:`#${t}`,startY:r+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),s.save(`${e.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function Vs(e){const t=document.getElementById("genericModal"),a=h(e.client),s=h(e.items),o=h(e.responsavelCaixa||"N/A"),r=(e.payments||[]).map(i=>`
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
    `,t.style.display="flex"}function Hd(e){const{summary:t,transactions:a}=e;document.getElementById("summary-revenue").textContent=`R$ ${t.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=t.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${t.averageTicket.toFixed(2)}`;const s=document.getElementById("paymentSummaryTableBody"),o=Object.entries(t.paymentMethodTotals).sort(([,n],[,d])=>d-n);s.innerHTML=o.map(([n,d])=>`
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
    `}).join(""),r.querySelectorAll("tr").forEach(n=>{n.addEventListener("dblclick",()=>{const d=n.dataset.transactionIndex,l=Qa.transactions[d];l&&Vs(l)})}),i.innerHTML=a.map((n,d)=>{const l=h(n.client),c=h(n.items),u=h(n.type);return`
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
    `}).join(""),i.querySelectorAll("div[data-transaction-index]").forEach(n=>{n.addEventListener("click",()=>{const d=n.dataset.transactionIndex,l=Qa.transactions[d];l&&Vs(l)})})}async function _s(){const e=document.getElementById("main-reports-view"),t=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!e||!t||!a)return;const s=t.value,o=a.value;if(!s||!o)return b("Atenção","Por favor, selecione as datas de início e fim.","error");e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const r=document.getElementById("cashierSessionFilter").value,i=await Yt({establishmentId:g.establishmentId,startDate:s,endDate:o,cashierSessionId:r});Qa=i,e.innerHTML=`
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
        `,Hd(i)}catch(r){b("Erro",`Não foi possível carregar o relatório: ${r.message}`,"error"),e.innerHTML=`<p class="p-8 text-center text-red-500">${h(r.message)}</p>`}}async function Od(){Rd();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];Nd.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",_s),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const s=document.getElementById("reportStartDate").value,o=document.getElementById("reportEndDate").value,r=`Relatorio_Vendas_${s}_a_${o}`;Fd(r,"transactionsTable")});try{const s=await ln(g.establishmentId),o=document.getElementById("cashierSessionFilter");s&&s.length>0&&s.forEach(r=>{const i=new Date(r.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),n=h(r.closedByName||"N/A");o.innerHTML+=`<option value="${r.id}">${n} - ${i}</option>`})}catch{b("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await _s()}const zd=document.getElementById("content");let $={payables:[],receivables:[],natures:[],costCenters:[],establishments:[],suppliers:[],clients:[],professionals:[],currentTab:"receivables",statusFilter:"all",startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date(new Date().getFullYear(),new Date().getMonth()+1,0).toISOString().split("T")[0],filterNaturezaId:"all",filterCostCenterId:"all",filterEstablishmentIds:new Set,searchQuery:"",isAdvancedFilterOpen:!1,selectedIds:new Set,isSelectionMode:!1,sortCol:"dueDate",sortAsc:!0},Ht=null,Ot=null;function vs(e){const t=new Map,a=[];return e&&(e.forEach(s=>t.set(s.id,{...s,children:[]})),t.forEach(s=>{s.parentId&&t.has(s.parentId)?t.get(s.parentId).children.push(s):a.push(s)})),a}function lr(e){if(!e)return{day:"--",month:"---",full:"--/--/----"};const[t,a,s]=e.split("-"),o=new Date(t,a-1,s),r=String(o.getDate()).padStart(2,"0"),i=o.toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return{day:r,month:i,full:o.toLocaleDateString("pt-BR")}}function ve(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function st(e,t){if(t==="paid")return!1;const a=new Date;a.setHours(0,0,0,0);const[s,o,r]=e.split("-");return new Date(s,o-1,r)<a}function Vd(e,t,a){if(!e)return;if(!t||t.length===0){e.innerHTML=`
            <div class="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <i class="bi bi-inbox text-2xl text-gray-300"></i>
                <p class="text-gray-500 text-sm mt-2 font-medium">Nenhum item criado.</p>
            </div>`;return}const s=(o,r=0)=>{const i=r*16,n=r===0,d=n?"bi-folder-fill text-indigo-500":"bi-file-earmark-text text-gray-400",l=n?"bg-white shadow-sm border border-gray-200":"bg-gray-50 border border-gray-100/50",c=n?"text-sm font-bold text-gray-800":"text-xs font-semibold text-gray-600",u=r>0?'<div class="absolute left-0 top-1/2 w-3 border-t-2 border-gray-200" style="margin-left: -12px;"></div>':"",p=r>0?"border-left: 2px solid #e5e7eb;":"";return`
            <div class="relative flex justify-between items-center ${l} p-2 rounded-lg mb-1.5 hover:border-indigo-300 transition-all group" style="margin-left: ${i}px; ${p}">
                ${u}
                <span class="${c} flex items-center gap-2">
                    <i class="bi ${d} text-base"></i>
                    ${o.name}
                </span>
                <button type="button" data-action="delete-${a}" data-id="${o.id}" class="text-gray-400 hover:text-red-600 text-xs w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-transparent hover:border-red-100" title="Excluir">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
            ${o.children.map(m=>s(m,r+1)).join("")}
        `};e.innerHTML=t.map(o=>s(o)).join("")}async function Xa(e){const t=document.getElementById("genericModal"),a=e==="nature",s=a?"Plano de Naturezas":"Centros de Custo",o=a?ua:gs,r=a?gn:mn,i=a?"natures":"costCenters";t.innerHTML=`
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
        </div>`,t.style.display="flex";const n=t.querySelector("#hierarchyList"),d=t.querySelector("#itemParent"),l=u=>{const p=vs(u);Vd(n,p,e);const m=d.value;d.innerHTML='<option value="">-- Nível Principal --</option>';const y=(w,f=0)=>{const S="  ".repeat(f)+(f>0?"↳ ":"");d.innerHTML+=`<option value="${w.id}">${S}${w.name}</option>`,w.children.forEach(T=>y(T,f+1))};p.forEach(w=>y(w)),d.value=m};try{const u=await o(g.establishmentId);$[i]=u,l(u)}catch(u){console.error(u)}const c=t.querySelector("#hierarchyForm");c.addEventListener("submit",async u=>{u.preventDefault();const p=t.querySelector("#itemName").value,m=d.value;try{await r({name:p,parentId:m||null,establishmentId:g.establishmentId});const y=await o(g.establishmentId);$[i]=y,l(y),c.reset(),await je(),b("Sucesso","Item adicionado à estrutura.","success")}catch(y){b("Erro",y.message,"error")}})}async function _d(){try{const t=(await xe()).matrizes||[];$.establishments=[],t.forEach(a=>{$.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>$.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),$.filterEstablishmentIds.size===0&&$.filterEstablishmentIds.add(g.establishmentId)}catch(e){console.warn("Erro ao buscar lojas",e)}dr(),cr(),await je()}function dr(){const e=$.establishments.map(t=>`
        <label class="inline-flex items-center gap-2 px-3 py-1.5 bg-white border ${$.filterEstablishmentIds.has(t.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-gray-200 text-gray-600"} rounded-lg cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" value="${t.id}" ${$.filterEstablishmentIds.has(t.id)?"checked":""}>
            <span class="text-xs font-bold whitespace-nowrap">${t.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${t.name}</span>
        </label>
    `).join("");zd.innerHTML=`
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
                    <button id="tab-receivables" class="flex-1 md:w-32 py-1.5 text-xs font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${$.currentTab==="receivables"?"bg-white text-emerald-700 shadow":"text-gray-600 hover:text-gray-800"}">
                        A Receber
                    </button>
                    <button id="tab-payables" class="flex-1 md:w-32 py-1.5 text-xs font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${$.currentTab==="payables"?"bg-white text-red-700 shadow":"text-gray-600 hover:text-gray-800"}">
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
                    <button data-status="all" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${$.statusFilter==="all"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Todos</button>
                    <button data-status="pending" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${$.statusFilter==="pending"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Abertos / Prov.</button>
                    <button data-status="paid" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${$.statusFilter==="paid"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Baixados</button>
                    <button data-status="overdue" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${$.statusFilter==="overdue"?"bg-red-50 text-red-700 border-red-200":"bg-white text-gray-600 hover:bg-gray-50"}">Atrasados</button>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                    <div class="relative flex-shrink-0 w-full md:w-64">
                        <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input type="text" id="searchInput" value="${$.searchQuery}" placeholder="Pesquisar..." class="w-full pl-8 p-1.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                    <button id="toggle-filter-btn" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5 text-xs flex-shrink-0 ${$.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                        <i class="bi bi-funnel"></i> Filtros
                    </button>
                </div>
            </div>

            <div id="filter-panel" class="${$.isAdvancedFilterOpen?"block":"hidden"} mb-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                    
                    ${$.establishments.length>1?`
                    <div class="md:col-span-4 mb-1">
                        <label class="block text-[9px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest">Filtrar por Unidades (Multi-Seleção)</label>
                        <div class="flex flex-wrap gap-2" id="establishment-filters-container">
                            ${e}
                        </div>
                    </div>
                    `:""}
                    
                    <div>
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Data Inicial</label>
                        <input type="date" id="filterStartDate" value="${$.startDate}" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Data Final</label>
                        <input type="date" id="filterEndDate" value="${$.endDate}" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none">
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

            <button id="fab-add" class="md:hidden fixed bottom-20 right-4 w-12 h-12 ${$.currentTab==="receivables"?"bg-emerald-600":"bg-red-600"} text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40">
                <i class="bi bi-plus-lg text-xl"></i>
            </button>

        </section>
    `,document.querySelector('.date-preset-btn[data-preset="month"]').classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),document.querySelector('.date-preset-btn[data-preset="month"]').classList.remove("bg-white","text-gray-600","border-gray-200"),ur()}function Ud(){const e=$.currentTab==="receivables",t=e?$.receivables:$.payables;let a=t;if($.statusFilter!=="all"&&(a=t.filter(n=>{const d=st(n.dueDate,n.status);return $.statusFilter==="overdue"?d:$.statusFilter==="pending"?n.status==="pending"&&!d:n.status===$.statusFilter})),$.searchQuery&&(a=a.filter(n=>n.description&&n.description.toLowerCase().includes($.searchQuery)||n.entity&&n.entity.toLowerCase().includes($.searchQuery)||n.notes&&n.notes.toLowerCase().includes($.searchQuery))),a.sort((n,d)=>new Date(n.dueDate)-new Date(d.dueDate)),a.length===0){b("Aviso","Não há dados para exportar com os filtros atuais.","info");return}const s=new Map($.natures.map(n=>[n.id,n.name])),o=new Map($.costCenters.map(n=>[n.id,n.name])),r=new Map($.establishments.map(n=>[n.id,n])),i=a.map(n=>{const d=n.status==="paid",l=st(n.dueDate,n.status);let c=d?"Baixado":l?"Atrasado":"A Vencer / Pendente";const u=n.naturezaId?s.get(n.naturezaId)||"Não Categorizado":"Geral",p=n.centroDeCustoId?o.get(n.centroDeCustoId)||"Não Categorizado":"Geral",m=r.get(n.establishmentId),y=m?m.name:"Atual",w=n.saleId||n.appointmentId||n.origin==="comanda"?"Comanda / PDV":n.origin==="commission"?"Comissões":"Manual";return{"Data de Vencimento":new Date(n.dueDate).toLocaleDateString("pt-BR"),"Data de Pagamento":n.paymentDate?new Date(n.paymentDate).toLocaleDateString("pt-BR"):"-",Descrição:n.description||"","Favorecido / Pagador":n.entity||"",Unidade:y,Natureza:u,"Centro de Custo":p,Origem:w,"Documento / NFS":n.documentNumber||"",Status:c,"Valor (R$)":n.amount}});try{if(typeof XLSX>"u"){b("Erro","A biblioteca de exportação (XLSX) não foi carregada no sistema.","error");return}const n=XLSX.utils.json_to_sheet(i),d=XLSX.utils.book_new();XLSX.utils.book_append_sheet(d,n,"Financeiro");const c=`Fluxo_${e?"Receitas":"Despesas"}_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(d,c)}catch(n){console.error("Erro ao exportar:",n),b("Erro","Não foi possível exportar para Excel.","error")}}function cr(){const e=document.getElementById("select-all-toggle");e&&e.addEventListener("change",o=>{const r=o.target.checked,i=document.querySelectorAll(".item-checkbox");$.selectedIds.clear(),i.forEach(n=>{n.checked=r,r&&$.selectedIds.add(n.dataset.id)}),We()}),document.getElementById("cancel-selection-btn").addEventListener("click",()=>{$.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(o=>o.checked=!1),We()}),document.getElementById("batch-delete-btn").addEventListener("click",async()=>{const o=$.selectedIds.size;if(o===0)return;if(await Y("Excluir Lançamentos",`Deseja realmente apagar ${o} registros financeiros?`))try{const i=$.currentTab==="payables"?"payables":"receivables";await No(i,Array.from($.selectedIds)),b("Sucesso",`${o} itens excluídos.`,"success"),$.selectedIds.clear(),We(),je()}catch{b("Erro","Falha ao excluir itens.","error")}}),document.querySelectorAll(".est-filter-checkbox").forEach(o=>{o.addEventListener("change",r=>{const i=r.target.closest("label");r.target.checked?($.filterEstablishmentIds.add(r.target.value),i.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.remove("border-gray-200","text-gray-600")):($.filterEstablishmentIds.delete(r.target.value),i.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.add("border-gray-200","text-gray-600"))})}),document.querySelectorAll(".sort-header").forEach(o=>{o.addEventListener("click",r=>{const i=r.currentTarget.dataset.sort;$.sortCol===i?$.sortAsc=!$.sortAsc:($.sortCol=i,$.sortAsc=!0),kt()})}),document.getElementById("toggle-filter-btn").addEventListener("click",()=>{const o=document.getElementById("filter-panel"),r=document.getElementById("toggle-filter-btn");$.isAdvancedFilterOpen=!$.isAdvancedFilterOpen,$.isAdvancedFilterOpen?(o.classList.remove("hidden"),r.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.classList.remove("bg-white","text-gray-600","border-gray-200")):(o.classList.add("hidden"),r.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),r.classList.add("bg-white","text-gray-600","border-gray-200"))}),document.getElementById("settings-btn").addEventListener("click",Yd);const t=document.getElementById("export-excel-btn");t&&t.addEventListener("click",Ud),document.querySelectorAll('[data-action="new-financial"]').forEach(o=>{o.addEventListener("click",r=>{Ea(r.target.closest("button").dataset.type)})}),document.getElementById("fab-add").addEventListener("click",()=>{const o=$.currentTab==="payables"?"payable":"receivable";Ea(o)});const a=document.getElementById("tab-receivables"),s=document.getElementById("tab-payables");a.addEventListener("click",()=>Us("receivables")),s.addEventListener("click",()=>Us("payables")),document.querySelectorAll(".status-filter-btn").forEach(o=>{o.addEventListener("click",r=>{document.querySelectorAll(".status-filter-btn").forEach(i=>{i.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200","bg-red-50","text-red-700","border-red-200"),i.classList.add("bg-white","text-gray-600")}),r.target.dataset.status==="overdue"?r.target.classList.add("bg-red-50","text-red-700","border-red-200"):r.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.target.classList.remove("bg-white","text-gray-600"),$.statusFilter=r.target.dataset.status,kt(),pr()})}),document.querySelectorAll(".date-preset-btn").forEach(o=>{o.addEventListener("click",r=>{document.querySelectorAll(".date-preset-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),r.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.target.classList.remove("bg-white","text-gray-600","border-gray-200");const i=r.target.dataset.preset,n=new Date;let d,l;i==="month"?(d=new Date(n.getFullYear(),n.getMonth(),1),l=new Date(n.getFullYear(),n.getMonth()+1,0)):i==="last_month"?(d=new Date(n.getFullYear(),n.getMonth()-1,1),l=new Date(n.getFullYear(),n.getMonth(),0)):i==="year"&&(d=new Date(n.getFullYear(),0,1),l=new Date(n.getFullYear(),11,31)),document.getElementById("filterStartDate").value=d.toISOString().split("T")[0],document.getElementById("filterEndDate").value=l.toISOString().split("T")[0],document.getElementById("apply-filter-btn").click()})}),document.getElementById("searchInput").addEventListener("input",o=>{$.searchQuery=o.target.value.toLowerCase(),kt()}),document.getElementById("clear-filters-btn").addEventListener("click",()=>{const o=new Date;document.getElementById("filterStartDate").value=new Date(o.getFullYear(),o.getMonth(),1).toISOString().split("T")[0],document.getElementById("filterEndDate").value=new Date(o.getFullYear(),o.getMonth()+1,0).toISOString().split("T")[0],document.getElementById("filterNaturezaId").value="all",document.getElementById("filterCostCenterId").value="all",$.filterEstablishmentIds.clear(),$.filterEstablishmentIds.add(g.establishmentId),dr(),cr()}),document.getElementById("apply-filter-btn").addEventListener("click",()=>{$.startDate=document.getElementById("filterStartDate").value,$.endDate=document.getElementById("filterEndDate").value,$.filterNaturezaId=document.getElementById("filterNaturezaId").value,$.filterCostCenterId=document.getElementById("filterCostCenterId").value,$.filterEstablishmentIds.size===0&&$.filterEstablishmentIds.add(g.establishmentId),document.getElementById("toggle-filter-btn").click(),je()}),Ht&&document.body.removeEventListener("click",Ht),Ht=o=>{const r=o.target;if(r.classList.contains("item-checkbox")||r.classList.contains("modal-item-checkbox")){const d=r.value||r.dataset.id;r.checked?$.selectedIds.add(d):$.selectedIds.delete(d),We(),o.stopPropagation();return}const i=r.closest("button[data-action]");if(i){const{action:d,type:l,id:c}=i.dataset;if(o.stopPropagation(),d==="delete"){const u=i.closest(".financial-row").dataset.item.replace(/&apos;/g,"'");Gd(l,JSON.parse(u));return}if(d==="mark-as-paid"){Jd(l,c);return}if(d==="manage-natures"){Xa("nature");return}if(d==="manage-cost-centers"){Xa("cost-center");return}}const n=r.closest(".financial-row");if(n&&document.getElementById("list-container").contains(n)&&!r.closest("button")&&!r.closest(".item-checkbox")){const{type:d}=n.dataset,l=JSON.parse(n.dataset.item.replace(/&apos;/g,"'"));Ea(d,l)}},document.body.addEventListener("click",Ht),Ot&&document.getElementById("genericModal").removeEventListener("click",Ot),Ot=o=>{if(o.target.closest('[data-action="close-modal"]')){document.getElementById("genericModal").style.display="none";return}const i=o.target.closest('button[data-action^="delete-"]');if(i){const n=i.dataset.action.split("-")[1];Xd(n,i.dataset.id)}},document.getElementById("genericModal").addEventListener("click",Ot)}function We(){const e=document.getElementById("batch-action-bar"),t=document.getElementById("selected-count"),a=document.getElementById("fab-add"),s=$.selectedIds.size;t.textContent=s,s>0?(e.classList.remove("hidden"),e.classList.add("flex"),a&&a.classList.add("hidden")):(e.classList.add("hidden"),e.classList.remove("flex"),a&&a.classList.remove("hidden"))}function Us(e){$.currentTab=e,$.selectedIds.clear(),We(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1);const t=document.getElementById("tab-receivables"),a=document.getElementById("tab-payables"),s=document.getElementById("fab-add");e==="receivables"?(t.classList.add("bg-white","text-emerald-700","shadow"),t.classList.remove("text-gray-600"),a.classList.remove("bg-white","text-red-700","shadow"),a.classList.add("text-gray-600"),s&&(s.className="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40")):(a.classList.add("bg-white","text-red-700","shadow"),a.classList.remove("text-gray-600"),t.classList.remove("bg-white","text-emerald-700","shadow"),t.classList.add("text-gray-600"),s&&(s.className="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40")),kt()}async function je(){const e=document.getElementById("list-container");e.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-xs">A processar transações...</p></div>';try{if($.natures.length===0){const[r,i,n,d,l]=await Promise.all([ua(g.establishmentId),gs(g.establishmentId),Lt(g.establishmentId).catch(()=>[]),it(g.establishmentId,"",1e3).catch(()=>[]),ke(g.establishmentId).catch(()=>[])]);$.natures=r||[],$.costCenters=i||[],$.suppliers=n||[],$.clients=d||[],$.professionals=l||[],ur()}const t=Array.from($.filterEstablishmentIds).join(","),a={startDate:$.startDate,endDate:$.endDate,establishmentId:t};$.filterNaturezaId!=="all"&&(a.natureId=$.filterNaturezaId),$.filterCostCenterId!=="all"&&(a.costCenterId=$.filterCostCenterId);const[s,o]=await Promise.all([Ho(a),zo(a)]);$.payables=s.entries||[],$.receivables=o.entries||[],pr(),kt()}catch(t){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-xs font-medium">Erro ao carregar dados: ${t.message}</p>
            </div>`}}function ur(){const e=s=>{let o='<option value="all">-- Todas as opções --</option>';const r=vs(s),i=(n,d=0)=>{const l="  ".repeat(d)+(d>0?"↳ ":"");o+=`<option value="${n.id}">${l}${n.name}</option>`,n.children.forEach(c=>i(c,d+1))};return r.forEach(n=>i(n)),o},t=document.getElementById("filterNaturezaId"),a=document.getElementById("filterCostCenterId");t&&(t.innerHTML=e($.natures)),a&&(a.innerHTML=e($.costCenters))}function pr(){const e=document.getElementById("summary-section");if(!e)return;const t=$.currentTab==="receivables";let s=t?$.receivables:$.payables;$.searchQuery&&(s=s.filter(c=>c.description&&c.description.toLowerCase().includes($.searchQuery)||c.entity&&c.entity.toLowerCase().includes($.searchQuery)||c.notes&&c.notes.toLowerCase().includes($.searchQuery)));const o=s.reduce((c,u)=>c+u.amount,0),r=s.filter(c=>c.status==="paid").reduce((c,u)=>c+u.amount,0),i=s.filter(c=>c.status==="pending"&&!st(c.dueDate,c.status)).reduce((c,u)=>c+u.amount,0),n=s.filter(c=>st(c.dueDate,c.status)).reduce((c,u)=>c+u.amount,0),d=t?"emerald":"red",l=t?"Receitas":"Despesas";e.innerHTML=`
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total do Período</span>
            <span class="text-xl font-black text-gray-800 mt-0.5">${ve(o)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">A Vencer / Prov.</span>
            <span class="text-xl font-bold text-blue-600 mt-0.5">${ve(i)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${l} Baixadas</span>
            <span class="text-xl font-bold text-${d}-600 mt-0.5">${ve(r)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Atrasadas</span>
            <span class="text-xl font-bold ${n>0?"text-red-600":"text-gray-400"} mt-0.5">${ve(n)}</span>
        </div>
    `}function Wd(){document.querySelectorAll(".sort-header").forEach(e=>{const t=e.querySelector("i");if(!t)return;e.dataset.sort===$.sortCol?(e.classList.add("text-indigo-700"),e.classList.remove("text-gray-500"),t.className=$.sortAsc?"bi bi-arrow-up ml-1 text-indigo-600":"bi bi-arrow-down ml-1 text-indigo-600"):(e.classList.remove("text-indigo-700"),e.classList.add("text-gray-500"),t.className="bi bi-arrow-down-up ml-1 opacity-30 text-[10px]")})}function kt(){const e=document.getElementById("list-container");if(!e)return;const t=$.currentTab==="receivables",a=t?$.receivables:$.payables;let s=a;if($.statusFilter!=="all"&&(s=a.filter(l=>{const c=st(l.dueDate,l.status);return $.statusFilter==="overdue"?c:$.statusFilter==="pending"?l.status==="pending"&&!c:l.status===$.statusFilter})),$.searchQuery&&(s=s.filter(l=>l.description&&l.description.toLowerCase().includes($.searchQuery)||l.entity&&l.entity.toLowerCase().includes($.searchQuery)||l.notes&&l.notes.toLowerCase().includes($.searchQuery))),s.sort((l,c)=>{let u=l[$.sortCol],p=c[$.sortCol];return $.sortCol==="dueDate"?(u=new Date(u).getTime(),p=new Date(p).getTime()):($.sortCol==="description"||$.sortCol==="status")&&(u=u?u.toLowerCase():"",p=p?p.toLowerCase():""),u<p?$.sortAsc?-1:1:u>p?$.sortAsc?1:-1:0}),Wd(),s.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-inbox text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum registo encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente limpar os filtros ou faça um novo lançamento.</p>
            </div>
        `;return}const o=new Map($.natures.map(l=>[l.id,l.name])),r=new Map($.costCenters.map(l=>[l.id,l.name])),i=new Map($.establishments.map(l=>[l.id,l])),n=t?"receivable":"payable",d=t?"text-emerald-600":"text-red-600";e.innerHTML=s.map(l=>{const c=lr(l.dueDate),u=l.status==="paid",p=st(l.dueDate,l.status);let m="";u?m='<span class="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-check2-circle mr-0.5"></i> Baixado</span>':p?m='<span class="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-exclamation-circle mr-0.5"></i> Atrasado</span>':m='<span class="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-clock-history mr-0.5"></i> A Vencer</span>';const y=l.naturezaId?o.get(l.naturezaId)||"Sem Natureza":"Não Categorizado",w=l.centroDeCustoId?r.get(l.centroDeCustoId)||"Sem Centro":"Geral",S=l.saleId||l.appointmentId||l.origin==="comanda"?'<span class="text-[8px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100"><i class="bi bi-receipt mr-1"></i>Comanda</span>':l.origin==="commission"?'<span class="text-[8px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100"><i class="bi bi-cash-stack mr-1"></i>Comissões</span>':'<span class="text-[8px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200"><i class="bi bi-keyboard mr-1"></i>Manual</span>',T=l.documentNumber?`<span class="text-[8px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded ml-2" title="NFS / Documento">NFS: ${l.documentNumber}</span>`:"",L=i.get(l.establishmentId);let k="";if(L){const P=L.type==="Matriz"?"bi-building":"bi-shop";k=`<span class="text-[8px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-bold border border-slate-200 flex items-center whitespace-nowrap w-max" title="Unidade: ${L.name}"><i class="bi ${P} mr-1 opacity-60"></i> ${L.name}</span>`}else k='<span class="text-[8px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-bold border border-gray-200 flex items-center whitespace-nowrap w-max"><i class="bi bi-geo-alt mr-1 opacity-60"></i> Atual</span>';const x=JSON.stringify(l).replace(/'/g,"&apos;"),I=$.selectedIds.has(l.id),M=!!l.recurrenceId?'<i class="bi bi-arrow-repeat text-indigo-400 ml-1 text-[10px]" title="Lançamento Recorrente"></i>':"",B=l.entity?`<span class="text-[9px] text-gray-400 font-medium truncate block mt-0.5"><i class="bi bi-person mr-1 opacity-40"></i>${l.entity}</span>`:"";return`
        <div class="financial-row border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-1.5 md:p-2 mb-1 ${I?"bg-indigo-50/40":""}"
             data-type="${n}"
             data-item='${x}'>
            
            <div class="absolute left-0 top-0 bottom-0 w-1 ${u?"bg-gray-200":t?"bg-emerald-400":"bg-red-400"}"></div>

            <div class="absolute right-2 top-2 md:relative md:right-auto md:top-auto md:col-span-1 md:flex md:justify-center z-10">
                <input type="checkbox" value="${l.id}" class="item-checkbox w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${I?"checked":""}>
            </div>

            <div class="flex items-center gap-2 md:col-span-1 pl-2 md:pl-0">
                <div class="flex flex-col items-center justify-center bg-white border border-gray-200 rounded w-9 h-9 flex-shrink-0 shadow-sm">
                    <span class="text-xs font-black text-gray-800 leading-none">${c.day}</span>
                    <span class="text-[7px] font-bold text-gray-400 uppercase leading-none mt-0.5">${c.month}</span>
                </div>
                <div class="md:hidden flex-1 pr-6">
                    <div class="flex items-center">
                        <p class="font-bold text-xs text-gray-800 leading-tight ${u?"line-through text-gray-400":""}">${l.description}</p>
                        ${T}
                    </div>
                    ${B}
                </div>
            </div>

            <div class="md:col-span-3 hidden md:flex flex-col justify-center min-w-0">
                <div class="flex items-center">
                    <p class="font-bold text-xs text-gray-800 truncate ${u?"line-through text-gray-400":""}" title="${l.description}">${l.description}</p>
                    ${T}
                </div>
                ${B}
                <div class="flex items-center gap-1.5 mt-0.5">
                    ${k}
                    ${M}
                </div>
            </div>

            <div class="md:col-span-2 hidden md:flex flex-col justify-center min-w-0">
                <p class="text-[9px] text-gray-600 font-bold truncate" title="Natureza: ${y}"><i class="bi bi-tag opacity-50 mr-1"></i> ${y}</p>
                <p class="text-[9px] text-gray-400 truncate mt-0.5" title="Centro: ${w}"><i class="bi bi-diagram-3 opacity-50 mr-1"></i> ${w}</p>
            </div>

            <div class="md:col-span-1 hidden md:flex items-center">
                ${S}
            </div>

            <div class="md:hidden flex flex-wrap items-center gap-1.5 mt-1 ml-11">
                ${k}
                <span class="text-[8px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 font-bold border border-gray-200 flex items-center">
                    <i class="bi bi-tag mr-1 opacity-50"></i> ${y}
                </span>
                ${S}
            </div>

            <div class="md:col-span-1 md:text-center flex justify-start md:justify-center mt-1.5 md:mt-0 ml-11 md:ml-0">
                ${m}
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:justify-end mt-1.5 md:mt-0 ml-11 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-gray-400 uppercase tracking-wide">Valor:</span>
                <p class="font-black text-sm ${u?"text-gray-400":d}">${ve(l.amount)}</p>
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
        `}).join("")}async function Jd(e,t){const a=new Date().toISOString().split("T")[0];try{await(e==="payable"?yn(t,a):kn(t,a)),b("Baixa Realizada","O lançamento foi registado como pago.","success"),await je()}catch(s){b("Erro",s.message,"error")}}async function Gd(e,t){if(!!!t.recurrenceId){await Y("Excluir Lançamento","Tem certeza? Essa ação apagará o registo do seu fluxo de caixa.")&&await gr(e,[t.id]);return}Qd(e,t)}function Qd(e,t){const a=document.getElementById("genericModal"),o=(e==="payable"?$.payables:$.receivables).filter(l=>l.recurrenceId===t.recurrenceId).sort((l,c)=>new Date(l.dueDate)-new Date(c.dueDate));a.innerHTML=`
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
                ${o.map(l=>{const c=l.id===t.id,u=l.status==="paid",p=lr(l.dueDate);return`
                    <label class="flex items-center gap-4 p-3 bg-white rounded-xl border ${c?"border-red-400 ring-1 ring-red-100 shadow-sm bg-red-50/30":"border-gray-200 hover:bg-gray-50"} cursor-pointer transition-all">
                        <input type="checkbox" class="modal-item-checkbox w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" value="${l.id}" ${c?"checked":""}>
                        
                        <div class="flex-shrink-0 w-11 h-11 bg-white rounded-lg flex flex-col items-center justify-center border border-gray-200 shadow-sm">
                            <span class="text-sm font-black text-gray-800 leading-none">${p.day}</span>
                            <span class="text-[8px] font-bold text-gray-500 uppercase leading-none mt-1">${p.month}</span>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-bold text-gray-800 truncate">${l.description}</p>
                            <p class="text-xs font-medium text-gray-500 mt-0.5">${ve(l.amount)} ${u?'<span class="text-emerald-600 font-bold ml-1">(Baixado)</span>':""}</p>
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
    `,a.style.display="flex";const r=a.querySelector("#modal-select-all"),i=a.querySelectorAll(".modal-item-checkbox"),n=a.querySelector("#confirm-batch-delete");r.addEventListener("change",l=>{i.forEach(c=>c.checked=l.target.checked),d()}),i.forEach(l=>l.addEventListener("change",d));function d(){const l=Array.from(i).filter(c=>c.checked).length;n.innerHTML=l>0?`<i class="bi bi-trash3"></i> Excluir ${l} Parcela(s)`:"Selecione para excluir",n.disabled=l===0,l===0?n.classList.add("opacity-50","cursor-not-allowed","bg-gray-400"):n.classList.remove("opacity-50","cursor-not-allowed","bg-gray-400")}n.addEventListener("click",async()=>{const l=Array.from(i).filter(u=>u.checked).map(u=>u.value);if(l.length===0)return;a.style.display="none",await Y("Confirmar Ação",`Tem certeza que deseja apagar estas ${l.length} parcelas permanentemente?`)&&await gr(e,l)}),d()}async function gr(e,t){try{t.length===1?e==="payable"?await hn(t[0]):await wn(t[0]):await No(e==="payable"?"payables":"receivables",t),b("Sucesso",`${t.length} registo(s) limpo(s) do sistema.`,"success"),$.selectedIds.clear(),We(),await je()}catch(a){b("Erro",a.message,"error")}}async function Xd(e,t){const s=e==="nature"?bn:fn;if(await Y("Apagar Categoria","Tem certeza? Apagar um item pai também apagará as suas subcategorias."))try{await s(t),Xa(e==="nature"?"nature":"cost-center")}catch(r){b("Erro",r.message,"error")}}function Yd(){const e=document.getElementById("genericModal");e.innerHTML=`
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
    `,e.style.display="flex"}function Ea(e,t=null){const a=document.getElementById("genericModal"),s=e==="payable",o=s?"red":"emerald",r=t?"Editar Lançamento":"Novo Lançamento",i=$.establishments.map(I=>{const C=t?t.establishmentId===I.id:I.id===g.establishmentId;return`<option value="${I.id}" ${C?"selected":""}>${I.type==="Matriz"?"🏢":"📍"} ${I.name}</option>`}).join(""),n=(I,C)=>{let M='<option value="">-- Selecione --</option>';const B=vs(I),P=(F,V=0)=>{const _="  ".repeat(V)+(V>0?"↳ ":""),A=F.id===C?"selected":"";M+=`<option value="${F.id}" ${A}>${_}${F.name}</option>`,F.children.forEach(U=>P(U,V+1))};return B.forEach(F=>P(F)),M},l=[{value:"dinheiro",label:"Dinheiro"},{value:"pix",label:"PIX"},{value:"cartao_credito",label:"Cartão de Crédito"},{value:"cartao_debito",label:"Cartão de Débito"},{value:"transferencia",label:"Transferência Bancária"},{value:"boleto",label:"Boleto"},{value:"outros",label:"Outros"}].map(I=>`<option value="${I.value}" ${t?.paymentMethod===I.value?"selected":""}>${I.label}</option>`).join(""),c=`
        <datalist id="entity-suggestions">
            ${s?$.suppliers.map(I=>`<option value="${h(I.name)}">Fornecedor</option>`).join("")+$.professionals.map(I=>`<option value="${h(I.name)}">Profissional</option>`).join(""):$.clients.map(I=>`<option value="${h(I.name)} ${I.phone?"- "+h(I.phone):""}">Cliente</option>`).join("")}
        </datalist>
    `;a.innerHTML=`
        <div class="modal-content max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden m-4 flex flex-col max-h-[90vh]">
            ${c}
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
                                <input type="text" name="entity" list="entity-suggestions" 
                                    class="w-full pl-8 pr-3 p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none text-xs text-gray-800 transition-shadow" 
                                    value="${t?.entity||""}" placeholder="Nome ou Selecione na lista..." autocomplete="off">
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
                                ${n($.natures,t?.naturezaId)}
                            </select>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Centro de Custo</label>
                            <select name="centroDeCustoId" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none text-xs font-medium text-gray-700 transition-shadow">
                                ${n($.costCenters,t?.centroDeCustoId)}
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
        </div>`,a.style.display="flex";const u=a.querySelector("#financial-form");let p="single",m=2;const y=u.querySelector('[name="amount"]'),w=u.querySelector("#recurrence-options"),f=u.querySelector("#recurrence-summary"),S=u.querySelector("#installments-input"),T=u.querySelector("#status-toggle"),L=u.querySelector("#payment-date-wrapper"),k=u.querySelector('[name="paymentDate"]'),x=()=>{if(p==="single")return;const I=parseFloat(y.value)||0;if(m=parseInt(S.value)||2,I===0){f.innerHTML='<span class="text-[10px] text-indigo-400 font-medium">Digite o valor total...</span>';return}if(p==="installment"){const C=I/m;f.innerHTML=`
                <div>
                    <span class="block text-[9px] text-indigo-400 uppercase tracking-widest font-bold mb-0.5">Simulação do Parcelamento</span>
                    <span class="font-bold text-sm text-indigo-700 block leading-tight">${m}x de ${ve(C)}</span>
                    <span class="text-[10px] text-indigo-500 font-medium">Total: ${ve(I)}</span>
                </div>
            `}else if(p==="repeat"){const C=I*m;f.innerHTML=`
                <div>
                    <span class="block text-[9px] text-indigo-400 uppercase tracking-widest font-bold mb-0.5">Geração Recorrente Fixa</span>
                    <span class="font-bold text-sm text-indigo-700 block leading-tight">${m}x de ${ve(I)}</span>
                    <span class="text-[10px] text-indigo-500 font-medium">Lançamento Total: ${ve(C)}</span>
                </div>
            `}};u.addEventListener("click",I=>{const C=I.target.closest(".mode-btn");if(C&&!t)if(I.preventDefault(),u.querySelectorAll(".mode-btn").forEach(P=>{P.classList.remove("bg-gray-900","text-white","shadow-sm"),P.classList.add("text-gray-500","hover:bg-gray-100")}),C.classList.add("bg-gray-900","text-white","shadow-sm"),C.classList.remove("text-gray-500","hover:bg-gray-100"),p=C.dataset.mode,p==="single")w.style.display="none";else{w.style.display="block";const P=w.querySelector("#recurrence-label");P&&(P.textContent=p==="installment"?"Número de Parcelas":"Repetir por quantos meses?"),x()}if(I.target.closest("#btn-minus")&&S){I.preventDefault();let P=parseInt(S.value)||2;P>2&&(S.value=P-1,x())}if(I.target.closest("#btn-plus")&&S){I.preventDefault();let P=parseInt(S.value)||2;P<60&&(S.value=P+1,x())}}),y.addEventListener("input",x),S&&S.addEventListener("input",x),T.addEventListener("change",()=>{T.checked?(L.classList.remove("hidden"),k.required=!0):(L.classList.add("hidden"),k.required=!1)}),u.addEventListener("submit",async I=>{I.preventDefault();const C=u.querySelector('button[type="submit"]'),M=C.innerHTML;C.disabled=!0,C.innerHTML='<div class="loader-small border-white"></div> A gravar...';const B=new FormData(u),P=T.checked,F=parseFloat(B.get("amount"));let V=F,_=1;!t&&p!=="single"&&(_=parseInt(B.get("installments")),p==="repeat"&&(V=F*_));const A={establishmentId:B.get("establishmentId"),description:B.get("description"),amount:V,dueDate:B.get("dueDate"),naturezaId:B.get("naturezaId")||null,centroDeCustoId:B.get("centroDeCustoId")||null,entity:B.get("entity")||null,paymentMethod:B.get("paymentMethod")||null,documentNumber:B.get("documentNumber")||null,notes:B.get("notes"),status:P?"paid":"pending",paymentDate:P?B.get("paymentDate"):null,installments:_};_>1&&!t&&(A.recurrenceId=self.crypto.randomUUID());try{t?(await(s?xn(t.id,A):vn(t.id,A)),b("Sucesso","Atualizado com sucesso!","success")):(await(s?Fo(A):Oo(A)),b("Sucesso","Lançamento criado!","success")),document.getElementById("genericModal").style.display="none",je()}catch(U){b("Erro",U.message||"Erro ao salvar","error"),C.disabled=!1,C.innerHTML=M}})}const Kd=e=>D("/api/commissions/calculate",{method:"POST",body:JSON.stringify(e)}),Zd=e=>D("/api/commissions/save",{method:"POST",body:JSON.stringify(e)}),ec=(e,t)=>{const a=new URLSearchParams({startDate:e,endDate:t}).toString();return D(`/api/commissions/stats?${a}`)},tc=(e={})=>{Object.keys(e).forEach(s=>(e[s]===void 0||e[s]===null||e[s]==="")&&delete e[s]);const t=new URLSearchParams(e).toString(),a=`/api/commissions/history${t?"?"+t:""}`;return D(a)},br=e=>D(`/api/commissions/report/${e}`,{method:"DELETE"}),Ya=new Date,ac=new Date(Ya.getFullYear(),Ya.getMonth(),1);let N={professionals:[],reports:[],calculationResult:null,periodString:"",establishments:[],filterEstablishmentIds:new Set,establishmentConfig:null,selectedIds:new Set,startDate:ac.toISOString().split("T")[0],endDate:Ya.toISOString().split("T")[0],professionalId:"all",searchQuery:"",stats:{revenue:0,commissions:0,margin:0,netPaid:0}},zt=null;const sc=document.getElementById("content");function $t(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e||0)}function oc(e){return e?new Date(e).toLocaleDateString("pt-BR"):"--/--/----"}function aa(e){if(!e)return"PR";const t=e.trim().split(" ");return t.length>=2?(t[0][0]+t[t.length-1][0]).toUpperCase():e.substring(0,2).toUpperCase()}async function rc(){try{const[e,t,a]=await Promise.all([ke(g.establishmentId),xe().catch(()=>({matrizes:[]})),De(g.establishmentId).catch(()=>({}))]);N.professionals=e,N.establishmentConfig=a||{};const s=t.matrizes||[];N.establishments=[],s.forEach(o=>{N.establishments.push({id:o.id,name:o.name,type:"Matriz"}),o.branches&&o.branches.forEach(r=>N.establishments.push({id:r.id,name:r.name,type:"Filial"}))}),N.filterEstablishmentIds.size===0&&N.filterEstablishmentIds.add(g.establishmentId)}catch(e){console.error("Erro na inicialização de comissões",e)}ic(),lc(),await ot()}function ic(){const e=N.professionals.map(a=>`<option value="${a.id}">${a.name}</option>`).join(""),t=N.establishments.map(a=>`
        <label class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border ${N.filterEstablishmentIds.has(a.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-gray-200 text-gray-600"} rounded-lg cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${a.id}" ${N.filterEstablishmentIds.has(a.id)?"checked":""}>
            <span class="text-[10px] font-bold whitespace-nowrap">${a.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${a.name}</span>
        </label>
    `).join("");sc.innerHTML=`
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative">
            
            <div id="batch-action-bar" class="hidden absolute top-4 left-4 right-4 z-30 bg-gray-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down">
                <div class="flex items-center gap-3">
                    <button id="cancel-selection-btn" class="p-1.5 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <span class="font-bold text-sm tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Selecionados</span>
                </div>
                <button id="batch-delete-btn" class="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-sm">
                    <i class="bi bi-trash3"></i> Excluir Recibos
                </button>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full animate-fade-in">
                <div></div> <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                    <button id="export-excel-btn" class="py-1.5 px-3 bg-white border border-gray-300 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition shadow-sm flex items-center gap-2 text-xs" title="Exportar para Excel">
                        <i class="bi bi-file-earmark-excel-fill text-emerald-600"></i> Excel
                    </button>
                    <button data-action="new-calculation" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-calculator"></i> Nova Apuração
                    </button>
                </div>
            </div>

            ${N.establishments.length>1?`
            <div class="mb-3 animate-fade-in">
                <div class="flex flex-wrap gap-2" id="establishment-filters-container">
                    ${t}
                </div>
            </div>
            `:""}

            <div id="kpi-section" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 animate-fade-in">
                <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden group">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Faturamento Base</span>
                    <span id="kpi-revenue" class="text-xl font-black text-gray-800 mt-0.5 z-10">R$ 0,00</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden group">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Comissões (Bruto)</span>
                    <span id="kpi-commissions" class="text-xl font-bold text-amber-600 mt-0.5 z-10">R$ 0,00</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden group">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Retenção (Lucro)</span>
                    <span id="kpi-margin" class="text-xl font-bold text-blue-600 mt-0.5 z-10">0%</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden group">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Líquido Pago</span>
                    <span id="kpi-net" class="text-xl font-bold text-emerald-600 mt-0.5 z-10">R$ 0,00</span>
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-2 w-full animate-fade-in bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                <div class="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
                    <div class="flex items-center gap-1.5 w-full md:w-auto bg-gray-50 border border-gray-200 rounded-lg px-2 shadow-sm">
                        <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mr-1 hidden md:block">De:</span>
                        <input type="date" id="filter-start" value="${N.startDate}" class="py-1.5 bg-transparent text-xs font-semibold text-gray-700 outline-none focus:text-indigo-600">
                        <span class="text-gray-400 text-xs font-bold">até</span>
                        <input type="date" id="filter-end" value="${N.endDate}" class="py-1.5 bg-transparent text-xs font-semibold text-gray-700 outline-none focus:text-indigo-600">
                    </div>
                    
                    <select id="filter-prof" class="py-1.5 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 outline-none focus:border-indigo-400 w-full md:w-48 shadow-sm">
                        <option value="all">Todos os Profissionais</option>
                        ${e}
                    </select>

                    <button data-action="apply-filters" class="w-full md:w-auto py-1.5 px-4 bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold rounded-lg hover:bg-indigo-100 transition shadow-sm text-xs">
                        Filtrar
                    </button>
                </div>

                <div class="relative w-full md:w-64 mt-2 md:mt-0 flex-shrink-0">
                    <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                    <input type="text" id="search-input" placeholder="Buscar relatório..." class="w-full pl-8 p-1.5 bg-gray-50 border border-gray-200 shadow-sm rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500 font-semibold text-gray-700 transition-all">
                </div>
            </div>

            <div class="flex-1 flex flex-col min-h-0 w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
                <div class="hidden md:grid grid-cols-12 gap-2 px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest items-center bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                    <div class="col-span-3 flex items-center gap-2">
                        <input type="checkbox" id="select-all-toggle" class="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                        Profissional
                    </div>
                    <div class="col-span-2">Período de Ref.</div>
                    <div class="col-span-2 text-right">Bruto (R$)</div>
                    <div class="col-span-2 text-right">Ajustes (R$)</div>
                    <div class="col-span-2 text-right text-indigo-600">Líquido Pago</div>
                    <div class="col-span-1 text-center">Ações</div>
                </div>

                <div id="list-container" class="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-2">
                    <div class="flex justify-center py-20"><div class="loader"></div></div>
                </div>
            </div>
        </section>
    `}async function ot(){const e=document.getElementById("list-container");e.innerHTML='<div class="flex justify-center py-20"><div class="loader"></div></div>';const t=Array.from(N.filterEstablishmentIds).join(",");try{const[a,s]=await Promise.all([tc({startDate:N.startDate,endDate:N.endDate,professionalId:N.professionalId,establishmentId:t}),ec(N.startDate,N.endDate,t)]);N.reports=a||[];const o=N.reports.reduce((r,i)=>r+(i.summary.finalValue||i.summary.totalCommission),0);N.stats={revenue:s.totalRevenue||0,commissions:s.totalCommissionsPaid||0,margin:s.totalRevenue>0?((s.totalRevenue-s.totalCommissionsPaid)/s.totalRevenue*100).toFixed(1):0,netPaid:o},N.selectedIds.clear(),Et(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),nc(),mr()}catch(a){console.error(a),e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-xs font-medium">Erro ao carregar dados.</p>
            </div>`}}function nc(){document.getElementById("kpi-revenue").textContent=$t(N.stats.revenue),document.getElementById("kpi-commissions").textContent=$t(N.stats.commissions),document.getElementById("kpi-margin").textContent=`${N.stats.margin}%`,document.getElementById("kpi-net").textContent=$t(N.stats.netPaid)}function mr(){const e=document.getElementById("list-container");let t=N.reports;if(N.searchQuery){const a=N.searchQuery.toLowerCase();t=t.filter(s=>s.professionalName.toLowerCase().includes(a)||s.period.toLowerCase().includes(a))}if(t.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 text-center">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-receipt text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-700 mb-1">Nenhum pagamento encontrado</h3>
                <p class="text-[10px] text-gray-400 max-w-xs">Não há relatórios gerados para este período ou profissional.</p>
            </div>
        `;return}e.innerHTML=t.map(a=>{const s=oc(a.createdAt),o=a.summary.totalCommission,r=a.summary.extraDebit||0,i=a.summary.extraCredit||0,n=a.summary.finalValue||o,d=N.selectedIds.has(a.id);let l="";return r>0&&i>0?l=`<span class="text-red-500">-R$${r.toFixed(2)}</span> / <span class="text-emerald-500">+R$${i.toFixed(2)}</span>`:r>0?l=`<span class="text-red-500">-R$ ${r.toFixed(2)}</span>`:i>0?l=`<span class="text-emerald-500">+R$ ${i.toFixed(2)}</span>`:l='<span class="text-gray-300">--</span>',`
        <div class="border-b border-gray-100 hover:bg-gray-50 transition-colors relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-2.5 md:px-3 md:py-2 mb-2 md:mb-0 bg-white md:bg-transparent rounded-xl md:rounded-none shadow-sm md:shadow-none border md:border-b ${d?"bg-indigo-50/40":""}">
            
            <div class="absolute right-2 top-2 md:relative md:right-auto md:top-auto md:col-span-3 md:flex md:items-center md:gap-2 z-10">
                <input type="checkbox" value="${a.id}" class="item-checkbox w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${d?"checked":""}>
                <div class="hidden md:flex items-center gap-2 pr-2">
                    <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm border border-indigo-200">
                        ${aa(a.professionalName)}
                    </div>
                    <div class="min-w-0">
                        <p class="font-bold text-xs text-gray-800 truncate" title="${a.professionalName}">${a.professionalName}</p>
                        <p class="text-[9px] text-gray-400 font-medium truncate mt-0.5">Gerado: ${s}</p>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-2 md:hidden mb-2 pr-8">
                <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm border border-indigo-200">
                    ${aa(a.professionalName)}
                </div>
                <div class="min-w-0">
                    <p class="font-bold text-xs text-gray-800 truncate">${a.professionalName}</p>
                    <p class="text-[9px] text-gray-400 font-medium truncate mt-0.5">Gerado: ${s}</p>
                </div>
            </div>

            <div class="md:col-span-2 mb-1 md:mb-0 flex items-center ml-10 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-gray-400 uppercase tracking-widest w-16">Período:</span>
                <span class="text-[9px] font-bold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 uppercase tracking-wider">
                    <i class="bi bi-calendar3 opacity-50 mr-1"></i> ${a.period}
                </span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-1 md:mb-0 ml-10 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-gray-400 uppercase tracking-widest">Bruto:</span>
                <span class="text-xs font-bold text-gray-700">${$t(o)}</span>
            </div>
            
            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-1 md:mb-0 ml-10 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-gray-400 uppercase tracking-widest">Ajustes:</span>
                <span class="text-[10px] font-bold">${l}</span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block pt-1 md:pt-0 border-t md:border-0 border-gray-100 ml-10 md:ml-0 mt-1 md:mt-0">
                <span class="md:hidden text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Líquido Pago:</span>
                <span class="text-xs font-black text-emerald-600">${$t(n)}</span>
            </div>

            <div class="md:col-span-1 flex justify-end gap-1 mt-2 md:mt-0 ml-10 md:ml-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button data-action="view-report-details" data-id="${a.id}" class="w-6 h-6 rounded flex items-center justify-center text-gray-500 hover:text-indigo-600 bg-white hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm" title="Ver Detalhes">
                    <i class="bi bi-eye text-[10px]"></i>
                </button>
                <button data-action="print-receipt" data-id="${a.id}" class="w-6 h-6 rounded flex items-center justify-center text-gray-500 hover:text-indigo-600 bg-white hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm" title="Imprimir Recibo">
                    <i class="bi bi-printer text-[10px]"></i>
                </button>
                <button data-action="delete-report" data-id="${a.id}" class="w-6 h-6 rounded flex items-center justify-center text-gray-500 hover:text-red-600 bg-white hover:bg-red-50 transition-colors border border-gray-200 shadow-sm" title="Excluir e Estornar">
                    <i class="bi bi-trash3 text-[10px]"></i>
                </button>
            </div>
        </div>
        `}).join("")}function lc(){zt&&document.body.removeEventListener("click",zt),zt=o=>{const r=o.target;if(r.classList.contains("item-checkbox")){const n=r.value;r.checked?N.selectedIds.add(n):N.selectedIds.delete(n),Et(),o.stopPropagation();return}const i=r.closest("button[data-action]");if(i){const n=i.dataset.action,d=i.dataset.id;switch(n){case"apply-filters":N.startDate=document.getElementById("filter-start").value,N.endDate=document.getElementById("filter-end").value,N.professionalId=document.getElementById("filter-prof").value,ot();break;case"new-calculation":dc();break;case"print-receipt":xc(d);break;case"delete-report":yc(d);break;case"view-report-details":mc(d);break;case"toggle-all-profs":const l=document.querySelectorAll(".prof-checkbox"),c=Array.from(l).every(y=>y.checked);l.forEach(y=>y.checked=!c);break;case"calculate-preview":cc();break;case"save-final-reports":bc();break;case"toggle-preview-details":const u=i.dataset.idx,p=document.getElementById(`preview-details-${u}`),m=i.querySelector("i");p&&(p.classList.contains("hidden")?(p.classList.remove("hidden"),m&&m.classList.replace("bi-chevron-down","bi-chevron-up")):(p.classList.add("hidden"),m&&m.classList.replace("bi-chevron-up","bi-chevron-down")));break}}},document.body.addEventListener("click",zt),document.getElementById("search-input").addEventListener("input",o=>{N.searchQuery=o.target.value,mr()}),document.body.addEventListener("input",o=>{(o.target.classList.contains("input-debit")||o.target.classList.contains("input-credit")||o.target.classList.contains("input-notes"))&&pc(o.target.dataset.idx)});const e=document.getElementById("select-all-toggle");e&&e.addEventListener("change",o=>{const r=o.target.checked,i=document.querySelectorAll(".item-checkbox");N.selectedIds.clear(),i.forEach(n=>{n.checked=r,r&&N.selectedIds.add(n.value)}),Et()});const t=document.getElementById("cancel-selection-btn");t&&t.addEventListener("click",()=>{N.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(o=>o.checked=!1),Et()});const a=document.getElementById("batch-delete-btn");a&&a.addEventListener("click",hc),document.querySelectorAll(".est-filter-checkbox").forEach(o=>{o.addEventListener("change",r=>{const i=r.target.closest("label");r.target.checked?(N.filterEstablishmentIds.add(r.target.value),i.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.remove("border-gray-200","text-gray-600")):(N.filterEstablishmentIds.delete(r.target.value),i.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.add("border-gray-200","text-gray-600")),ot()})});const s=document.getElementById("export-excel-btn");s&&s.addEventListener("click",fc)}function Et(){const e=document.getElementById("batch-action-bar"),t=document.getElementById("selected-count"),a=N.selectedIds.size;t&&(t.textContent=a),e&&(a>0?(e.classList.remove("hidden"),e.classList.add("flex")):(e.classList.add("hidden"),e.classList.remove("flex")))}function dc(){const e=new Date().toISOString().split("T")[0],t=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],a=N.professionals.map(o=>`
        <label class="flex items-center p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-indigo-300 transition-all cursor-pointer group">
            <input type="checkbox" value="${o.id}" class="prof-checkbox w-3.5 h-3.5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
            <div class="ml-2 flex items-center gap-2">
                <div class="w-6 h-6 rounded border border-gray-100 bg-gray-50 text-gray-500 flex items-center justify-center text-[9px] font-bold group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">${aa(o.name)}</div>
                <span class="font-semibold text-xs text-gray-800">${o.name}</span>
            </div>
        </label>`).join(""),s=`
        <div id="calc-flow-container" class="flex flex-col h-[70vh] md:h-auto max-h-[85vh] overflow-hidden">
            
            <div id="calc-step-1" class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50">
                <div class="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
                    <h3 class="text-xs font-bold text-gray-800 mb-2 flex items-center gap-2"><i class="bi bi-calendar-range text-indigo-500"></i> Período</h3>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Início</label>
                            <input type="date" id="calc-start-date" value="${t}" class="w-full mt-1 p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold outline-none focus:ring-1 focus:ring-indigo-500">
                        </div>
                        <div>
                            <label class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Fim</label>
                            <input type="date" id="calc-end-date" value="${e}" class="w-full mt-1 p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold outline-none focus:ring-1 focus:ring-indigo-500">
                        </div>
                    </div>
                </div>

                <div class="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
                    <h3 class="text-xs font-bold text-gray-800 mb-2 flex items-center gap-2"><i class="bi bi-tags text-indigo-500"></i> Considerar nas vendas</h3>
                    <div class="grid grid-cols-3 gap-2">
                        <label class="flex items-center justify-center p-2 border border-gray-200 rounded-lg bg-gray-50 cursor-pointer hover:bg-white transition-colors">
                            <input type="checkbox" id="calc-type-services" checked class="w-3.5 h-3.5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                            <span class="ml-1.5 text-[10px] font-bold text-gray-700 uppercase tracking-wider">Serviços</span>
                        </label>
                        <label class="flex items-center justify-center p-2 border border-gray-200 rounded-lg bg-gray-50 cursor-pointer hover:bg-white transition-colors">
                            <input type="checkbox" id="calc-type-products" checked class="w-3.5 h-3.5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                            <span class="ml-1.5 text-[10px] font-bold text-gray-700 uppercase tracking-wider">Produtos</span>
                        </label>
                        <label class="flex items-center justify-center p-2 border border-gray-200 rounded-lg bg-gray-50 cursor-pointer hover:bg-white transition-colors">
                            <input type="checkbox" id="calc-type-packages" class="w-3.5 h-3.5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                            <span class="ml-1.5 text-[10px] font-bold text-gray-700 uppercase tracking-wider">Pacotes</span>
                        </label>
                    </div>
                </div>

                <div class="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-xs font-bold text-gray-800 flex items-center gap-2"><i class="bi bi-people text-indigo-500"></i> Equipe</h3>
                        <button type="button" data-action="toggle-all-profs" class="text-[9px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 hover:bg-indigo-100 transition-colors">Inverter Sel.</button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                        ${a}
                    </div>
                </div>
            </div>

            <div id="calc-step-2" class="hidden flex-1 overflow-y-auto p-3 md:p-4 space-y-3 custom-scrollbar bg-gray-50">
                </div>

            <footer class="p-3 border-t border-gray-200 bg-white flex justify-end gap-2 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <button type="button" data-action="close-modal" class="py-2 px-4 bg-white border border-gray-300 text-gray-700 font-bold text-xs rounded-lg hover:bg-gray-50 transition-colors shadow-sm">Cancelar</button>
                <button type="button" data-action="calculate-preview" id="btn-calc-action" class="py-2 px-5 bg-indigo-600 text-white font-bold text-xs rounded-lg hover:bg-indigo-700 shadow-sm transition-all flex items-center gap-2">
                    <i class="bi bi-calculator"></i> Calcular Vendas
                </button>
            </footer>
        </div>
    `;me({title:"Nova Apuração",contentHTML:s,maxWidth:"max-w-2xl"})}async function cc(){const e=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(l=>l.value);if(e.length===0)return b("Atenção","Selecione pelo menos um profissional.","warning");const t=Array.from(N.filterEstablishmentIds).join(","),a=document.getElementById("calc-start-date"),s=document.getElementById("calc-end-date");if(!a||!s||!a.value||!s.value)return b("Atenção","As datas de início e fim são obrigatórias.","warning");const o={professionalIds:e,startDate:a.value,endDate:s.value,establishmentId:t,calculationTypes:{services:document.getElementById("calc-type-services")?.checked||!1,products:document.getElementById("calc-type-products")?.checked||!1,packages:document.getElementById("calc-type-packages")?.checked||!1}},r=new Date(o.startDate+"T00:00:00").toLocaleDateString("pt-BR"),i=new Date(o.endDate+"T00:00:00").toLocaleDateString("pt-BR");N.periodString=`${r} a ${i}`;const n=document.getElementById("btn-calc-action"),d=n.innerHTML;n.innerHTML='<div class="loader-small border-white mr-1"></div> Processando...',n.disabled=!0;try{const l=await Kd(o);N.calculationResult=l.map(c=>({...c,extraDebit:0,extraCredit:0,finalValue:c.summary.totalCommission,notes:""})),uc()}catch(l){b("Erro na Apuração",l.message,"error"),n.innerHTML=d,n.disabled=!1}}function uc(){const e=N.calculationResult;if(!e||e.length===0||e.every(i=>i.summary.totalCommission===0)){b("Aviso","Nenhuma comissão encontrada para os filtros selecionados.","info");const i=document.getElementById("btn-calc-action");i.innerHTML='<i class="bi bi-calculator"></i> Calcular Vendas',i.disabled=!1;return}const t=document.getElementById("calc-step-1"),a=document.getElementById("calc-step-2"),s=document.getElementById("btn-calc-action");t&&t.classList.add("hidden"),a&&a.classList.remove("hidden"),s&&(s.dataset.action="save-final-reports",s.className="py-2 px-5 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700 shadow-sm transition-all flex items-center gap-2",s.innerHTML='<i class="bi bi-check2-circle text-sm"></i> Confirmar Pagtos.',s.disabled=!1);const o=e.reduce((i,n)=>i+n.finalValue,0),r=e.map((i,n)=>{if(i.summary.totalCommission===0)return"";const d=(i.items||[]).map(c=>`
            <tr class="border-b border-gray-100 last:border-0">
                <td class="py-1.5 truncate max-w-[120px] text-gray-700 font-medium" title="${c.item}">${c.item}</td>
                <td class="py-1.5 text-gray-500">${c.client||"--"}</td>
                <td class="py-1.5 text-right text-gray-600">R$ ${(c.value||0).toFixed(2)}</td>
                <td class="py-1.5 text-center text-gray-600">${c.commissionRate}%</td>
                <td class="py-1.5 text-right font-bold text-emerald-600">R$ ${(c.commissionValue||0).toFixed(2)}</td>
            </tr>
        `).join(""),l=`
            <div id="preview-details-${n}" class="hidden mt-3 pt-3 border-t border-gray-100">
                <h5 class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Itens Processados</h5>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-[10px]">
                        <thead class="text-gray-500 bg-gray-50">
                            <tr>
                                <th class="p-1 font-bold uppercase tracking-wider">Serviço/Produto</th>
                                <th class="p-1 font-bold uppercase tracking-wider">Cliente</th>
                                <th class="p-1 font-bold uppercase tracking-wider text-right">Base</th>
                                <th class="p-1 font-bold uppercase tracking-wider text-center">%</th>
                                <th class="p-1 font-bold uppercase tracking-wider text-right">Comissão</th>
                            </tr>
                        </thead>
                        <tbody>${d||'<tr><td colspan="5" class="py-2 text-center text-gray-400">Nenhum item</td></tr>'}</tbody>
                    </table>
                </div>
            </div>
        `;return`
        <div class="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-2 relative overflow-hidden">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
            
            <div class="flex justify-between items-start mb-3 border-b border-gray-100 pb-2 pl-2">
                <div>
                    <h4 class="font-black text-gray-800 text-xs uppercase tracking-wider">${i.professionalName}</h4>
                    <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">${i.summary.totalItems} itens calculados</p>
                </div>
                <div class="text-right bg-gray-50 px-2 py-1 rounded-lg border border-gray-200 shadow-inner">
                    <p class="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Valor Bruto</p>
                    <p class="font-black text-gray-800 text-xs">R$ ${i.summary.totalCommission.toFixed(2)}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-2 pl-2 mb-2">
                <div>
                    <label class="text-[9px] font-bold text-red-500 uppercase tracking-widest"><i class="bi bi-dash-circle mr-1"></i>Descontos/Vales</label>
                    <div class="relative mt-1">
                        <span class="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-red-400 font-bold text-[10px]">R$</span>
                        <input type="number" step="0.01" data-idx="${n}" class="input-debit w-full pl-7 p-1.5 border border-red-200 rounded-lg bg-white shadow-inner font-black text-xs text-red-600 outline-none focus:ring-1 focus:ring-red-500" placeholder="0.00">
                    </div>
                </div>
                <div>
                    <label class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest"><i class="bi bi-plus-circle mr-1"></i>Bônus Extras</label>
                    <div class="relative mt-1">
                        <span class="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-emerald-400 font-bold text-[10px]">R$</span>
                        <input type="number" step="0.01" data-idx="${n}" class="input-credit w-full pl-7 p-1.5 border border-emerald-200 rounded-lg bg-white shadow-inner font-black text-xs text-emerald-600 outline-none focus:ring-1 focus:ring-emerald-500" placeholder="0.00">
                    </div>
                </div>
            </div>

            <div class="pl-2 mb-3">
                <input type="text" data-idx="${n}" class="input-notes w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500 font-medium text-gray-700" placeholder="Motivo dos ajustes (Opcional)">
            </div>
            
            <div class="flex justify-between items-center bg-indigo-50 border border-indigo-200 p-2.5 rounded-lg pl-3 ml-2 shadow-sm">
                <span class="text-[10px] font-bold text-indigo-700 uppercase tracking-widest">Líquido a Pagar</span>
                <span class="text-base font-black text-indigo-800 final-value-display drop-shadow-sm" data-idx="${n}">R$ ${i.finalValue.toFixed(2)}</span>
            </div>

            <div class="pl-2 mt-2 border-t border-gray-50 pt-2">
                <button type="button" data-action="toggle-preview-details" data-idx="${n}" class="text-[9px] font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-widest flex items-center gap-1 transition-colors">
                    <i class="bi bi-chevron-down"></i> Detalhar Itens
                </button>
                ${l}
            </div>
        </div>
        `}).join("");a&&(a.innerHTML=`
        <div class="bg-indigo-700 p-3 rounded-xl shadow-md text-white mb-3 flex justify-between items-center relative overflow-hidden">
            <div class="absolute right-[-10px] top-[-20px] opacity-10"><i class="bi bi-cash-coin text-6xl"></i></div>
            <div class="bg-indigo-900/30 p-2 px-3 rounded-lg backdrop-blur-sm border border-indigo-400/20 z-10">
                <span class="block text-[9px] font-bold text-indigo-200 uppercase tracking-widest mb-0.5">Soma Total Equipe</span>
                <span id="grand-total-preview" class="text-xl font-black drop-shadow-md">R$ ${o.toFixed(2)}</span>
            </div>
            <div class="text-right z-10">
                <span class="block text-[9px] font-bold text-indigo-200 uppercase tracking-widest mb-1">Período</span>
                <span class="text-[10px] font-bold bg-white/20 px-2 py-1 rounded border border-white/20 shadow-sm">${N.periodString}</span>
            </div>
        </div>
        ${r}
    `)}function pc(e){const t=document.querySelector(`.input-debit[data-idx="${e}"]`),a=document.querySelector(`.input-credit[data-idx="${e}"]`),s=document.querySelector(`.input-notes[data-idx="${e}"]`);let o=parseFloat(t?.value)||0,r=parseFloat(a?.value)||0,i=s?.value||"";if(N.calculationResult&&N.calculationResult[e]){const n=N.calculationResult[e];n.extraDebit=o,n.extraCredit=r,n.notes=i,n.finalValue=n.summary.totalCommission-o+r;const d=document.querySelector(`.final-value-display[data-idx="${e}"]`);d&&(d.innerText=`R$ ${n.finalValue.toFixed(2)}`),gc()}}function gc(){const e=N.calculationResult.reduce((a,s)=>a+s.finalValue,0),t=document.getElementById("grand-total-preview");t&&(t.innerText=`R$ ${e.toFixed(2)}`)}async function bc(){const e=N.calculationResult.filter(o=>o.summary.totalCommission>0),t=e.length;if(t===0)return b("Aviso","Não há valores para pagar.","info");if(!await Y("Confirmar Pagamentos",`Você está prestes a gerar recibos e marcar as vendas de ${t} profissional(is) como PAGAS. Essa ação lançará a despesa correspondente no Financeiro. Confirmar?`))return;const s=document.getElementById("btn-calc-action");s.innerHTML='<div class="loader-small border-white mr-1"></div> Finalizando...',s.disabled=!0;try{const o=e.map(async r=>{const i=(r.items||[]).map(n=>n.originalSaleId).filter(n=>n!=null);await Zd({professionalId:r.professionalId,professionalName:r.professionalName,period:N.periodString,processedSalesIds:i,establishmentId:g.establishmentId,reportData:{...r,summary:{...r.summary,finalValue:r.finalValue,extraDebit:r.extraDebit||0,extraCredit:r.extraCredit||0,notes:r.notes||""}}});try{if(r.finalValue>0){const n=N.establishmentConfig||{},d=n.defaultDespesaNaturezaId||n.financeConfig?.despesaNaturezaId||null,l=n.defaultDespesaCentroCustoId||n.financeConfig?.despesaCentroCustoId||null;await Fo({establishmentId:g.establishmentId,description:`Comissões - ${r.period}`,amount:r.finalValue,dueDate:new Date().toISOString().split("T")[0],naturezaId:d,centroDeCustoId:l,entity:r.professionalName,paymentMethod:"dinheiro",status:"paid",paymentDate:new Date().toISOString().split("T")[0],origin:"commission"})}}catch(n){console.error("Erro ao integrar com financeiro (Despesa):",n)}});await Promise.all(o),b("Sucesso","Pagamentos registrados e integrados ao financeiro!","success"),N.calculationResult=null,document.getElementById("genericModal").style.display="none",await ot()}catch(o){b("Erro ao Salvar",o.message,"error"),s.innerHTML='<i class="bi bi-check2-circle text-sm"></i> Confirmar Pagtos.',s.disabled=!1}}function mc(e){const t=N.reports.find(c=>c.id===e);if(!t)return;const a=t.reportData?.items||t.items||[],s=t.summary,o=s.extraDebit||0,r=s.extraCredit||0,i=s.notes||"",n=a.map(c=>`
        <tr class="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
            <td class="py-2.5 px-3 text-gray-800 font-bold whitespace-normal min-w-[150px]">${c.item}</td>
            <td class="py-2.5 px-3 text-gray-500">${c.client||"--"}</td>
            <td class="py-2.5 px-3 text-right text-gray-600">R$ ${(c.value||0).toFixed(2)}</td>
            <td class="py-2.5 px-3 text-center text-gray-600 font-bold">${c.commissionRate}%</td>
            <td class="py-2.5 px-3 text-right font-black text-emerald-600">R$ ${(c.commissionValue||0).toFixed(2)}</td>
        </tr>
    `).join("");let d="";(o>0||r>0||i)&&(d=`
            <div class="mt-4 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                <h5 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3"><i class="bi bi-sliders mr-1"></i> Ajustes Aplicados</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    ${o>0?`<div class="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm"><span class="text-gray-400 block text-[9px] uppercase tracking-widest font-bold">Descontos/Vales:</span> <span class="font-black text-red-500">-R$ ${o.toFixed(2)}</span></div>`:""}
                    ${r>0?`<div class="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm"><span class="text-gray-400 block text-[9px] uppercase tracking-widest font-bold">Bônus Extras:</span> <span class="font-black text-emerald-500">+R$ ${r.toFixed(2)}</span></div>`:""}
                </div>
                ${i?`<div class="text-xs text-gray-600 bg-white p-3 rounded-lg border border-gray-200 shadow-sm"><strong class="block text-[9px] uppercase tracking-widest text-gray-400 mb-1">Motivo do Ajuste:</strong> ${i}</div>`:""}
            </div>
        `);const l=`
        <div class="max-h-[75vh] overflow-y-auto custom-scrollbar p-1">
            <div class="flex flex-col md:flex-row justify-between md:items-center bg-indigo-50 p-4 rounded-xl border border-indigo-200 mb-4 gap-3 shadow-sm">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg bg-white text-indigo-600 flex items-center justify-center font-bold text-base flex-shrink-0 shadow-sm border border-indigo-100">
                        ${aa(t.professionalName)}
                    </div>
                    <div>
                        <p class="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Profissional</p>
                        <p class="font-black text-indigo-900 text-lg leading-tight uppercase tracking-wider">${t.professionalName}</p>
                    </div>
                </div>
                <div class="md:text-right border-t md:border-t-0 md:border-l border-indigo-200 pt-3 md:pt-0 md:pl-4">
                    <p class="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Período de Vendas</p>
                    <p class="font-bold text-indigo-700 text-xs bg-white px-2 py-1 rounded shadow-sm border border-indigo-100 mt-1 flex items-center gap-1.5"><i class="bi bi-calendar3 opacity-50"></i> ${t.period}</p>
                </div>
            </div>

            <div class="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div class="overflow-x-auto custom-scrollbar">
                    <table class="w-full text-left text-xs whitespace-nowrap">
                        <thead class="bg-gray-50 text-gray-500 border-b border-gray-200">
                            <tr>
                                <th class="p-3 font-bold uppercase tracking-wider text-[9px]">Item / Serviço</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[9px]">Cliente</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[9px] text-right">Base Calc.</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[9px] text-center">%</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[9px] text-right">Comissão</th>
                            </tr>
                        </thead>
                        <tbody>${n||'<tr><td colspan="5" class="text-center py-6 text-gray-400 font-medium">Nenhum item detalhado encontrado neste recibo.</td></tr>'}</tbody>
                    </table>
                </div>
                <div class="bg-gray-50 p-3.5 border-t border-gray-200 flex justify-between items-center shadow-inner">
                    <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Bruto Apurado</span>
                    <span class="font-black text-gray-800 text-base">R$ ${(s.totalCommission||0).toFixed(2)}</span>
                </div>
            </div>
            
            ${d}

            <div class="mt-4 flex justify-between items-center bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm relative overflow-hidden">
                <div class="absolute right-[-10px] top-[-10px] opacity-10"><i class="bi bi-check-circle-fill text-6xl text-emerald-500"></i></div>
                <span class="text-[10px] font-black text-emerald-600 uppercase tracking-widest z-10 flex items-center gap-1.5"><i class="bi bi-cash-stack"></i> Total Líquido Pago</span>
                <span class="text-3xl font-black text-emerald-700 z-10 drop-shadow-sm">R$ ${(s.finalValue||s.totalCommission).toFixed(2)}</span>
            </div>
        </div>
    `;me({title:"Detalhes do Pagamento",contentHTML:l,maxWidth:"max-w-3xl"})}function fc(){if(N.reports.length===0){b("Aviso","Não há dados para exportar com os filtros atuais.","info");return}let e=N.reports;if(N.searchQuery){const a=N.searchQuery.toLowerCase();e=e.filter(s=>s.professionalName.toLowerCase().includes(a)||s.period.toLowerCase().includes(a))}const t=e.map(a=>{const s=a.summary.totalCommission,o=a.summary.extraDebit||0,r=a.summary.extraCredit||0,i=a.summary.finalValue||s;return{"Data da Apuração":new Date(a.createdAt).toLocaleDateString("pt-BR"),Profissional:a.professionalName,"Período Base":a.period,"Itens Calculados":a.summary.totalItems||0,"Valor Bruto (R$)":s,"Bônus (R$)":r,"Descontos (R$)":o,"Líquido Pago (R$)":i,"Observações/Motivo":a.summary.notes||""}});try{if(typeof XLSX>"u"){b("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const a=XLSX.utils.json_to_sheet(t),s=XLSX.utils.book_new();XLSX.utils.book_append_sheet(s,a,"Comissoes");const o=`Relatorio_Comissoes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(s,o)}catch(a){console.error(a),b("Erro","Falha ao exportar Excel.","error")}}function xc(e){const t=N.reports.find(c=>c.id===e);if(!t)return;if(!window.jspdf){b("Erro","A biblioteca de PDF não foi carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a;s.setFillColor(79,70,229),s.rect(0,0,210,40,"F"),s.setTextColor(255,255,255),s.setFontSize(22),s.setFont(void 0,"bold"),s.text("RECIBO DE COMISSÕES",105,20,{align:"center"}),s.setFontSize(10),s.text(`Data de Emissão: ${new Date().toLocaleDateString("pt-BR")}`,105,28,{align:"center"}),s.setTextColor(50,50,50),s.setFontSize(11),s.setFont(void 0,"normal"),s.text("Profissional:",15,55),s.setFont(void 0,"bold"),s.text(t.professionalName,40,55),s.setFont(void 0,"normal"),s.text("Período:",130,55),s.setFont(void 0,"bold"),s.text(t.period,147,55);const o=t.reportData?.items||t.items||[];let r=70;if(o.length>0){const c=o.map(u=>[u.item||"Item",u.client||"--",`R$ ${(u.value||0).toFixed(2)}`,`${u.commissionRate||0}%`,`R$ ${(u.commissionValue||0).toFixed(2)}`]);s.autoTable({startY:r,head:[["Serviço/Produto","Cliente","Valor Base","Taxa","Comissão"]],body:c,theme:"striped",headStyles:{fillColor:[249,250,251],textColor:[75,85,99],fontStyle:"bold"},styles:{fontSize:8},columnStyles:{2:{halign:"right"},3:{halign:"center"},4:{halign:"right",fontStyle:"bold",textColor:[5,150,105]}}}),r=s.lastAutoTable.finalY+15}const i=t.summary,n=i.finalValue||i.totalCommission,d=[["Comissões Brutas (Soma dos Itens)",`R$ ${i.totalCommission.toFixed(2)}`]];i.extraCredit>0&&d.push(["(+) Bônus Extras",`R$ ${i.extraCredit.toFixed(2)}`]),i.extraDebit>0&&d.push(["(-) Descontos / Vales",`R$ ${i.extraDebit.toFixed(2)}`]),s.autoTable({startY:r,head:[["Resumo do Fechamento","Valor"]],body:d,theme:"grid",headStyles:{fillColor:[79,70,229],textColor:[255,255,255]},columnStyles:{1:{halign:"right",fontStyle:"bold"}}});const l=s.lastAutoTable.finalY+15;s.setFillColor(236,253,245),s.rect(120,l-8,75,15,"F"),s.setTextColor(5,150,105),s.setFontSize(14),s.setFont(void 0,"bold"),s.text(`Total Líquido: R$ ${n.toFixed(2)}`,190,l,{align:"right"}),i.notes&&(s.setTextColor(100,100,100),s.setFontSize(9),s.setFont(void 0,"normal"),s.text(`Obs/Motivo: ${i.notes}`,15,l+10)),s.setTextColor(150,150,150),s.setFontSize(9),s.line(20,l+40,90,l+40),s.text("Assinatura da Empresa",55,l+45,{align:"center"}),s.line(120,l+40,190,l+40),s.text("Assinatura do Profissional",155,l+45,{align:"center"}),s.save(`Recibo_Comissoes_${t.professionalName.replace(/\s+/g,"_")}.pdf`)}async function hc(){const e=N.selectedIds.size;if(!(e===0||!await Y("Excluir Recibos",`Deseja excluir e estornar ${e} recibo(s)? As vendas associadas voltarão ao status "A Apurar".`)))try{const a=Array.from(N.selectedIds).map(s=>br(s));await Promise.all(a),b("Sucesso",`${e} recibos excluídos com sucesso.`,"success"),N.selectedIds.clear(),Et(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),await ot()}catch{b("Erro ao Excluir","Ocorreu um erro ao excluir alguns recibos.","error")}}async function yc(e){if(await Y("Excluir Recibo",'ATENÇÃO: Deseja realmente excluir este recibo? As vendas associadas a ele voltarão ao status "A Apurar" e o valor será subtraído dos relatórios. Esta ação não pode ser desfeita.'))try{await br(e),b("Sucesso","Recibo cancelado com sucesso. Vendas estornadas para apuração.","success"),await ot()}catch(a){b("Erro ao Excluir",a.message,"error")}}const Ka=document.getElementById("content");let G={allPackages:[],catalogForModal:{services:[],products:[]},establishments:[],filterEstablishmentIds:new Set,searchQuery:"",statusFilter:"all"},Vt=null,Je=null;function Ne(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e||0)}function vc(){const e=G.allPackages.length,t=G.allPackages.filter(r=>r.status!=="inactive"),a=t.length,s=a>0?t.reduce((r,i)=>r+(i.price||0),0)/a:0;let o=0;return t.forEach(r=>{const i=r.originalPrice||0,n=r.price||0;if(i>0&&i>n){const d=(i-n)/i*100;d>o&&(o=d)}}),{total:e,activeCount:a,avgPrice:s,maxDiscount:o}}async function wc(){try{const t=(await xe().catch(()=>({matrizes:[]}))).matrizes||[];G.establishments=[],t.forEach(a=>{G.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>G.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),G.filterEstablishmentIds.size===0&&G.filterEstablishmentIds.add(g.establishmentId)}catch(e){console.error("Erro ao buscar hierarquia de empresas",e)}kc(),Sc(),await sa()}async function sa(){const e=document.getElementById("packagesListContainer");e&&(e.innerHTML='<div class="col-span-full flex justify-center py-20"><div class="loader"></div></div>');try{const t=Array.from(G.filterEstablishmentIds).map(i=>ps(i).catch(()=>[])),a=await Promise.all(t),s=new Map;a.flat().forEach(i=>{s.has(i.id)||s.set(i.id,i)}),G.allPackages=Array.from(s.values());const[o,r]=await Promise.all([nt(g.establishmentId).catch(()=>[]),lt(g.establishmentId).catch(()=>[])]);G.catalogForModal={services:(o||[]).filter(i=>i.active),products:r||[]},$c(),Za()}catch(t){console.error(t),e&&(e.innerHTML=`
                <div class="col-span-full flex flex-col items-center justify-center py-16 text-slate-500">
                    <i class="bi bi-exclamation-triangle text-4xl text-red-400 mb-3"></i>
                    <p>Erro ao carregar os pacotes. Tente novamente.</p>
                </div>
            `)}}function kc(){const e=G.establishments.map(t=>`
        <label class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border ${G.filterEstablishmentIds.has(t.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-slate-200 text-slate-600"} rounded-lg cursor-pointer hover:bg-slate-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${t.id}" ${G.filterEstablishmentIds.has(t.id)?"checked":""}>
            <span class="text-[10px] font-bold whitespace-nowrap">${t.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${t.name}</span>
        </label>
    `).join("");Ka.innerHTML=`
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

            ${G.establishments.length>1?`
            <div class="mb-4">
                <div class="flex flex-wrap gap-2" id="establishment-filters-container">
                    ${e}
                </div>
            </div>
            `:""}

            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6" id="kpi-container"></div>

            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20"></div>
            
        </section>
    `}function $c(){const e=vc(),t=document.getElementById("kpi-container");t&&(t.innerHTML=`
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
            <span class="text-2xl font-black text-indigo-600 mt-1 z-10">${Ne(e.avgPrice)}</span>
        </div>
    `)}function Za(){const e=document.getElementById("packagesListContainer");if(!e)return;let t=G.allPackages;if(G.statusFilter!=="all"){const s=G.statusFilter==="active";t=t.filter(o=>o.status!=="inactive"===s)}if(G.searchQuery){const s=G.searchQuery.toLowerCase();t=t.filter(o=>o.name.toLowerCase().includes(s)||(o.description||"").toLowerCase().includes(s))}if(t.length===0){e.innerHTML=`
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
        `;return}const a=new Map(G.establishments.map(s=>[s.id,s]));e.innerHTML=t.map(s=>{const o=s.status!=="inactive",r=s.price||0,i=s.originalPrice||0,n=i>0&&i>r?(i-r)/i*100:0,d=h(s.name),l=h(s.description||"Nenhuma descrição detalhada."),c=JSON.stringify(s).replace(/'/g,"&apos;"),u=(s.items||[]).reduce((f,S)=>f+(S.quantity||1),0),p=s.validityDays?`${s.validityDays} dias p/ uso`:"Uso vitalício",m=s.sellEndDate?`Até ${new Date(s.sellEndDate).toLocaleDateString("pt-BR")}`:"Venda contínua",y=s.establishmentIds||(s.establishmentId?[s.establishmentId]:[]);let w="";if(y.length===1){const f=a.get(y[0]);if(f){const S=f.type==="Matriz"?"bi-building":"bi-shop";w=`<span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200 flex items-center w-max" title="${f.name}"><i class="bi ${S} mr-1 opacity-50"></i> ${f.name}</span>`}}else y.length>1&&(w=`<span class="text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 flex items-center w-max cursor-help" title="${y.map(S=>a.get(S)?.name).filter(Boolean).join(", ")}"><i class="bi bi-buildings mr-1 opacity-50"></i> ${y.length} Unidades</span>`);return`
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
                            ${w}
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
                            <span class="text-[10px] font-semibold text-slate-700"><i class="bi bi-clock-history mr-1 opacity-50"></i>${p}</span>
                        </div>
                    </div>

                    <div class="flex justify-between items-end">
                        <div>
                            ${n>0?`<p class="text-[10px] text-slate-400 font-bold line-through mb-0.5">De ${Ne(i)}</p>`:""}
                            <p class="text-2xl font-black text-slate-900 leading-none">${Ne(r)}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-calendar-event mr-1"></i>${m}</p>
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
        `}).join("")}function Ec(){if(G.allPackages.length===0){b("Aviso","Não há pacotes carregados para exportar.","info");return}let e=G.allPackages;if(G.statusFilter!=="all"){const s=G.statusFilter==="active";e=e.filter(o=>o.status!=="inactive"===s)}if(G.searchQuery){const s=G.searchQuery.toLowerCase();e=e.filter(o=>o.name.toLowerCase().includes(s)||(o.description||"").toLowerCase().includes(s))}if(e.length===0){b("Aviso","Nenhum pacote corresponde aos filtros atuais.","info");return}const t=new Map(G.establishments.map(s=>[s.id,s.name])),a=e.map(s=>{const o=s.originalPrice||0,r=s.price||0,i=o>0?(o-r)/o*100:0,n=(s.items||[]).map(c=>`${c.quantity}x ${c.name}`).join(" | ");return{"Unidade(s)":(s.establishmentIds||(s.establishmentId?[s.establishmentId]:[])).map(c=>t.get(c)).filter(Boolean).join(", ")||"Não identificada","Nome do Pacote":s.name,Status:s.status!=="inactive"?"Ativo":"Inativo",Descrição:s.description||"","Itens Incluídos":n,"Valor Original (R$)":o,"Preço de Venda (R$)":r,"Desconto (%)":i.toFixed(1)+"%","Comissão (%)":s.commissionRate||0,"Validade de Uso (Dias)":s.validityDays||"Vitalício","Vendas Início":s.sellStartDate?new Date(s.sellStartDate).toLocaleDateString("pt-BR"):"-","Vendas Fim":s.sellEndDate?new Date(s.sellEndDate).toLocaleDateString("pt-BR"):"-"}});try{if(typeof XLSX>"u"){b("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const s=XLSX.utils.json_to_sheet(a),o=XLSX.utils.book_new();XLSX.utils.book_append_sheet(o,s,"Pacotes");const r=`Relatorio_Pacotes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(o,r)}catch(s){console.error(s),b("Erro","Falha ao exportar Excel.","error")}}function Ws(){const e=document.getElementById("genericModal");e.style.display="none",Je&&e.removeEventListener("click",Je)}async function Js(e=null){const t=document.getElementById("genericModal"),a=!!e,s=e?JSON.parse(JSON.stringify(e.items||[])):[],o=h(e?.name||""),r=h(e?.description||""),i=e?.price||"",n=e?.commissionRate||0,d=e?.validityDays||"",l=e?.sellStartDate?new Date(e.sellStartDate).toISOString().split("T")[0]:"",c=e?.sellEndDate?new Date(e.sellEndDate).toISOString().split("T")[0]:"",u=e?.salesLimit||"",p=e?.establishmentIds||(e?.establishmentId?[e.establishmentId]:[g.establishmentId]),m=G.establishments.map(k=>`
        <label class="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors cursor-pointer group">
            <input type="checkbox" class="modal-est-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4" value="${k.id}" ${p.includes(k.id)?"checked":""}>
            <span class="text-xs font-semibold text-slate-700 truncate group-hover:text-indigo-700" title="${k.name}">${k.type==="Matriz"?"🏢":"📍"} ${k.name}</span>
        </label>
    `).join(""),y=`
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
                                    ${m}
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
    `;t.innerHTML=y,t.style.display="flex";const w=t.querySelector("#package-items-list"),f=t.querySelector("#finalPrice"),S=t.querySelector("#discountIndicator"),T=k=>{const x=k.reduce((C,M)=>C+(M.price||0)*(M.quantity||1),0),I=parseFloat(f.value)||0;if(t.querySelector("#originalPrice").textContent=Ne(x),x>0&&x>I&&I>0){const C=(x-I)/x*100;S.textContent=`${C.toFixed(0)}% OFF`,S.classList.remove("hidden")}else S.classList.add("hidden")},L=k=>{k.length===0?w.innerHTML=`
                <div class="text-center py-6 text-slate-400 flex flex-col items-center">
                    <i class="bi bi-inbox text-2xl mb-1 opacity-50"></i>
                    <p class="text-[10px] font-bold uppercase tracking-widest">Nenhum item adicionado</p>
                </div>`:w.innerHTML=k.map((x,I)=>{const C=x.type==="service",M=C?"bi-scissors":"bi-box",B=C?"bg-indigo-100 text-indigo-700 border-indigo-200":"bg-emerald-100 text-emerald-700 border-emerald-200";return`
                <div class="flex items-center justify-between bg-white p-2 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors animate-fade-in-fast">
                    <div class="flex items-center gap-3 min-w-0 flex-1">
                        <div class="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                            <span class="text-[8px] font-bold text-slate-400 uppercase leading-none mb-0.5">Qtd</span>
                            <input type="number" value="${x.quantity}" min="1" class="w-10 text-center bg-transparent text-sm font-black text-slate-700 outline-none quantity-input" data-index="${I}">
                        </div>
                        <div class="min-w-0">
                            <div class="flex items-center gap-1.5 mb-0.5">
                                <span class="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${B} flex items-center gap-1"><i class="bi ${M}"></i> ${C?"Serviço":"Produto"}</span>
                            </div>
                            <p class="font-bold text-slate-800 text-sm truncate leading-tight">${h(x.name)}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 flex-shrink-0 pl-2">
                        <div class="text-right">
                            <span class="block text-[8px] font-bold text-slate-400 uppercase">Valor Un.</span>
                            <span class="text-xs font-black text-slate-700">${Ne(x.price)}</span>
                        </div>
                        <button type="button" class="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors remove-item-btn" data-index="${I}">
                            <i class="bi bi-trash3 pointer-events-none"></i>
                        </button>
                    </div>
                </div>
            `}).join(""),T(k)};L(s),w.addEventListener("change",k=>{if(k.target.classList.contains("quantity-input")){const x=parseInt(k.target.dataset.index,10),I=parseInt(k.target.value,10);I>0&&s[x]&&(s[x].quantity=I,L(s))}}),w.addEventListener("click",k=>{const x=k.target.closest(".remove-item-btn");if(x){const I=parseInt(x.dataset.index,10);s.splice(I,1),L(s)}}),f.addEventListener("input",()=>{T(s)}),t.querySelector("#add-item-to-package-btn").onclick=()=>Ic(k=>{const x=s.find(I=>I.id===k.id&&I.type===k.type);x?x.quantity++:s.push({...k,quantity:1}),L(s)}),Je&&t.removeEventListener("click",Je),Je=async k=>{const x=k.target.closest("button[data-action]");if(!x)return;const I=x.dataset.action;if(k.stopPropagation(),I==="close-modal"&&Ws(),I==="toggle-all-ests"){const C=document.querySelectorAll(".modal-est-checkbox"),M=Array.from(C).every(B=>B.checked);C.forEach(B=>B.checked=!M)}if(I==="save-package"){const C=x,M=Array.from(document.querySelectorAll(".modal-est-checkbox:checked")).map(F=>F.value);if(M.length===0){b("Atenção","Selecione pelo menos uma unidade para o pacote.","warning");return}const B=s.reduce((F,V)=>F+V.price*V.quantity,0),P={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:s,originalPrice:B,price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null,sellStartDate:document.getElementById("sellStartDate").value||null,sellEndDate:document.getElementById("sellEndDate").value||null,salesLimit:parseInt(document.getElementById("salesLimit").value,10)||null,establishmentIds:M,establishmentId:M[0]};if(!P.name||isNaN(P.price)){b("Erro","Nome do Pacote e Preço Final são obrigatórios.","warning");return}if(P.items.length===0){b("Erro","Adicione pelo menos um serviço ou produto ao pacote.","warning");return}C.disabled=!0,C.innerHTML='<div class="loader-small border-white mr-2"></div> Salvando...';try{a?await un(P.id,P):(delete P.id,await cn(P)),b("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),Ws(),await sa()}catch(F){b("Erro",`Não foi possível salvar o pacote: ${F.message}`,"error"),C.disabled=!1,C.innerHTML='<i class="bi bi-save2"></i> Salvar Pacote'}}},t.addEventListener("click",Je)}function Ic(e){let t="";const a=document.createElement("div");a.id="item-selection-modal",a.className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4 animate-fade-in-fast";const s=n=>{const d=t.toLowerCase(),l=G.catalogForModal.services.filter(m=>m.name.toLowerCase().includes(d)),c=G.catalogForModal.products.filter(m=>m.name.toLowerCase().includes(d)),u=l.map(m=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${m.id}" class="flex items-center gap-3 w-full p-2 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left group">
                <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"><i class="bi bi-scissors"></i></div>
                <div class="flex-grow min-w-0">
                    <p class="font-bold text-xs text-slate-800 truncate">${h(m.name)}</p>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${Ne(m.price)}</p>
                </div>
                <i class="bi bi-plus-circle text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
            </button>
        `).join("")||'<p class="text-xs text-slate-400 text-center p-4">Nenhum serviço encontrado.</p>',p=c.map(m=>`
            <button data-action="select-item" data-item-type="product" data-item-id="${m.id}" class="flex items-center gap-3 w-full p-2 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left group">
                <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"><i class="bi bi-box"></i></div>
                <div class="flex-grow min-w-0">
                    <p class="font-bold text-xs text-slate-800 truncate">${h(m.name)}</p>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${Ne(m.price)}</p>
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
                    <div id="modal-product-list" class="space-y-2 max-h-72 overflow-y-auto custom-scrollbar pr-1">${p}</div>
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
    `,document.body.appendChild(a);const o=a.querySelector("#item-selection-list"),r=a.querySelector("#item-search-input"),i=()=>{a.classList.add("opacity-0"),setTimeout(()=>a.remove(),200)};s(o),setTimeout(()=>r.focus(),100),r.addEventListener("input",()=>{t=r.value,s(o)}),a.addEventListener("click",n=>{const d=n.target.closest('[data-action="select-item"]'),l=n.target.closest('[data-action="close-selection-modal"]');if(d){const{itemType:c,itemId:u}=d.dataset,m=(G.catalogForModal[c+"s"]||[]).find(y=>y.id===u);m&&(e({...m,type:c}),i())}else(l||n.target===a)&&i()})}function Sc(){Vt&&Ka.removeEventListener("click",Vt),Vt=s=>{if(s.target.closest('[data-action-stop-propagation="true"]')){s.stopPropagation();const i=s.target.closest('[data-action="delete-package"]');if(i){const n=i.dataset.id;Y("Excluir Pacote","Tem a certeza que deseja excluir este pacote promocional? Esta ação é irreversível.").then(async d=>{if(d)try{await pn(n),b("Sucesso!","Pacote excluído.","success"),await sa()}catch(l){b("Erro",`Não foi possível excluir: ${l.message}`,"error")}})}return}const o=s.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!o)return;const r=o.dataset.action;if(r==="new-package")Js(null);else if(r==="edit-package"){const i=JSON.parse(o.dataset.package);Js(i)}},Ka.addEventListener("click",Vt);const e=document.getElementById("search-packages");e&&e.addEventListener("input",s=>{G.searchQuery=s.target.value,Za()});const t=document.getElementById("filter-status");t&&t.addEventListener("change",s=>{G.statusFilter=s.target.value,Za()}),document.querySelectorAll(".est-filter-checkbox").forEach(s=>{s.addEventListener("change",o=>{const r=o.target.closest("label");o.target.checked?(G.filterEstablishmentIds.add(o.target.value),r.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),r.classList.remove("border-slate-200","text-slate-600")):(G.filterEstablishmentIds.delete(o.target.value),r.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),r.classList.add("border-slate-200","text-slate-600")),sa()})});const a=document.getElementById("export-excel-btn");a&&a.addEventListener("click",Ec)}const Lc=document.getElementById("content");let Cc=null;async function Dc(){const e=h(g.userName||"Usuário"),t=h(be.currentUser?.email||"E-mail não disponível"),a=g.userName?g.userName.charAt(0):"U";Lc.innerHTML=`
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
    `,await Tc()}async function Tc(){const e=document.getElementById("professional-agenda-block");e.innerHTML="";try{const t=g.userProfessionalId;if(t){const a=await qi(t);Cc=a,a.photo&&(document.getElementById("user-profile-avatar").src=a.photo);const s=h(a.name);e.innerHTML=`
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
            `,Pc(a.id),document.getElementById("my-blocks-filter").addEventListener("change",r=>oa(a.id,r.target.value)),oa(a.id,"future")}else e.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(t){console.error("Erro ao carregar seção de profissional:",t),e.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${h(t.message)}</p>
            </div>
        `}}function Pc(e){const t=document.getElementById("block-schedule-form");t.addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#blockDate").value,o=t.querySelector("#blockStartTime").value,r=t.querySelector("#blockEndTime").value,i=t.querySelector("#blockReason").value;if(!s||!o||!r){b("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(o>=r){b("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const n=new Date(`${s}T${o}:00`),d=new Date(`${s}T${r}:00`),l=t.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="A bloquear...";try{await da({establishmentId:g.establishmentId,professionalId:e,reason:i||"Bloqueado (Meu Perfil)",startTime:n.toISOString(),endTime:d.toISOString()}),b("Sucesso","Agenda bloqueada com sucesso!","success"),t.reset();const c=document.getElementById("my-blocks-filter").value;oa(e,c)}catch(c){console.error("Erro ao bloquear agenda:",c),b("Erro",`Não foi possível bloquear a agenda: ${c.message}`,"error")}finally{l.disabled=!1,l.textContent="Bloquear Agenda"}})}async function oa(e,t="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const s=new Date;let o,r;t==="history"?(r=new Date,o=new Date,o.setFullYear(o.getFullYear()-1)):(o=new Date,r=new Date,r.setFullYear(r.getFullYear()+1));let n=(await la(g.establishmentId,o.toISOString(),r.toISOString(),e)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));t==="history"?n=n.filter(d=>d.endTime<s).sort((d,l)=>l.startTime-d.startTime):n=n.filter(d=>d.endTime>=s).sort((d,l)=>d.startTime-l.startTime),n.length>0?(a.innerHTML=n.map(d=>{const l=d.startTime.toLocaleDateString("pt-BR"),c=`${d.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${d.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`,u=d.endTime<new Date,p=h(d.reason||"Sem motivo");return`
                    <div class="flex items-center justify-between p-3 ${u?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${l} das ${c}</p>
                            <p class="text-sm text-gray-600">${p}</p>
                        </div>
                        <button data-block-id="${d.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(d=>{d.addEventListener("click",async l=>{const c=l.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await ns(c),b("Sucesso","Bloqueio removido.","success"),oa(e,t)}catch(u){console.error("Erro ao remover bloqueio:",u),b("Erro",`Não foi possível remover o bloqueio: ${u.message}`,"error")}})})):a.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${t==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(s){console.error("Erro ao carregar bloqueios:",s),a.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${h(s.message)}</p>`}}let Gs=!1;async function ra(e){if(!e)return;e.innerHTML=`
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
    `;const t=document.getElementById("hierarchy-list-container"),a=document.getElementById("est-parent");try{const o=(await xe()).matrizes||[];if(a&&(a.innerHTML='<option value="">Nenhuma (Criar como Matriz Independente)</option>'),o.length===0)t.innerHTML=`
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
                `}),t.innerHTML=r}Gs||(Bc(),Gs=!0)}catch(s){console.error("Erro na renderização da rede:",s),t.innerHTML=`
            <div class="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100 text-center">
                <i class="bi bi-exclamation-triangle text-2xl mb-2 block"></i>
                <p class="font-bold text-sm">Não foi possível carregar a estrutura organizacional.</p>
            </div>
        `}}function Bc(){const e=document.getElementById("form-create-establishment");e&&e.addEventListener("submit",async t=>{t.preventDefault();const a=e.querySelector('button[type="submit"]'),s=a.innerHTML;a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...',a.disabled=!0;const o={name:document.getElementById("est-name").value.trim(),cnpj:document.getElementById("est-cnpj").value.trim(),parentId:document.getElementById("est-parent").value||null,timezone:document.getElementById("est-timezone").value};try{const r=await Kr(o);alert(r.message||"Sucesso!"),e.reset();const i=document.getElementById("modal-create-establishment"),n=window.bootstrap?.Modal.getInstance(i);n&&n.hide(),await ra(document.getElementById("content"))}catch(r){console.error("Erro ao criar estabelecimento:",r),alert("Erro: "+(r.message||"Falha ao gravar dados."))}finally{a.innerHTML=s,a.disabled=!1}})}window.loadAndRenderHierarchy=()=>ra(document.getElementById("content"));document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("gesturestart",function(t){t.preventDefault()}),document.addEventListener("gesturechange",function(t){t.preventDefault()}),document.addEventListener("gestureend",function(t){t.preventDefault()});let e=0;document.addEventListener("touchend",function(t){const a=new Date().getTime();a-e<=300&&t.preventDefault(),e=a},!1)});const le=document.getElementById("loadingScreen"),ut=document.getElementById("dashboardContent"),Ge=document.getElementById("content"),Ia=document.getElementById("notificationBell"),_t=document.getElementById("notificationBadge"),Oe=document.getElementById("notificationPanel"),Sa=document.getElementById("notificationList"),pt=document.getElementById("profileMenuButton"),pe=document.getElementById("profileDropdown"),Qs=document.getElementById("profileName"),Xs=document.getElementById("profileEmail"),Ys=document.getElementById("logoutButton"),Ks=document.getElementById("myProfileLink"),Zs=document.getElementById("hamburger-menu-btn"),ce=document.getElementById("sidebar"),fe=document.getElementById("mobile-overlay"),eo=document.getElementById("themeToggleBtn"),La=document.getElementById("themeIcon"),es=document.getElementById("mobile-bottom-nav"),rt=document.getElementById("nav-scroll"),to=document.getElementById("scroll-hint-left"),ao=document.getElementById("scroll-hint-right"),Ac=document.querySelectorAll(".bottom-nav-item");function ts(){if(!rt||!to||!ao)return;const{scrollLeft:e,scrollWidth:t,clientWidth:a}=rt;to.classList.toggle("visible",e>5),ao.classList.toggle("visible",e+a<t-5)}function Mc(){if(!rt)return;const e=document.querySelector(".bottom-nav-item.active");if(!e)return;const t=rt,a=t.getBoundingClientRect(),s=e.getBoundingClientRect(),r=s.left+s.width/2-a.left-a.width/2;t.scrollBy({left:r,behavior:"smooth"})}const qc={"dashboard-section":Di,"agenda-section":So,"comandas-section":Fn,"relatorios-section":On,"servicos-section":Kn,"produtos-section":bl,"suppliers-section":Sl,"profissionais-section":Ml,"clientes-section":Gl,"estabelecimento-section":e=>nr(e),"ausencias-section":Ed,"users-section":ta,"sales-report-section":Od,"financial-section":_d,"commissions-section":rc,"packages-section":wc,"my-profile-section":Dc,"hierarquia-section":()=>ra(Ge),"establishments-section":()=>ra(Ge)},jc={"dashboard-section":"Dashboard","agenda-section":"Agenda","comandas-section":"Comandas / PDV","relatorios-section":"Relatórios","servicos-section":"Serviços do Menu","produtos-section":"Produtos (Estoque)","suppliers-section":"Parceiros de Negócio","profissionais-section":"Equipe / Profissionais","clientes-section":"Clientes","estabelecimento-section":"Minha Empresa","ausencias-section":"Ausências","users-section":"Usuários e Acessos","sales-report-section":"Relatório de Vendas","financial-section":"Financeiro (ERP)","commissions-section":"Comissões","packages-section":"Planos e Pacotes","my-profile-section":"Meu Perfil","hierarquia-section":"Rede / Filiais","establishments-section":"Rede / Filiais"},so={indigo:{main:"#4f46e5",hover:"#4338ca",light:"#eef2ff",text:"#ffffff"},blue:{main:"#2563eb",hover:"#1d4ed8",light:"#eff6ff",text:"#ffffff"},sky:{main:"#0284c7",hover:"#0369a1",light:"#e0f2fe",text:"#ffffff"},teal:{main:"#0d9488",hover:"#0f766e",light:"#ccfbf1",text:"#ffffff"},emerald:{main:"#059669",hover:"#047857",light:"#d1fae5",text:"#ffffff"},green:{main:"#16a34a",hover:"#15803d",light:"#dcfce7",text:"#ffffff"},lime:{main:"#65a30d",hover:"#4d7c0f",light:"#ecfccb",text:"#1f2937"},amber:{main:"#d97706",hover:"#b45309",light:"#fef3c7",text:"#1f2937"},orange:{main:"#ea580c",hover:"#c2410c",light:"#ffedd5",text:"#ffffff"},red:{main:"#dc2626",hover:"#b91c1c",light:"#fee2e2",text:"#ffffff"},rose:{main:"#e11d48",hover:"#be123c",light:"#ffe4e6",text:"#ffffff"},pink:{main:"#db2777",hover:"#be185d",light:"#fce7f3",text:"#ffffff"},fuchsia:{main:"#c026d3",hover:"#a21caf",light:"#fae8ff",text:"#ffffff"},purple:{main:"#7c3aed",hover:"#6d28d9",light:"#ede9fe",text:"#ffffff"},violet:{main:"#8b5cf6",hover:"#7c3aed",light:"#ddd6fe",text:"#ffffff"},gray:{main:"#64748b",hover:"#475569",light:"#f1f5f9",text:"#ffffff"},black:{main:"#111827",hover:"#000000",light:"#e5e7eb",text:"#ffffff"}};function Ut(e){const t=so[e]||so.indigo,s=(r=>{const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return i?`${parseInt(i[1],16)}, ${parseInt(i[2],16)}, ${parseInt(i[3],16)}`:"79, 70, 229"})(t.main);document.body.style.setProperty("--theme-main",t.main);const o=document.getElementById("dynamic-theme-styles");o&&(o.innerHTML=`
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
        `)}function Xt(e){document.documentElement.setAttribute("data-theme",e),localStorage.setItem("kairos_theme",e),La&&(e==="dark"?La.innerHTML="☀️":La.innerHTML="🌙")}function Nc(){const e=localStorage.getItem("kairos_theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;Xt(e||(t?"dark":"light"))}let It=null,St=[];function fr(){if(!_t||!Sa)return;const e=St.filter(t=>!t.read).length;if(e>0?(_t.textContent=e,_t.classList.remove("hidden")):_t.classList.add("hidden"),St.length===0){Sa.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}Sa.innerHTML=St.map(t=>`
    <div class="notification-item ${t.read?"":"unread"}">
    <p class="font-semibold">${t.title}</p>
    <p class="text-sm text-gray-600">${t.message}</p>
    <p class="text-xs text-gray-400 mt-1">${t.time}</p>
    </div>
    `).join("")}function oo(e){It&&It();const t=ia(Se,"establishments",e,"notifications"),a=lo(t,co("timestamp",">=",new Date),Tr("timestamp","desc"));It=Pr(a,s=>{s.docChanges().forEach(o=>{if(o.type==="added"){const r=o.doc.data();St.unshift({title:r.title,message:r.message,time:r.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),b(r.title,r.message,"info",!0),fr();const i=document.querySelector(".sidebar-link.active");i&&i.dataset.target==="agenda-section"&&So()}})},s=>{console.error("Erro no listener de notificações:",s)})}async function Rc(e){const t=document.getElementById("multi-context-container"),a=document.getElementById("multi-context-btn"),s=document.getElementById("multi-context-label"),o=document.getElementById("multi-context-count"),r=document.getElementById("multi-context-list"),i=document.getElementById("multi-context-apply"),n=document.getElementById("multi-context-dropdown"),d=document.getElementById("multi-context-arrow");if(!(!t||!r))try{const c=(await xe()).matrizes||[];let u="",p=0;if(c.forEach(m=>{u+=`
                <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors mb-1">
                    <input type="checkbox" value="${m.id}" class="context-checkbox" data-name="${Wt(m.name)}">
                    <span class="text-[13px] sm:text-sm font-bold text-slate-700 truncate">🏢 ${Wt(m.name)}</span>
                </label>
            `,p++,m.branches&&m.branches.length>0&&m.branches.forEach(y=>{u+=`
                        <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors ml-4 mb-1 border-l-2 border-slate-100 pl-3">
                            <input type="checkbox" value="${y.id}" class="context-checkbox" data-name="${Wt(y.name)}">
                            <span class="text-[12px] sm:text-[13px] font-medium text-slate-600 truncate">📍 ${Wt(y.name)}</span>
                        </label>
                    `,p++})}),p>0){r.innerHTML=u,t.style.display="block",(!g.selectedEstablishments||g.selectedEstablishments.length===0)&&(g.selectedEstablishments=[e]);const m=Array.from(r.querySelectorAll('input[type="checkbox"]')),y=()=>{const f=m.filter(S=>S.checked);o.textContent=f.length,f.length===0?s.textContent="Nenhuma selecionada":f.length===1?s.textContent=f[0].dataset.name:s.textContent=`${f.length} Unidades`};let w=!1;m.forEach(f=>{g.selectedEstablishments.includes(f.value)&&(f.checked=!0,w=!0)}),!w&&m.length>0&&(m[0].checked=!0,g.selectedEstablishments=[m[0].value],g.establishmentId=m[0].value),y(),a.addEventListener("click",f=>{f.stopPropagation(),n.classList.toggle("hidden"),d.style.transform=n.classList.contains("hidden")?"rotate(0deg)":"rotate(180deg)"}),document.addEventListener("click",f=>{!t.contains(f.target)&&!n.classList.contains("hidden")&&(n.classList.add("hidden"),d.style.transform="rotate(0deg)",m.forEach(S=>{S.checked=g.selectedEstablishments.includes(S.value)}),y())}),m.forEach(f=>{f.addEventListener("change",y)}),i.addEventListener("click",async f=>{f.stopPropagation(),le&&(le.classList.remove("hidden","fade-out"),le.style.display="flex");const S=m.filter(L=>L.checked);if(S.length===0){le&&(le.classList.add("fade-out"),setTimeout(()=>{le.style.display="none"},500)),b("Atenção","Tem de selecionar pelo menos uma unidade.","warning");return}g.selectedEstablishments=S.map(L=>L.value);const T=g.selectedEstablishments[0];try{const L=await De(T);g.establishmentId=T,g.establishmentName=L.name,g.enabledModules=L.modules,g.currentViewContext={id:T,name:L.name,type:L.parentId?"BRANCH":"GROUP"},typeof Ut=="function"&&Ut(L.themeColor||"indigo"),oo(T),ro(g.userPermissions),n.classList.add("hidden"),d.style.transform="rotate(0deg)",b("Ambiente Atualizado","Exibindo informações consolidadas.","success");const k=document.querySelector(".sidebar-link.active"),x=k?k.getAttribute("data-target"):"dashboard-section";Z(x)}catch(L){console.error("Erro ao aplicar contextos:",L),b("Erro","Ocorreu um problema ao trocar a visualização.","error")}finally{le&&(le.classList.add("fade-out"),setTimeout(()=>{le.style.display="none"},500))}});try{const f=await De(g.establishmentId);g.establishmentName=f.name,g.enabledModules=f.modules,g.currentViewContext={id:g.establishmentId,name:f.name,type:f.parentId?"BRANCH":"GROUP"},typeof Ut=="function"&&Ut(f.themeColor||"indigo"),oo(g.establishmentId),ro(g.userPermissions)}catch(f){console.error(f)}}else t.style.display="none"}catch(l){console.error("Erro ao carregar switcher de contexto:",l),t.style.display="none"}}function Z(e,t={}){const a=e.replace("-section","");if(e!=="my-profile-section"){const o=["hierarquia-section","establishments-section","estabelecimento-section","dashboard-section"].includes(e),r=g.enabledModules?.[a]!==!1,i=g.userPermissions===null||g.userPermissions[e]?.view===!0;if(!o&&(!r||!i)){Ge&&(Ge.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>'),document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active")),ce&&ce.classList.contains("absolute")&&(ce.classList.add("hidden"),fe&&fe.classList.add("hidden"));return}}const s=qc[e];if(s&&Ge){const o=document.getElementById("header-page-title");o&&(o.textContent=jc[e]||"Painel de Gestão"),document.querySelectorAll(".sidebar-link").forEach(r=>{r.classList.toggle("active",r.getAttribute("data-target")===e)}),es&&(Ac.forEach(r=>{r.classList.toggle("active",r.getAttribute("data-target")===e)}),setTimeout(Mc,50),setTimeout(ts,100)),e==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(r=>r.classList.remove("active")),Ge.innerHTML="",window.innerWidth<768&&ce&&(ce.classList.add("hidden"),fe&&fe.classList.add("hidden")),s(t)}}window.navigateTo=Z;async function ro(e){const t=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),s=document.getElementById("kpi-today-appointments"),o=document.getElementById("kpi-today-revenue"),r=e===null||e["agenda-section"]?.view===!0,i=e===null||e["financial-section"]?.view===!0;if(r&&t&&(t.classList.remove("hidden"),t.classList.add("inline-flex")),i&&a&&(a.classList.remove("hidden"),a.classList.add("inline-flex")),!(!r&&!i))try{const n=await mo();r&&s&&(s.textContent=n.todayAppointments.toString()),i&&o&&(o.textContent=`R$ ${n.todayRevenue.toFixed(2).replace(".",",")}`)}catch(n){console.error("Erro ao carregar KPIs do cabeçalho:",n)}}async function Fc(e){try{we.getPlatform()==="android"&&await de.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0});let t=await de.checkPermissions();if(t.receive==="prompt"&&(t=await de.requestPermissions()),t.receive!=="granted")return;await de.register(),de.addListener("registration",async a=>{try{const s=Ct(Se,"users",e);await as(s,{fcmTokens:Dr(a.value),platform:"native_mobile"})}catch{}}),de.addListener("pushNotificationReceived",a=>b(a.title,a.body,"info",!0)),de.addListener("pushNotificationActionPerformed",()=>Z("agenda-section"))}catch{}}function Hc(){const e=document.getElementById("exitConfirmationModal"),t=document.getElementById("btn-cancel-exit"),a=document.getElementById("btn-confirm-exit"),s=()=>e&&(e.style.display="block"),o=()=>e&&(e.style.display="none"),r=()=>e&&e.style.display==="block";e&&(t.addEventListener("click",()=>{o(),we.isNativePlatform()||history.pushState(null,document.title,location.href)}),a.addEventListener("click",()=>{o(),we.isNativePlatform()?Ls.exitApp():history.back()}),we.isNativePlatform()?Ls.addListener("backButton",()=>{if(r())o();else{const i=document.querySelectorAll('.modal[style*="display: block"]'),n=Array.from(i).filter(l=>l.id!=="exitConfirmationModal");if(n.length>0){n.forEach(l=>l.style.display="none");return}if(ce&&!ce.classList.contains("hidden")&&window.innerWidth<768){ce.classList.add("hidden"),fe&&fe.classList.add("hidden");return}const d=document.querySelector(".sidebar-link.active");d&&d.getAttribute("data-target")==="dashboard-section"?s():Z("dashboard-section")}}):(history.pushState(null,document.title,location.href),window.addEventListener("popstate",()=>{if(r()){o(),history.pushState(null,document.title,location.href);return}const i=document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display: flex"]'),n=Array.from(i).filter(l=>l.id!=="exitConfirmationModal");if(n.length>0){n.forEach(l=>l.style.display="none"),history.pushState(null,document.title,location.href);return}const d=document.querySelector(".sidebar-link.active");d&&d.getAttribute("data-target")==="dashboard-section"?s():(Z("dashboard-section"),history.pushState(null,document.title,location.href))})))}function Wt(e){return e?e.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}async function Oc(){try{await kr(be,$r)}catch{}we.isNativePlatform()&&document.body.classList.add("is-app-native"),Ur(),Hc(),Nc(),eo&&eo.addEventListener("click",e=>{e.preventDefault();const t=document.documentElement.getAttribute("data-theme");Xt(t==="dark"?"light":"dark")}),Zs&&Zs.addEventListener("click",e=>{e.stopPropagation(),ce&&(ce.classList.remove("hidden"),ce.classList.add("absolute","inset-y-0","left-0","z-40","shadow-xl")),fe&&fe.classList.remove("hidden")}),es&&(es.addEventListener("click",e=>{const t=e.target.closest(".bottom-nav-item");if(!t)return;e.preventDefault();const a=t.getAttribute("data-target");Z(a)}),rt&&rt.addEventListener("scroll",ts),ts()),fe&&fe.addEventListener("click",()=>{ce&&(ce.classList.add("hidden"),ce.classList.remove("absolute","inset-y-0","left-0","z-40","shadow-xl")),fe.classList.add("hidden")}),Ia&&Ia.addEventListener("click",e=>{e.stopPropagation(),Oe&&(Oe.classList.toggle("hidden"),Oe.classList.contains("hidden")||(St.forEach(t=>t.read=!0),fr()))}),pt&&pt.addEventListener("click",e=>{e.stopPropagation(),pe&&(pe.classList.toggle("active"),pe.classList.contains("active")?pe.classList.remove("hidden"):setTimeout(()=>pe.classList.add("hidden"),200))}),Ks&&Ks.addEventListener("click",e=>{e.preventDefault(),Z("my-profile-section"),pe&&(pe.classList.remove("active"),pe.classList.add("hidden"))}),document.addEventListener("click",e=>{Oe&&!Oe.contains(e.target)&&e.target!==Ia&&Oe.classList.add("hidden"),pe&&!pe.contains(e.target)&&e.target!==pt&&pe.classList.contains("active")&&(pe.classList.remove("active"),setTimeout(()=>pe.classList.add("hidden"),200))}),Er(be,async e=>{if(e){if(!we.isNativePlatform()&&(fi(),"Notification"in window&&Notification.permission==="default")){const t=document.getElementById("toast-notification-request"),a=document.getElementById("btn-enable-toast");t&&setTimeout(()=>{t.style.display="block"},3500),a&&a.addEventListener("click",async()=>{await xi()&&t&&(t.style.display="none")});const s=()=>{t&&(t.style.display="none")},o=document.getElementById("btn-deny-toast"),r=document.getElementById("btn-close-toast");o&&o.addEventListener("click",s),r&&r.addEventListener("click",s)}try{const a=(await e.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="admin"||a.role==="employee")&&a.establishmentId){let s=null,o=e.displayName,r=null;const i=Ct(Se,"users",e.uid),n=await io(i);if(n.exists()){const l=n.data();s=a.role==="employee"?l.permissions||{}:null,o=l.name||o,r=l.professionalId||null}g.userProfessionalId=r,we.isNativePlatform()&&Fc(e.uid);const d=o||e.email;Mr(a.establishmentId,"Carregando...",s),pt&&(pt.textContent=d.charAt(0).toUpperCase()),Qs&&(Qs.textContent=d),Xs&&(Xs.textContent=e.email),Ys&&Ys.addEventListener("click",l=>{l.preventDefault(),It&&It(),Ir(be).then(()=>window.location.href="/login.html")}),await Rc(a.establishmentId),Yr(Z,s,g.enabledModules),le&&(le.classList.add("fade-out"),setTimeout(()=>{le.style.display="none"},500)),ut&&(ut.style.display="flex"),setTimeout(()=>{ai()},1500),Z("dashboard-section")}else throw new Error("Permissão ou estabelecimento não configurado.")}catch(t){console.error("Erro na inicialização:",t),le&&(le.style.display="none"),ut&&(ut.innerHTML=`<div class="w-full h-full flex flex-col items-center justify-center p-4 text-center"><h2>Erro de Acesso</h2><p>${t.message}</p></div>`,ut.style.display="flex")}}else window.location.href="/login.html"})}Oc();export{po as W};
