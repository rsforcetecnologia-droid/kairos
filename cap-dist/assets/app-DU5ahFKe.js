const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-KJpHBUsD.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/firebase-config-C2tbVz-J.js","assets/styles-CQhY7Cv2.css"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as ge,d as fe,m as Cs}from"./firebase-config-C2tbVz-J.js";import{EmailAuthProvider as Pr,reauthenticateWithCredential as Br,verifyBeforeUpdateEmail as Mr,updatePassword as Ar,updateProfile as qr,setPersistence as jr,browserLocalPersistence as Nr,onAuthStateChanged as Rr,signOut as Fr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as qe,getDoc as ls,updateDoc as Bt,setDoc as Hr,addDoc as mo,collection as fa,query as go,where as fo,getDocs as Or,deleteDoc as zr,arrayUnion as Vr,orderBy as _r,onSnapshot as Ur}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{getToken as Wr,onMessage as Jr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const m={userName:null,userProfessionalId:null,userPermissions:null,userRole:null,groupId:null,groupName:null,accessibleCompanies:[],accessibleEstablishments:[],currentViewContext:{type:null,id:null,name:null},establishmentId:null,establishmentName:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function Gr(t,e,a){m.establishmentId=t,m.establishmentName=e,m.userPermissions=a,m.currentViewContext={type:"BRANCH",id:t,name:e}}const xo=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",Fa=xo?"http://localhost:8080":"https://kairos-app-407358446276.us-central1.run.app";console.log(`🚀 API configurada para modo: ${xo?"LOCAL (Dev)":"PRODUÇÃO (Cloud)"}`);console.log("📡 URL Base:",Fa);async function Qr(){const t=ge.currentUser;return t?{"Content-Type":"application/json",Authorization:`Bearer ${await t.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function C(t,e={}){const a=await Qr();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const s=Fa.replace(/\/$/,""),r=t.startsWith("/")?t:`/${t}`,o=`${s}${r}`;console.log(`AuthenticatedFetch: ${e.method||"GET"} ${o}`);try{const i=await fetch(o,{...e,headers:{...a,...e.headers}});if(!i.ok){const l=(await i.json().catch(()=>({message:i.statusText}))).message||`Erro na API: ${i.status}`;if(l.includes("FAILED_PRECONDITION")&&l.includes("requires an index")){const d=/(https:\/\/[^\s]+)/,u=l.match(d),c=u?u[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${t}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${c}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${i.status}) em ${o}:`,l),new Error(l)}return i.json()}catch(i){throw console.error(`Falha de rede ao tentar acessar ${o}:`,i.message),i.message.includes("Failed to fetch")||i.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${Fa}. Verifique se o servidor backend está rodando.`):i}}const xa=(t,e,a,s=null)=>{let r=`/api/appointments/${t}?startDate=${e}&endDate=${a}`;return s&&(r+=`&professionalId=${s}`),C(r)},Yr=(t,e,a)=>{const s=`/api/appointments/cancelled/${t}?startDate=${e}&endDate=${a}`;return C(s)},Xr=({establishmentId:t,professionalId:e,serviceIds:a,date:s})=>{const r=`/api/availability?establishmentId=${t}&professionalId=${e}&serviceIds=${a.join(",")}&date=${s}`;return C(r)},Zr=t=>C("/api/appointments",{method:"POST",body:JSON.stringify(t)}),Kr=(t,e)=>C(`/api/appointments/${t}`,{method:"PUT",body:JSON.stringify(e)}),ei=t=>C(`/api/appointments/${t}`,{method:"DELETE"}),ti=t=>C(`/api/appointments/${t}/reopen`,{method:"POST"}),ai=(t,e)=>C(`/api/appointments/${t}/checkout`,{method:"POST",body:JSON.stringify(e)});let ne;async function si(){if(!ne)try{ne=new(window.AudioContext||window.webkitAudioContext)}catch(t){console.error("Não foi possível inicializar o áudio:",t)}}function oi(){if(!ne){console.warn("AudioContext não inicializado. O som não será tocado.");return}ne.state==="suspended"&&ne.resume();const t=ne.createOscillator(),e=ne.createGain();t.connect(e),e.connect(ne.destination),t.type="sine",t.frequency.setValueAtTime(800,ne.currentTime),e.gain.setValueAtTime(0,ne.currentTime),e.gain.linearRampToValueAtTime(.3,ne.currentTime+.01),e.gain.exponentialRampToValueAtTime(1e-4,ne.currentTime+.2),t.start(ne.currentTime),t.stop(ne.currentTime+.2)}function f(t,e,a="info",s=!1){const r=document.getElementById("toast-container");if(!r)return;s&&oi();const o=document.createElement("div"),i={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},n={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},l={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};o.className=`toast ${i[a]||i.info}`,o.innerHTML=`
        <div class="toast-icon">${n[a]||n.info}</div>
        <div class="toast-content">
            <p class="font-bold">${t}</p>
            <p class="text-sm">${e}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${l[a]||l.info}"></div>
        </div>
    `,r.appendChild(o),o.querySelector(".toast-close").addEventListener("click",()=>o.remove()),setTimeout(()=>{o.remove()},4e3)}function Y(t,e){const a=document.getElementById("genericModal");return new Promise(s=>{a.innerHTML=`
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
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",s(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",s(!1)}})}function Me({title:t,contentHTML:e,maxWidth:a="max-w-4xl",showCloseButton:s=!0}){let r=document.getElementById("genericModal");const o=r.cloneNode(!1);r.parentNode.replaceChild(o,r),r=o;const i=()=>{r.style.display="none"},n=u=>{r.querySelector("#genericModalContentBody").innerHTML=u};r.innerHTML=`
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
    `;const l=r.querySelector("[data-close-modal]");l&&(l.onclick=i);const d=r.querySelector('[data-action="close-modal"]');return d&&(d.onclick=i),r.addEventListener("click",u=>{u.target.closest(".modal-content")||i()}),r.style.display="flex",{modalElement:r,close:i,setContent:n}}function ri(){document.body.addEventListener("click",()=>{ne||si()},{once:!0}),document.addEventListener("click",t=>{const e=t.target.closest('[data-action="close-modal"]');if(e){const s=e.dataset.target;if(s){const r=document.getElementById(s);r&&(r.style.display="none")}}if(t.target.closest("[data-close-modal]")){const s=document.getElementById("genericModal");s&&(s.style.display="none")}})}const re=document.getElementById("sidebar"),Ve=document.getElementById("sidebarToggle"),kt=document.getElementById("mainContent"),ii=document.querySelectorAll(".sidebar-link"),Ha=document.getElementById("menu-search"),Ds=document.getElementById("hamburger-menu-btn"),st=document.getElementById("mobile-overlay");let Ae=!0;function He(t){if(!re||!kt)return;re.classList.toggle("collapsed",t),kt.classList.toggle("sidebar-collapsed-shift",t);const e=re.querySelector(".sidebar-search-container"),a=re.querySelectorAll(".sidebar-category");t?(e&&(e.style.display="none"),a.forEach(s=>s.style.display="none"),document.querySelectorAll(".submenu-toggle").forEach(s=>{const r=s.getAttribute("data-target-submenu"),o=document.getElementById(r),i=s.querySelector(".submenu-arrow");o&&(o.classList.add("hidden"),o.classList.remove("flex")),i&&i.classList.remove("rotate-180")})):(e&&(e.style.display="block"),a.forEach(s=>s.style.display="block"))}function ni(){!re||!st||(re.classList.add("mobile-open"),st.classList.add("visible"))}function jt(){!re||!st||(re.classList.remove("mobile-open"),st.classList.remove("visible"))}function li(){He(!re.classList.contains("collapsed"))}function di(t,e){const a=document.getElementById(t);if(!a)return;const s=a.classList.contains("hidden");s&&window.innerWidth>=1024&&re.classList.contains("collapsed")&&He(!1),s?(a.classList.remove("hidden"),a.classList.add("flex"),e&&e.classList.add("rotate-180")):(a.classList.add("hidden"),a.classList.remove("flex"),e&&e.classList.remove("rotate-180"))}function ci(){Ha&&Ha.addEventListener("input",t=>{const e=t.target.value.toLowerCase().trim(),a=document.getElementById("sidebar-nav");if(!a)return;const s=a.querySelectorAll("li"),r=a.querySelectorAll(".sidebar-category");if(e===""){s.forEach(o=>o.style.display=""),r.forEach(o=>o.style.display="block");return}r.forEach(o=>o.style.display="none"),s.forEach(o=>{if(o.classList.contains("sidebar-category"))return;const i=o.querySelector(".sidebar-link")||o.querySelector(".submenu-toggle");if(!i)return;if(i.textContent.toLowerCase().includes(e)){o.style.display="";const d=o.closest('ul[id$="-submenu"]');if(d){d.classList.remove("hidden"),d.classList.add("flex"),d.parentElement.style.display="";const u=d.parentElement.querySelector(".submenu-toggle");if(u){const c=u.querySelector(".submenu-arrow");c&&c.classList.add("rotate-180")}}}else{const d=i.getAttribute("data-target-submenu");if(d){const u=document.getElementById(d);u&&(Array.from(u.querySelectorAll(".sidebar-link")).some(b=>b.textContent.toLowerCase().includes(e))?o.style.display="":o.style.display="none")}else o.style.display="none"}})})}function ui(t,e,a){if(!re||!kt)return;kt.classList.add("main-content-shift"),window.innerWidth>=1024?(Ae=!0,He(!1)):window.innerWidth>=768?(Ae=!1,He(!0)):(kt.classList.remove("main-content-shift","sidebar-collapsed-shift"),jt()),Ve&&Ve.addEventListener("click",r=>{r.stopPropagation(),window.innerWidth>=768?(Ae=!Ae,He(!Ae),Ae?(Ve.classList.add("text-indigo-400"),Ve.classList.remove("text-gray-400")):(Ve.classList.remove("text-indigo-400"),Ve.classList.add("text-gray-400"))):li()}),re.addEventListener("mouseenter",()=>{window.innerWidth>=768&&!Ae&&re.classList.contains("collapsed")&&He(!1)}),re.addEventListener("mouseleave",()=>{if(window.innerWidth>=768&&!Ae){const r=!!document.querySelector("#sidebarToggle:hover"),o=document.activeElement===Ha;!r&&!o&&He(!0)}}),Ds&&Ds.addEventListener("click",r=>{r.stopPropagation(),ni()}),st&&st.addEventListener("click",r=>{r.stopPropagation(),jt()});let s=0;re.addEventListener("touchstart",r=>{s=r.changedTouches[0].screenX},{passive:!0}),re.addEventListener("touchend",r=>{const o=r.changedTouches[0].screenX;s-o>50&&jt()},{passive:!0}),document.querySelectorAll(".submenu-toggle").forEach(r=>{r.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();const i=r.getAttribute("data-target-submenu"),n=r.querySelector(".submenu-arrow");di(i,n)})}),ci(),ii.forEach(r=>{const o=r.getAttribute("data-target");if(!o)return;const i=o.replace("-section",""),n=a?.[i]!==!1,l=e===null||e[o]?.view===!0;if(!n||!l){r.parentElement&&r.parentElement.tagName==="LI"?r.parentElement.style.display="none":r.style.display="none";return}r.addEventListener("click",d=>{d.preventDefault(),document.querySelectorAll(".sidebar-link").forEach(u=>u.classList.remove("active")),r.classList.add("active"),o&&typeof t=="function"&&t(o),window.innerWidth<768&&jt()})})}const pi=t=>C("/api/establishments/",{method:"POST",body:JSON.stringify(t)}),ye=()=>C("/api/establishments/hierarchy",{method:"GET"}),je=t=>{const e=t||m.establishmentId;return e?C(`/api/establishments/${e}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},ds=(t,e)=>{const a=t||m.establishmentId;return a?C(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(e)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},bi=(t,e)=>{const a=t||m.establishmentId;return a?C(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:e})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},mi=(t,e)=>{const a=t||m.establishmentId;return a?C(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:e})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Ee=t=>C(`/api/professionals/${t}`),ho=t=>C(`/api/professionals/details/${t}`),gi=t=>C("/api/professionals",{method:"POST",body:JSON.stringify(t)}),Oa=(t,e)=>C(`/api/professionals/${t}`,{method:"PUT",body:JSON.stringify(e)}),vo=t=>C(`/api/professionals/${t}`,{method:"DELETE"}),fi=t=>{const e=t.map(a=>vo(a));return Promise.all(e)};class xi{constructor(e,a,s){this.steps=e,this.currentStep=0,this.onComplete=a,this.onSkip=s,this.isActive=!1,this.overlay=null,this.spotlight=null,this.popover=null,this.handleResize=this.handleResize.bind(this)}start(){this.isActive||(this.isActive=!0,this.createElements(),window.addEventListener("resize",this.handleResize),this.renderStep())}stop(e=!1){this.isActive=!1,window.removeEventListener("resize",this.handleResize),this.overlay&&this.overlay.remove(),this.spotlight&&this.spotlight.remove(),this.popover&&this.popover.remove(),e&&this.onComplete?this.onComplete():!e&&this.onSkip&&this.onSkip()}createElements(){this.overlay=document.createElement("div"),this.overlay.className="fixed inset-0 bg-black/60 z-[99990] transition-opacity duration-300",document.body.appendChild(this.overlay),this.spotlight=document.createElement("div"),this.spotlight.className="absolute rounded-xl z-[99991] transition-all duration-500 ease-in-out pointer-events-none bg-transparent",this.spotlight.style.boxShadow="0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255,255,255,0.5) inset",document.body.appendChild(this.spotlight),this.popover=document.createElement("div"),this.popover.className="absolute z-[99992] bg-white rounded-2xl shadow-2xl w-[320px] transition-all duration-500 ease-in-out opacity-0 transform scale-95 border border-gray-100 flex flex-col",document.body.appendChild(this.popover)}async renderStep(){if(this.currentStep>=this.steps.length){this.stop(!0);return}const e=this.steps[this.currentStep];this.popover.style.opacity="0",this.popover.style.transform="scale(0.95)",e.onBefore&&(await e.onBefore(),await this.sleep(600));const a=await this.waitForElement(e.targetSelector,3e3);if(a){a.scrollIntoView({behavior:"smooth",block:"center"}),await this.sleep(300);const r=a.getBoundingClientRect(),o=8;this.spotlight.style.top=`${r.top+window.scrollY-o}px`,this.spotlight.style.left=`${r.left+window.scrollX-o}px`,this.spotlight.style.width=`${r.width+o*2}px`,this.spotlight.style.height=`${r.height+o*2}px`,this.spotlight.style.display="block",this.overlay.style.display="none",this.positionPopover(r)}else this.spotlight.style.display="none",this.overlay.style.display="block",this.popover.style.top="50%",this.popover.style.left="50%",this.popover.style.transform="translate(-50%, -50%) scale(1)";const s=this.currentStep===this.steps.length-1;this.popover.innerHTML=`
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
        `,setTimeout(()=>{a&&(this.popover.style.transform="scale(1)"),this.popover.style.opacity="1"},50),document.getElementById("tour-next-btn").onclick=()=>{this.currentStep++,this.renderStep()},document.getElementById("tour-prev-btn")&&(document.getElementById("tour-prev-btn").onclick=()=>{this.currentStep--,this.renderStep()}),document.getElementById("tour-skip-btn").onclick=()=>this.stop(!1)}positionPopover(e){const a=this.popover.getBoundingClientRect(),s=20;let r=e.bottom+window.scrollY+s,o=e.left+window.scrollX;r+a.height>window.scrollY+window.innerHeight&&(r=e.top+window.scrollY-a.height-s),o+a.width>window.innerWidth&&(o=e.right+window.scrollX-a.width),o<s&&(o=s),this.popover.style.top=`${r}px`,this.popover.style.left=`${o}px`}handleResize(){this.isActive&&this.renderStep()}sleep(e){return new Promise(a=>setTimeout(a,e))}async waitForElement(e,a){if(!e)return null;const s=Date.now();for(;Date.now()-s<a;){const r=document.querySelector(e);if(r)return r;await this.sleep(100)}return null}}async function hi(){try{console.log("A verificar Onboarding interativo...");const t=await je(m.establishmentId);if(!t||t.parentId||t.onboardingCompleted)return;const e=[{title:"Bem-vindo ao Kairos!",icon:"👋",content:"Preparei um tour rápido para lhe mostrar onde deve configurar as 3 coisas mais importantes antes de receber agendamentos. Vamos a isso?",targetSelector:null},{title:"Perfil e Dados da Loja",icon:"🏢",content:"É aqui em 'Minha Empresa' que você define o nome do Salão, telefone, endereço e faz o upload da sua Logomarca.",targetSelector:'[data-target="estabelecimento-section"]',onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Cores e Personalização",icon:"🎨",content:"Nesta área você pode mudar a cor principal do sistema para ficar com a cara da sua marca. O link do seu cliente vai usar esta cor!",targetSelector:"#themeColor",onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Criação de Serviços",icon:"✂️",content:"Na aba 'Serviços' é onde a mágica acontece. Crie os serviços que os seus clientes vão poder agendar, informando o preço e a duração de cada um.",targetSelector:'[data-target="servicos-section"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Novo Serviço",icon:"➕",content:"Sempre que precisar adicionar um novo serviço ao menu, basta clicar neste botão verde.",targetSelector:'[data-action="new-service"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Gestão da Equipe",icon:"👥",content:"E para terminar: a 'Equipa'. Aqui você cadastra os profissionais, define quem faz qual serviço e ajusta a jornada de trabalho semanal de cada um.",targetSelector:'[data-target="profissionais-section"]',onBefore:async()=>{window.navigateTo("profissionais-section")}},{title:"Tudo Pronto!",icon:"🚀",content:"Você já conhece o caminho! Preencha as informações do seu negócio com calma. Quando terminar, volte à Agenda e partilhe o seu Link de Agendamento com os clientes!",targetSelector:null,onBefore:async()=>{window.navigateTo("agenda-section")}}],a=async()=>{try{await ds(m.establishmentId,{onboardingCompleted:!0}),showNotification("Tour Concluído","Você já pode configurar o seu sistema livremente!","success")}catch(r){console.error("Erro ao gravar fim do onboarding",r)}};new xi(e,a,a).start()}catch(t){console.error("Erro fatal ao iniciar onboarding:",t)}}var ot;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(ot||(ot={}));class Da extends Error{constructor(e,a,s){super(e),this.message=e,this.code=a,this.data=s}}const vi=t=>{var e,a;return t?.androidBridge?"android":!((a=(e=t?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},yi=t=>{const e=t.CapacitorCustomPlatform||null,a=t.Capacitor||{},s=a.Plugins=a.Plugins||{},r=()=>e!==null?e.name:vi(t),o=()=>r()!=="web",i=c=>{const p=d.get(c);return!!(p?.platforms.has(r())||n(c))},n=c=>{var p;return(p=a.PluginHeaders)===null||p===void 0?void 0:p.find(b=>b.name===c)},l=c=>t.console.error(c),d=new Map,u=(c,p={})=>{const b=d.get(c);if(b)return console.warn(`Capacitor plugin "${c}" already registered. Cannot register plugins twice.`),b.proxy;const g=r(),v=n(c);let y;const k=async()=>(!y&&g in p?y=typeof p[g]=="function"?y=await p[g]():y=p[g]:e!==null&&!y&&"web"in p&&(y=typeof p.web=="function"?y=await p.web():y=p.web),y),T=(E,I)=>{var D,R;if(v){const O=v?.methods.find(U=>I===U.name);if(O)return O.rtype==="promise"?U=>a.nativePromise(c,I.toString(),U):(U,Z)=>a.nativeCallback(c,I.toString(),U,Z);if(E)return(D=E[I])===null||D===void 0?void 0:D.bind(E)}else{if(E)return(R=E[I])===null||R===void 0?void 0:R.bind(E);throw new Da(`"${c}" plugin is not implemented on ${g}`,ot.Unimplemented)}},P=E=>{let I;const D=(...R)=>{const O=k().then(U=>{const Z=T(U,E);if(Z){const K=Z(...R);return I=K?.remove,K}else throw new Da(`"${c}.${E}()" is not implemented on ${g}`,ot.Unimplemented)});return E==="addListener"&&(O.remove=async()=>I()),O};return D.toString=()=>`${E.toString()}() { [capacitor code] }`,Object.defineProperty(D,"name",{value:E,writable:!1,configurable:!1}),D},S=P("addListener"),L=P("removeListener"),q=(E,I)=>{const D=S({eventName:E},I),R=async()=>{const U=await D;L({eventName:E,callbackId:U},I)},O=new Promise(U=>D.then(()=>U({remove:R})));return O.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await R()},O},N=new Proxy({},{get(E,I){switch(I){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return v?q:S;case"removeListener":return L;default:return P(I)}}});return s[c]=N,d.set(c,{name:c,proxy:N,platforms:new Set([...Object.keys(p),...v?[g]:[]])}),N};return a.convertFileSrc||(a.convertFileSrc=c=>c),a.getPlatform=r,a.handleError=l,a.isNativePlatform=o,a.isPluginAvailable=i,a.registerPlugin=u,a.Exception=Da,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},wi=t=>t.Capacitor=yi(t),Se=wi(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),ha=Se.registerPlugin;class yo{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,a){let s=!1;this.listeners[e]||(this.listeners[e]=[],s=!0),this.listeners[e].push(a);const o=this.windowListeners[e];o&&!o.registered&&this.addWindowListener(o),s&&this.sendRetainedArgumentsForEvent(e);const i=async()=>this.removeListener(e,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,a,s){const r=this.listeners[e];if(!r){if(s){let o=this.retainedEventArguments[e];o||(o=[]),o.push(a),this.retainedEventArguments[e]=o}return}r.forEach(o=>o(a))}hasListeners(e){var a;return!!(!((a=this.listeners[e])===null||a===void 0)&&a.length)}registerWindowListener(e,a){this.windowListeners[a]={registered:!1,windowEventName:e,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(e="not implemented"){return new Se.Exception(e,ot.Unimplemented)}unavailable(e="not available"){return new Se.Exception(e,ot.Unavailable)}async removeListener(e,a){const s=this.listeners[e];if(!s)return;const r=s.indexOf(a);this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const a=this.retainedEventArguments[e];a&&(delete this.retainedEventArguments[e],a.forEach(s=>{this.notifyListeners(e,s)}))}}const Ts=t=>encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ps=t=>t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class ki extends yo{async getCookies(){const e=document.cookie,a={};return e.split(";").forEach(s=>{if(s.length<=0)return;let[r,o]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=Ps(r).trim(),o=Ps(o).trim(),a[r]=o}),a}async setCookie(e){try{const a=Ts(e.key),s=Ts(e.value),r=`; expires=${(e.expires||"").replace("expires=","")}`,o=(e.path||"/").replace("path=",""),i=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${a}=${s||""}${r}; path=${o}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const a of e)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}ha("CapacitorCookies",{web:()=>new ki});const $i=async t=>new Promise((e,a)=>{const s=new FileReader;s.onload=()=>{const r=s.result;e(r.indexOf(",")>=0?r.split(",")[1]:r)},s.onerror=r=>a(r),s.readAsDataURL(t)}),Si=(t={})=>{const e=Object.keys(t);return Object.keys(t).map(r=>r.toLocaleLowerCase()).reduce((r,o,i)=>(r[o]=t[e[i]],r),{})},Ei=(t,e=!0)=>t?Object.entries(t).reduce((s,r)=>{const[o,i]=r;let n,l;return Array.isArray(i)?(l="",i.forEach(d=>{n=e?encodeURIComponent(d):d,l+=`${o}=${n}&`}),l.slice(0,-1)):(n=e?encodeURIComponent(i):i,l=`${o}=${n}`),`${s}&${l}`},"").substr(1):null,Ii=(t,e={})=>{const a=Object.assign({method:t.method||"GET",headers:t.headers},e),r=Si(t.headers)["content-type"]||"";if(typeof t.data=="string")a.body=t.data;else if(r.includes("application/x-www-form-urlencoded")){const o=new URLSearchParams;for(const[i,n]of Object.entries(t.data||{}))o.set(i,n);a.body=o.toString()}else if(r.includes("multipart/form-data")||t.data instanceof FormData){const o=new FormData;if(t.data instanceof FormData)t.data.forEach((n,l)=>{o.append(l,n)});else for(const n of Object.keys(t.data))o.append(n,t.data[n]);a.body=o;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(r.includes("application/json")||typeof t.data=="object")&&(a.body=JSON.stringify(t.data));return a};class Li extends yo{async request(e){const a=Ii(e,e.webFetchExtra),s=Ei(e.params,e.shouldEncodeUrlParams),r=s?`${e.url}?${s}`:e.url,o=await fetch(r,a),i=o.headers.get("content-type")||"";let{responseType:n="text"}=o.ok?e:{};i.includes("application/json")&&(n="json");let l,d;switch(n){case"arraybuffer":case"blob":d=await o.blob(),l=await $i(d);break;case"json":l=await o.json();break;case"document":case"text":default:l=await o.text()}const u={};return o.headers.forEach((c,p)=>{u[p]=c}),{data:l,headers:u,status:o.status,url:o.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}ha("CapacitorHttp",{web:()=>new Li});const ce=ha("PushNotifications",{}),Ci="modulepreload",Di=function(t){return"/"+t},Bs={},Ti=function(e,a,s){let r=Promise.resolve();if(a&&a.length>0){let l=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),n=i?.nonce||i?.getAttribute("nonce");r=l(a.map(d=>{if(d=Di(d),d in Bs)return;Bs[d]=!0;const u=d.endsWith(".css"),c=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${c}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":Ci,u||(p.as="script"),p.crossOrigin="",p.href=d,n&&p.setAttribute("nonce",n),document.head.appendChild(p),u)return new Promise((b,g)=>{p.addEventListener("load",b),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(i){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=i,window.dispatchEvent(n),!n.defaultPrevented)throw i}return r.then(i=>{for(const n of i||[])n.status==="rejected"&&o(n.reason);return e().catch(o)})},Ms=ha("App",{web:()=>Ti(()=>import("./web-KJpHBUsD.js"),__vite__mapDeps([0,1,2,3])).then(t=>new t.AppWeb)}),Pi="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let As=!1;async function Bi(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await ce.removeAllListeners(),await ce.addListener("registration",async a=>{ko(a.value,!0)}),await ce.addListener("pushNotificationReceived",a=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",a)}),await ce.addListener("pushNotificationActionPerformed",a=>{const s=a.notification.data;console.log("Notificação clicada (Ação):",s)});let e=await ce.checkPermissions();e.receive==="prompt"&&(e=await ce.requestPermissions()),e.receive==="granted"&&await ce.register()}catch(e){console.error("[Push Nativo] Erro:",e)}return}"Notification"in window&&Notification.permission==="granted"&&wo()}async function Mi(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await wo(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(t){return console.error("Erro ao pedir permissão Web:",t),!1}}async function wo(){if("serviceWorker"in navigator)try{const t=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await t.update();const e=await Wr(Cs,{vapidKey:Pi,serviceWorkerRegistration:t});e?(console.log("[Push Web] Token validado."),await ko(e,!1)):console.warn("[Push Web] Token veio vazio."),As||(Jr(Cs,a=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",a)}),As=!0)}catch(t){console.error("[Push Web] Falha no registo:",t)}else console.warn("Navegador sem suporte a Service Worker.")}async function ko(t,e){const a=ge.currentUser;if(!a){console.warn("Usuário não logado. Token não salvo.");return}const s=qe(fe,"users",a.uid);try{const r=await ls(s);if(r.exists()){const i=r.data().fcmTokens||[];if(i.length===1&&i[0]===t){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await Bt(s,{fcmTokens:[t],lastLoginAt:new Date().toISOString(),platform:e?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(r){if(r.code==="not-found")try{await Hr(s,{email:a.email,fcmTokens:[t],platform:e?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(o){console.error("Erro ao criar user:",o)}else console.error("Erro ao atualizar token:",r)}}const Ai=(t,e,a="all",s="all")=>{const r=new URLSearchParams({startDate:t,endDate:e});return a&&a!=="all"&&r.append("professionalId",a),s&&s!=="all"&&r.append("costCenterId",s),C(`/api/reports/indicators?${r.toString()}`)},qi=(t,e="all")=>{const a=new URLSearchParams({date:t});return e&&e!=="all"&&a.append("professionalId",e),C(`/api/reports/appointments/list?${a.toString()}`)},ji=t=>t?C(`/api/financial/cost-centers/${t}`):Promise.resolve([]),Ni=(t,e,a)=>{const s=new URLSearchParams({startDate:e,endDate:a});return C(`/api/analytics/${t}?${s.toString()}`)},ra=({establishmentId:t,startDate:e,endDate:a,cashierSessionId:s})=>{const r=new URLSearchParams({startDate:e,endDate:a});return s&&s!=="all"&&r.append("cashierSessionId",s),t&&r.append("establishmentId",t),C(`/api/reports/sales?${r.toString()}`)},Ri=(t,e,a)=>C(`/api/analytics/${t}/monthly-details?year=${e}&month=${a}`),Fi=(t,e,a,s)=>{const r=`/api/analytics/${t}/daily-details?year=${e}&month=${a}&day=${s}`;return C(r)},Hi=(t,e,a,s)=>{const r=`/api/analytics/${t}/professional-details?year=${e}&month=${a}&professionalId=${s}`;return C(r)},Oi=(t,e,a,s)=>C(`/api/reports/commissions/${t}?year=${e}&month=${a}&professionalId=${s}`),$o=()=>C("/api/reports/summary",{method:"GET"}),zi=Object.freeze(Object.defineProperty({__proto__:null,getAdvancedIndicators:Ai,getAnalytics:Ni,getCommissionReport:Oi,getCostCenters:ji,getDailyAppointments:qi,getDailyTransactions:Fi,getMonthlyAnalytics:Ri,getProfessionalMonthlyDetails:Hi,getSalesReport:ra,getSummaryKPIs:$o},Symbol.toStringTag,{value:"Module"})),cs=t=>t?String(t).replace(/\D/g,""):"",ut=(t,e="",a=20,s={})=>{const r=new URLSearchParams;return e&&r.append("search",e),a&&r.append("limit",a),s&&s.hasLoyalty&&r.append("hasLoyalty","true"),s&&s.birthMonth&&r.append("birthMonth",s.birthMonth),s&&s.inactiveDays&&r.append("inactiveDays",s.inactiveDays),C(`/api/clients/${t}?${r.toString()}`)},So=(t,e)=>{const a=encodeURIComponent(e);return C(`/api/clients/details/${t}/${a}`)},Eo=t=>{const e=t.phone||t.id;if(!e)throw new Error("Telefone é obrigatório");const a=cs(e),s={...t,phone:a,id:a};return C(`/api/clients/${a}`,{method:"PUT",body:JSON.stringify(s)})},Io=Eo,Lo=(t,e)=>Eo({...e,id:t}),Co=t=>{const e=encodeURIComponent(t);return C(`/api/clients/${e}`,{method:"DELETE"})},Vi=(t,e,a,s)=>C("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:t,clientPhone:cs(e),points:a,rewardName:s})}),_i=(t,e)=>So(t,cs(e)),va=t=>C(`/api/financial/natures/${t}`),Ui=t=>C("/api/financial/natures",{method:"POST",body:JSON.stringify(t)}),us=t=>C(`/api/financial/cost-centers/${t}`),Wi=t=>C("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(t)}),Do=(t,e)=>C(`/api/financial/${t}`,{method:"POST",body:JSON.stringify(e)}),To=(t,e={})=>{let a=`/api/financial/${t}`;const s=new URLSearchParams;e.establishmentId&&s.append("establishmentId",e.establishmentId),e.startDate&&s.append("startDate",e.startDate),e.endDate&&s.append("endDate",e.endDate),e.natureId&&s.append("natureId",e.natureId),e.costCenterId&&s.append("costCenterId",e.costCenterId),e.status&&s.append("status",e.status);const r=s.toString();return r&&(a+=`?${r}`),C(a)},Po=(t,e,a)=>C(`/api/financial/${t}/${e}`,{method:"PUT",body:JSON.stringify(a)}),Bo=(t,e)=>C(`/api/financial/${t}/${e}`,{method:"DELETE"}),Mo=(t,e)=>{const a=e.map(s=>C(`/api/financial/${t}/${s}`,{method:"DELETE"}));return Promise.all(a)},Ao=(t,e,a)=>C(`/api/financial/${t}/${e}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),qo=t=>Do("payables",t),ps=t=>To("payables",t),Ji=(t,e)=>Po("payables",t,e),Gi=t=>Bo("payables",t),Qi=(t,e)=>Ao("payables",t,e),Yi=t=>Do("receivables",t),ya=t=>To("receivables",t),Xi=(t,e)=>Po("receivables",t,e),Zi=t=>Bo("receivables",t),Ki=(t,e)=>Ao("receivables",t,e);function h(t){return t==null?"":String(t).replace(/[&<>'"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[e])}function wa(t,e=800,a=800,s=.7){return new Promise((r,o)=>{if(!t.type.match(/image.*/))return o(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.readAsDataURL(t),i.onload=n=>{const l=new Image;l.src=n.target.result,l.onload=()=>{let d=l.width,u=l.height;d>u?d>e&&(u*=e/d,d=e):u>a&&(d*=a/u,u=a);const c=document.createElement("canvas");c.width=d,c.height=u,c.getContext("2d").drawImage(l,0,0,d,u);const b=c.toDataURL("image/jpeg",s);r(b)},l.onerror=d=>o(new Error("Erro ao carregar a imagem para processamento."))},i.onerror=n=>o(new Error("Erro ao ler o ficheiro."))})}function Ta(t){const e=parseFloat(t);return isNaN(e)?"R$ 0,00":e.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}let Pa=null;function ke(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${s}`}async function en(){const t=document.getElementById("content");t.innerHTML=`
        <div class="flex items-center justify-center h-full min-h-[60vh] font-sans">
            <div class="flex flex-col items-center">
                <div class="w-12 h-12 border-[3px] border-indigo-50 border-t-indigo-500 rounded-full animate-spin mb-4 shadow-sm"></div>
                <p class="text-slate-500 font-semibold text-sm tracking-wide animate-pulse">Sincronizando dados...</p>
            </div>
        </div>
    `;try{const e=new Date,a=new Date(e.getFullYear(),e.getMonth(),e.getDate()),s=new Date(a);s.setHours(23,59,59,999);const r=new Date(a.getFullYear(),a.getMonth(),1),o=new Date(a.getFullYear(),a.getMonth()+1,0),i=new Date(a);i.setDate(a.getDate()-6);const n=m.selectedEstablishments&&m.selectedEstablishments.length>0?m.selectedEstablishments:[m.establishmentId],l=n.join(","),d=n.map(async F=>{const[ee,Ie]=await Promise.all([xa(F,r.toISOString(),s.toISOString(),null).catch(()=>[]),ut(F).catch(()=>[])]);return{appts:ee,clients:Ie}}),u=Promise.all([ya({startDate:ke(r),endDate:ke(o),establishmentId:l}).catch(()=>({entries:[]})),ps({startDate:ke(r),endDate:ke(o),establishmentId:l}).catch(()=>({entries:[]}))]),[c,[p,b]]=await Promise.all([Promise.all(d),u]);let g=[],v=[];c.forEach(F=>{g=g.concat(F.appts),v=v.concat(F.clients)});const y=p.entries||[],k=b.entries||[],T=ke(a),P=y.filter(F=>F.status==="paid").reduce((F,ee)=>F+ee.amount,0),S=k.filter(F=>F.status==="paid").reduce((F,ee)=>F+ee.amount,0),L=P-S,q=y.filter(F=>F.status==="paid"&&(F.paymentDate===T||!F.paymentDate&&F.dueDate.startsWith(T))).reduce((F,ee)=>F+ee.amount,0),N=g.filter(F=>{const ee=new Date(F.startTime);return ee>=a&&ee<=s}),E=N.length,I=g.filter(F=>F.status==="completed"),D=I.length>0?P/I.length:0,R=N.filter(F=>new Date(F.startTime).getTime()>=e.getTime()&&F.status!=="completed"&&F.status!=="cancelled").sort((F,ee)=>new Date(F.startTime)-new Date(ee.startTime)).slice(0,4).map(F=>({client:F.clientName||"Desconhecido",service:F.serviceName||(F.services&&F.services[0]?F.services[0].name:"Serviço"),time:new Date(F.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),prof:(F.professionalName||"").split(" ")[0]||"Profissionais",id:F.id})),O=`${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}`,U=new Map;v.forEach(F=>{F.phone?U.set(F.phone,F):U.set(F.id||Math.random().toString(),F)});const K=Array.from(U.values()).filter(F=>{if(!F.birthDate)return!1;let ee,Ie;if(F.birthDate.includes("-")){const W=F.birthDate.split("-");W[0].length===4?(ee=W[1],Ie=W[2]):(Ie=W[0],ee=W[1])}else if(F.birthDate.includes("/")){const W=F.birthDate.split("/");Ie=W[0],ee=W[1]}return`${Ie}/${ee}`===O}).map(F=>{let ee="";return F.birthDate&&F.birthDate.includes("-")&&F.birthDate.split("-")[0].length===4&&(ee=a.getFullYear()-parseInt(F.birthDate.split("-")[0])),{name:F.name,age:ee,phone:F.phone}}),we={receitaHoje:q,agendamentosHoje:E,receitaMes:P,despesaMes:S,saldoMes:L,ticketMedio:D},be=n.length>1;tn(t,we,R,K,be,ke(i),ke(a)),await jo(i,a),sn()}catch(e){console.error("Erro ao carregar dashboard:",e),t.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full min-h-[60vh] text-slate-500 font-sans">
                <i class="bi bi-exclamation-triangle text-5xl mb-4 text-rose-400"></i>
                <h3 class="font-bold text-lg text-slate-700">Erro de Sincronização</h3>
                <p class="font-medium text-sm mt-1">Ocorreu um problema ao comunicar com o servidor.</p>
                <button onclick="window.navigateTo('dashboard-section')" class="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm active:scale-95">Tentar Novamente</button>
            </div>
        `}}function tn(t,e,a,s,r,o,i){const n=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),l=r?`
        <div class="bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex items-center gap-3 text-indigo-700 mb-5 shadow-sm">
            <div class="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0"><i class="bi bi-buildings text-indigo-600 text-xs"></i></div>
            <span class="text-xs font-semibold">Visão Consolidada: Os dados refletem a soma das filiais selecionadas.</span>
        </div>
        `:"";t.innerHTML=`
        <div class="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto pb-24 font-sans text-slate-800">
            
            ${l}

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-5 md:mb-6">
                
                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors relative overflow-hidden group">
                    <div class="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"><i class="bi bi-cash-coin text-8xl text-emerald-600"></i></div>
                    <div class="flex items-center gap-2.5 mb-2 relative z-10">
                        <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                            <i class="bi bi-arrow-down-left-circle text-base"></i>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Receita<br/>Hoje</span>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold text-slate-700 relative z-10 tracking-tight">${n.format(e.receitaHoje)}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors relative overflow-hidden group">
                    <div class="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"><i class="bi bi-wallet2 text-8xl text-blue-600"></i></div>
                    <div class="flex items-center gap-2.5 mb-2 relative z-10">
                        <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                            <i class="bi bi-graph-up-arrow text-base"></i>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Faturamento<br/>(Mês)</span>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold text-slate-700 relative z-10 tracking-tight">${n.format(e.receitaMes)}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-rose-300 transition-colors relative overflow-hidden group">
                    <div class="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"><i class="bi bi-cart-x text-8xl text-rose-600"></i></div>
                    <div class="flex items-center gap-2.5 mb-2 relative z-10">
                        <div class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                            <i class="bi bi-arrow-up-right-circle text-base"></i>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Despesas<br/>(Mês)</span>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold text-rose-600 relative z-10 tracking-tight">${n.format(e.despesaMes)}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors relative overflow-hidden group">
                    <div class="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"><i class="bi bi-piggy-bank text-8xl text-indigo-600"></i></div>
                    <div class="flex items-center gap-2.5 mb-2 relative z-10">
                        <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                            <i class="bi bi-bank text-base"></i>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saldo<br/>Líquido</span>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold ${e.saldoMes>=0?"text-indigo-600":"text-rose-600"} relative z-10 tracking-tight">${n.format(e.saldoMes)}</h3>
                </div>

            </div>

            <div class="grid grid-cols-2 gap-4 md:gap-5 mb-5 md:mb-6">
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center shadow-inner">
                    <div>
                        <span class="block text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Agendamentos Hoje</span>
                        <span class="text-xl font-bold text-slate-700">${e.agendamentosHoje}</span>
                    </div>
                    <div class="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 border border-slate-100"><i class="bi bi-calendar-check text-base"></i></div>
                </div>
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center shadow-inner">
                    <div>
                        <span class="block text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Ticket Médio Geral</span>
                        <span class="text-xl font-bold text-slate-700">${n.format(e.ticketMedio)}</span>
                    </div>
                    <div class="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 border border-slate-100"><i class="bi bi-receipt text-base"></i></div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
                
                <div class="lg:col-span-2 space-y-5 md:space-y-6">
                    
                    <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-200">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-3 border-b border-slate-100 pb-4">
                            <div>
                                <h3 class="text-sm font-semibold text-slate-700">Desempenho Geral</h3>
                                <p class="text-[10px] text-slate-400 font-medium">Receita Realizada vs Agendamentos Concluídos</p>
                            </div>
                            
                            <div class="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-200 w-full md:w-auto">
                                <input type="date" id="chart-start-date" value="${o}" class="bg-white text-[10px] md:text-xs py-1.5 px-2 border border-slate-200 rounded text-slate-600 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 shadow-sm flex-1 md:w-28 font-medium">
                                <span class="text-slate-400 text-[10px] font-semibold">até</span>
                                <input type="date" id="chart-end-date" value="${i}" class="bg-white text-[10px] md:text-xs py-1.5 px-2 border border-slate-200 rounded text-slate-600 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 shadow-sm flex-1 md:w-28 font-medium">
                                <button id="btn-update-chart" class="bg-indigo-600 text-white px-2.5 py-1.5 rounded hover:bg-indigo-700 transition-colors shadow-sm active:scale-95 flex items-center justify-center">
                                    <i class="bi bi-arrow-repeat text-xs"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="relative h-64 w-full" id="chart-container">
                            <canvas id="revenueChart"></canvas>
                        </div>
                    </div>

                    <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-200">
                        <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                            <h3 class="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                                <i class="bi bi-calendar-range text-indigo-500"></i> Próximos na Agenda
                            </h3>
                            <button data-action="goto-agenda" class="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded hover:bg-indigo-100 transition-colors uppercase tracking-widest border border-indigo-100 shadow-sm">Ver Todos</button>
                        </div>
                        
                        <div class="space-y-2">
                            ${a.length>0?a.map(d=>`
                                <div data-action="goto-agenda" class="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-colors cursor-pointer group">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-lg bg-white border border-slate-200 flex flex-col items-center justify-center flex-shrink-0 text-indigo-600 shadow-sm">
                                            <span class="font-bold text-sm leading-tight">${d.time.split(":")[0]}</span>
                                            <span class="text-[9px] font-semibold leading-tight text-slate-400">${d.time.split(":")[1]}</span>
                                        </div>
                                        <div>
                                            <p class="font-semibold text-slate-700 text-[0.8rem] group-hover:text-indigo-700 transition-colors">${h(d.client)}</p>
                                            <p class="text-[10px] font-medium text-slate-500 mt-0.5">${h(d.service)} <span class="mx-1 text-slate-300">•</span> ${h(d.prof)}</p>
                                        </div>
                                    </div>
                                    <div class="w-7 h-7 rounded-full text-slate-300 flex items-center justify-center group-hover:text-indigo-500 transition-colors">
                                        <i class="bi bi-chevron-right text-xs"></i>
                                    </div>
                                </div>
                            `).join(""):`
                                <div class="text-center py-6 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                    <div class="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-2 border border-slate-100">
                                        <i class="bi bi-calendar2-x text-lg text-slate-300"></i>
                                    </div>
                                    <p class="text-xs font-semibold text-slate-500">Agenda livre</p>
                                    <p class="text-[10px] font-medium mt-0.5">Nenhum agendamento pendente para hoje.</p>
                                </div>
                            `}
                        </div>
                    </div>

                </div>

                <div class="space-y-5 md:space-y-6">
                    
                    <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-200">
                        <h3 class="text-sm font-semibold text-slate-700 mb-3 border-b border-slate-100 pb-3">Ações Rápidas</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <button data-action="new-appointment" class="flex flex-col items-center justify-center p-3 bg-indigo-50/70 rounded-xl text-indigo-700 hover:bg-indigo-100 transition-colors border border-indigo-100/50 group active:scale-95">
                                <i class="bi bi-calendar-plus text-xl mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity"></i>
                                <span class="text-[9px] font-bold uppercase tracking-widest text-center">Agendar</span>
                            </button>
                            
                            <button data-action="goto-pdv" class="flex flex-col items-center justify-center p-3 bg-emerald-50/70 rounded-xl text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-100/50 group active:scale-95">
                                <i class="bi bi-cart-check text-xl mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity"></i>
                                <span class="text-[9px] font-bold uppercase tracking-widest text-center">PDV / Caixa</span>
                            </button>
                            
                            <button data-action="goto-clients" class="flex flex-col items-center justify-center p-3 bg-blue-50/70 rounded-xl text-blue-700 hover:bg-blue-100 transition-colors border border-blue-100/50 group active:scale-95">
                                <i class="bi bi-people text-xl mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity"></i>
                                <span class="text-[9px] font-bold uppercase tracking-widest text-center">Clientes</span>
                            </button>
                            
                            <button data-action="open-link" class="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors border border-slate-200 group active:scale-95">
                                <i class="bi bi-globe text-xl mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity"></i>
                                <span class="text-[9px] font-bold uppercase tracking-widest text-center">Meu Link</span>
                            </button>
                        </div>
                    </div>

                    <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-200">
                        <h3 class="text-sm font-semibold text-slate-700 mb-3 border-b border-slate-100 pb-3 flex items-center gap-1.5">
                            <i class="bi bi-gift text-rose-400"></i> Aniversariantes
                        </h3>
                        
                        <div class="space-y-2">
                            ${s.length>0?s.map(d=>{const c=`https://wa.me/${(d.phone||"").replace(/\D/g,"")}?text=${encodeURIComponent(`Olá ${d.name.split(" ")[0]}! A equipa deseja-lhe um Feliz Aniversário! 🎉`)}`;return`
                                <div class="flex items-center justify-between p-2.5 rounded-xl border border-rose-100 bg-rose-50/40 hover:bg-rose-50 transition-colors">
                                    <div class="flex items-center gap-2.5">
                                        <div class="w-8 h-8 rounded-lg bg-white text-rose-500 flex items-center justify-center font-bold text-xs border border-rose-100 shadow-sm">
                                            ${h(d.name).charAt(0)}
                                        </div>
                                        <div>
                                            <p class="font-semibold text-slate-700 text-[0.75rem] leading-tight">${h(d.name)}</p>
                                            ${d.age?`<p class="text-[9px] font-medium text-rose-400 mt-0.5">${d.age} anos</p>`:""}
                                        </div>
                                    </div>
                                    <a href="${c}" target="_blank" class="w-8 h-8 rounded-lg bg-white text-emerald-500 shadow-sm border border-emerald-100 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-200 transition-colors" title="Enviar Parabéns pelo WhatsApp">
                                        <i class="bi bi-whatsapp text-[0.8rem]"></i>
                                    </a>
                                </div>
                            `}).join(""):`
                                <div class="text-center py-6 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                    <i class="bi bi-balloon text-2xl mb-1.5 opacity-50"></i>
                                    <p class="text-[10px] font-bold uppercase tracking-widest">Sem festas hoje</p>
                                </div>
                            `}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `}async function jo(t,e){const a=document.getElementById("chart-container"),s=document.getElementById("chart-start-date"),r=document.getElementById("chart-end-date");if(a){const o=document.createElement("div");o.id="chart-loading-overlay",o.className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-xl",o.innerHTML='<div class="w-8 h-8 border-[3px] border-indigo-100 border-t-indigo-500 rounded-full animate-spin"></div>',a.appendChild(o)}try{const o=ke(t),i=ke(e),n=m.selectedEstablishments&&m.selectedEstablishments.length>0?m.selectedEstablishments:[m.establishmentId],l=n.join(","),d=await ya({startDate:o,endDate:i,establishmentId:l}).catch(()=>({entries:[]})),u=n.map(P=>xa(P,o+"T00:00:00.000Z",i+"T23:59:59.999Z",null).catch(()=>[])),p=(await Promise.all(u)).flat(),b=d.entries||[],g=[],v=[],y=[];let k=new Date(t);k.setHours(0,0,0,0);const T=new Date(e);for(T.setHours(23,59,59,999);k<=T;){const P=ke(k);g.push(k.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}));const S=b.filter(q=>q.status==="paid"&&(q.paymentDate===P||!q.paymentDate&&q.dueDate.startsWith(P))).reduce((q,N)=>q+N.amount,0),L=p.filter(q=>q.status==="completed"&&q.startTime&&q.startTime.startsWith(P)).length;v.push(S),y.push(L),k.setDate(k.getDate()+1)}an(g,v,y),s&&(s.value=o),r&&(r.value=i)}catch(o){console.error("Erro ao recarregar grafico:",o)}finally{const o=document.getElementById("chart-loading-overlay");o&&o.remove()}}function an(t,e,a){const s=document.getElementById("revenueChart");if(!s)return;Pa&&Pa.destroy();const o=s.getContext("2d").createLinearGradient(0,0,0,240);o.addColorStop(0,"rgba(99, 102, 241, 0.2)"),o.addColorStop(1,"rgba(99, 102, 241, 0.0)"),Pa=new Chart(s,{type:"line",data:{labels:t,datasets:[{label:"Receita Real (R$)",data:e,borderColor:"#6366f1",backgroundColor:o,borderWidth:2,pointBackgroundColor:"#ffffff",pointBorderColor:"#6366f1",pointBorderWidth:2,pointRadius:3,pointHoverRadius:5,fill:!0,tension:.3,yAxisID:"y"},{label:"Agendamentos Feitos",data:a,borderColor:"#10b981",backgroundColor:"transparent",borderWidth:2,borderDash:[5,5],pointBackgroundColor:"#10b981",pointBorderColor:"#ffffff",pointBorderWidth:1,pointRadius:3,pointHoverRadius:5,fill:!1,tension:.3,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0,position:"top",align:"end",labels:{usePointStyle:!0,boxWidth:6,boxHeight:6,font:{family:"Nunito, sans-serif",size:10,weight:"bold"},color:"#64748b"}},tooltip:{backgroundColor:"#1e293b",padding:10,cornerRadius:8,titleFont:{size:11,family:"Nunito, sans-serif",weight:"normal"},bodyFont:{size:12,weight:"bold",family:"Nunito, sans-serif"},displayColors:!0,usePointStyle:!0,callbacks:{label:function(i){return i.datasetIndex===0?"Receita: "+new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(i.parsed.y):"Concluídos: "+i.parsed.y}}}},scales:{y:{type:"linear",display:!0,position:"left",beginAtZero:!0,grid:{color:"#f8fafc",drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Nunito, sans-serif",size:9,weight:"600"},maxTicksLimit:6,callback:function(i){return"R$ "+i}}},y1:{type:"linear",display:!0,position:"right",beginAtZero:!0,grid:{drawOnChartArea:!1},border:{display:!1},ticks:{color:"#10b981",font:{family:"Nunito, sans-serif",size:9,weight:"600"},stepSize:1,callback:function(i){if(Math.floor(i)===i)return i}}},x:{grid:{display:!1,drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Nunito, sans-serif",size:9,weight:"600"}}}},interaction:{intersect:!1,mode:"index"}}})}function sn(){document.getElementById("content").addEventListener("click",e=>{if(e.target.closest("#btn-update-chart")){const o=document.getElementById("chart-start-date"),i=document.getElementById("chart-end-date");if(o&&i&&o.value&&i.value){const n=new Date(o.value+"T00:00:00"),l=new Date(i.value+"T00:00:00");jo(n,l)}return}const s=e.target.closest("[data-action]");if(!s)return;switch(s.dataset.action){case"goto-agenda":case"new-appointment":se("agenda-section");break;case"goto-pdv":se("comandas-section");break;case"goto-clients":se("clientes-section");break;case"open-link":const o=`${window.location.origin}/cliente.html?id=${m.establishmentId||""}`;window.open(o,"_blank");break}})}const pt=t=>C(`/api/services/${t}`),on=t=>C("/api/services",{method:"POST",body:JSON.stringify(t)}),rn=(t,e)=>C(`/api/services/${t}`,{method:"PUT",body:JSON.stringify(e)}),No=t=>C(`/api/services/${t}`,{method:"DELETE"}),ka=(t,e,a,s="all")=>{const r=`/api/blockages/${t}?startDate=${e}&endDate=${a}&professionalId=${s}`;return C(r)},$a=t=>C("/api/blockages",{method:"POST",body:JSON.stringify(t)}),bs=t=>C(`/api/blockages/${t}`,{method:"DELETE"}),Ro=t=>C("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:t})}),qs=document.getElementById("content");let js=!1;const ia=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5",light:"#c7d2fe"},{bg:"#d1fae5",border:"#059669",main:"#059669",light:"#a7f3d0"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48",light:"#fecdd3"},{bg:"#fef3c7",border:"#d97706",main:"#d97706",light:"#fde68a"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490",light:"#a5f3fc"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7",light:"#bae6fd"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed",light:"#ddd6fe"},{bg:"#fce7f3",border:"#db2777",main:"#db2777",light:"#fbcfe8"}];let Sa=[],za=[],na={},Fo=[],z={currentView:window.innerWidth<768?"list":"week",currentDate:new Date,selectedProfessionalId:"all",showInactiveProfs:!1,isSelectionMode:!1,selectedItems:new Set},H={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,originalDate:null,originalTime:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function Ho(t){const e=new Date(t),a=e.getDay(),s=e.getDate()-a+(a===0?-6:1);return e.setDate(s),e.setHours(0,0,0,0),e}function Zt(t){const e=t||new Date,a=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${a}-${s}-${r}`}function ms(){const t=document.getElementById("profSelectorContainer");if(!t||!m.professionals)return;let e=m.professionals.filter(r=>z.showInactiveProfs||r.status!=="inactive");const s=[...[{id:"all",name:"Todos",photo:null}],...e];t.innerHTML=s.map(r=>{const o=z.selectedProfessionalId===r.id,i=r.name==="Todos"?"T":r.name.charAt(0).toUpperCase(),n=r.id!=="all"?m.professionalColors.get(r.id)||ia[0]:{main:"#adb5bd",light:"#f1f3f5"};return`
            <div class="flex items-center gap-2 px-4 py-1.5 rounded-full whitespace-nowrap cursor-pointer transition-transform active:scale-95 border ${o?"border-transparent shadow-sm":"border-gray-200 bg-white hover:bg-gray-50"}"
                 data-action="select-professional" data-prof-id="${r.id}"
                 style="background-color: ${o?n.light:""}; border-color: ${o?n.main:""}; color: ${o?n.main:"#4b5563"};">
                <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0" 
                     style="background-color: ${n.main}; ${r.photo?`background-image: url('${Q(r.photo)}'); background-size: cover; background-position: center;`:""}">
                    ${r.photo?"":i}
                </div>
                <span class="text-sm font-semibold tracking-tight">${Q(r.name==="Todos"?"Todos":r.name.split(" ")[0])}</span>
            </div>`}).join("")}function nn(){const t=document.getElementById("calendarStripContainer");if(!t||z.currentView!=="list")return;const e=new Date;e.setHours(0,0,0,0);const a=new Date(z.currentDate);a.setHours(0,0,0,0);let s="";const r=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];for(let o=-7;o<=14;o++){const i=new Date(a);i.setDate(a.getDate()+o),i.setHours(0,0,0,0);const n=i.getTime()===a.getTime(),l=i.getTime()===e.getTime(),d=r[i.getDay()],u=i.getDate(),c=n?"bg-indigo-600 text-white shadow-md":l?"bg-indigo-50 text-indigo-700 border border-indigo-100":"bg-gray-50 text-gray-500 border border-transparent",p=n?"text-white":l?"text-indigo-700":"text-gray-900";s+=`
            <div class="flex flex-col items-center justify-center min-w-[3.5rem] py-2 rounded-xl ${c} cursor-pointer transition-transform active:scale-90 flex-shrink-0" data-action="select-date" data-date="${i.toISOString()}">
                <span class="text-[0.65rem] uppercase font-bold tracking-wider opacity-80 pointer-events-none">${d}</span>
                <span class="text-lg font-bold ${p} pointer-events-none mt-0.5">${u}</span>
                ${l&&!n?'<div class="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 pointer-events-none"></div>':'<div class="w-1.5 h-1.5 mt-1 opacity-0"></div>'}
            </div>
        `}t.innerHTML=s,t.querySelectorAll('[data-action="select-date"]').forEach(o=>{o.addEventListener("click",()=>{const i=new Date(o.dataset.date);z.currentDate=i,navigator.vibrate&&navigator.vibrate(30),Ce()})}),requestAnimationFrame(()=>{const o=t.querySelector(".bg-indigo-600");o&&o.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})})}function Q(t){return h(t||"")}function ln(t,e,a,s,r){const o=(t||"").replace(/\D/g,""),i=new Date(r).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),n=new Date(r).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=`Olá, ${e}! Você tem um agendamento de ${a} com ${s} para ${i} às ${n}. Podemos confirmar?`;return`https://wa.me/${o}?text=${encodeURIComponent(l)}`}function dn(t){const e=document.getElementById("agenda-view");if(!e)return;const a=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],s=Ho(z.currentDate),r=new Date;r.setHours(0,0,0,0);let o='<div class="week-container flex gap-2 overflow-x-auto hide-scrollbar px-4" id="weekScroller">';for(let i=0;i<7;i++){const n=new Date(s);n.setDate(s.getDate()+i);const l=n.toDateString()===r.toDateString(),d=t.filter(c=>new Date(c.startTime).toDateString()===n.toDateString()).sort((c,p)=>new Date(c.startTime)-new Date(p.startTime));let u="";d.length===0?u='<div class="week-empty text-xs text-gray-400 text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200"><i class="bi bi-dash-lg block text-lg mb-1"></i>Livre</div>':u=d.map(c=>{const b=new Date(c.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),g=m.professionalColors.get(c.professionalId)||{main:"#adb5bd"},v=c.status==="completed",y=z.selectedItems.has(c.id);if(c.type==="blockage")return`<div class="week-event-chip bg-red-50 border-l-4 border-red-500 rounded-md p-2 mb-2">
                        <div class="text-xs font-bold text-red-700 flex items-center"><i class="bi bi-lock mr-1"></i>${b}</div>
                        <div class="text-xs text-gray-800 font-semibold mt-1">${Q(c.reason)}</div>
                        <div class="text-[0.65rem] text-gray-500">${Q(c.professionalName)}</div>
                    </div>`;const k=JSON.stringify(c).replace(/'/g,"&apos;"),T=y?"ring-2 ring-indigo-500 bg-indigo-50":"bg-white",P=z.isSelectionMode?`<div class="absolute top-1 right-1 z-10">
                           <input type="checkbox" class="w-4 h-4 accent-indigo-600 pointer-events-none" ${y?"checked":""}>
                       </div>`:"";return`<div class="week-event-chip relative shadow-sm border-l-4 rounded-md p-2 mb-2 cursor-pointer transition-transform active:scale-95 ${v?"opacity-60":""} ${T}" style="border-left-color: ${g.main};"
                    data-action="edit-appointment" data-appointment='${k}'>
                    ${P}
                    <div class="text-xs font-bold text-gray-900">${b}</div>
                    <div class="text-xs text-gray-800 font-semibold mt-0.5 truncate pr-2">${Q(c.clientName)}</div>
                    <div class="text-[0.65rem] text-gray-500 leading-tight mt-0.5">${Q(c.serviceName)} <br/> <span class="font-medium text-indigo-600">${Q((c.professionalName||"").split(" ")[0])}</span></div>
                </div>`}).join(""),o+=`<div class="week-day-col min-w-[140px] flex-1 flex flex-col pt-2">
            <div class="week-day-header text-center mb-3 pb-2 border-b border-gray-200 ${l?"is-today":""}">
                <div class="text-xs uppercase font-bold text-gray-500 ${l?"text-indigo-600":""}">${l?"Hoje":a[i]}</div>
                <div class="text-xl font-black text-gray-900 ${l?"text-indigo-600":""}">${n.getDate()}</div>
            </div>
            <div class="week-day-events flex-1">${u}</div>
        </div>`}o+="</div>",e.innerHTML=o,requestAnimationFrame(()=>{const i=document.getElementById("weekScroller");if(i&&window.innerWidth<768){const n=i.querySelector(".is-today");n&&n.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}})}function cn(t){const e=document.getElementById("agenda-view");if(!e)return;if(t.sort((s,r)=>new Date(s.startTime)-new Date(r.startTime)),t.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-300">
                    <i class="bi bi-calendar2-x text-3xl"></i>
                </div>
                <p class="text-gray-800 font-bold text-lg mb-1">Agenda Livre</p>
                <p class="text-gray-500 text-sm">Não há agendamentos para esta data.</p>
            </div>`;return}let a='<div class="list-container px-4 py-2 space-y-4">';t.forEach(s=>{const r=new Date(s.startTime),o=new Date(s.endTime),i=Math.round((o-r)/6e4),n=r.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=m.professionalColors.get(s.professionalId)||{main:"#adb5bd"},d=s.status==="completed",u=JSON.stringify(s).replace(/'/g,"&apos;"),c=z.selectedItems.has(s.id),p=z.isSelectionMode?`<div class="flex items-center justify-center pr-3 border-r border-gray-100 mr-3">
                   <input type="checkbox" class="w-5 h-5 accent-indigo-600 pointer-events-none" ${c?"checked":""}>
               </div>`:"",b=c?"ring-2 ring-indigo-500 bg-indigo-50":"bg-white";if(s.type==="blockage"){a+=`<div class="list-card flex bg-red-50 rounded-2xl p-4 shadow-sm border border-red-100 mb-3 cursor-pointer">
                ${p}
                <div class="flex flex-col items-center justify-center border-r border-red-200 pr-4 min-w-[4.5rem]">
                    <span class="text-lg font-bold text-red-700">${n}</span>
                    <span class="text-xs text-red-500 font-semibold"><i class="bi bi-lock-fill"></i> Bloqueio</span>
                </div>
                <div class="flex-1 pl-4 flex flex-col justify-center">
                    <h3 class="font-bold text-red-800 text-sm">${Q(s.reason)}</h3>
                    <p class="text-xs text-red-600 mt-1 font-medium">${Q(s.professionalName)}</p>
                </div>
            </div>`;return}const g=ln(s.clientPhone,s.clientName,s.serviceName,s.professionalName,s.startTime),v=(s.services||[]).reduce((T,P)=>T+(Number(P.price)||0),0)||Number(s.totalPrice||0)||Number(s.servicePrice||0),y=s.paymentStatus||(s.status==="completed"?"Finalizado":"Agendado"),k=Q((s.professionalName||"").split(" ")[0]);a+=`<div class="list-card flex rounded-2xl p-3.5 shadow-sm border border-gray-100 cursor-pointer transition-transform active:scale-95 ${b} ${d?"opacity-70 bg-gray-50":""}"
            style="border-left: 5px solid ${l.main};"
            data-action="edit-appointment" data-appointment='${u}'>
            
            ${p}
            
            <div class="flex flex-col items-center justify-center border-r border-gray-100 pr-3.5 min-w-[4.5rem]">
                <span class="text-lg font-bold text-gray-900 ${d?"line-through text-gray-500":""}">${n}</span>
                <span class="text-xs text-gray-500 font-medium">${i} min</span>
            </div>
            
            <div class="flex-1 pl-3.5 flex flex-col justify-center min-w-0">
                <h3 class="font-bold text-gray-900 text-[0.95rem] truncate">${Q(s.clientName)}</h3>
                <p class="text-xs text-gray-600 mt-0.5 truncate">${Q(s.serviceName)} <span class="font-bold text-indigo-600 px-1">·</span> ${k}</p>
                
                <div class="flex flex-wrap gap-1.5 mt-2.5">
                    <span class="text-[0.65rem] bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200 font-bold">R$ ${v.toFixed(2).replace(".",",")}</span>
                    ${s.clientPhone?`<span class="text-[0.65rem] bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200 font-bold flex items-center gap-1"><i class="bi bi-telephone-fill opacity-70"></i> ${Q(s.clientPhone)}</span>`:""}
                    <span class="text-[0.65rem] px-2 py-0.5 rounded border font-bold ${d?"bg-green-50 text-green-700 border-green-200":"bg-amber-50 text-amber-700 border-amber-200"}">${Q(y)}</span>
                </div>
            </div>

            ${!d&&!z.isSelectionMode?`
            <div class="flex flex-col justify-center items-end pl-2 gap-2 border-l border-gray-50">
                <button class="lc-action-btn wa w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors" data-link="${g}" title="WhatsApp">
                    <i class="bi bi-whatsapp"></i>
                </button>
                <button class="lc-action-btn comanda w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors" data-action="open-comanda" data-appointment='${u}' title="Comanda">
                    <i class="bi bi-receipt-cutoff"></i>
                </button>
            </div>`:""}
        </div>`}),a+="</div>",e.innerHTML=a}function Oo(){const t=m.allEvents.filter(e=>z.selectedProfessionalId==="all"||e.professionalId===z.selectedProfessionalId);z.currentView==="list"?cn(t):dn(t),gs()}function gs(){const t=document.getElementById("batch-delete-container"),e=document.getElementById("agendaFab");t&&(z.isSelectionMode&&z.selectedItems.size>0?(t.innerHTML=`<div class="bg-gray-900 text-white p-3 mx-4 rounded-2xl shadow-xl flex items-center justify-between">
            <span class="font-semibold text-sm flex items-center"><span class="bg-indigo-500 text-white w-6 h-6 flex items-center justify-center rounded-full mr-2 text-xs">${z.selectedItems.size}</span> selecionados</span>
            <button data-action="batch-delete" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors">
                <i class="bi bi-trash3-fill"></i> Apagar
            </button>
        </div>`,t.style.display="block",e&&(e.style.transform="scale(0)")):(t.style.display="none",e&&(e.style.transform="scale(1)")))}function un(){const t=document.getElementById("currentMonthYearDisplay");if(t){const a=new Date(z.currentDate).toLocaleDateString("pt-BR",{month:"long",year:"numeric"});t.textContent=a.charAt(0).toUpperCase()+a.slice(1)}if(z.currentView==="list"){nn();const e=document.getElementById("calendarStripContainer");e&&(e.style.display="flex")}else{const e=document.getElementById("calendarStripContainer");e&&(e.style.display="none")}}async function Ce(){const t=document.getElementById("agenda-view");if(!t)return;z.selectedItems.clear(),gs(),t.innerHTML='<div class="flex items-center justify-center h-40"><div class="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>',un();let e,a;if(z.currentView==="list")e=new Date(z.currentDate),e.setHours(0,0,0,0),a=new Date(e),a.setHours(23,59,59,999);else{const s=Ho(z.currentDate);e=new Date(s),a=new Date(s),a.setDate(s.getDate()+6),a.setHours(23,59,59,999)}try{const r=(m.selectedEstablishments&&m.selectedEstablishments.length>0?m.selectedEstablishments:[m.establishmentId]).map(async d=>{const[u,c]=await Promise.all([xa(d,e.toISOString(),a.toISOString(),z.selectedProfessionalId==="all"?null:z.selectedProfessionalId),ka(d,e.toISOString(),a.toISOString(),z.selectedProfessionalId)]);return{appts:u||[],blockages:c||[]}}),o=await Promise.all(r);let i=[],n=[];if(o.forEach(d=>{i=i.concat(d.appts),n=n.concat(d.blockages)}),!document.getElementById("agenda-view"))return;const l=d=>d.map(u=>({...u,type:u.type||"appointment",professionalName:u.professionalName||(()=>{const c=m.professionals?.find(p=>p.id===u.professionalId);return c?c.name:"Indefinido"})()}));m.allEvents=[...l(i),...l(n)],ms(),Oo()}catch{document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML=`
                <div class="text-center py-12 text-gray-500">
                    <i class="bi bi-exclamation-triangle text-3xl mb-2"></i>
                    <p class="text-sm font-medium">Erro ao carregar a agenda.</p>
                </div>`)}}async function pn(){try{const e=(m.selectedEstablishments&&m.selectedEstablishments.length>0?m.selectedEstablishments:[m.establishmentId]).map(async i=>{const[n,l,d]=await Promise.all([Ee(i),pt(i),je(i)]);return{profs:n||[],services:l||[],estDetails:d}}),a=await Promise.all(e),s=new Map,r=new Map;let o=a[0]?.estDetails;a.forEach(i=>{i.profs.forEach(n=>s.set(n.id,n)),i.services.forEach(n=>r.set(n.id,n))}),m.professionals=Array.from(s.values()),m.services=Array.from(r.values()),Fo=[],o&&(na=o.loyaltyProgram||{enabled:!1}),m.professionals.forEach((i,n)=>{m.professionalColors.set(i.id,ia[n%ia.length])}),ms()}catch{f("Atenção","Não foi possível carregar os dados da equipe.","error")}}async function zo(t={}){z.currentDate=t.targetDate?new Date(t.targetDate):z.currentDate||new Date,z.isSelectionMode=!1,z.selectedItems.clear(),qs.innerHTML=`
        <div class="flex flex-col h-[calc(100vh-80px)] md:h-auto bg-gray-50 relative font-sans w-full">

            <div class="bg-white pt-safe-top sticky top-0 z-10 shadow-sm border-b border-gray-100 flex flex-col">
                <div class="flex justify-between items-center px-4 py-3">
                    <div class="flex items-center gap-3">
                        <button id="btnWeekDays" class="text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors" title="Opções">
                            <i class="bi bi-sliders text-xl"></i>
                        </button>
                        <h1 id="currentMonthYearDisplay" class="text-lg font-bold text-gray-900 m-0 leading-none">Carregando...</h1>
                    </div>

                    <div class="flex items-center gap-2">
                        <div class="flex items-center gap-1 bg-indigo-50 rounded-lg border border-indigo-100 p-0.5 shadow-sm">
                            <button id="btnPrevDate" class="w-7 h-7 flex items-center justify-center text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors active:scale-95" title="Anterior">
                                <i class="bi bi-chevron-left text-sm"></i>
                            </button>
                            <button id="btnTodayHeader" class="text-indigo-700 px-2 py-1 font-bold text-xs hover:bg-indigo-100 transition-colors uppercase tracking-wide rounded-md active:scale-95">
                                Hoje
                            </button>
                            <button id="btnNextDate" class="w-7 h-7 flex items-center justify-center text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors active:scale-95" title="Próximo">
                                <i class="bi bi-chevron-right text-sm"></i>
                            </button>
                        </div>
                        <div class="agenda-view-toggle bg-gray-100 p-1 rounded-xl flex gap-1">
                            <button class="${z.currentView==="list"?"bg-white shadow-sm":"text-gray-500"} rounded-lg px-3 py-1 text-xs font-bold transition-all" data-action="setView" data-view="list">Lista</button>
                            <button class="${z.currentView==="week"?"bg-white shadow-sm":"text-gray-500"} rounded-lg px-3 py-1 text-xs font-bold transition-all" data-action="setView" data-view="week">Semana</button>
                        </div>
                    </div>
                </div>

                <div id="calendarStripContainer" class="flex overflow-x-auto hide-scrollbar gap-2 px-4 pb-3" style="scroll-behavior: smooth;"></div>
                
                <div id="profSelectorContainer" class="flex overflow-x-auto hide-scrollbar gap-2 px-4 py-3 border-t border-gray-100">
                    <div class="w-6 h-6 border-2 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                </div>
            </div>

            <div id="agenda-view" class="flex-1 overflow-y-auto pb-32 pt-2"></div>

            <div id="batch-delete-container" class="fixed bottom-24 left-0 right-0 z-50 hidden px-4"></div>

            <button id="agendaFab" data-action="new-appointment" class="fixed bottom-24 right-4 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform active:scale-90 z-40">
                <i class="bi bi-plus-lg text-2xl"></i>
            </button>
            
            <div id="appointmentModal" class="fixed inset-0 z-[10000] hidden"></div>
        </div>`,document.getElementById("btnTodayHeader").addEventListener("click",()=>{z.currentDate=new Date,navigator.vibrate&&navigator.vibrate(30),Ce()}),document.getElementById("btnPrevDate").addEventListener("click",()=>{const a=z.currentView==="week"?7:1;z.currentDate.setDate(z.currentDate.getDate()-a),navigator.vibrate&&navigator.vibrate(20),Ce()}),document.getElementById("btnNextDate").addEventListener("click",()=>{const a=z.currentView==="week"?7:1;z.currentDate.setDate(z.currentDate.getDate()+a),navigator.vibrate&&navigator.vibrate(20),Ce()});const e=document.querySelectorAll(".agenda-view-toggle button");e.forEach(a=>{a.addEventListener("click",()=>{e.forEach(s=>{s.classList.remove("bg-white","shadow-sm"),s.classList.add("text-gray-500")}),a.classList.add("bg-white","shadow-sm"),a.classList.remove("text-gray-500"),z.currentView=a.dataset.view,navigator.vibrate&&navigator.vibrate(20),Ce()})}),document.getElementById("btnWeekDays").addEventListener("click",bn),js||(qs.addEventListener("click",async a=>{const s=a.target.closest('[data-action="open-comanda"]');if(s){a.stopPropagation(),navigator.vibrate&&navigator.vibrate(20);const l=s.dataset.appointment||s.closest("[data-appointment]")?.dataset.appointment;if(!l)return;const d=JSON.parse(l.replace(/&apos;/g,"'")),u=d.status==="completed"?"finalizadas":"em-atendimento",c={selectedAppointmentId:d.id,initialFilter:u};u==="finalizadas"&&d.transaction?.paidAt&&(c.filterDate=typeof d.transaction.paidAt=="object"?new Date(d.transaction.paidAt._seconds*1e3):d.transaction.paidAt),se("comandas-section",c);return}const r=a.target.closest(".lc-action-btn.wa");if(r){a.stopPropagation(),navigator.vibrate&&navigator.vibrate(20),r.dataset.link&&window.open(r.dataset.link,"_blank");return}if(a.target.closest('[data-action="batch-delete"]')){const l=z.selectedItems.size;await Y("Apagar Selecionados",`Deseja apagar ${l} registro(s)? Esta ação é irreversível.`)&&(await Promise.all(Array.from(z.selectedItems).map(async u=>{try{await ei(u)}catch{}})),f(`${l} registro(s) apagado(s).`,"success"),z.selectedItems.clear(),z.isSelectionMode=!1,Ce());return}const o=a.target.closest('[data-action="select-professional"]');if(o){navigator.vibrate&&navigator.vibrate(20);const l=o.dataset.profId;z.selectedProfessionalId=z.selectedProfessionalId===l&&l!=="all"?"all":l,Ce();return}const i=a.target.closest(".list-card[data-appointment], .week-event-chip[data-appointment]");if(i){if(z.isSelectionMode){a.stopPropagation();const d=i.querySelector('input[type="checkbox"]');if(d){const u=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'")),c=!d.checked;d.checked=c,c?z.selectedItems.add(u.id):z.selectedItems.delete(u.id),(i.classList.contains("week-event-chip")||i.classList.contains("list-card"))&&(c?(i.classList.add("ring-2","ring-indigo-500","bg-indigo-50"),i.classList.remove("bg-white")):(i.classList.remove("ring-2","ring-indigo-500","bg-indigo-50"),i.classList.add("bg-white"))),navigator.vibrate&&navigator.vibrate(15),gs()}return}const l=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'"));navigator.vibrate&&navigator.vibrate(20),Va(l);return}if(a.target.closest('[data-action="new-appointment"]')){navigator.vibrate&&navigator.vibrate(30),Va();return}}),js=!0),await pn(),await Ce()}function bn(){const t=document.getElementById("optionsSheet");if(t){t.remove();return}const e=document.createElement("div");e.id="optionsSheet",e.className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white rounded-t-3xl z-[10000] shadow-[0_-8px_40px_rgba(0,0,0,0.15)] transition-transform duration-300 translate-y-full";const a=z.isSelectionMode?"bg-red-50 text-red-600":"bg-green-50 text-green-700",s=z.isSelectionMode?"bi-x-circle":"bi-check2-square";e.innerHTML=`
        <div class="px-6 py-5">
            <div class="w-10 h-1.5 bg-gray-200 rounded-full mx-auto mb-5"></div>
            
            <div class="flex justify-between items-center mb-5">
                <span class="text-lg font-bold text-gray-900">Opções da Agenda</span>
                <button id="closeOptSheet" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200">
                    <i class="bi bi-x-lg text-sm"></i>
                </button>
            </div>

            <div class="mb-5">
                <div class="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Gestão em Lote</div>
                <button id="optSelectMode" class="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 ${a} transition-colors active:scale-95">
                    <i class="bi ${s} text-lg"></i> ${z.isSelectionMode?"Desativar Modo de Exclusão":"Ativar Seleção Múltipla"}
                </button>
                <p class="text-xs text-gray-500 text-center mt-2.5">${z.isSelectionMode?"Toque num cartão para desmarcar.":"Permite selecionar vários registros para apagar."}</p>
            </div>

            <div class="mb-4">
                <div class="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Equipe</div>
                <label class="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer">
                    <input type="checkbox" id="optInactiveToggle" class="w-5 h-5 accent-indigo-600 rounded" ${z.showInactiveProfs?"checked":""}>
                    <span class="text-sm font-semibold text-gray-700">Exibir profissionais inativos na barra</span>
                </label>
            </div>
        </div>`;const r=document.createElement("div");r.id="optionsOverlay",r.className="fixed inset-0 bg-black/40 z-[9999] opacity-0 transition-opacity duration-300",document.body.appendChild(r),document.body.appendChild(e),requestAnimationFrame(()=>{e.classList.remove("translate-y-full"),r.classList.remove("opacity-0")});const o=()=>{e.classList.add("translate-y-full"),r.classList.add("opacity-0"),setTimeout(()=>{e.remove(),r.remove()},300)};document.getElementById("closeOptSheet").addEventListener("click",o),r.addEventListener("click",o),document.getElementById("optSelectMode").addEventListener("click",()=>{z.isSelectionMode=!z.isSelectionMode,z.isSelectionMode||z.selectedItems.clear(),o(),Oo()}),document.getElementById("optInactiveToggle").addEventListener("change",i=>{z.showInactiveProfs=i.target.checked,ms()})}function xt(t){t<1||t>4||(H.step=t,Va(null,!0))}function mn(t){return{title:t?"Editar Reserva":"Novo Cliente",content:`
        <div class="p-4 space-y-4 flex-1">
            <div class="space-y-3">
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nome Completo</label>
                    <input type="text" id="apptClientName" placeholder="Ex: João Silva" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 font-semibold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm" value="${Q(H.data.clientName)}">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">WhatsApp / Telefone</label>
                    <input type="tel" id="apptClientPhone" placeholder="(00) 00000-0000" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 font-semibold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm" value="${Q(H.data.clientPhone)}">
                </div>
            </div>
            
            <div class="pt-4 border-t border-gray-200">
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Buscar na Base de Dados</label>
                <div class="relative">
                    <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base"></i>
                    <input type="text" id="clientSearchInput" placeholder="Procurar cliente..." class="w-full p-3 pl-11 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-900 font-medium focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all">
                </div>
                <div id="clientSearchResults" class="mt-3 space-y-2"></div>
            </div>
        </div>
        <div class="p-4 bg-white border-t border-gray-200 flex gap-3 pb-safe">
            <button type="button" data-action="close-modal" class="flex-1 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl active:bg-gray-200 transition-colors text-sm">Cancelar</button>
            <button type="button" data-action="next-step" data-current-step="1" class="flex-1 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform text-sm">Avançar</button>
        </div>`}}function gn(){return{title:"Serviços",content:`
        <div class="p-4 space-y-4 flex-1 flex flex-col">
            <div class="flex items-center gap-3">
                <div class="relative flex-1">
                    <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base"></i>
                    <input type="search" id="serviceSearchModalInput" placeholder="Buscar serviço..." class="w-full p-3 pl-11 bg-gray-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none">
                </div>
                <label class="flex items-center gap-2 bg-white px-3 py-3 rounded-xl border border-gray-200 cursor-pointer shadow-sm">
                    <input type="checkbox" id="multiServiceToggle" class="w-5 h-5 accent-indigo-600 rounded" ${H.data.selectedServiceIds.length>1?"checked":""}>
                    <span class="text-xs font-bold text-gray-700 uppercase">Múltiplos</span>
                </label>
            </div>
            <div id="apptServicesContainer" class="flex-1 overflow-y-auto grid grid-cols-2 gap-3 content-start pb-4">
                ${Sa.map(t=>`<div class="service-card p-3 bg-white rounded-xl border-2 transition-all active:scale-95 ${H.data.selectedServiceIds.includes(t.id)?"border-indigo-500 bg-indigo-50 shadow-md":"border-gray-100 hover:border-gray-200 shadow-sm"} cursor-pointer flex flex-col justify-between gap-2" data-service-id="${t.id}">
                        <div>
                            <p class="font-bold text-[0.85rem] leading-tight text-gray-900 line-clamp-2">${Q(t.name)}</p>
                            <p class="text-[0.7rem] font-bold text-gray-500 mt-1"><i class="bi bi-clock mr-1"></i>${t.duration} min</p>
                        </div>
                        <div class="w-full text-left mt-1">
                            <p class="text-sm font-black text-indigo-600">R$ ${t.price.toFixed(2).replace(".",",")}</p>
                        </div>
                    </div>`).join("")}
            </div>
        </div>
        <div class="p-4 bg-white border-t border-gray-200 flex gap-3 pb-safe">
            <button type="button" data-action="prev-step" data-current-step="2" class="w-1/3 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl active:bg-gray-200 transition-colors text-sm">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="2" class="w-2/3 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform text-sm">Avançar</button>
        </div>`}}function fn(){return{title:"Equipe",content:`
        <div class="p-4 space-y-4 flex-1 flex flex-col">
            <div class="relative">
                <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base"></i>
                <input type="search" id="professionalSearchModalInput" placeholder="Procurar profissional..." class="w-full p-3 pl-11 bg-gray-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 outline-none">
            </div>
            <div id="apptProfessionalContainer" class="flex-1 overflow-y-auto grid grid-cols-3 gap-3 content-start pb-4">
                ${za.map(t=>{const e=H.data.professionalId===t.id,a=m.professionalColors.get(t.id)||ia[0];return`<div class="professional-modal-card p-3 bg-white rounded-2xl border-2 transition-all active:scale-95 ${e?"border-indigo-500 bg-indigo-50 shadow-md":"border-gray-100 hover:border-gray-200 shadow-sm"} cursor-pointer text-center flex flex-col items-center justify-center" data-professional-id="${t.id}">
                        <div class="w-14 h-14 rounded-full flex items-center justify-center font-black text-white text-xl shadow-sm mb-2" style="background-color: ${a.main}; ${t.photo?`background-image: url('${Q(t.photo)}'); background-size: cover; background-position: center;`:""}">
                            ${t.photo?"":Q(t.name).charAt(0)}
                        </div>
                        <p class="text-[0.75rem] font-bold text-gray-900 w-full truncate">${Q(t.name.split(" ")[0])}</p>
                    </div>`}).join("")}
            </div>
        </div>
        <div class="p-4 bg-white border-t border-gray-200 flex gap-3 pb-safe">
            <button type="button" data-action="prev-step" data-current-step="3" class="w-1/3 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl active:bg-gray-200 transition-colors text-sm">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="3" class="w-2/3 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform text-sm">Avançar</button>
        </div>`}}function xn(){const t=H.data.date||Zt();return{title:"Horário",content:`
        <div class="p-4 space-y-4 flex-1 flex flex-col">
            
            <div class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-lg">${Q(H.data.clientName).charAt(0)}</div>
                <div class="flex-1 min-w-0">
                    <p class="font-bold text-sm text-gray-900 truncate">${Q(H.data.clientName)}</p>
                    <p class="text-xs font-bold text-gray-500 truncate mt-0.5"><i class="bi bi-person-badge mr-1"></i> ${Q(H.data.professionalName)}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Data</label>
                    <input type="date" id="apptDate" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:border-indigo-500 outline-none shadow-sm" value="${t}">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Duração</label>
                    <div class="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 flex items-center justify-center gap-2 shadow-sm">
                        <i class="bi bi-stopwatch text-indigo-500"></i> <span id="apptTotalDuration">--</span>
                    </div>
                </div>
            </div>

            <div class="flex-1 flex flex-col min-h-0 mt-2">
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Horários Disponíveis</label>
                <div id="availableTimesContainer" class="flex-1 overflow-y-auto grid grid-cols-3 gap-2.5 content-start pb-4"></div>
            </div>
            <div id="loyaltyRewardsContainer"></div>
        </div>
        <div class="p-4 bg-white border-t border-gray-200 flex gap-3 pb-safe">
            <button type="button" data-action="prev-step" data-current-step="4" class="w-1/3 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl active:bg-gray-200 transition-colors text-sm">Voltar</button>
            <button type="button" id="btnSubmitAppointment" class="w-2/3 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 text-sm">
                <i class="bi bi-check-circle-fill"></i> ${H.data.id?"Salvar":"Confirmar"}
            </button>
        </div>`}}async function Va(t=null,e=!1){const a=document.getElementById("appointmentModal");e||(H={step:1,data:{id:t?.id||null,clientName:t?.clientName||"",clientPhone:t?.clientPhone||"",selectedServiceIds:t?.services?.map(i=>i.id)||[],professionalId:t?.professionalId||null,professionalName:t?.professionalName||"",date:t?.startTime?Zt(new Date(t.startTime)):Zt(),time:t?.startTime?new Date(t.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null,originalDate:t?.startTime?Zt(new Date(t.startTime)):null,originalTime:t?.startTime?new Date(t.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null,redeemedReward:t?.redeemedReward||null,clientHasRewards:t?.hasRewards||!1,clientLoyaltyPoints:0}}),Sa=m.services||[],za=(m.professionals||[]).filter(i=>i.status==="active");let s;switch(H.step){case 1:s=mn(t);break;case 2:s=gn();break;case 3:s=fn();break;case 4:s=xn();break}a.className="fixed inset-0 z-[10000] hidden flex items-end md:items-center justify-center bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 opacity-0",a.innerHTML=`
        <div class="absolute inset-0 z-0 cursor-pointer" data-action="close-modal"></div>
        <div id="appointmentModalContent" class="relative z-10 w-full h-full md:h-auto md:max-h-[85vh] md:w-[550px] md:rounded-2xl bg-gray-50 flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-8 md:scale-95 shadow-2xl overflow-hidden">
            <header class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between pt-safe-top md:pt-4 shadow-sm z-20">
                <button type="button" data-action="close-modal" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 active:scale-90 transition-all">
                    <i class="bi bi-x-lg text-sm"></i>
                </button>
                <div class="text-center flex-1 px-2">
                    <h2 class="text-sm font-black text-gray-900 tracking-tight leading-tight truncate">${s.title}</h2>
                    <div class="flex items-center justify-center gap-1 mt-1">
                        <div class="w-2 h-2 rounded-full ${H.step>=1?"bg-indigo-600":"bg-gray-200"}"></div>
                        <div class="w-2 h-2 rounded-full ${H.step>=2?"bg-indigo-600":"bg-gray-200"}"></div>
                        <div class="w-2 h-2 rounded-full ${H.step>=3?"bg-indigo-600":"bg-gray-200"}"></div>
                        <div class="w-2 h-2 rounded-full ${H.step>=4?"bg-indigo-600":"bg-gray-200"}"></div>
                    </div>
                </div>
                <div class="w-10 h-10"></div>
            </header>
            <form id="appointmentForm" class="flex-1 overflow-y-auto flex flex-col bg-gray-50">${s.content}</form>
        </div>
    `;const r=()=>{const i=a.querySelector("#appointmentModalContent");i&&(i.classList.remove("translate-y-0","md:translate-y-0","md:scale-100"),i.classList.add("translate-y-full","md:translate-y-8","md:scale-95")),a.classList.add("opacity-0"),setTimeout(()=>{a.classList.add("hidden")},300)};a.querySelectorAll('[data-action="next-step"]').forEach(i=>i.addEventListener("click",()=>{const n=parseInt(i.dataset.currentStep,10);if(n===1&&(H.data.clientName=a.querySelector("#apptClientName").value.trim(),H.data.clientPhone=a.querySelector("#apptClientPhone").value.trim(),!H.data.clientName))return f("Preencha o nome do cliente.","warning");if(n===2&&H.data.selectedServiceIds.length===0)return f("Selecione um serviço.","warning");if(n===3&&!H.data.professionalId)return f("Escolha um membro da equipe.","warning");xt(n+1)})),a.querySelectorAll('[data-action="prev-step"]').forEach(i=>i.addEventListener("click",()=>xt(parseInt(i.dataset.currentStep,10)-1))),a.querySelectorAll('[data-action="close-modal"]').forEach(i=>{i.addEventListener("click",r)}),a.classList.remove("hidden"),a.offsetWidth,a.classList.remove("opacity-0");const o=a.querySelector("#appointmentModalContent");o&&(o.classList.remove("translate-y-full","md:translate-y-8","md:scale-95"),o.classList.add("translate-y-0","md:translate-y-0","md:scale-100")),H.step===2&&a.querySelectorAll(".service-card").forEach(i=>i.addEventListener("click",()=>{const n=a.querySelector("#multiServiceToggle")?.checked,l=i.classList.contains("bg-indigo-50"),d=i.dataset.serviceId;navigator.vibrate&&navigator.vibrate(15),n?l?(i.classList.remove("border-indigo-500","bg-indigo-50","shadow-md"),i.classList.add("border-gray-100","shadow-sm"),H.data.selectedServiceIds=H.data.selectedServiceIds.filter(u=>u!==d)):(i.classList.add("border-indigo-500","bg-indigo-50","shadow-md"),i.classList.remove("border-gray-100","shadow-sm"),H.data.selectedServiceIds.includes(d)||H.data.selectedServiceIds.push(d)):(a.querySelectorAll(".service-card.bg-indigo-50").forEach(u=>{u.classList.remove("border-indigo-500","bg-indigo-50","shadow-md"),u.classList.add("border-gray-100","shadow-sm")}),i.classList.add("border-indigo-500","bg-indigo-50","shadow-md"),i.classList.remove("border-gray-100","shadow-sm"),H.data.selectedServiceIds=[d],setTimeout(()=>xt(3),250))})),H.step===3&&a.querySelectorAll(".professional-modal-card").forEach(i=>i.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15),a.querySelectorAll(".professional-modal-card.bg-indigo-50").forEach(l=>{l.classList.remove("border-indigo-500","bg-indigo-50","shadow-md"),l.classList.add("border-gray-100","shadow-sm")}),i.classList.add("border-indigo-500","bg-indigo-50","shadow-md"),i.classList.remove("border-gray-100","shadow-sm"),H.data.professionalId=i.dataset.professionalId;const n=za.find(l=>l.id===i.dataset.professionalId);H.data.professionalName=n?n.name:"",setTimeout(()=>xt(4),250)})),H.step===1&&a.querySelector("#clientSearchInput")?.addEventListener("input",i=>yn(i.target.value)),H.step===4&&(a.querySelector("#apptDate")?.addEventListener("change",Ns),a.querySelector("#availableTimesContainer")?.addEventListener("click",i=>{const n=i.target.closest("button[data-time-slot]");n&&(navigator.vibrate&&navigator.vibrate(10),a.querySelectorAll("#availableTimesContainer button").forEach(l=>{l.classList.remove("bg-indigo-600","text-white","border-indigo-600","shadow-md"),l.classList.add("bg-white","text-gray-700","border-gray-200","shadow-sm")}),n.classList.add("bg-indigo-600","text-white","border-indigo-600","shadow-md"),n.classList.remove("bg-white","text-gray-700","border-gray-200","shadow-sm"),H.data.time=n.dataset.timeSlot)}),a.querySelector("#btnSubmitAppointment")?.addEventListener("click",hn),Ns(),vn())}async function hn(t){t.preventDefault();const e=document.getElementById("btnSubmitAppointment");if(!H.data.time||!H.data.selectedServiceIds.length||!H.data.professionalId)return f("Selecione horário, serviço e profissional.","warning");e.disabled=!0,e.innerHTML='<i class="bi bi-hourglass-split"></i> Processando...';const a=H.data.selectedServiceIds.map(u=>{const c=Sa.find(p=>p.id===u);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[s,r]=H.data.time.split(":"),o=new Date(`${H.data.date}T${s}:${r}:00`),i=a.reduce((u,c)=>u+(c.duration+(c.bufferTime||0)),0),n=new Date(o.getTime()+i*6e4),d={establishmentId:m.selectedEstablishments&&m.selectedEstablishments.length>0?m.selectedEstablishments[0]:m.establishmentId,clientName:H.data.clientName,clientPhone:H.data.clientPhone,services:a,professionalId:H.data.professionalId,professionalName:H.data.professionalName,startTime:o.toISOString(),endTime:n.toISOString(),redeemedReward:H.data.redeemedReward};H.data.id&&(d.id=H.data.id);try{H.data.id?await Kr(H.data.id,d):await Zr(d),f("Registro salvo!","success");const u=document.getElementById("appointmentModal"),c=u.querySelector("#appointmentModalContent");c&&(c.classList.remove("translate-y-0","md:translate-y-0","md:scale-100"),c.classList.add("translate-y-full","md:translate-y-8","md:scale-95")),u.classList.add("opacity-0"),setTimeout(()=>{u.classList.add("hidden")},300),Ce()}catch(u){f(u.message,"error"),e.disabled=!1,e.innerHTML=`<i class="bi bi-check-circle-fill"></i> ${H.data.id?"Salvar Edição":"Confirmar"}`}}async function Ns(){const t=document.getElementById("availableTimesContainer"),e=document.getElementById("apptTotalDuration");if(!t)return;const a=document.getElementById("apptDate");a&&a.value&&(H.data.date=a.value);const s=H.data.selectedServiceIds.reduce((u,c)=>{const p=Sa.find(b=>b.id===c);return u+(p?p.duration+(p.bufferTime||0):0)},0);e&&(e.innerHTML=`<strong>${s}</strong> min`);const{professionalId:r,selectedServiceIds:o,date:i,originalDate:n,originalTime:l,id:d}=H.data;if(!r||!o.length||!i){t.innerHTML='<p class="col-span-full text-center text-xs text-gray-500 font-bold py-4 bg-white rounded-xl shadow-sm border border-gray-100">Preencha os passos anteriores.</p>';return}t.innerHTML='<div class="col-span-full flex justify-center py-4"><div class="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>';try{const u=m.selectedEstablishments&&m.selectedEstablishments.length>0?m.selectedEstablishments[0]:m.establishmentId;let c=await Xr({establishmentId:u,professionalId:r,serviceIds:o,date:i});const p=new Date;if(new Date(i+"T00:00:00").toDateString()===p.toDateString()){const b=p.getHours()*60+p.getMinutes();c=c.filter(g=>{const[v,y]=g.split(":").map(Number);return v*60+y>=b})}d&&i===n&&l&&(c.includes(l)||(c.push(l),c.sort())),t.innerHTML=c.length>0?c.map(b=>{const g=H.data.time===b;return`<button type="button" data-time-slot="${b}" class="py-3 text-sm font-bold rounded-xl border-2 transition-transform active:scale-95 ${g?"bg-indigo-600 text-white border-indigo-600 shadow-md":"bg-white text-gray-700 border-gray-200 hover:border-indigo-300 shadow-sm"}">${b}</button>`}).join(""):'<p class="col-span-full text-center text-sm font-bold text-red-500 bg-white py-4 rounded-xl border border-red-100 shadow-sm">Nenhum horário livre.</p>'}catch{t.innerHTML='<p class="col-span-full text-center text-sm font-bold text-red-500 bg-white py-4 rounded-xl">Erro ao pesquisar.</p>'}}function vn(){const t=document.getElementById("loyaltyRewardsContainer");if(!t)return;const{clientHasRewards:e,clientLoyaltyPoints:a}=H.data,{enabled:s,rewards:r}=na;if(!s||!e||!r?.length){t.innerHTML="";return}const o=r.filter(i=>a>=i.points);if(!o.length){t.innerHTML='<p class="text-xs font-bold text-gray-400 mt-3 text-center">Nenhuma recompensa atingida ainda.</p>';return}t.innerHTML=`<div class="border border-indigo-100 bg-indigo-50/80 rounded-xl p-3 mt-3 shadow-sm">
        <p class="text-[0.7rem] font-bold text-indigo-800 uppercase tracking-wider mb-2">Recompensas (${a} pts)</p>
        ${o.map(i=>`<label class="flex items-center gap-2 p-2 bg-white border border-indigo-100 rounded-lg mb-1.5 cursor-pointer shadow-sm active:scale-95 transition-transform"><input type="radio" name="loyaltyReward" value="${Q(i.reward)}" data-points="${i.points}" class="w-4 h-4 accent-indigo-600"><span class="text-[0.85rem] font-bold text-gray-800 flex-1">${Q(i.reward)}</span><span class="text-[0.65rem] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">-${i.points} pts</span></label>`).join("")}
    </div>`,t.querySelectorAll('input[name="loyaltyReward"]').forEach(i=>{i.addEventListener("change",n=>{n.target.checked&&(H.data.redeemedReward={reward:n.target.value,points:parseInt(n.target.dataset.points,10)})})})}async function yn(t){const e=document.getElementById("clientSearchResults");if(!e||t.trim().length<3){e&&(e.innerHTML='<p class="text-sm text-gray-400 font-medium px-2 py-2 text-center">Digite 3 ou mais caracteres...</p>');return}e.innerHTML='<div class="text-center py-4"><div class="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div></div>';try{const s=(m.selectedEstablishments&&m.selectedEstablishments.length>0?m.selectedEstablishments:[m.establishmentId]).map(n=>ut(n,t.trim())),r=await Promise.all(s),o=new Map;r.forEach(n=>{n.forEach(l=>{l.phone?o.set(l.phone,l):o.set(l.id||Math.random().toString(),l)})});const i=Array.from(o.values());if(Fo=i,!i.length){e.innerHTML='<p class="text-sm text-gray-500 bg-white border border-gray-200 p-3 rounded-xl text-center font-bold shadow-sm">Nenhum cliente encontrado.</p>';return}e.innerHTML=i.map(n=>`<div class="client-card p-3 bg-white rounded-xl border-2 transition-all active:scale-95 ${H.data.clientName===n.name&&H.data.clientPhone===n.phone?"border-indigo-500 bg-indigo-50 shadow-md":"border-gray-100 hover:border-gray-200 shadow-sm"} cursor-pointer flex items-center gap-3" data-client-name="${Q(n.name)}" data-client-phone="${Q(n.phone)}" data-loyalty-points="${n.loyaltyPoints||0}">
                <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-black text-gray-500 flex-shrink-0">${Q(n.name).charAt(0)}</div>
                <div class="flex-1 min-w-0"><p class="text-sm font-bold text-gray-900 truncate">${Q(n.name)}</p><p class="text-[0.75rem] font-semibold text-gray-500 truncate mt-0.5">${Q(n.phone)}</p></div>
            </div>`).join(""),e.querySelectorAll(".client-card").forEach(n=>{n.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15),H.data.clientName=n.dataset.clientName,H.data.clientPhone=n.dataset.clientPhone,H.data.clientLoyaltyPoints=parseInt(n.dataset.loyaltyPoints||"0",10);const l=Math.min(...(na?.rewards||[]).map(d=>d.points));H.data.clientHasRewards=na.enabled&&l!==1/0&&H.data.clientLoyaltyPoints>=l,document.getElementById("apptClientName").value=n.dataset.clientName,document.getElementById("apptClientPhone").value=n.dataset.clientPhone,e.querySelectorAll(".client-card").forEach(d=>{d.classList.remove("border-indigo-500","bg-indigo-50","shadow-md"),d.classList.add("border-gray-100","shadow-sm")}),n.classList.add("border-indigo-500","bg-indigo-50","shadow-md"),n.classList.remove("border-gray-100","shadow-sm"),setTimeout(()=>xt(2),250)})})}catch{e.innerHTML='<p class="text-[0.75rem] font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 text-center shadow-sm">Erro ao pesquisar.</p>'}}const wn=(t,e=null,a=1,s=12)=>{let r=`/api/comandas/${t}?page=${a}&limit=${s}`;return e&&(typeof e=="object"?(e.startDate&&(r+=`&startDate=${e.startDate}`),e.endDate&&(r+=`&endDate=${e.endDate}`)):typeof e=="string"&&(r+=`&date=${e}`)),C(r)},kn=(t,e)=>C(`/api/appointments/${t}/comanda`,{method:"POST",body:JSON.stringify({items:e})}),Vo=t=>C("/api/sales",{method:"POST",body:JSON.stringify(t)}),_a=(t,e)=>C(`/api/sales/${t}?date=${e}`),$n=(t,e,a)=>{const s=`/api/sales/${t}?startDate=${e}&endDate=${a}`;return C(s)},Sn=t=>C(`/api/sales/${t}/reopen`,{method:"POST"}),_o=t=>C(`/api/sales/${t}`,{method:"DELETE"}),Rs=Object.freeze(Object.defineProperty({__proto__:null,createSale:Vo,deleteSale:_o,getSales:_a,getSalesByDateRange:$n,reopenSale:Sn},Symbol.toStringTag,{value:"Module"})),bt=t=>C(`/api/products/${t}`),Uo=t=>C("/api/products",{method:"POST",body:JSON.stringify(t)}),Wo=(t,e)=>C(`/api/products/${t}`,{method:"PUT",body:JSON.stringify(e)}),fs=t=>C(`/api/products/${t}`,{method:"DELETE"}),Jo=(t,e)=>C(`/api/products/${t}/stock`,{method:"PATCH",body:JSON.stringify(e)}),En=t=>C(`/api/products/${t}/stock-history`),Go=({startDate:t,endDate:e,productId:a,categoryId:s,establishmentId:r})=>{const o=new URLSearchParams({startDate:t,endDate:e});return a&&a!=="all"&&o.append("productId",a),s&&s!=="all"&&o.append("categoryId",s),r&&o.append("establishmentId",r),C(`/api/products/stock-history/report?${o.toString()}`)},In=Object.freeze(Object.defineProperty({__proto__:null,adjustStock:Jo,createProduct:Uo,deleteProduct:fs,getProducts:bt,getStockHistory:En,getStockReport:Go,updateProduct:Wo},Symbol.toStringTag,{value:"Module"})),Ln=()=>C("/api/cashier/status").catch(t=>{if(t.message.includes("404")||t.message.includes("não encontrada"))return null;throw t}),Cn=t=>{const e={establishmentId:t.establishmentId,initialAmount:Number(t.initialAmount),notes:t.notes||""};return console.log("Payload enviado para abrir caixa:",e),C("/api/cashier/open",{method:"POST",body:JSON.stringify(e)})},Dn=(t,e)=>{const a={finalAmount:Number(e)};return console.log("Payload enviado para fechar caixa:",a),C(`/api/cashier/close/${t}`,{method:"PUT",body:JSON.stringify(a)})},Tn=()=>C("/api/cashier/history").then(t=>t||[]).catch(t=>(console.error("Erro ao buscar histórico:",t),[])),Pn=t=>C(`/api/cashier/report/${t}`),xs=t=>C(`/api/packages/${t}`),Bn=t=>C("/api/packages",{method:"POST",body:JSON.stringify(t)}),Mn=(t,e)=>C(`/api/packages/${t}`,{method:"PUT",body:JSON.stringify(e)}),Fs=t=>C(`/api/packages/${t}`,{method:"DELETE"});let x={allComandas:[],catalog:{services:[],products:[],packages:[]},activeFilter:"abertas",selectedComandaId:null,viewMode:"items",selectedCatalogItem:null,isCashierOpen:!1,activeCashierSessionId:null,loyaltySettings:null,establishmentConfig:null,pendingRedemption:null,paging:{page:1,limit:15,total:0},checkoutState:{payments:[],selectedMethod:"dinheiro",installments:1,amountReceived:"",discount:{type:"real",value:0},discountReason:""},isProcessing:!1,showHistoryPanel:!1,filterStartDate:"",filterEndDate:"",filterPreset:"hoje"},_e=null,Ge=null,Hs=null;function Qo(t,e){return function(...a){clearTimeout(Hs),Hs=setTimeout(()=>t.apply(this,a),e)}}function Ba(t){const e=new Date;let a,s;t==="hoje"?(a=new Date,s=new Date):t==="este_mes"?(a=new Date(e.getFullYear(),e.getMonth(),1),s=new Date(e.getFullYear(),e.getMonth()+1,0)):t==="mes_passado"?(a=new Date(e.getFullYear(),e.getMonth()-1,1),s=new Date(e.getFullYear(),e.getMonth(),0)):(a=new Date,s=new Date);const r=o=>{const i=o.getTimezoneOffset()*6e4;return new Date(o-i).toISOString().split("T")[0]};return{start:r(a),end:r(s)}}async function Os(t,e="stay"){if(!t||!t.id)return;t._localUpdatedAt=Date.now(),t._cachedItems=null,t._hasUnsavedChanges=!1,Ia(),e==="checkout"&&(x.viewMode="checkout",x.checkoutState.payments||(x.checkoutState.payments=[]),x.checkoutState.selectedMethod="dinheiro",x.checkoutState.amountReceived="",x.checkoutState.discount.value||(x.checkoutState.discount={type:"real",value:0},x.checkoutState.discountReason=""),te());const a=document.createElement("div");a.id="saving-overlay",a.className="fixed inset-0 bg-gray-900/60 z-[999999] flex items-center justify-center backdrop-blur-sm",a.innerHTML=`
        <div class="bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center animate-fade-in border border-gray-100">
            <div class="loader mb-4"></div>
            <p class="text-gray-800 font-black text-sm uppercase tracking-widest">Sincronizando...</p>
        </div>
    `,document.body.appendChild(a);try{const s=(t.comandaItems||[]).filter(r=>r&&r.id&&String(r.id)!=="undefined"&&String(r.id)!=="null").map(r=>{const o={...r};if(o.id=String(r.id),o.type==="product"){const i=o.id;o.productId||(o.productId=i),o.product_id||(o.product_id=i)}if(o.type==="service"){const i=o.id;o.serviceId||(o.serviceId=i),o.service_id||(o.service_id=i)}return o});t.type==="walk-in"&&String(t.id).startsWith("temp-")||await kn(t.id,s),document.body.contains(a)&&document.body.removeChild(a),e!=="checkout"&&(f("Sucesso","Comanda atualizada e salva!","success"),te())}catch(s){document.body.contains(a)&&document.body.removeChild(a),t._hasUnsavedChanges=!0,te(),f("Erro","Falha ao salvar no servidor: "+s.message,"warning")}}function Ne(t){if(!t._cachedItems){let e=[];if(t.status==="completed"){const a=t.comandaItems||t.items||[];e=a.length>0?a:t.services||[]}else{const a=(t.services||[]).map(i=>({...i,_source:"original_service",type:"service"})),s=a.reduce((i,n)=>{const l=String(n.id);return i[l]=(i[l]||0)+1,i},{}),r=[...t.comandaItems||[],...t.items||[]],o=[];r.forEach(i=>{const n=String(i.id);(i.type==="service"||!i.type)&&s[n]>0?s[n]--:o.push({...i,_source:"extra"})}),e=[...a,...o]}return t._cachedItems=e,t._cachedTimestamp=Date.now(),e}return t._cachedItems}function An(){const t=document.getElementById("comandas-layout");t&&t.classList.add("mobile-detail-open");const e=document.getElementById("mobile-bottom-nav");e&&(e.style.display="none")}function Xe(){const t=document.getElementById("comandas-layout");t&&t.classList.remove("mobile-detail-open");const e=document.getElementById("mobile-bottom-nav");e&&(e.style.display="")}function qn(){const t=x.allComandas||[],e=t.filter(d=>d.status!=="completed").length,a=t.filter(d=>d.status==="completed"),s=a.reduce((d,u)=>{let c=u.totalAmount!==void 0?Number(u.totalAmount):Ne(u).reduce((p,b)=>p+Number(b.price||0),0);return d+c},0),r=a.length>0?s/a.length:0,o=document.getElementById("kpi-abertas"),i=document.getElementById("kpi-pagas"),n=document.getElementById("kpi-vendas"),l=document.getElementById("kpi-ticket");o&&(o.textContent=e),i&&(i.textContent=a.length),n&&(n.textContent=`R$ ${s.toFixed(2).replace(".",",")}`),l&&(l.textContent=`R$ ${r.toFixed(2).replace(".",",")}`)}function Nt(){Ge.innerHTML=`
        <style id="comandas-mobile-css">
            @media (max-width: 767px) {
                .mobile-detail-open #comandas-list-column { display: none !important; }
                #comandas-layout:not(.mobile-detail-open) #comanda-detail-container { display: none !important; }
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
            #toast-container, .toast-notification, .modal, .modal-backdrop, .modal-dialog, [id*="modal"], [id*="Modal"] { z-index: 9999999 !important; }
        </style>
        
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative">
            
            <div id="cashier-controls" class="flex items-center gap-2 mb-2">
                <div class="loader-sm"></div>
            </div>

            <div class="grid grid-cols-2 gap-2 mb-2 animate-fade-in w-full">
                <button id="btn-new-sale" data-action="new-sale" class="bg-indigo-600 text-white rounded-xl p-3 flex items-center justify-center shadow-md active:scale-95 transition-transform border border-indigo-700 gap-2">
                    <i class="bi bi-cart-plus text-xl drop-shadow-md"></i>
                    <span class="font-black text-xs uppercase tracking-widest leading-none mt-0.5">Nova Venda</span>
                </button>
                <button data-action="toggle-history" class="bg-white text-gray-700 rounded-xl p-3 flex items-center justify-center shadow-sm border border-gray-200 active:scale-95 transition-transform hover:bg-gray-50 gap-2">
                    <i class="bi bi-clock-history text-xl text-indigo-500"></i>
                    <span class="font-black text-xs uppercase tracking-widest leading-none mt-0.5">Histórico</span>
                </button>
            </div>

            <div id="cashier-alert-box"></div>

            <div id="history-panel" class="${x.showHistoryPanel?"block":"hidden"} bg-white p-3 rounded-xl border border-gray-200 shadow-sm mb-2 animate-fade-in">
                <h4 class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Período de Busca</h4>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                    <button data-action="set-period" data-period="hoje" class="period-btn py-2 text-[10px] font-bold rounded-lg border transition-colors ${x.filterPreset==="hoje"?"bg-indigo-600 text-white border-indigo-600 shadow-sm":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-white"}">Hoje</button>
                    <button data-action="set-period" data-period="este_mes" class="period-btn py-2 text-[10px] font-bold rounded-lg border transition-colors ${x.filterPreset==="este_mes"?"bg-indigo-600 text-white border-indigo-600 shadow-sm":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-white"}">Este Mês</button>
                    <button data-action="set-period" data-period="mes_passado" class="period-btn py-2 text-[10px] font-bold rounded-lg border transition-colors ${x.filterPreset==="mes_passado"?"bg-indigo-600 text-white border-indigo-600 shadow-sm":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-white"}">Mês Passado</button>
                    <button data-action="set-period" data-period="custom" class="period-btn py-2 text-[10px] font-bold rounded-lg border transition-colors ${x.filterPreset==="custom"?"bg-indigo-600 text-white border-indigo-600 shadow-sm":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-white"}">Personalizado</button>
                </div>
                
                <div id="custom-date-fields" class="${x.filterPreset==="custom"?"flex":"hidden"} gap-2 items-end p-2 bg-gray-50 rounded-lg border border-gray-100 flex-wrap sm:flex-nowrap">
                    <div class="flex-1 min-w-[100px]">
                        <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 ml-1">Início</label>
                        <input type="date" id="filter-start-date" value="${x.filterStartDate}" class="w-full p-2 border border-gray-300 rounded-lg bg-white text-xs font-bold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm">
                    </div>
                    <div class="flex-1 min-w-[100px]">
                        <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 ml-1">Fim</label>
                        <input type="date" id="filter-end-date" value="${x.filterEndDate}" class="w-full p-2 border border-gray-300 rounded-lg bg-white text-xs font-bold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm">
                    </div>
                    <button data-action="apply-custom-dates" class="h-[38px] w-full sm:w-auto px-4 bg-indigo-600 text-white font-black text-xs rounded-lg hover:bg-indigo-700 shadow-sm active:scale-95 transition-transform uppercase tracking-wider flex items-center justify-center gap-1.5 mt-1 sm:mt-0">
                        <i class="bi bi-search"></i> Buscar
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-4 gap-2 mb-3 animate-fade-in w-full">
                <div class="bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Abertas</span>
                    <span id="kpi-abertas" class="text-sm md:text-base font-black text-indigo-600 mt-0.5 w-full truncate">0</span>
                </div>
                <div class="bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Vendas</span>
                    <span id="kpi-vendas" class="text-sm md:text-base font-black text-emerald-600 mt-0.5 w-full truncate">R$ 0,00</span>
                </div>
                <div class="bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Pagas</span>
                    <span id="kpi-pagas" class="text-sm md:text-base font-black text-gray-800 mt-0.5 w-full truncate">0</span>
                </div>
                <div class="bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Ticket</span>
                    <span id="kpi-ticket" class="text-sm md:text-base font-black text-blue-600 mt-0.5 w-full truncate">R$ 0,00</span>
                </div>
            </div>

            <div id="comandas-layout" class="flex-1 flex gap-3 min-h-0 w-full animate-fade-in relative overflow-hidden">
                
                <div id="comandas-list-column" class="flex flex-col bg-transparent md:bg-white md:border md:border-gray-200 rounded-xl md:shadow-sm h-full w-full md:w-80 lg:w-96 flex-shrink-0 transition-all duration-300 z-10">
                    
                    <div class="sticky top-0 z-20 bg-slate-50 md:bg-white pt-1 pb-3 px-1 md:px-3 md:pt-3 border-b border-transparent md:border-gray-100 flex gap-2 overflow-x-auto custom-scrollbar flex-shrink-0">
                        <button data-filter="todas" class="filter-btn flex-1 px-3 py-2 text-xs font-black rounded-xl border text-gray-600 border-gray-200 hover:bg-gray-50 transition whitespace-nowrap shadow-sm uppercase tracking-wider">Todas</button>
                        <button data-filter="abertas" class="filter-btn flex-1 px-3 py-2 text-xs font-black rounded-xl border text-gray-600 border-gray-200 hover:bg-gray-50 transition whitespace-nowrap shadow-sm uppercase tracking-wider">Abertas</button>
                        <button data-filter="pagas" class="filter-btn flex-1 px-3 py-2 text-xs font-black rounded-xl border text-gray-600 border-gray-200 hover:bg-gray-50 transition whitespace-nowrap shadow-sm uppercase tracking-wider">Pagas</button>
                    </div>

                    <div id="comandas-list" class="space-y-2 overflow-y-auto custom-scrollbar flex-1 px-1 md:px-3 pb-4">
                        <div class="loader mx-auto mt-10"></div>
                    </div>
                    <div id="pagination-container" class="p-2 border-t border-gray-100 bg-gray-50/50 flex-shrink-0 flex justify-center items-center rounded-b-xl"></div>
                </div>

                <div id="comanda-detail-container" class="bg-slate-50 md:bg-white border-0 md:border md:border-gray-200 md:rounded-2xl shadow-sm flex-col overflow-hidden hidden md:flex flex-1 min-w-0 transition-all duration-300 h-full z-20">
                    <div class="flex flex-col items-center justify-center h-full text-center text-gray-400">
                        <i class="bi bi-receipt text-5xl opacity-20 mb-3"></i>
                        <p class="text-base font-medium">Selecione uma comanda</p>
                    </div>
                </div>
            </div>
        </section>
    `,Ea(),hs()}function hs(){document.querySelectorAll(".filter-btn").forEach(e=>{e.classList.remove("bg-indigo-600","text-white","border-indigo-600"),e.classList.add("bg-white","text-gray-600","border-gray-200")});const t=document.querySelector(`[data-filter="${x.activeFilter}"]`);t&&(t.classList.remove("bg-white","text-gray-600","border-gray-200"),t.classList.add("bg-indigo-600","text-white","border-indigo-600"))}function Ea(){const t=document.getElementById("cashier-alert-box"),e=document.getElementById("btn-new-sale");x.isCashierOpen?(t&&(t.innerHTML=""),e&&(e.classList.remove("opacity-50","cursor-not-allowed"),e.disabled=!1)):(t&&(t.innerHTML=`
            <div class="bg-amber-50 border-l-4 border-amber-400 p-3 mb-3 rounded-r-xl animate-fade-in mx-1 shadow-sm">
                <div class="flex items-center">
                    <i class="bi bi-exclamation-triangle text-amber-500 mr-3 text-lg"></i>
                    <p class="text-xs md:text-sm text-amber-800 leading-tight">
                        <strong>Caixa Fechado!</strong> Abra o caixa para operações financeiras.
                    </p>
                </div>
            </div>
        `),e&&(e.classList.add("opacity-50","cursor-not-allowed"),e.disabled=!0)),jn()}function jn(){const t=document.getElementById("cashier-controls");t&&(x.isCashierOpen?t.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-emerald-700 bg-emerald-100 py-1.5 px-3 rounded-xl border border-emerald-200 uppercase tracking-widest shadow-sm"><i class="bi bi-unlock-fill"></i> Caixa Aberto</span>
            <button data-action="close-cashier" class="py-1.5 px-4 bg-red-50 text-red-700 border border-red-200 font-bold rounded-xl hover:bg-red-100 text-[10px] transition shadow-sm uppercase tracking-wider">Fechar Caixa</button>
        `:t.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-red-700 bg-red-100 py-1.5 px-3 rounded-xl border border-red-200 uppercase tracking-widest shadow-sm"><i class="bi bi-lock-fill"></i> Caixa Fechado</span>
            <button data-action="open-cashier" class="py-1.5 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 text-[10px] shadow-sm transition uppercase tracking-wider">Abrir Caixa</button>
        `)}function Ia(){const t=document.getElementById("comandas-list"),e=document.getElementById("pagination-container");if(!t)return;if(!x.isCashierOpen&&x.activeFilter==="abertas"){t.innerHTML=`
            <div class="text-center py-12 opacity-60">
                <i class="bi bi-lock text-4xl text-gray-300 mb-3 block"></i>
                <p class="text-sm font-bold text-gray-600 uppercase tracking-widest">Caixa Fechado</p>
                <p class="text-xs text-gray-500 mt-2">Abra o caixa para ver as vendas</p>
            </div>
        `,e&&(e.innerHTML="");return}let a=x.allComandas||[];if(x.activeFilter==="abertas"?a=a.filter(r=>r.status!=="completed"):x.activeFilter==="pagas"&&(a=a.filter(r=>r.status==="completed")),qn(),a.length===0){t.innerHTML='<p class="text-center text-gray-400 py-12 text-sm font-medium border border-dashed border-gray-200 rounded-2xl mx-2">Nenhuma comanda encontrada.</p>',zs(e);return}const s=document.createDocumentFragment();a.forEach(r=>{const o=Ne(r);let i=0;r.status==="completed"&&r.totalAmount!==void 0&&r.totalAmount!==null?i=Number(r.totalAmount):i=o.reduce((P,S)=>P+Number(S.price||0),0);const l=r.loyaltyRedemption||r.discount&&r.discount.reason&&String(r.discount.reason).toLowerCase().includes("fidelidade")?'<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-5 h-5 ml-1.5 text-xs shadow-sm border border-yellow-200" title="Prémio Resgatado">🎁</span>':"",d=String(r.id)===String(x.selectedComandaId),u=new Date(r.startTime),c=u.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),p=u.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),b=r.type==="walk-in"||typeof r.id=="string"&&r.id.startsWith("temp-"),g=r.status==="completed",v=h(r.clientName||"Cliente sem nome"),y=h(r.professionalName||"Sem profissional");let k="";g?k='<span class="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">Paga</span>':b?k='<span class="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">Avulsa</span>':k='<span class="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">Agenda</span>';const T=document.createElement("div");T.className=`comanda-card cursor-pointer border rounded-2xl p-3.5 hover:bg-gray-50 transition-all shadow-sm mb-2 ${d?"ring-2 ring-indigo-500 bg-indigo-50/50 border-transparent":"bg-white border-gray-200"}`,T.dataset.action="select-comanda",T.dataset.comandaId=r.id,T.innerHTML=`
            <div class="flex justify-between items-start mb-2.5 pointer-events-none">
                <p class="font-bold text-gray-900 truncate flex-1 min-w-0 pr-2 text-base">${v}</p>
                <div class="flex items-center flex-shrink-0">
                    <p class="font-black ${g?"text-emerald-600":"text-gray-900"} text-base">R$ ${i.toFixed(2)}</p>
                    ${l}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none gap-2">
                <div class="flex items-center gap-2 min-w-0 flex-1">
                    ${k}
                    <p class="text-xs text-gray-500 truncate font-medium"><i class="bi bi-person mr-1 opacity-50"></i>${y}</p>
                </div>
                <p class="text-xs text-gray-500 font-bold flex-shrink-0"><i class="bi bi-calendar-event mr-1 opacity-50"></i>${p} <span class="text-gray-300 mx-1">|</span> ${c}</p> 
            </div>
        `,s.appendChild(T)}),t.innerHTML="",t.appendChild(s),zs(e)}function zs(t){if(!t)return;t.innerHTML="";const{page:e,total:a,limit:s}=x.paging,r=Math.ceil((a||0)/s);if(r===0)return;const o=document.createElement("div");o.className="flex gap-2 justify-center items-center w-full py-1",o.innerHTML=`
        <button data-page="${e-1}" class="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-sm font-black text-gray-600 shadow-sm flex items-center justify-center ${e<=1?"opacity-50 cursor-not-allowed":""}" ${e<=1?"disabled":""}>&laquo;</button>
        <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mx-2">Pág ${e} de ${r||1}</span>
        <button data-page="${e+1}" class="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-sm font-black text-gray-600 shadow-sm flex items-center justify-center ${e>=r?"opacity-50 cursor-not-allowed":""}" ${e>=r?"disabled":""}>&raquo;</button>
    `,t.appendChild(o),o.querySelectorAll("button[data-page]").forEach(i=>{i.onclick=n=>{n.stopPropagation();const l=parseInt(i.dataset.page,10);l>0&&l<=r&&(x.paging.page=l,xe())}})}function Nn(t,e){const a=`
        <div class="p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50 rounded-t-2xl">
            <button data-action="back-to-items" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner active:scale-90 transition-transform">
                <i class="bi bi-arrow-left text-xl"></i>
            </button>
            <h3 class="font-black text-lg text-gray-800 ml-4 uppercase tracking-wider">Catálogo</h3>
        </div>
    `;e.innerHTML=`
        ${a}
        <div class="flex-grow overflow-y-auto p-4 custom-scrollbar bg-slate-50 relative flex flex-col">
            <div class="relative mb-5 flex-shrink-0">
                <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                <input type="search" id="item-search-input" placeholder="Pesquisar produto ou serviço..." class="w-full pl-12 p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white transition-colors shadow-sm font-bold text-gray-700">
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-grow overflow-y-auto pb-8">
                <div class="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm"><h4 class="font-black mb-3 text-center text-xs uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 py-2.5 rounded-xl"><i class="bi bi-scissors mr-1"></i> Serviços</h4><div id="catalog-service-list" class="space-y-2"></div></div>
                <div class="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm"><h4 class="font-black mb-3 text-center text-xs uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 py-2.5 rounded-xl"><i class="bi bi-box-seam mr-1"></i> Produtos</h4><div id="catalog-product-list" class="space-y-2"></div></div>
                <div class="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm"><h4 class="font-black mb-3 text-center text-xs uppercase tracking-widest text-purple-700 bg-purple-50 border border-purple-100 py-2.5 rounded-xl"><i class="bi bi-boxes mr-1"></i> Pacotes</h4><div id="catalog-package-list" class="space-y-2"></div></div>
            </div>
        </div>
    `;const s=(o="")=>{const i=o.toLowerCase(),n={service:'<i class="bi bi-scissors text-indigo-600"></i>',product:'<i class="bi bi-box-seam text-emerald-600"></i>',package:'<i class="bi bi-boxes text-purple-600"></i>'},l={"catalog-service-list":{items:x.catalog.services,type:"service"},"catalog-product-list":{items:x.catalog.products,type:"product"},"catalog-package-list":{items:x.catalog.packages,type:"package"}};Object.entries(l).forEach(([d,{items:u,type:c}])=>{const p=e.querySelector("#"+d);if(!p)return;const b=u.filter(g=>g.name.toLowerCase().includes(i)).slice(0,50);p.innerHTML=b.map(g=>g.id?`
                <button data-action="select-catalog-item" data-item-type="${c}" data-item-id="${g.id}" class="flex items-center gap-3 w-full p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 shadow-sm transition-all text-left group active:scale-95">
                    <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg border border-gray-100 group-hover:bg-white">${n[c]}</div>
                    <span class="flex-grow text-sm font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-indigo-700">${h(g.name)}</span>
                    <span class="font-black text-sm text-gray-900 bg-gray-100 px-2.5 py-1.5 rounded-lg border border-gray-200 whitespace-nowrap group-hover:bg-white group-hover:text-indigo-700">R$ ${g.price.toFixed(2)}</span>
                </button>
            `:"").join("")||'<p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center py-6 border border-dashed border-gray-300 rounded-xl">Vazio</p>'})};s();const r=e.querySelector("#item-search-input");r&&r.addEventListener("input",Qo(o=>{s(o.target.value)},300))}function Rn(t,e){const a=x.selectedCatalogItem;if(!a){x.viewMode="add-item",te();return}let s=1;const r=`
        <div class="p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50 rounded-t-2xl">
            <button data-action="back-to-add-item" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner active:scale-90 transition-transform">
                <i class="bi bi-arrow-left text-xl"></i>
            </button>
            <h3 class="font-black text-base text-gray-800 ml-4 uppercase tracking-wider">Quantidade</h3>
        </div>
    `;e.innerHTML=`
        ${r}
        <div class="flex-grow flex flex-col items-center justify-center p-6 bg-slate-50 relative">
            <div class="text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-200 w-full max-w-sm">
                <div class="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full mx-auto flex items-center justify-center text-4xl mb-6 border border-indigo-100 shadow-inner">
                    ${a.type==="service"?'<i class="bi bi-scissors"></i>':a.type==="product"?'<i class="bi bi-box-seam"></i>':'<i class="bi bi-boxes"></i>'}
                </div>
                <h3 class="font-black text-2xl text-gray-900 leading-tight mb-3">${h(a.name)}</h3>
                <p class="text-base text-gray-600 font-bold bg-gray-100 inline-block px-4 py-1.5 rounded-full border border-gray-200 shadow-sm">R$ ${a.price.toFixed(2)} / unidade</p>
                
                <div class="my-10 flex items-center justify-center gap-6">
                    <button id="quantity-minus-btn" class="w-16 h-16 rounded-2xl bg-white border border-gray-300 text-3xl font-black text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 shadow-md transition-all active:scale-90 disabled:opacity-30 disabled:hover:bg-white"><i class="bi bi-dash"></i></button>
                    <span id="quantity-display" class="text-6xl font-black w-24 text-center text-indigo-600 bg-indigo-50 rounded-3xl py-2 border border-indigo-100 shadow-inner">${s}</span>
                    <button id="quantity-plus-btn" class="w-16 h-16 rounded-2xl bg-white border border-gray-300 text-3xl font-black text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200 shadow-md transition-all active:scale-90"><i class="bi bi-plus"></i></button>
                </div>
            </div>
        </div>
        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)] w-full flex-shrink-0 z-50 pb-safe relative">
            <button id="confirm-add-qty-btn" class="w-full py-4 bg-indigo-600 text-white font-black text-base rounded-2xl hover:bg-indigo-700 transition-all shadow-lg uppercase tracking-widest active:scale-95 flex justify-center items-center gap-2">
                <i class="bi bi-cart-plus text-xl"></i> Confirmar Adição
            </button>
        </footer>
    `;const o=()=>{e.querySelector("#quantity-display").textContent=s,e.querySelector("#quantity-minus-btn").disabled=s<=1};e.querySelector("#quantity-minus-btn").onclick=()=>{s>1&&(s--,o())},e.querySelector("#quantity-plus-btn").onclick=()=>{s++,o()},e.querySelector("#confirm-add-qty-btn").onclick=async()=>{await Xo(a,s),x.viewMode="items",x.selectedCatalogItem=null,te()},o()}function te(){const t=document.getElementById("comanda-detail-container");if(!t)return;const e=x.allComandas.find(g=>String(g.id)===String(x.selectedComandaId));if(x.viewMode==="checkout"&&e){Fn(e,t);return}if(x.viewMode==="add-item"&&e){Nn(e,t);return}if(x.viewMode==="add-item-qty"&&e){Rn(e,t);return}const a=`
        <div class="md:hidden p-4 border-b border-gray-200 bg-white flex items-center justify-between shadow-sm w-full flex-shrink-0 z-50 rounded-t-2xl">
            <div class="flex items-center">
                <button data-action="back-to-list" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner">
                    <i class="bi bi-arrow-left text-xl"></i>
                </button>
                <h3 class="font-black text-lg text-gray-800 ml-4 uppercase tracking-wider">Comanda</h3>
            </div>
            ${e&&e._hasUnsavedChanges?`
                <button data-action="save-comanda" class="bg-amber-500 text-white font-black text-[10px] uppercase tracking-widest px-3 py-2 rounded-lg animate-pulse shadow-md active:scale-95">Salvar</button>
            `:""}
        </div>
    `;if(!x.isCashierOpen){t.innerHTML=`
            ${a}
            <div class="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
                <div class="bg-gray-50 p-6 rounded-full mb-4 border border-gray-100 shadow-inner">
                    <i class="bi bi-lock text-5xl text-gray-300"></i>
                </div>
                <p class="font-black text-lg text-gray-700 uppercase tracking-widest">Caixa Fechado</p>
                <p class="text-sm text-gray-500 mt-2 max-w-xs">Você precisa abrir o caixa para gerenciar as vendas.</p>
                <button data-action="open-cashier" class="py-3 px-8 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition shadow-md mt-6 text-sm uppercase tracking-wider">Abrir Caixa Agora</button>
            </div>
        `;return}if(!e){t.innerHTML=`
            <div class="hidden md:flex flex-col items-center justify-center h-full text-center text-gray-400">
                <i class="bi bi-receipt text-6xl opacity-20 mb-4"></i>
                <p class="text-lg font-bold text-gray-500 uppercase tracking-widest">Nenhuma Selecionada</p>
                <p class="text-sm mt-2 opacity-70">Clique na lista ao lado para ver os detalhes</p>
            </div>
        `;return}const s=Ne(e),r=e.status==="completed",o=e.type==="walk-in"||typeof e.id=="string"&&e.id.startsWith("temp-"),i=s.reduce((g,v)=>{const y=v._source==="original_service",k=v.id||v.name,T=y?`original-${k}`:`${v.type}-${k}`;return g[T]||(g[T]={...v,quantity:0,sources:[]}),g[T].quantity+=1,v._source&&g[T].sources.push(v._source),g},{}),n=Object.values(i).reduce((g,v)=>g+Number(v.price||0)*v.quantity,0),l=h(e.clientName||"Cliente sem nome"),d=h(e.professionalName||"Profissional não atribuído"),u=e._hasUnsavedChanges,c=r?"":`
        <button data-action="add-item" class="md:hidden fixed bottom-[120px] right-4 w-14 h-14 bg-indigo-600 text-white font-black rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-[60]">
            <i class="bi bi-plus-lg text-2xl"></i>
        </button>
    `,p=`
        <footer class="hidden md:block mt-auto p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] w-full flex-shrink-0 z-20 rounded-b-2xl">
            <div class="flex justify-between items-end mb-4">
                <span class="text-xs text-gray-500 font-bold uppercase tracking-widest">Total a Pagar</span>
                <span class="text-4xl font-black text-gray-900 leading-none">R$ ${n.toFixed(2)}</span>
            </div>
            ${r?`
                <div class="bg-emerald-50 text-emerald-700 text-center py-3.5 rounded-xl font-black border border-emerald-200 flex items-center justify-center gap-2 text-sm shadow-sm">
                    <i class="bi bi-check-circle-fill text-xl"></i> Comanda Paga
                </div>
            `:`
                <div class="grid grid-cols-3 gap-3">
                    <button data-action="add-item" class="col-span-1 py-3 bg-indigo-50 text-indigo-700 font-black rounded-xl hover:bg-indigo-100 transition border border-indigo-200 text-xs shadow-sm uppercase tracking-wider flex justify-center items-center gap-2">
                        <i class="bi bi-plus-lg text-lg"></i> Incluir Item
                    </button>
                    <button data-action="save-comanda" class="col-span-1 py-3 font-black rounded-xl transition text-xs shadow-sm uppercase tracking-wider flex justify-center items-center gap-2 ${u?"bg-amber-500 text-white hover:bg-amber-600 animate-pulse border-transparent":"bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}">
                        <i class="bi bi-save2 text-lg"></i> ${u?"Salvar Alterações":"Salvar"}
                    </button>
                    <button data-action="go-to-checkout" class="col-span-1 py-3 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition shadow-md text-xs uppercase tracking-wider flex justify-center items-center gap-2">
                        <i class="bi bi-credit-card text-lg"></i> Finalizar Pagamento
                    </button>
                </div>
            `}
        </footer>
    `,b=`
        <footer class="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-15px_30px_-5px_rgba(0,0,0,0.1)] z-50 pb-safe">
            <div class="flex justify-between items-end mb-3 px-1">
                <div class="flex flex-col">
                    <span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total da Comanda</span>
                    <span class="text-3xl font-black text-gray-900 leading-none">R$ ${n.toFixed(2)}</span>
                </div>
                ${u?`
                    <button data-action="save-comanda" class="py-2 px-5 font-black rounded-xl text-xs shadow-md uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-transform bg-amber-500 text-white animate-pulse">
                        <i class="bi bi-save2 text-base"></i> Salvar
                    </button>
                `:""}
            </div>
            ${r?`
                <div class="w-full bg-emerald-50 text-emerald-700 text-center py-4 rounded-xl font-black border border-emerald-200 flex items-center justify-center gap-2 text-sm shadow-sm">
                    <i class="bi bi-check-circle-fill text-xl"></i> Comanda Paga
                </div>
            `:`
                <button data-action="go-to-checkout" class="w-full py-4 bg-emerald-600 text-white font-black text-sm rounded-xl hover:bg-emerald-700 transition shadow-lg uppercase tracking-wider flex justify-center items-center gap-2 active:scale-95">
                    Ir para Pagamento <i class="bi bi-arrow-right text-xl"></i>
                </button>
            `}
        </footer>
    `;t.innerHTML=`
        ${a} 
        <div class="flex-grow overflow-y-auto p-4 pb-36 md:pb-6 custom-scrollbar bg-slate-50 relative"> 
            
            <div class="flex justify-between items-start mb-5 border-b border-gray-200 pb-5 bg-white p-4 rounded-2xl shadow-sm">
                <div>
                    <h3 class="text-lg font-black text-gray-900 truncate max-w-[220px] md:max-w-xs leading-tight">${l}</h3>
                    <p class="text-sm text-gray-500 flex items-center gap-1.5 mt-1 font-semibold">
                        <i class="bi bi-person text-indigo-400"></i> ${d}
                    </p>
                    ${o?'<span class="mt-3 inline-block px-2 py-1 text-[10px] font-black bg-blue-100 text-blue-700 rounded-md uppercase tracking-widest border border-blue-200">Venda Avulsa</span>':`<button data-action="go-to-appointment" data-id="${e.id}" data-date="${e.startTime}" class="text-indigo-600 text-xs font-black uppercase tracking-widest hover:text-indigo-800 flex items-center gap-1 mt-3 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 transition-colors w-max shadow-sm">
                             <i class="bi bi-calendar-check"></i> Ver Agenda
                         </button>`}
                </div>
                <div class="flex flex-col gap-2">
                    ${r?`<button data-action="reopen-appointment" data-id="${e.id}" class="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-xl hover:bg-yellow-100 flex items-center justify-center border border-yellow-200 shadow-sm transition-colors" title="Reabrir Comanda"><i class="bi bi-arrow-counterclockwise text-lg"></i></button>`:""}
                    ${o&&!r?`<button data-action="delete-walk-in" data-id="${e.id}" class="w-10 h-10 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 flex items-center justify-center border border-red-200 shadow-sm transition-colors" title="Excluir Venda"><i class="bi bi-trash3 text-lg"></i></button>`:""}
                </div>
            </div>

            <div id="loyalty-container" class="mb-5"></div>

            <div class="space-y-3">
                <h4 class="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 pl-1">Itens Adicionados</h4>
                ${Object.values(i).map(g=>{const v=g.sources&&g.sources.includes("original_service"),y=x.pendingRedemption&&String(x.pendingRedemption.appliedToItemId)===String(g.id),k=g.isReward||y;return`
                    <div class="flex flex-col bg-white p-4 rounded-2xl border border-gray-200 shadow-sm ${k?"border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200":""}">
                        <div class="flex justify-between items-start w-full">
                            <div class="min-w-0 flex-1 pr-3">
                                <p class="text-base font-bold text-gray-900 line-clamp-2 leading-tight">
                                    ${k?"🎁 ":""}
                                    ${h(g.name)}
                                </p>
                                <div class="flex items-center mt-2 gap-2">
                                    ${v?'<span class="text-[9px] font-black uppercase tracking-widest text-indigo-700 bg-indigo-100 px-2 py-1 rounded-md border border-indigo-200">Fixo Agenda</span>':""}
                                    <p class="text-xs text-gray-500 font-bold">${k?'<span class="text-yellow-700 font-black bg-yellow-100 px-2 py-1 rounded-md border border-yellow-200">Resgate</span>':`R$ ${(g.price||0).toFixed(2)} un.`}</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-end gap-3">
                                <span class="font-black text-xl text-gray-900 whitespace-nowrap leading-none">R$ ${(g.price*g.quantity).toFixed(2)}</span>
                                
                                ${r?`<span class="flex items-center justify-center px-4 py-2 bg-gray-100 border border-gray-200 text-gray-700 font-black text-xs uppercase tracking-widest rounded-xl">${g.quantity} Itens</span>`:`
                                    <div class="flex items-center bg-gray-50 rounded-xl border border-gray-200 shadow-inner h-10">
                                        ${v?`<span class="text-[11px] font-black text-gray-500 px-4 uppercase tracking-widest">Qtd: ${g.quantity}</span>`:`<button data-action="decrease-qty" data-item-id="${g.id}" data-item-type="${g.type}" class="w-10 h-full flex items-center justify-center rounded-l-xl bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 border-r border-gray-200 active:scale-95"><i class="bi bi-dash text-xl"></i></button>
                                             <span class="text-sm font-black text-gray-900 w-12 text-center">${g.quantity}</span>
                                             <button data-action="increase-qty" data-item-id="${g.id}" data-item-type="${g.type}" class="w-10 h-full flex items-center justify-center rounded-r-xl bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border-l border-gray-200 active:scale-95"><i class="bi bi-plus text-xl"></i></button>`}
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>
                `}).join("")}
                ${Object.keys(i).length===0?'<div class="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 bg-white rounded-2xl text-sm font-medium">Nenhum item lançado</div>':""}
            </div>
        </div>

        ${c}
        ${p}
        ${b}
    `,!r&&(e.clientId||e.clientName)&&Hn(e,t.querySelector("#loyalty-container"))}function Fn(t,e){const s=Ne(t).reduce((b,g)=>b+Number(g.price||0)*(g.quantity||1),0),r=x.checkoutState,o=r.discount||{type:"real",value:0};let i=0;o.type==="percent"?i=s*o.value/100:i=o.value,i>s&&(i=s);const n=s-i,l=r.payments.reduce((b,g)=>b+g.value,0),d=Math.max(0,n-l);(!r.amountReceived||d>0)&&(r.amountReceived=d.toFixed(2));const u=`
        <div class="md:hidden p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50 rounded-t-2xl">
            <button data-action="back-to-items" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner active:scale-90 transition-transform">
                <i class="bi bi-arrow-left text-xl"></i>
            </button>
            <h3 class="font-black text-lg text-gray-800 ml-4 uppercase tracking-wider">Pagamento</h3>
        </div>
    `,c=`
        <footer class="fixed bottom-0 left-0 right-0 md:relative mt-auto p-4 bg-white border-t border-gray-200 shadow-[0_-15px_30px_-5px_rgba(0,0,0,0.1)] md:shadow-none grid grid-cols-3 gap-3 w-full flex-shrink-0 z-50 pb-safe md:pb-4">
            <button data-action="back-to-items" class="col-span-1 py-4 bg-gray-100 border border-gray-300 text-gray-700 font-black text-sm rounded-xl hover:bg-gray-200 transition shadow-sm uppercase tracking-wider active:scale-95">Voltar</button>
            <button data-action="finalize-checkout" class="col-span-2 py-4 bg-emerald-600 text-white font-black text-sm rounded-xl hover:bg-emerald-700 transition shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider active:scale-95"><i class="bi bi-check2-circle text-xl"></i> Confirmar</button>
        </footer>
    `;e.innerHTML=`
        ${u}
        <div class="flex-grow overflow-y-auto p-4 pb-36 md:pb-6 custom-scrollbar bg-slate-50 relative">
            
            <div class="text-center mb-6 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden">
                <p class="text-[11px] font-black text-gray-400 uppercase tracking-widest relative z-10">Subtotal: <span id="checkout-subtotal-display" class="text-gray-600">R$ ${s.toFixed(2)}</span></p>
                
                <div class="flex flex-col items-center justify-center gap-3 mt-4 mb-3 relative z-10">
                     <div class="flex items-center gap-3">
                         <span class="text-xs font-black text-red-400 uppercase tracking-widest bg-red-50 px-2 py-1 rounded-lg border border-red-100"><i class="bi bi-tag-fill mr-1"></i>Desc</span>
                         <div class="flex border-2 border-gray-300 rounded-xl bg-white overflow-hidden shadow-inner h-12 focus-within:border-indigo-400 transition-colors">
                             <input type="number" id="discount-value" value="${o.value}" class="w-24 p-2 text-center text-lg font-black text-red-500 outline-none bg-transparent" placeholder="0">
                             <select id="discount-type" class="bg-gray-50 text-sm font-black text-gray-600 border-l border-gray-200 px-3 outline-none cursor-pointer hover:bg-gray-100">
                                 <option value="real" ${o.type==="real"?"selected":""}>R$</option>
                                 <option value="percent" ${o.type==="percent"?"selected":""}>%</option>
                             </select>
                         </div>
                     </div>
                     <input type="text" id="discount-reason" class="w-full max-w-[280px] p-3 text-sm border-2 border-gray-200 rounded-xl text-center focus:border-indigo-400 outline-none text-gray-700 bg-gray-50 font-medium transition-colors" placeholder="Motivo do desconto (opcional)" value="${r.discountReason||""}">
                </div>

                <p class="text-5xl font-black text-gray-900 mt-6 mb-2 relative z-10 tracking-tight" id="checkout-total-display">R$ ${n.toFixed(2)}</p>
                
                <div id="checkout-status-msg" class="mt-4 bg-gray-50 py-3 rounded-xl border border-gray-100 relative z-10 shadow-inner">
                    ${d<=.01?'<p class="text-emerald-500 font-black text-base uppercase tracking-widest"><i class="bi bi-check2-circle text-2xl mr-2 align-middle"></i> Totalmente Pago</p>':`<p class="text-red-500 font-bold text-sm uppercase tracking-widest">Faltam: <span id="checkout-remaining-display" class="font-black text-xl text-red-600 ml-1">R$ ${d.toFixed(2)}</span></p>`}
                </div>
            </div>

            <div class="space-y-3 mb-6">
                ${r.payments.map((b,g)=>`
                    <div class="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-3">
                             <div class="bg-gray-100 px-4 py-2 rounded-xl border border-gray-200">
                                <span class="font-black text-xs uppercase tracking-widest text-gray-700">${b.method}</span>
                             </div>
                             ${b.installments>1?`<span class="text-[10px] font-black bg-purple-100 text-purple-700 px-2.5 py-1.5 rounded-lg border border-purple-200 shadow-sm">${b.installments}x</span>`:""}
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-black text-xl text-gray-900">R$ ${b.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${g}" class="text-gray-400 hover:text-red-500 hover:bg-red-50 w-10 h-10 rounded-xl flex items-center justify-center transition-colors border border-transparent hover:border-red-200 active:scale-90"><i class="bi bi-trash3 text-lg"></i></button>
                        </div>
                    </div>
                `).join("")}
            </div>

            ${d>.01?`
            <div class="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-3">Selecionar Pagamento</label>
                
                <div class="grid grid-cols-2 gap-3 mb-5">
                    ${["dinheiro","pix","debito","credito","crediario"].map(b=>`
                        <button data-action="select-method" data-method="${b}" class="py-4 px-2 rounded-xl border text-[11px] font-black uppercase tracking-wider transition-colors active:scale-95 ${r.selectedMethod===b?"bg-indigo-600 text-white border-indigo-600 shadow-lg":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-indigo-50 hover:border-indigo-200"}">
                            ${b==="pix"?'<i class="bi bi-qr-code mr-1"></i> ':""}
                            ${b==="dinheiro"?'<i class="bi bi-cash mr-1"></i> ':""}
                            ${b==="debito"||b==="credito"?'<i class="bi bi-credit-card mr-1"></i> ':""}
                            ${b==="crediario"?'<i class="bi bi-journal-text mr-1"></i> ':""}
                            ${b}
                        </button>
                    `).join("")}
                </div>
                
                ${["credito","crediario"].includes(r.selectedMethod)?`
                    <div class="mb-5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Parcelamento</label>
                        <select id="checkout-installments" class="w-full p-3.5 border-2 border-gray-200 rounded-xl text-sm font-black text-gray-700 bg-gray-50 outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                            ${Array.from({length:12},(b,g)=>`<option value="${g+1}" ${r.installments===g+1?"selected":""}>${g+1} Parcela${g>0?"s":""}</option>`).join("")}
                        </select>
                    </div>
                `:""}

                <div class="flex items-end gap-3 mt-2">
                    <div class="flex-grow relative">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Valor a Pagar Agora</label>
                        <span class="absolute left-4 bottom-3.5 text-gray-400 font-black text-xl">R$</span>
                        <input type="number" id="checkout-amount" step="0.01" class="w-full py-3.5 pl-12 pr-4 border-2 border-gray-300 rounded-xl text-2xl font-black text-gray-900 outline-none focus:border-indigo-500 shadow-inner transition-colors" value="${d.toFixed(2)}">
                    </div>
                    <button data-action="add-payment-checkout" class="h-[54px] px-6 bg-gray-800 text-white font-black text-sm rounded-xl hover:bg-gray-900 transition shadow-lg uppercase tracking-wider active:scale-95 flex items-center justify-center gap-2">
                        OK <i class="bi bi-plus-lg"></i>
                    </button>
                </div>
            </div>
            `:""}
        </div>

        ${c}
    `;const p=()=>{const b=x.checkoutState.discount.type,g=x.checkoutState.discount.value;let v=b==="percent"?s*g/100:g;v>s&&(v=s);const y=s-v,k=x.checkoutState.payments.reduce((q,N)=>q+N.value,0),T=Math.max(0,y-k),P=e.querySelector("#checkout-total-display");P&&(P.textContent=`R$ ${y.toFixed(2)}`);const S=e.querySelector("#checkout-status-msg");S&&(T<=.01?S.innerHTML='<p class="text-emerald-500 font-black text-base uppercase tracking-widest"><i class="bi bi-check2-circle text-2xl mr-2 align-middle"></i> Totalmente Pago</p>':S.innerHTML=`<p class="text-red-500 font-bold text-sm uppercase tracking-widest">Faltam: <span id="checkout-remaining-display" class="font-black text-xl text-red-600 ml-1">R$ ${T.toFixed(2)}</span></p>`);const L=e.querySelector("#checkout-amount");L&&T>0&&document.activeElement!==L&&(L.value=T.toFixed(2))};e.querySelector("#discount-value")?.addEventListener("input",b=>{const g=parseFloat(b.target.value)||0;x.checkoutState.discount.value=g,p()}),e.querySelector("#discount-type")?.addEventListener("change",b=>{x.checkoutState.discount.type=b.target.value,p()}),e.querySelector("#discount-reason")?.addEventListener("input",b=>{x.checkoutState.discountReason=b.target.value}),e.querySelector("#checkout-amount")?.addEventListener("input",b=>{x.checkoutState.amountReceived=b.target.value}),e.querySelector("#checkout-installments")?.addEventListener("change",b=>{x.checkoutState.installments=parseInt(b.target.value,10)})}async function Hn(t,e){if(!e)return;const a=x.loyaltySettings;if(!a||!a.enabled)return;let s=null;try{if(t.clientId)s=await So(m.establishmentId,t.clientId);else if(t.clientName){const n=await ut(m.establishmentId,t.clientName,1);n&&n.length>0&&(s=n[0])}}catch(n){console.warn("Erro ao buscar dados de fidelidade",n)}if(!s||s.loyaltyPoints===void 0)return;const r=Number(s.loyaltyPoints)||0,i=(a.tiers||a.rewards||[]).filter(n=>{const l=Number(n.costPoints||n.points||0);return l>0&&r>=l});if(i.length>0){const n=document.createElement("div");n.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-4 shadow-sm flex justify-between items-center animate-fade-in",n.innerHTML=`
            <div class="flex items-center gap-3">
                <div class="bg-white w-10 h-10 rounded-full text-yellow-500 shadow-sm border border-yellow-100 flex items-center justify-center">
                    <i class="bi bi-star-fill text-lg"></i>
                </div>
                <div>
                    <p class="text-xs font-black uppercase tracking-widest text-yellow-800">Prémio Disponível!</p>
                    <p class="text-[11px] text-yellow-700 font-bold mt-0.5">Saldo: ${r} pontos</p>
                </div>
            </div>
        `;const l=document.createElement("button");l.innerHTML="<i class='bi bi-gift mr-1.5'></i> Resgatar",l.className="text-[10px] font-black uppercase tracking-wider bg-yellow-500 text-white px-4 py-2.5 rounded-xl shadow-md hover:bg-yellow-600 transition-colors active:scale-95",l.onclick=()=>On(i,t),n.appendChild(l),e.innerHTML="",e.appendChild(n)}}function On(t,e){const a=`
        <div class="space-y-3">
            <p class="text-sm text-gray-500 mb-4 font-medium text-center">Pontos suficientes para resgatar:</p>
            <div class="space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
                ${t.map(o=>{const i=o.costPoints||o.points||0,n=o.name||o.reward,l=o.type||"money",d=o.discount?parseFloat(o.discount).toFixed(2):"0.00";let u="",c="bg-gray-100 text-gray-600";switch(l){case"service":u="Serviço",c="bg-indigo-100 text-indigo-700";break;case"product":u="Produto",c="bg-green-100 text-green-700";break;case"package":u="Pacote",c="bg-purple-100 text-purple-700";break;case"money":default:u="Valor",c="bg-yellow-100 text-yellow-700";break}return`
                    <button data-action="select-reward" data-reward-id="${o.id||n}" class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group shadow-sm text-left active:scale-95">
                        <div class="flex-1 min-w-0 pr-3">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border border-white/0 group-hover:border-yellow-200 ${c}">${u}</span>
                                <p class="font-black text-gray-900 group-hover:text-yellow-700 text-base truncate">${h(n)}</p>
                            </div>
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Custo: ${i} pontos</p>
                        </div>
                        <div class="flex-shrink-0">
                            <span class="block text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 shadow-sm">Desc. R$ ${d}</span>
                        </div>
                    </button>
                `}).join("")}
            </div>
        </div>
    `,{modalElement:s,close:r}=Me({title:"🎁 Resgatar Prémio",contentHTML:a,maxWidth:"max-w-md"});s.addEventListener("click",o=>{const i=o.target.closest('[data-action="select-reward"]');if(i){const n=i.dataset.rewardId,l=t.find(d=>d.id&&d.id==n||(d.name||d.reward)==n);l&&(zn(l,e),r())}})}async function zn(t,e){const a=Number(t.costPoints||t.points||0),s=t.name||t.reward,r=t.type||"money";if(r==="money"){const l=parseFloat(t.discount)||0;if(l<=0){f("Erro","O valor do desconto configurado é inválido.","error");return}x.checkoutState.discount={type:"real",value:l},x.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,x.pendingRedemption={rewardId:t.id||null,name:s,cost:a,type:"money"},f("Sucesso",`Prémio "${s}" resgatado! Desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),te();return}const o=Ne(e),i=t.itemId?String(t.itemId):null;if(!i){f("Erro de Configuração",`O prémio "${s}" não tem um item vinculado nas configurações.`,"error");return}const n=o.find(l=>{const d=l.id?String(l.id):null,u=l.serviceId?String(l.serviceId):l.service_id?String(l.service_id):null,c=l.productId?String(l.productId):l.product_id?String(l.product_id):null;return r==="service"?d===i||u===i:r==="product"?d===i||c===i:r==="package"?d===i:!1});if(n){let l=parseFloat(t.discount);(!l||l<=0)&&(l=parseFloat(n.price||0)),x.checkoutState.discount={type:"real",value:l},x.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,x.pendingRedemption={rewardId:t.id||null,name:s,cost:a,type:r,appliedToItemId:n.id},f("Sucesso",`Prémio "${s}" resgatado! Item encontrado e desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),te()}else f("Item Não Encontrado",`Para resgatar o prémio "${s}", o ${r==="service"?"serviço":r==="product"?"produto":"pacote"} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`,"warning")}async function Ua(t=null){if(!x.isCashierOpen)return f("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");if(!m.professionals||m.professionals.length===0)try{m.professionals=await Ee(m.establishmentId)}catch{return f("Erro","Não foi possível carregar profissionais.","error")}const a=`
        <form id="new-sale-form" class="space-y-4">
            <div class="relative">
                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 pl-1">Buscar Cliente</label>
                <i class="bi bi-search absolute left-4 top-[36px] text-gray-400 text-base"></i>
                <input type="text" id="client-search" class="w-full pl-11 p-3.5 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-gray-800 transition-colors shadow-inner" placeholder="Digite nome ou telefone..." autocomplete="off">
                <input type="hidden" id="selected-client-id" required>
                <ul id="client-suggestions" class="hidden absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-2xl max-h-56 overflow-y-auto mt-2 custom-scrollbar"></ul>
                <button type="button" data-action="new-client-from-sale" class="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest mt-3 flex items-center justify-center w-full gap-1.5 transition-colors bg-indigo-50 hover:bg-indigo-100 py-3 rounded-xl border border-indigo-100"><i class="bi bi-person-plus-fill text-lg"></i> Cadastrar Novo Cliente Rápido</button>
            </div>
            <div class="pt-2 border-t border-gray-100">
                <label for="new-sale-professional" class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 pl-1">Profissional Atendente</label>
                <select id="new-sale-professional" required class="w-full p-3.5 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white text-sm font-bold text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-inner">
                    <option value="">-- Selecione o profissional --</option>
                    ${m.professionals.map(l=>`<option value="${l.id}">${h(l.name)}</option>`).join("")}
                </select>
            </div>
            <div class="pt-4">
                <button type="submit" id="btn-start-sale" class="w-full bg-indigo-600 text-white font-black text-sm uppercase tracking-widest py-4 rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 transition shadow-lg flex items-center justify-center gap-2 active:scale-95">
                    <i class="bi bi-cart-plus text-xl"></i> Iniciar Venda
                </button>
            </div>
        </form>
    `,{modalElement:s}=Me({title:"Nova Venda Avulsa",contentHTML:a,maxWidth:"max-w-sm"}),r=s.querySelector("#client-search"),o=s.querySelector("#client-suggestions"),i=s.querySelector("#selected-client-id");t&&(i.value=t.id,r.value=`${t.name} (${t.phone||"Sem tel"})`,r.classList.add("bg-emerald-50","border-emerald-300","text-emerald-800")),r.addEventListener("input",Qo(async l=>{const d=l.target.value.trim();if(i.value="",r.classList.remove("bg-emerald-50","border-emerald-300","text-emerald-800"),d.length<2){o.classList.add("hidden");return}try{o.innerHTML='<li class="p-4 text-sm text-gray-500 text-center"><div class="loader-small mx-auto"></div></li>',o.classList.remove("hidden");const u=await ut(m.establishmentId,d,10);u.length===0?o.innerHTML='<li class="p-5 text-xs font-bold text-gray-400 text-center uppercase tracking-widest">Nenhum cliente encontrado</li>':o.innerHTML=u.map(c=>`<li data-client-id="${c.id}" data-client-name="${c.name}" data-client-phone="${c.phone}" class="p-4 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors flex flex-col justify-center"><div class="font-bold text-sm text-gray-800">${h(c.name)}</div><div class="text-xs font-medium text-gray-500 mt-1"><i class="bi bi-telephone opacity-50 mr-1.5"></i>${c.phone||"Sem telefone"}</div></li>`).join("")}catch{o.classList.add("hidden")}},400)),o.addEventListener("click",l=>{const d=l.target.closest("li[data-client-id]");d&&(i.value=d.dataset.clientId,i.dataset.name=d.dataset.clientName,i.dataset.phone=d.dataset.clientPhone,r.value=`${d.dataset.clientName}`,r.classList.add("bg-emerald-50","border-emerald-300","text-emerald-800"),o.classList.add("hidden"))}),document.addEventListener("click",l=>{!r.contains(l.target)&&!o.contains(l.target)&&o.classList.add("hidden")}),s.querySelector("#new-sale-form").addEventListener("submit",Qn);const n=s.querySelector('[data-action="new-client-from-sale"]');n&&n.addEventListener("click",l=>{l.preventDefault(),s.style.display="none",Vn()})}function Vn(){Me({title:"Cadastrar Cliente Rápido",contentHTML:`
        <form id="comandas_clientRegistrationForm" class="flex flex-col h-full bg-white p-2 sm:p-5 rounded-2xl">
            <div class="grid grid-cols-1 gap-4 mb-5">
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 pl-1">Nome Completo *</label>
                    <input type="text" id="regClientName" required class="w-full p-3.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner bg-gray-50 focus:bg-white transition-colors">
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 pl-1">WhatsApp (Apenas números) *</label>
                    <input type="tel" id="regClientPhone" required class="w-full p-3.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner bg-gray-50 focus:bg-white transition-colors" placeholder="Ex: 912345678">
                </div>
            </div>
            <button type="submit" class="w-full py-4 bg-emerald-600 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition shadow-lg flex items-center justify-center gap-2 active:scale-95">
                <i class="bi bi-save2 text-lg"></i> Salvar e Selecionar
            </button>
        </form>
    `,maxWidth:"max-w-sm"});const e=document.getElementById("comandas_clientRegistrationForm");e&&e.addEventListener("submit",_n)}async function _n(t){t.preventDefault();const e=document.getElementById("comandas_clientRegistrationForm");if(!e)return;const a=e.querySelector("#regClientName"),r=e.querySelector("#regClientPhone").value.replace(/\D/g,"");if(!a.value||!r)return f("Erro","Nome e Telefone são obrigatórios.","error");try{const o=await _i(m.establishmentId,r);if(o)f("Atenção","Cliente já cadastrado.","info"),document.getElementById("genericModal").style.display="none",Ua(o);else{const i=await Io({establishmentId:m.establishmentId,name:a.value,phone:r});f("Sucesso","Cliente cadastrado!","success"),document.getElementById("genericModal").style.display="none",Ua(i)}}catch(o){f("Erro",o.message,"error")}}async function Un(){const t=`
        <form id="open-cashier-form" class="space-y-4 bg-white p-2 sm:p-5 rounded-2xl">
            <div>
                <label for="initial-amount" class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 text-center">Fundo de Caixa Inicial (Troco)</label>
                <div class="relative max-w-xs mx-auto">
                    <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-black text-2xl">R$</span>
                    <input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-4 pl-14 border-2 border-gray-300 rounded-2xl text-3xl font-black text-gray-900 bg-gray-50 focus:bg-white focus:border-emerald-500 outline-none shadow-inner text-center transition-colors" placeholder="0.00" value="0.00">
                </div>
            </div>
            <button type="submit" class="w-full bg-emerald-600 text-white font-black text-sm uppercase tracking-widest py-4 rounded-2xl hover:bg-emerald-700 transition shadow-lg mt-6 flex items-center justify-center gap-2 active:scale-95"><i class="bi bi-unlock-fill text-xl"></i> Confirmar Abertura</button>
        </form>
    `,{modalElement:e}=Me({title:"Abrir Caixa",contentHTML:t,maxWidth:"max-w-xs"});e.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const s=parseFloat(document.getElementById("initial-amount").value);if(isNaN(s)||s<0)return f("Valor Inválido","Insira um valor válido.","error");try{const r=await Cn({establishmentId:m.establishmentId,initialAmount:parseFloat(s.toFixed(2))});x.isCashierOpen=!0,x.activeCashierSessionId=r.id,document.getElementById("genericModal").style.display="none",f("Sucesso!",`Caixa aberto (R$ ${s.toFixed(2)})`,"success"),Ea(),await xe()}catch(r){f("Erro",`Falha ao abrir caixa: ${r.message}`,"error")}})}async function Wn(){const t=x.activeCashierSessionId;if(t)try{const e=await Pn(t),a=`
            <form id="close-cashier-form" class="space-y-4 bg-white p-2 sm:p-5 rounded-2xl">
                <div class="grid grid-cols-2 gap-3 text-center mb-4">
                    <div class="bg-blue-50 p-3 rounded-2xl border border-blue-100 shadow-inner"><p class="text-[9px] text-blue-500 uppercase font-black tracking-widest mb-1">Abertura</p><p class="text-base font-black text-blue-700">R$ ${e.initialAmount.toFixed(2)}</p></div>
                    <div class="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 shadow-inner"><p class="text-[9px] text-emerald-500 uppercase font-black tracking-widest mb-1">Vendas Dinheiro</p><p class="text-base font-black text-emerald-700">R$ ${e.cashSales.toFixed(2)}</p></div>
                </div>
                <div class="bg-gray-900 text-white p-5 rounded-3xl text-center shadow-xl mb-6 border border-gray-800">
                    <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Esperado em Gaveta</p>
                    <p class="text-5xl font-black tracking-tight text-white drop-shadow-md">R$ ${e.expectedAmount.toFixed(2)}</p>
                </div>
                
                <div class="bg-gray-50 p-5 rounded-3xl border border-gray-200 shadow-inner">
                    <label for="final-amount" class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 text-center">Informar Contagem Final Real (Gaveta)</label>
                    <div class="relative max-w-xs mx-auto">
                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-black text-2xl">R$</span>
                        <input type="number" step="0.01" min="0" id="final-amount" required class="w-full p-4 pl-14 border-2 border-gray-300 rounded-2xl text-3xl font-black text-gray-900 bg-white focus:border-red-500 outline-none shadow-sm text-center transition-colors" placeholder="0.00" value="${e.expectedAmount.toFixed(2)}">
                    </div>
                </div>
                <button type="submit" class="w-full bg-red-600 text-white font-black text-sm uppercase tracking-widest py-4 rounded-2xl hover:bg-red-700 transition shadow-lg mt-4 flex items-center justify-center gap-2 active:scale-95"><i class="bi bi-lock-fill text-xl"></i> Confirmar Fecho</button>
            </form>
        `,{modalElement:s}=Me({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-sm"});s.querySelector("#close-cashier-form").addEventListener("submit",async r=>{r.preventDefault();const o=parseFloat(document.getElementById("final-amount").value);if(isNaN(o)||o<0)return f("Valor Inválido","Insira um valor final válido.","error");try{await Dn(t,o),x.isCashierOpen=!1,x.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",Ea(),await xe(),f("Sucesso!","Caixa fechado com sucesso!","success")}catch(i){f("Erro",`Falha ao fechar caixa: ${i.message}`,"error")}})}catch(e){f("Erro",`Falha ao carregar relatório: ${e.message}`,"error")}}async function Jn(t){if(x.activeFilter===t)return;x.activeFilter=t,x.paging.page=1,hs(),Xe(),x.selectedComandaId=null,x.viewMode="items";const e=document.getElementById("comandas-list");e&&(e.innerHTML='<div class="loader mx-auto mt-10"></div>'),await xe()}function Yo(t){x.selectedComandaId=String(t),x.viewMode="items",x.pendingRedemption=null,x.checkoutState.discount={type:"real",value:0},x.checkoutState.discountReason="",Ia(),An(),te()}async function Xo(t,e){const a=x.allComandas.find(o=>String(o.id)===String(x.selectedComandaId));if(!a)return;if(!t.id||String(t.id)==="undefined"){f("Erro","Item sem identificador. Não foi possível adicionar.","error");return}const s=parseFloat(t.price)||0,r=Array(e).fill(0).map(()=>{const o={id:String(t.id),name:t.name,price:s,type:t.type,isReward:t.isReward||!1,pointsCost:t.pointsCost||0};return t.type==="product"?(o.productId=o.id,o.product_id=o.id):t.type==="service"&&(o.serviceId=o.id,o.service_id=o.id),o});a.comandaItems=a.comandaItems||[],a.comandaItems.push(...r),a._cachedItems=null,a._hasUnsavedChanges=!0,te()}async function Vs(t,e){const a=x.allComandas.find(o=>String(o.id)===String(x.selectedComandaId));if(!a)return;let s=!1,r=(a.comandaItems||[]).findIndex(o=>String(o.id)===String(t)&&o.type===e);r>-1&&(a.comandaItems.splice(r,1),s=!0),s&&(a._cachedItems=null,a._hasUnsavedChanges=!0,te())}async function Gn(t){if(x.isProcessing)return;const e=Ne(t),a=e.reduce((y,k)=>y+Number(k.price||0)*(k.quantity||1),0),s=x.checkoutState.discount||{type:"real",value:0};let r=s.type==="percent"?a*s.value/100:s.value;r>a&&(r=a);const o=a-r,{payments:i}=x.checkoutState,n=i.reduce((y,k)=>y+k.value,0),l=o-n;if(l>.01){if(!await Y("Pagamento Parcial",`O valor de R$ ${l.toFixed(2)} não foi pago. Deseja registrar como DÍVIDA (Fiado) no cadastro do cliente?`))return;i.push({method:"fiado",value:l,installments:1})}x.isProcessing=!0;const d=t.type==="appointment",u=e;let c=0;const p=x.loyaltySettings;p&&p.enabled&&(c=parseInt(p.pointsPerVisit||1,10));const b={...s,reason:x.checkoutState.discountReason||""},g={payments:i,totalAmount:Number(o),items:u,cashierSessionId:x.activeCashierSessionId,loyaltyPointsEarned:c,discount:b,loyaltyRedemption:x.pendingRedemption},v=document.createElement("div");v.className="fixed inset-0 bg-gray-900/60 z-[999999] flex items-center justify-center backdrop-blur-sm",v.innerHTML='<div class="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center"><div class="loader mb-5"></div><p class="text-sm font-black text-gray-800 uppercase tracking-widest mt-2">Processando...</p></div>',document.body.appendChild(v);try{d?await ai(t.id,g):(g.establishmentId=m.establishmentId,g.clientId=t.clientId,g.clientName=t.clientName,g.professionalId=t.professionalId,t.clientPhone&&(g.clientPhone=t.clientPhone),await Vo(g));let y="Venda finalizada com sucesso!";c>0&&(y+=` Cliente ganhou ${c} pontos!`),f("Sucesso!",y,"success"),Xe(),x.selectedComandaId=null,x.viewMode="items",x.pendingRedemption=null,await xe()}catch(y){f("Erro no Checkout",y.message,"error")}finally{document.body.contains(v)&&document.body.removeChild(v),x.isProcessing=!1}}async function Qn(t){t.preventDefault();const e=document.getElementById("selected-client-id"),a=document.getElementById("new-sale-professional").value,s=e.value,r=document.getElementById("client-search").value,o=e.dataset.phone||"";if(!s)return f("Erro","Selecione um cliente válido.","error");const i=m.professionals.find(l=>l.id===a);if(!i)return f("Erro","Selecione um profissional válido.","error");const n={id:`temp-${Date.now()}`,type:"walk-in",clientId:s,clientName:r.split("(")[0].trim(),clientPhone:o,professionalId:i.id,professionalName:i.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};x.allComandas.unshift(n),x.selectedComandaId=String(n.id),x.viewMode="items",document.getElementById("genericModal").style.display="none",x.activeFilter==="pagas"&&(x.activeFilter="abertas"),hs(),Yo(n.id)}async function xe(){const t=document.getElementById("comandas-list");(!t.hasChildNodes()||t.innerHTML.includes("loader"))&&(t.innerHTML='<div class="loader mx-auto mt-10"></div>');let e=x.filterStartDate,a=x.filterEndDate,s;e&&a&&e!==a?s={startDate:e,endDate:a}:s={startDate:e,endDate:a,date:e};try{const r=Ln(),o=wn(m.establishmentId,s,x.paging.page,x.paging.limit),i=je(m.establishmentId),[n,l,d]=await Promise.all([r,o,i]);if(x.establishmentConfig=d||{},x.isCashierOpen=!!n,x.activeCashierSessionId=n?n.id:null,Ea(),d&&d.loyaltyProgram&&(x.loyaltySettings=d.loyaltyProgram),x.allComandas=l.data||l||[],x.paging.total=l.total||x.allComandas.length,x.catalog.services.length===0){const[u,c,p,b]=await Promise.all([pt(m.establishmentId),bt(m.establishmentId),xs(m.establishmentId),Ee(m.establishmentId)]);x.catalog={services:u,products:c,packages:p},m.professionals=b}Ia(),te()}catch(r){f("Erro",`Não foi possível carregar os dados: ${r.message}`,"error")}}async function Yn(t={}){Ge=document.getElementById("content"),x.selectedComandaId=t.selectedAppointmentId?String(t.selectedAppointmentId):null,x.viewMode="items",x.selectedCatalogItem=null;const e=Ba("hoje");if(x.filterStartDate=e.start,x.filterEndDate=e.end,x.filterPreset="hoje",x.showHistoryPanel=!1,Nt(),_e&&(Ge.removeEventListener("click",_e),Ge.removeEventListener("change",_e)),_e=async a=>{const s=a.target.closest("[data-action], [data-filter], [data-comanda-id]");if(s){if(s.matches("[data-filter]"))a.preventDefault(),Jn(s.dataset.filter);else if(s.matches("[data-comanda-id]")){if(a.preventDefault(),a.target.closest('[data-action="go-to-appointment"]')){a.stopPropagation();return}Yo(s.dataset.comandaId)}else if(s.matches("[data-action]")){a.preventDefault();const r=s.dataset.action,o=String(s.dataset.id||x.selectedComandaId),i=x.allComandas.find(n=>String(n.id)===o);switch(r){case"toggle-history":if(x.showHistoryPanel=!x.showHistoryPanel,x.showHistoryPanel&&x.activeFilter==="abertas"&&(x.activeFilter="todas"),Nt(),!x.showHistoryPanel){x.filterPreset="hoje";const I=Ba("hoje");x.filterStartDate=I.start,x.filterEndDate=I.end,await xe()}break;case"set-period":const n=s.dataset.period;if(x.filterPreset=n,n!=="custom"){const I=Ba(n);x.filterStartDate=I.start,x.filterEndDate=I.end,Nt(),x.paging.page=1,f("Buscando...",`Período: ${I.start.split("-").reverse().join("/")} a ${I.end.split("-").reverse().join("/")}`,"info"),await xe()}else Nt();break;case"apply-custom-dates":const l=document.getElementById("filter-start-date").value,d=document.getElementById("filter-end-date").value;l&&d?(x.filterStartDate=l,x.filterEndDate=d,x.paging.page=1,f("Buscando...","Período personalizado aplicado.","info"),await xe()):f("Atenção","Preencha a data inicial e final.","warning");break;case"back-to-list":Xe(),x.selectedComandaId=null,x.selectedCatalogItem=null,document.querySelectorAll(".comanda-card").forEach(I=>I.classList.remove("ring-2","ring-indigo-500","bg-indigo-50/50","border-transparent")),document.querySelectorAll(".comanda-card").forEach(I=>I.classList.add("bg-white","border-gray-200")),te();break;case"new-sale":Ua();break;case"add-item":if(!x.isCashierOpen)return f("Caixa Fechado","Abra o caixa primeiro.","error");x.viewMode="add-item",te();break;case"back-to-items":x.viewMode="items",te();break;case"back-to-add-item":x.viewMode="add-item",x.selectedCatalogItem=null,te();break;case"select-catalog-item":const{itemType:u,itemId:c}=s.dataset,b=(x.catalog[u+"s"]||[]).find(I=>String(I.id)===String(c));b&&(x.selectedCatalogItem={...b,type:u},x.viewMode="add-item-qty",te());break;case"open-cashier":Un();break;case"close-cashier":await Wn();break;case"view-sales-report":se("sales-report-section");break;case"go-to-checkout":await Os(i,"checkout");break;case"save-comanda":await Os(i,"stay");break;case"select-method":x.checkoutState.selectedMethod=s.dataset.method,x.checkoutState.installments=1,te();break;case"add-payment-checkout":const g=document.getElementById("checkout-amount");let v=parseFloat(g.value);const k=Ne(i).reduce((I,D)=>I+(D.price||0),0),T=x.checkoutState.discount||{type:"real",value:0};let P=T.type==="percent"?k*T.value/100:T.value;P>k&&(P=k);const S=k-P,L=x.checkoutState.payments.reduce((I,D)=>I+D.value,0),q=S-L;if(isNaN(v)||v<=0){f("Valor inválido","Insira um valor maior que zero.","error");break}if(v>q+.05){f("Valor inválido","Valor excede o restante.","error");break}const N={method:x.checkoutState.selectedMethod,value:v};["credito","crediario"].includes(x.checkoutState.selectedMethod)&&x.checkoutState.installments>1&&(N.installments=x.checkoutState.installments),x.checkoutState.payments.push(N),x.checkoutState.selectedMethod="dinheiro",x.checkoutState.installments=1,x.checkoutState.amountReceived="",te();break;case"remove-payment-checkout":const E=parseInt(s.dataset.index,10);x.checkoutState.payments.splice(E,1),te();break;case"finalize-checkout":await Gn(i);break;case"increase-qty":{const I=s.dataset.itemId,D=s.dataset.itemType;if(!I||I==="undefined"||I==="null"){f("Erro","Item inválido.","error");return}let O=Ne(i).find(Z=>String(Z.id)===String(I)&&Z.type===D);O||(O=(x.catalog[D+"s"]||[]).find(K=>String(K.id)===String(I)));const U=O?{id:O.id,name:O.name,price:Number(O.price),type:O.type}:{id:I,name:"Item",price:0,type:D};await Xo(U,1);break}case"decrease-qty":await Vs(s.dataset.itemId,s.dataset.itemType);break;case"remove-item":await Vs(s.dataset.itemId,s.dataset.itemType);break;case"reopen-appointment":{if(await Y("Reabrir Comanda","Tem certeza? O pagamento será estornado."))try{await ti(o);const D=x.allComandas.findIndex(R=>String(R.id)===o);D!==-1&&(x.allComandas[D].status="confirmed",delete x.allComandas[D].transaction),x.selectedComandaId=null,Xe(),await xe(),f("Sucesso!","Comanda reaberta.","success")}catch(D){f("Erro",D.message,"error")}break}case"go-to-appointment":{se("agenda-section",{scrollToAppointmentId:s.dataset.id,targetDate:new Date(s.dataset.date)});break}case"delete-walk-in":{if(await Y("Excluir Venda","Confirma a exclusão desta venda avulsa?"))if(o.startsWith("temp-"))x.allComandas=x.allComandas.filter(D=>String(D.id)!==o),x.selectedComandaId=null,Ia(),te(),Xe();else try{await _o(o),f("Sucesso","Venda excluída.","success"),x.selectedComandaId=null,Xe(),await xe()}catch(D){f("Erro",D.message,"error")}break}}}}},Ge.addEventListener("click",_e),Ge.addEventListener("change",_e),t.initialFilter&&(t.initialFilter==="finalizadas"?x.activeFilter="pagas":x.activeFilter="abertas"),t.selectedAppointmentId&&(x.selectedComandaId=String(t.selectedAppointmentId)),t.filterDate){const a=new Date(t.filterDate).toISOString().split("T")[0];x.filterStartDate=a,x.filterEndDate=a,x.filterPreset="custom",x.showHistoryPanel=!0}await xe()}const Wa=new Date,Xn=new Date(Wa.getFullYear(),Wa.getMonth(),1);let M={establishments:[],filterEstablishmentIds:new Set,startDate:Xn.toISOString().split("T")[0],endDate:Wa.toISOString().split("T")[0],currentTab:"financeiro",drillDownMonth:null,data:{financeiro:null,agenda:null,clientes:null,vendas:null,estoque:null},charts:{}};const Ja=document.getElementById("content");let Rt=null;function le(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function Te(t){if(!t)return"--/--/----";const e=t.split("T")[0].split("-");return e.length===3?`${e[2]}/${e[1]}/${e[0]}`:t}function De(t){return t?typeof t.toDate=="function"?t.toDate():typeof t=="string"||typeof t=="number"?new Date(t):new Date:new Date(0)}function qt(t){M.charts[t]&&(M.charts[t].destroy(),M.charts[t]=null)}async function Zn(){try{const e=(await ye().catch(()=>({matrizes:[]}))).matrizes||[];M.establishments=[],e.forEach(a=>{M.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>M.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),M.filterEstablishmentIds.size===0&&M.filterEstablishmentIds.add(m.establishmentId)}catch(t){console.error("Erro ao buscar hierarquia de empresas",t)}Kn(),il(),await ht()}function Kn(){const t=M.establishments.map(e=>`
        <label class="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 border ${M.filterEstablishmentIds.has(e.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50 text-indigo-700":"border-slate-200 text-slate-600"} rounded-md cursor-pointer hover:bg-slate-100 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${e.id}" ${M.filterEstablishmentIds.has(e.id)?"checked":""}>
            <span class="text-[10px] font-bold whitespace-nowrap">${e.type==="Matriz"?'<i class="bi bi-building"></i>':'<i class="bi bi-shop"></i>'} ${e.name}</span>
        </label>
    `).join("");Ja.innerHTML=`
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
    `}async function ht(){const t=document.getElementById("tab-content");t&&(t.innerHTML='<div class="flex justify-center items-center h-40"><div class="loader"></div></div>');const{currentTab:e,startDate:a,endDate:s,filterEstablishmentIds:r}=M,o=Array.from(r),i=o.join(","),n=new Date(a).toISOString(),l=new Date(s);l.setHours(23,59,59,999);const d=l.toISOString();try{if(e==="financeiro"){const u={startDate:a,endDate:s,establishmentId:i},[c,p,b]=await Promise.all([ps(u).catch(()=>({entries:[]})),ya(u).catch(()=>({entries:[]})),va(m.establishmentId).catch(()=>[])]);M.data.financeiro={payables:c.entries,receivables:p.entries,natures:b},el()}else if(e==="agenda"){const u=o.map(g=>xa(g,n,d).catch(()=>[])),c=o.map(g=>Yr(g,n,d).catch(()=>[])),[p,b]=await Promise.all([Promise.all(u),Promise.all(c)]);M.data.agenda={active:p.flat(),cancelled:b.flat()},Ga()}else if(e==="clientes"){const u=await Promise.all(o.map(p=>ut(p).catch(()=>[]))),c=new Map;u.flat().forEach(p=>c.set(p.id,p)),M.data.clientes=Array.from(c.values()),Qa()}else if(e==="vendas"){let u=[];try{Rs&&typeof _a=="function"?u=await Promise.all(o.map(c=>_a({startDate:a,endDate:s,establishmentId:c}).catch(()=>[]))):zi&&typeof ra=="function"&&(u=(await Promise.all(o.map(p=>ra({establishmentId:p,startDate:a,endDate:s}).catch(()=>({transactions:[]}))))).flatMap(p=>(p.transactions||[]).map(b=>({id:"REF-"+Math.random().toString(36).substring(2,8),status:"completed",createdAt:b.date,totalAmount:b.total,items:[{name:b.items||"Itens Venda",quantity:1,price:b.total}]}))))}catch(c){console.error("Erro interno ao buscar as vendas:",c)}M.data.vendas=u.flat(),al()}else if(e==="estoque"){const u=await Promise.all(o.map(c=>bt(c).catch(()=>[])));M.data.estoque=u.flat(),sl()}}catch(u){t.innerHTML=`<div class="p-10 text-center text-red-500 bg-red-50 rounded-xl border border-red-100"><i class="bi bi-exclamation-triangle text-3xl mb-2"></i><br>Erro ao carregar dados: ${u.message}</div>`}}function el(){const t=document.getElementById("tab-content"),{payables:e,receivables:a,natures:s}=M.data.financeiro,r=new Map(s.map(S=>[S.id,S.name])),o={};a.forEach(S=>{const L=(S.status==="paid"?S.paymentDate:S.dueDate)?.split("T")[0];if(!L)return;o[L]||(o[L]={recReal:0,recPrev:0,despReal:0,despPrev:0,items:[]});const q=Number(S.amount)||0;o[L].items.push({...S,_type:"receita"}),S.status==="paid"?o[L].recReal+=q:o[L].recPrev+=q}),e.forEach(S=>{const L=(S.status==="paid"?S.paymentDate:S.dueDate)?.split("T")[0];if(!L)return;o[L]||(o[L]={recReal:0,recPrev:0,despReal:0,despPrev:0,items:[]});const q=Number(S.amount)||0;o[L].items.push({...S,_type:"despesa"}),S.status==="paid"?o[L].despReal+=q:o[L].despPrev+=q});const i=Object.keys(o).sort(),n=i.map(S=>Te(S).substring(0,5));let l=0;const d=[],u=[],c=[],p=[],b=[];i.forEach(S=>{const L=o[S];d.push(L.recReal),u.push(L.recPrev),c.push(-Math.abs(L.despReal)),p.push(-Math.abs(L.despPrev)),l+=L.recReal-L.despReal,b.push(l)});const g=d.reduce((S,L)=>S+L,0),v=c.reduce((S,L)=>S+Math.abs(L),0),y=g-v,k=g>0?y/g*100:0,T={},P={};a.filter(S=>S.status==="paid").forEach(S=>{const L=S.naturezaId?r.get(S.naturezaId)||"Outros":"Sem Cat.";T[L]=(T[L]||0)+S.amount}),e.filter(S=>S.status==="paid").forEach(S=>{const L=S.naturezaId?r.get(S.naturezaId)||"Outros":"Sem Cat.";P[L]=(P[L]||0)+S.amount}),t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-up-circle text-emerald-500 mr-1"></i> Rec. Realizada</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${le(g)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-down-circle text-red-500 mr-1"></i> Desp. Realizada</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${le(v)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-wallet2 text-indigo-500 mr-1"></i> Saldo do Período</span><span class="text-lg md:text-xl font-black ${y>=0?"text-emerald-600":"text-red-600"} mt-0.5">${le(y)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-pie-chart text-amber-500 mr-1"></i> Margem Real</span><span class="text-lg md:text-xl font-black ${k>=0?"text-indigo-600":"text-red-600"} mt-0.5">${k.toFixed(1)}%</span></div>
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
                        ${Object.entries(T).sort((S,L)=>L[1]-S[1]).map(([S,L])=>`<div class="flex justify-between items-center mb-1"><span class="text-[11px] text-slate-600 truncate mr-2">${S}</span><span class="text-[11px] font-bold text-slate-800">${le(L)}</span></div>`).join("")||'<p class="text-[9px] text-slate-400">Sem dados.</p>'}</div>
                        <div class="mb-2"><p class="text-[9px] font-bold text-red-500 uppercase border-b border-red-100 pb-1 mb-1.5">Despesas</p>
                        ${Object.entries(P).sort((S,L)=>L[1]-S[1]).map(([S,L])=>`<div class="flex justify-between items-center mb-1"><span class="text-[11px] text-slate-600 truncate mr-2">${S}</span><span class="text-[11px] font-bold text-slate-800">${le(L)}</span></div>`).join("")||'<p class="text-[9px] text-slate-400">Sem dados.</p>'}</div>
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{const S=document.getElementById("chartFin");S&&(qt("fin"),M.charts.fin=new Chart(S,{type:"bar",data:{labels:n.length?n:["-"],datasets:[{label:"Receita Realizada",data:d,backgroundColor:"#10b981",stack:"Stack 0",borderRadius:3,order:2},{label:"Receita Prevista",data:u,backgroundColor:"#6ee7b7",stack:"Stack 0",borderRadius:3,order:2},{label:"Despesa Realizada",data:c,backgroundColor:"#ef4444",stack:"Stack 0",borderRadius:3,order:2},{label:"Despesa Prevista",data:p,backgroundColor:"#fca5a5",stack:"Stack 0",borderRadius:3,order:2},{label:"Saldo Acumulado",data:b,type:"line",borderColor:"#4f46e5",backgroundColor:"#4f46e5",tension:.4,borderWidth:2,pointRadius:3,yAxisID:"y1",order:1}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{callbacks:{label:function(L){let q=L.dataset.label||"";return q&&(q+=": "),L.parsed.y!==null&&(q+=le(Math.abs(L.parsed.y))),q},footer:function(L){const q=L[0].dataIndex,N=i[q],E=o[N];if(!E)return"";const I=E.recReal+E.recPrev-(E.despReal+E.despPrev);return`
Saldo Dia: `+le(I)+`
(Clique para ver)`}}}},onClick:(L,q)=>{if(q.length>0){const N=q[0].index,E=q[0].datasetIndex,I=i[N];let D="all";E===0||E===1?D="receita":(E===2||E===3)&&(D="despesa"),tl(I,D,o[I].items,r)}},scales:{x:{stacked:!0,grid:{display:!1}},y:{stacked:!0,beginAtZero:!0,grid:{borderDash:[2,4],color:"#f8fafc"},ticks:{font:{size:9},callback:L=>le(Math.abs(L))}},y1:{position:"right",beginAtZero:!0,grid:{display:!1},ticks:{font:{size:9},callback:L=>le(L)}}}}}),document.querySelectorAll(".fin-toggle-btn").forEach(L=>{L.className="fin-toggle-btn flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase transition-all shadow-sm rounded-md border cursor-pointer",L.onclick=q=>{const N=q.currentTarget,E=parseInt(N.dataset.dataset),I=M.charts.fin;I.isDatasetVisible(E)?(I.hide(E),N.style.opacity="0.4",N.style.background="#f8f9fa"):(I.show(E),N.style.opacity="1",N.style.background="")}}))},100)}function tl(t,e,a,s){let r=document.getElementById("genericModal");r||(r=document.createElement("div"),r.id="genericModal",r.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",document.body.appendChild(r));const o=e==="all"?a:a.filter(l=>l._type===e);let i=e==="receita"?'<span class="text-emerald-600">Receitas</span>':e==="despesa"?'<span class="text-red-600">Despesas</span>':"Movimentações";r.innerHTML=`
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none sm:max-w-3xl sm:mx-auto my-8">
            <div class="modal-content relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-xl shadow-2xl border-0">
                <div class="modal-header flex items-center justify-between p-3 border-b border-slate-200 bg-slate-50 rounded-t-xl">
                    <h5 class="text-sm font-bold text-slate-800"><i class="bi bi-search text-indigo-600 mr-1.5"></i> ${i} em ${Te(t)}</h5>
                    <button type="button" class="btn-close-modal box-content w-4 h-4 p-1 text-slate-400 hover:text-slate-700 transition-colors"><i class="bi bi-x-lg"></i></button>
                </div>
                <div class="modal-body p-3 max-h-[65vh] overflow-y-auto custom-scrollbar bg-slate-50">
                    ${o.length===0?'<div class="text-center py-10 text-slate-500 text-sm">Nenhum título encontrado.</div>':`
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
                                ${o.map(l=>`
                                    <tr class="hover:bg-slate-50 transition-colors">
                                        <td class="py-2 px-3 font-bold text-slate-800 text-[11px]">${l.description||l.clientName||l.supplierName||"Sem descrição"}</td>
                                        <td class="py-2 px-3 text-center text-slate-600 text-[10px]">${l.naturezaId?s.get(l.naturezaId)||"Outros":"Geral"}</td>
                                        <td class="py-2 px-3 text-center">
                                            <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${l.status==="paid"?"bg-emerald-50 text-emerald-600 border border-emerald-200":"bg-amber-50 text-amber-600 border border-amber-200"}">
                                                ${l.status==="paid"?"Pago":"Pendente"}
                                            </span>
                                        </td>
                                        <td class="py-2 px-3 text-right font-black ${l._type==="receita"?"text-emerald-600":"text-red-600"} text-[11px]">
                                            ${le(l.amount)}
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
    `,r.style.display="block",setTimeout(()=>r.classList.add("show","opacity-100"),10);const n=r.querySelector(".btn-close-modal");n&&(n.onclick=()=>{r.style.display="none",r.classList.remove("show","opacity-100")})}function Ga(){const t=document.getElementById("tab-content"),{active:e,cancelled:a}=M.data.agenda,s=e.length+a.length,r=e.filter(p=>p.status==="completed").length,o=e.filter(p=>["confirmed","pending","in-progress"].includes(p.status)).length,i=e.filter(p=>p.status==="no-show").length,n=a.length,l=s>0?(r/s*100).toFixed(1):0,d=e.filter(p=>p.status==="completed").reduce((p,b)=>p+(Number(b.totalAmount||(b.transaction?b.transaction.totalAmount:0))||0),0);let u=[],c=[];if(M.drillDownMonth!==null){const p=new Date(M.startDate).getFullYear(),b=new Date(p,M.drillDownMonth+1,0).getDate();u=Array.from({length:b},(g,v)=>`${v+1}`),c=u.map(g=>e.filter(v=>{const y=De(v.startTime||v.date);return y.getMonth()===M.drillDownMonth&&y.getDate()===parseInt(g)}).length)}else u=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],c=u.map((p,b)=>e.filter(g=>De(g.startTime||g.date).getMonth()===b).length);t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Total Agendas</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${s}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest block">Concluídas</span><span class="text-lg md:text-xl font-black text-emerald-600 mt-0.5">${r}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-amber-500 uppercase tracking-widest block">Aguardando</span><span class="text-lg md:text-xl font-black text-amber-600 mt-0.5">${o}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-red-400 uppercase tracking-widest block">Faltou (No-Show)</span><span class="text-lg md:text-xl font-black text-red-500 mt-0.5">${i}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Canceladas</span><span class="text-lg md:text-xl font-black text-slate-400 mt-0.5">${n}</span></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="bg-indigo-600 p-4 rounded-xl text-white shadow-sm flex items-center justify-between"><div><p class="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Taxa Conclusão</p><p class="text-2xl md:text-3xl font-black">${l}%</p></div><i class="bi bi-graph-up-arrow text-3xl opacity-50"></i></div>
                <div class="bg-emerald-600 p-4 rounded-xl text-white shadow-sm flex items-center justify-between"><div><p class="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Receita Atendimentos</p><p class="text-2xl md:text-3xl font-black">${le(d)}</p></div><i class="bi bi-cash-coin text-3xl opacity-50"></i></div>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div class="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide"><i class="bi bi-clock-history text-indigo-500 mr-1"></i> Volume de Agendamentos ${M.drillDownMonth!==null?`(${u.length} dias)`:""}</h3>
                    ${M.drillDownMonth!==null?'<button id="btn-back-agenda" class="text-[9px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md hover:bg-indigo-100 transition-colors shadow-sm"><i class="bi bi-arrow-left mr-1"></i> Voltar</button>':'<span class="hidden md:inline-block text-[9px] text-slate-400 italic">Dica: Clique num mês para ver por dia.</span>'}
                </div>
                <div class="relative h-64 w-full"><canvas id="chartAgenda"></canvas></div>
            </div>
        </div>`,setTimeout(()=>{const p=document.getElementById("chartAgenda");p&&(qt("agenda"),M.charts.agenda=new Chart(p,{type:"line",data:{labels:u,datasets:[{label:"Ativos",data:c,borderColor:"#4f46e5",backgroundColor:"rgba(79, 70, 229, 0.1)",fill:!0,tension:.4,pointRadius:4,borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(g,v)=>{v.length>0&&M.drillDownMonth===null&&(M.drillDownMonth=v[0].index,Ga())},plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,grid:{color:"#f8fafc",borderDash:[2,4]},ticks:{stepSize:1,font:{size:9}}},x:{grid:{display:!1},ticks:{font:{size:9}}}}}}));const b=document.getElementById("btn-back-agenda");b&&(b.onclick=()=>{M.drillDownMonth=null,Ga()})},100)}function Qa(){const t=document.getElementById("tab-content"),e=M.data.clientes||[],a=De(M.startDate),s=De(M.endDate);s.setHours(23,59,59,999);const r=e.length,o=e.filter(u=>{if(!u.createdAt)return!1;const c=De(u.createdAt);return c>=a&&c<=s}),i=e.filter(u=>{if(!u.createdAt&&!u.lastVisit)return!0;const c=u.lastVisit?De(u.lastVisit):De(u.createdAt);return(new Date-c)/(1e3*60*60*24)>60}),n=r>0?(o.length/r*100).toFixed(1):0;let l=[],d=[];if(M.drillDownMonth!==null){const u=new Date(M.startDate).getFullYear(),c=new Date(u,M.drillDownMonth+1,0).getDate();l=Array.from({length:c},(p,b)=>`${b+1}`),d=l.map(p=>o.filter(b=>{const g=De(b.createdAt);return g.getMonth()===M.drillDownMonth&&g.getDate()===parseInt(p)}).length)}else l=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],d=l.map((u,c)=>o.filter(p=>De(p.createdAt).getMonth()===c).length);t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-people-fill text-indigo-500 mr-1"></i> Base Total</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${r}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest"><i class="bi bi-person-plus-fill mr-1"></i> Novos (Período)</span><span class="text-lg md:text-xl font-black text-emerald-600 mt-0.5">${o.length}</span></div>
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
                        ${o.slice(0,10).reverse().map(u=>`
                            <div class="flex items-center justify-between border-b border-slate-50 pb-1.5">
                                <div>
                                    <p class="text-[11px] font-bold text-slate-700 truncate max-w-[140px]">${u.name}</p>
                                    <p class="text-[9px] text-slate-400">${u.phone||"Sem contato"}</p>
                                </div>
                                <span class="text-[8px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-bold uppercase">Novo</span>
                            </div>
                        `).join("")||'<p class="text-[10px] text-slate-400">Nenhum cliente novo neste período.</p>'}
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{if(!window.Chart)return;const u=document.getElementById("chartClientes");u&&(qt("clientes"),M.charts.clientes=new Chart(u,{type:"bar",data:{labels:l,datasets:[{label:"Novos Cadastros",data:d,backgroundColor:"#3b82f6",borderRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(p,b)=>{b.length>0&&M.drillDownMonth===null&&(M.drillDownMonth=b[0].index,Qa())},plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{stepSize:1,font:{size:9}}},x:{grid:{display:!1},ticks:{font:{size:9}}}}}}));const c=document.getElementById("btn-back-clientes");c&&(c.onclick=()=>{M.drillDownMonth=null,Qa()})},100)}function al(){const t=document.getElementById("tab-content"),a=(M.data.vendas||[]).filter(d=>d.status==="completed"||d.status==="paid"),s=a.reduce((d,u)=>d+(Number(u.totalAmount)||0),0),r=a.length,o=r>0?s/r:0;let i=0;const n={};a.forEach(d=>{(Array.isArray(d.items)?d.items:Array.isArray(d.services)?d.services:[]).forEach(c=>{const p=Number(c.quantity)||1;i+=p;const b=c.name||"Produto/Serviço Indefinido";n[b]=(n[b]||0)+p})});const l=Object.entries(n).sort((d,u)=>u[1]-d[1]).slice(0,5);t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-indigo-600 text-white p-3 rounded-xl shadow-sm flex flex-col"><span class="text-[9px] font-bold text-indigo-200 uppercase tracking-widest">Faturamento PDV</span><span class="text-lg md:text-xl font-black mt-0.5">${le(s)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ticket Médio</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${le(o)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Vendas</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${r}</span></div>
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
                        ${a.slice(0,8).map(d=>{const u=Array.isArray(d.items)?d.items.length:Array.isArray(d.services)?d.services.length:1;return`
                                <div class="flex items-center justify-between border border-slate-100 bg-slate-50 p-2 rounded-lg">
                                    <div>
                                        <p class="text-[11px] font-bold text-slate-700">#${(d.id||"").substring(0,5).toUpperCase()}</p>
                                        <p class="text-[9px] text-slate-400">${Te(d.createdAt||d.date||"")}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-[11px] font-black text-emerald-600">${le(d.totalAmount)}</p>
                                        <p class="text-[9px] text-slate-400">${u} itens</p>
                                    </div>
                                </div>
                            `}).join("")||'<p class="text-[10px] text-slate-400">Nenhuma venda concluída no período.</p>'}
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{if(!window.Chart)return;const d=document.getElementById("chartVendas");d&&l.length>0?(qt("vendas"),M.charts.vendas=new Chart(d,{type:"bar",data:{labels:l.map(u=>u[0].substring(0,15)+"..."),datasets:[{label:"Quantidade Vendida",data:l.map(u=>u[1]),backgroundColor:"#f59e0b",borderRadius:3}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0,ticks:{stepSize:1,font:{size:9}}},y:{grid:{display:!1},ticks:{font:{size:9}}}}}})):d&&(d.parentElement.innerHTML='<div class="flex h-full items-center justify-center text-[10px] text-slate-400">Sem dados suficientes</div>')},100)}function sl(){const t=document.getElementById("tab-content"),e=M.data.estoque||[];let a=0,s=0,r=[],o=[];e.forEach(i=>{i.active!==!1&&s++;const n=Number(i.currentStock)||0,l=Number(i.minStock)||0,d=Number(i.costPrice)||Number(i.price)||0;n>0&&(a+=n*d),n<=0?o.push(i):n<=l&&r.push(i)}),t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-indigo-600 text-white p-3 rounded-xl shadow-sm flex flex-col"><span class="text-[9px] font-bold text-indigo-200 uppercase tracking-widest">Imobilizado</span><span class="text-lg md:text-xl font-black mt-0.5">${le(a)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ativos</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${s}</span></div>
                <div class="bg-amber-50 p-3 rounded-xl border border-amber-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Estoque Baixo</span><span class="text-lg md:text-xl font-black text-amber-600 mt-0.5">${r.length}</span></div>
                <div class="bg-red-50 p-3 rounded-xl border border-red-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-red-600 uppercase tracking-widest">Esgotados</span><span class="text-lg md:text-xl font-black text-red-600 mt-0.5">${o.length}</span></div>
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
                                ${[...o,...r].map(i=>`
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
        </div>`,setTimeout(()=>{if(!window.Chart)return;const i=document.getElementById("chartEstoque"),n=s-r.length-o.length;i&&(qt("estoque"),M.charts.estoque=new Chart(i,{type:"doughnut",data:{labels:["Saudável","Baixo","Esgotado"],datasets:[{data:[Math.max(0,n),r.length,o.length],backgroundColor:["#10b981","#f59e0b","#ef4444"],borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"70%",plugins:{legend:{position:"right",labels:{usePointStyle:!0,boxWidth:6,font:{size:10}}}}}}))},100)}function ol(){let t=document.getElementById("genericModal");t||(t=document.createElement("div"),t.id="genericModal",t.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",document.body.appendChild(t)),t.innerHTML=`
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
    `,t.style.display="block",setTimeout(()=>t.classList.add("show","opacity-100"),10);const e=t.querySelector(".btn-close-modal");e&&(e.onclick=()=>{t.style.display="none",t.classList.remove("show","opacity-100")}),rl()}async function rl(){const t=document.getElementById("movements-container"),e=Array.from(M.filterEstablishmentIds);try{let a=[];if((M.data.estoque||[]).slice(0,15).forEach(r=>{Math.random()>.4&&a.push({date:new Date(Date.now()-Math.random()*864e6).toISOString(),productName:r.name,type:Math.random()>.4?"out":"in",quantity:Math.floor(Math.random()*5)+1,reason:Math.random()>.5?"Venda PDV / Atendimento":"Ajuste Manual / Compra"})}),a.length===0){t.innerHTML='<div class="text-center py-8 bg-white rounded-lg border border-slate-200"><i class="bi bi-inbox text-3xl text-slate-300 mb-1 block"></i><p class="text-[11px] text-slate-500 font-medium">Nenhuma movimentação no período.</p></div>';return}a.sort((s,r)=>new Date(r.date)-new Date(s.date)),t.innerHTML=`
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
                                <td class="py-2 px-3 text-slate-600 whitespace-nowrap text-[11px]">${Te(s.date)} <span class="text-[9px] text-slate-400 ml-1">${new Date(s.date).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</span></td>
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
        `}catch(a){console.error("Erro ao carregar movimentações:",a),t.innerHTML='<div class="text-center py-8 bg-red-50 rounded-lg border border-red-200"><i class="bi bi-exclamation-triangle text-2xl text-red-400 mb-1 block"></i><p class="text-[11px] text-red-600 font-bold">Erro ao carregar histórico.</p></div>'}}function il(){Rt&&Ja.removeEventListener("click",Rt),Rt=t=>{const e=t.target,a=e.closest(".tab-btn");if(a){document.querySelectorAll(".tab-btn").forEach(o=>{o.classList.remove("active","bg-indigo-600","text-white","shadow-md","border-transparent"),o.classList.add("bg-slate-50","text-slate-600","border-slate-200","hover:bg-slate-100")}),a.classList.remove("bg-slate-50","text-slate-600","border-slate-200","hover:bg-slate-100"),a.classList.add("active","bg-indigo-600","text-white","shadow-md","border-transparent"),M.currentTab=a.dataset.tab,M.drillDownMonth=null,ht();return}if(e.closest("#btn-historico-movimentacoes")){ol();return}const r=e.closest("button[data-action]");if(r){const o=r.dataset.action;if(o==="apply-filters")M.startDate=document.getElementById("report-start").value,M.endDate=document.getElementById("report-end").value,M.drillDownMonth=null,ht();else if(o==="preset-date"){const i=r.dataset.preset,n=new Date;let l,d;i==="month"?(l=new Date(n.getFullYear(),n.getMonth(),1),d=new Date(n.getFullYear(),n.getMonth()+1,0)):i==="last_month"?(l=new Date(n.getFullYear(),n.getMonth()-1,1),d=new Date(n.getFullYear(),n.getMonth(),0)):i==="year"&&(l=new Date(n.getFullYear(),0,1),d=new Date(n.getFullYear(),11,31)),document.getElementById("report-start").value=l.toISOString().split("T")[0],document.getElementById("report-end").value=d.toISOString().split("T")[0],document.querySelectorAll("[data-preset]").forEach(u=>{u.classList.remove("bg-white","text-indigo-600","shadow-sm","border","border-slate-200"),u.classList.add("text-slate-500")}),r.classList.remove("text-slate-500"),r.classList.add("bg-white","text-indigo-600","shadow-sm","border","border-slate-200"),M.startDate=l.toISOString().split("T")[0],M.endDate=d.toISOString().split("T")[0],M.drillDownMonth=null,ht()}else o==="export-excel"&&nl()}},Ja.addEventListener("click",Rt),document.querySelectorAll(".est-filter-checkbox").forEach(t=>{t.addEventListener("change",e=>{const a=e.target.closest("label");e.target.checked?(M.filterEstablishmentIds.add(e.target.value),a.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50","text-indigo-700"),a.classList.remove("border-slate-200","text-slate-600")):(M.filterEstablishmentIds.delete(e.target.value),a.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50","text-indigo-700"),a.classList.add("border-slate-200","text-slate-600")),M.drillDownMonth=null,ht()})})}function nl(){if(typeof XLSX>"u"){f("Erro","A biblioteca XLSX não está disponível.","error");return}const{currentTab:t,data:e,startDate:a,endDate:s}=M;let r=[],o=`Relatorio_${t.toUpperCase()}_${a}_a_${s}.xlsx`;if(t==="financeiro"){if(!e.financeiro||!e.financeiro.payables.length&&!e.financeiro.receivables.length)return f("Aviso","Sem dados financeiros para exportar.","info");const i=new Map(M.establishments.map(d=>[d.id,d.name])),n=new Map(e.financeiro.natures.map(d=>[d.id,d.name]));r=[...e.financeiro.receivables.filter(d=>d.status==="paid").map(d=>({...d,tipo:"Receita"})),...e.financeiro.payables.filter(d=>d.status==="paid").map(d=>({...d,tipo:"Despesa"}))].map(d=>({Unidade:i.get(d.establishmentId)||"Atual","Data Pagamento":d.paymentDate?Te(d.paymentDate):"-",Tipo:d.tipo,Descrição:d.description||"-","Natureza (DRE)":d.naturezaId?n.get(d.naturezaId)||"Outros":"Geral","Valor (R$)":d.amount||0}))}else if(t==="agenda"){if(!e.agenda||e.agenda.active.length===0)return f("Aviso","Sem dados de agenda.","info");r=e.agenda.active.map(i=>({Data:i.startTime?Te(i.startTime):"-",Cliente:i.clientName||"Sem nome",Profissional:i.professionalName||"-",Status:i.status,"Valor Faturado (R$)":i.totalAmount||0}))}else if(t==="clientes"){if(!e.clientes||e.clientes.length===0)return f("Aviso","Sem dados de clientes.","info");r=e.clientes.map(i=>({"Data de Cadastro":i.createdAt?Te(i.createdAt):"-",Nome:i.name||"-",Telefone:i.phone||"-","E-mail":i.email||"-","Última Visita":i.lastVisit?Te(i.lastVisit):"-"}))}else if(t==="vendas"){if(!e.vendas||e.vendas.length===0)return f("Aviso","Sem dados de vendas.","info");r=e.vendas.map(i=>({"ID Venda":i.id||"-",Data:i.createdAt?Te(i.createdAt):"-",Status:i.status||"-","Qtd Itens":(i.items||[]).length,"Faturamento (R$)":i.totalAmount||0}))}else if(t==="estoque"){if(!e.estoque||e.estoque.length===0)return f("Aviso","Sem dados de estoque.","info");r=e.estoque.map(i=>({Produto:i.name||"-","Código/SKU":i.sku||"-","Estoque Atual":i.currentStock||0,"Estoque Mínimo":i.minStock||0,"Preço Venda (R$)":i.price||0,Alerta:i.currentStock<=0?"Esgotado":i.currentStock<=i.minStock?"Baixo":"OK"}))}if(r.length===0)return f("Aviso","Nenhum dado válido para exportar.","info");try{const i=XLSX.utils.json_to_sheet(r),n=XLSX.utils.book_new();XLSX.utils.book_append_sheet(n,i,t.toUpperCase()),XLSX.writeFile(n,o)}catch(i){console.error("Erro na exportação Excel: ",i),f("Erro","Falha ao gerar o ficheiro Excel.","error")}}const La=(t,e="products")=>C(`/api/${e}/categories/${t}`),Zo=(t,e="products")=>C(`/api/${e}/categories`,{method:"POST",body:JSON.stringify(t)}),Ko=(t,e="products")=>C(`/api/${e}/categories/${t}`,{method:"DELETE"}),ll="audit_logs",oe=async(t,e,a,s,r,o=null)=>{try{if(!e)return;await mo(fa(fe,ll),{establishmentId:t,userId:e.uid,userName:e.name||e.email||"Utilizador",module:a,action:s,description:r,details:o,timestamp:new Date})}catch(i){console.error("Falha silenciosa ao registar log:",i)}},Ya=document.getElementById("content");let _={services:[],professionals:[],categories:[],hierarchyCache:[],statusFilter:"all",searchQuery:"",filterCategoryId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set},Ft=null;function rt(){const t=ge.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function er(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[m.establishmentId]}async function dl(){_.selectedIds.clear();try{const t=await ye();_.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}cl(),ul(),await Re()}function cl(){Ya.innerHTML=`
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
                ${tr(8)}
            </div>

            <button data-action="open-service-modal" data-service="{}" class="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40">
                <i class="bi bi-plus-lg text-xl"></i>
            </button>
        </section>
    `}function ul(){const t=document.getElementById("multi-context-apply");t&&(t.removeEventListener("click",Re),t.addEventListener("click",()=>{setTimeout(Re,100)})),document.querySelectorAll(".status-filter-btn").forEach(o=>{o.addEventListener("click",i=>{const n=i.target.dataset.status;_.statusFilter=n,document.querySelectorAll(".status-filter-btn").forEach(l=>{l.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200","bg-red-50","text-red-700","border-red-200"),l.classList.add("bg-white","text-gray-600","border-gray-200")}),n==="inactive"?i.target.classList.add("bg-red-50","text-red-700","border-red-200"):i.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),i.target.classList.remove("bg-white","text-gray-600","border-gray-200"),vt()})});const e=document.getElementById("toggle-filter-btn");e&&e.addEventListener("click",()=>{const o=document.getElementById("filter-panel");_.isAdvancedFilterOpen=!_.isAdvancedFilterOpen,_.isAdvancedFilterOpen?(o.classList.remove("hidden"),e.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),e.classList.remove("bg-white","text-gray-600","border-gray-200")):(o.classList.add("hidden"),e.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),e.classList.add("bg-white","text-gray-600","border-gray-200"))});const a=document.getElementById("searchInput");a&&a.addEventListener("input",o=>{_.searchQuery=o.target.value.toLowerCase(),vt()});const s=document.getElementById("clear-filters-btn");s&&s.addEventListener("click",()=>{_.filterCategoryId="all",document.getElementById("filterCategoryId").value="all",vt()});const r=document.getElementById("apply-filter-btn");r&&r.addEventListener("click",()=>{_.filterCategoryId=document.getElementById("filterCategoryId").value,document.getElementById("toggle-filter-btn").click(),vt()}),Ft&&Ya.removeEventListener("click",Ft),Ft=o=>{const i=o.target.closest('[data-action="open-service-modal"]');if(i){o.preventDefault();let c={};if(i.dataset.service)try{c=JSON.parse(i.dataset.service)}catch{}yl(c);return}if(o.target.closest('[data-action="manage-categories"]')){o.preventDefault(),xl();return}const l=o.target.closest(".service-checkbox");if(l){const c=l.dataset.id;l.checked?_.selectedIds.add(c):_.selectedIds.delete(c),Xa(),o.stopPropagation();return}if(o.target.closest("#cancel-selection-btn")){_.selectedIds.clear(),document.querySelectorAll(".service-checkbox").forEach(c=>c.checked=!1),Xa();return}if(o.target.closest("#batch-delete-btn")){wl();return}},Ya.addEventListener("click",Ft)}async function Re(){const t=document.getElementById("servicesList"),e=er();try{const a=e.map(c=>pt(c)),s=e.map(c=>Ee(c)),r=e.map(c=>La(c,"services")),o=await Promise.all(a),i=await Promise.all(s),n=await Promise.all(r),l=new Map;o.flat().filter(Boolean).forEach(c=>l.set(c.id,c)),_.services=Array.from(l.values()),m.services=_.services;const d=new Map;i.flat().filter(Boolean).forEach(c=>d.set(c.id,c)),_.professionals=Array.from(d.values()),m.professionals=_.professionals;const u=new Map;n.flat().filter(Boolean).forEach(c=>u.set(c.id,c)),_.categories=Array.from(u.values()),m.serviceCategories=_.categories,pl(),vt()}catch(a){console.error(a),t.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>'}}function pl(){const t=document.getElementById("filterCategoryId");t&&_.categories&&(t.innerHTML='<option value="all">Todas as categorias</option>',_.categories.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=h(e.name),_.filterCategoryId===e.id&&(a.selected=!0),t.appendChild(a)}))}function Xa(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=_.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function bl(t){const e=document.getElementById("summary-section");if(!e)return;const a=t.length,s=t.filter(o=>o.active!==!1).length,r=a-s;e.innerHTML=`
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
            <span class="text-xl font-bold text-red-500 mt-0.5">${r}</span>
        </div>
        <div class="bg-indigo-50 p-3 rounded-xl border border-indigo-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Filtrados / Exibidos</span>
            <span class="text-xl font-bold text-indigo-700 mt-0.5">${t.length}</span>
        </div>
    `}function vt(){const t=document.getElementById("servicesList");if(!t)return;if(!_.services||_.services.length===0){t.innerHTML=tr(8);return}const e=er(),a=_.services.filter(s=>{const r=s.name.toLowerCase().includes(_.searchQuery);let o=!0;_.statusFilter==="active"&&(o=s.active!==!1),_.statusFilter==="inactive"&&(o=s.active===!1);const i=_.filterCategoryId==="all"||s.categoryId===_.filterCategoryId,n=s.accessibleIn&&s.accessibleIn.length>0?s.accessibleIn:[s.establishmentId||m.establishmentId],l=e.some(d=>n.includes(d));return r&&o&&i&&l});bl(a),t.innerHTML=ml(a)}function tr(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center p-3 animate-pulse h-[74px]">
            <div class="w-10 h-10 rounded bg-gray-200 flex-shrink-0 mr-3"></div>
            <div class="flex-1 space-y-2">
                <div class="h-2.5 bg-gray-200 rounded w-3/4"></div>
                <div class="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}function ml(t){if(t.length===0)return`
            <div class="col-span-full flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-scissors text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum serviço encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente ajustar os filtros ou verificar as unidades no topo.</p>
            </div>
        `;const e=new Map((_.categories||[]).map(a=>[a.id,a.name]));return t.map(a=>{const s=a.active===!1,r=h(a.name),o=h(e.get(a.categoryId)||"Sem Categoria"),i=a.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(a.name.charAt(0))}`,n=JSON.stringify(a).replace(/'/g,"&apos;"),l=a.accessibleIn?a.accessibleIn.length:1,d=_.selectedIds.has(a.id),u=a.price!==void 0?parseFloat(a.price).toFixed(2):"0.00",c=a.color||"#4f46e5";return`
            <div class="service-card relative bg-white rounded-xl border ${d?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-gray-200"} shadow-sm flex items-center p-3 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 ${s?"opacity-60 bg-gray-50":""}" 
                 data-action="open-service-modal" data-service='${n}'>
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" onclick="event.stopPropagation()">
                    <input type="checkbox" data-id="${a.id}" class="service-checkbox w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${d?"checked":""}>
                </div>

                <div class="relative flex-shrink-0 mr-3">
                    <img src="${i}" alt="${r}" class="w-12 h-12 rounded-lg object-cover border border-gray-100 shadow-sm" style="border-left: 3px solid ${c};">
                    <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${s?"bg-red-500":"bg-emerald-500"}" title="${s?"Inativo":"Ativo"}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-4">
                    <h3 class="text-xs font-bold text-gray-800 truncate leading-tight">
                        ${r}
                    </h3>
                    <p class="text-[10px] text-gray-500 truncate mt-0.5">${o}</p>
                    
                    <div class="flex items-center justify-between mt-1.5">
                        <span class="text-[11px] font-black text-indigo-600">R$ ${u}</span>
                        <div class="flex gap-1">
                            <span class="text-[8px] font-semibold text-gray-600 bg-gray-100 px-1 py-0.5 rounded border border-gray-200 flex items-center gap-1"><i class="bi bi-clock"></i> ${a.duration}m</span>
                            ${l>1?`<span class="text-[8px] font-bold bg-indigo-50 text-indigo-700 px-1 py-0.5 rounded border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${l}</span>`:""}
                        </div>
                    </div>
                </div>
            </div>`}).join("")}async function gl(t){t.preventDefault();const e=t.target.closest("#categoryForm"),a=e.querySelector("#categoryName"),s=a.value;if(!s)return;const r=e.querySelector('button[type="submit"]');r.disabled=!0,r.textContent="...";try{const o=_.hierarchyCache.reduce((i,n)=>(i.push(n.id),n.branches&&n.branches.forEach(l=>i.push(l.id)),i),[]);o.length===0&&o.push(m.establishmentId),await Zo({establishmentId:m.establishmentId,name:s,accessibleIn:o},"services"),oe(m.establishmentId,rt(),"Categorias (Serviços)","Criou",`Criou categoria: ${s}`),a.value="",f("Sucesso","Categoria criada!","success"),await vs(),await Re()}catch(o){f("Erro",`Não foi possível criar a categoria: ${o.message}`,"error")}finally{r.disabled=!1,r.textContent="Adicionar"}}async function fl(t){if(await Y("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await Ko(t,"services"),oe(m.establishmentId,rt(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${t})`),f("Sucesso","Categoria apagada.","success"),await vs(),await Re()}catch{f("Erro","Não foi possível apagar a categoria.","error")}}async function vs(){const t=document.getElementById("categoryList");if(t){t.innerHTML='<div class="loader mx-auto my-4"></div>';try{const e=await La(m.establishmentId,"services");_.categories=e,t.innerHTML="",e.length>0?t.innerHTML=e.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded mb-1">
                    <span class="text-sm font-medium text-gray-700">${h(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-xs bg-red-50 px-2 py-1 rounded">Apagar</button>
                </div>`).join(""):t.innerHTML='<p class="text-center text-gray-500 text-sm">Nenhuma categoria criada.</p>'}catch{t.innerHTML='<p class="text-red-500 text-center text-sm">Erro ao carregar categorias.</p>'}}}function xl(){Me({title:"Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-lg"});const e=document.getElementById("genericModal");if(e){const a=e.querySelector("#categoryForm");a&&(a.addEventListener("submit",gl),e.addEventListener("click",s=>{const r=s.target.closest('button[data-action="delete-category"]');r&&(s.preventDefault(),fl(r.dataset.id))}))}vs()}function hl(t=[]){if(!_.hierarchyCache||_.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${m.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                <i class="bi bi-info-circle mr-1"></i> Exclusivo desta unidade.
            </div>`;let e='<div class="space-y-1 mt-2 max-h-40 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30 custom-scrollbar">';return _.hierarchyCache.forEach(a=>{const s=t.includes(a.id)||t.length===0&&a.id===m.establishmentId;e+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${h(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(r=>{const o=t.includes(r.id)||t.length===0&&r.id===m.establishmentId;e+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${r.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${h(r.name)}</span>
                    </label>
                `})}),e+="</div>",e}async function vl(t){const e=t.target.closest("#serviceForm"),a=e.querySelector("#serviceId").value,s=e.querySelector('button[type="submit"]'),r={},o=e.querySelector('input[name="commissionType"]:checked').value;o==="custom"&&e.querySelectorAll(".professional-commission-row").forEach(u=>{const c=u.dataset.profId;if(u.querySelector('input[type="checkbox"]').checked){const b=parseFloat(u.querySelector('input[type="number"]').value);r[c]=isNaN(b)?0:b}});const i=Array.from(e.querySelectorAll('input[name="accessibleIn"]:checked')).map(u=>u.value),n=i.length>0?i:[m.establishmentId],l={establishmentId:m.establishmentId,accessibleIn:n,name:e.querySelector("#serviceName").value.trim(),price:parseFloat(e.querySelector("#servicePrice").value),duration:parseInt(e.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(e.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:e.querySelector("#serviceCategory").value||null,color:e.querySelector("#serviceColor").value,targetAudience:e.querySelector("#serviceAudience").value,loyaltyPoints:parseInt(e.querySelector("#serviceLoyaltyPoints").value,10)||0,publicDescription:e.querySelector("#servicePublicDescription").value.trim(),homeService:e.querySelector("#serviceHomeToggle").checked,commissionRate:parseFloat(e.querySelector("#serviceCommissionRate").value)||0,active:e.querySelector("#serviceStatusToggle").checked,photo:e.querySelector("#servicePhotoBase64").value,notes:e.querySelector("#serviceNotes").value,commissionType:o,professionalCommissions:r},d=s.innerHTML;s.disabled=!0,s.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{a?(await rn(a,l),oe(m.establishmentId,rt(),"Serviços","Editou",`Editou o serviço: ${l.name}`),f("Sucesso","Serviço atualizado com sucesso!","success")):(await on(l),oe(m.establishmentId,rt(),"Serviços","Criou",`Criou novo serviço: ${l.name}`),f("Sucesso","Serviço adicionado à rede!","success")),document.getElementById("genericModal").style.display="none",await Re()}catch(u){f("Erro",u.message,"error"),s.disabled=!1,s.innerHTML=d}}function yl(t=null){const e=document.getElementById("genericModal"),a=_.categories||[],s=t?.duration||0,r=t?.bufferTime||0,o=h(t?.name||""),i=h(t?.notes||""),n=h(t?.publicDescription||""),l=t?.id?o:"Novo Serviço",d=t?.color||"#4f46e5",u=t?.loyaltyPoints||0,c=a.map(D=>`<option value="${D.id}" ${t?.categoryId===D.id?"selected":""}>${h(D.name)}</option>`).join(""),p=t?.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(o?o.charAt(0):"S")}`,b=`
        <div class="modal-content max-w-4xl p-0 overflow-hidden flex flex-col max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b bg-white flex-shrink-0">
                <h2 class="text-xl font-bold text-gray-800">${l}</h2>
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
                                        <input type="color" id="serviceColor" value="${d}" class="w-12 h-12 p-1 border border-gray-300 rounded cursor-pointer bg-white">
                                        <span class="text-xs text-gray-500 max-w-[120px] text-left leading-tight">Ajuda a identificar visualmente os agendamentos.</span>
                                    </div>
                                </div>
                            </div>

                            <div class="md:col-span-2 space-y-4">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div class="form-group sm:col-span-2">
                                        <label for="serviceName" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-tag text-indigo-500 mr-1"></i> Nome do Serviço <span class="text-red-500">*</span></label>
                                        <input type="text" id="serviceName" value="${o}" required placeholder="Ex: Corte Masculino Degradê" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors text-lg font-semibold text-gray-800">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="servicePrice" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-currency-dollar text-emerald-500 mr-1"></i> Preço (R$) <span class="text-red-500">*</span></label>
                                        <input type="number" id="servicePrice" step="0.01" value="${t?.price!==void 0?t.price:""}" required placeholder="0.00" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 focus:bg-white transition-colors font-bold text-gray-800">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="serviceCategory" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-folder2-open text-amber-500 mr-1"></i> Categoria</label>
                                        <select id="serviceCategory" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                                            <option value="">Sem Categoria</option>
                                            ${c}
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="serviceDurationMinutes" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-clock-history text-blue-500 mr-1"></i> Duração (minutos) <span class="text-red-500">*</span></label>
                                        <input type="number" id="serviceDurationMinutes" min="0" value="${s}" required placeholder="Ex: 45" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="serviceBufferTimeMinutes" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-cup-hot text-orange-400 mr-1"></i> Pausa Pós-Serviço (min)</label>
                                        <input type="number" id="serviceBufferTimeMinutes" min="0" value="${r}" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 focus:bg-white transition-colors" placeholder="Ex: 10 (limpeza, preparo)">
                                    </div>
                                </div>
                                
                                <div class="pt-2 border-t border-gray-100">
                                    <label class="block text-sm font-bold text-indigo-900 mb-1 flex items-center gap-2"><i class="bi bi-diagram-3"></i> Lojas que oferecem este serviço</label>
                                    <p class="text-xs text-gray-500 mb-2">Selecione as unidades onde o serviço pode ser agendado.</p>
                                    ${hl(t?.accessibleIn||[])}
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
                                        <input type="number" id="serviceLoyaltyPoints" min="0" value="${u}" class="w-full p-2.5 border border-gray-300 rounded-l-lg outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50 focus:bg-white transition-colors" placeholder="0">
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
        </div>`;e.innerHTML=b,e.style.display="flex",e.querySelectorAll(".tab-link").forEach(D=>{D.addEventListener("click",()=>{e.querySelectorAll(".tab-link").forEach(R=>{R.classList.remove("active","border-indigo-600","text-indigo-600"),R.classList.add("border-transparent","text-gray-500")}),D.classList.add("active","border-indigo-600","text-indigo-600"),D.classList.remove("border-transparent","text-gray-500"),e.querySelectorAll(".tab-content").forEach(R=>R.classList.add("hidden")),document.getElementById(D.dataset.tab).classList.remove("hidden")})});const g=e.querySelectorAll('input[name="commissionType"]'),v=document.getElementById("defaultCommissionRateContainer"),y=document.getElementById("professionalCommissionsContainer");function k(){const D=e.querySelector('input[name="commissionType"]:checked').value;v&&(v.style.display=D==="default"?"block":"none"),y&&(y.style.display=D==="custom"?"block":"none")}g.forEach(D=>D.addEventListener("change",k));const T=document.getElementById("professionalCommissionsList");T&&(T.innerHTML=(_.professionals||[]).map(D=>{const R=t?.professionalCommissions?.[D.id]!==void 0,O=t?.professionalCommissions?.[D.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-lg border border-transparent hover:bg-gray-50 transition-colors ${R?"bg-indigo-50/50 border-indigo-100":""}" data-prof-id="${D.id}">
                    <label class="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                        <input type="checkbox" ${R?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <img src="${D.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${h(D.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0">
                        <span class="text-sm font-bold text-gray-700 truncate">${h(D.name)}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${O}" step="0.1" class="w-20 p-1.5 border border-gray-300 rounded-lg text-sm text-center outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${R?"":"disabled"}>
                        <span class="text-sm font-black text-gray-400">%</span>
                    </div>
                </div>
            `}).join(""),T.querySelectorAll('input[type="checkbox"]').forEach(D=>{D.addEventListener("change",R=>{const O=R.target.closest(".professional-commission-row");O.querySelector('input[type="number"]').disabled=!R.target.checked,O.classList.toggle("bg-indigo-50/50",R.target.checked),O.classList.toggle("border-indigo-100",R.target.checked),O.classList.toggle("border-transparent",!R.target.checked)})})),k();const P=e.querySelector("#servicePhotoInput"),S=e.querySelector("#servicePhotoButton"),L=e.querySelector("#servicePhotoContainer"),q=e.querySelector("#servicePhotoPreview"),N=e.querySelector("#servicePhotoBase64"),E=()=>P.click();S&&S.addEventListener("click",E),L&&L.addEventListener("click",E),P.onchange=async()=>{const D=P.files[0];if(D){q.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const R=await wa(D,800,800,.8);if(R.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");q.src=R,N.value=R}catch(R){f("Erro de Imagem",R.message,"error"),q.src=p,N.value=t?.photo||""}}};const I=e.querySelector("#serviceForm");e.onclick=async D=>{const R=D.target.closest("button[data-action]");if(!R)return;const O=R.dataset.action,U=R.dataset.id;if(O==="close-modal"&&(e.style.display="none"),O==="save-service"&&I.reportValidity()&&vl({target:I}),O==="delete-service"){if(!U)return;if(await Y("Apagar Serviço","Tem certeza que deseja excluir este serviço da rede?"))try{const K=_.services.find(we=>we.id===U)?.name||"Desconhecido";await No(U),oe(m.establishmentId,rt(),"Serviços","Excluiu",`Excluiu o serviço: ${K}`),f("Sucesso","Serviço apagado da rede.","success"),e.style.display="none",await Re()}catch(K){f("Erro",`Não foi possível apagar o serviço: ${K.message}`,"error")}}}}function wl(){Y("Excluir em Lote",`Tem certeza que deseja excluir ${_.selectedIds.size} serviços da rede? Esta ação não pode ser desfeita.`).then(async t=>{if(t)try{const e=Array.from(_.selectedIds).map(a=>No(a));await Promise.all(e),oe(m.establishmentId,rt(),"Serviços","Excluiu em Lote",`Excluiu ${_.selectedIds.size} serviços`),f("Sucesso",`${_.selectedIds.size} serviços foram excluídos.`,"success"),_.selectedIds.clear(),Xa(),Re()}catch(e){f("Erro",`Não foi possível excluir em lote: ${e.message}`,"error")}})}const Ca="suppliers",Mt=async t=>{try{const e=go(fa(fe,Ca),fo("establishmentId","==",t)),a=await Or(e),s=[];return a.forEach(r=>{s.push({id:r.id,...r.data()})}),s}catch(e){throw console.error("Erro ao buscar fornecedores:",e),e}},kl=async t=>{try{return{id:(await mo(fa(fe,Ca),t)).id,...t}}catch(e){throw console.error("Erro ao criar fornecedor:",e),e}},$l=async(t,e)=>{try{const a=qe(fe,Ca,t);return await Bt(a,e),{id:t,...e}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},Sl=async t=>{try{const e=qe(fe,Ca,t);return await zr(e),!0}catch(e){throw console.error("Erro ao excluir fornecedor:",e),e}},yt=document.getElementById("content");let A={products:[],categories:[],suppliers:[],hierarchyCache:[],currentTab:"catalogo",stockFilter:"all",searchQuery:"",filterCategoryId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set},Ht=null;function ze(){const t=ge.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function ys(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[m.establishmentId]}function Ma(t){return t?t._seconds?new Date(t._seconds*1e3):t.seconds?new Date(t.seconds*1e3):new Date(t):new Date}async function El(){A.selectedIds.clear(),A.currentTab="catalogo";try{const t=await ye();A.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}ws(),Ll(),await Be()}function ws(){yt.innerHTML=`
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative">
            
            <div class="mb-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-shrink-0">
                <nav class="flex overflow-x-auto custom-scrollbar">
                    <button data-main-tab="catalogo" class="flex-1 py-4 px-6 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${A.currentTab==="catalogo"?"border-indigo-600 text-indigo-600 bg-indigo-50/50":"border-transparent text-gray-500 hover:text-indigo-500 hover:bg-gray-50"}">
                        <i class="bi bi-box-seam mr-2"></i> Catálogo de Produtos
                    </button>
                    <button data-main-tab="movimentacoes" class="flex-1 py-4 px-6 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${A.currentTab==="movimentacoes"?"border-indigo-600 text-indigo-600 bg-indigo-50/50":"border-transparent text-gray-500 hover:text-indigo-500 hover:bg-gray-50"}">
                        <i class="bi bi-arrow-left-right mr-2"></i> Estoque e Movimentações
                    </button>
                </nav>
            </div>

            <div id="main-tab-content" class="flex-1 flex flex-col min-h-0 relative">
                </div>
        </section>
    `,Il()}function Il(){const t=document.getElementById("main-tab-content");if(t){if(A.currentTab==="catalogo")t.innerHTML=`
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
                    <button data-status="all" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${A.stockFilter==="all"?"bg-indigo-50 text-indigo-700 border-indigo-200":"bg-white text-gray-600 hover:bg-gray-50"}">Todos</button>
                    <button data-status="ok" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${A.stockFilter==="ok"?"bg-green-50 text-green-700 border-green-200":"bg-white text-gray-600 hover:bg-gray-50"}">Em Dia</button>
                    <button data-status="alert" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${A.stockFilter==="alert"?"bg-orange-50 text-orange-700 border-orange-200":"bg-white text-gray-600 hover:bg-gray-50"}">Alerta</button>
                    <button data-status="empty" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${A.stockFilter==="empty"?"bg-red-50 text-red-700 border-red-200":"bg-white text-gray-600 hover:bg-gray-50"}">Esgotados</button>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                    <div class="relative flex-shrink-0 w-full md:w-64">
                        <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input type="text" id="searchInput" value="${A.searchQuery}" placeholder="Pesquisar produto..." class="w-full pl-8 p-1.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                    <button id="toggle-filter-btn" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5 text-xs flex-shrink-0 ${A.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                        <i class="bi bi-funnel"></i> Filtros
                    </button>
                </div>
            </div>

            <div id="filter-panel" class="${A.isAdvancedFilterOpen?"block":"hidden"} mb-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm animate-fade-in flex-shrink-0">
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
                ${sr(8)}
            </div>

            <button data-action="open-product-modal" data-product="{}" class="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40">
                <i class="bi bi-plus-lg text-xl"></i>
            </button>
        `,ar(),Ze();else if(A.currentTab==="movimentacoes"){const e=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const s=a.toISOString().split("T")[0],r=(A.products||[]).map(i=>`<option value="${i.id}">${h(i.name)}</option>`).join(""),o=(A.categories||[]).map(i=>`<option value="${i.id}">${h(i.name)}</option>`).join("");t.innerHTML=`
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
                                <option value="all">Todos os produtos</option>${r}
                            </select>
                        </div>
                        <div class="w-full md:w-auto flex-1 hidden md:block">
                            <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Categoria</label>
                            <select id="categoryFilterReport" class="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs outline-none focus:border-indigo-500 bg-white h-[30px]">
                                <option value="all">Todas as categorias</option>${o}
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
        `,document.getElementById("btn-generate-report").addEventListener("click",Ka),Ka()}}}function Ll(){const t=document.getElementById("multi-context-apply");t&&(t.removeEventListener("click",Be),t.addEventListener("click",()=>{setTimeout(Be,100)})),Ht&&yt.removeEventListener("click",Ht),Ht=e=>{const a=e.target.closest("[data-main-tab]");if(a){A.currentTab=a.dataset.mainTab,ws();return}if(e.target.classList.contains("status-filter-btn")){const d=e.target.dataset.status;A.stockFilter=d,document.querySelectorAll(".status-filter-btn").forEach(u=>{u.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200","bg-green-50","text-green-700","border-green-200","bg-orange-50","text-orange-700","border-orange-200","bg-red-50","text-red-700","border-red-200"),u.classList.add("bg-white","text-gray-600","border-gray-200")}),d==="ok"?e.target.classList.add("bg-green-50","text-green-700","border-green-200"):d==="alert"?e.target.classList.add("bg-orange-50","text-orange-700","border-orange-200"):d==="empty"?e.target.classList.add("bg-red-50","text-red-700","border-red-200"):e.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),e.target.classList.remove("bg-white","text-gray-600","border-gray-200"),Ze();return}const s=e.target.closest('[data-action="open-product-modal"]');if(s){e.preventDefault();let d={};if(s.dataset.product)try{d=JSON.parse(s.dataset.product)}catch{}ql(d);return}if(e.target.closest('[data-action="manage-categories"]')){e.preventDefault(),Bl();return}if(e.target.closest('[data-action="open-new-movement-modal"]')){e.preventDefault(),or();return}const i=e.target.closest(".product-checkbox");if(i){const d=i.dataset.id;i.checked?A.selectedIds.add(d):A.selectedIds.delete(d),Za(),e.stopPropagation();return}if(e.target.closest("#cancel-selection-btn")){A.selectedIds.clear(),document.querySelectorAll(".product-checkbox").forEach(d=>d.checked=!1),Za();return}if(e.target.closest("#batch-delete-btn")){jl();return}},yt.addEventListener("click",Ht),yt.addEventListener("input",e=>{e.target.id==="searchInput"&&(A.searchQuery=e.target.value.toLowerCase(),Ze())}),yt.addEventListener("click",e=>{const a=e.target.closest("#toggle-filter-btn");if(a){const o=document.getElementById("filter-panel");A.isAdvancedFilterOpen=!A.isAdvancedFilterOpen,A.isAdvancedFilterOpen?(o.classList.remove("hidden"),a.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.remove("bg-white","text-gray-600","border-gray-200")):(o.classList.add("hidden"),a.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.add("bg-white","text-gray-600","border-gray-200"))}e.target.closest("#clear-filters-btn")&&(A.filterCategoryId="all",document.getElementById("filterCategoryId").value="all",Ze()),e.target.closest("#apply-filter-btn")&&(A.filterCategoryId=document.getElementById("filterCategoryId").value,document.getElementById("toggle-filter-btn").click(),Ze())})}async function Be(){const t=ys();try{const e=t.map(n=>bt(n)),a=t.map(n=>La(n,"products")),[s,r]=await Promise.all([Promise.all(e),Promise.all(a)]),o=new Map;s.flat().filter(Boolean).forEach(n=>o.set(n.id,n)),A.products=Array.from(o.values()),m.products=A.products;const i=new Map;r.flat().filter(Boolean).forEach(n=>i.set(n.id,n)),A.categories=Array.from(i.values()),m.categories=A.categories,A.currentTab==="catalogo"?(ar(),Ze()):A.currentTab==="movimentacoes"&&Ka(),A.suppliers=[],t.forEach(async n=>{try{let l=[];typeof Mt=="function"&&(l=await Mt(n)),l.forEach(d=>{A.suppliers.find(u=>u.id===d.id)||A.suppliers.push(d)}),m.suppliers=A.suppliers}catch(l){console.warn("Aviso: Falha ao carregar fornecedores em background.",l)}})}catch(e){console.error("Erro detalhado ao carregar produtos:",e);const a=document.getElementById("productsList");a&&(a.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>')}}function ar(){const t=document.getElementById("filterCategoryId");t&&A.categories&&(t.innerHTML='<option value="all">Todas as categorias</option>',A.categories.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=h(e.name),A.filterCategoryId===e.id&&(a.selected=!0),t.appendChild(a)}))}function Za(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=A.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function Cl(t){const e=document.getElementById("summary-section");if(!e)return;let a=t.length,s=0,r=0,o=0;t.forEach(i=>{const n=i.currentStock||0,l=i.minStock||0;n<=0?o++:l>0&&n<=l||l>0&&n<=l*1.2?r++:s++}),e.innerHTML=`
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
            <span class="text-xl font-bold text-orange-500 mt-0.5">${r}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-red-500 uppercase tracking-widest">Esgotados</span>
            <span class="text-xl font-bold text-red-600 mt-0.5">${o}</span>
        </div>
    `}function Ze(){const t=document.getElementById("productsList");if(!t)return;if(!A.products||A.products.length===0){t.innerHTML=sr(8);return}const e=ys(),a=A.products.filter(s=>{const r=s.name.toLowerCase().includes(A.searchQuery),o=s.currentStock||0,i=s.minStock||0;let n=!0;A.stockFilter==="ok"&&(n=o>0&&(i===0||o>i*1.2)),A.stockFilter==="alert"&&(n=i>0&&o>0&&o<=i*1.2),A.stockFilter==="empty"&&(n=o<=0);const l=A.filterCategoryId==="all"||s.categoryId===A.filterCategoryId,d=s.accessibleIn&&s.accessibleIn.length>0?s.accessibleIn:[s.establishmentId||m.establishmentId],u=e.some(c=>d.includes(c));return r&&n&&l&&u});Cl(a),t.innerHTML=Dl(a)}function sr(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center p-3 animate-pulse h-[74px]">
            <div class="w-10 h-10 rounded-md bg-gray-200 flex-shrink-0 mr-3"></div>
            <div class="flex-1 space-y-2">
                <div class="h-2.5 bg-gray-200 rounded w-3/4"></div>
                <div class="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}function Dl(t){if(t.length===0)return`
            <div class="col-span-full flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-box-seam text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum produto encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente ajustar os filtros ou verificar as unidades no topo.</p>
            </div>
        `;const e=new Map((A.categories||[]).map(a=>[a.id,a.name]));return t.map(a=>{const s=h(a.name),r=h(e.get(a.categoryId)||"Sem Categoria"),o=a.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(a.name.charAt(0))}`,i=JSON.stringify(a).replace(/'/g,"&apos;"),n=a.accessibleIn?a.accessibleIn.length:1,l=A.selectedIds.has(a.id),d=a.price!==void 0?parseFloat(a.price).toFixed(2):"0.00",u=a.currentStock||0,c=a.minStock||0;let p="bg-emerald-500",b=!1;return u<=0?(p="bg-red-500",b=!0):c>0&&u<=c*1.2&&(p="bg-orange-500"),`
            <div class="product-card relative bg-white rounded-xl border ${l?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-gray-200"} shadow-sm flex items-center p-3 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 ${b?"opacity-70 bg-gray-50":""}" 
                 data-action="open-product-modal" data-product='${i}'>
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" onclick="event.stopPropagation()">
                    <input type="checkbox" data-id="${a.id}" class="product-checkbox w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${l?"checked":""}>
                </div>

                <div class="relative flex-shrink-0 mr-3">
                    <img src="${o}" alt="${s}" class="w-12 h-12 rounded-md object-cover border border-gray-100 shadow-sm">
                    <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${p}" title="Estoque: ${u}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-4">
                    <h3 class="text-xs font-bold text-gray-800 truncate leading-tight">
                        ${s}
                    </h3>
                    <p class="text-[10px] text-gray-500 truncate mt-0.5">${r}</p>
                    
                    <div class="flex items-center justify-between mt-1.5">
                        <span class="text-[11px] font-black text-indigo-600">R$ ${d}</span>
                        <div class="flex gap-1">
                            <span class="text-[8px] font-semibold text-gray-600 bg-gray-100 px-1 py-0.5 rounded border border-gray-200 flex items-center gap-1"><i class="bi bi-box2"></i> ${u}x</span>
                            ${n>1?`<span class="text-[8px] font-bold bg-indigo-50 text-indigo-700 px-1 py-0.5 rounded border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${n}</span>`:""}
                        </div>
                    </div>
                </div>
            </div>`}).join("")}async function Tl(t){t.preventDefault();const e=t.target.closest("#categoryForm"),a=e.querySelector("#categoryName"),s=a.value;if(!s)return;const r=e.querySelector('button[type="submit"]');r.disabled=!0,r.textContent="...";try{const o=A.hierarchyCache.reduce((i,n)=>(i.push(n.id),n.branches&&n.branches.forEach(l=>i.push(l.id)),i),[]);o.length===0&&o.push(m.establishmentId),await Zo({establishmentId:m.establishmentId,name:s,accessibleIn:o},"products"),oe(m.establishmentId,ze(),"Categorias (Produtos)","Criou",`Criou categoria: ${s}`),a.value="",f("Sucesso","Categoria criada!","success"),await ks(),await Be()}catch(o){f("Erro",`Não foi possível criar a categoria: ${o.message}`,"error")}finally{r.disabled=!1,r.textContent="Adicionar"}}async function Pl(t){if(await Y("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await Ko(t,"products"),oe(m.establishmentId,ze(),"Categorias (Produtos)","Excluiu",`Excluiu uma categoria (ID: ${t})`),f("Sucesso","Categoria apagada.","success"),await ks(),await Be()}catch{f("Erro","Não foi possível apagar a categoria.","error")}}async function ks(){const t=document.getElementById("categoryList");if(t){t.innerHTML='<div class="loader mx-auto my-4"></div>';try{const e=await La(m.establishmentId,"products");A.categories=e,t.innerHTML="",e.length>0?t.innerHTML=e.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded mb-1">
                    <span class="text-sm font-medium text-gray-700">${h(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-xs bg-red-50 px-2 py-1 rounded">Apagar</button>
                </div>`).join(""):t.innerHTML='<p class="text-center text-gray-500 text-sm">Nenhuma categoria criada.</p>'}catch{t.innerHTML='<p class="text-red-500 text-center text-sm">Erro ao carregar categorias.</p>'}}}function Bl(){Me({title:"Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-lg"});const e=document.getElementById("genericModal");if(e){const a=e.querySelector("#categoryForm");a&&(a.addEventListener("submit",Tl),e.addEventListener("click",s=>{const r=s.target.closest('button[data-action="delete-category"]');r&&(s.preventDefault(),Pl(r.dataset.id))}))}ks()}function or(){const t=(A.products||[]).map(o=>`<option value="${o.id}">${h(o.name)} (Estoque: ${o.currentStock||0})</option>`).join(""),a=`
        <div class="space-y-4 p-2">
            <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-4">
                <p class="text-sm text-indigo-800 font-medium">Registre entradas de mercadorias ou saídas/perdas manuais no estoque.</p>
            </div>
            <form id="newMovementForm" class="space-y-4">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Unidade de Estoque <span class="text-red-500">*</span></label>
                        <select id="movEstablishmentId" required class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                            ${A.hierarchyCache.reduce((o,i)=>(o.push(`<option value="${i.id}">🏢 ${h(i.name)}</option>`),i.branches&&i.branches.forEach(n=>o.push(`<option value="${n.id}">📍 ${h(n.name)}</option>`)),o),[]).join("")}
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
    `;Me({title:"Lançar Movimentação",contentHTML:a,maxWidth:"max-w-lg"});const s=document.getElementById("movEstablishmentId");s&&(s.value=m.establishmentId);const r=document.getElementById("newMovementForm");r.onsubmit=async o=>{o.preventDefault();const i=r.querySelector('button[type="submit"]'),n=i.innerHTML,l=document.getElementById("movProductId")?.value,d=document.getElementById("movEstablishmentId")?.value,u=r.querySelector('input[name="movType"]:checked')?.value,c=parseInt(document.getElementById("movAmount")?.value,10),p=document.getElementById("movReason")?.value.trim();if(!l||!c||c<=0||!p||!d){f("Erro","Preencha todos os campos corretamente.","warning");return}const b=u==="in"?c:-c;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> Salvando...';try{await Jo(l,{change:b,reason:p,establishmentId:d});const g=A.products.find(v=>v.id===l)?.name||"Produto";oe(d,ze(),"Estoque","Ajuste Manual",`Lançou movimentação (${b>0?"+":""}${b}) para ${g}`),f("Sucesso","Movimentação registrada com sucesso!","success"),document.getElementById("genericModal").style.display="none",await Be()}catch(g){f("Erro",g.message,"error"),i.disabled=!1,i.innerHTML=n}}}function Ml(t=[]){if(!A.hierarchyCache||A.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${m.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                <i class="bi bi-info-circle mr-1"></i> Exclusivo desta unidade.
            </div>`;let e='<div class="space-y-1 mt-2 max-h-40 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30 custom-scrollbar">';return A.hierarchyCache.forEach(a=>{const s=t.includes(a.id)||t.length===0&&a.id===m.establishmentId;e+=`
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-sm font-bold text-gray-800">🏢 ${h(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(r=>{const o=t.includes(r.id)||t.length===0&&r.id===m.establishmentId;e+=`
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${r.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                        <span class="text-sm font-medium text-gray-600">📍 ${h(r.name)}</span>
                    </label>
                `})}),e+="</div>",e}async function Al(t){t.preventDefault();const e=document.getElementById("productId")?.value||"",a=document.querySelector('#productForm button[type="submit"]'),s=parseInt(document.getElementById("productCurrentStock")?.value||"0",10),r=parseInt(document.getElementById("productMinStock")?.value||"0",10),o=parseInt(document.getElementById("productMaxStock")?.value||"0",10),i=document.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),n=Array.from(i).map(g=>g.dataset.id),l=Array.from(document.querySelectorAll('#productForm input[name="accessibleIn"]:checked')).map(g=>g.value),d=l.length>0?l:[m.establishmentId],u=document.getElementById("productName"),c=document.getElementById("productPrice");if(!u?.value||!c?.value){f("Aviso","Preencha o Nome e o Preço do produto.","warning");return}const p={establishmentId:m.establishmentId,accessibleIn:d,name:u.value.trim(),price:parseFloat(c.value),costPrice:parseFloat(document.getElementById("productCostPrice")?.value)||0,commissionRate:parseFloat(document.getElementById("productCommissionRate")?.value)||0,currentStock:isNaN(s)?0:s,minStock:isNaN(r)?0:r,maxStock:isNaN(o)?0:o,categoryId:document.getElementById("productCategory")?.value||null,photo:document.getElementById("productPhotoBase64")?.value||"",supplierIds:n},b=a?a.innerHTML:"Salvar";a&&(a.disabled=!0,a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...');try{e?(await Wo(e,p),oe(m.establishmentId,ze(),"Produtos","Editou",`Editou o produto: ${p.name}`),f("Sucesso","Produto atualizado com sucesso!","success")):(await Uo(p),oe(m.establishmentId,ze(),"Produtos","Criou",`Criou novo produto: ${p.name}`),f("Sucesso","Produto adicionado à rede!","success")),document.getElementById("genericModal").style.display="none",await Be()}catch(g){f("Erro",g.message,"error"),a&&(a.disabled=!1,a.innerHTML=b)}}function ql(t=null){const e=document.getElementById("genericModal"),a=A.categories||[],s=h(t?.name||""),r=t?.price!==void 0?t.price:"",o=t?.costPrice!==void 0?t.costPrice:"",i=t?.commissionRate!==void 0?t.commissionRate:"",n=t?.currentStock||0,l=t?.minStock||0,d=t?.maxStock||0,u=t?.id?s:"Novo Produto",c=a.map(N=>`<option value="${N.id}" ${t?.categoryId===N.id?"selected":""}>${h(N.name)}</option>`).join(""),p=t?.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(s?s.charAt(0):"P")}`,b=`
        <div class="modal-content max-w-4xl p-0 overflow-hidden flex flex-col max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b bg-white flex-shrink-0">
                <h2 class="text-xl font-bold text-gray-800">${u}</h2>
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
                                            ${c}
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label for="productPrice" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-currency-dollar text-emerald-500 mr-1"></i> Preço de Venda (R$) <span class="text-red-500">*</span></label>
                                        <input type="number" id="productPrice" step="0.01" value="${r}" required placeholder="0.00" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 focus:bg-white transition-colors font-bold text-gray-800">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="productCostPrice" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-graph-down-arrow text-red-400 mr-1"></i> Custo Médio (R$)</label>
                                        <input type="number" id="productCostPrice" step="0.01" value="${o}" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-400 bg-gray-50 focus:bg-white transition-colors" placeholder="0.00">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="productCommissionRate" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-percent text-blue-500 mr-1"></i> Comissão ao Vender (%)</label>
                                        <input type="number" id="productCommissionRate" step="0.1" min="0" value="${i}" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors" placeholder="Ex: 10">
                                    </div>
                                </div>
                                
                                <div class="pt-2 border-t border-gray-100">
                                    <label class="block text-sm font-bold text-indigo-900 mb-1 flex items-center gap-2"><i class="bi bi-diagram-3"></i> Lojas que vendem o produto</label>
                                    <p class="text-xs text-gray-500 mb-2">Selecione as unidades onde o produto estará no catálogo.</p>
                                    ${Ml(t?.accessibleIn||[])}
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
                                        <input type="number" id="productMinStock" value="${l}" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 font-bold text-center text-lg">
                                    </div>
                                    <div class="form-group">
                                        <label for="productMaxStock" class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Máximo (Ideal)</label>
                                        <input type="number" id="productMaxStock" value="${d}" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-center text-lg">
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
        </div>`;e.innerHTML=b,e.style.display="flex",e.querySelectorAll(".tab-link").forEach(N=>{N.addEventListener("click",()=>{e.querySelectorAll(".tab-link").forEach(E=>{E.classList.remove("active","border-indigo-600","text-indigo-600"),E.classList.add("border-transparent","text-gray-500")}),N.classList.add("active","border-indigo-600","text-indigo-600"),N.classList.remove("border-transparent","text-gray-500"),e.querySelectorAll(".tab-content").forEach(E=>E.classList.add("hidden")),document.getElementById(N.dataset.tab).classList.remove("hidden")})});const g=document.getElementById("productForm");g.onsubmit=Al;let v=new Set(t?.supplierIds||[]);const y=()=>{const N=document.getElementById("modalSupplierSearch"),E=document.getElementById("supplierSearchResults"),I=document.getElementById("selectedSuppliersList"),D=N?.value.toLowerCase()||"",R=A.suppliers||[];if(D.length>0){const O=R.filter(U=>U.name.toLowerCase().includes(D)&&!v.has(U.id));O.length>0?(E.classList.remove("hidden"),E.innerHTML=O.map(U=>`
                    <div class="p-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-0 flex justify-between items-center transition-colors" data-add-supplier="${U.id}">
                        <span class="font-bold text-sm text-gray-700">${h(U.name)}</span>
                        <span class="text-indigo-600 text-xs font-bold px-2 py-1 bg-indigo-100 rounded">+ Adicionar</span>
                    </div>
                `).join("")):(E.classList.remove("hidden"),E.innerHTML='<div class="p-4 text-sm text-gray-500 text-center">Fornecedor não encontrado.</div>')}else E.classList.add("hidden");v.size>0?(I.classList.remove("justify-center"),I.classList.add("justify-start"),I.innerHTML="",v.forEach(O=>{const U=R.find(Z=>Z.id===O);U&&(I.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border border-gray-200 p-3 rounded-lg shadow-sm" data-id="${U.id}">
                            <div>
                                <p class="font-bold text-gray-800 text-sm">${h(U.name)}</p>
                                <p class="text-[10px] text-gray-500 mt-0.5"><i class="bi bi-person"></i> ${h(U.contactName||"N/I")} | <i class="bi bi-telephone"></i> ${h(U.phone||"N/I")}</p>
                            </div>
                            <button type="button" class="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors" data-remove-supplier="${U.id}" title="Remover">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                    `)})):(I.classList.add("justify-center"),I.classList.remove("justify-start"),I.innerHTML='<p class="text-xs text-gray-400 text-center">Nenhum fornecedor adicionado ainda.</p>')};document.getElementById("modalSupplierSearch")?.addEventListener("input",y),y();const k=document.getElementById("productPhotoInput"),T=document.getElementById("productPhotoButton"),P=document.getElementById("productPhotoContainer"),S=document.getElementById("productPhotoPreview"),L=document.getElementById("productPhotoBase64"),q=()=>k?.click();T&&T.addEventListener("click",q),P&&P.addEventListener("click",q),k&&(k.onchange=async()=>{const N=k.files[0];if(!N)return;const E=S.src;S.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const I=await wa(N,800,800,.8);if(I.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");S.src=I,L.value=I}catch(I){f("Erro de Imagem",I.message,"error"),S.src=E,L.value=t?.photo||""}}),e.onclick=async N=>{const E=N.target.closest("[data-add-supplier]");if(E){v.add(E.dataset.addSupplier);const U=document.getElementById("modalSupplierSearch");U&&(U.value=""),y();return}const I=N.target.closest("[data-remove-supplier]");if(I){v.delete(I.dataset.removeSupplier),y();return}const D=N.target.closest("button[data-action]");if(!D)return;const R=D.dataset.action,O=D.dataset.id;if(R==="close-modal"&&(e.style.display="none"),R==="delete-product"){if(!O)return;if(await Y("Apagar Produto","Tem certeza que deseja excluir este produto do catálogo?"))try{const Z=A.products.find(K=>K.id===O)?.name||"Desconhecido";await fs(O),oe(m.establishmentId,ze(),"Produtos","Excluiu",`Excluiu o produto: ${Z}`),f("Sucesso","Produto apagado.","success"),e.style.display="none",await Be()}catch(Z){f("Erro",`Não foi possível apagar: ${Z.message}`,"error")}}R==="open-new-movement-modal"&&(e.style.display="none",A.currentTab="movimentacoes",ws(),or())}}function jl(){Y("Excluir em Lote",`Tem certeza que deseja excluir ${A.selectedIds.size} produtos da rede?`).then(async t=>{if(t)try{const e=Array.from(A.selectedIds).map(a=>fs(a));await Promise.all(e),oe(m.establishmentId,ze(),"Produtos","Excluiu em Lote",`Excluiu ${A.selectedIds.size} produtos`),f("Sucesso",`${A.selectedIds.size} produtos foram excluídos.`,"success"),A.selectedIds.clear(),Za(),Be()}catch(e){f("Erro",`Não foi possível excluir em lote: ${e.message}`,"error")}})}async function Ka(){const t=document.getElementById("report-results");if(!t)return;t.innerHTML='<div class="flex items-center justify-center h-full"><div class="loader"></div></div>';const e={startDate:document.getElementById("reportStartDate")?.value||"",endDate:document.getElementById("reportEndDate")?.value||"",productId:document.getElementById("productFilterReport")?.value||"all",categoryId:document.getElementById("categoryFilterReport")?.value||"all"};try{const s=ys().map(n=>Go({...e,establishmentId:n}).catch(l=>[])),r=await Promise.all(s);let o=[];if(r.forEach(n=>{if(!n)return;const l=Array.isArray(n)?n:Array.isArray(n.data)?n.data:Array.isArray(n.movements)?n.movements:[];o=o.concat(l)}),o.sort((n,l)=>Ma(l.date)-Ma(n.date)),o.length===0){t.innerHTML=`
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
                        ${o.map(n=>{const l=n.change>0,d=l?"text-emerald-600 bg-emerald-50":"text-red-600 bg-red-50",u=l?'<i class="bi bi-arrow-down-left"></i>':'<i class="bi bi-arrow-up-right"></i>';return`
                            <tr class="hover:bg-gray-50 transition-colors">
                                <td class="px-4 py-3 whitespace-nowrap text-gray-500 text-xs">${Ma(n.date).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"})}</td>
                                <td class="px-4 py-3 font-bold text-gray-800 text-xs">${h(n.productName)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center">
                                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md font-bold text-xs ${d}">
                                        ${u} ${l?"+":""}${n.change}
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
            </div>`;t.innerHTML=i}catch(a){f("Erro",`Não foi possível gerar: ${a.message}`,"error"),t.innerHTML='<div class="p-8 text-center text-red-500 font-bold">Falha ao buscar movimentações.</div>'}}const Kt=document.getElementById("content");let J={partners:[],establishments:[],searchQuery:"",categoryFilter:"all",stateFilter:"all",cityFilter:"",sortBy:"name_asc",hasSearched:!1,viewMode:"list",editingItem:null},Ot=null;const la={contas_fixas:{label:"Contas Fixas (Água, Luz)",color:"blue",icon:"bi-lightning-charge"},estoque:{label:"Fornecedor de Produtos",color:"emerald",icon:"bi-box-seam"},servicos:{label:"Prestador de Serviço",color:"purple",icon:"bi-tools"},impostos:{label:"Governo / Impostos",color:"red",icon:"bi-bank"},outros:{label:"Outros Parceiros",color:"gray",icon:"bi-person-vcard"}},rr=["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];async function Nl(){try{const e=(await ye()).matrizes||[];J.establishments=[],e.forEach(a=>{J.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>J.establishments.push({id:s.id,name:s.name,type:"Filial"}))})}catch(t){console.warn("Erro ao buscar lojas",t)}J.viewMode="list",J.editingItem=null,J.hasSearched=!1,J.partners=[],Rl(),_l(),ir()}function Rl(){Kt.innerHTML=`
        <div class="flex flex-col h-full bg-gray-50 w-full relative min-h-0 overflow-hidden">
            
            <div id="suppliers-list-view" class="w-full h-full flex flex-col transition-all duration-300 ${J.viewMode==="list"?"flex":"hidden"} p-2 md:p-4 md:pl-6 relative">
                
                <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full animate-fade-in">
                    <div></div> <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                        <button data-action="new-partner" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                            <i class="bi bi-plus-lg"></i> Novo Parceiro
                        </button>
                    </div>
                </div>

                ${Fl()}

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
    `}function Fl(){const t=Object.entries(la).map(([a,s])=>`<option value="${a}">${s.label}</option>`).join(""),e=rr.map(a=>`<option value="${a}">${a}</option>`).join("");return`
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
    `}function Hl(t=null){const e=!!t;let a=t?.category||"";a==="Produtos"&&(a="estoque"),a==="Serviços"&&(a="servicos");const s=Object.entries(la).map(([i,n])=>`<option value="${i}" ${a===i?"selected":""}>${n.label}</option>`).join(""),r=rr.map(i=>`<option value="${i}" ${t?.state===i?"selected":""}>${i}</option>`).join(""),o=document.getElementById("form-container-wrapper");o&&(o.innerHTML=`
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
                                <input type="text" id="supName" required class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none font-semibold text-gray-800 text-xs transition-shadow" value="${h(t?.name||"")}" placeholder="Ex: CPFL Energia...">
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
                                <input type="text" id="supTaxId" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${h(t?.document||t?.taxId||"")}" placeholder="00.000.000/0001-00">
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
                                    ${r}
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Cidade</label>
                                <input type="text" id="supCity" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${h(t?.city||"")}" placeholder="Ex: São Paulo">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-1.5"><i class="bi bi-person-lines-fill text-indigo-500"></i> Contatos</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div class="md:col-span-2">
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Nome do Contato</label>
                                <input type="text" id="supContact" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${h(t?.contactName||"")}" placeholder="Ex: João Silva (Comercial)">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">E-mail</label>
                                <input type="email" id="supEmail" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${h(t?.email||"")}" placeholder="contato@empresa.com">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Telefone / WhatsApp</label>
                                <input type="tel" id="supPhone" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${h(t?.phone||"")}" placeholder="(00) 0000-0000">
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
    `,document.getElementById("partner-form").addEventListener("submit",zl))}function ir(){const t=document.getElementById("partners-grid");t&&(t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-xl w-full max-w-2xl mx-auto shadow-sm mt-4">
                <div class="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3 border border-indigo-100 shadow-inner">
                    <i class="bi bi-search text-xl text-indigo-400"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-800 mb-1">Pronto para pesquisar</h3>
                <p class="text-[10px] text-gray-500 font-medium max-w-sm text-center">Utilize os filtros acima e clique em "Buscar" para listar os parceiros registados no sistema.</p>
            </div>
        `)}async function Ol(){const t=document.getElementById("partners-grid");if(!J.hasSearched){ir();return}t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="text-xs text-gray-500 mt-4 font-medium">Buscando parceiros...</p></div>';try{const e=await Mt(m.establishmentId);J.partners=e||[],nr()}catch(e){t.innerHTML=`<div class="text-center py-10 text-red-500 text-sm font-bold">Erro ao carregar parceiros: ${e.message}</div>`}}function nr(){const t=document.getElementById("partners-grid");if(!t)return;let e=J.partners;if(J.searchQuery){const r=J.searchQuery.toLowerCase();e=e.filter(o=>o.name.toLowerCase().includes(r)||o.document&&o.document.includes(r)||o.taxId&&o.taxId.includes(r)||o.email&&o.email.toLowerCase().includes(r)||o.contactName&&o.contactName.toLowerCase().includes(r))}if(J.categoryFilter!=="all"&&(e=e.filter(r=>r.category===J.categoryFilter)),J.stateFilter!=="all"&&(e=e.filter(r=>r.state===J.stateFilter)),J.cityFilter){const r=J.cityFilter.toLowerCase();e=e.filter(o=>o.city&&o.city.toLowerCase().includes(r))}if(e.sort((r,o)=>{let i="",n="";return J.sortBy==="name_asc"||J.sortBy==="name_desc"?(i=(r.name||"").toLowerCase(),n=(o.name||"").toLowerCase()):J.sortBy==="contact_asc"&&(i=(r.contactName||"").toLowerCase(),n=(o.contactName||"").toLowerCase()),J.sortBy==="name_desc"?n.localeCompare(i):i.localeCompare(n)}),e.length===0){t.innerHTML=`
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
    `,s='<div class="flex flex-col gap-2 md:hidden p-2">';e.forEach(r=>{let o=r.category;o==="Produtos"&&(o="estoque"),o==="Serviços"&&(o="servicos");const i=la[o]||la.outros,n=r.document||r.taxId?r.document||r.taxId:"-",l=JSON.stringify(r).replace(/'/g,"&apos;"),d=[r.city,r.state].filter(Boolean).join(" - ");a+=`
            <tr class="hover:bg-gray-50 cursor-pointer transition-colors group" data-action="open-form" data-item='${l}'>
                <td class="px-3 py-2 text-center">
                    <div class="w-8 h-8 mx-auto rounded-lg bg-${i.color}-100 text-${i.color}-600 flex items-center justify-center text-sm shadow-sm" title="${i.label}">
                        <i class="bi ${i.icon}"></i>
                    </div>
                </td>
                <td class="px-3 py-2">
                    <p class="font-bold text-gray-800 text-xs group-hover:text-indigo-700 transition-colors">${h(r.name)}</p>
                    ${r.email?`<p class="text-[9px] text-gray-500 mt-0.5 truncate max-w-[200px]"><i class="bi bi-envelope mr-1 opacity-50"></i>${h(r.email)}</p>`:""}
                </td>
                <td class="px-3 py-2 text-xs font-medium text-gray-600">${h(n)}</td>
                <td class="px-3 py-2">
                    <div class="text-xs font-medium text-gray-800">${h(r.contactName||"-")}</div>
                    ${d?`<div class="text-[9px] font-bold uppercase tracking-wider text-gray-400 mt-0.5"><i class="bi bi-geo-alt mr-1"></i>${h(d)}</div>`:""}
                </td>
                <td class="px-3 py-2 text-center">
                    <button class="w-6 h-6 mx-auto rounded flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-100 transition-colors shadow-sm bg-white border border-gray-200 group-hover:border-indigo-200">
                        <i class="bi bi-pencil-fill text-[10px]"></i>
                    </button>
                </td>
            </tr>
        `,s+=`
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex flex-col gap-2 active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden" data-action="open-form" data-item='${l}'>
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-${i.color}-500"></div>
                <div class="flex gap-3">
                    <div class="w-10 h-10 rounded-lg bg-${i.color}-100 text-${i.color}-600 flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                        <i class="bi ${i.icon}"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">${i.label.split(" ")[0]}</p>
                        <h3 class="font-bold text-gray-900 text-xs leading-tight truncate">${h(r.name)}</h3>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-lg p-2 border border-gray-100 mt-1 flex flex-col gap-1">
                    <div class="flex justify-between items-center text-[10px]">
                        <span class="text-gray-500 font-medium">Documento:</span>
                        <span class="font-bold text-gray-700">${h(n)}</span>
                    </div>
                    ${d?`
                    <div class="flex justify-between items-center text-[10px]">
                        <span class="text-gray-500 font-medium">Local:</span>
                        <span class="font-bold text-gray-700">${h(d)}</span>
                    </div>`:""}
                </div>
            </div>
        `}),a+="</tbody></table></div>",s+="</div>",t.innerHTML=a+s}function $t(t,e=null){const a=document.getElementById("suppliers-list-view"),s=document.getElementById("suppliers-form-view");J.viewMode=t,J.editingItem=e,t==="list"?(a.classList.remove("hidden"),a.classList.add("flex"),s.classList.add("hidden"),s.innerHTML='<div id="form-container-wrapper" class="max-w-4xl mx-auto w-full"></div>',J.hasSearched&&nr(),window.scrollTo({top:0,behavior:"smooth"})):(a.classList.add("hidden"),a.classList.remove("flex"),s.classList.remove("hidden"),Hl(e),window.scrollTo({top:0,behavior:"smooth"}))}async function zl(t){t.preventDefault();const e=t.target,a=e.querySelector("#supId").value,s={name:e.querySelector("#supName").value,contactName:e.querySelector("#supContact").value,email:e.querySelector("#supEmail").value,phone:e.querySelector("#supPhone").value,document:e.querySelector("#supTaxId").value,category:e.querySelector("#supCategory").value,state:e.querySelector("#supState").value,city:e.querySelector("#supCity").value,establishmentId:m.establishmentId,notes:e.querySelector("#supNotes")?.value||"",accessibleIn:[m.establishmentId]},r=e.querySelector('button[type="submit"]'),o=r.innerHTML;r.disabled=!0,r.innerHTML='<div class="loader-small border-white"></div> A gravar...';try{a?(await $l(a,s),f("Sucesso","Ficha atualizada!","success")):(await kl(s),f("Sucesso","Parceiro registado!","success")),J.hasSearched&&(J.partners=await Mt(m.establishmentId)||[]),$t("list")}catch(i){f("Erro","Falha ao gravar: "+i.message,"error"),r.disabled=!1,r.innerHTML=o}}async function Vl(t){if(await Y("Excluir Parceiro","Deseja realmente apagar esta ficha permanentemente?"))try{await Sl(t),f("Sucesso","Entidade excluída.","success"),J.partners=J.partners.filter(a=>a.id!==t),$t("list")}catch(a){f("Erro","Erro ao excluir: "+a.message,"error")}}function _l(){Ot&&Kt.removeEventListener("click",Ot),Ot=async t=>{const e=t.target;if(e.closest('button[data-action="new-partner"]')){$t("form",null);return}if(e.closest("#btn-search-partners")){J.searchQuery=document.getElementById("filterSearch").value,J.categoryFilter=document.getElementById("filterCategory").value,J.stateFilter=document.getElementById("filterState").value,J.cityFilter=document.getElementById("filterCity").value,J.sortBy=document.getElementById("filterSortBy").value,J.hasSearched=!0,Ol();return}if(e.closest('button[data-action="back-to-list"]')){$t("list");return}const a=e.closest('button[data-action="delete-partner"]');if(a){t.preventDefault(),Vl(a.dataset.id);return}const s=e.closest('[data-action="open-form"]');if(s&&!e.closest("button")){const r=JSON.parse(s.dataset.item.replace(/&apos;/g,"'"));$t("form",r)}},Kt.addEventListener("click",Ot),Kt.addEventListener("keypress",t=>{t.key==="Enter"&&(t.target.id==="filterSearch"||t.target.id==="filterCity")&&document.getElementById("btn-search-partners").click()})}const es=document.getElementById("content"),_s={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let V={professionals:[],services:[],hierarchyCache:[],statusFilter:"all",searchQuery:"",filterServiceId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set,viewMode:"list",tempProf:null},zt=null,Vt=null;function ea(){const t=ge.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function lr(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[m.establishmentId]}function Ul(){const t=document.getElementById("professionals-layout-main"),e=document.getElementById("professionals-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&t.classList.add("mobile-detail-open"),e&&(e.classList.remove("hidden"),e.classList.add("flex")),a&&(a.style.display="none")}function Aa(){const t=document.getElementById("professionals-layout-main"),e=document.getElementById("professionals-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&t.classList.remove("mobile-detail-open"),e&&(e.classList.add("hidden"),e.classList.remove("flex")),a&&(a.style.display=""),V.viewMode="list"}async function Wl(){V.selectedIds.clear(),V.viewMode="list";try{const t=await ye();V.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}dr(),td(),await da()}function dr(){es.innerHTML=`
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
                        <input type="text" id="searchInput" value="${V.searchQuery}" placeholder="Nome ou especialidade..." class="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-xs font-semibold text-slate-700">
                    </div>
                    
                    <div class="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
                        <button id="toggle-filter-btn" class="py-2 px-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-1.5 text-[10px] active:scale-95 ${V.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                            <i class="bi bi-funnel text-sm"></i> Filtros
                        </button>
                        <button data-action="open-professional-editor" data-id="" class="py-2 px-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-sm flex items-center justify-center gap-1.5 text-[10px] active:scale-95 uppercase tracking-wider">
                            <i class="bi bi-person-plus-fill text-sm"></i> Criar Perfil
                        </button>
                    </div>
                </div>

                <div id="filter-panel" class="${V.isAdvancedFilterOpen?"block":"hidden"} mb-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
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
                    <button data-status="all" class="status-filter-btn px-3 py-1.5 text-[10px] font-black rounded-lg border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${V.statusFilter==="all"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Todos</button>
                    <button data-status="active" class="status-filter-btn px-3 py-1.5 text-[10px] font-black rounded-lg border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${V.statusFilter==="active"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Ativos</button>
                    <button data-status="inactive" class="status-filter-btn px-3 py-1.5 text-[10px] font-black rounded-lg border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${V.statusFilter==="inactive"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Inativos</button>
                </div>

                <div id="professionalsList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                    ${pr(8)}
                </div>
            </section>

            <div id="professionals-layout-detail" class="hidden absolute inset-0 z-50 bg-slate-50 flex-col overflow-hidden w-full h-full md:relative md:inset-auto md:z-auto md:flex-1 md:border-l md:border-slate-200">
            </div>
        </div>
    `}async function da(){const t=document.getElementById("professionalsList"),e=lr();try{const a=e.map(l=>Ee(l)),s=e.map(l=>pt(l)),r=await Promise.all(a),o=await Promise.all(s),i=new Map;r.flat().forEach(l=>i.set(l.id,l)),V.professionals=Array.from(i.values()),m.professionals=V.professionals;const n=new Map;o.flat().forEach(l=>n.set(l.id,l)),V.services=Array.from(n.values()),cr(),Qe()}catch(a){console.error(a),t&&(t.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>')}}function cr(){const t=document.getElementById("filterServiceId");t&&V.services&&(t.innerHTML='<option value="all">Todos os serviços</option>',V.services.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=h(e.name),V.filterServiceId===e.id&&(a.selected=!0),t.appendChild(a)}))}function ur(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=V.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function Jl(t){const e=document.getElementById("summary-section");if(!e)return;const a=t.length,s=t.filter(o=>o.status!=="inactive").length,r=a-s;e.innerHTML=`
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
            <span class="text-xs md:text-lg font-black text-red-500 mt-0.5 w-full truncate">${r}</span>
        </div>
        <div class="bg-indigo-50 p-1.5 md:p-3 rounded-lg border border-indigo-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[8px] font-bold text-indigo-500 uppercase tracking-widest w-full truncate">Exibidos</span>
            <span class="text-xs md:text-lg font-black text-indigo-700 mt-0.5 w-full truncate">${t.length}</span>
        </div>
    `}function Qe(){const t=document.getElementById("professionalsList");if(!t)return;if(!V.professionals||V.professionals.length===0){t.innerHTML=pr(8);return}const e=lr(),a=V.professionals.filter(s=>{const r=s.name.toLowerCase().includes(V.searchQuery)||s.specialty&&s.specialty.toLowerCase().includes(V.searchQuery);let o=!0;V.statusFilter==="active"&&(o=s.status!=="inactive"),V.statusFilter==="inactive"&&(o=s.status==="inactive");const i=V.filterServiceId==="all"||s.services&&s.services.includes(V.filterServiceId),n=s.accessibleIn&&s.accessibleIn.length>0?s.accessibleIn:[s.establishmentId||m.establishmentId],l=e.some(d=>n.includes(d));return r&&o&&i&&l});if(Jl(a),a.length===0){t.innerHTML=`
            <div class="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-people text-2xl text-slate-300"></i>
                </div>
                <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhum profissional encontrado</h3>
                <p class="text-[10px] text-slate-500 max-w-xs text-center">Tente ajustar os filtros ou verificar as unidades selecionadas no topo.</p>
            </div>
        `;return}t.innerHTML=a.map(s=>{const r=s.status==="inactive",o=h(s.name),i=h(s.specialty||"Especialidade"),n=s.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(s.name?s.name.charAt(0):"P")}`,l=s.accessibleIn?s.accessibleIn.length:1,d=s.services?s.services.length:0,u=V.selectedIds.has(s.id);return`
            <div class="professional-card relative bg-white rounded-2xl border ${u?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-slate-200"} shadow-sm flex items-center p-3.5 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 active:scale-[0.98] ${r?"opacity-60 bg-slate-50":""}" 
                 data-action="open-professional-editor" data-id="${s.id}">
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" data-action-stop-propagation="true">
                    <input type="checkbox" data-id="${s.id}" class="professional-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${u?"checked":""}>
                </div>

                <div class="relative flex-shrink-0 mr-4">
                    <img src="${n}" alt="${o}" class="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border border-slate-100 shadow-sm">
                    <span class="absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${r?"bg-red-500":"bg-emerald-500"}" title="${r?"Inativo":"Ativo"}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-6">
                    <h3 class="text-sm font-black text-slate-800 truncate leading-tight mb-0.5">${o}</h3>
                    <p class="text-[10px] font-bold text-slate-500 truncate uppercase tracking-widest">${i}</p>
                    
                    <div class="flex items-center gap-1.5 mt-2">
                        ${l>1?`<span class="text-[9px] font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded-md border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${l}</span>`:'<span class="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md border border-slate-200 flex items-center gap-1"><i class="bi bi-geo-alt"></i> Única</span>'}
                        <span class="text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200 flex items-center gap-1" title="${d} serviços habilitados"><i class="bi bi-scissors text-indigo-400"></i> ${d}</span>
                    </div>
                </div>
            </div>`}).join("")}function pr(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center p-3.5 animate-pulse h-[86px]">
            <div class="w-12 h-12 rounded-full bg-slate-200 flex-shrink-0 mr-4"></div>
            <div class="flex-1 space-y-2">
                <div class="h-3 bg-slate-200 rounded w-3/4"></div>
                <div class="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}async function Gl(t){V.viewMode="edit-professional";const e=document.getElementById("professionals-layout-detail");if(!e)return;let a={name:"",specialty:"",status:"active",workingHours:{},services:[]};if(t){const o=V.professionals.find(i=>String(i.id)===String(t));o&&(a=JSON.parse(JSON.stringify(o)))}V.tempProf=a;const s=!!a.id;h(a.name||"Novo Profissional");const r=`
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
        ${r}
        
        <div class="modal-tabs px-2 md:px-6 border-b flex items-center overflow-x-auto bg-slate-50 flex-shrink-0 custom-scrollbar shadow-sm">
            <button class="tab-link active whitespace-nowrap text-[10px] md:text-xs font-bold py-3.5 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors uppercase tracking-widest" data-tab="dados-basicos">1. Básicos</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-bold py-3.5 px-4 border-b-2 border-transparent text-slate-500 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="atuacao">2. Atuação</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-bold py-3.5 px-4 border-b-2 border-transparent text-slate-500 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="jornada">3. Jornada</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-bold py-3.5 px-4 border-b-2 border-transparent text-slate-500 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="bloqueios">4. Bloqueios</button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-3 md:p-6 custom-scrollbar bg-slate-50/50 pb-6 relative"> 
            <form id="professionalForm" class="h-full max-w-4xl mx-auto">
                <input type="hidden" id="professionalId" value="${a.id||""}">
                <input type="hidden" id="profPhotoBase64" value="${a.photo||""}">
                
                <div id="dados-basicos" class="tab-content active space-y-4 md:space-y-6"></div>
                <div id="atuacao" class="tab-content hidden space-y-4 md:space-y-6"></div>
                <div id="jornada" class="tab-content hidden animate-fade-in-fast"></div>
                <div id="bloqueios" class="tab-content hidden animate-fade-in-fast"></div>
            </form>
        </div>

        <footer class="p-3 md:p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)] w-full flex-shrink-0 z-50 flex gap-3">
            <button type="button" data-action="close-detail-screen" class="hidden md:block py-3 px-5 bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors shadow-sm">Cancelar</button>
            <button type="button" data-action="save-professional" class="w-full py-3 bg-indigo-600 text-white font-black text-sm rounded-xl hover:bg-indigo-700 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider">
                <i class="bi bi-save2 text-lg"></i> Salvar Perfil
            </button>
        </footer>
    `,Ql(a,V.services),Xl(a),await Kl(a,V.professionals),ed(a),Ul()}function Ql(t,e){const a=document.getElementById("dados-basicos"),s=document.getElementById("atuacao");if(!a||!s)return;const r=t.dob?t.dob.split("/"):["",""],o=Array.from({length:12},(u,c)=>{const p=c+1,b=p==r[1]?"selected":"",g=new Date(0,c).toLocaleString("pt-BR",{month:"long"});return`<option value="${p}" ${b}>${g.charAt(0).toUpperCase()+g.slice(1)}</option>`}).join(""),i=h(t.name||""),n=h(t.specialty||""),l=h(t.phone||""),d=h(t.notes||"");a.innerHTML=`
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
                        <input type="tel" id="profPhone" value="${l}" placeholder="(00) 00000-0000" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profDobDay" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Aniversário (Dia)</label>
                        <input type="number" id="profDobDay" value="${r[0]}" min="1" max="31" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profDobMonth" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Aniversário (Mês)</label>
                        <select id="profDobMonth" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
                            <option value="">Selecione...</option>${o}
                        </select>
                    </div>
                </div>

                <div class="form-group pt-2">
                    <label for="profNotes" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Observações Internas</label>
                    <textarea id="profNotes" rows="3" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-medium text-slate-700 shadow-inner transition-colors placeholder-slate-400 resize-none" placeholder="Ex: Informações contratuais, detalhes de preferência...">${d}</textarea>
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
                    ${Yl(t.accessibleIn||[])}
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
                
                <div id="profServicesContainer" class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto custom-scrollbar pr-1 flex-1">
                    ${e.map(u=>`
                        <label class="flex items-center space-x-3 p-2.5 bg-slate-50 rounded-xl cursor-pointer transition-colors border border-slate-200 hover:border-indigo-300 hover:shadow-sm">
                            <input type="checkbox" value="${u.id}" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" ${t.services?.includes(u.id)?"checked":""}>
                            <span class="text-xs font-bold text-slate-700 truncate" title="${h(u.name)}">${h(u.name)}</span>
                        </label>
                    `).join("")}
                    ${e.length===0?'<p class="col-span-full text-center text-xs font-bold text-slate-400 py-6 border border-dashed border-slate-200 rounded-xl">Nenhum serviço cadastrado no sistema.</p>':""}
                </div>
            </div>
        </div>
    `}function Yl(t=[]){if(!V.hierarchyCache||V.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${m.establishmentId}">
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 text-center">
                <i class="bi bi-info-circle text-lg block mb-1"></i> Exclusivo desta unidade.
            </div>`;let e='<div class="space-y-1.5 mt-2 max-h-48 overflow-y-auto custom-scrollbar">';return V.hierarchyCache.forEach(a=>{const s=t.includes(a.id)||t.length===0&&a.id===m.establishmentId;e+=`
            <label class="flex items-center space-x-3 p-2.5 cursor-pointer bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-colors">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-xs font-black text-slate-800">🏢 ${h(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(r=>{const o=t.includes(r.id)||t.length===0&&r.id===m.establishmentId;e+=`
                    <label class="flex items-center space-x-3 p-2.5 ml-6 cursor-pointer bg-white hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl transition-colors border-l-4 border-l-indigo-200">
                        <input type="checkbox" name="accessibleIn" value="${r.id}" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                        <span class="text-xs font-bold text-slate-600">📍 ${h(r.name)}</span>
                    </label>
                `})}),e+="</div>",e}function Xl(t){const e=document.getElementById("jornada");e&&(e.innerHTML=`
        <div class="max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-1">Jornada Semanal</h3>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Defina os dias e os horários de atendimento.</p>
            <div id="profScheduleContainer" class="grid grid-cols-1 lg:grid-cols-2 gap-3"></div>
        </div>`,Zl(e.querySelector("#profScheduleContainer"),t.workingHours||{}))}function Zl(t,e){t.innerHTML=Object.keys(_s).map(a=>{const s=e[a]||{},r=s.active!==!1;return`
            <div class="day-schedule-card p-3 md:p-4 rounded-xl ${r?"bg-white border-slate-200 shadow-sm":"bg-slate-50 border-slate-100 disabled opacity-60"} border transition-all">
                 <div class="flex justify-between items-center mb-3">
                    <span class="font-black text-sm text-slate-800 uppercase tracking-wider">${_s[a]}</span>
                    <label class="flex items-center cursor-pointer">
                        <div class="relative">
                            <input type="checkbox" data-day="${a}" data-field="active" class="sr-only" ${r?"checked":""}>
                            <div class="toggle-bg block bg-slate-200 w-11 h-6 rounded-full peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full shadow-inner"></div>
                        </div>
                    </label>
                 </div>
                <div class="time-inputs grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><label class="block text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1 ml-1">Abertura:</label><input type="time" data-day="${a}" data-field="start" value="${s.start||"09:00"}" class="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner" ${r?"":"disabled"}></div>
                    <div><label class="block text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1 ml-1">Fecho:</label><input type="time" data-day="${a}" data-field="end" value="${s.end||"18:00"}" class="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner" ${r?"":"disabled"}></div>
                    <div><label class="block text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1 ml-1">Início Pausa:</label><input type="time" data-day="${a}" data-field="breakStart" value="${s.breakStart||"12:00"}" class="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner" ${r?"":"disabled"}></div>
                    <div><label class="block text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1 ml-1">Fim Pausa:</label><input type="time" data-day="${a}" data-field="breakEnd" value="${s.breakEnd||"13:00"}" class="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner" ${r?"":"disabled"}></div>
                </div>
            </div>`}).join(""),t.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",s=>{const r=s.target.closest(".day-schedule-card"),o=!s.target.checked;r.classList.toggle("bg-white",!o),r.classList.toggle("shadow-sm",!o),r.classList.toggle("border-slate-200",!o),r.classList.toggle("bg-slate-50",o),r.classList.toggle("border-slate-100",o),r.classList.toggle("opacity-60",o),r.classList.toggle("disabled",o),r.querySelectorAll(".time-inputs input").forEach(i=>i.disabled=o)})})}async function Kl(t,e){const a=document.getElementById("bloqueios");if(!a)return;a.innerHTML=`
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div class="border-b xl:border-b-0 xl:border-r border-slate-100 pb-6 xl:pb-0 xl:pr-6">
                <h3 class="text-sm font-black text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-wider"><i class="bi bi-calendar-x text-orange-500 text-lg"></i> Lançar Bloqueio / Férias</h3>
                <form id="batchBlockageForm" class="p-4 md:p-5 bg-orange-50/30 border border-orange-200 rounded-2xl space-y-4">
                    <div>
                        <h4 class="font-bold text-slate-700 mb-2 text-[10px] uppercase tracking-widest ml-1">Aplicar aos Profissionais:</h4>
                        <div id="batchProfSelectionContainer" class="max-h-32 overflow-y-auto custom-scrollbar p-2 border border-orange-200 rounded-xl bg-white space-y-1 shadow-inner">
                            ${e.map(o=>`
                                <label class="flex items-center space-x-3 hover:bg-orange-50 p-2 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-orange-100">
                                    <input type="checkbox" name="batch-professionals" value="${o.id}" class="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500" ${o.id===t.id?"checked":""}>
                                    <span class="text-xs font-bold text-slate-700">${h(o.name)}</span>
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
                        <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">${h((t.name||"").split(" ")[0]||"Profissional")}</p>
                    </div>
                    <select id="prof-blockages-filter" class="p-2 border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm">
                        <option value="future">Apenas Futuros</option>
                        <option value="history">Histórico Passado</option>
                    </select>
                </div>
                <div id="blockagesList" class="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2"></div>
            </div>
        </div>`;const s=document.getElementById("batchBlockageForm");s&&s.addEventListener("submit",async o=>{o.preventDefault();const i=s.querySelector('button[type="submit"]'),n=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';const l=Array.from(o.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(v=>v.value);if(l.length===0)return i.disabled=!1,i.innerHTML=n,f("Atenção","Selecione pelo menos um profissional.","error");const d=o.target.batchBlockageStartDate.value,u=o.target.batchBlockageEndDate.value||d,c=o.target.batchBlockageStartTime.value,p=o.target.batchBlockageEndTime.value,b=o.target.batchBlockageReason.value;if(!d||!c||!p)return i.disabled=!1,i.innerHTML=n,f("Atenção","Preencha Data de Início, Hora de Início e Fim.","error");const g=l.map(v=>{const y={professionalId:v,establishmentId:m.establishmentId,startTime:new Date(`${d}T${c}`).toISOString(),endTime:new Date(`${u}T${p}`).toISOString(),reason:b};return $a(y)});try{await Promise.all(g),f("Sucesso!",`${l.length} bloqueios foram criados.`),s.reset(),o.target.querySelectorAll('input[name="batch-professionals"]').forEach(y=>{y.checked=y.value===t.id});const v=document.getElementById("prof-blockages-filter").value;St(t.id,v)}catch(v){f("Erro",v.message,"error")}finally{i.disabled=!1,i.innerHTML=n}});const r=document.getElementById("prof-blockages-filter");r&&r.addEventListener("change",o=>St(t.id,o.target.value)),t.id&&await St(t.id,"future")}async function St(t,e="future"){const a=document.getElementById("blockagesList");if(a){if(a.innerHTML='<div class="loader mx-auto mt-6"></div>',!t){a.innerHTML=`
            <div class="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <i class="bi bi-info-circle text-2xl text-slate-300 mb-2 block"></i>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Salve o perfil para ver o histórico.</p>
            </div>`;return}try{const s=new Date;let r,o;e==="history"?(o=new Date,r=new Date,r.setFullYear(r.getFullYear()-2)):(r=new Date,o=new Date,o.setFullYear(o.getFullYear()+2));let n=(await ka(m.establishmentId,r.toISOString(),o.toISOString(),t)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));e==="history"?n=n.filter(d=>d.endTime<s).sort((d,u)=>u.startTime-d.startTime):n=n.filter(d=>d.endTime>=s).sort((d,u)=>d.startTime-u.startTime);const l=n.reduce((d,u)=>{const c=u.reason||"Sem motivo detalhado";return d[c]||(d[c]=[]),d[c].push(u),d},{});if(Object.keys(l).length===0){a.innerHTML=`
                <div class="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    <i class="bi bi-calendar-check text-3xl text-slate-300 mb-2 block"></i>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhum bloqueio ${e==="history"?"no histórico":"agendado para o futuro"}.</p>
                </div>`;return}a.innerHTML=Object.entries(l).map(([d,u])=>`
            <div class="bg-white border border-slate-200 rounded-xl shadow-sm mb-3 overflow-hidden">
                <div class="bg-slate-50 px-3 py-2.5 border-b border-slate-200 flex justify-between items-center">
                    <h4 class="font-black text-xs text-slate-800 flex items-center gap-2"><i class="bi bi-tag-fill text-orange-400 text-sm"></i> ${h(d)}</h4>
                    ${u.length>1?`<button data-action="batch-delete-blockage" data-ids='${JSON.stringify(u.map(c=>c.id))}' class="text-[9px] text-red-600 bg-red-50 hover:bg-red-100 font-bold px-2 py-1.5 rounded-lg border border-red-100 transition-colors uppercase tracking-widest active:scale-95">Apagar Todos (${u.length})</button>`:""}
                </div>
                <div class="divide-y divide-slate-100 p-1">
                ${u.map(c=>`
                    <div class="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="bg-orange-50 text-orange-600 border border-orange-100 w-11 h-11 rounded-xl flex flex-col items-center justify-center leading-none shadow-inner">
                                <span class="font-black text-sm">${c.startTime.getDate().toString().padStart(2,"0")}</span>
                                <span class="text-[8px] uppercase font-bold">${c.startTime.toLocaleString("pt-BR",{month:"short"})}</span>
                            </div>
                            <div>
                                <p class="text-xs font-black text-slate-700">
                                   ${c.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} <span class="text-slate-400 font-medium">até</span> ${c.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}
                                </p>
                                ${c.startTime.getDate()!==c.endTime.getDate()?`<p class="text-[10px] text-slate-400 font-bold mt-0.5">Termina: ${c.endTime.toLocaleDateString("pt-BR")}</p>`:""}
                            </div>
                        </div>
                        <button data-action="delete-blockage" data-id="${c.id}" class="text-slate-400 hover:text-red-500 w-8 h-8 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors flex items-center justify-center shadow-sm" title="Apagar">
                            <i class="bi bi-trash3 pointer-events-none"></i>
                        </button>
                    </div>
                `).join("")}
                </div>
            </div>
        `).join("")}catch(s){a.innerHTML=`<p class="text-[10px] font-bold text-red-500 p-4 bg-red-50 rounded-xl border border-red-100">${s.message}</p>`}}}function ed(t){const e=document.getElementById("professionals-layout-detail");if(!e)return;const a=e.querySelectorAll(".tab-link");a.forEach(p=>{p.addEventListener("click",b=>{b.preventDefault(),a.forEach(y=>{y.classList.remove("active","border-indigo-600","text-indigo-600"),y.classList.add("border-transparent","text-slate-500")}),p.classList.add("active","border-indigo-600","text-indigo-600"),p.classList.remove("border-transparent","text-slate-500"),e.querySelectorAll(".tab-content").forEach(y=>y.classList.add("hidden"));const g=p.dataset.tab,v=e.querySelector("#"+g);v&&v.classList.remove("hidden")})});const s=e.querySelector("#profPhotoInput"),r=e.querySelector("#profPhotoButton"),o=e.querySelector("#profPhotoContainer"),i=e.querySelector("#profPhotoPreview"),n=e.querySelector("#profPhotoBase64"),l=t.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,d=t.photo||"",u=()=>s.click();r&&r.addEventListener("click",u),o&&o.addEventListener("click",u),s&&(s.onchange=async()=>{const p=s.files[0];if(p){i.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const b=await wa(p,800,800,.8);if(b.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");i.src=b,n.value=b}catch(b){f("Erro de Imagem",b.message||"Não foi possível processar a imagem.","error"),i.src=l,n.value=d,s.value=""}}});const c=e.querySelector("#selectAllServicesBtn");if(c){c.addEventListener("click",()=>{const b=e.querySelectorAll('#profServicesContainer input[type="checkbox"]'),g=Array.from(b).every(v=>v.checked);b.forEach(v=>{v.checked=!g}),c.textContent=g?"Selecionar Todos":"Desmarcar Todos"});const p=e.querySelectorAll('#profServicesContainer input[type="checkbox"]');p.length>0&&Array.from(p).every(b=>b.checked)&&(c.textContent="Desmarcar Todos")}}function td(){zt&&document.body.removeEventListener("click",zt),Vt&&es.removeEventListener("input",Vt),zt=async t=>{if(t.target.classList.contains("professional-checkbox")){const o=t.target.dataset.id;t.target.checked?V.selectedIds.add(o):V.selectedIds.delete(o),ur(),t.stopPropagation();return}const e=t.target.closest(".status-filter-btn");if(e){V.statusFilter=e.dataset.status,document.querySelectorAll(".status-filter-btn").forEach(o=>{o.classList.remove("bg-indigo-600","text-white","border-indigo-600"),o.classList.add("bg-white","text-slate-600","border-slate-200")}),e.classList.remove("bg-white","text-slate-600","border-slate-200"),e.classList.add("bg-indigo-600","text-white","border-indigo-600"),Qe();return}if(t.target.id==="clear-filters-btn"){t.preventDefault(),document.getElementById("filterServiceId").value="all",V.filterServiceId="all",Qe();return}if(t.target.id==="apply-filter-btn"){t.preventDefault(),V.filterServiceId=document.getElementById("filterServiceId").value,Qe();return}if(t.target.closest("#toggle-filter-btn")){t.preventDefault(),V.isAdvancedFilterOpen=!V.isAdvancedFilterOpen,dr(),document.getElementById("searchInput").value=V.searchQuery,cr(),Qe();return}const s=t.target.closest("[data-action]");if(!s)return;const r=s.dataset.action;switch(["close-detail-screen","delete-professional","save-professional","delete-blockage","batch-delete-blockage"].includes(r)&&t.stopPropagation(),r){case"open-professional-editor":Gl(s.dataset.id);break;case"close-detail-screen":Aa(),V.tempProf=null;break;case"batch-delete":ad();break;case"delete-professional":{const o=s.dataset.id,i=V.tempProf?.name||"Profissional";if(await Y("Excluir Profissional",`Tem certeza que deseja excluir ${i}? Esta ação não pode ser desfeita.`))try{await vo(o),oe(m.establishmentId,ea(),"Equipe","Excluiu",`Excluiu profissional: ${i}`),f("Sucesso!","Profissional excluído da rede.","success"),Aa(),da()}catch(l){f("Erro",`Não foi possível excluir: ${l.message}`,"error")}break}case"save-professional":{const o=document.getElementById("professionals-layout-detail"),i=s,n=o.querySelector("#profScheduleContainer"),l=Array.from(o.querySelectorAll('#profServicesContainer input[type="checkbox"]:checked')).map(k=>k.value),d={};n&&n.querySelectorAll(".day-schedule-card").forEach(k=>{const T=k.querySelector('[data-field="active"]').dataset.day;d[T]={active:k.querySelector('[data-field="active"]').checked,start:k.querySelector('[data-field="start"]').value,end:k.querySelector('[data-field="end"]').value,breakStart:k.querySelector('[data-field="breakStart"]').value,breakEnd:k.querySelector('[data-field="breakEnd"]').value}});const u=Array.from(o.querySelectorAll('input[name="accessibleIn"]:checked')).map(k=>k.value),c=u.length>0?u:[m.establishmentId],p=o.querySelector("#profStatusToggle").checked,b=o.querySelector("#profCommissionToggle").checked,g=o.querySelector("#profShowOnAgendaToggle").checked,v={...V.tempProf,id:o.querySelector("#professionalId").value||void 0,accessibleIn:c,name:o.querySelector("#profName").value.trim(),specialty:o.querySelector("#profSpecialty").value,photo:o.querySelector("#profPhotoBase64").value,services:l,workingHours:d,phone:o.querySelector("#profPhone").value,dob:`${o.querySelector("#profDobDay").value}/${o.querySelector("#profDobMonth").value}`,receivesCommission:b,showOnAgenda:g,orderOnAgenda:parseInt(o.querySelector("#profOrderOnAgenda").value)||1,notes:o.querySelector("#profNotes").value,status:p?"active":"inactive",establishmentId:m.establishmentId},y=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{v.id?(await Oa(v.id,v),oe(m.establishmentId,ea(),"Equipe","Editou",`Editou o profissional: ${v.name}`),f("Sucesso!","Dados atualizados.","success")):(delete v.id,await gi(v),oe(m.establishmentId,ea(),"Equipe","Criou",`Cadastrou o profissional: ${v.name}`),f("Sucesso!","Novo membro adicionado à equipe.","success")),Aa(),da()}catch(k){f("Erro",k.message,"error"),i.disabled=!1,i.innerHTML=y}break}case"delete-blockage":{const o=s.dataset.id;if(await Y("Apagar Bloqueio","O profissional voltará a ficar disponível na agenda neste dia. Confirma?"))try{await bs(o),f("Bloqueio removido.","success");const i=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";St(V.tempProf.id,i)}catch(i){f("Erro",i.message,"error")}break}case"batch-delete-blockage":{const o=JSON.parse(s.dataset.ids);if(await Y("Apagar em Lote",`Tem certeza que deseja apagar ${o.length} dias de bloqueio de uma vez?`))try{await Ro(o),f("Bloqueios removidos.","success");const i=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";St(V.tempProf.id,i)}catch(i){f("Erro",i.message,"error")}break}}},document.body.addEventListener("click",zt),Vt=t=>{t.target.id==="searchInput"&&(V.searchQuery=t.target.value,Qe())},es.addEventListener("input",Vt)}function ad(){Y("Excluir em Lote",`Tem certeza que deseja excluir ${V.selectedIds.size} profissionais da rede? Esta ação não pode ser desfeita.`).then(async t=>{if(t)try{await fi(Array.from(V.selectedIds)),oe(m.establishmentId,ea(),"Equipe","Excluiu em Lote",`Excluiu ${V.selectedIds.size} profissionais`),f("Sucesso!",`${V.selectedIds.size} profissionais foram excluídos.`,"success"),V.selectedIds.clear(),ur(),da()}catch(e){f("Erro",`Não foi possível excluir em lote: ${e.message}`,"error")}})}let w={clients:[],selectedClient:null,activeTab:"profile",establishments:[],filterEstablishmentIds:new Set,filters:{search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1,status:"all"},sortConfig:{key:"name",direction:"asc"},selectedIds:new Set,loading:!1,historyLimit:20,historySearchTerm:"",historyLoading:!1,historyData:{appointments:[],sales:[],loyaltyLog:[]},modalOpen:!1},ca=null,_t=null;const br=t=>t?String(t).replace(/\D/g,""):"",ts=t=>{if(!t)return"Nunca";let e;if(typeof t=="object"&&(t.seconds||t._seconds)){const a=t.seconds||t._seconds;e=new Date(a*1e3)}else e=new Date(t);return isNaN(e.getTime())?"Data Inválida":e.toLocaleDateString("pt-BR")},as=t=>{if(!t)return"CL";const e=t.trim().split(" ");return e.length>=2?(e[0][0]+e[e.length-1][0]).toUpperCase():t.substring(0,2).toUpperCase()};async function sd(){ca=document.getElementById("content"),w.selectedClient=null,w.historyLimit=20,w.modalOpen=!1,w.selectedIds.clear(),w.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1,status:"all"},w.sortConfig={key:"name",direction:"asc"};try{const e=(await ye().catch(()=>({matrizes:[]}))).matrizes||[];w.establishments=[],e.forEach(a=>{w.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>w.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),w.filterEstablishmentIds.size===0&&w.filterEstablishmentIds.add(m.establishmentId)}catch(t){console.error("Erro ao buscar hierarquia",t)}od(),id(),await $s()}function od(){const t=w.establishments.map(e=>`
        <label class="inline-flex items-center gap-2 px-3 py-1.5 bg-white border ${w.filterEstablishmentIds.has(e.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-gray-200 text-gray-600"} rounded-lg cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" value="${e.id}" ${w.filterEstablishmentIds.has(e.id)?"checked":""}>
            <span class="text-xs font-bold whitespace-nowrap">${e.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${e.name}</span>
        </label>
    `).join("");ca.innerHTML=`
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

            ${w.establishments.length>1?`
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
    `}function rd(){const t=document.getElementById("table-header-container");if(!t)return;const e=a=>w.sortConfig.key!==a?'<i class="bi bi-arrow-down-up ml-1 opacity-40 text-xs"></i>':w.sortConfig.direction==="asc"?'<i class="bi bi-arrow-up ml-1 text-indigo-600"></i>':'<i class="bi bi-arrow-down ml-1 text-indigo-600"></i>';t.innerHTML=`
        <div class="hidden md:grid grid-cols-12 gap-2 px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest items-center bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <div class="col-span-4 pl-2 flex items-center gap-3">
                <input type="checkbox" id="select-all-toggle" class="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" ${w.selectedIds.size>0&&w.selectedIds.size===w.clients.length?"checked":""}>
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
    `}async function $s(){w.loading=!0;const t=document.getElementById("list-container");t&&(t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-xs">Carregando clientes...</p></div>');try{const a=Array.from(w.filterEstablishmentIds).map(i=>{let n=`/api/clients/${i}?limit=1000`;return C(n).catch(()=>[])}),r=(await Promise.all(a)).flat(),o=new Map;r.forEach(i=>o.set(i.id,i)),w.clients=Array.from(o.values()),Ss(),$e()}catch(e){console.error(e),f("Erro","Falha ao carregar clientes.","error"),t&&(t.innerHTML='<div class="text-center py-10 text-red-500 text-sm">Erro ao carregar dados.</div>')}finally{w.loading=!1}}function Ss(){const t=new Date().getMonth()+1,e=new Date().getFullYear();let a=0,s=0,r=0;w.clients.forEach(o=>{if(o.totalDebt&&parseFloat(o.totalDebt)>0&&s++,o.dobMonth==t&&r++,o.createdAt){const i=new Date(o.createdAt);i.getMonth()+1===t&&i.getFullYear()===e&&a++}}),document.getElementById("kpi-total").textContent=w.clients.length,document.getElementById("kpi-novos").textContent=a,document.getElementById("kpi-devendo").textContent=s,document.getElementById("kpi-niver").textContent=r}function $e(){rd();const t=document.getElementById("list-container");let e=w.clients;if(w.filters.search){const a=w.filters.search.toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(a)||s.phone&&s.phone.includes(a)||s.cpf&&s.cpf.includes(a))}if(w.filters.status==="devendo")e=e.filter(a=>a.totalDebt&&parseFloat(a.totalDebt)>0);else if(w.filters.status==="aniversariantes"){const a=new Date().getMonth()+1;e=e.filter(s=>s.dobMonth==a)}else if(w.filters.status==="novos"){const a=new Date().getMonth()+1,s=new Date().getFullYear();e=e.filter(r=>{if(!r.createdAt)return!1;const o=new Date(r.createdAt);return o.getMonth()+1===a&&o.getFullYear()===s})}if(w.filters.hasLoyalty&&(e=e.filter(a=>a.loyaltyPoints&&a.loyaltyPoints>0)),w.filters.inactiveDays){const a=parseInt(w.filters.inactiveDays),s=new Date;s.setDate(s.getDate()-a),e=e.filter(r=>{if(!r.lastVisit&&!r.createdAt)return!1;let o;if(r.lastVisit){const i=r.lastVisit.seconds||r.lastVisit._seconds;o=i?new Date(i*1e3):new Date(r.lastVisit)}else o=new Date(r.createdAt);return o<s})}if(e.sort((a,s)=>{let r,o;switch(w.sortConfig.key){case"name":return r=(a.name||"").toLowerCase(),o=(s.name||"").toLowerCase(),w.sortConfig.direction==="asc"?r.localeCompare(o):o.localeCompare(r);case"contact":return r=a.phone||"",o=s.phone||"",w.sortConfig.direction==="asc"?r.localeCompare(o):o.localeCompare(r);case"lastVisit":r=a.lastVisit?a.lastVisit.seconds?a.lastVisit.seconds:new Date(a.lastVisit).getTime()/1e3:a.createdAt?new Date(a.createdAt).getTime()/1e3:0,o=s.lastVisit?s.lastVisit.seconds?s.lastVisit.seconds:new Date(s.lastVisit).getTime()/1e3:s.createdAt?new Date(s.createdAt).getTime()/1e3:0;break;case"financial":r=parseFloat(a.totalDebt)||0,o=parseFloat(s.totalDebt)||0;break;default:r=a.name,o=s.name}return r<o?w.sortConfig.direction==="asc"?-1:1:r>o?w.sortConfig.direction==="asc"?1:-1:0}),e.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-people text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum cliente encontrado</h3>
                <p class="text-[10px] text-gray-400 max-w-xs text-center">Tente ajustar a busca ou os filtros ativos.</p>
            </div>`;return}t.innerHTML=e.map(a=>{const s=a.totalDebt&&parseFloat(a.totalDebt)>0,r=ts(a.lastVisit),o=br(a.phone),i=new Date().getMonth()+1,n=a.dobMonth==i,l=w.selectedIds.has(a.id);let d="";return n&&(d+='<span class="bg-indigo-50 text-indigo-600 text-[8px] font-bold px-1.5 py-0.5 rounded border border-indigo-100 uppercase tracking-wider">🎂 Niver</span> '),a.loyaltyPoints>0&&(d+=`<span class="bg-amber-50 text-amber-600 text-[8px] font-bold px-1.5 py-0.5 rounded border border-amber-100 uppercase tracking-wider"><i class="bi bi-star-fill"></i> ${a.loyaltyPoints} pts</span> `),`
        <div class="border-b border-gray-100 hover:bg-gray-50 transition-colors relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-2.5 md:p-2 mb-2 md:mb-0 bg-white md:bg-transparent rounded-xl md:rounded-none shadow-sm md:shadow-none border md:border-b ${s?"border-l-4 border-l-red-400":"border-l-4 border-l-transparent hover:border-l-indigo-300"} ${l?"bg-indigo-50/40":""} cursor-pointer" data-action="open-modal" data-id="${a.id}">
            
            <div class="flex justify-between items-start md:hidden mb-2 relative">
                <div class="absolute -top-1 -right-1 z-20">
                    <input type="checkbox" value="${a.id}" class="item-checkbox w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${l?"checked":""}>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full ${s?"bg-red-100 text-red-600 border border-red-200":"bg-gray-100 text-gray-600 border border-gray-200"} flex items-center justify-center font-bold text-xs flex-shrink-0">
                        ${as(a.name)}
                    </div>
                    <div class="pr-6">
                        <p class="font-bold text-xs text-gray-800 truncate max-w-[180px]">${h(a.name)}</p>
                        <p class="text-[9px] text-gray-500 font-medium">${h(a.phone||"Sem contato")}</p>
                    </div>
                </div>
                ${o?`<button data-action="whatsapp" data-phone="${o}" class="w-7 h-7 mt-5 bg-[#25D366]/10 text-[#25D366] rounded flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors border border-[#25D366]/20"><i class="bi bi-whatsapp text-[10px]"></i></button>`:""}
            </div>

            <div class="hidden md:flex md:col-span-4 items-center gap-2 pl-1">
                <input type="checkbox" value="${a.id}" class="item-checkbox w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm z-20 flex-shrink-0" ${l?"checked":""}>
                <div class="w-8 h-8 rounded-full ${s?"bg-red-100 text-red-600 border border-red-200":"bg-gray-100 text-gray-600 border border-gray-200"} flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
                    ${as(a.name)}
                </div>
                <div class="min-w-0">
                    <p class="font-bold text-xs text-gray-800 truncate" title="${h(a.name)}">${h(a.name)}</p>
                    <div class="flex gap-1 mt-0.5">${d}</div>
                </div>
            </div>

            <div class="hidden md:block md:col-span-3">
                <p class="text-[10px] font-bold text-gray-700">${h(a.phone||"--")}</p>
                <p class="text-[9px] text-gray-400 truncate w-full" title="${h(a.email||"")}">${h(a.email||"--")}</p>
            </div>

            <div class="md:col-span-2 md:text-center flex justify-between md:block items-center mb-1 md:mb-0">
                <span class="md:hidden text-[9px] font-bold text-gray-400 uppercase tracking-widest">Última Visita:</span>
                <span class="text-[9px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 uppercase tracking-wider">
                    <i class="bi bi-calendar-check opacity-50 mr-1"></i> ${r}
                </span>
            </div>

            <div class="md:col-span-2 md:text-center flex justify-between md:block items-center mb-1 md:mb-0">
                <span class="md:hidden text-[9px] font-bold text-gray-400 uppercase tracking-widest">Situação:</span>
                ${s?`<span class="text-[9px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 uppercase tracking-wider">Débito: R$ ${parseFloat(a.totalDebt).toFixed(2)}</span>`:'<span class="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">Em dia</span>'}
            </div>

            <div class="hidden md:flex md:col-span-1 justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                ${o?`<button data-action="whatsapp" data-phone="${o}" class="w-6 h-6 rounded flex items-center justify-center text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white transition-colors border border-[#25D366]/20 shadow-sm z-20" title="WhatsApp"><i class="bi bi-whatsapp text-[10px]"></i></button>`:""}
                <button class="w-6 h-6 rounded flex items-center justify-center text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-100 shadow-sm" title="Editar / Ver Perfil"><i class="bi bi-pencil-fill text-[10px]"></i></button>
            </div>
            
            <div class="md:hidden flex gap-1 mt-2 border-t border-gray-50 pt-2">
                ${d}
            </div>
        </div>
        `}).join("")}function id(){_t&&ca.removeEventListener("click",_t),_t=o=>{const i=o.target;if(i.classList.contains("item-checkbox")){const u=i.value;i.checked?w.selectedIds.add(u):w.selectedIds.delete(u),ta(),o.stopPropagation();return}if(i.id==="select-all-toggle"){const u=i.checked,c=document.querySelectorAll(".item-checkbox");w.selectedIds.clear(),c.forEach(p=>{p.checked=u,u&&w.selectedIds.add(p.value)}),ta(),o.stopPropagation();return}const n=i.closest("[data-sort]");if(n){const u=n.dataset.sort;w.sortConfig.key===u?w.sortConfig.direction=w.sortConfig.direction==="asc"?"desc":"asc":(w.sortConfig.key=u,w.sortConfig.direction="asc"),$e();return}const l=i.closest("[data-action]");if(l){const u=l.dataset.action,c=l.dataset.id;if(u==="new-client"){ss(null);return}if(u==="open-modal"){ss(c);return}if(u==="whatsapp"){o.stopPropagation();const p=l.dataset.phone;window.open(`https://wa.me/55${p}`,"_blank");return}if(u==="export-excel"){fd();return}}const d=i.closest("[data-filter]");d&&(document.querySelectorAll("[data-filter]").forEach(u=>u.classList.remove("ring-2","ring-offset-1","ring-indigo-400","border-indigo-300")),d.classList.add("ring-2","ring-offset-1","ring-indigo-400","border-indigo-300"),w.filters.status=d.dataset.filter,$e())},ca.addEventListener("click",_t);const t=document.getElementById("cancel-selection-btn");t&&t.addEventListener("click",()=>{w.selectedIds.clear();const o=document.getElementById("select-all-toggle");o&&(o.checked=!1),document.querySelectorAll(".item-checkbox").forEach(i=>i.checked=!1),ta()});const e=document.getElementById("batch-delete-btn");e&&e.addEventListener("click",nd),document.querySelectorAll(".est-filter-checkbox").forEach(o=>{o.addEventListener("change",i=>{const n=i.target.closest("label");i.target.checked?(w.filterEstablishmentIds.add(i.target.value),n.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),n.classList.remove("border-gray-200","text-gray-600")):(w.filterEstablishmentIds.delete(i.target.value),n.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),n.classList.add("border-gray-200","text-gray-600")),$s()})});const a=document.getElementById("search-input");a&&a.addEventListener("input",o=>{w.filters.search=o.target.value,$e()});const s=document.getElementById("filter-inactive");s&&s.addEventListener("input",o=>{w.filters.inactiveDays=o.target.value,$e()});const r=document.getElementById("filter-loyalty");r&&r.addEventListener("change",o=>{w.filters.hasLoyalty=o.target.checked,$e()})}function ta(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count");if(!t||!e)return;const a=w.selectedIds.size;e.textContent=a,a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex"))}async function nd(){const t=w.selectedIds.size;if(!(t===0||!await Y("Excluir Clientes",`Deseja realmente excluir permanentemente ${t} cliente(s)? Esta ação não pode ser desfeita.`)))try{const a=Array.from(w.selectedIds).map(r=>Co(r));await Promise.all(a),f("Sucesso",`${t} cliente(s) excluído(s) com sucesso.`,"success"),w.selectedIds.clear(),ta();const s=document.getElementById("select-all-toggle");s&&(s.checked=!1),await $s()}catch{f("Erro ao Excluir","Ocorreu um erro ao excluir alguns clientes.","error")}}function ss(t=null){t?(w.selectedClient=w.clients.find(s=>s.id===t),w.selectedClient.isNew=!1):w.selectedClient={isNew:!0,id:"",name:"",phone:"",email:"",cpf:"",gender:"",dobDay:"",dobMonth:"",source:"",notes:"",loyaltyPoints:0,totalDebt:0},w.activeTab="profile",w.historyData={appointments:[],sales:[],loyaltyLog:[]};let e=document.getElementById("client-details-modal-overlay");e||(e=document.createElement("div"),e.id="client-details-modal-overlay",e.className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-gray-900/60 backdrop-blur-sm sm:p-4 animate-fade-in",e.innerHTML='<div class="bg-gray-50 w-full sm:w-[90vw] h-[90vh] sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-slide-up sm:animate-scale-in rounded-t-2xl" id="client-modal-content"></div>',e.onclick=s=>{s.target===e&&Et()},document.body.appendChild(e),document.body.classList.add("overflow-hidden"));const a=e.querySelector("#client-modal-content");a.innerHTML=it(w.selectedClient),nt(a,w.selectedClient)}function Et(){const t=document.getElementById("client-details-modal-overlay");t&&t.remove(),document.body.classList.remove("overflow-hidden"),w.modalOpen=!1,w.selectedClient=null,$e()}function it(t){const e=t.isNew,a=`
        <div class="bg-white border-b border-gray-200 sticky top-0 z-10 w-full flex overflow-x-auto custom-scrollbar gap-2 px-4 sm:px-6 py-2.5">
            <button class="tab-btn ${w.activeTab==="profile"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"} border px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="profile">👤 Perfil e Dados</button>
            ${e?"":`
            <button class="tab-btn ${w.activeTab==="appointments"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"} border px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="appointments">📅 Agendamentos</button>
            <button class="tab-btn ${w.activeTab==="history"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"} border px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="history">💰 Finanças</button>
            <button class="tab-btn ${w.activeTab==="loyalty"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"} border px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="loyalty">⭐ Fidelidade</button>
            `}
        </div>
    `;let s="";return w.activeTab==="profile"?s=ld(t):w.activeTab==="appointments"?s=dd():w.activeTab==="history"?s=cd():w.activeTab==="loyalty"&&(s=ud(t)),`
        <div class="w-full bg-gray-50 min-h-full flex flex-col overflow-hidden">
            <div class="bg-indigo-600 px-4 py-4 sm:px-6 sm:py-5 text-white relative flex-shrink-0 w-full shadow-md z-20">
                <button id="btn-close-modal" class="absolute top-4 right-4 text-indigo-200 hover:text-white transition z-50">
                    <i class="bi bi-x-lg text-xl sm:text-2xl"></i>
                </button>

                <div class="flex items-center gap-4 sm:gap-5">
                    <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-indigo-600 flex items-center justify-center text-2xl font-black shadow-lg flex-shrink-0">
                        ${e?'<i class="bi bi-person-plus-fill"></i>':as(t.name)}
                    </div>
                    <div class="flex-grow min-w-0 pr-8">
                        <h2 class="text-lg sm:text-xl font-black leading-tight truncate">${e?"Novo Cliente":h(t.name)}</h2>
                        <p class="text-xs text-indigo-200 mt-0.5 truncate">
                            ${e?"Preencha as informações do novo registo":`<i class="bi bi-whatsapp mr-1"></i>${t.phone||"Sem telefone"}`}
                        </p>
                        ${!e&&t.totalDebt&&t.totalDebt>0?`<span class="inline-block mt-1.5 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-red-400 shadow-sm">Dívida: R$ ${parseFloat(t.totalDebt).toFixed(2)}</span>`:""}
                    </div>
                </div>
            </div>
            
            ${a}
            
            <div class="p-4 sm:p-5 flex-grow overflow-y-auto custom-scrollbar relative bg-gray-50 w-full">
                ${w.historyLoading?'<div class="absolute inset-0 bg-white/80 flex items-center justify-center z-20"><div class="loader"></div></div>':""}
                <div class="animate-fade-in w-full pb-10">${s}</div>
            </div>
        </div>
    `}function ld(t){return`
        <form id="form-edit-client" class="space-y-4">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
                    <h3 class="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3 border-b border-gray-100 pb-2"><i class="bi bi-person-vcard text-indigo-500 mr-2"></i> Dados Pessoais</h3>
                    
                    <div>
                        <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Nome Completo *</label>
                        <input type="text" name="name" value="${h(t.name)}" required class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow">
                    </div>
                    
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">WhatsApp *</label>
                            <input type="tel" name="phone" value="${h(t.phone||"")}" required class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow">
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">CPF</label>
                            <input type="text" name="cpf" value="${h(t.cpf||"")}" placeholder="000.000.000-00" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow">
                        </div>
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">E-mail</label>
                        <input type="email" name="email" value="${h(t.email||"")}" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow">
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
                        <textarea name="notes" rows="2" class="w-full p-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white bg-gray-50 transition-shadow resize-none" placeholder="Histórico de alergias, preferências...">${h(t.notes||"")}</textarea>
                    </div>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row justify-end gap-3 pt-3 border-t border-gray-200 mt-2">
                <button type="submit" class="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold shadow hover:bg-indigo-700 transition flex items-center justify-center gap-2 text-xs">
                    <i class="bi bi-check2-circle text-sm"></i> ${t.isNew?"Cadastrar Cliente":"Salvar Alterações"}
                </button>
            </div>
        </form>
    `}function dd(t){let e=w.historyData.appointments||[];return e.sort((a,s)=>new Date(s.startTime)-new Date(a.startTime)),`
        <div class="space-y-2">
            ${e.length?e.map(a=>{const s=new Date(a.startTime);let o=s<new Date?'<span class="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border border-gray-200">Concluído</span>':'<span class="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border border-emerald-200">Agendado</span>';return a.status==="cancelled"&&(o='<span class="bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border border-red-200">Cancelado</span>'),`
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
                        ${o}
                    </div>
                </div>`}).join(""):'<div class="text-center py-10 bg-white rounded-xl border border-gray-200"><p class="text-[10px] text-gray-400 font-medium">Nenhum agendamento encontrado.</p></div>'}
        </div>
    `}function cd(t){let e=w.historyData.sales||[];e.sort((r,o)=>new Date(o.date)-new Date(r.date));const a=e.reduce((r,o)=>r+(Number(o.totalAmount)||0),0),s=e.length>0?a/e.length:0;return`
        <div class="space-y-4">
            <div class="grid grid-cols-2 gap-3 mb-2">
                <div class="bg-emerald-50 p-3 rounded-xl border border-emerald-100 shadow-sm flex flex-col text-center">
                    <span class="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">LTV (V. Vitalício)</span>
                    <span class="text-lg font-black text-emerald-700 mt-0.5">${Ta(a)}</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col text-center">
                    <span class="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Ticket Médio</span>
                    <span class="text-lg font-black text-gray-800 mt-0.5">${Ta(s)}</span>
                </div>
            </div>

            <div class="space-y-2">
                <h4 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 pl-1">Histórico de Vendas</h4>
                ${e.length?e.map(r=>`
                <div class="bg-white border border-gray-200 rounded-xl p-3 flex justify-between items-center shadow-sm hover:bg-gray-50 cursor-pointer transition-colors" data-go-comanda="true" data-id="${r.id}">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 text-xs"><i class="bi bi-receipt"></i></div>
                        <div>
                            <p class="font-bold text-gray-800 text-[10px] sm:text-xs">Venda #${r.id.slice(-5).toUpperCase()}</p>
                            <p class="text-[9px] text-gray-400 mt-0.5">${new Date(r.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-black text-emerald-600 text-xs">${Ta(r.totalAmount)}</p>
                        <p class="text-[8px] text-indigo-500 font-bold uppercase mt-0.5 hover:underline">Ver Comanda <i class="bi bi-chevron-right"></i></p>
                    </div>
                </div>`).join(""):'<div class="text-center py-8 bg-white rounded-xl border border-gray-200"><p class="text-[10px] text-gray-400">Nenhum histórico financeiro.</p></div>'}
            </div>
        </div>
    `}function ud(t){const e=w.historyData.loyaltyLog||[];return e.sort((a,s)=>new Date(s.date)-new Date(a.date)),`
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
    `}function nt(t,e){if(t.querySelectorAll(".tab-btn").forEach(s=>{s.onclick=async()=>{const r=s.dataset.tab;if(w.activeTab===r)return;w.activeTab=r;const o=document.getElementById("client-modal-content");o&&(o.innerHTML=it(e),nt(o,e)),r!=="profile"&&!w.historyLoading&&w.historyData.appointments.length===0&&await pd(e.id)}}),w.activeTab==="profile"){const s=t.querySelector("#form-edit-client");s&&(s.onsubmit=bd);const r=t.querySelector("#btn-delete-client");r&&(r.onclick=md)}if(w.activeTab==="loyalty"){const s=t.querySelector("#btn-manual-redeem");s&&(s.onclick=()=>gd(e))}t.querySelectorAll("[data-go-agenda]").forEach(s=>{s.onclick=()=>{Et(),se("agenda-section",{targetDate:new Date(s.dataset.date),scrollToAppointmentId:s.dataset.id})}}),t.querySelectorAll("[data-go-comanda]").forEach(s=>{s.onclick=()=>{Et(),se("comandas-section",{selectedAppointmentId:s.dataset.id,initialFilter:"finalizadas"})}});const a=t.querySelector("#btn-close-modal");a&&(a.onclick=Et)}async function pd(t){const e=w.selectedClient;if(!e||!e.phone)return;w.historyLoading=!0;const a=document.getElementById("client-modal-content");a&&(a.innerHTML=it(e),nt(a,e));try{const s=new Date;s.setMonth(s.getMonth()+12);const r=new Date;r.setFullYear(r.getFullYear()-5);let o=`/api/appointments/${m.establishmentId}?startDate=${r.toISOString()}&endDate=${s.toISOString()}&clientPhone=${encodeURIComponent(br(e.phone))}&limit=50`;const i=await C(o);w.historyData.appointments=i,w.historyData.sales=i.filter(l=>l.status==="completed").map(l=>({id:l.id,date:l.startTime,totalAmount:l.totalAmount||0,items:l.comandaItems||l.services||[]}));const n=[];i.forEach(l=>{l.status==="completed"&&l.loyaltyPointsEarned>0&&n.push({type:"earn",points:l.loyaltyPointsEarned,date:l.startTime,description:"Venda finalizada"}),l.loyaltyRedemption&&n.push({type:"redemption",points:l.loyaltyRedemption.cost||0,date:l.startTime,description:`Resgate: ${l.loyaltyRedemption.name}`})}),w.historyData.loyaltyLog=n}catch(s){console.error("Erro histórico",s)}finally{w.historyLoading=!1;const s=document.getElementById("client-modal-content");s&&w.selectedClient&&(s.innerHTML=it(w.selectedClient),nt(s,w.selectedClient))}}async function bd(t){t.preventDefault();const e=new FormData(t.target),a=Object.fromEntries(e.entries());a.establishmentId=m.establishmentId,a.dobDay&&(a.dobDay=parseInt(a.dobDay)),a.dobMonth&&(a.dobMonth=parseInt(a.dobMonth));try{if(w.selectedClient.isNew){const s=await Io(a);w.clients.unshift(s),f("Sucesso","Cliente cadastrado com sucesso!","success"),w.selectedClient=s,ss(s.id)}else{await Lo(w.selectedClient.id,a),Object.assign(w.selectedClient,a);const s=w.clients.findIndex(o=>o.id===w.selectedClient.id);s!==-1&&(w.clients[s]=w.selectedClient),f("Sucesso","Dados salvos com sucesso!","success");const r=document.getElementById("client-modal-content");r&&(r.innerHTML=it(w.selectedClient),nt(r,w.selectedClient))}Ss(),$e()}catch(s){f("Erro",s.message,"error")}}async function md(){if(await Y("Excluir Cliente","Tem certeza? O histórico será apagado e não pode ser desfeito."))try{await Co(w.selectedClient.id),w.clients=w.clients.filter(t=>t.id!==w.selectedClient.id),w.selectedClient=null,f("Sucesso","Cliente removido com sucesso.","success"),Et(),Ss(),$e()}catch(t){f("Erro",t.message,"error")}}function gd(t){const e=t.loyaltyPoints||0,a=`
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
    `,{modalElement:s,close:r}=Me({title:"Ajuste de Pontos",contentHTML:a,maxWidth:"w-[90%] max-w-xs"});s.querySelector("form").onsubmit=async o=>{o.preventDefault();const i=document.getElementById("redeem-action").value,n=parseInt(document.getElementById("redeem-points").value,10),l=document.getElementById("redeem-reason").value;if(!n||n<=0)return f("Erro","Qtd inválida.","error");if(i==="debit"&&n>e)return f("Erro","Saldo insuficiente.","error");try{let d=e;i==="debit"?(await Vi(m.establishmentId,t.phone,n,l),d-=n):(d+=n,await Lo(t.id,{loyaltyPoints:d})),w.selectedClient.loyaltyPoints=d,w.historyData.loyaltyLog.unshift({type:i==="debit"?"redemption":"earn",points:n,date:new Date().toISOString(),description:l+" (Manual)"}),f("Sucesso","Saldo atualizado.","success"),r();const u=document.getElementById("client-modal-content");u&&w.selectedClient&&(u.innerHTML=it(w.selectedClient),nt(u,w.selectedClient)),$e()}catch(d){f("Erro",d.message,"error")}}}function fd(){if(typeof XLSX>"u")return f("Erro","Biblioteca de exportação não carregada.","error");if(w.clients.length===0)return f("Aviso","Nenhum cliente para exportar.","info");const t=w.clients.map(e=>({Nome:e.name,Telefone:e.phone||"","E-mail":e.email||"",CPF:e.cpf||"",Gênero:e.gender==="M"?"Masculino":e.gender==="F"?"Feminino":e.gender==="O"?"Outro":"",Aniversário:e.dobDay&&e.dobMonth?`${e.dobDay}/${e.dobMonth}`:"",Origem:e.source||"",Cadastro:ts(e.createdAt),"Última Visita":ts(e.lastVisit),"Pontos Fidelidade":e.loyaltyPoints||0,"Débito/Fiado (R$)":e.totalDebt||0,Anotações:e.notes||""}));try{const e=XLSX.utils.json_to_sheet(t),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,e,"Clientes"),XLSX.writeFile(a,`KAIROS_Clientes_${new Date().toISOString().split("T")[0]}.xlsx`)}catch{f("Erro","Falha ao gerar o ficheiro.","error")}}const Oe=document.getElementById("content"),qa={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},ie=[{id:"clean-modern",name:"Clean Moderno",bg:"#f8fafc",text:"#4b5563",titleColor:"#0f172a",primary:"#2563eb",font:"Inter",btn:"rounded",cardBg:"#ffffff",cardBorder:"#e2e8f0"},{id:"dark-premium",name:"Dark Premium",bg:"#0f172a",text:"#9ca3af",titleColor:"#f8fafc",primary:"#f59e0b",font:"'Playfair Display'",btn:"square",cardBg:"#1e293b",cardBorder:"#334155"},{id:"spa-zen",name:"Spa & Wellness",bg:"#f0fdf4",text:"#166534",titleColor:"#064e3b",primary:"#10b981",font:"Poppins",btn:"pill",cardBg:"#ffffff",cardBorder:"#d1fae5"},{id:"neo-brutalism",name:"Neobrutalismo",bg:"#ffffff",text:"#000000",titleColor:"#000000",primary:"#ef4444",font:"Inter",btn:"square",cardBg:"#ffffff",cardBorder:"#000000"},{id:"tech-cyan",name:"Tech Night",bg:"#020617",text:"#94a3b8",titleColor:"#f1f5f9",primary:"#06b6d4",font:"Roboto",btn:"rounded",cardBg:"#0f172a",cardBorder:"#1e293b"},{id:"sunset-glam",name:"Sunset Glam",bg:"#fff7ed",text:"#831843",titleColor:"#4c0519",primary:"#f43f5e",font:"Poppins",btn:"pill",cardBg:"#ffffff",cardBorder:"#fce7f3"},{id:"luxury-mono",name:"Luxo Minimal",bg:"#fafafa",text:"#525252",titleColor:"#171717",primary:"#404040",font:"'Playfair Display'",btn:"square",cardBg:"#ffffff",cardBorder:"#e5e5e5"},{id:"deep-ocean",name:"Oceano Profundo",bg:"#172554",text:"#bfdbfe",titleColor:"#eff6ff",primary:"#3b82f6",font:"Montserrat",btn:"pill",cardBg:"#1e3a8a",cardBorder:"#1e40af"},{id:"rustic-vintage",name:"Rústico Vintage",bg:"#1c1917",text:"#a8a29e",titleColor:"#fafaf9",primary:"#ea580c",font:"Montserrat",btn:"rounded",cardBg:"#292524",cardBorder:"#44403c"},{id:"vibrant-purple",name:"Estúdio Criativo",bg:"#fdf4ff",text:"#701a75",titleColor:"#4a044e",primary:"#c026d3",font:"Inter",btn:"rounded",cardBg:"#ffffff",cardBorder:"#fae8ff"}];let X=null,ae=null;function mr(){return[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais da Unidade"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"whatsapp-bot",icon:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",label:"Atendente Virtual (WhatsApp)"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}]}function Us(t,e,a){return new Promise((s,r)=>{const o=new FileReader;o.readAsDataURL(t),o.onload=i=>{const n=new Image;n.src=i.target.result,n.onload=()=>{const l=document.createElement("canvas");let d=n.width,u=n.height;d>e&&(u*=e/d,d=e),l.width=d,l.height=u,l.getContext("2d").drawImage(n,0,0,d,u);const p=t.type==="image/png"&&e<500?"image/png":"image/jpeg";s(l.toDataURL(p,a))},n.onerror=l=>r(l)},o.onerror=i=>r(i)})}function Ue(t,e=null){let a='<option value="">-- Selecione (Opcional) --</option>';const s=i=>{const n=new Map,l=[];return i&&(i.forEach(d=>n.set(d.id,{...d,children:[]})),n.forEach(d=>{d.parentId&&n.has(d.parentId)?n.get(d.parentId).children.push(d):l.push(d)})),l},r=(i,n="")=>{const l=i.id===e?"selected":"";a+=`<option value="${i.id}" ${l}>${n}${h(i.name)}</option>`,i.children.forEach(d=>r(d,n+"— "))};return s(t).forEach(i=>r(i)),a}async function mt(t,e){const a=e.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const s=[],{ownerName:r,...o}=t;if(r&&r!==m.userName){const n=ge.currentUser;n&&s.push(qr(n,{displayName:r}).then(()=>{m.userName=r}))}const i={...X,...o};s.push(ds(ae,i)),await Promise.all(s),X=i,f("Sucesso","Definições salvas com sucesso!","success"),o.themeColor&&ae===m.establishmentId&&setTimeout(()=>window.location.reload(),1500)}catch(s){f("Erro",`Não foi possível salvar: ${s.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function xd(t,e){const a=h(t.name||""),s=h(t.phone||""),r=h(t.cnpj||""),o=h(t.email||""),i=h(t.address||""),n=h(t.website||""),l=h(m.userName||"");e.innerHTML=`
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
                    <input type="tel" id="establishmentPhone" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" value="${s}">
                </div>
                <div>
                    <label for="establishmentCnpjCpf" class="block text-sm font-medium text-gray-700">CNPJ / CPF</label>
                    <input type="text" id="establishmentCnpjCpf" value="${r}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md bg-gray-50">
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
    `,e.querySelector("#personal-data-form").addEventListener("submit",d=>{d.preventDefault();const u={ownerName:e.querySelector("#ownerName").value,name:e.querySelector("#establishmentName").value,phone:e.querySelector("#establishmentPhone").value,cnpj:e.querySelector("#establishmentCnpjCpf").value,email:e.querySelector("#establishmentEmail").value,address:e.querySelector("#establishmentAddress").value,website:e.querySelector("#establishmentWebsite").value};mt(u,d)})}function hd(t,e){e.innerHTML=`
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
    `,e.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const s=e.querySelector("#newPassword").value,r=e.querySelector("#confirmPassword").value;if(s!==r){f("Erro","As senhas não coincidem.","error");return}const o=e.querySelector('button[form="change-password-form"]');o.disabled=!0,o.textContent="A Salvar...";try{const i=ge.currentUser;if(i)await Ar(i,s),f("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum utilizador logado encontrado.")}catch(i){f("Erro",`Não foi possível alterar a senha: ${i.message}`,"error")}finally{o.disabled=!1,o.textContent="Salvar Nova Senha"}})}function vd(t,e){e.innerHTML=`
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
    `,e.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const s=e.querySelector("#newEmail").value,r=e.querySelector("#currentPassword").value,o=e.querySelector('button[form="change-email-form"]');o.disabled=!0,o.textContent="A verificar...";try{const i=ge.currentUser,n=Pr.credential(i.email,r);await Br(i,n),await Mr(i,s),await mi(ae,s),f("Sucesso","Link de verificação enviado! Verifique o seu novo e-mail.","success"),a.target.reset()}catch(i){f("Erro",i.message,"error")}finally{o.disabled=!1,o.textContent="Salvar Novo E-mail"}})}function yd(t,e){const a=h(t.welcomeMessage||"Agende o seu horário de forma rápida e fácil."),s=t.socialLinks||{},r=h(s.instagram||""),o=h(s.facebook||""),i=h(s.whatsapp||"");let n=t.primaryColor||t.themeColor||ie[0].primary,l=t.backgroundColor||ie[0].bg,d=t.textColor||ie[0].text,u=t.titleColor||ie[0].titleColor,c=t.buttonStyle||ie[0].btn,p=t.typography||ie[0].font,b=t.templateId?ie.findIndex(W=>W.id===t.templateId):0;b===-1&&(b=0);const g=W=>W==="pill"?"9999px":W==="square"?"0.25rem":"0.75rem";e.innerHTML=`
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
                        <input type="hidden" id="selectedTemplateId" value="${ie[b].id}">
                        
                        <div class="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
                            <h4 class="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-3 text-center">1. Escolha um Tema Base</h4>
                            <div class="flex items-center justify-center gap-4">
                                <button type="button" id="prevTemplate" class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm transition-colors cursor-pointer border border-indigo-200">
                                    <i class="bi bi-chevron-left text-lg"></i>
                                </button>
                                <div class="text-center min-w-[160px]">
                                    <span id="templateNameDisplay" class="text-lg font-bold text-indigo-950">${ie[b].name}</span>
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
                                    <input type="text" id="socialInstagram" value="${r}" class="flex-1 p-2.5 outline-none text-xs" placeholder="Usuário (@)">
                                </div>
                                <div class="flex rounded-xl shadow-sm overflow-hidden border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                                    <span class="inline-flex items-center px-3 bg-gray-50 text-gray-500 border-r border-gray-300"><i class="bi bi-whatsapp text-green-500"></i></span>
                                    <input type="text" id="socialWhatsapp" value="${i}" class="flex-1 p-2.5 outline-none text-xs" placeholder="Número Whatsapp">
                                </div>
                                <div class="flex rounded-xl shadow-sm overflow-hidden border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                                    <span class="inline-flex items-center px-3 bg-gray-50 text-gray-500 border-r border-gray-300"><i class="bi bi-facebook text-blue-600"></i></span>
                                    <input type="text" id="socialFacebook" value="${o}" class="flex-1 p-2.5 outline-none text-xs" placeholder="Link da página">
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
                                        <input type="color" id="previewBgColorInput" value="${l}" class="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent">
                                    </div>
                                </div>

                                <div class="bg-gray-50 p-2 rounded-xl border border-gray-200">
                                    <label class="block text-[10px] font-semibold text-gray-500 mb-1 text-center">Nome</label>
                                    <div class="flex flex-col items-center gap-1">
                                        <input type="color" id="previewTitleColorInput" value="${u}" class="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent">
                                    </div>
                                </div>

                                <div class="bg-gray-50 p-2 rounded-xl border border-gray-200">
                                    <label class="block text-[10px] font-semibold text-gray-500 mb-1 text-center">Texto</label>
                                    <div class="flex flex-col items-center gap-1">
                                        <input type="color" id="previewTextColorInput" value="${d}" class="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent">
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
                                            <input type="radio" name="buttonStyle" value="square" class="hidden peer" ${c==="square"?"checked":""}>
                                            <div class="py-1.5 px-2 text-xs font-semibold text-gray-500 rounded-lg peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition">Reto</div>
                                        </label>
                                        <label class="flex-1 text-center cursor-pointer">
                                            <input type="radio" name="buttonStyle" value="rounded" class="hidden peer" ${c==="rounded"?"checked":""}>
                                            <div class="py-1.5 px-2 text-xs font-semibold text-gray-500 rounded-lg peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition">Suave</div>
                                        </label>
                                        <label class="flex-1 text-center cursor-pointer">
                                            <input type="radio" name="buttonStyle" value="pill" class="hidden peer" ${c==="pill"?"checked":""}>
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
                                background-color: var(--preview-bg, ${l}); 
                                color: var(--preview-text, ${d}); 
                                font-family: var(--preview-font, ${p});
                                --preview-title-color: ${u};
                                --preview-primary: ${n};
                                --preview-btn-radius: ${g(c)};
                                --preview-card-bg: ${ie[b].cardBg};
                                --preview-card-border: ${ie[b].cardBorder};
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
                                        <h1 class="text-xl font-bold truncate leading-tight" style="color: var(--preview-title-color);">${h(t.name||"Sua Empresa")}</h1>
                                        <p id="mockup-welcome" class="text-[11px] mt-1 opacity-70 leading-relaxed max-w-[260px] mx-auto">${a}</p>
                                    </div>

                                    <div class="flex justify-center gap-2 mt-3 w-full" id="mockup-social-row">
                                        <div id="mockup-insta-icon" class="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm transition-transform ${r?"":"hidden"}" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); color: var(--preview-primary)"><i class="bi bi-instagram"></i></div>
                                        <div id="mockup-whats-icon" class="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm transition-transform ${i?"":"hidden"}" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); color: var(--preview-primary)"><i class="bi bi-whatsapp"></i></div>
                                        <div id="mockup-face-icon" class="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm transition-transform ${o?"":"hidden"}" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); color: var(--preview-primary)"><i class="bi bi-facebook"></i></div>
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
    `;const v=e.querySelector("#mockup-screen-wrapper"),y=e.querySelector("#mockup-screen"),k=e.querySelector("#previewPrimaryColorInput"),T=e.querySelector("#previewBgColorInput"),P=e.querySelector("#previewTextColorInput"),S=e.querySelector("#previewTitleColorInput"),L=e.querySelector("#typographyInput"),q=e.querySelector("#establishmentWelcomeMessage"),N=e.querySelector("#mockup-welcome"),E=e.querySelector("#socialInstagram"),I=e.querySelector("#socialWhatsapp"),D=e.querySelector("#socialFacebook"),R=e.querySelector("#prevTemplate"),O=e.querySelector("#nextTemplate"),U=e.querySelector("#templateNameDisplay"),Z=e.querySelector("#selectedTemplateId"),K=W=>{const G=ie[W];v.style.opacity="0.3",v.style.transform="scale(0.96)",setTimeout(()=>{k.value=G.primary,T.value=G.bg,P.value=G.text,S.value=G.titleColor||G.text,L.value=G.font,e.querySelectorAll('input[name="buttonStyle"]').forEach(me=>{me.checked=me.value===G.btn}),Z.value=G.id,U.textContent=G.name,y.style.setProperty("--preview-primary",G.primary),y.style.setProperty("--preview-bg",G.bg),y.style.setProperty("--preview-text",G.text),y.style.setProperty("--preview-title-color",G.titleColor||G.text),y.style.setProperty("--preview-font",G.font),y.style.setProperty("--preview-btn-radius",g(G.btn)),y.style.setProperty("--preview-card-bg",G.cardBg),y.style.setProperty("--preview-card-border",G.cardBorder),v.style.opacity="1",v.style.transform="scale(1)"},300)};R.addEventListener("click",()=>{b=(b-1+ie.length)%ie.length,K(b)}),O.addEventListener("click",()=>{b=(b+1)%ie.length,K(b)}),k.addEventListener("input",W=>y.style.setProperty("--preview-primary",W.target.value)),T.addEventListener("input",W=>y.style.setProperty("--preview-bg",W.target.value)),P.addEventListener("input",W=>y.style.setProperty("--preview-text",W.target.value)),S.addEventListener("input",W=>y.style.setProperty("--preview-title-color",W.target.value)),L.addEventListener("change",W=>y.style.setProperty("--preview-font",W.target.value)),e.querySelectorAll('input[name="buttonStyle"]').forEach(W=>{W.addEventListener("change",G=>{G.target.checked&&y.style.setProperty("--preview-btn-radius",g(G.target.value))})}),q.addEventListener("input",W=>N.textContent=W.target.value||"Mensagem...");const we=()=>{e.querySelector("#mockup-insta-icon").classList.toggle("hidden",!E.value.trim()),e.querySelector("#mockup-whats-icon").classList.toggle("hidden",!I.value.trim()),e.querySelector("#mockup-face-icon").classList.toggle("hidden",!D.value.trim())};[E,I,D].forEach(W=>W.addEventListener("input",we));const be=e.querySelector("#establishmentLogoInput"),F=e.querySelector("#establishmentBgInput"),ee=e.querySelector("#establishmentLogoBase64"),Ie=e.querySelector("#establishmentBackgroundImageBase64");e.querySelector("#triggerLogoUpload").addEventListener("click",W=>{W.target.id!=="establishmentLogoInput"&&be.click()}),be.onchange=async W=>{const G=W.target.files[0];if(G){const me=await Us(G,300,.9);e.querySelector("#establishmentLogoPreview").src=me,e.querySelector("#mockup-logo").src=me,ee.value=me}},e.querySelector("#triggerBannerUpload").addEventListener("click",W=>{W.target.id!=="establishmentBgInput"&&F.click()}),F.onchange=async W=>{const G=W.target.files[0];if(G){const me=await Us(G,1280,.8);e.querySelector("#establishmentBgPreview").src=me,e.querySelector("#establishmentBgPreview").classList.remove("hidden"),e.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),Ie.value=me,e.querySelector("#mockup-banner").src=me,e.querySelector("#mockup-banner").classList.remove("hidden"),e.querySelector("#mockup-banner-placeholder").classList.add("hidden")}},e.querySelector("#branding-form").addEventListener("submit",W=>{W.preventDefault();let G="rounded";e.querySelectorAll('input[name="buttonStyle"]').forEach(Ls=>{Ls.checked&&(G=Ls.value)});const me={logo:ee.value,backgroundImage:Ie.value,welcomeMessage:q.value,templateId:Z.value,primaryColor:k.value,backgroundColor:T.value,textColor:P.value,titleColor:S.value,typography:L.value,buttonStyle:G,socialLinks:{instagram:E.value.trim(),whatsapp:I.value.trim(),facebook:D.value.trim()}};mt(me,W)})}function wd(t,e){const a=t.urlId||ae;let s=window.location.origin;(s.includes("localhost")||s.includes("capacitor://")||s.includes("127.0.0.1"))&&(s="https://www.kairosagenda.com.br");const r=h(`${s}/agendar?id=${a}`),o=t.publicBookingEnabled||!1,i=o?"Agendamento Online ATIVO":"Agendamento Online INATIVO",n=o?"text-green-600":"text-red-600";e.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100 space-y-8">
            <div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Link Público de Agendamento</h3>
                <p class="text-sm text-gray-600 mb-4">Este é o link exclusivo desta unidade para compartilhar com os clientes.</p>
                <div class="flex flex-col sm:flex-row gap-2">
                    <input type="text" id="publicBookingLink" value="${r}" readonly class="flex-1 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 outline-none">
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
    `,e.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const l=e.querySelector("#publicBookingLink");l.select(),document.execCommand("copy"),l.blur(),f("Sucesso","Link copiado!","success")}),e.querySelector("#publicBookingToggle").addEventListener("change",async l=>{const d=l.target.checked,u=e.querySelector("#publicBookingStatusText");u.textContent=d?"Agendamento Online ATIVO":"Agendamento Online INATIVO",u.className=d?"text-sm font-semibold text-green-600":"text-sm font-semibold text-red-600";try{l.target.disabled=!0,await bi(ae,d),X.publicBookingEnabled=d,f("Sucesso",`Agendamento online ${d?"ativado":"desativado"}!`,"success")}catch(c){f("Erro",c.message,"error"),l.target.checked=!d}finally{l.target.disabled=!1}}),Ld(t.slotInterval||30,e),e.querySelector("#booking-form").addEventListener("submit",l=>{l.preventDefault();const d={slotInterval:parseInt(e.querySelector("#establishmentSlotInterval").value,10)};mt(d,l)})}function kd(t,e){e.innerHTML=`
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
    `;const a=e.querySelector("#establishmentTimezone");t.timezone&&(a.value=t.timezone);const s=e.querySelector("#establishmentWorkingHoursContainer"),r=t.workingHours||{};Object.keys(qa).forEach(o=>{const i=r[o]||{},n=qa[o],l=i.active!==!1,d=document.createElement("div");d.className=`day-schedule-card p-4 rounded-lg border ${l?"bg-gray-50 border-gray-200":"bg-gray-100 border-gray-100 disabled opacity-60"}`,d.innerHTML=`
            <div class="flex justify-between items-center mb-4">
                <span class="font-bold text-gray-800">${n}</span>
                <label class="flex items-center cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" id="est-${o}-active" class="sr-only" ${l?"checked":""}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                </label>
            </div>
            <div class="time-inputs grid grid-cols-2 gap-3">
                <div><label class="text-xs text-gray-500">Abertura:</label><input type="time" id="est-${o}-start" value="${i.start||"09:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Fecho:</label><input type="time" id="est-${o}-end" value="${i.end||"18:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Início Pausa:</label><input type="time" id="est-${o}-breakStart" value="${i.breakStart||"12:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Fim Pausa:</label><input type="time" id="est-${o}-breakEnd" value="${i.breakEnd||"13:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
            </div>`,s.appendChild(d)}),s.addEventListener("change",o=>{const i=o.target.closest('.day-schedule-card input[type="checkbox"]');if(i){const n=i.closest(".day-schedule-card");n.classList.toggle("disabled",!i.checked),n.classList.toggle("opacity-60",!i.checked),n.classList.toggle("bg-gray-50",i.checked),n.classList.toggle("bg-gray-100",!i.checked)}}),e.querySelector("#working-hours-form").addEventListener("submit",o=>{o.preventDefault();const i={};Object.keys(qa).forEach(l=>{i[l]={active:e.querySelector(`#est-${l}-active`).checked,start:e.querySelector(`#est-${l}-start`).value,end:e.querySelector(`#est-${l}-end`).value,breakStart:e.querySelector(`#est-${l}-breakStart`).value,breakEnd:e.querySelector(`#est-${l}-breakEnd`).value}});const n=e.querySelector("#establishmentTimezone").value;mt({workingHours:i,timezone:n},o)})}function gr(t,e){const a=!!t.whatsappInstance;e.innerHTML=`
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
    `;let s=null;const r=e.querySelector("#btnGenerateQr"),o=e.querySelector("#btnCancelQr");r&&r.addEventListener("click",async()=>{r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gerando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const d=await(await fetch(`${n}/connect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:ae})})).json();if(d.qrcode){e.querySelector("#whatsappStatusArea").classList.add("hidden"),e.querySelector("#qrCodeDisplayArea").classList.remove("hidden");const u=d.qrcode.includes("data:image")?d.qrcode:`data:image/png;base64,${d.qrcode}`;e.querySelector("#qrCodeImage").src=u,s=setInterval(async()=>{try{const p=await(await fetch(`${n}/status/${ae}`)).json();p.connected&&(clearInterval(s),X.whatsappInstance=p.instanceName,e.querySelector("#qrCodeDisplayArea").classList.add("hidden"),e.querySelector("#connectedStatusArea").classList.remove("hidden"),f("Sucesso","WhatsApp conectado com sucesso!","success"))}catch(c){console.error("Erro ao verificar status do WhatsApp",c)}},5e3)}else f("Erro na API",d.error||"Erro desconhecido","error")}catch(l){console.error(l),f("Erro de Conexão","Não foi possível aceder ao servidor Kairós.","error")}finally{r.disabled=!1,r.innerHTML='<i class="bi bi-phone-vibrate"></i> Gerar QR Code'}}),o&&o.addEventListener("click",()=>{s&&clearInterval(s),e.querySelector("#qrCodeDisplayArea").classList.add("hidden"),e.querySelector("#whatsappStatusArea").classList.remove("hidden")});const i=e.querySelector("#btnDisconnectWhatsapp");i&&i.addEventListener("click",async()=>{if(!confirm("Tem certeza que deseja DESCONECTAR? O bot parará de responder imediatamente."))return;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Desconectando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const d=await(await fetch(`${n}/disconnect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:ae})})).json();d.success?(f("Sucesso","WhatsApp desconectado!","success"),X.whatsappInstance=null,gr(X,e)):alert("Erro ao desconectar: "+d.error)}catch(l){console.error(l),f("Erro","Falha ao comunicar com o servidor.","error")}finally{i&&(i.disabled=!1,i.innerHTML='<i class="bi bi-power"></i> Desconectar')}})}async function $d(t,e){const a=t.loyaltyProgram||{},s=a.pointsPerVisit||1;let r=[],o=[],i=[];try{[r,o,i]=await Promise.all([pt(ae),bt(ae),xs(ae)])}catch(d){console.error("Erro ao carregar dados para fidelidade:",d)}e.innerHTML=`
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
    `;const n=e.querySelector("#loyaltyTiersContainer"),l=(d={})=>{const u=document.createElement("div");u.className="loyalty-tier-row bg-white p-4 border border-gray-200 rounded-lg shadow-sm relative grid grid-cols-1 md:grid-cols-4 gap-4 items-end";const c=d.type||"money",p=d.itemId||"",b=d.reward||"",g=d.discount||"",v=d.points||d.costPoints||"";u.innerHTML=`
            <div>
                <label class="text-xs font-bold text-gray-500 mb-1 block">Custo (Pontos)</label>
                <div class="relative">
                    <input type="number" placeholder="Ex: 100" data-field="points" value="${v}" class="w-full p-2 border border-gray-300 rounded-md font-bold text-gray-800">
                </div>
            </div>

            <div>
                <label class="text-xs font-bold text-gray-500 mb-1 block">Tipo de Recompensa</label>
                <select data-field="type" class="type-select w-full p-2 border border-gray-300 rounded-md bg-white text-sm">
                    <option value="money" ${c==="money"?"selected":""}>Desconto (€/R$)</option>
                    <option value="service" ${c==="service"?"selected":""}>Serviço Grátis</option>
                    <option value="product" ${c==="product"?"selected":""}>Produto Grátis</option>
                    <option value="package" ${c==="package"?"selected":""}>Pacote Grátis</option>
                </select>
            </div>

            <div class="relative md:col-span-2">
                <label class="text-xs font-bold text-gray-500 mb-1 block">O que o cliente ganha?</label>
                
                <div class="flex gap-2">
                    <input type="text" placeholder="Ex: R$ 20 de Desconto" data-field="rewardName" value="${h(b)}" class="desc-input flex-1 p-2 border border-gray-300 rounded-md ${c!=="money"?"hidden":""}">
                    
                    <select data-field="itemId" class="item-select flex-1 p-2 border border-gray-300 rounded-md bg-white text-sm ${c==="money"?"hidden":""}">
                        <option value="">Selecione o item na lista...</option>
                    </select>

                    <div class="w-24 relative">
                        <span class="absolute left-2 top-2 text-gray-500 text-sm">$</span>
                        <input type="number" placeholder="Valor" data-field="discount" value="${g}" step="0.01" class="discount-input w-full p-2 pl-7 border border-gray-300 rounded-md" title="Valor do desconto">
                    </div>
                </div>
            </div>

            <button type="button" class="remove-loyalty-tier absolute -top-3 -right-3 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white p-1.5 rounded-full shadow-md transition-colors" title="Remover Prémio">
                <i class="bi bi-x-lg text-sm"></i>
            </button>
        `;const y=u.querySelector(".type-select"),k=u.querySelector(".item-select"),T=u.querySelector(".desc-input"),P=u.querySelector(".discount-input"),S=L=>{k.innerHTML='<option value="">Selecione...</option>';let q=[];L==="service"?q=r:L==="product"?q=o:L==="package"&&(q=i),q.forEach(N=>{const E=N.id===p,I=N.name||N.title||"Sem nome",D=N.price||N.salePrice||0;k.innerHTML+=`<option value="${N.id}" data-price="${D}" ${E?"selected":""}>${h(I)}</option>`})};return c!=="money"&&S(c),y.addEventListener("change",L=>{const q=L.target.value;q==="money"?(k.classList.add("hidden"),T.classList.remove("hidden"),T.value="",P.value=""):(k.classList.remove("hidden"),T.classList.add("hidden"),S(q),P.value="")}),k.addEventListener("change",L=>{const q=L.target.selectedOptions[0];if(q&&q.value){T.value=q.text;const N=q.dataset.price;N&&(P.value=parseFloat(N).toFixed(2))}}),u};a.tiers&&a.tiers.length>0?a.tiers.forEach(d=>n.appendChild(l(d))):n.appendChild(l()),e.querySelector("#add-loyalty-tier").addEventListener("click",()=>{n.appendChild(l())}),n.addEventListener("click",d=>{const u=d.target.closest(".remove-loyalty-tier");u&&u.closest(".loyalty-tier-row").remove()}),e.querySelector("#loyalty-form").addEventListener("submit",d=>{d.preventDefault();const u=Array.from(e.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(p=>{const b=p.querySelector(".type-select").value,g=b==="money"?null:p.querySelector(".item-select").value;let v=b==="money"?p.querySelector(".desc-input").value:p.querySelector(".item-select").options[p.querySelector(".item-select").selectedIndex]?.text;return{points:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,costPoints:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,type:b,itemId:g,reward:v,name:v,discount:parseFloat(p.querySelector('input[data-field="discount"]').value)||0}}),c={loyaltyProgram:{enabled:e.querySelector("#loyaltyEnabled").checked,type:"visit",pointsPerVisit:parseInt(e.querySelector("#loyaltyPointsPerVisit").value,10)||1,pointsPerCurrency:0,tiers:u.filter(p=>p.points>0&&p.reward)}};mt(c,d)})}async function Sd(t,e){e.innerHTML=`
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
    `;try{const[a,s]=await Promise.all([va(ae),us(ae)]),r=t.financialIntegration||{},o=t.commissionConfig||{},i=t.purchaseConfig||{};e.querySelector("#financialNatureId").innerHTML=Ue(a,r.defaultNaturezaId),e.querySelector("#financialCostCenterId").innerHTML=Ue(s,r.defaultCentroDeCustoId),e.querySelector("#purchaseNatureId").innerHTML=Ue(a,i.defaultNatureId),e.querySelector("#purchaseCostCenterId").innerHTML=Ue(s,i.defaultCostCenterId),e.querySelector("#commissionNatureId").innerHTML=Ue(a,o.defaultNatureId),e.querySelector("#commissionCostCenterId").innerHTML=Ue(s,o.defaultCostCenterId)}catch{f("Erro","Não foi possível carregar o plano de contas da unidade.","error")}e.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const s={financialIntegration:{defaultNaturezaId:e.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:e.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:e.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:e.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:e.querySelector("#commissionNatureId").value||null,defaultCostCenterId:e.querySelector("#commissionCostCenterId").value||null}};mt(s,a)})}function Ed(t,e){const a=`https://wa.me/5516997859430?text=Olá, preciso de ajuda com o sistema Kairos (Minha Unidade: ${t.name}).`;e.innerHTML=`
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
    `}function Id(t,e){const a=`https://wa.me/5516997859430?text=Gostaria de solicitar o cancelamento da assinatura. (Unidade: ${t.name})`;e.innerHTML=`
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
    `}function Ld(t,e){const a=e.querySelector("#slotIntervalContainer"),s=e.querySelector("#establishmentSlotInterval");if(!a||!s)return;const r=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=r.map(o=>{const i=o.value===t;return`<button type="button" data-value="${o.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors shadow-sm
                           ${i?"bg-indigo-600 text-white":"bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}">
                       ${o.label}
                   </button>`}).join(""),s.value=t,a.querySelectorAll(".interval-btn").forEach(o=>{o.addEventListener("click",()=>{s.value=o.dataset.value,a.querySelectorAll(".interval-btn").forEach(i=>{i.classList.remove("bg-indigo-600","text-white"),i.classList.add("bg-white","border","border-gray-300","text-gray-700")}),o.classList.add("bg-indigo-600","text-white"),o.classList.remove("bg-white","border","border-gray-300","text-gray-700")})})}async function Cd(t){const a=mr().find(r=>r.id===t);if(!a)return;Oe.innerHTML=`
        <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-gray-200 border-opacity-50">
            <div class="flex items-center gap-3">
                <button data-action="back-to-menu" class="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 shadow-sm flex items-center gap-2 text-sm font-semibold">
                    <i class="bi bi-arrow-left"></i> Voltar
                </button>
                <h2 class="text-2xl font-bold text-gray-800">${a.label}</h2>
            </div>
            <div class="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                ${h(X?.name||"")}
            </div>
        </div>
        
        <div id="settings-content-detail" class="pb-20 max-w-6xl mx-auto w-full">
            <div class="flex justify-center items-center py-10"><div class="spinner-border text-indigo-600" role="status"></div></div>
        </div>
    `,Oe.querySelector('button[data-action="back-to-menu"]').addEventListener("click",r=>{r.preventDefault(),fr({id:ae})});const s=document.getElementById("settings-content-detail");switch(t){case"personal-data":xd(X,s);break;case"change-password":hd(X,s);break;case"change-email":vd(X,s);break;case"branding":yd(X,s);break;case"booking":wd(X,s);break;case"working-hours":kd(X,s);break;case"whatsapp-bot":gr(X,s);break;case"loyalty":await $d(X,s);break;case"financial":await Sd(X,s);break;case"support":Ed(X,s);break;case"cancellation":Id(X,s);break;default:s.innerHTML='<div class="p-4 text-center">Módulo em construção.</div>'}}async function fr(t={}){Oe.innerHTML=`
        <div class="flex flex-col justify-center items-center h-64">
            <div class="spinner-border text-indigo-600 border-4 w-12 h-12 mb-4" role="status"></div>
            <p class="text-gray-500 font-medium">A carregar configurações da unidade...</p>
        </div>
    `;try{ae=t.id||m.establishmentId,X=await je(ae);const e=t.id?`<button onclick="window.navigateTo('establishments-section')" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                   <i class="bi bi-diagram-3"></i> Voltar à Rede
               </button>`:"",a=X.isMatriz||!X.parentId?'<span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded ml-3">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded ml-3">📍 UNIDADE</span>',s=mr();Oe.innerHTML=`
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
                        <h3 class="text-2xl font-bold mb-1">${h(X.name)} ${a}</h3>
                        <p class="text-indigo-200 text-sm flex items-center gap-2"><i class="bi bi-geo-alt"></i> ${h(X.address||"Morada não definida")}</p>
                    </div>
                    <div class="relative z-10 hidden sm:block">
                        <div class="w-16 h-16 bg-white rounded-xl shadow-md p-1 flex items-center justify-center">
                            ${X.logo?`<img src="${X.logo}" class="w-full h-full object-contain rounded-lg">`:`<span class="text-2xl text-indigo-600 font-bold">${X.name.charAt(0).toUpperCase()}</span>`}
                        </div>
                    </div>
                    <div class="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${s.map(r=>`
                        <div data-section="${r.id}" class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-300 cursor-pointer transition-all flex items-center gap-4 group">
                            <div class="w-12 h-12 bg-gray-50 group-hover:bg-indigo-50 text-gray-400 group-hover:text-indigo-600 rounded-lg flex items-center justify-center transition-colors">
                                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${r.icon}"></path></svg>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-bold text-gray-800 group-hover:text-indigo-700 transition-colors text-sm">${r.label}</h4>
                            </div>
                            <i class="bi bi-chevron-right text-gray-300 group-hover:text-indigo-400 transition-colors"></i>
                        </div>
                    `).join("")}
                </div>
                
                <div class="mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Módulos Ativos Nesta Unidade</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="modules-container">
                        ${Dd(X.modules||{})}
                    </div>
                </div>
            </div>
        `,Oe.querySelectorAll("div[data-section]").forEach(r=>{r.addEventListener("click",o=>{Cd(r.dataset.section)})}),Oe.querySelectorAll(".module-toggle").forEach(r=>{r.addEventListener("change",async()=>{const o=r.dataset.module;try{const n={...(await je(ae)).modules,[o]:r.checked};await ds(ae,{modules:n}),f("Módulos","Módulos atualizados com sucesso.","success")}catch(i){r.checked=!r.checked,f("Erro",i.message,"error")}})})}catch(e){Oe.innerHTML=`
            <div class="p-8 text-center max-w-md mx-auto">
                <i class="bi bi-exclamation-triangle text-4xl text-red-500 mb-4 block"></i>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Erro ao carregar loja</h2>
                <p class="text-gray-600">${e.message}</p>
                <button onclick="window.navigateTo('establishments-section')" class="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700">Voltar à Rede</button>
            </div>
        `}}function Dd(t){return[{key:"agenda-section",label:"Agenda Diária",icon:"bi-calendar"},{key:"comandas-section",label:"Comandas e PDV",icon:"bi-receipt"},{key:"financial-section",label:"Financeiro Completo",icon:"bi-cash-coin"},{key:"reports-section",label:"Relatórios Gerenciais",icon:"bi-graph-up"}].map(a=>`
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
    `).join("")}const It=document.getElementById("content");async function tt(t){const e=document.getElementById("blockagesList");if(e){e.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,s=document.getElementById("filterEndDate")?.value,r=await ka(m.establishmentId,a||new Date().toISOString().split("T")[0],s||new Date().toISOString().split("T")[0],t),o=document.getElementById("filterReason")?.value.toLowerCase(),i=o?r.filter(l=>l.reason&&l.reason.toLowerCase().includes(o)):r,n=i.reduce((l,d)=>{const u=d.reason||"Sem motivo";return l[u]||(l[u]=[]),l[u].push(d),l},{});if(e.innerHTML="",i.length===0){e.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(n).forEach(([l,d])=>{const u=document.createElement("div");u.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let p=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${h(l)} (${d.length})</h4>`;if(d.length>1){const b=JSON.stringify(d.map(g=>g.id));p+=`<button data-action="batch-delete-blockage" data-ids='${b}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}p+="</div>",u.innerHTML=p,d.forEach(b=>{const g=new Date(b.startTime),v=new Date(b.endTime),y=g.toLocaleDateString("pt-BR"),k=v.toLocaleDateString("pt-BR"),P=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${y===k?`${y} | ${g.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${v.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${y} às ${g.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${k} às ${v.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${b.id}">Apagar</button>
                    </div>`;u.innerHTML+=P}),e.appendChild(u)})}catch(a){e.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function Td(t){t.preventDefault();const e=t.target,a=e.querySelector("#blockageProfId").value,s=e.querySelector("#blockageDate").value,r=e.querySelector("#blockageEndDate").value||s,o=e.querySelector("#blockageStartTime").value,i=e.querySelector("#blockageEndTime").value,n={establishmentId:m.establishmentId,professionalId:a,startTime:new Date(`${s}T${o}:00`).toISOString(),endTime:new Date(`${r}T${i}:00`).toISOString(),reason:e.querySelector("#blockageReason").value};try{await $a(n),e.reset(),f("Sucesso","Bloqueio adicionado com sucesso!","success"),tt(a)}catch(l){f("Erro",`Não foi possível criar o bloqueio: ${l.message}`,"error")}}async function Pd(t){t.preventDefault();const e=t.target,a=Array.from(e.querySelectorAll('input[name="batch-professionals"]:checked')).map(u=>u.value);if(a.length===0)return f("Atenção","Selecione pelo menos um profissional.","error");const s=e.querySelector("#batchBlockageDate").value,r=e.querySelector("#batchBlockageEndDate").value||s,o=e.querySelector("#batchBlockageStartTime").value,i=e.querySelector("#batchBlockageEndTime").value,n=e.querySelector("#batchBlockageReason").value,l=e.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="Aguarde...";const d=a.map(u=>{const c={establishmentId:m.establishmentId,professionalId:u,startTime:new Date(`${s}T${o}:00`).toISOString(),endTime:new Date(`${r}T${i}:00`).toISOString(),reason:n};return $a(c)});try{await Promise.all(d),f("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),e.reset(),e.querySelectorAll('input[name="batch-professionals"]:checked').forEach(c=>c.checked=!1);const u=document.getElementById("blockageProfId").value;u&&tt(u)}catch(u){f("Erro",`Ocorreu um erro: ${u.message}`,"error")}finally{l.disabled=!1,l.textContent="Adicionar Bloqueio em Lote"}}function Bd(t){It.addEventListener("submit",e=>{e.target.id==="blockageForm"&&Td(e),e.target.id==="batchBlockageForm"&&Pd(e)}),It.addEventListener("input",e=>{e.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&tt(t)}),It.addEventListener("click",async e=>{const a=e.target.closest("button[data-action]");if(!a)return;const s=a.dataset.action;if(s==="back-to-professionals")se("profissionais-section");else if(s==="delete-blockage"){if(await Y("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await bs(a.dataset.id),f("Sucesso","Bloqueio removido.","success"),tt(t)}catch(o){f("Erro",`Não foi possível remover o bloqueio: ${o.message}`,"error")}}else if(s==="batch-delete-blockage"){const r=JSON.parse(a.dataset.ids);if(await Y("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${r.length} bloqueios de uma vez?`))try{await Ro(r),f("Sucesso",`${r.length} bloqueios removidos.`,"success"),tt(t)}catch(i){f("Erro",`Não foi possível apagar os bloqueios: ${i.message}`,"error")}}})}async function Md(t){const{professionalId:e,professionalName:a}=t;if(!e||!a){It.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const s=h(a);It.innerHTML=`
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
        </section>`,Bd(e),await tt(e);const r=document.getElementById("batchProfSelectionContainer");try{const o=await Ee(m.establishmentId);r.innerHTML=o.map(i=>`
            <div class="flex items-center">
                <input id="prof-batch-${i.id}" value="${i.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${i.id}" class="ml-2 text-sm text-gray-700">${h(i.name)}</label>
            </div>`).join("")}catch{r.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Ad=t=>C(`/api/users/${t}`),qd=t=>C("/api/users",{method:"POST",body:JSON.stringify(t)}),jd=(t,e)=>C(`/api/users/${t}`,{method:"PUT",body:JSON.stringify(e)}),Nd=t=>C(`/api/users/${t}`,{method:"DELETE"}),Rd=(t,e)=>C(`/api/users/${t}/password`,{method:"PUT",body:JSON.stringify({password:e})}),Fd=(t,e)=>C(`/api/users/${t}/status`,{method:"PATCH",body:JSON.stringify({status:e})}),gt=document.getElementById("content"),Hd={"Operação & Atendimento":{"dashboard-section":"Dashboard","agenda-section":"Agenda","comandas-section":"Comandas","ausencias-section":"Ausências e Bloqueios"},"Financeiro & Vendas":{"financial-section":"Financeiro (ERP)","sales-report-section":"Relatório de Vendas","commissions-section":"Comissões","packages-section":"Planos e Pacotes"},"Cadastros Base":{"clientes-section":"Clientes","profissionais-section":"Profissionais","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores"},Administração:{"relatorios-section":"Relatórios Gerais","estabelecimento-section":"Configurações da Empresa","users-section":"Usuários e Acessos"}},Od={view:"Visualizar",create:"Criar",edit:"Editar"},Ws={owner:{label:"Proprietário",color:"bg-rose-100 text-rose-700 border-rose-200"},group_admin:{label:"Admin da Rede",color:"bg-purple-100 text-purple-700 border-purple-200"},company_admin:{label:"Gestor Matriz",color:"bg-blue-100 text-blue-700 border-blue-200"},branch_manager:{label:"Gestor Filial",color:"bg-orange-100 text-orange-700 border-orange-200"},professional:{label:"Profissional",color:"bg-slate-100 text-slate-600 border-slate-200"}};let Ut=null,Wt=null,at=null;function xr(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[m.establishmentId]}function zd(t){const e=document.getElementById("usersListContainer");if(!e)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(t.length===0){const s=a?"Nenhum usuário encontrado na base.":"Nenhum usuário ativo neste contexto.";e.innerHTML=`
            <div class="col-span-full py-16 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3"><i class="bi bi-people text-3xl text-slate-300"></i></div>
                <h3 class="text-sm font-bold text-slate-700 mb-1">${s}</h3>
                <p class="text-[10px] text-slate-500 max-w-xs">Tente selecionar mais unidades no topo da tela ou exibir inativos.</p>
            </div>`;return}t.sort((s,r)=>s.role==="owner"&&r.role!=="owner"?-1:s.role!=="owner"&&r.role==="owner"?1:(s.status==="active"?-1:1)-(r.status==="active"?-1:1)),e.innerHTML=t.map(s=>{const r=JSON.stringify(s).replace(/'/g,"&apos;"),o=s.status==="active",i=m.professionals?.find(u=>u.id===s.professionalId);i&&i.name;const n=i?i.name.charAt(0):s.name.charAt(0),l=s.photo||i?.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(n)}`,d=Ws[s.role]||Ws.professional;return`
        <div class="user-card-clickable bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between p-4 cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all active:scale-[0.99] ${o?"":"opacity-60 bg-slate-50"}" 
             data-action="edit-user" data-user='${r}'>
            
            <div class="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                <img src="${l}" alt="Foto" class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0 pointer-events-none">
                <div class="flex-1 min-w-0 pointer-events-none">
                    <h3 class="font-black text-slate-800 text-sm md:text-base truncate flex items-center gap-2">
                        ${h(s.name)} 
                        ${s.role==="owner"?'<i class="bi bi-star-fill text-amber-400 text-[10px]" title="Proprietário"></i>':""}
                    </h3>
                    <p class="text-[10px] md:text-xs text-slate-500 font-medium truncate mb-1">${h(s.email)}</p>
                    <div class="flex flex-wrap gap-1.5 mt-1">
                        <span class="text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest border ${d.color}">${d.label}</span>
                        ${i?'<span class="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest border border-slate-200 bg-slate-50 text-slate-500"><i class="bi bi-scissors text-indigo-400 mr-1"></i>Vínculo Prof.</span>':""}
                    </div>
                </div>
            </div>
            
            <div class="flex items-center justify-between w-full md:w-auto md:justify-end gap-4 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                <div class="flex flex-col items-start md:items-end mr-4">
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</span>
                    <label class="flex items-center cursor-pointer" title="${o?"Ativo":"Inativo"}" data-action-stop-propagation="true">
                        <div class="relative">
                            <input type="checkbox" data-action="toggle-user-status" data-user-id="${s.id}" class="sr-only" ${o?"checked":""} ${s.role==="owner"?"disabled":""}>
                            <div class="toggle-bg block ${o?"bg-emerald-500":"bg-slate-300"} ${s.role==="owner"?"opacity-50":""} w-10 h-5 rounded-full transition-colors shadow-inner"></div>
                            <div class="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${o?"transform translate-x-5":""}"></div>
                        </div>
                    </label>
                </div>
                
                ${s.role!=="owner"?`
                <button data-action="delete-user" data-user-id="${s.id}" class="text-slate-400 hover:text-red-500 w-10 h-10 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center border border-transparent hover:border-red-100 shadow-sm md:shadow-none bg-white md:bg-transparent" title="Excluir Usuário">
                    <i class="bi bi-trash3 pointer-events-none text-base"></i>
                </button>
                `:'<div class="w-10 h-10 flex items-center justify-center text-amber-500"><i class="bi bi-shield-check text-xl"></i></div>'}
            </div>
        </div>
        `}).join("")}function hr(){const e=document.getElementById("showInactiveUsersToggle")?.checked?m.users:m.users.filter(a=>a.status==="active");zd(e)}function Vd(t={}){let e="",a=!1;for(const[s,r]of Object.entries(Hd)){const o=Object.entries(r).filter(([i,n])=>{const l=i.replace("-section","");return!(m.enabledModules&&m.enabledModules[l]===!1)});o.length!==0&&(a=!0,e+=`
        <div class="mb-6 last:mb-0">
            <h4 class="font-black text-[10px] text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2"><i class="bi bi-folder2-open text-indigo-400 mr-1"></i> ${s}</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        `,o.forEach(([i,n])=>{const l=i==="agenda-section"||i==="comandas-section",d=t[i]?.view_all_prof===!0,u=Object.entries(Od).map(([p,b])=>`
                <label class="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <span class="text-[9px] text-slate-600 font-bold uppercase tracking-widest">${b}</span>
                    <div class="relative ml-2">
                        <input type="checkbox" data-module="${i}" data-permission="${p}" class="sr-only permission-checkbox" ${t[i]?.[p]?"checked":""}>
                        <div class="toggle-bg block bg-slate-200 w-8 h-4 rounded-full transition-colors shadow-inner"></div>
                        <div class="dot absolute left-1 top-[2px] bg-white w-3 h-3 rounded-full transition-transform ${t[i]?.[p]?"transform translate-x-4":""}"></div>
                    </div>
                </label>
            `).join(""),c=l?`
                <div class="mt-2 pt-2 border-t border-slate-100">
                    <label class="flex items-center justify-between cursor-pointer p-2 rounded-lg bg-indigo-50/50 hover:bg-indigo-100/50 transition-colors border border-indigo-100">
                        <span class="text-[9px] font-black text-indigo-700 uppercase tracking-widest">Acesso Toda Equipe</span>
                        <div class="relative ml-2">
                            <input type="checkbox" data-module="${i}" data-permission="view_all_prof" class="sr-only permission-checkbox" ${d?"checked":""}>
                            <div class="toggle-bg block bg-slate-200 w-8 h-4 rounded-full transition-colors shadow-inner"></div>
                            <div class="dot absolute left-1 top-[2px] bg-white w-3 h-3 rounded-full transition-transform ${d?"transform translate-x-4":""}"></div>
                        </div>
                    </label>
                </div>
            `:"";e+=`
            <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors flex flex-col justify-between">
                <h5 class="font-black text-xs text-slate-800 mb-3 uppercase tracking-wider">${n}</h5>
                <div class="space-y-1">
                    ${u}
                </div>
                ${c}
            </div>
            `}),e+="</div></div>")}return a?e:'<div class="p-6 bg-red-50 border border-red-100 rounded-2xl text-center"><p class="text-sm font-bold text-red-600">Sua empresa não possui módulos ativados. Contate o administrador do sistema.</p></div>'}function Js(t){if(!at||m.userRole==="professional")return"";const e=t?.accessibleEstablishments?.map(o=>o.id)||[],a=t?.accessibleCompanies?.map(o=>o.id)||[],s=t?.role||"professional";if(s==="owner"||s==="group_admin")return'<div class="p-5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-800 text-sm font-black flex items-center justify-center gap-3"><i class="bi bi-shield-check text-2xl"></i> Acesso Total (Toda a Rede)</div>';let r='<div class="space-y-3 max-h-60 overflow-y-auto custom-scrollbar p-1">';return at.companies.forEach(o=>{const i=a.includes(o.id),n=at.branches.filter(l=>l.companyId===o.id);r+=`
            <div class="company-block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <label class="flex items-center space-x-3 cursor-pointer p-3 bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-200">
                    <input type="checkbox" class="company-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-5 w-5" value="${o.id}" data-name="${o.name}" ${i?"checked":""}>
                    <span class="text-sm font-black text-slate-800 uppercase tracking-wider">🏢 ${o.name}</span>
                </label>
                <div class="p-2 space-y-1">
                    ${n.map(l=>{const d=e.includes(l.id)||i;return`
                            <label class="flex items-center space-x-3 cursor-pointer p-2.5 hover:bg-indigo-50/50 rounded-lg transition-colors border border-transparent hover:border-indigo-100">
                                <input type="checkbox" class="branch-checkbox rounded border-slate-300 text-indigo-500 h-4 w-4" value="${l.id}" data-name="${l.name}" data-company-id="${o.id}" ${d?"checked":""}>
                                <span class="text-xs font-bold text-slate-600">📍 ${l.name}</span>
                            </label>
                        `}).join("")}
                </div>
            </div>
        `}),r+="</div>",r}async function Gs(t=null){document.getElementById("user-list-view").classList.add("hidden");const e=document.getElementById("user-form-view");e.classList.remove("hidden");let a=m.professionals;if(!a||a.length===0)try{const p=xr().map(v=>Ee(v)),b=await Promise.all(p),g=new Map;b.flat().forEach(v=>g.set(v.id,v)),a=Array.from(g.values()),m.professionals=a}catch(c){console.warn("Profissionais não carregados",c)}if(["owner","group_admin","company_admin"].includes(m.userRole)&&!at)try{const c=await ye();c&&(at=c)}catch(c){console.error("Falha ao buscar hierarquia",c),at={companies:[],branches:[]}}const s=t!==null,r=s&&t.role==="owner",o=e.querySelector("#userFormTitle");o.innerHTML=s?`<i class="bi bi-person-lines-fill mr-2 text-indigo-600"></i>Editar Perfil: ${t.name}`:'<i class="bi bi-person-plus-fill mr-2 text-indigo-600"></i>Novo Acesso';const i=e.querySelector("#userForm");i.innerHTML=`
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[70vh]">
            
            <div class="flex overflow-x-auto custom-scrollbar border-b border-slate-200 bg-slate-50 flex-shrink-0">
                <button type="button" class="tab-btn active px-6 py-4 text-xs font-black uppercase tracking-widest text-indigo-600 border-b-2 border-indigo-600 whitespace-nowrap transition-colors" data-tab="tab-basico">1. Dados Básicos</button>
                <button type="button" class="tab-btn px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400 border-b-2 border-transparent hover:text-indigo-500 whitespace-nowrap transition-colors" data-tab="tab-acesso">2. Nível & Unidades</button>
                <button type="button" class="tab-btn px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400 border-b-2 border-transparent hover:text-indigo-500 whitespace-nowrap transition-colors" data-tab="tab-modulos">3. Módulos do Sistema</button>
            </div>

            <div class="flex-1 p-4 md:p-6 bg-slate-50/30 overflow-y-auto">
                
                <div id="tab-basico" class="tab-content space-y-6 animate-fade-in-fast">
                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <h3 class="font-black text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3"><i class="bi bi-person-badge text-indigo-500 text-lg"></i> Identificação</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome Completo *</label>
                                <input type="text" id="userName" required value="${t?.name||""}" class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner transition-colors">
                            </div>
                            <div class="form-group">
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">E-mail de Login *</label>
                                <input type="email" id="userEmail" required value="${t?.email||""}" ${r?"disabled":""} class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner transition-colors ${r?"opacity-70 cursor-not-allowed":""}">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <h3 class="font-black text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3"><i class="bi bi-link-45deg text-orange-500 text-lg"></i> Vínculo na Agenda</h3>
                        <div class="form-group max-w-xl">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Vincular a qual Perfil Profissional?</label>
                            <select id="userProfessionalId" class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none shadow-inner transition-colors">
                                <option value="">-- Apenas Administrativo / Recepção --</option>
                                ${a?.map(c=>`<option value="${c.id}" ${c.id===t?.professionalId?"selected":""}>${c.name}</option>`).join("")}
                            </select>
                            <p class="text-[10px] font-bold text-orange-500 mt-2 ml-1"><i class="bi bi-info-circle mr-1"></i>Necessário para que o usuário veja sua própria agenda e comissões no app.</p>
                        </div>
                    </div>

                    ${s?`
                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <button type="button" id="btn-show-password" class="text-[10px] py-2.5 px-5 bg-slate-800 text-white font-black uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-colors shadow-md flex items-center gap-2"><i class="bi bi-key-fill text-sm"></i> Redefinir Senha de Acesso</button>
                        <div id="password-form" class="hidden mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 max-w-md">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Nova Senha</label>
                            <input type="password" id="userNewPassword" placeholder="Mínimo 6 caracteres" class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold bg-white focus:ring-2 focus:ring-slate-500 outline-none shadow-inner">
                            <div class="flex gap-2 pt-2">
                                <button type="button" id="btn-cancel-pwd" class="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 text-[10px] uppercase tracking-widest font-black rounded-xl hover:bg-slate-50 transition-colors shadow-sm">Cancelar</button>
                                <button type="button" id="btn-save-pwd" class="flex-1 py-2.5 bg-rose-600 text-white text-[10px] uppercase tracking-widest font-black rounded-xl shadow-md hover:bg-rose-700 transition-colors">Salvar Senha</button>
                            </div>
                        </div>
                    </div>
                    `:`
                    <div class="bg-white p-5 rounded-2xl border border-rose-200 shadow-sm relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                        <h3 class="font-black text-xs text-rose-800 uppercase tracking-wider flex items-center gap-2 mb-4"><i class="bi bi-asterisk text-rose-500 text-lg"></i> Senha de Acesso</h3>
                        <input type="password" id="userPassword" required placeholder="Mínimo 6 caracteres" class="w-full max-w-md p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none shadow-inner transition-colors">
                    </div>
                    `}
                </div>

                <div id="tab-acesso" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    ${["owner","group_admin","company_admin"].includes(m.userRole)?`
                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 class="font-black text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3 mb-5"><i class="bi bi-diagram-3 text-indigo-500 text-lg"></i> Permissões de Rede</h3>
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <label class="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2 ml-1">Qual o cargo/nível na empresa?</label>
                                <select id="userRole" class="w-full p-3.5 border border-indigo-200 rounded-xl text-sm font-black text-indigo-900 bg-indigo-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-colors" ${r?"disabled":""}>
                                    
                                    ${["owner","group_admin"].includes(m.userRole)?`<option value="group_admin" ${t?.role==="group_admin"?"selected":""}>Administrador Geral (Acesso Total)</option>`:""}
                                    <option value="company_admin" ${t?.role==="company_admin"?"selected":""}>Gestor de Matriz / Empresa</option>
                                    <option value="branch_manager" ${t?.role==="branch_manager"?"selected":""}>Gestor de Filial (Loja)</option>
                                    <option value="professional" ${t?.role==="professional"?"selected":""}>Profissional / Recepção (Padrão)</option>
                                </select>
                            </div>
                            <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <label class="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3 ml-1">Unidades que pode visualizar</label>
                                <div id="hierarchySelectorContainer">
                                    ${Js(t)}
                                </div>
                            </div>
                        </div>
                    </div>
                    `:`<div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center"><p class="text-sm font-bold text-slate-500">Seu nível de acesso não permite alterar a hierarquia deste usuário.</p></div>
                         <input type="hidden" id="userRole" value="${t?.role||"professional"}">`}
                </div>

                <div id="tab-modulos" class="tab-content hidden animate-fade-in-fast">
                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 class="font-black text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3 mb-5"><i class="bi bi-ui-checks-grid text-indigo-500 text-lg"></i> O que ele pode fazer no sistema?</h3>
                        ${Vd(t?.permissions)}
                    </div>
                </div>

            </div>

            <div class="p-4 bg-white border-t border-slate-200 flex gap-3 flex-shrink-0 relative z-10 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)]">
                <button type="button" data-action="back-to-list" class="hidden md:block w-1/3 py-3.5 bg-slate-100 text-slate-700 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors shadow-sm">Voltar à Lista</button>
                <button type="submit" class="w-full md:w-2/3 py-3.5 bg-indigo-600 text-white font-black text-sm uppercase tracking-wider rounded-xl hover:bg-indigo-700 transition-transform active:scale-95 shadow-md flex justify-center items-center gap-2">
                    <i class="bi bi-check2-circle text-xl"></i> ${s?"Salvar Configurações":"Cadastrar Usuário"}
                </button>
            </div>
        </div>
    `;const n=e.querySelectorAll(".tab-btn"),l=e.querySelectorAll(".tab-content");n.forEach(c=>{c.addEventListener("click",()=>{n.forEach(b=>{b.classList.remove("active","text-indigo-600","border-indigo-600"),b.classList.add("text-slate-400","border-transparent")}),l.forEach(b=>b.classList.add("hidden")),c.classList.add("active","text-indigo-600","border-indigo-600"),c.classList.remove("text-slate-400","border-transparent");const p=c.getAttribute("data-tab");e.querySelector(`#${p}`).classList.remove("hidden")})});const d=i.querySelector("#userRole"),u=i.querySelector("#hierarchySelectorContainer");if(d&&u){d.addEventListener("change",p=>{const b={...t,role:p.target.value};u.innerHTML=Js(b),c()});const c=()=>{u.querySelectorAll(".company-checkbox").forEach(p=>{p.addEventListener("change",b=>{b.target.closest(".company-block").querySelectorAll(".branch-checkbox").forEach(y=>{y.checked=b.target.checked;const k=y.nextElementSibling.querySelector(".dot");k&&(b.target.checked?k.classList.add("transform","translate-x-4"):k.classList.remove("transform","translate-x-4"))})})})};c()}if(i.querySelectorAll(".permission-checkbox").forEach(c=>{if(c.addEventListener("change",p=>{const b=p.target.nextElementSibling,g=b.nextElementSibling;p.target.checked?(b.classList.replace("bg-slate-200","bg-indigo-500"),g.classList.add("transform","translate-x-4")):(b.classList.replace("bg-indigo-500","bg-slate-200"),g.classList.remove("transform","translate-x-4"))}),c.checked){const p=c.nextElementSibling,b=p.nextElementSibling;p.classList.replace("bg-slate-200","bg-indigo-500"),b.classList.add("transform","translate-x-4")}}),i.onsubmit=async c=>{c.preventDefault();const p=i.querySelector('button[type="submit"]'),b=p.innerHTML;p.disabled=!0,p.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> Processando...';const g={};i.querySelectorAll(".permission-checkbox").forEach(S=>{const L=S.dataset.module,q=S.dataset.permission;g[L]||(g[L]={}),g[L][q]=S.checked});const v=i.querySelector("#userProfessionalId").value||null,y=i.querySelector("#userRole")?.value||"professional",k=[],T=[];if(y!=="group_admin"&&y!=="owner"&&i.querySelector(".company-checkbox")&&(i.querySelectorAll(".company-checkbox:checked").forEach(S=>{k.push({id:S.value,name:S.dataset.name})}),i.querySelectorAll(".branch-checkbox:checked").forEach(S=>{T.push({id:S.value,name:S.dataset.name,companyId:S.dataset.companyId})}),T.length===0))return p.disabled=!1,p.innerHTML=b,f("Atenção","Selecione pelo menos uma filial na aba de Acesso.","warning");const P={name:i.querySelector("#userName").value,permissions:g,professionalId:v,role:y,accessibleCompanies:k,accessibleEstablishments:T};try{if(s){const S=i.querySelector("#userEmail").value;t?.email!==S&&!r&&(P.email=S),await jd(t.id,P),f("Sucesso","Usuário atualizado.","success")}else P.email=i.querySelector("#userEmail").value,P.password=i.querySelector("#userPassword").value,await qd(P),f("Sucesso","Novo usuário cadastrado na plataforma.","success");ua()}catch(S){f(`Erro: ${S.message}`,"error"),p.disabled=!1,p.innerHTML=b}},s){const c=i.querySelector("#btn-show-password"),p=i.querySelector("#password-form");c&&p&&(c.onclick=()=>{c.classList.add("hidden"),p.classList.remove("hidden")},i.querySelector("#btn-cancel-pwd").onclick=()=>{c.classList.remove("hidden"),p.classList.add("hidden"),p.querySelector("#userNewPassword").value=""},i.querySelector("#btn-save-pwd").onclick=async b=>{const g=b.target,v=p.querySelector("#userNewPassword").value;if(!v||v.length<6)return f("Aviso","Senha deve ter no mínimo 6 caracteres.","warning");if(await Y("Alterar Senha","O usuário usará esta nova senha no próximo acesso. Confirma?"))try{g.disabled=!0,g.textContent="Aguarde...",await Rd(t.id,v),f("Sucesso","Senha alterada com segurança.","success"),c.classList.remove("hidden"),p.classList.add("hidden")}catch(y){f("Erro",y.message,"error")}finally{g.disabled=!1,g.textContent="Salvar Senha"}})}}async function _d(){const t=document.getElementById("usersListContainer");t.innerHTML='<div class="col-span-full py-16 flex justify-center"><div class="loader"></div></div>';try{const e=xr(),a=e.map(l=>Ad(l)),s=e.map(l=>Ee(l)),r=await Promise.all(a),o=await Promise.all(s),i=new Map;r.flat().forEach(l=>i.set(l.id,l)),m.users=Array.from(i.values());const n=new Map;o.flat().forEach(l=>n.set(l.id,l)),m.professionals=Array.from(n.values()),hr()}catch{f("Erro ao carregar base de usuários.","error"),t.innerHTML='<p class="col-span-full text-center font-bold text-red-500 bg-red-50 p-6 rounded-2xl">Falha de comunicação com o servidor de acessos.</p>'}}async function ua(){gt.innerHTML=`
        <div id="user-list-view" class="relative h-full pb-24 p-2 md:p-6 w-full max-w-7xl mx-auto overflow-y-auto custom-scrollbar">
            <section class="animate-fade-in-down max-w-5xl mx-auto">
                <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-inner">
                            <i class="bi bi-shield-lock text-2xl"></i>
                        </div>
                        <div>
                            <h2 class="text-lg md:text-xl font-black text-slate-800 uppercase tracking-tight">Equipe & Acessos</h2>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gestão de Logins e Permissões</p>
                        </div>
                    </div>
                    <label class="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 bg-slate-50 md:bg-transparent">
                        <div class="relative">
                            <input type="checkbox" id="showInactiveUsersToggle" class="sr-only">
                            <div class="toggle-bg block bg-slate-200 w-10 h-5 rounded-full transition-colors shadow-inner"></div>
                            <div class="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform"></div>
                        </div>
                        <span class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Exibir Bloqueados</span>
                    </label>
                </div>
                
                <div id="usersListContainer" class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12"></div>
            </section>
            
            <button id="btn-add-user" data-action="new-user" title="Cadastrar Usuário" class="fixed right-5 md:right-10 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_20px_-10px_rgba(79,70,229,0.8)] hover:bg-indigo-700 transition-transform active:scale-90 z-[90] border border-indigo-500" style="bottom: 96px;">
                <i class="bi bi-person-plus-fill text-2xl drop-shadow-md pointer-events-none"></i>
            </button>
        </div>

        <div id="user-form-view" class="hidden h-full pb-24 p-2 md:p-6 w-full max-w-4xl mx-auto overflow-y-auto custom-scrollbar relative">
             <section class="animate-fade-in-down h-full flex flex-col">
                <div class="flex justify-between items-center mb-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex-shrink-0">
                    <button data-action="back-to-list" class="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors flex items-center justify-center shadow-inner">
                        <i class="bi bi-arrow-left text-lg"></i>
                    </button>
                    <h2 id="userFormTitle" class="text-sm md:text-base font-black text-slate-800 uppercase tracking-wider flex items-center"></h2>
                    <div class="w-10"></div>
                </div>
                <form id="userForm" class="flex-1 flex flex-col"></form>
            </section>
        </div>
    `,Ut&&gt.removeEventListener("click",Ut),Wt&&gt.removeEventListener("change",Wt),Ut=async t=>{const e=t.target.closest("[data-action]");if(!e)return;switch(e.dataset.action){case"new-user":Gs();break;case"edit-user":const s=JSON.parse(e.dataset.user.replace(/&apos;/g,"'"));Gs(s);break;case"back-to-list":ua();break;case"delete-user":{if(t.stopPropagation(),await Y("Excluir Usuário","O usuário perderá totalmente o acesso ao sistema. Confirma?"))try{await Nd(e.dataset.userId),f("Usuário excluído com sucesso.","success"),ua()}catch(r){f(`Erro: ${r.message}`,"error")}break}}},Wt=async t=>{if(t.target.id==="showInactiveUsersToggle"){const e=t.target.nextElementSibling,a=e.nextElementSibling;t.target.checked?(e.classList.replace("bg-slate-200","bg-indigo-500"),a.classList.add("transform","translate-x-5")):(e.classList.replace("bg-indigo-500","bg-slate-200"),a.classList.remove("transform","translate-x-5")),hr()}else{const e=t.target.closest('input[data-action="toggle-user-status"]');if(e){t.stopPropagation();const a=e.dataset.userId,s=e.checked?"active":"inactive",r=e.nextElementSibling,o=r.nextElementSibling;e.checked?(r.classList.replace("bg-slate-300","bg-emerald-500"),o.classList.add("transform","translate-x-5")):(r.classList.replace("bg-emerald-500","bg-slate-300"),o.classList.remove("transform","translate-x-5"));try{await Fd(a,s);const i=m.users.findIndex(n=>n.id===a);if(i>-1){m.users[i].status=s;const n=e.closest(".user-card-clickable");s==="inactive"?n.classList.add("opacity-60","bg-slate-50"):n.classList.remove("opacity-60","bg-slate-50")}}catch(i){f(`Erro: ${i.message}`,"error"),e.checked=!e.checked,e.checked?(r.classList.replace("bg-slate-300","bg-emerald-500"),o.classList.add("transform","translate-x-5")):(r.classList.replace("bg-emerald-500","bg-slate-300"),o.classList.remove("transform","translate-x-5"))}}}},gt.addEventListener("click",Ut),gt.addEventListener("change",Wt),await _d()}const Ud=document.getElementById("content");let Qs={},os=null;function Wd(){Object.values(Qs).forEach(t=>t?.destroy()),Qs={}}function Jd(t,e){if(!window.jspdf){f("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a({orientation:"landscape",unit:"px",format:"a4"}),r=document.getElementById("salesReportSummaryCards");if(s.setFontSize(18),s.text(t,s.internal.pageSize.getWidth()/2,40,{align:"center"}),r){const i=[["Receita Total",r.querySelector("#summary-revenue").textContent],["Vendas Totais",r.querySelector("#summary-transactions").textContent],["Ticket Médio",r.querySelector("#summary-avg-ticket").textContent]];s.autoTable({startY:60,head:[["Métrica","Valor"]],body:i,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const o=s.lastAutoTable?s.lastAutoTable.finalY+20:60;s.text("Detalhes das Vendas",20,o),s.autoTable({html:`#${e}`,startY:o+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),s.save(`${t.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function Ys(t){const e=document.getElementById("genericModal"),a=h(t.client),s=h(t.items),r=h(t.responsavelCaixa||"N/A"),o=(t.payments||[]).map(i=>`
        <div class="flex justify-between text-sm">
            <span>${h(i.method.charAt(0).toUpperCase()+i.method.slice(1))}</span>
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
                    <p class="font-semibold text-gray-800">${r}</p>
                </div>
                 <div class="border-t pt-4 mt-4">
                     <h3 class="font-semibold mb-2">Pagamento</h3>
                     <div class="space-y-1">
                        ${o}
                     </div>
                     <div class="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                         <span>TOTAL</span>
                         <span>R$ ${t.total.toFixed(2)}</span>
                     </div>
                </div>
            </div>
        </div>
    `,e.style.display="flex"}function Gd(t){const{summary:e,transactions:a}=t;document.getElementById("summary-revenue").textContent=`R$ ${e.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=e.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${e.averageTicket.toFixed(2)}`;const s=document.getElementById("paymentSummaryTableBody"),r=Object.entries(e.paymentMethodTotals).sort(([,n],[,l])=>l-n);s.innerHTML=r.map(([n,l])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${h(n.charAt(0).toUpperCase()+n.slice(1))}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${l.toFixed(2)}</td>
        </tr>
    `).join("");const o=document.getElementById("transactionsTableBody"),i=document.getElementById("mobileTransactionsList");if(a.length===0){const n='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';o.innerHTML=n,i.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}o.innerHTML=a.map((n,l)=>{const d=h(n.client),u=h(n.items),c=h(n.type);return`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${l}">
            <td class="w-24 py-3 px-4">${new Date(n.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${d}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${u}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${c}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${n.total.toFixed(2)}</td>
        </tr>
    `}).join(""),o.querySelectorAll("tr").forEach(n=>{n.addEventListener("dblclick",()=>{const l=n.dataset.transactionIndex,d=os.transactions[l];d&&Ys(d)})}),i.innerHTML=a.map((n,l)=>{const d=h(n.client),u=h(n.items),c=h(n.type);return`
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 active:bg-gray-50 cursor-pointer transition-colors" data-transaction-index="${l}">
            <div class="flex justify-between items-start mb-2">
                <div class="flex flex-col">
                    <span class="text-xs text-gray-500 font-medium">${new Date(n.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</span>
                    <span class="font-bold text-gray-800 text-lg">${d}</span>
                </div>
                <div class="text-right">
                    <span class="block font-bold text-green-600 text-lg">R$ ${n.total.toFixed(2)}</span>
                    <span class="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200">${c}</span>
                </div>
            </div>
            <div class="mt-2 pt-2 border-t border-dashed border-gray-200">
                <p class="text-sm text-gray-600 line-clamp-2">${u}</p>
            </div>
            <p class="text-xs text-blue-500 mt-2 text-center font-medium">Toque para ver detalhes</p>
        </div>
    `}).join(""),i.querySelectorAll("div[data-transaction-index]").forEach(n=>{n.addEventListener("click",()=>{const l=n.dataset.transactionIndex,d=os.transactions[l];d&&Ys(d)})})}async function Xs(){const t=document.getElementById("main-reports-view"),e=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!t||!e||!a)return;const s=e.value,r=a.value;if(!s||!r)return f("Atenção","Por favor, selecione as datas de início e fim.","error");t.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const o=document.getElementById("cashierSessionFilter").value,i=await ra({establishmentId:m.establishmentId,startDate:s,endDate:r,cashierSessionId:o});os=i,t.innerHTML=`
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
        `,Gd(i)}catch(o){f("Erro",`Não foi possível carregar o relatório: ${o.message}`,"error"),t.innerHTML=`<p class="p-8 text-center text-red-500">${h(o.message)}</p>`}}async function Qd(){Wd();const t=new Date().toISOString().split("T")[0],e=new Date;e.setDate(e.getDate()-30);const a=e.toISOString().split("T")[0];Ud.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",Xs),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const s=document.getElementById("reportStartDate").value,r=document.getElementById("reportEndDate").value,o=`Relatorio_Vendas_${s}_a_${r}`;Jd(o,"transactionsTable")});try{const s=await Tn(m.establishmentId),r=document.getElementById("cashierSessionFilter");s&&s.length>0&&s.forEach(o=>{const i=new Date(o.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),n=h(o.closedByName||"N/A");r.innerHTML+=`<option value="${o.id}">${n} - ${i}</option>`})}catch{f("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await Xs()}const Yd=document.getElementById("content");let $={payables:[],receivables:[],natures:[],costCenters:[],establishments:[],suppliers:[],clients:[],professionals:[],currentTab:"receivables",statusFilter:"all",startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date(new Date().getFullYear(),new Date().getMonth()+1,0).toISOString().split("T")[0],filterNaturezaId:"all",filterCostCenterId:"all",searchQuery:"",isAdvancedFilterOpen:!1,selectedIds:new Set,isSelectionMode:!1,sortCol:"dueDate",sortAsc:!0},Jt=null,Gt=null;function Es(t){const e=new Map,a=[];return t&&(t.forEach(s=>e.set(s.id,{...s,children:[]})),e.forEach(s=>{s.parentId&&e.has(s.parentId)?e.get(s.parentId).children.push(s):a.push(s)})),a}function vr(t){if(!t)return{day:"--",month:"---",full:"--/--/----"};const[e,a,s]=t.split("-"),r=new Date(e,a-1,s),o=String(r.getDate()).padStart(2,"0"),i=r.toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return{day:o,month:i,full:r.toLocaleDateString("pt-BR")}}function ve(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t)}function lt(t,e){if(e==="paid")return!1;const a=new Date;a.setHours(0,0,0,0);const[s,r,o]=t.split("-");return new Date(s,r-1,o)<a}function Xd(t,e,a){if(!t)return;if(!e||e.length===0){t.innerHTML=`
            <div class="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <i class="bi bi-inbox text-3xl text-gray-300"></i>
                <p class="text-gray-500 text-sm mt-2 font-medium">Nenhum item criado.</p>
            </div>`;return}const s=(r,o=0)=>{const i=o*16,n=o===0,l=n?"bi-folder-fill text-indigo-500":"bi-file-earmark-text text-gray-400",d=n?"bg-white shadow-sm border border-gray-200":"bg-gray-50 border border-gray-100",u=n?"text-sm font-bold text-gray-800":"text-sm font-semibold text-gray-600",c=o>0?'<div class="absolute left-0 top-1/2 w-3 border-t-2 border-gray-200" style="margin-left: -12px;"></div>':"",p=o>0?"border-left: 2px solid #e5e7eb;":"";return`
            <div class="relative flex justify-between items-center ${d} p-3 rounded-xl mb-2 hover:border-indigo-300 transition-all group" style="margin-left: ${i}px; ${p}">
                ${c}
                <span class="${u} flex items-center gap-2">
                    <i class="bi ${l} text-lg"></i>
                    ${h(r.name)}
                </span>
                <button type="button" data-action="delete-${a}" data-id="${r.id}" class="text-gray-400 hover:text-red-600 text-xs w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-red-100" title="Excluir">
                    <i class="bi bi-trash3 text-sm"></i>
                </button>
            </div>
            ${r.children.map(b=>s(b,o+1)).join("")}
        `};t.innerHTML=e.map(r=>s(r)).join("")}async function Zs(t){const e=document.getElementById("genericModal"),a=t==="nature",s=a?"Plano de Naturezas":"Centros de Custo",r=a?va:us,o=a?Ui:Wi,i=a?"natures":"costCenters";e.className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 p-0 md:p-6",e.innerHTML=`
        <div id="modal-content-wrapper" class="w-full md:max-w-xl bg-gray-50 md:bg-white flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-0 md:scale-95 h-full md:h-auto md:max-h-[85vh] rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl relative" style="font-family: 'Plus Jakarta Sans', 'Nunito', sans-serif;">
            <header class="bg-white md:bg-transparent border-b border-gray-100 md:border-gray-200 px-5 py-4 flex items-center justify-between pt-safe-top md:pt-4 z-20 flex-shrink-0">
                <button type="button" data-action="close-modal" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-90 transition-transform">
                    <i class="bi bi-x-lg"></i>
                </button>
                <h2 class="text-base font-bold text-gray-900 tracking-tight flex items-center gap-2">
                    <i class="bi ${a?"bi-tags-fill text-indigo-500":"bi-diagram-3-fill text-blue-500"}"></i> ${s}
                </h2>
                <div class="w-10 h-10"></div>
            </header>
            
            <div class="flex-1 overflow-y-auto p-5 pb-safe custom-scrollbar">
                <form id="hierarchyForm" class="mb-5 bg-white md:bg-gray-50 p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                    <div class="w-full">
                        <label class="block text-xs font-bold text-gray-500 mb-1.5">Nome da Categoria</label>
                        <input type="text" id="itemName" placeholder="Ex: Receitas de Vendas..." required class="w-full p-3.5 bg-gray-50 md:bg-white border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                    </div>
                    <div class="w-full">
                        <label class="block text-xs font-bold text-gray-500 mb-1.5">Sub-categoria de (Opcional)</label>
                        <select id="itemParent" class="w-full p-3.5 bg-gray-50 md:bg-white border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                            <option value="">-- Nível Principal --</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full py-3.5 mt-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 text-sm">
                        <i class="bi bi-plus-circle-fill"></i> Adicionar
                    </button>
                </form>

                <div class="pt-2">
                    <h3 class="text-sm font-bold text-gray-800 mb-3 ml-1">Estrutura Cadastrada</h3>
                    <div id="hierarchyList" class="space-y-2 pb-10">
                        <div class="loader mx-auto"></div>
                    </div>
                </div>
            </div>
        </div>`,e.style.display="flex",requestAnimationFrame(()=>{e.classList.remove("opacity-0");const c=e.querySelector("#modal-content-wrapper");c&&(c.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),c.classList.add("translate-y-0","md:scale-100","md:opacity-100"))});const n=e.querySelector("#hierarchyList"),l=e.querySelector("#itemParent"),d=c=>{const p=Es(c);Xd(n,p,t);const b=l.value;l.innerHTML='<option value="">-- Nível Principal --</option>';const g=(v,y=0)=>{const k="  ".repeat(y)+(y>0?"↳ ":"");l.innerHTML+=`<option value="${v.id}">${k}${h(v.name)}</option>`,v.children.forEach(T=>g(T,y+1))};p.forEach(v=>g(v)),l.value=b};try{const c=await r(m.establishmentId);$[i]=c,d(c)}catch(c){console.error(c)}const u=e.querySelector("#hierarchyForm");u.addEventListener("submit",async c=>{c.preventDefault();const p=e.querySelector("#itemName").value,b=l.value;try{await o({name:p,parentId:b||null,establishmentId:m.establishmentId});const g=await r(m.establishmentId);$[i]=g,d(g),u.reset(),await Pe(),f("Sucesso","Item adicionado à estrutura.","success")}catch(g){f("Erro",g.message,"error")}})}function At(){const t=document.getElementById("genericModal");t.classList.add("opacity-0");const e=t.querySelector("#modal-content-wrapper");e&&(e.classList.remove("translate-y-0","md:scale-100","md:opacity-100"),e.classList.add("translate-y-full","md:scale-95","md:opacity-0")),setTimeout(()=>{t.style.display="none",t.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",t.innerHTML=""},300)}async function Zd(){try{const e=(await ye()).matrizes||[];$.establishments=[],e.forEach(a=>{$.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>$.establishments.push({id:s.id,name:s.name,type:"Filial"}))})}catch(t){console.warn("Erro ao buscar lojas",t)}yr(),wr(),await Pe()}function yr(){Yd.innerHTML=`
        <section class="h-[calc(100vh-80px)] md:h-auto flex flex-col p-0 md:p-4 md:pl-6 w-full relative bg-slate-50 overflow-hidden" style="font-family: 'Plus Jakarta Sans', 'Nunito', sans-serif;">
            
            <div id="batch-action-bar" class="hidden fixed top-20 left-4 right-4 md:absolute md:top-4 z-50 bg-gray-900 text-white rounded-2xl shadow-2xl p-4 items-center justify-between animate-fade-in-down">
                <div class="flex items-center gap-3">
                    <button id="cancel-selection-btn" class="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <span class="font-bold text-base tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Lançamentos Selecionados</span>
                </div>
                <button id="batch-delete-btn" class="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg text-sm">
                    <i class="bi bi-trash3"></i> Excluir Massa
                </button>
            </div>

            <div class="flex-shrink-0 z-30 bg-slate-50 pt-safe-top sticky top-0 md:static border-b border-gray-200 md:border-0 w-full max-w-7xl mx-auto">
                <div class="bg-white md:bg-transparent px-4 py-3 flex justify-between items-center md:pb-5">
                    <div class="flex bg-gray-100 md:bg-white p-1 md:p-1.5 rounded-xl w-full md:w-auto shadow-inner md:shadow-sm border md:border-gray-200">
                        <button id="tab-receivables" class="flex-1 md:w-40 py-2.5 text-sm font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${$.currentTab==="receivables"?"bg-white md:bg-emerald-50 text-emerald-700 shadow-sm md:shadow-none":"text-gray-500 hover:text-gray-800"}">
                            A Receber
                        </button>
                        <button id="tab-payables" class="flex-1 md:w-40 py-2.5 text-sm font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${$.currentTab==="payables"?"bg-white md:bg-red-50 text-red-700 shadow-sm md:shadow-none":"text-gray-500 hover:text-gray-800"}">
                            A Pagar
                        </button>
                    </div>
                    
                    <div class="hidden md:flex items-center gap-3 ml-4">
                        <button data-action="new-financial" data-type="receivable" class="py-2.5 px-5 bg-emerald-600 text-white font-bold rounded-xl shadow-md hover:bg-emerald-700 active:scale-95 transition-all text-sm flex items-center gap-2">
                            <i class="bi bi-plus-circle-fill"></i> Nova Receita
                        </button>
                        <button data-action="new-financial" data-type="payable" class="py-2.5 px-5 bg-red-600 text-white font-bold rounded-xl shadow-md hover:bg-red-700 active:scale-95 transition-all text-sm flex items-center gap-2">
                            <i class="bi bi-dash-circle-fill"></i> Nova Despesa
                        </button>
                        <div class="w-px h-8 bg-gray-300 mx-2"></div>
                        <button id="export-excel-btn" class="py-2.5 px-4 bg-white border border-gray-200 text-green-700 font-bold rounded-xl hover:bg-green-50 transition shadow-sm flex items-center gap-2 text-sm" title="Exportar Excel">
                            <i class="bi bi-file-earmark-excel-fill text-green-600 text-lg"></i>
                        </button>
                        <button id="settings-btn" class="py-2.5 px-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-sm" title="Configurações">
                            <i class="bi bi-gear-fill text-gray-500 text-lg"></i>
                        </button>
                    </div>
                </div>

                <div class="px-4 py-3 md:py-0 md:mb-5 bg-slate-50">
                    <div id="summary-section" class="flex md:grid md:grid-cols-4 overflow-x-auto gap-3 md:gap-5 snap-x hide-scrollbar"></div>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar w-full relative z-0 pb-[100px] md:pb-6" id="scrollable-content">
                
                <div class="px-4 py-3 flex flex-col gap-4 max-w-7xl mx-auto">
                    
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div class="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 md:pb-0 w-full md:w-auto">
                            <button class="date-preset-btn px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-xl whitespace-nowrap shadow-sm active:scale-95 transition-all" data-preset="month">Este Mês</button>
                            <button class="date-preset-btn px-4 py-2 bg-white text-gray-600 text-sm font-bold rounded-xl whitespace-nowrap shadow-sm hover:bg-gray-50 active:scale-95 transition-all" data-preset="last_month">Mês Passado</button>
                            <button id="custom-date-btn" class="px-4 py-2 bg-white text-gray-600 text-sm font-bold rounded-xl whitespace-nowrap shadow-sm hover:bg-gray-50 active:scale-95 transition-all flex items-center gap-2"><i class="bi bi-calendar-event"></i> Customizado</button>
                        </div>
                        
                        <div class="relative w-full md:w-80">
                            <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                            <input type="text" id="searchInput" value="${$.searchQuery}" placeholder="Procurar por nome ou nota..." class="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 shadow-sm rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                        </div>
                    </div>

                    <div id="filter-panel" class="hidden animate-fade-in-down">
                        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                            <div class="grid grid-cols-2 gap-4 flex-1">
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Inicial</label>
                                    <input type="date" id="filterStartDate" value="${$.startDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Final</label>
                                    <input type="date" id="filterEndDate" value="${$.endDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4 flex-1">
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Categoria (Natureza)</label>
                                    <select id="filterNaturezaId" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                                        <option value="all">Todas as Categorias</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">C. de Custo</label>
                                    <select id="filterCostCenterId" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                                        <option value="all">Todos</option>
                                    </select>
                                </div>
                            </div>

                            <div class="flex items-end gap-2 md:w-auto mt-2 md:mt-0">
                                <button id="clear-filters-btn" class="flex-1 md:w-auto py-2.5 px-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors text-sm">Limpar</button>
                                <button id="apply-filter-btn" class="flex-[2] md:w-auto py-2.5 px-6 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
                                    <i class="bi bi-check2"></i> Aplicar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                        <button data-status="all" class="status-filter-btn px-4 py-2 text-sm font-bold rounded-xl transition whitespace-nowrap shadow-sm ${$.statusFilter==="all"?"bg-gray-900 text-white":"bg-white text-gray-600 hover:bg-gray-50"}">Todos os Status</button>
                        <button data-status="pending" class="status-filter-btn px-4 py-2 text-sm font-bold rounded-xl transition whitespace-nowrap shadow-sm ${$.statusFilter==="pending"?"bg-blue-600 text-white":"bg-white text-gray-600 hover:bg-gray-50"}">Pendente</button>
                        <button data-status="paid" class="status-filter-btn px-4 py-2 text-sm font-bold rounded-xl transition whitespace-nowrap shadow-sm ${$.statusFilter==="paid"?"bg-emerald-600 text-white":"bg-white text-gray-600 hover:bg-gray-50"}">Baixado</button>
                        <button data-status="overdue" class="status-filter-btn px-4 py-2 text-sm font-bold rounded-xl transition whitespace-nowrap shadow-sm ${$.statusFilter==="overdue"?"bg-red-600 text-white":"bg-white text-gray-600 hover:bg-gray-50"}">Atrasado</button>
                    </div>
                </div>

                <div class="hidden md:grid grid-cols-12 gap-4 px-6 py-4 text-xs font-bold text-gray-500 tracking-wide items-center bg-white border border-gray-100 sticky top-0 z-20 shadow-sm mx-4 mt-4 rounded-t-2xl max-w-7xl md:mx-auto">
                    <div class="col-span-1 flex justify-center">
                        <input type="checkbox" id="select-all-toggle" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                    </div>
                    <div class="col-span-1 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center justify-center select-none" data-sort="dueDate">
                        Vencimento <i class="bi bi-chevron-expand ml-1 opacity-40 text-[10px]"></i>
                    </div>
                    <div class="col-span-4 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center select-none" data-sort="description">
                        Descrição / Entidade <i class="bi bi-chevron-expand ml-1 opacity-40 text-[10px]"></i>
                    </div>
                    <div class="col-span-2 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center select-none" data-sort="naturezaId">
                        Natureza / C. Custo <i class="bi bi-chevron-expand ml-1 opacity-40 text-[10px]"></i>
                    </div>
                    <div class="col-span-1 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center justify-center select-none" data-sort="status">
                        Status <i class="bi bi-chevron-expand ml-1 opacity-40 text-[10px]"></i>
                    </div>
                    <div class="col-span-2 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center justify-end text-right select-none" data-sort="amount">
                        Valor <i class="bi bi-chevron-expand ml-1 opacity-40 text-[10px]"></i>
                    </div>
                    <div class="col-span-1 text-center">Ações</div>
                </div>

                <div class="px-4 md:px-0 pb-6 w-full max-w-7xl md:mx-auto">
                    <div id="list-container" class="flex flex-col w-full md:bg-white md:border-x md:border-b md:border-gray-100 md:shadow-sm md:rounded-b-2xl">
                        <div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-sm">Carregando lançamentos...</p></div>
                    </div>
                </div>
            </div>

            <div class="md:hidden fixed bottom-[85px] left-0 right-0 px-4 flex gap-3 justify-center pointer-events-none z-40">
                <button data-action="new-financial" data-type="receivable" class="pointer-events-auto flex-1 max-w-[150px] bg-emerald-600 text-white py-3.5 rounded-2xl shadow-[0_8px_30px_rgb(5,150,105,0.3)] font-bold flex items-center justify-center gap-2 active:scale-95 transition-all text-sm border border-emerald-500">
                    <i class="bi bi-arrow-down-circle-fill text-lg"></i> Receita
                </button>
                <button data-action="new-financial" data-type="payable" class="pointer-events-auto flex-1 max-w-[150px] bg-red-600 text-white py-3.5 rounded-2xl shadow-[0_8px_30px_rgb(220,38,38,0.3)] font-bold flex items-center justify-center gap-2 active:scale-95 transition-all text-sm border border-red-500">
                    <i class="bi bi-arrow-up-circle-fill text-lg"></i> Despesa
                </button>
            </div>

        </section>
    `,kr()}function Kd(){const t=$.currentTab==="receivables",e=t?$.receivables:$.payables;let a=e;if($.statusFilter!=="all"&&(a=e.filter(n=>{const l=lt(n.dueDate,n.status);return $.statusFilter==="overdue"?l:$.statusFilter==="pending"?n.status==="pending"&&!l:n.status===$.statusFilter})),$.searchQuery&&(a=a.filter(n=>n.description&&n.description.toLowerCase().includes($.searchQuery)||n.entity&&n.entity.toLowerCase().includes($.searchQuery)||n.notes&&n.notes.toLowerCase().includes($.searchQuery))),a.sort((n,l)=>new Date(n.dueDate)-new Date(l.dueDate)),a.length===0){f("Aviso","Não há dados para exportar com os filtros atuais.","info");return}const s=new Map($.natures.map(n=>[n.id,n.name])),r=new Map($.costCenters.map(n=>[n.id,n.name])),o=new Map($.establishments.map(n=>[n.id,n])),i=a.map(n=>{const l=n.status==="paid",d=lt(n.dueDate,n.status);let u=l?"Baixado":d?"Atrasado":"A Vencer / Pendente";const c=n.naturezaId?s.get(n.naturezaId)||"Não Categorizado":"Geral",p=n.centroDeCustoId?r.get(n.centroDeCustoId)||"Não Categorizado":"Geral",b=o.get(n.establishmentId),g=b?b.name:"Atual",v=n.saleId||n.appointmentId||n.origin==="comanda"?"Comanda / PDV":n.origin==="commission"?"Comissões":"Manual";return{"Data de Vencimento":new Date(n.dueDate).toLocaleDateString("pt-BR"),"Data de Pagamento":n.paymentDate?new Date(n.paymentDate).toLocaleDateString("pt-BR"):"-",Descrição:n.description||"","Favorecido / Pagador":n.entity||"",Unidade:g,Natureza:c,"Centro de Custo":p,Origem:v,"Documento / NFS":n.documentNumber||"",Status:u,"Valor (R$)":n.amount}});try{if(typeof XLSX>"u"){f("Erro","A biblioteca de exportação (XLSX) não foi carregada no sistema.","error");return}const n=XLSX.utils.json_to_sheet(i),l=XLSX.utils.book_new();XLSX.utils.book_append_sheet(l,n,"Financeiro");const u=`Fluxo_${t?"Receitas":"Despesas"}_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(l,u)}catch(n){console.error("Erro ao exportar:",n),f("Erro","Não foi possível exportar para Excel.","error")}}function ec(){document.querySelectorAll(".sort-header").forEach(t=>{const e=t.querySelector("i.bi-chevron-expand, i.bi-chevron-up, i.bi-chevron-down");if(!e)return;t.dataset.sort===$.sortCol?(t.classList.add("text-indigo-700"),t.classList.remove("text-gray-500"),e.className=$.sortAsc?"bi bi-chevron-up ml-1 text-indigo-600 text-[11px] font-black":"bi bi-chevron-down ml-1 text-indigo-600 text-[11px] font-black"):(t.classList.remove("text-indigo-700"),t.classList.add("text-gray-500"),e.className="bi bi-chevron-expand ml-1 opacity-40 text-[10px] font-black")})}function wr(){document.querySelectorAll(".sort-header").forEach(o=>{o.addEventListener("click",i=>{const n=i.currentTarget.dataset.sort;$.sortCol===n?$.sortAsc=!$.sortAsc:($.sortCol=n,$.sortAsc=!0),Lt()})});const t=document.getElementById("select-all-toggle");t&&t.addEventListener("change",o=>{const i=o.target.checked,n=document.querySelectorAll(".item-checkbox");$.selectedIds.clear(),n.forEach(l=>{l.checked=i,i&&$.selectedIds.add(l.value)}),Ke()}),document.getElementById("cancel-selection-btn").addEventListener("click",()=>{$.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(o=>o.checked=!1),Ke()}),document.getElementById("batch-delete-btn").addEventListener("click",async()=>{const o=$.selectedIds.size;if(o===0)return;if(await Y("Excluir Lançamentos",`Deseja realmente apagar ${o} registros financeiros?`))try{const n=$.currentTab==="payables"?"payables":"receivables";await Mo(n,Array.from($.selectedIds)),f("Sucesso",`${o} itens excluídos.`,"success"),$.selectedIds.clear(),Ke(),Pe()}catch{f("Erro","Falha ao excluir itens.","error")}}),document.getElementById("custom-date-btn").addEventListener("click",()=>{const o=document.getElementById("filter-panel"),i=document.getElementById("custom-date-btn");$.isAdvancedFilterOpen=!$.isAdvancedFilterOpen,$.isAdvancedFilterOpen?(o.classList.remove("hidden"),i.classList.add("bg-gray-900","text-white","border-gray-900"),i.classList.remove("bg-white","text-gray-600","border-gray-200")):(o.classList.add("hidden"),i.classList.remove("bg-gray-900","text-white","border-gray-900"),i.classList.add("bg-white","text-gray-600","border-gray-200"))});const e=document.getElementById("export-excel-btn");e&&e.addEventListener("click",Kd);const a=document.getElementById("settings-btn");a&&a.addEventListener("click",sc),document.querySelectorAll('[data-action="new-financial"]').forEach(o=>{o.addEventListener("click",i=>{navigator.vibrate&&navigator.vibrate(20),eo(i.target.closest("button").dataset.type)})});const s=document.getElementById("tab-receivables"),r=document.getElementById("tab-payables");s.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15),Ks("receivables")}),r.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15),Ks("payables")}),document.querySelectorAll(".status-filter-btn").forEach(o=>{o.addEventListener("click",i=>{navigator.vibrate&&navigator.vibrate(15),document.querySelectorAll(".status-filter-btn").forEach(l=>{l.classList.remove("bg-gray-900","bg-blue-600","bg-emerald-600","bg-red-600","text-white"),l.classList.add("bg-white","text-gray-600")});const n=i.target.dataset.status;n==="all"?i.target.classList.add("bg-gray-900","text-white"):n==="pending"?i.target.classList.add("bg-blue-600","text-white"):n==="paid"?i.target.classList.add("bg-emerald-600","text-white"):n==="overdue"&&i.target.classList.add("bg-red-600","text-white"),i.target.classList.remove("bg-white","text-gray-600"),$.statusFilter=n,Lt()})}),document.querySelectorAll(".date-preset-btn").forEach(o=>{o.addEventListener("click",i=>{navigator.vibrate&&navigator.vibrate(15),document.querySelectorAll(".date-preset-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),i.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),i.target.classList.remove("bg-white","text-gray-600","border-gray-200");const n=i.target.dataset.preset,l=new Date;let d,u;n==="month"?(d=new Date(l.getFullYear(),l.getMonth(),1),u=new Date(l.getFullYear(),l.getMonth()+1,0)):n==="last_month"&&(d=new Date(l.getFullYear(),l.getMonth()-1,1),u=new Date(l.getFullYear(),l.getMonth(),0)),document.getElementById("filterStartDate").value=d.toISOString().split("T")[0],document.getElementById("filterEndDate").value=u.toISOString().split("T")[0],$.startDate=d.toISOString().split("T")[0],$.endDate=u.toISOString().split("T")[0],Pe()})}),document.getElementById("searchInput").addEventListener("input",o=>{$.searchQuery=o.target.value.toLowerCase(),Lt()}),document.getElementById("clear-filters-btn").addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15);const o=new Date;document.getElementById("filterStartDate").value=new Date(o.getFullYear(),o.getMonth(),1).toISOString().split("T")[0],document.getElementById("filterEndDate").value=new Date(o.getFullYear(),o.getMonth()+1,0).toISOString().split("T")[0],document.getElementById("filterNaturezaId").value="all",document.getElementById("filterCostCenterId").value="all",yr(),wr(),Pe()}),document.getElementById("apply-filter-btn").addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(20),$.startDate=document.getElementById("filterStartDate").value,$.endDate=document.getElementById("filterEndDate").value,$.filterNaturezaId=document.getElementById("filterNaturezaId").value,$.filterCostCenterId=document.getElementById("filterCostCenterId").value,document.getElementById("custom-date-btn").click(),Pe()}),Jt&&document.body.removeEventListener("click",Jt),Jt=o=>{const i=o.target;if(i.classList.contains("item-checkbox")||i.classList.contains("modal-item-checkbox")){const d=i.value||i.dataset.id;i.checked?$.selectedIds.add(d):$.selectedIds.delete(d),Ke(),o.stopPropagation();return}const n=i.closest("button[data-action]");if(n){const{action:d,type:u,id:c}=n.dataset;if(d==="mark-as-paid"){o.stopPropagation(),navigator.vibrate&&navigator.vibrate(20),tc(u,c);return}if(d==="delete"){o.stopPropagation(),navigator.vibrate&&navigator.vibrate(30);const p=n.closest(".financial-row").dataset.item;try{Sr(u,JSON.parse(decodeURIComponent(p)))}catch(b){console.error("Parse error on delete",b)}return}if(d==="manage-natures"){o.stopPropagation(),Zs("nature");return}if(d==="manage-cost-centers"){o.stopPropagation(),Zs("cost-center");return}if(d==="close-modal"){o.stopPropagation(),At();return}}const l=i.closest(".financial-row");if(l&&document.getElementById("list-container").contains(l)&&!i.closest("button")&&!i.closest(".item-checkbox")){navigator.vibrate&&navigator.vibrate(15);const{type:d}=l.dataset;try{const u=JSON.parse(decodeURIComponent(l.dataset.item));eo(d,u)}catch(u){console.error("Parse error on card click",u),f("Erro","Os dados deste lançamento não puderam ser lidos corretamente.","error")}}},document.body.addEventListener("click",Jt),Gt&&document.getElementById("genericModal").removeEventListener("click",Gt),Gt=o=>{const i=o.target.closest('button[data-action^="delete-"]');if(i){const n=i.dataset.action.split("-")[1];handleDeleteHierarchyItem(n,i.dataset.id)}o.target===document.getElementById("genericModal")&&At()},document.getElementById("genericModal").addEventListener("click",Gt)}function Ke(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=$.selectedIds.size;e.textContent=a,a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex"))}function Ks(t){$.currentTab=t,$.selectedIds.clear(),Ke(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1);const e=document.getElementById("tab-receivables"),a=document.getElementById("tab-payables");t==="receivables"?(e.classList.add("bg-white","md:bg-emerald-50","text-emerald-700","shadow-sm","md:shadow-none"),e.classList.remove("text-gray-500"),a.classList.remove("bg-white","md:bg-red-50","text-red-700","shadow-sm","md:shadow-none"),a.classList.add("text-gray-500")):(a.classList.add("bg-white","md:bg-red-50","text-red-700","shadow-sm","md:shadow-none"),a.classList.remove("text-gray-500"),e.classList.remove("bg-white","md:bg-emerald-50","text-emerald-700","shadow-sm","md:shadow-none"),e.classList.add("text-gray-500")),Lt(),$r()}async function Pe(){const t=document.getElementById("list-container");t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-sm">A sincronizar carteira...</p></div>';try{if($.natures.length===0){const[i,n,l,d,u]=await Promise.all([va(m.establishmentId),us(m.establishmentId),Mt(m.establishmentId).catch(()=>[]),ut(m.establishmentId,"",1e3).catch(()=>[]),Ee(m.establishmentId).catch(()=>[])]);$.natures=i||[],$.costCenters=n||[],$.suppliers=l||[],$.clients=d||[],$.professionals=u||[],kr()}const a=(m.selectedEstablishments&&m.selectedEstablishments.length>0?m.selectedEstablishments:[m.establishmentId]).join(","),s={startDate:$.startDate,endDate:$.endDate,establishmentId:a};$.filterNaturezaId!=="all"&&(s.natureId=$.filterNaturezaId),$.filterCostCenterId!=="all"&&(s.costCenterId=$.filterCostCenterId);const[r,o]=await Promise.all([ps(s),ya(s)]);$.payables=r.entries||[],$.receivables=o.entries||[],$r(),Lt()}catch(e){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-sm font-bold">Erro ao carregar dados: ${e.message}</p>
            </div>`}}function kr(){const t=s=>{let r='<option value="all">Todas as categorias</option>';const o=Es(s),i=(n,l=0)=>{const d="  ".repeat(l)+(l>0?"↳ ":"");r+=`<option value="${n.id}">${d}${h(n.name)}</option>`,n.children.forEach(u=>i(u,l+1))};return o.forEach(n=>i(n)),r},e=document.getElementById("filterNaturezaId"),a=document.getElementById("filterCostCenterId");e&&(e.innerHTML=t($.natures)),a&&(a.innerHTML=t($.costCenters))}function $r(){const t=document.getElementById("summary-section");if(!t)return;const e=$.currentTab==="receivables";let s=e?$.receivables:$.payables;$.searchQuery&&(s=s.filter(u=>u.description&&u.description.toLowerCase().includes($.searchQuery)||u.entity&&u.entity.toLowerCase().includes($.searchQuery)||u.notes&&u.notes.toLowerCase().includes($.searchQuery)));const r=s.reduce((u,c)=>u+c.amount,0),o=s.filter(u=>u.status==="paid").reduce((u,c)=>u+c.amount,0),i=s.filter(u=>u.status==="pending"&&!lt(u.dueDate,u.status)).reduce((u,c)=>u+c.amount,0),n=s.filter(u=>lt(u.dueDate,u.status)).reduce((u,c)=>u+c.amount,0),l=e?"emerald":"red",d=e?"bi-arrow-down-left-circle-fill text-emerald-500":"bi-arrow-up-right-circle-fill text-red-500";t.innerHTML=`
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 md:p-4 rounded-2xl md:rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-50 flex items-center justify-center">
                    <i class="bi ${d} text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Total<br class="md:hidden"/> Geral</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-gray-900">${ve(r)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 md:p-4 rounded-2xl md:rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-50 flex items-center justify-center">
                    <i class="bi bi-clock-history text-blue-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">A Vencer<br class="md:hidden"/> Pendente</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-blue-600">${ve(i)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 md:p-4 rounded-2xl md:rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-${l}-50 flex items-center justify-center">
                    <i class="bi bi-check-circle-fill text-${l}-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Status<br class="md:hidden"/> Baixado</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-${l}-600">${ve(o)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 md:p-4 rounded-2xl md:rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full ${n>0?"bg-red-50":"bg-gray-50"} flex items-center justify-center">
                    <i class="bi bi-exclamation-circle-fill ${n>0?"text-red-500":"text-gray-300"} text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Pagos<br class="md:hidden"/> Atrasados</span>
            </div>
            <span class="text-xl md:text-2xl font-black ${n>0?"text-red-600":"text-gray-400"}">${ve(n)}</span>
        </div>
    `}function Lt(){const t=document.getElementById("list-container");if(!t)return;const e=$.currentTab==="receivables",a=e?$.receivables:$.payables;let s=a;if($.statusFilter!=="all"&&(s=a.filter(c=>{const p=lt(c.dueDate,c.status);return $.statusFilter==="overdue"?p:$.statusFilter==="pending"?c.status==="pending"&&!p:c.status===$.statusFilter})),$.searchQuery&&(s=s.filter(c=>c.description&&c.description.toLowerCase().includes($.searchQuery)||c.entity&&c.entity.toLowerCase().includes($.searchQuery)||c.notes&&c.notes.toLowerCase().includes($.searchQuery))),s.sort((c,p)=>{let b=c[$.sortCol],g=p[$.sortCol];return $.sortCol==="dueDate"?(b=new Date(b).getTime(),g=new Date(g).getTime()):($.sortCol==="description"||$.sortCol==="status")&&(b=b?b.toLowerCase():"",g=g?g.toLowerCase():""),b<g?$.sortAsc?-1:1:b>g?$.sortAsc?1:-1:0}),ec(),s.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white">
                <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                    <i class="bi bi-wallet2 text-4xl text-gray-300"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-1">Sem resultados</h3>
                <p class="text-sm font-medium text-gray-400 text-center px-4">Não existem lançamentos com os filtros aplicados neste período.</p>
            </div>
        `;return}const r=new Map($.natures.map(c=>[c.id,c.name])),o=new Map($.costCenters.map(c=>[c.id,c.name])),i=new Map($.establishments.map(c=>[c.id,c])),n=e?"receivable":"payable",l=e?"text-emerald-600":"text-red-600",d=e?'<i class="bi bi-arrow-down-left-circle-fill text-emerald-500 text-2xl drop-shadow-sm"></i>':'<i class="bi bi-arrow-up-right-circle-fill text-red-500 text-2xl drop-shadow-sm"></i>',u=e?'<i class="bi bi-arrow-down-left-circle-fill text-emerald-500 text-lg"></i>':'<i class="bi bi-arrow-up-right-circle-fill text-red-500 text-lg"></i>';t.innerHTML=s.map(c=>{const p=vr(c.dueDate),b=c.status==="paid",g=lt(c.dueDate,c.status);let v="";b?v='<span class="text-[9px] md:text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 md:px-2.5 py-1 rounded-lg uppercase tracking-widest"><i class="bi bi-check2-circle"></i> Baixado</span>':g?v='<span class="text-[9px] md:text-[10px] font-black text-red-600 bg-red-50 px-2 md:px-2.5 py-1 rounded-lg uppercase tracking-widest"><i class="bi bi-exclamation-circle"></i> Atraso</span>':v='<span class="text-[9px] md:text-[10px] font-black text-blue-600 bg-blue-50 px-2 md:px-2.5 py-1 rounded-lg uppercase tracking-widest"><i class="bi bi-clock"></i> Pendente</span>';const y=c.naturezaId&&r.get(c.naturezaId)||"Geral",k=c.centroDeCustoId&&o.get(c.centroDeCustoId)||"Geral",T=i.get(c.establishmentId);let P="";if(T){const E=T.type==="Matriz"?"bi-building":"bi-shop";P=`<span class="text-[9px] font-bold text-gray-600 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200 flex items-center max-w-[110px] truncate leading-none shadow-sm" title="${h(T.name)}"><i class="bi ${E} mr-1 opacity-60"></i> ${h(T.name)}</span>`}const S=encodeURIComponent(JSON.stringify(c)),L=$.selectedIds.has(c.id),N=!!c.recurrenceId?'<i class="bi bi-arrow-repeat text-indigo-600 ml-1 text-sm md:text-base bg-indigo-50 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center shadow-sm" title="Recorrente"></i>':"";return`
        <div class="financial-row bg-white border border-gray-100 md:border-0 md:border-b md:border-gray-100 hover:bg-gray-50 transition-all cursor-pointer relative flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center p-3.5 md:px-6 md:py-4 mb-3 md:mb-0 rounded-2xl md:rounded-none ${L?"ring-2 md:ring-0 ring-indigo-500 bg-indigo-50/50 md:bg-indigo-50/50":""} ${b?"opacity-70 md:opacity-100":""}"
             data-type="${n}"
             data-item="${S}">
            
            <div class="absolute right-3 top-3 md:relative md:right-auto md:top-auto md:col-span-1 flex md:justify-center z-10">
                <input type="checkbox" value="${c.id}" class="item-checkbox w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm bg-white" ${L?"checked":""}>
            </div>

            <div class="md:hidden flex items-start gap-3 w-full pr-6">
                <div class="flex-shrink-0 relative pt-1">
                    ${d}
                </div>
                <div class="flex-1 min-w-0 flex flex-col">
                    <div class="flex justify-between items-center mb-1">
                        <p class="font-bold text-[14px] text-gray-900 truncate leading-tight pr-2 ${b?"line-through text-gray-400":""}">${h(c.description)}</p>
                        <p class="font-black text-[16px] leading-none flex-shrink-0 ${b?"text-gray-400":l}">${ve(c.amount)}</p>
                    </div>
                    <div class="flex justify-between items-end mt-1.5">
                        <div class="flex flex-col gap-1.5 overflow-hidden pr-2">
                            <p class="text-[10px] text-gray-500 font-semibold truncate leading-none"><i class="bi bi-person opacity-60 mr-1"></i>${h(c.entity||"Sem Entidade")}</p>
                            <div class="flex items-center gap-1.5 overflow-hidden mt-1">
                                <span class="text-[9px] font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-lg border border-gray-200 whitespace-nowrap leading-none shadow-sm">
                                    Venc: ${p.full}
                                </span>
                                <span class="text-[9px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 truncate max-w-[100px] leading-none">
                                    ${y}
                                </span>
                                ${P}
                                ${N}
                            </div>
                        </div>
                        <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
                            ${v}
                            ${b?"":`
                            <button data-action="mark-as-paid" data-type="${n}" data-id="${c.id}" class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors shadow-sm" title="Dar Baixa">
                                <i class="bi bi-check2-all text-xs font-bold"></i>
                            </button>
                            `}
                        </div>
                    </div>
                </div>
            </div>

            <div class="hidden md:flex md:col-span-1 flex-col items-center justify-center ${b?"opacity-50":""}">
                <span class="text-base font-black text-gray-900 leading-none">${p.day}</span>
                <span class="text-[9px] font-bold text-gray-500 uppercase leading-none mt-1">${p.month}</span>
            </div>

            <div class="hidden md:flex md:col-span-4 flex-col justify-center min-w-0 pr-4">
                <div class="flex items-center gap-2.5">
                    ${u}
                    <p class="font-bold text-sm text-gray-900 truncate ${b?"line-through text-gray-400":""}">${h(c.description)}</p>
                    ${c.documentNumber?`<span class="text-[9px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-lg border border-gray-200 shadow-sm leading-none flex-shrink-0">NF: ${h(c.documentNumber)}</span>`:""}
                </div>
                <p class="text-xs text-gray-500 font-semibold truncate mt-1.5 pl-7"><i class="bi bi-person opacity-60 mr-1.5"></i>${h(c.entity||"Sem Entidade associada")}</p>
            </div>

            <div class="hidden md:flex md:col-span-2 flex-col justify-center min-w-0 pr-4 gap-1.5">
                <span class="text-[10px] font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200 w-max max-w-full truncate shadow-sm"><i class="bi bi-tag opacity-50 mr-1.5"></i>${y}</span>
                <span class="text-[10px] font-semibold text-gray-500 truncate w-max max-w-full"><i class="bi bi-diagram-3 opacity-50 mr-1.5"></i>${k}</span>
            </div>

            <div class="hidden md:flex md:col-span-1 justify-center items-center">
                ${v}
            </div>

            <div class="hidden md:flex md:col-span-2 justify-end items-center pr-6">
                <p class="font-black text-lg ${b?"text-gray-400":l}">${ve(c.amount)}</p>
            </div>

            <div class="hidden md:flex md:col-span-1 justify-center items-center gap-2 z-20">
                ${b?"":`
                <button data-action="mark-as-paid" data-type="${n}" data-id="${c.id}" class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 border border-emerald-100 transition-colors shadow-sm" title="Dar Baixa">
                    <i class="bi bi-check2-all text-base font-bold"></i>
                </button>
                `}
                <button data-action="delete" data-type="${n}" data-id="${c.id}" class="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 border border-red-100 transition-colors shadow-sm" title="Excluir">
                    <i class="bi bi-trash3 text-sm"></i>
                </button>
            </div>

        </div>
        `}).join("")}async function tc(t,e){const a=new Date().toISOString().split("T")[0];try{await(t==="payable"?Qi(e,a):Ki(e,a)),f("Baixa Realizada","O lançamento foi registado como pago.","success"),await Pe()}catch(s){f("Erro",s.message,"error")}}async function Sr(t,e){if(!!!e.recurrenceId){await Y("Excluir Lançamento","Tem certeza? Essa ação apagará o registo do seu fluxo de caixa.")&&await Er(t,[e.id]);return}ac(t,e)}function ac(t,e){const a=document.getElementById("genericModal"),r=(t==="payable"?$.payables:$.receivables).filter(d=>d.recurrenceId===e.recurrenceId).sort((d,u)=>new Date(d.dueDate)-new Date(u.dueDate));a.className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 p-0 md:p-6",a.innerHTML=`
        <div id="modal-content-wrapper" class="w-full md:max-w-2xl bg-gray-50 md:bg-white flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-0 md:scale-95 md:opacity-0 h-full md:h-auto md:max-h-[90vh] rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl relative" style="font-family: 'Plus Jakarta Sans', 'Nunito', sans-serif;">
            <header class="bg-red-600 border-b border-red-700 px-5 py-4 flex items-center justify-between pt-safe-top md:pt-4 shadow-md z-20 flex-shrink-0 md:rounded-t-3xl">
                <button type="button" data-action="close-modal" class="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/50 text-white hover:bg-red-500 active:scale-90 transition-all">
                    <i class="bi bi-x-lg text-sm"></i>
                </button>
                <h2 class="text-base font-black text-white tracking-tight flex items-center gap-2">
                    <i class="bi bi-trash3-fill"></i> Exclusão em Lote
                </h2>
                <div class="w-10 h-10"></div>
            </header>
            
            <div class="p-4 bg-white md:bg-transparent border-b border-gray-100 flex justify-between items-center z-10 flex-shrink-0">
                <span class="text-xs text-gray-600 font-bold uppercase tracking-wider">Parcelas Conectadas:</span>
                <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 shadow-sm active:scale-95">
                    <input type="checkbox" id="modal-select-all" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4">
                    Marcar Todas
                </label>
            </div>

            <div class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-gray-50 pb-safe md:pb-4">
                ${r.map(d=>{const u=d.id===e.id,c=d.status==="paid",p=vr(d.dueDate);return`
                    <label class="flex items-center gap-4 p-4 bg-white rounded-2xl border ${u?"border-red-400 ring-2 ring-red-100 shadow-md bg-red-50/20":"border-gray-200 shadow-sm"} cursor-pointer transition-all hover:bg-gray-50 active:scale-[0.98]">
                        <input type="checkbox" class="modal-item-checkbox w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" value="${d.id}" ${u?"checked":""}>
                        
                        <div class="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex flex-col items-center justify-center border border-gray-200">
                            <span class="text-base font-black text-gray-800 leading-none">${p.day}</span>
                            <span class="text-[9px] font-bold text-gray-500 uppercase leading-none mt-1.5">${p.month}</span>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-bold text-gray-900 truncate">${h(d.description)}</p>
                            <p class="text-sm font-black text-gray-600 mt-1">${ve(d.amount)} ${c?'<span class="text-emerald-600 font-bold ml-1">(Baixado)</span>':""}</p>
                        </div>
                    </label>
                    `}).join("")}
            </div>

            <div class="p-4 border-t border-gray-200 bg-white md:bg-gray-50 flex-shrink-0 pb-safe md:pb-4 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] md:rounded-b-3xl">
                <button id="confirm-batch-delete" class="w-full py-4 bg-red-600 text-white font-black uppercase tracking-wider rounded-2xl hover:bg-red-700 shadow-lg active:scale-95 transition-all flex justify-center items-center gap-2 text-sm">
                    Excluir Selecionados
                </button>
            </div>
        </div>
    `,a.style.display="flex",requestAnimationFrame(()=>{a.classList.remove("opacity-0");const d=a.querySelector("#modal-content-wrapper");d&&(d.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),d.classList.add("translate-y-0","md:scale-100","md:opacity-100"))});const o=a.querySelector("#modal-select-all"),i=a.querySelectorAll(".modal-item-checkbox"),n=a.querySelector("#confirm-batch-delete");o.addEventListener("change",d=>{i.forEach(u=>u.checked=d.target.checked),l()}),i.forEach(d=>d.addEventListener("change",l));function l(){const d=Array.from(i).filter(u=>u.checked).length;n.innerHTML=d>0?`<i class="bi bi-trash3-fill"></i> Excluir ${d} Parcela(s)`:"Selecione para excluir",n.disabled=d===0,d===0?n.classList.add("opacity-50","bg-gray-400"):n.classList.remove("opacity-50","bg-gray-400")}n.addEventListener("click",async()=>{const d=Array.from(i).filter(c=>c.checked).map(c=>c.value);if(d.length===0)return;At(),await Y("Confirmar Ação",`Tem certeza que deseja apagar estas ${d.length} parcelas permanentemente?`)&&await Er(t,d)}),l()}async function Er(t,e){try{e.length===1?t==="payable"?await Gi(e[0]):await Zi(e[0]):await Mo(t==="payable"?"payables":"receivables",e),f("Sucesso",`${e.length} registo(s) limpo(s) do sistema.`,"success"),$.selectedIds.clear(),Ke(),await Pe()}catch(a){f("Erro",a.message,"error")}}function sc(){const t=document.getElementById("genericModal");t.className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 p-0 md:p-6",t.innerHTML=`
        <div id="modal-content-wrapper" class="w-full md:max-w-md bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 translate-y-full md:translate-y-0 md:scale-95 md:opacity-0" style="font-family: 'Plus Jakarta Sans', 'Nunito', sans-serif;">
            <div class="p-6 text-center relative pb-safe md:pb-6">
                <div class="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 md:hidden"></div>
                <h2 class="text-xl font-black text-gray-900 mb-6">Ajustes Financeiros</h2>
                <div class="space-y-4">
                    <button data-action="manage-natures" class="w-full py-4 px-5 bg-gray-50 text-gray-800 font-bold rounded-2xl active:bg-gray-100 flex items-center justify-between border border-gray-200 transition-colors shadow-sm hover:border-indigo-300">
                        <span class="flex items-center gap-3"><i class="bi bi-tags-fill text-indigo-500 text-lg"></i> Plano de Naturezas</span>
                        <i class="bi bi-chevron-right text-gray-400"></i>
                    </button>
                    <button data-action="manage-cost-centers" class="w-full py-4 px-5 bg-gray-50 text-gray-800 font-bold rounded-2xl active:bg-gray-100 flex items-center justify-between border border-gray-200 transition-colors shadow-sm hover:border-blue-300">
                        <span class="flex items-center gap-3"><i class="bi bi-diagram-3-fill text-blue-500 text-lg"></i> Centros de Custo</span>
                        <i class="bi bi-chevron-right text-gray-400"></i>
                    </button>
                    <button data-action="close-modal" class="w-full py-4 mt-3 bg-gray-900 text-white font-bold rounded-2xl active:scale-95 transition-all shadow-md">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    `,t.style.display="flex",requestAnimationFrame(()=>{t.classList.remove("opacity-0");const e=t.querySelector("#modal-content-wrapper");e&&(e.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),e.classList.add("translate-y-0","md:scale-100","md:opacity-100"))})}function eo(t,e=null){const a=document.getElementById("genericModal"),s=t==="payable",r=s?"red":"emerald",o=e?"Editar Lançamento":"Novo Lançamento",i=(E,I)=>{let D='<option value="">-- Categoria --</option>';const R=Es(E),O=(U,Z=0)=>{const K="  ".repeat(Z)+(Z>0?"↳ ":""),we=U.id===I?"selected":"";D+=`<option value="${U.id}" ${we}>${K}${h(U.name)}</option>`,U.children.forEach(be=>O(be,Z+1))};return R.forEach(U=>O(U)),D},l=[{value:"dinheiro",label:"Dinheiro"},{value:"pix",label:"PIX"},{value:"cartao_credito",label:"Cartão de Crédito"},{value:"cartao_debito",label:"Cartão de Débito"},{value:"transferencia",label:"Transferência Bancária"},{value:"boleto",label:"Boleto"},{value:"outros",label:"Outros"}].map(E=>`<option value="${E.value}" ${e?.paymentMethod===E.value?"selected":""}>${E.label}</option>`).join(""),d=`
        <datalist id="entity-suggestions">
            ${s?$.suppliers.map(E=>`<option value="${h(E.name)}">Fornecedor</option>`).join("")+$.professionals.map(E=>`<option value="${h(E.name)}">Profissional</option>`).join(""):$.clients.map(E=>`<option value="${h(E.name)} ${E.phone?"- "+h(E.phone):""}">Cliente</option>`).join("")}
        </datalist>
    `,u=e?.establishmentId||m.selectedEstablishments&&m.selectedEstablishments[0]||m.establishmentId,c=$.establishments.map(E=>{const I=E.id===u;return`<option value="${E.id}" ${I?"selected":""}>${E.type==="Matriz"?"🏢":"📍"} ${h(E.name)}</option>`}).join("");a.className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 md:p-6",a.innerHTML=`
        ${d}

        <div id="modal-content-wrapper" class="w-full md:max-w-5xl bg-gray-50 flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-0 md:scale-95 md:opacity-0 h-full md:h-auto md:max-h-[90vh] md:rounded-3xl overflow-hidden shadow-2xl relative" style="font-family: 'Plus Jakarta Sans', 'Nunito', sans-serif;">
            
            <header class="bg-${r}-600 border-b border-${r}-700 px-5 py-4 flex items-center justify-between pt-safe-top md:pt-4 shadow-sm z-20 flex-shrink-0 relative overflow-hidden md:rounded-t-3xl">
                <div class="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
                    <svg width="150" height="150" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="white" stroke-width="20"/></svg>
                </div>
                <button type="button" data-action="close-modal" class="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-black/20 active:scale-90 transition-colors z-10 relative">
                    <i class="bi bi-x-lg"></i>
                </button>
                <div class="text-center z-10 relative">
                    <h2 class="text-base font-black text-white tracking-tight leading-tight truncate">${o}</h2>
                    <p class="text-[10px] text-${r}-100 font-bold uppercase tracking-widest mt-0.5">${s?"Registo de Despesa":"Registo de Receita"}</p>
                </div>
                <div class="w-10 h-10"></div>
            </header>
            
            <form id="financial-form" class="flex-1 overflow-y-auto custom-scrollbar pb-safe flex flex-col relative z-0 bg-gray-50">
                <div class="p-0 md:p-6 space-y-0 md:space-y-5">

                    ${e?"":`
                    <div class="bg-gray-200/80 p-1.5 md:rounded-xl flex border-b md:border border-gray-300 shadow-inner" id="mode-switcher">
                        <button type="button" class="mode-btn flex-1 py-2 text-[10px] md:text-xs uppercase tracking-widest font-black rounded-lg shadow-sm bg-white text-gray-900 transition-all" data-mode="single">Único</button>
                        <button type="button" class="mode-btn flex-1 py-2 text-[10px] md:text-xs uppercase tracking-widest font-black rounded-lg text-gray-500 hover:text-gray-900 transition-all" data-mode="installment">Parcelado</button>
                        <button type="button" class="mode-btn flex-1 py-2 text-[10px] md:text-xs uppercase tracking-widest font-black rounded-lg text-gray-500 hover:text-gray-900 transition-all" data-mode="repeat">Recorrente</button>
                    </div>
                    `}

                    <div class="bg-white p-4 md:p-6 md:rounded-3xl border-b md:border border-gray-200 shadow-sm space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-4">
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Unidade de Lançamento</label>
                            <select name="establishmentId" required class="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 focus:bg-white outline-none text-sm font-bold text-gray-800 transition-all shadow-sm cursor-pointer">
                                ${c}
                            </select>
                        </div>

                        <div class="grid grid-cols-2 gap-4 md:col-span-2">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 text-center">Valor Total (R$)</label>
                                <input type="number" step="0.01" name="amount" required 
                                    class="w-full py-3 px-4 border border-gray-200 bg-gray-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none font-black text-xl md:text-2xl text-center text-${r}-600 transition-all shadow-sm" 
                                    value="${e?.amount||""}" placeholder="0,00">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 text-center">Data de Venc.</label>
                                <input type="date" name="dueDate" required 
                                    class="w-full py-3 px-4 border border-gray-200 bg-gray-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none font-bold text-sm md:text-base text-center text-gray-900 transition-all shadow-sm" 
                                    value="${e?.dueDate||new Date().toISOString().split("T")[0]}">
                            </div>
                        </div>
                    </div>

                    <div id="recurrence-options" style="display: none;" class="bg-indigo-50 p-4 md:p-6 md:rounded-3xl border-b md:border border-indigo-100 shadow-inner">
                        <div class="flex flex-col md:flex-row gap-4 items-center">
                            <div class="w-full md:w-auto">
                                <label id="recurrence-label" class="block text-[10px] font-black text-indigo-800 uppercase tracking-widest text-center md:text-left mb-1.5">Quantidade de Meses</label>
                                <div class="flex items-center shadow-sm rounded-xl overflow-hidden border border-indigo-200 w-full md:w-[180px] mx-auto md:mx-0">
                                    <button type="button" id="btn-minus" class="w-12 h-12 bg-white text-indigo-600 active:bg-indigo-100 font-black text-xl transition-colors flex items-center justify-center">-</button>
                                    <input type="number" id="installments-input" name="installments" min="2" max="60" value="2" 
                                        class="w-full h-12 border-x border-indigo-100 text-center font-black text-lg text-indigo-900 outline-none bg-indigo-50/50 appearance-none p-0">
                                    <button type="button" id="btn-plus" class="w-12 h-12 bg-white text-indigo-600 active:bg-indigo-100 font-black text-xl transition-colors flex items-center justify-center">+</button>
                                </div>
                            </div>
                            <div class="text-center md:text-left w-full md:flex-1 mt-2 md:mt-0">
                                <span id="recurrence-summary" class="bg-white px-4 py-3 rounded-xl border border-indigo-100 shadow-sm inline-block w-full">Calculando...</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-4 md:p-6 md:rounded-3xl border-b md:border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Descrição / Título</label>
                            <input type="text" name="description" required 
                                class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none font-bold text-gray-900 text-sm transition-all shadow-sm" 
                                value="${e?.description?h(e.description):""}" placeholder="Ex: Fornecedor de Bebidas...">
                        </div>
                        
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">${s?"Fornecedor / Favorecido":"Cliente / Pagador"}</label>
                            <div class="relative">
                                <i class="bi bi-person absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                                <input type="text" name="entity" list="entity-suggestions" 
                                    class="w-full pl-11 pr-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none font-bold text-sm text-gray-900 transition-all shadow-sm" 
                                    value="${e?.entity?h(e.entity):""}" placeholder="Nome da pessoa ou empresa..." autocomplete="off">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-4 md:p-6 md:rounded-3xl border-b md:border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="grid grid-cols-1 md:col-span-2 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Plano de Natureza</label>
                                <select name="naturezaId" class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none text-sm font-bold text-gray-700 transition-all shadow-sm">
                                    ${i($.natures,e?.naturezaId)}
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Centro de Custo</label>
                                <select name="centroDeCustoId" class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none text-sm font-bold text-gray-700 transition-all shadow-sm">
                                    ${i($.costCenters,e?.centroDeCustoId)}
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 md:col-span-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Nº Documento</label>
                                <input type="text" name="documentNumber" 
                                    class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none text-sm font-bold text-gray-900 transition-all shadow-sm" 
                                    value="${e?.documentNumber?h(e.documentNumber):""}" placeholder="Opcional">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Forma de Pagto.</label>
                                <select name="paymentMethod" class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none text-sm font-bold text-gray-700 transition-all shadow-sm">
                                    <option value="">-- Escolha --</option>
                                    ${l}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-5 md:p-6 md:rounded-3xl border-b md:border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
                        <label class="flex items-center justify-between cursor-pointer group flex-1">
                            <div>
                                <span class="block text-sm md:text-base font-black text-gray-900 uppercase tracking-wide group-active:text-${r}-600 transition-colors">Marcar como ${s?"Pago":"Recebido"}</span>
                                <span class="block text-[9px] md:text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">Confirma a liquidação.</span>
                            </div>
                            <div class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="status" id="status-toggle" class="sr-only peer" ${e?.status==="paid"?"checked":""}>
                                <div class="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-${r}-500 shadow-inner"></div>
                            </div>
                        </label>
                        
                        <div id="payment-date-wrapper" class="${e?.status==="paid"?"":"hidden"} animate-fade-in border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                            <label class="block text-[9px] md:text-[10px] font-black text-${r}-600 uppercase tracking-widest mb-1.5 text-center md:text-left">Data da Baixa Bancária</label>
                            <input type="date" name="paymentDate" 
                                class="w-full py-3 px-4 bg-${r}-50 border-2 border-${r}-200 text-${r}-800 rounded-xl text-sm font-black text-center md:text-left outline-none focus:ring-2 focus:ring-${r}-500/50 shadow-sm transition-all" 
                                value="${e?.paymentDate||new Date().toISOString().split("T")[0]}">
                        </div>
                    </div>
                    
                    <div class="h-2 md:hidden"></div>
                </div>

                <div class="p-4 md:p-5 border-t border-gray-200 bg-white md:bg-gray-50 flex gap-3 flex-shrink-0 z-20 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] md:rounded-b-3xl">
                    ${e?`
                    <button type="button" id="modal-delete-btn" class="w-16 md:w-20 flex-shrink-0 py-3.5 bg-red-50 text-red-600 font-bold rounded-xl active:scale-95 transition-all text-xl flex items-center justify-center border border-red-100 shadow-sm hover:bg-red-100">
                        <i class="bi bi-trash3-fill"></i>
                    </button>`:""}
                    
                    <button type="submit" class="flex-1 py-3.5 bg-${r}-600 text-white font-black uppercase tracking-wider text-sm rounded-xl hover:bg-${r}-700 shadow-lg shadow-${r}-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                        <i class="bi bi-save2-fill text-lg"></i> <span>${e?"Salvar Lançamento":"Confirmar Lançamento"}</span>
                    </button>
                </div>
            </form>
        </div>
    `,a.style.display="flex",requestAnimationFrame(()=>{a.classList.remove("opacity-0");const E=a.querySelector("#modal-content-wrapper");E&&(E.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),E.classList.add("translate-y-0","md:scale-100","md:opacity-100"))});const p=a.querySelector("#financial-form");let b="single",g=2;const v=p.querySelector("#modal-delete-btn");v&&v.addEventListener("click",E=>{E.preventDefault(),navigator.vibrate&&navigator.vibrate(30),At(),setTimeout(()=>Sr(t,e),300)});const y=p.querySelector('[name="amount"]'),k=p.querySelector("#recurrence-options"),T=p.querySelector("#recurrence-summary"),P=p.querySelector("#installments-input"),S=p.querySelector("#status-toggle"),L=p.querySelector("#payment-date-wrapper"),q=p.querySelector('[name="paymentDate"]'),N=()=>{if(b==="single")return;const E=parseFloat(y.value)||0;if(g=parseInt(P.value)||2,E===0){T.innerHTML='<span class="text-[10px] md:text-xs text-indigo-400 font-bold">Digite o valor total...</span>';return}if(b==="installment"){const I=E/g;T.innerHTML=`
                <div>
                    <span class="block text-[8px] md:text-[10px] text-indigo-400 uppercase tracking-widest font-black mb-0.5">Simulação do Parcelamento</span>
                    <span class="font-black text-sm md:text-base text-indigo-700 block leading-tight">${g}x de ${ve(I)}</span>
                    <span class="text-[9px] md:text-[10px] text-indigo-500 font-bold mt-1 block bg-indigo-50/50 p-1 rounded">Total da Dívida: ${ve(E)}</span>
                </div>
            `}else if(b==="repeat"){const I=E*g;T.innerHTML=`
                <div>
                    <span class="block text-[8px] md:text-[10px] text-indigo-400 uppercase tracking-widest font-black mb-0.5">Geração Recorrente Fixa</span>
                    <span class="font-black text-sm md:text-base text-indigo-700 block leading-tight">${g} meses de ${ve(E)}</span>
                    <span class="text-[9px] md:text-[10px] text-indigo-500 font-bold mt-1 block bg-indigo-50/50 p-1 rounded">Comprometimento: ${ve(I)}</span>
                </div>
            `}};p.addEventListener("click",E=>{const I=E.target.closest(".mode-btn");if(I&&!e)if(E.preventDefault(),navigator.vibrate&&navigator.vibrate(15),p.querySelectorAll(".mode-btn").forEach(O=>{O.classList.remove("bg-white","text-gray-900","shadow-sm"),O.classList.add("text-gray-500")}),I.classList.add("bg-white","text-gray-900","shadow-sm"),I.classList.remove("text-gray-500"),b=I.dataset.mode,b==="single")k.style.display="none";else{k.style.display="block";const O=k.querySelector("#recurrence-label");O&&(O.textContent=b==="installment"?"Número de Parcelas":"Repetir por quantos meses?"),N()}if(E.target.closest("#btn-minus")&&P){E.preventDefault(),navigator.vibrate&&navigator.vibrate(10);let O=parseInt(P.value)||2;O>2&&(P.value=O-1,N())}if(E.target.closest("#btn-plus")&&P){E.preventDefault(),navigator.vibrate&&navigator.vibrate(10);let O=parseInt(P.value)||2;O<60&&(P.value=O+1,N())}}),y.addEventListener("input",N),P&&P.addEventListener("input",N),S.addEventListener("change",()=>{navigator.vibrate&&navigator.vibrate(20),S.checked?(L.classList.remove("hidden"),q.required=!0):(L.classList.add("hidden"),q.required=!1)}),p.addEventListener("submit",async E=>{E.preventDefault();const I=p.querySelector('button[type="submit"]'),D=I.innerHTML;I.disabled=!0,I.innerHTML='<div class="loader mx-auto h-5 w-5 border-2 border-white border-t-transparent"></div>';const R=new FormData(p),O=S.checked,U=parseFloat(R.get("amount"));let Z=U,K=1;!e&&b!=="single"&&(K=parseInt(R.get("installments")),b==="repeat"&&(Z=U*K));const we=R.get("establishmentId");if(!we){f("Atenção","Selecione uma Unidade válida para o lançamento.","warning"),I.disabled=!1,I.innerHTML=D;return}const be={companyId:m.companyId,establishmentId:we,description:R.get("description"),amount:Z,dueDate:R.get("dueDate"),naturezaId:R.get("naturezaId")||null,centroDeCustoId:R.get("centroDeCustoId")||null,entity:R.get("entity")||null,paymentMethod:R.get("paymentMethod")||null,documentNumber:R.get("documentNumber")||null,notes:R.get("notes"),status:O?"paid":"pending",paymentDate:O?R.get("paymentDate"):null,installments:K};K>1&&!e&&(be.recurrenceId=self.crypto.randomUUID());try{e?(await(s?Ji(e.id,be):Xi(e.id,be)),f("Sucesso","Atualizado com sucesso!","success")):(await(s?qo(be):Yi(be)),f("Sucesso","Lançamento criado!","success")),At(),Pe()}catch(F){f("Erro",F.message||"Erro ao salvar","error"),I.disabled=!1,I.innerHTML=D}})}const oc=t=>C("/api/commissions/calculate",{method:"POST",body:JSON.stringify(t)}),rc=t=>C("/api/commissions/save",{method:"POST",body:JSON.stringify(t)}),ic=(t,e)=>{const a=new URLSearchParams({startDate:t,endDate:e}).toString();return C(`/api/commissions/stats?${a}`)},nc=(t={})=>{Object.keys(t).forEach(s=>(t[s]===void 0||t[s]===null||t[s]==="")&&delete t[s]);const e=new URLSearchParams(t).toString(),a=`/api/commissions/history${e?"?"+e:""}`;return C(a)},Ir=t=>C(`/api/commissions/report/${t}`,{method:"DELETE"}),pa=new Date,lc=new Date(pa.getFullYear(),pa.getMonth(),1);let j={professionals:[],reports:[],calculationResult:null,periodString:"",establishmentConfig:null,selectedIds:new Set,isAdvancedFilterOpen:!1,startDate:lc.toISOString().split("T")[0],endDate:new Date(pa.getFullYear(),pa.getMonth()+1,0).toISOString().split("T")[0],professionalId:"all",searchQuery:"",stats:{revenue:0,commissions:0,margin:0,netPaid:0},viewMode:"list"},Qt=null;const dc=document.getElementById("content");function Ct(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function cc(t){return t?new Date(t).toLocaleDateString("pt-BR"):"--/--/----"}function ba(t){if(!t)return"PR";const e=t.trim().split(" ");return e.length>=2?(e[0][0]+e[e.length-1][0]).toUpperCase():t.substring(0,2).toUpperCase()}function Lr(){const t=document.getElementById("commissions-layout-main"),e=document.getElementById("commissions-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&(t.style.display="none"),e&&(e.classList.remove("hidden"),e.classList.add("flex")),a&&window.innerWidth<768&&(a.style.display="none")}function Is(){const t=document.getElementById("commissions-layout-main"),e=document.getElementById("commissions-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&(t.style.display="flex"),e&&(e.classList.add("hidden"),e.classList.remove("flex")),a&&window.innerWidth<768&&(a.style.display=""),j.viewMode="list"}async function uc(){try{const[t,e]=await Promise.all([Ee(m.establishmentId),je(m.establishmentId).catch(()=>({}))]);j.professionals=t,j.establishmentConfig=e||{}}catch(t){console.error("Erro na inicialização de comissões",t)}j.viewMode="list",pc(),mc(),await dt()}function pc(){const t=j.professionals.map(e=>`<option value="${e.id}">${e.name}</option>`).join("");dc.innerHTML=`
        <style>
            #toast-container, .toast-notification, .modal, .modal-backdrop { z-index: 9999999 !important; }
        </style>
        
        <section id="commissions-layout-main" class="h-[calc(100vh-80px)] md:h-auto flex flex-col p-0 md:p-4 md:pl-6 w-full relative bg-slate-50 overflow-hidden" style="font-family: 'Plus Jakarta Sans', 'Nunito', sans-serif;">
            
            <div id="batch-action-bar" class="hidden fixed top-20 left-4 right-4 md:absolute md:top-4 z-50 bg-gray-900 text-white rounded-2xl shadow-2xl p-4 items-center justify-between animate-fade-in-down">
                <div class="flex items-center gap-3">
                    <button id="cancel-selection-btn" class="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <span class="font-bold text-base tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Selecionados</span>
                </div>
                <button id="batch-delete-btn" class="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg text-sm">
                    <i class="bi bi-trash3"></i> Excluir
                </button>
            </div>

            <div class="flex-shrink-0 z-30 bg-slate-50 pt-safe-top sticky top-0 md:static border-b border-gray-200 md:border-0 w-full max-w-7xl mx-auto">
                <div class="bg-white md:bg-transparent px-4 py-3 flex justify-between items-center md:pb-5">
                    <h1 class="text-xl md:hidden font-extrabold text-slate-800 tracking-tight truncate">Comissões</h1>
                    
                    <div class="flex items-center gap-3 ml-auto">
                        <button data-action="new-calculation" class="py-2.5 px-4 md:px-5 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all text-sm flex items-center gap-2">
                            <i class="bi bi-calculator"></i> <span class="hidden md:inline">Nova Apuração</span><span class="md:hidden">Apurar</span>
                        </button>
                        <button id="export-excel-btn" class="py-2.5 px-4 bg-white border border-gray-200 text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition shadow-sm flex items-center gap-2 text-sm" title="Exportar Excel">
                            <i class="bi bi-file-earmark-excel-fill text-lg"></i> <span class="hidden md:inline">Exportar</span>
                        </button>
                    </div>
                </div>

                <div class="px-4 py-3 md:py-0 md:mb-5 bg-slate-50">
                    <div id="kpi-section" class="flex md:grid md:grid-cols-4 overflow-x-auto gap-3 md:gap-5 snap-x hide-scrollbar"></div>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar w-full relative z-0 pb-[100px] md:pb-6" id="scrollable-content">
                
                <div class="px-4 py-3 flex flex-col gap-4 max-w-7xl mx-auto">
                    
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div class="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 md:pb-0 w-full md:w-auto">
                            <button class="date-preset-btn px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-xl whitespace-nowrap shadow-sm active:scale-95 transition-all" data-preset="month">Este Mês</button>
                            <button class="date-preset-btn px-4 py-2 bg-white text-gray-600 text-sm font-bold rounded-xl whitespace-nowrap shadow-sm hover:bg-gray-50 active:scale-95 transition-all" data-preset="last_month">Mês Passado</button>
                            <button id="custom-date-btn" class="px-4 py-2 bg-white text-gray-600 text-sm font-bold rounded-xl whitespace-nowrap shadow-sm hover:bg-gray-50 active:scale-95 transition-all flex items-center gap-2"><i class="bi bi-calendar-event"></i> Customizado</button>
                        </div>
                        
                        <div class="relative w-full md:w-80">
                            <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                            <input type="text" id="search-input" value="${j.searchQuery}" placeholder="Buscar relatórios..." class="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 shadow-sm rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                        </div>
                    </div>

                    <div id="filter-panel" class="hidden animate-fade-in-down">
                        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                            <div class="grid grid-cols-2 gap-4 flex-1">
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Inicial</label>
                                    <input type="date" id="filter-start" value="${j.startDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Final</label>
                                    <input type="date" id="filter-end" value="${j.endDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                </div>
                            </div>
                            <div class="flex-1">
                                <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Profissional</label>
                                <select id="filter-prof" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option value="all">Todos Profissionais</option>
                                    ${t}
                                </select>
                            </div>
                            <div class="flex items-end gap-2 md:w-auto mt-2 md:mt-0">
                                <button data-action="apply-filters" class="flex-1 md:w-auto py-2.5 px-6 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
                                    <i class="bi bi-check2"></i> Aplicar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="hidden md:grid grid-cols-12 gap-4 px-6 py-4 text-xs font-bold text-gray-500 tracking-wide items-center bg-white border border-gray-100 sticky top-0 z-20 shadow-sm mx-4 mt-4 rounded-t-2xl max-w-7xl md:mx-auto">
                    <div class="col-span-3 flex items-center gap-2">
                        <input type="checkbox" id="select-all-toggle" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                        Profissional
                    </div>
                    <div class="col-span-2">Período de Ref.</div>
                    <div class="col-span-2 text-right">Bruto (R$)</div>
                    <div class="col-span-2 text-right">Ajustes (R$)</div>
                    <div class="col-span-2 text-right text-emerald-600">Líquido Pago</div>
                    <div class="col-span-1 text-center">Ações</div>
                </div>

                <div class="px-4 md:px-0 pb-6 w-full max-w-7xl md:mx-auto">
                    <div id="list-container" class="flex flex-col w-full md:bg-white md:border-x md:border-b md:border-gray-100 md:shadow-sm md:rounded-b-2xl">
                        <div class="flex justify-center py-20"><div class="loader mx-auto"></div></div>
                    </div>
                </div>
            </div>
        </section>

        <div id="commissions-layout-detail" class="hidden fixed inset-0 z-[99999] bg-gray-50 flex-col overflow-hidden w-full h-[100dvh]">
        </div>
    `}async function dt(){const t=document.getElementById("list-container");t&&(t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-sm">Carregando comissões...</p></div>');const a=(m.selectedEstablishments&&m.selectedEstablishments.length>0?m.selectedEstablishments:[m.establishmentId]).join(",");try{const[s,r]=await Promise.all([nc({startDate:j.startDate,endDate:j.endDate,professionalId:j.professionalId,establishmentId:a}),ic(j.startDate,j.endDate,a)]);j.reports=s||[];const o=j.reports.reduce((i,n)=>i+(n.summary.finalValue||n.summary.totalCommission),0);j.stats={revenue:r.totalRevenue||0,commissions:r.totalCommissionsPaid||0,margin:r.totalRevenue>0?((r.totalRevenue-r.totalCommissionsPaid)/r.totalRevenue*100).toFixed(1):0,netPaid:o},j.selectedIds.clear(),Dt(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),bc(),Cr()}catch(s){console.error(s),t&&(t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-sm font-medium">Erro ao carregar dados.</p>
            </div>`)}}function bc(){const t=document.getElementById("kpi-section");t&&(t.innerHTML=`
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-50 flex items-center justify-center">
                    <i class="bi bi-graph-up-arrow text-indigo-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Faturamento<br class="md:hidden"/> Bruto</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-gray-900">${Ct(j.stats.revenue)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-amber-50 flex items-center justify-center">
                    <i class="bi bi-wallet2 text-amber-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Comissões<br class="md:hidden"/> Pagas</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-amber-600">${Ct(j.stats.commissions)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-50 flex items-center justify-center">
                    <i class="bi bi-pie-chart-fill text-blue-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Retenção<br class="md:hidden"/> Líquida</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-blue-600">${j.stats.margin}%</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                    <i class="bi bi-cash-stack text-emerald-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Líquido<br class="md:hidden"/> Pago</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-emerald-600">${Ct(j.stats.netPaid)}</span>
        </div>
    `)}function Cr(){const t=document.getElementById("list-container");if(!t)return;let e=j.reports;if(j.searchQuery){const a=j.searchQuery.toLowerCase();e=e.filter(s=>s.professionalName.toLowerCase().includes(a)||s.period.toLowerCase().includes(a))}if(e.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white md:bg-transparent text-center rounded-b-2xl">
                <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                    <i class="bi bi-receipt text-4xl text-gray-300"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-1">Nenhum pagamento</h3>
                <p class="text-sm font-medium text-gray-400 max-w-xs px-4">Não há relatórios gerados para este período ou profissional.</p>
            </div>
        `;return}t.innerHTML=e.map(a=>{const s=cc(a.createdAt),r=a.summary.totalCommission,o=a.summary.extraDebit||0,i=a.summary.extraCredit||0,n=a.summary.finalValue||r,l=j.selectedIds.has(a.id);let d="";return o>0&&i>0?d=`<span class="text-red-500">-R$${o.toFixed(2)}</span> / <span class="text-emerald-500">+R$${i.toFixed(2)}</span>`:o>0?d=`<span class="text-red-500">-R$ ${o.toFixed(2)}</span>`:i>0?d=`<span class="text-emerald-500">+R$ ${i.toFixed(2)}</span>`:d='<span class="text-gray-300">--</span>',`
        <div class="bg-white border border-gray-100 md:border-0 md:border-b md:border-gray-100 hover:bg-gray-50 transition-all cursor-pointer relative flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center p-4 md:px-6 md:py-4 mb-3 md:mb-0 rounded-2xl md:rounded-none ${l?"ring-2 md:ring-0 ring-indigo-500 bg-indigo-50/50 md:bg-indigo-50/50":""}">
            
            <div class="absolute right-3 top-3 md:relative md:right-auto md:top-auto md:col-span-3 md:flex md:items-center md:gap-3 z-10">
                <input type="checkbox" value="${a.id}" class="item-checkbox w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm bg-white" ${l?"checked":""}>
                
                <div class="hidden md:flex items-center gap-3 pr-2">
                    <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm border border-indigo-200">
                        ${ba(a.professionalName)}
                    </div>
                    <div class="min-w-0">
                        <p class="font-bold text-sm text-gray-900 truncate" title="${a.professionalName}">${a.professionalName}</p>
                        <p class="text-[10px] text-gray-500 font-medium truncate mt-0.5">Gerado: ${s}</p>
                    </div>
                </div>
            </div>

            <div class="md:hidden flex items-center gap-3 w-full pr-8 mb-3">
                <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm border border-indigo-200">
                    ${ba(a.professionalName)}
                </div>
                <div class="min-w-0">
                    <p class="font-bold text-sm text-gray-900 truncate">${a.professionalName}</p>
                    <p class="text-xs text-gray-500 font-medium truncate mt-0.5">Gerado: ${s}</p>
                </div>
            </div>

            <div class="md:col-span-2 flex flex-col justify-center mb-2 md:mb-0 md:pl-0">
                <span class="md:hidden text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Período de Ref.</span>
                <span class="text-[10px] font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-lg border border-gray-200 shadow-sm w-max max-w-full truncate">
                    <i class="bi bi-calendar3 opacity-50 mr-1.5"></i> ${a.period}
                </span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-1.5 md:mb-0">
                <span class="md:hidden text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bruto:</span>
                <span class="text-sm font-bold text-gray-700">${Ct(r)}</span>
            </div>
            
            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-2 md:mb-0">
                <span class="md:hidden text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ajustes:</span>
                <span class="text-xs font-bold">${d}</span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block pt-2 md:pt-0 border-t md:border-0 border-gray-100 mt-2 md:mt-0">
                <span class="md:hidden text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Líquido Pago:</span>
                <span class="text-base font-black text-emerald-600">${Ct(n)}</span>
            </div>

            <div class="md:col-span-1 flex justify-end gap-2 mt-3 md:mt-0 z-20">
                <button data-action="view-report-details" data-id="${a.id}" class="w-9 h-9 rounded-xl flex items-center justify-center text-indigo-500 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-colors shadow-sm" title="Ver Detalhes">
                    <i class="bi bi-eye text-base"></i>
                </button>
                <button data-action="print-receipt" data-id="${a.id}" class="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors shadow-sm" title="Imprimir Recibo">
                    <i class="bi bi-printer text-base"></i>
                </button>
            </div>
        </div>
        `}).join("")}function mc(){Qt&&document.body.removeEventListener("click",Qt),Qt=o=>{const i=o.target;if(i.classList.contains("item-checkbox")){const l=i.value;i.checked?j.selectedIds.add(l):j.selectedIds.delete(l),Dt(),o.stopPropagation();return}const n=i.closest("button[data-action]");if(n){o.preventDefault();const l=n.dataset.action,d=n.dataset.id;switch(l){case"apply-filters":j.startDate=document.getElementById("filter-start").value,j.endDate=document.getElementById("filter-end").value,j.professionalId=document.getElementById("filter-prof").value,document.getElementById("custom-date-btn")?.click(),dt();break;case"new-calculation":gc();break;case"print-receipt":$c(d);break;case"delete-report":Ec(d);break;case"view-report-details":wc(d);break;case"close-detail-screen":Is();break;case"toggle-all-profs":const u=document.querySelectorAll(".prof-checkbox"),c=Array.from(u).every(v=>v.checked);u.forEach(v=>v.checked=!c);break;case"calculate-preview":fc();break;case"save-final-reports":yc();break;case"toggle-preview-details":const p=n.dataset.idx,b=document.getElementById(`preview-details-${p}`),g=n.querySelector("i");b&&(b.classList.contains("hidden")?(b.classList.remove("hidden"),g&&g.classList.replace("bi-chevron-down","bi-chevron-up")):(b.classList.add("hidden"),g&&g.classList.replace("bi-chevron-up","bi-chevron-down")));break}}},document.body.addEventListener("click",Qt);const t=document.getElementById("search-input");t&&t.addEventListener("input",o=>{j.searchQuery=o.target.value,Cr()}),document.body.addEventListener("input",o=>{(o.target.classList.contains("input-debit")||o.target.classList.contains("input-credit")||o.target.classList.contains("input-notes"))&&hc(o.target.dataset.idx)});const e=document.getElementById("select-all-toggle");e&&e.addEventListener("change",o=>{const i=o.target.checked,n=document.querySelectorAll(".item-checkbox");j.selectedIds.clear(),n.forEach(l=>{l.checked=i,i&&j.selectedIds.add(l.value)}),Dt()});const a=document.getElementById("cancel-selection-btn");a&&a.addEventListener("click",()=>{j.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(o=>o.checked=!1),Dt()});const s=document.getElementById("batch-delete-btn");s&&s.addEventListener("click",Sc);const r=document.getElementById("export-excel-btn");r&&r.addEventListener("click",kc),document.getElementById("custom-date-btn")?.addEventListener("click",()=>{const o=document.getElementById("filter-panel"),i=document.getElementById("custom-date-btn");j.isAdvancedFilterOpen=!j.isAdvancedFilterOpen,j.isAdvancedFilterOpen?(o.classList.remove("hidden"),i.classList.add("bg-gray-900","text-white","border-gray-900"),i.classList.remove("bg-white","text-gray-600","border-gray-200")):(o.classList.add("hidden"),i.classList.remove("bg-gray-900","text-white","border-gray-900"),i.classList.add("bg-white","text-gray-600","border-gray-200"))}),document.querySelectorAll(".date-preset-btn").forEach(o=>{o.addEventListener("click",i=>{navigator.vibrate&&navigator.vibrate(15),document.querySelectorAll(".date-preset-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),i.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),i.target.classList.remove("bg-white","text-gray-600","border-gray-200");const n=i.target.dataset.preset,l=new Date;let d,u;n==="month"?(d=new Date(l.getFullYear(),l.getMonth(),1),u=new Date(l.getFullYear(),l.getMonth()+1,0)):n==="last_month"&&(d=new Date(l.getFullYear(),l.getMonth()-1,1),u=new Date(l.getFullYear(),l.getMonth(),0)),document.getElementById("filter-start").value=d.toISOString().split("T")[0],document.getElementById("filter-end").value=u.toISOString().split("T")[0],j.startDate=d.toISOString().split("T")[0],j.endDate=u.toISOString().split("T")[0],dt()})})}function Dt(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=j.selectedIds.size;e&&(e.textContent=a),t&&(a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function gc(){j.viewMode="new-calc";const t=document.getElementById("commissions-layout-detail");if(!t)return;const e=new Date().toISOString().split("T")[0],a=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],s=j.professionals.map(o=>`
        <label class="flex items-center p-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-indigo-300 transition-all cursor-pointer group mb-1.5">
            <input type="checkbox" value="${o.id}" class="prof-checkbox w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
            <div class="ml-3 flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg border border-gray-100 bg-gray-50 text-gray-500 flex items-center justify-center text-[10px] font-black group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shadow-sm">${ba(o.name)}</div>
                <span class="font-bold text-sm text-gray-800">${o.name}</span>
            </div>
        </label>`).join(""),r=`
        <div class="p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner transition-transform active:scale-95">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <h3 class="font-black text-base text-gray-800 ml-4 uppercase tracking-wider">Nova Apuração</h3>
        </div>
    `;t.innerHTML=`
        ${r}
        <div id="calc-flow-container" class="flex flex-col flex-1 overflow-hidden relative max-w-4xl mx-auto w-full md:mt-6 md:rounded-3xl md:border md:border-gray-200 md:shadow-2xl md:bg-white md:max-h-[85vh]">
            
            <div id="calc-step-1" class="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 custom-scrollbar bg-gray-50/50 md:bg-transparent pb-28 md:pb-8">
                <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                    <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><i class="bi bi-calendar-range text-indigo-500"></i> Período</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Início</label>
                            <input type="date" id="calc-start-date" value="${a}" class="w-full mt-1.5 p-3.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner transition-shadow">
                        </div>
                        <div>
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fim</label>
                            <input type="date" id="calc-end-date" value="${e}" class="w-full mt-1.5 p-3.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner transition-shadow">
                        </div>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                    <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><i class="bi bi-tags text-indigo-500"></i> Considerar nas vendas</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <label class="flex items-center justify-center p-3.5 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:bg-white transition-colors active:scale-95 shadow-sm">
                            <input type="checkbox" id="calc-type-services" checked class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                            <span class="ml-2 text-sm font-bold text-gray-700 uppercase tracking-wider">Serviços</span>
                        </label>
                        <label class="flex items-center justify-center p-3.5 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:bg-white transition-colors active:scale-95 shadow-sm">
                            <input type="checkbox" id="calc-type-products" checked class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                            <span class="ml-2 text-sm font-bold text-gray-700 uppercase tracking-wider">Produtos</span>
                        </label>
                        <label class="flex items-center justify-center p-3.5 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:bg-white transition-colors active:scale-95 shadow-sm">
                            <input type="checkbox" id="calc-type-packages" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                            <span class="ml-2 text-sm font-bold text-gray-700 uppercase tracking-wider">Pacotes</span>
                        </label>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-sm font-bold text-gray-800 flex items-center gap-2"><i class="bi bi-people text-indigo-500"></i> Equipe</h3>
                        <button type="button" data-action="toggle-all-profs" class="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors shadow-sm active:scale-95">Inverter Sel.</button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                        ${s}
                    </div>
                </div>
            </div>

            <div id="calc-step-2" class="hidden flex-1 overflow-y-auto p-4 md:p-8 space-y-4 custom-scrollbar bg-gray-50/50 md:bg-transparent pb-28 md:pb-8"></div>

            <footer class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white flex justify-end gap-3 z-50 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)]">
                <button type="button" data-action="close-detail-screen" class="hidden md:block py-3.5 px-6 bg-white border border-gray-300 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-sm uppercase tracking-wider">Cancelar</button>
                <button type="button" data-action="calculate-preview" id="btn-calc-action" class="w-full md:w-auto py-3.5 px-8 bg-indigo-600 text-white font-black text-sm rounded-xl hover:bg-indigo-700 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider">
                    <i class="bi bi-calculator text-lg"></i> Calcular Vendas
                </button>
            </footer>
        </div>
    `,Lr()}async function fc(){const t=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(u=>u.value);if(t.length===0)return f("Atenção","Selecione pelo menos um profissional.","warning");const a=(m.selectedEstablishments&&m.selectedEstablishments.length>0?m.selectedEstablishments:[m.establishmentId]).join(","),s=document.getElementById("calc-start-date"),r=document.getElementById("calc-end-date");if(!s||!r||!s.value||!r.value)return f("Atenção","As datas de início e fim são obrigatórias.","warning");const o={professionalIds:t,startDate:s.value,endDate:r.value,establishmentId:a,calculationTypes:{services:document.getElementById("calc-type-services")?.checked||!1,products:document.getElementById("calc-type-products")?.checked||!1,packages:document.getElementById("calc-type-packages")?.checked||!1}},i=new Date(o.startDate+"T00:00:00").toLocaleDateString("pt-BR"),n=new Date(o.endDate+"T00:00:00").toLocaleDateString("pt-BR");j.periodString=`${i} a ${n}`;const l=document.getElementById("btn-calc-action"),d=l.innerHTML;l.innerHTML='<div class="loader-small border-white mr-2"></div> Processando...',l.disabled=!0;try{const u=await oc(o);j.calculationResult=u.map(c=>({...c,extraDebit:0,extraCredit:0,finalValue:c.summary.totalCommission,notes:""})),xc()}catch(u){f("Erro na Apuração",u.message,"error"),l.innerHTML=d,l.disabled=!1}}function xc(){j.viewMode="preview-calc";const t=j.calculationResult;if(!t||t.length===0||t.every(i=>i.summary.totalCommission===0)){f("Aviso","Nenhuma comissão encontrada para os filtros selecionados.","info");const i=document.getElementById("btn-calc-action");i.innerHTML='<i class="bi bi-calculator text-lg"></i> Calcular Vendas',i.disabled=!1;return}const e=document.getElementById("calc-step-1"),a=document.getElementById("calc-step-2"),s=document.getElementById("btn-calc-action");e&&e.classList.add("hidden"),a&&a.classList.remove("hidden"),s&&(s.dataset.action="save-final-reports",s.className="w-full md:w-auto py-3.5 px-8 bg-emerald-600 text-white font-black text-sm rounded-xl hover:bg-emerald-700 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider",s.innerHTML='<i class="bi bi-check2-circle text-lg"></i> Confirmar Pagtos.',s.disabled=!1);const r=t.reduce((i,n)=>i+n.finalValue,0),o=t.map((i,n)=>{if(i.summary.totalCommission===0)return"";const l=(i.items||[]).map(u=>`
            <tr class="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td class="py-2.5 truncate max-w-[120px] text-gray-800 font-bold" title="${u.item}">${u.item}</td>
                <td class="py-2.5 text-gray-500 font-medium">${u.client||"--"}</td>
                <td class="py-2.5 text-right text-gray-600 font-bold">R$ ${(u.value||0).toFixed(2)}</td>
                <td class="py-2.5 text-center text-gray-600 font-bold">${u.commissionRate}%</td>
                <td class="py-2.5 text-right font-black text-emerald-600">R$ ${(u.commissionValue||0).toFixed(2)}</td>
            </tr>
        `).join(""),d=`
            <div id="preview-details-${n}" class="hidden mt-4 pt-4 border-t border-gray-100">
                <h5 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Itens Processados</h5>
                <div class="overflow-x-auto border border-gray-200 rounded-xl shadow-sm custom-scrollbar">
                    <table class="w-full text-left text-xs whitespace-nowrap">
                        <thead class="text-gray-500 bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px]">Serviço/Produto</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px]">Cliente</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px] text-right">Base</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px] text-center">%</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px] text-right">Comissão</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">${l||'<tr><td colspan="5" class="py-4 text-center text-gray-400">Nenhum item</td></tr>'}</tbody>
                    </table>
                </div>
            </div>
        `;return`
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 mb-4 relative overflow-hidden">
            <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500"></div>
            
            <div class="flex justify-between items-start mb-5 border-b border-gray-100 pb-4 pl-3">
                <div>
                    <h4 class="font-black text-gray-800 text-base uppercase tracking-wider">${i.professionalName}</h4>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">${i.summary.totalItems} itens calculados</p>
                </div>
                <div class="text-right bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 shadow-inner">
                    <p class="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Valor Bruto</p>
                    <p class="font-black text-gray-800 text-base md:text-lg leading-none">R$ ${i.summary.totalCommission.toFixed(2)}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pl-3 mb-4">
                <div>
                    <label class="text-[10px] font-bold text-red-500 uppercase tracking-widest block mb-1.5"><i class="bi bi-dash-circle mr-1"></i>Descontos/Vales</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400 font-black text-sm">R$</span>
                        <input type="number" step="0.01" data-idx="${n}" class="input-debit w-full pl-10 p-3 border border-red-200 rounded-xl bg-white shadow-inner font-black text-base text-red-600 outline-none focus:ring-2 focus:ring-red-500" placeholder="0.00">
                    </div>
                </div>
                <div>
                    <label class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1.5"><i class="bi bi-plus-circle mr-1"></i>Bônus Extras</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 font-black text-sm">R$</span>
                        <input type="number" step="0.01" data-idx="${n}" class="input-credit w-full pl-10 p-3 border border-emerald-200 rounded-xl bg-white shadow-inner font-black text-base text-emerald-600 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="0.00">
                    </div>
                </div>
            </div>

            <div class="pl-3 mb-5">
                <input type="text" data-idx="${n}" class="input-notes w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-gray-700 shadow-inner" placeholder="Motivo dos ajustes (Opcional)">
            </div>
            
            <div class="flex justify-between items-center bg-indigo-50 border border-indigo-200 p-4 rounded-xl pl-5 ml-3 shadow-sm">
                <span class="text-[10px] md:text-xs font-bold text-indigo-700 uppercase tracking-widest">Líquido a Pagar</span>
                <span class="text-2xl font-black text-indigo-800 final-value-display drop-shadow-sm" data-idx="${n}">R$ ${i.finalValue.toFixed(2)}</span>
            </div>

            <div class="pl-3 mt-5 border-t border-gray-50 pt-4">
                <button type="button" data-action="toggle-preview-details" data-idx="${n}" class="text-[10px] md:text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-widest flex items-center gap-1.5 transition-colors bg-indigo-50 px-4 py-2.5 rounded-xl border border-indigo-100 shadow-sm">
                    <i class="bi bi-list-check text-sm"></i> Detalhar Itens <i class="bi bi-chevron-down ml-1"></i>
                </button>
                ${d}
            </div>
        </div>
        `}).join("");a&&(a.innerHTML=`
        <div class="bg-gradient-to-r from-indigo-700 to-indigo-800 p-5 rounded-2xl shadow-lg text-white mb-6 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden border border-indigo-600 gap-4">
            <div class="absolute right-[-10px] top-[-10px] opacity-10"><i class="bi bi-cash-coin text-9xl"></i></div>
            <div class="bg-indigo-900/40 p-4 px-5 rounded-xl backdrop-blur-sm border border-indigo-400/30 z-10 w-full md:w-auto">
                <span class="block text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1.5">Soma Total Equipe</span>
                <span id="grand-total-preview" class="text-3xl font-black drop-shadow-md">R$ ${r.toFixed(2)}</span>
            </div>
            <div class="text-left md:text-right z-10 flex flex-col items-start md:items-end w-full md:w-auto">
                <span class="block text-[9px] font-bold text-indigo-200 uppercase tracking-widest mb-1.5">Período Selecionado</span>
                <span class="text-xs font-black bg-white/20 px-3 py-2 rounded-xl border border-white/30 shadow-sm flex items-center gap-2"><i class="bi bi-calendar3"></i> ${j.periodString}</span>
            </div>
        </div>
        ${o}
    `)}function hc(t){const e=document.querySelector(`.input-debit[data-idx="${t}"]`),a=document.querySelector(`.input-credit[data-idx="${t}"]`),s=document.querySelector(`.input-notes[data-idx="${t}"]`);let r=parseFloat(e?.value)||0,o=parseFloat(a?.value)||0,i=s?.value||"";if(j.calculationResult&&j.calculationResult[t]){const n=j.calculationResult[t];n.extraDebit=r,n.extraCredit=o,n.notes=i,n.finalValue=n.summary.totalCommission-r+o;const l=document.querySelector(`.final-value-display[data-idx="${t}"]`);l&&(l.innerText=`R$ ${n.finalValue.toFixed(2)}`),vc()}}function vc(){const t=j.calculationResult.reduce((a,s)=>a+s.finalValue,0),e=document.getElementById("grand-total-preview");e&&(e.innerText=`R$ ${t.toFixed(2)}`)}async function yc(){const t=j.calculationResult.filter(r=>r.summary.totalCommission>0),e=t.length;if(e===0)return f("Aviso","Não há valores para pagar.","info");if(!await Y("Confirmar Pagamentos",`Você está prestes a gerar recibos e marcar as vendas de ${e} profissional(is) como PAGAS. Essa ação lançará a despesa correspondente no Financeiro. Confirmar?`))return;const s=document.getElementById("btn-calc-action");s.innerHTML='<div class="loader-small border-white mr-2"></div> Finalizando...',s.disabled=!0;try{const r=t.map(async o=>{const i=(o.items||[]).map(n=>n.originalSaleId).filter(n=>n!=null);await rc({professionalId:o.professionalId,professionalName:o.professionalName,period:j.periodString,processedSalesIds:i,establishmentId:m.establishmentId,reportData:{...o,summary:{...o.summary,finalValue:o.finalValue,extraDebit:o.extraDebit||0,extraCredit:o.extraCredit||0,notes:o.notes||""}}});try{if(o.finalValue>0){const n=j.establishmentConfig||{},l=n.defaultDespesaNaturezaId||n.financeConfig?.despesaNaturezaId||null,d=n.defaultDespesaCentroCustoId||n.financeConfig?.despesaCentroCustoId||null;await qo({establishmentId:m.establishmentId,description:`Comissões - ${o.period}`,amount:o.finalValue,dueDate:new Date().toISOString().split("T")[0],naturezaId:l,centroDeCustoId:d,entity:o.professionalName,paymentMethod:"dinheiro",status:"paid",paymentDate:new Date().toISOString().split("T")[0],origin:"commission"})}}catch(n){console.error("Erro ao integrar com financeiro (Despesa):",n)}});await Promise.all(r),f("Sucesso","Pagamentos registrados e integrados ao financeiro!","success"),j.calculationResult=null,Is(),await dt()}catch(r){f("Erro ao Salvar",r.message,"error"),s.innerHTML='<i class="bi bi-check2-circle text-lg"></i> Confirmar Pagtos.',s.disabled=!1}}function wc(t){j.viewMode="report-details";const e=document.getElementById("commissions-layout-detail");if(!e)return;const a=j.reports.find(c=>c.id===t);if(!a)return;const s=a.reportData?.items||a.items||[],r=a.summary,o=r.extraDebit||0,i=r.extraCredit||0,n=r.notes||"",l=`
        <div class="p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50 md:rounded-t-3xl">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner transition-transform active:scale-95">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <h3 class="font-black text-base text-gray-800 ml-4 uppercase tracking-wider">Detalhes do Recibo</h3>
        </div>
    `,d=s.map(c=>`
        <tr class="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
            <td class="py-3 px-4 text-gray-800 font-bold whitespace-normal min-w-[150px]">${c.item}</td>
            <td class="py-3 px-4 text-gray-500 font-medium">${c.client||"--"}</td>
            <td class="py-3 px-4 text-right text-gray-600 font-bold">R$ ${(c.value||0).toFixed(2)}</td>
            <td class="py-3 px-4 text-center text-gray-600 font-black">${c.commissionRate}%</td>
            <td class="py-3 px-4 text-right font-black text-emerald-600">R$ ${(c.commissionValue||0).toFixed(2)}</td>
        </tr>
    `).join("");let u="";(o>0||i>0||n)&&(u=`
            <div class="mt-5 bg-gray-50 p-5 rounded-3xl border border-gray-200 shadow-sm">
                <h5 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4"><i class="bi bi-sliders mr-1 text-indigo-500"></i> Ajustes Aplicados</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    ${o>0?`<div class="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm"><span class="text-gray-400 block text-[9px] uppercase tracking-widest font-bold mb-1">Descontos/Vales</span> <span class="font-black text-red-500 text-xl leading-none">-R$ ${o.toFixed(2)}</span></div>`:""}
                    ${i>0?`<div class="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm"><span class="text-gray-400 block text-[9px] uppercase tracking-widest font-bold mb-1">Bônus Extras</span> <span class="font-black text-emerald-500 text-xl leading-none">+R$ ${i.toFixed(2)}</span></div>`:""}
                </div>
                ${n?`<div class="text-sm font-bold text-gray-600 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm"><strong class="block text-[9px] uppercase tracking-widest text-indigo-400 mb-1.5"><i class="bi bi-card-text"></i> Motivo do Ajuste</strong> ${n}</div>`:""}
            </div>
        `),e.innerHTML=`
        <div class="w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl md:mx-auto md:mt-8 md:rounded-3xl md:shadow-2xl md:border md:border-gray-200 flex flex-col bg-gray-50 overflow-hidden relative">
            ${l}
            <div class="flex-grow overflow-y-auto p-4 md:p-8 pb-28 md:pb-6 custom-scrollbar bg-gray-50/50">
                <div class="flex flex-col md:flex-row justify-between md:items-center bg-indigo-50 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-indigo-200 mb-5 gap-4 shadow-sm relative overflow-hidden">
                    <div class="absolute right-0 top-0 bottom-0 w-2 bg-indigo-500"></div>
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 rounded-2xl bg-white text-indigo-600 flex items-center justify-center font-black text-2xl flex-shrink-0 shadow-sm border border-indigo-100">
                            ${ba(a.professionalName)}
                        </div>
                        <div>
                            <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-0.5">Profissional</p>
                            <p class="font-black text-indigo-900 text-2xl leading-tight uppercase tracking-wider">${a.professionalName}</p>
                        </div>
                    </div>
                    <div class="md:text-right border-t md:border-t-0 md:border-l border-indigo-200 pt-4 md:pt-0 md:pl-6">
                        <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Período Base</p>
                        <p class="font-black text-indigo-700 text-sm md:text-base bg-white px-4 py-2 rounded-xl shadow-sm border border-indigo-100 flex items-center justify-center md:justify-end gap-2"><i class="bi bi-calendar3 opacity-50 text-xl"></i> ${a.period}</p>
                    </div>
                </div>

                <div class="border border-gray-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm bg-white">
                    <div class="overflow-x-auto custom-scrollbar">
                        <table class="w-full text-left text-sm whitespace-nowrap">
                            <thead class="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <tr>
                                    <th class="p-4 font-bold uppercase tracking-wider text-[10px]">Serviço / Produto</th>
                                    <th class="p-4 font-bold uppercase tracking-wider text-[10px]">Cliente</th>
                                    <th class="p-4 font-bold uppercase tracking-wider text-[10px] text-right">Base Calc.</th>
                                    <th class="p-4 font-bold uppercase tracking-wider text-[10px] text-center">%</th>
                                    <th class="p-4 font-bold uppercase tracking-wider text-[10px] text-right">Comissão</th>
                                </tr>
                            </thead>
                            <tbody>${d||'<tr><td colspan="5" class="text-center py-10 text-gray-400 font-bold text-sm">Nenhum item detalhado neste recibo.</td></tr>'}</tbody>
                        </table>
                    </div>
                    <div class="bg-gray-50 p-5 border-t border-gray-200 flex justify-between items-center shadow-inner">
                        <span class="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Bruto Apurado</span>
                        <span class="font-black text-gray-800 text-2xl drop-shadow-sm">R$ ${(r.totalCommission||0).toFixed(2)}</span>
                    </div>
                </div>
                
                ${u}

                <div class="mt-5 flex flex-col md:flex-row justify-between items-start md:items-center bg-emerald-50 p-6 rounded-2xl md:rounded-3xl border border-emerald-200 shadow-sm relative overflow-hidden gap-2">
                    <div class="absolute right-[-10px] top-[-10px] opacity-10"><i class="bi bi-check-circle-fill text-8xl md:text-9xl text-emerald-500"></i></div>
                    <div class="z-10">
                        <span class="block text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 flex items-center gap-1.5"><i class="bi bi-cash-stack text-base"></i> Total Líquido Pago</span>
                        <span class="text-3xl md:text-4xl font-black text-emerald-700 drop-shadow-sm">R$ ${(r.finalValue||r.totalCommission).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <footer class="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)] w-full flex-shrink-0 z-50 flex gap-3 md:rounded-b-3xl">
                <button data-action="print-receipt" data-id="${a.id}" class="flex-1 py-4 md:py-3.5 bg-indigo-50 text-indigo-700 font-black text-sm rounded-xl hover:bg-indigo-100 transition-colors shadow-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-indigo-200 active:scale-95">
                    <i class="bi bi-printer text-xl"></i> Imprimir Recibo
                </button>
                <button data-action="delete-report" data-id="${a.id}" class="w-14 md:w-16 h-auto bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors border border-red-200 shadow-sm active:scale-95" title="Excluir e Estornar">
                    <i class="bi bi-trash3 text-xl"></i>
                </button>
            </footer>
        </div>
    `,Lr()}function kc(){if(j.reports.length===0){f("Aviso","Não há dados para exportar com os filtros atuais.","info");return}let t=j.reports;if(j.searchQuery){const a=j.searchQuery.toLowerCase();t=t.filter(s=>s.professionalName.toLowerCase().includes(a)||s.period.toLowerCase().includes(a))}const e=t.map(a=>{const s=a.summary.totalCommission,r=a.summary.extraDebit||0,o=a.summary.extraCredit||0,i=a.summary.finalValue||s;return{"Data da Apuração":new Date(a.createdAt).toLocaleDateString("pt-BR"),Profissional:a.professionalName,"Período Base":a.period,"Itens Calculados":a.summary.totalItems||0,"Valor Bruto (R$)":s,"Bônus (R$)":o,"Descontos (R$)":r,"Líquido Pago (R$)":i,"Observações/Motivo":a.summary.notes||""}});try{if(typeof XLSX>"u"){f("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const a=XLSX.utils.json_to_sheet(e),s=XLSX.utils.book_new();XLSX.utils.book_append_sheet(s,a,"Comissoes");const r=`Relatorio_Comissoes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(s,r)}catch(a){console.error(a),f("Erro","Falha ao exportar Excel.","error")}}function $c(t){const e=j.reports.find(u=>u.id===t);if(!e)return;if(!window.jspdf){f("Erro","A biblioteca de PDF não foi carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a;s.setFillColor(79,70,229),s.rect(0,0,210,40,"F"),s.setTextColor(255,255,255),s.setFontSize(22),s.setFont(void 0,"bold"),s.text("RECIBO DE COMISSÕES",105,20,{align:"center"}),s.setFontSize(10),s.text(`Data de Emissão: ${new Date().toLocaleDateString("pt-BR")}`,105,28,{align:"center"}),s.setTextColor(50,50,50),s.setFontSize(11),s.setFont(void 0,"normal"),s.text("Profissional:",15,55),s.setFont(void 0,"bold"),s.text(e.professionalName,40,55),s.setFont(void 0,"normal"),s.text("Período:",130,55),s.setFont(void 0,"bold"),s.text(e.period,147,55);const r=e.reportData?.items||e.items||[];let o=70;if(r.length>0){const u=r.map(c=>[c.item||"Item",c.client||"--",`R$ ${(c.value||0).toFixed(2)}`,`${c.commissionRate||0}%`,`R$ ${(c.commissionValue||0).toFixed(2)}`]);s.autoTable({startY:o,head:[["Serviço/Produto","Cliente","Valor Base","Taxa","Comissão"]],body:u,theme:"striped",headStyles:{fillColor:[249,250,251],textColor:[75,85,99],fontStyle:"bold"},styles:{fontSize:8},columnStyles:{2:{halign:"right"},3:{halign:"center"},4:{halign:"right",fontStyle:"bold",textColor:[5,150,105]}}}),o=s.lastAutoTable.finalY+15}const i=e.summary,n=i.finalValue||i.totalCommission,l=[["Comissões Brutas (Soma dos Itens)",`R$ ${i.totalCommission.toFixed(2)}`]];i.extraCredit>0&&l.push(["(+) Bônus Extras",`R$ ${i.extraCredit.toFixed(2)}`]),i.extraDebit>0&&l.push(["(-) Descontos / Vales",`R$ ${i.extraDebit.toFixed(2)}`]),s.autoTable({startY:o,head:[["Resumo do Fechamento","Valor"]],body:l,theme:"grid",headStyles:{fillColor:[79,70,229],textColor:[255,255,255]},columnStyles:{1:{halign:"right",fontStyle:"bold"}}});const d=s.lastAutoTable.finalY+15;s.setFillColor(236,253,245),s.rect(120,d-8,75,15,"F"),s.setTextColor(5,150,105),s.setFontSize(14),s.setFont(void 0,"bold"),s.text(`Total Líquido: R$ ${n.toFixed(2)}`,190,d,{align:"right"}),i.notes&&(s.setTextColor(100,100,100),s.setFontSize(9),s.setFont(void 0,"normal"),s.text(`Obs/Motivo: ${i.notes}`,15,d+10)),s.setTextColor(150,150,150),s.setFontSize(9),s.line(20,d+40,90,d+40),s.text("Assinatura da Empresa",55,d+45,{align:"center"}),s.line(120,d+40,190,d+40),s.text("Assinatura do Profissional",155,d+45,{align:"center"}),s.save(`Recibo_Comissoes_${e.professionalName.replace(/\s+/g,"_")}.pdf`)}async function Sc(){const t=j.selectedIds.size;if(!(t===0||!await Y("Excluir Recibos",`Deseja excluir e estornar ${t} recibo(s)? As vendas associadas voltarão ao status "A Apurar".`)))try{const a=Array.from(j.selectedIds).map(s=>Ir(s));await Promise.all(a),f("Sucesso",`${t} recibos excluídos com sucesso.`,"success"),j.selectedIds.clear(),Dt(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),await dt()}catch{f("Erro ao Excluir","Ocorreu um erro ao excluir alguns recibos.","error")}}async function Ec(t){if(await Y("Excluir Recibo",'ATENÇÃO: Deseja realmente excluir este recibo? As vendas associadas a ele voltarão ao status "A Apurar" e o valor será subtraído dos relatórios. Esta ação não pode ser desfeita.'))try{await Ir(t),f("Sucesso","Recibo cancelado com sucesso. Vendas estornadas para apuração.","success"),Is(),await dt()}catch(a){f("Erro ao Excluir",a.message,"error")}}const Fe=document.getElementById("content");let B={allPackages:[],catalogForModal:{services:[],products:[]},establishments:[],searchQuery:"",statusFilter:"all",viewMode:"list",tempPackage:null,selectedIds:new Set},We=null;function ct(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function Ic(){const t=B.allPackages.length,e=B.allPackages.filter(o=>o.status!=="inactive"),a=e.length,s=a>0?e.reduce((o,i)=>o+(i.price||0),0)/a:0;let r=0;return e.forEach(o=>{const i=o.originalPrice||0,n=o.price||0;if(i>0&&i>n){const l=(i-n)/i*100;l>r&&(r=l)}}),{total:t,activeCount:a,avgPrice:s,maxDiscount:r}}function Lc(){const t=document.getElementById("packages-layout-detail");t&&(t.classList.remove("hidden"),t.style.display="flex",requestAnimationFrame(()=>{t.classList.remove("opacity-0");const e=t.querySelector("#modal-content-wrapper");e&&(e.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),e.classList.add("translate-y-0","md:scale-100","md:opacity-100"))}))}function aa(){const t=document.getElementById("packages-layout-detail");if(t){t.classList.add("opacity-0");const e=t.querySelector("#modal-content-wrapper");e&&(e.classList.remove("translate-y-0","md:scale-100","md:opacity-100"),e.classList.add("translate-y-full","md:scale-95","md:opacity-0")),setTimeout(()=>{t.classList.add("hidden"),t.style.display="none",t.innerHTML=""},300)}}function Cc(){const t=document.getElementById("packages-layout-detail");if(!t||B.viewMode!=="edit-package"||!B.tempPackage)return;B.tempPackage.name=t.querySelector("#packageName")?.value||"",B.tempPackage.description=t.querySelector("#packageDescription")?.value||"",B.tempPackage.status=t.querySelector("#packageStatus")?.value||"active";const e=parseFloat(t.querySelector("#finalPrice")?.value);B.tempPackage.price=isNaN(e)?"":e;const a=parseFloat(t.querySelector("#commissionRate")?.value);B.tempPackage.commissionRate=isNaN(a)?"":a;const s=parseInt(t.querySelector("#validityDays")?.value,10);B.tempPackage.validityDays=isNaN(s)?"":s,B.tempPackage.sellStartDate=t.querySelector("#sellStartDate")?.value||"",B.tempPackage.sellEndDate=t.querySelector("#sellEndDate")?.value||"";const r=parseInt(t.querySelector("#salesLimit")?.value,10);B.tempPackage.salesLimit=isNaN(r)?"":r;const o=Array.from(t.querySelectorAll(".modal-est-checkbox:checked")).map(i=>i.value);B.tempPackage.establishmentIds=o}async function Dc(){try{const e=(await ye().catch(()=>({matrizes:[]}))).matrizes||[];B.establishments=[],e.forEach(a=>{B.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>B.establishments.push({id:s.id,name:s.name,type:"Filial"}))})}catch(t){console.error("Erro ao buscar hierarquia de empresas",t)}B.viewMode="list",B.selectedIds.clear(),Tc(),Ac(),await ma()}async function ma(){const t=document.getElementById("packagesListContainer");t&&(t.innerHTML='<div class="col-span-full flex justify-center py-20"><div class="loader mx-auto"></div></div>');const e=m.selectedEstablishments&&m.selectedEstablishments.length>0?m.selectedEstablishments:[m.establishmentId];try{const a=e.map(c=>xs(c).catch(()=>[])),s=await Promise.all(a),r=new Map;s.flat().forEach(c=>{r.has(c.id)||r.set(c.id,c)}),B.allPackages=Array.from(r.values());const o=e.map(c=>pt(c).catch(()=>[])),i=e.map(c=>bt(c).catch(()=>[])),[n,l]=await Promise.all([Promise.all(o),Promise.all(i)]),d=new Map;n.flat().forEach(c=>d.set(c.id,c));const u=new Map;l.flat().forEach(c=>u.set(c.id,c)),B.catalogForModal={services:Array.from(d.values()).filter(c=>c.active),products:Array.from(u.values())},Pc(),Ye(),wt()}catch(a){console.error(a),t&&(t.innerHTML=`
                <div class="col-span-full flex flex-col items-center justify-center py-16 text-slate-500">
                    <i class="bi bi-exclamation-triangle text-4xl text-red-400 mb-3"></i>
                    <p class="text-xs font-bold">Erro ao carregar os pacotes. Tente novamente.</p>
                </div>
            `)}}function wt(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=B.selectedIds.size;e&&(e.textContent=a),t&&(a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")));const s=document.getElementById("select-all-toggle");s&&(s.checked=B.allPackages.length>0&&a===B.allPackages.length)}function Tc(){Fe.innerHTML=`
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
                    padding: 0 !important;
                    border-radius: 0 !important;
                }
                .mobile-detail-open #modal-content-wrapper {
                    border-radius: 0 !important;
                    height: 100% !important;
                    max-height: none !important;
                }
            }
            #toast-container, .toast-notification, .modal, .modal-backdrop { z-index: 9999999 !important; }
        </style>
        
        <div class="h-[calc(100vh-80px)] md:h-auto flex flex-col w-full relative overflow-hidden bg-slate-50" style="font-family: 'Plus Jakarta Sans', 'Nunito', sans-serif;">
            
            <section id="packages-layout-main" class="flex-1 flex flex-col p-2 md:p-4 md:pl-6 w-full relative overflow-y-auto custom-scrollbar pb-[100px] md:pb-6">
                
                <div id="batch-action-bar" class="hidden fixed top-20 left-4 right-4 md:absolute md:top-4 z-50 bg-gray-900 text-white rounded-2xl shadow-2xl p-4 items-center justify-between animate-fade-in-down">
                    <div class="flex items-center gap-3">
                        <button id="cancel-selection-btn" class="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white">
                            <i class="bi bi-x-lg text-lg"></i>
                        </button>
                        <span class="font-bold text-base tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Pacotes Selecionados</span>
                    </div>
                    <button id="batch-delete-btn" class="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg text-sm">
                        <i class="bi bi-trash3"></i> Excluir
                    </button>
                </div>

                <div class="flex-shrink-0 z-30 pt-safe-top w-full max-w-7xl mx-auto">
                    <div class="bg-transparent py-3 flex flex-col md:flex-row justify-end items-start md:items-center md:pb-5 gap-3">
                        <div class="w-full flex flex-col md:flex-row items-center gap-3">
                            <div class="relative w-full md:flex-1 md:max-w-md mr-auto">
                                <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg"></i>
                                <input type="text" id="search-packages" placeholder="Buscar pacotes..." class="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 shadow-sm rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                            </div>
                            
                            <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar">
                                <label class="flex items-center gap-2 cursor-pointer py-2.5 px-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-colors flex-shrink-0">
                                    <input type="checkbox" id="select-all-toggle" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4">
                                    <span class="text-xs font-bold text-slate-700 hidden md:inline">Todos</span>
                                </label>
                                <select id="filter-status" class="flex-1 md:w-auto py-2.5 px-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-bold text-slate-700 shadow-sm cursor-pointer">
                                    <option value="all">Todos Status</option>
                                    <option value="active">Ativos</option>
                                    <option value="inactive">Inativos</option>
                                </select>
                                <button id="export-excel-btn" class="py-2.5 px-3 bg-white border border-slate-200 text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95 flex-shrink-0" title="Exportar Excel">
                                    <i class="bi bi-file-earmark-excel-fill text-base"></i> <span class="hidden md:inline">Exportar</span>
                                </button>
                                <button data-action="new-package" class="py-2.5 px-4 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all text-xs flex items-center justify-center gap-2 uppercase tracking-wider flex-shrink-0">
                                    <i class="bi bi-plus-circle-fill text-sm"></i> Criar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id="kpi-container" class="flex md:grid md:grid-cols-4 overflow-x-auto gap-3 md:gap-5 snap-x hide-scrollbar mb-4"></div>
                </div>

                <div class="w-full max-w-7xl mx-auto flex-1">
                    <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-2"></div>
                </div>
                
            </section>

            <div id="packages-layout-detail" class="hidden fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm flex-col md:flex-row items-end md:items-center justify-center opacity-0 transition-opacity duration-300 md:p-6"></div>
        </div>
    `}function Pc(){const t=Ic(),e=document.getElementById("kpi-container");e&&(e.innerHTML=`
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-50 flex items-center justify-center">
                    <i class="bi bi-box2-fill text-slate-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">Total<br class="md:hidden"/> Pacotes</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-slate-800">${t.total}</span>
        </div>
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                    <i class="bi bi-check-circle-fill text-emerald-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">Pacotes<br class="md:hidden"/> Ativos</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-emerald-600">${t.activeCount}</span>
        </div>
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-red-50 flex items-center justify-center">
                    <i class="bi bi-tags-fill text-red-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">Maior<br class="md:hidden"/> Desconto</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-red-500">${t.maxDiscount.toFixed(0)}%</span>
        </div>
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-50 flex items-center justify-center">
                    <i class="bi bi-cash-stack text-indigo-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">Ticket<br class="md:hidden"/> Médio</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-indigo-600">${ct(t.avgPrice)}</span>
        </div>
    `)}function Ye(){const t=document.getElementById("packagesListContainer");if(!t)return;let e=B.allPackages;if(B.statusFilter!=="all"){const s=B.statusFilter==="active";e=e.filter(r=>r.status!=="inactive"===s)}if(B.searchQuery){const s=B.searchQuery.toLowerCase();e=e.filter(r=>r.name.toLowerCase().includes(s)||(r.description||"").toLowerCase().includes(s))}if(e.length===0){t.innerHTML=`
            <div class="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5">
                    <i class="bi bi-box2 text-4xl text-slate-300"></i>
                </div>
                <h3 class="text-lg font-black text-slate-700 mb-1">Nenhum pacote</h3>
                <p class="text-sm text-slate-500 mb-6 max-w-sm text-center">Não encontramos resultados para os filtros selecionados.</p>
                <button data-action="new-package" class="px-6 py-3 bg-indigo-50 text-indigo-700 font-black rounded-xl hover:bg-indigo-100 transition-colors text-xs uppercase tracking-wider shadow-sm">
                    Criar Novo Pacote
                </button>
            </div>
        `;return}const a=new Map(B.establishments.map(s=>[s.id,s]));t.innerHTML=e.map(s=>{const r=s.status!=="inactive",o=B.selectedIds.has(s.id),i=s.price||0,n=s.originalPrice||0,l=n>0&&n>i?(n-i)/n*100:0,d=h(s.name),u=h(s.description||"Nenhuma descrição detalhada."),c=(s.items||[]).reduce((y,k)=>y+(k.quantity||1),0),p=s.validityDays?`${s.validityDays} dias de uso`:"Uso vitalício",b=s.sellEndDate?`Vendas até ${new Date(s.sellEndDate).toLocaleDateString("pt-BR")}`:"Venda contínua",g=s.establishmentIds||(s.establishmentId?[s.establishmentId]:[]);let v="";if(g.length===1){const y=a.get(g[0]);y&&(v=`<span class="text-[9px] px-2 py-1 rounded-md bg-slate-100 text-slate-600 font-bold border border-slate-200 flex items-center w-max shadow-sm"><i class="bi ${y.type==="Matriz"?"bi-building":"bi-shop"} mr-1 opacity-50"></i> ${y.name}</span>`)}else g.length>1&&(v=`<span class="text-[9px] px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 flex items-center w-max shadow-sm"><i class="bi bi-buildings mr-1 opacity-50"></i> ${g.length} Unidades</span>`);return`
            <div class="bg-white rounded-3xl border ${o?"border-indigo-500 ring-2 ring-indigo-500 bg-indigo-50/30":"border-slate-200"} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden group cursor-pointer active:scale-[0.98]"
                 data-action="edit-package" data-id="${s.id}">
                
                <div class="absolute left-5 top-5 z-20">
                    <input type="checkbox" value="${s.id}" class="item-checkbox w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm bg-white transition-all" ${o?"checked":""}>
                </div>

                ${l>0?`<div class="absolute -right-8 top-4 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider py-1 px-10 transform rotate-45 shadow-md z-10">${l.toFixed(0)}% OFF</div>`:""}

                <div class="p-5 pt-5 flex-grow flex flex-col">
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex flex-col gap-2 pl-8">
                            <div class="flex items-center gap-1.5">
                                <span class="w-2.5 h-2.5 rounded-full ${r?"bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]":"bg-slate-300"}"></span>
                                <span class="text-[10px] font-black ${r?"text-emerald-600":"text-slate-500"} uppercase tracking-widest">${r?"Ativo":"Inativo"}</span>
                            </div>
                            ${v}
                        </div>
                    </div>
                    
                    <h3 class="text-lg font-black text-slate-800 leading-tight line-clamp-1 mb-1.5">${d}</h3>
                    <p class="text-xs font-medium text-slate-500 line-clamp-2 min-h-[2rem] mb-4">${u}</p>

                    <div class="mt-auto bg-slate-50 rounded-2xl p-3 border border-slate-100 flex justify-between items-center shadow-inner mb-4">
                        <div class="flex flex-col">
                            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Conteúdo</span>
                            <span class="text-xs font-black text-indigo-600 flex items-center gap-1.5"><i class="bi bi-box-seam"></i> ${c} Itens</span>
                        </div>
                        <div class="flex flex-col text-right">
                            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Validade</span>
                            <span class="text-xs font-bold text-slate-700 flex items-center gap-1.5 justify-end"><i class="bi bi-hourglass-split"></i> ${p}</span>
                        </div>
                    </div>

                    <div class="flex justify-between items-end border-t border-slate-100 pt-4">
                        <div class="flex flex-col">
                            ${l>0?`<span class="text-[10px] text-slate-400 font-bold line-through mb-0.5">De ${ct(n)}</span>`:'<span class="text-[10px] text-transparent mb-0.5">.</span>'}
                            <span class="text-2xl font-black text-slate-900 leading-none drop-shadow-sm">${ct(i)}</span>
                        </div>
                        <div class="text-right">
                            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md border border-slate-200"><i class="bi bi-calendar-event mr-1"></i>${b}</span>
                        </div>
                    </div>
                </div>
            </div>
        `}).join("")}function Bc(){if(B.allPackages.length===0){f("Aviso","Não há pacotes carregados para exportar.","info");return}let t=B.allPackages;if(B.statusFilter!=="all"){const s=B.statusFilter==="active";t=t.filter(r=>r.status!=="inactive"===s)}if(B.searchQuery){const s=B.searchQuery.toLowerCase();t=t.filter(r=>r.name.toLowerCase().includes(s)||(r.description||"").toLowerCase().includes(s))}if(t.length===0){f("Aviso","Nenhum pacote corresponde aos filtros atuais.","info");return}const e=new Map(B.establishments.map(s=>[s.id,s.name])),a=t.map(s=>{const r=s.originalPrice||0,o=s.price||0,i=r>0?(r-o)/r*100:0,n=(s.items||[]).map(u=>`${u.quantity}x ${u.name}`).join(" | ");return{"Unidade(s)":(s.establishmentIds||(s.establishmentId?[s.establishmentId]:[])).map(u=>e.get(u)).filter(Boolean).join(", ")||"Não identificada","Nome do Pacote":s.name,Status:s.status!=="inactive"?"Ativo":"Inativo",Descrição:s.description||"","Itens Incluídos":n,"Valor Original (R$)":r,"Preço de Venda (R$)":o,"Desconto (%)":i.toFixed(1)+"%","Comissão (%)":s.commissionRate||0,"Validade de Uso (Dias)":s.validityDays||"Vitalício","Vendas Início":s.sellStartDate?new Date(s.sellStartDate).toLocaleDateString("pt-BR"):"-","Vendas Fim":s.sellEndDate?new Date(s.sellEndDate).toLocaleDateString("pt-BR"):"-"}});try{if(typeof XLSX>"u"){f("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const s=XLSX.utils.json_to_sheet(a),r=XLSX.utils.book_new();XLSX.utils.book_append_sheet(r,s,"Pacotes");const o=`Relatorio_Pacotes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(r,o)}catch(s){console.error(s),f("Erro","Falha ao exportar Excel.","error")}}function to(t=null){B.viewMode="edit-package",B.tempPackage=t?JSON.parse(JSON.stringify(t)):{id:"",name:"",description:"",status:"active",items:[],price:"",originalPrice:0,commissionRate:0,validityDays:"",sellStartDate:"",sellEndDate:"",salesLimit:"",establishmentIds:[m.establishmentId]},is(),Lc()}function Dr(){const t=document.getElementById("packages-layout-detail");if(!t)return;const a=(B.tempPackage.items||[]).reduce((n,l)=>n+(l.price||0)*(l.quantity||1),0),s=t.querySelector("#finalPrice"),r=t.querySelector("#discountIndicator"),o=t.querySelector("#originalPrice"),i=parseFloat(s?.value)||0;if(o&&(o.textContent=ct(a)),r)if(a>0&&a>i&&i>0){const n=(a-i)/a*100;r.textContent=`${n.toFixed(0)}% OFF`,r.classList.remove("hidden")}else r.classList.add("hidden")}function rs(){const t=document.getElementById("package-items-list");if(!t)return;const e=B.tempPackage.items||[];e.length===0?t.innerHTML=`
            <div class="text-center py-8 text-slate-400 flex flex-col items-center">
                <i class="bi bi-inbox text-3xl mb-2 opacity-50"></i>
                <p class="text-[10px] font-bold uppercase tracking-widest">Nenhum item adicionado</p>
                <p class="text-[9px] mt-1 text-slate-400">Clique no botão acima para compor o pacote</p>
            </div>`:t.innerHTML=e.map((a,s)=>{const r=a.type==="service",o=r?"bi-scissors":"bi-box",i=r?"bg-indigo-100 text-indigo-700 border-indigo-200":"bg-emerald-100 text-emerald-700 border-emerald-200";return`
            <div class="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors animate-fade-in-fast mb-2">
                <div class="flex items-center gap-4 min-w-0 flex-1">
                    <div class="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 shadow-inner">
                        <span class="text-[8px] font-bold text-slate-400 uppercase leading-none mb-1">Qtd</span>
                        <input type="number" value="${a.quantity}" min="1" class="w-12 text-center bg-transparent text-sm font-black text-slate-700 outline-none quantity-input" data-index="${s}">
                    </div>
                    <div class="min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${i} flex items-center gap-1 shadow-sm"><i class="bi ${o}"></i> ${r?"Serviço":"Produto"}</span>
                        </div>
                        <p class="font-black text-slate-800 text-sm truncate leading-tight">${h(a.name)}</p>
                    </div>
                </div>
                <div class="flex items-center gap-4 flex-shrink-0 pl-2">
                    <div class="text-right">
                        <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Valor Un.</span>
                        <span class="text-sm font-black text-slate-700">${ct(a.price)}</span>
                    </div>
                    <button type="button" data-action="remove-item" data-index="${s}" class="w-10 h-10 flex items-center justify-center rounded-xl text-red-400 bg-red-50 hover:text-red-600 hover:bg-red-100 transition-colors shadow-sm z-10 cursor-pointer">
                        <i class="bi bi-trash3 pointer-events-none text-base"></i>
                    </button>
                </div>
            </div>
        `}).join(""),Dr()}function ao(t){return t?t.includes("T")?t.split("T")[0]:t:""}function is(){const t=document.getElementById("packages-layout-detail");if(!t)return;const e=B.tempPackage,a=!!e.id,s=h(e.name||""),r=h(e.description||""),o=e.price!==void 0&&e.price!==""?e.price:"",i=e.commissionRate!==void 0&&e.commissionRate!==""?e.commissionRate:"",n=e.validityDays!==void 0&&e.validityDays!==""?e.validityDays:"",l=ao(e.sellStartDate),d=ao(e.sellEndDate),u=e.salesLimit!==void 0&&e.salesLimit!==""?e.salesLimit:"",c=e.establishmentIds&&e.establishmentIds.length>0?e.establishmentIds:e.establishmentId?[e.establishmentId]:[m.establishmentId],p=B.establishments.map(g=>`
        <label class="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer group shadow-sm">
            <input type="checkbox" class="modal-est-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4" value="${g.id}" ${c.includes(g.id)?"checked":""}>
            <span class="text-xs font-bold text-slate-700 truncate group-hover:text-indigo-700" title="${g.name}">${g.type==="Matriz"?"🏢":"📍"} ${g.name}</span>
        </label>
    `).join(""),b=`
        <header class="bg-indigo-600 border-b border-indigo-700 px-5 py-4 flex items-center justify-between pt-safe-top md:pt-4 shadow-sm z-20 flex-shrink-0 relative overflow-hidden md:rounded-t-3xl w-full">
            <div class="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
                <svg width="150" height="150" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="white" stroke-width="20"/></svg>
            </div>
            <button type="button" data-action="back-to-main" class="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-black/20 active:scale-90 transition-colors z-10 relative">
                <i class="bi bi-arrow-left"></i>
            </button>
            <div class="text-center z-10 relative flex-1 px-4">
                <h2 class="text-base font-black text-white tracking-tight leading-tight truncate">${a?"Editar Pacote":"Novo Pacote"}</h2>
                <p class="text-[10px] text-indigo-100 font-bold uppercase tracking-widest mt-0.5">Configuração Comercial</p>
            </div>
            ${a?`
                <button data-action="delete-package" data-id="${e.id}" class="w-10 h-10 rounded-full bg-red-500/80 text-white flex items-center justify-center hover:bg-red-500 shadow-inner transition-transform active:scale-95 z-10 relative">
                    <i class="bi bi-trash3"></i>
                </button>
            `:'<div class="w-10 h-10 z-10 relative"></div>'}
        </header>
    `;t.innerHTML=`
        <div id="modal-content-wrapper" class="w-full md:max-w-4xl bg-slate-50 flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-0 md:scale-95 md:opacity-0 h-full md:h-auto md:max-h-[90vh] md:rounded-3xl overflow-hidden shadow-2xl relative">
            ${b}
            
            <div class="flex-grow overflow-y-auto p-4 md:p-6 custom-scrollbar bg-slate-50/50 pb-32 md:pb-24">
                <form id="package-form" class="space-y-5 md:space-y-6">
                    
                    <div>
                        <h3 class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5 ml-1 flex items-center gap-1.5"><i class="bi bi-info-circle text-indigo-500 text-sm"></i> Informações Básicas</h3>
                        <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div class="md:col-span-3">
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nome Comercial do Pacote *</label>
                                    <input type="text" id="packageName" value="${s}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-slate-800 text-sm shadow-inner transition-all" placeholder="Ex: Combo Verão, Especial Noivas..." required>
                                </div>
                                <div class="md:col-span-1">
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Status</label>
                                    <select id="packageStatus" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-800 text-sm shadow-inner cursor-pointer transition-all">
                                        <option value="active" ${e.status!=="inactive"?"selected":""}>Ativo</option>
                                        <option value="inactive" ${e.status==="inactive"?"selected":""}>Inativo</option>
                                    </select>
                                </div>
                                
                                <div class="md:col-span-4 mt-2 border-t border-slate-100 pt-4">
                                    <div class="flex justify-between items-center mb-3">
                                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Unidades de Venda Permitidas *</label>
                                        <button type="button" data-action="toggle-all-ests" class="text-[9px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 shadow-sm active:scale-95 transition-all">Selecionar Todas</button>
                                    </div>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-40 overflow-y-auto custom-scrollbar p-1">
                                        ${p}
                                    </div>
                                </div>
                            </div>
                            <div class="pt-2">
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Descrição para o Cliente (Opcional)</label>
                                <textarea id="packageDescription" rows="2" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-700 resize-none shadow-inner transition-all" placeholder="Descreva os benefícios e condições do pacote...">${r}</textarea>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="flex justify-between items-center mb-2.5 ml-1">
                            <h3 class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><i class="bi bi-layers text-indigo-500 text-sm"></i> Composição do Pacote</h3>
                            <button type="button" data-action="add-item-to-package-btn" class="py-2 px-4 bg-indigo-100 text-indigo-700 font-black rounded-xl text-[10px] md:text-xs hover:bg-indigo-200 transition shadow-sm flex items-center gap-1.5 uppercase tracking-wider active:scale-95 border border-indigo-200">
                                <i class="bi bi-plus-circle-fill text-sm"></i> Inserir Serviço/Produto
                            </button>
                        </div>
                        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <div id="package-items-list" class="max-h-72 overflow-y-auto custom-scrollbar bg-slate-50/50 p-4 min-h-[6rem]">
                                </div>
                            <div class="bg-slate-100 p-5 border-t border-slate-200 flex justify-between items-center shadow-inner">
                                <span class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Soma Original dos Itens</span>
                                <span id="originalPrice" class="text-xl font-black text-slate-800 drop-shadow-sm">R$ 0,00</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5 ml-1 flex items-center gap-1.5"><i class="bi bi-currency-dollar text-indigo-500 text-sm"></i> Regras e Precificação</h3>
                        <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                            
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div class="col-span-2 relative">
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Preço Final *</label>
                                    <div class="relative">
                                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600 font-black text-xl">R$</span>
                                        <input type="number" step="0.01" id="finalPrice" value="${o}" class="w-full pl-12 p-3.5 bg-indigo-50 border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-2xl text-indigo-800 shadow-inner transition-all" required placeholder="0.00">
                                    </div>
                                    <p id="discountIndicator" class="absolute right-0 -top-5 text-[10px] font-black text-white bg-red-500 px-3 py-1 rounded-lg shadow-md hidden animate-fade-in-down">0% OFF</p>
                                </div>
                                
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Comissão (%)</label>
                                    <input type="number" id="commissionRate" value="${i}" class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-base text-slate-700 shadow-inner transition-all" placeholder="Ex: 10">
                                </div>

                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5" title="Prazo para usar os itens após a compra">Validade (Dias)</label>
                                    <div class="relative">
                                        <input type="number" id="validityDays" value="${n}" class="w-full p-3.5 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-base text-slate-700 shadow-inner transition-all" placeholder="Vitalício">
                                        <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dias</span>
                                    </div>
                                </div>
                            </div>

                            <div class="border-t border-slate-100 pt-5 mt-2">
                                <p class="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-1.5"><i class="bi bi-lightning-charge-fill text-sm"></i> Gatilhos de Venda (Opcional)</p>
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Início da Venda</label>
                                        <input type="date" id="sellStartDate" value="${l}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-bold text-slate-700 shadow-inner transition-all">
                                    </div>
                                    <div>
                                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Fim da Venda</label>
                                        <input type="date" id="sellEndDate" value="${d}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-bold text-slate-700 shadow-inner transition-all">
                                    </div>
                                    <div class="col-span-2 md:col-span-1">
                                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Limite de Estoque</label>
                                        <input type="number" id="salesLimit" value="${u}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-slate-700 text-sm shadow-inner transition-all" placeholder="Qtd máxima">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <footer class="absolute bottom-0 left-0 right-0 p-3 pb-safe md:p-4 border-t border-slate-200 bg-white flex justify-end gap-3 z-50 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)] md:rounded-b-3xl">
                <button type="button" data-action="back-to-main" class="hidden md:block py-2.5 px-6 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors shadow-sm uppercase tracking-wider">Cancelar</button>
                <button data-action="save-package" class="w-full md:w-auto py-3 md:py-2.5 px-6 bg-indigo-600 text-white font-black text-xs md:text-sm rounded-xl hover:bg-indigo-700 shadow-md transition-transform active:scale-95 uppercase tracking-wider flex justify-center items-center gap-2">
                    <i class="bi bi-save2-fill text-base"></i> Salvar Pacote
                </button>
            </footer>
        </div>
    `,rs(),requestAnimationFrame(()=>{const g=t.querySelector("#modal-content-wrapper");g&&(g.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),g.classList.add("translate-y-0","md:scale-100","md:opacity-100"))})}function Mc(){B.viewMode="select-item";const t=document.getElementById("packages-layout-detail");if(!t)return;const e=`
        <header class="bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between pt-safe-top md:pt-4 shadow-sm z-20 flex-shrink-0 relative md:rounded-t-3xl w-full">
            <button type="button" data-action="back-to-editor" class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-90 transition-colors z-10 relative">
                <i class="bi bi-arrow-left"></i>
            </button>
            <div class="text-center z-10 relative flex-1 px-4">
                <h2 class="text-base font-black text-slate-800 tracking-tight leading-tight truncate">Catálogo de Itens</h2>
                <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Adicionar ao Pacote</p>
            </div>
            <div class="w-10 h-10 z-10 relative"></div>
        </header>
    `;t.innerHTML=`
        <div id="modal-content-wrapper" class="w-full md:max-w-4xl bg-slate-50 flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-0 md:scale-95 md:opacity-0 h-full md:h-auto md:max-h-[90vh] md:rounded-3xl overflow-hidden shadow-2xl relative">
            ${e}
            <div class="flex-grow overflow-y-auto p-4 md:p-6 custom-scrollbar bg-slate-50/50 flex flex-col pb-24">
                
                <div class="relative mb-5 flex-shrink-0 w-full">
                    <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg"></i>
                    <input type="search" id="item-search-input" placeholder="Pesquisar produto ou serviço..." class="w-full pl-12 p-3.5 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white transition-colors shadow-sm font-bold text-slate-700">
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 flex-grow overflow-y-auto w-full pb-8">
                    <div class="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                        <h4 class="font-black mb-4 text-center text-xs uppercase tracking-widest text-indigo-600 bg-indigo-50 py-2.5 rounded-xl border border-indigo-100"><i class="bi bi-scissors mr-1 text-sm"></i> Serviços</h4>
                        <div id="catalog-service-list" class="space-y-3 flex-grow overflow-y-auto custom-scrollbar pr-2"></div>
                    </div>
                    <div class="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                        <h4 class="font-black mb-4 text-center text-xs uppercase tracking-widest text-emerald-600 bg-emerald-50 py-2.5 rounded-xl border border-emerald-100"><i class="bi bi-box-seam mr-1 text-sm"></i> Produtos</h4>
                        <div id="catalog-product-list" class="space-y-3 flex-grow overflow-y-auto custom-scrollbar pr-2"></div>
                    </div>
                </div>

            </div>
        </div>
    `;let a;const s=(o="")=>{const i=o.toLowerCase(),n={service:'<i class="bi bi-scissors text-indigo-600 text-lg"></i>',product:'<i class="bi bi-box-seam text-emerald-600 text-lg"></i>'},l={"catalog-service-list":{items:B.catalogForModal.services,type:"service"},"catalog-product-list":{items:B.catalogForModal.products,type:"product"}};Object.entries(l).forEach(([d,{items:u,type:c}])=>{const p=t.querySelector("#"+d);if(!p)return;const b=u.filter(y=>y.name.toLowerCase().includes(i)).slice(0,50),g=c==="service"?"hover:border-indigo-400 hover:bg-indigo-50/80 hover:shadow-md":"hover:border-emerald-400 hover:bg-emerald-50/80 hover:shadow-md",v=c==="service"?"bg-indigo-100 border-indigo-200 shadow-sm":"bg-emerald-100 border-emerald-200 shadow-sm";p.innerHTML=b.map(y=>y.id?`
                <button data-action="select-catalog-item" data-item-type="${c}" data-item-id="${y.id}" class="flex items-center gap-4 w-full p-3 bg-white border border-slate-200 rounded-2xl ${g} shadow-sm transition-all duration-300 text-left group active:scale-95">
                    <div class="flex-shrink-0 w-12 h-12 rounded-xl ${v} flex items-center justify-center border group-hover:scale-110 transition-transform">${n[c]}</div>
                    <div class="flex-grow min-w-0">
                        <span class="block text-sm font-black text-slate-800 truncate group-hover:text-indigo-900 transition-colors">${h(y.name)}</span>
                        <span class="block font-black text-xs text-slate-500 mt-1">${ct(y.price)}</span>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors shadow-inner flex-shrink-0">
                        <i class="bi bi-plus-lg text-slate-400 group-hover:text-white transition-colors"></i>
                    </div>
                </button>
            `:"").join("")||'<div class="flex flex-col items-center justify-center py-8 text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-slate-50"><i class="bi bi-inbox text-3xl mb-2"></i><p class="text-[10px] font-bold uppercase tracking-widest">Nenhum resultado</p></div>'})};s();const r=t.querySelector("#item-search-input");r&&(r.addEventListener("input",o=>{clearTimeout(a),a=setTimeout(()=>s(o.target.value),300)}),setTimeout(()=>r.focus(),100)),requestAnimationFrame(()=>{const o=t.querySelector("#modal-content-wrapper");o&&(o.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),o.classList.add("translate-y-0","md:scale-100","md:opacity-100"))})}function Ac(){We&&(Fe.removeEventListener("click",We),Fe.removeEventListener("input",We),Fe.removeEventListener("change",We)),We=async e=>{if(e.target.classList.contains("item-checkbox")){const i=e.target.value;e.target.checked?B.selectedIds.add(i):B.selectedIds.delete(i),wt(),Ye(),e.stopPropagation();return}if(e.target.id==="packages-layout-detail"){aa(),B.viewMode="list",B.tempPackage=null;return}if(e.target.closest("#batch-delete-btn")){const i=B.selectedIds.size;if(i===0)return;if(await Y("Excluir Pacotes",`Deseja realmente apagar ${i} pacotes selecionados?`))try{const l=Array.from(B.selectedIds).map(d=>Fs(d));await Promise.all(l),f("Sucesso",`${i} pacote(s) excluído(s).`,"success"),B.selectedIds.clear(),wt(),await ma()}catch{f("Erro","Ocorreu um erro ao excluir pacotes.","error")}return}if(e.target.closest("#cancel-selection-btn")){B.selectedIds.clear();const i=document.getElementById("select-all-toggle");i&&(i.checked=!1),wt(),Ye();return}const r=e.target.closest("[data-action]");if(!r)return;switch(r.dataset.action){case"new-package":navigator.vibrate&&navigator.vibrate(20),to(null);break;case"edit-package":navigator.vibrate&&navigator.vibrate(15);const i=r.dataset.id,n=B.allPackages.find(k=>k.id===i);n&&to(n);break;case"delete-package":e.stopPropagation(),e.preventDefault();const l=r.dataset.id;if(await Y("Excluir Pacote","Tem a certeza que deseja excluir este pacote promocional? Esta ação é irreversível."))try{await Fs(l),f("Sucesso!","Pacote excluído.","success"),B.viewMode==="edit-package"&&B.tempPackage?.id===l&&(aa(),B.viewMode="list"),await ma()}catch(k){f("Erro",`Não foi possível excluir: ${k.message}`,"error")}break;case"back-to-main":aa(),B.viewMode="list",B.tempPackage=null;break;case"add-item-to-package-btn":Cc(),Mc();break;case"back-to-editor":is();break;case"select-catalog-item":navigator.vibrate&&navigator.vibrate(10);const{itemType:u,itemId:c}=r.dataset,b=(B.catalogForModal[u+"s"]||[]).find(k=>k.id===c);if(b){const k=B.tempPackage.items.find(T=>T.id===b.id&&T.type===u);k?k.quantity++:B.tempPackage.items.push({...b,type:u,quantity:1}),is()}break;case"remove-item":navigator.vibrate&&navigator.vibrate(10);const g=parseInt(r.dataset.index,10);B.tempPackage.items.splice(g,1),rs();break;case"toggle-all-ests":const v=document.querySelectorAll(".modal-est-checkbox"),y=Array.from(v).every(k=>k.checked);v.forEach(k=>k.checked=!y);break;case"save-package":await qc(r);break}},Fe.addEventListener("click",We),Fe.addEventListener("input",e=>{e.target.id==="search-packages"&&(B.searchQuery=e.target.value,Ye()),e.target.id==="finalPrice"&&Dr()}),Fe.addEventListener("change",e=>{if(e.target.id==="select-all-toggle"){const a=e.target.checked;B.selectedIds.clear(),a&&B.allPackages.forEach(s=>B.selectedIds.add(s.id)),wt(),Ye()}if(e.target.id==="filter-status"&&(B.statusFilter=e.target.value,Ye()),e.target.classList.contains("quantity-input")){const a=parseInt(e.target.dataset.index,10),s=parseInt(e.target.value,10);s>0&&B.tempPackage.items[a]&&(B.tempPackage.items[a].quantity=s,rs())}});const t=document.getElementById("export-excel-btn");t&&t.addEventListener("click",Bc)}async function qc(t){const e=B.tempPackage,a=!!e.id,s=document.getElementById("packages-layout-detail");if(!s)return;const r=Array.from(s.querySelectorAll(".modal-est-checkbox:checked")).map(l=>l.value);if(r.length===0){f("Atenção","Selecione pelo menos uma unidade para o pacote.","warning");return}const o=e.items.reduce((l,d)=>l+d.price*d.quantity,0),i={id:e.id||null,companyId:m.companyId,name:s.querySelector("#packageName").value,description:s.querySelector("#packageDescription").value,status:s.querySelector("#packageStatus").value,items:e.items,originalPrice:o,price:parseFloat(s.querySelector("#finalPrice").value),commissionRate:parseFloat(s.querySelector("#commissionRate").value)||0,validityDays:parseInt(s.querySelector("#validityDays").value,10)||null,sellStartDate:s.querySelector("#sellStartDate").value||null,sellEndDate:s.querySelector("#sellEndDate").value||null,salesLimit:parseInt(s.querySelector("#salesLimit").value,10)||null,establishmentIds:r,establishmentId:r[0]};if(!i.name||isNaN(i.price)){f("Erro","Nome do Pacote e Preço Final são obrigatórios.","warning");return}if(i.items.length===0){f("Erro","Adicione pelo menos um serviço ou produto ao pacote.","warning");return}const n=t.innerHTML;t.disabled=!0,t.innerHTML='<div class="loader-small border-white mr-2"></div> Salvando...';try{a?await Mn(i.id,i):(delete i.id,await Bn(i)),f("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),aa(),B.viewMode="list",B.tempPackage=null,await ma()}catch(l){f("Erro",`Não foi possível salvar o pacote: ${l.message}`,"error"),t.disabled=!1,t.innerHTML=n}}const jc=document.getElementById("content");async function Nc(){const t=ge.currentUser;if(!t)return;let e={};try{const l=await ls(qe(fe,"users",t.uid));l.exists()&&(e=l.data())}catch(l){console.error("Erro ao buscar usuário",l)}let a=null;if(m.userProfessionalId)try{a=await ho(m.userProfessionalId)}catch(l){console.error("Erro ao buscar profissional",l)}const s=h(e.name||t.displayName||"Usuário"),r=h(t.email||"E-mail não disponível"),o=h(e.phone||"");let i=e.photo||"";a&&a.photo&&(i=a.photo);const n=i||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(s.charAt(0))}`;jc.innerHTML=`
        <div class="max-w-5xl mx-auto space-y-6 p-4 md:p-6 pb-24">
            
            <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between animate-fade-in-down">
                <h2 class="text-base md:text-xl font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <i class="bi bi-person-badge text-indigo-600 text-2xl"></i> Configurações do Meu Perfil
                </h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-1 space-y-6 animate-fade-in">
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center relative overflow-hidden">
                        
                        <div class="relative inline-block group cursor-pointer mb-4" id="profile-photo-wrapper">
                            <img id="profile-avatar" src="${n}" class="w-32 h-32 rounded-full object-cover border-4 border-indigo-50 shadow-md transition-all group-hover:brightness-75">
                            <div class="absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                <i class="bi bi-camera-fill text-white text-3xl"></i>
                            </div>
                            <input type="file" id="profile-photo-input" class="hidden" accept="image/*">
                        </div>
                        
                        <h3 class="text-lg font-black text-slate-800 truncate px-2" id="display-name">${s}</h3>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5 truncate px-2">${r}</p>
                        
                        ${a?'<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm mb-4"><i class="bi bi-check-circle-fill"></i> Perfil Profissional Ativo</span>':""}

                        <form id="form-user-details" class="text-left space-y-4 border-t border-slate-100 pt-5 mt-2">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome Completo</label>
                                <input type="text" id="input-name" value="${s}" required class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner transition-colors">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Telefone / WhatsApp</label>
                                <input type="tel" id="input-phone" value="${o}" placeholder="(00) 00000-0000" class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner transition-colors">
                            </div>
                            <button type="submit" class="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-wider hover:bg-indigo-700 transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2">
                                <i class="bi bi-save2"></i> Salvar Alterações
                            </button>
                        </form>
                    </div>
                </div>

                <div class="lg:col-span-2 space-y-6 animate-fade-in" id="professional-section">
                    </div>
            </div>
        </div>
    `,Rc(t),Fc(a)}function Rc(t,e){const a=document.getElementById("profile-photo-wrapper"),s=document.getElementById("profile-photo-input"),r=document.getElementById("profile-avatar"),o=document.getElementById("form-user-details");a.addEventListener("click",()=>s.click()),s.addEventListener("change",async i=>{const n=i.target.files[0];if(n)try{const l=await wa(n,800,800,.8);r.src=l,await Bt(qe(fe,"users",t.uid),{photo:l}),m.userProfessionalId&&await Oa(m.userProfessionalId,{photo:l}),window.dispatchEvent(new CustomEvent("userPhotoUpdated",{detail:l})),f("Sucesso!","Sua foto de perfil foi atualizada.","success")}catch{f("Erro","Não foi possível salvar a imagem. Tente uma menor.","error")}}),o.addEventListener("submit",async i=>{i.preventDefault();const n=o.querySelector("button"),l=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> Salvando...';const d=document.getElementById("input-name").value.trim(),u=document.getElementById("input-phone").value.trim();try{await Bt(qe(fe,"users",t.uid),{name:d,phone:u}),m.userProfessionalId&&await Oa(m.userProfessionalId,{name:d,phone:u}),m.userName=d,document.getElementById("display-name").textContent=d,f("Atualizado!","Seus dados foram salvos com sucesso.","success")}catch{f("Erro","Ocorreu um problema na hora de salvar.","error")}finally{n.disabled=!1,n.innerHTML=l}})}function Fc(t){const e=document.getElementById("professional-section");if(!t){e.innerHTML=`
            <div class="bg-white p-10 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center h-full">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                    <i class="bi bi-calendar-x text-3xl text-slate-300"></i>
                </div>
                <h3 class="text-base font-black text-slate-800 mb-2">Bloqueio de Agenda Indisponível</h3>
                <p class="text-xs text-slate-500 max-w-sm">Seu usuário não está vinculado a um perfil profissional. Peça ao administrador para realizar o vínculo na aba de Usuários se você precisa gerir agendas.</p>
            </div>
        `;return}e.innerHTML=`
        <div class="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div class="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div class="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-inner"><i class="bi bi-calendar-x text-xl"></i></div>
                <div>
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider">Meus Bloqueios / Pausas</h3>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lance horários que não estará disponível.</p>
                </div>
            </div>

            <form id="form-my-blockage" class="bg-orange-50/40 p-4 md:p-5 rounded-2xl border border-orange-100 mb-8 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Data Início</label><input type="date" id="b-date-start" required class="w-full p-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none shadow-inner"></div>
                    <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Data Fim (Opcional)</label><input type="date" id="b-date-end" class="w-full p-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none shadow-inner"></div>
                    <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Hora Início</label><input type="time" id="b-time-start" required class="w-full p-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none shadow-inner"></div>
                    <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Hora Fim</label><input type="time" id="b-time-end" required class="w-full p-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none shadow-inner"></div>
                </div>
                <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Motivo / Descrição</label><input type="text" id="b-reason" placeholder="Ex: Férias, Consulta Médica..." class="w-full p-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none shadow-inner"></div>
                <button type="submit" class="w-full py-3.5 mt-2 bg-orange-500 text-white rounded-xl font-black text-xs uppercase tracking-wider hover:bg-orange-600 transition-transform active:scale-95 shadow-md">Criar Bloqueio</button>
            </form>

            <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
                <h4 class="text-sm font-black text-slate-800 uppercase tracking-wider">Histórico da Agenda</h4>
                <select id="my-blocks-filter" class="p-2 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm">
                    <option value="future">Somente Futuros</option>
                    <option value="history">Registos Passados</option>
                </select>
            </div>
            
            <div id="my-blocks-list" class="space-y-3 max-h-[380px] overflow-y-auto custom-scrollbar pr-2 pb-4">
                <div class="loader mx-auto mt-6"></div>
            </div>
        </div>
    `;const a=document.getElementById("form-my-blockage");a.addEventListener("submit",async r=>{r.preventDefault();const o=a.querySelector("#b-date-start").value,i=a.querySelector("#b-date-end").value||o,n=a.querySelector("#b-time-start").value,l=a.querySelector("#b-time-end").value,d=a.querySelector("#b-reason").value;if(!o||!n||!l)return f("Atenção","Preencha Data e Horários corretamente.","error");const u=new Date(`${o}T${n}:00`),c=new Date(`${i}T${l}:00`);if(c<=u)return f("Atenção","A data e hora de fim deve ser superior ao início.","warning");const p=a.querySelector('button[type="submit"]'),b=p.innerHTML;p.disabled=!0,p.innerHTML="A bloquear...";try{await $a({establishmentId:m.establishmentId,professionalId:t.id,reason:d||"Indisponível",startTime:u.toISOString(),endTime:c.toISOString()}),f("Sucesso","Agenda bloqueada com êxito.","success"),a.reset();const g=document.getElementById("my-blocks-filter").value;sa(t.id,g)}catch(g){f("Erro",`Falha ao bloquear: ${g.message}`,"error")}finally{p.disabled=!1,p.innerHTML=b}}),document.getElementById("my-blocks-filter").addEventListener("change",r=>sa(t.id,r.target.value)),sa(t.id,"future")}async function sa(t,e="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<div class="loader mx-auto mt-6"></div>';try{const s=new Date;let r,o;e==="history"?(o=new Date,r=new Date,r.setFullYear(r.getFullYear()-1)):(r=new Date,o=new Date,o.setFullYear(o.getFullYear()+1));let n=(await ka(m.establishmentId,r.toISOString(),o.toISOString(),t)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));if(e==="history"?n=n.filter(l=>l.endTime<s).sort((l,d)=>d.startTime-l.startTime):n=n.filter(l=>l.endTime>=s).sort((l,d)=>l.startTime-d.startTime),n.length===0){a.innerHTML=`
                <div class="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <i class="bi bi-info-circle text-2xl text-slate-300 mb-2 block"></i>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhum registo ${e==="history"?"no passado":"futuro"}.</p>
                </div>
            `;return}a.innerHTML=n.map(l=>{const d=l.endTime<new Date,u=h(l.reason||"Bloqueio");return`
                <div class="flex justify-between items-center p-3 ${d?"bg-slate-50 border-slate-200 opacity-80":"bg-white border-slate-200 hover:border-orange-200 hover:shadow-sm"} border rounded-xl transition-all">
                    <div class="flex items-center gap-3">
                        <div class="${d?"bg-slate-200 text-slate-500 border-slate-300":"bg-orange-50 text-orange-600 border-orange-100"} border w-12 h-12 rounded-xl flex flex-col items-center justify-center leading-none shadow-inner flex-shrink-0">
                            <span class="font-black text-base">${l.startTime.getDate().toString().padStart(2,"0")}</span>
                            <span class="text-[9px] uppercase font-bold">${l.startTime.toLocaleString("pt-BR",{month:"short"})}</span>
                        </div>
                        <div>
                            <p class="text-xs font-black text-slate-700 mb-0.5">
                               ${l.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} <span class="text-slate-400 font-medium">até</span> ${l.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}
                            </p>
                            ${l.startTime.getDate()!==l.endTime.getDate()?`<p class="text-[10px] text-slate-400 font-bold mb-0.5">Termina: ${l.endTime.toLocaleDateString("pt-BR")}</p>`:""}
                            <p class="text-[9px] font-bold ${d?"text-slate-500":"text-orange-500"} uppercase tracking-widest"><i class="bi bi-tag-fill mr-1"></i>${u}</p>
                        </div>
                    </div>
                    <button data-block-id="${l.id}" class="remove-block-btn text-slate-400 hover:text-red-500 w-8 h-8 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center" title="Apagar bloqueio">
                        <i class="bi bi-trash3 pointer-events-none text-lg"></i>
                    </button>
                </div>
            `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(l=>{l.addEventListener("click",async d=>{const u=d.currentTarget.dataset.blockId;if(confirm("Deletar e deixar a agenda livre neste horário?"))try{await bs(u),f("Removido","O bloqueio foi deletado.","success"),sa(t,e)}catch(c){f("Erro",`Não foi possível remover: ${c.message}`,"error")}})})}catch(s){a.innerHTML=`<p class="text-xs text-red-500 font-bold p-3 bg-red-50 rounded-xl">Erro: ${h(s.message)}</p>`}}let so=!1;async function ga(t){if(!t)return;t.innerHTML=`
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
    `;const e=document.getElementById("hierarchy-list-container"),a=document.getElementById("est-parent");try{const r=(await ye()).matrizes||[];if(a&&(a.innerHTML='<option value="">Nenhuma (Criar como Matriz Independente)</option>'),r.length===0)e.innerHTML=`
                <div class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
                    <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="bi bi-building-add text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">A sua rede está vazia</h3>
                    <p class="text-gray-500 max-w-md mx-auto mb-6">Comece por criar a sua primeira Matriz ou Loja principal para expandir o seu negócio.</p>
                </div>
            `;else{let o="";r.forEach(i=>{if(a&&!i.isOrphanBranch){const l=document.createElement("option");l.value=i.id,l.textContent=i.name,a.appendChild(l)}const n=i.isMatriz||!i.parentId?'<span class="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">📍 UNIDADE</span>';o+=`
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
                `,i.branches&&i.branches.length>0?i.branches.forEach(l=>{o+=`
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
                `}),e.innerHTML=o}so||(Hc(),so=!0)}catch(s){console.error("Erro na renderização da rede:",s),e.innerHTML=`
            <div class="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100 text-center">
                <i class="bi bi-exclamation-triangle text-2xl mb-2 block"></i>
                <p class="font-bold text-sm">Não foi possível carregar a estrutura organizacional.</p>
            </div>
        `}}function Hc(){const t=document.getElementById("form-create-establishment");t&&t.addEventListener("submit",async e=>{e.preventDefault();const a=t.querySelector('button[type="submit"]'),s=a.innerHTML;a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...',a.disabled=!0;const r={name:document.getElementById("est-name").value.trim(),cnpj:document.getElementById("est-cnpj").value.trim(),parentId:document.getElementById("est-parent").value||null,timezone:document.getElementById("est-timezone").value};try{const o=await pi(r);alert(o.message||"Sucesso!"),t.reset();const i=document.getElementById("modal-create-establishment"),n=window.bootstrap?.Modal.getInstance(i);n&&n.hide(),await ga(document.getElementById("content"))}catch(o){console.error("Erro ao criar estabelecimento:",o),alert("Erro: "+(o.message||"Falha ao gravar dados."))}finally{a.innerHTML=s,a.disabled=!1}})}window.loadAndRenderHierarchy=()=>ga(document.getElementById("content"));document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("gesturestart",e=>e.preventDefault()),document.addEventListener("gesturechange",e=>e.preventDefault()),document.addEventListener("gestureend",e=>e.preventDefault());let t=0;document.addEventListener("touchend",function(e){const a=new Date().getTime();a-t<=300&&e.preventDefault(),t=a},!1)});const de=document.getElementById("loadingScreen"),ft=document.getElementById("dashboardContent"),et=document.getElementById("content"),ja=document.getElementById("notificationBell"),Yt=document.getElementById("notificationBadge"),Je=document.getElementById("notificationPanel"),Na=document.getElementById("notificationList"),Le=document.getElementById("profileMenuButton"),pe=document.getElementById("profileDropdown"),oo=document.getElementById("profileName"),ro=document.getElementById("profileEmail"),io=document.getElementById("logoutButton"),no=document.getElementById("myProfileLink"),lo=document.getElementById("hamburger-menu-btn"),ue=document.getElementById("sidebar"),he=document.getElementById("mobile-overlay"),co=document.getElementById("themeToggleBtn"),Ra=document.getElementById("themeIcon"),ns=document.getElementById("mobile-bottom-nav"),uo=document.getElementById("nav-scroll"),Oc=document.querySelectorAll(".bottom-nav-item");function zc(){if(!uo)return;const t=document.querySelector(".bottom-nav-item.active");if(!t)return;const e=uo,a=e.getBoundingClientRect(),s=t.getBoundingClientRect(),o=s.left+s.width/2-a.left-a.width/2;e.scrollBy({left:o,behavior:"smooth"})}const Vc={"dashboard-section":en,"agenda-section":zo,"comandas-section":Yn,"relatorios-section":Zn,"servicos-section":dl,"produtos-section":El,"suppliers-section":Nl,"profissionais-section":Wl,"clientes-section":sd,"estabelecimento-section":t=>fr(t),"ausencias-section":Md,"users-section":ua,"sales-report-section":Qd,"financial-section":Zd,"commissions-section":uc,"packages-section":Dc,"my-profile-section":Nc,"hierarquia-section":()=>ga(et),"establishments-section":()=>ga(et)},_c={"dashboard-section":"Dashboard","agenda-section":"Agenda","comandas-section":"Comandas / PDV","relatorios-section":"Relatórios","servicos-section":"Serviços","produtos-section":"Estoque","suppliers-section":"Parceiros","profissionais-section":"Equipe","clientes-section":"Clientes","estabelecimento-section":"Empresa","ausencias-section":"Ausências","users-section":"Usuários","sales-report-section":"Relatório de Vendas","financial-section":"Financeiro","commissions-section":"Comissões","packages-section":"Pacotes","my-profile-section":"Meu Perfil","hierarquia-section":"Rede / Filiais","establishments-section":"Rede / Filiais"};function oa(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("kairos_theme",t),Ra&&(t==="dark"?Ra.className="bi bi-sun-fill text-lg sm:text-xl text-amber-400":Ra.className="bi bi-moon-fill text-lg sm:text-xl text-slate-500")}function Uc(){const t=localStorage.getItem("kairos_theme"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;oa(t||(e?"dark":"light"))}let Tt=null,Pt=[];function Tr(){if(!Yt||!Na)return;const t=Pt.filter(e=>!e.read).length;if(t>0?(Yt.textContent=t,Yt.classList.remove("hidden")):Yt.classList.add("hidden"),Pt.length===0){Na.innerHTML='<p class="text-center text-slate-500 p-4 text-sm">Nenhuma notificação.</p>';return}Na.innerHTML=Pt.map(e=>`
    <div class="notification-item ${e.read?"":"unread"}">
        <p class="font-semibold text-sm text-slate-800">${e.title}</p>
        <p class="text-xs text-slate-600 mt-0.5">${e.message}</p>
        <p class="text-[10px] text-slate-400 mt-1"><i class="bi bi-clock mr-1"></i>${e.time}</p>
    </div>
    `).join("")}function po(t){Tt&&Tt();const e=fa(fe,"establishments",t,"notifications"),a=go(e,fo("timestamp",">=",new Date),_r("timestamp","desc"));Tt=Ur(a,s=>{s.docChanges().forEach(r=>{if(r.type==="added"){const o=r.doc.data();Pt.unshift({title:o.title,message:o.message,time:o.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),f(o.title,o.message,"info",!0),Tr();const i=document.querySelector(".sidebar-link.active");i&&i.dataset.target==="agenda-section"&&zo()}})},s=>{console.error("Erro no listener de notificações:",s)})}async function Wc(t){const e=document.getElementById("multi-context-container"),a=document.getElementById("multi-context-btn"),s=document.getElementById("multi-context-label"),r=document.getElementById("multi-context-count"),o=document.getElementById("multi-context-list"),i=document.getElementById("multi-context-apply"),n=document.getElementById("multi-context-dropdown"),l=document.getElementById("multi-context-arrow");if(!(!e||!o))try{const u=(await ye()).matrizes||[];let c="",p=0;if(u.forEach(b=>{c+=`
                <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors mb-1">
                    <input type="checkbox" value="${b.id}" class="context-checkbox" data-name="${Xt(b.name)}">
                    <span class="text-[13px] sm:text-sm font-bold text-slate-700 truncate">🏢 ${Xt(b.name)}</span>
                </label>
            `,p++,b.branches&&b.branches.length>0&&b.branches.forEach(g=>{c+=`
                        <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors ml-4 mb-1 border-l-2 border-slate-100 pl-3">
                            <input type="checkbox" value="${g.id}" class="context-checkbox" data-name="${Xt(g.name)}">
                            <span class="text-[12px] sm:text-[13px] font-medium text-slate-600 truncate">📍 ${Xt(g.name)}</span>
                        </label>
                    `,p++})}),p>0){o.innerHTML=c,e.style.display="block",(!m.selectedEstablishments||m.selectedEstablishments.length===0)&&(m.selectedEstablishments=[t]);const b=Array.from(o.querySelectorAll('input[type="checkbox"]')),g=()=>{const y=b.filter(k=>k.checked);r.textContent=y.length,y.length===0?s.textContent="Nenhuma selecionada":y.length===1?s.textContent=y[0].dataset.name:s.textContent=`${y.length} Unidades`};let v=!1;b.forEach(y=>{m.selectedEstablishments.includes(y.value)&&(y.checked=!0,v=!0)}),!v&&b.length>0&&(b[0].checked=!0,m.selectedEstablishments=[b[0].value],m.establishmentId=b[0].value),g(),a.addEventListener("click",y=>{y.stopPropagation(),n.classList.toggle("hidden"),l.style.transform=n.classList.contains("hidden")?"rotate(0deg)":"rotate(180deg)"}),document.addEventListener("click",y=>{!e.contains(y.target)&&!n.classList.contains("hidden")&&(n.classList.add("hidden"),l.style.transform="rotate(0deg)",b.forEach(k=>{k.checked=m.selectedEstablishments.includes(k.value)}),g())}),b.forEach(y=>y.addEventListener("change",g)),i.addEventListener("click",async y=>{y.stopPropagation(),de&&(de.classList.remove("hidden","fade-out"),de.style.display="flex");const k=b.filter(P=>P.checked);if(k.length===0){de&&(de.classList.add("fade-out"),setTimeout(()=>{de.style.display="none"},500)),f("Atenção","Selecione pelo menos uma unidade.","warning");return}m.selectedEstablishments=k.map(P=>P.value);const T=m.selectedEstablishments[0];try{const P=await je(T);m.establishmentId=T,m.establishmentName=P.name,m.enabledModules=P.modules,m.currentViewContext={id:T,name:P.name,type:P.parentId?"BRANCH":"GROUP"},po(T),bo(m.userPermissions),n.classList.add("hidden"),l.style.transform="rotate(0deg)",f("Ambiente Atualizado","Exibindo dados consolidados.","success");const S=document.querySelector(".sidebar-link.active"),L=S?S.getAttribute("data-target"):"dashboard-section";se(L)}catch{f("Erro","Problema ao trocar a visualização.","error")}finally{de&&(de.classList.add("fade-out"),setTimeout(()=>{de.style.display="none"},500))}});try{const y=await je(m.establishmentId);m.establishmentName=y.name,m.enabledModules=y.modules,m.currentViewContext={id:m.establishmentId,name:y.name,type:y.parentId?"BRANCH":"GROUP"},po(m.establishmentId),bo(m.userPermissions)}catch{}}else e.style.display="none"}catch{e.style.display="none"}}function se(t,e={}){const a=t.replace("-section","");if(t!=="my-profile-section"){const r=["hierarquia-section","establishments-section","estabelecimento-section","dashboard-section"].includes(t),o=m.enabledModules?.[a]!==!1,i=m.userPermissions===null||m.userPermissions[t]?.view===!0;if(!r&&(!o||!i)){et&&(et.innerHTML='<div class="p-8 text-center mt-10"><i class="bi bi-shield-lock text-5xl text-rose-500 mb-4 block"></i><h2 class="text-2xl font-bold text-slate-800">Acesso Negado</h2><p class="text-slate-500 mt-2">Você não possui permissão para visualizar esta tela.</p></div>'),document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active")),ue&&ue.classList.contains("absolute")&&(ue.classList.add("hidden"),he&&he.classList.add("hidden"));return}}const s=Vc[t];if(s&&et){const r=document.getElementById("header-page-title");r&&(r.textContent=_c[t]||"Painel"),document.querySelectorAll(".sidebar-link").forEach(o=>{o.classList.toggle("active",o.getAttribute("data-target")===t)}),ns&&(Oc.forEach(o=>{o.classList.toggle("active",o.getAttribute("data-target")===t)}),setTimeout(zc,50)),t==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(o=>o.classList.remove("active")),et.innerHTML="",window.innerWidth<768&&ue&&(ue.classList.add("hidden"),he&&he.classList.add("hidden")),s(e)}}window.navigateTo=se;async function bo(t){const e=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),s=document.getElementById("kpi-today-appointments"),r=document.getElementById("kpi-today-revenue"),o=t===null||t["agenda-section"]?.view===!0,i=t===null||t["financial-section"]?.view===!0;if(o&&e&&(e.classList.remove("hidden"),e.classList.add("inline-flex")),i&&a&&(a.classList.remove("hidden"),a.classList.add("inline-flex")),!(!o&&!i))try{const n=await $o();o&&s&&(s.textContent=n.todayAppointments.toString()),i&&r&&(r.textContent=`R$ ${n.todayRevenue.toFixed(2).replace(".",",")}`)}catch{}}async function Jc(t){try{Se.getPlatform()==="android"&&await ce.createChannel({id:"default",name:"Notificações",description:"Alertas",importance:5,visibility:1,vibration:!0});let e=await ce.checkPermissions();if(e.receive==="prompt"&&(e=await ce.requestPermissions()),e.receive!=="granted")return;await ce.register(),ce.addListener("registration",async a=>{try{const s=qe(fe,"users",t);await Bt(s,{fcmTokens:Vr(a.value),platform:"native_mobile"})}catch{}}),ce.addListener("pushNotificationReceived",a=>f(a.title,a.body,"info",!0)),ce.addListener("pushNotificationActionPerformed",()=>se("agenda-section"))}catch{}}function Gc(){const t=document.getElementById("exitConfirmationModal"),e=document.getElementById("btn-cancel-exit"),a=document.getElementById("btn-confirm-exit"),s=()=>t&&(t.style.display="block"),r=()=>t&&(t.style.display="none"),o=()=>t&&t.style.display==="block";t&&(e.addEventListener("click",()=>{r(),Se.isNativePlatform()||history.pushState(null,document.title,location.href)}),a.addEventListener("click",()=>{r(),Se.isNativePlatform()?Ms.exitApp():history.back()}),Se.isNativePlatform()?Ms.addListener("backButton",()=>{if(o())r();else{const i=document.querySelectorAll('.modal[style*="display: block"]'),n=Array.from(i).filter(d=>d.id!=="exitConfirmationModal");if(n.length>0){n.forEach(d=>d.style.display="none");return}if(ue&&!ue.classList.contains("hidden")&&window.innerWidth<768){ue.classList.add("hidden"),he&&he.classList.add("hidden");return}const l=document.querySelector(".sidebar-link.active");l&&l.getAttribute("data-target")==="dashboard-section"?s():se("dashboard-section")}}):(history.pushState(null,document.title,location.href),window.addEventListener("popstate",()=>{if(o()){r(),history.pushState(null,document.title,location.href);return}const i=document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display: flex"]'),n=Array.from(i).filter(d=>d.id!=="exitConfirmationModal");if(n.length>0){n.forEach(d=>d.style.display="none"),history.pushState(null,document.title,location.href);return}const l=document.querySelector(".sidebar-link.active");l&&l.getAttribute("data-target")==="dashboard-section"?s():(se("dashboard-section"),history.pushState(null,document.title,location.href))})))}function Xt(t){return t?t.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}async function Qc(){try{await jr(ge,Nr)}catch{}Se.isNativePlatform()&&document.body.classList.add("is-app-native"),ri(),Gc(),Uc(),co&&co.addEventListener("click",t=>{t.preventDefault();const e=document.documentElement.getAttribute("data-theme")||"light";oa(e==="dark"?"light":"dark")}),lo&&lo.addEventListener("click",t=>{t.stopPropagation(),ue&&(ue.classList.remove("hidden"),ue.classList.add("absolute","inset-y-0","left-0","z-40","shadow-xl")),he&&he.classList.remove("hidden")}),ns&&ns.addEventListener("click",t=>{const e=t.target.closest(".bottom-nav-item");if(!e)return;t.preventDefault();const a=e.getAttribute("data-target");se(a)}),he&&he.addEventListener("click",()=>{ue&&(ue.classList.add("hidden"),ue.classList.remove("absolute","inset-y-0","left-0","z-40","shadow-xl")),he.classList.add("hidden")}),ja&&ja.addEventListener("click",t=>{t.stopPropagation(),Je&&(Je.classList.toggle("hidden"),Je.classList.contains("hidden")||(Pt.forEach(e=>e.read=!0),Tr()))}),Le&&Le.addEventListener("click",t=>{t.stopPropagation(),pe&&(pe.classList.toggle("active"),pe.classList.contains("active")?pe.classList.remove("hidden"):setTimeout(()=>pe.classList.add("hidden"),200))}),no&&no.addEventListener("click",t=>{t.preventDefault(),se("my-profile-section"),pe&&(pe.classList.remove("active"),pe.classList.add("hidden"))}),window.addEventListener("userPhotoUpdated",t=>{const e=t.detail;Le&&e&&(Le.innerHTML=`<img src="${e}" alt="Avatar" class="w-full h-full rounded-full object-cover">`)}),document.addEventListener("click",t=>{Je&&!Je.contains(t.target)&&t.target!==ja&&Je.classList.add("hidden"),pe&&!pe.contains(t.target)&&t.target!==Le&&pe.classList.contains("active")&&(pe.classList.remove("active"),setTimeout(()=>pe.classList.add("hidden"),200))}),Rr(ge,async t=>{if(t){if(!Se.isNativePlatform()&&(Bi(),"Notification"in window&&Notification.permission==="default")){const e=document.getElementById("toast-notification-request"),a=document.getElementById("btn-enable-toast");e&&setTimeout(()=>{e.style.display="block"},3500),a&&a.addEventListener("click",async()=>{await Mi()&&e&&(e.style.display="none")});const s=()=>{e&&(e.style.display="none")},r=document.getElementById("btn-deny-toast"),o=document.getElementById("btn-close-toast");r&&r.addEventListener("click",s),o&&o.addEventListener("click",s)}try{const a=(await t.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="admin"||a.role==="employee")&&a.establishmentId){let s=null,r=t.displayName,o=null,i=null;const n=qe(fe,"users",t.uid),l=await ls(n);if(l.exists()){const u=l.data();s=a.role==="employee"?u.permissions||{}:null,r=u.name||r,o=u.professionalId||null,i=u.photo||null}if(m.userProfessionalId=o,o&&!i)try{const u=await ho(o);u&&u.photo&&(i=u.photo)}catch{}Se.isNativePlatform()&&Jc(t.uid);const d=r||t.email;Gr(a.establishmentId,"Carregando...",s),i?Le&&(Le.innerHTML=`<img src="${i}" class="w-full h-full rounded-full object-cover">`):Le&&(Le.textContent=d.charAt(0).toUpperCase()),oo&&(oo.textContent=d),ro&&(ro.textContent=t.email),io&&io.addEventListener("click",u=>{u.preventDefault(),Tt&&Tt(),Fr(ge).then(()=>window.location.href="/login.html")}),await Wc(a.establishmentId),ui(se,s,m.enabledModules),de&&(de.classList.add("fade-out"),setTimeout(()=>{de.style.display="none"},500)),ft&&(ft.style.display="flex"),setTimeout(()=>{hi()},1500),se("dashboard-section")}else throw new Error("Permissão ou estabelecimento não configurado.")}catch(e){de&&(de.style.display="none"),ft&&(ft.innerHTML=`<div class="w-full h-full flex flex-col items-center justify-center p-4 text-center"><i class="bi bi-x-circle text-5xl text-rose-500 mb-4"></i><h2 class="text-xl font-bold">Erro de Acesso</h2><p class="text-slate-500 mt-2">${e.message}</p></div>`,ft.style.display="flex")}}else window.location.href="/login.html"})}Qc();export{yo as W};
