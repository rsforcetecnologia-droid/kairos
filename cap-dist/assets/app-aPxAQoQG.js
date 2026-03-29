const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-CnyTfnVe.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/firebase-config-C2tbVz-J.js","assets/styles-vhIfPenq.css"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as oe,d as me,m as ja}from"./firebase-config-C2tbVz-J.js";import{EmailAuthProvider as Ds,reauthenticateWithCredential as Ps,verifyBeforeUpdateEmail as Bs,updatePassword as Ms,updateProfile as As,setPersistence as qs,browserLocalPersistence as Rs,onAuthStateChanged as Ns,signOut as js}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as mt,getDoc as Co,updateDoc as wa,setDoc as Fs,addDoc as Lo,collection as zt,query as To,where as Do,getDocs as Hs,deleteDoc as Os,arrayUnion as zs,orderBy as Vs,onSnapshot as Us}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{getToken as _s,onMessage as Ws}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const m={userName:null,userProfessionalId:null,userPermissions:null,userRole:null,groupId:null,groupName:null,accessibleCompanies:[],accessibleEstablishments:[],currentViewContext:{type:null,id:null,name:null},establishmentId:null,establishmentName:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function Js(e,t,a){m.establishmentId=e,m.establishmentName=t,m.userPermissions=a,m.currentViewContext={type:"BRANCH",id:e,name:t}}const Po=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",da=Po?"http://localhost:8080":"https://kairos-app-407358446276.us-central1.run.app";console.log(`🚀 API configurada para modo: ${Po?"LOCAL (Dev)":"PRODUÇÃO (Cloud)"}`);console.log("📡 URL Base:",da);async function Gs(){const e=oe.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function I(e,t={}){const a=await Gs();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const r=da.replace(/\/$/,""),s=e.startsWith("/")?e:`/${e}`,o=`${r}${s}`;console.log(`AuthenticatedFetch: ${t.method||"GET"} ${o}`);try{const n=await fetch(o,{...t,headers:{...a,...t.headers}});if(!n.ok){const l=(await n.json().catch(()=>({message:n.statusText}))).message||`Erro na API: ${n.status}`;if(l.includes("FAILED_PRECONDITION")&&l.includes("requires an index")){const d=/(https:\/\/[^\s]+)/,c=l.match(d),u=c?c[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${u}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${n.status}) em ${o}:`,l),new Error(l)}return n.json()}catch(n){throw console.error(`Falha de rede ao tentar acessar ${o}:`,n.message),n.message.includes("Failed to fetch")||n.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${da}. Verifique se o servidor backend está rodando.`):n}}const Bo=(e,t,a,r=null)=>{let s=`/api/appointments/${e}?startDate=${t}&endDate=${a}`;return r&&(s+=`&professionalId=${r}`),I(s)},Ys=({establishmentId:e,professionalId:t,serviceIds:a,date:r})=>{const s=`/api/availability?establishmentId=${e}&professionalId=${t}&serviceIds=${a.join(",")}&date=${r}`;return I(s)},Qs=e=>I("/api/appointments",{method:"POST",body:JSON.stringify(e)}),Xs=(e,t)=>I(`/api/appointments/${e}`,{method:"PUT",body:JSON.stringify(t)}),Fa=e=>I(`/api/appointments/${e}`,{method:"DELETE"}),Zs=e=>I(`/api/appointments/${e}/reopen`,{method:"POST"}),Ks=(e,t)=>I(`/api/appointments/${e}/checkout`,{method:"POST",body:JSON.stringify(t)});let J;async function er(){if(!J)try{J=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function tr(){if(!J){console.warn("AudioContext não inicializado. O som não será tocado.");return}J.state==="suspended"&&J.resume();const e=J.createOscillator(),t=J.createGain();e.connect(t),t.connect(J.destination),e.type="sine",e.frequency.setValueAtTime(800,J.currentTime),t.gain.setValueAtTime(0,J.currentTime),t.gain.linearRampToValueAtTime(.3,J.currentTime+.01),t.gain.exponentialRampToValueAtTime(1e-4,J.currentTime+.2),e.start(J.currentTime),e.stop(J.currentTime+.2)}function g(e,t,a="info",r=!1){const s=document.getElementById("toast-container");if(!s)return;r&&tr();const o=document.createElement("div"),n={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},i={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},l={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};o.className=`toast ${n[a]||n.info}`,o.innerHTML=`
        <div class="toast-icon">${i[a]||i.info}</div>
        <div class="toast-content">
            <p class="font-bold">${e}</p>
            <p class="text-sm">${t}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${l[a]||l.info}"></div>
        </div>
    `,s.appendChild(o),o.querySelector(".toast-close").addEventListener("click",()=>o.remove()),setTimeout(()=>{o.remove()},4e3)}function z(e,t){const a=document.getElementById("genericModal");return new Promise(r=>{a.innerHTML=`
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
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",r(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",r(!1)}})}function ee({title:e,contentHTML:t,maxWidth:a="max-w-4xl",showCloseButton:r=!0}){let s=document.getElementById("genericModal");const o=s.cloneNode(!1);s.parentNode.replaceChild(o,s),s=o;const n=()=>{s.style.display="none"},i=c=>{s.querySelector("#genericModalContentBody").innerHTML=c};s.innerHTML=`
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
    `;const l=s.querySelector("[data-close-modal]");l&&(l.onclick=n);const d=s.querySelector('[data-action="close-modal"]');return d&&(d.onclick=n),s.addEventListener("click",c=>{c.target.closest(".modal-content")||n()}),s.style.display="flex",{modalElement:s,close:n,setContent:i}}function ar(){document.body.addEventListener("click",()=>{J||er()},{once:!0}),document.addEventListener("click",e=>{const t=e.target.closest('[data-action="close-modal"]');if(t){const r=t.dataset.target;if(r){const s=document.getElementById(r);s&&(s.style.display="none")}}if(e.target.closest("[data-close-modal]")){const r=document.getElementById("genericModal");r&&(r.style.display="none")}})}const _=document.getElementById("sidebar"),Ha=document.getElementById("sidebarToggle"),Xe=document.getElementById("mainContent"),or=document.querySelectorAll(".sidebar-link"),ca=document.getElementById("menu-search"),Oa=document.getElementById("hamburger-menu-btn"),Fe=document.getElementById("mobile-overlay");function Ze(e){if(!_||!Xe)return;_.classList.toggle("collapsed",e),Xe.classList.toggle("sidebar-collapsed-shift",e);const t=_.querySelector(".sidebar-search-container"),a=_.querySelectorAll(".sidebar-category");e?(t&&(t.style.display="none"),a.forEach(r=>r.style.display="none"),document.querySelectorAll(".submenu-toggle").forEach(r=>{const s=r.getAttribute("data-target-submenu"),o=document.getElementById(s),n=r.querySelector(".submenu-arrow");o&&(o.classList.add("hidden"),o.classList.remove("flex")),n&&n.classList.remove("rotate-180")})):(t&&(t.style.display="block"),a.forEach(r=>r.style.display="block"))}function sr(){!_||!Fe||(_.classList.add("mobile-open"),Fe.classList.add("visible"))}function ft(){!_||!Fe||(_.classList.remove("mobile-open"),Fe.classList.remove("visible"))}function rr(){Ze(!_.classList.contains("collapsed"))}function nr(e,t){const a=document.getElementById(e);if(!a)return;const r=a.classList.contains("hidden");r&&window.innerWidth>=1024&&_.classList.contains("collapsed")&&Ze(!1),r?(a.classList.remove("hidden"),a.classList.add("flex"),t&&t.classList.add("rotate-180")):(a.classList.add("hidden"),a.classList.remove("flex"),t&&t.classList.remove("rotate-180"))}function ir(){ca&&ca.addEventListener("input",e=>{const t=e.target.value.toLowerCase().trim(),a=document.getElementById("sidebar-nav");if(!a)return;const r=a.querySelectorAll("li"),s=a.querySelectorAll(".sidebar-category");if(t===""){r.forEach(o=>o.style.display=""),s.forEach(o=>o.style.display="block");return}s.forEach(o=>o.style.display="none"),r.forEach(o=>{if(o.classList.contains("sidebar-category"))return;const n=o.querySelector(".sidebar-link")||o.querySelector(".submenu-toggle");if(!n)return;if(n.textContent.toLowerCase().includes(t)){o.style.display="";const d=o.closest('ul[id$="-submenu"]');if(d){d.classList.remove("hidden"),d.classList.add("flex"),d.parentElement.style.display="";const c=d.parentElement.querySelector(".submenu-toggle");if(c){const u=c.querySelector(".submenu-arrow");u&&u.classList.add("rotate-180")}}}else{const d=n.getAttribute("data-target-submenu");if(d){const c=document.getElementById(d);c&&(Array.from(c.querySelectorAll(".sidebar-link")).some(h=>h.textContent.toLowerCase().includes(t))?o.style.display="":o.style.display="none")}else o.style.display="none"}})})}function lr(e,t,a){if(!_||!Xe)return;Xe.classList.add("main-content-shift"),window.innerWidth>=768?Ze(_.classList.contains("collapsed")):(Xe.classList.remove("main-content-shift","sidebar-collapsed-shift"),ft()),Ha&&Ha.addEventListener("click",s=>{s.stopPropagation(),rr()}),_.addEventListener("mouseenter",()=>{window.innerWidth>=1024&&_.classList.contains("collapsed")&&Ze(!1)}),_.addEventListener("mouseleave",()=>{if(window.innerWidth>=1024){const s=!!document.querySelector("#sidebarToggle:hover"),o=document.activeElement===ca;!s&&!o&&Ze(!0)}}),Oa&&Oa.addEventListener("click",s=>{s.stopPropagation(),sr()}),Fe&&Fe.addEventListener("click",s=>{s.stopPropagation(),ft()});let r=0;_.addEventListener("touchstart",s=>{r=s.changedTouches[0].screenX},{passive:!0}),_.addEventListener("touchend",s=>{const o=s.changedTouches[0].screenX;r-o>50&&ft()},{passive:!0}),document.querySelectorAll(".submenu-toggle").forEach(s=>{s.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();const n=s.getAttribute("data-target-submenu"),i=s.querySelector(".submenu-arrow");nr(n,i)})}),ir(),or.forEach(s=>{const o=s.getAttribute("data-target");if(!o)return;const n=o.replace("-section",""),i=a?.[n]!==!1,l=t===null||t[o]?.view===!0;if(!i||!l){s.parentElement&&s.parentElement.tagName==="LI"?s.parentElement.style.display="none":s.style.display="none";return}s.addEventListener("click",d=>{d.preventDefault(),document.querySelectorAll(".sidebar-link").forEach(c=>c.classList.remove("active")),s.classList.add("active"),o&&typeof e=="function"&&e(o),window.innerWidth<768&&ft()})})}const dr=e=>I("/api/establishments/",{method:"POST",body:JSON.stringify(e)}),ze=()=>I("/api/establishments/hierarchy",{method:"GET"}),ye=e=>{const t=e||m.establishmentId;return t?I(`/api/establishments/${t}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},ka=(e,t)=>{const a=e||m.establishmentId;return a?I(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(t)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},cr=(e,t)=>{const a=e||m.establishmentId;return a?I(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},ur=(e,t)=>{const a=e||m.establishmentId;return a?I(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))};class mr{constructor(t,a,r){this.steps=t,this.currentStep=0,this.onComplete=a,this.onSkip=r,this.isActive=!1,this.overlay=null,this.spotlight=null,this.popover=null,this.handleResize=this.handleResize.bind(this)}start(){this.isActive||(this.isActive=!0,this.createElements(),window.addEventListener("resize",this.handleResize),this.renderStep())}stop(t=!1){this.isActive=!1,window.removeEventListener("resize",this.handleResize),this.overlay&&this.overlay.remove(),this.spotlight&&this.spotlight.remove(),this.popover&&this.popover.remove(),t&&this.onComplete?this.onComplete():!t&&this.onSkip&&this.onSkip()}createElements(){this.overlay=document.createElement("div"),this.overlay.className="fixed inset-0 bg-black/60 z-[99990] transition-opacity duration-300",document.body.appendChild(this.overlay),this.spotlight=document.createElement("div"),this.spotlight.className="absolute rounded-xl z-[99991] transition-all duration-500 ease-in-out pointer-events-none bg-transparent",this.spotlight.style.boxShadow="0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255,255,255,0.5) inset",document.body.appendChild(this.spotlight),this.popover=document.createElement("div"),this.popover.className="absolute z-[99992] bg-white rounded-2xl shadow-2xl w-[320px] transition-all duration-500 ease-in-out opacity-0 transform scale-95 border border-gray-100 flex flex-col",document.body.appendChild(this.popover)}async renderStep(){if(this.currentStep>=this.steps.length){this.stop(!0);return}const t=this.steps[this.currentStep];this.popover.style.opacity="0",this.popover.style.transform="scale(0.95)",t.onBefore&&(await t.onBefore(),await this.sleep(600));const a=await this.waitForElement(t.targetSelector,3e3);if(a){a.scrollIntoView({behavior:"smooth",block:"center"}),await this.sleep(300);const s=a.getBoundingClientRect(),o=8;this.spotlight.style.top=`${s.top+window.scrollY-o}px`,this.spotlight.style.left=`${s.left+window.scrollX-o}px`,this.spotlight.style.width=`${s.width+o*2}px`,this.spotlight.style.height=`${s.height+o*2}px`,this.spotlight.style.display="block",this.overlay.style.display="none",this.positionPopover(s)}else this.spotlight.style.display="none",this.overlay.style.display="block",this.popover.style.top="50%",this.popover.style.left="50%",this.popover.style.transform="translate(-50%, -50%) scale(1)";const r=this.currentStep===this.steps.length-1;this.popover.innerHTML=`
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
        `,setTimeout(()=>{a&&(this.popover.style.transform="scale(1)"),this.popover.style.opacity="1"},50),document.getElementById("tour-next-btn").onclick=()=>{this.currentStep++,this.renderStep()},document.getElementById("tour-prev-btn")&&(document.getElementById("tour-prev-btn").onclick=()=>{this.currentStep--,this.renderStep()}),document.getElementById("tour-skip-btn").onclick=()=>this.stop(!1)}positionPopover(t){const a=this.popover.getBoundingClientRect(),r=20;let s=t.bottom+window.scrollY+r,o=t.left+window.scrollX;s+a.height>window.scrollY+window.innerHeight&&(s=t.top+window.scrollY-a.height-r),o+a.width>window.innerWidth&&(o=t.right+window.scrollX-a.width),o<r&&(o=r),this.popover.style.top=`${s}px`,this.popover.style.left=`${o}px`}handleResize(){this.isActive&&this.renderStep()}sleep(t){return new Promise(a=>setTimeout(a,t))}async waitForElement(t,a){if(!t)return null;const r=Date.now();for(;Date.now()-r<a;){const s=document.querySelector(t);if(s)return s;await this.sleep(100)}return null}}async function pr(){try{console.log("A verificar Onboarding interativo...");const e=await ye(m.establishmentId);if(!e||e.parentId||e.onboardingCompleted)return;const t=[{title:"Bem-vindo ao Kairos!",icon:"👋",content:"Preparei um tour rápido para lhe mostrar onde deve configurar as 3 coisas mais importantes antes de receber agendamentos. Vamos a isso?",targetSelector:null},{title:"Perfil e Dados da Loja",icon:"🏢",content:"É aqui em 'Minha Empresa' que você define o nome do Salão, telefone, endereço e faz o upload da sua Logomarca.",targetSelector:'[data-target="estabelecimento-section"]',onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Cores e Personalização",icon:"🎨",content:"Nesta área você pode mudar a cor principal do sistema para ficar com a cara da sua marca. O link do seu cliente vai usar esta cor!",targetSelector:"#themeColor",onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Criação de Serviços",icon:"✂️",content:"Na aba 'Serviços' é onde a mágica acontece. Crie os serviços que os seus clientes vão poder agendar, informando o preço e a duração de cada um.",targetSelector:'[data-target="servicos-section"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Novo Serviço",icon:"➕",content:"Sempre que precisar adicionar um novo serviço ao menu, basta clicar neste botão verde.",targetSelector:'[data-action="new-service"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Gestão da Equipe",icon:"👥",content:"E para terminar: a 'Equipa'. Aqui você cadastra os profissionais, define quem faz qual serviço e ajusta a jornada de trabalho semanal de cada um.",targetSelector:'[data-target="profissionais-section"]',onBefore:async()=>{window.navigateTo("profissionais-section")}},{title:"Tudo Pronto!",icon:"🚀",content:"Você já conhece o caminho! Preencha as informações do seu negócio com calma. Quando terminar, volte à Agenda e partilhe o seu Link de Agendamento com os clientes!",targetSelector:null,onBefore:async()=>{window.navigateTo("agenda-section")}}],a=async()=>{try{await ka(m.establishmentId,{onboardingCompleted:!0}),showNotification("Tour Concluído","Você já pode configurar o seu sistema livremente!","success")}catch(s){console.error("Erro ao gravar fim do onboarding",s)}};new mr(t,a,a).start()}catch(e){console.error("Erro fatal ao iniciar onboarding:",e)}}var He;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(He||(He={}));class ta extends Error{constructor(t,a,r){super(t),this.message=t,this.code=a,this.data=r}}const gr=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},br=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},r=a.Plugins=a.Plugins||{},s=()=>t!==null?t.name:gr(e),o=()=>s()!=="web",n=u=>{const p=d.get(u);return!!(p?.platforms.has(s())||i(u))},i=u=>{var p;return(p=a.PluginHeaders)===null||p===void 0?void 0:p.find(h=>h.name===u)},l=u=>e.console.error(u),d=new Map,c=(u,p={})=>{const h=d.get(u);if(h)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),h.proxy;const b=s(),v=i(u);let x;const w=async()=>(!x&&b in p?x=typeof p[b]=="function"?x=await p[b]():x=p[b]:t!==null&&!x&&"web"in p&&(x=typeof p.web=="function"?x=await p.web():x=p.web),x),k=(T,M)=>{var q,H;if(v){const O=v?.methods.find(R=>M===R.name);if(O)return O.rtype==="promise"?R=>a.nativePromise(u,M.toString(),R):(R,U)=>a.nativeCallback(u,M.toString(),R,U);if(T)return(q=T[M])===null||q===void 0?void 0:q.bind(T)}else{if(T)return(H=T[M])===null||H===void 0?void 0:H.bind(T);throw new ta(`"${u}" plugin is not implemented on ${b}`,He.Unimplemented)}},E=T=>{let M;const q=(...H)=>{const O=w().then(R=>{const U=k(R,T);if(U){const $e=U(...H);return M=$e?.remove,$e}else throw new ta(`"${u}.${T}()" is not implemented on ${b}`,He.Unimplemented)});return T==="addListener"&&(O.remove=async()=>M()),O};return q.toString=()=>`${T.toString()}() { [capacitor code] }`,Object.defineProperty(q,"name",{value:T,writable:!1,configurable:!1}),q},P=E("addListener"),C=E("removeListener"),A=(T,M)=>{const q=P({eventName:T},M),H=async()=>{const R=await q;C({eventName:T,callbackId:R},M)},O=new Promise(R=>q.then(()=>R({remove:H})));return O.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await H()},O},j=new Proxy({},{get(T,M){switch(M){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return v?A:P;case"removeListener":return C;default:return E(M)}}});return r[u]=j,d.set(u,{name:u,proxy:j,platforms:new Set([...Object.keys(p),...v?[b]:[]])}),j};return a.convertFileSrc||(a.convertFileSrc=u=>u),a.getPlatform=s,a.handleError=l,a.isNativePlatform=o,a.isPluginAvailable=n,a.registerPlugin=c,a.Exception=ta,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},fr=e=>e.Capacitor=br(e),le=fr(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Vt=le.registerPlugin;class Mo{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let r=!1;this.listeners[t]||(this.listeners[t]=[],r=!0),this.listeners[t].push(a);const o=this.windowListeners[t];o&&!o.registered&&this.addWindowListener(o),r&&this.sendRetainedArgumentsForEvent(t);const n=async()=>this.removeListener(t,a);return Promise.resolve({remove:n})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,r){const s=this.listeners[t];if(!s){if(r){let o=this.retainedEventArguments[t];o||(o=[]),o.push(a),this.retainedEventArguments[t]=o}return}s.forEach(o=>o(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:r=>{this.notifyListeners(a,r)}}}unimplemented(t="not implemented"){return new le.Exception(t,He.Unimplemented)}unavailable(t="not available"){return new le.Exception(t,He.Unavailable)}async removeListener(t,a){const r=this.listeners[t];if(!r)return;const s=r.indexOf(a);this.listeners[t].splice(s,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(r=>{this.notifyListeners(t,r)}))}}const za=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Va=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class vr extends Mo{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(r=>{if(r.length<=0)return;let[s,o]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=Va(s).trim(),o=Va(o).trim(),a[s]=o}),a}async setCookie(t){try{const a=za(t.key),r=za(t.value),s=`; expires=${(t.expires||"").replace("expires=","")}`,o=(t.path||"/").replace("path=",""),n=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${r||""}${s}; path=${o}; ${n};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}Vt("CapacitorCookies",{web:()=>new vr});const hr=async e=>new Promise((t,a)=>{const r=new FileReader;r.onload=()=>{const s=r.result;t(s.indexOf(",")>=0?s.split(",")[1]:s)},r.onerror=s=>a(s),r.readAsDataURL(e)}),xr=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(s=>s.toLocaleLowerCase()).reduce((s,o,n)=>(s[o]=e[t[n]],s),{})},yr=(e,t=!0)=>e?Object.entries(e).reduce((r,s)=>{const[o,n]=s;let i,l;return Array.isArray(n)?(l="",n.forEach(d=>{i=t?encodeURIComponent(d):d,l+=`${o}=${i}&`}),l.slice(0,-1)):(i=t?encodeURIComponent(n):n,l=`${o}=${i}`),`${r}&${l}`},"").substr(1):null,wr=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),s=xr(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(s.includes("application/x-www-form-urlencoded")){const o=new URLSearchParams;for(const[n,i]of Object.entries(e.data||{}))o.set(n,i);a.body=o.toString()}else if(s.includes("multipart/form-data")||e.data instanceof FormData){const o=new FormData;if(e.data instanceof FormData)e.data.forEach((i,l)=>{o.append(l,i)});else for(const i of Object.keys(e.data))o.append(i,e.data[i]);a.body=o;const n=new Headers(a.headers);n.delete("content-type"),a.headers=n}else(s.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class kr extends Mo{async request(t){const a=wr(t,t.webFetchExtra),r=yr(t.params,t.shouldEncodeUrlParams),s=r?`${t.url}?${r}`:t.url,o=await fetch(s,a),n=o.headers.get("content-type")||"";let{responseType:i="text"}=o.ok?t:{};n.includes("application/json")&&(i="json");let l,d;switch(i){case"arraybuffer":case"blob":d=await o.blob(),l=await hr(d);break;case"json":l=await o.json();break;case"document":case"text":default:l=await o.text()}const c={};return o.headers.forEach((u,p)=>{c[p]=u}),{data:l,headers:c,status:o.status,url:o.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}Vt("CapacitorHttp",{web:()=>new kr});const Y=Vt("PushNotifications",{}),Sr="modulepreload",$r=function(e){return"/"+e},Ua={},Er=function(t,a,r){let s=Promise.resolve();if(a&&a.length>0){let l=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),i=n?.nonce||n?.getAttribute("nonce");s=l(a.map(d=>{if(d=$r(d),d in Ua)return;Ua[d]=!0;const c=d.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":Sr,c||(p.as="script"),p.crossOrigin="",p.href=d,i&&p.setAttribute("nonce",i),document.head.appendChild(p),c)return new Promise((h,b)=>{p.addEventListener("load",h),p.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(n){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=n,window.dispatchEvent(i),!i.defaultPrevented)throw n}return s.then(n=>{for(const i of n||[])i.status==="rejected"&&o(i.reason);return t().catch(o)})},_a=Vt("App",{web:()=>Er(()=>import("./web-CnyTfnVe.js"),__vite__mapDeps([0,1,2,3])).then(e=>new e.AppWeb)}),Ir="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let Wa=!1;async function Cr(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await Y.removeAllListeners(),await Y.addListener("registration",async a=>{qo(a.value,!0)}),await Y.addListener("pushNotificationReceived",a=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",a)}),await Y.addListener("pushNotificationActionPerformed",a=>{const r=a.notification.data;console.log("Notificação clicada (Ação):",r)});let t=await Y.checkPermissions();t.receive==="prompt"&&(t=await Y.requestPermissions()),t.receive==="granted"&&await Y.register()}catch(t){console.error("[Push Nativo] Erro:",t)}return}"Notification"in window&&Notification.permission==="granted"&&Ao()}async function Lr(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await Ao(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(e){return console.error("Erro ao pedir permissão Web:",e),!1}}async function Ao(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await e.update();const t=await _s(ja,{vapidKey:Ir,serviceWorkerRegistration:e});t?(console.log("[Push Web] Token validado."),await qo(t,!1)):console.warn("[Push Web] Token veio vazio."),Wa||(Ws(ja,a=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",a)}),Wa=!0)}catch(e){console.error("[Push Web] Falha no registo:",e)}else console.warn("Navegador sem suporte a Service Worker.")}async function qo(e,t){const a=oe.currentUser;if(!a){console.warn("Usuário não logado. Token não salvo.");return}const r=mt(me,"users",a.uid);try{const s=await Co(r);if(s.exists()){const n=s.data().fcmTokens||[];if(n.length===1&&n[0]===e){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await wa(r,{fcmTokens:[e],lastLoginAt:new Date().toISOString(),platform:t?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(s){if(s.code==="not-found")try{await Fs(r,{email:a.email,fcmTokens:[e],platform:t?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(o){console.error("Erro ao criar user:",o)}else console.error("Erro ao atualizar token:",s)}}const Tr=(e,t,a="all",r="all")=>{const s=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&s.append("professionalId",a),r&&r!=="all"&&s.append("costCenterId",r),I(`/api/reports/indicators?${s.toString()}`)},Dr=e=>e?I(`/api/financial/cost-centers/${e}`):Promise.resolve([]),Pr=({establishmentId:e,startDate:t,endDate:a,cashierSessionId:r})=>{const s=new URLSearchParams({startDate:t,endDate:a});return r&&r!=="all"&&s.append("cashierSessionId",r),e&&s.append("establishmentId",e),I(`/api/reports/sales?${s.toString()}`)},Br=()=>I("/api/reports/summary",{method:"GET"}),Se=e=>I(`/api/services/${e}`),Mr=e=>I("/api/services",{method:"POST",body:JSON.stringify(e)}),Ar=(e,t)=>I(`/api/services/${e}`,{method:"PUT",body:JSON.stringify(t)}),qr=e=>I(`/api/services/${e}`,{method:"DELETE"}),Rr=(e,t)=>I(`/api/services/${e}/status`,{method:"PATCH",body:JSON.stringify({active:t})}),Nr=e=>I(`/api/services/stats/most-popular/${e}`),se=e=>I(`/api/professionals/${e}`),jr=e=>I(`/api/professionals/details/${e}`),Fr=e=>I("/api/professionals",{method:"POST",body:JSON.stringify(e)}),Hr=(e,t)=>I(`/api/professionals/${e}`,{method:"PUT",body:JSON.stringify(t)}),Ro=e=>I(`/api/professionals/${e}`,{method:"DELETE"}),Or=e=>{const t=e.map(a=>Ro(a));return Promise.all(t)},Ut=(e,t,a,r="all")=>{const s=`/api/blockages/${e}?startDate=${t}&endDate=${a}&professionalId=${r}`;return I(s)},_t=e=>I("/api/blockages",{method:"POST",body:JSON.stringify(e)}),Sa=e=>I(`/api/blockages/${e}`,{method:"DELETE"}),No=e=>I("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:e})}),$a=e=>e?String(e).replace(/\D/g,""):"",Wt=(e,t="",a=20,r={})=>{const s=new URLSearchParams;return t&&s.append("search",t),a&&s.append("limit",a),r&&r.hasLoyalty&&s.append("hasLoyalty","true"),r&&r.birthMonth&&s.append("birthMonth",r.birthMonth),r&&r.inactiveDays&&s.append("inactiveDays",r.inactiveDays),I(`/api/clients/${e}?${s.toString()}`)},jo=(e,t)=>{const a=encodeURIComponent(t);return I(`/api/clients/details/${e}/${a}`)},Fo=e=>{const t=e.phone||e.id;if(!t)throw new Error("Telefone é obrigatório");const a=$a(t),r={...e,phone:a,id:a};return I(`/api/clients/${a}`,{method:"PUT",body:JSON.stringify(r)})},Ea=Fo,Ho=(e,t)=>Fo({...t,id:e}),zr=e=>{const t=encodeURIComponent(e);return I(`/api/clients/${t}`,{method:"DELETE"})},Vr=(e,t,a,r)=>I("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:e,clientPhone:$a(t),points:a,rewardName:r})}),Ur=(e,t)=>jo(e,$a(t));function f(e){return e==null?"":String(e).replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t])}function Oo(e,t=800,a=800,r=.7){return new Promise((s,o)=>{if(!e.type.match(/image.*/))return o(new Error("O ficheiro selecionado não é uma imagem."));const n=new FileReader;n.readAsDataURL(e),n.onload=i=>{const l=new Image;l.src=i.target.result,l.onload=()=>{let d=l.width,c=l.height;d>c?d>t&&(c*=t/d,d=t):c>a&&(d*=a/c,c=a);const u=document.createElement("canvas");u.width=d,u.height=c,u.getContext("2d").drawImage(l,0,0,d,c);const h=u.toDataURL("image/jpeg",r);s(h)},l.onerror=d=>o(new Error("Erro ao carregar a imagem para processamento."))},n.onerror=i=>o(new Error("Erro ao ler o ficheiro."))})}const Ja=document.getElementById("content");let Ga=!1;const ua=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5"},{bg:"#d1fae5",border:"#059669",main:"#059669"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48"},{bg:"#fef3c7",border:"#d97706",main:"#d97706"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed"},{bg:"#fce7f3",border:"#db2777",main:"#db2777"}];let pt=[],Jt=[],lt={},Ae=[],D={currentView:"list",weekViewDays:7,currentDate:new Date,selectedProfessionalId:"all",profSearchTerm:"",showInactiveProfs:!1,scrollToAppointmentId:null,isSelectionMode:!1,selectedItems:new Set},L={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function _r(e){return new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"2-digit"}).format(e)}function zo(e){const t=new Date(e);if(t.setHours(0,0,0,0),D.currentView==="week"&&D.weekViewDays===7){const a=t.getDay(),r=t.getDate()-a+(a===0?-6:1);return new Date(t.setDate(r))}return t}function Dt(){const e=document.getElementById("profSelectorContainer"),t=D.profSearchTerm.toLowerCase();if(!e||!m.professionals)return;let a=m.professionals.filter(o=>D.showInactiveProfs||o.status!=="inactive");t&&(a=a.filter(o=>o.name.toLowerCase().includes(t)));const s=[...[{id:"all",name:"Todos",photo:null,status:"active"}],...a];e.innerHTML=s.map(o=>{const n=D.selectedProfessionalId===o.id,i=o.name==="Todos"?"Todos":o.name.split(" ")[0],l=o.name==="Todos"?"T":o.name.charAt(0).toUpperCase(),d=o.status!=="inactive",c=f(i),u=ua[0],p=o.id!=="all"&&m.professionalColors.get(o.id)||u,h=o.photo||`https://placehold.co/64x64/${p.main?.replace("#","")||"E0E7FF"}/${p.light?.replace("#","")||"4F46E5"}?text=${l}`,b=o.id==="all"?"#e0e7ff":p.light,v=o.id==="all"?"#4f46e5":p.main,w=`border: 3px solid ${n?p.border:"transparent"}; box-shadow: ${n?"0 0 0 2px "+p.border:"none"};`;return`
            <div class="prof-card flex-shrink-0 ${n?"selected":""} ${d?"":"opacity-50"}" 
                 data-action="select-professional" 
                 data-prof-id="${o.id}">
                ${o.id==="all"?`<div class="prof-card-all-placeholder" style="background-color: ${b}; color: ${v}; ${w}">
                           ${l}
                          </div>`:`<img src="${h}" alt="${c}" class="prof-card-photo" style="${w}" />`}
                <span class="prof-card-name">${c}</span>
            </div>
        `}).join("")}function Wr(e,t,a,r,s){const o=(e||"").replace(/\D/g,""),n=new Date(s).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),i=new Date(s).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=`Olá, ${t}! Você tem um agendamento de ${a} com o(a) profissional ${r} para o dia ${n} às ${i}. Podemos confirmar? Agradecemos a preferência!`,d=encodeURIComponent(l);return`https://wa.me/${o}?text=${d}`}function Jr(e){const t=document.getElementById("agenda-view");if(!t)return;if(e.sort((r,s)=>new Date(r.startTime)-new Date(s.startTime)),e.length===0){t.innerHTML='<div class="text-center p-10 text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum agendamento ou bloqueio</h3><p class="mt-1 text-sm text-gray-500">Não há eventos para o dia e filtros selecionados.</p></div>';return}const a=e.map(r=>{const s=new Date(r.startTime),o=new Date(r.endTime),n=s.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),i=o.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=m.professionalColors.get(r.professionalId)||{},d=f(r.reason),c=f(r.professionalName||"Indefinido"),u=f(r.clientName),p=f(r.serviceName),h=D.selectedItems.has(r.id),b=D.isSelectionMode?`<div class="flex items-center justify-center pr-3 border-r border-gray-200 mr-3">
                 <input type="checkbox" class="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer" 
                        data-action="toggle-select-item" 
                        data-id="${r.id}" 
                        ${h?"checked":""}>
               </div>`:"";if(r.type==="blockage")return`
                <div class="appointment-list-card bg-red-50" style="border-left-color: ${l.border};">
                    ${b}
                    <div class="time-info">
                        <p class="font-bold text-md">${n}</p>
                        <p class="text-xs text-gray-500">${i}</p>
                    </div>
                    <div class="details-info min-w-0">
                        <p class="font-bold text-red-800 truncate">${d}</p>
                        <p class="text-sm text-gray-600 truncate">com ${c}</p>
                    </div>
                    <div class="status-info">
                        <span class="status-badge bg-red-100 text-red-800">Bloqueio</span>
                    </div>
                </div>`;const v=r.status==="completed",x=v?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800",w=v?"Finalizado":"Aberto",k=JSON.stringify(r).replace(/'/g,"&apos;"),E=r.redeemedReward?.points>0,P=r.hasRewards&&!E,C=Wr(r.clientPhone,r.clientName,r.serviceName,r.professionalName,r.startTime),A=D.isSelectionMode?"":'data-action="open-comanda"';return`
            <div class="appointment-list-card" data-appointment='${k}' style="border-left-color: ${l.border};">
                ${b}
                <div class="time-info" ${A}>
                    <p class="font-bold text-md">${n}</p>
                    <p class="text-xs text-gray-500">${i}</p>
                </div>
                <div class="details-info min-w-0" ${A}>
                    <p class="font-bold text-gray-800 truncate">${P?"🎁 ":""}${u}</p>
                    <p class="text-sm text-gray-600 truncate">${p}</p>
                    <p class="text-xs text-gray-500 truncate">com ${c}</p>
                    ${E?'<p class="text-xs font-semibold text-purple-600">Resgate de Prémio</p>':""}
                </div>
                <div class="status-info">
                    <span class="status-badge ${x} mb-1">${w}</span>
                    <div class="card-actions flex gap-1 items-center">
                        ${v?`
                            <button data-action="edit-appointment" data-appointment='${k}' class="action-btn opacity-40 cursor-not-allowed" title="Finalizado - Não editável" disabled><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `:`
                            <a href="${C}" target="_blank" class="action-btn text-green-500 hover:text-green-700 p-1" title="Enviar Confirmação WhatsApp">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.036 2a10 10 0 100 20 10 10 0 000-20zM17.5 14.8c-.24.125-1.465.716-1.696.804-.23.09-.49.135-.75.045-.26-.09-.982-.322-1.87-.965-.888-.643-1.474-1.442-1.64-1.748-.166-.307-.015-.467.106-.615.116-.149.23-.388.344-.582.113-.193.15-.327.1-.462-.05-.136-.264-.322-.544-.654-.28-.332-.572-.782-.828-.958-.255-.176-.438-.158-.61-.158-.173 0-.374-.022-.574-.022-.2 0-.54.075-.826.375-.285.3-.99.965-.99 2.355 0 1.43 1.018 2.872 1.16 3.072.14.2 2 3.047 4.86 4.218 2.86 1.17 2.86.786 3.376 1.054.516.268 1.49.462 1.696.406.206-.057 1.463-.615 1.67-.887.2-.27.2-.504.14-.615-.058-.11-.23-.166-.48-.306z"/></svg>
                            </a>
                            <button data-action="edit-appointment" data-appointment='${k}' class="action-btn" title="Editar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `}
                        <button data-action="delete-appointment" data-id="${r.id}" class="action-btn" title="Apagar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                </div>
            </div>`}).join("");t.innerHTML=`<div class="list-view-container space-y-2 pb-24">${a}</div>`}function Vo(){return D.weekViewDays}function Gr(e){const t=document.getElementById("agenda-view");if(!t)return;const a=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],r=zo(D.currentDate),s=Vo(),i=100/(window.innerWidth<768?3:s),l=`flex: 0 0 ${i}%; width: ${i}%; max-width: ${i}%; box-sizing: border-box; overflow: hidden;`;let d=`
        <style>
            .agenda-scroll-container::-webkit-scrollbar { display: none; }
            .agenda-scroll-container { -ms-overflow-style: none; scrollbar-width: none; }
        </style>
        <div class="flex divide-x divide-gray-100 min-h-[65vh] overflow-x-auto overflow-y-hidden snap-x snap-mandatory agenda-scroll-container w-full" style="scroll-behavior: smooth;">
    `;for(let c=0;c<s;c++){const u=new Date(r);u.setDate(u.getDate()+c);const p=new Date,h=u.toDateString()===p.toDateString(),b=e.filter(w=>new Date(w.startTime).toDateString()===u.toDateString()).sort((w,k)=>new Date(w.startTime)-new Date(k.startTime));let v='<div class="flex-grow overflow-y-auto overflow-x-hidden px-1 py-1.5 space-y-2 pb-24 min-w-0">';b.length>0?v+=b.map(w=>{const E=new Date(w.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),P=m.professionalColors.get(w.professionalId)||{main:"#9ca3af"},C=f(w.reason),A=f(w.professionalName||"Indefinido"),j=f(w.clientName),T=f(w.serviceName);if(w.type==="blockage")return`
                        <div class="relative p-1.5 rounded-md bg-red-50 border border-red-100 shadow-sm overflow-hidden min-w-0 w-full">
                            <div class="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                            <div class="pl-1 min-w-0 flex flex-col">
                                <span class="font-bold text-[10px] text-red-900 tracking-tight block truncate">${E}</span>
                                <p class="font-bold text-[10px] text-red-800 truncate leading-tight mt-0.5 w-full">${C}</p>
                                <p class="text-[9px] text-red-600 truncate mt-1 w-full">${A.split(" ")[0]}</p>
                            </div>
                        </div>
                    `;const M=JSON.stringify(w).replace(/'/g,"&apos;"),q=w.redeemedReward?.points>0,H=w.hasRewards&&!q,O=w.status==="completed";return`
                    <div class="relative p-1.5 rounded-md bg-white border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 overflow-hidden min-w-0 w-full flex flex-col" 
                         data-action="open-comanda" data-appointment='${M}'>
                        
                        <div class="absolute left-0 top-0 bottom-0 w-1" style="background-color: ${P.main};"></div>

                        <div class="pl-1 min-w-0 w-full flex flex-col h-full justify-center">
                            <div class="flex justify-between items-center mb-0.5 min-w-0 gap-1">
                                <span class="font-bold text-[10px] text-gray-800 truncate flex-grow">${E}</span>
                                ${O?'<span class="text-[7px] font-bold bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded-sm leading-none flex-shrink-0">OK</span>':""}
                            </div>

                            <p class="font-bold text-[10px] text-gray-800 truncate leading-tight w-full">${H?"🎁 ":""}${j}</p>
                            <p class="text-[9px] text-gray-500 truncate mt-0.5 leading-tight w-full">${T}</p>
                            <p class="text-[8px] text-gray-400 truncate leading-none mt-1.5 w-full">${A.split(" ")[0]}</p>
                        </div>
                    </div>
                `}).join(""):v+=`
                <div class="flex flex-col items-center justify-center pt-8 opacity-40 min-w-0 w-full">
                    <span class="text-[10px] font-medium text-gray-400 truncate">Livre</span>
                </div>`,v+="</div>",d+=`
            <div class="flex flex-col snap-start shrink-0 relative" style="${l}">
                <div class="sticky top-0 z-10 text-center py-2 ${h?"bg-indigo-600 text-white shadow-md":"bg-gray-50/95 backdrop-blur-sm text-gray-700 border-b border-gray-200"}">
                    <p class="text-[9px] uppercase tracking-widest font-bold opacity-80 mb-0.5 leading-none">${a[u.getDay()]}</p>
                    <div class="flex items-baseline justify-center gap-0.5 mt-1">
                        <span class="text-[16px] font-extrabold leading-none">${u.getDate()}</span>
                    </div>
                </div>
                ${v}
            </div>
        `}d+="</div>",t.innerHTML=d,setTimeout(()=>{const c=t.querySelector(".agenda-scroll-container"),u=c?.querySelector(".bg-indigo-600");if(c&&u){const p=u.parentElement;c.scrollTo({left:p.offsetLeft,behavior:"smooth"})}},150)}function Uo(){const e=m.allEvents.filter(t=>D.selectedProfessionalId==="all"||t.professionalId===D.selectedProfessionalId);D.currentView==="list"?Jr(e):Gr(e),Ia()}function Ia(){const e=document.getElementById("batch-delete-container"),t=document.querySelector('[data-action="new-appointment"]');e&&(D.isSelectionMode&&D.selectedItems.size>0?(e.innerHTML=`
            <div class="bg-white p-4 rounded-xl shadow-2xl border border-red-100 flex items-center justify-between gap-4">
                <span class="font-bold text-gray-800">${D.selectedItems.size} selecionado(s)</span>
                <button data-action="batch-delete" class="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 shadow-md flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Excluir
                </button>
            </div>
        `,e.style.display="block",t&&(t.style.display="none")):(e.style.display="none",t&&(t.style.display="flex")))}async function re(){const e=document.getElementById("agenda-view");if(!e)return;D.selectedItems.clear(),Ia(),e.innerHTML='<div class="loader mx-auto my-10"></div>';let t,a;const r=document.getElementById("weekRange");if(!r)return;if(D.currentView==="list")t=new Date(D.currentDate),t.setHours(0,0,0,0),a=new Date(D.currentDate),a.setHours(23,59,59,999),r.textContent=_r(t);else{const o=Vo();t=zo(new Date(D.currentDate)),a=new Date(t),a.setDate(t.getDate()+(o-1)),a.setHours(23,59,59,999);const n=t.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),i=a.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"});r.textContent=`${n} a ${i}`}const s=document.getElementById("dateFilterInput");if(s){const o=D.currentDate,n=o.getFullYear(),i=String(o.getMonth()+1).padStart(2,"0"),l=String(o.getDate()).padStart(2,"0");s.value=`${n}-${i}-${l}`}try{const o=await Bo(m.establishmentId,t.toISOString(),a.toISOString(),D.selectedProfessionalId==="all"?null:D.selectedProfessionalId),n=await Ut(m.establishmentId,t.toISOString(),a.toISOString(),D.selectedProfessionalId);if(!document.getElementById("agenda-view"))return;const i=o.map(c=>{let u=c.professionalName;if(!u&&c.professionalId){const p=m.professionals?m.professionals.find(h=>h.id===c.professionalId):null;p&&(u=p.name)}return{...c,type:"appointment",professionalName:u||"Indefinido"}}),l=n.map(c=>{let u=c.professionalName;if(!u&&c.professionalId){const p=m.professionals?m.professionals.find(h=>h.id===c.professionalId):null;p&&(u=p.name)}return{...c,type:"blockage",professionalName:u||"Indefinido"}}),d=[...i,...l];if(m.allEvents=d,Dt(),Uo(),D.scrollToAppointmentId){const c=document.querySelector(`[data-appointment*='"id":"${D.scrollToAppointmentId}"']`);c&&(c.scrollIntoView({behavior:"smooth",block:"center"}),c.style.transition="background-color 0.5s ease-in-out",c.style.backgroundColor="#e0e7ff",setTimeout(()=>{c.style.backgroundColor=""},2500)),D.scrollToAppointmentId=null}}catch(o){document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML='<div class="p-6 text-center text-red-600">Falha ao carregar dados.</div>',g("Erro na Agenda",`Não foi possível carregar a agenda: ${o.message}`,"error"))}}async function Yr(){try{const[e,t,a]=await Promise.all([se(m.establishmentId),Se(m.establishmentId),ye(m.establishmentId)]);m.professionals=e||[],m.services=t||[],Ae=[],a&&(lt=a.loyaltyProgram||{enabled:!1}),m.professionals.forEach((r,s)=>{m.professionalColors.set(r.id,ua[s%ua.length])}),Dt()}catch(e){console.error("Erro ao popular filtros e dependências do modal:",e),g("Atenção","Não foi possível pré-carregar os dados para agendamento.","error")}}function ma(e){e<1||e>4||(L.step=e,pa(null,!0))}function _o(e,t){const a=document.getElementById("multiServiceToggle"),r=a&&a.checked,s=t.classList.contains("selected"),o=L.data.selectedServiceIds.indexOf(e);if(s)t.classList.remove("selected","border-blue-500"),o>-1&&L.data.selectedServiceIds.splice(o,1);else{if(!r){L.data.selectedServiceIds=[];const n=document.getElementById("apptServicesContainer");n&&n.querySelectorAll(".service-card.selected").forEach(i=>{i.classList.remove("selected","border-blue-500")})}t.classList.add("selected","border-blue-500"),L.data.selectedServiceIds.push(e)}}function Wo(e,t){const a=document.querySelector(".professional-step-cards");if(!a)return;a.querySelectorAll(".professional-modal-card").forEach(s=>s.classList.remove("selected","border-blue-500")),t.classList.add("selected","border-blue-500");const r=Jt.find(s=>s.id===e);L.data.professionalId=e,L.data.professionalName=r?r.name:"Indefinido"}function Qr(e,t){const a=document.getElementById("availableTimesContainer");a&&(a.querySelectorAll(".time-slot-card").forEach(r=>r.classList.remove("selected")),t.classList.add("selected"),L.data.time=e)}async function Ya(){const e=document.getElementById("apptTotalDuration"),t=document.getElementById("availableTimesContainer");if(!e||!t)return;const a=L.data.professionalId,r=L.data.selectedServiceIds,s=document.getElementById("apptDate").value;L.data.date=s;const o=r.reduce((n,i)=>{const l=pt.find(d=>d.id===i);return n+(l?l.duration+(l.bufferTime||0):0)},0);if(e.textContent=`${o} min`,o===0||!a||!s){t.innerHTML='<p class="col-span-full text-center text-gray-500">Selecione serviço, profissional e data.</p>';return}t.innerHTML='<div class="loader mx-auto col-span-full"></div>';try{let n=await Ys({establishmentId:m.establishmentId,professionalId:a,serviceIds:r,date:s});const i=new Date;if(new Date(s+"T00:00:00").toDateString()===i.toDateString()){const d=i.getHours()*60+i.getMinutes();n=n.filter(c=>{const[u,p]=c.split(":").map(Number);return u*60+p>=d})}if(t.innerHTML="",n.length>0){if(n.forEach(d=>{const c=document.createElement("button");c.type="button",c.className=`time-slot-card p-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition ${L.data.time===d?"selected":""}`,c.textContent=d,c.addEventListener("click",()=>Qr(d,c)),t.appendChild(c)}),L.data.time){const d=t.querySelector(`[data-action="time-slot"][data-time="${L.data.time}"]`);d&&d.classList.add("selected")}}else t.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum horário disponível.</p>'}catch(n){console.error("Erro ao buscar horários:",n),t.innerHTML='<p class="col-span-full text-center text-red-500">Erro ao buscar horários.</p>'}}function Xr(){const e=document.getElementById("loyaltyRewardsContainer");if(!e)return;const{clientHasRewards:t,clientLoyaltyPoints:a,redeemedReward:r}=L.data,{enabled:s,rewards:o}=lt;if(!s||!t||!o||o.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");const n=o.filter(l=>a>=l.points);let i=`
        <h4 class="text-md font-semibold text-gray-700 mb-2">🎁 Prêmios Disponíveis (${a} pontos)</h4>
    `;n.length>0?(i+='<div class="space-y-2">',i+=n.map(l=>{const d=r?.reward===l.reward,c=f(l.reward);return`
                <label class="flex items-center p-3 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="loyaltyReward" class="form-radio text-indigo-600" 
                           value="${c}" 
                           data-points="${l.points}"
                           ${d?"checked":""}>
                    <span class="ml-3">
                        <span class="font-semibold text-gray-800">${c}</span>
                        <span class="text-sm text-gray-600"> (-${l.points} pontos)</span>
                    </span>
                </label>
            `}).join(""),i+="</div>"):i+='<p class="text-sm text-gray-600">Pontos insuficientes para resgatar os prêmios disponíveis.</p>',e.innerHTML=i,e.querySelectorAll('input[name="loyaltyReward"]').forEach(l=>{l.addEventListener("change",d=>{d.target.checked&&(L.data.redeemedReward={reward:d.target.value,points:parseInt(d.target.dataset.points,10)})})}),e.insertAdjacentHTML("beforeend",`
        <label class="flex items-center p-3 mt-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
            <input type="radio" name="loyaltyReward" class="form-radio text-gray-400" 
                   value="none" 
                   ${r?"":"checked"}>
            <span class="ml-3 text-gray-600">Não resgatar prêmio agora</span>
        </label>
    `),e.querySelector('input[value="none"]').addEventListener("change",l=>{l.target.checked&&(L.data.redeemedReward=null)})}async function Zr(e){e.preventDefault();const t=e.target,a=t.querySelector('button[type="submit"]');if(!L.data.time||L.data.selectedServiceIds.length===0||!L.data.professionalId)return g("Erro de Validação","Por favor, selecione o horário, serviço(s) e profissional antes de confirmar.","error");a.disabled=!0,a.textContent="A confirmar...";const r=L.data.selectedServiceIds.map(d=>{const c=pt.find(u=>u.id===d);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[s,o]=L.data.time.split(":"),n=new Date(`${L.data.date}T${s}:${o}:00`),i={establishmentId:m.establishmentId,clientName:L.data.clientName,clientPhone:L.data.clientPhone,services:r,professionalId:L.data.professionalId,professionalName:L.data.professionalName,startTime:n.toISOString(),redeemedReward:L.data.redeemedReward},l=t.querySelector("#appointmentId").value;l&&(i.id=l);try{l?await Xs(l,i):await Qs(i),g(`Agendamento ${l?"atualizado":"criado"} com sucesso!`,"success"),document.getElementById("appointmentModal").style.display="none",re()}catch(d){g(d.message,"error")}finally{a.disabled=!1,a.textContent="Confirmar Agendamento"}}function Jo(e){const t=L.data.clientName===e.name&&L.data.clientPhone===e.phone,a=f(e.name),r=f(e.phone);return`
        <div class="client-search-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-blue-50 ${t?"selected border-blue-500":""}" 
             data-action="select-client" 
             data-client-name="${a}" 
             data-client-phone="${r}"
             data-client-id="${e.id}"
             data-loyalty-points="${e.loyaltyPoints||0}">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">${a.charAt(0).toUpperCase()}</div>
                <div>
                    <p class="font-semibold text-gray-800">${a}</p>
                    <p class="text-sm text-gray-500">${r}</p>
                </div>
            </div>
        </div>
    `}async function Kr(e){const t=document.getElementById("clientSearchResults");if(!t)return;const a=e.trim();if(a.length<3){t.innerHTML='<p class="text-sm text-gray-500">Digite pelo menos 3 caracteres para buscar clientes existentes.</p>';return}t.innerHTML='<div class="loader-small mx-auto my-2"></div>';try{const r=await Wt(m.establishmentId,a);if(Ae=r,r.length===0){t.innerHTML='<p class="text-sm text-gray-500">Nenhum cliente encontrado com este termo.</p>';return}t.innerHTML=r.map(Jo).join(""),t.querySelectorAll('[data-action="select-client"]').forEach(s=>{s.addEventListener("click",o=>{const n=s.dataset.clientName,i=s.dataset.clientPhone,l=parseInt(s.dataset.loyaltyPoints||"0",10);L.data.clientName=n,L.data.clientPhone=i,L.data.clientLoyaltyPoints=l;const d=lt,c=Math.min(...(d?.rewards||[]).map(u=>u.points));L.data.clientHasRewards=d.enabled&&c!==1/0&&L.data.clientLoyaltyPoints>=c,document.getElementById("apptClientName").value=n,document.getElementById("apptClientPhone").value=i,document.querySelectorAll(".client-search-card").forEach(u=>u.classList.remove("selected","border-blue-500")),s.classList.add("selected","border-blue-500")})})}catch(r){console.error("Erro na busca de clientes:",r),t.innerHTML='<p class="text-sm text-red-500">Erro ao buscar clientes.</p>'}}async function en(e){e.preventDefault();const t=document.getElementById("clientRegistrationForm"),a=t.querySelector('button[type="submit"]'),r={establishmentId:m.establishmentId,name:t.querySelector("#regClientName").value.trim(),email:t.querySelector("#regClientEmail").value.trim(),phone:t.querySelector("#regClientPhone").value.trim(),dobDay:t.querySelector("#regClientDobDay").value.trim(),dobMonth:t.querySelector("#regClientDobMonth").value.trim(),notes:t.querySelector("#regClientNotes").value.trim()};if(!r.name||!r.phone)return g("Erro de Validação","Nome e Telefone são obrigatórios.","error");a.disabled=!0,a.textContent="A salvar...";try{await Ea(r),Ae.push({name:r.name,phone:r.phone,loyaltyPoints:0}),L.data.clientName=r.name,L.data.clientPhone=r.phone,L.data.clientHasRewards=!1,L.data.clientLoyaltyPoints=0,g("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",ma(1)}catch(s){g(`Erro ao cadastrar cliente: ${s.message}`,"error")}finally{a.disabled=!1,a.textContent="Salvar"}}function tn(){ee({title:"Cadastrar Novo Cliente",contentHTML:`
        <form id="clientRegistrationForm" class="flex flex-col h-full">
            <div class="flex-1 overflow-y-auto p-5 space-y-6" style="max-height: 80vh;">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="regClientName" class="block text-sm font-medium text-gray-700">Nome</label><input type="text" id="regClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></div>
                    <div><label for="regClientEmail" class="block text-sm font-medium text-gray-700">E-mail</label><input type="email" id="regClientEmail" class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></div>
                    <div><label for="regClientPhone" class="block text-sm font-medium text-gray-700">Telefone</label><input type="tel" id="regClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></div>
                    <div><label for="regClientDobDay" class="block text-sm font-medium text-gray-700">Aniversário (Dia)</label><input type="number" id="regClientDobDay" min="1" max="31" class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></div>
                    <div><label for="regClientDobMonth" class="block text-sm font-medium text-gray-700">Aniversário (Mês)</label><input type="number" id="regClientDobMonth" min="1" max="12" class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></div>
                </div>
                <div><label for="regClientNotes" class="block text-sm font-medium text-gray-700">Observações</label><textarea id="regClientNotes" rows="3" class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></textarea></div>
            </div>
            
            <footer class="p-5 border-t bg-gray-100 flex justify-end gap-3 flex-shrink-0">
                <button type="button" data-action="close-modal" data-target="genericModal" class="py-3 px-6 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition shadow-sm">Cancelar</button>
                <button type="submit" class="py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md">Salvar</button>
            </footer>
        </form>
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("clientRegistrationForm");t&&t.addEventListener("submit",en)}function an(){tn()}function on(e,t){const a=e?"Editar Agendamento":"Selecionar Cliente",r=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">1. Dados do Cliente</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="apptClientName" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="apptClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="Nome Completo" value="${f(L.data.clientName)}">
                </div>
                <div>
                    <label for="apptClientPhone" class="block text-sm font-medium text-gray-700">Telemóvel</label>
                    <input type="tel" id="apptClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="(XX) XXXXX-XXXX" value="${f(L.data.clientPhone)}">
                </div>
            </div>
             <div class="flex flex-col sm:flex-row items-center gap-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
                <div class="relative w-full sm:flex-grow">
                    <input type="text" id="clientSearchInput" placeholder="Buscar cliente existente..." class="w-full p-3 pl-10 border rounded-lg">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <button type="button" data-action="open-client-registration" class="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 flex items-center justify-center gap-2 w-full sm:w-auto flex-shrink-0">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                    Cadastrar
                </button>
            </div>
            
            <div id="clientSearchResults" class="space-y-3 max-h-40 overflow-y-auto p-1">
                <p class="text-sm text-gray-500">Digite para buscar clientes existentes.</p>
            </div>
        </div>
        
        <footer class="p-5 border-t bg-gray-100 flex justify-end gap-3 flex-shrink-0">
            <button type="button" data-action="close-modal" data-target="appointmentModal" class="py-3 px-6 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition shadow-sm">Cancelar</button>
            <button type="button" data-action="next-step" data-current-step="1" class="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">Avançar</button>
        </footer>
    `;return{title:a,content:r}}function sn(){const e="Selecionar Serviço",a=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">2. Serviços</h3>
             
             <div class="flex flex-col sm:flex-row items-center gap-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
                 <input type="search" id="serviceSearchModalInput" placeholder="Buscar Serviço..." class="w-full sm:flex-grow p-3 pl-10 border rounded-lg">
                 
                 <label class="flex items-center space-x-2 cursor-pointer flex-shrink-0">
                     <div class="relative">
                         <input type="checkbox" id="multiServiceToggle" class="sr-only" ${L.data.selectedServiceIds.length>1?"checked":""}>
                         <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full transition-colors"></div>
                         <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" style="transition: all 0.3s;"></div>
                     </div>
                     <span class="text-sm font-medium text-gray-700">Selecionar Vários</span>
                 </label>
            </div>
            
            <div id="apptServicesContainer" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-1">
                 ${pt.map(r=>{const s=L.data.selectedServiceIds.includes(r.id),o=r.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S",n=f(r.name);return`
                         <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${s?"selected border-blue-500":""}" data-service-id="${r.id}">
                             <div class="flex items-center">
                                 <img src="${o}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                                 <div class="flex-1">
                                     <p class="font-semibold text-sm text-gray-800">${n}</p>
                                     <p class="text-xs text-gray-500">R$ ${r.price.toFixed(2)} (${r.duration} min)</p>
                                 </div>
                             </div>
                         </div>`}).join("")}
            </div>
        </div>
        
        <style>
            #multiServiceToggle:checked + .toggle-bg { background-color: #4f46e5; }
            #multiServiceToggle:checked + .toggle-bg + .dot { transform: translateX(100%); }
        </style>

        <footer class="p-5 border-t bg-gray-100 flex justify-between gap-3 flex-shrink-0">
            <button type="button" data-action="prev-step" data-current-step="2" class="py-3 px-6 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition shadow-sm">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="2" class="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">Avançar</button>
        </footer>
    `;return{title:e,content:a}}function rn(){const e="Selecionar Profissional",t=`
        <div class="p-5 space-y-6">
             <h3 class="text-xl font-bold text-gray-800">3. Profissional</h3>
             <div id="apptProfessionalContainer" class="mt-4 flex flex-wrap gap-3 max-h-48 overflow-y-auto p-1 professional-step-cards">
                 ${Jt.map(a=>{const r=L.data.professionalId===a.id,s=a.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P",o=f(a.name);return`
                         <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${r?"selected border-blue-500":""}" data-professional-id="${a.id}">
                             <img src="${s}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                             <p class="text-xs font-semibold text-gray-800">${o.split(" ")[0]}</p>
                             <p class="text-[10px] text-gray-500">${f(a.specialty||"Profissional")}</p>
                         </div>`}).join("")}
             </div>
             <div class="flex items-center gap-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
                 <input type="search" id="professionalSearchModalInput" placeholder="Buscar profissional por nome..." class="flex-grow p-3 pl-10 border rounded-lg">
             </div>
        </div>
        
        <footer class="p-5 border-t bg-gray-100 flex justify-between gap-3 flex-shrink-0">
            <button type="button" data-action="prev-step" data-current-step="3" class="py-3 px-6 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition shadow-sm">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="3" class="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">Avançar</button>
        </footer>
    `;return{title:e,content:t}}function nn(e){const t=e?"Confirmar Edição":"Data e Horário",a=new Date,r=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`,s=L.data.date||r,o=f(L.data.clientName),n=f(L.data.professionalName),i=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">4. ${t}</h3>

            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 space-y-1">
                <p class="font-bold text-gray-800">${o}</p>
                <p class="text-sm text-gray-700">Serviços: ${L.data.selectedServiceIds.length} selecionado(s)</p>
                <p class="text-sm text-gray-700">Profissional: ${n}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
                <div>
                    <label for="apptDate" class="block text-sm font-medium text-gray-700">Data</label>
                    <input type="date" id="apptDate" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" value="${s}">
                </div>
                <div class="bg-gray-100 p-3 rounded-lg shadow-sm flex flex-col justify-center">
                    <label class="block text-xs font-medium text-gray-600">Duração Total Estimada</label>
                    <span id="apptTotalDuration" class="mt-1 text-xl font-bold text-gray-800">0 min</span>
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Horários Disponíveis</label>
                <div id="availableTimesContainer" class="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-40 overflow-y-auto p-3 bg-gray-50 rounded-lg border">
                    <p class="col-span-full text-center text-gray-500">Selecione serviço(s), profissional e data.</p>
                </div>
            </div>

             <div id="loyaltyRewardsContainer" class="hidden bg-indigo-50 p-4 rounded-lg"></div>
        </div>
        
        <footer class="p-5 border-t bg-gray-100 flex justify-between gap-3 flex-shrink-0">
            <button type="button" data-action="prev-step" data-current-step="4" class="py-3 px-6 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition shadow-sm">Voltar</button>
            <button type="submit" class="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">Confirmar Agendamento</button>
        </footer>
    `;return{title:t,content:i}}function ln(e){const t=document.getElementById("apptServicesContainer");if(!t)return;const a=e.toLowerCase(),r=pt.filter(s=>s.name.toLowerCase().includes(a));t.innerHTML=r.map(s=>{const o=L.data.selectedServiceIds.includes(s.id),n=s.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
            <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${o?"selected border-blue-500":""}" data-service-id="${s.id}">
                <div class="flex items-center">
                    <img src="${n}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-gray-800">${f(s.name)}</p>
                        <p class="text-xs text-gray-500">R$ ${s.price.toFixed(2)} (${s.duration} min)</p>
                    </div>
                </div>
            </div>`}).join(""),t.querySelectorAll(".service-card").forEach(s=>{s.addEventListener("click",()=>_o(s.dataset.serviceId,s))})}function dn(e){const t=document.getElementById("apptProfessionalContainer");if(!t)return;const a=e.toLowerCase(),r=Jt.filter(s=>s.name.toLowerCase().includes(a));t.innerHTML=r.map(s=>{const o=L.data.professionalId===s.id,n=s.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P",i=f(s.name);return`
             <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${o?"selected border-blue-500":""}" data-professional-id="${s.id}">
                 <img src="${n}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                 <p class="text-xs font-semibold text-gray-800">${i.split(" ")[0]}</p>
                 <p class="text-[10px] text-gray-500">${f(s.specialty||"Profissional")}</p>
             </div>`}).join(""),t.querySelectorAll(".professional-modal-card").forEach(s=>{s.addEventListener("click",()=>Wo(s.dataset.professionalId,s))})}async function pa(e=null,t=!1){const a=document.getElementById("appointmentModal");if(!t){const o=e?.startTime?new Date(e.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],n=e?.startTime?new Date(e.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null;if(L={step:1,data:{id:e?.id||null,clientName:e?.clientName||"",clientPhone:e?.clientPhone||"",selectedServiceIds:e?.services?.map(i=>i.id)||[],professionalId:e?.professionalId||null,professionalName:e?.professionalName||"",date:o,time:n,redeemedReward:e?.redeemedReward||null,clientHasRewards:e?.hasRewards||!1,clientLoyaltyPoints:0}},e&&e.clientName)try{const i=await Wt(m.establishmentId,e.clientName),l=i.find(d=>d.phone===e.clientPhone);l&&(L.data.clientLoyaltyPoints=l.loyaltyPoints||0,Ae=i)}catch(i){console.warn("Não foi possível carregar pontos do cliente para edição:",i)}}if(!m.services||!m.professionals||lt.enabled===void 0){g("Erro","Os dados da agenda ainda não foram carregados. Tente novamente em alguns segundos.","error");return}if(pt=m.services,Jt=m.professionals.filter(o=>o.status==="active"),L.data.clientLoyaltyPoints>0){const o=lt,n=Math.min(...(o?.rewards||[]).map(i=>i.points));L.data.clientHasRewards=o.enabled&&n!==1/0&&L.data.clientLoyaltyPoints>=n}let r={title:"Erro",content:"<p>Etapa não encontrada.</p>"};switch(L.step){case 1:r=on(e);break;case 2:r=sn();break;case 3:r=rn();break;case 4:r=nn(e);break}a.innerHTML=`
        <div class="modal-content max-w-4xl p-0 rounded-xl overflow-hidden shadow-2xl">
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${r.title}</h2>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>
            </header>
            
            <form id="appointmentForm" class="flex flex-col h-full">
                <input type="hidden" id="appointmentId" value="${L.data.id||""}">
                <input type="hidden" id="selectedTime" value="${L.data.time||""}">
                
                <div class="flex-1 overflow-y-auto" style="max-height: 80vh;">
                    ${r.content}
                </div>
                
            </form>
        </div>`,a.querySelectorAll('[data-action="next-step"]').forEach(o=>{o.addEventListener("click",()=>{const n=parseInt(o.dataset.currentStep,10);if(n===1){const i=a.querySelector("#apptClientName"),l=a.querySelector("#apptClientPhone");if(L.data.clientName=i.value.trim(),L.data.clientPhone=l.value.trim(),!L.data.clientName||!L.data.clientPhone)return g("Atenção","Nome e telefone do cliente são obrigatórios.","error")}else if(n===2){if(L.data.selectedServiceIds.length===0)return g("Atenção","Selecione pelo menos um serviço.","error")}else if(n===3&&!L.data.professionalId)return g("Atenção","Selecione um profissional.","error");ma(n+1)})}),a.querySelectorAll('[data-action="prev-step"]').forEach(o=>{o.addEventListener("click",()=>ma(parseInt(o.dataset.currentStep,10)-1))});const s=a.querySelector("#appointmentForm");if(L.step===4&&s&&s.addEventListener("submit",Zr),a.style.display="flex",L.step===2){a.querySelector("#apptServicesContainer").querySelectorAll(".service-card").forEach(i=>{i.addEventListener("click",()=>_o(i.dataset.serviceId,i))});const n=a.querySelector("#serviceSearchModalInput");n&&n.addEventListener("input",i=>ln(i.target.value))}if(L.step===3){a.querySelector("#apptProfessionalContainer").querySelectorAll(".professional-modal-card").forEach(i=>{i.addEventListener("click",()=>Wo(i.dataset.professionalId,i))});const n=a.querySelector("#professionalSearchModalInput");n&&n.addEventListener("input",i=>dn(i.target.value))}if(L.step===1){const o=a.querySelector("#clientSearchInput");if(o&&(o.addEventListener("input",i=>Kr(i.target.value)),L.data.clientName&&L.data.clientPhone&&Ae.length>0)){const i=document.getElementById("clientSearchResults");i&&(i.innerHTML=Ae.map(Jo).join(""))}const n=a.querySelector('[data-action="open-client-registration"]');n&&n.addEventListener("click",an)}if(L.step===4){const o=a.querySelector("#apptDate");o&&o.addEventListener("change",Ya),Ya(),Xr()}}async function Go(e={}){D.currentDate=e.targetDate?new Date(e.targetDate):D.currentDate||new Date,D.scrollToAppointmentId=e.scrollToAppointmentId||null,D.profSearchTerm="",D.isSelectionMode=!1,D.selectedItems.clear(),window.innerWidth<768&&(D.currentView="list"),Ja.innerHTML=`
        <style>
            .agenda-scroll-container::-webkit-scrollbar { display: none; }
            .agenda-scroll-container { -ms-overflow-style: none; scrollbar-width: none; }
            .custom-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 4px; }
            
            .toggle-bg::after { content: ''; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; background: white; border-radius: 50%; transition: transform 0.3s; }
            #showInactiveProfsToggle:checked + .toggle-bg { background-color: #4f46e5; }
            #showInactiveProfsToggle:checked + .toggle-bg::after { transform: translateX(100%); }
        </style>
        
        <section class="w-full flex flex-col gap-3 pb-20 overflow-hidden">
            
            <div class="bg-white p-3 rounded-xl shadow-sm border border-gray-100 w-full flex-shrink-0 z-10 transition-all duration-300">
                
                <div class="flex items-center justify-between gap-2 w-full">
                    
                    <div class="flex items-center gap-2 min-w-0">
                        <span id="weekRange" class="font-bold text-gray-800 text-sm sm:text-base flex-shrink-0"></span>
                        <input type="date" id="dateFilterInput" class="p-1 text-xs border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white w-[110px] cursor-pointer flex-shrink-0" title="Ir para a data">
                    </div>
                    
                    <button id="btn-toggle-filters" class="p-1.5 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center gap-1 flex-shrink-0" title="Filtros e Opções">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                        <span class="text-xs font-semibold hidden sm:inline">Opções</span>
                    </button>
                </div>

                <div id="filters-panel" class="hidden flex-col gap-3 pt-3 mt-3 border-t border-gray-100">
                    <div class="flex flex-wrap items-center gap-2">
                        <button id="todayBtn" class="p-1.5 px-3 border rounded-md shadow-sm text-xs font-semibold bg-white text-gray-700 hover:bg-gray-50">Hoje</button>
                        
                        <div class="flex items-center gap-1 rounded-md bg-gray-200 p-1">
                            <button data-view="list" class="view-btn text-xs px-3 py-1 rounded-sm ${D.currentView==="list"?"bg-white shadow-sm":"text-gray-600"}">Lista</button>
                            <button data-view="week" class="view-btn text-xs px-3 py-1 rounded-sm ${D.currentView==="week"?"bg-white shadow-sm":"text-gray-600"}">Semana</button>
                        </div>
                        
                        <div id="week-days-toggle" class="${D.currentView==="week"?"flex":"hidden"} items-center gap-1 rounded-md bg-gray-200 p-1">
                            <button data-days="3" class="week-days-btn view-btn text-xs px-2 py-1 rounded-sm">3 dias</button>
                            <button data-days="5" class="week-days-btn view-btn text-xs px-2 py-1 rounded-sm hidden sm:block">5 dias</button>
                            <button data-days="7" class="week-days-btn view-btn text-xs px-2 py-1 rounded-sm hidden sm:block">7 dias</button>
                        </div>

                        <button id="btn-toggle-select" class="p-1.5 px-3 border rounded-md shadow-sm bg-gray-50 text-gray-700 hover:bg-gray-100 flex items-center gap-1 text-xs font-semibold transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                            Excluir Múltiplos
                        </button>
                    </div>

                    <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                        <input type="search" id="profSearchInput" placeholder="Pesquisar profissional pelo nome..." class="w-full sm:flex-grow p-2 border rounded-md shadow-sm text-xs focus:ring-indigo-500 focus:border-indigo-500">
                        <label class="flex items-center gap-2 cursor-pointer flex-shrink-0">
                            <div class="relative">
                                <input type="checkbox" id="showInactiveProfsToggle" class="sr-only">
                                <div class="toggle-bg block bg-gray-300 w-10 h-5 rounded-full"></div>
                            </div>
                            <span class="text-xs font-medium text-gray-700">Exibir Inativos</span>
                        </label>
                    </div>
                </div>

                <div class="border-t border-gray-100 mt-3 pt-2">
                    <div id="profSelectorContainer" class="flex overflow-x-auto custom-scrollbar pb-2 items-start gap-2">
                        <div class="loader mx-auto"></div>
                    </div>
                </div>

            </div> 
            
            <div id="agenda-view" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative w-full"></div>
            
            <button data-action="new-appointment" class="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:bg-indigo-700 transition z-50 transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </button>

            <div id="batch-delete-container" class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 hidden w-[90%] max-w-md"></div>
        </section>`;const t=document.getElementById("btn-toggle-filters"),a=document.getElementById("filters-panel");t&&a&&t.addEventListener("click",()=>{a.classList.toggle("hidden"),a.classList.toggle("flex"),t.classList.toggle("bg-blue-50"),t.classList.toggle("text-blue-600"),t.classList.toggle("border-blue-300")});const r=document.getElementById("btn-toggle-select");r.addEventListener("click",()=>{D.isSelectionMode=!D.isSelectionMode,D.isSelectionMode||D.selectedItems.clear(),r.classList.toggle("bg-blue-100",D.isSelectionMode),r.classList.toggle("text-blue-700",D.isSelectionMode),r.classList.toggle("border-blue-300",D.isSelectionMode),Uo()}),document.querySelectorAll(".view-btn[data-view]").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".view-btn[data-view]").forEach(n=>n.classList.remove("bg-white","shadow-sm")),s.classList.add("bg-white","shadow-sm"),D.currentView=s.dataset.view;const o=document.getElementById("week-days-toggle");if(D.currentView==="week"){if(o.classList.remove("hidden"),o.classList.add("flex"),window.innerWidth<768){D.weekViewDays=7,document.querySelectorAll(".week-days-btn").forEach(i=>i.classList.remove("bg-white","shadow-sm"));const n=document.querySelector('.week-days-btn[data-days="7"]');n&&n.classList.add("bg-white","shadow-sm")}}else o.classList.remove("flex"),o.classList.add("hidden");re()})}),document.querySelectorAll(".week-days-btn").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".week-days-btn").forEach(o=>o.classList.remove("bg-white","shadow-sm")),s.classList.add("bg-white","shadow-sm"),D.weekViewDays=parseInt(s.dataset.days,10),re()})}),document.getElementById("todayBtn").addEventListener("click",()=>{D.currentDate=new Date,re()}),document.getElementById("dateFilterInput").addEventListener("change",s=>{if(s.target.value){const[o,n,i]=s.target.value.split("-");D.currentDate=new Date(o,n-1,i),re()}}),document.getElementById("profSearchInput").addEventListener("input",s=>{D.profSearchTerm=s.target.value,Dt()}),document.getElementById("showInactiveProfsToggle").addEventListener("change",s=>{D.showInactiveProfs=s.target.checked,Dt(),re()}),Ga||(Ja.addEventListener("click",async s=>{const o=s.target.closest("[data-action]");if(s.target.dataset.action==="toggle-select-item"){const d=s.target.dataset.id;s.target.checked?D.selectedItems.add(d):D.selectedItems.delete(d),Ia();return}if(o&&o.dataset.action==="batch-delete"){const d=D.selectedItems.size;if(await z("Excluir em Lote",`Tem certeza que deseja excluir ${d} agendamento(s)? Esta ação não pode ser desfeita.`)){const u=Array.from(D.selectedItems);let p=0;try{await Promise.all(u.map(async b=>{try{await Fa(b),p++}catch(v){console.error(`Falha ao excluir ${b}`,v)}})),g(`${p} agendamento(s) excluído(s).`,"success"),D.selectedItems.clear(),D.isSelectionMode=!1;const h=document.getElementById("btn-toggle-select");h&&h.classList.remove("bg-blue-100","text-blue-700","border-blue-300"),re()}catch{g("Erro ao processar exclusão em lote.","error")}}return}if(s.target.closest('[data-action="select-professional"]')){const c=s.target.closest('[data-action="select-professional"]').dataset.profId,u=D.selectedProfessionalId===c&&c!=="all";if(D.selectedProfessionalId=u?"all":c,c!=="all"){const p=document.getElementById("profSearchInput");p&&(p.value=""),D.profSearchTerm=""}await re();return}if(!o)return;const n=o.dataset.action;let i=null;const l=s.target.closest("[data-appointment]");switch(l&&(i=JSON.parse(l.dataset.appointment.replace(/&apos;/g,"'"))),n){case"new-appointment":pa();break;case"edit-appointment":if(D.isSelectionMode||!i)return;if(i.status==="completed"){g("Atenção","Agendamentos finalizados não podem ser editados.","error");return}i.hasRewards&&!i.redeemedReward&&g("🎁 Cliente com Prêmios!","Este cliente tem pontos para resgatar. Verifique a Etapa 4 do agendamento.","info"),pa(i);break;case"delete-appointment":{if(D.isSelectionMode)return;const d=o.dataset.id;if(await z("Confirmar Exclusão","Tem a certeza que deseja apagar este agendamento?"))try{await Fa(d),g("Agendamento apagado!","success"),re()}catch(u){g(`Não foi possível apagar: ${u.message}`,"error")}break}case"open-comanda":if(D.isSelectionMode)return;if(i){i.hasRewards&&!i.redeemedReward&&i.status!=="completed"&&g("🎁 Cliente com Prêmios!","Este cliente tem pontos de fidelidade para resgatar.","info");const d=i.status==="completed"?"finalizadas":"em-atendimento",c={selectedAppointmentId:i.id,initialFilter:d};if(d==="finalizadas"){let u=i.startTime;if(i.transaction&&i.transaction.paidAt){const p=i.transaction.paidAt;typeof p=="object"&&p._seconds?u=new Date(p._seconds*1e3):u=p}c.filterDate=u}X("comandas-section",c)}break}}),Ga=!0),await Yr(),await re()}const cn=(e,t=null,a=1,r=12)=>{let s=`/api/comandas/${e}?page=${a}&limit=${r}`;return t&&(s+=`&date=${t}`),I(s)},un=(e,t)=>I(`/api/appointments/${e}/comanda`,{method:"POST",body:JSON.stringify({items:t})}),mn=e=>I("/api/sales",{method:"POST",body:JSON.stringify(e)}),pn=e=>I(`/api/sales/${e}`,{method:"DELETE"}),Gt=e=>I(`/api/products/${e}`),gn=e=>I("/api/products",{method:"POST",body:JSON.stringify(e)}),bn=(e,t)=>I(`/api/products/${e}`,{method:"PUT",body:JSON.stringify(t)}),fn=e=>I(`/api/products/${e}`,{method:"DELETE"}),vn=(e,t)=>I(`/api/products/${e}/stock`,{method:"PATCH",body:JSON.stringify(t)}),hn=({startDate:e,endDate:t,productId:a,categoryId:r,establishmentId:s})=>{const o=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&o.append("productId",a),r&&r!=="all"&&o.append("categoryId",r),s&&o.append("establishmentId",s),I(`/api/products/stock-history/report?${o.toString()}`)},xn=()=>I("/api/cashier/status").catch(e=>{if(e.message.includes("404")||e.message.includes("não encontrada"))return null;throw e}),yn=e=>{const t={establishmentId:e.establishmentId,initialAmount:Number(e.initialAmount),notes:e.notes||""};return console.log("Payload enviado para abrir caixa:",t),I("/api/cashier/open",{method:"POST",body:JSON.stringify(t)})},wn=(e,t)=>{const a={finalAmount:Number(t)};return console.log("Payload enviado para fechar caixa:",a),I(`/api/cashier/close/${e}`,{method:"PUT",body:JSON.stringify(a)})},kn=()=>I("/api/cashier/history").then(e=>e||[]).catch(e=>(console.error("Erro ao buscar histórico:",e),[])),Sn=e=>I(`/api/cashier/report/${e}`),Ca=e=>I(`/api/packages/${e}`),$n=e=>I("/api/packages",{method:"POST",body:JSON.stringify(e)}),En=(e,t)=>I(`/api/packages/${e}`,{method:"PUT",body:JSON.stringify(t)}),In=e=>I(`/api/packages/${e}`,{method:"DELETE"});let y={allComandas:[],catalog:{services:[],products:[],packages:[]},activeFilter:"atendimento",selectedComandaId:null,viewMode:"items",isCashierOpen:!1,activeCashierSessionId:null,loyaltySettings:null,pendingRedemption:null,paging:{page:1,limit:10,total:0},checkoutState:{payments:[],selectedMethod:"dinheiro",installments:1,amountReceived:"",discount:{type:"real",value:0},discountReason:""},isProcessing:!1},Ee=null,Le=null,Qa=null;function Yo(e,t){return function(...a){clearTimeout(Qa),Qa=setTimeout(()=>e.apply(this,a),t)}}async function Xa(e,t="stay"){if(!e||!e.id)return;e._localUpdatedAt=Date.now(),e._cachedItems=null,e._hasUnsavedChanges=!1,dt(),t==="checkout"&&(y.viewMode="checkout",y.checkoutState.payments||(y.checkoutState.payments=[]),y.checkoutState.selectedMethod="dinheiro",y.checkoutState.amountReceived="",y.checkoutState.discount.value||(y.checkoutState.discount={type:"real",value:0},y.checkoutState.discountReason=""),W());const a=document.createElement("div");a.id="saving-overlay",a.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",a.innerHTML=`
        <div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center animate-fade-in">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-800 font-bold text-lg">Sincronizando...</p>
        </div>
    `,document.body.appendChild(a);try{const r=(e.comandaItems||[]).filter(s=>s&&s.id&&String(s.id)!=="undefined"&&String(s.id)!=="null").map(s=>{const o={...s};if(o.id=String(s.id),o.type==="product"){const n=o.id;o.productId||(o.productId=n),o.product_id||(o.product_id=n)}if(o.type==="service"){const n=o.id;o.serviceId||(o.serviceId=n),o.service_id||(o.service_id=n)}return o});e.type==="walk-in"&&String(e.id).startsWith("temp-")||await un(e.id,r),document.body.contains(a)&&document.body.removeChild(a),t!=="checkout"&&(g("Sucesso","Comanda atualizada!","success"),W())}catch(r){document.body.contains(a)&&document.body.removeChild(a),console.error("Erro ao salvar:",r),e._hasUnsavedChanges=!0,W(),g("Erro","Falha ao salvar no servidor: "+r.message,"warning")}}function we(e){if(!e._cachedItems){let t=[];if(e.status==="completed"){const a=e.comandaItems||e.items||[];t=a.length>0?a:e.services||[]}else{const a=(e.services||[]).map(n=>({...n,_source:"original_service",type:"service"})),r=a.reduce((n,i)=>{const l=String(i.id);return n[l]=(n[l]||0)+1,n},{}),s=[...e.comandaItems||[],...e.items||[]],o=[];s.forEach(n=>{const i=String(n.id);(n.type==="service"||!n.type)&&r[i]>0?r[i]--:o.push({...n,_source:"extra"})}),t=[...a,...o]}return e._cachedItems=t,e._cachedTimestamp=Date.now(),t}return e._cachedItems}function Cn(){const e=document.getElementById("comandas-layout");if(e){e.classList.add("detail-view-active");const t=document.getElementById("comanda-detail-container");t&&(t.scrollTop=0)}}function Te(){const e=document.getElementById("comandas-layout");e&&e.classList.remove("detail-view-active")}function Ln(){const e=new Date().toISOString().split("T")[0];Le.innerHTML=`
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
    `,Yt()}function Yt(){const e=document.getElementById("cashier-alert-box"),t=document.getElementById("btn-new-sale");y.isCashierOpen?(e&&(e.innerHTML=""),t&&(t.classList.remove("opacity-50","cursor-not-allowed"),t.disabled=!1)):(e&&(e.innerHTML=`
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
        `),t&&(t.classList.add("opacity-50","cursor-not-allowed"),t.disabled=!0)),Tn()}function Tn(){const e=document.getElementById("cashier-controls");e&&(y.isCashierOpen?e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-green-700 bg-green-100 py-1 px-3 rounded-full border border-green-200">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-2 px-4 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 text-sm transition">Fechar Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm transition">Relatório</button>
        `:e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-red-700 bg-red-100 py-1 px-3 rounded-full border border-red-200">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-sm shadow transition">Abrir Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm transition">Relatório</button>
        `)}function dt(){const e=document.getElementById("comandas-list"),t=document.getElementById("pagination-container");if(!e)return;if(!y.isCashierOpen&&y.activeFilter==="atendimento"){e.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <svg class="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `,t&&(t.innerHTML="");return}const r={atendimento:"confirmed",finalizadas:"completed"}[y.activeFilter],s=y.allComandas.filter(n=>n.status===r);if(s.length===0){e.innerHTML='<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda encontrada.</p>',Za(t);return}const o=document.createDocumentFragment();s.forEach(n=>{const i=we(n);let l=0;n.status==="completed"&&n.totalAmount!==void 0&&n.totalAmount!==null?l=Number(n.totalAmount):l=i.reduce((k,E)=>k+Number(E.price||0),0);const c=n.loyaltyRedemption||n.discount&&n.discount.reason&&String(n.discount.reason).toLowerCase().includes("fidelidade")?'<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-5 h-5 ml-2" title="Prémio Resgatado">🎁</span>':"",u=n.id===y.selectedComandaId,p=new Date(n.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),h=n.type==="walk-in"||typeof n.id=="string"&&n.id.startsWith("temp-"),b=f(n.clientName||"Cliente sem nome"),v=f(n.professionalName||"Sem profissional"),x=h?'<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">Avulso</span>':'<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">Agenda</span>',w=document.createElement("div");w.className=`comanda-card cursor-pointer ${u?"selected":""}`,w.dataset.action="select-comanda",w.dataset.comandaId=n.id,w.innerHTML=`
            <div class="flex justify-between items-start mb-1 pointer-events-none">
                <p class="font-bold text-gray-800 truncate max-w-[70%] text-sm">${b}</p>
                <div class="flex items-center">
                    <p class="font-bold text-gray-900 text-sm">R$ ${l.toFixed(2)}</p>
                    ${c}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none">
                <div class="flex items-center gap-2">
                    ${x}
                    <p class="text-xs text-gray-500 truncate max-w-[100px]">${v}</p>
                </div>
                <p class="text-xs text-gray-400 font-medium">${p}</p> 
            </div>
        `,o.appendChild(w)}),e.innerHTML="",e.appendChild(o),Za(t)}function Za(e){if(!e)return;e.innerHTML="";const{page:t,total:a,limit:r}=y.paging,s=Math.ceil((a||0)/r);if(s===0)return;const o=document.createElement("div");o.className="flex gap-2 justify-center items-center w-full",o.innerHTML=`
        <button data-page="${t-1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t<=1?"opacity-50 cursor-not-allowed":""}" ${t<=1?"disabled":""}>&laquo;</button>
        <span class="text-xs font-semibold text-gray-600 mx-2">Pág ${t} de ${s||1}</span>
        <button data-page="${t+1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${t>=s?"opacity-50 cursor-not-allowed":""}" ${t>=s?"disabled":""}>&raquo;</button>
    `,e.appendChild(o),o.querySelectorAll("button[data-page]").forEach(n=>{n.onclick=i=>{i.stopPropagation();const l=parseInt(n.dataset.page,10);l>0&&l<=s&&(y.paging.page=l,ue())}})}function W(){const e=document.getElementById("comanda-detail-container");if(!e)return;const t=y.allComandas.find(v=>v.id===y.selectedComandaId);if(y.viewMode==="checkout"&&t){Dn(t,e);return}const a=`
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
        `;return}const r=we(t),s=t.status==="completed",o=t.type==="walk-in"||typeof t.id=="string"&&t.id.startsWith("temp-"),n=r.reduce((v,x)=>{const w=x._source==="original_service",k=x.id||x.name,E=w?`original-${k}`:`${x.type}-${k}`;return v[E]||(v[E]={...x,quantity:0,sources:[]}),v[E].quantity+=1,x._source&&v[E].sources.push(x._source),v},{}),i=Object.values(n).reduce((v,x)=>v+Number(x.price||0)*x.quantity,0),l=f(t.clientName||"Cliente sem nome"),d=f(t.professionalName||"Profissional não atribuído"),c=t._hasUnsavedChanges,h=`
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
                ${Object.values(n).map(v=>{const x=v.sources&&v.sources.includes("original_service"),w=y.pendingRedemption&&String(y.pendingRedemption.appliedToItemId)===String(v.id),k=v.isReward||w;return`
                    <div class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm ${k?"border-yellow-300 bg-yellow-50 ring-1 ring-yellow-200":""}">
                        <div class="flex items-center gap-3 w-full">
                            <div class="flex-grow min-w-0">
                                <p class="text-sm font-semibold text-gray-800 line-clamp-1">
                                    ${k?"🎁 ":""}
                                    ${f(v.name)}
                                    ${x?'<span class="text-[10px] text-indigo-600 bg-indigo-50 px-1 rounded border border-indigo-100 ml-1">Original</span>':""}
                                </p>
                                <p class="text-xs text-gray-500">${k?'<span class="text-yellow-700 font-bold bg-yellow-100 px-1 rounded">Prémio Fidelidade</span>':`R$ ${(v.price||0).toFixed(2)} un.`}</p>
                            </div>
                            ${s?`<span class="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg">${v.quantity}x</span>`:`
                                <div class="flex items-center bg-gray-100 rounded-lg p-1 gap-3">
                                    ${x?`<span class="text-sm font-bold text-gray-500 w-16 text-center py-1 bg-gray-200 rounded text-[10px] uppercase">Fixo: ${v.quantity}</span>`:`<button data-action="decrease-qty" data-item-id="${v.id}" data-item-type="${v.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-600">-</button>
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
                ${Object.keys(n).length===0?'<div class="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg text-sm">Nenhum item adicionado</div>':""}
            </div>
        </div>

        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div class="flex flex-col items-start lg:flex-row lg:justify-between lg:items-end mb-4">
                <span class="text-sm text-gray-500 font-medium">Total a Pagar</span>
                <span class="text-4xl lg:text-3xl font-extrabold text-gray-900 mt-1 lg:mt-0">R$ ${i.toFixed(2)}</span>
            </div>
            ${s?`
                <div class="bg-green-50 text-green-700 text-center py-3 rounded-xl font-bold border border-green-200 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Venda Finalizada
                </div>
            `:h}
        </footer>

        ${s?"":b}
    `,!s&&(t.clientId||t.clientName)&&Pn(t,e.querySelector("#loyalty-container"))}function Dn(e,t){const r=we(e).reduce((p,h)=>p+Number(h.price||0)*(h.quantity||1),0),s=y.checkoutState,o=s.discount||{type:"real",value:0};let n=0;o.type==="percent"?n=r*o.value/100:n=o.value,n>r&&(n=r);const i=r-n,l=s.payments.reduce((p,h)=>p+h.value,0),d=Math.max(0,i-l);(!s.amountReceived||d>0)&&(s.amountReceived=d.toFixed(2));const c=`
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

                <p class="text-5xl font-extrabold text-gray-800 mt-2" id="checkout-total-display">R$ ${i.toFixed(2)}</p>
                
                <div id="checkout-status-msg" class="mt-2">
                    ${d<=.01?'<p class="text-green-600 font-bold text-lg">Pago</p>':`<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${d.toFixed(2)}</span></p>`}
                </div>
            </div>

            <div class="space-y-3 mb-6">
                ${s.payments.map((p,h)=>`
                    <div class="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-3">
                             <div class="bg-gray-100 p-2 rounded-lg">
                                <span class="font-bold text-xs uppercase text-gray-600">${p.method}</span>
                             </div>
                             ${p.installments>1?`<span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">${p.installments}x</span>`:""}
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-gray-900">R$ ${p.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${h}" class="text-red-400 hover:text-red-600 p-1"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
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
                            ${Array.from({length:12},(p,h)=>`<option value="${h+1}" ${s.installments===h+1?"selected":""}>${h+1}x</option>`).join("")}
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
    `;const u=()=>{const p=y.checkoutState.discount.type,h=y.checkoutState.discount.value;let b=p==="percent"?r*h/100:h;b>r&&(b=r);const v=r-b,x=y.checkoutState.payments.reduce((C,A)=>C+A.value,0),w=Math.max(0,v-x),k=t.querySelector("#checkout-total-display");k&&(k.textContent=`R$ ${v.toFixed(2)}`);const E=t.querySelector("#checkout-status-msg");E&&(w<=.01?E.innerHTML='<p class="text-green-600 font-bold text-lg">Pago</p>':E.innerHTML=`<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${w.toFixed(2)}</span></p>`);const P=t.querySelector("#checkout-amount");P&&w>0&&document.activeElement!==P&&(P.value=w.toFixed(2))};t.querySelector("#discount-value")?.addEventListener("input",p=>{const h=parseFloat(p.target.value)||0;y.checkoutState.discount.value=h,u()}),t.querySelector("#discount-type")?.addEventListener("change",p=>{y.checkoutState.discount.type=p.target.value,u()}),t.querySelector("#discount-reason")?.addEventListener("input",p=>{y.checkoutState.discountReason=p.target.value}),t.querySelector("#checkout-amount")?.addEventListener("input",p=>{y.checkoutState.amountReceived=p.target.value}),t.querySelector("#checkout-installments")?.addEventListener("change",p=>{y.checkoutState.installments=parseInt(p.target.value,10)})}async function Pn(e,t){if(!t)return;const a=y.loyaltySettings;if(!a||!a.enabled)return;let r=null;try{if(e.clientId)r=await jo(m.establishmentId,e.clientId);else if(e.clientName){const i=await Wt(m.establishmentId,e.clientName,1);i&&i.length>0&&(r=i[0])}}catch(i){console.warn("Erro ao buscar dados de fidelidade",i)}if(!r||r.loyaltyPoints===void 0)return;const s=Number(r.loyaltyPoints)||0,n=(a.tiers||a.rewards||[]).filter(i=>{const l=Number(i.costPoints||i.points||0);return l>0&&s>=l});if(n.length>0){const i=document.createElement("div");i.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 shadow-sm flex justify-between items-center animate-fade-in",i.innerHTML=`
            <div class="flex items-center gap-3">
                <div class="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div>
                    <p class="text-sm font-bold text-yellow-800">Prémio Disponível!</p>
                    <p class="text-xs text-yellow-700">Saldo: <strong>${s} pts</strong></p>
                </div>
            </div>
        `;const l=document.createElement("button");l.innerText="Resgatar",l.className="text-xs font-bold bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-colors",l.onclick=()=>Bn(n,e),i.appendChild(l),t.innerHTML="",t.appendChild(i)}}function Bn(e,t){const a=`
        <div class="space-y-4">
            <p class="text-sm text-gray-600 mb-4">O cliente possui pontos suficientes para resgatar os seguintes itens:</p>
            <div class="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                ${e.map(o=>{const n=o.costPoints||o.points||0,i=o.name||o.reward,l=o.type||"money",d=o.discount?parseFloat(o.discount).toFixed(2):"0.00";let c="",u="bg-gray-100 text-gray-600";switch(l){case"service":c="Serviço",u="bg-indigo-100 text-indigo-700";break;case"product":c="Produto",u="bg-green-100 text-green-700";break;case"package":c="Pacote",u="bg-purple-100 text-purple-700";break;case"money":default:c="Valor Livre",u="bg-yellow-100 text-yellow-700";break}return`
                    <button data-action="select-reward" data-reward-id="${o.id||i}" class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group">
                        <div class="text-left flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded ${u}">${c}</span>
                                <p class="font-bold text-gray-800 group-hover:text-yellow-700">${f(i)}</p>
                            </div>
                            <p class="text-xs text-gray-500">Custo: ${n} pontos</p>
                        </div>
                        <div class="text-right">
                            <span class="block text-sm font-bold text-green-600">Desc. R$ ${d}</span>
                        </div>
                    </button>
                `}).join("")}
            </div>
        </div>
    `,{modalElement:r,close:s}=ee({title:"🎁 Resgatar Prémio",contentHTML:a,maxWidth:"max-w-md"});r.addEventListener("click",o=>{const n=o.target.closest('[data-action="select-reward"]');if(n){const i=n.dataset.rewardId,l=e.find(d=>d.id&&d.id==i||(d.name||d.reward)==i);l&&(Mn(l,t),s())}})}async function Mn(e,t){const a=Number(e.costPoints||e.points||0),r=e.name||e.reward,s=e.type||"money";if(s==="money"){const l=parseFloat(e.discount)||0;if(l<=0){g("Erro","O valor do desconto configurado é inválido.","error");return}y.checkoutState.discount={type:"real",value:l},y.checkoutState.discountReason=`Resgate Fidelidade: ${r}`,y.pendingRedemption={rewardId:e.id||null,name:r,cost:a,type:"money"},g("Sucesso",`Prémio "${r}" resgatado! Desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),W();return}const o=we(t),n=e.itemId?String(e.itemId):null;if(!n){g("Erro de Configuração",`O prémio "${r}" não tem um item vinculado nas configurações.`,"error");return}const i=o.find(l=>{const d=l.id?String(l.id):null,c=l.serviceId?String(l.serviceId):l.service_id?String(l.service_id):null,u=l.productId?String(l.productId):l.product_id?String(l.product_id):null;return s==="service"?d===n||c===n:s==="product"?d===n||u===n:s==="package"?d===n:!1});if(i){let l=parseFloat(e.discount);(!l||l<=0)&&(l=parseFloat(i.price||0)),y.checkoutState.discount={type:"real",value:l},y.checkoutState.discountReason=`Resgate Fidelidade: ${r}`,y.pendingRedemption={rewardId:e.id||null,name:r,cost:a,type:s,appliedToItemId:i.id},g("Sucesso",`Prémio "${r}" resgatado! Item encontrado e desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),W()}else g("Item Não Encontrado",`Para resgatar o prémio "${r}", o ${s==="service"?"serviço":s==="product"?"produto":"pacote"} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`,"warning")}function An(){if(!y.isCashierOpen)return g("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");const{modalElement:e,close:t}=ee({title:"Adicionar Item à Comanda",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-4xl"}),a=()=>{const s=e.querySelector("#add-item-content");s.innerHTML=`
            <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-purple-600">Pacotes</h4><div id="modal-package-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
            </div>`;const o=(i="")=>{const l=i.toLowerCase(),d={service:'<svg class="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',package:'<svg class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'},c={"modal-service-list":{items:y.catalog.services,type:"service"},"modal-product-list":{items:y.catalog.products,type:"product"},"modal-package-list":{items:y.catalog.packages,type:"package"}};Object.entries(c).forEach(([u,{items:p,type:h}])=>{const b=document.getElementById(u);if(!b)return;const v=p.filter(x=>x.name.toLowerCase().includes(l)).slice(0,50);b.innerHTML=v.map(x=>x.id?`
                    <button data-action="select-item-for-quantity" data-item-type="${h}" data-item-id="${x.id}" class="flex items-center gap-2 w-full p-2 bg-white border rounded hover:bg-gray-50 transition text-left">
                        <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-50">${d[h]}</div>
                        <span class="flex-grow text-sm truncate">${f(x.name)}</span>
                        <span class="font-bold text-xs text-gray-700">R$ ${x.price.toFixed(2)}</span>
                    </button>
                `:"").join("")||'<p class="text-xs text-gray-400 text-center py-2">Nada encontrado</p>'})};o();const n=document.getElementById("item-search-input");n.addEventListener("input",Yo(i=>{o(i.target.value)},300)),setTimeout(()=>n.focus(),100)},r=s=>{let o=1;const n=e.querySelector("#add-item-content"),i=()=>{document.getElementById("quantity-display").textContent=o,document.getElementById("quantity-minus-btn").disabled=o<=1};n.innerHTML=`
            <div class="text-center p-8 relative">
                <button data-action="back-to-catalog" class="absolute top-0 left-0 text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Voltar
                </button>
                <h3 class="font-bold text-2xl text-gray-800 mt-4">${f(s.name)}</h3>
                <p class="text-lg text-gray-500 font-medium">R$ ${s.price.toFixed(2)}</p>
                <div class="my-8 flex items-center justify-center gap-6">
                    <button id="quantity-minus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition disabled:opacity-50">-</button>
                    <span id="quantity-display" class="text-5xl font-bold w-24 text-center text-indigo-700">${o}</span>
                    <button id="quantity-plus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition">+</button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg text-lg">Adicionar à Comanda</button>
            </div>
        `,document.getElementById("quantity-minus-btn").onclick=()=>{o>1&&(o--,i())},document.getElementById("quantity-plus-btn").onclick=()=>{o++,i()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await Xo(s,o),t()}};e.addEventListener("click",s=>{const o=s.target.closest('[data-action="select-item-for-quantity"]'),n=s.target.closest('[data-action="back-to-catalog"]');if(o){const{itemType:i,itemId:l}=o.dataset,c=(y.catalog[i+"s"]||[]).find(u=>u.id===l);c&&r({...c,type:i})}else n&&a()}),a()}async function ga(e=null){if(!y.isCashierOpen)return g("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");if(!m.professionals||m.professionals.length===0)try{m.professionals=await se(m.establishmentId)}catch{return g("Erro","Não foi possível carregar profissionais.","error")}const a=`
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
                <select id="new-sale-professional" required class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Selecione...</option>${m.professionals.map(l=>`<option value="${l.id}">${f(l.name)}</option>`).join("")}</select>
            </div>
            <div class="pt-4 border-t"><button type="submit" id="btn-start-sale" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">Iniciar Venda</button></div>
        </form>
    `,{modalElement:r}=ee({title:"Nova Venda Avulsa",contentHTML:a,maxWidth:"max-w-md"}),s=r.querySelector("#client-search"),o=r.querySelector("#client-suggestions"),n=r.querySelector("#selected-client-id");e&&(n.value=e.id,s.value=`${e.name} (${e.phone||"Sem tel"})`,s.classList.add("bg-green-50","border-green-300","text-green-800")),s.addEventListener("input",Yo(async l=>{const d=l.target.value.trim();if(n.value="",s.classList.remove("bg-green-50","border-green-300","text-green-800"),d.length<2){o.classList.add("hidden");return}try{o.innerHTML='<li class="p-2 text-xs text-gray-500">Buscando...</li>',o.classList.remove("hidden");const c=await Wt(m.establishmentId,d,10);c.length===0?o.innerHTML='<li class="p-2 text-xs text-gray-500">Nenhum cliente encontrado</li>':o.innerHTML=c.map(u=>`<li data-client-id="${u.id}" data-client-name="${u.name}" data-client-phone="${u.phone}" class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 transition-colors"><div class="font-bold text-sm text-gray-800">${f(u.name)}</div><div class="text-xs text-gray-500">${u.phone||"Sem telefone"}</div></li>`).join("")}catch{o.classList.add("hidden")}},400)),o.addEventListener("click",l=>{const d=l.target.closest("li[data-client-id]");d&&(n.value=d.dataset.clientId,n.dataset.name=d.dataset.clientName,n.dataset.phone=d.dataset.clientPhone,s.value=`${d.dataset.clientName}`,s.classList.add("bg-green-50","border-green-300","text-green-800"),o.classList.add("hidden"))}),document.addEventListener("click",l=>{!s.contains(l.target)&&!o.contains(l.target)&&o.classList.add("hidden")}),r.querySelector("#new-sale-form").addEventListener("submit",On);const i=r.querySelector('[data-action="new-client-from-sale"]');i&&i.addEventListener("click",l=>{l.preventDefault(),r.style.display="none",qn()})}function qn(){ee({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("comandas_clientRegistrationForm");t&&t.addEventListener("submit",Rn)}async function Rn(e){e.preventDefault();const t=document.getElementById("comandas_clientRegistrationForm");if(!t)return;const a=t.querySelector("#regClientName"),s=t.querySelector("#regClientPhone").value.replace(/\D/g,"");if(!a.value||!s)return g("Erro","Nome e Telefone são obrigatórios.","error");try{const o=await Ur(m.establishmentId,s);if(o)g("Atenção","Cliente já cadastrado.","info"),document.getElementById("genericModal").style.display="none",ga(o);else{const n=await Ea({establishmentId:m.establishmentId,name:a.value,phone:s});g("Sucesso","Cliente cadastrado!","success"),document.getElementById("genericModal").style.display="none",ga(n)}}catch(o){g("Erro",o.message,"error")}}async function Nn(){const e=`
        <form id="open-cashier-form" class="space-y-4">
            <div>
                <label for="initial-amount" class="block text-sm font-medium text-gray-700">Valor Inicial do Caixa</label>
                <div class="mt-1 relative"><span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span><input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold" placeholder="0.00" value="0.00"></div>
            </div>
            <div class="pt-4 border-t"><button type="submit" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition shadow-md">Confirmar Abertura</button></div>
        </form>
    `,{modalElement:t}=ee({title:"Abrir Caixa",contentHTML:e,maxWidth:"max-w-md"});t.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const r=parseFloat(document.getElementById("initial-amount").value);if(isNaN(r)||r<0)return g("Valor Inválido","Insira um valor válido.","error");try{const s=await yn({establishmentId:m.establishmentId,initialAmount:parseFloat(r.toFixed(2))});y.isCashierOpen=!0,y.activeCashierSessionId=s.id,document.getElementById("genericModal").style.display="none",g("Sucesso!",`Caixa aberto (R$ ${r.toFixed(2)})`,"success"),Yt(),await ue()}catch(s){g("Erro",`Falha ao abrir caixa: ${s.message}`,"error")}})}async function jn(){const e=y.activeCashierSessionId;if(e)try{const t=await Sn(e),a=`
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
        `,{modalElement:r}=ee({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-md"});r.querySelector("#close-cashier-form").addEventListener("submit",async s=>{s.preventDefault();const o=parseFloat(document.getElementById("final-amount").value);if(isNaN(o)||o<0)return g("Valor Inválido","Insira um valor final válido.","error");try{await wn(e,o),y.isCashierOpen=!1,y.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",Yt(),await ue(),g("Sucesso!","Caixa fechado com sucesso!","success")}catch(n){g("Erro",`Falha ao fechar caixa: ${n.message}`,"error")}})}catch(t){g("Erro",`Falha ao carregar relatório: ${t.message}`,"error")}}async function Fn(e){if(y.activeFilter===e)return;y.activeFilter=e,y.paging.page=1,document.querySelectorAll(".filter-btn").forEach(a=>a.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${e}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",e!=="finalizadas"),Te(),y.selectedComandaId=null,y.viewMode="items";const t=document.getElementById("comandas-list");t&&(t.innerHTML='<div class="loader mx-auto mt-10"></div>'),await ue(),W()}function Qo(e){y.selectedComandaId=e,y.viewMode="items",y.pendingRedemption=null,y.checkoutState.discount={type:"real",value:0},y.checkoutState.discountReason="",dt(),Cn(),W()}async function Xo(e,t){const a=y.allComandas.find(o=>o.id===y.selectedComandaId);if(!a)return;if(!e.id||String(e.id)==="undefined"){console.error("Tentativa de adicionar item sem ID:",e),g("Erro","Item sem identificador. Não foi possível adicionar.","error");return}const r=parseFloat(e.price)||0,s=Array(t).fill(0).map(()=>{const o={id:String(e.id),name:e.name,price:r,type:e.type,isReward:e.isReward||!1,pointsCost:e.pointsCost||0};return e.type==="product"?(o.productId=o.id,o.product_id=o.id):e.type==="service"&&(o.serviceId=o.id,o.service_id=o.id),o});a.comandaItems=a.comandaItems||[],a.comandaItems.push(...s),a._cachedItems=null,a._hasUnsavedChanges=!0,W()}async function Ka(e,t){const a=y.allComandas.find(o=>o.id===y.selectedComandaId);if(!a)return;let r=!1,s=(a.comandaItems||[]).findIndex(o=>o.id==e&&o.type===t);s>-1&&(a.comandaItems.splice(s,1),r=!0),r&&(a._cachedItems=null,a._hasUnsavedChanges=!0,W())}async function Hn(e){if(y.isProcessing)return;const t=we(e),a=t.reduce((x,w)=>x+Number(w.price||0)*(w.quantity||1),0),r=y.checkoutState.discount||{type:"real",value:0};let s=r.type==="percent"?a*r.value/100:r.value;s>a&&(s=a);const o=a-s,{payments:n}=y.checkoutState,i=n.reduce((x,w)=>x+w.value,0),l=o-i;if(l>.01){if(!await z("Pagamento Parcial",`O valor de R$ ${l.toFixed(2)} não foi pago. Deseja registrar como DÍVIDA (Fiado) no cadastro do cliente?`))return;n.push({method:"fiado",value:l,installments:1})}y.isProcessing=!0;const d=e.type==="appointment",c=t;let u=0;const p=y.loyaltySettings;p&&p.enabled&&(u=parseInt(p.pointsPerVisit||1,10),console.log(`Fidelidade: Cliente ganhou ${u} pontos fixos pela visita.`));const h={...r,reason:y.checkoutState.discountReason||""},b={payments:n,totalAmount:Number(o),items:c,cashierSessionId:y.activeCashierSessionId,loyaltyPointsEarned:u,discount:h,loyaltyRedemption:y.pendingRedemption},v=document.createElement("div");v.className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm",v.innerHTML='<div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center"><div class="loader mb-4 border-t-indigo-600"></div><p>Finalizando venda...</p></div>',document.body.appendChild(v);try{d?await Ks(e.id,b):(b.establishmentId=m.establishmentId,b.clientId=e.clientId,b.clientName=e.clientName,b.professionalId=e.professionalId,e.clientPhone&&(b.clientPhone=e.clientPhone),await mn(b));let x="Venda finalizada com sucesso!";u>0&&(x+=` Cliente ganhou ${u} pontos!`),g("Sucesso!",x,"success"),Te(),y.selectedComandaId=null,y.viewMode="items",y.pendingRedemption=null,await ue()}catch(x){g("Erro no Checkout",x.message,"error")}finally{document.body.contains(v)&&document.body.removeChild(v),y.isProcessing=!1}}async function On(e){e.preventDefault();const t=document.getElementById("selected-client-id"),a=document.getElementById("new-sale-professional").value,r=t.value,s=document.getElementById("client-search").value,o=t.dataset.phone||"";if(!r)return g("Erro","Selecione um cliente válido.","error");const n=m.professionals.find(l=>l.id===a);if(!n)return g("Erro","Selecione um profissional válido.","error");const i={id:`temp-${Date.now()}`,type:"walk-in",clientId:r,clientName:s.split("(")[0].trim(),clientPhone:o,professionalId:n.id,professionalName:n.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};y.allComandas.unshift(i),y.selectedComandaId=i.id,y.viewMode="items",document.getElementById("genericModal").style.display="none",Qo(i.id)}async function ue(){const e=document.getElementById("comandas-list");(!e.hasChildNodes()||e.innerHTML.includes("loader"))&&(e.innerHTML='<div class="loader mx-auto mt-10"></div>');const t=y.activeFilter==="finalizadas"?document.getElementById("filter-date").value:null;try{const a=xn(),r=cn(m.establishmentId,t,y.paging.page,y.paging.limit),s=ye(m.establishmentId),[o,n,i]=await Promise.all([a,r,s]);if(y.isCashierOpen=!!o,y.activeCashierSessionId=o?o.id:null,Yt(),i&&i.loyaltyProgram&&(y.loyaltySettings=i.loyaltyProgram),!y.isCashierOpen&&y.activeFilter==="atendimento"){dt(),W();return}if(y.allComandas=n.data||n,y.paging.total=n.total||n.length,y.catalog.services.length===0){const[l,d,c,u]=await Promise.all([Se(m.establishmentId),Gt(m.establishmentId),Ca(m.establishmentId),se(m.establishmentId)]);y.catalog={services:l,products:d,packages:c},m.professionals=u}dt(),W()}catch(a){g("Erro",`Não foi possível carregar os dados: ${a.message}`,"error")}}async function zn(e={}){Le=document.getElementById("content"),y.selectedComandaId=e.selectedAppointmentId||null,y.viewMode="items",Ln(),Ee&&(Le.removeEventListener("click",Ee),Le.removeEventListener("change",Ee)),Ee=async t=>{const a=t.target.closest("[data-action], [data-filter], [data-comanda-id]");if(t.target.id==="filter-date"&&y.activeFilter==="finalizadas"){y.paging.page=1,await ue();return}if(a){if(a.matches("[data-filter]"))Fn(a.dataset.filter);else if(a.matches("[data-comanda-id]")){if(t.target.closest('[data-action="go-to-appointment"]')){t.stopPropagation();return}Qo(a.dataset.comandaId)}else if(a.matches("[data-action]")){const s=a.dataset.action,o=a.dataset.id||y.selectedComandaId,n=y.allComandas.find(i=>i.id===o);switch(s){case"back-to-list":Te(),y.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach(k=>k.classList.remove("selected")),W();break;case"new-sale":ga();break;case"add-item":An();break;case"open-cashier":Nn();break;case"close-cashier":await jn();break;case"view-sales-report":X("sales-report-section");break;case"go-to-checkout":await Xa(n,"checkout");break;case"back-to-items":y.viewMode="items",W();break;case"save-comanda":await Xa(n,"stay");break;case"select-method":y.checkoutState.selectedMethod=a.dataset.method,y.checkoutState.installments=1,W();break;case"add-payment-checkout":const i=document.getElementById("checkout-amount");let l=parseFloat(i.value);const c=we(n).reduce((k,E)=>k+(E.price||0),0),u=y.checkoutState.discount||{type:"real",value:0};let p=u.type==="percent"?c*u.value/100:u.value;p>c&&(p=c);const h=c-p,b=y.checkoutState.payments.reduce((k,E)=>k+E.value,0),v=h-b;if(isNaN(l)||l<=0){g("Valor inválido","Insira um valor maior que zero.","error");break}if(l>v+.05){g("Valor inválido","Valor excede o restante.","error");break}const x={method:y.checkoutState.selectedMethod,value:l};["credito","crediario"].includes(y.checkoutState.selectedMethod)&&y.checkoutState.installments>1&&(x.installments=y.checkoutState.installments),y.checkoutState.payments.push(x),y.checkoutState.selectedMethod="dinheiro",y.checkoutState.installments=1,y.checkoutState.amountReceived="",W();break;case"remove-payment-checkout":const w=parseInt(a.dataset.index,10);y.checkoutState.payments.splice(w,1),W();break;case"finalize-checkout":await Hn(n);break;case"increase-qty":{const k=a.dataset.itemId,E=a.dataset.itemType;if(!k||k==="undefined"||k==="null"){g("Erro","Item inválido para adição.","error");return}let C=we(n).find(j=>j.id==k&&j.type===E);C||(C=(y.catalog[E+"s"]||[]).find(T=>T.id==k));const A=C?{id:C.id,name:C.name,price:Number(C.price),type:C.type}:{id:k,name:"Item Indisponível",price:0,type:E};await Xo(A,1);break}case"decrease-qty":{await Ka(a.dataset.itemId,a.dataset.itemType);break}case"remove-item":await Ka(a.dataset.itemId,a.dataset.itemType);break;case"reopen-appointment":{if(await z("Reabrir Comanda","Tem certeza? O pagamento será estornado."))try{await Zs(o);const E=y.allComandas.findIndex(P=>P.id===o);E!==-1&&(y.allComandas[E].status="confirmed",delete y.allComandas[E].transaction),y.selectedComandaId=null,Te(),await ue(),g("Sucesso!","Comanda reaberta.","success")}catch(E){g("Erro",E.message,"error")}break}case"go-to-appointment":{const k=a.dataset.id,E=a.dataset.date;X("agenda-section",{scrollToAppointmentId:k,targetDate:new Date(E)});break}case"delete-walk-in":{if(await z("Excluir Venda","Confirma a exclusão desta venda avulsa?"))if(o.startsWith("temp-"))y.allComandas=y.allComandas.filter(E=>E.id!==o),y.selectedComandaId=null,dt(),W(),Te();else try{await pn(o),g("Sucesso","Venda excluída.","success"),y.selectedComandaId=null,Te(),await ue()}catch(E){g("Erro",E.message,"error")}break}}}}},Le.addEventListener("click",Ee),Le.addEventListener("change",Ee),e.initialFilter&&(y.activeFilter=e.initialFilter==="finalizadas"?"finalizadas":"atendimento"),e.selectedAppointmentId&&(y.selectedComandaId=e.selectedAppointmentId),document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${y.activeFilter}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",y.activeFilter!=="finalizadas"),e.filterDate&&(document.getElementById("filter-date").value=new Date(e.filterDate).toISOString().split("T")[0]),await ue()}const Qt=e=>I(`/api/financial/natures/${e}`),Vn=e=>I("/api/financial/natures",{method:"POST",body:JSON.stringify(e)}),Un=e=>I(`/api/financial/natures/${e}`,{method:"DELETE"}),La=e=>I(`/api/financial/cost-centers/${e}`),_n=e=>I("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(e)}),Wn=e=>I(`/api/financial/cost-centers/${e}`,{method:"DELETE"}),Zo=(e,t)=>I(`/api/financial/${e}`,{method:"POST",body:JSON.stringify(t)}),Ko=(e,t={})=>{let a=`/api/financial/${e}`;const r=new URLSearchParams;t.establishmentId&&r.append("establishmentId",t.establishmentId),t.startDate&&r.append("startDate",t.startDate),t.endDate&&r.append("endDate",t.endDate),t.natureId&&r.append("natureId",t.natureId),t.costCenterId&&r.append("costCenterId",t.costCenterId),t.status&&r.append("status",t.status);const s=r.toString();return s&&(a+=`?${s}`),I(a)},es=(e,t,a)=>I(`/api/financial/${e}/${t}`,{method:"PUT",body:JSON.stringify(a)}),ts=(e,t)=>I(`/api/financial/${e}/${t}`,{method:"DELETE"}),as=(e,t)=>{const a=t.map(r=>I(`/api/financial/${e}/${r}`,{method:"DELETE"}));return Promise.all(a)},os=(e,t,a)=>I(`/api/financial/${e}/${t}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),Jn=e=>Zo("payables",e),ss=e=>Ko("payables",e),Gn=(e,t)=>es("payables",e,t),Yn=e=>ts("payables",e),Qn=(e,t)=>os("payables",e,t),Xn=e=>Zo("receivables",e),rs=e=>Ko("receivables",e),Zn=(e,t)=>es("receivables",e,t),Kn=e=>ts("receivables",e),ei=(e,t)=>os("receivables",e,t),ba=document.getElementById("content");let K={};const vt={creditRealized:"#10b981",creditProvisioned:"#6ee7b7",debitRealized:"#ef4444",debitProvisioned:"#fca5a5"},ti=["#4f46e5","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4"],B={startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],selectedProfessional:"all",selectedCostCenter:"all",professionalsList:[],costCentersList:[],naturesList:[],rawPayables:[],rawReceivables:[],processedDRE:null,processedCashFlow:null,processedDailyRevenue:null,backendData:null,appointmentsData:[],currentTab:"dashboards",isFilterOpen:!1};async function ai(){if(!window.Chart)return new Promise((e,t)=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js",a.onload=e,a.onerror=t,document.head.appendChild(a)})}async function oi(){ba.innerHTML=`
        <div class="flex flex-col items-center justify-center h-[calc(100vh-100px)] w-full">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-500 font-medium animate-pulse">Carregando inteligência...</p>
        </div>`;try{await ai();const[e,t,a]=await Promise.all([se(m.establishmentId),Dr(m.establishmentId).catch(()=>[]),Qt(m.establishmentId).catch(()=>[])]);B.professionalsList=e||[],B.costCentersList=t||[],B.naturesList=a||[],si(),await ns()}catch(e){console.error("Erro no loadReportsPage:",e),ba.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full text-red-500 p-6 text-center w-full">
                <div class="bg-red-50 p-4 rounded-full mb-4"><svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                <h3 class="text-lg font-bold text-gray-800">Ops! Algo deu errado.</h3>
                <p class="text-sm text-gray-600 mt-2 max-w-xs mx-auto break-words">${f(e.message)}</p>
                <button onclick="window.location.reload()" class="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-transform active:scale-95">Tentar Novamente</button>
            </div>`}}function si(){const e=B.professionalsList.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join(""),t=B.costCentersList.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join("");ba.innerHTML=`
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
                                ${Pt(B.startDate)} até ${Pt(B.endDate)}
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
                            <input type="date" id="report-start" value="${B.startDate}" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Fim</label>
                            <input type="date" id="report-end" value="${B.endDate}" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
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
    `,document.getElementById("toggle-filters-btn").onclick=eo,document.getElementById("btn-apply-filters").onclick=()=>{ri(),eo()},document.querySelectorAll(".tab-btn").forEach(a=>{a.onclick=()=>{B.currentTab=a.dataset.tab,to(),is(),window.scrollTo({top:0,behavior:"smooth"})}}),to()}function eo(){const e=document.getElementById("filters-container"),t=document.getElementById("toggle-filters-btn");B.isFilterOpen=!B.isFilterOpen,B.isFilterOpen?(e.classList.remove("hidden"),t.classList.add("bg-indigo-100","text-indigo-800")):(e.classList.add("hidden"),t.classList.remove("bg-indigo-100","text-indigo-800"))}function to(){document.querySelectorAll(".tab-btn").forEach(e=>{const t=e.dataset.tab===B.currentTab;e.className=t?"tab-btn py-2 px-6 rounded-full text-xs md:text-sm font-bold bg-indigo-600 text-white shadow-md transform scale-105 transition-all whitespace-nowrap border-transparent":"tab-btn py-2 px-6 rounded-full text-xs md:text-sm font-medium text-gray-500 bg-white border-gray-200 hover:bg-gray-50 transition-all whitespace-nowrap"})}function Pt(e){if(!e)return"";const t=e.split("-");return`${t[2]}/${t[1]}`}async function ri(){B.startDate=document.getElementById("report-start").value,B.endDate=document.getElementById("report-end").value,B.selectedProfessional=document.getElementById("report-prof").value,B.selectedCostCenter=document.getElementById("report-cost").value,document.getElementById("date-range-display").textContent=`${Pt(B.startDate)} até ${Pt(B.endDate)}`,await ns()}function ni(e,t){const a=new Map;B.naturesList.forEach(s=>a.set(s.id,s.name));const r={revenues:{},expenses:{},totalRevenues:0,totalExpenses:0,netResult:0};return t.forEach(s=>{if(s.status==="paid"){const o=s.naturezaId?a.get(s.naturezaId)||"Outras Receitas":"Geral";r.revenues[o]||(r.revenues[o]=0),r.revenues[o]+=s.amount,r.totalRevenues+=s.amount}}),e.forEach(s=>{if(s.status==="paid"){const o=s.naturezaId?a.get(s.naturezaId)||"Outras Despesas":"Geral";r.expenses[o]||(r.expenses[o]=0),r.expenses[o]+=s.amount,r.totalExpenses+=s.amount}}),r.netResult=r.totalRevenues-r.totalExpenses,r}function ii(e,t){const a={},r=d=>{a[d]||(a[d]={realizedCredit:0,provisionedCredit:0,realizedDebit:0,provisionedDebit:0})};let s=new Date(B.startDate);const o=new Date(B.endDate);for(;s<=o;)r(s.toISOString().split("T")[0]),s.setDate(s.getDate()+1);t.forEach(d=>{const c=d.dueDate.split("T")[0];a[c]&&(d.status==="paid"?a[c].realizedCredit+=d.amount:a[c].provisionedCredit+=d.amount)}),e.forEach(d=>{const c=d.dueDate.split("T")[0];a[c]&&(d.status==="paid"?a[c].realizedDebit+=d.amount:a[c].provisionedDebit+=d.amount)});const n=Object.keys(a).sort(),i=[];let l=0;return n.forEach(d=>{const c=a[d],u=c.realizedCredit+c.provisionedCredit-(c.realizedDebit+c.provisionedDebit);l+=u,i.push(l)}),{labels:n,realizedCredit:n.map(d=>a[d].realizedCredit),provisionedCredit:n.map(d=>a[d].provisionedCredit),realizedDebit:n.map(d=>a[d].realizedDebit*-1),provisionedDebit:n.map(d=>a[d].provisionedDebit*-1),balance:i}}function li(e){const t={};let a=new Date(B.startDate);const r=new Date(B.endDate);for(;a<=r;)t[a.toISOString().split("T")[0]]=0,a.setDate(a.getDate()+1);e.forEach(n=>{if(n.status==="paid"){const i=n.dueDate.split("T")[0];t.hasOwnProperty(i)&&(t[i]+=n.amount)}});const s=Object.keys(t).sort(),o=s.map(n=>t[n]);return{labels:s,data:o}}function di(e){const t=e.length;if(t<2)return{trendData:Array(t).fill(e[0]||0),color:"#9ca3af"};let a=0,r=0,s=0,o=0;for(let c=0;c<t;c++)a+=c,r+=e[c],s+=c*e[c],o+=c*c;const n=(t*s-a*r)/(t*o-a*a),i=(r-n*a)/t,l=[];for(let c=0;c<t;c++)l.push(n*c+i);const d=n>=0?"#10b981":"#ef4444";return{trendData:l,color:d}}async function ns(){const e=document.getElementById("report-content");e.innerHTML='<div class="flex justify-center py-20 w-full"><div class="loader border-t-indigo-600"></div></div>';try{const t={startDate:B.startDate,endDate:B.endDate,establishmentId:m.establishmentId};B.selectedCostCenter!=="all"&&(t.costCenterId=B.selectedCostCenter);const[a,r]=await Promise.all([ss(t),rs(t)]);B.rawPayables=a.entries||[],B.rawReceivables=r.entries||[];const s=await Tr(B.startDate,B.endDate,B.selectedProfessional,B.selectedCostCenter).catch(()=>({charts:{professionals:{labels:[],data:[]},salesMonthly:{labels:[],data:[]}}}));B.backendData=s,B.processedDRE=ni(B.rawPayables,B.rawReceivables),B.processedCashFlow=ii(B.rawPayables,B.rawReceivables),B.processedDailyRevenue=li(B.rawReceivables);const o=new Date(B.startDate+"T00:00:00").toISOString(),n=new Date(B.endDate+"T23:59:59").toISOString(),i=B.selectedProfessional==="all"?null:B.selectedProfessional,l=await Bo(m.establishmentId,o,n,i).catch(()=>[]);B.appointmentsData=Array.isArray(l)?l:[],is()}catch(t){console.error(t),e.innerHTML=`
            <div class="bg-red-50 border border-red-100 p-6 rounded-2xl text-center mx-4 w-full">
                <p class="font-bold text-gray-800">Não foi possível carregar</p>
                <p class="text-sm text-gray-500 mt-1">${f(t.message||"Verifique sua conexão.")}</p>
            </div>`}}function is(){const e=document.getElementById("report-content");switch(B.currentTab){case"dashboards":ci(e);break;case"appointments":ui(e);break;case"dre":mi(e);break}}function ci(e){const t=B.processedDRE,a=B.processedDailyRevenue,r=B.backendData.charts?.salesMonthly||{labels:[],data:[]},s=B.backendData.charts?.professionals||{labels:[],data:[]};e.innerHTML=`
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
    `,pi("chart-cashflow-modern",B.processedCashFlow),ao("chart-daily-revenue","Receita Diária",a.labels.map(o=>o.split("-").reverse().slice(0,2).join("/")),a.data),ao("chart-monthly","Receita Mensal",r.labels,r.data),bi("chart-profs","doughnut","Total Vendas",s.labels,s.data,ti),document.querySelectorAll(".chart-toggle").forEach(o=>{o.addEventListener("change",n=>{const i=K["chart-cashflow-modern"];if(i){const l=parseInt(n.target.dataset.dataset);i.setDatasetVisibility(l,n.target.checked),i.update()}})})}function ui(e){const t=B.appointmentsData,a=t.length;let r=0,s=0,o=0;const n={},i={};let l=new Date(B.startDate);const d=new Date(B.endDate);for(;l<=d;)n[l.toISOString().split("T")[0]]={active:0,cancelled:0},l.setDate(l.getDate()+1);t.forEach(b=>{const v=parseFloat(b.totalAmount||b.price||0),x=(b.status||"").toLowerCase();let w="";if(b.startTime){const E=b.startTime.toDate?b.startTime.toDate():new Date(b.startTime);isNaN(E)||(w=E.toISOString().split("T")[0])}const k=b.professionalName||"Sem Profissional";i[k]||(i[k]={name:k,count:0,value:0}),["cancelled","cancelado","no-show","cancelada"].includes(x)?(s++,w&&n[w]&&n[w].cancelled++):(["completed","finalized","paid"].includes(x)&&r++,o+=v,w&&n[w]&&n[w].active++,i[k].count++,i[k].value+=v)});const c=Object.keys(n).sort(),u=c.map(b=>n[b].active),p=c.map(b=>n[b].cancelled),h=Object.values(i).sort((b,v)=>v.value-b.value);e.innerHTML=`
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
                        ${h.map((b,v)=>{const x=h[0]?.value||1,w=b.value/x*100;return`
                            <tr class="group">
                                <td class="p-3 md:p-4 w-8 md:w-12 text-center font-bold text-gray-300">${v+1}</td>
                                <td class="p-3 md:p-4 pl-0 min-w-[100px]">
                                    <p class="font-bold text-gray-800 truncate max-w-[120px] md:max-w-xs">${f(b.name)}</p>
                                    <div class="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                        <div class="h-full bg-indigo-500 rounded-full" style="width: ${w}%"></div>
                                    </div>
                                </td>
                                <td class="p-3 md:p-4 text-center">
                                    <span class="bg-indigo-50 text-indigo-700 px-2 md:px-2.5 py-1 rounded-lg font-bold text-xs">${b.count}</span>
                                </td>
                                <td class="p-3 md:p-4 text-right font-bold text-gray-700 whitespace-nowrap">R$ ${b.value.toLocaleString("pt-BR",{minimumFractionDigits:0})}</td>
                            </tr>
                        `}).join("")}
                        ${h.length===0?'<tr><td colspan="4" class="p-8 text-center text-gray-400">Sem dados.</td></tr>':""}
                    </tbody>
                </table>
            </div>
        </div>
    `,gi("chart-appointments-daily",c,u,p),document.querySelectorAll(".app-chart-toggle").forEach(b=>{b.addEventListener("change",v=>{const x=K["chart-appointments-daily"];if(x){const w=parseInt(v.target.dataset.dataset);x.setDatasetVisibility(w,v.target.checked),x.update()}})})}function mi(e){const t=B.processedDRE;if(!t)return;const a=t.totalRevenues,r=(i,l,d,c=!1)=>{const u=a>0?l/a*100:0,p=c?"- ":"";return`
        <div class="flex items-center justify-between py-2 md:py-3 px-3 md:px-4 border-b border-dashed border-gray-100 last:border-0 w-full">
            <div class="flex-1 pr-2 md:pr-4 overflow-hidden min-w-0">
                <p class="text-[10px] md:text-xs font-semibold text-gray-600 truncate">${f(i)}</p>
                <div class="w-full h-1 bg-gray-100 rounded-full mt-1.5 overflow-hidden max-w-[80px] md:max-w-[100px]">
                    <div class="h-full ${d.replace("text-","bg-")} opacity-40" style="width: ${Math.min(u,100)}%"></div>
                </div>
            </div>
            <div class="text-right flex-shrink-0">
                <p class="text-xs md:text-sm font-bold ${d}">${p}R$ ${l.toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>
                <p class="text-[9px] md:text-[10px] text-gray-400 font-medium">${u.toFixed(1)}%</p>
            </div>
        </div>`},s=Object.entries(t.revenues).map(([i,l])=>r(i,l,"text-emerald-600",!1)).join(""),o=Object.entries(t.expenses).map(([i,l])=>r(i,l,"text-red-500",!0)).join(""),n=t.netResult>=0?"Lucro Real":"Prejuízo Real";e.innerHTML=`
        <div class="max-w-xl mx-auto animate-slide-up pb-10 w-full">
            <div class="bg-gray-900 text-white rounded-3xl p-5 md:p-6 shadow-xl relative overflow-hidden mb-4 md:mb-6 w-full">
                <div class="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <svg class="w-32 h-32 md:w-48 md:h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <p class="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest mb-1 truncate">Resultado Líquido (Realizado)</p>
                <h2 class="text-3xl md:text-4xl font-black mb-2 truncate">R$ ${t.netResult.toLocaleString("pt-BR",{minimumFractionDigits:2})}</h2>
                <span class="inline-block px-2 py-1 md:px-3 md:py-1 bg-white/20 rounded-lg text-[10px] md:text-xs font-bold backdrop-blur-sm whitespace-nowrap">
                    ${n}: ${(a>0?t.netResult/a*100:0).toFixed(1)}% de Margem
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
    `}function pi(e,t){const a=document.getElementById(e);if(!a)return;const r=a.getContext("2d");K[e]&&K[e].destroy();const s=r.createLinearGradient(0,0,0,400);s.addColorStop(0,"rgba(59, 130, 246, 0.4)"),s.addColorStop(1,"rgba(59, 130, 246, 0.0)");const o=t.labels.map(n=>n.split("-").reverse().slice(0,2).join("/"));K[e]=new Chart(r,{type:"bar",data:{labels:o,datasets:[{label:"Créd. Realizado",data:t.realizedCredit,backgroundColor:vt.creditRealized,borderRadius:3,barPercentage:.7,order:1},{label:"Créd. Provisionado",data:t.provisionedCredit,backgroundColor:vt.creditProvisioned,borderRadius:3,borderWidth:1,borderColor:"#fff",borderDash:[5,5],barPercentage:.7,order:2},{label:"Déb. Realizado",data:t.realizedDebit,backgroundColor:vt.debitRealized,borderRadius:3,barPercentage:.7,order:3},{label:"Déb. Provisionado",data:t.provisionedDebit,backgroundColor:vt.debitProvisioned,borderRadius:3,borderWidth:1,borderColor:"#fff",borderDash:[5,5],barPercentage:.7,order:4},{label:"Saldo Acumulado",data:t.balance,type:"line",borderColor:"#3b82f6",backgroundColor:s,borderWidth:3,pointRadius:3,pointBackgroundColor:"#fff",pointBorderColor:"#3b82f6",pointBorderWidth:2,pointHoverRadius:8,hitRadius:30,fill:!0,tension:.4,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{backgroundColor:"#fff",titleColor:"#111",bodyColor:"#444",borderColor:"#eee",borderWidth:1,padding:10,callbacks:{label:function(n){let i=n.dataset.label||"";return i&&(i+=": "),n.parsed.y!==null&&(i+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(Math.abs(n.parsed.y))),i}}}},scales:{x:{stacked:!0,grid:{display:!1},ticks:{font:{size:10}}},y:{stacked:!0,display:!0,grid:{color:"#f3f4f6",borderDash:[4,4]},ticks:{callback:n=>new Intl.NumberFormat("pt-BR",{notation:"compact"}).format(Math.abs(n)),font:{size:10}}}}}})}function gi(e,t,a,r){const s=document.getElementById(e);if(!s)return;const o=s.getContext("2d");K[e]&&K[e].destroy();const n=t.map(i=>i.split("-").reverse().slice(0,2).join("/"));K[e]=new Chart(o,{type:"bar",data:{labels:n,datasets:[{label:"Realizados",data:a,backgroundColor:"#4f46e5",borderRadius:3,barPercentage:.6,order:1},{label:"Cancelados",data:r,backgroundColor:"#ef4444",borderRadius:3,barPercentage:.6,order:2}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{backgroundColor:"#fff",titleColor:"#111",bodyColor:"#444",borderColor:"#eee",borderWidth:1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10}}},y:{beginAtZero:!0,grid:{color:"#f3f4f6"},ticks:{stepSize:1,font:{size:10}}}}}})}function ao(e,t,a,r){const s=document.getElementById(e);if(!s)return;const o=s.getContext("2d");K[e]&&K[e].destroy();const{trendData:n,color:i}=di(r),l=n.map((u,p)=>p===n.length-1?"triangle":"circle"),d=n.map((u,p)=>p===n.length-1?6:3),c=n.map((u,p)=>p===n.length-1&&i==="#ef4444"?180:0);K[e]=new Chart(o,{type:"bar",data:{labels:a,datasets:[{label:t,data:r,backgroundColor:"#4f46e5",borderRadius:4,order:1},{label:"Tendência",data:n,type:"line",borderColor:i,borderWidth:3,pointStyle:l,pointRadius:d,pointRotation:c,pointBackgroundColor:"#fff",pointBorderColor:i,pointBorderWidth:2,pointHoverRadius:8,hitRadius:30,fill:!1,tension:0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:9}}},y:{grid:{color:"#f3f4f6"},beginAtZero:!0,ticks:{font:{size:9},callback:u=>new Intl.NumberFormat("pt-BR",{notation:"compact"}).format(u)}}}}})}function bi(e,t,a,r,s,o){const n=document.getElementById(e);if(!n)return;const i=n.getContext("2d");K[e]&&K[e].destroy(),new Chart(i,{type:t,data:{labels:r,datasets:[{label:a,data:s,backgroundColor:o,borderColor:Array.isArray(o)?"#fff":o,borderWidth:1,tension:.3,fill:t==="line"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:t==="doughnut",position:"right",labels:{usePointStyle:!0,boxWidth:8,font:{size:10}}}},scales:{}}})}const Xt=(e,t="products")=>I(`/api/${t}/categories/${e}`),ls=(e,t="products")=>I(`/api/${t}/categories`,{method:"POST",body:JSON.stringify(e)}),ds=(e,t="products")=>I(`/api/${t}/categories/${e}`,{method:"DELETE"}),fi="audit_logs",de=async(e,t,a,r,s,o=null)=>{try{if(!t)return;await Lo(zt(me,fi),{establishmentId:e,userId:t.uid,userName:t.name||t.email||"Utilizador",module:a,action:r,description:s,details:o,timestamp:new Date})}catch(n){console.error("Falha silenciosa ao registar log:",n)}},fe=document.getElementById("content");let pe=null,Ke="services",he="all",et=[];function Oe(){const e=oe.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}async function vi(e){e.preventDefault();const t=e.target.closest("#categoryForm"),a=t.querySelector("#categoryName"),r=a.value;if(!r)return;const s=t.querySelector('button[type="submit"]');s.disabled=!0,s.textContent="...";try{const o=et.reduce((n,i)=>(n.push(i.id),i.branches&&i.branches.forEach(l=>n.push(l.id)),n),[]);o.length===0&&o.push(m.establishmentId),await ls({establishmentId:m.establishmentId,name:r,accessibleIn:o},"services"),de(m.establishmentId,Oe(),"Categorias (Serviços)","Criou",`Criou categoria: ${r}`),a.value="",g("Sucesso","Categoria criada!","success"),await Ta(),await gt()}catch(o){g("Erro",`Não foi possível criar a categoria: ${o.message}`,"error")}finally{s.disabled=!1,s.textContent="Adicionar"}}async function hi(e){if(await z("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await ds(e,"services"),de(m.establishmentId,Oe(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${e})`),g("Sucesso","Categoria apagada.","success"),await Ta(),await gt()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function Ta(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await Xt(m.establishmentId,"services");m.serviceCategories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${f(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function xi(){ee({title:"Gerir Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",vi),t.addEventListener("click",r=>{const s=r.target.closest('button[data-action="delete-category"]');s&&(r.preventDefault(),hi(s.dataset.id))}))}Ta()}function yi(e=[]){if(!et||et.length===0)return`
            <input type="hidden" name="accessibleIn" value="${m.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                Disponível apenas nesta unidade. Crie mais lojas para distribuir serviços.
            </div>`;let t='<div class="space-y-1 mt-2 max-h-48 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30">';return et.forEach(a=>{const r=e.includes(a.id)||e.length===0&&a.id===m.establishmentId;t+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${r?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${f(a.name)} (Matriz)</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(s=>{const o=e.includes(s.id)||e.length===0&&s.id===m.establishmentId;t+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${s.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${f(s.name)}</span>
                    </label>
                `})}),t+="</div>",t}async function wi(e){e.preventDefault();const t=e.target.closest("#serviceModal"),a=t.querySelector("#serviceId").value,r={},s=t.querySelector('input[name="commissionType"]:checked').value;s==="custom"&&t.querySelectorAll(".professional-commission-row").forEach(l=>{const d=l.dataset.profId;if(l.querySelector('input[type="checkbox"]').checked){const u=parseFloat(l.querySelector('input[type="number"]').value);r[d]=isNaN(u)?0:u}});const o=Array.from(t.querySelectorAll('input[name="accessibleIn"]:checked')).map(l=>l.value),n=o.length>0?o:[m.establishmentId],i={establishmentId:m.establishmentId,accessibleIn:n,name:t.querySelector("#serviceName").value.trim(),price:parseFloat(t.querySelector("#servicePrice").value),duration:parseInt(t.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(t.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:t.querySelector("#serviceCategory").value||null,commissionRate:parseFloat(t.querySelector("#serviceCommissionRate").value)||0,active:t.querySelector("#serviceStatus").value==="true",photo:t.querySelector("#servicePhotoBase64").value,notes:t.querySelector("#serviceNotes").value,commissionType:s,professionalCommissions:r};try{a?(await Ar(a,i),de(m.establishmentId,Oe(),"Serviços","Editou",`Editou o serviço: ${i.name}`)):(await Mr(i),de(m.establishmentId,Oe(),"Serviços","Criou",`Criou novo serviço: ${i.name}`)),document.getElementById("serviceModal").style.display="none",g("Sucesso",`Serviço ${a?"atualizado":"adicionado"} com sucesso!`,"success"),await gt()}catch(l){g("Erro",l.message,"error")}}function oo(e=null){const t=document.getElementById("serviceModal"),a=m.serviceCategories||[],r=e?.duration||0,s=e?.bufferTime||0,o=f(e?.name||""),n=f(e?.notes||""),i=e?o:"Novo Serviço",l=a.map(P=>`<option value="${P.id}" ${e?.categoryId===P.id?"selected":""}>${f(P.name)}</option>`).join("");t.innerHTML=`
    <div class="modal-content max-w-3xl overflow-y-auto max-h-[85vh] my-auto">
        <form id="serviceForm">
            <input type="hidden" id="serviceId" value="${e?.id||""}">
            <input type="hidden" id="servicePhotoBase64" value="${e?.photo||""}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="serviceModalTitle" class="text-2xl font-bold text-gray-800">${i}</h2>
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
                            ${l}
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
                    ${yi(e?.accessibleIn||[])}
                </div>

                <div class="pt-4 border-t border-gray-100 mt-2">
                    <label for="serviceNotes" class="block text-sm font-medium text-gray-700">Observações Internas</label>
                    <textarea id="serviceNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${n}</textarea>
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
    </div>`,t.style.display="flex",t.addEventListener("click",async P=>{const C=P.target.closest("button[data-action]");if(!C)return;const A=C.dataset.action,j=C.dataset.id;if(A==="close-modal"&&(t.style.display="none"),A==="delete-service"){if(!j)return;if(t.style.display="none",await z("Apagar Serviço","Tem a certeza que deseja apagar este serviço?"))try{const M=m.services.find(q=>q.id===j)?.name||"Desconhecido";await qr(j),de(m.establishmentId,Oe(),"Serviços","Excluiu",`Excluiu o serviço: ${M}`),g("Sucesso","Serviço apagado com sucesso!","success"),await gt()}catch(M){g("Erro",`Não foi possível apagar o serviço: ${M.message}`,"error")}else t.style.display="flex"}});const d=t.querySelectorAll(".tab-btn"),c=t.querySelectorAll(".tab-content");d.forEach(P=>{P.addEventListener("click",()=>{d.forEach(C=>{C.classList.remove("border-indigo-500","text-indigo-600"),C.classList.add("border-transparent","text-gray-500")}),P.classList.add("border-indigo-500","text-indigo-600"),P.classList.remove("border-transparent","text-gray-500"),c.forEach(C=>C.classList.add("hidden")),document.getElementById(`tab-content-${P.dataset.tab}`).classList.remove("hidden")})});const u=t.querySelectorAll('input[name="commissionType"]'),p=document.getElementById("defaultCommissionRateContainer"),h=document.getElementById("professionalCommissionsContainer");function b(){const P=t.querySelector('input[name="commissionType"]:checked').value;p&&(p.style.display=P==="default"?"block":"none"),h&&(h.style.display=P==="custom"?"block":"none")}u.forEach(P=>P.addEventListener("change",b));const v=document.getElementById("professionalCommissionsList");v&&(v.innerHTML=(m.professionals||[]).map(P=>{const C=e?.professionalCommissions?.[P.id]!==void 0,A=e?.professionalCommissions?.[P.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-md ${C?"bg-blue-50":""}" data-prof-id="${P.id}">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" ${C?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600">
                        <img src="${P.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${f(P.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover">
                        <span class="text-sm font-medium">${f(P.name)}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${A}" class="w-20 p-1 border rounded-md text-sm text-center" ${C?"":"disabled"}>
                        <span class="text-sm font-semibold">%</span>
                    </div>
                </div>
            `}).join(""),v.querySelectorAll('input[type="checkbox"]').forEach(P=>{P.addEventListener("change",C=>{const A=C.target.closest(".professional-commission-row");A.querySelector('input[type="number"]').disabled=!C.target.checked,A.classList.toggle("bg-blue-50",C.target.checked)})})),b();const x=t.querySelector("#serviceForm"),w=t.querySelector("#servicePhotoInput"),k=t.querySelector("#servicePhotoPreview"),E=t.querySelector("#servicePhotoBase64");t.querySelector("#servicePhotoButton").addEventListener("click",()=>w.click()),w.onchange=async()=>{const P=w.files[0];if(P){k.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const C=await Oo(P,800,800,.8);if(C.length*3/4>1e3*1024)throw new Error("Imagem muito grande.");k.src=C,E.value=C}catch(C){g("Erro de Imagem",C.message,"error"),k.src=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",E.value=e?.photo||""}}},x.addEventListener("submit",wi)}function tt(){const e=document.getElementById("servicesList");if(!e)return;const t=document.getElementById("serviceSearchInput")?.value.toLowerCase()||"",a=document.getElementById("serviceCategoryFilter")?.value||"all",r=new Map((m.serviceCategories||[]).map(o=>[o.id,o.name]));let s=(m.services||[]).filter(Boolean);if(he!=="all"){const o=he==="active";s=s.filter(n=>n.active!==!1===o)}s=s.filter(o=>{const n=o.name.toLowerCase().includes(t),i=a==="all"||o.categoryId===a;return n&&i}),e.innerHTML="",s.length>0?s.forEach(o=>{const n=document.createElement("div"),i=JSON.stringify(o).replace(/'/g,"&apos;");n.className=`service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-indigo-300 border border-transparent ${o.active!==!1?"opacity-100":"opacity-60 bg-gray-100"} sm:flex-col`,n.dataset.action="edit-service",n.dataset.service=i;const l=f(o.name),d=f(r.get(o.categoryId)||"Sem Categoria"),c=o.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(o.name.charAt(0))}`;n.innerHTML=`
                <img src="${c}" alt="Imagem" class="w-24 h-24 object-cover flex-shrink-0 sm:w-full sm:h-32">
                <div class="p-3 flex flex-col flex-grow justify-between w-full">
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="text-sm font-bold text-gray-900 flex-1 text-left truncate pr-2">${l}</h3>
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
                            <p class="text-xs text-gray-500 text-left mb-1 truncate">${d}</p>
                            <p class="text-xs text-gray-500 text-left">${o.duration} min</p>
                        </div>
                        <div class="flex justify-between items-center sm:hidden mt-2">
                            <p class="text-lg font-bold text-indigo-600 text-left">R$ ${o.price.toFixed(2)}</p>
                            <p class="text-xs text-gray-500 text-right">${o.duration} min</p>
                        </div>
                    </div>
                </div>`,e.appendChild(n)}):e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>'}function Da(){const e={active:0,inactive:0,total:0},t=(m.services||[]).filter(Boolean);t.forEach(n=>{n.active===!1?e.inactive++:e.active++}),e.total=t.length;const a=document.getElementById("indicator-total"),r=document.getElementById("indicator-active"),s=document.getElementById("indicator-inactive"),o=document.getElementById("indicator-popular");a&&(a.textContent=e.total),r&&(r.textContent=e.active),s&&(s.textContent=e.inactive),o&&(m.mostPopularService&&m.mostPopularService.name!=="N/A"?(o.textContent=f(m.mostPopularService.name),o.closest(".indicator-card").title=`${m.mostPopularService.name} (${m.mostPopularService.count} agendamentos)`):o.textContent="Nenhum agendado")}function ki(){const e=document.getElementById("services-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("serviceCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(m.serviceCategories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${f(a.name)}</option>`)),Da(),tt()}function Si(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="p-12 text-center bg-gray-50 border border-dashed border-gray-300 rounded-xl max-w-lg mx-auto mt-10">
            <i class="bi bi-bar-chart-line text-4xl text-indigo-300 mb-4 block"></i>
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2 text-sm">Acompanhe métricas de conversão e lucratividade por serviço e unidade. (Em breve)</p>
        </div>
    `}async function gt(){const e=document.getElementById("services-content-container");if(e){const t=e.querySelector(".loader");t&&(t.style.display="block")}try{const[t,a,r,s,o]=await Promise.all([Se(m.establishmentId),se(m.establishmentId),Xt(m.establishmentId,"services"),Nr(m.establishmentId),ze()]);m.services=(t||[]).filter(Boolean),m.professionals=(a||[]).filter(Boolean),m.serviceCategories=(r||[]).filter(Boolean),m.mostPopularService=s||{name:"N/A",count:0},et=o?.matrizes||[],m.services.forEach(n=>{n.active===void 0&&(n.active=!0)}),cs(Ke)}catch(t){e&&(e.innerHTML='<p class="text-red-500 text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>'),g("Erro",`Não foi possível carregar os dados: ${t.message}`,"error")}}function cs(e){if(document.getElementById("services-content-container")){if(Ke===e&&document.getElementById("services-content-container").children.length>1){Ke==="services"&&(Da(),tt());return}Ke=e,he="all",document.querySelectorAll("#services-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="services"?ki():e==="reports"&&Si()}}function $i(){pe&&(fe.removeEventListener("click",pe),fe.removeEventListener("input",pe),fe.removeEventListener("change",pe)),pe=async e=>{const t=e.target;if(t.closest('[data-action="toggle-service-status"]')){e.stopPropagation();const s=t.closest('[data-action="toggle-service-status"]'),o=s.dataset.id,n=s.checked;try{await Rr(o,n);const i=m.services.findIndex(l=>l.id===o);i>-1&&(m.services[i].active=n),de(m.establishmentId,Oe(),"Serviços","Atualizou Status",`Alterou status do serviço (ID: ${o}) para ${n?"Ativo":"Inativo"}`),tt(),Da()}catch(i){g("Erro",`Não foi possível atualizar o status: ${i.message}`,"error"),s.checked=!n}return}const a=t.closest("button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]");if(t.id==="serviceSearchInput"||t.id==="serviceCategoryFilter"){tt();return}if(!a)return;if(a.hasAttribute("data-view")){cs(a.dataset.view);return}switch(a.dataset.action){case"new-service":oo();break;case"edit-service":const s=JSON.parse(a.dataset.service);oo(s);break;case"manage-categories":xi();break;case"filter-service":const o=a.dataset.filterType;if(o==="popular")return;he=o==="total"?"all":o,document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(n=>{const i=n.dataset.filterType,d=i===he||i==="total"&&he==="all";n.classList.toggle("ring-2",d),n.classList.toggle("ring-indigo-500",d),n.classList.toggle("shadow-md",d),n.classList.toggle("bg-white",!d)}),tt();break}},fe.addEventListener("click",pe),fe.addEventListener("input",pe),fe.addEventListener("change",pe)}async function Ei(){fe.innerHTML=`
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
        </div>`,$i(),Ke="services",he="all",await gt()}const Zt="suppliers",Pa=async e=>{try{const t=To(zt(me,Zt),Do("establishmentId","==",e)),a=await Hs(t),r=[];return a.forEach(s=>{r.push({id:s.id,...s.data()})}),r}catch(t){throw console.error("Erro ao buscar fornecedores:",t),t}},Ii=async e=>{try{return{id:(await Lo(zt(me,Zt),e)).id,...e}}catch(t){throw console.error("Erro ao criar fornecedor:",t),t}},Ci=async(e,t)=>{try{const a=mt(me,Zt,e);return await wa(a,t),{id:e,...t}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},Li=async e=>{try{const t=mt(me,Zt,e);return await Os(t),!0}catch(t){throw console.error("Erro ao excluir fornecedor:",t),t}},be=document.getElementById("content");let ge=null,at="products",ce="all";async function Ti(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),r=a.value;if(r)try{await ls({establishmentId:m.establishmentId,name:r},"products"),a.value="",g("Sucesso","Categoria de produto criada!","success"),await Ba(),await bt()}catch(s){g("Erro",`Não foi possível criar a categoria: ${s.message}`,"error")}}async function Di(e){if(await z("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await ds(e,"products"),g("Sucesso","Categoria de produto apagada.","success"),await Ba(),await bt()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function Ba(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await Xt(m.establishmentId,"products");m.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${f(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function Pi(){ee({title:"Gerir Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",Ti),t.addEventListener("click",r=>{const s=r.target.closest('button[data-action="delete-category"]');s&&Di(s.dataset.id)}))}Ba()}async function Bi(e){if(!e)return;if(await z("Apagar Produto","Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida."))try{await fn(e),g("Sucesso","Produto apagado com sucesso!","success"),await bt()}catch(a){g("Erro",`Não foi possível apagar o produto: ${a.message}`,"error")}}async function Mi(e){const t=e.querySelector("#productId").value,a=parseInt(e.querySelector("#productCurrentStock").value),r=parseInt(e.querySelector("#productMinStock").value),s=parseInt(e.querySelector("#productMaxStock").value),o=e.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),n=Array.from(o).map(l=>l.dataset.id),i={establishmentId:m.establishmentId,name:e.querySelector("#productName").value,price:parseFloat(e.querySelector("#productPrice").value),costPrice:parseFloat(e.querySelector("#productCostPrice").value)||0,commissionRate:parseFloat(e.querySelector("#productCommissionRate").value)||0,currentStock:isNaN(a)?0:a,minStock:isNaN(r)?0:r,maxStock:isNaN(s)?0:s,categoryId:e.querySelector("#productCategory").value||null,photo:e.querySelector("#productPhotoBase64").value,supplierIds:n};try{t?await bn(t,i):await gn(i),document.getElementById("productModal").style.display="none",g("Sucesso",`Produto ${t?"atualizado":"adicionado"} com sucesso!`,"success"),await bt()}catch(l){throw new Error(l.message)}}function so(e,t=800,a=800,r="image/jpeg",s=.8){return new Promise((o,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=l=>{const d=new Image;d.onload=()=>{let c=d.width,u=d.height;c>u?c>t&&(u*=t/c,c=t):u>a&&(c*=a/u,u=a);const p=document.createElement("canvas");p.width=c,p.height=u,p.getContext("2d").drawImage(d,0,0,c,u);const b=p.toDataURL(r,s);o(b)},d.onerror=c=>n(new Error("Não foi possível carregar a imagem.")),d.src=l.target.result},i.onerror=l=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function ro(e=null){const t=document.getElementById("productModal"),a=m.categories||[],r=m.suppliers||[],s=a.map(T=>`<option value="${T.id}" ${e?.categoryId===T.id?"selected":""}>${f(T.name)}</option>`).join("");let o=new Set(e?.supplierIds||[]);const n=f(e?.name||""),i=e?.price||"",l=e?.costPrice||"",d=e?.commissionRate||"",c=e?.minStock||0,u=e?.maxStock||0,p=e?.currentStock||0,h=e?n:"Novo Produto";t.innerHTML=`
    <div class="modal-content max-w-3xl overflow-y-auto max-h-[90vh]">
        <form id="productForm">
            <input type="hidden" id="productId" value="${e?.id||""}">
            <input type="hidden" id="productPhotoBase64" value="${e?.photo||""}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="productModalTitle" class="text-2xl font-bold text-gray-800">${h}</h2>
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
                            <div class="form-group sm:col-span-2"><label for="productName">Nome do Produto</label><input type="text" id="productName" value="${n}" required class="mt-1 w-full p-2 border rounded-md"></div>
                            
                            <div class="form-group sm:col-span-2"><label for="productCategory">Categoria</label><select id="productCategory" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Sem categoria</option>${s}</select></div>
                            
                            <div class="form-group"><label for="productPrice">Preço Venda (R$)</label><input type="number" id="productPrice" step="0.01" value="${i}" required class="mt-1 w-full p-2 border rounded-md"></div>
                            
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
    </div>`;const b=t.querySelector("#productCategory"),v=t.querySelector("#productPhotoInput");t.querySelector("#productPhotoButton").addEventListener("click",()=>v.click()),b.innerHTML='<option value="">Sem categoria</option>'+(m.categories||[]).map(T=>`<option value="${T.id}" ${e?.categoryId===T.id?"selected":""}>${f(T.name)}</option>`).join(""),e&&(b.value=e.categoryId||"");const x=t.querySelector("#productPhotoPreview");t.querySelector("#productPhotoBase64");const w=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",k=e?.photo||"";v.onchange=async()=>{const T=v.files[0];if(T){x.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const M=await so(T,800,800,"image/jpeg",.8),H=M.length*3/4,O=1e3*1024;if(H>O)throw new Error("A imagem é muito grande mesmo após a compressão.");preview.src=M,base64Input.value=M}catch(M){console.error("Erro ao processar imagem:",M),g("Erro de Imagem",M.message||"Não foi possível processar a imagem.","error"),preview.src=w,base64Input.value=k,j.value=""}}};const E=t.cloneNode(!0);t.parentNode.replaceChild(E,t);const P=()=>{const T=E.querySelector("#modalSupplierSearch"),M=E.querySelector("#supplierSearchResults"),q=E.querySelector("#selectedSuppliersList"),H=T.value.toLowerCase();if(H.length>0){const O=r.filter(R=>R.name.toLowerCase().includes(H)&&!o.has(R.id));O.length>0?(M.classList.remove("hidden"),M.innerHTML=O.map(R=>`
                    <div class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 text-sm flex justify-between items-center" data-add-supplier="${R.id}">
                        <span class="font-medium">${f(R.name)}</span>
                        <span class="text-indigo-600 text-xs">+ Adicionar</span>
                    </div>
                `).join("")):(M.classList.remove("hidden"),M.innerHTML='<div class="p-2 text-xs text-gray-500 text-center">Nenhum resultado disponível.</div>')}else M.classList.add("hidden");o.size>0?(q.innerHTML="",o.forEach(O=>{const R=r.find(U=>U.id===O);R&&(q.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border p-2 rounded shadow-sm" data-id="${R.id}">
                            <div class="text-sm">
                                <p class="font-bold text-gray-800">${f(R.name)}</p>
                                <p class="text-xs text-gray-500">${f(R.contactName||"")} - ${f(R.phone||"")}</p>
                            </div>
                            <button type="button" class="text-red-500 hover:text-red-700 p-1" data-remove-supplier="${R.id}" title="Remover">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    `)})):q.innerHTML='<p class="text-xs text-gray-400 text-center py-2">Nenhum fornecedor selecionado.</p>'};E.querySelector("#modalSupplierSearch").addEventListener("input",P),E.addEventListener("click",T=>{const M=T.target.closest("[data-add-supplier]");if(M){const H=M.dataset.addSupplier;o.add(H),E.querySelector("#modalSupplierSearch").value="",P()}const q=T.target.closest("[data-remove-supplier]");if(q){const H=q.dataset.removeSupplier;o.delete(H),P()}}),P(),E.addEventListener("click",async T=>{const M=T.target.closest("button[data-action]");if(!M)return;const q=M.dataset.action,H=E.querySelector("#productId").value;if(q==="close-modal"&&(E.style.display="none"),q==="delete-product"){if(!H)return;E.style.display="none",await Bi(H)}if(q==="save-product-modal"){const O=E.querySelector("#productForm");if(O){if(!O.querySelector("#productName").value||!O.querySelector("#productPrice").value){g("Erro","Nome e Preço de Venda são obrigatórios.","error");return}const R=M.closest('button[data-action="save-product-modal"]');R.disabled=!0,R.textContent="A salvar...";try{await Mi(O)}catch(U){g("Erro",`Falha ao salvar: ${U.message}`,"error"),R.disabled=!1,R.textContent="Salvar Alterações"}}}if(q==="adjust-stock-modal"){T.preventDefault();const O=E.querySelector("#stockAdjustmentAmount"),R=E.querySelector("#stockAdjustmentReason"),U=parseInt(O.value,10),$e=parseInt(M.dataset.change,10);if(!U||U<=0){g("Erro","Por favor, insira uma quantidade válida.","error");return}const ea=U*$e,Ts=R.value||(ea>0?"Entrada manual":"Saída manual");try{await vn(H,{change:ea,reason:Ts});const Ue=m.products.findIndex(_e=>_e.id===H);if(Ue>-1){const _e=m.products[Ue].currentStock+ea;m.products[Ue].currentStock=_e,E.querySelector("#currentStockDisplay").textContent=_e,E.querySelector("#productCurrentStock").value=_e,O.value="",R.value="",g("Sucesso","Estoque atualizado!","success"),Ma(),ct()}}catch(Ue){g("Erro de Stock",Ue.message,"error")}}});const C=E.querySelectorAll(".tab-btn"),A=E.querySelectorAll(".tab-content");C.forEach(T=>{T.addEventListener("click",M=>{M.preventDefault(),C.forEach(q=>{q.classList.remove("border-indigo-500","text-indigo-600"),q.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),T.classList.add("border-indigo-500","text-indigo-600"),T.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),A.forEach(q=>q.classList.add("hidden")),document.getElementById(`tab-content-${T.dataset.tab}`).classList.remove("hidden")})});const j=E.querySelector("#productPhotoInput");E.querySelector("#productPhotoButton").addEventListener("click",()=>j.click()),j.onchange=async()=>{const T=j.files[0];if(!T)return;const M=E.querySelector("#productPhotoPreview"),q=E.querySelector("#productPhotoBase64");M.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const H=await so(T,800,800,"image/jpeg",.8),R=H.length*3/4,U=1e3*1024;if(R>U)throw new Error("A imagem é muito grande mesmo após a compressão.");M.src=H,q.value=H}catch(H){console.error("Erro ao processar imagem:",H),g("Erro de Imagem",H.message||"Não foi possível processar a imagem.","error"),M.src=w,q.value=k,j.value=""}},E.style.display="flex"}function Ai(){const e=document.getElementById("products-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("productCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(m.categories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${f(a.name)}</option>`)),Ma(),ct()}function qi(){const e=document.getElementById("products-content-container"),t=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const r=a.toISOString().split("T")[0];e.innerHTML=`
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
        </div>`;const s=document.getElementById("productFilterReport"),o=document.getElementById("categoryFilterReport");s&&m.products&&(s.innerHTML+=m.products.map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("")),o&&m.categories&&(o.innerHTML+=m.categories.map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join(""))}async function Ri(){const e=document.getElementById("report-results");e.innerHTML='<div class="loader mx-auto my-8"></div>';const t={startDate:document.getElementById("reportStartDate").value,endDate:document.getElementById("reportEndDate").value,productId:document.getElementById("productFilterReport").value,categoryId:document.getElementById("categoryFilterReport").value,establishmentId:m.establishmentId};try{const a=await hn(t);if(a.length===0){e.innerHTML=`
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
                                <td class="px-4 py-3 whitespace-nowrap font-semibold text-gray-800">${f(o.productName)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center font-bold ${o.change>0?"text-green-600":"text-red-600"}">
                                    ${o.change>0?"+":""}${o.change}
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-500">${o.oldStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-800 font-medium">${o.newStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600 truncate max-w-xs" title="${f(o.reason)}">${f(o.reason)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600">${f(o.user)}</td>
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
                                <h4 class="font-bold text-gray-800 text-base line-clamp-1">${f(o.productName)}</h4>
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
                            <span class="text-gray-600 truncate max-w-[60%] font-medium" title="${f(o.reason)}">
                                ${f(o.reason)||"Sem motivo"}
                            </span>
                            <span class="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                ${f(o.user)||"Sistema"}
                            </span>
                        </div>
                    </div>
                `).join("")}
            </div>`;e.innerHTML=r+s}catch(a){g("Erro",`Não foi possível gerar o relatório: ${a.message}`,"error"),e.innerHTML=`<div class="bg-white border border-red-200 rounded-lg p-8 text-center text-red-500">${a.message}</div>`}}function Ma(){const e={ok:0,near_min:0,at_min:0,empty:0};if(!m.products)return;m.products.forEach(o=>{if(!o)return;const n=o.currentStock,i=o.minStock;n<=0?e.empty++:i>0&&n<=i?e.at_min++:i>0&&n<=i*1.2?e.near_min++:e.ok++});const t=document.getElementById("indicator-ok"),a=document.getElementById("indicator-near-min"),r=document.getElementById("indicator-at-min"),s=document.getElementById("indicator-empty");t&&(t.textContent=e.ok),a&&(a.textContent=e.near_min),r&&(r.textContent=e.at_min),s&&(s.textContent=e.empty)}function ct(){const e=document.getElementById("productsList");if(!e)return;const t=document.getElementById("productSearchInput")?.value.toLowerCase()||"",a=document.getElementById("productCategoryFilter")?.value||"all",r=new Map((m.categories||[]).map(o=>[o.id,o.name]));let s=(m.products||[]).filter(Boolean);ce!=="all"&&(s=s.filter(o=>{const n=o.currentStock,i=o.minStock;switch(ce){case"ok":return n>0&&(i===0||n>i*1.2);case"near_min":return i>0&&n>i&&n<=i*1.2;case"at_min":return i>0&&n>0&&n<=i;case"empty":return n<=0;default:return!0}})),s=s.filter(o=>{const n=o.name.toLowerCase().includes(t),i=a==="all"||o.categoryId===a;return n&&i}),e.innerHTML="",s.length>0?(e.className="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 sm:space-y-0",s.forEach(o=>{const n=document.createElement("div"),i=JSON.stringify(o).replace(/'/g,"&apos;");n.className=`product-card bg-white rounded-lg shadow-md flex items-center gap-3 p-3 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 
                              sm:flex-col sm:p-0 sm:items-stretch sm:gap-0`,n.dataset.action="edit-product",n.dataset.product=i;const l=o.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(o.name.charAt(0))}`,d=r.get(o.categoryId)||"N/A";let c="",u="text-gray-500";const p=o.currentStock,h=o.minStock;p<=0?(c='<span class="text-xs font-semibold text-red-600">Esgotado</span>',u="text-red-600 font-semibold"):h>0&&p<=h?(c='<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>',u="text-orange-600 font-semibold"):h>0&&p<=h*1.2?(c='<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>',u="text-blue-600 font-semibold"):(c='<span class="text-xs font-semibold text-green-600">Em Estoque</span>',u="text-green-600 font-semibold"),n.innerHTML=`
                <img src="${l}" alt="Imagem de ${f(o.name)}" class="w-16 h-16 rounded-md object-cover flex-shrink-0 sm:w-full sm:h-24 sm:rounded-b-none">
                
                <div class="flex-1 sm:p-3 sm:flex sm:flex-col sm:flex-grow">
                    <div class="sm:flex-grow">
                        <div class="flex justify-between items-start mb-1 gap-2">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${f(o.name)}</h3>
                            <div class="hidden sm:block">${c}</div>
                        </div>
                        
                        <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${o.price.toFixed(2)}</p>
                        
                        <p class="text-xs text-gray-500 text-left mb-2 hidden sm:block">Categoria: ${f(d)}</p>
                    </div>

                    <div class="flex justify-between items-center mt-2 sm:mt-0">
                        <p class="text-lg font-bold text-indigo-600 text-left sm:hidden">R$ ${o.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-right sm:text-left">
                            Estoque: <span class="font-bold text-base ${u}">${o.currentStock}</span>
                        </p>
                    </div>
                </div>`,e.appendChild(n)})):(e.className="",e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>')}async function bt(){const e=document.getElementById("products-content-container");e&&(e.innerHTML='<div class="loader col-span-full mx-auto my-8"></div>');try{const[t,a,r]=await Promise.all([Gt(m.establishmentId),Xt(m.establishmentId,"products"),Pa(m.establishmentId)]);m.products=(t||[]).filter(Boolean),m.categories=(a||[]).filter(Boolean),m.suppliers=(r||[]).filter(Boolean),us(at)}catch(t){e&&(e.innerHTML=`<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados: ${t.message}</p>`)}}function us(e){if(document.getElementById("products-content-container")){if(at===e&&document.getElementById("products-content-container").children.length>1){at==="products"&&(Ma(),ct());return}at=e,ce="all",document.querySelectorAll("#products-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="products"?Ai():e==="movements"&&qi()}}async function Ni(){be.innerHTML=`
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
        </section>`,ge&&(be.removeEventListener("click",ge),be.removeEventListener("input",ge),be.removeEventListener("change",ge)),ge=async e=>{const t=e.target;if(t.id==="productSearchInput"||t.id==="productCategoryFilter"){ct();return}const a=e.target.closest("button[data-action], button[data-view], .indicator-card[data-action], .product-card[data-action]");if(!a||e.target.closest('[data-action-stop-propagation="true"]'))return;if(a.hasAttribute("data-view")){us(a.dataset.view);return}switch(a.dataset.action){case"new-product":ro();break;case"edit-product":ro(JSON.parse(a.dataset.product));break;case"manage-product-categories":Pi();break;case"generate-report":await Ri();break;case"filter-stock":const s=a.dataset.filterType;ce=ce===s?"all":s,document.querySelectorAll(".indicator-card").forEach(o=>{o.classList.toggle("ring-2",o.dataset.filterType===ce),o.classList.toggle("ring-indigo-500",o.dataset.filterType===ce),o.classList.toggle("shadow-lg",o.dataset.filterType===ce)}),ct();break}},be.addEventListener("click",ge),be.addEventListener("input",ge),be.addEventListener("change",ge),at="products",ce="all",await bt()}const Ct=document.getElementById("content");let F={partners:[],establishments:[],searchQuery:"",categoryFilter:"all",stateFilter:"all",cityFilter:"",sortBy:"name_asc",hasSearched:!1,viewMode:"list",editingItem:null},ht=null;const Bt={contas_fixas:{label:"Contas Fixas (Água, Luz)",color:"blue",icon:"bi-lightning-charge"},estoque:{label:"Fornecedor de Produtos",color:"emerald",icon:"bi-box-seam"},servicos:{label:"Prestador de Serviço",color:"purple",icon:"bi-tools"},impostos:{label:"Governo / Impostos",color:"red",icon:"bi-bank"},outros:{label:"Outros Parceiros",color:"gray",icon:"bi-person-vcard"}},ms=["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];async function ji(){try{const t=(await ze()).matrizes||[];F.establishments=[],t.forEach(a=>{F.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(r=>F.establishments.push({id:r.id,name:r.name,type:"Filial"}))})}catch(e){console.warn("Erro ao buscar lojas",e)}F.viewMode="list",F.editingItem=null,F.hasSearched=!1,F.partners=[],Fi(),_i(),ps()}function Fi(){Ct.innerHTML=`
        <div class="flex flex-col h-auto bg-gray-50 w-full relative font-sans min-h-[calc(100vh-80px)] overflow-x-hidden">
            
            <div id="suppliers-list-view" class="w-full transition-all duration-300 ${F.viewMode==="list"?"block":"hidden"}">
                ${Hi()}
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
    `}function Hi(){const e=Object.entries(Bt).map(([a,r])=>`<option value="${a}">${r.label}</option>`).join(""),t=ms.map(a=>`<option value="${a}">${a}</option>`).join("");return`
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
    `}function Oi(e=null){const t=!!e,a=t?"Ficha do Parceiro":"Novo Parceiro de Negócio";let r=e?.category||"";r==="Produtos"&&(r="estoque"),r==="Serviços"&&(r="servicos");const s=Object.entries(Bt).map(([i,l])=>`<option value="${i}" ${r===i?"selected":""}>${l.label}</option>`).join(""),o=ms.map(i=>`<option value="${i}" ${e?.state===i?"selected":""}>${i}</option>`).join(""),n=document.getElementById("form-container-wrapper");n&&(n.innerHTML=`
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
                                    <input type="text" id="supName" required class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none font-bold text-gray-800 text-lg transition-all shadow-inner" value="${f(e?.name||"")}" placeholder="Ex: CPFL Energia, Coca-Cola...">
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
                                    <input type="text" id="supTaxId" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${f(e?.document||e?.taxId||"")}" placeholder="00.000.000/0001-00">
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
                                    <input type="text" id="supCity" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${f(e?.city||"")}" placeholder="Ex: São Paulo">
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
                                        <input type="text" id="supContact" class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${f(e?.contactName||"")}" placeholder="Ex: João Silva (Comercial)">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">E-mail Comercial</label>
                                    <div class="relative">
                                        <i class="bi bi-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input type="email" id="supEmail" class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${f(e?.email||"")}" placeholder="contato@empresa.com">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Telefone / WhatsApp</label>
                                    <div class="relative">
                                        <i class="bi bi-telephone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input type="tel" id="supPhone" class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${f(e?.phone||"")}" placeholder="(00) 0000-0000">
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
    `,document.getElementById("partner-form").addEventListener("submit",Vi))}function ps(){const e=document.getElementById("partners-grid");e&&(e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl w-full max-w-3xl mx-auto shadow-sm">
                <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 border border-indigo-100 shadow-inner">
                    <i class="bi bi-search text-2xl text-indigo-400"></i>
                </div>
                <h3 class="text-xl font-black text-gray-800 mb-2">Pronto para pesquisar</h3>
                <p class="text-sm text-gray-500 font-medium max-w-md text-center">Utilize os filtros acima e clique em "Buscar" para listar os parceiros registados no sistema.</p>
            </div>
        `)}async function zi(){const e=document.getElementById("partners-grid");if(!F.hasSearched){ps();return}e.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="text-sm text-gray-500 mt-4 font-medium">Buscando parceiros...</p></div>';try{const t=await Pa(m.establishmentId);F.partners=t||[],gs()}catch(t){e.innerHTML=`<div class="text-center py-10 text-red-500 font-bold">Erro ao carregar parceiros: ${t.message}</div>`}}function gs(){const e=document.getElementById("partners-grid");if(!e)return;let t=F.partners;if(F.searchQuery){const s=F.searchQuery.toLowerCase();t=t.filter(o=>o.name.toLowerCase().includes(s)||o.document&&o.document.includes(s)||o.taxId&&o.taxId.includes(s)||o.email&&o.email.toLowerCase().includes(s)||o.contactName&&o.contactName.toLowerCase().includes(s))}if(F.categoryFilter!=="all"&&(t=t.filter(s=>s.category===F.categoryFilter)),F.stateFilter!=="all"&&(t=t.filter(s=>s.state===F.stateFilter)),F.cityFilter){const s=F.cityFilter.toLowerCase();t=t.filter(o=>o.city&&o.city.toLowerCase().includes(s))}if(t.sort((s,o)=>{let n="",i="";return F.sortBy==="name_asc"||F.sortBy==="name_desc"?(n=(s.name||"").toLowerCase(),i=(o.name||"").toLowerCase()):F.sortBy==="contact_asc"&&(n=(s.contactName||"").toLowerCase(),i=(o.contactName||"").toLowerCase()),F.sortBy==="name_desc"?i.localeCompare(n):n.localeCompare(i)}),t.length===0){e.innerHTML=`
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
    `,r='<div class="flex flex-col gap-4 md:hidden">';t.forEach(s=>{let o=s.category;o==="Produtos"&&(o="estoque"),o==="Serviços"&&(o="servicos");const n=Bt[o]||Bt.outros,i=s.document||s.taxId?s.document||s.taxId:"-",l=JSON.stringify(s).replace(/'/g,"&apos;"),d=[s.city,s.state].filter(Boolean).join(" - ");a+=`
            <tr class="hover:bg-indigo-50/50 cursor-pointer transition-colors group" data-action="open-form" data-item='${l}'>
                <td class="p-4 pl-6 text-center">
                    <div class="w-10 h-10 mx-auto rounded-xl bg-${n.color}-100 text-${n.color}-600 flex items-center justify-center text-lg shadow-sm" title="${n.label}">
                        <i class="bi ${n.icon}"></i>
                    </div>
                </td>
                <td class="p-4">
                    <p class="font-bold text-gray-900 text-sm group-hover:text-indigo-700 transition-colors">${f(s.name)}</p>
                    ${s.email?`<p class="text-xs text-gray-500 mt-0.5"><i class="bi bi-envelope mr-1 opacity-50"></i>${f(s.email)}</p>`:""}
                </td>
                <td class="p-4 text-sm font-medium text-gray-600">${f(i)}</td>
                <td class="p-4">
                    <div class="text-sm font-medium text-gray-800">${f(s.contactName||"-")}</div>
                    ${d?`<div class="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1"><i class="bi bi-geo-alt mr-1"></i>${f(d)}</div>`:""}
                </td>
                <td class="p-4 pr-6 text-right">
                    <button class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-100 transition-colors shadow-sm bg-white border border-gray-200 group-hover:border-indigo-200">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                </td>
            </tr>
        `,r+=`
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden" data-action="open-form" data-item='${l}'>
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-${n.color}-500"></div>
                <div class="flex gap-4">
                    <div class="w-12 h-12 rounded-xl bg-${n.color}-100 text-${n.color}-600 flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                        <i class="bi ${n.icon}"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">${n.label.split(" ")[0]}</p>
                        <h3 class="font-black text-gray-900 text-base leading-tight truncate">${f(s.name)}</h3>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-lg p-3 border border-gray-100 mt-1 flex flex-col gap-1.5">
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-gray-500 font-medium">Documento:</span>
                        <span class="font-bold text-gray-700">${f(i)}</span>
                    </div>
                    ${d?`
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-gray-500 font-medium">Local:</span>
                        <span class="font-bold text-gray-700">${f(d)}</span>
                    </div>`:""}
                </div>
            </div>
        `}),a+="</tbody></table></div>",r+="</div>",e.innerHTML=a+r}function ot(e,t=null){const a=document.getElementById("suppliers-list-view"),r=document.getElementById("suppliers-form-view");F.viewMode=e,F.editingItem=t,e==="list"?(a.classList.remove("hidden"),r.classList.add("hidden"),r.innerHTML='<div id="form-container-wrapper" class="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24"></div>',F.hasSearched&&gs(),window.scrollTo({top:0,behavior:"smooth"})):(a.classList.add("hidden"),r.classList.remove("hidden"),Oi(t),window.scrollTo({top:0,behavior:"smooth"}))}async function Vi(e){e.preventDefault();const t=e.target,a=t.querySelector("#supId").value,r={name:t.querySelector("#supName").value,contactName:t.querySelector("#supContact").value,email:t.querySelector("#supEmail").value,phone:t.querySelector("#supPhone").value,document:t.querySelector("#supTaxId").value,category:t.querySelector("#supCategory").value,state:t.querySelector("#supState").value,city:t.querySelector("#supCity").value,establishmentId:m.establishmentId,notes:t.querySelector("#supNotes")?.value||"",accessibleIn:[m.establishmentId]},s=t.querySelector('button[type="submit"]'),o=s.innerHTML;s.disabled=!0,s.innerHTML='<div class="loader-small border-white"></div> A gravar...';try{a?(await Ci(a,r),g("Sucesso","Ficha atualizada!","success")):(await Ii(r),g("Sucesso","Parceiro registado!","success")),F.hasSearched&&(F.partners=await Pa(m.establishmentId)||[]),ot("list")}catch(n){g("Erro","Falha ao gravar: "+n.message,"error"),s.disabled=!1,s.innerHTML=o}}async function Ui(e){if(await z("Excluir Parceiro","Deseja realmente apagar esta ficha permanentemente? Os lançamentos financeiros antigos não serão apagados."))try{await Li(e),g("Sucesso","Entidade excluída.","success"),F.partners=F.partners.filter(a=>a.id!==e),ot("list")}catch(a){g("Erro","Erro ao excluir: "+a.message,"error")}}function _i(){ht&&Ct.removeEventListener("click",ht),ht=async e=>{const t=e.target;if(t.closest('button[data-action="new-partner"]')){ot("form",null);return}if(t.closest("#btn-search-partners")){F.searchQuery=document.getElementById("filterSearch").value,F.categoryFilter=document.getElementById("filterCategory").value,F.stateFilter=document.getElementById("filterState").value,F.cityFilter=document.getElementById("filterCity").value,F.sortBy=document.getElementById("filterSortBy").value,F.hasSearched=!0,zi();return}if(t.closest('button[data-action="back-to-list"]')){ot("list");return}const a=t.closest('button[data-action="delete-partner"]');if(a){e.preventDefault(),Ui(a.dataset.id);return}const r=t.closest('[data-action="open-form"]');if(r&&!t.closest("button")){const s=JSON.parse(r.dataset.item.replace(/&apos;/g,"'"));ot("form",s)}},Ct.addEventListener("click",ht),Ct.addEventListener("keypress",e=>{e.key==="Enter"&&(e.target.id==="filterSearch"||e.target.id==="filterCity")&&document.getElementById("btn-search-partners").click()})}const aa=document.getElementById("content"),no={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let ne=new Set,xt=null,De=null,Lt=[];function Tt(){const e=oe.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}function Wi(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function Ji(e){return e.length===0?'<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>':e.map(t=>{const a=t.status==="inactive",r=f(t.name),s=f(t.specialty||"Especialidade"),o=t.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,n=JSON.stringify(t).replace(/'/g,"&apos;"),i=t.accessibleIn?t.accessibleIn.length:1,l=i>1?`<span class="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded ml-2 border border-indigo-200" title="Atende em ${i} unidades"><i class="bi bi-diagram-3"></i> ${i} Lojas</span>`:"";return`
            <div class="professional-card bg-white rounded-lg shadow-md flex items-center gap-4 p-3 cursor-pointer transition-transform transform hover:shadow-lg hover:bg-gray-50
                        sm:flex-col sm:items-stretch sm:p-0 sm:gap-0 ${a?"opacity-50 bg-gray-100":""}" 
                 data-action="open-professional-modal" data-professional='${n}'>
                
                <img src="${o}" alt="Foto de ${r}" class="w-16 h-16 rounded-full object-cover flex-shrink-0
                            sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg">
                
                <div class="flex-1 sm:p-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-sm font-bold text-gray-900 text-left sm:text-base flex items-center">
                                ${r} ${l}
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
            </div>`}).join("")}function oa(){const e=document.getElementById("genericModal");e.style.display="none",De&&e.removeEventListener("click",De)}async function Gi(e){const t=document.getElementById("genericModal"),a=e.id?e:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},r=f(a.name),s=m.services||await Se(m.establishmentId),o=m.professionals||await se(m.establishmentId),n=`
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
        </div>`;t.innerHTML=n,t.style.display="flex",Qi(a,s),Xi(a),Zi(a,o),el(a)}function Yi(e=[]){if(!Lt||Lt.length===0)return`
            <input type="hidden" name="accessibleIn" value="${m.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                <i class="bi bi-info-circle mr-1"></i> Profissional exclusivo desta unidade.
            </div>`;let t='<div class="space-y-1 mt-2 max-h-48 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30">';return Lt.forEach(a=>{const r=e.includes(a.id)||e.length===0&&a.id===m.establishmentId;t+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${r?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${f(a.name)} (Matriz)</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(s=>{const o=e.includes(s.id)||e.length===0&&s.id===m.establishmentId;t+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${s.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${f(s.name)}</span>
                    </label>
                `})}),t+="</div>",t}function Qi(e,t){const a=document.getElementById("professionalForm"),r=e.dob?e.dob.split("/"):["",""],s=Array.from({length:12},(x,w)=>{const k=w+1,E=k==r[1]?"selected":"",P=new Date(0,w).toLocaleString("pt-BR",{month:"long"});return`<option value="${k}" ${E}>${P.charAt(0).toUpperCase()+P.slice(1)}</option>`}).join(""),o=e.status||"active",n=f(e.name||""),i=f(e.specialty||""),l=f(e.phone||""),d=f(e.notes||"");a.innerHTML=`
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
                    <div class="form-group"><label for="profName" class="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label><input type="text" id="profName" value="${n}" required class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profSpecialty" class="block text-sm font-medium text-gray-700 mb-1">Especialidade / Cargo</label><input type="text" id="profSpecialty" value="${i}" required class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profPhone" class="block text-sm font-medium text-gray-700 mb-1">WhatsApp / Telefone</label><input type="tel" id="profPhone" value="${l}" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
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
            ${Yi(e.accessibleIn||[])}
        </div>

        <div class="pt-6 border-t border-gray-100">
            <label class="block text-base font-bold text-gray-800 mb-3">Serviços que realiza</label>
            <div id="profServicesContainer" class="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50 max-h-64 overflow-y-auto">
                ${t.map(x=>`
                    <label class="flex items-center space-x-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm">
                        <input type="checkbox" value="${x.id}" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" ${e.services?.includes(x.id)?"checked":""}>
                        <span class="text-sm font-medium text-gray-700">${f(x.name)}</span>
                    </label>
                `).join("")}
            </div>
        </div>

        <div class="form-group pt-4">
            <label for="profNotes" class="block text-sm font-medium text-gray-700 mb-1">Observações Internas</label>
            <textarea id="profNotes" rows="3" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">${d}</textarea>
        </div>`;const c=document.getElementById("profPhotoInput"),u=document.getElementById("profPhotoButton"),p=document.getElementById("profPhotoPreview"),h=document.getElementById("profPhotoBase64"),b=e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,v=e.photo||"";u&&u.addEventListener("click",()=>c.click()),c&&(c.onchange=async()=>{const x=c.files[0];if(x){p.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const w=await Oo(x,800,800,.8),E=w.length*3/4,P=1e3*1024;if(E>P)throw new Error("A imagem é muito grande mesmo após a compressão.");p.src=w,h.value=w}catch(w){g("Erro de Imagem",w.message||"Não foi possível processar a imagem.","error"),p.src=b,h.value=v,c.value=""}}})}function Xi(e){const t=document.getElementById("jornada");t.innerHTML=`
        <div class="max-w-4xl mx-auto">
            <h3 class="text-xl font-bold text-gray-800 mb-2">Jornada de Trabalho Semanal</h3>
            <p class="text-sm text-gray-500 mb-6">Defina os dias e os horários em que este profissional atende.</p>
            <div id="profScheduleContainer" class="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
        </div>`,Ki(t.querySelector("#profScheduleContainer"),e.workingHours||{})}async function Zi(e,t){const a=document.getElementById("bloqueios");a.innerHTML=`
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
                                    <span class="text-sm font-medium text-gray-700">${f(o.name)}</span>
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
                    <h3 class="text-xl font-bold text-gray-800">Registos de ${f(e.name.split(" ")[0])}</h3>
                    <select id="prof-blockages-filter" class="p-2 border border-gray-300 rounded-lg text-sm bg-white font-medium outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="future">Apenas Futuros</option>
                        <option value="history">Histórico Passado</option>
                    </select>
                </div>
                <div id="blockagesList" class="space-y-3 max-h-[500px] overflow-y-auto pr-2"></div>
            </div>
        </div>`;const r=document.getElementById("batchBlockageForm");r&&r.addEventListener("submit",async o=>{o.preventDefault();const n=r.querySelector('button[type="submit"]'),i=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm"></span> A gravar...';const l=Array.from(o.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(v=>v.value);if(l.length===0)return n.disabled=!1,n.innerHTML=i,g("Atenção","Selecione pelo menos um profissional.","error");const d=o.target.batchBlockageStartDate.value,c=o.target.batchBlockageEndDate.value||d,u=o.target.batchBlockageStartTime.value,p=o.target.batchBlockageEndTime.value,h=o.target.batchBlockageReason.value;if(!d||!u||!p)return n.disabled=!1,n.innerHTML=i,g("Atenção","Preencha Data de Início, Hora de Início e Fim.","error");const b=l.map(v=>{const x={professionalId:v,establishmentId:m.establishmentId,startTime:new Date(`${d}T${u}`).toISOString(),endTime:new Date(`${c}T${p}`).toISOString(),reason:h};return _t(x)});try{await Promise.all(b),g("Sucesso!",`${l.length} bloqueios foram criados.`),r.reset(),o.target.querySelectorAll('input[name="batch-professionals"]').forEach(x=>{x.checked=x.value===e.id});const v=document.getElementById("prof-blockages-filter").value;st(e.id,v)}catch(v){g("Erro",v.message,"error")}finally{n.disabled=!1,n.innerHTML=i}}),document.getElementById("prof-blockages-filter").addEventListener("change",o=>st(e.id,o.target.value)),await st(e.id,"future")}function Ki(e,t){e.innerHTML=Object.keys(no).map(a=>{const r=t[a]||{},s=r.active!==!1;return`
            <div class="day-schedule-card p-4 rounded-xl ${s?"bg-white border-gray-200 shadow-sm":"bg-gray-50 border-gray-100 disabled opacity-60"} border transition-all">
                 <div class="flex justify-between items-center mb-3">
                    <span class="font-bold text-gray-800">${no[a]}</span>
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
            </div>`}).join(""),e.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",r=>{const s=r.target.closest(".day-schedule-card"),o=!r.target.checked;s.classList.toggle("bg-white",!o),s.classList.toggle("shadow-sm",!o),s.classList.toggle("border-gray-200",!o),s.classList.toggle("bg-gray-50",o),s.classList.toggle("border-gray-100",o),s.classList.toggle("opacity-60",o),s.classList.toggle("disabled",o),s.querySelectorAll(".time-inputs input").forEach(n=>n.disabled=o)})})}async function st(e,t="future"){const a=document.getElementById("blockagesList");if(a){a.innerHTML='<div class="loader mx-auto mt-6"></div>';try{const r=new Date;let s,o;t==="history"?(o=new Date,s=new Date,s.setFullYear(s.getFullYear()-2)):(s=new Date,o=new Date,o.setFullYear(o.getFullYear()+2));let i=(await Ut(m.establishmentId,s.toISOString(),o.toISOString(),e)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));t==="history"?i=i.filter(d=>d.endTime<r).sort((d,c)=>c.startTime-d.startTime):i=i.filter(d=>d.endTime>=r).sort((d,c)=>d.startTime-c.startTime);const l=i.reduce((d,c)=>{const u=c.reason||"Sem motivo detalhado";return d[u]||(d[u]=[]),d[u].push(c),d},{});if(Object.keys(l).length===0){a.innerHTML=`
                <div class="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <i class="bi bi-calendar-check text-3xl text-gray-300 mb-2 block"></i>
                    <p class="text-gray-500 font-medium">Nenhum bloqueio ${t==="history"?"no histórico":"agendado para o futuro"}.</p>
                </div>`;return}a.innerHTML=Object.entries(l).map(([d,c])=>`
            <div class="bg-white border border-gray-200 rounded-xl shadow-sm mb-4 overflow-hidden">
                <div class="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                    <h4 class="font-bold text-gray-800 flex items-center gap-2"><i class="bi bi-tag text-orange-500"></i> ${f(d)}</h4>
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
        `).join("")}catch(r){a.innerHTML=`<p class="text-red-500 p-4">${r.message}</p>`}}}function el(e){const t=document.getElementById("genericModal");De&&t.removeEventListener("click",De),De=async a=>{const r=a.target.closest("button[data-action]");if(!r){const o=a.target.closest(".tab-link");o&&(t.querySelectorAll(".tab-link").forEach(n=>{n.classList.remove("active","border-indigo-600","text-indigo-600"),n.classList.add("border-transparent","text-gray-500")}),o.classList.add("active","border-indigo-600","text-indigo-600"),o.classList.remove("border-transparent","text-gray-500"),t.querySelectorAll(".tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(o.dataset.tab).classList.remove("hidden"));return}const s=r.dataset.action;switch(a.stopPropagation(),s){case"close-modal":oa();break;case"delete-professional":const o=r.dataset.id;if(await z("Excluir Profissional",`Tem certeza que deseja excluir ${e.name}? Esta ação não pode ser desfeita e ele será removido da agenda e de todas as lojas.`))try{await Ro(o),de(m.establishmentId,Tt(),"Equipe","Excluiu",`Excluiu profissional: ${e.name}`),g("Sucesso!","Profissional excluído da rede.","success"),oa(),Mt()}catch(k){g("Erro",`Não foi possível excluir: ${k.message}`,"error")}break;case"save-professional":const i=document.getElementById("professionalForm"),l=r,d=document.getElementById("profScheduleContainer"),c=Array.from(i.querySelectorAll("#profServicesContainer input:checked")).map(k=>k.value),u={};d&&d.querySelectorAll(".day-schedule-card").forEach(k=>{const E=k.querySelector('[data-field="active"]').dataset.day;u[E]={active:k.querySelector('[data-field="active"]').checked,start:k.querySelector('[data-field="start"]').value,end:k.querySelector('[data-field="end"]').value,breakStart:k.querySelector('[data-field="breakStart"]').value,breakEnd:k.querySelector('[data-field="breakEnd"]').value}});const p=Array.from(i.querySelectorAll('input[name="accessibleIn"]:checked')).map(k=>k.value),h=p.length>0?p:[m.establishmentId],b={...e,id:i.querySelector("#professionalId").value||void 0,accessibleIn:h,name:i.querySelector("#profName").value.trim(),specialty:i.querySelector("#profSpecialty").value,photo:i.querySelector("#profPhotoBase64").value,services:c,workingHours:u,phone:i.querySelector("#profPhone").value,dob:`${i.querySelector("#profDobDay").value}/${i.querySelector("#profDobMonth").value}`,receivesCommission:i.querySelector("#profCommission").value==="sim",showOnAgenda:i.querySelector("#profShowOnAgenda").value==="sim",orderOnAgenda:parseInt(i.querySelector("#profOrderOnAgenda").value)||1,notes:i.querySelector("#profNotes").value,status:i.querySelector("#profStatus").value,establishmentId:m.establishmentId},v=l.innerHTML;l.disabled=!0,l.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{b.id?(await Hr(b.id,b),de(m.establishmentId,Tt(),"Equipe","Editou",`Editou o profissional: ${b.name}`),g("Sucesso!","Dados atualizados.","success")):(delete b.id,await Fr(b),de(m.establishmentId,Tt(),"Equipe","Criou",`Cadastrou o profissional: ${b.name}`),g("Sucesso!","Novo membro adicionado à equipe.","success")),oa(),Mt()}catch(k){g("Erro",k.message,"error"),l.disabled=!1,l.innerHTML=v}break;case"delete-blockage":const x=r.dataset.id;if(await z("Apagar Bloqueio","O profissional voltará a ficar disponível na agenda neste dia. Confirma?"))try{await Sa(x),g("Bloqueio removido.","success");const k=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";st(e.id,k)}catch(k){g("Erro",k.message,"error")}break;case"batch-delete-blockage":const w=JSON.parse(r.dataset.ids);if(await z("Apagar em Lote",`Tem certeza que deseja apagar ${w.length} dias de bloqueio de uma vez?`))try{await No(w),g("Bloqueios removidos.","success");const k=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";st(e.id,k)}catch(k){g("Erro",k.message,"error")}break}},t.addEventListener("click",De)}function fa(){const e=document.getElementById("batch-actions-container"),t=document.getElementById("selected-count");!e||!t||(ne.size>0?(t.textContent=`${ne.size} selecionado(s)`,e.classList.remove("hidden"),e.classList.add("flex")):(e.classList.add("hidden"),e.classList.remove("flex")))}function tl(){z("Excluir em Lote",`Tem certeza que deseja excluir ${ne.size} profissionais da rede? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{await Or(Array.from(ne)),de(m.establishmentId,Tt(),"Equipe","Excluiu em Lote",`Excluiu ${ne.size} profissionais`),g("Sucesso!",`${ne.size} profissionais foram excluídos.`,"success"),ne.clear(),fa(),Mt()}catch(t){g("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}function We(){const e=document.getElementById("professionalsList");if(!e)return;if(!m.professionals){e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Wi();return}const t=document.getElementById("showInactiveProfToggle").checked,a=document.getElementById("profSearchInput").value.toLowerCase(),r=m.professionals.filter(s=>{const o=s.name.toLowerCase().includes(a),n=t||s.status!=="inactive";return o&&n});e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Ji(r)}async function Mt(){ne.clear(),aa.innerHTML=`
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
        </section>`,xt&&aa.removeEventListener("click",xt),xt=t=>{const a=t.target.closest('[data-action="open-professional-modal"]'),r=t.target.closest('[data-action="batch-delete"]');if(a){t.preventDefault();let o={};if(a.dataset.professional)try{o=JSON.parse(a.dataset.professional)}catch(n){console.error("Erro ao fazer parse do professional data:",n);return}Gi(o);return}if(r){tl();return}const s=t.target.closest(".professional-checkbox");if(s){const o=s.dataset.id;s.checked?ne.add(o):ne.delete(o),We(),fa();return}},aa.addEventListener("click",xt),document.getElementById("profSearchInput").addEventListener("input",We),document.getElementById("showInactiveProfToggle").addEventListener("change",We);const e=document.getElementById("professionalsList");m.professionals=null,m.services=null,We();try{const[t,a,r]=await Promise.all([se(m.establishmentId),Se(m.establishmentId),ze()]);m.professionals=t,m.services=a,Lt=r?.matrizes||[],We(),fa()}catch{e.innerHTML='<p class="text-red-500 col-span-full font-bold text-center py-10 bg-red-50 rounded-lg border border-red-100">Erro ao carregar dados do servidor.</p>'}}let S={clients:[],selectedClient:null,activeTab:"profile",filters:{search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},showFilters:!1,loading:!1,historyLimit:20,historySearchTerm:"",historyLoading:!1,historyData:{appointments:[],sales:[],loyaltyLog:[]},modalOpen:!1},bs=null;const al=e=>e?String(e).replace(/\D/g,""):"",ol=e=>{if(!e)return"Nunca";let t;if(typeof e=="object"&&(e.seconds||e._seconds)){const a=e.seconds||e._seconds;t=new Date(a*1e3)}else t=new Date(e);return isNaN(t.getTime())?"Data Inválida":t.toLocaleDateString("pt-BR")};function Aa(){bs.innerHTML=`
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
                ${S.loading?'<div class="flex justify-center pt-20"><div class="loader"></div></div>':""}
            </div>
        </section>
    `;const e=document.getElementById("btn-new-client");e&&(e.onclick=ml)}function ut(){if(S.modalOpen)return;Aa();const e=document.getElementById("clients-content-area"),t=S.filters.inactiveDays||S.filters.birthMonth||S.filters.hasLoyalty||S.filters.hasDebt,a=`
        <div class="sticky top-0 bg-gray-50 z-20 px-3 sm:px-4 pt-4 pb-2 w-full">
            <div class="flex gap-2 items-center">
                <div class="relative flex-grow shadow-sm">
                    <input type="text" id="client-search" 
                        class="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition bg-white" 
                        placeholder="Buscar cliente..." 
                        value="${S.filters.search}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                
                <button id="btn-toggle-filters" class="flex-shrink-0 p-3 rounded-xl border transition flex items-center gap-2 font-medium ${S.showFilters||t?"bg-indigo-50 border-indigo-200 text-indigo-700":"bg-white border-gray-300 text-gray-600 hover:bg-gray-50"}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                    <span class="hidden sm:inline">Filtros</span>
                    ${t?'<span class="flex h-2 w-2 rounded-full bg-indigo-600"></span>':""}
                </button>
            </div>

            <div id="filter-panel" class="${S.showFilters?"max-h-96 opacity-100 mt-3":"max-h-0 opacity-0 overflow-hidden"} transition-all duration-300 ease-in-out">
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase">Dias Ausente (Min)</label>
                        <div class="relative">
                            <input type="number" id="filter-inactive" min="1"
                                class="w-full p-2.5 pl-9 rounded-lg border border-gray-300 focus:ring-indigo-500 text-sm bg-gray-50 outline-none" 
                                placeholder="Ex: 30 dias" 
                                value="${S.filters.inactiveDays}">
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
                            <input type="checkbox" id="filter-loyalty" class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" ${S.filters.hasLoyalty?"checked":""}>
                            <span class="ml-2 text-sm text-gray-700 font-medium">Com Pontos Fidelidade</span>
                        </label>
                        <label class="flex items-center cursor-pointer hover:bg-red-50 p-1 rounded transition">
                            <input type="checkbox" id="filter-debt" class="rounded text-red-600 focus:ring-red-500 w-4 h-4" ${S.filters.hasDebt?"checked":""}>
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
    `,r=S.clients.length>0?`
        <div class="px-3 sm:px-4 pb-20 pt-2 w-full">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                ${S.clients.map(c=>{const u=c.totalDebt&&parseFloat(c.totalDebt)>0,p=ol(c.lastVisit);return`
                    <div class="client-card bg-white p-3 sm:p-4 rounded-xl border ${u?"border-l-4 border-l-red-500 border-y-red-100 border-r-red-100":"border-gray-200 border-l-4 border-l-indigo-500"} shadow-sm hover:shadow-md transition cursor-pointer active:bg-gray-50 flex items-center gap-3 group" data-id="${c.id}">
                        
                        <div class="w-12 h-12 rounded-full ${u?"bg-red-100 text-red-600":"bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"} transition-colors flex items-center justify-center font-bold text-lg flex-shrink-0">
                            ${c.name.charAt(0).toUpperCase()}
                        </div>
                        
                        <div class="flex-grow min-w-0">
                            <div class="flex justify-between items-start">
                                <h3 class="font-bold text-gray-800 truncate text-base">${f(c.name)}</h3>
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
    `;e.innerHTML=a+r;const s=document.getElementById("client-search"),o=document.getElementById("btn-toggle-filters"),n=document.getElementById("btn-apply-filters"),i=document.getElementById("btn-clear-search");o&&(o.onclick=()=>{S.showFilters=!S.showFilters,ut()});const l=document.getElementById("filter-birth-month");l&&(l.value=S.filters.birthMonth);const d=()=>{const c=document.getElementById("filter-inactive"),u=document.getElementById("filter-loyalty"),p=document.getElementById("filter-debt"),h=document.getElementById("filter-birth-month");S.filters={search:s.value,inactiveDays:c?c.value:"",birthMonth:h?h.value:"",hasLoyalty:u?u.checked:!1,hasDebt:p?p.checked:!1},va()};n&&(n.onclick=d),i&&(i.onclick=()=>{S.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},S.showFilters=!1,va()}),s.addEventListener("keypress",c=>{c.key==="Enter"&&d()}),e.querySelectorAll(".client-card").forEach(c=>{c.onclick=()=>fs(c.dataset.id)})}function sl(e){const t=`
        <div class="bg-white border-b sticky top-0 z-10 shadow-sm w-full">
            <div class="flex overflow-x-auto no-scrollbar gap-1 px-3 sm:px-4 py-1 w-full">
                <button class="tab-btn ${S.activeTab==="profile"?"active":""}" data-tab="profile">👤 Perfil</button>
                <button class="tab-btn ${S.activeTab==="appointments"?"active":""}" data-tab="appointments">📅 Agendamentos</button>
                <button class="tab-btn ${S.activeTab==="history"?"active":""}" data-tab="history">💰 Histórico</button>
                <button class="tab-btn ${S.activeTab==="loyalty"?"active":""}" data-tab="loyalty">⭐ Fidelidade</button>
            </div>
        </div>
    `;let a="";return S.activeTab==="profile"?a=il(e):S.activeTab==="appointments"?a=ll():S.activeTab==="history"?a=dl():S.activeTab==="loyalty"&&(a=cl(e)),`
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
                        <h2 class="text-xl sm:text-2xl font-bold leading-tight break-words">${f(e.name)}</h2>
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
                ${S.historyLoading?'<div class="absolute inset-0 bg-white/80 flex items-start justify-center pt-20 z-20"><div class="loader"></div></div>':""}
                <div class="animate-fade-in max-w-4xl mx-auto w-full pb-10">
                    ${a}
                </div>
            </div>
        </div>
    `}function rl(e,t){if(!document.getElementById("tabs-styles")){const o=document.createElement("style");o.id="tabs-styles",o.textContent=`
            .tab-btn { padding: 12px 16px; white-space: nowrap; font-size: 0.9rem; font-weight: 500; color: #6b7280; border-bottom: 2px solid transparent; transition: all 0.2s; flex-shrink: 0; }
            .tab-btn.active { color: #4f46e5; border-bottom-color: #4f46e5; font-weight: 700; background-color: #f3f4f6; border-top-left-radius: 8px; border-top-right-radius: 8px; }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `,e.appendChild(o)}if(e.querySelectorAll(".tab-btn").forEach(o=>{o.onclick=async()=>{const n=o.dataset.tab;if(S.activeTab===n)return;(n==="appointments"||n==="history")&&(S.historyLimit=20,S.historySearchTerm=""),S.activeTab=n,qe(),n!=="profile"&&!S.historyLoading&&S.historyData.appointments.length===0&&await io(t.id)}}),S.activeTab==="profile"){const o=e.querySelector("#form-edit-client"),n=e.querySelector("#btn-delete-client");o&&(o.onsubmit=pl),n&&(n.onclick=gl)}if(S.activeTab==="loyalty"){const o=e.querySelector("#btn-manual-redeem");o&&(o.onclick=()=>ul(t))}const a=e.querySelector("#history-search-input");if(a){const o=a.value;a.value="",a.focus(),a.value=o,a.addEventListener("input",n=>{S.historySearchTerm=n.target.value,qe()})}const r=e.querySelector("#btn-load-more");r&&(r.onclick=()=>{S.historyLimit+=20,qe(),io(t.id)}),e.querySelectorAll("[data-go-agenda]").forEach(o=>{o.onclick=n=>{Re(),X("agenda-section",{targetDate:new Date(o.dataset.date),scrollToAppointmentId:o.dataset.id})}}),e.querySelectorAll("[data-go-comanda]").forEach(o=>{o.onclick=n=>{Re(),X("comandas-section",{selectedAppointmentId:o.dataset.id,initialFilter:"finalizadas"})}});const s=e.querySelector("#btn-close-modal");s&&(s.onclick=Re)}async function qe(){const e=S.selectedClient;if(!e){Re();return}nl(e)}function nl(e){let t=document.getElementById("client-details-modal-overlay");t||(t=document.createElement("div"),t.id="client-details-modal-overlay",t.className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-fade-in",t.innerHTML=`
            <div class="bg-white w-full h-full sm:h-[90vh] sm:max-w-5xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-in" id="client-modal-content">
            </div>
        `,t.onclick=r=>{r.target===t&&Re()},document.body.appendChild(t),document.body.classList.add("overflow-hidden"),S.modalOpen=!0);const a=t.querySelector("#client-modal-content");a.innerHTML=sl(e),rl(a,e)}function Re(){const e=document.getElementById("client-details-modal-overlay");e&&e.remove(),document.body.classList.remove("overflow-hidden"),S.modalOpen=!1,S.selectedClient=null,ut()}function il(e){return`
        <form id="form-edit-client" class="space-y-5 w-full">
            <div class="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 shadow-sm w-full">
                <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    Dados Pessoais
                </h3>
                
                <div class="space-y-4 w-full">
                    <div class="w-full">
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Nome Completo</label>
                        <input type="text" name="name" value="${f(e.name)}" required class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Telefone</label>
                            <input type="tel" name="phone" value="${f(e.phone||"")}" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
                        </div>
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">E-mail</label>
                            <input type="email" name="email" value="${f(e.email||"")}" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
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
                <textarea name="notes" rows="4" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border" placeholder="Preferências, alergias...">${f(e.notes||"")}</textarea>
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
    `}function ll(e){let t=S.historyData.appointments||[];if(S.historySearchTerm){const r=S.historySearchTerm.toLowerCase();t=t.filter(s=>s.serviceName&&s.serviceName.toLowerCase().includes(r)||s.professionalName&&s.professionalName.toLowerCase().includes(r))}t.sort((r,s)=>new Date(s.startTime)-new Date(r.startTime));const a=r=>{const s=new Date(r.startTime),o=s.toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).replace(".",""),n=s.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),i=s<new Date;let l=i?"Concluído":"Agendado",d=i?"bg-gray-200 text-gray-600":"bg-green-100 text-green-700";return r.status==="cancelled"&&(l="Cancelado",d="bg-red-100 text-red-600"),`
            <div class="relative bg-white border rounded-xl p-3 shadow-sm mb-3 flex gap-3 cursor-pointer active:scale-[0.99] transition w-full overflow-hidden"
                 data-go-agenda="true" data-id="${r.id}" data-date="${r.startTime}">
                
                <div class="flex-shrink-0 w-14 flex flex-col items-center justify-center rounded-lg bg-gray-100 border border-gray-200 p-1">
                    <span class="text-xs font-bold text-gray-500 uppercase">${o.split(" ")[0]}</span>
                    <span class="text-lg font-black text-gray-800 leading-none">${s.getDate()}</span>
                    <span class="text-[10px] text-gray-500">${n}</span>
                </div>

                <div class="flex-grow min-w-0 flex flex-col justify-center">
                    <h4 class="font-bold text-gray-800 text-sm truncate">${f(r.serviceName||"Serviço")}</h4>
                    <p class="text-xs text-gray-500 truncate">Prof: ${f(r.professionalName||"N/A")}</p>
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
                        value="${S.historySearchTerm}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            <div class="w-full">
                ${t.length?t.map(a).join(""):'<p class="text-center text-gray-400 py-10 italic">Nenhum agendamento encontrado.</p>'}
            </div>
            
            ${t.length>=S.historyLimit?`
            <button id="btn-load-more" class="w-full py-3 text-sm text-indigo-600 font-bold bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                Carregar mais antigos...
            </button>`:""}
        </div>
    `}function dl(e){let t=S.historyData.sales||[];if(S.historySearchTerm){const a=S.historySearchTerm.toLowerCase();t=t.filter(r=>r.id.includes(a))}return t.sort((a,r)=>new Date(r.date)-new Date(a.date)),t.length===0&&!S.historySearchTerm?'<div class="text-center py-12 text-gray-400">Nenhum registro financeiro.</div>':`
        <div class="space-y-4 w-full">
            <div class="sticky top-0 bg-gray-50 pt-2 pb-2 z-10 w-full">
                <div class="relative w-full">
                    <input type="text" id="history-search-input" 
                        class="w-full p-3 pl-10 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm" 
                        placeholder="Buscar código da venda..." 
                        value="${S.historySearchTerm}">
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
            
             ${t.length>=S.historyLimit?`
            <button id="btn-load-more" class="w-full py-3 text-sm text-indigo-600 font-bold bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                Carregar mais...
            </button>`:""}
        </div>
    `}function cl(e){const t=S.historyData.loyaltyLog||[];t.sort((r,s)=>new Date(s.date)-new Date(r.date));const a=t.length>0?t.map(r=>{const s=r.type==="redemption";return`
            <div class="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 w-full">
                <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full ${s?"bg-red-500":"bg-green-500"}"></div>
                    <div>
                        <p class="text-sm font-medium text-gray-700">${f(r.description||(s?"Resgate":"Acúmulo"))}</p>
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
    `}async function va(){S.loading=!0,Aa();try{let e=`/api/clients/${m.establishmentId}?limit=20`;S.filters.search&&(e+=`&search=${encodeURIComponent(S.filters.search)}`),S.filters.inactiveDays&&(e+=`&inactiveDays=${S.filters.inactiveDays}`),S.filters.hasLoyalty&&(e+="&hasLoyalty=true"),S.filters.hasDebt&&(e+="&hasDebt=true"),S.clients=await I(e),ut()}catch(e){console.error(e),g("Erro","Falha ao carregar clientes.","error"),S.clients=[],ut()}finally{S.loading=!1;const e=document.querySelector(".loader");e&&e.parentElement&&e.parentElement.remove()}}async function io(e){const t=S.selectedClient;if(!(!t||!t.phone)){S.historyLoading=!0;try{const a=new Date;a.setMonth(a.getMonth()+12);const r=new Date;r.setFullYear(r.getFullYear()-5);let s=`/api/appointments/${m.establishmentId}?startDate=${r.toISOString()}&endDate=${a.toISOString()}`;s+=`&clientPhone=${encodeURIComponent(al(t.phone))}`,s+=`&limit=${S.historyLimit}`;const o=await I(s);S.historyData.appointments=o,S.historyData.sales=o.filter(i=>i.status==="completed").map(i=>({id:i.id,date:i.startTime,totalAmount:i.totalAmount||0,items:i.comandaItems||i.services||[]}));const n=[];o.forEach(i=>{i.status==="completed"&&i.loyaltyPointsEarned>0&&n.push({type:"earn",points:i.loyaltyPointsEarned,date:i.startTime,description:"Venda finalizada"}),i.loyaltyRedemption&&n.push({type:"redemption",points:i.loyaltyRedemption.cost||0,date:i.startTime,description:`Resgate: ${i.loyaltyRedemption.name}`})}),S.historyData.loyaltyLog=n}catch(a){console.error("Erro ao buscar histórico",a)}finally{S.historyLoading=!1,S.modalOpen&&S.selectedClient&&qe()}}}function ul(e){const t=e.loyaltyPoints||0,a=`
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
    `,{modalElement:r,close:s}=ee({title:"Ajuste de Pontos",contentHTML:a,maxWidth:"w-[90%] max-w-xs"});r.querySelector("form").onsubmit=async o=>{o.preventDefault();const n=document.getElementById("redeem-action").value,i=parseInt(document.getElementById("redeem-points").value,10),l=document.getElementById("redeem-reason").value;if(!i||i<=0)return g("Erro","Qtd inválida.","error");if(n==="debit"&&i>t)return g("Erro","Saldo insuficiente.","error");try{let d=t;n==="debit"?(await Vr(m.establishmentId,e.phone,i,l),d-=i):(d+=i,await Ho(e.id,{loyaltyPoints:d})),S.selectedClient.loyaltyPoints=d,S.historyData.loyaltyLog.unshift({type:n==="debit"?"redemption":"earn",points:i,date:new Date().toISOString(),description:l+" (Manual)"}),g("Sucesso","Saldo atualizado.","success"),s(),qe()}catch(d){g("Erro",d.message,"error")}}}function fs(e){S.selectedClient=S.clients.find(t=>t.id===e),S.activeTab="profile",S.historyLimit=20,S.historySearchTerm="",S.historyData={appointments:[],sales:[],loyaltyLog:[]},qe()}function ml(){const e=`
        <form id="modal-new-client-form" class="space-y-4">
            <div><label class="block text-sm font-bold text-gray-700 mb-1">Nome Completo *</label><input type="text" id="new-name" required class="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"></div>
            <div><label class="block text-sm font-bold text-gray-700 mb-1">Telefone (WhatsApp) *</label><input type="tel" id="new-phone" required class="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"></div>
            <div class="pt-4">
                <button type="submit" class="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:bg-indigo-700 active:scale-95 transition">Cadastrar</button>
            </div>
        </form>
    `,{modalElement:t,close:a}=ee({title:"Novo Cliente",contentHTML:e,maxWidth:"w-[90%] max-w-sm"});t.querySelector("form").onsubmit=async r=>{r.preventDefault();const s=document.getElementById("new-name").value,o=document.getElementById("new-phone").value;try{const n=await Ea({establishmentId:m.establishmentId,name:s,phone:o});S.clients.unshift(n),g("Sucesso","Cliente criado!","success"),a(),fs(n.id)}catch(n){g("Erro",n.message,"error")}}}async function pl(e){e.preventDefault();const t=new FormData(e.target),a=Object.fromEntries(t.entries());a.establishmentId=m.establishmentId;try{await Ho(S.selectedClient.id,a),Object.assign(S.selectedClient,a);const r=S.clients.findIndex(s=>s.id===S.selectedClient.id);r!==-1&&(S.clients[r]=S.selectedClient),g("Sucesso","Dados salvos!","success")}catch(r){g("Erro",r.message,"error")}}async function gl(){if(await z("Excluir Cliente","Tem certeza? O histórico será apagado."))try{await zr(S.selectedClient.id),S.clients=S.clients.filter(e=>e.id!==S.selectedClient.id),S.selectedClient=null,g("Sucesso","Cliente removido.","success"),Re(),ut()}catch(e){g("Erro",e.message,"error")}}async function bl(){bs=document.getElementById("content"),S.selectedClient=null,S.searchTerm="",S.historyLimit=20,S.showFilters=!1,S.modalOpen=!1,S.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1},Aa(),await va()}const ve=document.getElementById("content"),sa={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},fl={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}};let V=null,G=null;function vs(){return[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais da Unidade"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}]}function lo(e,t,a){return new Promise((r,s)=>{const o=new FileReader;o.readAsDataURL(e),o.onload=n=>{const i=new Image;i.src=n.target.result,i.onload=()=>{const l=document.createElement("canvas");let d=i.width,c=i.height;d>t&&(c*=t/d,d=t),l.width=d,l.height=c,l.getContext("2d").drawImage(i,0,0,d,c);const p=e.type==="image/png"&&t<500?"image/png":"image/jpeg";r(l.toDataURL(p,a))},i.onerror=l=>s(l)},o.onerror=n=>s(n)})}function Ie(e,t=null){let a='<option value="">-- Selecione (Opcional) --</option>';const r=n=>{const i=new Map,l=[];return n&&(n.forEach(d=>i.set(d.id,{...d,children:[]})),i.forEach(d=>{d.parentId&&i.has(d.parentId)?i.get(d.parentId).children.push(d):l.push(d)})),l},s=(n,i="")=>{const l=n.id===t?"selected":"";a+=`<option value="${n.id}" ${l}>${i}${f(n.name)}</option>`,n.children.forEach(d=>s(d,i+"— "))};return r(e).forEach(n=>s(n)),a}async function Ve(e,t){const a=t.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const r=[],{ownerName:s,...o}=e;if(s&&s!==m.userName){const i=oe.currentUser;i&&r.push(As(i,{displayName:s}).then(()=>{m.userName=s}))}const n={...V,...o};r.push(ka(G,n)),await Promise.all(r),V=n,g("Sucesso","Definições salvas com sucesso!","success"),o.themeColor&&G===m.establishmentId&&setTimeout(()=>window.location.reload(),1500)}catch(r){g("Erro",`Não foi possível salvar: ${r.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function vl(e,t){const a=f(e.name||""),r=f(e.phone||""),s=f(e.cnpj||""),o=f(e.email||""),n=f(e.address||""),i=f(e.website||""),l=f(m.userName||"");t.innerHTML=`
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
                    <input type="text" id="establishmentAddress" value="${n}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <div>
                    <label for="establishmentWebsite" class="block text-sm font-medium text-gray-700">Website</label>
                    <input type="url" id="establishmentWebsite" value="${i}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
            </form>
        </div>
    `,t.querySelector("#personal-data-form").addEventListener("submit",d=>{d.preventDefault();const c={ownerName:t.querySelector("#ownerName").value,name:t.querySelector("#establishmentName").value,phone:t.querySelector("#establishmentPhone").value,cnpj:t.querySelector("#establishmentCnpjCpf").value,email:t.querySelector("#establishmentEmail").value,address:t.querySelector("#establishmentAddress").value,website:t.querySelector("#establishmentWebsite").value};Ve(c,d)})}function hl(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const r=t.querySelector("#newPassword").value,s=t.querySelector("#confirmPassword").value;if(r!==s){g("Erro","As senhas não coincidem.","error");return}const o=t.querySelector('button[form="change-password-form"]');o.disabled=!0,o.textContent="A Salvar...";try{const n=oe.currentUser;if(n)await Ms(n,r),g("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum usuário logado encontrado.")}catch(n){g("Erro",`Não foi possível alterar a senha: ${n.message}`,"error")}finally{o.disabled=!1,o.textContent="Salvar Nova Senha"}})}function xl(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const r=t.querySelector("#newEmail").value,s=t.querySelector("#currentPassword").value,o=t.querySelector('button[form="change-email-form"]');o.disabled=!0,o.textContent="A verificar...";try{const n=oe.currentUser,i=Ds.credential(n.email,s);await Ps(n,i),await Bs(n,r),await ur(G,r),g("Sucesso","Link de verificação enviado! Verifique o seu novo e-mail.","success"),a.target.reset()}catch(n){g("Erro",n.message,"error")}finally{o.disabled=!1,o.textContent="Salvar Novo E-mail"}})}function yl(e,t){const a=f(e.welcomeMessage||"");t.innerHTML=`
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
    `,t.querySelector("#establishmentLogoBase64").value=e.logo||"",t.querySelector("#establishmentBackgroundImageBase64").value=e.backgroundImage||"",hs(e.themeColor||"indigo",t),t.querySelector("#establishmentLogoButton").onclick=()=>t.querySelector("#establishmentLogoInput").click(),t.querySelector("#establishmentLogoInput").onchange=async r=>{const s=r.target.files[0];if(s){const o=await lo(s,300,.9);t.querySelector("#establishmentLogoPreview").src=o,t.querySelector("#establishmentLogoBase64").value=o}},t.querySelector("#establishmentBgButton").onclick=()=>t.querySelector("#establishmentBgInput").click(),t.querySelector("#establishmentBgInput").onchange=async r=>{const s=r.target.files[0];if(s){const o=t.querySelector("#establishmentBgButton");o.textContent="A processar...",o.disabled=!0;try{const n=await lo(s,1280,.7);t.querySelector("#establishmentBgPreview").src=n,t.querySelector("#establishmentBgPreview").classList.remove("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=n}finally{o.textContent="Carregar Fundo",o.disabled=!1}}},t.querySelector("#establishmentBgRemoveBtn").onclick=()=>{t.querySelector("#establishmentBgPreview").src="",t.querySelector("#establishmentBgPreview").classList.add("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.remove("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=""},t.querySelector("#branding-form").addEventListener("submit",r=>{r.preventDefault();const s={logo:t.querySelector("#establishmentLogoBase64").value,welcomeMessage:t.querySelector("#establishmentWelcomeMessage").value,backgroundImage:t.querySelector("#establishmentBackgroundImageBase64").value,primaryColor:t.querySelector("#establishmentPrimaryColorInput").value,textColor:t.querySelector("#establishmentTextColorInput").value,themeColor:t.querySelector("#establishmentThemeColor").value};Ve(s,r)})}function wl(e,t){const a=e.urlId||G;let r=window.location.origin;(r.includes("localhost")||r.includes("capacitor://")||r.includes("127.0.0.1"))&&(r="https://www.kairosagenda.com.br");const s=f(`${r}/agendar?id=${a}`),o=e.publicBookingEnabled||!1,n=o?"Agendamento Online ATIVO":"Agendamento Online INATIVO",i=o?"text-green-600":"text-red-600";t.innerHTML=`
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
                    <span id="publicBookingStatusText" class="text-sm font-semibold ${i}">${n}</span>
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
    `,t.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const l=t.querySelector("#publicBookingLink");l.select(),document.execCommand("copy"),l.blur(),g("Sucesso","Link copiado!","success")}),t.querySelector("#publicBookingToggle").addEventListener("change",async l=>{const d=l.target.checked,c=t.querySelector("#publicBookingStatusText");c.textContent=d?"Agendamento Online ATIVO":"Agendamento Online INATIVO",c.className=d?"text-sm font-semibold text-green-600":"text-sm font-semibold text-red-600";try{l.target.disabled=!0,await cr(G,d),V.publicBookingEnabled=d,g("Sucesso",`Agendamento online ${d?"ativado":"desativado"}!`,"success")}catch(u){g("Erro",u.message,"error"),l.target.checked=!d}finally{l.target.disabled=!1}}),Cl(e.slotInterval||30,t),t.querySelector("#booking-form").addEventListener("submit",l=>{l.preventDefault();const d={slotInterval:parseInt(t.querySelector("#establishmentSlotInterval").value,10)};Ve(d,l)})}function kl(e,t){t.innerHTML=`
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
    `;const a=t.querySelector("#establishmentTimezone");e.timezone&&(a.value=e.timezone);const r=t.querySelector("#establishmentWorkingHoursContainer"),s=e.workingHours||{};Object.keys(sa).forEach(o=>{const n=s[o]||{},i=sa[o],l=n.active!==!1,d=document.createElement("div");d.className=`day-schedule-card p-4 rounded-lg border ${l?"bg-gray-50 border-gray-200":"bg-gray-100 border-gray-100 disabled opacity-60"}`,d.innerHTML=`
            <div class="flex justify-between items-center mb-4">
                <span class="font-bold text-gray-800">${i}</span>
                <label class="flex items-center cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" id="est-${o}-active" class="sr-only" ${l?"checked":""}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                </label>
            </div>
            <div class="time-inputs grid grid-cols-2 gap-3">
                <div><label class="text-xs text-gray-500">Abertura:</label><input type="time" id="est-${o}-start" value="${n.start||"09:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Fecho:</label><input type="time" id="est-${o}-end" value="${n.end||"18:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Início Pausa:</label><input type="time" id="est-${o}-breakStart" value="${n.breakStart||"12:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Fim Pausa:</label><input type="time" id="est-${o}-breakEnd" value="${n.breakEnd||"13:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
            </div>`,r.appendChild(d)}),r.addEventListener("change",o=>{const n=o.target.closest('.day-schedule-card input[type="checkbox"]');if(n){const i=n.closest(".day-schedule-card");i.classList.toggle("disabled",!n.checked),i.classList.toggle("opacity-60",!n.checked),i.classList.toggle("bg-gray-50",n.checked),i.classList.toggle("bg-gray-100",!n.checked)}}),t.querySelector("#working-hours-form").addEventListener("submit",o=>{o.preventDefault();const n={};Object.keys(sa).forEach(l=>{n[l]={active:t.querySelector(`#est-${l}-active`).checked,start:t.querySelector(`#est-${l}-start`).value,end:t.querySelector(`#est-${l}-end`).value,breakStart:t.querySelector(`#est-${l}-breakStart`).value,breakEnd:t.querySelector(`#est-${l}-breakEnd`).value}});const i=t.querySelector("#establishmentTimezone").value;Ve({workingHours:n,timezone:i},o)})}async function Sl(e,t){const a=e.loyaltyProgram||{},r=a.pointsPerVisit||1;let s=[],o=[],n=[];try{[s,o,n]=await Promise.all([Se(G),Gt(G),Ca(G)])}catch(d){console.error("Erro ao carregar dados para fidelidade:",d)}t.innerHTML=`
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
    `;const i=t.querySelector("#loyaltyTiersContainer"),l=(d={})=>{const c=document.createElement("div");c.className="loyalty-tier-row bg-white p-4 border border-gray-200 rounded-lg shadow-sm relative grid grid-cols-1 md:grid-cols-4 gap-4 items-end";const u=d.type||"money",p=d.itemId||"",h=d.reward||"",b=d.discount||"",v=d.points||d.costPoints||"";c.innerHTML=`
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
                    <input type="text" placeholder="Ex: R$ 20 de Desconto" data-field="rewardName" value="${f(h)}" class="desc-input flex-1 p-2 border border-gray-300 rounded-md ${u!=="money"?"hidden":""}">
                    
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
        `;const x=c.querySelector(".type-select"),w=c.querySelector(".item-select"),k=c.querySelector(".desc-input"),E=c.querySelector(".discount-input"),P=C=>{w.innerHTML='<option value="">Selecione...</option>';let A=[];C==="service"?A=s:C==="product"?A=o:C==="package"&&(A=n),A.forEach(j=>{const T=j.id===p,M=j.name||j.title||"Sem nome",q=j.price||j.salePrice||0;w.innerHTML+=`<option value="${j.id}" data-price="${q}" ${T?"selected":""}>${f(M)}</option>`})};return u!=="money"&&P(u),x.addEventListener("change",C=>{const A=C.target.value;A==="money"?(w.classList.add("hidden"),k.classList.remove("hidden"),k.value="",E.value=""):(w.classList.remove("hidden"),k.classList.add("hidden"),P(A),E.value="")}),w.addEventListener("change",C=>{const A=C.target.selectedOptions[0];if(A&&A.value){k.value=A.text;const j=A.dataset.price;j&&(E.value=parseFloat(j).toFixed(2))}}),c};a.tiers&&a.tiers.length>0?a.tiers.forEach(d=>i.appendChild(l(d))):i.appendChild(l()),t.querySelector("#add-loyalty-tier").addEventListener("click",()=>{i.appendChild(l())}),i.addEventListener("click",d=>{const c=d.target.closest(".remove-loyalty-tier");c&&c.closest(".loyalty-tier-row").remove()}),t.querySelector("#loyalty-form").addEventListener("submit",d=>{d.preventDefault();const c=Array.from(t.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(p=>{const h=p.querySelector(".type-select").value,b=h==="money"?null:p.querySelector(".item-select").value;let v=h==="money"?p.querySelector(".desc-input").value:p.querySelector(".item-select").options[p.querySelector(".item-select").selectedIndex]?.text;return{points:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,costPoints:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,type:h,itemId:b,reward:v,name:v,discount:parseFloat(p.querySelector('input[data-field="discount"]').value)||0}}),u={loyaltyProgram:{enabled:t.querySelector("#loyaltyEnabled").checked,type:"visit",pointsPerVisit:parseInt(t.querySelector("#loyaltyPointsPerVisit").value,10)||1,pointsPerCurrency:0,tiers:c.filter(p=>p.points>0&&p.reward)}};Ve(u,d)})}async function $l(e,t){t.innerHTML=`
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
    `;try{const[a,r]=await Promise.all([Qt(G),La(G)]),s=e.financialIntegration||{},o=e.commissionConfig||{},n=e.purchaseConfig||{};t.querySelector("#financialNatureId").innerHTML=Ie(a,s.defaultNaturezaId),t.querySelector("#financialCostCenterId").innerHTML=Ie(r,s.defaultCentroDeCustoId),t.querySelector("#purchaseNatureId").innerHTML=Ie(a,n.defaultNatureId),t.querySelector("#purchaseCostCenterId").innerHTML=Ie(r,n.defaultCostCenterId),t.querySelector("#commissionNatureId").innerHTML=Ie(a,o.defaultNatureId),t.querySelector("#commissionCostCenterId").innerHTML=Ie(r,o.defaultCostCenterId)}catch{g("Erro","Não foi possível carregar o plano de contas da unidade.","error")}t.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const r={financialIntegration:{defaultNaturezaId:t.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:t.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:t.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:t.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:t.querySelector("#commissionNatureId").value||null,defaultCostCenterId:t.querySelector("#commissionCostCenterId").value||null}};Ve(r,a)})}function El(e,t){const a=`https://wa.me/5516997859430?text=Olá, preciso de ajuda com o sistema Kairos (Minha Unidade: ${e.name}).`;t.innerHTML=`
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
    `}function Il(e,t){const a=`https://wa.me/5516997859430?text=Gostaria de solicitar o cancelamento da assinatura. (Unidade: ${e.name})`;t.innerHTML=`
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
    `}function hs(e="indigo",t){const a=t.querySelector("#color-palette-container"),r=t.querySelector("#establishmentThemeColor");!a||!r||(a.innerHTML="",Object.entries(fl).forEach(([s,o])=>{const n=s===e,i=document.createElement("div");i.className="w-24 text-center cursor-pointer mb-4",i.innerHTML=`
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${n?"border-gray-800 scale-110 shadow-lg":"border-transparent"} p-1 transition-all">
                <div class="w-full h-full rounded-full" style="background-color: ${o.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${n?"text-gray-900 font-bold":"text-gray-500"}">${o.name}</p>
        `,i.addEventListener("click",()=>{r.value=s,hs(s,t)}),a.appendChild(i)}),r.value=e)}function Cl(e,t){const a=t.querySelector("#slotIntervalContainer"),r=t.querySelector("#establishmentSlotInterval");if(!a||!r)return;const s=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=s.map(o=>{const n=o.value===e;return`<button type="button" data-value="${o.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors shadow-sm
                           ${n?"bg-indigo-600 text-white":"bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}">
                       ${o.label}
                   </button>`}).join(""),r.value=e,a.querySelectorAll(".interval-btn").forEach(o=>{o.addEventListener("click",()=>{r.value=o.dataset.value,a.querySelectorAll(".interval-btn").forEach(n=>{n.classList.remove("bg-indigo-600","text-white"),n.classList.add("bg-white","border","border-gray-300","text-gray-700")}),o.classList.add("bg-indigo-600","text-white"),o.classList.remove("bg-white","border","border-gray-300","text-gray-700")})})}async function Ll(e){const a=vs().find(s=>s.id===e);if(!a)return;ve.innerHTML=`
        <div class="bg-white p-4 shadow-sm border-b mb-6 flex items-center justify-between sticky top-0 z-10">
            <div class="flex items-center gap-3">
                <button data-action="back-to-menu" class="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700">
                    <i class="bi bi-arrow-left"></i> Voltar
                </button>
                <h2 class="text-lg font-bold text-gray-800">${a.label}</h2>
            </div>
            <div class="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                ${f(V?.name||"")}
            </div>
        </div>
        
        <div id="settings-content-detail" class="pb-20 max-w-5xl mx-auto w-full">
            <div class="flex justify-center items-center py-10"><div class="spinner-border text-indigo-600" role="status"></div></div>
        </div>
    `,ve.querySelector('button[data-action="back-to-menu"]').addEventListener("click",s=>{s.preventDefault(),xs({id:G})});const r=document.getElementById("settings-content-detail");switch(e){case"personal-data":vl(V,r);break;case"change-password":hl(V,r);break;case"change-email":xl(V,r);break;case"branding":yl(V,r);break;case"booking":wl(V,r);break;case"working-hours":kl(V,r);break;case"loyalty":await Sl(V,r);break;case"financial":await $l(V,r);break;case"support":El(V,r);break;case"cancellation":Il(V,r);break;default:r.innerHTML='<div class="p-4 text-center">Módulo em construção.</div>'}}async function xs(e={}){ve.innerHTML=`
        <div class="flex flex-col justify-center items-center h-64">
            <div class="spinner-border text-indigo-600 border-4 w-12 h-12 mb-4" role="status"></div>
            <p class="text-gray-500 font-medium">A carregar configurações da unidade...</p>
        </div>
    `;try{G=e.id||m.establishmentId,V=await ye(G);const t=e.id?`<button onclick="window.navigateTo('establishments-section')" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                   <i class="bi bi-diagram-3"></i> Voltar à Rede
               </button>`:"",a=V.isMatriz||!V.parentId?'<span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded ml-3">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded ml-3">📍 UNIDADE</span>',r=vs();ve.innerHTML=`
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
                        <h3 class="text-2xl font-bold mb-1">${f(V.name)} ${a}</h3>
                        <p class="text-indigo-200 text-sm flex items-center gap-2"><i class="bi bi-geo-alt"></i> ${f(V.address||"Morada não definida")}</p>
                    </div>
                    <div class="relative z-10 hidden sm:block">
                        <div class="w-16 h-16 bg-white rounded-xl shadow-md p-1 flex items-center justify-center">
                            ${V.logo?`<img src="${V.logo}" class="w-full h-full object-contain rounded-lg">`:`<span class="text-2xl text-indigo-600 font-bold">${V.name.charAt(0).toUpperCase()}</span>`}
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
                        ${Tl(V.modules||{})}
                    </div>
                </div>
            </div>
        `,ve.querySelectorAll("div[data-section]").forEach(s=>{s.addEventListener("click",o=>{Ll(s.dataset.section)})}),ve.querySelectorAll(".module-toggle").forEach(s=>{s.addEventListener("change",async()=>{const o=s.dataset.module;try{const i={...(await ye(G)).modules,[o]:s.checked};await ka(G,{modules:i}),g("Módulos","Módulos atualizados com sucesso.","success")}catch(n){s.checked=!s.checked,g("Erro",n.message,"error")}})})}catch(t){ve.innerHTML=`
            <div class="p-8 text-center max-w-md mx-auto">
                <i class="bi bi-exclamation-triangle text-4xl text-red-500 mb-4 block"></i>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Erro ao carregar loja</h2>
                <p class="text-gray-600">${t.message}</p>
                <button onclick="window.navigateTo('establishments-section')" class="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700">Voltar à Rede</button>
            </div>
        `}}function Tl(e){return[{key:"agenda-section",label:"Agenda Diária",icon:"bi-calendar"},{key:"comandas-section",label:"Comandas e PDV",icon:"bi-receipt"},{key:"financial-section",label:"Financeiro Completo",icon:"bi-cash-coin"},{key:"reports-section",label:"Relatórios Gerenciais",icon:"bi-graph-up"}].map(a=>`
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
    `).join("")}const rt=document.getElementById("content");async function Ne(e){const t=document.getElementById("blockagesList");if(t){t.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,r=document.getElementById("filterEndDate")?.value,s=await Ut(m.establishmentId,a||new Date().toISOString().split("T")[0],r||new Date().toISOString().split("T")[0],e),o=document.getElementById("filterReason")?.value.toLowerCase(),n=o?s.filter(l=>l.reason&&l.reason.toLowerCase().includes(o)):s,i=n.reduce((l,d)=>{const c=d.reason||"Sem motivo";return l[c]||(l[c]=[]),l[c].push(d),l},{});if(t.innerHTML="",n.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(i).forEach(([l,d])=>{const c=document.createElement("div");c.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let p=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${f(l)} (${d.length})</h4>`;if(d.length>1){const h=JSON.stringify(d.map(b=>b.id));p+=`<button data-action="batch-delete-blockage" data-ids='${h}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}p+="</div>",c.innerHTML=p,d.forEach(h=>{const b=new Date(h.startTime),v=new Date(h.endTime),x=b.toLocaleDateString("pt-BR"),w=v.toLocaleDateString("pt-BR"),E=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${x===w?`${x} | ${b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${v.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${x} às ${b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${w} às ${v.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${h.id}">Apagar</button>
                    </div>`;c.innerHTML+=E}),t.appendChild(c)})}catch(a){t.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function Dl(e){e.preventDefault();const t=e.target,a=t.querySelector("#blockageProfId").value,r=t.querySelector("#blockageDate").value,s=t.querySelector("#blockageEndDate").value||r,o=t.querySelector("#blockageStartTime").value,n=t.querySelector("#blockageEndTime").value,i={establishmentId:m.establishmentId,professionalId:a,startTime:new Date(`${r}T${o}:00`).toISOString(),endTime:new Date(`${s}T${n}:00`).toISOString(),reason:t.querySelector("#blockageReason").value};try{await _t(i),t.reset(),g("Sucesso","Bloqueio adicionado com sucesso!","success"),Ne(a)}catch(l){g("Erro",`Não foi possível criar o bloqueio: ${l.message}`,"error")}}async function Pl(e){e.preventDefault();const t=e.target,a=Array.from(t.querySelectorAll('input[name="batch-professionals"]:checked')).map(c=>c.value);if(a.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const r=t.querySelector("#batchBlockageDate").value,s=t.querySelector("#batchBlockageEndDate").value||r,o=t.querySelector("#batchBlockageStartTime").value,n=t.querySelector("#batchBlockageEndTime").value,i=t.querySelector("#batchBlockageReason").value,l=t.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="Aguarde...";const d=a.map(c=>{const u={establishmentId:m.establishmentId,professionalId:c,startTime:new Date(`${r}T${o}:00`).toISOString(),endTime:new Date(`${s}T${n}:00`).toISOString(),reason:i};return _t(u)});try{await Promise.all(d),g("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),t.reset(),t.querySelectorAll('input[name="batch-professionals"]:checked').forEach(u=>u.checked=!1);const c=document.getElementById("blockageProfId").value;c&&Ne(c)}catch(c){g("Erro",`Ocorreu um erro: ${c.message}`,"error")}finally{l.disabled=!1,l.textContent="Adicionar Bloqueio em Lote"}}function Bl(e){rt.addEventListener("submit",t=>{t.target.id==="blockageForm"&&Dl(t),t.target.id==="batchBlockageForm"&&Pl(t)}),rt.addEventListener("input",t=>{t.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&Ne(e)}),rt.addEventListener("click",async t=>{const a=t.target.closest("button[data-action]");if(!a)return;const r=a.dataset.action;if(r==="back-to-professionals")X("profissionais-section");else if(r==="delete-blockage"){if(await z("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await Sa(a.dataset.id),g("Sucesso","Bloqueio removido.","success"),Ne(e)}catch(o){g("Erro",`Não foi possível remover o bloqueio: ${o.message}`,"error")}}else if(r==="batch-delete-blockage"){const s=JSON.parse(a.dataset.ids);if(await z("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${s.length} bloqueios de uma vez?`))try{await No(s),g("Sucesso",`${s.length} bloqueios removidos.`,"success"),Ne(e)}catch(n){g("Erro",`Não foi possível apagar os bloqueios: ${n.message}`,"error")}}})}async function Ml(e){const{professionalId:t,professionalName:a}=e;if(!t||!a){rt.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const r=f(a);rt.innerHTML=`
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
        </section>`,Bl(t),await Ne(t);const s=document.getElementById("batchProfSelectionContainer");try{const o=await se(m.establishmentId);s.innerHTML=o.map(n=>`
            <div class="flex items-center">
                <input id="prof-batch-${n.id}" value="${n.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${n.id}" class="ml-2 text-sm text-gray-700">${f(n.name)}</label>
            </div>`).join("")}catch{s.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Al=e=>I(`/api/users/${e}`),ql=e=>I("/api/users",{method:"POST",body:JSON.stringify(e)}),Rl=(e,t)=>I(`/api/users/${e}`,{method:"PUT",body:JSON.stringify(t)}),Nl=e=>I(`/api/users/${e}`,{method:"DELETE"}),jl=(e,t)=>I(`/api/users/${e}/password`,{method:"PUT",body:JSON.stringify({password:t})}),Fl=(e,t)=>I(`/api/users/${e}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),Je=document.getElementById("content"),Hl={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios Gerais","sales-report-section":"Relatório de Vendas (Caixa)","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores","profissionais-section":"Profissionais","ausencias-section":"Ausências e Bloqueios","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},Ol={view:"Visualizar",create:"Criar",edit:"Editar"};let yt=null,wt=null,je=null;const zl={group_admin:"Administrador do Grupo",company_admin:"Gestor de Matriz",branch_manager:"Gestor de Filial",professional:"Profissional Padrão"};function Vl(e){const t=document.getElementById("usersListContainer");if(!t)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(e.length===0){const r=a?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";t.innerHTML=`<p class="col-span-full text-center text-gray-500">${r}</p>`;return}e.sort((r,s)=>(r.status==="active"?-1:1)-(s.status==="active"?-1:1)),t.innerHTML=e.map(r=>{const s=JSON.stringify(r).replace(/'/g,"&apos;"),o=r.status==="active",n=m.professionals.find(p=>p.id===r.professionalId),i=n?n.name:"N/A",l=n?n.name.charAt(0):r.name.charAt(0),d=n?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(l)}`,c=zl[r.role]||"Profissional",u=r.role==="group_admin"?"bg-purple-100 text-purple-800":r.role==="company_admin"?"bg-blue-100 text-blue-800":r.role==="branch_manager"?"bg-orange-100 text-orange-800":"bg-gray-100 text-gray-800";return`
        <div class="user-card-clickable bg-white rounded-lg shadow-sm border overflow-hidden flex cursor-pointer ${o?"":"opacity-60"} hover:shadow-md transition" 
             data-action="edit-user" 
             data-user='${s}'>
            
            <img src="${d}" alt="Foto de Perfil" class="w-16 h-16 object-cover flex-shrink-0 pointer-events-none border-r">
            
            <div class="p-3 flex-grow flex flex-col justify-between min-w-0">
                <div class="pointer-events-none min-w-0">
                    <div class="flex justify-between items-start gap-2">
                        <p class="font-bold text-gray-800 text-sm truncate">${r.name}</p>
                        <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap ${u}">${c}</span>
                    </div>
                    <p class="text-xs text-gray-500 truncate">${r.email}</p>
                    <p class="text-[10px] text-gray-400 mt-1 truncate">Prof: <span class="font-semibold text-gray-600">${i}</span></p>
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
    `}).join("")}function ha(){const t=document.getElementById("showInactiveUsersToggle")?.checked?m.users:m.users.filter(a=>a.status==="active");Vl(t)}function Ul(e={}){return Object.entries(Hl).map(([t,a])=>{const r=t==="agenda-section"||t==="comandas-section",s=e[t]?.view_all_prof===!0,o=Object.entries(Ol).map(([i,l])=>`
             <label class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${t}" data-permission="${i}" class="sr-only" ${e[t]?.[i]?"checked":""}>
                    <div class="toggle-bg block bg-gray-300 w-8 h-4 rounded-full"></div>
                </div>
                <span class="text-[10px] text-gray-600 font-medium">${l}</span>
            </label>
        `).join(""),n=r?`
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
            ${n}
        </div>
    `}).join("")}function co(e){if(!je||m.userRole==="professional")return"";const t=e?.accessibleEstablishments?.map(o=>o.id)||[],a=e?.accessibleCompanies?.map(o=>o.id)||[];if((e?.role||"professional")==="group_admin")return'<div class="p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 text-sm font-bold">Acesso Total (Global) liberado.</div>';let s='<div class="space-y-3 max-h-48 overflow-y-auto custom-scrollbar p-2 bg-gray-50 rounded border">';return je.companies.forEach(o=>{const n=a.includes(o.id),i=je.branches.filter(l=>l.companyId===o.id);s+=`
            <div class="company-block">
                <label class="flex items-center space-x-2 cursor-pointer mb-1">
                    <input type="checkbox" class="company-checkbox rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" value="${o.id}" data-name="${o.name}" ${n?"checked":""}>
                    <span class="text-sm font-bold text-gray-800">🏢 ${o.name}</span>
                </label>
                <div class="pl-6 space-y-1 border-l-2 border-gray-200 ml-2">
                    ${i.map(l=>{const d=t.includes(l.id)||n;return`
                            <label class="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" class="branch-checkbox rounded text-indigo-500 h-3 w-3" value="${l.id}" data-name="${l.name}" data-company-id="${o.id}" ${d?"checked":""}>
                                <span class="text-xs text-gray-600">📍 ${l.name}</span>
                            </label>
                        `}).join("")}
                </div>
            </div>
        `}),s+="</div>",s}async function uo(e=null){document.getElementById("user-list-view").classList.add("hidden");const t=document.getElementById("user-form-view");t.classList.remove("hidden");let a=m.professionals;if(!a||a.length===0)try{a=await se(m.currentViewContext.id),m.professionals=a}catch{console.warn("Profissionais não carregados")}if(["group_admin","company_admin"].includes(m.userRole)&&!je)try{const d=await fetch("/api/establishments/hierarchy",{headers:{Authorization:`Bearer ${await m.getAuthToken?.()||""}`}});d.ok&&(je=await d.json())}catch(d){console.error("Falha ao buscar hierarquia",d),je={companies:[],branches:[]}}const r=d=>a?.find(c=>c.id===d),s=e?.professionalId;r(s);const o=e!==null;t.querySelector("#userFormTitle").textContent=o?`Editar: ${e.name}`:"Novo Usuário";const n=t.querySelector("#userForm");n.innerHTML=`
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
                            ${co(e)}
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
                    ${Ul(e?.permissions)}
                </div>
            </div>

            <div class="flex gap-3 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-2 bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300">Cancelar</button>
                <button type="submit" class="flex-1 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">Salvar Usuário</button>
            </div>
        </div>
    `;const i=n.querySelector("#userRole"),l=n.querySelector("#hierarchySelectorContainer");if(i&&l){i.addEventListener("change",c=>{const u={...e,role:c.target.value};l.innerHTML=co(u),d()});const d=()=>{l.querySelectorAll(".company-checkbox").forEach(c=>{c.addEventListener("change",u=>{u.target.closest(".company-block").querySelectorAll(".branch-checkbox").forEach(b=>b.checked=u.target.checked)})})};d()}if(n.addEventListener("submit",async d=>{d.preventDefault();const c={};n.querySelectorAll("input[data-module]").forEach(x=>{const w=x.dataset.module,k=x.dataset.permission;c[w]||(c[w]={}),c[w][k]=x.checked});const u=n.querySelector("#userProfessionalId").value||null,p=n.querySelector("#userRole")?.value||"professional",h=[],b=[];if(p!=="group_admin"&&n.querySelector(".company-checkbox")&&(n.querySelectorAll(".company-checkbox:checked").forEach(x=>{h.push({id:x.value,name:x.dataset.name})}),n.querySelectorAll(".branch-checkbox:checked").forEach(x=>{b.push({id:x.value,name:x.dataset.name,companyId:x.dataset.companyId})}),b.length===0))return g("Atenção","Você deve selecionar pelo menos uma filial para este usuário.","error");const v={name:n.querySelector("#userName").value,permissions:c,professionalId:u,role:p,accessibleCompanies:h,accessibleEstablishments:b};try{if(o){const x=n.querySelector("#userEmail").value;e?.email!==x&&(v.email=x),await Rl(e.id,v),g("Usuário atualizado com sucesso!","success")}else v.email=n.querySelector("#userEmail").value,v.password=n.querySelector("#userPassword").value,await ql(v),g("Usuário criado com sucesso!","success");At()}catch(x){g(`Erro: ${x.message}`,"error")}}),o){const d=n.querySelector('[data-action="show-password-form"]'),c=n.querySelector("#password-form");d&&c&&(d.addEventListener("click",()=>{d.classList.add("hidden"),c.classList.remove("hidden")}),c.querySelector('[data-action="cancel-password-change"]').addEventListener("click",()=>{d.classList.remove("hidden"),c.classList.add("hidden"),c.querySelector("#userNewPassword").value=""}),c.querySelector('[data-action="save-password"]').addEventListener("click",async u=>{const p=u.target,h=c.querySelector("#userNewPassword").value;if(!h||h.length<6)return g("Aviso","Senha deve ter no mínimo 6 caracteres.","error");if(await z("Alterar Senha","Tem certeza?"))try{p.disabled=!0,p.textContent="...",await jl(e.id,h),g("Sucesso","Senha alterada.","success"),d.classList.remove("hidden"),c.classList.add("hidden")}catch(b){g("Erro",b.message,"error")}finally{p.disabled=!1,p.textContent="Salvar Senha"}}))}}async function _l(){const e=document.getElementById("usersListContainer");e.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[t,a]=await Promise.all([Al(m.currentViewContext.id),se(m.currentViewContext.id)]);m.users=t,m.professionals=a,ha()}catch{g("Erro ao carregar usuários.","error"),e.innerHTML='<p class="col-span-full text-center text-red-500">Falha ao carregar.</p>'}}async function At(){Je.innerHTML=`
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
    `,yt&&Je.removeEventListener("click",yt),wt&&Je.removeEventListener("change",wt),yt=async e=>{const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"new-user":uo();break;case"edit-user":const r=JSON.parse(t.dataset.user.replace(/&apos;/g,"'"));uo(r);break;case"back-to-list":At();break;case"delete-user":{if(e.stopPropagation(),await z("Excluir Usuário","Tem certeza? Ação irreversível."))try{await Nl(t.dataset.userId),g("Usuário excluído!","success"),At()}catch(s){g(`Erro: ${s.message}`,"error")}break}}},wt=async e=>{const t=e.target.closest('input[data-action="toggle-user-status"]');if(e.target.id==="showInactiveUsersToggle")ha();else if(t){e.stopPropagation();const a=t.dataset.userId,r=t.checked?"active":"inactive";try{await Fl(a,r);const s=m.users.findIndex(o=>o.id===a);s>-1&&(m.users[s].status=r,ha())}catch(s){g(`Erro: ${s.message}`,"error"),t.checked=!t.checked}}},Je.addEventListener("click",yt),Je.addEventListener("change",wt),await _l()}const Wl=document.getElementById("content");let mo={},xa=null;function Jl(){Object.values(mo).forEach(e=>e?.destroy()),mo={}}function Gl(e,t){if(!window.jspdf){g("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:a}=window.jspdf,r=new a({orientation:"landscape",unit:"px",format:"a4"}),s=document.getElementById("salesReportSummaryCards");if(r.setFontSize(18),r.text(e,r.internal.pageSize.getWidth()/2,40,{align:"center"}),s){const n=[["Receita Total",s.querySelector("#summary-revenue").textContent],["Vendas Totais",s.querySelector("#summary-transactions").textContent],["Ticket Médio",s.querySelector("#summary-avg-ticket").textContent]];r.autoTable({startY:60,head:[["Métrica","Valor"]],body:n,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const o=r.lastAutoTable?r.lastAutoTable.finalY+20:60;r.text("Detalhes das Vendas",20,o),r.autoTable({html:`#${t}`,startY:o+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),r.save(`${e.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function po(e){const t=document.getElementById("genericModal"),a=f(e.client),r=f(e.items),s=f(e.responsavelCaixa||"N/A"),o=(e.payments||[]).map(n=>`
        <div class="flex justify-between text-sm">
            <span>${f(n.method.charAt(0).toUpperCase()+n.method.slice(1))}</span>
            <span class="font-medium">R$ ${n.value.toFixed(2)}</span>
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
    `,t.style.display="flex"}function Yl(e){const{summary:t,transactions:a}=e;document.getElementById("summary-revenue").textContent=`R$ ${t.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=t.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${t.averageTicket.toFixed(2)}`;const r=document.getElementById("paymentSummaryTableBody"),s=Object.entries(t.paymentMethodTotals).sort(([,i],[,l])=>l-i);r.innerHTML=s.map(([i,l])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${f(i.charAt(0).toUpperCase()+i.slice(1))}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${l.toFixed(2)}</td>
        </tr>
    `).join("");const o=document.getElementById("transactionsTableBody"),n=document.getElementById("mobileTransactionsList");if(a.length===0){const i='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';o.innerHTML=i,n.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}o.innerHTML=a.map((i,l)=>{const d=f(i.client),c=f(i.items),u=f(i.type);return`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${l}">
            <td class="w-24 py-3 px-4">${new Date(i.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${d}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${c}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${u}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${i.total.toFixed(2)}</td>
        </tr>
    `}).join(""),o.querySelectorAll("tr").forEach(i=>{i.addEventListener("dblclick",()=>{const l=i.dataset.transactionIndex,d=xa.transactions[l];d&&po(d)})}),n.innerHTML=a.map((i,l)=>{const d=f(i.client),c=f(i.items),u=f(i.type);return`
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 active:bg-gray-50 cursor-pointer transition-colors" data-transaction-index="${l}">
            <div class="flex justify-between items-start mb-2">
                <div class="flex flex-col">
                    <span class="text-xs text-gray-500 font-medium">${new Date(i.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</span>
                    <span class="font-bold text-gray-800 text-lg">${d}</span>
                </div>
                <div class="text-right">
                    <span class="block font-bold text-green-600 text-lg">R$ ${i.total.toFixed(2)}</span>
                    <span class="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200">${u}</span>
                </div>
            </div>
            <div class="mt-2 pt-2 border-t border-dashed border-gray-200">
                <p class="text-sm text-gray-600 line-clamp-2">${c}</p>
            </div>
            <p class="text-xs text-blue-500 mt-2 text-center font-medium">Toque para ver detalhes</p>
        </div>
    `}).join(""),n.querySelectorAll("div[data-transaction-index]").forEach(i=>{i.addEventListener("click",()=>{const l=i.dataset.transactionIndex,d=xa.transactions[l];d&&po(d)})})}async function go(){const e=document.getElementById("main-reports-view"),t=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!e||!t||!a)return;const r=t.value,s=a.value;if(!r||!s)return g("Atenção","Por favor, selecione as datas de início e fim.","error");e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const o=document.getElementById("cashierSessionFilter").value,n=await Pr({establishmentId:m.establishmentId,startDate:r,endDate:s,cashierSessionId:o});xa=n,e.innerHTML=`
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
        `,Yl(n)}catch(o){g("Erro",`Não foi possível carregar o relatório: ${o.message}`,"error"),e.innerHTML=`<p class="p-8 text-center text-red-500">${f(o.message)}</p>`}}async function Ql(){Jl();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];Wl.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",go),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const r=document.getElementById("reportStartDate").value,s=document.getElementById("reportEndDate").value,o=`Relatorio_Vendas_${r}_a_${s}`;Gl(o,"transactionsTable")});try{const r=await kn(m.establishmentId),s=document.getElementById("cashierSessionFilter");r&&r.length>0&&r.forEach(o=>{const n=new Date(o.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),i=f(o.closedByName||"N/A");s.innerHTML+=`<option value="${o.id}">${i} - ${n}</option>`})}catch{g("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await go()}const Xl=document.getElementById("content");let $={payables:[],receivables:[],natures:[],costCenters:[],establishments:[],currentTab:"receivables",statusFilter:"all",startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date(new Date().getFullYear(),new Date().getMonth()+1,0).toISOString().split("T")[0],filterNaturezaId:"all",filterCostCenterId:"all",filterEstablishmentIds:new Set,searchQuery:"",isAdvancedFilterOpen:!1,selectedIds:new Set,isSelectionMode:!1},kt=null,St=null;function qa(e){const t=new Map,a=[];return e&&(e.forEach(r=>t.set(r.id,{...r,children:[]})),t.forEach(r=>{r.parentId&&t.has(r.parentId)?t.get(r.parentId).children.push(r):a.push(r)})),a}function ys(e){if(!e)return{day:"--",month:"---",full:"--/--/----"};const[t,a,r]=e.split("-"),s=new Date(t,a-1,r),o=String(s.getDate()).padStart(2,"0"),n=s.toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return{day:o,month:n,full:s.toLocaleDateString("pt-BR")}}function ie(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function qt(e,t){if(t==="paid")return!1;const a=new Date;a.setHours(0,0,0,0);const[r,s,o]=e.split("-");return new Date(r,s-1,o)<a}function Zl(e,t,a){if(!e)return;if(!t||t.length===0){e.innerHTML='<p class="text-center text-gray-400 text-sm py-4">Nenhum item criado.</p>';return}const r=(s,o=0)=>`
            <div class="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg border border-gray-100 mb-1 hover:bg-gray-100 transition-colors" style="margin-left: ${o*16}px;">
                <span class="text-sm font-medium text-gray-700"><i class="bi ${o===0?"bi-folder2-open text-indigo-500":"bi-arrow-return-right text-gray-400"} mr-2"></i>${s.name}</span>
                <button data-action="delete-${a}" data-id="${s.id}" class="text-red-500 hover:text-white text-xs font-bold px-2.5 py-1.5 rounded-md hover:bg-red-500 transition-colors">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
            ${s.children.map(i=>r(i,o+1)).join("")}
        `;e.innerHTML=t.map(s=>r(s)).join("")}async function ya(e){const t=document.getElementById("genericModal"),a=e==="nature",r=a?"Plano de Contas (Naturezas)":"Centros de Custo",s=a?Qt:La,o=a?Vn:_n,n=a?"natures":"costCenters";t.innerHTML=`
        <div class="modal-content max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <i class="bi ${a?"bi-tags-fill text-indigo-500":"bi-diagram-3-fill text-blue-500"}"></i> ${r}
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
        </div>`,t.style.display="flex";const i=t.querySelector("#hierarchyList"),l=t.querySelector("#itemParent"),d=u=>{const p=qa(u);Zl(i,p,e);const h=l.value;l.innerHTML='<option value="">-- Nível Principal --</option>';const b=(v,x=0)=>{const w="  ".repeat(x)+(x>0?"↳ ":"");l.innerHTML+=`<option value="${v.id}">${w}${v.name}</option>`,v.children.forEach(k=>b(k,x+1))};p.forEach(v=>b(v)),l.value=h};try{const u=await s(m.establishmentId);$[n]=u,d(u)}catch(u){console.error(u)}const c=t.querySelector("#hierarchyForm");c.addEventListener("submit",async u=>{u.preventDefault();const p=t.querySelector("#itemName").value,h=l.value;try{await o({name:p,parentId:h||null,establishmentId:m.establishmentId});const b=await s(m.establishmentId);$[n]=b,d(b),c.reset(),await ke(),g("Sucesso","Item adicionado ao plano de contas.","success")}catch(b){g("Erro",b.message,"error")}})}async function Kl(){try{const t=(await ze()).matrizes||[];$.establishments=[],t.forEach(a=>{$.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(r=>$.establishments.push({id:r.id,name:r.name,type:"Filial"}))}),$.filterEstablishmentIds.size===0&&$.filterEstablishmentIds.add(m.establishmentId)}catch(e){console.warn("Erro ao buscar lojas",e)}ws(),ks(),await ke()}function ws(){const e=$.establishments.map(t=>`
        <label class="inline-flex items-center gap-2 px-3 py-2 bg-white border ${$.filterEstablishmentIds.has(t.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-gray-200 text-gray-600"} rounded-xl cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4" value="${t.id}" ${$.filterEstablishmentIds.has(t.id)?"checked":""}>
            <span class="text-xs font-bold whitespace-nowrap">${t.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${t.name}</span>
        </label>
    `).join("");Xl.innerHTML=`
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
    `,document.querySelector('.date-preset-btn[data-preset="month"]').classList.add("bg-indigo-100","text-indigo-700"),Ss()}function ks(){const e=document.getElementById("select-all-toggle");e&&e.addEventListener("change",r=>{const s=r.target.checked,o=document.querySelectorAll(".item-checkbox");$.selectedIds.clear(),o.forEach(n=>{n.checked=s,s&&$.selectedIds.add(n.dataset.id)}),Pe()}),document.getElementById("cancel-selection-btn").addEventListener("click",()=>{$.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(r=>r.checked=!1),Pe()}),document.getElementById("batch-delete-btn").addEventListener("click",async()=>{const r=$.selectedIds.size;if(r===0)return;if(await z("Excluir Lançamentos",`Deseja realmente apagar ${r} registros financeiros?`))try{const o=$.currentTab==="payables"?"payables":"receivables";await as(o,Array.from($.selectedIds)),g("Sucesso",`${r} itens excluídos.`,"success"),$.selectedIds.clear(),Pe(),ke()}catch{g("Erro","Falha ao excluir itens.","error")}}),document.querySelectorAll(".est-filter-checkbox").forEach(r=>{r.addEventListener("change",s=>{const o=s.target.closest("label");s.target.checked?($.filterEstablishmentIds.add(s.target.value),o.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),o.classList.remove("border-gray-200","text-gray-600")):($.filterEstablishmentIds.delete(s.target.value),o.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),o.classList.add("border-gray-200","text-gray-600"))})}),document.getElementById("toggle-filter-btn").addEventListener("click",()=>{const r=document.getElementById("filter-panel"),s=document.getElementById("toggle-filter-btn");$.isAdvancedFilterOpen=!$.isAdvancedFilterOpen,$.isAdvancedFilterOpen?(r.classList.remove("hidden"),s.classList.add("bg-indigo-50","text-indigo-700","border-indigo-300")):(r.classList.add("hidden"),s.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-300"))}),document.getElementById("settings-btn").addEventListener("click",sd),document.querySelectorAll('[data-action="new-financial"]').forEach(r=>{r.addEventListener("click",s=>{ra(s.target.closest("button").dataset.type)})}),document.getElementById("fab-add").addEventListener("click",()=>{const r=$.currentTab==="payables"?"payable":"receivable";ra(r)});const t=document.getElementById("tab-receivables"),a=document.getElementById("tab-payables");t.addEventListener("click",()=>bo("receivables")),a.addEventListener("click",()=>bo("payables")),document.querySelectorAll(".status-filter-btn").forEach(r=>{r.addEventListener("click",s=>{document.querySelectorAll(".status-filter-btn").forEach(o=>{o.classList.remove("bg-gray-800","text-white","shadow-sm"),o.classList.add("bg-gray-100","text-gray-600")}),s.target.classList.add("bg-gray-800","text-white","shadow-sm"),s.target.classList.remove("bg-gray-100","text-gray-600","hover:bg-gray-200","hover:bg-red-100"),$.statusFilter=s.target.dataset.status,Rt(),$s()})}),document.querySelectorAll(".date-preset-btn").forEach(r=>{r.addEventListener("click",s=>{document.querySelectorAll(".date-preset-btn").forEach(d=>d.classList.remove("bg-indigo-100","text-indigo-700")),s.target.classList.add("bg-indigo-100","text-indigo-700");const o=s.target.dataset.preset,n=new Date;let i,l;o==="month"?(i=new Date(n.getFullYear(),n.getMonth(),1),l=new Date(n.getFullYear(),n.getMonth()+1,0)):o==="last_month"?(i=new Date(n.getFullYear(),n.getMonth()-1,1),l=new Date(n.getFullYear(),n.getMonth(),0)):o==="year"&&(i=new Date(n.getFullYear(),0,1),l=new Date(n.getFullYear(),11,31)),document.getElementById("filterStartDate").value=i.toISOString().split("T")[0],document.getElementById("filterEndDate").value=l.toISOString().split("T")[0],document.getElementById("apply-filter-btn").click()})}),document.getElementById("searchInput").addEventListener("input",r=>{$.searchQuery=r.target.value.toLowerCase(),Rt()}),document.getElementById("clear-filters-btn").addEventListener("click",()=>{const r=new Date;document.getElementById("filterStartDate").value=new Date(r.getFullYear(),r.getMonth(),1).toISOString().split("T")[0],document.getElementById("filterEndDate").value=new Date(r.getFullYear(),r.getMonth()+1,0).toISOString().split("T")[0],document.getElementById("filterNaturezaId").value="all",document.getElementById("filterCostCenterId").value="all",$.filterEstablishmentIds.clear(),$.filterEstablishmentIds.add(m.establishmentId),ws(),ks()}),document.getElementById("apply-filter-btn").addEventListener("click",()=>{$.startDate=document.getElementById("filterStartDate").value,$.endDate=document.getElementById("filterEndDate").value,$.filterNaturezaId=document.getElementById("filterNaturezaId").value,$.filterCostCenterId=document.getElementById("filterCostCenterId").value,$.filterEstablishmentIds.size===0&&$.filterEstablishmentIds.add(m.establishmentId),document.getElementById("toggle-filter-btn").click(),ke()}),kt&&document.body.removeEventListener("click",kt),kt=r=>{const s=r.target;if(s.classList.contains("item-checkbox")||s.classList.contains("modal-item-checkbox")){const i=s.value||s.dataset.id;s.checked?$.selectedIds.add(i):$.selectedIds.delete(i),Pe(),r.stopPropagation();return}const o=s.closest("button[data-action]");if(o){const{action:i,type:l,id:d}=o.dataset;if(r.stopPropagation(),i==="delete"){const c=o.closest(".financial-row").dataset.item.replace(/&apos;/g,"'");td(l,JSON.parse(c));return}if(i==="mark-as-paid"){ed(l,d);return}if(i==="manage-natures"){ya("nature");return}if(i==="manage-cost-centers"){ya("cost-center");return}}const n=s.closest(".financial-row");if(n&&document.getElementById("list-container").contains(n)&&!s.closest("button")&&!s.closest(".item-checkbox")){const{type:i}=n.dataset,l=JSON.parse(n.dataset.item.replace(/&apos;/g,"'"));ra(i,l)}},document.body.addEventListener("click",kt),St&&document.getElementById("genericModal").removeEventListener("click",St),St=r=>{if(r.target.closest('[data-action="close-modal"]')){document.getElementById("genericModal").style.display="none";return}const o=r.target.closest('button[data-action^="delete-"]');if(o){const n=o.dataset.action.split("-")[1];od(n,o.dataset.id)}},document.getElementById("genericModal").addEventListener("click",St)}function Pe(){const e=document.getElementById("batch-action-bar"),t=document.getElementById("selected-count"),a=document.getElementById("fab-add"),r=$.selectedIds.size;t.textContent=r,r>0?(e.classList.remove("hidden"),e.classList.add("flex"),a&&a.classList.add("hidden")):(e.classList.add("hidden"),e.classList.remove("flex"),a&&a.classList.remove("hidden"))}function bo(e){$.currentTab=e,$.selectedIds.clear(),Pe(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1);const t=document.getElementById("tab-receivables"),a=document.getElementById("tab-payables"),r=document.getElementById("fab-add");e==="receivables"?(t.classList.add("bg-white","text-emerald-700","shadow-sm"),t.classList.remove("text-gray-500"),a.classList.remove("bg-white","text-red-700","shadow-sm"),a.classList.add("text-gray-500"),r&&(r.className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-all z-40")):(a.classList.add("bg-white","text-red-700","shadow-sm"),a.classList.remove("text-gray-500"),t.classList.remove("bg-white","text-emerald-700","shadow-sm"),t.classList.add("text-gray-500"),r&&(r.className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-all z-40")),Rt()}async function ke(){const e=document.getElementById("list-container");e.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-sm">A processar transações...</p></div>';try{if($.natures.length===0){const[o,n]=await Promise.all([Qt(m.establishmentId),La(m.establishmentId)]);$.natures=o,$.costCenters=n,Ss()}const t=Array.from($.filterEstablishmentIds).join(","),a={startDate:$.startDate,endDate:$.endDate,establishmentId:t};$.filterNaturezaId!=="all"&&(a.natureId=$.filterNaturezaId),$.filterCostCenterId!=="all"&&(a.costCenterId=$.filterCostCenterId);const[r,s]=await Promise.all([ss(a),rs(a)]);$.payables=r.entries||[],$.receivables=s.entries||[],$s(),Rt()}catch(t){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-4xl text-red-400 mb-3"></i>
                <p class="text-gray-600 font-medium">Erro ao carregar dados: ${t.message}</p>
            </div>`}}function Ss(){const e=r=>{let s='<option value="all">-- Todas as opções --</option>';const o=qa(r),n=(i,l=0)=>{const d="  ".repeat(l)+(l>0?"↳ ":"");s+=`<option value="${i.id}">${d}${i.name}</option>`,i.children.forEach(c=>n(c,l+1))};return o.forEach(i=>n(i)),s},t=document.getElementById("filterNaturezaId"),a=document.getElementById("filterCostCenterId");t&&(t.innerHTML=e($.natures)),a&&(a.innerHTML=e($.costCenters))}function $s(){const e=document.getElementById("summary-section");if(!e)return;const t=$.currentTab==="receivables";let r=t?$.receivables:$.payables;$.searchQuery&&(r=r.filter(c=>c.description&&c.description.toLowerCase().includes($.searchQuery)||c.entity&&c.entity.toLowerCase().includes($.searchQuery)||c.notes&&c.notes.toLowerCase().includes($.searchQuery)));const s=r.reduce((c,u)=>c+u.amount,0),o=r.filter(c=>c.status==="paid").reduce((c,u)=>c+u.amount,0),n=r.filter(c=>c.status==="pending"&&!qt(c.dueDate,c.status)).reduce((c,u)=>c+u.amount,0),i=r.filter(c=>qt(c.dueDate,c.status)).reduce((c,u)=>c+u.amount,0),l=t?"emerald":"red",d=t?"Receitas":"Despesas";e.innerHTML=`
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-center relative overflow-hidden">
            <div class="absolute right-0 top-0 h-full w-1 bg-gray-800"></div>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Total do Período</p>
            <p class="text-2xl font-black text-gray-900">${ie(s)}</p>
        </div>
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-center relative overflow-hidden">
            <div class="absolute right-0 top-0 h-full w-1 bg-blue-500"></div>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">A Vencer / Prov.</p>
            <p class="text-xl font-bold text-blue-600">${ie(n)}</p>
        </div>
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-center relative overflow-hidden">
            <div class="absolute right-0 top-0 h-full w-1 bg-${l}-500"></div>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">${d} Baixadas</p>
            <p class="text-xl font-bold text-${l}-600">${ie(o)}</p>
        </div>
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-center relative overflow-hidden">
            <div class="absolute right-0 top-0 h-full w-1 bg-red-600"></div>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Atrasadas</p>
            <p class="text-xl font-bold ${i>0?"text-red-600":"text-gray-400"}">${ie(i)}</p>
        </div>
    `}function Rt(){const e=document.getElementById("list-container");if(!e)return;const t=$.currentTab==="receivables",a=t?$.receivables:$.payables;let r=a;if($.statusFilter!=="all"&&(r=a.filter(l=>{const d=qt(l.dueDate,l.status);return $.statusFilter==="overdue"?d:$.statusFilter==="pending"?l.status==="pending"&&!d:l.status===$.statusFilter})),$.searchQuery&&(r=r.filter(l=>l.description&&l.description.toLowerCase().includes($.searchQuery)||l.entity&&l.entity.toLowerCase().includes($.searchQuery)||l.notes&&l.notes.toLowerCase().includes($.searchQuery))),r.sort((l,d)=>new Date(l.dueDate)-new Date(d.dueDate)),r.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16 bg-white border border-dashed border-gray-300 rounded-xl mt-2">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i class="bi bi-inbox text-2xl text-gray-400"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-1">Nenhum registo encontrado</h3>
                <p class="text-sm text-gray-500">Tente limpar os filtros ou faça um novo lançamento.</p>
            </div>
        `;return}const s=new Map($.natures.map(l=>[l.id,l.name])),o=new Map($.establishments.map(l=>[l.id,l])),n=t?"receivable":"payable",i=t?"text-emerald-600":"text-red-600";e.innerHTML=r.map(l=>{const d=ys(l.dueDate),c=l.status==="paid",u=qt(l.dueDate,l.status);let p="";c?p='<span class="bg-gray-100 text-gray-600 border border-gray-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide"><i class="bi bi-check2-circle mr-1"></i>Baixado</span>':u?p='<span class="bg-red-50 text-red-600 border border-red-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide"><i class="bi bi-exclamation-circle mr-1"></i>Atrasado</span>':p='<span class="bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide"><i class="bi bi-clock-history mr-1"></i>A Vencer</span>';const h=l.naturezaId?s.get(l.naturezaId)||"Não Categorizado":"Geral",b=o.get(l.establishmentId);let v="";if(b){const C=b.type==="Matriz"?"bi-building":"bi-shop";v=`<span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200 flex items-center whitespace-nowrap w-max" title="Unidade: ${b.name}"><i class="bi ${C} mr-1 opacity-60"></i> ${b.name}</span>`}else v='<span class="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-bold border border-gray-200 flex items-center whitespace-nowrap w-max"><i class="bi bi-geo-alt mr-1 opacity-60"></i> Atual</span>';const x=JSON.stringify(l).replace(/'/g,"&apos;"),w=$.selectedIds.has(l.id),E=!!l.recurrenceId?'<i class="bi bi-arrow-repeat text-indigo-400 ml-1.5 text-xs" title="Lançamento Recorrente"></i>':"",P=l.entity?`<span class="text-xs text-gray-500 font-medium truncate block"><i class="bi bi-person mr-1 opacity-50"></i>${l.entity}</span>`:"";return`
        <div class="financial-row md:grid md:grid-cols-12 md:gap-4 md:items-center bg-white p-4 md:p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer relative group flex flex-col gap-3 ${w?"bg-indigo-50/30":""}"
             data-type="${n}"
             data-item='${x}'>
            
            <div class="absolute left-0 top-0 bottom-0 w-1 ${c?"bg-gray-300":t?"bg-emerald-500":"bg-red-500"}"></div>

            <div class="absolute right-4 top-4 md:relative md:right-auto md:top-auto md:col-span-1 md:flex md:justify-center z-10">
                <input type="checkbox" value="${l.id}" class="item-checkbox w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${w?"checked":""}>
            </div>

            <div class="flex items-center gap-3 md:col-span-2">
                <div class="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-lg w-12 h-12 flex-shrink-0 shadow-sm">
                    <span class="text-base font-black text-gray-800 leading-none">${d.day}</span>
                    <span class="text-[9px] font-bold text-gray-500 uppercase leading-none mt-1">${d.month}</span>
                </div>
                <div class="md:hidden flex-1 pr-8">
                    <p class="font-bold text-sm text-gray-900 leading-tight ${c?"line-through text-gray-400":""}">${l.description}</p>
                    ${P}
                </div>
            </div>

            <div class="md:col-span-4 hidden md:flex flex-col justify-center">
                <p class="font-bold text-sm text-gray-900 truncate ${c?"line-through text-gray-400":""}" title="${l.description}">${l.description}</p>
                ${P}
                <div class="flex items-center gap-2 mt-1">
                    ${v}
                    <p class="text-[10px] text-gray-500 flex items-center font-medium">
                        <i class="bi bi-tag mr-1 opacity-50"></i> ${h} ${E}
                    </p>
                </div>
            </div>

            <div class="md:hidden flex flex-wrap items-center gap-2 mt-1">
                ${v}
                <span class="text-[10px] px-2 py-1 rounded bg-gray-100 text-gray-600 font-bold border border-gray-200 flex items-center">
                    <i class="bi bi-tag mr-1.5 opacity-50"></i> ${h} ${E}
                </span>
            </div>

            <div class="md:col-span-2 md:text-center flex justify-start md:justify-center">
                ${p}
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:justify-end border-t border-gray-100 md:border-t-0 pt-3 md:pt-0 mt-1 md:mt-0">
                <span class="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wide">Valor:</span>
                <p class="font-black text-base ${c?"text-gray-400":i}">${ie(l.amount)}</p>
            </div>

            <div class="absolute right-4 bottom-4 md:relative md:right-auto md:bottom-auto md:col-span-1 md:flex md:justify-center z-10 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-white/90 md:bg-transparent rounded-lg p-1 md:p-0">
                ${c?"":`
                    <button data-action="mark-as-paid" data-type="${n}" data-id="${l.id}" class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 border border-transparent hover:border-green-200 transition-all shadow-sm" title="Dar Baixa">
                        <i class="bi bi-check2-all text-lg"></i>
                    </button>
                `}
                <button data-action="delete" data-type="${n}" data-id="${l.id}" class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all shadow-sm" title="Excluir">
                    <i class="bi bi-trash3 text-sm"></i>
                </button>
            </div>
        </div>
        `}).join("")}async function ed(e,t){const a=new Date().toISOString().split("T")[0];try{await(e==="payable"?Qn(t,a):ei(t,a)),g("Baixa Realizada","O lançamento foi registado como pago.","success"),await ke()}catch(r){g("Erro",r.message,"error")}}async function td(e,t){if(!!!t.recurrenceId){await z("Excluir Lançamento","Tem certeza? Essa ação apagará o registo do seu fluxo de caixa.")&&await Es(e,[t.id]);return}ad(e,t)}function ad(e,t){const a=document.getElementById("genericModal"),s=(e==="payable"?$.payables:$.receivables).filter(d=>d.recurrenceId===t.recurrenceId).sort((d,c)=>new Date(d.dueDate)-new Date(c.dueDate));a.innerHTML=`
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
                ${s.map(d=>{const c=d.id===t.id,u=d.status==="paid",p=ys(d.dueDate);return`
                    <label class="flex items-center gap-4 p-3 bg-white rounded-xl border ${c?"border-red-400 ring-1 ring-red-100 shadow-sm bg-red-50/30":"border-gray-200 hover:bg-gray-50"} cursor-pointer transition-all">
                        <input type="checkbox" class="modal-item-checkbox w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" value="${d.id}" ${c?"checked":""}>
                        
                        <div class="flex-shrink-0 w-11 h-11 bg-white rounded-lg flex flex-col items-center justify-center border border-gray-200 shadow-sm">
                            <span class="text-sm font-black text-gray-800 leading-none">${p.day}</span>
                            <span class="text-[8px] font-bold text-gray-500 uppercase leading-none mt-1">${p.month}</span>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-bold text-gray-800 truncate">${d.description}</p>
                            <p class="text-xs font-medium text-gray-500 mt-0.5">${ie(d.amount)} ${u?'<span class="text-emerald-600 font-bold ml-1">(Baixado)</span>':""}</p>
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
    `,a.style.display="flex";const o=a.querySelector("#modal-select-all"),n=a.querySelectorAll(".modal-item-checkbox"),i=a.querySelector("#confirm-batch-delete");o.addEventListener("change",d=>{n.forEach(c=>c.checked=d.target.checked),l()}),n.forEach(d=>d.addEventListener("change",l));function l(){const d=Array.from(n).filter(c=>c.checked).length;i.innerHTML=d>0?`<i class="bi bi-trash3"></i> Excluir ${d} Parcela(s)`:"Selecione para excluir",i.disabled=d===0,d===0?i.classList.add("opacity-50","cursor-not-allowed","bg-gray-400"):i.classList.remove("opacity-50","cursor-not-allowed","bg-gray-400")}i.addEventListener("click",async()=>{const d=Array.from(n).filter(u=>u.checked).map(u=>u.value);if(d.length===0)return;a.style.display="none",await z("Confirmar Ação",`Tem certeza que deseja apagar estas ${d.length} parcelas permanentemente?`)&&await Es(e,d)}),l()}async function Es(e,t){try{t.length===1?e==="payable"?await Yn(t[0]):await Kn(t[0]):await as(e==="payable"?"payables":"receivables",t),g("Sucesso",`${t.length} registo(s) limpo(s) do sistema.`,"success"),$.selectedIds.clear(),Pe(),await ke()}catch(a){g("Erro",a.message,"error")}}async function od(e,t){const r=e==="nature"?Un:Wn;if(await z("Apagar Categoria","Tem certeza? Apagar um item pai também apagará as suas subcategorias."))try{await r(t),ya(e==="nature"?"nature":"cost-center")}catch(o){g("Erro",o.message,"error")}}function sd(){const e=document.getElementById("genericModal");e.innerHTML=`
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
    `,e.style.display="flex"}function ra(e,t=null){const a=document.getElementById("genericModal"),r=e==="payable",s=r?"red":"emerald",o=t?"Editar Lançamento":"Novo Lançamento",n=$.establishments.map(C=>{const A=t?t.establishmentId===C.id:C.id===m.establishmentId;return`<option value="${C.id}" ${A?"selected":""}>${C.type==="Matriz"?"🏢":"📍"} ${C.name}</option>`}).join(""),i=(C,A)=>{let j='<option value="">-- Selecione --</option>';const T=qa(C),M=(q,H=0)=>{const O="  ".repeat(H)+(H>0?"↳ ":""),R=q.id===A?"selected":"";j+=`<option value="${q.id}" ${R}>${O}${q.name}</option>`,q.children.forEach(U=>M(U,H+1))};return T.forEach(q=>M(q)),j},d=[{value:"dinheiro",label:"Dinheiro"},{value:"pix",label:"PIX"},{value:"cartao_credito",label:"Cartão de Crédito"},{value:"cartao_debito",label:"Cartão de Débito"},{value:"transferencia",label:"Transferência Bancária"},{value:"boleto",label:"Boleto"},{value:"outros",label:"Outros"}].map(C=>`<option value="${C.value}" ${t?.paymentMethod===C.value?"selected":""}>${C.label}</option>`).join("");a.innerHTML=`
        <div class="modal-content max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden m-4 flex flex-col max-h-[90vh]">
            
            <div class="bg-${s}-600 px-6 py-5 flex justify-between items-center flex-shrink-0 relative overflow-hidden">
                <div class="absolute right-0 top-0 opacity-10 pointer-events-none">
                    <svg width="120" height="120" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="white" stroke-width="20"/></svg>
                </div>
                
                <div class="flex items-center gap-4 relative z-10">
                    <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-sm border border-white/30 shadow-inner">
                        <i class="bi ${r?"bi-arrow-down-right":"bi-arrow-up-right"} text-2xl"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-black text-white tracking-wide">${o}</h2>
                        <p class="text-xs text-${s}-100 font-medium uppercase tracking-widest mt-0.5">${r?"Contas a Pagar / Despesa":"Contas a Receber / Receita"}</p>
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
                                ${n}
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
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">${r?"Fornecedor / Favorecido":"Cliente / Pagador"}</label>
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
                                ${i($.natures,t?.naturezaId)}
                            </select>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Centro de Custo</label>
                            <select name="centroDeCustoId" class="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-${s}-500 outline-none text-sm font-medium text-gray-700 transition-shadow">
                                ${i($.costCenters,t?.centroDeCustoId)}
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
                                <span class="block text-sm font-black text-gray-800 group-hover:text-${s}-700 transition-colors uppercase tracking-wide">Marcar como ${r?"Pago":"Recebido"}</span>
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
        </div>`,a.style.display="flex";const c=a.querySelector("#financial-form");let u="single",p=2;const h=c.querySelector('[name="amount"]'),b=c.querySelector("#recurrence-options"),v=c.querySelector("#recurrence-summary"),x=c.querySelector("#installments-input"),w=c.querySelector("#status-toggle"),k=c.querySelector("#payment-date-wrapper"),E=c.querySelector('[name="paymentDate"]'),P=()=>{if(u==="single")return;const C=parseFloat(h.value)||0;if(p=parseInt(x.value)||2,C===0){v.innerHTML='<span class="text-xs text-indigo-400 font-medium">Digite o valor total...</span>';return}if(u==="installment"){const A=C/p;v.innerHTML=`
                <div>
                    <span class="block text-[10px] text-indigo-400 uppercase tracking-widest font-bold mb-1">Simulação do Parcelamento</span>
                    <span class="font-black text-lg text-indigo-700 block leading-tight">${p}x de ${ie(A)}</span>
                    <span class="text-xs text-indigo-500 font-medium">Total: ${ie(C)}</span>
                </div>
            `}else if(u==="repeat"){const A=C*p;v.innerHTML=`
                <div>
                    <span class="block text-[10px] text-indigo-400 uppercase tracking-widest font-bold mb-1">Geração Recorrente Fixa</span>
                    <span class="font-black text-lg text-indigo-700 block leading-tight">${p}x de ${ie(C)}</span>
                    <span class="text-xs text-indigo-500 font-medium">Lançamento Total: ${ie(A)}</span>
                </div>
            `}};t||a.querySelectorAll(".mode-btn").forEach(C=>{C.addEventListener("click",A=>{if(a.querySelectorAll(".mode-btn").forEach(j=>{j.classList.remove("bg-gray-900","text-white","shadow-sm"),j.classList.add("text-gray-500","hover:bg-gray-100")}),A.target.classList.add("bg-gray-900","text-white","shadow-sm"),A.target.classList.remove("text-gray-500","hover:bg-gray-100"),u=A.target.dataset.mode,u==="single")b.classList.add("hidden");else{b.classList.remove("hidden");const j=b.querySelector("label");j.textContent=u==="installment"?"Número de Parcelas":"Repetir por quantos meses?",P()}})}),h.addEventListener("input",P),x&&(x.addEventListener("input",P),c.querySelector("#btn-minus").addEventListener("click",()=>{let C=parseInt(x.value)||2;C>2&&(x.value=C-1,P())}),c.querySelector("#btn-plus").addEventListener("click",()=>{let C=parseInt(x.value)||2;C<60&&(x.value=C+1,P())})),w.addEventListener("change",()=>{w.checked?(k.classList.remove("hidden"),E.required=!0):(k.classList.add("hidden"),E.required=!1)}),c.addEventListener("submit",async C=>{C.preventDefault();const A=c.querySelector('button[type="submit"]'),j=A.innerHTML;A.disabled=!0,A.innerHTML='<div class="loader-small border-white"></div> A gravar...';const T=new FormData(c),M=w.checked,q=parseFloat(T.get("amount"));let H=q,O=1;!t&&u!=="single"&&(O=parseInt(T.get("installments")),u==="repeat"&&(H=q*O));const R={establishmentId:T.get("establishmentId"),description:T.get("description"),amount:H,dueDate:T.get("dueDate"),naturezaId:T.get("naturezaId")||null,centroDeCustoId:T.get("centroDeCustoId")||null,entity:T.get("entity")||null,paymentMethod:T.get("paymentMethod")||null,documentNumber:T.get("documentNumber")||null,notes:T.get("notes"),status:M?"paid":"pending",paymentDate:M?T.get("paymentDate"):null,installments:O};O>1&&!t&&(R.recurrenceId=self.crypto.randomUUID());try{t?(await(r?Gn(t.id,R):Zn(t.id,R)),g("Sucesso","Atualizado com sucesso!","success")):(await(r?Jn(R):Xn(R)),g("Sucesso","Lançamento criado!","success")),document.getElementById("genericModal").style.display="none",ke()}catch(U){g("Erro",U.message||"Erro ao salvar","error"),A.disabled=!1,A.innerHTML=j}})}const rd=e=>I("/api/commissions/calculate",{method:"POST",body:JSON.stringify(e)}),nd=e=>I("/api/commissions/save",{method:"POST",body:JSON.stringify(e)}),id=(e,t)=>{const a=new URLSearchParams({startDate:e,endDate:t}).toString();return I(`/api/commissions/stats?${a}`)},ld=(e={})=>{Object.keys(e).forEach(r=>(e[r]===void 0||e[r]===null||e[r]==="")&&delete e[r]);const t=new URLSearchParams(e).toString(),a=`/api/commissions/history${t?"?"+t:""}`;return I(a)},dd=e=>I(`/api/commissions/report/${e}`,{method:"DELETE"}),Nt=new Date,fo=new Date(Nt.getFullYear(),Nt.getMonth(),1),N={currentTab:"dashboard",professionals:[],calculationResult:null,historyData:[],periodString:"",dashStartDate:fo.toISOString().split("T")[0],dashEndDate:Nt.toISOString().split("T")[0],dashStats:{revenue:0,commissions:0},histStartDate:fo.toISOString().split("T")[0],histEndDate:Nt.toISOString().split("T")[0],histProfessionalId:"all"};let $t=null;const Qe=document.getElementById("content");async function cd(){try{N.professionals=await se(m.establishmentId)}catch(e){console.error("Erro profissionais",e)}wd(),ud(),Kt(),Ft("dashboard")}function ud(){$t&&Qe.removeEventListener("click",$t),$t=e=>{const t=e.target.closest("button");if(!t)return;const a=t.dataset.action,r=t.dataset.id,s=t.dataset.idx;switch(a){case"tab-nav":Ft(t.dataset.tab);break;case"toggle-all-profs":md();break;case"back-to-filters":N.calculationResult=null,jt(document.getElementById("commissions-content"));break;case"view-preview-items":yd(s);break;case"save-final-report":gd();break;case"start-new-calc":Ft("calculator");break;case"print-receipt":bd(r);break;case"delete-report":fd(r);break;case"filter-dashboard":Kt();break;case"filter-history":Ra();break}},Qe.addEventListener("click",$t),Qe.oninput=e=>{if(e.target.classList.contains("input-debit")||e.target.classList.contains("input-credit")){const t=e.target.dataset.idx;hd(t)}},Qe.onsubmit=e=>{e.target.id==="calc-form"&&(e.preventDefault(),pd())}}async function Kt(){const e=document.getElementById("dash-start"),t=document.getElementById("dash-end");e&&(N.dashStartDate=e.value),t&&(N.dashEndDate=t.value);const a=document.getElementById("dashboard-stats-container");a&&(a.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>');try{const r=await id(N.dashStartDate,N.dashEndDate);N.dashStats={revenue:r.totalRevenue||0,commissions:r.totalCommissionsPaid||0},N.currentTab==="dashboard"&&Is(document.getElementById("commissions-content"))}catch(r){console.error(r),a&&(a.innerHTML='<p class="text-red-500 text-center">Erro ao carregar dados.</p>')}}async function Ra(){const e=document.getElementById("hist-start"),t=document.getElementById("hist-end"),a=document.getElementById("hist-prof");e&&(N.histStartDate=e.value),t&&(N.histEndDate=t.value),a&&(N.histProfessionalId=a.value);const r=document.getElementById("history-list-container");if(r){r.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>';try{const s=await ld({startDate:N.histStartDate,endDate:N.histEndDate,professionalId:N.histProfessionalId});N.historyData=s,Cs(r,s)}catch{r.innerHTML='<p class="text-red-500 text-center py-4">Erro ao buscar registros.</p>'}}}function md(){const e=document.querySelectorAll(".prof-checkbox"),t=Array.from(e).every(a=>a.checked);e.forEach(a=>a.checked=!t)}async function pd(){const e=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(o=>o.value);if(e.length===0)return g("Atenção","Selecione profissionais","error");const t={professionalIds:e,startDate:document.getElementById("start-date").value,endDate:document.getElementById("end-date").value,calculationTypes:{services:document.getElementById("type-services").checked,products:document.getElementById("type-products").checked,packages:document.getElementById("type-packages").checked}},a=new Date(t.startDate+"T00:00:00").toLocaleDateString("pt-BR"),r=new Date(t.endDate+"T00:00:00").toLocaleDateString("pt-BR");N.periodString=`${a} a ${r}`;const s=document.getElementById("commissions-content");s.innerHTML='<div class="flex flex-col items-center justify-center py-20"><div class="loader mb-4"></div><p class="text-gray-500 animate-pulse">Calculando...</p></div>';try{const o=await rd(t);N.calculationResult=o.map(n=>({...n,extraDebit:0,extraCredit:0,finalValue:n.summary.totalCommission,notes:""})),jt(s)}catch(o){g("Erro",o.message,"error"),N.calculationResult=null,jt(s)}}async function gd(){const e=N.calculationResult.length;if(await z("Confirmar",`Gerar ${e} relatórios? Isso marcará as vendas como pagas.`))try{const a=N.calculationResult.map(r=>{const s=r.items.map(o=>o.originalSaleId).filter(o=>o!=null);return nd({professionalId:r.professionalId,professionalName:r.professionalName,period:N.periodString,processedSalesIds:s,reportData:{...r,summary:{...r.summary,finalValue:r.finalValue,extraDebit:r.extraDebit||0,extraCredit:r.extraCredit||0,notes:r.notes||""}}})});await Promise.all(a),g("Sucesso","Pagamentos registrados!","success"),N.calculationResult=null,Kt(),Ft("history")}catch(a){g("Erro",a.message,"error")}}function bd(e){const t=N.historyData.find(a=>a.id===e);t&&vd(t)}async function fd(e){if(await z("Excluir","Deseja remover este registro? As vendas voltarão a ficar disponíveis para cálculo."))try{await dd(e),g("Sucesso","Registro removido.","success"),Ra(),Kt()}catch(a){g("Erro",a.message,"error")}}function vd(e){const{jsPDF:t}=window.jspdf;if(!t)return g("Erro","PDF lib não carregada.","error");const a=new t,r=a.internal.pageSize.getWidth()/2;a.setFontSize(18),a.setFont(void 0,"bold"),a.text("RECIBO DE PAGAMENTO DE COMISSÃO",r,20,{align:"center"}),a.setFontSize(12),a.setFont(void 0,"normal"),a.text(`Profissional: ${e.professionalName}`,15,40),a.text(`Período: ${e.period}`,15,48);const s=[["Comissão Bruta",`R$ ${e.summary.totalCommission.toFixed(2)}`]];e.summary.extraCredit>0&&s.push(["(+) Bônus",`R$ ${e.summary.extraCredit.toFixed(2)}`]),e.summary.extraDebit>0&&s.push(["(-) Descontos",`R$ ${e.summary.extraDebit.toFixed(2)}`]),a.autoTable({startY:60,head:[["Descrição","Valor"]],body:s,theme:"grid"});const o=a.lastAutoTable.finalY+10;a.setFontSize(14),a.setFont(void 0,"bold"),a.text(`Total Líquido: R$ ${(e.summary.finalValue||e.summary.totalCommission).toFixed(2)}`,190,o,{align:"right"}),a.save(`Recibo_${e.professionalName}.pdf`)}function hd(e){const t=document.querySelectorAll(`.input-debit[data-idx="${e}"]`),a=document.querySelectorAll(`.input-credit[data-idx="${e}"]`);let r=0,s=0;if(t.forEach(o=>{o.value&&(r=parseFloat(o.value))}),a.forEach(o=>{o.value&&(s=parseFloat(o.value))}),N.calculationResult&&N.calculationResult[e]){const o=N.calculationResult[e];o.extraDebit=r,o.extraCredit=s,o.finalValue=o.summary.totalCommission-r+s,t.forEach(i=>{i!==document.activeElement&&(i.value=r||"")}),a.forEach(i=>{i!==document.activeElement&&(i.value=s||"")}),document.querySelectorAll(`.final-value-display[data-idx="${e}"]`).forEach(i=>i.innerText=`R$ ${o.finalValue.toFixed(2)}`),xd()}}function xd(){const e=N.calculationResult.reduce((a,r)=>a+r.finalValue,0);document.querySelectorAll("#grand-total-display").forEach(a=>a.innerText=`R$ ${e.toFixed(2)}`)}function yd(e){const t=N.calculationResult[e];if(!t)return;const a=t.items.map(r=>`
        <div class="flex justify-between items-center p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50">
            <div class="flex-1">
                <p class="text-sm font-bold text-gray-800">${r.item}</p>
                <p class="text-xs text-gray-500">${new Date(r.date).toLocaleDateString("pt-BR")} • ${r.client}</p>
            </div>
            <div class="text-right">
                <p class="text-sm font-bold text-green-600">R$ ${r.commissionValue.toFixed(2)}</p>
                <p class="text-xs text-gray-400">${r.commissionRate}% de R$ ${r.value.toFixed(2)}</p>
            </div>
        </div>
    `).join("");ee({title:"Detalhes da Comissão",contentHTML:`<div class="bg-gray-50 p-3 rounded-lg mb-4 flex justify-between items-center"><div><p class="text-xs text-gray-500">Profissional</p><p class="font-bold text-gray-800">${t.professionalName}</p></div><div class="text-right"><p class="text-xs text-gray-500">Total Itens</p><p class="font-bold text-gray-800">${t.items.length}</p></div></div><div class="border rounded-lg overflow-hidden max-h-[60vh] overflow-y-auto">${a}</div>`,maxWidth:"max-w-md"})}function jt(e){if(N.calculationResult){const t=N.calculationResult,a=t.reduce((o,n)=>o+n.finalValue,0),r=t.map((o,n)=>`
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
                <div class="flex justify-between items-start mb-3 border-b border-gray-100 pb-2">
                    <div><h4 class="font-bold text-gray-900 text-lg">${o.professionalName}</h4><p class="text-xs text-gray-500">${o.summary.totalItems} itens</p></div>
                    <div class="text-right"><p class="text-xs text-gray-500">Bruto</p><p class="font-bold text-gray-700">R$ ${o.summary.totalCommission.toFixed(2)}</p></div>
                </div>
                <div class="grid grid-cols-2 gap-3 mb-3">
                    <div><label class="text-xs font-bold text-red-500 uppercase">Desc.</label><input type="number" step="0.01" data-idx="${n}" class="input-debit w-full mt-1 p-2 border border-red-200 rounded-lg bg-red-50 font-bold text-red-700" value="${o.extraDebit||""}"></div>
                    <div><label class="text-xs font-bold text-green-500 uppercase">Bônus</label><input type="number" step="0.01" data-idx="${n}" class="input-credit w-full mt-1 p-2 border border-green-200 rounded-lg bg-green-50 font-bold text-green-700" value="${o.extraCredit||""}"></div>
                </div>
                <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg"><span class="text-sm font-medium">Líquido</span><span class="text-xl font-bold text-indigo-700 final-value-display" data-idx="${n}">R$ ${o.finalValue.toFixed(2)}</span></div>
                <button data-action="view-preview-items" data-idx="${n}" class="w-full mt-3 py-2 text-indigo-600 font-medium text-sm border border-indigo-100 rounded-lg">Ver Detalhes</button>
            </div>`).join(""),s=t.map((o,n)=>`
            <tr class="hover:bg-gray-50"><td class="px-6 py-4 font-bold text-gray-900">${o.professionalName}</td><td class="px-6 py-4 text-right">R$ ${o.summary.totalCommission.toFixed(2)}</td>
            <td class="px-6 py-4 text-right"><input type="number" step="0.01" data-idx="${n}" class="input-debit w-24 text-right border-gray-300 rounded bg-red-50 text-red-700" value="${o.extraDebit||""}"></td>
            <td class="px-6 py-4 text-right"><input type="number" step="0.01" data-idx="${n}" class="input-credit w-24 text-right border-gray-300 rounded bg-green-50 text-green-700" value="${o.extraCredit||""}"></td>
            <td class="px-6 py-4 text-right font-bold text-indigo-700 final-value-display" data-idx="${n}">R$ ${o.finalValue.toFixed(2)}</td>
            <td class="px-6 py-4 text-center"><button data-action="view-preview-items" data-idx="${n}" class="text-indigo-600 hover:underline text-sm">Ver Itens</button></td></tr>`).join("");e.innerHTML=`
            <div class="space-y-4 animate-fade-in pb-20">
                <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 sticky top-0 z-10 flex justify-between items-center">
                    <div><button data-action="back-to-filters" class="text-sm text-gray-500 hover:text-indigo-600">← Voltar</button><h2 class="text-lg md:text-2xl font-bold text-gray-800">Prévia</h2></div>
                    <div class="text-right"><p class="text-xs uppercase font-bold text-gray-500">Total a Pagar</p><p id="grand-total-display" class="text-2xl md:text-3xl font-extrabold text-green-600">R$ ${a.toFixed(2)}</p></div>
                </div>
                <div class="block md:hidden space-y-4">${r}</div>
                <div class="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-bold uppercase">Profissional</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">Bruto</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">(-) Desc.</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">(+) Bônus</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">Líquido</th><th class="px-6 py-3 text-center text-xs font-bold uppercase">Ações</th></tr></thead><tbody>${s}</tbody></table></div>
                <div class="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-200 shadow-lg md:static md:bg-transparent md:border-0 md:shadow-none z-30 flex justify-end gap-3">
                    <button data-action="back-to-filters" class="hidden md:block px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-bold">Cancelar</button>
                    <button data-action="save-final-report" class="w-full md:w-auto px-6 py-4 md:py-3 bg-green-600 text-white rounded-xl font-bold shadow-md hover:bg-green-700 transition">Finalizar Apuração</button>
                </div>
            </div>`}else{const t=new Date().toISOString().split("T")[0],a=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],r=N.professionals.map(s=>`
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
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">${r}</div>
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
            </form>`}}function wd(){Qe.innerHTML=`
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
    `}function Ft(e){N.currentTab=e,["dashboard","calculator","history"].forEach(a=>{const r=document.getElementById(`tab-${a}`);a===e?r.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold bg-white text-indigo-600 shadow-sm border border-gray-100":r.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"});const t=document.getElementById("commissions-content");e==="dashboard"&&Is(t),e==="calculator"&&jt(t),e==="history"&&kd(t)}function Is(e){const{revenue:t,commissions:a}=N.dashStats,r=t>0?(a/t*100).toFixed(1):0;e.innerHTML=`
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
                                    ${r}%
                                </span>
                            </div>
                        </div>
                        <div class="overflow-hidden h-4 mb-4 text-xs flex rounded bg-indigo-100">
                            <div style="width:${Math.min(r,100)}%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"></div>
                        </div>
                        <p class="text-sm text-gray-500">
                            De cada R$ 100,00 vendidos, <strong>R$ ${r}</strong> foram pagos em comissões neste período.
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
    `}function kd(e){const t=N.professionals.map(a=>`<option value="${a.id}" ${N.histProfessionalId===a.id?"selected":""}>${a.name}</option>`).join("");e.innerHTML=`
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
    `,N.historyData.length>0?Cs(document.getElementById("history-list-container"),N.historyData):Ra()}function Cs(e,t){if(t.length===0){e.innerHTML=`
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
    `).join(""),r=t.map(s=>`
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
                <tbody>${r}</tbody>
            </table>
        </div>
    `}const na=document.getElementById("content");let xe={allPackages:[],catalogForModal:{services:[],products:[]}},Et=null,Be=null;function Sd(e=6){let t="";for(let a=0;a<e;a++)t+=`
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
        `;return t}function $d(){const e=document.getElementById("packagesListContainer");if(e){if(xe.allPackages.length===0){e.innerHTML=`
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
            </div>`;return}e.innerHTML=xe.allPackages.map(t=>{const a=t.status==="active",r=JSON.stringify(t).replace(/'/g,"&apos;"),s=t.price||0,o=t.originalPrice||0,n=o>s?o-s:0,i=o>0?(o-s)/o*100:0,l=f(t.name),d=f(t.description||"Sem descrição");return`
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col cursor-pointer"
                 data-action="edit-package" data-package='${r}'>
                
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
                            ${n>0?`<p class="text-xs text-gray-500 line-through">De R$ ${o.toFixed(2)}</p>
                                 <span class="text-xs font-semibold text-red-600 bg-red-100 px-1.5 rounded">${i.toFixed(0)}% OFF</span>`:'<p class="text-xs text-gray-500 line-through">Valor integral</p>'}
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
        `}).join("")}}function vo(){const e=document.getElementById("genericModal");e.style.display="none",Be&&e.removeEventListener("click",Be)}async function ho(e=null){const t=document.getElementById("genericModal"),a=!!e,r=e?JSON.parse(JSON.stringify(e.items||[])):[],s=f(e?.name||""),o=f(e?.description||""),n=e?.price||"",i=e?.commissionRate||0,l=e?.validityDays||30,d=`
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
                                <input type="number" step="0.01" id="finalPrice" value="${n}" class="mt-1 w-full p-2 border rounded-md" required>
                            </div>
                            <div>
                                <label for="commissionRate" class="block text-sm font-medium text-gray-700">Comissão (%)</label>
                                <input type="number" id="commissionRate" value="${i}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: 10">
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
    `;t.innerHTML=d,t.style.display="flex";const c=t.querySelector("#package-items-list"),u=(h,b)=>{const v=b.querySelector("#originalPrice"),x=h.reduce((w,k)=>w+k.price*k.quantity,0);v&&(v.textContent=`R$ ${x.toFixed(2)}`)},p=h=>{h.length===0?c.innerHTML='<p class="text-center text-gray-500 p-4">Nenhum item adicionado.</p>':c.innerHTML=h.map((b,v)=>{const x=b.type==="service",w=x?"Serviço":"Produto",k=x?"bg-indigo-100 text-indigo-800":"bg-green-100 text-green-800";return`
                <div class="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-200">
                    <div class="flex items-center gap-3 min-w-0">
                        <input type="number" value="${b.quantity}" min="1" class="w-12 p-1 border rounded-md text-sm quantity-input flex-shrink-0" data-index="${v}">
                        <span class="text-xs font-medium px-2 py-0.5 rounded-full ${k}">${w}</span>
                        <span class="font-medium text-gray-800 truncate">${f(b.name)}</span>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="text-sm text-gray-600">R$ ${b.price.toFixed(2)}</span>
                        <button type="button" class="text-red-500 hover:text-red-700 remove-item-btn font-bold" data-index="${v}">&times;</button>
                    </div>
                </div>
            `}).join(""),u(h,t)};p(r),c.addEventListener("change",h=>{if(h.target.classList.contains("quantity-input")){const b=parseInt(h.target.dataset.index,10),v=parseInt(h.target.value,10);v>0&&r[b]&&(r[b].quantity=v,p(r))}}),c.addEventListener("click",h=>{if(h.target.classList.contains("remove-item-btn")){const b=parseInt(h.target.dataset.index,10);r.splice(b,1),p(r)}}),t.querySelector("#add-item-to-package-btn").onclick=()=>Ed(h=>{const b=r.find(v=>v.id===h.id&&v.type===h.type);b?b.quantity++:r.push({...h,quantity:1}),p(r)}),Be&&t.removeEventListener("click",Be),Be=async h=>{const b=h.target.closest("button[data-action]");if(!b)return;const v=b.dataset.action;if(h.stopPropagation(),v==="close-modal"&&vo(),v==="save-package"){const x=b,w={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:r,originalPrice:r.reduce((k,E)=>k+E.price*E.quantity,0),price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null,establishmentId:m.establishmentId};if(!w.name||!w.price){g("Erro","Nome do Pacote e Preço Final são obrigatórios.","error");return}if(w.items.length===0){g("Erro","Adicione pelo menos um item ao pacote.","error");return}x.disabled=!0,x.textContent="A salvar...";try{a?await En(w.id,w):(delete w.id,await $n(w)),g("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),vo(),await Na()}catch(k){g("Erro",`Não foi possível salvar o pacote: ${k.message}`,"error"),x.disabled=!1,x.textContent="Salvar Pacote"}}},t.addEventListener("click",Be)}function Ed(e){let t="";const a=document.createElement("div");a.id="item-selection-modal",a.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[110]";const r={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'},s=l=>{const d=t.toLowerCase(),c=xe.catalogForModal.services.filter(b=>b.name.toLowerCase().includes(d)),u=xe.catalogForModal.products.filter(b=>b.name.toLowerCase().includes(d)),p=c.map(b=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${b.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${r.service}</div>
                <span class="flex-grow text-left min-w-0 truncate">${f(b.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${b.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum serviço encontrado.</p>',h=u.map(b=>`
            <button data-action="select-item" data-item-type="product" data-item-id="${b.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${r.product}</div>
                <span class="flex-grow text-left min-w-0 truncate">${f(b.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${b.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum produto encontrado.</p>';l.innerHTML=`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto">${p}</div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-96 overflow-y-auto">${h}</div></div>
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
    `,document.body.appendChild(a);const o=a.querySelector("#item-selection-list"),n=a.querySelector("#item-search-input"),i=()=>{a.remove()};s(o),n.addEventListener("input",()=>{t=n.value,s(o)}),a.addEventListener("click",l=>{const d=l.target.closest('[data-action="select-item"]'),c=l.target.closest('[data-action="close-selection-modal"]');if(d){const{itemType:u,itemId:p}=d.dataset,b=(xe.catalogForModal[u+"s"]||[]).find(v=>v.id===p);b&&(e({...b,type:u}),i())}else(c||l.target===a)&&i()})}async function Na(){na.innerHTML=`
        <section id="packages-page" class="p-4 sm:p-6">
             <div class="sticky top-0 z-10 bg-gray-100 sm:bg-transparent pt-3 pb-4 mb-6 -mx-4 -mt-4 sm:mx-0 sm:mt-0 sm:bg-transparent sm:pt-0 sm:pb-0 sm:static">
                <div class="flex justify-between items-center px-4 sm:px-0">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                </div>
            </div>
            
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20">
                ${Sd()}
            </div>
            
            <button data-action="new-package" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>
    `,Et&&na.removeEventListener("click",Et),Et=e=>{if(e.target.closest('[data-action-stop-propagation="true"]')){e.stopPropagation();const r=e.target.closest('[data-action="delete-package"]');if(r){const s=r.dataset.id;z("Excluir Pacote","Tem a certeza que deseja excluir este pacote? Esta ação é irreversível.").then(async o=>{if(o)try{await In(s),g("Sucesso!","Pacote excluído.","success"),await Na()}catch(n){g("Erro",`Não foi possível excluir: ${n.message}`,"error")}})}return}const t=e.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!t)return;const a=t.dataset.action;if(a==="new-package")ho(null);else if(a==="edit-package"){const r=JSON.parse(t.dataset.package);ho(r)}},na.addEventListener("click",Et);try{const[e,t,a]=await Promise.all([Ca(m.establishmentId),Se(m.establishmentId),Gt(m.establishmentId)]);xe.allPackages=e,xe.catalogForModal={services:t.filter(r=>r.active),products:a},$d()}catch{document.getElementById("packagesListContainer").innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar pacotes.</p>'}}const Id=document.getElementById("content");let Cd=null;async function Ld(){const e=f(m.userName||"Usuário"),t=f(oe.currentUser?.email||"E-mail não disponível"),a=m.userName?m.userName.charAt(0):"U";Id.innerHTML=`
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
    `,await Td()}async function Td(){const e=document.getElementById("professional-agenda-block");e.innerHTML="";try{const t=m.userProfessionalId;if(t){const a=await jr(t);Cd=a,a.photo&&(document.getElementById("user-profile-avatar").src=a.photo);const r=f(a.name);e.innerHTML=`
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
            `,Dd(a.id),document.getElementById("my-blocks-filter").addEventListener("change",o=>Ht(a.id,o.target.value)),Ht(a.id,"future")}else e.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(t){console.error("Erro ao carregar seção de profissional:",t),e.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${f(t.message)}</p>
            </div>
        `}}function Dd(e){const t=document.getElementById("block-schedule-form");t.addEventListener("submit",async a=>{a.preventDefault();const r=t.querySelector("#blockDate").value,s=t.querySelector("#blockStartTime").value,o=t.querySelector("#blockEndTime").value,n=t.querySelector("#blockReason").value;if(!r||!s||!o){g("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(s>=o){g("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const i=new Date(`${r}T${s}:00`),l=new Date(`${r}T${o}:00`),d=t.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="A bloquear...";try{await _t({establishmentId:m.establishmentId,professionalId:e,reason:n||"Bloqueado (Meu Perfil)",startTime:i.toISOString(),endTime:l.toISOString()}),g("Sucesso","Agenda bloqueada com sucesso!","success"),t.reset();const c=document.getElementById("my-blocks-filter").value;Ht(e,c)}catch(c){console.error("Erro ao bloquear agenda:",c),g("Erro",`Não foi possível bloquear a agenda: ${c.message}`,"error")}finally{d.disabled=!1,d.textContent="Bloquear Agenda"}})}async function Ht(e,t="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const r=new Date;let s,o;t==="history"?(o=new Date,s=new Date,s.setFullYear(s.getFullYear()-1)):(s=new Date,o=new Date,o.setFullYear(o.getFullYear()+1));let i=(await Ut(m.establishmentId,s.toISOString(),o.toISOString(),e)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));t==="history"?i=i.filter(l=>l.endTime<r).sort((l,d)=>d.startTime-l.startTime):i=i.filter(l=>l.endTime>=r).sort((l,d)=>l.startTime-d.startTime),i.length>0?(a.innerHTML=i.map(l=>{const d=l.startTime.toLocaleDateString("pt-BR"),c=`${l.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${l.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`,u=l.endTime<new Date,p=f(l.reason||"Sem motivo");return`
                    <div class="flex items-center justify-between p-3 ${u?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${d} das ${c}</p>
                            <p class="text-sm text-gray-600">${p}</p>
                        </div>
                        <button data-block-id="${l.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(l=>{l.addEventListener("click",async d=>{const c=d.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await Sa(c),g("Sucesso","Bloqueio removido.","success"),Ht(e,t)}catch(u){console.error("Erro ao remover bloqueio:",u),g("Erro",`Não foi possível remover o bloqueio: ${u.message}`,"error")}})})):a.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${t==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(r){console.error("Erro ao carregar bloqueios:",r),a.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${f(r.message)}</p>`}}let xo=!1;async function Ot(e){if(!e)return;e.innerHTML=`
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
    `;const t=document.getElementById("hierarchy-list-container"),a=document.getElementById("est-parent");try{const s=(await ze()).matrizes||[];if(a&&(a.innerHTML='<option value="">Nenhuma (Criar como Matriz Independente)</option>'),s.length===0)t.innerHTML=`
                <div class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
                    <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="bi bi-building-add text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">A sua rede está vazia</h3>
                    <p class="text-gray-500 max-w-md mx-auto mb-6">Comece por criar a sua primeira Matriz ou Loja principal para expandir o seu negócio.</p>
                </div>
            `;else{let o="";s.forEach(n=>{if(a&&!n.isOrphanBranch){const l=document.createElement("option");l.value=n.id,l.textContent=n.name,a.appendChild(l)}const i=n.isMatriz||!n.parentId?'<span class="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">📍 UNIDADE</span>';o+=`
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 transition-all hover:border-indigo-400 group">
                        <div class="bg-gray-50 border-b border-gray-200 p-4 md:p-5 flex justify-between items-center cursor-pointer hover:bg-gray-100/50" 
                             onclick="window.navigateTo('estabelecimento-section', { id: '${n.id}' })">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-sm group-hover:scale-105 transition-transform">
                                    ${n.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4 class="text-lg font-bold text-gray-800 flex items-center">
                                        ${n.name} ${i}
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
                `,n.branches&&n.branches.length>0?n.branches.forEach(l=>{o+=`
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
                        `}):o+=`
                        <div class="col-span-full py-4 text-center border border-dashed border-gray-100 rounded-lg bg-gray-50/30">
                            <p class="text-xs text-gray-400 italic">Nenhuma filial vinculada.</p>
                        </div>
                    `,o+=`
                            </div>
                        </div>
                    </div>
                `}),t.innerHTML=o}xo||(Pd(),xo=!0)}catch(r){console.error("Erro na renderização da rede:",r),t.innerHTML=`
            <div class="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100 text-center">
                <i class="bi bi-exclamation-triangle text-2xl mb-2 block"></i>
                <p class="font-bold text-sm">Não foi possível carregar a estrutura organizacional.</p>
            </div>
        `}}function Pd(){const e=document.getElementById("form-create-establishment");e&&e.addEventListener("submit",async t=>{t.preventDefault();const a=e.querySelector('button[type="submit"]'),r=a.innerHTML;a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...',a.disabled=!0;const s={name:document.getElementById("est-name").value.trim(),cnpj:document.getElementById("est-cnpj").value.trim(),parentId:document.getElementById("est-parent").value||null,timezone:document.getElementById("est-timezone").value};try{const o=await dr(s);alert(o.message||"Sucesso!"),e.reset();const n=document.getElementById("modal-create-establishment"),i=window.bootstrap?.Modal.getInstance(n);i&&i.hide(),await Ot(document.getElementById("content"))}catch(o){console.error("Erro ao criar estabelecimento:",o),alert("Erro: "+(o.message||"Falha ao gravar dados."))}finally{a.innerHTML=r,a.disabled=!1}})}window.loadAndRenderHierarchy=()=>Ot(document.getElementById("content"));document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("gesturestart",function(t){t.preventDefault()}),document.addEventListener("gesturechange",function(t){t.preventDefault()}),document.addEventListener("gestureend",function(t){t.preventDefault()});let e=0;document.addEventListener("touchend",function(t){const a=new Date().getTime();a-e<=300&&t.preventDefault(),e=a},!1)});const te=document.getElementById("loadingScreen"),Ge=document.getElementById("dashboardContent"),Me=document.getElementById("content"),ia=document.getElementById("notificationBell"),It=document.getElementById("notificationBadge"),Ce=document.getElementById("notificationPanel"),la=document.getElementById("notificationList"),Ye=document.getElementById("profileMenuButton"),Z=document.getElementById("profileDropdown"),yo=document.getElementById("profileName"),wo=document.getElementById("profileEmail"),ko=document.getElementById("logoutButton"),So=document.getElementById("myProfileLink"),$o=document.getElementById("hamburger-menu-btn"),Q=document.getElementById("sidebar"),ae=document.getElementById("mobile-overlay"),Bd={"agenda-section":Go,"comandas-section":zn,"relatorios-section":oi,"servicos-section":Ei,"produtos-section":Ni,"suppliers-section":ji,"profissionais-section":Mt,"clientes-section":bl,"estabelecimento-section":e=>xs(e),"ausencias-section":Ml,"users-section":At,"sales-report-section":Ql,"financial-section":Kl,"commissions-section":cd,"packages-section":Na,"my-profile-section":Ld,"hierarquia-section":()=>Ot(Me),"establishments-section":()=>Ot(Me)},Eo={indigo:{main:"#4f46e5",hover:"#4338ca",light:"#e0e7ff",text:"#ffffff"},blue:{main:"#2563eb",hover:"#1d4ed8",light:"#dbeafe",text:"#ffffff"},sky:{main:"#0284c7",hover:"#0369a1",light:"#e0f2fe",text:"#ffffff"},teal:{main:"#0d9488",hover:"#0f766e",light:"#ccfbf1",text:"#ffffff"},emerald:{main:"#059669",hover:"#047857",light:"#d1fae5",text:"#ffffff"},green:{main:"#16a34a",hover:"#15803d",light:"#dcfce7",text:"#ffffff"},lime:{main:"#65a30d",hover:"#4d7c0f",light:"#ecfccb",text:"#ffffff"},amber:{main:"#d97706",hover:"#b45309",light:"#fef3c7",text:"#1f2937"},orange:{main:"#ea580c",hover:"#c2410c",light:"#ffedd5",text:"#ffffff"},red:{main:"#dc2626",hover:"#b91c1c",light:"#fee2e2",text:"#ffffff"},rose:{main:"#e11d48",hover:"#be123c",light:"#ffe4e6",text:"#ffffff"},pink:{main:"#db2777",hover:"#be185d",light:"#fce7f3",text:"#ffffff"},fuchsia:{main:"#c026d3",hover:"#a21caf",light:"#fae8ff",text:"#ffffff"},purple:{main:"#7c3aed",hover:"#6d28d9",light:"#ede9fe",text:"#ffffff"},violet:{main:"#8b5cf6",hover:"#7c3aed",light:"#ddd6fe",text:"#ffffff"},gray:{main:"#4b5563",hover:"#374151",light:"#f3f4f6",text:"#ffffff"},black:{main:"#111827",hover:"#000000",light:"#e5e7eb",text:"#ffffff"}};function Io(e){const t=Eo[e]||Eo.indigo,r=(o=>{const n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(o);return n?`${parseInt(n[1],16)}, ${parseInt(n[2],16)}, ${parseInt(n[3],16)}`:"79, 70, 229"})(t.main);document.body.style.setProperty("--theme-main",t.main);const s=document.getElementById("dynamic-theme-styles");s&&(s.innerHTML=`
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
        `)}let nt=null,it=[];function Ls(){if(!It||!la)return;const e=it.filter(t=>!t.read).length;if(e>0?(It.textContent=e,It.classList.remove("hidden")):It.classList.add("hidden"),it.length===0){la.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}la.innerHTML=it.map(t=>`
    <div class="notification-item ${t.read?"":"unread"}">
    <p class="font-semibold">${t.title}</p>
    <p class="text-sm text-gray-600">${t.message}</p>
    <p class="text-xs text-gray-400 mt-1">${t.time}</p>
    </div>
    `).join("")}function Md(e){nt&&nt();const t=zt(me,"establishments",e,"notifications"),a=To(t,Do("timestamp",">=",new Date),Vs("timestamp","desc"));nt=Us(a,r=>{r.docChanges().forEach(s=>{if(s.type==="added"){const o=s.doc.data();it.unshift({title:o.title,message:o.message,time:o.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),g(o.title,o.message,"info",!0),Ls();const n=document.querySelector(".sidebar-link.active");n&&n.dataset.target==="agenda-section"&&Go()}})},r=>{console.error("Erro no listener de notificações:",r)})}async function Ad(e){const t=document.getElementById("global-context-switcher"),a=t?.parentElement;if(!(!t||!a))try{const s=(await ze()).matrizes||[];let o="",n=0;if(s.forEach(i=>{o+=`<option value="${i.id}" class="font-bold">🏢 ${i.name}</option>`,n++,i.branches&&i.branches.length>0&&i.branches.forEach(l=>{o+=`<option value="${l.id}">&nbsp;&nbsp;&nbsp;📍 ${l.name}</option>`,n++})}),n>0){t.innerHTML=o,a.classList.remove("hidden"),a.classList.add("flex");let i=e;Array.from(t.options).some(u=>u.value===e)||(i=t.options[0].value),t.value=i;const l=t.cloneNode(!0);t.parentNode.replaceChild(l,t);const d=async(u,p,h=!1)=>{te&&!h&&(te.classList.remove("hidden","fade-out"),te.style.display="flex");try{const b=await ye(u);if(m.establishmentId=u,m.establishmentName=p,m.enabledModules=b.modules,m.currentViewContext={id:u,name:p,type:b.parentId?"BRANCH":"GROUP"},typeof Io=="function"&&Io(b.themeColor||"indigo"),Md(u),qd(m.userPermissions),!h){g("Unidade Alterada",`Agora a gerir: ${p}`,"info");const v=document.querySelector(".sidebar-link.active"),x=v?v.getAttribute("data-target"):"agenda-section";X(x)}}catch(b){console.error("Erro ao trocar de contexto:",b),h||g("Erro","Falha ao aceder aos dados desta unidade.","error")}finally{te&&!h&&(te.classList.add("fade-out"),setTimeout(()=>{te.style.display="none"},500))}},c=l.options[l.selectedIndex].text.replace(/🏢 |📍 |&nbsp;/g,"").trim();await d(i,c,!0),l.addEventListener("change",async u=>{const p=u.target.value,h=u.target.options[u.target.selectedIndex].text.replace(/🏢 |📍 |&nbsp;/g,"").trim();await d(p,h,!1)})}else a.classList.add("hidden"),a.classList.remove("flex")}catch(r){console.error("Erro ao carregar switcher de contexto:",r),a.classList.add("hidden")}}function X(e,t={}){const a=e.replace("-section","");if(e!=="my-profile-section"){const s=["hierarquia-section","establishments-section","estabelecimento-section"].includes(e),o=m.enabledModules?.[a]!==!1,n=m.userPermissions===null||m.userPermissions[e]?.view===!0;if(!s&&(!o||!n)){Me&&(Me.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>'),document.querySelectorAll(".sidebar-link").forEach(i=>i.classList.remove("active")),Q&&Q.classList.contains("absolute")&&(Q.classList.add("hidden"),ae&&ae.classList.add("hidden"));return}}const r=Bd[e];r&&Me&&(document.querySelectorAll(".sidebar-link").forEach(s=>{s.classList.toggle("active",s.getAttribute("data-target")===e)}),e==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(s=>s.classList.remove("active")),Me.innerHTML="",window.innerWidth<768&&Q&&(Q.classList.add("hidden"),ae&&ae.classList.add("hidden")),r(t))}window.navigateTo=X;async function qd(e){const t=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),r=document.getElementById("kpi-today-appointments"),s=document.getElementById("kpi-today-revenue"),o=e===null||e["agenda-section"]?.view===!0,n=e===null||e["financial-section"]?.view===!0;if(o&&t&&(t.classList.remove("hidden"),t.classList.add("inline-flex")),n&&a&&(a.classList.remove("hidden"),a.classList.add("inline-flex")),!(!o&&!n))try{const i=await Br();o&&r&&(r.textContent=i.todayAppointments.toString()),n&&s&&(s.textContent=`R$ ${i.todayRevenue.toFixed(2).replace(".",",")}`)}catch(i){console.error("Erro ao carregar KPIs do cabeçalho:",i)}}async function Rd(e){try{le.getPlatform()==="android"&&await Y.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0});let t=await Y.checkPermissions();if(t.receive==="prompt"&&(t=await Y.requestPermissions()),t.receive!=="granted")return;await Y.register(),Y.addListener("registration",async a=>{try{const r=mt(me,"users",e);await wa(r,{fcmTokens:zs(a.value),platform:"native_mobile"})}catch{}}),Y.addListener("pushNotificationReceived",a=>g(a.title,a.body,"info",!0)),Y.addListener("pushNotificationActionPerformed",()=>X("agenda-section"))}catch{}}function Nd(){const e=document.getElementById("exitConfirmationModal"),t=document.getElementById("btn-cancel-exit"),a=document.getElementById("btn-confirm-exit"),r=()=>e&&(e.style.display="block"),s=()=>e&&(e.style.display="none"),o=()=>e&&e.style.display==="block";e&&(t.addEventListener("click",()=>{s(),le.isNativePlatform()||history.pushState(null,document.title,location.href)}),a.addEventListener("click",()=>{s(),le.isNativePlatform()?_a.exitApp():history.back()}),le.isNativePlatform()?_a.addListener("backButton",()=>{if(o())s();else{const n=document.querySelectorAll('.modal[style*="display: block"]'),i=Array.from(n).filter(d=>d.id!=="exitConfirmationModal");if(i.length>0){i.forEach(d=>d.style.display="none");return}if(Q&&!Q.classList.contains("hidden")&&window.innerWidth<768){Q.classList.add("hidden"),ae&&ae.classList.add("hidden");return}const l=document.querySelector(".sidebar-link.active");l&&l.getAttribute("data-target")==="agenda-section"?r():X("agenda-section")}}):(history.pushState(null,document.title,location.href),window.addEventListener("popstate",()=>{if(o()){s(),history.pushState(null,document.title,location.href);return}const n=document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display: flex"]'),i=Array.from(n).filter(d=>d.id!=="exitConfirmationModal");if(i.length>0){i.forEach(d=>d.style.display="none"),history.pushState(null,document.title,location.href);return}const l=document.querySelector(".sidebar-link.active");l&&l.getAttribute("data-target")==="agenda-section"?r():(X("agenda-section"),history.pushState(null,document.title,location.href))})))}async function jd(){try{await qs(oe,Rs)}catch{}le.isNativePlatform()&&document.body.classList.add("is-app-native"),ar(),Nd(),$o&&$o.addEventListener("click",e=>{e.stopPropagation(),Q&&(Q.classList.remove("hidden"),Q.classList.add("absolute","inset-y-0","left-0","z-40","shadow-xl")),ae&&ae.classList.remove("hidden")}),ae&&ae.addEventListener("click",()=>{Q&&(Q.classList.add("hidden"),Q.classList.remove("absolute","inset-y-0","left-0","z-40","shadow-xl")),ae.classList.add("hidden")}),ia&&ia.addEventListener("click",e=>{e.stopPropagation(),Ce&&(Ce.classList.toggle("hidden"),Ce.classList.contains("hidden")||(it.forEach(t=>t.read=!0),Ls()))}),Ye&&Ye.addEventListener("click",e=>{e.stopPropagation(),Z&&(Z.classList.toggle("active"),Z.classList.contains("active")?Z.classList.remove("hidden"):setTimeout(()=>Z.classList.add("hidden"),200))}),So&&So.addEventListener("click",e=>{e.preventDefault(),X("my-profile-section"),Z&&(Z.classList.remove("active"),Z.classList.add("hidden"))}),document.addEventListener("click",e=>{Ce&&!Ce.contains(e.target)&&e.target!==ia&&Ce.classList.add("hidden"),Z&&!Z.contains(e.target)&&e.target!==Ye&&Z.classList.contains("active")&&(Z.classList.remove("active"),setTimeout(()=>Z.classList.add("hidden"),200))}),Ns(oe,async e=>{if(e){if(!le.isNativePlatform()&&(Cr(),"Notification"in window&&Notification.permission==="default")){const t=document.getElementById("toast-notification-request"),a=document.getElementById("btn-enable-toast");t&&setTimeout(()=>{t.style.display="block"},3500),a&&a.addEventListener("click",async()=>{await Lr()&&t&&(t.style.display="none")});const r=()=>{t&&(t.style.display="none")},s=document.getElementById("btn-deny-toast"),o=document.getElementById("btn-close-toast");s&&s.addEventListener("click",r),o&&o.addEventListener("click",r)}try{const a=(await e.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="admin"||a.role==="employee")&&a.establishmentId){const r=await ye(a.establishmentId);let s=null,o=e.displayName,n=null;const i=mt(me,"users",e.uid),l=await Co(i);if(l.exists()){const c=l.data();s=a.role==="employee"?c.permissions||{}:null,o=c.name||o,n=c.professionalId||null}m.userProfessionalId=n,le.isNativePlatform()&&Rd(e.uid);const d=o||e.email;Js(a.establishmentId,r.name,s),Ye&&(Ye.textContent=d.charAt(0).toUpperCase()),yo&&(yo.textContent=d),wo&&(wo.textContent=e.email),ko&&ko.addEventListener("click",c=>{c.preventDefault(),nt&&nt(),js(oe).then(()=>window.location.href="/login.html")}),await Ad(a.establishmentId),lr(X,s,m.enabledModules),te&&(te.classList.add("fade-out"),setTimeout(()=>{te.style.display="none"},500)),Ge&&(Ge.style.display="flex"),setTimeout(()=>{pr()},1500),X("agenda-section")}else throw new Error("Permissão ou estabelecimento não configurado.")}catch(t){console.error("Erro na inicialização:",t),te&&(te.style.display="none"),Ge&&(Ge.innerHTML=`<div class="w-full h-full flex flex-col items-center justify-center p-4 text-center"><h2>Erro de Acesso</h2><p>${t.message}</p></div>`,Ge.style.display="flex")}}else window.location.href="/login.html"})}jd();export{Mo as W};
