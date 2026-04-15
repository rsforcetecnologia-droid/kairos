const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-DcY0fbnT.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/firebase-config-C2tbVz-J.js","assets/styles-CZYPZ0h4.css"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as ge,d as me,m as Is}from"./firebase-config-C2tbVz-J.js";import{EmailAuthProvider as Dr,reauthenticateWithCredential as Tr,verifyBeforeUpdateEmail as Pr,updatePassword as Br,updateProfile as Ar,setPersistence as Mr,browserLocalPersistence as qr,onAuthStateChanged as jr,signOut as Nr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as Pe,getDoc as is,updateDoc as Lt,setDoc as Rr,addDoc as uo,collection as ca,query as po,where as bo,getDocs as Fr,deleteDoc as Hr,arrayUnion as Or,orderBy as zr,onSnapshot as _r}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{getToken as Vr,onMessage as Ur}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const g={userName:null,userProfessionalId:null,userPermissions:null,userRole:null,groupId:null,groupName:null,accessibleCompanies:[],accessibleEstablishments:[],currentViewContext:{type:null,id:null,name:null},establishmentId:null,establishmentName:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function Wr(t,e,a){g.establishmentId=t,g.establishmentName=e,g.userPermissions=a,g.currentViewContext={type:"BRANCH",id:t,name:e}}const go=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",Ba=go?"http://localhost:8080":"https://kairos-app-407358446276.us-central1.run.app";console.log(`🚀 API configurada para modo: ${go?"LOCAL (Dev)":"PRODUÇÃO (Cloud)"}`);console.log("📡 URL Base:",Ba);async function Qr(){const t=ge.currentUser;return t?{"Content-Type":"application/json",Authorization:`Bearer ${await t.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function C(t,e={}){const a=await Qr();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const s=Ba.replace(/\/$/,""),o=t.startsWith("/")?t:`/${t}`,r=`${s}${o}`;console.log(`AuthenticatedFetch: ${e.method||"GET"} ${r}`);try{const i=await fetch(r,{...e,headers:{...a,...e.headers}});if(!i.ok){const l=(await i.json().catch(()=>({message:i.statusText}))).message||`Erro na API: ${i.status}`;if(l.includes("FAILED_PRECONDITION")&&l.includes("requires an index")){const d=/(https:\/\/[^\s]+)/,c=l.match(d),u=c?c[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${t}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${u}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${i.status}) em ${r}:`,l),new Error(l)}return i.json()}catch(i){throw console.error(`Falha de rede ao tentar acessar ${r}:`,i.message),i.message.includes("Failed to fetch")||i.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${Ba}. Verifique se o servidor backend está rodando.`):i}}const ns=(t,e,a,s=null)=>{let o=`/api/appointments/${t}?startDate=${e}&endDate=${a}`;return s&&(o+=`&professionalId=${s}`),C(o)},Jr=(t,e,a)=>{const s=`/api/appointments/cancelled/${t}?startDate=${e}&endDate=${a}`;return C(s)},Gr=({establishmentId:t,professionalId:e,serviceIds:a,date:s})=>{const o=`/api/availability?establishmentId=${t}&professionalId=${e}&serviceIds=${a.join(",")}&date=${s}`;return C(o)},Xr=t=>C("/api/appointments",{method:"POST",body:JSON.stringify(t)}),Yr=(t,e)=>C(`/api/appointments/${t}`,{method:"PUT",body:JSON.stringify(e)}),Zr=t=>C(`/api/appointments/${t}`,{method:"DELETE"}),Kr=t=>C(`/api/appointments/${t}/reopen`,{method:"POST"}),ei=(t,e)=>C(`/api/appointments/${t}/checkout`,{method:"POST",body:JSON.stringify(e)});let re;async function ti(){if(!re)try{re=new(window.AudioContext||window.webkitAudioContext)}catch(t){console.error("Não foi possível inicializar o áudio:",t)}}function ai(){if(!re){console.warn("AudioContext não inicializado. O som não será tocado.");return}re.state==="suspended"&&re.resume();const t=re.createOscillator(),e=re.createGain();t.connect(e),e.connect(re.destination),t.type="sine",t.frequency.setValueAtTime(800,re.currentTime),e.gain.setValueAtTime(0,re.currentTime),e.gain.linearRampToValueAtTime(.3,re.currentTime+.01),e.gain.exponentialRampToValueAtTime(1e-4,re.currentTime+.2),t.start(re.currentTime),t.stop(re.currentTime+.2)}function m(t,e,a="info",s=!1){const o=document.getElementById("toast-container");if(!o)return;s&&ai();const r=document.createElement("div"),i={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},n={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},l={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};r.className=`toast ${i[a]||i.info}`,r.innerHTML=`
        <div class="toast-icon">${n[a]||n.info}</div>
        <div class="toast-content">
            <p class="font-bold">${t}</p>
            <p class="text-sm">${e}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${l[a]||l.info}"></div>
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
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",s(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",s(!1)}})}function Ce({title:t,contentHTML:e,maxWidth:a="max-w-4xl",showCloseButton:s=!0}){let o=document.getElementById("genericModal");const r=o.cloneNode(!1);o.parentNode.replaceChild(r,o),o=r;const i=()=>{o.style.display="none"},n=c=>{o.querySelector("#genericModalContentBody").innerHTML=c};o.innerHTML=`
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
    `;const l=o.querySelector("[data-close-modal]");l&&(l.onclick=i);const d=o.querySelector('[data-action="close-modal"]');return d&&(d.onclick=i),o.addEventListener("click",c=>{c.target.closest(".modal-content")||i()}),o.style.display="flex",{modalElement:o,close:i,setContent:n}}function si(){document.body.addEventListener("click",()=>{re||ti()},{once:!0}),document.addEventListener("click",t=>{const e=t.target.closest('[data-action="close-modal"]');if(e){const s=e.dataset.target;if(s){const o=document.getElementById(s);o&&(o.style.display="none")}}if(t.target.closest("[data-close-modal]")){const s=document.getElementById("genericModal");s&&(s.style.display="none")}})}const se=document.getElementById("sidebar"),He=document.getElementById("sidebarToggle"),xt=document.getElementById("mainContent"),oi=document.querySelectorAll(".sidebar-link"),Aa=document.getElementById("menu-search"),Ls=document.getElementById("hamburger-menu-btn"),Ke=document.getElementById("mobile-overlay");let De=!0;function je(t){if(!se||!xt)return;se.classList.toggle("collapsed",t),xt.classList.toggle("sidebar-collapsed-shift",t);const e=se.querySelector(".sidebar-search-container"),a=se.querySelectorAll(".sidebar-category");t?(e&&(e.style.display="none"),a.forEach(s=>s.style.display="none"),document.querySelectorAll(".submenu-toggle").forEach(s=>{const o=s.getAttribute("data-target-submenu"),r=document.getElementById(o),i=s.querySelector(".submenu-arrow");r&&(r.classList.add("hidden"),r.classList.remove("flex")),i&&i.classList.remove("rotate-180")})):(e&&(e.style.display="block"),a.forEach(s=>s.style.display="block"))}function ri(){!se||!Ke||(se.classList.add("mobile-open"),Ke.classList.add("visible"))}function Pt(){!se||!Ke||(se.classList.remove("mobile-open"),Ke.classList.remove("visible"))}function ii(){je(!se.classList.contains("collapsed"))}function ni(t,e){const a=document.getElementById(t);if(!a)return;const s=a.classList.contains("hidden");s&&window.innerWidth>=1024&&se.classList.contains("collapsed")&&je(!1),s?(a.classList.remove("hidden"),a.classList.add("flex"),e&&e.classList.add("rotate-180")):(a.classList.add("hidden"),a.classList.remove("flex"),e&&e.classList.remove("rotate-180"))}function li(){Aa&&Aa.addEventListener("input",t=>{const e=t.target.value.toLowerCase().trim(),a=document.getElementById("sidebar-nav");if(!a)return;const s=a.querySelectorAll("li"),o=a.querySelectorAll(".sidebar-category");if(e===""){s.forEach(r=>r.style.display=""),o.forEach(r=>r.style.display="block");return}o.forEach(r=>r.style.display="none"),s.forEach(r=>{if(r.classList.contains("sidebar-category"))return;const i=r.querySelector(".sidebar-link")||r.querySelector(".submenu-toggle");if(!i)return;if(i.textContent.toLowerCase().includes(e)){r.style.display="";const d=r.closest('ul[id$="-submenu"]');if(d){d.classList.remove("hidden"),d.classList.add("flex"),d.parentElement.style.display="";const c=d.parentElement.querySelector(".submenu-toggle");if(c){const u=c.querySelector(".submenu-arrow");u&&u.classList.add("rotate-180")}}}else{const d=i.getAttribute("data-target-submenu");if(d){const c=document.getElementById(d);c&&(Array.from(c.querySelectorAll(".sidebar-link")).some(b=>b.textContent.toLowerCase().includes(e))?r.style.display="":r.style.display="none")}else r.style.display="none"}})})}function di(t,e,a){if(!se||!xt)return;xt.classList.add("main-content-shift"),window.innerWidth>=1024?(De=!0,je(!1)):window.innerWidth>=768?(De=!1,je(!0)):(xt.classList.remove("main-content-shift","sidebar-collapsed-shift"),Pt()),He&&He.addEventListener("click",o=>{o.stopPropagation(),window.innerWidth>=768?(De=!De,je(!De),De?(He.classList.add("text-indigo-400"),He.classList.remove("text-gray-400")):(He.classList.remove("text-indigo-400"),He.classList.add("text-gray-400"))):ii()}),se.addEventListener("mouseenter",()=>{window.innerWidth>=768&&!De&&se.classList.contains("collapsed")&&je(!1)}),se.addEventListener("mouseleave",()=>{if(window.innerWidth>=768&&!De){const o=!!document.querySelector("#sidebarToggle:hover"),r=document.activeElement===Aa;!o&&!r&&je(!0)}}),Ls&&Ls.addEventListener("click",o=>{o.stopPropagation(),ri()}),Ke&&Ke.addEventListener("click",o=>{o.stopPropagation(),Pt()});let s=0;se.addEventListener("touchstart",o=>{s=o.changedTouches[0].screenX},{passive:!0}),se.addEventListener("touchend",o=>{const r=o.changedTouches[0].screenX;s-r>50&&Pt()},{passive:!0}),document.querySelectorAll(".submenu-toggle").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation();const i=o.getAttribute("data-target-submenu"),n=o.querySelector(".submenu-arrow");ni(i,n)})}),li(),oi.forEach(o=>{const r=o.getAttribute("data-target");if(!r)return;const i=r.replace("-section",""),n=a?.[i]!==!1,l=e===null||e[r]?.view===!0;if(!n||!l){o.parentElement&&o.parentElement.tagName==="LI"?o.parentElement.style.display="none":o.style.display="none";return}o.addEventListener("click",d=>{d.preventDefault(),document.querySelectorAll(".sidebar-link").forEach(c=>c.classList.remove("active")),o.classList.add("active"),r&&typeof t=="function"&&t(r),window.innerWidth<768&&Pt()})})}const ci=t=>C("/api/establishments/",{method:"POST",body:JSON.stringify(t)}),fe=()=>C("/api/establishments/hierarchy",{method:"GET"}),Be=t=>{const e=t||g.establishmentId;return e?C(`/api/establishments/${e}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},ls=(t,e)=>{const a=t||g.establishmentId;return a?C(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(e)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},ui=(t,e)=>{const a=t||g.establishmentId;return a?C(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:e})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},pi=(t,e)=>{const a=t||g.establishmentId;return a?C(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:e})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},$e=t=>C(`/api/professionals/${t}`),mo=t=>C(`/api/professionals/details/${t}`),bi=t=>C("/api/professionals",{method:"POST",body:JSON.stringify(t)}),Ma=(t,e)=>C(`/api/professionals/${t}`,{method:"PUT",body:JSON.stringify(e)}),fo=t=>C(`/api/professionals/${t}`,{method:"DELETE"}),gi=t=>{const e=t.map(a=>fo(a));return Promise.all(e)};class mi{constructor(e,a,s){this.steps=e,this.currentStep=0,this.onComplete=a,this.onSkip=s,this.isActive=!1,this.overlay=null,this.spotlight=null,this.popover=null,this.handleResize=this.handleResize.bind(this)}start(){this.isActive||(this.isActive=!0,this.createElements(),window.addEventListener("resize",this.handleResize),this.renderStep())}stop(e=!1){this.isActive=!1,window.removeEventListener("resize",this.handleResize),this.overlay&&this.overlay.remove(),this.spotlight&&this.spotlight.remove(),this.popover&&this.popover.remove(),e&&this.onComplete?this.onComplete():!e&&this.onSkip&&this.onSkip()}createElements(){this.overlay=document.createElement("div"),this.overlay.className="fixed inset-0 bg-black/60 z-[99990] transition-opacity duration-300",document.body.appendChild(this.overlay),this.spotlight=document.createElement("div"),this.spotlight.className="absolute rounded-xl z-[99991] transition-all duration-500 ease-in-out pointer-events-none bg-transparent",this.spotlight.style.boxShadow="0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255,255,255,0.5) inset",document.body.appendChild(this.spotlight),this.popover=document.createElement("div"),this.popover.className="absolute z-[99992] bg-white rounded-2xl shadow-2xl w-[320px] transition-all duration-500 ease-in-out opacity-0 transform scale-95 border border-gray-100 flex flex-col",document.body.appendChild(this.popover)}async renderStep(){if(this.currentStep>=this.steps.length){this.stop(!0);return}const e=this.steps[this.currentStep];this.popover.style.opacity="0",this.popover.style.transform="scale(0.95)",e.onBefore&&(await e.onBefore(),await this.sleep(600));const a=await this.waitForElement(e.targetSelector,3e3);if(a){a.scrollIntoView({behavior:"smooth",block:"center"}),await this.sleep(300);const o=a.getBoundingClientRect(),r=8;this.spotlight.style.top=`${o.top+window.scrollY-r}px`,this.spotlight.style.left=`${o.left+window.scrollX-r}px`,this.spotlight.style.width=`${o.width+r*2}px`,this.spotlight.style.height=`${o.height+r*2}px`,this.spotlight.style.display="block",this.overlay.style.display="none",this.positionPopover(o)}else this.spotlight.style.display="none",this.overlay.style.display="block",this.popover.style.top="50%",this.popover.style.left="50%",this.popover.style.transform="translate(-50%, -50%) scale(1)";const s=this.currentStep===this.steps.length-1;this.popover.innerHTML=`
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
        `,setTimeout(()=>{a&&(this.popover.style.transform="scale(1)"),this.popover.style.opacity="1"},50),document.getElementById("tour-next-btn").onclick=()=>{this.currentStep++,this.renderStep()},document.getElementById("tour-prev-btn")&&(document.getElementById("tour-prev-btn").onclick=()=>{this.currentStep--,this.renderStep()}),document.getElementById("tour-skip-btn").onclick=()=>this.stop(!1)}positionPopover(e){const a=this.popover.getBoundingClientRect(),s=20;let o=e.bottom+window.scrollY+s,r=e.left+window.scrollX;o+a.height>window.scrollY+window.innerHeight&&(o=e.top+window.scrollY-a.height-s),r+a.width>window.innerWidth&&(r=e.right+window.scrollX-a.width),r<s&&(r=s),this.popover.style.top=`${o}px`,this.popover.style.left=`${r}px`}handleResize(){this.isActive&&this.renderStep()}sleep(e){return new Promise(a=>setTimeout(a,e))}async waitForElement(e,a){if(!e)return null;const s=Date.now();for(;Date.now()-s<a;){const o=document.querySelector(e);if(o)return o;await this.sleep(100)}return null}}async function fi(){try{console.log("A verificar Onboarding interativo...");const t=await Be(g.establishmentId);if(!t||t.parentId||t.onboardingCompleted)return;const e=[{title:"Bem-vindo ao Kairos!",icon:"👋",content:"Preparei um tour rápido para lhe mostrar onde deve configurar as 3 coisas mais importantes antes de receber agendamentos. Vamos a isso?",targetSelector:null},{title:"Perfil e Dados da Loja",icon:"🏢",content:"É aqui em 'Minha Empresa' que você define o nome do Salão, telefone, endereço e faz o upload da sua Logomarca.",targetSelector:'[data-target="estabelecimento-section"]',onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Cores e Personalização",icon:"🎨",content:"Nesta área você pode mudar a cor principal do sistema para ficar com a cara da sua marca. O link do seu cliente vai usar esta cor!",targetSelector:"#themeColor",onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Criação de Serviços",icon:"✂️",content:"Na aba 'Serviços' é onde a mágica acontece. Crie os serviços que os seus clientes vão poder agendar, informando o preço e a duração de cada um.",targetSelector:'[data-target="servicos-section"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Novo Serviço",icon:"➕",content:"Sempre que precisar adicionar um novo serviço ao menu, basta clicar neste botão verde.",targetSelector:'[data-action="new-service"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Gestão da Equipe",icon:"👥",content:"E para terminar: a 'Equipa'. Aqui você cadastra os profissionais, define quem faz qual serviço e ajusta a jornada de trabalho semanal de cada um.",targetSelector:'[data-target="profissionais-section"]',onBefore:async()=>{window.navigateTo("profissionais-section")}},{title:"Tudo Pronto!",icon:"🚀",content:"Você já conhece o caminho! Preencha as informações do seu negócio com calma. Quando terminar, volte à Agenda e partilhe o seu Link de Agendamento com os clientes!",targetSelector:null,onBefore:async()=>{window.navigateTo("agenda-section")}}],a=async()=>{try{await ls(g.establishmentId,{onboardingCompleted:!0}),showNotification("Tour Concluído","Você já pode configurar o seu sistema livremente!","success")}catch(o){console.error("Erro ao gravar fim do onboarding",o)}};new mi(e,a,a).start()}catch(t){console.error("Erro fatal ao iniciar onboarding:",t)}}var et;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(et||(et={}));class ka extends Error{constructor(e,a,s){super(e),this.message=e,this.code=a,this.data=s}}const xi=t=>{var e,a;return t?.androidBridge?"android":!((a=(e=t?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},hi=t=>{const e=t.CapacitorCustomPlatform||null,a=t.Capacitor||{},s=a.Plugins=a.Plugins||{},o=()=>e!==null?e.name:xi(t),r=()=>o()!=="web",i=u=>{const p=d.get(u);return!!(p?.platforms.has(o())||n(u))},n=u=>{var p;return(p=a.PluginHeaders)===null||p===void 0?void 0:p.find(b=>b.name===u)},l=u=>t.console.error(u),d=new Map,c=(u,p={})=>{const b=d.get(u);if(b)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),b.proxy;const f=o(),h=n(u);let y;const S=async()=>(!y&&f in p?y=typeof p[f]=="function"?y=await p[f]():y=p[f]:e!==null&&!y&&"web"in p&&(y=typeof p.web=="function"?y=await p.web():y=p.web),y),P=(j,I)=>{var L,H;if(h){const V=h?.methods.find(U=>I===U.name);if(V)return V.rtype==="promise"?U=>a.nativePromise(u,I.toString(),U):(U,T)=>a.nativeCallback(u,I.toString(),U,T);if(j)return(L=j[I])===null||L===void 0?void 0:L.bind(j)}else{if(j)return(H=j[I])===null||H===void 0?void 0:H.bind(j);throw new ka(`"${u}" plugin is not implemented on ${f}`,et.Unimplemented)}},N=j=>{let I;const L=(...H)=>{const V=S().then(U=>{const T=P(U,j);if(T){const W=T(...H);return I=W?.remove,W}else throw new ka(`"${u}.${j}()" is not implemented on ${f}`,et.Unimplemented)});return j==="addListener"&&(V.remove=async()=>I()),V};return L.toString=()=>`${j.toString()}() { [capacitor code] }`,Object.defineProperty(L,"name",{value:j,writable:!1,configurable:!1}),L},$=N("addListener"),E=N("removeListener"),D=(j,I)=>{const L=$({eventName:j},I),H=async()=>{const U=await L;E({eventName:j,callbackId:U},I)},V=new Promise(U=>L.then(()=>U({remove:H})));return V.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await H()},V},B=new Proxy({},{get(j,I){switch(I){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return h?D:$;case"removeListener":return E;default:return N(I)}}});return s[u]=B,d.set(u,{name:u,proxy:B,platforms:new Set([...Object.keys(p),...h?[f]:[]])}),B};return a.convertFileSrc||(a.convertFileSrc=u=>u),a.getPlatform=o,a.handleError=l,a.isNativePlatform=r,a.isPluginAvailable=i,a.registerPlugin=c,a.Exception=ka,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},vi=t=>t.Capacitor=hi(t),ke=vi(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),ua=ke.registerPlugin;class xo{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,a){let s=!1;this.listeners[e]||(this.listeners[e]=[],s=!0),this.listeners[e].push(a);const r=this.windowListeners[e];r&&!r.registered&&this.addWindowListener(r),s&&this.sendRetainedArgumentsForEvent(e);const i=async()=>this.removeListener(e,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,a,s){const o=this.listeners[e];if(!o){if(s){let r=this.retainedEventArguments[e];r||(r=[]),r.push(a),this.retainedEventArguments[e]=r}return}o.forEach(r=>r(a))}hasListeners(e){var a;return!!(!((a=this.listeners[e])===null||a===void 0)&&a.length)}registerWindowListener(e,a){this.windowListeners[a]={registered:!1,windowEventName:e,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(e="not implemented"){return new ke.Exception(e,et.Unimplemented)}unavailable(e="not available"){return new ke.Exception(e,et.Unavailable)}async removeListener(e,a){const s=this.listeners[e];if(!s)return;const o=s.indexOf(a);this.listeners[e].splice(o,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const a=this.retainedEventArguments[e];a&&(delete this.retainedEventArguments[e],a.forEach(s=>{this.notifyListeners(e,s)}))}}const Cs=t=>encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ds=t=>t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class yi extends xo{async getCookies(){const e=document.cookie,a={};return e.split(";").forEach(s=>{if(s.length<=0)return;let[o,r]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");o=Ds(o).trim(),r=Ds(r).trim(),a[o]=r}),a}async setCookie(e){try{const a=Cs(e.key),s=Cs(e.value),o=`; expires=${(e.expires||"").replace("expires=","")}`,r=(e.path||"/").replace("path=",""),i=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${a}=${s||""}${o}; path=${r}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const a of e)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}ua("CapacitorCookies",{web:()=>new yi});const wi=async t=>new Promise((e,a)=>{const s=new FileReader;s.onload=()=>{const o=s.result;e(o.indexOf(",")>=0?o.split(",")[1]:o)},s.onerror=o=>a(o),s.readAsDataURL(t)}),ki=(t={})=>{const e=Object.keys(t);return Object.keys(t).map(o=>o.toLocaleLowerCase()).reduce((o,r,i)=>(o[r]=t[e[i]],o),{})},$i=(t,e=!0)=>t?Object.entries(t).reduce((s,o)=>{const[r,i]=o;let n,l;return Array.isArray(i)?(l="",i.forEach(d=>{n=e?encodeURIComponent(d):d,l+=`${r}=${n}&`}),l.slice(0,-1)):(n=e?encodeURIComponent(i):i,l=`${r}=${n}`),`${s}&${l}`},"").substr(1):null,Si=(t,e={})=>{const a=Object.assign({method:t.method||"GET",headers:t.headers},e),o=ki(t.headers)["content-type"]||"";if(typeof t.data=="string")a.body=t.data;else if(o.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[i,n]of Object.entries(t.data||{}))r.set(i,n);a.body=r.toString()}else if(o.includes("multipart/form-data")||t.data instanceof FormData){const r=new FormData;if(t.data instanceof FormData)t.data.forEach((n,l)=>{r.append(l,n)});else for(const n of Object.keys(t.data))r.append(n,t.data[n]);a.body=r;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(o.includes("application/json")||typeof t.data=="object")&&(a.body=JSON.stringify(t.data));return a};class Ei extends xo{async request(e){const a=Si(e,e.webFetchExtra),s=$i(e.params,e.shouldEncodeUrlParams),o=s?`${e.url}?${s}`:e.url,r=await fetch(o,a),i=r.headers.get("content-type")||"";let{responseType:n="text"}=r.ok?e:{};i.includes("application/json")&&(n="json");let l,d;switch(n){case"arraybuffer":case"blob":d=await r.blob(),l=await wi(d);break;case"json":l=await r.json();break;case"document":case"text":default:l=await r.text()}const c={};return r.headers.forEach((u,p)=>{c[p]=u}),{data:l,headers:c,status:r.status,url:r.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}ua("CapacitorHttp",{web:()=>new Ei});const de=ua("PushNotifications",{}),Ii="modulepreload",Li=function(t){return"/"+t},Ts={},Ci=function(e,a,s){let o=Promise.resolve();if(a&&a.length>0){let l=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),n=i?.nonce||i?.getAttribute("nonce");o=l(a.map(d=>{if(d=Li(d),d in Ts)return;Ts[d]=!0;const c=d.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":Ii,c||(p.as="script"),p.crossOrigin="",p.href=d,n&&p.setAttribute("nonce",n),document.head.appendChild(p),c)return new Promise((b,f)=>{p.addEventListener("load",b),p.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(i){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=i,window.dispatchEvent(n),!n.defaultPrevented)throw i}return o.then(i=>{for(const n of i||[])n.status==="rejected"&&r(n.reason);return e().catch(r)})},Ps=ua("App",{web:()=>Ci(()=>import("./web-DcY0fbnT.js"),__vite__mapDeps([0,1,2,3])).then(t=>new t.AppWeb)}),Di="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let Bs=!1;async function Ti(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await de.removeAllListeners(),await de.addListener("registration",async a=>{vo(a.value,!0)}),await de.addListener("pushNotificationReceived",a=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",a)}),await de.addListener("pushNotificationActionPerformed",a=>{const s=a.notification.data;console.log("Notificação clicada (Ação):",s)});let e=await de.checkPermissions();e.receive==="prompt"&&(e=await de.requestPermissions()),e.receive==="granted"&&await de.register()}catch(e){console.error("[Push Nativo] Erro:",e)}return}"Notification"in window&&Notification.permission==="granted"&&ho()}async function Pi(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await ho(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(t){return console.error("Erro ao pedir permissão Web:",t),!1}}async function ho(){if("serviceWorker"in navigator)try{const t=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await t.update();const e=await Vr(Is,{vapidKey:Di,serviceWorkerRegistration:t});e?(console.log("[Push Web] Token validado."),await vo(e,!1)):console.warn("[Push Web] Token veio vazio."),Bs||(Ur(Is,a=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",a)}),Bs=!0)}catch(t){console.error("[Push Web] Falha no registo:",t)}else console.warn("Navegador sem suporte a Service Worker.")}async function vo(t,e){const a=ge.currentUser;if(!a){console.warn("Usuário não logado. Token não salvo.");return}const s=Pe(me,"users",a.uid);try{const o=await is(s);if(o.exists()){const i=o.data().fcmTokens||[];if(i.length===1&&i[0]===t){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await Lt(s,{fcmTokens:[t],lastLoginAt:new Date().toISOString(),platform:e?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(o){if(o.code==="not-found")try{await Rr(s,{email:a.email,fcmTokens:[t],platform:e?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(r){console.error("Erro ao criar user:",r)}else console.error("Erro ao atualizar token:",o)}}const Bi=(t,e,a="all",s="all")=>{const o=new URLSearchParams({startDate:t,endDate:e});return a&&a!=="all"&&o.append("professionalId",a),s&&s!=="all"&&o.append("costCenterId",s),C(`/api/reports/indicators?${o.toString()}`)},Ai=(t,e="all")=>{const a=new URLSearchParams({date:t});return e&&e!=="all"&&a.append("professionalId",e),C(`/api/reports/appointments/list?${a.toString()}`)},Mi=t=>t?C(`/api/financial/cost-centers/${t}`):Promise.resolve([]),qi=(t,e,a)=>{const s=new URLSearchParams({startDate:e,endDate:a});return C(`/api/analytics/${t}?${s.toString()}`)},ea=({establishmentId:t,startDate:e,endDate:a,cashierSessionId:s})=>{const o=new URLSearchParams({startDate:e,endDate:a});return s&&s!=="all"&&o.append("cashierSessionId",s),t&&o.append("establishmentId",t),C(`/api/reports/sales?${o.toString()}`)},ji=(t,e,a)=>C(`/api/analytics/${t}/monthly-details?year=${e}&month=${a}`),Ni=(t,e,a,s)=>{const o=`/api/analytics/${t}/daily-details?year=${e}&month=${a}&day=${s}`;return C(o)},Ri=(t,e,a,s)=>{const o=`/api/analytics/${t}/professional-details?year=${e}&month=${a}&professionalId=${s}`;return C(o)},Fi=(t,e,a,s)=>C(`/api/reports/commissions/${t}?year=${e}&month=${a}&professionalId=${s}`),yo=()=>C("/api/reports/summary",{method:"GET"}),Hi=Object.freeze(Object.defineProperty({__proto__:null,getAdvancedIndicators:Bi,getAnalytics:qi,getCommissionReport:Fi,getCostCenters:Mi,getDailyAppointments:Ai,getDailyTransactions:Ni,getMonthlyAnalytics:ji,getProfessionalMonthlyDetails:Ri,getSalesReport:ea,getSummaryKPIs:yo},Symbol.toStringTag,{value:"Module"})),ds=t=>t?String(t).replace(/\D/g,""):"",lt=(t,e="",a=20,s={})=>{const o=new URLSearchParams;return e&&o.append("search",e),a&&o.append("limit",a),s&&s.hasLoyalty&&o.append("hasLoyalty","true"),s&&s.birthMonth&&o.append("birthMonth",s.birthMonth),s&&s.inactiveDays&&o.append("inactiveDays",s.inactiveDays),C(`/api/clients/${t}?${o.toString()}`)},wo=(t,e)=>{const a=encodeURIComponent(e);return C(`/api/clients/details/${t}/${a}`)},ko=t=>{const e=t.phone||t.id;if(!e)throw new Error("Telefone é obrigatório");const a=ds(e),s={...t,phone:a,id:a};return C(`/api/clients/${a}`,{method:"PUT",body:JSON.stringify(s)})},$o=ko,So=(t,e)=>ko({...e,id:t}),Eo=t=>{const e=encodeURIComponent(t);return C(`/api/clients/${e}`,{method:"DELETE"})},Oi=(t,e,a,s)=>C("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:t,clientPhone:ds(e),points:a,rewardName:s})}),zi=(t,e)=>wo(t,ds(e));function v(t){return t==null?"":String(t).replace(/[&<>'"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[e])}function pa(t,e=800,a=800,s=.7){return new Promise((o,r)=>{if(!t.type.match(/image.*/))return r(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.readAsDataURL(t),i.onload=n=>{const l=new Image;l.src=n.target.result,l.onload=()=>{let d=l.width,c=l.height;d>c?d>e&&(c*=e/d,d=e):c>a&&(d*=a/c,c=a);const u=document.createElement("canvas");u.width=d,u.height=c,u.getContext("2d").drawImage(l,0,0,d,c);const b=u.toDataURL("image/jpeg",s);o(b)},l.onerror=d=>r(new Error("Erro ao carregar a imagem para processamento."))},i.onerror=n=>r(new Error("Erro ao ler o ficheiro."))})}function $a(t){const e=parseFloat(t);return isNaN(e)?"R$ 0,00":e.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}let Sa=null;async function _i(){const t=document.getElementById("content");t.innerHTML=`
        <div class="flex items-center justify-center h-full min-h-[60vh]">
            <div class="flex flex-col items-center">
                <div class="w-10 h-10 border-4 border-indigo-50 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                <p class="text-slate-400 font-medium text-sm">A processar dados consolidados...</p>
            </div>
        </div>
    `;try{const e=new Date,a=new Date(e.getFullYear(),e.getMonth(),e.getDate()),s=new Date(a);s.setHours(23,59,59,999);const o=new Date(a.getFullYear(),a.getMonth(),1),r=new Date(a);r.setDate(a.getDate()-6);const i=g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId],n=i.map(async T=>{const[W,ne]=await Promise.all([ns(T,o.toISOString(),s.toISOString(),null),lt(T)]);return{appts:W||[],clients:ne||[]}}),l=await Promise.all(n);let d=[],c=[];l.forEach(T=>{d=d.concat(T.appts),c=c.concat(T.clients)});const u=T=>(T.services||[]).reduce((W,ne)=>W+(Number(ne.price)||0),0)||Number(T.totalPrice||0)||Number(T.servicePrice||0),p=d.filter(T=>{const W=new Date(T.startTime);return W>=a&&W<=s}),b=p.filter(T=>T.status==="completed"),f=d.filter(T=>T.status==="completed"),h=b.reduce((T,W)=>T+u(W),0),y=f.reduce((T,W)=>T+u(W),0),S=p.length,P=f.length>0?y/f.length:0,N=[],$=[],E=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];for(let T=0;T<7;T++){const W=new Date(r);W.setDate(r.getDate()+T),N.push(E[W.getDay()]);const ne=new Date(W).setHours(0,0,0,0),ue=new Date(W).setHours(23,59,59,999),Tt=d.filter(qe=>{const J=new Date(qe.startTime).getTime();return qe.status==="completed"&&J>=ne&&J<=ue}).reduce((qe,J)=>qe+u(J),0);$.push(Tt)}const D={labels:N,data:$},B=p.filter(T=>new Date(T.startTime).getTime()>=e.getTime()&&T.status!=="completed"&&T.status!=="cancelled").sort((T,W)=>new Date(T.startTime)-new Date(W.startTime)).slice(0,4).map(T=>({client:T.clientName||"Desconhecido",service:T.serviceName||(T.services&&T.services[0]?T.services[0].name:"Serviço"),time:new Date(T.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),prof:(T.professionalName||"").split(" ")[0]||"Profissional",id:T.id})),j=`${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}`,I=new Map;c.forEach(T=>{T.phone?I.set(T.phone,T):I.set(T.id||Math.random().toString(),T)});const H=Array.from(I.values()).filter(T=>{if(!T.birthDate)return!1;let W,ne;if(T.birthDate.includes("-")){const ue=T.birthDate.split("-");ue[0].length===4?(W=ue[1],ne=ue[2]):(ne=ue[0],W=ue[1])}else if(T.birthDate.includes("/")){const ue=T.birthDate.split("/");ne=ue[0],W=ue[1]}return`${ne}/${W}`===j}).map(T=>{let W="";return T.birthDate&&T.birthDate.includes("-")&&T.birthDate.split("-")[0].length===4&&(W=a.getFullYear()-parseInt(T.birthDate.split("-")[0])),{name:T.name,age:W,phone:T.phone}}),V={receitaHoje:h,agendamentosHoje:S,receitaMes:y,ticketMedio:P},U=i.length>1;Vi(t,V,D,B,H,U),Ui(D),Wi()}catch(e){console.error("Erro ao carregar dashboard:",e),t.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full min-h-[60vh] text-slate-500">
                <i class="bi bi-exclamation-circle text-4xl mb-3 text-rose-400"></i>
                <p class="font-medium text-sm">Ocorreu um erro ao carregar os dados.</p>
                <button onclick="window.navigateTo('dashboard-section')" class="mt-4 px-5 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">Tentar Novamente</button>
            </div>
        `}}function Vi(t,e,a,s,o,r){const i=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),n=r?'<span class="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 align-middle">CONSOLIDADO</span>':"";t.innerHTML=`
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
                            ${s.length>0?s.map(l=>`
                                <div data-action="goto-agenda" class="flex items-center justify-between p-3.5 rounded-[14px] border border-slate-100/60 bg-slate-50/50 hover:bg-indigo-50/30 hover:border-indigo-100 transition-all cursor-pointer group">
                                    <div class="flex items-center gap-4">
                                        <div class="w-11 h-11 rounded-full bg-white border border-slate-200 flex flex-col items-center justify-center flex-shrink-0 text-indigo-600 shadow-sm">
                                            <span class="font-semibold text-sm">${l.time.split(":")[0]}</span><span class="text-[8px] font-medium leading-none text-slate-400">${l.time.split(":")[1]}</span>
                                        </div>
                                        <div>
                                            <p class="font-medium text-slate-700 text-sm group-hover:text-indigo-700 transition-colors">${v(l.client)}</p>
                                            <p class="text-[11px] text-slate-500 font-normal mt-0.5">${v(l.service)} <span class="mx-1 text-slate-300">•</span> ${v(l.prof)}</p>
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
                            ${o.length>0?o.map(l=>{const c=`https://wa.me/${(l.phone||"").replace(/\D/g,"")}?text=${encodeURIComponent(`Olá ${l.name.split(" ")[0]}! A equipa deseja-lhe um Feliz Aniversário! 🎉`)}`;return`
                                <div class="flex items-center justify-between p-3 rounded-[12px] border border-rose-50 bg-rose-50/30">
                                    <div class="flex items-center gap-3">
                                        <div class="w-9 h-9 rounded-full bg-rose-100/70 text-rose-500 flex items-center justify-center font-semibold text-sm">
                                            ${v(l.name).charAt(0)}
                                        </div>
                                        <div>
                                            <p class="font-medium text-slate-700 text-[0.8rem]">${v(l.name)}</p>
                                            ${l.age?`<p class="text-[10px] font-medium text-rose-400 mt-0.5">${l.age} anos</p>`:""}
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
    `}function Ui(t){const e=document.getElementById("revenueChart");if(!e)return;Sa&&Sa.destroy();const s=e.getContext("2d").createLinearGradient(0,0,0,240);s.addColorStop(0,"rgba(79, 70, 229, 0.15)"),s.addColorStop(1,"rgba(79, 70, 229, 0.01)"),Sa=new Chart(e,{type:"line",data:{labels:t.labels,datasets:[{label:"Receita (R$)",data:t.data,borderColor:"#6366f1",backgroundColor:s,borderWidth:2.5,pointBackgroundColor:"#ffffff",pointBorderColor:"#6366f1",pointBorderWidth:2,pointRadius:3,pointHoverRadius:5,fill:!0,tension:.35}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{backgroundColor:"#1e293b",padding:12,cornerRadius:8,titleFont:{size:12,family:"Inter",weight:"normal"},bodyFont:{size:13,weight:"bold",family:"Inter"},displayColors:!1,callbacks:{label:function(o){return o.parsed.y!==null?new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(o.parsed.y):""}}}},scales:{y:{beginAtZero:!0,grid:{color:"#f8fafc",drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Inter",size:10},maxTicksLimit:6,callback:function(o){return"R$ "+o}}},x:{grid:{display:!1,drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Inter",size:11,weight:"500"}}}},interaction:{intersect:!1,mode:"index"}}})}function Wi(){document.getElementById("content").addEventListener("click",e=>{const a=e.target.closest("[data-action]");if(!a)return;switch(a.dataset.action){case"goto-agenda":ee("agenda-section");break;case"new-appointment":ee("agenda-section");break;case"goto-pdv":ee("comandas-section");break;case"goto-clients":ee("clientes-section");break;case"open-link":const o=`${window.location.origin}/cliente.html?id=${g.establishmentId||""}`;window.open(o,"_blank");break}})}const dt=t=>C(`/api/services/${t}`),Qi=t=>C("/api/services",{method:"POST",body:JSON.stringify(t)}),Ji=(t,e)=>C(`/api/services/${t}`,{method:"PUT",body:JSON.stringify(e)}),Io=t=>C(`/api/services/${t}`,{method:"DELETE"}),ba=(t,e,a,s="all")=>{const o=`/api/blockages/${t}?startDate=${e}&endDate=${a}&professionalId=${s}`;return C(o)},ga=t=>C("/api/blockages",{method:"POST",body:JSON.stringify(t)}),cs=t=>C(`/api/blockages/${t}`,{method:"DELETE"}),Lo=t=>C("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:t})}),As=document.getElementById("content");let Ms=!1;const ta=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5",light:"#c7d2fe"},{bg:"#d1fae5",border:"#059669",main:"#059669",light:"#a7f3d0"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48",light:"#fecdd3"},{bg:"#fef3c7",border:"#d97706",main:"#d97706",light:"#fde68a"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490",light:"#a5f3fc"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7",light:"#bae6fd"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed",light:"#ddd6fe"},{bg:"#fce7f3",border:"#db2777",main:"#db2777",light:"#fbcfe8"}];let ma=[],qa=[],aa={},Co=[],R={currentView:window.innerWidth<768?"list":"week",currentDate:new Date,selectedProfessionalId:"all",showInactiveProfs:!1,isSelectionMode:!1,selectedItems:new Set},F={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,originalDate:null,originalTime:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function Do(t){const e=new Date(t),a=e.getDay(),s=e.getDate()-a+(a===0?-6:1);return e.setDate(s),e.setHours(0,0,0,0),e}function us(){const t=document.getElementById("profSelectorContainer");if(!t||!g.professionals)return;let e=g.professionals.filter(o=>R.showInactiveProfs||o.status!=="inactive");const s=[...[{id:"all",name:"Todos",photo:null}],...e];t.innerHTML=s.map(o=>{const r=R.selectedProfessionalId===o.id,i=o.name==="Todos"?"T":o.name.charAt(0).toUpperCase(),n=o.id!=="all"?g.professionalColors.get(o.id)||ta[0]:{main:"#adb5bd",light:"#f1f3f5"};return`
            <div class="flex items-center gap-2 px-4 py-1.5 rounded-full whitespace-nowrap cursor-pointer transition-transform active:scale-95 border ${r?"border-transparent shadow-sm":"border-gray-200 bg-white hover:bg-gray-50"}"
                 data-action="select-professional" data-prof-id="${o.id}"
                 style="background-color: ${r?n.light:""}; border-color: ${r?n.main:""}; color: ${r?n.main:"#4b5563"};">
                <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0" 
                     style="background-color: ${n.main}; ${o.photo?`background-image: url('${X(o.photo)}'); background-size: cover; background-position: center;`:""}">
                    ${o.photo?"":i}
                </div>
                <span class="text-sm font-semibold tracking-tight">${X(o.name==="Todos"?"Todos":o.name.split(" ")[0])}</span>
            </div>`}).join("")}function Gi(){const t=document.getElementById("calendarStripContainer");if(!t||R.currentView!=="list")return;const e=new Date;e.setHours(0,0,0,0);const a=new Date(R.currentDate);a.setHours(0,0,0,0);let s="";const o=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];for(let r=-7;r<=14;r++){const i=new Date(a);i.setDate(a.getDate()+r),i.setHours(0,0,0,0);const n=i.getTime()===a.getTime(),l=i.getTime()===e.getTime(),d=o[i.getDay()],c=i.getDate(),u=n?"bg-indigo-600 text-white shadow-md":l?"bg-indigo-50 text-indigo-700 border border-indigo-100":"bg-gray-50 text-gray-500 border border-transparent",p=n?"text-white":l?"text-indigo-700":"text-gray-900";s+=`
            <div class="flex flex-col items-center justify-center min-w-[3.5rem] py-2 rounded-xl ${u} cursor-pointer transition-transform active:scale-90 flex-shrink-0" data-action="select-date" data-date="${i.toISOString()}">
                <span class="text-[0.65rem] uppercase font-bold tracking-wider opacity-80 pointer-events-none">${d}</span>
                <span class="text-lg font-bold ${p} pointer-events-none mt-0.5">${c}</span>
                ${l&&!n?'<div class="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 pointer-events-none"></div>':'<div class="w-1.5 h-1.5 mt-1 opacity-0"></div>'}
            </div>
        `}t.innerHTML=s,t.querySelectorAll('[data-action="select-date"]').forEach(r=>{r.addEventListener("click",()=>{const i=new Date(r.dataset.date);R.currentDate=i,navigator.vibrate&&navigator.vibrate(30),ve()})}),requestAnimationFrame(()=>{const r=t.querySelector(".bg-indigo-600");r&&r.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})})}function X(t){return v(t||"")}function Xi(t,e,a,s,o){const r=(t||"").replace(/\D/g,""),i=new Date(o).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),n=new Date(o).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=`Olá, ${e}! Você tem um agendamento de ${a} com ${s} para ${i} às ${n}. Podemos confirmar?`;return`https://wa.me/${r}?text=${encodeURIComponent(l)}`}function Yi(t){const e=document.getElementById("agenda-view");if(!e)return;const a=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],s=Do(R.currentDate),o=new Date;o.setHours(0,0,0,0);let r='<div class="week-container flex gap-2 overflow-x-auto hide-scrollbar px-4" id="weekScroller">';for(let i=0;i<7;i++){const n=new Date(s);n.setDate(s.getDate()+i);const l=n.toDateString()===o.toDateString(),d=t.filter(u=>new Date(u.startTime).toDateString()===n.toDateString()).sort((u,p)=>new Date(u.startTime)-new Date(p.startTime));let c="";d.length===0?c='<div class="week-empty text-xs text-gray-400 text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200"><i class="bi bi-dash-lg block text-lg mb-1"></i>Livre</div>':c=d.map(u=>{const b=new Date(u.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),f=g.professionalColors.get(u.professionalId)||{main:"#adb5bd"},h=u.status==="completed",y=R.selectedItems.has(u.id);if(u.type==="blockage")return`<div class="week-event-chip bg-red-50 border-l-4 border-red-500 rounded-md p-2 mb-2">
                        <div class="text-xs font-bold text-red-700 flex items-center"><i class="bi bi-lock mr-1"></i>${b}</div>
                        <div class="text-xs text-gray-800 font-semibold mt-1">${X(u.reason)}</div>
                        <div class="text-[0.65rem] text-gray-500">${X(u.professionalName)}</div>
                    </div>`;const S=JSON.stringify(u).replace(/'/g,"&apos;"),P=y?"ring-2 ring-indigo-500 bg-indigo-50":"bg-white",N=R.isSelectionMode?`<div class="absolute top-1 right-1 z-10">
                           <input type="checkbox" class="w-4 h-4 accent-indigo-600 pointer-events-none" ${y?"checked":""}>
                       </div>`:"";return`<div class="week-event-chip relative shadow-sm border-l-4 rounded-md p-2 mb-2 cursor-pointer transition-transform active:scale-95 ${h?"opacity-60":""} ${P}" style="border-left-color: ${f.main};"
                    data-action="edit-appointment" data-appointment='${S}'>
                    ${N}
                    <div class="text-xs font-bold text-gray-900">${b}</div>
                    <div class="text-xs text-gray-800 font-semibold mt-0.5 truncate pr-2">${X(u.clientName)}</div>
                    <div class="text-[0.65rem] text-gray-500 leading-tight mt-0.5">${X(u.serviceName)} <br/> <span class="font-medium text-indigo-600">${X((u.professionalName||"").split(" ")[0])}</span></div>
                </div>`}).join(""),r+=`<div class="week-day-col min-w-[140px] flex-1 flex flex-col pt-2">
            <div class="week-day-header text-center mb-3 pb-2 border-b border-gray-200 ${l?"is-today":""}">
                <div class="text-xs uppercase font-bold text-gray-500 ${l?"text-indigo-600":""}">${l?"Hoje":a[i]}</div>
                <div class="text-xl font-black text-gray-900 ${l?"text-indigo-600":""}">${n.getDate()}</div>
            </div>
            <div class="week-day-events flex-1">${c}</div>
        </div>`}r+="</div>",e.innerHTML=r,requestAnimationFrame(()=>{const i=document.getElementById("weekScroller");if(i&&window.innerWidth<768){const n=i.querySelector(".is-today");n&&n.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}})}function Zi(t){const e=document.getElementById("agenda-view");if(!e)return;if(t.sort((s,o)=>new Date(s.startTime)-new Date(o.startTime)),t.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-300">
                    <i class="bi bi-calendar2-x text-3xl"></i>
                </div>
                <p class="text-gray-800 font-bold text-lg mb-1">Agenda Livre</p>
                <p class="text-gray-500 text-sm">Não há agendamentos para esta data.</p>
            </div>`;return}let a='<div class="list-container px-4 py-2 space-y-4">';t.forEach(s=>{const o=new Date(s.startTime),r=new Date(s.endTime),i=Math.round((r-o)/6e4),n=o.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=g.professionalColors.get(s.professionalId)||{main:"#adb5bd"},d=s.status==="completed",c=JSON.stringify(s).replace(/'/g,"&apos;"),u=R.selectedItems.has(s.id),p=R.isSelectionMode?`<div class="flex items-center justify-center pr-3 border-r border-gray-100 mr-3">
                   <input type="checkbox" class="w-5 h-5 accent-indigo-600 pointer-events-none" ${u?"checked":""}>
               </div>`:"",b=u?"ring-2 ring-indigo-500 bg-indigo-50":"bg-white";if(s.type==="blockage"){a+=`<div class="list-card flex bg-red-50 rounded-2xl p-4 shadow-sm border border-red-100 mb-3 cursor-pointer">
                ${p}
                <div class="flex flex-col items-center justify-center border-r border-red-200 pr-4 min-w-[4.5rem]">
                    <span class="text-lg font-bold text-red-700">${n}</span>
                    <span class="text-xs text-red-500 font-semibold"><i class="bi bi-lock-fill"></i> Bloqueio</span>
                </div>
                <div class="flex-1 pl-4 flex flex-col justify-center">
                    <h3 class="font-bold text-red-800 text-sm">${X(s.reason)}</h3>
                    <p class="text-xs text-red-600 mt-1 font-medium">${X(s.professionalName)}</p>
                </div>
            </div>`;return}const f=Xi(s.clientPhone,s.clientName,s.serviceName,s.professionalName,s.startTime),h=(s.services||[]).reduce((P,N)=>P+(Number(N.price)||0),0)||Number(s.totalPrice||0)||Number(s.servicePrice||0),y=s.paymentStatus||(s.status==="completed"?"Finalizado":"Agendado"),S=X((s.professionalName||"").split(" ")[0]);a+=`<div class="list-card flex rounded-2xl p-3.5 shadow-sm border border-gray-100 cursor-pointer transition-transform active:scale-95 ${b} ${d?"opacity-70 bg-gray-50":""}"
            style="border-left: 5px solid ${l.main};"
            data-action="edit-appointment" data-appointment='${c}'>
            
            ${p}
            
            <div class="flex flex-col items-center justify-center border-r border-gray-100 pr-3.5 min-w-[4.5rem]">
                <span class="text-lg font-bold text-gray-900 ${d?"line-through text-gray-500":""}">${n}</span>
                <span class="text-xs text-gray-500 font-medium">${i} min</span>
            </div>
            
            <div class="flex-1 pl-3.5 flex flex-col justify-center min-w-0">
                <h3 class="font-bold text-gray-900 text-[0.95rem] truncate">${X(s.clientName)}</h3>
                <p class="text-xs text-gray-600 mt-0.5 truncate">${X(s.serviceName)} <span class="font-bold text-indigo-600 px-1">·</span> ${S}</p>
                
                <div class="flex flex-wrap gap-1.5 mt-2.5">
                    <span class="text-[0.65rem] bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200 font-bold">R$ ${h.toFixed(2).replace(".",",")}</span>
                    ${s.clientPhone?`<span class="text-[0.65rem] bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200 font-bold flex items-center gap-1"><i class="bi bi-telephone-fill opacity-70"></i> ${X(s.clientPhone)}</span>`:""}
                    <span class="text-[0.65rem] px-2 py-0.5 rounded border font-bold ${d?"bg-green-50 text-green-700 border-green-200":"bg-amber-50 text-amber-700 border-amber-200"}">${X(y)}</span>
                </div>
            </div>

            ${!d&&!R.isSelectionMode?`
            <div class="flex flex-col justify-center items-end pl-2 gap-2 border-l border-gray-50">
                <button class="lc-action-btn wa w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors" data-link="${f}" title="WhatsApp">
                    <i class="bi bi-whatsapp"></i>
                </button>
                <button class="lc-action-btn comanda w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors" data-action="open-comanda" data-appointment='${c}' title="Comanda">
                    <i class="bi bi-receipt-cutoff"></i>
                </button>
            </div>`:""}
        </div>`}),a+="</div>",e.innerHTML=a}function To(){const t=g.allEvents.filter(e=>R.selectedProfessionalId==="all"||e.professionalId===R.selectedProfessionalId);R.currentView==="list"?Zi(t):Yi(t),ps()}function ps(){const t=document.getElementById("batch-delete-container"),e=document.getElementById("agendaFab");t&&(R.isSelectionMode&&R.selectedItems.size>0?(t.innerHTML=`<div class="bg-gray-900 text-white p-3 mx-4 rounded-2xl shadow-xl flex items-center justify-between">
            <span class="font-semibold text-sm flex items-center"><span class="bg-indigo-500 text-white w-6 h-6 flex items-center justify-center rounded-full mr-2 text-xs">${R.selectedItems.size}</span> selecionados</span>
            <button data-action="batch-delete" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors">
                <i class="bi bi-trash3-fill"></i> Apagar
            </button>
        </div>`,t.style.display="block",e&&(e.style.transform="scale(0)")):(t.style.display="none",e&&(e.style.transform="scale(1)")))}function Ki(){const t=document.getElementById("currentMonthYearDisplay");if(t){const a=new Date(R.currentDate).toLocaleDateString("pt-BR",{month:"long",year:"numeric"});t.textContent=a.charAt(0).toUpperCase()+a.slice(1)}if(R.currentView==="list"){Gi();const e=document.getElementById("calendarStripContainer");e&&(e.style.display="flex")}else{const e=document.getElementById("calendarStripContainer");e&&(e.style.display="none")}}async function ve(){const t=document.getElementById("agenda-view");if(!t)return;R.selectedItems.clear(),ps(),t.innerHTML='<div class="flex items-center justify-center h-40"><div class="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>',Ki();let e,a;if(R.currentView==="list")e=new Date(R.currentDate),e.setHours(0,0,0,0),a=new Date(e),a.setHours(23,59,59,999);else{const s=Do(R.currentDate);e=new Date(s),a=new Date(s),a.setDate(s.getDate()+6),a.setHours(23,59,59,999)}try{const o=(g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId]).map(async d=>{const[c,u]=await Promise.all([ns(d,e.toISOString(),a.toISOString(),R.selectedProfessionalId==="all"?null:R.selectedProfessionalId),ba(d,e.toISOString(),a.toISOString(),R.selectedProfessionalId)]);return{appts:c||[],blockages:u||[]}}),r=await Promise.all(o);let i=[],n=[];if(r.forEach(d=>{i=i.concat(d.appts),n=n.concat(d.blockages)}),!document.getElementById("agenda-view"))return;const l=d=>d.map(c=>({...c,type:c.type||"appointment",professionalName:c.professionalName||(()=>{const u=g.professionals?.find(p=>p.id===c.professionalId);return u?u.name:"Indefinido"})()}));g.allEvents=[...l(i),...l(n)],us(),To()}catch{document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML=`
                <div class="text-center py-12 text-gray-500">
                    <i class="bi bi-exclamation-triangle text-3xl mb-2"></i>
                    <p class="text-sm font-medium">Erro ao carregar a agenda.</p>
                </div>`)}}async function en(){try{const e=(g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId]).map(async i=>{const[n,l,d]=await Promise.all([$e(i),dt(i),Be(i)]);return{profs:n||[],services:l||[],estDetails:d}}),a=await Promise.all(e),s=new Map,o=new Map;let r=a[0]?.estDetails;a.forEach(i=>{i.profs.forEach(n=>s.set(n.id,n)),i.services.forEach(n=>o.set(n.id,n))}),g.professionals=Array.from(s.values()),g.services=Array.from(o.values()),Co=[],r&&(aa=r.loyaltyProgram||{enabled:!1}),g.professionals.forEach((i,n)=>{g.professionalColors.set(i.id,ta[n%ta.length])}),us()}catch{m("Atenção","Não foi possível carregar os dados da equipe.","error")}}async function Po(t={}){R.currentDate=t.targetDate?new Date(t.targetDate):R.currentDate||new Date,R.isSelectionMode=!1,R.selectedItems.clear(),As.innerHTML=`
        <div class="flex flex-col h-[calc(100vh-80px)] md:h-auto bg-gray-50 relative font-sans w-full">

            <div class="bg-white pt-safe-top sticky top-0 z-10 shadow-sm border-b border-gray-100 flex flex-col">
                <div class="flex justify-between items-center px-4 py-3">
                    <div class="flex items-center gap-3">
                        <button id="btnWeekDays" class="text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors" title="Opções">
                            <i class="bi bi-sliders text-xl"></i>
                        </button>
                        <h1 id="currentMonthYearDisplay" class="text-lg font-bold text-gray-900 m-0 leading-none">Carregando...</h1>
                    </div>

                    <div class="flex items-center gap-1">
                        <button id="btnPrevDate" class="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors active:scale-95"><i class="bi bi-chevron-left"></i></button>
                        <button id="btnTodayHeader" class="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1.5 rounded-lg font-bold text-xs shadow-sm hover:bg-indigo-100 transition-colors uppercase tracking-wide">
                            Hoje
                        </button>
                        <button id="btnNextDate" class="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors active:scale-95"><i class="bi bi-chevron-right"></i></button>
                    </div>
                </div>
                
                <div class="flex justify-end px-4 pb-2">
                    <div class="agenda-view-toggle bg-gray-100 p-1 rounded-xl flex gap-1 w-full sm:w-auto">
                        <button class="${R.currentView==="list"?"bg-white shadow-sm":"text-gray-500"} rounded-lg px-3 py-1 text-xs font-bold transition-all w-1/2 sm:w-auto" data-action="setView" data-view="list">Lista</button>
                        <button class="${R.currentView==="week"?"bg-white shadow-sm":"text-gray-500"} rounded-lg px-3 py-1 text-xs font-bold transition-all w-1/2 sm:w-auto" data-action="setView" data-view="week">Semana</button>
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
            
            <div id="appointmentModal" class="fixed inset-0 z-[10000] bg-gray-50 flex-col hidden w-full h-full transform transition-transform duration-300 translate-y-full"></div>
        </div>`,document.getElementById("btnTodayHeader").addEventListener("click",()=>{R.currentDate=new Date,navigator.vibrate&&navigator.vibrate(30),ve()}),document.getElementById("btnPrevDate").addEventListener("click",()=>{R.currentView==="list"?R.currentDate.setDate(R.currentDate.getDate()-1):R.currentDate.setDate(R.currentDate.getDate()-7),navigator.vibrate&&navigator.vibrate(10),ve()}),document.getElementById("btnNextDate").addEventListener("click",()=>{R.currentView==="list"?R.currentDate.setDate(R.currentDate.getDate()+1):R.currentDate.setDate(R.currentDate.getDate()+7),navigator.vibrate&&navigator.vibrate(10),ve()});const e=document.querySelectorAll(".agenda-view-toggle button");e.forEach(a=>{a.addEventListener("click",()=>{e.forEach(s=>{s.classList.remove("bg-white","shadow-sm"),s.classList.add("text-gray-500")}),a.classList.add("bg-white","shadow-sm"),a.classList.remove("text-gray-500"),R.currentView=a.dataset.view,navigator.vibrate&&navigator.vibrate(20),ve()})}),document.getElementById("btnWeekDays").addEventListener("click",tn),Ms||(As.addEventListener("click",async a=>{const s=a.target.closest('[data-action="open-comanda"]');if(s){a.stopPropagation(),navigator.vibrate&&navigator.vibrate(20);const l=s.dataset.appointment||s.closest("[data-appointment]")?.dataset.appointment;if(!l)return;const d=JSON.parse(l.replace(/&apos;/g,"'")),c=d.status==="completed"?"finalizadas":"em-atendimento",u={selectedAppointmentId:d.id,initialFilter:c};c==="finalizadas"&&d.transaction?.paidAt&&(u.filterDate=typeof d.transaction.paidAt=="object"?new Date(d.transaction.paidAt._seconds*1e3):d.transaction.paidAt),ee("comandas-section",u);return}const o=a.target.closest(".lc-action-btn.wa");if(o){a.stopPropagation(),navigator.vibrate&&navigator.vibrate(20),o.dataset.link&&window.open(o.dataset.link,"_blank");return}if(a.target.closest('[data-action="batch-delete"]')){const l=R.selectedItems.size;await Y("Apagar Selecionados",`Deseja apagar ${l} registro(s)? Esta ação é irreversível.`)&&(await Promise.all(Array.from(R.selectedItems).map(async c=>{try{await Zr(c)}catch{}})),m(`${l} registro(s) apagado(s).`,"success"),R.selectedItems.clear(),R.isSelectionMode=!1,ve());return}const r=a.target.closest('[data-action="select-professional"]');if(r){navigator.vibrate&&navigator.vibrate(20);const l=r.dataset.profId;R.selectedProfessionalId=R.selectedProfessionalId===l&&l!=="all"?"all":l,ve();return}const i=a.target.closest(".list-card[data-appointment], .week-event-chip[data-appointment]");if(i){if(R.isSelectionMode){a.stopPropagation();const d=i.querySelector('input[type="checkbox"]');if(d){const c=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'")),u=!d.checked;d.checked=u,u?R.selectedItems.add(c.id):R.selectedItems.delete(c.id),(i.classList.contains("week-event-chip")||i.classList.contains("list-card"))&&(u?(i.classList.add("ring-2","ring-indigo-500","bg-indigo-50"),i.classList.remove("bg-white")):(i.classList.remove("ring-2","ring-indigo-500","bg-indigo-50"),i.classList.add("bg-white"))),navigator.vibrate&&navigator.vibrate(15),ps()}return}const l=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'"));navigator.vibrate&&navigator.vibrate(20),ja(l);return}if(a.target.closest('[data-action="new-appointment"]')){navigator.vibrate&&navigator.vibrate(30),ja();return}}),Ms=!0),await en(),await ve()}function tn(){const t=document.getElementById("optionsSheet");if(t){t.remove();return}const e=document.createElement("div");e.id="optionsSheet",e.className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white rounded-t-3xl z-[10000] shadow-[0_-8px_40px_rgba(0,0,0,0.15)] transition-transform duration-300 translate-y-full";const a=R.isSelectionMode?"bg-red-50 text-red-600":"bg-green-50 text-green-700",s=R.isSelectionMode?"bi-x-circle":"bi-check2-square";e.innerHTML=`
        <div class="px-6 py-5">
            <div class="w-10 h-1.5 bg-gray-200 rounded-full mx-auto mb-5"></div>
            
            <div class="flex justify-between items-center mb-5">
                <span class="text-lg font-bold text-gray-900">Opções da Agenda</span>
                <button id="closeOptSheet" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200">
                    <i class="bi bi-x-lg text-sm"></i>
                </button>
            </div>

            <div class="mb-5">
                <div class="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Ir para data</div>
                <input type="date" id="optDatePicker" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" value="${R.currentDate.toISOString().split("T")[0]}">
            </div>

            <div class="mb-5">
                <div class="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Gestão em Lote</div>
                <button id="optSelectMode" class="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 ${a} transition-colors active:scale-95">
                    <i class="bi ${s} text-lg"></i> ${R.isSelectionMode?"Desativar Modo de Exclusão":"Ativar Seleção Múltipla"}
                </button>
                <p class="text-xs text-gray-500 text-center mt-2.5">${R.isSelectionMode?"Toque num cartão para desmarcar.":"Permite selecionar vários registros para apagar."}</p>
            </div>

            <div class="mb-4">
                <div class="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Equipe</div>
                <label class="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer">
                    <input type="checkbox" id="optInactiveToggle" class="w-5 h-5 accent-indigo-600 rounded" ${R.showInactiveProfs?"checked":""}>
                    <span class="text-sm font-semibold text-gray-700">Exibir profissionais inativos na barra</span>
                </label>
            </div>
        </div>`;const o=document.createElement("div");o.id="optionsOverlay",o.className="fixed inset-0 bg-black/40 z-[9999] opacity-0 transition-opacity duration-300",document.body.appendChild(o),document.body.appendChild(e),requestAnimationFrame(()=>{e.classList.remove("translate-y-full"),o.classList.remove("opacity-0")});const r=()=>{e.classList.add("translate-y-full"),o.classList.add("opacity-0"),setTimeout(()=>{e.remove(),o.remove()},300)};document.getElementById("closeOptSheet").addEventListener("click",r),o.addEventListener("click",r),document.getElementById("optDatePicker").addEventListener("change",i=>{i.target.value&&(R.currentDate=new Date(i.target.value+"T12:00:00"),r(),ve())}),document.getElementById("optSelectMode").addEventListener("click",()=>{R.isSelectionMode=!R.isSelectionMode,R.isSelectionMode||R.selectedItems.clear(),r(),To()}),document.getElementById("optInactiveToggle").addEventListener("change",i=>{R.showInactiveProfs=i.target.checked,us()})}function Bt(t){t<1||t>4||(F.step=t,ja(null,!0))}function an(t){return{title:t?"Editar Reserva":"Novo Cliente",content:`
        <div class="p-4 space-y-5 flex-1">
            <div class="space-y-3">
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nome Completo</label>
                    <input type="text" id="apptClientName" placeholder="Ex: João Silva" class="w-full p-3.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 font-semibold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm" value="${X(F.data.clientName)}">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">WhatsApp / Telefone</label>
                    <input type="tel" id="apptClientPhone" placeholder="(00) 00000-0000" class="w-full p-3.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 font-semibold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm" value="${X(F.data.clientPhone)}">
                </div>
            </div>
            
            <div class="pt-5 border-t border-gray-200">
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Buscar na Base de Dados</label>
                <div class="relative">
                    <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input type="text" id="clientSearchInput" placeholder="Procurar cliente..." class="w-full p-3.5 pl-11 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-900 font-medium focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all">
                </div>
                <div id="clientSearchResults" class="mt-3 space-y-2"></div>
            </div>
        </div>
        <div class="p-4 bg-white border-t border-gray-200 flex gap-3 pb-safe">
            <button type="button" data-action="close-modal" class="flex-1 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl active:bg-gray-200 transition-colors">Cancelar</button>
            <button type="button" data-action="next-step" data-current-step="1" class="flex-1 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform">Avançar</button>
        </div>`}}function sn(){return{title:"Serviços",content:`
        <div class="p-4 space-y-4 flex-1 flex flex-col">
            <div class="flex items-center gap-3">
                <div class="relative flex-1">
                    <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input type="search" id="serviceSearchModalInput" placeholder="Buscar serviço..." class="w-full p-2.5 pl-9 bg-gray-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none">
                </div>
                <label class="flex items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-gray-200 cursor-pointer shadow-sm">
                    <input type="checkbox" id="multiServiceToggle" class="w-4 h-4 accent-indigo-600 rounded" ${F.data.selectedServiceIds.length>1?"checked":""}>
                    <span class="text-[0.7rem] font-bold text-gray-700 uppercase">Múltiplos</span>
                </label>
            </div>
            <div id="apptServicesContainer" class="flex-1 overflow-y-auto grid grid-cols-1 gap-2 pb-4">
                ${ma.map(t=>`<div class="service-card p-3 bg-white rounded-xl border transition-all active:scale-95 ${F.data.selectedServiceIds.includes(t.id)?"border-indigo-500 bg-indigo-50 shadow-sm":"border-gray-200 hover:border-indigo-200"} cursor-pointer flex justify-between items-center gap-2" data-service-id="${t.id}">
                        <div class="flex-1 min-w-0">
                            <p class="font-bold text-[0.85rem] text-gray-900 leading-tight truncate">${X(t.name)}</p>
                            <p class="text-[0.65rem] font-bold text-gray-500 mt-1"><i class="bi bi-clock mr-1"></i>${t.duration} min</p>
                        </div>
                        <div class="text-right whitespace-nowrap pl-2">
                            <p class="text-[0.8rem] font-black text-indigo-600">R$ ${t.price.toFixed(2).replace(".",",")}</p>
                        </div>
                    </div>`).join("")}
            </div>
        </div>
        <div class="p-4 bg-white border-t border-gray-200 flex gap-3 pb-safe">
            <button type="button" data-action="prev-step" data-current-step="2" class="w-1/3 py-3.5 bg-gray-100 text-gray-700 font-bold text-sm rounded-xl active:bg-gray-200 transition-colors">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="2" class="w-2/3 py-3.5 bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-md active:scale-95 transition-transform">Avançar</button>
        </div>`}}function on(){return{title:"Equipe",content:`
        <div class="p-4 space-y-4 flex-1 flex flex-col">
            <div class="relative">
                <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input type="search" id="professionalSearchModalInput" placeholder="Procurar profissional..." class="w-full p-3 pl-10 bg-gray-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 outline-none">
            </div>
            <div id="apptProfessionalContainer" class="flex-1 overflow-y-auto grid grid-cols-3 gap-2.5 pb-4">
                ${qa.map(t=>{const e=F.data.professionalId===t.id,a=g.professionalColors.get(t.id)||ta[0];return`<div class="professional-modal-card p-3 bg-white rounded-xl border transition-all active:scale-95 ${e?"border-indigo-500 bg-indigo-50 shadow-sm":"border-gray-200 hover:border-indigo-200"} cursor-pointer text-center flex flex-col items-center justify-center gap-2" data-professional-id="${t.id}">
                        <div class="w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-lg shadow-sm" style="background-color: ${a.main}; ${t.photo?`background-image: url('${X(t.photo)}'); background-size: cover; background-position: center;`:""}">
                            ${t.photo?"":X(t.name).charAt(0)}
                        </div>
                        <p class="text-[0.7rem] font-bold text-gray-900 w-full truncate">${X(t.name.split(" ")[0])}</p>
                    </div>`}).join("")}
            </div>
        </div>
        <div class="p-4 bg-white border-t border-gray-200 flex gap-3 pb-safe">
            <button type="button" data-action="prev-step" data-current-step="3" class="w-1/3 py-3.5 bg-gray-100 text-gray-700 font-bold text-sm rounded-xl active:bg-gray-200 transition-colors">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="3" class="w-2/3 py-3.5 bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-md active:scale-95 transition-transform">Avançar</button>
        </div>`}}function rn(){const t=F.data.date||new Date().toISOString().split("T")[0];return{title:"Horário",content:`
        <div class="p-4 space-y-5 flex-1 flex flex-col">
            
            <div class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-lg">${X(F.data.clientName).charAt(0)}</div>
                <div class="flex-1 min-w-0">
                    <p class="font-bold text-[0.85rem] text-gray-900 truncate">${X(F.data.clientName)}</p>
                    <p class="text-[0.65rem] font-bold text-gray-500 truncate mt-0.5"><i class="bi bi-person-badge mr-1"></i> ${X(F.data.professionalName)}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Data</label>
                    <input type="date" id="apptDate" class="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-gray-900 focus:border-indigo-500 outline-none shadow-sm" value="${t}">
                </div>
                <div>
                    <label class="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Tempo</label>
                    <div class="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 flex items-center justify-center gap-1.5 shadow-sm">
                        <i class="bi bi-stopwatch text-indigo-500"></i> <span id="apptTotalDuration">--</span>
                    </div>
                </div>
            </div>

            <div class="flex-1 flex flex-col min-h-0">
                <label class="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mb-2">Horários Disponíveis</label>
                <div id="availableTimesContainer" class="flex-1 overflow-y-auto grid grid-cols-4 gap-2 pb-2"></div>
            </div>
            <div id="loyaltyRewardsContainer"></div>
        </div>
        <div class="p-4 bg-white border-t border-gray-200 flex gap-3 pb-safe">
            <button type="button" data-action="prev-step" data-current-step="4" class="w-1/3 py-3 bg-gray-100 text-gray-700 font-bold text-sm rounded-xl active:bg-gray-200 transition-colors">Voltar</button>
            <button type="submit" class="w-2/3 py-3 bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
                <i class="bi bi-check-circle-fill"></i> ${F.data.id?"Salvar Edição":"Confirmar"}
            </button>
        </div>`}}async function ja(t=null,e=!1){const a=document.getElementById("appointmentModal");e||(F={step:1,data:{id:t?.id||null,clientName:t?.clientName||"",clientPhone:t?.clientPhone||"",selectedServiceIds:t?.services?.map(o=>o.id)||[],professionalId:t?.professionalId||null,professionalName:t?.professionalName||"",date:t?.startTime?new Date(t.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],time:t?.startTime?new Date(t.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null,originalDate:t?.startTime?new Date(t.startTime).toISOString().split("T")[0]:null,originalTime:t?.startTime?new Date(t.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null,redeemedReward:t?.redeemedReward||null,clientHasRewards:t?.hasRewards||!1,clientLoyaltyPoints:0}}),ma=g.services||[],qa=(g.professionals||[]).filter(o=>o.status==="active");let s;switch(F.step){case 1:s=an(t);break;case 2:s=sn();break;case 3:s=on();break;case 4:s=rn();break}a.className="fixed inset-0 z-[10000] bg-gray-50 flex flex-col w-full h-full transform transition-transform duration-300 translate-y-full",a.innerHTML=`
        <header class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between pt-safe-top shadow-sm z-20">
            <button type="button" data-action="close-modal" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 active:scale-90 transition-transform">
                <i class="bi bi-x-lg"></i>
            </button>
            <div class="text-center flex-1 px-2">
                <h2 class="text-sm font-black text-gray-900 tracking-tight leading-tight truncate">${s.title}</h2>
                <div class="flex items-center justify-center gap-1 mt-1">
                    <div class="w-2 h-1.5 rounded-full ${F.step>=1?"bg-indigo-600 w-4":"bg-gray-200"} transition-all"></div>
                    <div class="w-2 h-1.5 rounded-full ${F.step>=2?"bg-indigo-600 w-4":"bg-gray-200"} transition-all"></div>
                    <div class="w-2 h-1.5 rounded-full ${F.step>=3?"bg-indigo-600 w-4":"bg-gray-200"} transition-all"></div>
                    <div class="w-2 h-1.5 rounded-full ${F.step>=4?"bg-indigo-600 w-4":"bg-gray-200"} transition-all"></div>
                </div>
            </div>
            <div class="w-10 h-10"></div> 
        </header>
        <form id="appointmentForm" class="flex-1 overflow-y-auto flex flex-col bg-gray-50">${s.content}</form>
    `,a.querySelectorAll('[data-action="next-step"]').forEach(o=>o.addEventListener("click",()=>{const r=parseInt(o.dataset.currentStep,10);if(r===1&&(F.data.clientName=a.querySelector("#apptClientName").value.trim(),F.data.clientPhone=a.querySelector("#apptClientPhone").value.trim(),!F.data.clientName))return m("Preencha o nome do cliente.","warning");if(r===2&&F.data.selectedServiceIds.length===0)return m("Selecione um serviço.","warning");if(r===3&&!F.data.professionalId)return m("Escolha um membro da equipe.","warning");Bt(r+1)})),a.querySelectorAll('[data-action="prev-step"]').forEach(o=>o.addEventListener("click",()=>Bt(parseInt(o.dataset.currentStep,10)-1))),a.querySelector('[data-action="close-modal"]')?.addEventListener("click",()=>{a.classList.remove("translate-y-0"),a.classList.add("translate-y-full"),setTimeout(()=>{a.classList.add("hidden")},300)}),F.step===4&&a.querySelector("#appointmentForm").addEventListener("submit",nn),a.classList.remove("hidden"),requestAnimationFrame(()=>{a.classList.remove("translate-y-full"),a.classList.add("translate-y-0")}),F.step===2&&a.querySelectorAll(".service-card").forEach(o=>o.addEventListener("click",()=>{const r=a.querySelector("#multiServiceToggle")?.checked,i=o.classList.contains("bg-indigo-50");navigator.vibrate&&navigator.vibrate(10);const n=o.dataset.serviceId;r?i?(o.classList.remove("border-indigo-500","bg-indigo-50","shadow-sm"),o.classList.add("border-gray-200"),F.data.selectedServiceIds=F.data.selectedServiceIds.filter(l=>l!==n)):(o.classList.add("border-indigo-500","bg-indigo-50","shadow-sm"),o.classList.remove("border-gray-200"),F.data.selectedServiceIds.includes(n)||F.data.selectedServiceIds.push(n)):(a.querySelectorAll(".service-card.bg-indigo-50").forEach(l=>{l.classList.remove("border-indigo-500","bg-indigo-50","shadow-sm"),l.classList.add("border-gray-200")}),F.data.selectedServiceIds=[n],o.classList.add("border-indigo-500","bg-indigo-50","shadow-sm"),o.classList.remove("border-gray-200"),setTimeout(()=>Bt(3),200))})),F.step===3&&a.querySelectorAll(".professional-modal-card").forEach(o=>o.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(10),a.querySelectorAll(".professional-modal-card.bg-indigo-50").forEach(i=>{i.classList.remove("border-indigo-500","bg-indigo-50","shadow-sm"),i.classList.add("border-gray-200")}),o.classList.add("border-indigo-500","bg-indigo-50","shadow-sm"),o.classList.remove("border-gray-200"),F.data.professionalId=o.dataset.professionalId;const r=qa.find(i=>i.id===o.dataset.professionalId);F.data.professionalName=r?r.name:"",setTimeout(()=>Bt(4),200)})),F.step===1&&a.querySelector("#clientSearchInput")?.addEventListener("input",o=>dn(o.target.value)),F.step===4&&(a.querySelector("#apptDate")?.addEventListener("change",qs),qs(),ln())}async function nn(t){t.preventDefault();const e=t.target.querySelector('button[type="submit"]');if(!F.data.time||!F.data.selectedServiceIds.length||!F.data.professionalId){m("Selecione horário, serviço e profissional.","warning");return}e.disabled=!0,e.innerHTML='<i class="bi bi-hourglass-split"></i> Salvando...';const a=F.data.selectedServiceIds.map(l=>{const d=ma.find(c=>c.id===l);return{id:d.id,name:d.name,price:d.price,duration:d.duration,bufferTime:d.bufferTime||0,photo:d.photo||null}}),[s,o]=F.data.time.split(":"),r=new Date(`${F.data.date}T${s}:${o}:00`),n={establishmentId:g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments[0]:g.establishmentId,clientName:F.data.clientName,clientPhone:F.data.clientPhone,services:a,professionalId:F.data.professionalId,professionalName:F.data.professionalName,startTime:r.toISOString(),redeemedReward:F.data.redeemedReward};F.data.id&&(n.id=F.data.id);try{F.data.id?await Yr(F.data.id,n):await Xr(n),m("Agendamento salvo com sucesso!","success");const l=document.getElementById("appointmentModal");l.classList.remove("translate-y-0"),l.classList.add("translate-y-full"),setTimeout(()=>{l.classList.add("hidden")},300),ve()}catch(l){m(l.message,"error"),e.disabled=!1,e.innerHTML=`<i class="bi bi-check-circle-fill"></i> ${F.data.id?"Salvar Edição":"Confirmar"}`}}async function qs(){const t=document.getElementById("availableTimesContainer"),e=document.getElementById("apptTotalDuration");if(!t)return;const a=document.getElementById("apptDate");a&&a.value&&(F.data.date=a.value);const s=F.data.selectedServiceIds.reduce((c,u)=>{const p=ma.find(b=>b.id===u);return c+(p?p.duration+(p.bufferTime||0):0)},0);e&&(e.innerHTML=`<strong>${s}</strong> min`);const{professionalId:o,selectedServiceIds:r,date:i,originalDate:n,originalTime:l,id:d}=F.data;if(!o||!r.length||!i){t.innerHTML='<p class="col-span-full text-center text-xs text-gray-500 font-bold py-6">Preencha os passos anteriores.</p>';return}t.innerHTML='<div class="col-span-full flex justify-center py-4"><div class="w-6 h-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>';try{const c=g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments[0]:g.establishmentId;let u=await Gr({establishmentId:c,professionalId:o,serviceIds:r,date:i});const p=new Date;if(new Date(i+"T00:00:00").toDateString()===p.toDateString()){const b=p.getHours()*60+p.getMinutes();u=u.filter(f=>{const[h,y]=f.split(":").map(Number);return h*60+y>=b})}d&&i===n&&l&&(u.includes(l)||(u.push(l),u.sort())),t.innerHTML=u.length>0?u.map(b=>`<button type="button" class="py-2.5 text-[0.75rem] font-bold rounded-lg border transition-transform active:scale-95 ${F.data.time===b?"bg-indigo-600 text-white border-indigo-600 shadow-sm":"bg-white text-gray-700 border-gray-200 hover:border-indigo-300"}" onclick="document.querySelectorAll('#availableTimesContainer button').forEach(b=>{b.classList.remove('bg-indigo-600','text-white','border-indigo-600','shadow-sm');b.classList.add('bg-white','text-gray-700','border-gray-200')});this.classList.add('bg-indigo-600','text-white','border-indigo-600','shadow-sm');this.classList.remove('bg-white','text-gray-700','border-gray-200');window._selectedTime='${b}'; newAppointmentState.data.time='${b}'; if(navigator.vibrate) navigator.vibrate(10);">${b}</button>`).join(""):'<p class="col-span-full text-center text-xs font-bold text-red-500 bg-red-50 py-3 rounded-lg border border-red-100">Horários indisponíveis.</p>'}catch{t.innerHTML='<p class="col-span-full text-center text-xs font-bold text-red-500 bg-white py-3 rounded-xl">Erro ao pesquisar.</p>'}}function ln(){const t=document.getElementById("loyaltyRewardsContainer");if(!t)return;const{clientHasRewards:e,clientLoyaltyPoints:a}=F.data,{enabled:s,rewards:o}=aa;if(!s||!e||!o?.length){t.innerHTML="";return}const r=o.filter(i=>a>=i.points);if(!r.length){t.innerHTML='<p class="text-[0.65rem] font-bold text-gray-400 mt-2 text-center">Nenhuma recompensa atingida.</p>';return}t.innerHTML=`<div class="border border-indigo-100 bg-indigo-50/80 rounded-xl p-3 mt-2">
        <p class="text-[0.65rem] font-bold text-indigo-800 uppercase tracking-wider mb-2">Recompensas (${a} pts)</p>
        ${r.map(i=>`<label class="flex items-center gap-2 p-2 bg-white border border-indigo-100 rounded-lg mb-1.5 cursor-pointer active:scale-95 transition-transform"><input type="radio" name="loyaltyReward" value="${X(i.reward)}" data-points="${i.points}" class="w-3.5 h-3.5 accent-indigo-600"><span class="text-xs font-bold text-gray-800 flex-1">${X(i.reward)}</span><span class="text-[0.65rem] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">-${i.points} pts</span></label>`).join("")}
    </div>`,t.querySelectorAll('input[name="loyaltyReward"]').forEach(i=>{i.addEventListener("change",n=>{n.target.checked&&(F.data.redeemedReward={reward:n.target.value,points:parseInt(n.target.dataset.points,10)})})})}async function dn(t){const e=document.getElementById("clientSearchResults");if(!e||t.trim().length<3){e&&(e.innerHTML="");return}e.innerHTML='<div class="text-center py-2"><div class="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div></div>';try{const s=(g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId]).map(n=>lt(n,t.trim())),o=await Promise.all(s),r=new Map;o.forEach(n=>{n.forEach(l=>{l.phone?r.set(l.phone,l):r.set(l.id||Math.random().toString(),l)})});const i=Array.from(r.values());if(Co=i,!i.length){e.innerHTML='<p class="text-xs text-gray-500 bg-white border border-gray-200 p-2 rounded-lg text-center font-bold">Nenhum cliente encontrado.</p>';return}e.innerHTML=i.map(n=>`<div class="client-card p-2.5 bg-white rounded-xl border transition-all active:scale-95 ${F.data.clientName===n.name&&F.data.clientPhone===n.phone?"border-indigo-500 bg-indigo-50":"border-gray-200 hover:border-indigo-300"} cursor-pointer flex items-center gap-3" data-client-name="${X(n.name)}" data-client-phone="${X(n.phone)}" data-loyalty-points="${n.loyaltyPoints||0}">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-black text-gray-500 flex-shrink-0">${X(n.name).charAt(0)}</div>
                <div class="flex-1 min-w-0"><p class="text-sm font-bold text-gray-900 truncate">${X(n.name)}</p><p class="text-[0.65rem] font-semibold text-gray-500 truncate mt-0.5">${X(n.phone)}</p></div>
            </div>`).join(""),e.querySelectorAll(".client-card").forEach(n=>{n.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(10),F.data.clientName=n.dataset.clientName,F.data.clientPhone=n.dataset.clientPhone,F.data.clientLoyaltyPoints=parseInt(n.dataset.loyaltyPoints||"0",10);const l=Math.min(...(aa?.rewards||[]).map(d=>d.points));F.data.clientHasRewards=aa.enabled&&l!==1/0&&F.data.clientLoyaltyPoints>=l,document.getElementById("apptClientName").value=n.dataset.clientName,document.getElementById("apptClientPhone").value=n.dataset.clientPhone,e.querySelectorAll(".client-card").forEach(d=>{d.classList.remove("border-indigo-500","bg-indigo-50"),d.classList.add("border-gray-200")}),n.classList.add("border-indigo-500","bg-indigo-50"),n.classList.remove("border-gray-200")})})}catch{e.innerHTML='<p class="text-xs font-bold text-red-500 bg-red-50 p-2 rounded-lg text-center">Erro ao pesquisar.</p>'}}const cn=(t,e=null,a=1,s=12)=>{let o=`/api/comandas/${t}?page=${a}&limit=${s}`;return e&&(typeof e=="object"?(e.startDate&&(o+=`&startDate=${e.startDate}`),e.endDate&&(o+=`&endDate=${e.endDate}`)):typeof e=="string"&&(o+=`&date=${e}`)),C(o)},un=(t,e)=>C(`/api/appointments/${t}/comanda`,{method:"POST",body:JSON.stringify({items:e})}),Bo=t=>C("/api/sales",{method:"POST",body:JSON.stringify(t)}),Na=(t,e)=>C(`/api/sales/${t}?date=${e}`),pn=(t,e,a)=>{const s=`/api/sales/${t}?startDate=${e}&endDate=${a}`;return C(s)},bn=t=>C(`/api/sales/${t}/reopen`,{method:"POST"}),Ao=t=>C(`/api/sales/${t}`,{method:"DELETE"}),js=Object.freeze(Object.defineProperty({__proto__:null,createSale:Bo,deleteSale:Ao,getSales:Na,getSalesByDateRange:pn,reopenSale:bn},Symbol.toStringTag,{value:"Module"})),ct=t=>C(`/api/products/${t}`),Mo=t=>C("/api/products",{method:"POST",body:JSON.stringify(t)}),qo=(t,e)=>C(`/api/products/${t}`,{method:"PUT",body:JSON.stringify(e)}),bs=t=>C(`/api/products/${t}`,{method:"DELETE"}),jo=(t,e)=>C(`/api/products/${t}/stock`,{method:"PATCH",body:JSON.stringify(e)}),gn=t=>C(`/api/products/${t}/stock-history`),No=({startDate:t,endDate:e,productId:a,categoryId:s,establishmentId:o})=>{const r=new URLSearchParams({startDate:t,endDate:e});return a&&a!=="all"&&r.append("productId",a),s&&s!=="all"&&r.append("categoryId",s),o&&r.append("establishmentId",o),C(`/api/products/stock-history/report?${r.toString()}`)},mn=Object.freeze(Object.defineProperty({__proto__:null,adjustStock:jo,createProduct:Mo,deleteProduct:bs,getProducts:ct,getStockHistory:gn,getStockReport:No,updateProduct:qo},Symbol.toStringTag,{value:"Module"})),fn=()=>C("/api/cashier/status").catch(t=>{if(t.message.includes("404")||t.message.includes("não encontrada"))return null;throw t}),xn=t=>{const e={establishmentId:t.establishmentId,initialAmount:Number(t.initialAmount),notes:t.notes||""};return console.log("Payload enviado para abrir caixa:",e),C("/api/cashier/open",{method:"POST",body:JSON.stringify(e)})},hn=(t,e)=>{const a={finalAmount:Number(e)};return console.log("Payload enviado para fechar caixa:",a),C(`/api/cashier/close/${t}`,{method:"PUT",body:JSON.stringify(a)})},vn=()=>C("/api/cashier/history").then(t=>t||[]).catch(t=>(console.error("Erro ao buscar histórico:",t),[])),yn=t=>C(`/api/cashier/report/${t}`),gs=t=>C(`/api/packages/${t}`),wn=t=>C("/api/packages",{method:"POST",body:JSON.stringify(t)}),kn=(t,e)=>C(`/api/packages/${t}`,{method:"PUT",body:JSON.stringify(e)}),$n=t=>C(`/api/packages/${t}`,{method:"DELETE"}),fa=t=>C(`/api/financial/natures/${t}`),Sn=t=>C("/api/financial/natures",{method:"POST",body:JSON.stringify(t)}),En=t=>C(`/api/financial/natures/${t}`,{method:"DELETE"}),ms=t=>C(`/api/financial/cost-centers/${t}`),In=t=>C("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(t)}),Ln=t=>C(`/api/financial/cost-centers/${t}`,{method:"DELETE"}),Ro=(t,e)=>C(`/api/financial/${t}`,{method:"POST",body:JSON.stringify(e)}),Fo=(t,e={})=>{let a=`/api/financial/${t}`;const s=new URLSearchParams;e.establishmentId&&s.append("establishmentId",e.establishmentId),e.startDate&&s.append("startDate",e.startDate),e.endDate&&s.append("endDate",e.endDate),e.natureId&&s.append("natureId",e.natureId),e.costCenterId&&s.append("costCenterId",e.costCenterId),e.status&&s.append("status",e.status);const o=s.toString();return o&&(a+=`?${o}`),C(a)},Ho=(t,e,a)=>C(`/api/financial/${t}/${e}`,{method:"PUT",body:JSON.stringify(a)}),Oo=(t,e)=>C(`/api/financial/${t}/${e}`,{method:"DELETE"}),zo=(t,e)=>{const a=e.map(s=>C(`/api/financial/${t}/${s}`,{method:"DELETE"}));return Promise.all(a)},_o=(t,e,a)=>C(`/api/financial/${t}/${e}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),Vo=t=>Ro("payables",t),Uo=t=>Fo("payables",t),Cn=(t,e)=>Ho("payables",t,e),Dn=t=>Oo("payables",t),Tn=(t,e)=>_o("payables",t,e),Wo=t=>Ro("receivables",t),Qo=t=>Fo("receivables",t),Pn=(t,e)=>Ho("receivables",t,e),Bn=t=>Oo("receivables",t),An=(t,e)=>_o("receivables",t,e);let x={allComandas:[],catalog:{services:[],products:[],packages:[]},activeFilter:"abertas",selectedComandaId:null,viewMode:"items",selectedCatalogItem:null,isCashierOpen:!1,activeCashierSessionId:null,loyaltySettings:null,establishmentConfig:null,pendingRedemption:null,paging:{page:1,limit:15,total:0},checkoutState:{payments:[],selectedMethod:"dinheiro",installments:1,amountReceived:"",discount:{type:"real",value:0},discountReason:""},isProcessing:!1,showHistoryPanel:!1,filterStartDate:"",filterEndDate:"",filterPreset:"hoje"},Oe=null,Ue=null,Ns=null;function Jo(t,e){return function(...a){clearTimeout(Ns),Ns=setTimeout(()=>t.apply(this,a),e)}}function Ea(t){const e=new Date;let a,s;t==="hoje"?(a=new Date,s=new Date):t==="este_mes"?(a=new Date(e.getFullYear(),e.getMonth(),1),s=new Date(e.getFullYear(),e.getMonth()+1,0)):t==="mes_passado"?(a=new Date(e.getFullYear(),e.getMonth()-1,1),s=new Date(e.getFullYear(),e.getMonth(),0)):(a=new Date,s=new Date);const o=r=>{const i=r.getTimezoneOffset()*6e4;return new Date(r-i).toISOString().split("T")[0]};return{start:o(a),end:o(s)}}async function Rs(t,e="stay"){if(!t||!t.id)return;t._localUpdatedAt=Date.now(),t._cachedItems=null,t._hasUnsavedChanges=!1,ha(),e==="checkout"&&(x.viewMode="checkout",x.checkoutState.payments||(x.checkoutState.payments=[]),x.checkoutState.selectedMethod="dinheiro",x.checkoutState.amountReceived="",x.checkoutState.discount.value||(x.checkoutState.discount={type:"real",value:0},x.checkoutState.discountReason=""),K());const a=document.createElement("div");a.id="saving-overlay",a.className="fixed inset-0 bg-gray-900/60 z-[999999] flex items-center justify-center backdrop-blur-sm",a.innerHTML=`
        <div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center animate-fade-in border border-gray-100">
            <div class="loader mb-4"></div>
            <p class="text-gray-800 font-black text-sm uppercase tracking-widest">Sincronizando...</p>
        </div>
    `,document.body.appendChild(a);try{const s=(t.comandaItems||[]).filter(o=>o&&o.id&&String(o.id)!=="undefined"&&String(o.id)!=="null").map(o=>{const r={...o};if(r.id=String(o.id),r.type==="product"){const i=r.id;r.productId||(r.productId=i),r.product_id||(r.product_id=i)}if(r.type==="service"){const i=r.id;r.serviceId||(r.serviceId=i),r.service_id||(r.service_id=i)}return r});t.type==="walk-in"&&String(t.id).startsWith("temp-")||await un(t.id,s),document.body.contains(a)&&document.body.removeChild(a),e!=="checkout"&&(m("Sucesso","Comanda atualizada e salva!","success"),K())}catch(s){document.body.contains(a)&&document.body.removeChild(a),console.error("Erro ao salvar:",s),t._hasUnsavedChanges=!0,K(),m("Erro","Falha ao salvar no servidor: "+s.message,"warning")}}function Ae(t){if(!t._cachedItems){let e=[];if(t.status==="completed"){const a=t.comandaItems||t.items||[];e=a.length>0?a:t.services||[]}else{const a=(t.services||[]).map(i=>({...i,_source:"original_service",type:"service"})),s=a.reduce((i,n)=>{const l=String(n.id);return i[l]=(i[l]||0)+1,i},{}),o=[...t.comandaItems||[],...t.items||[]],r=[];o.forEach(i=>{const n=String(i.id);(i.type==="service"||!i.type)&&s[n]>0?s[n]--:r.push({...i,_source:"extra"})}),e=[...a,...r]}return t._cachedItems=e,t._cachedTimestamp=Date.now(),e}return t._cachedItems}function Mn(){const t=document.getElementById("comandas-layout");t&&t.classList.add("mobile-detail-open");const e=document.getElementById("mobile-bottom-nav");e&&(e.style.display="none")}function Qe(){const t=document.getElementById("comandas-layout");t&&t.classList.remove("mobile-detail-open");const e=document.getElementById("mobile-bottom-nav");e&&(e.style.display="")}function qn(){const t=x.allComandas||[],e=t.filter(d=>d.status!=="completed").length,a=t.filter(d=>d.status==="completed"),s=a.reduce((d,c)=>{let u=c.totalAmount!==void 0?Number(c.totalAmount):Ae(c).reduce((p,b)=>p+Number(b.price||0),0);return d+u},0),o=a.length>0?s/a.length:0,r=document.getElementById("kpi-abertas"),i=document.getElementById("kpi-pagas"),n=document.getElementById("kpi-vendas"),l=document.getElementById("kpi-ticket");r&&(r.textContent=e),i&&(i.textContent=a.length),n&&(n.textContent=`R$ ${s.toFixed(2).replace(".",",")}`),l&&(l.textContent=`R$ ${o.toFixed(2).replace(".",",")}`)}function At(){Ue.innerHTML=`
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
    `,xa(),fs()}function fs(){document.querySelectorAll(".filter-btn").forEach(e=>{e.classList.remove("bg-indigo-600","text-white","border-indigo-600"),e.classList.add("bg-white","text-gray-600","border-gray-200")});const t=document.querySelector(`[data-filter="${x.activeFilter}"]`);t&&(t.classList.remove("bg-white","text-gray-600","border-gray-200"),t.classList.add("bg-indigo-600","text-white","border-indigo-600"))}function xa(){const t=document.getElementById("cashier-alert-box"),e=document.getElementById("btn-new-sale");x.isCashierOpen?(t&&(t.innerHTML=""),e&&(e.classList.remove("opacity-50","cursor-not-allowed"),e.disabled=!1)):(t&&(t.innerHTML=`
            <div class="bg-amber-50 border-l-4 border-amber-400 p-2 mb-2 rounded-r-lg animate-fade-in mx-1 shadow-sm">
                <div class="flex items-center">
                    <i class="bi bi-exclamation-triangle text-amber-500 mr-2 text-base"></i>
                    <p class="text-[10px] md:text-xs text-amber-800 leading-tight">
                        <strong>Caixa Fechado!</strong> Abra o caixa para operações.
                    </p>
                </div>
            </div>
        `),e&&(e.classList.add("opacity-50","cursor-not-allowed"),e.disabled=!0)),jn()}function jn(){const t=document.getElementById("cashier-controls");t&&(x.isCashierOpen?t.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-green-700 bg-green-100 py-1.5 px-2.5 rounded-lg border border-green-200 uppercase tracking-widest shadow-sm"><i class="bi bi-unlock-fill"></i> Caixa Aberto</span>
            <button data-action="close-cashier" class="py-1 px-3 bg-red-50 text-red-700 border border-red-200 font-bold rounded-lg hover:bg-red-100 text-[10px] transition shadow-sm">Fechar Caixa</button>
        `:t.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-red-700 bg-red-100 py-1.5 px-2.5 rounded-lg border border-red-200 uppercase tracking-widest shadow-sm"><i class="bi bi-lock-fill"></i> Caixa Fechado</span>
            <button data-action="open-cashier" class="py-1 px-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 text-[10px] shadow-sm transition">Abrir Caixa</button>
        `)}function ha(){const t=document.getElementById("comandas-list"),e=document.getElementById("pagination-container");if(!t)return;if(!x.isCashierOpen&&x.activeFilter==="abertas"){t.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <i class="bi bi-lock text-3xl text-gray-300 mb-2 block"></i>
                <p class="text-xs font-bold text-gray-600 uppercase tracking-widest">Caixa Fechado</p>
                <p class="text-[10px] text-gray-500 mt-1">Abra o caixa para ver as vendas</p>
            </div>
        `,e&&(e.innerHTML="");return}let a=x.allComandas||[];if(x.activeFilter==="abertas"?a=a.filter(o=>o.status!=="completed"):x.activeFilter==="pagas"&&(a=a.filter(o=>o.status==="completed")),qn(),a.length===0){t.innerHTML='<p class="text-center text-gray-400 py-10 text-xs font-medium">Nenhuma venda encontrada para este filtro e período.</p>',Fs(e);return}const s=document.createDocumentFragment();a.forEach(o=>{const r=Ae(o);let i=0;o.status==="completed"&&o.totalAmount!==void 0&&o.totalAmount!==null?i=Number(o.totalAmount):i=r.reduce((N,$)=>N+Number($.price||0),0);const l=o.loyaltyRedemption||o.discount&&o.discount.reason&&String(o.discount.reason).toLowerCase().includes("fidelidade")?'<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-4 h-4 ml-1 text-[10px]" title="Prémio Resgatado">🎁</span>':"",d=String(o.id)===String(x.selectedComandaId),c=new Date(o.startTime),u=c.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),p=c.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),b=o.type==="walk-in"||typeof o.id=="string"&&o.id.startsWith("temp-"),f=o.status==="completed",h=v(o.clientName||"Cliente sem nome"),y=v(o.professionalName||"Sem profissional");let S="";f?S='<span class="text-[9px] font-bold uppercase text-green-700 bg-green-100 px-1.5 py-0.5 rounded border border-green-200">Paga</span>':b?S='<span class="text-[9px] font-bold uppercase text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded border border-blue-200">Avulsa</span>':S='<span class="text-[9px] font-bold uppercase text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded border border-indigo-200">Agenda</span>';const P=document.createElement("div");P.className=`comanda-card cursor-pointer border border-gray-100 rounded-lg p-2.5 hover:bg-gray-50 transition-colors shadow-sm ${d?"ring-2 ring-indigo-500 bg-indigo-50/50":"bg-white"}`,P.dataset.action="select-comanda",P.dataset.comandaId=o.id,P.innerHTML=`
            <div class="flex justify-between items-start mb-1.5 pointer-events-none">
                <p class="font-bold text-gray-800 truncate flex-1 min-w-0 pr-2 text-sm">${h}</p>
                <div class="flex items-center flex-shrink-0">
                    <p class="font-black ${f?"text-green-600":"text-gray-800"} text-sm">R$ ${i.toFixed(2)}</p>
                    ${l}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none gap-2">
                <div class="flex items-center gap-1.5 min-w-0 flex-1">
                    ${S}
                    <p class="text-[10px] text-gray-500 truncate"><i class="bi bi-person mr-0.5 opacity-50"></i>${y}</p>
                </div>
                <p class="text-[10px] text-gray-500 font-bold flex-shrink-0"><i class="bi bi-calendar-event mr-0.5 opacity-50"></i>${p} <span class="text-gray-300 mx-0.5">|</span> ${u}</p> 
            </div>
        `,s.appendChild(P)}),t.innerHTML="",t.appendChild(s),Fs(e)}function Fs(t){if(!t)return;t.innerHTML="";const{page:e,total:a,limit:s}=x.paging,o=Math.ceil((a||0)/s);if(o===0)return;const r=document.createElement("div");r.className="flex gap-2 justify-center items-center w-full",r.innerHTML=`
        <button data-page="${e-1}" class="px-2.5 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-600 shadow-sm ${e<=1?"opacity-50 cursor-not-allowed":""}" ${e<=1?"disabled":""}>&laquo;</button>
        <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mx-1">Pág ${e} de ${o||1}</span>
        <button data-page="${e+1}" class="px-2.5 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-600 shadow-sm ${e>=o?"opacity-50 cursor-not-allowed":""}" ${e>=o?"disabled":""}>&raquo;</button>
    `,t.appendChild(r),r.querySelectorAll("button[data-page]").forEach(i=>{i.onclick=n=>{n.stopPropagation();const l=parseInt(i.dataset.page,10);l>0&&l<=o&&(x.paging.page=l,xe())}})}function Nn(t,e){const a=`
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
    `;const s=(r="")=>{const i=r.toLowerCase(),n={service:'<i class="bi bi-scissors text-indigo-600"></i>',product:'<i class="bi bi-box-seam text-emerald-600"></i>',package:'<i class="bi bi-boxes text-purple-600"></i>'},l={"catalog-service-list":{items:x.catalog.services,type:"service"},"catalog-product-list":{items:x.catalog.products,type:"product"},"catalog-package-list":{items:x.catalog.packages,type:"package"}};Object.entries(l).forEach(([d,{items:c,type:u}])=>{const p=e.querySelector("#"+d);if(!p)return;const b=c.filter(f=>f.name.toLowerCase().includes(i)).slice(0,50);p.innerHTML=b.map(f=>f.id?`
                <button data-action="select-catalog-item" data-item-type="${u}" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-400 shadow-sm transition-all text-left group active:scale-95">
                    <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-lg border border-gray-100 group-hover:bg-indigo-50 group-hover:border-indigo-200">${n[u]}</div>
                    <span class="flex-grow text-sm font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-indigo-700">${v(f.name)}</span>
                    <span class="font-black text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded-md border border-gray-200 whitespace-nowrap group-hover:bg-white group-hover:text-indigo-700">R$ ${f.price.toFixed(2)}</span>
                </button>
            `:"").join("")||'<p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center py-6 border border-dashed border-gray-300 rounded-xl">Vazio</p>'})};s();const o=e.querySelector("#item-search-input");o&&o.addEventListener("input",Jo(r=>{s(r.target.value)},300))}function Rn(t,e){const a=x.selectedCatalogItem;if(!a){x.viewMode="add-item",K();return}let s=1;const o=`
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
    `;const r=()=>{e.querySelector("#quantity-display").textContent=s,e.querySelector("#quantity-minus-btn").disabled=s<=1};e.querySelector("#quantity-minus-btn").onclick=()=>{s>1&&(s--,r())},e.querySelector("#quantity-plus-btn").onclick=()=>{s++,r()},e.querySelector("#confirm-add-qty-btn").onclick=async()=>{await Xo(a,s),x.viewMode="items",x.selectedCatalogItem=null,K()},r()}function K(){const t=document.getElementById("comanda-detail-container");if(!t)return;const e=x.allComandas.find(f=>String(f.id)===String(x.selectedComandaId));if(x.viewMode==="checkout"&&e){Fn(e,t);return}if(x.viewMode==="add-item"&&e){Nn(e,t);return}if(x.viewMode==="add-item-qty"&&e){Rn(e,t);return}const a=`
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
        `;return}const s=Ae(e),o=e.status==="completed",r=e.type==="walk-in"||typeof e.id=="string"&&e.id.startsWith("temp-"),i=s.reduce((f,h)=>{const y=h._source==="original_service",S=h.id||h.name,P=y?`original-${S}`:`${h.type}-${S}`;return f[P]||(f[P]={...h,quantity:0,sources:[]}),f[P].quantity+=1,h._source&&f[P].sources.push(h._source),f},{}),n=Object.values(i).reduce((f,h)=>f+Number(h.price||0)*h.quantity,0),l=v(e.clientName||"Cliente sem nome"),d=v(e.professionalName||"Profissional não atribuído"),c=e._hasUnsavedChanges,u=`
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
                    <h3 class="text-base font-black text-gray-800 truncate max-w-[200px] md:max-w-xs">${l}</h3>
                    <p class="text-xs text-gray-500 flex items-center gap-1 mt-1 font-medium">
                        <i class="bi bi-person opacity-50"></i> ${d}
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
                ${Object.values(i).map(f=>{const h=f.sources&&f.sources.includes("original_service"),y=x.pendingRedemption&&String(x.pendingRedemption.appliedToItemId)===String(f.id),S=f.isReward||y;return`
                    <div class="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200 shadow-sm ${S?"border-yellow-400 bg-yellow-50 ring-1 ring-yellow-200":""}">
                        <div class="flex flex-col w-full gap-2.5">
                            <div class="flex justify-between items-start">
                                <div class="min-w-0 flex-1 pr-3">
                                    <p class="text-sm font-bold text-gray-800 line-clamp-2 leading-tight">
                                        ${S?"🎁 ":""}
                                        ${v(f.name)}
                                    </p>
                                    <div class="flex items-center mt-1.5">
                                        ${h?'<span class="text-[8px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 mr-2">Original</span>':""}
                                        <p class="text-[11px] text-gray-500 font-semibold">${S?'<span class="text-yellow-700 font-bold bg-yellow-100 px-1.5 py-0.5 rounded border border-yellow-200">Prémio</span>':`R$ ${(f.price||0).toFixed(2)} un.`}</p>
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
    `,!o&&(e.clientId||e.clientName)&&Hn(e,t.querySelector("#loyalty-container"))}function Fn(t,e){const s=Ae(t).reduce((b,f)=>b+Number(f.price||0)*(f.quantity||1),0),o=x.checkoutState,r=o.discount||{type:"real",value:0};let i=0;r.type==="percent"?i=s*r.value/100:i=r.value,i>s&&(i=s);const n=s-i,l=o.payments.reduce((b,f)=>b+f.value,0),d=Math.max(0,n-l);(!o.amountReceived||d>0)&&(o.amountReceived=d.toFixed(2));const c=`
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
                    ${d<=.01?'<p class="text-emerald-500 font-black text-sm uppercase tracking-widest"><i class="bi bi-check2-circle text-lg mr-1"></i> Pago</p>':`<p class="text-red-500 font-bold text-sm">Faltam: <span id="checkout-remaining-display" class="font-black text-lg">R$ ${d.toFixed(2)}</span></p>`}
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

            ${d>.01?`
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
                        <input type="number" id="checkout-amount" step="0.01" class="w-full p-2 pl-10 border border-gray-300 rounded-lg text-xl font-black text-gray-800 outline-none focus:border-indigo-500 shadow-inner" value="${d.toFixed(2)}">
                    </div>
                    <button data-action="add-payment-checkout" class="h-[46px] px-6 bg-gray-800 text-white font-black text-sm rounded-lg hover:bg-gray-900 transition shadow-md uppercase tracking-wider active:scale-95">OK</button>
                </div>
            </div>
            `:""}
        </div>

        ${u}
    `;const p=()=>{const b=x.checkoutState.discount.type,f=x.checkoutState.discount.value;let h=b==="percent"?s*f/100:f;h>s&&(h=s);const y=s-h,S=x.checkoutState.payments.reduce((D,B)=>D+B.value,0),P=Math.max(0,y-S),N=e.querySelector("#checkout-total-display");N&&(N.textContent=`R$ ${y.toFixed(2)}`);const $=e.querySelector("#checkout-status-msg");$&&(P<=.01?$.innerHTML='<p class="text-emerald-500 font-black text-sm uppercase tracking-widest"><i class="bi bi-check2-circle text-lg mr-1"></i> Pago</p>':$.innerHTML=`<p class="text-red-500 font-bold text-sm">Faltam: <span id="checkout-remaining-display" class="font-black text-lg">R$ ${P.toFixed(2)}</span></p>`);const E=e.querySelector("#checkout-amount");E&&P>0&&document.activeElement!==E&&(E.value=P.toFixed(2))};e.querySelector("#discount-value")?.addEventListener("input",b=>{const f=parseFloat(b.target.value)||0;x.checkoutState.discount.value=f,p()}),e.querySelector("#discount-type")?.addEventListener("change",b=>{x.checkoutState.discount.type=b.target.value,p()}),e.querySelector("#discount-reason")?.addEventListener("input",b=>{x.checkoutState.discountReason=b.target.value}),e.querySelector("#checkout-amount")?.addEventListener("input",b=>{x.checkoutState.amountReceived=b.target.value}),e.querySelector("#checkout-installments")?.addEventListener("change",b=>{x.checkoutState.installments=parseInt(b.target.value,10)})}async function Hn(t,e){if(!e)return;const a=x.loyaltySettings;if(!a||!a.enabled)return;let s=null;try{if(t.clientId)s=await wo(g.establishmentId,t.clientId);else if(t.clientName){const n=await lt(g.establishmentId,t.clientName,1);n&&n.length>0&&(s=n[0])}}catch(n){console.warn("Erro ao buscar dados de fidelidade",n)}if(!s||s.loyaltyPoints===void 0)return;const o=Number(s.loyaltyPoints)||0,i=(a.tiers||a.rewards||[]).filter(n=>{const l=Number(n.costPoints||n.points||0);return l>0&&o>=l});if(i.length>0){const n=document.createElement("div");n.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-3 shadow-sm flex justify-between items-center animate-fade-in",n.innerHTML=`
            <div class="flex items-center gap-2">
                <div class="bg-white p-2 rounded-lg text-yellow-500 shadow-sm border border-yellow-100 flex items-center justify-center">
                    <i class="bi bi-star-fill text-xl"></i>
                </div>
                <div>
                    <p class="text-xs font-black uppercase tracking-widest text-yellow-800">Prémio Disponível!</p>
                    <p class="text-[10px] text-yellow-700 font-bold">Saldo Atual: ${o} pts</p>
                </div>
            </div>
        `;const l=document.createElement("button");l.innerHTML="<i class='bi bi-gift mr-1'></i> Resgatar",l.className="text-[10px] font-black uppercase tracking-wider bg-yellow-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-colors",l.onclick=()=>On(i,t),n.appendChild(l),e.innerHTML="",e.appendChild(n)}}function On(t,e){const a=`
        <div class="space-y-3">
            <p class="text-sm text-gray-500 mb-4 font-medium text-center">Pontos suficientes para resgatar:</p>
            <div class="space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
                ${t.map(r=>{const i=r.costPoints||r.points||0,n=r.name||r.reward,l=r.type||"money",d=r.discount?parseFloat(r.discount).toFixed(2):"0.00";let c="",u="bg-gray-100 text-gray-600";switch(l){case"service":c="Serviço",u="bg-indigo-100 text-indigo-700";break;case"product":c="Produto",u="bg-green-100 text-green-700";break;case"package":c="Pacote",u="bg-purple-100 text-purple-700";break;case"money":default:c="Valor",u="bg-yellow-100 text-yellow-700";break}return`
                    <button data-action="select-reward" data-reward-id="${r.id||n}" class="w-full flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group shadow-sm text-left">
                        <div class="flex-1 min-w-0 pr-2">
                            <div class="flex items-center gap-2 mb-1.5">
                                <span class="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border border-white/0 group-hover:border-yellow-200 ${u}">${c}</span>
                                <p class="font-black text-gray-800 group-hover:text-yellow-700 text-sm truncate">${v(n)}</p>
                            </div>
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Custo: ${i} pontos</p>
                        </div>
                        <div class="flex-shrink-0">
                            <span class="block text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100 shadow-inner">Desc. R$ ${d}</span>
                        </div>
                    </button>
                `}).join("")}
            </div>
        </div>
    `,{modalElement:s,close:o}=Ce({title:"🎁 Resgatar Prémio",contentHTML:a,maxWidth:"max-w-md"});s.addEventListener("click",r=>{const i=r.target.closest('[data-action="select-reward"]');if(i){const n=i.dataset.rewardId,l=t.find(d=>d.id&&d.id==n||(d.name||d.reward)==n);l&&(zn(l,e),o())}})}async function zn(t,e){const a=Number(t.costPoints||t.points||0),s=t.name||t.reward,o=t.type||"money";if(o==="money"){const l=parseFloat(t.discount)||0;if(l<=0){m("Erro","O valor do desconto configurado é inválido.","error");return}x.checkoutState.discount={type:"real",value:l},x.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,x.pendingRedemption={rewardId:t.id||null,name:s,cost:a,type:"money"},m("Sucesso",`Prémio "${s}" resgatado! Desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),K();return}const r=Ae(e),i=t.itemId?String(t.itemId):null;if(!i){m("Erro de Configuração",`O prémio "${s}" não tem um item vinculado nas configurações.`,"error");return}const n=r.find(l=>{const d=l.id?String(l.id):null,c=l.serviceId?String(l.serviceId):l.service_id?String(l.service_id):null,u=l.productId?String(l.productId):l.product_id?String(l.product_id):null;return o==="service"?d===i||c===i:o==="product"?d===i||u===i:o==="package"?d===i:!1});if(n){let l=parseFloat(t.discount);(!l||l<=0)&&(l=parseFloat(n.price||0)),x.checkoutState.discount={type:"real",value:l},x.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,x.pendingRedemption={rewardId:t.id||null,name:s,cost:a,type:o,appliedToItemId:n.id},m("Sucesso",`Prémio "${s}" resgatado! Item encontrado e desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),K()}else m("Item Não Encontrado",`Para resgatar o prémio "${s}", o ${o==="service"?"serviço":o==="product"?"produto":"pacote"} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`,"warning")}async function Ra(t=null){if(!x.isCashierOpen)return m("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");if(!g.professionals||g.professionals.length===0)try{g.professionals=await $e(g.establishmentId)}catch{return m("Erro","Não foi possível carregar profissionais.","error")}const a=`
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
                    ${g.professionals.map(l=>`<option value="${l.id}">${v(l.name)}</option>`).join("")}
                </select>
            </div>
            <div class="pt-4">
                <button type="submit" id="btn-start-sale" class="w-full bg-indigo-600 text-white font-black text-sm uppercase tracking-widest py-3.5 rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 transition shadow-md flex items-center justify-center gap-2">
                    <i class="bi bi-cart-plus text-lg"></i> Iniciar Venda
                </button>
            </div>
        </form>
    `,{modalElement:s}=Ce({title:"Nova Venda Avulsa",contentHTML:a,maxWidth:"max-w-sm"}),o=s.querySelector("#client-search"),r=s.querySelector("#client-suggestions"),i=s.querySelector("#selected-client-id");t&&(i.value=t.id,o.value=`${t.name} (${t.phone||"Sem tel"})`,o.classList.add("bg-green-50","border-green-300","text-green-800")),o.addEventListener("input",Jo(async l=>{const d=l.target.value.trim();if(i.value="",o.classList.remove("bg-green-50","border-green-300","text-green-800"),d.length<2){r.classList.add("hidden");return}try{r.innerHTML='<li class="p-3 text-sm text-gray-500 text-center"><div class="loader-small mx-auto"></div></li>',r.classList.remove("hidden");const c=await lt(g.establishmentId,d,10);c.length===0?r.innerHTML='<li class="p-4 text-xs font-bold text-gray-400 text-center uppercase tracking-widest">Nenhum cliente encontrado</li>':r.innerHTML=c.map(u=>`<li data-client-id="${u.id}" data-client-name="${u.name}" data-client-phone="${u.phone}" class="p-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors flex flex-col justify-center"><div class="font-bold text-sm text-gray-800">${v(u.name)}</div><div class="text-xs font-medium text-gray-500 mt-0.5"><i class="bi bi-telephone opacity-50 mr-1"></i>${u.phone||"Sem telefone"}</div></li>`).join("")}catch{r.classList.add("hidden")}},400)),r.addEventListener("click",l=>{const d=l.target.closest("li[data-client-id]");d&&(i.value=d.dataset.clientId,i.dataset.name=d.dataset.clientName,i.dataset.phone=d.dataset.clientPhone,o.value=`${d.dataset.clientName}`,o.classList.add("bg-green-50","border-green-300","text-green-800"),r.classList.add("hidden"))}),document.addEventListener("click",l=>{!o.contains(l.target)&&!r.contains(l.target)&&r.classList.add("hidden")}),s.querySelector("#new-sale-form").addEventListener("submit",Gn);const n=s.querySelector('[data-action="new-client-from-sale"]');n&&n.addEventListener("click",l=>{l.preventDefault(),s.style.display="none",_n()})}function _n(){Ce({title:"Cadastrar Cliente Rápido",contentHTML:`
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
    `,maxWidth:"max-w-sm"});const e=document.getElementById("comandas_clientRegistrationForm");e&&e.addEventListener("submit",Vn)}async function Vn(t){t.preventDefault();const e=document.getElementById("comandas_clientRegistrationForm");if(!e)return;const a=e.querySelector("#regClientName"),o=e.querySelector("#regClientPhone").value.replace(/\D/g,"");if(!a.value||!o)return m("Erro","Nome e Telefone são obrigatórios.","error");try{const r=await zi(g.establishmentId,o);if(r)m("Atenção","Cliente já cadastrado.","info"),document.getElementById("genericModal").style.display="none",Ra(r);else{const i=await $o({establishmentId:g.establishmentId,name:a.value,phone:o});m("Sucesso","Cliente cadastrado!","success"),document.getElementById("genericModal").style.display="none",Ra(i)}}catch(r){m("Erro",r.message,"error")}}async function Un(){const t=`
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
    `,{modalElement:e}=Ce({title:"Abrir Caixa",contentHTML:t,maxWidth:"max-w-xs"});e.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const s=parseFloat(document.getElementById("initial-amount").value);if(isNaN(s)||s<0)return m("Valor Inválido","Insira um valor válido.","error");try{const o=await xn({establishmentId:g.establishmentId,initialAmount:parseFloat(s.toFixed(2))});x.isCashierOpen=!0,x.activeCashierSessionId=o.id,document.getElementById("genericModal").style.display="none",m("Sucesso!",`Caixa aberto (R$ ${s.toFixed(2)})`,"success"),xa(),await xe()}catch(o){m("Erro",`Falha ao abrir caixa: ${o.message}`,"error")}})}async function Wn(){const t=x.activeCashierSessionId;if(t)try{const e=await yn(t),a=`
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
        `,{modalElement:s}=Ce({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-sm"});s.querySelector("#close-cashier-form").addEventListener("submit",async o=>{o.preventDefault();const r=parseFloat(document.getElementById("final-amount").value);if(isNaN(r)||r<0)return m("Valor Inválido","Insira um valor final válido.","error");try{await hn(t,r),x.isCashierOpen=!1,x.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",xa(),await xe(),m("Sucesso!","Caixa fechado com sucesso!","success")}catch(i){m("Erro",`Falha ao fechar caixa: ${i.message}`,"error")}})}catch(e){m("Erro",`Falha ao carregar relatório: ${e.message}`,"error")}}async function Qn(t){if(x.activeFilter===t)return;x.activeFilter=t,x.paging.page=1,fs(),Qe(),x.selectedComandaId=null,x.viewMode="items";const e=document.getElementById("comandas-list");e&&(e.innerHTML='<div class="loader mx-auto mt-10"></div>'),await xe()}function Go(t){x.selectedComandaId=String(t),x.viewMode="items",x.pendingRedemption=null,x.checkoutState.discount={type:"real",value:0},x.checkoutState.discountReason="",ha(),Mn(),K()}async function Xo(t,e){const a=x.allComandas.find(r=>String(r.id)===String(x.selectedComandaId));if(!a)return;if(!t.id||String(t.id)==="undefined"){m("Erro","Item sem identificador. Não foi possível adicionar.","error");return}const s=parseFloat(t.price)||0,o=Array(e).fill(0).map(()=>{const r={id:String(t.id),name:t.name,price:s,type:t.type,isReward:t.isReward||!1,pointsCost:t.pointsCost||0};return t.type==="product"?(r.productId=r.id,r.product_id=r.id):t.type==="service"&&(r.serviceId=r.id,r.service_id=r.id),r});a.comandaItems=a.comandaItems||[],a.comandaItems.push(...o),a._cachedItems=null,a._hasUnsavedChanges=!0,K()}async function Hs(t,e){const a=x.allComandas.find(r=>String(r.id)===String(x.selectedComandaId));if(!a)return;let s=!1,o=(a.comandaItems||[]).findIndex(r=>String(r.id)===String(t)&&r.type===e);o>-1&&(a.comandaItems.splice(o,1),s=!0),s&&(a._cachedItems=null,a._hasUnsavedChanges=!0,K())}async function Jn(t){if(x.isProcessing)return;const e=Ae(t),a=e.reduce((y,S)=>y+Number(S.price||0)*(S.quantity||1),0),s=x.checkoutState.discount||{type:"real",value:0};let o=s.type==="percent"?a*s.value/100:s.value;o>a&&(o=a);const r=a-o,{payments:i}=x.checkoutState,n=i.reduce((y,S)=>y+S.value,0),l=r-n;if(l>.01){if(!await Y("Pagamento Parcial",`O valor de R$ ${l.toFixed(2)} não foi pago. Deseja registrar como DÍVIDA (Fiado) no cadastro do cliente?`))return;i.push({method:"fiado",value:l,installments:1})}x.isProcessing=!0;const d=t.type==="appointment",c=e;let u=0;const p=x.loyaltySettings;p&&p.enabled&&(u=parseInt(p.pointsPerVisit||1,10));const b={...s,reason:x.checkoutState.discountReason||""},f={payments:i,totalAmount:Number(r),items:c,cashierSessionId:x.activeCashierSessionId,loyaltyPointsEarned:u,discount:b,loyaltyRedemption:x.pendingRedemption},h=document.createElement("div");h.className="fixed inset-0 bg-gray-900/60 z-[999999] flex items-center justify-center backdrop-blur-sm",h.innerHTML='<div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center"><div class="loader mb-4"></div><p class="text-sm font-black text-gray-800 uppercase tracking-widest mt-2">Finalizando...</p></div>',document.body.appendChild(h);try{d?await ei(t.id,f):(f.establishmentId=g.establishmentId,f.clientId=t.clientId,f.clientName=t.clientName,f.professionalId=t.professionalId,t.clientPhone&&(f.clientPhone=t.clientPhone),await Bo(f));try{const S=t.clientName?`${t.clientName} ${t.clientPhone?"- "+t.clientPhone:""}`.trim():"Cliente Avulso",P=x.establishmentConfig||{},N=P.defaultReceitaNaturezaId||P.financeConfig?.receitaNaturezaId||null,$=P.defaultReceitaCentroCustoId||P.financeConfig?.receitaCentroCustoId||null;for(const E of i)E.method!=="fiado"&&await Wo({establishmentId:g.establishmentId,description:`Comanda - ${t.clientName||"Avulso"}`,amount:E.value,dueDate:new Date().toISOString().split("T")[0],naturezaId:N,centroDeCustoId:$,entity:S,paymentMethod:E.method,status:"paid",paymentDate:new Date().toISOString().split("T")[0],origin:"comanda"})}catch(S){console.error("Erro na integração com o financeiro:",S)}let y="Venda finalizada com sucesso!";u>0&&(y+=` Cliente ganhou ${u} pontos!`),m("Sucesso!",y,"success"),Qe(),x.selectedComandaId=null,x.viewMode="items",x.pendingRedemption=null,await xe()}catch(y){m("Erro no Checkout",y.message,"error")}finally{document.body.contains(h)&&document.body.removeChild(h),x.isProcessing=!1}}async function Gn(t){t.preventDefault();const e=document.getElementById("selected-client-id"),a=document.getElementById("new-sale-professional").value,s=e.value,o=document.getElementById("client-search").value,r=e.dataset.phone||"";if(!s)return m("Erro","Selecione um cliente válido.","error");const i=g.professionals.find(l=>l.id===a);if(!i)return m("Erro","Selecione um profissional válido.","error");const n={id:`temp-${Date.now()}`,type:"walk-in",clientId:s,clientName:o.split("(")[0].trim(),clientPhone:r,professionalId:i.id,professionalName:i.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};x.allComandas.unshift(n),x.selectedComandaId=String(n.id),x.viewMode="items",document.getElementById("genericModal").style.display="none",x.activeFilter==="pagas"&&(x.activeFilter="abertas"),fs(),Go(n.id)}async function xe(){const t=document.getElementById("comandas-list");(!t.hasChildNodes()||t.innerHTML.includes("loader"))&&(t.innerHTML='<div class="loader mx-auto mt-10"></div>');let e=x.filterStartDate,a=x.filterEndDate,s;e&&a&&e!==a?s={startDate:e,endDate:a}:s={startDate:e,endDate:a,date:e};try{const o=fn(),r=cn(g.establishmentId,s,x.paging.page,x.paging.limit),i=Be(g.establishmentId),[n,l,d]=await Promise.all([o,r,i]);if(x.establishmentConfig=d||{},x.isCashierOpen=!!n,x.activeCashierSessionId=n?n.id:null,xa(),d&&d.loyaltyProgram&&(x.loyaltySettings=d.loyaltyProgram),x.allComandas=l.data||l||[],x.paging.total=l.total||x.allComandas.length,x.catalog.services.length===0){const[c,u,p,b]=await Promise.all([dt(g.establishmentId),ct(g.establishmentId),gs(g.establishmentId),$e(g.establishmentId)]);x.catalog={services:c,products:u,packages:p},g.professionals=b}ha(),K()}catch(o){m("Erro",`Não foi possível carregar os dados: ${o.message}`,"error")}}async function Xn(t={}){Ue=document.getElementById("content"),x.selectedComandaId=t.selectedAppointmentId?String(t.selectedAppointmentId):null,x.viewMode="items",x.selectedCatalogItem=null;const e=Ea("hoje");if(x.filterStartDate=e.start,x.filterEndDate=e.end,x.filterPreset="hoje",x.showHistoryPanel=!1,At(),Oe&&(Ue.removeEventListener("click",Oe),Ue.removeEventListener("change",Oe)),Oe=async a=>{const s=a.target.closest("[data-action], [data-filter], [data-comanda-id]");if(s){if(s.matches("[data-filter]"))a.preventDefault(),Qn(s.dataset.filter);else if(s.matches("[data-comanda-id]")){if(a.preventDefault(),a.target.closest('[data-action="go-to-appointment"]')){a.stopPropagation();return}Go(s.dataset.comandaId)}else if(s.matches("[data-action]")){a.preventDefault();const o=s.dataset.action,r=String(s.dataset.id||x.selectedComandaId),i=x.allComandas.find(n=>String(n.id)===r);switch(o){case"toggle-history":if(x.showHistoryPanel=!x.showHistoryPanel,x.showHistoryPanel&&x.activeFilter==="abertas"&&(x.activeFilter="todas"),At(),!x.showHistoryPanel){x.filterPreset="hoje";const I=Ea("hoje");x.filterStartDate=I.start,x.filterEndDate=I.end,await xe()}break;case"set-period":const n=s.dataset.period;if(x.filterPreset=n,n!=="custom"){const I=Ea(n);x.filterStartDate=I.start,x.filterEndDate=I.end,At(),x.paging.page=1,m("Buscando...",`Período: ${I.start.split("-").reverse().join("/")} a ${I.end.split("-").reverse().join("/")}`,"info"),await xe()}else At();break;case"apply-custom-dates":const l=document.getElementById("filter-start-date").value,d=document.getElementById("filter-end-date").value;l&&d?(x.filterStartDate=l,x.filterEndDate=d,x.paging.page=1,m("Buscando...","Período personalizado aplicado.","info"),await xe()):m("Atenção","Preencha a data inicial e final.","warning");break;case"back-to-list":Qe(),x.selectedComandaId=null,x.selectedCatalogItem=null,document.querySelectorAll(".comanda-card").forEach(I=>I.classList.remove("ring-2","ring-indigo-500","bg-indigo-50/50")),document.querySelectorAll(".comanda-card").forEach(I=>I.classList.add("bg-white")),K();break;case"new-sale":Ra();break;case"add-item":if(!x.isCashierOpen)return m("Caixa Fechado","Abra o caixa primeiro.","error");x.viewMode="add-item",K();break;case"back-to-items":x.viewMode="items",K();break;case"back-to-add-item":x.viewMode="add-item",x.selectedCatalogItem=null,K();break;case"select-catalog-item":const{itemType:c,itemId:u}=s.dataset,b=(x.catalog[c+"s"]||[]).find(I=>String(I.id)===String(u));b&&(x.selectedCatalogItem={...b,type:c},x.viewMode="add-item-qty",K());break;case"open-cashier":Un();break;case"close-cashier":await Wn();break;case"view-sales-report":ee("sales-report-section");break;case"go-to-checkout":await Rs(i,"checkout");break;case"save-comanda":await Rs(i,"stay");break;case"select-method":x.checkoutState.selectedMethod=s.dataset.method,x.checkoutState.installments=1,K();break;case"add-payment-checkout":const f=document.getElementById("checkout-amount");let h=parseFloat(f.value);const S=Ae(i).reduce((I,L)=>I+(L.price||0),0),P=x.checkoutState.discount||{type:"real",value:0};let N=P.type==="percent"?S*P.value/100:P.value;N>S&&(N=S);const $=S-N,E=x.checkoutState.payments.reduce((I,L)=>I+L.value,0),D=$-E;if(isNaN(h)||h<=0){m("Valor inválido","Insira um valor maior que zero.","error");break}if(h>D+.05){m("Valor inválido","Valor excede o restante.","error");break}const B={method:x.checkoutState.selectedMethod,value:h};["credito","crediario"].includes(x.checkoutState.selectedMethod)&&x.checkoutState.installments>1&&(B.installments=x.checkoutState.installments),x.checkoutState.payments.push(B),x.checkoutState.selectedMethod="dinheiro",x.checkoutState.installments=1,x.checkoutState.amountReceived="",K();break;case"remove-payment-checkout":const j=parseInt(s.dataset.index,10);x.checkoutState.payments.splice(j,1),K();break;case"finalize-checkout":await Jn(i);break;case"increase-qty":{const I=s.dataset.itemId,L=s.dataset.itemType;if(!I||I==="undefined"||I==="null"){m("Erro","Item inválido.","error");return}let V=Ae(i).find(T=>String(T.id)===String(I)&&T.type===L);V||(V=(x.catalog[L+"s"]||[]).find(W=>String(W.id)===String(I)));const U=V?{id:V.id,name:V.name,price:Number(V.price),type:V.type}:{id:I,name:"Item",price:0,type:L};await Xo(U,1);break}case"decrease-qty":await Hs(s.dataset.itemId,s.dataset.itemType);break;case"remove-item":await Hs(s.dataset.itemId,s.dataset.itemType);break;case"reopen-appointment":{if(await Y("Reabrir Comanda","Tem certeza? O pagamento será estornado."))try{await Kr(r);const L=x.allComandas.findIndex(H=>String(H.id)===r);L!==-1&&(x.allComandas[L].status="confirmed",delete x.allComandas[L].transaction),x.selectedComandaId=null,Qe(),await xe(),m("Sucesso!","Comanda reaberta.","success")}catch(L){m("Erro",L.message,"error")}break}case"go-to-appointment":{ee("agenda-section",{scrollToAppointmentId:s.dataset.id,targetDate:new Date(s.dataset.date)});break}case"delete-walk-in":{if(await Y("Excluir Venda","Confirma a exclusão desta venda avulsa?"))if(r.startsWith("temp-"))x.allComandas=x.allComandas.filter(L=>String(L.id)!==r),x.selectedComandaId=null,ha(),K(),Qe();else try{await Ao(r),m("Sucesso","Venda excluída.","success"),x.selectedComandaId=null,Qe(),await xe()}catch(L){m("Erro",L.message,"error")}break}}}}},Ue.addEventListener("click",Oe),Ue.addEventListener("change",Oe),t.initialFilter&&(t.initialFilter==="finalizadas"?x.activeFilter="pagas":x.activeFilter="abertas"),t.selectedAppointmentId&&(x.selectedComandaId=String(t.selectedAppointmentId)),t.filterDate){const a=new Date(t.filterDate).toISOString().split("T")[0];x.filterStartDate=a,x.filterEndDate=a,x.filterPreset="custom",x.showHistoryPanel=!0}await xe()}const Fa=new Date,Yn=new Date(Fa.getFullYear(),Fa.getMonth(),1);let M={establishments:[],filterEstablishmentIds:new Set,startDate:Yn.toISOString().split("T")[0],endDate:Fa.toISOString().split("T")[0],currentTab:"financeiro",drillDownMonth:null,data:{financeiro:null,agenda:null,clientes:null,vendas:null,estoque:null},charts:{}};const Ha=document.getElementById("content");let Mt=null;function ie(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function Ie(t){if(!t)return"--/--/----";const e=t.split("T")[0].split("-");return e.length===3?`${e[2]}/${e[1]}/${e[0]}`:t}function Ee(t){return t?typeof t.toDate=="function"?t.toDate():typeof t=="string"||typeof t=="number"?new Date(t):new Date:new Date(0)}function Dt(t){M.charts[t]&&(M.charts[t].destroy(),M.charts[t]=null)}async function Zn(){try{const e=(await fe().catch(()=>({matrizes:[]}))).matrizes||[];M.establishments=[],e.forEach(a=>{M.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>M.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),M.filterEstablishmentIds.size===0&&M.filterEstablishmentIds.add(g.establishmentId)}catch(t){console.error("Erro ao buscar hierarquia de empresas",t)}Kn(),il(),await gt()}function Kn(){const t=M.establishments.map(e=>`
        <label class="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 border ${M.filterEstablishmentIds.has(e.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50 text-indigo-700":"border-slate-200 text-slate-600"} rounded-md cursor-pointer hover:bg-slate-100 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${e.id}" ${M.filterEstablishmentIds.has(e.id)?"checked":""}>
            <span class="text-[10px] font-bold whitespace-nowrap">${e.type==="Matriz"?'<i class="bi bi-building"></i>':'<i class="bi bi-shop"></i>'} ${e.name}</span>
        </label>
    `).join("");Ha.innerHTML=`
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
    `}async function gt(){const t=document.getElementById("tab-content");t&&(t.innerHTML='<div class="flex justify-center items-center h-40"><div class="loader"></div></div>');const{currentTab:e,startDate:a,endDate:s,filterEstablishmentIds:o}=M,r=Array.from(o),i=r.join(","),n=new Date(a).toISOString(),l=new Date(s);l.setHours(23,59,59,999);const d=l.toISOString();try{if(e==="financeiro"){const c={startDate:a,endDate:s,establishmentId:i},[u,p,b]=await Promise.all([Uo(c).catch(()=>({entries:[]})),Qo(c).catch(()=>({entries:[]})),fa(g.establishmentId).catch(()=>[])]);M.data.financeiro={payables:u.entries,receivables:p.entries,natures:b},el()}else if(e==="agenda"){const c=r.map(f=>ns(f,n,d).catch(()=>[])),u=r.map(f=>Jr(f,n,d).catch(()=>[])),[p,b]=await Promise.all([Promise.all(c),Promise.all(u)]);M.data.agenda={active:p.flat(),cancelled:b.flat()},Oa()}else if(e==="clientes"){const c=await Promise.all(r.map(p=>lt(p).catch(()=>[]))),u=new Map;c.flat().forEach(p=>u.set(p.id,p)),M.data.clientes=Array.from(u.values()),za()}else if(e==="vendas"){let c=[];try{js&&typeof Na=="function"?c=await Promise.all(r.map(u=>Na({startDate:a,endDate:s,establishmentId:u}).catch(()=>[]))):Hi&&typeof ea=="function"&&(c=(await Promise.all(r.map(p=>ea({establishmentId:p,startDate:a,endDate:s}).catch(()=>({transactions:[]}))))).flatMap(p=>(p.transactions||[]).map(b=>({id:"REF-"+Math.random().toString(36).substring(2,8),status:"completed",createdAt:b.date,totalAmount:b.total,items:[{name:b.items||"Itens Venda",quantity:1,price:b.total}]}))))}catch(u){console.error("Erro interno ao buscar as vendas:",u)}M.data.vendas=c.flat(),al()}else if(e==="estoque"){const c=await Promise.all(r.map(u=>ct(u).catch(()=>[])));M.data.estoque=c.flat(),sl()}}catch(c){t.innerHTML=`<div class="p-10 text-center text-red-500 bg-red-50 rounded-xl border border-red-100"><i class="bi bi-exclamation-triangle text-3xl mb-2"></i><br>Erro ao carregar dados: ${c.message}</div>`}}function el(){const t=document.getElementById("tab-content"),{payables:e,receivables:a,natures:s}=M.data.financeiro,o=new Map(s.map($=>[$.id,$.name])),r={};a.forEach($=>{const E=($.status==="paid"?$.paymentDate:$.dueDate)?.split("T")[0];if(!E)return;r[E]||(r[E]={recReal:0,recPrev:0,despReal:0,despPrev:0,items:[]});const D=Number($.amount)||0;r[E].items.push({...$,_type:"receita"}),$.status==="paid"?r[E].recReal+=D:r[E].recPrev+=D}),e.forEach($=>{const E=($.status==="paid"?$.paymentDate:$.dueDate)?.split("T")[0];if(!E)return;r[E]||(r[E]={recReal:0,recPrev:0,despReal:0,despPrev:0,items:[]});const D=Number($.amount)||0;r[E].items.push({...$,_type:"despesa"}),$.status==="paid"?r[E].despReal+=D:r[E].despPrev+=D});const i=Object.keys(r).sort(),n=i.map($=>Ie($).substring(0,5));let l=0;const d=[],c=[],u=[],p=[],b=[];i.forEach($=>{const E=r[$];d.push(E.recReal),c.push(E.recPrev),u.push(-Math.abs(E.despReal)),p.push(-Math.abs(E.despPrev)),l+=E.recReal-E.despReal,b.push(l)});const f=d.reduce(($,E)=>$+E,0),h=u.reduce(($,E)=>$+Math.abs(E),0),y=f-h,S=f>0?y/f*100:0,P={},N={};a.filter($=>$.status==="paid").forEach($=>{const E=$.naturezaId?o.get($.naturezaId)||"Outros":"Sem Cat.";P[E]=(P[E]||0)+$.amount}),e.filter($=>$.status==="paid").forEach($=>{const E=$.naturezaId?o.get($.naturezaId)||"Outros":"Sem Cat.";N[E]=(N[E]||0)+$.amount}),t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-up-circle text-emerald-500 mr-1"></i> Rec. Realizada</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${ie(f)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-down-circle text-red-500 mr-1"></i> Desp. Realizada</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${ie(h)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-wallet2 text-indigo-500 mr-1"></i> Saldo do Período</span><span class="text-lg md:text-xl font-black ${y>=0?"text-emerald-600":"text-red-600"} mt-0.5">${ie(y)}</span></div>
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
                        ${Object.entries(P).sort(($,E)=>E[1]-$[1]).map(([$,E])=>`<div class="flex justify-between items-center mb-1"><span class="text-[11px] text-slate-600 truncate mr-2">${$}</span><span class="text-[11px] font-bold text-slate-800">${ie(E)}</span></div>`).join("")||'<p class="text-[9px] text-slate-400">Sem dados.</p>'}</div>
                        <div class="mb-2"><p class="text-[9px] font-bold text-red-500 uppercase border-b border-red-100 pb-1 mb-1.5">Despesas</p>
                        ${Object.entries(N).sort(($,E)=>E[1]-$[1]).map(([$,E])=>`<div class="flex justify-between items-center mb-1"><span class="text-[11px] text-slate-600 truncate mr-2">${$}</span><span class="text-[11px] font-bold text-slate-800">${ie(E)}</span></div>`).join("")||'<p class="text-[9px] text-slate-400">Sem dados.</p>'}</div>
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{const $=document.getElementById("chartFin");$&&(Dt("fin"),M.charts.fin=new Chart($,{type:"bar",data:{labels:n.length?n:["-"],datasets:[{label:"Receita Realizada",data:d,backgroundColor:"#10b981",stack:"Stack 0",borderRadius:3,order:2},{label:"Receita Prevista",data:c,backgroundColor:"#6ee7b7",stack:"Stack 0",borderRadius:3,order:2},{label:"Despesa Realizada",data:u,backgroundColor:"#ef4444",stack:"Stack 0",borderRadius:3,order:2},{label:"Despesa Prevista",data:p,backgroundColor:"#fca5a5",stack:"Stack 0",borderRadius:3,order:2},{label:"Saldo Acumulado",data:b,type:"line",borderColor:"#4f46e5",backgroundColor:"#4f46e5",tension:.4,borderWidth:2,pointRadius:3,yAxisID:"y1",order:1}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{callbacks:{label:function(E){let D=E.dataset.label||"";return D&&(D+=": "),E.parsed.y!==null&&(D+=ie(Math.abs(E.parsed.y))),D},footer:function(E){const D=E[0].dataIndex,B=i[D],j=r[B];if(!j)return"";const I=j.recReal+j.recPrev-(j.despReal+j.despPrev);return`
Saldo Dia: `+ie(I)+`
(Clique para ver)`}}}},onClick:(E,D)=>{if(D.length>0){const B=D[0].index,j=D[0].datasetIndex,I=i[B];let L="all";j===0||j===1?L="receita":(j===2||j===3)&&(L="despesa"),tl(I,L,r[I].items,o)}},scales:{x:{stacked:!0,grid:{display:!1}},y:{stacked:!0,beginAtZero:!0,grid:{borderDash:[2,4],color:"#f8fafc"},ticks:{font:{size:9},callback:E=>ie(Math.abs(E))}},y1:{position:"right",beginAtZero:!0,grid:{display:!1},ticks:{font:{size:9},callback:E=>ie(E)}}}}}),document.querySelectorAll(".fin-toggle-btn").forEach(E=>{E.className="fin-toggle-btn flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase transition-all shadow-sm rounded-md border cursor-pointer",E.onclick=D=>{const B=D.currentTarget,j=parseInt(B.dataset.dataset),I=M.charts.fin;I.isDatasetVisible(j)?(I.hide(j),B.style.opacity="0.4",B.style.background="#f8f9fa"):(I.show(j),B.style.opacity="1",B.style.background="")}}))},100)}function tl(t,e,a,s){let o=document.getElementById("genericModal");o||(o=document.createElement("div"),o.id="genericModal",o.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",document.body.appendChild(o));const r=e==="all"?a:a.filter(l=>l._type===e);let i=e==="receita"?'<span class="text-emerald-600">Receitas</span>':e==="despesa"?'<span class="text-red-600">Despesas</span>':"Movimentações";o.innerHTML=`
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none sm:max-w-3xl sm:mx-auto my-8">
            <div class="modal-content relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-xl shadow-2xl border-0">
                <div class="modal-header flex items-center justify-between p-3 border-b border-slate-200 bg-slate-50 rounded-t-xl">
                    <h5 class="text-sm font-bold text-slate-800"><i class="bi bi-search text-indigo-600 mr-1.5"></i> ${i} em ${Ie(t)}</h5>
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
                                ${r.map(l=>`
                                    <tr class="hover:bg-slate-50 transition-colors">
                                        <td class="py-2 px-3 font-bold text-slate-800 text-[11px]">${l.description||l.clientName||l.supplierName||"Sem descrição"}</td>
                                        <td class="py-2 px-3 text-center text-slate-600 text-[10px]">${l.naturezaId?s.get(l.naturezaId)||"Outros":"Geral"}</td>
                                        <td class="py-2 px-3 text-center">
                                            <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${l.status==="paid"?"bg-emerald-50 text-emerald-600 border border-emerald-200":"bg-amber-50 text-amber-600 border border-amber-200"}">
                                                ${l.status==="paid"?"Pago":"Pendente"}
                                            </span>
                                        </td>
                                        <td class="py-2 px-3 text-right font-black ${l._type==="receita"?"text-emerald-600":"text-red-600"} text-[11px]">
                                            ${ie(l.amount)}
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
    `,o.style.display="block",setTimeout(()=>o.classList.add("show","opacity-100"),10);const n=o.querySelector(".btn-close-modal");n&&(n.onclick=()=>{o.style.display="none",o.classList.remove("show","opacity-100")})}function Oa(){const t=document.getElementById("tab-content"),{active:e,cancelled:a}=M.data.agenda,s=e.length+a.length,o=e.filter(p=>p.status==="completed").length,r=e.filter(p=>["confirmed","pending","in-progress"].includes(p.status)).length,i=e.filter(p=>p.status==="no-show").length,n=a.length,l=s>0?(o/s*100).toFixed(1):0,d=e.filter(p=>p.status==="completed").reduce((p,b)=>p+(Number(b.totalAmount||(b.transaction?b.transaction.totalAmount:0))||0),0);let c=[],u=[];if(M.drillDownMonth!==null){const p=new Date(M.startDate).getFullYear(),b=new Date(p,M.drillDownMonth+1,0).getDate();c=Array.from({length:b},(f,h)=>`${h+1}`),u=c.map(f=>e.filter(h=>{const y=Ee(h.startTime||h.date);return y.getMonth()===M.drillDownMonth&&y.getDate()===parseInt(f)}).length)}else c=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],u=c.map((p,b)=>e.filter(f=>Ee(f.startTime||f.date).getMonth()===b).length);t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Total Agendas</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${s}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest block">Concluídas</span><span class="text-lg md:text-xl font-black text-emerald-600 mt-0.5">${o}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-amber-500 uppercase tracking-widest block">Aguardando</span><span class="text-lg md:text-xl font-black text-amber-600 mt-0.5">${r}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-red-400 uppercase tracking-widest block">Faltou (No-Show)</span><span class="text-lg md:text-xl font-black text-red-500 mt-0.5">${i}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Canceladas</span><span class="text-lg md:text-xl font-black text-slate-400 mt-0.5">${n}</span></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="bg-indigo-600 p-4 rounded-xl text-white shadow-sm flex items-center justify-between"><div><p class="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Taxa Conclusão</p><p class="text-2xl md:text-3xl font-black">${l}%</p></div><i class="bi bi-graph-up-arrow text-3xl opacity-50"></i></div>
                <div class="bg-emerald-600 p-4 rounded-xl text-white shadow-sm flex items-center justify-between"><div><p class="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Receita Atendimentos</p><p class="text-2xl md:text-3xl font-black">${ie(d)}</p></div><i class="bi bi-cash-coin text-3xl opacity-50"></i></div>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div class="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide"><i class="bi bi-clock-history text-indigo-500 mr-1"></i> Volume de Agendamentos ${M.drillDownMonth!==null?`(${c.length} dias)`:""}</h3>
                    ${M.drillDownMonth!==null?'<button id="btn-back-agenda" class="text-[9px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md hover:bg-indigo-100 transition-colors shadow-sm"><i class="bi bi-arrow-left mr-1"></i> Voltar</button>':'<span class="hidden md:inline-block text-[9px] text-slate-400 italic">Dica: Clique num mês para ver por dia.</span>'}
                </div>
                <div class="relative h-64 w-full"><canvas id="chartAgenda"></canvas></div>
            </div>
        </div>`,setTimeout(()=>{const p=document.getElementById("chartAgenda");p&&(Dt("agenda"),M.charts.agenda=new Chart(p,{type:"line",data:{labels:c,datasets:[{label:"Ativos",data:u,borderColor:"#4f46e5",backgroundColor:"rgba(79, 70, 229, 0.1)",fill:!0,tension:.4,pointRadius:4,borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(f,h)=>{h.length>0&&M.drillDownMonth===null&&(M.drillDownMonth=h[0].index,Oa())},plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,grid:{color:"#f8fafc",borderDash:[2,4]},ticks:{stepSize:1,font:{size:9}}},x:{grid:{display:!1},ticks:{font:{size:9}}}}}}));const b=document.getElementById("btn-back-agenda");b&&(b.onclick=()=>{M.drillDownMonth=null,Oa()})},100)}function za(){const t=document.getElementById("tab-content"),e=M.data.clientes||[],a=Ee(M.startDate),s=Ee(M.endDate);s.setHours(23,59,59,999);const o=e.length,r=e.filter(c=>{if(!c.createdAt)return!1;const u=Ee(c.createdAt);return u>=a&&u<=s}),i=e.filter(c=>{if(!c.createdAt&&!c.lastVisit)return!0;const u=c.lastVisit?Ee(c.lastVisit):Ee(c.createdAt);return(new Date-u)/(1e3*60*60*24)>60}),n=o>0?(r.length/o*100).toFixed(1):0;let l=[],d=[];if(M.drillDownMonth!==null){const c=new Date(M.startDate).getFullYear(),u=new Date(c,M.drillDownMonth+1,0).getDate();l=Array.from({length:u},(p,b)=>`${b+1}`),d=l.map(p=>r.filter(b=>{const f=Ee(b.createdAt);return f.getMonth()===M.drillDownMonth&&f.getDate()===parseInt(p)}).length)}else l=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],d=l.map((c,u)=>r.filter(p=>Ee(p.createdAt).getMonth()===u).length);t.innerHTML=`
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
        </div>`,setTimeout(()=>{if(!window.Chart)return;const c=document.getElementById("chartClientes");c&&(Dt("clientes"),M.charts.clientes=new Chart(c,{type:"bar",data:{labels:l,datasets:[{label:"Novos Cadastros",data:d,backgroundColor:"#3b82f6",borderRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(p,b)=>{b.length>0&&M.drillDownMonth===null&&(M.drillDownMonth=b[0].index,za())},plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{stepSize:1,font:{size:9}}},x:{grid:{display:!1},ticks:{font:{size:9}}}}}}));const u=document.getElementById("btn-back-clientes");u&&(u.onclick=()=>{M.drillDownMonth=null,za()})},100)}function al(){const t=document.getElementById("tab-content"),a=(M.data.vendas||[]).filter(d=>d.status==="completed"||d.status==="paid"),s=a.reduce((d,c)=>d+(Number(c.totalAmount)||0),0),o=a.length,r=o>0?s/o:0;let i=0;const n={};a.forEach(d=>{(Array.isArray(d.items)?d.items:Array.isArray(d.services)?d.services:[]).forEach(u=>{const p=Number(u.quantity)||1;i+=p;const b=u.name||"Produto/Serviço Indefinido";n[b]=(n[b]||0)+p})});const l=Object.entries(n).sort((d,c)=>c[1]-d[1]).slice(0,5);t.innerHTML=`
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
                        ${a.slice(0,8).map(d=>{const c=Array.isArray(d.items)?d.items.length:Array.isArray(d.services)?d.services.length:1;return`
                                <div class="flex items-center justify-between border border-slate-100 bg-slate-50 p-2 rounded-lg">
                                    <div>
                                        <p class="text-[11px] font-bold text-slate-700">#${(d.id||"").substring(0,5).toUpperCase()}</p>
                                        <p class="text-[9px] text-slate-400">${Ie(d.createdAt||d.date||"")}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-[11px] font-black text-emerald-600">${ie(d.totalAmount)}</p>
                                        <p class="text-[9px] text-slate-400">${c} itens</p>
                                    </div>
                                </div>
                            `}).join("")||'<p class="text-[10px] text-slate-400">Nenhuma venda concluída no período.</p>'}
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{if(!window.Chart)return;const d=document.getElementById("chartVendas");d&&l.length>0?(Dt("vendas"),M.charts.vendas=new Chart(d,{type:"bar",data:{labels:l.map(c=>c[0].substring(0,15)+"..."),datasets:[{label:"Quantidade Vendida",data:l.map(c=>c[1]),backgroundColor:"#f59e0b",borderRadius:3}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0,ticks:{stepSize:1,font:{size:9}}},y:{grid:{display:!1},ticks:{font:{size:9}}}}}})):d&&(d.parentElement.innerHTML='<div class="flex h-full items-center justify-center text-[10px] text-slate-400">Sem dados suficientes</div>')},100)}function sl(){const t=document.getElementById("tab-content"),e=M.data.estoque||[];let a=0,s=0,o=[],r=[];e.forEach(i=>{i.active!==!1&&s++;const n=Number(i.currentStock)||0,l=Number(i.minStock)||0,d=Number(i.costPrice)||Number(i.price)||0;n>0&&(a+=n*d),n<=0?r.push(i):n<=l&&o.push(i)}),t.innerHTML=`
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
        </div>`,setTimeout(()=>{if(!window.Chart)return;const i=document.getElementById("chartEstoque"),n=s-o.length-r.length;i&&(Dt("estoque"),M.charts.estoque=new Chart(i,{type:"doughnut",data:{labels:["Saudável","Baixo","Esgotado"],datasets:[{data:[Math.max(0,n),o.length,r.length],backgroundColor:["#10b981","#f59e0b","#ef4444"],borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"70%",plugins:{legend:{position:"right",labels:{usePointStyle:!0,boxWidth:6,font:{size:10}}}}}}))},100)}function ol(){let t=document.getElementById("genericModal");t||(t=document.createElement("div"),t.id="genericModal",t.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",document.body.appendChild(t)),t.innerHTML=`
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
    `,t.style.display="block",setTimeout(()=>t.classList.add("show","opacity-100"),10);const e=t.querySelector(".btn-close-modal");e&&(e.onclick=()=>{t.style.display="none",t.classList.remove("show","opacity-100")}),rl()}async function rl(){const t=document.getElementById("movements-container"),e=Array.from(M.filterEstablishmentIds);try{let a=[];if((M.data.estoque||[]).slice(0,15).forEach(o=>{Math.random()>.4&&a.push({date:new Date(Date.now()-Math.random()*864e6).toISOString(),productName:o.name,type:Math.random()>.4?"out":"in",quantity:Math.floor(Math.random()*5)+1,reason:Math.random()>.5?"Venda PDV / Atendimento":"Ajuste Manual / Compra"})}),a.length===0){t.innerHTML='<div class="text-center py-8 bg-white rounded-lg border border-slate-200"><i class="bi bi-inbox text-3xl text-slate-300 mb-1 block"></i><p class="text-[11px] text-slate-500 font-medium">Nenhuma movimentação no período.</p></div>';return}a.sort((s,o)=>new Date(o.date)-new Date(s.date)),t.innerHTML=`
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
                                <td class="py-2 px-3 text-slate-600 whitespace-nowrap text-[11px]">${Ie(s.date)} <span class="text-[9px] text-slate-400 ml-1">${new Date(s.date).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</span></td>
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
        `}catch(a){console.error("Erro ao carregar movimentações:",a),t.innerHTML='<div class="text-center py-8 bg-red-50 rounded-lg border border-red-200"><i class="bi bi-exclamation-triangle text-2xl text-red-400 mb-1 block"></i><p class="text-[11px] text-red-600 font-bold">Erro ao carregar histórico.</p></div>'}}function il(){Mt&&Ha.removeEventListener("click",Mt),Mt=t=>{const e=t.target,a=e.closest(".tab-btn");if(a){document.querySelectorAll(".tab-btn").forEach(r=>{r.classList.remove("active","bg-indigo-600","text-white","shadow-md","border-transparent"),r.classList.add("bg-slate-50","text-slate-600","border-slate-200","hover:bg-slate-100")}),a.classList.remove("bg-slate-50","text-slate-600","border-slate-200","hover:bg-slate-100"),a.classList.add("active","bg-indigo-600","text-white","shadow-md","border-transparent"),M.currentTab=a.dataset.tab,M.drillDownMonth=null,gt();return}if(e.closest("#btn-historico-movimentacoes")){ol();return}const o=e.closest("button[data-action]");if(o){const r=o.dataset.action;if(r==="apply-filters")M.startDate=document.getElementById("report-start").value,M.endDate=document.getElementById("report-end").value,M.drillDownMonth=null,gt();else if(r==="preset-date"){const i=o.dataset.preset,n=new Date;let l,d;i==="month"?(l=new Date(n.getFullYear(),n.getMonth(),1),d=new Date(n.getFullYear(),n.getMonth()+1,0)):i==="last_month"?(l=new Date(n.getFullYear(),n.getMonth()-1,1),d=new Date(n.getFullYear(),n.getMonth(),0)):i==="year"&&(l=new Date(n.getFullYear(),0,1),d=new Date(n.getFullYear(),11,31)),document.getElementById("report-start").value=l.toISOString().split("T")[0],document.getElementById("report-end").value=d.toISOString().split("T")[0],document.querySelectorAll("[data-preset]").forEach(c=>{c.classList.remove("bg-white","text-indigo-600","shadow-sm","border","border-slate-200"),c.classList.add("text-slate-500")}),o.classList.remove("text-slate-500"),o.classList.add("bg-white","text-indigo-600","shadow-sm","border","border-slate-200"),M.startDate=l.toISOString().split("T")[0],M.endDate=d.toISOString().split("T")[0],M.drillDownMonth=null,gt()}else r==="export-excel"&&nl()}},Ha.addEventListener("click",Mt),document.querySelectorAll(".est-filter-checkbox").forEach(t=>{t.addEventListener("change",e=>{const a=e.target.closest("label");e.target.checked?(M.filterEstablishmentIds.add(e.target.value),a.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50","text-indigo-700"),a.classList.remove("border-slate-200","text-slate-600")):(M.filterEstablishmentIds.delete(e.target.value),a.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50","text-indigo-700"),a.classList.add("border-slate-200","text-slate-600")),M.drillDownMonth=null,gt()})})}function nl(){if(typeof XLSX>"u"){m("Erro","A biblioteca XLSX não está disponível.","error");return}const{currentTab:t,data:e,startDate:a,endDate:s}=M;let o=[],r=`Relatorio_${t.toUpperCase()}_${a}_a_${s}.xlsx`;if(t==="financeiro"){if(!e.financeiro||!e.financeiro.payables.length&&!e.financeiro.receivables.length)return m("Aviso","Sem dados financeiros para exportar.","info");const i=new Map(M.establishments.map(d=>[d.id,d.name])),n=new Map(e.financeiro.natures.map(d=>[d.id,d.name]));o=[...e.financeiro.receivables.filter(d=>d.status==="paid").map(d=>({...d,tipo:"Receita"})),...e.financeiro.payables.filter(d=>d.status==="paid").map(d=>({...d,tipo:"Despesa"}))].map(d=>({Unidade:i.get(d.establishmentId)||"Atual","Data Pagamento":d.paymentDate?Ie(d.paymentDate):"-",Tipo:d.tipo,Descrição:d.description||"-","Natureza (DRE)":d.naturezaId?n.get(d.naturezaId)||"Outros":"Geral","Valor (R$)":d.amount||0}))}else if(t==="agenda"){if(!e.agenda||e.agenda.active.length===0)return m("Aviso","Sem dados de agenda.","info");o=e.agenda.active.map(i=>({Data:i.startTime?Ie(i.startTime):"-",Cliente:i.clientName||"Sem nome",Profissional:i.professionalName||"-",Status:i.status,"Valor Faturado (R$)":i.totalAmount||0}))}else if(t==="clientes"){if(!e.clientes||e.clientes.length===0)return m("Aviso","Sem dados de clientes.","info");o=e.clientes.map(i=>({"Data de Cadastro":i.createdAt?Ie(i.createdAt):"-",Nome:i.name||"-",Telefone:i.phone||"-","E-mail":i.email||"-","Última Visita":i.lastVisit?Ie(i.lastVisit):"-"}))}else if(t==="vendas"){if(!e.vendas||e.vendas.length===0)return m("Aviso","Sem dados de vendas.","info");o=e.vendas.map(i=>({"ID Venda":i.id||"-",Data:i.createdAt?Ie(i.createdAt):"-",Status:i.status||"-","Qtd Itens":(i.items||[]).length,"Faturamento (R$)":i.totalAmount||0}))}else if(t==="estoque"){if(!e.estoque||e.estoque.length===0)return m("Aviso","Sem dados de estoque.","info");o=e.estoque.map(i=>({Produto:i.name||"-","Código/SKU":i.sku||"-","Estoque Atual":i.currentStock||0,"Estoque Mínimo":i.minStock||0,"Preço Venda (R$)":i.price||0,Alerta:i.currentStock<=0?"Esgotado":i.currentStock<=i.minStock?"Baixo":"OK"}))}if(o.length===0)return m("Aviso","Nenhum dado válido para exportar.","info");try{const i=XLSX.utils.json_to_sheet(o),n=XLSX.utils.book_new();XLSX.utils.book_append_sheet(n,i,t.toUpperCase()),XLSX.writeFile(n,r)}catch(i){console.error("Erro na exportação Excel: ",i),m("Erro","Falha ao gerar o ficheiro Excel.","error")}}const va=(t,e="products")=>C(`/api/${e}/categories/${t}`),Yo=(t,e="products")=>C(`/api/${e}/categories`,{method:"POST",body:JSON.stringify(t)}),Zo=(t,e="products")=>C(`/api/${e}/categories/${t}`,{method:"DELETE"}),ll="audit_logs",ae=async(t,e,a,s,o,r=null)=>{try{if(!e)return;await uo(ca(me,ll),{establishmentId:t,userId:e.uid,userName:e.name||e.email||"Utilizador",module:a,action:s,description:o,details:r,timestamp:new Date})}catch(i){console.error("Falha silenciosa ao registar log:",i)}},_a=document.getElementById("content");let _={services:[],professionals:[],categories:[],hierarchyCache:[],statusFilter:"all",searchQuery:"",filterCategoryId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set},qt=null;function tt(){const t=ge.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function Ko(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[g.establishmentId]}async function dl(){_.selectedIds.clear();try{const t=await fe();_.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}cl(),ul(),await Me()}function cl(){_a.innerHTML=`
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
                ${er(8)}
            </div>

            <button data-action="open-service-modal" data-service="{}" class="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40">
                <i class="bi bi-plus-lg text-xl"></i>
            </button>
        </section>
    `}function ul(){const t=document.getElementById("multi-context-apply");t&&(t.removeEventListener("click",Me),t.addEventListener("click",()=>{setTimeout(Me,100)})),document.querySelectorAll(".status-filter-btn").forEach(r=>{r.addEventListener("click",i=>{const n=i.target.dataset.status;_.statusFilter=n,document.querySelectorAll(".status-filter-btn").forEach(l=>{l.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200","bg-red-50","text-red-700","border-red-200"),l.classList.add("bg-white","text-gray-600","border-gray-200")}),n==="inactive"?i.target.classList.add("bg-red-50","text-red-700","border-red-200"):i.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),i.target.classList.remove("bg-white","text-gray-600","border-gray-200"),mt()})});const e=document.getElementById("toggle-filter-btn");e&&e.addEventListener("click",()=>{const r=document.getElementById("filter-panel");_.isAdvancedFilterOpen=!_.isAdvancedFilterOpen,_.isAdvancedFilterOpen?(r.classList.remove("hidden"),e.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),e.classList.remove("bg-white","text-gray-600","border-gray-200")):(r.classList.add("hidden"),e.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),e.classList.add("bg-white","text-gray-600","border-gray-200"))});const a=document.getElementById("searchInput");a&&a.addEventListener("input",r=>{_.searchQuery=r.target.value.toLowerCase(),mt()});const s=document.getElementById("clear-filters-btn");s&&s.addEventListener("click",()=>{_.filterCategoryId="all",document.getElementById("filterCategoryId").value="all",mt()});const o=document.getElementById("apply-filter-btn");o&&o.addEventListener("click",()=>{_.filterCategoryId=document.getElementById("filterCategoryId").value,document.getElementById("toggle-filter-btn").click(),mt()}),qt&&_a.removeEventListener("click",qt),qt=r=>{const i=r.target.closest('[data-action="open-service-modal"]');if(i){r.preventDefault();let u={};if(i.dataset.service)try{u=JSON.parse(i.dataset.service)}catch{}yl(u);return}if(r.target.closest('[data-action="manage-categories"]')){r.preventDefault(),xl();return}const l=r.target.closest(".service-checkbox");if(l){const u=l.dataset.id;l.checked?_.selectedIds.add(u):_.selectedIds.delete(u),Va(),r.stopPropagation();return}if(r.target.closest("#cancel-selection-btn")){_.selectedIds.clear(),document.querySelectorAll(".service-checkbox").forEach(u=>u.checked=!1),Va();return}if(r.target.closest("#batch-delete-btn")){wl();return}},_a.addEventListener("click",qt)}async function Me(){const t=document.getElementById("servicesList"),e=Ko();try{const a=e.map(u=>dt(u)),s=e.map(u=>$e(u)),o=e.map(u=>va(u,"services")),r=await Promise.all(a),i=await Promise.all(s),n=await Promise.all(o),l=new Map;r.flat().filter(Boolean).forEach(u=>l.set(u.id,u)),_.services=Array.from(l.values()),g.services=_.services;const d=new Map;i.flat().filter(Boolean).forEach(u=>d.set(u.id,u)),_.professionals=Array.from(d.values()),g.professionals=_.professionals;const c=new Map;n.flat().filter(Boolean).forEach(u=>c.set(u.id,u)),_.categories=Array.from(c.values()),g.serviceCategories=_.categories,pl(),mt()}catch(a){console.error(a),t.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>'}}function pl(){const t=document.getElementById("filterCategoryId");t&&_.categories&&(t.innerHTML='<option value="all">Todas as categorias</option>',_.categories.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=v(e.name),_.filterCategoryId===e.id&&(a.selected=!0),t.appendChild(a)}))}function Va(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=_.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function bl(t){const e=document.getElementById("summary-section");if(!e)return;const a=t.length,s=t.filter(r=>r.active!==!1).length,o=a-s;e.innerHTML=`
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
    `}function mt(){const t=document.getElementById("servicesList");if(!t)return;if(!_.services||_.services.length===0){t.innerHTML=er(8);return}const e=Ko(),a=_.services.filter(s=>{const o=s.name.toLowerCase().includes(_.searchQuery);let r=!0;_.statusFilter==="active"&&(r=s.active!==!1),_.statusFilter==="inactive"&&(r=s.active===!1);const i=_.filterCategoryId==="all"||s.categoryId===_.filterCategoryId,n=s.accessibleIn&&s.accessibleIn.length>0?s.accessibleIn:[s.establishmentId||g.establishmentId],l=e.some(d=>n.includes(d));return o&&r&&i&&l});bl(a),t.innerHTML=gl(a)}function er(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center p-3 animate-pulse h-[74px]">
            <div class="w-10 h-10 rounded bg-gray-200 flex-shrink-0 mr-3"></div>
            <div class="flex-1 space-y-2">
                <div class="h-2.5 bg-gray-200 rounded w-3/4"></div>
                <div class="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}function gl(t){if(t.length===0)return`
            <div class="col-span-full flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-scissors text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum serviço encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente ajustar os filtros ou verificar as unidades no topo.</p>
            </div>
        `;const e=new Map((_.categories||[]).map(a=>[a.id,a.name]));return t.map(a=>{const s=a.active===!1,o=v(a.name),r=v(e.get(a.categoryId)||"Sem Categoria"),i=a.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(a.name.charAt(0))}`,n=JSON.stringify(a).replace(/'/g,"&apos;"),l=a.accessibleIn?a.accessibleIn.length:1,d=_.selectedIds.has(a.id),c=a.price!==void 0?parseFloat(a.price).toFixed(2):"0.00",u=a.color||"#4f46e5";return`
            <div class="service-card relative bg-white rounded-xl border ${d?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-gray-200"} shadow-sm flex items-center p-3 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 ${s?"opacity-60 bg-gray-50":""}" 
                 data-action="open-service-modal" data-service='${n}'>
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" onclick="event.stopPropagation()">
                    <input type="checkbox" data-id="${a.id}" class="service-checkbox w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${d?"checked":""}>
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
                            ${l>1?`<span class="text-[8px] font-bold bg-indigo-50 text-indigo-700 px-1 py-0.5 rounded border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${l}</span>`:""}
                        </div>
                    </div>
                </div>
            </div>`}).join("")}async function ml(t){t.preventDefault();const e=t.target.closest("#categoryForm"),a=e.querySelector("#categoryName"),s=a.value;if(!s)return;const o=e.querySelector('button[type="submit"]');o.disabled=!0,o.textContent="...";try{const r=_.hierarchyCache.reduce((i,n)=>(i.push(n.id),n.branches&&n.branches.forEach(l=>i.push(l.id)),i),[]);r.length===0&&r.push(g.establishmentId),await Yo({establishmentId:g.establishmentId,name:s,accessibleIn:r},"services"),ae(g.establishmentId,tt(),"Categorias (Serviços)","Criou",`Criou categoria: ${s}`),a.value="",m("Sucesso","Categoria criada!","success"),await xs(),await Me()}catch(r){m("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}finally{o.disabled=!1,o.textContent="Adicionar"}}async function fl(t){if(await Y("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await Zo(t,"services"),ae(g.establishmentId,tt(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${t})`),m("Sucesso","Categoria apagada.","success"),await xs(),await Me()}catch{m("Erro","Não foi possível apagar a categoria.","error")}}async function xs(){const t=document.getElementById("categoryList");if(t){t.innerHTML='<div class="loader mx-auto my-4"></div>';try{const e=await va(g.establishmentId,"services");_.categories=e,t.innerHTML="",e.length>0?t.innerHTML=e.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded mb-1">
                    <span class="text-sm font-medium text-gray-700">${v(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-xs bg-red-50 px-2 py-1 rounded">Apagar</button>
                </div>`).join(""):t.innerHTML='<p class="text-center text-gray-500 text-sm">Nenhuma categoria criada.</p>'}catch{t.innerHTML='<p class="text-red-500 text-center text-sm">Erro ao carregar categorias.</p>'}}}function xl(){Ce({title:"Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-lg"});const e=document.getElementById("genericModal");if(e){const a=e.querySelector("#categoryForm");a&&(a.addEventListener("submit",ml),e.addEventListener("click",s=>{const o=s.target.closest('button[data-action="delete-category"]');o&&(s.preventDefault(),fl(o.dataset.id))}))}xs()}function hl(t=[]){if(!_.hierarchyCache||_.hierarchyCache.length===0)return`
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
                `})}),e+="</div>",e}async function vl(t){const e=t.target.closest("#serviceForm"),a=e.querySelector("#serviceId").value,s=e.querySelector('button[type="submit"]'),o={},r=e.querySelector('input[name="commissionType"]:checked').value;r==="custom"&&e.querySelectorAll(".professional-commission-row").forEach(c=>{const u=c.dataset.profId;if(c.querySelector('input[type="checkbox"]').checked){const b=parseFloat(c.querySelector('input[type="number"]').value);o[u]=isNaN(b)?0:b}});const i=Array.from(e.querySelectorAll('input[name="accessibleIn"]:checked')).map(c=>c.value),n=i.length>0?i:[g.establishmentId],l={establishmentId:g.establishmentId,accessibleIn:n,name:e.querySelector("#serviceName").value.trim(),price:parseFloat(e.querySelector("#servicePrice").value),duration:parseInt(e.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(e.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:e.querySelector("#serviceCategory").value||null,color:e.querySelector("#serviceColor").value,targetAudience:e.querySelector("#serviceAudience").value,loyaltyPoints:parseInt(e.querySelector("#serviceLoyaltyPoints").value,10)||0,publicDescription:e.querySelector("#servicePublicDescription").value.trim(),homeService:e.querySelector("#serviceHomeToggle").checked,commissionRate:parseFloat(e.querySelector("#serviceCommissionRate").value)||0,active:e.querySelector("#serviceStatusToggle").checked,photo:e.querySelector("#servicePhotoBase64").value,notes:e.querySelector("#serviceNotes").value,commissionType:r,professionalCommissions:o},d=s.innerHTML;s.disabled=!0,s.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{a?(await Ji(a,l),ae(g.establishmentId,tt(),"Serviços","Editou",`Editou o serviço: ${l.name}`),m("Sucesso","Serviço atualizado com sucesso!","success")):(await Qi(l),ae(g.establishmentId,tt(),"Serviços","Criou",`Criou novo serviço: ${l.name}`),m("Sucesso","Serviço adicionado à rede!","success")),document.getElementById("genericModal").style.display="none",await Me()}catch(c){m("Erro",c.message,"error"),s.disabled=!1,s.innerHTML=d}}function yl(t=null){const e=document.getElementById("genericModal"),a=_.categories||[],s=t?.duration||0,o=t?.bufferTime||0,r=v(t?.name||""),i=v(t?.notes||""),n=v(t?.publicDescription||""),l=t?.id?r:"Novo Serviço",d=t?.color||"#4f46e5",c=t?.loyaltyPoints||0,u=a.map(L=>`<option value="${L.id}" ${t?.categoryId===L.id?"selected":""}>${v(L.name)}</option>`).join(""),p=t?.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(r?r.charAt(0):"S")}`,b=`
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
        </div>`;e.innerHTML=b,e.style.display="flex",e.querySelectorAll(".tab-link").forEach(L=>{L.addEventListener("click",()=>{e.querySelectorAll(".tab-link").forEach(H=>{H.classList.remove("active","border-indigo-600","text-indigo-600"),H.classList.add("border-transparent","text-gray-500")}),L.classList.add("active","border-indigo-600","text-indigo-600"),L.classList.remove("border-transparent","text-gray-500"),e.querySelectorAll(".tab-content").forEach(H=>H.classList.add("hidden")),document.getElementById(L.dataset.tab).classList.remove("hidden")})});const f=e.querySelectorAll('input[name="commissionType"]'),h=document.getElementById("defaultCommissionRateContainer"),y=document.getElementById("professionalCommissionsContainer");function S(){const L=e.querySelector('input[name="commissionType"]:checked').value;h&&(h.style.display=L==="default"?"block":"none"),y&&(y.style.display=L==="custom"?"block":"none")}f.forEach(L=>L.addEventListener("change",S));const P=document.getElementById("professionalCommissionsList");P&&(P.innerHTML=(_.professionals||[]).map(L=>{const H=t?.professionalCommissions?.[L.id]!==void 0,V=t?.professionalCommissions?.[L.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-lg border border-transparent hover:bg-gray-50 transition-colors ${H?"bg-indigo-50/50 border-indigo-100":""}" data-prof-id="${L.id}">
                    <label class="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                        <input type="checkbox" ${H?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <img src="${L.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${v(L.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0">
                        <span class="text-sm font-bold text-gray-700 truncate">${v(L.name)}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${V}" step="0.1" class="w-20 p-1.5 border border-gray-300 rounded-lg text-sm text-center outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${H?"":"disabled"}>
                        <span class="text-sm font-black text-gray-400">%</span>
                    </div>
                </div>
            `}).join(""),P.querySelectorAll('input[type="checkbox"]').forEach(L=>{L.addEventListener("change",H=>{const V=H.target.closest(".professional-commission-row");V.querySelector('input[type="number"]').disabled=!H.target.checked,V.classList.toggle("bg-indigo-50/50",H.target.checked),V.classList.toggle("border-indigo-100",H.target.checked),V.classList.toggle("border-transparent",!H.target.checked)})})),S();const N=e.querySelector("#servicePhotoInput"),$=e.querySelector("#servicePhotoButton"),E=e.querySelector("#servicePhotoContainer"),D=e.querySelector("#servicePhotoPreview"),B=e.querySelector("#servicePhotoBase64"),j=()=>N.click();$&&$.addEventListener("click",j),E&&E.addEventListener("click",j),N.onchange=async()=>{const L=N.files[0];if(L){D.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const H=await pa(L,800,800,.8);if(H.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");D.src=H,B.value=H}catch(H){m("Erro de Imagem",H.message,"error"),D.src=p,B.value=t?.photo||""}}};const I=e.querySelector("#serviceForm");e.onclick=async L=>{const H=L.target.closest("button[data-action]");if(!H)return;const V=H.dataset.action,U=H.dataset.id;if(V==="close-modal"&&(e.style.display="none"),V==="save-service"&&I.reportValidity()&&vl({target:I}),V==="delete-service"){if(!U)return;if(await Y("Apagar Serviço","Tem certeza que deseja excluir este serviço da rede?"))try{const W=_.services.find(ne=>ne.id===U)?.name||"Desconhecido";await Io(U),ae(g.establishmentId,tt(),"Serviços","Excluiu",`Excluiu o serviço: ${W}`),m("Sucesso","Serviço apagado da rede.","success"),e.style.display="none",await Me()}catch(W){m("Erro",`Não foi possível apagar o serviço: ${W.message}`,"error")}}}}function wl(){Y("Excluir em Lote",`Tem certeza que deseja excluir ${_.selectedIds.size} serviços da rede? Esta ação não pode ser desfeita.`).then(async t=>{if(t)try{const e=Array.from(_.selectedIds).map(a=>Io(a));await Promise.all(e),ae(g.establishmentId,tt(),"Serviços","Excluiu em Lote",`Excluiu ${_.selectedIds.size} serviços`),m("Sucesso",`${_.selectedIds.size} serviços foram excluídos.`,"success"),_.selectedIds.clear(),Va(),Me()}catch(e){m("Erro",`Não foi possível excluir em lote: ${e.message}`,"error")}})}const ya="suppliers",Ct=async t=>{try{const e=po(ca(me,ya),bo("establishmentId","==",t)),a=await Fr(e),s=[];return a.forEach(o=>{s.push({id:o.id,...o.data()})}),s}catch(e){throw console.error("Erro ao buscar fornecedores:",e),e}},kl=async t=>{try{return{id:(await uo(ca(me,ya),t)).id,...t}}catch(e){throw console.error("Erro ao criar fornecedor:",e),e}},$l=async(t,e)=>{try{const a=Pe(me,ya,t);return await Lt(a,e),{id:t,...e}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},Sl=async t=>{try{const e=Pe(me,ya,t);return await Hr(e),!0}catch(e){throw console.error("Erro ao excluir fornecedor:",e),e}},ft=document.getElementById("content");let q={products:[],categories:[],suppliers:[],hierarchyCache:[],currentTab:"catalogo",stockFilter:"all",searchQuery:"",filterCategoryId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set},jt=null;function Re(){const t=ge.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function hs(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[g.establishmentId]}function Ia(t){return t?t._seconds?new Date(t._seconds*1e3):t.seconds?new Date(t.seconds*1e3):new Date(t):new Date}async function El(){q.selectedIds.clear(),q.currentTab="catalogo";try{const t=await fe();q.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}vs(),Ll(),await Le()}function vs(){ft.innerHTML=`
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
    `,Il()}function Il(){const t=document.getElementById("main-tab-content");if(t){if(q.currentTab==="catalogo")t.innerHTML=`
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
                ${ar(8)}
            </div>

            <button data-action="open-product-modal" data-product="{}" class="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40">
                <i class="bi bi-plus-lg text-xl"></i>
            </button>
        `,tr(),Je();else if(q.currentTab==="movimentacoes"){const e=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const s=a.toISOString().split("T")[0],o=(q.products||[]).map(i=>`<option value="${i.id}">${v(i.name)}</option>`).join(""),r=(q.categories||[]).map(i=>`<option value="${i.id}">${v(i.name)}</option>`).join("");t.innerHTML=`
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
        `,document.getElementById("btn-generate-report").addEventListener("click",Wa),Wa()}}}function Ll(){const t=document.getElementById("multi-context-apply");t&&(t.removeEventListener("click",Le),t.addEventListener("click",()=>{setTimeout(Le,100)})),jt&&ft.removeEventListener("click",jt),jt=e=>{const a=e.target.closest("[data-main-tab]");if(a){q.currentTab=a.dataset.mainTab,vs();return}if(e.target.classList.contains("status-filter-btn")){const d=e.target.dataset.status;q.stockFilter=d,document.querySelectorAll(".status-filter-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200","bg-green-50","text-green-700","border-green-200","bg-orange-50","text-orange-700","border-orange-200","bg-red-50","text-red-700","border-red-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),d==="ok"?e.target.classList.add("bg-green-50","text-green-700","border-green-200"):d==="alert"?e.target.classList.add("bg-orange-50","text-orange-700","border-orange-200"):d==="empty"?e.target.classList.add("bg-red-50","text-red-700","border-red-200"):e.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),e.target.classList.remove("bg-white","text-gray-600","border-gray-200"),Je();return}const s=e.target.closest('[data-action="open-product-modal"]');if(s){e.preventDefault();let d={};if(s.dataset.product)try{d=JSON.parse(s.dataset.product)}catch{}ql(d);return}if(e.target.closest('[data-action="manage-categories"]')){e.preventDefault(),Bl();return}if(e.target.closest('[data-action="open-new-movement-modal"]')){e.preventDefault(),sr();return}const i=e.target.closest(".product-checkbox");if(i){const d=i.dataset.id;i.checked?q.selectedIds.add(d):q.selectedIds.delete(d),Ua(),e.stopPropagation();return}if(e.target.closest("#cancel-selection-btn")){q.selectedIds.clear(),document.querySelectorAll(".product-checkbox").forEach(d=>d.checked=!1),Ua();return}if(e.target.closest("#batch-delete-btn")){jl();return}},ft.addEventListener("click",jt),ft.addEventListener("input",e=>{e.target.id==="searchInput"&&(q.searchQuery=e.target.value.toLowerCase(),Je())}),ft.addEventListener("click",e=>{const a=e.target.closest("#toggle-filter-btn");if(a){const r=document.getElementById("filter-panel");q.isAdvancedFilterOpen=!q.isAdvancedFilterOpen,q.isAdvancedFilterOpen?(r.classList.remove("hidden"),a.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.remove("bg-white","text-gray-600","border-gray-200")):(r.classList.add("hidden"),a.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.add("bg-white","text-gray-600","border-gray-200"))}e.target.closest("#clear-filters-btn")&&(q.filterCategoryId="all",document.getElementById("filterCategoryId").value="all",Je()),e.target.closest("#apply-filter-btn")&&(q.filterCategoryId=document.getElementById("filterCategoryId").value,document.getElementById("toggle-filter-btn").click(),Je())})}async function Le(){const t=hs();try{const e=t.map(n=>ct(n)),a=t.map(n=>va(n,"products")),[s,o]=await Promise.all([Promise.all(e),Promise.all(a)]),r=new Map;s.flat().filter(Boolean).forEach(n=>r.set(n.id,n)),q.products=Array.from(r.values()),g.products=q.products;const i=new Map;o.flat().filter(Boolean).forEach(n=>i.set(n.id,n)),q.categories=Array.from(i.values()),g.categories=q.categories,q.currentTab==="catalogo"?(tr(),Je()):q.currentTab==="movimentacoes"&&Wa(),q.suppliers=[],t.forEach(async n=>{try{let l=[];typeof Ct=="function"&&(l=await Ct(n)),l.forEach(d=>{q.suppliers.find(c=>c.id===d.id)||q.suppliers.push(d)}),g.suppliers=q.suppliers}catch(l){console.warn("Aviso: Falha ao carregar fornecedores em background.",l)}})}catch(e){console.error("Erro detalhado ao carregar produtos:",e);const a=document.getElementById("productsList");a&&(a.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>')}}function tr(){const t=document.getElementById("filterCategoryId");t&&q.categories&&(t.innerHTML='<option value="all">Todas as categorias</option>',q.categories.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=v(e.name),q.filterCategoryId===e.id&&(a.selected=!0),t.appendChild(a)}))}function Ua(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=q.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function Cl(t){const e=document.getElementById("summary-section");if(!e)return;let a=t.length,s=0,o=0,r=0;t.forEach(i=>{const n=i.currentStock||0,l=i.minStock||0;n<=0?r++:l>0&&n<=l||l>0&&n<=l*1.2?o++:s++}),e.innerHTML=`
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
    `}function Je(){const t=document.getElementById("productsList");if(!t)return;if(!q.products||q.products.length===0){t.innerHTML=ar(8);return}const e=hs(),a=q.products.filter(s=>{const o=s.name.toLowerCase().includes(q.searchQuery),r=s.currentStock||0,i=s.minStock||0;let n=!0;q.stockFilter==="ok"&&(n=r>0&&(i===0||r>i*1.2)),q.stockFilter==="alert"&&(n=i>0&&r>0&&r<=i*1.2),q.stockFilter==="empty"&&(n=r<=0);const l=q.filterCategoryId==="all"||s.categoryId===q.filterCategoryId,d=s.accessibleIn&&s.accessibleIn.length>0?s.accessibleIn:[s.establishmentId||g.establishmentId],c=e.some(u=>d.includes(u));return o&&n&&l&&c});Cl(a),t.innerHTML=Dl(a)}function ar(t=8){let e="";for(let a=0;a<t;a++)e+=`
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
        `;const e=new Map((q.categories||[]).map(a=>[a.id,a.name]));return t.map(a=>{const s=v(a.name),o=v(e.get(a.categoryId)||"Sem Categoria"),r=a.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(a.name.charAt(0))}`,i=JSON.stringify(a).replace(/'/g,"&apos;"),n=a.accessibleIn?a.accessibleIn.length:1,l=q.selectedIds.has(a.id),d=a.price!==void 0?parseFloat(a.price).toFixed(2):"0.00",c=a.currentStock||0,u=a.minStock||0;let p="bg-emerald-500",b=!1;return c<=0?(p="bg-red-500",b=!0):u>0&&c<=u*1.2&&(p="bg-orange-500"),`
            <div class="product-card relative bg-white rounded-xl border ${l?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-gray-200"} shadow-sm flex items-center p-3 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 ${b?"opacity-70 bg-gray-50":""}" 
                 data-action="open-product-modal" data-product='${i}'>
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" onclick="event.stopPropagation()">
                    <input type="checkbox" data-id="${a.id}" class="product-checkbox w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${l?"checked":""}>
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
                        <span class="text-[11px] font-black text-indigo-600">R$ ${d}</span>
                        <div class="flex gap-1">
                            <span class="text-[8px] font-semibold text-gray-600 bg-gray-100 px-1 py-0.5 rounded border border-gray-200 flex items-center gap-1"><i class="bi bi-box2"></i> ${c}x</span>
                            ${n>1?`<span class="text-[8px] font-bold bg-indigo-50 text-indigo-700 px-1 py-0.5 rounded border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${n}</span>`:""}
                        </div>
                    </div>
                </div>
            </div>`}).join("")}async function Tl(t){t.preventDefault();const e=t.target.closest("#categoryForm"),a=e.querySelector("#categoryName"),s=a.value;if(!s)return;const o=e.querySelector('button[type="submit"]');o.disabled=!0,o.textContent="...";try{const r=q.hierarchyCache.reduce((i,n)=>(i.push(n.id),n.branches&&n.branches.forEach(l=>i.push(l.id)),i),[]);r.length===0&&r.push(g.establishmentId),await Yo({establishmentId:g.establishmentId,name:s,accessibleIn:r},"products"),ae(g.establishmentId,Re(),"Categorias (Produtos)","Criou",`Criou categoria: ${s}`),a.value="",m("Sucesso","Categoria criada!","success"),await ys(),await Le()}catch(r){m("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}finally{o.disabled=!1,o.textContent="Adicionar"}}async function Pl(t){if(await Y("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await Zo(t,"products"),ae(g.establishmentId,Re(),"Categorias (Produtos)","Excluiu",`Excluiu uma categoria (ID: ${t})`),m("Sucesso","Categoria apagada.","success"),await ys(),await Le()}catch{m("Erro","Não foi possível apagar a categoria.","error")}}async function ys(){const t=document.getElementById("categoryList");if(t){t.innerHTML='<div class="loader mx-auto my-4"></div>';try{const e=await va(g.establishmentId,"products");q.categories=e,t.innerHTML="",e.length>0?t.innerHTML=e.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded mb-1">
                    <span class="text-sm font-medium text-gray-700">${v(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-xs bg-red-50 px-2 py-1 rounded">Apagar</button>
                </div>`).join(""):t.innerHTML='<p class="text-center text-gray-500 text-sm">Nenhuma categoria criada.</p>'}catch{t.innerHTML='<p class="text-red-500 text-center text-sm">Erro ao carregar categorias.</p>'}}}function Bl(){Ce({title:"Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-lg"});const e=document.getElementById("genericModal");if(e){const a=e.querySelector("#categoryForm");a&&(a.addEventListener("submit",Tl),e.addEventListener("click",s=>{const o=s.target.closest('button[data-action="delete-category"]');o&&(s.preventDefault(),Pl(o.dataset.id))}))}ys()}function sr(){const t=(q.products||[]).map(r=>`<option value="${r.id}">${v(r.name)} (Estoque: ${r.currentStock||0})</option>`).join(""),a=`
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
    `;Ce({title:"Lançar Movimentação",contentHTML:a,maxWidth:"max-w-lg"});const s=document.getElementById("movEstablishmentId");s&&(s.value=g.establishmentId);const o=document.getElementById("newMovementForm");o.onsubmit=async r=>{r.preventDefault();const i=o.querySelector('button[type="submit"]'),n=i.innerHTML,l=document.getElementById("movProductId")?.value,d=document.getElementById("movEstablishmentId")?.value,c=o.querySelector('input[name="movType"]:checked')?.value,u=parseInt(document.getElementById("movAmount")?.value,10),p=document.getElementById("movReason")?.value.trim();if(!l||!u||u<=0||!p||!d){m("Erro","Preencha todos os campos corretamente.","warning");return}const b=c==="in"?u:-u;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> Salvando...';try{await jo(l,{change:b,reason:p,establishmentId:d});const f=q.products.find(h=>h.id===l)?.name||"Produto";ae(d,Re(),"Estoque","Ajuste Manual",`Lançou movimentação (${b>0?"+":""}${b}) para ${f}`),m("Sucesso","Movimentação registrada com sucesso!","success"),document.getElementById("genericModal").style.display="none",await Le()}catch(f){m("Erro",f.message,"error"),i.disabled=!1,i.innerHTML=n}}}function Al(t=[]){if(!q.hierarchyCache||q.hierarchyCache.length===0)return`
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
                `})}),e+="</div>",e}async function Ml(t){t.preventDefault();const e=document.getElementById("productId")?.value||"",a=document.querySelector('#productForm button[type="submit"]'),s=parseInt(document.getElementById("productCurrentStock")?.value||"0",10),o=parseInt(document.getElementById("productMinStock")?.value||"0",10),r=parseInt(document.getElementById("productMaxStock")?.value||"0",10),i=document.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),n=Array.from(i).map(f=>f.dataset.id),l=Array.from(document.querySelectorAll('#productForm input[name="accessibleIn"]:checked')).map(f=>f.value),d=l.length>0?l:[g.establishmentId],c=document.getElementById("productName"),u=document.getElementById("productPrice");if(!c?.value||!u?.value){m("Aviso","Preencha o Nome e o Preço do produto.","warning");return}const p={establishmentId:g.establishmentId,accessibleIn:d,name:c.value.trim(),price:parseFloat(u.value),costPrice:parseFloat(document.getElementById("productCostPrice")?.value)||0,commissionRate:parseFloat(document.getElementById("productCommissionRate")?.value)||0,currentStock:isNaN(s)?0:s,minStock:isNaN(o)?0:o,maxStock:isNaN(r)?0:r,categoryId:document.getElementById("productCategory")?.value||null,photo:document.getElementById("productPhotoBase64")?.value||"",supplierIds:n},b=a?a.innerHTML:"Salvar";a&&(a.disabled=!0,a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...');try{e?(await qo(e,p),ae(g.establishmentId,Re(),"Produtos","Editou",`Editou o produto: ${p.name}`),m("Sucesso","Produto atualizado com sucesso!","success")):(await Mo(p),ae(g.establishmentId,Re(),"Produtos","Criou",`Criou novo produto: ${p.name}`),m("Sucesso","Produto adicionado à rede!","success")),document.getElementById("genericModal").style.display="none",await Le()}catch(f){m("Erro",f.message,"error"),a&&(a.disabled=!1,a.innerHTML=b)}}function ql(t=null){const e=document.getElementById("genericModal"),a=q.categories||[],s=v(t?.name||""),o=t?.price!==void 0?t.price:"",r=t?.costPrice!==void 0?t.costPrice:"",i=t?.commissionRate!==void 0?t.commissionRate:"",n=t?.currentStock||0,l=t?.minStock||0,d=t?.maxStock||0,c=t?.id?s:"Novo Produto",u=a.map(B=>`<option value="${B.id}" ${t?.categoryId===B.id?"selected":""}>${v(B.name)}</option>`).join(""),p=t?.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(s?s.charAt(0):"P")}`,b=`
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
                                    ${Al(t?.accessibleIn||[])}
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
        </div>`;e.innerHTML=b,e.style.display="flex",e.querySelectorAll(".tab-link").forEach(B=>{B.addEventListener("click",()=>{e.querySelectorAll(".tab-link").forEach(j=>{j.classList.remove("active","border-indigo-600","text-indigo-600"),j.classList.add("border-transparent","text-gray-500")}),B.classList.add("active","border-indigo-600","text-indigo-600"),B.classList.remove("border-transparent","text-gray-500"),e.querySelectorAll(".tab-content").forEach(j=>j.classList.add("hidden")),document.getElementById(B.dataset.tab).classList.remove("hidden")})});const f=document.getElementById("productForm");f.onsubmit=Ml;let h=new Set(t?.supplierIds||[]);const y=()=>{const B=document.getElementById("modalSupplierSearch"),j=document.getElementById("supplierSearchResults"),I=document.getElementById("selectedSuppliersList"),L=B?.value.toLowerCase()||"",H=q.suppliers||[];if(L.length>0){const V=H.filter(U=>U.name.toLowerCase().includes(L)&&!h.has(U.id));V.length>0?(j.classList.remove("hidden"),j.innerHTML=V.map(U=>`
                    <div class="p-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-0 flex justify-between items-center transition-colors" data-add-supplier="${U.id}">
                        <span class="font-bold text-sm text-gray-700">${v(U.name)}</span>
                        <span class="text-indigo-600 text-xs font-bold px-2 py-1 bg-indigo-100 rounded">+ Adicionar</span>
                    </div>
                `).join("")):(j.classList.remove("hidden"),j.innerHTML='<div class="p-4 text-sm text-gray-500 text-center">Fornecedor não encontrado.</div>')}else j.classList.add("hidden");h.size>0?(I.classList.remove("justify-center"),I.classList.add("justify-start"),I.innerHTML="",h.forEach(V=>{const U=H.find(T=>T.id===V);U&&(I.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border border-gray-200 p-3 rounded-lg shadow-sm" data-id="${U.id}">
                            <div>
                                <p class="font-bold text-gray-800 text-sm">${v(U.name)}</p>
                                <p class="text-[10px] text-gray-500 mt-0.5"><i class="bi bi-person"></i> ${v(U.contactName||"N/I")} | <i class="bi bi-telephone"></i> ${v(U.phone||"N/I")}</p>
                            </div>
                            <button type="button" class="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors" data-remove-supplier="${U.id}" title="Remover">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                    `)})):(I.classList.add("justify-center"),I.classList.remove("justify-start"),I.innerHTML='<p class="text-xs text-gray-400 text-center">Nenhum fornecedor adicionado ainda.</p>')};document.getElementById("modalSupplierSearch")?.addEventListener("input",y),y();const S=document.getElementById("productPhotoInput"),P=document.getElementById("productPhotoButton"),N=document.getElementById("productPhotoContainer"),$=document.getElementById("productPhotoPreview"),E=document.getElementById("productPhotoBase64"),D=()=>S?.click();P&&P.addEventListener("click",D),N&&N.addEventListener("click",D),S&&(S.onchange=async()=>{const B=S.files[0];if(!B)return;const j=$.src;$.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const I=await pa(B,800,800,.8);if(I.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");$.src=I,E.value=I}catch(I){m("Erro de Imagem",I.message,"error"),$.src=j,E.value=t?.photo||""}}),e.onclick=async B=>{const j=B.target.closest("[data-add-supplier]");if(j){h.add(j.dataset.addSupplier);const U=document.getElementById("modalSupplierSearch");U&&(U.value=""),y();return}const I=B.target.closest("[data-remove-supplier]");if(I){h.delete(I.dataset.removeSupplier),y();return}const L=B.target.closest("button[data-action]");if(!L)return;const H=L.dataset.action,V=L.dataset.id;if(H==="close-modal"&&(e.style.display="none"),H==="delete-product"){if(!V)return;if(await Y("Apagar Produto","Tem certeza que deseja excluir este produto do catálogo?"))try{const T=q.products.find(W=>W.id===V)?.name||"Desconhecido";await bs(V),ae(g.establishmentId,Re(),"Produtos","Excluiu",`Excluiu o produto: ${T}`),m("Sucesso","Produto apagado.","success"),e.style.display="none",await Le()}catch(T){m("Erro",`Não foi possível apagar: ${T.message}`,"error")}}H==="open-new-movement-modal"&&(e.style.display="none",q.currentTab="movimentacoes",vs(),sr())}}function jl(){Y("Excluir em Lote",`Tem certeza que deseja excluir ${q.selectedIds.size} produtos da rede?`).then(async t=>{if(t)try{const e=Array.from(q.selectedIds).map(a=>bs(a));await Promise.all(e),ae(g.establishmentId,Re(),"Produtos","Excluiu em Lote",`Excluiu ${q.selectedIds.size} produtos`),m("Sucesso",`${q.selectedIds.size} produtos foram excluídos.`,"success"),q.selectedIds.clear(),Ua(),Le()}catch(e){m("Erro",`Não foi possível excluir em lote: ${e.message}`,"error")}})}async function Wa(){const t=document.getElementById("report-results");if(!t)return;t.innerHTML='<div class="flex items-center justify-center h-full"><div class="loader"></div></div>';const e={startDate:document.getElementById("reportStartDate")?.value||"",endDate:document.getElementById("reportEndDate")?.value||"",productId:document.getElementById("productFilterReport")?.value||"all",categoryId:document.getElementById("categoryFilterReport")?.value||"all"};try{const s=hs().map(n=>No({...e,establishmentId:n}).catch(l=>[])),o=await Promise.all(s);let r=[];if(o.forEach(n=>{if(!n)return;const l=Array.isArray(n)?n:Array.isArray(n.data)?n.data:Array.isArray(n.movements)?n.movements:[];r=r.concat(l)}),r.sort((n,l)=>Ia(l.date)-Ia(n.date)),r.length===0){t.innerHTML=`
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
                        ${r.map(n=>{const l=n.change>0,d=l?"text-emerald-600 bg-emerald-50":"text-red-600 bg-red-50",c=l?'<i class="bi bi-arrow-down-left"></i>':'<i class="bi bi-arrow-up-right"></i>';return`
                            <tr class="hover:bg-gray-50 transition-colors">
                                <td class="px-4 py-3 whitespace-nowrap text-gray-500 text-xs">${Ia(n.date).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"})}</td>
                                <td class="px-4 py-3 font-bold text-gray-800 text-xs">${v(n.productName)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center">
                                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md font-bold text-xs ${d}">
                                        ${c} ${l?"+":""}${n.change}
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
            </div>`;t.innerHTML=i}catch(a){m("Erro",`Não foi possível gerar: ${a.message}`,"error"),t.innerHTML='<div class="p-8 text-center text-red-500 font-bold">Falha ao buscar movimentações.</div>'}}const Gt=document.getElementById("content");let Q={partners:[],establishments:[],searchQuery:"",categoryFilter:"all",stateFilter:"all",cityFilter:"",sortBy:"name_asc",hasSearched:!1,viewMode:"list",editingItem:null},Nt=null;const sa={contas_fixas:{label:"Contas Fixas (Água, Luz)",color:"blue",icon:"bi-lightning-charge"},estoque:{label:"Fornecedor de Produtos",color:"emerald",icon:"bi-box-seam"},servicos:{label:"Prestador de Serviço",color:"purple",icon:"bi-tools"},impostos:{label:"Governo / Impostos",color:"red",icon:"bi-bank"},outros:{label:"Outros Parceiros",color:"gray",icon:"bi-person-vcard"}},or=["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];async function Nl(){try{const e=(await fe()).matrizes||[];Q.establishments=[],e.forEach(a=>{Q.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>Q.establishments.push({id:s.id,name:s.name,type:"Filial"}))})}catch(t){console.warn("Erro ao buscar lojas",t)}Q.viewMode="list",Q.editingItem=null,Q.hasSearched=!1,Q.partners=[],Rl(),Vl(),rr()}function Rl(){Gt.innerHTML=`
        <div class="flex flex-col h-full bg-gray-50 w-full relative min-h-0 overflow-hidden">
            
            <div id="suppliers-list-view" class="w-full h-full flex flex-col transition-all duration-300 ${Q.viewMode==="list"?"flex":"hidden"} p-2 md:p-4 md:pl-6 relative">
                
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

            <div id="suppliers-form-view" class="w-full h-full overflow-y-auto custom-scrollbar transition-all duration-300 ${Q.viewMode==="form"?"block":"hidden"} p-2 md:p-4 md:pl-6">
                <div id="form-container-wrapper" class="max-w-4xl mx-auto w-full">
                </div>
            </div>

        </div>
    `}function Fl(){const t=Object.entries(sa).map(([a,s])=>`<option value="${a}">${s.label}</option>`).join(""),e=or.map(a=>`<option value="${a}">${a}</option>`).join("");return`
        <div class="flex flex-col md:flex-row items-start md:items-center gap-2 mb-3 w-full animate-fade-in bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
            
            <div class="relative flex-shrink-0 w-full md:w-64">
                <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                <input type="text" id="filterSearch" placeholder="Nome, CNPJ, Email..." value="${Q.searchQuery}" class="w-full pl-8 p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
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

                <input type="text" id="filterCity" placeholder="Cidade" value="${Q.cityFilter}" class="w-full md:w-32 p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all flex-shrink-0">
                
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
    `}function Hl(t=null){const e=!!t;let a=t?.category||"";a==="Produtos"&&(a="estoque"),a==="Serviços"&&(a="servicos");const s=Object.entries(sa).map(([i,n])=>`<option value="${i}" ${a===i?"selected":""}>${n.label}</option>`).join(""),o=or.map(i=>`<option value="${i}" ${t?.state===i?"selected":""}>${i}</option>`).join(""),r=document.getElementById("form-container-wrapper");r&&(r.innerHTML=`
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
    `,document.getElementById("partner-form").addEventListener("submit",zl))}function rr(){const t=document.getElementById("partners-grid");t&&(t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-xl w-full max-w-2xl mx-auto shadow-sm mt-4">
                <div class="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3 border border-indigo-100 shadow-inner">
                    <i class="bi bi-search text-xl text-indigo-400"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-800 mb-1">Pronto para pesquisar</h3>
                <p class="text-[10px] text-gray-500 font-medium max-w-sm text-center">Utilize os filtros acima e clique em "Buscar" para listar os parceiros registados no sistema.</p>
            </div>
        `)}async function Ol(){const t=document.getElementById("partners-grid");if(!Q.hasSearched){rr();return}t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="text-xs text-gray-500 mt-4 font-medium">Buscando parceiros...</p></div>';try{const e=await Ct(g.establishmentId);Q.partners=e||[],ir()}catch(e){t.innerHTML=`<div class="text-center py-10 text-red-500 text-sm font-bold">Erro ao carregar parceiros: ${e.message}</div>`}}function ir(){const t=document.getElementById("partners-grid");if(!t)return;let e=Q.partners;if(Q.searchQuery){const o=Q.searchQuery.toLowerCase();e=e.filter(r=>r.name.toLowerCase().includes(o)||r.document&&r.document.includes(o)||r.taxId&&r.taxId.includes(o)||r.email&&r.email.toLowerCase().includes(o)||r.contactName&&r.contactName.toLowerCase().includes(o))}if(Q.categoryFilter!=="all"&&(e=e.filter(o=>o.category===Q.categoryFilter)),Q.stateFilter!=="all"&&(e=e.filter(o=>o.state===Q.stateFilter)),Q.cityFilter){const o=Q.cityFilter.toLowerCase();e=e.filter(r=>r.city&&r.city.toLowerCase().includes(o))}if(e.sort((o,r)=>{let i="",n="";return Q.sortBy==="name_asc"||Q.sortBy==="name_desc"?(i=(o.name||"").toLowerCase(),n=(r.name||"").toLowerCase()):Q.sortBy==="contact_asc"&&(i=(o.contactName||"").toLowerCase(),n=(r.contactName||"").toLowerCase()),Q.sortBy==="name_desc"?n.localeCompare(i):i.localeCompare(n)}),e.length===0){t.innerHTML=`
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
    `,s='<div class="flex flex-col gap-2 md:hidden p-2">';e.forEach(o=>{let r=o.category;r==="Produtos"&&(r="estoque"),r==="Serviços"&&(r="servicos");const i=sa[r]||sa.outros,n=o.document||o.taxId?o.document||o.taxId:"-",l=JSON.stringify(o).replace(/'/g,"&apos;"),d=[o.city,o.state].filter(Boolean).join(" - ");a+=`
            <tr class="hover:bg-gray-50 cursor-pointer transition-colors group" data-action="open-form" data-item='${l}'>
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
                    ${d?`<div class="text-[9px] font-bold uppercase tracking-wider text-gray-400 mt-0.5"><i class="bi bi-geo-alt mr-1"></i>${v(d)}</div>`:""}
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
                        <h3 class="font-bold text-gray-900 text-xs leading-tight truncate">${v(o.name)}</h3>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-lg p-2 border border-gray-100 mt-1 flex flex-col gap-1">
                    <div class="flex justify-between items-center text-[10px]">
                        <span class="text-gray-500 font-medium">Documento:</span>
                        <span class="font-bold text-gray-700">${v(n)}</span>
                    </div>
                    ${d?`
                    <div class="flex justify-between items-center text-[10px]">
                        <span class="text-gray-500 font-medium">Local:</span>
                        <span class="font-bold text-gray-700">${v(d)}</span>
                    </div>`:""}
                </div>
            </div>
        `}),a+="</tbody></table></div>",s+="</div>",t.innerHTML=a+s}function ht(t,e=null){const a=document.getElementById("suppliers-list-view"),s=document.getElementById("suppliers-form-view");Q.viewMode=t,Q.editingItem=e,t==="list"?(a.classList.remove("hidden"),a.classList.add("flex"),s.classList.add("hidden"),s.innerHTML='<div id="form-container-wrapper" class="max-w-4xl mx-auto w-full"></div>',Q.hasSearched&&ir(),window.scrollTo({top:0,behavior:"smooth"})):(a.classList.add("hidden"),a.classList.remove("flex"),s.classList.remove("hidden"),Hl(e),window.scrollTo({top:0,behavior:"smooth"}))}async function zl(t){t.preventDefault();const e=t.target,a=e.querySelector("#supId").value,s={name:e.querySelector("#supName").value,contactName:e.querySelector("#supContact").value,email:e.querySelector("#supEmail").value,phone:e.querySelector("#supPhone").value,document:e.querySelector("#supTaxId").value,category:e.querySelector("#supCategory").value,state:e.querySelector("#supState").value,city:e.querySelector("#supCity").value,establishmentId:g.establishmentId,notes:e.querySelector("#supNotes")?.value||"",accessibleIn:[g.establishmentId]},o=e.querySelector('button[type="submit"]'),r=o.innerHTML;o.disabled=!0,o.innerHTML='<div class="loader-small border-white"></div> A gravar...';try{a?(await $l(a,s),m("Sucesso","Ficha atualizada!","success")):(await kl(s),m("Sucesso","Parceiro registado!","success")),Q.hasSearched&&(Q.partners=await Ct(g.establishmentId)||[]),ht("list")}catch(i){m("Erro","Falha ao gravar: "+i.message,"error"),o.disabled=!1,o.innerHTML=r}}async function _l(t){if(await Y("Excluir Parceiro","Deseja realmente apagar esta ficha permanentemente?"))try{await Sl(t),m("Sucesso","Entidade excluída.","success"),Q.partners=Q.partners.filter(a=>a.id!==t),ht("list")}catch(a){m("Erro","Erro ao excluir: "+a.message,"error")}}function Vl(){Nt&&Gt.removeEventListener("click",Nt),Nt=async t=>{const e=t.target;if(e.closest('button[data-action="new-partner"]')){ht("form",null);return}if(e.closest("#btn-search-partners")){Q.searchQuery=document.getElementById("filterSearch").value,Q.categoryFilter=document.getElementById("filterCategory").value,Q.stateFilter=document.getElementById("filterState").value,Q.cityFilter=document.getElementById("filterCity").value,Q.sortBy=document.getElementById("filterSortBy").value,Q.hasSearched=!0,Ol();return}if(e.closest('button[data-action="back-to-list"]')){ht("list");return}const a=e.closest('button[data-action="delete-partner"]');if(a){t.preventDefault(),_l(a.dataset.id);return}const s=e.closest('[data-action="open-form"]');if(s&&!e.closest("button")){const o=JSON.parse(s.dataset.item.replace(/&apos;/g,"'"));ht("form",o)}},Gt.addEventListener("click",Nt),Gt.addEventListener("keypress",t=>{t.key==="Enter"&&(t.target.id==="filterSearch"||t.target.id==="filterCity")&&document.getElementById("btn-search-partners").click()})}const Qa=document.getElementById("content"),Os={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let z={professionals:[],services:[],hierarchyCache:[],statusFilter:"all",searchQuery:"",filterServiceId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set,viewMode:"list",tempProf:null},Rt=null,Ft=null;function Xt(){const t=ge.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function nr(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[g.establishmentId]}function Ul(){const t=document.getElementById("professionals-layout-main"),e=document.getElementById("professionals-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&t.classList.add("mobile-detail-open"),e&&(e.classList.remove("hidden"),e.classList.add("flex")),a&&(a.style.display="none")}function La(){const t=document.getElementById("professionals-layout-main"),e=document.getElementById("professionals-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&t.classList.remove("mobile-detail-open"),e&&(e.classList.add("hidden"),e.classList.remove("flex")),a&&(a.style.display=""),z.viewMode="list"}async function Wl(){z.selectedIds.clear(),z.viewMode="list";try{const t=await fe();z.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}lr(),td(),await oa()}function lr(){Qa.innerHTML=`
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
                    ${ur(8)}
                </div>
            </section>

            <div id="professionals-layout-detail" class="hidden absolute inset-0 z-50 bg-slate-50 flex-col overflow-hidden w-full h-full md:relative md:inset-auto md:z-auto md:flex-1 md:border-l md:border-slate-200">
            </div>
        </div>
    `}async function oa(){const t=document.getElementById("professionalsList"),e=nr();try{const a=e.map(l=>$e(l)),s=e.map(l=>dt(l)),o=await Promise.all(a),r=await Promise.all(s),i=new Map;o.flat().forEach(l=>i.set(l.id,l)),z.professionals=Array.from(i.values()),g.professionals=z.professionals;const n=new Map;r.flat().forEach(l=>n.set(l.id,l)),z.services=Array.from(n.values()),dr(),We()}catch(a){console.error(a),t&&(t.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>')}}function dr(){const t=document.getElementById("filterServiceId");t&&z.services&&(t.innerHTML='<option value="all">Todos os serviços</option>',z.services.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=v(e.name),z.filterServiceId===e.id&&(a.selected=!0),t.appendChild(a)}))}function cr(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=z.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function Ql(t){const e=document.getElementById("summary-section");if(!e)return;const a=t.length,s=t.filter(r=>r.status!=="inactive").length,o=a-s;e.innerHTML=`
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
    `}function We(){const t=document.getElementById("professionalsList");if(!t)return;if(!z.professionals||z.professionals.length===0){t.innerHTML=ur(8);return}const e=nr(),a=z.professionals.filter(s=>{const o=s.name.toLowerCase().includes(z.searchQuery)||s.specialty&&s.specialty.toLowerCase().includes(z.searchQuery);let r=!0;z.statusFilter==="active"&&(r=s.status!=="inactive"),z.statusFilter==="inactive"&&(r=s.status==="inactive");const i=z.filterServiceId==="all"||s.services&&s.services.includes(z.filterServiceId),n=s.accessibleIn&&s.accessibleIn.length>0?s.accessibleIn:[s.establishmentId||g.establishmentId],l=e.some(d=>n.includes(d));return o&&r&&i&&l});if(Ql(a),a.length===0){t.innerHTML=`
            <div class="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-people text-2xl text-slate-300"></i>
                </div>
                <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhum profissional encontrado</h3>
                <p class="text-[10px] text-slate-500 max-w-xs text-center">Tente ajustar os filtros ou verificar as unidades selecionadas no topo.</p>
            </div>
        `;return}t.innerHTML=a.map(s=>{const o=s.status==="inactive",r=v(s.name),i=v(s.specialty||"Especialidade"),n=s.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(s.name?s.name.charAt(0):"P")}`,l=s.accessibleIn?s.accessibleIn.length:1,d=s.services?s.services.length:0,c=z.selectedIds.has(s.id);return`
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
                        ${l>1?`<span class="text-[9px] font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded-md border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${l}</span>`:'<span class="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md border border-slate-200 flex items-center gap-1"><i class="bi bi-geo-alt"></i> Única</span>'}
                        <span class="text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200 flex items-center gap-1" title="${d} serviços habilitados"><i class="bi bi-scissors text-indigo-400"></i> ${d}</span>
                    </div>
                </div>
            </div>`}).join("")}function ur(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center p-3.5 animate-pulse h-[86px]">
            <div class="w-12 h-12 rounded-full bg-slate-200 flex-shrink-0 mr-4"></div>
            <div class="flex-1 space-y-2">
                <div class="h-3 bg-slate-200 rounded w-3/4"></div>
                <div class="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}async function Jl(t){z.viewMode="edit-professional";const e=document.getElementById("professionals-layout-detail");if(!e)return;let a={name:"",specialty:"",status:"active",workingHours:{},services:[]};if(t){const r=z.professionals.find(i=>String(i.id)===String(t));r&&(a=JSON.parse(JSON.stringify(r)))}z.tempProf=a;const s=!!a.id;v(a.name||"Novo Profissional");const o=`
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
    `,Gl(a,z.services),Yl(a),await Kl(a,z.professionals),ed(a),Ul()}function Gl(t,e){const a=document.getElementById("dados-basicos"),s=document.getElementById("atuacao");if(!a||!s)return;const o=t.dob?t.dob.split("/"):["",""],r=Array.from({length:12},(c,u)=>{const p=u+1,b=p==o[1]?"selected":"",f=new Date(0,u).toLocaleString("pt-BR",{month:"long"});return`<option value="${p}" ${b}>${f.charAt(0).toUpperCase()+f.slice(1)}</option>`}).join(""),i=v(t.name||""),n=v(t.specialty||""),l=v(t.phone||""),d=v(t.notes||"");a.innerHTML=`
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
                    ${Xl(t.accessibleIn||[])}
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
    `}function Xl(t=[]){if(!z.hierarchyCache||z.hierarchyCache.length===0)return`
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
                `})}),e+="</div>",e}function Yl(t){const e=document.getElementById("jornada");e&&(e.innerHTML=`
        <div class="max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-1">Jornada Semanal</h3>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Defina os dias e os horários de atendimento.</p>
            <div id="profScheduleContainer" class="grid grid-cols-1 lg:grid-cols-2 gap-3"></div>
        </div>`,Zl(e.querySelector("#profScheduleContainer"),t.workingHours||{}))}function Zl(t,e){t.innerHTML=Object.keys(Os).map(a=>{const s=e[a]||{},o=s.active!==!1;return`
            <div class="day-schedule-card p-3 md:p-4 rounded-xl ${o?"bg-white border-slate-200 shadow-sm":"bg-slate-50 border-slate-100 disabled opacity-60"} border transition-all">
                 <div class="flex justify-between items-center mb-3">
                    <span class="font-black text-sm text-slate-800 uppercase tracking-wider">${Os[a]}</span>
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
            </div>`}).join(""),t.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",s=>{const o=s.target.closest(".day-schedule-card"),r=!s.target.checked;o.classList.toggle("bg-white",!r),o.classList.toggle("shadow-sm",!r),o.classList.toggle("border-slate-200",!r),o.classList.toggle("bg-slate-50",r),o.classList.toggle("border-slate-100",r),o.classList.toggle("opacity-60",r),o.classList.toggle("disabled",r),o.querySelectorAll(".time-inputs input").forEach(i=>i.disabled=r)})})}async function Kl(t,e){const a=document.getElementById("bloqueios");if(!a)return;a.innerHTML=`
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
        </div>`;const s=document.getElementById("batchBlockageForm");s&&s.addEventListener("submit",async r=>{r.preventDefault();const i=s.querySelector('button[type="submit"]'),n=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';const l=Array.from(r.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(h=>h.value);if(l.length===0)return i.disabled=!1,i.innerHTML=n,m("Atenção","Selecione pelo menos um profissional.","error");const d=r.target.batchBlockageStartDate.value,c=r.target.batchBlockageEndDate.value||d,u=r.target.batchBlockageStartTime.value,p=r.target.batchBlockageEndTime.value,b=r.target.batchBlockageReason.value;if(!d||!u||!p)return i.disabled=!1,i.innerHTML=n,m("Atenção","Preencha Data de Início, Hora de Início e Fim.","error");const f=l.map(h=>{const y={professionalId:h,establishmentId:g.establishmentId,startTime:new Date(`${d}T${u}`).toISOString(),endTime:new Date(`${c}T${p}`).toISOString(),reason:b};return ga(y)});try{await Promise.all(f),m("Sucesso!",`${l.length} bloqueios foram criados.`),s.reset(),r.target.querySelectorAll('input[name="batch-professionals"]').forEach(y=>{y.checked=y.value===t.id});const h=document.getElementById("prof-blockages-filter").value;vt(t.id,h)}catch(h){m("Erro",h.message,"error")}finally{i.disabled=!1,i.innerHTML=n}});const o=document.getElementById("prof-blockages-filter");o&&o.addEventListener("change",r=>vt(t.id,r.target.value)),t.id&&await vt(t.id,"future")}async function vt(t,e="future"){const a=document.getElementById("blockagesList");if(a){if(a.innerHTML='<div class="loader mx-auto mt-6"></div>',!t){a.innerHTML=`
            <div class="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <i class="bi bi-info-circle text-2xl text-slate-300 mb-2 block"></i>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Salve o perfil para ver o histórico.</p>
            </div>`;return}try{const s=new Date;let o,r;e==="history"?(r=new Date,o=new Date,o.setFullYear(o.getFullYear()-2)):(o=new Date,r=new Date,r.setFullYear(r.getFullYear()+2));let n=(await ba(g.establishmentId,o.toISOString(),r.toISOString(),t)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));e==="history"?n=n.filter(d=>d.endTime<s).sort((d,c)=>c.startTime-d.startTime):n=n.filter(d=>d.endTime>=s).sort((d,c)=>d.startTime-c.startTime);const l=n.reduce((d,c)=>{const u=c.reason||"Sem motivo detalhado";return d[u]||(d[u]=[]),d[u].push(c),d},{});if(Object.keys(l).length===0){a.innerHTML=`
                <div class="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    <i class="bi bi-calendar-check text-3xl text-slate-300 mb-2 block"></i>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhum bloqueio ${e==="history"?"no histórico":"agendado para o futuro"}.</p>
                </div>`;return}a.innerHTML=Object.entries(l).map(([d,c])=>`
            <div class="bg-white border border-slate-200 rounded-xl shadow-sm mb-3 overflow-hidden">
                <div class="bg-slate-50 px-3 py-2.5 border-b border-slate-200 flex justify-between items-center">
                    <h4 class="font-black text-xs text-slate-800 flex items-center gap-2"><i class="bi bi-tag-fill text-orange-400 text-sm"></i> ${v(d)}</h4>
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
        `).join("")}catch(s){a.innerHTML=`<p class="text-[10px] font-bold text-red-500 p-4 bg-red-50 rounded-xl border border-red-100">${s.message}</p>`}}}function ed(t){const e=document.getElementById("professionals-layout-detail");if(!e)return;const a=e.querySelectorAll(".tab-link");a.forEach(p=>{p.addEventListener("click",b=>{b.preventDefault(),a.forEach(y=>{y.classList.remove("active","border-indigo-600","text-indigo-600"),y.classList.add("border-transparent","text-slate-500")}),p.classList.add("active","border-indigo-600","text-indigo-600"),p.classList.remove("border-transparent","text-slate-500"),e.querySelectorAll(".tab-content").forEach(y=>y.classList.add("hidden"));const f=p.dataset.tab,h=e.querySelector("#"+f);h&&h.classList.remove("hidden")})});const s=e.querySelector("#profPhotoInput"),o=e.querySelector("#profPhotoButton"),r=e.querySelector("#profPhotoContainer"),i=e.querySelector("#profPhotoPreview"),n=e.querySelector("#profPhotoBase64"),l=t.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,d=t.photo||"",c=()=>s.click();o&&o.addEventListener("click",c),r&&r.addEventListener("click",c),s&&(s.onchange=async()=>{const p=s.files[0];if(p){i.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const b=await pa(p,800,800,.8);if(b.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");i.src=b,n.value=b}catch(b){m("Erro de Imagem",b.message||"Não foi possível processar a imagem.","error"),i.src=l,n.value=d,s.value=""}}});const u=e.querySelector("#selectAllServicesBtn");if(u){u.addEventListener("click",()=>{const b=e.querySelectorAll('#profServicesContainer input[type="checkbox"]'),f=Array.from(b).every(h=>h.checked);b.forEach(h=>{h.checked=!f}),u.textContent=f?"Selecionar Todos":"Desmarcar Todos"});const p=e.querySelectorAll('#profServicesContainer input[type="checkbox"]');p.length>0&&Array.from(p).every(b=>b.checked)&&(u.textContent="Desmarcar Todos")}}function td(){Rt&&document.body.removeEventListener("click",Rt),Ft&&Qa.removeEventListener("input",Ft),Rt=async t=>{if(t.target.classList.contains("professional-checkbox")){const r=t.target.dataset.id;t.target.checked?z.selectedIds.add(r):z.selectedIds.delete(r),cr(),t.stopPropagation();return}const e=t.target.closest(".status-filter-btn");if(e){z.statusFilter=e.dataset.status,document.querySelectorAll(".status-filter-btn").forEach(r=>{r.classList.remove("bg-indigo-600","text-white","border-indigo-600"),r.classList.add("bg-white","text-slate-600","border-slate-200")}),e.classList.remove("bg-white","text-slate-600","border-slate-200"),e.classList.add("bg-indigo-600","text-white","border-indigo-600"),We();return}if(t.target.id==="clear-filters-btn"){t.preventDefault(),document.getElementById("filterServiceId").value="all",z.filterServiceId="all",We();return}if(t.target.id==="apply-filter-btn"){t.preventDefault(),z.filterServiceId=document.getElementById("filterServiceId").value,We();return}if(t.target.closest("#toggle-filter-btn")){t.preventDefault(),z.isAdvancedFilterOpen=!z.isAdvancedFilterOpen,lr(),document.getElementById("searchInput").value=z.searchQuery,dr(),We();return}const s=t.target.closest("[data-action]");if(!s)return;const o=s.dataset.action;switch(["close-detail-screen","delete-professional","save-professional","delete-blockage","batch-delete-blockage"].includes(o)&&t.stopPropagation(),o){case"open-professional-editor":Jl(s.dataset.id);break;case"close-detail-screen":La(),z.tempProf=null;break;case"batch-delete":ad();break;case"delete-professional":{const r=s.dataset.id,i=z.tempProf?.name||"Profissional";if(await Y("Excluir Profissional",`Tem certeza que deseja excluir ${i}? Esta ação não pode ser desfeita.`))try{await fo(r),ae(g.establishmentId,Xt(),"Equipe","Excluiu",`Excluiu profissional: ${i}`),m("Sucesso!","Profissional excluído da rede.","success"),La(),oa()}catch(l){m("Erro",`Não foi possível excluir: ${l.message}`,"error")}break}case"save-professional":{const r=document.getElementById("professionals-layout-detail"),i=s,n=r.querySelector("#profScheduleContainer"),l=Array.from(r.querySelectorAll('#profServicesContainer input[type="checkbox"]:checked')).map(S=>S.value),d={};n&&n.querySelectorAll(".day-schedule-card").forEach(S=>{const P=S.querySelector('[data-field="active"]').dataset.day;d[P]={active:S.querySelector('[data-field="active"]').checked,start:S.querySelector('[data-field="start"]').value,end:S.querySelector('[data-field="end"]').value,breakStart:S.querySelector('[data-field="breakStart"]').value,breakEnd:S.querySelector('[data-field="breakEnd"]').value}});const c=Array.from(r.querySelectorAll('input[name="accessibleIn"]:checked')).map(S=>S.value),u=c.length>0?c:[g.establishmentId],p=r.querySelector("#profStatusToggle").checked,b=r.querySelector("#profCommissionToggle").checked,f=r.querySelector("#profShowOnAgendaToggle").checked,h={...z.tempProf,id:r.querySelector("#professionalId").value||void 0,accessibleIn:u,name:r.querySelector("#profName").value.trim(),specialty:r.querySelector("#profSpecialty").value,photo:r.querySelector("#profPhotoBase64").value,services:l,workingHours:d,phone:r.querySelector("#profPhone").value,dob:`${r.querySelector("#profDobDay").value}/${r.querySelector("#profDobMonth").value}`,receivesCommission:b,showOnAgenda:f,orderOnAgenda:parseInt(r.querySelector("#profOrderOnAgenda").value)||1,notes:r.querySelector("#profNotes").value,status:p?"active":"inactive",establishmentId:g.establishmentId},y=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{h.id?(await Ma(h.id,h),ae(g.establishmentId,Xt(),"Equipe","Editou",`Editou o profissional: ${h.name}`),m("Sucesso!","Dados atualizados.","success")):(delete h.id,await bi(h),ae(g.establishmentId,Xt(),"Equipe","Criou",`Cadastrou o profissional: ${h.name}`),m("Sucesso!","Novo membro adicionado à equipe.","success")),La(),oa()}catch(S){m("Erro",S.message,"error"),i.disabled=!1,i.innerHTML=y}break}case"delete-blockage":{const r=s.dataset.id;if(await Y("Apagar Bloqueio","O profissional voltará a ficar disponível na agenda neste dia. Confirma?"))try{await cs(r),m("Bloqueio removido.","success");const i=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";vt(z.tempProf.id,i)}catch(i){m("Erro",i.message,"error")}break}case"batch-delete-blockage":{const r=JSON.parse(s.dataset.ids);if(await Y("Apagar em Lote",`Tem certeza que deseja apagar ${r.length} dias de bloqueio de uma vez?`))try{await Lo(r),m("Bloqueios removidos.","success");const i=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";vt(z.tempProf.id,i)}catch(i){m("Erro",i.message,"error")}break}}},document.body.addEventListener("click",Rt),Ft=t=>{t.target.id==="searchInput"&&(z.searchQuery=t.target.value,We())},Qa.addEventListener("input",Ft)}function ad(){Y("Excluir em Lote",`Tem certeza que deseja excluir ${z.selectedIds.size} profissionais da rede? Esta ação não pode ser desfeita.`).then(async t=>{if(t)try{await gi(Array.from(z.selectedIds)),ae(g.establishmentId,Xt(),"Equipe","Excluiu em Lote",`Excluiu ${z.selectedIds.size} profissionais`),m("Sucesso!",`${z.selectedIds.size} profissionais foram excluídos.`,"success"),z.selectedIds.clear(),cr(),oa()}catch(e){m("Erro",`Não foi possível excluir em lote: ${e.message}`,"error")}})}let k={clients:[],selectedClient:null,activeTab:"profile",establishments:[],filterEstablishmentIds:new Set,filters:{search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1,status:"all"},sortConfig:{key:"name",direction:"asc"},selectedIds:new Set,loading:!1,historyLimit:20,historySearchTerm:"",historyLoading:!1,historyData:{appointments:[],sales:[],loyaltyLog:[]},modalOpen:!1},ra=null,Ht=null;const pr=t=>t?String(t).replace(/\D/g,""):"",Ja=t=>{if(!t)return"Nunca";let e;if(typeof t=="object"&&(t.seconds||t._seconds)){const a=t.seconds||t._seconds;e=new Date(a*1e3)}else e=new Date(t);return isNaN(e.getTime())?"Data Inválida":e.toLocaleDateString("pt-BR")},Ga=t=>{if(!t)return"CL";const e=t.trim().split(" ");return e.length>=2?(e[0][0]+e[e.length-1][0]).toUpperCase():t.substring(0,2).toUpperCase()};async function sd(){ra=document.getElementById("content"),k.selectedClient=null,k.historyLimit=20,k.modalOpen=!1,k.selectedIds.clear(),k.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1,status:"all"},k.sortConfig={key:"name",direction:"asc"};try{const e=(await fe().catch(()=>({matrizes:[]}))).matrizes||[];k.establishments=[],e.forEach(a=>{k.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>k.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),k.filterEstablishmentIds.size===0&&k.filterEstablishmentIds.add(g.establishmentId)}catch(t){console.error("Erro ao buscar hierarquia",t)}od(),id(),await ws()}function od(){const t=k.establishments.map(e=>`
        <label class="inline-flex items-center gap-2 px-3 py-1.5 bg-white border ${k.filterEstablishmentIds.has(e.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-gray-200 text-gray-600"} rounded-lg cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" value="${e.id}" ${k.filterEstablishmentIds.has(e.id)?"checked":""}>
            <span class="text-xs font-bold whitespace-nowrap">${e.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${e.name}</span>
        </label>
    `).join("");ra.innerHTML=`
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
    `}function rd(){const t=document.getElementById("table-header-container");if(!t)return;const e=a=>k.sortConfig.key!==a?'<i class="bi bi-arrow-down-up ml-1 opacity-40 text-xs"></i>':k.sortConfig.direction==="asc"?'<i class="bi bi-arrow-up ml-1 text-indigo-600"></i>':'<i class="bi bi-arrow-down ml-1 text-indigo-600"></i>';t.innerHTML=`
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
    `}async function ws(){k.loading=!0;const t=document.getElementById("list-container");t&&(t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-xs">Carregando clientes...</p></div>');try{const a=Array.from(k.filterEstablishmentIds).map(i=>{let n=`/api/clients/${i}?limit=1000`;return C(n).catch(()=>[])}),o=(await Promise.all(a)).flat(),r=new Map;o.forEach(i=>r.set(i.id,i)),k.clients=Array.from(r.values()),ks(),ye()}catch(e){console.error(e),m("Erro","Falha ao carregar clientes.","error"),t&&(t.innerHTML='<div class="text-center py-10 text-red-500 text-sm">Erro ao carregar dados.</div>')}finally{k.loading=!1}}function ks(){const t=new Date().getMonth()+1,e=new Date().getFullYear();let a=0,s=0,o=0;k.clients.forEach(r=>{if(r.totalDebt&&parseFloat(r.totalDebt)>0&&s++,r.dobMonth==t&&o++,r.createdAt){const i=new Date(r.createdAt);i.getMonth()+1===t&&i.getFullYear()===e&&a++}}),document.getElementById("kpi-total").textContent=k.clients.length,document.getElementById("kpi-novos").textContent=a,document.getElementById("kpi-devendo").textContent=s,document.getElementById("kpi-niver").textContent=o}function ye(){rd();const t=document.getElementById("list-container");let e=k.clients;if(k.filters.search){const a=k.filters.search.toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(a)||s.phone&&s.phone.includes(a)||s.cpf&&s.cpf.includes(a))}if(k.filters.status==="devendo")e=e.filter(a=>a.totalDebt&&parseFloat(a.totalDebt)>0);else if(k.filters.status==="aniversariantes"){const a=new Date().getMonth()+1;e=e.filter(s=>s.dobMonth==a)}else if(k.filters.status==="novos"){const a=new Date().getMonth()+1,s=new Date().getFullYear();e=e.filter(o=>{if(!o.createdAt)return!1;const r=new Date(o.createdAt);return r.getMonth()+1===a&&r.getFullYear()===s})}if(k.filters.hasLoyalty&&(e=e.filter(a=>a.loyaltyPoints&&a.loyaltyPoints>0)),k.filters.inactiveDays){const a=parseInt(k.filters.inactiveDays),s=new Date;s.setDate(s.getDate()-a),e=e.filter(o=>{if(!o.lastVisit&&!o.createdAt)return!1;let r;if(o.lastVisit){const i=o.lastVisit.seconds||o.lastVisit._seconds;r=i?new Date(i*1e3):new Date(o.lastVisit)}else r=new Date(o.createdAt);return r<s})}if(e.sort((a,s)=>{let o,r;switch(k.sortConfig.key){case"name":return o=(a.name||"").toLowerCase(),r=(s.name||"").toLowerCase(),k.sortConfig.direction==="asc"?o.localeCompare(r):r.localeCompare(o);case"contact":return o=a.phone||"",r=s.phone||"",k.sortConfig.direction==="asc"?o.localeCompare(r):r.localeCompare(o);case"lastVisit":o=a.lastVisit?a.lastVisit.seconds?a.lastVisit.seconds:new Date(a.lastVisit).getTime()/1e3:a.createdAt?new Date(a.createdAt).getTime()/1e3:0,r=s.lastVisit?s.lastVisit.seconds?s.lastVisit.seconds:new Date(s.lastVisit).getTime()/1e3:s.createdAt?new Date(s.createdAt).getTime()/1e3:0;break;case"financial":o=parseFloat(a.totalDebt)||0,r=parseFloat(s.totalDebt)||0;break;default:o=a.name,r=s.name}return o<r?k.sortConfig.direction==="asc"?-1:1:o>r?k.sortConfig.direction==="asc"?1:-1:0}),e.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-people text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum cliente encontrado</h3>
                <p class="text-[10px] text-gray-400 max-w-xs text-center">Tente ajustar a busca ou os filtros ativos.</p>
            </div>`;return}t.innerHTML=e.map(a=>{const s=a.totalDebt&&parseFloat(a.totalDebt)>0,o=Ja(a.lastVisit),r=pr(a.phone),i=new Date().getMonth()+1,n=a.dobMonth==i,l=k.selectedIds.has(a.id);let d="";return n&&(d+='<span class="bg-indigo-50 text-indigo-600 text-[8px] font-bold px-1.5 py-0.5 rounded border border-indigo-100 uppercase tracking-wider">🎂 Niver</span> '),a.loyaltyPoints>0&&(d+=`<span class="bg-amber-50 text-amber-600 text-[8px] font-bold px-1.5 py-0.5 rounded border border-amber-100 uppercase tracking-wider"><i class="bi bi-star-fill"></i> ${a.loyaltyPoints} pts</span> `),`
        <div class="border-b border-gray-100 hover:bg-gray-50 transition-colors relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-2.5 md:p-2 mb-2 md:mb-0 bg-white md:bg-transparent rounded-xl md:rounded-none shadow-sm md:shadow-none border md:border-b ${s?"border-l-4 border-l-red-400":"border-l-4 border-l-transparent hover:border-l-indigo-300"} ${l?"bg-indigo-50/40":""} cursor-pointer" data-action="open-modal" data-id="${a.id}">
            
            <div class="flex justify-between items-start md:hidden mb-2 relative">
                <div class="absolute -top-1 -right-1 z-20">
                    <input type="checkbox" value="${a.id}" class="item-checkbox w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${l?"checked":""}>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full ${s?"bg-red-100 text-red-600 border border-red-200":"bg-gray-100 text-gray-600 border border-gray-200"} flex items-center justify-center font-bold text-xs flex-shrink-0">
                        ${Ga(a.name)}
                    </div>
                    <div class="pr-6">
                        <p class="font-bold text-xs text-gray-800 truncate max-w-[180px]">${v(a.name)}</p>
                        <p class="text-[9px] text-gray-500 font-medium">${v(a.phone||"Sem contato")}</p>
                    </div>
                </div>
                ${r?`<button data-action="whatsapp" data-phone="${r}" class="w-7 h-7 mt-5 bg-[#25D366]/10 text-[#25D366] rounded flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors border border-[#25D366]/20"><i class="bi bi-whatsapp text-[10px]"></i></button>`:""}
            </div>

            <div class="hidden md:flex md:col-span-4 items-center gap-2 pl-1">
                <input type="checkbox" value="${a.id}" class="item-checkbox w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm z-20 flex-shrink-0" ${l?"checked":""}>
                <div class="w-8 h-8 rounded-full ${s?"bg-red-100 text-red-600 border border-red-200":"bg-gray-100 text-gray-600 border border-gray-200"} flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
                    ${Ga(a.name)}
                </div>
                <div class="min-w-0">
                    <p class="font-bold text-xs text-gray-800 truncate" title="${v(a.name)}">${v(a.name)}</p>
                    <div class="flex gap-1 mt-0.5">${d}</div>
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
                ${d}
            </div>
        </div>
        `}).join("")}function id(){Ht&&ra.removeEventListener("click",Ht),Ht=r=>{const i=r.target;if(i.classList.contains("item-checkbox")){const c=i.value;i.checked?k.selectedIds.add(c):k.selectedIds.delete(c),Yt(),r.stopPropagation();return}if(i.id==="select-all-toggle"){const c=i.checked,u=document.querySelectorAll(".item-checkbox");k.selectedIds.clear(),u.forEach(p=>{p.checked=c,c&&k.selectedIds.add(p.value)}),Yt(),r.stopPropagation();return}const n=i.closest("[data-sort]");if(n){const c=n.dataset.sort;k.sortConfig.key===c?k.sortConfig.direction=k.sortConfig.direction==="asc"?"desc":"asc":(k.sortConfig.key=c,k.sortConfig.direction="asc"),ye();return}const l=i.closest("[data-action]");if(l){const c=l.dataset.action,u=l.dataset.id;if(c==="new-client"){Xa(null);return}if(c==="open-modal"){Xa(u);return}if(c==="whatsapp"){r.stopPropagation();const p=l.dataset.phone;window.open(`https://wa.me/55${p}`,"_blank");return}if(c==="export-excel"){fd();return}}const d=i.closest("[data-filter]");d&&(document.querySelectorAll("[data-filter]").forEach(c=>c.classList.remove("ring-2","ring-offset-1","ring-indigo-400","border-indigo-300")),d.classList.add("ring-2","ring-offset-1","ring-indigo-400","border-indigo-300"),k.filters.status=d.dataset.filter,ye())},ra.addEventListener("click",Ht);const t=document.getElementById("cancel-selection-btn");t&&t.addEventListener("click",()=>{k.selectedIds.clear();const r=document.getElementById("select-all-toggle");r&&(r.checked=!1),document.querySelectorAll(".item-checkbox").forEach(i=>i.checked=!1),Yt()});const e=document.getElementById("batch-delete-btn");e&&e.addEventListener("click",nd),document.querySelectorAll(".est-filter-checkbox").forEach(r=>{r.addEventListener("change",i=>{const n=i.target.closest("label");i.target.checked?(k.filterEstablishmentIds.add(i.target.value),n.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),n.classList.remove("border-gray-200","text-gray-600")):(k.filterEstablishmentIds.delete(i.target.value),n.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),n.classList.add("border-gray-200","text-gray-600")),ws()})});const a=document.getElementById("search-input");a&&a.addEventListener("input",r=>{k.filters.search=r.target.value,ye()});const s=document.getElementById("filter-inactive");s&&s.addEventListener("input",r=>{k.filters.inactiveDays=r.target.value,ye()});const o=document.getElementById("filter-loyalty");o&&o.addEventListener("change",r=>{k.filters.hasLoyalty=r.target.checked,ye()})}function Yt(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count");if(!t||!e)return;const a=k.selectedIds.size;e.textContent=a,a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex"))}async function nd(){const t=k.selectedIds.size;if(!(t===0||!await Y("Excluir Clientes",`Deseja realmente excluir permanentemente ${t} cliente(s)? Esta ação não pode ser desfeita.`)))try{const a=Array.from(k.selectedIds).map(o=>Eo(o));await Promise.all(a),m("Sucesso",`${t} cliente(s) excluído(s) com sucesso.`,"success"),k.selectedIds.clear(),Yt();const s=document.getElementById("select-all-toggle");s&&(s.checked=!1),await ws()}catch{m("Erro ao Excluir","Ocorreu um erro ao excluir alguns clientes.","error")}}function Xa(t=null){t?(k.selectedClient=k.clients.find(s=>s.id===t),k.selectedClient.isNew=!1):k.selectedClient={isNew:!0,id:"",name:"",phone:"",email:"",cpf:"",gender:"",dobDay:"",dobMonth:"",source:"",notes:"",loyaltyPoints:0,totalDebt:0},k.activeTab="profile",k.historyData={appointments:[],sales:[],loyaltyLog:[]};let e=document.getElementById("client-details-modal-overlay");e||(e=document.createElement("div"),e.id="client-details-modal-overlay",e.className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-gray-900/60 backdrop-blur-sm sm:p-4 animate-fade-in",e.innerHTML='<div class="bg-gray-50 w-full sm:w-[90vw] h-[90vh] sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-slide-up sm:animate-scale-in rounded-t-2xl" id="client-modal-content"></div>',e.onclick=s=>{s.target===e&&yt()},document.body.appendChild(e),document.body.classList.add("overflow-hidden"));const a=e.querySelector("#client-modal-content");a.innerHTML=at(k.selectedClient),st(a,k.selectedClient)}function yt(){const t=document.getElementById("client-details-modal-overlay");t&&t.remove(),document.body.classList.remove("overflow-hidden"),k.modalOpen=!1,k.selectedClient=null,ye()}function at(t){const e=t.isNew,a=`
        <div class="bg-white border-b border-gray-200 sticky top-0 z-10 w-full flex overflow-x-auto custom-scrollbar gap-2 px-4 sm:px-6 py-2.5">
            <button class="tab-btn ${k.activeTab==="profile"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"} border px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="profile">👤 Perfil e Dados</button>
            ${e?"":`
            <button class="tab-btn ${k.activeTab==="appointments"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"} border px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="appointments">📅 Agendamentos</button>
            <button class="tab-btn ${k.activeTab==="history"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"} border px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="history">💰 Finanças</button>
            <button class="tab-btn ${k.activeTab==="loyalty"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-white text-gray-600 border-gray-200 hover:bg-gray-50"} border px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="loyalty">⭐ Fidelidade</button>
            `}
        </div>
    `;let s="";return k.activeTab==="profile"?s=ld(t):k.activeTab==="appointments"?s=dd():k.activeTab==="history"?s=cd():k.activeTab==="loyalty"&&(s=ud(t)),`
        <div class="w-full bg-gray-50 min-h-full flex flex-col overflow-hidden">
            <div class="bg-indigo-600 px-4 py-4 sm:px-6 sm:py-5 text-white relative flex-shrink-0 w-full shadow-md z-20">
                <button id="btn-close-modal" class="absolute top-4 right-4 text-indigo-200 hover:text-white transition z-50">
                    <i class="bi bi-x-lg text-xl sm:text-2xl"></i>
                </button>

                <div class="flex items-center gap-4 sm:gap-5">
                    <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-indigo-600 flex items-center justify-center text-2xl font-black shadow-lg flex-shrink-0">
                        ${e?'<i class="bi bi-person-plus-fill"></i>':Ga(t.name)}
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
    `}function ld(t){return`
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
    `}function dd(t){let e=k.historyData.appointments||[];return e.sort((a,s)=>new Date(s.startTime)-new Date(a.startTime)),`
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
    `}function cd(t){let e=k.historyData.sales||[];e.sort((o,r)=>new Date(r.date)-new Date(o.date));const a=e.reduce((o,r)=>o+(Number(r.totalAmount)||0),0),s=e.length>0?a/e.length:0;return`
        <div class="space-y-4">
            <div class="grid grid-cols-2 gap-3 mb-2">
                <div class="bg-emerald-50 p-3 rounded-xl border border-emerald-100 shadow-sm flex flex-col text-center">
                    <span class="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">LTV (V. Vitalício)</span>
                    <span class="text-lg font-black text-emerald-700 mt-0.5">${$a(a)}</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col text-center">
                    <span class="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Ticket Médio</span>
                    <span class="text-lg font-black text-gray-800 mt-0.5">${$a(s)}</span>
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
                        <p class="font-black text-emerald-600 text-xs">${$a(o.totalAmount)}</p>
                        <p class="text-[8px] text-indigo-500 font-bold uppercase mt-0.5 hover:underline">Ver Comanda <i class="bi bi-chevron-right"></i></p>
                    </div>
                </div>`).join(""):'<div class="text-center py-8 bg-white rounded-xl border border-gray-200"><p class="text-[10px] text-gray-400">Nenhum histórico financeiro.</p></div>'}
            </div>
        </div>
    `}function ud(t){const e=k.historyData.loyaltyLog||[];return e.sort((a,s)=>new Date(s.date)-new Date(a.date)),`
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
    `}function st(t,e){if(t.querySelectorAll(".tab-btn").forEach(s=>{s.onclick=async()=>{const o=s.dataset.tab;if(k.activeTab===o)return;k.activeTab=o;const r=document.getElementById("client-modal-content");r&&(r.innerHTML=at(e),st(r,e)),o!=="profile"&&!k.historyLoading&&k.historyData.appointments.length===0&&await pd(e.id)}}),k.activeTab==="profile"){const s=t.querySelector("#form-edit-client");s&&(s.onsubmit=bd);const o=t.querySelector("#btn-delete-client");o&&(o.onclick=gd)}if(k.activeTab==="loyalty"){const s=t.querySelector("#btn-manual-redeem");s&&(s.onclick=()=>md(e))}t.querySelectorAll("[data-go-agenda]").forEach(s=>{s.onclick=()=>{yt(),ee("agenda-section",{targetDate:new Date(s.dataset.date),scrollToAppointmentId:s.dataset.id})}}),t.querySelectorAll("[data-go-comanda]").forEach(s=>{s.onclick=()=>{yt(),ee("comandas-section",{selectedAppointmentId:s.dataset.id,initialFilter:"finalizadas"})}});const a=t.querySelector("#btn-close-modal");a&&(a.onclick=yt)}async function pd(t){const e=k.selectedClient;if(!e||!e.phone)return;k.historyLoading=!0;const a=document.getElementById("client-modal-content");a&&(a.innerHTML=at(e),st(a,e));try{const s=new Date;s.setMonth(s.getMonth()+12);const o=new Date;o.setFullYear(o.getFullYear()-5);let r=`/api/appointments/${g.establishmentId}?startDate=${o.toISOString()}&endDate=${s.toISOString()}&clientPhone=${encodeURIComponent(pr(e.phone))}&limit=50`;const i=await C(r);k.historyData.appointments=i,k.historyData.sales=i.filter(l=>l.status==="completed").map(l=>({id:l.id,date:l.startTime,totalAmount:l.totalAmount||0,items:l.comandaItems||l.services||[]}));const n=[];i.forEach(l=>{l.status==="completed"&&l.loyaltyPointsEarned>0&&n.push({type:"earn",points:l.loyaltyPointsEarned,date:l.startTime,description:"Venda finalizada"}),l.loyaltyRedemption&&n.push({type:"redemption",points:l.loyaltyRedemption.cost||0,date:l.startTime,description:`Resgate: ${l.loyaltyRedemption.name}`})}),k.historyData.loyaltyLog=n}catch(s){console.error("Erro histórico",s)}finally{k.historyLoading=!1;const s=document.getElementById("client-modal-content");s&&k.selectedClient&&(s.innerHTML=at(k.selectedClient),st(s,k.selectedClient))}}async function bd(t){t.preventDefault();const e=new FormData(t.target),a=Object.fromEntries(e.entries());a.establishmentId=g.establishmentId,a.dobDay&&(a.dobDay=parseInt(a.dobDay)),a.dobMonth&&(a.dobMonth=parseInt(a.dobMonth));try{if(k.selectedClient.isNew){const s=await $o(a);k.clients.unshift(s),m("Sucesso","Cliente cadastrado com sucesso!","success"),k.selectedClient=s,Xa(s.id)}else{await So(k.selectedClient.id,a),Object.assign(k.selectedClient,a);const s=k.clients.findIndex(r=>r.id===k.selectedClient.id);s!==-1&&(k.clients[s]=k.selectedClient),m("Sucesso","Dados salvos com sucesso!","success");const o=document.getElementById("client-modal-content");o&&(o.innerHTML=at(k.selectedClient),st(o,k.selectedClient))}ks(),ye()}catch(s){m("Erro",s.message,"error")}}async function gd(){if(await Y("Excluir Cliente","Tem certeza? O histórico será apagado e não pode ser desfeito."))try{await Eo(k.selectedClient.id),k.clients=k.clients.filter(t=>t.id!==k.selectedClient.id),k.selectedClient=null,m("Sucesso","Cliente removido com sucesso.","success"),yt(),ks(),ye()}catch(t){m("Erro",t.message,"error")}}function md(t){const e=t.loyaltyPoints||0,a=`
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
    `,{modalElement:s,close:o}=Ce({title:"Ajuste de Pontos",contentHTML:a,maxWidth:"w-[90%] max-w-xs"});s.querySelector("form").onsubmit=async r=>{r.preventDefault();const i=document.getElementById("redeem-action").value,n=parseInt(document.getElementById("redeem-points").value,10),l=document.getElementById("redeem-reason").value;if(!n||n<=0)return m("Erro","Qtd inválida.","error");if(i==="debit"&&n>e)return m("Erro","Saldo insuficiente.","error");try{let d=e;i==="debit"?(await Oi(g.establishmentId,t.phone,n,l),d-=n):(d+=n,await So(t.id,{loyaltyPoints:d})),k.selectedClient.loyaltyPoints=d,k.historyData.loyaltyLog.unshift({type:i==="debit"?"redemption":"earn",points:n,date:new Date().toISOString(),description:l+" (Manual)"}),m("Sucesso","Saldo atualizado.","success"),o();const c=document.getElementById("client-modal-content");c&&k.selectedClient&&(c.innerHTML=at(k.selectedClient),st(c,k.selectedClient)),ye()}catch(d){m("Erro",d.message,"error")}}}function fd(){if(typeof XLSX>"u")return m("Erro","Biblioteca de exportação não carregada.","error");if(k.clients.length===0)return m("Aviso","Nenhum cliente para exportar.","info");const t=k.clients.map(e=>({Nome:e.name,Telefone:e.phone||"","E-mail":e.email||"",CPF:e.cpf||"",Gênero:e.gender==="M"?"Masculino":e.gender==="F"?"Feminino":e.gender==="O"?"Outro":"",Aniversário:e.dobDay&&e.dobMonth?`${e.dobDay}/${e.dobMonth}`:"",Origem:e.source||"",Cadastro:Ja(e.createdAt),"Última Visita":Ja(e.lastVisit),"Pontos Fidelidade":e.loyaltyPoints||0,"Débito/Fiado (R$)":e.totalDebt||0,Anotações:e.notes||""}));try{const e=XLSX.utils.json_to_sheet(t),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,e,"Clientes"),XLSX.writeFile(a,`KAIROS_Clientes_${new Date().toISOString().split("T")[0]}.xlsx`)}catch{m("Erro","Falha ao gerar o ficheiro.","error")}}const Ne=document.getElementById("content"),Ca={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},oe=[{id:"clean-modern",name:"Clean Moderno",bg:"#f8fafc",text:"#4b5563",titleColor:"#0f172a",primary:"#2563eb",font:"Inter",btn:"rounded",cardBg:"#ffffff",cardBorder:"#e2e8f0"},{id:"dark-premium",name:"Dark Premium",bg:"#0f172a",text:"#9ca3af",titleColor:"#f8fafc",primary:"#f59e0b",font:"'Playfair Display'",btn:"square",cardBg:"#1e293b",cardBorder:"#334155"},{id:"spa-zen",name:"Spa & Wellness",bg:"#f0fdf4",text:"#166534",titleColor:"#064e3b",primary:"#10b981",font:"Poppins",btn:"pill",cardBg:"#ffffff",cardBorder:"#d1fae5"},{id:"neo-brutalism",name:"Neobrutalismo",bg:"#ffffff",text:"#000000",titleColor:"#000000",primary:"#ef4444",font:"Inter",btn:"square",cardBg:"#ffffff",cardBorder:"#000000"},{id:"tech-cyan",name:"Tech Night",bg:"#020617",text:"#94a3b8",titleColor:"#f1f5f9",primary:"#06b6d4",font:"Roboto",btn:"rounded",cardBg:"#0f172a",cardBorder:"#1e293b"},{id:"sunset-glam",name:"Sunset Glam",bg:"#fff7ed",text:"#831843",titleColor:"#4c0519",primary:"#f43f5e",font:"Poppins",btn:"pill",cardBg:"#ffffff",cardBorder:"#fce7f3"},{id:"luxury-mono",name:"Luxo Minimal",bg:"#fafafa",text:"#525252",titleColor:"#171717",primary:"#404040",font:"'Playfair Display'",btn:"square",cardBg:"#ffffff",cardBorder:"#e5e5e5"},{id:"deep-ocean",name:"Oceano Profundo",bg:"#172554",text:"#bfdbfe",titleColor:"#eff6ff",primary:"#3b82f6",font:"Montserrat",btn:"pill",cardBg:"#1e3a8a",cardBorder:"#1e40af"},{id:"rustic-vintage",name:"Rústico Vintage",bg:"#1c1917",text:"#a8a29e",titleColor:"#fafaf9",primary:"#ea580c",font:"Montserrat",btn:"rounded",cardBg:"#292524",cardBorder:"#44403c"},{id:"vibrant-purple",name:"Estúdio Criativo",bg:"#fdf4ff",text:"#701a75",titleColor:"#4a044e",primary:"#c026d3",font:"Inter",btn:"rounded",cardBg:"#ffffff",cardBorder:"#fae8ff"}];let Z=null,te=null;function br(){return[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais da Unidade"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"whatsapp-bot",icon:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",label:"Atendente Virtual (WhatsApp)"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}]}function zs(t,e,a){return new Promise((s,o)=>{const r=new FileReader;r.readAsDataURL(t),r.onload=i=>{const n=new Image;n.src=i.target.result,n.onload=()=>{const l=document.createElement("canvas");let d=n.width,c=n.height;d>e&&(c*=e/d,d=e),l.width=d,l.height=c,l.getContext("2d").drawImage(n,0,0,d,c);const p=t.type==="image/png"&&e<500?"image/png":"image/jpeg";s(l.toDataURL(p,a))},n.onerror=l=>o(l)},r.onerror=i=>o(i)})}function ze(t,e=null){let a='<option value="">-- Selecione (Opcional) --</option>';const s=i=>{const n=new Map,l=[];return i&&(i.forEach(d=>n.set(d.id,{...d,children:[]})),n.forEach(d=>{d.parentId&&n.has(d.parentId)?n.get(d.parentId).children.push(d):l.push(d)})),l},o=(i,n="")=>{const l=i.id===e?"selected":"";a+=`<option value="${i.id}" ${l}>${n}${v(i.name)}</option>`,i.children.forEach(d=>o(d,n+"— "))};return s(t).forEach(i=>o(i)),a}async function ut(t,e){const a=e.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const s=[],{ownerName:o,...r}=t;if(o&&o!==g.userName){const n=ge.currentUser;n&&s.push(Ar(n,{displayName:o}).then(()=>{g.userName=o}))}const i={...Z,...r};s.push(ls(te,i)),await Promise.all(s),Z=i,m("Sucesso","Definições salvas com sucesso!","success"),r.themeColor&&te===g.establishmentId&&setTimeout(()=>window.location.reload(),1500)}catch(s){m("Erro",`Não foi possível salvar: ${s.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function xd(t,e){const a=v(t.name||""),s=v(t.phone||""),o=v(t.cnpj||""),r=v(t.email||""),i=v(t.address||""),n=v(t.website||""),l=v(g.userName||"");e.innerHTML=`
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
    `,e.querySelector("#personal-data-form").addEventListener("submit",d=>{d.preventDefault();const c={ownerName:e.querySelector("#ownerName").value,name:e.querySelector("#establishmentName").value,phone:e.querySelector("#establishmentPhone").value,cnpj:e.querySelector("#establishmentCnpjCpf").value,email:e.querySelector("#establishmentEmail").value,address:e.querySelector("#establishmentAddress").value,website:e.querySelector("#establishmentWebsite").value};ut(c,d)})}function hd(t,e){e.innerHTML=`
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
    `,e.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const s=e.querySelector("#newPassword").value,o=e.querySelector("#confirmPassword").value;if(s!==o){m("Erro","As senhas não coincidem.","error");return}const r=e.querySelector('button[form="change-password-form"]');r.disabled=!0,r.textContent="A Salvar...";try{const i=ge.currentUser;if(i)await Br(i,s),m("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum utilizador logado encontrado.")}catch(i){m("Erro",`Não foi possível alterar a senha: ${i.message}`,"error")}finally{r.disabled=!1,r.textContent="Salvar Nova Senha"}})}function vd(t,e){e.innerHTML=`
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
    `,e.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const s=e.querySelector("#newEmail").value,o=e.querySelector("#currentPassword").value,r=e.querySelector('button[form="change-email-form"]');r.disabled=!0,r.textContent="A verificar...";try{const i=ge.currentUser,n=Dr.credential(i.email,o);await Tr(i,n),await Pr(i,s),await pi(te,s),m("Sucesso","Link de verificação enviado! Verifique o seu novo e-mail.","success"),a.target.reset()}catch(i){m("Erro",i.message,"error")}finally{r.disabled=!1,r.textContent="Salvar Novo E-mail"}})}function yd(t,e){const a=v(t.welcomeMessage||"Agende o seu horário de forma rápida e fácil."),s=t.socialLinks||{},o=v(s.instagram||""),r=v(s.facebook||""),i=v(s.whatsapp||"");let n=t.primaryColor||t.themeColor||oe[0].primary,l=t.backgroundColor||oe[0].bg,d=t.textColor||oe[0].text,c=t.titleColor||oe[0].titleColor,u=t.buttonStyle||oe[0].btn,p=t.typography||oe[0].font,b=t.templateId?oe.findIndex(J=>J.id===t.templateId):0;b===-1&&(b=0);const f=J=>J==="pill"?"9999px":J==="square"?"0.25rem":"0.75rem";e.innerHTML=`
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
                                        <input type="color" id="previewBgColorInput" value="${l}" class="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent">
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
                                background-color: var(--preview-bg, ${l}); 
                                color: var(--preview-text, ${d}); 
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
    `;const h=e.querySelector("#mockup-screen-wrapper"),y=e.querySelector("#mockup-screen"),S=e.querySelector("#previewPrimaryColorInput"),P=e.querySelector("#previewBgColorInput"),N=e.querySelector("#previewTextColorInput"),$=e.querySelector("#previewTitleColorInput"),E=e.querySelector("#typographyInput"),D=e.querySelector("#establishmentWelcomeMessage"),B=e.querySelector("#mockup-welcome"),j=e.querySelector("#socialInstagram"),I=e.querySelector("#socialWhatsapp"),L=e.querySelector("#socialFacebook"),H=e.querySelector("#prevTemplate"),V=e.querySelector("#nextTemplate"),U=e.querySelector("#templateNameDisplay"),T=e.querySelector("#selectedTemplateId"),W=J=>{const G=oe[J];h.style.opacity="0.3",h.style.transform="scale(0.96)",setTimeout(()=>{S.value=G.primary,P.value=G.bg,N.value=G.text,$.value=G.titleColor||G.text,E.value=G.font,e.querySelectorAll('input[name="buttonStyle"]').forEach(be=>{be.checked=be.value===G.btn}),T.value=G.id,U.textContent=G.name,y.style.setProperty("--preview-primary",G.primary),y.style.setProperty("--preview-bg",G.bg),y.style.setProperty("--preview-text",G.text),y.style.setProperty("--preview-title-color",G.titleColor||G.text),y.style.setProperty("--preview-font",G.font),y.style.setProperty("--preview-btn-radius",f(G.btn)),y.style.setProperty("--preview-card-bg",G.cardBg),y.style.setProperty("--preview-card-border",G.cardBorder),h.style.opacity="1",h.style.transform="scale(1)"},300)};H.addEventListener("click",()=>{b=(b-1+oe.length)%oe.length,W(b)}),V.addEventListener("click",()=>{b=(b+1)%oe.length,W(b)}),S.addEventListener("input",J=>y.style.setProperty("--preview-primary",J.target.value)),P.addEventListener("input",J=>y.style.setProperty("--preview-bg",J.target.value)),N.addEventListener("input",J=>y.style.setProperty("--preview-text",J.target.value)),$.addEventListener("input",J=>y.style.setProperty("--preview-title-color",J.target.value)),E.addEventListener("change",J=>y.style.setProperty("--preview-font",J.target.value)),e.querySelectorAll('input[name="buttonStyle"]').forEach(J=>{J.addEventListener("change",G=>{G.target.checked&&y.style.setProperty("--preview-btn-radius",f(G.target.value))})}),D.addEventListener("input",J=>B.textContent=J.target.value||"Mensagem...");const ne=()=>{e.querySelector("#mockup-insta-icon").classList.toggle("hidden",!j.value.trim()),e.querySelector("#mockup-whats-icon").classList.toggle("hidden",!I.value.trim()),e.querySelector("#mockup-face-icon").classList.toggle("hidden",!L.value.trim())};[j,I,L].forEach(J=>J.addEventListener("input",ne));const ue=e.querySelector("#establishmentLogoInput"),wa=e.querySelector("#establishmentBgInput"),Tt=e.querySelector("#establishmentLogoBase64"),qe=e.querySelector("#establishmentBackgroundImageBase64");e.querySelector("#triggerLogoUpload").addEventListener("click",J=>{J.target.id!=="establishmentLogoInput"&&ue.click()}),ue.onchange=async J=>{const G=J.target.files[0];if(G){const be=await zs(G,300,.9);e.querySelector("#establishmentLogoPreview").src=be,e.querySelector("#mockup-logo").src=be,Tt.value=be}},e.querySelector("#triggerBannerUpload").addEventListener("click",J=>{J.target.id!=="establishmentBgInput"&&wa.click()}),wa.onchange=async J=>{const G=J.target.files[0];if(G){const be=await zs(G,1280,.8);e.querySelector("#establishmentBgPreview").src=be,e.querySelector("#establishmentBgPreview").classList.remove("hidden"),e.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),qe.value=be,e.querySelector("#mockup-banner").src=be,e.querySelector("#mockup-banner").classList.remove("hidden"),e.querySelector("#mockup-banner-placeholder").classList.add("hidden")}},e.querySelector("#branding-form").addEventListener("submit",J=>{J.preventDefault();let G="rounded";e.querySelectorAll('input[name="buttonStyle"]').forEach(Es=>{Es.checked&&(G=Es.value)});const be={logo:Tt.value,backgroundImage:qe.value,welcomeMessage:D.value,templateId:T.value,primaryColor:S.value,backgroundColor:P.value,textColor:N.value,titleColor:$.value,typography:E.value,buttonStyle:G,socialLinks:{instagram:j.value.trim(),whatsapp:I.value.trim(),facebook:L.value.trim()}};ut(be,J)})}function wd(t,e){const a=t.urlId||te;let s=window.location.origin;(s.includes("localhost")||s.includes("capacitor://")||s.includes("127.0.0.1"))&&(s="https://www.kairosagenda.com.br");const o=v(`${s}/agendar?id=${a}`),r=t.publicBookingEnabled||!1,i=r?"Agendamento Online ATIVO":"Agendamento Online INATIVO",n=r?"text-green-600":"text-red-600";e.innerHTML=`
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
    `,e.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const l=e.querySelector("#publicBookingLink");l.select(),document.execCommand("copy"),l.blur(),m("Sucesso","Link copiado!","success")}),e.querySelector("#publicBookingToggle").addEventListener("change",async l=>{const d=l.target.checked,c=e.querySelector("#publicBookingStatusText");c.textContent=d?"Agendamento Online ATIVO":"Agendamento Online INATIVO",c.className=d?"text-sm font-semibold text-green-600":"text-sm font-semibold text-red-600";try{l.target.disabled=!0,await ui(te,d),Z.publicBookingEnabled=d,m("Sucesso",`Agendamento online ${d?"ativado":"desativado"}!`,"success")}catch(u){m("Erro",u.message,"error"),l.target.checked=!d}finally{l.target.disabled=!1}}),Ld(t.slotInterval||30,e),e.querySelector("#booking-form").addEventListener("submit",l=>{l.preventDefault();const d={slotInterval:parseInt(e.querySelector("#establishmentSlotInterval").value,10)};ut(d,l)})}function kd(t,e){e.innerHTML=`
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
    `;const a=e.querySelector("#establishmentTimezone");t.timezone&&(a.value=t.timezone);const s=e.querySelector("#establishmentWorkingHoursContainer"),o=t.workingHours||{};Object.keys(Ca).forEach(r=>{const i=o[r]||{},n=Ca[r],l=i.active!==!1,d=document.createElement("div");d.className=`day-schedule-card p-4 rounded-lg border ${l?"bg-gray-50 border-gray-200":"bg-gray-100 border-gray-100 disabled opacity-60"}`,d.innerHTML=`
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
            </div>`,s.appendChild(d)}),s.addEventListener("change",r=>{const i=r.target.closest('.day-schedule-card input[type="checkbox"]');if(i){const n=i.closest(".day-schedule-card");n.classList.toggle("disabled",!i.checked),n.classList.toggle("opacity-60",!i.checked),n.classList.toggle("bg-gray-50",i.checked),n.classList.toggle("bg-gray-100",!i.checked)}}),e.querySelector("#working-hours-form").addEventListener("submit",r=>{r.preventDefault();const i={};Object.keys(Ca).forEach(l=>{i[l]={active:e.querySelector(`#est-${l}-active`).checked,start:e.querySelector(`#est-${l}-start`).value,end:e.querySelector(`#est-${l}-end`).value,breakStart:e.querySelector(`#est-${l}-breakStart`).value,breakEnd:e.querySelector(`#est-${l}-breakEnd`).value}});const n=e.querySelector("#establishmentTimezone").value;ut({workingHours:i,timezone:n},r)})}function gr(t,e){const a=!!t.whatsappInstance;e.innerHTML=`
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
    `;let s=null;const o=e.querySelector("#btnGenerateQr"),r=e.querySelector("#btnCancelQr");o&&o.addEventListener("click",async()=>{o.disabled=!0,o.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gerando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const d=await(await fetch(`${n}/connect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:te})})).json();if(d.qrcode){e.querySelector("#whatsappStatusArea").classList.add("hidden"),e.querySelector("#qrCodeDisplayArea").classList.remove("hidden");const c=d.qrcode.includes("data:image")?d.qrcode:`data:image/png;base64,${d.qrcode}`;e.querySelector("#qrCodeImage").src=c,s=setInterval(async()=>{try{const p=await(await fetch(`${n}/status/${te}`)).json();p.connected&&(clearInterval(s),Z.whatsappInstance=p.instanceName,e.querySelector("#qrCodeDisplayArea").classList.add("hidden"),e.querySelector("#connectedStatusArea").classList.remove("hidden"),m("Sucesso","WhatsApp conectado com sucesso!","success"))}catch(u){console.error("Erro ao verificar status do WhatsApp",u)}},5e3)}else m("Erro na API",d.error||"Erro desconhecido","error")}catch(l){console.error(l),m("Erro de Conexão","Não foi possível aceder ao servidor Kairós.","error")}finally{o.disabled=!1,o.innerHTML='<i class="bi bi-phone-vibrate"></i> Gerar QR Code'}}),r&&r.addEventListener("click",()=>{s&&clearInterval(s),e.querySelector("#qrCodeDisplayArea").classList.add("hidden"),e.querySelector("#whatsappStatusArea").classList.remove("hidden")});const i=e.querySelector("#btnDisconnectWhatsapp");i&&i.addEventListener("click",async()=>{if(!confirm("Tem certeza que deseja DESCONECTAR? O bot parará de responder imediatamente."))return;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Desconectando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const d=await(await fetch(`${n}/disconnect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:te})})).json();d.success?(m("Sucesso","WhatsApp desconectado!","success"),Z.whatsappInstance=null,gr(Z,e)):alert("Erro ao desconectar: "+d.error)}catch(l){console.error(l),m("Erro","Falha ao comunicar com o servidor.","error")}finally{i&&(i.disabled=!1,i.innerHTML='<i class="bi bi-power"></i> Desconectar')}})}async function $d(t,e){const a=t.loyaltyProgram||{},s=a.pointsPerVisit||1;let o=[],r=[],i=[];try{[o,r,i]=await Promise.all([dt(te),ct(te),gs(te)])}catch(d){console.error("Erro ao carregar dados para fidelidade:",d)}e.innerHTML=`
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
    `;const n=e.querySelector("#loyaltyTiersContainer"),l=(d={})=>{const c=document.createElement("div");c.className="loyalty-tier-row bg-white p-4 border border-gray-200 rounded-lg shadow-sm relative grid grid-cols-1 md:grid-cols-4 gap-4 items-end";const u=d.type||"money",p=d.itemId||"",b=d.reward||"",f=d.discount||"",h=d.points||d.costPoints||"";c.innerHTML=`
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
        `;const y=c.querySelector(".type-select"),S=c.querySelector(".item-select"),P=c.querySelector(".desc-input"),N=c.querySelector(".discount-input"),$=E=>{S.innerHTML='<option value="">Selecione...</option>';let D=[];E==="service"?D=o:E==="product"?D=r:E==="package"&&(D=i),D.forEach(B=>{const j=B.id===p,I=B.name||B.title||"Sem nome",L=B.price||B.salePrice||0;S.innerHTML+=`<option value="${B.id}" data-price="${L}" ${j?"selected":""}>${v(I)}</option>`})};return u!=="money"&&$(u),y.addEventListener("change",E=>{const D=E.target.value;D==="money"?(S.classList.add("hidden"),P.classList.remove("hidden"),P.value="",N.value=""):(S.classList.remove("hidden"),P.classList.add("hidden"),$(D),N.value="")}),S.addEventListener("change",E=>{const D=E.target.selectedOptions[0];if(D&&D.value){P.value=D.text;const B=D.dataset.price;B&&(N.value=parseFloat(B).toFixed(2))}}),c};a.tiers&&a.tiers.length>0?a.tiers.forEach(d=>n.appendChild(l(d))):n.appendChild(l()),e.querySelector("#add-loyalty-tier").addEventListener("click",()=>{n.appendChild(l())}),n.addEventListener("click",d=>{const c=d.target.closest(".remove-loyalty-tier");c&&c.closest(".loyalty-tier-row").remove()}),e.querySelector("#loyalty-form").addEventListener("submit",d=>{d.preventDefault();const c=Array.from(e.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(p=>{const b=p.querySelector(".type-select").value,f=b==="money"?null:p.querySelector(".item-select").value;let h=b==="money"?p.querySelector(".desc-input").value:p.querySelector(".item-select").options[p.querySelector(".item-select").selectedIndex]?.text;return{points:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,costPoints:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,type:b,itemId:f,reward:h,name:h,discount:parseFloat(p.querySelector('input[data-field="discount"]').value)||0}}),u={loyaltyProgram:{enabled:e.querySelector("#loyaltyEnabled").checked,type:"visit",pointsPerVisit:parseInt(e.querySelector("#loyaltyPointsPerVisit").value,10)||1,pointsPerCurrency:0,tiers:c.filter(p=>p.points>0&&p.reward)}};ut(u,d)})}async function Sd(t,e){e.innerHTML=`
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
    `;try{const[a,s]=await Promise.all([fa(te),ms(te)]),o=t.financialIntegration||{},r=t.commissionConfig||{},i=t.purchaseConfig||{};e.querySelector("#financialNatureId").innerHTML=ze(a,o.defaultNaturezaId),e.querySelector("#financialCostCenterId").innerHTML=ze(s,o.defaultCentroDeCustoId),e.querySelector("#purchaseNatureId").innerHTML=ze(a,i.defaultNatureId),e.querySelector("#purchaseCostCenterId").innerHTML=ze(s,i.defaultCostCenterId),e.querySelector("#commissionNatureId").innerHTML=ze(a,r.defaultNatureId),e.querySelector("#commissionCostCenterId").innerHTML=ze(s,r.defaultCostCenterId)}catch{m("Erro","Não foi possível carregar o plano de contas da unidade.","error")}e.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const s={financialIntegration:{defaultNaturezaId:e.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:e.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:e.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:e.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:e.querySelector("#commissionNatureId").value||null,defaultCostCenterId:e.querySelector("#commissionCostCenterId").value||null}};ut(s,a)})}function Ed(t,e){const a=`https://wa.me/5516997859430?text=Olá, preciso de ajuda com o sistema Kairos (Minha Unidade: ${t.name}).`;e.innerHTML=`
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
    `}function Ld(t,e){const a=e.querySelector("#slotIntervalContainer"),s=e.querySelector("#establishmentSlotInterval");if(!a||!s)return;const o=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=o.map(r=>{const i=r.value===t;return`<button type="button" data-value="${r.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors shadow-sm
                           ${i?"bg-indigo-600 text-white":"bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}">
                       ${r.label}
                   </button>`}).join(""),s.value=t,a.querySelectorAll(".interval-btn").forEach(r=>{r.addEventListener("click",()=>{s.value=r.dataset.value,a.querySelectorAll(".interval-btn").forEach(i=>{i.classList.remove("bg-indigo-600","text-white"),i.classList.add("bg-white","border","border-gray-300","text-gray-700")}),r.classList.add("bg-indigo-600","text-white"),r.classList.remove("bg-white","border","border-gray-300","text-gray-700")})})}async function Cd(t){const a=br().find(o=>o.id===t);if(!a)return;Ne.innerHTML=`
        <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-gray-200 border-opacity-50">
            <div class="flex items-center gap-3">
                <button data-action="back-to-menu" class="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 shadow-sm flex items-center gap-2 text-sm font-semibold">
                    <i class="bi bi-arrow-left"></i> Voltar
                </button>
                <h2 class="text-2xl font-bold text-gray-800">${a.label}</h2>
            </div>
            <div class="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                ${v(Z?.name||"")}
            </div>
        </div>
        
        <div id="settings-content-detail" class="pb-20 max-w-6xl mx-auto w-full">
            <div class="flex justify-center items-center py-10"><div class="spinner-border text-indigo-600" role="status"></div></div>
        </div>
    `,Ne.querySelector('button[data-action="back-to-menu"]').addEventListener("click",o=>{o.preventDefault(),mr({id:te})});const s=document.getElementById("settings-content-detail");switch(t){case"personal-data":xd(Z,s);break;case"change-password":hd(Z,s);break;case"change-email":vd(Z,s);break;case"branding":yd(Z,s);break;case"booking":wd(Z,s);break;case"working-hours":kd(Z,s);break;case"whatsapp-bot":gr(Z,s);break;case"loyalty":await $d(Z,s);break;case"financial":await Sd(Z,s);break;case"support":Ed(Z,s);break;case"cancellation":Id(Z,s);break;default:s.innerHTML='<div class="p-4 text-center">Módulo em construção.</div>'}}async function mr(t={}){Ne.innerHTML=`
        <div class="flex flex-col justify-center items-center h-64">
            <div class="spinner-border text-indigo-600 border-4 w-12 h-12 mb-4" role="status"></div>
            <p class="text-gray-500 font-medium">A carregar configurações da unidade...</p>
        </div>
    `;try{te=t.id||g.establishmentId,Z=await Be(te);const e=t.id?`<button onclick="window.navigateTo('establishments-section')" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                   <i class="bi bi-diagram-3"></i> Voltar à Rede
               </button>`:"",a=Z.isMatriz||!Z.parentId?'<span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded ml-3">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded ml-3">📍 UNIDADE</span>',s=br();Ne.innerHTML=`
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
                        <h3 class="text-2xl font-bold mb-1">${v(Z.name)} ${a}</h3>
                        <p class="text-indigo-200 text-sm flex items-center gap-2"><i class="bi bi-geo-alt"></i> ${v(Z.address||"Morada não definida")}</p>
                    </div>
                    <div class="relative z-10 hidden sm:block">
                        <div class="w-16 h-16 bg-white rounded-xl shadow-md p-1 flex items-center justify-center">
                            ${Z.logo?`<img src="${Z.logo}" class="w-full h-full object-contain rounded-lg">`:`<span class="text-2xl text-indigo-600 font-bold">${Z.name.charAt(0).toUpperCase()}</span>`}
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
                        ${Dd(Z.modules||{})}
                    </div>
                </div>
            </div>
        `,Ne.querySelectorAll("div[data-section]").forEach(o=>{o.addEventListener("click",r=>{Cd(o.dataset.section)})}),Ne.querySelectorAll(".module-toggle").forEach(o=>{o.addEventListener("change",async()=>{const r=o.dataset.module;try{const n={...(await Be(te)).modules,[r]:o.checked};await ls(te,{modules:n}),m("Módulos","Módulos atualizados com sucesso.","success")}catch(i){o.checked=!o.checked,m("Erro",i.message,"error")}})})}catch(e){Ne.innerHTML=`
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
    `).join("")}const wt=document.getElementById("content");async function Ye(t){const e=document.getElementById("blockagesList");if(e){e.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,s=document.getElementById("filterEndDate")?.value,o=await ba(g.establishmentId,a||new Date().toISOString().split("T")[0],s||new Date().toISOString().split("T")[0],t),r=document.getElementById("filterReason")?.value.toLowerCase(),i=r?o.filter(l=>l.reason&&l.reason.toLowerCase().includes(r)):o,n=i.reduce((l,d)=>{const c=d.reason||"Sem motivo";return l[c]||(l[c]=[]),l[c].push(d),l},{});if(e.innerHTML="",i.length===0){e.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(n).forEach(([l,d])=>{const c=document.createElement("div");c.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let p=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${v(l)} (${d.length})</h4>`;if(d.length>1){const b=JSON.stringify(d.map(f=>f.id));p+=`<button data-action="batch-delete-blockage" data-ids='${b}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}p+="</div>",c.innerHTML=p,d.forEach(b=>{const f=new Date(b.startTime),h=new Date(b.endTime),y=f.toLocaleDateString("pt-BR"),S=h.toLocaleDateString("pt-BR"),N=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${y===S?`${y} | ${f.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${h.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${y} às ${f.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${S} às ${h.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${b.id}">Apagar</button>
                    </div>`;c.innerHTML+=N}),e.appendChild(c)})}catch(a){e.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function Td(t){t.preventDefault();const e=t.target,a=e.querySelector("#blockageProfId").value,s=e.querySelector("#blockageDate").value,o=e.querySelector("#blockageEndDate").value||s,r=e.querySelector("#blockageStartTime").value,i=e.querySelector("#blockageEndTime").value,n={establishmentId:g.establishmentId,professionalId:a,startTime:new Date(`${s}T${r}:00`).toISOString(),endTime:new Date(`${o}T${i}:00`).toISOString(),reason:e.querySelector("#blockageReason").value};try{await ga(n),e.reset(),m("Sucesso","Bloqueio adicionado com sucesso!","success"),Ye(a)}catch(l){m("Erro",`Não foi possível criar o bloqueio: ${l.message}`,"error")}}async function Pd(t){t.preventDefault();const e=t.target,a=Array.from(e.querySelectorAll('input[name="batch-professionals"]:checked')).map(c=>c.value);if(a.length===0)return m("Atenção","Selecione pelo menos um profissional.","error");const s=e.querySelector("#batchBlockageDate").value,o=e.querySelector("#batchBlockageEndDate").value||s,r=e.querySelector("#batchBlockageStartTime").value,i=e.querySelector("#batchBlockageEndTime").value,n=e.querySelector("#batchBlockageReason").value,l=e.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="Aguarde...";const d=a.map(c=>{const u={establishmentId:g.establishmentId,professionalId:c,startTime:new Date(`${s}T${r}:00`).toISOString(),endTime:new Date(`${o}T${i}:00`).toISOString(),reason:n};return ga(u)});try{await Promise.all(d),m("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),e.reset(),e.querySelectorAll('input[name="batch-professionals"]:checked').forEach(u=>u.checked=!1);const c=document.getElementById("blockageProfId").value;c&&Ye(c)}catch(c){m("Erro",`Ocorreu um erro: ${c.message}`,"error")}finally{l.disabled=!1,l.textContent="Adicionar Bloqueio em Lote"}}function Bd(t){wt.addEventListener("submit",e=>{e.target.id==="blockageForm"&&Td(e),e.target.id==="batchBlockageForm"&&Pd(e)}),wt.addEventListener("input",e=>{e.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&Ye(t)}),wt.addEventListener("click",async e=>{const a=e.target.closest("button[data-action]");if(!a)return;const s=a.dataset.action;if(s==="back-to-professionals")ee("profissionais-section");else if(s==="delete-blockage"){if(await Y("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await cs(a.dataset.id),m("Sucesso","Bloqueio removido.","success"),Ye(t)}catch(r){m("Erro",`Não foi possível remover o bloqueio: ${r.message}`,"error")}}else if(s==="batch-delete-blockage"){const o=JSON.parse(a.dataset.ids);if(await Y("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${o.length} bloqueios de uma vez?`))try{await Lo(o),m("Sucesso",`${o.length} bloqueios removidos.`,"success"),Ye(t)}catch(i){m("Erro",`Não foi possível apagar os bloqueios: ${i.message}`,"error")}}})}async function Ad(t){const{professionalId:e,professionalName:a}=t;if(!e||!a){wt.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const s=v(a);wt.innerHTML=`
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
        </section>`,Bd(e),await Ye(e);const o=document.getElementById("batchProfSelectionContainer");try{const r=await $e(g.establishmentId);o.innerHTML=r.map(i=>`
            <div class="flex items-center">
                <input id="prof-batch-${i.id}" value="${i.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${i.id}" class="ml-2 text-sm text-gray-700">${v(i.name)}</label>
            </div>`).join("")}catch{o.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Md=t=>C(`/api/users/${t}`),qd=t=>C("/api/users",{method:"POST",body:JSON.stringify(t)}),jd=(t,e)=>C(`/api/users/${t}`,{method:"PUT",body:JSON.stringify(e)}),Nd=t=>C(`/api/users/${t}`,{method:"DELETE"}),Rd=(t,e)=>C(`/api/users/${t}/password`,{method:"PUT",body:JSON.stringify({password:e})}),Fd=(t,e)=>C(`/api/users/${t}/status`,{method:"PATCH",body:JSON.stringify({status:e})}),pt=document.getElementById("content"),Hd={"Operação & Atendimento":{"dashboard-section":"Dashboard","agenda-section":"Agenda","comandas-section":"Comandas","ausencias-section":"Ausências e Bloqueios"},"Financeiro & Vendas":{"financial-section":"Financeiro (ERP)","sales-report-section":"Relatório de Vendas","commissions-section":"Comissões","packages-section":"Planos e Pacotes"},"Cadastros Base":{"clientes-section":"Clientes","profissionais-section":"Profissionais","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores"},Administração:{"relatorios-section":"Relatórios Gerais","estabelecimento-section":"Configurações da Empresa","users-section":"Usuários e Acessos"}},Od={view:"Visualizar",create:"Criar",edit:"Editar"},_s={owner:{label:"Proprietário",color:"bg-rose-100 text-rose-700 border-rose-200"},group_admin:{label:"Admin da Rede",color:"bg-purple-100 text-purple-700 border-purple-200"},company_admin:{label:"Gestor Matriz",color:"bg-blue-100 text-blue-700 border-blue-200"},branch_manager:{label:"Gestor Filial",color:"bg-orange-100 text-orange-700 border-orange-200"},professional:{label:"Profissional",color:"bg-slate-100 text-slate-600 border-slate-200"}};let Ot=null,zt=null,Ze=null;function fr(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[g.establishmentId]}function zd(t){const e=document.getElementById("usersListContainer");if(!e)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(t.length===0){const s=a?"Nenhum usuário encontrado na base.":"Nenhum usuário ativo neste contexto.";e.innerHTML=`
            <div class="col-span-full py-16 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3"><i class="bi bi-people text-3xl text-slate-300"></i></div>
                <h3 class="text-sm font-bold text-slate-700 mb-1">${s}</h3>
                <p class="text-[10px] text-slate-500 max-w-xs">Tente selecionar mais unidades no topo da tela ou exibir inativos.</p>
            </div>`;return}t.sort((s,o)=>s.role==="owner"&&o.role!=="owner"?-1:s.role!=="owner"&&o.role==="owner"?1:(s.status==="active"?-1:1)-(o.status==="active"?-1:1)),e.innerHTML=t.map(s=>{const o=JSON.stringify(s).replace(/'/g,"&apos;"),r=s.status==="active",i=g.professionals?.find(c=>c.id===s.professionalId);i&&i.name;const n=i?i.name.charAt(0):s.name.charAt(0),l=s.photo||i?.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(n)}`,d=_s[s.role]||_s.professional;return`
        <div class="user-card-clickable bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between p-4 cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all active:scale-[0.99] ${r?"":"opacity-60 bg-slate-50"}" 
             data-action="edit-user" data-user='${o}'>
            
            <div class="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                <img src="${l}" alt="Foto" class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0 pointer-events-none">
                <div class="flex-1 min-w-0 pointer-events-none">
                    <h3 class="font-black text-slate-800 text-sm md:text-base truncate flex items-center gap-2">
                        ${v(s.name)} 
                        ${s.role==="owner"?'<i class="bi bi-star-fill text-amber-400 text-[10px]" title="Proprietário"></i>':""}
                    </h3>
                    <p class="text-[10px] md:text-xs text-slate-500 font-medium truncate mb-1">${v(s.email)}</p>
                    <div class="flex flex-wrap gap-1.5 mt-1">
                        <span class="text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest border ${d.color}">${d.label}</span>
                        ${i?'<span class="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest border border-slate-200 bg-slate-50 text-slate-500"><i class="bi bi-scissors text-indigo-400 mr-1"></i>Vínculo Prof.</span>':""}
                    </div>
                </div>
            </div>
            
            <div class="flex items-center justify-between w-full md:w-auto md:justify-end gap-4 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                <div class="flex flex-col items-start md:items-end mr-4">
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</span>
                    <label class="flex items-center cursor-pointer" title="${r?"Ativo":"Inativo"}" data-action-stop-propagation="true">
                        <div class="relative">
                            <input type="checkbox" data-action="toggle-user-status" data-user-id="${s.id}" class="sr-only" ${r?"checked":""} ${s.role==="owner"?"disabled":""}>
                            <div class="toggle-bg block ${r?"bg-emerald-500":"bg-slate-300"} ${s.role==="owner"?"opacity-50":""} w-10 h-5 rounded-full transition-colors shadow-inner"></div>
                            <div class="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${r?"transform translate-x-5":""}"></div>
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
        `}).join("")}function xr(){const e=document.getElementById("showInactiveUsersToggle")?.checked?g.users:g.users.filter(a=>a.status==="active");zd(e)}function _d(t={}){let e="",a=!1;for(const[s,o]of Object.entries(Hd)){const r=Object.entries(o).filter(([i,n])=>{const l=i.replace("-section","");return!(g.enabledModules&&g.enabledModules[l]===!1)});r.length!==0&&(a=!0,e+=`
        <div class="mb-6 last:mb-0">
            <h4 class="font-black text-[10px] text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2"><i class="bi bi-folder2-open text-indigo-400 mr-1"></i> ${s}</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        `,r.forEach(([i,n])=>{const l=i==="agenda-section"||i==="comandas-section",d=t[i]?.view_all_prof===!0,c=Object.entries(Od).map(([p,b])=>`
                <label class="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <span class="text-[9px] text-slate-600 font-bold uppercase tracking-widest">${b}</span>
                    <div class="relative ml-2">
                        <input type="checkbox" data-module="${i}" data-permission="${p}" class="sr-only permission-checkbox" ${t[i]?.[p]?"checked":""}>
                        <div class="toggle-bg block bg-slate-200 w-8 h-4 rounded-full transition-colors shadow-inner"></div>
                        <div class="dot absolute left-1 top-[2px] bg-white w-3 h-3 rounded-full transition-transform ${t[i]?.[p]?"transform translate-x-4":""}"></div>
                    </div>
                </label>
            `).join(""),u=l?`
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
                    ${c}
                </div>
                ${u}
            </div>
            `}),e+="</div></div>")}return a?e:'<div class="p-6 bg-red-50 border border-red-100 rounded-2xl text-center"><p class="text-sm font-bold text-red-600">Sua empresa não possui módulos ativados. Contate o administrador do sistema.</p></div>'}function Vs(t){if(!Ze||g.userRole==="professional")return"";const e=t?.accessibleEstablishments?.map(r=>r.id)||[],a=t?.accessibleCompanies?.map(r=>r.id)||[],s=t?.role||"professional";if(s==="owner"||s==="group_admin")return'<div class="p-5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-800 text-sm font-black flex items-center justify-center gap-3"><i class="bi bi-shield-check text-2xl"></i> Acesso Total (Toda a Rede)</div>';let o='<div class="space-y-3 max-h-60 overflow-y-auto custom-scrollbar p-1">';return Ze.companies.forEach(r=>{const i=a.includes(r.id),n=Ze.branches.filter(l=>l.companyId===r.id);o+=`
            <div class="company-block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <label class="flex items-center space-x-3 cursor-pointer p-3 bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-200">
                    <input type="checkbox" class="company-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-5 w-5" value="${r.id}" data-name="${r.name}" ${i?"checked":""}>
                    <span class="text-sm font-black text-slate-800 uppercase tracking-wider">🏢 ${r.name}</span>
                </label>
                <div class="p-2 space-y-1">
                    ${n.map(l=>{const d=e.includes(l.id)||i;return`
                            <label class="flex items-center space-x-3 cursor-pointer p-2.5 hover:bg-indigo-50/50 rounded-lg transition-colors border border-transparent hover:border-indigo-100">
                                <input type="checkbox" class="branch-checkbox rounded border-slate-300 text-indigo-500 h-4 w-4" value="${l.id}" data-name="${l.name}" data-company-id="${r.id}" ${d?"checked":""}>
                                <span class="text-xs font-bold text-slate-600">📍 ${l.name}</span>
                            </label>
                        `}).join("")}
                </div>
            </div>
        `}),o+="</div>",o}async function Us(t=null){document.getElementById("user-list-view").classList.add("hidden");const e=document.getElementById("user-form-view");e.classList.remove("hidden");let a=g.professionals;if(!a||a.length===0)try{const p=fr().map(h=>$e(h)),b=await Promise.all(p),f=new Map;b.flat().forEach(h=>f.set(h.id,h)),a=Array.from(f.values()),g.professionals=a}catch(u){console.warn("Profissionais não carregados",u)}if(["owner","group_admin","company_admin"].includes(g.userRole)&&!Ze)try{const u=await fe();u&&(Ze=u)}catch(u){console.error("Falha ao buscar hierarquia",u),Ze={companies:[],branches:[]}}const s=t!==null,o=s&&t.role==="owner",r=e.querySelector("#userFormTitle");r.innerHTML=s?`<i class="bi bi-person-lines-fill mr-2 text-indigo-600"></i>Editar Perfil: ${t.name}`:'<i class="bi bi-person-plus-fill mr-2 text-indigo-600"></i>Novo Acesso';const i=e.querySelector("#userForm");i.innerHTML=`
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
                                <input type="email" id="userEmail" required value="${t?.email||""}" ${o?"disabled":""} class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner transition-colors ${o?"opacity-70 cursor-not-allowed":""}">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <h3 class="font-black text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3"><i class="bi bi-link-45deg text-orange-500 text-lg"></i> Vínculo na Agenda</h3>
                        <div class="form-group max-w-xl">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Vincular a qual Perfil Profissional?</label>
                            <select id="userProfessionalId" class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none shadow-inner transition-colors">
                                <option value="">-- Apenas Administrativo / Recepção --</option>
                                ${a?.map(u=>`<option value="${u.id}" ${u.id===t?.professionalId?"selected":""}>${u.name}</option>`).join("")}
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
                    ${["owner","group_admin","company_admin"].includes(g.userRole)?`
                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 class="font-black text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3 mb-5"><i class="bi bi-diagram-3 text-indigo-500 text-lg"></i> Permissões de Rede</h3>
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <label class="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2 ml-1">Qual o cargo/nível na empresa?</label>
                                <select id="userRole" class="w-full p-3.5 border border-indigo-200 rounded-xl text-sm font-black text-indigo-900 bg-indigo-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-colors" ${o?"disabled":""}>
                                    
                                    ${["owner","group_admin"].includes(g.userRole)?`<option value="group_admin" ${t?.role==="group_admin"?"selected":""}>Administrador Geral (Acesso Total)</option>`:""}
                                    <option value="company_admin" ${t?.role==="company_admin"?"selected":""}>Gestor de Matriz / Empresa</option>
                                    <option value="branch_manager" ${t?.role==="branch_manager"?"selected":""}>Gestor de Filial (Loja)</option>
                                    <option value="professional" ${t?.role==="professional"?"selected":""}>Profissional / Recepção (Padrão)</option>
                                </select>
                            </div>
                            <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <label class="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3 ml-1">Unidades que pode visualizar</label>
                                <div id="hierarchySelectorContainer">
                                    ${Vs(t)}
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
                        ${_d(t?.permissions)}
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
    `;const n=e.querySelectorAll(".tab-btn"),l=e.querySelectorAll(".tab-content");n.forEach(u=>{u.addEventListener("click",()=>{n.forEach(b=>{b.classList.remove("active","text-indigo-600","border-indigo-600"),b.classList.add("text-slate-400","border-transparent")}),l.forEach(b=>b.classList.add("hidden")),u.classList.add("active","text-indigo-600","border-indigo-600"),u.classList.remove("text-slate-400","border-transparent");const p=u.getAttribute("data-tab");e.querySelector(`#${p}`).classList.remove("hidden")})});const d=i.querySelector("#userRole"),c=i.querySelector("#hierarchySelectorContainer");if(d&&c){d.addEventListener("change",p=>{const b={...t,role:p.target.value};c.innerHTML=Vs(b),u()});const u=()=>{c.querySelectorAll(".company-checkbox").forEach(p=>{p.addEventListener("change",b=>{b.target.closest(".company-block").querySelectorAll(".branch-checkbox").forEach(y=>{y.checked=b.target.checked;const S=y.nextElementSibling.querySelector(".dot");S&&(b.target.checked?S.classList.add("transform","translate-x-4"):S.classList.remove("transform","translate-x-4"))})})})};u()}if(i.querySelectorAll(".permission-checkbox").forEach(u=>{if(u.addEventListener("change",p=>{const b=p.target.nextElementSibling,f=b.nextElementSibling;p.target.checked?(b.classList.replace("bg-slate-200","bg-indigo-500"),f.classList.add("transform","translate-x-4")):(b.classList.replace("bg-indigo-500","bg-slate-200"),f.classList.remove("transform","translate-x-4"))}),u.checked){const p=u.nextElementSibling,b=p.nextElementSibling;p.classList.replace("bg-slate-200","bg-indigo-500"),b.classList.add("transform","translate-x-4")}}),i.onsubmit=async u=>{u.preventDefault();const p=i.querySelector('button[type="submit"]'),b=p.innerHTML;p.disabled=!0,p.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> Processando...';const f={};i.querySelectorAll(".permission-checkbox").forEach($=>{const E=$.dataset.module,D=$.dataset.permission;f[E]||(f[E]={}),f[E][D]=$.checked});const h=i.querySelector("#userProfessionalId").value||null,y=i.querySelector("#userRole")?.value||"professional",S=[],P=[];if(y!=="group_admin"&&y!=="owner"&&i.querySelector(".company-checkbox")&&(i.querySelectorAll(".company-checkbox:checked").forEach($=>{S.push({id:$.value,name:$.dataset.name})}),i.querySelectorAll(".branch-checkbox:checked").forEach($=>{P.push({id:$.value,name:$.dataset.name,companyId:$.dataset.companyId})}),P.length===0))return p.disabled=!1,p.innerHTML=b,m("Atenção","Selecione pelo menos uma filial na aba de Acesso.","warning");const N={name:i.querySelector("#userName").value,permissions:f,professionalId:h,role:y,accessibleCompanies:S,accessibleEstablishments:P};try{if(s){const $=i.querySelector("#userEmail").value;t?.email!==$&&!o&&(N.email=$),await jd(t.id,N),m("Sucesso","Usuário atualizado.","success")}else N.email=i.querySelector("#userEmail").value,N.password=i.querySelector("#userPassword").value,await qd(N),m("Sucesso","Novo usuário cadastrado na plataforma.","success");ia()}catch($){m(`Erro: ${$.message}`,"error"),p.disabled=!1,p.innerHTML=b}},s){const u=i.querySelector("#btn-show-password"),p=i.querySelector("#password-form");u&&p&&(u.onclick=()=>{u.classList.add("hidden"),p.classList.remove("hidden")},i.querySelector("#btn-cancel-pwd").onclick=()=>{u.classList.remove("hidden"),p.classList.add("hidden"),p.querySelector("#userNewPassword").value=""},i.querySelector("#btn-save-pwd").onclick=async b=>{const f=b.target,h=p.querySelector("#userNewPassword").value;if(!h||h.length<6)return m("Aviso","Senha deve ter no mínimo 6 caracteres.","warning");if(await Y("Alterar Senha","O usuário usará esta nova senha no próximo acesso. Confirma?"))try{f.disabled=!0,f.textContent="Aguarde...",await Rd(t.id,h),m("Sucesso","Senha alterada com segurança.","success"),u.classList.remove("hidden"),p.classList.add("hidden")}catch(y){m("Erro",y.message,"error")}finally{f.disabled=!1,f.textContent="Salvar Senha"}})}}async function Vd(){const t=document.getElementById("usersListContainer");t.innerHTML='<div class="col-span-full py-16 flex justify-center"><div class="loader"></div></div>';try{const e=fr(),a=e.map(l=>Md(l)),s=e.map(l=>$e(l)),o=await Promise.all(a),r=await Promise.all(s),i=new Map;o.flat().forEach(l=>i.set(l.id,l)),g.users=Array.from(i.values());const n=new Map;r.flat().forEach(l=>n.set(l.id,l)),g.professionals=Array.from(n.values()),xr()}catch{m("Erro ao carregar base de usuários.","error"),t.innerHTML='<p class="col-span-full text-center font-bold text-red-500 bg-red-50 p-6 rounded-2xl">Falha de comunicação com o servidor de acessos.</p>'}}async function ia(){pt.innerHTML=`
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
    `,Ot&&pt.removeEventListener("click",Ot),zt&&pt.removeEventListener("change",zt),Ot=async t=>{const e=t.target.closest("[data-action]");if(!e)return;switch(e.dataset.action){case"new-user":Us();break;case"edit-user":const s=JSON.parse(e.dataset.user.replace(/&apos;/g,"'"));Us(s);break;case"back-to-list":ia();break;case"delete-user":{if(t.stopPropagation(),await Y("Excluir Usuário","O usuário perderá totalmente o acesso ao sistema. Confirma?"))try{await Nd(e.dataset.userId),m("Usuário excluído com sucesso.","success"),ia()}catch(o){m(`Erro: ${o.message}`,"error")}break}}},zt=async t=>{if(t.target.id==="showInactiveUsersToggle"){const e=t.target.nextElementSibling,a=e.nextElementSibling;t.target.checked?(e.classList.replace("bg-slate-200","bg-indigo-500"),a.classList.add("transform","translate-x-5")):(e.classList.replace("bg-indigo-500","bg-slate-200"),a.classList.remove("transform","translate-x-5")),xr()}else{const e=t.target.closest('input[data-action="toggle-user-status"]');if(e){t.stopPropagation();const a=e.dataset.userId,s=e.checked?"active":"inactive",o=e.nextElementSibling,r=o.nextElementSibling;e.checked?(o.classList.replace("bg-slate-300","bg-emerald-500"),r.classList.add("transform","translate-x-5")):(o.classList.replace("bg-emerald-500","bg-slate-300"),r.classList.remove("transform","translate-x-5"));try{await Fd(a,s);const i=g.users.findIndex(n=>n.id===a);if(i>-1){g.users[i].status=s;const n=e.closest(".user-card-clickable");s==="inactive"?n.classList.add("opacity-60","bg-slate-50"):n.classList.remove("opacity-60","bg-slate-50")}}catch(i){m(`Erro: ${i.message}`,"error"),e.checked=!e.checked,e.checked?(o.classList.replace("bg-slate-300","bg-emerald-500"),r.classList.add("transform","translate-x-5")):(o.classList.replace("bg-emerald-500","bg-slate-300"),r.classList.remove("transform","translate-x-5"))}}}},pt.addEventListener("click",Ot),pt.addEventListener("change",zt),await Vd()}const Ud=document.getElementById("content");let Ws={},Ya=null;function Wd(){Object.values(Ws).forEach(t=>t?.destroy()),Ws={}}function Qd(t,e){if(!window.jspdf){m("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a({orientation:"landscape",unit:"px",format:"a4"}),o=document.getElementById("salesReportSummaryCards");if(s.setFontSize(18),s.text(t,s.internal.pageSize.getWidth()/2,40,{align:"center"}),o){const i=[["Receita Total",o.querySelector("#summary-revenue").textContent],["Vendas Totais",o.querySelector("#summary-transactions").textContent],["Ticket Médio",o.querySelector("#summary-avg-ticket").textContent]];s.autoTable({startY:60,head:[["Métrica","Valor"]],body:i,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const r=s.lastAutoTable?s.lastAutoTable.finalY+20:60;s.text("Detalhes das Vendas",20,r),s.autoTable({html:`#${e}`,startY:r+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),s.save(`${t.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function Qs(t){const e=document.getElementById("genericModal"),a=v(t.client),s=v(t.items),o=v(t.responsavelCaixa||"N/A"),r=(t.payments||[]).map(i=>`
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
    `,e.style.display="flex"}function Jd(t){const{summary:e,transactions:a}=t;document.getElementById("summary-revenue").textContent=`R$ ${e.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=e.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${e.averageTicket.toFixed(2)}`;const s=document.getElementById("paymentSummaryTableBody"),o=Object.entries(e.paymentMethodTotals).sort(([,n],[,l])=>l-n);s.innerHTML=o.map(([n,l])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${v(n.charAt(0).toUpperCase()+n.slice(1))}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${l.toFixed(2)}</td>
        </tr>
    `).join("");const r=document.getElementById("transactionsTableBody"),i=document.getElementById("mobileTransactionsList");if(a.length===0){const n='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';r.innerHTML=n,i.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}r.innerHTML=a.map((n,l)=>{const d=v(n.client),c=v(n.items),u=v(n.type);return`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${l}">
            <td class="w-24 py-3 px-4">${new Date(n.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${d}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${c}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${u}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${n.total.toFixed(2)}</td>
        </tr>
    `}).join(""),r.querySelectorAll("tr").forEach(n=>{n.addEventListener("dblclick",()=>{const l=n.dataset.transactionIndex,d=Ya.transactions[l];d&&Qs(d)})}),i.innerHTML=a.map((n,l)=>{const d=v(n.client),c=v(n.items),u=v(n.type);return`
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
    `}).join(""),i.querySelectorAll("div[data-transaction-index]").forEach(n=>{n.addEventListener("click",()=>{const l=n.dataset.transactionIndex,d=Ya.transactions[l];d&&Qs(d)})})}async function Js(){const t=document.getElementById("main-reports-view"),e=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!t||!e||!a)return;const s=e.value,o=a.value;if(!s||!o)return m("Atenção","Por favor, selecione as datas de início e fim.","error");t.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const r=document.getElementById("cashierSessionFilter").value,i=await ea({establishmentId:g.establishmentId,startDate:s,endDate:o,cashierSessionId:r});Ya=i,t.innerHTML=`
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
        `,Jd(i)}catch(r){m("Erro",`Não foi possível carregar o relatório: ${r.message}`,"error"),t.innerHTML=`<p class="p-8 text-center text-red-500">${v(r.message)}</p>`}}async function Gd(){Wd();const t=new Date().toISOString().split("T")[0],e=new Date;e.setDate(e.getDate()-30);const a=e.toISOString().split("T")[0];Ud.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",Js),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const s=document.getElementById("reportStartDate").value,o=document.getElementById("reportEndDate").value,r=`Relatorio_Vendas_${s}_a_${o}`;Qd(r,"transactionsTable")});try{const s=await vn(g.establishmentId),o=document.getElementById("cashierSessionFilter");s&&s.length>0&&s.forEach(r=>{const i=new Date(r.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),n=v(r.closedByName||"N/A");o.innerHTML+=`<option value="${r.id}">${n} - ${i}</option>`})}catch{m("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await Js()}const Xd=document.getElementById("content");let w={payables:[],receivables:[],natures:[],costCenters:[],establishments:[],suppliers:[],clients:[],professionals:[],currentTab:"receivables",statusFilter:"all",startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date(new Date().getFullYear(),new Date().getMonth()+1,0).toISOString().split("T")[0],filterNaturezaId:"all",filterCostCenterId:"all",filterEstablishmentIds:new Set,searchQuery:"",isAdvancedFilterOpen:!1,selectedIds:new Set,isSelectionMode:!1,sortCol:"dueDate",sortAsc:!0},_t=null,Vt=null;function $s(t){const e=new Map,a=[];return t&&(t.forEach(s=>e.set(s.id,{...s,children:[]})),e.forEach(s=>{s.parentId&&e.has(s.parentId)?e.get(s.parentId).children.push(s):a.push(s)})),a}function hr(t){if(!t)return{day:"--",month:"---",full:"--/--/----"};const[e,a,s]=t.split("-"),o=new Date(e,a-1,s),r=String(o.getDate()).padStart(2,"0"),i=o.toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return{day:r,month:i,full:o.toLocaleDateString("pt-BR")}}function we(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t)}function ot(t,e){if(e==="paid")return!1;const a=new Date;a.setHours(0,0,0,0);const[s,o,r]=t.split("-");return new Date(s,o-1,r)<a}function Yd(t,e,a){if(!t)return;if(!e||e.length===0){t.innerHTML=`
            <div class="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <i class="bi bi-inbox text-2xl text-gray-300"></i>
                <p class="text-gray-500 text-sm mt-2 font-medium">Nenhum item criado.</p>
            </div>`;return}const s=(o,r=0)=>{const i=r*16,n=r===0,l=n?"bi-folder-fill text-indigo-500":"bi-file-earmark-text text-gray-400",d=n?"bg-white shadow-sm border border-gray-200":"bg-gray-50 border border-gray-100/50",c=n?"text-sm font-bold text-gray-800":"text-xs font-semibold text-gray-600",u=r>0?'<div class="absolute left-0 top-1/2 w-3 border-t-2 border-gray-200" style="margin-left: -12px;"></div>':"",p=r>0?"border-left: 2px solid #e5e7eb;":"";return`
            <div class="relative flex justify-between items-center ${d} p-2 rounded-lg mb-1.5 hover:border-indigo-300 transition-all group" style="margin-left: ${i}px; ${p}">
                ${u}
                <span class="${c} flex items-center gap-2">
                    <i class="bi ${l} text-base"></i>
                    ${o.name}
                </span>
                <button type="button" data-action="delete-${a}" data-id="${o.id}" class="text-gray-400 hover:text-red-600 text-xs w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-transparent hover:border-red-100" title="Excluir">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
            ${o.children.map(b=>s(b,r+1)).join("")}
        `};t.innerHTML=e.map(o=>s(o)).join("")}async function Za(t){const e=document.getElementById("genericModal"),a=t==="nature",s=a?"Plano de Naturezas":"Centros de Custo",o=a?fa:ms,r=a?Sn:In,i=a?"natures":"costCenters";e.innerHTML=`
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
        </div>`,e.style.display="flex";const n=e.querySelector("#hierarchyList"),l=e.querySelector("#itemParent"),d=u=>{const p=$s(u);Yd(n,p,t);const b=l.value;l.innerHTML='<option value="">-- Nível Principal --</option>';const f=(h,y=0)=>{const S="  ".repeat(y)+(y>0?"↳ ":"");l.innerHTML+=`<option value="${h.id}">${S}${h.name}</option>`,h.children.forEach(P=>f(P,y+1))};p.forEach(h=>f(h)),l.value=b};try{const u=await o(g.establishmentId);w[i]=u,d(u)}catch(u){console.error(u)}const c=e.querySelector("#hierarchyForm");c.addEventListener("submit",async u=>{u.preventDefault();const p=e.querySelector("#itemName").value,b=l.value;try{await r({name:p,parentId:b||null,establishmentId:g.establishmentId});const f=await o(g.establishmentId);w[i]=f,d(f),c.reset(),await Fe(),m("Sucesso","Item adicionado à estrutura.","success")}catch(f){m("Erro",f.message,"error")}})}async function Zd(){try{const e=(await fe()).matrizes||[];w.establishments=[],e.forEach(a=>{w.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>w.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),w.filterEstablishmentIds.size===0&&w.filterEstablishmentIds.add(g.establishmentId)}catch(t){console.warn("Erro ao buscar lojas",t)}vr(),yr(),await Fe()}function vr(){const t=w.establishments.map(e=>`
        <label class="inline-flex items-center gap-2 px-3 py-1.5 bg-white border ${w.filterEstablishmentIds.has(e.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-gray-200 text-gray-600"} rounded-lg cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" value="${e.id}" ${w.filterEstablishmentIds.has(e.id)?"checked":""}>
            <span class="text-xs font-bold whitespace-nowrap">${e.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${e.name}</span>
        </label>
    `).join("");Xd.innerHTML=`
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
    `,document.querySelector('.date-preset-btn[data-preset="month"]').classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),document.querySelector('.date-preset-btn[data-preset="month"]').classList.remove("bg-white","text-gray-600","border-gray-200"),wr()}function Kd(){const t=w.currentTab==="receivables",e=t?w.receivables:w.payables;let a=e;if(w.statusFilter!=="all"&&(a=e.filter(n=>{const l=ot(n.dueDate,n.status);return w.statusFilter==="overdue"?l:w.statusFilter==="pending"?n.status==="pending"&&!l:n.status===w.statusFilter})),w.searchQuery&&(a=a.filter(n=>n.description&&n.description.toLowerCase().includes(w.searchQuery)||n.entity&&n.entity.toLowerCase().includes(w.searchQuery)||n.notes&&n.notes.toLowerCase().includes(w.searchQuery))),a.sort((n,l)=>new Date(n.dueDate)-new Date(l.dueDate)),a.length===0){m("Aviso","Não há dados para exportar com os filtros atuais.","info");return}const s=new Map(w.natures.map(n=>[n.id,n.name])),o=new Map(w.costCenters.map(n=>[n.id,n.name])),r=new Map(w.establishments.map(n=>[n.id,n])),i=a.map(n=>{const l=n.status==="paid",d=ot(n.dueDate,n.status);let c=l?"Baixado":d?"Atrasado":"A Vencer / Pendente";const u=n.naturezaId?s.get(n.naturezaId)||"Não Categorizado":"Geral",p=n.centroDeCustoId?o.get(n.centroDeCustoId)||"Não Categorizado":"Geral",b=r.get(n.establishmentId),f=b?b.name:"Atual",h=n.saleId||n.appointmentId||n.origin==="comanda"?"Comanda / PDV":n.origin==="commission"?"Comissões":"Manual";return{"Data de Vencimento":new Date(n.dueDate).toLocaleDateString("pt-BR"),"Data de Pagamento":n.paymentDate?new Date(n.paymentDate).toLocaleDateString("pt-BR"):"-",Descrição:n.description||"","Favorecido / Pagador":n.entity||"",Unidade:f,Natureza:u,"Centro de Custo":p,Origem:h,"Documento / NFS":n.documentNumber||"",Status:c,"Valor (R$)":n.amount}});try{if(typeof XLSX>"u"){m("Erro","A biblioteca de exportação (XLSX) não foi carregada no sistema.","error");return}const n=XLSX.utils.json_to_sheet(i),l=XLSX.utils.book_new();XLSX.utils.book_append_sheet(l,n,"Financeiro");const c=`Fluxo_${t?"Receitas":"Despesas"}_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(l,c)}catch(n){console.error("Erro ao exportar:",n),m("Erro","Não foi possível exportar para Excel.","error")}}function yr(){const t=document.getElementById("select-all-toggle");t&&t.addEventListener("change",o=>{const r=o.target.checked,i=document.querySelectorAll(".item-checkbox");w.selectedIds.clear(),i.forEach(n=>{n.checked=r,r&&w.selectedIds.add(n.dataset.id)}),Ge()}),document.getElementById("cancel-selection-btn").addEventListener("click",()=>{w.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(o=>o.checked=!1),Ge()}),document.getElementById("batch-delete-btn").addEventListener("click",async()=>{const o=w.selectedIds.size;if(o===0)return;if(await Y("Excluir Lançamentos",`Deseja realmente apagar ${o} registros financeiros?`))try{const i=w.currentTab==="payables"?"payables":"receivables";await zo(i,Array.from(w.selectedIds)),m("Sucesso",`${o} itens excluídos.`,"success"),w.selectedIds.clear(),Ge(),Fe()}catch{m("Erro","Falha ao excluir itens.","error")}}),document.querySelectorAll(".est-filter-checkbox").forEach(o=>{o.addEventListener("change",r=>{const i=r.target.closest("label");r.target.checked?(w.filterEstablishmentIds.add(r.target.value),i.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.remove("border-gray-200","text-gray-600")):(w.filterEstablishmentIds.delete(r.target.value),i.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),i.classList.add("border-gray-200","text-gray-600"))})}),document.querySelectorAll(".sort-header").forEach(o=>{o.addEventListener("click",r=>{const i=r.currentTarget.dataset.sort;w.sortCol===i?w.sortAsc=!w.sortAsc:(w.sortCol=i,w.sortAsc=!0),kt()})}),document.getElementById("toggle-filter-btn").addEventListener("click",()=>{const o=document.getElementById("filter-panel"),r=document.getElementById("toggle-filter-btn");w.isAdvancedFilterOpen=!w.isAdvancedFilterOpen,w.isAdvancedFilterOpen?(o.classList.remove("hidden"),r.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.classList.remove("bg-white","text-gray-600","border-gray-200")):(o.classList.add("hidden"),r.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),r.classList.add("bg-white","text-gray-600","border-gray-200"))}),document.getElementById("settings-btn").addEventListener("click",rc);const e=document.getElementById("export-excel-btn");e&&e.addEventListener("click",Kd),document.querySelectorAll('[data-action="new-financial"]').forEach(o=>{o.addEventListener("click",r=>{Da(r.target.closest("button").dataset.type)})}),document.getElementById("fab-add").addEventListener("click",()=>{const o=w.currentTab==="payables"?"payable":"receivable";Da(o)});const a=document.getElementById("tab-receivables"),s=document.getElementById("tab-payables");a.addEventListener("click",()=>Gs("receivables")),s.addEventListener("click",()=>Gs("payables")),document.querySelectorAll(".status-filter-btn").forEach(o=>{o.addEventListener("click",r=>{document.querySelectorAll(".status-filter-btn").forEach(i=>{i.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200","bg-red-50","text-red-700","border-red-200"),i.classList.add("bg-white","text-gray-600")}),r.target.dataset.status==="overdue"?r.target.classList.add("bg-red-50","text-red-700","border-red-200"):r.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.target.classList.remove("bg-white","text-gray-600"),w.statusFilter=r.target.dataset.status,kt(),kr()})}),document.querySelectorAll(".date-preset-btn").forEach(o=>{o.addEventListener("click",r=>{document.querySelectorAll(".date-preset-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),r.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.target.classList.remove("bg-white","text-gray-600","border-gray-200");const i=r.target.dataset.preset,n=new Date;let l,d;i==="month"?(l=new Date(n.getFullYear(),n.getMonth(),1),d=new Date(n.getFullYear(),n.getMonth()+1,0)):i==="last_month"?(l=new Date(n.getFullYear(),n.getMonth()-1,1),d=new Date(n.getFullYear(),n.getMonth(),0)):i==="year"&&(l=new Date(n.getFullYear(),0,1),d=new Date(n.getFullYear(),11,31)),document.getElementById("filterStartDate").value=l.toISOString().split("T")[0],document.getElementById("filterEndDate").value=d.toISOString().split("T")[0],document.getElementById("apply-filter-btn").click()})}),document.getElementById("searchInput").addEventListener("input",o=>{w.searchQuery=o.target.value.toLowerCase(),kt()}),document.getElementById("clear-filters-btn").addEventListener("click",()=>{const o=new Date;document.getElementById("filterStartDate").value=new Date(o.getFullYear(),o.getMonth(),1).toISOString().split("T")[0],document.getElementById("filterEndDate").value=new Date(o.getFullYear(),o.getMonth()+1,0).toISOString().split("T")[0],document.getElementById("filterNaturezaId").value="all",document.getElementById("filterCostCenterId").value="all",w.filterEstablishmentIds.clear(),w.filterEstablishmentIds.add(g.establishmentId),vr(),yr()}),document.getElementById("apply-filter-btn").addEventListener("click",()=>{w.startDate=document.getElementById("filterStartDate").value,w.endDate=document.getElementById("filterEndDate").value,w.filterNaturezaId=document.getElementById("filterNaturezaId").value,w.filterCostCenterId=document.getElementById("filterCostCenterId").value,w.filterEstablishmentIds.size===0&&w.filterEstablishmentIds.add(g.establishmentId),document.getElementById("toggle-filter-btn").click(),Fe()}),_t&&document.body.removeEventListener("click",_t),_t=o=>{const r=o.target;if(r.classList.contains("item-checkbox")||r.classList.contains("modal-item-checkbox")){const l=r.value||r.dataset.id;r.checked?w.selectedIds.add(l):w.selectedIds.delete(l),Ge(),o.stopPropagation();return}const i=r.closest("button[data-action]");if(i){const{action:l,type:d,id:c}=i.dataset;if(o.stopPropagation(),l==="delete"){const u=i.closest(".financial-row").dataset.item.replace(/&apos;/g,"'");ac(d,JSON.parse(u));return}if(l==="mark-as-paid"){tc(d,c);return}if(l==="manage-natures"){Za("nature");return}if(l==="manage-cost-centers"){Za("cost-center");return}}const n=r.closest(".financial-row");if(n&&document.getElementById("list-container").contains(n)&&!r.closest("button")&&!r.closest(".item-checkbox")){const{type:l}=n.dataset,d=JSON.parse(n.dataset.item.replace(/&apos;/g,"'"));Da(l,d)}},document.body.addEventListener("click",_t),Vt&&document.getElementById("genericModal").removeEventListener("click",Vt),Vt=o=>{if(o.target.closest('[data-action="close-modal"]')){document.getElementById("genericModal").style.display="none";return}const i=o.target.closest('button[data-action^="delete-"]');if(i){const n=i.dataset.action.split("-")[1];oc(n,i.dataset.id)}},document.getElementById("genericModal").addEventListener("click",Vt)}function Ge(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=document.getElementById("fab-add"),s=w.selectedIds.size;e.textContent=s,s>0?(t.classList.remove("hidden"),t.classList.add("flex"),a&&a.classList.add("hidden")):(t.classList.add("hidden"),t.classList.remove("flex"),a&&a.classList.remove("hidden"))}function Gs(t){w.currentTab=t,w.selectedIds.clear(),Ge(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1);const e=document.getElementById("tab-receivables"),a=document.getElementById("tab-payables"),s=document.getElementById("fab-add");t==="receivables"?(e.classList.add("bg-white","text-emerald-700","shadow"),e.classList.remove("text-gray-600"),a.classList.remove("bg-white","text-red-700","shadow"),a.classList.add("text-gray-600"),s&&(s.className="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40")):(a.classList.add("bg-white","text-red-700","shadow"),a.classList.remove("text-gray-600"),e.classList.remove("bg-white","text-emerald-700","shadow"),e.classList.add("text-gray-600"),s&&(s.className="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40")),kt()}async function Fe(){const t=document.getElementById("list-container");t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-xs">A processar transações...</p></div>';try{if(w.natures.length===0){const[r,i,n,l,d]=await Promise.all([fa(g.establishmentId),ms(g.establishmentId),Ct(g.establishmentId).catch(()=>[]),lt(g.establishmentId,"",1e3).catch(()=>[]),$e(g.establishmentId).catch(()=>[])]);w.natures=r||[],w.costCenters=i||[],w.suppliers=n||[],w.clients=l||[],w.professionals=d||[],wr()}const e=Array.from(w.filterEstablishmentIds).join(","),a={startDate:w.startDate,endDate:w.endDate,establishmentId:e};w.filterNaturezaId!=="all"&&(a.natureId=w.filterNaturezaId),w.filterCostCenterId!=="all"&&(a.costCenterId=w.filterCostCenterId);const[s,o]=await Promise.all([Uo(a),Qo(a)]);w.payables=s.entries||[],w.receivables=o.entries||[],kr(),kt()}catch(e){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-xs font-medium">Erro ao carregar dados: ${e.message}</p>
            </div>`}}function wr(){const t=s=>{let o='<option value="all">-- Todas as opções --</option>';const r=$s(s),i=(n,l=0)=>{const d="  ".repeat(l)+(l>0?"↳ ":"");o+=`<option value="${n.id}">${d}${n.name}</option>`,n.children.forEach(c=>i(c,l+1))};return r.forEach(n=>i(n)),o},e=document.getElementById("filterNaturezaId"),a=document.getElementById("filterCostCenterId");e&&(e.innerHTML=t(w.natures)),a&&(a.innerHTML=t(w.costCenters))}function kr(){const t=document.getElementById("summary-section");if(!t)return;const e=w.currentTab==="receivables";let s=e?w.receivables:w.payables;w.searchQuery&&(s=s.filter(c=>c.description&&c.description.toLowerCase().includes(w.searchQuery)||c.entity&&c.entity.toLowerCase().includes(w.searchQuery)||c.notes&&c.notes.toLowerCase().includes(w.searchQuery)));const o=s.reduce((c,u)=>c+u.amount,0),r=s.filter(c=>c.status==="paid").reduce((c,u)=>c+u.amount,0),i=s.filter(c=>c.status==="pending"&&!ot(c.dueDate,c.status)).reduce((c,u)=>c+u.amount,0),n=s.filter(c=>ot(c.dueDate,c.status)).reduce((c,u)=>c+u.amount,0),l=e?"emerald":"red",d=e?"Receitas":"Despesas";t.innerHTML=`
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total do Período</span>
            <span class="text-xl font-black text-gray-800 mt-0.5">${we(o)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">A Vencer / Prov.</span>
            <span class="text-xl font-bold text-blue-600 mt-0.5">${we(i)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${d} Baixadas</span>
            <span class="text-xl font-bold text-${l}-600 mt-0.5">${we(r)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Atrasadas</span>
            <span class="text-xl font-bold ${n>0?"text-red-600":"text-gray-400"} mt-0.5">${we(n)}</span>
        </div>
    `}function ec(){document.querySelectorAll(".sort-header").forEach(t=>{const e=t.querySelector("i");if(!e)return;t.dataset.sort===w.sortCol?(t.classList.add("text-indigo-700"),t.classList.remove("text-gray-500"),e.className=w.sortAsc?"bi bi-arrow-up ml-1 text-indigo-600":"bi bi-arrow-down ml-1 text-indigo-600"):(t.classList.remove("text-indigo-700"),t.classList.add("text-gray-500"),e.className="bi bi-arrow-down-up ml-1 opacity-30 text-[10px]")})}function kt(){const t=document.getElementById("list-container");if(!t)return;const e=w.currentTab==="receivables",a=e?w.receivables:w.payables;let s=a;if(w.statusFilter!=="all"&&(s=a.filter(d=>{const c=ot(d.dueDate,d.status);return w.statusFilter==="overdue"?c:w.statusFilter==="pending"?d.status==="pending"&&!c:d.status===w.statusFilter})),w.searchQuery&&(s=s.filter(d=>d.description&&d.description.toLowerCase().includes(w.searchQuery)||d.entity&&d.entity.toLowerCase().includes(w.searchQuery)||d.notes&&d.notes.toLowerCase().includes(w.searchQuery))),s.sort((d,c)=>{let u=d[w.sortCol],p=c[w.sortCol];return w.sortCol==="dueDate"?(u=new Date(u).getTime(),p=new Date(p).getTime()):(w.sortCol==="description"||w.sortCol==="status")&&(u=u?u.toLowerCase():"",p=p?p.toLowerCase():""),u<p?w.sortAsc?-1:1:u>p?w.sortAsc?1:-1:0}),ec(),s.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-inbox text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum registo encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente limpar os filtros ou faça um novo lançamento.</p>
            </div>
        `;return}const o=new Map(w.natures.map(d=>[d.id,d.name])),r=new Map(w.costCenters.map(d=>[d.id,d.name])),i=new Map(w.establishments.map(d=>[d.id,d])),n=e?"receivable":"payable",l=e?"text-emerald-600":"text-red-600";t.innerHTML=s.map(d=>{const c=hr(d.dueDate),u=d.status==="paid",p=ot(d.dueDate,d.status);let b="";u?b='<span class="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-check2-circle mr-0.5"></i> Baixado</span>':p?b='<span class="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-exclamation-circle mr-0.5"></i> Atrasado</span>':b='<span class="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-clock-history mr-0.5"></i> A Vencer</span>';const f=d.naturezaId?o.get(d.naturezaId)||"Sem Natureza":"Não Categorizado",h=d.centroDeCustoId?r.get(d.centroDeCustoId)||"Sem Centro":"Geral",S=d.saleId||d.appointmentId||d.origin==="comanda"?'<span class="text-[8px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100"><i class="bi bi-receipt mr-1"></i>Comanda</span>':d.origin==="commission"?'<span class="text-[8px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100"><i class="bi bi-cash-stack mr-1"></i>Comissões</span>':'<span class="text-[8px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200"><i class="bi bi-keyboard mr-1"></i>Manual</span>',P=d.documentNumber?`<span class="text-[8px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded ml-2" title="NFS / Documento">NFS: ${d.documentNumber}</span>`:"",N=i.get(d.establishmentId);let $="";if(N){const L=N.type==="Matriz"?"bi-building":"bi-shop";$=`<span class="text-[8px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-bold border border-slate-200 flex items-center whitespace-nowrap w-max" title="Unidade: ${N.name}"><i class="bi ${L} mr-1 opacity-60"></i> ${N.name}</span>`}else $='<span class="text-[8px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-bold border border-gray-200 flex items-center whitespace-nowrap w-max"><i class="bi bi-geo-alt mr-1 opacity-60"></i> Atual</span>';const E=JSON.stringify(d).replace(/'/g,"&apos;"),D=w.selectedIds.has(d.id),j=!!d.recurrenceId?'<i class="bi bi-arrow-repeat text-indigo-400 ml-1 text-[10px]" title="Lançamento Recorrente"></i>':"",I=d.entity?`<span class="text-[9px] text-gray-400 font-medium truncate block mt-0.5"><i class="bi bi-person mr-1 opacity-40"></i>${d.entity}</span>`:"";return`
        <div class="financial-row border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-1.5 md:p-2 mb-1 ${D?"bg-indigo-50/40":""}"
             data-type="${n}"
             data-item='${E}'>
            
            <div class="absolute left-0 top-0 bottom-0 w-1 ${u?"bg-gray-200":e?"bg-emerald-400":"bg-red-400"}"></div>

            <div class="absolute right-2 top-2 md:relative md:right-auto md:top-auto md:col-span-1 md:flex md:justify-center z-10">
                <input type="checkbox" value="${d.id}" class="item-checkbox w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${D?"checked":""}>
            </div>

            <div class="flex items-center gap-2 md:col-span-1 pl-2 md:pl-0">
                <div class="flex flex-col items-center justify-center bg-white border border-gray-200 rounded w-9 h-9 flex-shrink-0 shadow-sm">
                    <span class="text-xs font-black text-gray-800 leading-none">${c.day}</span>
                    <span class="text-[7px] font-bold text-gray-400 uppercase leading-none mt-0.5">${c.month}</span>
                </div>
                <div class="md:hidden flex-1 pr-6">
                    <div class="flex items-center">
                        <p class="font-bold text-xs text-gray-800 leading-tight ${u?"line-through text-gray-400":""}">${d.description}</p>
                        ${P}
                    </div>
                    ${I}
                </div>
            </div>

            <div class="md:col-span-3 hidden md:flex flex-col justify-center min-w-0">
                <div class="flex items-center">
                    <p class="font-bold text-xs text-gray-800 truncate ${u?"line-through text-gray-400":""}" title="${d.description}">${d.description}</p>
                    ${P}
                </div>
                ${I}
                <div class="flex items-center gap-1.5 mt-0.5">
                    ${$}
                    ${j}
                </div>
            </div>

            <div class="md:col-span-2 hidden md:flex flex-col justify-center min-w-0">
                <p class="text-[9px] text-gray-600 font-bold truncate" title="Natureza: ${f}"><i class="bi bi-tag opacity-50 mr-1"></i> ${f}</p>
                <p class="text-[9px] text-gray-400 truncate mt-0.5" title="Centro: ${h}"><i class="bi bi-diagram-3 opacity-50 mr-1"></i> ${h}</p>
            </div>

            <div class="md:col-span-1 hidden md:flex items-center">
                ${S}
            </div>

            <div class="md:hidden flex flex-wrap items-center gap-1.5 mt-1 ml-11">
                ${$}
                <span class="text-[8px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 font-bold border border-gray-200 flex items-center">
                    <i class="bi bi-tag mr-1 opacity-50"></i> ${f}
                </span>
                ${S}
            </div>

            <div class="md:col-span-1 md:text-center flex justify-start md:justify-center mt-1.5 md:mt-0 ml-11 md:ml-0">
                ${b}
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:justify-end mt-1.5 md:mt-0 ml-11 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-gray-400 uppercase tracking-wide">Valor:</span>
                <p class="font-black text-sm ${u?"text-gray-400":l}">${we(d.amount)}</p>
            </div>

            <div class="absolute right-1 bottom-1 md:relative md:right-auto md:bottom-auto md:col-span-1 md:flex md:justify-center z-10 flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-white/90 md:bg-transparent rounded px-1">
                ${u?"":`
                    <button data-action="mark-as-paid" data-type="${n}" data-id="${d.id}" class="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors" title="Dar Baixa">
                        <i class="bi bi-check2-all text-sm"></i>
                    </button>
                `}
                <button data-action="delete" data-type="${n}" data-id="${d.id}" class="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Excluir">
                    <i class="bi bi-trash3 text-[10px]"></i>
                </button>
            </div>
        </div>
        `}).join("")}async function tc(t,e){const a=new Date().toISOString().split("T")[0];try{await(t==="payable"?Tn(e,a):An(e,a)),m("Baixa Realizada","O lançamento foi registado como pago.","success"),await Fe()}catch(s){m("Erro",s.message,"error")}}async function ac(t,e){if(!!!e.recurrenceId){await Y("Excluir Lançamento","Tem certeza? Essa ação apagará o registo do seu fluxo de caixa.")&&await $r(t,[e.id]);return}sc(t,e)}function sc(t,e){const a=document.getElementById("genericModal"),o=(t==="payable"?w.payables:w.receivables).filter(d=>d.recurrenceId===e.recurrenceId).sort((d,c)=>new Date(d.dueDate)-new Date(c.dueDate));a.innerHTML=`
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
                ${o.map(d=>{const c=d.id===e.id,u=d.status==="paid",p=hr(d.dueDate);return`
                    <label class="flex items-center gap-4 p-3 bg-white rounded-xl border ${c?"border-red-400 ring-1 ring-red-100 shadow-sm bg-red-50/30":"border-gray-200 hover:bg-gray-50"} cursor-pointer transition-all">
                        <input type="checkbox" class="modal-item-checkbox w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" value="${d.id}" ${c?"checked":""}>
                        
                        <div class="flex-shrink-0 w-11 h-11 bg-white rounded-lg flex flex-col items-center justify-center border border-gray-200 shadow-sm">
                            <span class="text-sm font-black text-gray-800 leading-none">${p.day}</span>
                            <span class="text-[8px] font-bold text-gray-500 uppercase leading-none mt-1">${p.month}</span>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-bold text-gray-800 truncate">${d.description}</p>
                            <p class="text-xs font-medium text-gray-500 mt-0.5">${we(d.amount)} ${u?'<span class="text-emerald-600 font-bold ml-1">(Baixado)</span>':""}</p>
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
    `,a.style.display="flex";const r=a.querySelector("#modal-select-all"),i=a.querySelectorAll(".modal-item-checkbox"),n=a.querySelector("#confirm-batch-delete");r.addEventListener("change",d=>{i.forEach(c=>c.checked=d.target.checked),l()}),i.forEach(d=>d.addEventListener("change",l));function l(){const d=Array.from(i).filter(c=>c.checked).length;n.innerHTML=d>0?`<i class="bi bi-trash3"></i> Excluir ${d} Parcela(s)`:"Selecione para excluir",n.disabled=d===0,d===0?n.classList.add("opacity-50","cursor-not-allowed","bg-gray-400"):n.classList.remove("opacity-50","cursor-not-allowed","bg-gray-400")}n.addEventListener("click",async()=>{const d=Array.from(i).filter(u=>u.checked).map(u=>u.value);if(d.length===0)return;a.style.display="none",await Y("Confirmar Ação",`Tem certeza que deseja apagar estas ${d.length} parcelas permanentemente?`)&&await $r(t,d)}),l()}async function $r(t,e){try{e.length===1?t==="payable"?await Dn(e[0]):await Bn(e[0]):await zo(t==="payable"?"payables":"receivables",e),m("Sucesso",`${e.length} registo(s) limpo(s) do sistema.`,"success"),w.selectedIds.clear(),Ge(),await Fe()}catch(a){m("Erro",a.message,"error")}}async function oc(t,e){const s=t==="nature"?En:Ln;if(await Y("Apagar Categoria","Tem certeza? Apagar um item pai também apagará as suas subcategorias."))try{await s(e),Za(t==="nature"?"nature":"cost-center")}catch(r){m("Erro",r.message,"error")}}function rc(){const t=document.getElementById("genericModal");t.innerHTML=`
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
    `,t.style.display="flex"}function Da(t,e=null){const a=document.getElementById("genericModal"),s=t==="payable",o=s?"red":"emerald",r=e?"Editar Lançamento":"Novo Lançamento",i=w.establishments.map(D=>{const B=e?e.establishmentId===D.id:D.id===g.establishmentId;return`<option value="${D.id}" ${B?"selected":""}>${D.type==="Matriz"?"🏢":"📍"} ${D.name}</option>`}).join(""),n=(D,B)=>{let j='<option value="">-- Selecione --</option>';const I=$s(D),L=(H,V=0)=>{const U="  ".repeat(V)+(V>0?"↳ ":""),T=H.id===B?"selected":"";j+=`<option value="${H.id}" ${T}>${U}${H.name}</option>`,H.children.forEach(W=>L(W,V+1))};return I.forEach(H=>L(H)),j},d=[{value:"dinheiro",label:"Dinheiro"},{value:"pix",label:"PIX"},{value:"cartao_credito",label:"Cartão de Crédito"},{value:"cartao_debito",label:"Cartão de Débito"},{value:"transferencia",label:"Transferência Bancária"},{value:"boleto",label:"Boleto"},{value:"outros",label:"Outros"}].map(D=>`<option value="${D.value}" ${e?.paymentMethod===D.value?"selected":""}>${D.label}</option>`).join(""),c=`
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
                                ${d}
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
        </div>`,a.style.display="flex";const u=a.querySelector("#financial-form");let p="single",b=2;const f=u.querySelector('[name="amount"]'),h=u.querySelector("#recurrence-options"),y=u.querySelector("#recurrence-summary"),S=u.querySelector("#installments-input"),P=u.querySelector("#status-toggle"),N=u.querySelector("#payment-date-wrapper"),$=u.querySelector('[name="paymentDate"]'),E=()=>{if(p==="single")return;const D=parseFloat(f.value)||0;if(b=parseInt(S.value)||2,D===0){y.innerHTML='<span class="text-[10px] text-indigo-400 font-medium">Digite o valor total...</span>';return}if(p==="installment"){const B=D/b;y.innerHTML=`
                <div>
                    <span class="block text-[9px] text-indigo-400 uppercase tracking-widest font-bold mb-0.5">Simulação do Parcelamento</span>
                    <span class="font-bold text-sm text-indigo-700 block leading-tight">${b}x de ${we(B)}</span>
                    <span class="text-[10px] text-indigo-500 font-medium">Total: ${we(D)}</span>
                </div>
            `}else if(p==="repeat"){const B=D*b;y.innerHTML=`
                <div>
                    <span class="block text-[9px] text-indigo-400 uppercase tracking-widest font-bold mb-0.5">Geração Recorrente Fixa</span>
                    <span class="font-bold text-sm text-indigo-700 block leading-tight">${b}x de ${we(D)}</span>
                    <span class="text-[10px] text-indigo-500 font-medium">Lançamento Total: ${we(B)}</span>
                </div>
            `}};u.addEventListener("click",D=>{const B=D.target.closest(".mode-btn");if(B&&!e)if(D.preventDefault(),u.querySelectorAll(".mode-btn").forEach(L=>{L.classList.remove("bg-gray-900","text-white","shadow-sm"),L.classList.add("text-gray-500","hover:bg-gray-100")}),B.classList.add("bg-gray-900","text-white","shadow-sm"),B.classList.remove("text-gray-500","hover:bg-gray-100"),p=B.dataset.mode,p==="single")h.style.display="none";else{h.style.display="block";const L=h.querySelector("#recurrence-label");L&&(L.textContent=p==="installment"?"Número de Parcelas":"Repetir por quantos meses?"),E()}if(D.target.closest("#btn-minus")&&S){D.preventDefault();let L=parseInt(S.value)||2;L>2&&(S.value=L-1,E())}if(D.target.closest("#btn-plus")&&S){D.preventDefault();let L=parseInt(S.value)||2;L<60&&(S.value=L+1,E())}}),f.addEventListener("input",E),S&&S.addEventListener("input",E),P.addEventListener("change",()=>{P.checked?(N.classList.remove("hidden"),$.required=!0):(N.classList.add("hidden"),$.required=!1)}),u.addEventListener("submit",async D=>{D.preventDefault();const B=u.querySelector('button[type="submit"]'),j=B.innerHTML;B.disabled=!0,B.innerHTML='<div class="loader-small border-white"></div> A gravar...';const I=new FormData(u),L=P.checked,H=parseFloat(I.get("amount"));let V=H,U=1;!e&&p!=="single"&&(U=parseInt(I.get("installments")),p==="repeat"&&(V=H*U));const T={establishmentId:I.get("establishmentId"),description:I.get("description"),amount:V,dueDate:I.get("dueDate"),naturezaId:I.get("naturezaId")||null,centroDeCustoId:I.get("centroDeCustoId")||null,entity:I.get("entity")||null,paymentMethod:I.get("paymentMethod")||null,documentNumber:I.get("documentNumber")||null,notes:I.get("notes"),status:L?"paid":"pending",paymentDate:L?I.get("paymentDate"):null,installments:U};U>1&&!e&&(T.recurrenceId=self.crypto.randomUUID());try{e?(await(s?Cn(e.id,T):Pn(e.id,T)),m("Sucesso","Atualizado com sucesso!","success")):(await(s?Vo(T):Wo(T)),m("Sucesso","Lançamento criado!","success")),document.getElementById("genericModal").style.display="none",Fe()}catch(W){m("Erro",W.message||"Erro ao salvar","error"),B.disabled=!1,B.innerHTML=j}})}const ic=t=>C("/api/commissions/calculate",{method:"POST",body:JSON.stringify(t)}),nc=t=>C("/api/commissions/save",{method:"POST",body:JSON.stringify(t)}),lc=(t,e)=>{const a=new URLSearchParams({startDate:t,endDate:e}).toString();return C(`/api/commissions/stats?${a}`)},dc=(t={})=>{Object.keys(t).forEach(s=>(t[s]===void 0||t[s]===null||t[s]==="")&&delete t[s]);const e=new URLSearchParams(t).toString(),a=`/api/commissions/history${e?"?"+e:""}`;return C(a)},Sr=t=>C(`/api/commissions/report/${t}`,{method:"DELETE"}),Ka=new Date,cc=new Date(Ka.getFullYear(),Ka.getMonth(),1);let A={professionals:[],reports:[],calculationResult:null,periodString:"",establishments:[],filterEstablishmentIds:new Set,establishmentConfig:null,selectedIds:new Set,startDate:cc.toISOString().split("T")[0],endDate:Ka.toISOString().split("T")[0],professionalId:"all",searchQuery:"",stats:{revenue:0,commissions:0,margin:0,netPaid:0},viewMode:"list"},Ut=null;const uc=document.getElementById("content");function $t(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function pc(t){return t?new Date(t).toLocaleDateString("pt-BR"):"--/--/----"}function na(t){if(!t)return"PR";const e=t.trim().split(" ");return e.length>=2?(e[0][0]+e[e.length-1][0]).toUpperCase():t.substring(0,2).toUpperCase()}function Er(){const t=document.getElementById("commissions-layout-main"),e=document.getElementById("commissions-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&(t.style.display="none"),e&&(e.classList.remove("hidden"),e.classList.add("flex")),a&&window.innerWidth<768&&(a.style.display="none")}function Ss(){const t=document.getElementById("commissions-layout-main"),e=document.getElementById("commissions-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&(t.style.display="flex"),e&&(e.classList.add("hidden"),e.classList.remove("flex")),a&&window.innerWidth<768&&(a.style.display=""),A.viewMode="list"}async function bc(){try{const[t,e,a]=await Promise.all([$e(g.establishmentId),fe().catch(()=>({matrizes:[]})),Be(g.establishmentId).catch(()=>({}))]);A.professionals=t,A.establishmentConfig=a||{};const s=e.matrizes||[];A.establishments=[],s.forEach(o=>{A.establishments.push({id:o.id,name:o.name,type:"Matriz"}),o.branches&&o.branches.forEach(r=>A.establishments.push({id:r.id,name:r.name,type:"Filial"}))}),A.filterEstablishmentIds.size===0&&A.filterEstablishmentIds.add(g.establishmentId)}catch(t){console.error("Erro na inicialização de comissões",t)}A.viewMode="list",gc(),fc(),await rt()}function gc(){const t=A.professionals.map(a=>`<option value="${a.id}">${a.name}</option>`).join(""),e=A.establishments.map(a=>`
        <label class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border ${A.filterEstablishmentIds.has(a.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-gray-200 text-gray-600"} rounded-lg cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none flex-shrink-0">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${a.id}" ${A.filterEstablishmentIds.has(a.id)?"checked":""}>
            <span class="text-[10px] font-bold whitespace-nowrap">${a.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${a.name}</span>
        </label>
    `).join("");uc.innerHTML=`
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

            ${A.establishments.length>1?`
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
                    <input type="date" id="filter-start" value="${A.startDate}" class="w-full bg-transparent text-[10px] font-bold text-gray-700 outline-none">
                    <span class="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Até</span>
                    <input type="date" id="filter-end" value="${A.endDate}" class="w-full bg-transparent text-[10px] font-bold text-gray-700 outline-none">
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
    `}async function rt(){const t=document.getElementById("list-container");t&&(t.innerHTML='<div class="flex justify-center py-20"><div class="loader"></div></div>');const e=Array.from(A.filterEstablishmentIds).join(",");try{const[a,s]=await Promise.all([dc({startDate:A.startDate,endDate:A.endDate,professionalId:A.professionalId,establishmentId:e}),lc(A.startDate,A.endDate,e)]);A.reports=a||[];const o=A.reports.reduce((r,i)=>r+(i.summary.finalValue||i.summary.totalCommission),0);A.stats={revenue:s.totalRevenue||0,commissions:s.totalCommissionsPaid||0,margin:s.totalRevenue>0?((s.totalRevenue-s.totalCommissionsPaid)/s.totalRevenue*100).toFixed(1):0,netPaid:o},A.selectedIds.clear(),St(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),mc(),Ir()}catch(a){console.error(a),t&&(t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-xs font-medium">Erro ao carregar dados.</p>
            </div>`)}}function mc(){const t=document.getElementById("kpi-revenue"),e=document.getElementById("kpi-commissions"),a=document.getElementById("kpi-margin"),s=document.getElementById("kpi-net");t&&(t.textContent=$t(A.stats.revenue)),e&&(e.textContent=$t(A.stats.commissions)),a&&(a.textContent=`${A.stats.margin}%`),s&&(s.textContent=$t(A.stats.netPaid))}function Ir(){const t=document.getElementById("list-container");if(!t)return;let e=A.reports;if(A.searchQuery){const a=A.searchQuery.toLowerCase();e=e.filter(s=>s.professionalName.toLowerCase().includes(a)||s.period.toLowerCase().includes(a))}if(e.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 text-center">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-receipt text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-700 mb-1">Nenhum pagamento encontrado</h3>
                <p class="text-[10px] text-gray-400 max-w-xs">Não há relatórios gerados para este período ou profissional.</p>
            </div>
        `;return}t.innerHTML=e.map(a=>{const s=pc(a.createdAt),o=a.summary.totalCommission,r=a.summary.extraDebit||0,i=a.summary.extraCredit||0,n=a.summary.finalValue||o,l=A.selectedIds.has(a.id);let d="";return r>0&&i>0?d=`<span class="text-red-500">-R$${r.toFixed(2)}</span> / <span class="text-emerald-500">+R$${i.toFixed(2)}</span>`:r>0?d=`<span class="text-red-500">-R$ ${r.toFixed(2)}</span>`:i>0?d=`<span class="text-emerald-500">+R$ ${i.toFixed(2)}</span>`:d='<span class="text-gray-300">--</span>',`
        <div class="border-b border-gray-100 hover:bg-gray-50 transition-colors relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-3 md:px-3 md:py-2 mb-2 md:mb-0 bg-white md:bg-transparent rounded-xl md:rounded-none shadow-sm md:shadow-none border md:border-b ${l?"bg-indigo-50/40":""}">
            
            <div class="absolute right-2 top-2 md:relative md:right-auto md:top-auto md:col-span-3 md:flex md:items-center md:gap-2 z-10">
                <input type="checkbox" value="${a.id}" class="item-checkbox w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${l?"checked":""}>
                <div class="hidden md:flex items-center gap-2 pr-2">
                    <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm border border-indigo-200">
                        ${na(a.professionalName)}
                    </div>
                    <div class="min-w-0">
                        <p class="font-bold text-xs text-gray-800 truncate" title="${a.professionalName}">${a.professionalName}</p>
                        <p class="text-[9px] text-gray-400 font-medium truncate mt-0.5">Gerado: ${s}</p>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-2 md:hidden mb-2 pr-8">
                <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm border border-indigo-200">
                    ${na(a.professionalName)}
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
                <span class="text-[10px] font-bold">${d}</span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block pt-1 md:pt-0 border-t md:border-0 border-gray-100 ml-10 md:ml-0 mt-1 md:mt-0">
                <span class="md:hidden text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Líquido Pago:</span>
                <span class="text-xs font-black text-emerald-600">${$t(n)}</span>
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
        `}).join("")}function fc(){Ut&&document.body.removeEventListener("click",Ut),Ut=i=>{const n=i.target;if(n.classList.contains("item-checkbox")){const d=n.value;n.checked?A.selectedIds.add(d):A.selectedIds.delete(d),St(),i.stopPropagation();return}const l=n.closest("button[data-action]");if(l){i.preventDefault();const d=l.dataset.action,c=l.dataset.id;switch(d){case"apply-filters":A.startDate=document.getElementById("filter-start").value,A.endDate=document.getElementById("filter-end").value,A.professionalId=document.getElementById("filter-prof").value,rt();break;case"new-calculation":xc();break;case"print-receipt":Ec(c);break;case"delete-report":Lc(c);break;case"view-report-details":$c(c);break;case"close-detail-screen":Ss();break;case"toggle-all-profs":const u=document.querySelectorAll(".prof-checkbox"),p=Array.from(u).every(y=>y.checked);u.forEach(y=>y.checked=!p);break;case"calculate-preview":hc();break;case"save-final-reports":kc();break;case"toggle-preview-details":const b=l.dataset.idx,f=document.getElementById(`preview-details-${b}`),h=l.querySelector("i");f&&(f.classList.contains("hidden")?(f.classList.remove("hidden"),h&&h.classList.replace("bi-chevron-down","bi-chevron-up")):(f.classList.add("hidden"),h&&h.classList.replace("bi-chevron-up","bi-chevron-down")));break}}},document.body.addEventListener("click",Ut);const t=document.getElementById("search-input");t&&t.addEventListener("input",i=>{A.searchQuery=i.target.value,Ir()}),document.body.addEventListener("input",i=>{(i.target.classList.contains("input-debit")||i.target.classList.contains("input-credit")||i.target.classList.contains("input-notes"))&&yc(i.target.dataset.idx)});const e=document.getElementById("select-all-toggle");e&&e.addEventListener("change",i=>{const n=i.target.checked,l=document.querySelectorAll(".item-checkbox");A.selectedIds.clear(),l.forEach(d=>{d.checked=n,n&&A.selectedIds.add(d.value)}),St()});const a=document.getElementById("cancel-selection-btn");a&&a.addEventListener("click",()=>{A.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(i=>i.checked=!1),St()});const s=document.getElementById("batch-delete-btn");s&&s.addEventListener("click",Ic);const o=document.getElementById("establishment-filters-container");o&&o.addEventListener("change",i=>{if(i.target.classList.contains("est-filter-checkbox")){const n=i.target.closest("label");i.target.checked?(A.filterEstablishmentIds.add(i.target.value),n.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),n.classList.remove("border-gray-200","text-gray-600")):(A.filterEstablishmentIds.delete(i.target.value),n.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),n.classList.add("border-gray-200","text-gray-600")),rt()}});const r=document.getElementById("export-excel-btn");r&&r.addEventListener("click",Sc)}function St(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=A.selectedIds.size;e&&(e.textContent=a),t&&(a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function xc(){A.viewMode="new-calc";const t=document.getElementById("commissions-layout-detail");if(!t)return;const e=new Date().toISOString().split("T")[0],a=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],s=A.professionals.map(r=>`
        <label class="flex items-center p-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-indigo-300 transition-all cursor-pointer group mb-1.5">
            <input type="checkbox" value="${r.id}" class="prof-checkbox w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
            <div class="ml-3 flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg border border-gray-100 bg-gray-50 text-gray-500 flex items-center justify-center text-[10px] font-black group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shadow-sm">${na(r.name)}</div>
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
    `,Er()}async function hc(){const t=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(d=>d.value);if(t.length===0)return m("Atenção","Selecione pelo menos um profissional.","warning");const e=Array.from(A.filterEstablishmentIds).join(","),a=document.getElementById("calc-start-date"),s=document.getElementById("calc-end-date");if(!a||!s||!a.value||!s.value)return m("Atenção","As datas de início e fim são obrigatórias.","warning");const o={professionalIds:t,startDate:a.value,endDate:s.value,establishmentId:e,calculationTypes:{services:document.getElementById("calc-type-services")?.checked||!1,products:document.getElementById("calc-type-products")?.checked||!1,packages:document.getElementById("calc-type-packages")?.checked||!1}},r=new Date(o.startDate+"T00:00:00").toLocaleDateString("pt-BR"),i=new Date(o.endDate+"T00:00:00").toLocaleDateString("pt-BR");A.periodString=`${r} a ${i}`;const n=document.getElementById("btn-calc-action"),l=n.innerHTML;n.innerHTML='<div class="loader-small border-white mr-2"></div> Processando...',n.disabled=!0;try{const d=await ic(o);A.calculationResult=d.map(c=>({...c,extraDebit:0,extraCredit:0,finalValue:c.summary.totalCommission,notes:""})),vc()}catch(d){m("Erro na Apuração",d.message,"error"),n.innerHTML=l,n.disabled=!1}}function vc(){A.viewMode="preview-calc";const t=A.calculationResult;if(!t||t.length===0||t.every(i=>i.summary.totalCommission===0)){m("Aviso","Nenhuma comissão encontrada para os filtros selecionados.","info");const i=document.getElementById("btn-calc-action");i.innerHTML='<i class="bi bi-calculator text-lg"></i> Calcular Vendas',i.disabled=!1;return}const e=document.getElementById("calc-step-1"),a=document.getElementById("calc-step-2"),s=document.getElementById("btn-calc-action");e&&e.classList.add("hidden"),a&&a.classList.remove("hidden"),s&&(s.dataset.action="save-final-reports",s.className="w-full md:w-auto py-3.5 px-8 bg-emerald-600 text-white font-black text-sm rounded-xl hover:bg-emerald-700 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider",s.innerHTML='<i class="bi bi-check2-circle text-lg"></i> Confirmar Pagtos.',s.disabled=!1);const o=t.reduce((i,n)=>i+n.finalValue,0),r=t.map((i,n)=>{if(i.summary.totalCommission===0)return"";const l=(i.items||[]).map(c=>`
            <tr class="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td class="py-2.5 truncate max-w-[120px] text-gray-800 font-bold" title="${c.item}">${c.item}</td>
                <td class="py-2.5 text-gray-500 font-medium">${c.client||"--"}</td>
                <td class="py-2.5 text-right text-gray-600 font-bold">R$ ${(c.value||0).toFixed(2)}</td>
                <td class="py-2.5 text-center text-gray-600 font-bold">${c.commissionRate}%</td>
                <td class="py-2.5 text-right font-black text-emerald-600">R$ ${(c.commissionValue||0).toFixed(2)}</td>
            </tr>
        `).join(""),d=`
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
                        <tbody class="bg-white">${l||'<tr><td colspan="5" class="py-4 text-center text-gray-400">Nenhum item</td></tr>'}</tbody>
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
                ${d}
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
                <span class="text-[10px] font-black bg-white/20 px-2.5 py-1.5 rounded-lg border border-white/30 shadow-sm flex items-center gap-1"><i class="bi bi-calendar3"></i> ${A.periodString}</span>
            </div>
        </div>
        ${r}
    `)}function yc(t){const e=document.querySelector(`.input-debit[data-idx="${t}"]`),a=document.querySelector(`.input-credit[data-idx="${t}"]`),s=document.querySelector(`.input-notes[data-idx="${t}"]`);let o=parseFloat(e?.value)||0,r=parseFloat(a?.value)||0,i=s?.value||"";if(A.calculationResult&&A.calculationResult[t]){const n=A.calculationResult[t];n.extraDebit=o,n.extraCredit=r,n.notes=i,n.finalValue=n.summary.totalCommission-o+r;const l=document.querySelector(`.final-value-display[data-idx="${t}"]`);l&&(l.innerText=`R$ ${n.finalValue.toFixed(2)}`),wc()}}function wc(){const t=A.calculationResult.reduce((a,s)=>a+s.finalValue,0),e=document.getElementById("grand-total-preview");e&&(e.innerText=`R$ ${t.toFixed(2)}`)}async function kc(){const t=A.calculationResult.filter(o=>o.summary.totalCommission>0),e=t.length;if(e===0)return m("Aviso","Não há valores para pagar.","info");if(!await Y("Confirmar Pagamentos",`Você está prestes a gerar recibos e marcar as vendas de ${e} profissional(is) como PAGAS. Essa ação lançará a despesa correspondente no Financeiro. Confirmar?`))return;const s=document.getElementById("btn-calc-action");s.innerHTML='<div class="loader-small border-white mr-2"></div> Finalizando...',s.disabled=!0;try{const o=t.map(async r=>{const i=(r.items||[]).map(n=>n.originalSaleId).filter(n=>n!=null);await nc({professionalId:r.professionalId,professionalName:r.professionalName,period:A.periodString,processedSalesIds:i,establishmentId:g.establishmentId,reportData:{...r,summary:{...r.summary,finalValue:r.finalValue,extraDebit:r.extraDebit||0,extraCredit:r.extraCredit||0,notes:r.notes||""}}});try{if(r.finalValue>0){const n=A.establishmentConfig||{},l=n.defaultDespesaNaturezaId||n.financeConfig?.despesaNaturezaId||null,d=n.defaultDespesaCentroCustoId||n.financeConfig?.despesaCentroCustoId||null;await Vo({establishmentId:g.establishmentId,description:`Comissões - ${r.period}`,amount:r.finalValue,dueDate:new Date().toISOString().split("T")[0],naturezaId:l,centroDeCustoId:d,entity:r.professionalName,paymentMethod:"dinheiro",status:"paid",paymentDate:new Date().toISOString().split("T")[0],origin:"commission"})}}catch(n){console.error("Erro ao integrar com financeiro (Despesa):",n)}});await Promise.all(o),m("Sucesso","Pagamentos registrados e integrados ao financeiro!","success"),A.calculationResult=null,Ss(),await rt()}catch(o){m("Erro ao Salvar",o.message,"error"),s.innerHTML='<i class="bi bi-check2-circle text-lg"></i> Confirmar Pagtos.',s.disabled=!1}}function $c(t){A.viewMode="report-details";const e=document.getElementById("commissions-layout-detail");if(!e)return;const a=A.reports.find(u=>u.id===t);if(!a)return;const s=a.reportData?.items||a.items||[],o=a.summary,r=o.extraDebit||0,i=o.extraCredit||0,n=o.notes||"",l=`
        <div class="p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner transition-transform active:scale-95">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <h3 class="font-black text-base text-gray-800 ml-4 uppercase tracking-wider">Detalhes do Recibo</h3>
        </div>
    `,d=s.map(u=>`
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
        ${l}
        <div class="flex-grow overflow-y-auto p-4 pb-28 custom-scrollbar bg-gray-50/50">
            <div class="flex flex-col md:flex-row justify-between md:items-center bg-indigo-50 p-5 rounded-2xl border border-indigo-200 mb-4 gap-4 shadow-sm relative overflow-hidden">
                <div class="absolute right-0 top-0 bottom-0 w-2 bg-indigo-500"></div>
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-xl bg-white text-indigo-600 flex items-center justify-center font-black text-xl flex-shrink-0 shadow-sm border border-indigo-100">
                        ${na(a.professionalName)}
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
                        <tbody>${d||'<tr><td colspan="5" class="text-center py-8 text-gray-400 font-bold text-sm">Nenhum item detalhado neste recibo.</td></tr>'}</tbody>
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
    `,Er()}function Sc(){if(A.reports.length===0){m("Aviso","Não há dados para exportar com os filtros atuais.","info");return}let t=A.reports;if(A.searchQuery){const a=A.searchQuery.toLowerCase();t=t.filter(s=>s.professionalName.toLowerCase().includes(a)||s.period.toLowerCase().includes(a))}const e=t.map(a=>{const s=a.summary.totalCommission,o=a.summary.extraDebit||0,r=a.summary.extraCredit||0,i=a.summary.finalValue||s;return{"Data da Apuração":new Date(a.createdAt).toLocaleDateString("pt-BR"),Profissional:a.professionalName,"Período Base":a.period,"Itens Calculados":a.summary.totalItems||0,"Valor Bruto (R$)":s,"Bônus (R$)":r,"Descontos (R$)":o,"Líquido Pago (R$)":i,"Observações/Motivo":a.summary.notes||""}});try{if(typeof XLSX>"u"){m("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const a=XLSX.utils.json_to_sheet(e),s=XLSX.utils.book_new();XLSX.utils.book_append_sheet(s,a,"Comissoes");const o=`Relatorio_Comissoes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(s,o)}catch(a){console.error(a),m("Erro","Falha ao exportar Excel.","error")}}function Ec(t){const e=A.reports.find(c=>c.id===t);if(!e)return;if(!window.jspdf){m("Erro","A biblioteca de PDF não foi carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a;s.setFillColor(79,70,229),s.rect(0,0,210,40,"F"),s.setTextColor(255,255,255),s.setFontSize(22),s.setFont(void 0,"bold"),s.text("RECIBO DE COMISSÕES",105,20,{align:"center"}),s.setFontSize(10),s.text(`Data de Emissão: ${new Date().toLocaleDateString("pt-BR")}`,105,28,{align:"center"}),s.setTextColor(50,50,50),s.setFontSize(11),s.setFont(void 0,"normal"),s.text("Profissional:",15,55),s.setFont(void 0,"bold"),s.text(e.professionalName,40,55),s.setFont(void 0,"normal"),s.text("Período:",130,55),s.setFont(void 0,"bold"),s.text(e.period,147,55);const o=e.reportData?.items||e.items||[];let r=70;if(o.length>0){const c=o.map(u=>[u.item||"Item",u.client||"--",`R$ ${(u.value||0).toFixed(2)}`,`${u.commissionRate||0}%`,`R$ ${(u.commissionValue||0).toFixed(2)}`]);s.autoTable({startY:r,head:[["Serviço/Produto","Cliente","Valor Base","Taxa","Comissão"]],body:c,theme:"striped",headStyles:{fillColor:[249,250,251],textColor:[75,85,99],fontStyle:"bold"},styles:{fontSize:8},columnStyles:{2:{halign:"right"},3:{halign:"center"},4:{halign:"right",fontStyle:"bold",textColor:[5,150,105]}}}),r=s.lastAutoTable.finalY+15}const i=e.summary,n=i.finalValue||i.totalCommission,l=[["Comissões Brutas (Soma dos Itens)",`R$ ${i.totalCommission.toFixed(2)}`]];i.extraCredit>0&&l.push(["(+) Bônus Extras",`R$ ${i.extraCredit.toFixed(2)}`]),i.extraDebit>0&&l.push(["(-) Descontos / Vales",`R$ ${i.extraDebit.toFixed(2)}`]),s.autoTable({startY:r,head:[["Resumo do Fechamento","Valor"]],body:l,theme:"grid",headStyles:{fillColor:[79,70,229],textColor:[255,255,255]},columnStyles:{1:{halign:"right",fontStyle:"bold"}}});const d=s.lastAutoTable.finalY+15;s.setFillColor(236,253,245),s.rect(120,d-8,75,15,"F"),s.setTextColor(5,150,105),s.setFontSize(14),s.setFont(void 0,"bold"),s.text(`Total Líquido: R$ ${n.toFixed(2)}`,190,d,{align:"right"}),i.notes&&(s.setTextColor(100,100,100),s.setFontSize(9),s.setFont(void 0,"normal"),s.text(`Obs/Motivo: ${i.notes}`,15,d+10)),s.setTextColor(150,150,150),s.setFontSize(9),s.line(20,d+40,90,d+40),s.text("Assinatura da Empresa",55,d+45,{align:"center"}),s.line(120,d+40,190,d+40),s.text("Assinatura do Profissional",155,d+45,{align:"center"}),s.save(`Recibo_Comissoes_${e.professionalName.replace(/\s+/g,"_")}.pdf`)}async function Ic(){const t=A.selectedIds.size;if(!(t===0||!await Y("Excluir Recibos",`Deseja excluir e estornar ${t} recibo(s)? As vendas associadas voltarão ao status "A Apurar".`)))try{const a=Array.from(A.selectedIds).map(s=>Sr(s));await Promise.all(a),m("Sucesso",`${t} recibos excluídos com sucesso.`,"success"),A.selectedIds.clear(),St(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),await rt()}catch{m("Erro ao Excluir","Ocorreu um erro ao excluir alguns recibos.","error")}}async function Lc(t){if(await Y("Excluir Recibo",'ATENÇÃO: Deseja realmente excluir este recibo? As vendas associadas a ele voltarão ao status "A Apurar" e o valor será subtraído dos relatórios. Esta ação não pode ser desfeita.'))try{await Sr(t),m("Sucesso","Recibo cancelado com sucesso. Vendas estornadas para apuração.","success"),Ss(),await rt()}catch(a){m("Erro ao Excluir",a.message,"error")}}const Te=document.getElementById("content");let O={allPackages:[],catalogForModal:{services:[],products:[]},establishments:[],filterEstablishmentIds:new Set,searchQuery:"",statusFilter:"all",viewMode:"list",tempPackage:null},_e=null;function it(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function Cc(){const t=O.allPackages.length,e=O.allPackages.filter(r=>r.status!=="inactive"),a=e.length,s=a>0?e.reduce((r,i)=>r+(i.price||0),0)/a:0;let o=0;return e.forEach(r=>{const i=r.originalPrice||0,n=r.price||0;if(i>0&&i>n){const l=(i-n)/i*100;l>o&&(o=l)}}),{total:t,activeCount:a,avgPrice:s,maxDiscount:o}}function Dc(){const t=document.getElementById("packages-layout-main"),e=document.getElementById("packages-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&t.classList.add("mobile-detail-open"),e&&(e.classList.remove("hidden"),e.classList.add("flex")),a&&(a.style.display="none")}function es(){const t=document.getElementById("packages-layout-main"),e=document.getElementById("packages-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&t.classList.remove("mobile-detail-open"),e&&(e.classList.add("hidden"),e.classList.remove("flex")),a&&(a.style.display="")}async function Tc(){try{const e=(await fe().catch(()=>({matrizes:[]}))).matrizes||[];O.establishments=[],e.forEach(a=>{O.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>O.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),O.filterEstablishmentIds.size===0&&O.filterEstablishmentIds.add(g.establishmentId)}catch(t){console.error("Erro ao buscar hierarquia de empresas",t)}O.viewMode="list",Pc(),qc(),await la()}async function la(){const t=document.getElementById("packagesListContainer");t&&(t.innerHTML='<div class="col-span-full flex justify-center py-20"><div class="loader"></div></div>');try{const e=Array.from(O.filterEstablishmentIds).map(i=>gs(i).catch(()=>[])),a=await Promise.all(e),s=new Map;a.flat().forEach(i=>{s.has(i.id)||s.set(i.id,i)}),O.allPackages=Array.from(s.values());const[o,r]=await Promise.all([dt(g.establishmentId).catch(()=>[]),ct(g.establishmentId).catch(()=>[])]);O.catalogForModal={services:(o||[]).filter(i=>i.active),products:r||[]},Bc(),ts()}catch(e){console.error(e),t&&(t.innerHTML=`
                <div class="col-span-full flex flex-col items-center justify-center py-16 text-slate-500">
                    <i class="bi bi-exclamation-triangle text-4xl text-red-400 mb-3"></i>
                    <p class="text-xs font-bold">Erro ao carregar os pacotes. Tente novamente.</p>
                </div>
            `)}}function Pc(){const t=O.establishments.map(e=>`
        <label class="inline-flex items-center gap-1.5 px-2 py-1 bg-white border ${O.filterEstablishmentIds.has(e.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-slate-200 text-slate-600"} rounded-lg cursor-pointer hover:bg-slate-50 transition-all shadow-sm est-label select-none flex-shrink-0">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${e.id}" ${O.filterEstablishmentIds.has(e.id)?"checked":""}>
            <span class="text-[9px] font-bold whitespace-nowrap">${e.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${e.name}</span>
        </label>
    `).join("");Te.innerHTML=`
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
    `}function Bc(){const t=Cc(),e=document.getElementById("kpi-container");e&&(e.innerHTML=`
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
            <span class="text-xs md:text-lg font-black text-indigo-600 mt-0.5 w-full truncate">${it(t.avgPrice)}</span>
        </div>
    `)}function ts(){const t=document.getElementById("packagesListContainer");if(!t)return;let e=O.allPackages;if(O.statusFilter!=="all"){const s=O.statusFilter==="active";e=e.filter(o=>o.status!=="inactive"===s)}if(O.searchQuery){const s=O.searchQuery.toLowerCase();e=e.filter(o=>o.name.toLowerCase().includes(s)||(o.description||"").toLowerCase().includes(s))}if(e.length===0){t.innerHTML=`
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
        `;return}const a=new Map(O.establishments.map(s=>[s.id,s]));t.innerHTML=e.map(s=>{const o=s.status!=="inactive",r=s.price||0,i=s.originalPrice||0,n=i>0&&i>r?(i-r)/i*100:0,l=v(s.name),d=v(s.description||"Nenhuma descrição detalhada."),c=(s.items||[]).reduce((h,y)=>h+(y.quantity||1),0),u=s.validityDays?`${s.validityDays} dias p/ uso`:"Uso vitalício",p=s.sellEndDate?`Até ${new Date(s.sellEndDate).toLocaleDateString("pt-BR")}`:"Venda contínua",b=s.establishmentIds||(s.establishmentId?[s.establishmentId]:[]);let f="";if(b.length===1){const h=a.get(b[0]);h&&(f=`<span class="text-[8px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200 flex items-center w-max"><i class="bi ${h.type==="Matriz"?"bi-building":"bi-shop"} mr-1 opacity-50"></i> ${h.name}</span>`)}else b.length>1&&(f=`<span class="text-[8px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 flex items-center w-max"><i class="bi bi-buildings mr-1 opacity-50"></i> ${b.length} Unidades</span>`);return`
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
                    
                    <h3 class="text-base font-black text-slate-800 leading-tight line-clamp-1 mb-1">${l}</h3>
                    <p class="text-[10px] text-slate-500 line-clamp-2 min-h-[1.5rem] mb-3">${d}</p>

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
                            ${n>0?`<p class="text-[9px] text-slate-400 font-bold line-through mb-0.5">De ${it(i)}</p>`:""}
                            <p class="text-xl font-black text-slate-900 leading-none">${it(r)}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-[8px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-calendar-event mr-0.5"></i>${p}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}).join("")}function Ac(){if(O.allPackages.length===0){m("Aviso","Não há pacotes carregados para exportar.","info");return}let t=O.allPackages;if(O.statusFilter!=="all"){const s=O.statusFilter==="active";t=t.filter(o=>o.status!=="inactive"===s)}if(O.searchQuery){const s=O.searchQuery.toLowerCase();t=t.filter(o=>o.name.toLowerCase().includes(s)||(o.description||"").toLowerCase().includes(s))}if(t.length===0){m("Aviso","Nenhum pacote corresponde aos filtros atuais.","info");return}const e=new Map(O.establishments.map(s=>[s.id,s.name])),a=t.map(s=>{const o=s.originalPrice||0,r=s.price||0,i=o>0?(o-r)/o*100:0,n=(s.items||[]).map(c=>`${c.quantity}x ${c.name}`).join(" | ");return{"Unidade(s)":(s.establishmentIds||(s.establishmentId?[s.establishmentId]:[])).map(c=>e.get(c)).filter(Boolean).join(", ")||"Não identificada","Nome do Pacote":s.name,Status:s.status!=="inactive"?"Ativo":"Inativo",Descrição:s.description||"","Itens Incluídos":n,"Valor Original (R$)":o,"Preço de Venda (R$)":r,"Desconto (%)":i.toFixed(1)+"%","Comissão (%)":s.commissionRate||0,"Validade de Uso (Dias)":s.validityDays||"Vitalício","Vendas Início":s.sellStartDate?new Date(s.sellStartDate).toLocaleDateString("pt-BR"):"-","Vendas Fim":s.sellEndDate?new Date(s.sellEndDate).toLocaleDateString("pt-BR"):"-"}});try{if(typeof XLSX>"u"){m("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const s=XLSX.utils.json_to_sheet(a),o=XLSX.utils.book_new();XLSX.utils.book_append_sheet(o,s,"Pacotes");const r=`Relatorio_Pacotes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(o,r)}catch(s){console.error(s),m("Erro","Falha ao exportar Excel.","error")}}function Xs(t=null){O.viewMode="edit-package",O.tempPackage=t?JSON.parse(JSON.stringify(t)):{id:"",name:"",description:"",status:"active",items:[],price:"",originalPrice:0,commissionRate:0,validityDays:"",sellStartDate:"",sellEndDate:"",salesLimit:"",establishmentIds:[g.establishmentId]},ss(),Dc()}function Lr(){const t=document.getElementById("packages-layout-detail");if(!t)return;const a=(O.tempPackage.items||[]).reduce((n,l)=>n+(l.price||0)*(l.quantity||1),0),s=t.querySelector("#finalPrice"),o=t.querySelector("#discountIndicator"),r=t.querySelector("#originalPrice"),i=parseFloat(s?.value)||0;if(r&&(r.textContent=it(a)),o)if(a>0&&a>i&&i>0){const n=(a-i)/a*100;o.textContent=`${n.toFixed(0)}% OFF`,o.classList.remove("hidden")}else o.classList.add("hidden")}function as(){const t=document.getElementById("package-items-list");if(!t)return;const e=O.tempPackage.items||[];e.length===0?t.innerHTML=`
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
                        <span class="text-xs font-black text-slate-700">${it(a.price)}</span>
                    </div>
                    <button type="button" class="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors remove-item-btn" data-index="${s}">
                        <i class="bi bi-trash3 pointer-events-none"></i>
                    </button>
                </div>
            </div>
        `}).join(""),Lr()}function ss(){const t=document.getElementById("packages-layout-detail");if(!t)return;const e=O.tempPackage,a=!!e.id,s=v(e.name||""),o=v(e.description||""),r=e.price||"",i=e.commissionRate||0,n=e.validityDays||"",l=e.sellStartDate?new Date(e.sellStartDate).toISOString().split("T")[0]:"",d=e.sellEndDate?new Date(e.sellEndDate).toISOString().split("T")[0]:"",c=e.salesLimit||"",u=e.establishmentIds||[],p=O.establishments.map(f=>`
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
                                    <input type="date" id="sellStartDate" value="${l}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none text-[10px] font-bold text-slate-700 shadow-inner">
                                </div>
                                <div>
                                    <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Fim da Venda</label>
                                    <input type="date" id="sellEndDate" value="${d}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none text-[10px] font-bold text-slate-700 shadow-inner">
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
    `,as()}function Mc(){O.viewMode="select-item";const t=document.getElementById("packages-layout-detail");if(!t)return;const e=`
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
    `;const a=(o="")=>{const r=o.toLowerCase(),i={service:'<i class="bi bi-scissors text-indigo-600"></i>',product:'<i class="bi bi-box-seam text-emerald-600"></i>'},n={"catalog-service-list":{items:O.catalogForModal.services,type:"service"},"catalog-product-list":{items:O.catalogForModal.products,type:"product"}};Object.entries(n).forEach(([l,{items:d,type:c}])=>{const u=t.querySelector("#"+l);if(!u)return;const p=d.filter(h=>h.name.toLowerCase().includes(r)).slice(0,50),b=c==="service"?"hover:border-indigo-300 hover:bg-indigo-50/50":"hover:border-emerald-300 hover:bg-emerald-50/50",f=c==="service"?"bg-indigo-100 border-indigo-200":"bg-emerald-100 border-emerald-200";u.innerHTML=p.map(h=>h.id?`
                <button data-action="select-catalog-item" data-item-type="${c}" data-item-id="${h.id}" class="flex items-center gap-3 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl ${b} shadow-sm transition-all text-left group active:scale-95">
                    <div class="flex-shrink-0 w-9 h-9 rounded-lg ${f} flex items-center justify-center text-base border group-hover:scale-105 transition-transform">${i[c]}</div>
                    <div class="flex-grow min-w-0">
                        <span class="block text-xs font-bold text-slate-800 truncate">${v(h.name)}</span>
                        <span class="block font-black text-[10px] text-slate-500 mt-0.5">${it(h.price)}</span>
                    </div>
                    <i class="bi bi-plus-circle-fill text-indigo-500 text-lg opacity-20 group-hover:opacity-100 transition-opacity pr-1"></i>
                </button>
            `:"").join("")||'<p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center py-6 border border-dashed border-slate-200 rounded-xl">Vazio</p>'})};a();const s=t.querySelector("#item-search-input");s&&(s.addEventListener("input",debounce(o=>{a(o.target.value)},300)),setTimeout(()=>s.focus(),100))}function qc(){_e&&(Te.removeEventListener("click",_e),Te.removeEventListener("input",_e),Te.removeEventListener("change",_e)),_e=async e=>{const a=e.target.closest('[data-action="delete-package"]');if(a){e.stopPropagation(),e.preventDefault();const r=a.dataset.id;if(await Y("Excluir Pacote","Tem a certeza que deseja excluir este pacote promocional? Esta ação é irreversível."))try{await $n(r),m("Sucesso!","Pacote excluído.","success"),O.viewMode==="edit-package"&&O.tempPackage?.id===r&&(es(),O.viewMode="list"),await la()}catch(n){m("Erro",`Não foi possível excluir: ${n.message}`,"error")}return}const s=e.target.closest("[data-action]");if(!s)return;switch(s.dataset.action){case"new-package":Xs(null);break;case"edit-package":const r=s.dataset.id,i=O.allPackages.find(b=>b.id===r);i&&Xs(i);break;case"back-to-main":es(),O.viewMode="list",O.tempPackage=null;break;case"add-item-to-package-btn":Mc();break;case"back-to-editor":ss();break;case"select-catalog-item":const{itemType:n,itemId:l}=s.dataset,c=(O.catalogForModal[n+"s"]||[]).find(b=>b.id===l);if(c){const b=O.tempPackage.items.find(f=>f.id===c.id&&f.type===n);b?b.quantity++:O.tempPackage.items.push({...c,type:n,quantity:1}),ss()}break;case"toggle-all-ests":const u=document.querySelectorAll(".modal-est-checkbox"),p=Array.from(u).every(b=>b.checked);u.forEach(b=>b.checked=!p);break;case"save-package":await jc(s);break}},Te.addEventListener("click",_e),Te.addEventListener("input",e=>{e.target.id==="search-packages"&&(O.searchQuery=e.target.value,ts()),e.target.id==="finalPrice"&&Lr()}),Te.addEventListener("change",e=>{if(e.target.id==="filter-status"&&(O.statusFilter=e.target.value,ts()),e.target.classList.contains("quantity-input")){const a=parseInt(e.target.dataset.index,10),s=parseInt(e.target.value,10);s>0&&O.tempPackage.items[a]&&(O.tempPackage.items[a].quantity=s,as())}if(e.target.classList.contains("est-filter-checkbox")&&e.target.closest("#establishment-filters-container")){const a=e.target.closest("label");e.target.checked?(O.filterEstablishmentIds.add(e.target.value),a.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),a.classList.remove("border-slate-200","text-slate-600")):(O.filterEstablishmentIds.delete(e.target.value),a.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),a.classList.add("border-slate-200","text-slate-600")),la()}});const t=document.getElementById("export-excel-btn");t&&t.addEventListener("click",Ac),Te.addEventListener("click",e=>{const a=e.target.closest(".remove-item-btn");if(a&&O.viewMode==="edit-package"){const s=parseInt(a.dataset.index,10);O.tempPackage.items.splice(s,1),as()}})}async function jc(t){const e=O.tempPackage,a=!!e.id,s=document.getElementById("packages-layout-detail");if(!s)return;const o=Array.from(s.querySelectorAll(".modal-est-checkbox:checked")).map(l=>l.value);if(o.length===0){m("Atenção","Selecione pelo menos uma unidade para o pacote.","warning");return}const r=e.items.reduce((l,d)=>l+d.price*d.quantity,0),i={id:e.id||null,name:s.querySelector("#packageName").value,description:s.querySelector("#packageDescription").value,status:s.querySelector("#packageStatus").value,items:e.items,originalPrice:r,price:parseFloat(s.querySelector("#finalPrice").value),commissionRate:parseFloat(s.querySelector("#commissionRate").value)||0,validityDays:parseInt(s.querySelector("#validityDays").value,10)||null,sellStartDate:s.querySelector("#sellStartDate").value||null,sellEndDate:s.querySelector("#sellEndDate").value||null,salesLimit:parseInt(s.querySelector("#salesLimit").value,10)||null,establishmentIds:o,establishmentId:o[0]};if(!i.name||isNaN(i.price)){m("Erro","Nome do Pacote e Preço Final são obrigatórios.","warning");return}if(i.items.length===0){m("Erro","Adicione pelo menos um serviço ou produto ao pacote.","warning");return}const n=t.innerHTML;t.disabled=!0,t.innerHTML='<div class="loader-small border-white mr-2"></div> Salvando...';try{a?await kn(i.id,i):(delete i.id,await wn(i)),m("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),es(),O.viewMode="list",O.tempPackage=null,await la()}catch(l){m("Erro",`Não foi possível salvar o pacote: ${l.message}`,"error"),t.disabled=!1,t.innerHTML=n}}const Nc=document.getElementById("content");async function Rc(){const t=ge.currentUser;if(!t)return;let e={};try{const l=await is(Pe(me,"users",t.uid));l.exists()&&(e=l.data())}catch(l){console.error("Erro ao buscar usuário",l)}let a=null;if(g.userProfessionalId)try{a=await mo(g.userProfessionalId)}catch(l){console.error("Erro ao buscar profissional",l)}const s=v(e.name||t.displayName||"Usuário"),o=v(t.email||"E-mail não disponível"),r=v(e.phone||"");let i=e.photo||"";a&&a.photo&&(i=a.photo);const n=i||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(s.charAt(0))}`;Nc.innerHTML=`
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
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5 truncate px-2">${o}</p>
                        
                        ${a?'<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm mb-4"><i class="bi bi-check-circle-fill"></i> Perfil Profissional Ativo</span>':""}

                        <form id="form-user-details" class="text-left space-y-4 border-t border-slate-100 pt-5 mt-2">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome Completo</label>
                                <input type="text" id="input-name" value="${s}" required class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner transition-colors">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Telefone / WhatsApp</label>
                                <input type="tel" id="input-phone" value="${r}" placeholder="(00) 00000-0000" class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner transition-colors">
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
    `,Fc(t),Hc(a)}function Fc(t,e){const a=document.getElementById("profile-photo-wrapper"),s=document.getElementById("profile-photo-input"),o=document.getElementById("profile-avatar"),r=document.getElementById("form-user-details");a.addEventListener("click",()=>s.click()),s.addEventListener("change",async i=>{const n=i.target.files[0];if(n)try{const l=await pa(n,800,800,.8);o.src=l,await Lt(Pe(me,"users",t.uid),{photo:l}),g.userProfessionalId&&await Ma(g.userProfessionalId,{photo:l}),window.dispatchEvent(new CustomEvent("userPhotoUpdated",{detail:l})),m("Sucesso!","Sua foto de perfil foi atualizada.","success")}catch{m("Erro","Não foi possível salvar a imagem. Tente uma menor.","error")}}),r.addEventListener("submit",async i=>{i.preventDefault();const n=r.querySelector("button"),l=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> Salvando...';const d=document.getElementById("input-name").value.trim(),c=document.getElementById("input-phone").value.trim();try{await Lt(Pe(me,"users",t.uid),{name:d,phone:c}),g.userProfessionalId&&await Ma(g.userProfessionalId,{name:d,phone:c}),g.userName=d,document.getElementById("display-name").textContent=d,m("Atualizado!","Seus dados foram salvos com sucesso.","success")}catch{m("Erro","Ocorreu um problema na hora de salvar.","error")}finally{n.disabled=!1,n.innerHTML=l}})}function Hc(t){const e=document.getElementById("professional-section");if(!t){e.innerHTML=`
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
    `;const a=document.getElementById("form-my-blockage");a.addEventListener("submit",async o=>{o.preventDefault();const r=a.querySelector("#b-date-start").value,i=a.querySelector("#b-date-end").value||r,n=a.querySelector("#b-time-start").value,l=a.querySelector("#b-time-end").value,d=a.querySelector("#b-reason").value;if(!r||!n||!l)return m("Atenção","Preencha Data e Horários corretamente.","error");const c=new Date(`${r}T${n}:00`),u=new Date(`${i}T${l}:00`);if(u<=c)return m("Atenção","A data e hora de fim deve ser superior ao início.","warning");const p=a.querySelector('button[type="submit"]'),b=p.innerHTML;p.disabled=!0,p.innerHTML="A bloquear...";try{await ga({establishmentId:g.establishmentId,professionalId:t.id,reason:d||"Indisponível",startTime:c.toISOString(),endTime:u.toISOString()}),m("Sucesso","Agenda bloqueada com êxito.","success"),a.reset();const f=document.getElementById("my-blocks-filter").value;Zt(t.id,f)}catch(f){m("Erro",`Falha ao bloquear: ${f.message}`,"error")}finally{p.disabled=!1,p.innerHTML=b}}),document.getElementById("my-blocks-filter").addEventListener("change",o=>Zt(t.id,o.target.value)),Zt(t.id,"future")}async function Zt(t,e="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<div class="loader mx-auto mt-6"></div>';try{const s=new Date;let o,r;e==="history"?(r=new Date,o=new Date,o.setFullYear(o.getFullYear()-1)):(o=new Date,r=new Date,r.setFullYear(r.getFullYear()+1));let n=(await ba(g.establishmentId,o.toISOString(),r.toISOString(),t)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));if(e==="history"?n=n.filter(l=>l.endTime<s).sort((l,d)=>d.startTime-l.startTime):n=n.filter(l=>l.endTime>=s).sort((l,d)=>l.startTime-d.startTime),n.length===0){a.innerHTML=`
                <div class="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <i class="bi bi-info-circle text-2xl text-slate-300 mb-2 block"></i>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhum registo ${e==="history"?"no passado":"futuro"}.</p>
                </div>
            `;return}a.innerHTML=n.map(l=>{const d=l.endTime<new Date,c=v(l.reason||"Bloqueio");return`
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
                            <p class="text-[9px] font-bold ${d?"text-slate-500":"text-orange-500"} uppercase tracking-widest"><i class="bi bi-tag-fill mr-1"></i>${c}</p>
                        </div>
                    </div>
                    <button data-block-id="${l.id}" class="remove-block-btn text-slate-400 hover:text-red-500 w-8 h-8 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center" title="Apagar bloqueio">
                        <i class="bi bi-trash3 pointer-events-none text-lg"></i>
                    </button>
                </div>
            `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(l=>{l.addEventListener("click",async d=>{const c=d.currentTarget.dataset.blockId;if(confirm("Deletar e deixar a agenda livre neste horário?"))try{await cs(c),m("Removido","O bloqueio foi deletado.","success"),Zt(t,e)}catch(u){m("Erro",`Não foi possível remover: ${u.message}`,"error")}})})}catch(s){a.innerHTML=`<p class="text-xs text-red-500 font-bold p-3 bg-red-50 rounded-xl">Erro: ${v(s.message)}</p>`}}let Ys=!1;async function da(t){if(!t)return;t.innerHTML=`
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
    `;const e=document.getElementById("hierarchy-list-container"),a=document.getElementById("est-parent");try{const o=(await fe()).matrizes||[];if(a&&(a.innerHTML='<option value="">Nenhuma (Criar como Matriz Independente)</option>'),o.length===0)e.innerHTML=`
                <div class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
                    <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="bi bi-building-add text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">A sua rede está vazia</h3>
                    <p class="text-gray-500 max-w-md mx-auto mb-6">Comece por criar a sua primeira Matriz ou Loja principal para expandir o seu negócio.</p>
                </div>
            `;else{let r="";o.forEach(i=>{if(a&&!i.isOrphanBranch){const l=document.createElement("option");l.value=i.id,l.textContent=i.name,a.appendChild(l)}const n=i.isMatriz||!i.parentId?'<span class="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">📍 UNIDADE</span>';r+=`
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
                `}),e.innerHTML=r}Ys||(Oc(),Ys=!0)}catch(s){console.error("Erro na renderização da rede:",s),e.innerHTML=`
            <div class="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100 text-center">
                <i class="bi bi-exclamation-triangle text-2xl mb-2 block"></i>
                <p class="font-bold text-sm">Não foi possível carregar a estrutura organizacional.</p>
            </div>
        `}}function Oc(){const t=document.getElementById("form-create-establishment");t&&t.addEventListener("submit",async e=>{e.preventDefault();const a=t.querySelector('button[type="submit"]'),s=a.innerHTML;a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...',a.disabled=!0;const o={name:document.getElementById("est-name").value.trim(),cnpj:document.getElementById("est-cnpj").value.trim(),parentId:document.getElementById("est-parent").value||null,timezone:document.getElementById("est-timezone").value};try{const r=await ci(o);alert(r.message||"Sucesso!"),t.reset();const i=document.getElementById("modal-create-establishment"),n=window.bootstrap?.Modal.getInstance(i);n&&n.hide(),await da(document.getElementById("content"))}catch(r){console.error("Erro ao criar estabelecimento:",r),alert("Erro: "+(r.message||"Falha ao gravar dados."))}finally{a.innerHTML=s,a.disabled=!1}})}window.loadAndRenderHierarchy=()=>da(document.getElementById("content"));document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("gesturestart",function(e){e.preventDefault()}),document.addEventListener("gesturechange",function(e){e.preventDefault()}),document.addEventListener("gestureend",function(e){e.preventDefault()});let t=0;document.addEventListener("touchend",function(e){const a=new Date().getTime();a-t<=300&&e.preventDefault(),t=a},!1)});const le=document.getElementById("loadingScreen"),bt=document.getElementById("dashboardContent"),Xe=document.getElementById("content"),Ta=document.getElementById("notificationBell"),Wt=document.getElementById("notificationBadge"),Ve=document.getElementById("notificationPanel"),Pa=document.getElementById("notificationList"),Se=document.getElementById("profileMenuButton"),pe=document.getElementById("profileDropdown"),Zs=document.getElementById("profileName"),Ks=document.getElementById("profileEmail"),eo=document.getElementById("logoutButton"),to=document.getElementById("myProfileLink"),ao=document.getElementById("hamburger-menu-btn"),ce=document.getElementById("sidebar"),he=document.getElementById("mobile-overlay"),so=document.getElementById("themeToggleBtn"),oo=document.getElementById("themeIcon"),os=document.getElementById("mobile-bottom-nav"),nt=document.getElementById("nav-scroll"),ro=document.getElementById("scroll-hint-left"),io=document.getElementById("scroll-hint-right"),zc=document.querySelectorAll(".bottom-nav-item");function rs(){if(!nt||!ro||!io)return;const{scrollLeft:t,scrollWidth:e,clientWidth:a}=nt;ro.classList.toggle("visible",t>5),io.classList.toggle("visible",t+a<e-5)}function _c(){if(!nt)return;const t=document.querySelector(".bottom-nav-item.active");if(!t)return;const e=nt,a=e.getBoundingClientRect(),s=t.getBoundingClientRect(),r=s.left+s.width/2-a.left-a.width/2;e.scrollBy({left:r,behavior:"smooth"})}const Vc={"dashboard-section":_i,"agenda-section":Po,"comandas-section":Xn,"relatorios-section":Zn,"servicos-section":dl,"produtos-section":El,"suppliers-section":Nl,"profissionais-section":Wl,"clientes-section":sd,"estabelecimento-section":t=>mr(t),"ausencias-section":Ad,"users-section":ia,"sales-report-section":Gd,"financial-section":Zd,"commissions-section":bc,"packages-section":Tc,"my-profile-section":Rc,"hierarquia-section":()=>da(Xe),"establishments-section":()=>da(Xe)},Uc={"dashboard-section":"Dashboard","agenda-section":"Agenda","comandas-section":"Comandas / PDV","relatorios-section":"Relatórios","servicos-section":"Serviços do Menu","produtos-section":"Produtos (Estoque)","suppliers-section":"Parceiros de Negócio","profissionais-section":"Equipe / Profissionais","clientes-section":"Clientes","estabelecimento-section":"Minha Empresa","ausencias-section":"Ausências","users-section":"Usuários e Acessos","sales-report-section":"Relatório de Vendas","financial-section":"Financeiro (ERP)","commissions-section":"Comissões","packages-section":"Planos e Pacotes","my-profile-section":"Meu Perfil","hierarquia-section":"Rede / Filiais","establishments-section":"Rede / Filiais"},no={indigo:{main:"#4f46e5",hover:"#4338ca",light:"#eef2ff",text:"#ffffff"},blue:{main:"#2563eb",hover:"#1d4ed8",light:"#eff6ff",text:"#ffffff"},sky:{main:"#0284c7",hover:"#0369a1",light:"#e0f2fe",text:"#ffffff"},teal:{main:"#0d9488",hover:"#0f766e",light:"#ccfbf1",text:"#ffffff"},emerald:{main:"#059669",hover:"#047857",light:"#d1fae5",text:"#ffffff"},green:{main:"#16a34a",hover:"#15803d",light:"#dcfce7",text:"#ffffff"},lime:{main:"#65a30d",hover:"#4d7c0f",light:"#ecfccb",text:"#1f2937"},amber:{main:"#d97706",hover:"#b45309",light:"#fef3c7",text:"#1f2937"},orange:{main:"#ea580c",hover:"#c2410c",light:"#ffedd5",text:"#ffffff"},red:{main:"#dc2626",hover:"#b91c1c",light:"#fee2e2",text:"#ffffff"},rose:{main:"#e11d48",hover:"#be123c",light:"#ffe4e6",text:"#ffffff"},pink:{main:"#db2777",hover:"#be185d",light:"#fce7f3",text:"#ffffff"},fuchsia:{main:"#c026d3",hover:"#a21caf",light:"#fae8ff",text:"#ffffff"},purple:{main:"#7c3aed",hover:"#6d28d9",light:"#ede9fe",text:"#ffffff"},violet:{main:"#8b5cf6",hover:"#7c3aed",light:"#ddd6fe",text:"#ffffff"},gray:{main:"#64748b",hover:"#475569",light:"#f1f5f9",text:"#ffffff"},black:{main:"#111827",hover:"#000000",light:"#e5e7eb",text:"#ffffff"}};function Qt(t){const e=no[t]||no.indigo,s=(r=>{const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return i?`${parseInt(i[1],16)}, ${parseInt(i[2],16)}, ${parseInt(i[3],16)}`:"79, 70, 229"})(e.main);document.body.style.setProperty("--theme-main",e.main);const o=document.getElementById("dynamic-theme-styles");o&&(o.innerHTML=`
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
        `)}function Kt(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("kairos_theme",t),oo&&(oo.innerHTML=t==="dark"?"☀️":"🌙")}function Wc(){const t=localStorage.getItem("kairos_theme"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;Kt(t||(e?"dark":"light"))}let Et=null,It=[];function Cr(){if(!Wt||!Pa)return;const t=It.filter(e=>!e.read).length;if(t>0?(Wt.textContent=t,Wt.classList.remove("hidden")):Wt.classList.add("hidden"),It.length===0){Pa.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}Pa.innerHTML=It.map(e=>`
    <div class="notification-item ${e.read?"":"unread"}">
    <p class="font-semibold">${e.title}</p>
    <p class="text-sm text-gray-600">${e.message}</p>
    <p class="text-xs text-gray-400 mt-1">${e.time}</p>
    </div>
    `).join("")}function lo(t){Et&&Et();const e=ca(me,"establishments",t,"notifications"),a=po(e,bo("timestamp",">=",new Date),zr("timestamp","desc"));Et=_r(a,s=>{s.docChanges().forEach(o=>{if(o.type==="added"){const r=o.doc.data();It.unshift({title:r.title,message:r.message,time:r.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),m(r.title,r.message,"info",!0),Cr();const i=document.querySelector(".sidebar-link.active");i&&i.dataset.target==="agenda-section"&&Po()}})},s=>{console.error("Erro no listener de notificações:",s)})}async function Qc(t){const e=document.getElementById("multi-context-container"),a=document.getElementById("multi-context-btn"),s=document.getElementById("multi-context-label"),o=document.getElementById("multi-context-count"),r=document.getElementById("multi-context-list"),i=document.getElementById("multi-context-apply"),n=document.getElementById("multi-context-dropdown"),l=document.getElementById("multi-context-arrow");if(!(!e||!r))try{const c=(await fe()).matrizes||[];let u="",p=0;if(c.forEach(b=>{u+=`
                <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors mb-1">
                    <input type="checkbox" value="${b.id}" class="context-checkbox" data-name="${Jt(b.name)}">
                    <span class="text-[13px] sm:text-sm font-bold text-slate-700 truncate">🏢 ${Jt(b.name)}</span>
                </label>
            `,p++,b.branches&&b.branches.length>0&&b.branches.forEach(f=>{u+=`
                        <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors ml-4 mb-1 border-l-2 border-slate-100 pl-3">
                            <input type="checkbox" value="${f.id}" class="context-checkbox" data-name="${Jt(f.name)}">
                            <span class="text-[12px] sm:text-[13px] font-medium text-slate-600 truncate">📍 ${Jt(f.name)}</span>
                        </label>
                    `,p++})}),p>0){r.innerHTML=u,e.style.display="block",(!g.selectedEstablishments||g.selectedEstablishments.length===0)&&(g.selectedEstablishments=[t]);const b=Array.from(r.querySelectorAll('input[type="checkbox"]')),f=()=>{const y=b.filter(S=>S.checked);o.textContent=y.length,y.length===0?s.textContent="Nenhuma selecionada":y.length===1?s.textContent=y[0].dataset.name:s.textContent=`${y.length} Unidades`};let h=!1;b.forEach(y=>{g.selectedEstablishments.includes(y.value)&&(y.checked=!0,h=!0)}),!h&&b.length>0&&(b[0].checked=!0,g.selectedEstablishments=[b[0].value],g.establishmentId=b[0].value),f(),a.addEventListener("click",y=>{y.stopPropagation(),n.classList.toggle("hidden"),l.style.transform=n.classList.contains("hidden")?"rotate(0deg)":"rotate(180deg)"}),document.addEventListener("click",y=>{!e.contains(y.target)&&!n.classList.contains("hidden")&&(n.classList.add("hidden"),l.style.transform="rotate(0deg)",b.forEach(S=>{S.checked=g.selectedEstablishments.includes(S.value)}),f())}),b.forEach(y=>y.addEventListener("change",f)),i.addEventListener("click",async y=>{y.stopPropagation(),le&&(le.classList.remove("hidden","fade-out"),le.style.display="flex");const S=b.filter(N=>N.checked);if(S.length===0){le&&(le.classList.add("fade-out"),setTimeout(()=>{le.style.display="none"},500)),m("Atenção","Tem de selecionar pelo menos uma unidade.","warning");return}g.selectedEstablishments=S.map(N=>N.value);const P=g.selectedEstablishments[0];try{const N=await Be(P);g.establishmentId=P,g.establishmentName=N.name,g.enabledModules=N.modules,g.currentViewContext={id:P,name:N.name,type:N.parentId?"BRANCH":"GROUP"},typeof Qt=="function"&&Qt(N.themeColor||"indigo"),lo(P),co(g.userPermissions),n.classList.add("hidden"),l.style.transform="rotate(0deg)",m("Ambiente Atualizado","Exibindo informações consolidadas.","success");const $=document.querySelector(".sidebar-link.active"),E=$?$.getAttribute("data-target"):"dashboard-section";ee(E)}catch{m("Erro","Ocorreu um problema ao trocar a visualização.","error")}finally{le&&(le.classList.add("fade-out"),setTimeout(()=>{le.style.display="none"},500))}});try{const y=await Be(g.establishmentId);g.establishmentName=y.name,g.enabledModules=y.modules,g.currentViewContext={id:g.establishmentId,name:y.name,type:y.parentId?"BRANCH":"GROUP"},typeof Qt=="function"&&Qt(y.themeColor||"indigo"),lo(g.establishmentId),co(g.userPermissions)}catch{}}else e.style.display="none"}catch{e.style.display="none"}}function ee(t,e={}){const a=t.replace("-section","");if(t!=="my-profile-section"){const o=["hierarquia-section","establishments-section","estabelecimento-section","dashboard-section"].includes(t),r=g.enabledModules?.[a]!==!1,i=g.userPermissions===null||g.userPermissions[t]?.view===!0;if(!o&&(!r||!i)){Xe&&(Xe.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>'),document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active")),ce&&ce.classList.contains("absolute")&&(ce.classList.add("hidden"),he&&he.classList.add("hidden"));return}}const s=Vc[t];if(s&&Xe){const o=document.getElementById("header-page-title");o&&(o.textContent=Uc[t]||"Painel de Gestão"),document.querySelectorAll(".sidebar-link").forEach(r=>{r.classList.toggle("active",r.getAttribute("data-target")===t)}),os&&(zc.forEach(r=>{r.classList.toggle("active",r.getAttribute("data-target")===t)}),setTimeout(_c,50),setTimeout(rs,100)),t==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(r=>r.classList.remove("active")),Xe.innerHTML="",window.innerWidth<768&&ce&&(ce.classList.add("hidden"),he&&he.classList.add("hidden")),s(e)}}window.navigateTo=ee;async function co(t){const e=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),s=document.getElementById("kpi-today-appointments"),o=document.getElementById("kpi-today-revenue"),r=t===null||t["agenda-section"]?.view===!0,i=t===null||t["financial-section"]?.view===!0;if(r&&e&&(e.classList.remove("hidden"),e.classList.add("inline-flex")),i&&a&&(a.classList.remove("hidden"),a.classList.add("inline-flex")),!(!r&&!i))try{const n=await yo();r&&s&&(s.textContent=n.todayAppointments.toString()),i&&o&&(o.textContent=`R$ ${n.todayRevenue.toFixed(2).replace(".",",")}`)}catch{}}async function Jc(t){try{ke.getPlatform()==="android"&&await de.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0});let e=await de.checkPermissions();if(e.receive==="prompt"&&(e=await de.requestPermissions()),e.receive!=="granted")return;await de.register(),de.addListener("registration",async a=>{try{const s=Pe(me,"users",t);await Lt(s,{fcmTokens:Or(a.value),platform:"native_mobile"})}catch{}}),de.addListener("pushNotificationReceived",a=>m(a.title,a.body,"info",!0)),de.addListener("pushNotificationActionPerformed",()=>ee("agenda-section"))}catch{}}function Gc(){const t=document.getElementById("exitConfirmationModal"),e=document.getElementById("btn-cancel-exit"),a=document.getElementById("btn-confirm-exit"),s=()=>t&&(t.style.display="block"),o=()=>t&&(t.style.display="none"),r=()=>t&&t.style.display==="block";t&&(e.addEventListener("click",()=>{o(),ke.isNativePlatform()||history.pushState(null,document.title,location.href)}),a.addEventListener("click",()=>{o(),ke.isNativePlatform()?Ps.exitApp():history.back()}),ke.isNativePlatform()?Ps.addListener("backButton",()=>{if(r())o();else{const i=document.querySelectorAll('.modal[style*="display: block"]'),n=Array.from(i).filter(d=>d.id!=="exitConfirmationModal");if(n.length>0){n.forEach(d=>d.style.display="none");return}if(ce&&!ce.classList.contains("hidden")&&window.innerWidth<768){ce.classList.add("hidden"),he&&he.classList.add("hidden");return}const l=document.querySelector(".sidebar-link.active");l&&l.getAttribute("data-target")==="dashboard-section"?s():ee("dashboard-section")}}):(history.pushState(null,document.title,location.href),window.addEventListener("popstate",()=>{if(r()){o(),history.pushState(null,document.title,location.href);return}const i=document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display: flex"]'),n=Array.from(i).filter(d=>d.id!=="exitConfirmationModal");if(n.length>0){n.forEach(d=>d.style.display="none"),history.pushState(null,document.title,location.href);return}const l=document.querySelector(".sidebar-link.active");l&&l.getAttribute("data-target")==="dashboard-section"?s():(ee("dashboard-section"),history.pushState(null,document.title,location.href))})))}function Jt(t){return t?t.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}async function Xc(){try{await Mr(ge,qr)}catch{}ke.isNativePlatform()&&document.body.classList.add("is-app-native"),si(),Gc(),Wc(),so&&so.addEventListener("click",t=>{t.preventDefault();const e=document.documentElement.getAttribute("data-theme");Kt(e==="dark"?"light":"dark")}),ao&&ao.addEventListener("click",t=>{t.stopPropagation(),ce&&(ce.classList.remove("hidden"),ce.classList.add("absolute","inset-y-0","left-0","z-40","shadow-xl")),he&&he.classList.remove("hidden")}),os&&(os.addEventListener("click",t=>{const e=t.target.closest(".bottom-nav-item");if(!e)return;t.preventDefault();const a=e.getAttribute("data-target");ee(a)}),nt&&nt.addEventListener("scroll",rs),rs()),he&&he.addEventListener("click",()=>{ce&&(ce.classList.add("hidden"),ce.classList.remove("absolute","inset-y-0","left-0","z-40","shadow-xl")),he.classList.add("hidden")}),Ta&&Ta.addEventListener("click",t=>{t.stopPropagation(),Ve&&(Ve.classList.toggle("hidden"),Ve.classList.contains("hidden")||(It.forEach(e=>e.read=!0),Cr()))}),Se&&Se.addEventListener("click",t=>{t.stopPropagation(),pe&&(pe.classList.toggle("active"),pe.classList.contains("active")?pe.classList.remove("hidden"):setTimeout(()=>pe.classList.add("hidden"),200))}),to&&to.addEventListener("click",t=>{t.preventDefault(),ee("my-profile-section"),pe&&(pe.classList.remove("active"),pe.classList.add("hidden"))}),window.addEventListener("userPhotoUpdated",t=>{const e=t.detail;Se&&e&&(Se.innerHTML=`<img src="${e}" alt="Avatar" class="w-full h-full rounded-full object-cover">`)}),document.addEventListener("click",t=>{Ve&&!Ve.contains(t.target)&&t.target!==Ta&&Ve.classList.add("hidden"),pe&&!pe.contains(t.target)&&t.target!==Se&&pe.classList.contains("active")&&(pe.classList.remove("active"),setTimeout(()=>pe.classList.add("hidden"),200))}),jr(ge,async t=>{if(t){if(!ke.isNativePlatform()&&(Ti(),"Notification"in window&&Notification.permission==="default")){const e=document.getElementById("toast-notification-request"),a=document.getElementById("btn-enable-toast");e&&setTimeout(()=>{e.style.display="block"},3500),a&&a.addEventListener("click",async()=>{await Pi()&&e&&(e.style.display="none")});const s=()=>{e&&(e.style.display="none")},o=document.getElementById("btn-deny-toast"),r=document.getElementById("btn-close-toast");o&&o.addEventListener("click",s),r&&r.addEventListener("click",s)}try{const a=(await t.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="admin"||a.role==="employee")&&a.establishmentId){let s=null,o=t.displayName,r=null,i=null;const n=Pe(me,"users",t.uid),l=await is(n);if(l.exists()){const c=l.data();s=a.role==="employee"?c.permissions||{}:null,o=c.name||o,r=c.professionalId||null,i=c.photo||null}if(g.userProfessionalId=r,r&&!i)try{const c=await mo(r);c&&c.photo&&(i=c.photo)}catch(c){console.warn("Erro ao buscar foto profissional no topo",c)}ke.isNativePlatform()&&Jc(t.uid);const d=o||t.email;Wr(a.establishmentId,"Carregando...",s),i?Se&&(Se.innerHTML=`<img src="${i}" class="w-full h-full rounded-full object-cover">`):Se&&(Se.textContent=d.charAt(0).toUpperCase()),Zs&&(Zs.textContent=d),Ks&&(Ks.textContent=t.email),eo&&eo.addEventListener("click",c=>{c.preventDefault(),Et&&Et(),Nr(ge).then(()=>window.location.href="/login.html")}),await Qc(a.establishmentId),di(ee,s,g.enabledModules),le&&(le.classList.add("fade-out"),setTimeout(()=>{le.style.display="none"},500)),bt&&(bt.style.display="flex"),setTimeout(()=>{fi()},1500),ee("dashboard-section")}else throw new Error("Permissão ou estabelecimento não configurado.")}catch(e){le&&(le.style.display="none"),bt&&(bt.innerHTML=`<div class="w-full h-full flex flex-col items-center justify-center p-4 text-center"><h2>Erro de Acesso</h2><p>${e.message}</p></div>`,bt.style.display="flex")}}else window.location.href="/login.html"})}Xc();export{xo as W};
