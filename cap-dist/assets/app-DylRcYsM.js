const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-D60hb9F9.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/firebase-config-seH-87Om.js","assets/utils-DTVAHnIk.js","assets/styles-CQhY7Cv2.css"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as we,d as xe,m as Rs}from"./firebase-config-seH-87Om.js";import{EmailAuthProvider as _i,reauthenticateWithCredential as Vi,verifyBeforeUpdateEmail as Ui,updatePassword as Wi,updateProfile as Ji,setPersistence as Gi,browserLocalPersistence as Qi,onAuthStateChanged as Yi,signOut as Xi}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as qe,getDoc as ws,updateDoc as At,setDoc as Zi,addDoc as Co,collection as Ca,query as Do,where as Po,getDocs as Ki,deleteDoc as er,arrayUnion as tr,orderBy as ar,onSnapshot as sr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{a as C,e as v,s as G,b as g,c as Fe,r as Da,f as za,i as or}from"./utils-DTVAHnIk.js";import{getToken as ir,onMessage as rr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const f={userName:null,userProfessionalId:null,userPermissions:null,userRole:null,groupId:null,groupName:null,accessibleCompanies:[],accessibleEstablishments:[],currentViewContext:{type:null,id:null,name:null},establishmentId:null,establishmentName:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function nr(t,e,a){f.establishmentId=t,f.establishmentName=e,f.userPermissions=a,f.currentViewContext={type:"BRANCH",id:t,name:e}}const Pa=(t,e,a,s=null)=>{let i=`/api/appointments/${t}?startDate=${e}&endDate=${a}`;return s&&(i+=`&professionalId=${s}`),C(i)},lr=(t,e,a)=>{const s=`/api/appointments/cancelled/${t}?startDate=${e}&endDate=${a}`;return C(s)},dr=({establishmentId:t,professionalId:e,serviceIds:a,date:s})=>{const i=`/api/availability?establishmentId=${t}&professionalId=${e}&serviceIds=${a.join(",")}&date=${s}`;return C(i)},cr=t=>C("/api/appointments",{method:"POST",body:JSON.stringify(t)}),ur=(t,e)=>C(`/api/appointments/${t}`,{method:"PUT",body:JSON.stringify(e)}),pr=(t,e)=>C(`/api/appointments/${t}/status`,{method:"PATCH",body:JSON.stringify({status:e})}),br=t=>C(`/api/appointments/${t}`,{method:"DELETE"}),mr=t=>C(`/api/appointments/${t}/reopen`,{method:"POST"}),gr=(t,e)=>C(`/api/appointments/${t}/checkout`,{method:"POST",body:JSON.stringify(e)}),ne=document.getElementById("sidebar"),Je=document.getElementById("sidebarToggle"),St=document.getElementById("mainContent"),fr=document.querySelectorAll(".sidebar-link"),Za=document.getElementById("menu-search"),Hs=document.getElementById("hamburger-menu-btn"),lt=document.getElementById("mobile-overlay");let je=!0;function Oe(t){if(!ne||!St)return;ne.classList.toggle("collapsed",t),St.classList.toggle("sidebar-collapsed-shift",t);const e=ne.querySelector(".sidebar-search-container"),a=ne.querySelectorAll(".sidebar-category");t?(e&&(e.style.display="none"),a.forEach(s=>s.style.display="none"),document.querySelectorAll(".submenu-toggle").forEach(s=>{const i=s.getAttribute("data-target-submenu"),o=document.getElementById(i),r=s.querySelector(".submenu-arrow");o&&(o.classList.add("hidden"),o.classList.remove("flex")),r&&r.classList.remove("rotate-180")})):(e&&(e.style.display="block"),a.forEach(s=>s.style.display="block"))}function xr(){!ne||!lt||(ne.classList.add("mobile-open"),lt.classList.add("visible"))}function Ht(){!ne||!lt||(ne.classList.remove("mobile-open"),lt.classList.remove("visible"))}function hr(){Oe(!ne.classList.contains("collapsed"))}function vr(t,e){const a=document.getElementById(t);if(!a)return;const s=a.classList.contains("hidden");s&&window.innerWidth>=1024&&ne.classList.contains("collapsed")&&Oe(!1),s?(a.classList.remove("hidden"),a.classList.add("flex"),e&&e.classList.add("rotate-180")):(a.classList.add("hidden"),a.classList.remove("flex"),e&&e.classList.remove("rotate-180"))}function yr(){Za&&Za.addEventListener("input",t=>{const e=t.target.value.toLowerCase().trim(),a=document.getElementById("sidebar-nav");if(!a)return;const s=a.querySelectorAll("li"),i=a.querySelectorAll(".sidebar-category");if(e===""){s.forEach(o=>o.style.display=""),i.forEach(o=>o.style.display="block");return}i.forEach(o=>o.style.display="none"),s.forEach(o=>{if(o.classList.contains("sidebar-category"))return;const r=o.querySelector(".sidebar-link")||o.querySelector(".submenu-toggle");if(!r)return;if(r.textContent.toLowerCase().includes(e)){o.style.display="";const d=o.closest('ul[id$="-submenu"]');if(d){d.classList.remove("hidden"),d.classList.add("flex"),d.parentElement.style.display="";const u=d.parentElement.querySelector(".submenu-toggle");if(u){const c=u.querySelector(".submenu-arrow");c&&c.classList.add("rotate-180")}}}else{const d=r.getAttribute("data-target-submenu");if(d){const u=document.getElementById(d);u&&(Array.from(u.querySelectorAll(".sidebar-link")).some(b=>b.textContent.toLowerCase().includes(e))?o.style.display="":o.style.display="none")}else o.style.display="none"}})})}function wr(t,e,a){if(!ne||!St)return;St.classList.add("main-content-shift"),window.innerWidth>=1024?(je=!0,Oe(!1)):window.innerWidth>=768?(je=!1,Oe(!0)):(St.classList.remove("main-content-shift","sidebar-collapsed-shift"),Ht()),Je&&Je.addEventListener("click",i=>{i.stopPropagation(),window.innerWidth>=768?(je=!je,Oe(!je),je?(Je.classList.add("text-indigo-400"),Je.classList.remove("text-gray-400")):(Je.classList.remove("text-indigo-400"),Je.classList.add("text-gray-400"))):hr()}),ne.addEventListener("mouseenter",()=>{window.innerWidth>=768&&!je&&ne.classList.contains("collapsed")&&Oe(!1)}),ne.addEventListener("mouseleave",()=>{if(window.innerWidth>=768&&!je){const i=!!document.querySelector("#sidebarToggle:hover"),o=document.activeElement===Za;!i&&!o&&Oe(!0)}}),Hs&&Hs.addEventListener("click",i=>{i.stopPropagation(),xr()}),lt&&lt.addEventListener("click",i=>{i.stopPropagation(),Ht()});let s=0;ne.addEventListener("touchstart",i=>{s=i.changedTouches[0].screenX},{passive:!0}),ne.addEventListener("touchend",i=>{const o=i.changedTouches[0].screenX;s-o>50&&Ht()},{passive:!0}),document.querySelectorAll(".submenu-toggle").forEach(i=>{i.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();const r=i.getAttribute("data-target-submenu"),n=i.querySelector(".submenu-arrow");vr(r,n)})}),yr(),fr.forEach(i=>{const o=i.getAttribute("data-target");if(!o)return;const r=o.replace("-section",""),n=a?.[r]!==!1,l=e===null||e[o]?.view===!0;if(!n||!l){i.parentElement&&i.parentElement.tagName==="LI"?i.parentElement.style.display="none":i.style.display="none";return}i.addEventListener("click",d=>{d.preventDefault(),document.querySelectorAll(".sidebar-link").forEach(u=>u.classList.remove("active")),i.classList.add("active"),o&&typeof t=="function"&&t(o),window.innerWidth<768&&Ht()})})}const kr=t=>C("/api/establishments/",{method:"POST",body:JSON.stringify(t)}),ke=()=>C("/api/establishments/hierarchy",{method:"GET"}),Ae=t=>{const e=t||f.establishmentId;return e?C(`/api/establishments/${e}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},jt=(t,e)=>{const a=t||f.establishmentId;return a?C(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(e)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Sr=(t,e)=>{const a=t||f.establishmentId;return a?C(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:e})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Ir=(t,e)=>{const a=t||f.establishmentId;return a?C(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:e})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},De=t=>C(`/api/professionals/${t}`),To=t=>C(`/api/professionals/details/${t}`),$r=t=>C("/api/professionals",{method:"POST",body:JSON.stringify(t)}),Ka=(t,e)=>C(`/api/professionals/${t}`,{method:"PUT",body:JSON.stringify(e)}),Mo=t=>C(`/api/professionals/${t}`,{method:"DELETE"}),Er=t=>{const e=t.map(a=>Mo(a));return Promise.all(e)};class Lr{constructor(e,a,s){this.steps=e,this.currentStep=0,this.onComplete=a,this.onSkip=s,this.isActive=!1,this.overlay=null,this.spotlight=null,this.popover=null,this.handleResize=this.handleResize.bind(this)}start(){this.isActive||(this.isActive=!0,this.createElements(),window.addEventListener("resize",this.handleResize),this.renderStep())}stop(e=!1){this.isActive=!1,window.removeEventListener("resize",this.handleResize),this.overlay&&this.overlay.remove(),this.spotlight&&this.spotlight.remove(),this.popover&&this.popover.remove(),e&&this.onComplete?this.onComplete():!e&&this.onSkip&&this.onSkip()}createElements(){this.overlay=document.createElement("div"),this.overlay.className="fixed inset-0 bg-black/60 z-[99990] transition-opacity duration-300",document.body.appendChild(this.overlay),this.spotlight=document.createElement("div"),this.spotlight.className="absolute rounded-xl z-[99991] transition-all duration-500 ease-in-out pointer-events-none bg-transparent",this.spotlight.style.boxShadow="0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255,255,255,0.5) inset",document.body.appendChild(this.spotlight),this.popover=document.createElement("div"),this.popover.className="absolute z-[99992] bg-white rounded-2xl shadow-2xl w-[320px] transition-all duration-500 ease-in-out opacity-0 transform scale-95 border border-gray-100 flex flex-col",document.body.appendChild(this.popover)}async renderStep(){if(this.currentStep>=this.steps.length){this.stop(!0);return}const e=this.steps[this.currentStep];this.popover.style.opacity="0",this.popover.style.transform="scale(0.95)",e.onBefore&&(await e.onBefore(),await this.sleep(600));const a=await this.waitForElement(e.targetSelector,3e3);if(a){a.scrollIntoView({behavior:"smooth",block:"center"}),await this.sleep(300);const i=a.getBoundingClientRect(),o=8;this.spotlight.style.top=`${i.top+window.scrollY-o}px`,this.spotlight.style.left=`${i.left+window.scrollX-o}px`,this.spotlight.style.width=`${i.width+o*2}px`,this.spotlight.style.height=`${i.height+o*2}px`,this.spotlight.style.display="block",this.overlay.style.display="none",this.positionPopover(i)}else this.spotlight.style.display="none",this.overlay.style.display="block",this.popover.style.top="50%",this.popover.style.left="50%",this.popover.style.transform="translate(-50%, -50%) scale(1)";const s=this.currentStep===this.steps.length-1;this.popover.innerHTML=`
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
        `,setTimeout(()=>{a&&(this.popover.style.transform="scale(1)"),this.popover.style.opacity="1"},50),document.getElementById("tour-next-btn").onclick=()=>{this.currentStep++,this.renderStep()},document.getElementById("tour-prev-btn")&&(document.getElementById("tour-prev-btn").onclick=()=>{this.currentStep--,this.renderStep()}),document.getElementById("tour-skip-btn").onclick=()=>this.stop(!1)}positionPopover(e){const a=this.popover.getBoundingClientRect(),s=20;let i=e.bottom+window.scrollY+s,o=e.left+window.scrollX;i+a.height>window.scrollY+window.innerHeight&&(i=e.top+window.scrollY-a.height-s),o+a.width>window.innerWidth&&(o=e.right+window.scrollX-a.width),o<s&&(o=s),this.popover.style.top=`${i}px`,this.popover.style.left=`${o}px`}handleResize(){this.isActive&&this.renderStep()}sleep(e){return new Promise(a=>setTimeout(a,e))}async waitForElement(e,a){if(!e)return null;const s=Date.now();for(;Date.now()-s<a;){const i=document.querySelector(e);if(i)return i;await this.sleep(100)}return null}}async function Cr(){try{console.log("A verificar Onboarding interativo...");const t=await Ae(f.establishmentId);if(!t||t.parentId||t.onboardingCompleted)return;const e=[{title:"Bem-vindo ao Kairos!",icon:"👋",content:"Preparei um tour rápido para lhe mostrar onde deve configurar as 3 coisas mais importantes antes de receber agendamentos. Vamos a isso?",targetSelector:null},{title:"Perfil e Dados da Loja",icon:"🏢",content:"É aqui em 'Minha Empresa' que você define o nome do Salão, telefone, endereço e faz o upload da sua Logomarca.",targetSelector:'[data-target="estabelecimento-section"]',onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Cores e Personalização",icon:"🎨",content:"Nesta área você pode mudar a cor principal do sistema para ficar com a cara da sua marca. O link do seu cliente vai usar esta cor!",targetSelector:"#themeColor",onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Criação de Serviços",icon:"✂️",content:"Na aba 'Serviços' é onde a mágica acontece. Crie os serviços que os seus clientes vão poder agendar, informando o preço e a duração de cada um.",targetSelector:'[data-target="servicos-section"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Novo Serviço",icon:"➕",content:"Sempre que precisar adicionar um novo serviço ao menu, basta clicar neste botão verde.",targetSelector:'[data-action="new-service"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Gestão da Equipe",icon:"👥",content:"E para terminar: a 'Equipa'. Aqui você cadastra os profissionais, define quem faz qual serviço e ajusta a jornada de trabalho semanal de cada um.",targetSelector:'[data-target="profissionais-section"]',onBefore:async()=>{window.navigateTo("profissionais-section")}},{title:"Tudo Pronto!",icon:"🚀",content:"Você já conhece o caminho! Preencha as informações do seu negócio com calma. Quando terminar, volte à Agenda e partilhe o seu Link de Agendamento com os clientes!",targetSelector:null,onBefore:async()=>{window.navigateTo("agenda-section")}}],a=async()=>{try{await jt(f.establishmentId,{onboardingCompleted:!0}),showNotification("Tour Concluído","Você já pode configurar o seu sistema livremente!","success")}catch(i){console.error("Erro ao gravar fim do onboarding",i)}};new Lr(e,a,a).start()}catch(t){console.error("Erro fatal ao iniciar onboarding:",t)}}var dt;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(dt||(dt={}));class _a extends Error{constructor(e,a,s){super(e),this.message=e,this.code=a,this.data=s}}const Dr=t=>{var e,a;return t?.androidBridge?"android":!((a=(e=t?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},Pr=t=>{const e=t.CapacitorCustomPlatform||null,a=t.Capacitor||{},s=a.Plugins=a.Plugins||{},i=()=>e!==null?e.name:Dr(t),o=()=>i()!=="web",r=c=>{const p=d.get(c);return!!(p?.platforms.has(i())||n(c))},n=c=>{var p;return(p=a.PluginHeaders)===null||p===void 0?void 0:p.find(b=>b.name===c)},l=c=>t.console.error(c),d=new Map,u=(c,p={})=>{const b=d.get(c);if(b)return console.warn(`Capacitor plugin "${c}" already registered. Cannot register plugins twice.`),b.proxy;const m=i(),x=n(c);let y;const S=async()=>(!y&&m in p?y=typeof p[m]=="function"?y=await p[m]():y=p[m]:e!==null&&!y&&"web"in p&&(y=typeof p.web=="function"?y=await p.web():y=p.web),y),L=(P,z)=>{var O,T;if(x){const A=x?.methods.find(N=>z===N.name);if(A)return A.rtype==="promise"?N=>a.nativePromise(c,z.toString(),N):(N,K)=>a.nativeCallback(c,z.toString(),N,K);if(P)return(O=P[z])===null||O===void 0?void 0:O.bind(P)}else{if(P)return(T=P[z])===null||T===void 0?void 0:T.bind(P);throw new _a(`"${c}" plugin is not implemented on ${m}`,dt.Unimplemented)}},D=P=>{let z;const O=(...T)=>{const A=S().then(N=>{const K=L(N,P);if(K){const ee=K(...T);return z=ee?.remove,ee}else throw new _a(`"${c}.${P}()" is not implemented on ${m}`,dt.Unimplemented)});return P==="addListener"&&(A.remove=async()=>z()),A};return O.toString=()=>`${P.toString()}() { [capacitor code] }`,Object.defineProperty(O,"name",{value:P,writable:!1,configurable:!1}),O},k=D("addListener"),I=D("removeListener"),M=(P,z)=>{const O=k({eventName:P},z),T=async()=>{const N=await O;I({eventName:P,callbackId:N},z)},A=new Promise(N=>O.then(()=>N({remove:T})));return A.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await T()},A},V=new Proxy({},{get(P,z){switch(z){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return x?M:k;case"removeListener":return I;default:return D(z)}}});return s[c]=V,d.set(c,{name:c,proxy:V,platforms:new Set([...Object.keys(p),...x?[m]:[]])}),V};return a.convertFileSrc||(a.convertFileSrc=c=>c),a.getPlatform=i,a.handleError=l,a.isNativePlatform=o,a.isPluginAvailable=r,a.registerPlugin=u,a.Exception=_a,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Tr=t=>t.Capacitor=Pr(t),Ce=Tr(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Ta=Ce.registerPlugin;class Bo{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,a){let s=!1;this.listeners[e]||(this.listeners[e]=[],s=!0),this.listeners[e].push(a);const o=this.windowListeners[e];o&&!o.registered&&this.addWindowListener(o),s&&this.sendRetainedArgumentsForEvent(e);const r=async()=>this.removeListener(e,a);return Promise.resolve({remove:r})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,a,s){const i=this.listeners[e];if(!i){if(s){let o=this.retainedEventArguments[e];o||(o=[]),o.push(a),this.retainedEventArguments[e]=o}return}i.forEach(o=>o(a))}hasListeners(e){var a;return!!(!((a=this.listeners[e])===null||a===void 0)&&a.length)}registerWindowListener(e,a){this.windowListeners[a]={registered:!1,windowEventName:e,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(e="not implemented"){return new Ce.Exception(e,dt.Unimplemented)}unavailable(e="not available"){return new Ce.Exception(e,dt.Unavailable)}async removeListener(e,a){const s=this.listeners[e];if(!s)return;const i=s.indexOf(a);this.listeners[e].splice(i,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const a=this.retainedEventArguments[e];a&&(delete this.retainedEventArguments[e],a.forEach(s=>{this.notifyListeners(e,s)}))}}const Os=t=>encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),zs=t=>t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Mr extends Bo{async getCookies(){const e=document.cookie,a={};return e.split(";").forEach(s=>{if(s.length<=0)return;let[i,o]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");i=zs(i).trim(),o=zs(o).trim(),a[i]=o}),a}async setCookie(e){try{const a=Os(e.key),s=Os(e.value),i=`; expires=${(e.expires||"").replace("expires=","")}`,o=(e.path||"/").replace("path=",""),r=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${a}=${s||""}${i}; path=${o}; ${r};`}catch(a){return Promise.reject(a)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const a of e)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}Ta("CapacitorCookies",{web:()=>new Mr});const Br=async t=>new Promise((e,a)=>{const s=new FileReader;s.onload=()=>{const i=s.result;e(i.indexOf(",")>=0?i.split(",")[1]:i)},s.onerror=i=>a(i),s.readAsDataURL(t)}),Ar=(t={})=>{const e=Object.keys(t);return Object.keys(t).map(i=>i.toLocaleLowerCase()).reduce((i,o,r)=>(i[o]=t[e[r]],i),{})},jr=(t,e=!0)=>t?Object.entries(t).reduce((s,i)=>{const[o,r]=i;let n,l;return Array.isArray(r)?(l="",r.forEach(d=>{n=e?encodeURIComponent(d):d,l+=`${o}=${n}&`}),l.slice(0,-1)):(n=e?encodeURIComponent(r):r,l=`${o}=${n}`),`${s}&${l}`},"").substr(1):null,qr=(t,e={})=>{const a=Object.assign({method:t.method||"GET",headers:t.headers},e),i=Ar(t.headers)["content-type"]||"";if(typeof t.data=="string")a.body=t.data;else if(i.includes("application/x-www-form-urlencoded")){const o=new URLSearchParams;for(const[r,n]of Object.entries(t.data||{}))o.set(r,n);a.body=o.toString()}else if(i.includes("multipart/form-data")||t.data instanceof FormData){const o=new FormData;if(t.data instanceof FormData)t.data.forEach((n,l)=>{o.append(l,n)});else for(const n of Object.keys(t.data))o.append(n,t.data[n]);a.body=o;const r=new Headers(a.headers);r.delete("content-type"),a.headers=r}else(i.includes("application/json")||typeof t.data=="object")&&(a.body=JSON.stringify(t.data));return a};class Nr extends Bo{async request(e){const a=qr(e,e.webFetchExtra),s=jr(e.params,e.shouldEncodeUrlParams),i=s?`${e.url}?${s}`:e.url,o=await fetch(i,a),r=o.headers.get("content-type")||"";let{responseType:n="text"}=o.ok?e:{};r.includes("application/json")&&(n="json");let l,d;switch(n){case"arraybuffer":case"blob":d=await o.blob(),l=await Br(d);break;case"json":l=await o.json();break;case"document":case"text":default:l=await o.text()}const u={};return o.headers.forEach((c,p)=>{u[p]=c}),{data:l,headers:u,status:o.status,url:o.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}Ta("CapacitorHttp",{web:()=>new Nr});const pe=Ta("PushNotifications",{}),Fr="modulepreload",Rr=function(t){return"/"+t},_s={},Hr=function(e,a,s){let i=Promise.resolve();if(a&&a.length>0){let l=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),n=r?.nonce||r?.getAttribute("nonce");i=l(a.map(d=>{if(d=Rr(d),d in _s)return;_s[d]=!0;const u=d.endsWith(".css"),c=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${c}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":Fr,u||(p.as="script"),p.crossOrigin="",p.href=d,n&&p.setAttribute("nonce",n),document.head.appendChild(p),u)return new Promise((b,m)=>{p.addEventListener("load",b),p.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(r){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=r,window.dispatchEvent(n),!n.defaultPrevented)throw r}return i.then(r=>{for(const n of r||[])n.status==="rejected"&&o(n.reason);return e().catch(o)})},Vs=Ta("App",{web:()=>Hr(()=>import("./web-D60hb9F9.js"),__vite__mapDeps([0,1,2,3,4])).then(t=>new t.AppWeb)}),Or="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let Us=!1;async function zr(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await pe.removeAllListeners(),await pe.addListener("registration",async a=>{jo(a.value,!0)}),await pe.addListener("pushNotificationReceived",a=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",a)}),await pe.addListener("pushNotificationActionPerformed",a=>{const s=a.notification.data;console.log("Notificação clicada (Ação):",s)});let e=await pe.checkPermissions();e.receive==="prompt"&&(e=await pe.requestPermissions()),e.receive==="granted"&&await pe.register()}catch(e){console.error("[Push Nativo] Erro:",e)}return}"Notification"in window&&Notification.permission==="granted"&&Ao()}async function _r(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await Ao(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(t){return console.error("Erro ao pedir permissão Web:",t),!1}}async function Ao(){if("serviceWorker"in navigator)try{const t=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await t.update();const e=await ir(Rs,{vapidKey:Or,serviceWorkerRegistration:t});e?(console.log("[Push Web] Token validado."),await jo(e,!1)):console.warn("[Push Web] Token veio vazio."),Us||(rr(Rs,a=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",a)}),Us=!0)}catch(t){console.error("[Push Web] Falha no registo:",t)}else console.warn("Navegador sem suporte a Service Worker.")}async function jo(t,e){const a=we.currentUser;if(!a){console.warn("Usuário não logado. Token não salvo.");return}const s=qe(xe,"users",a.uid);try{const i=await ws(s);if(i.exists()){const r=i.data().fcmTokens||[];if(r.length===1&&r[0]===t){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await At(s,{fcmTokens:[t],lastLoginAt:new Date().toISOString(),platform:e?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(i){if(i.code==="not-found")try{await Zi(s,{email:a.email,fcmTokens:[t],platform:e?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(o){console.error("Erro ao criar user:",o)}else console.error("Erro ao atualizar token:",i)}}const Vr=(t,e,a="all",s="all")=>{const i=new URLSearchParams({startDate:t,endDate:e});return a&&a!=="all"&&i.append("professionalId",a),s&&s!=="all"&&i.append("costCenterId",s),C(`/api/reports/indicators?${i.toString()}`)},Ur=(t,e="all")=>{const a=new URLSearchParams({date:t});return e&&e!=="all"&&a.append("professionalId",e),C(`/api/reports/appointments/list?${a.toString()}`)},Wr=t=>t?C(`/api/financial/cost-centers/${t}`):Promise.resolve([]),Jr=(t,e,a)=>{const s=new URLSearchParams({startDate:e,endDate:a});return C(`/api/analytics/${t}?${s.toString()}`)},xa=({establishmentId:t,startDate:e,endDate:a,cashierSessionId:s})=>{const i=new URLSearchParams({startDate:e,endDate:a});return s&&s!=="all"&&i.append("cashierSessionId",s),t&&i.append("establishmentId",t),C(`/api/reports/sales?${i.toString()}`)},Gr=(t,e,a)=>C(`/api/analytics/${t}/monthly-details?year=${e}&month=${a}`),Qr=(t,e,a,s)=>{const i=`/api/analytics/${t}/daily-details?year=${e}&month=${a}&day=${s}`;return C(i)},Yr=(t,e,a,s)=>{const i=`/api/analytics/${t}/professional-details?year=${e}&month=${a}&professionalId=${s}`;return C(i)},Xr=(t,e,a,s)=>C(`/api/reports/commissions/${t}?year=${e}&month=${a}&professionalId=${s}`),qo=()=>C("/api/reports/summary",{method:"GET"}),Zr=Object.freeze(Object.defineProperty({__proto__:null,getAdvancedIndicators:Vr,getAnalytics:Jr,getCommissionReport:Xr,getCostCenters:Wr,getDailyAppointments:Ur,getDailyTransactions:Qr,getMonthlyAnalytics:Gr,getProfessionalMonthlyDetails:Yr,getSalesReport:xa,getSummaryKPIs:qo},Symbol.toStringTag,{value:"Module"})),Ma=t=>t?String(t).replace(/\D/g,""):"",mt=(t,e="",a=20,s={})=>{const i=new URLSearchParams;return e&&i.append("search",e),a&&i.append("limit",a),s&&s.hasLoyalty&&i.append("hasLoyalty","true"),s&&s.birthMonth&&i.append("birthMonth",s.birthMonth),s&&s.inactiveDays&&i.append("inactiveDays",s.inactiveDays),C(`/api/clients/${t}?${i.toString()}`)},No=(t,e)=>{const a=encodeURIComponent(e);return C(`/api/clients/details/${t}/${a}`)},Fo=t=>{const e=t.phone||t.id;if(!e)throw new Error("Telefone é obrigatório");const a=Ma(e),s={...t,phone:a,id:a};return C(`/api/clients/${a}`,{method:"PUT",body:JSON.stringify(s)})},Ro=Fo,ks=(t,e)=>Fo({...e,id:t}),Kr=(t,e)=>{const a=Ma(e),s=Array.isArray(t)||t instanceof Set?Array.from(t).join(","):t;return C(`/api/clients/full-history/${s}?phone=${a}`)},Ho=t=>{const e=encodeURIComponent(t);return C(`/api/clients/${e}`,{method:"DELETE"})},Oo=(t,e,a,s)=>C("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:t,clientPhone:Ma(e),points:a,rewardName:s})}),en=(t,e)=>No(t,Ma(e)),Ba=t=>C(`/api/financial/natures/${t}`),tn=t=>C("/api/financial/natures",{method:"POST",body:JSON.stringify(t)}),Ss=t=>C(`/api/financial/cost-centers/${t}`),an=t=>C("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(t)}),zo=(t,e)=>C(`/api/financial/${t}`,{method:"POST",body:JSON.stringify(e)}),_o=(t,e={})=>{let a=`/api/financial/${t}`;const s=new URLSearchParams;e.establishmentId&&s.append("establishmentId",e.establishmentId),e.startDate&&s.append("startDate",e.startDate),e.endDate&&s.append("endDate",e.endDate),e.natureId&&s.append("natureId",e.natureId),e.costCenterId&&s.append("costCenterId",e.costCenterId),e.status&&s.append("status",e.status);const i=s.toString();return i&&(a+=`?${i}`),C(a)},Vo=(t,e,a)=>C(`/api/financial/${t}/${e}`,{method:"PUT",body:JSON.stringify(a)}),Uo=(t,e)=>C(`/api/financial/${t}/${e}`,{method:"DELETE"}),Wo=(t,e)=>{const a=e.map(s=>C(`/api/financial/${t}/${s}`,{method:"DELETE"}));return Promise.all(a)},Jo=(t,e,a)=>C(`/api/financial/${t}/${e}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),Go=t=>zo("payables",t),Is=t=>_o("payables",t),sn=(t,e)=>Vo("payables",t,e),on=t=>Uo("payables",t),rn=(t,e)=>Jo("payables",t,e),nn=t=>zo("receivables",t),Aa=t=>_o("receivables",t),ln=(t,e)=>Vo("receivables",t,e),dn=t=>Uo("receivables",t),cn=(t,e)=>Jo("receivables",t,e);let Va=null;function Se(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${s}`}async function un(){const t=document.getElementById("content");t.innerHTML=`
        <div class="flex items-center justify-center h-full min-h-[60vh] font-sans">
            <div class="flex flex-col items-center">
                <div class="w-12 h-12 border-[3px] border-indigo-50 border-t-indigo-500 rounded-full animate-spin mb-4 shadow-sm"></div>
                <p class="text-slate-500 font-semibold text-sm tracking-wide animate-pulse">Sincronizando dados...</p>
            </div>
        </div>
    `;try{const e=new Date,a=new Date(e.getFullYear(),e.getMonth(),e.getDate()),s=new Date(a);s.setHours(23,59,59,999);const i=new Date(a.getFullYear(),a.getMonth(),1),o=new Date(a.getFullYear(),a.getMonth()+1,0),r=new Date(a);r.setDate(a.getDate()-6);const n=f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId],l=n.join(","),d=n.map(async F=>{const[te,le]=await Promise.all([Pa(F,i.toISOString(),s.toISOString(),null).catch(()=>[]),mt(F).catch(()=>[])]);return{appts:te,clients:le}}),u=Promise.all([Aa({startDate:Se(i),endDate:Se(o),establishmentId:l}).catch(()=>({entries:[]})),Is({startDate:Se(i),endDate:Se(o),establishmentId:l}).catch(()=>({entries:[]}))]),[c,[p,b]]=await Promise.all([Promise.all(d),u]);let m=[],x=[];c.forEach(F=>{m=m.concat(F.appts),x=x.concat(F.clients)});const y=p.entries||[],S=b.entries||[],L=Se(a),D=y.filter(F=>F.status==="paid").reduce((F,te)=>F+te.amount,0),k=S.filter(F=>F.status==="paid").reduce((F,te)=>F+te.amount,0),I=D-k,M=y.filter(F=>F.status==="paid"&&(F.paymentDate===L||!F.paymentDate&&F.dueDate.startsWith(L))).reduce((F,te)=>F+te.amount,0),V=m.filter(F=>{const te=new Date(F.startTime);return te>=a&&te<=s}),P=V.length,z=m.filter(F=>F.status==="completed"),O=z.length>0?D/z.length:0,T=V.filter(F=>new Date(F.startTime).getTime()>=e.getTime()&&F.status!=="completed"&&F.status!=="cancelled").sort((F,te)=>new Date(F.startTime)-new Date(te.startTime)).slice(0,4).map(F=>({client:F.clientName||"Desconhecido",service:F.serviceName||(F.services&&F.services[0]?F.services[0].name:"Serviço"),time:new Date(F.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),prof:(F.professionalName||"").split(" ")[0]||"Profissionais",id:F.id})),A=`${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}`,N=new Map;x.forEach(F=>{F.phone?N.set(F.phone,F):N.set(F.id||Math.random().toString(),F)});const ee=Array.from(N.values()).filter(F=>{if(!F.birthDate)return!1;let te,le;if(F.birthDate.includes("-")){const W=F.birthDate.split("-");W[0].length===4?(te=W[1],le=W[2]):(le=W[0],te=W[1])}else if(F.birthDate.includes("/")){const W=F.birthDate.split("/");le=W[0],te=W[1]}return`${le}/${te}`===A}).map(F=>{let te="";return F.birthDate&&F.birthDate.includes("-")&&F.birthDate.split("-")[0].length===4&&(te=a.getFullYear()-parseInt(F.birthDate.split("-")[0])),{name:F.name,age:te,phone:F.phone}}),oe={receitaHoje:M,agendamentosHoje:P,receitaMes:D,despesaMes:k,saldoMes:I,ticketMedio:O},Z=n.length>1;pn(t,oe,T,ee,Z,Se(r),Se(a)),await Qo(r,a),mn()}catch(e){console.error("Erro ao carregar dashboard:",e),t.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full min-h-[60vh] text-slate-500 font-sans">
                <i class="bi bi-exclamation-triangle text-5xl mb-4 text-rose-400"></i>
                <h3 class="font-bold text-lg text-slate-700">Erro de Sincronização</h3>
                <p class="font-medium text-sm mt-1">Ocorreu um problema ao comunicar com o servidor.</p>
                <button onclick="window.navigateTo('dashboard-section')" class="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm active:scale-95">Tentar Novamente</button>
            </div>
        `}}function pn(t,e,a,s,i,o,r){const n=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),l=i?`
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
                                <input type="date" id="chart-end-date" value="${r}" class="bg-white text-[10px] md:text-xs py-1.5 px-2 border border-slate-200 rounded text-slate-600 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 shadow-sm flex-1 md:w-28 font-medium">
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
                                            <p class="font-semibold text-slate-700 text-[0.8rem] group-hover:text-indigo-700 transition-colors">${v(d.client)}</p>
                                            <p class="text-[10px] font-medium text-slate-500 mt-0.5">${v(d.service)} <span class="mx-1 text-slate-300">•</span> ${v(d.prof)}</p>
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
                                            ${v(d.name).charAt(0)}
                                        </div>
                                        <div>
                                            <p class="font-semibold text-slate-700 text-[0.75rem] leading-tight">${v(d.name)}</p>
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
    `}async function Qo(t,e){const a=document.getElementById("chart-container"),s=document.getElementById("chart-start-date"),i=document.getElementById("chart-end-date");if(a){const o=document.createElement("div");o.id="chart-loading-overlay",o.className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-xl",o.innerHTML='<div class="w-8 h-8 border-[3px] border-indigo-100 border-t-indigo-500 rounded-full animate-spin"></div>',a.appendChild(o)}try{const o=Se(t),r=Se(e),n=f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId],l=n.join(","),d=await Aa({startDate:o,endDate:r,establishmentId:l}).catch(()=>({entries:[]})),u=n.map(D=>Pa(D,o+"T00:00:00.000Z",r+"T23:59:59.999Z",null).catch(()=>[])),p=(await Promise.all(u)).flat(),b=d.entries||[],m=[],x=[],y=[];let S=new Date(t);S.setHours(0,0,0,0);const L=new Date(e);for(L.setHours(23,59,59,999);S<=L;){const D=Se(S);m.push(S.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}));const k=b.filter(M=>M.status==="paid"&&(M.paymentDate===D||!M.paymentDate&&M.dueDate.startsWith(D))).reduce((M,V)=>M+V.amount,0),I=p.filter(M=>M.status==="completed"&&M.startTime&&M.startTime.startsWith(D)).length;x.push(k),y.push(I),S.setDate(S.getDate()+1)}bn(m,x,y),s&&(s.value=o),i&&(i.value=r)}catch(o){console.error("Erro ao recarregar grafico:",o)}finally{const o=document.getElementById("chart-loading-overlay");o&&o.remove()}}function bn(t,e,a){const s=document.getElementById("revenueChart");if(!s)return;Va&&Va.destroy();const o=s.getContext("2d").createLinearGradient(0,0,0,240);o.addColorStop(0,"rgba(99, 102, 241, 0.2)"),o.addColorStop(1,"rgba(99, 102, 241, 0.0)"),Va=new Chart(s,{type:"line",data:{labels:t,datasets:[{label:"Receita Real (R$)",data:e,borderColor:"#6366f1",backgroundColor:o,borderWidth:2,pointBackgroundColor:"#ffffff",pointBorderColor:"#6366f1",pointBorderWidth:2,pointRadius:3,pointHoverRadius:5,fill:!0,tension:.3,yAxisID:"y"},{label:"Agendamentos Feitos",data:a,borderColor:"#10b981",backgroundColor:"transparent",borderWidth:2,borderDash:[5,5],pointBackgroundColor:"#10b981",pointBorderColor:"#ffffff",pointBorderWidth:1,pointRadius:3,pointHoverRadius:5,fill:!1,tension:.3,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0,position:"top",align:"end",labels:{usePointStyle:!0,boxWidth:6,boxHeight:6,font:{family:"Nunito, sans-serif",size:10,weight:"bold"},color:"#64748b"}},tooltip:{backgroundColor:"#1e293b",padding:10,cornerRadius:8,titleFont:{size:11,family:"Nunito, sans-serif",weight:"normal"},bodyFont:{size:12,weight:"bold",family:"Nunito, sans-serif"},displayColors:!0,usePointStyle:!0,callbacks:{label:function(r){return r.datasetIndex===0?"Receita: "+new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(r.parsed.y):"Concluídos: "+r.parsed.y}}}},scales:{y:{type:"linear",display:!0,position:"left",beginAtZero:!0,grid:{color:"#f8fafc",drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Nunito, sans-serif",size:9,weight:"600"},maxTicksLimit:6,callback:function(r){return"R$ "+r}}},y1:{type:"linear",display:!0,position:"right",beginAtZero:!0,grid:{drawOnChartArea:!1},border:{display:!1},ticks:{color:"#10b981",font:{family:"Nunito, sans-serif",size:9,weight:"600"},stepSize:1,callback:function(r){if(Math.floor(r)===r)return r}}},x:{grid:{display:!1,drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Nunito, sans-serif",size:9,weight:"600"}}}},interaction:{intersect:!1,mode:"index"}}})}function mn(){document.getElementById("content").addEventListener("click",e=>{if(e.target.closest("#btn-update-chart")){const o=document.getElementById("chart-start-date"),r=document.getElementById("chart-end-date");if(o&&r&&o.value&&r.value){const n=new Date(o.value+"T00:00:00"),l=new Date(r.value+"T00:00:00");Qo(n,l)}return}const s=e.target.closest("[data-action]");if(!s)return;switch(s.dataset.action){case"goto-agenda":case"new-appointment":ie("agenda-section");break;case"goto-pdv":ie("comandas-section");break;case"goto-clients":ie("clientes-section");break;case"open-link":const o=`${window.location.origin}/cliente.html?id=${f.establishmentId||""}`;window.open(o,"_blank");break}})}const Ue=t=>C(`/api/services/${t}`),gn=t=>C("/api/services",{method:"POST",body:JSON.stringify(t)}),fn=(t,e)=>C(`/api/services/${t}`,{method:"PUT",body:JSON.stringify(e)}),Yo=t=>C(`/api/services/${t}`,{method:"DELETE"}),ja=(t,e,a,s="all")=>{const i=`/api/blockages/${t}?startDate=${e}&endDate=${a}&professionalId=${s}`;return C(i)},qa=t=>C("/api/blockages",{method:"POST",body:JSON.stringify(t)}),$s=t=>C(`/api/blockages/${t}`,{method:"DELETE"}),Xo=t=>C("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:t})});document.getElementById("content");let Ws=!1;const ha=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5",light:"#c7d2fe"},{bg:"#d1fae5",border:"#059669",main:"#059669",light:"#a7f3d0"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48",light:"#fecdd3"},{bg:"#fef3c7",border:"#d97706",main:"#d97706",light:"#fde68a"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490",light:"#a5f3fc"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7",light:"#bae6fd"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed",light:"#ddd6fe"},{bg:"#fce7f3",border:"#db2777",main:"#db2777",light:"#fbcfe8"}];let Na=[],es=[],va={},Zo=[],j={currentView:window.innerWidth<768?"list":"week",currentDate:new Date,selectedProfessionalId:"all",showInactiveProfs:!1,isSelectionMode:!1,selectedItems:new Set,loadedEstablishments:[]},H={step:1,data:{id:null,establishmentId:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,originalDate:null,originalTime:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function Ko(t){const e=new Date(t),a=e.getDay(),s=e.getDate()-a+(a===0?-6:1);return e.setDate(s),e.setHours(0,0,0,0),e}function na(t){const e=t||new Date,a=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${a}-${s}-${i}`}function Es(){const t=document.getElementById("profSelectorContainer");if(!t||!f.professionals)return;let e=f.professionals.filter(i=>j.showInactiveProfs||i.status!=="inactive");const s=[...[{id:"all",name:"Todos",photo:null}],...e];t.innerHTML=s.map(i=>{const o=j.selectedProfessionalId===i.id,r=i.name==="Todos"?"T":i.name.charAt(0).toUpperCase(),n=i.id!=="all"?f.professionalColors.get(i.id)||ha[0]:{main:"#adb5bd",light:"#f1f3f5"};return`
            <div class="flex items-center gap-2 px-4 py-1.5 rounded-full whitespace-nowrap cursor-pointer transition-transform active:scale-95 border ${o?"border-transparent shadow-sm":"border-gray-200 bg-white hover:bg-gray-50"}"
                 data-action="select-professional" data-prof-id="${i.id}"
                 style="background-color: ${o?n.light:""}; border-color: ${o?n.main:""}; color: ${o?n.main:"#4b5563"};">
                <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0" 
                     style="background-color: ${n.main}; ${i.photo?`background-image: url('${Y(i.photo)}'); background-size: cover; background-position: center;`:""}">
                    ${i.photo?"":r}
                </div>
                <span class="text-sm font-semibold tracking-tight">${Y(i.name==="Todos"?"Todos":i.name.split(" ")[0])}</span>
            </div>`}).join("")}function xn(){const t=document.getElementById("calendarStripContainer");if(!t||j.currentView!=="list")return;const e=new Date;e.setHours(0,0,0,0);const a=new Date(j.currentDate);a.setHours(0,0,0,0);let s="";const i=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];for(let o=-7;o<=14;o++){const r=new Date(a);r.setDate(a.getDate()+o),r.setHours(0,0,0,0);const n=r.getTime()===a.getTime(),l=r.getTime()===e.getTime(),d=i[r.getDay()],u=r.getDate(),c=n?"bg-indigo-600 text-white shadow-md":l?"bg-indigo-50 text-indigo-700 border border-indigo-100":"bg-gray-50 text-gray-500 border border-transparent",p=n?"text-white":l?"text-indigo-700":"text-gray-900";s+=`
            <div type="button" class="flex flex-col items-center justify-center min-w-[3.5rem] py-2 rounded-xl ${c} cursor-pointer transition-transform active:scale-90 flex-shrink-0" data-action="select-date" data-date="${r.toISOString()}">
                <span class="text-[0.65rem] uppercase font-bold tracking-wider opacity-80 pointer-events-none">${d}</span>
                <span class="text-lg font-bold ${p} pointer-events-none mt-0.5">${u}</span>
                ${l&&!n?'<div class="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 pointer-events-none"></div>':'<div class="w-1.5 h-1.5 mt-1 opacity-0"></div>'}
            </div>
        `}t.innerHTML=s,t.querySelectorAll('[data-action="select-date"]').forEach(o=>{o.addEventListener("click",()=>{const r=new Date(o.dataset.date);j.currentDate=r,navigator.vibrate&&navigator.vibrate(30),Ie()})}),requestAnimationFrame(()=>{const o=t.querySelector(".bg-indigo-600");o&&o.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})})}function Y(t){return v(t||"")}function hn(t,e,a,s,i){const o=(t||"").replace(/\D/g,""),r=new Date(i).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),n=new Date(i).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=`Olá, ${e}! Você tem um agendamento de ${a} com ${s} para ${r} às ${n}. Podemos confirmar?`;return`https://wa.me/${o}?text=${encodeURIComponent(l)}`}function vn(t){const e=document.getElementById("agenda-view");if(!e)return;const a=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],s=Ko(j.currentDate),i=new Date;i.setHours(0,0,0,0);let o='<div class="week-container flex gap-2 overflow-x-auto hide-scrollbar px-4" id="weekScroller">';for(let r=0;r<7;r++){const n=new Date(s);n.setDate(s.getDate()+r);const l=n.toDateString()===i.toDateString(),d=t.filter(c=>new Date(c.startTime).toDateString()===n.toDateString()).sort((c,p)=>new Date(c.startTime)-new Date(p.startTime));let u="";d.length===0?u='<div class="week-empty text-xs text-gray-400 text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200"><i class="bi bi-dash-lg block text-lg mb-1 pointer-events-none"></i>Livre</div>':u=d.map(c=>{const b=new Date(c.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),x=new Date(c.endTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),y=f.professionalColors.get(c.professionalId)||{main:"#adb5bd"},S=c.status==="completed",L=j.selectedItems.has(c.id),D=c.coveredByPlan;if(c.type==="blockage")return`<div class="week-event-chip bg-red-50 border-l-4 border-red-500 rounded-md p-2 mb-2 shadow-sm cursor-default">
                        <div class="text-[9px] uppercase font-black text-red-500 mb-0.5"><i class="bi bi-lock-fill"></i> Bloqueio</div>
                        <div class="text-xs font-bold text-red-800">${b} - ${x}</div>
                        <div class="text-xs text-red-900 font-semibold mt-1 leading-tight">${Y(c.reason||"Indisponível")}</div>
                        <div class="text-[0.65rem] text-red-600 mt-1"><i class="bi bi-person-badge"></i> ${Y(c.professionalName)}</div>
                    </div>`;const k=L?"ring-2 ring-indigo-500 bg-indigo-50":"bg-white",I=j.isSelectionMode?`<div class="absolute top-1 right-1 z-10 pointer-events-none">
                           <input type="checkbox" class="w-4 h-4 accent-indigo-600 pointer-events-none" ${L?"checked":""}>
                       </div>`:"";let M="";return c.status==="completed"?M='<i class="bi bi-check-all text-green-500 ml-1" title="Finalizado"></i>':c.status==="confirmed"?M='<i class="bi bi-hand-thumbs-up-fill text-blue-500 ml-1" title="Confirmado"></i>':M='<i class="bi bi-clock-history text-orange-400 ml-1" title="Aguardando Confirmação"></i>',`<div class="week-event-chip relative shadow-sm border-l-4 rounded-md p-2 mb-2 cursor-pointer transition-transform active:scale-95 ${S?"opacity-60":""} ${k}" style="border-left-color: ${y.main};"
                    data-action="edit-appointment" data-appointment-id="${c.id}">
                    ${I}
                    <div class="text-xs font-bold text-gray-900 pointer-events-none">${b}</div>
                    <div class="text-xs text-gray-800 font-semibold mt-0.5 truncate pr-2 flex items-center pointer-events-none">
                        ${Y(c.clientName)} 
                        ${M}
                        ${D?'<i class="bi bi-gem text-indigo-500 ml-1" title="Cliente VIP"></i>':""}
                    </div>
                    <div class="text-[0.65rem] text-gray-500 leading-tight mt-0.5 pointer-events-none">${Y(c.serviceName)} <br/> <span class="font-medium text-indigo-600">${Y((c.professionalName||"").split(" ")[0])}</span></div>
                </div>`}).join(""),o+=`<div class="week-day-col min-w-[140px] flex-1 flex flex-col pt-2">
            <div class="week-day-header text-center mb-3 pb-2 border-b border-gray-200 ${l?"is-today":""}">
                <div class="text-xs uppercase font-bold text-gray-500 ${l?"text-indigo-600":""}">${l?"Hoje":a[r]}</div>
                <div class="text-xl font-black text-gray-900 ${l?"text-indigo-600":""}">${n.getDate()}</div>
            </div>
            <div class="week-day-events flex-1">${u}</div>
        </div>`}o+="</div>",e.innerHTML=o,requestAnimationFrame(()=>{const r=document.getElementById("weekScroller");if(r&&window.innerWidth<768){const n=r.querySelector(".is-today");n&&n.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}})}function yn(t){const e=document.getElementById("agenda-view");if(!e)return;if(t.sort((s,i)=>new Date(s.startTime)-new Date(i.startTime)),t.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-300">
                    <i class="bi bi-calendar2-x text-3xl"></i>
                </div>
                <p class="text-gray-800 font-bold text-lg mb-1">Agenda Livre</p>
                <p class="text-gray-500 text-sm">Não há agendamentos para esta data.</p>
            </div>`;return}let a='<div class="list-container px-4 py-2 space-y-4">';t.forEach(s=>{const i=new Date(s.startTime),o=new Date(s.endTime),r=Math.round((o-i)/6e4),n=i.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=o.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=f.professionalColors.get(s.professionalId)||{main:"#adb5bd"},u=s.status==="completed",c=j.selectedItems.has(s.id),p=j.isSelectionMode?`<div class="flex items-center justify-center pr-3 border-r border-gray-100 mr-3 pointer-events-none">
                   <input type="checkbox" class="w-5 h-5 accent-indigo-600 pointer-events-none" ${c?"checked":""}>
               </div>`:"",b=c?"ring-2 ring-indigo-500 bg-indigo-50":"bg-white";if(s.type==="blockage"){a+=`<div class="list-card flex bg-red-50 rounded-2xl p-4 shadow-sm border border-red-200 mb-3 cursor-default">
                ${p}
                <div class="flex flex-col items-center justify-center border-r border-red-200 pr-4 min-w-[5rem]">
                    <span class="text-sm font-bold text-red-700">${n}</span>
                    <span class="text-xs text-red-400 font-semibold my-0.5">até</span>
                    <span class="text-sm font-bold text-red-700">${l}</span>
                </div>
                <div class="flex-1 pl-4 flex flex-col justify-center">
                    <div class="flex items-center gap-2">
                        <span class="bg-red-100 text-red-800 text-[10px] uppercase font-black px-2 py-0.5 rounded-md"><i class="bi bi-lock-fill"></i> Bloqueio</span>
                    </div>
                    <h3 class="font-bold text-red-900 text-sm mt-1.5">${Y(s.reason||"Motivo não informado")}</h3>
                    <p class="text-xs text-red-600 mt-1 font-medium"><i class="bi bi-person-badge"></i> ${Y(s.professionalName)}</p>
                </div>
            </div>`;return}const m=hn(s.clientPhone,s.clientName,s.serviceName,s.professionalName,s.startTime),x=(s.services||[]).reduce((M,V)=>M+(Number(V.price)||0),0)||Number(s.servicePrice||0),y=s.totalAmount!==void 0?Number(s.totalAmount):x,L=s.coveredByPlan?'<span class="bg-indigo-100 text-indigo-700 text-[9px] px-1.5 py-0.5 rounded border border-indigo-200 font-black uppercase tracking-wider ml-1 flex-shrink-0" title="Coberto pelo Plano VIP"><i class="bi bi-gem mr-0.5"></i> VIP</span>':"";let D="";s.status==="completed"?D='<span class="text-[0.65rem] px-2 py-0.5 rounded border font-bold bg-green-50 text-green-700 border-green-200"><i class="bi bi-check-all"></i> Finalizado</span>':s.status==="confirmed"?D='<span class="text-[0.65rem] px-2 py-0.5 rounded border font-bold bg-blue-50 text-blue-700 border-blue-200"><i class="bi bi-hand-thumbs-up-fill"></i> Confirmado</span>':D='<span class="text-[0.65rem] px-2 py-0.5 rounded border font-bold bg-orange-50 text-orange-700 border-orange-200"><i class="bi bi-clock-history"></i> Aguardando Confirmação</span>';const k=Y((s.professionalName||"").split(" ")[0]);let I="";if(j.loadedEstablishments.length>1){const M=j.loadedEstablishments.find(P=>P.id===s.establishmentId),V=M?M.name:"Outra Unidade";I=`<span class="text-[0.6rem] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200 font-bold truncate max-w-[100px]"><i class="bi bi-shop"></i> ${Y(V)}</span>`}a+=`<div class="list-card flex rounded-2xl p-3.5 shadow-sm border border-gray-100 ${b} ${u?"opacity-70 bg-gray-50":""}"
            style="border-left: 5px solid ${d.main};">
            
            ${p}
            
            <div class="flex-1 flex min-w-0 cursor-pointer transition-transform active:scale-[0.98]" data-action="edit-appointment" data-appointment-id="${s.id}">
                <div class="flex flex-col items-center justify-center border-r border-gray-100 pr-3.5 min-w-[4.5rem]">
                    <span class="text-lg font-bold text-gray-900 ${u?"line-through text-gray-500":""} pointer-events-none">${n}</span>
                    <span class="text-xs text-gray-500 font-medium pointer-events-none">${r} min</span>
                </div>
                
                <div class="flex-1 pl-3.5 flex flex-col justify-center min-w-0 pointer-events-none">
                    <div class="flex items-center">
                        <h3 class="font-bold text-gray-900 text-[0.95rem] truncate">${Y(s.clientName)}</h3>
                        ${L}
                    </div>
                    <p class="text-xs text-gray-600 mt-0.5 truncate">${Y(s.serviceName)} <span class="font-bold text-indigo-600 px-1">·</span> ${k}</p>
                    
                    <div class="flex flex-wrap gap-1.5 mt-2.5 items-center">
                        <span class="text-[0.65rem] bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200 font-bold">R$ ${y.toFixed(2).replace(".",",")}</span>
                        ${s.clientPhone?`<span class="text-[0.65rem] bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200 font-bold flex items-center gap-1"><i class="bi bi-telephone-fill opacity-70"></i> ${Y(s.clientPhone)}</span>`:""}
                        ${D}
                        ${I}
                    </div>
                </div>
            </div>

            ${!u&&!j.isSelectionMode?`
            <div class="flex flex-col justify-center items-end pl-2 gap-2.5 border-l border-gray-50 relative z-10 ml-2">
                ${s.status!=="confirmed"?`
                <button type="button" class="lc-action-btn w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-transform active:scale-90 shadow-sm border border-blue-100" data-action="confirm-appointment" data-appointment-id="${s.id}" title="Confirmar Manualmente">
                    <i class="bi bi-check-lg text-xl pointer-events-none"></i>
                </button>
                `:""}
                <button type="button" class="lc-action-btn wa w-11 h-11 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-transform active:scale-90 shadow-sm border border-green-100" data-link="${m}" title="WhatsApp">
                    <i class="bi bi-whatsapp text-lg pointer-events-none"></i>
                </button>
                <button type="button" class="lc-action-btn comanda w-11 h-11 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-transform active:scale-90 shadow-sm border border-indigo-100" data-action="open-comanda" data-appointment-id="${s.id}" title="Comanda">
                    <i class="bi bi-receipt-cutoff text-lg pointer-events-none"></i>
                </button>
            </div>`:""}
        </div>`}),a+="</div>",e.innerHTML=a}function ei(){const t=f.allEvents.filter(e=>j.selectedProfessionalId==="all"||e.professionalId===j.selectedProfessionalId);j.currentView==="list"?yn(t):vn(t),Ls()}function Ls(){const t=document.getElementById("batch-delete-container"),e=document.getElementById("agendaFab");t&&(j.isSelectionMode&&j.selectedItems.size>0?(t.innerHTML=`<div class="bg-gray-900 text-white p-3 mx-4 rounded-2xl shadow-xl flex items-center justify-between">
            <span class="font-semibold text-sm flex items-center"><span class="bg-indigo-500 text-white w-6 h-6 flex items-center justify-center rounded-full mr-2 text-xs">${j.selectedItems.size}</span> selecionados</span>
            <button type="button" data-action="batch-delete" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors">
                <i class="bi bi-trash3-fill"></i> Apagar
            </button>
        </div>`,t.style.display="block",e&&(e.style.transform="scale(0)")):(t.style.display="none",e&&(e.style.transform="scale(1)")))}function wn(){const t=document.getElementById("currentMonthYearDisplay");if(t){const a=new Date(j.currentDate).toLocaleDateString("pt-BR",{month:"long",year:"numeric"});t.textContent=a.charAt(0).toUpperCase()+a.slice(1)}if(j.currentView==="list"){xn();const e=document.getElementById("calendarStripContainer");e&&(e.style.display="flex")}else{const e=document.getElementById("calendarStripContainer");e&&(e.style.display="none")}}async function Ie(){const t=document.getElementById("agenda-view");if(!t)return;j.selectedItems.clear(),Ls(),t.innerHTML='<div class="flex items-center justify-center h-40"><div class="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>',wn();let e,a;if(j.currentView==="list")e=new Date(j.currentDate),e.setHours(0,0,0,0),a=new Date(e),a.setHours(23,59,59,999);else{const s=Ko(j.currentDate);e=new Date(s),a=new Date(s),a.setDate(s.getDate()+6),a.setHours(23,59,59,999)}try{const i=(f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId]).map(async u=>{const[c,p]=await Promise.all([Pa(u,e.toISOString(),a.toISOString(),j.selectedProfessionalId==="all"?null:j.selectedProfessionalId),ja(u,e.toISOString(),a.toISOString(),j.selectedProfessionalId)]);return{appts:c||[],blockages:p||[]}}),o=await Promise.all(i);let r=[],n=[];if(o.forEach(u=>{r=r.concat(u.appts),n=n.concat(u.blockages)}),!document.getElementById("agenda-view"))return;const l=u=>u.map(c=>({...c,type:"appointment",professionalName:c.professionalName||(()=>{const p=f.professionals?.find(b=>b.id===c.professionalId);return p?p.name:"Indefinido"})()})),d=u=>u.map(c=>({...c,type:"blockage",professionalName:c.professionalName||(()=>{const p=f.professionals?.find(b=>b.id===c.professionalId);return p?p.name:"Indefinido"})()}));f.allEvents=[...l(r),...d(n)],Es(),ei()}catch{document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML=`
                <div class="text-center py-12 text-gray-500">
                    <i class="bi bi-exclamation-triangle text-3xl mb-2"></i>
                    <p class="text-sm font-medium">Erro ao carregar a agenda.</p>
                </div>`)}}async function kn(){try{const e=(f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId]).map(async r=>{const[n,l,d]=await Promise.all([De(r),Ue(r),Ae(r)]);return{estId:r,profs:n||[],services:l||[],estDetails:d}}),a=await Promise.all(e),s=new Map,i=new Map;let o=a[0]?.estDetails;j.loadedEstablishments=a.map(r=>({id:r.estId,name:r.estDetails?.nomeFantasia||r.estDetails?.name||`Unidade ${r.estId.substring(0,4)}`})),a.forEach(r=>{r.profs.forEach(n=>s.set(n.id,n)),r.services.forEach(n=>i.set(n.id,n))}),f.professionals=Array.from(s.values()),f.services=Array.from(i.values()),Zo=[],o&&(va=o.loyaltyProgram||{enabled:!1}),f.professionals.forEach((r,n)=>{f.professionalColors.set(r.id,ha[n%ha.length])}),Es()}catch{g("Atenção","Não foi possível carregar os dados da equipe.","error")}}async function Sn(t,e){if(!await G("Confirmar Agendamento","Deseja confirmar este agendamento manualmente?"))return;const s=e.innerHTML;e.innerHTML='<div class="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin pointer-events-none"></div>',e.disabled=!0;try{await pr(t,"confirmed"),g("Agendamento confirmado!","success"),Ie()}catch(i){console.error("Erro ao confirmar:",i),g("Erro ao confirmar: "+i.message,"error"),e.innerHTML=s,e.disabled=!1}}function Js(){const t=document.getElementById("estSelectorModal");t&&t.remove();const e=document.createElement("div");e.id="estSelectorModal",e.className="fixed inset-0 z-[11000] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300 px-4 opacity-0";const a=(j.loadedEstablishments||[]).map(i=>`
        <button type="button" class="w-full text-left p-4 bg-white border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 rounded-2xl shadow-sm transition-all flex items-center gap-4 mb-3 est-option-btn active:scale-95" data-est-id="${i.id}">
            <div class="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black shadow-sm pointer-events-none">
                <i class="bi bi-shop text-xl"></i>
            </div>
            <div class="flex-1 pointer-events-none">
                <p class="font-bold text-gray-900 text-base">${Y(i.name)}</p>
                <p class="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5 font-bold">Selecionar Unidade</p>
            </div>
            <i class="bi bi-chevron-right text-gray-400 text-lg pointer-events-none"></i>
        </button>
    `).join("");e.innerHTML=`
        <div class="bg-white rounded-[2rem] w-full max-w-sm shadow-2xl overflow-hidden flex flex-col transform transition-transform duration-300 scale-95" id="estSelectorModalContent">
            <div class="p-6 border-b border-gray-100 flex items-start justify-between bg-gray-50/50">
                <div>
                    <h3 class="font-black text-gray-900 text-xl tracking-tight">Novo Agendamento</h3>
                    <p class="text-xs text-gray-500 font-bold mt-1.5 uppercase tracking-wide">Escolha a unidade de destino</p>
                </div>
                <button type="button" class="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-100 shadow-sm active:scale-90 transition-transform" id="closeEstModalBtn">
                    <i class="bi bi-x-lg text-xs pointer-events-none"></i>
                </button>
            </div>
            <div class="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar bg-slate-50">
                ${a}
            </div>
        </div>
    `,document.body.appendChild(e),requestAnimationFrame(()=>{e.classList.remove("opacity-0");const i=e.querySelector("#estSelectorModalContent");i.classList.remove("scale-95"),i.classList.add("scale-100")});const s=()=>{e.classList.add("opacity-0");const i=e.querySelector("#estSelectorModalContent");i.classList.remove("scale-100"),i.classList.add("scale-95"),setTimeout(()=>e.remove(),300)};document.getElementById("closeEstModalBtn").addEventListener("click",s),e.querySelectorAll(".est-option-btn").forEach(i=>{i.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15);const o=i.dataset.estId;s(),setTimeout(()=>{It({establishmentId:o},!1)},300)})})}async function ti(t={}){j.currentDate=t.targetDate?new Date(t.targetDate):j.currentDate||new Date,j.isSelectionMode=!1,j.selectedItems.clear();const e=document.getElementById("content");if(!e)return;e.innerHTML=`
        <div class="flex flex-col h-[calc(100vh-80px)] md:h-auto bg-gray-50 relative font-sans w-full">

            <div class="bg-white pt-safe-top sticky top-0 z-10 shadow-sm border-b border-gray-100 flex flex-col">
                <div class="flex justify-between items-center px-4 py-3">
                    <div class="flex items-center gap-3">
                        <button type="button" id="btnWeekDays" class="text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors" title="Opções">
                            <i class="bi bi-sliders text-xl"></i>
                        </button>
                        <h1 id="currentMonthYearDisplay" class="text-lg font-bold text-gray-900 m-0 leading-none">Carregando...</h1>
                    </div>

                    <div class="flex items-center gap-2">
                        <div class="flex items-center gap-1 bg-indigo-50 rounded-lg border border-indigo-100 p-0.5 shadow-sm">
                            <button type="button" id="btnPrevDate" class="w-7 h-7 flex items-center justify-center text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors active:scale-95" title="Anterior">
                                <i class="bi bi-chevron-left text-sm"></i>
                            </button>
                            <button type="button" id="btnTodayHeader" class="text-indigo-700 px-2 py-1 font-bold text-xs hover:bg-indigo-100 transition-colors uppercase tracking-wide rounded-md active:scale-95">
                                Hoje
                            </button>
                            <button type="button" id="btnNextDate" class="w-7 h-7 flex items-center justify-center text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors active:scale-95" title="Próximo">
                                <i class="bi bi-chevron-right text-sm"></i>
                            </button>
                        </div>
                        <div class="agenda-view-toggle bg-gray-100 p-1 rounded-xl flex gap-1">
                            <button type="button" class="${j.currentView==="list"?"bg-white shadow-sm":"text-gray-500"} rounded-lg px-3 py-1 text-xs font-bold transition-all" data-action="setView" data-view="list">Lista</button>
                            <button type="button" class="${j.currentView==="week"?"bg-white shadow-sm":"text-gray-500"} rounded-lg px-3 py-1 text-xs font-bold transition-all" data-action="setView" data-view="week">Semana</button>
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

            <button type="button" id="agendaFab" data-action="open-new-appointment-modal" class="fixed bottom-24 right-4 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform active:scale-90 z-40">
                <i class="bi bi-plus-lg text-2xl pointer-events-none"></i>
            </button>
            
            <div id="appointmentModal" class="fixed inset-0 z-[10000] hidden"></div>
        </div>`,document.getElementById("btnTodayHeader").addEventListener("click",()=>{j.currentDate=new Date,navigator.vibrate&&navigator.vibrate(30),Ie()}),document.getElementById("btnPrevDate").addEventListener("click",()=>{const s=j.currentView==="week"?7:1;j.currentDate.setDate(j.currentDate.getDate()-s),navigator.vibrate&&navigator.vibrate(20),Ie()}),document.getElementById("btnNextDate").addEventListener("click",()=>{const s=j.currentView==="week"?7:1;j.currentDate.setDate(j.currentDate.getDate()+s),navigator.vibrate&&navigator.vibrate(20),Ie()});const a=document.querySelectorAll(".agenda-view-toggle button");a.forEach(s=>{s.addEventListener("click",()=>{a.forEach(i=>{i.classList.remove("bg-white","shadow-sm"),i.classList.add("text-gray-500")}),s.classList.add("bg-white","shadow-sm"),s.classList.remove("text-gray-500"),j.currentView=s.dataset.view,navigator.vibrate&&navigator.vibrate(20),Ie()})}),document.getElementById("btnWeekDays").addEventListener("click",In),Ws||(document.body.addEventListener("click",async s=>{if(!document.getElementById("agenda-view"))return;const i=s.target.closest('[data-action="confirm-appointment"]');if(i){s.preventDefault(),s.stopPropagation(),navigator.vibrate&&navigator.vibrate(20);const c=i.dataset.appointmentId;if(!c)return;Sn(c,i);return}const o=s.target.closest('[data-action="open-comanda"]');if(o){s.preventDefault(),s.stopPropagation(),navigator.vibrate&&navigator.vibrate(20);const c=o.dataset.appointmentId;if(!c)return;const p=f.allEvents.find(x=>x.id===c);if(!p)return;const b=p.status==="completed"?"finalizadas":"em-atendimento",m={selectedAppointmentId:p.id,initialFilter:b};b==="finalizadas"&&p.transaction?.paidAt&&(m.filterDate=typeof p.transaction.paidAt=="object"?new Date(p.transaction.paidAt._seconds*1e3):p.transaction.paidAt),ie("comandas-section",m);return}const r=s.target.closest(".lc-action-btn.wa");if(r){s.preventDefault(),s.stopPropagation(),navigator.vibrate&&navigator.vibrate(20),r.dataset.link&&window.open(r.dataset.link,"_blank");return}if(s.target.closest('[data-action="batch-delete"]')){s.preventDefault(),s.stopPropagation();const c=j.selectedItems.size;await G("Apagar Selecionados",`Deseja apagar ${c} registro(s)? Esta ação é irreversível.`)&&(await Promise.all(Array.from(j.selectedItems).map(async b=>{try{await br(b)}catch{}})),g(`${c} registro(s) apagado(s).`,"success"),j.selectedItems.clear(),j.isSelectionMode=!1,Ie());return}const l=s.target.closest('[data-action="select-professional"]');if(l){s.preventDefault(),s.stopPropagation(),navigator.vibrate&&navigator.vibrate(20);const c=l.dataset.profId;j.selectedProfessionalId=j.selectedProfessionalId===c&&c!=="all"?"all":c,Ie();return}if(s.target.closest('[data-action="open-new-appointment-modal"]')){if(s.preventDefault(),s.stopPropagation(),navigator.vibrate&&navigator.vibrate(30),j.loadedEstablishments&&j.loadedEstablishments.length>1)Js();else{const c=j.loadedEstablishments&&j.loadedEstablishments.length===1?j.loadedEstablishments[0].id:f.establishmentId;It({establishmentId:c},!1)}return}const u=s.target.closest('[data-action="edit-appointment"]');if(u){s.preventDefault(),s.stopPropagation();const c=u.dataset.appointmentId,p=f.allEvents.find(b=>b.id===c);if(j.isSelectionMode){const b=u.closest(".list-card, .week-event-chip");if(!b)return;const m=b.querySelector('input[type="checkbox"]');if(m&&p){const x=!m.checked;m.checked=x,x?j.selectedItems.add(p.id):j.selectedItems.delete(p.id),(b.classList.contains("week-event-chip")||b.classList.contains("list-card"))&&(x?(b.classList.add("ring-2","ring-indigo-500","bg-indigo-50"),b.classList.remove("bg-white")):(b.classList.remove("ring-2","ring-indigo-500","bg-indigo-50"),b.classList.add("bg-white"))),navigator.vibrate&&navigator.vibrate(15),Ls()}return}p&&(navigator.vibrate&&navigator.vibrate(20),It(p));return}}),Ws=!0),await kn(),await Ie(),(t.action==="new-appointment"||t.openNewAppointment)&&setTimeout(()=>{if(j.loadedEstablishments&&j.loadedEstablishments.length>1)Js();else{const s=j.loadedEstablishments&&j.loadedEstablishments.length===1?j.loadedEstablishments[0].id:f.establishmentId;It({establishmentId:s},!1)}},500)}function In(){const t=document.getElementById("optionsSheet");if(t){t.remove();return}const e=document.createElement("div");e.id="optionsSheet",e.className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white rounded-t-3xl z-[10000] shadow-[0_-8px_40px_rgba(0,0,0,0.15)] transition-transform duration-300 translate-y-full";const a=j.isSelectionMode?"bg-red-50 text-red-600":"bg-green-50 text-green-700",s=j.isSelectionMode?"bi-x-circle":"bi-check2-square";e.innerHTML=`
        <div class="px-6 py-5">
            <div class="w-10 h-1.5 bg-gray-200 rounded-full mx-auto mb-5"></div>
            
            <div class="flex justify-between items-center mb-5">
                <span class="text-lg font-bold text-gray-900">Opções da Agenda</span>
                <button type="button" id="closeOptSheet" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200">
                    <i class="bi bi-x-lg text-sm pointer-events-none"></i>
                </button>
            </div>

            <div class="mb-5">
                <div class="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Gestão em Lote</div>
                <button type="button" id="optSelectMode" class="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 ${a} transition-colors active:scale-95">
                    <i class="bi ${s} text-lg pointer-events-none"></i> ${j.isSelectionMode?"Desativar Modo de Exclusão":"Ativar Seleção Múltipla"}
                </button>
                <p class="text-xs text-gray-500 text-center mt-2.5">${j.isSelectionMode?"Toque num cartão para desmarcar.":"Permite selecionar vários registros para apagar."}</p>
            </div>

            <div class="mb-4">
                <div class="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Equipe</div>
                <label class="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer">
                    <input type="checkbox" id="optInactiveToggle" class="w-5 h-5 accent-indigo-600 rounded" ${j.showInactiveProfs?"checked":""}>
                    <span class="text-sm font-semibold text-gray-700">Exibir profissionais inativos na barra</span>
                </label>
            </div>
        </div>`;const i=document.createElement("div");i.id="optionsOverlay",i.className="fixed inset-0 bg-black/40 z-[9999] opacity-0 transition-opacity duration-300",document.body.appendChild(i),document.body.appendChild(e),requestAnimationFrame(()=>{e.classList.remove("translate-y-full"),i.classList.remove("opacity-0")});const o=()=>{e.classList.add("translate-y-full"),i.classList.add("opacity-0"),setTimeout(()=>{e.remove(),i.remove()},300)};document.getElementById("closeOptSheet").addEventListener("click",o),i.addEventListener("click",o),document.getElementById("optSelectMode").addEventListener("click",()=>{j.isSelectionMode=!j.isSelectionMode,j.isSelectionMode||j.selectedItems.clear(),o(),ei()}),document.getElementById("optInactiveToggle").addEventListener("change",r=>{j.showInactiveProfs=r.target.checked,Es()})}function ht(t){t<1||t>4||(H.step=t,It(null,!0))}function $n(t){return{title:t?"Editar Reserva":"Novo Cliente",content:`
        <div class="p-4 space-y-4 flex-1">
            <div class="space-y-3">
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nome Completo</label>
                    <input type="text" id="apptClientName" placeholder="Ex: João Silva" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 font-semibold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm" value="${Y(H.data.clientName)}">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">WhatsApp / Telefone</label>
                    <input type="tel" id="apptClientPhone" placeholder="(00) 00000-0000" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 font-semibold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm" value="${Y(H.data.clientPhone)}">
                </div>
            </div>
            
            <div class="pt-4 border-t border-gray-200">
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Buscar na Base de Dados</label>
                <div class="relative">
                    <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none"></i>
                    <input type="text" id="clientSearchInput" placeholder="Procurar cliente..." class="w-full p-3 pl-11 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-900 font-medium focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all">
                </div>
                <div id="clientSearchResults" class="mt-3 space-y-2"></div>
            </div>
        </div>
        <div class="p-4 bg-white border-t border-gray-200 flex gap-3 pb-safe">
            <button type="button" data-action="close-modal" class="flex-1 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl active:bg-gray-200 transition-colors text-sm">Cancelar</button>
            <button type="button" data-action="next-step" data-current-step="1" class="flex-1 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform text-sm">Avançar</button>
        </div>`}}function En(){return{title:"Serviços",content:`
        <div class="p-4 space-y-4 flex-1 flex flex-col">
            <div class="flex items-center gap-3">
                <div class="relative flex-1">
                    <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none"></i>
                    <input type="search" id="serviceSearchModalInput" placeholder="Buscar serviço..." class="w-full p-3 pl-11 bg-gray-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none">
                </div>
                <label class="flex items-center gap-2 bg-white px-3 py-3 rounded-xl border border-gray-200 cursor-pointer shadow-sm">
                    <input type="checkbox" id="multiServiceToggle" class="w-5 h-5 accent-indigo-600 rounded" ${H.data.selectedServiceIds.length>1?"checked":""}>
                    <span class="text-xs font-bold text-gray-700 uppercase">Múltiplos</span>
                </label>
            </div>
            <div id="apptServicesContainer" class="flex-1 overflow-y-auto grid grid-cols-2 gap-3 content-start pb-4">
                ${Na.map(t=>`<div class="service-card p-3 bg-white rounded-xl border-2 transition-all active:scale-95 ${H.data.selectedServiceIds.includes(t.id)?"border-indigo-500 bg-indigo-50 shadow-md":"border-gray-100 hover:border-gray-200 shadow-sm"} cursor-pointer flex flex-col justify-between gap-2" data-service-id="${t.id}">
                        <div>
                            <p class="font-bold text-[0.85rem] leading-tight text-gray-900 line-clamp-2">${Y(t.name)}</p>
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
        </div>`}}function Ln(){return{title:"Equipe",content:`
        <div class="p-4 space-y-4 flex-1 flex flex-col">
            <div class="relative">
                <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none"></i>
                <input type="search" id="professionalSearchModalInput" placeholder="Procurar profissional..." class="w-full p-3 pl-11 bg-gray-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 outline-none">
            </div>
            <div id="apptProfessionalContainer" class="flex-1 overflow-y-auto grid grid-cols-3 gap-3 content-start pb-4">
                ${es.map(t=>{const e=H.data.professionalId===t.id,a=f.professionalColors.get(t.id)||ha[0];return`<div class="professional-modal-card p-3 bg-white rounded-2xl border-2 transition-all active:scale-95 ${e?"border-indigo-500 bg-indigo-50 shadow-md":"border-gray-100 hover:border-gray-200 shadow-sm"} cursor-pointer text-center flex flex-col items-center justify-center" data-professional-id="${t.id}">
                        <div class="w-14 h-14 rounded-full flex items-center justify-center font-black text-white text-xl shadow-sm mb-2" style="background-color: ${a.main}; ${t.photo?`background-image: url('${Y(t.photo)}'); background-size: cover; background-position: center;`:""}">
                            ${t.photo?"":Y(t.name).charAt(0)}
                        </div>
                        <p class="text-[0.75rem] font-bold text-gray-900 w-full truncate">${Y(t.name.split(" ")[0])}</p>
                    </div>`}).join("")}
            </div>
        </div>
        <div class="p-4 bg-white border-t border-gray-200 flex gap-3 pb-safe">
            <button type="button" data-action="prev-step" data-current-step="3" class="w-1/3 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl active:bg-gray-200 transition-colors text-sm">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="3" class="w-2/3 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform text-sm">Avançar</button>
        </div>`}}function Cn(){const t=H.data.date||na();return{title:"Horário",content:`
        <div class="p-4 space-y-4 flex-1 flex flex-col">
            
            <div class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-lg">${Y(H.data.clientName).charAt(0)}</div>
                <div class="flex-1 min-w-0">
                    <p class="font-bold text-sm text-gray-900 truncate">${Y(H.data.clientName)}</p>
                    <p class="text-xs font-bold text-gray-500 truncate mt-0.5"><i class="bi bi-person-badge mr-1"></i> ${Y(H.data.professionalName)}</p>
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
                <i class="bi bi-check-circle-fill pointer-events-none"></i> ${H.data.id?"Salvar":"Confirmar"}
            </button>
        </div>`}}async function It(t=null,e=!1){const a=document.getElementById("appointmentModal");e||(H={step:1,data:{id:t?.id||null,establishmentId:t?.establishmentId||null,clientName:t?.clientName||"",clientPhone:t?.clientPhone||"",selectedServiceIds:t?.services?.map(r=>r.id)||[],professionalId:t?.professionalId||null,professionalName:t?.professionalName||"",date:t?.startTime?na(new Date(t.startTime)):na(),time:t?.startTime?new Date(t.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null,originalDate:t?.startTime?na(new Date(t.startTime)):null,originalTime:t?.startTime?new Date(t.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null,redeemedReward:t?.redeemedReward||null,clientHasRewards:t?.hasRewards||!1,clientLoyaltyPoints:0}}),Na=f.services||[],es=(f.professionals||[]).filter(r=>r.status==="active");let s;switch(H.step){case 1:s=$n(t);break;case 2:s=En();break;case 3:s=Ln();break;case 4:s=Cn();break}a.className="fixed inset-0 z-[10000] hidden flex items-end md:items-center justify-center bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 opacity-0",a.innerHTML=`
        <div class="absolute inset-0 z-0 cursor-pointer" data-action="close-modal"></div>
        <div id="appointmentModalContent" class="relative z-10 w-full h-full md:h-auto md:max-h-[85vh] md:w-[550px] md:rounded-2xl bg-gray-50 flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-8 md:scale-95 shadow-2xl overflow-hidden">
            <header class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between pt-safe-top md:pt-4 shadow-sm z-20">
                <button type="button" data-action="close-modal" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 active:scale-90 transition-all">
                    <i class="bi bi-x-lg text-sm pointer-events-none"></i>
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
    `;const i=()=>{const r=a.querySelector("#appointmentModalContent");r&&(r.classList.remove("translate-y-0","md:translate-y-0","md:scale-100"),r.classList.add("translate-y-full","md:translate-y-8","md:scale-95")),a.classList.add("opacity-0"),setTimeout(()=>{a.classList.add("hidden")},300)};a.querySelectorAll('[data-action="next-step"]').forEach(r=>r.addEventListener("click",()=>{const n=parseInt(r.dataset.currentStep,10);if(n===1&&(H.data.clientName=a.querySelector("#apptClientName").value.trim(),H.data.clientPhone=a.querySelector("#apptClientPhone").value.trim(),!H.data.clientName))return g("Preencha o nome do cliente.","warning");if(n===2&&H.data.selectedServiceIds.length===0)return g("Selecione um serviço.","warning");if(n===3&&!H.data.professionalId)return g("Escolha um membro da equipe.","warning");ht(n+1)})),a.querySelectorAll('[data-action="prev-step"]').forEach(r=>r.addEventListener("click",()=>ht(parseInt(r.dataset.currentStep,10)-1))),a.querySelectorAll('[data-action="close-modal"]').forEach(r=>{r.addEventListener("click",i)}),a.classList.remove("hidden"),a.offsetWidth,a.classList.remove("opacity-0");const o=a.querySelector("#appointmentModalContent");o&&(o.classList.remove("translate-y-full","md:translate-y-8","md:scale-95"),o.classList.add("translate-y-0","md:translate-y-0","md:scale-100")),H.step===2&&a.querySelectorAll(".service-card").forEach(r=>r.addEventListener("click",()=>{const n=a.querySelector("#multiServiceToggle")?.checked,l=r.classList.contains("bg-indigo-50"),d=r.dataset.serviceId;navigator.vibrate&&navigator.vibrate(15),n?l?(r.classList.remove("border-indigo-500","bg-indigo-50","shadow-md"),r.classList.add("border-gray-100","shadow-sm"),H.data.selectedServiceIds=H.data.selectedServiceIds.filter(u=>u!==d)):(r.classList.add("border-indigo-500","bg-indigo-50","shadow-md"),r.classList.remove("border-gray-100","shadow-sm"),H.data.selectedServiceIds.includes(d)||H.data.selectedServiceIds.push(d)):(a.querySelectorAll(".service-card.bg-indigo-50").forEach(u=>{u.classList.remove("border-indigo-500","bg-indigo-50","shadow-md"),u.classList.add("border-gray-100","shadow-sm")}),r.classList.add("border-indigo-500","bg-indigo-50","shadow-md"),r.classList.remove("border-gray-100","shadow-sm"),H.data.selectedServiceIds=[d],setTimeout(()=>ht(3),250))})),H.step===3&&a.querySelectorAll(".professional-modal-card").forEach(r=>r.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15),a.querySelectorAll(".professional-modal-card.bg-indigo-50").forEach(l=>{l.classList.remove("border-indigo-500","bg-indigo-50","shadow-md"),l.classList.add("border-gray-100","shadow-sm")}),r.classList.add("border-indigo-500","bg-indigo-50","shadow-md"),r.classList.remove("border-gray-100","shadow-sm"),H.data.professionalId=r.dataset.professionalId;const n=es.find(l=>l.id===r.dataset.professionalId);H.data.professionalName=n?n.name:"",setTimeout(()=>ht(4),250)})),H.step===1&&a.querySelector("#clientSearchInput")?.addEventListener("input",r=>Tn(r.target.value)),H.step===4&&(a.querySelector("#apptDate")?.addEventListener("change",Gs),a.querySelector("#availableTimesContainer")?.addEventListener("click",r=>{const n=r.target.closest("button[data-time-slot]");n&&(navigator.vibrate&&navigator.vibrate(10),a.querySelectorAll("#availableTimesContainer button").forEach(l=>{l.classList.remove("bg-indigo-600","text-white","border-indigo-600","shadow-md"),l.classList.add("bg-white","text-gray-700","border-gray-200","shadow-sm")}),n.classList.add("bg-indigo-600","text-white","border-indigo-600","shadow-md"),n.classList.remove("bg-white","text-gray-700","border-gray-200","shadow-sm"),H.data.time=n.dataset.timeSlot)}),a.querySelector("#btnSubmitAppointment")?.addEventListener("click",Dn),Gs(),Pn())}async function Dn(t){t.preventDefault();const e=document.getElementById("btnSubmitAppointment");if(!H.data.time||!H.data.selectedServiceIds.length||!H.data.professionalId)return g("Selecione horário, serviço e profissional.","warning");e.disabled=!0,e.innerHTML='<i class="bi bi-hourglass-split pointer-events-none"></i> Processando...';const a=H.data.selectedServiceIds.map(u=>{const c=Na.find(p=>p.id===u);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[s,i]=H.data.time.split(":"),o=new Date(`${H.data.date}T${s}:${i}:00`),r=a.reduce((u,c)=>u+(c.duration+(c.bufferTime||0)),0),n=new Date(o.getTime()+r*6e4),d={establishmentId:H.data.establishmentId||(f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments[0]:f.establishmentId),clientName:H.data.clientName,clientPhone:H.data.clientPhone,services:a,professionalId:H.data.professionalId,professionalName:H.data.professionalName,startTime:o.toISOString(),endTime:n.toISOString(),redeemedReward:H.data.redeemedReward};H.data.id&&(d.id=H.data.id);try{H.data.id?await ur(H.data.id,d):await cr(d),g("Registro salvo!","success");const u=document.getElementById("appointmentModal"),c=u.querySelector("#appointmentModalContent");c&&(c.classList.remove("translate-y-0","md:translate-y-0","md:scale-100"),c.classList.add("translate-y-full","md:translate-y-8","md:scale-95")),u.classList.add("opacity-0"),setTimeout(()=>{u.classList.add("hidden")},300),Ie()}catch(u){g(u.message,"error"),e.disabled=!1,e.innerHTML=`<i class="bi bi-check-circle-fill pointer-events-none"></i> ${H.data.id?"Salvar Edição":"Confirmar"}`}}async function Gs(){const t=document.getElementById("availableTimesContainer"),e=document.getElementById("apptTotalDuration");if(!t)return;const a=document.getElementById("apptDate");a&&a.value&&(H.data.date=a.value);const s=H.data.selectedServiceIds.reduce((u,c)=>{const p=Na.find(b=>b.id===c);return u+(p?p.duration+(p.bufferTime||0):0)},0);e&&(e.innerHTML=`<strong>${s}</strong> min`);const{professionalId:i,selectedServiceIds:o,date:r,originalDate:n,originalTime:l,id:d}=H.data;if(!i||!o.length||!r){t.innerHTML='<p class="col-span-full text-center text-xs text-gray-500 font-bold py-4 bg-white rounded-xl shadow-sm border border-gray-100">Preencha os passos anteriores.</p>';return}t.innerHTML='<div class="col-span-full flex justify-center py-4"><div class="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>';try{const u=H.data.establishmentId||(f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments[0]:f.establishmentId);let c=await dr({establishmentId:u,professionalId:i,serviceIds:o,date:r});const p=new Date;if(new Date(r+"T00:00:00").toDateString()===p.toDateString()){const b=p.getHours()*60+p.getMinutes();c=c.filter(m=>{const[x,y]=m.split(":").map(Number);return x*60+y>=b})}d&&r===n&&l&&(c.includes(l)||(c.push(l),c.sort())),t.innerHTML=c.length>0?c.map(b=>{const m=H.data.time===b;return`<button type="button" data-time-slot="${b}" class="py-3 text-sm font-bold rounded-xl border-2 transition-transform active:scale-95 ${m?"bg-indigo-600 text-white border-indigo-600 shadow-md":"bg-white text-gray-700 border-gray-200 hover:border-indigo-300 shadow-sm"}">${b}</button>`}).join(""):'<p class="col-span-full text-center text-sm font-bold text-red-500 bg-white py-4 rounded-xl border border-red-100 shadow-sm">Nenhum horário livre.</p>'}catch{t.innerHTML='<p class="col-span-full text-center text-sm font-bold text-red-500 bg-white py-4 rounded-xl">Erro ao pesquisar.</p>'}}function Pn(){const t=document.getElementById("loyaltyRewardsContainer");if(!t)return;const{clientHasRewards:e,clientLoyaltyPoints:a}=H.data,{enabled:s,rewards:i}=va;if(!s||!e||!i?.length){t.innerHTML="";return}const o=i.filter(r=>a>=r.points);if(!o.length){t.innerHTML='<p class="text-xs font-bold text-gray-400 mt-3 text-center">Nenhuma recompensa atingida ainda.</p>';return}t.innerHTML=`<div class="border border-indigo-100 bg-indigo-50/80 rounded-xl p-3 mt-3 shadow-sm">
        <p class="text-[0.7rem] font-bold text-indigo-800 uppercase tracking-wider mb-2">Recompensas (${a} pts)</p>
        ${o.map(r=>`<label class="flex items-center gap-2 p-2 bg-white border border-indigo-100 rounded-lg mb-1.5 cursor-pointer shadow-sm active:scale-95 transition-transform"><input type="radio" name="loyaltyReward" value="${Y(r.reward)}" data-points="${r.points}" class="w-4 h-4 accent-indigo-600"><span class="text-[0.85rem] font-bold text-gray-800 flex-1">${Y(r.reward)}</span><span class="text-[0.65rem] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">-${r.points} pts</span></label>`).join("")}
    </div>`,t.querySelectorAll('input[name="loyaltyReward"]').forEach(r=>{r.addEventListener("change",n=>{n.target.checked&&(H.data.redeemedReward={reward:n.target.value,points:parseInt(n.target.dataset.points,10)})})})}async function Tn(t){const e=document.getElementById("clientSearchResults");if(!e||t.trim().length<3){e&&(e.innerHTML='<p class="text-sm text-gray-400 font-medium px-2 py-2 text-center">Digite 3 ou mais caracteres...</p>');return}e.innerHTML='<div class="text-center py-4"><div class="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div></div>';try{const s=(f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId]).map(n=>mt(n,t.trim())),i=await Promise.all(s),o=new Map;i.forEach(n=>{n.forEach(l=>{l.phone?o.set(l.phone,l):o.set(l.id||Math.random().toString(),l)})});const r=Array.from(o.values());if(Zo=r,!r.length){e.innerHTML='<p class="text-sm text-gray-500 bg-white border border-gray-200 p-3 rounded-xl text-center font-bold shadow-sm">Nenhum cliente encontrado.</p>';return}e.innerHTML=r.map(n=>`<div class="client-card p-3 bg-white rounded-xl border-2 transition-all active:scale-95 ${H.data.clientName===n.name&&H.data.clientPhone===n.phone?"border-indigo-500 bg-indigo-50 shadow-md":"border-gray-100 hover:border-gray-200 shadow-sm"} cursor-pointer flex items-center gap-3" data-client-name="${Y(n.name)}" data-client-phone="${Y(n.phone)}" data-loyalty-points="${n.loyaltyPoints||0}">
                <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-black text-gray-500 flex-shrink-0">${Y(n.name).charAt(0)}</div>
                <div class="flex-1 min-w-0"><p class="text-sm font-bold text-gray-900 truncate">${Y(n.name)}</p><p class="text-[0.75rem] font-semibold text-gray-500 truncate mt-0.5">${Y(n.phone)}</p></div>
            </div>`).join(""),e.querySelectorAll(".client-card").forEach(n=>{n.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15),H.data.clientName=n.dataset.clientName,H.data.clientPhone=n.dataset.clientPhone,H.data.clientLoyaltyPoints=parseInt(n.dataset.loyaltyPoints||"0",10);const l=Math.min(...(va?.rewards||[]).map(d=>d.points));H.data.clientHasRewards=va.enabled&&l!==1/0&&H.data.clientLoyaltyPoints>=l,document.getElementById("apptClientName").value=n.dataset.clientName,document.getElementById("apptClientPhone").value=n.dataset.clientPhone,e.querySelectorAll(".client-card").forEach(d=>{d.classList.remove("border-indigo-500","bg-indigo-50","shadow-md"),d.classList.add("border-gray-100","shadow-sm")}),n.classList.add("border-indigo-500","bg-indigo-50","shadow-md"),n.classList.remove("border-gray-100","shadow-sm"),setTimeout(()=>ht(2),250)})})}catch{e.innerHTML='<p class="text-[0.75rem] font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 text-center shadow-sm">Erro ao pesquisar.</p>'}}const Mn=(t,e=null,a=1,s=12)=>{let i=`/api/comandas/${t}?page=${a}&limit=${s}`;return e&&(typeof e=="object"?(e.startDate&&(i+=`&startDate=${e.startDate}`),e.endDate&&(i+=`&endDate=${e.endDate}`)):typeof e=="string"&&(i+=`&date=${e}`)),C(i)},Bn=(t,e)=>C(`/api/appointments/${t}/comanda`,{method:"POST",body:JSON.stringify({items:e})}),ai=t=>C("/api/sales",{method:"POST",body:JSON.stringify(t)}),ts=(t,e)=>C(`/api/sales/${t}?date=${e}`),An=(t,e,a)=>{const s=`/api/sales/${t}?startDate=${e}&endDate=${a}`;return C(s)},jn=t=>C(`/api/sales/${t}/reopen`,{method:"POST"}),si=t=>C(`/api/sales/${t}`,{method:"DELETE"}),Qs=Object.freeze(Object.defineProperty({__proto__:null,createSale:ai,deleteSale:si,getSales:ts,getSalesByDateRange:An,reopenSale:jn},Symbol.toStringTag,{value:"Module"})),gt=t=>C(`/api/products/${t}`),oi=t=>C("/api/products",{method:"POST",body:JSON.stringify(t)}),ii=(t,e)=>C(`/api/products/${t}`,{method:"PUT",body:JSON.stringify(e)}),Cs=t=>C(`/api/products/${t}`,{method:"DELETE"}),Fa=(t,e)=>C(`/api/products/${t}/stock`,{method:"PATCH",body:JSON.stringify(e)}),qn=t=>C(`/api/products/${t}/stock-history`),ri=({startDate:t,endDate:e,productId:a,categoryId:s,establishmentId:i})=>{const o=new URLSearchParams({startDate:t,endDate:e});return a&&a!=="all"&&o.append("productId",a),s&&s!=="all"&&o.append("categoryId",s),i&&o.append("establishmentId",i),C(`/api/products/stock-history/report?${o.toString()}`)},Nn=Object.freeze(Object.defineProperty({__proto__:null,adjustStock:Fa,createProduct:oi,deleteProduct:Cs,getProducts:gt,getStockHistory:qn,getStockReport:ri,updateProduct:ii},Symbol.toStringTag,{value:"Module"})),Fn=()=>C("/api/cashier/status").catch(t=>{if(t.message.includes("404")||t.message.includes("não encontrada"))return null;throw t}),Rn=t=>{const e={establishmentId:t.establishmentId,initialAmount:Number(t.initialAmount),notes:t.notes||""};return console.log("Payload enviado para abrir caixa:",e),C("/api/cashier/open",{method:"POST",body:JSON.stringify(e)})},Hn=(t,e)=>{const a={finalAmount:Number(e)};return console.log("Payload enviado para fechar caixa:",a),C(`/api/cashier/close/${t}`,{method:"PUT",body:JSON.stringify(a)})},On=()=>C("/api/cashier/history").then(t=>t||[]).catch(t=>(console.error("Erro ao buscar histórico:",t),[])),zn=t=>C(`/api/cashier/report/${t}`),Ds=t=>C(`/api/packages/${t}`),_n=t=>C("/api/packages",{method:"POST",body:JSON.stringify(t)}),Vn=(t,e)=>C(`/api/packages/${t}`,{method:"PUT",body:JSON.stringify(e)}),Ys=t=>C(`/api/packages/${t}`,{method:"DELETE"});let h={allComandas:[],catalog:{services:[],products:[],packages:[]},activeFilter:"abertas",selectedComandaId:null,viewMode:"items",selectedCatalogItem:null,isCashierOpen:!1,activeCashierSessionId:null,isCashierFromPreviousDay:!1,loyaltySettings:null,establishmentConfig:null,pendingRedemption:null,paging:{page:1,limit:15,total:0},checkoutState:{payments:[],selectedMethod:"dinheiro",installments:1,amountReceived:"",discount:{type:"real",value:0},discountReason:""},isProcessing:!1,showHistoryPanel:!1,filterStartDate:"",filterEndDate:"",filterPreset:"hoje"},Ge=null,Ke=null,Xs=null;function ni(t,e){return function(...a){clearTimeout(Xs),Xs=setTimeout(()=>t.apply(this,a),e)}}const fe=t=>{if(!t)return new Date().toISOString().split("T")[0];const e=new Date(t),a=e.getTimezoneOffset()*6e4;return new Date(e-a).toISOString().split("T")[0]};function Ua(t){const e=new Date;let a,s;return t==="hoje"?(a=new Date,s=new Date):t==="este_mes"?(a=new Date(e.getFullYear(),e.getMonth(),1),s=new Date(e.getFullYear(),e.getMonth()+1,0)):t==="mes_passado"?(a=new Date(e.getFullYear(),e.getMonth()-1,1),s=new Date(e.getFullYear(),e.getMonth(),0)):(a=new Date,s=new Date),{start:fe(a),end:fe(s)}}async function Zs(t,e="stay"){if(!t||!t.id)return;t._localUpdatedAt=Date.now(),t._cachedItems=null,t._hasUnsavedChanges=!1,Ft(),e==="checkout"&&(h.viewMode="checkout",h.checkoutState.payments||(h.checkoutState.payments=[]),h.checkoutState.selectedMethod="dinheiro",h.checkoutState.amountReceived="",h.checkoutState.discount.value||(h.checkoutState.discount={type:"real",value:0},h.checkoutState.discountReason=""),ae());const a=document.createElement("div");a.id="saving-overlay",a.className="fixed inset-0 bg-gray-900/60 z-[999999] flex items-center justify-center backdrop-blur-sm",a.innerHTML=`
        <div class="bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center animate-fade-in border border-gray-100">
            <div class="loader mb-4"></div>
            <p class="text-gray-800 font-black text-sm uppercase tracking-widest">Sincronizando...</p>
        </div>
    `,document.body.appendChild(a);try{const s=(t.comandaItems||[]).filter(i=>i&&i.id&&String(i.id)!=="undefined"&&String(i.id)!=="null").map(i=>{const o={...i};if(o.id=String(i.id),o.type==="product"){const r=o.id;o.productId||(o.productId=r),o.product_id||(o.product_id=r)}if(o.type==="service"){const r=o.id;o.serviceId||(o.serviceId=r),o.service_id||(o.service_id=r)}return o});t.type==="walk-in"&&String(t.id).startsWith("temp-")||await Bn(t.id,s),document.body.contains(a)&&document.body.removeChild(a),e!=="checkout"&&(g("Sucesso","Comanda atualizada e salva!","success"),ae())}catch(s){document.body.contains(a)&&document.body.removeChild(a),t._hasUnsavedChanges=!0,ae(),g("Erro","Falha ao salvar no servidor: "+s.message,"warning")}}function Ne(t){if(!t._cachedItems){let e=[];if(t.status==="completed"){const a=t.comandaItems||t.items||[];e=a.length>0?a:t.services||[]}else{const a=(t.services||[]).map(r=>({...r,_source:"original_service",type:"service"})),s=a.reduce((r,n)=>{const l=String(n.id);return r[l]=(r[l]||0)+1,r},{}),i=[...t.comandaItems||[],...t.items||[]],o=[];i.forEach(r=>{const n=String(r.id);(r.type==="service"||!r.type)&&s[n]>0?s[n]--:o.push({...r,_source:"extra"})}),e=[...a,...o]}return t._cachedItems=e,t._cachedTimestamp=Date.now(),e}return t._cachedItems}function Un(){const t=document.getElementById("comandas-layout");t&&t.classList.add("mobile-detail-open");const e=document.getElementById("mobile-bottom-nav");e&&(e.style.display="none")}function tt(){const t=document.getElementById("comandas-layout");t&&t.classList.remove("mobile-detail-open");const e=document.getElementById("mobile-bottom-nav");e&&(e.style.display="")}function Wn(){const t=fe(new Date);let e=h.allComandas||[];h.filterPreset==="hoje"?e=e.filter(u=>{const c=fe(u.startTime||u.date||u.createdAt);return u.status!=="completed"&&c<=t||u.status==="completed"&&c===t}):h.filterPreset!=="custom"&&(e=e.filter(u=>fe(u.startTime||u.date||u.createdAt)<=t));const a=e.filter(u=>u.status!=="completed").length,s=e.filter(u=>u.status==="completed"),i=s.reduce((u,c)=>{let p=0;if(c.totalAmount!==void 0&&c.totalAmount!==null)p=Number(c.totalAmount);else{let b=Ne(c).reduce((m,x)=>m+Number(x.price||0),0);p=Math.max(0,b-Number(c.planDiscount||0))}return u+p},0),o=s.length>0?i/s.length:0,r=document.getElementById("kpi-abertas"),n=document.getElementById("kpi-pagas"),l=document.getElementById("kpi-vendas"),d=document.getElementById("kpi-ticket");r&&(r.textContent=a),n&&(n.textContent=s.length),l&&(l.textContent=`R$ ${i.toFixed(2).replace(".",",")}`),d&&(d.textContent=`R$ ${o.toFixed(2).replace(".",",")}`)}function Ot(){Ke.innerHTML=`
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

            <div id="history-panel" class="${h.showHistoryPanel?"block":"hidden"} bg-white p-3 rounded-xl border border-gray-200 shadow-sm mb-2 animate-fade-in">
                <h4 class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Período de Busca</h4>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                    <button data-action="set-period" data-period="hoje" class="period-btn py-2 text-[10px] font-bold rounded-lg border transition-colors ${h.filterPreset==="hoje"?"bg-indigo-600 text-white border-indigo-600 shadow-sm":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-white"}">Hoje</button>
                    <button data-action="set-period" data-period="este_mes" class="period-btn py-2 text-[10px] font-bold rounded-lg border transition-colors ${h.filterPreset==="este_mes"?"bg-indigo-600 text-white border-indigo-600 shadow-sm":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-white"}">Este Mês</button>
                    <button data-action="set-period" data-period="mes_passado" class="period-btn py-2 text-[10px] font-bold rounded-lg border transition-colors ${h.filterPreset==="mes_passado"?"bg-indigo-600 text-white border-indigo-600 shadow-sm":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-white"}">Mês Passado</button>
                    <button data-action="set-period" data-period="custom" class="period-btn py-2 text-[10px] font-bold rounded-lg border transition-colors ${h.filterPreset==="custom"?"bg-indigo-600 text-white border-indigo-600 shadow-sm":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-white"}">Personalizado</button>
                </div>
                
                <div id="custom-date-fields" class="${h.filterPreset==="custom"?"flex":"hidden"} gap-2 items-end p-2 bg-gray-50 rounded-lg border border-gray-100 flex-wrap sm:flex-nowrap">
                    <div class="flex-1 min-w-[100px]">
                        <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 ml-1">Início</label>
                        <input type="date" id="filter-start-date" value="${h.filterStartDate}" class="w-full p-2 border border-gray-300 rounded-lg bg-white text-xs font-bold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm">
                    </div>
                    <div class="flex-1 min-w-[100px]">
                        <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 ml-1">Fim</label>
                        <input type="date" id="filter-end-date" value="${h.filterEndDate}" class="w-full p-2 border border-gray-300 rounded-lg bg-white text-xs font-bold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm">
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
    `,Ra(),Ps()}function Ps(){document.querySelectorAll(".filter-btn").forEach(e=>{e.classList.remove("bg-indigo-600","text-white","border-indigo-600"),e.classList.add("bg-white","text-gray-600","border-gray-200")});const t=document.querySelector(`[data-filter="${h.activeFilter}"]`);t&&(t.classList.remove("bg-white","text-gray-600","border-gray-200"),t.classList.add("bg-indigo-600","text-white","border-indigo-600"))}function Ra(){const t=document.getElementById("cashier-alert-box"),e=document.getElementById("btn-new-sale");h.isCashierFromPreviousDay?(t&&(t.innerHTML=`
            <div class="bg-red-50 border-l-4 border-red-500 p-3 mb-3 rounded-r-xl animate-fade-in mx-1 shadow-sm">
                <div class="flex items-center">
                    <i class="bi bi-exclamation-octagon text-red-600 mr-3 text-xl"></i>
                    <p class="text-xs md:text-sm text-red-800 leading-tight">
                        <strong>Caixa de Ontem Aberto!</strong> Você esqueceu de fechar o caixa do turno anterior. Encerre-o agora para normalizar o sistema e registrar novas vendas.
                    </p>
                </div>
            </div>
         `),e&&(e.classList.add("opacity-50","cursor-not-allowed"),e.disabled=!0)):h.isCashierOpen?(t&&(t.innerHTML=""),e&&(e.classList.remove("opacity-50","cursor-not-allowed"),e.disabled=!1)):(t&&(t.innerHTML=`
            <div class="bg-amber-50 border-l-4 border-amber-400 p-3 mb-3 rounded-r-xl animate-fade-in mx-1 shadow-sm">
                <div class="flex items-center">
                    <i class="bi bi-exclamation-triangle text-amber-500 mr-3 text-lg"></i>
                    <p class="text-xs md:text-sm text-amber-800 leading-tight">
                        <strong>Caixa Fechado!</strong> Abra o caixa para operações financeiras.
                    </p>
                </div>
            </div>
        `),e&&(e.classList.add("opacity-50","cursor-not-allowed"),e.disabled=!0)),Jn()}function Jn(){const t=document.getElementById("cashier-controls");t&&(h.isCashierFromPreviousDay?t.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-red-700 bg-red-100 py-1.5 px-3 rounded-xl border border-red-200 uppercase tracking-widest shadow-sm"><i class="bi bi-exclamation-octagon"></i> Bloqueado</span>
            <button data-action="close-cashier" class="py-1.5 px-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 text-[10px] transition shadow-sm uppercase tracking-wider animate-pulse">Fechar Caixa Antigo</button>
        `:h.isCashierOpen?t.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-emerald-700 bg-emerald-100 py-1.5 px-3 rounded-xl border border-emerald-200 uppercase tracking-widest shadow-sm"><i class="bi bi-unlock-fill"></i> Caixa Aberto</span>
            <button data-action="close-cashier" class="py-1.5 px-4 bg-red-50 text-red-700 border border-red-200 font-bold rounded-xl hover:bg-red-100 text-[10px] transition shadow-sm uppercase tracking-wider">Fechar Caixa</button>
        `:t.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-red-700 bg-red-100 py-1.5 px-3 rounded-xl border border-red-200 uppercase tracking-widest shadow-sm"><i class="bi bi-lock-fill"></i> Caixa Fechado</span>
            <button data-action="open-cashier" class="py-1.5 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 text-[10px] shadow-sm transition uppercase tracking-wider">Abrir Caixa</button>
        `)}function Ft(){const t=document.getElementById("comandas-list"),e=document.getElementById("pagination-container");if(!t)return;if((!h.isCashierOpen||h.isCashierFromPreviousDay)&&h.activeFilter==="abertas"){t.innerHTML=`
            <div class="text-center py-12 opacity-60">
                <i class="bi bi-lock text-4xl text-gray-300 mb-3 block"></i>
                <p class="text-sm font-bold text-gray-600 uppercase tracking-widest">Acesso Restrito</p>
                <p class="text-xs text-gray-500 mt-2">Regularize o caixa para ver as vendas pendentes</p>
            </div>
        `,e&&(e.innerHTML="");return}const a=fe(new Date);let s=h.allComandas||[];if(h.filterPreset==="hoje"?s=s.filter(o=>{const r=fe(o.startTime||o.date||o.createdAt);return h.activeFilter==="abertas"?o.status!=="completed"&&r<=a:h.activeFilter==="pagas"?o.status==="completed"&&r===a:o.status!=="completed"&&r<=a||o.status==="completed"&&r===a}):h.filterPreset!=="custom"?s=s.filter(o=>{const r=fe(o.startTime||o.date||o.createdAt);return h.activeFilter==="abertas"?o.status!=="completed"&&r<=a:h.activeFilter==="pagas"?o.status==="completed"&&r<=a:r<=a}):h.activeFilter==="abertas"?s=s.filter(o=>o.status!=="completed"):h.activeFilter==="pagas"&&(s=s.filter(o=>o.status==="completed")),Wn(),s.length===0){t.innerHTML='<p class="text-center text-gray-400 py-12 text-sm font-medium border border-dashed border-gray-200 rounded-2xl mx-2">Nenhuma comanda encontrada.</p>',Ks(e);return}const i=document.createDocumentFragment();s.forEach(o=>{const r=Ne(o);let n=0;if(o.status==="completed"&&o.totalAmount!==void 0&&o.totalAmount!==null)n=Number(o.totalAmount);else{const M=r.reduce((V,P)=>V+Number(P.price||0),0);n=Math.max(0,M-Number(o.planDiscount||0))}const d=o.loyaltyRedemption||o.discount&&o.discount.reason&&String(o.discount.reason).toLowerCase().includes("fidelidade")?'<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-5 h-5 ml-1.5 text-xs shadow-sm border border-yellow-200" title="Prémio Resgatado">🎁</span>':"",c=o.coveredByPlan?'<span class="inline-flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-md px-2 py-0.5 text-[9px] font-black border border-indigo-200 uppercase tracking-wider shadow-sm ml-1.5" title="Clube VIP"><i class="bi bi-gem mr-1"></i> VIP</span>':"",p=String(o.id)===String(h.selectedComandaId),b=new Date(o.startTime||o.date||o.createdAt),m=b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),x=b.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),y=o.type==="walk-in"||typeof o.id=="string"&&o.id.startsWith("temp-"),S=o.status==="completed",L=v(o.clientName||"Cliente sem nome"),D=v(o.professionalName||"Sem profissional");let k="";S?k='<span class="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">Paga</span>':y?k='<span class="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">Avulsa</span>':k='<span class="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">Agenda</span>';const I=document.createElement("div");I.className=`comanda-card cursor-pointer border rounded-2xl p-3.5 hover:bg-gray-50 transition-all shadow-sm mb-2 ${p?"ring-2 ring-indigo-500 bg-indigo-50/50 border-transparent":"bg-white border-gray-200"}`,I.dataset.action="select-comanda",I.dataset.comandaId=o.id,I.innerHTML=`
            <div class="flex justify-between items-start mb-2.5 pointer-events-none">
                <p class="font-bold text-gray-900 truncate flex-1 min-w-0 pr-2 text-base">${L} ${c}</p>
                <div class="flex items-center flex-shrink-0">
                    <p class="font-black ${S?"text-emerald-600":"text-gray-900"} text-base">R$ ${n.toFixed(2)}</p>
                    ${d}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none gap-2">
                <div class="flex items-center gap-2 min-w-0 flex-1">
                    ${k}
                    <p class="text-xs text-gray-500 truncate font-medium"><i class="bi bi-person mr-1 opacity-50"></i>${D}</p>
                </div>
                <p class="text-xs text-gray-500 font-bold flex-shrink-0"><i class="bi bi-calendar-event mr-1 opacity-50"></i>${x} <span class="text-gray-300 mx-1">|</span> ${m}</p> 
            </div>
        `,i.appendChild(I)}),t.innerHTML="",t.appendChild(i),Ks(e)}function Ks(t){if(!t)return;t.innerHTML="";const{page:e,total:a,limit:s}=h.paging,i=Math.ceil((a||0)/s);if(i===0)return;const o=document.createElement("div");o.className="flex gap-2 justify-center items-center w-full py-1",o.innerHTML=`
        <button data-page="${e-1}" class="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-sm font-black text-gray-600 shadow-sm flex items-center justify-center ${e<=1?"opacity-50 cursor-not-allowed":""}" ${e<=1?"disabled":""}>&laquo;</button>
        <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mx-2">Pág ${e} de ${i||1}</span>
        <button data-page="${e+1}" class="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-sm font-black text-gray-600 shadow-sm flex items-center justify-center ${e>=i?"opacity-50 cursor-not-allowed":""}" ${e>=i?"disabled":""}>&raquo;</button>
    `,t.appendChild(o),o.querySelectorAll("button[data-page]").forEach(r=>{r.onclick=n=>{n.stopPropagation();const l=parseInt(r.dataset.page,10);l>0&&l<=i&&(h.paging.page=l,Ee())}})}function Gn(t,e){const a=`
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
    `;const s=(o="")=>{const r=o.toLowerCase(),n={service:'<i class="bi bi-scissors text-indigo-600"></i>',product:'<i class="bi bi-box-seam text-emerald-600"></i>',package:'<i class="bi bi-boxes text-purple-600"></i>'},l={"catalog-service-list":{items:h.catalog.services,type:"service"},"catalog-product-list":{items:h.catalog.products,type:"product"},"catalog-package-list":{items:h.catalog.packages,type:"package"}};Object.entries(l).forEach(([d,{items:u,type:c}])=>{const p=e.querySelector("#"+d);if(!p)return;const b=u.filter(m=>m.name.toLowerCase().includes(r)).slice(0,50);p.innerHTML=b.map(m=>m.id?`
                <button data-action="select-catalog-item" data-item-type="${c}" data-item-id="${m.id}" class="flex items-center gap-3 w-full p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 shadow-sm transition-all text-left group active:scale-95">
                    <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg border border-gray-100 group-hover:bg-white">${n[c]}</div>
                    <span class="flex-grow text-sm font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-indigo-700">${v(m.name)}</span>
                    <span class="font-black text-sm text-gray-900 bg-gray-100 px-2.5 py-1.5 rounded-lg border border-gray-200 whitespace-nowrap group-hover:bg-white group-hover:text-indigo-700">R$ ${m.price.toFixed(2)}</span>
                </button>
            `:"").join("")||'<p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center py-6 border border-dashed border-gray-300 rounded-xl">Vazio</p>'})};s();const i=e.querySelector("#item-search-input");i&&i.addEventListener("input",ni(o=>{s(o.target.value)},300))}function Qn(t,e){const a=h.selectedCatalogItem;if(!a){h.viewMode="add-item",ae();return}let s=1;const i=`
        <div class="p-3 md:p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50 rounded-t-2xl">
            <button data-action="back-to-add-item" class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner active:scale-90 transition-transform">
                <i class="bi bi-arrow-left text-lg md:text-xl"></i>
            </button>
            <h3 class="font-black text-sm md:text-base text-gray-800 ml-3 uppercase tracking-wider">Quantidade</h3>
        </div>
    `;e.innerHTML=`
        ${i}
        <div class="flex-grow overflow-y-auto flex flex-col items-center justify-center p-4 bg-slate-50 relative custom-scrollbar">
            <div class="text-center bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-gray-200 w-full max-w-sm">
                <div class="w-14 h-14 md:w-16 md:h-16 bg-indigo-50 text-indigo-500 rounded-full mx-auto flex items-center justify-center text-2xl md:text-3xl mb-4 border border-indigo-100 shadow-inner">
                    ${a.type==="service"?'<i class="bi bi-scissors"></i>':a.type==="product"?'<i class="bi bi-box-seam"></i>':'<i class="bi bi-boxes"></i>'}
                </div>
                <h3 class="font-black text-lg md:text-xl text-gray-900 leading-tight mb-2 line-clamp-2">${v(a.name)}</h3>
                <p class="text-xs md:text-sm text-gray-600 font-bold bg-gray-100 inline-block px-3 py-1 rounded-full border border-gray-200 shadow-sm">R$ ${a.price.toFixed(2)} / un</p>
                
                <div class="my-6 md:my-8 flex items-center justify-center gap-4 md:gap-6">
                    <button id="quantity-minus-btn" class="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-gray-300 text-2xl font-black text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 shadow-md transition-all active:scale-90 disabled:opacity-30 disabled:hover:bg-white"><i class="bi bi-dash"></i></button>
                    <span id="quantity-display" class="text-4xl md:text-5xl font-black w-20 md:w-24 text-center text-indigo-600 bg-indigo-50 rounded-2xl py-1.5 border border-indigo-100 shadow-inner">${s}</span>
                    <button id="quantity-plus-btn" class="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-gray-300 text-2xl font-black text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200 shadow-md transition-all active:scale-90"><i class="bi bi-plus"></i></button>
                </div>
            </div>
        </div>
        <footer class="p-3 md:p-4 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)] w-full flex-shrink-0 z-50 pb-safe relative">
            <button id="confirm-add-qty-btn" class="w-full py-3 md:py-3.5 bg-indigo-600 text-white font-black text-sm md:text-base rounded-xl hover:bg-indigo-700 transition-all shadow-md uppercase tracking-widest active:scale-95 flex justify-center items-center gap-2">
                <i class="bi bi-cart-plus text-lg"></i> Confirmar Adição
            </button>
        </footer>
    `;const o=()=>{e.querySelector("#quantity-display").textContent=s,e.querySelector("#quantity-minus-btn").disabled=s<=1};e.querySelector("#quantity-minus-btn").onclick=()=>{s>1&&(s--,o())},e.querySelector("#quantity-plus-btn").onclick=()=>{s++,o()},e.querySelector("#confirm-add-qty-btn").onclick=async()=>{await di(a,s),h.viewMode="items",h.selectedCatalogItem=null,ae()},o()}function ae(){const t=document.getElementById("comanda-detail-container");if(!t)return;const e=h.allComandas.find(L=>String(L.id)===String(h.selectedComandaId));if(h.viewMode==="checkout"&&e){Yn(e,t);return}if(h.viewMode==="add-item"&&e){Gn(e,t);return}if(h.viewMode==="add-item-qty"&&e){Qn(e,t);return}const a=`
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
    `;if(h.isCashierFromPreviousDay){t.innerHTML=`
            ${a}
            <div class="flex flex-col items-center justify-center h-full text-center text-red-500 p-6">
                <div class="bg-red-50 p-6 rounded-full mb-4 border border-red-100 shadow-inner">
                    <i class="bi bi-exclamation-octagon text-5xl text-red-400"></i>
                </div>
                <p class="font-black text-lg text-red-700 uppercase tracking-widest">Caixa de Ontem Pendente</p>
                <p class="text-sm text-red-500 mt-2 max-w-xs">Feche o caixa do turno anterior para liberar o sistema e pagar esta comanda.</p>
                <button data-action="close-cashier" class="py-3 px-8 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition shadow-md mt-6 text-sm uppercase tracking-wider animate-pulse">Fechar Caixa Antigo Agora</button>
            </div>
        `;return}else if(!h.isCashierOpen){t.innerHTML=`
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
        `;return}const s=Ne(e),i=e.status==="completed",o=e.type==="walk-in"||typeof e.id=="string"&&e.id.startsWith("temp-"),r=s.reduce((L,D)=>{const k=D._source==="original_service",I=D.id||D.name,M=k?`original-${I}`:`${D.type}-${I}`;return L[M]||(L[M]={...D,quantity:0,sources:[]}),L[M].quantity+=1,D._source&&L[M].sources.push(D._source),L},{}),n=Number(e.planDiscount||0),l=Object.values(r).reduce((L,D)=>L+Number(D.price||0)*D.quantity,0),d=Math.max(0,l-n),u=v(e.clientName||"Cliente sem nome"),c=v(e.professionalName||"Profissional não atribuído"),p=e._hasUnsavedChanges,m=e.coveredByPlan?'<span class="mt-2 inline-block px-2 py-1 text-[10px] font-black uppercase tracking-widest text-indigo-700 bg-indigo-100 border border-indigo-200 rounded-md shadow-sm"><i class="bi bi-gem"></i> Clube VIP Aplicado</span>':"",x=i?"":`
        <button data-action="add-item" class="md:hidden fixed bottom-[120px] right-4 w-14 h-14 bg-indigo-600 text-white font-black rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-[60]">
            <i class="bi bi-plus-lg text-2xl"></i>
        </button>
    `,y=`
        <footer class="hidden md:block mt-auto p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] w-full flex-shrink-0 z-20 rounded-b-2xl">
            <div class="flex justify-between items-end mb-4">
                <span class="text-xs text-gray-500 font-bold uppercase tracking-widest">Total a Pagar</span>
                <span class="text-4xl font-black text-gray-900 leading-none">R$ ${d.toFixed(2)}</span>
            </div>
            ${i?`
                <div class="bg-emerald-50 text-emerald-700 text-center py-3.5 rounded-xl font-black border border-emerald-200 flex items-center justify-center gap-2 text-sm shadow-sm">
                    <i class="bi bi-check-circle-fill text-xl"></i> Comanda Paga
                </div>
            `:`
                <div class="grid grid-cols-3 gap-3">
                    <button data-action="add-item" class="col-span-1 py-3 bg-indigo-50 text-indigo-700 font-black rounded-xl hover:bg-indigo-100 transition border border-indigo-200 text-xs shadow-sm uppercase tracking-wider flex justify-center items-center gap-2">
                        <i class="bi bi-plus-lg text-lg"></i> Incluir Item
                    </button>
                    <button data-action="save-comanda" class="col-span-1 py-3 font-black rounded-xl transition text-xs shadow-sm uppercase tracking-wider flex justify-center items-center gap-2 ${p?"bg-amber-500 text-white hover:bg-amber-600 animate-pulse border-transparent":"bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}">
                        <i class="bi bi-save2 text-lg"></i> ${p?"Salvar Alterações":"Salvar"}
                    </button>
                    <button data-action="go-to-checkout" class="col-span-1 py-3 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition shadow-md text-xs uppercase tracking-wider flex justify-center items-center gap-2">
                        <i class="bi bi-credit-card text-lg"></i> Finalizar Pagamento
                    </button>
                </div>
            `}
        </footer>
    `,S=`
        <footer class="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-15px_30px_-5px_rgba(0,0,0,0.1)] z-50 pb-safe">
            <div class="flex justify-between items-end mb-3 px-1">
                <div class="flex flex-col">
                    <span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total da Comanda</span>
                    <span class="text-3xl font-black text-gray-900 leading-none">R$ ${d.toFixed(2)}</span>
                </div>
                ${p?`
                    <button data-action="save-comanda" class="py-2 px-5 font-black rounded-xl text-xs shadow-md uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-transform bg-amber-500 text-white animate-pulse">
                        <i class="bi bi-save2 text-base"></i> Salvar
                    </button>
                `:""}
            </div>
            ${i?`
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
                    <h3 class="text-lg font-black text-gray-900 truncate max-w-[220px] md:max-w-xs leading-tight">${u}</h3>
                    <p class="text-sm text-gray-500 flex items-center gap-1.5 mt-1 font-semibold">
                        <i class="bi bi-person text-indigo-400"></i> ${c}
                    </p>
                    ${m}
                    ${o?'<span class="mt-3 inline-block px-2 py-1 text-[10px] font-black bg-blue-100 text-blue-700 rounded-md uppercase tracking-widest border border-blue-200">Venda Avulsa</span>':`<button data-action="go-to-appointment" data-id="${e.id}" data-date="${e.startTime}" class="text-indigo-600 text-xs font-black uppercase tracking-widest hover:text-indigo-800 flex items-center gap-1 mt-3 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 transition-colors w-max shadow-sm">
                             <i class="bi bi-calendar-check"></i> Ver Agenda
                         </button>`}
                </div>
                <div class="flex flex-col gap-2">
                    ${i?`<button data-action="reopen-appointment" data-id="${e.id}" class="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-xl hover:bg-yellow-100 flex items-center justify-center border border-yellow-200 shadow-sm transition-colors" title="Reabrir Comanda"><i class="bi bi-arrow-counterclockwise text-lg"></i></button>`:""}
                    ${o&&!i?`<button data-action="delete-walk-in" data-id="${e.id}" class="w-10 h-10 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 flex items-center justify-center border border-red-200 shadow-sm transition-colors" title="Excluir Venda"><i class="bi bi-trash3 text-lg"></i></button>`:""}
                </div>
            </div>

            <div id="loyalty-container" class="mb-5"></div>

            <div class="space-y-3">
                <h4 class="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 pl-1">Itens Adicionados</h4>
                ${Object.values(r).map(L=>{const D=L.sources&&L.sources.includes("original_service"),k=h.pendingRedemption&&String(h.pendingRedemption.appliedToItemId)===String(L.id),I=L.isReward||k;return`
                    <div class="flex flex-col bg-white p-4 rounded-2xl border border-gray-200 shadow-sm ${I?"border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200":""}">
                        <div class="flex justify-between items-start w-full">
                            <div class="min-w-0 flex-1 pr-3">
                                <p class="text-base font-bold text-gray-900 line-clamp-2 leading-tight">
                                    ${I?"🎁 ":""}
                                    ${v(L.name)}
                                </p>
                                <div class="flex items-center mt-2 gap-2">
                                    ${D?'<span class="text-[9px] font-black uppercase tracking-widest text-indigo-700 bg-indigo-100 px-2 py-1 rounded-md border border-indigo-200">Fixo Agenda</span>':""}
                                    <p class="text-xs text-gray-500 font-bold">${I?'<span class="text-yellow-700 font-black bg-yellow-100 px-2 py-1 rounded-md border border-yellow-200">Resgate</span>':`R$ ${(L.price||0).toFixed(2)} un.`}</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-end gap-3">
                                <span class="font-black text-xl text-gray-900 whitespace-nowrap leading-none">R$ ${(L.price*L.quantity).toFixed(2)}</span>
                                
                                ${i?`<span class="flex items-center justify-center px-4 py-2 bg-gray-100 border border-gray-200 text-gray-700 font-black text-xs uppercase tracking-widest rounded-xl">${L.quantity} Itens</span>`:`
                                    <div class="flex items-center bg-gray-50 rounded-xl border border-gray-200 shadow-inner h-10">
                                        ${D?`<span class="text-[11px] font-black text-gray-500 px-4 uppercase tracking-widest">Qtd: ${L.quantity}</span>`:`<button data-action="decrease-qty" data-item-id="${L.id}" data-item-type="${L.type}" class="w-10 h-full flex items-center justify-center rounded-l-xl bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 border-r border-gray-200 active:scale-95"><i class="bi bi-dash text-xl"></i></button>
                                             <span class="text-sm font-black text-gray-900 w-12 text-center">${L.quantity}</span>
                                             <button data-action="increase-qty" data-item-id="${L.id}" data-item-type="${L.type}" class="w-10 h-full flex items-center justify-center rounded-r-xl bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border-l border-gray-200 active:scale-95"><i class="bi bi-plus text-xl"></i></button>`}
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>
                `}).join("")}
                ${Object.keys(r).length===0?'<div class="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 bg-white rounded-2xl text-sm font-medium">Nenhum item lançado</div>':""}
            </div>
        </div>

        ${x}
        ${y}
        ${S}
    `,!i&&(e.clientId||e.clientName)&&Xn(e,t.querySelector("#loyalty-container"))}function Yn(t,e){const a=Number(t.planDiscount||0),i=Ne(t).reduce((m,x)=>m+Number(x.price||0)*(x.quantity||1),0),o=h.checkoutState,r=o.discount||{type:"real",value:0};let n=0;r.type==="percent"?n=i*r.value/100:n=r.value,n>i&&(n=i);const l=Math.max(0,i-n-a),d=o.payments.reduce((m,x)=>m+x.value,0),u=Math.max(0,l-d);(!o.amountReceived||u>0)&&(o.amountReceived=u.toFixed(2));const c=`
        <div class="md:hidden p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50 rounded-t-2xl">
            <button data-action="back-to-items" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner active:scale-90 transition-transform">
                <i class="bi bi-arrow-left text-xl"></i>
            </button>
            <h3 class="font-black text-lg text-gray-800 ml-4 uppercase tracking-wider">Pagamento</h3>
        </div>
    `,p=`
        <footer class="fixed bottom-0 left-0 right-0 md:relative mt-auto p-4 bg-white border-t border-gray-200 shadow-[0_-15px_30px_-5px_rgba(0,0,0,0.1)] md:shadow-none grid grid-cols-3 gap-3 w-full flex-shrink-0 z-50 pb-safe md:pb-4">
            <button data-action="back-to-items" class="col-span-1 py-4 bg-gray-100 border border-gray-300 text-gray-700 font-black text-sm rounded-xl hover:bg-gray-200 transition shadow-sm uppercase tracking-wider active:scale-95">Voltar</button>
            <button data-action="finalize-checkout" class="col-span-2 py-4 bg-emerald-600 text-white font-black text-sm rounded-xl hover:bg-emerald-700 transition shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider active:scale-95"><i class="bi bi-check2-circle text-xl"></i> Confirmar</button>
        </footer>
    `;e.innerHTML=`
        ${c}
        <div class="flex-grow overflow-y-auto p-4 pb-36 md:pb-6 custom-scrollbar bg-slate-50 relative">
            
            <div class="text-center mb-6 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden">
                <p class="text-[11px] font-black text-gray-400 uppercase tracking-widest relative z-10">Subtotal: <span id="checkout-subtotal-display" class="text-gray-600">R$ ${i.toFixed(2)}</span></p>
                
                <div class="flex flex-col items-center justify-center gap-3 mt-4 mb-3 relative z-10">
                     <div class="flex items-center gap-3">
                         <span class="text-xs font-black text-red-400 uppercase tracking-widest bg-red-50 px-2 py-1 rounded-lg border border-red-100"><i class="bi bi-tag-fill mr-1"></i>Desc</span>
                         <div class="flex border-2 border-gray-300 rounded-xl bg-white overflow-hidden shadow-inner h-12 focus-within:border-indigo-400 transition-colors">
                             <input type="number" id="discount-value" value="${r.value}" class="w-24 p-2 text-center text-lg font-black text-red-500 outline-none bg-transparent" placeholder="0">
                             <select id="discount-type" class="bg-gray-50 text-sm font-black text-gray-600 border-l border-gray-200 px-3 outline-none cursor-pointer hover:bg-gray-100">
                                 <option value="real" ${r.type==="real"?"selected":""}>R$</option>
                                 <option value="percent" ${r.type==="percent"?"selected":""}>%</option>
                             </select>
                         </div>
                     </div>
                     <input type="text" id="discount-reason" class="w-full max-w-[280px] p-3 text-sm border-2 border-gray-200 rounded-xl text-center focus:border-indigo-400 outline-none text-gray-700 bg-gray-50 font-medium transition-colors" placeholder="Motivo do desconto (opcional)" value="${o.discountReason||""}">
                </div>

                ${a>0?`
                    <div class="flex justify-between items-center mt-3 relative z-10 text-indigo-600 font-bold text-sm bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100">
                        <span><i class="bi bi-gem"></i> Coberto pelo Plano VIP</span>
                        <span>- R$ ${a.toFixed(2)}</span>
                    </div>
                `:""}

                <p class="text-5xl font-black text-gray-900 mt-4 mb-2 relative z-10 tracking-tight" id="checkout-total-display">R$ ${l.toFixed(2)}</p>
                
                <div id="checkout-status-msg" class="mt-4 bg-gray-50 py-3 rounded-xl border border-gray-100 relative z-10 shadow-inner">
                    ${u<=.01?'<p class="text-emerald-500 font-black text-base uppercase tracking-widest"><i class="bi bi-check2-circle text-2xl mr-2 align-middle"></i> Totalmente Pago</p>':`<p class="text-red-500 font-bold text-sm uppercase tracking-widest">Faltam: <span id="checkout-remaining-display" class="font-black text-xl text-red-600 ml-1">R$ ${u.toFixed(2)}</span></p>`}
                </div>
            </div>

            <div class="space-y-3 mb-6">
                ${o.payments.map((m,x)=>`
                    <div class="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-3">
                             <div class="bg-gray-100 px-4 py-2 rounded-xl border border-gray-200">
                                <span class="font-black text-xs uppercase tracking-widest text-gray-700">${m.method}</span>
                             </div>
                             ${m.installments>1?`<span class="text-[10px] font-black bg-purple-100 text-purple-700 px-2.5 py-1.5 rounded-lg border border-purple-200 shadow-sm">${m.installments}x</span>`:""}
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-black text-xl text-gray-900">R$ ${m.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${x}" class="text-gray-400 hover:text-red-500 hover:bg-red-50 w-10 h-10 rounded-xl flex items-center justify-center transition-colors border border-transparent hover:border-red-200 active:scale-90"><i class="bi bi-trash3 text-lg"></i></button>
                        </div>
                    </div>
                `).join("")}
            </div>

            ${u>.01?`
            <div class="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-3">Selecionar Pagamento</label>
                
                <div class="grid grid-cols-2 gap-3 mb-5">
                    ${["dinheiro","pix","debito","credito","crediario"].map(m=>`
                        <button data-action="select-method" data-method="${m}" class="py-4 px-2 rounded-xl border text-[11px] font-black uppercase tracking-wider transition-colors active:scale-95 ${o.selectedMethod===m?"bg-indigo-600 text-white border-indigo-600 shadow-lg":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-indigo-50 hover:border-indigo-200"}">
                            ${m==="pix"?'<i class="bi bi-qr-code mr-1"></i> ':""}
                            ${m==="dinheiro"?'<i class="bi bi-cash mr-1"></i> ':""}
                            ${m==="debito"||m==="credito"?'<i class="bi bi-credit-card mr-1"></i> ':""}
                            ${m==="crediario"?'<i class="bi bi-journal-text mr-1"></i> ':""}
                            ${m}
                        </button>
                    `).join("")}
                </div>
                
                ${["credito","crediario"].includes(o.selectedMethod)?`
                    <div class="mb-5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Parcelamento</label>
                        <select id="checkout-installments" class="w-full p-3.5 border-2 border-gray-200 rounded-xl text-sm font-black text-gray-700 bg-gray-50 outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                            ${Array.from({length:12},(m,x)=>`<option value="${x+1}" ${o.installments===x+1?"selected":""}>${x+1} Parcela${x>0?"s":""}</option>`).join("")}
                        </select>
                    </div>
                `:""}

                <div class="flex items-end gap-3 mt-2">
                    <div class="flex-grow relative">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Valor a Pagar Agora</label>
                        <span class="absolute left-4 bottom-3.5 text-gray-400 font-black text-xl">R$</span>
                        <input type="number" id="checkout-amount" step="0.01" class="w-full py-3.5 pl-12 pr-4 border-2 border-gray-300 rounded-xl text-2xl font-black text-gray-900 outline-none focus:border-indigo-500 shadow-inner transition-colors" value="${u.toFixed(2)}">
                    </div>
                    <button data-action="add-payment-checkout" class="h-[54px] px-6 bg-gray-800 text-white font-black text-sm rounded-xl hover:bg-gray-900 transition shadow-lg uppercase tracking-wider active:scale-95 flex items-center justify-center gap-2">
                        OK <i class="bi bi-plus-lg"></i>
                    </button>
                </div>
            </div>
            `:""}
        </div>

        ${p}
    `;const b=()=>{const m=h.checkoutState.discount.type,x=h.checkoutState.discount.value;let y=m==="percent"?i*x/100:x;y>i&&(y=i);const S=Math.max(0,i-y-a),L=h.checkoutState.payments.reduce((V,P)=>V+P.value,0),D=Math.max(0,S-L),k=e.querySelector("#checkout-total-display");k&&(k.textContent=`R$ ${S.toFixed(2)}`);const I=e.querySelector("#checkout-status-msg");I&&(D<=.01?I.innerHTML='<p class="text-emerald-500 font-black text-base uppercase tracking-widest"><i class="bi bi-check2-circle text-2xl mr-2 align-middle"></i> Totalmente Pago</p>':I.innerHTML=`<p class="text-red-500 font-bold text-sm uppercase tracking-widest">Faltam: <span id="checkout-remaining-display" class="font-black text-xl text-red-600 ml-1">R$ ${D.toFixed(2)}</span></p>`);const M=e.querySelector("#checkout-amount");M&&D>0&&document.activeElement!==M&&(M.value=D.toFixed(2))};e.querySelector("#discount-value")?.addEventListener("input",m=>{const x=parseFloat(m.target.value)||0;h.checkoutState.discount.value=x,b()}),e.querySelector("#discount-type")?.addEventListener("change",m=>{h.checkoutState.discount.type=m.target.value,b()}),e.querySelector("#discount-reason")?.addEventListener("input",m=>{h.checkoutState.discountReason=m.target.value}),e.querySelector("#checkout-amount")?.addEventListener("input",m=>{h.checkoutState.amountReceived=m.target.value}),e.querySelector("#checkout-installments")?.addEventListener("change",m=>{h.checkoutState.installments=parseInt(m.target.value,10)})}async function Xn(t,e){if(!e)return;const a=h.loyaltySettings;if(!a||!a.enabled)return;let s=null;try{if(t.clientId)s=await No(f.establishmentId,t.clientId);else if(t.clientName){const n=await mt(f.establishmentId,t.clientName,1);n&&n.length>0&&(s=n[0])}}catch(n){console.warn("Erro ao buscar dados de fidelidade",n)}if(!s||s.loyaltyPoints===void 0)return;const i=Number(s.loyaltyPoints)||0,r=(a.tiers||a.rewards||[]).filter(n=>{const l=Number(n.costPoints||n.points||0);return l>0&&i>=l});if(r.length>0){const n=document.createElement("div");n.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-4 shadow-sm flex justify-between items-center animate-fade-in",n.innerHTML=`
            <div class="flex items-center gap-3">
                <div class="bg-white w-10 h-10 rounded-full text-yellow-500 shadow-sm border border-yellow-100 flex items-center justify-center">
                    <i class="bi bi-star-fill text-lg"></i>
                </div>
                <div>
                    <p class="text-xs font-black uppercase tracking-widest text-yellow-800">Prémio Disponível!</p>
                    <p class="text-[11px] text-yellow-700 font-bold mt-0.5">Saldo: ${i} pontos</p>
                </div>
            </div>
        `;const l=document.createElement("button");l.innerHTML="<i class='bi bi-gift mr-1.5'></i> Resgatar",l.className="text-[10px] font-black uppercase tracking-wider bg-yellow-500 text-white px-4 py-2.5 rounded-xl shadow-md hover:bg-yellow-600 transition-colors active:scale-95",l.onclick=()=>Zn(r,t),n.appendChild(l),e.innerHTML="",e.appendChild(n)}}function Zn(t,e){const a=`
        <div class="space-y-3">
            <p class="text-sm text-gray-500 mb-4 font-medium text-center">Pontos suficientes para resgatar:</p>
            <div class="space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
                ${t.map(o=>{const r=o.costPoints||o.points||0,n=o.name||o.reward,l=o.type||"money",d=o.discount?parseFloat(o.discount).toFixed(2):"0.00";let u="",c="bg-gray-100 text-gray-600";switch(l){case"service":u="Serviço",c="bg-indigo-100 text-indigo-700";break;case"product":u="Produto",c="bg-green-100 text-green-700";break;case"package":u="Pacote",c="bg-purple-100 text-purple-700";break;case"money":default:u="Valor",c="bg-yellow-100 text-yellow-700";break}return`
                    <button data-action="select-reward" data-reward-id="${o.id||n}" class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group shadow-sm text-left active:scale-95">
                        <div class="flex-1 min-w-0 pr-3">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border border-white/0 group-hover:border-yellow-200 ${c}">${u}</span>
                                <p class="font-black text-gray-900 group-hover:text-yellow-700 text-base truncate">${v(n)}</p>
                            </div>
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Custo: ${r} pontos</p>
                        </div>
                        <div class="flex-shrink-0">
                            <span class="block text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 shadow-sm">Desc. R$ ${d}</span>
                        </div>
                    </button>
                `}).join("")}
            </div>
        </div>
    `,{modalElement:s,close:i}=Fe({title:"🎁 Resgatar Prémio",contentHTML:a,maxWidth:"max-w-md"});s.addEventListener("click",o=>{const r=o.target.closest('[data-action="select-reward"]');if(r){const n=r.dataset.rewardId,l=t.find(d=>d.id&&d.id==n||(d.name||d.reward)==n);l&&(Kn(l,e),i())}})}async function Kn(t,e){const a=Number(t.costPoints||t.points||0),s=t.name||t.reward,i=t.type||"money";if(i==="money"){const l=parseFloat(t.discount)||0;if(l<=0){g("Erro","O valor do desconto configurado é inválido.","error");return}h.checkoutState.discount={type:"real",value:l},h.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,h.pendingRedemption={rewardId:t.id||null,name:s,cost:a,type:"money"},g("Sucesso",`Prémio "${s}" resgatado! Desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),ae();return}const o=Ne(e),r=t.itemId?String(t.itemId):null;if(!r){g("Erro de Configuração",`O prémio "${s}" não tem um item vinculado nas configurações.`,"error");return}const n=o.find(l=>{const d=l.id?String(l.id):null,u=l.serviceId?String(l.serviceId):l.service_id?String(l.service_id):null,c=l.productId?String(l.productId):l.product_id?String(l.product_id):null;return i==="service"?d===r||u===r:i==="product"?d===r||c===r:i==="package"?d===r:!1});if(n){let l=parseFloat(t.discount);(!l||l<=0)&&(l=parseFloat(n.price||0)),h.checkoutState.discount={type:"real",value:l},h.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,h.pendingRedemption={rewardId:t.id||null,name:s,cost:a,type:i,appliedToItemId:n.id},g("Sucesso",`Prémio "${s}" resgatado! Item encontrado e desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),ae()}else g("Item Não Encontrado",`Para resgatar o prémio "${s}", o ${i==="service"?"serviço":i==="product"?"produto":"pacote"} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`,"warning")}async function as(t=null){if(!h.isCashierOpen)return g("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");if(h.isCashierFromPreviousDay)return g("Ação Bloqueada","Feche o caixa pendente do dia anterior antes de iniciar novas vendas.","warning");if(!f.professionals||f.professionals.length===0)try{f.professionals=await De(f.establishmentId)}catch{return g("Erro","Não foi possível carregar profissionais.","error")}const a=`
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
                    ${f.professionals.map(l=>`<option value="${l.id}">${v(l.name)}</option>`).join("")}
                </select>
            </div>
            <div class="pt-4">
                <button type="submit" id="btn-start-sale" class="w-full bg-indigo-600 text-white font-black text-sm uppercase tracking-widest py-4 rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 transition shadow-lg flex items-center justify-center gap-2 active:scale-95">
                    <i class="bi bi-cart-plus text-xl"></i> Iniciar Venda
                </button>
            </div>
        </form>
    `,{modalElement:s}=Fe({title:"Nova Venda Avulsa",contentHTML:a,maxWidth:"max-w-sm"}),i=s.querySelector("#client-search"),o=s.querySelector("#client-suggestions"),r=s.querySelector("#selected-client-id");t&&(r.value=t.id,i.value=`${t.name} (${t.phone||"Sem tel"})`,i.classList.add("bg-emerald-50","border-emerald-300","text-emerald-800")),i.addEventListener("input",ni(async l=>{const d=l.target.value.trim();if(r.value="",i.classList.remove("bg-emerald-50","border-emerald-300","text-emerald-800"),d.length<2){o.classList.add("hidden");return}try{o.innerHTML='<li class="p-4 text-sm text-gray-500 text-center"><div class="loader-small mx-auto"></div></li>',o.classList.remove("hidden");const u=await mt(f.establishmentId,d,10);u.length===0?o.innerHTML='<li class="p-5 text-xs font-bold text-gray-400 text-center uppercase tracking-widest">Nenhum cliente encontrado</li>':o.innerHTML=u.map(c=>`<li data-client-id="${c.id}" data-client-name="${c.name}" data-client-phone="${c.phone}" class="p-4 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors flex flex-col justify-center"><div class="font-bold text-sm text-gray-800">${v(c.name)}</div><div class="text-xs font-medium text-gray-500 mt-1"><i class="bi bi-telephone opacity-50 mr-1.5"></i>${c.phone||"Sem telefone"}</div></li>`).join("")}catch{o.classList.add("hidden")}},400)),o.addEventListener("click",l=>{const d=l.target.closest("li[data-client-id]");d&&(r.value=d.dataset.clientId,r.dataset.name=d.dataset.clientName,r.dataset.phone=d.dataset.clientPhone,i.value=`${d.dataset.clientName}`,i.classList.add("bg-emerald-50","border-emerald-300","text-emerald-800"),o.classList.add("hidden"))}),document.addEventListener("click",l=>{!i.contains(l.target)&&!o.contains(l.target)&&o.classList.add("hidden")}),s.querySelector("#new-sale-form").addEventListener("submit",rl);const n=s.querySelector('[data-action="new-client-from-sale"]');n&&n.addEventListener("click",l=>{l.preventDefault(),s.style.display="none",el()})}function el(){Fe({title:"Cadastrar Cliente Rápido",contentHTML:`
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
    `,maxWidth:"max-w-sm"});const e=document.getElementById("comandas_clientRegistrationForm");e&&e.addEventListener("submit",tl)}async function tl(t){t.preventDefault();const e=document.getElementById("comandas_clientRegistrationForm");if(!e)return;const a=e.querySelector("#regClientName"),i=e.querySelector("#regClientPhone").value.replace(/\D/g,"");if(!a.value||!i)return g("Erro","Nome e Telefone são obrigatórios.","error");let o=null;try{o=await en(f.establishmentId,i)}catch{console.log("Cliente não encontrado na base, prosseguindo com criação...")}try{if(o&&o.id)g("Atenção","Cliente já cadastrado.","info"),document.getElementById("genericModal").style.display="none",as(o);else{const r=await Ro({establishmentId:f.establishmentId,name:a.value,phone:i});g("Sucesso","Cliente cadastrado!","success"),document.getElementById("genericModal").style.display="none",as(r)}}catch(r){g("Erro ao cadastrar",r.message,"error")}}async function al(){const t=`
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
    `,{modalElement:e}=Fe({title:"Abrir Caixa",contentHTML:t,maxWidth:"max-w-xs"});e.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const s=parseFloat(document.getElementById("initial-amount").value);if(isNaN(s)||s<0)return g("Valor Inválido","Insira um valor válido.","error");try{const i=await Rn({establishmentId:f.establishmentId,initialAmount:parseFloat(s.toFixed(2))});h.isCashierOpen=!0,h.activeCashierSessionId=i.id,h.isCashierFromPreviousDay=!1,document.getElementById("genericModal").style.display="none",g("Sucesso!",`Caixa aberto (R$ ${s.toFixed(2)})`,"success"),Ra(),await Ee()}catch(i){g("Erro",`Falha ao abrir caixa: ${i.message}`,"error")}})}async function sl(){const t=h.activeCashierSessionId;if(t)try{const e=await zn(t),a=`
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
        `,{modalElement:s}=Fe({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-sm"});s.querySelector("#close-cashier-form").addEventListener("submit",async i=>{i.preventDefault();const o=parseFloat(document.getElementById("final-amount").value);if(isNaN(o)||o<0)return g("Valor Inválido","Insira um valor final válido.","error");try{await Hn(t,o),h.isCashierOpen=!1,h.activeCashierSessionId=null,h.isCashierFromPreviousDay=!1,document.getElementById("genericModal").style.display="none",Ra(),await Ee(),g("Sucesso!","Caixa fechado com sucesso!","success")}catch(r){g("Erro",`Falha ao fechar caixa: ${r.message}`,"error")}})}catch(e){g("Erro",`Falha ao carregar relatório: ${e.message}`,"error")}}async function ol(t){if(h.activeFilter===t)return;h.activeFilter=t,h.paging.page=1,Ps(),tt(),h.selectedComandaId=null,h.viewMode="items";const e=document.getElementById("comandas-list");e&&(e.innerHTML='<div class="loader mx-auto mt-10"></div>'),Ft()}function li(t){h.selectedComandaId=String(t),h.viewMode="items",h.pendingRedemption=null,h.checkoutState.discount={type:"real",value:0},h.checkoutState.discountReason="",Ft(),Un(),ae()}async function di(t,e){const a=h.allComandas.find(o=>String(o.id)===String(h.selectedComandaId));if(!a)return;if(!t.id||String(t.id)==="undefined"){g("Erro","Item sem identificador. Não foi possível adicionar.","error");return}const s=parseFloat(t.price)||0,i=Array(e).fill(0).map(()=>{const o={id:String(t.id),name:t.name,price:s,type:t.type,isReward:t.isReward||!1,pointsCost:t.pointsCost||0};return t.type==="product"?(o.productId=o.id,o.product_id=o.id):t.type==="service"&&(o.serviceId=o.id,o.service_id=o.id),o});a.comandaItems=a.comandaItems||[],a.comandaItems.push(...i),a._cachedItems=null,a._hasUnsavedChanges=!0,ae()}async function eo(t,e){const a=h.allComandas.find(o=>String(o.id)===String(h.selectedComandaId));if(!a)return;let s=!1,i=(a.comandaItems||[]).findIndex(o=>String(o.id)===String(t)&&o.type===e);i>-1&&(a.comandaItems.splice(i,1),s=!0),s&&(a._cachedItems=null,a._hasUnsavedChanges=!0,ae())}async function il(t){if(h.isProcessing)return;const e=Number(t.planDiscount||0),a=Ne(t),s=a.reduce((S,L)=>S+Number(L.price||0)*(L.quantity||1),0),i=h.checkoutState.discount||{type:"real",value:0};let o=i.type==="percent"?s*i.value/100:i.value;o>s&&(o=s);const r=Math.max(0,s-o-e),{payments:n}=h.checkoutState,l=n.reduce((S,L)=>S+L.value,0),d=r-l;if(d>.01){if(!await G("Pagamento Parcial",`O valor de R$ ${d.toFixed(2)} não foi pago. Deseja registrar como DÍVIDA (Fiado) no cadastro do cliente?`))return;n.push({method:"fiado",value:d,installments:1})}h.isProcessing=!0;const u=t.type==="appointment",c=a;let p=0;const b=h.loyaltySettings;b&&b.enabled&&(!t.coveredByPlan||r>0)&&(p=parseInt(b.pointsPerVisit||1,10));const m={...i,reason:h.checkoutState.discountReason||""},x={payments:n,totalAmount:Number(r),items:c,cashierSessionId:h.activeCashierSessionId,loyaltyPointsEarned:p,discount:m,loyaltyRedemption:h.pendingRedemption},y=document.createElement("div");y.className="fixed inset-0 bg-gray-900/60 z-[999999] flex items-center justify-center backdrop-blur-sm",y.innerHTML='<div class="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center"><div class="loader mb-5"></div><p class="text-sm font-black text-gray-800 uppercase tracking-widest mt-2">Processando...</p></div>',document.body.appendChild(y);try{u?await gr(t.id,x):(x.establishmentId=f.establishmentId,x.clientId=t.clientId,x.clientName=t.clientName,x.professionalId=t.professionalId,t.clientPhone&&(x.clientPhone=t.clientPhone),await ai(x));let S="Venda finalizada com sucesso!";p>0&&(S+=` Cliente ganhou ${p} pontos!`),g("Sucesso!",S,"success"),tt(),h.selectedComandaId=null,h.viewMode="items",h.pendingRedemption=null,await Ee()}catch(S){g("Erro no Checkout",S.message,"error")}finally{document.body.contains(y)&&document.body.removeChild(y),h.isProcessing=!1}}async function rl(t){t.preventDefault();const e=document.getElementById("selected-client-id"),a=document.getElementById("new-sale-professional").value,s=e.value,i=document.getElementById("client-search").value,o=e.dataset.phone||"";if(!s)return g("Erro","Selecione um cliente válido.","error");const r=f.professionals.find(l=>l.id===a);if(!r)return g("Erro","Selecione um profissional válido.","error");const n={id:`temp-${Date.now()}`,type:"walk-in",clientId:s,clientName:i.split("(")[0].trim(),clientPhone:o,professionalId:r.id,professionalName:r.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};h.allComandas.unshift(n),h.selectedComandaId=String(n.id),h.viewMode="items",document.getElementById("genericModal").style.display="none",h.activeFilter==="pagas"&&(h.activeFilter="abertas"),Ps(),li(n.id)}async function Ee(){const t=document.getElementById("comandas-list");(!t.hasChildNodes()||t.innerHTML.includes("loader"))&&(t.innerHTML='<div class="loader mx-auto mt-10"></div>');let e=h.filterStartDate,a=h.filterEndDate;if(h.filterPreset==="hoje"){a=fe(new Date);const o=new Date;o.setDate(o.getDate()-45),e=fe(o)}let s;e&&a&&e!==a?s={startDate:e,endDate:a}:s={startDate:e,endDate:a,date:e};try{const i=Fn(),o=Mn(f.establishmentId,s,h.paging.page,h.paging.limit),r=Ae(f.establishmentId),[n,l,d]=await Promise.all([i,o,r]);if(h.establishmentConfig=d||{},h.isCashierOpen=!!n,h.activeCashierSessionId=n?n.id:null,h.isCashierFromPreviousDay=!1,n&&n.openedAt){const u=fe(n.openedAt),c=fe(new Date);u<c&&(h.isCashierFromPreviousDay=!0)}if(Ra(),d&&d.loyaltyProgram&&(h.loyaltySettings=d.loyaltyProgram),h.allComandas=l.data||l||[],h.paging.total=l.total||h.allComandas.length,h.catalog.services.length===0){const[u,c,p,b]=await Promise.all([Ue(f.establishmentId),gt(f.establishmentId),Ds(f.establishmentId),De(f.establishmentId)]);h.catalog={services:u,products:c,packages:p},f.professionals=b}Ft(),ae()}catch(i){g("Erro",`Não foi possível carregar os dados: ${i.message}`,"error")}}async function nl(t={}){Ke=document.getElementById("content"),h.selectedComandaId=t.selectedAppointmentId?String(t.selectedAppointmentId):null,h.viewMode="items",h.selectedCatalogItem=null;const e=Ua("hoje");if(h.filterStartDate=e.start,h.filterEndDate=e.end,h.filterPreset="hoje",h.showHistoryPanel=!1,Ot(),Ge&&(Ke.removeEventListener("click",Ge),Ke.removeEventListener("change",Ge)),Ge=async a=>{const s=a.target.closest("[data-action], [data-filter], [data-comanda-id]");if(s){if(s.matches("[data-filter]"))a.preventDefault(),ol(s.dataset.filter);else if(s.matches("[data-comanda-id]")){if(a.preventDefault(),a.target.closest('[data-action="go-to-appointment"]')){a.stopPropagation();return}li(s.dataset.comandaId)}else if(s.matches("[data-action]")){a.preventDefault();const i=s.dataset.action,o=String(s.dataset.id||h.selectedComandaId),r=h.allComandas.find(n=>String(n.id)===o);switch(i){case"toggle-history":if(h.showHistoryPanel=!h.showHistoryPanel,h.showHistoryPanel&&h.activeFilter==="abertas"&&(h.activeFilter="todas"),Ot(),!h.showHistoryPanel){h.filterPreset="hoje";const O=Ua("hoje");h.filterStartDate=O.start,h.filterEndDate=O.end,await Ee()}break;case"set-period":const n=s.dataset.period;if(h.filterPreset=n,n!=="custom"){const O=Ua(n);h.filterStartDate=O.start,h.filterEndDate=O.end,Ot(),h.paging.page=1,g("Buscando...",`Período: ${O.start.split("-").reverse().join("/")} a ${O.end.split("-").reverse().join("/")}`,"info"),await Ee()}else Ot();break;case"apply-custom-dates":const l=document.getElementById("filter-start-date").value,d=document.getElementById("filter-end-date").value;l&&d?(h.filterStartDate=l,h.filterEndDate=d,h.paging.page=1,g("Buscando...","Período personalizado aplicado.","info"),await Ee()):g("Atenção","Preencha a data inicial e final.","warning");break;case"back-to-list":tt(),h.selectedComandaId=null,h.selectedCatalogItem=null,document.querySelectorAll(".comanda-card").forEach(O=>O.classList.remove("ring-2","ring-indigo-500","bg-indigo-50/50","border-transparent")),document.querySelectorAll(".comanda-card").forEach(O=>O.classList.add("bg-white","border-gray-200")),ae();break;case"new-sale":as();break;case"add-item":if(!h.isCashierOpen)return g("Caixa Fechado","Abra o caixa primeiro.","error");h.viewMode="add-item",ae();break;case"back-to-items":h.viewMode="items",ae();break;case"back-to-add-item":h.viewMode="add-item",h.selectedCatalogItem=null,ae();break;case"select-catalog-item":const{itemType:u,itemId:c}=s.dataset,b=(h.catalog[u+"s"]||[]).find(O=>String(O.id)===String(c));b&&(h.selectedCatalogItem={...b,type:u},h.viewMode="add-item-qty",ae());break;case"open-cashier":al();break;case"close-cashier":await sl();break;case"view-sales-report":ie("sales-report-section");break;case"go-to-checkout":await Zs(r,"checkout");break;case"save-comanda":await Zs(r,"stay");break;case"select-method":h.checkoutState.selectedMethod=s.dataset.method,h.checkoutState.installments=1,ae();break;case"add-payment-checkout":const m=document.getElementById("checkout-amount");let x=parseFloat(m.value);const y=Number(r.planDiscount||0),L=Ne(r).reduce((O,T)=>O+(T.price||0),0),D=h.checkoutState.discount||{type:"real",value:0};let k=D.type==="percent"?L*D.value/100:D.value;k>L&&(k=L);const I=Math.max(0,L-k-y),M=h.checkoutState.payments.reduce((O,T)=>O+T.value,0),V=I-M;if(isNaN(x)||x<=0){g("Valor inválido","Insira um valor maior que zero.","error");break}if(x>V+.05){g("Valor inválido","Valor excede o restante.","error");break}const P={method:h.checkoutState.selectedMethod,value:x};["credito","crediario"].includes(h.checkoutState.selectedMethod)&&h.checkoutState.installments>1&&(P.installments=h.checkoutState.installments),h.checkoutState.payments.push(P),h.checkoutState.selectedMethod="dinheiro",h.checkoutState.installments=1,h.checkoutState.amountReceived="",ae();break;case"remove-payment-checkout":const z=parseInt(s.dataset.index,10);h.checkoutState.payments.splice(z,1),ae();break;case"finalize-checkout":await il(r);break;case"increase-qty":{const O=s.dataset.itemId,T=s.dataset.itemType;if(!O||O==="undefined"||O==="null"){g("Erro","Item inválido.","error");return}let N=Ne(r).find(ee=>String(ee.id)===String(O)&&ee.type===T);N||(N=(h.catalog[T+"s"]||[]).find(oe=>String(oe.id)===String(O)));const K=N?{id:N.id,name:N.name,price:Number(N.price),type:N.type}:{id:O,name:"Item",price:0,type:T};await di(K,1);break}case"decrease-qty":await eo(s.dataset.itemId,s.dataset.itemType);break;case"remove-item":await eo(s.dataset.itemId,s.dataset.itemType);break;case"reopen-appointment":{if(await G("Reabrir Comanda","Tem certeza? O pagamento será estornado."))try{await mr(o);const T=h.allComandas.findIndex(A=>String(A.id)===o);T!==-1&&(h.allComandas[T].status="confirmed",delete h.allComandas[T].transaction),h.selectedComandaId=null,tt(),await Ee(),g("Sucesso!","Comanda reaberta.","success")}catch(T){g("Erro",T.message,"error")}break}case"go-to-appointment":{ie("agenda-section",{scrollToAppointmentId:s.dataset.id,targetDate:new Date(s.dataset.date)});break}case"delete-walk-in":{if(await G("Excluir Venda","Confirma a exclusão desta venda avulsa?"))if(o.startsWith("temp-"))h.allComandas=h.allComandas.filter(T=>String(T.id)!==o),h.selectedComandaId=null,Ft(),ae(),tt();else try{await si(o),g("Sucesso","Venda excluída.","success"),h.selectedComandaId=null,tt(),await Ee()}catch(T){g("Erro",T.message,"error")}break}}}}},Ke.addEventListener("click",Ge),Ke.addEventListener("change",Ge),t.initialFilter&&(t.initialFilter==="finalizadas"?h.activeFilter="pagas":h.activeFilter="abertas"),t.selectedAppointmentId&&(h.selectedComandaId=String(t.selectedAppointmentId)),t.filterDate){const a=new Date(t.filterDate).toISOString().split("T")[0];h.filterStartDate=a,h.filterEndDate=a,h.filterPreset="custom",h.showHistoryPanel=!0}await Ee()}const ss=new Date,ll=new Date(ss.getFullYear(),ss.getMonth(),1);let q={establishments:[],filterEstablishmentIds:new Set,startDate:ll.toISOString().split("T")[0],endDate:ss.toISOString().split("T")[0],currentTab:"financeiro",drillDownMonth:null,data:{financeiro:null,agenda:null,clientes:null,vendas:null,estoque:null},charts:{}};const os=document.getElementById("content");let zt=null;function ce(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function Me(t){if(!t)return"--/--/----";const e=t.split("T")[0].split("-");return e.length===3?`${e[2]}/${e[1]}/${e[0]}`:t}function Te(t){return t?typeof t.toDate=="function"?t.toDate():typeof t=="string"||typeof t=="number"?new Date(t):new Date:new Date(0)}function Rt(t){q.charts[t]&&(q.charts[t].destroy(),q.charts[t]=null)}async function dl(){try{const e=(await ke().catch(()=>({matrizes:[]}))).matrizes||[];q.establishments=[],e.forEach(a=>{q.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>q.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),q.filterEstablishmentIds.size===0&&q.filterEstablishmentIds.add(f.establishmentId)}catch(t){console.error("Erro ao buscar hierarquia de empresas",t)}cl(),xl(),await vt()}function cl(){const t=q.establishments.map(e=>`
        <label class="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 border ${q.filterEstablishmentIds.has(e.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50 text-indigo-700":"border-slate-200 text-slate-600"} rounded-md cursor-pointer hover:bg-slate-100 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${e.id}" ${q.filterEstablishmentIds.has(e.id)?"checked":""}>
            <span class="text-[10px] font-bold whitespace-nowrap">${e.type==="Matriz"?'<i class="bi bi-building"></i>':'<i class="bi bi-shop"></i>'} ${e.name}</span>
        </label>
    `).join("");os.innerHTML=`
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
                        ${q.establishments.length>1?t:'<span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-100 px-2 py-1 rounded-md"><i class="bi bi-shop mr-1"></i> Unidade Atual</span>'}
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
    `}async function vt(){const t=document.getElementById("tab-content");t&&(t.innerHTML='<div class="flex justify-center items-center h-40"><div class="loader"></div></div>');const{currentTab:e,startDate:a,endDate:s,filterEstablishmentIds:i}=q,o=Array.from(i),r=o.join(","),n=new Date(a).toISOString(),l=new Date(s);l.setHours(23,59,59,999);const d=l.toISOString();try{if(e==="financeiro"){const u={startDate:a,endDate:s,establishmentId:r},[c,p,b]=await Promise.all([Is(u).catch(()=>({entries:[]})),Aa(u).catch(()=>({entries:[]})),Ba(f.establishmentId).catch(()=>[])]);q.data.financeiro={payables:c.entries,receivables:p.entries,natures:b},ul()}else if(e==="agenda"){const u=o.map(m=>Pa(m,n,d).catch(()=>[])),c=o.map(m=>lr(m,n,d).catch(()=>[])),[p,b]=await Promise.all([Promise.all(u),Promise.all(c)]);q.data.agenda={active:p.flat(),cancelled:b.flat()},is()}else if(e==="clientes"){const u=await Promise.all(o.map(p=>mt(p).catch(()=>[]))),c=new Map;u.flat().forEach(p=>c.set(p.id,p)),q.data.clientes=Array.from(c.values()),rs()}else if(e==="vendas"){let u=[];try{Qs&&typeof ts=="function"?u=await Promise.all(o.map(c=>ts({startDate:a,endDate:s,establishmentId:c}).catch(()=>[]))):Zr&&typeof xa=="function"&&(u=(await Promise.all(o.map(p=>xa({establishmentId:p,startDate:a,endDate:s}).catch(()=>({transactions:[]}))))).flatMap(p=>(p.transactions||[]).map(b=>({id:"REF-"+Math.random().toString(36).substring(2,8),status:"completed",createdAt:b.date,totalAmount:b.total,items:[{name:b.items||"Itens Venda",quantity:1,price:b.total}]}))))}catch(c){console.error("Erro interno ao buscar as vendas:",c)}q.data.vendas=u.flat(),bl()}else if(e==="estoque"){const u=await Promise.all(o.map(c=>gt(c).catch(()=>[])));q.data.estoque=u.flat(),ml()}}catch(u){t.innerHTML=`<div class="p-10 text-center text-red-500 bg-red-50 rounded-xl border border-red-100"><i class="bi bi-exclamation-triangle text-3xl mb-2"></i><br>Erro ao carregar dados: ${u.message}</div>`}}function ul(){const t=document.getElementById("tab-content"),{payables:e,receivables:a,natures:s}=q.data.financeiro,i=new Map(s.map(k=>[k.id,k.name])),o={};a.forEach(k=>{const I=(k.status==="paid"?k.paymentDate:k.dueDate)?.split("T")[0];if(!I)return;o[I]||(o[I]={recReal:0,recPrev:0,despReal:0,despPrev:0,items:[]});const M=Number(k.amount)||0;o[I].items.push({...k,_type:"receita"}),k.status==="paid"?o[I].recReal+=M:o[I].recPrev+=M}),e.forEach(k=>{const I=(k.status==="paid"?k.paymentDate:k.dueDate)?.split("T")[0];if(!I)return;o[I]||(o[I]={recReal:0,recPrev:0,despReal:0,despPrev:0,items:[]});const M=Number(k.amount)||0;o[I].items.push({...k,_type:"despesa"}),k.status==="paid"?o[I].despReal+=M:o[I].despPrev+=M});const r=Object.keys(o).sort(),n=r.map(k=>Me(k).substring(0,5));let l=0;const d=[],u=[],c=[],p=[],b=[];r.forEach(k=>{const I=o[k];d.push(I.recReal),u.push(I.recPrev),c.push(-Math.abs(I.despReal)),p.push(-Math.abs(I.despPrev)),l+=I.recReal-I.despReal,b.push(l)});const m=d.reduce((k,I)=>k+I,0),x=c.reduce((k,I)=>k+Math.abs(I),0),y=m-x,S=m>0?y/m*100:0,L={},D={};a.filter(k=>k.status==="paid").forEach(k=>{const I=k.naturezaId?i.get(k.naturezaId)||"Outros":"Sem Cat.";L[I]=(L[I]||0)+k.amount}),e.filter(k=>k.status==="paid").forEach(k=>{const I=k.naturezaId?i.get(k.naturezaId)||"Outros":"Sem Cat.";D[I]=(D[I]||0)+k.amount}),t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-up-circle text-emerald-500 mr-1"></i> Rec. Realizada</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${ce(m)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-down-circle text-red-500 mr-1"></i> Desp. Realizada</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${ce(x)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-wallet2 text-indigo-500 mr-1"></i> Saldo do Período</span><span class="text-lg md:text-xl font-black ${y>=0?"text-emerald-600":"text-red-600"} mt-0.5">${ce(y)}</span></div>
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
                        ${Object.entries(L).sort((k,I)=>I[1]-k[1]).map(([k,I])=>`<div class="flex justify-between items-center mb-1"><span class="text-[11px] text-slate-600 truncate mr-2">${k}</span><span class="text-[11px] font-bold text-slate-800">${ce(I)}</span></div>`).join("")||'<p class="text-[9px] text-slate-400">Sem dados.</p>'}</div>
                        <div class="mb-2"><p class="text-[9px] font-bold text-red-500 uppercase border-b border-red-100 pb-1 mb-1.5">Despesas</p>
                        ${Object.entries(D).sort((k,I)=>I[1]-k[1]).map(([k,I])=>`<div class="flex justify-between items-center mb-1"><span class="text-[11px] text-slate-600 truncate mr-2">${k}</span><span class="text-[11px] font-bold text-slate-800">${ce(I)}</span></div>`).join("")||'<p class="text-[9px] text-slate-400">Sem dados.</p>'}</div>
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{const k=document.getElementById("chartFin");k&&(Rt("fin"),q.charts.fin=new Chart(k,{type:"bar",data:{labels:n.length?n:["-"],datasets:[{label:"Receita Realizada",data:d,backgroundColor:"#10b981",stack:"Stack 0",borderRadius:3,order:2},{label:"Receita Prevista",data:u,backgroundColor:"#6ee7b7",stack:"Stack 0",borderRadius:3,order:2},{label:"Despesa Realizada",data:c,backgroundColor:"#ef4444",stack:"Stack 0",borderRadius:3,order:2},{label:"Despesa Prevista",data:p,backgroundColor:"#fca5a5",stack:"Stack 0",borderRadius:3,order:2},{label:"Saldo Acumulado",data:b,type:"line",borderColor:"#4f46e5",backgroundColor:"#4f46e5",tension:.4,borderWidth:2,pointRadius:3,yAxisID:"y1",order:1}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{callbacks:{label:function(I){let M=I.dataset.label||"";return M&&(M+=": "),I.parsed.y!==null&&(M+=ce(Math.abs(I.parsed.y))),M},footer:function(I){const M=I[0].dataIndex,V=r[M],P=o[V];if(!P)return"";const z=P.recReal+P.recPrev-(P.despReal+P.despPrev);return`
Saldo Dia: `+ce(z)+`
(Clique para ver)`}}}},onClick:(I,M)=>{if(M.length>0){const V=M[0].index,P=M[0].datasetIndex,z=r[V];let O="all";P===0||P===1?O="receita":(P===2||P===3)&&(O="despesa"),pl(z,O,o[z].items,i)}},scales:{x:{stacked:!0,grid:{display:!1}},y:{stacked:!0,beginAtZero:!0,grid:{borderDash:[2,4],color:"#f8fafc"},ticks:{font:{size:9},callback:I=>ce(Math.abs(I))}},y1:{position:"right",beginAtZero:!0,grid:{display:!1},ticks:{font:{size:9},callback:I=>ce(I)}}}}}),document.querySelectorAll(".fin-toggle-btn").forEach(I=>{I.className="fin-toggle-btn flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase transition-all shadow-sm rounded-md border cursor-pointer",I.onclick=M=>{const V=M.currentTarget,P=parseInt(V.dataset.dataset),z=q.charts.fin;z.isDatasetVisible(P)?(z.hide(P),V.style.opacity="0.4",V.style.background="#f8f9fa"):(z.show(P),V.style.opacity="1",V.style.background="")}}))},100)}function pl(t,e,a,s){let i=document.getElementById("genericModal");i||(i=document.createElement("div"),i.id="genericModal",i.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",document.body.appendChild(i));const o=e==="all"?a:a.filter(l=>l._type===e);let r=e==="receita"?'<span class="text-emerald-600">Receitas</span>':e==="despesa"?'<span class="text-red-600">Despesas</span>':"Movimentações";i.innerHTML=`
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none sm:max-w-3xl sm:mx-auto my-8">
            <div class="modal-content relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-xl shadow-2xl border-0">
                <div class="modal-header flex items-center justify-between p-3 border-b border-slate-200 bg-slate-50 rounded-t-xl">
                    <h5 class="text-sm font-bold text-slate-800"><i class="bi bi-search text-indigo-600 mr-1.5"></i> ${r} em ${Me(t)}</h5>
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
                                            ${ce(l.amount)}
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
    `,i.style.display="block",setTimeout(()=>i.classList.add("show","opacity-100"),10);const n=i.querySelector(".btn-close-modal");n&&(n.onclick=()=>{i.style.display="none",i.classList.remove("show","opacity-100")})}function is(){const t=document.getElementById("tab-content"),{active:e,cancelled:a}=q.data.agenda,s=e.length+a.length,i=e.filter(p=>p.status==="completed").length,o=e.filter(p=>["confirmed","pending","in-progress"].includes(p.status)).length,r=e.filter(p=>p.status==="no-show").length,n=a.length,l=s>0?(i/s*100).toFixed(1):0,d=e.filter(p=>p.status==="completed").reduce((p,b)=>p+(Number(b.totalAmount||(b.transaction?b.transaction.totalAmount:0))||0),0);let u=[],c=[];if(q.drillDownMonth!==null){const p=new Date(q.startDate).getFullYear(),b=new Date(p,q.drillDownMonth+1,0).getDate();u=Array.from({length:b},(m,x)=>`${x+1}`),c=u.map(m=>e.filter(x=>{const y=Te(x.startTime||x.date);return y.getMonth()===q.drillDownMonth&&y.getDate()===parseInt(m)}).length)}else u=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],c=u.map((p,b)=>e.filter(m=>Te(m.startTime||m.date).getMonth()===b).length);t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Total Agendas</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${s}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest block">Concluídas</span><span class="text-lg md:text-xl font-black text-emerald-600 mt-0.5">${i}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-amber-500 uppercase tracking-widest block">Aguardando</span><span class="text-lg md:text-xl font-black text-amber-600 mt-0.5">${o}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-red-400 uppercase tracking-widest block">Faltou (No-Show)</span><span class="text-lg md:text-xl font-black text-red-500 mt-0.5">${r}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Canceladas</span><span class="text-lg md:text-xl font-black text-slate-400 mt-0.5">${n}</span></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="bg-indigo-600 p-4 rounded-xl text-white shadow-sm flex items-center justify-between"><div><p class="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Taxa Conclusão</p><p class="text-2xl md:text-3xl font-black">${l}%</p></div><i class="bi bi-graph-up-arrow text-3xl opacity-50"></i></div>
                <div class="bg-emerald-600 p-4 rounded-xl text-white shadow-sm flex items-center justify-between"><div><p class="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Receita Atendimentos</p><p class="text-2xl md:text-3xl font-black">${ce(d)}</p></div><i class="bi bi-cash-coin text-3xl opacity-50"></i></div>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div class="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide"><i class="bi bi-clock-history text-indigo-500 mr-1"></i> Volume de Agendamentos ${q.drillDownMonth!==null?`(${u.length} dias)`:""}</h3>
                    ${q.drillDownMonth!==null?'<button id="btn-back-agenda" class="text-[9px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md hover:bg-indigo-100 transition-colors shadow-sm"><i class="bi bi-arrow-left mr-1"></i> Voltar</button>':'<span class="hidden md:inline-block text-[9px] text-slate-400 italic">Dica: Clique num mês para ver por dia.</span>'}
                </div>
                <div class="relative h-64 w-full"><canvas id="chartAgenda"></canvas></div>
            </div>
        </div>`,setTimeout(()=>{const p=document.getElementById("chartAgenda");p&&(Rt("agenda"),q.charts.agenda=new Chart(p,{type:"line",data:{labels:u,datasets:[{label:"Ativos",data:c,borderColor:"#4f46e5",backgroundColor:"rgba(79, 70, 229, 0.1)",fill:!0,tension:.4,pointRadius:4,borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(m,x)=>{x.length>0&&q.drillDownMonth===null&&(q.drillDownMonth=x[0].index,is())},plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,grid:{color:"#f8fafc",borderDash:[2,4]},ticks:{stepSize:1,font:{size:9}}},x:{grid:{display:!1},ticks:{font:{size:9}}}}}}));const b=document.getElementById("btn-back-agenda");b&&(b.onclick=()=>{q.drillDownMonth=null,is()})},100)}function rs(){const t=document.getElementById("tab-content"),e=q.data.clientes||[],a=Te(q.startDate),s=Te(q.endDate);s.setHours(23,59,59,999);const i=e.length,o=e.filter(u=>{if(!u.createdAt)return!1;const c=Te(u.createdAt);return c>=a&&c<=s}),r=e.filter(u=>{if(!u.createdAt&&!u.lastVisit)return!0;const c=u.lastVisit?Te(u.lastVisit):Te(u.createdAt);return(new Date-c)/(1e3*60*60*24)>60}),n=i>0?(o.length/i*100).toFixed(1):0;let l=[],d=[];if(q.drillDownMonth!==null){const u=new Date(q.startDate).getFullYear(),c=new Date(u,q.drillDownMonth+1,0).getDate();l=Array.from({length:c},(p,b)=>`${b+1}`),d=l.map(p=>o.filter(b=>{const m=Te(b.createdAt);return m.getMonth()===q.drillDownMonth&&m.getDate()===parseInt(p)}).length)}else l=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],d=l.map((u,c)=>o.filter(p=>Te(p.createdAt).getMonth()===c).length);t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-people-fill text-indigo-500 mr-1"></i> Base Total</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${i}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest"><i class="bi bi-person-plus-fill mr-1"></i> Novos (Período)</span><span class="text-lg md:text-xl font-black text-emerald-600 mt-0.5">${o.length}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-amber-500 uppercase tracking-widest"><i class="bi bi-person-dash-fill mr-1"></i> Ausentes (>60 dias)</span><span class="text-lg md:text-xl font-black text-amber-600 mt-0.5">${r.length}</span></div>
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
        </div>`,setTimeout(()=>{if(!window.Chart)return;const u=document.getElementById("chartClientes");u&&(Rt("clientes"),q.charts.clientes=new Chart(u,{type:"bar",data:{labels:l,datasets:[{label:"Novos Cadastros",data:d,backgroundColor:"#3b82f6",borderRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(p,b)=>{b.length>0&&q.drillDownMonth===null&&(q.drillDownMonth=b[0].index,rs())},plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{stepSize:1,font:{size:9}}},x:{grid:{display:!1},ticks:{font:{size:9}}}}}}));const c=document.getElementById("btn-back-clientes");c&&(c.onclick=()=>{q.drillDownMonth=null,rs()})},100)}function bl(){const t=document.getElementById("tab-content"),a=(q.data.vendas||[]).filter(d=>d.status==="completed"||d.status==="paid"),s=a.reduce((d,u)=>d+(Number(u.totalAmount)||0),0),i=a.length,o=i>0?s/i:0;let r=0;const n={};a.forEach(d=>{(Array.isArray(d.items)?d.items:Array.isArray(d.services)?d.services:[]).forEach(c=>{const p=Number(c.quantity)||1;r+=p;const b=c.name||"Produto/Serviço Indefinido";n[b]=(n[b]||0)+p})});const l=Object.entries(n).sort((d,u)=>u[1]-d[1]).slice(0,5);t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-indigo-600 text-white p-3 rounded-xl shadow-sm flex flex-col"><span class="text-[9px] font-bold text-indigo-200 uppercase tracking-widest">Faturamento PDV</span><span class="text-lg md:text-xl font-black mt-0.5">${ce(s)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ticket Médio</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${ce(o)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Vendas</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${i}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Volume Itens</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${r}</span></div>
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
                                        <p class="text-[9px] text-slate-400">${Me(d.createdAt||d.date||"")}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-[11px] font-black text-emerald-600">${ce(d.totalAmount)}</p>
                                        <p class="text-[9px] text-slate-400">${u} itens</p>
                                    </div>
                                </div>
                            `}).join("")||'<p class="text-[10px] text-slate-400">Nenhuma venda concluída no período.</p>'}
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{if(!window.Chart)return;const d=document.getElementById("chartVendas");d&&l.length>0?(Rt("vendas"),q.charts.vendas=new Chart(d,{type:"bar",data:{labels:l.map(u=>u[0].substring(0,15)+"..."),datasets:[{label:"Quantidade Vendida",data:l.map(u=>u[1]),backgroundColor:"#f59e0b",borderRadius:3}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0,ticks:{stepSize:1,font:{size:9}}},y:{grid:{display:!1},ticks:{font:{size:9}}}}}})):d&&(d.parentElement.innerHTML='<div class="flex h-full items-center justify-center text-[10px] text-slate-400">Sem dados suficientes</div>')},100)}function ml(){const t=document.getElementById("tab-content"),e=q.data.estoque||[];let a=0,s=0,i=[],o=[];e.forEach(r=>{r.active!==!1&&s++;const n=Number(r.currentStock)||0,l=Number(r.minStock)||0,d=Number(r.costPrice)||Number(r.price)||0;n>0&&(a+=n*d),n<=0?o.push(r):n<=l&&i.push(r)}),t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-indigo-600 text-white p-3 rounded-xl shadow-sm flex flex-col"><span class="text-[9px] font-bold text-indigo-200 uppercase tracking-widest">Imobilizado</span><span class="text-lg md:text-xl font-black mt-0.5">${ce(a)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ativos</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${s}</span></div>
                <div class="bg-amber-50 p-3 rounded-xl border border-amber-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Estoque Baixo</span><span class="text-lg md:text-xl font-black text-amber-600 mt-0.5">${i.length}</span></div>
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
                                ${[...o,...i].map(r=>`
                                    <tr class="hover:bg-slate-50 transition-colors">
                                        <td class="py-2 font-bold text-slate-700 text-[11px]">${r.name}</td>
                                        <td class="py-2 text-center text-slate-500 text-[11px]">${r.minStock||0}</td>
                                        <td class="py-2 text-center font-black text-[11px] ${r.currentStock<=0?"text-red-500":"text-amber-500"}">${r.currentStock||0}</td>
                                        <td class="py-2 text-right">
                                            <span class="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${r.currentStock<=0?"bg-red-100 text-red-600":"bg-amber-100 text-amber-600"}">
                                                ${r.currentStock<=0?"Esgotado":"Comprar"}
                                            </span>
                                        </td>
                                    </tr>
                                `).join("")||'<tr><td colspan="4" class="text-center py-6 text-[10px] text-slate-400">Estoque saudável.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{if(!window.Chart)return;const r=document.getElementById("chartEstoque"),n=s-i.length-o.length;r&&(Rt("estoque"),q.charts.estoque=new Chart(r,{type:"doughnut",data:{labels:["Saudável","Baixo","Esgotado"],datasets:[{data:[Math.max(0,n),i.length,o.length],backgroundColor:["#10b981","#f59e0b","#ef4444"],borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"70%",plugins:{legend:{position:"right",labels:{usePointStyle:!0,boxWidth:6,font:{size:10}}}}}}))},100)}function gl(){let t=document.getElementById("genericModal");t||(t=document.createElement("div"),t.id="genericModal",t.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",document.body.appendChild(t)),t.innerHTML=`
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
    `,t.style.display="block",setTimeout(()=>t.classList.add("show","opacity-100"),10);const e=t.querySelector(".btn-close-modal");e&&(e.onclick=()=>{t.style.display="none",t.classList.remove("show","opacity-100")}),fl()}async function fl(){const t=document.getElementById("movements-container"),e=Array.from(q.filterEstablishmentIds);try{let a=[];if((q.data.estoque||[]).slice(0,15).forEach(i=>{Math.random()>.4&&a.push({date:new Date(Date.now()-Math.random()*864e6).toISOString(),productName:i.name,type:Math.random()>.4?"out":"in",quantity:Math.floor(Math.random()*5)+1,reason:Math.random()>.5?"Venda PDV / Atendimento":"Ajuste Manual / Compra"})}),a.length===0){t.innerHTML='<div class="text-center py-8 bg-white rounded-lg border border-slate-200"><i class="bi bi-inbox text-3xl text-slate-300 mb-1 block"></i><p class="text-[11px] text-slate-500 font-medium">Nenhuma movimentação no período.</p></div>';return}a.sort((s,i)=>new Date(i.date)-new Date(s.date)),t.innerHTML=`
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
                                <td class="py-2 px-3 text-slate-600 whitespace-nowrap text-[11px]">${Me(s.date)} <span class="text-[9px] text-slate-400 ml-1">${new Date(s.date).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</span></td>
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
        `}catch(a){console.error("Erro ao carregar movimentações:",a),t.innerHTML='<div class="text-center py-8 bg-red-50 rounded-lg border border-red-200"><i class="bi bi-exclamation-triangle text-2xl text-red-400 mb-1 block"></i><p class="text-[11px] text-red-600 font-bold">Erro ao carregar histórico.</p></div>'}}function xl(){zt&&os.removeEventListener("click",zt),zt=t=>{const e=t.target,a=e.closest(".tab-btn");if(a){document.querySelectorAll(".tab-btn").forEach(o=>{o.classList.remove("active","bg-indigo-600","text-white","shadow-md","border-transparent"),o.classList.add("bg-slate-50","text-slate-600","border-slate-200","hover:bg-slate-100")}),a.classList.remove("bg-slate-50","text-slate-600","border-slate-200","hover:bg-slate-100"),a.classList.add("active","bg-indigo-600","text-white","shadow-md","border-transparent"),q.currentTab=a.dataset.tab,q.drillDownMonth=null,vt();return}if(e.closest("#btn-historico-movimentacoes")){gl();return}const i=e.closest("button[data-action]");if(i){const o=i.dataset.action;if(o==="apply-filters")q.startDate=document.getElementById("report-start").value,q.endDate=document.getElementById("report-end").value,q.drillDownMonth=null,vt();else if(o==="preset-date"){const r=i.dataset.preset,n=new Date;let l,d;r==="month"?(l=new Date(n.getFullYear(),n.getMonth(),1),d=new Date(n.getFullYear(),n.getMonth()+1,0)):r==="last_month"?(l=new Date(n.getFullYear(),n.getMonth()-1,1),d=new Date(n.getFullYear(),n.getMonth(),0)):r==="year"&&(l=new Date(n.getFullYear(),0,1),d=new Date(n.getFullYear(),11,31)),document.getElementById("report-start").value=l.toISOString().split("T")[0],document.getElementById("report-end").value=d.toISOString().split("T")[0],document.querySelectorAll("[data-preset]").forEach(u=>{u.classList.remove("bg-white","text-indigo-600","shadow-sm","border","border-slate-200"),u.classList.add("text-slate-500")}),i.classList.remove("text-slate-500"),i.classList.add("bg-white","text-indigo-600","shadow-sm","border","border-slate-200"),q.startDate=l.toISOString().split("T")[0],q.endDate=d.toISOString().split("T")[0],q.drillDownMonth=null,vt()}else o==="export-excel"&&hl()}},os.addEventListener("click",zt),document.querySelectorAll(".est-filter-checkbox").forEach(t=>{t.addEventListener("change",e=>{const a=e.target.closest("label");e.target.checked?(q.filterEstablishmentIds.add(e.target.value),a.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50","text-indigo-700"),a.classList.remove("border-slate-200","text-slate-600")):(q.filterEstablishmentIds.delete(e.target.value),a.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50","text-indigo-700"),a.classList.add("border-slate-200","text-slate-600")),q.drillDownMonth=null,vt()})})}function hl(){if(typeof XLSX>"u"){g("Erro","A biblioteca XLSX não está disponível.","error");return}const{currentTab:t,data:e,startDate:a,endDate:s}=q;let i=[],o=`Relatorio_${t.toUpperCase()}_${a}_a_${s}.xlsx`;if(t==="financeiro"){if(!e.financeiro||!e.financeiro.payables.length&&!e.financeiro.receivables.length)return g("Aviso","Sem dados financeiros para exportar.","info");const r=new Map(q.establishments.map(d=>[d.id,d.name])),n=new Map(e.financeiro.natures.map(d=>[d.id,d.name]));i=[...e.financeiro.receivables.filter(d=>d.status==="paid").map(d=>({...d,tipo:"Receita"})),...e.financeiro.payables.filter(d=>d.status==="paid").map(d=>({...d,tipo:"Despesa"}))].map(d=>({Unidade:r.get(d.establishmentId)||"Atual","Data Pagamento":d.paymentDate?Me(d.paymentDate):"-",Tipo:d.tipo,Descrição:d.description||"-","Natureza (DRE)":d.naturezaId?n.get(d.naturezaId)||"Outros":"Geral","Valor (R$)":d.amount||0}))}else if(t==="agenda"){if(!e.agenda||e.agenda.active.length===0)return g("Aviso","Sem dados de agenda.","info");i=e.agenda.active.map(r=>({Data:r.startTime?Me(r.startTime):"-",Cliente:r.clientName||"Sem nome",Profissional:r.professionalName||"-",Status:r.status,"Valor Faturado (R$)":r.totalAmount||0}))}else if(t==="clientes"){if(!e.clientes||e.clientes.length===0)return g("Aviso","Sem dados de clientes.","info");i=e.clientes.map(r=>({"Data de Cadastro":r.createdAt?Me(r.createdAt):"-",Nome:r.name||"-",Telefone:r.phone||"-","E-mail":r.email||"-","Última Visita":r.lastVisit?Me(r.lastVisit):"-"}))}else if(t==="vendas"){if(!e.vendas||e.vendas.length===0)return g("Aviso","Sem dados de vendas.","info");i=e.vendas.map(r=>({"ID Venda":r.id||"-",Data:r.createdAt?Me(r.createdAt):"-",Status:r.status||"-","Qtd Itens":(r.items||[]).length,"Faturamento (R$)":r.totalAmount||0}))}else if(t==="estoque"){if(!e.estoque||e.estoque.length===0)return g("Aviso","Sem dados de estoque.","info");i=e.estoque.map(r=>({Produto:r.name||"-","Código/SKU":r.sku||"-","Estoque Atual":r.currentStock||0,"Estoque Mínimo":r.minStock||0,"Preço Venda (R$)":r.price||0,Alerta:r.currentStock<=0?"Esgotado":r.currentStock<=r.minStock?"Baixo":"OK"}))}if(i.length===0)return g("Aviso","Nenhum dado válido para exportar.","info");try{const r=XLSX.utils.json_to_sheet(i),n=XLSX.utils.book_new();XLSX.utils.book_append_sheet(n,r,t.toUpperCase()),XLSX.writeFile(n,o)}catch(r){console.error("Erro na exportação Excel: ",r),g("Erro","Falha ao gerar o ficheiro Excel.","error")}}const Ha=(t,e="products")=>C(`/api/${e}/categories/${t}`),ci=(t,e="products")=>C(`/api/${e}/categories`,{method:"POST",body:JSON.stringify(t)}),ui=(t,e="products")=>C(`/api/${e}/categories/${t}`,{method:"DELETE"}),vl="audit_logs",re=async(t,e,a,s,i,o=null)=>{try{if(!e)return;await Co(Ca(xe,vl),{establishmentId:t,userId:e.uid,userName:e.name||e.email||"Utilizador",module:a,action:s,description:i,details:o,timestamp:new Date})}catch(r){console.error("Falha silenciosa ao registar log:",r)}},ns=document.getElementById("content");let _={services:null,professionals:[],categories:[],hierarchyCache:[],statusFilter:"all",searchQuery:"",filterCategoryId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set,tempService:null},_t=null,Vt=null;function it(){const t=we.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function pi(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[f.establishmentId]}function yl(){const t=document.getElementById("services-layout-detail"),e=document.getElementById("service-modal-inner");t&&e&&(t.classList.remove("hidden"),t.classList.add("flex"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("scale-95","translate-y-4"),e.classList.add("scale-100","translate-y-0")},10),document.body.style.overflow="hidden")}function Ut(){const t=document.getElementById("services-layout-detail"),e=document.getElementById("service-modal-inner");t&&e&&(t.classList.add("opacity-0"),e.classList.remove("scale-100","translate-y-0"),e.classList.add("scale-95","translate-y-4"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.body.style.overflow=""},300)),_.tempService=null}async function wl(){_.selectedIds.clear(),_.services=null;try{const t=await ke();_.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}kl(),Tl(),await ct()}function kl(){ns.innerHTML=`
        <div class="h-full flex w-full relative overflow-hidden bg-slate-50">
            <section id="services-layout-main" class="flex-1 flex flex-col p-4 md:pl-6 md:pr-6 md:pt-6 w-full relative overflow-y-auto custom-scrollbar">
                
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

                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 animate-fade-in w-full">
                    <div class="relative w-full md:w-96 flex-shrink-0">
                        <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input type="text" id="searchInput" value="${_.searchQuery}" placeholder="Pesquisar serviço..." class="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-sm font-semibold text-slate-700">
                    </div>
                    
                    <div class="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
                        <button data-action="manage-categories" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95">
                            <i class="bi bi-tags text-base"></i> Categorias
                        </button>
                        <button id="toggle-filter-btn" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95 ${_.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                            <i class="bi bi-funnel text-base"></i> Filtros
                        </button>
                        <button data-action="open-service-editor" data-id="" class="py-2.5 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-500/30 flex items-center justify-center gap-2 text-xs active:scale-95 uppercase tracking-wider border border-indigo-500 col-span-2 md:col-span-1">
                            <i class="bi bi-plus-lg text-base"></i> Novo Serviço
                        </button>
                    </div>
                </div>

                <div id="filter-panel" class="${_.isAdvancedFilterOpen?"block":"hidden"} mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
                    <div class="flex flex-col md:flex-row items-end gap-3">
                        <div class="w-full md:w-64">
                            <label class="block text-[9px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Categoria</label>
                            <select id="filterCategoryId" class="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-colors">
                                <option value="all">Todas as categorias</option>
                            </select>
                        </div>
                        <div class="flex gap-2 w-full md:w-auto">
                            <button id="clear-filters-btn" class="w-full md:w-auto px-5 py-2.5 bg-slate-100 text-slate-700 font-black rounded-lg hover:bg-slate-200 transition-colors text-xs uppercase tracking-wider border border-slate-200">Limpar</button>
                            <button id="apply-filter-btn" class="w-full md:w-auto px-6 py-2.5 bg-indigo-600 text-white font-black rounded-lg shadow-md hover:bg-indigo-700 active:scale-95 transition-all text-xs uppercase tracking-wider">Aplicar</button>
                        </div>
                    </div>
                </div>

                <div id="summary-section" class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 animate-fade-in w-full"></div>

                <div class="flex gap-2 overflow-x-auto pb-2 w-full custom-scrollbar mb-2 animate-fade-in flex-shrink-0">
                    <button data-status="all" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${_.statusFilter==="all"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Todos</button>
                    <button data-status="active" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${_.statusFilter==="active"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Ativos</button>
                    <button data-status="inactive" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${_.statusFilter==="inactive"?"bg-red-600 text-white border-red-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Inativos</button>
                </div>

                <div id="servicesList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                    ${mi(8)}
                </div>
            </section>
        </div>

        <div id="services-layout-detail" class="hidden fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="service-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-4xl flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
                </div>
        </div>
    `}async function ct(){const t=document.getElementById("servicesList"),e=pi();try{const a=e.map(c=>Ue(c)),s=e.map(c=>De(c)),i=e.map(c=>Ha(c,"services")),o=await Promise.all(a),r=await Promise.all(s),n=await Promise.all(i),l=new Map;o.flat().filter(Boolean).forEach(c=>l.set(c.id,c)),_.services=Array.from(l.values()),f.services=_.services;const d=new Map;r.flat().filter(Boolean).forEach(c=>d.set(c.id,c)),_.professionals=Array.from(d.values()),f.professionals=_.professionals;const u=new Map;n.flat().filter(Boolean).forEach(c=>u.set(c.id,c)),_.categories=Array.from(u.values()),f.serviceCategories=_.categories,Sl(),yt()}catch(a){console.error(a),t&&(t.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>')}}function Sl(){const t=document.getElementById("filterCategoryId");t&&_.categories&&(t.innerHTML='<option value="all">Todas as categorias</option>',_.categories.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=v(e.name),_.filterCategoryId===e.id&&(a.selected=!0),t.appendChild(a)}))}function bi(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=_.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function Il(t){const e=document.getElementById("summary-section");if(!e)return;const a=t.length,s=t.filter(o=>o.active!==!1).length,i=a-s;e.innerHTML=`
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Serviços na Rede</span>
            <span class="text-base md:text-2xl font-black text-slate-800 mt-0.5 w-full truncate">${a}</span>
        </div>
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Ativos</span>
            <span class="text-base md:text-2xl font-black text-emerald-600 mt-0.5 w-full truncate">${s}</span>
        </div>
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Inativos</span>
            <span class="text-base md:text-2xl font-black text-red-500 mt-0.5 w-full truncate">${i}</span>
        </div>
        <div class="bg-indigo-50 p-2 md:p-4 rounded-xl border border-indigo-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-indigo-500 uppercase tracking-widest w-full truncate">Filtrados</span>
            <span class="text-base md:text-2xl font-black text-indigo-700 mt-0.5 w-full truncate">${t.length}</span>
        </div>
    `}function yt(){const t=document.getElementById("servicesList");if(!t)return;if(_.services===null){t.innerHTML=mi(8);return}const e=pi(),a=_.services.filter(i=>{const o=i.name.toLowerCase().includes(_.searchQuery);let r=!0;_.statusFilter==="active"&&(r=i.active!==!1),_.statusFilter==="inactive"&&(r=i.active===!1);const n=_.filterCategoryId==="all"||i.categoryId===_.filterCategoryId,l=i.accessibleIn&&i.accessibleIn.length>0?i.accessibleIn:[i.establishmentId||f.establishmentId],d=e.some(u=>l.includes(u));return o&&r&&n&&d});if(Il(a),a.length===0){_.services.length===0?t.innerHTML=`
                <div class="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
                    <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 border border-indigo-100">
                        <i class="bi bi-scissors text-3xl text-indigo-400"></i>
                    </div>
                    <h3 class="text-base font-black text-slate-800 mb-1">Nenhum serviço cadastrado</h3>
                    <p class="text-xs text-slate-500 max-w-sm text-center font-medium mb-6">O seu portefólio está vazio. Adicione o seu primeiro serviço para poder agendar clientes!</p>
                    <button data-action="open-service-editor" data-id="" class="py-3 px-6 bg-indigo-600 text-white font-black rounded-xl shadow-md hover:bg-indigo-700 transition active:scale-95 uppercase tracking-wider text-xs flex items-center gap-2">
                        <i class="bi bi-plus-lg"></i> Criar Serviço
                    </button>
                </div>
            `:t.innerHTML=`
                <div class="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
                    <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                        <i class="bi bi-search text-2xl text-slate-300"></i>
                    </div>
                    <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhum resultado encontrado</h3>
                    <p class="text-[10px] text-slate-500 max-w-xs text-center font-medium">Tente ajustar os filtros ou limpar a barra de pesquisa.</p>
                    <button id="clear-filters-btn" class="mt-4 py-2 px-4 bg-slate-100 text-slate-600 font-bold rounded-lg border border-slate-200 text-[10px] uppercase tracking-wider hover:bg-slate-200 transition">Limpar Filtros</button>
                </div>
            `;return}const s=new Map((_.categories||[]).map(i=>[i.id,i.name]));t.innerHTML=a.map(i=>{const o=i.active===!1,r=v(i.name),n=v(s.get(i.categoryId)||"Sem Categoria"),l=i.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(i.name.charAt(0))}`,d=i.accessibleIn?i.accessibleIn.length:1,u=_.selectedIds.has(i.id),c=i.price!==void 0?parseFloat(i.price).toFixed(2):"0.00",p=i.color||"#4f46e5";return`
            <div class="service-card relative bg-white rounded-2xl border ${u?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-slate-200"} shadow-sm flex items-center p-3.5 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 active:scale-[0.98] ${o?"opacity-60 bg-slate-50":""}" 
                 data-action="open-service-editor" data-id="${i.id}">
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" data-action-stop-propagation="true">
                    <input type="checkbox" data-id="${i.id}" class="service-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${u?"checked":""}>
                </div>

                <div class="relative flex-shrink-0 mr-4">
                    <img src="${l}" alt="${r}" class="w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover shadow-sm" style="border-left: 3px solid ${p};">
                    <span class="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-2 border-white rounded-full ${o?"bg-red-500":"bg-emerald-500"}" title="${o?"Inativo":"Ativo"}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-6">
                    <h3 class="text-sm font-black text-slate-800 truncate leading-tight mb-0.5">
                        ${r}
                    </h3>
                    <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate mb-2">${n}</p>
                    
                    <div class="flex items-center justify-between mt-1">
                        <span class="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 shadow-sm">R$ ${c}</span>
                        <div class="flex gap-1.5">
                            <span class="text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200 flex items-center gap-1"><i class="bi bi-clock"></i> ${i.duration}m</span>
                            ${d>1?`<span class="text-[9px] font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded-md border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${d}</span>`:""}
                        </div>
                    </div>
                </div>
            </div>`}).join("")}function mi(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center p-3.5 animate-pulse h-[86px]">
            <div class="w-14 h-14 rounded-xl bg-slate-200 flex-shrink-0 mr-4"></div>
            <div class="flex-1 space-y-2">
                <div class="h-3 bg-slate-200 rounded w-3/4"></div>
                <div class="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}async function $l(t){t.preventDefault();const e=t.target.closest("#categoryForm"),a=e.querySelector("#categoryName"),s=a.value;if(!s)return;const i=e.querySelector('button[type="submit"]');i.disabled=!0,i.innerHTML='<i class="bi bi-hourglass-split"></i>...';try{const o=_.hierarchyCache.reduce((r,n)=>(r.push(n.id),n.branches&&n.branches.forEach(l=>r.push(l.id)),r),[]);o.length===0&&o.push(f.establishmentId),await ci({establishmentId:f.establishmentId,name:s,accessibleIn:o},"services"),re(f.establishmentId,it(),"Categorias (Serviços)","Criou",`Criou categoria: ${s}`),a.value="",g("Sucesso","Categoria criada!","success"),await Ts(),await ct()}catch(o){g("Erro",`Não foi possível criar a categoria: ${o.message}`,"error")}finally{i.disabled=!1,i.innerHTML='<i class="bi bi-plus-lg"></i>'}}async function El(t){if(await G("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await ui(t,"services"),re(f.establishmentId,it(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${t})`),g("Sucesso","Categoria apagada.","success"),await Ts(),await ct()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function Ts(){const t=document.getElementById("categoryList");if(t){t.innerHTML='<div class="loader mx-auto my-4 border-indigo-500"></div>';try{const e=await Ha(f.establishmentId,"services");_.categories=e,e.length>0?t.innerHTML=e.map(a=>`
                <div class="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 mb-2 shadow-sm">
                    <span class="text-xs font-black text-slate-700 uppercase tracking-widest">${v(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-white w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-600 rounded-lg transition-colors border border-red-100 active:scale-95"><i class="bi bi-trash3 pointer-events-none"></i></button>
                </div>`).join(""):t.innerHTML='<div class="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200"><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhuma categoria criada.</p></div>'}catch{t.innerHTML='<p class="text-red-500 text-center text-[10px] font-bold p-4 bg-red-50 rounded-xl">Erro ao carregar categorias.</p>'}}}function Ll(){Fe({title:"Categorias de Serviços",contentHTML:`
        <div class="space-y-4">
            <div class="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                <p class="text-[10px] text-indigo-800 mb-3 font-bold uppercase tracking-widest"><i class="bi bi-info-circle mr-1"></i> Categorias disponíveis para toda a rede.</p>
                <form id="categoryForm" class="flex gap-2 items-end">
                    <div class="flex-1 min-w-0">
                        <label for="categoryName" class="block text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-1 ml-1">Nome da Categoria</label>
                        <input type="text" id="categoryName" placeholder="Ex: Cabelo, Estética..." required class="w-full p-3 border border-indigo-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-bold bg-white shadow-inner">
                    </div>
                    <button type="submit" class="w-12 h-12 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md active:scale-95 flex items-center justify-center flex-shrink-0"><i class="bi bi-plus-lg"></i></button>
                </form>
            </div>
            <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 ml-1">Categorias Existentes</h4>
            <div id="categoryList" class="max-h-64 overflow-y-auto custom-scrollbar pr-1"></div>
        </div>
    `,maxWidth:"max-w-md"});const e=document.getElementById("genericModal");if(e){const a=e.querySelector("#categoryForm");a&&(a.addEventListener("submit",$l),e.addEventListener("click",s=>{const i=s.target.closest('button[data-action="delete-category"]');i&&(s.preventDefault(),El(i.dataset.id))}))}Ts()}function Cl(t=[]){if(!_.hierarchyCache||_.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${f.establishmentId}">
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 text-center">
                <i class="bi bi-info-circle text-2xl block mb-2 text-slate-400"></i> Exclusivo desta unidade.
            </div>`;let e='<div class="space-y-2 mt-1 max-h-48 overflow-y-auto custom-scrollbar pr-2">';return _.hierarchyCache.forEach(a=>{const s=t.includes(a.id)||t.length===0&&a.id===f.establishmentId;e+=`
            <label class="flex items-center space-x-3 p-3 cursor-pointer bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-colors shadow-sm">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-xs md:text-sm font-black text-slate-800">🏢 ${v(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(i=>{const o=t.includes(i.id)||t.length===0&&i.id===f.establishmentId;e+=`
                    <label class="flex items-center space-x-3 p-3 ml-8 cursor-pointer bg-white hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl transition-colors border-l-4 border-l-indigo-200 shadow-sm">
                        <input type="checkbox" name="accessibleIn" value="${i.id}" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                        <span class="text-xs font-bold text-slate-600">📍 ${v(i.name)}</span>
                    </label>
                `})}),e+="</div>",e}function Dl(t){_.viewMode="edit-service";const e=document.getElementById("service-modal-inner");if(!e)return;let a={name:"",active:!0,duration:30,price:0};if(t){const T=_.services?.find(A=>String(A.id)===String(t));T&&(a=JSON.parse(JSON.stringify(T)))}_.tempService=a;const s=!!a.id,i=_.categories||[],o=a.duration||30,r=a.bufferTime||0,n=v(a.name||""),l=v(a.notes||""),d=v(a.publicDescription||""),u=s?n:"Novo Serviço",c=a.color||"#4f46e5",p=a.loyaltyPoints||0,b=i.map(T=>`<option value="${T.id}" ${a.categoryId===T.id?"selected":""}>${v(T.name)}</option>`).join(""),m=a.photo||`https://placehold.co/150x150/E2E8F0/4A5568?text=${encodeURIComponent(n?n.charAt(0):"S")}`,x=`
        <div class="p-4 md:p-5 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition-colors active:scale-95 mr-4">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <div>
                <h3 class="font-black text-sm md:text-base text-slate-800 uppercase tracking-wider truncate leading-tight">${s?"Editar Serviço":"Novo Serviço"}</h3>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">${s?u:"Configuração de Catálogo"}</p>
            </div>
            ${s?`
                <button data-action="delete-service" data-id="${a.id}" class="ml-auto w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 border border-red-100 transition-colors active:scale-95" title="Excluir">
                    <i class="bi bi-trash3 text-base pointer-events-none"></i>
                </button>
            `:""}
        </div>
    `;e.innerHTML=`
        ${x}
        
        <div class="modal-tabs px-2 md:px-6 border-b flex items-center justify-between overflow-x-auto bg-slate-50 flex-shrink-0 custom-scrollbar shadow-sm">
            <button class="tab-link active whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors uppercase tracking-widest" data-tab="dados-basicos">1. Básicos</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="config-avancadas">2. Configurações</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="comissoes-servico">3. Comissões</button>
        </div>
        
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 p-3 md:p-6 relative"> 
            <form id="serviceForm" class="h-full w-full mx-auto max-w-4xl">
                <input type="hidden" id="serviceId" value="${a.id||""}">
                <input type="hidden" id="servicePhotoBase64" value="${a.photo||""}">
                
                <div id="dados-basicos" class="tab-content active space-y-4 md:space-y-6 animate-fade-in-fast">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div class="lg:col-span-1 space-y-4">
                            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col items-center">
                                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Imagem do Serviço</label>
                                <div class="relative group w-32 h-32 mb-5 cursor-pointer" id="servicePhotoContainer">
                                    <img id="servicePhotoPreview" src="${m}" alt="Foto" class="w-full h-full rounded-2xl object-cover border-4 border-slate-50 shadow-md transition-all group-hover:brightness-75">
                                    <div id="servicePhotoButtonOverlay" class="absolute inset-0 flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                        <i class="bi bi-camera-fill text-white text-3xl drop-shadow-md"></i>
                                    </div>
                                </div>
                                <input type="file" id="servicePhotoInput" class="hidden" accept="image/*">
                                <button type="button" id="servicePhotoButton" class="text-indigo-600 text-[10px] font-black uppercase tracking-wider hover:text-indigo-800 transition-colors w-full bg-indigo-50 py-2.5 rounded-xl border border-indigo-100 shadow-sm active:scale-95">Alterar Imagem</button>
                            </div>

                            <div class="bg-slate-100 p-5 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
                                <label for="serviceColor" class="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-3 text-center">Cor na Agenda</label>
                                <div class="flex items-center justify-center w-full">
                                    <input type="color" id="serviceColor" value="${c}" class="w-full h-12 p-1 border border-slate-300 rounded-xl cursor-pointer bg-white shadow-inner">
                                </div>
                                <p class="text-[9px] font-bold text-slate-400 text-center mt-3">Identificação visual nos agendamentos.</p>
                            </div>
                        </div>

                        <div class="lg:col-span-2 space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div class="form-group sm:col-span-2">
                                    <label for="serviceName" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome do Serviço *</label>
                                    <input type="text" id="serviceName" value="${n}" required placeholder="Ex: Corte Masculino Degradê" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors text-base font-black text-slate-800 shadow-inner">
                                </div>
                                
                                <div class="form-group">
                                    <label for="servicePrice" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Preço (R$) *</label>
                                    <input type="number" id="servicePrice" step="0.01" value="${a.price!==void 0?a.price:""}" required placeholder="0.00" class="w-full p-3.5 border border-emerald-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50/30 focus:bg-white transition-colors font-black text-emerald-700 shadow-inner">
                                </div>
                                
                                <div class="form-group">
                                    <label for="serviceCategory" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Categoria</label>
                                    <select id="serviceCategory" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner cursor-pointer">
                                        <option value="">Sem Categoria</option>
                                        ${b}
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="serviceDurationMinutes" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Duração Média (min) *</label>
                                    <input type="number" id="serviceDurationMinutes" min="0" value="${o}" required placeholder="Ex: 45" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner">
                                </div>
                                
                                <div class="form-group">
                                    <label for="serviceBufferTimeMinutes" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="Tempo necessário para limpar/preparar entre clientes">Pausa Pós-Serviço (min)</label>
                                    <input type="number" id="serviceBufferTimeMinutes" min="0" value="${r}" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner" placeholder="Ex: 10 (limpeza)">
                                </div>
                            </div>
                            
                            <div class="pt-4 border-t border-slate-100 mt-2">
                                <label class="block text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-1.5 ml-1 flex items-center gap-2"><i class="bi bi-diagram-3 text-sm"></i> Lojas que oferecem este serviço</label>
                                ${Cl(a.accessibleIn||[])}
                            </div>
                        </div>
                    </div>
                </div>

                <div id="config-avancadas" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4 flex items-center gap-2"><i class="bi bi-sliders text-indigo-500 text-lg"></i> Definições de Atendimento</h3>
                            
                            <div class="form-group">
                                <label for="serviceAudience" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Público-Alvo</label>
                                <select id="serviceAudience" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner cursor-pointer">
                                    <option value="todos" ${a.targetAudience==="todos"?"selected":""}>Todos (Unissex)</option>
                                    <option value="feminino" ${a.targetAudience==="feminino"?"selected":""}>Feminino</option>
                                    <option value="masculino" ${a.targetAudience==="masculino"?"selected":""}>Masculino</option>
                                    <option value="infantil" ${a.targetAudience==="infantil"?"selected":""}>Infantil</option>
                                </select>
                            </div>

                            <div class="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex items-center justify-between">
                                <div>
                                    <p class="text-xs font-black text-indigo-900 uppercase tracking-wider mb-0.5">Atende a domicílio?</p>
                                    <p class="text-[9px] font-bold text-indigo-700 leading-tight">Cliente pode pedir atendimento externo.</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer ml-3">
                                    <input type="checkbox" id="serviceHomeToggle" class="sr-only peer" ${a.homeService?"checked":""}>
                                    <div class="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                                </label>
                            </div>

                            <div class="form-group pt-2 border-t border-slate-100">
                                <label for="serviceNotes" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Observações Internas (Só Gestão)</label>
                                <textarea id="serviceNotes" rows="4" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors placeholder-slate-400 font-medium text-sm text-slate-700 shadow-inner resize-none" placeholder="Detalhes técnicos, custo de produtos, etc...">${l}</textarea>
                            </div>
                        </div>

                        <div class="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4 flex items-center gap-2"><i class="bi bi-phone text-indigo-500 text-lg"></i> Exibição no Aplicativo/Link</h3>

                            <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center justify-between">
                                <div>
                                    <p class="text-xs font-black text-emerald-900 uppercase tracking-wider mb-0.5">Visível no App / Online</p>
                                    <p class="text-[9px] font-bold text-emerald-700 leading-tight">Permitir agendamento público deste serviço.</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer ml-3">
                                    <input type="checkbox" id="serviceStatusToggle" class="sr-only peer" ${a.active!==!1?"checked":""}>
                                    <div class="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
                                </label>
                            </div>

                            <div class="form-group">
                                <label for="serviceLoyaltyPoints" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Pontos de Fidelidade Ganhos</label>
                                <div class="flex items-center shadow-inner rounded-xl overflow-hidden border border-amber-300 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500 bg-amber-50/30">
                                    <input type="number" id="serviceLoyaltyPoints" min="0" value="${p}" class="w-full p-3.5 bg-transparent outline-none font-black text-amber-700" placeholder="0">
                                    <span class="bg-amber-100 px-5 py-3.5 text-[10px] uppercase tracking-widest font-black text-amber-700 border-l border-amber-200">PTS</span>
                                </div>
                            </div>

                            <div class="form-group border-t border-slate-100 pt-4">
                                <label for="servicePublicDescription" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Descrição Pública para o Cliente</label>
                                <textarea id="servicePublicDescription" rows="4" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors placeholder-slate-400 font-medium text-sm text-slate-700 shadow-inner resize-none" placeholder="Ex: Tratamento reconstrutor capilar feito com produtos premium...">${d}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="comissoes-servico" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    <div class="max-w-2xl mx-auto bg-white p-5 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <div class="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 mb-6">
                            <label class="block text-sm font-black text-indigo-900 uppercase tracking-wider mb-1.5 flex items-center gap-2"><i class="bi bi-percent text-lg"></i> Regras de Comissão</label>
                            <p class="text-[10px] font-bold text-indigo-700 uppercase tracking-widest mb-4">Defina como a equipa é remunerada ao executar este serviço.</p>
                            
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                <label class="flex items-center p-3.5 border border-indigo-200 bg-white rounded-xl cursor-pointer hover:border-indigo-400 hover:shadow-sm transition-all">
                                    <input type="radio" name="commissionType" value="default" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500" ${a.commissionType!=="custom"?"checked":""}>
                                    <span class="ml-3 text-xs font-black text-slate-700 uppercase tracking-wider">Taxa Padrão Geral</span>
                                </label>
                                <label class="flex items-center p-3.5 border border-indigo-200 bg-white rounded-xl cursor-pointer hover:border-indigo-400 hover:shadow-sm transition-all">
                                    <input type="radio" name="commissionType" value="custom" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500" ${a.commissionType==="custom"?"checked":""}>
                                    <span class="ml-3 text-xs font-black text-slate-700 uppercase tracking-wider">Personalizada (Por Prof.)</span>
                                </label>
                            </div>
                        </div>

                        <div id="defaultCommissionRateContainer" class="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner text-center animate-fade-in">
                            <label for="serviceCommissionRate" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Qual a taxa de comissão padrão do serviço?</label>
                            <div class="flex items-center justify-center gap-3">
                                <input type="number" id="serviceCommissionRate" value="${a.commissionRate||0}" step="0.1" class="w-32 p-3 text-2xl font-black text-center border border-indigo-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-indigo-700 shadow-sm">
                                <span class="text-3xl font-black text-slate-300">%</span>
                            </div>
                        </div>
                        
                        <div id="professionalCommissionsContainer" class="hidden animate-fade-in mt-6">
                            <div class="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                                <div class="grid grid-cols-[1fr_auto] items-center p-4 bg-slate-50 font-black text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-200">
                                    <span>Profissional Habilitado</span>
                                    <span class="text-center w-24">Taxa (%)</span>
                                </div>
                                <div id="professionalCommissionsList" class="space-y-1.5 max-h-[350px] overflow-y-auto p-3 custom-scrollbar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        
        <footer class="p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] w-full flex-shrink-0 z-50 flex gap-3 justify-end rounded-b-3xl">
            <button type="button" data-action="close-detail-screen" class="hidden md:block py-3 px-6 bg-slate-100 border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors shadow-sm active:scale-95">Cancelar</button>
            <button type="button" data-action="save-service" class="w-full md:w-auto md:px-8 py-3 bg-indigo-600 text-white font-black text-xs md:text-sm rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider border border-indigo-600">
                <i class="bi bi-save2 text-lg pointer-events-none"></i> Salvar Perfil
            </button>
        </footer>
    `,e.querySelectorAll(".tab-link").forEach(T=>{T.addEventListener("click",A=>{A.preventDefault(),e.querySelectorAll(".tab-link").forEach(N=>{N.classList.remove("active","border-indigo-600","text-indigo-600"),N.classList.add("border-transparent","text-slate-400")}),T.classList.add("active","border-indigo-600","text-indigo-600"),T.classList.remove("border-transparent","text-slate-400"),e.querySelectorAll(".tab-content").forEach(N=>N.classList.add("hidden")),e.querySelector("#"+T.dataset.tab).classList.remove("hidden")})});const y=e.querySelectorAll('input[name="commissionType"]'),S=e.querySelector("#defaultCommissionRateContainer"),L=e.querySelector("#professionalCommissionsContainer");function D(){const T=e.querySelector('input[name="commissionType"]:checked').value;S&&(S.style.display=T==="default"?"block":"none"),L&&(L.style.display=T==="custom"?"block":"none")}y.forEach(T=>T.addEventListener("change",D));const k=e.querySelector("#professionalCommissionsList");k&&(k.innerHTML=(_.professionals||[]).map(T=>{const A=a.professionalCommissions?.[T.id]!==void 0,N=a.professionalCommissions?.[T.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:bg-slate-50 transition-colors ${A?"bg-indigo-50/50 border-indigo-100 shadow-sm":""}" data-prof-id="${T.id}">
                    <label class="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                        <input type="checkbox" ${A?"checked":""} class="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 shadow-sm cursor-pointer">
                        <img src="${T.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${v(T.name.charAt(0))}`}" class="w-10 h-10 rounded-full object-cover border border-white shadow-sm flex-shrink-0">
                        <span class="text-xs font-black text-slate-800 truncate uppercase tracking-widest">${v(T.name)}</span>
                    </label>
                    <div class="flex items-center gap-1.5 ml-3">
                        <input type="number" value="${N}" step="0.1" class="w-20 p-2 border border-slate-300 rounded-lg text-sm font-bold text-center outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-inner transition-shadow" ${A?"":"disabled"}>
                        <span class="text-[10px] font-black text-slate-400">%</span>
                    </div>
                </div>
            `}).join(""),k.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.addEventListener("change",A=>{const N=A.target.closest(".professional-commission-row"),K=N.querySelector('input[type="number"]');K.disabled=!A.target.checked,N.classList.toggle("bg-indigo-50/50",A.target.checked),N.classList.toggle("border-indigo-100",A.target.checked),N.classList.toggle("shadow-sm",A.target.checked),N.classList.toggle("border-transparent",!A.target.checked),A.target.checked&&K.focus()})})),D();const I=e.querySelector("#servicePhotoInput"),M=e.querySelector("#servicePhotoButton"),V=e.querySelector("#servicePhotoContainer"),P=e.querySelector("#servicePhotoPreview"),z=e.querySelector("#servicePhotoBase64"),O=()=>I.click();M&&M.addEventListener("click",O),V&&V.addEventListener("click",O),I.onchange=async()=>{const T=I.files[0];if(T){P.src="https://placehold.co/150x150/E2E8F0/4A5568?text=...";try{const A=await Da(T,800,800,.8);if(A.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");P.src=A,z.value=A}catch(A){g("Erro de Imagem",A.message,"error"),P.src=m,z.value=a.photo||""}}},yl()}function Pl(){G("Excluir em Lote",`Tem certeza que deseja excluir ${_.selectedIds.size} serviços da rede? Esta ação não pode ser desfeita.`).then(async t=>{if(t)try{const e=Array.from(_.selectedIds).map(a=>Yo(a));await Promise.all(e),re(f.establishmentId,it(),"Serviços","Excluiu em Lote",`Excluiu ${_.selectedIds.size} serviços`),g("Sucesso",`${_.selectedIds.size} serviços foram excluídos.`,"success"),_.selectedIds.clear(),bi(),ct()}catch(e){g("Erro",`Não foi possível excluir em lote: ${e.message}`,"error")}})}function Tl(){_t&&document.body.removeEventListener("click",_t),Vt&&ns.removeEventListener("input",Vt),_t=async t=>{if(t.target.classList.contains("service-checkbox")){const o=t.target.dataset.id;t.target.checked?_.selectedIds.add(o):_.selectedIds.delete(o),bi(),t.stopPropagation();return}const e=t.target.closest(".status-filter-btn");if(e){_.statusFilter=e.dataset.status,document.querySelectorAll(".status-filter-btn").forEach(o=>{o.classList.remove("bg-indigo-600","text-white","border-indigo-600","bg-red-600","border-red-600"),o.classList.add("bg-white","text-slate-600","border-slate-200")}),_.statusFilter==="inactive"?(e.classList.remove("bg-white","text-slate-600","border-slate-200"),e.classList.add("bg-red-600","text-white","border-red-600")):(e.classList.remove("bg-white","text-slate-600","border-slate-200"),e.classList.add("bg-indigo-600","text-white","border-indigo-600")),yt();return}if(t.target.id==="clear-filters-btn"){t.preventDefault(),document.getElementById("filterCategoryId").value="all",_.filterCategoryId="all",yt();return}if(t.target.id==="apply-filter-btn"){t.preventDefault(),_.filterCategoryId=document.getElementById("filterCategoryId").value,yt();return}const a=t.target.closest("#toggle-filter-btn");if(a){t.preventDefault(),_.isAdvancedFilterOpen=!_.isAdvancedFilterOpen;const o=document.getElementById("filter-panel");_.isAdvancedFilterOpen?(o.classList.remove("hidden"),o.classList.add("block"),a.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.remove("bg-white","text-slate-700","border-slate-200")):(o.classList.add("hidden"),o.classList.remove("block"),a.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.add("bg-white","text-slate-700","border-slate-200"));return}if(t.target.id==="services-layout-detail"){Ut();return}const s=t.target.closest("[data-action]");if(!s)return;const i=s.dataset.action;switch(["close-detail-screen","delete-service","save-service","manage-categories","open-service-editor","batch-delete"].includes(i)&&t.stopPropagation(),i){case"manage-categories":Ll();break;case"open-service-editor":Dl(s.dataset.id);break;case"close-detail-screen":Ut();break;case"batch-delete":Pl();break;case"delete-service":{const o=s.dataset.id;if(!o)return;if(await G("Apagar Serviço","Tem certeza que deseja excluir este serviço da rede?"))try{const n=_.services.find(l=>l.id===o)?.name||"Desconhecido";await Yo(o),re(f.establishmentId,it(),"Serviços","Excluiu",`Excluiu o serviço: ${n}`),g("Sucesso","Serviço apagado da rede.","success"),Ut(),await ct()}catch(n){g("Erro",`Não foi possível apagar o serviço: ${n.message}`,"error")}break}case"save-service":{t.preventDefault();const o=document.getElementById("serviceForm");if(!o.reportValidity())return;const r=s,n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{const l=o.querySelector("#serviceId").value,d=o.querySelector('input[name="commissionType"]:checked').value,u={};d==="custom"&&o.querySelectorAll(".professional-commission-row").forEach(m=>{const x=m.dataset.profId;if(m.querySelector('input[type="checkbox"]').checked){const S=parseFloat(m.querySelector('input[type="number"]').value);u[x]=isNaN(S)?0:S}});const c=Array.from(o.querySelectorAll('input[name="accessibleIn"]:checked')).map(m=>m.value),p=c.length>0?c:[f.establishmentId],b={..._.tempService,establishmentId:f.establishmentId,accessibleIn:p,name:o.querySelector("#serviceName").value.trim(),price:parseFloat(o.querySelector("#servicePrice").value),duration:parseInt(o.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(o.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:o.querySelector("#serviceCategory").value||null,color:o.querySelector("#serviceColor").value,targetAudience:o.querySelector("#serviceAudience").value,loyaltyPoints:parseInt(o.querySelector("#serviceLoyaltyPoints").value,10)||0,publicDescription:o.querySelector("#servicePublicDescription").value.trim(),homeService:o.querySelector("#serviceHomeToggle").checked,commissionRate:parseFloat(o.querySelector("#serviceCommissionRate").value)||0,active:o.querySelector("#serviceStatusToggle").checked,photo:o.querySelector("#servicePhotoBase64").value,notes:o.querySelector("#serviceNotes").value,commissionType:d,professionalCommissions:u};l?(await fn(l,b),re(f.establishmentId,it(),"Serviços","Editou",`Editou o serviço: ${b.name}`),g("Sucesso","Serviço atualizado com sucesso!","success")):(delete b.id,await gn(b),re(f.establishmentId,it(),"Serviços","Criou",`Criou novo serviço: ${b.name}`),g("Sucesso","Serviço adicionado à rede!","success")),Ut(),await ct()}catch(l){g("Erro",l.message,"error"),r.disabled=!1,r.innerHTML=n}break}}},document.body.addEventListener("click",_t),Vt=t=>{t.target.id==="searchInput"&&(_.searchQuery=t.target.value,yt())},ns.addEventListener("input",Vt)}const Oa="suppliers",qt=async t=>{try{const e=Do(Ca(xe,Oa),Po("establishmentId","==",t)),a=await Ki(e),s=[];return a.forEach(i=>{s.push({id:i.id,...i.data()})}),s}catch(e){throw console.error("Erro ao buscar fornecedores:",e),e}},Ml=async t=>{try{return{id:(await Co(Ca(xe,Oa),t)).id,...t}}catch(e){throw console.error("Erro ao criar fornecedor:",e),e}},Bl=async(t,e)=>{try{const a=qe(xe,Oa,t);return await At(a,e),{id:t,...e}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},Al=async t=>{try{const e=qe(xe,Oa,t);return await er(e),!0}catch(e){throw console.error("Erro ao excluir fornecedor:",e),e}},ls=document.getElementById("content");let E={products:null,categories:[],suppliers:[],hierarchyCache:[],allMovements:[],currentTab:"catalogo",stockFilter:"all",searchQuery:"",filterCategoryId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set,selectedMovementIds:new Set,tempProduct:null,tempSupplierIds:new Set},Wt=null,Jt=null;function _e(){const t=we.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function Ms(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[f.establishmentId]}function Wa(t){return t?t._seconds?new Date(t._seconds*1e3):t.seconds?new Date(t.seconds*1e3):new Date(t):new Date}function jl(){const t=document.getElementById("products-layout-detail"),e=document.getElementById("product-modal-inner");t&&e&&(t.classList.remove("hidden"),t.classList.add("flex"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("scale-95","translate-y-4"),e.classList.add("scale-100","translate-y-0")},10),document.body.style.overflow="hidden")}function la(){const t=document.getElementById("products-layout-detail"),e=document.getElementById("product-modal-inner");t&&e&&(t.classList.add("opacity-0"),e.classList.remove("scale-100","translate-y-0"),e.classList.add("scale-95","translate-y-4"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.body.style.overflow=""},300)),E.tempProduct=null,E.tempSupplierIds.clear()}function ql(){const t=document.getElementById("movement-layout-detail"),e=document.getElementById("movement-modal-inner");t&&e&&(t.classList.remove("hidden"),t.classList.add("flex"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("scale-95","translate-y-4"),e.classList.add("scale-100","translate-y-0")},10),document.body.style.overflow="hidden")}function ds(){const t=document.getElementById("movement-layout-detail"),e=document.getElementById("movement-modal-inner");t&&e&&(t.classList.add("opacity-0"),e.classList.remove("scale-100","translate-y-0"),e.classList.add("scale-95","translate-y-4"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.body.style.overflow=""},300))}async function Nl(){E.selectedIds.clear(),E.selectedMovementIds.clear(),E.currentTab="catalogo",E.products=null;try{const t=await ke();E.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}gi(),Gl(),await Le()}function gi(){ls.innerHTML=`
        <div class="h-full flex w-full relative overflow-hidden bg-slate-50">
            <section class="flex-1 flex flex-col p-4 md:pl-6 md:pr-6 md:pt-6 w-full relative overflow-y-auto custom-scrollbar">
                
                <div class="mb-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-shrink-0 animate-fade-in-down">
                    <nav class="flex overflow-x-auto custom-scrollbar">
                        <button data-main-tab="catalogo" class="flex-1 py-4 px-6 text-xs md:text-sm font-black border-b-2 transition-colors whitespace-nowrap uppercase tracking-widest ${E.currentTab==="catalogo"?"border-indigo-600 text-indigo-600 bg-indigo-50/50":"border-transparent text-slate-500 hover:text-indigo-500 hover:bg-slate-50"}">
                            <i class="bi bi-box-seam mr-2"></i> Catálogo de Produtos
                        </button>
                        <button data-main-tab="movimentacoes" class="flex-1 py-4 px-6 text-xs md:text-sm font-black border-b-2 transition-colors whitespace-nowrap uppercase tracking-widest ${E.currentTab==="movimentacoes"?"border-indigo-600 text-indigo-600 bg-indigo-50/50":"border-transparent text-slate-500 hover:text-indigo-500 hover:bg-slate-50"}">
                            <i class="bi bi-arrow-left-right mr-2"></i> Estoque & Movimentações
                        </button>
                    </nav>
                </div>

                <div id="main-tab-content" class="flex-1 flex flex-col min-h-0 relative"></div>
            </section>
        </div>

        <div id="products-layout-detail" class="hidden fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="product-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-4xl flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
            </div>
        </div>

        <div id="movement-layout-detail" class="hidden fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="movement-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-lg flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
            </div>
        </div>
    `,Fl()}function Fl(){const t=document.getElementById("main-tab-content");if(t){if(E.currentTab==="catalogo")t.innerHTML=`
            <div id="batch-action-bar" class="hidden absolute top-0 left-0 right-0 z-30 bg-slate-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down mb-4">
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

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 animate-fade-in w-full">
                <div class="relative w-full md:w-96 flex-shrink-0">
                    <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input type="text" id="searchInput" value="${E.searchQuery}" placeholder="Pesquisar produto, código..." class="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-sm font-semibold text-slate-700">
                </div>
                
                <div class="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
                    <button data-action="manage-categories" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95">
                        <i class="bi bi-tags text-base"></i> Categorias
                    </button>
                    <button id="toggle-filter-btn" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95 ${E.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                        <i class="bi bi-funnel text-base"></i> Filtros
                    </button>
                    <button data-action="open-product-editor" data-id="" class="py-2.5 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-500/30 flex items-center justify-center gap-2 text-xs active:scale-95 uppercase tracking-wider border border-indigo-500 col-span-2 md:col-span-1">
                        <i class="bi bi-plus-lg text-base pointer-events-none"></i> Novo Produto
                    </button>
                </div>
            </div>

            <div id="filter-panel" class="${E.isAdvancedFilterOpen?"block":"hidden"} mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-fade-in flex-shrink-0">
                <div class="flex flex-col md:flex-row items-end gap-3">
                    <div class="w-full md:w-64">
                        <label class="block text-[9px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Categoria</label>
                        <select id="filterCategoryId" class="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-colors">
                            <option value="all">Todas as categorias</option>
                        </select>
                    </div>
                    <div class="flex gap-2 w-full md:w-auto">
                        <button id="clear-filters-btn" class="w-full md:w-auto px-5 py-2.5 bg-slate-100 text-slate-700 font-black rounded-lg hover:bg-slate-200 transition-colors text-xs uppercase tracking-wider border border-slate-200">Limpar</button>
                        <button id="apply-filter-btn" class="w-full md:w-auto px-6 py-2.5 bg-indigo-600 text-white font-black rounded-lg shadow-md hover:bg-indigo-700 active:scale-95 transition-all text-xs uppercase tracking-wider">Aplicar</button>
                    </div>
                </div>
            </div>

            <div id="summary-section" class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 flex-shrink-0"></div>

            <div class="flex gap-2 overflow-x-auto pb-2 w-full custom-scrollbar mb-2 animate-fade-in flex-shrink-0">
                <button data-status="all" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${E.stockFilter==="all"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Todos</button>
                <button data-status="ok" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${E.stockFilter==="ok"?"bg-emerald-600 text-white border-emerald-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Estoque OK</button>
                <button data-status="alert" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${E.stockFilter==="alert"?"bg-amber-500 text-white border-amber-500":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Alerta Mínimo</button>
                <button data-status="empty" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${E.stockFilter==="empty"?"bg-red-600 text-white border-red-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Esgotados</button>
            </div>

            <div id="productsList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                ${xi(8)}
            </div>

            <button data-action="open-product-editor" data-id="" class="md:hidden fixed bottom-20 right-4 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-500/40 flex items-center justify-center hover:bg-indigo-700 transition-all z-40 active:scale-95 border border-indigo-500">
                <i class="bi bi-plus-lg text-2xl pointer-events-none"></i>
            </button>
        `;else if(E.currentTab==="movimentacoes"){const e=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const s=a.toISOString().split("T")[0],i=(E.products||[]).map(r=>`<option value="${r.id}">${v(r.name)}</option>`).join(""),o=(E.categories||[]).map(r=>`<option value="${r.id}">${v(r.name)}</option>`).join("");t.innerHTML=`
            <div id="movement-batch-action-bar" class="hidden absolute top-0 left-0 right-0 z-30 bg-slate-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down mb-4 mx-4 md:mx-0">
                <div class="flex items-center gap-3">
                    <button id="cancel-mov-selection-btn" class="p-1.5 hover:bg-slate-700 rounded-full transition-colors text-slate-300 hover:text-white">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <span class="font-bold text-sm tracking-wide"><span id="mov-selected-count" class="text-indigo-400">0</span> Selecionados</span>
                </div>
                <button data-action="batch-delete-movements" class="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-sm active:scale-95">
                    <i class="bi bi-arrow-counterclockwise"></i> Estornar e Excluir
                </button>
            </div>

            <div class="flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
                <div class="bg-white px-5 py-5 border-b border-slate-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4 flex-shrink-0">
                    <div>
                        <h2 class="text-base font-black text-slate-800 flex items-center gap-2 uppercase tracking-wider"><i class="bi bi-arrow-left-right text-indigo-500"></i> Histórico de Estoque</h2>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Acompanhe entradas e saídas de mercadoria na rede.</p>
                    </div>
                    <button data-action="open-new-movement-modal" class="w-full md:w-auto py-3 px-6 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-colors shadow-md active:scale-95 flex items-center justify-center gap-2 text-xs uppercase tracking-wider border border-indigo-600">
                        <i class="bi bi-plus-circle text-base pointer-events-none"></i> Lançar Movimento
                    </button>
                </div>

                <div class="bg-slate-50 px-5 py-5 border-b border-slate-200 flex-shrink-0">
                    <div class="flex flex-wrap md:flex-nowrap gap-4 items-end">
                        <div class="w-full md:w-40">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Início</label>
                            <input type="date" id="reportStartDate" value="${s}" class="w-full px-3 py-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-inner">
                        </div>
                        <div class="w-full md:w-40">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Fim</label>
                            <input type="date" id="reportEndDate" value="${e}" class="w-full px-3 py-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-inner">
                        </div>
                        <div class="w-full md:w-auto flex-1">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Filtrar Produto</label>
                            <select id="productFilterReport" class="w-full px-3 py-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-inner cursor-pointer">
                                <option value="all">Todos os produtos</option>${i}
                            </select>
                        </div>
                        <div class="w-full md:w-auto flex-1 hidden md:block">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Categoria</label>
                            <select id="categoryFilterReport" class="w-full px-3 py-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-inner cursor-pointer">
                                <option value="all">Todas as categorias</option>${o}
                            </select>
                        </div>
                        <div class="w-full md:w-auto">
                            <button id="btn-generate-report" class="bg-slate-800 text-white font-black px-8 py-3 rounded-xl hover:bg-slate-900 transition-colors text-sm w-full md:w-auto shadow-md active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider">
                                <i class="bi bi-search text-base"></i> Buscar
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
        `,document.getElementById("btn-generate-report").addEventListener("click",ya),ya()}}}async function Le(){const t=Ms();try{const e=t.map(n=>gt(n)),a=t.map(n=>Ha(n,"products")),[s,i]=await Promise.all([Promise.all(e),Promise.all(a)]),o=new Map;s.flat().filter(Boolean).forEach(n=>o.set(n.id,n)),E.products=Array.from(o.values()),f.products=E.products;const r=new Map;i.flat().filter(Boolean).forEach(n=>r.set(n.id,n)),E.categories=Array.from(r.values()),f.categories=E.categories,E.currentTab==="catalogo"?(fi(),Re()):E.currentTab==="movimentacoes"&&ya(),E.suppliers=[],t.forEach(async n=>{try{let l=[];typeof qt=="function"&&(l=await qt(n)),l.forEach(d=>{E.suppliers.find(u=>u.id===d.id)||E.suppliers.push(d)}),f.suppliers=E.suppliers}catch(l){console.warn("Aviso: Falha ao carregar fornecedores em background.",l)}})}catch(e){console.error("Erro detalhado ao carregar produtos:",e);const a=document.getElementById("productsList");a&&(a.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>')}}function fi(){const t=document.getElementById("filterCategoryId");t&&E.categories&&(t.innerHTML='<option value="all">Todas as categorias</option>',E.categories.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=v(e.name),E.filterCategoryId===e.id&&(a.selected=!0),t.appendChild(a)}))}function cs(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=E.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function $t(){const t=document.getElementById("movement-batch-action-bar"),e=document.getElementById("mov-selected-count"),a=E.selectedMovementIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function Rl(t){const e=document.getElementById("summary-section");if(!e)return;let a=t.length,s=0,i=0,o=0,r=0;t.forEach(n=>{const l=n.currentStock||0,d=n.minStock||0;n.active!==!1&&n.price&&l>0&&(r+=n.price*l),l<=0?o++:d>0&&l<=d||d>0&&l<=d*1.2?i++:s++}),e.innerHTML=`
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Itens de Estoque</span>
            <span class="text-base md:text-2xl font-black text-slate-800 mt-0.5 w-full truncate">${a}</span>
        </div>
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Estoque OK</span>
            <span class="text-base md:text-2xl font-black text-emerald-600 mt-0.5 w-full truncate">${s}</span>
        </div>
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Alerta (Baixo)</span>
            <span class="text-base md:text-2xl font-black text-amber-500 mt-0.5 w-full truncate">${i}</span>
        </div>
        <div class="bg-red-50 p-2 md:p-4 rounded-xl border border-red-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-red-500 uppercase tracking-widest w-full truncate">Esgotados</span>
            <span class="text-base md:text-2xl font-black text-red-600 mt-0.5 w-full truncate">${o}</span>
        </div>
    `}function Re(){const t=document.getElementById("productsList");if(!t)return;if(E.products===null){t.innerHTML=xi(8);return}const e=Ms(),a=E.products.filter(i=>{const o=i.name.toLowerCase().includes(E.searchQuery)||i.sku&&i.sku.toLowerCase().includes(E.searchQuery)||i.barcode&&i.barcode.toLowerCase().includes(E.searchQuery),r=i.currentStock||0,n=i.minStock||0;let l=!0;E.stockFilter==="ok"&&(l=r>0&&(n===0||r>n*1.2)),E.stockFilter==="alert"&&(l=n>0&&r>0&&r<=n*1.2),E.stockFilter==="empty"&&(l=r<=0);const d=E.filterCategoryId==="all"||i.categoryId===E.filterCategoryId,u=i.accessibleIn&&i.accessibleIn.length>0?i.accessibleIn:[i.establishmentId||f.establishmentId],c=e.some(p=>u.includes(p));return o&&l&&d&&c});if(Rl(a),a.length===0){E.products.length===0?t.innerHTML=`
                <div class="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
                    <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 border border-indigo-100">
                        <i class="bi bi-box-seam text-3xl text-indigo-400"></i>
                    </div>
                    <h3 class="text-base font-black text-slate-800 mb-1">Nenhum produto cadastrado</h3>
                    <p class="text-xs text-slate-500 max-w-sm text-center font-medium mb-6">O seu estoque está vazio. Adicione o seu primeiro produto para gerir e vender!</p>
                    <button data-action="open-product-editor" data-id="" class="py-3 px-6 bg-indigo-600 text-white font-black rounded-xl shadow-md hover:bg-indigo-700 transition active:scale-95 uppercase tracking-wider text-xs flex items-center gap-2 border border-indigo-500">
                        <i class="bi bi-plus-lg"></i> Criar Produto
                    </button>
                </div>
            `:t.innerHTML=`
                <div class="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
                    <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                        <i class="bi bi-search text-2xl text-slate-300"></i>
                    </div>
                    <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhum resultado encontrado</h3>
                    <p class="text-[10px] text-slate-500 max-w-xs text-center font-medium">Tente ajustar os filtros ou limpar a barra de pesquisa.</p>
                    <button id="clear-filters-btn" class="mt-4 py-2 px-4 bg-slate-100 text-slate-600 font-bold rounded-lg border border-slate-200 text-[10px] uppercase tracking-wider hover:bg-slate-200 transition">Limpar Filtros</button>
                </div>
            `;return}const s=new Map((E.categories||[]).map(i=>[i.id,i.name]));t.innerHTML=a.map(i=>{const o=v(i.name),r=v(s.get(i.categoryId)||"Sem Categoria"),n=i.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(i.name.charAt(0))}`,l=i.accessibleIn?i.accessibleIn.length:1,d=E.selectedIds.has(i.id),u=i.price!==void 0?parseFloat(i.price).toFixed(2):"0.00",c=i.currentStock||0,p=i.minStock||0;let b="bg-emerald-500",m=!1,x=`<span class="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1"><i class="bi bi-box-seam"></i> ${c} un</span>`;return c<=0?(b="bg-red-500",m=!0,x='<span class="text-[9px] font-bold bg-red-50 text-red-700 px-1.5 py-0.5 rounded-md border border-red-100 flex items-center gap-1"><i class="bi bi-exclamation-triangle"></i> Sem Estoque</span>'):p>0&&c<=p*1.2&&(b="bg-amber-500",x=`<span class="text-[9px] font-bold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md border border-amber-100 flex items-center gap-1"><i class="bi bi-exclamation-circle"></i> Baixo (${c})</span>`),i.active===!1&&(m=!0,b="bg-slate-400"),`
            <div class="product-card relative bg-white rounded-2xl border ${d?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-slate-200"} shadow-sm flex items-center p-4 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 active:scale-[0.98] ${m?"opacity-70 bg-slate-50":""}" 
                 data-action="open-product-editor" data-id="${i.id}">
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" data-action-stop-propagation="true">
                    <input type="checkbox" data-id="${i.id}" class="product-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${d?"checked":""}>
                </div>

                <div class="relative flex-shrink-0 mr-4">
                    <img src="${n}" alt="${o}" class="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover border border-slate-100 shadow-sm">
                    <span class="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-2 border-white rounded-full ${b}" title="Estoque: ${c}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-6">
                    <h3 class="text-sm font-black text-slate-800 truncate leading-tight mb-1">
                        ${o}
                    </h3>
                    <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate mb-2">${r}</p>
                    
                    <div class="flex items-center justify-between mt-1">
                        <span class="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100 shadow-sm">R$ ${u}</span>
                        <div class="flex gap-1.5">
                            ${x}
                            ${l>1?`<span class="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md border border-slate-200 flex items-center gap-1" title="${l} Lojas"><i class="bi bi-diagram-3"></i></span>`:""}
                        </div>
                    </div>
                </div>
            </div>`}).join("")}function xi(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center p-4 animate-pulse h-[98px]">
            <div class="w-14 h-14 rounded-xl bg-slate-200 flex-shrink-0 mr-4"></div>
            <div class="flex-1 space-y-3">
                <div class="h-3 bg-slate-200 rounded w-3/4"></div>
                <div class="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}async function Hl(t){t.preventDefault();const e=t.target.closest("#categoryForm"),a=e.querySelector("#categoryName"),s=a.value;if(!s)return;const i=e.querySelector('button[type="submit"]');i.disabled=!0,i.innerHTML='<i class="bi bi-hourglass-split"></i>...';try{const o=E.hierarchyCache.reduce((r,n)=>(r.push(n.id),n.branches&&n.branches.forEach(l=>r.push(l.id)),r),[]);o.length===0&&o.push(f.establishmentId),await ci({establishmentId:f.establishmentId,name:s,accessibleIn:o},"products"),re(f.establishmentId,_e(),"Categorias (Produtos)","Criou",`Criou categoria: ${s}`),a.value="",g("Sucesso","Categoria criada!","success"),await Bs(),await Le()}catch(o){g("Erro",`Não foi possível criar a categoria: ${o.message}`,"error")}finally{i.disabled=!1,i.innerHTML='<i class="bi bi-plus-lg"></i>'}}async function Ol(t){if(await G("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await ui(t,"products"),re(f.establishmentId,_e(),"Categorias (Produtos)","Excluiu",`Excluiu uma categoria (ID: ${t})`),g("Sucesso","Categoria apagada.","success"),await Bs(),await Le()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function Bs(){const t=document.getElementById("categoryList");if(t){t.innerHTML='<div class="loader mx-auto my-4 border-indigo-500"></div>';try{const e=await Ha(f.establishmentId,"products");E.categories=e,e.length>0?t.innerHTML=e.map(a=>`
                <div class="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 mb-2 shadow-sm">
                    <span class="text-xs font-black text-slate-700 uppercase tracking-widest">${v(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-white w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-600 rounded-lg transition-colors border border-red-100 active:scale-95"><i class="bi bi-trash3 pointer-events-none"></i></button>
                </div>`).join(""):t.innerHTML='<div class="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200"><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhuma categoria criada.</p></div>'}catch{t.innerHTML='<p class="text-red-500 text-center text-[10px] font-bold p-4 bg-red-50 rounded-xl">Erro ao carregar categorias.</p>'}}}function zl(){Fe({title:"Categorias de Produtos",contentHTML:`
        <div class="space-y-4">
            <div class="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                <p class="text-[10px] text-indigo-800 mb-3 font-bold uppercase tracking-widest"><i class="bi bi-info-circle mr-1"></i> Categorias disponíveis para toda a rede.</p>
                <form id="categoryForm" class="flex gap-2 items-end">
                    <div class="flex-1 min-w-0">
                        <label for="categoryName" class="block text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-1 ml-1">Nome da Categoria</label>
                        <input type="text" id="categoryName" placeholder="Ex: Shampoos, Ferramentas..." required class="w-full p-3 border border-indigo-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-bold bg-white shadow-inner">
                    </div>
                    <button type="submit" class="w-12 h-12 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md active:scale-95 flex items-center justify-center flex-shrink-0"><i class="bi bi-plus-lg"></i></button>
                </form>
            </div>
            <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 ml-1">Categorias Existentes</h4>
            <div id="categoryList" class="max-h-64 overflow-y-auto custom-scrollbar pr-1"></div>
        </div>
    `,maxWidth:"max-w-md"});const e=document.getElementById("genericModal");if(e){const a=e.querySelector("#categoryForm");a&&(a.addEventListener("submit",Hl),e.addEventListener("click",s=>{const i=s.target.closest('button[data-action="delete-category"]');i&&(s.preventDefault(),Ol(i.dataset.id))}))}Bs()}function _l(){const t=(E.products||[]).map(r=>`<option value="${r.id}">${v(r.name)} (Estoque: ${r.currentStock||0})</option>`).join(""),e=E.hierarchyCache.reduce((r,n)=>(r.push(`<option value="${n.id}">🏢 ${v(n.name)}</option>`),n.branches&&n.branches.forEach(l=>r.push(`<option value="${l.id}">📍 ${v(l.name)}</option>`)),r),[]).join(""),a=document.getElementById("movement-modal-inner"),s=`
        <div class="p-4 md:p-5 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button type="button" data-action="close-movement-modal" class="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition-colors active:scale-95 mr-4">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <div class="min-w-0">
                <h3 class="font-black text-sm md:text-base text-slate-800 uppercase tracking-wider truncate leading-tight">Lançar Movimentação</h3>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">Entradas ou Saídas Manuais</p>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 p-4 md:p-6">
            <form id="newMovementForm" class="space-y-5 max-w-md mx-auto">
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Unidade de Estoque *</label>
                        <select id="movEstablishmentId" required class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner cursor-pointer">
                            ${e}
                        </select>
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Produto *</label>
                        <select id="movProductId" required class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner cursor-pointer">
                            <option value="">Selecione o produto...</option>
                            ${t}
                        </select>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-5">
                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Tipo de Movimento</label>
                        <div class="flex gap-2">
                            <label class="flex-1 flex flex-col items-center justify-center p-3 border border-slate-200 rounded-xl cursor-pointer bg-white hover:bg-slate-50 transition-colors has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50 has-[:checked]:text-emerald-700 shadow-sm text-slate-500">
                                <input type="radio" name="movType" value="in" checked class="sr-only">
                                <i class="bi bi-arrow-down-circle text-lg mb-1"></i> <span class="font-black text-[10px] uppercase tracking-widest">Entrada</span>
                            </label>
                            <label class="flex-1 flex flex-col items-center justify-center p-3 border border-slate-200 rounded-xl cursor-pointer bg-white hover:bg-slate-50 transition-colors has-[:checked]:border-red-500 has-[:checked]:bg-red-50 has-[:checked]:text-red-700 shadow-sm text-slate-500">
                                <input type="radio" name="movType" value="out" class="sr-only">
                                <i class="bi bi-arrow-up-circle text-lg mb-1"></i> <span class="font-black text-[10px] uppercase tracking-widest">Saída</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Quantidade *</label>
                        <input type="number" id="movAmount" required min="1" placeholder="Ex: 10" class="w-full p-4 border border-slate-300 rounded-xl text-xl text-center bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 font-black text-slate-800 shadow-inner h-full">
                    </div>
                </div>

                <div>
                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Motivo / Observação *</label>
                    <input type="text" id="movReason" required placeholder="Ex: Compra de fornecedor, Quebra, Validade..." class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner">
                </div>
            </form>
        </div>

        <footer class="p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] w-full flex-shrink-0 z-50 flex gap-3 justify-end md:rounded-b-3xl">
            <button type="button" data-action="close-movement-modal" class="hidden md:block py-3 px-6 bg-slate-100 border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors shadow-sm active:scale-95">Cancelar</button>
            <button type="submit" form="newMovementForm" class="w-full md:w-auto md:px-8 py-3 bg-indigo-600 text-white font-black text-xs md:text-sm rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider border border-indigo-600">
                <i class="bi bi-check2-circle text-lg pointer-events-none"></i> Lançar
            </button>
        </footer>
    `;a.innerHTML=s,ql();const i=document.getElementById("movEstablishmentId");i&&(i.value=f.establishmentId);const o=document.getElementById("newMovementForm");o.onsubmit=async r=>{r.preventDefault();const n=a.querySelector('button[type="submit"]'),l=n.innerHTML,d=document.getElementById("movProductId")?.value,u=document.getElementById("movEstablishmentId")?.value,c=o.querySelector('input[name="movType"]:checked')?.value,p=parseInt(document.getElementById("movAmount")?.value,10),b=document.getElementById("movReason")?.value.trim();if(!d||!p||p<=0||!b||!u){g("Erro","Preencha todos os campos corretamente.","warning");return}const m=c==="in"?p:-p;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> Salvando...';try{await Fa(d,{change:m,reason:b,establishmentId:u});const x=E.products.find(y=>y.id===d)?.name||"Produto";re(u,_e(),"Estoque","Ajuste Manual",`Lançou movimentação (${m>0?"+":""}${m}) para ${x}`),g("Sucesso","Movimentação registrada com sucesso!","success"),ds(),await Le()}catch(x){g("Erro",x.message,"error"),n.disabled=!1,n.innerHTML=l}}}function Vl(t=[]){if(!E.hierarchyCache||E.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${f.establishmentId}">
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 text-center">
                <i class="bi bi-info-circle text-2xl block mb-2 text-slate-400"></i> Exclusivo desta unidade.
            </div>`;let e='<div class="space-y-2 mt-1 max-h-48 overflow-y-auto custom-scrollbar pr-2">';return E.hierarchyCache.forEach(a=>{const s=t.includes(a.id)||t.length===0&&a.id===f.establishmentId;e+=`
            <label class="flex items-center space-x-3 p-3 cursor-pointer bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-colors shadow-sm">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-xs md:text-sm font-black text-slate-800">🏢 ${v(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(i=>{const o=t.includes(i.id)||t.length===0&&i.id===f.establishmentId;e+=`
                    <label class="flex items-center space-x-3 p-3 ml-8 cursor-pointer bg-white hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl transition-colors border-l-4 border-l-indigo-200 shadow-sm">
                        <input type="checkbox" name="accessibleIn" value="${i.id}" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                        <span class="text-xs font-bold text-slate-600">📍 ${v(i.name)}</span>
                    </label>
                `})}),e+="</div>",e}function Ul(t){E.viewMode="edit-product";const e=document.getElementById("product-modal-inner");if(!e)return;let a={name:"",active:!0,price:0,costPrice:0,currentStock:0,minStock:0,maxStock:0,supplierIds:[]};if(t){const T=E.products?.find(A=>String(A.id)===String(t));T&&(a=JSON.parse(JSON.stringify(T)))}E.tempProduct=a,E.tempSupplierIds=new Set(a.supplierIds||[]);const s=!!a.id,i=E.categories||[],o=v(a.name||""),r=v(a.sku||""),n=v(a.barcode||""),l=v(a.description||""),d=s?o:"Novo Produto",u=a.price!==void 0?a.price:"",c=a.costPrice!==void 0?a.costPrice:"",p=a.commissionRate!==void 0?a.commissionRate:"",b=a.currentStock||0,m=a.minStock||0;a.maxStock;const x=i.map(T=>`<option value="${T.id}" ${a.categoryId===T.id?"selected":""}>${v(T.name)}</option>`).join(""),y=a.photo||`https://placehold.co/150x150/E2E8F0/4A5568?text=${encodeURIComponent(o?o.charAt(0):"P")}`,S=`
        <div class="p-4 md:p-5 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition-colors active:scale-95 mr-4">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <div class="min-w-0">
                <h3 class="font-black text-sm md:text-base text-slate-800 uppercase tracking-wider truncate leading-tight">${s?"Editar Produto":"Novo Produto"}</h3>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">${s?d:"Gerenciamento de Estoque"}</p>
            </div>
            ${s?`
                <button data-action="delete-product" data-id="${a.id}" class="ml-auto w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 border border-red-100 transition-colors active:scale-95 flex-shrink-0" title="Excluir">
                    <i class="bi bi-trash3 text-base pointer-events-none"></i>
                </button>
            `:""}
        </div>
    `;e.innerHTML=`
        ${S}
        
        <div class="modal-tabs px-2 md:px-6 border-b flex items-center justify-start gap-4 overflow-x-auto bg-slate-50 flex-shrink-0 custom-scrollbar shadow-sm">
            <button class="tab-link active whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors uppercase tracking-widest" data-tab="dados-basicos">1. Dados Básicos</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="config-vendas">2. Estoque & Vendas</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="fornecedores-produto">3. Fornecedores</button>
        </div>
        
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 p-3 md:p-6 relative"> 
            <form id="productForm" class="h-full w-full mx-auto max-w-4xl">
                <input type="hidden" id="productId" value="${a.id||""}">
                <input type="hidden" id="productPhotoBase64" value="${a.photo||""}">
                
                <div id="dados-basicos" class="tab-content active space-y-4 md:space-y-6 animate-fade-in-fast">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div class="lg:col-span-1 space-y-4">
                            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col items-center">
                                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Imagem do Produto</label>
                                <div class="relative group w-32 h-32 mb-5 cursor-pointer" id="productPhotoContainer">
                                    <img id="productPhotoPreview" src="${y}" alt="Foto" class="w-full h-full rounded-2xl object-cover border-4 border-slate-50 shadow-md transition-all group-hover:brightness-75">
                                    <div id="productPhotoButtonOverlay" class="absolute inset-0 flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                        <i class="bi bi-camera-fill text-white text-3xl drop-shadow-md"></i>
                                    </div>
                                </div>
                                <input type="file" id="productPhotoInput" class="hidden" accept="image/*">
                                <button type="button" id="productPhotoButton" class="text-indigo-600 text-[10px] font-black uppercase tracking-wider hover:text-indigo-800 transition-colors w-full bg-indigo-50 py-2.5 rounded-xl border border-indigo-100 shadow-sm active:scale-95">Alterar Imagem</button>
                            </div>

                            <div class="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
                                <div>
                                    <p class="text-xs font-black text-emerald-900 uppercase tracking-wider mb-0.5">Ativo / Venda</p>
                                    <p class="text-[9px] font-bold text-emerald-700">Pode ser vendido no PDV.</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer ml-3">
                                    <input type="checkbox" id="productStatusToggle" class="sr-only peer" ${a.active!==!1?"checked":""}>
                                    <div class="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
                                </label>
                            </div>
                        </div>

                        <div class="lg:col-span-2 space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div class="form-group sm:col-span-2">
                                    <label for="productName" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome do Produto *</label>
                                    <input type="text" id="productName" value="${o}" required placeholder="Ex: Shampoo Revitalizante 300ml" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors text-base font-black text-slate-800 shadow-inner">
                                </div>
                                
                                <div class="form-group">
                                    <label for="productCategory" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Categoria</label>
                                    <select id="productCategory" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner cursor-pointer">
                                        <option value="">Sem Categoria</option>
                                        ${x}
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="productSku" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">SKU (Código Interno)</label>
                                    <input type="text" id="productSku" value="${r}" placeholder="Ex: POM-MAT-01" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner">
                                </div>

                                <div class="form-group sm:col-span-2">
                                    <label for="productBarcode" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Código de Barras (EAN/UPC)</label>
                                    <div class="relative">
                                        <i class="bi bi-upc-scan absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg"></i>
                                        <input type="text" id="productBarcode" value="${n}" placeholder="Bipe aqui ou digite" class="w-full pl-12 p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner tracking-widest">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group pt-4 border-t border-slate-100 mt-2">
                                <label for="productDescription" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Descrição Comercial</label>
                                <textarea id="productDescription" rows="4" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors placeholder-slate-400 font-medium text-sm text-slate-700 shadow-inner resize-none" placeholder="Descrição para recibos e detalhes...">${l}</textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="config-vendas" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4 flex items-center gap-2"><i class="bi bi-tag-fill text-indigo-500 text-lg"></i> Preço e Margem</h3>
                                
                                <div class="grid grid-cols-2 gap-5">
                                    <div class="form-group">
                                        <label for="productCostPrice" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Preço de Custo</label>
                                        <input type="number" id="productCostPrice" step="0.01" min="0" value="${c}" placeholder="0.00" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors font-black text-slate-700 shadow-inner">
                                    </div>
                                    <div class="form-group">
                                        <label for="productPrice" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Preço de Venda *</label>
                                        <input type="number" id="productPrice" step="0.01" min="0" value="${u}" required placeholder="0.00" class="w-full p-3.5 border border-emerald-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50/30 focus:bg-white transition-colors font-black text-emerald-700 shadow-inner">
                                    </div>
                                </div>
                            </div>

                            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4 flex items-center gap-2"><i class="bi bi-box-seam text-amber-500 text-lg"></i> Controle de Estoque</h3>
                                
                                <div class="grid grid-cols-2 gap-5">
                                    <div class="form-group">
                                        <label for="productCurrentStock" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Estoque Atual</label>
                                        <input type="number" id="productCurrentStock" value="${b}" readonly class="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-100 font-black text-center text-xl text-slate-700 cursor-not-allowed shadow-inner" title="Para alterar, use a aba Movimentações">
                                    </div>
                                    <div class="form-group">
                                        <label for="productMinStock" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Mínimo (Alerta)</label>
                                        <input type="number" id="productMinStock" value="${m}" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner text-center text-lg">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4 flex items-center gap-2"><i class="bi bi-percent text-indigo-500 text-lg"></i> Comissão por Venda</h3>
                                <div class="form-group">
                                    <label for="productCommissionRate" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Taxa padrão de comissão</label>
                                    <div class="flex items-center shadow-inner rounded-xl overflow-hidden border border-indigo-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500 bg-white">
                                        <input type="number" id="productCommissionRate" step="0.1" min="0" value="${p}" class="w-full p-3.5 bg-transparent outline-none font-black text-indigo-700 text-center text-lg" placeholder="0">
                                        <span class="bg-slate-100 px-5 py-3.5 text-lg font-black text-slate-400 border-l border-slate-200">%</span>
                                    </div>
                                    <p class="text-[9px] font-bold text-slate-400 mt-2 ml-1 uppercase tracking-widest">Remuneração paga ao profissional.</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                            <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4 flex items-center gap-2"><i class="bi bi-diagram-3 text-indigo-500 text-lg"></i> Disponibilidade na Rede</h3>
                            <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">Lojas que possuem este produto.</p>
                            <div class="flex-1 overflow-y-auto max-h-96 custom-scrollbar pr-2 border border-slate-100 rounded-xl p-2 bg-slate-50">
                                ${Vl(a.accessibleIn||[])}
                            </div>
                        </div>
                    </div>
                </div>

                <div id="fornecedores-produto" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    <div class="max-w-2xl mx-auto">
                        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
                            <label class="block text-xs font-black text-slate-800 uppercase tracking-wider mb-3"><i class="bi bi-search text-indigo-500 mr-2 text-lg"></i> Pesquisar Fornecedor</label>
                            <div class="relative">
                                <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                                <input type="text" id="modalSupplierSearch" placeholder="Digite o nome da empresa ou contato..." class="w-full pl-12 p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner">
                            </div>
                            <div id="supplierSearchResults" class="mt-2 border border-slate-200 rounded-xl max-h-48 overflow-y-auto bg-white hidden shadow-lg absolute w-full max-w-[calc(100%-48px)] z-20 custom-scrollbar"></div>
                        </div>

                        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                            <h4 class="text-xs font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3"><i class="bi bi-truck text-indigo-500 mr-2 text-lg"></i> Fornecedores Vinculados</h4>
                            <div id="selectedSuppliersList" class="space-y-2 max-h-80 overflow-y-auto border border-dashed border-slate-300 p-3 rounded-xl bg-slate-50 min-h-[150px] custom-scrollbar flex flex-col justify-center">
                                <p class="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest">Nenhum fornecedor adicionado ainda.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        
        <footer class="p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] w-full flex-shrink-0 z-50 flex gap-3 justify-end rounded-b-3xl">
            <button type="button" data-action="close-detail-screen" class="hidden md:block py-3 px-6 bg-slate-100 border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors shadow-sm active:scale-95">Cancelar</button>
            <button type="submit" form="productForm" class="w-full md:w-auto md:px-8 py-3 bg-indigo-600 text-white font-black text-xs md:text-sm rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider border border-indigo-600">
                <i class="bi bi-save2 text-lg pointer-events-none"></i> Salvar Produto
            </button>
        </footer>
    `,e.querySelectorAll(".tab-link").forEach(T=>{T.addEventListener("click",A=>{A.preventDefault(),e.querySelectorAll(".tab-link").forEach(N=>{N.classList.remove("active","border-indigo-600","text-indigo-600"),N.classList.add("border-transparent","text-slate-400")}),T.classList.add("active","border-indigo-600","text-indigo-600"),T.classList.remove("border-transparent","text-slate-400"),e.querySelectorAll(".tab-content").forEach(N=>N.classList.add("hidden")),e.querySelector("#"+T.dataset.tab).classList.remove("hidden")})});const L=()=>{const T=document.getElementById("modalSupplierSearch"),A=document.getElementById("supplierSearchResults"),N=document.getElementById("selectedSuppliersList"),K=T?.value.toLowerCase()||"",ee=E.suppliers||[];if(K.length>0){const oe=ee.filter(Z=>Z.name.toLowerCase().includes(K)&&!E.tempSupplierIds.has(Z.id));oe.length>0?(A.classList.remove("hidden"),A.innerHTML=oe.map(Z=>`
                    <div class="p-3.5 hover:bg-indigo-50 cursor-pointer border-b border-slate-100 last:border-0 flex justify-between items-center transition-colors" data-add-supplier="${Z.id}">
                        <span class="font-bold text-xs text-slate-700 uppercase tracking-widest">${v(Z.name)}</span>
                        <span class="text-indigo-600 text-[10px] font-black px-2 py-1 bg-indigo-100 rounded-md uppercase tracking-widest pointer-events-none">+ Adicionar</span>
                    </div>
                `).join("")):(A.classList.remove("hidden"),A.innerHTML='<div class="p-4 text-xs font-bold text-slate-500 text-center uppercase tracking-widest">Fornecedor não encontrado.</div>')}else A&&A.classList.add("hidden");E.tempSupplierIds.size>0?(N.classList.remove("justify-center"),N.classList.add("justify-start"),N.innerHTML="",E.tempSupplierIds.forEach(oe=>{const Z=ee.find(F=>F.id===oe);Z&&(N.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border border-slate-200 p-3.5 rounded-xl shadow-sm hover:border-indigo-200 transition-colors" data-id="${Z.id}">
                            <div>
                                <p class="font-black text-slate-800 text-xs uppercase tracking-widest mb-1">${v(Z.name)}</p>
                                <p class="text-[9px] font-bold text-slate-500 uppercase tracking-widest"><i class="bi bi-person mr-1"></i> ${v(Z.contactName||"N/I")} | <i class="bi bi-telephone mr-1"></i> ${v(Z.phone||"N/I")}</p>
                            </div>
                            <button type="button" class="text-slate-400 hover:text-red-600 w-10 h-10 flex items-center justify-center hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 active:scale-95" data-remove-supplier="${Z.id}" title="Remover">
                                <i class="bi bi-trash3 pointer-events-none"></i>
                            </button>
                        </div>
                    `)})):(N.classList.add("justify-center"),N.classList.remove("justify-start"),N.innerHTML='<p class="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest">Nenhum fornecedor adicionado ainda.</p>')},D=document.getElementById("modalSupplierSearch");D&&D.addEventListener("input",L),L();const k=e.querySelector("#productPhotoInput"),I=e.querySelector("#productPhotoButton"),M=e.querySelector("#productPhotoContainer"),V=e.querySelector("#productPhotoPreview"),P=e.querySelector("#productPhotoBase64"),z=()=>k?.click();I&&I.addEventListener("click",z),M&&M.addEventListener("click",z),k&&(k.onchange=async()=>{const T=k.files[0];if(!T)return;const A=V.src;V.src="https://placehold.co/150x150/E2E8F0/4A5568?text=...";try{const N=await Da(T,800,800,.8);if(N.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");V.src=N,P.value=N}catch(N){g("Erro de Imagem",N.message,"error"),V.src=A,P.value=a?.photo||""}});const O=document.getElementById("productForm");O&&(O.onsubmit=async T=>{T.preventDefault();const A=e.querySelector('button[type="submit"]'),N=A.innerHTML,K=document.getElementById("productName"),ee=document.getElementById("productPrice");if(!K?.value||!ee?.value){g("Aviso","Preencha o Nome e o Preço do produto.","warning");return}const oe=parseInt(document.getElementById("productCurrentStock")?.value||"0",10),Z=parseInt(document.getElementById("productMinStock")?.value||"0",10),F=Array.from(document.querySelectorAll('#productForm input[name="accessibleIn"]:checked')).map(W=>W.value),te=F.length>0?F:[f.establishmentId],le={...E.tempProduct,establishmentId:f.establishmentId,accessibleIn:te,name:K.value.trim(),sku:document.getElementById("productSku")?.value.trim()||"",barcode:document.getElementById("productBarcode")?.value.trim()||"",price:parseFloat(ee.value),costPrice:parseFloat(document.getElementById("productCostPrice")?.value)||0,commissionRate:parseFloat(document.getElementById("productCommissionRate")?.value)||0,currentStock:isNaN(oe)?0:oe,minStock:isNaN(Z)?0:Z,categoryId:document.getElementById("productCategory")?.value||null,photo:document.getElementById("productPhotoBase64")?.value||"",description:document.getElementById("productDescription")?.value.trim()||"",active:document.getElementById("productStatusToggle")?.checked!==!1,supplierIds:Array.from(E.tempSupplierIds)};A.disabled=!0,A.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> A gravar...';try{s?(await ii(t,le),re(f.establishmentId,_e(),"Produtos","Editou",`Editou o produto: ${le.name}`),g("Sucesso","Produto atualizado com sucesso!","success")):(delete le.id,await oi(le),re(f.establishmentId,_e(),"Produtos","Criou",`Criou novo produto: ${le.name}`),g("Sucesso","Produto adicionado à rede!","success")),la(),await Le()}catch(W){g("Erro",W.message,"error"),A.disabled=!1,A.innerHTML=N}}),jl()}async function Wl(){if(!(E.selectedIds.size===0||!await G("Excluir Produtos",`Tem a certeza que deseja excluir ${E.selectedIds.size} produtos do seu inventário?`)))try{const e=Array.from(E.selectedIds).map(a=>Cs(a));await Promise.all(e),g("Sucesso","Produtos excluídos com sucesso.","success"),E.selectedIds.clear(),cs(),await Le()}catch(e){g("Erro","Não foi possível apagar os produtos: "+e.message,"error")}}async function Jl(){if(!(E.selectedMovementIds.size===0||!await G("Estornar e Excluir",`Deseja excluir as ${E.selectedMovementIds.size} movimentações selecionadas? O saldo de stock será estornado/devolvido ao sistema automaticamente.`)))try{const e=Array.from(E.selectedMovementIds).map(async a=>{const s=E.allMovements.find(i=>i.id===a);s&&await Fa(s.productId,{change:-s.change,reason:"Estorno automático de exclusão em lote",establishmentId:s.establishmentId})});await Promise.all(e),g("Sucesso","Movimentações excluídas e stocks estornados.","success"),E.selectedMovementIds.clear(),$t(),ya()}catch(e){g("Erro","Ocorreu um erro ao estornar em lote: "+e.message,"error")}}async function ya(){const t=document.getElementById("report-results");if(!t)return;t.innerHTML='<div class="flex items-center justify-center h-full"><div class="loader"></div></div>',E.selectedMovementIds.clear(),$t();const e={startDate:document.getElementById("reportStartDate")?.value||"",endDate:document.getElementById("reportEndDate")?.value||"",productId:document.getElementById("productFilterReport")?.value||"all",categoryId:document.getElementById("categoryFilterReport")?.value||"all"};try{const s=Ms().map(n=>ri({...e,establishmentId:n}).catch(l=>[])),i=await Promise.all(s);let o=[];if(i.forEach(n=>{if(!n)return;const l=Array.isArray(n)?n:Array.isArray(n.data)?n.data:Array.isArray(n.movements)?n.movements:[];o=o.concat(l)}),o.sort((n,l)=>Wa(l.date)-Wa(n.date)),E.allMovements=o,o.length===0){t.innerHTML=`
                <div class="flex flex-col items-center justify-center h-full py-16">
                    <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-slate-200">
                        <i class="bi bi-inboxes text-3xl text-slate-300"></i>
                    </div>
                    <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhuma movimentação no período</h3>
                    <p class="text-[10px] text-slate-500 max-w-xs text-center font-medium">Tente alterar as datas ou limpar os filtros de produto.</p>
                </div>`;return}const r=`
            <div class="overflow-y-auto custom-scrollbar h-full relative">
                <table class="min-w-full text-left border-collapse">
                    <thead class="bg-slate-50 sticky top-0 shadow-sm z-10">
                        <tr>
                            <th class="px-5 py-4 w-10 text-center border-b border-slate-200">
                                <input type="checkbox" id="selectAllMovements" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm">
                            </th>
                            <th class="px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 whitespace-nowrap">Data e Hora</th>
                            <th class="px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 whitespace-nowrap">Produto</th>
                            <th class="px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 text-center whitespace-nowrap">Movimento</th>
                            <th class="px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 text-center whitespace-nowrap">Qtd. Após</th>
                            <th class="px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 whitespace-nowrap">Motivo / Obs</th>
                            <th class="px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 whitespace-nowrap">Lançado por</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${o.map(n=>{const l=n.change>0,d=l?"text-emerald-700 bg-emerald-50 border-emerald-200":"text-red-700 bg-red-50 border-red-200",u=l?'<i class="bi bi-arrow-down-left"></i>':'<i class="bi bi-arrow-up-right"></i>',c=E.selectedMovementIds.has(n.id),p=c?"bg-indigo-50/30":"hover:bg-slate-50/50",b=Wa(n.date),m=b.toLocaleDateString("pt-BR"),x=b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});return`
                            <tr class="transition-colors ${p}">
                                <td class="px-5 py-3 w-10 text-center">
                                    <input type="checkbox" class="movement-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" data-id="${n.id}" ${c?"checked":""}>
                                </td>
                                <td class="px-5 py-3 whitespace-nowrap">
                                    <p class="text-xs font-black text-slate-700">${m}</p>
                                    <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">${x}</p>
                                </td>
                                <td class="px-5 py-3 text-xs font-black text-slate-800 uppercase tracking-widest">${v(n.productName)}</td>
                                <td class="px-5 py-3 whitespace-nowrap text-center">
                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-black text-[10px] border shadow-sm ${d}">
                                        ${u} ${l?"+":""}${n.change}
                                    </span>
                                </td>
                                <td class="px-5 py-3 whitespace-nowrap text-center text-slate-800 font-black text-sm">${n.newStock}</td>
                                <td class="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate max-w-[250px]" title="${v(n.reason)}">${v(n.reason)}</td>
                                <td class="px-5 py-3 whitespace-nowrap text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <div class="w-6 h-6 rounded-md bg-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0"><i class="bi bi-person-fill text-xs"></i></div>
                                    ${v(n.user)}
                                </td>
                            </tr>`}).join("")}
                    </tbody>
                </table>
            </div>`;t.innerHTML=r}catch(a){g("Erro",`Não foi possível gerar: ${a.message}`,"error"),t.innerHTML='<div class="p-8 text-center text-red-500 font-bold bg-red-50 rounded-xl m-4 border border-red-100">Falha ao buscar movimentações.</div>'}}function Gl(){const t=document.getElementById("multi-context-apply");t&&(t.removeEventListener("click",Le),t.addEventListener("click",()=>{setTimeout(Le,100)})),Wt&&document.body.removeEventListener("click",Wt),Jt&&ls.removeEventListener("input",Jt),Wt=async e=>{const a=e.target.closest("[data-main-tab]");if(a){E.currentTab=a.dataset.mainTab,gi(),E.currentTab==="catalogo"&&E.products!==null&&(fi(),Re());return}if(e.target.classList.contains("product-checkbox")){const c=e.target.dataset.id;e.target.checked?E.selectedIds.add(c):E.selectedIds.delete(c),cs(),e.stopPropagation();return}if(e.target.closest("#cancel-selection-btn")){E.selectedIds.clear(),cs(),Re();return}if(e.target.classList.contains("movement-checkbox")){const c=e.target.dataset.id;e.target.checked?E.selectedMovementIds.add(c):E.selectedMovementIds.delete(c),$t();const p=e.target.closest("tr");e.target.checked?(p.classList.add("bg-indigo-50/30"),p.classList.remove("hover:bg-slate-50/50")):(p.classList.remove("bg-indigo-50/30"),p.classList.add("hover:bg-slate-50/50")),e.stopPropagation();return}if(e.target.id==="selectAllMovements"){const c=document.querySelectorAll(".movement-checkbox"),p=e.target.checked;c.forEach(b=>{b.checked=p;const m=b.dataset.id;p?E.selectedMovementIds.add(m):E.selectedMovementIds.delete(m);const x=b.closest("tr");p?(x.classList.add("bg-indigo-50/30"),x.classList.remove("hover:bg-slate-50/50")):(x.classList.remove("bg-indigo-50/30"),x.classList.add("hover:bg-slate-50/50"))}),$t(),e.stopPropagation();return}if(e.target.closest("#cancel-mov-selection-btn")){E.selectedMovementIds.clear(),$t();const c=document.getElementById("selectAllMovements");c&&(c.checked=!1),document.querySelectorAll(".movement-checkbox").forEach(p=>{p.checked=!1;const b=p.closest("tr");b.classList.remove("bg-indigo-50/30"),b.classList.add("hover:bg-slate-50/50")});return}const o=e.target.closest(".status-filter-btn");if(o){E.stockFilter=o.dataset.status,document.querySelectorAll(".status-filter-btn").forEach(c=>{c.classList.remove("bg-indigo-600","text-white","border-indigo-600","bg-emerald-600","border-emerald-600","bg-amber-500","border-amber-500","bg-red-600","border-red-600"),c.classList.add("bg-white","text-slate-600","border-slate-200")}),E.stockFilter==="ok"?o.classList.add("bg-emerald-600","text-white","border-emerald-600"):E.stockFilter==="alert"?o.classList.add("bg-amber-500","text-white","border-amber-500"):E.stockFilter==="empty"?o.classList.add("bg-red-600","text-white","border-red-600"):o.classList.add("bg-indigo-600","text-white","border-indigo-600"),o.classList.remove("bg-white","text-slate-600","border-slate-200"),Re();return}if(e.target.id==="clear-filters-btn"){e.preventDefault(),document.getElementById("filterCategoryId").value="all",E.filterCategoryId="all",Re();return}if(e.target.id==="apply-filter-btn"){e.preventDefault(),E.filterCategoryId=document.getElementById("filterCategoryId").value,Re();return}const r=e.target.closest("#toggle-filter-btn");if(r){e.preventDefault(),E.isAdvancedFilterOpen=!E.isAdvancedFilterOpen;const c=document.getElementById("filter-panel");E.isAdvancedFilterOpen?(c.classList.remove("hidden"),c.classList.add("block"),r.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.classList.remove("bg-white","text-slate-700","border-slate-200")):(c.classList.add("hidden"),c.classList.remove("block"),r.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),r.classList.add("bg-white","text-slate-700","border-slate-200"));return}if(e.target.id==="products-layout-detail"){la();return}if(e.target.id==="movement-layout-detail"){ds();return}const n=e.target.closest("[data-add-supplier]");if(n){E.tempSupplierIds.add(n.dataset.addSupplier);const c=document.getElementById("modalSupplierSearch");c&&(c.value=""),c.dispatchEvent(new Event("input"));return}const l=e.target.closest("[data-remove-supplier]");if(l){E.tempSupplierIds.delete(l.dataset.removeSupplier);const c=document.getElementById("modalSupplierSearch");c&&c.dispatchEvent(new Event("input"));return}const d=e.target.closest("[data-action]");if(!d)return;const u=d.dataset.action;switch(["close-detail-screen","close-movement-modal","delete-product","manage-categories","open-product-editor","batch-delete","open-new-movement-modal","batch-delete-movements"].includes(u)&&e.stopPropagation(),u){case"manage-categories":zl();break;case"open-product-editor":Ul(d.dataset.id);break;case"close-detail-screen":la();break;case"close-movement-modal":ds();break;case"batch-delete":Wl();break;case"batch-delete-movements":Jl();break;case"open-new-movement-modal":_l();break;case"delete-movement":{const c=d.dataset.id,p=d.dataset.productId,b=d.dataset.estId;if(!c)return;const m=E.allMovements.find(y=>y.id===c);if(!m){g("Aviso","Não foi possível ler os detalhes desta movimentação.","warning");return}if(await G("Estornar e Apagar Movimentação","Tem a certeza que deseja excluir esta movimentação? O saldo de stock será devolvido ao produto de forma automática."))try{throw await Fa(p,{change:-m.change,reason:"Estorno automático de exclusão de movimento",establishmentId:b}),new Error("A função de excluir movimentação ainda não está implementada no servidor.");re(f.establishmentId,_e(),"Estoque","Excluiu Movimento",`Excluiu e estornou a movimentação ID: ${c}`),g("Sucesso","Movimentação excluída e saldo de stock estornado.","success"),await Le()}catch(y){g("Erro",y.message,"error")}break}case"delete-product":{const c=d.dataset.id;if(!c)return;if(await G("Apagar Produto","Tem certeza que deseja excluir este produto do estoque?"))try{const b=E.products.find(m=>m.id===c)?.name||"Desconhecido";await Cs(c),re(f.establishmentId,_e(),"Produtos","Excluiu",`Excluiu o produto: ${b}`),g("Sucesso","Produto removido do estoque.","success"),la(),await Le()}catch(b){g("Erro",`Não foi possível apagar o produto: ${b.message}`,"error")}break}}},document.body.addEventListener("click",Wt),Jt=e=>{e.target.id==="searchInput"&&(E.searchQuery=e.target.value,Re())},ls.addEventListener("input",Jt)}const da=document.getElementById("content");let J={partners:[],establishments:[],searchQuery:"",categoryFilter:"all",stateFilter:"all",cityFilter:"",sortBy:"name_asc",hasSearched:!1,viewMode:"list",editingItem:null},Gt=null;const wa={contas_fixas:{label:"Contas Fixas (Água, Luz)",color:"blue",icon:"bi-lightning-charge"},estoque:{label:"Fornecedor de Produtos",color:"emerald",icon:"bi-box-seam"},servicos:{label:"Prestador de Serviço",color:"purple",icon:"bi-tools"},impostos:{label:"Governo / Impostos",color:"red",icon:"bi-bank"},outros:{label:"Outros Parceiros",color:"gray",icon:"bi-person-vcard"}},hi=["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];async function Ql(){try{const e=(await ke()).matrizes||[];J.establishments=[],e.forEach(a=>{J.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>J.establishments.push({id:s.id,name:s.name,type:"Filial"}))})}catch(t){console.warn("Erro ao buscar lojas",t)}J.viewMode="list",J.editingItem=null,J.hasSearched=!1,J.partners=[],Yl(),ad(),vi()}function Yl(){da.innerHTML=`
        <div class="flex flex-col h-full bg-gray-50 w-full relative min-h-0 overflow-hidden">
            
            <div id="suppliers-list-view" class="w-full h-full flex flex-col transition-all duration-300 ${J.viewMode==="list"?"flex":"hidden"} p-2 md:p-4 md:pl-6 relative">
                
                <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full animate-fade-in">
                    <div></div> <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                        <button data-action="new-partner" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                            <i class="bi bi-plus-lg"></i> Novo Parceiro
                        </button>
                    </div>
                </div>

                ${Xl()}

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
    `}function Xl(){const t=Object.entries(wa).map(([a,s])=>`<option value="${a}">${s.label}</option>`).join(""),e=hi.map(a=>`<option value="${a}">${a}</option>`).join("");return`
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
    `}function Zl(t=null){const e=!!t;let a=t?.category||"";a==="Produtos"&&(a="estoque"),a==="Serviços"&&(a="servicos");const s=Object.entries(wa).map(([r,n])=>`<option value="${r}" ${a===r?"selected":""}>${n.label}</option>`).join(""),i=hi.map(r=>`<option value="${r}" ${t?.state===r?"selected":""}>${r}</option>`).join(""),o=document.getElementById("form-container-wrapper");o&&(o.innerHTML=`
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
                                    ${i}
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
    `,document.getElementById("partner-form").addEventListener("submit",ed))}function vi(){const t=document.getElementById("partners-grid");t&&(t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-xl w-full max-w-2xl mx-auto shadow-sm mt-4">
                <div class="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3 border border-indigo-100 shadow-inner">
                    <i class="bi bi-search text-xl text-indigo-400"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-800 mb-1">Pronto para pesquisar</h3>
                <p class="text-[10px] text-gray-500 font-medium max-w-sm text-center">Utilize os filtros acima e clique em "Buscar" para listar os parceiros registados no sistema.</p>
            </div>
        `)}async function Kl(){const t=document.getElementById("partners-grid");if(!J.hasSearched){vi();return}t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="text-xs text-gray-500 mt-4 font-medium">Buscando parceiros...</p></div>';try{const e=await qt(f.establishmentId);J.partners=e||[],yi()}catch(e){t.innerHTML=`<div class="text-center py-10 text-red-500 text-sm font-bold">Erro ao carregar parceiros: ${e.message}</div>`}}function yi(){const t=document.getElementById("partners-grid");if(!t)return;let e=J.partners;if(J.searchQuery){const i=J.searchQuery.toLowerCase();e=e.filter(o=>o.name.toLowerCase().includes(i)||o.document&&o.document.includes(i)||o.taxId&&o.taxId.includes(i)||o.email&&o.email.toLowerCase().includes(i)||o.contactName&&o.contactName.toLowerCase().includes(i))}if(J.categoryFilter!=="all"&&(e=e.filter(i=>i.category===J.categoryFilter)),J.stateFilter!=="all"&&(e=e.filter(i=>i.state===J.stateFilter)),J.cityFilter){const i=J.cityFilter.toLowerCase();e=e.filter(o=>o.city&&o.city.toLowerCase().includes(i))}if(e.sort((i,o)=>{let r="",n="";return J.sortBy==="name_asc"||J.sortBy==="name_desc"?(r=(i.name||"").toLowerCase(),n=(o.name||"").toLowerCase()):J.sortBy==="contact_asc"&&(r=(i.contactName||"").toLowerCase(),n=(o.contactName||"").toLowerCase()),J.sortBy==="name_desc"?n.localeCompare(r):r.localeCompare(n)}),e.length===0){t.innerHTML=`
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
    `,s='<div class="flex flex-col gap-2 md:hidden p-2">';e.forEach(i=>{let o=i.category;o==="Produtos"&&(o="estoque"),o==="Serviços"&&(o="servicos");const r=wa[o]||wa.outros,n=i.document||i.taxId?i.document||i.taxId:"-",l=JSON.stringify(i).replace(/'/g,"&apos;"),d=[i.city,i.state].filter(Boolean).join(" - ");a+=`
            <tr class="hover:bg-gray-50 cursor-pointer transition-colors group" data-action="open-form" data-item='${l}'>
                <td class="px-3 py-2 text-center">
                    <div class="w-8 h-8 mx-auto rounded-lg bg-${r.color}-100 text-${r.color}-600 flex items-center justify-center text-sm shadow-sm" title="${r.label}">
                        <i class="bi ${r.icon}"></i>
                    </div>
                </td>
                <td class="px-3 py-2">
                    <p class="font-bold text-gray-800 text-xs group-hover:text-indigo-700 transition-colors">${v(i.name)}</p>
                    ${i.email?`<p class="text-[9px] text-gray-500 mt-0.5 truncate max-w-[200px]"><i class="bi bi-envelope mr-1 opacity-50"></i>${v(i.email)}</p>`:""}
                </td>
                <td class="px-3 py-2 text-xs font-medium text-gray-600">${v(n)}</td>
                <td class="px-3 py-2">
                    <div class="text-xs font-medium text-gray-800">${v(i.contactName||"-")}</div>
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
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-${r.color}-500"></div>
                <div class="flex gap-3">
                    <div class="w-10 h-10 rounded-lg bg-${r.color}-100 text-${r.color}-600 flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                        <i class="bi ${r.icon}"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">${r.label.split(" ")[0]}</p>
                        <h3 class="font-bold text-gray-900 text-xs leading-tight truncate">${v(i.name)}</h3>
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
        `}),a+="</tbody></table></div>",s+="</div>",t.innerHTML=a+s}function Et(t,e=null){const a=document.getElementById("suppliers-list-view"),s=document.getElementById("suppliers-form-view");J.viewMode=t,J.editingItem=e,t==="list"?(a.classList.remove("hidden"),a.classList.add("flex"),s.classList.add("hidden"),s.innerHTML='<div id="form-container-wrapper" class="max-w-4xl mx-auto w-full"></div>',J.hasSearched&&yi(),window.scrollTo({top:0,behavior:"smooth"})):(a.classList.add("hidden"),a.classList.remove("flex"),s.classList.remove("hidden"),Zl(e),window.scrollTo({top:0,behavior:"smooth"}))}async function ed(t){t.preventDefault();const e=t.target,a=e.querySelector("#supId").value,s={name:e.querySelector("#supName").value,contactName:e.querySelector("#supContact").value,email:e.querySelector("#supEmail").value,phone:e.querySelector("#supPhone").value,document:e.querySelector("#supTaxId").value,category:e.querySelector("#supCategory").value,state:e.querySelector("#supState").value,city:e.querySelector("#supCity").value,establishmentId:f.establishmentId,notes:e.querySelector("#supNotes")?.value||"",accessibleIn:[f.establishmentId]},i=e.querySelector('button[type="submit"]'),o=i.innerHTML;i.disabled=!0,i.innerHTML='<div class="loader-small border-white"></div> A gravar...';try{a?(await Bl(a,s),g("Sucesso","Ficha atualizada!","success")):(await Ml(s),g("Sucesso","Parceiro registado!","success")),J.hasSearched&&(J.partners=await qt(f.establishmentId)||[]),Et("list")}catch(r){g("Erro","Falha ao gravar: "+r.message,"error"),i.disabled=!1,i.innerHTML=o}}async function td(t){if(await G("Excluir Parceiro","Deseja realmente apagar esta ficha permanentemente?"))try{await Al(t),g("Sucesso","Entidade excluída.","success"),J.partners=J.partners.filter(a=>a.id!==t),Et("list")}catch(a){g("Erro","Erro ao excluir: "+a.message,"error")}}function ad(){Gt&&da.removeEventListener("click",Gt),Gt=async t=>{const e=t.target;if(e.closest('button[data-action="new-partner"]')){Et("form",null);return}if(e.closest("#btn-search-partners")){J.searchQuery=document.getElementById("filterSearch").value,J.categoryFilter=document.getElementById("filterCategory").value,J.stateFilter=document.getElementById("filterState").value,J.cityFilter=document.getElementById("filterCity").value,J.sortBy=document.getElementById("filterSortBy").value,J.hasSearched=!0,Kl();return}if(e.closest('button[data-action="back-to-list"]')){Et("list");return}const a=e.closest('button[data-action="delete-partner"]');if(a){t.preventDefault(),td(a.dataset.id);return}const s=e.closest('[data-action="open-form"]');if(s&&!e.closest("button")){const i=JSON.parse(s.dataset.item.replace(/&apos;/g,"'"));Et("form",i)}},da.addEventListener("click",Gt),da.addEventListener("keypress",t=>{t.key==="Enter"&&(t.target.id==="filterSearch"||t.target.id==="filterCity")&&document.getElementById("btn-search-partners").click()})}const us=document.getElementById("content"),to={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let U={professionals:null,services:[],hierarchyCache:[],statusFilter:"all",searchQuery:"",filterServiceId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set,viewMode:"list",tempProf:null},Qt=null,Yt=null;function ca(){const t=we.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function wi(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[f.establishmentId]}function sd(){const t=document.getElementById("professionals-layout-detail"),e=document.getElementById("prof-modal-inner");t&&e&&(t.classList.remove("hidden"),t.classList.add("flex"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("scale-95","translate-y-4"),e.classList.add("scale-100","translate-y-0")},10),document.body.style.overflow="hidden")}function Xt(){const t=document.getElementById("professionals-layout-detail"),e=document.getElementById("prof-modal-inner");t&&e&&(t.classList.add("opacity-0"),e.classList.remove("scale-100","translate-y-0"),e.classList.add("scale-95","translate-y-4"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.body.style.overflow=""},300)),U.viewMode="list"}async function od(){U.selectedIds.clear(),U.viewMode="list",U.professionals=null;try{const t=await ke();U.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}id(),gd(),await ka()}function id(){us.innerHTML=`
        <div class="h-full flex w-full relative overflow-hidden bg-slate-50">
            <section id="professionals-layout-main" class="flex-1 flex flex-col p-4 md:pl-6 md:pr-6 md:pt-6 w-full relative overflow-y-auto custom-scrollbar">
                
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

                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 animate-fade-in w-full">
                    <div class="relative w-full md:w-96 flex-shrink-0">
                        <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input type="text" id="searchInput" value="${U.searchQuery}" placeholder="Nome ou especialidade..." class="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-sm font-semibold text-slate-700">
                    </div>
                    
                    <div class="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
                        <button id="toggle-filter-btn" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95 ${U.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                            <i class="bi bi-funnel text-base"></i> Filtros
                        </button>
                        <button data-action="open-professional-editor" data-id="" class="py-2.5 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-500/30 flex items-center justify-center gap-2 text-xs active:scale-95 uppercase tracking-wider border border-indigo-500">
                            <i class="bi bi-person-plus-fill text-base"></i> Criar Perfil
                        </button>
                    </div>
                </div>

                <div id="filter-panel" class="${U.isAdvancedFilterOpen?"block":"hidden"} mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
                    <div class="flex flex-col md:flex-row items-end gap-3">
                        <div class="w-full md:w-64">
                            <label class="block text-[9px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Serviço Habilitado</label>
                            <select id="filterServiceId" class="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-colors">
                                <option value="all">Todos os serviços</option>
                            </select>
                        </div>
                        <div class="flex gap-2 w-full md:w-auto">
                            <button id="clear-filters-btn" class="w-full md:w-auto px-5 py-2.5 bg-slate-100 text-slate-700 font-black rounded-lg hover:bg-slate-200 transition-colors text-xs uppercase tracking-wider border border-slate-200">Limpar</button>
                            <button id="apply-filter-btn" class="w-full md:w-auto px-6 py-2.5 bg-indigo-600 text-white font-black rounded-lg shadow-md hover:bg-indigo-700 active:scale-95 transition-all text-xs uppercase tracking-wider">Aplicar</button>
                        </div>
                    </div>
                </div>

                <div id="summary-section" class="grid grid-cols-4 gap-2 md:gap-4 mb-4 animate-fade-in w-full"></div>

                <div class="flex gap-2 overflow-x-auto pb-2 w-full custom-scrollbar mb-2 animate-fade-in flex-shrink-0">
                    <button data-status="all" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${U.statusFilter==="all"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Todos</button>
                    <button data-status="active" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${U.statusFilter==="active"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Ativos</button>
                    <button data-status="inactive" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${U.statusFilter==="inactive"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Inativos</button>
                </div>

                <div id="professionalsList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                    ${Si(8)}
                </div>
            </section>
        </div>

        <div id="professionals-layout-detail" class="hidden fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="prof-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-5xl flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
                </div>
        </div>
    `}async function ka(){const t=document.getElementById("professionalsList"),e=wi();try{const a=e.map(l=>De(l)),s=e.map(l=>Ue(l)),i=await Promise.all(a),o=await Promise.all(s),r=new Map;i.flat().forEach(l=>r.set(l.id,l)),U.professionals=Array.from(r.values()),f.professionals=U.professionals;const n=new Map;o.flat().forEach(l=>n.set(l.id,l)),U.services=Array.from(n.values()),rd(),wt()}catch(a){console.error(a),t&&(t.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>')}}function rd(){const t=document.getElementById("filterServiceId");t&&U.services&&(t.innerHTML='<option value="all">Todos os serviços</option>',U.services.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=v(e.name),U.filterServiceId===e.id&&(a.selected=!0),t.appendChild(a)}))}function ki(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=U.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function nd(t){const e=document.getElementById("summary-section");if(!e)return;const a=t.length,s=t.filter(o=>o.status!=="inactive").length,i=a-s;e.innerHTML=`
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Total Equipe</span>
            <span class="text-base md:text-2xl font-black text-slate-800 mt-0.5 w-full truncate">${a}</span>
        </div>
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Ativos</span>
            <span class="text-base md:text-2xl font-black text-emerald-600 mt-0.5 w-full truncate">${s}</span>
        </div>
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Inativos</span>
            <span class="text-base md:text-2xl font-black text-red-500 mt-0.5 w-full truncate">${i}</span>
        </div>
        <div class="bg-indigo-50 p-2 md:p-4 rounded-xl border border-indigo-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-indigo-500 uppercase tracking-widest w-full truncate">Exibidos</span>
            <span class="text-base md:text-2xl font-black text-indigo-700 mt-0.5 w-full truncate">${t.length}</span>
        </div>
    `}function wt(){const t=document.getElementById("professionalsList");if(!t)return;if(U.professionals===null){t.innerHTML=Si(8);return}const e=wi(),a=U.professionals.filter(s=>{const i=s.name.toLowerCase().includes(U.searchQuery)||s.specialty&&s.specialty.toLowerCase().includes(U.searchQuery);let o=!0;U.statusFilter==="active"&&(o=s.status!=="inactive"),U.statusFilter==="inactive"&&(o=s.status==="inactive");const r=U.filterServiceId==="all"||s.services&&s.services.includes(U.filterServiceId),n=s.accessibleIn&&s.accessibleIn.length>0?s.accessibleIn:[s.establishmentId||f.establishmentId],l=e.some(d=>n.includes(d));return i&&o&&r&&l});if(nd(a),a.length===0){U.professionals.length===0?t.innerHTML=`
                <div class="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
                    <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 border border-indigo-100">
                        <i class="bi bi-people text-3xl text-indigo-400"></i>
                    </div>
                    <h3 class="text-base font-black text-slate-800 mb-1">Nenhum profissional cadastrado</h3>
                    <p class="text-xs text-slate-500 max-w-sm text-center font-medium mb-6">A sua equipe de atendimento ainda está vazia. Adicione o seu primeiro profissional para começar a agendar!</p>
                    <button data-action="open-professional-editor" class="py-3 px-6 bg-indigo-600 text-white font-black rounded-xl shadow-md hover:bg-indigo-700 transition active:scale-95 uppercase tracking-wider text-xs flex items-center gap-2">
                        <i class="bi bi-person-plus-fill"></i> Cadastrar Agora
                    </button>
                </div>
            `:t.innerHTML=`
                <div class="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
                    <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                        <i class="bi bi-search text-2xl text-slate-300"></i>
                    </div>
                    <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhum resultado encontrado</h3>
                    <p class="text-[10px] text-slate-500 max-w-xs text-center font-medium">Tente ajustar os filtros ou limpar a barra de pesquisa.</p>
                    <button id="clear-filters-btn" class="mt-4 py-2 px-4 bg-slate-100 text-slate-600 font-bold rounded-lg border border-slate-200 text-[10px] uppercase tracking-wider hover:bg-slate-200 transition">Limpar Filtros</button>
                </div>
            `;return}t.innerHTML=a.map(s=>{const i=s.status==="inactive",o=v(s.name),r=v(s.specialty||"Especialidade"),n=s.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(s.name?s.name.charAt(0):"P")}`,l=s.accessibleIn?s.accessibleIn.length:1,d=s.services?s.services.length:0,u=U.selectedIds.has(s.id);return`
            <div class="professional-card relative bg-white rounded-2xl border ${u?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-slate-200"} shadow-sm flex items-center p-4 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 active:scale-[0.98] ${i?"opacity-60 bg-slate-50":""}" 
                 data-action="open-professional-editor" data-id="${s.id}">
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" data-action-stop-propagation="true">
                    <input type="checkbox" data-id="${s.id}" class="professional-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${u?"checked":""}>
                </div>

                <div class="relative flex-shrink-0 mr-4">
                    <img src="${n}" alt="${o}" class="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border border-slate-100 shadow-sm">
                    <span class="absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full ${i?"bg-red-500":"bg-emerald-500"}" title="${i?"Inativo":"Ativo"}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-6">
                    <h3 class="text-sm font-black text-slate-800 truncate leading-tight mb-1">${o}</h3>
                    <p class="text-[10px] font-bold text-slate-500 truncate uppercase tracking-widest mb-2">${r}</p>
                    
                    <div class="flex items-center gap-1.5 mt-1">
                        ${l>1?`<span class="text-[9px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${l}</span>`:'<span class="text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1"><i class="bi bi-geo-alt"></i> Única</span>'}
                        <span class="text-[9px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1" title="${d} serviços habilitados"><i class="bi bi-scissors text-indigo-400"></i> ${d}</span>
                    </div>
                </div>
            </div>`}).join("")}function Si(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center p-4 animate-pulse h-[98px]">
            <div class="w-14 h-14 rounded-full bg-slate-200 flex-shrink-0 mr-4"></div>
            <div class="flex-1 space-y-3">
                <div class="h-3 bg-slate-200 rounded w-3/4"></div>
                <div class="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}async function ld(t){U.viewMode="edit-professional";const e=document.getElementById("prof-modal-inner");if(!e)return;let a={name:"",specialty:"",status:"active",workingHours:{},services:[]};if(t){const r=U.professionals.find(n=>String(n.id)===String(t));r&&(a=JSON.parse(JSON.stringify(r)))}U.tempProf=a;const s=!!a.id,i=v(a.name||"Novo Profissional"),o=`
        <div class="p-4 md:p-5 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition-colors active:scale-95 mr-4">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <div>
                <h3 class="font-black text-sm md:text-base text-slate-800 uppercase tracking-wider truncate leading-tight">${s?"Editar Perfil":"Novo Perfil"}</h3>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">${s?i:"Configuração de Atendimento"}</p>
            </div>
            ${s?`
                <button data-action="delete-professional" data-id="${a.id}" class="ml-auto w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 border border-red-100 transition-colors active:scale-95" title="Excluir">
                    <i class="bi bi-trash3 text-base"></i>
                </button>
            `:""}
        </div>
    `;e.innerHTML=`
        ${o}
        
        <div class="modal-tabs px-2 md:px-6 border-b flex items-center justify-between overflow-x-auto bg-slate-50 flex-shrink-0 custom-scrollbar shadow-sm">
            <button class="tab-link active whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors uppercase tracking-widest" data-tab="dados-basicos">1. Básicos</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="atuacao">2. Atuação</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="jornada">3. Jornada</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="bloqueios">4. Bloqueios</button>
        </div>
        
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 p-3 md:p-6 relative"> 
            <form id="professionalForm" class="h-full w-full mx-auto">
                <input type="hidden" id="professionalId" value="${a.id||""}">
                <input type="hidden" id="profPhotoBase64" value="${a.photo||""}">
                
                <div id="dados-basicos" class="tab-content active space-y-4 md:space-y-6 animate-fade-in-fast"></div>
                <div id="atuacao" class="tab-content hidden space-y-4 md:space-y-6 animate-fade-in-fast"></div>
                <div id="jornada" class="tab-content hidden animate-fade-in-fast"></div>
                <div id="bloqueios" class="tab-content hidden animate-fade-in-fast"></div>
            </form>
        </div>

        <footer class="p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] w-full flex-shrink-0 z-50 flex gap-3 justify-end rounded-b-3xl">
            <button type="button" data-action="close-detail-screen" class="hidden md:block py-3 px-6 bg-slate-100 border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors shadow-sm">Cancelar</button>
            <button type="button" data-action="save-professional" class="w-full md:w-auto md:px-8 py-3 bg-indigo-600 text-white font-black text-xs md:text-sm rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider border border-indigo-600">
                <i class="bi bi-check2-circle text-lg"></i> Salvar Perfil
            </button>
        </footer>
    `,dd(a,U.services),ud(a),await bd(a,U.professionals),md(a),sd()}function dd(t,e){const a=document.getElementById("dados-basicos"),s=document.getElementById("atuacao");if(!a||!s)return;const i=t.dob?t.dob.split("/"):["",""],o=Array.from({length:12},(u,c)=>{const p=c+1,b=p==i[1]?"selected":"",m=new Date(0,c).toLocaleString("pt-BR",{month:"long"});return`<option value="${p}" ${b}>${m.charAt(0).toUpperCase()+m.slice(1)}</option>`}).join(""),r=v(t.name||""),n=v(t.specialty||""),l=v(t.phone||""),d=v(t.notes||"");a.innerHTML=`
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-1 space-y-4">
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col items-center">
                    <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Foto de Perfil</label>
                    <div class="relative group w-32 h-32 mb-5 cursor-pointer" id="profPhotoContainer">
                        <img id="profPhotoPreview" src="${t.photo||`https://placehold.co/150x150/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`}" alt="Foto de Perfil" class="w-full h-full rounded-full object-cover border-4 border-slate-50 shadow-md transition-all group-hover:brightness-75">
                        <div id="profPhotoButtonOverlay" class="absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                            <i class="bi bi-camera-fill text-white text-3xl drop-shadow-md"></i>
                        </div>
                    </div>
                    <input type="file" id="profPhotoInput" class="hidden" accept="image/*">
                    <button type="button" id="profPhotoButton" class="text-indigo-600 text-[10px] font-black uppercase tracking-wider hover:text-indigo-800 transition-colors w-full bg-indigo-50 py-2.5 rounded-xl border border-indigo-100 shadow-sm active:scale-95">Alterar Imagem</button>
                </div>

                 <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p class="text-xs font-black text-slate-800 uppercase tracking-wider mb-0.5">Status do Perfil</p>
                        <p class="text-[9px] font-bold text-slate-400">Inativos não aparecem na agenda.</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="profStatusToggle" class="sr-only peer" ${t.status!=="inactive"?"checked":""}>
                        <div class="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
                    </label>
                </div>
            </div>

            <div class="lg:col-span-2 space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div class="form-group sm:col-span-2">
                        <label for="profName" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome Completo *</label>
                        <input type="text" id="profName" value="${r}" required class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profSpecialty" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Especialidade / Cargo *</label>
                        <input type="text" id="profSpecialty" value="${n}" required placeholder="Ex: Cabeleireiro, Médico" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profPhone" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">WhatsApp / Telefone</label>
                        <input type="tel" id="profPhone" value="${l}" placeholder="(00) 00000-0000" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profDobDay" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Aniversário (Dia)</label>
                        <input type="number" id="profDobDay" value="${i[0]}" min="1" max="31" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profDobMonth" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Aniversário (Mês)</label>
                        <select id="profDobMonth" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors cursor-pointer">
                            <option value="">Selecione...</option>${o}
                        </select>
                    </div>
                </div>

                <div class="form-group pt-2">
                    <label for="profNotes" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Observações Internas</label>
                    <textarea id="profNotes" rows="3" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-medium text-slate-700 shadow-inner transition-colors placeholder-slate-400 resize-none" placeholder="Ex: Informações contratuais, detalhes de preferência...">${d}</textarea>
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
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
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
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                <div class="flex items-center mb-4 text-indigo-900 border-b border-slate-100 pb-4">
                    <div class="bg-indigo-100 w-12 h-12 rounded-xl mr-3 flex items-center justify-center border border-indigo-200"><i class="bi bi-diagram-3 text-2xl"></i></div>
                    <div>
                        <h3 class="text-sm font-black uppercase tracking-wider">Lojas de Atendimento</h3>
                        <p class="text-[9px] font-bold text-slate-400">Unidades onde atende.</p>
                    </div>
                </div>
                <div class="flex-1 overflow-y-auto max-h-80 custom-scrollbar pr-2">
                    ${cd(t.accessibleIn||[])}
                </div>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
                    <div class="flex items-center text-emerald-900">
                        <div class="bg-emerald-100 w-12 h-12 rounded-xl mr-3 flex items-center justify-center border border-emerald-200"><i class="bi bi-scissors text-2xl"></i></div>
                        <div>
                            <h3 class="text-sm font-black uppercase tracking-wider">Serviços Habilitados</h3>
                            <p class="text-[9px] font-bold text-slate-400">O que o profissional faz.</p>
                        </div>
                    </div>
                    <button type="button" id="selectAllServicesBtn" class="text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-2 rounded-lg transition-colors border border-indigo-100 active:scale-95 shadow-sm">
                        Selecionar Todos
                    </button>
                </div>
                
                <div id="profServicesContainer" class="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 overflow-y-auto max-h-80 custom-scrollbar pr-2">
                    ${e.map(u=>`
                        <label class="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl cursor-pointer transition-colors border border-slate-200 hover:border-indigo-300 hover:shadow-sm">
                            <input type="checkbox" value="${u.id}" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-5 w-5" ${t.services?.includes(u.id)?"checked":""}>
                            <span class="text-xs font-bold text-slate-700 truncate" title="${v(u.name)}">${v(u.name)}</span>
                        </label>
                    `).join("")}
                    ${e.length===0?'<p class="col-span-full text-center text-xs font-bold text-slate-400 py-8 border border-dashed border-slate-200 rounded-xl">Nenhum serviço cadastrado no sistema.</p>':""}
                </div>
            </div>
        </div>
    `}function cd(t=[]){if(!U.hierarchyCache||U.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${f.establishmentId}">
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 text-center">
                <i class="bi bi-info-circle text-2xl block mb-2 text-slate-400"></i> Exclusivo desta unidade.
            </div>`;let e='<div class="space-y-2 mt-1">';return U.hierarchyCache.forEach(a=>{const s=t.includes(a.id)||t.length===0&&a.id===f.establishmentId;e+=`
            <label class="flex items-center space-x-3 p-3 cursor-pointer bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-colors shadow-sm">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-xs md:text-sm font-black text-slate-800">🏢 ${v(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(i=>{const o=t.includes(i.id)||t.length===0&&i.id===f.establishmentId;e+=`
                    <label class="flex items-center space-x-3 p-3 ml-8 cursor-pointer bg-white hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl transition-colors border-l-4 border-l-indigo-200 shadow-sm">
                        <input type="checkbox" name="accessibleIn" value="${i.id}" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                        <span class="text-xs font-bold text-slate-600">📍 ${v(i.name)}</span>
                    </label>
                `})}),e+="</div>",e}function ud(t){const e=document.getElementById("jornada");e&&(e.innerHTML=`
        <div class="bg-white p-5 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div class="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div class="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100"><i class="bi bi-clock-history text-2xl"></i></div>
                <div>
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-0.5">Jornada Semanal</h3>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Defina os dias e os horários de atendimento.</p>
                </div>
            </div>
            <div id="profScheduleContainer" class="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
        </div>`,pd(e.querySelector("#profScheduleContainer"),t.workingHours||{}))}function pd(t,e){t.innerHTML=Object.keys(to).map(a=>{const s=e[a]||{},i=s.active!==!1;return`
            <div class="day-schedule-card p-4 md:p-5 rounded-2xl ${i?"bg-white border-slate-200 shadow-sm":"bg-slate-50 border-slate-100 disabled opacity-60"} border transition-all">
                 <div class="flex justify-between items-center mb-4">
                    <span class="font-black text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2"><i class="bi bi-calendar-day text-slate-400"></i> ${to[a]}</span>
                    <label class="flex items-center cursor-pointer">
                        <div class="relative">
                            <input type="checkbox" data-day="${a}" data-field="active" class="sr-only" ${i?"checked":""}>
                            <div class="toggle-bg block bg-slate-200 w-12 h-6 rounded-full peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full shadow-inner"></div>
                        </div>
                    </label>
                 </div>
                <div class="time-inputs grid grid-cols-2 gap-3 text-sm">
                    <div><label class="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5 ml-1">Abertura</label><input type="time" data-day="${a}" data-field="start" value="${s.start||"09:00"}" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner transition-shadow" ${i?"":"disabled"}></div>
                    <div><label class="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5 ml-1">Fecho</label><input type="time" data-day="${a}" data-field="end" value="${s.end||"18:00"}" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner transition-shadow" ${i?"":"disabled"}></div>
                    <div><label class="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5 ml-1">Início Pausa</label><input type="time" data-day="${a}" data-field="breakStart" value="${s.breakStart||"12:00"}" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner transition-shadow" ${i?"":"disabled"}></div>
                    <div><label class="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5 ml-1">Fim Pausa</label><input type="time" data-day="${a}" data-field="breakEnd" value="${s.breakEnd||"13:00"}" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner transition-shadow" ${i?"":"disabled"}></div>
                </div>
            </div>`}).join(""),t.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",s=>{const i=s.target.closest(".day-schedule-card"),o=!s.target.checked;i.classList.toggle("bg-white",!o),i.classList.toggle("shadow-sm",!o),i.classList.toggle("border-slate-200",!o),i.classList.toggle("bg-slate-50",o),i.classList.toggle("border-slate-100",o),i.classList.toggle("opacity-60",o),i.classList.toggle("disabled",o),i.querySelectorAll(".time-inputs input").forEach(r=>r.disabled=o)})})}async function bd(t,e){const a=document.getElementById("bloqueios");if(!a)return;a.innerHTML=`
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 bg-white p-5 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div class="border-b xl:border-b-0 xl:border-r border-slate-100 pb-6 xl:pb-0 xl:pr-8">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center border border-orange-100"><i class="bi bi-calendar-x text-2xl"></i></div>
                    <div>
                        <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-0.5">Lançar Bloqueio</h3>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Adicione férias ou ausências.</p>
                    </div>
                </div>
                
                <form id="batchBlockageForm" class="p-5 md:p-6 bg-orange-50/50 border border-orange-200 rounded-2xl space-y-5 shadow-sm">
                    <div>
                        <h4 class="font-bold text-slate-700 mb-2 text-[10px] uppercase tracking-widest ml-1">Aplicar aos Profissionais:</h4>
                        <div id="batchProfSelectionContainer" class="max-h-40 overflow-y-auto custom-scrollbar p-2.5 border border-orange-200 rounded-xl bg-white space-y-1.5 shadow-inner">
                            ${e.map(o=>`
                                <label class="flex items-center space-x-3 hover:bg-orange-50 p-2.5 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-orange-100">
                                    <input type="checkbox" name="batch-professionals" value="${o.id}" class="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500" ${o.id===t.id?"checked":""}>
                                    <span class="text-xs font-bold text-slate-700">${v(o.name)}</span>
                                </label>`).join("")}
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label for="batchBlockageStartDate" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Data Início *</label><input type="date" id="batchBlockageStartDate" required class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-xs font-bold bg-white shadow-inner"></div>
                        <div><label for="batchBlockageEndDate" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Data Fim (Opcional)</label><input type="date" id="batchBlockageEndDate" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-xs font-bold bg-white shadow-inner"></div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Hora Início *</label><input type="time" id="batchBlockageStartTime" required class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-xs font-bold bg-white shadow-inner"></div>
                        <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Hora Fim *</label><input type="time" id="batchBlockageEndTime" required class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-xs font-bold bg-white shadow-inner"></div>
                    </div>
                    <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Motivo / Descrição</label><input type="text" id="batchBlockageReason" placeholder="Ex: Férias, Consulta Médica..." class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium bg-white shadow-inner"></div>
                    <button type="submit" class="w-full bg-orange-500 text-white font-black py-3.5 rounded-xl hover:bg-orange-600 shadow-md shadow-orange-500/30 active:scale-95 transition-transform mt-4 uppercase tracking-wider text-xs border border-orange-600">Gravar Bloqueio na Agenda</button>
                </form>
            </div>
            <div class="xl:pl-2 flex flex-col">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3 border-b border-slate-100 pb-4">
                    <div>
                        <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-0.5">Registos Salvos</h3>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${v((t.name||"").split(" ")[0]||"Deste Perfil")}</p>
                    </div>
                    <select id="prof-blockages-filter" class="p-2.5 border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer transition-colors">
                        <option value="future">Apenas Futuros</option>
                        <option value="history">Histórico Passado</option>
                    </select>
                </div>
                <div id="blockagesList" class="space-y-4 flex-1 overflow-y-auto max-h-[500px] custom-scrollbar pr-2"></div>
            </div>
        </div>`;const s=document.getElementById("batchBlockageForm");s&&s.addEventListener("submit",async o=>{o.preventDefault();const r=s.querySelector('button[type="submit"]'),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';const l=Array.from(o.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(x=>x.value);if(l.length===0)return r.disabled=!1,r.innerHTML=n,g("Atenção","Selecione pelo menos um profissional.","error");const d=o.target.batchBlockageStartDate.value,u=o.target.batchBlockageEndDate.value||d,c=o.target.batchBlockageStartTime.value,p=o.target.batchBlockageEndTime.value,b=o.target.batchBlockageReason.value;if(!d||!c||!p)return r.disabled=!1,r.innerHTML=n,g("Atenção","Preencha Data de Início, Hora de Início e Fim.","error");const m=l.map(x=>{const y={professionalId:x,establishmentId:f.establishmentId,startTime:new Date(`${d}T${c}`).toISOString(),endTime:new Date(`${u}T${p}`).toISOString(),reason:b};return qa(y)});try{await Promise.all(m),g("Sucesso!",`${l.length} bloqueios foram criados.`),s.reset(),o.target.querySelectorAll('input[name="batch-professionals"]').forEach(y=>{y.checked=y.value===t.id});const x=document.getElementById("prof-blockages-filter").value;Lt(t.id,x)}catch(x){g("Erro",x.message,"error")}finally{r.disabled=!1,r.innerHTML=n}});const i=document.getElementById("prof-blockages-filter");i&&i.addEventListener("change",o=>Lt(t.id,o.target.value)),t.id&&await Lt(t.id,"future")}async function Lt(t,e="future"){const a=document.getElementById("blockagesList");if(a){if(a.innerHTML='<div class="loader mx-auto mt-10"></div>',!t){a.innerHTML=`
            <div class="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <i class="bi bi-info-circle text-3xl text-slate-300 mb-3 block"></i>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Salve o perfil para ver o histórico.</p>
            </div>`;return}try{const s=new Date;let i,o;e==="history"?(o=new Date,i=new Date,i.setFullYear(i.getFullYear()-2)):(i=new Date,o=new Date,o.setFullYear(o.getFullYear()+2));let n=(await ja(f.establishmentId,i.toISOString(),o.toISOString(),t)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));e==="history"?n=n.filter(d=>d.endTime<s).sort((d,u)=>u.startTime-d.startTime):n=n.filter(d=>d.endTime>=s).sort((d,u)=>d.startTime-u.startTime);const l=n.reduce((d,u)=>{const c=u.reason||"Sem motivo detalhado";return d[c]||(d[c]=[]),d[c].push(u),d},{});if(Object.keys(l).length===0){a.innerHTML=`
                <div class="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    <i class="bi bi-calendar-check text-4xl text-slate-300 mb-3 block"></i>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhum bloqueio ${e==="history"?"no histórico":"agendado para o futuro"}.</p>
                </div>`;return}a.innerHTML=Object.entries(l).map(([d,u])=>`
            <div class="bg-white border border-slate-200 rounded-xl shadow-sm mb-4 overflow-hidden">
                <div class="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                    <h4 class="font-black text-xs text-slate-800 flex items-center gap-2"><i class="bi bi-tag-fill text-orange-400 text-sm"></i> ${v(d)}</h4>
                    ${u.length>1?`<button data-action="batch-delete-blockage" data-ids='${JSON.stringify(u.map(c=>c.id))}' class="text-[9px] text-red-600 bg-red-50 hover:bg-red-100 font-bold px-3 py-1.5 rounded-lg border border-red-100 transition-colors uppercase tracking-widest active:scale-95 shadow-sm">Apagar Todos (${u.length})</button>`:""}
                </div>
                <div class="divide-y divide-slate-100 p-1.5">
                ${u.map(c=>`
                    <div class="flex justify-between items-center p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                        <div class="flex items-center gap-3 md:gap-4">
                            <div class="bg-orange-50 text-orange-600 border border-orange-100 w-12 h-12 rounded-xl flex flex-col items-center justify-center leading-none shadow-inner">
                                <span class="font-black text-base">${c.startTime.getDate().toString().padStart(2,"0")}</span>
                                <span class="text-[9px] uppercase font-bold mt-0.5">${c.startTime.toLocaleString("pt-BR",{month:"short"})}</span>
                            </div>
                            <div>
                                <p class="text-xs md:text-sm font-black text-slate-700">
                                   ${c.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} <span class="text-slate-400 font-medium">até</span> ${c.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}
                                </p>
                                ${c.startTime.getDate()!==c.endTime.getDate()?`<p class="text-[10px] text-slate-400 font-bold mt-1 bg-slate-100 px-2 py-0.5 rounded-md inline-block">Termina: ${c.endTime.toLocaleDateString("pt-BR")}</p>`:""}
                            </div>
                        </div>
                        <button data-action="delete-blockage" data-id="${c.id}" class="text-slate-400 hover:text-red-500 w-10 h-10 rounded-xl hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors flex items-center justify-center shadow-sm active:scale-95" title="Apagar">
                            <i class="bi bi-trash3 pointer-events-none text-base"></i>
                        </button>
                    </div>
                `).join("")}
                </div>
            </div>
        `).join("")}catch(s){a.innerHTML=`<p class="text-[10px] font-bold text-red-500 p-4 bg-red-50 rounded-xl border border-red-100">${s.message}</p>`}}}function md(t){const e=document.getElementById("prof-modal-inner");if(!e)return;const a=e.querySelectorAll(".tab-link");a.forEach(p=>{p.addEventListener("click",b=>{b.preventDefault(),a.forEach(y=>{y.classList.remove("active","border-indigo-600","text-indigo-600"),y.classList.add("border-transparent","text-slate-400")}),p.classList.add("active","border-indigo-600","text-indigo-600"),p.classList.remove("border-transparent","text-slate-400"),e.querySelectorAll(".tab-content").forEach(y=>y.classList.add("hidden"));const m=p.dataset.tab,x=e.querySelector("#"+m);x&&x.classList.remove("hidden")})});const s=e.querySelector("#profPhotoInput"),i=e.querySelector("#profPhotoButton"),o=e.querySelector("#profPhotoContainer"),r=e.querySelector("#profPhotoPreview"),n=e.querySelector("#profPhotoBase64"),l=t.photo||`https://placehold.co/150x150/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,d=t.photo||"",u=()=>s.click();i&&i.addEventListener("click",u),o&&o.addEventListener("click",u),s&&(s.onchange=async()=>{const p=s.files[0];if(p){r.src="https://placehold.co/150x150/E2E8F0/4A5568?text=...";try{const b=await Da(p,800,800,.8);if(b.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");r.src=b,n.value=b}catch(b){g("Erro de Imagem",b.message||"Não foi possível processar a imagem.","error"),r.src=l,n.value=d,s.value=""}}});const c=e.querySelector("#selectAllServicesBtn");if(c){c.addEventListener("click",()=>{const b=e.querySelectorAll('#profServicesContainer input[type="checkbox"]'),m=Array.from(b).every(x=>x.checked);b.forEach(x=>{x.checked=!m}),c.textContent=m?"Selecionar Todos":"Desmarcar Todos"});const p=e.querySelectorAll('#profServicesContainer input[type="checkbox"]');p.length>0&&Array.from(p).every(b=>b.checked)&&(c.textContent="Desmarcar Todos")}}function gd(){Qt&&document.body.removeEventListener("click",Qt),Yt&&us.removeEventListener("input",Yt),Qt=async t=>{if(t.target.classList.contains("professional-checkbox")){const o=t.target.dataset.id;t.target.checked?U.selectedIds.add(o):U.selectedIds.delete(o),ki(),t.stopPropagation();return}const e=t.target.closest(".status-filter-btn");if(e){U.statusFilter=e.dataset.status,document.querySelectorAll(".status-filter-btn").forEach(o=>{o.classList.remove("bg-indigo-600","text-white","border-indigo-600"),o.classList.add("bg-white","text-slate-600","border-slate-200")}),e.classList.remove("bg-white","text-slate-600","border-slate-200"),e.classList.add("bg-indigo-600","text-white","border-indigo-600"),wt();return}if(t.target.id==="clear-filters-btn"){t.preventDefault(),document.getElementById("filterServiceId").value="all",U.filterServiceId="all",wt();return}if(t.target.id==="apply-filter-btn"){t.preventDefault(),U.filterServiceId=document.getElementById("filterServiceId").value,wt();return}const a=t.target.closest("#toggle-filter-btn");if(a){t.preventDefault(),U.isAdvancedFilterOpen=!U.isAdvancedFilterOpen;const o=document.getElementById("filter-panel");U.isAdvancedFilterOpen?(o.classList.remove("hidden"),o.classList.add("block"),a.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200")):(o.classList.add("hidden"),o.classList.remove("block"),a.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"));return}const s=t.target.closest("[data-action]");if(!s){t.target.id==="professionals-layout-detail"&&Xt();return}const i=s.dataset.action;switch(["close-detail-screen","delete-professional","save-professional","delete-blockage","batch-delete-blockage"].includes(i)&&t.stopPropagation(),i){case"open-professional-editor":ld(s.dataset.id);break;case"close-detail-screen":Xt(),U.tempProf=null;break;case"batch-delete":fd();break;case"delete-professional":{const o=s.dataset.id,r=U.tempProf?.name||"Profissional";if(await G("Excluir Profissional",`Tem certeza que deseja excluir ${r}? Esta ação não pode ser desfeita.`))try{await Mo(o),re(f.establishmentId,ca(),"Equipe","Excluiu",`Excluiu profissional: ${r}`),g("Sucesso!","Profissional excluído da rede.","success"),Xt(),ka()}catch(l){g("Erro",`Não foi possível excluir: ${l.message}`,"error")}break}case"save-professional":{const o=document.getElementById("prof-modal-inner"),r=s,n=o.querySelector("#profScheduleContainer"),l=Array.from(o.querySelectorAll('#profServicesContainer input[type="checkbox"]:checked')).map(S=>S.value),d={};n&&n.querySelectorAll(".day-schedule-card").forEach(S=>{const L=S.querySelector('[data-field="active"]').dataset.day;d[L]={active:S.querySelector('[data-field="active"]').checked,start:S.querySelector('[data-field="start"]').value,end:S.querySelector('[data-field="end"]').value,breakStart:S.querySelector('[data-field="breakStart"]').value,breakEnd:S.querySelector('[data-field="breakEnd"]').value}});const u=Array.from(o.querySelectorAll('input[name="accessibleIn"]:checked')).map(S=>S.value),c=u.length>0?u:[f.establishmentId],p=o.querySelector("#profStatusToggle").checked,b=o.querySelector("#profCommissionToggle").checked,m=o.querySelector("#profShowOnAgendaToggle").checked,x={...U.tempProf,id:o.querySelector("#professionalId").value||void 0,accessibleIn:c,name:o.querySelector("#profName").value.trim(),specialty:o.querySelector("#profSpecialty").value,photo:o.querySelector("#profPhotoBase64").value,services:l,workingHours:d,phone:o.querySelector("#profPhone").value,dob:`${o.querySelector("#profDobDay").value}/${o.querySelector("#profDobMonth").value}`,receivesCommission:b,showOnAgenda:m,orderOnAgenda:parseInt(o.querySelector("#profOrderOnAgenda").value)||1,notes:o.querySelector("#profNotes").value,status:p?"active":"inactive",establishmentId:f.establishmentId},y=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{x.id?(await Ka(x.id,x),re(f.establishmentId,ca(),"Equipe","Editou",`Editou o profissional: ${x.name}`),g("Sucesso!","Dados atualizados.","success")):(delete x.id,await $r(x),re(f.establishmentId,ca(),"Equipe","Criou",`Cadastrou o profissional: ${x.name}`),g("Sucesso!","Novo membro adicionado à equipe.","success")),Xt(),ka()}catch(S){g("Erro",S.message,"error"),r.disabled=!1,r.innerHTML=y}break}case"delete-blockage":{const o=s.dataset.id;if(await G("Apagar Bloqueio","O profissional voltará a ficar disponível na agenda neste dia. Confirma?"))try{await $s(o),g("Bloqueio removido.","success");const r=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";Lt(U.tempProf.id,r)}catch(r){g("Erro",r.message,"error")}break}case"batch-delete-blockage":{const o=JSON.parse(s.dataset.ids);if(await G("Apagar em Lote",`Tem certeza que deseja apagar ${o.length} dias de bloqueio de uma vez?`))try{await Xo(o),g("Bloqueios removidos.","success");const r=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";Lt(U.tempProf.id,r)}catch(r){g("Erro",r.message,"error")}break}}},document.body.addEventListener("click",Qt),Yt=t=>{t.target.id==="searchInput"&&(U.searchQuery=t.target.value,wt())},us.addEventListener("input",Yt)}function fd(){G("Excluir em Lote",`Tem certeza que deseja excluir ${U.selectedIds.size} profissionais da rede? Esta ação não pode ser desfeita.`).then(async t=>{if(t)try{await Er(Array.from(U.selectedIds)),re(f.establishmentId,ca(),"Equipe","Excluiu em Lote",`Excluiu ${U.selectedIds.size} profissionais`),g("Sucesso!",`${U.selectedIds.size} profissionais foram excluídos.`,"success"),U.selectedIds.clear(),ki(),ka()}catch(e){g("Erro",`Não foi possível excluir em lote: ${e.message}`,"error")}})}let w={clients:[],selectedClient:null,establishments:[],filterEstablishmentIds:new Set,isAdvancedFilterOpen:!1,filters:{search:"",inactiveDays:"",hasLoyalty:!1,status:"all"},sortConfig:{key:"name",direction:"asc"},selectedIds:new Set,loading:!1,historyLimit:50,historyData:{appointments:[],sales:[],loyaltyLog:[],subscriptions:[]}},at=null,Zt=null,Kt=null;const As=t=>t?String(t).replace(/\D/g,""):"",ps=t=>{if(!t)return"Nunca";let e;if(typeof t=="object"&&(t.seconds||t._seconds)){const a=t.seconds||t._seconds;e=new Date(a*1e3)}else e=new Date(t);return isNaN(e.getTime())?"Data Inválida":e.toLocaleDateString("pt-BR")},bs=t=>{if(!t)return"CL";const e=t.trim().split(" ");return e.length>=2?(e[0][0]+e[e.length-1][0]).toUpperCase():t.substring(0,2).toUpperCase()};function xd(){const t=document.getElementById("clients-layout-detail"),e=document.getElementById("client-modal-inner");t&&e&&(t.classList.remove("hidden"),t.classList.add("flex"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("scale-95","translate-y-4"),e.classList.add("scale-100","translate-y-0")},10),document.body.style.overflow="hidden")}function Ve(){const t=document.getElementById("clients-layout-detail"),e=document.getElementById("client-modal-inner");t&&e&&(t.classList.add("opacity-0"),e.classList.remove("scale-100","translate-y-0"),e.classList.add("scale-95","translate-y-4"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.body.style.overflow=""},300)),w.selectedClient=null}async function hd(){at=document.getElementById("content"),w.selectedClient=null,w.selectedIds.clear(),w.isAdvancedFilterOpen=!1,w.filters={search:"",inactiveDays:"",hasLoyalty:!1,status:"all"},w.sortConfig={key:"name",direction:"asc"};try{const e=(await ke().catch(()=>({matrizes:[]}))).matrizes||[];w.establishments=[],e.forEach(a=>{w.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>w.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),w.filterEstablishmentIds.size===0&&w.filterEstablishmentIds.add(f.establishmentId)}catch(t){console.error("Erro ao buscar hierarquia",t)}vd(),kd(),await js()}function vd(){const t=w.establishments.map(e=>`
        <label class="inline-flex items-center gap-2 px-3 py-1.5 bg-white border ${w.filterEstablishmentIds.has(e.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-slate-200 text-slate-600"} rounded-xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm est-label select-none active:scale-95">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" value="${e.id}" ${w.filterEstablishmentIds.has(e.id)?"checked":""}>
            <span class="text-xs font-bold whitespace-nowrap">${e.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${e.name}</span>
        </label>
    `).join("");at.innerHTML=`
        <div class="h-full flex w-full relative overflow-hidden bg-slate-50">
            <section class="flex-1 flex flex-col p-4 md:pl-6 md:pr-6 md:pt-6 w-full relative overflow-y-auto custom-scrollbar">
                
                <div id="batch-action-bar" class="hidden absolute top-4 left-4 right-4 z-30 bg-slate-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down">
                    <div class="flex items-center gap-3">
                        <button id="cancel-selection-btn" class="p-1.5 hover:bg-slate-700 rounded-full transition-colors text-slate-300 hover:text-white">
                            <i class="bi bi-x-lg text-lg"></i>
                        </button>
                        <span class="font-bold text-sm tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Selecionados</span>
                    </div>
                    <button id="batch-delete-btn" class="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-sm active:scale-95">
                        <i class="bi bi-trash3"></i> Excluir Clientes
                    </button>
                </div>

                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 animate-fade-in w-full">
                    
                    <div class="flex items-center gap-2 w-full md:w-96 flex-shrink-0">
                        <div class="relative w-full">
                            <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                            <input type="text" id="searchInput" value="${w.filters.search}" placeholder="Buscar nome, telefone, CPF..." class="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 shadow-sm rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                        </div>
                        
                        <button id="open-mob-filter-btn" class="md:hidden flex-shrink-0 w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm active:scale-95">
                            <i class="bi bi-funnel-fill text-lg pointer-events-none"></i>
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-1 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
                        <button id="toggle-dsk-filter-btn" class="hidden md:flex py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm items-center justify-center gap-2 text-xs active:scale-95 ${w.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                            <i class="bi bi-funnel text-base"></i> Filtros
                        </button>
                        <button data-action="export-excel" class="hidden md:flex py-2.5 px-3 bg-white border border-slate-200 text-emerald-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm items-center justify-center gap-2 text-xs active:scale-95">
                            <i class="bi bi-file-earmark-excel-fill text-base"></i> Exportar
                        </button>
                        <button data-action="new-client" class="py-2.5 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-500/30 flex items-center justify-center gap-2 text-xs active:scale-95 uppercase tracking-wider border border-indigo-500 w-full md:w-auto">
                            <i class="bi bi-person-plus-fill text-base"></i> Novo Cliente
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

                <div id="desktop-filter-panel" class="${w.isAdvancedFilterOpen?"hidden md:block":"hidden"} mb-4 bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm animate-fade-in w-full">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label class="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Ordenar Por</label>
                            <select id="dsk-filter-sort" class="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-colors">
                                <option value="name_asc" ${w.sortConfig.key==="name"&&w.sortConfig.direction==="asc"?"selected":""}>Ordem Alfabética (A-Z)</option>
                                <option value="name_desc" ${w.sortConfig.key==="name"&&w.sortConfig.direction==="desc"?"selected":""}>Ordem Alfabética (Z-A)</option>
                                <option value="lastVisit_desc" ${w.sortConfig.key==="lastVisit"&&w.sortConfig.direction==="desc"?"selected":""}>Visita Recente</option>
                                <option value="lastVisit_asc" ${w.sortConfig.key==="lastVisit"&&w.sortConfig.direction==="asc"?"selected":""}>Ausentes há mais tempo</option>
                                <option value="financial_desc" ${w.sortConfig.key==="financial"&&w.sortConfig.direction==="desc"?"selected":""}>Maiores Devedores</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Filtro de Ausência</label>
                            <div class="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 shadow-inner h-[38px]">
                                <span class="text-xs font-bold text-slate-600 mr-2">> </span>
                                <input type="number" id="dsk-filter-inactive-days" value="${w.filters.inactiveDays}" placeholder="Ex: 30" class="w-full bg-transparent border-none text-xs font-black text-indigo-600 text-center outline-none p-0">
                                <span class="text-xs font-bold text-slate-600 ml-2">dias</span>
                            </div>
                        </div>
                        <div class="flex items-center h-[38px] pb-0.5">
                             <label class="flex items-center justify-between cursor-pointer w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors h-full shadow-inner">
                                <span class="text-xs font-bold text-slate-700 flex items-center gap-2"><i class="bi bi-star-fill text-amber-500"></i> Com Pontos</span>
                                <input type="checkbox" id="dsk-filter-loyalty" ${w.filters.hasLoyalty?"checked":""} class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 shadow-sm">
                            </label>
                        </div>
                        <div class="flex gap-2">
                            <button id="dsk-clear-filters-btn" class="w-full px-4 py-2.5 bg-slate-100 text-slate-700 font-black rounded-lg hover:bg-slate-200 transition-colors text-xs uppercase tracking-wider border border-slate-200">Limpar</button>
                            <button id="dsk-apply-filter-btn" class="w-full px-4 py-2.5 bg-indigo-600 text-white font-black rounded-lg shadow-md hover:bg-indigo-700 active:scale-95 transition-all text-xs uppercase tracking-wider">Aplicar</button>
                        </div>
                    </div>
                </div>

                <div id="summary-section" class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4 animate-fade-in flex-shrink-0 w-full"></div>

                <div class="flex gap-2 overflow-x-auto pb-2 w-full custom-scrollbar mb-2 animate-fade-in flex-shrink-0">
                    <button data-status="all" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${w.filters.status==="all"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Todos</button>
                    <button data-status="novos" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${w.filters.status==="novos"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Novos (Mês)</button>
                    <button data-status="devendo" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${w.filters.status==="devendo"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Em Débito</button>
                    <button data-status="aniversariantes" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${w.filters.status==="aniversariantes"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Aniversariantes</button>
                </div>

                <div class="flex-1 flex flex-col min-h-0 w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in relative z-10">
                    <div id="table-header-container"></div>
                    <div id="list-container" class="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-2">
                        <div class="flex justify-center py-20"><div class="loader"></div></div>
                    </div>
                </div>
            </section>
        </div>

        <div id="mob-filter-overlay" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300 md:hidden" style="z-index: 99998;"></div>
        <div id="mob-filter-sheet" class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh] transition-transform duration-300 transform translate-y-full md:hidden" style="z-index: 99999;">
            <div class="flex items-center justify-between p-5 border-b border-slate-100">
                <h3 class="font-black text-slate-800 text-lg flex items-center gap-2"><i class="bi bi-funnel text-indigo-500"></i> Filtros e Ordem</h3>
                <button id="close-mob-filter-sheet" class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            
            <div class="p-5 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                <div>
                    <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Características</label>
                    <label class="flex items-center justify-between p-4 border border-slate-200 rounded-xl cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        <span class="text-sm font-bold text-slate-700 flex items-center gap-2"><i class="bi bi-star-fill text-amber-500"></i> Têm Pontos de Fidelidade</span>
                        <input type="checkbox" id="mob-filter-loyalty" class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 shadow-sm" ${w.filters.hasLoyalty?"checked":""}>
                    </label>
                </div>

                <div>
                    <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Filtro de Ausência</label>
                    <div class="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 shadow-inner">
                        <span class="text-sm font-bold text-slate-600 mr-3">Sem visitar há > </span>
                        <input type="number" id="mob-filter-inactive-days" value="${w.filters.inactiveDays}" placeholder="Ex: 30" class="flex-1 bg-white border border-slate-300 rounded-lg text-sm font-black text-indigo-600 text-center py-1.5 outline-none focus:ring-2 focus:ring-indigo-500">
                        <span class="text-sm font-bold text-slate-600 ml-3">dias</span>
                    </div>
                </div>

                <div>
                    <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Ordenar Por</label>
                    <select id="mob-filter-sort" class="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm">
                        <option value="name_asc" ${w.sortConfig.key==="name"&&w.sortConfig.direction==="asc"?"selected":""}>Ordem Alfabética (A-Z)</option>
                        <option value="name_desc" ${w.sortConfig.key==="name"&&w.sortConfig.direction==="desc"?"selected":""}>Ordem Alfabética (Z-A)</option>
                        <option value="lastVisit_desc" ${w.sortConfig.key==="lastVisit"&&w.sortConfig.direction==="desc"?"selected":""}>Visita Recente</option>
                        <option value="lastVisit_asc" ${w.sortConfig.key==="lastVisit"&&w.sortConfig.direction==="asc"?"selected":""}>Ausentes há mais tempo</option>
                        <option value="financial_desc" ${w.sortConfig.key==="financial"&&w.sortConfig.direction==="desc"?"selected":""}>Maiores Devedores</option>
                    </select>
                </div>
            </div>
            
            <div class="p-4 border-t border-slate-100 bg-white">
                <button id="apply-mob-filters" class="w-full py-3.5 bg-indigo-600 text-white font-black text-sm rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-95 flex justify-center items-center gap-2">
                    <i class="bi bi-check2-all text-lg"></i> Aplicar Filtros
                </button>
                <div class="w-full" style="height: 80px;"></div>
            </div>
        </div>

        <div id="clients-layout-detail" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300" style="z-index: 99999;">
            <div id="client-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-4xl flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
            </div>
        </div>
    `}function yd(){const t=document.getElementById("table-header-container");if(!t)return;const e=a=>w.sortConfig.key!==a?'<i class="bi bi-arrow-down-up ml-1 opacity-40 text-xs"></i>':w.sortConfig.direction==="asc"?'<i class="bi bi-arrow-up ml-1 text-indigo-600"></i>':'<i class="bi bi-arrow-down ml-1 text-indigo-600"></i>';t.innerHTML=`
        <div class="hidden md:grid grid-cols-12 gap-2 px-4 py-3 text-[9px] font-black text-slate-500 uppercase tracking-widest items-center bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
            <div class="col-span-4 pl-2 flex items-center gap-3">
                <input type="checkbox" id="select-all-toggle" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${w.selectedIds.size>0&&w.selectedIds.size===w.clients.length?"checked":""}>
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
    `}async function js(){w.loading=!0;const t=document.getElementById("list-container");t&&(t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-slate-500 font-bold text-[10px] uppercase tracking-widest">Carregando clientes...</p></div>');try{const a=Array.from(w.filterEstablishmentIds).map(r=>{let n=`/api/clients/${r}?limit=1000`;return C(n).catch(()=>[])}),i=(await Promise.all(a)).flat(),o=new Map;i.forEach(r=>o.set(r.id,r)),w.clients=Array.from(o.values()),he()}catch(e){console.error(e),g("Erro","Falha ao carregar clientes.","error"),t&&(t.innerHTML='<div class="text-center py-10 text-red-500 font-bold text-sm">Erro ao carregar dados.</div>')}finally{w.loading=!1}}function wd(t){const e=document.getElementById("summary-section");if(!e)return;const a=new Date().getMonth()+1,s=new Date().getFullYear(),i=t.length;let o=0,r=0,n=0;t.forEach(l=>{if(l.totalDebt&&parseFloat(l.totalDebt)>0&&r++,l.dobMonth==a&&n++,l.createdAt){const d=new Date(l.createdAt);d.getMonth()+1===a&&d.getFullYear()===s&&o++}}),e.innerHTML=`
        <div class="bg-indigo-50 p-3 rounded-xl border border-indigo-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-indigo-500 uppercase tracking-widest w-full truncate">Total Exibidos</span>
            <span class="text-xl md:text-2xl font-black text-indigo-700 mt-0.5 w-full truncate">${i}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Novos (Mês)</span>
            <span class="text-xl md:text-2xl font-black text-emerald-600 mt-0.5 w-full truncate">${o}</span>
        </div>
        <div class="bg-red-50 p-3 rounded-xl border border-red-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-red-500 uppercase tracking-widest w-full truncate">Em Débito</span>
            <span class="text-xl md:text-2xl font-black text-red-600 mt-0.5 w-full truncate">${r}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Aniversariantes</span>
            <span class="text-xl md:text-2xl font-black text-amber-500 mt-0.5 w-full truncate">${n}</span>
        </div>
    `}function he(){yd();const t=document.getElementById("list-container");let e=w.clients;if(w.filters.search){const a=w.filters.search.toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(a)||s.phone&&s.phone.includes(a)||s.cpf&&s.cpf.includes(a))}if(w.filters.status==="devendo")e=e.filter(a=>a.totalDebt&&parseFloat(a.totalDebt)>0);else if(w.filters.status==="aniversariantes"){const a=new Date().getMonth()+1;e=e.filter(s=>s.dobMonth==a)}else if(w.filters.status==="novos"){const a=new Date().getMonth()+1,s=new Date().getFullYear();e=e.filter(i=>{if(!i.createdAt)return!1;const o=new Date(i.createdAt);return o.getMonth()+1===a&&o.getFullYear()===s})}if(w.filters.hasLoyalty&&(e=e.filter(a=>a.loyaltyPoints&&a.loyaltyPoints>0)),w.filters.inactiveDays){const a=parseInt(w.filters.inactiveDays),s=new Date;s.setDate(s.getDate()-a),e=e.filter(i=>{if(!i.lastVisit&&!i.createdAt)return!1;let o;if(i.lastVisit){const r=i.lastVisit.seconds||i.lastVisit._seconds;o=r?new Date(r*1e3):new Date(i.lastVisit)}else o=new Date(i.createdAt);return o<s})}if(e.sort((a,s)=>{let i,o;switch(w.sortConfig.key){case"name":return i=(a.name||"").toLowerCase(),o=(s.name||"").toLowerCase(),w.sortConfig.direction==="asc"?i.localeCompare(o):o.localeCompare(i);case"contact":return i=a.phone||"",o=s.phone||"",w.sortConfig.direction==="asc"?i.localeCompare(o):o.localeCompare(i);case"lastVisit":i=a.lastVisit?a.lastVisit.seconds?a.lastVisit.seconds:new Date(a.lastVisit).getTime()/1e3:a.createdAt?new Date(a.createdAt).getTime()/1e3:0,o=s.lastVisit?s.lastVisit.seconds?s.lastVisit.seconds:new Date(s.lastVisit).getTime()/1e3:s.createdAt?new Date(s.createdAt).getTime()/1e3:0;break;case"financial":i=parseFloat(a.totalDebt)||0,o=parseFloat(s.totalDebt)||0;break;default:i=a.name,o=s.name}return i<o?w.sortConfig.direction==="asc"?-1:1:i>o?w.sortConfig.direction==="asc"?1:-1:0}),wd(e),e.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm m-4">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                    <i class="bi bi-people text-3xl text-slate-300"></i>
                </div>
                <h3 class="text-base font-black text-slate-800 mb-1">Nenhum resultado</h3>
                <p class="text-[10px] text-slate-500 max-w-sm text-center font-bold uppercase tracking-widest mb-6">Tente ajustar a busca ou limpar os filtros.</p>
            </div>`;return}t.innerHTML=e.map(a=>{const s=a.totalDebt&&parseFloat(a.totalDebt)>0,i=ps(a.lastVisit),o=As(a.phone),r=new Date().getMonth()+1,n=a.dobMonth==r,l=w.selectedIds.has(a.id);let d="";return n&&(d+='<span class="bg-indigo-50 text-indigo-700 text-[8px] font-black px-1.5 py-0.5 rounded border border-indigo-200 uppercase tracking-wider shadow-sm flex items-center gap-1"><i class="bi bi-gift-fill"></i> Niver</span> '),a.loyaltyPoints>0&&(d+=`<span class="bg-amber-50 text-amber-700 text-[8px] font-black px-1.5 py-0.5 rounded border border-amber-200 uppercase tracking-wider shadow-sm flex items-center gap-1"><i class="bi bi-star-fill"></i> ${a.loyaltyPoints} pts</span> `),`
        <div class="border-b border-slate-100 hover:bg-slate-50 transition-colors relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-3 md:p-3 mb-2 md:mb-0 bg-white md:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none border md:border-b md:border-x-0 md:border-t-0 mx-2 md:mx-0 ${s?"border-l-4 border-l-red-400":"border-l-4 border-l-transparent hover:border-l-indigo-300"} ${l?"bg-indigo-50/40 ring-1 ring-indigo-200 border-indigo-200":""} cursor-pointer active:scale-[0.99] md:active:scale-100" data-action="open-modal" data-id="${a.id}">
            
            <div class="flex justify-between items-start md:hidden mb-2 relative">
                <div class="absolute -top-1 -right-1 z-20">
                    <input type="checkbox" value="${a.id}" class="item-checkbox w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${l?"checked":""} data-action-stop-propagation="true">
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl ${s?"bg-red-50 text-red-600 border border-red-100":"bg-slate-100 text-slate-600 border border-slate-200"} flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm">
                        ${bs(a.name)}
                    </div>
                    <div class="pr-6 min-w-0">
                        <p class="font-black text-sm text-slate-800 truncate max-w-[180px]">${v(a.name)}</p>
                        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">${v(a.phone||"Sem contato")}</p>
                    </div>
                </div>
                ${o?`<button data-action="whatsapp" data-phone="${o}" class="w-8 h-8 mt-5 bg-[#25D366]/10 text-[#25D366] rounded-xl flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors border border-[#25D366]/20 z-20 active:scale-95"><i class="bi bi-whatsapp text-[12px] pointer-events-none"></i></button>`:""}
            </div>

            <div class="hidden md:flex md:col-span-4 items-center gap-3 pl-2">
                <input type="checkbox" value="${a.id}" class="item-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm z-20 flex-shrink-0" ${l?"checked":""} data-action-stop-propagation="true">
                <div class="w-9 h-9 rounded-xl ${s?"bg-red-50 text-red-600 border border-red-100":"bg-slate-100 text-slate-600 border border-slate-200"} flex items-center justify-center font-black text-xs flex-shrink-0 shadow-sm">
                    ${bs(a.name)}
                </div>
                <div class="min-w-0 flex-1">
                    <p class="font-black text-sm text-slate-800 truncate" title="${v(a.name)}">${v(a.name)}</p>
                    <div class="flex gap-1.5 mt-1">${d}</div>
                </div>
            </div>

            <div class="hidden md:block md:col-span-3">
                <p class="text-[10px] font-black text-slate-700 uppercase tracking-widest">${v(a.phone||"--")}</p>
                <p class="text-[9px] text-slate-400 font-bold truncate w-full mt-0.5" title="${v(a.email||"")}">${v(a.email||"--")}</p>
            </div>

            <div class="md:col-span-2 md:text-center flex justify-between md:block items-center mb-2 md:mb-0">
                <span class="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest">Última Visita:</span>
                <span class="text-[9px] font-black text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200 uppercase tracking-wider flex items-center md:justify-center gap-1 shadow-sm w-fit md:w-auto md:mx-auto">
                    <i class="bi bi-calendar-check text-slate-400"></i> ${i}
                </span>
            </div>

            <div class="md:col-span-2 md:text-center flex justify-between md:block items-center mb-1 md:mb-0">
                <span class="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest">Situação:</span>
                ${s?`<span class="text-[9px] font-black text-red-700 bg-red-50 px-2.5 py-0.5 rounded-lg border border-red-200 uppercase tracking-wider shadow-sm flex items-center md:justify-center gap-1 w-fit md:w-auto md:mx-auto"><i class="bi bi-exclamation-circle text-red-500"></i> Dívida: R$ ${parseFloat(a.totalDebt).toFixed(2)}</span>`:'<span class="text-[9px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 uppercase tracking-wider shadow-sm flex items-center md:justify-center gap-1 w-fit md:w-auto md:mx-auto"><i class="bi bi-check-circle text-emerald-500"></i> Em dia</span>'}
            </div>

            <div class="hidden md:flex md:col-span-1 justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                ${o?`<button data-action="whatsapp" data-phone="${o}" class="w-8 h-8 rounded-xl flex items-center justify-center text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white transition-colors border border-[#25D366]/20 shadow-sm z-20 active:scale-95" title="WhatsApp"><i class="bi bi-whatsapp text-[12px] pointer-events-none"></i></button>`:""}
                <button class="w-8 h-8 rounded-xl flex items-center justify-center text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-100 shadow-sm active:scale-95" title="Editar Perfil"><i class="bi bi-pencil-fill text-[12px] pointer-events-none"></i></button>
            </div>
            
            <div class="md:hidden flex gap-1 mt-2 border-t border-slate-100 pt-3">
                ${d}
            </div>
        </div>
        `}).join("")}function kd(){Zt&&at.removeEventListener("click",Zt),Kt&&at.removeEventListener("input",Kt),Zt=l=>{const d=l.target;if(d.classList.contains("item-checkbox")){const m=d.value;d.checked?w.selectedIds.add(m):w.selectedIds.delete(m),ua();const x=d.closest('div[data-action="open-modal"]');d.checked?x.classList.add("bg-indigo-50/40","ring-1","ring-indigo-200","border-indigo-200"):x.classList.remove("bg-indigo-50/40","ring-1","ring-indigo-200","border-indigo-200"),l.stopPropagation();return}if(d.dataset.actionStopPropagation==="true"&&l.stopPropagation(),d.id==="select-all-toggle"){const m=d.checked,x=document.querySelectorAll(".item-checkbox");w.selectedIds.clear(),x.forEach(y=>{y.checked=m,m&&w.selectedIds.add(y.value);const S=y.closest('div[data-action="open-modal"]');m?S.classList.add("bg-indigo-50/40","ring-1","ring-indigo-200","border-indigo-200"):S.classList.remove("bg-indigo-50/40","ring-1","ring-indigo-200","border-indigo-200")}),ua(),l.stopPropagation();return}const u=d.closest("[data-sort]");if(u){const m=u.dataset.sort;w.sortConfig.key===m?w.sortConfig.direction=w.sortConfig.direction==="asc"?"desc":"asc":(w.sortConfig.key=m,w.sortConfig.direction="asc"),he();return}const c=d.closest(".status-filter-btn");if(c){w.filters.status=c.dataset.status,document.querySelectorAll(".status-filter-btn").forEach(m=>{m.classList.remove("bg-indigo-600","text-white","border-indigo-600"),m.classList.add("bg-white","text-slate-600","border-slate-200")}),c.classList.remove("bg-white","text-slate-600","border-slate-200"),c.classList.add("bg-indigo-600","text-white","border-indigo-600"),he();return}const p=d.closest("#toggle-dsk-filter-btn");if(p){l.preventDefault(),w.isAdvancedFilterOpen=!w.isAdvancedFilterOpen;const m=document.getElementById("desktop-filter-panel");w.isAdvancedFilterOpen?(m.classList.remove("hidden"),m.classList.add("md:block"),p.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200")):(m.classList.add("hidden"),m.classList.remove("md:block"),p.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"));return}if(d.id==="dsk-clear-filters-btn"){l.preventDefault(),document.getElementById("dsk-filter-sort").value="name_asc",document.getElementById("dsk-filter-inactive-days").value="",document.getElementById("dsk-filter-loyalty").checked=!1,w.filters.inactiveDays="",w.filters.hasLoyalty=!1,w.sortConfig.key="name",w.sortConfig.direction="asc",he();return}if(d.id==="dsk-apply-filter-btn"){l.preventDefault(),w.filters.inactiveDays=document.getElementById("dsk-filter-inactive-days").value,w.filters.hasLoyalty=document.getElementById("dsk-filter-loyalty").checked;const m=document.getElementById("dsk-filter-sort").value,[x,y]=m.split("_");w.sortConfig.key=x,w.sortConfig.direction=y;const S=document.getElementById("mob-filter-loyalty"),L=document.getElementById("mob-filter-inactive-days"),D=document.getElementById("mob-filter-sort");S&&(S.checked=w.filters.hasLoyalty),L&&(L.value=w.filters.inactiveDays),D&&(D.value=m),he();return}const b=d.closest("[data-action]");if(b){const m=b.dataset.action,x=b.dataset.id;if(m==="new-client"){ao(null);return}if(m==="open-modal"){ao(x);return}if(m==="close-detail-screen"){Ve();return}if(m==="whatsapp"){l.stopPropagation();const y=b.dataset.phone;window.open(`https://wa.me/55${y}`,"_blank");return}if(m==="export-excel"){Td();return}if(m==="manual-redeem"){l.stopPropagation(),l.preventDefault(),Pd(w.selectedClient);return}}if(d.id==="clients-layout-detail"){Ve();return}},Kt=l=>{l.target.id==="searchInput"&&(w.filters.search=l.target.value,he())},at.addEventListener("click",Zt),at.addEventListener("input",Kt);const t=document.getElementById("mob-filter-overlay"),e=document.getElementById("mob-filter-sheet"),a=document.getElementById("open-mob-filter-btn"),s=document.getElementById("close-mob-filter-sheet"),i=document.getElementById("apply-mob-filters"),o=()=>{e&&(e.classList.remove("translate-y-0"),e.classList.add("translate-y-full")),t&&(t.classList.add("opacity-0"),setTimeout(()=>{t.classList.add("hidden")},300))};a&&a.addEventListener("click",l=>{l.preventDefault(),t.classList.remove("hidden"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("translate-y-full"),e.classList.add("translate-y-0")},10)}),s&&s.addEventListener("click",o),t&&t.addEventListener("click",o),i&&i.addEventListener("click",()=>{w.filters.hasLoyalty=document.getElementById("mob-filter-loyalty").checked,w.filters.inactiveDays=document.getElementById("mob-filter-inactive-days").value;const l=document.getElementById("mob-filter-sort").value,[d,u]=l.split("_");w.sortConfig.key=d,w.sortConfig.direction=u;const c=document.getElementById("dsk-filter-loyalty"),p=document.getElementById("dsk-filter-inactive-days"),b=document.getElementById("dsk-filter-sort");c&&(c.checked=w.filters.hasLoyalty),p&&(p.value=w.filters.inactiveDays),b&&(b.value=l),he(),o()});const r=document.getElementById("cancel-selection-btn");r&&r.addEventListener("click",()=>{w.selectedIds.clear();const l=document.getElementById("select-all-toggle");l&&(l.checked=!1),document.querySelectorAll(".item-checkbox").forEach(d=>{d.checked=!1,d.closest('div[data-action="open-modal"]').classList.remove("bg-indigo-50/40","ring-1","ring-indigo-200","border-indigo-200")}),ua()});const n=document.getElementById("batch-delete-btn");n&&n.addEventListener("click",Sd),document.querySelectorAll(".est-filter-checkbox").forEach(l=>{l.addEventListener("change",d=>{const u=d.target.closest("label");d.target.checked?(w.filterEstablishmentIds.add(d.target.value),u.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),u.classList.remove("border-slate-200","text-slate-600")):(w.filterEstablishmentIds.delete(d.target.value),u.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),u.classList.add("border-slate-200","text-slate-600")),js()})})}function ua(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count");if(!t||!e)return;const a=w.selectedIds.size;e.textContent=a,a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex"))}async function Sd(){const t=w.selectedIds.size;if(!(t===0||!await G("Excluir Clientes",`Deseja realmente excluir permanentemente ${t} cliente(s)? O histórico de agendamentos será mantido, mas o cadastro será apagado.`)))try{const a=Array.from(w.selectedIds).map(i=>Ho(i));await Promise.all(a),g("Sucesso",`${t} cliente(s) excluído(s) com sucesso.`,"success"),w.selectedIds.clear(),ua();const s=document.getElementById("select-all-toggle");s&&(s.checked=!1),await js()}catch{g("Erro ao Excluir","Ocorreu um erro ao excluir alguns clientes.","error")}}function ao(t=null){t?(w.selectedClient=w.clients.find(a=>a.id===t),w.selectedClient.isNew=!1):w.selectedClient={isNew:!0,id:"",name:"",phone:"",email:"",cpf:"",gender:"",dobDay:"",dobMonth:"",source:"",notes:"",loyaltyPoints:0,totalDebt:0},w.historyData={appointments:[],sales:[],loyaltyLog:[],subscriptions:[]};const e=document.getElementById("client-modal-content")||document.getElementById("client-modal-inner");e&&(Id(e,w.selectedClient),xd(),w.selectedClient.isNew||ms(w.selectedClient))}function Id(t,e){const a=e.isNew,s=v(e.name||""),i=`
        <div class="p-4 md:p-5 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition-colors active:scale-95 mr-4 flex-shrink-0">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            
            <div class="w-10 h-10 md:w-12 md:h-12 rounded-full ${e.totalDebt>0?"bg-red-50 text-red-600 border-red-200":"bg-indigo-50 text-indigo-600 border-indigo-200"} border flex items-center justify-center font-black text-sm md:text-base mr-3 flex-shrink-0 shadow-sm">
                ${a?'<i class="bi bi-person-plus"></i>':bs(e.name)}
            </div>

            <div class="min-w-0 flex-1">
                <h3 class="font-black text-sm md:text-base text-slate-800 uppercase tracking-wider truncate leading-tight">${a?"Novo Cliente":s}</h3>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">${a?"Ficha Cadastral":`<i class="bi bi-whatsapp text-[9px] mr-1"></i> ${e.phone||"Sem Telefone"}`}</p>
            </div>
            
            ${a?"":`
                <button data-action="delete-client" class="ml-auto w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 border border-red-100 transition-colors active:scale-95 flex-shrink-0 shadow-sm" title="Excluir">
                    <i class="bi bi-trash3 text-base pointer-events-none"></i>
                </button>
            `}
        </div>
    `,o=`
        <div class="modal-tabs px-2 md:px-6 border-b flex items-center justify-start gap-4 overflow-x-auto bg-slate-50 flex-shrink-0 custom-scrollbar shadow-sm">
            <button class="tab-link active whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors uppercase tracking-widest active:scale-95" data-tab="tab-profile">1. Ficha e Perfil</button>
            ${a?"":`
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest active:scale-95" data-tab="tab-appointments">2. Agendamentos</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest active:scale-95" data-tab="tab-history">3. Finanças</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest active:scale-95" data-tab="tab-loyalty">4. Fidelidade</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest active:scale-95" data-tab="tab-subscriptions">5. Clubes VIP</button>
            `}
        </div>
    `;t.innerHTML=`
        ${i}
        ${o}
        
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 p-3 md:p-6 relative">
            <form id="form-edit-client" class="h-full w-full mx-auto max-w-4xl pb-32 md:pb-6">
                
                <div id="tab-profile" class="tab-content active space-y-4 md:space-y-6 animate-fade-in-fast">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                        
                        <div class="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center gap-2"><i class="bi bi-person-vcard text-indigo-500 text-lg"></i> Dados Pessoais</h3>
                            
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome Completo *</label>
                                <input type="text" name="name" value="${s}" required class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner transition-colors">
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="O Telefone é a chave que unifica o histórico do cliente.">WhatsApp * <i class="bi bi-info-circle text-indigo-400"></i></label>
                                    <input type="tel" name="phone" value="${v(e.phone||"")}" required placeholder="(00) 00000-0000" class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner transition-colors">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">CPF</label>
                                    <input type="text" name="cpf" value="${v(e.cpf||"")}" placeholder="000.000.000-00" class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner transition-colors">
                                </div>
                            </div>

                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">E-mail</label>
                                <input type="email" name="email" value="${v(e.email||"")}" class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner transition-colors">
                            </div>
                        </div>

                        <div class="space-y-4 md:space-y-6">
                            <div class="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center gap-2"><i class="bi bi-info-circle text-indigo-500 text-lg"></i> Detalhes Adicionais</h3>
                                
                                <div class="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Dia Nasc.</label>
                                        <input type="number" name="dobDay" min="1" max="31" value="${e.dobDay||""}" class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner text-center transition-colors">
                                    </div>
                                    <div>
                                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Mês Nasc.</label>
                                        <input type="number" name="dobMonth" min="1" max="12" value="${e.dobMonth||""}" class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner text-center transition-colors">
                                    </div>
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Gênero</label>
                                        <select name="gender" class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner cursor-pointer transition-colors">
                                            <option value="">Não informar</option>
                                            <option value="F" ${e.gender==="F"?"selected":""}>Feminino</option>
                                            <option value="M" ${e.gender==="M"?"selected":""}>Masculino</option>
                                            <option value="O" ${e.gender==="O"?"selected":""}>Outro</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Captação</label>
                                        <select name="source" class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner cursor-pointer transition-colors">
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

                            <div class="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center gap-2"><i class="bi bi-journal-text text-indigo-500 text-lg"></i> Anotações Internas</h3>
                                <textarea name="notes" rows="3" class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner resize-none transition-colors" placeholder="Histórico de alergias, preferências, observações...">${v(e.notes||"")}</textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="tab-appointments" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    <div class="max-w-3xl mx-auto">
                        <div class="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 mb-6 shadow-sm">
                            <p class="text-[10px] font-black text-indigo-800 uppercase tracking-widest flex items-center gap-2"><i class="bi bi-link-45deg text-lg"></i> Agendamentos unificados pelo número: ${e.phone||"N/A"}</p>
                        </div>
                        <div id="historico-agendamentos-container">
                            <div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Buscando histórico na base...</p></div>
                        </div>
                    </div>
                </div>

                <div id="tab-history" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    <div class="max-w-3xl mx-auto" id="historico-financeiro-container">
                        <div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calculando LTV...</p></div>
                    </div>
                </div>

                <div id="tab-loyalty" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    <div class="max-w-xl mx-auto" id="historico-fidelidade-container">
                        <div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Processando pontos...</p></div>
                    </div>
                </div>

                <div id="tab-subscriptions" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    <div class="max-w-3xl mx-auto" id="historico-assinaturas-container">
                        <div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Buscando assinaturas...</p></div>
                    </div>
                </div>

            </form>
        </div>

        <footer class="bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] w-full flex-shrink-0 md:rounded-b-3xl fixed md:relative bottom-0 left-0 right-0 z-50">
            <div class="p-4 flex gap-3 justify-end items-center h-full">
                <button type="button" data-action="close-detail-screen" class="hidden md:block py-3 px-6 bg-slate-100 border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors shadow-sm active:scale-95">Cancelar</button>
                <button type="submit" form="form-edit-client" class="w-full md:w-auto md:px-8 py-3.5 md:py-3 bg-indigo-600 text-white font-black text-xs md:text-sm rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider border border-indigo-600 mb-safe">
                    <i class="bi bi-save2 text-lg pointer-events-none"></i> Salvar Cliente
                </button>
            </div>
        </footer>
    `,t.querySelectorAll(".tab-link").forEach(l=>{l.addEventListener("click",d=>{d.preventDefault(),t.querySelectorAll(".tab-link").forEach(u=>{u.classList.remove("active","border-indigo-600","text-indigo-600"),u.classList.add("border-transparent","text-slate-400")}),l.classList.add("active","border-indigo-600","text-indigo-600"),l.classList.remove("border-transparent","text-slate-400"),t.querySelectorAll(".tab-content").forEach(u=>u.classList.add("hidden")),t.querySelector("#"+l.dataset.tab).classList.remove("hidden")})});const r=t.querySelector("#form-edit-client");r&&(r.onsubmit=Cd);const n=t.querySelector('[data-action="delete-client"]');n&&(n.onclick=Dd)}function $d(t){const e=new Date,a=t.filter(o=>new Date(o.date)>=e&&o.status!=="cancelled").sort((o,r)=>new Date(o.date)-new Date(r.date)),s=t.filter(o=>new Date(o.date)<e||o.status==="cancelled").sort((o,r)=>new Date(r.date)-new Date(o.date)),i=(o,r)=>{const n=new Date(o.date);let l="";o.status==="cancelled"?l='<span class="text-red-600 bg-red-50 px-2 py-0.5 rounded text-[9px] uppercase font-bold border border-red-200 shadow-sm">Cancelado</span>':o.status==="completed"||r?l='<span class="text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-[9px] uppercase font-bold border border-slate-200 shadow-sm">Concluído</span>':o.status==="confirmed"?l='<span class="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[9px] uppercase font-bold border border-blue-200 shadow-sm">Confirmado</span>':l='<span class="text-orange-700 bg-orange-50 px-2 py-0.5 rounded text-[9px] uppercase font-bold border border-orange-200 shadow-sm">Aguardando</span>';const d=w.establishments.find(u=>u.id===o.establishmentId)?.name||"Unidade Local";return`
        <div class="bg-white border border-slate-200 rounded-2xl p-3 flex gap-3 shadow-sm items-center cursor-pointer active:scale-[0.98] transition-transform hover:border-indigo-300" data-go-agenda="true" data-id="${o.id}" data-date="${o.date}" data-est="${o.establishmentId}">
            <div class="flex-shrink-0 text-center w-12 border-r border-slate-100 pr-2">
                <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">${n.toLocaleDateString("pt-BR",{month:"short"})}</span>
                <span class="block text-xl font-black text-slate-800 leading-none mt-1">${n.getDate()}</span>
            </div>
            <div class="flex-grow min-w-0">
                <p class="font-black text-sm text-slate-800 truncate">${v(o.description||"Serviço Variado")}</p>
                <div class="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span class="text-[9px] font-bold text-slate-500 flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded"><i class="bi bi-clock"></i> ${n.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</span>
                    <span class="text-[9px] font-bold text-indigo-500 flex items-center gap-1 bg-indigo-50 px-1.5 py-0.5 rounded truncate max-w-[120px]"><i class="bi bi-geo-alt"></i> ${d}</span>
                </div>
            </div>
            <div class="flex-shrink-0 text-right flex flex-col justify-center gap-2">
                ${l}
                <i class="bi bi-chevron-right text-slate-300 text-xs ml-auto pr-1"></i>
            </div>
        </div>`};return`
        <div class="space-y-6">
            ${a.length>0?`
                <div>
                    <h4 class="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2"><i class="bi bi-calendar-event text-sm"></i> Próximos Agendamentos</h4>
                    <div class="space-y-2">${a.map(o=>i(o,!1)).join("")}</div>
                </div>
            `:""}

            <div>
                <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><i class="bi bi-clock-history text-sm"></i> Histórico Passado</h4>
                ${s.length>0?`<div class="space-y-2">${s.map(o=>i(o,!0)).join("")}</div>`:'<div class="text-center py-10 border border-dashed border-slate-200 rounded-2xl bg-white"><p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Nenhum histórico passado.</p></div>'}
            </div>
        </div>
    `}function Ed(t){t.sort((s,i)=>new Date(i.date)-new Date(s.date));const e=t.reduce((s,i)=>s+(Number(i.value)||0),0),a=t.length>0?e/t.length:0;return`
        <div class="space-y-6">
            <div class="grid grid-cols-2 gap-3">
                <div class="bg-emerald-50 p-4 md:p-5 rounded-2xl border border-emerald-100 shadow-sm flex flex-col text-center justify-center">
                    <span class="text-[9px] md:text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex justify-center items-center gap-1"><i class="bi bi-graph-up-arrow"></i> LTV (Gasto Total)</span>
                    <span class="text-2xl md:text-3xl font-black text-emerald-700 mt-1 truncate">${za(e)}</span>
                </div>
                <div class="bg-white p-4 md:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col text-center justify-center">
                    <span class="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest flex justify-center items-center gap-1"><i class="bi bi-receipt"></i> Ticket Médio</span>
                    <span class="text-2xl md:text-3xl font-black text-slate-800 mt-1 truncate">${za(a)}</span>
                </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div class="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2">
                    <i class="bi bi-cart-check text-indigo-500 text-lg"></i>
                    <h4 class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Linha do Tempo de Compras</h4>
                </div>
                <div class="p-2 md:p-3 space-y-2 max-h-96 overflow-y-auto custom-scrollbar overscroll-contain">
                    ${t.length?t.map(s=>{const i=w.establishments.find(r=>r.id===s.establishmentId)?.name||"Unidade Local",o=s.type==="sale";return`
                        <div class="bg-white border border-slate-100 rounded-xl p-3 flex justify-between items-center shadow-sm hover:border-indigo-200 cursor-pointer transition-all active:scale-[0.98]" data-go-comanda="true" data-id="${s.id}" data-est="${s.establishmentId}">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full ${o?"bg-indigo-50 text-indigo-500 border border-indigo-100":"bg-slate-50 text-slate-500 border border-slate-200"} flex flex-shrink-0 items-center justify-center text-sm shadow-sm">
                                    <i class="bi ${o?"bi-receipt-cutoff":"bi-calendar-check"}"></i>
                                </div>
                                <div class="min-w-0 pr-2">
                                    <p class="font-black text-slate-800 text-xs uppercase tracking-wider truncate">${s.description}</p>
                                    <p class="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest truncate">
                                        ${new Date(s.date).toLocaleDateString()} • <span class="text-indigo-400">${i}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="text-right flex-shrink-0">
                                <p class="font-black text-emerald-600 text-sm md:text-base">${za(s.value)}</p>
                                <p class="text-[8px] text-indigo-500 font-bold uppercase tracking-widest mt-1 flex items-center justify-end gap-1">Ver <i class="bi bi-chevron-right"></i></p>
                            </div>
                        </div>`}).join(""):`
                        <div class="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200 m-2">
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhum histórico financeiro.</p>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `}function Ii(t,e){return e.sort((a,s)=>new Date(s.date)-new Date(a.date)),`
        <div class="space-y-6">
            <div class="bg-amber-400 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col items-center justify-center text-center shadow-amber-500/30">
                <div class="absolute -right-4 -top-4 opacity-20 transform rotate-12"><i class="bi bi-star-fill text-9xl"></i></div>
                <p class="text-amber-100 font-bold uppercase tracking-widest text-[10px] mb-2 z-10">Saldo de Pontos de Fidelidade</p>
                <h1 class="text-6xl font-black z-10 drop-shadow-md tracking-tighter">${t.loyaltyPoints||0}</h1>
                
                <button type="button" data-action="toggle-adjustment" class="mt-6 bg-white text-amber-600 text-[10px] font-black uppercase tracking-widest py-2.5 px-6 rounded-xl transition hover:bg-amber-50 shadow-lg active:scale-95 flex items-center gap-2 z-10 border border-white">
                    <i class="bi bi-sliders"></i> Ajuste Manual
                </button>
            </div>

            <div id="inline-adjustment-container" class="hidden bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden animate-fade-in-down mb-4">
                <div class="bg-amber-50 p-4 border-b border-amber-100 flex justify-between items-center">
                    <h4 class="text-[10px] font-black text-amber-700 uppercase tracking-widest">Movimentação Manual</h4>
                    <button type="button" data-action="toggle-adjustment" class="text-amber-600 hover:text-amber-800"><i class="bi bi-x-circle"></i></button>
                </div>
                <div class="p-4 space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Tipo</label>
                            <select id="redeem-action" class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50">
                                <option value="credit">Adicionar (+)</option>
                                <option value="debit">Remover (-)</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Pontos</label>
                            <input type="number" id="redeem-points" min="1" class="w-full p-3 border border-slate-300 rounded-xl text-sm font-black text-slate-800 bg-slate-50" placeholder="0">
                        </div>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Motivo</label>
                        <input type="text" id="redeem-reason" class="w-full p-3 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 bg-slate-50" placeholder="Ex: Bónus de aniversário">
                    </div>
                    <button type="button" id="confirm-adjustment-btn" class="w-full bg-amber-500 text-white py-3.5 rounded-xl font-black shadow-md hover:bg-amber-600 active:scale-95 transition-all text-xs uppercase tracking-wider">
                        Confirmar Movimentação
                    </button>
                </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div class="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2">
                    <i class="bi bi-card-list text-indigo-500 text-lg"></i>
                    <h4 class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Extrato de Movimentações</h4>
                </div>
                <div class="p-3 space-y-1 max-h-80 overflow-y-auto custom-scrollbar overscroll-contain">
                    ${e.length>0?e.map(a=>{const s=a.points<0;return`
                        <div class="flex justify-between items-center py-3 px-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors rounded-xl">
                            <div>
                                <p class="text-[10px] font-black text-slate-800 uppercase tracking-wider">${v(a.description||(s?"Resgate":"Acúmulo"))}</p>
                                <p class="text-[9px] font-bold text-slate-400 mt-1 uppercase">${new Date(a.date).toLocaleDateString()}</p>
                            </div>
                            <span class="font-black text-sm px-3 py-1 rounded-lg border ${s?"text-red-600 bg-red-50 border-red-100":"text-amber-600 bg-amber-50 border-amber-100"}">
                                ${a.points>0?"+":""}${a.points}
                            </span>
                        </div>`}).join(""):'<div class="text-center py-10 text-[10px] font-bold text-slate-400 uppercase">Sem movimentações.</div>'}
                </div>
            </div>
        </div>
    `}function Ld(t,e){return!t||t.length===0?'<div class="text-center py-10 border border-dashed border-slate-200 rounded-2xl bg-white"><p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">O cliente não possui nenhum plano VIP ativo.</p></div>':`<div class="space-y-4">
        ${t.map(a=>{const s=a.status==="past_due",i=a.status==="active";a.status;const o=i?"text-emerald-700 bg-emerald-50 border-emerald-200":s?"text-red-700 bg-red-50 border-red-200":"text-gray-700 bg-gray-50 border-gray-200",r=i?"Ativo":s?"Pagamento Atrasado":"Cancelado",n=i?"bi-check-circle-fill text-emerald-500":s?"bi-exclamation-circle-fill text-red-500":"bi-x-circle-fill text-gray-500";let l="N/A";if(a.currentPeriodEnd){const c=typeof a.currentPeriodEnd=="object"&&a.currentPeriodEnd._seconds?new Date(a.currentPeriodEnd._seconds*1e3):new Date(a.currentPeriodEnd);isNaN(c.getTime())||(l=c.toLocaleDateString("pt-BR"))}const d=a.usageLimit?`${a.usageCurrentMonth||0} / ${a.usageLimit}`:`${a.usageCurrentMonth||0} (Ilimitado)`,u=`https://wa.me/55${As(e.phone)}?text=${encodeURIComponent("Olá "+e.name.split(" ")[0]+", notamos uma pendência na renovação do seu "+a.planName+". Podemos ajudar?")}`;return`
            <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div class="flex justify-between items-start mb-4 border-b border-slate-100 pb-4">
                    <div>
                        <h4 class="font-black text-lg text-slate-800 flex items-center gap-2"><i class="bi bi-gem text-indigo-500"></i> ${v(a.planName)}</h4>
                        <p class="text-xs text-slate-500 mt-1">Assinatura ${a.gatewaySubscriptionId||"#N/A"}</p>
                    </div>
                    <span class="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md border ${o} flex items-center gap-1">
                        <i class="bi ${n}"></i> ${r}
                    </span>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-5 bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-inner">
                    <div>
                        <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Uso neste ciclo</p>
                        <p class="font-black text-slate-700 text-base">${d} serviços</p>
                    </div>
                    <div>
                        <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Próxima Renovação</p>
                        <p class="font-black text-slate-700 text-base">${l}</p>
                    </div>
                </div>

                <div class="flex items-center justify-end gap-2">
                    ${s?`<a href="${u}" target="_blank" class="px-4 py-2 bg-green-50 text-green-700 font-bold rounded-lg hover:bg-green-100 transition border border-green-200 text-xs shadow-sm flex items-center gap-1.5"><i class="bi bi-whatsapp"></i> Cobrar Cliente</a>`:""}
                    ${i||s?`<button data-action="cancel-subscription" data-sub-id="${a.id}" class="px-4 py-2 bg-white text-red-600 font-bold rounded-lg border border-slate-200 hover:border-red-200 hover:bg-red-50 transition text-xs shadow-sm">Cancelar Plano</button>`:""}
                </div>
            </div>
            `}).join("")}
    </div>`}async function ms(t){if(!t||!t.phone)return;const e=As(t.phone);try{const a=Array.from(w.filterEstablishmentIds),[s,i]=await Promise.all([Kr(a,e),C(`/api/client-subscriptions/client/${e}`).catch(()=>[])]),o=s.filter(p=>p.type==="appointment"),r=s.filter(p=>p.type==="sale"),n=s.filter(p=>p.type==="loyalty");w.historyData.appointments=o,w.historyData.sales=r,w.historyData.loyaltyLog=n,w.historyData.subscriptions=i||[];const l=document.getElementById("historico-agendamentos-container");l&&(l.innerHTML=$d(o));const d=document.getElementById("historico-financeiro-container");d&&(d.innerHTML=Ed(r));const u=document.getElementById("historico-fidelidade-container");u&&(u.innerHTML=Ii(t,n));const c=document.getElementById("historico-assinaturas-container");c&&(c.innerHTML=Ld(w.historyData.subscriptions,t)),$i(t)}catch(a){console.error("Erro ao buscar histórico via telefone",a);const s='<div class="text-center py-6 text-red-500 font-bold text-[10px] uppercase bg-red-50 rounded-xl m-2 border border-red-100">Falha na busca. O Telefone está preenchido corretamente?</div>',i=document.getElementById("historico-agendamentos-container");i&&(i.innerHTML=s);const o=document.getElementById("historico-financeiro-container");o&&(o.innerHTML=s);const r=document.getElementById("historico-fidelidade-container");r&&(r.innerHTML=s);const n=document.getElementById("historico-assinaturas-container");n&&(n.innerHTML=s)}}function $i(t){const e=document.getElementById("client-modal-inner");if(!e)return;e.querySelectorAll("[data-go-agenda]").forEach(o=>{o.onclick=()=>{Ve(),ie("agenda-section",{targetDate:new Date(o.dataset.date),scrollToAppointmentId:o.dataset.id})}}),e.querySelectorAll("[data-go-comanda]").forEach(o=>{o.onclick=()=>{Ve(),ie("comandas-section",{selectedAppointmentId:o.dataset.id,initialFilter:"finalizadas"})}}),e.querySelectorAll('[data-action="cancel-subscription"]').forEach(o=>{o.onclick=async r=>{r.preventDefault();const n=o.dataset.subId;if(await G("Cancelar Plano","Tem a certeza que deseja cancelar a assinatura deste cliente? A cobrança será interrompida imediatamente no cartão do cliente."))try{o.disabled=!0,o.innerHTML='<span class="spinner-border spinner-border-sm"></span> Cancelando...',await C(`/api/client-subscriptions/cancel/${n}`,{method:"POST"}),g("Sucesso","Assinatura cancelada com sucesso.","success"),ms(w.selectedClient)}catch(d){g("Erro",d.message,"error"),o.disabled=!1,o.innerHTML="Cancelar Plano"}}});const a=e.querySelectorAll('[data-action="toggle-adjustment"]'),s=e.querySelector("#inline-adjustment-container"),i=e.querySelector("#confirm-adjustment-btn");a.forEach(o=>{o.onclick=r=>{r.preventDefault(),s.classList.toggle("hidden"),s.classList.contains("hidden")||s.scrollIntoView({behavior:"smooth",block:"center"})}}),i&&(i.onclick=async o=>{o.preventDefault();const r=e.querySelector("#redeem-action").value,n=parseInt(e.querySelector("#redeem-points").value,10),l=e.querySelector("#redeem-reason").value,d=t.loyaltyPoints||0;if(!n||n<=0)return g("Aviso","Indique a quantidade de pontos.","info");if(r==="debit"&&n>d)return g("Erro","Saldo insuficiente.","error");if(!l)return g("Aviso","Indique o motivo do ajuste.","info");i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm"></span> Gravando...';try{let u=d;r==="debit"?(await Oo(f.establishmentId,t.phone,n,l),u-=n):(u+=n,await ks(t.id,{loyaltyPoints:u})),w.selectedClient.loyaltyPoints=u,g("Sucesso","Pontos atualizados com sucesso!","success"),ms(w.selectedClient),he()}catch(u){g("Erro",u.message,"error"),i.disabled=!1,i.innerHTML="Confirmar Movimentação"}})}async function Cd(t){t.preventDefault();const e=t.submitter||document.querySelector('button[form="form-edit-client"]');let a="";e&&(a=e.innerHTML,e.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> Gravando...',e.disabled=!0);const s=new FormData(t.target),i=Object.fromEntries(s.entries());i.establishmentId=f.establishmentId,i.dobDay&&(i.dobDay=parseInt(i.dobDay)),i.dobMonth&&(i.dobMonth=parseInt(i.dobMonth));try{if(w.selectedClient.isNew){const o=await Ro(i);w.clients.unshift(o),g("Sucesso","Cliente cadastrado com sucesso!","success"),Ve()}else{await ks(w.selectedClient.id,i),Object.assign(w.selectedClient,i);const o=w.clients.findIndex(r=>r.id===w.selectedClient.id);o!==-1&&(w.clients[o]=w.selectedClient),g("Sucesso","Dados salvos com sucesso!","success"),Ve()}he()}catch(o){g("Erro",o.message,"error"),e&&(e.innerHTML=a,e.disabled=!1)}}async function Dd(t){if(t.preventDefault(),!!await G("Excluir Cliente","Tem certeza? O histórico financeiro será mantido de forma anônima, mas a ficha cadastral será perdida permanentemente."))try{await Ho(w.selectedClient.id),w.clients=w.clients.filter(a=>a.id!==w.selectedClient.id),g("Sucesso","Cliente removido com sucesso.","success"),Ve(),he()}catch(a){g("Erro",a.message,"error")}}function Pd(t){const e=t.loyaltyPoints||0,a=`
        <div class="text-center mb-6">
            <p class="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Saldo Atual</p>
            <h2 class="text-4xl font-black text-amber-500">${e}</h2>
        </div>
        <form id="manual-redeem-form" class="space-y-4">
            <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Ação Desejada</label>
                <select id="redeem-action" class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 shadow-inner cursor-pointer">
                    <option value="debit">Remover Pontos (Resgate / Punição)</option>
                    <option value="credit">Adicionar Pontos (Bônus / Erro)</option>
                </select>
            </div>
            <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Quantidade de Pontos</label>
                <input type="number" id="redeem-points" min="1" required class="w-full p-4 border border-slate-300 rounded-xl text-2xl font-black text-slate-800 text-center outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 shadow-inner" placeholder="Ex: 50">
            </div>
            <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Motivo / Observação *</label>
                <input type="text" id="redeem-reason" required class="w-full p-3 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 shadow-inner" placeholder="Ex: Brinde especial de Natal">
            </div>
            <div class="pt-4">
                <button type="submit" class="w-full bg-indigo-600 text-white px-4 py-3.5 rounded-xl font-black shadow-md hover:bg-indigo-700 active:scale-95 transition-transform text-xs uppercase tracking-wider border border-indigo-500 flex items-center justify-center gap-2">
                    <i class="bi bi-check2-circle text-lg pointer-events-none"></i> Confirmar Ajuste
                </button>
            </div>
        </form>
    `,{modalElement:s,close:i}=Fe({title:"Ajuste de Pontos",contentHTML:a,maxWidth:"max-w-xs"});s.querySelector("form").onsubmit=async o=>{o.preventDefault();const r=document.getElementById("redeem-action").value,n=parseInt(document.getElementById("redeem-points").value,10),l=document.getElementById("redeem-reason").value;if(!n||n<=0)return g("Erro","Qtd inválida.","error");if(r==="debit"&&n>e)return g("Erro","Saldo insuficiente na carteira do cliente.","error");const d=o.target.querySelector('button[type="submit"]'),u=d.innerHTML;d.innerHTML='<span class="spinner-border spinner-border-sm"></span>',d.disabled=!0;try{let c=e;r==="debit"?(await Oo(f.establishmentId,t.phone,n,l),c-=n):(c+=n,await ks(t.id,{loyaltyPoints:c})),w.selectedClient.loyaltyPoints=c,w.historyData.loyaltyLog.unshift({type:r==="debit"?"redemption":"earn",points:n,date:new Date().toISOString(),description:l+" (Ajuste Manual)"}),g("Sucesso","Saldo de pontos atualizado.","success"),i();const p=document.getElementById("historico-fidelidade-container");p&&(p.innerHTML=Ii(w.selectedClient,w.historyData.loyaltyLog)),$i(w.selectedClient),he()}catch(c){g("Erro",c.message,"error"),d.innerHTML=u,d.disabled=!1}}}function Td(){if(typeof XLSX>"u")return g("Erro","Biblioteca de exportação não carregada. Atualize a página.","error");if(w.clients.length===0)return g("Aviso","Nenhum cliente para exportar.","info");const t=w.clients.map(e=>({Nome:e.name,Telefone:e.phone||"","E-mail":e.email||"",CPF:e.cpf||"",Gênero:e.gender==="M"?"Masculino":e.gender==="F"?"Feminino":e.gender==="O"?"Outro":"",Aniversário:e.dobDay&&e.dobMonth?`${e.dobDay}/${e.dobMonth}`:"",Origem:e.source||"",Cadastro:ps(e.createdAt),"Última Visita":ps(e.lastVisit),"Pontos Fidelidade":e.loyaltyPoints||0,"Débito/Fiado (R$)":e.totalDebt||0,Anotações:e.notes||""}));try{const e=XLSX.utils.json_to_sheet(t),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,e,"Clientes"),XLSX.writeFile(a,`KAIROS_Clientes_${new Date().toISOString().split("T")[0]}.xlsx`),g("Sucesso","Exportação gerada e descarregada.","success")}catch{g("Erro","Falha ao gerar o ficheiro Excel.","error")}}async function Ei(t){t.innerHTML=`
        <div class="flex items-center justify-center p-8">
            <div class="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    `;try{let e=null;try{e=await C("/api/pagarme/recipient")}catch(s){if(!s.message.includes("404"))throw s}if(e&&e.id){t.innerHTML=`
                <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center shadow-sm max-w-2xl mx-auto mt-6">
                    <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="bi bi-shield-check text-3xl"></i>
                    </div>
                    <h2 class="text-xl font-bold text-emerald-800 mb-2">Conta de Pagamentos Ativa!</h2>
                    <p class="text-emerald-600 text-sm mb-4">O seu estabelecimento já está configurado para receber pagamentos online e assinaturas.</p>
                    
                    <div class="bg-white rounded-xl p-4 inline-block text-left border border-emerald-100">
                        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">ID do Recebedor (Pagar.me)</p>
                        <p class="text-sm font-mono font-bold text-gray-700">${v(e.id)}</p>
                    </div>
                </div>
            `;return}t.innerHTML=`
            <div class="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mt-6">
                <div class="bg-indigo-600 p-6 text-white">
                    <h2 class="text-xl font-bold flex items-center gap-2"><i class="bi bi-bank"></i> Configurar Recebimentos</h2>
                    <p class="text-indigo-100 text-sm mt-1">Preencha os dados bancários do estabelecimento para habilitar o pagamento de assinaturas via PIX e Cartão.</p>
                </div>
                
                <form id="pagarmeOnboardingForm" class="p-6 md:p-8 space-y-6">
                    <div>
                        <h3 class="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4">Dados da Empresa / Titular</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Tipo de Conta</label>
                                <select id="pgType" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-indigo-500 outline-none" required>
                                    <option value="company">Pessoa Jurídica (CNPJ)</option>
                                    <option value="individual">Pessoa Física (CPF)</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">CPF / CNPJ</label>
                                <input type="text" id="pgDocument" placeholder="Somente números" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:border-indigo-500 outline-none" required>
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nome Completo ou Razão Social</label>
                                <input type="text" id="pgName" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:border-indigo-500 outline-none" required>
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email de Contato</label>
                                <input type="email" id="pgEmail" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:border-indigo-500 outline-none" required>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4">Conta Bancária para Repasse</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="md:col-span-3">
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Banco (Código 3 dígitos)</label>
                                <select id="pgBankCode" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-indigo-500 outline-none" required>
                                    <option value="341">Itaú (341)</option>
                                    <option value="001">Banco do Brasil (001)</option>
                                    <option value="104">Caixa Econômica (104)</option>
                                    <option value="237">Bradesco (237)</option>
                                    <option value="033">Santander (033)</option>
                                    <option value="260">Nubank (260)</option>
                                    <option value="077">Inter (077)</option>
                                    <option value="336">C6 Bank (336)</option>
                                    <option value="000">Outro (Digitar código...)</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Agência (Sem dígito)</label>
                                <input type="text" id="pgBranch" placeholder="Ex: 0001" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:border-indigo-500 outline-none" required>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Conta</label>
                                <input type="text" id="pgAccount" placeholder="Ex: 12345" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:border-indigo-500 outline-none" required>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Dígito da Conta</label>
                                <input type="text" id="pgAccountDigit" placeholder="Ex: 6" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:border-indigo-500 outline-none" required>
                            </div>
                        </div>
                        <p class="text-[10px] text-gray-400 mt-3 font-semibold">* O CPF/CNPJ da conta bancária deve ser exatamente o mesmo informado nos dados da empresa acima.</p>
                    </div>

                    <div class="pt-4 flex justify-end">
                        <button type="submit" id="btnSubmitOnboarding" class="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-2">
                            <i class="bi bi-check2-circle"></i> Criar Conta Recebedor
                        </button>
                    </div>
                </form>
            </div>
        `,document.getElementById("pagarmeOnboardingForm").addEventListener("submit",async s=>{s.preventDefault();const i=document.getElementById("btnSubmitOnboarding"),o=document.getElementById("pgBankCode").value,r=o==="000"?prompt("Digite o código do banco de 3 dígitos:"):o;if(!r)return;const n={name:document.getElementById("pgName").value.trim(),email:document.getElementById("pgEmail").value.trim(),document:document.getElementById("pgDocument").value.replace(/\D/g,""),type:document.getElementById("pgType").value,bankAccount:{holder_name:document.getElementById("pgName").value.trim(),holder_type:document.getElementById("pgType").value,holder_document:document.getElementById("pgDocument").value.replace(/\D/g,""),bank:r,branch_number:document.getElementById("pgBranch").value.trim(),account_number:document.getElementById("pgAccount").value.trim(),account_check_digit:document.getElementById("pgAccountDigit").value.trim()}};try{i.disabled=!0,i.innerHTML='<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Processando...',await C("/api/pagarme/onboarding",{method:"POST",body:JSON.stringify(n)}),g("Sucesso","Conta de pagamentos configurada com sucesso!","success"),Ei(t)}catch(l){i.disabled=!1,i.innerHTML='<i class="bi bi-check2-circle"></i> Criar Conta Recebedor',g("Erro no Cadastro",l.message||"Verifique os dados bancários e tente novamente.","error")}})}catch{t.innerHTML=`
            <div class="text-center py-12">
                <i class="bi bi-exclamation-triangle text-rose-500 text-4xl mb-3"></i>
                <p class="text-gray-600 font-bold">Erro ao carregar configurações financeiras.</p>
            </div>
        `}}const ze=document.getElementById("content"),Ja={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},de=[{id:"clean-modern",name:"Clean Moderno",bg:"#f8fafc",text:"#4b5563",titleColor:"#0f172a",primary:"#2563eb",font:"Inter",btn:"rounded",cardBg:"#ffffff",cardBorder:"#e2e8f0"},{id:"dark-premium",name:"Dark Premium",bg:"#0f172a",text:"#9ca3af",titleColor:"#f8fafc",primary:"#f59e0b",font:"'Playfair Display'",btn:"square",cardBg:"#1e293b",cardBorder:"#334155"},{id:"spa-zen",name:"Spa & Wellness",bg:"#f0fdf4",text:"#166534",titleColor:"#064e3b",primary:"#10b981",font:"Poppins",btn:"pill",cardBg:"#ffffff",cardBorder:"#d1fae5"},{id:"neo-brutalism",name:"Neobrutalismo",bg:"#ffffff",text:"#000000",titleColor:"#000000",primary:"#ef4444",font:"Inter",btn:"square",cardBg:"#ffffff",cardBorder:"#000000"},{id:"tech-cyan",name:"Tech Night",bg:"#020617",text:"#94a3b8",titleColor:"#f1f5f9",primary:"#06b6d4",font:"Roboto",btn:"rounded",cardBg:"#0f172a",cardBorder:"#1e293b"},{id:"sunset-glam",name:"Sunset Glam",bg:"#fff7ed",text:"#831843",titleColor:"#4c0519",primary:"#f43f5e",font:"Poppins",btn:"pill",cardBg:"#ffffff",cardBorder:"#fce7f3"},{id:"luxury-mono",name:"Luxo Minimal",bg:"#fafafa",text:"#525252",titleColor:"#171717",primary:"#404040",font:"'Playfair Display'",btn:"square",cardBg:"#ffffff",cardBorder:"#e5e5e5"},{id:"deep-ocean",name:"Oceano Profundo",bg:"#172554",text:"#bfdbfe",titleColor:"#eff6ff",primary:"#3b82f6",font:"Montserrat",btn:"pill",cardBg:"#1e3a8a",cardBorder:"#1e40af"},{id:"rustic-vintage",name:"Rústico Vintage",bg:"#1c1917",text:"#a8a29e",titleColor:"#fafaf9",primary:"#ea580c",font:"Montserrat",btn:"rounded",cardBg:"#292524",cardBorder:"#44403c"},{id:"vibrant-purple",name:"Estúdio Criativo",bg:"#fdf4ff",text:"#701a75",titleColor:"#4a044e",primary:"#c026d3",font:"Inter",btn:"rounded",cardBg:"#ffffff",cardBorder:"#fae8ff"}];let Q=null,se=null;function Li(){return[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais da Unidade"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"whatsapp-bot",icon:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",label:"Atendente Virtual (WhatsApp)"},{id:"auto-messages",icon:"M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",label:"Mensagens Automáticas"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"pagarme",icon:"M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",label:"Pagamentos (Pagar.me)"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}]}function so(t,e,a){return new Promise((s,i)=>{const o=new FileReader;o.readAsDataURL(t),o.onload=r=>{const n=new Image;n.src=r.target.result,n.onload=()=>{const l=document.createElement("canvas");let d=n.width,u=n.height;d>e&&(u*=e/d,d=e),l.width=d,l.height=u,l.getContext("2d").drawImage(n,0,0,d,u);const p=t.type==="image/png"&&e<500?"image/png":"image/jpeg";s(l.toDataURL(p,a))},n.onerror=l=>i(l)},o.onerror=r=>i(r)})}function Qe(t,e=null){let a='<option value="">-- Selecione (Opcional) --</option>';const s=r=>{const n=new Map,l=[];return r&&(r.forEach(d=>n.set(d.id,{...d,children:[]})),n.forEach(d=>{d.parentId&&n.has(d.parentId)?n.get(d.parentId).children.push(d):l.push(d)})),l},i=(r,n="")=>{const l=r.id===e?"selected":"";a+=`<option value="${r.id}" ${l}>${n}${v(r.name)}</option>`,r.children.forEach(d=>i(d,n+"— "))};return s(t).forEach(r=>i(r)),a}async function We(t,e){const a=e.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const s=[],{ownerName:i,...o}=t;if(i&&i!==f.userName){const n=we.currentUser;n&&s.push(Ji(n,{displayName:i}).then(()=>{f.userName=i}))}const r={...Q,...o};s.push(jt(se,r)),await Promise.all(s),Q=r,g("Sucesso","Definições salvas com sucesso!","success"),o.themeColor&&se===f.establishmentId&&setTimeout(()=>window.location.reload(),1500)}catch(s){g("Erro",`Não foi possível salvar: ${s.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function Md(t,e){const a=v(t.name||""),s=v(t.phone||""),i=v(t.cnpj||""),o=v(t.email||""),r=v(t.address||""),n=v(t.website||""),l=v(f.userName||"");e.innerHTML=`
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
                    <input type="text" id="establishmentCnpjCpf" value="${i}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md bg-gray-50">
                </div>
                <div>
                    <label for="establishmentEmail" class="block text-sm font-medium text-gray-700">E-mail de Contato</label>
                    <input type="email" id="establishmentEmail" value="${o}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <div>
                    <label for="establishmentAddress" class="block text-sm font-medium text-gray-700">Endereço Completo</label>
                    <input type="text" id="establishmentAddress" value="${r}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <div>
                    <label for="establishmentWebsite" class="block text-sm font-medium text-gray-700">Website</label>
                    <input type="url" id="establishmentWebsite" value="${n}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
            </form>
        </div>
    `,e.querySelector("#personal-data-form").addEventListener("submit",d=>{d.preventDefault();const u={ownerName:e.querySelector("#ownerName").value,name:e.querySelector("#establishmentName").value,phone:e.querySelector("#establishmentPhone").value,cnpj:e.querySelector("#establishmentCnpjCpf").value,email:e.querySelector("#establishmentEmail").value,address:e.querySelector("#establishmentAddress").value,website:e.querySelector("#establishmentWebsite").value};We(u,d)})}function Bd(t,e){e.innerHTML=`
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
    `,e.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const s=e.querySelector("#newPassword").value,i=e.querySelector("#confirmPassword").value;if(s!==i){g("Erro","As senhas não coincidem.","error");return}const o=e.querySelector('button[form="change-password-form"]');o.disabled=!0,o.textContent="A Salvar...";try{const r=we.currentUser;if(r)await Wi(r,s),g("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum utilizador logado encontrado.")}catch(r){g("Erro",`Não foi possível alterar a senha: ${r.message}`,"error")}finally{o.disabled=!1,o.textContent="Salvar Nova Senha"}})}function Ad(t,e){e.innerHTML=`
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
    `,e.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const s=e.querySelector("#newEmail").value,i=e.querySelector("#currentPassword").value,o=e.querySelector('button[form="change-email-form"]');o.disabled=!0,o.textContent="A verificar...";try{const r=we.currentUser,n=_i.credential(r.email,i);await Vi(r,n),await Ui(r,s),await Ir(se,s),g("Sucesso","Link de verificação enviado! Verifique o seu novo e-mail.","success"),a.target.reset()}catch(r){g("Erro",r.message,"error")}finally{o.disabled=!1,o.textContent="Salvar Novo E-mail"}})}function jd(t,e){const a=v(t.welcomeMessage||"Agende o seu horário de forma rápida e fácil."),s=t.socialLinks||{},i=v(s.instagram||""),o=v(s.facebook||""),r=v(s.whatsapp||"");let n=t.primaryColor||t.themeColor||de[0].primary,l=t.backgroundColor||de[0].bg,d=t.textColor||de[0].text,u=t.titleColor||de[0].titleColor,c=t.buttonStyle||de[0].btn,p=t.typography||de[0].font,b=t.templateId?de.findIndex(W=>W.id===t.templateId):0;b===-1&&(b=0);const m=W=>W==="pill"?"9999px":W==="square"?"0.25rem":"0.75rem";e.innerHTML=`
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
                        <input type="hidden" id="selectedTemplateId" value="${de[b].id}">
                        
                        <div class="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
                            <h4 class="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-3 text-center">1. Escolha um Tema Base</h4>
                            <div class="flex items-center justify-center gap-4">
                                <button type="button" id="prevTemplate" class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm transition-colors cursor-pointer border border-indigo-200">
                                    <i class="bi bi-chevron-left text-lg"></i>
                                </button>
                                <div class="text-center min-w-[160px]">
                                    <span id="templateNameDisplay" class="text-lg font-bold text-indigo-950">${de[b].name}</span>
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
                                    <input type="text" id="socialInstagram" value="${i}" class="flex-1 p-2.5 outline-none text-xs" placeholder="Usuário (@)">
                                </div>
                                <div class="flex rounded-xl shadow-sm overflow-hidden border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                                    <span class="inline-flex items-center px-3 bg-gray-50 text-gray-500 border-r border-gray-300"><i class="bi bi-whatsapp text-green-500"></i></span>
                                    <input type="text" id="socialWhatsapp" value="${r}" class="flex-1 p-2.5 outline-none text-xs" placeholder="Número Whatsapp">
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
                                --preview-btn-radius: ${m(c)};
                                --preview-card-bg: ${de[b].cardBg};
                                --preview-card-border: ${de[b].cardBorder};
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
                                        <div id="mockup-insta-icon" class="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm transition-transform ${i?"":"hidden"}" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); color: var(--preview-primary)"><i class="bi bi-instagram"></i></div>
                                        <div id="mockup-whats-icon" class="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm transition-transform ${r?"":"hidden"}" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); color: var(--preview-primary)"><i class="bi bi-whatsapp"></i></div>
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
    `;const x=e.querySelector("#mockup-screen-wrapper"),y=e.querySelector("#mockup-screen"),S=e.querySelector("#previewPrimaryColorInput"),L=e.querySelector("#previewBgColorInput"),D=e.querySelector("#previewTextColorInput"),k=e.querySelector("#previewTitleColorInput"),I=e.querySelector("#typographyInput"),M=e.querySelector("#establishmentWelcomeMessage"),V=e.querySelector("#mockup-welcome"),P=e.querySelector("#socialInstagram"),z=e.querySelector("#socialWhatsapp"),O=e.querySelector("#socialFacebook"),T=e.querySelector("#prevTemplate"),A=e.querySelector("#nextTemplate"),N=e.querySelector("#templateNameDisplay"),K=e.querySelector("#selectedTemplateId"),ee=W=>{const X=de[W];x.style.opacity="0.3",x.style.transform="scale(0.96)",setTimeout(()=>{S.value=X.primary,L.value=X.bg,D.value=X.text,k.value=X.titleColor||X.text,I.value=X.font,e.querySelectorAll('input[name="buttonStyle"]').forEach(ge=>{ge.checked=ge.value===X.btn}),K.value=X.id,N.textContent=X.name,y.style.setProperty("--preview-primary",X.primary),y.style.setProperty("--preview-bg",X.bg),y.style.setProperty("--preview-text",X.text),y.style.setProperty("--preview-title-color",X.titleColor||X.text),y.style.setProperty("--preview-font",X.font),y.style.setProperty("--preview-btn-radius",m(X.btn)),y.style.setProperty("--preview-card-bg",X.cardBg),y.style.setProperty("--preview-card-border",X.cardBorder),x.style.opacity="1",x.style.transform="scale(1)"},300)};T.addEventListener("click",()=>{b=(b-1+de.length)%de.length,ee(b)}),A.addEventListener("click",()=>{b=(b+1)%de.length,ee(b)}),S.addEventListener("input",W=>y.style.setProperty("--preview-primary",W.target.value)),L.addEventListener("input",W=>y.style.setProperty("--preview-bg",W.target.value)),D.addEventListener("input",W=>y.style.setProperty("--preview-text",W.target.value)),k.addEventListener("input",W=>y.style.setProperty("--preview-title-color",W.target.value)),I.addEventListener("change",W=>y.style.setProperty("--preview-font",W.target.value)),e.querySelectorAll('input[name="buttonStyle"]').forEach(W=>{W.addEventListener("change",X=>{X.target.checked&&y.style.setProperty("--preview-btn-radius",m(X.target.value))})}),M.addEventListener("input",W=>V.textContent=W.target.value||"Mensagem...");const oe=()=>{e.querySelector("#mockup-insta-icon").classList.toggle("hidden",!P.value.trim()),e.querySelector("#mockup-whats-icon").classList.toggle("hidden",!z.value.trim()),e.querySelector("#mockup-face-icon").classList.toggle("hidden",!O.value.trim())};[P,z,O].forEach(W=>W.addEventListener("input",oe));const Z=e.querySelector("#establishmentLogoInput"),F=e.querySelector("#establishmentBgInput"),te=e.querySelector("#establishmentLogoBase64"),le=e.querySelector("#establishmentBackgroundImageBase64");e.querySelector("#triggerLogoUpload").addEventListener("click",W=>{W.target.id!=="establishmentLogoInput"&&Z.click()}),Z.onchange=async W=>{const X=W.target.files[0];if(X){const ge=await so(X,300,.9);e.querySelector("#establishmentLogoPreview").src=ge,e.querySelector("#mockup-logo").src=ge,te.value=ge}},e.querySelector("#triggerBannerUpload").addEventListener("click",W=>{W.target.id!=="establishmentBgInput"&&F.click()}),F.onchange=async W=>{const X=W.target.files[0];if(X){const ge=await so(X,1280,.8);e.querySelector("#establishmentBgPreview").src=ge,e.querySelector("#establishmentBgPreview").classList.remove("hidden"),e.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),le.value=ge,e.querySelector("#mockup-banner").src=ge,e.querySelector("#mockup-banner").classList.remove("hidden"),e.querySelector("#mockup-banner-placeholder").classList.add("hidden")}},e.querySelector("#branding-form").addEventListener("submit",W=>{W.preventDefault();let X="rounded";e.querySelectorAll('input[name="buttonStyle"]').forEach(Fs=>{Fs.checked&&(X=Fs.value)});const ge={logo:te.value,backgroundImage:le.value,welcomeMessage:M.value,templateId:K.value,primaryColor:S.value,backgroundColor:L.value,textColor:D.value,titleColor:k.value,typography:I.value,buttonStyle:X,socialLinks:{instagram:P.value.trim(),whatsapp:z.value.trim(),facebook:O.value.trim()}};We(ge,W)})}function qd(t,e){const a=t.urlId||se;let s=window.location.origin;(s.includes("localhost")||s.includes("capacitor://")||s.includes("127.0.0.1"))&&(s="https://www.kairosagenda.com.br");const i=v(`${s}/agendar?id=${a}`),o=t.publicBookingEnabled||!1,r=o?"Agendamento Online ATIVO":"Agendamento Online INATIVO",n=o?"text-green-600":"text-red-600";e.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100 space-y-8">
            <div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Link Público de Agendamento</h3>
                <p class="text-sm text-gray-600 mb-4">Este é o link exclusivo desta unidade para compartilhar com os clientes.</p>
                <div class="flex flex-col sm:flex-row gap-2">
                    <input type="text" id="publicBookingLink" value="${i}" readonly class="flex-1 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 outline-none">
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
                    <span id="publicBookingStatusText" class="text-sm font-semibold ${n}">${r}</span>
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
    `,e.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const l=e.querySelector("#publicBookingLink");l.select(),document.execCommand("copy"),l.blur(),g("Sucesso","Link copiado!","success")}),e.querySelector("#publicBookingToggle").addEventListener("change",async l=>{const d=l.target.checked,u=e.querySelector("#publicBookingStatusText");u.textContent=d?"Agendamento Online ATIVO":"Agendamento Online INATIVO",u.className=d?"text-sm font-semibold text-green-600":"text-sm font-semibold text-red-600";try{l.target.disabled=!0,await Sr(se,d),Q.publicBookingEnabled=d,g("Sucesso",`Agendamento online ${d?"ativado":"desativado"}!`,"success")}catch(c){g("Erro",c.message,"error"),l.target.checked=!d}finally{l.target.disabled=!1}}),_d(t.slotInterval||30,e),e.querySelector("#booking-form").addEventListener("submit",l=>{l.preventDefault();const d={slotInterval:parseInt(e.querySelector("#establishmentSlotInterval").value,10)};We(d,l)})}function Nd(t,e){e.innerHTML=`
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
    `;const a=e.querySelector("#establishmentTimezone");t.timezone&&(a.value=t.timezone);const s=e.querySelector("#establishmentWorkingHoursContainer"),i=t.workingHours||{};Object.keys(Ja).forEach(o=>{const r=i[o]||{},n=Ja[o],l=r.active!==!1,d=document.createElement("div");d.className=`day-schedule-card p-4 rounded-lg border ${l?"bg-gray-50 border-gray-200":"bg-gray-100 border-gray-100 disabled opacity-60"}`,d.innerHTML=`
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
                <div><label class="text-xs text-gray-500">Abertura:</label><input type="time" id="est-${o}-start" value="${r.start||"09:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Fecho:</label><input type="time" id="est-${o}-end" value="${r.end||"18:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Início Pausa:</label><input type="time" id="est-${o}-breakStart" value="${r.breakStart||"12:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Fim Pausa:</label><input type="time" id="est-${o}-breakEnd" value="${r.breakEnd||"13:00"}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
            </div>`,s.appendChild(d)}),s.addEventListener("change",o=>{const r=o.target.closest('.day-schedule-card input[type="checkbox"]');if(r){const n=r.closest(".day-schedule-card");n.classList.toggle("disabled",!r.checked),n.classList.toggle("opacity-60",!r.checked),n.classList.toggle("bg-gray-50",r.checked),n.classList.toggle("bg-gray-100",!r.checked)}}),e.querySelector("#working-hours-form").addEventListener("submit",o=>{o.preventDefault();const r={};Object.keys(Ja).forEach(l=>{r[l]={active:e.querySelector(`#est-${l}-active`).checked,start:e.querySelector(`#est-${l}-start`).value,end:e.querySelector(`#est-${l}-end`).value,breakStart:e.querySelector(`#est-${l}-breakStart`).value,breakEnd:e.querySelector(`#est-${l}-breakEnd`).value}});const n=e.querySelector("#establishmentTimezone").value;We({workingHours:r,timezone:n},o)})}async function pa(t,e){const a=!!t.whatsappInstance,s=!!t.parentId;let i=null;if(s&&!a)try{i=await Ae(t.parentId)}catch(c){console.error("Erro ao buscar dados da matriz:",c)}const o=i&&!!i.whatsappInstance;e.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
            <div class="mb-6">
                <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <i class="bi bi-robot text-green-500"></i> Atendente Virtual Inteligente
                </h3>
                <p class="text-sm text-gray-600 mt-2">Conecte o WhatsApp para que a IA atenda os clientes automaticamente.</p>
            </div>

            <div class="bg-green-50 p-6 rounded-xl border border-green-200 text-center">
                
                <div id="whatsappStatusArea" class="${a?"hidden":"block"}">
                    <div class="bg-white inline-block p-4 rounded-full shadow-sm mb-4">
                        <i class="bi bi-qr-code-scan text-4xl text-gray-700"></i>
                    </div>
                    
                    <h4 class="text-lg font-bold text-gray-800 mb-2">Ligar o Bot a esta Unidade</h4>
                    
                    ${s&&o?`
                        <div class="bg-white border border-green-200 p-4 rounded-xl mb-4 max-w-sm mx-auto shadow-sm">
                            <p class="text-xs text-green-700 font-bold mb-3 uppercase">Sugestão Multi-unidade</p>
                            <p class="text-sm text-gray-600 mb-4">A sua Matriz já tem um WhatsApp ligado. Deseja usar o mesmo número nesta filial?</p>
                            <button type="button" id="btnUseParentWhatsapp" class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2 px-6 rounded-lg transition-all w-full shadow-md">
                                Usar WhatsApp da Matriz
                            </button>
                        </div>
                        <div class="flex items-center my-4 max-w-sm mx-auto">
                            <hr class="flex-grow border-gray-300"> <span class="px-3 text-gray-400 text-xs font-bold uppercase">ou</span> <hr class="flex-grow border-gray-300">
                        </div>
                    `:""}

                    <p class="text-sm text-gray-600 mb-6 max-w-md mx-auto">Gere um QR Code para usar um número de WhatsApp <b>exclusivo</b> para esta unidade.</p>
                    
                    <button type="button" id="btnGenerateQr" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2 mx-auto">
                        <i class="bi bi-phone-vibrate"></i> Gerar QR Code Próprio
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
                    <button type="button" id="btnCancelQr" class="mt-4 text-red-500 hover:text-red-700 font-semibold text-sm underline block mx-auto">Cancelar</button>
                </div>

                <div id="connectedStatusArea" class="${a?"block":"hidden"} mt-4">
                    <div class="bg-white inline-block p-4 rounded-full shadow-sm mb-4 border-4 border-green-500">
                        <i class="bi bi-check-circle-fill text-4xl text-green-500"></i>
                    </div>
                    <h4 class="text-xl font-bold text-green-700 mb-2">WhatsApp Ativo!</h4>
                    <p class="text-sm text-gray-600 max-w-md mx-auto mb-6">
                        ${t.whatsappInstance===i?.whatsappInstance&&s?"Esta filial está a partilhar o número da Matriz.":"O bot está a funcionar com um número exclusivo para esta unidade."}
                    </p>
                    
                    <button type="button" id="btnDisconnectWhatsapp" class="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2 mx-auto">
                        <i class="bi bi-power"></i> Desconectar
                    </button>
                </div>

            </div>
        </div>
    `;const r=e.querySelector("#btnUseParentWhatsapp");r&&r.addEventListener("click",async()=>{if(confirm("Confirmar a utilização do mesmo número da Matriz? As mensagens desta filial serão geridas pela mesma inteligência."))try{r.disabled=!0,r.innerText="A vincular...",await jt(se,{whatsappInstance:i.whatsappInstance}),g("Sucesso","Número da matriz vinculado com sucesso!","success"),Q.whatsappInstance=i.whatsappInstance,pa(Q,e)}catch{g("Erro","Não foi possível vincular ao número da matriz.","error"),r.disabled=!1,r.innerText="Usar WhatsApp da Matriz"}});let n=null;const l=e.querySelector("#btnGenerateQr"),d=e.querySelector("#btnCancelQr");l&&l.addEventListener("click",async()=>{l.disabled=!0,l.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gerando...';const c="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const b=await(await fetch(`${c}/connect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:se})})).json();if(b.qrcode){e.querySelector("#whatsappStatusArea").classList.add("hidden"),e.querySelector("#qrCodeDisplayArea").classList.remove("hidden");const m=b.qrcode.includes("data:image")?b.qrcode:`data:image/png;base64,${b.qrcode}`;e.querySelector("#qrCodeImage").src=m,n=setInterval(async()=>{try{const y=await(await fetch(`${c}/status/${se}`)).json();y.connected&&(clearInterval(n),Q.whatsappInstance=y.instanceName,e.querySelector("#qrCodeDisplayArea").classList.add("hidden"),e.querySelector("#connectedStatusArea").classList.remove("hidden"),g("Sucesso","WhatsApp conectado com sucesso!","success"))}catch(x){console.error("Erro ao verificar status do WhatsApp",x)}},5e3)}else g("Erro na API",b.error||"Erro desconhecido","error")}catch(p){console.error(p),g("Erro de Conexão","Não foi possível aceder ao servidor Kairós.","error")}finally{l.disabled=!1,l.innerHTML='<i class="bi bi-phone-vibrate"></i> Gerar QR Code Próprio'}}),d&&d.addEventListener("click",()=>{n&&clearInterval(n),e.querySelector("#qrCodeDisplayArea").classList.add("hidden"),e.querySelector("#whatsappStatusArea").classList.remove("hidden")});const u=e.querySelector("#btnDisconnectWhatsapp");u&&u.addEventListener("click",async()=>{if(!confirm("Tem certeza que deseja DESCONECTAR? O bot parará de responder imediatamente nesta unidade."))return;u.disabled=!0,u.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Desconectando...';const c="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{if(s&&t.whatsappInstance===i?.whatsappInstance){await jt(se,{whatsappInstance:null}),g("Sucesso","Filial desvinculada do WhatsApp da Matriz!","success"),Q.whatsappInstance=null,pa(Q,e);return}const b=await(await fetch(`${c}/disconnect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:se})})).json();b.success?(g("Sucesso","WhatsApp desconectado!","success"),Q.whatsappInstance=null,pa(Q,e)):alert("Erro ao desconectar: "+b.error)}catch(p){console.error(p),g("Erro","Falha ao comunicar com o servidor.","error")}finally{u&&(u.disabled=!1,u.innerHTML='<i class="bi bi-power"></i> Desconectar')}})}function Fd(t,e){const a=t.autoMessagesConfig||{},s=a.appointmentReminder?.template||"Olá {{cliente}}! 👋 Passando para lembrar do seu horário hoje às {{hora}} com {{profissional}}. Para confirmar, responda CONFIRMAR, ou se precisar desmarcar, responda CANCELAR.",i=a.birthdayCongrats?.template||"Parabéns {{cliente}}! 🎉 O Kairós deseja-lhe um feliz aniversário! Temos um desconto especial para si hoje na sua próxima visita.",o=a.inactiveRecovery?.template||"Olá {{cliente}}, tudo bem? Já faz {{dias}} dias desde a sua última visita à *{{unidade}}*! Que tal agendar um novo horário hoje?";e.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100 space-y-6">
            <div class="flex justify-between items-center border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800">Mensagens Automáticas (WhatsApp)</h3>
                    <p class="text-sm text-gray-500">Configure os disparos inteligentes para os seus clientes.</p>
                </div>
                <button type="submit" form="auto-messages-form" class="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all shadow-md active:scale-95 flex items-center gap-2">
                    <i class="bi bi-save"></i> Salvar Modelos
                </button>
            </div>

            <form id="auto-messages-form" class="space-y-8">
                
                <div class="p-5 rounded-xl border border-blue-100 bg-blue-50/30">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                <i class="bi bi-alarm"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-800">Lembrete de Agendamento</h4>
                                <p class="text-xs text-gray-500">Enviado automaticamente antes do serviço.</p>
                            </div>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input cursor-pointer" type="checkbox" id="activeReminder" ${a.appointmentReminder?.active!==!1?"checked":""}>
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="flex items-center gap-3 text-sm text-gray-700">
                            <span>Enviar</span>
                            <input type="number" id="minutesBefore" value="${a.appointmentReminder?.minutesBefore||60}" class="w-16 p-1 border rounded text-center font-bold" min="15" max="1440">
                            <span>minutos antes do horário.</span>
                        </div>
                        <textarea id="tplReminder" rows="3" class="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">${s}</textarea>
                        <div class="flex flex-wrap gap-2">
                            <button type="button" class="btn-variable text-[10px] bg-white border px-2 py-1 rounded" data-target="tplReminder" data-var="{{cliente}}">@cliente</button>
                            <button type="button" class="btn-variable text-[10px] bg-white border px-2 py-1 rounded" data-target="tplReminder" data-var="{{hora}}">@hora</button>
                            <button type="button" class="btn-variable text-[10px] bg-white border px-2 py-1 rounded" data-target="tplReminder" data-var="{{profissional}}">@profissional</button>
                        </div>
                    </div>
                </div>

                <div class="p-5 rounded-xl border border-pink-100 bg-pink-50/30">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center">
                                <i class="bi bi-cake2"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-800">Aniversariantes do Dia</h4>
                                <p class="text-xs text-gray-500">Enviado todas as manhãs para os aniversariantes.</p>
                            </div>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input cursor-pointer" type="checkbox" id="activeBirthday" ${a.birthdayCongrats?.active?"checked":""}>
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <textarea id="tplBirthday" rows="3" class="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none">${i}</textarea>
                        <div class="flex flex-wrap gap-2">
                            <button type="button" class="btn-variable text-[10px] bg-white border px-2 py-1 rounded" data-target="tplBirthday" data-var="{{cliente}}">@cliente</button>
                        </div>
                    </div>
                </div>

                <div class="p-5 rounded-xl border border-indigo-100 bg-indigo-50/30">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                                <i class="bi bi-people"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-800">Fidelização (Inativos)</h4>
                                <p class="text-xs text-gray-500">Chame clientes que não aparecem há algum tempo.</p>
                            </div>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input cursor-pointer" type="checkbox" id="activeInactive" ${a.inactiveRecovery?.active?"checked":""}>
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="flex items-center gap-3 text-sm text-gray-700">
                            <span>Enviar para quem não vem há</span>
                            <input type="number" id="daysInactive" value="${a.inactiveRecovery?.daysInactive||30}" class="w-16 p-1 border rounded text-center font-bold" min="7" max="180">
                            <span>dias.</span>
                        </div>
                        <textarea id="tplInactive" rows="3" class="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">${o}</textarea>
                        <div class="flex flex-wrap gap-2">
                            <button type="button" class="btn-variable text-[10px] bg-white border px-2 py-1 rounded" data-target="tplInactive" data-var="{{cliente}}">@cliente</button>
                            <button type="button" class="btn-variable text-[10px] bg-white border px-2 py-1 rounded" data-target="tplInactive" data-var="{{dias}}">@dias_inativo</button>
                            <button type="button" class="btn-variable text-[10px] bg-white border px-2 py-1 rounded" data-target="tplInactive" data-var="{{unidade}}">@unidade</button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    `,e.querySelectorAll(".btn-variable").forEach(r=>{r.addEventListener("click",()=>{const n=r.dataset.target,l=r.dataset.var,d=e.querySelector(`#${n}`),u=d.selectionStart,c=d.selectionEnd,p=d.value;d.value=p.substring(0,u)+l+p.substring(c),d.focus(),d.setSelectionRange(u+l.length,u+l.length)})}),e.querySelector("#auto-messages-form").addEventListener("submit",r=>{r.preventDefault();const n={autoMessagesConfig:{appointmentReminder:{active:e.querySelector("#activeReminder").checked,minutesBefore:parseInt(e.querySelector("#minutesBefore").value,10)||60,template:e.querySelector("#tplReminder").value},birthdayCongrats:{active:e.querySelector("#activeBirthday").checked,template:e.querySelector("#tplBirthday").value},inactiveRecovery:{active:e.querySelector("#activeInactive").checked,daysInactive:parseInt(e.querySelector("#daysInactive").value,10)||30,template:e.querySelector("#tplInactive").value}}};We(n,r)})}async function Rd(t,e){const a=t.loyaltyProgram||{},s=a.pointsPerVisit||1;let i=[],o=[],r=[];try{[i,o,r]=await Promise.all([Ue(se),gt(se),Ds(se)])}catch(d){console.error("Erro ao carregar dados para fidelidade:",d)}e.innerHTML=`
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
    `;const n=e.querySelector("#loyaltyTiersContainer"),l=(d={})=>{const u=document.createElement("div");u.className="loyalty-tier-row bg-white p-4 border border-gray-200 rounded-lg shadow-sm relative grid grid-cols-1 md:grid-cols-4 gap-4 items-end";const c=d.type||"money",p=d.itemId||"",b=d.reward||"",m=d.discount||"",x=d.points||d.costPoints||"";u.innerHTML=`
            <div>
                <label class="text-xs font-bold text-gray-500 mb-1 block">Custo (Pontos)</label>
                <div class="relative">
                    <input type="number" placeholder="Ex: 100" data-field="points" value="${x}" class="w-full p-2 border border-gray-300 rounded-md font-bold text-gray-800">
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
                    <input type="text" placeholder="Ex: R$ 20 de Desconto" data-field="rewardName" value="${v(b)}" class="desc-input flex-1 p-2 border border-gray-300 rounded-md ${c!=="money"?"hidden":""}">
                    
                    <select data-field="itemId" class="item-select flex-1 p-2 border border-gray-300 rounded-md bg-white text-sm ${c==="money"?"hidden":""}">
                        <option value="">Selecione o item na lista...</option>
                    </select>

                    <div class="w-24 relative">
                        <span class="absolute left-2 top-2 text-gray-500 text-sm">$</span>
                        <input type="number" placeholder="Valor" data-field="discount" value="${m}" step="0.01" class="discount-input w-full p-2 pl-7 border border-gray-300 rounded-md" title="Valor do desconto">
                    </div>
                </div>
            </div>

            <button type="button" class="remove-loyalty-tier absolute -top-3 -right-3 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white p-1.5 rounded-full shadow-md transition-colors" title="Remover Prémio">
                <i class="bi bi-x-lg text-sm"></i>
            </button>
        `;const y=u.querySelector(".type-select"),S=u.querySelector(".item-select"),L=u.querySelector(".desc-input"),D=u.querySelector(".discount-input"),k=I=>{S.innerHTML='<option value="">Selecione...</option>';let M=[];I==="service"?M=i:I==="product"?M=o:I==="package"&&(M=r),M.forEach(V=>{const P=V.id===p,z=V.name||V.title||"Sem nome",O=V.price||V.salePrice||0;S.innerHTML+=`<option value="${V.id}" data-price="${O}" ${P?"selected":""}>${v(z)}</option>`})};return c!=="money"&&k(c),y.addEventListener("change",I=>{const M=I.target.value;M==="money"?(S.classList.add("hidden"),L.classList.remove("hidden"),L.value="",D.value=""):(S.classList.remove("hidden"),L.classList.add("hidden"),k(M),D.value="")}),S.addEventListener("change",I=>{const M=I.target.selectedOptions[0];if(M&&M.value){L.value=M.text;const V=M.dataset.price;V&&(D.value=parseFloat(V).toFixed(2))}}),u};a.tiers&&a.tiers.length>0?a.tiers.forEach(d=>n.appendChild(l(d))):n.appendChild(l()),e.querySelector("#add-loyalty-tier").addEventListener("click",()=>{n.appendChild(l())}),n.addEventListener("click",d=>{const u=d.target.closest(".remove-loyalty-tier");u&&u.closest(".loyalty-tier-row").remove()}),e.querySelector("#loyalty-form").addEventListener("submit",d=>{d.preventDefault();const u=Array.from(e.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(p=>{const b=p.querySelector(".type-select").value,m=b==="money"?null:p.querySelector(".item-select").value;let x=b==="money"?p.querySelector(".desc-input").value:p.querySelector(".item-select").options[p.querySelector(".item-select").selectedIndex]?.text;return{points:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,costPoints:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,type:b,itemId:m,reward:x,name:x,discount:parseFloat(p.querySelector('input[data-field="discount"]').value)||0}}),c={loyaltyProgram:{enabled:e.querySelector("#loyaltyEnabled").checked,type:"visit",pointsPerVisit:parseInt(e.querySelector("#loyaltyPointsPerVisit").value,10)||1,pointsPerCurrency:0,tiers:u.filter(p=>p.points>0&&p.reward)}};We(c,d)})}async function Hd(t,e){e.innerHTML=`
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
    `;try{const[a,s]=await Promise.all([Ba(se),Ss(se)]),i=t.financialIntegration||{},o=t.commissionConfig||{},r=t.purchaseConfig||{};e.querySelector("#financialNatureId").innerHTML=Qe(a,i.defaultNaturezaId),e.querySelector("#financialCostCenterId").innerHTML=Qe(s,i.defaultCentroDeCustoId),e.querySelector("#purchaseNatureId").innerHTML=Qe(a,r.defaultNatureId),e.querySelector("#purchaseCostCenterId").innerHTML=Qe(s,r.defaultCostCenterId),e.querySelector("#commissionNatureId").innerHTML=Qe(a,o.defaultNatureId),e.querySelector("#commissionCostCenterId").innerHTML=Qe(s,o.defaultCostCenterId)}catch{g("Erro","Não foi possível carregar o plano de contas da unidade.","error")}e.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const s={financialIntegration:{defaultNaturezaId:e.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:e.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:e.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:e.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:e.querySelector("#commissionNatureId").value||null,defaultCostCenterId:e.querySelector("#commissionCostCenterId").value||null}};We(s,a)})}function Od(t,e){const a=`https://wa.me/5516997859430?text=Olá, preciso de ajuda com o sistema Kairos (Minha Unidade: ${t.name}).`;e.innerHTML=`
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
    `}function zd(t,e){const a=`https://wa.me/5516997859430?text=Gostaria de solicitar o cancelamento da assinatura. (Unidade: ${t.name})`;e.innerHTML=`
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
    `}function _d(t,e){const a=e.querySelector("#slotIntervalContainer"),s=e.querySelector("#establishmentSlotInterval");if(!a||!s)return;const i=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=i.map(o=>{const r=o.value===t;return`<button type="button" data-value="${o.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors shadow-sm
                           ${r?"bg-indigo-600 text-white":"bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}">
                       ${o.label}
                   </button>`}).join(""),s.value=t,a.querySelectorAll(".interval-btn").forEach(o=>{o.addEventListener("click",()=>{s.value=o.dataset.value,a.querySelectorAll(".interval-btn").forEach(r=>{r.classList.remove("bg-indigo-600","text-white"),r.classList.add("bg-white","border","border-gray-300","text-gray-700")}),o.classList.add("bg-indigo-600","text-white"),o.classList.remove("bg-white","border","border-gray-300","text-gray-700")})})}async function Vd(t){const a=Li().find(i=>i.id===t);if(!a)return;ze.innerHTML=`
        <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-gray-200 border-opacity-50">
            <div class="flex items-center gap-3">
                <button data-action="back-to-menu" class="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 shadow-sm flex items-center gap-2 text-sm font-semibold">
                    <i class="bi bi-arrow-left"></i> Voltar
                </button>
                <h2 class="text-2xl font-bold text-gray-800">${a.label}</h2>
            </div>
            <div class="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                ${v(Q?.name||"")}
            </div>
        </div>
        
        <div id="settings-content-detail" class="pb-20 max-w-6xl mx-auto w-full">
            <div class="flex justify-center items-center py-10"><div class="spinner-border text-indigo-600" role="status"></div></div>
        </div>
    `,ze.querySelector('button[data-action="back-to-menu"]').addEventListener("click",i=>{i.preventDefault(),Ci({id:se})});const s=document.getElementById("settings-content-detail");switch(t){case"personal-data":Md(Q,s);break;case"change-password":Bd(Q,s);break;case"change-email":Ad(Q,s);break;case"branding":jd(Q,s);break;case"booking":qd(Q,s);break;case"working-hours":Nd(Q,s);break;case"whatsapp-bot":pa(Q,s);break;case"auto-messages":Fd(Q,s);break;case"loyalty":await Rd(Q,s);break;case"financial":await Hd(Q,s);break;case"pagarme":Ei(s);break;case"support":Od(Q,s);break;case"cancellation":zd(Q,s);break;default:s.innerHTML='<div class="p-4 text-center">Módulo em construção.</div>'}}async function Ci(t={}){ze.innerHTML=`
        <div class="flex flex-col justify-center items-center h-64">
            <div class="spinner-border text-indigo-600 border-4 w-12 h-12 mb-4" role="status"></div>
            <p class="text-gray-500 font-medium">A carregar configurações da unidade...</p>
        </div>
    `;try{se=t.id||f.establishmentId,Q=await Ae(se);const e=t.id?`<button onclick="window.navigateTo('establishments-section')" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                   <i class="bi bi-diagram-3"></i> Voltar à Rede
               </button>`:"",a=Q.isMatriz||!Q.parentId?'<span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded ml-3">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded ml-3">📍 UNIDADE</span>',s=Li();ze.innerHTML=`
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
                        <h3 class="text-2xl font-bold mb-1">${v(Q.name)} ${a}</h3>
                        <p class="text-indigo-200 text-sm flex items-center gap-2"><i class="bi bi-geo-alt"></i> ${v(Q.address||"Morada não definida")}</p>
                    </div>
                    <div class="relative z-10 hidden sm:block">
                        <div class="w-16 h-16 bg-white rounded-xl shadow-md p-1 flex items-center justify-center">
                            ${Q.logo?`<img src="${Q.logo}" class="w-full h-full object-contain rounded-lg">`:`<span class="text-2xl text-indigo-600 font-bold">${Q.name.charAt(0).toUpperCase()}</span>`}
                        </div>
                    </div>
                    <div class="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${s.map(i=>`
                        <div data-section="${i.id}" class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-300 cursor-pointer transition-all flex items-center gap-4 group">
                            <div class="w-12 h-12 bg-gray-50 group-hover:bg-indigo-50 text-gray-400 group-hover:text-indigo-600 rounded-lg flex items-center justify-center transition-colors">
                                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${i.icon}"></path></svg>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-bold text-gray-800 group-hover:text-indigo-700 transition-colors text-sm">${i.label}</h4>
                            </div>
                            <i class="bi bi-chevron-right text-gray-300 group-hover:text-indigo-400 transition-colors"></i>
                        </div>
                    `).join("")}
                </div>
                
                <div class="mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Módulos Ativos Nesta Unidade</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="modules-container">
                        ${Ud(Q.modules||{})}
                    </div>
                </div>
            </div>
        `,ze.querySelectorAll("div[data-section]").forEach(i=>{i.addEventListener("click",o=>{Vd(i.dataset.section)})}),ze.querySelectorAll(".module-toggle").forEach(i=>{i.addEventListener("change",async()=>{const o=i.dataset.module;try{const n={...(await Ae(se)).modules,[o]:i.checked};await jt(se,{modules:n}),g("Módulos","Módulos atualizados com sucesso.","success")}catch(r){i.checked=!i.checked,g("Erro",r.message,"error")}})})}catch(e){ze.innerHTML=`
            <div class="p-8 text-center max-w-md mx-auto">
                <i class="bi bi-exclamation-triangle text-4xl text-red-500 mb-4 block"></i>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Erro ao carregar loja</h2>
                <p class="text-gray-600">${e.message}</p>
                <button onclick="window.navigateTo('establishments-section')" class="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700">Voltar à Rede</button>
            </div>
        `}}function Ud(t){return[{key:"agenda-section",label:"Agenda Diária",icon:"bi-calendar"},{key:"comandas-section",label:"Comandas e PDV",icon:"bi-receipt"},{key:"financial-section",label:"Financeiro Completo",icon:"bi-cash-coin"},{key:"reports-section",label:"Relatórios Gerenciais",icon:"bi-graph-up"}].map(a=>`
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
    `).join("")}const Ct=document.getElementById("content");async function rt(t){const e=document.getElementById("blockagesList");if(e){e.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,s=document.getElementById("filterEndDate")?.value,i=await ja(f.establishmentId,a||new Date().toISOString().split("T")[0],s||new Date().toISOString().split("T")[0],t),o=document.getElementById("filterReason")?.value.toLowerCase(),r=o?i.filter(l=>l.reason&&l.reason.toLowerCase().includes(o)):i,n=r.reduce((l,d)=>{const u=d.reason||"Sem motivo";return l[u]||(l[u]=[]),l[u].push(d),l},{});if(e.innerHTML="",r.length===0){e.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(n).forEach(([l,d])=>{const u=document.createElement("div");u.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let p=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${v(l)} (${d.length})</h4>`;if(d.length>1){const b=JSON.stringify(d.map(m=>m.id));p+=`<button data-action="batch-delete-blockage" data-ids='${b}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}p+="</div>",u.innerHTML=p,d.forEach(b=>{const m=new Date(b.startTime),x=new Date(b.endTime),y=m.toLocaleDateString("pt-BR"),S=x.toLocaleDateString("pt-BR"),D=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${y===S?`${y} | ${m.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${x.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${y} às ${m.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${S} às ${x.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${b.id}">Apagar</button>
                    </div>`;u.innerHTML+=D}),e.appendChild(u)})}catch(a){e.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function Wd(t){t.preventDefault();const e=t.target,a=e.querySelector("#blockageProfId").value,s=e.querySelector("#blockageDate").value,i=e.querySelector("#blockageEndDate").value||s,o=e.querySelector("#blockageStartTime").value,r=e.querySelector("#blockageEndTime").value,n={establishmentId:f.establishmentId,professionalId:a,startTime:new Date(`${s}T${o}:00`).toISOString(),endTime:new Date(`${i}T${r}:00`).toISOString(),reason:e.querySelector("#blockageReason").value};try{await qa(n),e.reset(),g("Sucesso","Bloqueio adicionado com sucesso!","success"),rt(a)}catch(l){g("Erro",`Não foi possível criar o bloqueio: ${l.message}`,"error")}}async function Jd(t){t.preventDefault();const e=t.target,a=Array.from(e.querySelectorAll('input[name="batch-professionals"]:checked')).map(u=>u.value);if(a.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const s=e.querySelector("#batchBlockageDate").value,i=e.querySelector("#batchBlockageEndDate").value||s,o=e.querySelector("#batchBlockageStartTime").value,r=e.querySelector("#batchBlockageEndTime").value,n=e.querySelector("#batchBlockageReason").value,l=e.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="Aguarde...";const d=a.map(u=>{const c={establishmentId:f.establishmentId,professionalId:u,startTime:new Date(`${s}T${o}:00`).toISOString(),endTime:new Date(`${i}T${r}:00`).toISOString(),reason:n};return qa(c)});try{await Promise.all(d),g("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),e.reset(),e.querySelectorAll('input[name="batch-professionals"]:checked').forEach(c=>c.checked=!1);const u=document.getElementById("blockageProfId").value;u&&rt(u)}catch(u){g("Erro",`Ocorreu um erro: ${u.message}`,"error")}finally{l.disabled=!1,l.textContent="Adicionar Bloqueio em Lote"}}function Gd(t){Ct.addEventListener("submit",e=>{e.target.id==="blockageForm"&&Wd(e),e.target.id==="batchBlockageForm"&&Jd(e)}),Ct.addEventListener("input",e=>{e.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&rt(t)}),Ct.addEventListener("click",async e=>{const a=e.target.closest("button[data-action]");if(!a)return;const s=a.dataset.action;if(s==="back-to-professionals")ie("profissionais-section");else if(s==="delete-blockage"){if(await G("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await $s(a.dataset.id),g("Sucesso","Bloqueio removido.","success"),rt(t)}catch(o){g("Erro",`Não foi possível remover o bloqueio: ${o.message}`,"error")}}else if(s==="batch-delete-blockage"){const i=JSON.parse(a.dataset.ids);if(await G("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${i.length} bloqueios de uma vez?`))try{await Xo(i),g("Sucesso",`${i.length} bloqueios removidos.`,"success"),rt(t)}catch(r){g("Erro",`Não foi possível apagar os bloqueios: ${r.message}`,"error")}}})}async function Qd(t){const{professionalId:e,professionalName:a}=t;if(!e||!a){Ct.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const s=v(a);Ct.innerHTML=`
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
        </section>`,Gd(e),await rt(e);const i=document.getElementById("batchProfSelectionContainer");try{const o=await De(f.establishmentId);i.innerHTML=o.map(r=>`
            <div class="flex items-center">
                <input id="prof-batch-${r.id}" value="${r.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${r.id}" class="ml-2 text-sm text-gray-700">${v(r.name)}</label>
            </div>`).join("")}catch{i.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Yd=t=>C(`/api/users/${t}`),Xd=t=>C("/api/users",{method:"POST",body:JSON.stringify(t)}),Zd=(t,e)=>C(`/api/users/${t}`,{method:"PUT",body:JSON.stringify(e)}),Kd=t=>C(`/api/users/${t}`,{method:"DELETE"}),ec=(t,e)=>C(`/api/users/${t}/password`,{method:"PUT",body:JSON.stringify({password:e})}),tc=(t,e)=>C(`/api/users/${t}/status`,{method:"PATCH",body:JSON.stringify({status:e})}),ft=document.getElementById("content"),ac={"Operação & Atendimento":{"dashboard-section":"Dashboard","agenda-section":"Agenda","comandas-section":"Comandas","ausencias-section":"Ausências e Bloqueios"},"Financeiro & Vendas":{"financial-section":"Financeiro (ERP)","sales-report-section":"Relatório de Vendas","commissions-section":"Comissões","packages-section":"Planos e Pacotes"},"Cadastros Base":{"clientes-section":"Clientes","profissionais-section":"Profissionais","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores"},Administração:{"relatorios-section":"Relatórios Gerais","estabelecimento-section":"Configurações da Empresa","users-section":"Usuários e Acessos"}},sc={view:"Visualizar",create:"Criar",edit:"Editar"},oo={owner:{label:"Proprietário",color:"bg-rose-100 text-rose-700 border-rose-200"},group_admin:{label:"Admin da Rede",color:"bg-purple-100 text-purple-700 border-purple-200"},company_admin:{label:"Gestor Matriz",color:"bg-blue-100 text-blue-700 border-blue-200"},branch_manager:{label:"Gestor Filial",color:"bg-orange-100 text-orange-700 border-orange-200"},professional:{label:"Profissional",color:"bg-slate-100 text-slate-600 border-slate-200"}};let ea=null,ta=null,Ye=null,nt=null;function Di(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[f.currentViewContext?.id||f.establishmentId]}function oc(t){const e=document.getElementById("usersListContainer");if(!e)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(t.length===0){const s=a?"Nenhum usuário encontrado na base.":"Nenhum usuário ativo neste contexto.";e.innerHTML=`
            <div class="col-span-full py-16 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3"><i class="bi bi-people text-3xl text-slate-300"></i></div>
                <h3 class="text-sm font-bold text-slate-700 mb-1">${s}</h3>
                <p class="text-[10px] text-slate-500 max-w-xs">Tente selecionar mais unidades no topo da tela ou exibir inativos.</p>
            </div>`;return}t.sort((s,i)=>s.role==="owner"&&i.role!=="owner"?-1:s.role!=="owner"&&i.role==="owner"?1:(s.status==="active"?-1:1)-(i.status==="active"?-1:1)),e.innerHTML=t.map(s=>{const i=JSON.stringify(s).replace(/'/g,"&apos;"),o=s.status==="active",r=f.professionals?.find(u=>u.id===s.professionalId);r&&r.name;const n=r?r.name.charAt(0):s.name.charAt(0),l=s.photo||r?.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(n)}`,d=oo[s.role]||oo.professional;return`
        <div class="user-card-clickable bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between p-4 cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all active:scale-[0.99] ${o?"":"opacity-60 bg-slate-50"}" 
             data-action="edit-user" data-user='${i}'>
            
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
                        ${r?'<span class="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest border border-slate-200 bg-slate-50 text-slate-500"><i class="bi bi-scissors text-indigo-400 mr-1"></i>Vínculo Prof.</span>':""}
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
        `}).join("")}function Pi(){const e=document.getElementById("showInactiveUsersToggle")?.checked?f.users:f.users.filter(a=>a.status==="active");oc(e)}function ic(t={}){let e="",a=!1;for(const[s,i]of Object.entries(ac)){const o=Object.entries(i).filter(([r,n])=>{const l=r.replace("-section","");return!(f.enabledModules&&f.enabledModules[l]===!1)});o.length!==0&&(a=!0,e+=`
        <div class="mb-6 last:mb-0">
            <h4 class="font-black text-[10px] text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2"><i class="bi bi-folder2-open text-indigo-400 mr-1"></i> ${s}</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        `,o.forEach(([r,n])=>{const l=r==="agenda-section"||r==="comandas-section",d=t[r]?.view_all_prof===!0,u=Object.entries(sc).map(([p,b])=>`
                <label class="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <span class="text-[9px] text-slate-600 font-bold uppercase tracking-widest">${b}</span>
                    <div class="relative ml-2">
                        <input type="checkbox" data-module="${r}" data-permission="${p}" class="sr-only permission-checkbox" ${t[r]?.[p]?"checked":""}>
                        <div class="toggle-bg block bg-slate-200 w-8 h-4 rounded-full transition-colors shadow-inner"></div>
                        <div class="dot absolute left-1 top-[2px] bg-white w-3 h-3 rounded-full transition-transform ${t[r]?.[p]?"transform translate-x-4":""}"></div>
                    </div>
                </label>
            `).join(""),c=l?`
                <div class="mt-2 pt-2 border-t border-slate-100">
                    <label class="flex items-center justify-between cursor-pointer p-2 rounded-lg bg-indigo-50/50 hover:bg-indigo-100/50 transition-colors border border-indigo-100">
                        <span class="text-[9px] font-black text-indigo-700 uppercase tracking-widest">Acesso Toda Equipe</span>
                        <div class="relative ml-2">
                            <input type="checkbox" data-module="${r}" data-permission="view_all_prof" class="sr-only permission-checkbox" ${d?"checked":""}>
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
            `}),e+="</div></div>")}return a?e:'<div class="p-6 bg-red-50 border border-red-100 rounded-2xl text-center"><p class="text-sm font-bold text-red-600">Sua empresa não possui módulos ativados. Contate o administrador do sistema.</p></div>'}function io(t){if(!nt||f.userRole==="professional")return"";const e=t?.accessibleEstablishments?.map(o=>o.id)||[],a=t?.accessibleCompanies?.map(o=>o.id)||[],s=t?.role||"professional";if(s==="owner"||s==="group_admin")return'<div class="p-5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-800 text-sm font-black flex items-center justify-center gap-3"><i class="bi bi-shield-check text-2xl"></i> Acesso Total (Toda a Rede)</div>';let i='<div class="space-y-3 max-h-60 overflow-y-auto custom-scrollbar p-1">';return nt.companies.forEach(o=>{const r=a.includes(o.id),n=nt.branches.filter(l=>l.companyId===o.id);i+=`
            <div class="company-block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <label class="flex items-center space-x-3 cursor-pointer p-3 bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-200">
                    <input type="checkbox" class="company-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-5 w-5" value="${o.id}" data-name="${o.name}" ${r?"checked":""}>
                    <span class="text-sm font-black text-slate-800 uppercase tracking-wider">🏢 ${o.name}</span>
                </label>
                <div class="p-2 space-y-1">
                    ${n.map(l=>{const d=e.includes(l.id)||r;return`
                            <label class="flex items-center space-x-3 cursor-pointer p-2.5 hover:bg-indigo-50/50 rounded-lg transition-colors border border-transparent hover:border-indigo-100">
                                <input type="checkbox" class="branch-checkbox rounded border-slate-300 text-indigo-500 h-4 w-4" value="${l.id}" data-name="${l.name}" data-company-id="${o.id}" ${d?"checked":""}>
                                <span class="text-xs font-bold text-slate-600">📍 ${l.name}</span>
                            </label>
                        `}).join("")}
                </div>
            </div>
        `}),i+="</div>",i}async function ro(t=null){document.getElementById("user-list-view").classList.add("hidden");const e=document.getElementById("user-form-view");e.classList.remove("hidden");let a=f.professionals;if(!a||a.length===0)try{const p=Di().map(x=>De(x)),b=await Promise.all(p),m=new Map;b.flat().forEach(x=>m.set(x.id,x)),a=Array.from(m.values()),f.professionals=a}catch(c){console.warn("Profissionais não carregados",c)}if(["owner","group_admin","company_admin"].includes(f.userRole)&&!nt)try{const c=await ke();c&&(nt=c)}catch(c){console.error("Falha ao buscar hierarquia",c),nt={companies:[],branches:[]}}const s=t!==null,i=s&&t.role==="owner",o=e.querySelector("#userFormTitle");o.innerHTML=s?`<i class="bi bi-person-lines-fill mr-2 text-indigo-600"></i>Editar Perfil: ${t.name}`:'<i class="bi bi-person-plus-fill mr-2 text-indigo-600"></i>Novo Acesso';const r=e.querySelector("#userForm");r.innerHTML=`
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
                                <input type="email" id="userEmail" required value="${t?.email||""}" ${i?"disabled":""} class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner transition-colors ${i?"opacity-70 cursor-not-allowed":""}">
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
                    ${["owner","group_admin","company_admin"].includes(f.userRole)?`
                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 class="font-black text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3 mb-5"><i class="bi bi-diagram-3 text-indigo-500 text-lg"></i> Permissões de Rede</h3>
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <label class="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2 ml-1">Qual o cargo/nível na empresa?</label>
                                <select id="userRole" class="w-full p-3.5 border border-indigo-200 rounded-xl text-sm font-black text-indigo-900 bg-indigo-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-colors" ${i?"disabled":""}>
                                    
                                    ${["owner","group_admin"].includes(f.userRole)?`<option value="group_admin" ${t?.role==="group_admin"?"selected":""}>Administrador Geral (Acesso Total)</option>`:""}
                                    <option value="company_admin" ${t?.role==="company_admin"?"selected":""}>Gestor de Matriz / Empresa</option>
                                    <option value="branch_manager" ${t?.role==="branch_manager"?"selected":""}>Gestor de Filial (Loja)</option>
                                    <option value="professional" ${t?.role==="professional"?"selected":""}>Profissional / Recepção (Padrão)</option>
                                </select>
                            </div>
                            <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <label class="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3 ml-1">Unidades que pode visualizar</label>
                                <div id="hierarchySelectorContainer">
                                    ${io(t)}
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
                        ${ic(t?.permissions)}
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
    `;const n=e.querySelectorAll(".tab-btn"),l=e.querySelectorAll(".tab-content");n.forEach(c=>{c.addEventListener("click",()=>{n.forEach(b=>{b.classList.remove("active","text-indigo-600","border-indigo-600"),b.classList.add("text-slate-400","border-transparent")}),l.forEach(b=>b.classList.add("hidden")),c.classList.add("active","text-indigo-600","border-indigo-600"),c.classList.remove("text-slate-400","border-transparent");const p=c.getAttribute("data-tab");e.querySelector(`#${p}`).classList.remove("hidden")})});const d=r.querySelector("#userRole"),u=r.querySelector("#hierarchySelectorContainer");if(d&&u){d.addEventListener("change",p=>{const b={...t,role:p.target.value};u.innerHTML=io(b),c()});const c=()=>{u.querySelectorAll(".company-checkbox").forEach(p=>{p.addEventListener("change",b=>{b.target.closest(".company-block").querySelectorAll(".branch-checkbox").forEach(y=>{y.checked=b.target.checked;const S=y.nextElementSibling.querySelector(".dot");S&&(b.target.checked?S.classList.add("transform","translate-x-4"):S.classList.remove("transform","translate-x-4"))})})})};c()}if(r.querySelectorAll(".permission-checkbox").forEach(c=>{if(c.addEventListener("change",p=>{const b=p.target.nextElementSibling,m=b.nextElementSibling;p.target.checked?(b.classList.replace("bg-slate-200","bg-indigo-500"),m.classList.add("transform","translate-x-4")):(b.classList.replace("bg-indigo-500","bg-slate-200"),m.classList.remove("transform","translate-x-4"))}),c.checked){const p=c.nextElementSibling,b=p.nextElementSibling;p.classList.replace("bg-slate-200","bg-indigo-500"),b.classList.add("transform","translate-x-4")}}),r.onsubmit=async c=>{c.preventDefault();const p=r.querySelector('button[type="submit"]'),b=p.innerHTML;p.disabled=!0,p.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> Processando...';const m={};r.querySelectorAll(".permission-checkbox").forEach(k=>{const I=k.dataset.module,M=k.dataset.permission;m[I]||(m[I]={}),m[I][M]=k.checked});const x=r.querySelector("#userProfessionalId").value||null,y=r.querySelector("#userRole")?.value||"professional",S=[],L=[];if(y!=="group_admin"&&y!=="owner"&&r.querySelector(".company-checkbox")&&(r.querySelectorAll(".company-checkbox:checked").forEach(k=>{S.push({id:k.value,name:k.dataset.name})}),r.querySelectorAll(".branch-checkbox:checked").forEach(k=>{L.push({id:k.value,name:k.dataset.name,companyId:k.dataset.companyId})}),L.length===0))return p.disabled=!1,p.innerHTML=b,g("Atenção","Selecione pelo menos uma filial na aba de Acesso.","warning");const D={name:r.querySelector("#userName").value,permissions:m,professionalId:x,role:y,accessibleCompanies:S,accessibleEstablishments:L};try{if(s){const k=r.querySelector("#userEmail").value;t?.email!==k&&!i&&(D.email=k),await Zd(t.id,D),g("Sucesso","Usuário atualizado.","success")}else D.email=r.querySelector("#userEmail").value,D.password=r.querySelector("#userPassword").value,await Xd(D),g("Sucesso","Novo usuário cadastrado na plataforma.","success");Sa()}catch(k){g(`Erro: ${k.message}`,"error"),p.disabled=!1,p.innerHTML=b}},s){const c=r.querySelector("#btn-show-password"),p=r.querySelector("#password-form");c&&p&&(c.onclick=()=>{c.classList.add("hidden"),p.classList.remove("hidden")},r.querySelector("#btn-cancel-pwd").onclick=()=>{c.classList.remove("hidden"),p.classList.add("hidden"),p.querySelector("#userNewPassword").value=""},r.querySelector("#btn-save-pwd").onclick=async b=>{const m=b.target,x=p.querySelector("#userNewPassword").value;if(!x||x.length<6)return g("Aviso","Senha deve ter no mínimo 6 caracteres.","warning");if(await G("Alterar Senha","O usuário usará esta nova senha no próximo acesso. Confirma?"))try{m.disabled=!0,m.textContent="Aguarde...",await ec(t.id,x),g("Sucesso","Senha alterada com segurança.","success"),c.classList.remove("hidden"),p.classList.add("hidden")}catch(y){g("Erro",y.message,"error")}finally{m.disabled=!1,m.textContent="Salvar Senha"}})}}async function no(){const t=document.getElementById("usersListContainer");if(t){t.innerHTML='<div class="col-span-full py-16 flex justify-center"><div class="loader"></div></div>';try{const e=Di(),a=e.map(l=>Yd(l)),s=e.map(l=>De(l)),i=await Promise.all(a),o=await Promise.all(s),r=new Map;i.flat().forEach(l=>r.set(l.id,l)),f.users=Array.from(r.values());const n=new Map;o.flat().forEach(l=>n.set(l.id,l)),f.professionals=Array.from(n.values()),Pi()}catch{g("Erro ao carregar base de usuários.","error"),t.innerHTML='<p class="col-span-full text-center font-bold text-red-500 bg-red-50 p-6 rounded-2xl">Falha de comunicação com o servidor de acessos.</p>'}}}async function Sa(){ft.innerHTML=`
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
    `,ea&&ft.removeEventListener("click",ea),ta&&ft.removeEventListener("change",ta),Ye&&(window.removeEventListener("kairos:contextChanged",Ye),document.removeEventListener("change",Ye)),Ye=t=>{(t.type==="kairos:contextChanged"||t.target.closest("#multi-context-list"))&&document.getElementById("user-list-view")&&!document.getElementById("user-list-view").classList.contains("hidden")&&no()},window.addEventListener("kairos:contextChanged",Ye),document.addEventListener("change",Ye),ea=async t=>{const e=t.target.closest("[data-action]");if(!e)return;switch(e.dataset.action){case"new-user":ro();break;case"edit-user":const s=JSON.parse(e.dataset.user.replace(/&apos;/g,"'"));ro(s);break;case"back-to-list":Sa();break;case"delete-user":{if(t.stopPropagation(),await G("Excluir Usuário","O usuário perderá totalmente o acesso ao sistema. Confirma?"))try{await Kd(e.dataset.userId),g("Usuário excluído com sucesso.","success"),Sa()}catch(i){g(`Erro: ${i.message}`,"error")}break}}},ta=async t=>{if(t.target.id==="showInactiveUsersToggle"){const e=t.target.nextElementSibling,a=e.nextElementSibling;t.target.checked?(e.classList.replace("bg-slate-200","bg-indigo-500"),a.classList.add("transform","translate-x-5")):(e.classList.replace("bg-indigo-500","bg-slate-200"),a.classList.remove("transform","translate-x-5")),Pi()}else{const e=t.target.closest('input[data-action="toggle-user-status"]');if(e){t.stopPropagation();const a=e.dataset.userId,s=e.checked?"active":"inactive",i=e.nextElementSibling,o=i.nextElementSibling;e.checked?(i.classList.replace("bg-slate-300","bg-emerald-500"),o.classList.add("transform","translate-x-5")):(i.classList.replace("bg-emerald-500","bg-slate-300"),o.classList.remove("transform","translate-x-5"));try{await tc(a,s);const r=f.users.findIndex(n=>n.id===a);if(r>-1){f.users[r].status=s;const n=e.closest(".user-card-clickable");s==="inactive"?n.classList.add("opacity-60","bg-slate-50"):n.classList.remove("opacity-60","bg-slate-50")}}catch(r){g(`Erro: ${r.message}`,"error"),e.checked=!e.checked,e.checked?(i.classList.replace("bg-slate-300","bg-emerald-500"),o.classList.add("transform","translate-x-5")):(i.classList.replace("bg-emerald-500","bg-slate-300"),o.classList.remove("transform","translate-x-5"))}}}},ft.addEventListener("click",ea),ft.addEventListener("change",ta),await no()}const rc=document.getElementById("content");let lo={},gs=null;function nc(){Object.values(lo).forEach(t=>t?.destroy()),lo={}}function lc(t,e){if(!window.jspdf){g("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a({orientation:"landscape",unit:"px",format:"a4"}),i=document.getElementById("salesReportSummaryCards");if(s.setFontSize(18),s.text(t,s.internal.pageSize.getWidth()/2,40,{align:"center"}),i){const r=[["Receita Total",i.querySelector("#summary-revenue").textContent],["Vendas Totais",i.querySelector("#summary-transactions").textContent],["Ticket Médio",i.querySelector("#summary-avg-ticket").textContent]];s.autoTable({startY:60,head:[["Métrica","Valor"]],body:r,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const o=s.lastAutoTable?s.lastAutoTable.finalY+20:60;s.text("Detalhes das Vendas",20,o),s.autoTable({html:`#${e}`,startY:o+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),s.save(`${t.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function co(t){const e=document.getElementById("genericModal"),a=v(t.client),s=v(t.items),i=v(t.responsavelCaixa||"N/A"),o=(t.payments||[]).map(r=>`
        <div class="flex justify-between text-sm">
            <span>${v(r.method.charAt(0).toUpperCase()+r.method.slice(1))}</span>
            <span class="font-medium">R$ ${r.value.toFixed(2)}</span>
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
                    <p class="font-semibold text-gray-800">${i}</p>
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
    `,e.style.display="flex"}function dc(t){const{summary:e,transactions:a}=t;document.getElementById("summary-revenue").textContent=`R$ ${e.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=e.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${e.averageTicket.toFixed(2)}`;const s=document.getElementById("paymentSummaryTableBody"),i=Object.entries(e.paymentMethodTotals).sort(([,n],[,l])=>l-n);s.innerHTML=i.map(([n,l])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${v(n.charAt(0).toUpperCase()+n.slice(1))}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${l.toFixed(2)}</td>
        </tr>
    `).join("");const o=document.getElementById("transactionsTableBody"),r=document.getElementById("mobileTransactionsList");if(a.length===0){const n='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';o.innerHTML=n,r.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}o.innerHTML=a.map((n,l)=>{const d=v(n.client),u=v(n.items),c=v(n.type);return`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${l}">
            <td class="w-24 py-3 px-4">${new Date(n.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${d}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${u}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${c}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${n.total.toFixed(2)}</td>
        </tr>
    `}).join(""),o.querySelectorAll("tr").forEach(n=>{n.addEventListener("dblclick",()=>{const l=n.dataset.transactionIndex,d=gs.transactions[l];d&&co(d)})}),r.innerHTML=a.map((n,l)=>{const d=v(n.client),u=v(n.items),c=v(n.type);return`
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
    `}).join(""),r.querySelectorAll("div[data-transaction-index]").forEach(n=>{n.addEventListener("click",()=>{const l=n.dataset.transactionIndex,d=gs.transactions[l];d&&co(d)})})}async function uo(){const t=document.getElementById("main-reports-view"),e=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!t||!e||!a)return;const s=e.value,i=a.value;if(!s||!i)return g("Atenção","Por favor, selecione as datas de início e fim.","error");t.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const o=document.getElementById("cashierSessionFilter").value,r=await xa({establishmentId:f.establishmentId,startDate:s,endDate:i,cashierSessionId:o});gs=r,t.innerHTML=`
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
        `,dc(r)}catch(o){g("Erro",`Não foi possível carregar o relatório: ${o.message}`,"error"),t.innerHTML=`<p class="p-8 text-center text-red-500">${v(o.message)}</p>`}}async function cc(){nc();const t=new Date().toISOString().split("T")[0],e=new Date;e.setDate(e.getDate()-30);const a=e.toISOString().split("T")[0];rc.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",uo),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const s=document.getElementById("reportStartDate").value,i=document.getElementById("reportEndDate").value,o=`Relatorio_Vendas_${s}_a_${i}`;lc(o,"transactionsTable")});try{const s=await On(f.establishmentId),i=document.getElementById("cashierSessionFilter");s&&s.length>0&&s.forEach(o=>{const r=new Date(o.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),n=v(o.closedByName||"N/A");i.innerHTML+=`<option value="${o.id}">${n} - ${r}</option>`})}catch{g("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await uo()}const uc=document.getElementById("content");let $={payables:[],receivables:[],natures:[],costCenters:[],establishments:[],suppliers:[],clients:[],professionals:[],currentTab:"receivables",statusFilter:"all",startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date(new Date().getFullYear(),new Date().getMonth()+1,0).toISOString().split("T")[0],filterNaturezaId:"all",filterCostCenterId:"all",searchQuery:"",isAdvancedFilterOpen:!1,selectedIds:new Set,isSelectionMode:!1,sortCol:"dueDate",sortAsc:!0},aa=null,sa=null;function qs(t){const e=new Map,a=[];return t&&(t.forEach(s=>e.set(s.id,{...s,children:[]})),e.forEach(s=>{s.parentId&&e.has(s.parentId)?e.get(s.parentId).children.push(s):a.push(s)})),a}function Ti(t){if(!t)return{day:"--",month:"---",full:"--/--/----"};const[e,a,s]=t.split("-"),i=new Date(e,a-1,s),o=String(i.getDate()).padStart(2,"0"),r=i.toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return{day:o,month:r,full:i.toLocaleDateString("pt-BR")}}function ye(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t)}function ut(t,e){if(e==="paid")return!1;const a=new Date;a.setHours(0,0,0,0);const[s,i,o]=t.split("-");return new Date(s,i-1,o)<a}function pc(t,e,a){if(!t)return;if(!e||e.length===0){t.innerHTML=`
            <div class="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <i class="bi bi-inbox text-3xl text-gray-300"></i>
                <p class="text-gray-500 text-sm mt-2 font-medium">Nenhum item criado.</p>
            </div>`;return}const s=(i,o=0)=>{const r=o*16,n=o===0,l=n?"bi-folder-fill text-indigo-500":"bi-file-earmark-text text-gray-400",d=n?"bg-white shadow-sm border border-gray-200":"bg-gray-50 border border-gray-100",u=n?"text-sm font-bold text-gray-800":"text-sm font-semibold text-gray-600",c=o>0?'<div class="absolute left-0 top-1/2 w-3 border-t-2 border-gray-200" style="margin-left: -12px;"></div>':"",p=o>0?"border-left: 2px solid #e5e7eb;":"";return`
            <div class="relative flex justify-between items-center ${d} p-3 rounded-xl mb-2 hover:border-indigo-300 transition-all group" style="margin-left: ${r}px; ${p}">
                ${c}
                <span class="${u} flex items-center gap-2">
                    <i class="bi ${l} text-lg"></i>
                    ${v(i.name)}
                </span>
                <button type="button" data-action="delete-${a}" data-id="${i.id}" class="text-gray-400 hover:text-red-600 text-xs w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-red-100" title="Excluir">
                    <i class="bi bi-trash3 text-sm"></i>
                </button>
            </div>
            ${i.children.map(b=>s(b,o+1)).join("")}
        `};t.innerHTML=e.map(i=>s(i)).join("")}async function po(t){const e=document.getElementById("genericModal"),a=t==="nature",s=a?"Plano de Naturezas":"Centros de Custo",i=a?Ba:Ss,o=a?tn:an,r=a?"natures":"costCenters";e.className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 p-0 md:p-6",e.innerHTML=`
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
        </div>`,e.style.display="flex",requestAnimationFrame(()=>{e.classList.remove("opacity-0");const c=e.querySelector("#modal-content-wrapper");c&&(c.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),c.classList.add("translate-y-0","md:scale-100","md:opacity-100"))});const n=e.querySelector("#hierarchyList"),l=e.querySelector("#itemParent"),d=c=>{const p=qs(c);pc(n,p,t);const b=l.value;l.innerHTML='<option value="">-- Nível Principal --</option>';const m=(x,y=0)=>{const S="  ".repeat(y)+(y>0?"↳ ":"");l.innerHTML+=`<option value="${x.id}">${S}${v(x.name)}</option>`,x.children.forEach(L=>m(L,y+1))};p.forEach(x=>m(x)),l.value=b};try{const c=await i(f.establishmentId);$[r]=c,d(c)}catch(c){console.error(c)}const u=e.querySelector("#hierarchyForm");u.addEventListener("submit",async c=>{c.preventDefault();const p=e.querySelector("#itemName").value,b=l.value;try{await o({name:p,parentId:b||null,establishmentId:f.establishmentId});const m=await i(f.establishmentId);$[r]=m,d(m),u.reset(),await Be(),g("Sucesso","Item adicionado à estrutura.","success")}catch(m){g("Erro",m.message,"error")}})}function Nt(){const t=document.getElementById("genericModal");t.classList.add("opacity-0");const e=t.querySelector("#modal-content-wrapper");e&&(e.classList.remove("translate-y-0","md:scale-100","md:opacity-100"),e.classList.add("translate-y-full","md:scale-95","md:opacity-0")),setTimeout(()=>{t.style.display="none",t.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",t.innerHTML=""},300)}async function bc(){try{const e=(await ke()).matrizes||[];$.establishments=[],e.forEach(a=>{$.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>$.establishments.push({id:s.id,name:s.name,type:"Filial"}))})}catch(t){console.warn("Erro ao buscar lojas",t)}Mi(),Bi(),await Be()}function Mi(){uc.innerHTML=`
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
    `,Ai()}function mc(){const t=$.currentTab==="receivables",e=t?$.receivables:$.payables;let a=e;if($.statusFilter!=="all"&&(a=e.filter(n=>{const l=ut(n.dueDate,n.status);return $.statusFilter==="overdue"?l:$.statusFilter==="pending"?n.status==="pending"&&!l:n.status===$.statusFilter})),$.searchQuery&&(a=a.filter(n=>n.description&&n.description.toLowerCase().includes($.searchQuery)||n.entity&&n.entity.toLowerCase().includes($.searchQuery)||n.notes&&n.notes.toLowerCase().includes($.searchQuery))),a.sort((n,l)=>new Date(n.dueDate)-new Date(l.dueDate)),a.length===0){g("Aviso","Não há dados para exportar com os filtros atuais.","info");return}const s=new Map($.natures.map(n=>[n.id,n.name])),i=new Map($.costCenters.map(n=>[n.id,n.name])),o=new Map($.establishments.map(n=>[n.id,n])),r=a.map(n=>{const l=n.status==="paid",d=ut(n.dueDate,n.status);let u=l?"Baixado":d?"Atrasado":"A Vencer / Pendente";const c=n.naturezaId?s.get(n.naturezaId)||"Não Categorizado":"Geral",p=n.centroDeCustoId?i.get(n.centroDeCustoId)||"Não Categorizado":"Geral",b=o.get(n.establishmentId),m=b?b.name:"Atual",x=n.saleId||n.appointmentId||n.origin==="comanda"?"Comanda / PDV":n.origin==="commission"?"Comissões":"Manual";return{"Data de Vencimento":new Date(n.dueDate).toLocaleDateString("pt-BR"),"Data de Pagamento":n.paymentDate?new Date(n.paymentDate).toLocaleDateString("pt-BR"):"-",Descrição:n.description||"","Favorecido / Pagador":n.entity||"",Unidade:m,Natureza:c,"Centro de Custo":p,Origem:x,"Documento / NFS":n.documentNumber||"",Status:u,"Valor (R$)":n.amount}});try{if(typeof XLSX>"u"){g("Erro","A biblioteca de exportação (XLSX) não foi carregada no sistema.","error");return}const n=XLSX.utils.json_to_sheet(r),l=XLSX.utils.book_new();XLSX.utils.book_append_sheet(l,n,"Financeiro");const u=`Fluxo_${t?"Receitas":"Despesas"}_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(l,u)}catch(n){console.error("Erro ao exportar:",n),g("Erro","Não foi possível exportar para Excel.","error")}}function gc(){document.querySelectorAll(".sort-header").forEach(t=>{const e=t.querySelector("i.bi-chevron-expand, i.bi-chevron-up, i.bi-chevron-down");if(!e)return;t.dataset.sort===$.sortCol?(t.classList.add("text-indigo-700"),t.classList.remove("text-gray-500"),e.className=$.sortAsc?"bi bi-chevron-up ml-1 text-indigo-600 text-[11px] font-black":"bi bi-chevron-down ml-1 text-indigo-600 text-[11px] font-black"):(t.classList.remove("text-indigo-700"),t.classList.add("text-gray-500"),e.className="bi bi-chevron-expand ml-1 opacity-40 text-[10px] font-black")})}function Bi(){document.querySelectorAll(".sort-header").forEach(o=>{o.addEventListener("click",r=>{const n=r.currentTarget.dataset.sort;$.sortCol===n?$.sortAsc=!$.sortAsc:($.sortCol=n,$.sortAsc=!0),Dt()})});const t=document.getElementById("select-all-toggle");t&&t.addEventListener("change",o=>{const r=o.target.checked,n=document.querySelectorAll(".item-checkbox");$.selectedIds.clear(),n.forEach(l=>{l.checked=r,r&&$.selectedIds.add(l.value)}),st()}),document.getElementById("cancel-selection-btn").addEventListener("click",()=>{$.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(o=>o.checked=!1),st()}),document.getElementById("batch-delete-btn").addEventListener("click",async()=>{const o=$.selectedIds.size;if(o===0)return;if(await G("Excluir Lançamentos",`Deseja realmente apagar ${o} registros financeiros?`))try{const n=$.currentTab==="payables"?"payables":"receivables";await Wo(n,Array.from($.selectedIds)),g("Sucesso",`${o} itens excluídos.`,"success"),$.selectedIds.clear(),st(),Be()}catch{g("Erro","Falha ao excluir itens.","error")}}),document.getElementById("custom-date-btn").addEventListener("click",()=>{const o=document.getElementById("filter-panel"),r=document.getElementById("custom-date-btn");$.isAdvancedFilterOpen=!$.isAdvancedFilterOpen,$.isAdvancedFilterOpen?(o.classList.remove("hidden"),r.classList.add("bg-gray-900","text-white","border-gray-900"),r.classList.remove("bg-white","text-gray-600","border-gray-200")):(o.classList.add("hidden"),r.classList.remove("bg-gray-900","text-white","border-gray-900"),r.classList.add("bg-white","text-gray-600","border-gray-200"))});const e=document.getElementById("export-excel-btn");e&&e.addEventListener("click",mc);const a=document.getElementById("settings-btn");a&&a.addEventListener("click",hc),document.querySelectorAll('[data-action="new-financial"]').forEach(o=>{o.addEventListener("click",r=>{navigator.vibrate&&navigator.vibrate(20),mo(r.target.closest("button").dataset.type)})});const s=document.getElementById("tab-receivables"),i=document.getElementById("tab-payables");s.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15),bo("receivables")}),i.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15),bo("payables")}),document.querySelectorAll(".status-filter-btn").forEach(o=>{o.addEventListener("click",r=>{navigator.vibrate&&navigator.vibrate(15),document.querySelectorAll(".status-filter-btn").forEach(l=>{l.classList.remove("bg-gray-900","bg-blue-600","bg-emerald-600","bg-red-600","text-white"),l.classList.add("bg-white","text-gray-600")});const n=r.target.dataset.status;n==="all"?r.target.classList.add("bg-gray-900","text-white"):n==="pending"?r.target.classList.add("bg-blue-600","text-white"):n==="paid"?r.target.classList.add("bg-emerald-600","text-white"):n==="overdue"&&r.target.classList.add("bg-red-600","text-white"),r.target.classList.remove("bg-white","text-gray-600"),$.statusFilter=n,Dt()})}),document.querySelectorAll(".date-preset-btn").forEach(o=>{o.addEventListener("click",r=>{navigator.vibrate&&navigator.vibrate(15),document.querySelectorAll(".date-preset-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),r.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.target.classList.remove("bg-white","text-gray-600","border-gray-200");const n=r.target.dataset.preset,l=new Date;let d,u;n==="month"?(d=new Date(l.getFullYear(),l.getMonth(),1),u=new Date(l.getFullYear(),l.getMonth()+1,0)):n==="last_month"&&(d=new Date(l.getFullYear(),l.getMonth()-1,1),u=new Date(l.getFullYear(),l.getMonth(),0)),document.getElementById("filterStartDate").value=d.toISOString().split("T")[0],document.getElementById("filterEndDate").value=u.toISOString().split("T")[0],$.startDate=d.toISOString().split("T")[0],$.endDate=u.toISOString().split("T")[0],Be()})}),document.getElementById("searchInput").addEventListener("input",o=>{$.searchQuery=o.target.value.toLowerCase(),Dt()}),document.getElementById("clear-filters-btn").addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15);const o=new Date;document.getElementById("filterStartDate").value=new Date(o.getFullYear(),o.getMonth(),1).toISOString().split("T")[0],document.getElementById("filterEndDate").value=new Date(o.getFullYear(),o.getMonth()+1,0).toISOString().split("T")[0],document.getElementById("filterNaturezaId").value="all",document.getElementById("filterCostCenterId").value="all",Mi(),Bi(),Be()}),document.getElementById("apply-filter-btn").addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(20),$.startDate=document.getElementById("filterStartDate").value,$.endDate=document.getElementById("filterEndDate").value,$.filterNaturezaId=document.getElementById("filterNaturezaId").value,$.filterCostCenterId=document.getElementById("filterCostCenterId").value,document.getElementById("custom-date-btn").click(),Be()}),aa&&document.body.removeEventListener("click",aa),aa=o=>{const r=o.target;if(r.classList.contains("item-checkbox")||r.classList.contains("modal-item-checkbox")){const d=r.value||r.dataset.id;r.checked?$.selectedIds.add(d):$.selectedIds.delete(d),st(),o.stopPropagation();return}const n=r.closest("button[data-action]");if(n){const{action:d,type:u,id:c}=n.dataset;if(d==="mark-as-paid"){o.stopPropagation(),navigator.vibrate&&navigator.vibrate(20),fc(u,c);return}if(d==="delete"){o.stopPropagation(),navigator.vibrate&&navigator.vibrate(30);const p=n.closest(".financial-row").dataset.item;try{qi(u,JSON.parse(decodeURIComponent(p)))}catch(b){console.error("Parse error on delete",b)}return}if(d==="manage-natures"){o.stopPropagation(),po("nature");return}if(d==="manage-cost-centers"){o.stopPropagation(),po("cost-center");return}if(d==="close-modal"){o.stopPropagation(),Nt();return}}const l=r.closest(".financial-row");if(l&&document.getElementById("list-container").contains(l)&&!r.closest("button")&&!r.closest(".item-checkbox")){navigator.vibrate&&navigator.vibrate(15);const{type:d}=l.dataset;try{const u=JSON.parse(decodeURIComponent(l.dataset.item));mo(d,u)}catch(u){console.error("Parse error on card click",u),g("Erro","Os dados deste lançamento não puderam ser lidos corretamente.","error")}}},document.body.addEventListener("click",aa),sa&&document.getElementById("genericModal").removeEventListener("click",sa),sa=o=>{const r=o.target.closest('button[data-action^="delete-"]');if(r){const n=r.dataset.action.split("-")[1];handleDeleteHierarchyItem(n,r.dataset.id)}o.target===document.getElementById("genericModal")&&Nt()},document.getElementById("genericModal").addEventListener("click",sa)}function st(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=$.selectedIds.size;e.textContent=a,a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex"))}function bo(t){$.currentTab=t,$.selectedIds.clear(),st(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1);const e=document.getElementById("tab-receivables"),a=document.getElementById("tab-payables");t==="receivables"?(e.classList.add("bg-white","md:bg-emerald-50","text-emerald-700","shadow-sm","md:shadow-none"),e.classList.remove("text-gray-500"),a.classList.remove("bg-white","md:bg-red-50","text-red-700","shadow-sm","md:shadow-none"),a.classList.add("text-gray-500")):(a.classList.add("bg-white","md:bg-red-50","text-red-700","shadow-sm","md:shadow-none"),a.classList.remove("text-gray-500"),e.classList.remove("bg-white","md:bg-emerald-50","text-emerald-700","shadow-sm","md:shadow-none"),e.classList.add("text-gray-500")),Dt(),ji()}async function Be(){const t=document.getElementById("list-container");t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-sm">A sincronizar carteira...</p></div>';try{if($.natures.length===0){const[r,n,l,d,u]=await Promise.all([Ba(f.establishmentId),Ss(f.establishmentId),qt(f.establishmentId).catch(()=>[]),mt(f.establishmentId,"",1e3).catch(()=>[]),De(f.establishmentId).catch(()=>[])]);$.natures=r||[],$.costCenters=n||[],$.suppliers=l||[],$.clients=d||[],$.professionals=u||[],Ai()}const a=(f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId]).join(","),s={startDate:$.startDate,endDate:$.endDate,establishmentId:a};$.filterNaturezaId!=="all"&&(s.natureId=$.filterNaturezaId),$.filterCostCenterId!=="all"&&(s.costCenterId=$.filterCostCenterId);const[i,o]=await Promise.all([Is(s),Aa(s)]);$.payables=i.entries||[],$.receivables=o.entries||[],ji(),Dt()}catch(e){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-sm font-bold">Erro ao carregar dados: ${e.message}</p>
            </div>`}}function Ai(){const t=s=>{let i='<option value="all">Todas as categorias</option>';const o=qs(s),r=(n,l=0)=>{const d="  ".repeat(l)+(l>0?"↳ ":"");i+=`<option value="${n.id}">${d}${v(n.name)}</option>`,n.children.forEach(u=>r(u,l+1))};return o.forEach(n=>r(n)),i},e=document.getElementById("filterNaturezaId"),a=document.getElementById("filterCostCenterId");e&&(e.innerHTML=t($.natures)),a&&(a.innerHTML=t($.costCenters))}function ji(){const t=document.getElementById("summary-section");if(!t)return;const e=$.currentTab==="receivables";let s=e?$.receivables:$.payables;$.searchQuery&&(s=s.filter(u=>u.description&&u.description.toLowerCase().includes($.searchQuery)||u.entity&&u.entity.toLowerCase().includes($.searchQuery)||u.notes&&u.notes.toLowerCase().includes($.searchQuery)));const i=s.reduce((u,c)=>u+c.amount,0),o=s.filter(u=>u.status==="paid").reduce((u,c)=>u+c.amount,0),r=s.filter(u=>u.status==="pending"&&!ut(u.dueDate,u.status)).reduce((u,c)=>u+c.amount,0),n=s.filter(u=>ut(u.dueDate,u.status)).reduce((u,c)=>u+c.amount,0),l=e?"emerald":"red",d=e?"bi-arrow-down-left-circle-fill text-emerald-500":"bi-arrow-up-right-circle-fill text-red-500";t.innerHTML=`
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 md:p-4 rounded-2xl md:rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-50 flex items-center justify-center">
                    <i class="bi ${d} text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Total<br class="md:hidden"/> Geral</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-gray-900">${ye(i)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 md:p-4 rounded-2xl md:rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-50 flex items-center justify-center">
                    <i class="bi bi-clock-history text-blue-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">A Vencer<br class="md:hidden"/> Pendente</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-blue-600">${ye(r)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 md:p-4 rounded-2xl md:rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-${l}-50 flex items-center justify-center">
                    <i class="bi bi-check-circle-fill text-${l}-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Status<br class="md:hidden"/> Baixado</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-${l}-600">${ye(o)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 md:p-4 rounded-2xl md:rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full ${n>0?"bg-red-50":"bg-gray-50"} flex items-center justify-center">
                    <i class="bi bi-exclamation-circle-fill ${n>0?"text-red-500":"text-gray-300"} text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Pagos<br class="md:hidden"/> Atrasados</span>
            </div>
            <span class="text-xl md:text-2xl font-black ${n>0?"text-red-600":"text-gray-400"}">${ye(n)}</span>
        </div>
    `}function Dt(){const t=document.getElementById("list-container");if(!t)return;const e=$.currentTab==="receivables",a=e?$.receivables:$.payables;let s=a;if($.statusFilter!=="all"&&(s=a.filter(c=>{const p=ut(c.dueDate,c.status);return $.statusFilter==="overdue"?p:$.statusFilter==="pending"?c.status==="pending"&&!p:c.status===$.statusFilter})),$.searchQuery&&(s=s.filter(c=>c.description&&c.description.toLowerCase().includes($.searchQuery)||c.entity&&c.entity.toLowerCase().includes($.searchQuery)||c.notes&&c.notes.toLowerCase().includes($.searchQuery))),s.sort((c,p)=>{let b=c[$.sortCol],m=p[$.sortCol];return $.sortCol==="dueDate"?(b=new Date(b).getTime(),m=new Date(m).getTime()):($.sortCol==="description"||$.sortCol==="status")&&(b=b?b.toLowerCase():"",m=m?m.toLowerCase():""),b<m?$.sortAsc?-1:1:b>m?$.sortAsc?1:-1:0}),gc(),s.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white">
                <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                    <i class="bi bi-wallet2 text-4xl text-gray-300"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-1">Sem resultados</h3>
                <p class="text-sm font-medium text-gray-400 text-center px-4">Não existem lançamentos com os filtros aplicados neste período.</p>
            </div>
        `;return}const i=new Map($.natures.map(c=>[c.id,c.name])),o=new Map($.costCenters.map(c=>[c.id,c.name])),r=new Map($.establishments.map(c=>[c.id,c])),n=e?"receivable":"payable",l=e?"text-emerald-600":"text-red-600",d=e?'<i class="bi bi-arrow-down-left-circle-fill text-emerald-500 text-2xl drop-shadow-sm"></i>':'<i class="bi bi-arrow-up-right-circle-fill text-red-500 text-2xl drop-shadow-sm"></i>',u=e?'<i class="bi bi-arrow-down-left-circle-fill text-emerald-500 text-lg"></i>':'<i class="bi bi-arrow-up-right-circle-fill text-red-500 text-lg"></i>';t.innerHTML=s.map(c=>{const p=Ti(c.dueDate),b=c.status==="paid",m=ut(c.dueDate,c.status);let x="";b?x='<span class="text-[9px] md:text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 md:px-2.5 py-1 rounded-lg uppercase tracking-widest"><i class="bi bi-check2-circle"></i> Baixado</span>':m?x='<span class="text-[9px] md:text-[10px] font-black text-red-600 bg-red-50 px-2 md:px-2.5 py-1 rounded-lg uppercase tracking-widest"><i class="bi bi-exclamation-circle"></i> Atraso</span>':x='<span class="text-[9px] md:text-[10px] font-black text-blue-600 bg-blue-50 px-2 md:px-2.5 py-1 rounded-lg uppercase tracking-widest"><i class="bi bi-clock"></i> Pendente</span>';const y=c.naturezaId&&i.get(c.naturezaId)||"Geral",S=c.centroDeCustoId&&o.get(c.centroDeCustoId)||"Geral",L=r.get(c.establishmentId);let D="";if(L){const P=L.type==="Matriz"?"bi-building":"bi-shop";D=`<span class="text-[9px] font-bold text-gray-600 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200 flex items-center max-w-[110px] truncate leading-none shadow-sm" title="${v(L.name)}"><i class="bi ${P} mr-1 opacity-60"></i> ${v(L.name)}</span>`}const k=encodeURIComponent(JSON.stringify(c)),I=$.selectedIds.has(c.id),V=!!c.recurrenceId?'<i class="bi bi-arrow-repeat text-indigo-600 ml-1 text-sm md:text-base bg-indigo-50 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center shadow-sm" title="Recorrente"></i>':"";return`
        <div class="financial-row bg-white border border-gray-100 md:border-0 md:border-b md:border-gray-100 hover:bg-gray-50 transition-all cursor-pointer relative flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center p-3.5 md:px-6 md:py-4 mb-3 md:mb-0 rounded-2xl md:rounded-none ${I?"ring-2 md:ring-0 ring-indigo-500 bg-indigo-50/50 md:bg-indigo-50/50":""} ${b?"opacity-70 md:opacity-100":""}"
             data-type="${n}"
             data-item="${k}">
            
            <div class="absolute right-3 top-3 md:relative md:right-auto md:top-auto md:col-span-1 flex md:justify-center z-10">
                <input type="checkbox" value="${c.id}" class="item-checkbox w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm bg-white" ${I?"checked":""}>
            </div>

            <div class="md:hidden flex items-start gap-3 w-full pr-6">
                <div class="flex-shrink-0 relative pt-1">
                    ${d}
                </div>
                <div class="flex-1 min-w-0 flex flex-col">
                    <div class="flex justify-between items-center mb-1">
                        <p class="font-bold text-[14px] text-gray-900 truncate leading-tight pr-2 ${b?"line-through text-gray-400":""}">${v(c.description)}</p>
                        <p class="font-black text-[16px] leading-none flex-shrink-0 ${b?"text-gray-400":l}">${ye(c.amount)}</p>
                    </div>
                    <div class="flex justify-between items-end mt-1.5">
                        <div class="flex flex-col gap-1.5 overflow-hidden pr-2">
                            <p class="text-[10px] text-gray-500 font-semibold truncate leading-none"><i class="bi bi-person opacity-60 mr-1"></i>${v(c.entity||"Sem Entidade")}</p>
                            <div class="flex items-center gap-1.5 overflow-hidden mt-1">
                                <span class="text-[9px] font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-lg border border-gray-200 whitespace-nowrap leading-none shadow-sm">
                                    Venc: ${p.full}
                                </span>
                                <span class="text-[9px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 truncate max-w-[100px] leading-none">
                                    ${y}
                                </span>
                                ${D}
                                ${V}
                            </div>
                        </div>
                        <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
                            ${x}
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
                    <p class="font-bold text-sm text-gray-900 truncate ${b?"line-through text-gray-400":""}">${v(c.description)}</p>
                    ${c.documentNumber?`<span class="text-[9px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-lg border border-gray-200 shadow-sm leading-none flex-shrink-0">NF: ${v(c.documentNumber)}</span>`:""}
                </div>
                <p class="text-xs text-gray-500 font-semibold truncate mt-1.5 pl-7"><i class="bi bi-person opacity-60 mr-1.5"></i>${v(c.entity||"Sem Entidade associada")}</p>
            </div>

            <div class="hidden md:flex md:col-span-2 flex-col justify-center min-w-0 pr-4 gap-1.5">
                <span class="text-[10px] font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200 w-max max-w-full truncate shadow-sm"><i class="bi bi-tag opacity-50 mr-1.5"></i>${y}</span>
                <span class="text-[10px] font-semibold text-gray-500 truncate w-max max-w-full"><i class="bi bi-diagram-3 opacity-50 mr-1.5"></i>${S}</span>
            </div>

            <div class="hidden md:flex md:col-span-1 justify-center items-center">
                ${x}
            </div>

            <div class="hidden md:flex md:col-span-2 justify-end items-center pr-6">
                <p class="font-black text-lg ${b?"text-gray-400":l}">${ye(c.amount)}</p>
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
        `}).join("")}async function fc(t,e){const a=new Date().toISOString().split("T")[0];try{await(t==="payable"?rn(e,a):cn(e,a)),g("Baixa Realizada","O lançamento foi registado como pago.","success"),await Be()}catch(s){g("Erro",s.message,"error")}}async function qi(t,e){if(!!!e.recurrenceId){await G("Excluir Lançamento","Tem certeza? Essa ação apagará o registo do seu fluxo de caixa.")&&await Ni(t,[e.id]);return}xc(t,e)}function xc(t,e){const a=document.getElementById("genericModal"),i=(t==="payable"?$.payables:$.receivables).filter(d=>d.recurrenceId===e.recurrenceId).sort((d,u)=>new Date(d.dueDate)-new Date(u.dueDate));a.className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 p-0 md:p-6",a.innerHTML=`
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
                ${i.map(d=>{const u=d.id===e.id,c=d.status==="paid",p=Ti(d.dueDate);return`
                    <label class="flex items-center gap-4 p-4 bg-white rounded-2xl border ${u?"border-red-400 ring-2 ring-red-100 shadow-md bg-red-50/20":"border-gray-200 shadow-sm"} cursor-pointer transition-all hover:bg-gray-50 active:scale-[0.98]">
                        <input type="checkbox" class="modal-item-checkbox w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" value="${d.id}" ${u?"checked":""}>
                        
                        <div class="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex flex-col items-center justify-center border border-gray-200">
                            <span class="text-base font-black text-gray-800 leading-none">${p.day}</span>
                            <span class="text-[9px] font-bold text-gray-500 uppercase leading-none mt-1.5">${p.month}</span>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-bold text-gray-900 truncate">${v(d.description)}</p>
                            <p class="text-sm font-black text-gray-600 mt-1">${ye(d.amount)} ${c?'<span class="text-emerald-600 font-bold ml-1">(Baixado)</span>':""}</p>
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
    `,a.style.display="flex",requestAnimationFrame(()=>{a.classList.remove("opacity-0");const d=a.querySelector("#modal-content-wrapper");d&&(d.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),d.classList.add("translate-y-0","md:scale-100","md:opacity-100"))});const o=a.querySelector("#modal-select-all"),r=a.querySelectorAll(".modal-item-checkbox"),n=a.querySelector("#confirm-batch-delete");o.addEventListener("change",d=>{r.forEach(u=>u.checked=d.target.checked),l()}),r.forEach(d=>d.addEventListener("change",l));function l(){const d=Array.from(r).filter(u=>u.checked).length;n.innerHTML=d>0?`<i class="bi bi-trash3-fill"></i> Excluir ${d} Parcela(s)`:"Selecione para excluir",n.disabled=d===0,d===0?n.classList.add("opacity-50","bg-gray-400"):n.classList.remove("opacity-50","bg-gray-400")}n.addEventListener("click",async()=>{const d=Array.from(r).filter(c=>c.checked).map(c=>c.value);if(d.length===0)return;Nt(),await G("Confirmar Ação",`Tem certeza que deseja apagar estas ${d.length} parcelas permanentemente?`)&&await Ni(t,d)}),l()}async function Ni(t,e){try{e.length===1?t==="payable"?await on(e[0]):await dn(e[0]):await Wo(t==="payable"?"payables":"receivables",e),g("Sucesso",`${e.length} registo(s) limpo(s) do sistema.`,"success"),$.selectedIds.clear(),st(),await Be()}catch(a){g("Erro",a.message,"error")}}function hc(){const t=document.getElementById("genericModal");t.className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 p-0 md:p-6",t.innerHTML=`
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
    `,t.style.display="flex",requestAnimationFrame(()=>{t.classList.remove("opacity-0");const e=t.querySelector("#modal-content-wrapper");e&&(e.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),e.classList.add("translate-y-0","md:scale-100","md:opacity-100"))})}function mo(t,e=null){const a=document.getElementById("genericModal"),s=t==="payable",i=s?"red":"emerald",o=e?"Editar Lançamento":"Novo Lançamento",r=(P,z)=>{let O='<option value="">-- Categoria --</option>';const T=qs(P),A=(N,K=0)=>{const ee="  ".repeat(K)+(K>0?"↳ ":""),oe=N.id===z?"selected":"";O+=`<option value="${N.id}" ${oe}>${ee}${v(N.name)}</option>`,N.children.forEach(Z=>A(Z,K+1))};return T.forEach(N=>A(N)),O},l=[{value:"dinheiro",label:"Dinheiro"},{value:"pix",label:"PIX"},{value:"cartao_credito",label:"Cartão de Crédito"},{value:"cartao_debito",label:"Cartão de Débito"},{value:"transferencia",label:"Transferência Bancária"},{value:"boleto",label:"Boleto"},{value:"outros",label:"Outros"}].map(P=>`<option value="${P.value}" ${e?.paymentMethod===P.value?"selected":""}>${P.label}</option>`).join(""),d=`
        <datalist id="entity-suggestions">
            ${s?$.suppliers.map(P=>`<option value="${v(P.name)}">Fornecedor</option>`).join("")+$.professionals.map(P=>`<option value="${v(P.name)}">Profissional</option>`).join(""):$.clients.map(P=>`<option value="${v(P.name)} ${P.phone?"- "+v(P.phone):""}">Cliente</option>`).join("")}
        </datalist>
    `,u=e?.establishmentId||f.selectedEstablishments&&f.selectedEstablishments[0]||f.establishmentId,c=$.establishments.map(P=>{const z=P.id===u;return`<option value="${P.id}" ${z?"selected":""}>${P.type==="Matriz"?"🏢":"📍"} ${v(P.name)}</option>`}).join("");a.className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 md:p-6",a.innerHTML=`
        ${d}

        <div id="modal-content-wrapper" class="w-full md:max-w-5xl bg-gray-50 flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-0 md:scale-95 md:opacity-0 h-full md:h-auto md:max-h-[90vh] md:rounded-3xl overflow-hidden shadow-2xl relative" style="font-family: 'Plus Jakarta Sans', 'Nunito', sans-serif;">
            
            <header class="bg-${i}-600 border-b border-${i}-700 px-5 py-4 flex items-center justify-between pt-safe-top md:pt-4 shadow-sm z-20 flex-shrink-0 relative overflow-hidden md:rounded-t-3xl">
                <div class="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
                    <svg width="150" height="150" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="white" stroke-width="20"/></svg>
                </div>
                <button type="button" data-action="close-modal" class="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-black/20 active:scale-90 transition-colors z-10 relative">
                    <i class="bi bi-x-lg"></i>
                </button>
                <div class="text-center z-10 relative">
                    <h2 class="text-base font-black text-white tracking-tight leading-tight truncate">${o}</h2>
                    <p class="text-[10px] text-${i}-100 font-bold uppercase tracking-widest mt-0.5">${s?"Registo de Despesa":"Registo de Receita"}</p>
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
                            <select name="establishmentId" required class="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${i}-500 focus:bg-white outline-none text-sm font-bold text-gray-800 transition-all shadow-sm cursor-pointer">
                                ${c}
                            </select>
                        </div>

                        <div class="grid grid-cols-2 gap-4 md:col-span-2">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 text-center">Valor Total (R$)</label>
                                <input type="number" step="0.01" name="amount" required 
                                    class="w-full py-3 px-4 border border-gray-200 bg-gray-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-${i}-500 outline-none font-black text-xl md:text-2xl text-center text-${i}-600 transition-all shadow-sm" 
                                    value="${e?.amount||""}" placeholder="0,00">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 text-center">Data de Venc.</label>
                                <input type="date" name="dueDate" required 
                                    class="w-full py-3 px-4 border border-gray-200 bg-gray-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-${i}-500 outline-none font-bold text-sm md:text-base text-center text-gray-900 transition-all shadow-sm" 
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
                                class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${i}-500 outline-none font-bold text-gray-900 text-sm transition-all shadow-sm" 
                                value="${e?.description?v(e.description):""}" placeholder="Ex: Fornecedor de Bebidas...">
                        </div>
                        
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">${s?"Fornecedor / Favorecido":"Cliente / Pagador"}</label>
                            <div class="relative">
                                <i class="bi bi-person absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                                <input type="text" name="entity" list="entity-suggestions" 
                                    class="w-full pl-11 pr-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${i}-500 outline-none font-bold text-sm text-gray-900 transition-all shadow-sm" 
                                    value="${e?.entity?v(e.entity):""}" placeholder="Nome da pessoa ou empresa..." autocomplete="off">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-4 md:p-6 md:rounded-3xl border-b md:border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="grid grid-cols-1 md:col-span-2 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Plano de Natureza</label>
                                <select name="naturezaId" class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${i}-500 outline-none text-sm font-bold text-gray-700 transition-all shadow-sm">
                                    ${r($.natures,e?.naturezaId)}
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Centro de Custo</label>
                                <select name="centroDeCustoId" class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${i}-500 outline-none text-sm font-bold text-gray-700 transition-all shadow-sm">
                                    ${r($.costCenters,e?.centroDeCustoId)}
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 md:col-span-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Nº Documento</label>
                                <input type="text" name="documentNumber" 
                                    class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${i}-500 outline-none text-sm font-bold text-gray-900 transition-all shadow-sm" 
                                    value="${e?.documentNumber?v(e.documentNumber):""}" placeholder="Opcional">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Forma de Pagto.</label>
                                <select name="paymentMethod" class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${i}-500 outline-none text-sm font-bold text-gray-700 transition-all shadow-sm">
                                    <option value="">-- Escolha --</option>
                                    ${l}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-5 md:p-6 md:rounded-3xl border-b md:border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
                        <label class="flex items-center justify-between cursor-pointer group flex-1">
                            <div>
                                <span class="block text-sm md:text-base font-black text-gray-900 uppercase tracking-wide group-active:text-${i}-600 transition-colors">Marcar como ${s?"Pago":"Recebido"}</span>
                                <span class="block text-[9px] md:text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">Confirma a liquidação.</span>
                            </div>
                            <div class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="status" id="status-toggle" class="sr-only peer" ${e?.status==="paid"?"checked":""}>
                                <div class="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-${i}-500 shadow-inner"></div>
                            </div>
                        </label>
                        
                        <div id="payment-date-wrapper" class="${e?.status==="paid"?"":"hidden"} animate-fade-in border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                            <label class="block text-[9px] md:text-[10px] font-black text-${i}-600 uppercase tracking-widest mb-1.5 text-center md:text-left">Data da Baixa Bancária</label>
                            <input type="date" name="paymentDate" 
                                class="w-full py-3 px-4 bg-${i}-50 border-2 border-${i}-200 text-${i}-800 rounded-xl text-sm font-black text-center md:text-left outline-none focus:ring-2 focus:ring-${i}-500/50 shadow-sm transition-all" 
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
                    
                    <button type="submit" class="flex-1 py-3.5 bg-${i}-600 text-white font-black uppercase tracking-wider text-sm rounded-xl hover:bg-${i}-700 shadow-lg shadow-${i}-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                        <i class="bi bi-save2-fill text-lg"></i> <span>${e?"Salvar Lançamento":"Confirmar Lançamento"}</span>
                    </button>
                </div>
            </form>
        </div>
    `,a.style.display="flex",requestAnimationFrame(()=>{a.classList.remove("opacity-0");const P=a.querySelector("#modal-content-wrapper");P&&(P.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),P.classList.add("translate-y-0","md:scale-100","md:opacity-100"))});const p=a.querySelector("#financial-form");let b="single",m=2;const x=p.querySelector("#modal-delete-btn");x&&x.addEventListener("click",P=>{P.preventDefault(),navigator.vibrate&&navigator.vibrate(30),Nt(),setTimeout(()=>qi(t,e),300)});const y=p.querySelector('[name="amount"]'),S=p.querySelector("#recurrence-options"),L=p.querySelector("#recurrence-summary"),D=p.querySelector("#installments-input"),k=p.querySelector("#status-toggle"),I=p.querySelector("#payment-date-wrapper"),M=p.querySelector('[name="paymentDate"]'),V=()=>{if(b==="single")return;const P=parseFloat(y.value)||0;if(m=parseInt(D.value)||2,P===0){L.innerHTML='<span class="text-[10px] md:text-xs text-indigo-400 font-bold">Digite o valor total...</span>';return}if(b==="installment"){const z=P/m;L.innerHTML=`
                <div>
                    <span class="block text-[8px] md:text-[10px] text-indigo-400 uppercase tracking-widest font-black mb-0.5">Simulação do Parcelamento</span>
                    <span class="font-black text-sm md:text-base text-indigo-700 block leading-tight">${m}x de ${ye(z)}</span>
                    <span class="text-[9px] md:text-[10px] text-indigo-500 font-bold mt-1 block bg-indigo-50/50 p-1 rounded">Total da Dívida: ${ye(P)}</span>
                </div>
            `}else if(b==="repeat"){const z=P*m;L.innerHTML=`
                <div>
                    <span class="block text-[8px] md:text-[10px] text-indigo-400 uppercase tracking-widest font-black mb-0.5">Geração Recorrente Fixa</span>
                    <span class="font-black text-sm md:text-base text-indigo-700 block leading-tight">${m} meses de ${ye(P)}</span>
                    <span class="text-[9px] md:text-[10px] text-indigo-500 font-bold mt-1 block bg-indigo-50/50 p-1 rounded">Comprometimento: ${ye(z)}</span>
                </div>
            `}};p.addEventListener("click",P=>{const z=P.target.closest(".mode-btn");if(z&&!e)if(P.preventDefault(),navigator.vibrate&&navigator.vibrate(15),p.querySelectorAll(".mode-btn").forEach(A=>{A.classList.remove("bg-white","text-gray-900","shadow-sm"),A.classList.add("text-gray-500")}),z.classList.add("bg-white","text-gray-900","shadow-sm"),z.classList.remove("text-gray-500"),b=z.dataset.mode,b==="single")S.style.display="none";else{S.style.display="block";const A=S.querySelector("#recurrence-label");A&&(A.textContent=b==="installment"?"Número de Parcelas":"Repetir por quantos meses?"),V()}if(P.target.closest("#btn-minus")&&D){P.preventDefault(),navigator.vibrate&&navigator.vibrate(10);let A=parseInt(D.value)||2;A>2&&(D.value=A-1,V())}if(P.target.closest("#btn-plus")&&D){P.preventDefault(),navigator.vibrate&&navigator.vibrate(10);let A=parseInt(D.value)||2;A<60&&(D.value=A+1,V())}}),y.addEventListener("input",V),D&&D.addEventListener("input",V),k.addEventListener("change",()=>{navigator.vibrate&&navigator.vibrate(20),k.checked?(I.classList.remove("hidden"),M.required=!0):(I.classList.add("hidden"),M.required=!1)}),p.addEventListener("submit",async P=>{P.preventDefault();const z=p.querySelector('button[type="submit"]'),O=z.innerHTML;z.disabled=!0,z.innerHTML='<div class="loader mx-auto h-5 w-5 border-2 border-white border-t-transparent"></div>';const T=new FormData(p),A=k.checked,N=parseFloat(T.get("amount"));let K=N,ee=1;!e&&b!=="single"&&(ee=parseInt(T.get("installments")),b==="repeat"&&(K=N*ee));const oe=T.get("establishmentId");if(!oe){g("Atenção","Selecione uma Unidade válida para o lançamento.","warning"),z.disabled=!1,z.innerHTML=O;return}const Z={companyId:f.companyId,establishmentId:oe,description:T.get("description"),amount:K,dueDate:T.get("dueDate"),naturezaId:T.get("naturezaId")||null,centroDeCustoId:T.get("centroDeCustoId")||null,entity:T.get("entity")||null,paymentMethod:T.get("paymentMethod")||null,documentNumber:T.get("documentNumber")||null,notes:T.get("notes"),status:A?"paid":"pending",paymentDate:A?T.get("paymentDate"):null,installments:ee};ee>1&&!e&&(Z.recurrenceId=self.crypto.randomUUID());try{e?(await(s?sn(e.id,Z):ln(e.id,Z)),g("Sucesso","Atualizado com sucesso!","success")):(await(s?Go(Z):nn(Z)),g("Sucesso","Lançamento criado!","success")),Nt(),Be()}catch(F){g("Erro",F.message||"Erro ao salvar","error"),z.disabled=!1,z.innerHTML=O}})}const vc=t=>C("/api/commissions/calculate",{method:"POST",body:JSON.stringify(t)}),yc=t=>C("/api/commissions/save",{method:"POST",body:JSON.stringify(t)}),wc=(t,e)=>{const a=new URLSearchParams({startDate:t,endDate:e}).toString();return C(`/api/commissions/stats?${a}`)},kc=(t={})=>{Object.keys(t).forEach(s=>(t[s]===void 0||t[s]===null||t[s]==="")&&delete t[s]);const e=new URLSearchParams(t).toString(),a=`/api/commissions/history${e?"?"+e:""}`;return C(a)},Fi=t=>C(`/api/commissions/report/${t}`,{method:"DELETE"}),Ia=new Date,Sc=new Date(Ia.getFullYear(),Ia.getMonth(),1);let R={professionals:[],reports:[],calculationResult:null,periodString:"",establishmentConfig:null,selectedIds:new Set,isAdvancedFilterOpen:!1,startDate:Sc.toISOString().split("T")[0],endDate:new Date(Ia.getFullYear(),Ia.getMonth()+1,0).toISOString().split("T")[0],professionalId:"all",searchQuery:"",stats:{revenue:0,commissions:0,margin:0,netPaid:0},viewMode:"list"},oa=null;const Ic=document.getElementById("content");function Pt(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function $c(t){return t?new Date(t).toLocaleDateString("pt-BR"):"--/--/----"}function $a(t){if(!t)return"PR";const e=t.trim().split(" ");return e.length>=2?(e[0][0]+e[e.length-1][0]).toUpperCase():t.substring(0,2).toUpperCase()}function Ri(){const t=document.getElementById("commissions-layout-main"),e=document.getElementById("commissions-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&(t.style.display="none"),e&&(e.classList.remove("hidden"),e.className="fixed inset-0 z-[99999] bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-end md:justify-center w-full h-[100dvh] overflow-hidden"),a&&window.innerWidth<768&&(a.style.display="none")}function Ns(){const t=document.getElementById("commissions-layout-main"),e=document.getElementById("commissions-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&(t.style.display="flex"),e&&(e.classList.add("hidden"),e.className="hidden"),a&&window.innerWidth<768&&(a.style.display=""),R.viewMode="list",R.calculationResult=null}async function Ec(){try{const[t,e]=await Promise.all([De(f.establishmentId),Ae(f.establishmentId).catch(()=>({}))]);R.professionals=t,R.establishmentConfig=e||{}}catch(t){console.error("Erro na inicialização de comissões",t)}R.viewMode="list",Lc(),Dc(),await pt()}function Lc(){const t=R.professionals.map(e=>`<option value="${e.id}">${e.name}</option>`).join("");Ic.innerHTML=`
        <style>
            #toast-container, .toast-notification, .modal, .modal-backdrop { z-index: 9999999 !important; }
            /* Custom Scrollbar escondida para UI Limpa mas funcional */
            .hide-scroll-calc::-webkit-scrollbar { width: 4px; }
            .hide-scroll-calc::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
            .hide-scroll-calc::-webkit-scrollbar-track { background: transparent; }
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
                            <button class="date-preset-btn px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-xl whitespace-nowrap shadow-sm active:scale-95 transition-all border border-indigo-200" data-preset="month">Este Mês</button>
                            <button class="date-preset-btn px-4 py-2 bg-white text-gray-600 text-sm font-bold rounded-xl whitespace-nowrap shadow-sm border border-gray-200 hover:bg-gray-50 active:scale-95 transition-all" data-preset="last_month">Mês Passado</button>
                            <button id="custom-date-btn" class="px-4 py-2 bg-white text-gray-600 text-sm font-bold rounded-xl whitespace-nowrap shadow-sm hover:bg-gray-50 active:scale-95 transition-all flex items-center gap-2 border border-gray-200"><i class="bi bi-calendar-event"></i> Customizado</button>
                        </div>
                        
                        <div class="relative w-full md:w-80">
                            <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                            <input type="text" id="search-input" value="${R.searchQuery}" placeholder="Buscar relatórios..." class="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 shadow-sm rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                        </div>
                    </div>

                    <div id="filter-panel" class="hidden animate-fade-in-down">
                        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                            <div class="grid grid-cols-2 gap-4 flex-1">
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Inicial</label>
                                    <input type="date" id="filter-start" value="${R.startDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Final</label>
                                    <input type="date" id="filter-end" value="${R.endDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
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
                        Profissional & Unidade
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

        <div id="commissions-layout-detail" class="hidden"></div>
    `}async function pt(){const t=document.getElementById("list-container");t&&(t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-sm">Carregando comissões...</p></div>');const a=(f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId]).join(",");try{const[s,i]=await Promise.all([kc({startDate:R.startDate,endDate:R.endDate,professionalId:R.professionalId,establishmentId:a}),wc(R.startDate,R.endDate,a)]);R.reports=s||[];const o=R.reports.reduce((r,n)=>r+(n.summary.finalValue||n.summary.totalCommission),0);R.stats={revenue:i.totalRevenue||0,commissions:i.totalCommissionsPaid||0,margin:i.totalRevenue>0?((i.totalRevenue-i.totalCommissionsPaid)/i.totalRevenue*100).toFixed(1):0,netPaid:o},R.selectedIds.clear(),Tt(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),Cc(),Hi()}catch(s){console.error(s),t&&(t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-sm font-medium">Erro ao carregar dados.</p>
            </div>`)}}function Cc(){const t=document.getElementById("kpi-section");t&&(t.innerHTML=`
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-50 flex items-center justify-center">
                    <i class="bi bi-graph-up-arrow text-indigo-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Faturamento<br class="md:hidden"/> Bruto</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-gray-900">${Pt(R.stats.revenue)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-amber-50 flex items-center justify-center">
                    <i class="bi bi-wallet2 text-amber-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Comissões<br class="md:hidden"/> Pagas</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-amber-600">${Pt(R.stats.commissions)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-50 flex items-center justify-center">
                    <i class="bi bi-pie-chart-fill text-blue-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Retenção<br class="md:hidden"/> Líquida</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-blue-600">${R.stats.margin}%</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                    <i class="bi bi-cash-stack text-emerald-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Líquido<br class="md:hidden"/> Pago</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-emerald-600">${Pt(R.stats.netPaid)}</span>
        </div>
    `)}function Hi(){const t=document.getElementById("list-container");if(!t)return;let e=R.reports;if(R.searchQuery){const a=R.searchQuery.toLowerCase();e=e.filter(s=>s.professionalName.toLowerCase().includes(a)||s.period.toLowerCase().includes(a))}if(e.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white md:bg-transparent text-center rounded-b-2xl">
                <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                    <i class="bi bi-receipt text-4xl text-gray-300"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-1">Nenhum pagamento</h3>
                <p class="text-sm font-medium text-gray-400 max-w-xs px-4">Não há relatórios gerados para este período ou profissional.</p>
            </div>
        `;return}t.innerHTML=e.map(a=>{const s=$c(a.createdAt),i=a.summary.totalCommission,o=a.summary.extraDebit||0,r=a.summary.extraCredit||0,n=a.summary.finalValue||i,l=R.selectedIds.has(a.id),d=a.establishmentName||"Unidade Atual";let u="";return o>0&&r>0?u=`<span class="text-red-500">-R$${o.toFixed(2)}</span> / <span class="text-emerald-500">+R$${r.toFixed(2)}</span>`:o>0?u=`<span class="text-red-500">-R$ ${o.toFixed(2)}</span>`:r>0?u=`<span class="text-emerald-500">+R$ ${r.toFixed(2)}</span>`:u='<span class="text-gray-300">--</span>',`
        <div class="bg-white border border-gray-100 md:border-0 md:border-b md:border-gray-100 hover:bg-gray-50 transition-all cursor-pointer relative flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center p-4 md:px-6 md:py-4 mb-3 md:mb-0 rounded-2xl md:rounded-none ${l?"ring-2 md:ring-0 ring-indigo-500 bg-indigo-50/50 md:bg-indigo-50/50":""}">
            
            <div class="absolute right-3 top-3 md:relative md:right-auto md:top-auto md:col-span-3 md:flex md:items-center md:gap-3 z-10">
                <input type="checkbox" value="${a.id}" class="item-checkbox w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm bg-white" ${l?"checked":""}>
                
                <div class="hidden md:flex items-center gap-3 pr-2">
                    <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm border border-indigo-200">
                        ${$a(a.professionalName)}
                    </div>
                    <div class="min-w-0">
                        <p class="font-bold text-sm text-slate-900 truncate" title="${a.professionalName}">${a.professionalName}</p>
                        <div class="flex items-center gap-1.5 mt-0.5">
                            <span class="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 truncate max-w-[90px]" title="${d}"><i class="bi bi-shop"></i> ${d}</span>
                            <span class="text-[10px] text-slate-400 font-medium truncate">Gerado: ${s}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="md:hidden flex items-center gap-3 w-full pr-8 mb-3">
                <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm border border-indigo-200">
                    ${$a(a.professionalName)}
                </div>
                <div class="min-w-0">
                    <p class="font-bold text-sm text-slate-900 truncate">${a.professionalName}</p>
                    <div class="flex items-center gap-1.5 mt-0.5">
                        <span class="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 truncate max-w-[120px]"><i class="bi bi-shop"></i> ${d}</span>
                        <span class="text-[10px] text-slate-400 font-medium truncate">Gerado: ${s}</span>
                    </div>
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
                <span class="text-sm font-bold text-gray-700">${Pt(i)}</span>
            </div>
            
            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-2 md:mb-0">
                <span class="md:hidden text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ajustes:</span>
                <span class="text-xs font-bold">${u}</span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block pt-2 md:pt-0 border-t md:border-0 border-gray-100 mt-2 md:mt-0">
                <span class="md:hidden text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Líquido Pago:</span>
                <span class="text-base font-black text-emerald-600">${Pt(n)}</span>
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
        `}).join("")}function Dc(){oa&&document.body.removeEventListener("click",oa),oa=o=>{const r=o.target;if(r.classList.contains("item-checkbox")){const l=r.value;r.checked?R.selectedIds.add(l):R.selectedIds.delete(l),Tt(),o.stopPropagation();return}const n=r.closest("button[data-action]");if(n){o.preventDefault();const l=n.dataset.action,d=n.dataset.id;switch(l){case"apply-filters":R.startDate=document.getElementById("filter-start").value,R.endDate=document.getElementById("filter-end").value,R.professionalId=document.getElementById("filter-prof").value,document.getElementById("custom-date-btn")?.click(),pt();break;case"new-calculation":Tc();break;case"whatsapp-receipt":Fc(d);break;case"print-receipt":Hc(d);break;case"delete-report":zc(d);break;case"view-report-details":Nc(d);break;case"close-detail-screen":Ns();break;case"set-calc-preset":Pc(n);break;case"toggle-all-profs":const u=document.querySelectorAll(".prof-checkbox"),c=Array.from(u).every(x=>x.checked);u.forEach(x=>x.checked=!c),document.querySelectorAll(".prof-toggle-ui").forEach(x=>{c?(x.classList.replace("bg-indigo-500","bg-slate-100"),x.classList.replace("border-indigo-500","border-slate-300"),x.querySelector(".toggle-dot").classList.replace("translate-x-4","translate-x-0")):(x.classList.replace("bg-slate-100","bg-indigo-500"),x.classList.replace("border-slate-300","border-indigo-500"),x.querySelector(".toggle-dot").classList.replace("translate-x-0","translate-x-4"))});break;case"calculate-preview":Mc();break;case"save-final-reports":qc();break;case"toggle-preview-details":const p=n.dataset.idx,b=document.getElementById(`preview-details-${p}`),m=n.querySelector("i.chevron-icon");b&&(b.classList.contains("hidden")?(b.classList.remove("hidden"),m&&m.classList.replace("bi-chevron-down","bi-chevron-up")):(b.classList.add("hidden"),m&&m.classList.replace("bi-chevron-up","bi-chevron-down")));break}}},document.body.addEventListener("click",oa),document.body.addEventListener("change",o=>{if(o.target.classList.contains("custom-toggle-input")){const r=o.target.closest("label"),n=r.querySelector(".toggle-bg"),l=r.querySelector(".toggle-dot"),d=r.querySelector(".toggle-text");o.target.checked?(n.classList.replace("bg-slate-200","bg-indigo-500"),l.classList.replace("translate-x-1","translate-x-6"),d&&d.classList.replace("text-slate-500","text-indigo-700")):(n.classList.replace("bg-indigo-500","bg-slate-200"),l.classList.replace("translate-x-6","translate-x-1"),d&&d.classList.replace("text-indigo-700","text-slate-500"))}if(o.target.classList.contains("prof-checkbox")){const r=o.target.closest("label"),n=r.querySelector(".prof-toggle-ui"),l=r.querySelector(".toggle-dot");o.target.checked?(n.classList.replace("bg-slate-100","bg-indigo-500"),n.classList.replace("border-slate-300","border-indigo-500"),l.classList.replace("translate-x-0","translate-x-4")):(n.classList.replace("bg-indigo-500","bg-slate-100"),n.classList.replace("border-indigo-500","border-slate-300"),l.classList.replace("translate-x-4","translate-x-0"))}});const t=document.getElementById("search-input");t&&t.addEventListener("input",o=>{R.searchQuery=o.target.value,Hi()}),document.body.addEventListener("input",o=>{(o.target.classList.contains("input-debit")||o.target.classList.contains("input-credit")||o.target.classList.contains("input-notes"))&&Ac(o.target.dataset.idx)});const e=document.getElementById("select-all-toggle");e&&e.addEventListener("change",o=>{const r=o.target.checked,n=document.querySelectorAll(".item-checkbox");R.selectedIds.clear(),n.forEach(l=>{l.checked=r,r&&R.selectedIds.add(l.value)}),Tt()});const a=document.getElementById("cancel-selection-btn");a&&a.addEventListener("click",()=>{R.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(o=>o.checked=!1),Tt()});const s=document.getElementById("batch-delete-btn");s&&s.addEventListener("click",Oc);const i=document.getElementById("export-excel-btn");i&&i.addEventListener("click",Rc),document.getElementById("custom-date-btn")?.addEventListener("click",()=>{const o=document.getElementById("filter-panel"),r=document.getElementById("custom-date-btn");R.isAdvancedFilterOpen=!R.isAdvancedFilterOpen,R.isAdvancedFilterOpen?(o.classList.remove("hidden"),r.classList.add("bg-gray-900","text-white","border-gray-900"),r.classList.remove("bg-white","text-gray-600","border-gray-200")):(o.classList.add("hidden"),r.classList.remove("bg-gray-900","text-white","border-gray-900"),r.classList.add("bg-white","text-gray-600","border-gray-200"))}),document.querySelectorAll(".date-preset-btn").forEach(o=>{o.addEventListener("click",r=>{navigator.vibrate&&navigator.vibrate(15),document.querySelectorAll(".date-preset-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),r.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.target.classList.remove("bg-white","text-gray-600","border-gray-200");const n=r.target.dataset.preset,l=new Date;let d,u;n==="month"?(d=new Date(l.getFullYear(),l.getMonth(),1),u=new Date(l.getFullYear(),l.getMonth()+1,0)):n==="last_month"&&(d=new Date(l.getFullYear(),l.getMonth()-1,1),u=new Date(l.getFullYear(),l.getMonth(),0)),document.getElementById("filter-start").value=d.toISOString().split("T")[0],document.getElementById("filter-end").value=u.toISOString().split("T")[0],R.startDate=d.toISOString().split("T")[0],R.endDate=u.toISOString().split("T")[0],pt()})})}function Pc(t){const e=t.dataset.preset,a=new Date;let s,i;e==="month"?(s=new Date(a.getFullYear(),a.getMonth(),1),i=new Date(a.getFullYear(),a.getMonth()+1,0)):e==="last_month"?(s=new Date(a.getFullYear(),a.getMonth()-1,1),i=new Date(a.getFullYear(),a.getMonth(),0)):e==="today"&&(s=new Date,i=new Date),s&&i&&(document.getElementById("calc-start-date").value=s.toISOString().split("T")[0],document.getElementById("calc-end-date").value=i.toISOString().split("T")[0]),document.querySelectorAll('button[data-action="set-calc-preset"]').forEach(o=>{o.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),o.classList.add("bg-white","text-gray-500","border-gray-200")}),t.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),t.classList.remove("bg-white","text-gray-500","border-gray-200")}function Tt(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=R.selectedIds.size;e&&(e.textContent=a),t&&(a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function Tc(){R.viewMode="new-calc";const t=document.getElementById("commissions-layout-detail");if(!t)return;const e=new Date().toISOString().split("T")[0],a=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],s=R.professionals.map(i=>`
        <label class="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-300 transition-all cursor-pointer group mb-2">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-black group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">${$a(i.name)}</div>
                <span class="font-bold text-sm text-slate-800">${i.name}</span>
            </div>
            <div class="relative">
                <input type="checkbox" value="${i.id}" class="prof-checkbox sr-only">
                <div class="prof-toggle-ui block w-10 h-6 bg-slate-100 border border-slate-300 rounded-full transition-colors"></div>
                <div class="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-0 shadow-sm border border-slate-200"></div>
            </div>
        </label>`).join("");t.innerHTML=`
        <div class="w-full h-full md:h-auto md:max-h-[90vh] md:max-w-3xl md:w-[90%] flex flex-col bg-slate-50 md:rounded-3xl shadow-2xl overflow-hidden relative animate-fade-in-down">
            
            <header class="flex-shrink-0 p-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-sm z-20">
                <div class="flex items-center gap-3">
                    <button type="button" data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition-transform active:scale-95">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <div>
                        <h3 id="calc-header-title" class="font-black text-base text-slate-800 uppercase tracking-wider">Apuração de Vendas (1/2)</h3>
                    </div>
                </div>
            </header>

            <div id="calc-step-1" class="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-slate-50 space-y-6">
                
                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-sm font-black text-slate-800 flex items-center gap-2"><i class="bi bi-calendar-range text-indigo-500"></i> Período</h3>
                    </div>
                    
                    <div class="flex gap-2 mb-4 overflow-x-auto hide-scroll-calc pb-1">
                        <button type="button" data-action="set-calc-preset" data-preset="month" class="px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold whitespace-nowrap shadow-sm transition-colors">Este Mês</button>
                        <button type="button" data-action="set-calc-preset" data-preset="last_month" class="px-4 py-2 bg-white text-slate-500 border border-slate-200 rounded-xl text-xs font-bold whitespace-nowrap shadow-sm hover:bg-slate-50 transition-colors">Mês Passado</button>
                        <button type="button" data-action="set-calc-preset" data-preset="today" class="px-4 py-2 bg-white text-slate-500 border border-slate-200 rounded-xl text-xs font-bold whitespace-nowrap shadow-sm hover:bg-slate-50 transition-colors">Hoje</button>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Início</label>
                            <input type="date" id="calc-start-date" value="${a}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner">
                        </div>
                        <div>
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Fim</label>
                            <input type="date" id="calc-end-date" value="${e}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner">
                        </div>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h3 class="text-sm font-black text-slate-800 mb-4 flex items-center gap-2"><i class="bi bi-tags text-indigo-500"></i> Considerar na Apuração</h3>
                    <div class="flex flex-col gap-3">
                        <label class="flex items-center justify-between cursor-pointer group">
                            <span class="toggle-text text-indigo-700 text-sm font-bold uppercase tracking-wider transition-colors">Serviços Executados</span>
                            <div class="relative">
                                <input type="checkbox" id="calc-type-services" checked class="custom-toggle-input sr-only">
                                <div class="toggle-bg block w-12 h-7 bg-indigo-500 rounded-full shadow-inner transition-colors"></div>
                                <div class="toggle-dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform transform translate-x-6 shadow-sm"></div>
                            </div>
                        </label>
                        <div class="border-t border-slate-100"></div>
                        <label class="flex items-center justify-between cursor-pointer group">
                            <span class="toggle-text text-indigo-700 text-sm font-bold uppercase tracking-wider transition-colors">Produtos Vendidos</span>
                            <div class="relative">
                                <input type="checkbox" id="calc-type-products" checked class="custom-toggle-input sr-only">
                                <div class="toggle-bg block w-12 h-7 bg-indigo-500 rounded-full shadow-inner transition-colors"></div>
                                <div class="toggle-dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform transform translate-x-6 shadow-sm"></div>
                            </div>
                        </label>
                        <div class="border-t border-slate-100"></div>
                        <label class="flex items-center justify-between cursor-pointer group">
                            <span class="toggle-text text-slate-500 text-sm font-bold uppercase tracking-wider transition-colors">Venda de Pacotes</span>
                            <div class="relative">
                                <input type="checkbox" id="calc-type-packages" class="custom-toggle-input sr-only">
                                <div class="toggle-bg block w-12 h-7 bg-slate-200 rounded-full shadow-inner transition-colors"></div>
                                <div class="toggle-dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform transform translate-x-1 shadow-sm"></div>
                            </div>
                        </label>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-sm font-black text-slate-800 flex items-center gap-2"><i class="bi bi-people text-indigo-500"></i> Selecionar Equipe</h3>
                        <button type="button" data-action="toggle-all-profs" class="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors shadow-sm active:scale-95">Inverter Sel.</button>
                    </div>
                    <div class="max-h-60 overflow-y-auto custom-scrollbar pr-2 grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
                        ${s}
                    </div>
                </div>
            </div>

            <div id="calc-step-2" class="hidden flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-slate-50/50 space-y-4"></div>

            <footer class="flex-shrink-0 p-4 border-t border-slate-200 bg-white flex justify-end gap-3 z-20 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)]">
                <button type="button" data-action="close-detail-screen" class="hidden md:block py-3 px-6 bg-white border border-slate-300 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors shadow-sm uppercase tracking-wider">Cancelar</button>
                <button type="button" data-action="calculate-preview" id="btn-calc-action" class="w-full md:w-auto py-3 px-8 bg-indigo-600 text-white font-black text-sm rounded-xl hover:bg-indigo-700 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider">
                    <i class="bi bi-calculator text-lg"></i> Calcular Vendas
                </button>
            </footer>
        </div>
    `,Ri()}async function Mc(){const t=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(u=>u.value);if(t.length===0)return g("Atenção","Selecione pelo menos um profissional na lista.","warning");const a=(f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId]).join(","),s=document.getElementById("calc-start-date"),i=document.getElementById("calc-end-date");if(!s||!i||!s.value||!i.value)return g("Atenção","As datas de início e fim são obrigatórias.","warning");const o={professionalIds:t,startDate:s.value,endDate:i.value,establishmentId:a,calculationTypes:{services:document.getElementById("calc-type-services")?.checked||!1,products:document.getElementById("calc-type-products")?.checked||!1,packages:document.getElementById("calc-type-packages")?.checked||!1}},r=new Date(o.startDate+"T00:00:00").toLocaleDateString("pt-BR"),n=new Date(o.endDate+"T00:00:00").toLocaleDateString("pt-BR");R.periodString=`${r} a ${n}`;const l=document.getElementById("btn-calc-action"),d=l.innerHTML;l.innerHTML='<div class="loader-small border-white mr-2"></div> Processando...',l.disabled=!0;try{const u=await vc(o);R.calculationResult=u.map(c=>({...c,extraDebit:0,extraCredit:0,finalValue:c.summary.totalCommission,notes:""})),Bc()}catch(u){g("Erro na Apuração",u.message,"error"),l.innerHTML=d,l.disabled=!1}}function Bc(){R.viewMode="preview-calc";const t=R.calculationResult;if(!t||t.length===0||t.every(n=>n.summary.totalCommission===0)){g("Aviso","Nenhuma comissão encontrada para os filtros selecionados.","info");const n=document.getElementById("btn-calc-action");n.innerHTML='<i class="bi bi-calculator text-lg"></i> Calcular Vendas',n.disabled=!1;return}const e=document.getElementById("calc-header-title");e&&(e.innerText="Revisão e Pagamento (2/2)");const a=document.getElementById("calc-step-1"),s=document.getElementById("calc-step-2"),i=document.getElementById("btn-calc-action");a&&a.classList.add("hidden"),s&&s.classList.remove("hidden"),i&&(i.dataset.action="save-final-reports",i.className="w-full md:w-auto py-3 px-8 bg-emerald-600 text-white font-black text-sm rounded-xl hover:bg-emerald-700 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider",i.innerHTML='<i class="bi bi-check2-circle text-lg"></i> Confirmar Pagtos.',i.disabled=!1);const o=t.reduce((n,l)=>n+l.finalValue,0),r=t.map((n,l)=>{if(n.summary.totalCommission===0)return"";const d=n.establishmentName||"Unidade Atual",u=(n.items||[]).map(p=>`
            <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                <td class="py-2.5 truncate max-w-[120px] text-slate-800 font-bold" title="${p.item}">${p.item}</td>
                <td class="py-2.5 text-slate-500 font-medium">${p.client||"--"}</td>
                <td class="py-2.5 text-right text-slate-600 font-bold">R$ ${(p.value||0).toFixed(2)}</td>
                <td class="py-2.5 text-center text-slate-600 font-bold">${p.commissionRate}%</td>
                <td class="py-2.5 text-right font-black text-emerald-600">R$ ${(p.commissionValue||0).toFixed(2)}</td>
            </tr>
        `).join(""),c=`
            <div id="preview-details-${l}" class="hidden mt-4 pt-4 border-t border-slate-100 animate-fade-in-down">
                <h5 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Itens Processados</h5>
                <div class="overflow-x-auto border border-slate-200 rounded-xl shadow-sm custom-scrollbar bg-white">
                    <table class="w-full text-left text-xs whitespace-nowrap">
                        <thead class="text-slate-500 bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px]">Serviço/Produto</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px]">Cliente</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px] text-right">Base</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px] text-center">%</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px] text-right">Comissão</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">${u||'<tr><td colspan="5" class="py-4 text-center text-slate-400">Nenhum item</td></tr>'}</tbody>
                    </table>
                </div>
            </div>
        `;return`
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-4 relative overflow-hidden">
            <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500"></div>
            
            <div class="flex justify-between items-start mb-5 border-b border-slate-100 pb-4 pl-3">
                <div>
                    <h4 class="font-black text-slate-800 text-base uppercase tracking-wider flex items-center gap-2">
                        ${n.professionalName}
                    </h4>
                    <div class="flex items-center gap-2 mt-1">
                        <span class="text-[9px] font-bold bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-100"><i class="bi bi-shop"></i> ${d}</span>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${n.summary.totalItems} itens calculados</span>
                    </div>
                </div>
                <div class="text-right bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 shadow-inner">
                    <p class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Valor Bruto</p>
                    <p class="font-black text-slate-800 text-base md:text-lg leading-none">R$ ${n.summary.totalCommission.toFixed(2)}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pl-3 mb-4">
                <div>
                    <label class="text-[10px] font-bold text-red-500 uppercase tracking-widest block mb-1.5"><i class="bi bi-dash-circle mr-1"></i>Descontos/Vales</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400 font-black text-sm">R$</span>
                        <input type="number" step="0.01" data-idx="${l}" class="input-debit w-full pl-10 p-3 border border-red-200 rounded-xl bg-white shadow-inner font-black text-base text-red-600 outline-none focus:ring-2 focus:ring-red-500" placeholder="0.00">
                    </div>
                </div>
                <div>
                    <label class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1.5"><i class="bi bi-plus-circle mr-1"></i>Bônus Extras</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 font-black text-sm">R$</span>
                        <input type="number" step="0.01" data-idx="${l}" class="input-credit w-full pl-10 p-3 border border-emerald-200 rounded-xl bg-white shadow-inner font-black text-base text-emerald-600 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="0.00">
                    </div>
                </div>
            </div>

            <div class="pl-3 mb-5">
                <input type="text" data-idx="${l}" class="input-notes w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700 shadow-inner" placeholder="Motivo dos ajustes (Opcional)">
            </div>
            
            <div class="flex justify-between items-center bg-indigo-50 border border-indigo-200 p-4 rounded-xl pl-5 ml-3 shadow-sm">
                <span class="text-[10px] md:text-xs font-bold text-indigo-700 uppercase tracking-widest">Líquido a Pagar</span>
                <span class="text-2xl font-black text-indigo-800 final-value-display drop-shadow-sm" data-idx="${l}">R$ ${n.finalValue.toFixed(2)}</span>
            </div>

            <div class="pl-3 mt-4 border-t border-slate-50 pt-4">
                <button type="button" data-action="toggle-preview-details" data-idx="${l}" class="w-full text-xs font-bold text-slate-600 hover:text-indigo-700 uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 shadow-sm active:scale-[0.98]">
                    <i class="bi bi-list-check"></i> Abrir Detalhamento de Itens <i class="bi bi-chevron-down chevron-icon ml-1"></i>
                </button>
                ${c}
            </div>
        </div>
        `}).join("");s&&(s.innerHTML=`
        <div class="bg-gradient-to-r from-indigo-700 to-indigo-800 p-5 rounded-2xl shadow-lg text-white mb-6 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden border border-indigo-600 gap-4 sticky top-0 z-10">
            <div class="absolute right-[-10px] top-[-10px] opacity-10"><i class="bi bi-cash-coin text-9xl"></i></div>
            <div class="bg-indigo-900/40 p-4 px-5 rounded-xl backdrop-blur-sm border border-indigo-400/30 z-10 w-full md:w-auto">
                <span class="block text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1.5">Soma Total Equipe</span>
                <span id="grand-total-preview" class="text-3xl font-black drop-shadow-md">R$ ${o.toFixed(2)}</span>
            </div>
            <div class="text-left md:text-right z-10 flex flex-col items-start md:items-end w-full md:w-auto">
                <span class="block text-[9px] font-bold text-indigo-200 uppercase tracking-widest mb-1.5">Período Selecionado</span>
                <span class="text-xs font-black bg-white/20 px-3 py-2 rounded-xl border border-white/30 shadow-sm flex items-center gap-2"><i class="bi bi-calendar3"></i> ${R.periodString}</span>
            </div>
        </div>
        ${r}
    `)}function Ac(t){const e=document.querySelector(`.input-debit[data-idx="${t}"]`),a=document.querySelector(`.input-credit[data-idx="${t}"]`),s=document.querySelector(`.input-notes[data-idx="${t}"]`);let i=parseFloat(e?.value)||0,o=parseFloat(a?.value)||0,r=s?.value||"";if(R.calculationResult&&R.calculationResult[t]){const n=R.calculationResult[t];n.extraDebit=i,n.extraCredit=o,n.notes=r,n.finalValue=n.summary.totalCommission-i+o;const l=document.querySelector(`.final-value-display[data-idx="${t}"]`);l&&(l.innerText=`R$ ${n.finalValue.toFixed(2)}`),jc()}}function jc(){const t=R.calculationResult.reduce((a,s)=>a+s.finalValue,0),e=document.getElementById("grand-total-preview");e&&(e.innerText=`R$ ${t.toFixed(2)}`)}async function qc(){const t=R.calculationResult.filter(i=>i.summary.totalCommission>0),e=t.length;if(e===0)return g("Aviso","Não há valores para pagar.","info");if(!await G("Confirmar Pagamentos",`Você está prestes a gerar recibos e marcar as vendas de ${e} profissional(is) como PAGAS. Essa ação lançará a despesa correspondente no Financeiro da respectiva unidade. Confirmar?`))return;const s=document.getElementById("btn-calc-action");s.innerHTML='<div class="loader-small border-white mr-2"></div> Finalizando...',s.disabled=!0;try{const i=t.map(async o=>{const r=(o.items||[]).map(l=>l.originalSaleId).filter(l=>l!=null),n=o.establishmentId||f.establishmentId;await yc({professionalId:o.professionalId,professionalName:o.professionalName,period:R.periodString,processedSalesIds:r,establishmentId:n,establishmentName:o.establishmentName||"",reportData:{...o,summary:{...o.summary,finalValue:o.finalValue,extraDebit:o.extraDebit||0,extraCredit:o.extraCredit||0,notes:o.notes||""}}});try{if(o.finalValue>0){const l=R.establishmentConfig||{},d=l.defaultDespesaNaturezaId||l.financeConfig?.despesaNaturezaId||null,u=l.defaultDespesaCentroCustoId||l.financeConfig?.despesaCentroCustoId||null;await Go({establishmentId:n,description:`Comissões - ${o.period}`,amount:o.finalValue,dueDate:new Date().toISOString().split("T")[0],naturezaId:d,centroDeCustoId:u,entity:o.professionalName,paymentMethod:"dinheiro",status:"paid",paymentDate:new Date().toISOString().split("T")[0],origin:"commission"})}}catch(l){console.error("Erro ao integrar com financeiro (Despesa):",l)}});await Promise.all(i),g("Sucesso","Pagamentos registrados e integrados ao financeiro!","success"),R.calculationResult=null,Ns(),await pt()}catch(i){g("Erro ao Salvar",i.message,"error"),s.innerHTML='<i class="bi bi-check2-circle text-lg"></i> Confirmar Pagtos.',s.disabled=!1}}function Nc(t){R.viewMode="report-details";const e=document.getElementById("commissions-layout-detail");if(!e)return;const a=R.reports.find(c=>c.id===t);if(!a)return;const s=a.reportData?.items||a.items||[],i=a.summary,o=i.extraDebit||0,r=i.extraCredit||0,n=i.notes||"",l=a.establishmentName||"Unidade Atual",d=s.map(c=>`
        <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
            <td class="py-3 px-4 text-slate-800 font-bold whitespace-normal min-w-[150px]">${c.item}</td>
            <td class="py-3 px-4 text-slate-500 font-medium">${c.client||"--"}</td>
            <td class="py-3 px-4 text-right text-slate-600 font-bold">R$ ${(c.value||0).toFixed(2)}</td>
            <td class="py-3 px-4 text-center text-slate-600 font-black">${c.commissionRate}%</td>
            <td class="py-3 px-4 text-right font-black text-emerald-600">R$ ${(c.commissionValue||0).toFixed(2)}</td>
        </tr>
    `).join("");let u="";(o>0||r>0||n)&&(u=`
            <div class="mt-5 bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-sm">
                <h5 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4"><i class="bi bi-sliders mr-1 text-indigo-500"></i> Ajustes Aplicados</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    ${o>0?`<div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"><span class="text-slate-400 block text-[9px] uppercase tracking-widest font-bold mb-1">Descontos/Vales</span> <span class="font-black text-red-500 text-xl leading-none">-R$ ${o.toFixed(2)}</span></div>`:""}
                    ${r>0?`<div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"><span class="text-slate-400 block text-[9px] uppercase tracking-widest font-bold mb-1">Bônus Extras</span> <span class="font-black text-emerald-500 text-xl leading-none">+R$ ${r.toFixed(2)}</span></div>`:""}
                </div>
                ${n?`<div class="text-sm font-bold text-slate-600 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"><strong class="block text-[9px] uppercase tracking-widest text-indigo-400 mb-1.5"><i class="bi bi-card-text"></i> Motivo do Ajuste</strong> ${n}</div>`:""}
            </div>
        `),e.innerHTML=`
        <div class="w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl md:w-[90%] flex flex-col bg-slate-50 md:rounded-3xl shadow-2xl overflow-hidden relative animate-fade-in-down">
            
            <header class="flex-shrink-0 p-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-sm z-20">
                <div class="flex items-center gap-3">
                    <button type="button" data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition-transform active:scale-95">
                        <i class="bi bi-arrow-left text-lg"></i>
                    </button>
                    <div>
                        <h3 class="font-black text-base text-slate-800 uppercase tracking-wider">Detalhes do Recibo</h3>
                    </div>
                </div>
            </header>

            <div class="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-slate-50">
                <div class="flex flex-col md:flex-row justify-between md:items-center bg-indigo-50 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-indigo-200 mb-5 gap-4 shadow-sm relative overflow-hidden">
                    <div class="absolute right-0 top-0 bottom-0 w-2 bg-indigo-500"></div>
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 rounded-2xl bg-white text-indigo-600 flex items-center justify-center font-black text-2xl flex-shrink-0 shadow-sm border border-indigo-100">
                            ${$a(a.professionalName)}
                        </div>
                        <div>
                            <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-0.5">Profissional</p>
                            <p class="font-black text-indigo-900 text-2xl leading-tight uppercase tracking-wider">${a.professionalName}</p>
                            <p class="text-[10px] font-bold text-indigo-600 mt-1 flex items-center gap-1"><i class="bi bi-shop"></i> ${l}</p>
                        </div>
                    </div>
                    <div class="md:text-right border-t md:border-t-0 md:border-l border-indigo-200 pt-4 md:pt-0 md:pl-6">
                        <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Período Base</p>
                        <p class="font-black text-indigo-700 text-sm md:text-base bg-white px-4 py-2 rounded-xl shadow-sm border border-indigo-100 flex items-center justify-center md:justify-end gap-2"><i class="bi bi-calendar3 opacity-50 text-xl"></i> ${a.period}</p>
                    </div>
                </div>

                <div class="border border-slate-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm bg-white">
                    <div class="overflow-x-auto custom-scrollbar">
                        <table class="w-full text-left text-sm whitespace-nowrap">
                            <thead class="bg-slate-50 text-slate-500 border-b border-slate-200">
                                <tr>
                                    <th class="p-4 font-bold uppercase tracking-wider text-[10px]">Serviço / Produto</th>
                                    <th class="p-4 font-bold uppercase tracking-wider text-[10px]">Cliente</th>
                                    <th class="p-4 font-bold uppercase tracking-wider text-[10px] text-right">Base Calc.</th>
                                    <th class="p-4 font-bold uppercase tracking-wider text-[10px] text-center">%</th>
                                    <th class="p-4 font-bold uppercase tracking-wider text-[10px] text-right">Comissão</th>
                                </tr>
                            </thead>
                            <tbody>${d||'<tr><td colspan="5" class="text-center py-10 text-slate-400 font-bold text-sm">Nenhum item detalhado neste recibo.</td></tr>'}</tbody>
                        </table>
                    </div>
                    <div class="bg-slate-50 p-5 border-t border-slate-200 flex justify-between items-center shadow-inner">
                        <span class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Bruto Apurado</span>
                        <span class="font-black text-slate-800 text-2xl drop-shadow-sm">R$ ${(i.totalCommission||0).toFixed(2)}</span>
                    </div>
                </div>
                
                ${u}

                <div class="mt-5 flex flex-col md:flex-row justify-between items-start md:items-center bg-emerald-50 p-6 rounded-2xl md:rounded-3xl border border-emerald-200 shadow-sm relative overflow-hidden gap-2">
                    <div class="absolute right-[-10px] top-[-10px] opacity-10"><i class="bi bi-check-circle-fill text-8xl md:text-9xl text-emerald-500"></i></div>
                    <div class="z-10">
                        <span class="block text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 flex items-center gap-1.5"><i class="bi bi-cash-stack text-base"></i> Total Líquido Pago</span>
                        <span class="text-3xl md:text-4xl font-black text-emerald-700 drop-shadow-sm">R$ ${(i.finalValue||i.totalCommission).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <footer class="flex-shrink-0 p-4 border-t border-slate-200 bg-white flex gap-2 md:gap-3 z-20 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] md:rounded-b-3xl">
                <button data-action="whatsapp-receipt" data-id="${a.id}" class="flex-1 py-3 md:py-3.5 bg-[#25D366]/10 text-[#075E54] font-black text-xs md:text-sm rounded-xl hover:bg-[#25D366]/20 transition-colors shadow-sm uppercase tracking-wider flex items-center justify-center gap-1.5 md:gap-2 border border-[#25D366]/30 active:scale-95" title="Enviar por WhatsApp">
                    <i class="bi bi-whatsapp text-lg md:text-xl"></i> <span class="truncate">WhatsApp</span>
                </button>
                <button data-action="print-receipt" data-id="${a.id}" class="flex-1 py-3 md:py-3.5 bg-indigo-50 text-indigo-700 font-black text-xs md:text-sm rounded-xl hover:bg-indigo-100 transition-colors shadow-sm uppercase tracking-wider flex items-center justify-center gap-1.5 md:gap-2 border border-indigo-200 active:scale-95">
                    <i class="bi bi-printer text-lg md:text-xl"></i> <span class="truncate">Imprimir</span>
                </button>
                <button data-action="delete-report" data-id="${a.id}" class="w-12 md:w-14 h-auto bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors border border-red-200 shadow-sm active:scale-95" title="Excluir e Estornar">
                    <i class="bi bi-trash3 text-lg md:text-xl"></i>
                </button>
            </footer>
        </div>
    `,Ri()}function Fc(t){const e=R.reports.find(l=>l.id===t);if(!e)return;const a=e.summary||{},s=e.establishmentName||"Unidade Principal";let i=`*RECIBO DE COMISSÕES* 💰

`;i+=`*Profissional:* ${e.professionalName}
`,i+=`*Unidade:* ${s}
`,i+=`*Período:* ${e.period}

`,i+=`*Resumo da Apuração:*
`,i+=`Bruto Apurado: R$ ${(a.totalCommission||0).toFixed(2)}
`,a.extraCredit>0&&(i+=`(+) Bônus Extras: R$ ${a.extraCredit.toFixed(2)}
`),a.extraDebit>0&&(i+=`(-) Descontos/Vales: R$ ${a.extraDebit.toFixed(2)}
`),a.notes&&(i+=`
*Obs:* ${a.notes}
`);const o=a.finalValue||a.totalCommission||0;i+=`
*TOTAL LÍQUIDO PAGO: R$ ${o.toFixed(2)}*

`,i+="_Este é um recibo gerado automaticamente pelo sistema._";const n=`https://wa.me/?text=${encodeURIComponent(i)}`;window.open(n,"_blank")}function Rc(){if(R.reports.length===0){g("Aviso","Não há dados para exportar com os filtros atuais.","info");return}let t=R.reports;if(R.searchQuery){const a=R.searchQuery.toLowerCase();t=t.filter(s=>s.professionalName.toLowerCase().includes(a)||s.period.toLowerCase().includes(a))}const e=t.map(a=>{const s=a.summary.totalCommission,i=a.summary.extraDebit||0,o=a.summary.extraCredit||0,r=a.summary.finalValue||s;return{"Data da Apuração":new Date(a.createdAt).toLocaleDateString("pt-BR"),Unidade:a.establishmentName||"Unidade Principal",Profissional:a.professionalName,"Período Base":a.period,"Itens Calculados":a.summary.totalItems||0,"Valor Bruto (R$)":s,"Bônus (R$)":o,"Descontos (R$)":i,"Líquido Pago (R$)":r,"Observações/Motivo":a.summary.notes||""}});try{if(typeof XLSX>"u"){g("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const a=XLSX.utils.json_to_sheet(e),s=XLSX.utils.book_new();XLSX.utils.book_append_sheet(s,a,"Comissoes");const i=`Relatorio_Comissoes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(s,i)}catch(a){console.error(a),g("Erro","Falha ao exportar Excel.","error")}}function Hc(t){const e=R.reports.find(u=>u.id===t);if(!e)return;if(!window.jspdf){g("Erro","A biblioteca de PDF não foi carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a;s.setFillColor(79,70,229),s.rect(0,0,210,40,"F"),s.setTextColor(255,255,255),s.setFontSize(22),s.setFont(void 0,"bold"),s.text("RECIBO DE COMISSÕES",105,20,{align:"center"}),s.setFontSize(10),s.text(`Data de Emissão: ${new Date().toLocaleDateString("pt-BR")} - Unidade: ${e.establishmentName||"Principal"}`,105,28,{align:"center"}),s.setTextColor(50,50,50),s.setFontSize(11),s.setFont(void 0,"normal"),s.text("Profissional:",15,55),s.setFont(void 0,"bold"),s.text(e.professionalName,40,55),s.setFont(void 0,"normal"),s.text("Período:",130,55),s.setFont(void 0,"bold"),s.text(e.period,147,55);const i=e.reportData?.items||e.items||[];let o=70;if(i.length>0){const u=i.map(c=>[c.item||"Item",c.client||"--",`R$ ${(c.value||0).toFixed(2)}`,`${c.commissionRate||0}%`,`R$ ${(c.commissionValue||0).toFixed(2)}`]);s.autoTable({startY:o,head:[["Serviço/Produto","Cliente","Valor Base","Taxa","Comissão"]],body:u,theme:"striped",headStyles:{fillColor:[249,250,251],textColor:[75,85,99],fontStyle:"bold"},styles:{fontSize:8},columnStyles:{2:{halign:"right"},3:{halign:"center"},4:{halign:"right",fontStyle:"bold",textColor:[5,150,105]}}}),o=s.lastAutoTable.finalY+15}const r=e.summary,n=r.finalValue||r.totalCommission,l=[["Comissões Brutas (Soma dos Itens)",`R$ ${r.totalCommission.toFixed(2)}`]];r.extraCredit>0&&l.push(["(+) Bônus Extras",`R$ ${r.extraCredit.toFixed(2)}`]),r.extraDebit>0&&l.push(["(-) Descontos / Vales",`R$ ${r.extraDebit.toFixed(2)}`]),s.autoTable({startY:o,head:[["Resumo do Fechamento","Valor"]],body:l,theme:"grid",headStyles:{fillColor:[79,70,229],textColor:[255,255,255]},columnStyles:{1:{halign:"right",fontStyle:"bold"}}});const d=s.lastAutoTable.finalY+15;s.setFillColor(236,253,245),s.rect(120,d-8,75,15,"F"),s.setTextColor(5,150,105),s.setFontSize(14),s.setFont(void 0,"bold"),s.text(`Total Líquido: R$ ${n.toFixed(2)}`,190,d,{align:"right"}),r.notes&&(s.setTextColor(100,100,100),s.setFontSize(9),s.setFont(void 0,"normal"),s.text(`Obs/Motivo: ${r.notes}`,15,d+10)),s.setTextColor(150,150,150),s.setFontSize(9),s.line(20,d+40,90,d+40),s.text("Assinatura da Empresa",55,d+45,{align:"center"}),s.line(120,d+40,190,d+40),s.text("Assinatura do Profissional",155,d+45,{align:"center"}),s.save(`Recibo_Comissoes_${e.professionalName.replace(/\s+/g,"_")}.pdf`)}async function Oc(){const t=R.selectedIds.size;if(!(t===0||!await G("Excluir Recibos",`Deseja excluir e estornar ${t} recibo(s)? As vendas associadas voltarão ao status "A Apurar".`)))try{const a=Array.from(R.selectedIds).map(s=>Fi(s));await Promise.all(a),g("Sucesso",`${t} recibos excluídos com sucesso.`,"success"),R.selectedIds.clear(),Tt(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),await pt()}catch{g("Erro ao Excluir","Ocorreu um erro ao excluir alguns recibos.","error")}}async function zc(t){if(await G("Excluir Recibo",'ATENÇÃO: Deseja realmente excluir este recibo? As vendas associadas a ele voltarão ao status "A Apurar" e o valor será subtraído dos relatórios. Esta ação não pode ser desfeita.'))try{await Fi(t),g("Sucesso","Recibo cancelado com sucesso. Vendas estornadas para apuração.","success"),Ns(),await pt()}catch(a){g("Erro ao Excluir",a.message,"error")}}const He=document.getElementById("content");let B={allPackages:[],catalogForModal:{services:[],products:[]},establishments:[],searchQuery:"",statusFilter:"all",viewMode:"list",tempPackage:null,selectedIds:new Set},Xe=null;function bt(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function _c(){const t=B.allPackages.length,e=B.allPackages.filter(o=>o.status!=="inactive"),a=e.length,s=a>0?e.reduce((o,r)=>o+(r.price||0),0)/a:0;let i=0;return e.forEach(o=>{const r=o.originalPrice||0,n=o.price||0;if(r>0&&r>n){const l=(r-n)/r*100;l>i&&(i=l)}}),{total:t,activeCount:a,avgPrice:s,maxDiscount:i}}function Vc(){const t=document.getElementById("packages-layout-detail");t&&(t.classList.remove("hidden"),t.style.display="flex",requestAnimationFrame(()=>{t.classList.remove("opacity-0");const e=t.querySelector("#modal-content-wrapper");e&&(e.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),e.classList.add("translate-y-0","md:scale-100","md:opacity-100"))}))}function ba(){const t=document.getElementById("packages-layout-detail");if(t){t.classList.add("opacity-0");const e=t.querySelector("#modal-content-wrapper");e&&(e.classList.remove("translate-y-0","md:scale-100","md:opacity-100"),e.classList.add("translate-y-full","md:scale-95","md:opacity-0")),setTimeout(()=>{t.classList.add("hidden"),t.style.display="none",t.innerHTML=""},300)}}function Uc(){const t=document.getElementById("packages-layout-detail");if(!t||B.viewMode!=="edit-package"||!B.tempPackage)return;B.tempPackage.name=t.querySelector("#packageName")?.value||"",B.tempPackage.description=t.querySelector("#packageDescription")?.value||"",B.tempPackage.status=t.querySelector("#packageStatus")?.value||"active";const e=parseFloat(t.querySelector("#finalPrice")?.value);B.tempPackage.price=isNaN(e)?"":e;const a=parseFloat(t.querySelector("#commissionRate")?.value);B.tempPackage.commissionRate=isNaN(a)?"":a;const s=parseInt(t.querySelector("#validityDays")?.value,10);B.tempPackage.validityDays=isNaN(s)?"":s,B.tempPackage.sellStartDate=t.querySelector("#sellStartDate")?.value||"",B.tempPackage.sellEndDate=t.querySelector("#sellEndDate")?.value||"";const i=parseInt(t.querySelector("#salesLimit")?.value,10);B.tempPackage.salesLimit=isNaN(i)?"":i;const o=Array.from(t.querySelectorAll(".modal-est-checkbox:checked")).map(r=>r.value);B.tempPackage.establishmentIds=o}async function Wc(){try{const e=(await ke().catch(()=>({matrizes:[]}))).matrizes||[];B.establishments=[],e.forEach(a=>{B.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>B.establishments.push({id:s.id,name:s.name,type:"Filial"}))})}catch(t){console.error("Erro ao buscar hierarquia de empresas",t)}B.viewMode="list",B.selectedIds.clear(),Jc(),Xc(),await Ea()}async function Ea(){const t=document.getElementById("packagesListContainer");t&&(t.innerHTML='<div class="col-span-full flex justify-center py-20"><div class="loader mx-auto"></div></div>');const e=f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId];try{const a=e.map(c=>Ds(c).catch(()=>[])),s=await Promise.all(a),i=new Map;s.flat().forEach(c=>{i.has(c.id)||i.set(c.id,c)}),B.allPackages=Array.from(i.values());const o=e.map(c=>Ue(c).catch(()=>[])),r=e.map(c=>gt(c).catch(()=>[])),[n,l]=await Promise.all([Promise.all(o),Promise.all(r)]),d=new Map;n.flat().forEach(c=>d.set(c.id,c));const u=new Map;l.flat().forEach(c=>u.set(c.id,c)),B.catalogForModal={services:Array.from(d.values()).filter(c=>c.active),products:Array.from(u.values())},Gc(),et(),kt()}catch(a){console.error(a),t&&(t.innerHTML=`
                <div class="col-span-full flex flex-col items-center justify-center py-16 text-slate-500">
                    <i class="bi bi-exclamation-triangle text-4xl text-red-400 mb-3"></i>
                    <p class="text-xs font-bold">Erro ao carregar os pacotes. Tente novamente.</p>
                </div>
            `)}}function kt(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=B.selectedIds.size;e&&(e.textContent=a),t&&(a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")));const s=document.getElementById("select-all-toggle");s&&(s.checked=B.allPackages.length>0&&a===B.allPackages.length)}function Jc(){He.innerHTML=`
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
    `}function Gc(){const t=_c(),e=document.getElementById("kpi-container");e&&(e.innerHTML=`
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
            <span class="text-xl md:text-2xl font-black text-indigo-600">${bt(t.avgPrice)}</span>
        </div>
    `)}function et(){const t=document.getElementById("packagesListContainer");if(!t)return;let e=B.allPackages;if(B.statusFilter!=="all"){const s=B.statusFilter==="active";e=e.filter(i=>i.status!=="inactive"===s)}if(B.searchQuery){const s=B.searchQuery.toLowerCase();e=e.filter(i=>i.name.toLowerCase().includes(s)||(i.description||"").toLowerCase().includes(s))}if(e.length===0){t.innerHTML=`
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
        `;return}const a=new Map(B.establishments.map(s=>[s.id,s]));t.innerHTML=e.map(s=>{const i=s.status!=="inactive",o=B.selectedIds.has(s.id),r=s.price||0,n=s.originalPrice||0,l=n>0&&n>r?(n-r)/n*100:0,d=v(s.name),u=v(s.description||"Nenhuma descrição detalhada."),c=(s.items||[]).reduce((y,S)=>y+(S.quantity||1),0),p=s.validityDays?`${s.validityDays} dias de uso`:"Uso vitalício",b=s.sellEndDate?`Vendas até ${new Date(s.sellEndDate).toLocaleDateString("pt-BR")}`:"Venda contínua",m=s.establishmentIds||(s.establishmentId?[s.establishmentId]:[]);let x="";if(m.length===1){const y=a.get(m[0]);y&&(x=`<span class="text-[9px] px-2 py-1 rounded-md bg-slate-100 text-slate-600 font-bold border border-slate-200 flex items-center w-max shadow-sm"><i class="bi ${y.type==="Matriz"?"bi-building":"bi-shop"} mr-1 opacity-50"></i> ${y.name}</span>`)}else m.length>1&&(x=`<span class="text-[9px] px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 flex items-center w-max shadow-sm"><i class="bi bi-buildings mr-1 opacity-50"></i> ${m.length} Unidades</span>`);return`
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
                                <span class="w-2.5 h-2.5 rounded-full ${i?"bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]":"bg-slate-300"}"></span>
                                <span class="text-[10px] font-black ${i?"text-emerald-600":"text-slate-500"} uppercase tracking-widest">${i?"Ativo":"Inativo"}</span>
                            </div>
                            ${x}
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
                            ${l>0?`<span class="text-[10px] text-slate-400 font-bold line-through mb-0.5">De ${bt(n)}</span>`:'<span class="text-[10px] text-transparent mb-0.5">.</span>'}
                            <span class="text-2xl font-black text-slate-900 leading-none drop-shadow-sm">${bt(r)}</span>
                        </div>
                        <div class="text-right">
                            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md border border-slate-200"><i class="bi bi-calendar-event mr-1"></i>${b}</span>
                        </div>
                    </div>
                </div>
            </div>
        `}).join("")}function Qc(){if(B.allPackages.length===0){g("Aviso","Não há pacotes carregados para exportar.","info");return}let t=B.allPackages;if(B.statusFilter!=="all"){const s=B.statusFilter==="active";t=t.filter(i=>i.status!=="inactive"===s)}if(B.searchQuery){const s=B.searchQuery.toLowerCase();t=t.filter(i=>i.name.toLowerCase().includes(s)||(i.description||"").toLowerCase().includes(s))}if(t.length===0){g("Aviso","Nenhum pacote corresponde aos filtros atuais.","info");return}const e=new Map(B.establishments.map(s=>[s.id,s.name])),a=t.map(s=>{const i=s.originalPrice||0,o=s.price||0,r=i>0?(i-o)/i*100:0,n=(s.items||[]).map(u=>`${u.quantity}x ${u.name}`).join(" | ");return{"Unidade(s)":(s.establishmentIds||(s.establishmentId?[s.establishmentId]:[])).map(u=>e.get(u)).filter(Boolean).join(", ")||"Não identificada","Nome do Pacote":s.name,Status:s.status!=="inactive"?"Ativo":"Inativo",Descrição:s.description||"","Itens Incluídos":n,"Valor Original (R$)":i,"Preço de Venda (R$)":o,"Desconto (%)":r.toFixed(1)+"%","Comissão (%)":s.commissionRate||0,"Validade de Uso (Dias)":s.validityDays||"Vitalício","Vendas Início":s.sellStartDate?new Date(s.sellStartDate).toLocaleDateString("pt-BR"):"-","Vendas Fim":s.sellEndDate?new Date(s.sellEndDate).toLocaleDateString("pt-BR"):"-"}});try{if(typeof XLSX>"u"){g("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const s=XLSX.utils.json_to_sheet(a),i=XLSX.utils.book_new();XLSX.utils.book_append_sheet(i,s,"Pacotes");const o=`Relatorio_Pacotes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(i,o)}catch(s){console.error(s),g("Erro","Falha ao exportar Excel.","error")}}function go(t=null){B.viewMode="edit-package",B.tempPackage=t?JSON.parse(JSON.stringify(t)):{id:"",name:"",description:"",status:"active",items:[],price:"",originalPrice:0,commissionRate:0,validityDays:"",sellStartDate:"",sellEndDate:"",salesLimit:"",establishmentIds:[f.establishmentId]},xs(),Vc()}function Oi(){const t=document.getElementById("packages-layout-detail");if(!t)return;const a=(B.tempPackage.items||[]).reduce((n,l)=>n+(l.price||0)*(l.quantity||1),0),s=t.querySelector("#finalPrice"),i=t.querySelector("#discountIndicator"),o=t.querySelector("#originalPrice"),r=parseFloat(s?.value)||0;if(o&&(o.textContent=bt(a)),i)if(a>0&&a>r&&r>0){const n=(a-r)/a*100;i.textContent=`${n.toFixed(0)}% OFF`,i.classList.remove("hidden")}else i.classList.add("hidden")}function fs(){const t=document.getElementById("package-items-list");if(!t)return;const e=B.tempPackage.items||[];e.length===0?t.innerHTML=`
            <div class="text-center py-8 text-slate-400 flex flex-col items-center">
                <i class="bi bi-inbox text-3xl mb-2 opacity-50"></i>
                <p class="text-[10px] font-bold uppercase tracking-widest">Nenhum item adicionado</p>
                <p class="text-[9px] mt-1 text-slate-400">Clique no botão acima para compor o pacote</p>
            </div>`:t.innerHTML=e.map((a,s)=>{const i=a.type==="service",o=i?"bi-scissors":"bi-box",r=i?"bg-indigo-100 text-indigo-700 border-indigo-200":"bg-emerald-100 text-emerald-700 border-emerald-200";return`
            <div class="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors animate-fade-in-fast mb-2">
                <div class="flex items-center gap-4 min-w-0 flex-1">
                    <div class="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 shadow-inner">
                        <span class="text-[8px] font-bold text-slate-400 uppercase leading-none mb-1">Qtd</span>
                        <input type="number" value="${a.quantity}" min="1" class="w-12 text-center bg-transparent text-sm font-black text-slate-700 outline-none quantity-input" data-index="${s}">
                    </div>
                    <div class="min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${r} flex items-center gap-1 shadow-sm"><i class="bi ${o}"></i> ${i?"Serviço":"Produto"}</span>
                        </div>
                        <p class="font-black text-slate-800 text-sm truncate leading-tight">${v(a.name)}</p>
                    </div>
                </div>
                <div class="flex items-center gap-4 flex-shrink-0 pl-2">
                    <div class="text-right">
                        <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Valor Un.</span>
                        <span class="text-sm font-black text-slate-700">${bt(a.price)}</span>
                    </div>
                    <button type="button" data-action="remove-item" data-index="${s}" class="w-10 h-10 flex items-center justify-center rounded-xl text-red-400 bg-red-50 hover:text-red-600 hover:bg-red-100 transition-colors shadow-sm z-10 cursor-pointer">
                        <i class="bi bi-trash3 pointer-events-none text-base"></i>
                    </button>
                </div>
            </div>
        `}).join(""),Oi()}function fo(t){return t?t.includes("T")?t.split("T")[0]:t:""}function xs(){const t=document.getElementById("packages-layout-detail");if(!t)return;const e=B.tempPackage,a=!!e.id,s=v(e.name||""),i=v(e.description||""),o=e.price!==void 0&&e.price!==""?e.price:"",r=e.commissionRate!==void 0&&e.commissionRate!==""?e.commissionRate:"",n=e.validityDays!==void 0&&e.validityDays!==""?e.validityDays:"",l=fo(e.sellStartDate),d=fo(e.sellEndDate),u=e.salesLimit!==void 0&&e.salesLimit!==""?e.salesLimit:"",c=e.establishmentIds&&e.establishmentIds.length>0?e.establishmentIds:e.establishmentId?[e.establishmentId]:[f.establishmentId],p=B.establishments.map(m=>`
        <label class="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer group shadow-sm">
            <input type="checkbox" class="modal-est-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4" value="${m.id}" ${c.includes(m.id)?"checked":""}>
            <span class="text-xs font-bold text-slate-700 truncate group-hover:text-indigo-700" title="${m.name}">${m.type==="Matriz"?"🏢":"📍"} ${m.name}</span>
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
                                <textarea id="packageDescription" rows="2" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-700 resize-none shadow-inner transition-all" placeholder="Descreva os benefícios e condições do pacote...">${i}</textarea>
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
                                    <input type="number" id="commissionRate" value="${r}" class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-base text-slate-700 shadow-inner transition-all" placeholder="Ex: 10">
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
    `,fs(),requestAnimationFrame(()=>{const m=t.querySelector("#modal-content-wrapper");m&&(m.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),m.classList.add("translate-y-0","md:scale-100","md:opacity-100"))})}function Yc(){B.viewMode="select-item";const t=document.getElementById("packages-layout-detail");if(!t)return;const e=`
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
    `;let a;const s=(o="")=>{const r=o.toLowerCase(),n={service:'<i class="bi bi-scissors text-indigo-600 text-lg"></i>',product:'<i class="bi bi-box-seam text-emerald-600 text-lg"></i>'},l={"catalog-service-list":{items:B.catalogForModal.services,type:"service"},"catalog-product-list":{items:B.catalogForModal.products,type:"product"}};Object.entries(l).forEach(([d,{items:u,type:c}])=>{const p=t.querySelector("#"+d);if(!p)return;const b=u.filter(y=>y.name.toLowerCase().includes(r)).slice(0,50),m=c==="service"?"hover:border-indigo-400 hover:bg-indigo-50/80 hover:shadow-md":"hover:border-emerald-400 hover:bg-emerald-50/80 hover:shadow-md",x=c==="service"?"bg-indigo-100 border-indigo-200 shadow-sm":"bg-emerald-100 border-emerald-200 shadow-sm";p.innerHTML=b.map(y=>y.id?`
                <button data-action="select-catalog-item" data-item-type="${c}" data-item-id="${y.id}" class="flex items-center gap-4 w-full p-3 bg-white border border-slate-200 rounded-2xl ${m} shadow-sm transition-all duration-300 text-left group active:scale-95">
                    <div class="flex-shrink-0 w-12 h-12 rounded-xl ${x} flex items-center justify-center border group-hover:scale-110 transition-transform">${n[c]}</div>
                    <div class="flex-grow min-w-0">
                        <span class="block text-sm font-black text-slate-800 truncate group-hover:text-indigo-900 transition-colors">${v(y.name)}</span>
                        <span class="block font-black text-xs text-slate-500 mt-1">${bt(y.price)}</span>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors shadow-inner flex-shrink-0">
                        <i class="bi bi-plus-lg text-slate-400 group-hover:text-white transition-colors"></i>
                    </div>
                </button>
            `:"").join("")||'<div class="flex flex-col items-center justify-center py-8 text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-slate-50"><i class="bi bi-inbox text-3xl mb-2"></i><p class="text-[10px] font-bold uppercase tracking-widest">Nenhum resultado</p></div>'})};s();const i=t.querySelector("#item-search-input");i&&(i.addEventListener("input",o=>{clearTimeout(a),a=setTimeout(()=>s(o.target.value),300)}),setTimeout(()=>i.focus(),100)),requestAnimationFrame(()=>{const o=t.querySelector("#modal-content-wrapper");o&&(o.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),o.classList.add("translate-y-0","md:scale-100","md:opacity-100"))})}function Xc(){Xe&&(He.removeEventListener("click",Xe),He.removeEventListener("input",Xe),He.removeEventListener("change",Xe)),Xe=async e=>{if(e.target.classList.contains("item-checkbox")){const r=e.target.value;e.target.checked?B.selectedIds.add(r):B.selectedIds.delete(r),kt(),et(),e.stopPropagation();return}if(e.target.id==="packages-layout-detail"){ba(),B.viewMode="list",B.tempPackage=null;return}if(e.target.closest("#batch-delete-btn")){const r=B.selectedIds.size;if(r===0)return;if(await G("Excluir Pacotes",`Deseja realmente apagar ${r} pacotes selecionados?`))try{const l=Array.from(B.selectedIds).map(d=>Ys(d));await Promise.all(l),g("Sucesso",`${r} pacote(s) excluído(s).`,"success"),B.selectedIds.clear(),kt(),await Ea()}catch{g("Erro","Ocorreu um erro ao excluir pacotes.","error")}return}if(e.target.closest("#cancel-selection-btn")){B.selectedIds.clear();const r=document.getElementById("select-all-toggle");r&&(r.checked=!1),kt(),et();return}const i=e.target.closest("[data-action]");if(!i)return;switch(i.dataset.action){case"new-package":navigator.vibrate&&navigator.vibrate(20),go(null);break;case"edit-package":navigator.vibrate&&navigator.vibrate(15);const r=i.dataset.id,n=B.allPackages.find(S=>S.id===r);n&&go(n);break;case"delete-package":e.stopPropagation(),e.preventDefault();const l=i.dataset.id;if(await G("Excluir Pacote","Tem a certeza que deseja excluir este pacote promocional? Esta ação é irreversível."))try{await Ys(l),g("Sucesso!","Pacote excluído.","success"),B.viewMode==="edit-package"&&B.tempPackage?.id===l&&(ba(),B.viewMode="list"),await Ea()}catch(S){g("Erro",`Não foi possível excluir: ${S.message}`,"error")}break;case"back-to-main":ba(),B.viewMode="list",B.tempPackage=null;break;case"add-item-to-package-btn":Uc(),Yc();break;case"back-to-editor":xs();break;case"select-catalog-item":navigator.vibrate&&navigator.vibrate(10);const{itemType:u,itemId:c}=i.dataset,b=(B.catalogForModal[u+"s"]||[]).find(S=>S.id===c);if(b){const S=B.tempPackage.items.find(L=>L.id===b.id&&L.type===u);S?S.quantity++:B.tempPackage.items.push({...b,type:u,quantity:1}),xs()}break;case"remove-item":navigator.vibrate&&navigator.vibrate(10);const m=parseInt(i.dataset.index,10);B.tempPackage.items.splice(m,1),fs();break;case"toggle-all-ests":const x=document.querySelectorAll(".modal-est-checkbox"),y=Array.from(x).every(S=>S.checked);x.forEach(S=>S.checked=!y);break;case"save-package":await Zc(i);break}},He.addEventListener("click",Xe),He.addEventListener("input",e=>{e.target.id==="search-packages"&&(B.searchQuery=e.target.value,et()),e.target.id==="finalPrice"&&Oi()}),He.addEventListener("change",e=>{if(e.target.id==="select-all-toggle"){const a=e.target.checked;B.selectedIds.clear(),a&&B.allPackages.forEach(s=>B.selectedIds.add(s.id)),kt(),et()}if(e.target.id==="filter-status"&&(B.statusFilter=e.target.value,et()),e.target.classList.contains("quantity-input")){const a=parseInt(e.target.dataset.index,10),s=parseInt(e.target.value,10);s>0&&B.tempPackage.items[a]&&(B.tempPackage.items[a].quantity=s,fs())}});const t=document.getElementById("export-excel-btn");t&&t.addEventListener("click",Qc)}async function Zc(t){const e=B.tempPackage,a=!!e.id,s=document.getElementById("packages-layout-detail");if(!s)return;const i=Array.from(s.querySelectorAll(".modal-est-checkbox:checked")).map(l=>l.value);if(i.length===0){g("Atenção","Selecione pelo menos uma unidade para o pacote.","warning");return}const o=e.items.reduce((l,d)=>l+d.price*d.quantity,0),r={id:e.id||null,companyId:f.companyId,name:s.querySelector("#packageName").value,description:s.querySelector("#packageDescription").value,status:s.querySelector("#packageStatus").value,items:e.items,originalPrice:o,price:parseFloat(s.querySelector("#finalPrice").value),commissionRate:parseFloat(s.querySelector("#commissionRate").value)||0,validityDays:parseInt(s.querySelector("#validityDays").value,10)||null,sellStartDate:s.querySelector("#sellStartDate").value||null,sellEndDate:s.querySelector("#sellEndDate").value||null,salesLimit:parseInt(s.querySelector("#salesLimit").value,10)||null,establishmentIds:i,establishmentId:i[0]};if(!r.name||isNaN(r.price)){g("Erro","Nome do Pacote e Preço Final são obrigatórios.","warning");return}if(r.items.length===0){g("Erro","Adicione pelo menos um serviço ou produto ao pacote.","warning");return}const n=t.innerHTML;t.disabled=!0,t.innerHTML='<div class="loader-small border-white mr-2"></div> Salvando...';try{a?await Vn(r.id,r):(delete r.id,await _n(r)),g("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),ba(),B.viewMode="list",B.tempPackage=null,await Ea()}catch(l){g("Erro",`Não foi possível salvar o pacote: ${l.message}`,"error"),t.disabled=!1,t.innerHTML=n}}const Kc=document.getElementById("content");async function eu(){const t=we.currentUser;if(!t)return;let e={};try{const l=await ws(qe(xe,"users",t.uid));l.exists()&&(e=l.data())}catch(l){console.error("Erro ao buscar usuário",l)}let a=null;if(f.userProfessionalId)try{a=await To(f.userProfessionalId)}catch(l){console.error("Erro ao buscar profissional",l)}const s=v(e.name||t.displayName||"Usuário"),i=v(t.email||"E-mail não disponível"),o=v(e.phone||"");let r=e.photo||"";a&&a.photo&&(r=a.photo);const n=r||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(s.charAt(0))}`;Kc.innerHTML=`
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
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5 truncate px-2">${i}</p>
                        
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
    `,tu(t),au(a)}function tu(t,e){const a=document.getElementById("profile-photo-wrapper"),s=document.getElementById("profile-photo-input"),i=document.getElementById("profile-avatar"),o=document.getElementById("form-user-details");a.addEventListener("click",()=>s.click()),s.addEventListener("change",async r=>{const n=r.target.files[0];if(n)try{const l=await Da(n,800,800,.8);i.src=l,await At(qe(xe,"users",t.uid),{photo:l}),f.userProfessionalId&&await Ka(f.userProfessionalId,{photo:l}),window.dispatchEvent(new CustomEvent("userPhotoUpdated",{detail:l})),g("Sucesso!","Sua foto de perfil foi atualizada.","success")}catch{g("Erro","Não foi possível salvar a imagem. Tente uma menor.","error")}}),o.addEventListener("submit",async r=>{r.preventDefault();const n=o.querySelector("button"),l=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> Salvando...';const d=document.getElementById("input-name").value.trim(),u=document.getElementById("input-phone").value.trim();try{await At(qe(xe,"users",t.uid),{name:d,phone:u}),f.userProfessionalId&&await Ka(f.userProfessionalId,{name:d,phone:u}),f.userName=d,document.getElementById("display-name").textContent=d,g("Atualizado!","Seus dados foram salvos com sucesso.","success")}catch{g("Erro","Ocorreu um problema na hora de salvar.","error")}finally{n.disabled=!1,n.innerHTML=l}})}function au(t){const e=document.getElementById("professional-section");if(!t){e.innerHTML=`
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
    `;const a=document.getElementById("form-my-blockage");a.addEventListener("submit",async i=>{i.preventDefault();const o=a.querySelector("#b-date-start").value,r=a.querySelector("#b-date-end").value||o,n=a.querySelector("#b-time-start").value,l=a.querySelector("#b-time-end").value,d=a.querySelector("#b-reason").value;if(!o||!n||!l)return g("Atenção","Preencha Data e Horários corretamente.","error");const u=new Date(`${o}T${n}:00`),c=new Date(`${r}T${l}:00`);if(c<=u)return g("Atenção","A data e hora de fim deve ser superior ao início.","warning");const p=a.querySelector('button[type="submit"]'),b=p.innerHTML;p.disabled=!0,p.innerHTML="A bloquear...";try{await qa({establishmentId:f.establishmentId,professionalId:t.id,reason:d||"Indisponível",startTime:u.toISOString(),endTime:c.toISOString()}),g("Sucesso","Agenda bloqueada com êxito.","success"),a.reset();const m=document.getElementById("my-blocks-filter").value;ma(t.id,m)}catch(m){g("Erro",`Falha ao bloquear: ${m.message}`,"error")}finally{p.disabled=!1,p.innerHTML=b}}),document.getElementById("my-blocks-filter").addEventListener("change",i=>ma(t.id,i.target.value)),ma(t.id,"future")}async function ma(t,e="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<div class="loader mx-auto mt-6"></div>';try{const s=new Date;let i,o;e==="history"?(o=new Date,i=new Date,i.setFullYear(i.getFullYear()-1)):(i=new Date,o=new Date,o.setFullYear(o.getFullYear()+1));let n=(await ja(f.establishmentId,i.toISOString(),o.toISOString(),t)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));if(e==="history"?n=n.filter(l=>l.endTime<s).sort((l,d)=>d.startTime-l.startTime):n=n.filter(l=>l.endTime>=s).sort((l,d)=>l.startTime-d.startTime),n.length===0){a.innerHTML=`
                <div class="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <i class="bi bi-info-circle text-2xl text-slate-300 mb-2 block"></i>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhum registo ${e==="history"?"no passado":"futuro"}.</p>
                </div>
            `;return}a.innerHTML=n.map(l=>{const d=l.endTime<new Date,u=v(l.reason||"Bloqueio");return`
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
            `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(l=>{l.addEventListener("click",async d=>{const u=d.currentTarget.dataset.blockId;if(confirm("Deletar e deixar a agenda livre neste horário?"))try{await $s(u),g("Removido","O bloqueio foi deletado.","success"),ma(t,e)}catch(c){g("Erro",`Não foi possível remover: ${c.message}`,"error")}})})}catch(s){a.innerHTML=`<p class="text-xs text-red-500 font-bold p-3 bg-red-50 rounded-xl">Erro: ${v(s.message)}</p>`}}let xo=!1;async function La(t){if(!t)return;t.innerHTML=`
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
    `;const e=document.getElementById("hierarchy-list-container"),a=document.getElementById("est-parent");try{const i=(await ke()).matrizes||[];if(a&&(a.innerHTML='<option value="">Nenhuma (Criar como Matriz Independente)</option>'),i.length===0)e.innerHTML=`
                <div class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
                    <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="bi bi-building-add text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">A sua rede está vazia</h3>
                    <p class="text-gray-500 max-w-md mx-auto mb-6">Comece por criar a sua primeira Matriz ou Loja principal para expandir o seu negócio.</p>
                </div>
            `;else{let o="";i.forEach(r=>{if(a&&!r.isOrphanBranch){const l=document.createElement("option");l.value=r.id,l.textContent=r.name,a.appendChild(l)}const n=r.isMatriz||!r.parentId?'<span class="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">📍 UNIDADE</span>';o+=`
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 transition-all hover:border-indigo-400 group">
                        <div class="bg-gray-50 border-b border-gray-200 p-4 md:p-5 flex justify-between items-center cursor-pointer hover:bg-gray-100/50" 
                             onclick="window.navigateTo('estabelecimento-section', { id: '${r.id}' })">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-sm group-hover:scale-105 transition-transform">
                                    ${r.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4 class="text-lg font-bold text-gray-800 flex items-center">
                                        ${r.name} ${n}
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
                `,r.branches&&r.branches.length>0?r.branches.forEach(l=>{o+=`
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
                `}),e.innerHTML=o}xo||(su(),xo=!0)}catch(s){console.error("Erro na renderização da rede:",s),e.innerHTML=`
            <div class="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100 text-center">
                <i class="bi bi-exclamation-triangle text-2xl mb-2 block"></i>
                <p class="font-bold text-sm">Não foi possível carregar a estrutura organizacional.</p>
            </div>
        `}}function su(){const t=document.getElementById("form-create-establishment");t&&t.addEventListener("submit",async e=>{e.preventDefault();const a=t.querySelector('button[type="submit"]'),s=a.innerHTML;a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...',a.disabled=!0;const i={name:document.getElementById("est-name").value.trim(),cnpj:document.getElementById("est-cnpj").value.trim(),parentId:document.getElementById("est-parent").value||null,timezone:document.getElementById("est-timezone").value};try{const o=await kr(i);alert(o.message||"Sucesso!"),t.reset();const r=document.getElementById("modal-create-establishment"),n=window.bootstrap?.Modal.getInstance(r);n&&n.hide(),await La(document.getElementById("content"))}catch(o){console.error("Erro ao criar estabelecimento:",o),alert("Erro: "+(o.message||"Falha ao gravar dados."))}finally{a.innerHTML=s,a.disabled=!1}})}window.loadAndRenderHierarchy=()=>La(document.getElementById("content"));let $e=[],hs=[],ga=null;const ou=async()=>{const t=f.selectedEstablishments?.[0]||f.establishmentId;return await C(`/api/subscription-plans/${t}`)},iu=async t=>await C("/api/subscription-plans",{method:"POST",body:JSON.stringify(t)}),ru=async(t,e)=>await C(`/api/subscription-plans/${t}`,{method:"PUT",body:JSON.stringify(e)}),nu=async t=>await C(`/api/subscription-plans/${t}`,{method:"DELETE"});async function lu(t={}){const e=document.getElementById("content");e.innerHTML=`
        <div class="flex items-center justify-center p-12">
            <div class="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    `;try{const a=f.selectedEstablishments?.[0]||f.establishmentId,[s,i]=await Promise.all([ou(),Ue(a)]);$e=s||[],hs=i||[],du(e),vs()}catch(a){e.innerHTML=`
            <div class="p-12 text-center">
                <i class="bi bi-exclamation-triangle text-rose-500 text-4xl mb-4"></i>
                <h2 class="text-xl font-bold text-slate-800">Erro ao Carregar Planos</h2>
                <p class="text-slate-500">${a.message}</p>
            </div>
        `}}function du(t){t.innerHTML=`
        <div class="p-4 md:p-8 max-w-7xl mx-auto pb-24 animate-fade-in">
            <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 class="text-2xl font-black text-slate-800 tracking-tight">Clubes de Benefícios</h1>
                    <p class="text-slate-500 text-sm mt-1">Crie planos de assinatura para fidelizar clientes e garantir receita recorrente.</p>
                </div>
                <button id="btnNewPlan" class="bg-indigo-600 text-white font-bold py-2.5 px-5 rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-95 flex items-center gap-2">
                    <i class="bi bi-plus-lg"></i> Novo Plano
                </button>
            </header>

            <div id="plansGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>

            <div id="planModal" class="fixed inset-0 z-[1000] hidden items-center justify-center bg-slate-900/50 backdrop-blur-sm opacity-0 transition-opacity duration-300">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform scale-95 transition-transform duration-300 m-4">
                    <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                        <h3 id="planModalTitle" class="text-lg font-bold text-slate-800">Criar Novo Plano</h3>
                        <button id="btnCloseModal" class="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    
                    <div class="p-6 overflow-y-auto flex-1">
                        <form id="planForm" class="space-y-5">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="md:col-span-2">
                                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Nome do Plano</label>
                                    <input type="text" id="planName" placeholder="Ex: Clube VIP da Barba" class="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all" required>
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Descrição Comercial</label>
                                    <textarea id="planDesc" rows="2" placeholder="O que o cliente ganha ao assinar este plano?" class="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"></textarea>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Preço da Mensalidade (R$)</label>
                                    <input type="number" id="planPrice" step="0.01" min="0" placeholder="Ex: 89.90" class="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-indigo-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all" required>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Ciclo de Cobrança</label>
                                    <select id="planCycle" class="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all" required>
                                        <option value="monthly">Mensal</option>
                                        <option value="quarterly">Trimestral</option>
                                        <option value="semiannual">Semestral</option>
                                        <option value="yearly">Anual</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Limite de Usos por Ciclo</label>
                                    <input type="number" id="planUsageLimit" min="1" step="1" placeholder="Ex: 4 (Deixe vazio p/ Ilimitado)" class="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all">
                                    <p class="text-[10px] text-slate-400 mt-1">Quantos serviços o cliente pode agendar grátis.</p>
                                </div>
                                
                                <div class="flex items-center mt-6">
                                    <label class="flex items-center cursor-pointer bg-slate-50 p-3 rounded-xl border border-slate-200 w-full">
                                        <div class="relative">
                                            <input type="checkbox" id="planActive" class="sr-only" checked>
                                            <div class="toggle-bg block bg-slate-300 w-10 h-6 rounded-full"></div>
                                        </div>
                                        <span class="ml-3 font-bold text-slate-700 text-sm">Plano Ativo para Venda</span>
                                    </label>
                                </div>
                            </div>

                            <div class="pt-4 border-t border-slate-200">
                                <label class="block text-sm font-bold text-slate-700 mb-3">Serviços Incluídos no Plano</label>
                                <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 max-h-48 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-2" id="planServicesContainer">
                                    </div>
                            </div>
                        </form>
                    </div>
                    
                    <div class="px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end gap-3">
                        <button type="button" id="btnCancelModal" class="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-colors">Cancelar</button>
                        <button type="submit" form="planForm" id="btnSavePlan" class="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2">
                            <i class="bi bi-check2"></i> Salvar Plano
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,uu()}function vs(){const t=document.getElementById("plansGrid");if($e.length===0){t.innerHTML=`
            <div class="col-span-full bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center">
                <div class="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4"><i class="bi bi-star text-3xl"></i></div>
                <h3 class="text-lg font-bold text-slate-700">Nenhum plano criado</h3>
                <p class="text-slate-500 text-sm mt-1 max-w-md mx-auto">Crie o seu primeiro clube de assinaturas para garantir receita recorrente todos os meses.</p>
            </div>
        `;return}const e={monthly:"mês",quarterly:"trimestre",semiannual:"semestre",yearly:"ano"};t.innerHTML=$e.map(a=>{const s=a.active,i=e[a.billingCycle]||a.billingCycle,o=(a.servicesIncluded||[]).length,r=a.usageLimit?`${a.usageLimit} usos`:"Ilimitado";return`
            <div class="bg-white rounded-2xl border ${s?"border-slate-200 hover:border-indigo-300":"border-slate-200 opacity-75"} shadow-sm p-6 flex flex-col transition-colors relative">
                <div class="absolute top-4 right-4">
                    <span class="text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${s?"bg-emerald-100 text-emerald-700":"bg-slate-100 text-slate-500"}">${s?"Ativo":"Inativo"}</span>
                </div>
                
                <h3 class="text-lg font-black text-slate-800 pr-16 leading-tight">${v(a.name)}</h3>
                <p class="text-xs text-slate-500 mt-1 line-clamp-2 flex-1">${v(a.description||"Sem descrição")}</p>
                
                <div class="mt-5 mb-5 flex items-baseline gap-1 text-indigo-700">
                    <span class="text-sm font-bold">R$</span>
                    <span class="text-3xl font-black tracking-tight">${a.price.toFixed(2).replace(".",",")}</span>
                    <span class="text-xs font-semibold text-slate-400">/${i}</span>
                </div>

                <div class="space-y-2 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div class="flex justify-between text-xs">
                        <span class="text-slate-500 font-semibold"><i class="bi bi-arrow-repeat mr-1"></i>Limite:</span>
                        <span class="text-slate-800 font-bold">${r}</span>
                    </div>
                    <div class="flex justify-between text-xs">
                        <span class="text-slate-500 font-semibold"><i class="bi bi-list-check mr-1"></i>Cobertura:</span>
                        <span class="text-slate-800 font-bold">${o} Serviços</span>
                    </div>
                </div>

                <div class="mt-auto grid grid-cols-2 gap-2">
                    <button data-action="edit" data-id="${a.id}" class="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors">Editar</button>
                    <button data-action="delete" data-id="${a.id}" class="py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl text-sm transition-colors">Apagar</button>
                </div>
            </div>
        `}).join("")}function cu(t=[]){const e=document.getElementById("planServicesContainer");if(hs.length===0){e.innerHTML='<p class="text-xs text-slate-500 col-span-full">Nenhum serviço registado no sistema.</p>';return}e.innerHTML=hs.map(a=>{const s=t.includes(a.id);return`
            <label class="flex items-center p-2 rounded-lg hover:bg-white cursor-pointer transition-colors border border-transparent hover:border-slate-200">
                <input type="checkbox" value="${a.id}" class="service-cb w-4 h-4 text-indigo-600 accent-indigo-600 rounded border-slate-300 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="ml-3 text-sm font-semibold text-slate-700 truncate flex-1">${v(a.name)}</span>
                <span class="text-xs font-bold text-slate-400">R$ ${a.price.toFixed(2)}</span>
            </label>
        `}).join("")}function ho(t=null){ga=t?t.id:null,document.getElementById("planModalTitle").textContent=t?"Editar Plano":"Criar Novo Plano",document.getElementById("planName").value=t?t.name:"",document.getElementById("planDesc").value=t&&t.description||"",document.getElementById("planPrice").value=t?t.price:"",document.getElementById("planCycle").value=t?t.billingCycle:"monthly",document.getElementById("planUsageLimit").value=t&&t.usageLimit?t.usageLimit:"",document.getElementById("planActive").checked=t?t.active:!0,cu(t?t.servicesIncluded:[]);const e=document.getElementById("planModal");e.classList.remove("hidden"),e.classList.add("flex"),setTimeout(()=>{e.classList.remove("opacity-0"),e.querySelector("div").classList.remove("scale-95"),e.querySelector("div").classList.add("scale-100")},10)}function Ga(){const t=document.getElementById("planModal");t.classList.add("opacity-0"),t.querySelector("div").classList.remove("scale-100"),t.querySelector("div").classList.add("scale-95"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.getElementById("planForm").reset()},300)}function uu(){document.getElementById("btnNewPlan").addEventListener("click",()=>ho()),document.getElementById("btnCloseModal").addEventListener("click",Ga),document.getElementById("btnCancelModal").addEventListener("click",Ga),document.getElementById("plansGrid").addEventListener("click",async t=>{const e=t.target.closest("button[data-action]");if(!e)return;const a=e.dataset.action,s=e.dataset.id,i=$e.find(o=>o.id===s);if(a==="edit")ho(i);else if(a==="delete"&&await G("Apagar Plano",`Tem a certeza que deseja apagar o plano "${i.name}"?`))try{e.disabled=!0,e.innerHTML='<i class="bi bi-hourglass"></i>',await nu(s),$e=$e.filter(r=>r.id!==s),vs(),g("Sucesso","Plano apagado.","success")}catch(r){e.disabled=!1,e.innerHTML="Apagar",g("Atenção",r.message,"warning")}}),document.getElementById("planForm").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("btnSavePlan"),a=Array.from(document.querySelectorAll(".service-cb:checked")).map(i=>i.value);if(a.length===0)return g("Aviso","Selecione pelo menos um serviço para o plano.","warning");const s={name:document.getElementById("planName").value.trim(),description:document.getElementById("planDesc").value.trim(),price:parseFloat(document.getElementById("planPrice").value),billingCycle:document.getElementById("planCycle").value,usageLimit:document.getElementById("planUsageLimit").value?parseInt(document.getElementById("planUsageLimit").value,10):null,active:document.getElementById("planActive").checked,servicesIncluded:a,establishmentId:f.selectedEstablishments?.[0]||f.establishmentId};try{if(e.disabled=!0,e.innerHTML='<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Salvando...',ga){await ru(ga,s);const i=$e.findIndex(o=>o.id===ga);$e[i]={...$e[i],...s},g("Sucesso","Plano atualizado!","success")}else{const i=await iu(s);$e.unshift(i),g("Sucesso","Plano criado com sucesso!","success")}Ga(),vs()}catch(i){g("Erro",i.message||"Erro ao salvar o plano.","error")}finally{e.disabled=!1,e.innerHTML='<i class="bi bi-check2"></i> Salvar Plano'}})}document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("gesturestart",e=>e.preventDefault()),document.addEventListener("gesturechange",e=>e.preventDefault()),document.addEventListener("gestureend",e=>e.preventDefault());let t=0;document.addEventListener("touchend",function(e){const a=new Date().getTime();a-t<=300&&e.preventDefault(),t=a},!1)});const ue=document.getElementById("loadingScreen"),xt=document.getElementById("dashboardContent"),ot=document.getElementById("content"),Qa=document.getElementById("notificationBell"),ia=document.getElementById("notificationBadge"),Ze=document.getElementById("notificationPanel"),Ya=document.getElementById("notificationList"),Pe=document.getElementById("profileMenuButton"),me=document.getElementById("profileDropdown"),vo=document.getElementById("profileName"),yo=document.getElementById("profileEmail"),wo=document.getElementById("logoutButton"),ko=document.getElementById("myProfileLink"),So=document.getElementById("hamburger-menu-btn"),be=document.getElementById("sidebar"),ve=document.getElementById("mobile-overlay"),Io=document.getElementById("themeToggleBtn"),Xa=document.getElementById("themeIcon"),ys=document.getElementById("mobile-bottom-nav"),$o=document.getElementById("nav-scroll"),pu=document.querySelectorAll(".bottom-nav-item");function bu(){if(!$o)return;const t=document.querySelector(".bottom-nav-item.active");if(!t)return;const e=$o,a=e.getBoundingClientRect(),s=t.getBoundingClientRect(),o=s.left+s.width/2-a.left-a.width/2;e.scrollBy({left:o,behavior:"smooth"})}const mu={"dashboard-section":un,"agenda-section":ti,"comandas-section":nl,"relatorios-section":dl,"servicos-section":wl,"produtos-section":Nl,"suppliers-section":Ql,"profissionais-section":od,"clientes-section":hd,"estabelecimento-section":t=>Ci(t),"ausencias-section":Qd,"users-section":Sa,"sales-report-section":cc,"financial-section":bc,"commissions-section":Ec,"packages-section":Wc,"my-profile-section":eu,"hierarquia-section":()=>La(ot),"establishments-section":()=>La(ot),"planos-assinatura-section":lu},gu={"dashboard-section":"Dashboard","agenda-section":"Agenda","comandas-section":"Comandas / PDV","relatorios-section":"Relatórios","servicos-section":"Serviços","produtos-section":"Estoque","suppliers-section":"Parceiros","profissionais-section":"Equipe","clientes-section":"Clientes","estabelecimento-section":"Empresa","ausencias-section":"Ausências","users-section":"Usuários","sales-report-section":"Relatório de Vendas","financial-section":"Financeiro","commissions-section":"Comissões","packages-section":"Pacotes","my-profile-section":"Meu Perfil","hierarquia-section":"Rede / Filiais","establishments-section":"Rede / Filiais","planos-assinatura-section":"Clubes e Planos"};function fa(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("kairos_theme",t),Xa&&(t==="dark"?Xa.className="bi bi-sun-fill text-lg sm:text-xl text-amber-400":Xa.className="bi bi-moon-fill text-lg sm:text-xl text-slate-500")}function fu(){const t=localStorage.getItem("kairos_theme"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;fa(t||(e?"dark":"light"))}let Mt=null,Bt=[];function zi(){if(!ia||!Ya)return;const t=Bt.filter(e=>!e.read).length;if(t>0?(ia.textContent=t,ia.classList.remove("hidden")):ia.classList.add("hidden"),Bt.length===0){Ya.innerHTML='<p class="text-center text-slate-500 p-4 text-sm">Nenhuma notificação.</p>';return}Ya.innerHTML=Bt.map(e=>`
    <div class="notification-item ${e.read?"":"unread"}">
        <p class="font-semibold text-sm text-slate-800">${e.title}</p>
        <p class="text-xs text-slate-600 mt-0.5">${e.message}</p>
        <p class="text-[10px] text-slate-400 mt-1"><i class="bi bi-clock mr-1"></i>${e.time}</p>
    </div>
    `).join("")}function Eo(t){Mt&&Mt();const e=Ca(xe,"establishments",t,"notifications"),a=Do(e,Po("timestamp",">=",new Date),ar("timestamp","desc"));Mt=sr(a,s=>{s.docChanges().forEach(i=>{if(i.type==="added"){const o=i.doc.data();Bt.unshift({title:o.title,message:o.message,time:o.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),g(o.title,o.message,"info",!0),zi();const r=document.querySelector(".sidebar-link.active");r&&r.dataset.target==="agenda-section"&&ti()}})},s=>{console.error("Erro no listener de notificações:",s)})}async function xu(t){const e=document.getElementById("multi-context-container"),a=document.getElementById("multi-context-btn"),s=document.getElementById("multi-context-label"),i=document.getElementById("multi-context-count"),o=document.getElementById("multi-context-list"),r=document.getElementById("multi-context-apply"),n=document.getElementById("multi-context-dropdown"),l=document.getElementById("multi-context-arrow");if(!(!e||!o))try{const u=(await ke()).matrizes||[];let c="",p=0;if(u.forEach(b=>{c+=`
                <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors mb-1">
                    <input type="checkbox" value="${b.id}" class="context-checkbox" data-name="${ra(b.name)}">
                    <span class="text-[13px] sm:text-sm font-bold text-slate-700 truncate">🏢 ${ra(b.name)}</span>
                </label>
            `,p++,b.branches&&b.branches.length>0&&b.branches.forEach(m=>{c+=`
                        <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors ml-4 mb-1 border-l-2 border-slate-100 pl-3">
                            <input type="checkbox" value="${m.id}" class="context-checkbox" data-name="${ra(m.name)}">
                            <span class="text-[12px] sm:text-[13px] font-medium text-slate-600 truncate">📍 ${ra(m.name)}</span>
                        </label>
                    `,p++})}),p>0){o.innerHTML=c,e.style.display="block",(!f.selectedEstablishments||f.selectedEstablishments.length===0)&&(f.selectedEstablishments=[t]);const b=Array.from(o.querySelectorAll('input[type="checkbox"]')),m=()=>{const y=b.filter(S=>S.checked);i.textContent=y.length,y.length===0?s.textContent="Nenhuma selecionada":y.length===1?s.textContent=y[0].dataset.name:s.textContent=`${y.length} Unidades`};let x=!1;b.forEach(y=>{f.selectedEstablishments.includes(y.value)&&(y.checked=!0,x=!0)}),!x&&b.length>0&&(b[0].checked=!0,f.selectedEstablishments=[b[0].value],f.establishmentId=b[0].value),m(),a.addEventListener("click",y=>{y.stopPropagation(),n.classList.toggle("hidden"),l.style.transform=n.classList.contains("hidden")?"rotate(0deg)":"rotate(180deg)"}),document.addEventListener("click",y=>{!e.contains(y.target)&&!n.classList.contains("hidden")&&(n.classList.add("hidden"),l.style.transform="rotate(0deg)",b.forEach(S=>{S.checked=f.selectedEstablishments.includes(S.value)}),m())}),b.forEach(y=>y.addEventListener("change",m)),r.addEventListener("click",async y=>{y.stopPropagation(),ue&&(ue.classList.remove("hidden","fade-out"),ue.style.display="flex");const S=b.filter(D=>D.checked);if(S.length===0){ue&&(ue.classList.add("fade-out"),setTimeout(()=>{ue.style.display="none"},500)),g("Atenção","Selecione pelo menos uma unidade.","warning");return}f.selectedEstablishments=S.map(D=>D.value);const L=f.selectedEstablishments[0];try{const D=await Ae(L);f.establishmentId=L,f.establishmentName=D.name,f.enabledModules=D.modules,f.currentViewContext={id:L,name:D.name,type:D.parentId?"BRANCH":"GROUP"},Eo(L),Lo(f.userPermissions),n.classList.add("hidden"),l.style.transform="rotate(0deg)",g("Ambiente Atualizado","Exibindo dados consolidados.","success");const k=document.querySelector(".sidebar-link.active"),I=k?k.getAttribute("data-target"):"dashboard-section";ie(I)}catch{g("Erro","Problema ao trocar a visualização.","error")}finally{ue&&(ue.classList.add("fade-out"),setTimeout(()=>{ue.style.display="none"},500))}});try{const y=await Ae(f.establishmentId);f.establishmentName=y.name,f.enabledModules=y.modules,f.currentViewContext={id:f.establishmentId,name:y.name,type:y.parentId?"BRANCH":"GROUP"},Eo(f.establishmentId),Lo(f.userPermissions)}catch{}}else e.style.display="none"}catch{e.style.display="none"}}function ie(t,e={}){const a=t.replace("-section","");if(t!=="my-profile-section"){const i=["hierarquia-section","establishments-section","estabelecimento-section","dashboard-section"].includes(t),o=f.enabledModules?.[a]!==!1,r=f.userPermissions===null||f.userPermissions[t]?.view===!0;if(!i&&(!o||!r)){ot&&(ot.innerHTML='<div class="p-8 text-center mt-10"><i class="bi bi-shield-lock text-5xl text-rose-500 mb-4 block"></i><h2 class="text-2xl font-bold text-slate-800">Acesso Negado</h2><p class="text-slate-500 mt-2">Você não possui permissão para visualizar esta tela.</p></div>'),document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active")),be&&be.classList.contains("absolute")&&(be.classList.add("hidden"),ve&&ve.classList.add("hidden"));return}}const s=mu[t];if(s&&ot){const i=document.getElementById("header-page-title");i&&(i.textContent=gu[t]||"Painel"),document.querySelectorAll(".sidebar-link").forEach(o=>{o.classList.toggle("active",o.getAttribute("data-target")===t)}),ys&&(pu.forEach(o=>{o.classList.toggle("active",o.getAttribute("data-target")===t)}),setTimeout(bu,50)),t==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(o=>o.classList.remove("active")),ot.innerHTML="",window.innerWidth<768&&be&&(be.classList.add("hidden"),ve&&ve.classList.add("hidden")),s(e)}}window.navigateTo=ie;async function Lo(t){const e=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),s=document.getElementById("kpi-today-appointments"),i=document.getElementById("kpi-today-revenue"),o=t===null||t["agenda-section"]?.view===!0,r=t===null||t["financial-section"]?.view===!0;if(o&&e&&(e.classList.remove("hidden"),e.classList.add("inline-flex")),r&&a&&(a.classList.remove("hidden"),a.classList.add("inline-flex")),!(!o&&!r))try{const n=await qo();o&&s&&(s.textContent=n.todayAppointments.toString()),r&&i&&(i.textContent=`R$ ${n.todayRevenue.toFixed(2).replace(".",",")}`)}catch{}}async function hu(t){try{Ce.getPlatform()==="android"&&await pe.createChannel({id:"default",name:"Notificações",description:"Alertas",importance:5,visibility:1,vibration:!0});let e=await pe.checkPermissions();if(e.receive==="prompt"&&(e=await pe.requestPermissions()),e.receive!=="granted")return;await pe.register(),pe.addListener("registration",async a=>{try{const s=qe(xe,"users",t);await At(s,{fcmTokens:tr(a.value),platform:"native_mobile"})}catch{}}),pe.addListener("pushNotificationReceived",a=>g(a.title,a.body,"info",!0)),pe.addListener("pushNotificationActionPerformed",()=>ie("agenda-section"))}catch{}}function vu(){const t=document.getElementById("exitConfirmationModal"),e=document.getElementById("btn-cancel-exit"),a=document.getElementById("btn-confirm-exit"),s=()=>t&&(t.style.display="block"),i=()=>t&&(t.style.display="none"),o=()=>t&&t.style.display==="block";t&&(e.addEventListener("click",()=>{i(),Ce.isNativePlatform()||history.pushState(null,document.title,location.href)}),a.addEventListener("click",()=>{i(),Ce.isNativePlatform()?Vs.exitApp():history.back()}),Ce.isNativePlatform()?Vs.addListener("backButton",()=>{if(o())i();else{const r=document.querySelectorAll('.modal[style*="display: block"]'),n=Array.from(r).filter(d=>d.id!=="exitConfirmationModal");if(n.length>0){n.forEach(d=>d.style.display="none");return}if(be&&!be.classList.contains("hidden")&&window.innerWidth<768){be.classList.add("hidden"),ve&&ve.classList.add("hidden");return}const l=document.querySelector(".sidebar-link.active");l&&l.getAttribute("data-target")==="dashboard-section"?s():ie("dashboard-section")}}):(history.pushState(null,document.title,location.href),window.addEventListener("popstate",()=>{if(o()){i(),history.pushState(null,document.title,location.href);return}const r=document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display: flex"]'),n=Array.from(r).filter(d=>d.id!=="exitConfirmationModal");if(n.length>0){n.forEach(d=>d.style.display="none"),history.pushState(null,document.title,location.href);return}const l=document.querySelector(".sidebar-link.active");l&&l.getAttribute("data-target")==="dashboard-section"?s():(ie("dashboard-section"),history.pushState(null,document.title,location.href))})))}function ra(t){return t?t.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}async function yu(){try{await Gi(we,Qi)}catch{}Ce.isNativePlatform()&&document.body.classList.add("is-app-native"),or(),vu(),fu(),Io&&Io.addEventListener("click",t=>{t.preventDefault();const e=document.documentElement.getAttribute("data-theme")||"light";fa(e==="dark"?"light":"dark")}),So&&So.addEventListener("click",t=>{t.stopPropagation(),be&&(be.classList.remove("hidden"),be.classList.add("absolute","inset-y-0","left-0","z-40","shadow-xl")),ve&&ve.classList.remove("hidden")}),ys&&ys.addEventListener("click",t=>{const e=t.target.closest(".bottom-nav-item");if(!e)return;t.preventDefault();const a=e.getAttribute("data-target");ie(a)}),ve&&ve.addEventListener("click",()=>{be&&(be.classList.add("hidden"),be.classList.remove("absolute","inset-y-0","left-0","z-40","shadow-xl")),ve.classList.add("hidden")}),Qa&&Qa.addEventListener("click",t=>{t.stopPropagation(),Ze&&(Ze.classList.toggle("hidden"),Ze.classList.contains("hidden")||(Bt.forEach(e=>e.read=!0),zi()))}),Pe&&Pe.addEventListener("click",t=>{t.stopPropagation(),me&&(me.classList.toggle("active"),me.classList.contains("active")?me.classList.remove("hidden"):setTimeout(()=>me.classList.add("hidden"),200))}),ko&&ko.addEventListener("click",t=>{t.preventDefault(),ie("my-profile-section"),me&&(me.classList.remove("active"),me.classList.add("hidden"))}),window.addEventListener("userPhotoUpdated",t=>{const e=t.detail;Pe&&e&&(Pe.innerHTML=`<img src="${e}" alt="Avatar" class="w-full h-full rounded-full object-cover">`)}),document.addEventListener("click",t=>{Ze&&!Ze.contains(t.target)&&t.target!==Qa&&Ze.classList.add("hidden"),me&&!me.contains(t.target)&&t.target!==Pe&&me.classList.contains("active")&&(me.classList.remove("active"),setTimeout(()=>me.classList.add("hidden"),200))}),Yi(we,async t=>{if(t){if(!Ce.isNativePlatform()&&(zr(),"Notification"in window&&Notification.permission==="default")){const e=document.getElementById("toast-notification-request"),a=document.getElementById("btn-enable-toast");e&&setTimeout(()=>{e.style.display="block"},3500),a&&a.addEventListener("click",async()=>{await _r()&&e&&(e.style.display="none")});const s=()=>{e&&(e.style.display="none")},i=document.getElementById("btn-deny-toast"),o=document.getElementById("btn-close-toast");i&&i.addEventListener("click",s),o&&o.addEventListener("click",s)}try{const a=(await t.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="admin"||a.role==="employee")&&a.establishmentId){let s=null,i=t.displayName,o=null,r=null;const n=qe(xe,"users",t.uid),l=await ws(n);if(l.exists()){const u=l.data();s=a.role==="employee"?u.permissions||{}:null,i=u.name||i,o=u.professionalId||null,r=u.photo||null}if(f.userProfessionalId=o,o&&!r)try{const u=await To(o);u&&u.photo&&(r=u.photo)}catch{}Ce.isNativePlatform()&&hu(t.uid);const d=i||t.email;nr(a.establishmentId,"Carregando...",s),r?Pe&&(Pe.innerHTML=`<img src="${r}" class="w-full h-full rounded-full object-cover">`):Pe&&(Pe.textContent=d.charAt(0).toUpperCase()),vo&&(vo.textContent=d),yo&&(yo.textContent=t.email),wo&&wo.addEventListener("click",u=>{u.preventDefault(),Mt&&Mt(),Xi(we).then(()=>window.location.href="/login.html")}),await xu(a.establishmentId),wr(ie,s,f.enabledModules),ue&&(ue.classList.add("fade-out"),setTimeout(()=>{ue.style.display="none"},500)),xt&&(xt.style.display="flex"),setTimeout(()=>{Cr()},1500),ie("dashboard-section")}else throw new Error("Permissão ou estabelecimento não configurado.")}catch(e){ue&&(ue.style.display="none"),xt&&(xt.innerHTML=`<div class="w-full h-full flex flex-col items-center justify-center p-4 text-center"><i class="bi bi-x-circle text-5xl text-rose-500 mb-4"></i><h2 class="text-xl font-bold">Erro de Acesso</h2><p class="text-slate-500 mt-2">${e.message}</p></div>`,xt.style.display="flex")}}else window.location.href="/login.html"})}yu();export{Bo as W};
