const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-DA5pl4Ya.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/firebase-config-C2tbVz-J.js","assets/styles-CZYPZ0h4.css"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as ge,d as Ee,m as Is}from"./firebase-config-C2tbVz-J.js";import{EmailAuthProvider as Er,reauthenticateWithCredential as Ir,verifyBeforeUpdateEmail as Lr,updatePassword as Cr,updateProfile as Dr,setPersistence as Tr,browserLocalPersistence as Pr,onAuthStateChanged as Br,signOut as Ar}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as Lt,getDoc as co,updateDoc as os,setDoc as Mr,addDoc as uo,collection as na,query as po,where as bo,getDocs as qr,deleteDoc as jr,arrayUnion as Nr,orderBy as Rr,onSnapshot as Fr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{getToken as Hr,onMessage as Or}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const g={userName:null,userProfessionalId:null,userPermissions:null,userRole:null,groupId:null,groupName:null,accessibleCompanies:[],accessibleEstablishments:[],currentViewContext:{type:null,id:null,name:null},establishmentId:null,establishmentName:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function zr(t,e,a){g.establishmentId=t,g.establishmentName=e,g.userPermissions=a,g.currentViewContext={type:"BRANCH",id:t,name:e}}const go=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",Da=go?"http://localhost:8080":"https://kairos-app-407358446276.us-central1.run.app";console.log(`🚀 API configurada para modo: ${go?"LOCAL (Dev)":"PRODUÇÃO (Cloud)"}`);console.log("📡 URL Base:",Da);async function _r(){const t=ge.currentUser;return t?{"Content-Type":"application/json",Authorization:`Bearer ${await t.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function L(t,e={}){const a=await _r();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const s=Da.replace(/\/$/,""),o=t.startsWith("/")?t:`/${t}`,r=`${s}${o}`;console.log(`AuthenticatedFetch: ${e.method||"GET"} ${r}`);try{const i=await fetch(r,{...e,headers:{...a,...e.headers}});if(!i.ok){const d=(await i.json().catch(()=>({message:i.statusText}))).message||`Erro na API: ${i.status}`;if(d.includes("FAILED_PRECONDITION")&&d.includes("requires an index")){const l=/(https:\/\/[^\s]+)/,c=d.match(l),u=c?c[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${t}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${u}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${i.status}) em ${r}:`,d),new Error(d)}return i.json()}catch(i){throw console.error(`Falha de rede ao tentar acessar ${r}:`,i.message),i.message.includes("Failed to fetch")||i.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${Da}. Verifique se o servidor backend está rodando.`):i}}const rs=(t,e,a,s=null)=>{let o=`/api/appointments/${t}?startDate=${e}&endDate=${a}`;return s&&(o+=`&professionalId=${s}`),L(o)},Vr=(t,e,a)=>{const s=`/api/appointments/cancelled/${t}?startDate=${e}&endDate=${a}`;return L(s)},Ur=({establishmentId:t,professionalId:e,serviceIds:a,date:s})=>{const o=`/api/availability?establishmentId=${t}&professionalId=${e}&serviceIds=${a.join(",")}&date=${s}`;return L(o)},Wr=t=>L("/api/appointments",{method:"POST",body:JSON.stringify(t)}),Jr=(t,e)=>L(`/api/appointments/${t}`,{method:"PUT",body:JSON.stringify(e)}),Qr=t=>L(`/api/appointments/${t}`,{method:"DELETE"}),Gr=t=>L(`/api/appointments/${t}/reopen`,{method:"POST"}),Xr=(t,e)=>L(`/api/appointments/${t}/checkout`,{method:"POST",body:JSON.stringify(e)});let re;async function Yr(){if(!re)try{re=new(window.AudioContext||window.webkitAudioContext)}catch(t){console.error("Não foi possível inicializar o áudio:",t)}}function Kr(){if(!re){console.warn("AudioContext não inicializado. O som não será tocado.");return}re.state==="suspended"&&re.resume();const t=re.createOscillator(),e=re.createGain();t.connect(e),e.connect(re.destination),t.type="sine",t.frequency.setValueAtTime(800,re.currentTime),e.gain.setValueAtTime(0,re.currentTime),e.gain.linearRampToValueAtTime(.3,re.currentTime+.01),e.gain.exponentialRampToValueAtTime(1e-4,re.currentTime+.2),t.start(re.currentTime),t.stop(re.currentTime+.2)}function m(t,e,a="info",s=!1){const o=document.getElementById("toast-container");if(!o)return;s&&Kr();const r=document.createElement("div"),i={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},n={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},d={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};r.className=`toast ${i[a]||i.info}`,r.innerHTML=`
        <div class="toast-icon">${n[a]||n.info}</div>
        <div class="toast-content">
            <p class="font-bold">${t}</p>
            <p class="text-sm">${e}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${d[a]||d.info}"></div>
        </div>
    `,o.appendChild(r),r.querySelector(".toast-close").addEventListener("click",()=>r.remove()),setTimeout(()=>{r.remove()},4e3)}function Y(t,e){const a=document.getElementById("genericModal");return new Promise(s=>{a.innerHTML=`
            <div class="modal-content max-w-sm p-0 rounded-xl overflow-hidden shadow-2xl">
                <div class="p-6 text-center">
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                        <svg class="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 class="text-xl leading-6 font-bold text-gray-900 mt-4">${t}</h3>
                    <div class="mt-2 text-sm text-gray-600">
                        <p>${e}</p>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 flex justify-center gap-3 border-t">
                    <button id="genericModalCancelBtn" class="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition text-sm">Cancelar</button>
                    <button id="genericModalConfirmBtn" class="flex-1 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition text-sm">Confirmar</button>
                </div>
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",s(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",s(!1)}})}function Ie({title:t,contentHTML:e,maxWidth:a="max-w-4xl",showCloseButton:s=!0}){let o=document.getElementById("genericModal");const r=o.cloneNode(!1);o.parentNode.replaceChild(r,o),o=r;const i=()=>{o.style.display="none"},n=c=>{o.querySelector("#genericModalContentBody").innerHTML=c};o.innerHTML=`
        <div class="modal-content ${a} p-0 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
            
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${t}</h2>
                ${s?'<button data-close-modal class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>':""}
            </header>

            <div id="genericModalContentBody" class="flex-1 overflow-y-auto p-5">
                ${e}
            </div>
            
            <footer id="genericModalFooter" class="hidden"></footer>
        </div>
    `;const d=o.querySelector("[data-close-modal]");d&&(d.onclick=i);const l=o.querySelector('[data-action="close-modal"]');return l&&(l.onclick=i),o.addEventListener("click",c=>{c.target.closest(".modal-content")||i()}),o.style.display="flex",{modalElement:o,close:i,setContent:n}}function Zr(){document.body.addEventListener("click",()=>{re||Yr()},{once:!0}),document.addEventListener("click",t=>{const e=t.target.closest('[data-action="close-modal"]');if(e){const s=e.dataset.target;if(s){const o=document.getElementById(s);o&&(o.style.display="none")}}if(t.target.closest("[data-close-modal]")){const s=document.getElementById("genericModal");s&&(s.style.display="none")}})}const se=document.getElementById("sidebar"),Re=document.getElementById("sidebarToggle"),ft=document.getElementById("mainContent"),ei=document.querySelectorAll(".sidebar-link"),Ta=document.getElementById("menu-search"),Ls=document.getElementById("hamburger-menu-btn"),Ye=document.getElementById("mobile-overlay");let Le=!0;function Me(t){if(!se||!ft)return;se.classList.toggle("collapsed",t),ft.classList.toggle("sidebar-collapsed-shift",t);const e=se.querySelector(".sidebar-search-container"),a=se.querySelectorAll(".sidebar-category");t?(e&&(e.style.display="none"),a.forEach(s=>s.style.display="none"),document.querySelectorAll(".submenu-toggle").forEach(s=>{const o=s.getAttribute("data-target-submenu"),r=document.getElementById(o),i=s.querySelector(".submenu-arrow");r&&(r.classList.add("hidden"),r.classList.remove("flex")),i&&i.classList.remove("rotate-180")})):(e&&(e.style.display="block"),a.forEach(s=>s.style.display="block"))}function ti(){!se||!Ye||(se.classList.add("mobile-open"),Ye.classList.add("visible"))}function Tt(){!se||!Ye||(se.classList.remove("mobile-open"),Ye.classList.remove("visible"))}function ai(){Me(!se.classList.contains("collapsed"))}function si(t,e){const a=document.getElementById(t);if(!a)return;const s=a.classList.contains("hidden");s&&window.innerWidth>=1024&&se.classList.contains("collapsed")&&Me(!1),s?(a.classList.remove("hidden"),a.classList.add("flex"),e&&e.classList.add("rotate-180")):(a.classList.add("hidden"),a.classList.remove("flex"),e&&e.classList.remove("rotate-180"))}function oi(){Ta&&Ta.addEventListener("input",t=>{const e=t.target.value.toLowerCase().trim(),a=document.getElementById("sidebar-nav");if(!a)return;const s=a.querySelectorAll("li"),o=a.querySelectorAll(".sidebar-category");if(e===""){s.forEach(r=>r.style.display=""),o.forEach(r=>r.style.display="block");return}o.forEach(r=>r.style.display="none"),s.forEach(r=>{if(r.classList.contains("sidebar-category"))return;const i=r.querySelector(".sidebar-link")||r.querySelector(".submenu-toggle");if(!i)return;if(i.textContent.toLowerCase().includes(e)){r.style.display="";const l=r.closest('ul[id$="-submenu"]');if(l){l.classList.remove("hidden"),l.classList.add("flex"),l.parentElement.style.display="";const c=l.parentElement.querySelector(".submenu-toggle");if(c){const u=c.querySelector(".submenu-arrow");u&&u.classList.add("rotate-180")}}}else{const l=i.getAttribute("data-target-submenu");if(l){const c=document.getElementById(l);c&&(Array.from(c.querySelectorAll(".sidebar-link")).some(b=>b.textContent.toLowerCase().includes(e))?r.style.display="":r.style.display="none")}else r.style.display="none"}})})}function ri(t,e,a){if(!se||!ft)return;ft.classList.add("main-content-shift"),window.innerWidth>=1024?(Le=!0,Me(!1)):window.innerWidth>=768?(Le=!1,Me(!0)):(ft.classList.remove("main-content-shift","sidebar-collapsed-shift"),Tt()),Re&&Re.addEventListener("click",o=>{o.stopPropagation(),window.innerWidth>=768?(Le=!Le,Me(!Le),Le?(Re.classList.add("text-indigo-400"),Re.classList.remove("text-gray-400")):(Re.classList.remove("text-indigo-400"),Re.classList.add("text-gray-400"))):ai()}),se.addEventListener("mouseenter",()=>{window.innerWidth>=768&&!Le&&se.classList.contains("collapsed")&&Me(!1)}),se.addEventListener("mouseleave",()=>{if(window.innerWidth>=768&&!Le){const o=!!document.querySelector("#sidebarToggle:hover"),r=document.activeElement===Ta;!o&&!r&&Me(!0)}}),Ls&&Ls.addEventListener("click",o=>{o.stopPropagation(),ti()}),Ye&&Ye.addEventListener("click",o=>{o.stopPropagation(),Tt()});let s=0;se.addEventListener("touchstart",o=>{s=o.changedTouches[0].screenX},{passive:!0}),se.addEventListener("touchend",o=>{const r=o.changedTouches[0].screenX;s-r>50&&Tt()},{passive:!0}),document.querySelectorAll(".submenu-toggle").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation();const i=o.getAttribute("data-target-submenu"),n=o.querySelector(".submenu-arrow");si(i,n)})}),oi(),ei.forEach(o=>{const r=o.getAttribute("data-target");if(!r)return;const i=r.replace("-section",""),n=a?.[i]!==!1,d=e===null||e[r]?.view===!0;if(!n||!d){o.parentElement&&o.parentElement.tagName==="LI"?o.parentElement.style.display="none":o.style.display="none";return}o.addEventListener("click",l=>{l.preventDefault(),document.querySelectorAll(".sidebar-link").forEach(c=>c.classList.remove("active")),o.classList.add("active"),r&&typeof t=="function"&&t(r),window.innerWidth<768&&Tt()})})}const ii=t=>L("/api/establishments/",{method:"POST",body:JSON.stringify(t)}),xe=()=>L("/api/establishments/hierarchy",{method:"GET"}),Te=t=>{const e=t||g.establishmentId;return e?L(`/api/establishments/${e}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},is=(t,e)=>{const a=t||g.establishmentId;return a?L(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(e)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},ni=(t,e)=>{const a=t||g.establishmentId;return a?L(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:e})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},li=(t,e)=>{const a=t||g.establishmentId;return a?L(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:e})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))};class di{constructor(e,a,s){this.steps=e,this.currentStep=0,this.onComplete=a,this.onSkip=s,this.isActive=!1,this.overlay=null,this.spotlight=null,this.popover=null,this.handleResize=this.handleResize.bind(this)}start(){this.isActive||(this.isActive=!0,this.createElements(),window.addEventListener("resize",this.handleResize),this.renderStep())}stop(e=!1){this.isActive=!1,window.removeEventListener("resize",this.handleResize),this.overlay&&this.overlay.remove(),this.spotlight&&this.spotlight.remove(),this.popover&&this.popover.remove(),e&&this.onComplete?this.onComplete():!e&&this.onSkip&&this.onSkip()}createElements(){this.overlay=document.createElement("div"),this.overlay.className="fixed inset-0 bg-black/60 z-[99990] transition-opacity duration-300",document.body.appendChild(this.overlay),this.spotlight=document.createElement("div"),this.spotlight.className="absolute rounded-xl z-[99991] transition-all duration-500 ease-in-out pointer-events-none bg-transparent",this.spotlight.style.boxShadow="0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255,255,255,0.5) inset",document.body.appendChild(this.spotlight),this.popover=document.createElement("div"),this.popover.className="absolute z-[99992] bg-white rounded-2xl shadow-2xl w-[320px] transition-all duration-500 ease-in-out opacity-0 transform scale-95 border border-gray-100 flex flex-col",document.body.appendChild(this.popover)}async renderStep(){if(this.currentStep>=this.steps.length){this.stop(!0);return}const e=this.steps[this.currentStep];this.popover.style.opacity="0",this.popover.style.transform="scale(0.95)",e.onBefore&&(await e.onBefore(),await this.sleep(600));const a=await this.waitForElement(e.targetSelector,3e3);if(a){a.scrollIntoView({behavior:"smooth",block:"center"}),await this.sleep(300);const o=a.getBoundingClientRect(),r=8;this.spotlight.style.top=`${o.top+window.scrollY-r}px`,this.spotlight.style.left=`${o.left+window.scrollX-r}px`,this.spotlight.style.width=`${o.width+r*2}px`,this.spotlight.style.height=`${o.height+r*2}px`,this.spotlight.style.display="block",this.overlay.style.display="none",this.positionPopover(o)}else this.spotlight.style.display="none",this.overlay.style.display="block",this.popover.style.top="50%",this.popover.style.left="50%",this.popover.style.transform="translate(-50%, -50%) scale(1)";const s=this.currentStep===this.steps.length-1;this.popover.innerHTML=`
            <div class="p-5">
                <div class="flex items-center gap-3 mb-3">
                    <span class="text-3xl">${e.icon||"✨"}</span>
                    <h3 class="text-lg font-bold text-gray-800 leading-tight">${e.title}</h3>
                </div>
                <p class="text-gray-600 text-sm leading-relaxed mb-6">${e.content}</p>
                
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
        `,setTimeout(()=>{a&&(this.popover.style.transform="scale(1)"),this.popover.style.opacity="1"},50),document.getElementById("tour-next-btn").onclick=()=>{this.currentStep++,this.renderStep()},document.getElementById("tour-prev-btn")&&(document.getElementById("tour-prev-btn").onclick=()=>{this.currentStep--,this.renderStep()}),document.getElementById("tour-skip-btn").onclick=()=>this.stop(!1)}positionPopover(e){const a=this.popover.getBoundingClientRect(),s=20;let o=e.bottom+window.scrollY+s,r=e.left+window.scrollX;o+a.height>window.scrollY+window.innerHeight&&(o=e.top+window.scrollY-a.height-s),r+a.width>window.innerWidth&&(r=e.right+window.scrollX-a.width),r<s&&(r=s),this.popover.style.top=`${o}px`,this.popover.style.left=`${r}px`}handleResize(){this.isActive&&this.renderStep()}sleep(e){return new Promise(a=>setTimeout(a,e))}async waitForElement(e,a){if(!e)return null;const s=Date.now();for(;Date.now()-s<a;){const o=document.querySelector(e);if(o)return o;await this.sleep(100)}return null}}async function ci(){try{console.log("A verificar Onboarding interativo...");const t=await Te(g.establishmentId);if(!t||t.parentId||t.onboardingCompleted)return;const e=[{title:"Bem-vindo ao Kairos!",icon:"👋",content:"Preparei um tour rápido para lhe mostrar onde deve configurar as 3 coisas mais importantes antes de receber agendamentos. Vamos a isso?",targetSelector:null},{title:"Perfil e Dados da Loja",icon:"🏢",content:"É aqui em 'Minha Empresa' que você define o nome do Salão, telefone, endereço e faz o upload da sua Logomarca.",targetSelector:'[data-target="estabelecimento-section"]',onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Cores e Personalização",icon:"🎨",content:"Nesta área você pode mudar a cor principal do sistema para ficar com a cara da sua marca. O link do seu cliente vai usar esta cor!",targetSelector:"#themeColor",onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Criação de Serviços",icon:"✂️",content:"Na aba 'Serviços' é onde a mágica acontece. Crie os serviços que os seus clientes vão poder agendar, informando o preço e a duração de cada um.",targetSelector:'[data-target="servicos-section"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Novo Serviço",icon:"➕",content:"Sempre que precisar adicionar um novo serviço ao menu, basta clicar neste botão verde.",targetSelector:'[data-action="new-service"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Gestão da Equipe",icon:"👥",content:"E para terminar: a 'Equipa'. Aqui você cadastra os profissionais, define quem faz qual serviço e ajusta a jornada de trabalho semanal de cada um.",targetSelector:'[data-target="profissionais-section"]',onBefore:async()=>{window.navigateTo("profissionais-section")}},{title:"Tudo Pronto!",icon:"🚀",content:"Você já conhece o caminho! Preencha as informações do seu negócio com calma. Quando terminar, volte à Agenda e partilhe o seu Link de Agendamento com os clientes!",targetSelector:null,onBefore:async()=>{window.navigateTo("agenda-section")}}],a=async()=>{try{await is(g.establishmentId,{onboardingCompleted:!0}),showNotification("Tour Concluído","Você já pode configurar o seu sistema livremente!","success")}catch(o){console.error("Erro ao gravar fim do onboarding",o)}};new di(e,a,a).start()}catch(t){console.error("Erro fatal ao iniciar onboarding:",t)}}var Ke;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(Ke||(Ke={}));class ha extends Error{constructor(e,a,s){super(e),this.message=e,this.code=a,this.data=s}}const ui=t=>{var e,a;return t?.androidBridge?"android":!((a=(e=t?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},pi=t=>{const e=t.CapacitorCustomPlatform||null,a=t.Capacitor||{},s=a.Plugins=a.Plugins||{},o=()=>e!==null?e.name:ui(t),r=()=>o()!=="web",i=u=>{const p=l.get(u);return!!(p?.platforms.has(o())||n(u))},n=u=>{var p;return(p=a.PluginHeaders)===null||p===void 0?void 0:p.find(b=>b.name===u)},d=u=>t.console.error(u),l=new Map,c=(u,p={})=>{const b=l.get(u);if(b)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),b.proxy;const f=o(),h=n(u);let y;const $=async()=>(!y&&f in p?y=typeof p[f]=="function"?y=await p[f]():y=p[f]:e!==null&&!y&&"web"in p&&(y=typeof p.web=="function"?y=await p.web():y=p.web),y),A=(j,S)=>{var I,F;if(h){const V=h?.methods.find(U=>S===U.name);if(V)return V.rtype==="promise"?U=>a.nativePromise(u,S.toString(),U):(U,T)=>a.nativeCallback(u,S.toString(),U,T);if(j)return(I=j[S])===null||I===void 0?void 0:I.bind(j)}else{if(j)return(F=j[S])===null||F===void 0?void 0:F.bind(j);throw new ha(`"${u}" plugin is not implemented on ${f}`,Ke.Unimplemented)}},R=j=>{let S;const I=(...F)=>{const V=$().then(U=>{const T=A(U,j);if(T){const W=T(...F);return S=W?.remove,W}else throw new ha(`"${u}.${j}()" is not implemented on ${f}`,Ke.Unimplemented)});return j==="addListener"&&(V.remove=async()=>S()),V};return I.toString=()=>`${j.toString()}() { [capacitor code] }`,Object.defineProperty(I,"name",{value:j,writable:!1,configurable:!1}),I},C=R("addListener"),E=R("removeListener"),D=(j,S)=>{const I=C({eventName:j},S),F=async()=>{const U=await I;E({eventName:j,callbackId:U},S)},V=new Promise(U=>I.then(()=>U({remove:F})));return V.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await F()},V},P=new Proxy({},{get(j,S){switch(S){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return h?D:C;case"removeListener":return E;default:return R(S)}}});return s[u]=P,l.set(u,{name:u,proxy:P,platforms:new Set([...Object.keys(p),...h?[f]:[]])}),P};return a.convertFileSrc||(a.convertFileSrc=u=>u),a.getPlatform=o,a.handleError=d,a.isNativePlatform=r,a.isPluginAvailable=i,a.registerPlugin=c,a.Exception=ha,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},bi=t=>t.Capacitor=pi(t),ye=bi(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),la=ye.registerPlugin;class mo{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,a){let s=!1;this.listeners[e]||(this.listeners[e]=[],s=!0),this.listeners[e].push(a);const r=this.windowListeners[e];r&&!r.registered&&this.addWindowListener(r),s&&this.sendRetainedArgumentsForEvent(e);const i=async()=>this.removeListener(e,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,a,s){const o=this.listeners[e];if(!o){if(s){let r=this.retainedEventArguments[e];r||(r=[]),r.push(a),this.retainedEventArguments[e]=r}return}o.forEach(r=>r(a))}hasListeners(e){var a;return!!(!((a=this.listeners[e])===null||a===void 0)&&a.length)}registerWindowListener(e,a){this.windowListeners[a]={registered:!1,windowEventName:e,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(e="not implemented"){return new ye.Exception(e,Ke.Unimplemented)}unavailable(e="not available"){return new ye.Exception(e,Ke.Unavailable)}async removeListener(e,a){const s=this.listeners[e];if(!s)return;const o=s.indexOf(a);this.listeners[e].splice(o,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const a=this.retainedEventArguments[e];a&&(delete this.retainedEventArguments[e],a.forEach(s=>{this.notifyListeners(e,s)}))}}const Cs=t=>encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ds=t=>t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class gi extends mo{async getCookies(){const e=document.cookie,a={};return e.split(";").forEach(s=>{if(s.length<=0)return;let[o,r]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");o=Ds(o).trim(),r=Ds(r).trim(),a[o]=r}),a}async setCookie(e){try{const a=Cs(e.key),s=Cs(e.value),o=`; expires=${(e.expires||"").replace("expires=","")}`,r=(e.path||"/").replace("path=",""),i=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${a}=${s||""}${o}; path=${r}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const a of e)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}la("CapacitorCookies",{web:()=>new gi});const mi=async t=>new Promise((e,a)=>{const s=new FileReader;s.onload=()=>{const o=s.result;e(o.indexOf(",")>=0?o.split(",")[1]:o)},s.onerror=o=>a(o),s.readAsDataURL(t)}),fi=(t={})=>{const e=Object.keys(t);return Object.keys(t).map(o=>o.toLocaleLowerCase()).reduce((o,r,i)=>(o[r]=t[e[i]],o),{})},xi=(t,e=!0)=>t?Object.entries(t).reduce((s,o)=>{const[r,i]=o;let n,d;return Array.isArray(i)?(d="",i.forEach(l=>{n=e?encodeURIComponent(l):l,d+=`${r}=${n}&`}),d.slice(0,-1)):(n=e?encodeURIComponent(i):i,d=`${r}=${n}`),`${s}&${d}`},"").substr(1):null,hi=(t,e={})=>{const a=Object.assign({method:t.method||"GET",headers:t.headers},e),o=fi(t.headers)["content-type"]||"";if(typeof t.data=="string")a.body=t.data;else if(o.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[i,n]of Object.entries(t.data||{}))r.set(i,n);a.body=r.toString()}else if(o.includes("multipart/form-data")||t.data instanceof FormData){const r=new FormData;if(t.data instanceof FormData)t.data.forEach((n,d)=>{r.append(d,n)});else for(const n of Object.keys(t.data))r.append(n,t.data[n]);a.body=r;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(o.includes("application/json")||typeof t.data=="object")&&(a.body=JSON.stringify(t.data));return a};class vi extends mo{async request(e){const a=hi(e,e.webFetchExtra),s=xi(e.params,e.shouldEncodeUrlParams),o=s?`${e.url}?${s}`:e.url,r=await fetch(o,a),i=r.headers.get("content-type")||"";let{responseType:n="text"}=r.ok?e:{};i.includes("application/json")&&(n="json");let d,l;switch(n){case"arraybuffer":case"blob":l=await r.blob(),d=await mi(l);break;case"json":d=await r.json();break;case"document":case"text":default:d=await r.text()}const c={};return r.headers.forEach((u,p)=>{c[p]=u}),{data:d,headers:c,status:r.status,url:r.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}la("CapacitorHttp",{web:()=>new vi});const de=la("PushNotifications",{}),yi="modulepreload",wi=function(t){return"/"+t},Ts={},ki=function(e,a,s){let o=Promise.resolve();if(a&&a.length>0){let d=function(l){return Promise.all(l.map(c=>Promise.resolve(c).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),n=i?.nonce||i?.getAttribute("nonce");o=d(a.map(l=>{if(l=wi(l),l in Ts)return;Ts[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":yi,c||(p.as="script"),p.crossOrigin="",p.href=l,n&&p.setAttribute("nonce",n),document.head.appendChild(p),c)return new Promise((b,f)=>{p.addEventListener("load",b),p.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(i){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=i,window.dispatchEvent(n),!n.defaultPrevented)throw i}return o.then(i=>{for(const n of i||[])n.status==="rejected"&&r(n.reason);return e().catch(r)})},Ps=la("App",{web:()=>ki(()=>import("./web-DA5pl4Ya.js"),__vite__mapDeps([0,1,2,3])).then(t=>new t.AppWeb)}),$i="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let Bs=!1;async function Si(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await de.removeAllListeners(),await de.addListener("registration",async a=>{xo(a.value,!0)}),await de.addListener("pushNotificationReceived",a=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",a)}),await de.addListener("pushNotificationActionPerformed",a=>{const s=a.notification.data;console.log("Notificação clicada (Ação):",s)});let e=await de.checkPermissions();e.receive==="prompt"&&(e=await de.requestPermissions()),e.receive==="granted"&&await de.register()}catch(e){console.error("[Push Nativo] Erro:",e)}return}"Notification"in window&&Notification.permission==="granted"&&fo()}async function Ei(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await fo(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(t){return console.error("Erro ao pedir permissão Web:",t),!1}}async function fo(){if("serviceWorker"in navigator)try{const t=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await t.update();const e=await Hr(Is,{vapidKey:$i,serviceWorkerRegistration:t});e?(console.log("[Push Web] Token validado."),await xo(e,!1)):console.warn("[Push Web] Token veio vazio."),Bs||(Or(Is,a=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",a)}),Bs=!0)}catch(t){console.error("[Push Web] Falha no registo:",t)}else console.warn("Navegador sem suporte a Service Worker.")}async function xo(t,e){const a=ge.currentUser;if(!a){console.warn("Usuário não logado. Token não salvo.");return}const s=Lt(Ee,"users",a.uid);try{const o=await co(s);if(o.exists()){const i=o.data().fcmTokens||[];if(i.length===1&&i[0]===t){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await os(s,{fcmTokens:[t],lastLoginAt:new Date().toISOString(),platform:e?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(o){if(o.code==="not-found")try{await Mr(s,{email:a.email,fcmTokens:[t],platform:e?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(r){console.error("Erro ao criar user:",r)}else console.error("Erro ao atualizar token:",o)}}const Ii=(t,e,a="all",s="all")=>{const o=new URLSearchParams({startDate:t,endDate:e});return a&&a!=="all"&&o.append("professionalId",a),s&&s!=="all"&&o.append("costCenterId",s),L(`/api/reports/indicators?${o.toString()}`)},Li=(t,e="all")=>{const a=new URLSearchParams({date:t});return e&&e!=="all"&&a.append("professionalId",e),L(`/api/reports/appointments/list?${a.toString()}`)},Ci=t=>t?L(`/api/financial/cost-centers/${t}`):Promise.resolve([]),Di=(t,e,a)=>{const s=new URLSearchParams({startDate:e,endDate:a});return L(`/api/analytics/${t}?${s.toString()}`)},Yt=({establishmentId:t,startDate:e,endDate:a,cashierSessionId:s})=>{const o=new URLSearchParams({startDate:e,endDate:a});return s&&s!=="all"&&o.append("cashierSessionId",s),t&&o.append("establishmentId",t),L(`/api/reports/sales?${o.toString()}`)},Ti=(t,e,a)=>L(`/api/analytics/${t}/monthly-details?year=${e}&month=${a}`),Pi=(t,e,a,s)=>{const o=`/api/analytics/${t}/daily-details?year=${e}&month=${a}&day=${s}`;return L(o)},Bi=(t,e,a,s)=>{const o=`/api/analytics/${t}/professional-details?year=${e}&month=${a}&professionalId=${s}`;return L(o)},Ai=(t,e,a,s)=>L(`/api/reports/commissions/${t}?year=${e}&month=${a}&professionalId=${s}`),ho=()=>L("/api/reports/summary",{method:"GET"}),Mi=Object.freeze(Object.defineProperty({__proto__:null,getAdvancedIndicators:Ii,getAnalytics:Di,getCommissionReport:Ai,getCostCenters:Ci,getDailyAppointments:Li,getDailyTransactions:Pi,getMonthlyAnalytics:Ti,getProfessionalMonthlyDetails:Bi,getSalesReport:Yt,getSummaryKPIs:ho},Symbol.toStringTag,{value:"Module"})),ns=t=>t?String(t).replace(/\D/g,""):"",it=(t,e="",a=20,s={})=>{const o=new URLSearchParams;return e&&o.append("search",e),a&&o.append("limit",a),s&&s.hasLoyalty&&o.append("hasLoyalty","true"),s&&s.birthMonth&&o.append("birthMonth",s.birthMonth),s&&s.inactiveDays&&o.append("inactiveDays",s.inactiveDays),L(`/api/clients/${t}?${o.toString()}`)},vo=(t,e)=>{const a=encodeURIComponent(e);return L(`/api/clients/details/${t}/${a}`)},yo=t=>{const e=t.phone||t.id;if(!e)throw new Error("Telefone é obrigatório");const a=ns(e),s={...t,phone:a,id:a};return L(`/api/clients/${a}`,{method:"PUT",body:JSON.stringify(s)})},wo=yo,ko=(t,e)=>yo({...e,id:t}),$o=t=>{const e=encodeURIComponent(t);return L(`/api/clients/${e}`,{method:"DELETE"})},qi=(t,e,a,s)=>L("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:t,clientPhone:ns(e),points:a,rewardName:s})}),ji=(t,e)=>vo(t,ns(e));function v(t){return t==null?"":String(t).replace(/[&<>'"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[e])}function ls(t,e=800,a=800,s=.7){return new Promise((o,r)=>{if(!t.type.match(/image.*/))return r(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.readAsDataURL(t),i.onload=n=>{const d=new Image;d.src=n.target.result,d.onload=()=>{let l=d.width,c=d.height;l>c?l>e&&(c*=e/l,l=e):c>a&&(l*=a/c,c=a);const u=document.createElement("canvas");u.width=l,u.height=c,u.getContext("2d").drawImage(d,0,0,l,c);const b=u.toDataURL("image/jpeg",s);o(b)},d.onerror=l=>r(new Error("Erro ao carregar a imagem para processamento."))},i.onerror=n=>r(new Error("Erro ao ler o ficheiro."))})}function va(t){const e=parseFloat(t);return isNaN(e)?"R$ 0,00":e.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}let ya=null;async function Ni(){const t=document.getElementById("content");t.innerHTML=`
        <div class="flex items-center justify-center h-full min-h-[60vh]">
            <div class="flex flex-col items-center">
                <div class="w-10 h-10 border-4 border-indigo-50 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                <p class="text-slate-400 font-medium text-sm">A processar dados consolidados...</p>
            </div>
        </div>
    `;try{const e=new Date,a=new Date(e.getFullYear(),e.getMonth(),e.getDate()),s=new Date(a);s.setHours(23,59,59,999);const o=new Date(a.getFullYear(),a.getMonth(),1),r=new Date(a);r.setDate(a.getDate()-6);const i=g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId],n=i.map(async T=>{const[W,ne]=await Promise.all([rs(T,o.toISOString(),s.toISOString(),null),it(T)]);return{appts:W||[],clients:ne||[]}}),d=await Promise.all(n);let l=[],c=[];d.forEach(T=>{l=l.concat(T.appts),c=c.concat(T.clients)});const u=T=>(T.services||[]).reduce((W,ne)=>W+(Number(ne.price)||0),0)||Number(T.totalPrice||0)||Number(T.servicePrice||0),p=l.filter(T=>{const W=new Date(T.startTime);return W>=a&&W<=s}),b=p.filter(T=>T.status==="completed"),f=l.filter(T=>T.status==="completed"),h=b.reduce((T,W)=>T+u(W),0),y=f.reduce((T,W)=>T+u(W),0),$=p.length,A=f.length>0?y/f.length:0,R=[],C=[],E=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];for(let T=0;T<7;T++){const W=new Date(r);W.setDate(r.getDate()+T),R.push(E[W.getDay()]);const ne=new Date(W).setHours(0,0,0,0),ue=new Date(W).setHours(23,59,59,999),Dt=l.filter(Ae=>{const Q=new Date(Ae.startTime).getTime();return Ae.status==="completed"&&Q>=ne&&Q<=ue}).reduce((Ae,Q)=>Ae+u(Q),0);C.push(Dt)}const D={labels:R,data:C},P=p.filter(T=>new Date(T.startTime).getTime()>=e.getTime()&&T.status!=="completed"&&T.status!=="cancelled").sort((T,W)=>new Date(T.startTime)-new Date(W.startTime)).slice(0,4).map(T=>({client:T.clientName||"Desconhecido",service:T.serviceName||(T.services&&T.services[0]?T.services[0].name:"Serviço"),time:new Date(T.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),prof:(T.professionalName||"").split(" ")[0]||"Profissional",id:T.id})),j=`${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}`,S=new Map;c.forEach(T=>{T.phone?S.set(T.phone,T):S.set(T.id||Math.random().toString(),T)});const F=Array.from(S.values()).filter(T=>{if(!T.birthDate)return!1;let W,ne;if(T.birthDate.includes("-")){const ue=T.birthDate.split("-");ue[0].length===4?(W=ue[1],ne=ue[2]):(ne=ue[0],W=ue[1])}else if(T.birthDate.includes("/")){const ue=T.birthDate.split("/");ne=ue[0],W=ue[1]}return`${ne}/${W}`===j}).map(T=>{let W="";return T.birthDate&&T.birthDate.includes("-")&&T.birthDate.split("-")[0].length===4&&(W=a.getFullYear()-parseInt(T.birthDate.split("-")[0])),{name:T.name,age:W,phone:T.phone}}),V={receitaHoje:h,agendamentosHoje:$,receitaMes:y,ticketMedio:A},U=i.length>1;Ri(t,V,D,P,F,U),Fi(D),Hi()}catch(e){console.error("Erro ao carregar dashboard:",e),t.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full min-h-[60vh] text-slate-500">
                <i class="bi bi-exclamation-circle text-4xl mb-3 text-rose-400"></i>
                <p class="font-medium text-sm">Ocorreu um erro ao carregar os dados.</p>
                <button onclick="window.navigateTo('dashboard-section')" class="mt-4 px-5 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">Tentar Novamente</button>
            </div>
        `}}function Ri(t,e,a,s,o,r){const i=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),n=r?'<span class="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 align-middle">CONSOLIDADO</span>':"";t.innerHTML=`
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
                    <h3 class="text-2xl md:text-[1.7rem] font-semibold text-slate-700 mt-1">${i.format(e.receitaHoje)}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100 flex flex-col justify-center hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-9 h-9 rounded-[10px] bg-indigo-50 text-indigo-500 flex items-center justify-center">
                            <i class="bi bi-calendar-check text-lg"></i>
                        </div>
                        <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Agendamentos</span>
                    </div>
                    <h3 class="text-2xl md:text-[1.7rem] font-semibold text-slate-700 mt-1">${e.agendamentosHoje}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100 flex flex-col justify-center hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-9 h-9 rounded-[10px] bg-blue-50 text-blue-500 flex items-center justify-center">
                            <i class="bi bi-graph-up-arrow text-lg"></i>
                        </div>
                        <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Receita (Mês)</span>
                    </div>
                    <h3 class="text-2xl md:text-[1.7rem] font-semibold text-slate-700 mt-1">${i.format(e.receitaMes)}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100 flex flex-col justify-center hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-9 h-9 rounded-[10px] bg-amber-50 text-amber-500 flex items-center justify-center">
                            <i class="bi bi-receipt text-lg"></i>
                        </div>
                        <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Ticket Médio</span>
                    </div>
                    <h3 class="text-2xl md:text-[1.7rem] font-semibold text-slate-700 mt-1">${i.format(e.ticketMedio)}</h3>
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
                                            <p class="font-medium text-slate-700 text-sm group-hover:text-indigo-700 transition-colors">${v(d.client)}</p>
                                            <p class="text-[11px] text-slate-500 font-normal mt-0.5">${v(d.service)} <span class="mx-1 text-slate-300">•</span> ${v(d.prof)}</p>
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
                                            ${v(d.name).charAt(0)}
                                        </div>
                                        <div>
                                            <p class="font-medium text-slate-700 text-[0.8rem]">${v(d.name)}</p>
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
    `}function Fi(t){const e=document.getElementById("revenueChart");if(!e)return;ya&&ya.destroy();const s=e.getContext("2d").createLinearGradient(0,0,0,240);s.addColorStop(0,"rgba(79, 70, 229, 0.15)"),s.addColorStop(1,"rgba(79, 70, 229, 0.01)"),ya=new Chart(e,{type:"line",data:{labels:t.labels,datasets:[{label:"Receita (R$)",data:t.data,borderColor:"#6366f1",backgroundColor:s,borderWidth:2.5,pointBackgroundColor:"#ffffff",pointBorderColor:"#6366f1",pointBorderWidth:2,pointRadius:3,pointHoverRadius:5,fill:!0,tension:.35}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{backgroundColor:"#1e293b",padding:12,cornerRadius:8,titleFont:{size:12,family:"Inter",weight:"normal"},bodyFont:{size:13,weight:"bold",family:"Inter"},displayColors:!1,callbacks:{label:function(o){return o.parsed.y!==null?new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(o.parsed.y):""}}}},scales:{y:{beginAtZero:!0,grid:{color:"#f8fafc",drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Inter",size:10},maxTicksLimit:6,callback:function(o){return"R$ "+o}}},x:{grid:{display:!1,drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Inter",size:11,weight:"500"}}}},interaction:{intersect:!1,mode:"index"}}})}function Hi(){document.getElementById("content").addEventListener("click",e=>{const a=e.target.closest("[data-action]");if(!a)return;switch(a.dataset.action){case"goto-agenda":ee("agenda-section");break;case"new-appointment":ee("agenda-section");break;case"goto-pdv":ee("comandas-section");break;case"goto-clients":ee("clientes-section");break;case"open-link":const o=`${window.location.origin}/cliente.html?id=${g.establishmentId||""}`;window.open(o,"_blank");break}})}const nt=t=>L(`/api/services/${t}`),Oi=t=>L("/api/services",{method:"POST",body:JSON.stringify(t)}),zi=(t,e)=>L(`/api/services/${t}`,{method:"PUT",body:JSON.stringify(e)}),So=t=>L(`/api/services/${t}`,{method:"DELETE"}),we=t=>L(`/api/professionals/${t}`),_i=t=>L(`/api/professionals/details/${t}`),Vi=t=>L("/api/professionals",{method:"POST",body:JSON.stringify(t)}),Ui=(t,e)=>L(`/api/professionals/${t}`,{method:"PUT",body:JSON.stringify(e)}),Eo=t=>L(`/api/professionals/${t}`,{method:"DELETE"}),Wi=t=>{const e=t.map(a=>Eo(a));return Promise.all(e)},da=(t,e,a,s="all")=>{const o=`/api/blockages/${t}?startDate=${e}&endDate=${a}&professionalId=${s}`;return L(o)},ca=t=>L("/api/blockages",{method:"POST",body:JSON.stringify(t)}),ds=t=>L(`/api/blockages/${t}`,{method:"DELETE"}),Io=t=>L("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:t})}),As=document.getElementById("content");let Ms=!1;const Pa=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5",light:"#c7d2fe"},{bg:"#d1fae5",border:"#059669",main:"#059669",light:"#a7f3d0"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48",light:"#fecdd3"},{bg:"#fef3c7",border:"#d97706",main:"#d97706",light:"#fde68a"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490",light:"#a5f3fc"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7",light:"#bae6fd"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed",light:"#ddd6fe"},{bg:"#fce7f3",border:"#db2777",main:"#db2777",light:"#fbcfe8"}];let ua=[],Ba=[],Kt={},Lo=[],N={currentView:window.innerWidth<768?"list":"week",currentDate:new Date,selectedProfessionalId:"all",showInactiveProfs:!1,isSelectionMode:!1,selectedItems:new Set},H={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function cs(t){const e=new Date(t),a=e.getDay(),s=e.getDate()-a+(a===0?-6:1);return e.setDate(s),e.setHours(0,0,0,0),e}function us(){const t=document.getElementById("profSelectorContainer");if(!t||!g.professionals)return;let e=g.professionals.filter(o=>N.showInactiveProfs||o.status!=="inactive");const s=[...[{id:"all",name:"Todos",photo:null}],...e];t.innerHTML=s.map(o=>{const r=N.selectedProfessionalId===o.id,i=o.name==="Todos"?"T":o.name.charAt(0).toUpperCase(),n=o.id!=="all"?g.professionalColors.get(o.id)||Pa[0]:{main:"#adb5bd",light:"#f1f3f5"};return`
            <div class="prof-pill ${r?"active":""}"
                 data-action="select-professional" data-prof-id="${o.id}"
                 style="--pc: ${n.main}; --pb: ${r?n.bg:""}; --pl: ${n.light};">
                <div class="prof-pill-dot" ${o.photo?`style="background-image: url('${X(o.photo)}'); background-size: cover; background-position: center;"`:""}>
                    ${o.photo?"":i}
                </div>
                <span>${X(o.name==="Todos"?"Todos":o.name.split(" ")[0])}</span>
            </div>`}).join("")}function X(t){return v(t||"")}function Ji(t,e,a,s,o){const r=(t||"").replace(/\D/g,""),i=new Date(o).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),n=new Date(o).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=`Olá, ${e}! Você tem um agendamento de ${a} com ${s} para ${i} às ${n}. Podemos confirmar?`;return`https://wa.me/${r}?text=${encodeURIComponent(d)}`}function Qi(t){const e=document.getElementById("agenda-view");if(!e)return;const a=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],s=cs(N.currentDate),o=new Date;o.setHours(0,0,0,0);let r='<div class="week-container" id="weekScroller">';for(let i=0;i<7;i++){const n=new Date(s);n.setDate(s.getDate()+i);const d=n.toDateString()===o.toDateString(),l=t.filter(u=>new Date(u.startTime).toDateString()===n.toDateString()).sort((u,p)=>new Date(u.startTime)-new Date(p.startTime));let c="";l.length===0?c='<div class="week-empty"><i class="bi bi-dash-lg" style="font-size:1rem;display:block;margin-bottom:4px;"></i>Sem agendamentos</div>':c=l.map(u=>{const b=new Date(u.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),f=g.professionalColors.get(u.professionalId)||{main:"#adb5bd"},h=u.status==="completed",y=N.selectedItems.has(u.id);if(u.type==="blockage")return`<div class="week-event-chip week-blockage">
                        <div class="we-time"><i class="bi bi-lock me-1"></i>${b}</div>
                        <div class="we-client">${X(u.reason)}</div>
                        <div class="we-service">${X(u.professionalName)}</div>
                    </div>`;const $=JSON.stringify(u).replace(/'/g,"&apos;"),A=y?"box-shadow: 0 0 0 2px #4f46e5; background-color: #eff6ff;":"",R=N.isSelectionMode?`<div style="position:absolute; top:6px; right:6px; z-index:1;">
                           <input type="checkbox" style="width:16px; height:16px; accent-color:#4f46e5; pointer-events:none;" ${y?"checked":""}>
                       </div>`:"";return`<div class="week-event-chip ${h?"completed":""}" style="--ec: ${f.main}; ${A}"
                    data-action="edit-appointment" data-appointment='${$}'>
                    ${R}
                    <div class="we-time">${b}</div>
                    <div class="we-client" style="${N.isSelectionMode?"padding-right:20px;":""}">${X(u.clientName)}</div>
                    <div class="we-service">${X(u.serviceName)} · ${X((u.professionalName||"").split(" ")[0])}</div>
                    ${N.isSelectionMode?"":`
                    <div class="we-actions">
                        <button class="we-btn" data-action="open-comanda" data-appointment='${$}' title="Comanda">
                            <i class="bi bi-receipt"></i>
                        </button>
                    </div>`}
                </div>`}).join(""),r+=`<div class="week-day-col">
            <div class="week-day-header ${d?"is-today":""}">
                <div class="wd-name">${d?"Hoje":a[i]}</div>
                <div class="wd-num">${n.getDate()}</div>
            </div>
            <div class="week-day-events">${c}</div>
        </div>`}r+="</div>",e.innerHTML=r,requestAnimationFrame(()=>{const i=document.getElementById("weekScroller");if(i&&window.innerWidth<768){const n=i.querySelector(".is-today");n&&n.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}})}function Gi(t){const e=document.getElementById("agenda-view");if(!e)return;if(t.sort((o,r)=>new Date(o.startTime)-new Date(r.startTime)),t.length===0){e.innerHTML=`
            <div class="list-container" style="min-height:50vh;display:flex;align-items:center;justify-content:center;">
                <div class="text-center" style="max-width:220px;">
                    <div style="width:52px;height:52px;background:#f1f3f5;border-radius:14px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px;">
                        <i class="bi bi-calendar-check" style="font-size:1.3rem;color:#adb5bd;"></i>
                    </div>
                    <p style="font-size:0.85rem;font-weight:600;color:#495057;margin-bottom:4px;">Nenhum agendamento</p>
                    <p style="font-size:0.7rem;color:#868e96;">Toque em + para criar um novo.</p>
                </div>
            </div>`;return}const a={};t.forEach(o=>{const r=new Date(o.startTime).toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});a[r]||(a[r]=[]),a[r].push(o)});let s='<div class="list-container">';Object.entries(a).forEach(([o,r])=>{s+=`<div class="list-date-group">
            <div class="list-date-label">${o}</div>`,r.forEach(i=>{const n=new Date(i.startTime),d=new Date(i.endTime),l=Math.round((d-n)/6e4),c=n.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),u=g.professionalColors.get(i.professionalId)||{main:"#adb5bd"},p=i.status==="completed",b=JSON.stringify(i).replace(/'/g,"&apos;"),f=N.selectedItems.has(i.id),h=N.isSelectionMode?`<div style="display:flex; align-items:center; margin-right: 12px; margin-left: 4px;">
                       <input type="checkbox" style="width:20px; height:20px; accent-color:#4f46e5; pointer-events:none;" ${f?"checked":""}>
                   </div>`:"",y=f?"box-shadow: 0 0 0 2px #4f46e5; background-color: #eff6ff;":"";if(i.type==="blockage"){s+=`<div class="list-card blockage">
                    ${h}
                    <div class="list-card-time"><div class="t-start" style="color:#c92a2a;">${c}</div><div class="t-dur">Bloqueio</div></div>
                    <div class="list-card-dot" style="--dc:#e03131;"></div>
                    <div class="list-card-info">
                        <div class="lc-name" style="color:#c92a2a;">${X(i.reason)}</div>
                        <div class="lc-detail">${X(i.professionalName)}</div>
                    </div>
                </div>`;return}const $=Ji(i.clientPhone,i.clientName,i.serviceName,i.professionalName,i.startTime),A=(i.services||[]).reduce((D,P)=>D+(Number(P.price)||0),0)||Number(i.totalPrice||0)||Number(i.servicePrice||0),R=i.paymentStatus||(i.status==="completed"?"Finalizado":"Agendado"),C=X((i.professionalName||"").split(" ")[0]),E=(i.services||[]).length||(i.serviceName?1:0);s+=`<div class="list-card ${p?"completed":""}" style="${y}"
                data-action="edit-appointment" data-appointment='${b}'>
                ${h}
                <div class="list-card-time">
                    <div class="t-start ${p?"opacity-50 line-through":""}">${c}</div>
                    <div class="t-dur">${l} min</div>
                </div>
                <div class="list-card-dot" style="--dc: ${u.main};"></div>
                <div class="list-card-info">
                    <div class="lc-name">${X(i.clientName)}</div>
                    <div class="lc-detail">${X(i.serviceName)} · ${C}</div>
                    <div class="lc-extra" style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
                        <span style="font-size: 0.65rem; color: #4b5563; background: #f3f4f6; padding: 2px 8px; border-radius: 6px; font-weight: 500;">R$ ${A.toFixed(2).replace(".",",")}</span>
                        ${i.clientPhone?`<span style="font-size: 0.65rem; color: #4b5563; background: #f3f4f6; padding: 2px 8px; border-radius: 6px; font-weight: 500;"><i class="bi bi-telephone"></i> ${X(i.clientPhone)}</span>`:""}
                        <span style="font-size: 0.65rem; color: #4b5563; background: #f3f4f6; padding: 2px 8px; border-radius: 6px; font-weight: 500;">${E} serv.</span>
                        <span style="font-size: 0.65rem; color: ${p?"#059669":"#d97706"}; background: ${p?"#d1fae5":"#fef3c7"}; padding: 2px 8px; border-radius: 6px; font-weight: 600;">${X(R)}</span>
                    </div>
                </div>
                <div class="list-card-status">
                    <div class="lc-status-dot ${p?"done":""}"></div>
                </div>
                ${!p&&!N.isSelectionMode?`
                <div class="list-card-actions">
                    <button class="lc-action-btn wa" data-link="${$}" title="WhatsApp">
                        <i class="bi bi-whatsapp" style="font-size:0.85rem;"></i>
                    </button>
                    <button class="lc-action-btn comanda" data-action="open-comanda" data-appointment='${b}' title="Comanda">
                        <i class="bi bi-receipt"></i>
                    </button>
                </div>`:""}
            </div>`}),s+="</div>"}),s+="</div>",e.innerHTML=s}function Co(){const t=g.allEvents.filter(e=>N.selectedProfessionalId==="all"||e.professionalId===N.selectedProfessionalId);N.currentView==="list"?Gi(t):Qi(t),ps()}function ps(){const t=document.getElementById("batch-delete-container"),e=document.getElementById("agendaFab");t&&(N.isSelectionMode&&N.selectedItems.size>0?(t.innerHTML=`<div class="bg-gray-900 text-white p-3 rounded-xl shadow-xl flex items-center justify-between gap-4 w-full mx-4" style="background:#212529;color:#fff;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:12px;">
            <span class="font-semibold text-sm"><span style="color:#7c3aed; font-size:1.1rem; margin-right:4px;">${N.selectedItems.size}</span> selecionados</span>
            <button data-action="batch-delete" style="background:#e03131;color:#fff;border:none;padding:8px 20px;border-radius:8px;font-size:0.85rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;">
                <i class="bi bi-trash"></i> Excluir
            </button>
        </div>`,t.style.display="block",e&&(e.style.transform="scale(0)")):(t.style.display="none",e&&(e.style.transform="scale(1)")))}function Xi(){const t=document.getElementById("currentDateDisplay");if(!t)return;const e=new Date;e.setHours(0,0,0,0);const a=new Date(N.currentDate);if(a.setHours(0,0,0,0),N.currentView==="list")a.toDateString()===e.toDateString()?t.textContent="Hoje":t.textContent=a.toLocaleDateString("pt-BR",{day:"numeric",month:"long"});else{const s=cs(a),o=new Date(s);o.setDate(s.getDate()+6);const r=s.toLocaleDateString("pt-BR",{day:"numeric",month:"short"}),i=o.toLocaleDateString("pt-BR",{day:"numeric",month:"short"});t.textContent=`${r} - ${i}`}}async function Ce(){const t=document.getElementById("agenda-view");if(!t)return;N.selectedItems.clear(),ps(),t.innerHTML='<div style="display:flex;align-items:center;justify-content:center;padding:60px 0;"><div style="width:28px;height:28px;border:2.5px solid #e9ecef;border-top:2.5px solid #4f46e5;border-radius:50%;animation:spin 0.7s linear infinite;"></div></div><style>@keyframes spin{to{transform:rotate(360deg)}}</style>',Xi();let e,a;if(N.currentView==="list")e=new Date(N.currentDate),e.setHours(0,0,0,0),a=new Date(e),a.setHours(23,59,59,999);else{const s=cs(N.currentDate);e=new Date(s),a=new Date(s),a.setDate(s.getDate()+6),a.setHours(23,59,59,999)}try{const o=(g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId]).map(async l=>{const[c,u]=await Promise.all([rs(l,e.toISOString(),a.toISOString(),N.selectedProfessionalId==="all"?null:N.selectedProfessionalId),da(l,e.toISOString(),a.toISOString(),N.selectedProfessionalId)]);return{appts:c||[],blockages:u||[]}}),r=await Promise.all(o);let i=[],n=[];if(r.forEach(l=>{i=i.concat(l.appts),n=n.concat(l.blockages)}),!document.getElementById("agenda-view"))return;const d=l=>l.map(c=>({...c,type:c.type||"appointment",professionalName:c.professionalName||(()=>{const u=g.professionals?.find(p=>p.id===c.professionalId);return u?u.name:"Indefinido"})()}));g.allEvents=[...d(i),...d(n)],us(),Co()}catch(s){console.error(s),document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML=`
                <div class="text-center py-12" style="color:#868e96;">
                    <i class="bi bi-exclamation-triangle" style="font-size:1.5rem;"></i>
                    <p class="mt-2" style="font-size:0.8rem;">Erro ao carregar agenda.</p>
                </div>`)}}async function Yi(){try{const e=(g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId]).map(async i=>{const[n,d,l]=await Promise.all([we(i),nt(i),Te(i)]);return{profs:n||[],services:d||[],estDetails:l}}),a=await Promise.all(e),s=new Map,o=new Map;let r=a[0]?.estDetails;a.forEach(i=>{i.profs.forEach(n=>s.set(n.id,n)),i.services.forEach(n=>o.set(n.id,n))}),g.professionals=Array.from(s.values()),g.services=Array.from(o.values()),Lo=[],r&&(Kt=r.loyaltyProgram||{enabled:!1}),g.professionals.forEach((i,n)=>{g.professionalColors.set(i.id,Pa[n%Pa.length])}),us()}catch{m("Atenção","Não foi possível carregar os dados da equipa.","error")}}async function Do(t={}){N.currentDate=t.targetDate?new Date(t.targetDate):N.currentDate||new Date,N.isSelectionMode=!1,N.selectedItems.clear(),As.innerHTML=`
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
        </div>`,document.getElementById("btnPrevDate").addEventListener("click",()=>{N.currentView==="list"?N.currentDate.setDate(N.currentDate.getDate()-1):N.currentDate.setDate(N.currentDate.getDate()-7),Ce()}),document.getElementById("btnNextDate").addEventListener("click",()=>{N.currentView==="list"?N.currentDate.setDate(N.currentDate.getDate()+1):N.currentDate.setDate(N.currentDate.getDate()+7),Ce()}),document.getElementById("btnTodayHeader").addEventListener("click",()=>{N.currentDate=new Date,Ce()});const e=document.querySelectorAll(".agenda-view-toggle button");e.forEach(a=>{a.addEventListener("click",()=>{e.forEach(s=>{s.classList.remove("active","shadow-sm"),s.style.backgroundColor="transparent"}),a.classList.add("active","shadow-sm"),a.style.backgroundColor="#fff",N.currentView=a.dataset.view,Ce()})}),document.getElementById("btnWeekDays").addEventListener("click",()=>{Ki()}),Ms||(As.addEventListener("click",async a=>{const s=a.target.closest('[data-action="open-comanda"]');if(s){a.stopPropagation();const d=s.dataset.appointment||s.closest("[data-appointment]")?.dataset.appointment;if(!d)return;const l=JSON.parse(d.replace(/&apos;/g,"'")),c=l.status==="completed"?"finalizadas":"em-atendimento",u={selectedAppointmentId:l.id,initialFilter:c};c==="finalizadas"&&l.transaction?.paidAt&&(u.filterDate=typeof l.transaction.paidAt=="object"?new Date(l.transaction.paidAt._seconds*1e3):l.transaction.paidAt),ee("comandas-section",u);return}const o=a.target.closest(".lc-action-btn.wa");if(o){a.stopPropagation(),o.dataset.link&&window.open(o.dataset.link,"_blank");return}if(a.target.closest('[data-action="batch-delete"]')){const d=N.selectedItems.size;await Y("Excluir Selecionados",`Tem certeza que deseja excluir ${d} agendamento(s)? Esta ação não pode ser desfeita.`)&&(await Promise.all(Array.from(N.selectedItems).map(async c=>{try{await Qr(c)}catch{}})),m(`${d} agendamento(s) excluído(s).`,"success"),N.selectedItems.clear(),N.isSelectionMode=!1,Ce());return}const r=a.target.closest('[data-action="select-professional"]');if(r){const d=r.dataset.profId;N.selectedProfessionalId=N.selectedProfessionalId===d&&d!=="all"?"all":d,Ce();return}const i=a.target.closest(".list-card[data-appointment], .week-event-chip[data-appointment]");if(i){if(N.isSelectionMode){a.stopPropagation();const l=i.querySelector('input[type="checkbox"]');if(l){const c=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'")),u=!l.checked;l.checked=u,u?N.selectedItems.add(c.id):N.selectedItems.delete(c.id),(i.classList.contains("week-event-chip")||i.classList.contains("list-card"))&&(u?(i.style.boxShadow="0 0 0 2px #4f46e5",i.style.backgroundColor="#eff6ff"):(i.style.boxShadow="none",i.style.backgroundColor=i.classList.contains("week-event-chip")?"#f8f9fa":"#fff")),ps()}return}const d=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'"));Aa(d);return}if(a.target.closest('[data-action="new-appointment"]')){Aa();return}}),Ms=!0),await Yi(),await Ce()}function Ki(){const t=document.getElementById("optionsSheet");if(t){t.remove();return}const e=document.createElement("div");e.id="optionsSheet",e.style.cssText="position:fixed;bottom:0;left:50%;right:auto;transform:translateX(-50%) translateY(100%);width:100%;max-width:440px;background:#fff;border-radius:24px 24px 0 0;z-index:10000;box-shadow:0 -8px 40px rgba(0,0,0,0.15);transition:transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);";const a=N.isSelectionMode?"#fee2e2":"#f0fdf4",s=N.isSelectionMode?"#ef4444":"#16a34a",o=N.isSelectionMode?"bi-x-circle":"bi-check2-square";e.innerHTML=`
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
        </div>`;const r=document.createElement("div");r.id="optionsOverlay",r.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:9999;opacity:0;transition:opacity 0.3s;",document.body.appendChild(r),document.body.appendChild(e),requestAnimationFrame(()=>{e.style.transform="translateX(-50%) translateY(0)",r.style.opacity="1"});const i=()=>{e.style.transform="translateX(-50%) translateY(100%)",r.style.opacity="0",setTimeout(()=>{e.remove(),r.remove()},300)};document.getElementById("closeOptSheet").addEventListener("click",i),r.addEventListener("click",i),document.getElementById("optSelectMode").addEventListener("click",()=>{N.isSelectionMode=!N.isSelectionMode,N.isSelectionMode||N.selectedItems.clear(),i(),Co(),N.isSelectionMode&&setTimeout(()=>{m("Modo de Exclusão Ativo.","info")},300)}),document.getElementById("optInactiveToggle").addEventListener("change",n=>{N.showInactiveProfs=n.target.checked,us()})}function qs(t){t<1||t>4||(H.step=t,Aa(null,!0))}function Zi(t){return{title:t?"Editar Reserva":"Identificar Cliente",content:`
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
        </div>`}}function en(){return{title:"Serviços",content:`
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
                ${ua.map(t=>`<div class="service-card p-3 bg-white rounded-xl border ${H.data.selectedServiceIds.includes(t.id)?"border-indigo-500 bg-indigo-50":"border-gray-200"} cursor-pointer" data-service-id="${t.id}">
                        <p class="font-semibold text-sm text-gray-800 truncate">${X(t.name)}</p>
                        <p class="text-xs text-gray-500 mt-0.5">R$ ${t.price.toFixed(2)} · ${t.duration} min</p>
                    </div>`).join("")}
            </div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="2" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="2" class="py-2.5 px-5 bg-gray-900 text-white font-semibold text-sm rounded-lg">Avançar</button>
        </div>`}}function tn(){return{title:"Profissional",content:`
        <div class="p-5 space-y-5">
            <div class="relative">
                <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input type="search" id="professionalSearchModalInput" placeholder="Buscar na equipa..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg text-sm">
            </div>
            <div id="apptProfessionalContainer" class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-52 overflow-y-auto professional-step-cards">
                ${Ba.map(t=>`<div class="professional-modal-card p-3 bg-white rounded-xl border ${H.data.professionalId===t.id?"border-indigo-500 bg-indigo-50":"border-gray-200"} cursor-pointer text-center" data-professional-id="${t.id}">
                        <div class="w-10 h-10 rounded-full bg-gray-100 mx-auto flex items-center justify-center font-bold text-sm text-gray-500">${X(t.name).charAt(0)}</div>
                        <p class="text-sm font-semibold mt-2 truncate">${X(t.name.split(" ")[0])}</p>
                    </div>`).join("")}
            </div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="3" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="3" class="py-2.5 px-5 bg-gray-900 text-white font-semibold text-sm rounded-lg">Avançar</button>
        </div>`}}function an(){const t=H.data.date||new Date().toISOString().split("T")[0];return{title:"Data e Horário",content:`
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
                <input type="date" id="apptDate" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold" value="${t}">
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
        </div>`}}async function Aa(t=null,e=!1){const a=document.getElementById("appointmentModal");e||(H={step:1,data:{id:t?.id||null,clientName:t?.clientName||"",clientPhone:t?.clientPhone||"",selectedServiceIds:t?.services?.map(o=>o.id)||[],professionalId:t?.professionalId||null,professionalName:t?.professionalName||"",date:t?.startTime?new Date(t.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],time:t?.startTime?new Date(t.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null,redeemedReward:t?.redeemedReward||null,clientHasRewards:t?.hasRewards||!1,clientLoyaltyPoints:0}}),ua=g.services||[],Ba=(g.professionals||[]).filter(o=>o.status==="active");let s;switch(H.step){case 1:s=Zi(t);break;case 2:s=en();break;case 3:s=tn();break;case 4:s=an();break}a.innerHTML=`
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
        </div>`,a.querySelectorAll('[data-action="next-step"]').forEach(o=>o.addEventListener("click",()=>{const r=parseInt(o.dataset.currentStep,10);if(r===1&&(H.data.clientName=a.querySelector("#apptClientName").value.trim(),H.data.clientPhone=a.querySelector("#apptClientPhone").value.trim(),!H.data.clientName))return m("Preencha o nome do cliente.","warning");if(r===2&&H.data.selectedServiceIds.length===0)return m("Selecione um serviço.","warning");if(r===3&&!H.data.professionalId)return m("Escolha um profissional.","warning");qs(r+1)})),a.querySelectorAll('[data-action="prev-step"]').forEach(o=>o.addEventListener("click",()=>qs(parseInt(o.dataset.currentStep,10)-1))),a.querySelector('[data-action="close-modal"]')?.addEventListener("click",()=>{a.style.display="none"}),H.step===4&&a.querySelector("#appointmentForm").addEventListener("submit",sn),a.style.display="flex",H.step===2&&a.querySelectorAll(".service-card").forEach(o=>o.addEventListener("click",()=>{const r=a.querySelector("#multiServiceToggle")?.checked,i=o.classList.contains("selected");r||(a.querySelectorAll(".service-card.selected").forEach(d=>d.classList.remove("selected","border-indigo-500","bg-indigo-50")),H.data.selectedServiceIds=[]);const n=o.dataset.serviceId;i?(o.classList.remove("selected","border-indigo-500","bg-indigo-50"),H.data.selectedServiceIds=H.data.selectedServiceIds.filter(d=>d!==n)):(o.classList.add("selected","border-indigo-500","bg-indigo-50"),H.data.selectedServiceIds.push(n))})),H.step===3&&a.querySelectorAll(".professional-modal-card").forEach(o=>o.addEventListener("click",()=>{a.querySelectorAll(".professional-modal-card.selected").forEach(i=>i.classList.remove("selected","border-indigo-500","bg-indigo-50")),o.classList.add("selected","border-indigo-500","bg-indigo-50"),H.data.professionalId=o.dataset.professionalId;const r=Ba.find(i=>i.id===o.dataset.professionalId);H.data.professionalName=r?r.name:""})),H.step===1&&a.querySelector("#clientSearchInput")?.addEventListener("input",o=>rn(o.target.value)),H.step===4&&(a.querySelector("#apptDate")?.addEventListener("change",js),js(),on())}async function sn(t){t.preventDefault();const a=t.target.querySelector('button[type="submit"]');if(!H.data.time||!H.data.selectedServiceIds.length||!H.data.professionalId)return m("Selecione horário, serviço e profissional.","warning");a.disabled=!0,a.innerHTML="Aguarde...";const s=H.data.selectedServiceIds.map(l=>{const c=ua.find(u=>u.id===l);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[o,r]=H.data.time.split(":"),i=new Date(`${H.data.date}T${o}:${r}:00`),d={establishmentId:g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments[0]:g.establishmentId,clientName:H.data.clientName,clientPhone:H.data.clientPhone,services:s,professionalId:H.data.professionalId,professionalName:H.data.professionalName,startTime:i.toISOString(),redeemedReward:H.data.redeemedReward};H.data.id&&(d.id=H.data.id);try{H.data.id?await Jr(H.data.id,d):await Wr(d),m("Agendamento registrado!","success"),document.getElementById("appointmentModal").style.display="none",Ce()}catch(l){m(l.message,"error"),a.disabled=!1,a.textContent="Agendar"}}async function js(){const t=document.getElementById("availableTimesContainer"),e=document.getElementById("apptTotalDuration");if(!t)return;const a=H.data.selectedServiceIds.reduce((i,n)=>{const d=ua.find(l=>l.id===n);return i+(d?d.duration+(d.bufferTime||0):0)},0);e&&(e.textContent=`${a} min`);const{professionalId:s,selectedServiceIds:o,date:r}=H.data;if(!s||!o.length||!r){t.innerHTML='<p class="col-span-full text-center text-xs text-gray-400">Selecione serviço e profissional</p>';return}try{const i=g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments[0]:g.establishmentId;let n=await Ur({establishmentId:i,professionalId:s,serviceIds:o,date:r});const d=new Date;if(new Date(r+"T00:00:00").toDateString()===d.toDateString()){const l=d.getHours()*60+d.getMinutes();n=n.filter(c=>{const[u,p]=c.split(":").map(Number);return u*60+p>=l})}t.innerHTML=n.length>0?n.map(l=>`<button type="button" class="p-2 text-sm font-semibold rounded-lg border ${H.data.time===l?"bg-indigo-600 text-white border-indigo-600":"bg-gray-50 text-gray-700 border-gray-200 hover:bg-indigo-50"}" onclick="document.querySelectorAll('#availableTimesContainer button').forEach(b=>{b.classList.remove('bg-indigo-600','text-white','border-indigo-600');b.classList.add('bg-gray-50','text-gray-700','border-gray-200')});this.classList.add('bg-indigo-600','text-white','border-indigo-600');this.classList.remove('bg-gray-50','text-gray-700','border-gray-200');window._selectedTime='${l}';">${l}</button>`).join(""):'<p class="col-span-full text-center text-xs text-gray-400">Sem horários</p>'}catch{t.innerHTML='<p class="col-span-full text-center text-xs text-red-400">Erro</p>'}}function on(){const t=document.getElementById("loyaltyRewardsContainer");if(!t)return;const{clientHasRewards:e,clientLoyaltyPoints:a}=H.data,{enabled:s,rewards:o}=Kt;if(!s||!e||!o?.length){t.innerHTML="";return}const r=o.filter(i=>a>=i.points);if(!r.length){t.innerHTML='<p class="text-xs text-gray-400">Sem recompensas disponíveis.</p>';return}t.innerHTML=`<div class="border-t border-gray-100 pt-4">
        <p class="text-xs font-semibold text-gray-500 mb-2">Resgate fidelidade (${a} pts)</p>
        ${r.map(i=>`<label class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg mb-1 cursor-pointer"><input type="radio" name="loyaltyReward" value="${X(i.reward)}" data-points="${i.points}" class="accent-indigo-600"><span class="text-sm">${X(i.reward)} (-${i.points} pts)</span></label>`).join("")}
    </div>`,t.querySelectorAll('input[name="loyaltyReward"]').forEach(i=>{i.addEventListener("change",n=>{n.target.checked&&(H.data.redeemedReward={reward:n.target.value,points:parseInt(n.target.dataset.points,10)})})})}async function rn(t){const e=document.getElementById("clientSearchResults");if(!e||t.trim().length<3){e&&(e.innerHTML='<p class="text-xs text-gray-400">Digite pelo menos 3 caracteres...</p>');return}e.innerHTML='<div class="text-center py-3"><div class="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div></div>';try{const s=(g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId]).map(n=>it(n,t.trim())),o=await Promise.all(s),r=new Map;o.forEach(n=>{n.forEach(d=>{d.phone?r.set(d.phone,d):r.set(d.id||Math.random().toString(),d)})});const i=Array.from(r.values());if(Lo=i,!i.length){e.innerHTML='<p class="text-xs text-gray-400">Nenhum cliente encontrado.</p>';return}e.innerHTML=i.map(n=>`<div class="client-card p-2.5 bg-white rounded-lg border ${H.data.clientName===n.name&&H.data.clientPhone===n.phone?"border-indigo-500 bg-indigo-50":"border-gray-200"} cursor-pointer flex items-center gap-2" data-client-name="${X(n.name)}" data-client-phone="${X(n.phone)}" data-loyalty-points="${n.loyaltyPoints||0}">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">${X(n.name).charAt(0)}</div>
                <div><p class="text-sm font-semibold text-gray-800">${X(n.name)}</p><p class="text-xs text-gray-500">${X(n.phone)}</p></div>
            </div>`).join(""),e.querySelectorAll(".client-card").forEach(n=>n.addEventListener("click",()=>{H.data.clientName=n.dataset.clientName,H.data.clientPhone=n.dataset.clientPhone,H.data.clientLoyaltyPoints=parseInt(n.dataset.loyaltyPoints||"0",10);const d=Math.min(...(Kt?.rewards||[]).map(l=>l.points));H.data.clientHasRewards=Kt.enabled&&d!==1/0&&H.data.clientLoyaltyPoints>=d,document.getElementById("apptClientName").value=n.dataset.clientName,document.getElementById("apptClientPhone").value=n.dataset.clientPhone,e.querySelectorAll(".client-card").forEach(l=>l.classList.remove("border-indigo-500","bg-indigo-50")),n.classList.add("border-indigo-500","bg-indigo-50")}))}catch{e.innerHTML='<p class="text-xs text-red-400">Erro ao buscar.</p>'}}const nn=(t,e=null,a=1,s=12)=>{let o=`/api/comandas/${t}?page=${a}&limit=${s}`;return e&&(typeof e=="object"?(e.startDate&&(o+=`&startDate=${e.startDate}`),e.endDate&&(o+=`&endDate=${e.endDate}`)):typeof e=="string"&&(o+=`&date=${e}`)),L(o)},ln=(t,e)=>L(`/api/appointments/${t}/comanda`,{method:"POST",body:JSON.stringify({items:e})}),To=t=>L("/api/sales",{method:"POST",body:JSON.stringify(t)}),Ma=(t,e)=>L(`/api/sales/${t}?date=${e}`),dn=(t,e,a)=>{const s=`/api/sales/${t}?startDate=${e}&endDate=${a}`;return L(s)},cn=t=>L(`/api/sales/${t}/reopen`,{method:"POST"}),Po=t=>L(`/api/sales/${t}`,{method:"DELETE"}),Ns=Object.freeze(Object.defineProperty({__proto__:null,createSale:To,deleteSale:Po,getSales:Ma,getSalesByDateRange:dn,reopenSale:cn},Symbol.toStringTag,{value:"Module"})),lt=t=>L(`/api/products/${t}`),Bo=t=>L("/api/products",{method:"POST",body:JSON.stringify(t)}),Ao=(t,e)=>L(`/api/products/${t}`,{method:"PUT",body:JSON.stringify(e)}),bs=t=>L(`/api/products/${t}`,{method:"DELETE"}),Mo=(t,e)=>L(`/api/products/${t}/stock`,{method:"PATCH",body:JSON.stringify(e)}),un=t=>L(`/api/products/${t}/stock-history`),qo=({startDate:t,endDate:e,productId:a,categoryId:s,establishmentId:o})=>{const r=new URLSearchParams({startDate:t,endDate:e});return a&&a!=="all"&&r.append("productId",a),s&&s!=="all"&&r.append("categoryId",s),o&&r.append("establishmentId",o),L(`/api/products/stock-history/report?${r.toString()}`)},pn=Object.freeze(Object.defineProperty({__proto__:null,adjustStock:Mo,createProduct:Bo,deleteProduct:bs,getProducts:lt,getStockHistory:un,getStockReport:qo,updateProduct:Ao},Symbol.toStringTag,{value:"Module"})),bn=()=>L("/api/cashier/status").catch(t=>{if(t.message.includes("404")||t.message.includes("não encontrada"))return null;throw t}),gn=t=>{const e={establishmentId:t.establishmentId,initialAmount:Number(t.initialAmount),notes:t.notes||""};return console.log("Payload enviado para abrir caixa:",e),L("/api/cashier/open",{method:"POST",body:JSON.stringify(e)})},mn=(t,e)=>{const a={finalAmount:Number(e)};return console.log("Payload enviado para fechar caixa:",a),L(`/api/cashier/close/${t}`,{method:"PUT",body:JSON.stringify(a)})},fn=()=>L("/api/cashier/history").then(t=>t||[]).catch(t=>(console.error("Erro ao buscar histórico:",t),[])),xn=t=>L(`/api/cashier/report/${t}`),gs=t=>L(`/api/packages/${t}`),hn=t=>L("/api/packages",{method:"POST",body:JSON.stringify(t)}),vn=(t,e)=>L(`/api/packages/${t}`,{method:"PUT",body:JSON.stringify(e)}),yn=t=>L(`/api/packages/${t}`,{method:"DELETE"}),pa=t=>L(`/api/financial/natures/${t}`),wn=t=>L("/api/financial/natures",{method:"POST",body:JSON.stringify(t)}),kn=t=>L(`/api/financial/natures/${t}`,{method:"DELETE"}),ms=t=>L(`/api/financial/cost-centers/${t}`),$n=t=>L("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(t)}),Sn=t=>L(`/api/financial/cost-centers/${t}`,{method:"DELETE"}),jo=(t,e)=>L(`/api/financial/${t}`,{method:"POST",body:JSON.stringify(e)}),No=(t,e={})=>{let a=`/api/financial/${t}`;const s=new URLSearchParams;e.establishmentId&&s.append("establishmentId",e.establishmentId),e.startDate&&s.append("startDate",e.startDate),e.endDate&&s.append("endDate",e.endDate),e.natureId&&s.append("natureId",e.natureId),e.costCenterId&&s.append("costCenterId",e.costCenterId),e.status&&s.append("status",e.status);const o=s.toString();return o&&(a+=`?${o}`),L(a)},Ro=(t,e,a)=>L(`/api/financial/${t}/${e}`,{method:"PUT",body:JSON.stringify(a)}),Fo=(t,e)=>L(`/api/financial/${t}/${e}`,{method:"DELETE"}),Ho=(t,e)=>{const a=e.map(s=>L(`/api/financial/${t}/${s}`,{method:"DELETE"}));return Promise.all(a)},Oo=(t,e,a)=>L(`/api/financial/${t}/${e}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),zo=t=>jo("payables",t),_o=t=>No("payables",t),En=(t,e)=>Ro("payables",t,e),In=t=>Fo("payables",t),Ln=(t,e)=>Oo("payables",t,e),Vo=t=>jo("receivables",t),Uo=t=>No("receivables",t),Cn=(t,e)=>Ro("receivables",t,e),Dn=t=>Fo("receivables",t),Tn=(t,e)=>Oo("receivables",t,e);let x={allComandas:[],catalog:{services:[],products:[],packages:[]},activeFilter:"abertas",selectedComandaId:null,viewMode:"items",selectedCatalogItem:null,isCashierOpen:!1,activeCashierSessionId:null,loyaltySettings:null,establishmentConfig:null,pendingRedemption:null,paging:{page:1,limit:15,total:0},checkoutState:{payments:[],selectedMethod:"dinheiro",installments:1,amountReceived:"",discount:{type:"real",value:0},discountReason:""},isProcessing:!1,showHistoryPanel:!1,filterStartDate:"",filterEndDate:"",filterPreset:"hoje"},Fe=null,_e=null,Rs=null;function Wo(t,e){return function(...a){clearTimeout(Rs),Rs=setTimeout(()=>t.apply(this,a),e)}}function wa(t){const e=new Date;let a,s;t==="hoje"?(a=new Date,s=new Date):t==="este_mes"?(a=new Date(e.getFullYear(),e.getMonth(),1),s=new Date(e.getFullYear(),e.getMonth()+1,0)):t==="mes_passado"?(a=new Date(e.getFullYear(),e.getMonth()-1,1),s=new Date(e.getFullYear(),e.getMonth(),0)):(a=new Date,s=new Date);const o=r=>{const i=r.getTimezoneOffset()*6e4;return new Date(r-i).toISOString().split("T")[0]};return{start:o(a),end:o(s)}}async function Fs(t,e="stay"){if(!t||!t.id)return;t._localUpdatedAt=Date.now(),t._cachedItems=null,t._hasUnsavedChanges=!1,ga(),e==="checkout"&&(x.viewMode="checkout",x.checkoutState.payments||(x.checkoutState.payments=[]),x.checkoutState.selectedMethod="dinheiro",x.checkoutState.amountReceived="",x.checkoutState.discount.value||(x.checkoutState.discount={type:"real",value:0},x.checkoutState.discountReason=""),Z());const a=document.createElement("div");a.id="saving-overlay",a.className="fixed inset-0 bg-gray-900/60 z-[999999] flex items-center justify-center backdrop-blur-sm",a.innerHTML=`
        <div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center animate-fade-in border border-gray-100">
            <div class="loader mb-4"></div>
            <p class="text-gray-800 font-black text-sm uppercase tracking-widest">Sincronizando...</p>
        </div>
    `,document.body.appendChild(a);try{const s=(t.comandaItems||[]).filter(o=>o&&o.id&&String(o.id)!=="undefined"&&String(o.id)!=="null").map(o=>{const r={...o};if(r.id=String(o.id),r.type==="product"){const i=r.id;r.productId||(r.productId=i),r.product_id||(r.product_id=i)}if(r.type==="service"){const i=r.id;r.serviceId||(r.serviceId=i),r.service_id||(r.service_id=i)}return r});t.type==="walk-in"&&String(t.id).startsWith("temp-")||await ln(t.id,s),document.body.contains(a)&&document.body.removeChild(a),e!=="checkout"&&(m("Sucesso","Comanda atualizada e salva!","success"),Z())}catch(s){document.body.contains(a)&&document.body.removeChild(a),console.error("Erro ao salvar:",s),t._hasUnsavedChanges=!0,Z(),m("Erro","Falha ao salvar no servidor: "+s.message,"warning")}}function Pe(t){if(!t._cachedItems){let e=[];if(t.status==="completed"){const a=t.comandaItems||t.items||[];e=a.length>0?a:t.services||[]}else{const a=(t.services||[]).map(i=>({...i,_source:"original_service",type:"service"})),s=a.reduce((i,n)=>{const d=String(n.id);return i[d]=(i[d]||0)+1,i},{}),o=[...t.comandaItems||[],...t.items||[]],r=[];o.forEach(i=>{const n=String(i.id);(i.type==="service"||!i.type)&&s[n]>0?s[n]--:r.push({...i,_source:"extra"})}),e=[...a,...r]}return t._cachedItems=e,t._cachedTimestamp=Date.now(),e}return t._cachedItems}function Pn(){const t=document.getElementById("comandas-layout");t&&t.classList.add("mobile-detail-open");const e=document.getElementById("mobile-bottom-nav");e&&(e.style.display="none")}function Ue(){const t=document.getElementById("comandas-layout");t&&t.classList.remove("mobile-detail-open");const e=document.getElementById("mobile-bottom-nav");e&&(e.style.display="")}function Bn(){const t=x.allComandas||[],e=t.filter(l=>l.status!=="completed").length,a=t.filter(l=>l.status==="completed"),s=a.reduce((l,c)=>{let u=c.totalAmount!==void 0?Number(c.totalAmount):Pe(c).reduce((p,b)=>p+Number(b.price||0),0);return l+u},0),o=a.length>0?s/a.length:0,r=document.getElementById("kpi-abertas"),i=document.getElementById("kpi-pagas"),n=document.getElementById("kpi-vendas"),d=document.getElementById("kpi-ticket");r&&(r.textContent=e),i&&(i.textContent=a.length),n&&(n.textContent=`R$ ${s.toFixed(2).replace(".",",")}`),d&&(d.textContent=`R$ ${o.toFixed(2).replace(".",",")}`)}function Pt(){_e.innerHTML=`
        <style id="comandas-mobile-css">
            @media (max-width: 767px) {
                .mobile-detail-open #comandas-list-column {
                    display: none !important;
                }
                #comandas-layout:not(.mobile-detail-open) #comanda-detail-container {
                    display: none !important;
                }
                .mobile-detail-open #comanda-detail-container {
                    display: flex !important;
                    position: fixed !important;
                    top: 0; left: 0; right: 0; bottom: 0;
                    height: 100dvh !important;
                    width: 100vw !important;
                    z-index: 99999 !important;
                    background-color: #f8fafc !important;
                    flex-direction: column !important;
                }
            }
            /* Super correção de Z-index global para as Notificações de Sucesso/Erro e Modais de Confirmação */
            #toast-container, .toast-notification, .modal, .modal-backdrop, .modal-dialog, [id*="modal"], [id*="Modal"] {
                z-index: 9999999 !important; 
            }
        </style>
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative">
            
            <div id="cashier-controls" class="flex items-center gap-2 mb-2">
                <div class="loader-sm"></div>
            </div>

            <div class="grid grid-cols-2 gap-2 mb-2 animate-fade-in w-full">
                <button id="btn-new-sale" data-action="new-sale" class="bg-indigo-600 text-white rounded-xl p-2.5 flex items-center justify-center shadow-md active:scale-95 transition-transform border border-indigo-700 gap-2">
                    <i class="bi bi-cart-plus text-lg drop-shadow-md"></i>
                    <span class="font-black text-[10px] md:text-xs uppercase tracking-widest leading-none mt-0.5">Nova Venda</span>
                </button>
                <button data-action="toggle-history" class="bg-white text-gray-700 rounded-xl p-2.5 flex items-center justify-center shadow-sm border border-gray-200 active:scale-95 transition-transform hover:bg-gray-50 gap-2">
                    <i class="bi bi-clock-history text-lg text-indigo-500"></i>
                    <span class="font-black text-[10px] md:text-xs uppercase tracking-widest leading-none mt-0.5">Histórico</span>
                </button>
            </div>

            <div id="cashier-alert-box"></div>

            <div id="history-panel" class="${x.showHistoryPanel?"block":"hidden"} bg-white p-3 rounded-xl border border-gray-200 shadow-sm mb-2 animate-fade-in">
                <h4 class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Período de Busca</h4>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-2">
                    <button data-action="set-period" data-period="hoje" class="period-btn py-1.5 text-[9px] font-bold rounded-lg border transition-colors ${x.filterPreset==="hoje"?"bg-indigo-600 text-white border-indigo-600 shadow-sm":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-white"}">Hoje</button>
                    <button data-action="set-period" data-period="este_mes" class="period-btn py-1.5 text-[9px] font-bold rounded-lg border transition-colors ${x.filterPreset==="este_mes"?"bg-indigo-600 text-white border-indigo-600 shadow-sm":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-white"}">Este Mês</button>
                    <button data-action="set-period" data-period="mes_passado" class="period-btn py-1.5 text-[9px] font-bold rounded-lg border transition-colors ${x.filterPreset==="mes_passado"?"bg-indigo-600 text-white border-indigo-600 shadow-sm":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-white"}">Mês Passado</button>
                    <button data-action="set-period" data-period="custom" class="period-btn py-1.5 text-[9px] font-bold rounded-lg border transition-colors ${x.filterPreset==="custom"?"bg-indigo-600 text-white border-indigo-600 shadow-sm":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-white"}">Personalizado</button>
                </div>
                
                <div id="custom-date-fields" class="${x.filterPreset==="custom"?"flex":"hidden"} gap-2 items-end p-2 bg-gray-50 rounded-lg border border-gray-100 flex-wrap sm:flex-nowrap">
                    <div class="flex-1 min-w-[100px]">
                        <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 ml-1">Início</label>
                        <input type="date" id="filter-start-date" value="${x.filterStartDate}" class="w-full p-2 border border-gray-300 rounded-lg bg-white text-[10px] font-bold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm">
                    </div>
                    <div class="flex-1 min-w-[100px]">
                        <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 ml-1">Fim</label>
                        <input type="date" id="filter-end-date" value="${x.filterEndDate}" class="w-full p-2 border border-gray-300 rounded-lg bg-white text-[10px] font-bold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm">
                    </div>
                    <button data-action="apply-custom-dates" class="h-[34px] w-full sm:w-auto px-4 bg-indigo-600 text-white font-black text-[10px] rounded-lg hover:bg-indigo-700 shadow-sm active:scale-95 transition-transform uppercase tracking-wider flex items-center justify-center gap-1.5 mt-1 sm:mt-0">
                        <i class="bi bi-search"></i> Buscar
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-4 gap-1.5 md:gap-3 mb-2 animate-fade-in w-full">
                <div class="bg-white p-1.5 md:p-2 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Abertas</span>
                    <span id="kpi-abertas" class="text-xs md:text-sm font-black text-indigo-600 mt-0.5 w-full truncate">0</span>
                </div>
                <div class="bg-white p-1.5 md:p-2 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Vendas</span>
                    <span id="kpi-vendas" class="text-xs md:text-sm font-black text-green-600 mt-0.5 w-full truncate">R$ 0,00</span>
                </div>
                <div class="bg-white p-1.5 md:p-2 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Pagas</span>
                    <span id="kpi-pagas" class="text-xs md:text-sm font-black text-gray-800 mt-0.5 w-full truncate">0</span>
                </div>
                <div class="bg-white p-1.5 md:p-2 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Ticket</span>
                    <span id="kpi-ticket" class="text-xs md:text-sm font-black text-blue-600 mt-0.5 w-full truncate">R$ 0,00</span>
                </div>
            </div>

            <div class="flex gap-1.5 overflow-x-auto pb-1 w-full custom-scrollbar mb-2 animate-fade-in flex-shrink-0">
                <button data-filter="todas" class="filter-btn px-3 py-1.5 text-[10px] font-black rounded-lg border text-gray-600 border-gray-200 hover:bg-gray-50 transition whitespace-nowrap shadow-sm uppercase tracking-wider">Todas</button>
                <button data-filter="abertas" class="filter-btn px-3 py-1.5 text-[10px] font-black rounded-lg border text-gray-600 border-gray-200 hover:bg-gray-50 transition whitespace-nowrap shadow-sm uppercase tracking-wider">Abertas</button>
                <button data-filter="pagas" class="filter-btn px-3 py-1.5 text-[10px] font-black rounded-lg border text-gray-600 border-gray-200 hover:bg-gray-50 transition whitespace-nowrap shadow-sm uppercase tracking-wider">Fechadas</button>
            </div>

            <div id="comandas-layout" class="flex-1 flex gap-3 min-h-0 w-full animate-fade-in relative overflow-hidden">
                <div id="comandas-list-column" class="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm h-full w-full md:w-80 lg:w-96 flex-shrink-0 transition-all duration-300 z-10">
                    <div id="comandas-list" class="p-2 space-y-1.5 overflow-y-auto custom-scrollbar flex-1">
                        <div class="loader mx-auto mt-10"></div>
                    </div>
                    <div id="pagination-container" class="p-1 border-t border-gray-100 bg-gray-50/50 flex-shrink-0 min-h-[36px] flex justify-center items-center rounded-b-xl"></div>
                </div>

                <div id="comanda-detail-container" class="bg-gray-50 md:bg-white border-0 md:border md:border-gray-200 md:rounded-xl shadow-sm flex-col overflow-hidden hidden md:flex flex-1 min-w-0 transition-all duration-300 h-full z-20">
                    <div class="flex flex-col items-center justify-center h-full text-center text-gray-400">
                        <i class="bi bi-receipt text-4xl opacity-20 mb-2"></i>
                        <p class="text-sm font-medium">Selecione uma venda</p>
                    </div>
                </div>
            </div>
        </section>
    `,ba(),fs()}function fs(){document.querySelectorAll(".filter-btn").forEach(e=>{e.classList.remove("bg-indigo-600","text-white","border-indigo-600"),e.classList.add("bg-white","text-gray-600","border-gray-200")});const t=document.querySelector(`[data-filter="${x.activeFilter}"]`);t&&(t.classList.remove("bg-white","text-gray-600","border-gray-200"),t.classList.add("bg-indigo-600","text-white","border-indigo-600"))}function ba(){const t=document.getElementById("cashier-alert-box"),e=document.getElementById("btn-new-sale");x.isCashierOpen?(t&&(t.innerHTML=""),e&&(e.classList.remove("opacity-50","cursor-not-allowed"),e.disabled=!1)):(t&&(t.innerHTML=`
            <div class="bg-amber-50 border-l-4 border-amber-400 p-2 mb-2 rounded-r-lg animate-fade-in mx-1 shadow-sm">
                <div class="flex items-center">
                    <i class="bi bi-exclamation-triangle text-amber-500 mr-2 text-base"></i>
                    <p class="text-[10px] md:text-xs text-amber-800 leading-tight">
                        <strong>Caixa Fechado!</strong> Abra o caixa para operações.
                    </p>
                </div>
            </div>
        `),e&&(e.classList.add("opacity-50","cursor-not-allowed"),e.disabled=!0)),An()}function An(){const t=document.getElementById("cashier-controls");t&&(x.isCashierOpen?t.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-green-700 bg-green-100 py-1.5 px-2.5 rounded-lg border border-green-200 uppercase tracking-widest shadow-sm"><i class="bi bi-unlock-fill"></i> Caixa Aberto</span>
            <button data-action="close-cashier" class="py-1 px-3 bg-red-50 text-red-700 border border-red-200 font-bold rounded-lg hover:bg-red-100 text-[10px] transition shadow-sm">Fechar Caixa</button>
        `:t.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-red-700 bg-red-100 py-1.5 px-2.5 rounded-lg border border-red-200 uppercase tracking-widest shadow-sm"><i class="bi bi-lock-fill"></i> Caixa Fechado</span>
            <button data-action="open-cashier" class="py-1 px-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 text-[10px] shadow-sm transition">Abrir Caixa</button>
        `)}function ga(){const t=document.getElementById("comandas-list"),e=document.getElementById("pagination-container");if(!t)return;if(!x.isCashierOpen&&x.activeFilter==="abertas"){t.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <i class="bi bi-lock text-3xl text-gray-300 mb-2 block"></i>
                <p class="text-xs font-bold text-gray-600 uppercase tracking-widest">Caixa Fechado</p>
                <p class="text-[10px] text-gray-500 mt-1">Abra o caixa para ver as vendas</p>
            </div>
        `,e&&(e.innerHTML="");return}let a=x.allComandas||[];if(x.activeFilter==="abertas"?a=a.filter(o=>o.status!=="completed"):x.activeFilter==="pagas"&&(a=a.filter(o=>o.status==="completed")),Bn(),a.length===0){t.innerHTML='<p class="text-center text-gray-400 py-10 text-xs font-medium">Nenhuma venda encontrada para este filtro e período.</p>',Hs(e);return}const s=document.createDocumentFragment();a.forEach(o=>{const r=Pe(o);let i=0;o.status==="completed"&&o.totalAmount!==void 0&&o.totalAmount!==null?i=Number(o.totalAmount):i=r.reduce((R,C)=>R+Number(C.price||0),0);const d=o.loyaltyRedemption||o.discount&&o.discount.reason&&String(o.discount.reason).toLowerCase().includes("fidelidade")?'<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-4 h-4 ml-1 text-[10px]" title="Prémio Resgatado">🎁</span>':"",l=String(o.id)===String(x.selectedComandaId),c=new Date(o.startTime),u=c.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),p=c.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),b=o.type==="walk-in"||typeof o.id=="string"&&o.id.startsWith("temp-"),f=o.status==="completed",h=v(o.clientName||"Cliente sem nome"),y=v(o.professionalName||"Sem profissional");let $="";f?$='<span class="text-[9px] font-bold uppercase text-green-700 bg-green-100 px-1.5 py-0.5 rounded border border-green-200">Paga</span>':b?$='<span class="text-[9px] font-bold uppercase text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded border border-blue-200">Avulsa</span>':$='<span class="text-[9px] font-bold uppercase text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded border border-indigo-200">Agenda</span>';const A=document.createElement("div");A.className=`comanda-card cursor-pointer border border-gray-100 rounded-lg p-2.5 hover:bg-gray-50 transition-colors shadow-sm ${l?"ring-2 ring-indigo-500 bg-indigo-50/50":"bg-white"}`,A.dataset.action="select-comanda",A.dataset.comandaId=o.id,A.innerHTML=`
            <div class="flex justify-between items-start mb-1.5 pointer-events-none">
                <p class="font-bold text-gray-800 truncate flex-1 min-w-0 pr-2 text-sm">${h}</p>
                <div class="flex items-center flex-shrink-0">
                    <p class="font-black ${f?"text-green-600":"text-gray-800"} text-sm">R$ ${i.toFixed(2)}</p>
                    ${d}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none gap-2">
                <div class="flex items-center gap-1.5 min-w-0 flex-1">
                    ${$}
                    <p class="text-[10px] text-gray-500 truncate"><i class="bi bi-person mr-0.5 opacity-50"></i>${y}</p>
                </div>
                <p class="text-[10px] text-gray-500 font-bold flex-shrink-0"><i class="bi bi-calendar-event mr-0.5 opacity-50"></i>${p} <span class="text-gray-300 mx-0.5">|</span> ${u}</p> 
            </div>
        `,s.appendChild(A)}),t.innerHTML="",t.appendChild(s),Hs(e)}function Hs(t){if(!t)return;t.innerHTML="";const{page:e,total:a,limit:s}=x.paging,o=Math.ceil((a||0)/s);if(o===0)return;const r=document.createElement("div");r.className="flex gap-2 justify-center items-center w-full",r.innerHTML=`
        <button data-page="${e-1}" class="px-2.5 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-600 shadow-sm ${e<=1?"opacity-50 cursor-not-allowed":""}" ${e<=1?"disabled":""}>&laquo;</button>
        <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mx-1">Pág ${e} de ${o||1}</span>
        <button data-page="${e+1}" class="px-2.5 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-600 shadow-sm ${e>=o?"opacity-50 cursor-not-allowed":""}" ${e>=o?"disabled":""}>&raquo;</button>
    `,t.appendChild(r),r.querySelectorAll("button[data-page]").forEach(i=>{i.onclick=n=>{n.stopPropagation();const d=parseInt(i.dataset.page,10);d>0&&d<=o&&(x.paging.page=d,me())}})}function Mn(t,e){const a=`
        <div class="p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="back-to-items" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner active:scale-90 transition-transform">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <h3 class="font-black text-base text-gray-800 ml-4 uppercase tracking-wider">Catálogo</h3>
        </div>
    `;e.innerHTML=`
        ${a}
        <div class="flex-grow overflow-y-auto p-4 custom-scrollbar bg-gray-50/50 relative flex flex-col">
            <div class="relative mb-5 flex-shrink-0">
                <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                <input type="search" id="item-search-input" placeholder="Pesquisar produto ou serviço..." class="w-full pl-12 p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white transition-colors shadow-sm font-bold text-gray-700">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow overflow-y-auto pb-8">
                <div class="bg-gray-50 p-3 rounded-2xl border border-gray-200"><h4 class="font-black mb-3 text-center text-xs uppercase tracking-widest text-indigo-600 bg-indigo-100 py-2 rounded-lg"><i class="bi bi-scissors mr-1"></i> Serviços</h4><div id="catalog-service-list" class="space-y-2"></div></div>
                <div class="bg-gray-50 p-3 rounded-2xl border border-gray-200"><h4 class="font-black mb-3 text-center text-xs uppercase tracking-widest text-emerald-600 bg-emerald-100 py-2 rounded-lg"><i class="bi bi-box-seam mr-1"></i> Produtos</h4><div id="catalog-product-list" class="space-y-2"></div></div>
                <div class="bg-gray-50 p-3 rounded-2xl border border-gray-200"><h4 class="font-black mb-3 text-center text-xs uppercase tracking-widest text-purple-600 bg-purple-100 py-2 rounded-lg"><i class="bi bi-boxes mr-1"></i> Pacotes</h4><div id="catalog-package-list" class="space-y-2"></div></div>
            </div>
        </div>
    `;const s=(r="")=>{const i=r.toLowerCase(),n={service:'<i class="bi bi-scissors text-indigo-600"></i>',product:'<i class="bi bi-box-seam text-emerald-600"></i>',package:'<i class="bi bi-boxes text-purple-600"></i>'},d={"catalog-service-list":{items:x.catalog.services,type:"service"},"catalog-product-list":{items:x.catalog.products,type:"product"},"catalog-package-list":{items:x.catalog.packages,type:"package"}};Object.entries(d).forEach(([l,{items:c,type:u}])=>{const p=e.querySelector("#"+l);if(!p)return;const b=c.filter(f=>f.name.toLowerCase().includes(i)).slice(0,50);p.innerHTML=b.map(f=>f.id?`
                <button data-action="select-catalog-item" data-item-type="${u}" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-400 shadow-sm transition-all text-left group active:scale-95">
                    <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-lg border border-gray-100 group-hover:bg-indigo-50 group-hover:border-indigo-200">${n[u]}</div>
                    <span class="flex-grow text-sm font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-indigo-700">${v(f.name)}</span>
                    <span class="font-black text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded-md border border-gray-200 whitespace-nowrap group-hover:bg-white group-hover:text-indigo-700">R$ ${f.price.toFixed(2)}</span>
                </button>
            `:"").join("")||'<p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center py-6 border border-dashed border-gray-300 rounded-xl">Vazio</p>'})};s();const o=e.querySelector("#item-search-input");o&&o.addEventListener("input",Wo(r=>{s(r.target.value)},300))}function qn(t,e){const a=x.selectedCatalogItem;if(!a){x.viewMode="add-item",Z();return}let s=1;const o=`
        <div class="p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="back-to-add-item" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner active:scale-90 transition-transform">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <h3 class="font-black text-base text-gray-800 ml-4 uppercase tracking-wider">Quantidade</h3>
        </div>
    `;e.innerHTML=`
        ${o}
        <div class="flex-grow flex flex-col items-center justify-center p-6 bg-gray-50/50">
            <div class="text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-200 w-full max-w-sm">
                <div class="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full mx-auto flex items-center justify-center text-4xl mb-6 border border-indigo-100 shadow-inner">
                    ${a.type==="service"?'<i class="bi bi-scissors"></i>':a.type==="product"?'<i class="bi bi-box-seam"></i>':'<i class="bi bi-boxes"></i>'}
                </div>
                <h3 class="font-black text-2xl text-gray-900 leading-tight mb-3">${v(a.name)}</h3>
                <p class="text-base text-gray-600 font-bold bg-gray-100 inline-block px-4 py-1.5 rounded-full border border-gray-200 shadow-sm">R$ ${a.price.toFixed(2)} / unidade</p>
                
                <div class="my-10 flex items-center justify-center gap-6">
                    <button id="quantity-minus-btn" class="w-16 h-16 rounded-full bg-white border border-gray-300 text-3xl font-black text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 shadow-md transition-all active:scale-90 disabled:opacity-30 disabled:hover:bg-white"><i class="bi bi-dash"></i></button>
                    <span id="quantity-display" class="text-6xl font-black w-24 text-center text-indigo-600 bg-indigo-50 rounded-3xl py-2 border border-indigo-100 shadow-inner">${s}</span>
                    <button id="quantity-plus-btn" class="w-16 h-16 rounded-full bg-white border border-gray-300 text-3xl font-black text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200 shadow-md transition-all active:scale-90"><i class="bi bi-plus"></i></button>
                </div>
            </div>
        </div>
        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)] w-full flex-shrink-0 z-50 pb-8">
            <button id="confirm-add-qty-btn" class="w-full py-4 bg-indigo-600 text-white font-black text-sm rounded-xl hover:bg-indigo-700 transition-all shadow-lg uppercase tracking-widest active:scale-95 flex justify-center items-center gap-2">
                <i class="bi bi-cart-plus text-xl"></i> Confirmar Adição
            </button>
        </footer>
    `;const r=()=>{e.querySelector("#quantity-display").textContent=s,e.querySelector("#quantity-minus-btn").disabled=s<=1};e.querySelector("#quantity-minus-btn").onclick=()=>{s>1&&(s--,r())},e.querySelector("#quantity-plus-btn").onclick=()=>{s++,r()},e.querySelector("#confirm-add-qty-btn").onclick=async()=>{await Qo(a,s),x.viewMode="items",x.selectedCatalogItem=null,Z()},r()}function Z(){const t=document.getElementById("comanda-detail-container");if(!t)return;const e=x.allComandas.find(f=>String(f.id)===String(x.selectedComandaId));if(x.viewMode==="checkout"&&e){jn(e,t);return}if(x.viewMode==="add-item"&&e){Mn(e,t);return}if(x.viewMode==="add-item-qty"&&e){qn(e,t);return}const a=`
        <div class="md:hidden p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="back-to-list" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <h3 class="font-black text-base text-gray-800 ml-4 uppercase tracking-wider">Detalhes da Comanda</h3>
        </div>
    `;if(!x.isCashierOpen){t.innerHTML=`
            ${a}
            <div class="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
                <div class="bg-gray-50 p-4 rounded-full mb-3 border border-gray-100">
                    <i class="bi bi-lock text-3xl text-gray-300"></i>
                </div>
                <p class="font-bold text-sm text-gray-700">Caixa Fechado</p>
                <button data-action="open-cashier" class="py-2 px-5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-sm mt-3 text-xs">Abrir Caixa</button>
            </div>
        `;return}if(!e){t.innerHTML=`
            <div class="hidden md:flex flex-col items-center justify-center h-full text-center text-gray-400">
                <i class="bi bi-receipt text-4xl opacity-20 mb-2"></i>
                <p class="text-sm font-medium">Selecione uma venda</p>
                <p class="text-[10px] uppercase tracking-widest mt-1 opacity-70">Clique na lista ao lado</p>
            </div>
        `;return}const s=Pe(e),o=e.status==="completed",r=e.type==="walk-in"||typeof e.id=="string"&&e.id.startsWith("temp-"),i=s.reduce((f,h)=>{const y=h._source==="original_service",$=h.id||h.name,A=y?`original-${$}`:`${h.type}-${$}`;return f[A]||(f[A]={...h,quantity:0,sources:[]}),f[A].quantity+=1,h._source&&f[A].sources.push(h._source),f},{}),n=Object.values(i).reduce((f,h)=>f+Number(h.price||0)*h.quantity,0),d=v(e.clientName||"Cliente sem nome"),l=v(e.professionalName||"Profissional não atribuído"),c=e._hasUnsavedChanges,u=`
        <div class="hidden md:grid grid-cols-3 gap-2 pt-1">
            <button data-action="add-item" class="col-span-1 py-2.5 bg-indigo-50 text-indigo-700 font-bold rounded-lg hover:bg-indigo-100 transition border border-indigo-200 text-xs shadow-sm uppercase tracking-wider flex justify-center items-center gap-1">
                <i class="bi bi-plus-lg"></i> Incluir
            </button>
            <button data-action="save-comanda" class="col-span-1 py-2.5 font-bold rounded-lg transition text-xs shadow-sm uppercase tracking-wider flex justify-center items-center gap-1 ${c?"bg-amber-500 text-white hover:bg-amber-600 animate-pulse":"bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}">
                <i class="bi bi-save2"></i> ${c?"Salvar*":"Salvar"}
            </button>
            <button data-action="go-to-checkout" class="col-span-1 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-sm text-xs uppercase tracking-wider flex justify-center items-center gap-1">
                <i class="bi bi-currency-dollar text-sm"></i> Pagamento
            </button>
        </div>
    `,p=`
        <footer class="hidden md:block mt-auto p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] w-full flex-shrink-0 z-20">
            <div class="flex justify-between items-end mb-3">
                <span class="text-xs text-gray-500 font-bold uppercase tracking-widest">Total a Pagar</span>
                <span class="text-3xl font-black text-gray-900 leading-none">R$ ${n.toFixed(2)}</span>
            </div>
            ${o?`
                <div class="bg-green-50 text-green-700 text-center py-2.5 rounded-lg font-bold border border-green-200 flex items-center justify-center gap-2 text-sm shadow-sm">
                    <i class="bi bi-check-circle-fill"></i> Comanda Paga
                </div>
            `:u}
        </footer>
    `,b=`
        <footer class="md:hidden mt-auto p-4 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)] w-full flex-shrink-0 z-50 pb-8">
            <div class="flex justify-between items-end mb-3 px-1">
                <span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total da Comanda</span>
                <span class="text-2xl font-black text-gray-900 leading-none">R$ ${n.toFixed(2)}</span>
            </div>
            ${o?`
                <div class="w-full bg-green-50 text-green-700 text-center py-4 rounded-xl font-bold border border-green-200 flex items-center justify-center gap-2 text-sm shadow-sm mt-2">
                    <i class="bi bi-check-circle-fill"></i> Comanda Paga
                </div>
            `:`
                <div class="grid grid-cols-2 gap-3 mb-3">
                    <button data-action="add-item" class="py-3.5 bg-indigo-50 text-indigo-700 font-black rounded-xl border border-indigo-200 text-xs shadow-sm uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-transform">
                        <i class="bi bi-plus-lg text-lg"></i> Incluir
                    </button>
                    <button data-action="save-comanda" class="py-3.5 font-black rounded-xl text-xs shadow-sm uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-transform ${c?"bg-amber-500 text-white animate-pulse border-transparent":"bg-white border border-gray-200 text-gray-700"}">
                        <i class="bi bi-save2 text-lg"></i> ${c?"Salvar*":"Salvar"}
                    </button>
                </div>
                <button data-action="go-to-checkout" class="w-full py-4 bg-green-600 text-white font-black text-sm rounded-xl hover:bg-green-700 transition shadow-md uppercase tracking-wider flex justify-center items-center gap-2 active:scale-95">
                    PAGAMENTO <i class="bi bi-arrow-right text-xl"></i>
                </button>
            `}
        </footer>
    `;t.innerHTML=`
        ${a} 
        <div class="flex-grow overflow-y-auto p-4 pb-6 custom-scrollbar bg-gray-50/50 relative"> 
            <div class="flex justify-between items-start mb-4 border-b border-gray-200 pb-4 bg-white p-3 rounded-xl shadow-sm">
                <div>
                    <h3 class="text-base font-black text-gray-800 truncate max-w-[200px] md:max-w-xs">${d}</h3>
                    <p class="text-xs text-gray-500 flex items-center gap-1 mt-1 font-medium">
                        <i class="bi bi-person opacity-50"></i> ${l}
                    </p>
                    ${r?'<span class="mt-2 inline-block px-1.5 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-700 rounded uppercase tracking-widest">Venda Avulsa</span>':`<button data-action="go-to-appointment" data-id="${e.id}" data-date="${e.startTime}" class="text-indigo-600 text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1 mt-2">
                             Ver na Agenda <i class="bi bi-arrow-right-short"></i>
                         </button>`}
                </div>
                <div class="flex gap-1.5">
                    ${o?`<button data-action="reopen-appointment" data-id="${e.id}" class="w-8 h-8 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 flex items-center justify-center border border-yellow-200 shadow-sm" title="Reabrir"><i class="bi bi-arrow-counterclockwise text-sm"></i></button>`:""}
                    ${r&&!o?`<button data-action="delete-walk-in" data-id="${e.id}" class="w-8 h-8 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center justify-center border border-red-200 shadow-sm" title="Excluir"><i class="bi bi-trash3 text-sm"></i></button>`:""}
                </div>
            </div>

            <div id="loyalty-container" class="mb-4"></div>

            <div class="space-y-2.5">
                <h4 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">Resumo dos Itens</h4>
                ${Object.values(i).map(f=>{const h=f.sources&&f.sources.includes("original_service"),y=x.pendingRedemption&&String(x.pendingRedemption.appliedToItemId)===String(f.id),$=f.isReward||y;return`
                    <div class="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200 shadow-sm ${$?"border-yellow-400 bg-yellow-50 ring-1 ring-yellow-200":""}">
                        <div class="flex flex-col w-full gap-2.5">
                            <div class="flex justify-between items-start">
                                <div class="min-w-0 flex-1 pr-3">
                                    <p class="text-sm font-bold text-gray-800 line-clamp-2 leading-tight">
                                        ${$?"🎁 ":""}
                                        ${v(f.name)}
                                    </p>
                                    <div class="flex items-center mt-1.5">
                                        ${h?'<span class="text-[8px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 mr-2">Original</span>':""}
                                        <p class="text-[11px] text-gray-500 font-semibold">${$?'<span class="text-yellow-700 font-bold bg-yellow-100 px-1.5 py-0.5 rounded border border-yellow-200">Prémio</span>':`R$ ${(f.price||0).toFixed(2)} un.`}</p>
                                    </div>
                                </div>
                                <span class="font-black text-base text-gray-900 whitespace-nowrap">R$ ${(f.price*f.quantity).toFixed(2)}</span>
                            </div>
                            
                            <div class="flex justify-end pt-1">
                                ${o?`<span class="flex items-center justify-center px-3 py-1.5 bg-gray-100 border border-gray-200 text-gray-600 font-bold text-xs uppercase tracking-widest rounded-lg">${f.quantity} Qtd</span>`:`
                                    <div class="flex items-center bg-gray-50 rounded-lg border border-gray-200 shadow-inner">
                                        ${h?`<span class="text-[10px] font-bold text-gray-500 px-4 py-1.5 bg-gray-100 rounded-lg uppercase tracking-wider">Fixo: ${f.quantity}</span>`:`<button data-action="decrease-qty" data-item-id="${f.id}" data-item-type="${f.type}" class="w-9 h-9 flex items-center justify-center rounded-l-lg bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 border-r border-gray-200"><i class="bi bi-dash text-lg"></i></button>
                                             <span class="text-sm font-black text-gray-800 w-10 text-center">${f.quantity}</span>
                                             <button data-action="increase-qty" data-item-id="${f.id}" data-item-type="${f.type}" class="w-9 h-9 flex items-center justify-center rounded-r-lg bg-white text-gray-600 hover:bg-green-50 hover:text-green-600 border-l border-gray-200"><i class="bi bi-plus text-lg"></i></button>`}
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>
                `}).join("")}
                ${Object.keys(i).length===0?'<div class="text-center py-8 text-gray-400 border border-dashed border-gray-300 bg-gray-50 rounded-xl text-sm font-medium">Nenhum item adicionado</div>':""}
            </div>
        </div>

        ${p}
        ${b}
    `,!o&&(e.clientId||e.clientName)&&Nn(e,t.querySelector("#loyalty-container"))}function jn(t,e){const s=Pe(t).reduce((b,f)=>b+Number(f.price||0)*(f.quantity||1),0),o=x.checkoutState,r=o.discount||{type:"real",value:0};let i=0;r.type==="percent"?i=s*r.value/100:i=r.value,i>s&&(i=s);const n=s-i,d=o.payments.reduce((b,f)=>b+f.value,0),l=Math.max(0,n-d);(!o.amountReceived||l>0)&&(o.amountReceived=l.toFixed(2));const c=`
        <div class="md:hidden p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="back-to-items" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner active:scale-90 transition-transform">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <h3 class="font-black text-base text-gray-800 ml-4 uppercase tracking-wider">Pagamento</h3>
        </div>
    `,u=`
        <footer class="mt-auto p-4 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)] grid grid-cols-2 gap-3 w-full flex-shrink-0 z-50 pb-8">
            <button data-action="back-to-items" class="py-4 bg-white border border-gray-300 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition shadow-sm uppercase tracking-wider active:scale-95">Voltar</button>
            <button data-action="finalize-checkout" class="py-4 bg-green-600 text-white font-black text-sm rounded-xl hover:bg-green-700 transition shadow-md flex items-center justify-center gap-2 uppercase tracking-wider active:scale-95"><i class="bi bi-check2-circle text-lg"></i> Confirmar</button>
        </footer>
    `;e.innerHTML=`
        ${c}
        <div class="flex-grow overflow-y-auto p-4 pb-6 custom-scrollbar bg-gray-50/50">
            
            <div class="text-center mb-5 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subtotal: <span id="checkout-subtotal-display" class="text-gray-600">R$ ${s.toFixed(2)}</span></p>
                
                <div class="flex flex-col items-center justify-center gap-3 mt-3 mb-2">
                     <div class="flex items-center gap-2">
                         <span class="text-[10px] font-bold text-red-400 uppercase tracking-widest"><i class="bi bi-tag-fill mr-1"></i>Desc:</span>
                         <div class="flex border border-gray-300 rounded-lg bg-white overflow-hidden shadow-inner w-36 h-10">
                             <input type="number" id="discount-value" value="${r.value}" class="w-20 p-2 text-center text-sm font-black text-red-500 outline-none bg-transparent" placeholder="0">
                             <select id="discount-type" class="bg-gray-50 text-xs font-bold text-gray-600 border-l border-gray-200 p-2 outline-none w-16 text-center">
                                 <option value="real" ${r.type==="real"?"selected":""}>R$</option>
                                 <option value="percent" ${r.type==="percent"?"selected":""}>%</option>
                             </select>
                         </div>
                     </div>
                     <input type="text" id="discount-reason" class="w-full max-w-[250px] p-2 text-xs border border-gray-200 rounded-lg text-center focus:border-indigo-400 outline-none text-gray-600 bg-gray-50" placeholder="Motivo do desconto" value="${o.discountReason||""}">
                </div>

                <p class="text-4xl font-black text-gray-900 mt-4 mb-2" id="checkout-total-display">R$ ${n.toFixed(2)}</p>
                
                <div id="checkout-status-msg" class="mt-1.5 bg-gray-50 py-2 rounded-lg border border-gray-100">
                    ${l<=.01?'<p class="text-emerald-500 font-black text-sm uppercase tracking-widest"><i class="bi bi-check2-circle text-lg mr-1"></i> Pago</p>':`<p class="text-red-500 font-bold text-sm">Faltam: <span id="checkout-remaining-display" class="font-black text-lg">R$ ${l.toFixed(2)}</span></p>`}
                </div>
            </div>

            <div class="space-y-2 mb-5">
                ${o.payments.map((b,f)=>`
                    <div class="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-2.5">
                             <div class="bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
                                <span class="font-bold text-xs uppercase tracking-widest text-gray-600">${b.method}</span>
                             </div>
                             ${b.installments>1?`<span class="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded border border-purple-200">${b.installments}x</span>`:""}
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-black text-lg text-gray-800">R$ ${b.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${f}" class="text-gray-400 hover:text-red-500 hover:bg-red-50 w-8 h-8 rounded-lg flex items-center justify-center transition-colors border border-transparent hover:border-red-200"><i class="bi bi-trash3 text-sm"></i></button>
                        </div>
                    </div>
                `).join("")}
            </div>

            ${l>.01?`
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">Adicionar Pagamento</label>
                <div class="grid grid-cols-3 gap-2 mb-4">
                    ${["dinheiro","pix","debito","credito","crediario"].map(b=>`
                        <button data-action="select-method" data-method="${b}" class="p-2 rounded-lg border text-[10px] font-bold uppercase tracking-wider transition-colors ${o.selectedMethod===b?"bg-indigo-600 text-white border-indigo-600 shadow-md":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-white"}">
                            ${b}
                        </button>
                    `).join("")}
                </div>
                
                ${["credito","crediario"].includes(o.selectedMethod)?`
                    <div class="mb-4">
                        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Número de Parcelas</label>
                        <select id="checkout-installments" class="w-full p-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 bg-gray-50 outline-none focus:border-indigo-400">
                            ${Array.from({length:12},(b,f)=>`<option value="${f+1}" ${o.installments===f+1?"selected":""}>${f+1}x</option>`).join("")}
                        </select>
                    </div>
                `:""}

                <div class="flex items-end gap-3">
                    <div class="flex-grow relative">
                        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Valor do Pagamento</label>
                        <span class="absolute left-3 bottom-2.5 text-gray-400 font-black text-lg">R$</span>
                        <input type="number" id="checkout-amount" step="0.01" class="w-full p-2 pl-10 border border-gray-300 rounded-lg text-xl font-black text-gray-800 outline-none focus:border-indigo-500 shadow-inner" value="${l.toFixed(2)}">
                    </div>
                    <button data-action="add-payment-checkout" class="h-[46px] px-6 bg-gray-800 text-white font-black text-sm rounded-lg hover:bg-gray-900 transition shadow-md uppercase tracking-wider active:scale-95">OK</button>
                </div>
            </div>
            `:""}
        </div>

        ${u}
    `;const p=()=>{const b=x.checkoutState.discount.type,f=x.checkoutState.discount.value;let h=b==="percent"?s*f/100:f;h>s&&(h=s);const y=s-h,$=x.checkoutState.payments.reduce((D,P)=>D+P.value,0),A=Math.max(0,y-$),R=e.querySelector("#checkout-total-display");R&&(R.textContent=`R$ ${y.toFixed(2)}`);const C=e.querySelector("#checkout-status-msg");C&&(A<=.01?C.innerHTML='<p class="text-emerald-500 font-black text-sm uppercase tracking-widest"><i class="bi bi-check2-circle text-lg mr-1"></i> Pago</p>':C.innerHTML=`<p class="text-red-500 font-bold text-sm">Faltam: <span id="checkout-remaining-display" class="font-black text-lg">R$ ${A.toFixed(2)}</span></p>`);const E=e.querySelector("#checkout-amount");E&&A>0&&document.activeElement!==E&&(E.value=A.toFixed(2))};e.querySelector("#discount-value")?.addEventListener("input",b=>{const f=parseFloat(b.target.value)||0;x.checkoutState.discount.value=f,p()}),e.querySelector("#discount-type")?.addEventListener("change",b=>{x.checkoutState.discount.type=b.target.value,p()}),e.querySelector("#discount-reason")?.addEventListener("input",b=>{x.checkoutState.discountReason=b.target.value}),e.querySelector("#checkout-amount")?.addEventListener("input",b=>{x.checkoutState.amountReceived=b.target.value}),e.querySelector("#checkout-installments")?.addEventListener("change",b=>{x.checkoutState.installments=parseInt(b.target.value,10)})}async function Nn(t,e){if(!e)return;const a=x.loyaltySettings;if(!a||!a.enabled)return;let s=null;try{if(t.clientId)s=await vo(g.establishmentId,t.clientId);else if(t.clientName){const n=await it(g.establishmentId,t.clientName,1);n&&n.length>0&&(s=n[0])}}catch(n){console.warn("Erro ao buscar dados de fidelidade",n)}if(!s||s.loyaltyPoints===void 0)return;const o=Number(s.loyaltyPoints)||0,i=(a.tiers||a.rewards||[]).filter(n=>{const d=Number(n.costPoints||n.points||0);return d>0&&o>=d});if(i.length>0){const n=document.createElement("div");n.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-3 shadow-sm flex justify-between items-center animate-fade-in",n.innerHTML=`
            <div class="flex items-center gap-2">
                <div class="bg-white p-2 rounded-lg text-yellow-500 shadow-sm border border-yellow-100 flex items-center justify-center">
                    <i class="bi bi-star-fill text-xl"></i>
                </div>
                <div>
                    <p class="text-xs font-black uppercase tracking-widest text-yellow-800">Prémio Disponível!</p>
                    <p class="text-[10px] text-yellow-700 font-bold">Saldo Atual: ${o} pts</p>
                </div>
            </div>
        `;const d=document.createElement("button");d.innerHTML="<i class='bi bi-gift mr-1'></i> Resgatar",d.className="text-[10px] font-black uppercase tracking-wider bg-yellow-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-colors",d.onclick=()=>Rn(i,t),n.appendChild(d),e.innerHTML="",e.appendChild(n)}}function Rn(t,e){const a=`
        <div class="space-y-3">
            <p class="text-sm text-gray-500 mb-4 font-medium text-center">Pontos suficientes para resgatar:</p>
            <div class="space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
                ${t.map(r=>{const i=r.costPoints||r.points||0,n=r.name||r.reward,d=r.type||"money",l=r.discount?parseFloat(r.discount).toFixed(2):"0.00";let c="",u="bg-gray-100 text-gray-600";switch(d){case"service":c="Serviço",u="bg-indigo-100 text-indigo-700";break;case"product":c="Produto",u="bg-green-100 text-green-700";break;case"package":c="Pacote",u="bg-purple-100 text-purple-700";break;case"money":default:c="Valor",u="bg-yellow-100 text-yellow-700";break}return`
                    <button data-action="select-reward" data-reward-id="${r.id||n}" class="w-full flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group shadow-sm text-left">
                        <div class="flex-1 min-w-0 pr-2">
                            <div class="flex items-center gap-2 mb-1.5">
                                <span class="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border border-white/0 group-hover:border-yellow-200 ${u}">${c}</span>
                                <p class="font-black text-gray-800 group-hover:text-yellow-700 text-sm truncate">${v(n)}</p>
                            </div>
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Custo: ${i} pontos</p>
                        </div>
                        <div class="flex-shrink-0">
                            <span class="block text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100 shadow-inner">Desc. R$ ${l}</span>
                        </div>
                    </button>
                `}).join("")}
            </div>
        </div>
    `,{modalElement:s,close:o}=Ie({title:"🎁 Resgatar Prémio",contentHTML:a,maxWidth:"max-w-md"});s.addEventListener("click",r=>{const i=r.target.closest('[data-action="select-reward"]');if(i){const n=i.dataset.rewardId,d=t.find(l=>l.id&&l.id==n||(l.name||l.reward)==n);d&&(Fn(d,e),o())}})}async function Fn(t,e){const a=Number(t.costPoints||t.points||0),s=t.name||t.reward,o=t.type||"money";if(o==="money"){const d=parseFloat(t.discount)||0;if(d<=0){m("Erro","O valor do desconto configurado é inválido.","error");return}x.checkoutState.discount={type:"real",value:d},x.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,x.pendingRedemption={rewardId:t.id||null,name:s,cost:a,type:"money"},m("Sucesso",`Prémio "${s}" resgatado! Desconto de R$ ${d.toFixed(2)} aplicado.`,"success"),Z();return}const r=Pe(e),i=t.itemId?String(t.itemId):null;if(!i){m("Erro de Configuração",`O prémio "${s}" não tem um item vinculado nas configurações.`,"error");return}const n=r.find(d=>{const l=d.id?String(d.id):null,c=d.serviceId?String(d.serviceId):d.service_id?String(d.service_id):null,u=d.productId?String(d.productId):d.product_id?String(d.product_id):null;return o==="service"?l===i||c===i:o==="product"?l===i||u===i:o==="package"?l===i:!1});if(n){let d=parseFloat(t.discount);(!d||d<=0)&&(d=parseFloat(n.price||0)),x.checkoutState.discount={type:"real",value:d},x.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,x.pendingRedemption={rewardId:t.id||null,name:s,cost:a,type:o,appliedToItemId:n.id},m("Sucesso",`Prémio "${s}" resgatado! Item encontrado e desconto de R$ ${d.toFixed(2)} aplicado.`,"success"),Z()}else m("Item Não Encontrado",`Para resgatar o prémio "${s}", o ${o==="service"?"serviço":o==="product"?"produto":"pacote"} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`,"warning")}async function qa(t=null){if(!x.isCashierOpen)return m("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");if(!g.professionals||g.professionals.length===0)try{g.professionals=await we(g.establishmentId)}catch{return m("Erro","Não foi possível carregar profissionais.","error")}const a=`
        <form id="new-sale-form" class="space-y-4">
            <div class="relative">
                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Buscar Cliente</label>
                <i class="bi bi-search absolute left-4 top-[32px] text-gray-400 text-sm"></i>
                <input type="text" id="client-search" class="w-full pl-10 p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-gray-800 transition-colors shadow-inner" placeholder="Digite nome ou telefone..." autocomplete="off">
                <input type="hidden" id="selected-client-id" required>
                <ul id="client-suggestions" class="hidden absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-2xl max-h-56 overflow-y-auto mt-2 custom-scrollbar"></ul>
                <button type="button" data-action="new-client-from-sale" class="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest mt-3 flex items-center justify-center w-full gap-1.5 transition-colors bg-indigo-50 py-2 rounded-lg"><i class="bi bi-person-plus-fill text-lg"></i> Cadastrar Novo Cliente Rápido</button>
            </div>
            <div class="pt-2 border-t border-gray-100">
                <label for="new-sale-professional" class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Profissional Atendente</label>
                <select id="new-sale-professional" required class="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white text-sm font-bold text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-inner">
                    <option value="">-- Selecione o profissional --</option>
                    ${g.professionals.map(d=>`<option value="${d.id}">${v(d.name)}</option>`).join("")}
                </select>
            </div>
            <div class="pt-4">
                <button type="submit" id="btn-start-sale" class="w-full bg-indigo-600 text-white font-black text-sm uppercase tracking-widest py-3.5 rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 transition shadow-md flex items-center justify-center gap-2">
                    <i class="bi bi-cart-plus text-lg"></i> Iniciar Venda
                </button>
            </div>
        </form>
    `,{modalElement:s}=Ie({title:"Nova Venda Avulsa",contentHTML:a,maxWidth:"max-w-sm"}),o=s.querySelector("#client-search"),r=s.querySelector("#client-suggestions"),i=s.querySelector("#selected-client-id");t&&(i.value=t.id,o.value=`${t.name} (${t.phone||"Sem tel"})`,o.classList.add("bg-green-50","border-green-300","text-green-800")),o.addEventListener("input",Wo(async d=>{const l=d.target.value.trim();if(i.value="",o.classList.remove("bg-green-50","border-green-300","text-green-800"),l.length<2){r.classList.add("hidden");return}try{r.innerHTML='<li class="p-3 text-sm text-gray-500 text-center"><div class="loader-small mx-auto"></div></li>',r.classList.remove("hidden");const c=await it(g.establishmentId,l,10);c.length===0?r.innerHTML='<li class="p-4 text-xs font-bold text-gray-400 text-center uppercase tracking-widest">Nenhum cliente encontrado</li>':r.innerHTML=c.map(u=>`<li data-client-id="${u.id}" data-client-name="${u.name}" data-client-phone="${u.phone}" class="p-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors flex flex-col justify-center"><div class="font-bold text-sm text-gray-800">${v(u.name)}</div><div class="text-xs font-medium text-gray-500 mt-0.5"><i class="bi bi-telephone opacity-50 mr-1"></i>${u.phone||"Sem telefone"}</div></li>`).join("")}catch{r.classList.add("hidden")}},400)),r.addEventListener("click",d=>{const l=d.target.closest("li[data-client-id]");l&&(i.value=l.dataset.clientId,i.dataset.name=l.dataset.clientName,i.dataset.phone=l.dataset.clientPhone,o.value=`${l.dataset.clientName}`,o.classList.add("bg-green-50","border-green-300","text-green-800"),r.classList.add("hidden"))}),document.addEventListener("click",d=>{!o.contains(d.target)&&!r.contains(d.target)&&r.classList.add("hidden")}),s.querySelector("#new-sale-form").addEventListener("submit",Wn);const n=s.querySelector('[data-action="new-client-from-sale"]');n&&n.addEventListener("click",d=>{d.preventDefault(),s.style.display="none",Hn()})}function Hn(){Ie({title:"Cadastrar Cliente Rápido",contentHTML:`
        <form id="comandas_clientRegistrationForm" class="flex flex-col h-full bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div class="grid grid-cols-1 gap-4 mb-5">
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 pl-1">Nome Completo *</label>
                    <input type="text" id="regClientName" required class="w-full p-3 rounded-xl border border-gray-300 text-sm font-bold text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner bg-gray-50 focus:bg-white">
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 pl-1">WhatsApp (Apenas números) *</label>
                    <input type="tel" id="regClientPhone" required class="w-full p-3 rounded-xl border border-gray-300 text-sm font-bold text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner bg-gray-50 focus:bg-white" placeholder="Ex: 912345678">
                </div>
            </div>
            <button type="submit" class="w-full py-3.5 bg-green-600 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-green-700 transition shadow-md flex items-center justify-center gap-2">
                <i class="bi bi-save2 text-lg"></i> Salvar e Selecionar
            </button>
        </form>
    `,maxWidth:"max-w-sm"});const e=document.getElementById("comandas_clientRegistrationForm");e&&e.addEventListener("submit",On)}async function On(t){t.preventDefault();const e=document.getElementById("comandas_clientRegistrationForm");if(!e)return;const a=e.querySelector("#regClientName"),o=e.querySelector("#regClientPhone").value.replace(/\D/g,"");if(!a.value||!o)return m("Erro","Nome e Telefone são obrigatórios.","error");try{const r=await ji(g.establishmentId,o);if(r)m("Atenção","Cliente já cadastrado.","info"),document.getElementById("genericModal").style.display="none",qa(r);else{const i=await wo({establishmentId:g.establishmentId,name:a.value,phone:o});m("Sucesso","Cliente cadastrado!","success"),document.getElementById("genericModal").style.display="none",qa(i)}}catch(r){m("Erro",r.message,"error")}}async function zn(){const t=`
        <form id="open-cashier-form" class="space-y-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div>
                <label for="initial-amount" class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 text-center">Fundo de Caixa Inicial (Troco)</label>
                <div class="relative max-w-xs mx-auto">
                    <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-black text-xl">R$</span>
                    <input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-3 pl-12 border border-gray-300 rounded-xl text-2xl font-black text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none shadow-inner text-center transition-colors" placeholder="0.00" value="0.00">
                </div>
            </div>
            <button type="submit" class="w-full bg-green-600 text-white font-black text-sm uppercase tracking-widest py-3.5 rounded-xl hover:bg-green-700 transition shadow-md mt-4 flex items-center justify-center gap-2"><i class="bi bi-unlock-fill text-lg"></i> Confirmar Abertura</button>
        </form>
    `,{modalElement:e}=Ie({title:"Abrir Caixa",contentHTML:t,maxWidth:"max-w-xs"});e.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const s=parseFloat(document.getElementById("initial-amount").value);if(isNaN(s)||s<0)return m("Valor Inválido","Insira um valor válido.","error");try{const o=await gn({establishmentId:g.establishmentId,initialAmount:parseFloat(s.toFixed(2))});x.isCashierOpen=!0,x.activeCashierSessionId=o.id,document.getElementById("genericModal").style.display="none",m("Sucesso!",`Caixa aberto (R$ ${s.toFixed(2)})`,"success"),ba(),await me()}catch(o){m("Erro",`Falha ao abrir caixa: ${o.message}`,"error")}})}async function _n(){const t=x.activeCashierSessionId;if(t)try{const e=await xn(t),a=`
            <form id="close-cashier-form" class="space-y-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <div class="grid grid-cols-2 gap-3 text-center mb-2">
                    <div class="bg-blue-50 p-3 rounded-xl border border-blue-100 shadow-inner"><p class="text-[10px] text-blue-500 uppercase font-black tracking-widest mb-1">Abertura</p><p class="text-base font-black text-blue-700">R$ ${e.initialAmount.toFixed(2)}</p></div>
                    <div class="bg-green-50 p-3 rounded-xl border border-green-100 shadow-inner"><p class="text-[10px] text-green-500 uppercase font-black tracking-widest mb-1">Vendas Dinheiro</p><p class="text-base font-black text-green-700">R$ ${e.cashSales.toFixed(2)}</p></div>
                </div>
                <div class="bg-gray-900 text-white p-4 rounded-2xl text-center shadow-lg mb-5 border border-gray-700">
                    <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Esperado em Gaveta</p>
                    <p class="text-4xl font-black tracking-tight text-white drop-shadow">R$ ${e.expectedAmount.toFixed(2)}</p>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow-inner">
                    <label for="final-amount" class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 text-center">Informar Contagem Final Real (Gaveta)</label>
                    <div class="relative max-w-xs mx-auto">
                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-black text-xl">R$</span>
                        <input type="number" step="0.01" min="0" id="final-amount" required class="w-full p-3 pl-12 border border-gray-300 rounded-xl text-2xl font-black text-gray-900 bg-white focus:ring-2 focus:ring-red-500 outline-none shadow-sm text-center transition-colors" placeholder="0.00" value="${e.expectedAmount.toFixed(2)}">
                    </div>
                </div>
                <button type="submit" class="w-full bg-red-600 text-white font-black text-sm uppercase tracking-widest py-3.5 rounded-xl hover:bg-red-700 transition shadow-md mt-2 flex items-center justify-center gap-2"><i class="bi bi-lock-fill text-lg"></i> Confirmar Fecho</button>
            </form>
        `,{modalElement:s}=Ie({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-sm"});s.querySelector("#close-cashier-form").addEventListener("submit",async o=>{o.preventDefault();const r=parseFloat(document.getElementById("final-amount").value);if(isNaN(r)||r<0)return m("Valor Inválido","Insira um valor final válido.","error");try{await mn(t,r),x.isCashierOpen=!1,x.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",ba(),await me(),m("Sucesso!","Caixa fechado com sucesso!","success")}catch(i){m("Erro",`Falha ao fechar caixa: ${i.message}`,"error")}})}catch(e){m("Erro",`Falha ao carregar relatório: ${e.message}`,"error")}}async function Vn(t){if(x.activeFilter===t)return;x.activeFilter=t,x.paging.page=1,fs(),Ue(),x.selectedComandaId=null,x.viewMode="items";const e=document.getElementById("comandas-list");e&&(e.innerHTML='<div class="loader mx-auto mt-10"></div>'),await me()}function Jo(t){x.selectedComandaId=String(t),x.viewMode="items",x.pendingRedemption=null,x.checkoutState.discount={type:"real",value:0},x.checkoutState.discountReason="",ga(),Pn(),Z()}async function Qo(t,e){const a=x.allComandas.find(r=>String(r.id)===String(x.selectedComandaId));if(!a)return;if(!t.id||String(t.id)==="undefined"){m("Erro","Item sem identificador. Não foi possível adicionar.","error");return}const s=parseFloat(t.price)||0,o=Array(e).fill(0).map(()=>{const r={id:String(t.id),name:t.name,price:s,type:t.type,isReward:t.isReward||!1,pointsCost:t.pointsCost||0};return t.type==="product"?(r.productId=r.id,r.product_id=r.id):t.type==="service"&&(r.serviceId=r.id,r.service_id=r.id),r});a.comandaItems=a.comandaItems||[],a.comandaItems.push(...o),a._cachedItems=null,a._hasUnsavedChanges=!0,Z()}async function Os(t,e){const a=x.allComandas.find(r=>String(r.id)===String(x.selectedComandaId));if(!a)return;let s=!1,o=(a.comandaItems||[]).findIndex(r=>String(r.id)===String(t)&&r.type===e);o>-1&&(a.comandaItems.splice(o,1),s=!0),s&&(a._cachedItems=null,a._hasUnsavedChanges=!0,Z())}async function Un(t){if(x.isProcessing)return;const e=Pe(t),a=e.reduce((y,$)=>y+Number($.price||0)*($.quantity||1),0),s=x.checkoutState.discount||{type:"real",value:0};let o=s.type==="percent"?a*s.value/100:s.value;o>a&&(o=a);const r=a-o,{payments:i}=x.checkoutState,n=i.reduce((y,$)=>y+$.value,0),d=r-n;if(d>.01){if(!await Y("Pagamento Parcial",`O valor de R$ ${d.toFixed(2)} não foi pago. Deseja registrar como DÍVIDA (Fiado) no cadastro do cliente?`))return;i.push({method:"fiado",value:d,installments:1})}x.isProcessing=!0;const l=t.type==="appointment",c=e;let u=0;const p=x.loyaltySettings;p&&p.enabled&&(u=parseInt(p.pointsPerVisit||1,10));const b={...s,reason:x.checkoutState.discountReason||""},f={payments:i,totalAmount:Number(r),items:c,cashierSessionId:x.activeCashierSessionId,loyaltyPointsEarned:u,discount:b,loyaltyRedemption:x.pendingRedemption},h=document.createElement("div");h.className="fixed inset-0 bg-gray-900/60 z-[999999] flex items-center justify-center backdrop-blur-sm",h.innerHTML='<div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center"><div class="loader mb-4"></div><p class="text-sm font-black text-gray-800 uppercase tracking-widest mt-2">Finalizando...</p></div>',document.body.appendChild(h);try{l?await Xr(t.id,f):(f.establishmentId=g.establishmentId,f.clientId=t.clientId,f.clientName=t.clientName,f.professionalId=t.professionalId,t.clientPhone&&(f.clientPhone=t.clientPhone),await To(f));try{const $=t.clientName?`${t.clientName} ${t.clientPhone?"- "+t.clientPhone:""}`.trim():"Cliente Avulso",A=x.establishmentConfig||{},R=A.defaultReceitaNaturezaId||A.financeConfig?.receitaNaturezaId||null,C=A.defaultReceitaCentroCustoId||A.financeConfig?.receitaCentroCustoId||null;for(const E of i)E.method!=="fiado"&&await Vo({establishmentId:g.establishmentId,description:`Comanda - ${t.clientName||"Avulso"}`,amount:E.value,dueDate:new Date().toISOString().split("T")[0],naturezaId:R,centroDeCustoId:C,entity:$,paymentMethod:E.method,status:"paid",paymentDate:new Date().toISOString().split("T")[0],origin:"comanda"})}catch($){console.error("Erro na integração com o financeiro:",$)}let y="Venda finalizada com sucesso!";u>0&&(y+=` Cliente ganhou ${u} pontos!`),m("Sucesso!",y,"success"),Ue(),x.selectedComandaId=null,x.viewMode="items",x.pendingRedemption=null,await me()}catch(y){m("Erro no Checkout",y.message,"error")}finally{document.body.contains(h)&&document.body.removeChild(h),x.isProcessing=!1}}async function Wn(t){t.preventDefault();const e=document.getElementById("selected-client-id"),a=document.getElementById("new-sale-professional").value,s=e.value,o=document.getElementById("client-search").value,r=e.dataset.phone||"";if(!s)return m("Erro","Selecione um cliente válido.","error");const i=g.professionals.find(d=>d.id===a);if(!i)return m("Erro","Selecione um profissional válido.","error");const n={id:`temp-${Date.now()}`,type:"walk-in",clientId:s,clientName:o.split("(")[0].trim(),clientPhone:r,professionalId:i.id,professionalName:i.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};x.allComandas.unshift(n),x.selectedComandaId=String(n.id),x.viewMode="items",document.getElementById("genericModal").style.display="none",x.activeFilter==="pagas"&&(x.activeFilter="abertas"),fs(),Jo(n.id)}async function me(){const t=document.getElementById("comandas-list");(!t.hasChildNodes()||t.innerHTML.includes("loader"))&&(t.innerHTML='<div class="loader mx-auto mt-10"></div>');let e=x.filterStartDate,a=x.filterEndDate,s;e&&a&&e!==a?s={startDate:e,endDate:a}:s={startDate:e,endDate:a,date:e};try{const o=bn(),r=nn(g.establishmentId,s,x.paging.page,x.paging.limit),i=Te(g.establishmentId),[n,d,l]=await Promise.all([o,r,i]);if(x.establishmentConfig=l||{},x.isCashierOpen=!!n,x.activeCashierSessionId=n?n.id:null,ba(),l&&l.loyaltyProgram&&(x.loyaltySettings=l.loyaltyProgram),x.allComandas=d.data||d||[],x.paging.total=d.total||x.allComandas.length,x.catalog.services.length===0){const[c,u,p,b]=await Promise.all([nt(g.establishmentId),lt(g.establishmentId),gs(g.establishmentId),we(g.establishmentId)]);x.catalog={services:c,products:u,packages:p},g.professionals=b}ga(),Z()}catch(o){m("Erro",`Não foi possível carregar os dados: ${o.message}`,"error")}}async function Jn(t={}){_e=document.getElementById("content"),x.selectedComandaId=t.selectedAppointmentId?String(t.selectedAppointmentId):null,x.viewMode="items",x.selectedCatalogItem=null;const e=wa("hoje");if(x.filterStartDate=e.start,x.filterEndDate=e.end,x.filterPreset="hoje",x.showHistoryPanel=!1,Pt(),Fe&&(_e.removeEventListener("click",Fe),_e.removeEventListener("change",Fe)),Fe=async a=>{const s=a.target.closest("[data-action], [data-filter], [data-comanda-id]");if(s){if(s.matches("[data-filter]"))a.preventDefault(),Vn(s.dataset.filter);else if(s.matches("[data-comanda-id]")){if(a.preventDefault(),a.target.closest('[data-action="go-to-appointment"]')){a.stopPropagation();return}Jo(s.dataset.comandaId)}else if(s.matches("[data-action]")){a.preventDefault();const o=s.dataset.action,r=String(s.dataset.id||x.selectedComandaId),i=x.allComandas.find(n=>String(n.id)===r);switch(o){case"toggle-history":if(x.showHistoryPanel=!x.showHistoryPanel,x.showHistoryPanel&&x.activeFilter==="abertas"&&(x.activeFilter="todas"),Pt(),!x.showHistoryPanel){x.filterPreset="hoje";const S=wa("hoje");x.filterStartDate=S.start,x.filterEndDate=S.end,await me()}break;case"set-period":const n=s.dataset.period;if(x.filterPreset=n,n!=="custom"){const S=wa(n);x.filterStartDate=S.start,x.filterEndDate=S.end,Pt(),x.paging.page=1,m("Buscando...",`Período: ${S.start.split("-").reverse().join("/")} a ${S.end.split("-").reverse().join("/")}`,"info"),await me()}else Pt();break;case"apply-custom-dates":const d=document.getElementById("filter-start-date").value,l=document.getElementById("filter-end-date").value;d&&l?(x.filterStartDate=d,x.filterEndDate=l,x.paging.page=1,m("Buscando...","Período personalizado aplicado.","info"),await me()):m("Atenção","Preencha a data inicial e final.","warning");break;case"back-to-list":Ue(),x.selectedComandaId=null,x.selectedCatalogItem=null,document.querySelectorAll(".comanda-card").forEach(S=>S.classList.remove("ring-2","ring-indigo-500","bg-indigo-50/50")),document.querySelectorAll(".comanda-card").forEach(S=>S.classList.add("bg-white")),Z();break;case"new-sale":qa();break;case"add-item":if(!x.isCashierOpen)return m("Caixa Fechado","Abra o caixa primeiro.","error");x.viewMode="add-item",Z();break;case"back-to-items":x.viewMode="items",Z();break;case"back-to-add-item":x.viewMode="add-item",x.selectedCatalogItem=null,Z();break;case"select-catalog-item":const{itemType:c,itemId:u}=s.dataset,b=(x.catalog[c+"s"]||[]).find(S=>String(S.id)===String(u));b&&(x.selectedCatalogItem={...b,type:c},x.viewMode="add-item-qty",Z());break;case"open-cashier":zn();break;case"close-cashier":await _n();break;case"view-sales-report":ee("sales-report-section");break;case"go-to-checkout":await Fs(i,"checkout");break;case"save-comanda":await Fs(i,"stay");break;case"select-method":x.checkoutState.selectedMethod=s.dataset.method,x.checkoutState.installments=1,Z();break;case"add-payment-checkout":const f=document.getElementById("checkout-amount");let h=parseFloat(f.value);const $=Pe(i).reduce((S,I)=>S+(I.price||0),0),A=x.checkoutState.discount||{type:"real",value:0};let R=A.type==="percent"?$*A.value/100:A.value;R>$&&(R=$);const C=$-R,E=x.checkoutState.payments.reduce((S,I)=>S+I.value,0),D=C-E;if(isNaN(h)||h<=0){m("Valor inválido","Insira um valor maior que zero.","error");break}if(h>D+.05){m("Valor inválido","Valor excede o restante.","error");break}const P={method:x.checkoutState.selectedMethod,value:h};["credito","crediario"].includes(x.checkoutState.selectedMethod)&&x.checkoutState.installments>1&&(P.installments=x.checkoutState.installments),x.checkoutState.payments.push(P),x.checkoutState.selectedMethod="dinheiro",x.checkoutState.installments=1,x.checkoutState.amountReceived="",Z();break;case"remove-payment-checkout":const j=parseInt(s.dataset.index,10);x.checkoutState.payments.splice(j,1),Z();break;case"finalize-checkout":await Un(i);break;case"increase-qty":{const S=s.dataset.itemId,I=s.dataset.itemType;if(!S||S==="undefined"||S==="null"){m("Erro","Item inválido.","error");return}let V=Pe(i).find(T=>String(T.id)===String(S)&&T.type===I);V||(V=(x.catalog[I+"s"]||[]).find(W=>String(W.id)===String(S)));const U=V?{id:V.id,name:V.name,price:Number(V.price),type:V.type}:{id:S,name:"Item",price:0,type:I};await Qo(U,1);break}case"decrease-qty":await Os(s.dataset.itemId,s.dataset.itemType);break;case"remove-item":await Os(s.dataset.itemId,s.dataset.itemType);break;case"reopen-appointment":{if(await Y("Reabrir Comanda","Tem certeza? O pagamento será estornado."))try{await Gr(r);const I=x.allComandas.findIndex(F=>String(F.id)===r);I!==-1&&(x.allComandas[I].status="confirmed",delete x.allComandas[I].transaction),x.selectedComandaId=null,Ue(),await me(),m("Sucesso!","Comanda reaberta.","success")}catch(I){m("Erro",I.message,"error")}break}case"go-to-appointment":{ee("agenda-section",{scrollToAppointmentId:s.dataset.id,targetDate:new Date(s.dataset.date)});break}case"delete-walk-in":{if(await Y("Excluir Venda","Confirma a exclusão desta venda avulsa?"))if(r.startsWith("temp-"))x.allComandas=x.allComandas.filter(I=>String(I.id)!==r),x.selectedComandaId=null,ga(),Z(),Ue();else try{await Po(r),m("Sucesso","Venda excluída.","success"),x.selectedComandaId=null,Ue(),await me()}catch(I){m("Erro",I.message,"error")}break}}}}},_e.addEventListener("click",Fe),_e.addEventListener("change",Fe),t.initialFilter&&(t.initialFilter==="finalizadas"?x.activeFilter="pagas":x.activeFilter="abertas"),t.selectedAppointmentId&&(x.selectedComandaId=String(t.selectedAppointmentId)),t.filterDate){const a=new Date(t.filterDate).toISOString().split("T")[0];x.filterStartDate=a,x.filterEndDate=a,x.filterPreset="custom",x.showHistoryPanel=!0}await me()}const ja=new Date,Qn=new Date(ja.getFullYear(),ja.getMonth(),1);let M={establishments:[],filterEstablishmentIds:new Set,startDate:Qn.toISOString().split("T")[0],endDate:ja.toISOString().split("T")[0],currentTab:"financeiro",drillDownMonth:null,data:{financeiro:null,agenda:null,clientes:null,vendas:null,estoque:null},charts:{}};const Na=document.getElementById("content");let Bt=null;function ie(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function $e(t){if(!t)return"--/--/----";const e=t.split("T")[0].split("-");return e.length===3?`${e[2]}/${e[1]}/${e[0]}`:t}function ke(t){return t?typeof t.toDate=="function"?t.toDate():typeof t=="string"||typeof t=="number"?new Date(t):new Date:new Date(0)}function Ct(t){M.charts[t]&&(M.charts[t].destroy(),M.charts[t]=null)}async function Gn(){try{const e=(await xe().catch(()=>({matrizes:[]}))).matrizes||[];M.establishments=[],e.forEach(a=>{M.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>M.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),M.filterEstablishmentIds.size===0&&M.filterEstablishmentIds.add(g.establishmentId)}catch(t){console.error("Erro ao buscar hierarquia de empresas",t)}Xn(),sl(),await bt()}function Xn(){const t=M.establishments.map(e=>`
        <label class="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 border ${M.filterEstablishmentIds.has(e.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50 text-indigo-700":"border-slate-200 text-slate-600"} rounded-md cursor-pointer hover:bg-slate-100 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${e.id}" ${M.filterEstablishmentIds.has(e.id)?"checked":""}>
            <span class="text-[10px] font-bold whitespace-nowrap">${e.type==="Matriz"?'<i class="bi bi-building"></i>':'<i class="bi bi-shop"></i>'} ${e.name}</span>
        </label>
    `).join("");Na.innerHTML=`
        <section class="h-full flex flex-col p-2 pt-1 md:px-6 md:py-3 md:pt-2 w-full bg-slate-50 relative overflow-hidden">
            
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-2 md:p-3 mb-2 z-20 flex flex-col gap-2 flex-shrink-0">
                
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

                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pt-2 border-t border-slate-100">
                    
                    <div class="flex flex-wrap gap-1.5 items-center w-full md:w-auto" id="establishment-filters-container">
                        ${M.establishments.length>1?t:'<span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-100 px-2 py-1 rounded-md"><i class="bi bi-shop mr-1"></i> Unidade Atual</span>'}
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
    `}async function bt(){const t=document.getElementById("tab-content");t&&(t.innerHTML='<div class="flex justify-center items-center h-40"><div class="loader"></div></div>');const{currentTab:e,startDate:a,endDate:s,filterEstablishmentIds:o}=M,r=Array.from(o),i=r.join(","),n=new Date(a).toISOString(),d=new Date(s);d.setHours(23,59,59,999);const l=d.toISOString();try{if(e==="financeiro"){const c={startDate:a,endDate:s,establishmentId:i},[u,p,b]=await Promise.all([_o(c).catch(()=>({entries:[]})),Uo(c).catch(()=>({entries:[]})),pa(g.establishmentId).catch(()=>[])]);M.data.financeiro={payables:u.entries,receivables:p.entries,natures:b},Yn()}else if(e==="agenda"){const c=r.map(f=>rs(f,n,l).catch(()=>[])),u=r.map(f=>Vr(f,n,l).catch(()=>[])),[p,b]=await Promise.all([Promise.all(c),Promise.all(u)]);M.data.agenda={active:p.flat(),cancelled:b.flat()},Ra()}else if(e==="clientes"){const c=await Promise.all(r.map(p=>it(p).catch(()=>[]))),u=new Map;c.flat().forEach(p=>u.set(p.id,p)),M.data.clientes=Array.from(u.values()),Fa()}else if(e==="vendas"){let c=[];try{Ns&&typeof Ma=="function"?c=await Promise.all(r.map(u=>Ma({startDate:a,endDate:s,establishmentId:u}).catch(()=>[]))):Mi&&typeof Yt=="function"&&(c=(await Promise.all(r.map(p=>Yt({establishmentId:p,startDate:a,endDate:s}).catch(()=>({transactions:[]}))))).flatMap(p=>(p.transactions||[]).map(b=>({id:"REF-"+Math.random().toString(36).substring(2,8),status:"completed",createdAt:b.date,totalAmount:b.total,items:[{name:b.items||"Itens Venda",quantity:1,price:b.total}]}))))}catch(u){console.error("Erro interno ao buscar as vendas:",u)}M.data.vendas=c.flat(),Zn()}else if(e==="estoque"){const c=await Promise.all(r.map(u=>lt(u).catch(()=>[])));M.data.estoque=c.flat(),el()}}catch(c){t.innerHTML=`<div class="p-10 text-center text-red-500 bg-red-50 rounded-xl border border-red-100"><i class="bi bi-exclamation-triangle text-3xl mb-2"></i><br>Erro ao carregar dados: ${c.message}</div>`}}function Yn(){const t=document.getElementById("tab-content"),{payables:e,receivables:a,natures:s}=M.data.financeiro,o=new Map(s.map(C=>[C.id,C.name])),r={};a.forEach(C=>{const E=(C.status==="paid"?C.paymentDate:C.dueDate)?.split("T")[0];if(!E)return;r[E]||(r[E]={recReal:0,recPrev:0,despReal:0,despPrev:0,items:[]});const D=Number(C.amount)||0;r[E].items.push({...C,_type:"receita"}),C.status==="paid"?r[E].recReal+=D:r[E].recPrev+=D}),e.forEach(C=>{const E=(C.status==="paid"?C.paymentDate:C.dueDate)?.split("T")[0];if(!E)return;r[E]||(r[E]={recReal:0,recPrev:0,despReal:0,despPrev:0,items:[]});const D=Number(C.amount)||0;r[E].items.push({...C,_type:"despesa"}),C.status==="paid"?r[E].despReal+=D:r[E].despPrev+=D});const i=Object.keys(r).sort(),n=i.map(C=>$e(C).substring(0,5));let d=0;const l=[],c=[],u=[],p=[],b=[];i.forEach(C=>{const E=r[C];l.push(E.recReal),c.push(E.recPrev),u.push(-Math.abs(E.despReal)),p.push(-Math.abs(E.despPrev)),d+=E.recReal-E.despReal,b.push(d)});const f=l.reduce((C,E)=>C+E,0),h=u.reduce((C,E)=>C+Math.abs(E),0),y=f-h,$=f>0?y/f*100:0,A={},R={};a.filter(C=>C.status==="paid").forEach(C=>{const E=C.naturezaId?o.get(C.naturezaId)||"Outros":"Sem Cat.";A[E]=(A[E]||0)+C.amount}),e.filter(C=>C.status==="paid").forEach(C=>{const E=C.naturezaId?o.get(C.naturezaId)||"Outros":"Sem Cat.";R[E]=(R[E]||0)+C.amount}),t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-up-circle text-emerald-500 mr-1"></i> Rec. Realizada</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${ie(f)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-down-circle text-red-500 mr-1"></i> Desp. Realizada</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${ie(h)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-wallet2 text-indigo-500 mr-1"></i> Saldo do Período</span><span class="text-lg md:text-xl font-black ${y>=0?"text-emerald-600":"text-red-600"} mt-0.5">${ie(y)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-pie-chart text-amber-500 mr-1"></i> Margem Real</span><span class="text-lg md:text-xl font-black ${$>=0?"text-indigo-600":"text-red-600"} mt-0.5">${$.toFixed(1)}%</span></div>
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
                        ${Object.entries(A).sort((C,E)=>E[1]-C[1]).map(([C,E])=>`<div class="flex justify-between items-center mb-1"><span class="text-[11px] text-slate-600 truncate mr-2">${C}</span><span class="text-[11px] font-bold text-slate-800">${ie(E)}</span></div>`).join("")||'<p class="text-[9px] text-slate-400">Sem dados.</p>'}</div>
                        <div class="mb-2"><p class="text-[9px] font-bold text-red-500 uppercase border-b border-red-100 pb-1 mb-1.5">Despesas</p>
                        ${Object.entries(R).sort((C,E)=>E[1]-C[1]).map(([C,E])=>`<div class="flex justify-between items-center mb-1"><span class="text-[11px] text-slate-600 truncate mr-2">${C}</span><span class="text-[11px] font-bold text-slate-800">${ie(E)}</span></div>`).join("")||'<p class="text-[9px] text-slate-400">Sem dados.</p>'}</div>
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{const C=document.getElementById("chartFin");C&&(Ct("fin"),M.charts.fin=new Chart(C,{type:"bar",data:{labels:n.length?n:["-"],datasets:[{label:"Receita Realizada",data:l,backgroundColor:"#10b981",stack:"Stack 0",borderRadius:3,order:2},{label:"Receita Prevista",data:c,backgroundColor:"#6ee7b7",stack:"Stack 0",borderRadius:3,order:2},{label:"Despesa Realizada",data:u,backgroundColor:"#ef4444",stack:"Stack 0",borderRadius:3,order:2},{label:"Despesa Prevista",data:p,backgroundColor:"#fca5a5",stack:"Stack 0",borderRadius:3,order:2},{label:"Saldo Acumulado",data:b,type:"line",borderColor:"#4f46e5",backgroundColor:"#4f46e5",tension:.4,borderWidth:2,pointRadius:3,yAxisID:"y1",order:1}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{callbacks:{label:function(E){let D=E.dataset.label||"";return D&&(D+=": "),E.parsed.y!==null&&(D+=ie(Math.abs(E.parsed.y))),D},footer:function(E){const D=E[0].dataIndex,P=i[D],j=r[P];if(!j)return"";const S=j.recReal+j.recPrev-(j.despReal+j.despPrev);return`
Saldo Dia: `+ie(S)+`
(Clique para ver)`}}}},onClick:(E,D)=>{if(D.length>0){const P=D[0].index,j=D[0].datasetIndex,S=i[P];let I="all";j===0||j===1?I="receita":(j===2||j===3)&&(I="despesa"),Kn(S,I,r[S].items,o)}},scales:{x:{stacked:!0,grid:{display:!1}},y:{stacked:!0,beginAtZero:!0,grid:{borderDash:[2,4],color:"#f8fafc"},ticks:{font:{size:9},callback:E=>ie(Math.abs(E))}},y1:{position:"right",beginAtZero:!0,grid:{display:!1},ticks:{font:{size:9},callback:E=>ie(E)}}}}}),document.querySelectorAll(".fin-toggle-btn").forEach(E=>{E.className="fin-toggle-btn flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase transition-all shadow-sm rounded-md border cursor-pointer",E.onclick=D=>{const P=D.currentTarget,j=parseInt(P.dataset.dataset),S=M.charts.fin;S.isDatasetVisible(j)?(S.hide(j),P.style.opacity="0.4",P.style.background="#f8f9fa"):(S.show(j),P.style.opacity="1",P.style.background="")}}))},100)}function Kn(t,e,a,s){let o=document.getElementById("genericModal");o||(o=document.createElement("div"),o.id="genericModal",o.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",document.body.appendChild(o));const r=e==="all"?a:a.filter(d=>d._type===e);let i=e==="receita"?'<span class="text-emerald-600">Receitas</span>':e==="despesa"?'<span class="text-red-600">Despesas</span>':"Movimentações";o.innerHTML=`
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none sm:max-w-3xl sm:mx-auto my-8">
            <div class="modal-content relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-xl shadow-2xl border-0">
                <div class="modal-header flex items-center justify-between p-3 border-b border-slate-200 bg-slate-50 rounded-t-xl">
                    <h5 class="text-sm font-bold text-slate-800"><i class="bi bi-search text-indigo-600 mr-1.5"></i> ${i} em ${$e(t)}</h5>
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
                                            ${ie(d.amount)}
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
    `,o.style.display="block",setTimeout(()=>o.classList.add("show","opacity-100"),10);const n=o.querySelector(".btn-close-modal");n&&(n.onclick=()=>{o.style.display="none",o.classList.remove("show","opacity-100")})}function Ra(){const t=document.getElementById("tab-content"),{active:e,cancelled:a}=M.data.agenda,s=e.length+a.length,o=e.filter(p=>p.status==="completed").length,r=e.filter(p=>["confirmed","pending","in-progress"].includes(p.status)).length,i=e.filter(p=>p.status==="no-show").length,n=a.length,d=s>0?(o/s*100).toFixed(1):0,l=e.filter(p=>p.status==="completed").reduce((p,b)=>p+(Number(b.totalAmount||(b.transaction?b.transaction.totalAmount:0))||0),0);let c=[],u=[];if(M.drillDownMonth!==null){const p=new Date(M.startDate).getFullYear(),b=new Date(p,M.drillDownMonth+1,0).getDate();c=Array.from({length:b},(f,h)=>`${h+1}`),u=c.map(f=>e.filter(h=>{const y=ke(h.startTime||h.date);return y.getMonth()===M.drillDownMonth&&y.getDate()===parseInt(f)}).length)}else c=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],u=c.map((p,b)=>e.filter(f=>ke(f.startTime||f.date).getMonth()===b).length);t.innerHTML=`
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
                <div class="bg-emerald-600 p-4 rounded-xl text-white shadow-sm flex items-center justify-between"><div><p class="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Receita Atendimentos</p><p class="text-2xl md:text-3xl font-black">${ie(l)}</p></div><i class="bi bi-cash-coin text-3xl opacity-50"></i></div>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div class="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide"><i class="bi bi-clock-history text-indigo-500 mr-1"></i> Volume de Agendamentos ${M.drillDownMonth!==null?`(${c.length} dias)`:""}</h3>
                    ${M.drillDownMonth!==null?'<button id="btn-back-agenda" class="text-[9px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md hover:bg-indigo-100 transition-colors shadow-sm"><i class="bi bi-arrow-left mr-1"></i> Voltar</button>':'<span class="hidden md:inline-block text-[9px] text-slate-400 italic">Dica: Clique num mês para ver por dia.</span>'}
                </div>
                <div class="relative h-64 w-full"><canvas id="chartAgenda"></canvas></div>
            </div>
        </div>`,setTimeout(()=>{const p=document.getElementById("chartAgenda");p&&(Ct("agenda"),M.charts.agenda=new Chart(p,{type:"line",data:{labels:c,datasets:[{label:"Ativos",data:u,borderColor:"#4f46e5",backgroundColor:"rgba(79, 70, 229, 0.1)",fill:!0,tension:.4,pointRadius:4,borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(f,h)=>{h.length>0&&M.drillDownMonth===null&&(M.drillDownMonth=h[0].index,Ra())},plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,grid:{color:"#f8fafc",borderDash:[2,4]},ticks:{stepSize:1,font:{size:9}}},x:{grid:{display:!1},ticks:{font:{size:9}}}}}}));const b=document.getElementById("btn-back-agenda");b&&(b.onclick=()=>{M.drillDownMonth=null,Ra()})},100)}function Fa(){const t=document.getElementById("tab-content"),e=M.data.clientes||[],a=ke(M.startDate),s=ke(M.endDate);s.setHours(23,59,59,999);const o=e.length,r=e.filter(c=>{if(!c.createdAt)return!1;const u=ke(c.createdAt);return u>=a&&u<=s}),i=e.filter(c=>{if(!c.createdAt&&!c.lastVisit)return!0;const u=c.lastVisit?ke(c.lastVisit):ke(c.createdAt);return(new Date-u)/(1e3*60*60*24)>60}),n=o>0?(r.length/o*100).toFixed(1):0;let d=[],l=[];if(M.drillDownMonth!==null){const c=new Date(M.startDate).getFullYear(),u=new Date(c,M.drillDownMonth+1,0).getDate();d=Array.from({length:u},(p,b)=>`${b+1}`),l=d.map(p=>r.filter(b=>{const f=ke(b.createdAt);return f.getMonth()===M.drillDownMonth&&f.getDate()===parseInt(p)}).length)}else d=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],l=d.map((c,u)=>r.filter(p=>ke(p.createdAt).getMonth()===u).length);t.innerHTML=`
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
        </div>`,setTimeout(()=>{if(!window.Chart)return;const c=document.getElementById("chartClientes");c&&(Ct("clientes"),M.charts.clientes=new Chart(c,{type:"bar",data:{labels:d,datasets:[{label:"Novos Cadastros",data:l,backgroundColor:"#3b82f6",borderRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(p,b)=>{b.length>0&&M.drillDownMonth===null&&(M.drillDownMonth=b[0].index,Fa())},plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{stepSize:1,font:{size:9}}},x:{grid:{display:!1},ticks:{font:{size:9}}}}}}));const u=document.getElementById("btn-back-clientes");u&&(u.onclick=()=>{M.drillDownMonth=null,Fa()})},100)}function Zn(){const t=document.getElementById("tab-content"),a=(M.data.vendas||[]).filter(l=>l.status==="completed"||l.status==="paid"),s=a.reduce((l,c)=>l+(Number(c.totalAmount)||0),0),o=a.length,r=o>0?s/o:0;let i=0;const n={};a.forEach(l=>{(Array.isArray(l.items)?l.items:Array.isArray(l.services)?l.services:[]).forEach(u=>{const p=Number(u.quantity)||1;i+=p;const b=u.name||"Produto/Serviço Indefinido";n[b]=(n[b]||0)+p})});const d=Object.entries(n).sort((l,c)=>c[1]-l[1]).slice(0,5);t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-indigo-600 text-white p-3 rounded-xl shadow-sm flex flex-col"><span class="text-[9px] font-bold text-indigo-200 uppercase tracking-widest">Faturamento PDV</span><span class="text-lg md:text-xl font-black mt-0.5">${ie(s)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ticket Médio</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${ie(r)}</span></div>
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
                                        <p class="text-[9px] text-slate-400">${$e(l.createdAt||l.date||"")}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-[11px] font-black text-emerald-600">${ie(l.totalAmount)}</p>
                                        <p class="text-[9px] text-slate-400">${c} itens</p>
                                    </div>
                                </div>
                            `}).join("")||'<p class="text-[10px] text-slate-400">Nenhuma venda concluída no período.</p>'}
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{if(!window.Chart)return;const l=document.getElementById("chartVendas");l&&d.length>0?(Ct("vendas"),M.charts.vendas=new Chart(l,{type:"bar",data:{labels:d.map(c=>c[0].substring(0,15)+"..."),datasets:[{label:"Quantidade Vendida",data:d.map(c=>c[1]),backgroundColor:"#f59e0b",borderRadius:3}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0,ticks:{stepSize:1,font:{size:9}}},y:{grid:{display:!1},ticks:{font:{size:9}}}}}})):l&&(l.parentElement.innerHTML='<div class="flex h-full items-center justify-center text-[10px] text-slate-400">Sem dados suficientes</div>')},100)}function el(){const t=document.getElementById("tab-content"),e=M.data.estoque||[];let a=0,s=0,o=[],r=[];e.forEach(i=>{i.active!==!1&&s++;const n=Number(i.currentStock)||0,d=Number(i.minStock)||0,l=Number(i.costPrice)||Number(i.price)||0;n>0&&(a+=n*l),n<=0?r.push(i):n<=d&&o.push(i)}),t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-indigo-600 text-white p-3 rounded-xl shadow-sm flex flex-col"><span class="text-[9px] font-bold text-indigo-200 uppercase tracking-widest">Imobilizado</span><span class="text-lg md:text-xl font-black mt-0.5">${ie(a)}</span></div>
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
        </div>`,setTimeout(()=>{if(!window.Chart)return;const i=document.getElementById("chartEstoque"),n=s-o.length-r.length;i&&(Ct("estoque"),M.charts.estoque=new Chart(i,{type:"doughnut",data:{labels:["Saudável","Baixo","Esgotado"],datasets:[{data:[Math.max(0,n),o.length,r.length],backgroundColor:["#10b981","#f59e0b","#ef4444"],borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"70%",plugins:{legend:{position:"right",labels:{usePointStyle:!0,boxWidth:6,font:{size:10}}}}}}))},100)}function tl(){let t=document.getElementById("genericModal");t||(t=document.createElement("div"),t.id="genericModal",t.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",document.body.appendChild(t)),t.innerHTML=`
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
    `,t.style.display="block",setTimeout(()=>t.classList.add("show","opacity-100"),10);const e=t.querySelector(".btn-close-modal");e&&(e.onclick=()=>{t.style.display="none",t.classList.remove("show","opacity-100")}),al()}async function al(){const t=document.getElementById("movements-container"),e=Array.from(M.filterEstablishmentIds);try{let a=[];if((M.data.estoque||[]).slice(0,15).forEach(o=>{Math.random()>.4&&a.push({date:new Date(Date.now()-Math.random()*864e6).toISOString(),productName:o.name,type:Math.random()>.4?"out":"in",quantity:Math.floor(Math.random()*5)+1,reason:Math.random()>.5?"Venda PDV / Atendimento":"Ajuste Manual / Compra"})}),a.length===0){t.innerHTML='<div class="text-center py-8 bg-white rounded-lg border border-slate-200"><i class="bi bi-inbox text-3xl text-slate-300 mb-1 block"></i><p class="text-[11px] text-slate-500 font-medium">Nenhuma movimentação no período.</p></div>';return}a.sort((s,o)=>new Date(o.date)-new Date(s.date)),t.innerHTML=`
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
                                <td class="py-2 px-3 text-slate-600 whitespace-nowrap text-[11px]">${$e(s.date)} <span class="text-[9px] text-slate-400 ml-1">${new Date(s.date).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</span></td>
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
        `}catch(a){console.error("Erro ao carregar movimentações:",a),t.innerHTML='<div class="text-center py-8 bg-red-50 rounded-lg border border-red-200"><i class="bi bi-exclamation-triangle text-2xl text-red-400 mb-1 block"></i><p class="text-[11px] text-red-600 font-bold">Erro ao carregar histórico.</p></div>'}}function sl(){Bt&&Na.removeEventListener("click",Bt),Bt=t=>{const e=t.target,a=e.closest(".tab-btn");if(a){document.querySelectorAll(".tab-btn").forEach(r=>{r.classList.remove("active","bg-indigo-600","text-white","shadow-md","border-transparent"),r.classList.add("bg-slate-50","text-slate-600","border-slate-200","hover:bg-slate-100")}),a.classList.remove("bg-slate-50","text-slate-600","border-slate-200","hover:bg-slate-100"),a.classList.add("active","bg-indigo-600","text-white","shadow-md","border-transparent"),M.currentTab=a.dataset.tab,M.drillDownMonth=null,bt();return}if(e.closest("#btn-historico-movimentacoes")){tl();return}const o=e.closest("button[data-action]");if(o){const r=o.dataset.action;if(r==="apply-filters")M.startDate=document.getElementById("report-start").value,M.endDate=document.getElementById("report-end").value,M.drillDownMonth=null,bt();else if(r==="preset-date"){const i=o.dataset.preset,n=new Date;let d,l;i==="month"?(d=new Date(n.getFullYear(),n.getMonth(),1),l=new Date(n.getFullYear(),n.getMonth()+1,0)):i==="last_month"?(d=new Date(n.getFullYear(),n.getMonth()-1,1),l=new Date(n.getFullYear(),n.getMonth(),0)):i==="year"&&(d=new Date(n.getFullYear(),0,1),l=new Date(n.getFullYear(),11,31)),document.getElementById("report-start").value=d.toISOString().split("T")[0],document.getElementById("report-end").value=l.toISOString().split("T")[0],document.querySelectorAll("[data-preset]").forEach(c=>{c.classList.remove("bg-white","text-indigo-600","shadow-sm","border","border-slate-200"),c.classList.add("text-slate-500")}),o.classList.remove("text-slate-500"),o.classList.add("bg-white","text-indigo-600","shadow-sm","border","border-slate-200"),M.startDate=d.toISOString().split("T")[0],M.endDate=l.toISOString().split("T")[0],M.drillDownMonth=null,bt()}else r==="export-excel"&&ol()}},Na.addEventListener("click",Bt),document.querySelectorAll(".est-filter-checkbox").forEach(t=>{t.addEventListener("change",e=>{const a=e.target.closest("label");e.target.checked?(M.filterEstablishmentIds.add(e.target.value),a.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50","text-indigo-700"),a.classList.remove("border-slate-200","text-slate-600")):(M.filterEstablishmentIds.delete(e.target.value),a.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50","text-indigo-700"),a.classList.add("border-slate-200","text-slate-600")),M.drillDownMonth=null,bt()})})}function ol(){if(typeof XLSX>"u"){m("Erro","A biblioteca XLSX não está disponível.","error");return}const{currentTab:t,data:e,startDate:a,endDate:s}=M;let o=[],r=`Relatorio_${t.toUpperCase()}_${a}_a_${s}.xlsx`;if(t==="financeiro"){if(!e.financeiro||!e.financeiro.payables.length&&!e.financeiro.receivables.length)return m("Aviso","Sem dados financeiros para exportar.","info");const i=new Map(M.establishments.map(l=>[l.id,l.name])),n=new Map(e.financeiro.natures.map(l=>[l.id,l.name]));o=[...e.financeiro.receivables.filter(l=>l.status==="paid").map(l=>({...l,tipo:"Receita"})),...e.financeiro.payables.filter(l=>l.status==="paid").map(l=>({...l,tipo:"Despesa"}))].map(l=>({Unidade:i.get(l.establishmentId)||"Atual","Data Pagamento":l.paymentDate?$e(l.paymentDate):"-",Tipo:l.tipo,Descrição:l.description||"-","Natureza (DRE)":l.naturezaId?n.get(l.naturezaId)||"Outros":"Geral","Valor (R$)":l.amount||0}))}else if(t==="agenda"){if(!e.agenda||e.agenda.active.length===0)return m("Aviso","Sem dados de agenda.","info");o=e.agenda.active.map(i=>({Data:i.startTime?$e(i.startTime):"-",Cliente:i.clientName||"Sem nome",Profissional:i.professionalName||"-",Status:i.status,"Valor Faturado (R$)":i.totalAmount||0}))}else if(t==="clientes"){if(!e.clientes||e.clientes.length===0)return m("Aviso","Sem dados de clientes.","info");o=e.clientes.map(i=>({"Data de Cadastro":i.createdAt?$e(i.createdAt):"-",Nome:i.name||"-",Telefone:i.phone||"-","E-mail":i.email||"-","Última Visita":i.lastVisit?$e(i.lastVisit):"-"}))}else if(t==="vendas"){if(!e.vendas||e.vendas.length===0)return m("Aviso","Sem dados de vendas.","info");o=e.vendas.map(i=>({"ID Venda":i.id||"-",Data:i.createdAt?$e(i.createdAt):"-",Status:i.status||"-","Qtd Itens":(i.items||[]).length,"Faturamento (R$)":i.totalAmount||0}))}else if(t==="estoque"){if(!e.estoque||e.estoque.length===0)return m("Aviso","Sem dados de estoque.","info");o=e.estoque.map(i=>({Produto:i.name||"-","Código/SKU":i.sku||"-","Estoque Atual":i.currentStock||0,"Estoque Mínimo":i.minStock||0,"Preço Venda (R$)":i.price||0,Alerta:i.currentStock<=0?"Esgotado":i.currentStock<=i.minStock?"Baixo":"OK"}))}if(o.length===0)return m("Aviso","Nenhum dado válido para exportar.","info");try{const i=XLSX.utils.json_to_sheet(o),n=XLSX.utils.book_new();XLSX.utils.book_append_sheet(n,i,t.toUpperCase()),XLSX.writeFile(n,r)}catch(i){console.error("Erro na exportação Excel: ",i),m("Erro","Falha ao gerar o ficheiro Excel.","error")}}const ma=(t,e="products")=>L(`/api/${e}/categories/${t}`),Go=(t,e="products")=>L(`/api/${e}/categories`,{method:"POST",body:JSON.stringify(t)}),Xo=(t,e="products")=>L(`/api/${e}/categories/${t}`,{method:"DELETE"}),rl="audit_logs",ae=async(t,e,a,s,o,r=null)=>{try{if(!e)return;await uo(na(Ee,rl),{establishmentId:t,userId:e.uid,userName:e.name||e.email||"Utilizador",module:a,action:s,description:o,details:r,timestamp:new Date})}catch(i){console.error("Falha silenciosa ao registar log:",i)}},Ha=document.getElementById("content");let _={services:[],professionals:[],categories:[],hierarchyCache:[],statusFilter:"all",searchQuery:"",filterCategoryId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set},At=null;function Ze(){const t=ge.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function Yo(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[g.establishmentId]}async function il(){_.selectedIds.clear();try{const t=await xe();_.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}nl(),ll(),await Be()}function nl(){Ha.innerHTML=`
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
                    <button data-status="all" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${_.statusFilter==="all"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Todos</button>
                    <button data-status="active" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${_.statusFilter==="active"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Ativos</button>
                    <button data-status="inactive" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${_.statusFilter==="inactive"?"bg-red-50 text-red-700 border-red-200":"bg-white text-gray-600 hover:bg-gray-50"}">Inativos</button>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                    <div class="relative flex-shrink-0 w-full md:w-64">
                        <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input type="text" id="searchInput" value="${_.searchQuery}" placeholder="Pesquisar serviço..." class="w-full pl-8 p-1.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                    <button id="toggle-filter-btn" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5 text-xs flex-shrink-0 ${_.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                        <i class="bi bi-funnel"></i> Filtros
                    </button>
                </div>
            </div>

            <div id="filter-panel" class="${_.isAdvancedFilterOpen?"block":"hidden"} mb-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
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
                ${Ko(8)}
            </div>

            <button data-action="open-service-modal" data-service="{}" class="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40">
                <i class="bi bi-plus-lg text-xl"></i>
            </button>
        </section>
    `}function ll(){const t=document.getElementById("multi-context-apply");t&&(t.removeEventListener("click",Be),t.addEventListener("click",()=>{setTimeout(Be,100)})),document.querySelectorAll(".status-filter-btn").forEach(r=>{r.addEventListener("click",i=>{const n=i.target.dataset.status;_.statusFilter=n,document.querySelectorAll(".status-filter-btn").forEach(d=>{d.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200","bg-red-50","text-red-700","border-red-200"),d.classList.add("bg-white","text-gray-600","border-gray-200")}),n==="inactive"?i.target.classList.add("bg-red-50","text-red-700","border-red-200"):i.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),i.target.classList.remove("bg-white","text-gray-600","border-gray-200"),gt()})});const e=document.getElementById("toggle-filter-btn");e&&e.addEventListener("click",()=>{const r=document.getElementById("filter-panel");_.isAdvancedFilterOpen=!_.isAdvancedFilterOpen,_.isAdvancedFilterOpen?(r.classList.remove("hidden"),e.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),e.classList.remove("bg-white","text-gray-600","border-gray-200")):(r.classList.add("hidden"),e.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),e.classList.add("bg-white","text-gray-600","border-gray-200"))});const a=document.getElementById("searchInput");a&&a.addEventListener("input",r=>{_.searchQuery=r.target.value.toLowerCase(),gt()});const s=document.getElementById("clear-filters-btn");s&&s.addEventListener("click",()=>{_.filterCategoryId="all",document.getElementById("filterCategoryId").value="all",gt()});const o=document.getElementById("apply-filter-btn");o&&o.addEventListener("click",()=>{_.filterCategoryId=document.getElementById("filterCategoryId").value,document.getElementById("toggle-filter-btn").click(),gt()}),At&&Ha.removeEventListener("click",At),At=r=>{const i=r.target.closest('[data-action="open-service-modal"]');if(i){r.preventDefault();let u={};if(i.dataset.service)try{u=JSON.parse(i.dataset.service)}catch{}xl(u);return}if(r.target.closest('[data-action="manage-categories"]')){r.preventDefault(),gl();return}const d=r.target.closest(".service-checkbox");if(d){const u=d.dataset.id;d.checked?_.selectedIds.add(u):_.selectedIds.delete(u),Oa(),r.stopPropagation();return}if(r.target.closest("#cancel-selection-btn")){_.selectedIds.clear(),document.querySelectorAll(".service-checkbox").forEach(u=>u.checked=!1),Oa();return}if(r.target.closest("#batch-delete-btn")){hl();return}},Ha.addEventListener("click",At)}async function Be(){const t=document.getElementById("servicesList"),e=Yo();try{const a=e.map(u=>nt(u)),s=e.map(u=>we(u)),o=e.map(u=>ma(u,"services")),r=await Promise.all(a),i=await Promise.all(s),n=await Promise.all(o),d=new Map;r.flat().filter(Boolean).forEach(u=>d.set(u.id,u)),_.services=Array.from(d.values()),g.services=_.services;const l=new Map;i.flat().filter(Boolean).forEach(u=>l.set(u.id,u)),_.professionals=Array.from(l.values()),g.professionals=_.professionals;const c=new Map;n.flat().filter(Boolean).forEach(u=>c.set(u.id,u)),_.categories=Array.from(c.values()),g.serviceCategories=_.categories,dl(),gt()}catch(a){console.error(a),t.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>'}}function dl(){const t=document.getElementById("filterCategoryId");t&&_.categories&&(t.innerHTML='<option value="all">Todas as categorias</option>',_.categories.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=v(e.name),_.filterCategoryId===e.id&&(a.selected=!0),t.appendChild(a)}))}function Oa(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=_.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function cl(t){const e=document.getElementById("summary-section");if(!e)return;const a=t.length,s=t.filter(r=>r.active!==!1).length,o=a-s;e.innerHTML=`
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
            <span class="text-xl font-bold text-indigo-700 mt-0.5">${t.length}</span>
        </div>
    `}function gt(){const t=document.getElementById("servicesList");if(!t)return;if(!_.services||_.services.length===0){t.innerHTML=Ko(8);return}const e=Yo(),a=_.services.filter(s=>{const o=s.name.toLowerCase().includes(_.searchQuery);let r=!0;_.statusFilter==="active"&&(r=s.active!==!1),_.statusFilter==="inactive"&&(r=s.active===!1);const i=_.filterCategoryId==="all"||s.categoryId===_.filterCategoryId,n=s.accessibleIn&&s.accessibleIn.length>0?s.accessibleIn:[s.establishmentId||g.establishmentId],d=e.some(l=>n.includes(l));return o&&r&&i&&d});cl(a),t.innerHTML=ul(a)}function Ko(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center p-3 animate-pulse h-[74px]">
            <div class="w-10 h-10 rounded bg-gray-200 flex-shrink-0 mr-3"></div>
            <div class="flex-1 space-y-2">
                <div class="h-2.5 bg-gray-200 rounded w-3/4"></div>
                <div class="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}function ul(t){if(t.length===0)return`
            <div class="col-span-full flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-scissors text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum serviço encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente ajustar os filtros ou verificar as unidades no topo.</p>
            </div>
        `;const e=new Map((_.categories||[]).map(a=>[a.id,a.name]));return t.map(a=>{const s=a.active===!1,o=v(a.name),r=v(e.get(a.categoryId)||"Sem Categoria"),i=a.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(a.name.charAt(0))}`,n=JSON.stringify(a).replace(/'/g,"&apos;"),d=a.accessibleIn?a.accessibleIn.length:1,l=_.selectedIds.has(a.id),c=a.price!==void 0?parseFloat(a.price).toFixed(2):"0.00",u=a.color||"#4f46e5";return`
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
            </div>`}).join("")}async function pl(t){t.preventDefault();const e=t.target.closest("#categoryForm"),a=e.querySelector("#categoryName"),s=a.value;if(!s)return;const o=e.querySelector('button[type="submit"]');o.disabled=!0,o.textContent="...";try{const r=_.hierarchyCache.reduce((i,n)=>(i.push(n.id),n.branches&&n.branches.forEach(d=>i.push(d.id)),i),[]);r.length===0&&r.push(g.establishmentId),await Go({establishmentId:g.establishmentId,name:s,accessibleIn:r},"services"),ae(g.establishmentId,Ze(),"Categorias (Serviços)","Criou",`Criou categoria: ${s}`),a.value="",m("Sucesso","Categoria criada!","success"),await xs(),await Be()}catch(r){m("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}finally{o.disabled=!1,o.textContent="Adicionar"}}async function bl(t){if(await Y("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await Xo(t,"services"),ae(g.establishmentId,Ze(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${t})`),m("Sucesso","Categoria apagada.","success"),await xs(),await Be()}catch{m("Erro","Não foi possível apagar a categoria.","error")}}async function xs(){const t=document.getElementById("categoryList");if(t){t.innerHTML='<div class="loader mx-auto my-4"></div>';try{const e=await ma(g.establishmentId,"services");_.categories=e,t.innerHTML="",e.length>0?t.innerHTML=e.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded mb-1">
                    <span class="text-sm font-medium text-gray-700">${v(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-xs bg-red-50 px-2 py-1 rounded">Apagar</button>
                </div>`).join(""):t.innerHTML='<p class="text-center text-gray-500 text-sm">Nenhuma categoria criada.</p>'}catch{t.innerHTML='<p class="text-red-500 text-center text-sm">Erro ao carregar categorias.</p>'}}}function gl(){Ie({title:"Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-lg"});const e=document.getElementById("genericModal");if(e){const a=e.querySelector("#categoryForm");a&&(a.addEventListener("submit",pl),e.addEventListener("click",s=>{const o=s.target.closest('button[data-action="delete-category"]');o&&(s.preventDefault(),bl(o.dataset.id))}))}xs()}function ml(t=[]){if(!_.hierarchyCache||_.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${g.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                <i class="bi bi-info-circle mr-1"></i> Exclusivo desta unidade.
            </div>`;let e='<div class="space-y-1 mt-2 max-h-40 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30 custom-scrollbar">';return _.hierarchyCache.forEach(a=>{const s=t.includes(a.id)||t.length===0&&a.id===g.establishmentId;e+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${v(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(o=>{const r=t.includes(o.id)||t.length===0&&o.id===g.establishmentId;e+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${o.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${r?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${v(o.name)}</span>
                    </label>
                `})}),e+="</div>",e}async function fl(t){const e=t.target.closest("#serviceForm"),a=e.querySelector("#serviceId").value,s=e.querySelector('button[type="submit"]'),o={},r=e.querySelector('input[name="commissionType"]:checked').value;r==="custom"&&e.querySelectorAll(".professional-commission-row").forEach(c=>{const u=c.dataset.profId;if(c.querySelector('input[type="checkbox"]').checked){const b=parseFloat(c.querySelector('input[type="number"]').value);o[u]=isNaN(b)?0:b}});const i=Array.from(e.querySelectorAll('input[name="accessibleIn"]:checked')).map(c=>c.value),n=i.length>0?i:[g.establishmentId],d={establishmentId:g.establishmentId,accessibleIn:n,name:e.querySelector("#serviceName").value.trim(),price:parseFloat(e.querySelector("#servicePrice").value),duration:parseInt(e.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(e.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:e.querySelector("#serviceCategory").value||null,color:e.querySelector("#serviceColor").value,targetAudience:e.querySelector("#serviceAudience").value,loyaltyPoints:parseInt(e.querySelector("#serviceLoyaltyPoints").value,10)||0,publicDescription:e.querySelector("#servicePublicDescription").value.trim(),homeService:e.querySelector("#serviceHomeToggle").checked,commissionRate:parseFloat(e.querySelector("#serviceCommissionRate").value)||0,active:e.querySelector("#serviceStatusToggle").checked,photo:e.querySelector("#servicePhotoBase64").value,notes:e.querySelector("#serviceNotes").value,commissionType:r,professionalCommissions:o},l=s.innerHTML;s.disabled=!0,s.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{a?(await zi(a,d),ae(g.establishmentId,Ze(),"Serviços","Editou",`Editou o serviço: ${d.name}`),m("Sucesso","Serviço atualizado com sucesso!","success")):(await Oi(d),ae(g.establishmentId,Ze(),"Serviços","Criou",`Criou novo serviço: ${d.name}`),m("Sucesso","Serviço adicionado à rede!","success")),document.getElementById("genericModal").style.display="none",await Be()}catch(c){m("Erro",c.message,"error"),s.disabled=!1,s.innerHTML=l}}function xl(t=null){const e=document.getElementById("genericModal"),a=_.categories||[],s=t?.duration||0,o=t?.bufferTime||0,r=v(t?.name||""),i=v(t?.notes||""),n=v(t?.publicDescription||""),d=t?.id?r:"Novo Serviço",l=t?.color||"#4f46e5",c=t?.loyaltyPoints||0,u=a.map(I=>`<option value="${I.id}" ${t?.categoryId===I.id?"selected":""}>${v(I.name)}</option>`).join(""),p=t?.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(r?r.charAt(0):"S")}`,b=`
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
                    <input type="hidden" id="serviceId" value="${t?.id||""}">
                    <input type="hidden" id="servicePhotoBase64" value="${t?.photo||""}">
                    
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
                                        <input type="number" id="servicePrice" step="0.01" value="${t?.price!==void 0?t.price:""}" required placeholder="0.00" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 focus:bg-white transition-colors font-bold text-gray-800">
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
                                    ${ml(t?.accessibleIn||[])}
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
                                        <option value="todos" ${t?.targetAudience==="todos"?"selected":""}>Todos (Unissex)</option>
                                        <option value="feminino" ${t?.targetAudience==="feminino"?"selected":""}>Feminino</option>
                                        <option value="masculino" ${t?.targetAudience==="masculino"?"selected":""}>Masculino</option>
                                        <option value="infantil" ${t?.targetAudience==="infantil"?"selected":""}>Infantil</option>
                                    </select>
                                </div>

                                <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                                    <div>
                                        <p class="text-sm font-bold text-gray-800"><i class="bi bi-house-door text-indigo-500 mr-1"></i> Atende a domicílio?</p>
                                        <p class="text-[10px] text-gray-500 leading-tight mt-0.5">Permite que o cliente solicite que o profissional vá até ele.</p>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" id="serviceHomeToggle" class="sr-only peer" ${t?.homeService?"checked":""}>
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
                                        <input type="checkbox" id="serviceStatusToggle" class="sr-only peer" ${t?.active!==!1?"checked":""}>
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
                                        <input type="radio" name="commissionType" value="default" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500" ${t?.commissionType!=="custom"?"checked":""}>
                                        <span class="ml-3 text-sm font-bold text-gray-700">Taxa Padrão (Igual p/ Todos)</span>
                                    </label>
                                    <label class="flex items-center p-3 border border-indigo-200 bg-white rounded-lg cursor-pointer hover:border-indigo-400 transition-colors shadow-sm">
                                        <input type="radio" name="commissionType" value="custom" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500" ${t?.commissionType==="custom"?"checked":""}>
                                        <span class="ml-3 text-sm font-bold text-gray-700">Taxa Personalizada (Por Membro)</span>
                                    </label>
                                </div>
                            </div>

                            <div id="defaultCommissionRateContainer" class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
                                <label for="serviceCommissionRate" class="block text-sm font-bold text-gray-700 mb-2">Qual a taxa de comissão padrão?</label>
                                <div class="flex items-center justify-center gap-2">
                                    <input type="number" id="serviceCommissionRate" value="${t?.commissionRate||0}" step="0.1" class="w-32 p-3 text-xl font-black text-center border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white text-indigo-600">
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
                <button type="button" data-action="delete-service" data-id="${t?.id||""}" class="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-colors ${t?.id?"":"hidden"}" title="Excluir Serviço">
                    <i class="bi bi-trash3 mr-1"></i> Excluir
                </button>

                <div class="flex gap-3 ml-auto">
                    <button data-action="close-modal" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 shadow-sm transition-colors">Cancelar</button>
                    <button type="button" data-action="save-service" class="py-2.5 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm flex items-center gap-2 transition-colors">
                        <i class="bi bi-save"></i> Salvar
                    </button>
                </div>
            </div>
        </div>`;e.innerHTML=b,e.style.display="flex",e.querySelectorAll(".tab-link").forEach(I=>{I.addEventListener("click",()=>{e.querySelectorAll(".tab-link").forEach(F=>{F.classList.remove("active","border-indigo-600","text-indigo-600"),F.classList.add("border-transparent","text-gray-500")}),I.classList.add("active","border-indigo-600","text-indigo-600"),I.classList.remove("border-transparent","text-gray-500"),e.querySelectorAll(".tab-content").forEach(F=>F.classList.add("hidden")),document.getElementById(I.dataset.tab).classList.remove("hidden")})});const f=e.querySelectorAll('input[name="commissionType"]'),h=document.getElementById("defaultCommissionRateContainer"),y=document.getElementById("professionalCommissionsContainer");function $(){const I=e.querySelector('input[name="commissionType"]:checked').value;h&&(h.style.display=I==="default"?"block":"none"),y&&(y.style.display=I==="custom"?"block":"none")}f.forEach(I=>I.addEventListener("change",$));const A=document.getElementById("professionalCommissionsList");A&&(A.innerHTML=(_.professionals||[]).map(I=>{const F=t?.professionalCommissions?.[I.id]!==void 0,V=t?.professionalCommissions?.[I.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-lg border border-transparent hover:bg-gray-50 transition-colors ${F?"bg-indigo-50/50 border-indigo-100":""}" data-prof-id="${I.id}">
                    <label class="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                        <input type="checkbox" ${F?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <img src="${I.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${v(I.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0">
                        <span class="text-sm font-bold text-gray-700 truncate">${v(I.name)}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${V}" step="0.1" class="w-20 p-1.5 border border-gray-300 rounded-lg text-sm text-center outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${F?"":"disabled"}>
                        <span class="text-sm font-black text-gray-400">%</span>
                    </div>
                </div>
            `}).join(""),A.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.addEventListener("change",F=>{const V=F.target.closest(".professional-commission-row");V.querySelector('input[type="number"]').disabled=!F.target.checked,V.classList.toggle("bg-indigo-50/50",F.target.checked),V.classList.toggle("border-indigo-100",F.target.checked),V.classList.toggle("border-transparent",!F.target.checked)})})),$();const R=e.querySelector("#servicePhotoInput"),C=e.querySelector("#servicePhotoButton"),E=e.querySelector("#servicePhotoContainer"),D=e.querySelector("#servicePhotoPreview"),P=e.querySelector("#servicePhotoBase64"),j=()=>R.click();C&&C.addEventListener("click",j),E&&E.addEventListener("click",j),R.onchange=async()=>{const I=R.files[0];if(I){D.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const F=await ls(I,800,800,.8);if(F.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");D.src=F,P.value=F}catch(F){m("Erro de Imagem",F.message,"error"),D.src=p,P.value=t?.photo||""}}};const S=e.querySelector("#serviceForm");e.onclick=async I=>{const F=I.target.closest("button[data-action]");if(!F)return;const V=F.dataset.action,U=F.dataset.id;if(V==="close-modal"&&(e.style.display="none"),V==="save-service"&&S.reportValidity()&&fl({target:S}),V==="delete-service"){if(!U)return;if(await Y("Apagar Serviço","Tem certeza que deseja excluir este serviço da rede?"))try{const W=_.services.find(ne=>ne.id===U)?.name||"Desconhecido";await So(U),ae(g.establishmentId,Ze(),"Serviços","Excluiu",`Excluiu o serviço: ${W}`),m("Sucesso","Serviço apagado da rede.","success"),e.style.display="none",await Be()}catch(W){m("Erro",`Não foi possível apagar o serviço: ${W.message}`,"error")}}}}function hl(){Y("Excluir em Lote",`Tem certeza que deseja excluir ${_.selectedIds.size} serviços da rede? Esta ação não pode ser desfeita.`).then(async t=>{if(t)try{const e=Array.from(_.selectedIds).map(a=>So(a));await Promise.all(e),ae(g.establishmentId,Ze(),"Serviços","Excluiu em Lote",`Excluiu ${_.selectedIds.size} serviços`),m("Sucesso",`${_.selectedIds.size} serviços foram excluídos.`,"success"),_.selectedIds.clear(),Oa(),Be()}catch(e){m("Erro",`Não foi possível excluir em lote: ${e.message}`,"error")}})}const fa="suppliers",It=async t=>{try{const e=po(na(Ee,fa),bo("establishmentId","==",t)),a=await qr(e),s=[];return a.forEach(o=>{s.push({id:o.id,...o.data()})}),s}catch(e){throw console.error("Erro ao buscar fornecedores:",e),e}},vl=async t=>{try{return{id:(await uo(na(Ee,fa),t)).id,...t}}catch(e){throw console.error("Erro ao criar fornecedor:",e),e}},yl=async(t,e)=>{try{const a=Lt(Ee,fa,t);return await os(a,e),{id:t,...e}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},wl=async t=>{try{const e=Lt(Ee,fa,t);return await jr(e),!0}catch(e){throw console.error("Erro ao excluir fornecedor:",e),e}},mt=document.getElementById("content");let q={products:[],categories:[],suppliers:[],hierarchyCache:[],currentTab:"catalogo",stockFilter:"all",searchQuery:"",filterCategoryId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set},Mt=null;function je(){const t=ge.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function hs(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[g.establishmentId]}function ka(t){return t?t._seconds?new Date(t._seconds*1e3):t.seconds?new Date(t.seconds*1e3):new Date(t):new Date}async function kl(){q.selectedIds.clear(),q.currentTab="catalogo";try{const t=await xe();q.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}vs(),Sl(),await Se()}function vs(){mt.innerHTML=`
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative">
            
            <div class="mb-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-shrink-0">
                <nav class="flex overflow-x-auto custom-scrollbar">
                    <button data-main-tab="catalogo" class="flex-1 py-4 px-6 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${q.currentTab==="catalogo"?"border-indigo-600 text-indigo-600 bg-indigo-50/50":"border-transparent text-gray-500 hover:text-indigo-500 hover:bg-gray-50"}">
                        <i class="bi bi-box-seam mr-2"></i> Catálogo de Produtos
                    </button>
                    <button data-main-tab="movimentacoes" class="flex-1 py-4 px-6 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${q.currentTab==="movimentacoes"?"border-indigo-600 text-indigo-600 bg-indigo-50/50":"border-transparent text-gray-500 hover:text-indigo-500 hover:bg-gray-50"}">
                        <i class="bi bi-arrow-left-right mr-2"></i> Estoque e Movimentações
                    </button>
                </nav>
            </div>

            <div id="main-tab-content" class="flex-1 flex flex-col min-h-0 relative">
                </div>
        </section>
    `,$l()}function $l(){const t=document.getElementById("main-tab-content");if(t){if(q.currentTab==="catalogo")t.innerHTML=`
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
                    <button data-status="all" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${q.stockFilter==="all"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Todos</button>
                    <button data-status="ok" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${q.stockFilter==="ok"?"bg-green-50 text-green-700 border-green-200":"bg-white text-gray-600 hover:bg-gray-50"}">Em Dia</button>
                    <button data-status="alert" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${q.stockFilter==="alert"?"bg-orange-50 text-orange-700 border-orange-200":"bg-white text-gray-600 hover:bg-gray-50"}">Alerta</button>
                    <button data-status="empty" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${q.stockFilter==="empty"?"bg-red-50 text-red-700 border-red-200":"bg-white text-gray-600 hover:bg-gray-50"}">Esgotados</button>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                    <div class="relative flex-shrink-0 w-full md:w-64">
                        <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input type="text" id="searchInput" value="${q.searchQuery}" placeholder="Pesquisar produto..." class="w-full pl-8 p-1.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                    <button id="toggle-filter-btn" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5 text-xs flex-shrink-0 ${q.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                        <i class="bi bi-funnel"></i> Filtros
                    </button>
                </div>
            </div>

            <div id="filter-panel" class="${q.isAdvancedFilterOpen?"block":"hidden"} mb-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm animate-fade-in flex-shrink-0">
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
                ${er(8)}
            </div>

            <button data-action="open-product-modal" data-product="{}" class="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40">
                <i class="bi bi-plus-lg text-xl"></i>
            </button>
        `,Zo(),We();else if(q.currentTab==="movimentacoes"){const e=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const s=a.toISOString().split("T")[0],o=(q.products||[]).map(i=>`<option value="${i.id}">${v(i.name)}</option>`).join(""),r=(q.categories||[]).map(i=>`<option value="${i.id}">${v(i.name)}</option>`).join("");t.innerHTML=`
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
                            <input type="date" id="reportEndDate" value="${e}" class="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs outline-none focus:border-indigo-500 bg-white h-[30px]">
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
        `,document.getElementById("btn-generate-report").addEventListener("click",_a),_a()}}}function Sl(){const t=document.getElementById("multi-context-apply");t&&(t.removeEventListener("click",Se),t.addEventListener("click",()=>{setTimeout(Se,100)})),Mt&&mt.removeEventListener("click",Mt),Mt=e=>{const a=e.target.closest("[data-main-tab]");if(a){q.currentTab=a.dataset.mainTab,vs();return}if(e.target.classList.contains("status-filter-btn")){const l=e.target.dataset.status;q.stockFilter=l,document.querySelectorAll(".status-filter-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200","bg-green-50","text-green-700","border-green-200","bg-orange-50","text-orange-700","border-orange-200","bg-red-50","text-red-700","border-red-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),l==="ok"?e.target.classList.add("bg-green-50","text-green-700","border-green-200"):l==="alert"?e.target.classList.add("bg-orange-50","text-orange-700","border-orange-200"):l==="empty"?e.target.classList.add("bg-red-50","text-red-700","border-red-200"):e.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),e.target.classList.remove("bg-white","text-gray-600","border-gray-200"),We();return}const s=e.target.closest('[data-action="open-product-modal"]');if(s){e.preventDefault();let l={};if(s.dataset.product)try{l=JSON.parse(s.dataset.product)}catch{}Bl(l);return}if(e.target.closest('[data-action="manage-categories"]')){e.preventDefault(),Dl();return}if(e.target.closest('[data-action="open-new-movement-modal"]')){e.preventDefault(),tr();return}const i=e.target.closest(".product-checkbox");if(i){const l=i.dataset.id;i.checked?q.selectedIds.add(l):q.selectedIds.delete(l),za(),e.stopPropagation();return}if(e.target.closest("#cancel-selection-btn")){q.selectedIds.clear(),document.querySelectorAll(".product-checkbox").forEach(l=>l.checked=!1),za();return}if(e.target.closest("#batch-delete-btn")){Al();return}},mt.addEventListener("click",Mt),mt.addEventListener("input",e=>{e.target.id==="searchInput"&&(q.searchQuery=e.target.value.toLowerCase(),We())}),mt.addEventListener("click",e=>{const a=e.target.closest("#toggle-filter-btn");if(a){const r=document.getElementById("filter-panel");q.isAdvancedFilterOpen=!q.isAdvancedFilterOpen,q.isAdvancedFilterOpen?(r.classList.remove("hidden"),a.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.remove("bg-white","text-gray-600","border-gray-200")):(r.classList.add("hidden"),a.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.add("bg-white","text-gray-600","border-gray-200"))}e.target.closest("#clear-filters-btn")&&(q.filterCategoryId="all",document.getElementById("filterCategoryId").value="all",We()),e.target.closest("#apply-filter-btn")&&(q.filterCategoryId=document.getElementById("filterCategoryId").value,document.getElementById("toggle-filter-btn").click(),We())})}async function Se(){const t=hs();try{const e=t.map(n=>lt(n)),a=t.map(n=>ma(n,"products")),[s,o]=await Promise.all([Promise.all(e),Promise.all(a)]),r=new Map;s.flat().filter(Boolean).forEach(n=>r.set(n.id,n)),q.products=Array.from(r.values()),g.products=q.products;const i=new Map;o.flat().filter(Boolean).forEach(n=>i.set(n.id,n)),q.categories=Array.from(i.values()),g.categories=q.categories,q.currentTab==="catalogo"?(Zo(),We()):q.currentTab==="movimentacoes"&&_a(),q.suppliers=[],t.forEach(async n=>{try{let d=[];typeof It=="function"&&(d=await It(n)),d.forEach(l=>{q.suppliers.find(c=>c.id===l.id)||q.suppliers.push(l)}),g.suppliers=q.suppliers}catch(d){console.warn("Aviso: Falha ao carregar fornecedores em background.",d)}})}catch(e){console.error("Erro detalhado ao carregar produtos:",e);const a=document.getElementById("productsList");a&&(a.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>')}}function Zo(){const t=document.getElementById("filterCategoryId");t&&q.categories&&(t.innerHTML='<option value="all">Todas as categorias</option>',q.categories.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=v(e.name),q.filterCategoryId===e.id&&(a.selected=!0),t.appendChild(a)}))}function za(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=q.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function El(t){const e=document.getElementById("summary-section");if(!e)return;let a=t.length,s=0,o=0,r=0;t.forEach(i=>{const n=i.currentStock||0,d=i.minStock||0;n<=0?r++:d>0&&n<=d||d>0&&n<=d*1.2?o++:s++}),e.innerHTML=`
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
    `}function We(){const t=document.getElementById("productsList");if(!t)return;if(!q.products||q.products.length===0){t.innerHTML=er(8);return}const e=hs(),a=q.products.filter(s=>{const o=s.name.toLowerCase().includes(q.searchQuery),r=s.currentStock||0,i=s.minStock||0;let n=!0;q.stockFilter==="ok"&&(n=r>0&&(i===0||r>i*1.2)),q.stockFilter==="alert"&&(n=i>0&&r>0&&r<=i*1.2),q.stockFilter==="empty"&&(n=r<=0);const d=q.filterCategoryId==="all"||s.categoryId===q.filterCategoryId,l=s.accessibleIn&&s.accessibleIn.length>0?s.accessibleIn:[s.establishmentId||g.establishmentId],c=e.some(u=>l.includes(u));return o&&n&&d&&c});El(a),t.innerHTML=Il(a)}function er(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center p-3 animate-pulse h-[74px]">
            <div class="w-10 h-10 rounded-md bg-gray-200 flex-shrink-0 mr-3"></div>
            <div class="flex-1 space-y-2">
                <div class="h-2.5 bg-gray-200 rounded w-3/4"></div>
                <div class="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}function Il(t){if(t.length===0)return`
            <div class="col-span-full flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-box-seam text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum produto encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente ajustar os filtros ou verificar as unidades no topo.</p>
            </div>
        `;const e=new Map((q.categories||[]).map(a=>[a.id,a.name]));return t.map(a=>{const s=v(a.name),o=v(e.get(a.categoryId)||"Sem Categoria"),r=a.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(a.name.charAt(0))}`,i=JSON.stringify(a).replace(/'/g,"&apos;"),n=a.accessibleIn?a.accessibleIn.length:1,d=q.selectedIds.has(a.id),l=a.price!==void 0?parseFloat(a.price).toFixed(2):"0.00",c=a.currentStock||0,u=a.minStock||0;let p="bg-emerald-500",b=!1;return c<=0?(p="bg-red-500",b=!0):u>0&&c<=u*1.2&&(p="bg-orange-500"),`
            <div class="product-card relative bg-white rounded-xl border ${d?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-gray-200"} shadow-sm flex items-center p-3 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 ${b?"opacity-70 bg-gray-50":""}" 
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
            </div>`}).join("")}async function Ll(t){t.preventDefault();const e=t.target.closest("#categoryForm"),a=e.querySelector("#categoryName"),s=a.value;if(!s)return;const o=e.querySelector('button[type="submit"]');o.disabled=!0,o.textContent="...";try{const r=q.hierarchyCache.reduce((i,n)=>(i.push(n.id),n.branches&&n.branches.forEach(d=>i.push(d.id)),i),[]);r.length===0&&r.push(g.establishmentId),await Go({establishmentId:g.establishmentId,name:s,accessibleIn:r},"products"),ae(g.establishmentId,je(),"Categorias (Produtos)","Criou",`Criou categoria: ${s}`),a.value="",m("Sucesso","Categoria criada!","success"),await ys(),await Se()}catch(r){m("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}finally{o.disabled=!1,o.textContent="Adicionar"}}async function Cl(t){if(await Y("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await Xo(t,"products"),ae(g.establishmentId,je(),"Categorias (Produtos)","Excluiu",`Excluiu uma categoria (ID: ${t})`),m("Sucesso","Categoria apagada.","success"),await ys(),await Se()}catch{m("Erro","Não foi possível apagar a categoria.","error")}}async function ys(){const t=document.getElementById("categoryList");if(t){t.innerHTML='<div class="loader mx-auto my-4"></div>';try{const e=await ma(g.establishmentId,"products");q.categories=e,t.innerHTML="",e.length>0?t.innerHTML=e.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded mb-1">
                    <span class="text-sm font-medium text-gray-700">${v(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-xs bg-red-50 px-2 py-1 rounded">Apagar</button>
                </div>`).join(""):t.innerHTML='<p class="text-center text-gray-500 text-sm">Nenhuma categoria criada.</p>'}catch{t.innerHTML='<p class="text-red-500 text-center text-sm">Erro ao carregar categorias.</p>'}}}function Dl(){Ie({title:"Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-lg"});const e=document.getElementById("genericModal");if(e){const a=e.querySelector("#categoryForm");a&&(a.addEventListener("submit",Ll),e.addEventListener("click",s=>{const o=s.target.closest('button[data-action="delete-category"]');o&&(s.preventDefault(),Cl(o.dataset.id))}))}ys()}function tr(){const t=(q.products||[]).map(r=>`<option value="${r.id}">${v(r.name)} (Estoque: ${r.currentStock||0})</option>`).join(""),a=`
        <div class="space-y-4 p-2">
            <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-4">
                <p class="text-sm text-indigo-800 font-medium">Registre entradas de mercadorias ou saídas/perdas manuais no estoque.</p>
            </div>
            <form id="newMovementForm" class="space-y-4">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Unidade de Estoque <span class="text-red-500">*</span></label>
                        <select id="movEstablishmentId" required class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                            ${q.hierarchyCache.reduce((r,i)=>(r.push(`<option value="${i.id}">🏢 ${v(i.name)}</option>`),i.branches&&i.branches.forEach(n=>r.push(`<option value="${n.id}">📍 ${v(n.name)}</option>`)),r),[]).join("")}
                        </select>
                        <p class="text-[10px] text-gray-500 mt-1">Em qual loja este produto está entrando/saindo?</p>
                    </div>

                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Produto <span class="text-red-500">*</span></label>
                        <select id="movProductId" required class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="">Selecione o produto...</option>
                            ${t}
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
    `;Ie({title:"Lançar Movimentação",contentHTML:a,maxWidth:"max-w-lg"});const s=document.getElementById("movEstablishmentId");s&&(s.value=g.establishmentId);const o=document.getElementById("newMovementForm");o.onsubmit=async r=>{r.preventDefault();const i=o.querySelector('button[type="submit"]'),n=i.innerHTML,d=document.getElementById("movProductId")?.value,l=document.getElementById("movEstablishmentId")?.value,c=o.querySelector('input[name="movType"]:checked')?.value,u=parseInt(document.getElementById("movAmount")?.value,10),p=document.getElementById("movReason")?.value.trim();if(!d||!u||u<=0||!p||!l){m("Erro","Preencha todos os campos corretamente.","warning");return}const b=c==="in"?u:-u;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> Salvando...';try{await Mo(d,{change:b,reason:p,establishmentId:l});const f=q.products.find(h=>h.id===d)?.name||"Produto";ae(l,je(),"Estoque","Ajuste Manual",`Lançou movimentação (${b>0?"+":""}${b}) para ${f}`),m("Sucesso","Movimentação registrada com sucesso!","success"),document.getElementById("genericModal").style.display="none",await Se()}catch(f){m("Erro",f.message,"error"),i.disabled=!1,i.innerHTML=n}}}function Tl(t=[]){if(!q.hierarchyCache||q.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${g.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                <i class="bi bi-info-circle mr-1"></i> Exclusivo desta unidade.
            </div>`;let e='<div class="space-y-1 mt-2 max-h-40 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30 custom-scrollbar">';return q.hierarchyCache.forEach(a=>{const s=t.includes(a.id)||t.length===0&&a.id===g.establishmentId;e+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${v(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(o=>{const r=t.includes(o.id)||t.length===0&&o.id===g.establishmentId;e+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${o.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${r?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${v(o.name)}</span>
                    </label>
                `})}),e+="</div>",e}async function Pl(t){t.preventDefault();const e=document.getElementById("productId")?.value||"",a=document.querySelector('#productForm button[type="submit"]'),s=parseInt(document.getElementById("productCurrentStock")?.value||"0",10),o=parseInt(document.getElementById("productMinStock")?.value||"0",10),r=parseInt(document.getElementById("productMaxStock")?.value||"0",10),i=document.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),n=Array.from(i).map(f=>f.dataset.id),d=Array.from(document.querySelectorAll('#productForm input[name="accessibleIn"]:checked')).map(f=>f.value),l=d.length>0?d:[g.establishmentId],c=document.getElementById("productName"),u=document.getElementById("productPrice");if(!c?.value||!u?.value){m("Aviso","Preencha o Nome e o Preço do produto.","warning");return}const p={establishmentId:g.establishmentId,accessibleIn:l,name:c.value.trim(),price:parseFloat(u.value),costPrice:parseFloat(document.getElementById("productCostPrice")?.value)||0,commissionRate:parseFloat(document.getElementById("productCommissionRate")?.value)||0,currentStock:isNaN(s)?0:s,minStock:isNaN(o)?0:o,maxStock:isNaN(r)?0:r,categoryId:document.getElementById("productCategory")?.value||null,photo:document.getElementById("productPhotoBase64")?.value||"",supplierIds:n},b=a?a.innerHTML:"Salvar";a&&(a.disabled=!0,a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...');try{e?(await Ao(e,p),ae(g.establishmentId,je(),"Produtos","Editou",`Editou o produto: ${p.name}`),m("Sucesso","Produto atualizado com sucesso!","success")):(await Bo(p),ae(g.establishmentId,je(),"Produtos","Criou",`Criou novo produto: ${p.name}`),m("Sucesso","Produto adicionado à rede!","success")),document.getElementById("genericModal").style.display="none",await Se()}catch(f){m("Erro",f.message,"error"),a&&(a.disabled=!1,a.innerHTML=b)}}function Bl(t=null){const e=document.getElementById("genericModal"),a=q.categories||[],s=v(t?.name||""),o=t?.price!==void 0?t.price:"",r=t?.costPrice!==void 0?t.costPrice:"",i=t?.commissionRate!==void 0?t.commissionRate:"",n=t?.currentStock||0,d=t?.minStock||0,l=t?.maxStock||0,c=t?.id?s:"Novo Produto",u=a.map(P=>`<option value="${P.id}" ${t?.categoryId===P.id?"selected":""}>${v(P.name)}</option>`).join(""),p=t?.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(s?s.charAt(0):"P")}`,b=`
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
                    <input type="hidden" id="productId" value="${t?.id||""}">
                    <input type="hidden" id="productPhotoBase64" value="${t?.photo||""}">
                    
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
                                    ${Tl(t?.accessibleIn||[])}
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

                            <div class="bg-indigo-50 p-5 rounded-xl border border-indigo-100 ${t?.id?"":"hidden"}">
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
                    <button type="button" data-action="delete-product" data-id="${t?.id||""}" class="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-colors ${t?.id?"":"hidden"}" title="Excluir Produto">
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
        </div>`;e.innerHTML=b,e.style.display="flex",e.querySelectorAll(".tab-link").forEach(P=>{P.addEventListener("click",()=>{e.querySelectorAll(".tab-link").forEach(j=>{j.classList.remove("active","border-indigo-600","text-indigo-600"),j.classList.add("border-transparent","text-gray-500")}),P.classList.add("active","border-indigo-600","text-indigo-600"),P.classList.remove("border-transparent","text-gray-500"),e.querySelectorAll(".tab-content").forEach(j=>j.classList.add("hidden")),document.getElementById(P.dataset.tab).classList.remove("hidden")})});const f=document.getElementById("productForm");f.onsubmit=Pl;let h=new Set(t?.supplierIds||[]);const y=()=>{const P=document.getElementById("modalSupplierSearch"),j=document.getElementById("supplierSearchResults"),S=document.getElementById("selectedSuppliersList"),I=P?.value.toLowerCase()||"",F=q.suppliers||[];if(I.length>0){const V=F.filter(U=>U.name.toLowerCase().includes(I)&&!h.has(U.id));V.length>0?(j.classList.remove("hidden"),j.innerHTML=V.map(U=>`
                    <div class="p-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-0 flex justify-between items-center transition-colors" data-add-supplier="${U.id}">
                        <span class="font-bold text-sm text-gray-700">${v(U.name)}</span>
                        <span class="text-indigo-600 text-xs font-bold px-2 py-1 bg-indigo-100 rounded">+ Adicionar</span>
                    </div>
                `).join("")):(j.classList.remove("hidden"),j.innerHTML='<div class="p-4 text-sm text-gray-500 text-center">Fornecedor não encontrado.</div>')}else j.classList.add("hidden");h.size>0?(S.classList.remove("justify-center"),S.classList.add("justify-start"),S.innerHTML="",h.forEach(V=>{const U=F.find(T=>T.id===V);U&&(S.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border border-gray-200 p-3 rounded-lg shadow-sm" data-id="${U.id}">
                            <div>
                                <p class="font-bold text-gray-800 text-sm">${v(U.name)}</p>
                                <p class="text-[10px] text-gray-500 mt-0.5"><i class="bi bi-person"></i> ${v(U.contactName||"N/I")} | <i class="bi bi-telephone"></i> ${v(U.phone||"N/I")}</p>
                            </div>
                            <button type="button" class="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors" data-remove-supplier="${U.id}" title="Remover">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                    `)})):(S.classList.add("justify-center"),S.classList.remove("justify-start"),S.innerHTML='<p class="text-xs text-gray-400 text-center">Nenhum fornecedor adicionado ainda.</p>')};document.getElementById("modalSupplierSearch")?.addEventListener("input",y),y();const $=document.getElementById("productPhotoInput"),A=document.getElementById("productPhotoButton"),R=document.getElementById("productPhotoContainer"),C=document.getElementById("productPhotoPreview"),E=document.getElementById("productPhotoBase64"),D=()=>$?.click();A&&A.addEventListener("click",D),R&&R.addEventListener("click",D),$&&($.onchange=async()=>{const P=$.files[0];if(!P)return;const j=C.src;C.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const S=await ls(P,800,800,.8);if(S.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");C.src=S,E.value=S}catch(S){m("Erro de Imagem",S.message,"error"),C.src=j,E.value=t?.photo||""}}),e.onclick=async P=>{const j=P.target.closest("[data-add-supplier]");if(j){h.add(j.dataset.addSupplier);const U=document.getElementById("modalSupplierSearch");U&&(U.value=""),y();return}const S=P.target.closest("[data-remove-supplier]");if(S){h.delete(S.dataset.removeSupplier),y();return}const I=P.target.closest("button[data-action]");if(!I)return;const F=I.dataset.action,V=I.dataset.id;if(F==="close-modal"&&(e.style.display="none"),F==="delete-product"){if(!V)return;if(await Y("Apagar Produto","Tem certeza que deseja excluir este produto do catálogo?"))try{const T=q.products.find(W=>W.id===V)?.name||"Desconhecido";await bs(V),ae(g.establishmentId,je(),"Produtos","Excluiu",`Excluiu o produto: ${T}`),m("Sucesso","Produto apagado.","success"),e.style.display="none",await Se()}catch(T){m("Erro",`Não foi possível apagar: ${T.message}`,"error")}}F==="open-new-movement-modal"&&(e.style.display="none",q.currentTab="movimentacoes",vs(),tr())}}function Al(){Y("Excluir em Lote",`Tem certeza que deseja excluir ${q.selectedIds.size} produtos da rede?`).then(async t=>{if(t)try{const e=Array.from(q.selectedIds).map(a=>bs(a));await Promise.all(e),ae(g.establishmentId,je(),"Produtos","Excluiu em Lote",`Excluiu ${q.selectedIds.size} produtos`),m("Sucesso",`${q.selectedIds.size} produtos foram excluídos.`,"success"),q.selectedIds.clear(),za(),Se()}catch(e){m("Erro",`Não foi possível excluir em lote: ${e.message}`,"error")}})}async function _a(){const t=document.getElementById("report-results");if(!t)return;t.innerHTML='<div class="flex items-center justify-center h-full"><div class="loader"></div></div>';const e={startDate:document.getElementById("reportStartDate")?.value||"",endDate:document.getElementById("reportEndDate")?.value||"",productId:document.getElementById("productFilterReport")?.value||"all",categoryId:document.getElementById("categoryFilterReport")?.value||"all"};try{const s=hs().map(n=>qo({...e,establishmentId:n}).catch(d=>[])),o=await Promise.all(s);let r=[];if(o.forEach(n=>{if(!n)return;const d=Array.isArray(n)?n:Array.isArray(n.data)?n.data:Array.isArray(n.movements)?n.movements:[];r=r.concat(d)}),r.sort((n,d)=>ka(d.date)-ka(n.date)),r.length===0){t.innerHTML=`
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
                                <td class="px-4 py-3 whitespace-nowrap text-gray-500 text-xs">${ka(n.date).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"})}</td>
                                <td class="px-4 py-3 font-bold text-gray-800 text-xs">${v(n.productName)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center">
                                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md font-bold text-xs ${l}">
                                        ${c} ${d?"+":""}${n.change}
                                    </span>
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-800 font-bold font-mono text-xs">${n.newStock}</td>
                                <td class="px-4 py-3 text-gray-600 text-xs truncate max-w-[200px]" title="${v(n.reason)}">${v(n.reason)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-500 text-xs flex items-center gap-2">
                                    <i class="bi bi-person-circle text-gray-300"></i> ${v(n.user)}
                                </td>
                            </tr>`}).join("")}
                    </tbody>
                </table>
            </div>`;t.innerHTML=i}catch(a){m("Erro",`Não foi possível gerar: ${a.message}`,"error"),t.innerHTML='<div class="p-8 text-center text-red-500 font-bold">Falha ao buscar movimentações.</div>'}}const Jt=document.getElementById("content");let J={partners:[],establishments:[],searchQuery:"",categoryFilter:"all",stateFilter:"all",cityFilter:"",sortBy:"name_asc",hasSearched:!1,viewMode:"list",editingItem:null},qt=null;const Zt={contas_fixas:{label:"Contas Fixas (Água, Luz)",color:"blue",icon:"bi-lightning-charge"},estoque:{label:"Fornecedor de Produtos",color:"emerald",icon:"bi-box-seam"},servicos:{label:"Prestador de Serviço",color:"purple",icon:"bi-tools"},impostos:{label:"Governo / Impostos",color:"red",icon:"bi-bank"},outros:{label:"Outros Parceiros",color:"gray",icon:"bi-person-vcard"}},ar=["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];async function Ml(){try{const e=(await xe()).matrizes||[];J.establishments=[],e.forEach(a=>{J.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>J.establishments.push({id:s.id,name:s.name,type:"Filial"}))})}catch(t){console.warn("Erro ao buscar lojas",t)}J.viewMode="list",J.editingItem=null,J.hasSearched=!1,J.partners=[],ql(),Ol(),sr()}function ql(){Jt.innerHTML=`
        <div class="flex flex-col h-full bg-gray-50 w-full relative min-h-0 overflow-hidden">
            
            <div id="suppliers-list-view" class="w-full h-full flex flex-col transition-all duration-300 ${J.viewMode==="list"?"flex":"hidden"} p-2 md:p-4 md:pl-6 relative">
                
                <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full animate-fade-in">
                    <div></div> <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                        <button data-action="new-partner" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                            <i class="bi bi-plus-lg"></i> Novo Parceiro
                        </button>
                    </div>
                </div>

                ${jl()}

                <div class="flex-1 flex flex-col min-h-0 w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
                    <div id="partners-grid" class="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-2">
                    </div>
                </div>
            </div>

            <div id="suppliers-form-view" class="w-full h-full overflow-y-auto custom-scrollbar transition-all duration-300 ${J.viewMode==="form"?"block":"hidden"} p-2 md:p-4 md:pl-6">
                <div id="form-container-wrapper" class="max-w-4xl mx-auto w-full">
                </div>
            </div>

        </div>
    `}function jl(){const t=Object.entries(Zt).map(([a,s])=>`<option value="${a}">${s.label}</option>`).join(""),e=ar.map(a=>`<option value="${a}">${a}</option>`).join("");return`
        <div class="flex flex-col md:flex-row items-start md:items-center gap-2 mb-3 w-full animate-fade-in bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
            
            <div class="relative flex-shrink-0 w-full md:w-64">
                <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                <input type="text" id="filterSearch" placeholder="Nome, CNPJ, Email..." value="${J.searchQuery}" class="w-full pl-8 p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
            </div>
            
            <div class="flex gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                <select id="filterCategory" class="w-full md:w-auto p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-gray-700 flex-shrink-0">
                    <option value="all">Categorias</option>
                    ${t}
                </select>
                
                <select id="filterState" class="w-full md:w-auto p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-gray-700 flex-shrink-0">
                    <option value="all">Estados</option>
                    ${e}
                </select>

                <input type="text" id="filterCity" placeholder="Cidade" value="${J.cityFilter}" class="w-full md:w-32 p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all flex-shrink-0">
                
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
    `}function Nl(t=null){const e=!!t;let a=t?.category||"";a==="Produtos"&&(a="estoque"),a==="Serviços"&&(a="servicos");const s=Object.entries(Zt).map(([i,n])=>`<option value="${i}" ${a===i?"selected":""}>${n.label}</option>`).join(""),o=ar.map(i=>`<option value="${i}" ${t?.state===i?"selected":""}>${i}</option>`).join(""),r=document.getElementById("form-container-wrapper");r&&(r.innerHTML=`
        <div class="animate-fade-in-up bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-3">
                <button data-action="back-to-list" class="w-8 h-8 bg-white border border-gray-200 rounded text-gray-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm flex items-center justify-center">
                    <i class="bi bi-arrow-left text-sm"></i>
                </button>
                <div>
                    <h2 class="text-sm font-bold text-gray-800 tracking-tight">${e?"Editar Parceiro":"Novo Parceiro"}</h2>
                </div>
            </div>

            <form id="partner-form" class="flex flex-col">
                <input type="hidden" id="supId" value="${t?.id||""}">

                <div class="p-4 space-y-4">
                    
                    <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-1.5"><i class="bi bi-building text-indigo-500"></i> Dados Empresariais</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div class="md:col-span-2">
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Razão Social / Nome *</label>
                                <input type="text" id="supName" required class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none font-semibold text-gray-800 text-xs transition-shadow" value="${v(t?.name||"")}" placeholder="Ex: CPFL Energia...">
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
                                <input type="text" id="supTaxId" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${v(t?.document||t?.taxId||"")}" placeholder="00.000.000/0001-00">
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
                                <input type="text" id="supCity" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${v(t?.city||"")}" placeholder="Ex: São Paulo">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-1.5"><i class="bi bi-person-lines-fill text-indigo-500"></i> Contatos</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div class="md:col-span-2">
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Nome do Contato</label>
                                <input type="text" id="supContact" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${v(t?.contactName||"")}" placeholder="Ex: João Silva (Comercial)">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">E-mail</label>
                                <input type="email" id="supEmail" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${v(t?.email||"")}" placeholder="contato@empresa.com">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Telefone / WhatsApp</label>
                                <input type="tel" id="supPhone" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${v(t?.phone||"")}" placeholder="(00) 0000-0000">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-1.5"><i class="bi bi-journal-text text-indigo-500"></i> Informações Adicionais</h3>
                        <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Observações (PIX, Dados Bancários)</label>
                        <textarea id="supNotes" rows="2" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 font-medium resize-none transition-shadow">${t?.notes||""}</textarea>
                    </div>
                </div>

                <div class="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    ${e?`
                        <button type="button" data-action="delete-partner" data-id="${t.id}" class="w-full sm:w-auto px-4 py-2 text-red-600 bg-white border border-red-200 rounded-lg font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm text-xs">
                            <i class="bi bi-trash3 text-[10px]"></i> Excluir
                        </button>
                    `:"<div></div>"}
                    
                    <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <button type="button" data-action="back-to-list" class="px-5 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-sm w-full sm:w-auto text-xs">
                            Cancelar
                        </button>
                        <button type="submit" class="px-5 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5 w-full sm:w-auto text-xs">
                            <i class="bi bi-save2 text-[10px]"></i> ${e?"Salvar Alterações":"Cadastrar"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `,document.getElementById("partner-form").addEventListener("submit",Fl))}function sr(){const t=document.getElementById("partners-grid");t&&(t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-xl w-full max-w-2xl mx-auto shadow-sm mt-4">
                <div class="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3 border border-indigo-100 shadow-inner">
                    <i class="bi bi-search text-xl text-indigo-400"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-800 mb-1">Pronto para pesquisar</h3>
                <p class="text-[10px] text-gray-500 font-medium max-w-sm text-center">Utilize os filtros acima e clique em "Buscar" para listar os parceiros registados no sistema.</p>
            </div>
        `)}async function Rl(){const t=document.getElementById("partners-grid");if(!J.hasSearched){sr();return}t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="text-xs text-gray-500 mt-4 font-medium">Buscando parceiros...</p></div>';try{const e=await It(g.establishmentId);J.partners=e||[],or()}catch(e){t.innerHTML=`<div class="text-center py-10 text-red-500 text-sm font-bold">Erro ao carregar parceiros: ${e.message}</div>`}}function or(){const t=document.getElementById("partners-grid");if(!t)return;let e=J.partners;if(J.searchQuery){const o=J.searchQuery.toLowerCase();e=e.filter(r=>r.name.toLowerCase().includes(o)||r.document&&r.document.includes(o)||r.taxId&&r.taxId.includes(o)||r.email&&r.email.toLowerCase().includes(o)||r.contactName&&r.contactName.toLowerCase().includes(o))}if(J.categoryFilter!=="all"&&(e=e.filter(o=>o.category===J.categoryFilter)),J.stateFilter!=="all"&&(e=e.filter(o=>o.state===J.stateFilter)),J.cityFilter){const o=J.cityFilter.toLowerCase();e=e.filter(r=>r.city&&r.city.toLowerCase().includes(o))}if(e.sort((o,r)=>{let i="",n="";return J.sortBy==="name_asc"||J.sortBy==="name_desc"?(i=(o.name||"").toLowerCase(),n=(r.name||"").toLowerCase()):J.sortBy==="contact_asc"&&(i=(o.contactName||"").toLowerCase(),n=(r.contactName||"").toLowerCase()),J.sortBy==="name_desc"?n.localeCompare(i):i.localeCompare(n)}),e.length===0){t.innerHTML=`
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
    `,s='<div class="flex flex-col gap-2 md:hidden p-2">';e.forEach(o=>{let r=o.category;r==="Produtos"&&(r="estoque"),r==="Serviços"&&(r="servicos");const i=Zt[r]||Zt.outros,n=o.document||o.taxId?o.document||o.taxId:"-",d=JSON.stringify(o).replace(/'/g,"&apos;"),l=[o.city,o.state].filter(Boolean).join(" - ");a+=`
            <tr class="hover:bg-gray-50 cursor-pointer transition-colors group" data-action="open-form" data-item='${d}'>
                <td class="px-3 py-2 text-center">
                    <div class="w-8 h-8 mx-auto rounded-lg bg-${i.color}-100 text-${i.color}-600 flex items-center justify-center text-sm shadow-sm" title="${i.label}">
                        <i class="bi ${i.icon}"></i>
                    </div>
                </td>
                <td class="px-3 py-2">
                    <p class="font-bold text-gray-800 text-xs group-hover:text-indigo-700 transition-colors">${v(o.name)}</p>
                    ${o.email?`<p class="text-[9px] text-gray-500 mt-0.5 truncate max-w-[200px]"><i class="bi bi-envelope mr-1 opacity-50"></i>${v(o.email)}</p>`:""}
                </td>
                <td class="px-3 py-2 text-xs font-medium text-gray-600">${v(n)}</td>
                <td class="px-3 py-2">
                    <div class="text-xs font-medium text-gray-800">${v(o.contactName||"-")}</div>
                    ${l?`<div class="text-[9px] font-bold uppercase tracking-wider text-gray-400 mt-0.5"><i class="bi bi-geo-alt mr-1"></i>${v(l)}</div>`:""}
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
                        <h3 class="font-bold text-gray-900 text-xs leading-tight truncate">${v(o.name)}</h3>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-lg p-2 border border-gray-100 mt-1 flex flex-col gap-1">
                    <div class="flex justify-between items-center text-[10px]">
                        <span class="text-gray-500 font-medium">Documento:</span>
                        <span class="font-bold text-gray-700">${v(n)}</span>
                    </div>
                    ${l?`
                    <div class="flex justify-between items-center text-[10px]">
                        <span class="text-gray-500 font-medium">Local:</span>
                        <span class="font-bold text-gray-700">${v(l)}</span>
                    </div>`:""}
                </div>
            </div>
        `}),a+="</tbody></table></div>",s+="</div>",t.innerHTML=a+s}function xt(t,e=null){const a=document.getElementById("suppliers-list-view"),s=document.getElementById("suppliers-form-view");J.viewMode=t,J.editingItem=e,t==="list"?(a.classList.remove("hidden"),a.classList.add("flex"),s.classList.add("hidden"),s.innerHTML='<div id="form-container-wrapper" class="max-w-4xl mx-auto w-full"></div>',J.hasSearched&&or(),window.scrollTo({top:0,behavior:"smooth"})):(a.classList.add("hidden"),a.classList.remove("flex"),s.classList.remove("hidden"),Nl(e),window.scrollTo({top:0,behavior:"smooth"}))}async function Fl(t){t.preventDefault();const e=t.target,a=e.querySelector("#supId").value,s={name:e.querySelector("#supName").value,contactName:e.querySelector("#supContact").value,email:e.querySelector("#supEmail").value,phone:e.querySelector("#supPhone").value,document:e.querySelector("#supTaxId").value,category:e.querySelector("#supCategory").value,state:e.querySelector("#supState").value,city:e.querySelector("#supCity").value,establishmentId:g.establishmentId,notes:e.querySelector("#supNotes")?.value||"",accessibleIn:[g.establishmentId]},o=e.querySelector('button[type="submit"]'),r=o.innerHTML;o.disabled=!0,o.innerHTML='<div class="loader-small border-white"></div> A gravar...';try{a?(await yl(a,s),m("Sucesso","Ficha atualizada!","success")):(await vl(s),m("Sucesso","Parceiro registado!","success")),J.hasSearched&&(J.partners=await It(g.establishmentId)||[]),xt("list")}catch(i){m("Erro","Falha ao gravar: "+i.message,"error"),o.disabled=!1,o.innerHTML=r}}async function Hl(t){if(await Y("Excluir Parceiro","Deseja realmente apagar esta ficha permanentemente?"))try{await wl(t),m("Sucesso","Entidade excluída.","success"),J.partners=J.partners.filter(a=>a.id!==t),xt("list")}catch(a){m("Erro","Erro ao excluir: "+a.message,"error")}}function Ol(){qt&&Jt.removeEventListener("click",qt),qt=async t=>{const e=t.target;if(e.closest('button[data-action="new-partner"]')){xt("form",null);return}if(e.closest("#btn-search-partners")){J.searchQuery=document.getElementById("filterSearch").value,J.categoryFilter=document.getElementById("filterCategory").value,J.stateFilter=document.getElementById("filterState").value,J.cityFilter=document.getElementById("filterCity").value,J.sortBy=document.getElementById("filterSortBy").value,J.hasSearched=!0,Rl();return}if(e.closest('button[data-action="back-to-list"]')){xt("list");return}const a=e.closest('button[data-action="delete-partner"]');if(a){t.preventDefault(),Hl(a.dataset.id);return}const s=e.closest('[data-action="open-form"]');if(s&&!e.closest("button")){const o=JSON.parse(s.dataset.item.replace(/&apos;/g,"'"));xt("form",o)}},Jt.addEventListener("click",qt),Jt.addEventListener("keypress",t=>{t.key==="Enter"&&(t.target.id==="filterSearch"||t.target.id==="filterCity")&&document.getElementById("btn-search-partners").click()})}const Va=document.getElementById("content"),zs={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let z={professionals:[],services:[],hierarchyCache:[],statusFilter:"all",searchQuery:"",filterServiceId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set,viewMode:"list",tempProf:null},jt=null,Nt=null;function Qt(){const t=ge.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function rr(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[g.establishmentId]}function zl(){const t=document.getElementById("professionals-layout-main"),e=document.getElementById("professionals-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&t.classList.add("mobile-detail-open"),e&&(e.classList.remove("hidden"),e.classList.add("flex")),a&&(a.style.display="none")}function $a(){const t=document.getElementById("professionals-layout-main"),e=document.getElementById("professionals-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&t.classList.remove("mobile-detail-open"),e&&(e.classList.add("hidden"),e.classList.remove("flex")),a&&(a.style.display=""),z.viewMode="list"}async function _l(){z.selectedIds.clear(),z.viewMode="list";try{const t=await xe();z.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}ir(),Kl(),await ea()}function ir(){Va.innerHTML=`
        <style id="professionals-mobile-css">
            @media (max-width: 767px) {
                .mobile-detail-open #professionals-layout-main { display: none !important; }
                #professionals-layout-main:not(.mobile-detail-open) #professionals-layout-detail { display: none !important; }
                .mobile-detail-open #professionals-layout-detail {
                    display: flex !important;
                    position: fixed !important;
                    top: 0; left: 0; right: 0; bottom: 0;
                    height: 100dvh !important;
                    width: 100vw !important;
                    z-index: 99999 !important;
                    background-color: #f8fafc !important;
                    flex-direction: column !important;
                }
            }
            #toast-container, .toast-notification, .modal, .modal-backdrop { z-index: 9999999 !important; }
        </style>

        <div class="h-full flex w-full relative overflow-hidden bg-slate-50">
            <section id="professionals-layout-main" class="flex-1 flex flex-col p-2 md:p-4 md:pl-6 w-full relative overflow-y-auto custom-scrollbar">
                
                <div id="batch-action-bar" class="hidden absolute top-4 left-4 right-4 z-30 bg-slate-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down">
                    <div class="flex items-center gap-3">
                        <button id="cancel-selection-btn" class="p-1.5 hover:bg-slate-700 rounded-full transition-colors text-slate-300 hover:text-white">
                            <i class="bi bi-x-lg text-lg"></i>
                        </button>
                        <span class="font-bold text-sm tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Selecionados</span>
                    </div>
                    <button data-action="batch-delete" class="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-sm active:scale-95">
                        <i class="bi bi-trash3"></i> Excluir
                    </button>
                </div>

                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 animate-fade-in w-full">
                    <div class="relative w-full md:w-96 flex-shrink-0">
                        <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input type="text" id="searchInput" value="${z.searchQuery}" placeholder="Nome ou especialidade..." class="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-xs font-semibold text-slate-700">
                    </div>
                    
                    <div class="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
                        <button id="toggle-filter-btn" class="py-2 px-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-1.5 text-[10px] active:scale-95 ${z.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                            <i class="bi bi-funnel text-sm"></i> Filtros
                        </button>
                        <button data-action="open-professional-editor" data-id="" class="py-2 px-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-sm flex items-center justify-center gap-1.5 text-[10px] active:scale-95 uppercase tracking-wider">
                            <i class="bi bi-person-plus-fill text-sm"></i> Criar Perfil
                        </button>
                    </div>
                </div>

                <div id="filter-panel" class="${z.isAdvancedFilterOpen?"block":"hidden"} mb-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
                    <div class="flex flex-col md:flex-row items-end gap-3">
                        <div class="w-full md:w-64">
                            <label class="block text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Serviço Habilitado</label>
                            <select id="filterServiceId" class="w-full p-2 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm">
                                <option value="all">Todos os serviços</option>
                            </select>
                        </div>
                        <div class="flex gap-2 w-full md:w-auto">
                            <button id="clear-filters-btn" class="w-full md:w-auto px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition-colors text-[10px] uppercase tracking-wider">Limpar</button>
                            <button id="apply-filter-btn" class="w-full md:w-auto px-5 py-2 bg-indigo-600 text-white font-black rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition-all text-[10px] uppercase tracking-wider">Aplicar</button>
                        </div>
                    </div>
                </div>

                <div id="summary-section" class="grid grid-cols-4 gap-1.5 md:gap-3 mb-2 animate-fade-in w-full"></div>

                <div class="flex gap-1.5 overflow-x-auto pb-1 w-full custom-scrollbar mb-2 animate-fade-in flex-shrink-0">
                    <button data-status="all" class="status-filter-btn px-3 py-1.5 text-[10px] font-black rounded-lg border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${z.statusFilter==="all"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Todos</button>
                    <button data-status="active" class="status-filter-btn px-3 py-1.5 text-[10px] font-black rounded-lg border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${z.statusFilter==="active"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Ativos</button>
                    <button data-status="inactive" class="status-filter-btn px-3 py-1.5 text-[10px] font-black rounded-lg border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${z.statusFilter==="inactive"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Inativos</button>
                </div>

                <div id="professionalsList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                    ${dr(8)}
                </div>
            </section>

            <div id="professionals-layout-detail" class="hidden absolute inset-0 z-50 bg-slate-50 flex-col overflow-hidden w-full h-full md:relative md:inset-auto md:z-auto md:flex-1 md:border-l md:border-slate-200">
                </div>
        </div>
    `}async function ea(){const t=document.getElementById("professionalsList"),e=rr();try{const a=e.map(d=>we(d)),s=e.map(d=>nt(d)),o=await Promise.all(a),r=await Promise.all(s),i=new Map;o.flat().forEach(d=>i.set(d.id,d)),z.professionals=Array.from(i.values()),g.professionals=z.professionals;const n=new Map;r.flat().forEach(d=>n.set(d.id,d)),z.services=Array.from(n.values()),nr(),Ve()}catch(a){console.error(a),t&&(t.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>')}}function nr(){const t=document.getElementById("filterServiceId");t&&z.services&&(t.innerHTML='<option value="all">Todos os serviços</option>',z.services.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=v(e.name),z.filterServiceId===e.id&&(a.selected=!0),t.appendChild(a)}))}function lr(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=z.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function Vl(t){const e=document.getElementById("summary-section");if(!e)return;const a=t.length,s=t.filter(r=>r.status!=="inactive").length,o=a-s;e.innerHTML=`
        <div class="bg-white p-1.5 md:p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Total Rede</span>
            <span class="text-xs md:text-lg font-black text-slate-800 mt-0.5 w-full truncate">${a}</span>
        </div>
        <div class="bg-white p-1.5 md:p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Ativos</span>
            <span class="text-xs md:text-lg font-black text-emerald-600 mt-0.5 w-full truncate">${s}</span>
        </div>
        <div class="bg-white p-1.5 md:p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Inativos</span>
            <span class="text-xs md:text-lg font-black text-red-500 mt-0.5 w-full truncate">${o}</span>
        </div>
        <div class="bg-indigo-50 p-1.5 md:p-3 rounded-lg border border-indigo-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[8px] font-bold text-indigo-500 uppercase tracking-widest w-full truncate">Exibidos</span>
            <span class="text-xs md:text-lg font-black text-indigo-700 mt-0.5 w-full truncate">${t.length}</span>
        </div>
    `}function Ve(){const t=document.getElementById("professionalsList");if(!t)return;if(!z.professionals||z.professionals.length===0){t.innerHTML=dr(8);return}const e=rr(),a=z.professionals.filter(s=>{const o=s.name.toLowerCase().includes(z.searchQuery)||s.specialty&&s.specialty.toLowerCase().includes(z.searchQuery);let r=!0;z.statusFilter==="active"&&(r=s.status!=="inactive"),z.statusFilter==="inactive"&&(r=s.status==="inactive");const i=z.filterServiceId==="all"||s.services&&s.services.includes(z.filterServiceId),n=s.accessibleIn&&s.accessibleIn.length>0?s.accessibleIn:[s.establishmentId||g.establishmentId],d=e.some(l=>n.includes(l));return o&&r&&i&&d});if(Vl(a),a.length===0){t.innerHTML=`
            <div class="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-people text-2xl text-slate-300"></i>
                </div>
                <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhum profissional encontrado</h3>
                <p class="text-[10px] text-slate-500 max-w-xs text-center">Tente ajustar os filtros ou verificar as unidades selecionadas no topo.</p>
            </div>
        `;return}t.innerHTML=a.map(s=>{const o=s.status==="inactive",r=v(s.name),i=v(s.specialty||"Especialidade"),n=s.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(s.name?s.name.charAt(0):"P")}`,d=s.accessibleIn?s.accessibleIn.length:1,l=s.services?s.services.length:0,c=z.selectedIds.has(s.id);return`
            <div class="professional-card relative bg-white rounded-2xl border ${c?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-slate-200"} shadow-sm flex items-center p-3.5 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 active:scale-[0.98] ${o?"opacity-60 bg-slate-50":""}" 
                 data-action="open-professional-editor" data-id="${s.id}">
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" data-action-stop-propagation="true">
                    <input type="checkbox" data-id="${s.id}" class="professional-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${c?"checked":""}>
                </div>

                <div class="relative flex-shrink-0 mr-4">
                    <img src="${n}" alt="${r}" class="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border border-slate-100 shadow-sm">
                    <span class="absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${o?"bg-red-500":"bg-emerald-500"}" title="${o?"Inativo":"Ativo"}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-6">
                    <h3 class="text-sm font-black text-slate-800 truncate leading-tight mb-0.5">${r}</h3>
                    <p class="text-[10px] font-bold text-slate-500 truncate uppercase tracking-widest">${i}</p>
                    
                    <div class="flex items-center gap-1.5 mt-2">
                        ${d>1?`<span class="text-[9px] font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded-md border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${d}</span>`:'<span class="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md border border-slate-200 flex items-center gap-1"><i class="bi bi-geo-alt"></i> Única</span>'}
                        <span class="text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200 flex items-center gap-1" title="${l} serviços habilitados"><i class="bi bi-scissors text-indigo-400"></i> ${l}</span>
                    </div>
                </div>
            </div>`}).join("")}function dr(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center p-3.5 animate-pulse h-[86px]">
            <div class="w-12 h-12 rounded-full bg-slate-200 flex-shrink-0 mr-4"></div>
            <div class="flex-1 space-y-2">
                <div class="h-3 bg-slate-200 rounded w-3/4"></div>
                <div class="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}async function Ul(t){z.viewMode="edit-professional";const e=document.getElementById("professionals-layout-detail");if(!e)return;let a={name:"",specialty:"",status:"active",workingHours:{},services:[]};if(t){const r=z.professionals.find(i=>String(i.id)===String(t));r&&(a=JSON.parse(JSON.stringify(r)))}z.tempProf=a;const s=!!a.id;v(a.name||"Novo Profissional");const o=`
        <div class="p-4 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 shadow-inner transition-transform active:scale-95">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <h3 class="font-black text-base text-slate-800 ml-4 uppercase tracking-wider truncate">${s?"Editar Perfil":"Novo Perfil"}</h3>
            ${s?`
                <button data-action="delete-professional" data-id="${a.id}" class="ml-auto w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 shadow-inner transition-transform active:scale-95">
                    <i class="bi bi-trash3 text-lg"></i>
                </button>
            `:""}
        </div>
    `;e.innerHTML=`
        ${o}
        
        <div class="modal-tabs px-2 md:px-6 border-b flex items-center overflow-x-auto bg-slate-50 flex-shrink-0 custom-scrollbar shadow-sm">
            <button class="tab-link active whitespace-nowrap text-[10px] md:text-xs font-bold py-3.5 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors uppercase tracking-widest" data-tab="dados-basicos">1. Básicos</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-bold py-3.5 px-4 border-b-2 border-transparent text-slate-500 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="atuacao">2. Atuação</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-bold py-3.5 px-4 border-b-2 border-transparent text-slate-500 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="jornada">3. Jornada</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-bold py-3.5 px-4 border-b-2 border-transparent text-slate-500 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="bloqueios">4. Bloqueios</button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-3 md:p-6 custom-scrollbar bg-slate-50/50 pb-28 relative"> 
            <form id="professionalForm" class="h-full max-w-4xl mx-auto">
                <input type="hidden" id="professionalId" value="${a.id||""}">
                <input type="hidden" id="profPhotoBase64" value="${a.photo||""}">
                
                <div id="dados-basicos" class="tab-content active space-y-4 md:space-y-6"></div>
                <div id="atuacao" class="tab-content hidden space-y-4 md:space-y-6"></div>
                <div id="jornada" class="tab-content hidden animate-fade-in-fast"></div>
                <div id="bloqueios" class="tab-content hidden animate-fade-in-fast"></div>
            </form>
        </div>

        <footer class="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)] w-full flex-shrink-0 z-50 flex gap-3">
            <button type="button" data-action="close-detail-screen" class="hidden md:block py-3.5 px-5 bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors shadow-sm">Cancelar</button>
            <button type="button" data-action="save-professional" class="w-full py-4 md:py-3.5 bg-indigo-600 text-white font-black text-sm rounded-xl hover:bg-indigo-700 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider">
                <i class="bi bi-save2 text-lg"></i> Salvar Perfil
            </button>
        </footer>
    `,Wl(a,z.services),Ql(a),await Xl(a,z.professionals),Yl(a),zl()}function Wl(t,e){const a=document.getElementById("dados-basicos"),s=document.getElementById("atuacao");if(!a||!s)return;const o=t.dob?t.dob.split("/"):["",""],r=Array.from({length:12},(c,u)=>{const p=u+1,b=p==o[1]?"selected":"",f=new Date(0,u).toLocaleString("pt-BR",{month:"long"});return`<option value="${p}" ${b}>${f.charAt(0).toUpperCase()+f.slice(1)}</option>`}).join(""),i=v(t.name||""),n=v(t.specialty||""),d=v(t.phone||""),l=v(t.notes||"");a.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-1 space-y-4">
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Foto de Perfil</label>
                    <div class="relative group mx-auto w-28 h-28 mb-4 cursor-pointer" id="profPhotoContainer">
                        <img id="profPhotoPreview" src="${t.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`}" alt="Foto de Perfil" class="w-28 h-28 rounded-full object-cover border-4 border-slate-50 shadow-md transition-all group-hover:brightness-75">
                        <div id="profPhotoButtonOverlay" class="absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                            <i class="bi bi-camera-fill text-white text-3xl drop-shadow-md"></i>
                        </div>
                    </div>
                    <input type="file" id="profPhotoInput" class="hidden" accept="image/*">
                    <button type="button" id="profPhotoButton" class="text-indigo-600 text-xs font-black uppercase tracking-wider hover:text-indigo-800 transition-colors w-full bg-indigo-50 py-2 rounded-xl border border-indigo-100">Alterar Imagem</button>
                </div>

                 <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p class="text-xs font-black text-slate-800 uppercase tracking-wider mb-0.5">Status do Perfil</p>
                        <p class="text-[9px] font-bold text-slate-400">Inativos não aparecem na agenda.</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="profStatusToggle" class="sr-only peer" ${t.status!=="inactive"?"checked":""}>
                        <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
                    </label>
                </div>
            </div>

            <div class="md:col-span-2 space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="form-group sm:col-span-2">
                        <label for="profName" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome Completo *</label>
                        <input type="text" id="profName" value="${i}" required class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profSpecialty" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Especialidade / Cargo *</label>
                        <input type="text" id="profSpecialty" value="${n}" required placeholder="Ex: Cabeleireiro, Médico" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profPhone" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">WhatsApp / Telefone</label>
                        <input type="tel" id="profPhone" value="${d}" placeholder="(00) 00000-0000" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profDobDay" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Aniversário (Dia)</label>
                        <input type="number" id="profDobDay" value="${o[0]}" min="1" max="31" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profDobMonth" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Aniversário (Mês)</label>
                        <select id="profDobMonth" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
                            <option value="">Selecione...</option>${r}
                        </select>
                    </div>
                </div>

                <div class="form-group pt-2">
                    <label for="profNotes" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Observações Internas</label>
                    <textarea id="profNotes" rows="3" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-medium text-slate-700 shadow-inner transition-colors placeholder-slate-400 resize-none" placeholder="Ex: Informações contratuais, detalhes de preferência...">${l}</textarea>
                </div>
            </div>
        </div>
    `,s.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
                <div>
                    <p class="text-xs font-black text-slate-800 uppercase tracking-wider mb-0.5">Paga Comissão?</p>
                    <p class="text-[9px] font-bold text-slate-400">Gera comissão em serviços.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer ml-3">
                    <input type="checkbox" id="profCommissionToggle" class="sr-only peer" ${t.receivesCommission!==!1?"checked":""}>
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 shadow-inner"></div>
                </label>
            </div>

            <div class="flex items-center justify-between border-b md:border-b-0 md:border-r border-slate-100 py-4 md:py-0 md:px-4">
                <div>
                    <p class="text-xs font-black text-slate-800 uppercase tracking-wider mb-0.5">Exibir no App</p>
                    <p class="text-[9px] font-bold text-slate-400">Visível para agendamento online.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer ml-3">
                    <input type="checkbox" id="profShowOnAgendaToggle" class="sr-only peer" ${t.showOnAgenda!==!1?"checked":""}>
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                </label>
            </div>

            <div class="pt-4 md:pt-0 md:pl-4">
                <label for="profOrderOnAgenda" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Ordem na Agenda</label>
                <div class="flex items-center gap-2">
                    <input type="number" id="profOrderOnAgenda" value="${t.orderOnAgenda||"1"}" min="1" class="w-20 p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-center font-black bg-slate-50 shadow-inner">
                    <span class="text-[9px] font-bold text-slate-400">Posição visual.</span>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                <div class="flex items-center mb-4 text-indigo-900 border-b border-slate-100 pb-3">
                    <div class="bg-indigo-100 w-10 h-10 rounded-xl mr-3 flex items-center justify-center border border-indigo-200"><i class="bi bi-diagram-3 text-xl"></i></div>
                    <div>
                        <h3 class="text-sm font-black uppercase tracking-wider">Lojas de Atendimento</h3>
                        <p class="text-[9px] font-bold text-slate-400">Unidades onde atende.</p>
                    </div>
                </div>
                <div class="flex-1">
                    ${Jl(t.accessibleIn||[])}
                </div>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                    <div class="flex items-center text-emerald-900">
                        <div class="bg-emerald-100 w-10 h-10 rounded-xl mr-3 flex items-center justify-center border border-emerald-200"><i class="bi bi-scissors text-xl"></i></div>
                        <div>
                            <h3 class="text-sm font-black uppercase tracking-wider">Serviços Habilitados</h3>
                            <p class="text-[9px] font-bold text-slate-400">O que o profissional faz.</p>
                        </div>
                    </div>
                    <button type="button" id="selectAllServicesBtn" class="text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors border border-indigo-100 active:scale-95">
                        Selecionar Todos
                    </button>
                </div>
                
                <div id="profServicesContainer" class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-1 flex-1">
                    ${e.map(c=>`
                        <label class="flex items-center space-x-3 p-2.5 bg-slate-50 rounded-xl cursor-pointer transition-colors border border-slate-200 hover:border-indigo-300 hover:shadow-sm">
                            <input type="checkbox" value="${c.id}" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" ${t.services?.includes(c.id)?"checked":""}>
                            <span class="text-xs font-bold text-slate-700 truncate" title="${v(c.name)}">${v(c.name)}</span>
                        </label>
                    `).join("")}
                    ${e.length===0?'<p class="col-span-full text-center text-xs font-bold text-slate-400 py-6 border border-dashed border-slate-200 rounded-xl">Nenhum serviço cadastrado no sistema.</p>':""}
                </div>
            </div>
        </div>
    `}function Jl(t=[]){if(!z.hierarchyCache||z.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${g.establishmentId}">
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 text-center">
                <i class="bi bi-info-circle text-lg block mb-1"></i> Exclusivo desta unidade.
            </div>`;let e='<div class="space-y-1.5 mt-2 max-h-48 overflow-y-auto custom-scrollbar">';return z.hierarchyCache.forEach(a=>{const s=t.includes(a.id)||t.length===0&&a.id===g.establishmentId;e+=`
            <label class="flex items-center space-x-3 p-2.5 cursor-pointer bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-xs font-black text-slate-800">🏢 ${v(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(o=>{const r=t.includes(o.id)||t.length===0&&o.id===g.establishmentId;e+=`
                    <label class="flex items-center space-x-3 p-2.5 ml-6 cursor-pointer bg-white hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl transition-colors border-l-4 border-l-indigo-200">
                        <input type="checkbox" name="accessibleIn" value="${o.id}" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${r?"checked":""}>
                        <span class="text-xs font-bold text-slate-600">📍 ${v(o.name)}</span>
                    </label>
                `})}),e+="</div>",e}function Ql(t){const e=document.getElementById("jornada");e&&(e.innerHTML=`
        <div class="max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-1">Jornada Semanal</h3>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Defina os dias e os horários de atendimento.</p>
            <div id="profScheduleContainer" class="grid grid-cols-1 lg:grid-cols-2 gap-3"></div>
        </div>`,Gl(e.querySelector("#profScheduleContainer"),t.workingHours||{}))}function Gl(t,e){t.innerHTML=Object.keys(zs).map(a=>{const s=e[a]||{},o=s.active!==!1;return`
            <div class="day-schedule-card p-3 md:p-4 rounded-xl ${o?"bg-white border-slate-200 shadow-sm":"bg-slate-50 border-slate-100 disabled opacity-60"} border transition-all">
                 <div class="flex justify-between items-center mb-3">
                    <span class="font-black text-sm text-slate-800 uppercase tracking-wider">${zs[a]}</span>
                    <label class="flex items-center cursor-pointer">
                        <div class="relative">
                            <input type="checkbox" data-day="${a}" data-field="active" class="sr-only" ${o?"checked":""}>
                            <div class="toggle-bg block bg-slate-200 w-11 h-6 rounded-full peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full shadow-inner"></div>
                        </div>
                    </label>
                 </div>
                <div class="time-inputs grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><label class="block text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1 ml-1">Abertura:</label><input type="time" data-day="${a}" data-field="start" value="${s.start||"09:00"}" class="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner" ${o?"":"disabled"}></div>
                    <div><label class="block text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1 ml-1">Fecho:</label><input type="time" data-day="${a}" data-field="end" value="${s.end||"18:00"}" class="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner" ${o?"":"disabled"}></div>
                    <div><label class="block text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1 ml-1">Início Pausa:</label><input type="time" data-day="${a}" data-field="breakStart" value="${s.breakStart||"12:00"}" class="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner" ${o?"":"disabled"}></div>
                    <div><label class="block text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1 ml-1">Fim Pausa:</label><input type="time" data-day="${a}" data-field="breakEnd" value="${s.breakEnd||"13:00"}" class="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner" ${o?"":"disabled"}></div>
                </div>
            </div>`}).join(""),t.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",s=>{const o=s.target.closest(".day-schedule-card"),r=!s.target.checked;o.classList.toggle("bg-white",!r),o.classList.toggle("shadow-sm",!r),o.classList.toggle("border-slate-200",!r),o.classList.toggle("bg-slate-50",r),o.classList.toggle("border-slate-100",r),o.classList.toggle("opacity-60",r),o.classList.toggle("disabled",r),o.querySelectorAll(".time-inputs input").forEach(i=>i.disabled=r)})})}async function Xl(t,e){const a=document.getElementById("bloqueios");if(!a)return;a.innerHTML=`
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div class="border-b xl:border-b-0 xl:border-r border-slate-100 pb-6 xl:pb-0 xl:pr-6">
                <h3 class="text-sm font-black text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-wider"><i class="bi bi-calendar-x text-orange-500 text-lg"></i> Lançar Bloqueio / Férias</h3>
                <form id="batchBlockageForm" class="p-4 md:p-5 bg-orange-50/30 border border-orange-200 rounded-2xl space-y-4">
                    <div>
                        <h4 class="font-bold text-slate-700 mb-2 text-[10px] uppercase tracking-widest ml-1">Aplicar aos Profissionais:</h4>
                        <div id="batchProfSelectionContainer" class="max-h-32 overflow-y-auto custom-scrollbar p-2 border border-orange-200 rounded-xl bg-white space-y-1 shadow-inner">
                            ${e.map(r=>`
                                <label class="flex items-center space-x-3 hover:bg-orange-50 p-2 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-orange-100">
                                    <input type="checkbox" name="batch-professionals" value="${r.id}" class="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500" ${r.id===t.id?"checked":""}>
                                    <span class="text-xs font-bold text-slate-700">${v(r.name)}</span>
                                </label>`).join("")}
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div><label for="batchBlockageStartDate" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Data Início</label><input type="date" id="batchBlockageStartDate" required class="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-1 focus:ring-orange-500 text-xs font-bold bg-white shadow-inner"></div>
                        <div><label for="batchBlockageEndDate" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Data Fim (Opcional)</label><input type="date" id="batchBlockageEndDate" class="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-1 focus:ring-orange-500 text-xs font-bold bg-white shadow-inner"></div>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Hora Início</label><input type="time" id="batchBlockageStartTime" required class="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-1 focus:ring-orange-500 text-xs font-bold bg-white shadow-inner"></div>
                        <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Hora Fim</label><input type="time" id="batchBlockageEndTime" required class="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-1 focus:ring-orange-500 text-xs font-bold bg-white shadow-inner"></div>
                    </div>
                    <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Motivo / Descrição</label><input type="text" id="batchBlockageReason" placeholder="Ex: Férias, Médico..." class="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-1 focus:ring-orange-500 text-sm font-medium bg-white shadow-inner"></div>
                    <button type="submit" class="w-full bg-orange-500 text-white font-black py-3.5 rounded-xl hover:bg-orange-600 shadow-md active:scale-95 transition-transform mt-2 uppercase tracking-wider text-xs">Gravar Bloqueio</button>
                </form>
            </div>
            <div class="xl:pl-2">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
                    <div>
                        <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-0.5">Registos Salvos</h3>
                        <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">${v((t.name||"").split(" ")[0]||"Profissional")}</p>
                    </div>
                    <select id="prof-blockages-filter" class="p-2 border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm">
                        <option value="future">Apenas Futuros</option>
                        <option value="history">Histórico Passado</option>
                    </select>
                </div>
                <div id="blockagesList" class="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2"></div>
            </div>
        </div>`;const s=document.getElementById("batchBlockageForm");s&&s.addEventListener("submit",async r=>{r.preventDefault();const i=s.querySelector('button[type="submit"]'),n=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';const d=Array.from(r.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(h=>h.value);if(d.length===0)return i.disabled=!1,i.innerHTML=n,m("Atenção","Selecione pelo menos um profissional.","error");const l=r.target.batchBlockageStartDate.value,c=r.target.batchBlockageEndDate.value||l,u=r.target.batchBlockageStartTime.value,p=r.target.batchBlockageEndTime.value,b=r.target.batchBlockageReason.value;if(!l||!u||!p)return i.disabled=!1,i.innerHTML=n,m("Atenção","Preencha Data de Início, Hora de Início e Fim.","error");const f=d.map(h=>{const y={professionalId:h,establishmentId:g.establishmentId,startTime:new Date(`${l}T${u}`).toISOString(),endTime:new Date(`${c}T${p}`).toISOString(),reason:b};return ca(y)});try{await Promise.all(f),m("Sucesso!",`${d.length} bloqueios foram criados.`),s.reset(),r.target.querySelectorAll('input[name="batch-professionals"]').forEach(y=>{y.checked=y.value===t.id});const h=document.getElementById("prof-blockages-filter").value;ht(t.id,h)}catch(h){m("Erro",h.message,"error")}finally{i.disabled=!1,i.innerHTML=n}});const o=document.getElementById("prof-blockages-filter");o&&o.addEventListener("change",r=>ht(t.id,r.target.value)),t.id&&await ht(t.id,"future")}async function ht(t,e="future"){const a=document.getElementById("blockagesList");if(a){if(a.innerHTML='<div class="loader mx-auto mt-6"></div>',!t){a.innerHTML=`
            <div class="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <i class="bi bi-info-circle text-2xl text-slate-300 mb-2 block"></i>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Salve o perfil para ver o histórico.</p>
            </div>`;return}try{const s=new Date;let o,r;e==="history"?(r=new Date,o=new Date,o.setFullYear(o.getFullYear()-2)):(o=new Date,r=new Date,r.setFullYear(r.getFullYear()+2));let n=(await da(g.establishmentId,o.toISOString(),r.toISOString(),t)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));e==="history"?n=n.filter(l=>l.endTime<s).sort((l,c)=>c.startTime-l.startTime):n=n.filter(l=>l.endTime>=s).sort((l,c)=>l.startTime-c.startTime);const d=n.reduce((l,c)=>{const u=c.reason||"Sem motivo detalhado";return l[u]||(l[u]=[]),l[u].push(c),l},{});if(Object.keys(d).length===0){a.innerHTML=`
                <div class="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    <i class="bi bi-calendar-check text-3xl text-slate-300 mb-2 block"></i>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhum bloqueio ${e==="history"?"no histórico":"agendado para o futuro"}.</p>
                </div>`;return}a.innerHTML=Object.entries(d).map(([l,c])=>`
            <div class="bg-white border border-slate-200 rounded-xl shadow-sm mb-3 overflow-hidden">
                <div class="bg-slate-50 px-3 py-2.5 border-b border-slate-200 flex justify-between items-center">
                    <h4 class="font-black text-xs text-slate-800 flex items-center gap-2"><i class="bi bi-tag-fill text-orange-400 text-sm"></i> ${v(l)}</h4>
                    ${c.length>1?`<button data-action="batch-delete-blockage" data-ids='${JSON.stringify(c.map(u=>u.id))}' class="text-[9px] text-red-600 bg-red-50 hover:bg-red-100 font-bold px-2 py-1.5 rounded-lg border border-red-100 transition-colors uppercase tracking-widest active:scale-95">Apagar Todos (${c.length})</button>`:""}
                </div>
                <div class="divide-y divide-slate-100 p-1">
                ${c.map(u=>`
                    <div class="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="bg-orange-50 text-orange-600 border border-orange-100 w-11 h-11 rounded-xl flex flex-col items-center justify-center leading-none shadow-inner">
                                <span class="font-black text-sm">${u.startTime.getDate().toString().padStart(2,"0")}</span>
                                <span class="text-[8px] uppercase font-bold">${u.startTime.toLocaleString("pt-BR",{month:"short"})}</span>
                            </div>
                            <div>
                                <p class="text-xs font-black text-slate-700">
                                   ${u.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} <span class="text-slate-400 font-medium">até</span> ${u.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}
                                </p>
                                ${u.startTime.getDate()!==u.endTime.getDate()?`<p class="text-[10px] text-slate-400 font-bold mt-0.5">Termina: ${u.endTime.toLocaleDateString("pt-BR")}</p>`:""}
                            </div>
                        </div>
                        <button data-action="delete-blockage" data-id="${u.id}" class="text-slate-400 hover:text-red-500 w-8 h-8 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors flex items-center justify-center shadow-sm" title="Apagar">
                            <i class="bi bi-trash3 pointer-events-none"></i>
                        </button>
                    </div>
                `).join("")}
                </div>
            </div>
        `).join("")}catch(s){a.innerHTML=`<p class="text-[10px] font-bold text-red-500 p-4 bg-red-50 rounded-xl border border-red-100">${s.message}</p>`}}}function Yl(t){const e=document.getElementById("professionals-layout-detail");if(!e)return;const a=e.querySelectorAll(".tab-link");a.forEach(p=>{p.addEventListener("click",b=>{b.preventDefault(),a.forEach(y=>{y.classList.remove("active","border-indigo-600","text-indigo-600"),y.classList.add("border-transparent","text-slate-500")}),p.classList.add("active","border-indigo-600","text-indigo-600"),p.classList.remove("border-transparent","text-slate-500"),e.querySelectorAll(".tab-content").forEach(y=>y.classList.add("hidden"));const f=p.dataset.tab,h=e.querySelector("#"+f);h&&h.classList.remove("hidden")})});const s=e.querySelector("#profPhotoInput"),o=e.querySelector("#profPhotoButton"),r=e.querySelector("#profPhotoContainer"),i=e.querySelector("#profPhotoPreview"),n=e.querySelector("#profPhotoBase64"),d=t.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,l=t.photo||"",c=()=>s.click();o&&o.addEventListener("click",c),r&&r.addEventListener("click",c),s&&(s.onchange=async()=>{const p=s.files[0];if(p){i.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const b=await ls(p,800,800,.8);if(b.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");i.src=b,n.value=b}catch(b){m("Erro de Imagem",b.message||"Não foi possível processar a imagem.","error"),i.src=d,n.value=l,s.value=""}}});const u=e.querySelector("#selectAllServicesBtn");if(u){u.addEventListener("click",()=>{const b=e.querySelectorAll('#profServicesContainer input[type="checkbox"]'),f=Array.from(b).every(h=>h.checked);b.forEach(h=>{h.checked=!f}),u.textContent=f?"Selecionar Todos":"Desmarcar Todos"});const p=e.querySelectorAll('#profServicesContainer input[type="checkbox"]');p.length>0&&Array.from(p).every(b=>b.checked)&&(u.textContent="Desmarcar Todos")}}function Kl(){jt&&document.body.removeEventListener("click",jt),Nt&&Va.removeEventListener("input",Nt),jt=async t=>{if(t.target.classList.contains("professional-checkbox")){const r=t.target.dataset.id;t.target.checked?z.selectedIds.add(r):z.selectedIds.delete(r),lr(),t.stopPropagation();return}const e=t.target.closest(".status-filter-btn");if(e){z.statusFilter=e.dataset.status,document.querySelectorAll(".status-filter-btn").forEach(r=>{r.classList.remove("bg-indigo-600","text-white","border-indigo-600"),r.classList.add("bg-white","text-slate-600","border-slate-200")}),e.classList.remove("bg-white","text-slate-600","border-slate-200"),e.classList.add("bg-indigo-600","text-white","border-indigo-600"),Ve();return}if(t.target.id==="clear-filters-btn"){t.preventDefault(),document.getElementById("filterServiceId").value="all",z.filterServiceId="all",Ve();return}if(t.target.id==="apply-filter-btn"){t.preventDefault(),z.filterServiceId=document.getElementById("filterServiceId").value,Ve();return}if(t.target.closest("#toggle-filter-btn")){t.preventDefault(),z.isAdvancedFilterOpen=!z.isAdvancedFilterOpen,ir(),document.getElementById("searchInput").value=z.searchQuery,nr(),Ve();return}const s=t.target.closest("button[data-action]");if(!s)return;const o=s.dataset.action;switch(["close-detail-screen","delete-professional","save-professional","delete-blockage","batch-delete-blockage"].includes(o)&&t.stopPropagation(),o){case"open-professional-editor":Ul(s.dataset.id);break;case"close-detail-screen":$a(),z.tempProf=null;break;case"batch-delete":Zl();break;case"delete-professional":{const r=s.dataset.id,i=z.tempProf?.name||"Profissional";if(await Y("Excluir Profissional",`Tem certeza que deseja excluir ${i}? Esta ação não pode ser desfeita.`))try{await Eo(r),ae(g.establishmentId,Qt(),"Equipe","Excluiu",`Excluiu profissional: ${i}`),m("Sucesso!","Profissional excluído da rede.","success"),$a(),ea()}catch(d){m("Erro",`Não foi possível excluir: ${d.message}`,"error")}break}case"save-professional":{const r=document.getElementById("professionals-layout-detail"),i=s,n=r.querySelector("#profScheduleContainer"),d=Array.from(r.querySelectorAll('#profServicesContainer input[type="checkbox"]:checked')).map($=>$.value),l={};n&&n.querySelectorAll(".day-schedule-card").forEach($=>{const A=$.querySelector('[data-field="active"]').dataset.day;l[A]={active:$.querySelector('[data-field="active"]').checked,start:$.querySelector('[data-field="start"]').value,end:$.querySelector('[data-field="end"]').value,breakStart:$.querySelector('[data-field="breakStart"]').value,breakEnd:$.querySelector('[data-field="breakEnd"]').value}});const c=Array.from(r.querySelectorAll('input[name="accessibleIn"]:checked')).map($=>$.value),u=c.length>0?c:[g.establishmentId],p=r.querySelector("#profStatusToggle").checked,b=r.querySelector("#profCommissionToggle").checked,f=r.querySelector("#profShowOnAgendaToggle").checked,h={...z.tempProf,id:r.querySelector("#professionalId").value||void 0,accessibleIn:u,name:r.querySelector("#profName").value.trim(),specialty:r.querySelector("#profSpecialty").value,photo:r.querySelector("#profPhotoBase64").value,services:d,workingHours:l,phone:r.querySelector("#profPhone").value,dob:`${r.querySelector("#profDobDay").value}/${r.querySelector("#profDobMonth").value}`,receivesCommission:b,showOnAgenda:f,orderOnAgenda:parseInt(r.querySelector("#profOrderOnAgenda").value)||1,notes:r.querySelector("#profNotes").value,status:p?"active":"inactive",establishmentId:g.establishmentId},y=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{h.id?(await Ui(h.id,h),ae(g.establishmentId,Qt(),"Equipe","Editou",`Editou o profissional: ${h.name}`),m("Sucesso!","Dados atualizados.","success")):(delete h.id,await Vi(h),ae(g.establishmentId,Qt(),"Equipe","Criou",`Cadastrou o profissional: ${h.name}`),m("Sucesso!","Novo membro adicionado à equipe.","success")),$a(),ea()}catch($){m("Erro",$.message,"error"),i.disabled=!1,i.innerHTML=y}break}case"delete-blockage":{const r=s.dataset.id;if(await Y("Apagar Bloqueio","O profissional voltará a ficar disponível na agenda neste dia. Confirma?"))try{await ds(r),m("Bloqueio removido.","success");const i=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";ht(z.tempProf.id,i)}catch(i){m("Erro",i.message,"error")}break}case"batch-delete-blockage":{const r=JSON.parse(s.dataset.ids);if(await Y("Apagar em Lote",`Tem certeza que deseja apagar ${r.length} dias de bloqueio de uma vez?`))try{await Io(r),m("Bloqueios removidos.","success");const i=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";ht(z.tempProf.id,i)}catch(i){m("Erro",i.message,"error")}break}}},document.body.addEventListener("click",jt),Nt=t=>{t.target.id==="searchInput"&&(z.searchQuery=t.target.value,Ve())},Va.addEventListener("input",Nt)}function Zl(){Y("Excluir em Lote",`Tem certeza que deseja excluir ${z.selectedIds.size} profissionais da rede? Esta ação não pode ser desfeita.`).then(async t=>{if(t)try{await Wi(Array.from(z.selectedIds)),ae(g.establishmentId,Qt(),"Equipe","Excluiu em Lote",`Excluiu ${z.selectedIds.size} profissionais`),m("Sucesso!",`${z.selectedIds.size} profissionais foram excluídos.`,"success"),z.selectedIds.clear(),lr(),ea()}catch(e){m("Erro",`Não foi possível excluir em lote: ${e.message}`,"error")}})}let k={clients:[],selectedClient:null,activeTab:"profile",establishments:[],filterEstablishmentIds:new Set,filters:{search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1,status:"all"},sortConfig:{key:"name",direction:"asc"},selectedIds:new Set,loading:!1,historyLimit:20,historySearchTerm:"",historyLoading:!1,historyData:{appointments:[],sales:[],loyaltyLog:[]},modalOpen:!1},ta=null,Rt=null;const cr=t=>t?String(t).replace(/\D/g,""):"",Ua=t=>{if(!t)return"Nunca";let e;if(typeof t=="object"&&(t.seconds||t._seconds)){const a=t.seconds||t._seconds;e=new Date(a*1e3)}else e=new Date(t);return isNaN(e.getTime())?"Data Inválida":e.toLocaleDateString("pt-BR")},Wa=t=>{if(!t)return"CL";const e=t.trim().split(" ");return e.length>=2?(e[0][0]+e[e.length-1][0]).toUpperCase():t.substring(0,2).toUpperCase()};async function ed(){ta=document.getElementById("content"),k.selectedClient=null,k.historyLimit=20,k.modalOpen=!1,k.selectedIds.clear(),k.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1,status:"all"},k.sortConfig={key:"name",direction:"asc"};try{const e=(await xe().catch(()=>({matrizes:[]}))).matrizes||[];k.establishments=[],e.forEach(a=>{k.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>k.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),k.filterEstablishmentIds.size===0&&k.filterEstablishmentIds.add(g.establishmentId)}catch(t){console.error("Erro ao buscar hierarquia",t)}td(),sd(),await ws()}function td(){const t=k.establishments.map(e=>`
        <label class="inline-flex items-center gap-2 px-3 py-1.5 bg-white border ${k.filterEstablishmentIds.has(e.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-gray-200 text-gray-600"} rounded-lg cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" value="${e.id}" ${k.filterEstablishmentIds.has(e.id)?"checked":""}>
            <span class="text-xs font-bold whitespace-nowrap">${e.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${e.name}</span>
        </label>
    `).join("");ta.innerHTML=`
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

            ${k.establishments.length>1?`
            <div class="mb-3 animate-fade-in">
                <div class="flex flex-wrap gap-2" id="establishment-filters-container">
                    ${t}
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
    `}function ad(){const t=document.getElementById("table-header-container");if(!t)return;const e=a=>k.sortConfig.key!==a?'<i class="bi bi-arrow-down-up ml-1 opacity-40 text-xs"></i>':k.sortConfig.direction==="asc"?'<i class="bi bi-arrow-up ml-1 text-indigo-600"></i>':'<i class="bi bi-arrow-down ml-1 text-indigo-600"></i>';t.innerHTML=`
        <div class="hidden md:grid grid-cols-12 gap-2 px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest items-center bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <div class="col-span-4 pl-2 flex items-center gap-3">
                <input type="checkbox" id="select-all-toggle" class="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" ${k.selectedIds.size>0&&k.selectedIds.size===k.clients.length?"checked":""}>
                <div class="cursor-pointer flex items-center hover:text-indigo-700 transition-colors select-none" data-sort="name">
                    Cliente ${e("name")}
                </div>
            </div>
            <div class="col-span-3 cursor-pointer flex items-center hover:text-indigo-700 transition-colors select-none" data-sort="contact">
                Contato ${e("contact")}
            </div>
            <div class="col-span-2 text-center cursor-pointer flex items-center justify-center hover:text-indigo-700 transition-colors select-none" data-sort="lastVisit">
                Última Visita ${e("lastVisit")}
            </div>
            <div class="col-span-2 text-center cursor-pointer flex items-center justify-center hover:text-indigo-700 transition-colors select-none" data-sort="financial">
                Situação ${e("financial")}
            </div>
            <div class="col-span-1 text-center">Ações</div>
        </div>
    `}async function ws(){k.loading=!0;const t=document.getElementById("list-container");t&&(t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-xs">Carregando clientes...</p></div>');try{const a=Array.from(k.filterEstablishmentIds).map(i=>{let n=`/api/clients/${i}?limit=1000`;return L(n).catch(()=>[])}),o=(await Promise.all(a)).flat(),r=new Map;o.forEach(i=>r.set(i.id,i)),k.clients=Array.from(r.values()),ks(),he()}catch(e){console.error(e),m("Erro","Falha ao carregar clientes.","error"),t&&(t.innerHTML='<div class="text-center py-10 text-red-500 text-sm">Erro ao carregar dados.</div>')}finally{k.loading=!1}}function ks(){const t=new Date().getMonth()+1,e=new Date().getFullYear();let a=0,s=0,o=0;k.clients.forEach(r=>{if(r.totalDebt&&parseFloat(r.totalDebt)>0&&s++,r.dobMonth==t&&o++,r.createdAt){const i=new Date(r.createdAt);i.getMonth()+1===t&&i.getFullYear()===e&&a++}}),document.getElementById("kpi-total").textContent=k.clients.length,document.getElementById("kpi-novos").textContent=a,document.getElementById("kpi-devendo").textContent=s,document.getElementById("kpi-niver").textContent=o}function he(){ad();const t=document.getElementById("list-container");let e=k.clients;if(k.filters.search){const a=k.filters.search.toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(a)||s.phone&&s.phone.includes(a)||s.cpf&&s.cpf.includes(a))}if(k.filters.status==="devendo")e=e.filter(a=>a.totalDebt&&parseFloat(a.totalDebt)>0);else if(k.filters.status==="aniversariantes"){const a=new Date().getMonth()+1;e=e.filter(s=>s.dobMonth==a)}else if(k.filters.status==="novos"){const a=new Date().getMonth()+1,s=new Date().getFullYear();e=e.filter(o=>{if(!o.createdAt)return!1;const r=new Date(o.createdAt);return r.getMonth()+1===a&&r.getFullYear()===s})}if(k.filters.hasLoyalty&&(e=e.filter(a=>a.loyaltyPoints&&a.loyaltyPoints>0)),k.filters.inactiveDays){const a=parseInt(k.filters.inactiveDays),s=new Date;s.setDate(s.getDate()-a),e=e.filter(o=>{if(!o.lastVisit&&!o.createdAt)return!1;let r;if(o.lastVisit){const i=o.lastVisit.seconds||o.lastVisit._seconds;r=i?new Date(i*1e3):new Date(o.lastVisit)}else r=new Date(o.createdAt);return r<s})}if(e.sort((a,s)=>{let o,r;switch(k.sortConfig.key){case"name":return o=(a.name||"").toLowerCase(),r=(s.name||"").toLowerCase(),k.sortConfig.direction==="asc"?o.localeCompare(r):r.localeCompare(o);case"contact":return o=a.phone||"",r=s.phone||"",k.sortConfig.direction==="asc"?o.localeCompare(r):r.localeCompare(o);case"lastVisit":o=a.lastVisit?a.lastVisit.seconds?a.lastVisit.seconds:new Date(a.lastVisit).getTime()/1e3:a.createdAt?new Date(a.createdAt).getTime()/1e3:0,r=s.lastVisit?s.lastVisit.seconds?s.lastVisit.seconds:new Date(s.lastVisit).getTime()/1e3:s.createdAt?new Date(s.createdAt).getTime()/1e3:0;break;case"financial":o=parseFloat(a.totalDebt)||0,r=parseFloat(s.totalDebt)||0;break;default:o=a.name,r=s.name}return o<r?k.sortConfig.direction==="asc"?-1:1:o>r?k.sortConfig.direction==="asc"?1:-1:0}),e.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-people text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum cliente encontrado</h3>
                <p class="text-[10px] text-gray-400 max-w-xs text-center">Tente ajustar a busca ou os filtros ativos.</p>
            </div>`;return}t.innerHTML=e.map(a=>{const s=a.totalDebt&&parseFloat(a.totalDebt)>0,o=Ua(a.lastVisit),r=cr(a.phone),i=new Date().getMonth()+1,n=a.dobMonth==i,d=k.selectedIds.has(a.id);let l="";return n&&(l+='<span class="bg-indigo-50 text-indigo-600 text-[8px] font-bold px-1.5 py-0.5 rounded border border-indigo-100 uppercase tracking-wider">🎂 Niver</span> '),a.loyaltyPoints>0&&(l+=`<span class="bg-amber-50 text-amber-600 text-[8px] font-bold px-1.5 py-0.5 rounded border border-amber-100 uppercase tracking-wider"><i class="bi bi-star-fill"></i> ${a.loyaltyPoints} pts</span> `),`
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
                        <p class="font-bold text-xs text-gray-800 truncate max-w-[180px]">${v(a.name)}</p>
                        <p class="text-[9px] text-gray-500 font-medium">${v(a.phone||"Sem contato")}</p>
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
                    <p class="font-bold text-xs text-gray-800 truncate" title="${v(a.name)}">${v(a.name)}</p>
                    <div class="flex gap-1 mt-0.5">${l}</div>
                </div>
            </div>

            <div class="hidden md:block md:col-span-3">
                <p class="text-[10px] font-bold text-gray-700">${v(a.phone||"--")}</p>
                <p class="text-[9px] text-gray-400 truncate w-full" title="${v(a.email||"")}">${v(a.email||"--")}</p>
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
        `}).join("")}function sd(){Rt&&ta.removeEventListener("click",Rt),Rt=r=>{const i=r.target;if(i.classList.contains("item-checkbox")){const c=i.value;i.checked?k.selectedIds.add(c):k.selectedIds.delete(c),Gt(),r.stopPropagation();return}if(i.id==="select-all-toggle"){const c=i.checked,u=document.querySelectorAll(".item-checkbox");k.selectedIds.clear(),u.forEach(p=>{p.checked=c,c&&k.selectedIds.add(p.value)}),Gt(),r.stopPropagation();return}const n=i.closest("[data-sort]");if(n){const c=n.dataset.sort;k.sortConfig.key===c?k.sortConfig.direction=k.sortConfig.direction==="asc"?"desc":"asc":(k.sortConfig.key=c,k.sortConfig.direction="asc"),he();return}const d=i.closest("[data-action]");if(d){const c=d.dataset.action,u=d.dataset.id;if(c==="new-client"){Ja(null);return}if(c==="open-modal"){Ja(u);return}if(c==="whatsapp"){r.stopPropagation();const p=d.dataset.phone;window.open(`https://wa.me/55${p}`,"_blank");return}if(c==="export-excel"){bd();return}}const l=i.closest("[data-filter]");l&&(document.querySelectorAll("[data-filter]").forEach(c=>c.classList.remove("ring-2","ring-offset-1","ring-indigo-400","border-indigo-300")),l.classList.add("ring-2","ring-offset-1","ring-indigo-400","border-indigo-300"),k.filters.status=l.dataset.filter,he())},ta.addEventListener("click",Rt);const t=document.getElementById("cancel-selection-btn");t&&t.addEventListener("click",()=>{k.selectedIds.clear();const r=document.getElementById("select-all-toggle");r&&(r.checked=!1),document.querySelectorAll(".item-checkbox").forEach(i=>i.checked=!1),Gt()});const e=document.getElementById("batch-delete-btn");e&&e.addEventListener("click",od),document.querySelectorAll(".est-filter-checkbox").forEach(r=>{r.addEventListener("change",i=>{const n=i.target.closest("label");i.target.checked?(k.filterEstablishmentIds.add(i.target.value),n.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),n.classList.remove("border-gray-200","text-gray-600")):(k.filterEstablishmentIds.delete(i.target.value),n.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),n.classList.add("border-gray-200","text-gray-600")),ws()})});const a=document.getElementById("search-input");a&&a.addEventListener("input",r=>{k.filters.search=r.target.value,he()});const s=document.getElementById("filter-inactive");s&&s.addEventListener("input",r=>{k.filters.inactiveDays=r.target.value,he()});const o=document.getElementById("filter-loyalty");o&&o.addEventListener("change",r=>{k.filters.hasLoyalty=r.target.checked,he()})}function Gt(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count");if(!t||!e)return;const a=k.selectedIds.size;e.textContent=a,a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex"))}async function od(){const t=k.selectedIds.size;if(!(t===0||!await Y("Excluir Clientes",`Deseja realmente excluir permanentemente ${t} cliente(s)? Esta ação não pode ser desfeita.`)))try{const a=Array.from(k.selectedIds).map(o=>$o(o));await Promise.all(a),m("Sucesso",`${t} cliente(s) excluído(s) com sucesso.`,"success"),k.selectedIds.clear(),Gt();const s=document.getElementById("select-all-toggle");s&&(s.checked=!1),await ws()}catch{m("Erro ao Excluir","Ocorreu um erro ao excluir alguns clientes.","error")}}function Ja(t=null){t?(k.selectedClient=k.clients.find(s=>s.id===t),k.selectedClient.isNew=!1):k.selectedClient={isNew:!0,id:"",name:"",phone:"",email:"",cpf:"",gender:"",dobDay:"",dobMonth:"",source:"",notes:"",loyaltyPoints:0,totalDebt:0},k.activeTab="profile",k.historyData={appointments:[],sales:[],loyaltyLog:[]};let e=document.getElementById("client-details-modal-overlay");e||(e=document.createElement("div"),e.id="client-details-modal-overlay",e.className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-gray-900/60 backdrop-blur-sm sm:p-4 animate-fade-in",e.innerHTML='<div class="bg-gray-50 w-full sm:w-[90vw] h-[90vh] sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-slide-up sm:animate-scale-in rounded-t-2xl" id="client-modal-content"></div>',e.onclick=s=>{s.target===e&&vt()},document.body.appendChild(e),document.body.classList.add("overflow-hidden"));const a=e.querySelector("#client-modal-content");a.innerHTML=et(k.selectedClient),tt(a,k.selectedClient)}function vt(){const t=document.getElementById("client-details-modal-overlay");t&&t.remove(),document.body.classList.remove("overflow-hidden"),k.modalOpen=!1,k.selectedClient=null,he()}function et(t){const e=t.isNew,a=`
        <div class="bg-white border-b border-gray-200 sticky top-0 z-10 w-full flex overflow-x-auto custom-scrollbar gap-2 px-4 sm:px-6 py-2.5">
            <button class="tab-btn ${k.activeTab==="profile"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"} border px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="profile">👤 Perfil e Dados</button>
            ${e?"":`
            <button class="tab-btn ${k.activeTab==="appointments"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"} border px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="appointments">📅 Agendamentos</button>
            <button class="tab-btn ${k.activeTab==="history"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"} border px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="history">💰 Finanças</button>
            <button class="tab-btn ${k.activeTab==="loyalty"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"} border px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="loyalty">⭐ Fidelidade</button>
            `}
        </div>
    `;let s="";return k.activeTab==="profile"?s=rd(t):k.activeTab==="appointments"?s=id():k.activeTab==="history"?s=nd():k.activeTab==="loyalty"&&(s=ld(t)),`
        <div class="w-full bg-gray-50 min-h-full flex flex-col overflow-hidden">
            <div class="bg-indigo-600 px-4 py-4 sm:px-6 sm:py-5 text-white relative flex-shrink-0 w-full shadow-md z-20">
                <button id="btn-close-modal" class="absolute top-4 right-4 text-indigo-200 hover:text-white transition z-50">
                    <i class="bi bi-x-lg text-xl sm:text-2xl"></i>
                </button>

                <div class="flex items-center gap-4 sm:gap-5">
                    <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-indigo-600 flex items-center justify-center text-2xl font-black shadow-lg flex-shrink-0">
                        ${e?'<i class="bi bi-person-plus-fill"></i>':Wa(t.name)}
                    </div>
                    <div class="flex-grow min-w-0 pr-8">
                        <h2 class="text-lg sm:text-xl font-black leading-tight truncate">${e?"Novo Cliente":v(t.name)}</h2>
                        <p class="text-xs text-indigo-200 mt-0.5 truncate">
                            ${e?"Preencha as informações do novo registo":`<i class="bi bi-whatsapp mr-1"></i>${t.phone||"Sem telefone"}`}
                        </p>
                        ${!e&&t.totalDebt&&t.totalDebt>0?`<span class="inline-block mt-1.5 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-red-400 shadow-sm">Dívida: R$ ${parseFloat(t.totalDebt).toFixed(2)}</span>`:""}
                    </div>
                </div>
            </div>
            
            ${a}
            
            <div class="p-4 sm:p-5 flex-grow overflow-y-auto custom-scrollbar relative bg-gray-50 w-full">
                ${k.historyLoading?'<div class="absolute inset-0 bg-white/80 flex items-center justify-center z-20"><div class="loader"></div></div>':""}
                <div class="animate-fade-in w-full pb-10">${s}</div>
            </div>
        </div>
    `}function rd(t){return`
        <form id="form-edit-client" class="space-y-4">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
                    <h3 class="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3 border-b border-gray-100 pb-2"><i class="bi bi-person-vcard text-indigo-500 mr-2"></i> Dados Pessoais</h3>
                    
                    <div>
                        <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Nome Completo *</label>
                        <input type="text" name="name" value="${v(t.name)}" required class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow">
                    </div>
                    
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">WhatsApp *</label>
                            <input type="tel" name="phone" value="${v(t.phone||"")}" required class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow">
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">CPF</label>
                            <input type="text" name="cpf" value="${v(t.cpf||"")}" placeholder="000.000.000-00" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow">
                        </div>
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">E-mail</label>
                        <input type="email" name="email" value="${v(t.email||"")}" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow">
                    </div>
                </div>

                <div class="space-y-4">
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <h3 class="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3 border-b border-gray-100 pb-2"><i class="bi bi-info-circle text-indigo-500 mr-2"></i> Adicionais</h3>
                        
                        <div class="grid grid-cols-2 gap-3 mb-3">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Dia Nasc.</label>
                                <input type="number" name="dobDay" min="1" max="31" value="${t.dobDay||""}" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 text-center transition-shadow">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Mês Nasc.</label>
                                <input type="number" name="dobMonth" min="1" max="12" value="${t.dobMonth||""}" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 text-center transition-shadow">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Gênero</label>
                                <select name="gender" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow">
                                    <option value="">Não informar</option>
                                    <option value="F" ${t.gender==="F"?"selected":""}>Feminino</option>
                                    <option value="M" ${t.gender==="M"?"selected":""}>Masculino</option>
                                    <option value="O" ${t.gender==="O"?"selected":""}>Outro</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Captação</label>
                                <select name="source" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow">
                                    <option value="">Como conheceu?</option>
                                    <option value="Instagram" ${t.source==="Instagram"?"selected":""}>Instagram</option>
                                    <option value="Indicacao" ${t.source==="Indicacao"?"selected":""}>Indicação</option>
                                    <option value="Passagem" ${t.source==="Passagem"?"selected":""}>Fachada</option>
                                    <option value="Google" ${t.source==="Google"?"selected":""}>Google</option>
                                    <option value="Outros" ${t.source==="Outros"?"selected":""}>Outros</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <h3 class="text-xs font-bold text-gray-800 uppercase tracking-wide mb-2 border-b border-gray-100 pb-2"><i class="bi bi-journal-text text-indigo-500 mr-2"></i> Anotações Internas</h3>
                        <textarea name="notes" rows="2" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow resize-none" placeholder="Histórico de alergias, preferências...">${v(t.notes||"")}</textarea>
                    </div>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row justify-end gap-3 pt-3 border-t border-gray-200 mt-2">
                <button type="submit" class="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold shadow hover:bg-indigo-700 transition flex items-center justify-center gap-2 text-xs">
                    <i class="bi bi-check2-circle text-sm"></i> ${t.isNew?"Cadastrar Cliente":"Salvar Alterações"}
                </button>
            </div>
        </form>
    `}function id(t){let e=k.historyData.appointments||[];return e.sort((a,s)=>new Date(s.startTime)-new Date(a.startTime)),`
        <div class="space-y-2">
            ${e.length?e.map(a=>{const s=new Date(a.startTime);let r=s<new Date?'<span class="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border border-gray-200">Concluído</span>':'<span class="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border border-emerald-200">Agendado</span>';return a.status==="cancelled"&&(r='<span class="bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border border-red-200">Cancelado</span>'),`
                <div class="bg-white border border-gray-200 rounded-xl p-3 flex gap-3 shadow-sm items-center cursor-pointer hover:bg-gray-50 transition-colors" data-go-agenda="true" data-id="${a.id}" data-date="${a.startTime}">
                    <div class="flex-shrink-0 text-center w-10 border-r border-gray-100 pr-2">
                        <span class="block text-[8px] font-bold text-gray-400 uppercase">${s.toLocaleDateString("pt-BR",{month:"short"})}</span>
                        <span class="block text-base font-black text-gray-800 leading-none mt-0.5">${s.getDate()}</span>
                    </div>
                    <div class="flex-grow min-w-0">
                        <p class="font-bold text-xs text-gray-800 truncate">${v(a.serviceName||"Serviço")}</p>
                        <p class="text-[9px] text-gray-500 truncate mt-0.5"><i class="bi bi-person mr-1"></i>${v(a.professionalName||"N/A")} <span class="mx-1">•</span> <i class="bi bi-clock mr-1"></i>${s.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</p>
                    </div>
                    <div class="flex-shrink-0 text-right">
                        ${r}
                    </div>
                </div>`}).join(""):'<div class="text-center py-10 bg-white rounded-xl border border-gray-200"><p class="text-[10px] text-gray-400 font-medium">Nenhum agendamento encontrado.</p></div>'}
        </div>
    `}function nd(t){let e=k.historyData.sales||[];e.sort((o,r)=>new Date(r.date)-new Date(o.date));const a=e.reduce((o,r)=>o+(Number(r.totalAmount)||0),0),s=e.length>0?a/e.length:0;return`
        <div class="space-y-4">
            <div class="grid grid-cols-2 gap-3 mb-2">
                <div class="bg-emerald-50 p-3 rounded-xl border border-emerald-100 shadow-sm flex flex-col text-center">
                    <span class="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">LTV (V. Vitalício)</span>
                    <span class="text-lg font-black text-emerald-700 mt-0.5">${va(a)}</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col text-center">
                    <span class="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Ticket Médio</span>
                    <span class="text-lg font-black text-gray-800 mt-0.5">${va(s)}</span>
                </div>
            </div>

            <div class="space-y-2">
                <h4 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 pl-1">Histórico de Vendas</h4>
                ${e.length?e.map(o=>`
                <div class="bg-white border border-gray-200 rounded-xl p-3 flex justify-between items-center shadow-sm hover:bg-gray-50 cursor-pointer transition-colors" data-go-comanda="true" data-id="${o.id}">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 text-xs"><i class="bi bi-receipt"></i></div>
                        <div>
                            <p class="font-bold text-gray-800 text-[10px] sm:text-xs">Venda #${o.id.slice(-5).toUpperCase()}</p>
                            <p class="text-[9px] text-gray-400 mt-0.5">${new Date(o.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-black text-emerald-600 text-xs">${va(o.totalAmount)}</p>
                        <p class="text-[8px] text-indigo-500 font-bold uppercase mt-0.5 hover:underline">Ver Comanda <i class="bi bi-chevron-right"></i></p>
                    </div>
                </div>`).join(""):'<div class="text-center py-8 bg-white rounded-xl border border-gray-200"><p class="text-[10px] text-gray-400">Nenhum histórico financeiro.</p></div>'}
            </div>
        </div>
    `}function ld(t){const e=k.historyData.loyaltyLog||[];return e.sort((a,s)=>new Date(s.date)-new Date(a.date)),`
        <div class="space-y-4">
            <div class="bg-amber-400 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col items-center justify-center text-center">
                <div class="absolute right-[-20px] top-[-20px] opacity-20"><i class="bi bi-star-fill text-9xl"></i></div>
                <p class="text-amber-100 font-bold uppercase tracking-wider text-[10px] mb-1 z-10">Saldo de Pontos</p>
                <h1 class="text-5xl font-black z-10 drop-shadow-md">${t.loyaltyPoints||0}</h1>
                
                <button id="btn-manual-redeem" type="button" class="mt-4 bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-lg backdrop-blur-sm transition border border-white/30 flex items-center gap-2 z-10 shadow-sm">
                    <i class="bi bi-sliders"></i> Ajuste Manual
                </button>
            </div>

            <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div class="bg-gray-50 p-2.5 border-b border-gray-200"><h4 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Extrato de Pontos</h4></div>
                <div class="p-2 space-y-1 max-h-64 overflow-y-auto custom-scrollbar">
                    ${e.length>0?e.map(a=>{const s=a.type==="redemption";return`
                        <div class="flex justify-between items-center py-2 px-3 border-b border-gray-100 last:border-0">
                            <div>
                                <p class="text-[10px] font-bold text-gray-800">${v(a.description||(s?"Resgate":"Acúmulo"))}</p>
                                <p class="text-[9px] text-gray-400 mt-0.5">${new Date(a.date).toLocaleDateString()}</p>
                            </div>
                            <span class="font-black text-xs ${s?"text-red-500":"text-amber-500"}">
                                ${s?"-":"+"}${a.points}
                            </span>
                        </div>`}).join(""):'<p class="text-center text-gray-400 py-6 text-[10px]">Sem movimentações.</p>'}
                </div>
            </div>
        </div>
    `}function tt(t,e){if(t.querySelectorAll(".tab-btn").forEach(s=>{s.onclick=async()=>{const o=s.dataset.tab;if(k.activeTab===o)return;k.activeTab=o;const r=document.getElementById("client-modal-content");r&&(r.innerHTML=et(e),tt(r,e)),o!=="profile"&&!k.historyLoading&&k.historyData.appointments.length===0&&await dd(e.id)}}),k.activeTab==="profile"){const s=t.querySelector("#form-edit-client");s&&(s.onsubmit=cd);const o=t.querySelector("#btn-delete-client");o&&(o.onclick=ud)}if(k.activeTab==="loyalty"){const s=t.querySelector("#btn-manual-redeem");s&&(s.onclick=()=>pd(e))}t.querySelectorAll("[data-go-agenda]").forEach(s=>{s.onclick=()=>{vt(),ee("agenda-section",{targetDate:new Date(s.dataset.date),scrollToAppointmentId:s.dataset.id})}}),t.querySelectorAll("[data-go-comanda]").forEach(s=>{s.onclick=()=>{vt(),ee("comandas-section",{selectedAppointmentId:s.dataset.id,initialFilter:"finalizadas"})}});const a=t.querySelector("#btn-close-modal");a&&(a.onclick=vt)}async function dd(t){const e=k.selectedClient;if(!e||!e.phone)return;k.historyLoading=!0;const a=document.getElementById("client-modal-content");a&&(a.innerHTML=et(e),tt(a,e));try{const s=new Date;s.setMonth(s.getMonth()+12);const o=new Date;o.setFullYear(o.getFullYear()-5);let r=`/api/appointments/${g.establishmentId}?startDate=${o.toISOString()}&endDate=${s.toISOString()}&clientPhone=${encodeURIComponent(cr(e.phone))}&limit=50`;const i=await L(r);k.historyData.appointments=i,k.historyData.sales=i.filter(d=>d.status==="completed").map(d=>({id:d.id,date:d.startTime,totalAmount:d.totalAmount||0,items:d.comandaItems||d.services||[]}));const n=[];i.forEach(d=>{d.status==="completed"&&d.loyaltyPointsEarned>0&&n.push({type:"earn",points:d.loyaltyPointsEarned,date:d.startTime,description:"Venda finalizada"}),d.loyaltyRedemption&&n.push({type:"redemption",points:d.loyaltyRedemption.cost||0,date:d.startTime,description:`Resgate: ${d.loyaltyRedemption.name}`})}),k.historyData.loyaltyLog=n}catch(s){console.error("Erro histórico",s)}finally{k.historyLoading=!1;const s=document.getElementById("client-modal-content");s&&k.selectedClient&&(s.innerHTML=et(k.selectedClient),tt(s,k.selectedClient))}}async function cd(t){t.preventDefault();const e=new FormData(t.target),a=Object.fromEntries(e.entries());a.establishmentId=g.establishmentId,a.dobDay&&(a.dobDay=parseInt(a.dobDay)),a.dobMonth&&(a.dobMonth=parseInt(a.dobMonth));try{if(k.selectedClient.isNew){const s=await wo(a);k.clients.unshift(s),m("Sucesso","Cliente cadastrado com sucesso!","success"),k.selectedClient=s,Ja(s.id)}else{await ko(k.selectedClient.id,a),Object.assign(k.selectedClient,a);const s=k.clients.findIndex(r=>r.id===k.selectedClient.id);s!==-1&&(k.clients[s]=k.selectedClient),m("Sucesso","Dados salvos com sucesso!","success");const o=document.getElementById("client-modal-content");o&&(o.innerHTML=et(k.selectedClient),tt(o,k.selectedClient))}ks(),he()}catch(s){m("Erro",s.message,"error")}}async function ud(){if(await Y("Excluir Cliente","Tem certeza? O histórico será apagado e não pode ser desfeito."))try{await $o(k.selectedClient.id),k.clients=k.clients.filter(t=>t.id!==k.selectedClient.id),k.selectedClient=null,m("Sucesso","Cliente removido com sucesso.","success"),vt(),ks(),he()}catch(t){m("Erro",t.message,"error")}}function pd(t){const e=t.loyaltyPoints||0,a=`
        <div class="text-center mb-4">
            <p class="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Saldo Atual</p>
            <h2 class="text-3xl font-black text-amber-500">${e}</h2>
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
    `,{modalElement:s,close:o}=Ie({title:"Ajuste de Pontos",contentHTML:a,maxWidth:"w-[90%] max-w-xs"});s.querySelector("form").onsubmit=async r=>{r.preventDefault();const i=document.getElementById("redeem-action").value,n=parseInt(document.getElementById("redeem-points").value,10),d=document.getElementById("redeem-reason").value;if(!n||n<=0)return m("Erro","Qtd inválida.","error");if(i==="debit"&&n>e)return m("Erro","Saldo insuficiente.","error");try{let l=e;i==="debit"?(await qi(g.establishmentId,t.phone,n,d),l-=n):(l+=n,await ko(t.id,{loyaltyPoints:l})),k.selectedClient.loyaltyPoints=l,k.historyData.loyaltyLog.unshift({type:i==="debit"?"redemption":"earn",points:n,date:new Date().toISOString(),description:d+" (Manual)"}),m("Sucesso","Saldo atualizado.","success"),o();const c=document.getElementById("client-modal-content");c&&k.selectedClient&&(c.innerHTML=et(k.selectedClient),tt(c,k.selectedClient)),he()}catch(l){m("Erro",l.message,"error")}}}function bd(){if(typeof XLSX>"u")return m("Erro","Biblioteca de exportação não carregada.","error");if(k.clients.length===0)return m("Aviso","Nenhum cliente para exportar.","info");const t=k.clients.map(e=>({Nome:e.name,Telefone:e.phone||"","E-mail":e.email||"",CPF:e.cpf||"",Gênero:e.gender==="M"?"Masculino":e.gender==="F"?"Feminino":e.gender==="O"?"Outro":"",Aniversário:e.dobDay&&e.dobMonth?`${e.dobDay}/${e.dobMonth}`:"",Origem:e.source||"",Cadastro:Ua(e.createdAt),"Última Visita":Ua(e.lastVisit),"Pontos Fidelidade":e.loyaltyPoints||0,"Débito/Fiado (R$)":e.totalDebt||0,Anotações:e.notes||""}));try{const e=XLSX.utils.json_to_sheet(t),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,e,"Clientes"),XLSX.writeFile(a,`KAIROS_Clientes_${new Date().toISOString().split("T")[0]}.xlsx`)}catch{m("Erro","Falha ao gerar o ficheiro.","error")}}const qe=document.getElementById("content"),Sa={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},oe=[{id:"clean-modern",name:"Clean Moderno",bg:"#f8fafc",text:"#4b5563",titleColor:"#0f172a",primary:"#2563eb",font:"Inter",btn:"rounded",cardBg:"#ffffff",cardBorder:"#e2e8f0"},{id:"dark-premium",name:"Dark Premium",bg:"#0f172a",text:"#9ca3af",titleColor:"#f8fafc",primary:"#f59e0b",font:"'Playfair Display'",btn:"square",cardBg:"#1e293b",cardBorder:"#334155"},{id:"spa-zen",name:"Spa & Wellness",bg:"#f0fdf4",text:"#166534",titleColor:"#064e3b",primary:"#10b981",font:"Poppins",btn:"pill",cardBg:"#ffffff",cardBorder:"#d1fae5"},{id:"neo-brutalism",name:"Neobrutalismo",bg:"#ffffff",text:"#000000",titleColor:"#000000",primary:"#ef4444",font:"Inter",btn:"square",cardBg:"#ffffff",cardBorder:"#000000"},{id:"tech-cyan",name:"Tech Night",bg:"#020617",text:"#94a3b8",titleColor:"#f1f5f9",primary:"#06b6d4",font:"Roboto",btn:"rounded",cardBg:"#0f172a",cardBorder:"#1e293b"},{id:"sunset-glam",name:"Sunset Glam",bg:"#fff7ed",text:"#831843",titleColor:"#4c0519",primary:"#f43f5e",font:"Poppins",btn:"pill",cardBg:"#ffffff",cardBorder:"#fce7f3"},{id:"luxury-mono",name:"Luxo Minimal",bg:"#fafafa",text:"#525252",titleColor:"#171717",primary:"#404040",font:"'Playfair Display'",btn:"square",cardBg:"#ffffff",cardBorder:"#e5e5e5"},{id:"deep-ocean",name:"Oceano Profundo",bg:"#172554",text:"#bfdbfe",titleColor:"#eff6ff",primary:"#3b82f6",font:"Montserrat",btn:"pill",cardBg:"#1e3a8a",cardBorder:"#1e40af"},{id:"rustic-vintage",name:"Rústico Vintage",bg:"#1c1917",text:"#a8a29e",titleColor:"#fafaf9",primary:"#ea580c",font:"Montserrat",btn:"rounded",cardBg:"#292524",cardBorder:"#44403c"},{id:"vibrant-purple",name:"Estúdio Criativo",bg:"#fdf4ff",text:"#701a75",titleColor:"#4a044e",primary:"#c026d3",font:"Inter",btn:"rounded",cardBg:"#ffffff",cardBorder:"#fae8ff"}];let K=null,te=null;function ur(){return[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais da Unidade"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"whatsapp-bot",icon:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",label:"Atendente Virtual (WhatsApp)"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}]}function _s(t,e,a){return new Promise((s,o)=>{const r=new FileReader;r.readAsDataURL(t),r.onload=i=>{const n=new Image;n.src=i.target.result,n.onload=()=>{const d=document.createElement("canvas");let l=n.width,c=n.height;l>e&&(c*=e/l,l=e),d.width=l,d.height=c,d.getContext("2d").drawImage(n,0,0,l,c);const p=t.type==="image/png"&&e<500?"image/png":"image/jpeg";s(d.toDataURL(p,a))},n.onerror=d=>o(d)},r.onerror=i=>o(i)})}function He(t,e=null){let a='<option value="">-- Selecione (Opcional) --</option>';const s=i=>{const n=new Map,d=[];return i&&(i.forEach(l=>n.set(l.id,{...l,children:[]})),n.forEach(l=>{l.parentId&&n.has(l.parentId)?n.get(l.parentId).children.push(l):d.push(l)})),d},o=(i,n="")=>{const d=i.id===e?"selected":"";a+=`<option value="${i.id}" ${d}>${n}${v(i.name)}</option>`,i.children.forEach(l=>o(l,n+"— "))};return s(t).forEach(i=>o(i)),a}async function dt(t,e){const a=e.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const s=[],{ownerName:o,...r}=t;if(o&&o!==g.userName){const n=ge.currentUser;n&&s.push(Dr(n,{displayName:o}).then(()=>{g.userName=o}))}const i={...K,...r};s.push(is(te,i)),await Promise.all(s),K=i,m("Sucesso","Definições salvas com sucesso!","success"),r.themeColor&&te===g.establishmentId&&setTimeout(()=>window.location.reload(),1500)}catch(s){m("Erro",`Não foi possível salvar: ${s.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function gd(t,e){const a=v(t.name||""),s=v(t.phone||""),o=v(t.cnpj||""),r=v(t.email||""),i=v(t.address||""),n=v(t.website||""),d=v(g.userName||"");e.innerHTML=`
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
    `,e.querySelector("#personal-data-form").addEventListener("submit",l=>{l.preventDefault();const c={ownerName:e.querySelector("#ownerName").value,name:e.querySelector("#establishmentName").value,phone:e.querySelector("#establishmentPhone").value,cnpj:e.querySelector("#establishmentCnpjCpf").value,email:e.querySelector("#establishmentEmail").value,address:e.querySelector("#establishmentAddress").value,website:e.querySelector("#establishmentWebsite").value};dt(c,l)})}function md(t,e){e.innerHTML=`
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
    `,e.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const s=e.querySelector("#newPassword").value,o=e.querySelector("#confirmPassword").value;if(s!==o){m("Erro","As senhas não coincidem.","error");return}const r=e.querySelector('button[form="change-password-form"]');r.disabled=!0,r.textContent="A Salvar...";try{const i=ge.currentUser;if(i)await Cr(i,s),m("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum utilizador logado encontrado.")}catch(i){m("Erro",`Não foi possível alterar a senha: ${i.message}`,"error")}finally{r.disabled=!1,r.textContent="Salvar Nova Senha"}})}function fd(t,e){e.innerHTML=`
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
    `,e.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const s=e.querySelector("#newEmail").value,o=e.querySelector("#currentPassword").value,r=e.querySelector('button[form="change-email-form"]');r.disabled=!0,r.textContent="A verificar...";try{const i=ge.currentUser,n=Er.credential(i.email,o);await Ir(i,n),await Lr(i,s),await li(te,s),m("Sucesso","Link de verificação enviado! Verifique o seu novo e-mail.","success"),a.target.reset()}catch(i){m("Erro",i.message,"error")}finally{r.disabled=!1,r.textContent="Salvar Novo E-mail"}})}function xd(t,e){const a=v(t.welcomeMessage||"Agende o seu horário de forma rápida e fácil."),s=t.socialLinks||{},o=v(s.instagram||""),r=v(s.facebook||""),i=v(s.whatsapp||"");let n=t.primaryColor||t.themeColor||oe[0].primary,d=t.backgroundColor||oe[0].bg,l=t.textColor||oe[0].text,c=t.titleColor||oe[0].titleColor,u=t.buttonStyle||oe[0].btn,p=t.typography||oe[0].font,b=t.templateId?oe.findIndex(Q=>Q.id===t.templateId):0;b===-1&&(b=0);const f=Q=>Q==="pill"?"9999px":Q==="square"?"0.25rem":"0.75rem";e.innerHTML=`
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
                        <input type="hidden" id="establishmentLogoBase64" value="${t.logo||""}">
                        <input type="hidden" id="establishmentBackgroundImageBase64" value="${t.backgroundImage||""}">
                        <input type="hidden" id="selectedTemplateId" value="${oe[b].id}">
                        
                        <div class="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
                            <h4 class="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-3 text-center">1. Escolha um Tema Base</h4>
                            <div class="flex items-center justify-center gap-4">
                                <button type="button" id="prevTemplate" class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm transition-colors cursor-pointer border border-indigo-200">
                                    <i class="bi bi-chevron-left text-lg"></i>
                                </button>
                                <div class="text-center min-w-[160px]">
                                    <span id="templateNameDisplay" class="text-lg font-bold text-indigo-950">${oe[b].name}</span>
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
                                        <img id="establishmentBgPreview" src="${t.backgroundImage||""}" class="w-full h-full object-cover ${t.backgroundImage?"":"hidden"}">
                                        <i class="bi bi-image text-3xl text-gray-300 ${t.backgroundImage?"hidden":""}" id="establishmentBgPlaceholder"></i>
                                    </div>
                                    <p class="text-xs font-semibold text-gray-700 pointer-events-none">Imagem de Capa (Fundo)</p>
                                </div>

                                <div class="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition relative group" id="triggerLogoUpload">
                                    <input type="file" id="establishmentLogoInput" class="hidden" accept="image/*">
                                    <div class="absolute inset-0 z-10 hidden group-hover:flex items-center justify-center bg-black bg-opacity-40 rounded-xl transition pointer-events-none">
                                        <span class="text-white font-semibold text-sm">Mudar Logo</span>
                                    </div>
                                    <div class="h-24 w-24 bg-gray-100 rounded-full mx-auto overflow-hidden mb-3 flex items-center justify-center border-4 border-white shadow-sm relative pointer-events-none">
                                        <img id="establishmentLogoPreview" src="${t.logo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Logo"}" class="w-full h-full object-contain bg-white">
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
                                --preview-btn-radius: ${f(u)};
                                --preview-card-bg: ${oe[b].cardBg};
                                --preview-card-border: ${oe[b].cardBorder};
                            ">
                                
                                <div class="relative h-36 w-full bg-gray-200 overflow-hidden">
                                    <img id="mockup-banner" src="${t.backgroundImage||""}" class="w-full h-full object-cover transition-opacity duration-300 ${t.backgroundImage?"":"hidden"}">
                                    <div id="mockup-banner-placeholder" class="w-full h-full flex items-center justify-center bg-gray-300 opacity-50 ${t.backgroundImage?"hidden":""}"></div>
                                    <div class="absolute inset-0 bg-gradient-to-t from-[var(--preview-bg)] to-transparent opacity-90"></div>
                                </div>

                                <div class="px-4 relative -mt-12 z-10 flex flex-col items-center text-center">
                                    
                                    <div class="w-24 h-24 bg-white rounded-full mx-auto border-[5px] shadow-sm overflow-hidden flex items-center justify-center transition-all duration-500" style="border-color: var(--preview-bg); background-color: var(--preview-bg);">
                                        <img id="mockup-logo" src="${t.logo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Logo"}" class="w-full h-full object-contain">
                                    </div>

                                    <div class="mt-2 w-full">
                                        <h1 class="text-xl font-bold truncate leading-tight" style="color: var(--preview-title-color);">${v(t.name||"Sua Empresa")}</h1>
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
    `;const h=e.querySelector("#mockup-screen-wrapper"),y=e.querySelector("#mockup-screen"),$=e.querySelector("#previewPrimaryColorInput"),A=e.querySelector("#previewBgColorInput"),R=e.querySelector("#previewTextColorInput"),C=e.querySelector("#previewTitleColorInput"),E=e.querySelector("#typographyInput"),D=e.querySelector("#establishmentWelcomeMessage"),P=e.querySelector("#mockup-welcome"),j=e.querySelector("#socialInstagram"),S=e.querySelector("#socialWhatsapp"),I=e.querySelector("#socialFacebook"),F=e.querySelector("#prevTemplate"),V=e.querySelector("#nextTemplate"),U=e.querySelector("#templateNameDisplay"),T=e.querySelector("#selectedTemplateId"),W=Q=>{const G=oe[Q];h.style.opacity="0.3",h.style.transform="scale(0.96)",setTimeout(()=>{$.value=G.primary,A.value=G.bg,R.value=G.text,C.value=G.titleColor||G.text,E.value=G.font,e.querySelectorAll('input[name="buttonStyle"]').forEach(be=>{be.checked=be.value===G.btn}),T.value=G.id,U.textContent=G.name,y.style.setProperty("--preview-primary",G.primary),y.style.setProperty("--preview-bg",G.bg),y.style.setProperty("--preview-text",G.text),y.style.setProperty("--preview-title-color",G.titleColor||G.text),y.style.setProperty("--preview-font",G.font),y.style.setProperty("--preview-btn-radius",f(G.btn)),y.style.setProperty("--preview-card-bg",G.cardBg),y.style.setProperty("--preview-card-border",G.cardBorder),h.style.opacity="1",h.style.transform="scale(1)"},300)};F.addEventListener("click",()=>{b=(b-1+oe.length)%oe.length,W(b)}),V.addEventListener("click",()=>{b=(b+1)%oe.length,W(b)}),$.addEventListener("input",Q=>y.style.setProperty("--preview-primary",Q.target.value)),A.addEventListener("input",Q=>y.style.setProperty("--preview-bg",Q.target.value)),R.addEventListener("input",Q=>y.style.setProperty("--preview-text",Q.target.value)),C.addEventListener("input",Q=>y.style.setProperty("--preview-title-color",Q.target.value)),E.addEventListener("change",Q=>y.style.setProperty("--preview-font",Q.target.value)),e.querySelectorAll('input[name="buttonStyle"]').forEach(Q=>{Q.addEventListener("change",G=>{G.target.checked&&y.style.setProperty("--preview-btn-radius",f(G.target.value))})}),D.addEventListener("input",Q=>P.textContent=Q.target.value||"Mensagem...");const ne=()=>{e.querySelector("#mockup-insta-icon").classList.toggle("hidden",!j.value.trim()),e.querySelector("#mockup-whats-icon").classList.toggle("hidden",!S.value.trim()),e.querySelector("#mockup-face-icon").classList.toggle("hidden",!I.value.trim())};[j,S,I].forEach(Q=>Q.addEventListener("input",ne));const ue=e.querySelector("#establishmentLogoInput"),xa=e.querySelector("#establishmentBgInput"),Dt=e.querySelector("#establishmentLogoBase64"),Ae=e.querySelector("#establishmentBackgroundImageBase64");e.querySelector("#triggerLogoUpload").addEventListener("click",Q=>{Q.target.id!=="establishmentLogoInput"&&ue.click()}),ue.onchange=async Q=>{const G=Q.target.files[0];if(G){const be=await _s(G,300,.9);e.querySelector("#establishmentLogoPreview").src=be,e.querySelector("#mockup-logo").src=be,Dt.value=be}},e.querySelector("#triggerBannerUpload").addEventListener("click",Q=>{Q.target.id!=="establishmentBgInput"&&xa.click()}),xa.onchange=async Q=>{const G=Q.target.files[0];if(G){const be=await _s(G,1280,.8);e.querySelector("#establishmentBgPreview").src=be,e.querySelector("#establishmentBgPreview").classList.remove("hidden"),e.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),Ae.value=be,e.querySelector("#mockup-banner").src=be,e.querySelector("#mockup-banner").classList.remove("hidden"),e.querySelector("#mockup-banner-placeholder").classList.add("hidden")}},e.querySelector("#branding-form").addEventListener("submit",Q=>{Q.preventDefault();let G="rounded";e.querySelectorAll('input[name="buttonStyle"]').forEach(Es=>{Es.checked&&(G=Es.value)});const be={logo:Dt.value,backgroundImage:Ae.value,welcomeMessage:D.value,templateId:T.value,primaryColor:$.value,backgroundColor:A.value,textColor:R.value,titleColor:C.value,typography:E.value,buttonStyle:G,socialLinks:{instagram:j.value.trim(),whatsapp:S.value.trim(),facebook:I.value.trim()}};dt(be,Q)})}function hd(t,e){const a=t.urlId||te;let s=window.location.origin;(s.includes("localhost")||s.includes("capacitor://")||s.includes("127.0.0.1"))&&(s="https://www.kairosagenda.com.br");const o=v(`${s}/agendar?id=${a}`),r=t.publicBookingEnabled||!1,i=r?"Agendamento Online ATIVO":"Agendamento Online INATIVO",n=r?"text-green-600":"text-red-600";e.innerHTML=`
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
    `,e.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const d=e.querySelector("#publicBookingLink");d.select(),document.execCommand("copy"),d.blur(),m("Sucesso","Link copiado!","success")}),e.querySelector("#publicBookingToggle").addEventListener("change",async d=>{const l=d.target.checked,c=e.querySelector("#publicBookingStatusText");c.textContent=l?"Agendamento Online ATIVO":"Agendamento Online INATIVO",c.className=l?"text-sm font-semibold text-green-600":"text-sm font-semibold text-red-600";try{d.target.disabled=!0,await ni(te,l),K.publicBookingEnabled=l,m("Sucesso",`Agendamento online ${l?"ativado":"desativado"}!`,"success")}catch(u){m("Erro",u.message,"error"),d.target.checked=!l}finally{d.target.disabled=!1}}),Sd(t.slotInterval||30,e),e.querySelector("#booking-form").addEventListener("submit",d=>{d.preventDefault();const l={slotInterval:parseInt(e.querySelector("#establishmentSlotInterval").value,10)};dt(l,d)})}function vd(t,e){e.innerHTML=`
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
    `;const a=e.querySelector("#establishmentTimezone");t.timezone&&(a.value=t.timezone);const s=e.querySelector("#establishmentWorkingHoursContainer"),o=t.workingHours||{};Object.keys(Sa).forEach(r=>{const i=o[r]||{},n=Sa[r],d=i.active!==!1,l=document.createElement("div");l.className=`day-schedule-card p-4 rounded-lg border ${d?"bg-gray-50 border-gray-200":"bg-gray-100 border-gray-100 disabled opacity-60"}`,l.innerHTML=`
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
            </div>`,s.appendChild(l)}),s.addEventListener("change",r=>{const i=r.target.closest('.day-schedule-card input[type="checkbox"]');if(i){const n=i.closest(".day-schedule-card");n.classList.toggle("disabled",!i.checked),n.classList.toggle("opacity-60",!i.checked),n.classList.toggle("bg-gray-50",i.checked),n.classList.toggle("bg-gray-100",!i.checked)}}),e.querySelector("#working-hours-form").addEventListener("submit",r=>{r.preventDefault();const i={};Object.keys(Sa).forEach(d=>{i[d]={active:e.querySelector(`#est-${d}-active`).checked,start:e.querySelector(`#est-${d}-start`).value,end:e.querySelector(`#est-${d}-end`).value,breakStart:e.querySelector(`#est-${d}-breakStart`).value,breakEnd:e.querySelector(`#est-${d}-breakEnd`).value}});const n=e.querySelector("#establishmentTimezone").value;dt({workingHours:i,timezone:n},r)})}function pr(t,e){const a=!!t.whatsappInstance;e.innerHTML=`
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
    `;let s=null;const o=e.querySelector("#btnGenerateQr"),r=e.querySelector("#btnCancelQr");o&&o.addEventListener("click",async()=>{o.disabled=!0,o.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gerando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const l=await(await fetch(`${n}/connect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:te})})).json();if(l.qrcode){e.querySelector("#whatsappStatusArea").classList.add("hidden"),e.querySelector("#qrCodeDisplayArea").classList.remove("hidden");const c=l.qrcode.includes("data:image")?l.qrcode:`data:image/png;base64,${l.qrcode}`;e.querySelector("#qrCodeImage").src=c,s=setInterval(async()=>{try{const p=await(await fetch(`${n}/status/${te}`)).json();p.connected&&(clearInterval(s),K.whatsappInstance=p.instanceName,e.querySelector("#qrCodeDisplayArea").classList.add("hidden"),e.querySelector("#connectedStatusArea").classList.remove("hidden"),m("Sucesso","WhatsApp conectado com sucesso!","success"))}catch(u){console.error("Erro ao verificar status do WhatsApp",u)}},5e3)}else m("Erro na API",l.error||"Erro desconhecido","error")}catch(d){console.error(d),m("Erro de Conexão","Não foi possível aceder ao servidor Kairós.","error")}finally{o.disabled=!1,o.innerHTML='<i class="bi bi-phone-vibrate"></i> Gerar QR Code'}}),r&&r.addEventListener("click",()=>{s&&clearInterval(s),e.querySelector("#qrCodeDisplayArea").classList.add("hidden"),e.querySelector("#whatsappStatusArea").classList.remove("hidden")});const i=e.querySelector("#btnDisconnectWhatsapp");i&&i.addEventListener("click",async()=>{if(!confirm("Tem certeza que deseja DESCONECTAR? O bot parará de responder imediatamente."))return;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Desconectando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const l=await(await fetch(`${n}/disconnect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:te})})).json();l.success?(m("Sucesso","WhatsApp desconectado!","success"),K.whatsappInstance=null,pr(K,e)):alert("Erro ao desconectar: "+l.error)}catch(d){console.error(d),m("Erro","Falha ao comunicar com o servidor.","error")}finally{i&&(i.disabled=!1,i.innerHTML='<i class="bi bi-power"></i> Desconectar')}})}async function yd(t,e){const a=t.loyaltyProgram||{},s=a.pointsPerVisit||1;let o=[],r=[],i=[];try{[o,r,i]=await Promise.all([nt(te),lt(te),gs(te)])}catch(l){console.error("Erro ao carregar dados para fidelidade:",l)}e.innerHTML=`
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
    `;const n=e.querySelector("#loyaltyTiersContainer"),d=(l={})=>{const c=document.createElement("div");c.className="loyalty-tier-row bg-white p-4 border border-gray-200 rounded-lg shadow-sm relative grid grid-cols-1 md:grid-cols-4 gap-4 items-end";const u=l.type||"money",p=l.itemId||"",b=l.reward||"",f=l.discount||"",h=l.points||l.costPoints||"";c.innerHTML=`
            <div>
                <label class="text-xs font-bold text-gray-500 mb-1 block">Custo (Pontos)</label>
                <div class="relative">
                    <input type="number" placeholder="Ex: 100" data-field="points" value="${h}" class="w-full p-2 border border-gray-300 rounded-md font-bold text-gray-800">
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
                    <input type="text" placeholder="Ex: R$ 20 de Desconto" data-field="rewardName" value="${v(b)}" class="desc-input flex-1 p-2 border border-gray-300 rounded-md ${u!=="money"?"hidden":""}">
                    
                    <select data-field="itemId" class="item-select flex-1 p-2 border border-gray-300 rounded-md bg-white text-sm ${u==="money"?"hidden":""}">
                        <option value="">Selecione o item na lista...</option>
                    </select>

                    <div class="w-24 relative">
                        <span class="absolute left-2 top-2 text-gray-500 text-sm">$</span>
                        <input type="number" placeholder="Valor" data-field="discount" value="${f}" step="0.01" class="discount-input w-full p-2 pl-7 border border-gray-300 rounded-md" title="Valor do desconto">
                    </div>
                </div>
            </div>

            <button type="button" class="remove-loyalty-tier absolute -top-3 -right-3 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white p-1.5 rounded-full shadow-md transition-colors" title="Remover Prémio">
                <i class="bi bi-x-lg text-sm"></i>
            </button>
        `;const y=c.querySelector(".type-select"),$=c.querySelector(".item-select"),A=c.querySelector(".desc-input"),R=c.querySelector(".discount-input"),C=E=>{$.innerHTML='<option value="">Selecione...</option>';let D=[];E==="service"?D=o:E==="product"?D=r:E==="package"&&(D=i),D.forEach(P=>{const j=P.id===p,S=P.name||P.title||"Sem nome",I=P.price||P.salePrice||0;$.innerHTML+=`<option value="${P.id}" data-price="${I}" ${j?"selected":""}>${v(S)}</option>`})};return u!=="money"&&C(u),y.addEventListener("change",E=>{const D=E.target.value;D==="money"?($.classList.add("hidden"),A.classList.remove("hidden"),A.value="",R.value=""):($.classList.remove("hidden"),A.classList.add("hidden"),C(D),R.value="")}),$.addEventListener("change",E=>{const D=E.target.selectedOptions[0];if(D&&D.value){A.value=D.text;const P=D.dataset.price;P&&(R.value=parseFloat(P).toFixed(2))}}),c};a.tiers&&a.tiers.length>0?a.tiers.forEach(l=>n.appendChild(d(l))):n.appendChild(d()),e.querySelector("#add-loyalty-tier").addEventListener("click",()=>{n.appendChild(d())}),n.addEventListener("click",l=>{const c=l.target.closest(".remove-loyalty-tier");c&&c.closest(".loyalty-tier-row").remove()}),e.querySelector("#loyalty-form").addEventListener("submit",l=>{l.preventDefault();const c=Array.from(e.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(p=>{const b=p.querySelector(".type-select").value,f=b==="money"?null:p.querySelector(".item-select").value;let h=b==="money"?p.querySelector(".desc-input").value:p.querySelector(".item-select").options[p.querySelector(".item-select").selectedIndex]?.text;return{points:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,costPoints:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,type:b,itemId:f,reward:h,name:h,discount:parseFloat(p.querySelector('input[data-field="discount"]').value)||0}}),u={loyaltyProgram:{enabled:e.querySelector("#loyaltyEnabled").checked,type:"visit",pointsPerVisit:parseInt(e.querySelector("#loyaltyPointsPerVisit").value,10)||1,pointsPerCurrency:0,tiers:c.filter(p=>p.points>0&&p.reward)}};dt(u,l)})}async function wd(t,e){e.innerHTML=`
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
    `;try{const[a,s]=await Promise.all([pa(te),ms(te)]),o=t.financialIntegration||{},r=t.commissionConfig||{},i=t.purchaseConfig||{};e.querySelector("#financialNatureId").innerHTML=He(a,o.defaultNaturezaId),e.querySelector("#financialCostCenterId").innerHTML=He(s,o.defaultCentroDeCustoId),e.querySelector("#purchaseNatureId").innerHTML=He(a,i.defaultNatureId),e.querySelector("#purchaseCostCenterId").innerHTML=He(s,i.defaultCostCenterId),e.querySelector("#commissionNatureId").innerHTML=He(a,r.defaultNatureId),e.querySelector("#commissionCostCenterId").innerHTML=He(s,r.defaultCostCenterId)}catch{m("Erro","Não foi possível carregar o plano de contas da unidade.","error")}e.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const s={financialIntegration:{defaultNaturezaId:e.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:e.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:e.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:e.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:e.querySelector("#commissionNatureId").value||null,defaultCostCenterId:e.querySelector("#commissionCostCenterId").value||null}};dt(s,a)})}function kd(t,e){const a=`https://wa.me/5516997859430?text=Olá, preciso de ajuda com o sistema Kairos (Minha Unidade: ${t.name}).`;e.innerHTML=`
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
    `}function $d(t,e){const a=`https://wa.me/5516997859430?text=Gostaria de solicitar o cancelamento da assinatura. (Unidade: ${t.name})`;e.innerHTML=`
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
    `}function Sd(t,e){const a=e.querySelector("#slotIntervalContainer"),s=e.querySelector("#establishmentSlotInterval");if(!a||!s)return;const o=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=o.map(r=>{const i=r.value===t;return`<button type="button" data-value="${r.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors shadow-sm
                           ${i?"bg-indigo-600 text-white":"bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}">
                       ${r.label}
                   </button>`}).join(""),s.value=t,a.querySelectorAll(".interval-btn").forEach(r=>{r.addEventListener("click",()=>{s.value=r.dataset.value,a.querySelectorAll(".interval-btn").forEach(i=>{i.classList.remove("bg-indigo-600","text-white"),i.classList.add("bg-white","border","border-gray-300","text-gray-700")}),r.classList.add("bg-indigo-600","text-white"),r.classList.remove("bg-white","border","border-gray-300","text-gray-700")})})}async function Ed(t){const a=ur().find(o=>o.id===t);if(!a)return;qe.innerHTML=`
        <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-gray-200 border-opacity-50">
            <div class="flex items-center gap-3">
                <button data-action="back-to-menu" class="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 shadow-sm flex items-center gap-2 text-sm font-semibold">
                    <i class="bi bi-arrow-left"></i> Voltar
                </button>
                <h2 class="text-2xl font-bold text-gray-800">${a.label}</h2>
            </div>
            <div class="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                ${v(K?.name||"")}
            </div>
        </div>
        
        <div id="settings-content-detail" class="pb-20 max-w-6xl mx-auto w-full">
            <div class="flex justify-center items-center py-10"><div class="spinner-border text-indigo-600" role="status"></div></div>
        </div>
    `,qe.querySelector('button[data-action="back-to-menu"]').addEventListener("click",o=>{o.preventDefault(),br({id:te})});const s=document.getElementById("settings-content-detail");switch(t){case"personal-data":gd(K,s);break;case"change-password":md(K,s);break;case"change-email":fd(K,s);break;case"branding":xd(K,s);break;case"booking":hd(K,s);break;case"working-hours":vd(K,s);break;case"whatsapp-bot":pr(K,s);break;case"loyalty":await yd(K,s);break;case"financial":await wd(K,s);break;case"support":kd(K,s);break;case"cancellation":$d(K,s);break;default:s.innerHTML='<div class="p-4 text-center">Módulo em construção.</div>'}}async function br(t={}){qe.innerHTML=`
        <div class="flex flex-col justify-center items-center h-64">
            <div class="spinner-border text-indigo-600 border-4 w-12 h-12 mb-4" role="status"></div>
            <p class="text-gray-500 font-medium">A carregar configurações da unidade...</p>
        </div>
    `;try{te=t.id||g.establishmentId,K=await Te(te);const e=t.id?`<button onclick="window.navigateTo('establishments-section')" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                   <i class="bi bi-diagram-3"></i> Voltar à Rede
               </button>`:"",a=K.isMatriz||!K.parentId?'<span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded ml-3">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded ml-3">📍 UNIDADE</span>',s=ur();qe.innerHTML=`
            <div class="max-w-5xl mx-auto w-full pb-20">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                            Configurações da Loja
                        </h2>
                        <p class="text-gray-500 text-sm mt-1">Gira os módulos, dados base e horários desta unidade individualmente.</p>
                    </div>
                    ${e}
                </div>

                <div class="bg-gradient-to-r from-indigo-900 to-indigo-700 rounded-xl shadow-lg p-6 mb-8 text-white flex justify-between items-center relative overflow-hidden">
                    <div class="relative z-10">
                        <h3 class="text-2xl font-bold mb-1">${v(K.name)} ${a}</h3>
                        <p class="text-indigo-200 text-sm flex items-center gap-2"><i class="bi bi-geo-alt"></i> ${v(K.address||"Morada não definida")}</p>
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
                        ${Id(K.modules||{})}
                    </div>
                </div>
            </div>
        `,qe.querySelectorAll("div[data-section]").forEach(o=>{o.addEventListener("click",r=>{Ed(o.dataset.section)})}),qe.querySelectorAll(".module-toggle").forEach(o=>{o.addEventListener("change",async()=>{const r=o.dataset.module;try{const n={...(await Te(te)).modules,[r]:o.checked};await is(te,{modules:n}),m("Módulos","Módulos atualizados com sucesso.","success")}catch(i){o.checked=!o.checked,m("Erro",i.message,"error")}})})}catch(e){qe.innerHTML=`
            <div class="p-8 text-center max-w-md mx-auto">
                <i class="bi bi-exclamation-triangle text-4xl text-red-500 mb-4 block"></i>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Erro ao carregar loja</h2>
                <p class="text-gray-600">${e.message}</p>
                <button onclick="window.navigateTo('establishments-section')" class="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700">Voltar à Rede</button>
            </div>
        `}}function Id(t){return[{key:"agenda-section",label:"Agenda Diária",icon:"bi-calendar"},{key:"comandas-section",label:"Comandas e PDV",icon:"bi-receipt"},{key:"financial-section",label:"Financeiro Completo",icon:"bi-cash-coin"},{key:"reports-section",label:"Relatórios Gerenciais",icon:"bi-graph-up"}].map(a=>`
        <div class="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <i class="bi ${a.icon}"></i>
                </div>
                <span class="text-sm font-bold text-gray-700">${a.label}</span>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input module-toggle cursor-pointer" type="checkbox" data-module="${a.key}" ${t[a.key]?"checked":""}>
            </div>
        </div>
    `).join("")}const yt=document.getElementById("content");async function Ge(t){const e=document.getElementById("blockagesList");if(e){e.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,s=document.getElementById("filterEndDate")?.value,o=await da(g.establishmentId,a||new Date().toISOString().split("T")[0],s||new Date().toISOString().split("T")[0],t),r=document.getElementById("filterReason")?.value.toLowerCase(),i=r?o.filter(d=>d.reason&&d.reason.toLowerCase().includes(r)):o,n=i.reduce((d,l)=>{const c=l.reason||"Sem motivo";return d[c]||(d[c]=[]),d[c].push(l),d},{});if(e.innerHTML="",i.length===0){e.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(n).forEach(([d,l])=>{const c=document.createElement("div");c.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let p=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${v(d)} (${l.length})</h4>`;if(l.length>1){const b=JSON.stringify(l.map(f=>f.id));p+=`<button data-action="batch-delete-blockage" data-ids='${b}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}p+="</div>",c.innerHTML=p,l.forEach(b=>{const f=new Date(b.startTime),h=new Date(b.endTime),y=f.toLocaleDateString("pt-BR"),$=h.toLocaleDateString("pt-BR"),R=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${y===$?`${y} | ${f.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${h.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${y} às ${f.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${$} às ${h.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${b.id}">Apagar</button>
                    </div>`;c.innerHTML+=R}),e.appendChild(c)})}catch(a){e.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function Ld(t){t.preventDefault();const e=t.target,a=e.querySelector("#blockageProfId").value,s=e.querySelector("#blockageDate").value,o=e.querySelector("#blockageEndDate").value||s,r=e.querySelector("#blockageStartTime").value,i=e.querySelector("#blockageEndTime").value,n={establishmentId:g.establishmentId,professionalId:a,startTime:new Date(`${s}T${r}:00`).toISOString(),endTime:new Date(`${o}T${i}:00`).toISOString(),reason:e.querySelector("#blockageReason").value};try{await ca(n),e.reset(),m("Sucesso","Bloqueio adicionado com sucesso!","success"),Ge(a)}catch(d){m("Erro",`Não foi possível criar o bloqueio: ${d.message}`,"error")}}async function Cd(t){t.preventDefault();const e=t.target,a=Array.from(e.querySelectorAll('input[name="batch-professionals"]:checked')).map(c=>c.value);if(a.length===0)return m("Atenção","Selecione pelo menos um profissional.","error");const s=e.querySelector("#batchBlockageDate").value,o=e.querySelector("#batchBlockageEndDate").value||s,r=e.querySelector("#batchBlockageStartTime").value,i=e.querySelector("#batchBlockageEndTime").value,n=e.querySelector("#batchBlockageReason").value,d=e.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="Aguarde...";const l=a.map(c=>{const u={establishmentId:g.establishmentId,professionalId:c,startTime:new Date(`${s}T${r}:00`).toISOString(),endTime:new Date(`${o}T${i}:00`).toISOString(),reason:n};return ca(u)});try{await Promise.all(l),m("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),e.reset(),e.querySelectorAll('input[name="batch-professionals"]:checked').forEach(u=>u.checked=!1);const c=document.getElementById("blockageProfId").value;c&&Ge(c)}catch(c){m("Erro",`Ocorreu um erro: ${c.message}`,"error")}finally{d.disabled=!1,d.textContent="Adicionar Bloqueio em Lote"}}function Dd(t){yt.addEventListener("submit",e=>{e.target.id==="blockageForm"&&Ld(e),e.target.id==="batchBlockageForm"&&Cd(e)}),yt.addEventListener("input",e=>{e.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&Ge(t)}),yt.addEventListener("click",async e=>{const a=e.target.closest("button[data-action]");if(!a)return;const s=a.dataset.action;if(s==="back-to-professionals")ee("profissionais-section");else if(s==="delete-blockage"){if(await Y("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await ds(a.dataset.id),m("Sucesso","Bloqueio removido.","success"),Ge(t)}catch(r){m("Erro",`Não foi possível remover o bloqueio: ${r.message}`,"error")}}else if(s==="batch-delete-blockage"){const o=JSON.parse(a.dataset.ids);if(await Y("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${o.length} bloqueios de uma vez?`))try{await Io(o),m("Sucesso",`${o.length} bloqueios removidos.`,"success"),Ge(t)}catch(i){m("Erro",`Não foi possível apagar os bloqueios: ${i.message}`,"error")}}})}async function Td(t){const{professionalId:e,professionalName:a}=t;if(!e||!a){yt.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const s=v(a);yt.innerHTML=`
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
                            <input type="hidden" id="blockageProfId" value="${e}">
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
        </section>`,Dd(e),await Ge(e);const o=document.getElementById("batchProfSelectionContainer");try{const r=await we(g.establishmentId);o.innerHTML=r.map(i=>`
            <div class="flex items-center">
                <input id="prof-batch-${i.id}" value="${i.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${i.id}" class="ml-2 text-sm text-gray-700">${v(i.name)}</label>
            </div>`).join("")}catch{o.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Pd=t=>L(`/api/users/${t}`),Bd=t=>L("/api/users",{method:"POST",body:JSON.stringify(t)}),Ad=(t,e)=>L(`/api/users/${t}`,{method:"PUT",body:JSON.stringify(e)}),Md=t=>L(`/api/users/${t}`,{method:"DELETE"}),qd=(t,e)=>L(`/api/users/${t}/password`,{method:"PUT",body:JSON.stringify({password:e})}),jd=(t,e)=>L(`/api/users/${t}/status`,{method:"PATCH",body:JSON.stringify({status:e})}),ct=document.getElementById("content"),Nd={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios Gerais","sales-report-section":"Relatório de Vendas (Caixa)","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores","profissionais-section":"Profissionais","ausencias-section":"Ausências e Bloqueios","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},Rd={view:"Visualizar",create:"Criar",edit:"Editar"};let Ft=null,Ht=null,Xe=null;const Fd={group_admin:"Administrador do Grupo",company_admin:"Gestor de Matriz",branch_manager:"Gestor de Filial",professional:"Profissional Padrão"};function Hd(t){const e=document.getElementById("usersListContainer");if(!e)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(t.length===0){const s=a?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";e.innerHTML=`<p class="col-span-full text-center text-gray-500">${s}</p>`;return}t.sort((s,o)=>(s.status==="active"?-1:1)-(o.status==="active"?-1:1)),e.innerHTML=t.map(s=>{const o=JSON.stringify(s).replace(/'/g,"&apos;"),r=s.status==="active",i=g.professionals.find(p=>p.id===s.professionalId),n=i?i.name:"N/A",d=i?i.name.charAt(0):s.name.charAt(0),l=i?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(d)}`,c=Fd[s.role]||"Profissional",u=s.role==="group_admin"?"bg-purple-100 text-purple-800":s.role==="company_admin"?"bg-blue-100 text-blue-800":s.role==="branch_manager"?"bg-orange-100 text-orange-800":"bg-gray-100 text-gray-800";return`
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
    `}).join("")}function Qa(){const e=document.getElementById("showInactiveUsersToggle")?.checked?g.users:g.users.filter(a=>a.status==="active");Hd(e)}function Od(t={}){return Object.entries(Nd).map(([e,a])=>{const s=e==="agenda-section"||e==="comandas-section",o=t[e]?.view_all_prof===!0,r=Object.entries(Rd).map(([n,d])=>`
             <label class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${e}" data-permission="${n}" class="sr-only" ${t[e]?.[n]?"checked":""}>
                    <div class="toggle-bg block bg-gray-300 w-8 h-4 rounded-full"></div>
                </div>
                <span class="text-[10px] text-gray-600 font-medium">${d}</span>
            </label>
        `).join(""),i=s?`
            <div class="col-span-full pt-2 mt-2 border-t border-gray-100">
                <label class="flex items-center space-x-2 cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" data-module="${e}" data-permission="view_all_prof" class="sr-only" ${o?"checked":""}>
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
    `}).join("")}function Vs(t){if(!Xe||g.userRole==="professional")return"";const e=t?.accessibleEstablishments?.map(r=>r.id)||[],a=t?.accessibleCompanies?.map(r=>r.id)||[];if((t?.role||"professional")==="group_admin")return'<div class="p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 text-sm font-bold">Acesso Total (Global) liberado.</div>';let o='<div class="space-y-3 max-h-48 overflow-y-auto custom-scrollbar p-2 bg-gray-50 rounded border">';return Xe.companies.forEach(r=>{const i=a.includes(r.id),n=Xe.branches.filter(d=>d.companyId===r.id);o+=`
            <div class="company-block">
                <label class="flex items-center space-x-2 cursor-pointer mb-1">
                    <input type="checkbox" class="company-checkbox rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" value="${r.id}" data-name="${r.name}" ${i?"checked":""}>
                    <span class="text-sm font-bold text-gray-800">🏢 ${r.name}</span>
                </label>
                <div class="pl-6 space-y-1 border-l-2 border-gray-200 ml-2">
                    ${n.map(d=>{const l=e.includes(d.id)||i;return`
                            <label class="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" class="branch-checkbox rounded text-indigo-500 h-3 w-3" value="${d.id}" data-name="${d.name}" data-company-id="${r.id}" ${l?"checked":""}>
                                <span class="text-xs text-gray-600">📍 ${d.name}</span>
                            </label>
                        `}).join("")}
                </div>
            </div>
        `}),o+="</div>",o}async function Us(t=null){document.getElementById("user-list-view").classList.add("hidden");const e=document.getElementById("user-form-view");e.classList.remove("hidden");let a=g.professionals;if(!a||a.length===0)try{a=await we(g.currentViewContext.id),g.professionals=a}catch{console.warn("Profissionais não carregados")}if(["group_admin","company_admin"].includes(g.userRole)&&!Xe)try{const l=await fetch("/api/establishments/hierarchy",{headers:{Authorization:`Bearer ${await g.getAuthToken?.()||""}`}});l.ok&&(Xe=await l.json())}catch(l){console.error("Falha ao buscar hierarquia",l),Xe={companies:[],branches:[]}}const s=l=>a?.find(c=>c.id===l),o=t?.professionalId;s(o);const r=t!==null;e.querySelector("#userFormTitle").textContent=r?`Editar: ${t.name}`:"Novo Usuário";const i=e.querySelector("#userForm");i.innerHTML=`
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
            
            <div class="bg-gray-50 p-4 rounded-lg border space-y-3">
                 <h3 class="font-bold text-sm text-gray-800 border-b pb-1">Dados de Acesso</h3>
                 <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="form-group">
                        <label class="text-xs font-bold text-gray-600">Nome Completo</label>
                        <input type="text" id="userName" required value="${t?.name||""}" class="w-full p-2 border rounded text-sm">
                    </div>
                    <div class="form-group">
                        <label class="text-xs font-bold text-gray-600">E-mail de Login</label>
                        <input type="email" id="userEmail" required value="${t?.email||""}" class="w-full p-2 border rounded text-sm">
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
                            ${g.userRole==="group_admin"?`<option value="group_admin" ${t?.role==="group_admin"?"selected":""}>Administrador Global (Acesso a tudo)</option>`:""}
                            <option value="company_admin" ${t?.role==="company_admin"?"selected":""}>Gestor de Empresa/Matriz</option>
                            <option value="branch_manager" ${t?.role==="branch_manager"?"selected":""}>Gestor de Filial (Loja)</option>
                            <option value="professional" ${t?.role==="professional"?"selected":""}>Profissional Padrão (Barbeiro)</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-xs font-bold text-indigo-700 block mb-1">Locais Permitidos</label>
                        <div id="hierarchySelectorContainer">
                            ${Vs(t)}
                        </div>
                    </div>
                 </div>
            </div>
            `:`<input type="hidden" id="userRole" value="${t?.role||"professional"}">`}

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
                    ${Od(t?.permissions)}
                </div>
            </div>

            <div class="flex gap-3 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-2 bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300">Cancelar</button>
                <button type="submit" class="flex-1 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">Salvar Usuário</button>
            </div>
        </div>
    `;const n=i.querySelector("#userRole"),d=i.querySelector("#hierarchySelectorContainer");if(n&&d){n.addEventListener("change",c=>{const u={...t,role:c.target.value};d.innerHTML=Vs(u),l()});const l=()=>{d.querySelectorAll(".company-checkbox").forEach(c=>{c.addEventListener("change",u=>{u.target.closest(".company-block").querySelectorAll(".branch-checkbox").forEach(f=>f.checked=u.target.checked)})})};l()}if(i.addEventListener("submit",async l=>{l.preventDefault();const c={};i.querySelectorAll("input[data-module]").forEach(y=>{const $=y.dataset.module,A=y.dataset.permission;c[$]||(c[$]={}),c[$][A]=y.checked});const u=i.querySelector("#userProfessionalId").value||null,p=i.querySelector("#userRole")?.value||"professional",b=[],f=[];if(p!=="group_admin"&&i.querySelector(".company-checkbox")&&(i.querySelectorAll(".company-checkbox:checked").forEach(y=>{b.push({id:y.value,name:y.dataset.name})}),i.querySelectorAll(".branch-checkbox:checked").forEach(y=>{f.push({id:y.value,name:y.dataset.name,companyId:y.dataset.companyId})}),f.length===0))return m("Atenção","Você deve selecionar pelo menos uma filial para este usuário.","error");const h={name:i.querySelector("#userName").value,permissions:c,professionalId:u,role:p,accessibleCompanies:b,accessibleEstablishments:f};try{if(r){const y=i.querySelector("#userEmail").value;t?.email!==y&&(h.email=y),await Ad(t.id,h),m("Usuário atualizado com sucesso!","success")}else h.email=i.querySelector("#userEmail").value,h.password=i.querySelector("#userPassword").value,await Bd(h),m("Usuário criado com sucesso!","success");aa()}catch(y){m(`Erro: ${y.message}`,"error")}}),r){const l=i.querySelector('[data-action="show-password-form"]'),c=i.querySelector("#password-form");l&&c&&(l.addEventListener("click",()=>{l.classList.add("hidden"),c.classList.remove("hidden")}),c.querySelector('[data-action="cancel-password-change"]').addEventListener("click",()=>{l.classList.remove("hidden"),c.classList.add("hidden"),c.querySelector("#userNewPassword").value=""}),c.querySelector('[data-action="save-password"]').addEventListener("click",async u=>{const p=u.target,b=c.querySelector("#userNewPassword").value;if(!b||b.length<6)return m("Aviso","Senha deve ter no mínimo 6 caracteres.","error");if(await Y("Alterar Senha","Tem certeza?"))try{p.disabled=!0,p.textContent="...",await qd(t.id,b),m("Sucesso","Senha alterada.","success"),l.classList.remove("hidden"),c.classList.add("hidden")}catch(f){m("Erro",f.message,"error")}finally{p.disabled=!1,p.textContent="Salvar Senha"}}))}}async function zd(){const t=document.getElementById("usersListContainer");t.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[e,a]=await Promise.all([Pd(g.currentViewContext.id),we(g.currentViewContext.id)]);g.users=e,g.professionals=a,Qa()}catch{m("Erro ao carregar usuários.","error"),t.innerHTML='<p class="col-span-full text-center text-red-500">Falha ao carregar.</p>'}}async function aa(){ct.innerHTML=`
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
    `,Ft&&ct.removeEventListener("click",Ft),Ht&&ct.removeEventListener("change",Ht),Ft=async t=>{const e=t.target.closest("[data-action]");if(!e)return;switch(e.dataset.action){case"new-user":Us();break;case"edit-user":const s=JSON.parse(e.dataset.user.replace(/&apos;/g,"'"));Us(s);break;case"back-to-list":aa();break;case"delete-user":{if(t.stopPropagation(),await Y("Excluir Usuário","Tem certeza? Ação irreversível."))try{await Md(e.dataset.userId),m("Usuário excluído!","success"),aa()}catch(o){m(`Erro: ${o.message}`,"error")}break}}},Ht=async t=>{const e=t.target.closest('input[data-action="toggle-user-status"]');if(t.target.id==="showInactiveUsersToggle")Qa();else if(e){t.stopPropagation();const a=e.dataset.userId,s=e.checked?"active":"inactive";try{await jd(a,s);const o=g.users.findIndex(r=>r.id===a);o>-1&&(g.users[o].status=s,Qa())}catch(o){m(`Erro: ${o.message}`,"error"),e.checked=!e.checked}}},ct.addEventListener("click",Ft),ct.addEventListener("change",Ht),await zd()}const _d=document.getElementById("content");let Ws={},Ga=null;function Vd(){Object.values(Ws).forEach(t=>t?.destroy()),Ws={}}function Ud(t,e){if(!window.jspdf){m("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a({orientation:"landscape",unit:"px",format:"a4"}),o=document.getElementById("salesReportSummaryCards");if(s.setFontSize(18),s.text(t,s.internal.pageSize.getWidth()/2,40,{align:"center"}),o){const i=[["Receita Total",o.querySelector("#summary-revenue").textContent],["Vendas Totais",o.querySelector("#summary-transactions").textContent],["Ticket Médio",o.querySelector("#summary-avg-ticket").textContent]];s.autoTable({startY:60,head:[["Métrica","Valor"]],body:i,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const r=s.lastAutoTable?s.lastAutoTable.finalY+20:60;s.text("Detalhes das Vendas",20,r),s.autoTable({html:`#${e}`,startY:r+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),s.save(`${t.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function Js(t){const e=document.getElementById("genericModal"),a=v(t.client),s=v(t.items),o=v(t.responsavelCaixa||"N/A"),r=(t.payments||[]).map(i=>`
        <div class="flex justify-between text-sm">
            <span>${v(i.method.charAt(0).toUpperCase()+i.method.slice(1))}</span>
            <span class="font-medium">R$ ${i.value.toFixed(2)}</span>
        </div>
    `).join("");e.innerHTML=`
        <div class="modal-content max-w-md w-full m-4">
            <div class="flex justify-between items-start">
                <div>
                    <h2 class="text-xl md:text-2xl font-bold text-gray-800">Detalhes da Venda</h2>
                    <p class="text-sm text-gray-500">${new Date(t.date).toLocaleString("pt-BR")}</p>
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
                         <span>R$ ${t.total.toFixed(2)}</span>
                     </div>
                </div>
            </div>
        </div>
    `,e.style.display="flex"}function Wd(t){const{summary:e,transactions:a}=t;document.getElementById("summary-revenue").textContent=`R$ ${e.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=e.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${e.averageTicket.toFixed(2)}`;const s=document.getElementById("paymentSummaryTableBody"),o=Object.entries(e.paymentMethodTotals).sort(([,n],[,d])=>d-n);s.innerHTML=o.map(([n,d])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${v(n.charAt(0).toUpperCase()+n.slice(1))}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${d.toFixed(2)}</td>
        </tr>
    `).join("");const r=document.getElementById("transactionsTableBody"),i=document.getElementById("mobileTransactionsList");if(a.length===0){const n='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';r.innerHTML=n,i.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}r.innerHTML=a.map((n,d)=>{const l=v(n.client),c=v(n.items),u=v(n.type);return`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${d}">
            <td class="w-24 py-3 px-4">${new Date(n.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${l}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${c}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${u}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${n.total.toFixed(2)}</td>
        </tr>
    `}).join(""),r.querySelectorAll("tr").forEach(n=>{n.addEventListener("dblclick",()=>{const d=n.dataset.transactionIndex,l=Ga.transactions[d];l&&Js(l)})}),i.innerHTML=a.map((n,d)=>{const l=v(n.client),c=v(n.items),u=v(n.type);return`
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
    `}).join(""),i.querySelectorAll("div[data-transaction-index]").forEach(n=>{n.addEventListener("click",()=>{const d=n.dataset.transactionIndex,l=Ga.transactions[d];l&&Js(l)})})}async function Qs(){const t=document.getElementById("main-reports-view"),e=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!t||!e||!a)return;const s=e.value,o=a.value;if(!s||!o)return m("Atenção","Por favor, selecione as datas de início e fim.","error");t.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const r=document.getElementById("cashierSessionFilter").value,i=await Yt({establishmentId:g.establishmentId,startDate:s,endDate:o,cashierSessionId:r});Ga=i,t.innerHTML=`
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
        `,Wd(i)}catch(r){m("Erro",`Não foi possível carregar o relatório: ${r.message}`,"error"),t.innerHTML=`<p class="p-8 text-center text-red-500">${v(r.message)}</p>`}}async function Jd(){Vd();const t=new Date().toISOString().split("T")[0],e=new Date;e.setDate(e.getDate()-30);const a=e.toISOString().split("T")[0];_d.innerHTML=`
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
                            <input type="date" id="reportEndDate" value="${t}" class="w-full p-2 border rounded-md text-sm">
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",Qs),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const s=document.getElementById("reportStartDate").value,o=document.getElementById("reportEndDate").value,r=`Relatorio_Vendas_${s}_a_${o}`;Ud(r,"transactionsTable")});try{const s=await fn(g.establishmentId),o=document.getElementById("cashierSessionFilter");s&&s.length>0&&s.forEach(r=>{const i=new Date(r.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),n=v(r.closedByName||"N/A");o.innerHTML+=`<option value="${r.id}">${n} - ${i}</option>`})}catch{m("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await Qs()}const Qd=document.getElementById("content");let w={payables:[],receivables:[],natures:[],costCenters:[],establishments:[],suppliers:[],clients:[],professionals:[],currentTab:"receivables",statusFilter:"all",startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date(new Date().getFullYear(),new Date().getMonth()+1,0).toISOString().split("T")[0],filterNaturezaId:"all",filterCostCenterId:"all",filterEstablishmentIds:new Set,searchQuery:"",isAdvancedFilterOpen:!1,selectedIds:new Set,isSelectionMode:!1,sortCol:"dueDate",sortAsc:!0},Ot=null,zt=null;function $s(t){const e=new Map,a=[];return t&&(t.forEach(s=>e.set(s.id,{...s,children:[]})),e.forEach(s=>{s.parentId&&e.has(s.parentId)?e.get(s.parentId).children.push(s):a.push(s)})),a}function gr(t){if(!t)return{day:"--",month:"---",full:"--/--/----"};const[e,a,s]=t.split("-"),o=new Date(e,a-1,s),r=String(o.getDate()).padStart(2,"0"),i=o.toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return{day:r,month:i,full:o.toLocaleDateString("pt-BR")}}function ve(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t)}function at(t,e){if(e==="paid")return!1;const a=new Date;a.setHours(0,0,0,0);const[s,o,r]=t.split("-");return new Date(s,o-1,r)<a}function Gd(t,e,a){if(!t)return;if(!e||e.length===0){t.innerHTML=`
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
            ${o.children.map(b=>s(b,r+1)).join("")}
        `};t.innerHTML=e.map(o=>s(o)).join("")}async function Xa(t){const e=document.getElementById("genericModal"),a=t==="nature",s=a?"Plano de Naturezas":"Centros de Custo",o=a?pa:ms,r=a?wn:$n,i=a?"natures":"costCenters";e.innerHTML=`
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
        </div>`,e.style.display="flex";const n=e.querySelector("#hierarchyList"),d=e.querySelector("#itemParent"),l=u=>{const p=$s(u);Gd(n,p,t);const b=d.value;d.innerHTML='<option value="">-- Nível Principal --</option>';const f=(h,y=0)=>{const $="  ".repeat(y)+(y>0?"↳ ":"");d.innerHTML+=`<option value="${h.id}">${$}${h.name}</option>`,h.children.forEach(A=>f(A,y+1))};p.forEach(h=>f(h)),d.value=b};try{const u=await o(g.establishmentId);w[i]=u,l(u)}catch(u){console.error(u)}const c=e.querySelector("#hierarchyForm");c.addEventListener("submit",async u=>{u.preventDefault();const p=e.querySelector("#itemName").value,b=d.value;try{await r({name:p,parentId:b||null,establishmentId:g.establishmentId});const f=await o(g.establishmentId);w[i]=f,l(f),c.reset(),await Ne(),m("Sucesso","Item adicionado à estrutura.","success")}catch(f){m("Erro",f.message,"error")}})}async function Xd(){try{const e=(await xe()).matrizes||[];w.establishments=[],e.forEach(a=>{w.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>w.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),w.filterEstablishmentIds.size===0&&w.filterEstablishmentIds.add(g.establishmentId)}catch(t){console.warn("Erro ao buscar lojas",t)}mr(),fr(),await Ne()}function mr(){const t=w.establishments.map(e=>`
        <label class="inline-flex items-center gap-2 px-3 py-1.5 bg-white border ${w.filterEstablishmentIds.has(e.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-gray-200 text-gray-600"} rounded-lg cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" value="${e.id}" ${w.filterEstablishmentIds.has(e.id)?"checked":""}>
            <span class="text-xs font-bold whitespace-nowrap">${e.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${e.name}</span>
        </label>
    `).join("");Qd.innerHTML=`
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
                            ${t}
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
    `,document.querySelector('.date-preset-btn[data-preset="month"]').classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),document.querySelector('.date-preset-btn[data-preset="month"]').classList.remove("bg-white","text-gray-600","border-gray-200"),xr()}function Yd(){const t=w.currentTab==="receivables",e=t?w.receivables:w.payables;let a=e;if(w.statusFilter!=="all"&&(a=e.filter(n=>{const d=at(n.dueDate,n.status);return w.statusFilter==="overdue"?d:w.statusFilter==="pending"?n.status==="pending"&&!d:n.status===w.statusFilter})),w.searchQuery&&(a=a.filter(n=>n.description&&n.description.toLowerCase().includes(w.searchQuery)||n.entity&&n.entity.toLowerCase().includes(w.searchQuery)||n.notes&&n.notes.toLowerCase().includes(w.searchQuery))),a.sort((n,d)=>new Date(n.dueDate)-new Date(d.dueDate)),a.length===0){m("Aviso","Não há dados para exportar com os filtros atuais.","info");return}const s=new Map(w.natures.map(n=>[n.id,n.name])),o=new Map(w.costCenters.map(n=>[n.id,n.name])),r=new Map(w.establishments.map(n=>[n.id,n])),i=a.map(n=>{const d=n.status==="paid",l=at(n.dueDate,n.status);let c=d?"Baixado":l?"Atrasado":"A Vencer / Pendente";const u=n.naturezaId?s.get(n.naturezaId)||"Não Categorizado":"Geral",p=n.centroDeCustoId?o.get(n.centroDeCustoId)||"Não Categorizado":"Geral",b=r.get(n.establishmentId),f=b?b.name:"Atual",h=n.saleId||n.appointmentId||n.origin==="comanda"?"Comanda / PDV":n.origin==="commission"?"Comissões":"Manual";return{"Data de Vencimento":new Date(n.dueDate).toLocaleDateString("pt-BR"),"Data de Pagamento":n.paymentDate?new Date(n.paymentDate).toLocaleDateString("pt-BR"):"-",Descrição:n.description||"","Favorecido / Pagador":n.entity||"",Unidade:f,Natureza:u,"Centro de Custo":p,Origem:h,"Documento / NFS":n.documentNumber||"",Status:c,"Valor (R$)":n.amount}});try{if(typeof XLSX>"u"){m("Erro","A biblioteca de exportação (XLSX) não foi carregada no sistema.","error");return}const n=XLSX.utils.json_to_sheet(i),d=XLSX.utils.book_new();XLSX.utils.book_append_sheet(d,n,"Financeiro");const c=`Fluxo_${t?"Receitas":"Despesas"}_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(d,c)}catch(n){console.error("Erro ao exportar:",n),m("Erro","Não foi possível exportar para Excel.","error")}}function fr(){const t=document.getElementById("select-all-toggle");t&&t.addEventListener("change",o=>{const r=o.target.checked,i=document.querySelectorAll(".item-checkbox");w.selectedIds.clear(),i.forEach(n=>{n.checked=r,r&&w.selectedIds.add(n.dataset.id)}),Je()}),document.getElementById("cancel-selection-btn").addEventListener("click",()=>{w.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(o=>o.checked=!1),Je()}),document.getElementById("batch-delete-btn").addEventListener("click",async()=>{const o=w.selectedIds.size;if(o===0)return;if(await Y("Excluir Lançamentos",`Deseja realmente apagar ${o} registros financeiros?`))try{const i=w.currentTab==="payables"?"payables":"receivables";await Ho(i,Array.from(w.selectedIds)),m("Sucesso",`${o} itens excluídos.`,"success"),w.selectedIds.clear(),Je(),Ne()}catch{m("Erro","Falha ao excluir itens.","error")}}),document.querySelectorAll(".est-filter-checkbox").forEach(o=>{o.addEventListener("change",r=>{const i=r.target.closest("label");r.target.checked?(w.filterEstablishmentIds.add(r.target.value),i.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.remove("border-gray-200","text-gray-600")):(w.filterEstablishmentIds.delete(r.target.value),i.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.add("border-gray-200","text-gray-600"))})}),document.querySelectorAll(".sort-header").forEach(o=>{o.addEventListener("click",r=>{const i=r.currentTarget.dataset.sort;w.sortCol===i?w.sortAsc=!w.sortAsc:(w.sortCol=i,w.sortAsc=!0),wt()})}),document.getElementById("toggle-filter-btn").addEventListener("click",()=>{const o=document.getElementById("filter-panel"),r=document.getElementById("toggle-filter-btn");w.isAdvancedFilterOpen=!w.isAdvancedFilterOpen,w.isAdvancedFilterOpen?(o.classList.remove("hidden"),r.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.classList.remove("bg-white","text-gray-600","border-gray-200")):(o.classList.add("hidden"),r.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),r.classList.add("bg-white","text-gray-600","border-gray-200"))}),document.getElementById("settings-btn").addEventListener("click",sc);const e=document.getElementById("export-excel-btn");e&&e.addEventListener("click",Yd),document.querySelectorAll('[data-action="new-financial"]').forEach(o=>{o.addEventListener("click",r=>{Ea(r.target.closest("button").dataset.type)})}),document.getElementById("fab-add").addEventListener("click",()=>{const o=w.currentTab==="payables"?"payable":"receivable";Ea(o)});const a=document.getElementById("tab-receivables"),s=document.getElementById("tab-payables");a.addEventListener("click",()=>Gs("receivables")),s.addEventListener("click",()=>Gs("payables")),document.querySelectorAll(".status-filter-btn").forEach(o=>{o.addEventListener("click",r=>{document.querySelectorAll(".status-filter-btn").forEach(i=>{i.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200","bg-red-50","text-red-700","border-red-200"),i.classList.add("bg-white","text-gray-600")}),r.target.dataset.status==="overdue"?r.target.classList.add("bg-red-50","text-red-700","border-red-200"):r.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.target.classList.remove("bg-white","text-gray-600"),w.statusFilter=r.target.dataset.status,wt(),hr()})}),document.querySelectorAll(".date-preset-btn").forEach(o=>{o.addEventListener("click",r=>{document.querySelectorAll(".date-preset-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),r.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.target.classList.remove("bg-white","text-gray-600","border-gray-200");const i=r.target.dataset.preset,n=new Date;let d,l;i==="month"?(d=new Date(n.getFullYear(),n.getMonth(),1),l=new Date(n.getFullYear(),n.getMonth()+1,0)):i==="last_month"?(d=new Date(n.getFullYear(),n.getMonth()-1,1),l=new Date(n.getFullYear(),n.getMonth(),0)):i==="year"&&(d=new Date(n.getFullYear(),0,1),l=new Date(n.getFullYear(),11,31)),document.getElementById("filterStartDate").value=d.toISOString().split("T")[0],document.getElementById("filterEndDate").value=l.toISOString().split("T")[0],document.getElementById("apply-filter-btn").click()})}),document.getElementById("searchInput").addEventListener("input",o=>{w.searchQuery=o.target.value.toLowerCase(),wt()}),document.getElementById("clear-filters-btn").addEventListener("click",()=>{const o=new Date;document.getElementById("filterStartDate").value=new Date(o.getFullYear(),o.getMonth(),1).toISOString().split("T")[0],document.getElementById("filterEndDate").value=new Date(o.getFullYear(),o.getMonth()+1,0).toISOString().split("T")[0],document.getElementById("filterNaturezaId").value="all",document.getElementById("filterCostCenterId").value="all",w.filterEstablishmentIds.clear(),w.filterEstablishmentIds.add(g.establishmentId),mr(),fr()}),document.getElementById("apply-filter-btn").addEventListener("click",()=>{w.startDate=document.getElementById("filterStartDate").value,w.endDate=document.getElementById("filterEndDate").value,w.filterNaturezaId=document.getElementById("filterNaturezaId").value,w.filterCostCenterId=document.getElementById("filterCostCenterId").value,w.filterEstablishmentIds.size===0&&w.filterEstablishmentIds.add(g.establishmentId),document.getElementById("toggle-filter-btn").click(),Ne()}),Ot&&document.body.removeEventListener("click",Ot),Ot=o=>{const r=o.target;if(r.classList.contains("item-checkbox")||r.classList.contains("modal-item-checkbox")){const d=r.value||r.dataset.id;r.checked?w.selectedIds.add(d):w.selectedIds.delete(d),Je(),o.stopPropagation();return}const i=r.closest("button[data-action]");if(i){const{action:d,type:l,id:c}=i.dataset;if(o.stopPropagation(),d==="delete"){const u=i.closest(".financial-row").dataset.item.replace(/&apos;/g,"'");ec(l,JSON.parse(u));return}if(d==="mark-as-paid"){Zd(l,c);return}if(d==="manage-natures"){Xa("nature");return}if(d==="manage-cost-centers"){Xa("cost-center");return}}const n=r.closest(".financial-row");if(n&&document.getElementById("list-container").contains(n)&&!r.closest("button")&&!r.closest(".item-checkbox")){const{type:d}=n.dataset,l=JSON.parse(n.dataset.item.replace(/&apos;/g,"'"));Ea(d,l)}},document.body.addEventListener("click",Ot),zt&&document.getElementById("genericModal").removeEventListener("click",zt),zt=o=>{if(o.target.closest('[data-action="close-modal"]')){document.getElementById("genericModal").style.display="none";return}const i=o.target.closest('button[data-action^="delete-"]');if(i){const n=i.dataset.action.split("-")[1];ac(n,i.dataset.id)}},document.getElementById("genericModal").addEventListener("click",zt)}function Je(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=document.getElementById("fab-add"),s=w.selectedIds.size;e.textContent=s,s>0?(t.classList.remove("hidden"),t.classList.add("flex"),a&&a.classList.add("hidden")):(t.classList.add("hidden"),t.classList.remove("flex"),a&&a.classList.remove("hidden"))}function Gs(t){w.currentTab=t,w.selectedIds.clear(),Je(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1);const e=document.getElementById("tab-receivables"),a=document.getElementById("tab-payables"),s=document.getElementById("fab-add");t==="receivables"?(e.classList.add("bg-white","text-emerald-700","shadow"),e.classList.remove("text-gray-600"),a.classList.remove("bg-white","text-red-700","shadow"),a.classList.add("text-gray-600"),s&&(s.className="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40")):(a.classList.add("bg-white","text-red-700","shadow"),a.classList.remove("text-gray-600"),e.classList.remove("bg-white","text-emerald-700","shadow"),e.classList.add("text-gray-600"),s&&(s.className="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40")),wt()}async function Ne(){const t=document.getElementById("list-container");t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-xs">A processar transações...</p></div>';try{if(w.natures.length===0){const[r,i,n,d,l]=await Promise.all([pa(g.establishmentId),ms(g.establishmentId),It(g.establishmentId).catch(()=>[]),it(g.establishmentId,"",1e3).catch(()=>[]),we(g.establishmentId).catch(()=>[])]);w.natures=r||[],w.costCenters=i||[],w.suppliers=n||[],w.clients=d||[],w.professionals=l||[],xr()}const e=Array.from(w.filterEstablishmentIds).join(","),a={startDate:w.startDate,endDate:w.endDate,establishmentId:e};w.filterNaturezaId!=="all"&&(a.natureId=w.filterNaturezaId),w.filterCostCenterId!=="all"&&(a.costCenterId=w.filterCostCenterId);const[s,o]=await Promise.all([_o(a),Uo(a)]);w.payables=s.entries||[],w.receivables=o.entries||[],hr(),wt()}catch(e){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-xs font-medium">Erro ao carregar dados: ${e.message}</p>
            </div>`}}function xr(){const t=s=>{let o='<option value="all">-- Todas as opções --</option>';const r=$s(s),i=(n,d=0)=>{const l="  ".repeat(d)+(d>0?"↳ ":"");o+=`<option value="${n.id}">${l}${n.name}</option>`,n.children.forEach(c=>i(c,d+1))};return r.forEach(n=>i(n)),o},e=document.getElementById("filterNaturezaId"),a=document.getElementById("filterCostCenterId");e&&(e.innerHTML=t(w.natures)),a&&(a.innerHTML=t(w.costCenters))}function hr(){const t=document.getElementById("summary-section");if(!t)return;const e=w.currentTab==="receivables";let s=e?w.receivables:w.payables;w.searchQuery&&(s=s.filter(c=>c.description&&c.description.toLowerCase().includes(w.searchQuery)||c.entity&&c.entity.toLowerCase().includes(w.searchQuery)||c.notes&&c.notes.toLowerCase().includes(w.searchQuery)));const o=s.reduce((c,u)=>c+u.amount,0),r=s.filter(c=>c.status==="paid").reduce((c,u)=>c+u.amount,0),i=s.filter(c=>c.status==="pending"&&!at(c.dueDate,c.status)).reduce((c,u)=>c+u.amount,0),n=s.filter(c=>at(c.dueDate,c.status)).reduce((c,u)=>c+u.amount,0),d=e?"emerald":"red",l=e?"Receitas":"Despesas";t.innerHTML=`
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
    `}function Kd(){document.querySelectorAll(".sort-header").forEach(t=>{const e=t.querySelector("i");if(!e)return;t.dataset.sort===w.sortCol?(t.classList.add("text-indigo-700"),t.classList.remove("text-gray-500"),e.className=w.sortAsc?"bi bi-arrow-up ml-1 text-indigo-600":"bi bi-arrow-down ml-1 text-indigo-600"):(t.classList.remove("text-indigo-700"),t.classList.add("text-gray-500"),e.className="bi bi-arrow-down-up ml-1 opacity-30 text-[10px]")})}function wt(){const t=document.getElementById("list-container");if(!t)return;const e=w.currentTab==="receivables",a=e?w.receivables:w.payables;let s=a;if(w.statusFilter!=="all"&&(s=a.filter(l=>{const c=at(l.dueDate,l.status);return w.statusFilter==="overdue"?c:w.statusFilter==="pending"?l.status==="pending"&&!c:l.status===w.statusFilter})),w.searchQuery&&(s=s.filter(l=>l.description&&l.description.toLowerCase().includes(w.searchQuery)||l.entity&&l.entity.toLowerCase().includes(w.searchQuery)||l.notes&&l.notes.toLowerCase().includes(w.searchQuery))),s.sort((l,c)=>{let u=l[w.sortCol],p=c[w.sortCol];return w.sortCol==="dueDate"?(u=new Date(u).getTime(),p=new Date(p).getTime()):(w.sortCol==="description"||w.sortCol==="status")&&(u=u?u.toLowerCase():"",p=p?p.toLowerCase():""),u<p?w.sortAsc?-1:1:u>p?w.sortAsc?1:-1:0}),Kd(),s.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-inbox text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum registo encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente limpar os filtros ou faça um novo lançamento.</p>
            </div>
        `;return}const o=new Map(w.natures.map(l=>[l.id,l.name])),r=new Map(w.costCenters.map(l=>[l.id,l.name])),i=new Map(w.establishments.map(l=>[l.id,l])),n=e?"receivable":"payable",d=e?"text-emerald-600":"text-red-600";t.innerHTML=s.map(l=>{const c=gr(l.dueDate),u=l.status==="paid",p=at(l.dueDate,l.status);let b="";u?b='<span class="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-check2-circle mr-0.5"></i> Baixado</span>':p?b='<span class="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-exclamation-circle mr-0.5"></i> Atrasado</span>':b='<span class="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-clock-history mr-0.5"></i> A Vencer</span>';const f=l.naturezaId?o.get(l.naturezaId)||"Sem Natureza":"Não Categorizado",h=l.centroDeCustoId?r.get(l.centroDeCustoId)||"Sem Centro":"Geral",$=l.saleId||l.appointmentId||l.origin==="comanda"?'<span class="text-[8px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100"><i class="bi bi-receipt mr-1"></i>Comanda</span>':l.origin==="commission"?'<span class="text-[8px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100"><i class="bi bi-cash-stack mr-1"></i>Comissões</span>':'<span class="text-[8px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200"><i class="bi bi-keyboard mr-1"></i>Manual</span>',A=l.documentNumber?`<span class="text-[8px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded ml-2" title="NFS / Documento">NFS: ${l.documentNumber}</span>`:"",R=i.get(l.establishmentId);let C="";if(R){const I=R.type==="Matriz"?"bi-building":"bi-shop";C=`<span class="text-[8px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-bold border border-slate-200 flex items-center whitespace-nowrap w-max" title="Unidade: ${R.name}"><i class="bi ${I} mr-1 opacity-60"></i> ${R.name}</span>`}else C='<span class="text-[8px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-bold border border-gray-200 flex items-center whitespace-nowrap w-max"><i class="bi bi-geo-alt mr-1 opacity-60"></i> Atual</span>';const E=JSON.stringify(l).replace(/'/g,"&apos;"),D=w.selectedIds.has(l.id),j=!!l.recurrenceId?'<i class="bi bi-arrow-repeat text-indigo-400 ml-1 text-[10px]" title="Lançamento Recorrente"></i>':"",S=l.entity?`<span class="text-[9px] text-gray-400 font-medium truncate block mt-0.5"><i class="bi bi-person mr-1 opacity-40"></i>${l.entity}</span>`:"";return`
        <div class="financial-row border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-1.5 md:p-2 mb-1 ${D?"bg-indigo-50/40":""}"
             data-type="${n}"
             data-item='${E}'>
            
            <div class="absolute left-0 top-0 bottom-0 w-1 ${u?"bg-gray-200":e?"bg-emerald-400":"bg-red-400"}"></div>

            <div class="absolute right-2 top-2 md:relative md:right-auto md:top-auto md:col-span-1 md:flex md:justify-center z-10">
                <input type="checkbox" value="${l.id}" class="item-checkbox w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${D?"checked":""}>
            </div>

            <div class="flex items-center gap-2 md:col-span-1 pl-2 md:pl-0">
                <div class="flex flex-col items-center justify-center bg-white border border-gray-200 rounded w-9 h-9 flex-shrink-0 shadow-sm">
                    <span class="text-xs font-black text-gray-800 leading-none">${c.day}</span>
                    <span class="text-[7px] font-bold text-gray-400 uppercase leading-none mt-0.5">${c.month}</span>
                </div>
                <div class="md:hidden flex-1 pr-6">
                    <div class="flex items-center">
                        <p class="font-bold text-xs text-gray-800 leading-tight ${u?"line-through text-gray-400":""}">${l.description}</p>
                        ${A}
                    </div>
                    ${S}
                </div>
            </div>

            <div class="md:col-span-3 hidden md:flex flex-col justify-center min-w-0">
                <div class="flex items-center">
                    <p class="font-bold text-xs text-gray-800 truncate ${u?"line-through text-gray-400":""}" title="${l.description}">${l.description}</p>
                    ${A}
                </div>
                ${S}
                <div class="flex items-center gap-1.5 mt-0.5">
                    ${C}
                    ${j}
                </div>
            </div>

            <div class="md:col-span-2 hidden md:flex flex-col justify-center min-w-0">
                <p class="text-[9px] text-gray-600 font-bold truncate" title="Natureza: ${f}"><i class="bi bi-tag opacity-50 mr-1"></i> ${f}</p>
                <p class="text-[9px] text-gray-400 truncate mt-0.5" title="Centro: ${h}"><i class="bi bi-diagram-3 opacity-50 mr-1"></i> ${h}</p>
            </div>

            <div class="md:col-span-1 hidden md:flex items-center">
                ${$}
            </div>

            <div class="md:hidden flex flex-wrap items-center gap-1.5 mt-1 ml-11">
                ${C}
                <span class="text-[8px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 font-bold border border-gray-200 flex items-center">
                    <i class="bi bi-tag mr-1 opacity-50"></i> ${f}
                </span>
                ${$}
            </div>

            <div class="md:col-span-1 md:text-center flex justify-start md:justify-center mt-1.5 md:mt-0 ml-11 md:ml-0">
                ${b}
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
        `}).join("")}async function Zd(t,e){const a=new Date().toISOString().split("T")[0];try{await(t==="payable"?Ln(e,a):Tn(e,a)),m("Baixa Realizada","O lançamento foi registado como pago.","success"),await Ne()}catch(s){m("Erro",s.message,"error")}}async function ec(t,e){if(!!!e.recurrenceId){await Y("Excluir Lançamento","Tem certeza? Essa ação apagará o registo do seu fluxo de caixa.")&&await vr(t,[e.id]);return}tc(t,e)}function tc(t,e){const a=document.getElementById("genericModal"),o=(t==="payable"?w.payables:w.receivables).filter(l=>l.recurrenceId===e.recurrenceId).sort((l,c)=>new Date(l.dueDate)-new Date(c.dueDate));a.innerHTML=`
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
                ${o.map(l=>{const c=l.id===e.id,u=l.status==="paid",p=gr(l.dueDate);return`
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
    `,a.style.display="flex";const r=a.querySelector("#modal-select-all"),i=a.querySelectorAll(".modal-item-checkbox"),n=a.querySelector("#confirm-batch-delete");r.addEventListener("change",l=>{i.forEach(c=>c.checked=l.target.checked),d()}),i.forEach(l=>l.addEventListener("change",d));function d(){const l=Array.from(i).filter(c=>c.checked).length;n.innerHTML=l>0?`<i class="bi bi-trash3"></i> Excluir ${l} Parcela(s)`:"Selecione para excluir",n.disabled=l===0,l===0?n.classList.add("opacity-50","cursor-not-allowed","bg-gray-400"):n.classList.remove("opacity-50","cursor-not-allowed","bg-gray-400")}n.addEventListener("click",async()=>{const l=Array.from(i).filter(u=>u.checked).map(u=>u.value);if(l.length===0)return;a.style.display="none",await Y("Confirmar Ação",`Tem certeza que deseja apagar estas ${l.length} parcelas permanentemente?`)&&await vr(t,l)}),d()}async function vr(t,e){try{e.length===1?t==="payable"?await In(e[0]):await Dn(e[0]):await Ho(t==="payable"?"payables":"receivables",e),m("Sucesso",`${e.length} registo(s) limpo(s) do sistema.`,"success"),w.selectedIds.clear(),Je(),await Ne()}catch(a){m("Erro",a.message,"error")}}async function ac(t,e){const s=t==="nature"?kn:Sn;if(await Y("Apagar Categoria","Tem certeza? Apagar um item pai também apagará as suas subcategorias."))try{await s(e),Xa(t==="nature"?"nature":"cost-center")}catch(r){m("Erro",r.message,"error")}}function sc(){const t=document.getElementById("genericModal");t.innerHTML=`
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
    `,t.style.display="flex"}function Ea(t,e=null){const a=document.getElementById("genericModal"),s=t==="payable",o=s?"red":"emerald",r=e?"Editar Lançamento":"Novo Lançamento",i=w.establishments.map(D=>{const P=e?e.establishmentId===D.id:D.id===g.establishmentId;return`<option value="${D.id}" ${P?"selected":""}>${D.type==="Matriz"?"🏢":"📍"} ${D.name}</option>`}).join(""),n=(D,P)=>{let j='<option value="">-- Selecione --</option>';const S=$s(D),I=(F,V=0)=>{const U="  ".repeat(V)+(V>0?"↳ ":""),T=F.id===P?"selected":"";j+=`<option value="${F.id}" ${T}>${U}${F.name}</option>`,F.children.forEach(W=>I(W,V+1))};return S.forEach(F=>I(F)),j},l=[{value:"dinheiro",label:"Dinheiro"},{value:"pix",label:"PIX"},{value:"cartao_credito",label:"Cartão de Crédito"},{value:"cartao_debito",label:"Cartão de Débito"},{value:"transferencia",label:"Transferência Bancária"},{value:"boleto",label:"Boleto"},{value:"outros",label:"Outros"}].map(D=>`<option value="${D.value}" ${e?.paymentMethod===D.value?"selected":""}>${D.label}</option>`).join(""),c=`
        <datalist id="entity-suggestions">
            ${s?w.suppliers.map(D=>`<option value="${v(D.name)}">Fornecedor</option>`).join("")+w.professionals.map(D=>`<option value="${v(D.name)}">Profissional</option>`).join(""):w.clients.map(D=>`<option value="${v(D.name)} ${D.phone?"- "+v(D.phone):""}">Cliente</option>`).join("")}
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

                    ${e?"":`
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
                                    value="${e?.amount||""}" placeholder="0.00">
                            </div>
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Data de Vencimento</label>
                            <input type="date" name="dueDate" required 
                                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none font-bold text-gray-800 text-xs transition-shadow" 
                                value="${e?.dueDate||new Date().toISOString().split("T")[0]}">
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Descrição / Título</label>
                            <input type="text" name="description" required 
                                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none font-bold text-gray-800 text-xs transition-shadow" 
                                value="${e?.description||""}" placeholder="Ex: Compra de Estoque...">
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">${s?"Fornecedor / Favorecido":"Cliente / Pagador"}</label>
                            <div class="relative">
                                <i class="bi bi-person absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input type="text" name="entity" list="entity-suggestions" 
                                    class="w-full pl-8 pr-3 p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none text-xs text-gray-800 transition-shadow" 
                                    value="${e?.entity||""}" placeholder="Nome ou Selecione na lista..." autocomplete="off">
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
                                ${n(w.natures,e?.naturezaId)}
                            </select>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Centro de Custo</label>
                            <select name="centroDeCustoId" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none text-xs font-medium text-gray-700 transition-shadow">
                                ${n(w.costCenters,e?.centroDeCustoId)}
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
                                value="${e?.documentNumber||""}" placeholder="Ex: NF-12345">
                        </div>
                        <div class="md:col-span-1">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Observações</label>
                            <textarea name="notes" rows="1" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${o}-500 outline-none text-xs text-gray-700 font-medium resize-none transition-shadow">${e?.notes||""}</textarea>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <div class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="status" id="status-toggle" class="sr-only peer" ${e?.status==="paid"?"checked":""}>
                                <div class="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-${o}-500 shadow-inner"></div>
                            </div>
                            <div>
                                <span class="block text-xs font-bold text-gray-800 group-hover:text-${o}-700 transition-colors uppercase tracking-wide">Marcar como ${s?"Pago":"Recebido"}</span>
                                <span class="block text-[9px] text-gray-400 font-medium mt-0.5">Retira a transação do status de pendente.</span>
                            </div>
                        </label>
                        
                        <div id="payment-date-wrapper" class="${e?.status==="paid"?"":"hidden"} flex-1 md:max-w-[220px] animate-fade-in border-l md:border-l border-gray-100 pl-0 md:pl-4 pt-3 md:pt-0 mt-3 md:mt-0">
                            <label class="block text-[10px] font-bold text-${o}-600 uppercase tracking-widest mb-1.5">Data da Baixa Bancária</label>
                            <input type="date" name="paymentDate" 
                                class="w-full p-2 bg-${o}-50 border border-${o}-200 text-${o}-800 rounded-lg text-xs font-bold outline-none focus:ring-1 focus:ring-${o}-500 shadow-sm transition-shadow" 
                                value="${e?.paymentDate||new Date().toISOString().split("T")[0]}">
                        </div>
                    </div>
                </div>

                <div class="p-5 border-t border-gray-200 bg-white flex flex-col-reverse md:flex-row gap-3 flex-shrink-0 z-10 relative shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                    <button type="button" data-action="close-modal" class="w-full md:w-auto py-2.5 px-5 bg-gray-100 text-gray-700 font-bold uppercase tracking-wider text-[10px] rounded-lg hover:bg-gray-200 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" class="w-full flex-1 py-2.5 px-5 bg-${o}-600 text-white font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-${o}-700 shadow-md shadow-${o}-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <i class="bi bi-save2"></i> <span>${e?"Salvar Alterações":"Confirmar Lançamento"}</span>
                    </button>
                </div>
            </form>
        </div>`,a.style.display="flex";const u=a.querySelector("#financial-form");let p="single",b=2;const f=u.querySelector('[name="amount"]'),h=u.querySelector("#recurrence-options"),y=u.querySelector("#recurrence-summary"),$=u.querySelector("#installments-input"),A=u.querySelector("#status-toggle"),R=u.querySelector("#payment-date-wrapper"),C=u.querySelector('[name="paymentDate"]'),E=()=>{if(p==="single")return;const D=parseFloat(f.value)||0;if(b=parseInt($.value)||2,D===0){y.innerHTML='<span class="text-[10px] text-indigo-400 font-medium">Digite o valor total...</span>';return}if(p==="installment"){const P=D/b;y.innerHTML=`
                <div>
                    <span class="block text-[9px] text-indigo-400 uppercase tracking-widest font-bold mb-0.5">Simulação do Parcelamento</span>
                    <span class="font-bold text-sm text-indigo-700 block leading-tight">${b}x de ${ve(P)}</span>
                    <span class="text-[10px] text-indigo-500 font-medium">Total: ${ve(D)}</span>
                </div>
            `}else if(p==="repeat"){const P=D*b;y.innerHTML=`
                <div>
                    <span class="block text-[9px] text-indigo-400 uppercase tracking-widest font-bold mb-0.5">Geração Recorrente Fixa</span>
                    <span class="font-bold text-sm text-indigo-700 block leading-tight">${b}x de ${ve(D)}</span>
                    <span class="text-[10px] text-indigo-500 font-medium">Lançamento Total: ${ve(P)}</span>
                </div>
            `}};u.addEventListener("click",D=>{const P=D.target.closest(".mode-btn");if(P&&!e)if(D.preventDefault(),u.querySelectorAll(".mode-btn").forEach(I=>{I.classList.remove("bg-gray-900","text-white","shadow-sm"),I.classList.add("text-gray-500","hover:bg-gray-100")}),P.classList.add("bg-gray-900","text-white","shadow-sm"),P.classList.remove("text-gray-500","hover:bg-gray-100"),p=P.dataset.mode,p==="single")h.style.display="none";else{h.style.display="block";const I=h.querySelector("#recurrence-label");I&&(I.textContent=p==="installment"?"Número de Parcelas":"Repetir por quantos meses?"),E()}if(D.target.closest("#btn-minus")&&$){D.preventDefault();let I=parseInt($.value)||2;I>2&&($.value=I-1,E())}if(D.target.closest("#btn-plus")&&$){D.preventDefault();let I=parseInt($.value)||2;I<60&&($.value=I+1,E())}}),f.addEventListener("input",E),$&&$.addEventListener("input",E),A.addEventListener("change",()=>{A.checked?(R.classList.remove("hidden"),C.required=!0):(R.classList.add("hidden"),C.required=!1)}),u.addEventListener("submit",async D=>{D.preventDefault();const P=u.querySelector('button[type="submit"]'),j=P.innerHTML;P.disabled=!0,P.innerHTML='<div class="loader-small border-white"></div> A gravar...';const S=new FormData(u),I=A.checked,F=parseFloat(S.get("amount"));let V=F,U=1;!e&&p!=="single"&&(U=parseInt(S.get("installments")),p==="repeat"&&(V=F*U));const T={establishmentId:S.get("establishmentId"),description:S.get("description"),amount:V,dueDate:S.get("dueDate"),naturezaId:S.get("naturezaId")||null,centroDeCustoId:S.get("centroDeCustoId")||null,entity:S.get("entity")||null,paymentMethod:S.get("paymentMethod")||null,documentNumber:S.get("documentNumber")||null,notes:S.get("notes"),status:I?"paid":"pending",paymentDate:I?S.get("paymentDate"):null,installments:U};U>1&&!e&&(T.recurrenceId=self.crypto.randomUUID());try{e?(await(s?En(e.id,T):Cn(e.id,T)),m("Sucesso","Atualizado com sucesso!","success")):(await(s?zo(T):Vo(T)),m("Sucesso","Lançamento criado!","success")),document.getElementById("genericModal").style.display="none",Ne()}catch(W){m("Erro",W.message||"Erro ao salvar","error"),P.disabled=!1,P.innerHTML=j}})}const oc=t=>L("/api/commissions/calculate",{method:"POST",body:JSON.stringify(t)}),rc=t=>L("/api/commissions/save",{method:"POST",body:JSON.stringify(t)}),ic=(t,e)=>{const a=new URLSearchParams({startDate:t,endDate:e}).toString();return L(`/api/commissions/stats?${a}`)},nc=(t={})=>{Object.keys(t).forEach(s=>(t[s]===void 0||t[s]===null||t[s]==="")&&delete t[s]);const e=new URLSearchParams(t).toString(),a=`/api/commissions/history${e?"?"+e:""}`;return L(a)},yr=t=>L(`/api/commissions/report/${t}`,{method:"DELETE"}),Ya=new Date,lc=new Date(Ya.getFullYear(),Ya.getMonth(),1);let B={professionals:[],reports:[],calculationResult:null,periodString:"",establishments:[],filterEstablishmentIds:new Set,establishmentConfig:null,selectedIds:new Set,startDate:lc.toISOString().split("T")[0],endDate:Ya.toISOString().split("T")[0],professionalId:"all",searchQuery:"",stats:{revenue:0,commissions:0,margin:0,netPaid:0},viewMode:"list"},_t=null;const dc=document.getElementById("content");function kt(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function cc(t){return t?new Date(t).toLocaleDateString("pt-BR"):"--/--/----"}function sa(t){if(!t)return"PR";const e=t.trim().split(" ");return e.length>=2?(e[0][0]+e[e.length-1][0]).toUpperCase():t.substring(0,2).toUpperCase()}function wr(){const t=document.getElementById("commissions-layout-main"),e=document.getElementById("commissions-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&(t.style.display="none"),e&&(e.classList.remove("hidden"),e.classList.add("flex")),a&&window.innerWidth<768&&(a.style.display="none")}function Ss(){const t=document.getElementById("commissions-layout-main"),e=document.getElementById("commissions-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&(t.style.display="flex"),e&&(e.classList.add("hidden"),e.classList.remove("flex")),a&&window.innerWidth<768&&(a.style.display=""),B.viewMode="list"}async function uc(){try{const[t,e,a]=await Promise.all([we(g.establishmentId),xe().catch(()=>({matrizes:[]})),Te(g.establishmentId).catch(()=>({}))]);B.professionals=t,B.establishmentConfig=a||{};const s=e.matrizes||[];B.establishments=[],s.forEach(o=>{B.establishments.push({id:o.id,name:o.name,type:"Matriz"}),o.branches&&o.branches.forEach(r=>B.establishments.push({id:r.id,name:r.name,type:"Filial"}))}),B.filterEstablishmentIds.size===0&&B.filterEstablishmentIds.add(g.establishmentId)}catch(t){console.error("Erro na inicialização de comissões",t)}B.viewMode="list",pc(),gc(),await st()}function pc(){const t=B.professionals.map(a=>`<option value="${a.id}">${a.name}</option>`).join(""),e=B.establishments.map(a=>`
        <label class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border ${B.filterEstablishmentIds.has(a.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-gray-200 text-gray-600"} rounded-lg cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none flex-shrink-0">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${a.id}" ${B.filterEstablishmentIds.has(a.id)?"checked":""}>
            <span class="text-[10px] font-bold whitespace-nowrap">${a.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${a.name}</span>
        </label>
    `).join("");dc.innerHTML=`
        <style>
            #toast-container, .toast-notification, .modal, .modal-backdrop { z-index: 9999999 !important; }
        </style>
        
        <section id="commissions-layout-main" class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative overflow-hidden">
            
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

            <div class="grid grid-cols-2 gap-2 mb-2 animate-fade-in w-full">
                <button data-action="new-calculation" class="bg-indigo-600 text-white rounded-xl p-2.5 flex items-center justify-center shadow-md active:scale-95 transition-transform border border-indigo-700 gap-2">
                    <i class="bi bi-calculator text-lg drop-shadow-md"></i>
                    <span class="font-black text-[10px] md:text-xs uppercase tracking-widest leading-none mt-0.5">Nova Apuração</span>
                </button>
                <button id="export-excel-btn" class="bg-white text-emerald-700 rounded-xl p-2.5 flex items-center justify-center shadow-sm border border-gray-200 active:scale-95 transition-transform hover:bg-gray-50 gap-2">
                    <i class="bi bi-file-earmark-excel-fill text-lg"></i>
                    <span class="font-black text-[10px] md:text-xs uppercase tracking-widest leading-none mt-0.5">Exportar Excel</span>
                </button>
            </div>

            ${B.establishments.length>1?`
            <div class="mb-2 animate-fade-in flex gap-1.5 overflow-x-auto custom-scrollbar pb-1" id="establishment-filters-container">
                ${e}
            </div>
            `:""}

            <div id="kpi-section" class="grid grid-cols-4 gap-1.5 md:gap-3 mb-2 animate-fade-in w-full">
                <div class="bg-white p-1.5 md:p-2 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Faturamento</span>
                    <span id="kpi-revenue" class="text-xs md:text-sm font-black text-gray-800 mt-0.5 w-full truncate">R$ 0,00</span>
                </div>
                <div class="bg-white p-1.5 md:p-2 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Comissões</span>
                    <span id="kpi-commissions" class="text-xs md:text-sm font-bold text-amber-600 mt-0.5 w-full truncate">R$ 0,00</span>
                </div>
                <div class="bg-white p-1.5 md:p-2 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Retenção</span>
                    <span id="kpi-margin" class="text-xs md:text-sm font-bold text-blue-600 mt-0.5 w-full truncate">0%</span>
                </div>
                <div class="bg-white p-1.5 md:p-2 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Pago</span>
                    <span id="kpi-net" class="text-xs md:text-sm font-bold text-emerald-600 mt-0.5 w-full truncate">R$ 0,00</span>
                </div>
            </div>

            <div class="flex flex-col md:flex-row gap-2 mb-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm animate-fade-in w-full">
                <div class="flex items-center gap-1.5 w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 shadow-sm flex-1">
                    <span class="text-[9px] font-bold text-gray-500 uppercase tracking-widest">De</span>
                    <input type="date" id="filter-start" value="${B.startDate}" class="w-full bg-transparent text-[10px] font-bold text-gray-700 outline-none">
                    <span class="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Até</span>
                    <input type="date" id="filter-end" value="${B.endDate}" class="w-full bg-transparent text-[10px] font-bold text-gray-700 outline-none">
                </div>
                
                <div class="flex gap-2 w-full md:w-auto">
                    <select id="filter-prof" class="flex-1 py-1.5 px-2 bg-gray-50 border border-gray-200 rounded-lg text-[10px] font-bold text-gray-700 outline-none shadow-sm">
                        <option value="all">Todos Profissionais</option>
                        ${t}
                    </select>
                    <button data-action="apply-filters" class="py-1.5 px-3 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-wider rounded-lg hover:bg-indigo-700 shadow-sm active:scale-95 transition-transform">
                        Filtrar
                    </button>
                </div>
            </div>
            
            <div class="relative w-full mb-2 flex-shrink-0 animate-fade-in">
                <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                <input type="text" id="search-input" placeholder="Buscar relatórios gerados..." class="w-full pl-8 p-2 bg-white border border-gray-200 shadow-sm rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500 font-semibold text-gray-700 transition-all">
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

        <div id="commissions-layout-detail" class="hidden fixed inset-0 z-[99999] bg-gray-50 flex-col overflow-hidden w-full h-[100dvh]">
            </div>
    `}async function st(){const t=document.getElementById("list-container");t&&(t.innerHTML='<div class="flex justify-center py-20"><div class="loader"></div></div>');const e=Array.from(B.filterEstablishmentIds).join(",");try{const[a,s]=await Promise.all([nc({startDate:B.startDate,endDate:B.endDate,professionalId:B.professionalId,establishmentId:e}),ic(B.startDate,B.endDate,e)]);B.reports=a||[];const o=B.reports.reduce((r,i)=>r+(i.summary.finalValue||i.summary.totalCommission),0);B.stats={revenue:s.totalRevenue||0,commissions:s.totalCommissionsPaid||0,margin:s.totalRevenue>0?((s.totalRevenue-s.totalCommissionsPaid)/s.totalRevenue*100).toFixed(1):0,netPaid:o},B.selectedIds.clear(),$t(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),bc(),kr()}catch(a){console.error(a),t&&(t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-xs font-medium">Erro ao carregar dados.</p>
            </div>`)}}function bc(){const t=document.getElementById("kpi-revenue"),e=document.getElementById("kpi-commissions"),a=document.getElementById("kpi-margin"),s=document.getElementById("kpi-net");t&&(t.textContent=kt(B.stats.revenue)),e&&(e.textContent=kt(B.stats.commissions)),a&&(a.textContent=`${B.stats.margin}%`),s&&(s.textContent=kt(B.stats.netPaid))}function kr(){const t=document.getElementById("list-container");if(!t)return;let e=B.reports;if(B.searchQuery){const a=B.searchQuery.toLowerCase();e=e.filter(s=>s.professionalName.toLowerCase().includes(a)||s.period.toLowerCase().includes(a))}if(e.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 text-center">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-receipt text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-700 mb-1">Nenhum pagamento encontrado</h3>
                <p class="text-[10px] text-gray-400 max-w-xs">Não há relatórios gerados para este período ou profissional.</p>
            </div>
        `;return}t.innerHTML=e.map(a=>{const s=cc(a.createdAt),o=a.summary.totalCommission,r=a.summary.extraDebit||0,i=a.summary.extraCredit||0,n=a.summary.finalValue||o,d=B.selectedIds.has(a.id);let l="";return r>0&&i>0?l=`<span class="text-red-500">-R$${r.toFixed(2)}</span> / <span class="text-emerald-500">+R$${i.toFixed(2)}</span>`:r>0?l=`<span class="text-red-500">-R$ ${r.toFixed(2)}</span>`:i>0?l=`<span class="text-emerald-500">+R$ ${i.toFixed(2)}</span>`:l='<span class="text-gray-300">--</span>',`
        <div class="border-b border-gray-100 hover:bg-gray-50 transition-colors relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-3 md:px-3 md:py-2 mb-2 md:mb-0 bg-white md:bg-transparent rounded-xl md:rounded-none shadow-sm md:shadow-none border md:border-b ${d?"bg-indigo-50/40":""}">
            
            <div class="absolute right-2 top-2 md:relative md:right-auto md:top-auto md:col-span-3 md:flex md:items-center md:gap-2 z-10">
                <input type="checkbox" value="${a.id}" class="item-checkbox w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${d?"checked":""}>
                <div class="hidden md:flex items-center gap-2 pr-2">
                    <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm border border-indigo-200">
                        ${sa(a.professionalName)}
                    </div>
                    <div class="min-w-0">
                        <p class="font-bold text-xs text-gray-800 truncate" title="${a.professionalName}">${a.professionalName}</p>
                        <p class="text-[9px] text-gray-400 font-medium truncate mt-0.5">Gerado: ${s}</p>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-2 md:hidden mb-2 pr-8">
                <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm border border-indigo-200">
                    ${sa(a.professionalName)}
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
                <span class="text-xs font-bold text-gray-700">${kt(o)}</span>
            </div>
            
            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-1 md:mb-0 ml-10 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-gray-400 uppercase tracking-widest">Ajustes:</span>
                <span class="text-[10px] font-bold">${l}</span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block pt-1 md:pt-0 border-t md:border-0 border-gray-100 ml-10 md:ml-0 mt-1 md:mt-0">
                <span class="md:hidden text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Líquido Pago:</span>
                <span class="text-xs font-black text-emerald-600">${kt(n)}</span>
            </div>

            <div class="md:col-span-1 flex justify-end gap-1.5 mt-3 md:mt-0 ml-10 md:ml-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button data-action="view-report-details" data-id="${a.id}" class="w-8 h-8 md:w-6 md:h-6 rounded-lg md:rounded flex items-center justify-center text-indigo-500 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-colors shadow-sm" title="Ver Detalhes">
                    <i class="bi bi-eye text-sm md:text-[10px]"></i>
                </button>
                <button data-action="print-receipt" data-id="${a.id}" class="w-8 h-8 md:w-6 md:h-6 rounded-lg md:rounded flex items-center justify-center text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors shadow-sm" title="Imprimir Recibo">
                    <i class="bi bi-printer text-sm md:text-[10px]"></i>
                </button>
                <button data-action="delete-report" data-id="${a.id}" class="w-8 h-8 md:w-6 md:h-6 rounded-lg md:rounded flex items-center justify-center text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 transition-colors shadow-sm" title="Excluir e Estornar">
                    <i class="bi bi-trash3 text-sm md:text-[10px]"></i>
                </button>
            </div>
        </div>
        `}).join("")}function gc(){_t&&document.body.removeEventListener("click",_t),_t=i=>{const n=i.target;if(n.classList.contains("item-checkbox")){const l=n.value;n.checked?B.selectedIds.add(l):B.selectedIds.delete(l),$t(),i.stopPropagation();return}const d=n.closest("button[data-action]");if(d){i.preventDefault();const l=d.dataset.action,c=d.dataset.id;switch(l){case"apply-filters":B.startDate=document.getElementById("filter-start").value,B.endDate=document.getElementById("filter-end").value,B.professionalId=document.getElementById("filter-prof").value,st();break;case"new-calculation":mc();break;case"print-receipt":$c(c);break;case"delete-report":Ec(c);break;case"view-report-details":wc(c);break;case"close-detail-screen":Ss();break;case"toggle-all-profs":const u=document.querySelectorAll(".prof-checkbox"),p=Array.from(u).every(y=>y.checked);u.forEach(y=>y.checked=!p);break;case"calculate-preview":fc();break;case"save-final-reports":yc();break;case"toggle-preview-details":const b=d.dataset.idx,f=document.getElementById(`preview-details-${b}`),h=d.querySelector("i");f&&(f.classList.contains("hidden")?(f.classList.remove("hidden"),h&&h.classList.replace("bi-chevron-down","bi-chevron-up")):(f.classList.add("hidden"),h&&h.classList.replace("bi-chevron-up","bi-chevron-down")));break}}},document.body.addEventListener("click",_t);const t=document.getElementById("search-input");t&&t.addEventListener("input",i=>{B.searchQuery=i.target.value,kr()}),document.body.addEventListener("input",i=>{(i.target.classList.contains("input-debit")||i.target.classList.contains("input-credit")||i.target.classList.contains("input-notes"))&&hc(i.target.dataset.idx)});const e=document.getElementById("select-all-toggle");e&&e.addEventListener("change",i=>{const n=i.target.checked,d=document.querySelectorAll(".item-checkbox");B.selectedIds.clear(),d.forEach(l=>{l.checked=n,n&&B.selectedIds.add(l.value)}),$t()});const a=document.getElementById("cancel-selection-btn");a&&a.addEventListener("click",()=>{B.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(i=>i.checked=!1),$t()});const s=document.getElementById("batch-delete-btn");s&&s.addEventListener("click",Sc);const o=document.getElementById("establishment-filters-container");o&&o.addEventListener("change",i=>{if(i.target.classList.contains("est-filter-checkbox")){const n=i.target.closest("label");i.target.checked?(B.filterEstablishmentIds.add(i.target.value),n.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),n.classList.remove("border-gray-200","text-gray-600")):(B.filterEstablishmentIds.delete(i.target.value),n.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),n.classList.add("border-gray-200","text-gray-600")),st()}});const r=document.getElementById("export-excel-btn");r&&r.addEventListener("click",kc)}function $t(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=B.selectedIds.size;e&&(e.textContent=a),t&&(a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function mc(){B.viewMode="new-calc";const t=document.getElementById("commissions-layout-detail");if(!t)return;const e=new Date().toISOString().split("T")[0],a=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],s=B.professionals.map(r=>`
        <label class="flex items-center p-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-indigo-300 transition-all cursor-pointer group mb-1.5">
            <input type="checkbox" value="${r.id}" class="prof-checkbox w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
            <div class="ml-3 flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg border border-gray-100 bg-gray-50 text-gray-500 flex items-center justify-center text-[10px] font-black group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shadow-sm">${sa(r.name)}</div>
                <span class="font-bold text-sm text-gray-800">${r.name}</span>
            </div>
        </label>`).join(""),o=`
        <div class="p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner transition-transform active:scale-95">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <h3 class="font-black text-base text-gray-800 ml-4 uppercase tracking-wider">Nova Apuração</h3>
        </div>
    `;t.innerHTML=`
        ${o}
        <div id="calc-flow-container" class="flex flex-col flex-1 overflow-hidden relative">
            
            <div id="calc-step-1" class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50/50 pb-28">
                <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                    <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><i class="bi bi-calendar-range text-indigo-500"></i> Período</h3>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Início</label>
                            <input type="date" id="calc-start-date" value="${a}" class="w-full mt-1.5 p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner">
                        </div>
                        <div>
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fim</label>
                            <input type="date" id="calc-end-date" value="${e}" class="w-full mt-1.5 p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner">
                        </div>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                    <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><i class="bi bi-tags text-indigo-500"></i> Considerar nas vendas</h3>
                    <div class="grid grid-cols-3 gap-2">
                        <label class="flex items-center justify-center p-3 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:bg-white transition-colors active:scale-95">
                            <input type="checkbox" id="calc-type-services" checked class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                            <span class="ml-2 text-xs font-bold text-gray-700 uppercase tracking-wider">Serviços</span>
                        </label>
                        <label class="flex items-center justify-center p-3 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:bg-white transition-colors active:scale-95">
                            <input type="checkbox" id="calc-type-products" checked class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                            <span class="ml-2 text-xs font-bold text-gray-700 uppercase tracking-wider">Produtos</span>
                        </label>
                        <label class="flex items-center justify-center p-3 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:bg-white transition-colors active:scale-95">
                            <input type="checkbox" id="calc-type-packages" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                            <span class="ml-2 text-xs font-bold text-gray-700 uppercase tracking-wider">Pacotes</span>
                        </label>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                    <div class="flex justify-between items-center mb-3">
                        <h3 class="text-sm font-bold text-gray-800 flex items-center gap-2"><i class="bi bi-people text-indigo-500"></i> Equipe</h3>
                        <button type="button" data-action="toggle-all-profs" class="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors shadow-sm active:scale-95">Inverter Sel.</button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-3 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                        ${s}
                    </div>
                </div>
            </div>

            <div id="calc-step-2" class="hidden flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-gray-50/50 pb-28"></div>

            <footer class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white flex justify-end gap-3 z-50 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)]">
                <button type="button" data-action="close-detail-screen" class="hidden md:block py-3.5 px-6 bg-white border border-gray-300 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-sm uppercase tracking-wider">Cancelar</button>
                <button type="button" data-action="calculate-preview" id="btn-calc-action" class="w-full md:w-auto py-3.5 px-8 bg-indigo-600 text-white font-black text-sm rounded-xl hover:bg-indigo-700 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider">
                    <i class="bi bi-calculator text-lg"></i> Calcular Vendas
                </button>
            </footer>
        </div>
    `,wr()}async function fc(){const t=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(l=>l.value);if(t.length===0)return m("Atenção","Selecione pelo menos um profissional.","warning");const e=Array.from(B.filterEstablishmentIds).join(","),a=document.getElementById("calc-start-date"),s=document.getElementById("calc-end-date");if(!a||!s||!a.value||!s.value)return m("Atenção","As datas de início e fim são obrigatórias.","warning");const o={professionalIds:t,startDate:a.value,endDate:s.value,establishmentId:e,calculationTypes:{services:document.getElementById("calc-type-services")?.checked||!1,products:document.getElementById("calc-type-products")?.checked||!1,packages:document.getElementById("calc-type-packages")?.checked||!1}},r=new Date(o.startDate+"T00:00:00").toLocaleDateString("pt-BR"),i=new Date(o.endDate+"T00:00:00").toLocaleDateString("pt-BR");B.periodString=`${r} a ${i}`;const n=document.getElementById("btn-calc-action"),d=n.innerHTML;n.innerHTML='<div class="loader-small border-white mr-2"></div> Processando...',n.disabled=!0;try{const l=await oc(o);B.calculationResult=l.map(c=>({...c,extraDebit:0,extraCredit:0,finalValue:c.summary.totalCommission,notes:""})),xc()}catch(l){m("Erro na Apuração",l.message,"error"),n.innerHTML=d,n.disabled=!1}}function xc(){B.viewMode="preview-calc";const t=B.calculationResult;if(!t||t.length===0||t.every(i=>i.summary.totalCommission===0)){m("Aviso","Nenhuma comissão encontrada para os filtros selecionados.","info");const i=document.getElementById("btn-calc-action");i.innerHTML='<i class="bi bi-calculator text-lg"></i> Calcular Vendas',i.disabled=!1;return}const e=document.getElementById("calc-step-1"),a=document.getElementById("calc-step-2"),s=document.getElementById("btn-calc-action");e&&e.classList.add("hidden"),a&&a.classList.remove("hidden"),s&&(s.dataset.action="save-final-reports",s.className="w-full md:w-auto py-3.5 px-8 bg-emerald-600 text-white font-black text-sm rounded-xl hover:bg-emerald-700 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider",s.innerHTML='<i class="bi bi-check2-circle text-lg"></i> Confirmar Pagtos.',s.disabled=!1);const o=t.reduce((i,n)=>i+n.finalValue,0),r=t.map((i,n)=>{if(i.summary.totalCommission===0)return"";const d=(i.items||[]).map(c=>`
            <tr class="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td class="py-2.5 truncate max-w-[120px] text-gray-800 font-bold" title="${c.item}">${c.item}</td>
                <td class="py-2.5 text-gray-500 font-medium">${c.client||"--"}</td>
                <td class="py-2.5 text-right text-gray-600 font-bold">R$ ${(c.value||0).toFixed(2)}</td>
                <td class="py-2.5 text-center text-gray-600 font-bold">${c.commissionRate}%</td>
                <td class="py-2.5 text-right font-black text-emerald-600">R$ ${(c.commissionValue||0).toFixed(2)}</td>
            </tr>
        `).join(""),l=`
            <div id="preview-details-${n}" class="hidden mt-4 pt-4 border-t border-gray-100">
                <h5 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Itens Processados</h5>
                <div class="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                    <table class="w-full text-left text-[10px]">
                        <thead class="text-gray-500 bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th class="p-2.5 font-bold uppercase tracking-wider">Serviço/Produto</th>
                                <th class="p-2.5 font-bold uppercase tracking-wider">Cliente</th>
                                <th class="p-2.5 font-bold uppercase tracking-wider text-right">Base</th>
                                <th class="p-2.5 font-bold uppercase tracking-wider text-center">%</th>
                                <th class="p-2.5 font-bold uppercase tracking-wider text-right">Comissão</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">${d||'<tr><td colspan="5" class="py-4 text-center text-gray-400">Nenhum item</td></tr>'}</tbody>
                    </table>
                </div>
            </div>
        `;return`
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-3 relative overflow-hidden">
            <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500"></div>
            
            <div class="flex justify-between items-start mb-4 border-b border-gray-100 pb-3 pl-3">
                <div>
                    <h4 class="font-black text-gray-800 text-sm uppercase tracking-wider">${i.professionalName}</h4>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">${i.summary.totalItems} itens calculados</p>
                </div>
                <div class="text-right bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shadow-inner">
                    <p class="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Valor Bruto</p>
                    <p class="font-black text-gray-800 text-sm">R$ ${i.summary.totalCommission.toFixed(2)}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-3 pl-3 mb-3">
                <div>
                    <label class="text-[10px] font-bold text-red-500 uppercase tracking-widest block mb-1.5"><i class="bi bi-dash-circle mr-1"></i>Descontos/Vales</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 font-black text-xs">R$</span>
                        <input type="number" step="0.01" data-idx="${n}" class="input-debit w-full pl-8 p-2.5 border border-red-200 rounded-xl bg-white shadow-inner font-black text-sm text-red-600 outline-none focus:ring-2 focus:ring-red-500" placeholder="0.00">
                    </div>
                </div>
                <div>
                    <label class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1.5"><i class="bi bi-plus-circle mr-1"></i>Bônus Extras</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 font-black text-xs">R$</span>
                        <input type="number" step="0.01" data-idx="${n}" class="input-credit w-full pl-8 p-2.5 border border-emerald-200 rounded-xl bg-white shadow-inner font-black text-sm text-emerald-600 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="0.00">
                    </div>
                </div>
            </div>

            <div class="pl-3 mb-4">
                <input type="text" data-idx="${n}" class="input-notes w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-gray-700 shadow-inner" placeholder="Motivo dos ajustes (Opcional)">
            </div>
            
            <div class="flex justify-between items-center bg-indigo-50 border border-indigo-200 p-3.5 rounded-xl pl-4 ml-3 shadow-sm">
                <span class="text-[10px] font-bold text-indigo-700 uppercase tracking-widest">Líquido a Pagar</span>
                <span class="text-xl font-black text-indigo-800 final-value-display drop-shadow-sm" data-idx="${n}">R$ ${i.finalValue.toFixed(2)}</span>
            </div>

            <div class="pl-3 mt-4 border-t border-gray-50 pt-3">
                <button type="button" data-action="toggle-preview-details" data-idx="${n}" class="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-widest flex items-center gap-1.5 transition-colors bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100">
                    <i class="bi bi-list-check text-sm"></i> Detalhar Itens <i class="bi bi-chevron-down ml-1 text-xs"></i>
                </button>
                ${l}
            </div>
        </div>
        `}).join("");a&&(a.innerHTML=`
        <div class="bg-gradient-to-r from-indigo-700 to-indigo-800 p-4 rounded-2xl shadow-lg text-white mb-4 flex justify-between items-center relative overflow-hidden border border-indigo-600">
            <div class="absolute right-[-10px] top-[-10px] opacity-10"><i class="bi bi-cash-coin text-8xl"></i></div>
            <div class="bg-indigo-900/40 p-3 px-4 rounded-xl backdrop-blur-sm border border-indigo-400/30 z-10">
                <span class="block text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">Soma Total Equipe</span>
                <span id="grand-total-preview" class="text-2xl font-black drop-shadow-md">R$ ${o.toFixed(2)}</span>
            </div>
            <div class="text-right z-10 flex flex-col items-end">
                <span class="block text-[9px] font-bold text-indigo-200 uppercase tracking-widest mb-1.5">Período Selecionado</span>
                <span class="text-[10px] font-black bg-white/20 px-2.5 py-1.5 rounded-lg border border-white/30 shadow-sm flex items-center gap-1"><i class="bi bi-calendar3"></i> ${B.periodString}</span>
            </div>
        </div>
        ${r}
    `)}function hc(t){const e=document.querySelector(`.input-debit[data-idx="${t}"]`),a=document.querySelector(`.input-credit[data-idx="${t}"]`),s=document.querySelector(`.input-notes[data-idx="${t}"]`);let o=parseFloat(e?.value)||0,r=parseFloat(a?.value)||0,i=s?.value||"";if(B.calculationResult&&B.calculationResult[t]){const n=B.calculationResult[t];n.extraDebit=o,n.extraCredit=r,n.notes=i,n.finalValue=n.summary.totalCommission-o+r;const d=document.querySelector(`.final-value-display[data-idx="${t}"]`);d&&(d.innerText=`R$ ${n.finalValue.toFixed(2)}`),vc()}}function vc(){const t=B.calculationResult.reduce((a,s)=>a+s.finalValue,0),e=document.getElementById("grand-total-preview");e&&(e.innerText=`R$ ${t.toFixed(2)}`)}async function yc(){const t=B.calculationResult.filter(o=>o.summary.totalCommission>0),e=t.length;if(e===0)return m("Aviso","Não há valores para pagar.","info");if(!await Y("Confirmar Pagamentos",`Você está prestes a gerar recibos e marcar as vendas de ${e} profissional(is) como PAGAS. Essa ação lançará a despesa correspondente no Financeiro. Confirmar?`))return;const s=document.getElementById("btn-calc-action");s.innerHTML='<div class="loader-small border-white mr-2"></div> Finalizando...',s.disabled=!0;try{const o=t.map(async r=>{const i=(r.items||[]).map(n=>n.originalSaleId).filter(n=>n!=null);await rc({professionalId:r.professionalId,professionalName:r.professionalName,period:B.periodString,processedSalesIds:i,establishmentId:g.establishmentId,reportData:{...r,summary:{...r.summary,finalValue:r.finalValue,extraDebit:r.extraDebit||0,extraCredit:r.extraCredit||0,notes:r.notes||""}}});try{if(r.finalValue>0){const n=B.establishmentConfig||{},d=n.defaultDespesaNaturezaId||n.financeConfig?.despesaNaturezaId||null,l=n.defaultDespesaCentroCustoId||n.financeConfig?.despesaCentroCustoId||null;await zo({establishmentId:g.establishmentId,description:`Comissões - ${r.period}`,amount:r.finalValue,dueDate:new Date().toISOString().split("T")[0],naturezaId:d,centroDeCustoId:l,entity:r.professionalName,paymentMethod:"dinheiro",status:"paid",paymentDate:new Date().toISOString().split("T")[0],origin:"commission"})}}catch(n){console.error("Erro ao integrar com financeiro (Despesa):",n)}});await Promise.all(o),m("Sucesso","Pagamentos registrados e integrados ao financeiro!","success"),B.calculationResult=null,Ss(),await st()}catch(o){m("Erro ao Salvar",o.message,"error"),s.innerHTML='<i class="bi bi-check2-circle text-lg"></i> Confirmar Pagtos.',s.disabled=!1}}function wc(t){B.viewMode="report-details";const e=document.getElementById("commissions-layout-detail");if(!e)return;const a=B.reports.find(u=>u.id===t);if(!a)return;const s=a.reportData?.items||a.items||[],o=a.summary,r=o.extraDebit||0,i=o.extraCredit||0,n=o.notes||"",d=`
        <div class="p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner transition-transform active:scale-95">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <h3 class="font-black text-base text-gray-800 ml-4 uppercase tracking-wider">Detalhes do Recibo</h3>
        </div>
    `,l=s.map(u=>`
        <tr class="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
            <td class="py-3 px-3 text-gray-800 font-bold whitespace-normal min-w-[150px]">${u.item}</td>
            <td class="py-3 px-3 text-gray-500 font-medium">${u.client||"--"}</td>
            <td class="py-3 px-3 text-right text-gray-600 font-bold">R$ ${(u.value||0).toFixed(2)}</td>
            <td class="py-3 px-3 text-center text-gray-600 font-black">${u.commissionRate}%</td>
            <td class="py-3 px-3 text-right font-black text-emerald-600">R$ ${(u.commissionValue||0).toFixed(2)}</td>
        </tr>
    `).join("");let c="";(r>0||i>0||n)&&(c=`
            <div class="mt-4 bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow-sm">
                <h5 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3"><i class="bi bi-sliders mr-1 text-indigo-500"></i> Ajustes Aplicados</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    ${r>0?`<div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm"><span class="text-gray-400 block text-[9px] uppercase tracking-widest font-bold mb-1">Descontos/Vales</span> <span class="font-black text-red-500 text-lg leading-none">-R$ ${r.toFixed(2)}</span></div>`:""}
                    ${i>0?`<div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm"><span class="text-gray-400 block text-[9px] uppercase tracking-widest font-bold mb-1">Bônus Extras</span> <span class="font-black text-emerald-500 text-lg leading-none">+R$ ${i.toFixed(2)}</span></div>`:""}
                </div>
                ${n?`<div class="text-xs font-bold text-gray-600 bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm"><strong class="block text-[9px] uppercase tracking-widest text-indigo-400 mb-1.5"><i class="bi bi-card-text"></i> Motivo do Ajuste</strong> ${n}</div>`:""}
            </div>
        `),e.innerHTML=`
        ${d}
        <div class="flex-grow overflow-y-auto p-4 pb-28 custom-scrollbar bg-gray-50/50">
            <div class="flex flex-col md:flex-row justify-between md:items-center bg-indigo-50 p-5 rounded-2xl border border-indigo-200 mb-4 gap-4 shadow-sm relative overflow-hidden">
                <div class="absolute right-0 top-0 bottom-0 w-2 bg-indigo-500"></div>
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-xl bg-white text-indigo-600 flex items-center justify-center font-black text-xl flex-shrink-0 shadow-sm border border-indigo-100">
                        ${sa(a.professionalName)}
                    </div>
                    <div>
                        <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-0.5">Profissional</p>
                        <p class="font-black text-indigo-900 text-xl leading-tight uppercase tracking-wider">${a.professionalName}</p>
                    </div>
                </div>
                <div class="md:text-right border-t md:border-t-0 md:border-l border-indigo-200 pt-4 md:pt-0 md:pl-5">
                    <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Período Base</p>
                    <p class="font-black text-indigo-700 text-sm bg-white px-3 py-1.5 rounded-lg shadow-sm border border-indigo-100 flex items-center justify-center md:justify-end gap-2"><i class="bi bi-calendar3 opacity-50 text-lg"></i> ${a.period}</p>
                </div>
            </div>

            <div class="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                <div class="overflow-x-auto custom-scrollbar">
                    <table class="w-full text-left text-xs whitespace-nowrap">
                        <thead class="bg-gray-50 text-gray-500 border-b border-gray-200">
                            <tr>
                                <th class="p-3.5 font-bold uppercase tracking-wider text-[10px]">Serviço / Produto</th>
                                <th class="p-3.5 font-bold uppercase tracking-wider text-[10px]">Cliente</th>
                                <th class="p-3.5 font-bold uppercase tracking-wider text-[10px] text-right">Base Calc.</th>
                                <th class="p-3.5 font-bold uppercase tracking-wider text-[10px] text-center">%</th>
                                <th class="p-3.5 font-bold uppercase tracking-wider text-[10px] text-right">Comissão</th>
                            </tr>
                        </thead>
                        <tbody>${l||'<tr><td colspan="5" class="text-center py-8 text-gray-400 font-bold text-sm">Nenhum item detalhado neste recibo.</td></tr>'}</tbody>
                    </table>
                </div>
                <div class="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center shadow-inner">
                    <span class="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Bruto Apurado</span>
                    <span class="font-black text-gray-800 text-xl drop-shadow-sm">R$ ${(o.totalCommission||0).toFixed(2)}</span>
                </div>
            </div>
            
            ${c}

            <div class="mt-4 flex justify-between items-center bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-sm relative overflow-hidden">
                <div class="absolute right-[-10px] top-[-10px] opacity-10"><i class="bi bi-check-circle-fill text-8xl text-emerald-500"></i></div>
                <div>
                    <span class="block text-[10px] font-black text-emerald-600 uppercase tracking-widest z-10 mb-1 flex items-center gap-1.5"><i class="bi bi-cash-stack text-sm"></i> Total Líquido Pago</span>
                    <span class="text-3xl font-black text-emerald-700 z-10 drop-shadow-sm">R$ ${(o.finalValue||o.totalCommission).toFixed(2)}</span>
                </div>
            </div>
        </div>

        <footer class="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)] w-full flex-shrink-0 z-50 flex gap-3">
            <button data-action="print-receipt" data-id="${a.id}" class="flex-1 py-4 bg-indigo-50 text-indigo-700 font-black text-sm rounded-xl hover:bg-indigo-100 transition-colors shadow-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-indigo-200 active:scale-95">
                <i class="bi bi-printer text-xl"></i> Imprimir Recibo
            </button>
            <button data-action="delete-report" data-id="${a.id}" class="w-14 h-auto bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors border border-red-200 shadow-sm active:scale-95" title="Excluir e Estornar">
                <i class="bi bi-trash3 text-xl"></i>
            </button>
        </footer>
    `,wr()}function kc(){if(B.reports.length===0){m("Aviso","Não há dados para exportar com os filtros atuais.","info");return}let t=B.reports;if(B.searchQuery){const a=B.searchQuery.toLowerCase();t=t.filter(s=>s.professionalName.toLowerCase().includes(a)||s.period.toLowerCase().includes(a))}const e=t.map(a=>{const s=a.summary.totalCommission,o=a.summary.extraDebit||0,r=a.summary.extraCredit||0,i=a.summary.finalValue||s;return{"Data da Apuração":new Date(a.createdAt).toLocaleDateString("pt-BR"),Profissional:a.professionalName,"Período Base":a.period,"Itens Calculados":a.summary.totalItems||0,"Valor Bruto (R$)":s,"Bônus (R$)":r,"Descontos (R$)":o,"Líquido Pago (R$)":i,"Observações/Motivo":a.summary.notes||""}});try{if(typeof XLSX>"u"){m("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const a=XLSX.utils.json_to_sheet(e),s=XLSX.utils.book_new();XLSX.utils.book_append_sheet(s,a,"Comissoes");const o=`Relatorio_Comissoes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(s,o)}catch(a){console.error(a),m("Erro","Falha ao exportar Excel.","error")}}function $c(t){const e=B.reports.find(c=>c.id===t);if(!e)return;if(!window.jspdf){m("Erro","A biblioteca de PDF não foi carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a;s.setFillColor(79,70,229),s.rect(0,0,210,40,"F"),s.setTextColor(255,255,255),s.setFontSize(22),s.setFont(void 0,"bold"),s.text("RECIBO DE COMISSÕES",105,20,{align:"center"}),s.setFontSize(10),s.text(`Data de Emissão: ${new Date().toLocaleDateString("pt-BR")}`,105,28,{align:"center"}),s.setTextColor(50,50,50),s.setFontSize(11),s.setFont(void 0,"normal"),s.text("Profissional:",15,55),s.setFont(void 0,"bold"),s.text(e.professionalName,40,55),s.setFont(void 0,"normal"),s.text("Período:",130,55),s.setFont(void 0,"bold"),s.text(e.period,147,55);const o=e.reportData?.items||e.items||[];let r=70;if(o.length>0){const c=o.map(u=>[u.item||"Item",u.client||"--",`R$ ${(u.value||0).toFixed(2)}`,`${u.commissionRate||0}%`,`R$ ${(u.commissionValue||0).toFixed(2)}`]);s.autoTable({startY:r,head:[["Serviço/Produto","Cliente","Valor Base","Taxa","Comissão"]],body:c,theme:"striped",headStyles:{fillColor:[249,250,251],textColor:[75,85,99],fontStyle:"bold"},styles:{fontSize:8},columnStyles:{2:{halign:"right"},3:{halign:"center"},4:{halign:"right",fontStyle:"bold",textColor:[5,150,105]}}}),r=s.lastAutoTable.finalY+15}const i=e.summary,n=i.finalValue||i.totalCommission,d=[["Comissões Brutas (Soma dos Itens)",`R$ ${i.totalCommission.toFixed(2)}`]];i.extraCredit>0&&d.push(["(+) Bônus Extras",`R$ ${i.extraCredit.toFixed(2)}`]),i.extraDebit>0&&d.push(["(-) Descontos / Vales",`R$ ${i.extraDebit.toFixed(2)}`]),s.autoTable({startY:r,head:[["Resumo do Fechamento","Valor"]],body:d,theme:"grid",headStyles:{fillColor:[79,70,229],textColor:[255,255,255]},columnStyles:{1:{halign:"right",fontStyle:"bold"}}});const l=s.lastAutoTable.finalY+15;s.setFillColor(236,253,245),s.rect(120,l-8,75,15,"F"),s.setTextColor(5,150,105),s.setFontSize(14),s.setFont(void 0,"bold"),s.text(`Total Líquido: R$ ${n.toFixed(2)}`,190,l,{align:"right"}),i.notes&&(s.setTextColor(100,100,100),s.setFontSize(9),s.setFont(void 0,"normal"),s.text(`Obs/Motivo: ${i.notes}`,15,l+10)),s.setTextColor(150,150,150),s.setFontSize(9),s.line(20,l+40,90,l+40),s.text("Assinatura da Empresa",55,l+45,{align:"center"}),s.line(120,l+40,190,l+40),s.text("Assinatura do Profissional",155,l+45,{align:"center"}),s.save(`Recibo_Comissoes_${e.professionalName.replace(/\s+/g,"_")}.pdf`)}async function Sc(){const t=B.selectedIds.size;if(!(t===0||!await Y("Excluir Recibos",`Deseja excluir e estornar ${t} recibo(s)? As vendas associadas voltarão ao status "A Apurar".`)))try{const a=Array.from(B.selectedIds).map(s=>yr(s));await Promise.all(a),m("Sucesso",`${t} recibos excluídos com sucesso.`,"success"),B.selectedIds.clear(),$t(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),await st()}catch{m("Erro ao Excluir","Ocorreu um erro ao excluir alguns recibos.","error")}}async function Ec(t){if(await Y("Excluir Recibo",'ATENÇÃO: Deseja realmente excluir este recibo? As vendas associadas a ele voltarão ao status "A Apurar" e o valor será subtraído dos relatórios. Esta ação não pode ser desfeita.'))try{await yr(t),m("Sucesso","Recibo cancelado com sucesso. Vendas estornadas para apuração.","success"),Ss(),await st()}catch(a){m("Erro ao Excluir",a.message,"error")}}const De=document.getElementById("content");let O={allPackages:[],catalogForModal:{services:[],products:[]},establishments:[],filterEstablishmentIds:new Set,searchQuery:"",statusFilter:"all",viewMode:"list",tempPackage:null},Oe=null;function ot(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function Ic(){const t=O.allPackages.length,e=O.allPackages.filter(r=>r.status!=="inactive"),a=e.length,s=a>0?e.reduce((r,i)=>r+(i.price||0),0)/a:0;let o=0;return e.forEach(r=>{const i=r.originalPrice||0,n=r.price||0;if(i>0&&i>n){const d=(i-n)/i*100;d>o&&(o=d)}}),{total:t,activeCount:a,avgPrice:s,maxDiscount:o}}function Lc(){const t=document.getElementById("packages-layout-main"),e=document.getElementById("packages-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&t.classList.add("mobile-detail-open"),e&&(e.classList.remove("hidden"),e.classList.add("flex")),a&&(a.style.display="none")}function Ka(){const t=document.getElementById("packages-layout-main"),e=document.getElementById("packages-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&t.classList.remove("mobile-detail-open"),e&&(e.classList.add("hidden"),e.classList.remove("flex")),a&&(a.style.display="")}async function Cc(){try{const e=(await xe().catch(()=>({matrizes:[]}))).matrizes||[];O.establishments=[],e.forEach(a=>{O.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>O.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),O.filterEstablishmentIds.size===0&&O.filterEstablishmentIds.add(g.establishmentId)}catch(t){console.error("Erro ao buscar hierarquia de empresas",t)}O.viewMode="list",Dc(),Ac(),await oa()}async function oa(){const t=document.getElementById("packagesListContainer");t&&(t.innerHTML='<div class="col-span-full flex justify-center py-20"><div class="loader"></div></div>');try{const e=Array.from(O.filterEstablishmentIds).map(i=>gs(i).catch(()=>[])),a=await Promise.all(e),s=new Map;a.flat().forEach(i=>{s.has(i.id)||s.set(i.id,i)}),O.allPackages=Array.from(s.values());const[o,r]=await Promise.all([nt(g.establishmentId).catch(()=>[]),lt(g.establishmentId).catch(()=>[])]);O.catalogForModal={services:(o||[]).filter(i=>i.active),products:r||[]},Tc(),Za()}catch(e){console.error(e),t&&(t.innerHTML=`
                <div class="col-span-full flex flex-col items-center justify-center py-16 text-slate-500">
                    <i class="bi bi-exclamation-triangle text-4xl text-red-400 mb-3"></i>
                    <p class="text-xs font-bold">Erro ao carregar os pacotes. Tente novamente.</p>
                </div>
            `)}}function Dc(){const t=O.establishments.map(e=>`
        <label class="inline-flex items-center gap-1.5 px-2 py-1 bg-white border ${O.filterEstablishmentIds.has(e.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-slate-200 text-slate-600"} rounded-lg cursor-pointer hover:bg-slate-50 transition-all shadow-sm est-label select-none flex-shrink-0">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${e.id}" ${O.filterEstablishmentIds.has(e.id)?"checked":""}>
            <span class="text-[9px] font-bold whitespace-nowrap">${e.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${e.name}</span>
        </label>
    `).join("");De.innerHTML=`
        <style id="packages-mobile-css">
            @media (max-width: 767px) {
                .mobile-detail-open #packages-layout-main { display: none !important; }
                #packages-layout-main:not(.mobile-detail-open) #packages-layout-detail { display: none !important; }
                .mobile-detail-open #packages-layout-detail {
                    display: flex !important;
                    position: fixed !important;
                    top: 0; left: 0; right: 0; bottom: 0;
                    height: 100dvh !important;
                    width: 100vw !important;
                    z-index: 99999 !important;
                    background-color: #f8fafc !important;
                    flex-direction: column !important;
                }
            }
            #toast-container, .toast-notification, .modal, .modal-backdrop { z-index: 9999999 !important; }
        </style>
        
        <div class="h-full flex w-full relative overflow-hidden bg-slate-50">
            <section id="packages-layout-main" class="flex-1 flex flex-col p-2 md:p-4 md:pl-6 w-full relative overflow-y-auto custom-scrollbar">
                
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 animate-fade-in w-full">
                    <div class="relative w-full md:w-96 flex-shrink-0">
                        <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input type="text" id="search-packages" placeholder="Buscar pacotes..." class="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-xs font-semibold text-slate-700">
                    </div>
                    
                    <div class="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
                        <select id="filter-status" class="py-2 px-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-indigo-500 text-[10px] font-bold text-slate-700 shadow-sm cursor-pointer col-span-2 md:col-span-1">
                            <option value="all">Todos os Status</option>
                            <option value="active">Apenas Ativos</option>
                            <option value="inactive">Apenas Inativos</option>
                        </select>
                        <button id="export-excel-btn" class="py-2 px-2 bg-white border border-slate-200 text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition shadow-sm flex items-center justify-center gap-1.5 text-[10px] active:scale-95">
                            <i class="bi bi-file-earmark-excel-fill text-sm"></i> Excel
                        </button>
                        <button data-action="new-package" class="py-2 px-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-sm flex items-center justify-center gap-1.5 text-[10px] active:scale-95 uppercase tracking-wider">
                            <i class="bi bi-plus-lg text-sm"></i> Criar Pacote
                        </button>
                    </div>
                </div>

                ${O.establishments.length>1?`
                <div class="mb-2 animate-fade-in flex gap-1.5 overflow-x-auto custom-scrollbar pb-1" id="establishment-filters-container">
                    ${t}
                </div>
                `:""}

                <div id="kpi-container" class="grid grid-cols-4 gap-1.5 md:gap-3 mb-2 animate-fade-in w-full"></div>

                <div id="packagesListContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 pb-20 mt-2"></div>
                
            </section>

            <div id="packages-layout-detail" class="hidden absolute inset-0 z-50 bg-slate-50 flex-col overflow-hidden w-full h-full md:relative md:inset-auto md:z-auto md:flex-1 md:border-l md:border-slate-200">
                </div>
        </div>
    `}function Tc(){const t=Ic(),e=document.getElementById("kpi-container");e&&(e.innerHTML=`
        <div class="bg-white p-1.5 md:p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Total</span>
            <span class="text-xs md:text-lg font-black text-slate-800 mt-0.5 w-full truncate">${t.total}</span>
        </div>
        <div class="bg-white p-1.5 md:p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Ativos</span>
            <span class="text-xs md:text-lg font-black text-emerald-600 mt-0.5 w-full truncate">${t.activeCount}</span>
        </div>
        <div class="bg-white p-1.5 md:p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Desconto</span>
            <span class="text-xs md:text-lg font-black text-red-500 mt-0.5 w-full truncate">${t.maxDiscount.toFixed(0)}%</span>
        </div>
        <div class="bg-white p-1.5 md:p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Ticket</span>
            <span class="text-xs md:text-lg font-black text-indigo-600 mt-0.5 w-full truncate">${ot(t.avgPrice)}</span>
        </div>
    `)}function Za(){const t=document.getElementById("packagesListContainer");if(!t)return;let e=O.allPackages;if(O.statusFilter!=="all"){const s=O.statusFilter==="active";e=e.filter(o=>o.status!=="inactive"===s)}if(O.searchQuery){const s=O.searchQuery.toLowerCase();e=e.filter(o=>o.name.toLowerCase().includes(s)||(o.description||"").toLowerCase().includes(s))}if(e.length===0){t.innerHTML=`
            <div class="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
                <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-box2 text-2xl text-slate-300"></i>
                </div>
                <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhum pacote encontrado</h3>
                <p class="text-[10px] text-slate-500 mb-4 max-w-sm text-center">Não existem pacotes com os filtros selecionados.</p>
                <button data-action="new-package" class="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-lg hover:bg-indigo-100 transition-colors text-[10px] uppercase tracking-wider">
                    Criar Pacote
                </button>
            </div>
        `;return}const a=new Map(O.establishments.map(s=>[s.id,s]));t.innerHTML=e.map(s=>{const o=s.status!=="inactive",r=s.price||0,i=s.originalPrice||0,n=i>0&&i>r?(i-r)/i*100:0,d=v(s.name),l=v(s.description||"Nenhuma descrição detalhada."),c=(s.items||[]).reduce((h,y)=>h+(y.quantity||1),0),u=s.validityDays?`${s.validityDays} dias p/ uso`:"Uso vitalício",p=s.sellEndDate?`Até ${new Date(s.sellEndDate).toLocaleDateString("pt-BR")}`:"Venda contínua",b=s.establishmentIds||(s.establishmentId?[s.establishmentId]:[]);let f="";if(b.length===1){const h=a.get(b[0]);h&&(f=`<span class="text-[8px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200 flex items-center w-max"><i class="bi ${h.type==="Matriz"?"bi-building":"bi-shop"} mr-1 opacity-50"></i> ${h.name}</span>`)}else b.length>1&&(f=`<span class="text-[8px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 flex items-center w-max"><i class="bi bi-buildings mr-1 opacity-50"></i> ${b.length} Unidades</span>`);return`
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300 flex flex-col relative overflow-hidden group cursor-pointer active:scale-[0.98]"
                 data-action="edit-package" data-id="${s.id}">
                
                ${n>0?`<div class="absolute -right-7 top-3 bg-red-500 text-white text-[9px] font-black uppercase tracking-wider py-0.5 px-8 transform rotate-45 shadow-sm z-10">${n.toFixed(0)}% OFF</div>`:""}

                <div class="p-4 flex-grow">
                    <div class="flex justify-between items-start pr-6 mb-2">
                        <div class="flex flex-col gap-1">
                            <div class="flex items-center gap-1.5">
                                <span class="w-2 h-2 rounded-full ${o?"bg-emerald-500":"bg-slate-300"}"></span>
                                <span class="text-[9px] font-bold ${o?"text-emerald-600":"text-slate-500"} uppercase tracking-widest">${o?"Ativo":"Inativo"}</span>
                            </div>
                            ${f}
                        </div>
                    </div>
                    
                    <h3 class="text-base font-black text-slate-800 leading-tight line-clamp-1 mb-1">${d}</h3>
                    <p class="text-[10px] text-slate-500 line-clamp-2 min-h-[1.5rem] mb-3">${l}</p>

                    <div class="bg-slate-50 rounded-xl p-2.5 mb-3 border border-slate-100 flex justify-between items-center">
                        <div class="flex flex-col">
                            <span class="text-[9px] font-bold text-slate-400 uppercase">Conteúdo</span>
                            <span class="text-[11px] font-black text-indigo-600">${c} Itens</span>
                        </div>
                        <div class="flex flex-col text-right">
                            <span class="text-[9px] font-bold text-slate-400 uppercase">Validade</span>
                            <span class="text-[10px] font-semibold text-slate-700">${u}</span>
                        </div>
                    </div>

                    <div class="flex justify-between items-end">
                        <div>
                            ${n>0?`<p class="text-[9px] text-slate-400 font-bold line-through mb-0.5">De ${ot(i)}</p>`:""}
                            <p class="text-xl font-black text-slate-900 leading-none">${ot(r)}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-[8px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-calendar-event mr-0.5"></i>${p}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}).join("")}function Pc(){if(O.allPackages.length===0){m("Aviso","Não há pacotes carregados para exportar.","info");return}let t=O.allPackages;if(O.statusFilter!=="all"){const s=O.statusFilter==="active";t=t.filter(o=>o.status!=="inactive"===s)}if(O.searchQuery){const s=O.searchQuery.toLowerCase();t=t.filter(o=>o.name.toLowerCase().includes(s)||(o.description||"").toLowerCase().includes(s))}if(t.length===0){m("Aviso","Nenhum pacote corresponde aos filtros atuais.","info");return}const e=new Map(O.establishments.map(s=>[s.id,s.name])),a=t.map(s=>{const o=s.originalPrice||0,r=s.price||0,i=o>0?(o-r)/o*100:0,n=(s.items||[]).map(c=>`${c.quantity}x ${c.name}`).join(" | ");return{"Unidade(s)":(s.establishmentIds||(s.establishmentId?[s.establishmentId]:[])).map(c=>e.get(c)).filter(Boolean).join(", ")||"Não identificada","Nome do Pacote":s.name,Status:s.status!=="inactive"?"Ativo":"Inativo",Descrição:s.description||"","Itens Incluídos":n,"Valor Original (R$)":o,"Preço de Venda (R$)":r,"Desconto (%)":i.toFixed(1)+"%","Comissão (%)":s.commissionRate||0,"Validade de Uso (Dias)":s.validityDays||"Vitalício","Vendas Início":s.sellStartDate?new Date(s.sellStartDate).toLocaleDateString("pt-BR"):"-","Vendas Fim":s.sellEndDate?new Date(s.sellEndDate).toLocaleDateString("pt-BR"):"-"}});try{if(typeof XLSX>"u"){m("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const s=XLSX.utils.json_to_sheet(a),o=XLSX.utils.book_new();XLSX.utils.book_append_sheet(o,s,"Pacotes");const r=`Relatorio_Pacotes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(o,r)}catch(s){console.error(s),m("Erro","Falha ao exportar Excel.","error")}}function Xs(t=null){O.viewMode="edit-package",O.tempPackage=t?JSON.parse(JSON.stringify(t)):{id:"",name:"",description:"",status:"active",items:[],price:"",originalPrice:0,commissionRate:0,validityDays:"",sellStartDate:"",sellEndDate:"",salesLimit:"",establishmentIds:[g.establishmentId]},ts(),Lc()}function $r(){const t=document.getElementById("packages-layout-detail");if(!t)return;const a=(O.tempPackage.items||[]).reduce((n,d)=>n+(d.price||0)*(d.quantity||1),0),s=t.querySelector("#finalPrice"),o=t.querySelector("#discountIndicator"),r=t.querySelector("#originalPrice"),i=parseFloat(s?.value)||0;if(r&&(r.textContent=ot(a)),o)if(a>0&&a>i&&i>0){const n=(a-i)/a*100;o.textContent=`${n.toFixed(0)}% OFF`,o.classList.remove("hidden")}else o.classList.add("hidden")}function es(){const t=document.getElementById("package-items-list");if(!t)return;const e=O.tempPackage.items||[];e.length===0?t.innerHTML=`
            <div class="text-center py-8 text-slate-400 flex flex-col items-center">
                <i class="bi bi-inbox text-3xl mb-2 opacity-50"></i>
                <p class="text-[10px] font-bold uppercase tracking-widest">Nenhum item adicionado</p>
                <p class="text-[9px] mt-1 text-slate-400">Clique no botão acima para compor o pacote</p>
            </div>`:t.innerHTML=e.map((a,s)=>{const o=a.type==="service",r=o?"bi-scissors":"bi-box",i=o?"bg-indigo-100 text-indigo-700 border-indigo-200":"bg-emerald-100 text-emerald-700 border-emerald-200";return`
            <div class="flex items-center justify-between bg-white p-2.5 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors animate-fade-in-fast mb-2">
                <div class="flex items-center gap-3 min-w-0 flex-1">
                    <div class="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 shadow-inner">
                        <span class="text-[8px] font-bold text-slate-400 uppercase leading-none mb-0.5">Qtd</span>
                        <input type="number" value="${a.quantity}" min="1" class="w-10 text-center bg-transparent text-sm font-black text-slate-700 outline-none quantity-input" data-index="${s}">
                    </div>
                    <div class="min-w-0">
                        <div class="flex items-center gap-1.5 mb-1">
                            <span class="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${i} flex items-center gap-1"><i class="bi ${r}"></i> ${o?"Serviço":"Produto"}</span>
                        </div>
                        <p class="font-bold text-slate-800 text-xs truncate leading-tight">${v(a.name)}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3 flex-shrink-0 pl-2">
                    <div class="text-right">
                        <span class="block text-[8px] font-bold text-slate-400 uppercase">Valor Un.</span>
                        <span class="text-xs font-black text-slate-700">${ot(a.price)}</span>
                    </div>
                    <button type="button" class="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors remove-item-btn" data-index="${s}">
                        <i class="bi bi-trash3 pointer-events-none"></i>
                    </button>
                </div>
            </div>
        `}).join(""),$r()}function ts(){const t=document.getElementById("packages-layout-detail");if(!t)return;const e=O.tempPackage,a=!!e.id,s=v(e.name||""),o=v(e.description||""),r=e.price||"",i=e.commissionRate||0,n=e.validityDays||"",d=e.sellStartDate?new Date(e.sellStartDate).toISOString().split("T")[0]:"",l=e.sellEndDate?new Date(e.sellEndDate).toISOString().split("T")[0]:"",c=e.salesLimit||"",u=e.establishmentIds||[],p=O.establishments.map(f=>`
        <label class="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors cursor-pointer group">
            <input type="checkbox" class="modal-est-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4" value="${f.id}" ${u.includes(f.id)?"checked":""}>
            <span class="text-xs font-semibold text-slate-700 truncate group-hover:text-indigo-700" title="${f.name}">${f.type==="Matriz"?"🏢":"📍"} ${f.name}</span>
        </label>
    `).join(""),b=`
        <div class="p-4 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="back-to-main" class="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 shadow-inner transition-transform active:scale-95">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <h3 class="font-black text-base text-slate-800 ml-4 uppercase tracking-wider">${a?"Editar Pacote":"Novo Pacote"}</h3>
            ${a?`
                <button data-action="delete-package" data-id="${e.id}" class="ml-auto w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 shadow-inner transition-transform active:scale-95">
                    <i class="bi bi-trash3 text-lg"></i>
                </button>
            `:""}
        </div>
    `;t.innerHTML=`
        ${b}
        <div class="flex-grow overflow-y-auto p-3 md:p-6 custom-scrollbar bg-slate-50/50 pb-28">
            <form id="package-form" class="max-w-3xl mx-auto space-y-4 md:space-y-6">
                
                <div>
                    <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1.5"><i class="bi bi-info-circle text-indigo-400"></i> Informações Básicas</h3>
                    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <div class="md:col-span-3">
                                <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Nome Comercial do Pacote *</label>
                                <input type="text" id="packageName" value="${s}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none font-black text-slate-800 text-sm shadow-inner" placeholder="Ex: Combo Verão, Especial Noivas..." required>
                            </div>
                            <div class="md:col-span-1">
                                <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Status</label>
                                <select id="packageStatus" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none font-bold text-slate-800 text-xs shadow-inner">
                                    <option value="active" ${e.status!=="inactive"?"selected":""}>Ativo</option>
                                    <option value="inactive" ${e.status==="inactive"?"selected":""}>Inativo</option>
                                </select>
                            </div>
                            
                            <div class="md:col-span-4 mt-2 border-t border-slate-100 pt-3">
                                <div class="flex justify-between items-center mb-2">
                                    <label class="block text-[9px] font-bold text-slate-500 uppercase">Unidades Disponíveis *</label>
                                    <button type="button" data-action="toggle-all-ests" class="text-[8px] font-black text-indigo-500 hover:text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100">Selecionar Todas</button>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto custom-scrollbar p-1">
                                    ${p}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Descrição para o Cliente (Opcional)</label>
                            <textarea id="packageDescription" rows="2" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none text-xs font-medium text-slate-700 resize-none shadow-inner" placeholder="Descreva os benefícios e condições do pacote...">${o}</textarea>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="flex justify-between items-center mb-2 ml-1">
                        <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><i class="bi bi-layers text-indigo-400"></i> Composição do Pacote</h3>
                        <button type="button" data-action="add-item-to-package-btn" class="py-1.5 px-3 bg-indigo-100 text-indigo-700 font-black rounded-lg text-[9px] hover:bg-indigo-200 transition shadow-sm flex items-center gap-1 uppercase tracking-wider">
                            <i class="bi bi-plus-lg"></i> Inserir Serviço/Produto
                        </button>
                    </div>
                    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div id="package-items-list" class="max-h-64 overflow-y-auto custom-scrollbar bg-slate-50/50 p-2 min-h-[5rem]">
                            </div>
                        <div class="bg-slate-100 p-3.5 border-t border-slate-200 flex justify-between items-center shadow-inner">
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Soma Original</span>
                            <span id="originalPrice" class="text-lg font-black text-slate-800">R$ 0,00</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1.5"><i class="bi bi-currency-dollar text-indigo-400"></i> Regras e Precificação</h3>
                    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div class="col-span-2 relative">
                                <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Preço Final *</label>
                                <div class="relative">
                                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600 font-black text-lg">R$</span>
                                    <input type="number" step="0.01" id="finalPrice" value="${r}" class="w-full pl-10 p-3 bg-indigo-50 border border-indigo-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none font-black text-xl text-indigo-800 shadow-inner" required placeholder="0.00">
                                </div>
                                <p id="discountIndicator" class="absolute right-0 -top-5 text-[10px] font-bold text-white bg-red-500 px-2 py-0.5 rounded shadow-sm hidden">0% OFF</p>
                            </div>
                            
                            <div>
                                <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Comissão (%)</label>
                                <input type="number" id="commissionRate" value="${i}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none font-black text-sm text-slate-700 shadow-inner" placeholder="Ex: 10">
                            </div>

                            <div>
                                <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1" title="Prazo para usar os itens após a compra">Validade (Dias)</label>
                                <div class="relative">
                                    <input type="number" id="validityDays" value="${n}" class="w-full p-3 pr-10 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none font-black text-sm text-slate-700 shadow-inner" placeholder="Vitalício">
                                    <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[9px] font-bold text-slate-400 uppercase">Dias</span>
                                </div>
                            </div>
                        </div>

                        <div class="border-t border-slate-100 pt-4 mt-2">
                            <p class="text-[9px] font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-1"><i class="bi bi-lightning-charge"></i> Gatilhos de Venda (Opcional)</p>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <div>
                                    <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Início da Venda</label>
                                    <input type="date" id="sellStartDate" value="${d}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none text-[10px] font-bold text-slate-700 shadow-inner">
                                </div>
                                <div>
                                    <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Fim da Venda</label>
                                    <input type="date" id="sellEndDate" value="${l}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none text-[10px] font-bold text-slate-700 shadow-inner">
                                </div>
                                <div class="col-span-2 md:col-span-1">
                                    <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Limite de Estoque</label>
                                    <input type="number" id="salesLimit" value="${c}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none font-black text-slate-700 text-xs shadow-inner" placeholder="Qtd máxima">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>

        <footer class="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)] w-full flex-shrink-0 z-50 flex gap-3">
            <button data-action="save-package" class="w-full py-4 bg-indigo-600 text-white font-black text-sm rounded-xl hover:bg-indigo-700 shadow-md transition-transform active:scale-95 uppercase tracking-wider flex justify-center items-center gap-2">
                <i class="bi bi-save2 text-lg"></i> Salvar Pacote
            </button>
        </footer>
    `,es()}function Bc(){O.viewMode="select-item";const t=document.getElementById("packages-layout-detail");if(!t)return;const e=`
        <div class="p-4 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="back-to-editor" class="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 shadow-inner transition-transform active:scale-95">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <h3 class="font-black text-base text-slate-800 ml-4 uppercase tracking-wider">Catálogo</h3>
        </div>
    `;t.innerHTML=`
        ${e}
        <div class="flex-grow overflow-y-auto p-3 md:p-6 custom-scrollbar bg-slate-50/50 flex flex-col">
            <div class="relative mb-4 flex-shrink-0 max-w-3xl mx-auto w-full">
                <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg"></i>
                <input type="search" id="item-search-input" placeholder="Pesquisar produto ou serviço..." class="w-full pl-12 p-3.5 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white transition-colors shadow-sm font-bold text-slate-700">
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow overflow-y-auto max-w-3xl mx-auto w-full pb-8">
                <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h4 class="font-black mb-3 text-center text-[10px] uppercase tracking-widest text-indigo-600 bg-indigo-50 py-2 rounded-xl border border-indigo-100"><i class="bi bi-scissors mr-1"></i> Serviços</h4>
                    <div id="catalog-service-list" class="space-y-2 flex-grow overflow-y-auto custom-scrollbar pr-1"></div>
                </div>
                <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h4 class="font-black mb-3 text-center text-[10px] uppercase tracking-widest text-emerald-600 bg-emerald-50 py-2 rounded-xl border border-emerald-100"><i class="bi bi-box-seam mr-1"></i> Produtos</h4>
                    <div id="catalog-product-list" class="space-y-2 flex-grow overflow-y-auto custom-scrollbar pr-1"></div>
                </div>
            </div>
        </div>
    `;const a=(o="")=>{const r=o.toLowerCase(),i={service:'<i class="bi bi-scissors text-indigo-600"></i>',product:'<i class="bi bi-box-seam text-emerald-600"></i>'},n={"catalog-service-list":{items:O.catalogForModal.services,type:"service"},"catalog-product-list":{items:O.catalogForModal.products,type:"product"}};Object.entries(n).forEach(([d,{items:l,type:c}])=>{const u=t.querySelector("#"+d);if(!u)return;const p=l.filter(h=>h.name.toLowerCase().includes(r)).slice(0,50),b=c==="service"?"hover:border-indigo-300 hover:bg-indigo-50/50":"hover:border-emerald-300 hover:bg-emerald-50/50",f=c==="service"?"bg-indigo-100 border-indigo-200":"bg-emerald-100 border-emerald-200";u.innerHTML=p.map(h=>h.id?`
                <button data-action="select-catalog-item" data-item-type="${c}" data-item-id="${h.id}" class="flex items-center gap-3 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl ${b} shadow-sm transition-all text-left group active:scale-95">
                    <div class="flex-shrink-0 w-9 h-9 rounded-lg ${f} flex items-center justify-center text-base border group-hover:scale-105 transition-transform">${i[c]}</div>
                    <div class="flex-grow min-w-0">
                        <span class="block text-xs font-bold text-slate-800 truncate">${v(h.name)}</span>
                        <span class="block font-black text-[10px] text-slate-500 mt-0.5">${ot(h.price)}</span>
                    </div>
                    <i class="bi bi-plus-circle-fill text-indigo-500 text-lg opacity-20 group-hover:opacity-100 transition-opacity pr-1"></i>
                </button>
            `:"").join("")||'<p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center py-6 border border-dashed border-slate-200 rounded-xl">Vazio</p>'})};a();const s=t.querySelector("#item-search-input");s&&(s.addEventListener("input",debounce(o=>{a(o.target.value)},300)),setTimeout(()=>s.focus(),100))}function Ac(){Oe&&(De.removeEventListener("click",Oe),De.removeEventListener("input",Oe),De.removeEventListener("change",Oe)),Oe=async e=>{const a=e.target.closest('[data-action="delete-package"]');if(a){e.stopPropagation(),e.preventDefault();const r=a.dataset.id;if(await Y("Excluir Pacote","Tem a certeza que deseja excluir este pacote promocional? Esta ação é irreversível."))try{await yn(r),m("Sucesso!","Pacote excluído.","success"),O.viewMode==="edit-package"&&O.tempPackage?.id===r&&(Ka(),O.viewMode="list"),await oa()}catch(n){m("Erro",`Não foi possível excluir: ${n.message}`,"error")}return}const s=e.target.closest("[data-action]");if(!s)return;switch(s.dataset.action){case"new-package":Xs(null);break;case"edit-package":const r=s.dataset.id,i=O.allPackages.find(b=>b.id===r);i&&Xs(i);break;case"back-to-main":Ka(),O.viewMode="list",O.tempPackage=null;break;case"add-item-to-package-btn":Bc();break;case"back-to-editor":ts();break;case"select-catalog-item":const{itemType:n,itemId:d}=s.dataset,c=(O.catalogForModal[n+"s"]||[]).find(b=>b.id===d);if(c){const b=O.tempPackage.items.find(f=>f.id===c.id&&f.type===n);b?b.quantity++:O.tempPackage.items.push({...c,type:n,quantity:1}),ts()}break;case"toggle-all-ests":const u=document.querySelectorAll(".modal-est-checkbox"),p=Array.from(u).every(b=>b.checked);u.forEach(b=>b.checked=!p);break;case"save-package":await Mc(s);break}},De.addEventListener("click",Oe),De.addEventListener("input",e=>{e.target.id==="search-packages"&&(O.searchQuery=e.target.value,Za()),e.target.id==="finalPrice"&&$r()}),De.addEventListener("change",e=>{if(e.target.id==="filter-status"&&(O.statusFilter=e.target.value,Za()),e.target.classList.contains("quantity-input")){const a=parseInt(e.target.dataset.index,10),s=parseInt(e.target.value,10);s>0&&O.tempPackage.items[a]&&(O.tempPackage.items[a].quantity=s,es())}if(e.target.classList.contains("est-filter-checkbox")&&e.target.closest("#establishment-filters-container")){const a=e.target.closest("label");e.target.checked?(O.filterEstablishmentIds.add(e.target.value),a.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),a.classList.remove("border-slate-200","text-slate-600")):(O.filterEstablishmentIds.delete(e.target.value),a.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),a.classList.add("border-slate-200","text-slate-600")),oa()}});const t=document.getElementById("export-excel-btn");t&&t.addEventListener("click",Pc),De.addEventListener("click",e=>{const a=e.target.closest(".remove-item-btn");if(a&&O.viewMode==="edit-package"){const s=parseInt(a.dataset.index,10);O.tempPackage.items.splice(s,1),es()}})}async function Mc(t){const e=O.tempPackage,a=!!e.id,s=document.getElementById("packages-layout-detail");if(!s)return;const o=Array.from(s.querySelectorAll(".modal-est-checkbox:checked")).map(d=>d.value);if(o.length===0){m("Atenção","Selecione pelo menos uma unidade para o pacote.","warning");return}const r=e.items.reduce((d,l)=>d+l.price*l.quantity,0),i={id:e.id||null,name:s.querySelector("#packageName").value,description:s.querySelector("#packageDescription").value,status:s.querySelector("#packageStatus").value,items:e.items,originalPrice:r,price:parseFloat(s.querySelector("#finalPrice").value),commissionRate:parseFloat(s.querySelector("#commissionRate").value)||0,validityDays:parseInt(s.querySelector("#validityDays").value,10)||null,sellStartDate:s.querySelector("#sellStartDate").value||null,sellEndDate:s.querySelector("#sellEndDate").value||null,salesLimit:parseInt(s.querySelector("#salesLimit").value,10)||null,establishmentIds:o,establishmentId:o[0]};if(!i.name||isNaN(i.price)){m("Erro","Nome do Pacote e Preço Final são obrigatórios.","warning");return}if(i.items.length===0){m("Erro","Adicione pelo menos um serviço ou produto ao pacote.","warning");return}const n=t.innerHTML;t.disabled=!0,t.innerHTML='<div class="loader-small border-white mr-2"></div> Salvando...';try{a?await vn(i.id,i):(delete i.id,await hn(i)),m("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),Ka(),O.viewMode="list",O.tempPackage=null,await oa()}catch(d){m("Erro",`Não foi possível salvar o pacote: ${d.message}`,"error"),t.disabled=!1,t.innerHTML=n}}const qc=document.getElementById("content");let jc=null;async function Nc(){const t=v(g.userName||"Usuário"),e=v(ge.currentUser?.email||"E-mail não disponível"),a=g.userName?g.userName.charAt(0):"U";qc.innerHTML=`
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
                        <h3 class="text-2xl font-bold text-gray-800 mt-4">${t}</h3>
                        <p class="text-md text-gray-600">${e}</p>
                    </div>
                </div>
            </div>

            <div class="md:col-span-2">
                 <div id="professional-agenda-block" class="p-4 md:p-6 bg-white rounded-lg shadow-md space-y-6">
                    <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
                </div>
            </div>
        </div>
    `,await Rc()}async function Rc(){const t=document.getElementById("professional-agenda-block");t.innerHTML="";try{const e=g.userProfessionalId;if(e){const a=await _i(e);jc=a,a.photo&&(document.getElementById("user-profile-avatar").src=a.photo);const s=v(a.name);t.innerHTML=`
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
            `,Fc(a.id),document.getElementById("my-blocks-filter").addEventListener("change",r=>ra(a.id,r.target.value)),ra(a.id,"future")}else t.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(e){console.error("Erro ao carregar seção de profissional:",e),t.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${v(e.message)}</p>
            </div>
        `}}function Fc(t){const e=document.getElementById("block-schedule-form");e.addEventListener("submit",async a=>{a.preventDefault();const s=e.querySelector("#blockDate").value,o=e.querySelector("#blockStartTime").value,r=e.querySelector("#blockEndTime").value,i=e.querySelector("#blockReason").value;if(!s||!o||!r){m("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(o>=r){m("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const n=new Date(`${s}T${o}:00`),d=new Date(`${s}T${r}:00`),l=e.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="A bloquear...";try{await ca({establishmentId:g.establishmentId,professionalId:t,reason:i||"Bloqueado (Meu Perfil)",startTime:n.toISOString(),endTime:d.toISOString()}),m("Sucesso","Agenda bloqueada com sucesso!","success"),e.reset();const c=document.getElementById("my-blocks-filter").value;ra(t,c)}catch(c){console.error("Erro ao bloquear agenda:",c),m("Erro",`Não foi possível bloquear a agenda: ${c.message}`,"error")}finally{l.disabled=!1,l.textContent="Bloquear Agenda"}})}async function ra(t,e="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const s=new Date;let o,r;e==="history"?(r=new Date,o=new Date,o.setFullYear(o.getFullYear()-1)):(o=new Date,r=new Date,r.setFullYear(r.getFullYear()+1));let n=(await da(g.establishmentId,o.toISOString(),r.toISOString(),t)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));e==="history"?n=n.filter(d=>d.endTime<s).sort((d,l)=>l.startTime-d.startTime):n=n.filter(d=>d.endTime>=s).sort((d,l)=>d.startTime-l.startTime),n.length>0?(a.innerHTML=n.map(d=>{const l=d.startTime.toLocaleDateString("pt-BR"),c=`${d.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${d.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`,u=d.endTime<new Date,p=v(d.reason||"Sem motivo");return`
                    <div class="flex items-center justify-between p-3 ${u?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${l} das ${c}</p>
                            <p class="text-sm text-gray-600">${p}</p>
                        </div>
                        <button data-block-id="${d.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(d=>{d.addEventListener("click",async l=>{const c=l.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await ds(c),m("Sucesso","Bloqueio removido.","success"),ra(t,e)}catch(u){console.error("Erro ao remover bloqueio:",u),m("Erro",`Não foi possível remover o bloqueio: ${u.message}`,"error")}})})):a.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${e==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(s){console.error("Erro ao carregar bloqueios:",s),a.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${v(s.message)}</p>`}}let Ys=!1;async function ia(t){if(!t)return;t.innerHTML=`
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
    `;const e=document.getElementById("hierarchy-list-container"),a=document.getElementById("est-parent");try{const o=(await xe()).matrizes||[];if(a&&(a.innerHTML='<option value="">Nenhuma (Criar como Matriz Independente)</option>'),o.length===0)e.innerHTML=`
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
                `}),e.innerHTML=r}Ys||(Hc(),Ys=!0)}catch(s){console.error("Erro na renderização da rede:",s),e.innerHTML=`
            <div class="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100 text-center">
                <i class="bi bi-exclamation-triangle text-2xl mb-2 block"></i>
                <p class="font-bold text-sm">Não foi possível carregar a estrutura organizacional.</p>
            </div>
        `}}function Hc(){const t=document.getElementById("form-create-establishment");t&&t.addEventListener("submit",async e=>{e.preventDefault();const a=t.querySelector('button[type="submit"]'),s=a.innerHTML;a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...',a.disabled=!0;const o={name:document.getElementById("est-name").value.trim(),cnpj:document.getElementById("est-cnpj").value.trim(),parentId:document.getElementById("est-parent").value||null,timezone:document.getElementById("est-timezone").value};try{const r=await ii(o);alert(r.message||"Sucesso!"),t.reset();const i=document.getElementById("modal-create-establishment"),n=window.bootstrap?.Modal.getInstance(i);n&&n.hide(),await ia(document.getElementById("content"))}catch(r){console.error("Erro ao criar estabelecimento:",r),alert("Erro: "+(r.message||"Falha ao gravar dados."))}finally{a.innerHTML=s,a.disabled=!1}})}window.loadAndRenderHierarchy=()=>ia(document.getElementById("content"));document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("gesturestart",function(e){e.preventDefault()}),document.addEventListener("gesturechange",function(e){e.preventDefault()}),document.addEventListener("gestureend",function(e){e.preventDefault()});let t=0;document.addEventListener("touchend",function(e){const a=new Date().getTime();a-t<=300&&e.preventDefault(),t=a},!1)});const le=document.getElementById("loadingScreen"),ut=document.getElementById("dashboardContent"),Qe=document.getElementById("content"),Ia=document.getElementById("notificationBell"),Vt=document.getElementById("notificationBadge"),ze=document.getElementById("notificationPanel"),La=document.getElementById("notificationList"),pt=document.getElementById("profileMenuButton"),pe=document.getElementById("profileDropdown"),Ks=document.getElementById("profileName"),Zs=document.getElementById("profileEmail"),eo=document.getElementById("logoutButton"),to=document.getElementById("myProfileLink"),ao=document.getElementById("hamburger-menu-btn"),ce=document.getElementById("sidebar"),fe=document.getElementById("mobile-overlay"),so=document.getElementById("themeToggleBtn"),Ca=document.getElementById("themeIcon"),as=document.getElementById("mobile-bottom-nav"),rt=document.getElementById("nav-scroll"),oo=document.getElementById("scroll-hint-left"),ro=document.getElementById("scroll-hint-right"),Oc=document.querySelectorAll(".bottom-nav-item");function ss(){if(!rt||!oo||!ro)return;const{scrollLeft:t,scrollWidth:e,clientWidth:a}=rt;oo.classList.toggle("visible",t>5),ro.classList.toggle("visible",t+a<e-5)}function zc(){if(!rt)return;const t=document.querySelector(".bottom-nav-item.active");if(!t)return;const e=rt,a=e.getBoundingClientRect(),s=t.getBoundingClientRect(),r=s.left+s.width/2-a.left-a.width/2;e.scrollBy({left:r,behavior:"smooth"})}const _c={"dashboard-section":Ni,"agenda-section":Do,"comandas-section":Jn,"relatorios-section":Gn,"servicos-section":il,"produtos-section":kl,"suppliers-section":Ml,"profissionais-section":_l,"clientes-section":ed,"estabelecimento-section":t=>br(t),"ausencias-section":Td,"users-section":aa,"sales-report-section":Jd,"financial-section":Xd,"commissions-section":uc,"packages-section":Cc,"my-profile-section":Nc,"hierarquia-section":()=>ia(Qe),"establishments-section":()=>ia(Qe)},Vc={"dashboard-section":"Dashboard","agenda-section":"Agenda","comandas-section":"Comandas / PDV","relatorios-section":"Relatórios","servicos-section":"Serviços do Menu","produtos-section":"Produtos (Estoque)","suppliers-section":"Parceiros de Negócio","profissionais-section":"Equipe / Profissionais","clientes-section":"Clientes","estabelecimento-section":"Minha Empresa","ausencias-section":"Ausências","users-section":"Usuários e Acessos","sales-report-section":"Relatório de Vendas","financial-section":"Financeiro (ERP)","commissions-section":"Comissões","packages-section":"Planos e Pacotes","my-profile-section":"Meu Perfil","hierarquia-section":"Rede / Filiais","establishments-section":"Rede / Filiais"},io={indigo:{main:"#4f46e5",hover:"#4338ca",light:"#eef2ff",text:"#ffffff"},blue:{main:"#2563eb",hover:"#1d4ed8",light:"#eff6ff",text:"#ffffff"},sky:{main:"#0284c7",hover:"#0369a1",light:"#e0f2fe",text:"#ffffff"},teal:{main:"#0d9488",hover:"#0f766e",light:"#ccfbf1",text:"#ffffff"},emerald:{main:"#059669",hover:"#047857",light:"#d1fae5",text:"#ffffff"},green:{main:"#16a34a",hover:"#15803d",light:"#dcfce7",text:"#ffffff"},lime:{main:"#65a30d",hover:"#4d7c0f",light:"#ecfccb",text:"#1f2937"},amber:{main:"#d97706",hover:"#b45309",light:"#fef3c7",text:"#1f2937"},orange:{main:"#ea580c",hover:"#c2410c",light:"#ffedd5",text:"#ffffff"},red:{main:"#dc2626",hover:"#b91c1c",light:"#fee2e2",text:"#ffffff"},rose:{main:"#e11d48",hover:"#be123c",light:"#ffe4e6",text:"#ffffff"},pink:{main:"#db2777",hover:"#be185d",light:"#fce7f3",text:"#ffffff"},fuchsia:{main:"#c026d3",hover:"#a21caf",light:"#fae8ff",text:"#ffffff"},purple:{main:"#7c3aed",hover:"#6d28d9",light:"#ede9fe",text:"#ffffff"},violet:{main:"#8b5cf6",hover:"#7c3aed",light:"#ddd6fe",text:"#ffffff"},gray:{main:"#64748b",hover:"#475569",light:"#f1f5f9",text:"#ffffff"},black:{main:"#111827",hover:"#000000",light:"#e5e7eb",text:"#ffffff"}};function Ut(t){const e=io[t]||io.indigo,s=(r=>{const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return i?`${parseInt(i[1],16)}, ${parseInt(i[2],16)}, ${parseInt(i[3],16)}`:"79, 70, 229"})(e.main);document.body.style.setProperty("--theme-main",e.main);const o=document.getElementById("dynamic-theme-styles");o&&(o.innerHTML=`
            :root {
                --theme-color-main: ${e.main};
                --theme-color-hover: ${e.hover};
                --theme-color-light: ${e.light};
                --theme-rgb: ${s};
            }
            .sidebar-link.active { background-color: var(--theme-color-main) !important; color: ${e.text} !important; }
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
        `)}function Xt(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("kairos_theme",t),Ca&&(t==="dark"?Ca.innerHTML="☀️":Ca.innerHTML="🌙")}function Uc(){const t=localStorage.getItem("kairos_theme"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;Xt(t||(e?"dark":"light"))}let St=null,Et=[];function Sr(){if(!Vt||!La)return;const t=Et.filter(e=>!e.read).length;if(t>0?(Vt.textContent=t,Vt.classList.remove("hidden")):Vt.classList.add("hidden"),Et.length===0){La.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}La.innerHTML=Et.map(e=>`
    <div class="notification-item ${e.read?"":"unread"}">
    <p class="font-semibold">${e.title}</p>
    <p class="text-sm text-gray-600">${e.message}</p>
    <p class="text-xs text-gray-400 mt-1">${e.time}</p>
    </div>
    `).join("")}function no(t){St&&St();const e=na(Ee,"establishments",t,"notifications"),a=po(e,bo("timestamp",">=",new Date),Rr("timestamp","desc"));St=Fr(a,s=>{s.docChanges().forEach(o=>{if(o.type==="added"){const r=o.doc.data();Et.unshift({title:r.title,message:r.message,time:r.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),m(r.title,r.message,"info",!0),Sr();const i=document.querySelector(".sidebar-link.active");i&&i.dataset.target==="agenda-section"&&Do()}})},s=>{console.error("Erro no listener de notificações:",s)})}async function Wc(t){const e=document.getElementById("multi-context-container"),a=document.getElementById("multi-context-btn"),s=document.getElementById("multi-context-label"),o=document.getElementById("multi-context-count"),r=document.getElementById("multi-context-list"),i=document.getElementById("multi-context-apply"),n=document.getElementById("multi-context-dropdown"),d=document.getElementById("multi-context-arrow");if(!(!e||!r))try{const c=(await xe()).matrizes||[];let u="",p=0;if(c.forEach(b=>{u+=`
                <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors mb-1">
                    <input type="checkbox" value="${b.id}" class="context-checkbox" data-name="${Wt(b.name)}">
                    <span class="text-[13px] sm:text-sm font-bold text-slate-700 truncate">🏢 ${Wt(b.name)}</span>
                </label>
            `,p++,b.branches&&b.branches.length>0&&b.branches.forEach(f=>{u+=`
                        <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors ml-4 mb-1 border-l-2 border-slate-100 pl-3">
                            <input type="checkbox" value="${f.id}" class="context-checkbox" data-name="${Wt(f.name)}">
                            <span class="text-[12px] sm:text-[13px] font-medium text-slate-600 truncate">📍 ${Wt(f.name)}</span>
                        </label>
                    `,p++})}),p>0){r.innerHTML=u,e.style.display="block",(!g.selectedEstablishments||g.selectedEstablishments.length===0)&&(g.selectedEstablishments=[t]);const b=Array.from(r.querySelectorAll('input[type="checkbox"]')),f=()=>{const y=b.filter($=>$.checked);o.textContent=y.length,y.length===0?s.textContent="Nenhuma selecionada":y.length===1?s.textContent=y[0].dataset.name:s.textContent=`${y.length} Unidades`};let h=!1;b.forEach(y=>{g.selectedEstablishments.includes(y.value)&&(y.checked=!0,h=!0)}),!h&&b.length>0&&(b[0].checked=!0,g.selectedEstablishments=[b[0].value],g.establishmentId=b[0].value),f(),a.addEventListener("click",y=>{y.stopPropagation(),n.classList.toggle("hidden"),d.style.transform=n.classList.contains("hidden")?"rotate(0deg)":"rotate(180deg)"}),document.addEventListener("click",y=>{!e.contains(y.target)&&!n.classList.contains("hidden")&&(n.classList.add("hidden"),d.style.transform="rotate(0deg)",b.forEach($=>{$.checked=g.selectedEstablishments.includes($.value)}),f())}),b.forEach(y=>{y.addEventListener("change",f)}),i.addEventListener("click",async y=>{y.stopPropagation(),le&&(le.classList.remove("hidden","fade-out"),le.style.display="flex");const $=b.filter(R=>R.checked);if($.length===0){le&&(le.classList.add("fade-out"),setTimeout(()=>{le.style.display="none"},500)),m("Atenção","Tem de selecionar pelo menos uma unidade.","warning");return}g.selectedEstablishments=$.map(R=>R.value);const A=g.selectedEstablishments[0];try{const R=await Te(A);g.establishmentId=A,g.establishmentName=R.name,g.enabledModules=R.modules,g.currentViewContext={id:A,name:R.name,type:R.parentId?"BRANCH":"GROUP"},typeof Ut=="function"&&Ut(R.themeColor||"indigo"),no(A),lo(g.userPermissions),n.classList.add("hidden"),d.style.transform="rotate(0deg)",m("Ambiente Atualizado","Exibindo informações consolidadas.","success");const C=document.querySelector(".sidebar-link.active"),E=C?C.getAttribute("data-target"):"dashboard-section";ee(E)}catch(R){console.error("Erro ao aplicar contextos:",R),m("Erro","Ocorreu um problema ao trocar a visualização.","error")}finally{le&&(le.classList.add("fade-out"),setTimeout(()=>{le.style.display="none"},500))}});try{const y=await Te(g.establishmentId);g.establishmentName=y.name,g.enabledModules=y.modules,g.currentViewContext={id:g.establishmentId,name:y.name,type:y.parentId?"BRANCH":"GROUP"},typeof Ut=="function"&&Ut(y.themeColor||"indigo"),no(g.establishmentId),lo(g.userPermissions)}catch(y){console.error(y)}}else e.style.display="none"}catch(l){console.error("Erro ao carregar switcher de contexto:",l),e.style.display="none"}}function ee(t,e={}){const a=t.replace("-section","");if(t!=="my-profile-section"){const o=["hierarquia-section","establishments-section","estabelecimento-section","dashboard-section"].includes(t),r=g.enabledModules?.[a]!==!1,i=g.userPermissions===null||g.userPermissions[t]?.view===!0;if(!o&&(!r||!i)){Qe&&(Qe.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>'),document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active")),ce&&ce.classList.contains("absolute")&&(ce.classList.add("hidden"),fe&&fe.classList.add("hidden"));return}}const s=_c[t];if(s&&Qe){const o=document.getElementById("header-page-title");o&&(o.textContent=Vc[t]||"Painel de Gestão"),document.querySelectorAll(".sidebar-link").forEach(r=>{r.classList.toggle("active",r.getAttribute("data-target")===t)}),as&&(Oc.forEach(r=>{r.classList.toggle("active",r.getAttribute("data-target")===t)}),setTimeout(zc,50),setTimeout(ss,100)),t==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(r=>r.classList.remove("active")),Qe.innerHTML="",window.innerWidth<768&&ce&&(ce.classList.add("hidden"),fe&&fe.classList.add("hidden")),s(e)}}window.navigateTo=ee;async function lo(t){const e=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),s=document.getElementById("kpi-today-appointments"),o=document.getElementById("kpi-today-revenue"),r=t===null||t["agenda-section"]?.view===!0,i=t===null||t["financial-section"]?.view===!0;if(r&&e&&(e.classList.remove("hidden"),e.classList.add("inline-flex")),i&&a&&(a.classList.remove("hidden"),a.classList.add("inline-flex")),!(!r&&!i))try{const n=await ho();r&&s&&(s.textContent=n.todayAppointments.toString()),i&&o&&(o.textContent=`R$ ${n.todayRevenue.toFixed(2).replace(".",",")}`)}catch(n){console.error("Erro ao carregar KPIs do cabeçalho:",n)}}async function Jc(t){try{ye.getPlatform()==="android"&&await de.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0});let e=await de.checkPermissions();if(e.receive==="prompt"&&(e=await de.requestPermissions()),e.receive!=="granted")return;await de.register(),de.addListener("registration",async a=>{try{const s=Lt(Ee,"users",t);await os(s,{fcmTokens:Nr(a.value),platform:"native_mobile"})}catch{}}),de.addListener("pushNotificationReceived",a=>m(a.title,a.body,"info",!0)),de.addListener("pushNotificationActionPerformed",()=>ee("agenda-section"))}catch{}}function Qc(){const t=document.getElementById("exitConfirmationModal"),e=document.getElementById("btn-cancel-exit"),a=document.getElementById("btn-confirm-exit"),s=()=>t&&(t.style.display="block"),o=()=>t&&(t.style.display="none"),r=()=>t&&t.style.display==="block";t&&(e.addEventListener("click",()=>{o(),ye.isNativePlatform()||history.pushState(null,document.title,location.href)}),a.addEventListener("click",()=>{o(),ye.isNativePlatform()?Ps.exitApp():history.back()}),ye.isNativePlatform()?Ps.addListener("backButton",()=>{if(r())o();else{const i=document.querySelectorAll('.modal[style*="display: block"]'),n=Array.from(i).filter(l=>l.id!=="exitConfirmationModal");if(n.length>0){n.forEach(l=>l.style.display="none");return}if(ce&&!ce.classList.contains("hidden")&&window.innerWidth<768){ce.classList.add("hidden"),fe&&fe.classList.add("hidden");return}const d=document.querySelector(".sidebar-link.active");d&&d.getAttribute("data-target")==="dashboard-section"?s():ee("dashboard-section")}}):(history.pushState(null,document.title,location.href),window.addEventListener("popstate",()=>{if(r()){o(),history.pushState(null,document.title,location.href);return}const i=document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display: flex"]'),n=Array.from(i).filter(l=>l.id!=="exitConfirmationModal");if(n.length>0){n.forEach(l=>l.style.display="none"),history.pushState(null,document.title,location.href);return}const d=document.querySelector(".sidebar-link.active");d&&d.getAttribute("data-target")==="dashboard-section"?s():(ee("dashboard-section"),history.pushState(null,document.title,location.href))})))}function Wt(t){return t?t.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}async function Gc(){try{await Tr(ge,Pr)}catch{}ye.isNativePlatform()&&document.body.classList.add("is-app-native"),Zr(),Qc(),Uc(),so&&so.addEventListener("click",t=>{t.preventDefault();const e=document.documentElement.getAttribute("data-theme");Xt(e==="dark"?"light":"dark")}),ao&&ao.addEventListener("click",t=>{t.stopPropagation(),ce&&(ce.classList.remove("hidden"),ce.classList.add("absolute","inset-y-0","left-0","z-40","shadow-xl")),fe&&fe.classList.remove("hidden")}),as&&(as.addEventListener("click",t=>{const e=t.target.closest(".bottom-nav-item");if(!e)return;t.preventDefault();const a=e.getAttribute("data-target");ee(a)}),rt&&rt.addEventListener("scroll",ss),ss()),fe&&fe.addEventListener("click",()=>{ce&&(ce.classList.add("hidden"),ce.classList.remove("absolute","inset-y-0","left-0","z-40","shadow-xl")),fe.classList.add("hidden")}),Ia&&Ia.addEventListener("click",t=>{t.stopPropagation(),ze&&(ze.classList.toggle("hidden"),ze.classList.contains("hidden")||(Et.forEach(e=>e.read=!0),Sr()))}),pt&&pt.addEventListener("click",t=>{t.stopPropagation(),pe&&(pe.classList.toggle("active"),pe.classList.contains("active")?pe.classList.remove("hidden"):setTimeout(()=>pe.classList.add("hidden"),200))}),to&&to.addEventListener("click",t=>{t.preventDefault(),ee("my-profile-section"),pe&&(pe.classList.remove("active"),pe.classList.add("hidden"))}),document.addEventListener("click",t=>{ze&&!ze.contains(t.target)&&t.target!==Ia&&ze.classList.add("hidden"),pe&&!pe.contains(t.target)&&t.target!==pt&&pe.classList.contains("active")&&(pe.classList.remove("active"),setTimeout(()=>pe.classList.add("hidden"),200))}),Br(ge,async t=>{if(t){if(!ye.isNativePlatform()&&(Si(),"Notification"in window&&Notification.permission==="default")){const e=document.getElementById("toast-notification-request"),a=document.getElementById("btn-enable-toast");e&&setTimeout(()=>{e.style.display="block"},3500),a&&a.addEventListener("click",async()=>{await Ei()&&e&&(e.style.display="none")});const s=()=>{e&&(e.style.display="none")},o=document.getElementById("btn-deny-toast"),r=document.getElementById("btn-close-toast");o&&o.addEventListener("click",s),r&&r.addEventListener("click",s)}try{const a=(await t.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="admin"||a.role==="employee")&&a.establishmentId){let s=null,o=t.displayName,r=null;const i=Lt(Ee,"users",t.uid),n=await co(i);if(n.exists()){const l=n.data();s=a.role==="employee"?l.permissions||{}:null,o=l.name||o,r=l.professionalId||null}g.userProfessionalId=r,ye.isNativePlatform()&&Jc(t.uid);const d=o||t.email;zr(a.establishmentId,"Carregando...",s),pt&&(pt.textContent=d.charAt(0).toUpperCase()),Ks&&(Ks.textContent=d),Zs&&(Zs.textContent=t.email),eo&&eo.addEventListener("click",l=>{l.preventDefault(),St&&St(),Ar(ge).then(()=>window.location.href="/login.html")}),await Wc(a.establishmentId),ri(ee,s,g.enabledModules),le&&(le.classList.add("fade-out"),setTimeout(()=>{le.style.display="none"},500)),ut&&(ut.style.display="flex"),setTimeout(()=>{ci()},1500),ee("dashboard-section")}else throw new Error("Permissão ou estabelecimento não configurado.")}catch(e){console.error("Erro na inicialização:",e),le&&(le.style.display="none"),ut&&(ut.innerHTML=`<div class="w-full h-full flex flex-col items-center justify-center p-4 text-center"><h2>Erro de Acesso</h2><p>${e.message}</p></div>`,ut.style.display="flex")}}else window.location.href="/login.html"})}Gc();export{mo as W};
