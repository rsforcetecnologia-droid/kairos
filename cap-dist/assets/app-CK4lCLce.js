const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-Dm6xcP09.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/firebase-config-seH-87Om.js","assets/utils-DTVAHnIk.js","assets/styles-CQhY7Cv2.css"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as ke,d as he,m as Ns}from"./firebase-config-seH-87Om.js";import{EmailAuthProvider as Hi,reauthenticateWithCredential as Oi,verifyBeforeUpdateEmail as zi,updatePassword as _i,updateProfile as Vi,setPersistence as Ui,browserLocalPersistence as Wi,onAuthStateChanged as Ji,signOut as Gi}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as je,getDoc as ys,updateDoc as jt,setDoc as Qi,addDoc as $o,collection as Da,query as Lo,where as Co,getDocs as Yi,deleteDoc as Xi,arrayUnion as Zi,orderBy as Ki,onSnapshot as er}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{a as A,e as v,s as K,b as g,c as Fe,r as Pa,f as za,i as tr}from"./utils-DTVAHnIk.js";import{getToken as ar,onMessage as sr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const f={userName:null,userProfessionalId:null,userPermissions:null,userRole:null,groupId:null,groupName:null,accessibleCompanies:[],accessibleEstablishments:[],currentViewContext:{type:null,id:null,name:null},establishmentId:null,establishmentName:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function or(t,e,a){f.establishmentId=t,f.establishmentName=e,f.userPermissions=a,f.currentViewContext={type:"BRANCH",id:t,name:e}}const Ta=(t,e,a,s=null)=>{let i=`/api/appointments/${t}?startDate=${e}&endDate=${a}`;return s&&(i+=`&professionalId=${s}`),A(i)},ir=(t,e,a)=>{const s=`/api/appointments/cancelled/${t}?startDate=${e}&endDate=${a}`;return A(s)},rr=({establishmentId:t,professionalId:e,serviceIds:a,date:s})=>{const i=`/api/availability?establishmentId=${t}&professionalId=${e}&serviceIds=${a.join(",")}&date=${s}`;return A(i)},nr=t=>A("/api/appointments",{method:"POST",body:JSON.stringify(t)}),lr=(t,e)=>A(`/api/appointments/${t}`,{method:"PUT",body:JSON.stringify(e)}),dr=(t,e)=>A(`/api/appointments/${t}/status`,{method:"PATCH",body:JSON.stringify({status:e})}),cr=t=>A(`/api/appointments/${t}`,{method:"DELETE"}),ur=t=>A(`/api/appointments/${t}/reopen`,{method:"POST"}),pr=(t,e)=>A(`/api/appointments/${t}/checkout`,{method:"POST",body:JSON.stringify(e)}),le=document.getElementById("sidebar"),Qe=document.getElementById("sidebarToggle"),St=document.getElementById("mainContent"),br=document.querySelectorAll(".sidebar-link"),Za=document.getElementById("menu-search"),Rs=document.getElementById("hamburger-menu-btn"),ut=document.getElementById("mobile-overlay");let Me=!0;function He(t){if(!le||!St)return;le.classList.toggle("collapsed",t),St.classList.toggle("sidebar-collapsed-shift",t);const e=le.querySelector(".sidebar-search-container"),a=le.querySelectorAll(".sidebar-category");t?(e&&(e.style.display="none"),a.forEach(s=>s.style.display="none"),document.querySelectorAll(".submenu-toggle").forEach(s=>{const i=s.getAttribute("data-target-submenu"),o=document.getElementById(i),r=s.querySelector(".submenu-arrow");o&&(o.classList.add("hidden"),o.classList.remove("flex")),r&&r.classList.remove("rotate-180")})):(e&&(e.style.display="block"),a.forEach(s=>s.style.display="block"))}function mr(){!le||!ut||(le.classList.add("mobile-open"),ut.classList.add("visible"))}function Ot(){!le||!ut||(le.classList.remove("mobile-open"),ut.classList.remove("visible"))}function gr(){He(!le.classList.contains("collapsed"))}function fr(t,e){const a=document.getElementById(t);if(!a)return;const s=a.classList.contains("hidden");s&&window.innerWidth>=1024&&le.classList.contains("collapsed")&&He(!1),s?(a.classList.remove("hidden"),a.classList.add("flex"),e&&e.classList.add("rotate-180")):(a.classList.add("hidden"),a.classList.remove("flex"),e&&e.classList.remove("rotate-180"))}function xr(){Za&&Za.addEventListener("input",t=>{const e=t.target.value.toLowerCase().trim(),a=document.getElementById("sidebar-nav");if(!a)return;const s=a.querySelectorAll("li"),i=a.querySelectorAll(".sidebar-category");if(e===""){s.forEach(o=>o.style.display=""),i.forEach(o=>o.style.display="block");return}i.forEach(o=>o.style.display="none"),s.forEach(o=>{if(o.classList.contains("sidebar-category"))return;const r=o.querySelector(".sidebar-link")||o.querySelector(".submenu-toggle");if(!r)return;if(r.textContent.toLowerCase().includes(e)){o.style.display="";const d=o.closest('ul[id$="-submenu"]');if(d){d.classList.remove("hidden"),d.classList.add("flex"),d.parentElement.style.display="";const u=d.parentElement.querySelector(".submenu-toggle");if(u){const c=u.querySelector(".submenu-arrow");c&&c.classList.add("rotate-180")}}}else{const d=r.getAttribute("data-target-submenu");if(d){const u=document.getElementById(d);u&&(Array.from(u.querySelectorAll(".sidebar-link")).some(m=>m.textContent.toLowerCase().includes(e))?o.style.display="":o.style.display="none")}else o.style.display="none"}})})}function hr(t,e,a){if(!le||!St)return;St.classList.add("main-content-shift"),window.innerWidth>=1024?(Me=!0,He(!1)):window.innerWidth>=768?(Me=!1,He(!0)):(St.classList.remove("main-content-shift","sidebar-collapsed-shift"),Ot()),Qe&&Qe.addEventListener("click",i=>{i.stopPropagation(),window.innerWidth>=768?(Me=!Me,He(!Me),Me?(Qe.classList.add("text-indigo-400"),Qe.classList.remove("text-gray-400")):(Qe.classList.remove("text-indigo-400"),Qe.classList.add("text-gray-400"))):gr()}),le.addEventListener("mouseenter",()=>{window.innerWidth>=768&&!Me&&le.classList.contains("collapsed")&&He(!1)}),le.addEventListener("mouseleave",()=>{if(window.innerWidth>=768&&!Me){const i=!!document.querySelector("#sidebarToggle:hover"),o=document.activeElement===Za;!i&&!o&&He(!0)}}),Rs&&Rs.addEventListener("click",i=>{i.stopPropagation(),mr()}),ut&&ut.addEventListener("click",i=>{i.stopPropagation(),Ot()});let s=0;le.addEventListener("touchstart",i=>{s=i.changedTouches[0].screenX},{passive:!0}),le.addEventListener("touchend",i=>{const o=i.changedTouches[0].screenX;s-o>50&&Ot()},{passive:!0}),document.querySelectorAll(".submenu-toggle").forEach(i=>{i.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();const r=i.getAttribute("data-target-submenu"),n=i.querySelector(".submenu-arrow");fr(r,n)})}),xr(),br.forEach(i=>{const o=i.getAttribute("data-target");if(!o)return;const r=o.replace("-section",""),n=a?.[r]!==!1,l=e===null||e[o]?.view===!0;if(!n||!l){i.parentElement&&i.parentElement.tagName==="LI"?i.parentElement.style.display="none":i.style.display="none";return}i.addEventListener("click",d=>{d.preventDefault(),document.querySelectorAll(".sidebar-link").forEach(u=>u.classList.remove("active")),i.classList.add("active"),o&&typeof t=="function"&&t(o),window.innerWidth<768&&Ot()})})}const vr=t=>A("/api/establishments/",{method:"POST",body:JSON.stringify(t)}),De=()=>A("/api/establishments/hierarchy",{method:"GET"}),Be=t=>{const e=t||f.establishmentId;return e?A(`/api/establishments/${e}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},qt=(t,e)=>{const a=t||f.establishmentId;return a?A(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(e)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},yr=(t,e)=>{const a=t||f.establishmentId;return a?A(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:e})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},wr=(t,e)=>{const a=t||f.establishmentId;return a?A(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:e})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Pe=t=>A(`/api/professionals/${t}`),Do=t=>A(`/api/professionals/details/${t}`),kr=t=>A("/api/professionals",{method:"POST",body:JSON.stringify(t)}),Ka=(t,e)=>A(`/api/professionals/${t}`,{method:"PUT",body:JSON.stringify(e)}),Po=t=>A(`/api/professionals/${t}`,{method:"DELETE"}),Ir=t=>{const e=t.map(a=>Po(a));return Promise.all(e)};class Sr{constructor(e,a,s){this.steps=e,this.currentStep=0,this.onComplete=a,this.onSkip=s,this.isActive=!1,this.overlay=null,this.spotlight=null,this.popover=null,this.handleResize=this.handleResize.bind(this)}start(){this.isActive||(this.isActive=!0,this.createElements(),window.addEventListener("resize",this.handleResize),this.renderStep())}stop(e=!1){this.isActive=!1,window.removeEventListener("resize",this.handleResize),this.overlay&&this.overlay.remove(),this.spotlight&&this.spotlight.remove(),this.popover&&this.popover.remove(),e&&this.onComplete?this.onComplete():!e&&this.onSkip&&this.onSkip()}createElements(){this.overlay=document.createElement("div"),this.overlay.className="fixed inset-0 bg-black/60 z-[99990] transition-opacity duration-300",document.body.appendChild(this.overlay),this.spotlight=document.createElement("div"),this.spotlight.className="absolute rounded-xl z-[99991] transition-all duration-500 ease-in-out pointer-events-none bg-transparent",this.spotlight.style.boxShadow="0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255,255,255,0.5) inset",document.body.appendChild(this.spotlight),this.popover=document.createElement("div"),this.popover.className="absolute z-[99992] bg-white rounded-2xl shadow-2xl w-[320px] transition-all duration-500 ease-in-out opacity-0 transform scale-95 border border-gray-100 flex flex-col",document.body.appendChild(this.popover)}async renderStep(){if(this.currentStep>=this.steps.length){this.stop(!0);return}const e=this.steps[this.currentStep];this.popover.style.opacity="0",this.popover.style.transform="scale(0.95)",e.onBefore&&(await e.onBefore(),await this.sleep(600));const a=await this.waitForElement(e.targetSelector,3e3);if(a){a.scrollIntoView({behavior:"smooth",block:"center"}),await this.sleep(300);const i=a.getBoundingClientRect(),o=8;this.spotlight.style.top=`${i.top+window.scrollY-o}px`,this.spotlight.style.left=`${i.left+window.scrollX-o}px`,this.spotlight.style.width=`${i.width+o*2}px`,this.spotlight.style.height=`${i.height+o*2}px`,this.spotlight.style.display="block",this.overlay.style.display="none",this.positionPopover(i)}else this.spotlight.style.display="none",this.overlay.style.display="block",this.popover.style.top="50%",this.popover.style.left="50%",this.popover.style.transform="translate(-50%, -50%) scale(1)";const s=this.currentStep===this.steps.length-1;this.popover.innerHTML=`
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
        `,setTimeout(()=>{a&&(this.popover.style.transform="scale(1)"),this.popover.style.opacity="1"},50),document.getElementById("tour-next-btn").onclick=()=>{this.currentStep++,this.renderStep()},document.getElementById("tour-prev-btn")&&(document.getElementById("tour-prev-btn").onclick=()=>{this.currentStep--,this.renderStep()}),document.getElementById("tour-skip-btn").onclick=()=>this.stop(!1)}positionPopover(e){const a=this.popover.getBoundingClientRect(),s=20;let i=e.bottom+window.scrollY+s,o=e.left+window.scrollX;i+a.height>window.scrollY+window.innerHeight&&(i=e.top+window.scrollY-a.height-s),o+a.width>window.innerWidth&&(o=e.right+window.scrollX-a.width),o<s&&(o=s),this.popover.style.top=`${i}px`,this.popover.style.left=`${o}px`}handleResize(){this.isActive&&this.renderStep()}sleep(e){return new Promise(a=>setTimeout(a,e))}async waitForElement(e,a){if(!e)return null;const s=Date.now();for(;Date.now()-s<a;){const i=document.querySelector(e);if(i)return i;await this.sleep(100)}return null}}async function Er(){try{console.log("A verificar Onboarding interativo...");const t=await Be(f.establishmentId);if(!t||t.parentId||t.onboardingCompleted)return;const e=[{title:"Bem-vindo ao Kairos!",icon:"👋",content:"Preparei um tour rápido para lhe mostrar onde deve configurar as 3 coisas mais importantes antes de receber agendamentos. Vamos a isso?",targetSelector:null},{title:"Perfil e Dados da Loja",icon:"🏢",content:"É aqui em 'Minha Empresa' que você define o nome do Salão, telefone, endereço e faz o upload da sua Logomarca.",targetSelector:'[data-target="estabelecimento-section"]',onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Cores e Personalização",icon:"🎨",content:"Nesta área você pode mudar a cor principal do sistema para ficar com a cara da sua marca. O link do seu cliente vai usar esta cor!",targetSelector:"#themeColor",onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Criação de Serviços",icon:"✂️",content:"Na aba 'Serviços' é onde a mágica acontece. Crie os serviços que os seus clientes vão poder agendar, informando o preço e a duração de cada um.",targetSelector:'[data-target="servicos-section"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Novo Serviço",icon:"➕",content:"Sempre que precisar adicionar um novo serviço ao menu, basta clicar neste botão verde.",targetSelector:'[data-action="new-service"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Gestão da Equipe",icon:"👥",content:"E para terminar: a 'Equipa'. Aqui você cadastra os profissionais, define quem faz qual serviço e ajusta a jornada de trabalho semanal de cada um.",targetSelector:'[data-target="profissionais-section"]',onBefore:async()=>{window.navigateTo("profissionais-section")}},{title:"Tudo Pronto!",icon:"🚀",content:"Você já conhece o caminho! Preencha as informações do seu negócio com calma. Quando terminar, volte à Agenda e partilhe o seu Link de Agendamento com os clientes!",targetSelector:null,onBefore:async()=>{window.navigateTo("agenda-section")}}],a=async()=>{try{await qt(f.establishmentId,{onboardingCompleted:!0}),showNotification("Tour Concluído","Você já pode configurar o seu sistema livremente!","success")}catch(i){console.error("Erro ao gravar fim do onboarding",i)}};new Sr(e,a,a).start()}catch(t){console.error("Erro fatal ao iniciar onboarding:",t)}}var pt;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(pt||(pt={}));class _a extends Error{constructor(e,a,s){super(e),this.message=e,this.code=a,this.data=s}}const $r=t=>{var e,a;return t?.androidBridge?"android":!((a=(e=t?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},Lr=t=>{const e=t.CapacitorCustomPlatform||null,a=t.Capacitor||{},s=a.Plugins=a.Plugins||{},i=()=>e!==null?e.name:$r(t),o=()=>i()!=="web",r=c=>{const p=d.get(c);return!!(p?.platforms.has(i())||n(c))},n=c=>{var p;return(p=a.PluginHeaders)===null||p===void 0?void 0:p.find(m=>m.name===c)},l=c=>t.console.error(c),d=new Map,u=(c,p={})=>{const m=d.get(c);if(m)return console.warn(`Capacitor plugin "${c}" already registered. Cannot register plugins twice.`),m.proxy;const b=i(),x=n(c);let y;const I=async()=>(!y&&b in p?y=typeof p[b]=="function"?y=await p[b]():y=p[b]:e!==null&&!y&&"web"in p&&(y=typeof p.web=="function"?y=await p.web():y=p.web),y),S=(k,O)=>{var _,C;if(x){const M=x?.methods.find(H=>O===H.name);if(M)return M.rtype==="promise"?H=>a.nativePromise(c,O.toString(),H):(H,B)=>a.nativeCallback(c,O.toString(),H,B);if(k)return(_=k[O])===null||_===void 0?void 0:_.bind(k)}else{if(k)return(C=k[O])===null||C===void 0?void 0:C.bind(k);throw new _a(`"${c}" plugin is not implemented on ${b}`,pt.Unimplemented)}},L=k=>{let O;const _=(...C)=>{const M=I().then(H=>{const B=S(H,k);if(B){const G=B(...C);return O=G?.remove,G}else throw new _a(`"${c}.${k}()" is not implemented on ${b}`,pt.Unimplemented)});return k==="addListener"&&(M.remove=async()=>O()),M};return _.toString=()=>`${k.toString()}() { [capacitor code] }`,Object.defineProperty(_,"name",{value:k,writable:!1,configurable:!1}),_},q=L("addListener"),N=L("removeListener"),F=(k,O)=>{const _=q({eventName:k},O),C=async()=>{const H=await _;N({eventName:k,callbackId:H},O)},M=new Promise(H=>_.then(()=>H({remove:C})));return M.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await C()},M},D=new Proxy({},{get(k,O){switch(O){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return x?F:q;case"removeListener":return N;default:return L(O)}}});return s[c]=D,d.set(c,{name:c,proxy:D,platforms:new Set([...Object.keys(p),...x?[b]:[]])}),D};return a.convertFileSrc||(a.convertFileSrc=c=>c),a.getPlatform=i,a.handleError=l,a.isNativePlatform=o,a.isPluginAvailable=r,a.registerPlugin=u,a.Exception=_a,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Cr=t=>t.Capacitor=Lr(t),Ce=Cr(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Aa=Ce.registerPlugin;class To{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,a){let s=!1;this.listeners[e]||(this.listeners[e]=[],s=!0),this.listeners[e].push(a);const o=this.windowListeners[e];o&&!o.registered&&this.addWindowListener(o),s&&this.sendRetainedArgumentsForEvent(e);const r=async()=>this.removeListener(e,a);return Promise.resolve({remove:r})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,a,s){const i=this.listeners[e];if(!i){if(s){let o=this.retainedEventArguments[e];o||(o=[]),o.push(a),this.retainedEventArguments[e]=o}return}i.forEach(o=>o(a))}hasListeners(e){var a;return!!(!((a=this.listeners[e])===null||a===void 0)&&a.length)}registerWindowListener(e,a){this.windowListeners[a]={registered:!1,windowEventName:e,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(e="not implemented"){return new Ce.Exception(e,pt.Unimplemented)}unavailable(e="not available"){return new Ce.Exception(e,pt.Unavailable)}async removeListener(e,a){const s=this.listeners[e];if(!s)return;const i=s.indexOf(a);this.listeners[e].splice(i,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const a=this.retainedEventArguments[e];a&&(delete this.retainedEventArguments[e],a.forEach(s=>{this.notifyListeners(e,s)}))}}const Hs=t=>encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Os=t=>t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Dr extends To{async getCookies(){const e=document.cookie,a={};return e.split(";").forEach(s=>{if(s.length<=0)return;let[i,o]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");i=Os(i).trim(),o=Os(o).trim(),a[i]=o}),a}async setCookie(e){try{const a=Hs(e.key),s=Hs(e.value),i=`; expires=${(e.expires||"").replace("expires=","")}`,o=(e.path||"/").replace("path=",""),r=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${a}=${s||""}${i}; path=${o}; ${r};`}catch(a){return Promise.reject(a)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const a of e)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}Aa("CapacitorCookies",{web:()=>new Dr});const Pr=async t=>new Promise((e,a)=>{const s=new FileReader;s.onload=()=>{const i=s.result;e(i.indexOf(",")>=0?i.split(",")[1]:i)},s.onerror=i=>a(i),s.readAsDataURL(t)}),Tr=(t={})=>{const e=Object.keys(t);return Object.keys(t).map(i=>i.toLocaleLowerCase()).reduce((i,o,r)=>(i[o]=t[e[r]],i),{})},Ar=(t,e=!0)=>t?Object.entries(t).reduce((s,i)=>{const[o,r]=i;let n,l;return Array.isArray(r)?(l="",r.forEach(d=>{n=e?encodeURIComponent(d):d,l+=`${o}=${n}&`}),l.slice(0,-1)):(n=e?encodeURIComponent(r):r,l=`${o}=${n}`),`${s}&${l}`},"").substr(1):null,Br=(t,e={})=>{const a=Object.assign({method:t.method||"GET",headers:t.headers},e),i=Tr(t.headers)["content-type"]||"";if(typeof t.data=="string")a.body=t.data;else if(i.includes("application/x-www-form-urlencoded")){const o=new URLSearchParams;for(const[r,n]of Object.entries(t.data||{}))o.set(r,n);a.body=o.toString()}else if(i.includes("multipart/form-data")||t.data instanceof FormData){const o=new FormData;if(t.data instanceof FormData)t.data.forEach((n,l)=>{o.append(l,n)});else for(const n of Object.keys(t.data))o.append(n,t.data[n]);a.body=o;const r=new Headers(a.headers);r.delete("content-type"),a.headers=r}else(i.includes("application/json")||typeof t.data=="object")&&(a.body=JSON.stringify(t.data));return a};class Mr extends To{async request(e){const a=Br(e,e.webFetchExtra),s=Ar(e.params,e.shouldEncodeUrlParams),i=s?`${e.url}?${s}`:e.url,o=await fetch(i,a),r=o.headers.get("content-type")||"";let{responseType:n="text"}=o.ok?e:{};r.includes("application/json")&&(n="json");let l,d;switch(n){case"arraybuffer":case"blob":d=await o.blob(),l=await Pr(d);break;case"json":l=await o.json();break;case"document":case"text":default:l=await o.text()}const u={};return o.headers.forEach((c,p)=>{u[p]=c}),{data:l,headers:u,status:o.status,url:o.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}Aa("CapacitorHttp",{web:()=>new Mr});const ue=Aa("PushNotifications",{}),jr="modulepreload",qr=function(t){return"/"+t},zs={},Fr=function(e,a,s){let i=Promise.resolve();if(a&&a.length>0){let l=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),n=r?.nonce||r?.getAttribute("nonce");i=l(a.map(d=>{if(d=qr(d),d in zs)return;zs[d]=!0;const u=d.endsWith(".css"),c=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${c}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":jr,u||(p.as="script"),p.crossOrigin="",p.href=d,n&&p.setAttribute("nonce",n),document.head.appendChild(p),u)return new Promise((m,b)=>{p.addEventListener("load",m),p.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(r){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=r,window.dispatchEvent(n),!n.defaultPrevented)throw r}return i.then(r=>{for(const n of r||[])n.status==="rejected"&&o(n.reason);return e().catch(o)})},_s=Aa("App",{web:()=>Fr(()=>import("./web-Dm6xcP09.js"),__vite__mapDeps([0,1,2,3,4])).then(t=>new t.AppWeb)}),Nr="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let Vs=!1;async function Rr(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await ue.removeAllListeners(),await ue.addListener("registration",async a=>{Bo(a.value,!0)}),await ue.addListener("pushNotificationReceived",a=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",a)}),await ue.addListener("pushNotificationActionPerformed",a=>{const s=a.notification.data;console.log("Notificação clicada (Ação):",s)});let e=await ue.checkPermissions();e.receive==="prompt"&&(e=await ue.requestPermissions()),e.receive==="granted"&&await ue.register()}catch(e){console.error("[Push Nativo] Erro:",e)}return}"Notification"in window&&Notification.permission==="granted"&&Ao()}async function Hr(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await Ao(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(t){return console.error("Erro ao pedir permissão Web:",t),!1}}async function Ao(){if("serviceWorker"in navigator)try{const t=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await t.update();const e=await ar(Ns,{vapidKey:Nr,serviceWorkerRegistration:t});e?(console.log("[Push Web] Token validado."),await Bo(e,!1)):console.warn("[Push Web] Token veio vazio."),Vs||(sr(Ns,a=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",a)}),Vs=!0)}catch(t){console.error("[Push Web] Falha no registo:",t)}else console.warn("Navegador sem suporte a Service Worker.")}async function Bo(t,e){const a=ke.currentUser;if(!a){console.warn("Usuário não logado. Token não salvo.");return}const s=je(he,"users",a.uid);try{const i=await ys(s);if(i.exists()){const r=i.data().fcmTokens||[];if(r.length===1&&r[0]===t){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await jt(s,{fcmTokens:[t],lastLoginAt:new Date().toISOString(),platform:e?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(i){if(i.code==="not-found")try{await Qi(s,{email:a.email,fcmTokens:[t],platform:e?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(o){console.error("Erro ao criar user:",o)}else console.error("Erro ao atualizar token:",i)}}const Mo=({establishmentId:t,startDate:e,endDate:a,cashierSessionId:s})=>{const i=new URLSearchParams({startDate:e,endDate:a});return s&&s!=="all"&&i.append("cashierSessionId",s),t&&i.append("establishmentId",t),A(`/api/reports/sales?${i.toString()}`)},Or=()=>A("/api/reports/summary",{method:"GET"}),Ba=t=>t?String(t).replace(/\D/g,""):"",xt=(t,e="",a=20,s={})=>{const i=new URLSearchParams;return e&&i.append("search",e),a&&i.append("limit",a),s&&s.hasLoyalty&&i.append("hasLoyalty","true"),s&&s.birthMonth&&i.append("birthMonth",s.birthMonth),s&&s.inactiveDays&&i.append("inactiveDays",s.inactiveDays),A(`/api/clients/${t}?${i.toString()}`)},jo=(t,e)=>{const a=encodeURIComponent(e);return A(`/api/clients/details/${t}/${a}`)},qo=t=>{const e=t.phone||t.id;if(!e)throw new Error("Telefone é obrigatório");const a=Ba(e),s={...t,phone:a,id:a};return A(`/api/clients/${a}`,{method:"PUT",body:JSON.stringify(s)})},Fo=qo,ws=(t,e)=>qo({...e,id:t}),zr=(t,e)=>{const a=Ba(e),s=Array.isArray(t)||t instanceof Set?Array.from(t).join(","):t;return A(`/api/clients/full-history/${s}?phone=${a}`)},No=t=>{const e=encodeURIComponent(t);return A(`/api/clients/${e}`,{method:"DELETE"})},Ro=(t,e,a,s)=>A("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:t,clientPhone:Ba(e),points:a,rewardName:s})}),_r=(t,e)=>jo(t,Ba(e)),Ma=t=>A(`/api/financial/natures/${t}`),Vr=t=>A("/api/financial/natures",{method:"POST",body:JSON.stringify(t)}),ks=t=>A(`/api/financial/cost-centers/${t}`),Ur=t=>A("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(t)}),Ho=(t,e)=>A(`/api/financial/${t}`,{method:"POST",body:JSON.stringify(e)}),Oo=(t,e={})=>{let a=`/api/financial/${t}`;const s=new URLSearchParams;e.establishmentId&&s.append("establishmentId",e.establishmentId),e.startDate&&s.append("startDate",e.startDate),e.endDate&&s.append("endDate",e.endDate),e.natureId&&s.append("natureId",e.natureId),e.costCenterId&&s.append("costCenterId",e.costCenterId),e.status&&s.append("status",e.status);const i=s.toString();return i&&(a+=`?${i}`),A(a)},zo=(t,e,a)=>A(`/api/financial/${t}/${e}`,{method:"PUT",body:JSON.stringify(a)}),_o=(t,e)=>A(`/api/financial/${t}/${e}`,{method:"DELETE"}),Vo=(t,e)=>{const a=e.map(s=>A(`/api/financial/${t}/${s}`,{method:"DELETE"}));return Promise.all(a)},Uo=(t,e,a)=>A(`/api/financial/${t}/${e}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),Wo=t=>Ho("payables",t),Is=t=>Oo("payables",t),Wr=(t,e)=>zo("payables",t,e),Jr=t=>_o("payables",t),Gr=(t,e)=>Uo("payables",t,e),Qr=t=>Ho("receivables",t),ja=t=>Oo("receivables",t),Yr=(t,e)=>zo("receivables",t,e),Xr=t=>_o("receivables",t),Zr=(t,e)=>Uo("receivables",t,e);let Va=null;function Ie(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${s}`}async function Kr(){const t=document.getElementById("content");t.innerHTML=`
        <div class="flex items-center justify-center h-full min-h-[60vh] font-sans">
            <div class="flex flex-col items-center">
                <div class="w-12 h-12 border-[3px] border-indigo-50 border-t-indigo-500 rounded-full animate-spin mb-4 shadow-sm"></div>
                <p class="text-slate-500 font-semibold text-sm tracking-wide animate-pulse">Sincronizando dados...</p>
            </div>
        </div>
    `;try{const e=new Date,a=new Date(e.getFullYear(),e.getMonth(),e.getDate()),s=new Date(a);s.setHours(23,59,59,999);const i=new Date(a.getFullYear(),a.getMonth(),1),o=new Date(a.getFullYear(),a.getMonth()+1,0),r=new Date(a);r.setDate(a.getDate()-6);const n=f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId],l=n.join(","),d=n.map(async T=>{const[X,ie]=await Promise.all([Ta(T,i.toISOString(),s.toISOString(),null).catch(()=>[]),xt(T).catch(()=>[])]);return{appts:X,clients:ie}}),u=Promise.all([ja({startDate:Ie(i),endDate:Ie(o),establishmentId:l}).catch(()=>({entries:[]})),Is({startDate:Ie(i),endDate:Ie(o),establishmentId:l}).catch(()=>({entries:[]}))]),[c,[p,m]]=await Promise.all([Promise.all(d),u]);let b=[],x=[];c.forEach(T=>{b=b.concat(T.appts),x=x.concat(T.clients)});const y=p.entries||[],I=m.entries||[],S=Ie(a),L=y.filter(T=>T.status==="paid").reduce((T,X)=>T+X.amount,0),q=I.filter(T=>T.status==="paid").reduce((T,X)=>T+X.amount,0),N=L-q,F=y.filter(T=>T.status==="paid"&&(T.paymentDate===S||!T.paymentDate&&T.dueDate.startsWith(S))).reduce((T,X)=>T+X.amount,0),D=b.filter(T=>{const X=new Date(T.startTime);return X>=a&&X<=s}),k=D.length,O=b.filter(T=>T.status==="completed"),_=O.length>0?L/O.length:0,C=D.filter(T=>new Date(T.startTime).getTime()>=e.getTime()&&T.status!=="completed"&&T.status!=="cancelled").sort((T,X)=>new Date(T.startTime)-new Date(X.startTime)).slice(0,4).map(T=>({client:T.clientName||"Desconhecido",service:T.serviceName||(T.services&&T.services[0]?T.services[0].name:"Serviço"),time:new Date(T.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),prof:(T.professionalName||"").split(" ")[0]||"Profissionais",id:T.id})),M=`${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}`,H=new Map;x.forEach(T=>{T.phone?H.set(T.phone,T):H.set(T.id||Math.random().toString(),T)});const G=Array.from(H.values()).filter(T=>{if(!T.birthDate)return!1;let X,ie;if(T.birthDate.includes("-")){const J=T.birthDate.split("-");J[0].length===4?(X=J[1],ie=J[2]):(ie=J[0],X=J[1])}else if(T.birthDate.includes("/")){const J=T.birthDate.split("/");ie=J[0],X=J[1]}return`${ie}/${X}`===M}).map(T=>{let X="";return T.birthDate&&T.birthDate.includes("-")&&T.birthDate.split("-")[0].length===4&&(X=a.getFullYear()-parseInt(T.birthDate.split("-")[0])),{name:T.name,age:X,phone:T.phone}}),Y={receitaHoje:F,agendamentosHoje:k,receitaMes:L,despesaMes:q,saldoMes:N,ticketMedio:_},Q=n.length>1;en(t,Y,C,G,Q,Ie(r),Ie(a)),await Jo(r,a),an()}catch(e){console.error("Erro ao carregar dashboard:",e),t.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full min-h-[60vh] text-slate-500 font-sans">
                <i class="bi bi-exclamation-triangle text-5xl mb-4 text-rose-400"></i>
                <h3 class="font-bold text-lg text-slate-700">Erro de Sincronização</h3>
                <p class="font-medium text-sm mt-1">Ocorreu um problema ao comunicar com o servidor.</p>
                <button onclick="window.navigateTo('dashboard-section')" class="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm active:scale-95">Tentar Novamente</button>
            </div>
        `}}function en(t,e,a,s,i,o,r){const n=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),l=i?`
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
    `}async function Jo(t,e){const a=document.getElementById("chart-container"),s=document.getElementById("chart-start-date"),i=document.getElementById("chart-end-date");if(a){const o=document.createElement("div");o.id="chart-loading-overlay",o.className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-xl",o.innerHTML='<div class="w-8 h-8 border-[3px] border-indigo-100 border-t-indigo-500 rounded-full animate-spin"></div>',a.appendChild(o)}try{const o=Ie(t),r=Ie(e),n=f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId],l=n.join(","),d=await ja({startDate:o,endDate:r,establishmentId:l}).catch(()=>({entries:[]})),u=n.map(L=>Ta(L,o+"T00:00:00.000Z",r+"T23:59:59.999Z",null).catch(()=>[])),p=(await Promise.all(u)).flat(),m=d.entries||[],b=[],x=[],y=[];let I=new Date(t);I.setHours(0,0,0,0);const S=new Date(e);for(S.setHours(23,59,59,999);I<=S;){const L=Ie(I);b.push(I.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}));const q=m.filter(F=>F.status==="paid"&&(F.paymentDate===L||!F.paymentDate&&F.dueDate.startsWith(L))).reduce((F,D)=>F+D.amount,0),N=p.filter(F=>F.status==="completed"&&F.startTime&&F.startTime.startsWith(L)).length;x.push(q),y.push(N),I.setDate(I.getDate()+1)}tn(b,x,y),s&&(s.value=o),i&&(i.value=r)}catch(o){console.error("Erro ao recarregar grafico:",o)}finally{const o=document.getElementById("chart-loading-overlay");o&&o.remove()}}function tn(t,e,a){const s=document.getElementById("revenueChart");if(!s)return;Va&&Va.destroy();const o=s.getContext("2d").createLinearGradient(0,0,0,240);o.addColorStop(0,"rgba(99, 102, 241, 0.2)"),o.addColorStop(1,"rgba(99, 102, 241, 0.0)"),Va=new Chart(s,{type:"line",data:{labels:t,datasets:[{label:"Receita Real (R$)",data:e,borderColor:"#6366f1",backgroundColor:o,borderWidth:2,pointBackgroundColor:"#ffffff",pointBorderColor:"#6366f1",pointBorderWidth:2,pointRadius:3,pointHoverRadius:5,fill:!0,tension:.3,yAxisID:"y"},{label:"Agendamentos Feitos",data:a,borderColor:"#10b981",backgroundColor:"transparent",borderWidth:2,borderDash:[5,5],pointBackgroundColor:"#10b981",pointBorderColor:"#ffffff",pointBorderWidth:1,pointRadius:3,pointHoverRadius:5,fill:!1,tension:.3,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0,position:"top",align:"end",labels:{usePointStyle:!0,boxWidth:6,boxHeight:6,font:{family:"Nunito, sans-serif",size:10,weight:"bold"},color:"#64748b"}},tooltip:{backgroundColor:"#1e293b",padding:10,cornerRadius:8,titleFont:{size:11,family:"Nunito, sans-serif",weight:"normal"},bodyFont:{size:12,weight:"bold",family:"Nunito, sans-serif"},displayColors:!0,usePointStyle:!0,callbacks:{label:function(r){return r.datasetIndex===0?"Receita: "+new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(r.parsed.y):"Concluídos: "+r.parsed.y}}}},scales:{y:{type:"linear",display:!0,position:"left",beginAtZero:!0,grid:{color:"#f8fafc",drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Nunito, sans-serif",size:9,weight:"600"},maxTicksLimit:6,callback:function(r){return"R$ "+r}}},y1:{type:"linear",display:!0,position:"right",beginAtZero:!0,grid:{drawOnChartArea:!1},border:{display:!1},ticks:{color:"#10b981",font:{family:"Nunito, sans-serif",size:9,weight:"600"},stepSize:1,callback:function(r){if(Math.floor(r)===r)return r}}},x:{grid:{display:!1,drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Nunito, sans-serif",size:9,weight:"600"}}}},interaction:{intersect:!1,mode:"index"}}})}function an(){document.getElementById("content").addEventListener("click",e=>{if(e.target.closest("#btn-update-chart")){const o=document.getElementById("chart-start-date"),r=document.getElementById("chart-end-date");if(o&&r&&o.value&&r.value){const n=new Date(o.value+"T00:00:00"),l=new Date(r.value+"T00:00:00");Jo(n,l)}return}const s=e.target.closest("[data-action]");if(!s)return;switch(s.dataset.action){case"goto-agenda":case"new-appointment":re("agenda-section");break;case"goto-pdv":re("comandas-section");break;case"goto-clients":re("clientes-section");break;case"open-link":const o=`${window.location.origin}/cliente.html?id=${f.establishmentId||""}`;window.open(o,"_blank");break}})}const Je=t=>A(`/api/services/${t}`),sn=t=>A("/api/services",{method:"POST",body:JSON.stringify(t)}),on=(t,e)=>A(`/api/services/${t}`,{method:"PUT",body:JSON.stringify(e)}),Go=t=>A(`/api/services/${t}`,{method:"DELETE"}),qa=(t,e,a,s="all")=>{const i=`/api/blockages/${t}?startDate=${e}&endDate=${a}&professionalId=${s}`;return A(i)},Fa=t=>A("/api/blockages",{method:"POST",body:JSON.stringify(t)}),Ss=t=>A(`/api/blockages/${t}`,{method:"DELETE"}),Qo=t=>A("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:t})});document.getElementById("content");let Us=!1;const ha=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5",light:"#c7d2fe"},{bg:"#d1fae5",border:"#059669",main:"#059669",light:"#a7f3d0"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48",light:"#fecdd3"},{bg:"#fef3c7",border:"#d97706",main:"#d97706",light:"#fde68a"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490",light:"#a5f3fc"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7",light:"#bae6fd"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed",light:"#ddd6fe"},{bg:"#fce7f3",border:"#db2777",main:"#db2777",light:"#fbcfe8"}];let Na=[],es=[],va={},Yo=[],R={currentView:window.innerWidth<768?"list":"week",currentDate:new Date,selectedProfessionalId:"all",showInactiveProfs:!1,isSelectionMode:!1,selectedItems:new Set,loadedEstablishments:[]},V={step:1,data:{id:null,establishmentId:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,originalDate:null,originalTime:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function Xo(t){const e=new Date(t),a=e.getDay(),s=e.getDate()-a+(a===0?-6:1);return e.setDate(s),e.setHours(0,0,0,0),e}function la(t){const e=t||new Date,a=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${a}-${s}-${i}`}function Es(){const t=document.getElementById("profSelectorContainer");if(!t||!f.professionals)return;let e=f.professionals.filter(i=>R.showInactiveProfs||i.status!=="inactive");const s=[...[{id:"all",name:"Todos",photo:null}],...e];t.innerHTML=s.map(i=>{const o=R.selectedProfessionalId===i.id,r=i.name==="Todos"?"T":i.name.charAt(0).toUpperCase(),n=i.id!=="all"?f.professionalColors.get(i.id)||ha[0]:{main:"#adb5bd",light:"#f1f3f5"};return`
            <div class="flex items-center gap-2 px-4 py-1.5 rounded-full whitespace-nowrap cursor-pointer transition-transform active:scale-95 border ${o?"border-transparent shadow-sm":"border-gray-200 bg-white hover:bg-gray-50"}"
                 data-action="select-professional" data-prof-id="${i.id}"
                 style="background-color: ${o?n.light:""}; border-color: ${o?n.main:""}; color: ${o?n.main:"#4b5563"};">
                <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0" 
                     style="background-color: ${n.main}; ${i.photo?`background-image: url('${te(i.photo)}'); background-size: cover; background-position: center;`:""}">
                    ${i.photo?"":r}
                </div>
                <span class="text-sm font-semibold tracking-tight">${te(i.name==="Todos"?"Todos":i.name.split(" ")[0])}</span>
            </div>`}).join("")}function rn(){const t=document.getElementById("calendarStripContainer");if(!t||R.currentView!=="list")return;const e=new Date;e.setHours(0,0,0,0);const a=new Date(R.currentDate);a.setHours(0,0,0,0);let s="";const i=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];for(let o=-7;o<=14;o++){const r=new Date(a);r.setDate(a.getDate()+o),r.setHours(0,0,0,0);const n=r.getTime()===a.getTime(),l=r.getTime()===e.getTime(),d=i[r.getDay()],u=r.getDate(),c=n?"bg-indigo-600 text-white shadow-md":l?"bg-indigo-50 text-indigo-700 border border-indigo-100":"bg-gray-50 text-gray-500 border border-transparent",p=n?"text-white":l?"text-indigo-700":"text-gray-900";s+=`
            <div type="button" class="flex flex-col items-center justify-center min-w-[3.5rem] py-2 rounded-xl ${c} cursor-pointer transition-transform active:scale-90 flex-shrink-0" data-action="select-date" data-date="${r.toISOString()}">
                <span class="text-[0.65rem] uppercase font-bold tracking-wider opacity-80 pointer-events-none">${d}</span>
                <span class="text-lg font-bold ${p} pointer-events-none mt-0.5">${u}</span>
                ${l&&!n?'<div class="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 pointer-events-none"></div>':'<div class="w-1.5 h-1.5 mt-1 opacity-0"></div>'}
            </div>
        `}t.innerHTML=s,t.querySelectorAll('[data-action="select-date"]').forEach(o=>{o.addEventListener("click",()=>{const r=new Date(o.dataset.date);R.currentDate=r,navigator.vibrate&&navigator.vibrate(30),Se()})}),requestAnimationFrame(()=>{const o=t.querySelector(".bg-indigo-600");o&&o.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})})}function te(t){return v(t||"")}function nn(t,e,a,s,i){const o=(t||"").replace(/\D/g,""),r=new Date(i).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),n=new Date(i).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=`Olá, ${e}! Você tem um agendamento de ${a} com ${s} para ${r} às ${n}. Podemos confirmar?`;return`https://wa.me/${o}?text=${encodeURIComponent(l)}`}function ln(t){const e=document.getElementById("agenda-view");if(!e)return;const a=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],s=Xo(R.currentDate),i=new Date;i.setHours(0,0,0,0);let o='<div class="week-container flex gap-2 overflow-x-auto hide-scrollbar px-4" id="weekScroller">';for(let r=0;r<7;r++){const n=new Date(s);n.setDate(s.getDate()+r);const l=n.toDateString()===i.toDateString(),d=t.filter(c=>new Date(c.startTime).toDateString()===n.toDateString()).sort((c,p)=>new Date(c.startTime)-new Date(p.startTime));let u="";d.length===0?u='<div class="week-empty text-xs text-gray-400 text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200"><i class="bi bi-dash-lg block text-lg mb-1 pointer-events-none"></i>Livre</div>':u=d.map(c=>{const m=new Date(c.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),x=new Date(c.endTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),y=f.professionalColors.get(c.professionalId)||{main:"#adb5bd"},I=c.status==="completed",S=R.selectedItems.has(c.id),L=c.coveredByPlan;if(c.type==="blockage")return`<div class="week-event-chip bg-red-50 border-l-4 border-red-500 rounded-md p-2 mb-2 shadow-sm cursor-default">
                        <div class="text-[9px] uppercase font-black text-red-500 mb-0.5"><i class="bi bi-lock-fill"></i> Bloqueio</div>
                        <div class="text-xs font-bold text-red-800">${m} - ${x}</div>
                        <div class="text-xs text-red-900 font-semibold mt-1 leading-tight">${te(c.reason||"Indisponível")}</div>
                        <div class="text-[0.65rem] text-red-600 mt-1"><i class="bi bi-person-badge"></i> ${te(c.professionalName)}</div>
                    </div>`;const q=S?"ring-2 ring-indigo-500 bg-indigo-50":"bg-white",N=R.isSelectionMode?`<div class="absolute top-1 right-1 z-10 pointer-events-none">
                           <input type="checkbox" class="w-4 h-4 accent-indigo-600 pointer-events-none" ${S?"checked":""}>
                       </div>`:"";let F="";return c.status==="completed"?F='<i class="bi bi-check-all text-green-500 ml-1" title="Finalizado"></i>':c.status==="confirmed"?F='<i class="bi bi-hand-thumbs-up-fill text-blue-500 ml-1" title="Confirmado"></i>':F='<i class="bi bi-clock-history text-orange-400 ml-1" title="Aguardando Confirmação"></i>',`<div class="week-event-chip relative shadow-sm border-l-4 rounded-md p-2 mb-2 cursor-pointer transition-transform active:scale-95 ${I?"opacity-60":""} ${q}" style="border-left-color: ${y.main};"
                    data-action="edit-appointment" data-appointment-id="${c.id}">
                    ${N}
                    <div class="text-xs font-bold text-gray-900 pointer-events-none">${m}</div>
                    <div class="text-xs text-gray-800 font-semibold mt-0.5 truncate pr-2 flex items-center pointer-events-none">
                        ${te(c.clientName)} 
                        ${F}
                        ${L?'<i class="bi bi-gem text-indigo-500 ml-1" title="Cliente VIP"></i>':""}
                    </div>
                    <div class="text-[0.65rem] text-gray-500 leading-tight mt-0.5 pointer-events-none">${te(c.serviceName)} <br/> <span class="font-medium text-indigo-600">${te((c.professionalName||"").split(" ")[0])}</span></div>
                </div>`}).join(""),o+=`<div class="week-day-col min-w-[140px] flex-1 flex flex-col pt-2">
            <div class="week-day-header text-center mb-3 pb-2 border-b border-gray-200 ${l?"is-today":""}">
                <div class="text-xs uppercase font-bold text-gray-500 ${l?"text-indigo-600":""}">${l?"Hoje":a[r]}</div>
                <div class="text-xl font-black text-gray-900 ${l?"text-indigo-600":""}">${n.getDate()}</div>
            </div>
            <div class="week-day-events flex-1">${u}</div>
        </div>`}o+="</div>",e.innerHTML=o,requestAnimationFrame(()=>{const r=document.getElementById("weekScroller");if(r&&window.innerWidth<768){const n=r.querySelector(".is-today");n&&n.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}})}function dn(t){const e=document.getElementById("agenda-view");if(!e)return;if(t.sort((s,i)=>new Date(s.startTime)-new Date(i.startTime)),t.length===0){e.innerHTML=`
            <div class="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-300">
                    <i class="bi bi-calendar2-x text-3xl"></i>
                </div>
                <p class="text-gray-800 font-bold text-lg mb-1">Agenda Livre</p>
                <p class="text-gray-500 text-sm">Não há agendamentos para esta data.</p>
            </div>`;return}let a='<div class="list-container px-4 py-2 space-y-4">';t.forEach(s=>{const i=new Date(s.startTime),o=new Date(s.endTime),r=Math.round((o-i)/6e4),n=i.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=o.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=f.professionalColors.get(s.professionalId)||{main:"#adb5bd"},u=s.status==="completed",c=R.selectedItems.has(s.id),p=R.isSelectionMode?`<div class="flex items-center justify-center pr-3 border-r border-gray-100 mr-3 pointer-events-none">
                   <input type="checkbox" class="w-5 h-5 accent-indigo-600 pointer-events-none" ${c?"checked":""}>
               </div>`:"",m=c?"ring-2 ring-indigo-500 bg-indigo-50":"bg-white";if(s.type==="blockage"){a+=`<div class="list-card flex bg-red-50 rounded-2xl p-4 shadow-sm border border-red-200 mb-3 cursor-default">
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
                    <h3 class="font-bold text-red-900 text-sm mt-1.5">${te(s.reason||"Motivo não informado")}</h3>
                    <p class="text-xs text-red-600 mt-1 font-medium"><i class="bi bi-person-badge"></i> ${te(s.professionalName)}</p>
                </div>
            </div>`;return}const b=nn(s.clientPhone,s.clientName,s.serviceName,s.professionalName,s.startTime),x=(s.services||[]).reduce((F,D)=>F+(Number(D.price)||0),0)||Number(s.servicePrice||0),y=s.totalAmount!==void 0?Number(s.totalAmount):x,S=s.coveredByPlan?'<span class="bg-indigo-100 text-indigo-700 text-[9px] px-1.5 py-0.5 rounded border border-indigo-200 font-black uppercase tracking-wider ml-1 flex-shrink-0" title="Coberto pelo Plano VIP"><i class="bi bi-gem mr-0.5"></i> VIP</span>':"";let L="";s.status==="completed"?L='<span class="text-[0.65rem] px-2 py-0.5 rounded border font-bold bg-green-50 text-green-700 border-green-200"><i class="bi bi-check-all"></i> Finalizado</span>':s.status==="confirmed"?L='<span class="text-[0.65rem] px-2 py-0.5 rounded border font-bold bg-blue-50 text-blue-700 border-blue-200"><i class="bi bi-hand-thumbs-up-fill"></i> Confirmado</span>':L='<span class="text-[0.65rem] px-2 py-0.5 rounded border font-bold bg-orange-50 text-orange-700 border-orange-200"><i class="bi bi-clock-history"></i> Aguardando Confirmação</span>';const q=te((s.professionalName||"").split(" ")[0]);let N="";if(R.loadedEstablishments.length>1){const F=R.loadedEstablishments.find(k=>k.id===s.establishmentId),D=F?F.name:"Outra Unidade";N=`<span class="text-[0.6rem] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200 font-bold truncate max-w-[100px]"><i class="bi bi-shop"></i> ${te(D)}</span>`}a+=`<div class="list-card flex rounded-2xl p-3.5 shadow-sm border border-gray-100 ${m} ${u?"opacity-70 bg-gray-50":""}"
            style="border-left: 5px solid ${d.main};">
            
            ${p}
            
            <div class="flex-1 flex min-w-0 cursor-pointer transition-transform active:scale-[0.98]" data-action="edit-appointment" data-appointment-id="${s.id}">
                <div class="flex flex-col items-center justify-center border-r border-gray-100 pr-3.5 min-w-[4.5rem]">
                    <span class="text-lg font-bold text-gray-900 ${u?"line-through text-gray-500":""} pointer-events-none">${n}</span>
                    <span class="text-xs text-gray-500 font-medium pointer-events-none">${r} min</span>
                </div>
                
                <div class="flex-1 pl-3.5 flex flex-col justify-center min-w-0 pointer-events-none">
                    <div class="flex items-center">
                        <h3 class="font-bold text-gray-900 text-[0.95rem] truncate">${te(s.clientName)}</h3>
                        ${S}
                    </div>
                    <p class="text-xs text-gray-600 mt-0.5 truncate">${te(s.serviceName)} <span class="font-bold text-indigo-600 px-1">·</span> ${q}</p>
                    
                    <div class="flex flex-wrap gap-1.5 mt-2.5 items-center">
                        <span class="text-[0.65rem] bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200 font-bold">R$ ${y.toFixed(2).replace(".",",")}</span>
                        ${s.clientPhone?`<span class="text-[0.65rem] bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200 font-bold flex items-center gap-1"><i class="bi bi-telephone-fill opacity-70"></i> ${te(s.clientPhone)}</span>`:""}
                        ${L}
                        ${N}
                    </div>
                </div>
            </div>

            ${!u&&!R.isSelectionMode?`
            <div class="flex flex-col justify-center items-end pl-2 gap-2.5 border-l border-gray-100 ml-2">
                ${s.status!=="confirmed"?`
                <button type="button" class="lc-action-btn w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-transform active:scale-90 shadow-sm border border-blue-100" data-action="confirm-appointment" data-appointment-id="${s.id}" title="Confirmar Manualmente">
                    <i class="bi bi-check-lg text-xl pointer-events-none"></i>
                </button>
                `:""}
                <button type="button" class="lc-action-btn wa w-11 h-11 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-transform active:scale-90 shadow-sm border border-green-100" data-link="${b}" title="WhatsApp">
                    <i class="bi bi-whatsapp text-lg pointer-events-none"></i>
                </button>
                
                ${s.status!=="aguardando_confirmacao"?`
                <button type="button" class="lc-action-btn comanda w-11 h-11 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-transform active:scale-90 shadow-sm border border-indigo-100" data-action="open-comanda" data-appointment-id="${s.id}" title="Comanda">
                    <i class="bi bi-receipt-cutoff text-lg pointer-events-none"></i>
                </button>
                `:""}
            </div>`:""}
        </div>`}),a+="</div>",e.innerHTML=a}function Zo(){const t=f.allEvents.filter(e=>R.selectedProfessionalId==="all"||e.professionalId===R.selectedProfessionalId);R.currentView==="list"?dn(t):ln(t),$s()}function $s(){const t=document.getElementById("batch-delete-container"),e=document.getElementById("agendaFab");t&&(R.isSelectionMode&&R.selectedItems.size>0?(t.innerHTML=`<div class="bg-gray-900 text-white p-3 mx-4 rounded-2xl shadow-xl flex items-center justify-between">
            <span class="font-semibold text-sm flex items-center"><span class="bg-indigo-500 text-white w-6 h-6 flex items-center justify-center rounded-full mr-2 text-xs">${R.selectedItems.size}</span> selecionados</span>
            <button type="button" data-action="batch-delete" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors">
                <i class="bi bi-trash3-fill"></i> Apagar
            </button>
        </div>`,t.style.display="block",e&&(e.style.transform="scale(0)")):(t.style.display="none",e&&(e.style.transform="scale(1)")))}function cn(){const t=document.getElementById("currentMonthYearDisplay");if(t){const a=new Date(R.currentDate).toLocaleDateString("pt-BR",{month:"long",year:"numeric"});t.textContent=a.charAt(0).toUpperCase()+a.slice(1)}if(R.currentView==="list"){rn();const e=document.getElementById("calendarStripContainer");e&&(e.style.display="flex")}else{const e=document.getElementById("calendarStripContainer");e&&(e.style.display="none")}}async function Se(){const t=document.getElementById("agenda-view");if(!t)return;R.selectedItems.clear(),$s(),t.innerHTML='<div class="flex items-center justify-center h-40"><div class="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>',cn();let e,a;if(R.currentView==="list")e=new Date(R.currentDate),e.setHours(0,0,0,0),a=new Date(e),a.setHours(23,59,59,999);else{const s=Xo(R.currentDate);e=new Date(s),a=new Date(s),a.setDate(s.getDate()+6),a.setHours(23,59,59,999)}try{const i=(f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId]).map(async u=>{const[c,p]=await Promise.all([Ta(u,e.toISOString(),a.toISOString(),R.selectedProfessionalId==="all"?null:R.selectedProfessionalId),qa(u,e.toISOString(),a.toISOString(),R.selectedProfessionalId)]);return{appts:c||[],blockages:p||[]}}),o=await Promise.all(i);let r=[],n=[];if(o.forEach(u=>{r=r.concat(u.appts),n=n.concat(u.blockages)}),!document.getElementById("agenda-view"))return;const l=u=>u.map(c=>({...c,type:"appointment",professionalName:c.professionalName||(()=>{const p=f.professionals?.find(m=>m.id===c.professionalId);return p?p.name:"Indefinido"})()})),d=u=>u.map(c=>({...c,type:"blockage",professionalName:c.professionalName||(()=>{const p=f.professionals?.find(m=>m.id===c.professionalId);return p?p.name:"Indefinido"})()}));f.allEvents=[...l(r),...d(n)],Es(),Zo()}catch{document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML=`
                <div class="text-center py-12 text-gray-500">
                    <i class="bi bi-exclamation-triangle text-3xl mb-2"></i>
                    <p class="text-sm font-medium">Erro ao carregar a agenda.</p>
                </div>`)}}async function un(){try{const e=(f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId]).map(async r=>{const[n,l,d]=await Promise.all([Pe(r),Je(r),Be(r)]);return{estId:r,profs:n||[],services:l||[],estDetails:d}}),a=await Promise.all(e),s=new Map,i=new Map;let o=a[0]?.estDetails;R.loadedEstablishments=a.map(r=>({id:r.estId,name:r.estDetails?.nomeFantasia||r.estDetails?.name||`Unidade ${r.estId.substring(0,4)}`})),a.forEach(r=>{r.profs.forEach(n=>s.set(n.id,n)),r.services.forEach(n=>i.set(n.id,n))}),f.professionals=Array.from(s.values()),f.services=Array.from(i.values()),Yo=[],o&&(va=o.loyaltyProgram||{enabled:!1}),f.professionals.forEach((r,n)=>{f.professionalColors.set(r.id,ha[n%ha.length])}),Es()}catch{g("Atenção","Não foi possível carregar os dados da equipe.","error")}}async function pn(t,e){if(!await K("Confirmar Agendamento","Deseja confirmar este agendamento manualmente?"))return;const s=e.innerHTML;e.innerHTML='<div class="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin pointer-events-none"></div>',e.disabled=!0;try{await dr(t,"confirmed"),g("Agendamento confirmado!","success"),Se()}catch(i){console.error("Erro ao confirmar:",i),g("Erro ao confirmar: "+i.message,"error"),e.innerHTML=s,e.disabled=!1}}function Ws(){const t=document.getElementById("estSelectorModal");t&&t.remove();const e=document.createElement("div");e.id="estSelectorModal",e.className="fixed inset-0 z-[11000] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300 px-4 opacity-0";const a=(R.loadedEstablishments||[]).map(i=>`
        <button type="button" class="w-full text-left p-4 bg-white border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 rounded-2xl shadow-sm transition-all flex items-center gap-4 mb-3 est-option-btn active:scale-95" data-est-id="${i.id}">
            <div class="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black shadow-sm pointer-events-none">
                <i class="bi bi-shop text-xl"></i>
            </div>
            <div class="flex-1 pointer-events-none">
                <p class="font-bold text-gray-900 text-base">${te(i.name)}</p>
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>{e.classList.remove("opacity-0");const i=e.querySelector("#estSelectorModalContent");i.classList.remove("scale-95"),i.classList.add("scale-100")});const s=()=>{e.classList.add("opacity-0");const i=e.querySelector("#estSelectorModalContent");i.classList.remove("scale-100"),i.classList.add("scale-95"),setTimeout(()=>e.remove(),300)};document.getElementById("closeEstModalBtn").addEventListener("click",s),e.querySelectorAll(".est-option-btn").forEach(i=>{i.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15);const o=i.dataset.estId;s(),setTimeout(()=>{Et({establishmentId:o},!1)},300)})})}async function Ko(t={}){R.currentDate=t.targetDate?new Date(t.targetDate):R.currentDate||new Date,R.isSelectionMode=!1,R.selectedItems.clear();const e=document.getElementById("content");if(!e)return;e.innerHTML=`
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
                            <button type="button" class="${R.currentView==="list"?"bg-white shadow-sm":"text-gray-500"} rounded-lg px-3 py-1 text-xs font-bold transition-all" data-action="setView" data-view="list">Lista</button>
                            <button type="button" class="${R.currentView==="week"?"bg-white shadow-sm":"text-gray-500"} rounded-lg px-3 py-1 text-xs font-bold transition-all" data-action="setView" data-view="week">Semana</button>
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
        </div>`,document.getElementById("btnTodayHeader").addEventListener("click",()=>{R.currentDate=new Date,navigator.vibrate&&navigator.vibrate(30),Se()}),document.getElementById("btnPrevDate").addEventListener("click",()=>{const s=R.currentView==="week"?7:1;R.currentDate.setDate(R.currentDate.getDate()-s),navigator.vibrate&&navigator.vibrate(20),Se()}),document.getElementById("btnNextDate").addEventListener("click",()=>{const s=R.currentView==="week"?7:1;R.currentDate.setDate(R.currentDate.getDate()+s),navigator.vibrate&&navigator.vibrate(20),Se()});const a=document.querySelectorAll(".agenda-view-toggle button");a.forEach(s=>{s.addEventListener("click",()=>{a.forEach(i=>{i.classList.remove("bg-white","shadow-sm"),i.classList.add("text-gray-500")}),s.classList.add("bg-white","shadow-sm"),s.classList.remove("text-gray-500"),R.currentView=s.dataset.view,navigator.vibrate&&navigator.vibrate(20),Se()})}),document.getElementById("btnWeekDays").addEventListener("click",bn),Us||(document.body.addEventListener("click",async s=>{if(!document.getElementById("agenda-view"))return;const i=s.target.closest('[data-action="confirm-appointment"]');if(i){s.preventDefault(),s.stopPropagation(),navigator.vibrate&&navigator.vibrate(20);const c=i.dataset.appointmentId;if(!c)return;pn(c,i);return}const o=s.target.closest('[data-action="open-comanda"]');if(o){s.preventDefault(),s.stopPropagation(),navigator.vibrate&&navigator.vibrate(20);const c=o.dataset.appointmentId;if(!c)return;const p=f.allEvents.find(x=>x.id===c);if(!p)return;const m=p.status==="completed"?"finalizadas":"em-atendimento",b={selectedAppointmentId:p.id,initialFilter:m};m==="finalizadas"&&p.transaction?.paidAt&&(b.filterDate=typeof p.transaction.paidAt=="object"?new Date(p.transaction.paidAt._seconds*1e3):p.transaction.paidAt),re("comandas-section",b);return}const r=s.target.closest(".lc-action-btn.wa");if(r){s.preventDefault(),s.stopPropagation(),navigator.vibrate&&navigator.vibrate(20),r.dataset.link&&window.open(r.dataset.link,"_blank");return}if(s.target.closest('[data-action="batch-delete"]')){s.preventDefault(),s.stopPropagation();const c=R.selectedItems.size;await K("Apagar Selecionados",`Deseja apagar ${c} registro(s)? Esta ação é irreversível.`)&&(await Promise.all(Array.from(R.selectedItems).map(async m=>{try{await cr(m)}catch{}})),g(`${c} registro(s) apagado(s).`,"success"),R.selectedItems.clear(),R.isSelectionMode=!1,Se());return}const l=s.target.closest('[data-action="select-professional"]');if(l){s.preventDefault(),s.stopPropagation(),navigator.vibrate&&navigator.vibrate(20);const c=l.dataset.profId;R.selectedProfessionalId=R.selectedProfessionalId===c&&c!=="all"?"all":c,Se();return}if(s.target.closest('[data-action="open-new-appointment-modal"]')){if(s.preventDefault(),s.stopPropagation(),navigator.vibrate&&navigator.vibrate(30),R.loadedEstablishments&&R.loadedEstablishments.length>1)Ws();else{const c=R.loadedEstablishments&&R.loadedEstablishments.length===1?R.loadedEstablishments[0].id:f.establishmentId;Et({establishmentId:c},!1)}return}const u=s.target.closest('[data-action="edit-appointment"]');if(u){s.preventDefault(),s.stopPropagation();const c=u.dataset.appointmentId,p=f.allEvents.find(m=>m.id===c);if(R.isSelectionMode){const m=u.closest(".list-card, .week-event-chip");if(!m)return;const b=m.querySelector('input[type="checkbox"]');if(b&&p){const x=!b.checked;b.checked=x,x?R.selectedItems.add(p.id):R.selectedItems.delete(p.id),(m.classList.contains("week-event-chip")||m.classList.contains("list-card"))&&(x?(m.classList.add("ring-2","ring-indigo-500","bg-indigo-50"),m.classList.remove("bg-white")):(m.classList.remove("ring-2","ring-indigo-500","bg-indigo-50"),m.classList.add("bg-white"))),navigator.vibrate&&navigator.vibrate(15),$s()}return}p&&(navigator.vibrate&&navigator.vibrate(20),Et(p));return}}),Us=!0),await un(),await Se(),(t.action==="new-appointment"||t.openNewAppointment)&&setTimeout(()=>{if(R.loadedEstablishments&&R.loadedEstablishments.length>1)Ws();else{const s=R.loadedEstablishments&&R.loadedEstablishments.length===1?R.loadedEstablishments[0].id:f.establishmentId;Et({establishmentId:s},!1)}},500)}function bn(){const t=document.getElementById("optionsSheet");if(t){t.remove();return}const e=document.createElement("div");e.id="optionsSheet",e.className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white rounded-t-3xl z-[10000] shadow-[0_-8px_40px_rgba(0,0,0,0.15)] transition-transform duration-300 translate-y-full";const a=R.isSelectionMode?"bg-red-50 text-red-600":"bg-green-50 text-green-700",s=R.isSelectionMode?"bi-x-circle":"bi-check2-square";e.innerHTML=`
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
                    <i class="bi ${s} text-lg pointer-events-none"></i> ${R.isSelectionMode?"Desativar Modo de Exclusão":"Ativar Seleção Múltipla"}
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
        </div>`;const i=document.createElement("div");i.id="optionsOverlay",i.className="fixed inset-0 bg-black/40 z-[9999] opacity-0 transition-opacity duration-300",document.body.appendChild(i),document.body.appendChild(e),requestAnimationFrame(()=>{e.classList.remove("translate-y-full"),i.classList.remove("opacity-0")});const o=()=>{e.classList.add("translate-y-full"),i.classList.add("opacity-0"),setTimeout(()=>{e.remove(),i.remove()},300)};document.getElementById("closeOptSheet").addEventListener("click",o),i.addEventListener("click",o),document.getElementById("optSelectMode").addEventListener("click",()=>{R.isSelectionMode=!R.isSelectionMode,R.isSelectionMode||R.selectedItems.clear(),o(),Zo()}),document.getElementById("optInactiveToggle").addEventListener("change",r=>{R.showInactiveProfs=r.target.checked,Es()})}function yt(t){t<1||t>4||(V.step=t,Et(null,!0))}function mn(t){return{title:t?"Editar Reserva":"Novo Cliente",content:`
        <div class="p-4 space-y-4 flex-1">
            <div class="space-y-3">
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nome Completo</label>
                    <input type="text" id="apptClientName" placeholder="Ex: João Silva" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 font-semibold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm" value="${te(V.data.clientName)}">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">WhatsApp / Telefone</label>
                    <input type="tel" id="apptClientPhone" placeholder="(00) 00000-0000" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 font-semibold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm" value="${te(V.data.clientPhone)}">
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
        </div>`}}function gn(){return{title:"Serviços",content:`
        <div class="p-4 space-y-4 flex-1 flex flex-col">
            <div class="flex items-center gap-3">
                <div class="relative flex-1">
                    <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none"></i>
                    <input type="search" id="serviceSearchModalInput" placeholder="Buscar serviço..." class="w-full p-3 pl-11 bg-gray-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none">
                </div>
                <label class="flex items-center gap-2 bg-white px-3 py-3 rounded-xl border border-gray-200 cursor-pointer shadow-sm">
                    <input type="checkbox" id="multiServiceToggle" class="w-5 h-5 accent-indigo-600 rounded" ${V.data.selectedServiceIds.length>1?"checked":""}>
                    <span class="text-xs font-bold text-gray-700 uppercase">Múltiplos</span>
                </label>
            </div>
            <div id="apptServicesContainer" class="flex-1 overflow-y-auto grid grid-cols-2 gap-3 content-start pb-4">
                ${Na.map(t=>`<div class="service-card p-3 bg-white rounded-xl border-2 transition-all active:scale-95 ${V.data.selectedServiceIds.includes(t.id)?"border-indigo-500 bg-indigo-50 shadow-md":"border-gray-100 hover:border-gray-200 shadow-sm"} cursor-pointer flex flex-col justify-between gap-2" data-service-id="${t.id}">
                        <div>
                            <p class="font-bold text-[0.85rem] leading-tight text-gray-900 line-clamp-2">${te(t.name)}</p>
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
                <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none"></i>
                <input type="search" id="professionalSearchModalInput" placeholder="Procurar profissional..." class="w-full p-3 pl-11 bg-gray-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 outline-none">
            </div>
            <div id="apptProfessionalContainer" class="flex-1 overflow-y-auto grid grid-cols-3 gap-3 content-start pb-4">
                ${es.map(t=>{const e=V.data.professionalId===t.id,a=f.professionalColors.get(t.id)||ha[0];return`<div class="professional-modal-card p-3 bg-white rounded-2xl border-2 transition-all active:scale-95 ${e?"border-indigo-500 bg-indigo-50 shadow-md":"border-gray-100 hover:border-gray-200 shadow-sm"} cursor-pointer text-center flex flex-col items-center justify-center" data-professional-id="${t.id}">
                        <div class="w-14 h-14 rounded-full flex items-center justify-center font-black text-white text-xl shadow-sm mb-2" style="background-color: ${a.main}; ${t.photo?`background-image: url('${te(t.photo)}'); background-size: cover; background-position: center;`:""}">
                            ${t.photo?"":te(t.name).charAt(0)}
                        </div>
                        <p class="text-[0.75rem] font-bold text-gray-900 w-full truncate">${te(t.name.split(" ")[0])}</p>
                    </div>`}).join("")}
            </div>
        </div>
        <div class="p-4 bg-white border-t border-gray-200 flex gap-3 pb-safe">
            <button type="button" data-action="prev-step" data-current-step="3" class="w-1/3 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl active:bg-gray-200 transition-colors text-sm">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="3" class="w-2/3 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform text-sm">Avançar</button>
        </div>`}}function xn(){const t=V.data.date||la();return{title:"Horário",content:`
        <div class="p-4 space-y-4 flex-1 flex flex-col">
            
            <div class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-lg">${te(V.data.clientName).charAt(0)}</div>
                <div class="flex-1 min-w-0">
                    <p class="font-bold text-sm text-gray-900 truncate">${te(V.data.clientName)}</p>
                    <p class="text-xs font-bold text-gray-500 truncate mt-0.5"><i class="bi bi-person-badge mr-1"></i> ${te(V.data.professionalName)}</p>
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
                <i class="bi bi-check-circle-fill pointer-events-none"></i> ${V.data.id?"Salvar":"Confirmar"}
            </button>
        </div>`}}async function Et(t=null,e=!1){const a=document.getElementById("appointmentModal");e||(V={step:1,data:{id:t?.id||null,establishmentId:t?.establishmentId||null,clientName:t?.clientName||"",clientPhone:t?.clientPhone||"",selectedServiceIds:t?.services?.map(r=>r.id)||[],professionalId:t?.professionalId||null,professionalName:t?.professionalName||"",date:t?.startTime?la(new Date(t.startTime)):la(),time:t?.startTime?new Date(t.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null,originalDate:t?.startTime?la(new Date(t.startTime)):null,originalTime:t?.startTime?new Date(t.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null,redeemedReward:t?.redeemedReward||null,clientHasRewards:t?.hasRewards||!1,clientLoyaltyPoints:0}}),Na=f.services||[],es=(f.professionals||[]).filter(r=>r.status==="active");let s;switch(V.step){case 1:s=mn(t);break;case 2:s=gn();break;case 3:s=fn();break;case 4:s=xn();break}a.className="fixed inset-0 z-[10000] hidden flex items-end md:items-center justify-center bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 opacity-0",a.innerHTML=`
        <div class="absolute inset-0 z-0 cursor-pointer" data-action="close-modal"></div>
        <div id="appointmentModalContent" class="relative z-10 w-full h-full md:h-auto md:max-h-[85vh] md:w-[550px] md:rounded-2xl bg-gray-50 flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-8 md:scale-95 shadow-2xl overflow-hidden">
            <header class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between pt-safe-top md:pt-4 shadow-sm z-20">
                <button type="button" data-action="close-modal" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 active:scale-90 transition-all">
                    <i class="bi bi-x-lg text-sm pointer-events-none"></i>
                </button>
                <div class="text-center flex-1 px-2">
                    <h2 class="text-sm font-black text-gray-900 tracking-tight leading-tight truncate">${s.title}</h2>
                    <div class="flex items-center justify-center gap-1 mt-1">
                        <div class="w-2 h-2 rounded-full ${V.step>=1?"bg-indigo-600":"bg-gray-200"}"></div>
                        <div class="w-2 h-2 rounded-full ${V.step>=2?"bg-indigo-600":"bg-gray-200"}"></div>
                        <div class="w-2 h-2 rounded-full ${V.step>=3?"bg-indigo-600":"bg-gray-200"}"></div>
                        <div class="w-2 h-2 rounded-full ${V.step>=4?"bg-indigo-600":"bg-gray-200"}"></div>
                    </div>
                </div>
                <div class="w-10 h-10"></div>
            </header>
            <form id="appointmentForm" class="flex-1 overflow-y-auto flex flex-col bg-gray-50">${s.content}</form>
        </div>
    `;const i=()=>{const r=a.querySelector("#appointmentModalContent");r&&(r.classList.remove("translate-y-0","md:translate-y-0","md:scale-100"),r.classList.add("translate-y-full","md:translate-y-8","md:scale-95")),a.classList.add("opacity-0"),setTimeout(()=>{a.classList.add("hidden")},300)};a.querySelectorAll('[data-action="next-step"]').forEach(r=>r.addEventListener("click",()=>{const n=parseInt(r.dataset.currentStep,10);if(n===1&&(V.data.clientName=a.querySelector("#apptClientName").value.trim(),V.data.clientPhone=a.querySelector("#apptClientPhone").value.trim(),!V.data.clientName))return g("Preencha o nome do cliente.","warning");if(n===2&&V.data.selectedServiceIds.length===0)return g("Selecione um serviço.","warning");if(n===3&&!V.data.professionalId)return g("Escolha um membro da equipe.","warning");yt(n+1)})),a.querySelectorAll('[data-action="prev-step"]').forEach(r=>r.addEventListener("click",()=>yt(parseInt(r.dataset.currentStep,10)-1))),a.querySelectorAll('[data-action="close-modal"]').forEach(r=>{r.addEventListener("click",i)}),a.classList.remove("hidden"),a.offsetWidth,a.classList.remove("opacity-0");const o=a.querySelector("#appointmentModalContent");o&&(o.classList.remove("translate-y-full","md:translate-y-8","md:scale-95"),o.classList.add("translate-y-0","md:translate-y-0","md:scale-100")),V.step===2&&a.querySelectorAll(".service-card").forEach(r=>r.addEventListener("click",()=>{const n=a.querySelector("#multiServiceToggle")?.checked,l=r.classList.contains("bg-indigo-50"),d=r.dataset.serviceId;navigator.vibrate&&navigator.vibrate(15),n?l?(r.classList.remove("border-indigo-500","bg-indigo-50","shadow-md"),r.classList.add("border-gray-100","shadow-sm"),V.data.selectedServiceIds=V.data.selectedServiceIds.filter(u=>u!==d)):(r.classList.add("border-indigo-500","bg-indigo-50","shadow-md"),r.classList.remove("border-gray-100","shadow-sm"),V.data.selectedServiceIds.includes(d)||V.data.selectedServiceIds.push(d)):(a.querySelectorAll(".service-card.bg-indigo-50").forEach(u=>{u.classList.remove("border-indigo-500","bg-indigo-50","shadow-md"),u.classList.add("border-gray-100","shadow-sm")}),r.classList.add("border-indigo-500","bg-indigo-50","shadow-md"),r.classList.remove("border-gray-100","shadow-sm"),V.data.selectedServiceIds=[d],setTimeout(()=>yt(3),250))})),V.step===3&&a.querySelectorAll(".professional-modal-card").forEach(r=>r.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15),a.querySelectorAll(".professional-modal-card.bg-indigo-50").forEach(l=>{l.classList.remove("border-indigo-500","bg-indigo-50","shadow-md"),l.classList.add("border-gray-100","shadow-sm")}),r.classList.add("border-indigo-500","bg-indigo-50","shadow-md"),r.classList.remove("border-gray-100","shadow-sm"),V.data.professionalId=r.dataset.professionalId;const n=es.find(l=>l.id===r.dataset.professionalId);V.data.professionalName=n?n.name:"",setTimeout(()=>yt(4),250)})),V.step===1&&a.querySelector("#clientSearchInput")?.addEventListener("input",r=>yn(r.target.value)),V.step===4&&(a.querySelector("#apptDate")?.addEventListener("change",Js),a.querySelector("#availableTimesContainer")?.addEventListener("click",r=>{const n=r.target.closest("button[data-time-slot]");n&&(navigator.vibrate&&navigator.vibrate(10),a.querySelectorAll("#availableTimesContainer button").forEach(l=>{l.classList.remove("bg-indigo-600","text-white","border-indigo-600","shadow-md"),l.classList.add("bg-white","text-gray-700","border-gray-200","shadow-sm")}),n.classList.add("bg-indigo-600","text-white","border-indigo-600","shadow-md"),n.classList.remove("bg-white","text-gray-700","border-gray-200","shadow-sm"),V.data.time=n.dataset.timeSlot)}),a.querySelector("#btnSubmitAppointment")?.addEventListener("click",hn),Js(),vn())}async function hn(t){t.preventDefault();const e=document.getElementById("btnSubmitAppointment");if(!V.data.time||!V.data.selectedServiceIds.length||!V.data.professionalId)return g("Selecione horário, serviço e profissional.","warning");e.disabled=!0,e.innerHTML='<i class="bi bi-hourglass-split pointer-events-none"></i> Processando...';const a=V.data.selectedServiceIds.map(u=>{const c=Na.find(p=>p.id===u);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[s,i]=V.data.time.split(":"),o=new Date(`${V.data.date}T${s}:${i}:00`),r=a.reduce((u,c)=>u+(c.duration+(c.bufferTime||0)),0),n=new Date(o.getTime()+r*6e4),d={establishmentId:V.data.establishmentId||(f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments[0]:f.establishmentId),clientName:V.data.clientName,clientPhone:V.data.clientPhone,services:a,professionalId:V.data.professionalId,professionalName:V.data.professionalName,startTime:o.toISOString(),endTime:n.toISOString(),redeemedReward:V.data.redeemedReward};V.data.id&&(d.id=V.data.id);try{V.data.id?await lr(V.data.id,d):await nr(d),g("Registro salvo!","success");const u=document.getElementById("appointmentModal"),c=u.querySelector("#appointmentModalContent");c&&(c.classList.remove("translate-y-0","md:translate-y-0","md:scale-100"),c.classList.add("translate-y-full","md:translate-y-8","md:scale-95")),u.classList.add("opacity-0"),setTimeout(()=>{u.classList.add("hidden")},300),Se()}catch(u){g(u.message,"error"),e.disabled=!1,e.innerHTML=`<i class="bi bi-check-circle-fill pointer-events-none"></i> ${V.data.id?"Salvar Edição":"Confirmar"}`}}async function Js(){const t=document.getElementById("availableTimesContainer"),e=document.getElementById("apptTotalDuration");if(!t)return;const a=document.getElementById("apptDate");a&&a.value&&(V.data.date=a.value);const s=V.data.selectedServiceIds.reduce((u,c)=>{const p=Na.find(m=>m.id===c);return u+(p?p.duration+(p.bufferTime||0):0)},0);e&&(e.innerHTML=`<strong>${s}</strong> min`);const{professionalId:i,selectedServiceIds:o,date:r,originalDate:n,originalTime:l,id:d}=V.data;if(!i||!o.length||!r){t.innerHTML='<p class="col-span-full text-center text-xs text-gray-500 font-bold py-4 bg-white rounded-xl shadow-sm border border-gray-100">Preencha os passos anteriores.</p>';return}t.innerHTML='<div class="col-span-full flex justify-center py-4"><div class="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>';try{const u=V.data.establishmentId||(f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments[0]:f.establishmentId);let c=await rr({establishmentId:u,professionalId:i,serviceIds:o,date:r});const p=new Date;if(new Date(r+"T00:00:00").toDateString()===p.toDateString()){const m=p.getHours()*60+p.getMinutes();c=c.filter(b=>{const[x,y]=b.split(":").map(Number);return x*60+y>=m})}d&&r===n&&l&&(c.includes(l)||(c.push(l),c.sort())),t.innerHTML=c.length>0?c.map(m=>{const b=V.data.time===m;return`<button type="button" data-time-slot="${m}" class="py-3 text-sm font-bold rounded-xl border-2 transition-transform active:scale-95 ${b?"bg-indigo-600 text-white border-indigo-600 shadow-md":"bg-white text-gray-700 border-gray-200 hover:border-indigo-300 shadow-sm"}">${m}</button>`}).join(""):'<p class="col-span-full text-center text-sm font-bold text-red-500 bg-white py-4 rounded-xl border border-red-100 shadow-sm">Nenhum horário livre.</p>'}catch{t.innerHTML='<p class="col-span-full text-center text-sm font-bold text-red-500 bg-white py-4 rounded-xl">Erro ao pesquisar.</p>'}}function vn(){const t=document.getElementById("loyaltyRewardsContainer");if(!t)return;const{clientHasRewards:e,clientLoyaltyPoints:a}=V.data,{enabled:s,rewards:i}=va;if(!s||!e||!i?.length){t.innerHTML="";return}const o=i.filter(r=>a>=r.points);if(!o.length){t.innerHTML='<p class="text-xs font-bold text-gray-400 mt-3 text-center">Nenhuma recompensa atingida ainda.</p>';return}t.innerHTML=`<div class="border border-indigo-100 bg-indigo-50/80 rounded-xl p-3 mt-3 shadow-sm">
        <p class="text-[0.7rem] font-bold text-indigo-800 uppercase tracking-wider mb-2">Recompensas (${a} pts)</p>
        ${o.map(r=>`<label class="flex items-center gap-2 p-2 bg-white border border-indigo-100 rounded-lg mb-1.5 cursor-pointer shadow-sm active:scale-95 transition-transform"><input type="radio" name="loyaltyReward" value="${te(r.reward)}" data-points="${r.points}" class="w-4 h-4 accent-indigo-600"><span class="text-[0.85rem] font-bold text-gray-800 flex-1">${te(r.reward)}</span><span class="text-[0.65rem] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">-${r.points} pts</span></label>`).join("")}
    </div>`,t.querySelectorAll('input[name="loyaltyReward"]').forEach(r=>{r.addEventListener("change",n=>{n.target.checked&&(V.data.redeemedReward={reward:n.target.value,points:parseInt(n.target.dataset.points,10)})})})}async function yn(t){const e=document.getElementById("clientSearchResults");if(!e||t.trim().length<3){e&&(e.innerHTML='<p class="text-sm text-gray-400 font-medium px-2 py-2 text-center">Digite 3 ou mais caracteres...</p>');return}e.innerHTML='<div class="text-center py-4"><div class="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div></div>';try{const s=(f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId]).map(n=>xt(n,t.trim())),i=await Promise.all(s),o=new Map;i.forEach(n=>{n.forEach(l=>{l.phone?o.set(l.phone,l):o.set(l.id||Math.random().toString(),l)})});const r=Array.from(o.values());if(Yo=r,!r.length){e.innerHTML='<p class="text-sm text-gray-500 bg-white border border-gray-200 p-3 rounded-xl text-center font-bold shadow-sm">Nenhum cliente encontrado.</p>';return}e.innerHTML=r.map(n=>`<div class="client-card p-3 bg-white rounded-xl border-2 transition-all active:scale-95 ${V.data.clientName===n.name&&V.data.clientPhone===n.phone?"border-indigo-500 bg-indigo-50 shadow-md":"border-gray-100 hover:border-gray-200 shadow-sm"} cursor-pointer flex items-center gap-3" data-client-name="${te(n.name)}" data-client-phone="${te(n.phone)}" data-loyalty-points="${n.loyaltyPoints||0}">
                <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-black text-gray-500 flex-shrink-0">${te(n.name).charAt(0)}</div>
                <div class="flex-1 min-w-0"><p class="text-sm font-bold text-gray-900 truncate">${te(n.name)}</p><p class="text-[0.75rem] font-semibold text-gray-500 truncate mt-0.5">${te(n.phone)}</p></div>
            </div>`).join(""),e.querySelectorAll(".client-card").forEach(n=>{n.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15),V.data.clientName=n.dataset.clientName,V.data.clientPhone=n.dataset.clientPhone,V.data.clientLoyaltyPoints=parseInt(n.dataset.loyaltyPoints||"0",10);const l=Math.min(...(va?.rewards||[]).map(d=>d.points));V.data.clientHasRewards=va.enabled&&l!==1/0&&V.data.clientLoyaltyPoints>=l,document.getElementById("apptClientName").value=n.dataset.clientName,document.getElementById("apptClientPhone").value=n.dataset.clientPhone,e.querySelectorAll(".client-card").forEach(d=>{d.classList.remove("border-indigo-500","bg-indigo-50","shadow-md"),d.classList.add("border-gray-100","shadow-sm")}),n.classList.add("border-indigo-500","bg-indigo-50","shadow-md"),n.classList.remove("border-gray-100","shadow-sm"),setTimeout(()=>yt(2),250)})})}catch{e.innerHTML='<p class="text-[0.75rem] font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 text-center shadow-sm">Erro ao pesquisar.</p>'}}const ya=(t,e=null,a=1,s=12)=>{let i=`/api/comandas/${t}?page=${a}&limit=${s}`;return e&&(typeof e=="object"?(e.startDate&&(i+=`&startDate=${e.startDate}`),e.endDate&&(i+=`&endDate=${e.endDate}`)):typeof e=="string"&&(i+=`&date=${e}`)),A(i)},wn=t=>A(`/api/comandas/${t}`),ei=(t,e)=>A(`/api/appointments/${t}/comanda`,{method:"POST",body:JSON.stringify({items:e})}),kn=t=>A(`/api/appointments/${t}/start-service`,{method:"POST"}),In=Object.freeze(Object.defineProperty({__proto__:null,getComandaById:wn,getComandas:ya,startServiceForAppointment:kn,updateComandaItems:ei},Symbol.toStringTag,{value:"Module"})),ti=t=>A("/api/sales",{method:"POST",body:JSON.stringify(t)}),Sn=(t,e)=>A(`/api/sales/${t}?date=${e}`),ts=(t,e,a)=>{const s=`/api/sales/${t}?startDate=${e}&endDate=${a}`;return A(s)},En=t=>A(`/api/sales/${t}/reopen`,{method:"POST"}),ai=t=>A(`/api/sales/${t}`,{method:"DELETE"}),$n=Object.freeze(Object.defineProperty({__proto__:null,createSale:ti,deleteSale:ai,getSales:Sn,getSalesByDateRange:ts,reopenSale:En},Symbol.toStringTag,{value:"Module"})),Rt=t=>A(`/api/products/${t}`),Ln=t=>A("/api/products",{method:"POST",body:JSON.stringify(t)}),Cn=(t,e)=>A(`/api/products/${t}`,{method:"PUT",body:JSON.stringify(e)}),si=t=>A(`/api/products/${t}`,{method:"DELETE"}),Ls=(t,e)=>A(`/api/products/${t}/stock`,{method:"PATCH",body:JSON.stringify(e)}),Dn=({startDate:t,endDate:e,productId:a,categoryId:s,establishmentId:i})=>{const o=new URLSearchParams({startDate:t,endDate:e});return a&&a!=="all"&&o.append("productId",a),s&&s!=="all"&&o.append("categoryId",s),i&&o.append("establishmentId",i),A(`/api/products/stock-history/report?${o.toString()}`)},Pn=()=>A("/api/cashier/status").catch(t=>{if(t.message.includes("404")||t.message.includes("não encontrada"))return null;throw t}),Tn=t=>{const e={establishmentId:t.establishmentId,initialAmount:Number(t.initialAmount),notes:t.notes||""};return console.log("Payload enviado para abrir caixa:",e),A("/api/cashier/open",{method:"POST",body:JSON.stringify(e)})},An=(t,e)=>{const a={finalAmount:Number(e)};return console.log("Payload enviado para fechar caixa:",a),A(`/api/cashier/close/${t}`,{method:"PUT",body:JSON.stringify(a)})},Bn=()=>A("/api/cashier/history").then(t=>t||[]).catch(t=>(console.error("Erro ao buscar histórico:",t),[])),Mn=t=>A(`/api/cashier/report/${t}`),Cs=t=>A(`/api/packages/${t}`),jn=t=>A("/api/packages",{method:"POST",body:JSON.stringify(t)}),qn=(t,e)=>A(`/api/packages/${t}`,{method:"PUT",body:JSON.stringify(e)}),Gs=t=>A(`/api/packages/${t}`,{method:"DELETE"});let h={allComandas:[],catalog:{services:[],products:[],packages:[]},activeFilter:"abertas",selectedComandaId:null,viewMode:"items",selectedCatalogItem:null,isCashierOpen:!1,activeCashierSessionId:null,isCashierFromPreviousDay:!1,loyaltySettings:null,establishmentConfig:null,pendingRedemption:null,paging:{page:1,limit:15,total:0},checkoutState:{payments:[],selectedMethod:"dinheiro",installments:1,amountReceived:"",discount:{type:"real",value:0},discountReason:""},isProcessing:!1,showHistoryPanel:!1,filterStartDate:"",filterEndDate:"",filterPreset:"hoje"},Ye=null,tt=null,Qs=null;function oi(t,e){return function(...a){clearTimeout(Qs),Qs=setTimeout(()=>t.apply(this,a),e)}}const xe=t=>{if(!t)return new Date().toISOString().split("T")[0];const e=new Date(t),a=e.getTimezoneOffset()*6e4;return new Date(e-a).toISOString().split("T")[0]};function Ua(t){const e=new Date;let a,s;return t==="hoje"?(a=new Date,s=new Date):t==="este_mes"?(a=new Date(e.getFullYear(),e.getMonth(),1),s=new Date(e.getFullYear(),e.getMonth()+1,0)):t==="mes_passado"?(a=new Date(e.getFullYear(),e.getMonth()-1,1),s=new Date(e.getFullYear(),e.getMonth(),0)):(a=new Date,s=new Date),{start:xe(a),end:xe(s)}}async function Ys(t,e="stay"){if(!t||!t.id)return;t._localUpdatedAt=Date.now(),t._cachedItems=null,t._hasUnsavedChanges=!1,Ht(),e==="checkout"&&(h.viewMode="checkout",h.checkoutState.payments||(h.checkoutState.payments=[]),h.checkoutState.selectedMethod="dinheiro",h.checkoutState.amountReceived="",h.checkoutState.discount.value||(h.checkoutState.discount={type:"real",value:0},h.checkoutState.discountReason=""),se());const a=document.createElement("div");a.id="saving-overlay",a.className="fixed inset-0 bg-gray-900/60 z-[999999] flex items-center justify-center backdrop-blur-sm",a.innerHTML=`
        <div class="bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center animate-fade-in border border-gray-100">
            <div class="loader mb-4"></div>
            <p class="text-gray-800 font-black text-sm uppercase tracking-widest">Sincronizando...</p>
        </div>
    `,document.body.appendChild(a);try{const s=(t.comandaItems||[]).filter(i=>i&&i.id&&String(i.id)!=="undefined"&&String(i.id)!=="null").map(i=>{const o={...i};if(o.id=String(i.id),o.type==="product"){const r=o.id;o.productId||(o.productId=r),o.product_id||(o.product_id=r)}if(o.type==="service"){const r=o.id;o.serviceId||(o.serviceId=r),o.service_id||(o.service_id=r)}return o});t.type==="walk-in"&&String(t.id).startsWith("temp-")||await ei(t.id,s),document.body.contains(a)&&document.body.removeChild(a),e!=="checkout"&&(g("Sucesso","Comanda atualizada e salva!","success"),se())}catch(s){document.body.contains(a)&&document.body.removeChild(a),t._hasUnsavedChanges=!0,se(),g("Erro","Falha ao salvar no servidor: "+s.message,"warning")}}function qe(t){if(!t._cachedItems){let e=[];if(t.status==="completed"){const a=t.comandaItems||t.items||[];e=a.length>0?a:t.services||[]}else{const a=(t.services||[]).map(r=>({...r,_source:"original_service",type:"service"})),s=a.reduce((r,n)=>{const l=String(n.id);return r[l]=(r[l]||0)+1,r},{}),i=[...t.comandaItems||[],...t.items||[]],o=[];i.forEach(r=>{const n=String(r.id);(r.type==="service"||!r.type)&&s[n]>0?s[n]--:o.push({...r,_source:"extra"})}),e=[...a,...o]}return t._cachedItems=e,t._cachedTimestamp=Date.now(),e}return t._cachedItems}function Fn(){const t=document.getElementById("comandas-layout");t&&t.classList.add("mobile-detail-open");const e=document.getElementById("mobile-bottom-nav");e&&(e.style.display="none")}function ot(){const t=document.getElementById("comandas-layout");t&&t.classList.remove("mobile-detail-open");const e=document.getElementById("mobile-bottom-nav");e&&(e.style.display="")}function Nn(){const t=xe(new Date);let e=h.allComandas||[];h.filterPreset==="hoje"?e=e.filter(u=>{const c=xe(u.startTime||u.date||u.createdAt);return u.status!=="completed"&&c<=t||u.status==="completed"&&c===t}):h.filterPreset!=="custom"&&(e=e.filter(u=>xe(u.startTime||u.date||u.createdAt)<=t));const a=e.filter(u=>u.status!=="completed").length,s=e.filter(u=>u.status==="completed"),i=s.reduce((u,c)=>{let p=0;if(c.totalAmount!==void 0&&c.totalAmount!==null)p=Number(c.totalAmount);else{let m=qe(c).reduce((b,x)=>b+Number(x.price||0),0);p=Math.max(0,m-Number(c.planDiscount||0))}return u+p},0),o=s.length>0?i/s.length:0,r=document.getElementById("kpi-abertas"),n=document.getElementById("kpi-pagas"),l=document.getElementById("kpi-vendas"),d=document.getElementById("kpi-ticket");r&&(r.textContent=a),n&&(n.textContent=s.length),l&&(l.textContent=`R$ ${i.toFixed(2).replace(".",",")}`),d&&(d.textContent=`R$ ${o.toFixed(2).replace(".",",")}`)}function zt(){tt.innerHTML=`
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
    `,Ra(),Ds()}function Ds(){document.querySelectorAll(".filter-btn").forEach(e=>{e.classList.remove("bg-indigo-600","text-white","border-indigo-600"),e.classList.add("bg-white","text-gray-600","border-gray-200")});const t=document.querySelector(`[data-filter="${h.activeFilter}"]`);t&&(t.classList.remove("bg-white","text-gray-600","border-gray-200"),t.classList.add("bg-indigo-600","text-white","border-indigo-600"))}function Ra(){const t=document.getElementById("cashier-alert-box"),e=document.getElementById("btn-new-sale");h.isCashierFromPreviousDay?(t&&(t.innerHTML=`
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
        `),e&&(e.classList.add("opacity-50","cursor-not-allowed"),e.disabled=!0)),Rn()}function Rn(){const t=document.getElementById("cashier-controls");t&&(h.isCashierFromPreviousDay?t.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-red-700 bg-red-100 py-1.5 px-3 rounded-xl border border-red-200 uppercase tracking-widest shadow-sm"><i class="bi bi-exclamation-octagon"></i> Bloqueado</span>
            <button data-action="close-cashier" class="py-1.5 px-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 text-[10px] transition shadow-sm uppercase tracking-wider animate-pulse">Fechar Caixa Antigo</button>
        `:h.isCashierOpen?t.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-emerald-700 bg-emerald-100 py-1.5 px-3 rounded-xl border border-emerald-200 uppercase tracking-widest shadow-sm"><i class="bi bi-unlock-fill"></i> Caixa Aberto</span>
            <button data-action="close-cashier" class="py-1.5 px-4 bg-red-50 text-red-700 border border-red-200 font-bold rounded-xl hover:bg-red-100 text-[10px] transition shadow-sm uppercase tracking-wider">Fechar Caixa</button>
        `:t.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-red-700 bg-red-100 py-1.5 px-3 rounded-xl border border-red-200 uppercase tracking-widest shadow-sm"><i class="bi bi-lock-fill"></i> Caixa Fechado</span>
            <button data-action="open-cashier" class="py-1.5 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 text-[10px] shadow-sm transition uppercase tracking-wider">Abrir Caixa</button>
        `)}function Ht(){const t=document.getElementById("comandas-list"),e=document.getElementById("pagination-container");if(!t)return;if((!h.isCashierOpen||h.isCashierFromPreviousDay)&&h.activeFilter==="abertas"){t.innerHTML=`
            <div class="text-center py-12 opacity-60">
                <i class="bi bi-lock text-4xl text-gray-300 mb-3 block"></i>
                <p class="text-sm font-bold text-gray-600 uppercase tracking-widest">Acesso Restrito</p>
                <p class="text-xs text-gray-500 mt-2">Regularize o caixa para ver as vendas pendentes</p>
            </div>
        `,e&&(e.innerHTML="");return}const a=xe(new Date);let s=h.allComandas||[];if(h.filterPreset==="hoje"?s=s.filter(o=>{const r=xe(o.startTime||o.date||o.createdAt);return h.activeFilter==="abertas"?o.status!=="completed"&&r<=a:h.activeFilter==="pagas"?o.status==="completed"&&r===a:o.status!=="completed"&&r<=a||o.status==="completed"&&r===a}):h.filterPreset!=="custom"?s=s.filter(o=>{const r=xe(o.startTime||o.date||o.createdAt);return h.activeFilter==="abertas"?o.status!=="completed"&&r<=a:h.activeFilter==="pagas"?o.status==="completed"&&r<=a:r<=a}):h.activeFilter==="abertas"?s=s.filter(o=>o.status!=="completed"):h.activeFilter==="pagas"&&(s=s.filter(o=>o.status==="completed")),Nn(),s.length===0){t.innerHTML='<p class="text-center text-gray-400 py-12 text-sm font-medium border border-dashed border-gray-200 rounded-2xl mx-2">Nenhuma comanda encontrada.</p>',Xs(e);return}const i=document.createDocumentFragment();s.forEach(o=>{const r=qe(o);let n=0;if(o.status==="completed"&&o.totalAmount!==void 0&&o.totalAmount!==null)n=Number(o.totalAmount);else{const F=r.reduce((D,k)=>D+Number(k.price||0),0);n=Math.max(0,F-Number(o.planDiscount||0))}const d=o.loyaltyRedemption||o.discount&&o.discount.reason&&String(o.discount.reason).toLowerCase().includes("fidelidade")?'<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-5 h-5 ml-1.5 text-xs shadow-sm border border-yellow-200" title="Prémio Resgatado">🎁</span>':"",c=o.coveredByPlan?'<span class="inline-flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-md px-2 py-0.5 text-[9px] font-black border border-indigo-200 uppercase tracking-wider shadow-sm ml-1.5" title="Clube VIP"><i class="bi bi-gem mr-1"></i> VIP</span>':"",p=String(o.id)===String(h.selectedComandaId),m=new Date(o.startTime||o.date||o.createdAt),b=m.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),x=m.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),y=o.type==="walk-in"||typeof o.id=="string"&&o.id.startsWith("temp-"),I=o.status==="completed",S=v(o.clientName||"Cliente sem nome"),L=v(o.professionalName||"Sem profissional");let q="";I?q='<span class="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">Paga</span>':y?q='<span class="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">Avulsa</span>':q='<span class="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">Agenda</span>';const N=document.createElement("div");N.className=`comanda-card cursor-pointer border rounded-2xl p-3.5 hover:bg-gray-50 transition-all shadow-sm mb-2 ${p?"ring-2 ring-indigo-500 bg-indigo-50/50 border-transparent":"bg-white border-gray-200"}`,N.dataset.action="select-comanda",N.dataset.comandaId=o.id,N.innerHTML=`
            <div class="flex justify-between items-start mb-2.5 pointer-events-none">
                <p class="font-bold text-gray-900 truncate flex-1 min-w-0 pr-2 text-base">${S} ${c}</p>
                <div class="flex items-center flex-shrink-0">
                    <p class="font-black ${I?"text-emerald-600":"text-gray-900"} text-base">R$ ${n.toFixed(2)}</p>
                    ${d}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none gap-2">
                <div class="flex items-center gap-2 min-w-0 flex-1">
                    ${q}
                    <p class="text-xs text-gray-500 truncate font-medium"><i class="bi bi-person mr-1 opacity-50"></i>${L}</p>
                </div>
                <p class="text-xs text-gray-500 font-bold flex-shrink-0"><i class="bi bi-calendar-event mr-1 opacity-50"></i>${x} <span class="text-gray-300 mx-1">|</span> ${b}</p> 
            </div>
        `,i.appendChild(N)}),t.innerHTML="",t.appendChild(i),Xs(e)}function Xs(t){if(!t)return;t.innerHTML="";const{page:e,total:a,limit:s}=h.paging,i=Math.ceil((a||0)/s);if(i===0)return;const o=document.createElement("div");o.className="flex gap-2 justify-center items-center w-full py-1",o.innerHTML=`
        <button data-page="${e-1}" class="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-sm font-black text-gray-600 shadow-sm flex items-center justify-center ${e<=1?"opacity-50 cursor-not-allowed":""}" ${e<=1?"disabled":""}>&laquo;</button>
        <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mx-2">Pág ${e} de ${i||1}</span>
        <button data-page="${e+1}" class="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-sm font-black text-gray-600 shadow-sm flex items-center justify-center ${e>=i?"opacity-50 cursor-not-allowed":""}" ${e>=i?"disabled":""}>&raquo;</button>
    `,t.appendChild(o),o.querySelectorAll("button[data-page]").forEach(r=>{r.onclick=n=>{n.stopPropagation();const l=parseInt(r.dataset.page,10);l>0&&l<=i&&(h.paging.page=l,$e())}})}function Hn(t,e){const a=`
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
    `;const s=(o="")=>{const r=o.toLowerCase(),n={service:'<i class="bi bi-scissors text-indigo-600"></i>',product:'<i class="bi bi-box-seam text-emerald-600"></i>',package:'<i class="bi bi-boxes text-purple-600"></i>'},l={"catalog-service-list":{items:h.catalog.services,type:"service"},"catalog-product-list":{items:h.catalog.products,type:"product"},"catalog-package-list":{items:h.catalog.packages,type:"package"}};Object.entries(l).forEach(([d,{items:u,type:c}])=>{const p=e.querySelector("#"+d);if(!p)return;const m=u.filter(b=>b.name.toLowerCase().includes(r)).slice(0,50);p.innerHTML=m.map(b=>b.id?`
                <button data-action="select-catalog-item" data-item-type="${c}" data-item-id="${b.id}" class="flex items-center gap-3 w-full p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 shadow-sm transition-all text-left group active:scale-95">
                    <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg border border-gray-100 group-hover:bg-white">${n[c]}</div>
                    <span class="flex-grow text-sm font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-indigo-700">${v(b.name)}</span>
                    <span class="font-black text-sm text-gray-900 bg-gray-100 px-2.5 py-1.5 rounded-lg border border-gray-200 whitespace-nowrap group-hover:bg-white group-hover:text-indigo-700">R$ ${b.price.toFixed(2)}</span>
                </button>
            `:"").join("")||'<p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center py-6 border border-dashed border-gray-300 rounded-xl">Vazio</p>'})};s();const i=e.querySelector("#item-search-input");i&&i.addEventListener("input",oi(o=>{s(o.target.value)},300))}function On(t,e){const a=h.selectedCatalogItem;if(!a){h.viewMode="add-item",se();return}let s=1;const i=`
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
    `;const o=()=>{e.querySelector("#quantity-display").textContent=s,e.querySelector("#quantity-minus-btn").disabled=s<=1};e.querySelector("#quantity-minus-btn").onclick=()=>{s>1&&(s--,o())},e.querySelector("#quantity-plus-btn").onclick=()=>{s++,o()},e.querySelector("#confirm-add-qty-btn").onclick=async()=>{await ri(a,s),h.viewMode="items",h.selectedCatalogItem=null,se()},o()}function se(){const t=document.getElementById("comanda-detail-container");if(!t)return;const e=h.allComandas.find(S=>String(S.id)===String(h.selectedComandaId));if(h.viewMode==="checkout"&&e){zn(e,t);return}if(h.viewMode==="add-item"&&e){Hn(e,t);return}if(h.viewMode==="add-item-qty"&&e){On(e,t);return}const a=`
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
        `;return}const s=qe(e),i=e.status==="completed",o=e.type==="walk-in"||typeof e.id=="string"&&e.id.startsWith("temp-"),r=s.reduce((S,L)=>{const q=L._source==="original_service",N=L.id||L.name,F=q?`original-${N}`:`${L.type}-${N}`;return S[F]||(S[F]={...L,quantity:0,sources:[]}),S[F].quantity+=1,L._source&&S[F].sources.push(L._source),S},{}),n=Number(e.planDiscount||0),l=Object.values(r).reduce((S,L)=>S+Number(L.price||0)*L.quantity,0),d=Math.max(0,l-n),u=v(e.clientName||"Cliente sem nome"),c=v(e.professionalName||"Profissional não atribuído"),p=e._hasUnsavedChanges,b=e.coveredByPlan?'<span class="mt-2 inline-block px-2 py-1 text-[10px] font-black uppercase tracking-widest text-indigo-700 bg-indigo-100 border border-indigo-200 rounded-md shadow-sm"><i class="bi bi-gem"></i> Clube VIP Aplicado</span>':"",x=i?"":`
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
    `,I=`
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
                    ${b}
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
                ${Object.values(r).map(S=>{const L=S.sources&&S.sources.includes("original_service"),q=h.pendingRedemption&&String(h.pendingRedemption.appliedToItemId)===String(S.id),N=S.isReward||q;return`
                    <div class="flex flex-col bg-white p-4 rounded-2xl border border-gray-200 shadow-sm ${N?"border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200":""}">
                        <div class="flex justify-between items-start w-full">
                            <div class="min-w-0 flex-1 pr-3">
                                <p class="text-base font-bold text-gray-900 line-clamp-2 leading-tight">
                                    ${N?"🎁 ":""}
                                    ${v(S.name)}
                                </p>
                                <div class="flex items-center mt-2 gap-2">
                                    ${L?'<span class="text-[9px] font-black uppercase tracking-widest text-indigo-700 bg-indigo-100 px-2 py-1 rounded-md border border-indigo-200">Fixo Agenda</span>':""}
                                    <p class="text-xs text-gray-500 font-bold">${N?'<span class="text-yellow-700 font-black bg-yellow-100 px-2 py-1 rounded-md border border-yellow-200">Resgate</span>':`R$ ${(S.price||0).toFixed(2)} un.`}</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-end gap-3">
                                <span class="font-black text-xl text-gray-900 whitespace-nowrap leading-none">R$ ${(S.price*S.quantity).toFixed(2)}</span>
                                
                                ${i?`<span class="flex items-center justify-center px-4 py-2 bg-gray-100 border border-gray-200 text-gray-700 font-black text-xs uppercase tracking-widest rounded-xl">${S.quantity} Itens</span>`:`
                                    <div class="flex items-center bg-gray-50 rounded-xl border border-gray-200 shadow-inner h-10">
                                        ${L?`<span class="text-[11px] font-black text-gray-500 px-4 uppercase tracking-widest">Qtd: ${S.quantity}</span>`:`<button data-action="decrease-qty" data-item-id="${S.id}" data-item-type="${S.type}" class="w-10 h-full flex items-center justify-center rounded-l-xl bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 border-r border-gray-200 active:scale-95"><i class="bi bi-dash text-xl"></i></button>
                                             <span class="text-sm font-black text-gray-900 w-12 text-center">${S.quantity}</span>
                                             <button data-action="increase-qty" data-item-id="${S.id}" data-item-type="${S.type}" class="w-10 h-full flex items-center justify-center rounded-r-xl bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border-l border-gray-200 active:scale-95"><i class="bi bi-plus text-xl"></i></button>`}
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
        ${I}
    `,!i&&(e.clientId||e.clientName)&&_n(e,t.querySelector("#loyalty-container"))}function zn(t,e){const a=Number(t.planDiscount||0),i=qe(t).reduce((b,x)=>b+Number(x.price||0)*(x.quantity||1),0),o=h.checkoutState,r=o.discount||{type:"real",value:0};let n=0;r.type==="percent"?n=i*r.value/100:n=r.value,n>i&&(n=i);const l=Math.max(0,i-n-a),d=o.payments.reduce((b,x)=>b+x.value,0),u=Math.max(0,l-d);(!o.amountReceived||u>0)&&(o.amountReceived=u.toFixed(2));const c=`
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
                ${o.payments.map((b,x)=>`
                    <div class="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-3">
                             <div class="bg-gray-100 px-4 py-2 rounded-xl border border-gray-200">
                                <span class="font-black text-xs uppercase tracking-widest text-gray-700">${b.method}</span>
                             </div>
                             ${b.installments>1?`<span class="text-[10px] font-black bg-purple-100 text-purple-700 px-2.5 py-1.5 rounded-lg border border-purple-200 shadow-sm">${b.installments}x</span>`:""}
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-black text-xl text-gray-900">R$ ${b.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${x}" class="text-gray-400 hover:text-red-500 hover:bg-red-50 w-10 h-10 rounded-xl flex items-center justify-center transition-colors border border-transparent hover:border-red-200 active:scale-90"><i class="bi bi-trash3 text-lg"></i></button>
                        </div>
                    </div>
                `).join("")}
            </div>

            ${u>.01?`
            <div class="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-3">Selecionar Pagamento</label>
                
                <div class="grid grid-cols-2 gap-3 mb-5">
                    ${["dinheiro","pix","debito","credito","crediario"].map(b=>`
                        <button data-action="select-method" data-method="${b}" class="py-4 px-2 rounded-xl border text-[11px] font-black uppercase tracking-wider transition-colors active:scale-95 ${o.selectedMethod===b?"bg-indigo-600 text-white border-indigo-600 shadow-lg":"bg-gray-50 text-gray-600 border-gray-200 hover:bg-indigo-50 hover:border-indigo-200"}">
                            ${b==="pix"?'<i class="bi bi-qr-code mr-1"></i> ':""}
                            ${b==="dinheiro"?'<i class="bi bi-cash mr-1"></i> ':""}
                            ${b==="debito"||b==="credito"?'<i class="bi bi-credit-card mr-1"></i> ':""}
                            ${b==="crediario"?'<i class="bi bi-journal-text mr-1"></i> ':""}
                            ${b}
                        </button>
                    `).join("")}
                </div>
                
                ${["credito","crediario"].includes(o.selectedMethod)?`
                    <div class="mb-5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Parcelamento</label>
                        <select id="checkout-installments" class="w-full p-3.5 border-2 border-gray-200 rounded-xl text-sm font-black text-gray-700 bg-gray-50 outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                            ${Array.from({length:12},(b,x)=>`<option value="${x+1}" ${o.installments===x+1?"selected":""}>${x+1} Parcela${x>0?"s":""}</option>`).join("")}
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
    `;const m=()=>{const b=h.checkoutState.discount.type,x=h.checkoutState.discount.value;let y=b==="percent"?i*x/100:x;y>i&&(y=i);const I=Math.max(0,i-y-a),S=h.checkoutState.payments.reduce((D,k)=>D+k.value,0),L=Math.max(0,I-S),q=e.querySelector("#checkout-total-display");q&&(q.textContent=`R$ ${I.toFixed(2)}`);const N=e.querySelector("#checkout-status-msg");N&&(L<=.01?N.innerHTML='<p class="text-emerald-500 font-black text-base uppercase tracking-widest"><i class="bi bi-check2-circle text-2xl mr-2 align-middle"></i> Totalmente Pago</p>':N.innerHTML=`<p class="text-red-500 font-bold text-sm uppercase tracking-widest">Faltam: <span id="checkout-remaining-display" class="font-black text-xl text-red-600 ml-1">R$ ${L.toFixed(2)}</span></p>`);const F=e.querySelector("#checkout-amount");F&&L>0&&document.activeElement!==F&&(F.value=L.toFixed(2))};e.querySelector("#discount-value")?.addEventListener("input",b=>{const x=parseFloat(b.target.value)||0;h.checkoutState.discount.value=x,m()}),e.querySelector("#discount-type")?.addEventListener("change",b=>{h.checkoutState.discount.type=b.target.value,m()}),e.querySelector("#discount-reason")?.addEventListener("input",b=>{h.checkoutState.discountReason=b.target.value}),e.querySelector("#checkout-amount")?.addEventListener("input",b=>{h.checkoutState.amountReceived=b.target.value}),e.querySelector("#checkout-installments")?.addEventListener("change",b=>{h.checkoutState.installments=parseInt(b.target.value,10)})}async function _n(t,e){if(!e)return;const a=h.loyaltySettings;if(!a||!a.enabled)return;let s=null;try{if(t.clientId)s=await jo(f.establishmentId,t.clientId);else if(t.clientName){const n=await xt(f.establishmentId,t.clientName,1);n&&n.length>0&&(s=n[0])}}catch(n){console.warn("Erro ao buscar dados de fidelidade",n)}if(!s||s.loyaltyPoints===void 0)return;const i=Number(s.loyaltyPoints)||0,r=(a.tiers||a.rewards||[]).filter(n=>{const l=Number(n.costPoints||n.points||0);return l>0&&i>=l});if(r.length>0){const n=document.createElement("div");n.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-4 shadow-sm flex justify-between items-center animate-fade-in",n.innerHTML=`
            <div class="flex items-center gap-3">
                <div class="bg-white w-10 h-10 rounded-full text-yellow-500 shadow-sm border border-yellow-100 flex items-center justify-center">
                    <i class="bi bi-star-fill text-lg"></i>
                </div>
                <div>
                    <p class="text-xs font-black uppercase tracking-widest text-yellow-800">Prémio Disponível!</p>
                    <p class="text-[11px] text-yellow-700 font-bold mt-0.5">Saldo: ${i} pontos</p>
                </div>
            </div>
        `;const l=document.createElement("button");l.innerHTML="<i class='bi bi-gift mr-1.5'></i> Resgatar",l.className="text-[10px] font-black uppercase tracking-wider bg-yellow-500 text-white px-4 py-2.5 rounded-xl shadow-md hover:bg-yellow-600 transition-colors active:scale-95",l.onclick=()=>Vn(r,t),n.appendChild(l),e.innerHTML="",e.appendChild(n)}}function Vn(t,e){const a=`
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
    `,{modalElement:s,close:i}=Fe({title:"🎁 Resgatar Prémio",contentHTML:a,maxWidth:"max-w-md"});s.addEventListener("click",o=>{const r=o.target.closest('[data-action="select-reward"]');if(r){const n=r.dataset.rewardId,l=t.find(d=>d.id&&d.id==n||(d.name||d.reward)==n);l&&(Un(l,e),i())}})}async function Un(t,e){const a=Number(t.costPoints||t.points||0),s=t.name||t.reward,i=t.type||"money";if(i==="money"){const l=parseFloat(t.discount)||0;if(l<=0){g("Erro","O valor do desconto configurado é inválido.","error");return}h.checkoutState.discount={type:"real",value:l},h.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,h.pendingRedemption={rewardId:t.id||null,name:s,cost:a,type:"money"},g("Sucesso",`Prémio "${s}" resgatado! Desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),se();return}const o=qe(e),r=t.itemId?String(t.itemId):null;if(!r){g("Erro de Configuração",`O prémio "${s}" não tem um item vinculado nas configurações.`,"error");return}const n=o.find(l=>{const d=l.id?String(l.id):null,u=l.serviceId?String(l.serviceId):l.service_id?String(l.service_id):null,c=l.productId?String(l.productId):l.product_id?String(l.product_id):null;return i==="service"?d===r||u===r:i==="product"?d===r||c===r:i==="package"?d===r:!1});if(n){let l=parseFloat(t.discount);(!l||l<=0)&&(l=parseFloat(n.price||0)),h.checkoutState.discount={type:"real",value:l},h.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,h.pendingRedemption={rewardId:t.id||null,name:s,cost:a,type:i,appliedToItemId:n.id},g("Sucesso",`Prémio "${s}" resgatado! Item encontrado e desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),se()}else g("Item Não Encontrado",`Para resgatar o prémio "${s}", o ${i==="service"?"serviço":i==="product"?"produto":"pacote"} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`,"warning")}async function as(t=null){if(!h.isCashierOpen)return g("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");if(h.isCashierFromPreviousDay)return g("Ação Bloqueada","Feche o caixa pendente do dia anterior antes de iniciar novas vendas.","warning");if(!f.professionals||f.professionals.length===0)try{f.professionals=await Pe(f.establishmentId)}catch{return g("Erro","Não foi possível carregar profissionais.","error")}const a=`
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
    `,{modalElement:s}=Fe({title:"Nova Venda Avulsa",contentHTML:a,maxWidth:"max-w-sm"}),i=s.querySelector("#client-search"),o=s.querySelector("#client-suggestions"),r=s.querySelector("#selected-client-id");t&&(r.value=t.id,i.value=`${t.name} (${t.phone||"Sem tel"})`,i.classList.add("bg-emerald-50","border-emerald-300","text-emerald-800")),i.addEventListener("input",oi(async l=>{const d=l.target.value.trim();if(r.value="",i.classList.remove("bg-emerald-50","border-emerald-300","text-emerald-800"),d.length<2){o.classList.add("hidden");return}try{o.innerHTML='<li class="p-4 text-sm text-gray-500 text-center"><div class="loader-small mx-auto"></div></li>',o.classList.remove("hidden");const u=await xt(f.establishmentId,d,10);u.length===0?o.innerHTML='<li class="p-5 text-xs font-bold text-gray-400 text-center uppercase tracking-widest">Nenhum cliente encontrado</li>':o.innerHTML=u.map(c=>`<li data-client-id="${c.id}" data-client-name="${c.name}" data-client-phone="${c.phone}" class="p-4 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors flex flex-col justify-center"><div class="font-bold text-sm text-gray-800">${v(c.name)}</div><div class="text-xs font-medium text-gray-500 mt-1"><i class="bi bi-telephone opacity-50 mr-1.5"></i>${c.phone||"Sem telefone"}</div></li>`).join("")}catch{o.classList.add("hidden")}},400)),o.addEventListener("click",l=>{const d=l.target.closest("li[data-client-id]");d&&(r.value=d.dataset.clientId,r.dataset.name=d.dataset.clientName,r.dataset.phone=d.dataset.clientPhone,i.value=`${d.dataset.clientName}`,i.classList.add("bg-emerald-50","border-emerald-300","text-emerald-800"),o.classList.add("hidden"))}),document.addEventListener("click",l=>{!i.contains(l.target)&&!o.contains(l.target)&&o.classList.add("hidden")}),s.querySelector("#new-sale-form").addEventListener("submit",Zn);const n=s.querySelector('[data-action="new-client-from-sale"]');n&&n.addEventListener("click",l=>{l.preventDefault(),s.style.display="none",Wn()})}function Wn(){Fe({title:"Cadastrar Cliente Rápido",contentHTML:`
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
    `,maxWidth:"max-w-sm"});const e=document.getElementById("comandas_clientRegistrationForm");e&&e.addEventListener("submit",Jn)}async function Jn(t){t.preventDefault();const e=document.getElementById("comandas_clientRegistrationForm");if(!e)return;const a=e.querySelector("#regClientName"),i=e.querySelector("#regClientPhone").value.replace(/\D/g,"");if(!a.value||!i)return g("Erro","Nome e Telefone são obrigatórios.","error");let o=null;try{o=await _r(f.establishmentId,i)}catch{console.log("Cliente não encontrado na base, prosseguindo com criação...")}try{if(o&&o.id)g("Atenção","Cliente já cadastrado.","info"),document.getElementById("genericModal").style.display="none",as(o);else{const r=await Fo({establishmentId:f.establishmentId,name:a.value,phone:i});g("Sucesso","Cliente cadastrado!","success"),document.getElementById("genericModal").style.display="none",as(r)}}catch(r){g("Erro ao cadastrar",r.message,"error")}}async function Gn(){const t=`
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
    `,{modalElement:e}=Fe({title:"Abrir Caixa",contentHTML:t,maxWidth:"max-w-xs"});e.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const s=parseFloat(document.getElementById("initial-amount").value);if(isNaN(s)||s<0)return g("Valor Inválido","Insira um valor válido.","error");try{const i=await Tn({establishmentId:f.establishmentId,initialAmount:parseFloat(s.toFixed(2))});h.isCashierOpen=!0,h.activeCashierSessionId=i.id,h.isCashierFromPreviousDay=!1,document.getElementById("genericModal").style.display="none",g("Sucesso!",`Caixa aberto (R$ ${s.toFixed(2)})`,"success"),Ra(),await $e()}catch(i){g("Erro",`Falha ao abrir caixa: ${i.message}`,"error")}})}async function Qn(){const t=h.activeCashierSessionId;if(t)try{const e=await Mn(t),a=`
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
        `,{modalElement:s}=Fe({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-sm"});s.querySelector("#close-cashier-form").addEventListener("submit",async i=>{i.preventDefault();const o=parseFloat(document.getElementById("final-amount").value);if(isNaN(o)||o<0)return g("Valor Inválido","Insira um valor final válido.","error");try{await An(t,o),h.isCashierOpen=!1,h.activeCashierSessionId=null,h.isCashierFromPreviousDay=!1,document.getElementById("genericModal").style.display="none",Ra(),await $e(),g("Sucesso!","Caixa fechado com sucesso!","success")}catch(r){g("Erro",`Falha ao fechar caixa: ${r.message}`,"error")}})}catch(e){g("Erro",`Falha ao carregar relatório: ${e.message}`,"error")}}async function Yn(t){if(h.activeFilter===t)return;h.activeFilter=t,h.paging.page=1,Ds(),ot(),h.selectedComandaId=null,h.viewMode="items";const e=document.getElementById("comandas-list");e&&(e.innerHTML='<div class="loader mx-auto mt-10"></div>'),Ht()}function ii(t){h.selectedComandaId=String(t),h.viewMode="items",h.pendingRedemption=null,h.checkoutState.discount={type:"real",value:0},h.checkoutState.discountReason="",Ht(),Fn(),se()}async function ri(t,e){const a=h.allComandas.find(o=>String(o.id)===String(h.selectedComandaId));if(!a)return;if(!t.id||String(t.id)==="undefined"){g("Erro","Item sem identificador. Não foi possível adicionar.","error");return}const s=parseFloat(t.price)||0,i=Array(e).fill(0).map(()=>{const o={id:String(t.id),name:t.name,price:s,type:t.type,isReward:t.isReward||!1,pointsCost:t.pointsCost||0};return t.type==="product"?(o.productId=o.id,o.product_id=o.id):t.type==="service"&&(o.serviceId=o.id,o.service_id=o.id),o});a.comandaItems=a.comandaItems||[],a.comandaItems.push(...i),a._cachedItems=null,a._hasUnsavedChanges=!0,se()}async function Zs(t,e){const a=h.allComandas.find(o=>String(o.id)===String(h.selectedComandaId));if(!a)return;let s=!1,i=(a.comandaItems||[]).findIndex(o=>String(o.id)===String(t)&&o.type===e);i>-1&&(a.comandaItems.splice(i,1),s=!0),s&&(a._cachedItems=null,a._hasUnsavedChanges=!0,se())}async function Xn(t){if(h.isProcessing)return;const e=Number(t.planDiscount||0),a=qe(t),s=a.reduce((I,S)=>I+Number(S.price||0)*(S.quantity||1),0),i=h.checkoutState.discount||{type:"real",value:0};let o=i.type==="percent"?s*i.value/100:i.value;o>s&&(o=s);const r=Math.max(0,s-o-e),{payments:n}=h.checkoutState,l=n.reduce((I,S)=>I+S.value,0),d=r-l;if(d>.01){if(!await K("Pagamento Parcial",`O valor de R$ ${d.toFixed(2)} não foi pago. Deseja registrar como DÍVIDA (Fiado) no cadastro do cliente?`))return;n.push({method:"fiado",value:d,installments:1})}h.isProcessing=!0;const u=t.type==="appointment",c=a;let p=0;const m=h.loyaltySettings;m&&m.enabled&&(!t.coveredByPlan||r>0)&&(p=parseInt(m.pointsPerVisit||1,10));const b={...i,reason:h.checkoutState.discountReason||""},x={payments:n,totalAmount:Number(r),items:c,cashierSessionId:h.activeCashierSessionId,loyaltyPointsEarned:p,discount:b,loyaltyRedemption:h.pendingRedemption},y=document.createElement("div");y.className="fixed inset-0 bg-gray-900/60 z-[999999] flex items-center justify-center backdrop-blur-sm",y.innerHTML='<div class="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center"><div class="loader mb-5"></div><p class="text-sm font-black text-gray-800 uppercase tracking-widest mt-2">Processando...</p></div>',document.body.appendChild(y);try{u?await pr(t.id,x):(x.establishmentId=f.establishmentId,x.clientId=t.clientId,x.clientName=t.clientName,x.professionalId=t.professionalId,t.clientPhone&&(x.clientPhone=t.clientPhone),await ti(x));let I="Venda finalizada com sucesso!";p>0&&(I+=` Cliente ganhou ${p} pontos!`),g("Sucesso!",I,"success"),ot(),h.selectedComandaId=null,h.viewMode="items",h.pendingRedemption=null,await $e()}catch(I){g("Erro no Checkout",I.message,"error")}finally{document.body.contains(y)&&document.body.removeChild(y),h.isProcessing=!1}}async function Zn(t){t.preventDefault();const e=document.getElementById("selected-client-id"),a=document.getElementById("new-sale-professional").value,s=e.value,i=document.getElementById("client-search").value,o=e.dataset.phone||"";if(!s)return g("Erro","Selecione um cliente válido.","error");const r=f.professionals.find(l=>l.id===a);if(!r)return g("Erro","Selecione um profissional válido.","error");const n={id:`temp-${Date.now()}`,type:"walk-in",clientId:s,clientName:i.split("(")[0].trim(),clientPhone:o,professionalId:r.id,professionalName:r.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};h.allComandas.unshift(n),h.selectedComandaId=String(n.id),h.viewMode="items",document.getElementById("genericModal").style.display="none",h.activeFilter==="pagas"&&(h.activeFilter="abertas"),Ds(),ii(n.id)}async function $e(){const t=document.getElementById("comandas-list");(!t.hasChildNodes()||t.innerHTML.includes("loader"))&&(t.innerHTML='<div class="loader mx-auto mt-10"></div>');let e=h.filterStartDate,a=h.filterEndDate;if(h.filterPreset==="hoje"){a=xe(new Date);const o=new Date;o.setDate(o.getDate()-45),e=xe(o)}let s;e&&a&&e!==a?s={startDate:e,endDate:a}:s={startDate:e,endDate:a,date:e};try{const i=Pn(),o=ya(f.establishmentId,s,h.paging.page,h.paging.limit),r=Be(f.establishmentId),[n,l,d]=await Promise.all([i,o,r]);if(h.establishmentConfig=d||{},h.isCashierOpen=!!n,h.activeCashierSessionId=n?n.id:null,h.isCashierFromPreviousDay=!1,n&&n.openedAt){const u=xe(n.openedAt),c=xe(new Date);u<c&&(h.isCashierFromPreviousDay=!0)}if(Ra(),d&&d.loyaltyProgram&&(h.loyaltySettings=d.loyaltyProgram),h.allComandas=l.data||l||[],h.paging.total=l.total||h.allComandas.length,h.catalog.services.length===0){const[u,c,p,m]=await Promise.all([Je(f.establishmentId),Rt(f.establishmentId),Cs(f.establishmentId),Pe(f.establishmentId)]);h.catalog={services:u,products:c,packages:p},f.professionals=m}Ht(),se()}catch(i){g("Erro",`Não foi possível carregar os dados: ${i.message}`,"error")}}async function Kn(t={}){tt=document.getElementById("content"),h.selectedComandaId=t.selectedAppointmentId?String(t.selectedAppointmentId):null,h.viewMode="items",h.selectedCatalogItem=null;const e=Ua("hoje");if(h.filterStartDate=e.start,h.filterEndDate=e.end,h.filterPreset="hoje",h.showHistoryPanel=!1,zt(),Ye&&(tt.removeEventListener("click",Ye),tt.removeEventListener("change",Ye)),Ye=async a=>{const s=a.target.closest("[data-action], [data-filter], [data-comanda-id]");if(s){if(s.matches("[data-filter]"))a.preventDefault(),Yn(s.dataset.filter);else if(s.matches("[data-comanda-id]")){if(a.preventDefault(),a.target.closest('[data-action="go-to-appointment"]')){a.stopPropagation();return}ii(s.dataset.comandaId)}else if(s.matches("[data-action]")){a.preventDefault();const i=s.dataset.action,o=String(s.dataset.id||h.selectedComandaId),r=h.allComandas.find(n=>String(n.id)===o);switch(i){case"toggle-history":if(h.showHistoryPanel=!h.showHistoryPanel,h.showHistoryPanel&&h.activeFilter==="abertas"&&(h.activeFilter="todas"),zt(),!h.showHistoryPanel){h.filterPreset="hoje";const _=Ua("hoje");h.filterStartDate=_.start,h.filterEndDate=_.end,await $e()}break;case"set-period":const n=s.dataset.period;if(h.filterPreset=n,n!=="custom"){const _=Ua(n);h.filterStartDate=_.start,h.filterEndDate=_.end,zt(),h.paging.page=1,g("Buscando...",`Período: ${_.start.split("-").reverse().join("/")} a ${_.end.split("-").reverse().join("/")}`,"info"),await $e()}else zt();break;case"apply-custom-dates":const l=document.getElementById("filter-start-date").value,d=document.getElementById("filter-end-date").value;l&&d?(h.filterStartDate=l,h.filterEndDate=d,h.paging.page=1,g("Buscando...","Período personalizado aplicado.","info"),await $e()):g("Atenção","Preencha a data inicial e final.","warning");break;case"back-to-list":ot(),h.selectedComandaId=null,h.selectedCatalogItem=null,document.querySelectorAll(".comanda-card").forEach(_=>_.classList.remove("ring-2","ring-indigo-500","bg-indigo-50/50","border-transparent")),document.querySelectorAll(".comanda-card").forEach(_=>_.classList.add("bg-white","border-gray-200")),se();break;case"new-sale":as();break;case"add-item":if(!h.isCashierOpen)return g("Caixa Fechado","Abra o caixa primeiro.","error");h.viewMode="add-item",se();break;case"back-to-items":h.viewMode="items",se();break;case"back-to-add-item":h.viewMode="add-item",h.selectedCatalogItem=null,se();break;case"select-catalog-item":const{itemType:u,itemId:c}=s.dataset,m=(h.catalog[u+"s"]||[]).find(_=>String(_.id)===String(c));m&&(h.selectedCatalogItem={...m,type:u},h.viewMode="add-item-qty",se());break;case"open-cashier":Gn();break;case"close-cashier":await Qn();break;case"view-sales-report":re("sales-report-section");break;case"go-to-checkout":await Ys(r,"checkout");break;case"save-comanda":await Ys(r,"stay");break;case"select-method":h.checkoutState.selectedMethod=s.dataset.method,h.checkoutState.installments=1,se();break;case"add-payment-checkout":const b=document.getElementById("checkout-amount");let x=parseFloat(b.value);const y=Number(r.planDiscount||0),S=qe(r).reduce((_,C)=>_+(C.price||0),0),L=h.checkoutState.discount||{type:"real",value:0};let q=L.type==="percent"?S*L.value/100:L.value;q>S&&(q=S);const N=Math.max(0,S-q-y),F=h.checkoutState.payments.reduce((_,C)=>_+C.value,0),D=N-F;if(isNaN(x)||x<=0){g("Valor inválido","Insira um valor maior que zero.","error");break}if(x>D+.05){g("Valor inválido","Valor excede o restante.","error");break}const k={method:h.checkoutState.selectedMethod,value:x};["credito","crediario"].includes(h.checkoutState.selectedMethod)&&h.checkoutState.installments>1&&(k.installments=h.checkoutState.installments),h.checkoutState.payments.push(k),h.checkoutState.selectedMethod="dinheiro",h.checkoutState.installments=1,h.checkoutState.amountReceived="",se();break;case"remove-payment-checkout":const O=parseInt(s.dataset.index,10);h.checkoutState.payments.splice(O,1),se();break;case"finalize-checkout":await Xn(r);break;case"increase-qty":{const _=s.dataset.itemId,C=s.dataset.itemType;if(!_||_==="undefined"||_==="null"){g("Erro","Item inválido.","error");return}let H=qe(r).find(G=>String(G.id)===String(_)&&G.type===C);H||(H=(h.catalog[C+"s"]||[]).find(Y=>String(Y.id)===String(_)));const B=H?{id:H.id,name:H.name,price:Number(H.price),type:H.type}:{id:_,name:"Item",price:0,type:C};await ri(B,1);break}case"decrease-qty":await Zs(s.dataset.itemId,s.dataset.itemType);break;case"remove-item":await Zs(s.dataset.itemId,s.dataset.itemType);break;case"reopen-appointment":{if(await K("Reabrir Comanda","Tem certeza? O pagamento será estornado."))try{await ur(o);const C=h.allComandas.findIndex(M=>String(M.id)===o);C!==-1&&(h.allComandas[C].status="confirmed",delete h.allComandas[C].transaction),h.selectedComandaId=null,ot(),await $e(),g("Sucesso!","Comanda reaberta.","success")}catch(C){g("Erro",C.message,"error")}break}case"go-to-appointment":{re("agenda-section",{scrollToAppointmentId:s.dataset.id,targetDate:new Date(s.dataset.date)});break}case"delete-walk-in":{if(await K("Excluir Venda","Confirma a exclusão desta venda avulsa?"))if(o.startsWith("temp-"))h.allComandas=h.allComandas.filter(C=>String(C.id)!==o),h.selectedComandaId=null,Ht(),se(),ot();else try{await ai(o),g("Sucesso","Venda excluída.","success"),h.selectedComandaId=null,ot(),await $e()}catch(C){g("Erro",C.message,"error")}break}}}}},tt.addEventListener("click",Ye),tt.addEventListener("change",Ye),t.initialFilter&&(t.initialFilter==="finalizadas"?h.activeFilter="pagas":h.activeFilter="abertas"),t.selectedAppointmentId&&(h.selectedComandaId=String(t.selectedAppointmentId)),t.filterDate){const a=new Date(t.filterDate).toISOString().split("T")[0];h.filterStartDate=a,h.filterEndDate=a,h.filterPreset="custom",h.showHistoryPanel=!0}await $e()}const ss=new Date,el=new Date(ss.getFullYear(),ss.getMonth(),1);let P={startDate:el.toISOString().split("T")[0],endDate:ss.toISOString().split("T")[0],currentTab:"financeiro",drillDownMonth:null,agendaFilters:{status:null,professional:null,service:null},data:{financeiro:null,agenda:null,clientes:null,vendas:null,estoque:null},charts:{}};const os=document.getElementById("content");let _t=null;function tl(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t&&t.length>0?Array.from(t).map(e=>e.value):[f.establishmentId]}function me(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function Oe(t){if(!t)return"--/--/----";const e=t.split("T")[0].split("-");return e.length===3?`${e[2]}/${e[1]}/${e[0]}`:t}function fe(t){return t?typeof t.toDate=="function"?t.toDate():typeof t=="string"||typeof t=="number"?new Date(t):new Date:new Date(0)}function Ve(t){P.charts[t]&&(P.charts[t].destroy(),P.charts[t]=null)}async function al(){sl(),nl(),await at()}function sl(){os.innerHTML=`
        <section class="h-full flex flex-col p-2 pt-1 md:px-6 md:py-4 w-full bg-slate-50 relative overflow-hidden">
            
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 md:p-4 mb-3 z-20 flex flex-col gap-3 flex-shrink-0 animate-fade-in-down">
                
                <div class="flex flex-col 2xl:flex-row justify-between items-start 2xl:items-center gap-4 w-full">
                    
                    <div class="flex overflow-x-auto custom-scrollbar gap-2 w-full 2xl:w-auto pb-1">
                        <button data-tab="financeiro" class="tab-btn ${P.currentTab==="financeiro"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2">
                            <i class="bi bi-currency-dollar text-base"></i> Financeiro
                        </button>
                        <button data-tab="agenda" class="tab-btn ${P.currentTab==="agenda"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2">
                            <i class="bi bi-calendar3 text-base"></i> Agenda
                        </button>
                        <button data-tab="clientes" class="tab-btn ${P.currentTab==="clientes"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2">
                            <i class="bi bi-people text-base"></i> Clientes
                        </button>
                        <button data-tab="vendas" class="tab-btn ${P.currentTab==="vendas"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2">
                            <i class="bi bi-receipt text-base"></i> Vendas
                        </button>
                        <button data-tab="estoque" class="tab-btn ${P.currentTab==="estoque"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2">
                            <i class="bi bi-box-seam text-base"></i> Estoque
                        </button>
                    </div>

                    <div class="flex flex-wrap items-center gap-2 w-full 2xl:w-auto justify-start 2xl:justify-end">
                        <div class="hidden md:flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                            <button data-action="preset-date" data-preset="month" class="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors bg-white text-indigo-600 shadow-sm border border-slate-200">Este Mês</button>
                            <button data-action="preset-date" data-preset="last_month" class="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors text-slate-500 hover:text-slate-700">Mês Passado</button>
                            <button data-action="preset-date" data-preset="year" class="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors text-slate-500 hover:text-slate-700">Este Ano</button>
                        </div>

                        <div class="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 shadow-inner flex-1 md:flex-none">
                            <input type="date" id="report-start" value="${P.startDate}" class="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer w-full md:w-auto">
                            <span class="text-slate-400 text-[10px] font-bold uppercase">até</span>
                            <input type="date" id="report-end" value="${P.endDate}" class="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer w-full md:w-auto">
                        </div>

                        <button data-action="apply-filters" class="py-2 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 active:scale-95 transition shadow-md flex items-center justify-center gap-2 text-xs uppercase tracking-wider flex-1 md:flex-none" title="Buscar">
                            <i class="bi bi-search text-sm pointer-events-none"></i> <span class="md:hidden">Buscar</span>
                        </button>
                        
                        <button data-action="export-excel" class="py-2 px-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-200 hover:bg-emerald-100 active:scale-95 shadow-sm flex items-center justify-center transition-colors" title="Exportar para Excel">
                            <i class="bi bi-file-earmark-excel text-base pointer-events-none"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div id="tab-content" class="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-2"></div>
        </section>
    `}async function at(){const t=document.getElementById("tab-content");t&&(t.innerHTML='<div class="flex flex-col justify-center items-center h-64"><div class="loader mb-4 border-indigo-500"></div><p class="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Compilando Dados...</p></div>');const{currentTab:e,startDate:a,endDate:s}=P,i=tl(),o=i.join(","),r=new Date(a).toISOString(),n=new Date(s);n.setHours(23,59,59,999);const l=n.toISOString();try{if(e==="financeiro"){const d={startDate:a,endDate:s,establishmentId:o},[u,c,p]=await Promise.all([Is(d).catch(()=>({entries:[]})),ja(d).catch(()=>({entries:[]})),Ma(f.establishmentId).catch(()=>[])]);P.data.financeiro={payables:u.entries||[],receivables:c.entries||[],natures:p||[]},ol()}else if(e==="agenda"){const d=i.map(b=>Ta(b,r,l).catch(()=>[])),u=i.map(b=>ir(b,r,l).catch(()=>[])),[c,p]=await Promise.all([Promise.all(d),Promise.all(u)]),m=new Map;c.flat().forEach(b=>m.set(b.id,b)),p.flat().forEach(b=>{b.status="cancelled",m.set(b.id,b)}),P.data.agenda=Array.from(m.values()),_e()}else if(e==="clientes"){const d=await Promise.all(i.map(c=>xt(c).catch(()=>[]))),u=new Map;d.flat().forEach(c=>u.set(c.id,c)),P.data.clientes=Array.from(u.values()),is()}else if(e==="vendas"){try{let u=(await Promise.all(i.map(b=>Mo({establishmentId:b,startDate:a,endDate:s}).catch(()=>[])))).flatMap(b=>Array.isArray(b)?b:b.transactions||b.data||[]),c=[];$n&&typeof ts=="function"&&(c=(await Promise.all(i.map(x=>ts(x,r,l).catch(()=>[])))).flat());let p=[];if(In&&typeof ya=="function"){const x=(await Promise.all(i.map(S=>ya(S).catch(()=>({data:[]}))))).flatMap(S=>Array.isArray(S)?S:S.data||S.comandas||[]),y=new Date(r),I=new Date(l);p=x.filter(S=>{const L=fe(S.createdAt||S.date||S.timestamp);return L>=y&&L<=I})}const m=new Map;u.forEach(b=>m.set(b.id,b)),c.forEach(b=>m.set(b.id,b)),p.forEach(b=>m.set(b.id,b)),P.data.vendas=Array.from(m.values())}catch(d){console.warn("Aviso ao buscar vendas:",d),P.data.vendas=[]}il()}else if(e==="estoque"){const d=await Promise.all(i.map(c=>Rt(c).catch(()=>[]))),u=new Map;d.flat().forEach(c=>u.set(c.id,c)),P.data.estoque=Array.from(u.values()),rl()}}catch(d){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-red-100 shadow-sm">
                <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <i class="bi bi-exclamation-triangle text-3xl text-red-400"></i>
                </div>
                <h3 class="text-base font-black text-slate-800 mb-1">Erro de Processamento</h3>
                <p class="text-xs text-slate-500 max-w-sm text-center font-medium mb-6">${d.message}</p>
            </div>
        `}}function ol(){const t=document.getElementById("tab-content"),{payables:e,receivables:a,natures:s}=P.data.financeiro,i=new Map(s.map(D=>[D.id,D.name])),o={};a.forEach(D=>{const k=(D.status==="paid"?D.paymentDate:D.dueDate)?.split("T")[0];if(!k)return;o[k]||(o[k]={recReal:0,recPrev:0,despReal:0,despPrev:0,items:[]});const O=Number(D.amount)||0;o[k].items.push({...D,_type:"receita"}),D.status==="paid"?o[k].recReal+=O:o[k].recPrev+=O}),e.forEach(D=>{const k=(D.status==="paid"?D.paymentDate:D.dueDate)?.split("T")[0];if(!k)return;o[k]||(o[k]={recReal:0,recPrev:0,despReal:0,despPrev:0,items:[]});const O=Number(D.amount)||0;o[k].items.push({...D,_type:"despesa"}),D.status==="paid"?o[k].despReal+=O:o[k].despPrev+=O});const r=Object.keys(o).sort(),n=r.map(D=>Oe(D).substring(0,5));let l=0;const d=[],u=[],c=[],p=[],m=[];r.forEach(D=>{const k=o[D];d.push(k.recReal),u.push(k.recPrev),c.push(-Math.abs(k.despReal)),p.push(-Math.abs(k.despPrev)),l+=k.recReal-k.despReal,m.push(l)});const b=d.reduce((D,k)=>D+k,0),x=c.reduce((D,k)=>D+Math.abs(k),0),y=b-x,I=b>0?y/b*100:0,S=y>=0?"bg-emerald-50 border-emerald-200 text-emerald-800":"bg-red-50 border-red-200 text-red-800",L=y>=0?'<i class="bi bi-graph-up-arrow mr-2 text-emerald-500"></i>':'<i class="bi bi-graph-down-arrow mr-2 text-red-500"></i>',q=y>=0?"O fluxo de caixa operacional está positivo neste período.":"Atenção: As despesas superaram as receitas no período selecionado.",N={},F={};a.filter(D=>D.status==="paid").forEach(D=>{const k=D.naturezaId?i.get(D.naturezaId)||"Outros":"Sem Cat.";N[k]=(N[k]||0)+D.amount}),e.filter(D=>D.status==="paid").forEach(D=>{const k=D.naturezaId?i.get(D.naturezaId)||"Outros":"Sem Cat.";F[k]=(F[k]||0)+D.amount}),t.innerHTML=`
        <div class="space-y-4 animate-fade-in">
            
            <div class="flex items-center p-3 rounded-xl border shadow-sm ${S}">
                ${L}
                <span class="text-xs font-bold tracking-wide">${q}</span>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-emerald-300 transition-colors"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-up-circle text-emerald-500 mr-1 text-sm"></i> Receita Realizada</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${me(b)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-red-300 transition-colors"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-down-circle text-red-500 mr-1 text-sm"></i> Despesa Realizada</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${me(x)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-wallet2 text-indigo-500 mr-1 text-sm"></i> Saldo do Período</span><span class="text-xl md:text-2xl font-black ${y>=0?"text-emerald-600":"text-red-600"} mt-1">${me(y)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-amber-300 transition-colors"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-pie-chart text-amber-500 mr-1 text-sm"></i> Margem Real</span><span class="text-xl md:text-2xl font-black ${I>=0?"text-indigo-600":"text-red-600"} mt-1">${I.toFixed(1)}%</span></div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                        <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider"><i class="bi bi-bar-chart-steps text-indigo-500 mr-2"></i> Fluxo de Caixa Dinâmico</h3>
                    </div>
                    
                    <div class="flex flex-wrap gap-2 mb-4 pb-3 border-b border-slate-100">
                        <button class="fin-toggle-btn active bg-emerald-50 text-emerald-700 border-emerald-200" data-dataset="0"><span class="w-2 h-2 rounded-full bg-[#10b981]"></span> Realizada</button>
                        <button class="fin-toggle-btn active bg-emerald-50 text-emerald-700 border-emerald-200 opacity-60" data-dataset="1"><span class="w-2 h-2 rounded-full bg-[#6ee7b7]"></span> Prevista</button>
                        <button class="fin-toggle-btn active bg-red-50 text-red-700 border-red-200" data-dataset="2"><span class="w-2 h-2 rounded-full bg-[#ef4444]"></span> Realizada</button>
                        <button class="fin-toggle-btn active bg-red-50 text-red-700 border-red-200 opacity-60" data-dataset="3"><span class="w-2 h-2 rounded-full bg-[#fca5a5]"></span> Prevista</button>
                        <button class="fin-toggle-btn active bg-indigo-50 text-indigo-700 border-indigo-200 ml-auto" data-dataset="4"><span class="w-3 h-1 bg-[#4f46e5] rounded-full"></span> Saldo</button>
                    </div>

                    <div class="relative flex-1 w-full min-h-[300px]"><canvas id="chartFin"></canvas></div>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-4"><i class="bi bi-card-list text-indigo-500 mr-2"></i> DRE Resumida</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-3">
                        <div class="mb-5">
                            <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest border-b border-emerald-100 pb-2 mb-3">Receitas</p>
                            ${Object.entries(N).sort((D,k)=>k[1]-D[1]).map(([D,k])=>`<div class="flex justify-between items-center mb-2"><span class="text-xs font-medium text-slate-600 truncate mr-2">${D}</span><span class="text-xs font-black text-slate-800">${me(k)}</span></div>`).join("")||'<p class="text-xs font-medium text-slate-400">Sem receitas pagas no período.</p>'}
                        </div>
                        <div>
                            <p class="text-[10px] font-black text-red-500 uppercase tracking-widest border-b border-red-100 pb-2 mb-3">Despesas</p>
                            ${Object.entries(F).sort((D,k)=>k[1]-D[1]).map(([D,k])=>`<div class="flex justify-between items-center mb-2"><span class="text-xs font-medium text-slate-600 truncate mr-2">${D}</span><span class="text-xs font-black text-slate-800">${me(k)}</span></div>`).join("")||'<p class="text-xs font-medium text-slate-400">Sem despesas pagas no período.</p>'}
                        </div>
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{const D=document.getElementById("chartFin");D&&(Ve("fin"),P.charts.fin=new Chart(D,{type:"bar",data:{labels:n.length?n:["-"],datasets:[{label:"Receita Realizada",data:d,backgroundColor:"#10b981",stack:"Stack 0",borderRadius:4,order:2},{label:"Receita Prevista",data:u,backgroundColor:"#6ee7b7",stack:"Stack 0",borderRadius:4,order:2},{label:"Despesa Realizada",data:c,backgroundColor:"#ef4444",stack:"Stack 0",borderRadius:4,order:2},{label:"Despesa Prevista",data:p,backgroundColor:"#fca5a5",stack:"Stack 0",borderRadius:4,order:2},{label:"Saldo Acumulado",data:m,type:"line",borderColor:"#4f46e5",backgroundColor:"rgba(79, 70, 229, 0.1)",fill:!0,tension:.4,borderWidth:3,pointRadius:4,yAxisID:"y1",order:1}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{backgroundColor:"rgba(15, 23, 42, 0.9)",titleFont:{size:13,family:"Inter"},bodyFont:{size:12,family:"Inter"},padding:12,cornerRadius:8,callbacks:{label:function(k){let O=k.dataset.label||"";return O&&(O+=": "),k.parsed.y!==null&&(O+=me(Math.abs(k.parsed.y))),O}}}},scales:{x:{stacked:!0,grid:{display:!1},ticks:{font:{family:"Inter",weight:"bold"}}},y:{stacked:!0,beginAtZero:!0,grid:{borderDash:[4,4],color:"#f1f5f9"},ticks:{font:{size:10,family:"Inter"},callback:k=>me(Math.abs(k))}},y1:{position:"right",beginAtZero:!0,grid:{display:!1},ticks:{font:{size:10,family:"Inter"},callback:k=>me(k)}}}}}),document.querySelectorAll(".fin-toggle-btn").forEach(k=>{k.className="fin-toggle-btn flex items-center gap-2 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm rounded-lg border cursor-pointer",k.onclick=O=>{const _=O.currentTarget,C=parseInt(_.dataset.dataset),M=P.charts.fin;M.isDatasetVisible(C)?(M.hide(C),_.style.opacity="0.4",_.style.filter="grayscale(100%)"):(M.show(C),_.style.opacity="1",_.style.filter="none")}}))},100)}function _e(){const t=document.getElementById("tab-content"),e=P.data.agenda||[],a=e.length,s=e.filter(B=>B.status==="completed"||B.status==="concluida").length,i=e.filter(B=>["confirmed","pending","in-progress"].includes(B.status)).length,o=e.filter(B=>B.status==="no-show").length,r=e.filter(B=>B.status==="cancelled"||B.status==="cancelada").length;let n=e;P.agendaFilters.status&&(P.agendaFilters.status==="concluidas"?n=n.filter(B=>B.status==="completed"||B.status==="concluida"):P.agendaFilters.status==="aguardando"?n=n.filter(B=>["confirmed","pending","in-progress"].includes(B.status)):P.agendaFilters.status==="noshow"?n=n.filter(B=>B.status==="no-show"):P.agendaFilters.status==="canceladas"&&(n=n.filter(B=>B.status==="cancelled"||B.status==="cancelada"))),P.agendaFilters.professional&&(n=n.filter(B=>(B.professionalName||"Sem Profissional")===P.agendaFilters.professional)),P.agendaFilters.service&&(n=n.filter(B=>B.services&&Array.isArray(B.services)&&B.services.length>0?B.services.some(G=>(G.name||G.nome||"Serviço Indefinido")===P.agendaFilters.service):B.serviceName?B.serviceName===P.agendaFilters.service:P.agendaFilters.service==="Outros"));const l=n.length,d=n.filter(B=>B.status==="completed"||B.status==="concluida").length,u=n.filter(B=>B.status==="cancelled"||B.status==="cancelada").length,c=l>0?(d/l*100).toFixed(1):0,p=l>0?(u/l*100).toFixed(1):0,m=n.filter(B=>B.status==="completed"||B.status==="concluida").reduce((B,G)=>B+(Number(G.totalAmount||(G.transaction?G.transaction.totalAmount:0))||0),0),b=p>20?"bg-amber-50 border-amber-200 text-amber-800":"bg-indigo-50 border-indigo-200 text-indigo-800",x=p>20?'<i class="bi bi-exclamation-triangle mr-2 text-amber-500"></i>':'<i class="bi bi-calendar-check mr-2 text-indigo-500"></i>',y=p>20?`Atenção: A taxa de cancelamento está alta (${p}%). Considere enviar lembretes aos clientes.`:`A agenda fluiu bem neste cenário, com ${c}% de aproveitamento.`;let I=[],S=[],L=[];if(P.drillDownMonth!==null){const B=new Date(P.startDate).getFullYear(),G=new Date(B,P.drillDownMonth+1,0).getDate();I=Array.from({length:G},(Y,Q)=>`${Q+1}`),S=I.map(Y=>n.filter(Q=>{const T=fe(Q.startTime||Q.date);return T.getMonth()===P.drillDownMonth&&T.getDate()===parseInt(Y)&&Q.status!=="cancelled"&&Q.status!=="cancelada"}).length),L=I.map(Y=>n.filter(Q=>{const T=fe(Q.startTime||Q.date);return T.getMonth()===P.drillDownMonth&&T.getDate()===parseInt(Y)&&(Q.status==="cancelled"||Q.status==="cancelada")}).length)}else I=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],S=I.map((B,G)=>n.filter(Y=>fe(Y.startTime||Y.date).getMonth()===G&&Y.status!=="cancelled"&&Y.status!=="cancelada").length),L=I.map((B,G)=>n.filter(Y=>fe(Y.startTime||Y.date).getMonth()===G&&(Y.status==="cancelled"||Y.status==="cancelada")).length);const q={},N={};n.forEach(B=>{if((B.status==="cancelled"||B.status==="cancelada")&&P.agendaFilters.status!=="canceladas")return;const G=B.professionalName||"Sem Profissional";q[G]=(q[G]||0)+1,B.services&&Array.isArray(B.services)&&B.services.length>0?B.services.forEach(Y=>{const Q=Y.name||Y.nome||"Serviço Indefinido";N[Q]=(N[Q]||0)+1}):B.serviceName?N[B.serviceName]=(N[B.serviceName]||0)+1:N.Outros=(N.Outros||0)+1});const F=Object.entries(q).sort((B,G)=>G[1]-B[1]).slice(0,5),D=Object.entries(N).sort((B,G)=>G[1]-B[1]).slice(0,5),k=P.agendaFilters.status,O=k?"border-slate-200":"border-slate-800 ring-2 ring-slate-200",_=k==="concluidas"?"border-emerald-500 ring-2 ring-emerald-200":"border-emerald-100",C=k==="aguardando"?"border-amber-500 ring-2 ring-amber-200":"border-amber-100",M=k==="noshow"?"border-red-500 ring-2 ring-red-200":"border-red-100",H=k==="canceladas"?"border-slate-500 ring-2 ring-slate-300":"border-slate-200";t.innerHTML=`
        <div class="space-y-4 animate-fade-in">
            
            ${P.agendaFilters.status||P.agendaFilters.professional||P.agendaFilters.service||P.drillDownMonth!==null?`
                <div class="flex flex-wrap items-center gap-2 mb-4 bg-indigo-50 p-2.5 rounded-xl border border-indigo-100 shadow-sm animate-fade-in-fast">
                    <span class="text-[10px] font-bold text-indigo-800 uppercase tracking-widest ml-2 flex items-center gap-1.5"><i class="bi bi-funnel-fill text-indigo-500"></i> Filtros Ativos:</span>
                    ${P.agendaFilters.status?`<span class="bg-white px-2 py-1 rounded border border-indigo-200 text-[10px] font-black text-indigo-600 shadow-sm">${P.agendaFilters.status.toUpperCase()}</span>`:""}
                    ${P.agendaFilters.professional?`<span class="bg-white px-2 py-1 rounded border border-indigo-200 text-[10px] font-black text-indigo-600 shadow-sm">${P.agendaFilters.professional}</span>`:""}
                    ${P.agendaFilters.service?`<span class="bg-white px-2 py-1 rounded border border-indigo-200 text-[10px] font-black text-indigo-600 shadow-sm">${P.agendaFilters.service}</span>`:""}
                    ${P.drillDownMonth!==null?`<span class="bg-white px-2 py-1 rounded border border-indigo-200 text-[10px] font-black text-indigo-600 shadow-sm">MÊS: ${P.drillDownMonth+1}</span>`:""}
                    <button id="btn-clear-agenda-filters" class="ml-auto text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors shadow-sm active:scale-95"><i class="bi bi-x-lg mr-1"></i> Limpar</button>
                </div>
            `:""}

            <div class="flex items-center p-3 rounded-xl border shadow-sm ${b}">
                ${x}
                <span class="text-xs font-bold tracking-wide">${y}</span>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div data-agenda-filter="todos" class="cursor-pointer transition-transform hover:scale-105 bg-white p-4 rounded-2xl border ${O} shadow-sm">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Agendas</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${a}</span>
                </div>
                <div data-agenda-filter="concluidas" class="cursor-pointer transition-transform hover:scale-105 bg-emerald-50 p-4 rounded-2xl border ${_} shadow-sm">
                    <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">Concluídas</span><span class="text-xl md:text-2xl font-black text-emerald-700 mt-1">${s}</span>
                </div>
                <div data-agenda-filter="aguardando" class="cursor-pointer transition-transform hover:scale-105 bg-amber-50 p-4 rounded-2xl border ${C} shadow-sm">
                    <span class="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">Aguardando</span><span class="text-xl md:text-2xl font-black text-amber-700 mt-1">${i}</span>
                </div>
                <div data-agenda-filter="noshow" class="cursor-pointer transition-transform hover:scale-105 bg-red-50 p-4 rounded-2xl border ${M} shadow-sm">
                    <span class="text-[10px] font-bold text-red-600 uppercase tracking-widest block">Faltou (No-Show)</span><span class="text-xl md:text-2xl font-black text-red-700 mt-1">${o}</span>
                </div>
                <div data-agenda-filter="canceladas" class="cursor-pointer transition-transform hover:scale-105 bg-slate-100 p-4 rounded-2xl border ${H} shadow-sm">
                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Canceladas</span><span class="text-xl md:text-2xl font-black text-slate-600 mt-1">${r}</span>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gradient-to-br from-indigo-600 to-violet-700 p-5 rounded-2xl text-white shadow-lg flex items-center justify-between transition-transform hover:scale-[1.02]">
                    <div>
                        <p class="text-[11px] font-black uppercase opacity-80 tracking-widest mb-1.5">Taxa Conclusão (Cenário)</p>
                        <p class="text-3xl md:text-4xl font-black">${c}%</p>
                    </div>
                    <i class="bi bi-graph-up-arrow text-5xl opacity-30 drop-shadow-md"></i>
                </div>
                <div class="bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-2xl text-white shadow-lg flex items-center justify-between transition-transform hover:scale-[1.02]">
                    <div>
                        <p class="text-[11px] font-black uppercase opacity-80 tracking-widest mb-1.5">Receita Atendimentos (Cenário)</p>
                        <p class="text-3xl md:text-4xl font-black">${me(m)}</p>
                    </div>
                    <i class="bi bi-cash-coin text-5xl opacity-30 drop-shadow-md"></i>
                </div>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider"><i class="bi bi-bar-chart-line text-indigo-500 mr-2"></i> Evolução da Agenda ${P.drillDownMonth!==null?`(${I.length} dias)`:""}</h3>
                    ${P.drillDownMonth!==null?'<button id="btn-back-agenda" class="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors shadow-sm active:scale-95"><i class="bi bi-arrow-left mr-1"></i> Voltar p/ Anual</button>':'<span class="hidden md:inline-block text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded-md">Dica: Clique na barra para detalhar.</span>'}
                </div>
                <div class="relative h-72 w-full"><canvas id="chartAgenda"></canvas></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center justify-between">
                        <span><i class="bi bi-person-badge text-indigo-500 mr-2"></i> Top Profissionais</span>
                        <span class="text-[9px] text-slate-400">Clique na cor para filtrar</span>
                    </h3>
                    <div class="relative h-64 w-full flex justify-center"><canvas id="chartProfissionais"></canvas></div>
                </div>
                
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center justify-between">
                        <span><i class="bi bi-scissors text-indigo-500 mr-2"></i> Serviços Mais Agendados</span>
                        <span class="text-[9px] text-slate-400">Clique na barra para filtrar</span>
                    </h3>
                    <div class="relative h-64 w-full"><canvas id="chartServicos"></canvas></div>
                </div>
            </div>
        </div>`,setTimeout(()=>{if(!window.Chart)return;const B=document.getElementById("chartAgenda");B&&(Ve("agenda"),P.charts.agenda=new Chart(B,{type:"bar",data:{labels:I,datasets:[{label:"Realizados / Pendentes",data:S,backgroundColor:"#4f46e5",borderRadius:4,stack:"Stack 0"},{label:"Cancelados",data:L,backgroundColor:"#cbd5e1",borderRadius:4,stack:"Stack 0"}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(T,X)=>{X.length>0&&P.drillDownMonth===null&&(P.drillDownMonth=X[0].index,_e())},onHover:(T,X)=>{T.native.target.style.cursor=X[0]&&P.drillDownMonth===null?"pointer":"default"},plugins:{legend:{position:"bottom",labels:{usePointStyle:!0,boxWidth:8,font:{family:"Inter",size:11,weight:"bold"}}},tooltip:{backgroundColor:"rgba(15, 23, 42, 0.9)",titleFont:{size:13,family:"Inter"},bodyFont:{size:12,family:"Inter"},padding:12,cornerRadius:8}},scales:{y:{stacked:!0,beginAtZero:!0,grid:{color:"#f1f5f9",borderDash:[4,4]},ticks:{stepSize:1,font:{size:10,family:"Inter",weight:"bold"}}},x:{stacked:!0,grid:{display:!1},ticks:{font:{size:10,family:"Inter",weight:"bold"}}}}}}));const G=document.getElementById("btn-back-agenda");G&&(G.onclick=()=>{P.drillDownMonth=null,_e()});const Y=document.getElementById("chartProfissionais");Y&&F.length>0?(Ve("profissionais"),P.charts.profissionais=new Chart(Y,{type:"doughnut",data:{labels:F.map(T=>T[0].length>20?T[0].substring(0,20)+"...":T[0]),datasets:[{data:F.map(T=>T[1]),backgroundColor:["#4f46e5","#10b981","#f59e0b","#3b82f6","#8b5cf6"],borderWidth:0,hoverOffset:4}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"65%",onClick:(T,X)=>{if(X.length>0){const ie=X[0].index,J=F[ie][0];P.agendaFilters.professional!==J&&(P.agendaFilters.professional=J,_e())}},onHover:(T,X)=>{T.native.target.style.cursor=X[0]?"pointer":"default"},plugins:{legend:{position:"right",labels:{usePointStyle:!0,boxWidth:8,font:{family:"Inter",size:10,weight:"bold"}}},tooltip:{backgroundColor:"rgba(15, 23, 42, 0.9)",titleFont:{size:13,family:"Inter"},bodyFont:{size:12,family:"Inter"},padding:12,cornerRadius:8}}}})):Y&&(Y.parentElement.innerHTML='<div class="flex h-full items-center justify-center text-xs font-bold text-slate-400">Sem dados suficientes no período</div>');const Q=document.getElementById("chartServicos");Q&&D.length>0?(Ve("servicos"),P.charts.servicos=new Chart(Q,{type:"bar",data:{labels:D.map(T=>T[0].length>18?T[0].substring(0,18)+"...":T[0]),datasets:[{label:"Agendamentos",data:D.map(T=>T[1]),backgroundColor:"#f43f5e",borderRadius:4}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,onClick:(T,X)=>{if(X.length>0){const ie=X[0].index,J=D[ie][0];P.agendaFilters.service!==J&&(P.agendaFilters.service=J,_e())}},onHover:(T,X)=>{T.native.target.style.cursor=X[0]?"pointer":"default"},plugins:{legend:{display:!1},tooltip:{backgroundColor:"rgba(15, 23, 42, 0.9)",titleFont:{size:13,family:"Inter"},bodyFont:{size:12,family:"Inter"},padding:12,cornerRadius:8}},scales:{x:{beginAtZero:!0,grid:{color:"#f1f5f9",borderDash:[4,4]},ticks:{stepSize:1,font:{size:10,family:"Inter",weight:"bold"}}},y:{grid:{display:!1},ticks:{font:{size:10,family:"Inter",weight:"bold"}}}}}})):Q&&(Q.parentElement.innerHTML='<div class="flex h-full items-center justify-center text-xs font-bold text-slate-400">Sem dados suficientes no período</div>')},100)}function is(){const t=document.getElementById("tab-content"),e=P.data.clientes||[],a=fe(P.startDate),s=fe(P.endDate);s.setHours(23,59,59,999);const i=e.length,o=e.filter(u=>{if(!u.createdAt)return!1;const c=fe(u.createdAt);return c>=a&&c<=s}),r=e.filter(u=>{if(!u.createdAt&&!u.lastVisit)return!0;const c=u.lastVisit?fe(u.lastVisit):fe(u.createdAt);return(new Date-c)/(1e3*60*60*24)>60}),n=i>0?(o.length/i*100).toFixed(1):0;let l=[],d=[];if(P.drillDownMonth!==null){const u=new Date(P.startDate).getFullYear(),c=new Date(u,P.drillDownMonth+1,0).getDate();l=Array.from({length:c},(p,m)=>`${m+1}`),d=l.map(p=>o.filter(m=>{const b=fe(m.createdAt);return b.getMonth()===P.drillDownMonth&&b.getDate()===parseInt(p)}).length)}else l=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],d=l.map((u,c)=>o.filter(p=>fe(p.createdAt).getMonth()===c).length);t.innerHTML=`
        <div class="space-y-4 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-people-fill text-indigo-500 mr-1"></i> Base Total</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${i}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest"><i class="bi bi-person-plus-fill mr-1"></i> Novos (Período)</span><span class="text-xl md:text-2xl font-black text-emerald-700 mt-1">${o.length}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-amber-500 uppercase tracking-widest"><i class="bi bi-person-dash-fill mr-1"></i> Ausentes (>60d)</span><span class="text-xl md:text-2xl font-black text-amber-600 mt-1">${r.length}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-blue-500 uppercase tracking-widest"><i class="bi bi-graph-up-arrow mr-1"></i> Crescimento</span><span class="text-xl md:text-2xl font-black text-blue-600 mt-1">+${n}%</span></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                        <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider"><i class="bi bi-person-lines-fill text-indigo-500 mr-2"></i> Aquisição ${P.drillDownMonth!==null?"(Diário)":"(Mensal)"}</h3>
                        ${P.drillDownMonth!==null?'<button id="btn-back-clientes" class="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">Voltar</button>':""}
                    </div>
                    <div class="relative h-64 w-full"><canvas id="chartClientes"></canvas></div>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3"><i class="bi bi-star-fill text-amber-400 mr-2"></i> Últimos Cadastros</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
                        ${o.slice(0,10).reverse().map(u=>`
                            <div class="flex items-center justify-between border-b border-slate-50 pb-2">
                                <div>
                                    <p class="text-xs font-black text-slate-700 truncate max-w-[140px]">${u.name}</p>
                                    <p class="text-[10px] font-medium text-slate-400">${u.phone||"Sem contato"}</p>
                                </div>
                                <span class="text-[9px] bg-emerald-50 border border-emerald-200 text-emerald-600 px-2 py-1 rounded-lg font-black uppercase tracking-widest">Novo</span>
                            </div>
                        `).join("")||'<p class="text-xs font-medium text-slate-400">Nenhum cliente novo neste período.</p>'}
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{if(!window.Chart)return;const u=document.getElementById("chartClientes");u&&(Ve("clientes"),P.charts.clientes=new Chart(u,{type:"line",data:{labels:l,datasets:[{label:"Novos Cadastros",data:d,borderColor:"#3b82f6",backgroundColor:"rgba(59, 130, 246, 0.15)",fill:!0,tension:.4,borderWidth:3,pointRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(p,m)=>{m.length>0&&P.drillDownMonth===null&&(P.drillDownMonth=m[0].index,is())},plugins:{legend:{display:!1},tooltip:{backgroundColor:"rgba(15, 23, 42, 0.9)",titleFont:{size:13,family:"Inter"},bodyFont:{size:12,family:"Inter"},padding:12,cornerRadius:8}},scales:{y:{beginAtZero:!0,grid:{color:"#f1f5f9",borderDash:[4,4]},ticks:{stepSize:1,font:{size:10,family:"Inter",weight:"bold"}}},x:{grid:{display:!1},ticks:{font:{size:10,family:"Inter",weight:"bold"}}}}}}));const c=document.getElementById("btn-back-clientes");c&&(c.onclick=()=>{P.drillDownMonth=null,is()})},100)}function il(){const t=document.getElementById("tab-content"),a=(P.data.vendas||[]).filter(d=>{const u=String(d.status||"").toLowerCase();return["completed","paid","concluida","fechada","closed"].includes(u)}),s=a.reduce((d,u)=>d+(Number(u.totalAmount||u.total||u.totalValue||u.valorTotal)||0),0),i=a.length,o=i>0?s/i:0;let r=0;const n={};a.forEach(d=>{(Array.isArray(d.items)?d.items:Array.isArray(d.services)?d.services:Array.isArray(d.cart)?d.cart:[]).forEach(c=>{const p=Number(c.quantity||c.quantidade)||1;r+=p;const m=c.name||c.nome||"Produto/Serviço Indefinido";n[m]=(n[m]||0)+p})});const l=Object.entries(n).sort((d,u)=>u[1]-d[1]).slice(0,5);t.innerHTML=`
        <div class="space-y-4 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-4 rounded-2xl shadow-md flex flex-col hover:scale-[1.02] transition-transform"><span class="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Faturamento PDV</span><span class="text-xl md:text-2xl font-black mt-1">${me(s)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ticket Médio</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${me(o)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Vendas</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${i}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Volume Itens</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${r}</span></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3"><i class="bi bi-trophy-fill text-amber-500 mr-2"></i> Curva ABC (Top 5 Vendidos)</h3>
                    <div class="relative h-64 w-full"><canvas id="chartVendas"></canvas></div>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3"><i class="bi bi-receipt-cutoff text-indigo-500 mr-2"></i> Últimas Vendas Processadas</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-3 space-y-2.5">
                        ${a.slice(0,8).map(d=>{const c=(Array.isArray(d.items)?d.items:Array.isArray(d.services)?d.services:Array.isArray(d.cart)?d.cart:[]).length||1,p=Number(d.totalAmount||d.total||d.totalValue||d.valorTotal||0),m=d.createdAt||d.date||d.timestamp||"";return`
                                <div class="flex items-center justify-between border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors p-3 rounded-xl">
                                    <div>
                                        <p class="text-xs font-black text-slate-700">#${(d.id||"").substring(0,6).toUpperCase()}</p>
                                        <p class="text-[10px] font-bold text-slate-400 mt-0.5">${Oe(m)}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-xs font-black text-emerald-600">${me(p)}</p>
                                        <p class="text-[10px] font-bold text-slate-400 mt-0.5">${c} ${c===1?"item":"itens"}</p>
                                    </div>
                                </div>
                            `}).join("")||'<p class="text-xs font-medium text-slate-400 text-center py-4">Nenhuma venda concluída no período.</p>'}
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{if(!window.Chart)return;const d=document.getElementById("chartVendas");d&&l.length>0?(Ve("vendas"),P.charts.vendas=new Chart(d,{type:"bar",data:{labels:l.map(u=>u[0].length>15?u[0].substring(0,15)+"...":u[0]),datasets:[{label:"Quantidade Vendida",data:l.map(u=>u[1]),backgroundColor:"#f59e0b",borderRadius:4}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{backgroundColor:"rgba(15, 23, 42, 0.9)",titleFont:{size:13,family:"Inter"},bodyFont:{size:12,family:"Inter"},padding:12,cornerRadius:8}},scales:{x:{beginAtZero:!0,grid:{color:"#f1f5f9",borderDash:[4,4]},ticks:{stepSize:1,font:{size:10,family:"Inter",weight:"bold"}}},y:{grid:{display:!1},ticks:{font:{size:10,family:"Inter",weight:"bold"}}}}}})):d&&(d.parentElement.innerHTML='<div class="flex h-full items-center justify-center text-xs font-bold text-slate-400">Sem dados suficientes</div>')},100)}function rl(){const t=document.getElementById("tab-content"),e=P.data.estoque||[];let a=0,s=0,i=[],o=[];e.forEach(r=>{r.active!==!1&&s++;const n=Number(r.currentStock)||0,l=Number(r.minStock)||0,d=Number(r.costPrice)||Number(r.price)||0;n>0&&(a+=n*d),n<=0?o.push(r):n<=l&&i.push(r)}),t.innerHTML=`
        <div class="space-y-4 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-4 rounded-2xl shadow-md flex flex-col hover:scale-[1.02] transition-transform"><span class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Imobilizado</span><span class="text-xl md:text-2xl font-black mt-1">${me(a)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Produtos Ativos</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${s}</span></div>
                <div class="bg-amber-50 p-4 rounded-2xl border border-amber-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Estoque Baixo</span><span class="text-xl md:text-2xl font-black text-amber-700 mt-1">${i.length}</span></div>
                <div class="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-red-600 uppercase tracking-widest">Esgotados</span><span class="text-xl md:text-2xl font-black text-red-700 mt-1">${o.length}</span></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                        <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider"><i class="bi bi-pie-chart-fill text-indigo-500 mr-2"></i> Saúde Geral</h3>
                    </div>
                    <div class="relative h-64 w-full flex justify-center"><canvas id="chartEstoque"></canvas></div>
                </div>

                <div class="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-sm font-black text-red-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3"><i class="bi bi-exclamation-triangle-fill mr-2"></i> Reposição Crítica Necessária</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-3">
                        <table class="w-full text-left text-xs">
                            <thead class="text-slate-400 border-b border-slate-100">
                                <tr>
                                    <th class="pb-2 font-bold uppercase tracking-wider text-[10px]">Produto</th>
                                    <th class="pb-2 font-bold uppercase tracking-wider text-center text-[10px]">Mínimo</th>
                                    <th class="pb-2 font-bold uppercase tracking-wider text-center text-[10px]">Atual</th>
                                    <th class="pb-2 font-bold uppercase tracking-wider text-right text-[10px]">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-50">
                                ${[...o,...i].map(r=>`
                                    <tr class="hover:bg-slate-50 transition-colors">
                                        <td class="py-3 font-bold text-slate-700 text-xs">${r.name}</td>
                                        <td class="py-3 text-center text-slate-500 font-bold text-xs">${r.minStock||0}</td>
                                        <td class="py-3 text-center font-black text-xs ${r.currentStock<=0?"text-red-500":"text-amber-500"}">${r.currentStock||0}</td>
                                        <td class="py-3 text-right">
                                            <span class="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${r.currentStock<=0?"bg-red-100 text-red-600 border border-red-200":"bg-amber-100 text-amber-600 border border-amber-200"}">
                                                ${r.currentStock<=0?"Esgotado":"Comprar"}
                                            </span>
                                        </td>
                                    </tr>
                                `).join("")||'<tr><td colspan="4" class="text-center py-10 font-bold text-xs text-slate-400">Todo o estoque está em níveis saudáveis. Nenhuma ação necessária.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{if(!window.Chart)return;const r=document.getElementById("chartEstoque"),n=s-i.length-o.length;r&&(Ve("estoque"),P.charts.estoque=new Chart(r,{type:"doughnut",data:{labels:["Saudável","Baixo","Esgotado"],datasets:[{data:[Math.max(0,n),i.length,o.length],backgroundColor:["#10b981","#f59e0b","#ef4444"],borderWidth:0,hoverOffset:4}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"75%",plugins:{legend:{position:"bottom",labels:{usePointStyle:!0,boxWidth:8,font:{size:11,family:"Inter",weight:"bold"}}},tooltip:{backgroundColor:"rgba(15, 23, 42, 0.9)",titleFont:{size:13,family:"Inter"},bodyFont:{size:12,family:"Inter"},padding:12,cornerRadius:8}}}}))},100)}function nl(){const t=document.getElementById("multi-context-apply");t&&(t.removeEventListener("click",at),t.addEventListener("click",()=>{setTimeout(at,100)})),_t&&os.removeEventListener("click",_t),_t=e=>{const a=e.target;if(a.closest("#btn-clear-agenda-filters")){P.agendaFilters={status:null,professional:null,service:null},P.drillDownMonth=null,_e();return}const i=a.closest("[data-agenda-filter]");if(i){const n=i.dataset.agendaFilter;n==="todos"||P.agendaFilters.status===n?P.agendaFilters.status=null:P.agendaFilters.status=n,_e();return}const o=a.closest(".tab-btn");if(o){document.querySelectorAll(".tab-btn").forEach(n=>{n.classList.remove("active","bg-indigo-600","text-white","shadow-md","border-transparent"),n.classList.add("bg-slate-50","text-slate-600","border-slate-200","hover:bg-slate-100")}),o.classList.remove("bg-slate-50","text-slate-600","border-slate-200","hover:bg-slate-100"),o.classList.add("active","bg-indigo-600","text-white","shadow-md","border-transparent"),P.currentTab=o.dataset.tab,P.drillDownMonth=null,at();return}const r=a.closest("button[data-action]");if(r){const n=r.dataset.action;if(n==="apply-filters")P.startDate=document.getElementById("report-start").value,P.endDate=document.getElementById("report-end").value,P.drillDownMonth=null,P.agendaFilters={status:null,professional:null,service:null},at();else if(n==="preset-date"){const l=r.dataset.preset,d=new Date;let u,c;l==="month"?(u=new Date(d.getFullYear(),d.getMonth(),1),c=new Date(d.getFullYear(),d.getMonth()+1,0)):l==="last_month"?(u=new Date(d.getFullYear(),d.getMonth()-1,1),c=new Date(d.getFullYear(),d.getMonth(),0)):l==="year"&&(u=new Date(d.getFullYear(),0,1),c=new Date(d.getFullYear(),11,31)),document.getElementById("report-start").value=u.toISOString().split("T")[0],document.getElementById("report-end").value=c.toISOString().split("T")[0],document.querySelectorAll("[data-preset]").forEach(p=>{p.classList.remove("bg-white","text-indigo-600","shadow-sm","border","border-slate-200"),p.classList.add("text-slate-500")}),r.classList.remove("text-slate-500"),r.classList.add("bg-white","text-indigo-600","shadow-sm","border","border-slate-200"),P.startDate=u.toISOString().split("T")[0],P.endDate=c.toISOString().split("T")[0],P.drillDownMonth=null,P.agendaFilters={status:null,professional:null,service:null},at()}else n==="export-excel"&&ll()}},os.addEventListener("click",_t)}function ll(){if(typeof XLSX>"u"){g("Erro","A biblioteca XLSX não está disponível.","error");return}const{currentTab:t,data:e,startDate:a,endDate:s}=P;let i=[],o=`Kairos_Relatorio_${t.toUpperCase()}_${a}_a_${s}.xlsx`;if(t==="financeiro"){if(!e.financeiro||!e.financeiro.payables.length&&!e.financeiro.receivables.length)return g("Aviso","Sem dados financeiros para exportar.","info");const r=new Map(e.financeiro.natures.map(l=>[l.id,l.name]));i=[...e.financeiro.receivables.filter(l=>l.status==="paid").map(l=>({...l,tipo:"Receita"})),...e.financeiro.payables.filter(l=>l.status==="paid").map(l=>({...l,tipo:"Despesa"}))].map(l=>({"Data Pagamento":l.paymentDate?Oe(l.paymentDate):"-",Tipo:l.tipo,Descrição:l.description||"-","Natureza (DRE)":l.naturezaId?r.get(l.naturezaId)||"Outros":"Geral","Valor (R$)":l.amount||0}))}else if(t==="agenda"){if(!e.agenda||e.agenda.length===0)return g("Aviso","Sem dados de agenda.","info");i=e.agenda.map(r=>({Data:r.startTime?Oe(r.startTime):"-",Cliente:r.clientName||"Sem nome",Profissional:r.professionalName||"-",Status:r.status,"Valor Faturado (R$)":r.totalAmount||0}))}else if(t==="clientes"){if(!e.clientes||e.clientes.length===0)return g("Aviso","Sem dados de clientes.","info");i=e.clientes.map(r=>({"Data de Cadastro":r.createdAt?Oe(r.createdAt):"-",Nome:r.name||"-",Telefone:r.phone||"-","E-mail":r.email||"-","Última Visita":r.lastVisit?Oe(r.lastVisit):"-"}))}else if(t==="vendas"){if(!e.vendas||e.vendas.length===0)return g("Aviso","Sem dados de vendas.","info");i=e.vendas.map(r=>({"ID Venda":r.id||"-",Data:r.createdAt?Oe(r.createdAt):"-",Status:r.status||"-","Qtd Itens":(r.items||[]).length,"Faturamento (R$)":r.totalAmount||0}))}else if(t==="estoque"){if(!e.estoque||e.estoque.length===0)return g("Aviso","Sem dados de estoque.","info");i=e.estoque.map(r=>({Produto:r.name||"-","Código/SKU":r.sku||"-","Estoque Atual":r.currentStock||0,"Estoque Mínimo":r.minStock||0,"Preço Venda (R$)":r.price||0,Alerta:r.currentStock<=0?"Esgotado":r.currentStock<=r.minStock?"Baixo":"OK"}))}if(i.length===0)return g("Aviso","Nenhum dado válido para exportar.","info");try{const r=XLSX.utils.json_to_sheet(i),n=XLSX.utils.book_new();XLSX.utils.book_append_sheet(n,r,t.toUpperCase()),XLSX.writeFile(n,o)}catch(r){console.error("Erro na exportação Excel: ",r),g("Erro","Falha ao gerar o ficheiro Excel.","error")}}const Ha=(t,e="products")=>A(`/api/${e}/categories/${t}`),ni=(t,e="products")=>A(`/api/${e}/categories`,{method:"POST",body:JSON.stringify(t)}),li=(t,e="products")=>A(`/api/${e}/categories/${t}`,{method:"DELETE"}),dl="audit_logs",ne=async(t,e,a,s,i,o=null)=>{try{if(!e)return;await $o(Da(he,dl),{establishmentId:t,userId:e.uid,userName:e.name||e.email||"Utilizador",module:a,action:s,description:i,details:o,timestamp:new Date})}catch(r){console.error("Falha silenciosa ao registar log:",r)}},rs=document.getElementById("content");let U={services:null,professionals:[],categories:[],hierarchyCache:[],statusFilter:"all",searchQuery:"",filterCategoryId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set,tempService:null},Vt=null,Ut=null;function lt(){const t=ke.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function di(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[f.establishmentId]}function cl(){const t=document.getElementById("services-layout-detail"),e=document.getElementById("service-modal-inner");t&&e&&(t.classList.remove("hidden"),t.classList.add("flex"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("scale-95","translate-y-4"),e.classList.add("scale-100","translate-y-0")},10),document.body.style.overflow="hidden")}function Wt(){const t=document.getElementById("services-layout-detail"),e=document.getElementById("service-modal-inner");t&&e&&(t.classList.add("opacity-0"),e.classList.remove("scale-100","translate-y-0"),e.classList.add("scale-95","translate-y-4"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.body.style.overflow=""},300)),U.tempService=null}async function ul(){U.selectedIds.clear(),U.services=null;try{const t=await De();U.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}pl(),wl(),await bt()}function pl(){rs.innerHTML=`
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
                        <input type="text" id="searchInput" value="${U.searchQuery}" placeholder="Pesquisar serviço..." class="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-sm font-semibold text-slate-700">
                    </div>
                    
                    <div class="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
                        <button data-action="manage-categories" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95">
                            <i class="bi bi-tags text-base"></i> Categorias
                        </button>
                        <button id="toggle-filter-btn" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95 ${U.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                            <i class="bi bi-funnel text-base"></i> Filtros
                        </button>
                        <button data-action="open-service-editor" data-id="" class="py-2.5 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-500/30 flex items-center justify-center gap-2 text-xs active:scale-95 uppercase tracking-wider border border-indigo-500 col-span-2 md:col-span-1">
                            <i class="bi bi-plus-lg text-base"></i> Novo Serviço
                        </button>
                    </div>
                </div>

                <div id="filter-panel" class="${U.isAdvancedFilterOpen?"block":"hidden"} mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
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
                    <button data-status="all" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${U.statusFilter==="all"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Todos</button>
                    <button data-status="active" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${U.statusFilter==="active"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Ativos</button>
                    <button data-status="inactive" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${U.statusFilter==="inactive"?"bg-red-600 text-white border-red-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Inativos</button>
                </div>

                <div id="servicesList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                    ${ui(8)}
                </div>
            </section>
        </div>

        <div id="services-layout-detail" class="hidden fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="service-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-4xl flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
                </div>
        </div>
    `}async function bt(){const t=document.getElementById("servicesList"),e=di();try{const a=e.map(c=>Je(c)),s=e.map(c=>Pe(c)),i=e.map(c=>Ha(c,"services")),o=await Promise.all(a),r=await Promise.all(s),n=await Promise.all(i),l=new Map;o.flat().filter(Boolean).forEach(c=>l.set(c.id,c)),U.services=Array.from(l.values()),f.services=U.services;const d=new Map;r.flat().filter(Boolean).forEach(c=>d.set(c.id,c)),U.professionals=Array.from(d.values()),f.professionals=U.professionals;const u=new Map;n.flat().filter(Boolean).forEach(c=>u.set(c.id,c)),U.categories=Array.from(u.values()),f.serviceCategories=U.categories,bl(),wt()}catch(a){console.error(a),t&&(t.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>')}}function bl(){const t=document.getElementById("filterCategoryId");t&&U.categories&&(t.innerHTML='<option value="all">Todas as categorias</option>',U.categories.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=v(e.name),U.filterCategoryId===e.id&&(a.selected=!0),t.appendChild(a)}))}function ci(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=U.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function ml(t){const e=document.getElementById("summary-section");if(!e)return;const a=t.length,s=t.filter(o=>o.active!==!1).length,i=a-s;e.innerHTML=`
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
    `}function wt(){const t=document.getElementById("servicesList");if(!t)return;if(U.services===null){t.innerHTML=ui(8);return}const e=di(),a=U.services.filter(i=>{const o=i.name.toLowerCase().includes(U.searchQuery);let r=!0;U.statusFilter==="active"&&(r=i.active!==!1),U.statusFilter==="inactive"&&(r=i.active===!1);const n=U.filterCategoryId==="all"||i.categoryId===U.filterCategoryId,l=i.accessibleIn&&i.accessibleIn.length>0?i.accessibleIn:[i.establishmentId||f.establishmentId],d=e.some(u=>l.includes(u));return o&&r&&n&&d});if(ml(a),a.length===0){U.services.length===0?t.innerHTML=`
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
            `;return}const s=new Map((U.categories||[]).map(i=>[i.id,i.name]));t.innerHTML=a.map(i=>{const o=i.active===!1,r=v(i.name),n=v(s.get(i.categoryId)||"Sem Categoria"),l=i.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(i.name.charAt(0))}`,d=i.accessibleIn?i.accessibleIn.length:1,u=U.selectedIds.has(i.id),c=i.price!==void 0?parseFloat(i.price).toFixed(2):"0.00",p=i.color||"#4f46e5";return`
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
            </div>`}).join("")}function ui(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center p-3.5 animate-pulse h-[86px]">
            <div class="w-14 h-14 rounded-xl bg-slate-200 flex-shrink-0 mr-4"></div>
            <div class="flex-1 space-y-2">
                <div class="h-3 bg-slate-200 rounded w-3/4"></div>
                <div class="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}async function gl(t){t.preventDefault();const e=t.target.closest("#categoryForm"),a=e.querySelector("#categoryName"),s=a.value;if(!s)return;const i=e.querySelector('button[type="submit"]');i.disabled=!0,i.innerHTML='<i class="bi bi-hourglass-split"></i>...';try{const o=U.hierarchyCache.reduce((r,n)=>(r.push(n.id),n.branches&&n.branches.forEach(l=>r.push(l.id)),r),[]);o.length===0&&o.push(f.establishmentId),await ni({establishmentId:f.establishmentId,name:s,accessibleIn:o},"services"),ne(f.establishmentId,lt(),"Categorias (Serviços)","Criou",`Criou categoria: ${s}`),a.value="",g("Sucesso","Categoria criada!","success"),await Ps(),await bt()}catch(o){g("Erro",`Não foi possível criar a categoria: ${o.message}`,"error")}finally{i.disabled=!1,i.innerHTML='<i class="bi bi-plus-lg"></i>'}}async function fl(t){if(await K("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await li(t,"services"),ne(f.establishmentId,lt(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${t})`),g("Sucesso","Categoria apagada.","success"),await Ps(),await bt()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function Ps(){const t=document.getElementById("categoryList");if(t){t.innerHTML='<div class="loader mx-auto my-4 border-indigo-500"></div>';try{const e=await Ha(f.establishmentId,"services");U.categories=e,e.length>0?t.innerHTML=e.map(a=>`
                <div class="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 mb-2 shadow-sm">
                    <span class="text-xs font-black text-slate-700 uppercase tracking-widest">${v(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-white w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-600 rounded-lg transition-colors border border-red-100 active:scale-95"><i class="bi bi-trash3 pointer-events-none"></i></button>
                </div>`).join(""):t.innerHTML='<div class="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200"><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhuma categoria criada.</p></div>'}catch{t.innerHTML='<p class="text-red-500 text-center text-[10px] font-bold p-4 bg-red-50 rounded-xl">Erro ao carregar categorias.</p>'}}}function xl(){Fe({title:"Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-md"});const e=document.getElementById("genericModal");if(e){const a=e.querySelector("#categoryForm");a&&(a.addEventListener("submit",gl),e.addEventListener("click",s=>{const i=s.target.closest('button[data-action="delete-category"]');i&&(s.preventDefault(),fl(i.dataset.id))}))}Ps()}function hl(t=[]){if(!U.hierarchyCache||U.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${f.establishmentId}">
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 text-center">
                <i class="bi bi-info-circle text-2xl block mb-2 text-slate-400"></i> Exclusivo desta unidade.
            </div>`;let e='<div class="space-y-2 mt-1 max-h-48 overflow-y-auto custom-scrollbar pr-2">';return U.hierarchyCache.forEach(a=>{const s=t.includes(a.id)||t.length===0&&a.id===f.establishmentId;e+=`
            <label class="flex items-center space-x-3 p-3 cursor-pointer bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-colors shadow-sm">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-xs md:text-sm font-black text-slate-800">🏢 ${v(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(i=>{const o=t.includes(i.id)||t.length===0&&i.id===f.establishmentId;e+=`
                    <label class="flex items-center space-x-3 p-3 ml-8 cursor-pointer bg-white hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl transition-colors border-l-4 border-l-indigo-200 shadow-sm">
                        <input type="checkbox" name="accessibleIn" value="${i.id}" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                        <span class="text-xs font-bold text-slate-600">📍 ${v(i.name)}</span>
                    </label>
                `})}),e+="</div>",e}function vl(t){U.viewMode="edit-service";const e=document.getElementById("service-modal-inner");if(!e)return;let a={name:"",active:!0,duration:30,price:0};if(t){const C=U.services?.find(M=>String(M.id)===String(t));C&&(a=JSON.parse(JSON.stringify(C)))}U.tempService=a;const s=!!a.id,i=U.categories||[],o=a.duration||30,r=a.bufferTime||0,n=v(a.name||""),l=v(a.notes||""),d=v(a.publicDescription||""),u=s?n:"Novo Serviço",c=a.color||"#4f46e5",p=a.loyaltyPoints||0,m=i.map(C=>`<option value="${C.id}" ${a.categoryId===C.id?"selected":""}>${v(C.name)}</option>`).join(""),b=a.photo||`https://placehold.co/150x150/E2E8F0/4A5568?text=${encodeURIComponent(n?n.charAt(0):"S")}`,x=`
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
                                    <img id="servicePhotoPreview" src="${b}" alt="Foto" class="w-full h-full rounded-2xl object-cover border-4 border-slate-50 shadow-md transition-all group-hover:brightness-75">
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
                                        ${m}
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
                                ${hl(a.accessibleIn||[])}
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
    `,e.querySelectorAll(".tab-link").forEach(C=>{C.addEventListener("click",M=>{M.preventDefault(),e.querySelectorAll(".tab-link").forEach(H=>{H.classList.remove("active","border-indigo-600","text-indigo-600"),H.classList.add("border-transparent","text-slate-400")}),C.classList.add("active","border-indigo-600","text-indigo-600"),C.classList.remove("border-transparent","text-slate-400"),e.querySelectorAll(".tab-content").forEach(H=>H.classList.add("hidden")),e.querySelector("#"+C.dataset.tab).classList.remove("hidden")})});const y=e.querySelectorAll('input[name="commissionType"]'),I=e.querySelector("#defaultCommissionRateContainer"),S=e.querySelector("#professionalCommissionsContainer");function L(){const C=e.querySelector('input[name="commissionType"]:checked').value;I&&(I.style.display=C==="default"?"block":"none"),S&&(S.style.display=C==="custom"?"block":"none")}y.forEach(C=>C.addEventListener("change",L));const q=e.querySelector("#professionalCommissionsList");q&&(q.innerHTML=(U.professionals||[]).map(C=>{const M=a.professionalCommissions?.[C.id]!==void 0,H=a.professionalCommissions?.[C.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:bg-slate-50 transition-colors ${M?"bg-indigo-50/50 border-indigo-100 shadow-sm":""}" data-prof-id="${C.id}">
                    <label class="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                        <input type="checkbox" ${M?"checked":""} class="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 shadow-sm cursor-pointer">
                        <img src="${C.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${v(C.name.charAt(0))}`}" class="w-10 h-10 rounded-full object-cover border border-white shadow-sm flex-shrink-0">
                        <span class="text-xs font-black text-slate-800 truncate uppercase tracking-widest">${v(C.name)}</span>
                    </label>
                    <div class="flex items-center gap-1.5 ml-3">
                        <input type="number" value="${H}" step="0.1" class="w-20 p-2 border border-slate-300 rounded-lg text-sm font-bold text-center outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-inner transition-shadow" ${M?"":"disabled"}>
                        <span class="text-[10px] font-black text-slate-400">%</span>
                    </div>
                </div>
            `}).join(""),q.querySelectorAll('input[type="checkbox"]').forEach(C=>{C.addEventListener("change",M=>{const H=M.target.closest(".professional-commission-row"),B=H.querySelector('input[type="number"]');B.disabled=!M.target.checked,H.classList.toggle("bg-indigo-50/50",M.target.checked),H.classList.toggle("border-indigo-100",M.target.checked),H.classList.toggle("shadow-sm",M.target.checked),H.classList.toggle("border-transparent",!M.target.checked),M.target.checked&&B.focus()})})),L();const N=e.querySelector("#servicePhotoInput"),F=e.querySelector("#servicePhotoButton"),D=e.querySelector("#servicePhotoContainer"),k=e.querySelector("#servicePhotoPreview"),O=e.querySelector("#servicePhotoBase64"),_=()=>N.click();F&&F.addEventListener("click",_),D&&D.addEventListener("click",_),N.onchange=async()=>{const C=N.files[0];if(C){k.src="https://placehold.co/150x150/E2E8F0/4A5568?text=...";try{const M=await Pa(C,800,800,.8);if(M.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");k.src=M,O.value=M}catch(M){g("Erro de Imagem",M.message,"error"),k.src=b,O.value=a.photo||""}}},cl()}function yl(){K("Excluir em Lote",`Tem certeza que deseja excluir ${U.selectedIds.size} serviços da rede? Esta ação não pode ser desfeita.`).then(async t=>{if(t)try{const e=Array.from(U.selectedIds).map(a=>Go(a));await Promise.all(e),ne(f.establishmentId,lt(),"Serviços","Excluiu em Lote",`Excluiu ${U.selectedIds.size} serviços`),g("Sucesso",`${U.selectedIds.size} serviços foram excluídos.`,"success"),U.selectedIds.clear(),ci(),bt()}catch(e){g("Erro",`Não foi possível excluir em lote: ${e.message}`,"error")}})}function wl(){Vt&&document.body.removeEventListener("click",Vt),Ut&&rs.removeEventListener("input",Ut),Vt=async t=>{if(t.target.classList.contains("service-checkbox")){const o=t.target.dataset.id;t.target.checked?U.selectedIds.add(o):U.selectedIds.delete(o),ci(),t.stopPropagation();return}const e=t.target.closest(".status-filter-btn");if(e){U.statusFilter=e.dataset.status,document.querySelectorAll(".status-filter-btn").forEach(o=>{o.classList.remove("bg-indigo-600","text-white","border-indigo-600","bg-red-600","border-red-600"),o.classList.add("bg-white","text-slate-600","border-slate-200")}),U.statusFilter==="inactive"?(e.classList.remove("bg-white","text-slate-600","border-slate-200"),e.classList.add("bg-red-600","text-white","border-red-600")):(e.classList.remove("bg-white","text-slate-600","border-slate-200"),e.classList.add("bg-indigo-600","text-white","border-indigo-600")),wt();return}if(t.target.id==="clear-filters-btn"){t.preventDefault(),document.getElementById("filterCategoryId").value="all",U.filterCategoryId="all",wt();return}if(t.target.id==="apply-filter-btn"){t.preventDefault(),U.filterCategoryId=document.getElementById("filterCategoryId").value,wt();return}const a=t.target.closest("#toggle-filter-btn");if(a){t.preventDefault(),U.isAdvancedFilterOpen=!U.isAdvancedFilterOpen;const o=document.getElementById("filter-panel");U.isAdvancedFilterOpen?(o.classList.remove("hidden"),o.classList.add("block"),a.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.remove("bg-white","text-slate-700","border-slate-200")):(o.classList.add("hidden"),o.classList.remove("block"),a.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.add("bg-white","text-slate-700","border-slate-200"));return}if(t.target.id==="services-layout-detail"){Wt();return}const s=t.target.closest("[data-action]");if(!s)return;const i=s.dataset.action;switch(["close-detail-screen","delete-service","save-service","manage-categories","open-service-editor","batch-delete"].includes(i)&&t.stopPropagation(),i){case"manage-categories":xl();break;case"open-service-editor":vl(s.dataset.id);break;case"close-detail-screen":Wt();break;case"batch-delete":yl();break;case"delete-service":{const o=s.dataset.id;if(!o)return;if(await K("Apagar Serviço","Tem certeza que deseja excluir este serviço da rede?"))try{const n=U.services.find(l=>l.id===o)?.name||"Desconhecido";await Go(o),ne(f.establishmentId,lt(),"Serviços","Excluiu",`Excluiu o serviço: ${n}`),g("Sucesso","Serviço apagado da rede.","success"),Wt(),await bt()}catch(n){g("Erro",`Não foi possível apagar o serviço: ${n.message}`,"error")}break}case"save-service":{t.preventDefault();const o=document.getElementById("serviceForm");if(!o.reportValidity())return;const r=s,n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{const l=o.querySelector("#serviceId").value,d=o.querySelector('input[name="commissionType"]:checked').value,u={};d==="custom"&&o.querySelectorAll(".professional-commission-row").forEach(b=>{const x=b.dataset.profId;if(b.querySelector('input[type="checkbox"]').checked){const I=parseFloat(b.querySelector('input[type="number"]').value);u[x]=isNaN(I)?0:I}});const c=Array.from(o.querySelectorAll('input[name="accessibleIn"]:checked')).map(b=>b.value),p=c.length>0?c:[f.establishmentId],m={...U.tempService,establishmentId:f.establishmentId,accessibleIn:p,name:o.querySelector("#serviceName").value.trim(),price:parseFloat(o.querySelector("#servicePrice").value),duration:parseInt(o.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(o.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:o.querySelector("#serviceCategory").value||null,color:o.querySelector("#serviceColor").value,targetAudience:o.querySelector("#serviceAudience").value,loyaltyPoints:parseInt(o.querySelector("#serviceLoyaltyPoints").value,10)||0,publicDescription:o.querySelector("#servicePublicDescription").value.trim(),homeService:o.querySelector("#serviceHomeToggle").checked,commissionRate:parseFloat(o.querySelector("#serviceCommissionRate").value)||0,active:o.querySelector("#serviceStatusToggle").checked,photo:o.querySelector("#servicePhotoBase64").value,notes:o.querySelector("#serviceNotes").value,commissionType:d,professionalCommissions:u};l?(await on(l,m),ne(f.establishmentId,lt(),"Serviços","Editou",`Editou o serviço: ${m.name}`),g("Sucesso","Serviço atualizado com sucesso!","success")):(delete m.id,await sn(m),ne(f.establishmentId,lt(),"Serviços","Criou",`Criou novo serviço: ${m.name}`),g("Sucesso","Serviço adicionado à rede!","success")),Wt(),await bt()}catch(l){g("Erro",l.message,"error"),r.disabled=!1,r.innerHTML=n}break}}},document.body.addEventListener("click",Vt),Ut=t=>{t.target.id==="searchInput"&&(U.searchQuery=t.target.value,wt())},rs.addEventListener("input",Ut)}const Oa="suppliers",Ft=async t=>{try{const e=Lo(Da(he,Oa),Co("establishmentId","==",t)),a=await Yi(e),s=[];return a.forEach(i=>{s.push({id:i.id,...i.data()})}),s}catch(e){throw console.error("Erro ao buscar fornecedores:",e),e}},kl=async t=>{try{return{id:(await $o(Da(he,Oa),t)).id,...t}}catch(e){throw console.error("Erro ao criar fornecedor:",e),e}},Il=async(t,e)=>{try{const a=je(he,Oa,t);return await jt(a,e),{id:t,...e}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},Sl=async t=>{try{const e=je(he,Oa,t);return await Xi(e),!0}catch(e){throw console.error("Erro ao excluir fornecedor:",e),e}},ns=document.getElementById("content");let $={products:null,categories:[],suppliers:[],hierarchyCache:[],allMovements:[],currentTab:"catalogo",stockFilter:"all",searchQuery:"",filterCategoryId:"all",isAdvancedFilterOpen:!1,isMovementFilterOpen:!1,selectedIds:new Set,selectedMovementIds:new Set,tempProduct:null,tempSupplierIds:new Set},Jt=null,Gt=null;function Ue(){const t=ke.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function Ts(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[f.establishmentId]}function Wa(t){return t?t._seconds?new Date(t._seconds*1e3):t.seconds?new Date(t.seconds*1e3):new Date(t):new Date}function El(){const t=document.getElementById("products-layout-detail"),e=document.getElementById("product-modal-inner"),a=document.getElementById("mobile-bottom-nav");t&&e&&(t.classList.remove("hidden"),t.classList.add("flex"),a&&(a.style.display="none"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("scale-95","translate-y-4"),e.classList.add("scale-100","translate-y-0")},10),document.body.style.overflow="hidden")}function da(){const t=document.getElementById("products-layout-detail"),e=document.getElementById("product-modal-inner"),a=document.getElementById("mobile-bottom-nav");t&&e&&(t.classList.add("opacity-0"),e.classList.remove("scale-100","translate-y-0"),e.classList.add("scale-95","translate-y-4"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.body.style.overflow="",a&&(a.style.display="")},300)),$.tempProduct=null,$.tempSupplierIds.clear()}function $l(){const t=document.getElementById("movement-layout-detail"),e=document.getElementById("movement-modal-inner"),a=document.getElementById("mobile-bottom-nav");t&&e&&(t.classList.remove("hidden"),t.classList.add("flex"),a&&(a.style.display="none"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("scale-95","translate-y-4"),e.classList.add("scale-100","translate-y-0")},10),document.body.style.overflow="hidden")}function ls(){const t=document.getElementById("movement-layout-detail"),e=document.getElementById("movement-modal-inner"),a=document.getElementById("mobile-bottom-nav");t&&e&&(t.classList.add("opacity-0"),e.classList.remove("scale-100","translate-y-0"),e.classList.add("scale-95","translate-y-4"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.body.style.overflow="",a&&(a.style.display="")},300))}async function Ll(){$.selectedIds.clear(),$.selectedMovementIds.clear(),$.currentTab="catalogo",$.products=null;try{const t=await De();$.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}pi(),Nl(),await Le()}function pi(){ns.innerHTML=`
        <div class="h-full flex w-full relative overflow-hidden bg-slate-50">
            <section class="flex-1 flex flex-col p-4 md:pl-6 md:pr-6 md:pt-6 w-full relative overflow-y-auto custom-scrollbar">
                
                <div class="mb-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-shrink-0 animate-fade-in-down">
                    <nav class="flex overflow-x-auto custom-scrollbar">
                        <button data-main-tab="catalogo" class="flex-1 py-4 px-6 text-xs md:text-sm font-black border-b-2 transition-colors whitespace-nowrap uppercase tracking-widest ${$.currentTab==="catalogo"?"border-indigo-600 text-indigo-600 bg-indigo-50/50":"border-transparent text-slate-500 hover:text-indigo-500 hover:bg-slate-50"}">
                            <i class="bi bi-box-seam mr-2"></i> Catálogo de Produtos
                        </button>
                        <button data-main-tab="movimentacoes" class="flex-1 py-4 px-6 text-xs md:text-sm font-black border-b-2 transition-colors whitespace-nowrap uppercase tracking-widest ${$.currentTab==="movimentacoes"?"border-indigo-600 text-indigo-600 bg-indigo-50/50":"border-transparent text-slate-500 hover:text-indigo-500 hover:bg-slate-50"}">
                            <i class="bi bi-arrow-left-right mr-2"></i> Estoque & Movimentações
                        </button>
                    </nav>
                </div>

                <div id="main-tab-content" class="flex-1 flex flex-col min-h-0 relative"></div>
            </section>
        </div>

        <div id="products-layout-detail" class="hidden fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="product-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-4xl flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
            </div>
        </div>

        <div id="movement-layout-detail" class="hidden fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="movement-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-lg flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
            </div>
        </div>
    `,Cl()}function Cl(){const t=document.getElementById("main-tab-content");if(t){if($.currentTab==="catalogo")t.innerHTML=`
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
                    <input type="text" id="searchInput" value="${$.searchQuery}" placeholder="Pesquisar produto, código..." class="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-sm font-semibold text-slate-700">
                </div>
                
                <div class="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
                    <button data-action="manage-categories" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95">
                        <i class="bi bi-tags text-base"></i> Categorias
                    </button>
                    <button id="toggle-filter-btn" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95 ${$.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                        <i class="bi bi-funnel text-base"></i> Filtros
                    </button>
                    <button data-action="open-product-editor" data-id="" class="py-2.5 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-500/30 flex items-center justify-center gap-2 text-xs active:scale-95 uppercase tracking-wider border border-indigo-500 col-span-2 md:col-span-1">
                        <i class="bi bi-plus-lg text-base pointer-events-none"></i> Novo Produto
                    </button>
                </div>
            </div>

            <div id="filter-panel" class="${$.isAdvancedFilterOpen?"block":"hidden"} mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-fade-in flex-shrink-0">
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
                <button data-status="all" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${$.stockFilter==="all"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Todos</button>
                <button data-status="ok" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${$.stockFilter==="ok"?"bg-emerald-600 text-white border-emerald-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Estoque OK</button>
                <button data-status="alert" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${$.stockFilter==="alert"?"bg-amber-500 text-white border-amber-500":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Alerta Mínimo</button>
                <button data-status="empty" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${$.stockFilter==="empty"?"bg-red-600 text-white border-red-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Esgotados</button>
            </div>

            <div id="productsList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                ${mi(8)}
            </div>

        
        `;else if($.currentTab==="movimentacoes"){const e=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const s=a.toISOString().split("T")[0],i=($.products||[]).map(r=>`<option value="${r.id}">${v(r.name)}</option>`).join(""),o=($.categories||[]).map(r=>`<option value="${r.id}">${v(r.name)}</option>`).join("");t.innerHTML=`
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
                <div class="bg-white px-5 py-4 border-b border-slate-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4 flex-shrink-0">
                    <div>
                        <h2 class="text-base font-black text-slate-800 flex items-center gap-2 uppercase tracking-wider"><i class="bi bi-arrow-left-right text-indigo-500"></i> Histórico de Estoque</h2>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Acompanhe entradas e saídas de mercadoria na rede.</p>
                    </div>
                    
                    <div class="flex items-center gap-2 w-full md:w-auto">
                        <button id="toggle-movement-filter-btn" class="flex-1 md:flex-none py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95 ${$.isMovementFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                            <i class="bi bi-funnel text-base"></i> Filtros
                        </button>
                        <button data-action="open-new-movement-modal" class="flex-1 md:flex-none py-2.5 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-colors shadow-md active:scale-95 flex items-center justify-center gap-2 text-xs uppercase tracking-wider border border-indigo-600">
                            <i class="bi bi-plus-circle text-base pointer-events-none"></i> Movimento
                        </button>
                    </div>
                </div>

                <div id="movement-filter-panel" class="${$.isMovementFilterOpen?"block":"hidden"} bg-slate-50 px-5 py-4 border-b border-slate-200 flex-shrink-0 animate-fade-in">
                    <div class="flex flex-col md:flex-row items-end gap-3">
                        <div class="w-full md:w-32">
                            <label class="block text-[9px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest ml-1">Início</label>
                            <input type="date" id="reportStartDate" value="${s}" class="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-white focus:ring-2 focus:ring-indigo-500 shadow-sm outline-none">
                        </div>
                        <div class="w-full md:w-32">
                            <label class="block text-[9px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest ml-1">Fim</label>
                            <input type="date" id="reportEndDate" value="${e}" class="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-white focus:ring-2 focus:ring-indigo-500 shadow-sm outline-none">
                        </div>
                        <div class="w-full md:w-auto flex-1">
                            <label class="block text-[9px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest ml-1">Filtrar Produto</label>
                            <select id="productFilterReport" class="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-white focus:ring-2 focus:ring-indigo-500 shadow-sm outline-none cursor-pointer">
                                <option value="all">Todos os produtos</option>${i}
                            </select>
                        </div>
                        <div class="w-full md:w-auto flex-1 hidden md:block">
                            <label class="block text-[9px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest ml-1">Categoria</label>
                            <select id="categoryFilterReport" class="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-white focus:ring-2 focus:ring-indigo-500 shadow-sm outline-none cursor-pointer">
                                <option value="all">Todas as categorias</option>${o}
                            </select>
                        </div>
                        <div class="w-full md:w-auto">
                            <button id="btn-generate-report" class="w-full md:w-auto px-6 py-2.5 bg-indigo-600 text-white font-black rounded-lg hover:bg-indigo-700 transition-colors text-xs uppercase tracking-wider shadow-md active:scale-95 flex items-center justify-center gap-2">
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
        `,document.getElementById("btn-generate-report").addEventListener("click",wa),wa()}}}async function Le(){const t=Ts();try{const e=t.map(n=>Rt(n)),a=t.map(n=>Ha(n,"products")),[s,i]=await Promise.all([Promise.all(e),Promise.all(a)]),o=new Map;s.flat().filter(Boolean).forEach(n=>o.set(n.id,n)),$.products=Array.from(o.values()),f.products=$.products;const r=new Map;i.flat().filter(Boolean).forEach(n=>r.set(n.id,n)),$.categories=Array.from(r.values()),f.categories=$.categories,$.currentTab==="catalogo"?(bi(),Ne()):$.currentTab==="movimentacoes"&&wa(),$.suppliers=[],t.forEach(async n=>{try{let l=[];typeof Ft=="function"&&(l=await Ft(n)),l.forEach(d=>{$.suppliers.find(u=>u.id===d.id)||$.suppliers.push(d)}),f.suppliers=$.suppliers}catch(l){console.warn("Aviso: Falha ao carregar fornecedores em background.",l)}})}catch(e){console.error("Erro detalhado ao carregar produtos:",e);const a=document.getElementById("productsList");a&&(a.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>')}}function bi(){const t=document.getElementById("filterCategoryId");t&&$.categories&&(t.innerHTML='<option value="all">Todas as categorias</option>',$.categories.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=v(e.name),$.filterCategoryId===e.id&&(a.selected=!0),t.appendChild(a)}))}function ds(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=$.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function $t(){const t=document.getElementById("movement-batch-action-bar"),e=document.getElementById("mov-selected-count"),a=$.selectedMovementIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function Dl(t){const e=document.getElementById("summary-section");if(!e)return;let a=t.length,s=0,i=0,o=0,r=0;t.forEach(n=>{const l=n.currentStock||0,d=n.minStock||0;n.active!==!1&&n.price&&l>0&&(r+=n.price*l),l<=0?o++:d>0&&l<=d||d>0&&l<=d*1.2?i++:s++}),e.innerHTML=`
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
    `}function Ne(){const t=document.getElementById("productsList");if(!t)return;if($.products===null){t.innerHTML=mi(8);return}const e=Ts(),a=$.products.filter(i=>{const o=i.name.toLowerCase().includes($.searchQuery)||i.sku&&i.sku.toLowerCase().includes($.searchQuery)||i.barcode&&i.barcode.toLowerCase().includes($.searchQuery),r=i.currentStock||0,n=i.minStock||0;let l=!0;$.stockFilter==="ok"&&(l=r>0&&(n===0||r>n*1.2)),$.stockFilter==="alert"&&(l=n>0&&r>0&&r<=n*1.2),$.stockFilter==="empty"&&(l=r<=0);const d=$.filterCategoryId==="all"||i.categoryId===$.filterCategoryId,u=i.accessibleIn&&i.accessibleIn.length>0?i.accessibleIn:[i.establishmentId||f.establishmentId],c=e.some(p=>u.includes(p));return o&&l&&d&&c});if(Dl(a),a.length===0){$.products.length===0?t.innerHTML=`
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
            `;return}const s=new Map(($.categories||[]).map(i=>[i.id,i.name]));t.innerHTML=a.map(i=>{const o=v(i.name),r=v(s.get(i.categoryId)||"Sem Categoria"),n=i.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(i.name.charAt(0))}`,l=i.accessibleIn?i.accessibleIn.length:1,d=$.selectedIds.has(i.id),u=i.price!==void 0?parseFloat(i.price).toFixed(2):"0.00",c=i.currentStock||0,p=i.minStock||0;let m="bg-emerald-500",b=!1,x=`<span class="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1"><i class="bi bi-box-seam"></i> ${c} un</span>`;return c<=0?(m="bg-red-500",b=!0,x='<span class="text-[9px] font-bold bg-red-50 text-red-700 px-1.5 py-0.5 rounded-md border border-red-100 flex items-center gap-1"><i class="bi bi-exclamation-triangle"></i> Sem Estoque</span>'):p>0&&c<=p*1.2&&(m="bg-amber-500",x=`<span class="text-[9px] font-bold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md border border-amber-100 flex items-center gap-1"><i class="bi bi-exclamation-circle"></i> Baixo (${c})</span>`),i.active===!1&&(b=!0,m="bg-slate-400"),`
            <div class="product-card relative bg-white rounded-2xl border ${d?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-slate-200"} shadow-sm flex items-center p-4 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 active:scale-[0.98] ${b?"opacity-70 bg-slate-50":""}" 
                 data-action="open-product-editor" data-id="${i.id}">
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" data-action-stop-propagation="true">
                    <input type="checkbox" data-id="${i.id}" class="product-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${d?"checked":""}>
                </div>

                <div class="relative flex-shrink-0 mr-4">
                    <img src="${n}" alt="${o}" class="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover border border-slate-100 shadow-sm">
                    <span class="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-2 border-white rounded-full ${m}" title="Estoque: ${c}"></span>
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
            </div>`}).join("")}function mi(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center p-4 animate-pulse h-[98px]">
            <div class="w-14 h-14 rounded-xl bg-slate-200 flex-shrink-0 mr-4"></div>
            <div class="flex-1 space-y-3">
                <div class="h-3 bg-slate-200 rounded w-3/4"></div>
                <div class="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}async function Pl(t){t.preventDefault();const e=t.target.closest("#categoryForm"),a=e.querySelector("#categoryName"),s=a.value;if(!s)return;const i=e.querySelector('button[type="submit"]');i.disabled=!0,i.innerHTML='<i class="bi bi-hourglass-split"></i>...';try{const o=$.hierarchyCache.reduce((r,n)=>(r.push(n.id),n.branches&&n.branches.forEach(l=>r.push(l.id)),r),[]);o.length===0&&o.push(f.establishmentId),await ni({establishmentId:f.establishmentId,name:s,accessibleIn:o},"products"),ne(f.establishmentId,Ue(),"Categorias (Produtos)","Criou",`Criou categoria: ${s}`),a.value="",g("Sucesso","Categoria criada!","success"),await As(),await Le()}catch(o){g("Erro",`Não foi possível criar a categoria: ${o.message}`,"error")}finally{i.disabled=!1,i.innerHTML='<i class="bi bi-plus-lg"></i>'}}async function Tl(t){if(await K("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await li(t,"products"),ne(f.establishmentId,Ue(),"Categorias (Produtos)","Excluiu",`Excluiu uma categoria (ID: ${t})`),g("Sucesso","Categoria apagada.","success"),await As(),await Le()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function As(){const t=document.getElementById("categoryList");if(t){t.innerHTML='<div class="loader mx-auto my-4 border-indigo-500"></div>';try{const e=await Ha(f.establishmentId,"products");$.categories=e,e.length>0?t.innerHTML=e.map(a=>`
                <div class="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 mb-2 shadow-sm">
                    <span class="text-xs font-black text-slate-700 uppercase tracking-widest">${v(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-white w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-600 rounded-lg transition-colors border border-red-100 active:scale-95"><i class="bi bi-trash3 pointer-events-none"></i></button>
                </div>`).join(""):t.innerHTML='<div class="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200"><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhuma categoria criada.</p></div>'}catch{t.innerHTML='<p class="text-red-500 text-center text-[10px] font-bold p-4 bg-red-50 rounded-xl">Erro ao carregar categorias.</p>'}}}function Al(){Fe({title:"Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-md"});const e=document.getElementById("genericModal");if(e){const a=e.querySelector("#categoryForm");a&&(a.addEventListener("submit",Pl),e.addEventListener("click",s=>{const i=s.target.closest('button[data-action="delete-category"]');i&&(s.preventDefault(),Tl(i.dataset.id))}))}As()}function Bl(){const t=($.products||[]).map(r=>`<option value="${r.id}">${v(r.name)} (Estoque: ${r.currentStock||0})</option>`).join(""),e=$.hierarchyCache.reduce((r,n)=>(r.push(`<option value="${n.id}">🏢 ${v(n.name)}</option>`),n.branches&&n.branches.forEach(l=>r.push(`<option value="${l.id}">📍 ${v(l.name)}</option>`)),r),[]).join(""),a=document.getElementById("movement-modal-inner"),s=`
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
    `;a.innerHTML=s,$l();const i=document.getElementById("movEstablishmentId");i&&(i.value=f.establishmentId);const o=document.getElementById("newMovementForm");o.onsubmit=async r=>{r.preventDefault();const n=a.querySelector('button[type="submit"]'),l=n.innerHTML,d=document.getElementById("movProductId")?.value,u=document.getElementById("movEstablishmentId")?.value,c=o.querySelector('input[name="movType"]:checked')?.value,p=parseInt(document.getElementById("movAmount")?.value,10),m=document.getElementById("movReason")?.value.trim();if(!d||!p||p<=0||!m||!u){g("Erro","Preencha todos os campos corretamente.","warning");return}const b=c==="in"?p:-p;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> Salvando...';try{await Ls(d,{change:b,reason:m,establishmentId:u});const x=$.products.find(y=>y.id===d)?.name||"Produto";ne(u,Ue(),"Estoque","Ajuste Manual",`Lançou movimentação (${b>0?"+":""}${b}) para ${x}`),g("Sucesso","Movimentação registrada com sucesso!","success"),ls(),await Le()}catch(x){g("Erro",x.message,"error"),n.disabled=!1,n.innerHTML=l}}}function Ml(t=[]){if(!$.hierarchyCache||$.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${f.establishmentId}">
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 text-center">
                <i class="bi bi-info-circle text-2xl block mb-2 text-slate-400"></i> Exclusivo desta unidade.
            </div>`;let e='<div class="space-y-2 mt-1 max-h-48 overflow-y-auto custom-scrollbar pr-2">';return $.hierarchyCache.forEach(a=>{const s=t.includes(a.id)||t.length===0&&a.id===f.establishmentId;e+=`
            <label class="flex items-center space-x-3 p-3 cursor-pointer bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-colors shadow-sm">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-xs md:text-sm font-black text-slate-800">🏢 ${v(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(i=>{const o=t.includes(i.id)||t.length===0&&i.id===f.establishmentId;e+=`
                    <label class="flex items-center space-x-3 p-3 ml-8 cursor-pointer bg-white hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl transition-colors border-l-4 border-l-indigo-200 shadow-sm">
                        <input type="checkbox" name="accessibleIn" value="${i.id}" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                        <span class="text-xs font-bold text-slate-600">📍 ${v(i.name)}</span>
                    </label>
                `})}),e+="</div>",e}function jl(t){$.viewMode="edit-product";const e=document.getElementById("product-modal-inner");if(!e)return;let a={name:"",active:!0,price:0,costPrice:0,currentStock:0,minStock:0,maxStock:0,supplierIds:[]};if(t){const C=$.products?.find(M=>String(M.id)===String(t));C&&(a=JSON.parse(JSON.stringify(C)))}$.tempProduct=a,$.tempSupplierIds=new Set(a.supplierIds||[]);const s=!!a.id,i=$.categories||[],o=v(a.name||""),r=v(a.sku||""),n=v(a.barcode||""),l=v(a.description||""),d=s?o:"Novo Produto",u=a.price!==void 0?a.price:"",c=a.costPrice!==void 0?a.costPrice:"",p=a.commissionRate!==void 0?a.commissionRate:"",m=a.currentStock||0,b=a.minStock||0;a.maxStock;const x=i.map(C=>`<option value="${C.id}" ${a.categoryId===C.id?"selected":""}>${v(C.name)}</option>`).join(""),y=a.photo||`https://placehold.co/150x150/E2E8F0/4A5568?text=${encodeURIComponent(o?o.charAt(0):"P")}`,I=`
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
        ${I}
        
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
                                        <input type="number" id="productCurrentStock" value="${m}" readonly class="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-100 font-black text-center text-xl text-slate-700 cursor-not-allowed shadow-inner" title="Para alterar, use a aba Movimentações">
                                    </div>
                                    <div class="form-group">
                                        <label for="productMinStock" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Mínimo (Alerta)</label>
                                        <input type="number" id="productMinStock" value="${b}" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner text-center text-lg">
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
                                ${Ml(a.accessibleIn||[])}
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
    `,e.querySelectorAll(".tab-link").forEach(C=>{C.addEventListener("click",M=>{M.preventDefault(),e.querySelectorAll(".tab-link").forEach(H=>{H.classList.remove("active","border-indigo-600","text-indigo-600"),H.classList.add("border-transparent","text-slate-400")}),C.classList.add("active","border-indigo-600","text-indigo-600"),C.classList.remove("border-transparent","text-slate-400"),e.querySelectorAll(".tab-content").forEach(H=>H.classList.add("hidden")),e.querySelector("#"+C.dataset.tab).classList.remove("hidden")})});const S=()=>{const C=document.getElementById("modalSupplierSearch"),M=document.getElementById("supplierSearchResults"),H=document.getElementById("selectedSuppliersList"),B=C?.value.toLowerCase()||"",G=$.suppliers||[];if(B.length>0){const Y=G.filter(Q=>Q.name.toLowerCase().includes(B)&&!$.tempSupplierIds.has(Q.id));Y.length>0?(M.classList.remove("hidden"),M.innerHTML=Y.map(Q=>`
                    <div class="p-3.5 hover:bg-indigo-50 cursor-pointer border-b border-slate-100 last:border-0 flex justify-between items-center transition-colors" data-add-supplier="${Q.id}">
                        <span class="font-bold text-xs text-slate-700 uppercase tracking-widest">${v(Q.name)}</span>
                        <span class="text-indigo-600 text-[10px] font-black px-2 py-1 bg-indigo-100 rounded-md uppercase tracking-widest pointer-events-none">+ Adicionar</span>
                    </div>
                `).join("")):(M.classList.remove("hidden"),M.innerHTML='<div class="p-4 text-xs font-bold text-slate-500 text-center uppercase tracking-widest">Fornecedor não encontrado.</div>')}else M&&M.classList.add("hidden");$.tempSupplierIds.size>0?(H.classList.remove("justify-center"),H.classList.add("justify-start"),H.innerHTML="",$.tempSupplierIds.forEach(Y=>{const Q=G.find(T=>T.id===Y);Q&&(H.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border border-slate-200 p-3.5 rounded-xl shadow-sm hover:border-indigo-200 transition-colors" data-id="${Q.id}">
                            <div>
                                <p class="font-black text-slate-800 text-xs uppercase tracking-widest mb-1">${v(Q.name)}</p>
                                <p class="text-[9px] font-bold text-slate-500 uppercase tracking-widest"><i class="bi bi-person mr-1"></i> ${v(Q.contactName||"N/I")} | <i class="bi bi-telephone mr-1"></i> ${v(Q.phone||"N/I")}</p>
                            </div>
                            <button type="button" class="text-slate-400 hover:text-red-600 w-10 h-10 flex items-center justify-center hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 active:scale-95" data-remove-supplier="${Q.id}" title="Remover">
                                <i class="bi bi-trash3 pointer-events-none"></i>
                            </button>
                        </div>
                    `)})):(H.classList.add("justify-center"),H.classList.remove("justify-start"),H.innerHTML='<p class="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest">Nenhum fornecedor adicionado ainda.</p>')},L=document.getElementById("modalSupplierSearch");L&&L.addEventListener("input",S),S();const q=e.querySelector("#productPhotoInput"),N=e.querySelector("#productPhotoButton"),F=e.querySelector("#productPhotoContainer"),D=e.querySelector("#productPhotoPreview"),k=e.querySelector("#productPhotoBase64"),O=()=>q?.click();N&&N.addEventListener("click",O),F&&F.addEventListener("click",O),q&&(q.onchange=async()=>{const C=q.files[0];if(!C)return;const M=D.src;D.src="https://placehold.co/150x150/E2E8F0/4A5568?text=...";try{const H=await Pa(C,800,800,.8);if(H.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");D.src=H,k.value=H}catch(H){g("Erro de Imagem",H.message,"error"),D.src=M,k.value=a?.photo||""}});const _=document.getElementById("productForm");_&&(_.onsubmit=async C=>{C.preventDefault();const M=e.querySelector('button[type="submit"]'),H=M.innerHTML,B=document.getElementById("productName"),G=document.getElementById("productPrice");if(!B?.value||!G?.value){g("Aviso","Preencha o Nome e o Preço do produto.","warning");return}const Y=parseInt(document.getElementById("productCurrentStock")?.value||"0",10),Q=parseInt(document.getElementById("productMinStock")?.value||"0",10),T=Array.from(document.querySelectorAll('#productForm input[name="accessibleIn"]:checked')).map(J=>J.value),X=T.length>0?T:[f.establishmentId],ie={...$.tempProduct,establishmentId:f.establishmentId,accessibleIn:X,name:B.value.trim(),sku:document.getElementById("productSku")?.value.trim()||"",barcode:document.getElementById("productBarcode")?.value.trim()||"",price:parseFloat(G.value),costPrice:parseFloat(document.getElementById("productCostPrice")?.value)||0,commissionRate:parseFloat(document.getElementById("productCommissionRate")?.value)||0,currentStock:isNaN(Y)?0:Y,minStock:isNaN(Q)?0:Q,categoryId:document.getElementById("productCategory")?.value||null,photo:document.getElementById("productPhotoBase64")?.value||"",description:document.getElementById("productDescription")?.value.trim()||"",active:document.getElementById("productStatusToggle")?.checked!==!1,supplierIds:Array.from($.tempSupplierIds)};M.disabled=!0,M.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> A gravar...';try{s?(await Cn(t,ie),ne(f.establishmentId,Ue(),"Produtos","Editou",`Editou o produto: ${ie.name}`),g("Sucesso","Produto atualizado com sucesso!","success")):(delete ie.id,await Ln(ie),ne(f.establishmentId,Ue(),"Produtos","Criou",`Criou novo produto: ${ie.name}`),g("Sucesso","Produto adicionado à rede!","success")),da(),await Le()}catch(J){g("Erro",J.message,"error"),M.disabled=!1,M.innerHTML=H}}),El()}async function ql(){if(!($.selectedIds.size===0||!await K("Excluir Produtos",`Tem a certeza que deseja excluir ${$.selectedIds.size} produtos do seu inventário?`)))try{const e=Array.from($.selectedIds).map(a=>si(a));await Promise.all(e),g("Sucesso","Produtos excluídos com sucesso.","success"),$.selectedIds.clear(),ds(),await Le()}catch(e){g("Erro","Não foi possível apagar os produtos: "+e.message,"error")}}async function Fl(){if(!($.selectedMovementIds.size===0||!await K("Estornar e Excluir",`Deseja excluir as ${$.selectedMovementIds.size} movimentações selecionadas? O saldo de stock será estornado/devolvido ao sistema automaticamente.`)))try{const e=Array.from($.selectedMovementIds).map(async a=>{const s=$.allMovements.find(i=>i.id===a);s&&await Ls(s.productId,{change:-s.change,reason:"Estorno automático de exclusão em lote",establishmentId:s.establishmentId})});await Promise.all(e),g("Sucesso","Movimentações excluídas e stocks estornados.","success"),$.selectedMovementIds.clear(),$t(),wa()}catch(e){g("Erro","Ocorreu um erro ao estornar em lote: "+e.message,"error")}}async function wa(){const t=document.getElementById("report-results");if(!t)return;t.innerHTML='<div class="flex items-center justify-center h-full"><div class="loader"></div></div>',$.selectedMovementIds.clear(),$t();const e={startDate:document.getElementById("reportStartDate")?.value||"",endDate:document.getElementById("reportEndDate")?.value||"",productId:document.getElementById("productFilterReport")?.value||"all",categoryId:document.getElementById("categoryFilterReport")?.value||"all"};try{const s=Ts().map(n=>Dn({...e,establishmentId:n}).catch(l=>[])),i=await Promise.all(s);let o=[];if(i.forEach(n=>{if(!n)return;const l=Array.isArray(n)?n:Array.isArray(n.data)?n.data:Array.isArray(n.movements)?n.movements:[];o=o.concat(l)}),o.sort((n,l)=>Wa(l.date)-Wa(n.date)),$.allMovements=o,o.length===0){t.innerHTML=`
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
                        ${o.map(n=>{const l=n.change>0,d=l?"text-emerald-700 bg-emerald-50 border-emerald-200":"text-red-700 bg-red-50 border-red-200",u=l?'<i class="bi bi-arrow-down-left"></i>':'<i class="bi bi-arrow-up-right"></i>',c=$.selectedMovementIds.has(n.id),p=c?"bg-indigo-50/30":"hover:bg-slate-50/50",m=Wa(n.date),b=m.toLocaleDateString("pt-BR"),x=m.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});return`
                            <tr class="transition-colors ${p}">
                                <td class="px-5 py-3 w-10 text-center">
                                    <input type="checkbox" class="movement-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" data-id="${n.id}" ${c?"checked":""}>
                                </td>
                                <td class="px-5 py-3 whitespace-nowrap">
                                    <p class="text-xs font-black text-slate-700">${b}</p>
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
            </div>`;t.innerHTML=r}catch(a){g("Erro",`Não foi possível gerar: ${a.message}`,"error"),t.innerHTML='<div class="p-8 text-center text-red-500 font-bold bg-red-50 rounded-xl m-4 border border-red-100">Falha ao buscar movimentações.</div>'}}function Nl(){const t=document.getElementById("multi-context-apply");t&&(t.removeEventListener("click",Le),t.addEventListener("click",()=>{setTimeout(Le,100)})),Jt&&document.body.removeEventListener("click",Jt),Gt&&ns.removeEventListener("input",Gt),Jt=async e=>{const a=e.target.closest("[data-main-tab]");if(a){$.currentTab=a.dataset.mainTab,pi(),$.currentTab==="catalogo"&&$.products!==null&&(bi(),Ne());return}if(e.target.classList.contains("product-checkbox")){const p=e.target.dataset.id;e.target.checked?$.selectedIds.add(p):$.selectedIds.delete(p),ds(),e.stopPropagation();return}if(e.target.closest("#cancel-selection-btn")){$.selectedIds.clear(),ds(),Ne();return}if(e.target.classList.contains("movement-checkbox")){const p=e.target.dataset.id;e.target.checked?$.selectedMovementIds.add(p):$.selectedMovementIds.delete(p),$t();const m=e.target.closest("tr");e.target.checked?(m.classList.add("bg-indigo-50/30"),m.classList.remove("hover:bg-slate-50/50")):(m.classList.remove("bg-indigo-50/30"),m.classList.add("hover:bg-slate-50/50")),e.stopPropagation();return}if(e.target.id==="selectAllMovements"){const p=document.querySelectorAll(".movement-checkbox"),m=e.target.checked;p.forEach(b=>{b.checked=m;const x=b.dataset.id;m?$.selectedMovementIds.add(x):$.selectedMovementIds.delete(x);const y=b.closest("tr");m?(y.classList.add("bg-indigo-50/30"),y.classList.remove("hover:bg-slate-50/50")):(y.classList.remove("bg-indigo-50/30"),y.classList.add("hover:bg-slate-50/50"))}),$t(),e.stopPropagation();return}if(e.target.closest("#cancel-mov-selection-btn")){$.selectedMovementIds.clear(),$t();const p=document.getElementById("selectAllMovements");p&&(p.checked=!1),document.querySelectorAll(".movement-checkbox").forEach(m=>{m.checked=!1;const b=m.closest("tr");b.classList.remove("bg-indigo-50/30"),b.classList.add("hover:bg-slate-50/50")});return}const o=e.target.closest(".status-filter-btn");if(o){$.stockFilter=o.dataset.status,document.querySelectorAll(".status-filter-btn").forEach(p=>{p.classList.remove("bg-indigo-600","text-white","border-indigo-600","bg-emerald-600","border-emerald-600","bg-amber-500","border-amber-500","bg-red-600","border-red-600"),p.classList.add("bg-white","text-slate-600","border-slate-200")}),$.stockFilter==="ok"?o.classList.add("bg-emerald-600","text-white","border-emerald-600"):$.stockFilter==="alert"?o.classList.add("bg-amber-500","text-white","border-amber-500"):$.stockFilter==="empty"?o.classList.add("bg-red-600","text-white","border-red-600"):o.classList.add("bg-indigo-600","text-white","border-indigo-600"),o.classList.remove("bg-white","text-slate-600","border-slate-200"),Ne();return}if(e.target.id==="clear-filters-btn"){e.preventDefault(),document.getElementById("filterCategoryId").value="all",$.filterCategoryId="all",Ne();return}if(e.target.id==="apply-filter-btn"){e.preventDefault(),$.filterCategoryId=document.getElementById("filterCategoryId").value,Ne();return}const r=e.target.closest("#toggle-filter-btn");if(r){e.preventDefault(),$.isAdvancedFilterOpen=!$.isAdvancedFilterOpen;const p=document.getElementById("filter-panel");$.isAdvancedFilterOpen?(p.classList.remove("hidden"),p.classList.add("block"),r.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.classList.remove("bg-white","text-slate-700","border-slate-200")):(p.classList.add("hidden"),p.classList.remove("block"),r.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),r.classList.add("bg-white","text-slate-700","border-slate-200"));return}const n=e.target.closest("#toggle-movement-filter-btn");if(n){e.preventDefault(),$.isMovementFilterOpen=!$.isMovementFilterOpen;const p=document.getElementById("movement-filter-panel");$.isMovementFilterOpen?(p.classList.remove("hidden"),p.classList.add("block"),n.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),n.classList.remove("bg-white","text-slate-700","border-slate-200")):(p.classList.add("hidden"),p.classList.remove("block"),n.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),n.classList.add("bg-white","text-slate-700","border-slate-200"));return}if(e.target.id==="products-layout-detail"){da();return}if(e.target.id==="movement-layout-detail"){ls();return}const l=e.target.closest("[data-add-supplier]");if(l){$.tempSupplierIds.add(l.dataset.addSupplier);const p=document.getElementById("modalSupplierSearch");p&&(p.value=""),p.dispatchEvent(new Event("input"));return}const d=e.target.closest("[data-remove-supplier]");if(d){$.tempSupplierIds.delete(d.dataset.removeSupplier);const p=document.getElementById("modalSupplierSearch");p&&p.dispatchEvent(new Event("input"));return}const u=e.target.closest("[data-action]");if(!u)return;const c=u.dataset.action;switch(["close-detail-screen","close-movement-modal","delete-product","manage-categories","open-product-editor","batch-delete","open-new-movement-modal","batch-delete-movements"].includes(c)&&e.stopPropagation(),c){case"manage-categories":Al();break;case"open-product-editor":jl(u.dataset.id);break;case"close-detail-screen":da();break;case"close-movement-modal":ls();break;case"batch-delete":ql();break;case"batch-delete-movements":Fl();break;case"open-new-movement-modal":Bl();break;case"delete-movement":{const p=u.dataset.id,m=u.dataset.productId,b=u.dataset.estId;if(!p)return;const x=$.allMovements.find(I=>I.id===p);if(!x){g("Aviso","Não foi possível ler os detalhes desta movimentação.","warning");return}if(await K("Estornar e Apagar Movimentação","Tem a certeza que deseja excluir esta movimentação? O saldo de stock será devolvido ao produto de forma automática."))try{throw await Ls(m,{change:-x.change,reason:"Estorno automático de exclusão de movimento",establishmentId:b}),new Error("A função de excluir movimentação ainda não está implementada no servidor.");ne(f.establishmentId,Ue(),"Estoque","Excluiu Movimento",`Excluiu e estornou a movimentação ID: ${p}`),g("Sucesso","Movimentação excluída e saldo de stock estornado.","success"),await Le()}catch(I){g("Erro",I.message,"error")}break}case"delete-product":{const p=u.dataset.id;if(!p)return;if(await K("Apagar Produto","Tem certeza que deseja excluir este produto do estoque?"))try{const b=$.products.find(x=>x.id===p)?.name||"Desconhecido";await si(p),ne(f.establishmentId,Ue(),"Produtos","Excluiu",`Excluiu o produto: ${b}`),g("Sucesso","Produto removido do estoque.","success"),da(),await Le()}catch(b){g("Erro",`Não foi possível apagar o produto: ${b.message}`,"error")}break}}},document.body.addEventListener("click",Jt),Gt=e=>{e.target.id==="searchInput"&&($.searchQuery=e.target.value,Ne())},ns.addEventListener("input",Gt)}const ca=document.getElementById("content");let Z={partners:[],establishments:[],searchQuery:"",categoryFilter:"all",stateFilter:"all",cityFilter:"",sortBy:"name_asc",hasSearched:!1,viewMode:"list",editingItem:null},Qt=null;const ka={contas_fixas:{label:"Contas Fixas (Água, Luz)",color:"blue",icon:"bi-lightning-charge"},estoque:{label:"Fornecedor de Produtos",color:"emerald",icon:"bi-box-seam"},servicos:{label:"Prestador de Serviço",color:"purple",icon:"bi-tools"},impostos:{label:"Governo / Impostos",color:"red",icon:"bi-bank"},outros:{label:"Outros Parceiros",color:"gray",icon:"bi-person-vcard"}},gi=["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];async function Rl(){try{const e=(await De()).matrizes||[];Z.establishments=[],e.forEach(a=>{Z.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>Z.establishments.push({id:s.id,name:s.name,type:"Filial"}))})}catch(t){console.warn("Erro ao buscar lojas",t)}Z.viewMode="list",Z.editingItem=null,Z.hasSearched=!1,Z.partners=[],Hl(),Wl(),fi()}function Hl(){ca.innerHTML=`
        <div class="flex flex-col h-full bg-gray-50 w-full relative min-h-0 overflow-hidden">
            
            <div id="suppliers-list-view" class="w-full h-full flex flex-col transition-all duration-300 ${Z.viewMode==="list"?"flex":"hidden"} p-2 md:p-4 md:pl-6 relative">
                
                <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full animate-fade-in">
                    <div></div> <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                        <button data-action="new-partner" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                            <i class="bi bi-plus-lg"></i> Novo Parceiro
                        </button>
                    </div>
                </div>

                ${Ol()}

                <div class="flex-1 flex flex-col min-h-0 w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
                    <div id="partners-grid" class="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-2">
                    </div>
                </div>
            </div>

            <div id="suppliers-form-view" class="w-full h-full overflow-y-auto custom-scrollbar transition-all duration-300 ${Z.viewMode==="form"?"block":"hidden"} p-2 md:p-4 md:pl-6">
                <div id="form-container-wrapper" class="max-w-4xl mx-auto w-full">
                </div>
            </div>

        </div>
    `}function Ol(){const t=Object.entries(ka).map(([a,s])=>`<option value="${a}">${s.label}</option>`).join(""),e=gi.map(a=>`<option value="${a}">${a}</option>`).join("");return`
        <div class="flex flex-col md:flex-row items-start md:items-center gap-2 mb-3 w-full animate-fade-in bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
            
            <div class="relative flex-shrink-0 w-full md:w-64">
                <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                <input type="text" id="filterSearch" placeholder="Nome, CNPJ, Email..." value="${Z.searchQuery}" class="w-full pl-8 p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
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

                <input type="text" id="filterCity" placeholder="Cidade" value="${Z.cityFilter}" class="w-full md:w-32 p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all flex-shrink-0">
                
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
    `}function zl(t=null){const e=!!t;let a=t?.category||"";a==="Produtos"&&(a="estoque"),a==="Serviços"&&(a="servicos");const s=Object.entries(ka).map(([r,n])=>`<option value="${r}" ${a===r?"selected":""}>${n.label}</option>`).join(""),i=gi.map(r=>`<option value="${r}" ${t?.state===r?"selected":""}>${r}</option>`).join(""),o=document.getElementById("form-container-wrapper");o&&(o.innerHTML=`
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
    `,document.getElementById("partner-form").addEventListener("submit",Vl))}function fi(){const t=document.getElementById("partners-grid");t&&(t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-xl w-full max-w-2xl mx-auto shadow-sm mt-4">
                <div class="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3 border border-indigo-100 shadow-inner">
                    <i class="bi bi-search text-xl text-indigo-400"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-800 mb-1">Pronto para pesquisar</h3>
                <p class="text-[10px] text-gray-500 font-medium max-w-sm text-center">Utilize os filtros acima e clique em "Buscar" para listar os parceiros registados no sistema.</p>
            </div>
        `)}async function _l(){const t=document.getElementById("partners-grid");if(!Z.hasSearched){fi();return}t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="text-xs text-gray-500 mt-4 font-medium">Buscando parceiros...</p></div>';try{const e=await Ft(f.establishmentId);Z.partners=e||[],xi()}catch(e){t.innerHTML=`<div class="text-center py-10 text-red-500 text-sm font-bold">Erro ao carregar parceiros: ${e.message}</div>`}}function xi(){const t=document.getElementById("partners-grid");if(!t)return;let e=Z.partners;if(Z.searchQuery){const i=Z.searchQuery.toLowerCase();e=e.filter(o=>o.name.toLowerCase().includes(i)||o.document&&o.document.includes(i)||o.taxId&&o.taxId.includes(i)||o.email&&o.email.toLowerCase().includes(i)||o.contactName&&o.contactName.toLowerCase().includes(i))}if(Z.categoryFilter!=="all"&&(e=e.filter(i=>i.category===Z.categoryFilter)),Z.stateFilter!=="all"&&(e=e.filter(i=>i.state===Z.stateFilter)),Z.cityFilter){const i=Z.cityFilter.toLowerCase();e=e.filter(o=>o.city&&o.city.toLowerCase().includes(i))}if(e.sort((i,o)=>{let r="",n="";return Z.sortBy==="name_asc"||Z.sortBy==="name_desc"?(r=(i.name||"").toLowerCase(),n=(o.name||"").toLowerCase()):Z.sortBy==="contact_asc"&&(r=(i.contactName||"").toLowerCase(),n=(o.contactName||"").toLowerCase()),Z.sortBy==="name_desc"?n.localeCompare(r):r.localeCompare(n)}),e.length===0){t.innerHTML=`
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
    `,s='<div class="flex flex-col gap-2 md:hidden p-2">';e.forEach(i=>{let o=i.category;o==="Produtos"&&(o="estoque"),o==="Serviços"&&(o="servicos");const r=ka[o]||ka.outros,n=i.document||i.taxId?i.document||i.taxId:"-",l=JSON.stringify(i).replace(/'/g,"&apos;"),d=[i.city,i.state].filter(Boolean).join(" - ");a+=`
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
        `}),a+="</tbody></table></div>",s+="</div>",t.innerHTML=a+s}function Lt(t,e=null){const a=document.getElementById("suppliers-list-view"),s=document.getElementById("suppliers-form-view");Z.viewMode=t,Z.editingItem=e,t==="list"?(a.classList.remove("hidden"),a.classList.add("flex"),s.classList.add("hidden"),s.innerHTML='<div id="form-container-wrapper" class="max-w-4xl mx-auto w-full"></div>',Z.hasSearched&&xi(),window.scrollTo({top:0,behavior:"smooth"})):(a.classList.add("hidden"),a.classList.remove("flex"),s.classList.remove("hidden"),zl(e),window.scrollTo({top:0,behavior:"smooth"}))}async function Vl(t){t.preventDefault();const e=t.target,a=e.querySelector("#supId").value,s={name:e.querySelector("#supName").value,contactName:e.querySelector("#supContact").value,email:e.querySelector("#supEmail").value,phone:e.querySelector("#supPhone").value,document:e.querySelector("#supTaxId").value,category:e.querySelector("#supCategory").value,state:e.querySelector("#supState").value,city:e.querySelector("#supCity").value,establishmentId:f.establishmentId,notes:e.querySelector("#supNotes")?.value||"",accessibleIn:[f.establishmentId]},i=e.querySelector('button[type="submit"]'),o=i.innerHTML;i.disabled=!0,i.innerHTML='<div class="loader-small border-white"></div> A gravar...';try{a?(await Il(a,s),g("Sucesso","Ficha atualizada!","success")):(await kl(s),g("Sucesso","Parceiro registado!","success")),Z.hasSearched&&(Z.partners=await Ft(f.establishmentId)||[]),Lt("list")}catch(r){g("Erro","Falha ao gravar: "+r.message,"error"),i.disabled=!1,i.innerHTML=o}}async function Ul(t){if(await K("Excluir Parceiro","Deseja realmente apagar esta ficha permanentemente?"))try{await Sl(t),g("Sucesso","Entidade excluída.","success"),Z.partners=Z.partners.filter(a=>a.id!==t),Lt("list")}catch(a){g("Erro","Erro ao excluir: "+a.message,"error")}}function Wl(){Qt&&ca.removeEventListener("click",Qt),Qt=async t=>{const e=t.target;if(e.closest('button[data-action="new-partner"]')){Lt("form",null);return}if(e.closest("#btn-search-partners")){Z.searchQuery=document.getElementById("filterSearch").value,Z.categoryFilter=document.getElementById("filterCategory").value,Z.stateFilter=document.getElementById("filterState").value,Z.cityFilter=document.getElementById("filterCity").value,Z.sortBy=document.getElementById("filterSortBy").value,Z.hasSearched=!0,_l();return}if(e.closest('button[data-action="back-to-list"]')){Lt("list");return}const a=e.closest('button[data-action="delete-partner"]');if(a){t.preventDefault(),Ul(a.dataset.id);return}const s=e.closest('[data-action="open-form"]');if(s&&!e.closest("button")){const i=JSON.parse(s.dataset.item.replace(/&apos;/g,"'"));Lt("form",i)}},ca.addEventListener("click",Qt),ca.addEventListener("keypress",t=>{t.key==="Enter"&&(t.target.id==="filterSearch"||t.target.id==="filterCity")&&document.getElementById("btn-search-partners").click()})}const cs=document.getElementById("content"),Ks={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let W={professionals:null,services:[],hierarchyCache:[],statusFilter:"all",searchQuery:"",filterServiceId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set,viewMode:"list",tempProf:null},Yt=null,Xt=null;function ua(){const t=ke.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function hi(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[f.establishmentId]}function Jl(){const t=document.getElementById("professionals-layout-detail"),e=document.getElementById("prof-modal-inner");t&&e&&(t.classList.remove("hidden"),t.classList.add("flex"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("scale-95","translate-y-4"),e.classList.add("scale-100","translate-y-0")},10),document.body.style.overflow="hidden")}function Zt(){const t=document.getElementById("professionals-layout-detail"),e=document.getElementById("prof-modal-inner");t&&e&&(t.classList.add("opacity-0"),e.classList.remove("scale-100","translate-y-0"),e.classList.add("scale-95","translate-y-4"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.body.style.overflow=""},300)),W.viewMode="list"}async function Gl(){W.selectedIds.clear(),W.viewMode="list",W.professionals=null;try{const t=await De();W.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}Ql(),id(),await Ia()}function Ql(){cs.innerHTML=`
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
                        <input type="text" id="searchInput" value="${W.searchQuery}" placeholder="Nome ou especialidade..." class="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-sm font-semibold text-slate-700">
                    </div>
                    
                    <div class="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
                        <button id="toggle-filter-btn" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95 ${W.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                            <i class="bi bi-funnel text-base"></i> Filtros
                        </button>
                        <button data-action="open-professional-editor" data-id="" class="py-2.5 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-500/30 flex items-center justify-center gap-2 text-xs active:scale-95 uppercase tracking-wider border border-indigo-500">
                            <i class="bi bi-person-plus-fill text-base"></i> Criar Perfil
                        </button>
                    </div>
                </div>

                <div id="filter-panel" class="${W.isAdvancedFilterOpen?"block":"hidden"} mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
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
                    <button data-status="all" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${W.statusFilter==="all"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Todos</button>
                    <button data-status="active" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${W.statusFilter==="active"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Ativos</button>
                    <button data-status="inactive" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${W.statusFilter==="inactive"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Inativos</button>
                </div>

                <div id="professionalsList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                    ${yi(8)}
                </div>
            </section>
        </div>

        <div id="professionals-layout-detail" class="hidden fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="prof-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-5xl flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
                </div>
        </div>
    `}async function Ia(){const t=document.getElementById("professionalsList"),e=hi();try{const a=e.map(l=>Pe(l)),s=e.map(l=>Je(l)),i=await Promise.all(a),o=await Promise.all(s),r=new Map;i.flat().forEach(l=>r.set(l.id,l)),W.professionals=Array.from(r.values()),f.professionals=W.professionals;const n=new Map;o.flat().forEach(l=>n.set(l.id,l)),W.services=Array.from(n.values()),Yl(),kt()}catch(a){console.error(a),t&&(t.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>')}}function Yl(){const t=document.getElementById("filterServiceId");t&&W.services&&(t.innerHTML='<option value="all">Todos os serviços</option>',W.services.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=v(e.name),W.filterServiceId===e.id&&(a.selected=!0),t.appendChild(a)}))}function vi(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=W.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function Xl(t){const e=document.getElementById("summary-section");if(!e)return;const a=t.length,s=t.filter(o=>o.status!=="inactive").length,i=a-s;e.innerHTML=`
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
    `}function kt(){const t=document.getElementById("professionalsList");if(!t)return;if(W.professionals===null){t.innerHTML=yi(8);return}const e=hi(),a=W.professionals.filter(s=>{const i=s.name.toLowerCase().includes(W.searchQuery)||s.specialty&&s.specialty.toLowerCase().includes(W.searchQuery);let o=!0;W.statusFilter==="active"&&(o=s.status!=="inactive"),W.statusFilter==="inactive"&&(o=s.status==="inactive");const r=W.filterServiceId==="all"||s.services&&s.services.includes(W.filterServiceId),n=s.accessibleIn&&s.accessibleIn.length>0?s.accessibleIn:[s.establishmentId||f.establishmentId],l=e.some(d=>n.includes(d));return i&&o&&r&&l});if(Xl(a),a.length===0){W.professionals.length===0?t.innerHTML=`
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
            `;return}t.innerHTML=a.map(s=>{const i=s.status==="inactive",o=v(s.name),r=v(s.specialty||"Especialidade"),n=s.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(s.name?s.name.charAt(0):"P")}`,l=s.accessibleIn?s.accessibleIn.length:1,d=s.services?s.services.length:0,u=W.selectedIds.has(s.id);return`
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
            </div>`}).join("")}function yi(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center p-4 animate-pulse h-[98px]">
            <div class="w-14 h-14 rounded-full bg-slate-200 flex-shrink-0 mr-4"></div>
            <div class="flex-1 space-y-3">
                <div class="h-3 bg-slate-200 rounded w-3/4"></div>
                <div class="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}async function Zl(t){W.viewMode="edit-professional";const e=document.getElementById("prof-modal-inner");if(!e)return;let a={name:"",specialty:"",status:"active",workingHours:{},services:[]};if(t){const r=W.professionals.find(n=>String(n.id)===String(t));r&&(a=JSON.parse(JSON.stringify(r)))}W.tempProf=a;const s=!!a.id,i=v(a.name||"Novo Profissional"),o=`
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
    `,Kl(a,W.services),td(a),await sd(a,W.professionals),od(a),Jl()}function Kl(t,e){const a=document.getElementById("dados-basicos"),s=document.getElementById("atuacao");if(!a||!s)return;const i=t.dob?t.dob.split("/"):["",""],o=Array.from({length:12},(u,c)=>{const p=c+1,m=p==i[1]?"selected":"",b=new Date(0,c).toLocaleString("pt-BR",{month:"long"});return`<option value="${p}" ${m}>${b.charAt(0).toUpperCase()+b.slice(1)}</option>`}).join(""),r=v(t.name||""),n=v(t.specialty||""),l=v(t.phone||""),d=v(t.notes||"");a.innerHTML=`
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
                    ${ed(t.accessibleIn||[])}
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
    `}function ed(t=[]){if(!W.hierarchyCache||W.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${f.establishmentId}">
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 text-center">
                <i class="bi bi-info-circle text-2xl block mb-2 text-slate-400"></i> Exclusivo desta unidade.
            </div>`;let e='<div class="space-y-2 mt-1">';return W.hierarchyCache.forEach(a=>{const s=t.includes(a.id)||t.length===0&&a.id===f.establishmentId;e+=`
            <label class="flex items-center space-x-3 p-3 cursor-pointer bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-colors shadow-sm">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-xs md:text-sm font-black text-slate-800">🏢 ${v(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(i=>{const o=t.includes(i.id)||t.length===0&&i.id===f.establishmentId;e+=`
                    <label class="flex items-center space-x-3 p-3 ml-8 cursor-pointer bg-white hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl transition-colors border-l-4 border-l-indigo-200 shadow-sm">
                        <input type="checkbox" name="accessibleIn" value="${i.id}" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                        <span class="text-xs font-bold text-slate-600">📍 ${v(i.name)}</span>
                    </label>
                `})}),e+="</div>",e}function td(t){const e=document.getElementById("jornada");e&&(e.innerHTML=`
        <div class="bg-white p-5 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div class="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div class="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100"><i class="bi bi-clock-history text-2xl"></i></div>
                <div>
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-0.5">Jornada Semanal</h3>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Defina os dias e os horários de atendimento.</p>
                </div>
            </div>
            <div id="profScheduleContainer" class="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
        </div>`,ad(e.querySelector("#profScheduleContainer"),t.workingHours||{}))}function ad(t,e){t.innerHTML=Object.keys(Ks).map(a=>{const s=e[a]||{},i=s.active!==!1;return`
            <div class="day-schedule-card p-4 md:p-5 rounded-2xl ${i?"bg-white border-slate-200 shadow-sm":"bg-slate-50 border-slate-100 disabled opacity-60"} border transition-all">
                 <div class="flex justify-between items-center mb-4">
                    <span class="font-black text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2"><i class="bi bi-calendar-day text-slate-400"></i> ${Ks[a]}</span>
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
            </div>`}).join(""),t.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",s=>{const i=s.target.closest(".day-schedule-card"),o=!s.target.checked;i.classList.toggle("bg-white",!o),i.classList.toggle("shadow-sm",!o),i.classList.toggle("border-slate-200",!o),i.classList.toggle("bg-slate-50",o),i.classList.toggle("border-slate-100",o),i.classList.toggle("opacity-60",o),i.classList.toggle("disabled",o),i.querySelectorAll(".time-inputs input").forEach(r=>r.disabled=o)})})}async function sd(t,e){const a=document.getElementById("bloqueios");if(!a)return;a.innerHTML=`
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
        </div>`;const s=document.getElementById("batchBlockageForm");s&&s.addEventListener("submit",async o=>{o.preventDefault();const r=s.querySelector('button[type="submit"]'),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';const l=Array.from(o.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(x=>x.value);if(l.length===0)return r.disabled=!1,r.innerHTML=n,g("Atenção","Selecione pelo menos um profissional.","error");const d=o.target.batchBlockageStartDate.value,u=o.target.batchBlockageEndDate.value||d,c=o.target.batchBlockageStartTime.value,p=o.target.batchBlockageEndTime.value,m=o.target.batchBlockageReason.value;if(!d||!c||!p)return r.disabled=!1,r.innerHTML=n,g("Atenção","Preencha Data de Início, Hora de Início e Fim.","error");const b=l.map(x=>{const y={professionalId:x,establishmentId:f.establishmentId,startTime:new Date(`${d}T${c}`).toISOString(),endTime:new Date(`${u}T${p}`).toISOString(),reason:m};return Fa(y)});try{await Promise.all(b),g("Sucesso!",`${l.length} bloqueios foram criados.`),s.reset(),o.target.querySelectorAll('input[name="batch-professionals"]').forEach(y=>{y.checked=y.value===t.id});const x=document.getElementById("prof-blockages-filter").value;Ct(t.id,x)}catch(x){g("Erro",x.message,"error")}finally{r.disabled=!1,r.innerHTML=n}});const i=document.getElementById("prof-blockages-filter");i&&i.addEventListener("change",o=>Ct(t.id,o.target.value)),t.id&&await Ct(t.id,"future")}async function Ct(t,e="future"){const a=document.getElementById("blockagesList");if(a){if(a.innerHTML='<div class="loader mx-auto mt-10"></div>',!t){a.innerHTML=`
            <div class="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <i class="bi bi-info-circle text-3xl text-slate-300 mb-3 block"></i>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Salve o perfil para ver o histórico.</p>
            </div>`;return}try{const s=new Date;let i,o;e==="history"?(o=new Date,i=new Date,i.setFullYear(i.getFullYear()-2)):(i=new Date,o=new Date,o.setFullYear(o.getFullYear()+2));let n=(await qa(f.establishmentId,i.toISOString(),o.toISOString(),t)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));e==="history"?n=n.filter(d=>d.endTime<s).sort((d,u)=>u.startTime-d.startTime):n=n.filter(d=>d.endTime>=s).sort((d,u)=>d.startTime-u.startTime);const l=n.reduce((d,u)=>{const c=u.reason||"Sem motivo detalhado";return d[c]||(d[c]=[]),d[c].push(u),d},{});if(Object.keys(l).length===0){a.innerHTML=`
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
        `).join("")}catch(s){a.innerHTML=`<p class="text-[10px] font-bold text-red-500 p-4 bg-red-50 rounded-xl border border-red-100">${s.message}</p>`}}}function od(t){const e=document.getElementById("prof-modal-inner");if(!e)return;const a=e.querySelectorAll(".tab-link");a.forEach(p=>{p.addEventListener("click",m=>{m.preventDefault(),a.forEach(y=>{y.classList.remove("active","border-indigo-600","text-indigo-600"),y.classList.add("border-transparent","text-slate-400")}),p.classList.add("active","border-indigo-600","text-indigo-600"),p.classList.remove("border-transparent","text-slate-400"),e.querySelectorAll(".tab-content").forEach(y=>y.classList.add("hidden"));const b=p.dataset.tab,x=e.querySelector("#"+b);x&&x.classList.remove("hidden")})});const s=e.querySelector("#profPhotoInput"),i=e.querySelector("#profPhotoButton"),o=e.querySelector("#profPhotoContainer"),r=e.querySelector("#profPhotoPreview"),n=e.querySelector("#profPhotoBase64"),l=t.photo||`https://placehold.co/150x150/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,d=t.photo||"",u=()=>s.click();i&&i.addEventListener("click",u),o&&o.addEventListener("click",u),s&&(s.onchange=async()=>{const p=s.files[0];if(p){r.src="https://placehold.co/150x150/E2E8F0/4A5568?text=...";try{const m=await Pa(p,800,800,.8);if(m.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");r.src=m,n.value=m}catch(m){g("Erro de Imagem",m.message||"Não foi possível processar a imagem.","error"),r.src=l,n.value=d,s.value=""}}});const c=e.querySelector("#selectAllServicesBtn");if(c){c.addEventListener("click",()=>{const m=e.querySelectorAll('#profServicesContainer input[type="checkbox"]'),b=Array.from(m).every(x=>x.checked);m.forEach(x=>{x.checked=!b}),c.textContent=b?"Selecionar Todos":"Desmarcar Todos"});const p=e.querySelectorAll('#profServicesContainer input[type="checkbox"]');p.length>0&&Array.from(p).every(m=>m.checked)&&(c.textContent="Desmarcar Todos")}}function id(){Yt&&document.body.removeEventListener("click",Yt),Xt&&cs.removeEventListener("input",Xt),Yt=async t=>{if(t.target.classList.contains("professional-checkbox")){const o=t.target.dataset.id;t.target.checked?W.selectedIds.add(o):W.selectedIds.delete(o),vi(),t.stopPropagation();return}const e=t.target.closest(".status-filter-btn");if(e){W.statusFilter=e.dataset.status,document.querySelectorAll(".status-filter-btn").forEach(o=>{o.classList.remove("bg-indigo-600","text-white","border-indigo-600"),o.classList.add("bg-white","text-slate-600","border-slate-200")}),e.classList.remove("bg-white","text-slate-600","border-slate-200"),e.classList.add("bg-indigo-600","text-white","border-indigo-600"),kt();return}if(t.target.id==="clear-filters-btn"){t.preventDefault(),document.getElementById("filterServiceId").value="all",W.filterServiceId="all",kt();return}if(t.target.id==="apply-filter-btn"){t.preventDefault(),W.filterServiceId=document.getElementById("filterServiceId").value,kt();return}const a=t.target.closest("#toggle-filter-btn");if(a){t.preventDefault(),W.isAdvancedFilterOpen=!W.isAdvancedFilterOpen;const o=document.getElementById("filter-panel");W.isAdvancedFilterOpen?(o.classList.remove("hidden"),o.classList.add("block"),a.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200")):(o.classList.add("hidden"),o.classList.remove("block"),a.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"));return}const s=t.target.closest("[data-action]");if(!s){t.target.id==="professionals-layout-detail"&&Zt();return}const i=s.dataset.action;switch(["close-detail-screen","delete-professional","save-professional","delete-blockage","batch-delete-blockage"].includes(i)&&t.stopPropagation(),i){case"open-professional-editor":Zl(s.dataset.id);break;case"close-detail-screen":Zt(),W.tempProf=null;break;case"batch-delete":rd();break;case"delete-professional":{const o=s.dataset.id,r=W.tempProf?.name||"Profissional";if(await K("Excluir Profissional",`Tem certeza que deseja excluir ${r}? Esta ação não pode ser desfeita.`))try{await Po(o),ne(f.establishmentId,ua(),"Equipe","Excluiu",`Excluiu profissional: ${r}`),g("Sucesso!","Profissional excluído da rede.","success"),Zt(),Ia()}catch(l){g("Erro",`Não foi possível excluir: ${l.message}`,"error")}break}case"save-professional":{const o=document.getElementById("prof-modal-inner"),r=s,n=o.querySelector("#profScheduleContainer"),l=Array.from(o.querySelectorAll('#profServicesContainer input[type="checkbox"]:checked')).map(I=>I.value),d={};n&&n.querySelectorAll(".day-schedule-card").forEach(I=>{const S=I.querySelector('[data-field="active"]').dataset.day;d[S]={active:I.querySelector('[data-field="active"]').checked,start:I.querySelector('[data-field="start"]').value,end:I.querySelector('[data-field="end"]').value,breakStart:I.querySelector('[data-field="breakStart"]').value,breakEnd:I.querySelector('[data-field="breakEnd"]').value}});const u=Array.from(o.querySelectorAll('input[name="accessibleIn"]:checked')).map(I=>I.value),c=u.length>0?u:[f.establishmentId],p=o.querySelector("#profStatusToggle").checked,m=o.querySelector("#profCommissionToggle").checked,b=o.querySelector("#profShowOnAgendaToggle").checked,x={...W.tempProf,id:o.querySelector("#professionalId").value||void 0,accessibleIn:c,name:o.querySelector("#profName").value.trim(),specialty:o.querySelector("#profSpecialty").value,photo:o.querySelector("#profPhotoBase64").value,services:l,workingHours:d,phone:o.querySelector("#profPhone").value,dob:`${o.querySelector("#profDobDay").value}/${o.querySelector("#profDobMonth").value}`,receivesCommission:m,showOnAgenda:b,orderOnAgenda:parseInt(o.querySelector("#profOrderOnAgenda").value)||1,notes:o.querySelector("#profNotes").value,status:p?"active":"inactive",establishmentId:f.establishmentId},y=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{x.id?(await Ka(x.id,x),ne(f.establishmentId,ua(),"Equipe","Editou",`Editou o profissional: ${x.name}`),g("Sucesso!","Dados atualizados.","success")):(delete x.id,await kr(x),ne(f.establishmentId,ua(),"Equipe","Criou",`Cadastrou o profissional: ${x.name}`),g("Sucesso!","Novo membro adicionado à equipe.","success")),Zt(),Ia()}catch(I){g("Erro",I.message,"error"),r.disabled=!1,r.innerHTML=y}break}case"delete-blockage":{const o=s.dataset.id;if(await K("Apagar Bloqueio","O profissional voltará a ficar disponível na agenda neste dia. Confirma?"))try{await Ss(o),g("Bloqueio removido.","success");const r=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";Ct(W.tempProf.id,r)}catch(r){g("Erro",r.message,"error")}break}case"batch-delete-blockage":{const o=JSON.parse(s.dataset.ids);if(await K("Apagar em Lote",`Tem certeza que deseja apagar ${o.length} dias de bloqueio de uma vez?`))try{await Qo(o),g("Bloqueios removidos.","success");const r=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";Ct(W.tempProf.id,r)}catch(r){g("Erro",r.message,"error")}break}}},document.body.addEventListener("click",Yt),Xt=t=>{t.target.id==="searchInput"&&(W.searchQuery=t.target.value,kt())},cs.addEventListener("input",Xt)}function rd(){K("Excluir em Lote",`Tem certeza que deseja excluir ${W.selectedIds.size} profissionais da rede? Esta ação não pode ser desfeita.`).then(async t=>{if(t)try{await Ir(Array.from(W.selectedIds)),ne(f.establishmentId,ua(),"Equipe","Excluiu em Lote",`Excluiu ${W.selectedIds.size} profissionais`),g("Sucesso!",`${W.selectedIds.size} profissionais foram excluídos.`,"success"),W.selectedIds.clear(),vi(),Ia()}catch(e){g("Erro",`Não foi possível excluir em lote: ${e.message}`,"error")}})}let w={clients:[],selectedClient:null,establishments:[],filterEstablishmentIds:new Set,isAdvancedFilterOpen:!1,filters:{search:"",inactiveDays:"",hasLoyalty:!1,status:"all"},sortConfig:{key:"name",direction:"asc"},selectedIds:new Set,loading:!1,historyLimit:50,historyData:{appointments:[],sales:[],loyaltyLog:[],subscriptions:[]}},it=null,Kt=null,ea=null;const Bs=t=>t?String(t).replace(/\D/g,""):"",us=t=>{if(!t)return"Nunca";let e;if(typeof t=="object"&&(t.seconds||t._seconds)){const a=t.seconds||t._seconds;e=new Date(a*1e3)}else e=new Date(t);return isNaN(e.getTime())?"Data Inválida":e.toLocaleDateString("pt-BR")},ps=t=>{if(!t)return"CL";const e=t.trim().split(" ");return e.length>=2?(e[0][0]+e[e.length-1][0]).toUpperCase():t.substring(0,2).toUpperCase()};function nd(){const t=document.getElementById("clients-layout-detail"),e=document.getElementById("client-modal-inner");t&&e&&(t.classList.remove("hidden"),t.classList.add("flex"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("scale-95","translate-y-4"),e.classList.add("scale-100","translate-y-0")},10),document.body.style.overflow="hidden")}function We(){const t=document.getElementById("clients-layout-detail"),e=document.getElementById("client-modal-inner");t&&e&&(t.classList.add("opacity-0"),e.classList.remove("scale-100","translate-y-0"),e.classList.add("scale-95","translate-y-4"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.body.style.overflow=""},300)),w.selectedClient=null}async function ld(){it=document.getElementById("content"),w.selectedClient=null,w.selectedIds.clear(),w.isAdvancedFilterOpen=!1,w.filters={search:"",inactiveDays:"",hasLoyalty:!1,status:"all"},w.sortConfig={key:"name",direction:"asc"};try{const e=(await De().catch(()=>({matrizes:[]}))).matrizes||[];w.establishments=[],e.forEach(a=>{w.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>w.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),w.filterEstablishmentIds.size===0&&w.filterEstablishmentIds.add(f.establishmentId)}catch(t){console.error("Erro ao buscar hierarquia",t)}dd(),pd(),await Ms()}function dd(){const t=w.establishments.map(e=>`
        <label class="inline-flex items-center gap-2 px-3 py-1.5 bg-white border ${w.filterEstablishmentIds.has(e.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-slate-200 text-slate-600"} rounded-xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm est-label select-none active:scale-95">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" value="${e.id}" ${w.filterEstablishmentIds.has(e.id)?"checked":""}>
            <span class="text-xs font-bold whitespace-nowrap">${e.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${e.name}</span>
        </label>
    `).join("");it.innerHTML=`
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
    `}function cd(){const t=document.getElementById("table-header-container");if(!t)return;const e=a=>w.sortConfig.key!==a?'<i class="bi bi-arrow-down-up ml-1 opacity-40 text-xs"></i>':w.sortConfig.direction==="asc"?'<i class="bi bi-arrow-up ml-1 text-indigo-600"></i>':'<i class="bi bi-arrow-down ml-1 text-indigo-600"></i>';t.innerHTML=`
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
    `}async function Ms(){w.loading=!0;const t=document.getElementById("list-container");t&&(t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-slate-500 font-bold text-[10px] uppercase tracking-widest">Carregando clientes...</p></div>');try{const a=Array.from(w.filterEstablishmentIds).map(r=>{let n=`/api/clients/${r}?limit=1000`;return A(n).catch(()=>[])}),i=(await Promise.all(a)).flat(),o=new Map;i.forEach(r=>o.set(r.id,r)),w.clients=Array.from(o.values()),ve()}catch(e){console.error(e),g("Erro","Falha ao carregar clientes.","error"),t&&(t.innerHTML='<div class="text-center py-10 text-red-500 font-bold text-sm">Erro ao carregar dados.</div>')}finally{w.loading=!1}}function ud(t){const e=document.getElementById("summary-section");if(!e)return;const a=new Date().getMonth()+1,s=new Date().getFullYear(),i=t.length;let o=0,r=0,n=0;t.forEach(l=>{if(l.totalDebt&&parseFloat(l.totalDebt)>0&&r++,l.dobMonth==a&&n++,l.createdAt){const d=new Date(l.createdAt);d.getMonth()+1===a&&d.getFullYear()===s&&o++}}),e.innerHTML=`
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
    `}function ve(){cd();const t=document.getElementById("list-container");let e=w.clients;if(w.filters.search){const a=w.filters.search.toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(a)||s.phone&&s.phone.includes(a)||s.cpf&&s.cpf.includes(a))}if(w.filters.status==="devendo")e=e.filter(a=>a.totalDebt&&parseFloat(a.totalDebt)>0);else if(w.filters.status==="aniversariantes"){const a=new Date().getMonth()+1;e=e.filter(s=>s.dobMonth==a)}else if(w.filters.status==="novos"){const a=new Date().getMonth()+1,s=new Date().getFullYear();e=e.filter(i=>{if(!i.createdAt)return!1;const o=new Date(i.createdAt);return o.getMonth()+1===a&&o.getFullYear()===s})}if(w.filters.hasLoyalty&&(e=e.filter(a=>a.loyaltyPoints&&a.loyaltyPoints>0)),w.filters.inactiveDays){const a=parseInt(w.filters.inactiveDays),s=new Date;s.setDate(s.getDate()-a),e=e.filter(i=>{if(!i.lastVisit&&!i.createdAt)return!1;let o;if(i.lastVisit){const r=i.lastVisit.seconds||i.lastVisit._seconds;o=r?new Date(r*1e3):new Date(i.lastVisit)}else o=new Date(i.createdAt);return o<s})}if(e.sort((a,s)=>{let i,o;switch(w.sortConfig.key){case"name":return i=(a.name||"").toLowerCase(),o=(s.name||"").toLowerCase(),w.sortConfig.direction==="asc"?i.localeCompare(o):o.localeCompare(i);case"contact":return i=a.phone||"",o=s.phone||"",w.sortConfig.direction==="asc"?i.localeCompare(o):o.localeCompare(i);case"lastVisit":i=a.lastVisit?a.lastVisit.seconds?a.lastVisit.seconds:new Date(a.lastVisit).getTime()/1e3:a.createdAt?new Date(a.createdAt).getTime()/1e3:0,o=s.lastVisit?s.lastVisit.seconds?s.lastVisit.seconds:new Date(s.lastVisit).getTime()/1e3:s.createdAt?new Date(s.createdAt).getTime()/1e3:0;break;case"financial":i=parseFloat(a.totalDebt)||0,o=parseFloat(s.totalDebt)||0;break;default:i=a.name,o=s.name}return i<o?w.sortConfig.direction==="asc"?-1:1:i>o?w.sortConfig.direction==="asc"?1:-1:0}),ud(e),e.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm m-4">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                    <i class="bi bi-people text-3xl text-slate-300"></i>
                </div>
                <h3 class="text-base font-black text-slate-800 mb-1">Nenhum resultado</h3>
                <p class="text-[10px] text-slate-500 max-w-sm text-center font-bold uppercase tracking-widest mb-6">Tente ajustar a busca ou limpar os filtros.</p>
            </div>`;return}t.innerHTML=e.map(a=>{const s=a.totalDebt&&parseFloat(a.totalDebt)>0,i=us(a.lastVisit),o=Bs(a.phone),r=new Date().getMonth()+1,n=a.dobMonth==r,l=w.selectedIds.has(a.id);let d="";return n&&(d+='<span class="bg-indigo-50 text-indigo-700 text-[8px] font-black px-1.5 py-0.5 rounded border border-indigo-200 uppercase tracking-wider shadow-sm flex items-center gap-1"><i class="bi bi-gift-fill"></i> Niver</span> '),a.loyaltyPoints>0&&(d+=`<span class="bg-amber-50 text-amber-700 text-[8px] font-black px-1.5 py-0.5 rounded border border-amber-200 uppercase tracking-wider shadow-sm flex items-center gap-1"><i class="bi bi-star-fill"></i> ${a.loyaltyPoints} pts</span> `),`
        <div class="border-b border-slate-100 hover:bg-slate-50 transition-colors relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-3 md:p-3 mb-2 md:mb-0 bg-white md:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none border md:border-b md:border-x-0 md:border-t-0 mx-2 md:mx-0 ${s?"border-l-4 border-l-red-400":"border-l-4 border-l-transparent hover:border-l-indigo-300"} ${l?"bg-indigo-50/40 ring-1 ring-indigo-200 border-indigo-200":""} cursor-pointer active:scale-[0.99] md:active:scale-100" data-action="open-modal" data-id="${a.id}">
            
            <div class="flex justify-between items-start md:hidden mb-2 relative">
                <div class="absolute -top-1 -right-1 z-20">
                    <input type="checkbox" value="${a.id}" class="item-checkbox w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${l?"checked":""} data-action-stop-propagation="true">
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl ${s?"bg-red-50 text-red-600 border border-red-100":"bg-slate-100 text-slate-600 border border-slate-200"} flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm">
                        ${ps(a.name)}
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
                    ${ps(a.name)}
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
        `}).join("")}function pd(){Kt&&it.removeEventListener("click",Kt),ea&&it.removeEventListener("input",ea),Kt=l=>{const d=l.target;if(d.classList.contains("item-checkbox")){const b=d.value;d.checked?w.selectedIds.add(b):w.selectedIds.delete(b),pa();const x=d.closest('div[data-action="open-modal"]');d.checked?x.classList.add("bg-indigo-50/40","ring-1","ring-indigo-200","border-indigo-200"):x.classList.remove("bg-indigo-50/40","ring-1","ring-indigo-200","border-indigo-200"),l.stopPropagation();return}if(d.dataset.actionStopPropagation==="true"&&l.stopPropagation(),d.id==="select-all-toggle"){const b=d.checked,x=document.querySelectorAll(".item-checkbox");w.selectedIds.clear(),x.forEach(y=>{y.checked=b,b&&w.selectedIds.add(y.value);const I=y.closest('div[data-action="open-modal"]');b?I.classList.add("bg-indigo-50/40","ring-1","ring-indigo-200","border-indigo-200"):I.classList.remove("bg-indigo-50/40","ring-1","ring-indigo-200","border-indigo-200")}),pa(),l.stopPropagation();return}const u=d.closest("[data-sort]");if(u){const b=u.dataset.sort;w.sortConfig.key===b?w.sortConfig.direction=w.sortConfig.direction==="asc"?"desc":"asc":(w.sortConfig.key=b,w.sortConfig.direction="asc"),ve();return}const c=d.closest(".status-filter-btn");if(c){w.filters.status=c.dataset.status,document.querySelectorAll(".status-filter-btn").forEach(b=>{b.classList.remove("bg-indigo-600","text-white","border-indigo-600"),b.classList.add("bg-white","text-slate-600","border-slate-200")}),c.classList.remove("bg-white","text-slate-600","border-slate-200"),c.classList.add("bg-indigo-600","text-white","border-indigo-600"),ve();return}const p=d.closest("#toggle-dsk-filter-btn");if(p){l.preventDefault(),w.isAdvancedFilterOpen=!w.isAdvancedFilterOpen;const b=document.getElementById("desktop-filter-panel");w.isAdvancedFilterOpen?(b.classList.remove("hidden"),b.classList.add("md:block"),p.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200")):(b.classList.add("hidden"),b.classList.remove("md:block"),p.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"));return}if(d.id==="dsk-clear-filters-btn"){l.preventDefault(),document.getElementById("dsk-filter-sort").value="name_asc",document.getElementById("dsk-filter-inactive-days").value="",document.getElementById("dsk-filter-loyalty").checked=!1,w.filters.inactiveDays="",w.filters.hasLoyalty=!1,w.sortConfig.key="name",w.sortConfig.direction="asc",ve();return}if(d.id==="dsk-apply-filter-btn"){l.preventDefault(),w.filters.inactiveDays=document.getElementById("dsk-filter-inactive-days").value,w.filters.hasLoyalty=document.getElementById("dsk-filter-loyalty").checked;const b=document.getElementById("dsk-filter-sort").value,[x,y]=b.split("_");w.sortConfig.key=x,w.sortConfig.direction=y;const I=document.getElementById("mob-filter-loyalty"),S=document.getElementById("mob-filter-inactive-days"),L=document.getElementById("mob-filter-sort");I&&(I.checked=w.filters.hasLoyalty),S&&(S.value=w.filters.inactiveDays),L&&(L.value=b),ve();return}const m=d.closest("[data-action]");if(m){const b=m.dataset.action,x=m.dataset.id;if(b==="new-client"){eo(null);return}if(b==="open-modal"){eo(x);return}if(b==="close-detail-screen"){We();return}if(b==="whatsapp"){l.stopPropagation();const y=m.dataset.phone;window.open(`https://wa.me/55${y}`,"_blank");return}if(b==="export-excel"){wd();return}if(b==="manual-redeem"){l.stopPropagation(),l.preventDefault(),yd(w.selectedClient);return}}if(d.id==="clients-layout-detail"){We();return}},ea=l=>{l.target.id==="searchInput"&&(w.filters.search=l.target.value,ve())},it.addEventListener("click",Kt),it.addEventListener("input",ea);const t=document.getElementById("mob-filter-overlay"),e=document.getElementById("mob-filter-sheet"),a=document.getElementById("open-mob-filter-btn"),s=document.getElementById("close-mob-filter-sheet"),i=document.getElementById("apply-mob-filters"),o=()=>{e&&(e.classList.remove("translate-y-0"),e.classList.add("translate-y-full")),t&&(t.classList.add("opacity-0"),setTimeout(()=>{t.classList.add("hidden")},300))};a&&a.addEventListener("click",l=>{l.preventDefault(),t.classList.remove("hidden"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("translate-y-full"),e.classList.add("translate-y-0")},10)}),s&&s.addEventListener("click",o),t&&t.addEventListener("click",o),i&&i.addEventListener("click",()=>{w.filters.hasLoyalty=document.getElementById("mob-filter-loyalty").checked,w.filters.inactiveDays=document.getElementById("mob-filter-inactive-days").value;const l=document.getElementById("mob-filter-sort").value,[d,u]=l.split("_");w.sortConfig.key=d,w.sortConfig.direction=u;const c=document.getElementById("dsk-filter-loyalty"),p=document.getElementById("dsk-filter-inactive-days"),m=document.getElementById("dsk-filter-sort");c&&(c.checked=w.filters.hasLoyalty),p&&(p.value=w.filters.inactiveDays),m&&(m.value=l),ve(),o()});const r=document.getElementById("cancel-selection-btn");r&&r.addEventListener("click",()=>{w.selectedIds.clear();const l=document.getElementById("select-all-toggle");l&&(l.checked=!1),document.querySelectorAll(".item-checkbox").forEach(d=>{d.checked=!1,d.closest('div[data-action="open-modal"]').classList.remove("bg-indigo-50/40","ring-1","ring-indigo-200","border-indigo-200")}),pa()});const n=document.getElementById("batch-delete-btn");n&&n.addEventListener("click",bd),document.querySelectorAll(".est-filter-checkbox").forEach(l=>{l.addEventListener("change",d=>{const u=d.target.closest("label");d.target.checked?(w.filterEstablishmentIds.add(d.target.value),u.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),u.classList.remove("border-slate-200","text-slate-600")):(w.filterEstablishmentIds.delete(d.target.value),u.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),u.classList.add("border-slate-200","text-slate-600")),Ms()})})}function pa(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count");if(!t||!e)return;const a=w.selectedIds.size;e.textContent=a,a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex"))}async function bd(){const t=w.selectedIds.size;if(!(t===0||!await K("Excluir Clientes",`Deseja realmente excluir permanentemente ${t} cliente(s)? O histórico de agendamentos será mantido, mas o cadastro será apagado.`)))try{const a=Array.from(w.selectedIds).map(i=>No(i));await Promise.all(a),g("Sucesso",`${t} cliente(s) excluído(s) com sucesso.`,"success"),w.selectedIds.clear(),pa();const s=document.getElementById("select-all-toggle");s&&(s.checked=!1),await Ms()}catch{g("Erro ao Excluir","Ocorreu um erro ao excluir alguns clientes.","error")}}function eo(t=null){t?(w.selectedClient=w.clients.find(a=>a.id===t),w.selectedClient.isNew=!1):w.selectedClient={isNew:!0,id:"",name:"",phone:"",email:"",cpf:"",gender:"",dobDay:"",dobMonth:"",source:"",notes:"",loyaltyPoints:0,totalDebt:0},w.historyData={appointments:[],sales:[],loyaltyLog:[],subscriptions:[]};const e=document.getElementById("client-modal-content")||document.getElementById("client-modal-inner");e&&(md(e,w.selectedClient),nd(),w.selectedClient.isNew||bs(w.selectedClient))}function md(t,e){const a=e.isNew,s=v(e.name||""),i=`
        <div class="p-4 md:p-5 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition-colors active:scale-95 mr-4 flex-shrink-0">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            
            <div class="w-10 h-10 md:w-12 md:h-12 rounded-full ${e.totalDebt>0?"bg-red-50 text-red-600 border-red-200":"bg-indigo-50 text-indigo-600 border-indigo-200"} border flex items-center justify-center font-black text-sm md:text-base mr-3 flex-shrink-0 shadow-sm">
                ${a?'<i class="bi bi-person-plus"></i>':ps(e.name)}
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
    `,t.querySelectorAll(".tab-link").forEach(l=>{l.addEventListener("click",d=>{d.preventDefault(),t.querySelectorAll(".tab-link").forEach(u=>{u.classList.remove("active","border-indigo-600","text-indigo-600"),u.classList.add("border-transparent","text-slate-400")}),l.classList.add("active","border-indigo-600","text-indigo-600"),l.classList.remove("border-transparent","text-slate-400"),t.querySelectorAll(".tab-content").forEach(u=>u.classList.add("hidden")),t.querySelector("#"+l.dataset.tab).classList.remove("hidden")})});const r=t.querySelector("#form-edit-client");r&&(r.onsubmit=hd);const n=t.querySelector('[data-action="delete-client"]');n&&(n.onclick=vd)}function gd(t){const e=new Date,a=t.filter(o=>new Date(o.date)>=e&&o.status!=="cancelled").sort((o,r)=>new Date(o.date)-new Date(r.date)),s=t.filter(o=>new Date(o.date)<e||o.status==="cancelled").sort((o,r)=>new Date(r.date)-new Date(o.date)),i=(o,r)=>{const n=new Date(o.date);let l="";o.status==="cancelled"?l='<span class="text-red-600 bg-red-50 px-2 py-0.5 rounded text-[9px] uppercase font-bold border border-red-200 shadow-sm">Cancelado</span>':o.status==="completed"||r?l='<span class="text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-[9px] uppercase font-bold border border-slate-200 shadow-sm">Concluído</span>':o.status==="confirmed"?l='<span class="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[9px] uppercase font-bold border border-blue-200 shadow-sm">Confirmado</span>':l='<span class="text-orange-700 bg-orange-50 px-2 py-0.5 rounded text-[9px] uppercase font-bold border border-orange-200 shadow-sm">Aguardando</span>';const d=w.establishments.find(u=>u.id===o.establishmentId)?.name||"Unidade Local";return`
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
    `}function fd(t){t.sort((s,i)=>new Date(i.date)-new Date(s.date));const e=t.reduce((s,i)=>s+(Number(i.value)||0),0),a=t.length>0?e/t.length:0;return`
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
    `}function wi(t,e){return e.sort((a,s)=>new Date(s.date)-new Date(a.date)),`
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
    `}function xd(t,e){return!t||t.length===0?'<div class="text-center py-10 border border-dashed border-slate-200 rounded-2xl bg-white"><p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">O cliente não possui nenhum plano VIP ativo.</p></div>':`<div class="space-y-4">
        ${t.map(a=>{const s=a.status==="past_due",i=a.status==="active";a.status;const o=i?"text-emerald-700 bg-emerald-50 border-emerald-200":s?"text-red-700 bg-red-50 border-red-200":"text-gray-700 bg-gray-50 border-gray-200",r=i?"Ativo":s?"Pagamento Atrasado":"Cancelado",n=i?"bi-check-circle-fill text-emerald-500":s?"bi-exclamation-circle-fill text-red-500":"bi-x-circle-fill text-gray-500";let l="N/A";if(a.currentPeriodEnd){const c=typeof a.currentPeriodEnd=="object"&&a.currentPeriodEnd._seconds?new Date(a.currentPeriodEnd._seconds*1e3):new Date(a.currentPeriodEnd);isNaN(c.getTime())||(l=c.toLocaleDateString("pt-BR"))}const d=a.usageLimit?`${a.usageCurrentMonth||0} / ${a.usageLimit}`:`${a.usageCurrentMonth||0} (Ilimitado)`,u=`https://wa.me/55${Bs(e.phone)}?text=${encodeURIComponent("Olá "+e.name.split(" ")[0]+", notamos uma pendência na renovação do seu "+a.planName+". Podemos ajudar?")}`;return`
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
    </div>`}async function bs(t){if(!t||!t.phone)return;const e=Bs(t.phone);try{const a=Array.from(w.filterEstablishmentIds),[s,i]=await Promise.all([zr(a,e),A(`/api/client-subscriptions/client/${e}`).catch(()=>[])]),o=s.filter(p=>p.type==="appointment"),r=s.filter(p=>p.type==="sale"),n=s.filter(p=>p.type==="loyalty");w.historyData.appointments=o,w.historyData.sales=r,w.historyData.loyaltyLog=n,w.historyData.subscriptions=i||[];const l=document.getElementById("historico-agendamentos-container");l&&(l.innerHTML=gd(o));const d=document.getElementById("historico-financeiro-container");d&&(d.innerHTML=fd(r));const u=document.getElementById("historico-fidelidade-container");u&&(u.innerHTML=wi(t,n));const c=document.getElementById("historico-assinaturas-container");c&&(c.innerHTML=xd(w.historyData.subscriptions,t)),ki(t)}catch(a){console.error("Erro ao buscar histórico via telefone",a);const s='<div class="text-center py-6 text-red-500 font-bold text-[10px] uppercase bg-red-50 rounded-xl m-2 border border-red-100">Falha na busca. O Telefone está preenchido corretamente?</div>',i=document.getElementById("historico-agendamentos-container");i&&(i.innerHTML=s);const o=document.getElementById("historico-financeiro-container");o&&(o.innerHTML=s);const r=document.getElementById("historico-fidelidade-container");r&&(r.innerHTML=s);const n=document.getElementById("historico-assinaturas-container");n&&(n.innerHTML=s)}}function ki(t){const e=document.getElementById("client-modal-inner");if(!e)return;e.querySelectorAll("[data-go-agenda]").forEach(o=>{o.onclick=()=>{We(),re("agenda-section",{targetDate:new Date(o.dataset.date),scrollToAppointmentId:o.dataset.id})}}),e.querySelectorAll("[data-go-comanda]").forEach(o=>{o.onclick=()=>{We(),re("comandas-section",{selectedAppointmentId:o.dataset.id,initialFilter:"finalizadas"})}}),e.querySelectorAll('[data-action="cancel-subscription"]').forEach(o=>{o.onclick=async r=>{r.preventDefault();const n=o.dataset.subId;if(await K("Cancelar Plano","Tem a certeza que deseja cancelar a assinatura deste cliente? A cobrança será interrompida imediatamente no cartão do cliente."))try{o.disabled=!0,o.innerHTML='<span class="spinner-border spinner-border-sm"></span> Cancelando...',await A(`/api/client-subscriptions/cancel/${n}`,{method:"POST"}),g("Sucesso","Assinatura cancelada com sucesso.","success"),bs(w.selectedClient)}catch(d){g("Erro",d.message,"error"),o.disabled=!1,o.innerHTML="Cancelar Plano"}}});const a=e.querySelectorAll('[data-action="toggle-adjustment"]'),s=e.querySelector("#inline-adjustment-container"),i=e.querySelector("#confirm-adjustment-btn");a.forEach(o=>{o.onclick=r=>{r.preventDefault(),s.classList.toggle("hidden"),s.classList.contains("hidden")||s.scrollIntoView({behavior:"smooth",block:"center"})}}),i&&(i.onclick=async o=>{o.preventDefault();const r=e.querySelector("#redeem-action").value,n=parseInt(e.querySelector("#redeem-points").value,10),l=e.querySelector("#redeem-reason").value,d=t.loyaltyPoints||0;if(!n||n<=0)return g("Aviso","Indique a quantidade de pontos.","info");if(r==="debit"&&n>d)return g("Erro","Saldo insuficiente.","error");if(!l)return g("Aviso","Indique o motivo do ajuste.","info");i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm"></span> Gravando...';try{let u=d;r==="debit"?(await Ro(f.establishmentId,t.phone,n,l),u-=n):(u+=n,await ws(t.id,{loyaltyPoints:u})),w.selectedClient.loyaltyPoints=u,g("Sucesso","Pontos atualizados com sucesso!","success"),bs(w.selectedClient),ve()}catch(u){g("Erro",u.message,"error"),i.disabled=!1,i.innerHTML="Confirmar Movimentação"}})}async function hd(t){t.preventDefault();const e=t.submitter||document.querySelector('button[form="form-edit-client"]');let a="";e&&(a=e.innerHTML,e.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> Gravando...',e.disabled=!0);const s=new FormData(t.target),i=Object.fromEntries(s.entries());i.establishmentId=f.establishmentId,i.dobDay&&(i.dobDay=parseInt(i.dobDay)),i.dobMonth&&(i.dobMonth=parseInt(i.dobMonth));try{if(w.selectedClient.isNew){const o=await Fo(i);w.clients.unshift(o),g("Sucesso","Cliente cadastrado com sucesso!","success"),We()}else{await ws(w.selectedClient.id,i),Object.assign(w.selectedClient,i);const o=w.clients.findIndex(r=>r.id===w.selectedClient.id);o!==-1&&(w.clients[o]=w.selectedClient),g("Sucesso","Dados salvos com sucesso!","success"),We()}ve()}catch(o){g("Erro",o.message,"error"),e&&(e.innerHTML=a,e.disabled=!1)}}async function vd(t){if(t.preventDefault(),!!await K("Excluir Cliente","Tem certeza? O histórico financeiro será mantido de forma anônima, mas a ficha cadastral será perdida permanentemente."))try{await No(w.selectedClient.id),w.clients=w.clients.filter(a=>a.id!==w.selectedClient.id),g("Sucesso","Cliente removido com sucesso.","success"),We(),ve()}catch(a){g("Erro",a.message,"error")}}function yd(t){const e=t.loyaltyPoints||0,a=`
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
    `,{modalElement:s,close:i}=Fe({title:"Ajuste de Pontos",contentHTML:a,maxWidth:"max-w-xs"});s.querySelector("form").onsubmit=async o=>{o.preventDefault();const r=document.getElementById("redeem-action").value,n=parseInt(document.getElementById("redeem-points").value,10),l=document.getElementById("redeem-reason").value;if(!n||n<=0)return g("Erro","Qtd inválida.","error");if(r==="debit"&&n>e)return g("Erro","Saldo insuficiente na carteira do cliente.","error");const d=o.target.querySelector('button[type="submit"]'),u=d.innerHTML;d.innerHTML='<span class="spinner-border spinner-border-sm"></span>',d.disabled=!0;try{let c=e;r==="debit"?(await Ro(f.establishmentId,t.phone,n,l),c-=n):(c+=n,await ws(t.id,{loyaltyPoints:c})),w.selectedClient.loyaltyPoints=c,w.historyData.loyaltyLog.unshift({type:r==="debit"?"redemption":"earn",points:n,date:new Date().toISOString(),description:l+" (Ajuste Manual)"}),g("Sucesso","Saldo de pontos atualizado.","success"),i();const p=document.getElementById("historico-fidelidade-container");p&&(p.innerHTML=wi(w.selectedClient,w.historyData.loyaltyLog)),ki(w.selectedClient),ve()}catch(c){g("Erro",c.message,"error"),d.innerHTML=u,d.disabled=!1}}}function wd(){if(typeof XLSX>"u")return g("Erro","Biblioteca de exportação não carregada. Atualize a página.","error");if(w.clients.length===0)return g("Aviso","Nenhum cliente para exportar.","info");const t=w.clients.map(e=>({Nome:e.name,Telefone:e.phone||"","E-mail":e.email||"",CPF:e.cpf||"",Gênero:e.gender==="M"?"Masculino":e.gender==="F"?"Feminino":e.gender==="O"?"Outro":"",Aniversário:e.dobDay&&e.dobMonth?`${e.dobDay}/${e.dobMonth}`:"",Origem:e.source||"",Cadastro:us(e.createdAt),"Última Visita":us(e.lastVisit),"Pontos Fidelidade":e.loyaltyPoints||0,"Débito/Fiado (R$)":e.totalDebt||0,Anotações:e.notes||""}));try{const e=XLSX.utils.json_to_sheet(t),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,e,"Clientes"),XLSX.writeFile(a,`KAIROS_Clientes_${new Date().toISOString().split("T")[0]}.xlsx`),g("Sucesso","Exportação gerada e descarregada.","success")}catch{g("Erro","Falha ao gerar o ficheiro Excel.","error")}}async function Ii(t){t.innerHTML=`
        <div class="flex items-center justify-center p-8">
            <div class="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    `;try{let e=null;try{e=await A("/api/pagarme/recipient")}catch(s){if(!s.message.includes("404"))throw s}if(e&&e.id){t.innerHTML=`
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
        `,document.getElementById("pagarmeOnboardingForm").addEventListener("submit",async s=>{s.preventDefault();const i=document.getElementById("btnSubmitOnboarding"),o=document.getElementById("pgBankCode").value,r=o==="000"?prompt("Digite o código do banco de 3 dígitos:"):o;if(!r)return;const n={name:document.getElementById("pgName").value.trim(),email:document.getElementById("pgEmail").value.trim(),document:document.getElementById("pgDocument").value.replace(/\D/g,""),type:document.getElementById("pgType").value,bankAccount:{holder_name:document.getElementById("pgName").value.trim(),holder_type:document.getElementById("pgType").value,holder_document:document.getElementById("pgDocument").value.replace(/\D/g,""),bank:r,branch_number:document.getElementById("pgBranch").value.trim(),account_number:document.getElementById("pgAccount").value.trim(),account_check_digit:document.getElementById("pgAccountDigit").value.trim()}};try{i.disabled=!0,i.innerHTML='<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Processando...',await A("/api/pagarme/onboarding",{method:"POST",body:JSON.stringify(n)}),g("Sucesso","Conta de pagamentos configurada com sucesso!","success"),Ii(t)}catch(l){i.disabled=!1,i.innerHTML='<i class="bi bi-check2-circle"></i> Criar Conta Recebedor',g("Erro no Cadastro",l.message||"Verifique os dados bancários e tente novamente.","error")}})}catch{t.innerHTML=`
            <div class="text-center py-12">
                <i class="bi bi-exclamation-triangle text-rose-500 text-4xl mb-3"></i>
                <p class="text-gray-600 font-bold">Erro ao carregar configurações financeiras.</p>
            </div>
        `}}const ze=document.getElementById("content"),Ja={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},de=[{id:"clean-modern",name:"Clean Moderno",bg:"#f8fafc",text:"#4b5563",titleColor:"#0f172a",primary:"#2563eb",font:"Inter",btn:"rounded",cardBg:"#ffffff",cardBorder:"#e2e8f0"},{id:"dark-premium",name:"Dark Premium",bg:"#0f172a",text:"#9ca3af",titleColor:"#f8fafc",primary:"#f59e0b",font:"'Playfair Display'",btn:"square",cardBg:"#1e293b",cardBorder:"#334155"},{id:"spa-zen",name:"Spa & Wellness",bg:"#f0fdf4",text:"#166534",titleColor:"#064e3b",primary:"#10b981",font:"Poppins",btn:"pill",cardBg:"#ffffff",cardBorder:"#d1fae5"},{id:"neo-brutalism",name:"Neobrutalismo",bg:"#ffffff",text:"#000000",titleColor:"#000000",primary:"#ef4444",font:"Inter",btn:"square",cardBg:"#ffffff",cardBorder:"#000000"},{id:"tech-cyan",name:"Tech Night",bg:"#020617",text:"#94a3b8",titleColor:"#f1f5f9",primary:"#06b6d4",font:"Roboto",btn:"rounded",cardBg:"#0f172a",cardBorder:"#1e293b"},{id:"sunset-glam",name:"Sunset Glam",bg:"#fff7ed",text:"#831843",titleColor:"#4c0519",primary:"#f43f5e",font:"Poppins",btn:"pill",cardBg:"#ffffff",cardBorder:"#fce7f3"},{id:"luxury-mono",name:"Luxo Minimal",bg:"#fafafa",text:"#525252",titleColor:"#171717",primary:"#404040",font:"'Playfair Display'",btn:"square",cardBg:"#ffffff",cardBorder:"#e5e5e5"},{id:"deep-ocean",name:"Oceano Profundo",bg:"#172554",text:"#bfdbfe",titleColor:"#eff6ff",primary:"#3b82f6",font:"Montserrat",btn:"pill",cardBg:"#1e3a8a",cardBorder:"#1e40af"},{id:"rustic-vintage",name:"Rústico Vintage",bg:"#1c1917",text:"#a8a29e",titleColor:"#fafaf9",primary:"#ea580c",font:"Montserrat",btn:"rounded",cardBg:"#292524",cardBorder:"#44403c"},{id:"vibrant-purple",name:"Estúdio Criativo",bg:"#fdf4ff",text:"#701a75",titleColor:"#4a044e",primary:"#c026d3",font:"Inter",btn:"rounded",cardBg:"#ffffff",cardBorder:"#fae8ff"}];let ee=null,oe=null;function Si(){return[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais da Unidade"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"whatsapp-bot",icon:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",label:"Atendente Virtual (WhatsApp)"},{id:"auto-messages",icon:"M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",label:"Mensagens Automáticas"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"pagarme",icon:"M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",label:"Pagamentos (Pagar.me)"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}]}function to(t,e,a){return new Promise((s,i)=>{const o=new FileReader;o.readAsDataURL(t),o.onload=r=>{const n=new Image;n.src=r.target.result,n.onload=()=>{const l=document.createElement("canvas");let d=n.width,u=n.height;d>e&&(u*=e/d,d=e),l.width=d,l.height=u,l.getContext("2d").drawImage(n,0,0,d,u);const p=t.type==="image/png"&&e<500?"image/png":"image/jpeg";s(l.toDataURL(p,a))},n.onerror=l=>i(l)},o.onerror=r=>i(r)})}function Xe(t,e=null){let a='<option value="">-- Selecione (Opcional) --</option>';const s=r=>{const n=new Map,l=[];return r&&(r.forEach(d=>n.set(d.id,{...d,children:[]})),n.forEach(d=>{d.parentId&&n.has(d.parentId)?n.get(d.parentId).children.push(d):l.push(d)})),l},i=(r,n="")=>{const l=r.id===e?"selected":"";a+=`<option value="${r.id}" ${l}>${n}${v(r.name)}</option>`,r.children.forEach(d=>i(d,n+"— "))};return s(t).forEach(r=>i(r)),a}async function Ge(t,e){const a=e.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const s=[],{ownerName:i,...o}=t;if(i&&i!==f.userName){const n=ke.currentUser;n&&s.push(Vi(n,{displayName:i}).then(()=>{f.userName=i}))}const r={...ee,...o};s.push(qt(oe,r)),await Promise.all(s),ee=r,g("Sucesso","Definições salvas com sucesso!","success"),o.themeColor&&oe===f.establishmentId&&setTimeout(()=>window.location.reload(),1500)}catch(s){g("Erro",`Não foi possível salvar: ${s.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function kd(t,e){const a=v(t.name||""),s=v(t.phone||""),i=v(t.cnpj||""),o=v(t.email||""),r=v(t.address||""),n=v(t.website||""),l=v(f.userName||"");e.innerHTML=`
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
    `,e.querySelector("#personal-data-form").addEventListener("submit",d=>{d.preventDefault();const u={ownerName:e.querySelector("#ownerName").value,name:e.querySelector("#establishmentName").value,phone:e.querySelector("#establishmentPhone").value,cnpj:e.querySelector("#establishmentCnpjCpf").value,email:e.querySelector("#establishmentEmail").value,address:e.querySelector("#establishmentAddress").value,website:e.querySelector("#establishmentWebsite").value};Ge(u,d)})}function Id(t,e){e.innerHTML=`
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
    `,e.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const s=e.querySelector("#newPassword").value,i=e.querySelector("#confirmPassword").value;if(s!==i){g("Erro","As senhas não coincidem.","error");return}const o=e.querySelector('button[form="change-password-form"]');o.disabled=!0,o.textContent="A Salvar...";try{const r=ke.currentUser;if(r)await _i(r,s),g("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum utilizador logado encontrado.")}catch(r){g("Erro",`Não foi possível alterar a senha: ${r.message}`,"error")}finally{o.disabled=!1,o.textContent="Salvar Nova Senha"}})}function Sd(t,e){e.innerHTML=`
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
    `,e.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const s=e.querySelector("#newEmail").value,i=e.querySelector("#currentPassword").value,o=e.querySelector('button[form="change-email-form"]');o.disabled=!0,o.textContent="A verificar...";try{const r=ke.currentUser,n=Hi.credential(r.email,i);await Oi(r,n),await zi(r,s),await wr(oe,s),g("Sucesso","Link de verificação enviado! Verifique o seu novo e-mail.","success"),a.target.reset()}catch(r){g("Erro",r.message,"error")}finally{o.disabled=!1,o.textContent="Salvar Novo E-mail"}})}function Ed(t,e){const a=v(t.welcomeMessage||"Agende o seu horário de forma rápida e fácil."),s=t.socialLinks||{},i=v(s.instagram||""),o=v(s.facebook||""),r=v(s.whatsapp||"");let n=t.primaryColor||t.themeColor||de[0].primary,l=t.backgroundColor||de[0].bg,d=t.textColor||de[0].text,u=t.titleColor||de[0].titleColor,c=t.buttonStyle||de[0].btn,p=t.typography||de[0].font,m=t.templateId?de.findIndex(J=>J.id===t.templateId):0;m===-1&&(m=0);const b=J=>J==="pill"?"9999px":J==="square"?"0.25rem":"0.75rem";e.innerHTML=`
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
                        <input type="hidden" id="selectedTemplateId" value="${de[m].id}">
                        
                        <div class="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
                            <h4 class="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-3 text-center">1. Escolha um Tema Base</h4>
                            <div class="flex items-center justify-center gap-4">
                                <button type="button" id="prevTemplate" class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm transition-colors cursor-pointer border border-indigo-200">
                                    <i class="bi bi-chevron-left text-lg"></i>
                                </button>
                                <div class="text-center min-w-[160px]">
                                    <span id="templateNameDisplay" class="text-lg font-bold text-indigo-950">${de[m].name}</span>
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
                                --preview-btn-radius: ${b(c)};
                                --preview-card-bg: ${de[m].cardBg};
                                --preview-card-border: ${de[m].cardBorder};
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
    `;const x=e.querySelector("#mockup-screen-wrapper"),y=e.querySelector("#mockup-screen"),I=e.querySelector("#previewPrimaryColorInput"),S=e.querySelector("#previewBgColorInput"),L=e.querySelector("#previewTextColorInput"),q=e.querySelector("#previewTitleColorInput"),N=e.querySelector("#typographyInput"),F=e.querySelector("#establishmentWelcomeMessage"),D=e.querySelector("#mockup-welcome"),k=e.querySelector("#socialInstagram"),O=e.querySelector("#socialWhatsapp"),_=e.querySelector("#socialFacebook"),C=e.querySelector("#prevTemplate"),M=e.querySelector("#nextTemplate"),H=e.querySelector("#templateNameDisplay"),B=e.querySelector("#selectedTemplateId"),G=J=>{const ae=de[J];x.style.opacity="0.3",x.style.transform="scale(0.96)",setTimeout(()=>{I.value=ae.primary,S.value=ae.bg,L.value=ae.text,q.value=ae.titleColor||ae.text,N.value=ae.font,e.querySelectorAll('input[name="buttonStyle"]').forEach(ge=>{ge.checked=ge.value===ae.btn}),B.value=ae.id,H.textContent=ae.name,y.style.setProperty("--preview-primary",ae.primary),y.style.setProperty("--preview-bg",ae.bg),y.style.setProperty("--preview-text",ae.text),y.style.setProperty("--preview-title-color",ae.titleColor||ae.text),y.style.setProperty("--preview-font",ae.font),y.style.setProperty("--preview-btn-radius",b(ae.btn)),y.style.setProperty("--preview-card-bg",ae.cardBg),y.style.setProperty("--preview-card-border",ae.cardBorder),x.style.opacity="1",x.style.transform="scale(1)"},300)};C.addEventListener("click",()=>{m=(m-1+de.length)%de.length,G(m)}),M.addEventListener("click",()=>{m=(m+1)%de.length,G(m)}),I.addEventListener("input",J=>y.style.setProperty("--preview-primary",J.target.value)),S.addEventListener("input",J=>y.style.setProperty("--preview-bg",J.target.value)),L.addEventListener("input",J=>y.style.setProperty("--preview-text",J.target.value)),q.addEventListener("input",J=>y.style.setProperty("--preview-title-color",J.target.value)),N.addEventListener("change",J=>y.style.setProperty("--preview-font",J.target.value)),e.querySelectorAll('input[name="buttonStyle"]').forEach(J=>{J.addEventListener("change",ae=>{ae.target.checked&&y.style.setProperty("--preview-btn-radius",b(ae.target.value))})}),F.addEventListener("input",J=>D.textContent=J.target.value||"Mensagem...");const Y=()=>{e.querySelector("#mockup-insta-icon").classList.toggle("hidden",!k.value.trim()),e.querySelector("#mockup-whats-icon").classList.toggle("hidden",!O.value.trim()),e.querySelector("#mockup-face-icon").classList.toggle("hidden",!_.value.trim())};[k,O,_].forEach(J=>J.addEventListener("input",Y));const Q=e.querySelector("#establishmentLogoInput"),T=e.querySelector("#establishmentBgInput"),X=e.querySelector("#establishmentLogoBase64"),ie=e.querySelector("#establishmentBackgroundImageBase64");e.querySelector("#triggerLogoUpload").addEventListener("click",J=>{J.target.id!=="establishmentLogoInput"&&Q.click()}),Q.onchange=async J=>{const ae=J.target.files[0];if(ae){const ge=await to(ae,300,.9);e.querySelector("#establishmentLogoPreview").src=ge,e.querySelector("#mockup-logo").src=ge,X.value=ge}},e.querySelector("#triggerBannerUpload").addEventListener("click",J=>{J.target.id!=="establishmentBgInput"&&T.click()}),T.onchange=async J=>{const ae=J.target.files[0];if(ae){const ge=await to(ae,1280,.8);e.querySelector("#establishmentBgPreview").src=ge,e.querySelector("#establishmentBgPreview").classList.remove("hidden"),e.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),ie.value=ge,e.querySelector("#mockup-banner").src=ge,e.querySelector("#mockup-banner").classList.remove("hidden"),e.querySelector("#mockup-banner-placeholder").classList.add("hidden")}},e.querySelector("#branding-form").addEventListener("submit",J=>{J.preventDefault();let ae="rounded";e.querySelectorAll('input[name="buttonStyle"]').forEach(Fs=>{Fs.checked&&(ae=Fs.value)});const ge={logo:X.value,backgroundImage:ie.value,welcomeMessage:F.value,templateId:B.value,primaryColor:I.value,backgroundColor:S.value,textColor:L.value,titleColor:q.value,typography:N.value,buttonStyle:ae,socialLinks:{instagram:k.value.trim(),whatsapp:O.value.trim(),facebook:_.value.trim()}};Ge(ge,J)})}function $d(t,e){const a=t.urlId||oe;let s=window.location.origin;(s.includes("localhost")||s.includes("capacitor://")||s.includes("127.0.0.1"))&&(s="https://www.kairosagenda.com.br");const i=v(`${s}/agendar?id=${a}`),o=t.publicBookingEnabled||!1,r=o?"Agendamento Online ATIVO":"Agendamento Online INATIVO",n=o?"text-green-600":"text-red-600";e.innerHTML=`
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
    `,e.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const l=e.querySelector("#publicBookingLink");l.select(),document.execCommand("copy"),l.blur(),g("Sucesso","Link copiado!","success")}),e.querySelector("#publicBookingToggle").addEventListener("change",async l=>{const d=l.target.checked,u=e.querySelector("#publicBookingStatusText");u.textContent=d?"Agendamento Online ATIVO":"Agendamento Online INATIVO",u.className=d?"text-sm font-semibold text-green-600":"text-sm font-semibold text-red-600";try{l.target.disabled=!0,await yr(oe,d),ee.publicBookingEnabled=d,g("Sucesso",`Agendamento online ${d?"ativado":"desativado"}!`,"success")}catch(c){g("Erro",c.message,"error"),l.target.checked=!d}finally{l.target.disabled=!1}}),Bd(t.slotInterval||30,e),e.querySelector("#booking-form").addEventListener("submit",l=>{l.preventDefault();const d={slotInterval:parseInt(e.querySelector("#establishmentSlotInterval").value,10)};Ge(d,l)})}function Ld(t,e){e.innerHTML=`
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
            </div>`,s.appendChild(d)}),s.addEventListener("change",o=>{const r=o.target.closest('.day-schedule-card input[type="checkbox"]');if(r){const n=r.closest(".day-schedule-card");n.classList.toggle("disabled",!r.checked),n.classList.toggle("opacity-60",!r.checked),n.classList.toggle("bg-gray-50",r.checked),n.classList.toggle("bg-gray-100",!r.checked)}}),e.querySelector("#working-hours-form").addEventListener("submit",o=>{o.preventDefault();const r={};Object.keys(Ja).forEach(l=>{r[l]={active:e.querySelector(`#est-${l}-active`).checked,start:e.querySelector(`#est-${l}-start`).value,end:e.querySelector(`#est-${l}-end`).value,breakStart:e.querySelector(`#est-${l}-breakStart`).value,breakEnd:e.querySelector(`#est-${l}-breakEnd`).value}});const n=e.querySelector("#establishmentTimezone").value;Ge({workingHours:r,timezone:n},o)})}async function ba(t,e){const a=!!t.whatsappInstance,s=!!t.parentId;let i=null;if(s&&!a)try{i=await Be(t.parentId)}catch(c){console.error("Erro ao buscar dados da matriz:",c)}const o=i&&!!i.whatsappInstance;e.innerHTML=`
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
    `;const r=e.querySelector("#btnUseParentWhatsapp");r&&r.addEventListener("click",async()=>{if(confirm("Confirmar a utilização do mesmo número da Matriz? As mensagens desta filial serão geridas pela mesma inteligência."))try{r.disabled=!0,r.innerText="A vincular...",await qt(oe,{whatsappInstance:i.whatsappInstance}),g("Sucesso","Número da matriz vinculado com sucesso!","success"),ee.whatsappInstance=i.whatsappInstance,ba(ee,e)}catch{g("Erro","Não foi possível vincular ao número da matriz.","error"),r.disabled=!1,r.innerText="Usar WhatsApp da Matriz"}});let n=null;const l=e.querySelector("#btnGenerateQr"),d=e.querySelector("#btnCancelQr");l&&l.addEventListener("click",async()=>{l.disabled=!0,l.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gerando...';const c="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const m=await(await fetch(`${c}/connect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:oe})})).json();if(m.qrcode){e.querySelector("#whatsappStatusArea").classList.add("hidden"),e.querySelector("#qrCodeDisplayArea").classList.remove("hidden");const b=m.qrcode.includes("data:image")?m.qrcode:`data:image/png;base64,${m.qrcode}`;e.querySelector("#qrCodeImage").src=b,n=setInterval(async()=>{try{const y=await(await fetch(`${c}/status/${oe}`)).json();y.connected&&(clearInterval(n),ee.whatsappInstance=y.instanceName,e.querySelector("#qrCodeDisplayArea").classList.add("hidden"),e.querySelector("#connectedStatusArea").classList.remove("hidden"),g("Sucesso","WhatsApp conectado com sucesso!","success"))}catch(x){console.error("Erro ao verificar status do WhatsApp",x)}},5e3)}else g("Erro na API",m.error||"Erro desconhecido","error")}catch(p){console.error(p),g("Erro de Conexão","Não foi possível aceder ao servidor Kairós.","error")}finally{l.disabled=!1,l.innerHTML='<i class="bi bi-phone-vibrate"></i> Gerar QR Code Próprio'}}),d&&d.addEventListener("click",()=>{n&&clearInterval(n),e.querySelector("#qrCodeDisplayArea").classList.add("hidden"),e.querySelector("#whatsappStatusArea").classList.remove("hidden")});const u=e.querySelector("#btnDisconnectWhatsapp");u&&u.addEventListener("click",async()=>{if(!confirm("Tem certeza que deseja DESCONECTAR? O bot parará de responder imediatamente nesta unidade."))return;u.disabled=!0,u.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Desconectando...';const c="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{if(s&&t.whatsappInstance===i?.whatsappInstance){await qt(oe,{whatsappInstance:null}),g("Sucesso","Filial desvinculada do WhatsApp da Matriz!","success"),ee.whatsappInstance=null,ba(ee,e);return}const m=await(await fetch(`${c}/disconnect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:oe})})).json();m.success?(g("Sucesso","WhatsApp desconectado!","success"),ee.whatsappInstance=null,ba(ee,e)):alert("Erro ao desconectar: "+m.error)}catch(p){console.error(p),g("Erro","Falha ao comunicar com o servidor.","error")}finally{u&&(u.disabled=!1,u.innerHTML='<i class="bi bi-power"></i> Desconectar')}})}function Cd(t,e){const a=t.autoMessagesConfig||{},s=a.appointmentReminder?.template||"Olá {{cliente}}! 👋 Passando para lembrar do seu horário hoje às {{hora}} com {{profissional}}. Para confirmar, responda CONFIRMAR, ou se precisar desmarcar, responda CANCELAR.",i=a.birthdayCongrats?.template||"Parabéns {{cliente}}! 🎉 O Kairós deseja-lhe um feliz aniversário! Temos um desconto especial para si hoje na sua próxima visita.",o=a.inactiveRecovery?.template||"Olá {{cliente}}, tudo bem? Já faz {{dias}} dias desde a sua última visita à *{{unidade}}*! Que tal agendar um novo horário hoje?";e.innerHTML=`
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
    `,e.querySelectorAll(".btn-variable").forEach(r=>{r.addEventListener("click",()=>{const n=r.dataset.target,l=r.dataset.var,d=e.querySelector(`#${n}`),u=d.selectionStart,c=d.selectionEnd,p=d.value;d.value=p.substring(0,u)+l+p.substring(c),d.focus(),d.setSelectionRange(u+l.length,u+l.length)})}),e.querySelector("#auto-messages-form").addEventListener("submit",r=>{r.preventDefault();const n={autoMessagesConfig:{appointmentReminder:{active:e.querySelector("#activeReminder").checked,minutesBefore:parseInt(e.querySelector("#minutesBefore").value,10)||60,template:e.querySelector("#tplReminder").value},birthdayCongrats:{active:e.querySelector("#activeBirthday").checked,template:e.querySelector("#tplBirthday").value},inactiveRecovery:{active:e.querySelector("#activeInactive").checked,daysInactive:parseInt(e.querySelector("#daysInactive").value,10)||30,template:e.querySelector("#tplInactive").value}}};Ge(n,r)})}async function Dd(t,e){const a=t.loyaltyProgram||{},s=a.pointsPerVisit||1;let i=[],o=[],r=[];try{[i,o,r]=await Promise.all([Je(oe),Rt(oe),Cs(oe)])}catch(d){console.error("Erro ao carregar dados para fidelidade:",d)}e.innerHTML=`
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
    `;const n=e.querySelector("#loyaltyTiersContainer"),l=(d={})=>{const u=document.createElement("div");u.className="loyalty-tier-row bg-white p-4 border border-gray-200 rounded-lg shadow-sm relative grid grid-cols-1 md:grid-cols-4 gap-4 items-end";const c=d.type||"money",p=d.itemId||"",m=d.reward||"",b=d.discount||"",x=d.points||d.costPoints||"";u.innerHTML=`
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
                    <input type="text" placeholder="Ex: R$ 20 de Desconto" data-field="rewardName" value="${v(m)}" class="desc-input flex-1 p-2 border border-gray-300 rounded-md ${c!=="money"?"hidden":""}">
                    
                    <select data-field="itemId" class="item-select flex-1 p-2 border border-gray-300 rounded-md bg-white text-sm ${c==="money"?"hidden":""}">
                        <option value="">Selecione o item na lista...</option>
                    </select>

                    <div class="w-24 relative">
                        <span class="absolute left-2 top-2 text-gray-500 text-sm">$</span>
                        <input type="number" placeholder="Valor" data-field="discount" value="${b}" step="0.01" class="discount-input w-full p-2 pl-7 border border-gray-300 rounded-md" title="Valor do desconto">
                    </div>
                </div>
            </div>

            <button type="button" class="remove-loyalty-tier absolute -top-3 -right-3 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white p-1.5 rounded-full shadow-md transition-colors" title="Remover Prémio">
                <i class="bi bi-x-lg text-sm"></i>
            </button>
        `;const y=u.querySelector(".type-select"),I=u.querySelector(".item-select"),S=u.querySelector(".desc-input"),L=u.querySelector(".discount-input"),q=N=>{I.innerHTML='<option value="">Selecione...</option>';let F=[];N==="service"?F=i:N==="product"?F=o:N==="package"&&(F=r),F.forEach(D=>{const k=D.id===p,O=D.name||D.title||"Sem nome",_=D.price||D.salePrice||0;I.innerHTML+=`<option value="${D.id}" data-price="${_}" ${k?"selected":""}>${v(O)}</option>`})};return c!=="money"&&q(c),y.addEventListener("change",N=>{const F=N.target.value;F==="money"?(I.classList.add("hidden"),S.classList.remove("hidden"),S.value="",L.value=""):(I.classList.remove("hidden"),S.classList.add("hidden"),q(F),L.value="")}),I.addEventListener("change",N=>{const F=N.target.selectedOptions[0];if(F&&F.value){S.value=F.text;const D=F.dataset.price;D&&(L.value=parseFloat(D).toFixed(2))}}),u};a.tiers&&a.tiers.length>0?a.tiers.forEach(d=>n.appendChild(l(d))):n.appendChild(l()),e.querySelector("#add-loyalty-tier").addEventListener("click",()=>{n.appendChild(l())}),n.addEventListener("click",d=>{const u=d.target.closest(".remove-loyalty-tier");u&&u.closest(".loyalty-tier-row").remove()}),e.querySelector("#loyalty-form").addEventListener("submit",d=>{d.preventDefault();const u=Array.from(e.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(p=>{const m=p.querySelector(".type-select").value,b=m==="money"?null:p.querySelector(".item-select").value;let x=m==="money"?p.querySelector(".desc-input").value:p.querySelector(".item-select").options[p.querySelector(".item-select").selectedIndex]?.text;return{points:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,costPoints:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,type:m,itemId:b,reward:x,name:x,discount:parseFloat(p.querySelector('input[data-field="discount"]').value)||0}}),c={loyaltyProgram:{enabled:e.querySelector("#loyaltyEnabled").checked,type:"visit",pointsPerVisit:parseInt(e.querySelector("#loyaltyPointsPerVisit").value,10)||1,pointsPerCurrency:0,tiers:u.filter(p=>p.points>0&&p.reward)}};Ge(c,d)})}async function Pd(t,e){e.innerHTML=`
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
    `;try{const[a,s]=await Promise.all([Ma(oe),ks(oe)]),i=t.financialIntegration||{},o=t.commissionConfig||{},r=t.purchaseConfig||{};e.querySelector("#financialNatureId").innerHTML=Xe(a,i.defaultNaturezaId),e.querySelector("#financialCostCenterId").innerHTML=Xe(s,i.defaultCentroDeCustoId),e.querySelector("#purchaseNatureId").innerHTML=Xe(a,r.defaultNatureId),e.querySelector("#purchaseCostCenterId").innerHTML=Xe(s,r.defaultCostCenterId),e.querySelector("#commissionNatureId").innerHTML=Xe(a,o.defaultNatureId),e.querySelector("#commissionCostCenterId").innerHTML=Xe(s,o.defaultCostCenterId)}catch{g("Erro","Não foi possível carregar o plano de contas da unidade.","error")}e.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const s={financialIntegration:{defaultNaturezaId:e.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:e.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:e.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:e.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:e.querySelector("#commissionNatureId").value||null,defaultCostCenterId:e.querySelector("#commissionCostCenterId").value||null}};Ge(s,a)})}function Td(t,e){const a=`https://wa.me/5516997859430?text=Olá, preciso de ajuda com o sistema Kairos (Minha Unidade: ${t.name}).`;e.innerHTML=`
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
    `}function Ad(t,e){const a=`https://wa.me/5516997859430?text=Gostaria de solicitar o cancelamento da assinatura. (Unidade: ${t.name})`;e.innerHTML=`
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
    `}function Bd(t,e){const a=e.querySelector("#slotIntervalContainer"),s=e.querySelector("#establishmentSlotInterval");if(!a||!s)return;const i=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=i.map(o=>{const r=o.value===t;return`<button type="button" data-value="${o.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors shadow-sm
                           ${r?"bg-indigo-600 text-white":"bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}">
                       ${o.label}
                   </button>`}).join(""),s.value=t,a.querySelectorAll(".interval-btn").forEach(o=>{o.addEventListener("click",()=>{s.value=o.dataset.value,a.querySelectorAll(".interval-btn").forEach(r=>{r.classList.remove("bg-indigo-600","text-white"),r.classList.add("bg-white","border","border-gray-300","text-gray-700")}),o.classList.add("bg-indigo-600","text-white"),o.classList.remove("bg-white","border","border-gray-300","text-gray-700")})})}async function Md(t){const a=Si().find(i=>i.id===t);if(!a)return;ze.innerHTML=`
        <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-gray-200 border-opacity-50">
            <div class="flex items-center gap-3">
                <button data-action="back-to-menu" class="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 shadow-sm flex items-center gap-2 text-sm font-semibold">
                    <i class="bi bi-arrow-left"></i> Voltar
                </button>
                <h2 class="text-2xl font-bold text-gray-800">${a.label}</h2>
            </div>
            <div class="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                ${v(ee?.name||"")}
            </div>
        </div>
        
        <div id="settings-content-detail" class="pb-20 max-w-6xl mx-auto w-full">
            <div class="flex justify-center items-center py-10"><div class="spinner-border text-indigo-600" role="status"></div></div>
        </div>
    `,ze.querySelector('button[data-action="back-to-menu"]').addEventListener("click",i=>{i.preventDefault(),Ei({id:oe})});const s=document.getElementById("settings-content-detail");switch(t){case"personal-data":kd(ee,s);break;case"change-password":Id(ee,s);break;case"change-email":Sd(ee,s);break;case"branding":Ed(ee,s);break;case"booking":$d(ee,s);break;case"working-hours":Ld(ee,s);break;case"whatsapp-bot":ba(ee,s);break;case"auto-messages":Cd(ee,s);break;case"loyalty":await Dd(ee,s);break;case"financial":await Pd(ee,s);break;case"pagarme":Ii(s);break;case"support":Td(ee,s);break;case"cancellation":Ad(ee,s);break;default:s.innerHTML='<div class="p-4 text-center">Módulo em construção.</div>'}}async function Ei(t={}){ze.innerHTML=`
        <div class="flex flex-col justify-center items-center h-64">
            <div class="spinner-border text-indigo-600 border-4 w-12 h-12 mb-4" role="status"></div>
            <p class="text-gray-500 font-medium">A carregar configurações da unidade...</p>
        </div>
    `;try{oe=t.id||f.establishmentId,ee=await Be(oe);const e=t.id?`<button onclick="window.navigateTo('establishments-section')" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                   <i class="bi bi-diagram-3"></i> Voltar à Rede
               </button>`:"",a=ee.isMatriz||!ee.parentId?'<span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded ml-3">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded ml-3">📍 UNIDADE</span>',s=Si();ze.innerHTML=`
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
                        <h3 class="text-2xl font-bold mb-1">${v(ee.name)} ${a}</h3>
                        <p class="text-indigo-200 text-sm flex items-center gap-2"><i class="bi bi-geo-alt"></i> ${v(ee.address||"Morada não definida")}</p>
                    </div>
                    <div class="relative z-10 hidden sm:block">
                        <div class="w-16 h-16 bg-white rounded-xl shadow-md p-1 flex items-center justify-center">
                            ${ee.logo?`<img src="${ee.logo}" class="w-full h-full object-contain rounded-lg">`:`<span class="text-2xl text-indigo-600 font-bold">${ee.name.charAt(0).toUpperCase()}</span>`}
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
                        ${jd(ee.modules||{})}
                    </div>
                </div>
            </div>
        `,ze.querySelectorAll("div[data-section]").forEach(i=>{i.addEventListener("click",o=>{Md(i.dataset.section)})}),ze.querySelectorAll(".module-toggle").forEach(i=>{i.addEventListener("change",async()=>{const o=i.dataset.module;try{const n={...(await Be(oe)).modules,[o]:i.checked};await qt(oe,{modules:n}),g("Módulos","Módulos atualizados com sucesso.","success")}catch(r){i.checked=!i.checked,g("Erro",r.message,"error")}})})}catch(e){ze.innerHTML=`
            <div class="p-8 text-center max-w-md mx-auto">
                <i class="bi bi-exclamation-triangle text-4xl text-red-500 mb-4 block"></i>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Erro ao carregar loja</h2>
                <p class="text-gray-600">${e.message}</p>
                <button onclick="window.navigateTo('establishments-section')" class="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700">Voltar à Rede</button>
            </div>
        `}}function jd(t){return[{key:"agenda-section",label:"Agenda Diária",icon:"bi-calendar"},{key:"comandas-section",label:"Comandas e PDV",icon:"bi-receipt"},{key:"financial-section",label:"Financeiro Completo",icon:"bi-cash-coin"},{key:"reports-section",label:"Relatórios Gerenciais",icon:"bi-graph-up"}].map(a=>`
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
    `).join("")}const Dt=document.getElementById("content");async function dt(t){const e=document.getElementById("blockagesList");if(e){e.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,s=document.getElementById("filterEndDate")?.value,i=await qa(f.establishmentId,a||new Date().toISOString().split("T")[0],s||new Date().toISOString().split("T")[0],t),o=document.getElementById("filterReason")?.value.toLowerCase(),r=o?i.filter(l=>l.reason&&l.reason.toLowerCase().includes(o)):i,n=r.reduce((l,d)=>{const u=d.reason||"Sem motivo";return l[u]||(l[u]=[]),l[u].push(d),l},{});if(e.innerHTML="",r.length===0){e.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(n).forEach(([l,d])=>{const u=document.createElement("div");u.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let p=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${v(l)} (${d.length})</h4>`;if(d.length>1){const m=JSON.stringify(d.map(b=>b.id));p+=`<button data-action="batch-delete-blockage" data-ids='${m}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}p+="</div>",u.innerHTML=p,d.forEach(m=>{const b=new Date(m.startTime),x=new Date(m.endTime),y=b.toLocaleDateString("pt-BR"),I=x.toLocaleDateString("pt-BR"),L=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${y===I?`${y} | ${b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${x.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${y} às ${b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${I} às ${x.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${m.id}">Apagar</button>
                    </div>`;u.innerHTML+=L}),e.appendChild(u)})}catch(a){e.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function qd(t){t.preventDefault();const e=t.target,a=e.querySelector("#blockageProfId").value,s=e.querySelector("#blockageDate").value,i=e.querySelector("#blockageEndDate").value||s,o=e.querySelector("#blockageStartTime").value,r=e.querySelector("#blockageEndTime").value,n={establishmentId:f.establishmentId,professionalId:a,startTime:new Date(`${s}T${o}:00`).toISOString(),endTime:new Date(`${i}T${r}:00`).toISOString(),reason:e.querySelector("#blockageReason").value};try{await Fa(n),e.reset(),g("Sucesso","Bloqueio adicionado com sucesso!","success"),dt(a)}catch(l){g("Erro",`Não foi possível criar o bloqueio: ${l.message}`,"error")}}async function Fd(t){t.preventDefault();const e=t.target,a=Array.from(e.querySelectorAll('input[name="batch-professionals"]:checked')).map(u=>u.value);if(a.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const s=e.querySelector("#batchBlockageDate").value,i=e.querySelector("#batchBlockageEndDate").value||s,o=e.querySelector("#batchBlockageStartTime").value,r=e.querySelector("#batchBlockageEndTime").value,n=e.querySelector("#batchBlockageReason").value,l=e.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="Aguarde...";const d=a.map(u=>{const c={establishmentId:f.establishmentId,professionalId:u,startTime:new Date(`${s}T${o}:00`).toISOString(),endTime:new Date(`${i}T${r}:00`).toISOString(),reason:n};return Fa(c)});try{await Promise.all(d),g("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),e.reset(),e.querySelectorAll('input[name="batch-professionals"]:checked').forEach(c=>c.checked=!1);const u=document.getElementById("blockageProfId").value;u&&dt(u)}catch(u){g("Erro",`Ocorreu um erro: ${u.message}`,"error")}finally{l.disabled=!1,l.textContent="Adicionar Bloqueio em Lote"}}function Nd(t){Dt.addEventListener("submit",e=>{e.target.id==="blockageForm"&&qd(e),e.target.id==="batchBlockageForm"&&Fd(e)}),Dt.addEventListener("input",e=>{e.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&dt(t)}),Dt.addEventListener("click",async e=>{const a=e.target.closest("button[data-action]");if(!a)return;const s=a.dataset.action;if(s==="back-to-professionals")re("profissionais-section");else if(s==="delete-blockage"){if(await K("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await Ss(a.dataset.id),g("Sucesso","Bloqueio removido.","success"),dt(t)}catch(o){g("Erro",`Não foi possível remover o bloqueio: ${o.message}`,"error")}}else if(s==="batch-delete-blockage"){const i=JSON.parse(a.dataset.ids);if(await K("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${i.length} bloqueios de uma vez?`))try{await Qo(i),g("Sucesso",`${i.length} bloqueios removidos.`,"success"),dt(t)}catch(r){g("Erro",`Não foi possível apagar os bloqueios: ${r.message}`,"error")}}})}async function Rd(t){const{professionalId:e,professionalName:a}=t;if(!e||!a){Dt.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const s=v(a);Dt.innerHTML=`
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
        </section>`,Nd(e),await dt(e);const i=document.getElementById("batchProfSelectionContainer");try{const o=await Pe(f.establishmentId);i.innerHTML=o.map(r=>`
            <div class="flex items-center">
                <input id="prof-batch-${r.id}" value="${r.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${r.id}" class="ml-2 text-sm text-gray-700">${v(r.name)}</label>
            </div>`).join("")}catch{i.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Hd=t=>A(`/api/users/${t}`),Od=t=>A("/api/users",{method:"POST",body:JSON.stringify(t)}),zd=(t,e)=>A(`/api/users/${t}`,{method:"PUT",body:JSON.stringify(e)}),_d=t=>A(`/api/users/${t}`,{method:"DELETE"}),Vd=(t,e)=>A(`/api/users/${t}/password`,{method:"PUT",body:JSON.stringify({password:e})}),Ud=(t,e)=>A(`/api/users/${t}/status`,{method:"PATCH",body:JSON.stringify({status:e})}),ht=document.getElementById("content"),Wd={"Operação & Atendimento":{"dashboard-section":"Dashboard","agenda-section":"Agenda","comandas-section":"Comandas","ausencias-section":"Ausências e Bloqueios"},"Financeiro & Vendas":{"financial-section":"Financeiro (ERP)","sales-report-section":"Relatório de Vendas","commissions-section":"Comissões","packages-section":"Planos e Pacotes"},"Cadastros Base":{"clientes-section":"Clientes","profissionais-section":"Profissionais","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores"},Administração:{"relatorios-section":"Relatórios Gerais","estabelecimento-section":"Configurações da Empresa","users-section":"Usuários e Acessos"}},Jd={view:"Visualizar",create:"Criar",edit:"Editar"},ao={owner:{label:"Proprietário",color:"bg-rose-100 text-rose-700 border-rose-200"},group_admin:{label:"Admin da Rede",color:"bg-purple-100 text-purple-700 border-purple-200"},company_admin:{label:"Gestor Matriz",color:"bg-blue-100 text-blue-700 border-blue-200"},branch_manager:{label:"Gestor Filial",color:"bg-orange-100 text-orange-700 border-orange-200"},professional:{label:"Profissional",color:"bg-slate-100 text-slate-600 border-slate-200"}};let ta=null,aa=null,Ze=null,ct=null;function $i(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[f.currentViewContext?.id||f.establishmentId]}function Gd(t){const e=document.getElementById("usersListContainer");if(!e)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(t.length===0){const s=a?"Nenhum usuário encontrado na base.":"Nenhum usuário ativo neste contexto.";e.innerHTML=`
            <div class="col-span-full py-16 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3"><i class="bi bi-people text-3xl text-slate-300"></i></div>
                <h3 class="text-sm font-bold text-slate-700 mb-1">${s}</h3>
                <p class="text-[10px] text-slate-500 max-w-xs">Tente selecionar mais unidades no topo da tela ou exibir inativos.</p>
            </div>`;return}t.sort((s,i)=>s.role==="owner"&&i.role!=="owner"?-1:s.role!=="owner"&&i.role==="owner"?1:(s.status==="active"?-1:1)-(i.status==="active"?-1:1)),e.innerHTML=t.map(s=>{const i=JSON.stringify(s).replace(/'/g,"&apos;"),o=s.status==="active",r=f.professionals?.find(u=>u.id===s.professionalId);r&&r.name;const n=r?r.name.charAt(0):s.name.charAt(0),l=s.photo||r?.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(n)}`,d=ao[s.role]||ao.professional;return`
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
        `}).join("")}function Li(){const e=document.getElementById("showInactiveUsersToggle")?.checked?f.users:f.users.filter(a=>a.status==="active");Gd(e)}function Qd(t={}){let e="",a=!1;for(const[s,i]of Object.entries(Wd)){const o=Object.entries(i).filter(([r,n])=>{const l=r.replace("-section","");return!(f.enabledModules&&f.enabledModules[l]===!1)});o.length!==0&&(a=!0,e+=`
        <div class="mb-6 last:mb-0">
            <h4 class="font-black text-[10px] text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2"><i class="bi bi-folder2-open text-indigo-400 mr-1"></i> ${s}</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        `,o.forEach(([r,n])=>{const l=r==="agenda-section"||r==="comandas-section",d=t[r]?.view_all_prof===!0,u=Object.entries(Jd).map(([p,m])=>`
                <label class="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <span class="text-[9px] text-slate-600 font-bold uppercase tracking-widest">${m}</span>
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
            `}),e+="</div></div>")}return a?e:'<div class="p-6 bg-red-50 border border-red-100 rounded-2xl text-center"><p class="text-sm font-bold text-red-600">Sua empresa não possui módulos ativados. Contate o administrador do sistema.</p></div>'}function so(t){if(!ct||f.userRole==="professional")return"";const e=t?.accessibleEstablishments?.map(o=>o.id)||[],a=t?.accessibleCompanies?.map(o=>o.id)||[],s=t?.role||"professional";if(s==="owner"||s==="group_admin")return'<div class="p-5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-800 text-sm font-black flex items-center justify-center gap-3"><i class="bi bi-shield-check text-2xl"></i> Acesso Total (Toda a Rede)</div>';let i='<div class="space-y-3 max-h-60 overflow-y-auto custom-scrollbar p-1">';return ct.companies.forEach(o=>{const r=a.includes(o.id),n=ct.branches.filter(l=>l.companyId===o.id);i+=`
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
        `}),i+="</div>",i}async function oo(t=null){document.getElementById("user-list-view").classList.add("hidden");const e=document.getElementById("user-form-view");e.classList.remove("hidden");let a=f.professionals;if(!a||a.length===0)try{const p=$i().map(x=>Pe(x)),m=await Promise.all(p),b=new Map;m.flat().forEach(x=>b.set(x.id,x)),a=Array.from(b.values()),f.professionals=a}catch(c){console.warn("Profissionais não carregados",c)}if(["owner","group_admin","company_admin"].includes(f.userRole)&&!ct)try{const c=await De();c&&(ct=c)}catch(c){console.error("Falha ao buscar hierarquia",c),ct={companies:[],branches:[]}}const s=t!==null,i=s&&t.role==="owner",o=e.querySelector("#userFormTitle");o.innerHTML=s?`<i class="bi bi-person-lines-fill mr-2 text-indigo-600"></i>Editar Perfil: ${t.name}`:'<i class="bi bi-person-plus-fill mr-2 text-indigo-600"></i>Novo Acesso';const r=e.querySelector("#userForm");r.innerHTML=`
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
                                    ${so(t)}
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
                        ${Qd(t?.permissions)}
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
    `;const n=e.querySelectorAll(".tab-btn"),l=e.querySelectorAll(".tab-content");n.forEach(c=>{c.addEventListener("click",()=>{n.forEach(m=>{m.classList.remove("active","text-indigo-600","border-indigo-600"),m.classList.add("text-slate-400","border-transparent")}),l.forEach(m=>m.classList.add("hidden")),c.classList.add("active","text-indigo-600","border-indigo-600"),c.classList.remove("text-slate-400","border-transparent");const p=c.getAttribute("data-tab");e.querySelector(`#${p}`).classList.remove("hidden")})});const d=r.querySelector("#userRole"),u=r.querySelector("#hierarchySelectorContainer");if(d&&u){d.addEventListener("change",p=>{const m={...t,role:p.target.value};u.innerHTML=so(m),c()});const c=()=>{u.querySelectorAll(".company-checkbox").forEach(p=>{p.addEventListener("change",m=>{m.target.closest(".company-block").querySelectorAll(".branch-checkbox").forEach(y=>{y.checked=m.target.checked;const I=y.nextElementSibling.querySelector(".dot");I&&(m.target.checked?I.classList.add("transform","translate-x-4"):I.classList.remove("transform","translate-x-4"))})})})};c()}if(r.querySelectorAll(".permission-checkbox").forEach(c=>{if(c.addEventListener("change",p=>{const m=p.target.nextElementSibling,b=m.nextElementSibling;p.target.checked?(m.classList.replace("bg-slate-200","bg-indigo-500"),b.classList.add("transform","translate-x-4")):(m.classList.replace("bg-indigo-500","bg-slate-200"),b.classList.remove("transform","translate-x-4"))}),c.checked){const p=c.nextElementSibling,m=p.nextElementSibling;p.classList.replace("bg-slate-200","bg-indigo-500"),m.classList.add("transform","translate-x-4")}}),r.onsubmit=async c=>{c.preventDefault();const p=r.querySelector('button[type="submit"]'),m=p.innerHTML;p.disabled=!0,p.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> Processando...';const b={};r.querySelectorAll(".permission-checkbox").forEach(q=>{const N=q.dataset.module,F=q.dataset.permission;b[N]||(b[N]={}),b[N][F]=q.checked});const x=r.querySelector("#userProfessionalId").value||null,y=r.querySelector("#userRole")?.value||"professional",I=[],S=[];if(y!=="group_admin"&&y!=="owner"&&r.querySelector(".company-checkbox")&&(r.querySelectorAll(".company-checkbox:checked").forEach(q=>{I.push({id:q.value,name:q.dataset.name})}),r.querySelectorAll(".branch-checkbox:checked").forEach(q=>{S.push({id:q.value,name:q.dataset.name,companyId:q.dataset.companyId})}),S.length===0))return p.disabled=!1,p.innerHTML=m,g("Atenção","Selecione pelo menos uma filial na aba de Acesso.","warning");const L={name:r.querySelector("#userName").value,permissions:b,professionalId:x,role:y,accessibleCompanies:I,accessibleEstablishments:S};try{if(s){const q=r.querySelector("#userEmail").value;t?.email!==q&&!i&&(L.email=q),await zd(t.id,L),g("Sucesso","Usuário atualizado.","success")}else L.email=r.querySelector("#userEmail").value,L.password=r.querySelector("#userPassword").value,await Od(L),g("Sucesso","Novo usuário cadastrado na plataforma.","success");Sa()}catch(q){g(`Erro: ${q.message}`,"error"),p.disabled=!1,p.innerHTML=m}},s){const c=r.querySelector("#btn-show-password"),p=r.querySelector("#password-form");c&&p&&(c.onclick=()=>{c.classList.add("hidden"),p.classList.remove("hidden")},r.querySelector("#btn-cancel-pwd").onclick=()=>{c.classList.remove("hidden"),p.classList.add("hidden"),p.querySelector("#userNewPassword").value=""},r.querySelector("#btn-save-pwd").onclick=async m=>{const b=m.target,x=p.querySelector("#userNewPassword").value;if(!x||x.length<6)return g("Aviso","Senha deve ter no mínimo 6 caracteres.","warning");if(await K("Alterar Senha","O usuário usará esta nova senha no próximo acesso. Confirma?"))try{b.disabled=!0,b.textContent="Aguarde...",await Vd(t.id,x),g("Sucesso","Senha alterada com segurança.","success"),c.classList.remove("hidden"),p.classList.add("hidden")}catch(y){g("Erro",y.message,"error")}finally{b.disabled=!1,b.textContent="Salvar Senha"}})}}async function io(){const t=document.getElementById("usersListContainer");if(t){t.innerHTML='<div class="col-span-full py-16 flex justify-center"><div class="loader"></div></div>';try{const e=$i(),a=e.map(l=>Hd(l)),s=e.map(l=>Pe(l)),i=await Promise.all(a),o=await Promise.all(s),r=new Map;i.flat().forEach(l=>r.set(l.id,l)),f.users=Array.from(r.values());const n=new Map;o.flat().forEach(l=>n.set(l.id,l)),f.professionals=Array.from(n.values()),Li()}catch{g("Erro ao carregar base de usuários.","error"),t.innerHTML='<p class="col-span-full text-center font-bold text-red-500 bg-red-50 p-6 rounded-2xl">Falha de comunicação com o servidor de acessos.</p>'}}}async function Sa(){ht.innerHTML=`
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
    `,ta&&ht.removeEventListener("click",ta),aa&&ht.removeEventListener("change",aa),Ze&&(window.removeEventListener("kairos:contextChanged",Ze),document.removeEventListener("change",Ze)),Ze=t=>{(t.type==="kairos:contextChanged"||t.target.closest("#multi-context-list"))&&document.getElementById("user-list-view")&&!document.getElementById("user-list-view").classList.contains("hidden")&&io()},window.addEventListener("kairos:contextChanged",Ze),document.addEventListener("change",Ze),ta=async t=>{const e=t.target.closest("[data-action]");if(!e)return;switch(e.dataset.action){case"new-user":oo();break;case"edit-user":const s=JSON.parse(e.dataset.user.replace(/&apos;/g,"'"));oo(s);break;case"back-to-list":Sa();break;case"delete-user":{if(t.stopPropagation(),await K("Excluir Usuário","O usuário perderá totalmente o acesso ao sistema. Confirma?"))try{await _d(e.dataset.userId),g("Usuário excluído com sucesso.","success"),Sa()}catch(i){g(`Erro: ${i.message}`,"error")}break}}},aa=async t=>{if(t.target.id==="showInactiveUsersToggle"){const e=t.target.nextElementSibling,a=e.nextElementSibling;t.target.checked?(e.classList.replace("bg-slate-200","bg-indigo-500"),a.classList.add("transform","translate-x-5")):(e.classList.replace("bg-indigo-500","bg-slate-200"),a.classList.remove("transform","translate-x-5")),Li()}else{const e=t.target.closest('input[data-action="toggle-user-status"]');if(e){t.stopPropagation();const a=e.dataset.userId,s=e.checked?"active":"inactive",i=e.nextElementSibling,o=i.nextElementSibling;e.checked?(i.classList.replace("bg-slate-300","bg-emerald-500"),o.classList.add("transform","translate-x-5")):(i.classList.replace("bg-emerald-500","bg-slate-300"),o.classList.remove("transform","translate-x-5"));try{await Ud(a,s);const r=f.users.findIndex(n=>n.id===a);if(r>-1){f.users[r].status=s;const n=e.closest(".user-card-clickable");s==="inactive"?n.classList.add("opacity-60","bg-slate-50"):n.classList.remove("opacity-60","bg-slate-50")}}catch(r){g(`Erro: ${r.message}`,"error"),e.checked=!e.checked,e.checked?(i.classList.replace("bg-slate-300","bg-emerald-500"),o.classList.add("transform","translate-x-5")):(i.classList.replace("bg-emerald-500","bg-slate-300"),o.classList.remove("transform","translate-x-5"))}}}},ht.addEventListener("click",ta),ht.addEventListener("change",aa),await io()}const Yd=document.getElementById("content");let ro={},ms=null;function Xd(){Object.values(ro).forEach(t=>t?.destroy()),ro={}}function Zd(t,e){if(!window.jspdf){g("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a({orientation:"landscape",unit:"px",format:"a4"}),i=document.getElementById("salesReportSummaryCards");if(s.setFontSize(18),s.text(t,s.internal.pageSize.getWidth()/2,40,{align:"center"}),i){const r=[["Receita Total",i.querySelector("#summary-revenue").textContent],["Vendas Totais",i.querySelector("#summary-transactions").textContent],["Ticket Médio",i.querySelector("#summary-avg-ticket").textContent]];s.autoTable({startY:60,head:[["Métrica","Valor"]],body:r,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const o=s.lastAutoTable?s.lastAutoTable.finalY+20:60;s.text("Detalhes das Vendas",20,o),s.autoTable({html:`#${e}`,startY:o+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),s.save(`${t.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function no(t){const e=document.getElementById("genericModal"),a=v(t.client),s=v(t.items),i=v(t.responsavelCaixa||"N/A"),o=(t.payments||[]).map(r=>`
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
    `,e.style.display="flex"}function Kd(t){const{summary:e,transactions:a}=t;document.getElementById("summary-revenue").textContent=`R$ ${e.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=e.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${e.averageTicket.toFixed(2)}`;const s=document.getElementById("paymentSummaryTableBody"),i=Object.entries(e.paymentMethodTotals).sort(([,n],[,l])=>l-n);s.innerHTML=i.map(([n,l])=>`
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
    `}).join(""),o.querySelectorAll("tr").forEach(n=>{n.addEventListener("dblclick",()=>{const l=n.dataset.transactionIndex,d=ms.transactions[l];d&&no(d)})}),r.innerHTML=a.map((n,l)=>{const d=v(n.client),u=v(n.items),c=v(n.type);return`
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
    `}).join(""),r.querySelectorAll("div[data-transaction-index]").forEach(n=>{n.addEventListener("click",()=>{const l=n.dataset.transactionIndex,d=ms.transactions[l];d&&no(d)})})}async function lo(){const t=document.getElementById("main-reports-view"),e=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!t||!e||!a)return;const s=e.value,i=a.value;if(!s||!i)return g("Atenção","Por favor, selecione as datas de início e fim.","error");t.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const o=document.getElementById("cashierSessionFilter").value,r=await Mo({establishmentId:f.establishmentId,startDate:s,endDate:i,cashierSessionId:o});ms=r,t.innerHTML=`
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
        `,Kd(r)}catch(o){g("Erro",`Não foi possível carregar o relatório: ${o.message}`,"error"),t.innerHTML=`<p class="p-8 text-center text-red-500">${v(o.message)}</p>`}}async function ec(){Xd();const t=new Date().toISOString().split("T")[0],e=new Date;e.setDate(e.getDate()-30);const a=e.toISOString().split("T")[0];Yd.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",lo),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const s=document.getElementById("reportStartDate").value,i=document.getElementById("reportEndDate").value,o=`Relatorio_Vendas_${s}_a_${i}`;Zd(o,"transactionsTable")});try{const s=await Bn(f.establishmentId),i=document.getElementById("cashierSessionFilter");s&&s.length>0&&s.forEach(o=>{const r=new Date(o.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),n=v(o.closedByName||"N/A");i.innerHTML+=`<option value="${o.id}">${n} - ${r}</option>`})}catch{g("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await lo()}const tc=document.getElementById("content");let E={payables:[],receivables:[],natures:[],costCenters:[],establishments:[],suppliers:[],clients:[],professionals:[],currentTab:"receivables",statusFilter:"all",startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date(new Date().getFullYear(),new Date().getMonth()+1,0).toISOString().split("T")[0],filterNaturezaId:"all",filterCostCenterId:"all",searchQuery:"",isAdvancedFilterOpen:!1,selectedIds:new Set,isSelectionMode:!1,sortCol:"dueDate",sortAsc:!0},sa=null,oa=null;function js(t){const e=new Map,a=[];return t&&(t.forEach(s=>e.set(s.id,{...s,children:[]})),e.forEach(s=>{s.parentId&&e.has(s.parentId)?e.get(s.parentId).children.push(s):a.push(s)})),a}function Ci(t){if(!t)return{day:"--",month:"---",full:"--/--/----"};const[e,a,s]=t.split("-"),i=new Date(e,a-1,s),o=String(i.getDate()).padStart(2,"0"),r=i.toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return{day:o,month:r,full:i.toLocaleDateString("pt-BR")}}function we(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t)}function mt(t,e){if(e==="paid")return!1;const a=new Date;a.setHours(0,0,0,0);const[s,i,o]=t.split("-");return new Date(s,i-1,o)<a}function ac(t,e,a){if(!t)return;if(!e||e.length===0){t.innerHTML=`
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
            ${i.children.map(m=>s(m,o+1)).join("")}
        `};t.innerHTML=e.map(i=>s(i)).join("")}async function co(t){const e=document.getElementById("genericModal"),a=t==="nature",s=a?"Plano de Naturezas":"Centros de Custo",i=a?Ma:ks,o=a?Vr:Ur,r=a?"natures":"costCenters";e.className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 p-0 md:p-6",e.innerHTML=`
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
        </div>`,e.style.display="flex",requestAnimationFrame(()=>{e.classList.remove("opacity-0");const c=e.querySelector("#modal-content-wrapper");c&&(c.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),c.classList.add("translate-y-0","md:scale-100","md:opacity-100"))});const n=e.querySelector("#hierarchyList"),l=e.querySelector("#itemParent"),d=c=>{const p=js(c);ac(n,p,t);const m=l.value;l.innerHTML='<option value="">-- Nível Principal --</option>';const b=(x,y=0)=>{const I="  ".repeat(y)+(y>0?"↳ ":"");l.innerHTML+=`<option value="${x.id}">${I}${v(x.name)}</option>`,x.children.forEach(S=>b(S,y+1))};p.forEach(x=>b(x)),l.value=m};try{const c=await i(f.establishmentId);E[r]=c,d(c)}catch(c){console.error(c)}const u=e.querySelector("#hierarchyForm");u.addEventListener("submit",async c=>{c.preventDefault();const p=e.querySelector("#itemName").value,m=l.value;try{await o({name:p,parentId:m||null,establishmentId:f.establishmentId});const b=await i(f.establishmentId);E[r]=b,d(b),u.reset(),await Ae(),g("Sucesso","Item adicionado à estrutura.","success")}catch(b){g("Erro",b.message,"error")}})}function Nt(){const t=document.getElementById("genericModal");t.classList.add("opacity-0");const e=t.querySelector("#modal-content-wrapper");e&&(e.classList.remove("translate-y-0","md:scale-100","md:opacity-100"),e.classList.add("translate-y-full","md:scale-95","md:opacity-0")),setTimeout(()=>{t.style.display="none",t.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",t.innerHTML=""},300)}async function sc(){try{const e=(await De()).matrizes||[];E.establishments=[],e.forEach(a=>{E.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>E.establishments.push({id:s.id,name:s.name,type:"Filial"}))})}catch(t){console.warn("Erro ao buscar lojas",t)}Di(),Pi(),await Ae()}function Di(){tc.innerHTML=`
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
                        <button id="tab-receivables" class="flex-1 md:w-40 py-2.5 text-sm font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${E.currentTab==="receivables"?"bg-white md:bg-emerald-50 text-emerald-700 shadow-sm md:shadow-none":"text-gray-500 hover:text-gray-800"}">
                            A Receber
                        </button>
                        <button id="tab-payables" class="flex-1 md:w-40 py-2.5 text-sm font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${E.currentTab==="payables"?"bg-white md:bg-red-50 text-red-700 shadow-sm md:shadow-none":"text-gray-500 hover:text-gray-800"}">
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
                            <input type="text" id="searchInput" value="${E.searchQuery}" placeholder="Procurar por nome ou nota..." class="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 shadow-sm rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                        </div>
                    </div>

                    <div id="filter-panel" class="hidden animate-fade-in-down">
                        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                            <div class="grid grid-cols-2 gap-4 flex-1">
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Inicial</label>
                                    <input type="date" id="filterStartDate" value="${E.startDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Final</label>
                                    <input type="date" id="filterEndDate" value="${E.endDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
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
                        <button data-status="all" class="status-filter-btn px-4 py-2 text-sm font-bold rounded-xl transition whitespace-nowrap shadow-sm ${E.statusFilter==="all"?"bg-gray-900 text-white":"bg-white text-gray-600 hover:bg-gray-50"}">Todos os Status</button>
                        <button data-status="pending" class="status-filter-btn px-4 py-2 text-sm font-bold rounded-xl transition whitespace-nowrap shadow-sm ${E.statusFilter==="pending"?"bg-blue-600 text-white":"bg-white text-gray-600 hover:bg-gray-50"}">Pendente</button>
                        <button data-status="paid" class="status-filter-btn px-4 py-2 text-sm font-bold rounded-xl transition whitespace-nowrap shadow-sm ${E.statusFilter==="paid"?"bg-emerald-600 text-white":"bg-white text-gray-600 hover:bg-gray-50"}">Baixado</button>
                        <button data-status="overdue" class="status-filter-btn px-4 py-2 text-sm font-bold rounded-xl transition whitespace-nowrap shadow-sm ${E.statusFilter==="overdue"?"bg-red-600 text-white":"bg-white text-gray-600 hover:bg-gray-50"}">Atrasado</button>
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
    `,Ti()}function oc(){const t=E.currentTab==="receivables",e=t?E.receivables:E.payables;let a=e;if(E.statusFilter!=="all"&&(a=e.filter(n=>{const l=mt(n.dueDate,n.status);return E.statusFilter==="overdue"?l:E.statusFilter==="pending"?n.status==="pending"&&!l:n.status===E.statusFilter})),E.searchQuery&&(a=a.filter(n=>n.description&&n.description.toLowerCase().includes(E.searchQuery)||n.entity&&n.entity.toLowerCase().includes(E.searchQuery)||n.notes&&n.notes.toLowerCase().includes(E.searchQuery))),a.sort((n,l)=>new Date(n.dueDate)-new Date(l.dueDate)),a.length===0){g("Aviso","Não há dados para exportar com os filtros atuais.","info");return}const s=new Map(E.natures.map(n=>[n.id,n.name])),i=new Map(E.costCenters.map(n=>[n.id,n.name])),o=new Map(E.establishments.map(n=>[n.id,n])),r=a.map(n=>{const l=n.status==="paid",d=mt(n.dueDate,n.status);let u=l?"Baixado":d?"Atrasado":"A Vencer / Pendente";const c=n.naturezaId?s.get(n.naturezaId)||"Não Categorizado":"Geral",p=n.centroDeCustoId?i.get(n.centroDeCustoId)||"Não Categorizado":"Geral",m=o.get(n.establishmentId),b=m?m.name:"Atual",x=n.saleId||n.appointmentId||n.origin==="comanda"?"Comanda / PDV":n.origin==="commission"?"Comissões":"Manual";return{"Data de Vencimento":new Date(n.dueDate).toLocaleDateString("pt-BR"),"Data de Pagamento":n.paymentDate?new Date(n.paymentDate).toLocaleDateString("pt-BR"):"-",Descrição:n.description||"","Favorecido / Pagador":n.entity||"",Unidade:b,Natureza:c,"Centro de Custo":p,Origem:x,"Documento / NFS":n.documentNumber||"",Status:u,"Valor (R$)":n.amount}});try{if(typeof XLSX>"u"){g("Erro","A biblioteca de exportação (XLSX) não foi carregada no sistema.","error");return}const n=XLSX.utils.json_to_sheet(r),l=XLSX.utils.book_new();XLSX.utils.book_append_sheet(l,n,"Financeiro");const u=`Fluxo_${t?"Receitas":"Despesas"}_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(l,u)}catch(n){console.error("Erro ao exportar:",n),g("Erro","Não foi possível exportar para Excel.","error")}}function ic(){document.querySelectorAll(".sort-header").forEach(t=>{const e=t.querySelector("i.bi-chevron-expand, i.bi-chevron-up, i.bi-chevron-down");if(!e)return;t.dataset.sort===E.sortCol?(t.classList.add("text-indigo-700"),t.classList.remove("text-gray-500"),e.className=E.sortAsc?"bi bi-chevron-up ml-1 text-indigo-600 text-[11px] font-black":"bi bi-chevron-down ml-1 text-indigo-600 text-[11px] font-black"):(t.classList.remove("text-indigo-700"),t.classList.add("text-gray-500"),e.className="bi bi-chevron-expand ml-1 opacity-40 text-[10px] font-black")})}function Pi(){document.querySelectorAll(".sort-header").forEach(o=>{o.addEventListener("click",r=>{const n=r.currentTarget.dataset.sort;E.sortCol===n?E.sortAsc=!E.sortAsc:(E.sortCol=n,E.sortAsc=!0),Pt()})});const t=document.getElementById("select-all-toggle");t&&t.addEventListener("change",o=>{const r=o.target.checked,n=document.querySelectorAll(".item-checkbox");E.selectedIds.clear(),n.forEach(l=>{l.checked=r,r&&E.selectedIds.add(l.value)}),rt()}),document.getElementById("cancel-selection-btn").addEventListener("click",()=>{E.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(o=>o.checked=!1),rt()}),document.getElementById("batch-delete-btn").addEventListener("click",async()=>{const o=E.selectedIds.size;if(o===0)return;if(await K("Excluir Lançamentos",`Deseja realmente apagar ${o} registros financeiros?`))try{const n=E.currentTab==="payables"?"payables":"receivables";await Vo(n,Array.from(E.selectedIds)),g("Sucesso",`${o} itens excluídos.`,"success"),E.selectedIds.clear(),rt(),Ae()}catch{g("Erro","Falha ao excluir itens.","error")}}),document.getElementById("custom-date-btn").addEventListener("click",()=>{const o=document.getElementById("filter-panel"),r=document.getElementById("custom-date-btn");E.isAdvancedFilterOpen=!E.isAdvancedFilterOpen,E.isAdvancedFilterOpen?(o.classList.remove("hidden"),r.classList.add("bg-gray-900","text-white","border-gray-900"),r.classList.remove("bg-white","text-gray-600","border-gray-200")):(o.classList.add("hidden"),r.classList.remove("bg-gray-900","text-white","border-gray-900"),r.classList.add("bg-white","text-gray-600","border-gray-200"))});const e=document.getElementById("export-excel-btn");e&&e.addEventListener("click",oc);const a=document.getElementById("settings-btn");a&&a.addEventListener("click",lc),document.querySelectorAll('[data-action="new-financial"]').forEach(o=>{o.addEventListener("click",r=>{navigator.vibrate&&navigator.vibrate(20),po(r.target.closest("button").dataset.type)})});const s=document.getElementById("tab-receivables"),i=document.getElementById("tab-payables");s.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15),uo("receivables")}),i.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15),uo("payables")}),document.querySelectorAll(".status-filter-btn").forEach(o=>{o.addEventListener("click",r=>{navigator.vibrate&&navigator.vibrate(15),document.querySelectorAll(".status-filter-btn").forEach(l=>{l.classList.remove("bg-gray-900","bg-blue-600","bg-emerald-600","bg-red-600","text-white"),l.classList.add("bg-white","text-gray-600")});const n=r.target.dataset.status;n==="all"?r.target.classList.add("bg-gray-900","text-white"):n==="pending"?r.target.classList.add("bg-blue-600","text-white"):n==="paid"?r.target.classList.add("bg-emerald-600","text-white"):n==="overdue"&&r.target.classList.add("bg-red-600","text-white"),r.target.classList.remove("bg-white","text-gray-600"),E.statusFilter=n,Pt()})}),document.querySelectorAll(".date-preset-btn").forEach(o=>{o.addEventListener("click",r=>{navigator.vibrate&&navigator.vibrate(15),document.querySelectorAll(".date-preset-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),r.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.target.classList.remove("bg-white","text-gray-600","border-gray-200");const n=r.target.dataset.preset,l=new Date;let d,u;n==="month"?(d=new Date(l.getFullYear(),l.getMonth(),1),u=new Date(l.getFullYear(),l.getMonth()+1,0)):n==="last_month"&&(d=new Date(l.getFullYear(),l.getMonth()-1,1),u=new Date(l.getFullYear(),l.getMonth(),0)),document.getElementById("filterStartDate").value=d.toISOString().split("T")[0],document.getElementById("filterEndDate").value=u.toISOString().split("T")[0],E.startDate=d.toISOString().split("T")[0],E.endDate=u.toISOString().split("T")[0],Ae()})}),document.getElementById("searchInput").addEventListener("input",o=>{E.searchQuery=o.target.value.toLowerCase(),Pt()}),document.getElementById("clear-filters-btn").addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15);const o=new Date;document.getElementById("filterStartDate").value=new Date(o.getFullYear(),o.getMonth(),1).toISOString().split("T")[0],document.getElementById("filterEndDate").value=new Date(o.getFullYear(),o.getMonth()+1,0).toISOString().split("T")[0],document.getElementById("filterNaturezaId").value="all",document.getElementById("filterCostCenterId").value="all",Di(),Pi(),Ae()}),document.getElementById("apply-filter-btn").addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(20),E.startDate=document.getElementById("filterStartDate").value,E.endDate=document.getElementById("filterEndDate").value,E.filterNaturezaId=document.getElementById("filterNaturezaId").value,E.filterCostCenterId=document.getElementById("filterCostCenterId").value,document.getElementById("custom-date-btn").click(),Ae()}),sa&&document.body.removeEventListener("click",sa),sa=o=>{const r=o.target;if(r.classList.contains("item-checkbox")||r.classList.contains("modal-item-checkbox")){const d=r.value||r.dataset.id;r.checked?E.selectedIds.add(d):E.selectedIds.delete(d),rt(),o.stopPropagation();return}const n=r.closest("button[data-action]");if(n){const{action:d,type:u,id:c}=n.dataset;if(d==="mark-as-paid"){o.stopPropagation(),navigator.vibrate&&navigator.vibrate(20),rc(u,c);return}if(d==="delete"){o.stopPropagation(),navigator.vibrate&&navigator.vibrate(30);const p=n.closest(".financial-row").dataset.item;try{Bi(u,JSON.parse(decodeURIComponent(p)))}catch(m){console.error("Parse error on delete",m)}return}if(d==="manage-natures"){o.stopPropagation(),co("nature");return}if(d==="manage-cost-centers"){o.stopPropagation(),co("cost-center");return}if(d==="close-modal"){o.stopPropagation(),Nt();return}}const l=r.closest(".financial-row");if(l&&document.getElementById("list-container").contains(l)&&!r.closest("button")&&!r.closest(".item-checkbox")){navigator.vibrate&&navigator.vibrate(15);const{type:d}=l.dataset;try{const u=JSON.parse(decodeURIComponent(l.dataset.item));po(d,u)}catch(u){console.error("Parse error on card click",u),g("Erro","Os dados deste lançamento não puderam ser lidos corretamente.","error")}}},document.body.addEventListener("click",sa),oa&&document.getElementById("genericModal").removeEventListener("click",oa),oa=o=>{const r=o.target.closest('button[data-action^="delete-"]');if(r){const n=r.dataset.action.split("-")[1];handleDeleteHierarchyItem(n,r.dataset.id)}o.target===document.getElementById("genericModal")&&Nt()},document.getElementById("genericModal").addEventListener("click",oa)}function rt(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=E.selectedIds.size;e.textContent=a,a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex"))}function uo(t){E.currentTab=t,E.selectedIds.clear(),rt(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1);const e=document.getElementById("tab-receivables"),a=document.getElementById("tab-payables");t==="receivables"?(e.classList.add("bg-white","md:bg-emerald-50","text-emerald-700","shadow-sm","md:shadow-none"),e.classList.remove("text-gray-500"),a.classList.remove("bg-white","md:bg-red-50","text-red-700","shadow-sm","md:shadow-none"),a.classList.add("text-gray-500")):(a.classList.add("bg-white","md:bg-red-50","text-red-700","shadow-sm","md:shadow-none"),a.classList.remove("text-gray-500"),e.classList.remove("bg-white","md:bg-emerald-50","text-emerald-700","shadow-sm","md:shadow-none"),e.classList.add("text-gray-500")),Pt(),Ai()}async function Ae(){const t=document.getElementById("list-container");t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-sm">A sincronizar carteira...</p></div>';try{if(E.natures.length===0){const[r,n,l,d,u]=await Promise.all([Ma(f.establishmentId),ks(f.establishmentId),Ft(f.establishmentId).catch(()=>[]),xt(f.establishmentId,"",1e3).catch(()=>[]),Pe(f.establishmentId).catch(()=>[])]);E.natures=r||[],E.costCenters=n||[],E.suppliers=l||[],E.clients=d||[],E.professionals=u||[],Ti()}const a=(f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId]).join(","),s={startDate:E.startDate,endDate:E.endDate,establishmentId:a};E.filterNaturezaId!=="all"&&(s.natureId=E.filterNaturezaId),E.filterCostCenterId!=="all"&&(s.costCenterId=E.filterCostCenterId);const[i,o]=await Promise.all([Is(s),ja(s)]);E.payables=i.entries||[],E.receivables=o.entries||[],Ai(),Pt()}catch(e){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-sm font-bold">Erro ao carregar dados: ${e.message}</p>
            </div>`}}function Ti(){const t=s=>{let i='<option value="all">Todas as categorias</option>';const o=js(s),r=(n,l=0)=>{const d="  ".repeat(l)+(l>0?"↳ ":"");i+=`<option value="${n.id}">${d}${v(n.name)}</option>`,n.children.forEach(u=>r(u,l+1))};return o.forEach(n=>r(n)),i},e=document.getElementById("filterNaturezaId"),a=document.getElementById("filterCostCenterId");e&&(e.innerHTML=t(E.natures)),a&&(a.innerHTML=t(E.costCenters))}function Ai(){const t=document.getElementById("summary-section");if(!t)return;const e=E.currentTab==="receivables";let s=e?E.receivables:E.payables;E.searchQuery&&(s=s.filter(u=>u.description&&u.description.toLowerCase().includes(E.searchQuery)||u.entity&&u.entity.toLowerCase().includes(E.searchQuery)||u.notes&&u.notes.toLowerCase().includes(E.searchQuery)));const i=s.reduce((u,c)=>u+c.amount,0),o=s.filter(u=>u.status==="paid").reduce((u,c)=>u+c.amount,0),r=s.filter(u=>u.status==="pending"&&!mt(u.dueDate,u.status)).reduce((u,c)=>u+c.amount,0),n=s.filter(u=>mt(u.dueDate,u.status)).reduce((u,c)=>u+c.amount,0),l=e?"emerald":"red",d=e?"bi-arrow-down-left-circle-fill text-emerald-500":"bi-arrow-up-right-circle-fill text-red-500";t.innerHTML=`
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 md:p-4 rounded-2xl md:rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-50 flex items-center justify-center">
                    <i class="bi ${d} text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Total<br class="md:hidden"/> Geral</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-gray-900">${we(i)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 md:p-4 rounded-2xl md:rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-50 flex items-center justify-center">
                    <i class="bi bi-clock-history text-blue-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">A Vencer<br class="md:hidden"/> Pendente</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-blue-600">${we(r)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 md:p-4 rounded-2xl md:rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-${l}-50 flex items-center justify-center">
                    <i class="bi bi-check-circle-fill text-${l}-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Status<br class="md:hidden"/> Baixado</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-${l}-600">${we(o)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 md:p-4 rounded-2xl md:rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full ${n>0?"bg-red-50":"bg-gray-50"} flex items-center justify-center">
                    <i class="bi bi-exclamation-circle-fill ${n>0?"text-red-500":"text-gray-300"} text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Pagos<br class="md:hidden"/> Atrasados</span>
            </div>
            <span class="text-xl md:text-2xl font-black ${n>0?"text-red-600":"text-gray-400"}">${we(n)}</span>
        </div>
    `}function Pt(){const t=document.getElementById("list-container");if(!t)return;const e=E.currentTab==="receivables",a=e?E.receivables:E.payables;let s=a;if(E.statusFilter!=="all"&&(s=a.filter(c=>{const p=mt(c.dueDate,c.status);return E.statusFilter==="overdue"?p:E.statusFilter==="pending"?c.status==="pending"&&!p:c.status===E.statusFilter})),E.searchQuery&&(s=s.filter(c=>c.description&&c.description.toLowerCase().includes(E.searchQuery)||c.entity&&c.entity.toLowerCase().includes(E.searchQuery)||c.notes&&c.notes.toLowerCase().includes(E.searchQuery))),s.sort((c,p)=>{let m=c[E.sortCol],b=p[E.sortCol];return E.sortCol==="dueDate"?(m=new Date(m).getTime(),b=new Date(b).getTime()):(E.sortCol==="description"||E.sortCol==="status")&&(m=m?m.toLowerCase():"",b=b?b.toLowerCase():""),m<b?E.sortAsc?-1:1:m>b?E.sortAsc?1:-1:0}),ic(),s.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white">
                <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                    <i class="bi bi-wallet2 text-4xl text-gray-300"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-1">Sem resultados</h3>
                <p class="text-sm font-medium text-gray-400 text-center px-4">Não existem lançamentos com os filtros aplicados neste período.</p>
            </div>
        `;return}const i=new Map(E.natures.map(c=>[c.id,c.name])),o=new Map(E.costCenters.map(c=>[c.id,c.name])),r=new Map(E.establishments.map(c=>[c.id,c])),n=e?"receivable":"payable",l=e?"text-emerald-600":"text-red-600",d=e?'<i class="bi bi-arrow-down-left-circle-fill text-emerald-500 text-2xl drop-shadow-sm"></i>':'<i class="bi bi-arrow-up-right-circle-fill text-red-500 text-2xl drop-shadow-sm"></i>',u=e?'<i class="bi bi-arrow-down-left-circle-fill text-emerald-500 text-lg"></i>':'<i class="bi bi-arrow-up-right-circle-fill text-red-500 text-lg"></i>';t.innerHTML=s.map(c=>{const p=Ci(c.dueDate),m=c.status==="paid",b=mt(c.dueDate,c.status);let x="";m?x='<span class="text-[9px] md:text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 md:px-2.5 py-1 rounded-lg uppercase tracking-widest"><i class="bi bi-check2-circle"></i> Baixado</span>':b?x='<span class="text-[9px] md:text-[10px] font-black text-red-600 bg-red-50 px-2 md:px-2.5 py-1 rounded-lg uppercase tracking-widest"><i class="bi bi-exclamation-circle"></i> Atraso</span>':x='<span class="text-[9px] md:text-[10px] font-black text-blue-600 bg-blue-50 px-2 md:px-2.5 py-1 rounded-lg uppercase tracking-widest"><i class="bi bi-clock"></i> Pendente</span>';const y=c.naturezaId&&i.get(c.naturezaId)||"Geral",I=c.centroDeCustoId&&o.get(c.centroDeCustoId)||"Geral",S=r.get(c.establishmentId);let L="";if(S){const k=S.type==="Matriz"?"bi-building":"bi-shop";L=`<span class="text-[9px] font-bold text-gray-600 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200 flex items-center max-w-[110px] truncate leading-none shadow-sm" title="${v(S.name)}"><i class="bi ${k} mr-1 opacity-60"></i> ${v(S.name)}</span>`}const q=encodeURIComponent(JSON.stringify(c)),N=E.selectedIds.has(c.id),D=!!c.recurrenceId?'<i class="bi bi-arrow-repeat text-indigo-600 ml-1 text-sm md:text-base bg-indigo-50 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center shadow-sm" title="Recorrente"></i>':"";return`
        <div class="financial-row bg-white border border-gray-100 md:border-0 md:border-b md:border-gray-100 hover:bg-gray-50 transition-all cursor-pointer relative flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center p-3.5 md:px-6 md:py-4 mb-3 md:mb-0 rounded-2xl md:rounded-none ${N?"ring-2 md:ring-0 ring-indigo-500 bg-indigo-50/50 md:bg-indigo-50/50":""} ${m?"opacity-70 md:opacity-100":""}"
             data-type="${n}"
             data-item="${q}">
            
            <div class="absolute right-3 top-3 md:relative md:right-auto md:top-auto md:col-span-1 flex md:justify-center z-10">
                <input type="checkbox" value="${c.id}" class="item-checkbox w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm bg-white" ${N?"checked":""}>
            </div>

            <div class="md:hidden flex items-start gap-3 w-full pr-6">
                <div class="flex-shrink-0 relative pt-1">
                    ${d}
                </div>
                <div class="flex-1 min-w-0 flex flex-col">
                    <div class="flex justify-between items-center mb-1">
                        <p class="font-bold text-[14px] text-gray-900 truncate leading-tight pr-2 ${m?"line-through text-gray-400":""}">${v(c.description)}</p>
                        <p class="font-black text-[16px] leading-none flex-shrink-0 ${m?"text-gray-400":l}">${we(c.amount)}</p>
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
                                ${L}
                                ${D}
                            </div>
                        </div>
                        <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
                            ${x}
                            ${m?"":`
                            <button data-action="mark-as-paid" data-type="${n}" data-id="${c.id}" class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors shadow-sm" title="Dar Baixa">
                                <i class="bi bi-check2-all text-xs font-bold"></i>
                            </button>
                            `}
                        </div>
                    </div>
                </div>
            </div>

            <div class="hidden md:flex md:col-span-1 flex-col items-center justify-center ${m?"opacity-50":""}">
                <span class="text-base font-black text-gray-900 leading-none">${p.day}</span>
                <span class="text-[9px] font-bold text-gray-500 uppercase leading-none mt-1">${p.month}</span>
            </div>

            <div class="hidden md:flex md:col-span-4 flex-col justify-center min-w-0 pr-4">
                <div class="flex items-center gap-2.5">
                    ${u}
                    <p class="font-bold text-sm text-gray-900 truncate ${m?"line-through text-gray-400":""}">${v(c.description)}</p>
                    ${c.documentNumber?`<span class="text-[9px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-lg border border-gray-200 shadow-sm leading-none flex-shrink-0">NF: ${v(c.documentNumber)}</span>`:""}
                </div>
                <p class="text-xs text-gray-500 font-semibold truncate mt-1.5 pl-7"><i class="bi bi-person opacity-60 mr-1.5"></i>${v(c.entity||"Sem Entidade associada")}</p>
            </div>

            <div class="hidden md:flex md:col-span-2 flex-col justify-center min-w-0 pr-4 gap-1.5">
                <span class="text-[10px] font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200 w-max max-w-full truncate shadow-sm"><i class="bi bi-tag opacity-50 mr-1.5"></i>${y}</span>
                <span class="text-[10px] font-semibold text-gray-500 truncate w-max max-w-full"><i class="bi bi-diagram-3 opacity-50 mr-1.5"></i>${I}</span>
            </div>

            <div class="hidden md:flex md:col-span-1 justify-center items-center">
                ${x}
            </div>

            <div class="hidden md:flex md:col-span-2 justify-end items-center pr-6">
                <p class="font-black text-lg ${m?"text-gray-400":l}">${we(c.amount)}</p>
            </div>

            <div class="hidden md:flex md:col-span-1 justify-center items-center gap-2 z-20">
                ${m?"":`
                <button data-action="mark-as-paid" data-type="${n}" data-id="${c.id}" class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 border border-emerald-100 transition-colors shadow-sm" title="Dar Baixa">
                    <i class="bi bi-check2-all text-base font-bold"></i>
                </button>
                `}
                <button data-action="delete" data-type="${n}" data-id="${c.id}" class="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 border border-red-100 transition-colors shadow-sm" title="Excluir">
                    <i class="bi bi-trash3 text-sm"></i>
                </button>
            </div>

        </div>
        `}).join("")}async function rc(t,e){const a=new Date().toISOString().split("T")[0];try{await(t==="payable"?Gr(e,a):Zr(e,a)),g("Baixa Realizada","O lançamento foi registado como pago.","success"),await Ae()}catch(s){g("Erro",s.message,"error")}}async function Bi(t,e){if(!!!e.recurrenceId){await K("Excluir Lançamento","Tem certeza? Essa ação apagará o registo do seu fluxo de caixa.")&&await Mi(t,[e.id]);return}nc(t,e)}function nc(t,e){const a=document.getElementById("genericModal"),i=(t==="payable"?E.payables:E.receivables).filter(d=>d.recurrenceId===e.recurrenceId).sort((d,u)=>new Date(d.dueDate)-new Date(u.dueDate));a.className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 p-0 md:p-6",a.innerHTML=`
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
                ${i.map(d=>{const u=d.id===e.id,c=d.status==="paid",p=Ci(d.dueDate);return`
                    <label class="flex items-center gap-4 p-4 bg-white rounded-2xl border ${u?"border-red-400 ring-2 ring-red-100 shadow-md bg-red-50/20":"border-gray-200 shadow-sm"} cursor-pointer transition-all hover:bg-gray-50 active:scale-[0.98]">
                        <input type="checkbox" class="modal-item-checkbox w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" value="${d.id}" ${u?"checked":""}>
                        
                        <div class="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex flex-col items-center justify-center border border-gray-200">
                            <span class="text-base font-black text-gray-800 leading-none">${p.day}</span>
                            <span class="text-[9px] font-bold text-gray-500 uppercase leading-none mt-1.5">${p.month}</span>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-bold text-gray-900 truncate">${v(d.description)}</p>
                            <p class="text-sm font-black text-gray-600 mt-1">${we(d.amount)} ${c?'<span class="text-emerald-600 font-bold ml-1">(Baixado)</span>':""}</p>
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
    `,a.style.display="flex",requestAnimationFrame(()=>{a.classList.remove("opacity-0");const d=a.querySelector("#modal-content-wrapper");d&&(d.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),d.classList.add("translate-y-0","md:scale-100","md:opacity-100"))});const o=a.querySelector("#modal-select-all"),r=a.querySelectorAll(".modal-item-checkbox"),n=a.querySelector("#confirm-batch-delete");o.addEventListener("change",d=>{r.forEach(u=>u.checked=d.target.checked),l()}),r.forEach(d=>d.addEventListener("change",l));function l(){const d=Array.from(r).filter(u=>u.checked).length;n.innerHTML=d>0?`<i class="bi bi-trash3-fill"></i> Excluir ${d} Parcela(s)`:"Selecione para excluir",n.disabled=d===0,d===0?n.classList.add("opacity-50","bg-gray-400"):n.classList.remove("opacity-50","bg-gray-400")}n.addEventListener("click",async()=>{const d=Array.from(r).filter(c=>c.checked).map(c=>c.value);if(d.length===0)return;Nt(),await K("Confirmar Ação",`Tem certeza que deseja apagar estas ${d.length} parcelas permanentemente?`)&&await Mi(t,d)}),l()}async function Mi(t,e){try{e.length===1?t==="payable"?await Jr(e[0]):await Xr(e[0]):await Vo(t==="payable"?"payables":"receivables",e),g("Sucesso",`${e.length} registo(s) limpo(s) do sistema.`,"success"),E.selectedIds.clear(),rt(),await Ae()}catch(a){g("Erro",a.message,"error")}}function lc(){const t=document.getElementById("genericModal");t.className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 p-0 md:p-6",t.innerHTML=`
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
    `,t.style.display="flex",requestAnimationFrame(()=>{t.classList.remove("opacity-0");const e=t.querySelector("#modal-content-wrapper");e&&(e.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),e.classList.add("translate-y-0","md:scale-100","md:opacity-100"))})}function po(t,e=null){const a=document.getElementById("genericModal"),s=t==="payable",i=s?"red":"emerald",o=e?"Editar Lançamento":"Novo Lançamento",r=(k,O)=>{let _='<option value="">-- Categoria --</option>';const C=js(k),M=(H,B=0)=>{const G="  ".repeat(B)+(B>0?"↳ ":""),Y=H.id===O?"selected":"";_+=`<option value="${H.id}" ${Y}>${G}${v(H.name)}</option>`,H.children.forEach(Q=>M(Q,B+1))};return C.forEach(H=>M(H)),_},l=[{value:"dinheiro",label:"Dinheiro"},{value:"pix",label:"PIX"},{value:"cartao_credito",label:"Cartão de Crédito"},{value:"cartao_debito",label:"Cartão de Débito"},{value:"transferencia",label:"Transferência Bancária"},{value:"boleto",label:"Boleto"},{value:"outros",label:"Outros"}].map(k=>`<option value="${k.value}" ${e?.paymentMethod===k.value?"selected":""}>${k.label}</option>`).join(""),d=`
        <datalist id="entity-suggestions">
            ${s?E.suppliers.map(k=>`<option value="${v(k.name)}">Fornecedor</option>`).join("")+E.professionals.map(k=>`<option value="${v(k.name)}">Profissional</option>`).join(""):E.clients.map(k=>`<option value="${v(k.name)} ${k.phone?"- "+v(k.phone):""}">Cliente</option>`).join("")}
        </datalist>
    `,u=e?.establishmentId||f.selectedEstablishments&&f.selectedEstablishments[0]||f.establishmentId,c=E.establishments.map(k=>{const O=k.id===u;return`<option value="${k.id}" ${O?"selected":""}>${k.type==="Matriz"?"🏢":"📍"} ${v(k.name)}</option>`}).join("");a.className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 md:p-6",a.innerHTML=`
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
                                    ${r(E.natures,e?.naturezaId)}
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Centro de Custo</label>
                                <select name="centroDeCustoId" class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${i}-500 outline-none text-sm font-bold text-gray-700 transition-all shadow-sm">
                                    ${r(E.costCenters,e?.centroDeCustoId)}
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
    `,a.style.display="flex",requestAnimationFrame(()=>{a.classList.remove("opacity-0");const k=a.querySelector("#modal-content-wrapper");k&&(k.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),k.classList.add("translate-y-0","md:scale-100","md:opacity-100"))});const p=a.querySelector("#financial-form");let m="single",b=2;const x=p.querySelector("#modal-delete-btn");x&&x.addEventListener("click",k=>{k.preventDefault(),navigator.vibrate&&navigator.vibrate(30),Nt(),setTimeout(()=>Bi(t,e),300)});const y=p.querySelector('[name="amount"]'),I=p.querySelector("#recurrence-options"),S=p.querySelector("#recurrence-summary"),L=p.querySelector("#installments-input"),q=p.querySelector("#status-toggle"),N=p.querySelector("#payment-date-wrapper"),F=p.querySelector('[name="paymentDate"]'),D=()=>{if(m==="single")return;const k=parseFloat(y.value)||0;if(b=parseInt(L.value)||2,k===0){S.innerHTML='<span class="text-[10px] md:text-xs text-indigo-400 font-bold">Digite o valor total...</span>';return}if(m==="installment"){const O=k/b;S.innerHTML=`
                <div>
                    <span class="block text-[8px] md:text-[10px] text-indigo-400 uppercase tracking-widest font-black mb-0.5">Simulação do Parcelamento</span>
                    <span class="font-black text-sm md:text-base text-indigo-700 block leading-tight">${b}x de ${we(O)}</span>
                    <span class="text-[9px] md:text-[10px] text-indigo-500 font-bold mt-1 block bg-indigo-50/50 p-1 rounded">Total da Dívida: ${we(k)}</span>
                </div>
            `}else if(m==="repeat"){const O=k*b;S.innerHTML=`
                <div>
                    <span class="block text-[8px] md:text-[10px] text-indigo-400 uppercase tracking-widest font-black mb-0.5">Geração Recorrente Fixa</span>
                    <span class="font-black text-sm md:text-base text-indigo-700 block leading-tight">${b} meses de ${we(k)}</span>
                    <span class="text-[9px] md:text-[10px] text-indigo-500 font-bold mt-1 block bg-indigo-50/50 p-1 rounded">Comprometimento: ${we(O)}</span>
                </div>
            `}};p.addEventListener("click",k=>{const O=k.target.closest(".mode-btn");if(O&&!e)if(k.preventDefault(),navigator.vibrate&&navigator.vibrate(15),p.querySelectorAll(".mode-btn").forEach(M=>{M.classList.remove("bg-white","text-gray-900","shadow-sm"),M.classList.add("text-gray-500")}),O.classList.add("bg-white","text-gray-900","shadow-sm"),O.classList.remove("text-gray-500"),m=O.dataset.mode,m==="single")I.style.display="none";else{I.style.display="block";const M=I.querySelector("#recurrence-label");M&&(M.textContent=m==="installment"?"Número de Parcelas":"Repetir por quantos meses?"),D()}if(k.target.closest("#btn-minus")&&L){k.preventDefault(),navigator.vibrate&&navigator.vibrate(10);let M=parseInt(L.value)||2;M>2&&(L.value=M-1,D())}if(k.target.closest("#btn-plus")&&L){k.preventDefault(),navigator.vibrate&&navigator.vibrate(10);let M=parseInt(L.value)||2;M<60&&(L.value=M+1,D())}}),y.addEventListener("input",D),L&&L.addEventListener("input",D),q.addEventListener("change",()=>{navigator.vibrate&&navigator.vibrate(20),q.checked?(N.classList.remove("hidden"),F.required=!0):(N.classList.add("hidden"),F.required=!1)}),p.addEventListener("submit",async k=>{k.preventDefault();const O=p.querySelector('button[type="submit"]'),_=O.innerHTML;O.disabled=!0,O.innerHTML='<div class="loader mx-auto h-5 w-5 border-2 border-white border-t-transparent"></div>';const C=new FormData(p),M=q.checked,H=parseFloat(C.get("amount"));let B=H,G=1;!e&&m!=="single"&&(G=parseInt(C.get("installments")),m==="repeat"&&(B=H*G));const Y=C.get("establishmentId");if(!Y){g("Atenção","Selecione uma Unidade válida para o lançamento.","warning"),O.disabled=!1,O.innerHTML=_;return}const Q={companyId:f.companyId,establishmentId:Y,description:C.get("description"),amount:B,dueDate:C.get("dueDate"),naturezaId:C.get("naturezaId")||null,centroDeCustoId:C.get("centroDeCustoId")||null,entity:C.get("entity")||null,paymentMethod:C.get("paymentMethod")||null,documentNumber:C.get("documentNumber")||null,notes:C.get("notes"),status:M?"paid":"pending",paymentDate:M?C.get("paymentDate"):null,installments:G};G>1&&!e&&(Q.recurrenceId=self.crypto.randomUUID());try{e?(await(s?Wr(e.id,Q):Yr(e.id,Q)),g("Sucesso","Atualizado com sucesso!","success")):(await(s?Wo(Q):Qr(Q)),g("Sucesso","Lançamento criado!","success")),Nt(),Ae()}catch(T){g("Erro",T.message||"Erro ao salvar","error"),O.disabled=!1,O.innerHTML=_}})}const dc=t=>A("/api/commissions/calculate",{method:"POST",body:JSON.stringify(t)}),cc=t=>A("/api/commissions/save",{method:"POST",body:JSON.stringify(t)}),uc=(t,e)=>{const a=new URLSearchParams({startDate:t,endDate:e}).toString();return A(`/api/commissions/stats?${a}`)},pc=(t={})=>{Object.keys(t).forEach(s=>(t[s]===void 0||t[s]===null||t[s]==="")&&delete t[s]);const e=new URLSearchParams(t).toString(),a=`/api/commissions/history${e?"?"+e:""}`;return A(a)},ji=t=>A(`/api/commissions/report/${t}`,{method:"DELETE"}),Ea=new Date,bc=new Date(Ea.getFullYear(),Ea.getMonth(),1);let z={professionals:[],reports:[],calculationResult:null,periodString:"",establishmentConfig:null,selectedIds:new Set,isAdvancedFilterOpen:!1,startDate:bc.toISOString().split("T")[0],endDate:new Date(Ea.getFullYear(),Ea.getMonth()+1,0).toISOString().split("T")[0],professionalId:"all",searchQuery:"",stats:{revenue:0,commissions:0,margin:0,netPaid:0},viewMode:"list"},ia=null;const mc=document.getElementById("content");function Tt(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function gc(t){return t?new Date(t).toLocaleDateString("pt-BR"):"--/--/----"}function $a(t){if(!t)return"PR";const e=t.trim().split(" ");return e.length>=2?(e[0][0]+e[e.length-1][0]).toUpperCase():t.substring(0,2).toUpperCase()}function qi(){const t=document.getElementById("commissions-layout-main"),e=document.getElementById("commissions-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&(t.style.display="none"),e&&(e.classList.remove("hidden"),e.className="fixed inset-0 z-[99999] bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-end md:justify-center w-full h-[100dvh] overflow-hidden"),a&&window.innerWidth<768&&(a.style.display="none")}function qs(){const t=document.getElementById("commissions-layout-main"),e=document.getElementById("commissions-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&(t.style.display="flex"),e&&(e.classList.add("hidden"),e.className="hidden"),a&&window.innerWidth<768&&(a.style.display=""),z.viewMode="list",z.calculationResult=null}async function fc(){try{const[t,e]=await Promise.all([Pe(f.establishmentId),Be(f.establishmentId).catch(()=>({}))]);z.professionals=t,z.establishmentConfig=e||{}}catch(t){console.error("Erro na inicialização de comissões",t)}z.viewMode="list",xc(),vc(),await gt()}function xc(){const t=z.professionals.map(e=>`<option value="${e.id}">${e.name}</option>`).join("");mc.innerHTML=`
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
                            <input type="text" id="search-input" value="${z.searchQuery}" placeholder="Buscar relatórios..." class="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 shadow-sm rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                        </div>
                    </div>

                    <div id="filter-panel" class="hidden animate-fade-in-down">
                        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                            <div class="grid grid-cols-2 gap-4 flex-1">
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Inicial</label>
                                    <input type="date" id="filter-start" value="${z.startDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Final</label>
                                    <input type="date" id="filter-end" value="${z.endDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
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
    `}async function gt(){const t=document.getElementById("list-container");t&&(t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-sm">Carregando comissões...</p></div>');const a=(f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId]).join(",");try{const[s,i]=await Promise.all([pc({startDate:z.startDate,endDate:z.endDate,professionalId:z.professionalId,establishmentId:a}),uc(z.startDate,z.endDate,a)]);z.reports=s||[];const o=z.reports.reduce((r,n)=>r+(n.summary.finalValue||n.summary.totalCommission),0);z.stats={revenue:i.totalRevenue||0,commissions:i.totalCommissionsPaid||0,margin:i.totalRevenue>0?((i.totalRevenue-i.totalCommissionsPaid)/i.totalRevenue*100).toFixed(1):0,netPaid:o},z.selectedIds.clear(),At(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),hc(),Fi()}catch(s){console.error(s),t&&(t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-sm font-medium">Erro ao carregar dados.</p>
            </div>`)}}function hc(){const t=document.getElementById("kpi-section");t&&(t.innerHTML=`
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-50 flex items-center justify-center">
                    <i class="bi bi-graph-up-arrow text-indigo-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Faturamento<br class="md:hidden"/> Bruto</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-gray-900">${Tt(z.stats.revenue)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-amber-50 flex items-center justify-center">
                    <i class="bi bi-wallet2 text-amber-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Comissões<br class="md:hidden"/> Pagas</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-amber-600">${Tt(z.stats.commissions)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-50 flex items-center justify-center">
                    <i class="bi bi-pie-chart-fill text-blue-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Retenção<br class="md:hidden"/> Líquida</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-blue-600">${z.stats.margin}%</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                    <i class="bi bi-cash-stack text-emerald-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Líquido<br class="md:hidden"/> Pago</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-emerald-600">${Tt(z.stats.netPaid)}</span>
        </div>
    `)}function Fi(){const t=document.getElementById("list-container");if(!t)return;let e=z.reports;if(z.searchQuery){const a=z.searchQuery.toLowerCase();e=e.filter(s=>s.professionalName.toLowerCase().includes(a)||s.period.toLowerCase().includes(a))}if(e.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white md:bg-transparent text-center rounded-b-2xl">
                <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                    <i class="bi bi-receipt text-4xl text-gray-300"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-1">Nenhum pagamento</h3>
                <p class="text-sm font-medium text-gray-400 max-w-xs px-4">Não há relatórios gerados para este período ou profissional.</p>
            </div>
        `;return}t.innerHTML=e.map(a=>{const s=gc(a.createdAt),i=a.summary.totalCommission,o=a.summary.extraDebit||0,r=a.summary.extraCredit||0,n=a.summary.finalValue||i,l=z.selectedIds.has(a.id),d=a.establishmentName||"Unidade Atual";let u="";return o>0&&r>0?u=`<span class="text-red-500">-R$${o.toFixed(2)}</span> / <span class="text-emerald-500">+R$${r.toFixed(2)}</span>`:o>0?u=`<span class="text-red-500">-R$ ${o.toFixed(2)}</span>`:r>0?u=`<span class="text-emerald-500">+R$ ${r.toFixed(2)}</span>`:u='<span class="text-gray-300">--</span>',`
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
                <span class="text-sm font-bold text-gray-700">${Tt(i)}</span>
            </div>
            
            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-2 md:mb-0">
                <span class="md:hidden text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ajustes:</span>
                <span class="text-xs font-bold">${u}</span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block pt-2 md:pt-0 border-t md:border-0 border-gray-100 mt-2 md:mt-0">
                <span class="md:hidden text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Líquido Pago:</span>
                <span class="text-base font-black text-emerald-600">${Tt(n)}</span>
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
        `}).join("")}function vc(){ia&&document.body.removeEventListener("click",ia),ia=o=>{const r=o.target;if(r.classList.contains("item-checkbox")){const l=r.value;r.checked?z.selectedIds.add(l):z.selectedIds.delete(l),At(),o.stopPropagation();return}const n=r.closest("button[data-action]");if(n){o.preventDefault();const l=n.dataset.action,d=n.dataset.id;switch(l){case"apply-filters":z.startDate=document.getElementById("filter-start").value,z.endDate=document.getElementById("filter-end").value,z.professionalId=document.getElementById("filter-prof").value,document.getElementById("custom-date-btn")?.click(),gt();break;case"new-calculation":wc();break;case"whatsapp-receipt":Cc(d);break;case"print-receipt":Pc(d);break;case"delete-report":Ac(d);break;case"view-report-details":Lc(d);break;case"close-detail-screen":qs();break;case"set-calc-preset":yc(n);break;case"toggle-all-profs":const u=document.querySelectorAll(".prof-checkbox"),c=Array.from(u).every(x=>x.checked);u.forEach(x=>x.checked=!c),document.querySelectorAll(".prof-toggle-ui").forEach(x=>{c?(x.classList.replace("bg-indigo-500","bg-slate-100"),x.classList.replace("border-indigo-500","border-slate-300"),x.querySelector(".toggle-dot").classList.replace("translate-x-4","translate-x-0")):(x.classList.replace("bg-slate-100","bg-indigo-500"),x.classList.replace("border-slate-300","border-indigo-500"),x.querySelector(".toggle-dot").classList.replace("translate-x-0","translate-x-4"))});break;case"calculate-preview":kc();break;case"save-final-reports":$c();break;case"toggle-preview-details":const p=n.dataset.idx,m=document.getElementById(`preview-details-${p}`),b=n.querySelector("i.chevron-icon");m&&(m.classList.contains("hidden")?(m.classList.remove("hidden"),b&&b.classList.replace("bi-chevron-down","bi-chevron-up")):(m.classList.add("hidden"),b&&b.classList.replace("bi-chevron-up","bi-chevron-down")));break}}},document.body.addEventListener("click",ia),document.body.addEventListener("change",o=>{if(o.target.classList.contains("custom-toggle-input")){const r=o.target.closest("label"),n=r.querySelector(".toggle-bg"),l=r.querySelector(".toggle-dot"),d=r.querySelector(".toggle-text");o.target.checked?(n.classList.replace("bg-slate-200","bg-indigo-500"),l.classList.replace("translate-x-1","translate-x-6"),d&&d.classList.replace("text-slate-500","text-indigo-700")):(n.classList.replace("bg-indigo-500","bg-slate-200"),l.classList.replace("translate-x-6","translate-x-1"),d&&d.classList.replace("text-indigo-700","text-slate-500"))}if(o.target.classList.contains("prof-checkbox")){const r=o.target.closest("label"),n=r.querySelector(".prof-toggle-ui"),l=r.querySelector(".toggle-dot");o.target.checked?(n.classList.replace("bg-slate-100","bg-indigo-500"),n.classList.replace("border-slate-300","border-indigo-500"),l.classList.replace("translate-x-0","translate-x-4")):(n.classList.replace("bg-indigo-500","bg-slate-100"),n.classList.replace("border-indigo-500","border-slate-300"),l.classList.replace("translate-x-4","translate-x-0"))}});const t=document.getElementById("search-input");t&&t.addEventListener("input",o=>{z.searchQuery=o.target.value,Fi()}),document.body.addEventListener("input",o=>{(o.target.classList.contains("input-debit")||o.target.classList.contains("input-credit")||o.target.classList.contains("input-notes"))&&Sc(o.target.dataset.idx)});const e=document.getElementById("select-all-toggle");e&&e.addEventListener("change",o=>{const r=o.target.checked,n=document.querySelectorAll(".item-checkbox");z.selectedIds.clear(),n.forEach(l=>{l.checked=r,r&&z.selectedIds.add(l.value)}),At()});const a=document.getElementById("cancel-selection-btn");a&&a.addEventListener("click",()=>{z.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(o=>o.checked=!1),At()});const s=document.getElementById("batch-delete-btn");s&&s.addEventListener("click",Tc);const i=document.getElementById("export-excel-btn");i&&i.addEventListener("click",Dc),document.getElementById("custom-date-btn")?.addEventListener("click",()=>{const o=document.getElementById("filter-panel"),r=document.getElementById("custom-date-btn");z.isAdvancedFilterOpen=!z.isAdvancedFilterOpen,z.isAdvancedFilterOpen?(o.classList.remove("hidden"),r.classList.add("bg-gray-900","text-white","border-gray-900"),r.classList.remove("bg-white","text-gray-600","border-gray-200")):(o.classList.add("hidden"),r.classList.remove("bg-gray-900","text-white","border-gray-900"),r.classList.add("bg-white","text-gray-600","border-gray-200"))}),document.querySelectorAll(".date-preset-btn").forEach(o=>{o.addEventListener("click",r=>{navigator.vibrate&&navigator.vibrate(15),document.querySelectorAll(".date-preset-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),r.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),r.target.classList.remove("bg-white","text-gray-600","border-gray-200");const n=r.target.dataset.preset,l=new Date;let d,u;n==="month"?(d=new Date(l.getFullYear(),l.getMonth(),1),u=new Date(l.getFullYear(),l.getMonth()+1,0)):n==="last_month"&&(d=new Date(l.getFullYear(),l.getMonth()-1,1),u=new Date(l.getFullYear(),l.getMonth(),0)),document.getElementById("filter-start").value=d.toISOString().split("T")[0],document.getElementById("filter-end").value=u.toISOString().split("T")[0],z.startDate=d.toISOString().split("T")[0],z.endDate=u.toISOString().split("T")[0],gt()})})}function yc(t){const e=t.dataset.preset,a=new Date;let s,i;e==="month"?(s=new Date(a.getFullYear(),a.getMonth(),1),i=new Date(a.getFullYear(),a.getMonth()+1,0)):e==="last_month"?(s=new Date(a.getFullYear(),a.getMonth()-1,1),i=new Date(a.getFullYear(),a.getMonth(),0)):e==="today"&&(s=new Date,i=new Date),s&&i&&(document.getElementById("calc-start-date").value=s.toISOString().split("T")[0],document.getElementById("calc-end-date").value=i.toISOString().split("T")[0]),document.querySelectorAll('button[data-action="set-calc-preset"]').forEach(o=>{o.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),o.classList.add("bg-white","text-gray-500","border-gray-200")}),t.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),t.classList.remove("bg-white","text-gray-500","border-gray-200")}function At(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=z.selectedIds.size;e&&(e.textContent=a),t&&(a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function wc(){z.viewMode="new-calc";const t=document.getElementById("commissions-layout-detail");if(!t)return;const e=new Date().toISOString().split("T")[0],a=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],s=z.professionals.map(i=>`
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
    `,qi()}async function kc(){const t=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(u=>u.value);if(t.length===0)return g("Atenção","Selecione pelo menos um profissional na lista.","warning");const a=(f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId]).join(","),s=document.getElementById("calc-start-date"),i=document.getElementById("calc-end-date");if(!s||!i||!s.value||!i.value)return g("Atenção","As datas de início e fim são obrigatórias.","warning");const o={professionalIds:t,startDate:s.value,endDate:i.value,establishmentId:a,calculationTypes:{services:document.getElementById("calc-type-services")?.checked||!1,products:document.getElementById("calc-type-products")?.checked||!1,packages:document.getElementById("calc-type-packages")?.checked||!1}},r=new Date(o.startDate+"T00:00:00").toLocaleDateString("pt-BR"),n=new Date(o.endDate+"T00:00:00").toLocaleDateString("pt-BR");z.periodString=`${r} a ${n}`;const l=document.getElementById("btn-calc-action"),d=l.innerHTML;l.innerHTML='<div class="loader-small border-white mr-2"></div> Processando...',l.disabled=!0;try{const u=await dc(o);z.calculationResult=u.map(c=>({...c,extraDebit:0,extraCredit:0,finalValue:c.summary.totalCommission,notes:""})),Ic()}catch(u){g("Erro na Apuração",u.message,"error"),l.innerHTML=d,l.disabled=!1}}function Ic(){z.viewMode="preview-calc";const t=z.calculationResult;if(!t||t.length===0||t.every(n=>n.summary.totalCommission===0)){g("Aviso","Nenhuma comissão encontrada para os filtros selecionados.","info");const n=document.getElementById("btn-calc-action");n.innerHTML='<i class="bi bi-calculator text-lg"></i> Calcular Vendas',n.disabled=!1;return}const e=document.getElementById("calc-header-title");e&&(e.innerText="Revisão e Pagamento (2/2)");const a=document.getElementById("calc-step-1"),s=document.getElementById("calc-step-2"),i=document.getElementById("btn-calc-action");a&&a.classList.add("hidden"),s&&s.classList.remove("hidden"),i&&(i.dataset.action="save-final-reports",i.className="w-full md:w-auto py-3 px-8 bg-emerald-600 text-white font-black text-sm rounded-xl hover:bg-emerald-700 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider",i.innerHTML='<i class="bi bi-check2-circle text-lg"></i> Confirmar Pagtos.',i.disabled=!1);const o=t.reduce((n,l)=>n+l.finalValue,0),r=t.map((n,l)=>{if(n.summary.totalCommission===0)return"";const d=n.establishmentName||"Unidade Atual",u=(n.items||[]).map(p=>`
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
                <span class="text-xs font-black bg-white/20 px-3 py-2 rounded-xl border border-white/30 shadow-sm flex items-center gap-2"><i class="bi bi-calendar3"></i> ${z.periodString}</span>
            </div>
        </div>
        ${r}
    `)}function Sc(t){const e=document.querySelector(`.input-debit[data-idx="${t}"]`),a=document.querySelector(`.input-credit[data-idx="${t}"]`),s=document.querySelector(`.input-notes[data-idx="${t}"]`);let i=parseFloat(e?.value)||0,o=parseFloat(a?.value)||0,r=s?.value||"";if(z.calculationResult&&z.calculationResult[t]){const n=z.calculationResult[t];n.extraDebit=i,n.extraCredit=o,n.notes=r,n.finalValue=n.summary.totalCommission-i+o;const l=document.querySelector(`.final-value-display[data-idx="${t}"]`);l&&(l.innerText=`R$ ${n.finalValue.toFixed(2)}`),Ec()}}function Ec(){const t=z.calculationResult.reduce((a,s)=>a+s.finalValue,0),e=document.getElementById("grand-total-preview");e&&(e.innerText=`R$ ${t.toFixed(2)}`)}async function $c(){const t=z.calculationResult.filter(i=>i.summary.totalCommission>0),e=t.length;if(e===0)return g("Aviso","Não há valores para pagar.","info");if(!await K("Confirmar Pagamentos",`Você está prestes a gerar recibos e marcar as vendas de ${e} profissional(is) como PAGAS. Essa ação lançará a despesa correspondente no Financeiro da respectiva unidade. Confirmar?`))return;const s=document.getElementById("btn-calc-action");s.innerHTML='<div class="loader-small border-white mr-2"></div> Finalizando...',s.disabled=!0;try{const i=t.map(async o=>{const r=(o.items||[]).map(l=>l.originalSaleId).filter(l=>l!=null),n=o.establishmentId||f.establishmentId;await cc({professionalId:o.professionalId,professionalName:o.professionalName,period:z.periodString,processedSalesIds:r,establishmentId:n,establishmentName:o.establishmentName||"",reportData:{...o,summary:{...o.summary,finalValue:o.finalValue,extraDebit:o.extraDebit||0,extraCredit:o.extraCredit||0,notes:o.notes||""}}});try{if(o.finalValue>0){const l=z.establishmentConfig||{},d=l.defaultDespesaNaturezaId||l.financeConfig?.despesaNaturezaId||null,u=l.defaultDespesaCentroCustoId||l.financeConfig?.despesaCentroCustoId||null;await Wo({establishmentId:n,description:`Comissões - ${o.period}`,amount:o.finalValue,dueDate:new Date().toISOString().split("T")[0],naturezaId:d,centroDeCustoId:u,entity:o.professionalName,paymentMethod:"dinheiro",status:"paid",paymentDate:new Date().toISOString().split("T")[0],origin:"commission"})}}catch(l){console.error("Erro ao integrar com financeiro (Despesa):",l)}});await Promise.all(i),g("Sucesso","Pagamentos registrados e integrados ao financeiro!","success"),z.calculationResult=null,qs(),await gt()}catch(i){g("Erro ao Salvar",i.message,"error"),s.innerHTML='<i class="bi bi-check2-circle text-lg"></i> Confirmar Pagtos.',s.disabled=!1}}function Lc(t){z.viewMode="report-details";const e=document.getElementById("commissions-layout-detail");if(!e)return;const a=z.reports.find(c=>c.id===t);if(!a)return;const s=a.reportData?.items||a.items||[],i=a.summary,o=i.extraDebit||0,r=i.extraCredit||0,n=i.notes||"",l=a.establishmentName||"Unidade Atual",d=s.map(c=>`
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
    `,qi()}function Cc(t){const e=z.reports.find(l=>l.id===t);if(!e)return;const a=e.summary||{},s=e.establishmentName||"Unidade Principal";let i=`*RECIBO DE COMISSÕES* 💰

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

`,i+="_Este é um recibo gerado automaticamente pelo sistema._";const n=`https://wa.me/?text=${encodeURIComponent(i)}`;window.open(n,"_blank")}function Dc(){if(z.reports.length===0){g("Aviso","Não há dados para exportar com os filtros atuais.","info");return}let t=z.reports;if(z.searchQuery){const a=z.searchQuery.toLowerCase();t=t.filter(s=>s.professionalName.toLowerCase().includes(a)||s.period.toLowerCase().includes(a))}const e=t.map(a=>{const s=a.summary.totalCommission,i=a.summary.extraDebit||0,o=a.summary.extraCredit||0,r=a.summary.finalValue||s;return{"Data da Apuração":new Date(a.createdAt).toLocaleDateString("pt-BR"),Unidade:a.establishmentName||"Unidade Principal",Profissional:a.professionalName,"Período Base":a.period,"Itens Calculados":a.summary.totalItems||0,"Valor Bruto (R$)":s,"Bônus (R$)":o,"Descontos (R$)":i,"Líquido Pago (R$)":r,"Observações/Motivo":a.summary.notes||""}});try{if(typeof XLSX>"u"){g("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const a=XLSX.utils.json_to_sheet(e),s=XLSX.utils.book_new();XLSX.utils.book_append_sheet(s,a,"Comissoes");const i=`Relatorio_Comissoes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(s,i)}catch(a){console.error(a),g("Erro","Falha ao exportar Excel.","error")}}function Pc(t){const e=z.reports.find(u=>u.id===t);if(!e)return;if(!window.jspdf){g("Erro","A biblioteca de PDF não foi carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a;s.setFillColor(79,70,229),s.rect(0,0,210,40,"F"),s.setTextColor(255,255,255),s.setFontSize(22),s.setFont(void 0,"bold"),s.text("RECIBO DE COMISSÕES",105,20,{align:"center"}),s.setFontSize(10),s.text(`Data de Emissão: ${new Date().toLocaleDateString("pt-BR")} - Unidade: ${e.establishmentName||"Principal"}`,105,28,{align:"center"}),s.setTextColor(50,50,50),s.setFontSize(11),s.setFont(void 0,"normal"),s.text("Profissional:",15,55),s.setFont(void 0,"bold"),s.text(e.professionalName,40,55),s.setFont(void 0,"normal"),s.text("Período:",130,55),s.setFont(void 0,"bold"),s.text(e.period,147,55);const i=e.reportData?.items||e.items||[];let o=70;if(i.length>0){const u=i.map(c=>[c.item||"Item",c.client||"--",`R$ ${(c.value||0).toFixed(2)}`,`${c.commissionRate||0}%`,`R$ ${(c.commissionValue||0).toFixed(2)}`]);s.autoTable({startY:o,head:[["Serviço/Produto","Cliente","Valor Base","Taxa","Comissão"]],body:u,theme:"striped",headStyles:{fillColor:[249,250,251],textColor:[75,85,99],fontStyle:"bold"},styles:{fontSize:8},columnStyles:{2:{halign:"right"},3:{halign:"center"},4:{halign:"right",fontStyle:"bold",textColor:[5,150,105]}}}),o=s.lastAutoTable.finalY+15}const r=e.summary,n=r.finalValue||r.totalCommission,l=[["Comissões Brutas (Soma dos Itens)",`R$ ${r.totalCommission.toFixed(2)}`]];r.extraCredit>0&&l.push(["(+) Bônus Extras",`R$ ${r.extraCredit.toFixed(2)}`]),r.extraDebit>0&&l.push(["(-) Descontos / Vales",`R$ ${r.extraDebit.toFixed(2)}`]),s.autoTable({startY:o,head:[["Resumo do Fechamento","Valor"]],body:l,theme:"grid",headStyles:{fillColor:[79,70,229],textColor:[255,255,255]},columnStyles:{1:{halign:"right",fontStyle:"bold"}}});const d=s.lastAutoTable.finalY+15;s.setFillColor(236,253,245),s.rect(120,d-8,75,15,"F"),s.setTextColor(5,150,105),s.setFontSize(14),s.setFont(void 0,"bold"),s.text(`Total Líquido: R$ ${n.toFixed(2)}`,190,d,{align:"right"}),r.notes&&(s.setTextColor(100,100,100),s.setFontSize(9),s.setFont(void 0,"normal"),s.text(`Obs/Motivo: ${r.notes}`,15,d+10)),s.setTextColor(150,150,150),s.setFontSize(9),s.line(20,d+40,90,d+40),s.text("Assinatura da Empresa",55,d+45,{align:"center"}),s.line(120,d+40,190,d+40),s.text("Assinatura do Profissional",155,d+45,{align:"center"}),s.save(`Recibo_Comissoes_${e.professionalName.replace(/\s+/g,"_")}.pdf`)}async function Tc(){const t=z.selectedIds.size;if(!(t===0||!await K("Excluir Recibos",`Deseja excluir e estornar ${t} recibo(s)? As vendas associadas voltarão ao status "A Apurar".`)))try{const a=Array.from(z.selectedIds).map(s=>ji(s));await Promise.all(a),g("Sucesso",`${t} recibos excluídos com sucesso.`,"success"),z.selectedIds.clear(),At(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),await gt()}catch{g("Erro ao Excluir","Ocorreu um erro ao excluir alguns recibos.","error")}}async function Ac(t){if(await K("Excluir Recibo",'ATENÇÃO: Deseja realmente excluir este recibo? As vendas associadas a ele voltarão ao status "A Apurar" e o valor será subtraído dos relatórios. Esta ação não pode ser desfeita.'))try{await ji(t),g("Sucesso","Recibo cancelado com sucesso. Vendas estornadas para apuração.","success"),qs(),await gt()}catch(a){g("Erro ao Excluir",a.message,"error")}}const Re=document.getElementById("content");let j={allPackages:[],catalogForModal:{services:[],products:[]},establishments:[],searchQuery:"",statusFilter:"all",viewMode:"list",tempPackage:null,selectedIds:new Set},Ke=null;function ft(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function Bc(){const t=j.allPackages.length,e=j.allPackages.filter(o=>o.status!=="inactive"),a=e.length,s=a>0?e.reduce((o,r)=>o+(r.price||0),0)/a:0;let i=0;return e.forEach(o=>{const r=o.originalPrice||0,n=o.price||0;if(r>0&&r>n){const l=(r-n)/r*100;l>i&&(i=l)}}),{total:t,activeCount:a,avgPrice:s,maxDiscount:i}}function Mc(){const t=document.getElementById("packages-layout-detail");t&&(t.classList.remove("hidden"),t.style.display="flex",requestAnimationFrame(()=>{t.classList.remove("opacity-0");const e=t.querySelector("#modal-content-wrapper");e&&(e.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),e.classList.add("translate-y-0","md:scale-100","md:opacity-100"))}))}function ma(){const t=document.getElementById("packages-layout-detail");if(t){t.classList.add("opacity-0");const e=t.querySelector("#modal-content-wrapper");e&&(e.classList.remove("translate-y-0","md:scale-100","md:opacity-100"),e.classList.add("translate-y-full","md:scale-95","md:opacity-0")),setTimeout(()=>{t.classList.add("hidden"),t.style.display="none",t.innerHTML=""},300)}}function jc(){const t=document.getElementById("packages-layout-detail");if(!t||j.viewMode!=="edit-package"||!j.tempPackage)return;j.tempPackage.name=t.querySelector("#packageName")?.value||"",j.tempPackage.description=t.querySelector("#packageDescription")?.value||"",j.tempPackage.status=t.querySelector("#packageStatus")?.value||"active";const e=parseFloat(t.querySelector("#finalPrice")?.value);j.tempPackage.price=isNaN(e)?"":e;const a=parseFloat(t.querySelector("#commissionRate")?.value);j.tempPackage.commissionRate=isNaN(a)?"":a;const s=parseInt(t.querySelector("#validityDays")?.value,10);j.tempPackage.validityDays=isNaN(s)?"":s,j.tempPackage.sellStartDate=t.querySelector("#sellStartDate")?.value||"",j.tempPackage.sellEndDate=t.querySelector("#sellEndDate")?.value||"";const i=parseInt(t.querySelector("#salesLimit")?.value,10);j.tempPackage.salesLimit=isNaN(i)?"":i;const o=Array.from(t.querySelectorAll(".modal-est-checkbox:checked")).map(r=>r.value);j.tempPackage.establishmentIds=o}async function qc(){try{const e=(await De().catch(()=>({matrizes:[]}))).matrizes||[];j.establishments=[],e.forEach(a=>{j.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>j.establishments.push({id:s.id,name:s.name,type:"Filial"}))})}catch(t){console.error("Erro ao buscar hierarquia de empresas",t)}j.viewMode="list",j.selectedIds.clear(),Fc(),Oc(),await La()}async function La(){const t=document.getElementById("packagesListContainer");t&&(t.innerHTML='<div class="col-span-full flex justify-center py-20"><div class="loader mx-auto"></div></div>');const e=f.selectedEstablishments&&f.selectedEstablishments.length>0?f.selectedEstablishments:[f.establishmentId];try{const a=e.map(c=>Cs(c).catch(()=>[])),s=await Promise.all(a),i=new Map;s.flat().forEach(c=>{i.has(c.id)||i.set(c.id,c)}),j.allPackages=Array.from(i.values());const o=e.map(c=>Je(c).catch(()=>[])),r=e.map(c=>Rt(c).catch(()=>[])),[n,l]=await Promise.all([Promise.all(o),Promise.all(r)]),d=new Map;n.flat().forEach(c=>d.set(c.id,c));const u=new Map;l.flat().forEach(c=>u.set(c.id,c)),j.catalogForModal={services:Array.from(d.values()).filter(c=>c.active),products:Array.from(u.values())},Nc(),st(),It()}catch(a){console.error(a),t&&(t.innerHTML=`
                <div class="col-span-full flex flex-col items-center justify-center py-16 text-slate-500">
                    <i class="bi bi-exclamation-triangle text-4xl text-red-400 mb-3"></i>
                    <p class="text-xs font-bold">Erro ao carregar os pacotes. Tente novamente.</p>
                </div>
            `)}}function It(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=j.selectedIds.size;e&&(e.textContent=a),t&&(a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")));const s=document.getElementById("select-all-toggle");s&&(s.checked=j.allPackages.length>0&&a===j.allPackages.length)}function Fc(){Re.innerHTML=`
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
    `}function Nc(){const t=Bc(),e=document.getElementById("kpi-container");e&&(e.innerHTML=`
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
            <span class="text-xl md:text-2xl font-black text-indigo-600">${ft(t.avgPrice)}</span>
        </div>
    `)}function st(){const t=document.getElementById("packagesListContainer");if(!t)return;let e=j.allPackages;if(j.statusFilter!=="all"){const s=j.statusFilter==="active";e=e.filter(i=>i.status!=="inactive"===s)}if(j.searchQuery){const s=j.searchQuery.toLowerCase();e=e.filter(i=>i.name.toLowerCase().includes(s)||(i.description||"").toLowerCase().includes(s))}if(e.length===0){t.innerHTML=`
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
        `;return}const a=new Map(j.establishments.map(s=>[s.id,s]));t.innerHTML=e.map(s=>{const i=s.status!=="inactive",o=j.selectedIds.has(s.id),r=s.price||0,n=s.originalPrice||0,l=n>0&&n>r?(n-r)/n*100:0,d=v(s.name),u=v(s.description||"Nenhuma descrição detalhada."),c=(s.items||[]).reduce((y,I)=>y+(I.quantity||1),0),p=s.validityDays?`${s.validityDays} dias de uso`:"Uso vitalício",m=s.sellEndDate?`Vendas até ${new Date(s.sellEndDate).toLocaleDateString("pt-BR")}`:"Venda contínua",b=s.establishmentIds||(s.establishmentId?[s.establishmentId]:[]);let x="";if(b.length===1){const y=a.get(b[0]);y&&(x=`<span class="text-[9px] px-2 py-1 rounded-md bg-slate-100 text-slate-600 font-bold border border-slate-200 flex items-center w-max shadow-sm"><i class="bi ${y.type==="Matriz"?"bi-building":"bi-shop"} mr-1 opacity-50"></i> ${y.name}</span>`)}else b.length>1&&(x=`<span class="text-[9px] px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 flex items-center w-max shadow-sm"><i class="bi bi-buildings mr-1 opacity-50"></i> ${b.length} Unidades</span>`);return`
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
                            ${l>0?`<span class="text-[10px] text-slate-400 font-bold line-through mb-0.5">De ${ft(n)}</span>`:'<span class="text-[10px] text-transparent mb-0.5">.</span>'}
                            <span class="text-2xl font-black text-slate-900 leading-none drop-shadow-sm">${ft(r)}</span>
                        </div>
                        <div class="text-right">
                            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md border border-slate-200"><i class="bi bi-calendar-event mr-1"></i>${m}</span>
                        </div>
                    </div>
                </div>
            </div>
        `}).join("")}function Rc(){if(j.allPackages.length===0){g("Aviso","Não há pacotes carregados para exportar.","info");return}let t=j.allPackages;if(j.statusFilter!=="all"){const s=j.statusFilter==="active";t=t.filter(i=>i.status!=="inactive"===s)}if(j.searchQuery){const s=j.searchQuery.toLowerCase();t=t.filter(i=>i.name.toLowerCase().includes(s)||(i.description||"").toLowerCase().includes(s))}if(t.length===0){g("Aviso","Nenhum pacote corresponde aos filtros atuais.","info");return}const e=new Map(j.establishments.map(s=>[s.id,s.name])),a=t.map(s=>{const i=s.originalPrice||0,o=s.price||0,r=i>0?(i-o)/i*100:0,n=(s.items||[]).map(u=>`${u.quantity}x ${u.name}`).join(" | ");return{"Unidade(s)":(s.establishmentIds||(s.establishmentId?[s.establishmentId]:[])).map(u=>e.get(u)).filter(Boolean).join(", ")||"Não identificada","Nome do Pacote":s.name,Status:s.status!=="inactive"?"Ativo":"Inativo",Descrição:s.description||"","Itens Incluídos":n,"Valor Original (R$)":i,"Preço de Venda (R$)":o,"Desconto (%)":r.toFixed(1)+"%","Comissão (%)":s.commissionRate||0,"Validade de Uso (Dias)":s.validityDays||"Vitalício","Vendas Início":s.sellStartDate?new Date(s.sellStartDate).toLocaleDateString("pt-BR"):"-","Vendas Fim":s.sellEndDate?new Date(s.sellEndDate).toLocaleDateString("pt-BR"):"-"}});try{if(typeof XLSX>"u"){g("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const s=XLSX.utils.json_to_sheet(a),i=XLSX.utils.book_new();XLSX.utils.book_append_sheet(i,s,"Pacotes");const o=`Relatorio_Pacotes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(i,o)}catch(s){console.error(s),g("Erro","Falha ao exportar Excel.","error")}}function bo(t=null){j.viewMode="edit-package",j.tempPackage=t?JSON.parse(JSON.stringify(t)):{id:"",name:"",description:"",status:"active",items:[],price:"",originalPrice:0,commissionRate:0,validityDays:"",sellStartDate:"",sellEndDate:"",salesLimit:"",establishmentIds:[f.establishmentId]},fs(),Mc()}function Ni(){const t=document.getElementById("packages-layout-detail");if(!t)return;const a=(j.tempPackage.items||[]).reduce((n,l)=>n+(l.price||0)*(l.quantity||1),0),s=t.querySelector("#finalPrice"),i=t.querySelector("#discountIndicator"),o=t.querySelector("#originalPrice"),r=parseFloat(s?.value)||0;if(o&&(o.textContent=ft(a)),i)if(a>0&&a>r&&r>0){const n=(a-r)/a*100;i.textContent=`${n.toFixed(0)}% OFF`,i.classList.remove("hidden")}else i.classList.add("hidden")}function gs(){const t=document.getElementById("package-items-list");if(!t)return;const e=j.tempPackage.items||[];e.length===0?t.innerHTML=`
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
                        <span class="text-sm font-black text-slate-700">${ft(a.price)}</span>
                    </div>
                    <button type="button" data-action="remove-item" data-index="${s}" class="w-10 h-10 flex items-center justify-center rounded-xl text-red-400 bg-red-50 hover:text-red-600 hover:bg-red-100 transition-colors shadow-sm z-10 cursor-pointer">
                        <i class="bi bi-trash3 pointer-events-none text-base"></i>
                    </button>
                </div>
            </div>
        `}).join(""),Ni()}function mo(t){return t?t.includes("T")?t.split("T")[0]:t:""}function fs(){const t=document.getElementById("packages-layout-detail");if(!t)return;const e=j.tempPackage,a=!!e.id,s=v(e.name||""),i=v(e.description||""),o=e.price!==void 0&&e.price!==""?e.price:"",r=e.commissionRate!==void 0&&e.commissionRate!==""?e.commissionRate:"",n=e.validityDays!==void 0&&e.validityDays!==""?e.validityDays:"",l=mo(e.sellStartDate),d=mo(e.sellEndDate),u=e.salesLimit!==void 0&&e.salesLimit!==""?e.salesLimit:"",c=e.establishmentIds&&e.establishmentIds.length>0?e.establishmentIds:e.establishmentId?[e.establishmentId]:[f.establishmentId],p=j.establishments.map(b=>`
        <label class="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer group shadow-sm">
            <input type="checkbox" class="modal-est-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4" value="${b.id}" ${c.includes(b.id)?"checked":""}>
            <span class="text-xs font-bold text-slate-700 truncate group-hover:text-indigo-700" title="${b.name}">${b.type==="Matriz"?"🏢":"📍"} ${b.name}</span>
        </label>
    `).join(""),m=`
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
            ${m}
            
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
    `,gs(),requestAnimationFrame(()=>{const b=t.querySelector("#modal-content-wrapper");b&&(b.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),b.classList.add("translate-y-0","md:scale-100","md:opacity-100"))})}function Hc(){j.viewMode="select-item";const t=document.getElementById("packages-layout-detail");if(!t)return;const e=`
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
    `;let a;const s=(o="")=>{const r=o.toLowerCase(),n={service:'<i class="bi bi-scissors text-indigo-600 text-lg"></i>',product:'<i class="bi bi-box-seam text-emerald-600 text-lg"></i>'},l={"catalog-service-list":{items:j.catalogForModal.services,type:"service"},"catalog-product-list":{items:j.catalogForModal.products,type:"product"}};Object.entries(l).forEach(([d,{items:u,type:c}])=>{const p=t.querySelector("#"+d);if(!p)return;const m=u.filter(y=>y.name.toLowerCase().includes(r)).slice(0,50),b=c==="service"?"hover:border-indigo-400 hover:bg-indigo-50/80 hover:shadow-md":"hover:border-emerald-400 hover:bg-emerald-50/80 hover:shadow-md",x=c==="service"?"bg-indigo-100 border-indigo-200 shadow-sm":"bg-emerald-100 border-emerald-200 shadow-sm";p.innerHTML=m.map(y=>y.id?`
                <button data-action="select-catalog-item" data-item-type="${c}" data-item-id="${y.id}" class="flex items-center gap-4 w-full p-3 bg-white border border-slate-200 rounded-2xl ${b} shadow-sm transition-all duration-300 text-left group active:scale-95">
                    <div class="flex-shrink-0 w-12 h-12 rounded-xl ${x} flex items-center justify-center border group-hover:scale-110 transition-transform">${n[c]}</div>
                    <div class="flex-grow min-w-0">
                        <span class="block text-sm font-black text-slate-800 truncate group-hover:text-indigo-900 transition-colors">${v(y.name)}</span>
                        <span class="block font-black text-xs text-slate-500 mt-1">${ft(y.price)}</span>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors shadow-inner flex-shrink-0">
                        <i class="bi bi-plus-lg text-slate-400 group-hover:text-white transition-colors"></i>
                    </div>
                </button>
            `:"").join("")||'<div class="flex flex-col items-center justify-center py-8 text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-slate-50"><i class="bi bi-inbox text-3xl mb-2"></i><p class="text-[10px] font-bold uppercase tracking-widest">Nenhum resultado</p></div>'})};s();const i=t.querySelector("#item-search-input");i&&(i.addEventListener("input",o=>{clearTimeout(a),a=setTimeout(()=>s(o.target.value),300)}),setTimeout(()=>i.focus(),100)),requestAnimationFrame(()=>{const o=t.querySelector("#modal-content-wrapper");o&&(o.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),o.classList.add("translate-y-0","md:scale-100","md:opacity-100"))})}function Oc(){Ke&&(Re.removeEventListener("click",Ke),Re.removeEventListener("input",Ke),Re.removeEventListener("change",Ke)),Ke=async e=>{if(e.target.classList.contains("item-checkbox")){const r=e.target.value;e.target.checked?j.selectedIds.add(r):j.selectedIds.delete(r),It(),st(),e.stopPropagation();return}if(e.target.id==="packages-layout-detail"){ma(),j.viewMode="list",j.tempPackage=null;return}if(e.target.closest("#batch-delete-btn")){const r=j.selectedIds.size;if(r===0)return;if(await K("Excluir Pacotes",`Deseja realmente apagar ${r} pacotes selecionados?`))try{const l=Array.from(j.selectedIds).map(d=>Gs(d));await Promise.all(l),g("Sucesso",`${r} pacote(s) excluído(s).`,"success"),j.selectedIds.clear(),It(),await La()}catch{g("Erro","Ocorreu um erro ao excluir pacotes.","error")}return}if(e.target.closest("#cancel-selection-btn")){j.selectedIds.clear();const r=document.getElementById("select-all-toggle");r&&(r.checked=!1),It(),st();return}const i=e.target.closest("[data-action]");if(!i)return;switch(i.dataset.action){case"new-package":navigator.vibrate&&navigator.vibrate(20),bo(null);break;case"edit-package":navigator.vibrate&&navigator.vibrate(15);const r=i.dataset.id,n=j.allPackages.find(I=>I.id===r);n&&bo(n);break;case"delete-package":e.stopPropagation(),e.preventDefault();const l=i.dataset.id;if(await K("Excluir Pacote","Tem a certeza que deseja excluir este pacote promocional? Esta ação é irreversível."))try{await Gs(l),g("Sucesso!","Pacote excluído.","success"),j.viewMode==="edit-package"&&j.tempPackage?.id===l&&(ma(),j.viewMode="list"),await La()}catch(I){g("Erro",`Não foi possível excluir: ${I.message}`,"error")}break;case"back-to-main":ma(),j.viewMode="list",j.tempPackage=null;break;case"add-item-to-package-btn":jc(),Hc();break;case"back-to-editor":fs();break;case"select-catalog-item":navigator.vibrate&&navigator.vibrate(10);const{itemType:u,itemId:c}=i.dataset,m=(j.catalogForModal[u+"s"]||[]).find(I=>I.id===c);if(m){const I=j.tempPackage.items.find(S=>S.id===m.id&&S.type===u);I?I.quantity++:j.tempPackage.items.push({...m,type:u,quantity:1}),fs()}break;case"remove-item":navigator.vibrate&&navigator.vibrate(10);const b=parseInt(i.dataset.index,10);j.tempPackage.items.splice(b,1),gs();break;case"toggle-all-ests":const x=document.querySelectorAll(".modal-est-checkbox"),y=Array.from(x).every(I=>I.checked);x.forEach(I=>I.checked=!y);break;case"save-package":await zc(i);break}},Re.addEventListener("click",Ke),Re.addEventListener("input",e=>{e.target.id==="search-packages"&&(j.searchQuery=e.target.value,st()),e.target.id==="finalPrice"&&Ni()}),Re.addEventListener("change",e=>{if(e.target.id==="select-all-toggle"){const a=e.target.checked;j.selectedIds.clear(),a&&j.allPackages.forEach(s=>j.selectedIds.add(s.id)),It(),st()}if(e.target.id==="filter-status"&&(j.statusFilter=e.target.value,st()),e.target.classList.contains("quantity-input")){const a=parseInt(e.target.dataset.index,10),s=parseInt(e.target.value,10);s>0&&j.tempPackage.items[a]&&(j.tempPackage.items[a].quantity=s,gs())}});const t=document.getElementById("export-excel-btn");t&&t.addEventListener("click",Rc)}async function zc(t){const e=j.tempPackage,a=!!e.id,s=document.getElementById("packages-layout-detail");if(!s)return;const i=Array.from(s.querySelectorAll(".modal-est-checkbox:checked")).map(l=>l.value);if(i.length===0){g("Atenção","Selecione pelo menos uma unidade para o pacote.","warning");return}const o=e.items.reduce((l,d)=>l+d.price*d.quantity,0),r={id:e.id||null,companyId:f.companyId,name:s.querySelector("#packageName").value,description:s.querySelector("#packageDescription").value,status:s.querySelector("#packageStatus").value,items:e.items,originalPrice:o,price:parseFloat(s.querySelector("#finalPrice").value),commissionRate:parseFloat(s.querySelector("#commissionRate").value)||0,validityDays:parseInt(s.querySelector("#validityDays").value,10)||null,sellStartDate:s.querySelector("#sellStartDate").value||null,sellEndDate:s.querySelector("#sellEndDate").value||null,salesLimit:parseInt(s.querySelector("#salesLimit").value,10)||null,establishmentIds:i,establishmentId:i[0]};if(!r.name||isNaN(r.price)){g("Erro","Nome do Pacote e Preço Final são obrigatórios.","warning");return}if(r.items.length===0){g("Erro","Adicione pelo menos um serviço ou produto ao pacote.","warning");return}const n=t.innerHTML;t.disabled=!0,t.innerHTML='<div class="loader-small border-white mr-2"></div> Salvando...';try{a?await qn(r.id,r):(delete r.id,await jn(r)),g("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),ma(),j.viewMode="list",j.tempPackage=null,await La()}catch(l){g("Erro",`Não foi possível salvar o pacote: ${l.message}`,"error"),t.disabled=!1,t.innerHTML=n}}const _c=document.getElementById("content");async function Vc(){const t=ke.currentUser;if(!t)return;let e={};try{const l=await ys(je(he,"users",t.uid));l.exists()&&(e=l.data())}catch(l){console.error("Erro ao buscar usuário",l)}let a=null;if(f.userProfessionalId)try{a=await Do(f.userProfessionalId)}catch(l){console.error("Erro ao buscar profissional",l)}const s=v(e.name||t.displayName||"Usuário"),i=v(t.email||"E-mail não disponível"),o=v(e.phone||"");let r=e.photo||"";a&&a.photo&&(r=a.photo);const n=r||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(s.charAt(0))}`;_c.innerHTML=`
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
    `,Uc(t),Wc(a)}function Uc(t,e){const a=document.getElementById("profile-photo-wrapper"),s=document.getElementById("profile-photo-input"),i=document.getElementById("profile-avatar"),o=document.getElementById("form-user-details");a.addEventListener("click",()=>s.click()),s.addEventListener("change",async r=>{const n=r.target.files[0];if(n)try{const l=await Pa(n,800,800,.8);i.src=l,await jt(je(he,"users",t.uid),{photo:l}),f.userProfessionalId&&await Ka(f.userProfessionalId,{photo:l}),window.dispatchEvent(new CustomEvent("userPhotoUpdated",{detail:l})),g("Sucesso!","Sua foto de perfil foi atualizada.","success")}catch{g("Erro","Não foi possível salvar a imagem. Tente uma menor.","error")}}),o.addEventListener("submit",async r=>{r.preventDefault();const n=o.querySelector("button"),l=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> Salvando...';const d=document.getElementById("input-name").value.trim(),u=document.getElementById("input-phone").value.trim();try{await jt(je(he,"users",t.uid),{name:d,phone:u}),f.userProfessionalId&&await Ka(f.userProfessionalId,{name:d,phone:u}),f.userName=d,document.getElementById("display-name").textContent=d,g("Atualizado!","Seus dados foram salvos com sucesso.","success")}catch{g("Erro","Ocorreu um problema na hora de salvar.","error")}finally{n.disabled=!1,n.innerHTML=l}})}function Wc(t){const e=document.getElementById("professional-section");if(!t){e.innerHTML=`
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
    `;const a=document.getElementById("form-my-blockage");a.addEventListener("submit",async i=>{i.preventDefault();const o=a.querySelector("#b-date-start").value,r=a.querySelector("#b-date-end").value||o,n=a.querySelector("#b-time-start").value,l=a.querySelector("#b-time-end").value,d=a.querySelector("#b-reason").value;if(!o||!n||!l)return g("Atenção","Preencha Data e Horários corretamente.","error");const u=new Date(`${o}T${n}:00`),c=new Date(`${r}T${l}:00`);if(c<=u)return g("Atenção","A data e hora de fim deve ser superior ao início.","warning");const p=a.querySelector('button[type="submit"]'),m=p.innerHTML;p.disabled=!0,p.innerHTML="A bloquear...";try{await Fa({establishmentId:f.establishmentId,professionalId:t.id,reason:d||"Indisponível",startTime:u.toISOString(),endTime:c.toISOString()}),g("Sucesso","Agenda bloqueada com êxito.","success"),a.reset();const b=document.getElementById("my-blocks-filter").value;ga(t.id,b)}catch(b){g("Erro",`Falha ao bloquear: ${b.message}`,"error")}finally{p.disabled=!1,p.innerHTML=m}}),document.getElementById("my-blocks-filter").addEventListener("change",i=>ga(t.id,i.target.value)),ga(t.id,"future")}async function ga(t,e="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<div class="loader mx-auto mt-6"></div>';try{const s=new Date;let i,o;e==="history"?(o=new Date,i=new Date,i.setFullYear(i.getFullYear()-1)):(i=new Date,o=new Date,o.setFullYear(o.getFullYear()+1));let n=(await qa(f.establishmentId,i.toISOString(),o.toISOString(),t)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));if(e==="history"?n=n.filter(l=>l.endTime<s).sort((l,d)=>d.startTime-l.startTime):n=n.filter(l=>l.endTime>=s).sort((l,d)=>l.startTime-d.startTime),n.length===0){a.innerHTML=`
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
            `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(l=>{l.addEventListener("click",async d=>{const u=d.currentTarget.dataset.blockId;if(confirm("Deletar e deixar a agenda livre neste horário?"))try{await Ss(u),g("Removido","O bloqueio foi deletado.","success"),ga(t,e)}catch(c){g("Erro",`Não foi possível remover: ${c.message}`,"error")}})})}catch(s){a.innerHTML=`<p class="text-xs text-red-500 font-bold p-3 bg-red-50 rounded-xl">Erro: ${v(s.message)}</p>`}}let go=!1;async function Ca(t){if(!t)return;t.innerHTML=`
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
    `;const e=document.getElementById("hierarchy-list-container"),a=document.getElementById("est-parent");try{const i=(await De()).matrizes||[];if(a&&(a.innerHTML='<option value="">Nenhuma (Criar como Matriz Independente)</option>'),i.length===0)e.innerHTML=`
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
                `}),e.innerHTML=o}go||(Jc(),go=!0)}catch(s){console.error("Erro na renderização da rede:",s),e.innerHTML=`
            <div class="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100 text-center">
                <i class="bi bi-exclamation-triangle text-2xl mb-2 block"></i>
                <p class="font-bold text-sm">Não foi possível carregar a estrutura organizacional.</p>
            </div>
        `}}function Jc(){const t=document.getElementById("form-create-establishment");t&&t.addEventListener("submit",async e=>{e.preventDefault();const a=t.querySelector('button[type="submit"]'),s=a.innerHTML;a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...',a.disabled=!0;const i={name:document.getElementById("est-name").value.trim(),cnpj:document.getElementById("est-cnpj").value.trim(),parentId:document.getElementById("est-parent").value||null,timezone:document.getElementById("est-timezone").value};try{const o=await vr(i);alert(o.message||"Sucesso!"),t.reset();const r=document.getElementById("modal-create-establishment"),n=window.bootstrap?.Modal.getInstance(r);n&&n.hide(),await Ca(document.getElementById("content"))}catch(o){console.error("Erro ao criar estabelecimento:",o),alert("Erro: "+(o.message||"Falha ao gravar dados."))}finally{a.innerHTML=s,a.disabled=!1}})}window.loadAndRenderHierarchy=()=>Ca(document.getElementById("content"));let Ee=[],xs=[],fa=null;const Gc=async()=>{const t=f.selectedEstablishments?.[0]||f.establishmentId;return await A(`/api/subscription-plans/${t}`)},Qc=async t=>await A("/api/subscription-plans",{method:"POST",body:JSON.stringify(t)}),Yc=async(t,e)=>await A(`/api/subscription-plans/${t}`,{method:"PUT",body:JSON.stringify(e)}),Xc=async t=>await A(`/api/subscription-plans/${t}`,{method:"DELETE"});async function Zc(t={}){const e=document.getElementById("content");e.innerHTML=`
        <div class="flex items-center justify-center p-12">
            <div class="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    `;try{const a=f.selectedEstablishments?.[0]||f.establishmentId,[s,i]=await Promise.all([Gc(),Je(a)]);Ee=s||[],xs=i||[],Kc(e),hs()}catch(a){e.innerHTML=`
            <div class="p-12 text-center">
                <i class="bi bi-exclamation-triangle text-rose-500 text-4xl mb-4"></i>
                <h2 class="text-xl font-bold text-slate-800">Erro ao Carregar Planos</h2>
                <p class="text-slate-500">${a.message}</p>
            </div>
        `}}function Kc(t){t.innerHTML=`
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
    `,tu()}function hs(){const t=document.getElementById("plansGrid");if(Ee.length===0){t.innerHTML=`
            <div class="col-span-full bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center">
                <div class="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4"><i class="bi bi-star text-3xl"></i></div>
                <h3 class="text-lg font-bold text-slate-700">Nenhum plano criado</h3>
                <p class="text-slate-500 text-sm mt-1 max-w-md mx-auto">Crie o seu primeiro clube de assinaturas para garantir receita recorrente todos os meses.</p>
            </div>
        `;return}const e={monthly:"mês",quarterly:"trimestre",semiannual:"semestre",yearly:"ano"};t.innerHTML=Ee.map(a=>{const s=a.active,i=e[a.billingCycle]||a.billingCycle,o=(a.servicesIncluded||[]).length,r=a.usageLimit?`${a.usageLimit} usos`:"Ilimitado";return`
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
        `}).join("")}function eu(t=[]){const e=document.getElementById("planServicesContainer");if(xs.length===0){e.innerHTML='<p class="text-xs text-slate-500 col-span-full">Nenhum serviço registado no sistema.</p>';return}e.innerHTML=xs.map(a=>{const s=t.includes(a.id);return`
            <label class="flex items-center p-2 rounded-lg hover:bg-white cursor-pointer transition-colors border border-transparent hover:border-slate-200">
                <input type="checkbox" value="${a.id}" class="service-cb w-4 h-4 text-indigo-600 accent-indigo-600 rounded border-slate-300 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="ml-3 text-sm font-semibold text-slate-700 truncate flex-1">${v(a.name)}</span>
                <span class="text-xs font-bold text-slate-400">R$ ${a.price.toFixed(2)}</span>
            </label>
        `}).join("")}function fo(t=null){fa=t?t.id:null,document.getElementById("planModalTitle").textContent=t?"Editar Plano":"Criar Novo Plano",document.getElementById("planName").value=t?t.name:"",document.getElementById("planDesc").value=t&&t.description||"",document.getElementById("planPrice").value=t?t.price:"",document.getElementById("planCycle").value=t?t.billingCycle:"monthly",document.getElementById("planUsageLimit").value=t&&t.usageLimit?t.usageLimit:"",document.getElementById("planActive").checked=t?t.active:!0,eu(t?t.servicesIncluded:[]);const e=document.getElementById("planModal");e.classList.remove("hidden"),e.classList.add("flex"),setTimeout(()=>{e.classList.remove("opacity-0"),e.querySelector("div").classList.remove("scale-95"),e.querySelector("div").classList.add("scale-100")},10)}function Ga(){const t=document.getElementById("planModal");t.classList.add("opacity-0"),t.querySelector("div").classList.remove("scale-100"),t.querySelector("div").classList.add("scale-95"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.getElementById("planForm").reset()},300)}function tu(){document.getElementById("btnNewPlan").addEventListener("click",()=>fo()),document.getElementById("btnCloseModal").addEventListener("click",Ga),document.getElementById("btnCancelModal").addEventListener("click",Ga),document.getElementById("plansGrid").addEventListener("click",async t=>{const e=t.target.closest("button[data-action]");if(!e)return;const a=e.dataset.action,s=e.dataset.id,i=Ee.find(o=>o.id===s);if(a==="edit")fo(i);else if(a==="delete"&&await K("Apagar Plano",`Tem a certeza que deseja apagar o plano "${i.name}"?`))try{e.disabled=!0,e.innerHTML='<i class="bi bi-hourglass"></i>',await Xc(s),Ee=Ee.filter(r=>r.id!==s),hs(),g("Sucesso","Plano apagado.","success")}catch(r){e.disabled=!1,e.innerHTML="Apagar",g("Atenção",r.message,"warning")}}),document.getElementById("planForm").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("btnSavePlan"),a=Array.from(document.querySelectorAll(".service-cb:checked")).map(i=>i.value);if(a.length===0)return g("Aviso","Selecione pelo menos um serviço para o plano.","warning");const s={name:document.getElementById("planName").value.trim(),description:document.getElementById("planDesc").value.trim(),price:parseFloat(document.getElementById("planPrice").value),billingCycle:document.getElementById("planCycle").value,usageLimit:document.getElementById("planUsageLimit").value?parseInt(document.getElementById("planUsageLimit").value,10):null,active:document.getElementById("planActive").checked,servicesIncluded:a,establishmentId:f.selectedEstablishments?.[0]||f.establishmentId};try{if(e.disabled=!0,e.innerHTML='<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Salvando...',fa){await Yc(fa,s);const i=Ee.findIndex(o=>o.id===fa);Ee[i]={...Ee[i],...s},g("Sucesso","Plano atualizado!","success")}else{const i=await Qc(s);Ee.unshift(i),g("Sucesso","Plano criado com sucesso!","success")}Ga(),hs()}catch(i){g("Erro",i.message||"Erro ao salvar o plano.","error")}finally{e.disabled=!1,e.innerHTML='<i class="bi bi-check2"></i> Salvar Plano'}})}document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("gesturestart",e=>e.preventDefault()),document.addEventListener("gesturechange",e=>e.preventDefault()),document.addEventListener("gestureend",e=>e.preventDefault());let t=0;document.addEventListener("touchend",function(e){const a=new Date().getTime();a-t<=300&&e.preventDefault(),t=a},!1)});const ce=document.getElementById("loadingScreen"),vt=document.getElementById("dashboardContent"),nt=document.getElementById("content"),Qa=document.getElementById("notificationBell"),ra=document.getElementById("notificationBadge"),et=document.getElementById("notificationPanel"),Ya=document.getElementById("notificationList"),Te=document.getElementById("profileMenuButton"),be=document.getElementById("profileDropdown"),xo=document.getElementById("profileName"),ho=document.getElementById("profileEmail"),vo=document.getElementById("logoutButton"),yo=document.getElementById("myProfileLink"),wo=document.getElementById("hamburger-menu-btn"),pe=document.getElementById("sidebar"),ye=document.getElementById("mobile-overlay"),ko=document.getElementById("themeToggleBtn"),Xa=document.getElementById("themeIcon"),vs=document.getElementById("mobile-bottom-nav"),Io=document.getElementById("nav-scroll"),au=document.querySelectorAll(".bottom-nav-item");function su(){if(!Io)return;const t=document.querySelector(".bottom-nav-item.active");if(!t)return;const e=Io,a=e.getBoundingClientRect(),s=t.getBoundingClientRect(),o=s.left+s.width/2-a.left-a.width/2;e.scrollBy({left:o,behavior:"smooth"})}const ou={"dashboard-section":Kr,"agenda-section":Ko,"comandas-section":Kn,"relatorios-section":al,"servicos-section":ul,"produtos-section":Ll,"suppliers-section":Rl,"profissionais-section":Gl,"clientes-section":ld,"estabelecimento-section":t=>Ei(t),"ausencias-section":Rd,"users-section":Sa,"sales-report-section":ec,"financial-section":sc,"commissions-section":fc,"packages-section":qc,"my-profile-section":Vc,"hierarquia-section":()=>Ca(nt),"establishments-section":()=>Ca(nt),"planos-assinatura-section":Zc},iu={"dashboard-section":"Dashboard","agenda-section":"Agenda","comandas-section":"Comandas / PDV","relatorios-section":"Relatórios","servicos-section":"Serviços","produtos-section":"Estoque","suppliers-section":"Parceiros","profissionais-section":"Equipe","clientes-section":"Clientes","estabelecimento-section":"Empresa","ausencias-section":"Ausências","users-section":"Usuários","sales-report-section":"Relatório de Vendas","financial-section":"Financeiro","commissions-section":"Comissões","packages-section":"Pacotes","my-profile-section":"Meu Perfil","hierarquia-section":"Rede / Filiais","establishments-section":"Rede / Filiais","planos-assinatura-section":"Clubes e Planos"};function xa(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("kairos_theme",t),Xa&&(t==="dark"?Xa.className="bi bi-sun-fill text-lg sm:text-xl text-amber-400":Xa.className="bi bi-moon-fill text-lg sm:text-xl text-slate-500")}function ru(){const t=localStorage.getItem("kairos_theme"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;xa(t||(e?"dark":"light"))}let Bt=null,Mt=[];function Ri(){if(!ra||!Ya)return;const t=Mt.filter(e=>!e.read).length;if(t>0?(ra.textContent=t,ra.classList.remove("hidden")):ra.classList.add("hidden"),Mt.length===0){Ya.innerHTML='<p class="text-center text-slate-500 p-4 text-sm">Nenhuma notificação.</p>';return}Ya.innerHTML=Mt.map(e=>`
    <div class="notification-item ${e.read?"":"unread"}">
        <p class="font-semibold text-sm text-slate-800">${e.title}</p>
        <p class="text-xs text-slate-600 mt-0.5">${e.message}</p>
        <p class="text-[10px] text-slate-400 mt-1"><i class="bi bi-clock mr-1"></i>${e.time}</p>
    </div>
    `).join("")}function So(t){Bt&&Bt();const e=Da(he,"establishments",t,"notifications"),a=Lo(e,Co("timestamp",">=",new Date),Ki("timestamp","desc"));Bt=er(a,s=>{s.docChanges().forEach(i=>{if(i.type==="added"){const o=i.doc.data();Mt.unshift({title:o.title,message:o.message,time:o.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),g(o.title,o.message,"info",!0),Ri();const r=document.querySelector(".sidebar-link.active");r&&r.dataset.target==="agenda-section"&&Ko()}})},s=>{console.error("Erro no listener de notificações:",s)})}async function nu(t){const e=document.getElementById("multi-context-container"),a=document.getElementById("multi-context-btn"),s=document.getElementById("multi-context-label"),i=document.getElementById("multi-context-count"),o=document.getElementById("multi-context-list"),r=document.getElementById("multi-context-apply"),n=document.getElementById("multi-context-dropdown"),l=document.getElementById("multi-context-arrow");if(!(!e||!o))try{const u=(await De()).matrizes||[];let c="",p=0;if(u.forEach(m=>{c+=`
                <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors mb-1">
                    <input type="checkbox" value="${m.id}" class="context-checkbox" data-name="${na(m.name)}">
                    <span class="text-[13px] sm:text-sm font-bold text-slate-700 truncate">🏢 ${na(m.name)}</span>
                </label>
            `,p++,m.branches&&m.branches.length>0&&m.branches.forEach(b=>{c+=`
                        <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors ml-4 mb-1 border-l-2 border-slate-100 pl-3">
                            <input type="checkbox" value="${b.id}" class="context-checkbox" data-name="${na(b.name)}">
                            <span class="text-[12px] sm:text-[13px] font-medium text-slate-600 truncate">📍 ${na(b.name)}</span>
                        </label>
                    `,p++})}),p>0){o.innerHTML=c,e.style.display="block",(!f.selectedEstablishments||f.selectedEstablishments.length===0)&&(f.selectedEstablishments=[t]);const m=Array.from(o.querySelectorAll('input[type="checkbox"]')),b=()=>{const y=m.filter(I=>I.checked);i.textContent=y.length,y.length===0?s.textContent="Nenhuma selecionada":y.length===1?s.textContent=y[0].dataset.name:s.textContent=`${y.length} Unidades`};let x=!1;m.forEach(y=>{f.selectedEstablishments.includes(y.value)&&(y.checked=!0,x=!0)}),!x&&m.length>0&&(m[0].checked=!0,f.selectedEstablishments=[m[0].value],f.establishmentId=m[0].value),b(),a.addEventListener("click",y=>{y.stopPropagation(),n.classList.toggle("hidden"),l.style.transform=n.classList.contains("hidden")?"rotate(0deg)":"rotate(180deg)"}),document.addEventListener("click",y=>{!e.contains(y.target)&&!n.classList.contains("hidden")&&(n.classList.add("hidden"),l.style.transform="rotate(0deg)",m.forEach(I=>{I.checked=f.selectedEstablishments.includes(I.value)}),b())}),m.forEach(y=>y.addEventListener("change",b)),r.addEventListener("click",async y=>{y.stopPropagation(),ce&&(ce.classList.remove("hidden","fade-out"),ce.style.display="flex");const I=m.filter(L=>L.checked);if(I.length===0){ce&&(ce.classList.add("fade-out"),setTimeout(()=>{ce.style.display="none"},500)),g("Atenção","Selecione pelo menos uma unidade.","warning");return}f.selectedEstablishments=I.map(L=>L.value);const S=f.selectedEstablishments[0];try{const L=await Be(S);f.establishmentId=S,f.establishmentName=L.name,f.enabledModules=L.modules,f.currentViewContext={id:S,name:L.name,type:L.parentId?"BRANCH":"GROUP"},So(S),Eo(f.userPermissions),n.classList.add("hidden"),l.style.transform="rotate(0deg)",g("Ambiente Atualizado","Exibindo dados consolidados.","success");const q=document.querySelector(".sidebar-link.active"),N=q?q.getAttribute("data-target"):"dashboard-section";re(N)}catch{g("Erro","Problema ao trocar a visualização.","error")}finally{ce&&(ce.classList.add("fade-out"),setTimeout(()=>{ce.style.display="none"},500))}});try{const y=await Be(f.establishmentId);f.establishmentName=y.name,f.enabledModules=y.modules,f.currentViewContext={id:f.establishmentId,name:y.name,type:y.parentId?"BRANCH":"GROUP"},So(f.establishmentId),Eo(f.userPermissions)}catch{}}else e.style.display="none"}catch{e.style.display="none"}}function re(t,e={}){const a=t.replace("-section","");if(t!=="my-profile-section"){const i=["hierarquia-section","establishments-section","estabelecimento-section","dashboard-section"].includes(t),o=f.enabledModules?.[a]!==!1,r=f.userPermissions===null||f.userPermissions[t]?.view===!0;if(!i&&(!o||!r)){nt&&(nt.innerHTML='<div class="p-8 text-center mt-10"><i class="bi bi-shield-lock text-5xl text-rose-500 mb-4 block"></i><h2 class="text-2xl font-bold text-slate-800">Acesso Negado</h2><p class="text-slate-500 mt-2">Você não possui permissão para visualizar esta tela.</p></div>'),document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active")),pe&&pe.classList.contains("absolute")&&(pe.classList.add("hidden"),ye&&ye.classList.add("hidden"));return}}const s=ou[t];if(s&&nt){const i=document.getElementById("header-page-title");i&&(i.textContent=iu[t]||"Painel"),document.querySelectorAll(".sidebar-link").forEach(o=>{o.classList.toggle("active",o.getAttribute("data-target")===t)}),vs&&(au.forEach(o=>{o.classList.toggle("active",o.getAttribute("data-target")===t)}),setTimeout(su,50)),t==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(o=>o.classList.remove("active")),nt.innerHTML="",window.innerWidth<768&&pe&&(pe.classList.add("hidden"),ye&&ye.classList.add("hidden")),s(e)}}window.navigateTo=re;async function Eo(t){const e=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),s=document.getElementById("kpi-today-appointments"),i=document.getElementById("kpi-today-revenue"),o=t===null||t["agenda-section"]?.view===!0,r=t===null||t["financial-section"]?.view===!0;if(o&&e&&(e.classList.remove("hidden"),e.classList.add("inline-flex")),r&&a&&(a.classList.remove("hidden"),a.classList.add("inline-flex")),!(!o&&!r))try{const n=await Or();o&&s&&(s.textContent=n.todayAppointments.toString()),r&&i&&(i.textContent=`R$ ${n.todayRevenue.toFixed(2).replace(".",",")}`)}catch{}}async function lu(t){try{Ce.getPlatform()==="android"&&await ue.createChannel({id:"default",name:"Notificações",description:"Alertas",importance:5,visibility:1,vibration:!0});let e=await ue.checkPermissions();if(e.receive==="prompt"&&(e=await ue.requestPermissions()),e.receive!=="granted")return;await ue.register(),ue.addListener("registration",async a=>{try{const s=je(he,"users",t);await jt(s,{fcmTokens:Zi(a.value),platform:"native_mobile"})}catch{}}),ue.addListener("pushNotificationReceived",a=>g(a.title,a.body,"info",!0)),ue.addListener("pushNotificationActionPerformed",()=>re("agenda-section"))}catch{}}function du(){const t=document.getElementById("exitConfirmationModal"),e=document.getElementById("btn-cancel-exit"),a=document.getElementById("btn-confirm-exit"),s=()=>t&&(t.style.display="block"),i=()=>t&&(t.style.display="none"),o=()=>t&&t.style.display==="block";t&&(e.addEventListener("click",()=>{i(),Ce.isNativePlatform()||history.pushState(null,document.title,location.href)}),a.addEventListener("click",()=>{i(),Ce.isNativePlatform()?_s.exitApp():history.back()}),Ce.isNativePlatform()?_s.addListener("backButton",()=>{if(o())i();else{const r=document.querySelectorAll('.modal[style*="display: block"]'),n=Array.from(r).filter(d=>d.id!=="exitConfirmationModal");if(n.length>0){n.forEach(d=>d.style.display="none");return}if(pe&&!pe.classList.contains("hidden")&&window.innerWidth<768){pe.classList.add("hidden"),ye&&ye.classList.add("hidden");return}const l=document.querySelector(".sidebar-link.active");l&&l.getAttribute("data-target")==="dashboard-section"?s():re("dashboard-section")}}):(history.pushState(null,document.title,location.href),window.addEventListener("popstate",()=>{if(o()){i(),history.pushState(null,document.title,location.href);return}const r=document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display: flex"]'),n=Array.from(r).filter(d=>d.id!=="exitConfirmationModal");if(n.length>0){n.forEach(d=>d.style.display="none"),history.pushState(null,document.title,location.href);return}const l=document.querySelector(".sidebar-link.active");l&&l.getAttribute("data-target")==="dashboard-section"?s():(re("dashboard-section"),history.pushState(null,document.title,location.href))})))}function na(t){return t?t.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}async function cu(){try{await Ui(ke,Wi)}catch{}Ce.isNativePlatform()&&document.body.classList.add("is-app-native"),tr(),du(),ru(),ko&&ko.addEventListener("click",t=>{t.preventDefault();const e=document.documentElement.getAttribute("data-theme")||"light";xa(e==="dark"?"light":"dark")}),wo&&wo.addEventListener("click",t=>{t.stopPropagation(),pe&&(pe.classList.remove("hidden"),pe.classList.add("absolute","inset-y-0","left-0","z-40","shadow-xl")),ye&&ye.classList.remove("hidden")}),vs&&vs.addEventListener("click",t=>{const e=t.target.closest(".bottom-nav-item");if(!e)return;t.preventDefault();const a=e.getAttribute("data-target");re(a)}),ye&&ye.addEventListener("click",()=>{pe&&(pe.classList.add("hidden"),pe.classList.remove("absolute","inset-y-0","left-0","z-40","shadow-xl")),ye.classList.add("hidden")}),Qa&&Qa.addEventListener("click",t=>{t.stopPropagation(),et&&(et.classList.toggle("hidden"),et.classList.contains("hidden")||(Mt.forEach(e=>e.read=!0),Ri()))}),Te&&Te.addEventListener("click",t=>{t.stopPropagation(),be&&(be.classList.toggle("active"),be.classList.contains("active")?be.classList.remove("hidden"):setTimeout(()=>be.classList.add("hidden"),200))}),yo&&yo.addEventListener("click",t=>{t.preventDefault(),re("my-profile-section"),be&&(be.classList.remove("active"),be.classList.add("hidden"))}),window.addEventListener("userPhotoUpdated",t=>{const e=t.detail;Te&&e&&(Te.innerHTML=`<img src="${e}" alt="Avatar" class="w-full h-full rounded-full object-cover">`)}),document.addEventListener("click",t=>{et&&!et.contains(t.target)&&t.target!==Qa&&et.classList.add("hidden"),be&&!be.contains(t.target)&&t.target!==Te&&be.classList.contains("active")&&(be.classList.remove("active"),setTimeout(()=>be.classList.add("hidden"),200))}),Ji(ke,async t=>{if(t){if(!Ce.isNativePlatform()&&(Rr(),"Notification"in window&&Notification.permission==="default")){const e=document.getElementById("toast-notification-request"),a=document.getElementById("btn-enable-toast");e&&setTimeout(()=>{e.style.display="block"},3500),a&&a.addEventListener("click",async()=>{await Hr()&&e&&(e.style.display="none")});const s=()=>{e&&(e.style.display="none")},i=document.getElementById("btn-deny-toast"),o=document.getElementById("btn-close-toast");i&&i.addEventListener("click",s),o&&o.addEventListener("click",s)}try{const a=(await t.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="admin"||a.role==="employee")&&a.establishmentId){let s=null,i=t.displayName,o=null,r=null;const n=je(he,"users",t.uid),l=await ys(n);if(l.exists()){const u=l.data();s=a.role==="employee"?u.permissions||{}:null,i=u.name||i,o=u.professionalId||null,r=u.photo||null}if(f.userProfessionalId=o,o&&!r)try{const u=await Do(o);u&&u.photo&&(r=u.photo)}catch{}Ce.isNativePlatform()&&lu(t.uid);const d=i||t.email;or(a.establishmentId,"Carregando...",s),r?Te&&(Te.innerHTML=`<img src="${r}" class="w-full h-full rounded-full object-cover">`):Te&&(Te.textContent=d.charAt(0).toUpperCase()),xo&&(xo.textContent=d),ho&&(ho.textContent=t.email),vo&&vo.addEventListener("click",u=>{u.preventDefault(),Bt&&Bt(),Gi(ke).then(()=>window.location.href="/login.html")}),await nu(a.establishmentId),hr(re,s,f.enabledModules),ce&&(ce.classList.add("fade-out"),setTimeout(()=>{ce.style.display="none"},500)),vt&&(vt.style.display="flex"),setTimeout(()=>{Er()},1500),re("dashboard-section")}else throw new Error("Permissão ou estabelecimento não configurado.")}catch(e){ce&&(ce.style.display="none"),vt&&(vt.innerHTML=`<div class="w-full h-full flex flex-col items-center justify-center p-4 text-center"><i class="bi bi-x-circle text-5xl text-rose-500 mb-4"></i><h2 class="text-xl font-bold">Erro de Acesso</h2><p class="text-slate-500 mt-2">${e.message}</p></div>`,vt.style.display="flex")}}else window.location.href="/login.html"})}cu();export{To as W};
