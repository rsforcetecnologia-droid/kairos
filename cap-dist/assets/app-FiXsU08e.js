const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-guK6Mt_l.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/firebase-config-C2tbVz-J.js","assets/utils-JfzC6GFr.js","assets/styles-CQhY7Cv2.css"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as ye,d as xe,m as Ps}from"./firebase-config-C2tbVz-J.js";import{EmailAuthProvider as Br,reauthenticateWithCredential as jr,verifyBeforeUpdateEmail as qr,updatePassword as Nr,updateProfile as Fr,setPersistence as Rr,browserLocalPersistence as Hr,onAuthStateChanged as Or,signOut as zr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{doc as Be,getDoc as us,updateDoc as Tt,setDoc as _r,addDoc as ho,collection as ka,query as vo,where as yo,getDocs as Vr,deleteDoc as Ur,arrayUnion as Wr,orderBy as Jr,onSnapshot as Qr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import{a as L,e as v,s as Q,b as f,c as Ne,r as Sa,f as ja,i as Gr}from"./utils-JfzC6GFr.js";import{getToken as Yr,onMessage as Xr}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";const g={userName:null,userProfessionalId:null,userPermissions:null,userRole:null,groupId:null,groupName:null,accessibleCompanies:[],accessibleEstablishments:[],currentViewContext:{type:null,id:null,name:null},establishmentId:null,establishmentName:null,establishmentSettings:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function Zr(t,e,a){g.establishmentId=t,g.establishmentName=e,g.userPermissions=a,g.currentViewContext={type:"BRANCH",id:t,name:e}}const $a=(t,e,a,s=null)=>{let r=`/api/appointments/${t}?startDate=${e}&endDate=${a}`;return s&&(r+=`&professionalId=${s}`),L(r)},Kr=(t,e,a)=>{const s=`/api/appointments/cancelled/${t}?startDate=${e}&endDate=${a}`;return L(s)},ei=({establishmentId:t,professionalId:e,serviceIds:a,date:s})=>{const r=`/api/availability?establishmentId=${t}&professionalId=${e}&serviceIds=${a.join(",")}&date=${s}`;return L(r)},ti=t=>L("/api/appointments",{method:"POST",body:JSON.stringify(t)}),ai=(t,e)=>L(`/api/appointments/${t}`,{method:"PUT",body:JSON.stringify(e)}),si=t=>L(`/api/appointments/${t}`,{method:"DELETE"}),oi=t=>L(`/api/appointments/${t}/reopen`,{method:"POST"}),ri=(t,e)=>L(`/api/appointments/${t}/checkout`,{method:"POST",body:JSON.stringify(e)}),ne=document.getElementById("sidebar"),Ve=document.getElementById("sidebarToggle"),wt=document.getElementById("mainContent"),ii=document.querySelectorAll(".sidebar-link"),Va=document.getElementById("menu-search"),Ts=document.getElementById("hamburger-menu-btn"),ot=document.getElementById("mobile-overlay");let Ae=!0;function He(t){if(!ne||!wt)return;ne.classList.toggle("collapsed",t),wt.classList.toggle("sidebar-collapsed-shift",t);const e=ne.querySelector(".sidebar-search-container"),a=ne.querySelectorAll(".sidebar-category");t?(e&&(e.style.display="none"),a.forEach(s=>s.style.display="none"),document.querySelectorAll(".submenu-toggle").forEach(s=>{const r=s.getAttribute("data-target-submenu"),o=document.getElementById(r),i=s.querySelector(".submenu-arrow");o&&(o.classList.add("hidden"),o.classList.remove("flex")),i&&i.classList.remove("rotate-180")})):(e&&(e.style.display="block"),a.forEach(s=>s.style.display="block"))}function ni(){!ne||!ot||(ne.classList.add("mobile-open"),ot.classList.add("visible"))}function qt(){!ne||!ot||(ne.classList.remove("mobile-open"),ot.classList.remove("visible"))}function li(){He(!ne.classList.contains("collapsed"))}function di(t,e){const a=document.getElementById(t);if(!a)return;const s=a.classList.contains("hidden");s&&window.innerWidth>=1024&&ne.classList.contains("collapsed")&&He(!1),s?(a.classList.remove("hidden"),a.classList.add("flex"),e&&e.classList.add("rotate-180")):(a.classList.add("hidden"),a.classList.remove("flex"),e&&e.classList.remove("rotate-180"))}function ci(){Va&&Va.addEventListener("input",t=>{const e=t.target.value.toLowerCase().trim(),a=document.getElementById("sidebar-nav");if(!a)return;const s=a.querySelectorAll("li"),r=a.querySelectorAll(".sidebar-category");if(e===""){s.forEach(o=>o.style.display=""),r.forEach(o=>o.style.display="block");return}r.forEach(o=>o.style.display="none"),s.forEach(o=>{if(o.classList.contains("sidebar-category"))return;const i=o.querySelector(".sidebar-link")||o.querySelector(".submenu-toggle");if(!i)return;if(i.textContent.toLowerCase().includes(e)){o.style.display="";const d=o.closest('ul[id$="-submenu"]');if(d){d.classList.remove("hidden"),d.classList.add("flex"),d.parentElement.style.display="";const u=d.parentElement.querySelector(".submenu-toggle");if(u){const c=u.querySelector(".submenu-arrow");c&&c.classList.add("rotate-180")}}}else{const d=i.getAttribute("data-target-submenu");if(d){const u=document.getElementById(d);u&&(Array.from(u.querySelectorAll(".sidebar-link")).some(b=>b.textContent.toLowerCase().includes(e))?o.style.display="":o.style.display="none")}else o.style.display="none"}})})}function ui(t,e,a){if(!ne||!wt)return;wt.classList.add("main-content-shift"),window.innerWidth>=1024?(Ae=!0,He(!1)):window.innerWidth>=768?(Ae=!1,He(!0)):(wt.classList.remove("main-content-shift","sidebar-collapsed-shift"),qt()),Ve&&Ve.addEventListener("click",r=>{r.stopPropagation(),window.innerWidth>=768?(Ae=!Ae,He(!Ae),Ae?(Ve.classList.add("text-indigo-400"),Ve.classList.remove("text-gray-400")):(Ve.classList.remove("text-indigo-400"),Ve.classList.add("text-gray-400"))):li()}),ne.addEventListener("mouseenter",()=>{window.innerWidth>=768&&!Ae&&ne.classList.contains("collapsed")&&He(!1)}),ne.addEventListener("mouseleave",()=>{if(window.innerWidth>=768&&!Ae){const r=!!document.querySelector("#sidebarToggle:hover"),o=document.activeElement===Va;!r&&!o&&He(!0)}}),Ts&&Ts.addEventListener("click",r=>{r.stopPropagation(),ni()}),ot&&ot.addEventListener("click",r=>{r.stopPropagation(),qt()});let s=0;ne.addEventListener("touchstart",r=>{s=r.changedTouches[0].screenX},{passive:!0}),ne.addEventListener("touchend",r=>{const o=r.changedTouches[0].screenX;s-o>50&&qt()},{passive:!0}),document.querySelectorAll(".submenu-toggle").forEach(r=>{r.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();const i=r.getAttribute("data-target-submenu"),n=r.querySelector(".submenu-arrow");di(i,n)})}),ci(),ii.forEach(r=>{const o=r.getAttribute("data-target");if(!o)return;const i=o.replace("-section",""),n=a?.[i]!==!1,l=e===null||e[o]?.view===!0;if(!n||!l){r.parentElement&&r.parentElement.tagName==="LI"?r.parentElement.style.display="none":r.style.display="none";return}r.addEventListener("click",d=>{d.preventDefault(),document.querySelectorAll(".sidebar-link").forEach(u=>u.classList.remove("active")),r.classList.add("active"),o&&typeof t=="function"&&t(o),window.innerWidth<768&&qt()})})}const pi=t=>L("/api/establishments/",{method:"POST",body:JSON.stringify(t)}),we=()=>L("/api/establishments/hierarchy",{method:"GET"}),je=t=>{const e=t||g.establishmentId;return e?L(`/api/establishments/${e}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},ps=(t,e)=>{const a=t||g.establishmentId;return a?L(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(e)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},bi=(t,e)=>{const a=t||g.establishmentId;return a?L(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:e})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},mi=(t,e)=>{const a=t||g.establishmentId;return a?L(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:e})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Ee=t=>L(`/api/professionals/${t}`),wo=t=>L(`/api/professionals/details/${t}`),gi=t=>L("/api/professionals",{method:"POST",body:JSON.stringify(t)}),Ua=(t,e)=>L(`/api/professionals/${t}`,{method:"PUT",body:JSON.stringify(e)}),ko=t=>L(`/api/professionals/${t}`,{method:"DELETE"}),fi=t=>{const e=t.map(a=>ko(a));return Promise.all(e)};class xi{constructor(e,a,s){this.steps=e,this.currentStep=0,this.onComplete=a,this.onSkip=s,this.isActive=!1,this.overlay=null,this.spotlight=null,this.popover=null,this.handleResize=this.handleResize.bind(this)}start(){this.isActive||(this.isActive=!0,this.createElements(),window.addEventListener("resize",this.handleResize),this.renderStep())}stop(e=!1){this.isActive=!1,window.removeEventListener("resize",this.handleResize),this.overlay&&this.overlay.remove(),this.spotlight&&this.spotlight.remove(),this.popover&&this.popover.remove(),e&&this.onComplete?this.onComplete():!e&&this.onSkip&&this.onSkip()}createElements(){this.overlay=document.createElement("div"),this.overlay.className="fixed inset-0 bg-black/60 z-[99990] transition-opacity duration-300",document.body.appendChild(this.overlay),this.spotlight=document.createElement("div"),this.spotlight.className="absolute rounded-xl z-[99991] transition-all duration-500 ease-in-out pointer-events-none bg-transparent",this.spotlight.style.boxShadow="0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255,255,255,0.5) inset",document.body.appendChild(this.spotlight),this.popover=document.createElement("div"),this.popover.className="absolute z-[99992] bg-white rounded-2xl shadow-2xl w-[320px] transition-all duration-500 ease-in-out opacity-0 transform scale-95 border border-gray-100 flex flex-col",document.body.appendChild(this.popover)}async renderStep(){if(this.currentStep>=this.steps.length){this.stop(!0);return}const e=this.steps[this.currentStep];this.popover.style.opacity="0",this.popover.style.transform="scale(0.95)",e.onBefore&&(await e.onBefore(),await this.sleep(600));const a=await this.waitForElement(e.targetSelector,3e3);if(a){a.scrollIntoView({behavior:"smooth",block:"center"}),await this.sleep(300);const r=a.getBoundingClientRect(),o=8;this.spotlight.style.top=`${r.top+window.scrollY-o}px`,this.spotlight.style.left=`${r.left+window.scrollX-o}px`,this.spotlight.style.width=`${r.width+o*2}px`,this.spotlight.style.height=`${r.height+o*2}px`,this.spotlight.style.display="block",this.overlay.style.display="none",this.positionPopover(r)}else this.spotlight.style.display="none",this.overlay.style.display="block",this.popover.style.top="50%",this.popover.style.left="50%",this.popover.style.transform="translate(-50%, -50%) scale(1)";const s=this.currentStep===this.steps.length-1;this.popover.innerHTML=`
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
        `,setTimeout(()=>{a&&(this.popover.style.transform="scale(1)"),this.popover.style.opacity="1"},50),document.getElementById("tour-next-btn").onclick=()=>{this.currentStep++,this.renderStep()},document.getElementById("tour-prev-btn")&&(document.getElementById("tour-prev-btn").onclick=()=>{this.currentStep--,this.renderStep()}),document.getElementById("tour-skip-btn").onclick=()=>this.stop(!1)}positionPopover(e){const a=this.popover.getBoundingClientRect(),s=20;let r=e.bottom+window.scrollY+s,o=e.left+window.scrollX;r+a.height>window.scrollY+window.innerHeight&&(r=e.top+window.scrollY-a.height-s),o+a.width>window.innerWidth&&(o=e.right+window.scrollX-a.width),o<s&&(o=s),this.popover.style.top=`${r}px`,this.popover.style.left=`${o}px`}handleResize(){this.isActive&&this.renderStep()}sleep(e){return new Promise(a=>setTimeout(a,e))}async waitForElement(e,a){if(!e)return null;const s=Date.now();for(;Date.now()-s<a;){const r=document.querySelector(e);if(r)return r;await this.sleep(100)}return null}}async function hi(){try{console.log("A verificar Onboarding interativo...");const t=await je(g.establishmentId);if(!t||t.parentId||t.onboardingCompleted)return;const e=[{title:"Bem-vindo ao Kairos!",icon:"👋",content:"Preparei um tour rápido para lhe mostrar onde deve configurar as 3 coisas mais importantes antes de receber agendamentos. Vamos a isso?",targetSelector:null},{title:"Perfil e Dados da Loja",icon:"🏢",content:"É aqui em 'Minha Empresa' que você define o nome do Salão, telefone, endereço e faz o upload da sua Logomarca.",targetSelector:'[data-target="estabelecimento-section"]',onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Cores e Personalização",icon:"🎨",content:"Nesta área você pode mudar a cor principal do sistema para ficar com a cara da sua marca. O link do seu cliente vai usar esta cor!",targetSelector:"#themeColor",onBefore:async()=>{window.navigateTo("estabelecimento-section")}},{title:"Criação de Serviços",icon:"✂️",content:"Na aba 'Serviços' é onde a mágica acontece. Crie os serviços que os seus clientes vão poder agendar, informando o preço e a duração de cada um.",targetSelector:'[data-target="servicos-section"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Novo Serviço",icon:"➕",content:"Sempre que precisar adicionar um novo serviço ao menu, basta clicar neste botão verde.",targetSelector:'[data-action="new-service"]',onBefore:async()=>{window.navigateTo("servicos-section")}},{title:"Gestão da Equipe",icon:"👥",content:"E para terminar: a 'Equipa'. Aqui você cadastra os profissionais, define quem faz qual serviço e ajusta a jornada de trabalho semanal de cada um.",targetSelector:'[data-target="profissionais-section"]',onBefore:async()=>{window.navigateTo("profissionais-section")}},{title:"Tudo Pronto!",icon:"🚀",content:"Você já conhece o caminho! Preencha as informações do seu negócio com calma. Quando terminar, volte à Agenda e partilhe o seu Link de Agendamento com os clientes!",targetSelector:null,onBefore:async()=>{window.navigateTo("agenda-section")}}],a=async()=>{try{await ps(g.establishmentId,{onboardingCompleted:!0}),showNotification("Tour Concluído","Você já pode configurar o seu sistema livremente!","success")}catch(r){console.error("Erro ao gravar fim do onboarding",r)}};new xi(e,a,a).start()}catch(t){console.error("Erro fatal ao iniciar onboarding:",t)}}var rt;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(rt||(rt={}));class qa extends Error{constructor(e,a,s){super(e),this.message=e,this.code=a,this.data=s}}const vi=t=>{var e,a;return t?.androidBridge?"android":!((a=(e=t?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},yi=t=>{const e=t.CapacitorCustomPlatform||null,a=t.Capacitor||{},s=a.Plugins=a.Plugins||{},r=()=>e!==null?e.name:vi(t),o=()=>r()!=="web",i=c=>{const p=d.get(c);return!!(p?.platforms.has(r())||n(c))},n=c=>{var p;return(p=a.PluginHeaders)===null||p===void 0?void 0:p.find(b=>b.name===c)},l=c=>t.console.error(c),d=new Map,u=(c,p={})=>{const b=d.get(c);if(b)return console.warn(`Capacitor plugin "${c}" already registered. Cannot register plugins twice.`),b.proxy;const m=r(),h=n(c);let y;const k=async()=>(!y&&m in p?y=typeof p[m]=="function"?y=await p[m]():y=p[m]:e!==null&&!y&&"web"in p&&(y=typeof p.web=="function"?y=await p.web():y=p.web),y),A=(C,D)=>{var V,T;if(h){const M=h?.methods.find(R=>D===R.name);if(M)return M.rtype==="promise"?R=>a.nativePromise(c,D.toString(),R):(R,X)=>a.nativeCallback(c,D.toString(),R,X);if(C)return(V=C[D])===null||V===void 0?void 0:V.bind(C)}else{if(C)return(T=C[D])===null||T===void 0?void 0:T.bind(C);throw new qa(`"${c}" plugin is not implemented on ${m}`,rt.Unimplemented)}},P=C=>{let D;const V=(...T)=>{const M=k().then(R=>{const X=A(R,C);if(X){const te=X(...T);return D=te?.remove,te}else throw new qa(`"${c}.${C}()" is not implemented on ${m}`,rt.Unimplemented)});return C==="addListener"&&(M.remove=async()=>D()),M};return V.toString=()=>`${C.toString()}() { [capacitor code] }`,Object.defineProperty(V,"name",{value:C,writable:!1,configurable:!1}),V},S=P("addListener"),I=P("removeListener"),N=(C,D)=>{const V=S({eventName:C},D),T=async()=>{const R=await V;I({eventName:C,callbackId:R},D)},M=new Promise(R=>V.then(()=>R({remove:T})));return M.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await T()},M},U=new Proxy({},{get(C,D){switch(D){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return h?N:S;case"removeListener":return I;default:return P(D)}}});return s[c]=U,d.set(c,{name:c,proxy:U,platforms:new Set([...Object.keys(p),...h?[m]:[]])}),U};return a.convertFileSrc||(a.convertFileSrc=c=>c),a.getPlatform=r,a.handleError=l,a.isNativePlatform=o,a.isPluginAvailable=i,a.registerPlugin=u,a.Exception=qa,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},wi=t=>t.Capacitor=yi(t),Ie=wi(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Ia=Ie.registerPlugin;class So{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,a){let s=!1;this.listeners[e]||(this.listeners[e]=[],s=!0),this.listeners[e].push(a);const o=this.windowListeners[e];o&&!o.registered&&this.addWindowListener(o),s&&this.sendRetainedArgumentsForEvent(e);const i=async()=>this.removeListener(e,a);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,a,s){const r=this.listeners[e];if(!r){if(s){let o=this.retainedEventArguments[e];o||(o=[]),o.push(a),this.retainedEventArguments[e]=o}return}r.forEach(o=>o(a))}hasListeners(e){var a;return!!(!((a=this.listeners[e])===null||a===void 0)&&a.length)}registerWindowListener(e,a){this.windowListeners[a]={registered:!1,windowEventName:e,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(e="not implemented"){return new Ie.Exception(e,rt.Unimplemented)}unavailable(e="not available"){return new Ie.Exception(e,rt.Unavailable)}async removeListener(e,a){const s=this.listeners[e];if(!s)return;const r=s.indexOf(a);this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const a=this.retainedEventArguments[e];a&&(delete this.retainedEventArguments[e],a.forEach(s=>{this.notifyListeners(e,s)}))}}const Ms=t=>encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),As=t=>t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class ki extends So{async getCookies(){const e=document.cookie,a={};return e.split(";").forEach(s=>{if(s.length<=0)return;let[r,o]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=As(r).trim(),o=As(o).trim(),a[r]=o}),a}async setCookie(e){try{const a=Ms(e.key),s=Ms(e.value),r=`; expires=${(e.expires||"").replace("expires=","")}`,o=(e.path||"/").replace("path=",""),i=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${a}=${s||""}${r}; path=${o}; ${i};`}catch(a){return Promise.reject(a)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const a of e)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}Ia("CapacitorCookies",{web:()=>new ki});const Si=async t=>new Promise((e,a)=>{const s=new FileReader;s.onload=()=>{const r=s.result;e(r.indexOf(",")>=0?r.split(",")[1]:r)},s.onerror=r=>a(r),s.readAsDataURL(t)}),$i=(t={})=>{const e=Object.keys(t);return Object.keys(t).map(r=>r.toLocaleLowerCase()).reduce((r,o,i)=>(r[o]=t[e[i]],r),{})},Ii=(t,e=!0)=>t?Object.entries(t).reduce((s,r)=>{const[o,i]=r;let n,l;return Array.isArray(i)?(l="",i.forEach(d=>{n=e?encodeURIComponent(d):d,l+=`${o}=${n}&`}),l.slice(0,-1)):(n=e?encodeURIComponent(i):i,l=`${o}=${n}`),`${s}&${l}`},"").substr(1):null,Ei=(t,e={})=>{const a=Object.assign({method:t.method||"GET",headers:t.headers},e),r=$i(t.headers)["content-type"]||"";if(typeof t.data=="string")a.body=t.data;else if(r.includes("application/x-www-form-urlencoded")){const o=new URLSearchParams;for(const[i,n]of Object.entries(t.data||{}))o.set(i,n);a.body=o.toString()}else if(r.includes("multipart/form-data")||t.data instanceof FormData){const o=new FormData;if(t.data instanceof FormData)t.data.forEach((n,l)=>{o.append(l,n)});else for(const n of Object.keys(t.data))o.append(n,t.data[n]);a.body=o;const i=new Headers(a.headers);i.delete("content-type"),a.headers=i}else(r.includes("application/json")||typeof t.data=="object")&&(a.body=JSON.stringify(t.data));return a};class Li extends So{async request(e){const a=Ei(e,e.webFetchExtra),s=Ii(e.params,e.shouldEncodeUrlParams),r=s?`${e.url}?${s}`:e.url,o=await fetch(r,a),i=o.headers.get("content-type")||"";let{responseType:n="text"}=o.ok?e:{};i.includes("application/json")&&(n="json");let l,d;switch(n){case"arraybuffer":case"blob":d=await o.blob(),l=await Si(d);break;case"json":l=await o.json();break;case"document":case"text":default:l=await o.text()}const u={};return o.headers.forEach((c,p)=>{u[p]=c}),{data:l,headers:u,status:o.status,url:o.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}Ia("CapacitorHttp",{web:()=>new Li});const pe=Ia("PushNotifications",{}),Ci="modulepreload",Di=function(t){return"/"+t},Bs={},Pi=function(e,a,s){let r=Promise.resolve();if(a&&a.length>0){let l=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),n=i?.nonce||i?.getAttribute("nonce");r=l(a.map(d=>{if(d=Di(d),d in Bs)return;Bs[d]=!0;const u=d.endsWith(".css"),c=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${c}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":Ci,u||(p.as="script"),p.crossOrigin="",p.href=d,n&&p.setAttribute("nonce",n),document.head.appendChild(p),u)return new Promise((b,m)=>{p.addEventListener("load",b),p.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(i){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=i,window.dispatchEvent(n),!n.defaultPrevented)throw i}return r.then(i=>{for(const n of i||[])n.status==="rejected"&&o(n.reason);return e().catch(o)})},js=Ia("App",{web:()=>Pi(()=>import("./web-guK6Mt_l.js"),__vite__mapDeps([0,1,2,3,4])).then(t=>new t.AppWeb)}),Ti="BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY";let qs=!1;async function Mi(){if(window.Capacitor&&window.Capacitor.isNativePlatform()){try{await pe.removeAllListeners(),await pe.addListener("registration",async a=>{Io(a.value,!0)}),await pe.addListener("pushNotificationReceived",a=>{console.log("[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):",a)}),await pe.addListener("pushNotificationActionPerformed",a=>{const s=a.notification.data;console.log("Notificação clicada (Ação):",s)});let e=await pe.checkPermissions();e.receive==="prompt"&&(e=await pe.requestPermissions()),e.receive==="granted"&&await pe.register()}catch(e){console.error("[Push Nativo] Erro:",e)}return}"Notification"in window&&Notification.permission==="granted"&&$o()}async function Ai(){try{return await Notification.requestPermission()==="granted"?(console.log("Permissão concedida pelo utilizador."),await $o(),!0):(console.warn("Permissão de notificações negada."),!1)}catch(t){return console.error("Erro ao pedir permissão Web:",t),!1}}async function $o(){if("serviceWorker"in navigator)try{const t=await navigator.serviceWorker.register("/firebase-messaging-sw.js");await t.update();const e=await Yr(Ps,{vapidKey:Ti,serviceWorkerRegistration:t});e?(console.log("[Push Web] Token validado."),await Io(e,!1)):console.warn("[Push Web] Token veio vazio."),qs||(Xr(Ps,a=>{console.log("[Push Web] Recebido em Foreground (Silencioso):",a)}),qs=!0)}catch(t){console.error("[Push Web] Falha no registo:",t)}else console.warn("Navegador sem suporte a Service Worker.")}async function Io(t,e){const a=ye.currentUser;if(!a){console.warn("Usuário não logado. Token não salvo.");return}const s=Be(xe,"users",a.uid);try{const r=await us(s);if(r.exists()){const i=r.data().fcmTokens||[];if(i.length===1&&i[0]===t){console.log("Token já sincronizado e único. Nenhuma ação necessária.");return}}await Tt(s,{fcmTokens:[t],lastLoginAt:new Date().toISOString(),platform:e?"android_native":"pwa_web"}),console.log("Token atualizado (Sessão Única garantida).")}catch(r){if(r.code==="not-found")try{await _r(s,{email:a.email,fcmTokens:[t],platform:e?"android_native":"pwa_web",createdAt:new Date().toISOString()},{merge:!0}),console.log("Utilizador criado e token inicial salvo.")}catch(o){console.error("Erro ao criar user:",o)}else console.error("Erro ao atualizar token:",r)}}const Bi=(t,e,a="all",s="all")=>{const r=new URLSearchParams({startDate:t,endDate:e});return a&&a!=="all"&&r.append("professionalId",a),s&&s!=="all"&&r.append("costCenterId",s),L(`/api/reports/indicators?${r.toString()}`)},ji=(t,e="all")=>{const a=new URLSearchParams({date:t});return e&&e!=="all"&&a.append("professionalId",e),L(`/api/reports/appointments/list?${a.toString()}`)},qi=t=>t?L(`/api/financial/cost-centers/${t}`):Promise.resolve([]),Ni=(t,e,a)=>{const s=new URLSearchParams({startDate:e,endDate:a});return L(`/api/analytics/${t}?${s.toString()}`)},ca=({establishmentId:t,startDate:e,endDate:a,cashierSessionId:s})=>{const r=new URLSearchParams({startDate:e,endDate:a});return s&&s!=="all"&&r.append("cashierSessionId",s),t&&r.append("establishmentId",t),L(`/api/reports/sales?${r.toString()}`)},Fi=(t,e,a)=>L(`/api/analytics/${t}/monthly-details?year=${e}&month=${a}`),Ri=(t,e,a,s)=>{const r=`/api/analytics/${t}/daily-details?year=${e}&month=${a}&day=${s}`;return L(r)},Hi=(t,e,a,s)=>{const r=`/api/analytics/${t}/professional-details?year=${e}&month=${a}&professionalId=${s}`;return L(r)},Oi=(t,e,a,s)=>L(`/api/reports/commissions/${t}?year=${e}&month=${a}&professionalId=${s}`),Eo=()=>L("/api/reports/summary",{method:"GET"}),zi=Object.freeze(Object.defineProperty({__proto__:null,getAdvancedIndicators:Bi,getAnalytics:Ni,getCommissionReport:Oi,getCostCenters:qi,getDailyAppointments:ji,getDailyTransactions:Ri,getMonthlyAnalytics:Fi,getProfessionalMonthlyDetails:Hi,getSalesReport:ca,getSummaryKPIs:Eo},Symbol.toStringTag,{value:"Module"})),bs=t=>t?String(t).replace(/\D/g,""):"",ct=(t,e="",a=20,s={})=>{const r=new URLSearchParams;return e&&r.append("search",e),a&&r.append("limit",a),s&&s.hasLoyalty&&r.append("hasLoyalty","true"),s&&s.birthMonth&&r.append("birthMonth",s.birthMonth),s&&s.inactiveDays&&r.append("inactiveDays",s.inactiveDays),L(`/api/clients/${t}?${r.toString()}`)},Lo=(t,e)=>{const a=encodeURIComponent(e);return L(`/api/clients/details/${t}/${a}`)},Co=t=>{const e=t.phone||t.id;if(!e)throw new Error("Telefone é obrigatório");const a=bs(e),s={...t,phone:a,id:a};return L(`/api/clients/${a}`,{method:"PUT",body:JSON.stringify(s)})},Do=Co,Po=(t,e)=>Co({...e,id:t}),To=t=>{const e=encodeURIComponent(t);return L(`/api/clients/${e}`,{method:"DELETE"})},_i=(t,e,a,s)=>L("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:t,clientPhone:bs(e),points:a,rewardName:s})}),Vi=(t,e)=>Lo(t,bs(e)),Ea=t=>L(`/api/financial/natures/${t}`),Ui=t=>L("/api/financial/natures",{method:"POST",body:JSON.stringify(t)}),ms=t=>L(`/api/financial/cost-centers/${t}`),Wi=t=>L("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(t)}),Mo=(t,e)=>L(`/api/financial/${t}`,{method:"POST",body:JSON.stringify(e)}),Ao=(t,e={})=>{let a=`/api/financial/${t}`;const s=new URLSearchParams;e.establishmentId&&s.append("establishmentId",e.establishmentId),e.startDate&&s.append("startDate",e.startDate),e.endDate&&s.append("endDate",e.endDate),e.natureId&&s.append("natureId",e.natureId),e.costCenterId&&s.append("costCenterId",e.costCenterId),e.status&&s.append("status",e.status);const r=s.toString();return r&&(a+=`?${r}`),L(a)},Bo=(t,e,a)=>L(`/api/financial/${t}/${e}`,{method:"PUT",body:JSON.stringify(a)}),jo=(t,e)=>L(`/api/financial/${t}/${e}`,{method:"DELETE"}),qo=(t,e)=>{const a=e.map(s=>L(`/api/financial/${t}/${s}`,{method:"DELETE"}));return Promise.all(a)},No=(t,e,a)=>L(`/api/financial/${t}/${e}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),Fo=t=>Mo("payables",t),gs=t=>Ao("payables",t),Ji=(t,e)=>Bo("payables",t,e),Qi=t=>jo("payables",t),Gi=(t,e)=>No("payables",t,e),Yi=t=>Mo("receivables",t),La=t=>Ao("receivables",t),Xi=(t,e)=>Bo("receivables",t,e),Zi=t=>jo("receivables",t),Ki=(t,e)=>No("receivables",t,e);let Na=null;function ke(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${s}`}async function en(){const t=document.getElementById("content");t.innerHTML=`
        <div class="flex items-center justify-center h-full min-h-[60vh] font-sans">
            <div class="flex flex-col items-center">
                <div class="w-12 h-12 border-[3px] border-indigo-50 border-t-indigo-500 rounded-full animate-spin mb-4 shadow-sm"></div>
                <p class="text-slate-500 font-semibold text-sm tracking-wide animate-pulse">Sincronizando dados...</p>
            </div>
        </div>
    `;try{const e=new Date,a=new Date(e.getFullYear(),e.getMonth(),e.getDate()),s=new Date(a);s.setHours(23,59,59,999);const r=new Date(a.getFullYear(),a.getMonth(),1),o=new Date(a.getFullYear(),a.getMonth()+1,0),i=new Date(a);i.setDate(a.getDate()-6);const n=g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId],l=n.join(","),d=n.map(async q=>{const[ee,le]=await Promise.all([$a(q,r.toISOString(),s.toISOString(),null).catch(()=>[]),ct(q).catch(()=>[])]);return{appts:ee,clients:le}}),u=Promise.all([La({startDate:ke(r),endDate:ke(o),establishmentId:l}).catch(()=>({entries:[]})),gs({startDate:ke(r),endDate:ke(o),establishmentId:l}).catch(()=>({entries:[]}))]),[c,[p,b]]=await Promise.all([Promise.all(d),u]);let m=[],h=[];c.forEach(q=>{m=m.concat(q.appts),h=h.concat(q.clients)});const y=p.entries||[],k=b.entries||[],A=ke(a),P=y.filter(q=>q.status==="paid").reduce((q,ee)=>q+ee.amount,0),S=k.filter(q=>q.status==="paid").reduce((q,ee)=>q+ee.amount,0),I=P-S,N=y.filter(q=>q.status==="paid"&&(q.paymentDate===A||!q.paymentDate&&q.dueDate.startsWith(A))).reduce((q,ee)=>q+ee.amount,0),U=m.filter(q=>{const ee=new Date(q.startTime);return ee>=a&&ee<=s}),C=U.length,D=m.filter(q=>q.status==="completed"),V=D.length>0?P/D.length:0,T=U.filter(q=>new Date(q.startTime).getTime()>=e.getTime()&&q.status!=="completed"&&q.status!=="cancelled").sort((q,ee)=>new Date(q.startTime)-new Date(ee.startTime)).slice(0,4).map(q=>({client:q.clientName||"Desconhecido",service:q.serviceName||(q.services&&q.services[0]?q.services[0].name:"Serviço"),time:new Date(q.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),prof:(q.professionalName||"").split(" ")[0]||"Profissionais",id:q.id})),M=`${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}`,R=new Map;h.forEach(q=>{q.phone?R.set(q.phone,q):R.set(q.id||Math.random().toString(),q)});const te=Array.from(R.values()).filter(q=>{if(!q.birthDate)return!1;let ee,le;if(q.birthDate.includes("-")){const W=q.birthDate.split("-");W[0].length===4?(ee=W[1],le=W[2]):(le=W[0],ee=W[1])}else if(q.birthDate.includes("/")){const W=q.birthDate.split("/");le=W[0],ee=W[1]}return`${le}/${ee}`===M}).map(q=>{let ee="";return q.birthDate&&q.birthDate.includes("-")&&q.birthDate.split("-")[0].length===4&&(ee=a.getFullYear()-parseInt(q.birthDate.split("-")[0])),{name:q.name,age:ee,phone:q.phone}}),ie={receitaHoje:N,agendamentosHoje:C,receitaMes:P,despesaMes:S,saldoMes:I,ticketMedio:V},Z=n.length>1;tn(t,ie,T,te,Z,ke(i),ke(a)),await Ro(i,a),sn()}catch(e){console.error("Erro ao carregar dashboard:",e),t.innerHTML=`
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
    `}async function Ro(t,e){const a=document.getElementById("chart-container"),s=document.getElementById("chart-start-date"),r=document.getElementById("chart-end-date");if(a){const o=document.createElement("div");o.id="chart-loading-overlay",o.className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-xl",o.innerHTML='<div class="w-8 h-8 border-[3px] border-indigo-100 border-t-indigo-500 rounded-full animate-spin"></div>',a.appendChild(o)}try{const o=ke(t),i=ke(e),n=g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId],l=n.join(","),d=await La({startDate:o,endDate:i,establishmentId:l}).catch(()=>({entries:[]})),u=n.map(P=>$a(P,o+"T00:00:00.000Z",i+"T23:59:59.999Z",null).catch(()=>[])),p=(await Promise.all(u)).flat(),b=d.entries||[],m=[],h=[],y=[];let k=new Date(t);k.setHours(0,0,0,0);const A=new Date(e);for(A.setHours(23,59,59,999);k<=A;){const P=ke(k);m.push(k.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}));const S=b.filter(N=>N.status==="paid"&&(N.paymentDate===P||!N.paymentDate&&N.dueDate.startsWith(P))).reduce((N,U)=>N+U.amount,0),I=p.filter(N=>N.status==="completed"&&N.startTime&&N.startTime.startsWith(P)).length;h.push(S),y.push(I),k.setDate(k.getDate()+1)}an(m,h,y),s&&(s.value=o),r&&(r.value=i)}catch(o){console.error("Erro ao recarregar grafico:",o)}finally{const o=document.getElementById("chart-loading-overlay");o&&o.remove()}}function an(t,e,a){const s=document.getElementById("revenueChart");if(!s)return;Na&&Na.destroy();const o=s.getContext("2d").createLinearGradient(0,0,0,240);o.addColorStop(0,"rgba(99, 102, 241, 0.2)"),o.addColorStop(1,"rgba(99, 102, 241, 0.0)"),Na=new Chart(s,{type:"line",data:{labels:t,datasets:[{label:"Receita Real (R$)",data:e,borderColor:"#6366f1",backgroundColor:o,borderWidth:2,pointBackgroundColor:"#ffffff",pointBorderColor:"#6366f1",pointBorderWidth:2,pointRadius:3,pointHoverRadius:5,fill:!0,tension:.3,yAxisID:"y"},{label:"Agendamentos Feitos",data:a,borderColor:"#10b981",backgroundColor:"transparent",borderWidth:2,borderDash:[5,5],pointBackgroundColor:"#10b981",pointBorderColor:"#ffffff",pointBorderWidth:1,pointRadius:3,pointHoverRadius:5,fill:!1,tension:.3,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0,position:"top",align:"end",labels:{usePointStyle:!0,boxWidth:6,boxHeight:6,font:{family:"Nunito, sans-serif",size:10,weight:"bold"},color:"#64748b"}},tooltip:{backgroundColor:"#1e293b",padding:10,cornerRadius:8,titleFont:{size:11,family:"Nunito, sans-serif",weight:"normal"},bodyFont:{size:12,weight:"bold",family:"Nunito, sans-serif"},displayColors:!0,usePointStyle:!0,callbacks:{label:function(i){return i.datasetIndex===0?"Receita: "+new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(i.parsed.y):"Concluídos: "+i.parsed.y}}}},scales:{y:{type:"linear",display:!0,position:"left",beginAtZero:!0,grid:{color:"#f8fafc",drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Nunito, sans-serif",size:9,weight:"600"},maxTicksLimit:6,callback:function(i){return"R$ "+i}}},y1:{type:"linear",display:!0,position:"right",beginAtZero:!0,grid:{drawOnChartArea:!1},border:{display:!1},ticks:{color:"#10b981",font:{family:"Nunito, sans-serif",size:9,weight:"600"},stepSize:1,callback:function(i){if(Math.floor(i)===i)return i}}},x:{grid:{display:!1,drawBorder:!1},border:{display:!1},ticks:{color:"#94a3b8",font:{family:"Nunito, sans-serif",size:9,weight:"600"}}}},interaction:{intersect:!1,mode:"index"}}})}function sn(){document.getElementById("content").addEventListener("click",e=>{if(e.target.closest("#btn-update-chart")){const o=document.getElementById("chart-start-date"),i=document.getElementById("chart-end-date");if(o&&i&&o.value&&i.value){const n=new Date(o.value+"T00:00:00"),l=new Date(i.value+"T00:00:00");Ro(n,l)}return}const s=e.target.closest("[data-action]");if(!s)return;switch(s.dataset.action){case"goto-agenda":case"new-appointment":oe("agenda-section");break;case"goto-pdv":oe("comandas-section");break;case"goto-clients":oe("clientes-section");break;case"open-link":const o=`${window.location.origin}/cliente.html?id=${g.establishmentId||""}`;window.open(o,"_blank");break}})}const ut=t=>L(`/api/services/${t}`),on=t=>L("/api/services",{method:"POST",body:JSON.stringify(t)}),rn=(t,e)=>L(`/api/services/${t}`,{method:"PUT",body:JSON.stringify(e)}),Ho=t=>L(`/api/services/${t}`,{method:"DELETE"}),Ca=(t,e,a,s="all")=>{const r=`/api/blockages/${t}?startDate=${e}&endDate=${a}&professionalId=${s}`;return L(r)},Da=t=>L("/api/blockages",{method:"POST",body:JSON.stringify(t)}),fs=t=>L(`/api/blockages/${t}`,{method:"DELETE"}),Oo=t=>L("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:t})}),Ns=document.getElementById("content");let Fs=!1;const ua=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5",light:"#c7d2fe"},{bg:"#d1fae5",border:"#059669",main:"#059669",light:"#a7f3d0"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48",light:"#fecdd3"},{bg:"#fef3c7",border:"#d97706",main:"#d97706",light:"#fde68a"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490",light:"#a5f3fc"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7",light:"#bae6fd"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed",light:"#ddd6fe"},{bg:"#fce7f3",border:"#db2777",main:"#db2777",light:"#fbcfe8"}];let Pa=[],Wa=[],pa={},zo=[],O={currentView:window.innerWidth<768?"list":"week",currentDate:new Date,selectedProfessionalId:"all",showInactiveProfs:!1,isSelectionMode:!1,selectedItems:new Set},H={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,originalDate:null,originalTime:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function _o(t){const e=new Date(t),a=e.getDay(),s=e.getDate()-a+(a===0?-6:1);return e.setDate(s),e.setHours(0,0,0,0),e}function aa(t){const e=t||new Date,a=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${a}-${s}-${r}`}function xs(){const t=document.getElementById("profSelectorContainer");if(!t||!g.professionals)return;let e=g.professionals.filter(r=>O.showInactiveProfs||r.status!=="inactive");const s=[...[{id:"all",name:"Todos",photo:null}],...e];t.innerHTML=s.map(r=>{const o=O.selectedProfessionalId===r.id,i=r.name==="Todos"?"T":r.name.charAt(0).toUpperCase(),n=r.id!=="all"?g.professionalColors.get(r.id)||ua[0]:{main:"#adb5bd",light:"#f1f3f5"};return`
            <div class="flex items-center gap-2 px-4 py-1.5 rounded-full whitespace-nowrap cursor-pointer transition-transform active:scale-95 border ${o?"border-transparent shadow-sm":"border-gray-200 bg-white hover:bg-gray-50"}"
                 data-action="select-professional" data-prof-id="${r.id}"
                 style="background-color: ${o?n.light:""}; border-color: ${o?n.main:""}; color: ${o?n.main:"#4b5563"};">
                <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0" 
                     style="background-color: ${n.main}; ${r.photo?`background-image: url('${Y(r.photo)}'); background-size: cover; background-position: center;`:""}">
                    ${r.photo?"":i}
                </div>
                <span class="text-sm font-semibold tracking-tight">${Y(r.name==="Todos"?"Todos":r.name.split(" ")[0])}</span>
            </div>`}).join("")}function nn(){const t=document.getElementById("calendarStripContainer");if(!t||O.currentView!=="list")return;const e=new Date;e.setHours(0,0,0,0);const a=new Date(O.currentDate);a.setHours(0,0,0,0);let s="";const r=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];for(let o=-7;o<=14;o++){const i=new Date(a);i.setDate(a.getDate()+o),i.setHours(0,0,0,0);const n=i.getTime()===a.getTime(),l=i.getTime()===e.getTime(),d=r[i.getDay()],u=i.getDate(),c=n?"bg-indigo-600 text-white shadow-md":l?"bg-indigo-50 text-indigo-700 border border-indigo-100":"bg-gray-50 text-gray-500 border border-transparent",p=n?"text-white":l?"text-indigo-700":"text-gray-900";s+=`
            <div class="flex flex-col items-center justify-center min-w-[3.5rem] py-2 rounded-xl ${c} cursor-pointer transition-transform active:scale-90 flex-shrink-0" data-action="select-date" data-date="${i.toISOString()}">
                <span class="text-[0.65rem] uppercase font-bold tracking-wider opacity-80 pointer-events-none">${d}</span>
                <span class="text-lg font-bold ${p} pointer-events-none mt-0.5">${u}</span>
                ${l&&!n?'<div class="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 pointer-events-none"></div>':'<div class="w-1.5 h-1.5 mt-1 opacity-0"></div>'}
            </div>
        `}t.innerHTML=s,t.querySelectorAll('[data-action="select-date"]').forEach(o=>{o.addEventListener("click",()=>{const i=new Date(o.dataset.date);O.currentDate=i,navigator.vibrate&&navigator.vibrate(30),Ce()})}),requestAnimationFrame(()=>{const o=t.querySelector(".bg-indigo-600");o&&o.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})})}function Y(t){return v(t||"")}function ln(t,e,a,s,r){const o=(t||"").replace(/\D/g,""),i=new Date(r).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),n=new Date(r).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=`Olá, ${e}! Você tem um agendamento de ${a} com ${s} para ${i} às ${n}. Podemos confirmar?`;return`https://wa.me/${o}?text=${encodeURIComponent(l)}`}function dn(t){const e=document.getElementById("agenda-view");if(!e)return;const a=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],s=_o(O.currentDate),r=new Date;r.setHours(0,0,0,0);let o='<div class="week-container flex gap-2 overflow-x-auto hide-scrollbar px-4" id="weekScroller">';for(let i=0;i<7;i++){const n=new Date(s);n.setDate(s.getDate()+i);const l=n.toDateString()===r.toDateString(),d=t.filter(c=>new Date(c.startTime).toDateString()===n.toDateString()).sort((c,p)=>new Date(c.startTime)-new Date(p.startTime));let u="";d.length===0?u='<div class="week-empty text-xs text-gray-400 text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200"><i class="bi bi-dash-lg block text-lg mb-1"></i>Livre</div>':u=d.map(c=>{const b=new Date(c.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),m=g.professionalColors.get(c.professionalId)||{main:"#adb5bd"},h=c.status==="completed",y=O.selectedItems.has(c.id);if(c.type==="blockage")return`<div class="week-event-chip bg-red-50 border-l-4 border-red-500 rounded-md p-2 mb-2">
                        <div class="text-xs font-bold text-red-700 flex items-center"><i class="bi bi-lock mr-1"></i>${b}</div>
                        <div class="text-xs text-gray-800 font-semibold mt-1">${Y(c.reason)}</div>
                        <div class="text-[0.65rem] text-gray-500">${Y(c.professionalName)}</div>
                    </div>`;const k=JSON.stringify(c).replace(/'/g,"&apos;"),A=y?"ring-2 ring-indigo-500 bg-indigo-50":"bg-white",P=O.isSelectionMode?`<div class="absolute top-1 right-1 z-10">
                           <input type="checkbox" class="w-4 h-4 accent-indigo-600 pointer-events-none" ${y?"checked":""}>
                       </div>`:"";return`<div class="week-event-chip relative shadow-sm border-l-4 rounded-md p-2 mb-2 cursor-pointer transition-transform active:scale-95 ${h?"opacity-60":""} ${A}" style="border-left-color: ${m.main};"
                    data-action="edit-appointment" data-appointment='${k}'>
                    ${P}
                    <div class="text-xs font-bold text-gray-900">${b}</div>
                    <div class="text-xs text-gray-800 font-semibold mt-0.5 truncate pr-2">${Y(c.clientName)}</div>
                    <div class="text-[0.65rem] text-gray-500 leading-tight mt-0.5">${Y(c.serviceName)} <br/> <span class="font-medium text-indigo-600">${Y((c.professionalName||"").split(" ")[0])}</span></div>
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
            </div>`;return}let a='<div class="list-container px-4 py-2 space-y-4">';t.forEach(s=>{const r=new Date(s.startTime),o=new Date(s.endTime),i=Math.round((o-r)/6e4),n=r.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),l=g.professionalColors.get(s.professionalId)||{main:"#adb5bd"},d=s.status==="completed",u=JSON.stringify(s).replace(/'/g,"&apos;"),c=O.selectedItems.has(s.id),p=O.isSelectionMode?`<div class="flex items-center justify-center pr-3 border-r border-gray-100 mr-3">
                   <input type="checkbox" class="w-5 h-5 accent-indigo-600 pointer-events-none" ${c?"checked":""}>
               </div>`:"",b=c?"ring-2 ring-indigo-500 bg-indigo-50":"bg-white";if(s.type==="blockage"){a+=`<div class="list-card flex bg-red-50 rounded-2xl p-4 shadow-sm border border-red-100 mb-3 cursor-pointer">
                ${p}
                <div class="flex flex-col items-center justify-center border-r border-red-200 pr-4 min-w-[4.5rem]">
                    <span class="text-lg font-bold text-red-700">${n}</span>
                    <span class="text-xs text-red-500 font-semibold"><i class="bi bi-lock-fill"></i> Bloqueio</span>
                </div>
                <div class="flex-1 pl-4 flex flex-col justify-center">
                    <h3 class="font-bold text-red-800 text-sm">${Y(s.reason)}</h3>
                    <p class="text-xs text-red-600 mt-1 font-medium">${Y(s.professionalName)}</p>
                </div>
            </div>`;return}const m=ln(s.clientPhone,s.clientName,s.serviceName,s.professionalName,s.startTime),h=(s.services||[]).reduce((A,P)=>A+(Number(P.price)||0),0)||Number(s.totalPrice||0)||Number(s.servicePrice||0),y=s.paymentStatus||(s.status==="completed"?"Finalizado":"Agendado"),k=Y((s.professionalName||"").split(" ")[0]);a+=`<div class="list-card flex rounded-2xl p-3.5 shadow-sm border border-gray-100 cursor-pointer transition-transform active:scale-95 ${b} ${d?"opacity-70 bg-gray-50":""}"
            style="border-left: 5px solid ${l.main};"
            data-action="edit-appointment" data-appointment='${u}'>
            
            ${p}
            
            <div class="flex flex-col items-center justify-center border-r border-gray-100 pr-3.5 min-w-[4.5rem]">
                <span class="text-lg font-bold text-gray-900 ${d?"line-through text-gray-500":""}">${n}</span>
                <span class="text-xs text-gray-500 font-medium">${i} min</span>
            </div>
            
            <div class="flex-1 pl-3.5 flex flex-col justify-center min-w-0">
                <h3 class="font-bold text-gray-900 text-[0.95rem] truncate">${Y(s.clientName)}</h3>
                <p class="text-xs text-gray-600 mt-0.5 truncate">${Y(s.serviceName)} <span class="font-bold text-indigo-600 px-1">·</span> ${k}</p>
                
                <div class="flex flex-wrap gap-1.5 mt-2.5">
                    <span class="text-[0.65rem] bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200 font-bold">R$ ${h.toFixed(2).replace(".",",")}</span>
                    ${s.clientPhone?`<span class="text-[0.65rem] bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200 font-bold flex items-center gap-1"><i class="bi bi-telephone-fill opacity-70"></i> ${Y(s.clientPhone)}</span>`:""}
                    <span class="text-[0.65rem] px-2 py-0.5 rounded border font-bold ${d?"bg-green-50 text-green-700 border-green-200":"bg-amber-50 text-amber-700 border-amber-200"}">${Y(y)}</span>
                </div>
            </div>

            ${!d&&!O.isSelectionMode?`
            <div class="flex flex-col justify-center items-end pl-2 gap-2 border-l border-gray-50">
                <button class="lc-action-btn wa w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors" data-link="${m}" title="WhatsApp">
                    <i class="bi bi-whatsapp"></i>
                </button>
                <button class="lc-action-btn comanda w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors" data-action="open-comanda" data-appointment='${u}' title="Comanda">
                    <i class="bi bi-receipt-cutoff"></i>
                </button>
            </div>`:""}
        </div>`}),a+="</div>",e.innerHTML=a}function Vo(){const t=g.allEvents.filter(e=>O.selectedProfessionalId==="all"||e.professionalId===O.selectedProfessionalId);O.currentView==="list"?cn(t):dn(t),hs()}function hs(){const t=document.getElementById("batch-delete-container"),e=document.getElementById("agendaFab");t&&(O.isSelectionMode&&O.selectedItems.size>0?(t.innerHTML=`<div class="bg-gray-900 text-white p-3 mx-4 rounded-2xl shadow-xl flex items-center justify-between">
            <span class="font-semibold text-sm flex items-center"><span class="bg-indigo-500 text-white w-6 h-6 flex items-center justify-center rounded-full mr-2 text-xs">${O.selectedItems.size}</span> selecionados</span>
            <button data-action="batch-delete" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors">
                <i class="bi bi-trash3-fill"></i> Apagar
            </button>
        </div>`,t.style.display="block",e&&(e.style.transform="scale(0)")):(t.style.display="none",e&&(e.style.transform="scale(1)")))}function un(){const t=document.getElementById("currentMonthYearDisplay");if(t){const a=new Date(O.currentDate).toLocaleDateString("pt-BR",{month:"long",year:"numeric"});t.textContent=a.charAt(0).toUpperCase()+a.slice(1)}if(O.currentView==="list"){nn();const e=document.getElementById("calendarStripContainer");e&&(e.style.display="flex")}else{const e=document.getElementById("calendarStripContainer");e&&(e.style.display="none")}}async function Ce(){const t=document.getElementById("agenda-view");if(!t)return;O.selectedItems.clear(),hs(),t.innerHTML='<div class="flex items-center justify-center h-40"><div class="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>',un();let e,a;if(O.currentView==="list")e=new Date(O.currentDate),e.setHours(0,0,0,0),a=new Date(e),a.setHours(23,59,59,999);else{const s=_o(O.currentDate);e=new Date(s),a=new Date(s),a.setDate(s.getDate()+6),a.setHours(23,59,59,999)}try{const r=(g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId]).map(async d=>{const[u,c]=await Promise.all([$a(d,e.toISOString(),a.toISOString(),O.selectedProfessionalId==="all"?null:O.selectedProfessionalId),Ca(d,e.toISOString(),a.toISOString(),O.selectedProfessionalId)]);return{appts:u||[],blockages:c||[]}}),o=await Promise.all(r);let i=[],n=[];if(o.forEach(d=>{i=i.concat(d.appts),n=n.concat(d.blockages)}),!document.getElementById("agenda-view"))return;const l=d=>d.map(u=>({...u,type:u.type||"appointment",professionalName:u.professionalName||(()=>{const c=g.professionals?.find(p=>p.id===u.professionalId);return c?c.name:"Indefinido"})()}));g.allEvents=[...l(i),...l(n)],xs(),Vo()}catch{document.getElementById("agenda-view")&&(document.getElementById("agenda-view").innerHTML=`
                <div class="text-center py-12 text-gray-500">
                    <i class="bi bi-exclamation-triangle text-3xl mb-2"></i>
                    <p class="text-sm font-medium">Erro ao carregar a agenda.</p>
                </div>`)}}async function pn(){try{const e=(g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId]).map(async i=>{const[n,l,d]=await Promise.all([Ee(i),ut(i),je(i)]);return{profs:n||[],services:l||[],estDetails:d}}),a=await Promise.all(e),s=new Map,r=new Map;let o=a[0]?.estDetails;a.forEach(i=>{i.profs.forEach(n=>s.set(n.id,n)),i.services.forEach(n=>r.set(n.id,n))}),g.professionals=Array.from(s.values()),g.services=Array.from(r.values()),zo=[],o&&(pa=o.loyaltyProgram||{enabled:!1}),g.professionals.forEach((i,n)=>{g.professionalColors.set(i.id,ua[n%ua.length])}),xs()}catch{f("Atenção","Não foi possível carregar os dados da equipe.","error")}}async function Uo(t={}){O.currentDate=t.targetDate?new Date(t.targetDate):O.currentDate||new Date,O.isSelectionMode=!1,O.selectedItems.clear(),Ns.innerHTML=`
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
                            <button class="${O.currentView==="list"?"bg-white shadow-sm":"text-gray-500"} rounded-lg px-3 py-1 text-xs font-bold transition-all" data-action="setView" data-view="list">Lista</button>
                            <button class="${O.currentView==="week"?"bg-white shadow-sm":"text-gray-500"} rounded-lg px-3 py-1 text-xs font-bold transition-all" data-action="setView" data-view="week">Semana</button>
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
        </div>`,document.getElementById("btnTodayHeader").addEventListener("click",()=>{O.currentDate=new Date,navigator.vibrate&&navigator.vibrate(30),Ce()}),document.getElementById("btnPrevDate").addEventListener("click",()=>{const a=O.currentView==="week"?7:1;O.currentDate.setDate(O.currentDate.getDate()-a),navigator.vibrate&&navigator.vibrate(20),Ce()}),document.getElementById("btnNextDate").addEventListener("click",()=>{const a=O.currentView==="week"?7:1;O.currentDate.setDate(O.currentDate.getDate()+a),navigator.vibrate&&navigator.vibrate(20),Ce()});const e=document.querySelectorAll(".agenda-view-toggle button");e.forEach(a=>{a.addEventListener("click",()=>{e.forEach(s=>{s.classList.remove("bg-white","shadow-sm"),s.classList.add("text-gray-500")}),a.classList.add("bg-white","shadow-sm"),a.classList.remove("text-gray-500"),O.currentView=a.dataset.view,navigator.vibrate&&navigator.vibrate(20),Ce()})}),document.getElementById("btnWeekDays").addEventListener("click",bn),Fs||(Ns.addEventListener("click",async a=>{const s=a.target.closest('[data-action="open-comanda"]');if(s){a.stopPropagation(),navigator.vibrate&&navigator.vibrate(20);const l=s.dataset.appointment||s.closest("[data-appointment]")?.dataset.appointment;if(!l)return;const d=JSON.parse(l.replace(/&apos;/g,"'")),u=d.status==="completed"?"finalizadas":"em-atendimento",c={selectedAppointmentId:d.id,initialFilter:u};u==="finalizadas"&&d.transaction?.paidAt&&(c.filterDate=typeof d.transaction.paidAt=="object"?new Date(d.transaction.paidAt._seconds*1e3):d.transaction.paidAt),oe("comandas-section",c);return}const r=a.target.closest(".lc-action-btn.wa");if(r){a.stopPropagation(),navigator.vibrate&&navigator.vibrate(20),r.dataset.link&&window.open(r.dataset.link,"_blank");return}if(a.target.closest('[data-action="batch-delete"]')){const l=O.selectedItems.size;await Q("Apagar Selecionados",`Deseja apagar ${l} registro(s)? Esta ação é irreversível.`)&&(await Promise.all(Array.from(O.selectedItems).map(async u=>{try{await si(u)}catch{}})),f(`${l} registro(s) apagado(s).`,"success"),O.selectedItems.clear(),O.isSelectionMode=!1,Ce());return}const o=a.target.closest('[data-action="select-professional"]');if(o){navigator.vibrate&&navigator.vibrate(20);const l=o.dataset.profId;O.selectedProfessionalId=O.selectedProfessionalId===l&&l!=="all"?"all":l,Ce();return}const i=a.target.closest(".list-card[data-appointment], .week-event-chip[data-appointment]");if(i){if(O.isSelectionMode){a.stopPropagation();const d=i.querySelector('input[type="checkbox"]');if(d){const u=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'")),c=!d.checked;d.checked=c,c?O.selectedItems.add(u.id):O.selectedItems.delete(u.id),(i.classList.contains("week-event-chip")||i.classList.contains("list-card"))&&(c?(i.classList.add("ring-2","ring-indigo-500","bg-indigo-50"),i.classList.remove("bg-white")):(i.classList.remove("ring-2","ring-indigo-500","bg-indigo-50"),i.classList.add("bg-white"))),navigator.vibrate&&navigator.vibrate(15),hs()}return}const l=JSON.parse(i.dataset.appointment.replace(/&apos;/g,"'"));navigator.vibrate&&navigator.vibrate(20),Ja(l);return}if(a.target.closest('[data-action="new-appointment"]')){navigator.vibrate&&navigator.vibrate(30),Ja();return}}),Fs=!0),await pn(),await Ce()}function bn(){const t=document.getElementById("optionsSheet");if(t){t.remove();return}const e=document.createElement("div");e.id="optionsSheet",e.className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white rounded-t-3xl z-[10000] shadow-[0_-8px_40px_rgba(0,0,0,0.15)] transition-transform duration-300 translate-y-full";const a=O.isSelectionMode?"bg-red-50 text-red-600":"bg-green-50 text-green-700",s=O.isSelectionMode?"bi-x-circle":"bi-check2-square";e.innerHTML=`
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
                    <i class="bi ${s} text-lg"></i> ${O.isSelectionMode?"Desativar Modo de Exclusão":"Ativar Seleção Múltipla"}
                </button>
                <p class="text-xs text-gray-500 text-center mt-2.5">${O.isSelectionMode?"Toque num cartão para desmarcar.":"Permite selecionar vários registros para apagar."}</p>
            </div>

            <div class="mb-4">
                <div class="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Equipe</div>
                <label class="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer">
                    <input type="checkbox" id="optInactiveToggle" class="w-5 h-5 accent-indigo-600 rounded" ${O.showInactiveProfs?"checked":""}>
                    <span class="text-sm font-semibold text-gray-700">Exibir profissionais inativos na barra</span>
                </label>
            </div>
        </div>`;const r=document.createElement("div");r.id="optionsOverlay",r.className="fixed inset-0 bg-black/40 z-[9999] opacity-0 transition-opacity duration-300",document.body.appendChild(r),document.body.appendChild(e),requestAnimationFrame(()=>{e.classList.remove("translate-y-full"),r.classList.remove("opacity-0")});const o=()=>{e.classList.add("translate-y-full"),r.classList.add("opacity-0"),setTimeout(()=>{e.remove(),r.remove()},300)};document.getElementById("closeOptSheet").addEventListener("click",o),r.addEventListener("click",o),document.getElementById("optSelectMode").addEventListener("click",()=>{O.isSelectionMode=!O.isSelectionMode,O.isSelectionMode||O.selectedItems.clear(),o(),Vo()}),document.getElementById("optInactiveToggle").addEventListener("change",i=>{O.showInactiveProfs=i.target.checked,xs()})}function ft(t){t<1||t>4||(H.step=t,Ja(null,!0))}function mn(t){return{title:t?"Editar Reserva":"Novo Cliente",content:`
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
                ${Pa.map(t=>`<div class="service-card p-3 bg-white rounded-xl border-2 transition-all active:scale-95 ${H.data.selectedServiceIds.includes(t.id)?"border-indigo-500 bg-indigo-50 shadow-md":"border-gray-100 hover:border-gray-200 shadow-sm"} cursor-pointer flex flex-col justify-between gap-2" data-service-id="${t.id}">
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
        </div>`}}function fn(){return{title:"Equipe",content:`
        <div class="p-4 space-y-4 flex-1 flex flex-col">
            <div class="relative">
                <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base"></i>
                <input type="search" id="professionalSearchModalInput" placeholder="Procurar profissional..." class="w-full p-3 pl-11 bg-gray-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 outline-none">
            </div>
            <div id="apptProfessionalContainer" class="flex-1 overflow-y-auto grid grid-cols-3 gap-3 content-start pb-4">
                ${Wa.map(t=>{const e=H.data.professionalId===t.id,a=g.professionalColors.get(t.id)||ua[0];return`<div class="professional-modal-card p-3 bg-white rounded-2xl border-2 transition-all active:scale-95 ${e?"border-indigo-500 bg-indigo-50 shadow-md":"border-gray-100 hover:border-gray-200 shadow-sm"} cursor-pointer text-center flex flex-col items-center justify-center" data-professional-id="${t.id}">
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
        </div>`}}function xn(){const t=H.data.date||aa();return{title:"Horário",content:`
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
                <i class="bi bi-check-circle-fill"></i> ${H.data.id?"Salvar":"Confirmar"}
            </button>
        </div>`}}async function Ja(t=null,e=!1){const a=document.getElementById("appointmentModal");e||(H={step:1,data:{id:t?.id||null,clientName:t?.clientName||"",clientPhone:t?.clientPhone||"",selectedServiceIds:t?.services?.map(i=>i.id)||[],professionalId:t?.professionalId||null,professionalName:t?.professionalName||"",date:t?.startTime?aa(new Date(t.startTime)):aa(),time:t?.startTime?new Date(t.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null,originalDate:t?.startTime?aa(new Date(t.startTime)):null,originalTime:t?.startTime?new Date(t.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null,redeemedReward:t?.redeemedReward||null,clientHasRewards:t?.hasRewards||!1,clientLoyaltyPoints:0}}),Pa=g.services||[],Wa=(g.professionals||[]).filter(i=>i.status==="active");let s;switch(H.step){case 1:s=mn(t);break;case 2:s=gn();break;case 3:s=fn();break;case 4:s=xn();break}a.className="fixed inset-0 z-[10000] hidden flex items-end md:items-center justify-center bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 opacity-0",a.innerHTML=`
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
    `;const r=()=>{const i=a.querySelector("#appointmentModalContent");i&&(i.classList.remove("translate-y-0","md:translate-y-0","md:scale-100"),i.classList.add("translate-y-full","md:translate-y-8","md:scale-95")),a.classList.add("opacity-0"),setTimeout(()=>{a.classList.add("hidden")},300)};a.querySelectorAll('[data-action="next-step"]').forEach(i=>i.addEventListener("click",()=>{const n=parseInt(i.dataset.currentStep,10);if(n===1&&(H.data.clientName=a.querySelector("#apptClientName").value.trim(),H.data.clientPhone=a.querySelector("#apptClientPhone").value.trim(),!H.data.clientName))return f("Preencha o nome do cliente.","warning");if(n===2&&H.data.selectedServiceIds.length===0)return f("Selecione um serviço.","warning");if(n===3&&!H.data.professionalId)return f("Escolha um membro da equipe.","warning");ft(n+1)})),a.querySelectorAll('[data-action="prev-step"]').forEach(i=>i.addEventListener("click",()=>ft(parseInt(i.dataset.currentStep,10)-1))),a.querySelectorAll('[data-action="close-modal"]').forEach(i=>{i.addEventListener("click",r)}),a.classList.remove("hidden"),a.offsetWidth,a.classList.remove("opacity-0");const o=a.querySelector("#appointmentModalContent");o&&(o.classList.remove("translate-y-full","md:translate-y-8","md:scale-95"),o.classList.add("translate-y-0","md:translate-y-0","md:scale-100")),H.step===2&&a.querySelectorAll(".service-card").forEach(i=>i.addEventListener("click",()=>{const n=a.querySelector("#multiServiceToggle")?.checked,l=i.classList.contains("bg-indigo-50"),d=i.dataset.serviceId;navigator.vibrate&&navigator.vibrate(15),n?l?(i.classList.remove("border-indigo-500","bg-indigo-50","shadow-md"),i.classList.add("border-gray-100","shadow-sm"),H.data.selectedServiceIds=H.data.selectedServiceIds.filter(u=>u!==d)):(i.classList.add("border-indigo-500","bg-indigo-50","shadow-md"),i.classList.remove("border-gray-100","shadow-sm"),H.data.selectedServiceIds.includes(d)||H.data.selectedServiceIds.push(d)):(a.querySelectorAll(".service-card.bg-indigo-50").forEach(u=>{u.classList.remove("border-indigo-500","bg-indigo-50","shadow-md"),u.classList.add("border-gray-100","shadow-sm")}),i.classList.add("border-indigo-500","bg-indigo-50","shadow-md"),i.classList.remove("border-gray-100","shadow-sm"),H.data.selectedServiceIds=[d],setTimeout(()=>ft(3),250))})),H.step===3&&a.querySelectorAll(".professional-modal-card").forEach(i=>i.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15),a.querySelectorAll(".professional-modal-card.bg-indigo-50").forEach(l=>{l.classList.remove("border-indigo-500","bg-indigo-50","shadow-md"),l.classList.add("border-gray-100","shadow-sm")}),i.classList.add("border-indigo-500","bg-indigo-50","shadow-md"),i.classList.remove("border-gray-100","shadow-sm"),H.data.professionalId=i.dataset.professionalId;const n=Wa.find(l=>l.id===i.dataset.professionalId);H.data.professionalName=n?n.name:"",setTimeout(()=>ft(4),250)})),H.step===1&&a.querySelector("#clientSearchInput")?.addEventListener("input",i=>yn(i.target.value)),H.step===4&&(a.querySelector("#apptDate")?.addEventListener("change",Rs),a.querySelector("#availableTimesContainer")?.addEventListener("click",i=>{const n=i.target.closest("button[data-time-slot]");n&&(navigator.vibrate&&navigator.vibrate(10),a.querySelectorAll("#availableTimesContainer button").forEach(l=>{l.classList.remove("bg-indigo-600","text-white","border-indigo-600","shadow-md"),l.classList.add("bg-white","text-gray-700","border-gray-200","shadow-sm")}),n.classList.add("bg-indigo-600","text-white","border-indigo-600","shadow-md"),n.classList.remove("bg-white","text-gray-700","border-gray-200","shadow-sm"),H.data.time=n.dataset.timeSlot)}),a.querySelector("#btnSubmitAppointment")?.addEventListener("click",hn),Rs(),vn())}async function hn(t){t.preventDefault();const e=document.getElementById("btnSubmitAppointment");if(!H.data.time||!H.data.selectedServiceIds.length||!H.data.professionalId)return f("Selecione horário, serviço e profissional.","warning");e.disabled=!0,e.innerHTML='<i class="bi bi-hourglass-split"></i> Processando...';const a=H.data.selectedServiceIds.map(u=>{const c=Pa.find(p=>p.id===u);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[s,r]=H.data.time.split(":"),o=new Date(`${H.data.date}T${s}:${r}:00`),i=a.reduce((u,c)=>u+(c.duration+(c.bufferTime||0)),0),n=new Date(o.getTime()+i*6e4),d={establishmentId:g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments[0]:g.establishmentId,clientName:H.data.clientName,clientPhone:H.data.clientPhone,services:a,professionalId:H.data.professionalId,professionalName:H.data.professionalName,startTime:o.toISOString(),endTime:n.toISOString(),redeemedReward:H.data.redeemedReward};H.data.id&&(d.id=H.data.id);try{H.data.id?await ai(H.data.id,d):await ti(d),f("Registro salvo!","success");const u=document.getElementById("appointmentModal"),c=u.querySelector("#appointmentModalContent");c&&(c.classList.remove("translate-y-0","md:translate-y-0","md:scale-100"),c.classList.add("translate-y-full","md:translate-y-8","md:scale-95")),u.classList.add("opacity-0"),setTimeout(()=>{u.classList.add("hidden")},300),Ce()}catch(u){f(u.message,"error"),e.disabled=!1,e.innerHTML=`<i class="bi bi-check-circle-fill"></i> ${H.data.id?"Salvar Edição":"Confirmar"}`}}async function Rs(){const t=document.getElementById("availableTimesContainer"),e=document.getElementById("apptTotalDuration");if(!t)return;const a=document.getElementById("apptDate");a&&a.value&&(H.data.date=a.value);const s=H.data.selectedServiceIds.reduce((u,c)=>{const p=Pa.find(b=>b.id===c);return u+(p?p.duration+(p.bufferTime||0):0)},0);e&&(e.innerHTML=`<strong>${s}</strong> min`);const{professionalId:r,selectedServiceIds:o,date:i,originalDate:n,originalTime:l,id:d}=H.data;if(!r||!o.length||!i){t.innerHTML='<p class="col-span-full text-center text-xs text-gray-500 font-bold py-4 bg-white rounded-xl shadow-sm border border-gray-100">Preencha os passos anteriores.</p>';return}t.innerHTML='<div class="col-span-full flex justify-center py-4"><div class="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>';try{const u=g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments[0]:g.establishmentId;let c=await ei({establishmentId:u,professionalId:r,serviceIds:o,date:i});const p=new Date;if(new Date(i+"T00:00:00").toDateString()===p.toDateString()){const b=p.getHours()*60+p.getMinutes();c=c.filter(m=>{const[h,y]=m.split(":").map(Number);return h*60+y>=b})}d&&i===n&&l&&(c.includes(l)||(c.push(l),c.sort())),t.innerHTML=c.length>0?c.map(b=>{const m=H.data.time===b;return`<button type="button" data-time-slot="${b}" class="py-3 text-sm font-bold rounded-xl border-2 transition-transform active:scale-95 ${m?"bg-indigo-600 text-white border-indigo-600 shadow-md":"bg-white text-gray-700 border-gray-200 hover:border-indigo-300 shadow-sm"}">${b}</button>`}).join(""):'<p class="col-span-full text-center text-sm font-bold text-red-500 bg-white py-4 rounded-xl border border-red-100 shadow-sm">Nenhum horário livre.</p>'}catch{t.innerHTML='<p class="col-span-full text-center text-sm font-bold text-red-500 bg-white py-4 rounded-xl">Erro ao pesquisar.</p>'}}function vn(){const t=document.getElementById("loyaltyRewardsContainer");if(!t)return;const{clientHasRewards:e,clientLoyaltyPoints:a}=H.data,{enabled:s,rewards:r}=pa;if(!s||!e||!r?.length){t.innerHTML="";return}const o=r.filter(i=>a>=i.points);if(!o.length){t.innerHTML='<p class="text-xs font-bold text-gray-400 mt-3 text-center">Nenhuma recompensa atingida ainda.</p>';return}t.innerHTML=`<div class="border border-indigo-100 bg-indigo-50/80 rounded-xl p-3 mt-3 shadow-sm">
        <p class="text-[0.7rem] font-bold text-indigo-800 uppercase tracking-wider mb-2">Recompensas (${a} pts)</p>
        ${o.map(i=>`<label class="flex items-center gap-2 p-2 bg-white border border-indigo-100 rounded-lg mb-1.5 cursor-pointer shadow-sm active:scale-95 transition-transform"><input type="radio" name="loyaltyReward" value="${Y(i.reward)}" data-points="${i.points}" class="w-4 h-4 accent-indigo-600"><span class="text-[0.85rem] font-bold text-gray-800 flex-1">${Y(i.reward)}</span><span class="text-[0.65rem] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">-${i.points} pts</span></label>`).join("")}
    </div>`,t.querySelectorAll('input[name="loyaltyReward"]').forEach(i=>{i.addEventListener("change",n=>{n.target.checked&&(H.data.redeemedReward={reward:n.target.value,points:parseInt(n.target.dataset.points,10)})})})}async function yn(t){const e=document.getElementById("clientSearchResults");if(!e||t.trim().length<3){e&&(e.innerHTML='<p class="text-sm text-gray-400 font-medium px-2 py-2 text-center">Digite 3 ou mais caracteres...</p>');return}e.innerHTML='<div class="text-center py-4"><div class="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div></div>';try{const s=(g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId]).map(n=>ct(n,t.trim())),r=await Promise.all(s),o=new Map;r.forEach(n=>{n.forEach(l=>{l.phone?o.set(l.phone,l):o.set(l.id||Math.random().toString(),l)})});const i=Array.from(o.values());if(zo=i,!i.length){e.innerHTML='<p class="text-sm text-gray-500 bg-white border border-gray-200 p-3 rounded-xl text-center font-bold shadow-sm">Nenhum cliente encontrado.</p>';return}e.innerHTML=i.map(n=>`<div class="client-card p-3 bg-white rounded-xl border-2 transition-all active:scale-95 ${H.data.clientName===n.name&&H.data.clientPhone===n.phone?"border-indigo-500 bg-indigo-50 shadow-md":"border-gray-100 hover:border-gray-200 shadow-sm"} cursor-pointer flex items-center gap-3" data-client-name="${Y(n.name)}" data-client-phone="${Y(n.phone)}" data-loyalty-points="${n.loyaltyPoints||0}">
                <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-black text-gray-500 flex-shrink-0">${Y(n.name).charAt(0)}</div>
                <div class="flex-1 min-w-0"><p class="text-sm font-bold text-gray-900 truncate">${Y(n.name)}</p><p class="text-[0.75rem] font-semibold text-gray-500 truncate mt-0.5">${Y(n.phone)}</p></div>
            </div>`).join(""),e.querySelectorAll(".client-card").forEach(n=>{n.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15),H.data.clientName=n.dataset.clientName,H.data.clientPhone=n.dataset.clientPhone,H.data.clientLoyaltyPoints=parseInt(n.dataset.loyaltyPoints||"0",10);const l=Math.min(...(pa?.rewards||[]).map(d=>d.points));H.data.clientHasRewards=pa.enabled&&l!==1/0&&H.data.clientLoyaltyPoints>=l,document.getElementById("apptClientName").value=n.dataset.clientName,document.getElementById("apptClientPhone").value=n.dataset.clientPhone,e.querySelectorAll(".client-card").forEach(d=>{d.classList.remove("border-indigo-500","bg-indigo-50","shadow-md"),d.classList.add("border-gray-100","shadow-sm")}),n.classList.add("border-indigo-500","bg-indigo-50","shadow-md"),n.classList.remove("border-gray-100","shadow-sm"),setTimeout(()=>ft(2),250)})})}catch{e.innerHTML='<p class="text-[0.75rem] font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 text-center shadow-sm">Erro ao pesquisar.</p>'}}const wn=(t,e=null,a=1,s=12)=>{let r=`/api/comandas/${t}?page=${a}&limit=${s}`;return e&&(typeof e=="object"?(e.startDate&&(r+=`&startDate=${e.startDate}`),e.endDate&&(r+=`&endDate=${e.endDate}`)):typeof e=="string"&&(r+=`&date=${e}`)),L(r)},kn=(t,e)=>L(`/api/appointments/${t}/comanda`,{method:"POST",body:JSON.stringify({items:e})}),Wo=t=>L("/api/sales",{method:"POST",body:JSON.stringify(t)}),Qa=(t,e)=>L(`/api/sales/${t}?date=${e}`),Sn=(t,e,a)=>{const s=`/api/sales/${t}?startDate=${e}&endDate=${a}`;return L(s)},$n=t=>L(`/api/sales/${t}/reopen`,{method:"POST"}),Jo=t=>L(`/api/sales/${t}`,{method:"DELETE"}),Hs=Object.freeze(Object.defineProperty({__proto__:null,createSale:Wo,deleteSale:Jo,getSales:Qa,getSalesByDateRange:Sn,reopenSale:$n},Symbol.toStringTag,{value:"Module"})),pt=t=>L(`/api/products/${t}`),Qo=t=>L("/api/products",{method:"POST",body:JSON.stringify(t)}),Go=(t,e)=>L(`/api/products/${t}`,{method:"PUT",body:JSON.stringify(e)}),vs=t=>L(`/api/products/${t}`,{method:"DELETE"}),Ta=(t,e)=>L(`/api/products/${t}/stock`,{method:"PATCH",body:JSON.stringify(e)}),In=t=>L(`/api/products/${t}/stock-history`),Yo=({startDate:t,endDate:e,productId:a,categoryId:s,establishmentId:r})=>{const o=new URLSearchParams({startDate:t,endDate:e});return a&&a!=="all"&&o.append("productId",a),s&&s!=="all"&&o.append("categoryId",s),r&&o.append("establishmentId",r),L(`/api/products/stock-history/report?${o.toString()}`)},En=Object.freeze(Object.defineProperty({__proto__:null,adjustStock:Ta,createProduct:Qo,deleteProduct:vs,getProducts:pt,getStockHistory:In,getStockReport:Yo,updateProduct:Go},Symbol.toStringTag,{value:"Module"})),Ln=()=>L("/api/cashier/status").catch(t=>{if(t.message.includes("404")||t.message.includes("não encontrada"))return null;throw t}),Cn=t=>{const e={establishmentId:t.establishmentId,initialAmount:Number(t.initialAmount),notes:t.notes||""};return console.log("Payload enviado para abrir caixa:",e),L("/api/cashier/open",{method:"POST",body:JSON.stringify(e)})},Dn=(t,e)=>{const a={finalAmount:Number(e)};return console.log("Payload enviado para fechar caixa:",a),L(`/api/cashier/close/${t}`,{method:"PUT",body:JSON.stringify(a)})},Pn=()=>L("/api/cashier/history").then(t=>t||[]).catch(t=>(console.error("Erro ao buscar histórico:",t),[])),Tn=t=>L(`/api/cashier/report/${t}`),ys=t=>L(`/api/packages/${t}`),Mn=t=>L("/api/packages",{method:"POST",body:JSON.stringify(t)}),An=(t,e)=>L(`/api/packages/${t}`,{method:"PUT",body:JSON.stringify(e)}),Os=t=>L(`/api/packages/${t}`,{method:"DELETE"});let x={allComandas:[],catalog:{services:[],products:[],packages:[]},activeFilter:"abertas",selectedComandaId:null,viewMode:"items",selectedCatalogItem:null,isCashierOpen:!1,activeCashierSessionId:null,isCashierFromPreviousDay:!1,loyaltySettings:null,establishmentConfig:null,pendingRedemption:null,paging:{page:1,limit:15,total:0},checkoutState:{payments:[],selectedMethod:"dinheiro",installments:1,amountReceived:"",discount:{type:"real",value:0},discountReason:""},isProcessing:!1,showHistoryPanel:!1,filterStartDate:"",filterEndDate:"",filterPreset:"hoje"},Ue=null,Ye=null,zs=null;function Xo(t,e){return function(...a){clearTimeout(zs),zs=setTimeout(()=>t.apply(this,a),e)}}const fe=t=>{if(!t)return new Date().toISOString().split("T")[0];const e=new Date(t),a=e.getTimezoneOffset()*6e4;return new Date(e-a).toISOString().split("T")[0]};function Fa(t){const e=new Date;let a,s;return t==="hoje"?(a=new Date,s=new Date):t==="este_mes"?(a=new Date(e.getFullYear(),e.getMonth(),1),s=new Date(e.getFullYear(),e.getMonth()+1,0)):t==="mes_passado"?(a=new Date(e.getFullYear(),e.getMonth()-1,1),s=new Date(e.getFullYear(),e.getMonth(),0)):(a=new Date,s=new Date),{start:fe(a),end:fe(s)}}async function _s(t,e="stay"){if(!t||!t.id)return;t._localUpdatedAt=Date.now(),t._cachedItems=null,t._hasUnsavedChanges=!1,Bt(),e==="checkout"&&(x.viewMode="checkout",x.checkoutState.payments||(x.checkoutState.payments=[]),x.checkoutState.selectedMethod="dinheiro",x.checkoutState.amountReceived="",x.checkoutState.discount.value||(x.checkoutState.discount={type:"real",value:0},x.checkoutState.discountReason=""),ae());const a=document.createElement("div");a.id="saving-overlay",a.className="fixed inset-0 bg-gray-900/60 z-[999999] flex items-center justify-center backdrop-blur-sm",a.innerHTML=`
        <div class="bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center animate-fade-in border border-gray-100">
            <div class="loader mb-4"></div>
            <p class="text-gray-800 font-black text-sm uppercase tracking-widest">Sincronizando...</p>
        </div>
    `,document.body.appendChild(a);try{const s=(t.comandaItems||[]).filter(r=>r&&r.id&&String(r.id)!=="undefined"&&String(r.id)!=="null").map(r=>{const o={...r};if(o.id=String(r.id),o.type==="product"){const i=o.id;o.productId||(o.productId=i),o.product_id||(o.product_id=i)}if(o.type==="service"){const i=o.id;o.serviceId||(o.serviceId=i),o.service_id||(o.service_id=i)}return o});t.type==="walk-in"&&String(t.id).startsWith("temp-")||await kn(t.id,s),document.body.contains(a)&&document.body.removeChild(a),e!=="checkout"&&(f("Sucesso","Comanda atualizada e salva!","success"),ae())}catch(s){document.body.contains(a)&&document.body.removeChild(a),t._hasUnsavedChanges=!0,ae(),f("Erro","Falha ao salvar no servidor: "+s.message,"warning")}}function qe(t){if(!t._cachedItems){let e=[];if(t.status==="completed"){const a=t.comandaItems||t.items||[];e=a.length>0?a:t.services||[]}else{const a=(t.services||[]).map(i=>({...i,_source:"original_service",type:"service"})),s=a.reduce((i,n)=>{const l=String(n.id);return i[l]=(i[l]||0)+1,i},{}),r=[...t.comandaItems||[],...t.items||[]],o=[];r.forEach(i=>{const n=String(i.id);(i.type==="service"||!i.type)&&s[n]>0?s[n]--:o.push({...i,_source:"extra"})}),e=[...a,...o]}return t._cachedItems=e,t._cachedTimestamp=Date.now(),e}return t._cachedItems}function Bn(){const t=document.getElementById("comandas-layout");t&&t.classList.add("mobile-detail-open");const e=document.getElementById("mobile-bottom-nav");e&&(e.style.display="none")}function Ze(){const t=document.getElementById("comandas-layout");t&&t.classList.remove("mobile-detail-open");const e=document.getElementById("mobile-bottom-nav");e&&(e.style.display="")}function jn(){const t=fe(new Date);let e=x.allComandas||[];x.filterPreset==="hoje"?e=e.filter(u=>{const c=fe(u.startTime||u.date||u.createdAt);return u.status!=="completed"&&c<=t||u.status==="completed"&&c===t}):x.filterPreset!=="custom"&&(e=e.filter(u=>fe(u.startTime||u.date||u.createdAt)<=t));const a=e.filter(u=>u.status!=="completed").length,s=e.filter(u=>u.status==="completed"),r=s.reduce((u,c)=>{let p=c.totalAmount!==void 0?Number(c.totalAmount):qe(c).reduce((b,m)=>b+Number(m.price||0),0);return u+p},0),o=s.length>0?r/s.length:0,i=document.getElementById("kpi-abertas"),n=document.getElementById("kpi-pagas"),l=document.getElementById("kpi-vendas"),d=document.getElementById("kpi-ticket");i&&(i.textContent=a),n&&(n.textContent=s.length),l&&(l.textContent=`R$ ${r.toFixed(2).replace(".",",")}`),d&&(d.textContent=`R$ ${o.toFixed(2).replace(".",",")}`)}function Nt(){Ye.innerHTML=`
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
    `,Ma(),ws()}function ws(){document.querySelectorAll(".filter-btn").forEach(e=>{e.classList.remove("bg-indigo-600","text-white","border-indigo-600"),e.classList.add("bg-white","text-gray-600","border-gray-200")});const t=document.querySelector(`[data-filter="${x.activeFilter}"]`);t&&(t.classList.remove("bg-white","text-gray-600","border-gray-200"),t.classList.add("bg-indigo-600","text-white","border-indigo-600"))}function Ma(){const t=document.getElementById("cashier-alert-box"),e=document.getElementById("btn-new-sale");x.isCashierFromPreviousDay?(t&&(t.innerHTML=`
            <div class="bg-red-50 border-l-4 border-red-500 p-3 mb-3 rounded-r-xl animate-fade-in mx-1 shadow-sm">
                <div class="flex items-center">
                    <i class="bi bi-exclamation-octagon text-red-600 mr-3 text-xl"></i>
                    <p class="text-xs md:text-sm text-red-800 leading-tight">
                        <strong>Caixa de Ontem Aberto!</strong> Você esqueceu de fechar o caixa do turno anterior. Encerre-o agora para normalizar o sistema e registrar novas vendas.
                    </p>
                </div>
            </div>
         `),e&&(e.classList.add("opacity-50","cursor-not-allowed"),e.disabled=!0)):x.isCashierOpen?(t&&(t.innerHTML=""),e&&(e.classList.remove("opacity-50","cursor-not-allowed"),e.disabled=!1)):(t&&(t.innerHTML=`
            <div class="bg-amber-50 border-l-4 border-amber-400 p-3 mb-3 rounded-r-xl animate-fade-in mx-1 shadow-sm">
                <div class="flex items-center">
                    <i class="bi bi-exclamation-triangle text-amber-500 mr-3 text-lg"></i>
                    <p class="text-xs md:text-sm text-amber-800 leading-tight">
                        <strong>Caixa Fechado!</strong> Abra o caixa para operações financeiras.
                    </p>
                </div>
            </div>
        `),e&&(e.classList.add("opacity-50","cursor-not-allowed"),e.disabled=!0)),qn()}function qn(){const t=document.getElementById("cashier-controls");t&&(x.isCashierFromPreviousDay?t.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-red-700 bg-red-100 py-1.5 px-3 rounded-xl border border-red-200 uppercase tracking-widest shadow-sm"><i class="bi bi-exclamation-octagon"></i> Bloqueado</span>
            <button data-action="close-cashier" class="py-1.5 px-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 text-[10px] transition shadow-sm uppercase tracking-wider animate-pulse">Fechar Caixa Antigo</button>
        `:x.isCashierOpen?t.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-emerald-700 bg-emerald-100 py-1.5 px-3 rounded-xl border border-emerald-200 uppercase tracking-widest shadow-sm"><i class="bi bi-unlock-fill"></i> Caixa Aberto</span>
            <button data-action="close-cashier" class="py-1.5 px-4 bg-red-50 text-red-700 border border-red-200 font-bold rounded-xl hover:bg-red-100 text-[10px] transition shadow-sm uppercase tracking-wider">Fechar Caixa</button>
        `:t.innerHTML=`
            <span class="hidden sm:inline-block text-[10px] font-bold text-red-700 bg-red-100 py-1.5 px-3 rounded-xl border border-red-200 uppercase tracking-widest shadow-sm"><i class="bi bi-lock-fill"></i> Caixa Fechado</span>
            <button data-action="open-cashier" class="py-1.5 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 text-[10px] shadow-sm transition uppercase tracking-wider">Abrir Caixa</button>
        `)}function Bt(){const t=document.getElementById("comandas-list"),e=document.getElementById("pagination-container");if(!t)return;if((!x.isCashierOpen||x.isCashierFromPreviousDay)&&x.activeFilter==="abertas"){t.innerHTML=`
            <div class="text-center py-12 opacity-60">
                <i class="bi bi-lock text-4xl text-gray-300 mb-3 block"></i>
                <p class="text-sm font-bold text-gray-600 uppercase tracking-widest">Acesso Restrito</p>
                <p class="text-xs text-gray-500 mt-2">Regularize o caixa para ver as vendas pendentes</p>
            </div>
        `,e&&(e.innerHTML="");return}const a=fe(new Date);let s=x.allComandas||[];if(x.filterPreset==="hoje"?s=s.filter(o=>{const i=fe(o.startTime||o.date||o.createdAt);return x.activeFilter==="abertas"?o.status!=="completed"&&i<=a:x.activeFilter==="pagas"?o.status==="completed"&&i===a:o.status!=="completed"&&i<=a||o.status==="completed"&&i===a}):x.filterPreset!=="custom"?s=s.filter(o=>{const i=fe(o.startTime||o.date||o.createdAt);return x.activeFilter==="abertas"?o.status!=="completed"&&i<=a:x.activeFilter==="pagas"?o.status==="completed"&&i<=a:i<=a}):x.activeFilter==="abertas"?s=s.filter(o=>o.status!=="completed"):x.activeFilter==="pagas"&&(s=s.filter(o=>o.status==="completed")),jn(),s.length===0){t.innerHTML='<p class="text-center text-gray-400 py-12 text-sm font-medium border border-dashed border-gray-200 rounded-2xl mx-2">Nenhuma comanda encontrada.</p>',Vs(e);return}const r=document.createDocumentFragment();s.forEach(o=>{const i=qe(o);let n=0;o.status==="completed"&&o.totalAmount!==void 0&&o.totalAmount!==null?n=Number(o.totalAmount):n=i.reduce((S,I)=>S+Number(I.price||0),0);const d=o.loyaltyRedemption||o.discount&&o.discount.reason&&String(o.discount.reason).toLowerCase().includes("fidelidade")?'<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-5 h-5 ml-1.5 text-xs shadow-sm border border-yellow-200" title="Prémio Resgatado">🎁</span>':"",u=String(o.id)===String(x.selectedComandaId),c=new Date(o.startTime||o.date||o.createdAt),p=c.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),b=c.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),m=o.type==="walk-in"||typeof o.id=="string"&&o.id.startsWith("temp-"),h=o.status==="completed",y=v(o.clientName||"Cliente sem nome"),k=v(o.professionalName||"Sem profissional");let A="";h?A='<span class="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">Paga</span>':m?A='<span class="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">Avulsa</span>':A='<span class="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">Agenda</span>';const P=document.createElement("div");P.className=`comanda-card cursor-pointer border rounded-2xl p-3.5 hover:bg-gray-50 transition-all shadow-sm mb-2 ${u?"ring-2 ring-indigo-500 bg-indigo-50/50 border-transparent":"bg-white border-gray-200"}`,P.dataset.action="select-comanda",P.dataset.comandaId=o.id,P.innerHTML=`
            <div class="flex justify-between items-start mb-2.5 pointer-events-none">
                <p class="font-bold text-gray-900 truncate flex-1 min-w-0 pr-2 text-base">${y}</p>
                <div class="flex items-center flex-shrink-0">
                    <p class="font-black ${h?"text-emerald-600":"text-gray-900"} text-base">R$ ${n.toFixed(2)}</p>
                    ${d}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none gap-2">
                <div class="flex items-center gap-2 min-w-0 flex-1">
                    ${A}
                    <p class="text-xs text-gray-500 truncate font-medium"><i class="bi bi-person mr-1 opacity-50"></i>${k}</p>
                </div>
                <p class="text-xs text-gray-500 font-bold flex-shrink-0"><i class="bi bi-calendar-event mr-1 opacity-50"></i>${b} <span class="text-gray-300 mx-1">|</span> ${p}</p> 
            </div>
        `,r.appendChild(P)}),t.innerHTML="",t.appendChild(r),Vs(e)}function Vs(t){if(!t)return;t.innerHTML="";const{page:e,total:a,limit:s}=x.paging,r=Math.ceil((a||0)/s);if(r===0)return;const o=document.createElement("div");o.className="flex gap-2 justify-center items-center w-full py-1",o.innerHTML=`
        <button data-page="${e-1}" class="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-sm font-black text-gray-600 shadow-sm flex items-center justify-center ${e<=1?"opacity-50 cursor-not-allowed":""}" ${e<=1?"disabled":""}>&laquo;</button>
        <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mx-2">Pág ${e} de ${r||1}</span>
        <button data-page="${e+1}" class="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-sm font-black text-gray-600 shadow-sm flex items-center justify-center ${e>=r?"opacity-50 cursor-not-allowed":""}" ${e>=r?"disabled":""}>&raquo;</button>
    `,t.appendChild(o),o.querySelectorAll("button[data-page]").forEach(i=>{i.onclick=n=>{n.stopPropagation();const l=parseInt(i.dataset.page,10);l>0&&l<=r&&(x.paging.page=l,Se())}})}function Nn(t,e){const a=`
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
    `;const s=(o="")=>{const i=o.toLowerCase(),n={service:'<i class="bi bi-scissors text-indigo-600"></i>',product:'<i class="bi bi-box-seam text-emerald-600"></i>',package:'<i class="bi bi-boxes text-purple-600"></i>'},l={"catalog-service-list":{items:x.catalog.services,type:"service"},"catalog-product-list":{items:x.catalog.products,type:"product"},"catalog-package-list":{items:x.catalog.packages,type:"package"}};Object.entries(l).forEach(([d,{items:u,type:c}])=>{const p=e.querySelector("#"+d);if(!p)return;const b=u.filter(m=>m.name.toLowerCase().includes(i)).slice(0,50);p.innerHTML=b.map(m=>m.id?`
                <button data-action="select-catalog-item" data-item-type="${c}" data-item-id="${m.id}" class="flex items-center gap-3 w-full p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 shadow-sm transition-all text-left group active:scale-95">
                    <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg border border-gray-100 group-hover:bg-white">${n[c]}</div>
                    <span class="flex-grow text-sm font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-indigo-700">${v(m.name)}</span>
                    <span class="font-black text-sm text-gray-900 bg-gray-100 px-2.5 py-1.5 rounded-lg border border-gray-200 whitespace-nowrap group-hover:bg-white group-hover:text-indigo-700">R$ ${m.price.toFixed(2)}</span>
                </button>
            `:"").join("")||'<p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center py-6 border border-dashed border-gray-300 rounded-xl">Vazio</p>'})};s();const r=e.querySelector("#item-search-input");r&&r.addEventListener("input",Xo(o=>{s(o.target.value)},300))}function Fn(t,e){const a=x.selectedCatalogItem;if(!a){x.viewMode="add-item",ae();return}let s=1;const r=`
        <div class="p-3 md:p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50 rounded-t-2xl">
            <button data-action="back-to-add-item" class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner active:scale-90 transition-transform">
                <i class="bi bi-arrow-left text-lg md:text-xl"></i>
            </button>
            <h3 class="font-black text-sm md:text-base text-gray-800 ml-3 uppercase tracking-wider">Quantidade</h3>
        </div>
    `;e.innerHTML=`
        ${r}
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
    `;const o=()=>{e.querySelector("#quantity-display").textContent=s,e.querySelector("#quantity-minus-btn").disabled=s<=1};e.querySelector("#quantity-minus-btn").onclick=()=>{s>1&&(s--,o())},e.querySelector("#quantity-plus-btn").onclick=()=>{s++,o()},e.querySelector("#confirm-add-qty-btn").onclick=async()=>{await Ko(a,s),x.viewMode="items",x.selectedCatalogItem=null,ae()},o()}function ae(){const t=document.getElementById("comanda-detail-container");if(!t)return;const e=x.allComandas.find(m=>String(m.id)===String(x.selectedComandaId));if(x.viewMode==="checkout"&&e){Rn(e,t);return}if(x.viewMode==="add-item"&&e){Nn(e,t);return}if(x.viewMode==="add-item-qty"&&e){Fn(e,t);return}const a=`
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
    `;if(x.isCashierFromPreviousDay){t.innerHTML=`
            ${a}
            <div class="flex flex-col items-center justify-center h-full text-center text-red-500 p-6">
                <div class="bg-red-50 p-6 rounded-full mb-4 border border-red-100 shadow-inner">
                    <i class="bi bi-exclamation-octagon text-5xl text-red-400"></i>
                </div>
                <p class="font-black text-lg text-red-700 uppercase tracking-widest">Caixa de Ontem Pendente</p>
                <p class="text-sm text-red-500 mt-2 max-w-xs">Feche o caixa do turno anterior para liberar o sistema e pagar esta comanda.</p>
                <button data-action="close-cashier" class="py-3 px-8 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition shadow-md mt-6 text-sm uppercase tracking-wider animate-pulse">Fechar Caixa Antigo Agora</button>
            </div>
        `;return}else if(!x.isCashierOpen){t.innerHTML=`
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
        `;return}const s=qe(e),r=e.status==="completed",o=e.type==="walk-in"||typeof e.id=="string"&&e.id.startsWith("temp-"),i=s.reduce((m,h)=>{const y=h._source==="original_service",k=h.id||h.name,A=y?`original-${k}`:`${h.type}-${k}`;return m[A]||(m[A]={...h,quantity:0,sources:[]}),m[A].quantity+=1,h._source&&m[A].sources.push(h._source),m},{}),n=Object.values(i).reduce((m,h)=>m+Number(h.price||0)*h.quantity,0),l=v(e.clientName||"Cliente sem nome"),d=v(e.professionalName||"Profissional não atribuído"),u=e._hasUnsavedChanges,c=r?"":`
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
                ${Object.values(i).map(m=>{const h=m.sources&&m.sources.includes("original_service"),y=x.pendingRedemption&&String(x.pendingRedemption.appliedToItemId)===String(m.id),k=m.isReward||y;return`
                    <div class="flex flex-col bg-white p-4 rounded-2xl border border-gray-200 shadow-sm ${k?"border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200":""}">
                        <div class="flex justify-between items-start w-full">
                            <div class="min-w-0 flex-1 pr-3">
                                <p class="text-base font-bold text-gray-900 line-clamp-2 leading-tight">
                                    ${k?"🎁 ":""}
                                    ${v(m.name)}
                                </p>
                                <div class="flex items-center mt-2 gap-2">
                                    ${h?'<span class="text-[9px] font-black uppercase tracking-widest text-indigo-700 bg-indigo-100 px-2 py-1 rounded-md border border-indigo-200">Fixo Agenda</span>':""}
                                    <p class="text-xs text-gray-500 font-bold">${k?'<span class="text-yellow-700 font-black bg-yellow-100 px-2 py-1 rounded-md border border-yellow-200">Resgate</span>':`R$ ${(m.price||0).toFixed(2)} un.`}</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-end gap-3">
                                <span class="font-black text-xl text-gray-900 whitespace-nowrap leading-none">R$ ${(m.price*m.quantity).toFixed(2)}</span>
                                
                                ${r?`<span class="flex items-center justify-center px-4 py-2 bg-gray-100 border border-gray-200 text-gray-700 font-black text-xs uppercase tracking-widest rounded-xl">${m.quantity} Itens</span>`:`
                                    <div class="flex items-center bg-gray-50 rounded-xl border border-gray-200 shadow-inner h-10">
                                        ${h?`<span class="text-[11px] font-black text-gray-500 px-4 uppercase tracking-widest">Qtd: ${m.quantity}</span>`:`<button data-action="decrease-qty" data-item-id="${m.id}" data-item-type="${m.type}" class="w-10 h-full flex items-center justify-center rounded-l-xl bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 border-r border-gray-200 active:scale-95"><i class="bi bi-dash text-xl"></i></button>
                                             <span class="text-sm font-black text-gray-900 w-12 text-center">${m.quantity}</span>
                                             <button data-action="increase-qty" data-item-id="${m.id}" data-item-type="${m.type}" class="w-10 h-full flex items-center justify-center rounded-r-xl bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border-l border-gray-200 active:scale-95"><i class="bi bi-plus text-xl"></i></button>`}
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
    `,!r&&(e.clientId||e.clientName)&&Hn(e,t.querySelector("#loyalty-container"))}function Rn(t,e){const s=qe(t).reduce((b,m)=>b+Number(m.price||0)*(m.quantity||1),0),r=x.checkoutState,o=r.discount||{type:"real",value:0};let i=0;o.type==="percent"?i=s*o.value/100:i=o.value,i>s&&(i=s);const n=s-i,l=r.payments.reduce((b,m)=>b+m.value,0),d=Math.max(0,n-l);(!r.amountReceived||d>0)&&(r.amountReceived=d.toFixed(2));const u=`
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
                ${r.payments.map((b,m)=>`
                    <div class="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-3">
                             <div class="bg-gray-100 px-4 py-2 rounded-xl border border-gray-200">
                                <span class="font-black text-xs uppercase tracking-widest text-gray-700">${b.method}</span>
                             </div>
                             ${b.installments>1?`<span class="text-[10px] font-black bg-purple-100 text-purple-700 px-2.5 py-1.5 rounded-lg border border-purple-200 shadow-sm">${b.installments}x</span>`:""}
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-black text-xl text-gray-900">R$ ${b.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${m}" class="text-gray-400 hover:text-red-500 hover:bg-red-50 w-10 h-10 rounded-xl flex items-center justify-center transition-colors border border-transparent hover:border-red-200 active:scale-90"><i class="bi bi-trash3 text-lg"></i></button>
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
                            ${Array.from({length:12},(b,m)=>`<option value="${m+1}" ${r.installments===m+1?"selected":""}>${m+1} Parcela${m>0?"s":""}</option>`).join("")}
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
    `;const p=()=>{const b=x.checkoutState.discount.type,m=x.checkoutState.discount.value;let h=b==="percent"?s*m/100:m;h>s&&(h=s);const y=s-h,k=x.checkoutState.payments.reduce((N,U)=>N+U.value,0),A=Math.max(0,y-k),P=e.querySelector("#checkout-total-display");P&&(P.textContent=`R$ ${y.toFixed(2)}`);const S=e.querySelector("#checkout-status-msg");S&&(A<=.01?S.innerHTML='<p class="text-emerald-500 font-black text-base uppercase tracking-widest"><i class="bi bi-check2-circle text-2xl mr-2 align-middle"></i> Totalmente Pago</p>':S.innerHTML=`<p class="text-red-500 font-bold text-sm uppercase tracking-widest">Faltam: <span id="checkout-remaining-display" class="font-black text-xl text-red-600 ml-1">R$ ${A.toFixed(2)}</span></p>`);const I=e.querySelector("#checkout-amount");I&&A>0&&document.activeElement!==I&&(I.value=A.toFixed(2))};e.querySelector("#discount-value")?.addEventListener("input",b=>{const m=parseFloat(b.target.value)||0;x.checkoutState.discount.value=m,p()}),e.querySelector("#discount-type")?.addEventListener("change",b=>{x.checkoutState.discount.type=b.target.value,p()}),e.querySelector("#discount-reason")?.addEventListener("input",b=>{x.checkoutState.discountReason=b.target.value}),e.querySelector("#checkout-amount")?.addEventListener("input",b=>{x.checkoutState.amountReceived=b.target.value}),e.querySelector("#checkout-installments")?.addEventListener("change",b=>{x.checkoutState.installments=parseInt(b.target.value,10)})}async function Hn(t,e){if(!e)return;const a=x.loyaltySettings;if(!a||!a.enabled)return;let s=null;try{if(t.clientId)s=await Lo(g.establishmentId,t.clientId);else if(t.clientName){const n=await ct(g.establishmentId,t.clientName,1);n&&n.length>0&&(s=n[0])}}catch(n){console.warn("Erro ao buscar dados de fidelidade",n)}if(!s||s.loyaltyPoints===void 0)return;const r=Number(s.loyaltyPoints)||0,i=(a.tiers||a.rewards||[]).filter(n=>{const l=Number(n.costPoints||n.points||0);return l>0&&r>=l});if(i.length>0){const n=document.createElement("div");n.className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-4 shadow-sm flex justify-between items-center animate-fade-in",n.innerHTML=`
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
                                <p class="font-black text-gray-900 group-hover:text-yellow-700 text-base truncate">${v(n)}</p>
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
    `,{modalElement:s,close:r}=Ne({title:"🎁 Resgatar Prémio",contentHTML:a,maxWidth:"max-w-md"});s.addEventListener("click",o=>{const i=o.target.closest('[data-action="select-reward"]');if(i){const n=i.dataset.rewardId,l=t.find(d=>d.id&&d.id==n||(d.name||d.reward)==n);l&&(zn(l,e),r())}})}async function zn(t,e){const a=Number(t.costPoints||t.points||0),s=t.name||t.reward,r=t.type||"money";if(r==="money"){const l=parseFloat(t.discount)||0;if(l<=0){f("Erro","O valor do desconto configurado é inválido.","error");return}x.checkoutState.discount={type:"real",value:l},x.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,x.pendingRedemption={rewardId:t.id||null,name:s,cost:a,type:"money"},f("Sucesso",`Prémio "${s}" resgatado! Desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),ae();return}const o=qe(e),i=t.itemId?String(t.itemId):null;if(!i){f("Erro de Configuração",`O prémio "${s}" não tem um item vinculado nas configurações.`,"error");return}const n=o.find(l=>{const d=l.id?String(l.id):null,u=l.serviceId?String(l.serviceId):l.service_id?String(l.service_id):null,c=l.productId?String(l.productId):l.product_id?String(l.product_id):null;return r==="service"?d===i||u===i:r==="product"?d===i||c===i:r==="package"?d===i:!1});if(n){let l=parseFloat(t.discount);(!l||l<=0)&&(l=parseFloat(n.price||0)),x.checkoutState.discount={type:"real",value:l},x.checkoutState.discountReason=`Resgate Fidelidade: ${s}`,x.pendingRedemption={rewardId:t.id||null,name:s,cost:a,type:r,appliedToItemId:n.id},f("Sucesso",`Prémio "${s}" resgatado! Item encontrado e desconto de R$ ${l.toFixed(2)} aplicado.`,"success"),ae()}else f("Item Não Encontrado",`Para resgatar o prémio "${s}", o ${r==="service"?"serviço":r==="product"?"produto":"pacote"} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`,"warning")}async function Ga(t=null){if(!x.isCashierOpen)return f("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");if(x.isCashierFromPreviousDay)return f("Ação Bloqueada","Feche o caixa pendente do dia anterior antes de iniciar novas vendas.","warning");if(!g.professionals||g.professionals.length===0)try{g.professionals=await Ee(g.establishmentId)}catch{return f("Erro","Não foi possível carregar profissionais.","error")}const a=`
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
                    ${g.professionals.map(l=>`<option value="${l.id}">${v(l.name)}</option>`).join("")}
                </select>
            </div>
            <div class="pt-4">
                <button type="submit" id="btn-start-sale" class="w-full bg-indigo-600 text-white font-black text-sm uppercase tracking-widest py-4 rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 transition shadow-lg flex items-center justify-center gap-2 active:scale-95">
                    <i class="bi bi-cart-plus text-xl"></i> Iniciar Venda
                </button>
            </div>
        </form>
    `,{modalElement:s}=Ne({title:"Nova Venda Avulsa",contentHTML:a,maxWidth:"max-w-sm"}),r=s.querySelector("#client-search"),o=s.querySelector("#client-suggestions"),i=s.querySelector("#selected-client-id");t&&(i.value=t.id,r.value=`${t.name} (${t.phone||"Sem tel"})`,r.classList.add("bg-emerald-50","border-emerald-300","text-emerald-800")),r.addEventListener("input",Xo(async l=>{const d=l.target.value.trim();if(i.value="",r.classList.remove("bg-emerald-50","border-emerald-300","text-emerald-800"),d.length<2){o.classList.add("hidden");return}try{o.innerHTML='<li class="p-4 text-sm text-gray-500 text-center"><div class="loader-small mx-auto"></div></li>',o.classList.remove("hidden");const u=await ct(g.establishmentId,d,10);u.length===0?o.innerHTML='<li class="p-5 text-xs font-bold text-gray-400 text-center uppercase tracking-widest">Nenhum cliente encontrado</li>':o.innerHTML=u.map(c=>`<li data-client-id="${c.id}" data-client-name="${c.name}" data-client-phone="${c.phone}" class="p-4 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors flex flex-col justify-center"><div class="font-bold text-sm text-gray-800">${v(c.name)}</div><div class="text-xs font-medium text-gray-500 mt-1"><i class="bi bi-telephone opacity-50 mr-1.5"></i>${c.phone||"Sem telefone"}</div></li>`).join("")}catch{o.classList.add("hidden")}},400)),o.addEventListener("click",l=>{const d=l.target.closest("li[data-client-id]");d&&(i.value=d.dataset.clientId,i.dataset.name=d.dataset.clientName,i.dataset.phone=d.dataset.clientPhone,r.value=`${d.dataset.clientName}`,r.classList.add("bg-emerald-50","border-emerald-300","text-emerald-800"),o.classList.add("hidden"))}),document.addEventListener("click",l=>{!r.contains(l.target)&&!o.contains(l.target)&&o.classList.add("hidden")}),s.querySelector("#new-sale-form").addEventListener("submit",Gn);const n=s.querySelector('[data-action="new-client-from-sale"]');n&&n.addEventListener("click",l=>{l.preventDefault(),s.style.display="none",_n()})}function _n(){Ne({title:"Cadastrar Cliente Rápido",contentHTML:`
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
    `,maxWidth:"max-w-sm"});const e=document.getElementById("comandas_clientRegistrationForm");e&&e.addEventListener("submit",Vn)}async function Vn(t){t.preventDefault();const e=document.getElementById("comandas_clientRegistrationForm");if(!e)return;const a=e.querySelector("#regClientName"),r=e.querySelector("#regClientPhone").value.replace(/\D/g,"");if(!a.value||!r)return f("Erro","Nome e Telefone são obrigatórios.","error");let o=null;try{o=await Vi(g.establishmentId,r)}catch{console.log("Cliente não encontrado na base, prosseguindo com criação...")}try{if(o&&o.id)f("Atenção","Cliente já cadastrado.","info"),document.getElementById("genericModal").style.display="none",Ga(o);else{const i=await Do({establishmentId:g.establishmentId,name:a.value,phone:r});f("Sucesso","Cliente cadastrado!","success"),document.getElementById("genericModal").style.display="none",Ga(i)}}catch(i){f("Erro ao cadastrar",i.message,"error")}}async function Un(){const t=`
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
    `,{modalElement:e}=Ne({title:"Abrir Caixa",contentHTML:t,maxWidth:"max-w-xs"});e.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const s=parseFloat(document.getElementById("initial-amount").value);if(isNaN(s)||s<0)return f("Valor Inválido","Insira um valor válido.","error");try{const r=await Cn({establishmentId:g.establishmentId,initialAmount:parseFloat(s.toFixed(2))});x.isCashierOpen=!0,x.activeCashierSessionId=r.id,x.isCashierFromPreviousDay=!1,document.getElementById("genericModal").style.display="none",f("Sucesso!",`Caixa aberto (R$ ${s.toFixed(2)})`,"success"),Ma(),await Se()}catch(r){f("Erro",`Falha ao abrir caixa: ${r.message}`,"error")}})}async function Wn(){const t=x.activeCashierSessionId;if(t)try{const e=await Tn(t),a=`
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
        `,{modalElement:s}=Ne({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-sm"});s.querySelector("#close-cashier-form").addEventListener("submit",async r=>{r.preventDefault();const o=parseFloat(document.getElementById("final-amount").value);if(isNaN(o)||o<0)return f("Valor Inválido","Insira um valor final válido.","error");try{await Dn(t,o),x.isCashierOpen=!1,x.activeCashierSessionId=null,x.isCashierFromPreviousDay=!1,document.getElementById("genericModal").style.display="none",Ma(),await Se(),f("Sucesso!","Caixa fechado com sucesso!","success")}catch(i){f("Erro",`Falha ao fechar caixa: ${i.message}`,"error")}})}catch(e){f("Erro",`Falha ao carregar relatório: ${e.message}`,"error")}}async function Jn(t){if(x.activeFilter===t)return;x.activeFilter=t,x.paging.page=1,ws(),Ze(),x.selectedComandaId=null,x.viewMode="items";const e=document.getElementById("comandas-list");e&&(e.innerHTML='<div class="loader mx-auto mt-10"></div>'),Bt()}function Zo(t){x.selectedComandaId=String(t),x.viewMode="items",x.pendingRedemption=null,x.checkoutState.discount={type:"real",value:0},x.checkoutState.discountReason="",Bt(),Bn(),ae()}async function Ko(t,e){const a=x.allComandas.find(o=>String(o.id)===String(x.selectedComandaId));if(!a)return;if(!t.id||String(t.id)==="undefined"){f("Erro","Item sem identificador. Não foi possível adicionar.","error");return}const s=parseFloat(t.price)||0,r=Array(e).fill(0).map(()=>{const o={id:String(t.id),name:t.name,price:s,type:t.type,isReward:t.isReward||!1,pointsCost:t.pointsCost||0};return t.type==="product"?(o.productId=o.id,o.product_id=o.id):t.type==="service"&&(o.serviceId=o.id,o.service_id=o.id),o});a.comandaItems=a.comandaItems||[],a.comandaItems.push(...r),a._cachedItems=null,a._hasUnsavedChanges=!0,ae()}async function Us(t,e){const a=x.allComandas.find(o=>String(o.id)===String(x.selectedComandaId));if(!a)return;let s=!1,r=(a.comandaItems||[]).findIndex(o=>String(o.id)===String(t)&&o.type===e);r>-1&&(a.comandaItems.splice(r,1),s=!0),s&&(a._cachedItems=null,a._hasUnsavedChanges=!0,ae())}async function Qn(t){if(x.isProcessing)return;const e=qe(t),a=e.reduce((y,k)=>y+Number(k.price||0)*(k.quantity||1),0),s=x.checkoutState.discount||{type:"real",value:0};let r=s.type==="percent"?a*s.value/100:s.value;r>a&&(r=a);const o=a-r,{payments:i}=x.checkoutState,n=i.reduce((y,k)=>y+k.value,0),l=o-n;if(l>.01){if(!await Q("Pagamento Parcial",`O valor de R$ ${l.toFixed(2)} não foi pago. Deseja registrar como DÍVIDA (Fiado) no cadastro do cliente?`))return;i.push({method:"fiado",value:l,installments:1})}x.isProcessing=!0;const d=t.type==="appointment",u=e;let c=0;const p=x.loyaltySettings;p&&p.enabled&&(c=parseInt(p.pointsPerVisit||1,10));const b={...s,reason:x.checkoutState.discountReason||""},m={payments:i,totalAmount:Number(o),items:u,cashierSessionId:x.activeCashierSessionId,loyaltyPointsEarned:c,discount:b,loyaltyRedemption:x.pendingRedemption},h=document.createElement("div");h.className="fixed inset-0 bg-gray-900/60 z-[999999] flex items-center justify-center backdrop-blur-sm",h.innerHTML='<div class="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center"><div class="loader mb-5"></div><p class="text-sm font-black text-gray-800 uppercase tracking-widest mt-2">Processando...</p></div>',document.body.appendChild(h);try{d?await ri(t.id,m):(m.establishmentId=g.establishmentId,m.clientId=t.clientId,m.clientName=t.clientName,m.professionalId=t.professionalId,t.clientPhone&&(m.clientPhone=t.clientPhone),await Wo(m));let y="Venda finalizada com sucesso!";c>0&&(y+=` Cliente ganhou ${c} pontos!`),f("Sucesso!",y,"success"),Ze(),x.selectedComandaId=null,x.viewMode="items",x.pendingRedemption=null,await Se()}catch(y){f("Erro no Checkout",y.message,"error")}finally{document.body.contains(h)&&document.body.removeChild(h),x.isProcessing=!1}}async function Gn(t){t.preventDefault();const e=document.getElementById("selected-client-id"),a=document.getElementById("new-sale-professional").value,s=e.value,r=document.getElementById("client-search").value,o=e.dataset.phone||"";if(!s)return f("Erro","Selecione um cliente válido.","error");const i=g.professionals.find(l=>l.id===a);if(!i)return f("Erro","Selecione um profissional válido.","error");const n={id:`temp-${Date.now()}`,type:"walk-in",clientId:s,clientName:r.split("(")[0].trim(),clientPhone:o,professionalId:i.id,professionalName:i.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};x.allComandas.unshift(n),x.selectedComandaId=String(n.id),x.viewMode="items",document.getElementById("genericModal").style.display="none",x.activeFilter==="pagas"&&(x.activeFilter="abertas"),ws(),Zo(n.id)}async function Se(){const t=document.getElementById("comandas-list");(!t.hasChildNodes()||t.innerHTML.includes("loader"))&&(t.innerHTML='<div class="loader mx-auto mt-10"></div>');let e=x.filterStartDate,a=x.filterEndDate;if(x.filterPreset==="hoje"){a=fe(new Date);const o=new Date;o.setDate(o.getDate()-45),e=fe(o)}let s;e&&a&&e!==a?s={startDate:e,endDate:a}:s={startDate:e,endDate:a,date:e};try{const r=Ln(),o=wn(g.establishmentId,s,x.paging.page,x.paging.limit),i=je(g.establishmentId),[n,l,d]=await Promise.all([r,o,i]);if(x.establishmentConfig=d||{},x.isCashierOpen=!!n,x.activeCashierSessionId=n?n.id:null,x.isCashierFromPreviousDay=!1,n&&n.openedAt){const u=fe(n.openedAt),c=fe(new Date);u<c&&(x.isCashierFromPreviousDay=!0)}if(Ma(),d&&d.loyaltyProgram&&(x.loyaltySettings=d.loyaltyProgram),x.allComandas=l.data||l||[],x.paging.total=l.total||x.allComandas.length,x.catalog.services.length===0){const[u,c,p,b]=await Promise.all([ut(g.establishmentId),pt(g.establishmentId),ys(g.establishmentId),Ee(g.establishmentId)]);x.catalog={services:u,products:c,packages:p},g.professionals=b}Bt(),ae()}catch(r){f("Erro",`Não foi possível carregar os dados: ${r.message}`,"error")}}async function Yn(t={}){Ye=document.getElementById("content"),x.selectedComandaId=t.selectedAppointmentId?String(t.selectedAppointmentId):null,x.viewMode="items",x.selectedCatalogItem=null;const e=Fa("hoje");if(x.filterStartDate=e.start,x.filterEndDate=e.end,x.filterPreset="hoje",x.showHistoryPanel=!1,Nt(),Ue&&(Ye.removeEventListener("click",Ue),Ye.removeEventListener("change",Ue)),Ue=async a=>{const s=a.target.closest("[data-action], [data-filter], [data-comanda-id]");if(s){if(s.matches("[data-filter]"))a.preventDefault(),Jn(s.dataset.filter);else if(s.matches("[data-comanda-id]")){if(a.preventDefault(),a.target.closest('[data-action="go-to-appointment"]')){a.stopPropagation();return}Zo(s.dataset.comandaId)}else if(s.matches("[data-action]")){a.preventDefault();const r=s.dataset.action,o=String(s.dataset.id||x.selectedComandaId),i=x.allComandas.find(n=>String(n.id)===o);switch(r){case"toggle-history":if(x.showHistoryPanel=!x.showHistoryPanel,x.showHistoryPanel&&x.activeFilter==="abertas"&&(x.activeFilter="todas"),Nt(),!x.showHistoryPanel){x.filterPreset="hoje";const D=Fa("hoje");x.filterStartDate=D.start,x.filterEndDate=D.end,await Se()}break;case"set-period":const n=s.dataset.period;if(x.filterPreset=n,n!=="custom"){const D=Fa(n);x.filterStartDate=D.start,x.filterEndDate=D.end,Nt(),x.paging.page=1,f("Buscando...",`Período: ${D.start.split("-").reverse().join("/")} a ${D.end.split("-").reverse().join("/")}`,"info"),await Se()}else Nt();break;case"apply-custom-dates":const l=document.getElementById("filter-start-date").value,d=document.getElementById("filter-end-date").value;l&&d?(x.filterStartDate=l,x.filterEndDate=d,x.paging.page=1,f("Buscando...","Período personalizado aplicado.","info"),await Se()):f("Atenção","Preencha a data inicial e final.","warning");break;case"back-to-list":Ze(),x.selectedComandaId=null,x.selectedCatalogItem=null,document.querySelectorAll(".comanda-card").forEach(D=>D.classList.remove("ring-2","ring-indigo-500","bg-indigo-50/50","border-transparent")),document.querySelectorAll(".comanda-card").forEach(D=>D.classList.add("bg-white","border-gray-200")),ae();break;case"new-sale":Ga();break;case"add-item":if(!x.isCashierOpen)return f("Caixa Fechado","Abra o caixa primeiro.","error");x.viewMode="add-item",ae();break;case"back-to-items":x.viewMode="items",ae();break;case"back-to-add-item":x.viewMode="add-item",x.selectedCatalogItem=null,ae();break;case"select-catalog-item":const{itemType:u,itemId:c}=s.dataset,b=(x.catalog[u+"s"]||[]).find(D=>String(D.id)===String(c));b&&(x.selectedCatalogItem={...b,type:u},x.viewMode="add-item-qty",ae());break;case"open-cashier":Un();break;case"close-cashier":await Wn();break;case"view-sales-report":oe("sales-report-section");break;case"go-to-checkout":await _s(i,"checkout");break;case"save-comanda":await _s(i,"stay");break;case"select-method":x.checkoutState.selectedMethod=s.dataset.method,x.checkoutState.installments=1,ae();break;case"add-payment-checkout":const m=document.getElementById("checkout-amount");let h=parseFloat(m.value);const k=qe(i).reduce((D,V)=>D+(V.price||0),0),A=x.checkoutState.discount||{type:"real",value:0};let P=A.type==="percent"?k*A.value/100:A.value;P>k&&(P=k);const S=k-P,I=x.checkoutState.payments.reduce((D,V)=>D+V.value,0),N=S-I;if(isNaN(h)||h<=0){f("Valor inválido","Insira um valor maior que zero.","error");break}if(h>N+.05){f("Valor inválido","Valor excede o restante.","error");break}const U={method:x.checkoutState.selectedMethod,value:h};["credito","crediario"].includes(x.checkoutState.selectedMethod)&&x.checkoutState.installments>1&&(U.installments=x.checkoutState.installments),x.checkoutState.payments.push(U),x.checkoutState.selectedMethod="dinheiro",x.checkoutState.installments=1,x.checkoutState.amountReceived="",ae();break;case"remove-payment-checkout":const C=parseInt(s.dataset.index,10);x.checkoutState.payments.splice(C,1),ae();break;case"finalize-checkout":await Qn(i);break;case"increase-qty":{const D=s.dataset.itemId,V=s.dataset.itemType;if(!D||D==="undefined"||D==="null"){f("Erro","Item inválido.","error");return}let M=qe(i).find(X=>String(X.id)===String(D)&&X.type===V);M||(M=(x.catalog[V+"s"]||[]).find(te=>String(te.id)===String(D)));const R=M?{id:M.id,name:M.name,price:Number(M.price),type:M.type}:{id:D,name:"Item",price:0,type:V};await Ko(R,1);break}case"decrease-qty":await Us(s.dataset.itemId,s.dataset.itemType);break;case"remove-item":await Us(s.dataset.itemId,s.dataset.itemType);break;case"reopen-appointment":{if(await Q("Reabrir Comanda","Tem certeza? O pagamento será estornado."))try{await oi(o);const V=x.allComandas.findIndex(T=>String(T.id)===o);V!==-1&&(x.allComandas[V].status="confirmed",delete x.allComandas[V].transaction),x.selectedComandaId=null,Ze(),await Se(),f("Sucesso!","Comanda reaberta.","success")}catch(V){f("Erro",V.message,"error")}break}case"go-to-appointment":{oe("agenda-section",{scrollToAppointmentId:s.dataset.id,targetDate:new Date(s.dataset.date)});break}case"delete-walk-in":{if(await Q("Excluir Venda","Confirma a exclusão desta venda avulsa?"))if(o.startsWith("temp-"))x.allComandas=x.allComandas.filter(V=>String(V.id)!==o),x.selectedComandaId=null,Bt(),ae(),Ze();else try{await Jo(o),f("Sucesso","Venda excluída.","success"),x.selectedComandaId=null,Ze(),await Se()}catch(V){f("Erro",V.message,"error")}break}}}}},Ye.addEventListener("click",Ue),Ye.addEventListener("change",Ue),t.initialFilter&&(t.initialFilter==="finalizadas"?x.activeFilter="pagas":x.activeFilter="abertas"),t.selectedAppointmentId&&(x.selectedComandaId=String(t.selectedAppointmentId)),t.filterDate){const a=new Date(t.filterDate).toISOString().split("T")[0];x.filterStartDate=a,x.filterEndDate=a,x.filterPreset="custom",x.showHistoryPanel=!0}await Se()}const Ya=new Date,Xn=new Date(Ya.getFullYear(),Ya.getMonth(),1);let j={establishments:[],filterEstablishmentIds:new Set,startDate:Xn.toISOString().split("T")[0],endDate:Ya.toISOString().split("T")[0],currentTab:"financeiro",drillDownMonth:null,data:{financeiro:null,agenda:null,clientes:null,vendas:null,estoque:null},charts:{}};const Xa=document.getElementById("content");let Ft=null;function ce(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function Pe(t){if(!t)return"--/--/----";const e=t.split("T")[0].split("-");return e.length===3?`${e[2]}/${e[1]}/${e[0]}`:t}function De(t){return t?typeof t.toDate=="function"?t.toDate():typeof t=="string"||typeof t=="number"?new Date(t):new Date:new Date(0)}function jt(t){j.charts[t]&&(j.charts[t].destroy(),j.charts[t]=null)}async function Zn(){try{const e=(await we().catch(()=>({matrizes:[]}))).matrizes||[];j.establishments=[],e.forEach(a=>{j.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>j.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),j.filterEstablishmentIds.size===0&&j.filterEstablishmentIds.add(g.establishmentId)}catch(t){console.error("Erro ao buscar hierarquia de empresas",t)}Kn(),il(),await xt()}function Kn(){const t=j.establishments.map(e=>`
        <label class="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 border ${j.filterEstablishmentIds.has(e.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50 text-indigo-700":"border-slate-200 text-slate-600"} rounded-md cursor-pointer hover:bg-slate-100 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${e.id}" ${j.filterEstablishmentIds.has(e.id)?"checked":""}>
            <span class="text-[10px] font-bold whitespace-nowrap">${e.type==="Matriz"?'<i class="bi bi-building"></i>':'<i class="bi bi-shop"></i>'} ${e.name}</span>
        </label>
    `).join("");Xa.innerHTML=`
        <section class="h-full flex flex-col p-2 pt-1 md:px-6 md:py-3 md:pt-2 w-full bg-slate-50 relative overflow-hidden">
            
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-2 md:p-3 mb-2 z-20 flex flex-col gap-2 flex-shrink-0">
                
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    
                    <div class="flex overflow-x-auto custom-scrollbar gap-1.5 w-full md:w-auto pb-1 md:pb-0">
                        <button data-tab="financeiro" class="tab-btn ${j.currentTab==="financeiro"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-currency-dollar"></i> Financeiro
                        </button>
                        <button data-tab="agenda" class="tab-btn ${j.currentTab==="agenda"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-calendar3"></i> Agenda
                        </button>
                        <button data-tab="clientes" class="tab-btn ${j.currentTab==="clientes"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-people"></i> Clientes
                        </button>
                        <button data-tab="vendas" class="tab-btn ${j.currentTab==="vendas"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-receipt"></i> Vendas/PDV
                        </button>
                        <button data-tab="estoque" class="tab-btn ${j.currentTab==="estoque"?"active bg-indigo-600 text-white shadow-md border-transparent":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
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
                        ${j.establishments.length>1?t:'<span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-100 px-2 py-1 rounded-md"><i class="bi bi-shop mr-1"></i> Unidade Atual</span>'}
                    </div>

                    <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                        <div class="hidden lg:flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                            <button data-action="preset-date" data-preset="month" class="px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-colors bg-white text-indigo-600 shadow-sm border border-slate-200">Este Mês</button>
                            <button data-action="preset-date" data-preset="last_month" class="px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-colors text-slate-500 hover:text-slate-700">Mês Passado</button>
                            <button data-action="preset-date" data-preset="year" class="px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-colors text-slate-500 hover:text-slate-700">Este Ano</button>
                        </div>

                        <div class="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 shadow-inner">
                            <input type="date" id="report-start" value="${j.startDate}" class="p-1 bg-transparent text-[11px] font-bold text-slate-700 outline-none">
                            <span class="text-slate-400 text-[10px] font-bold">até</span>
                            <input type="date" id="report-end" value="${j.endDate}" class="p-1 bg-transparent text-[11px] font-bold text-slate-700 outline-none">
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
    `}async function xt(){const t=document.getElementById("tab-content");t&&(t.innerHTML='<div class="flex justify-center items-center h-40"><div class="loader"></div></div>');const{currentTab:e,startDate:a,endDate:s,filterEstablishmentIds:r}=j,o=Array.from(r),i=o.join(","),n=new Date(a).toISOString(),l=new Date(s);l.setHours(23,59,59,999);const d=l.toISOString();try{if(e==="financeiro"){const u={startDate:a,endDate:s,establishmentId:i},[c,p,b]=await Promise.all([gs(u).catch(()=>({entries:[]})),La(u).catch(()=>({entries:[]})),Ea(g.establishmentId).catch(()=>[])]);j.data.financeiro={payables:c.entries,receivables:p.entries,natures:b},el()}else if(e==="agenda"){const u=o.map(m=>$a(m,n,d).catch(()=>[])),c=o.map(m=>Kr(m,n,d).catch(()=>[])),[p,b]=await Promise.all([Promise.all(u),Promise.all(c)]);j.data.agenda={active:p.flat(),cancelled:b.flat()},Za()}else if(e==="clientes"){const u=await Promise.all(o.map(p=>ct(p).catch(()=>[]))),c=new Map;u.flat().forEach(p=>c.set(p.id,p)),j.data.clientes=Array.from(c.values()),Ka()}else if(e==="vendas"){let u=[];try{Hs&&typeof Qa=="function"?u=await Promise.all(o.map(c=>Qa({startDate:a,endDate:s,establishmentId:c}).catch(()=>[]))):zi&&typeof ca=="function"&&(u=(await Promise.all(o.map(p=>ca({establishmentId:p,startDate:a,endDate:s}).catch(()=>({transactions:[]}))))).flatMap(p=>(p.transactions||[]).map(b=>({id:"REF-"+Math.random().toString(36).substring(2,8),status:"completed",createdAt:b.date,totalAmount:b.total,items:[{name:b.items||"Itens Venda",quantity:1,price:b.total}]}))))}catch(c){console.error("Erro interno ao buscar as vendas:",c)}j.data.vendas=u.flat(),al()}else if(e==="estoque"){const u=await Promise.all(o.map(c=>pt(c).catch(()=>[])));j.data.estoque=u.flat(),sl()}}catch(u){t.innerHTML=`<div class="p-10 text-center text-red-500 bg-red-50 rounded-xl border border-red-100"><i class="bi bi-exclamation-triangle text-3xl mb-2"></i><br>Erro ao carregar dados: ${u.message}</div>`}}function el(){const t=document.getElementById("tab-content"),{payables:e,receivables:a,natures:s}=j.data.financeiro,r=new Map(s.map(S=>[S.id,S.name])),o={};a.forEach(S=>{const I=(S.status==="paid"?S.paymentDate:S.dueDate)?.split("T")[0];if(!I)return;o[I]||(o[I]={recReal:0,recPrev:0,despReal:0,despPrev:0,items:[]});const N=Number(S.amount)||0;o[I].items.push({...S,_type:"receita"}),S.status==="paid"?o[I].recReal+=N:o[I].recPrev+=N}),e.forEach(S=>{const I=(S.status==="paid"?S.paymentDate:S.dueDate)?.split("T")[0];if(!I)return;o[I]||(o[I]={recReal:0,recPrev:0,despReal:0,despPrev:0,items:[]});const N=Number(S.amount)||0;o[I].items.push({...S,_type:"despesa"}),S.status==="paid"?o[I].despReal+=N:o[I].despPrev+=N});const i=Object.keys(o).sort(),n=i.map(S=>Pe(S).substring(0,5));let l=0;const d=[],u=[],c=[],p=[],b=[];i.forEach(S=>{const I=o[S];d.push(I.recReal),u.push(I.recPrev),c.push(-Math.abs(I.despReal)),p.push(-Math.abs(I.despPrev)),l+=I.recReal-I.despReal,b.push(l)});const m=d.reduce((S,I)=>S+I,0),h=c.reduce((S,I)=>S+Math.abs(I),0),y=m-h,k=m>0?y/m*100:0,A={},P={};a.filter(S=>S.status==="paid").forEach(S=>{const I=S.naturezaId?r.get(S.naturezaId)||"Outros":"Sem Cat.";A[I]=(A[I]||0)+S.amount}),e.filter(S=>S.status==="paid").forEach(S=>{const I=S.naturezaId?r.get(S.naturezaId)||"Outros":"Sem Cat.";P[I]=(P[I]||0)+S.amount}),t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-up-circle text-emerald-500 mr-1"></i> Rec. Realizada</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${ce(m)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-down-circle text-red-500 mr-1"></i> Desp. Realizada</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${ce(h)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-wallet2 text-indigo-500 mr-1"></i> Saldo do Período</span><span class="text-lg md:text-xl font-black ${y>=0?"text-emerald-600":"text-red-600"} mt-0.5">${ce(y)}</span></div>
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
                        ${Object.entries(A).sort((S,I)=>I[1]-S[1]).map(([S,I])=>`<div class="flex justify-between items-center mb-1"><span class="text-[11px] text-slate-600 truncate mr-2">${S}</span><span class="text-[11px] font-bold text-slate-800">${ce(I)}</span></div>`).join("")||'<p class="text-[9px] text-slate-400">Sem dados.</p>'}</div>
                        <div class="mb-2"><p class="text-[9px] font-bold text-red-500 uppercase border-b border-red-100 pb-1 mb-1.5">Despesas</p>
                        ${Object.entries(P).sort((S,I)=>I[1]-S[1]).map(([S,I])=>`<div class="flex justify-between items-center mb-1"><span class="text-[11px] text-slate-600 truncate mr-2">${S}</span><span class="text-[11px] font-bold text-slate-800">${ce(I)}</span></div>`).join("")||'<p class="text-[9px] text-slate-400">Sem dados.</p>'}</div>
                    </div>
                </div>
            </div>
        </div>`,setTimeout(()=>{const S=document.getElementById("chartFin");S&&(jt("fin"),j.charts.fin=new Chart(S,{type:"bar",data:{labels:n.length?n:["-"],datasets:[{label:"Receita Realizada",data:d,backgroundColor:"#10b981",stack:"Stack 0",borderRadius:3,order:2},{label:"Receita Prevista",data:u,backgroundColor:"#6ee7b7",stack:"Stack 0",borderRadius:3,order:2},{label:"Despesa Realizada",data:c,backgroundColor:"#ef4444",stack:"Stack 0",borderRadius:3,order:2},{label:"Despesa Prevista",data:p,backgroundColor:"#fca5a5",stack:"Stack 0",borderRadius:3,order:2},{label:"Saldo Acumulado",data:b,type:"line",borderColor:"#4f46e5",backgroundColor:"#4f46e5",tension:.4,borderWidth:2,pointRadius:3,yAxisID:"y1",order:1}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{callbacks:{label:function(I){let N=I.dataset.label||"";return N&&(N+=": "),I.parsed.y!==null&&(N+=ce(Math.abs(I.parsed.y))),N},footer:function(I){const N=I[0].dataIndex,U=i[N],C=o[U];if(!C)return"";const D=C.recReal+C.recPrev-(C.despReal+C.despPrev);return`
Saldo Dia: `+ce(D)+`
(Clique para ver)`}}}},onClick:(I,N)=>{if(N.length>0){const U=N[0].index,C=N[0].datasetIndex,D=i[U];let V="all";C===0||C===1?V="receita":(C===2||C===3)&&(V="despesa"),tl(D,V,o[D].items,r)}},scales:{x:{stacked:!0,grid:{display:!1}},y:{stacked:!0,beginAtZero:!0,grid:{borderDash:[2,4],color:"#f8fafc"},ticks:{font:{size:9},callback:I=>ce(Math.abs(I))}},y1:{position:"right",beginAtZero:!0,grid:{display:!1},ticks:{font:{size:9},callback:I=>ce(I)}}}}}),document.querySelectorAll(".fin-toggle-btn").forEach(I=>{I.className="fin-toggle-btn flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase transition-all shadow-sm rounded-md border cursor-pointer",I.onclick=N=>{const U=N.currentTarget,C=parseInt(U.dataset.dataset),D=j.charts.fin;D.isDatasetVisible(C)?(D.hide(C),U.style.opacity="0.4",U.style.background="#f8f9fa"):(D.show(C),U.style.opacity="1",U.style.background="")}}))},100)}function tl(t,e,a,s){let r=document.getElementById("genericModal");r||(r=document.createElement("div"),r.id="genericModal",r.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",document.body.appendChild(r));const o=e==="all"?a:a.filter(l=>l._type===e);let i=e==="receita"?'<span class="text-emerald-600">Receitas</span>':e==="despesa"?'<span class="text-red-600">Despesas</span>':"Movimentações";r.innerHTML=`
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none sm:max-w-3xl sm:mx-auto my-8">
            <div class="modal-content relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-xl shadow-2xl border-0">
                <div class="modal-header flex items-center justify-between p-3 border-b border-slate-200 bg-slate-50 rounded-t-xl">
                    <h5 class="text-sm font-bold text-slate-800"><i class="bi bi-search text-indigo-600 mr-1.5"></i> ${i} em ${Pe(t)}</h5>
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
    `,r.style.display="block",setTimeout(()=>r.classList.add("show","opacity-100"),10);const n=r.querySelector(".btn-close-modal");n&&(n.onclick=()=>{r.style.display="none",r.classList.remove("show","opacity-100")})}function Za(){const t=document.getElementById("tab-content"),{active:e,cancelled:a}=j.data.agenda,s=e.length+a.length,r=e.filter(p=>p.status==="completed").length,o=e.filter(p=>["confirmed","pending","in-progress"].includes(p.status)).length,i=e.filter(p=>p.status==="no-show").length,n=a.length,l=s>0?(r/s*100).toFixed(1):0,d=e.filter(p=>p.status==="completed").reduce((p,b)=>p+(Number(b.totalAmount||(b.transaction?b.transaction.totalAmount:0))||0),0);let u=[],c=[];if(j.drillDownMonth!==null){const p=new Date(j.startDate).getFullYear(),b=new Date(p,j.drillDownMonth+1,0).getDate();u=Array.from({length:b},(m,h)=>`${h+1}`),c=u.map(m=>e.filter(h=>{const y=De(h.startTime||h.date);return y.getMonth()===j.drillDownMonth&&y.getDate()===parseInt(m)}).length)}else u=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],c=u.map((p,b)=>e.filter(m=>De(m.startTime||m.date).getMonth()===b).length);t.innerHTML=`
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
                <div class="bg-emerald-600 p-4 rounded-xl text-white shadow-sm flex items-center justify-between"><div><p class="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Receita Atendimentos</p><p class="text-2xl md:text-3xl font-black">${ce(d)}</p></div><i class="bi bi-cash-coin text-3xl opacity-50"></i></div>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div class="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide"><i class="bi bi-clock-history text-indigo-500 mr-1"></i> Volume de Agendamentos ${j.drillDownMonth!==null?`(${u.length} dias)`:""}</h3>
                    ${j.drillDownMonth!==null?'<button id="btn-back-agenda" class="text-[9px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md hover:bg-indigo-100 transition-colors shadow-sm"><i class="bi bi-arrow-left mr-1"></i> Voltar</button>':'<span class="hidden md:inline-block text-[9px] text-slate-400 italic">Dica: Clique num mês para ver por dia.</span>'}
                </div>
                <div class="relative h-64 w-full"><canvas id="chartAgenda"></canvas></div>
            </div>
        </div>`,setTimeout(()=>{const p=document.getElementById("chartAgenda");p&&(jt("agenda"),j.charts.agenda=new Chart(p,{type:"line",data:{labels:u,datasets:[{label:"Ativos",data:c,borderColor:"#4f46e5",backgroundColor:"rgba(79, 70, 229, 0.1)",fill:!0,tension:.4,pointRadius:4,borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(m,h)=>{h.length>0&&j.drillDownMonth===null&&(j.drillDownMonth=h[0].index,Za())},plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,grid:{color:"#f8fafc",borderDash:[2,4]},ticks:{stepSize:1,font:{size:9}}},x:{grid:{display:!1},ticks:{font:{size:9}}}}}}));const b=document.getElementById("btn-back-agenda");b&&(b.onclick=()=>{j.drillDownMonth=null,Za()})},100)}function Ka(){const t=document.getElementById("tab-content"),e=j.data.clientes||[],a=De(j.startDate),s=De(j.endDate);s.setHours(23,59,59,999);const r=e.length,o=e.filter(u=>{if(!u.createdAt)return!1;const c=De(u.createdAt);return c>=a&&c<=s}),i=e.filter(u=>{if(!u.createdAt&&!u.lastVisit)return!0;const c=u.lastVisit?De(u.lastVisit):De(u.createdAt);return(new Date-c)/(1e3*60*60*24)>60}),n=r>0?(o.length/r*100).toFixed(1):0;let l=[],d=[];if(j.drillDownMonth!==null){const u=new Date(j.startDate).getFullYear(),c=new Date(u,j.drillDownMonth+1,0).getDate();l=Array.from({length:c},(p,b)=>`${b+1}`),d=l.map(p=>o.filter(b=>{const m=De(b.createdAt);return m.getMonth()===j.drillDownMonth&&m.getDate()===parseInt(p)}).length)}else l=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],d=l.map((u,c)=>o.filter(p=>De(p.createdAt).getMonth()===c).length);t.innerHTML=`
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
                        <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide"><i class="bi bi-person-lines-fill text-indigo-500 mr-1"></i> Aquisição ${j.drillDownMonth!==null?"(Diário)":"(Mensal)"}</h3>
                        ${j.drillDownMonth!==null?'<button id="btn-back-clientes" class="text-[9px] font-bold uppercase text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">Voltar</button>':""}
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
        </div>`,setTimeout(()=>{if(!window.Chart)return;const u=document.getElementById("chartClientes");u&&(jt("clientes"),j.charts.clientes=new Chart(u,{type:"bar",data:{labels:l,datasets:[{label:"Novos Cadastros",data:d,backgroundColor:"#3b82f6",borderRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(p,b)=>{b.length>0&&j.drillDownMonth===null&&(j.drillDownMonth=b[0].index,Ka())},plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{stepSize:1,font:{size:9}}},x:{grid:{display:!1},ticks:{font:{size:9}}}}}}));const c=document.getElementById("btn-back-clientes");c&&(c.onclick=()=>{j.drillDownMonth=null,Ka()})},100)}function al(){const t=document.getElementById("tab-content"),a=(j.data.vendas||[]).filter(d=>d.status==="completed"||d.status==="paid"),s=a.reduce((d,u)=>d+(Number(u.totalAmount)||0),0),r=a.length,o=r>0?s/r:0;let i=0;const n={};a.forEach(d=>{(Array.isArray(d.items)?d.items:Array.isArray(d.services)?d.services:[]).forEach(c=>{const p=Number(c.quantity)||1;i+=p;const b=c.name||"Produto/Serviço Indefinido";n[b]=(n[b]||0)+p})});const l=Object.entries(n).sort((d,u)=>u[1]-d[1]).slice(0,5);t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-indigo-600 text-white p-3 rounded-xl shadow-sm flex flex-col"><span class="text-[9px] font-bold text-indigo-200 uppercase tracking-widest">Faturamento PDV</span><span class="text-lg md:text-xl font-black mt-0.5">${ce(s)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ticket Médio</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${ce(o)}</span></div>
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
                                        <p class="text-[9px] text-slate-400">${Pe(d.createdAt||d.date||"")}</p>
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
        </div>`,setTimeout(()=>{if(!window.Chart)return;const d=document.getElementById("chartVendas");d&&l.length>0?(jt("vendas"),j.charts.vendas=new Chart(d,{type:"bar",data:{labels:l.map(u=>u[0].substring(0,15)+"..."),datasets:[{label:"Quantidade Vendida",data:l.map(u=>u[1]),backgroundColor:"#f59e0b",borderRadius:3}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0,ticks:{stepSize:1,font:{size:9}}},y:{grid:{display:!1},ticks:{font:{size:9}}}}}})):d&&(d.parentElement.innerHTML='<div class="flex h-full items-center justify-center text-[10px] text-slate-400">Sem dados suficientes</div>')},100)}function sl(){const t=document.getElementById("tab-content"),e=j.data.estoque||[];let a=0,s=0,r=[],o=[];e.forEach(i=>{i.active!==!1&&s++;const n=Number(i.currentStock)||0,l=Number(i.minStock)||0,d=Number(i.costPrice)||Number(i.price)||0;n>0&&(a+=n*d),n<=0?o.push(i):n<=l&&r.push(i)}),t.innerHTML=`
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-indigo-600 text-white p-3 rounded-xl shadow-sm flex flex-col"><span class="text-[9px] font-bold text-indigo-200 uppercase tracking-widest">Imobilizado</span><span class="text-lg md:text-xl font-black mt-0.5">${ce(a)}</span></div>
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
        </div>`,setTimeout(()=>{if(!window.Chart)return;const i=document.getElementById("chartEstoque"),n=s-r.length-o.length;i&&(jt("estoque"),j.charts.estoque=new Chart(i,{type:"doughnut",data:{labels:["Saudável","Baixo","Esgotado"],datasets:[{data:[Math.max(0,n),r.length,o.length],backgroundColor:["#10b981","#f59e0b","#ef4444"],borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"70%",plugins:{legend:{position:"right",labels:{usePointStyle:!0,boxWidth:6,font:{size:10}}}}}}))},100)}function ol(){let t=document.getElementById("genericModal");t||(t=document.createElement("div"),t.id="genericModal",t.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",document.body.appendChild(t)),t.innerHTML=`
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
    `,t.style.display="block",setTimeout(()=>t.classList.add("show","opacity-100"),10);const e=t.querySelector(".btn-close-modal");e&&(e.onclick=()=>{t.style.display="none",t.classList.remove("show","opacity-100")}),rl()}async function rl(){const t=document.getElementById("movements-container"),e=Array.from(j.filterEstablishmentIds);try{let a=[];if((j.data.estoque||[]).slice(0,15).forEach(r=>{Math.random()>.4&&a.push({date:new Date(Date.now()-Math.random()*864e6).toISOString(),productName:r.name,type:Math.random()>.4?"out":"in",quantity:Math.floor(Math.random()*5)+1,reason:Math.random()>.5?"Venda PDV / Atendimento":"Ajuste Manual / Compra"})}),a.length===0){t.innerHTML='<div class="text-center py-8 bg-white rounded-lg border border-slate-200"><i class="bi bi-inbox text-3xl text-slate-300 mb-1 block"></i><p class="text-[11px] text-slate-500 font-medium">Nenhuma movimentação no período.</p></div>';return}a.sort((s,r)=>new Date(r.date)-new Date(s.date)),t.innerHTML=`
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
                                <td class="py-2 px-3 text-slate-600 whitespace-nowrap text-[11px]">${Pe(s.date)} <span class="text-[9px] text-slate-400 ml-1">${new Date(s.date).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</span></td>
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
        `}catch(a){console.error("Erro ao carregar movimentações:",a),t.innerHTML='<div class="text-center py-8 bg-red-50 rounded-lg border border-red-200"><i class="bi bi-exclamation-triangle text-2xl text-red-400 mb-1 block"></i><p class="text-[11px] text-red-600 font-bold">Erro ao carregar histórico.</p></div>'}}function il(){Ft&&Xa.removeEventListener("click",Ft),Ft=t=>{const e=t.target,a=e.closest(".tab-btn");if(a){document.querySelectorAll(".tab-btn").forEach(o=>{o.classList.remove("active","bg-indigo-600","text-white","shadow-md","border-transparent"),o.classList.add("bg-slate-50","text-slate-600","border-slate-200","hover:bg-slate-100")}),a.classList.remove("bg-slate-50","text-slate-600","border-slate-200","hover:bg-slate-100"),a.classList.add("active","bg-indigo-600","text-white","shadow-md","border-transparent"),j.currentTab=a.dataset.tab,j.drillDownMonth=null,xt();return}if(e.closest("#btn-historico-movimentacoes")){ol();return}const r=e.closest("button[data-action]");if(r){const o=r.dataset.action;if(o==="apply-filters")j.startDate=document.getElementById("report-start").value,j.endDate=document.getElementById("report-end").value,j.drillDownMonth=null,xt();else if(o==="preset-date"){const i=r.dataset.preset,n=new Date;let l,d;i==="month"?(l=new Date(n.getFullYear(),n.getMonth(),1),d=new Date(n.getFullYear(),n.getMonth()+1,0)):i==="last_month"?(l=new Date(n.getFullYear(),n.getMonth()-1,1),d=new Date(n.getFullYear(),n.getMonth(),0)):i==="year"&&(l=new Date(n.getFullYear(),0,1),d=new Date(n.getFullYear(),11,31)),document.getElementById("report-start").value=l.toISOString().split("T")[0],document.getElementById("report-end").value=d.toISOString().split("T")[0],document.querySelectorAll("[data-preset]").forEach(u=>{u.classList.remove("bg-white","text-indigo-600","shadow-sm","border","border-slate-200"),u.classList.add("text-slate-500")}),r.classList.remove("text-slate-500"),r.classList.add("bg-white","text-indigo-600","shadow-sm","border","border-slate-200"),j.startDate=l.toISOString().split("T")[0],j.endDate=d.toISOString().split("T")[0],j.drillDownMonth=null,xt()}else o==="export-excel"&&nl()}},Xa.addEventListener("click",Ft),document.querySelectorAll(".est-filter-checkbox").forEach(t=>{t.addEventListener("change",e=>{const a=e.target.closest("label");e.target.checked?(j.filterEstablishmentIds.add(e.target.value),a.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50","text-indigo-700"),a.classList.remove("border-slate-200","text-slate-600")):(j.filterEstablishmentIds.delete(e.target.value),a.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50","text-indigo-700"),a.classList.add("border-slate-200","text-slate-600")),j.drillDownMonth=null,xt()})})}function nl(){if(typeof XLSX>"u"){f("Erro","A biblioteca XLSX não está disponível.","error");return}const{currentTab:t,data:e,startDate:a,endDate:s}=j;let r=[],o=`Relatorio_${t.toUpperCase()}_${a}_a_${s}.xlsx`;if(t==="financeiro"){if(!e.financeiro||!e.financeiro.payables.length&&!e.financeiro.receivables.length)return f("Aviso","Sem dados financeiros para exportar.","info");const i=new Map(j.establishments.map(d=>[d.id,d.name])),n=new Map(e.financeiro.natures.map(d=>[d.id,d.name]));r=[...e.financeiro.receivables.filter(d=>d.status==="paid").map(d=>({...d,tipo:"Receita"})),...e.financeiro.payables.filter(d=>d.status==="paid").map(d=>({...d,tipo:"Despesa"}))].map(d=>({Unidade:i.get(d.establishmentId)||"Atual","Data Pagamento":d.paymentDate?Pe(d.paymentDate):"-",Tipo:d.tipo,Descrição:d.description||"-","Natureza (DRE)":d.naturezaId?n.get(d.naturezaId)||"Outros":"Geral","Valor (R$)":d.amount||0}))}else if(t==="agenda"){if(!e.agenda||e.agenda.active.length===0)return f("Aviso","Sem dados de agenda.","info");r=e.agenda.active.map(i=>({Data:i.startTime?Pe(i.startTime):"-",Cliente:i.clientName||"Sem nome",Profissional:i.professionalName||"-",Status:i.status,"Valor Faturado (R$)":i.totalAmount||0}))}else if(t==="clientes"){if(!e.clientes||e.clientes.length===0)return f("Aviso","Sem dados de clientes.","info");r=e.clientes.map(i=>({"Data de Cadastro":i.createdAt?Pe(i.createdAt):"-",Nome:i.name||"-",Telefone:i.phone||"-","E-mail":i.email||"-","Última Visita":i.lastVisit?Pe(i.lastVisit):"-"}))}else if(t==="vendas"){if(!e.vendas||e.vendas.length===0)return f("Aviso","Sem dados de vendas.","info");r=e.vendas.map(i=>({"ID Venda":i.id||"-",Data:i.createdAt?Pe(i.createdAt):"-",Status:i.status||"-","Qtd Itens":(i.items||[]).length,"Faturamento (R$)":i.totalAmount||0}))}else if(t==="estoque"){if(!e.estoque||e.estoque.length===0)return f("Aviso","Sem dados de estoque.","info");r=e.estoque.map(i=>({Produto:i.name||"-","Código/SKU":i.sku||"-","Estoque Atual":i.currentStock||0,"Estoque Mínimo":i.minStock||0,"Preço Venda (R$)":i.price||0,Alerta:i.currentStock<=0?"Esgotado":i.currentStock<=i.minStock?"Baixo":"OK"}))}if(r.length===0)return f("Aviso","Nenhum dado válido para exportar.","info");try{const i=XLSX.utils.json_to_sheet(r),n=XLSX.utils.book_new();XLSX.utils.book_append_sheet(n,i,t.toUpperCase()),XLSX.writeFile(n,o)}catch(i){console.error("Erro na exportação Excel: ",i),f("Erro","Falha ao gerar o ficheiro Excel.","error")}}const Aa=(t,e="products")=>L(`/api/${e}/categories/${t}`),er=(t,e="products")=>L(`/api/${e}/categories`,{method:"POST",body:JSON.stringify(t)}),tr=(t,e="products")=>L(`/api/${e}/categories/${t}`,{method:"DELETE"}),ll="audit_logs",re=async(t,e,a,s,r,o=null)=>{try{if(!e)return;await ho(ka(xe,ll),{establishmentId:t,userId:e.uid,userName:e.name||e.email||"Utilizador",module:a,action:s,description:r,details:o,timestamp:new Date})}catch(i){console.error("Falha silenciosa ao registar log:",i)}},es=document.getElementById("content");let z={services:null,professionals:[],categories:[],hierarchyCache:[],statusFilter:"all",searchQuery:"",filterCategoryId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set,tempService:null},Rt=null,Ht=null;function tt(){const t=ye.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function ar(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[g.establishmentId]}function dl(){const t=document.getElementById("services-layout-detail"),e=document.getElementById("service-modal-inner");t&&e&&(t.classList.remove("hidden"),t.classList.add("flex"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("scale-95","translate-y-4"),e.classList.add("scale-100","translate-y-0")},10),document.body.style.overflow="hidden")}function Ot(){const t=document.getElementById("services-layout-detail"),e=document.getElementById("service-modal-inner");t&&e&&(t.classList.add("opacity-0"),e.classList.remove("scale-100","translate-y-0"),e.classList.add("scale-95","translate-y-4"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.body.style.overflow=""},300)),z.tempService=null}async function cl(){z.selectedIds.clear(),z.services=null;try{const t=await we();z.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}ul(),yl(),await it()}function ul(){es.innerHTML=`
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
                        <input type="text" id="searchInput" value="${z.searchQuery}" placeholder="Pesquisar serviço..." class="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-sm font-semibold text-slate-700">
                    </div>
                    
                    <div class="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
                        <button data-action="manage-categories" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95">
                            <i class="bi bi-tags text-base"></i> Categorias
                        </button>
                        <button id="toggle-filter-btn" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95 ${z.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                            <i class="bi bi-funnel text-base"></i> Filtros
                        </button>
                        <button data-action="open-service-editor" data-id="" class="py-2.5 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-500/30 flex items-center justify-center gap-2 text-xs active:scale-95 uppercase tracking-wider border border-indigo-500 col-span-2 md:col-span-1">
                            <i class="bi bi-plus-lg text-base"></i> Novo Serviço
                        </button>
                    </div>
                </div>

                <div id="filter-panel" class="${z.isAdvancedFilterOpen?"block":"hidden"} mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
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
                    <button data-status="all" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${z.statusFilter==="all"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Todos</button>
                    <button data-status="active" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${z.statusFilter==="active"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Ativos</button>
                    <button data-status="inactive" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${z.statusFilter==="inactive"?"bg-red-600 text-white border-red-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Inativos</button>
                </div>

                <div id="servicesList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                    ${or(8)}
                </div>
            </section>
        </div>

        <div id="services-layout-detail" class="hidden fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="service-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-4xl flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
                </div>
        </div>
    `}async function it(){const t=document.getElementById("servicesList"),e=ar();try{const a=e.map(c=>ut(c)),s=e.map(c=>Ee(c)),r=e.map(c=>Aa(c,"services")),o=await Promise.all(a),i=await Promise.all(s),n=await Promise.all(r),l=new Map;o.flat().filter(Boolean).forEach(c=>l.set(c.id,c)),z.services=Array.from(l.values()),g.services=z.services;const d=new Map;i.flat().filter(Boolean).forEach(c=>d.set(c.id,c)),z.professionals=Array.from(d.values()),g.professionals=z.professionals;const u=new Map;n.flat().filter(Boolean).forEach(c=>u.set(c.id,c)),z.categories=Array.from(u.values()),g.serviceCategories=z.categories,pl(),ht()}catch(a){console.error(a),t&&(t.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>')}}function pl(){const t=document.getElementById("filterCategoryId");t&&z.categories&&(t.innerHTML='<option value="all">Todas as categorias</option>',z.categories.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=v(e.name),z.filterCategoryId===e.id&&(a.selected=!0),t.appendChild(a)}))}function sr(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=z.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function bl(t){const e=document.getElementById("summary-section");if(!e)return;const a=t.length,s=t.filter(o=>o.active!==!1).length,r=a-s;e.innerHTML=`
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
            <span class="text-base md:text-2xl font-black text-red-500 mt-0.5 w-full truncate">${r}</span>
        </div>
        <div class="bg-indigo-50 p-2 md:p-4 rounded-xl border border-indigo-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-indigo-500 uppercase tracking-widest w-full truncate">Filtrados</span>
            <span class="text-base md:text-2xl font-black text-indigo-700 mt-0.5 w-full truncate">${t.length}</span>
        </div>
    `}function ht(){const t=document.getElementById("servicesList");if(!t)return;if(z.services===null){t.innerHTML=or(8);return}const e=ar(),a=z.services.filter(r=>{const o=r.name.toLowerCase().includes(z.searchQuery);let i=!0;z.statusFilter==="active"&&(i=r.active!==!1),z.statusFilter==="inactive"&&(i=r.active===!1);const n=z.filterCategoryId==="all"||r.categoryId===z.filterCategoryId,l=r.accessibleIn&&r.accessibleIn.length>0?r.accessibleIn:[r.establishmentId||g.establishmentId],d=e.some(u=>l.includes(u));return o&&i&&n&&d});if(bl(a),a.length===0){z.services.length===0?t.innerHTML=`
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
            `;return}const s=new Map((z.categories||[]).map(r=>[r.id,r.name]));t.innerHTML=a.map(r=>{const o=r.active===!1,i=v(r.name),n=v(s.get(r.categoryId)||"Sem Categoria"),l=r.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(r.name.charAt(0))}`,d=r.accessibleIn?r.accessibleIn.length:1,u=z.selectedIds.has(r.id),c=r.price!==void 0?parseFloat(r.price).toFixed(2):"0.00",p=r.color||"#4f46e5";return`
            <div class="service-card relative bg-white rounded-2xl border ${u?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-slate-200"} shadow-sm flex items-center p-3.5 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 active:scale-[0.98] ${o?"opacity-60 bg-slate-50":""}" 
                 data-action="open-service-editor" data-id="${r.id}">
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" data-action-stop-propagation="true">
                    <input type="checkbox" data-id="${r.id}" class="service-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${u?"checked":""}>
                </div>

                <div class="relative flex-shrink-0 mr-4">
                    <img src="${l}" alt="${i}" class="w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover shadow-sm" style="border-left: 3px solid ${p};">
                    <span class="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-2 border-white rounded-full ${o?"bg-red-500":"bg-emerald-500"}" title="${o?"Inativo":"Ativo"}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-6">
                    <h3 class="text-sm font-black text-slate-800 truncate leading-tight mb-0.5">
                        ${i}
                    </h3>
                    <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate mb-2">${n}</p>
                    
                    <div class="flex items-center justify-between mt-1">
                        <span class="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 shadow-sm">R$ ${c}</span>
                        <div class="flex gap-1.5">
                            <span class="text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200 flex items-center gap-1"><i class="bi bi-clock"></i> ${r.duration}m</span>
                            ${d>1?`<span class="text-[9px] font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded-md border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${d}</span>`:""}
                        </div>
                    </div>
                </div>
            </div>`}).join("")}function or(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center p-3.5 animate-pulse h-[86px]">
            <div class="w-14 h-14 rounded-xl bg-slate-200 flex-shrink-0 mr-4"></div>
            <div class="flex-1 space-y-2">
                <div class="h-3 bg-slate-200 rounded w-3/4"></div>
                <div class="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}async function ml(t){t.preventDefault();const e=t.target.closest("#categoryForm"),a=e.querySelector("#categoryName"),s=a.value;if(!s)return;const r=e.querySelector('button[type="submit"]');r.disabled=!0,r.innerHTML='<i class="bi bi-hourglass-split"></i>...';try{const o=z.hierarchyCache.reduce((i,n)=>(i.push(n.id),n.branches&&n.branches.forEach(l=>i.push(l.id)),i),[]);o.length===0&&o.push(g.establishmentId),await er({establishmentId:g.establishmentId,name:s,accessibleIn:o},"services"),re(g.establishmentId,tt(),"Categorias (Serviços)","Criou",`Criou categoria: ${s}`),a.value="",f("Sucesso","Categoria criada!","success"),await ks(),await it()}catch(o){f("Erro",`Não foi possível criar a categoria: ${o.message}`,"error")}finally{r.disabled=!1,r.innerHTML='<i class="bi bi-plus-lg"></i>'}}async function gl(t){if(await Q("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await tr(t,"services"),re(g.establishmentId,tt(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${t})`),f("Sucesso","Categoria apagada.","success"),await ks(),await it()}catch{f("Erro","Não foi possível apagar a categoria.","error")}}async function ks(){const t=document.getElementById("categoryList");if(t){t.innerHTML='<div class="loader mx-auto my-4 border-indigo-500"></div>';try{const e=await Aa(g.establishmentId,"services");z.categories=e,e.length>0?t.innerHTML=e.map(a=>`
                <div class="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 mb-2 shadow-sm">
                    <span class="text-xs font-black text-slate-700 uppercase tracking-widest">${v(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-white w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-600 rounded-lg transition-colors border border-red-100 active:scale-95"><i class="bi bi-trash3 pointer-events-none"></i></button>
                </div>`).join(""):t.innerHTML='<div class="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200"><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhuma categoria criada.</p></div>'}catch{t.innerHTML='<p class="text-red-500 text-center text-[10px] font-bold p-4 bg-red-50 rounded-xl">Erro ao carregar categorias.</p>'}}}function fl(){Ne({title:"Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-md"});const e=document.getElementById("genericModal");if(e){const a=e.querySelector("#categoryForm");a&&(a.addEventListener("submit",ml),e.addEventListener("click",s=>{const r=s.target.closest('button[data-action="delete-category"]');r&&(s.preventDefault(),gl(r.dataset.id))}))}ks()}function xl(t=[]){if(!z.hierarchyCache||z.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${g.establishmentId}">
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 text-center">
                <i class="bi bi-info-circle text-2xl block mb-2 text-slate-400"></i> Exclusivo desta unidade.
            </div>`;let e='<div class="space-y-2 mt-1 max-h-48 overflow-y-auto custom-scrollbar pr-2">';return z.hierarchyCache.forEach(a=>{const s=t.includes(a.id)||t.length===0&&a.id===g.establishmentId;e+=`
            <label class="flex items-center space-x-3 p-3 cursor-pointer bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-colors shadow-sm">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-xs md:text-sm font-black text-slate-800">🏢 ${v(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(r=>{const o=t.includes(r.id)||t.length===0&&r.id===g.establishmentId;e+=`
                    <label class="flex items-center space-x-3 p-3 ml-8 cursor-pointer bg-white hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl transition-colors border-l-4 border-l-indigo-200 shadow-sm">
                        <input type="checkbox" name="accessibleIn" value="${r.id}" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                        <span class="text-xs font-bold text-slate-600">📍 ${v(r.name)}</span>
                    </label>
                `})}),e+="</div>",e}function hl(t){z.viewMode="edit-service";const e=document.getElementById("service-modal-inner");if(!e)return;let a={name:"",active:!0,duration:30,price:0};if(t){const T=z.services?.find(M=>String(M.id)===String(t));T&&(a=JSON.parse(JSON.stringify(T)))}z.tempService=a;const s=!!a.id,r=z.categories||[],o=a.duration||30,i=a.bufferTime||0,n=v(a.name||""),l=v(a.notes||""),d=v(a.publicDescription||""),u=s?n:"Novo Serviço",c=a.color||"#4f46e5",p=a.loyaltyPoints||0,b=r.map(T=>`<option value="${T.id}" ${a.categoryId===T.id?"selected":""}>${v(T.name)}</option>`).join(""),m=a.photo||`https://placehold.co/150x150/E2E8F0/4A5568?text=${encodeURIComponent(n?n.charAt(0):"S")}`,h=`
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
        ${h}
        
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
                                    <input type="number" id="serviceBufferTimeMinutes" min="0" value="${i}" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner" placeholder="Ex: 10 (limpeza)">
                                </div>
                            </div>
                            
                            <div class="pt-4 border-t border-slate-100 mt-2">
                                <label class="block text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-1.5 ml-1 flex items-center gap-2"><i class="bi bi-diagram-3 text-sm"></i> Lojas que oferecem este serviço</label>
                                ${xl(a.accessibleIn||[])}
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
    `,e.querySelectorAll(".tab-link").forEach(T=>{T.addEventListener("click",M=>{M.preventDefault(),e.querySelectorAll(".tab-link").forEach(R=>{R.classList.remove("active","border-indigo-600","text-indigo-600"),R.classList.add("border-transparent","text-slate-400")}),T.classList.add("active","border-indigo-600","text-indigo-600"),T.classList.remove("border-transparent","text-slate-400"),e.querySelectorAll(".tab-content").forEach(R=>R.classList.add("hidden")),e.querySelector("#"+T.dataset.tab).classList.remove("hidden")})});const y=e.querySelectorAll('input[name="commissionType"]'),k=e.querySelector("#defaultCommissionRateContainer"),A=e.querySelector("#professionalCommissionsContainer");function P(){const T=e.querySelector('input[name="commissionType"]:checked').value;k&&(k.style.display=T==="default"?"block":"none"),A&&(A.style.display=T==="custom"?"block":"none")}y.forEach(T=>T.addEventListener("change",P));const S=e.querySelector("#professionalCommissionsList");S&&(S.innerHTML=(z.professionals||[]).map(T=>{const M=a.professionalCommissions?.[T.id]!==void 0,R=a.professionalCommissions?.[T.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:bg-slate-50 transition-colors ${M?"bg-indigo-50/50 border-indigo-100 shadow-sm":""}" data-prof-id="${T.id}">
                    <label class="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                        <input type="checkbox" ${M?"checked":""} class="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 shadow-sm cursor-pointer">
                        <img src="${T.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${v(T.name.charAt(0))}`}" class="w-10 h-10 rounded-full object-cover border border-white shadow-sm flex-shrink-0">
                        <span class="text-xs font-black text-slate-800 truncate uppercase tracking-widest">${v(T.name)}</span>
                    </label>
                    <div class="flex items-center gap-1.5 ml-3">
                        <input type="number" value="${R}" step="0.1" class="w-20 p-2 border border-slate-300 rounded-lg text-sm font-bold text-center outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-inner transition-shadow" ${M?"":"disabled"}>
                        <span class="text-[10px] font-black text-slate-400">%</span>
                    </div>
                </div>
            `}).join(""),S.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.addEventListener("change",M=>{const R=M.target.closest(".professional-commission-row"),X=R.querySelector('input[type="number"]');X.disabled=!M.target.checked,R.classList.toggle("bg-indigo-50/50",M.target.checked),R.classList.toggle("border-indigo-100",M.target.checked),R.classList.toggle("shadow-sm",M.target.checked),R.classList.toggle("border-transparent",!M.target.checked),M.target.checked&&X.focus()})})),P();const I=e.querySelector("#servicePhotoInput"),N=e.querySelector("#servicePhotoButton"),U=e.querySelector("#servicePhotoContainer"),C=e.querySelector("#servicePhotoPreview"),D=e.querySelector("#servicePhotoBase64"),V=()=>I.click();N&&N.addEventListener("click",V),U&&U.addEventListener("click",V),I.onchange=async()=>{const T=I.files[0];if(T){C.src="https://placehold.co/150x150/E2E8F0/4A5568?text=...";try{const M=await Sa(T,800,800,.8);if(M.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");C.src=M,D.value=M}catch(M){f("Erro de Imagem",M.message,"error"),C.src=m,D.value=a.photo||""}}},dl()}function vl(){Q("Excluir em Lote",`Tem certeza que deseja excluir ${z.selectedIds.size} serviços da rede? Esta ação não pode ser desfeita.`).then(async t=>{if(t)try{const e=Array.from(z.selectedIds).map(a=>Ho(a));await Promise.all(e),re(g.establishmentId,tt(),"Serviços","Excluiu em Lote",`Excluiu ${z.selectedIds.size} serviços`),f("Sucesso",`${z.selectedIds.size} serviços foram excluídos.`,"success"),z.selectedIds.clear(),sr(),it()}catch(e){f("Erro",`Não foi possível excluir em lote: ${e.message}`,"error")}})}function yl(){Rt&&document.body.removeEventListener("click",Rt),Ht&&es.removeEventListener("input",Ht),Rt=async t=>{if(t.target.classList.contains("service-checkbox")){const o=t.target.dataset.id;t.target.checked?z.selectedIds.add(o):z.selectedIds.delete(o),sr(),t.stopPropagation();return}const e=t.target.closest(".status-filter-btn");if(e){z.statusFilter=e.dataset.status,document.querySelectorAll(".status-filter-btn").forEach(o=>{o.classList.remove("bg-indigo-600","text-white","border-indigo-600","bg-red-600","border-red-600"),o.classList.add("bg-white","text-slate-600","border-slate-200")}),z.statusFilter==="inactive"?(e.classList.remove("bg-white","text-slate-600","border-slate-200"),e.classList.add("bg-red-600","text-white","border-red-600")):(e.classList.remove("bg-white","text-slate-600","border-slate-200"),e.classList.add("bg-indigo-600","text-white","border-indigo-600")),ht();return}if(t.target.id==="clear-filters-btn"){t.preventDefault(),document.getElementById("filterCategoryId").value="all",z.filterCategoryId="all",ht();return}if(t.target.id==="apply-filter-btn"){t.preventDefault(),z.filterCategoryId=document.getElementById("filterCategoryId").value,ht();return}const a=t.target.closest("#toggle-filter-btn");if(a){t.preventDefault(),z.isAdvancedFilterOpen=!z.isAdvancedFilterOpen;const o=document.getElementById("filter-panel");z.isAdvancedFilterOpen?(o.classList.remove("hidden"),o.classList.add("block"),a.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.remove("bg-white","text-slate-700","border-slate-200")):(o.classList.add("hidden"),o.classList.remove("block"),a.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),a.classList.add("bg-white","text-slate-700","border-slate-200"));return}if(t.target.id==="services-layout-detail"){Ot();return}const s=t.target.closest("[data-action]");if(!s)return;const r=s.dataset.action;switch(["close-detail-screen","delete-service","save-service","manage-categories","open-service-editor","batch-delete"].includes(r)&&t.stopPropagation(),r){case"manage-categories":fl();break;case"open-service-editor":hl(s.dataset.id);break;case"close-detail-screen":Ot();break;case"batch-delete":vl();break;case"delete-service":{const o=s.dataset.id;if(!o)return;if(await Q("Apagar Serviço","Tem certeza que deseja excluir este serviço da rede?"))try{const n=z.services.find(l=>l.id===o)?.name||"Desconhecido";await Ho(o),re(g.establishmentId,tt(),"Serviços","Excluiu",`Excluiu o serviço: ${n}`),f("Sucesso","Serviço apagado da rede.","success"),Ot(),await it()}catch(n){f("Erro",`Não foi possível apagar o serviço: ${n.message}`,"error")}break}case"save-service":{t.preventDefault();const o=document.getElementById("serviceForm");if(!o.reportValidity())return;const i=s,n=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{const l=o.querySelector("#serviceId").value,d=o.querySelector('input[name="commissionType"]:checked').value,u={};d==="custom"&&o.querySelectorAll(".professional-commission-row").forEach(m=>{const h=m.dataset.profId;if(m.querySelector('input[type="checkbox"]').checked){const k=parseFloat(m.querySelector('input[type="number"]').value);u[h]=isNaN(k)?0:k}});const c=Array.from(o.querySelectorAll('input[name="accessibleIn"]:checked')).map(m=>m.value),p=c.length>0?c:[g.establishmentId],b={...z.tempService,establishmentId:g.establishmentId,accessibleIn:p,name:o.querySelector("#serviceName").value.trim(),price:parseFloat(o.querySelector("#servicePrice").value),duration:parseInt(o.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(o.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:o.querySelector("#serviceCategory").value||null,color:o.querySelector("#serviceColor").value,targetAudience:o.querySelector("#serviceAudience").value,loyaltyPoints:parseInt(o.querySelector("#serviceLoyaltyPoints").value,10)||0,publicDescription:o.querySelector("#servicePublicDescription").value.trim(),homeService:o.querySelector("#serviceHomeToggle").checked,commissionRate:parseFloat(o.querySelector("#serviceCommissionRate").value)||0,active:o.querySelector("#serviceStatusToggle").checked,photo:o.querySelector("#servicePhotoBase64").value,notes:o.querySelector("#serviceNotes").value,commissionType:d,professionalCommissions:u};l?(await rn(l,b),re(g.establishmentId,tt(),"Serviços","Editou",`Editou o serviço: ${b.name}`),f("Sucesso","Serviço atualizado com sucesso!","success")):(delete b.id,await on(b),re(g.establishmentId,tt(),"Serviços","Criou",`Criou novo serviço: ${b.name}`),f("Sucesso","Serviço adicionado à rede!","success")),Ot(),await it()}catch(l){f("Erro",l.message,"error"),i.disabled=!1,i.innerHTML=n}break}}},document.body.addEventListener("click",Rt),Ht=t=>{t.target.id==="searchInput"&&(z.searchQuery=t.target.value,ht())},es.addEventListener("input",Ht)}const Ba="suppliers",Mt=async t=>{try{const e=vo(ka(xe,Ba),yo("establishmentId","==",t)),a=await Vr(e),s=[];return a.forEach(r=>{s.push({id:r.id,...r.data()})}),s}catch(e){throw console.error("Erro ao buscar fornecedores:",e),e}},wl=async t=>{try{return{id:(await ho(ka(xe,Ba),t)).id,...t}}catch(e){throw console.error("Erro ao criar fornecedor:",e),e}},kl=async(t,e)=>{try{const a=Be(xe,Ba,t);return await Tt(a,e),{id:t,...e}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},Sl=async t=>{try{const e=Be(xe,Ba,t);return await Ur(e),!0}catch(e){throw console.error("Erro ao excluir fornecedor:",e),e}},ts=document.getElementById("content");let $={products:null,categories:[],suppliers:[],hierarchyCache:[],allMovements:[],currentTab:"catalogo",stockFilter:"all",searchQuery:"",filterCategoryId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set,selectedMovementIds:new Set,tempProduct:null,tempSupplierIds:new Set},zt=null,_t=null;function ze(){const t=ye.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function Ss(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[g.establishmentId]}function Ra(t){return t?t._seconds?new Date(t._seconds*1e3):t.seconds?new Date(t.seconds*1e3):new Date(t):new Date}function $l(){const t=document.getElementById("products-layout-detail"),e=document.getElementById("product-modal-inner");t&&e&&(t.classList.remove("hidden"),t.classList.add("flex"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("scale-95","translate-y-4"),e.classList.add("scale-100","translate-y-0")},10),document.body.style.overflow="hidden")}function sa(){const t=document.getElementById("products-layout-detail"),e=document.getElementById("product-modal-inner");t&&e&&(t.classList.add("opacity-0"),e.classList.remove("scale-100","translate-y-0"),e.classList.add("scale-95","translate-y-4"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.body.style.overflow=""},300)),$.tempProduct=null,$.tempSupplierIds.clear()}function Il(){const t=document.getElementById("movement-layout-detail"),e=document.getElementById("movement-modal-inner");t&&e&&(t.classList.remove("hidden"),t.classList.add("flex"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("scale-95","translate-y-4"),e.classList.add("scale-100","translate-y-0")},10),document.body.style.overflow="hidden")}function as(){const t=document.getElementById("movement-layout-detail"),e=document.getElementById("movement-modal-inner");t&&e&&(t.classList.add("opacity-0"),e.classList.remove("scale-100","translate-y-0"),e.classList.add("scale-95","translate-y-4"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.body.style.overflow=""},300))}async function El(){$.selectedIds.clear(),$.selectedMovementIds.clear(),$.currentTab="catalogo",$.products=null;try{const t=await we();$.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}rr(),Nl(),await $e()}function rr(){ts.innerHTML=`
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

        <div id="products-layout-detail" class="hidden fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="product-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-4xl flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
            </div>
        </div>

        <div id="movement-layout-detail" class="hidden fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="movement-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-lg flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
            </div>
        </div>
    `,Ll()}function Ll(){const t=document.getElementById("main-tab-content");if(t){if($.currentTab==="catalogo")t.innerHTML=`
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
                ${nr(8)}
            </div>

            <button data-action="open-product-editor" data-id="" class="md:hidden fixed bottom-20 right-4 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-500/40 flex items-center justify-center hover:bg-indigo-700 transition-all z-40 active:scale-95 border border-indigo-500">
                <i class="bi bi-plus-lg text-2xl pointer-events-none"></i>
            </button>
        `;else if($.currentTab==="movimentacoes"){const e=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const s=a.toISOString().split("T")[0],r=($.products||[]).map(i=>`<option value="${i.id}">${v(i.name)}</option>`).join(""),o=($.categories||[]).map(i=>`<option value="${i.id}">${v(i.name)}</option>`).join("");t.innerHTML=`
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
                                <option value="all">Todos os produtos</option>${r}
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
        `,document.getElementById("btn-generate-report").addEventListener("click",ba),ba()}}}async function $e(){const t=Ss();try{const e=t.map(n=>pt(n)),a=t.map(n=>Aa(n,"products")),[s,r]=await Promise.all([Promise.all(e),Promise.all(a)]),o=new Map;s.flat().filter(Boolean).forEach(n=>o.set(n.id,n)),$.products=Array.from(o.values()),g.products=$.products;const i=new Map;r.flat().filter(Boolean).forEach(n=>i.set(n.id,n)),$.categories=Array.from(i.values()),g.categories=$.categories,$.currentTab==="catalogo"?(ir(),Fe()):$.currentTab==="movimentacoes"&&ba(),$.suppliers=[],t.forEach(async n=>{try{let l=[];typeof Mt=="function"&&(l=await Mt(n)),l.forEach(d=>{$.suppliers.find(u=>u.id===d.id)||$.suppliers.push(d)}),g.suppliers=$.suppliers}catch(l){console.warn("Aviso: Falha ao carregar fornecedores em background.",l)}})}catch(e){console.error("Erro detalhado ao carregar produtos:",e);const a=document.getElementById("productsList");a&&(a.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>')}}function ir(){const t=document.getElementById("filterCategoryId");t&&$.categories&&(t.innerHTML='<option value="all">Todas as categorias</option>',$.categories.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=v(e.name),$.filterCategoryId===e.id&&(a.selected=!0),t.appendChild(a)}))}function ss(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=$.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function kt(){const t=document.getElementById("movement-batch-action-bar"),e=document.getElementById("mov-selected-count"),a=$.selectedMovementIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function Cl(t){const e=document.getElementById("summary-section");if(!e)return;let a=t.length,s=0,r=0,o=0,i=0;t.forEach(n=>{const l=n.currentStock||0,d=n.minStock||0;n.active!==!1&&n.price&&l>0&&(i+=n.price*l),l<=0?o++:d>0&&l<=d||d>0&&l<=d*1.2?r++:s++}),e.innerHTML=`
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
            <span class="text-base md:text-2xl font-black text-amber-500 mt-0.5 w-full truncate">${r}</span>
        </div>
        <div class="bg-red-50 p-2 md:p-4 rounded-xl border border-red-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-red-500 uppercase tracking-widest w-full truncate">Esgotados</span>
            <span class="text-base md:text-2xl font-black text-red-600 mt-0.5 w-full truncate">${o}</span>
        </div>
    `}function Fe(){const t=document.getElementById("productsList");if(!t)return;if($.products===null){t.innerHTML=nr(8);return}const e=Ss(),a=$.products.filter(r=>{const o=r.name.toLowerCase().includes($.searchQuery)||r.sku&&r.sku.toLowerCase().includes($.searchQuery)||r.barcode&&r.barcode.toLowerCase().includes($.searchQuery),i=r.currentStock||0,n=r.minStock||0;let l=!0;$.stockFilter==="ok"&&(l=i>0&&(n===0||i>n*1.2)),$.stockFilter==="alert"&&(l=n>0&&i>0&&i<=n*1.2),$.stockFilter==="empty"&&(l=i<=0);const d=$.filterCategoryId==="all"||r.categoryId===$.filterCategoryId,u=r.accessibleIn&&r.accessibleIn.length>0?r.accessibleIn:[r.establishmentId||g.establishmentId],c=e.some(p=>u.includes(p));return o&&l&&d&&c});if(Cl(a),a.length===0){$.products.length===0?t.innerHTML=`
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
            `;return}const s=new Map(($.categories||[]).map(r=>[r.id,r.name]));t.innerHTML=a.map(r=>{const o=v(r.name),i=v(s.get(r.categoryId)||"Sem Categoria"),n=r.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(r.name.charAt(0))}`,l=r.accessibleIn?r.accessibleIn.length:1,d=$.selectedIds.has(r.id),u=r.price!==void 0?parseFloat(r.price).toFixed(2):"0.00",c=r.currentStock||0,p=r.minStock||0;let b="bg-emerald-500",m=!1,h=`<span class="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1"><i class="bi bi-box-seam"></i> ${c} un</span>`;return c<=0?(b="bg-red-500",m=!0,h='<span class="text-[9px] font-bold bg-red-50 text-red-700 px-1.5 py-0.5 rounded-md border border-red-100 flex items-center gap-1"><i class="bi bi-exclamation-triangle"></i> Sem Estoque</span>'):p>0&&c<=p*1.2&&(b="bg-amber-500",h=`<span class="text-[9px] font-bold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md border border-amber-100 flex items-center gap-1"><i class="bi bi-exclamation-circle"></i> Baixo (${c})</span>`),r.active===!1&&(m=!0,b="bg-slate-400"),`
            <div class="product-card relative bg-white rounded-2xl border ${d?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-slate-200"} shadow-sm flex items-center p-4 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 active:scale-[0.98] ${m?"opacity-70 bg-slate-50":""}" 
                 data-action="open-product-editor" data-id="${r.id}">
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" data-action-stop-propagation="true">
                    <input type="checkbox" data-id="${r.id}" class="product-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${d?"checked":""}>
                </div>

                <div class="relative flex-shrink-0 mr-4">
                    <img src="${n}" alt="${o}" class="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover border border-slate-100 shadow-sm">
                    <span class="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-2 border-white rounded-full ${b}" title="Estoque: ${c}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-6">
                    <h3 class="text-sm font-black text-slate-800 truncate leading-tight mb-1">
                        ${o}
                    </h3>
                    <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate mb-2">${i}</p>
                    
                    <div class="flex items-center justify-between mt-1">
                        <span class="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100 shadow-sm">R$ ${u}</span>
                        <div class="flex gap-1.5">
                            ${h}
                            ${l>1?`<span class="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md border border-slate-200 flex items-center gap-1" title="${l} Lojas"><i class="bi bi-diagram-3"></i></span>`:""}
                        </div>
                    </div>
                </div>
            </div>`}).join("")}function nr(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center p-4 animate-pulse h-[98px]">
            <div class="w-14 h-14 rounded-xl bg-slate-200 flex-shrink-0 mr-4"></div>
            <div class="flex-1 space-y-3">
                <div class="h-3 bg-slate-200 rounded w-3/4"></div>
                <div class="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}async function Dl(t){t.preventDefault();const e=t.target.closest("#categoryForm"),a=e.querySelector("#categoryName"),s=a.value;if(!s)return;const r=e.querySelector('button[type="submit"]');r.disabled=!0,r.innerHTML='<i class="bi bi-hourglass-split"></i>...';try{const o=$.hierarchyCache.reduce((i,n)=>(i.push(n.id),n.branches&&n.branches.forEach(l=>i.push(l.id)),i),[]);o.length===0&&o.push(g.establishmentId),await er({establishmentId:g.establishmentId,name:s,accessibleIn:o},"products"),re(g.establishmentId,ze(),"Categorias (Produtos)","Criou",`Criou categoria: ${s}`),a.value="",f("Sucesso","Categoria criada!","success"),await $s(),await $e()}catch(o){f("Erro",`Não foi possível criar a categoria: ${o.message}`,"error")}finally{r.disabled=!1,r.innerHTML='<i class="bi bi-plus-lg"></i>'}}async function Pl(t){if(await Q("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await tr(t,"products"),re(g.establishmentId,ze(),"Categorias (Produtos)","Excluiu",`Excluiu uma categoria (ID: ${t})`),f("Sucesso","Categoria apagada.","success"),await $s(),await $e()}catch{f("Erro","Não foi possível apagar a categoria.","error")}}async function $s(){const t=document.getElementById("categoryList");if(t){t.innerHTML='<div class="loader mx-auto my-4 border-indigo-500"></div>';try{const e=await Aa(g.establishmentId,"products");$.categories=e,e.length>0?t.innerHTML=e.map(a=>`
                <div class="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 mb-2 shadow-sm">
                    <span class="text-xs font-black text-slate-700 uppercase tracking-widest">${v(a.name)}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-white w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-600 rounded-lg transition-colors border border-red-100 active:scale-95"><i class="bi bi-trash3 pointer-events-none"></i></button>
                </div>`).join(""):t.innerHTML='<div class="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200"><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhuma categoria criada.</p></div>'}catch{t.innerHTML='<p class="text-red-500 text-center text-[10px] font-bold p-4 bg-red-50 rounded-xl">Erro ao carregar categorias.</p>'}}}function Tl(){Ne({title:"Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-md"});const e=document.getElementById("genericModal");if(e){const a=e.querySelector("#categoryForm");a&&(a.addEventListener("submit",Dl),e.addEventListener("click",s=>{const r=s.target.closest('button[data-action="delete-category"]');r&&(s.preventDefault(),Pl(r.dataset.id))}))}$s()}function Ml(){const t=($.products||[]).map(i=>`<option value="${i.id}">${v(i.name)} (Estoque: ${i.currentStock||0})</option>`).join(""),e=$.hierarchyCache.reduce((i,n)=>(i.push(`<option value="${n.id}">🏢 ${v(n.name)}</option>`),n.branches&&n.branches.forEach(l=>i.push(`<option value="${l.id}">📍 ${v(l.name)}</option>`)),i),[]).join(""),a=document.getElementById("movement-modal-inner"),s=`
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
    `;a.innerHTML=s,Il();const r=document.getElementById("movEstablishmentId");r&&(r.value=g.establishmentId);const o=document.getElementById("newMovementForm");o.onsubmit=async i=>{i.preventDefault();const n=a.querySelector('button[type="submit"]'),l=n.innerHTML,d=document.getElementById("movProductId")?.value,u=document.getElementById("movEstablishmentId")?.value,c=o.querySelector('input[name="movType"]:checked')?.value,p=parseInt(document.getElementById("movAmount")?.value,10),b=document.getElementById("movReason")?.value.trim();if(!d||!p||p<=0||!b||!u){f("Erro","Preencha todos os campos corretamente.","warning");return}const m=c==="in"?p:-p;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> Salvando...';try{await Ta(d,{change:m,reason:b,establishmentId:u});const h=$.products.find(y=>y.id===d)?.name||"Produto";re(u,ze(),"Estoque","Ajuste Manual",`Lançou movimentação (${m>0?"+":""}${m}) para ${h}`),f("Sucesso","Movimentação registrada com sucesso!","success"),as(),await $e()}catch(h){f("Erro",h.message,"error"),n.disabled=!1,n.innerHTML=l}}}function Al(t=[]){if(!$.hierarchyCache||$.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${g.establishmentId}">
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 text-center">
                <i class="bi bi-info-circle text-2xl block mb-2 text-slate-400"></i> Exclusivo desta unidade.
            </div>`;let e='<div class="space-y-2 mt-1 max-h-48 overflow-y-auto custom-scrollbar pr-2">';return $.hierarchyCache.forEach(a=>{const s=t.includes(a.id)||t.length===0&&a.id===g.establishmentId;e+=`
            <label class="flex items-center space-x-3 p-3 cursor-pointer bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-colors shadow-sm">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-xs md:text-sm font-black text-slate-800">🏢 ${v(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(r=>{const o=t.includes(r.id)||t.length===0&&r.id===g.establishmentId;e+=`
                    <label class="flex items-center space-x-3 p-3 ml-8 cursor-pointer bg-white hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl transition-colors border-l-4 border-l-indigo-200 shadow-sm">
                        <input type="checkbox" name="accessibleIn" value="${r.id}" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                        <span class="text-xs font-bold text-slate-600">📍 ${v(r.name)}</span>
                    </label>
                `})}),e+="</div>",e}function Bl(t){$.viewMode="edit-product";const e=document.getElementById("product-modal-inner");if(!e)return;let a={name:"",active:!0,price:0,costPrice:0,currentStock:0,minStock:0,maxStock:0,supplierIds:[]};if(t){const T=$.products?.find(M=>String(M.id)===String(t));T&&(a=JSON.parse(JSON.stringify(T)))}$.tempProduct=a,$.tempSupplierIds=new Set(a.supplierIds||[]);const s=!!a.id,r=$.categories||[],o=v(a.name||""),i=v(a.sku||""),n=v(a.barcode||""),l=v(a.description||""),d=s?o:"Novo Produto",u=a.price!==void 0?a.price:"",c=a.costPrice!==void 0?a.costPrice:"",p=a.commissionRate!==void 0?a.commissionRate:"",b=a.currentStock||0,m=a.minStock||0;a.maxStock;const h=r.map(T=>`<option value="${T.id}" ${a.categoryId===T.id?"selected":""}>${v(T.name)}</option>`).join(""),y=a.photo||`https://placehold.co/150x150/E2E8F0/4A5568?text=${encodeURIComponent(o?o.charAt(0):"P")}`,k=`
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
        ${k}
        
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
                                        ${h}
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="productSku" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">SKU (Código Interno)</label>
                                    <input type="text" id="productSku" value="${i}" placeholder="Ex: POM-MAT-01" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner">
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
                                ${Al(a.accessibleIn||[])}
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
    `,e.querySelectorAll(".tab-link").forEach(T=>{T.addEventListener("click",M=>{M.preventDefault(),e.querySelectorAll(".tab-link").forEach(R=>{R.classList.remove("active","border-indigo-600","text-indigo-600"),R.classList.add("border-transparent","text-slate-400")}),T.classList.add("active","border-indigo-600","text-indigo-600"),T.classList.remove("border-transparent","text-slate-400"),e.querySelectorAll(".tab-content").forEach(R=>R.classList.add("hidden")),e.querySelector("#"+T.dataset.tab).classList.remove("hidden")})});const A=()=>{const T=document.getElementById("modalSupplierSearch"),M=document.getElementById("supplierSearchResults"),R=document.getElementById("selectedSuppliersList"),X=T?.value.toLowerCase()||"",te=$.suppliers||[];if(X.length>0){const ie=te.filter(Z=>Z.name.toLowerCase().includes(X)&&!$.tempSupplierIds.has(Z.id));ie.length>0?(M.classList.remove("hidden"),M.innerHTML=ie.map(Z=>`
                    <div class="p-3.5 hover:bg-indigo-50 cursor-pointer border-b border-slate-100 last:border-0 flex justify-between items-center transition-colors" data-add-supplier="${Z.id}">
                        <span class="font-bold text-xs text-slate-700 uppercase tracking-widest">${v(Z.name)}</span>
                        <span class="text-indigo-600 text-[10px] font-black px-2 py-1 bg-indigo-100 rounded-md uppercase tracking-widest pointer-events-none">+ Adicionar</span>
                    </div>
                `).join("")):(M.classList.remove("hidden"),M.innerHTML='<div class="p-4 text-xs font-bold text-slate-500 text-center uppercase tracking-widest">Fornecedor não encontrado.</div>')}else M&&M.classList.add("hidden");$.tempSupplierIds.size>0?(R.classList.remove("justify-center"),R.classList.add("justify-start"),R.innerHTML="",$.tempSupplierIds.forEach(ie=>{const Z=te.find(q=>q.id===ie);Z&&(R.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border border-slate-200 p-3.5 rounded-xl shadow-sm hover:border-indigo-200 transition-colors" data-id="${Z.id}">
                            <div>
                                <p class="font-black text-slate-800 text-xs uppercase tracking-widest mb-1">${v(Z.name)}</p>
                                <p class="text-[9px] font-bold text-slate-500 uppercase tracking-widest"><i class="bi bi-person mr-1"></i> ${v(Z.contactName||"N/I")} | <i class="bi bi-telephone mr-1"></i> ${v(Z.phone||"N/I")}</p>
                            </div>
                            <button type="button" class="text-slate-400 hover:text-red-600 w-10 h-10 flex items-center justify-center hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 active:scale-95" data-remove-supplier="${Z.id}" title="Remover">
                                <i class="bi bi-trash3 pointer-events-none"></i>
                            </button>
                        </div>
                    `)})):(R.classList.add("justify-center"),R.classList.remove("justify-start"),R.innerHTML='<p class="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest">Nenhum fornecedor adicionado ainda.</p>')},P=document.getElementById("modalSupplierSearch");P&&P.addEventListener("input",A),A();const S=e.querySelector("#productPhotoInput"),I=e.querySelector("#productPhotoButton"),N=e.querySelector("#productPhotoContainer"),U=e.querySelector("#productPhotoPreview"),C=e.querySelector("#productPhotoBase64"),D=()=>S?.click();I&&I.addEventListener("click",D),N&&N.addEventListener("click",D),S&&(S.onchange=async()=>{const T=S.files[0];if(!T)return;const M=U.src;U.src="https://placehold.co/150x150/E2E8F0/4A5568?text=...";try{const R=await Sa(T,800,800,.8);if(R.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");U.src=R,C.value=R}catch(R){f("Erro de Imagem",R.message,"error"),U.src=M,C.value=a?.photo||""}});const V=document.getElementById("productForm");V&&(V.onsubmit=async T=>{T.preventDefault();const M=e.querySelector('button[type="submit"]'),R=M.innerHTML,X=document.getElementById("productName"),te=document.getElementById("productPrice");if(!X?.value||!te?.value){f("Aviso","Preencha o Nome e o Preço do produto.","warning");return}const ie=parseInt(document.getElementById("productCurrentStock")?.value||"0",10),Z=parseInt(document.getElementById("productMinStock")?.value||"0",10),q=Array.from(document.querySelectorAll('#productForm input[name="accessibleIn"]:checked')).map(W=>W.value),ee=q.length>0?q:[g.establishmentId],le={...$.tempProduct,establishmentId:g.establishmentId,accessibleIn:ee,name:X.value.trim(),sku:document.getElementById("productSku")?.value.trim()||"",barcode:document.getElementById("productBarcode")?.value.trim()||"",price:parseFloat(te.value),costPrice:parseFloat(document.getElementById("productCostPrice")?.value)||0,commissionRate:parseFloat(document.getElementById("productCommissionRate")?.value)||0,currentStock:isNaN(ie)?0:ie,minStock:isNaN(Z)?0:Z,categoryId:document.getElementById("productCategory")?.value||null,photo:document.getElementById("productPhotoBase64")?.value||"",description:document.getElementById("productDescription")?.value.trim()||"",active:document.getElementById("productStatusToggle")?.checked!==!1,supplierIds:Array.from($.tempSupplierIds)};M.disabled=!0,M.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> A gravar...';try{s?(await Go(t,le),re(g.establishmentId,ze(),"Produtos","Editou",`Editou o produto: ${le.name}`),f("Sucesso","Produto atualizado com sucesso!","success")):(delete le.id,await Qo(le),re(g.establishmentId,ze(),"Produtos","Criou",`Criou novo produto: ${le.name}`),f("Sucesso","Produto adicionado à rede!","success")),sa(),await $e()}catch(W){f("Erro",W.message,"error"),M.disabled=!1,M.innerHTML=R}}),$l()}async function jl(){if(!($.selectedIds.size===0||!await Q("Excluir Produtos",`Tem a certeza que deseja excluir ${$.selectedIds.size} produtos do seu inventário?`)))try{const e=Array.from($.selectedIds).map(a=>vs(a));await Promise.all(e),f("Sucesso","Produtos excluídos com sucesso.","success"),$.selectedIds.clear(),ss(),await $e()}catch(e){f("Erro","Não foi possível apagar os produtos: "+e.message,"error")}}async function ql(){if(!($.selectedMovementIds.size===0||!await Q("Estornar e Excluir",`Deseja excluir as ${$.selectedMovementIds.size} movimentações selecionadas? O saldo de stock será estornado/devolvido ao sistema automaticamente.`)))try{const e=Array.from($.selectedMovementIds).map(async a=>{const s=$.allMovements.find(r=>r.id===a);s&&await Ta(s.productId,{change:-s.change,reason:"Estorno automático de exclusão em lote",establishmentId:s.establishmentId})});await Promise.all(e),f("Sucesso","Movimentações excluídas e stocks estornados.","success"),$.selectedMovementIds.clear(),kt(),ba()}catch(e){f("Erro","Ocorreu um erro ao estornar em lote: "+e.message,"error")}}async function ba(){const t=document.getElementById("report-results");if(!t)return;t.innerHTML='<div class="flex items-center justify-center h-full"><div class="loader"></div></div>',$.selectedMovementIds.clear(),kt();const e={startDate:document.getElementById("reportStartDate")?.value||"",endDate:document.getElementById("reportEndDate")?.value||"",productId:document.getElementById("productFilterReport")?.value||"all",categoryId:document.getElementById("categoryFilterReport")?.value||"all"};try{const s=Ss().map(n=>Yo({...e,establishmentId:n}).catch(l=>[])),r=await Promise.all(s);let o=[];if(r.forEach(n=>{if(!n)return;const l=Array.isArray(n)?n:Array.isArray(n.data)?n.data:Array.isArray(n.movements)?n.movements:[];o=o.concat(l)}),o.sort((n,l)=>Ra(l.date)-Ra(n.date)),$.allMovements=o,o.length===0){t.innerHTML=`
                <div class="flex flex-col items-center justify-center h-full py-16">
                    <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-slate-200">
                        <i class="bi bi-inboxes text-3xl text-slate-300"></i>
                    </div>
                    <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhuma movimentação no período</h3>
                    <p class="text-[10px] text-slate-500 max-w-xs text-center font-medium">Tente alterar as datas ou limpar os filtros de produto.</p>
                </div>`;return}const i=`
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
                        ${o.map(n=>{const l=n.change>0,d=l?"text-emerald-700 bg-emerald-50 border-emerald-200":"text-red-700 bg-red-50 border-red-200",u=l?'<i class="bi bi-arrow-down-left"></i>':'<i class="bi bi-arrow-up-right"></i>',c=$.selectedMovementIds.has(n.id),p=c?"bg-indigo-50/30":"hover:bg-slate-50/50",b=Ra(n.date),m=b.toLocaleDateString("pt-BR"),h=b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});return`
                            <tr class="transition-colors ${p}">
                                <td class="px-5 py-3 w-10 text-center">
                                    <input type="checkbox" class="movement-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" data-id="${n.id}" ${c?"checked":""}>
                                </td>
                                <td class="px-5 py-3 whitespace-nowrap">
                                    <p class="text-xs font-black text-slate-700">${m}</p>
                                    <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">${h}</p>
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
            </div>`;t.innerHTML=i}catch(a){f("Erro",`Não foi possível gerar: ${a.message}`,"error"),t.innerHTML='<div class="p-8 text-center text-red-500 font-bold bg-red-50 rounded-xl m-4 border border-red-100">Falha ao buscar movimentações.</div>'}}function Nl(){const t=document.getElementById("multi-context-apply");t&&(t.removeEventListener("click",$e),t.addEventListener("click",()=>{setTimeout($e,100)})),zt&&document.body.removeEventListener("click",zt),_t&&ts.removeEventListener("input",_t),zt=async e=>{const a=e.target.closest("[data-main-tab]");if(a){$.currentTab=a.dataset.mainTab,rr(),$.currentTab==="catalogo"&&$.products!==null&&(ir(),Fe());return}if(e.target.classList.contains("product-checkbox")){const c=e.target.dataset.id;e.target.checked?$.selectedIds.add(c):$.selectedIds.delete(c),ss(),e.stopPropagation();return}if(e.target.closest("#cancel-selection-btn")){$.selectedIds.clear(),ss(),Fe();return}if(e.target.classList.contains("movement-checkbox")){const c=e.target.dataset.id;e.target.checked?$.selectedMovementIds.add(c):$.selectedMovementIds.delete(c),kt();const p=e.target.closest("tr");e.target.checked?(p.classList.add("bg-indigo-50/30"),p.classList.remove("hover:bg-slate-50/50")):(p.classList.remove("bg-indigo-50/30"),p.classList.add("hover:bg-slate-50/50")),e.stopPropagation();return}if(e.target.id==="selectAllMovements"){const c=document.querySelectorAll(".movement-checkbox"),p=e.target.checked;c.forEach(b=>{b.checked=p;const m=b.dataset.id;p?$.selectedMovementIds.add(m):$.selectedMovementIds.delete(m);const h=b.closest("tr");p?(h.classList.add("bg-indigo-50/30"),h.classList.remove("hover:bg-slate-50/50")):(h.classList.remove("bg-indigo-50/30"),h.classList.add("hover:bg-slate-50/50"))}),kt(),e.stopPropagation();return}if(e.target.closest("#cancel-mov-selection-btn")){$.selectedMovementIds.clear(),kt();const c=document.getElementById("selectAllMovements");c&&(c.checked=!1),document.querySelectorAll(".movement-checkbox").forEach(p=>{p.checked=!1;const b=p.closest("tr");b.classList.remove("bg-indigo-50/30"),b.classList.add("hover:bg-slate-50/50")});return}const o=e.target.closest(".status-filter-btn");if(o){$.stockFilter=o.dataset.status,document.querySelectorAll(".status-filter-btn").forEach(c=>{c.classList.remove("bg-indigo-600","text-white","border-indigo-600","bg-emerald-600","border-emerald-600","bg-amber-500","border-amber-500","bg-red-600","border-red-600"),c.classList.add("bg-white","text-slate-600","border-slate-200")}),$.stockFilter==="ok"?o.classList.add("bg-emerald-600","text-white","border-emerald-600"):$.stockFilter==="alert"?o.classList.add("bg-amber-500","text-white","border-amber-500"):$.stockFilter==="empty"?o.classList.add("bg-red-600","text-white","border-red-600"):o.classList.add("bg-indigo-600","text-white","border-indigo-600"),o.classList.remove("bg-white","text-slate-600","border-slate-200"),Fe();return}if(e.target.id==="clear-filters-btn"){e.preventDefault(),document.getElementById("filterCategoryId").value="all",$.filterCategoryId="all",Fe();return}if(e.target.id==="apply-filter-btn"){e.preventDefault(),$.filterCategoryId=document.getElementById("filterCategoryId").value,Fe();return}const i=e.target.closest("#toggle-filter-btn");if(i){e.preventDefault(),$.isAdvancedFilterOpen=!$.isAdvancedFilterOpen;const c=document.getElementById("filter-panel");$.isAdvancedFilterOpen?(c.classList.remove("hidden"),c.classList.add("block"),i.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),i.classList.remove("bg-white","text-slate-700","border-slate-200")):(c.classList.add("hidden"),c.classList.remove("block"),i.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),i.classList.add("bg-white","text-slate-700","border-slate-200"));return}if(e.target.id==="products-layout-detail"){sa();return}if(e.target.id==="movement-layout-detail"){as();return}const n=e.target.closest("[data-add-supplier]");if(n){$.tempSupplierIds.add(n.dataset.addSupplier);const c=document.getElementById("modalSupplierSearch");c&&(c.value=""),c.dispatchEvent(new Event("input"));return}const l=e.target.closest("[data-remove-supplier]");if(l){$.tempSupplierIds.delete(l.dataset.removeSupplier);const c=document.getElementById("modalSupplierSearch");c&&c.dispatchEvent(new Event("input"));return}const d=e.target.closest("[data-action]");if(!d)return;const u=d.dataset.action;switch(["close-detail-screen","close-movement-modal","delete-product","manage-categories","open-product-editor","batch-delete","open-new-movement-modal","batch-delete-movements"].includes(u)&&e.stopPropagation(),u){case"manage-categories":Tl();break;case"open-product-editor":Bl(d.dataset.id);break;case"close-detail-screen":sa();break;case"close-movement-modal":as();break;case"batch-delete":jl();break;case"batch-delete-movements":ql();break;case"open-new-movement-modal":Ml();break;case"delete-movement":{const c=d.dataset.id,p=d.dataset.productId,b=d.dataset.estId;if(!c)return;const m=$.allMovements.find(y=>y.id===c);if(!m){f("Aviso","Não foi possível ler os detalhes desta movimentação.","warning");return}if(await Q("Estornar e Apagar Movimentação","Tem a certeza que deseja excluir esta movimentação? O saldo de stock será devolvido ao produto de forma automática."))try{throw await Ta(p,{change:-m.change,reason:"Estorno automático de exclusão de movimento",establishmentId:b}),new Error("A função de excluir movimentação ainda não está implementada no servidor.");re(g.establishmentId,ze(),"Estoque","Excluiu Movimento",`Excluiu e estornou a movimentação ID: ${c}`),f("Sucesso","Movimentação excluída e saldo de stock estornado.","success"),await $e()}catch(y){f("Erro",y.message,"error")}break}case"delete-product":{const c=d.dataset.id;if(!c)return;if(await Q("Apagar Produto","Tem certeza que deseja excluir este produto do estoque?"))try{const b=$.products.find(m=>m.id===c)?.name||"Desconhecido";await vs(c),re(g.establishmentId,ze(),"Produtos","Excluiu",`Excluiu o produto: ${b}`),f("Sucesso","Produto removido do estoque.","success"),sa(),await $e()}catch(b){f("Erro",`Não foi possível apagar o produto: ${b.message}`,"error")}break}}},document.body.addEventListener("click",zt),_t=e=>{e.target.id==="searchInput"&&($.searchQuery=e.target.value,Fe())},ts.addEventListener("input",_t)}const oa=document.getElementById("content");let J={partners:[],establishments:[],searchQuery:"",categoryFilter:"all",stateFilter:"all",cityFilter:"",sortBy:"name_asc",hasSearched:!1,viewMode:"list",editingItem:null},Vt=null;const ma={contas_fixas:{label:"Contas Fixas (Água, Luz)",color:"blue",icon:"bi-lightning-charge"},estoque:{label:"Fornecedor de Produtos",color:"emerald",icon:"bi-box-seam"},servicos:{label:"Prestador de Serviço",color:"purple",icon:"bi-tools"},impostos:{label:"Governo / Impostos",color:"red",icon:"bi-bank"},outros:{label:"Outros Parceiros",color:"gray",icon:"bi-person-vcard"}},lr=["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];async function Fl(){try{const e=(await we()).matrizes||[];J.establishments=[],e.forEach(a=>{J.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>J.establishments.push({id:s.id,name:s.name,type:"Filial"}))})}catch(t){console.warn("Erro ao buscar lojas",t)}J.viewMode="list",J.editingItem=null,J.hasSearched=!1,J.partners=[],Rl(),Ul(),dr()}function Rl(){oa.innerHTML=`
        <div class="flex flex-col h-full bg-gray-50 w-full relative min-h-0 overflow-hidden">
            
            <div id="suppliers-list-view" class="w-full h-full flex flex-col transition-all duration-300 ${J.viewMode==="list"?"flex":"hidden"} p-2 md:p-4 md:pl-6 relative">
                
                <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full animate-fade-in">
                    <div></div> <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                        <button data-action="new-partner" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                            <i class="bi bi-plus-lg"></i> Novo Parceiro
                        </button>
                    </div>
                </div>

                ${Hl()}

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
    `}function Hl(){const t=Object.entries(ma).map(([a,s])=>`<option value="${a}">${s.label}</option>`).join(""),e=lr.map(a=>`<option value="${a}">${a}</option>`).join("");return`
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
    `}function Ol(t=null){const e=!!t;let a=t?.category||"";a==="Produtos"&&(a="estoque"),a==="Serviços"&&(a="servicos");const s=Object.entries(ma).map(([i,n])=>`<option value="${i}" ${a===i?"selected":""}>${n.label}</option>`).join(""),r=lr.map(i=>`<option value="${i}" ${t?.state===i?"selected":""}>${i}</option>`).join(""),o=document.getElementById("form-container-wrapper");o&&(o.innerHTML=`
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
                                    ${r}
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
    `,document.getElementById("partner-form").addEventListener("submit",_l))}function dr(){const t=document.getElementById("partners-grid");t&&(t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-xl w-full max-w-2xl mx-auto shadow-sm mt-4">
                <div class="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3 border border-indigo-100 shadow-inner">
                    <i class="bi bi-search text-xl text-indigo-400"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-800 mb-1">Pronto para pesquisar</h3>
                <p class="text-[10px] text-gray-500 font-medium max-w-sm text-center">Utilize os filtros acima e clique em "Buscar" para listar os parceiros registados no sistema.</p>
            </div>
        `)}async function zl(){const t=document.getElementById("partners-grid");if(!J.hasSearched){dr();return}t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="text-xs text-gray-500 mt-4 font-medium">Buscando parceiros...</p></div>';try{const e=await Mt(g.establishmentId);J.partners=e||[],cr()}catch(e){t.innerHTML=`<div class="text-center py-10 text-red-500 text-sm font-bold">Erro ao carregar parceiros: ${e.message}</div>`}}function cr(){const t=document.getElementById("partners-grid");if(!t)return;let e=J.partners;if(J.searchQuery){const r=J.searchQuery.toLowerCase();e=e.filter(o=>o.name.toLowerCase().includes(r)||o.document&&o.document.includes(r)||o.taxId&&o.taxId.includes(r)||o.email&&o.email.toLowerCase().includes(r)||o.contactName&&o.contactName.toLowerCase().includes(r))}if(J.categoryFilter!=="all"&&(e=e.filter(r=>r.category===J.categoryFilter)),J.stateFilter!=="all"&&(e=e.filter(r=>r.state===J.stateFilter)),J.cityFilter){const r=J.cityFilter.toLowerCase();e=e.filter(o=>o.city&&o.city.toLowerCase().includes(r))}if(e.sort((r,o)=>{let i="",n="";return J.sortBy==="name_asc"||J.sortBy==="name_desc"?(i=(r.name||"").toLowerCase(),n=(o.name||"").toLowerCase()):J.sortBy==="contact_asc"&&(i=(r.contactName||"").toLowerCase(),n=(o.contactName||"").toLowerCase()),J.sortBy==="name_desc"?n.localeCompare(i):i.localeCompare(n)}),e.length===0){t.innerHTML=`
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
    `,s='<div class="flex flex-col gap-2 md:hidden p-2">';e.forEach(r=>{let o=r.category;o==="Produtos"&&(o="estoque"),o==="Serviços"&&(o="servicos");const i=ma[o]||ma.outros,n=r.document||r.taxId?r.document||r.taxId:"-",l=JSON.stringify(r).replace(/'/g,"&apos;"),d=[r.city,r.state].filter(Boolean).join(" - ");a+=`
            <tr class="hover:bg-gray-50 cursor-pointer transition-colors group" data-action="open-form" data-item='${l}'>
                <td class="px-3 py-2 text-center">
                    <div class="w-8 h-8 mx-auto rounded-lg bg-${i.color}-100 text-${i.color}-600 flex items-center justify-center text-sm shadow-sm" title="${i.label}">
                        <i class="bi ${i.icon}"></i>
                    </div>
                </td>
                <td class="px-3 py-2">
                    <p class="font-bold text-gray-800 text-xs group-hover:text-indigo-700 transition-colors">${v(r.name)}</p>
                    ${r.email?`<p class="text-[9px] text-gray-500 mt-0.5 truncate max-w-[200px]"><i class="bi bi-envelope mr-1 opacity-50"></i>${v(r.email)}</p>`:""}
                </td>
                <td class="px-3 py-2 text-xs font-medium text-gray-600">${v(n)}</td>
                <td class="px-3 py-2">
                    <div class="text-xs font-medium text-gray-800">${v(r.contactName||"-")}</div>
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
                        <h3 class="font-bold text-gray-900 text-xs leading-tight truncate">${v(r.name)}</h3>
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
        `}),a+="</tbody></table></div>",s+="</div>",t.innerHTML=a+s}function St(t,e=null){const a=document.getElementById("suppliers-list-view"),s=document.getElementById("suppliers-form-view");J.viewMode=t,J.editingItem=e,t==="list"?(a.classList.remove("hidden"),a.classList.add("flex"),s.classList.add("hidden"),s.innerHTML='<div id="form-container-wrapper" class="max-w-4xl mx-auto w-full"></div>',J.hasSearched&&cr(),window.scrollTo({top:0,behavior:"smooth"})):(a.classList.add("hidden"),a.classList.remove("flex"),s.classList.remove("hidden"),Ol(e),window.scrollTo({top:0,behavior:"smooth"}))}async function _l(t){t.preventDefault();const e=t.target,a=e.querySelector("#supId").value,s={name:e.querySelector("#supName").value,contactName:e.querySelector("#supContact").value,email:e.querySelector("#supEmail").value,phone:e.querySelector("#supPhone").value,document:e.querySelector("#supTaxId").value,category:e.querySelector("#supCategory").value,state:e.querySelector("#supState").value,city:e.querySelector("#supCity").value,establishmentId:g.establishmentId,notes:e.querySelector("#supNotes")?.value||"",accessibleIn:[g.establishmentId]},r=e.querySelector('button[type="submit"]'),o=r.innerHTML;r.disabled=!0,r.innerHTML='<div class="loader-small border-white"></div> A gravar...';try{a?(await kl(a,s),f("Sucesso","Ficha atualizada!","success")):(await wl(s),f("Sucesso","Parceiro registado!","success")),J.hasSearched&&(J.partners=await Mt(g.establishmentId)||[]),St("list")}catch(i){f("Erro","Falha ao gravar: "+i.message,"error"),r.disabled=!1,r.innerHTML=o}}async function Vl(t){if(await Q("Excluir Parceiro","Deseja realmente apagar esta ficha permanentemente?"))try{await Sl(t),f("Sucesso","Entidade excluída.","success"),J.partners=J.partners.filter(a=>a.id!==t),St("list")}catch(a){f("Erro","Erro ao excluir: "+a.message,"error")}}function Ul(){Vt&&oa.removeEventListener("click",Vt),Vt=async t=>{const e=t.target;if(e.closest('button[data-action="new-partner"]')){St("form",null);return}if(e.closest("#btn-search-partners")){J.searchQuery=document.getElementById("filterSearch").value,J.categoryFilter=document.getElementById("filterCategory").value,J.stateFilter=document.getElementById("filterState").value,J.cityFilter=document.getElementById("filterCity").value,J.sortBy=document.getElementById("filterSortBy").value,J.hasSearched=!0,zl();return}if(e.closest('button[data-action="back-to-list"]')){St("list");return}const a=e.closest('button[data-action="delete-partner"]');if(a){t.preventDefault(),Vl(a.dataset.id);return}const s=e.closest('[data-action="open-form"]');if(s&&!e.closest("button")){const r=JSON.parse(s.dataset.item.replace(/&apos;/g,"'"));St("form",r)}},oa.addEventListener("click",Vt),oa.addEventListener("keypress",t=>{t.key==="Enter"&&(t.target.id==="filterSearch"||t.target.id==="filterCity")&&document.getElementById("btn-search-partners").click()})}const os=document.getElementById("content"),Ws={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let _={professionals:null,services:[],hierarchyCache:[],statusFilter:"all",searchQuery:"",filterServiceId:"all",isAdvancedFilterOpen:!1,selectedIds:new Set,viewMode:"list",tempProf:null},Ut=null,Wt=null;function ra(){const t=ye.currentUser;return t?{uid:t.uid,name:t.displayName||t.email}:{uid:"unknown",name:"Desconhecido"}}function ur(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[g.establishmentId]}function Wl(){const t=document.getElementById("professionals-layout-detail"),e=document.getElementById("prof-modal-inner");t&&e&&(t.classList.remove("hidden"),t.classList.add("flex"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("scale-95","translate-y-4"),e.classList.add("scale-100","translate-y-0")},10),document.body.style.overflow="hidden")}function Jt(){const t=document.getElementById("professionals-layout-detail"),e=document.getElementById("prof-modal-inner");t&&e&&(t.classList.add("opacity-0"),e.classList.remove("scale-100","translate-y-0"),e.classList.add("scale-95","translate-y-4"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.body.style.overflow=""},300)),_.viewMode="list"}async function Jl(){_.selectedIds.clear(),_.viewMode="list",_.professionals=null;try{const t=await we();_.hierarchyCache=t.matrizes||[]}catch(t){console.warn("Erro ao buscar lojas",t)}Ql(),od(),await ga()}function Ql(){os.innerHTML=`
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
                        <input type="text" id="searchInput" value="${_.searchQuery}" placeholder="Nome ou especialidade..." class="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-sm font-semibold text-slate-700">
                    </div>
                    
                    <div class="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
                        <button id="toggle-filter-btn" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95 ${_.isAdvancedFilterOpen?"bg-indigo-50 text-indigo-700 border-indigo-200":""}">
                            <i class="bi bi-funnel text-base"></i> Filtros
                        </button>
                        <button data-action="open-professional-editor" data-id="" class="py-2.5 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-500/30 flex items-center justify-center gap-2 text-xs active:scale-95 uppercase tracking-wider border border-indigo-500">
                            <i class="bi bi-person-plus-fill text-base"></i> Criar Perfil
                        </button>
                    </div>
                </div>

                <div id="filter-panel" class="${_.isAdvancedFilterOpen?"block":"hidden"} mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
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
                    <button data-status="all" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${_.statusFilter==="all"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Todos</button>
                    <button data-status="active" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${_.statusFilter==="active"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Ativos</button>
                    <button data-status="inactive" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${_.statusFilter==="inactive"?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}">Inativos</button>
                </div>

                <div id="professionalsList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                    ${br(8)}
                </div>
            </section>
        </div>

        <div id="professionals-layout-detail" class="hidden fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="prof-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-5xl flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
                </div>
        </div>
    `}async function ga(){const t=document.getElementById("professionalsList"),e=ur();try{const a=e.map(l=>Ee(l)),s=e.map(l=>ut(l)),r=await Promise.all(a),o=await Promise.all(s),i=new Map;r.flat().forEach(l=>i.set(l.id,l)),_.professionals=Array.from(i.values()),g.professionals=_.professionals;const n=new Map;o.flat().forEach(l=>n.set(l.id,l)),_.services=Array.from(n.values()),Gl(),vt()}catch(a){console.error(a),t&&(t.innerHTML='<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>')}}function Gl(){const t=document.getElementById("filterServiceId");t&&_.services&&(t.innerHTML='<option value="all">Todos os serviços</option>',_.services.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=v(e.name),_.filterServiceId===e.id&&(a.selected=!0),t.appendChild(a)}))}function pr(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=_.selectedIds.size;!t||!e||(a>0?(e.textContent=a,t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function Yl(t){const e=document.getElementById("summary-section");if(!e)return;const a=t.length,s=t.filter(o=>o.status!=="inactive").length,r=a-s;e.innerHTML=`
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
            <span class="text-base md:text-2xl font-black text-red-500 mt-0.5 w-full truncate">${r}</span>
        </div>
        <div class="bg-indigo-50 p-2 md:p-4 rounded-xl border border-indigo-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-indigo-500 uppercase tracking-widest w-full truncate">Exibidos</span>
            <span class="text-base md:text-2xl font-black text-indigo-700 mt-0.5 w-full truncate">${t.length}</span>
        </div>
    `}function vt(){const t=document.getElementById("professionalsList");if(!t)return;if(_.professionals===null){t.innerHTML=br(8);return}const e=ur(),a=_.professionals.filter(s=>{const r=s.name.toLowerCase().includes(_.searchQuery)||s.specialty&&s.specialty.toLowerCase().includes(_.searchQuery);let o=!0;_.statusFilter==="active"&&(o=s.status!=="inactive"),_.statusFilter==="inactive"&&(o=s.status==="inactive");const i=_.filterServiceId==="all"||s.services&&s.services.includes(_.filterServiceId),n=s.accessibleIn&&s.accessibleIn.length>0?s.accessibleIn:[s.establishmentId||g.establishmentId],l=e.some(d=>n.includes(d));return r&&o&&i&&l});if(Yl(a),a.length===0){_.professionals.length===0?t.innerHTML=`
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
            `;return}t.innerHTML=a.map(s=>{const r=s.status==="inactive",o=v(s.name),i=v(s.specialty||"Especialidade"),n=s.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(s.name?s.name.charAt(0):"P")}`,l=s.accessibleIn?s.accessibleIn.length:1,d=s.services?s.services.length:0,u=_.selectedIds.has(s.id);return`
            <div class="professional-card relative bg-white rounded-2xl border ${u?"border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20":"border-slate-200"} shadow-sm flex items-center p-4 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 active:scale-[0.98] ${r?"opacity-60 bg-slate-50":""}" 
                 data-action="open-professional-editor" data-id="${s.id}">
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" data-action-stop-propagation="true">
                    <input type="checkbox" data-id="${s.id}" class="professional-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${u?"checked":""}>
                </div>

                <div class="relative flex-shrink-0 mr-4">
                    <img src="${n}" alt="${o}" class="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border border-slate-100 shadow-sm">
                    <span class="absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full ${r?"bg-red-500":"bg-emerald-500"}" title="${r?"Inativo":"Ativo"}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-6">
                    <h3 class="text-sm font-black text-slate-800 truncate leading-tight mb-1">${o}</h3>
                    <p class="text-[10px] font-bold text-slate-500 truncate uppercase tracking-widest mb-2">${i}</p>
                    
                    <div class="flex items-center gap-1.5 mt-1">
                        ${l>1?`<span class="text-[9px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${l}</span>`:'<span class="text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1"><i class="bi bi-geo-alt"></i> Única</span>'}
                        <span class="text-[9px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1" title="${d} serviços habilitados"><i class="bi bi-scissors text-indigo-400"></i> ${d}</span>
                    </div>
                </div>
            </div>`}).join("")}function br(t=8){let e="";for(let a=0;a<t;a++)e+=`
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center p-4 animate-pulse h-[98px]">
            <div class="w-14 h-14 rounded-full bg-slate-200 flex-shrink-0 mr-4"></div>
            <div class="flex-1 space-y-3">
                <div class="h-3 bg-slate-200 rounded w-3/4"></div>
                <div class="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return e}async function Xl(t){_.viewMode="edit-professional";const e=document.getElementById("prof-modal-inner");if(!e)return;let a={name:"",specialty:"",status:"active",workingHours:{},services:[]};if(t){const i=_.professionals.find(n=>String(n.id)===String(t));i&&(a=JSON.parse(JSON.stringify(i)))}_.tempProf=a;const s=!!a.id,r=v(a.name||"Novo Profissional"),o=`
        <div class="p-4 md:p-5 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition-colors active:scale-95 mr-4">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <div>
                <h3 class="font-black text-sm md:text-base text-slate-800 uppercase tracking-wider truncate leading-tight">${s?"Editar Perfil":"Novo Perfil"}</h3>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">${s?r:"Configuração de Atendimento"}</p>
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
    `,Zl(a,_.services),ed(a),await ad(a,_.professionals),sd(a),Wl()}function Zl(t,e){const a=document.getElementById("dados-basicos"),s=document.getElementById("atuacao");if(!a||!s)return;const r=t.dob?t.dob.split("/"):["",""],o=Array.from({length:12},(u,c)=>{const p=c+1,b=p==r[1]?"selected":"",m=new Date(0,c).toLocaleString("pt-BR",{month:"long"});return`<option value="${p}" ${b}>${m.charAt(0).toUpperCase()+m.slice(1)}</option>`}).join(""),i=v(t.name||""),n=v(t.specialty||""),l=v(t.phone||""),d=v(t.notes||"");a.innerHTML=`
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
                        <input type="text" id="profName" value="${i}" required class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
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
                        <input type="number" id="profDobDay" value="${r[0]}" min="1" max="31" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
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
                    ${Kl(t.accessibleIn||[])}
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
    `}function Kl(t=[]){if(!_.hierarchyCache||_.hierarchyCache.length===0)return`
            <input type="hidden" name="accessibleIn" value="${g.establishmentId}">
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 text-center">
                <i class="bi bi-info-circle text-2xl block mb-2 text-slate-400"></i> Exclusivo desta unidade.
            </div>`;let e='<div class="space-y-2 mt-1">';return _.hierarchyCache.forEach(a=>{const s=t.includes(a.id)||t.length===0&&a.id===g.establishmentId;e+=`
            <label class="flex items-center space-x-3 p-3 cursor-pointer bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-colors shadow-sm">
                <input type="checkbox" name="accessibleIn" value="${a.id}" class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${s?"checked":""}>
                <span class="text-xs md:text-sm font-black text-slate-800">🏢 ${v(a.name)}</span>
            </label>
        `,a.branches&&a.branches.length>0&&a.branches.forEach(r=>{const o=t.includes(r.id)||t.length===0&&r.id===g.establishmentId;e+=`
                    <label class="flex items-center space-x-3 p-3 ml-8 cursor-pointer bg-white hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl transition-colors border-l-4 border-l-indigo-200 shadow-sm">
                        <input type="checkbox" name="accessibleIn" value="${r.id}" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${o?"checked":""}>
                        <span class="text-xs font-bold text-slate-600">📍 ${v(r.name)}</span>
                    </label>
                `})}),e+="</div>",e}function ed(t){const e=document.getElementById("jornada");e&&(e.innerHTML=`
        <div class="bg-white p-5 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div class="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div class="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100"><i class="bi bi-clock-history text-2xl"></i></div>
                <div>
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-0.5">Jornada Semanal</h3>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Defina os dias e os horários de atendimento.</p>
                </div>
            </div>
            <div id="profScheduleContainer" class="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
        </div>`,td(e.querySelector("#profScheduleContainer"),t.workingHours||{}))}function td(t,e){t.innerHTML=Object.keys(Ws).map(a=>{const s=e[a]||{},r=s.active!==!1;return`
            <div class="day-schedule-card p-4 md:p-5 rounded-2xl ${r?"bg-white border-slate-200 shadow-sm":"bg-slate-50 border-slate-100 disabled opacity-60"} border transition-all">
                 <div class="flex justify-between items-center mb-4">
                    <span class="font-black text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2"><i class="bi bi-calendar-day text-slate-400"></i> ${Ws[a]}</span>
                    <label class="flex items-center cursor-pointer">
                        <div class="relative">
                            <input type="checkbox" data-day="${a}" data-field="active" class="sr-only" ${r?"checked":""}>
                            <div class="toggle-bg block bg-slate-200 w-12 h-6 rounded-full peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full shadow-inner"></div>
                        </div>
                    </label>
                 </div>
                <div class="time-inputs grid grid-cols-2 gap-3 text-sm">
                    <div><label class="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5 ml-1">Abertura</label><input type="time" data-day="${a}" data-field="start" value="${s.start||"09:00"}" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner transition-shadow" ${r?"":"disabled"}></div>
                    <div><label class="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5 ml-1">Fecho</label><input type="time" data-day="${a}" data-field="end" value="${s.end||"18:00"}" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner transition-shadow" ${r?"":"disabled"}></div>
                    <div><label class="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5 ml-1">Início Pausa</label><input type="time" data-day="${a}" data-field="breakStart" value="${s.breakStart||"12:00"}" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner transition-shadow" ${r?"":"disabled"}></div>
                    <div><label class="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5 ml-1">Fim Pausa</label><input type="time" data-day="${a}" data-field="breakEnd" value="${s.breakEnd||"13:00"}" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner transition-shadow" ${r?"":"disabled"}></div>
                </div>
            </div>`}).join(""),t.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",s=>{const r=s.target.closest(".day-schedule-card"),o=!s.target.checked;r.classList.toggle("bg-white",!o),r.classList.toggle("shadow-sm",!o),r.classList.toggle("border-slate-200",!o),r.classList.toggle("bg-slate-50",o),r.classList.toggle("border-slate-100",o),r.classList.toggle("opacity-60",o),r.classList.toggle("disabled",o),r.querySelectorAll(".time-inputs input").forEach(i=>i.disabled=o)})})}async function ad(t,e){const a=document.getElementById("bloqueios");if(!a)return;a.innerHTML=`
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
        </div>`;const s=document.getElementById("batchBlockageForm");s&&s.addEventListener("submit",async o=>{o.preventDefault();const i=s.querySelector('button[type="submit"]'),n=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';const l=Array.from(o.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(h=>h.value);if(l.length===0)return i.disabled=!1,i.innerHTML=n,f("Atenção","Selecione pelo menos um profissional.","error");const d=o.target.batchBlockageStartDate.value,u=o.target.batchBlockageEndDate.value||d,c=o.target.batchBlockageStartTime.value,p=o.target.batchBlockageEndTime.value,b=o.target.batchBlockageReason.value;if(!d||!c||!p)return i.disabled=!1,i.innerHTML=n,f("Atenção","Preencha Data de Início, Hora de Início e Fim.","error");const m=l.map(h=>{const y={professionalId:h,establishmentId:g.establishmentId,startTime:new Date(`${d}T${c}`).toISOString(),endTime:new Date(`${u}T${p}`).toISOString(),reason:b};return Da(y)});try{await Promise.all(m),f("Sucesso!",`${l.length} bloqueios foram criados.`),s.reset(),o.target.querySelectorAll('input[name="batch-professionals"]').forEach(y=>{y.checked=y.value===t.id});const h=document.getElementById("prof-blockages-filter").value;$t(t.id,h)}catch(h){f("Erro",h.message,"error")}finally{i.disabled=!1,i.innerHTML=n}});const r=document.getElementById("prof-blockages-filter");r&&r.addEventListener("change",o=>$t(t.id,o.target.value)),t.id&&await $t(t.id,"future")}async function $t(t,e="future"){const a=document.getElementById("blockagesList");if(a){if(a.innerHTML='<div class="loader mx-auto mt-10"></div>',!t){a.innerHTML=`
            <div class="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <i class="bi bi-info-circle text-3xl text-slate-300 mb-3 block"></i>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Salve o perfil para ver o histórico.</p>
            </div>`;return}try{const s=new Date;let r,o;e==="history"?(o=new Date,r=new Date,r.setFullYear(r.getFullYear()-2)):(r=new Date,o=new Date,o.setFullYear(o.getFullYear()+2));let n=(await Ca(g.establishmentId,r.toISOString(),o.toISOString(),t)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));e==="history"?n=n.filter(d=>d.endTime<s).sort((d,u)=>u.startTime-d.startTime):n=n.filter(d=>d.endTime>=s).sort((d,u)=>d.startTime-u.startTime);const l=n.reduce((d,u)=>{const c=u.reason||"Sem motivo detalhado";return d[c]||(d[c]=[]),d[c].push(u),d},{});if(Object.keys(l).length===0){a.innerHTML=`
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
        `).join("")}catch(s){a.innerHTML=`<p class="text-[10px] font-bold text-red-500 p-4 bg-red-50 rounded-xl border border-red-100">${s.message}</p>`}}}function sd(t){const e=document.getElementById("prof-modal-inner");if(!e)return;const a=e.querySelectorAll(".tab-link");a.forEach(p=>{p.addEventListener("click",b=>{b.preventDefault(),a.forEach(y=>{y.classList.remove("active","border-indigo-600","text-indigo-600"),y.classList.add("border-transparent","text-slate-400")}),p.classList.add("active","border-indigo-600","text-indigo-600"),p.classList.remove("border-transparent","text-slate-400"),e.querySelectorAll(".tab-content").forEach(y=>y.classList.add("hidden"));const m=p.dataset.tab,h=e.querySelector("#"+m);h&&h.classList.remove("hidden")})});const s=e.querySelector("#profPhotoInput"),r=e.querySelector("#profPhotoButton"),o=e.querySelector("#profPhotoContainer"),i=e.querySelector("#profPhotoPreview"),n=e.querySelector("#profPhotoBase64"),l=t.photo||`https://placehold.co/150x150/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,d=t.photo||"",u=()=>s.click();r&&r.addEventListener("click",u),o&&o.addEventListener("click",u),s&&(s.onchange=async()=>{const p=s.files[0];if(p){i.src="https://placehold.co/150x150/E2E8F0/4A5568?text=...";try{const b=await Sa(p,800,800,.8);if(b.length*3/4>1e3*1024)throw new Error("A imagem é muito grande mesmo após a compressão.");i.src=b,n.value=b}catch(b){f("Erro de Imagem",b.message||"Não foi possível processar a imagem.","error"),i.src=l,n.value=d,s.value=""}}});const c=e.querySelector("#selectAllServicesBtn");if(c){c.addEventListener("click",()=>{const b=e.querySelectorAll('#profServicesContainer input[type="checkbox"]'),m=Array.from(b).every(h=>h.checked);b.forEach(h=>{h.checked=!m}),c.textContent=m?"Selecionar Todos":"Desmarcar Todos"});const p=e.querySelectorAll('#profServicesContainer input[type="checkbox"]');p.length>0&&Array.from(p).every(b=>b.checked)&&(c.textContent="Desmarcar Todos")}}function od(){Ut&&document.body.removeEventListener("click",Ut),Wt&&os.removeEventListener("input",Wt),Ut=async t=>{if(t.target.classList.contains("professional-checkbox")){const o=t.target.dataset.id;t.target.checked?_.selectedIds.add(o):_.selectedIds.delete(o),pr(),t.stopPropagation();return}const e=t.target.closest(".status-filter-btn");if(e){_.statusFilter=e.dataset.status,document.querySelectorAll(".status-filter-btn").forEach(o=>{o.classList.remove("bg-indigo-600","text-white","border-indigo-600"),o.classList.add("bg-white","text-slate-600","border-slate-200")}),e.classList.remove("bg-white","text-slate-600","border-slate-200"),e.classList.add("bg-indigo-600","text-white","border-indigo-600"),vt();return}if(t.target.id==="clear-filters-btn"){t.preventDefault(),document.getElementById("filterServiceId").value="all",_.filterServiceId="all",vt();return}if(t.target.id==="apply-filter-btn"){t.preventDefault(),_.filterServiceId=document.getElementById("filterServiceId").value,vt();return}const a=t.target.closest("#toggle-filter-btn");if(a){t.preventDefault(),_.isAdvancedFilterOpen=!_.isAdvancedFilterOpen;const o=document.getElementById("filter-panel");_.isAdvancedFilterOpen?(o.classList.remove("hidden"),o.classList.add("block"),a.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200")):(o.classList.add("hidden"),o.classList.remove("block"),a.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"));return}const s=t.target.closest("[data-action]");if(!s){t.target.id==="professionals-layout-detail"&&Jt();return}const r=s.dataset.action;switch(["close-detail-screen","delete-professional","save-professional","delete-blockage","batch-delete-blockage"].includes(r)&&t.stopPropagation(),r){case"open-professional-editor":Xl(s.dataset.id);break;case"close-detail-screen":Jt(),_.tempProf=null;break;case"batch-delete":rd();break;case"delete-professional":{const o=s.dataset.id,i=_.tempProf?.name||"Profissional";if(await Q("Excluir Profissional",`Tem certeza que deseja excluir ${i}? Esta ação não pode ser desfeita.`))try{await ko(o),re(g.establishmentId,ra(),"Equipe","Excluiu",`Excluiu profissional: ${i}`),f("Sucesso!","Profissional excluído da rede.","success"),Jt(),ga()}catch(l){f("Erro",`Não foi possível excluir: ${l.message}`,"error")}break}case"save-professional":{const o=document.getElementById("prof-modal-inner"),i=s,n=o.querySelector("#profScheduleContainer"),l=Array.from(o.querySelectorAll('#profServicesContainer input[type="checkbox"]:checked')).map(k=>k.value),d={};n&&n.querySelectorAll(".day-schedule-card").forEach(k=>{const A=k.querySelector('[data-field="active"]').dataset.day;d[A]={active:k.querySelector('[data-field="active"]').checked,start:k.querySelector('[data-field="start"]').value,end:k.querySelector('[data-field="end"]').value,breakStart:k.querySelector('[data-field="breakStart"]').value,breakEnd:k.querySelector('[data-field="breakEnd"]').value}});const u=Array.from(o.querySelectorAll('input[name="accessibleIn"]:checked')).map(k=>k.value),c=u.length>0?u:[g.establishmentId],p=o.querySelector("#profStatusToggle").checked,b=o.querySelector("#profCommissionToggle").checked,m=o.querySelector("#profShowOnAgendaToggle").checked,h={..._.tempProf,id:o.querySelector("#professionalId").value||void 0,accessibleIn:c,name:o.querySelector("#profName").value.trim(),specialty:o.querySelector("#profSpecialty").value,photo:o.querySelector("#profPhotoBase64").value,services:l,workingHours:d,phone:o.querySelector("#profPhone").value,dob:`${o.querySelector("#profDobDay").value}/${o.querySelector("#profDobMonth").value}`,receivesCommission:b,showOnAgenda:m,orderOnAgenda:parseInt(o.querySelector("#profOrderOnAgenda").value)||1,notes:o.querySelector("#profNotes").value,status:p?"active":"inactive",establishmentId:g.establishmentId},y=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';try{h.id?(await Ua(h.id,h),re(g.establishmentId,ra(),"Equipe","Editou",`Editou o profissional: ${h.name}`),f("Sucesso!","Dados atualizados.","success")):(delete h.id,await gi(h),re(g.establishmentId,ra(),"Equipe","Criou",`Cadastrou o profissional: ${h.name}`),f("Sucesso!","Novo membro adicionado à equipe.","success")),Jt(),ga()}catch(k){f("Erro",k.message,"error"),i.disabled=!1,i.innerHTML=y}break}case"delete-blockage":{const o=s.dataset.id;if(await Q("Apagar Bloqueio","O profissional voltará a ficar disponível na agenda neste dia. Confirma?"))try{await fs(o),f("Bloqueio removido.","success");const i=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";$t(_.tempProf.id,i)}catch(i){f("Erro",i.message,"error")}break}case"batch-delete-blockage":{const o=JSON.parse(s.dataset.ids);if(await Q("Apagar em Lote",`Tem certeza que deseja apagar ${o.length} dias de bloqueio de uma vez?`))try{await Oo(o),f("Bloqueios removidos.","success");const i=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";$t(_.tempProf.id,i)}catch(i){f("Erro",i.message,"error")}break}}},document.body.addEventListener("click",Ut),Wt=t=>{t.target.id==="searchInput"&&(_.searchQuery=t.target.value,vt())},os.addEventListener("input",Wt)}function rd(){Q("Excluir em Lote",`Tem certeza que deseja excluir ${_.selectedIds.size} profissionais da rede? Esta ação não pode ser desfeita.`).then(async t=>{if(t)try{await fi(Array.from(_.selectedIds)),re(g.establishmentId,ra(),"Equipe","Excluiu em Lote",`Excluiu ${_.selectedIds.size} profissionais`),f("Sucesso!",`${_.selectedIds.size} profissionais foram excluídos.`,"success"),_.selectedIds.clear(),pr(),ga()}catch(e){f("Erro",`Não foi possível excluir em lote: ${e.message}`,"error")}})}let E={clients:[],selectedClient:null,establishments:[],filterEstablishmentIds:new Set,filters:{search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1,status:"all"},sortConfig:{key:"name",direction:"asc"},selectedIds:new Set,loading:!1,historyLimit:50,historyData:{appointments:[],sales:[],loyaltyLog:[]}},fa=null,Qt=null;const mr=t=>t?String(t).replace(/\D/g,""):"",rs=t=>{if(!t)return"Nunca";let e;if(typeof t=="object"&&(t.seconds||t._seconds)){const a=t.seconds||t._seconds;e=new Date(a*1e3)}else e=new Date(t);return isNaN(e.getTime())?"Data Inválida":e.toLocaleDateString("pt-BR")},is=t=>{if(!t)return"CL";const e=t.trim().split(" ");return e.length>=2?(e[0][0]+e[e.length-1][0]).toUpperCase():t.substring(0,2).toUpperCase()};function id(){const t=document.getElementById("clients-layout-detail"),e=document.getElementById("client-modal-inner");t&&e&&(t.classList.remove("hidden"),t.classList.add("flex"),setTimeout(()=>{t.classList.remove("opacity-0"),e.classList.remove("scale-95","translate-y-4"),e.classList.add("scale-100","translate-y-0")},10),document.body.style.overflow="hidden")}function _e(){const t=document.getElementById("clients-layout-detail"),e=document.getElementById("client-modal-inner");t&&e&&(t.classList.add("opacity-0"),e.classList.remove("scale-100","translate-y-0"),e.classList.add("scale-95","translate-y-4"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex"),document.body.style.overflow=""},300)),E.selectedClient=null}async function nd(){fa=document.getElementById("content"),E.selectedClient=null,E.selectedIds.clear(),E.filters={search:"",inactiveDays:"",birthMonth:"",hasLoyalty:!1,hasDebt:!1,status:"all"},E.sortConfig={key:"name",direction:"asc"};try{const e=(await we().catch(()=>({matrizes:[]}))).matrizes||[];E.establishments=[],e.forEach(a=>{E.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>E.establishments.push({id:s.id,name:s.name,type:"Filial"}))}),E.filterEstablishmentIds.size===0&&E.filterEstablishmentIds.add(g.establishmentId)}catch(t){console.error("Erro ao buscar hierarquia",t)}ld(),cd(),await Is()}function ld(){const t=E.establishments.map(e=>`
        <label class="inline-flex items-center gap-2 px-3 py-1.5 bg-white border ${E.filterEstablishmentIds.has(e.id)?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700":"border-slate-200 text-slate-600"} rounded-xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" value="${e.id}" ${E.filterEstablishmentIds.has(e.id)?"checked":""}>
            <span class="text-xs font-bold whitespace-nowrap">${e.type==="Matriz"?'<i class="bi bi-building mr-1"></i>':'<i class="bi bi-shop mr-1"></i>'} ${e.name}</span>
        </label>
    `).join("");fa.innerHTML=`
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative bg-slate-50">
            
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

            <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full animate-fade-in">
                <div></div> 
                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                    <button data-action="export-excel" class="py-2.5 px-4 bg-white border border-slate-200 text-emerald-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center gap-2 text-xs active:scale-95">
                        <i class="bi bi-file-earmark-excel-fill text-emerald-600 text-base"></i> Exportar
                    </button>
                    <button data-action="new-client" class="py-2.5 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-500/30 flex items-center gap-2 text-xs flex-1 md:flex-none justify-center active:scale-95 uppercase tracking-wider border border-indigo-500">
                        <i class="bi bi-person-plus-fill text-base"></i> Novo Cliente
                    </button>
                </div>
            </div>

            ${E.establishments.length>1?`
            <div class="mb-3 animate-fade-in">
                <div class="flex flex-wrap gap-2" id="establishment-filters-container">
                    ${t}
                </div>
            </div>
            `:""}

            <div id="kpi-section" class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4 animate-fade-in flex-shrink-0">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group cursor-pointer hover:border-indigo-300 transition-colors" data-filter="all">
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest z-10">Total de Clientes</span>
                    <span id="kpi-total" class="text-xl font-black text-slate-800 mt-0.5 z-10">0</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group cursor-pointer hover:border-emerald-300 transition-colors" data-filter="novos">
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest z-10">Novos (Mês)</span>
                    <span id="kpi-novos" class="text-xl font-black text-emerald-600 mt-0.5 z-10">0</span>
                </div>
                <div class="bg-red-50 p-3 rounded-xl border border-red-100 shadow-sm flex flex-col relative overflow-hidden group cursor-pointer hover:border-red-300 transition-colors" data-filter="devendo">
                    <span class="text-[9px] font-bold text-red-500 uppercase tracking-widest z-10">Em Débito</span>
                    <span id="kpi-devendo" class="text-xl font-black text-red-600 mt-0.5 z-10">0</span>
                </div>
                <div class="bg-indigo-50 p-3 rounded-xl border border-indigo-100 shadow-sm flex flex-col relative overflow-hidden group cursor-pointer hover:border-indigo-300 transition-colors" data-filter="aniversariantes">
                    <span class="text-[9px] font-bold text-indigo-500 uppercase tracking-widest z-10">Aniversariantes</span>
                    <span id="kpi-niver" class="text-xl font-black text-indigo-600 mt-0.5 z-10">0</span>
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-3 w-full animate-fade-in flex-shrink-0">
                <div class="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto custom-scrollbar">
                    <label class="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl cursor-pointer transition-all shadow-sm select-none flex-shrink-0 text-xs font-bold uppercase tracking-wider">
                        <input type="checkbox" id="filter-loyalty" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5">
                        <i class="bi bi-star-fill text-amber-500"></i> Com Pontos
                    </label>
                    <div class="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm flex-shrink-0 gap-2">
                        <span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Ausente ></span>
                        <input type="number" id="filter-inactive" placeholder="Dias" class="w-12 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none font-black text-indigo-600 text-center py-0.5 shadow-inner">
                    </div>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto">
                    <div class="relative w-full md:w-80 flex-shrink-0">
                        <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input type="text" id="search-input" placeholder="Buscar por nome, telefone, CPF..." class="w-full pl-9 p-2.5 bg-white border border-slate-200 shadow-sm rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                </div>
            </div>

            <div class="flex-1 flex flex-col min-h-0 w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in relative">
                <div id="table-header-container"></div>
                <div id="list-container" class="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-2">
                    <div class="flex justify-center py-20"><div class="loader"></div></div>
                </div>
            </div>
        </section>

        <div id="clients-layout-detail" class="hidden fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="client-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-4xl flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
                </div>
        </div>
    `}function dd(){const t=document.getElementById("table-header-container");if(!t)return;const e=a=>E.sortConfig.key!==a?'<i class="bi bi-arrow-down-up ml-1 opacity-40 text-xs"></i>':E.sortConfig.direction==="asc"?'<i class="bi bi-arrow-up ml-1 text-indigo-600"></i>':'<i class="bi bi-arrow-down ml-1 text-indigo-600"></i>';t.innerHTML=`
        <div class="hidden md:grid grid-cols-12 gap-2 px-4 py-3 text-[9px] font-black text-slate-500 uppercase tracking-widest items-center bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
            <div class="col-span-4 pl-2 flex items-center gap-3">
                <input type="checkbox" id="select-all-toggle" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${E.selectedIds.size>0&&E.selectedIds.size===E.clients.length?"checked":""}>
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
    `}async function Is(){E.loading=!0;const t=document.getElementById("list-container");t&&(t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-slate-500 font-bold text-[10px] uppercase tracking-widest">Carregando clientes...</p></div>');try{const a=Array.from(E.filterEstablishmentIds).map(i=>{let n=`/api/clients/${i}?limit=1000`;return L(n).catch(()=>[])}),r=(await Promise.all(a)).flat(),o=new Map;r.forEach(i=>o.set(i.id,i)),E.clients=Array.from(o.values()),Es(),Te()}catch(e){console.error(e),f("Erro","Falha ao carregar clientes.","error"),t&&(t.innerHTML='<div class="text-center py-10 text-red-500 font-bold text-sm">Erro ao carregar dados.</div>')}finally{E.loading=!1}}function Es(){const t=new Date().getMonth()+1,e=new Date().getFullYear();let a=0,s=0,r=0;E.clients.forEach(o=>{if(o.totalDebt&&parseFloat(o.totalDebt)>0&&s++,o.dobMonth==t&&r++,o.createdAt){const i=new Date(o.createdAt);i.getMonth()+1===t&&i.getFullYear()===e&&a++}}),document.getElementById("kpi-total").textContent=E.clients.length,document.getElementById("kpi-novos").textContent=a,document.getElementById("kpi-devendo").textContent=s,document.getElementById("kpi-niver").textContent=r}function Te(){dd();const t=document.getElementById("list-container");let e=E.clients;if(E.filters.search){const a=E.filters.search.toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(a)||s.phone&&s.phone.includes(a)||s.cpf&&s.cpf.includes(a))}if(E.filters.status==="devendo")e=e.filter(a=>a.totalDebt&&parseFloat(a.totalDebt)>0);else if(E.filters.status==="aniversariantes"){const a=new Date().getMonth()+1;e=e.filter(s=>s.dobMonth==a)}else if(E.filters.status==="novos"){const a=new Date().getMonth()+1,s=new Date().getFullYear();e=e.filter(r=>{if(!r.createdAt)return!1;const o=new Date(r.createdAt);return o.getMonth()+1===a&&o.getFullYear()===s})}if(E.filters.hasLoyalty&&(e=e.filter(a=>a.loyaltyPoints&&a.loyaltyPoints>0)),E.filters.inactiveDays){const a=parseInt(E.filters.inactiveDays),s=new Date;s.setDate(s.getDate()-a),e=e.filter(r=>{if(!r.lastVisit&&!r.createdAt)return!1;let o;if(r.lastVisit){const i=r.lastVisit.seconds||r.lastVisit._seconds;o=i?new Date(i*1e3):new Date(r.lastVisit)}else o=new Date(r.createdAt);return o<s})}if(e.sort((a,s)=>{let r,o;switch(E.sortConfig.key){case"name":return r=(a.name||"").toLowerCase(),o=(s.name||"").toLowerCase(),E.sortConfig.direction==="asc"?r.localeCompare(o):o.localeCompare(r);case"contact":return r=a.phone||"",o=s.phone||"",E.sortConfig.direction==="asc"?r.localeCompare(o):o.localeCompare(r);case"lastVisit":r=a.lastVisit?a.lastVisit.seconds?a.lastVisit.seconds:new Date(a.lastVisit).getTime()/1e3:a.createdAt?new Date(a.createdAt).getTime()/1e3:0,o=s.lastVisit?s.lastVisit.seconds?s.lastVisit.seconds:new Date(s.lastVisit).getTime()/1e3:s.createdAt?new Date(s.createdAt).getTime()/1e3:0;break;case"financial":r=parseFloat(a.totalDebt)||0,o=parseFloat(s.totalDebt)||0;break;default:r=a.name,o=s.name}return r<o?E.sortConfig.direction==="asc"?-1:1:r>o?E.sortConfig.direction==="asc"?1:-1:0}),e.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm m-4">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                    <i class="bi bi-people text-3xl text-slate-300"></i>
                </div>
                <h3 class="text-base font-black text-slate-800 mb-1">Nenhum cliente encontrado</h3>
                <p class="text-[10px] text-slate-500 max-w-sm text-center font-bold uppercase tracking-widest mb-6">Tente ajustar a busca ou limpar os filtros.</p>
            </div>`;return}t.innerHTML=e.map(a=>{const s=a.totalDebt&&parseFloat(a.totalDebt)>0,r=rs(a.lastVisit),o=mr(a.phone),i=new Date().getMonth()+1,n=a.dobMonth==i,l=E.selectedIds.has(a.id);let d="";return n&&(d+='<span class="bg-indigo-50 text-indigo-700 text-[8px] font-black px-1.5 py-0.5 rounded border border-indigo-200 uppercase tracking-wider shadow-sm flex items-center gap-1"><i class="bi bi-gift-fill"></i> Niver</span> '),a.loyaltyPoints>0&&(d+=`<span class="bg-amber-50 text-amber-700 text-[8px] font-black px-1.5 py-0.5 rounded border border-amber-200 uppercase tracking-wider shadow-sm flex items-center gap-1"><i class="bi bi-star-fill"></i> ${a.loyaltyPoints} pts</span> `),`
        <div class="border-b border-slate-100 hover:bg-slate-50 transition-colors relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-3 md:p-3 mb-2 md:mb-0 bg-white md:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none border md:border-b md:border-x-0 md:border-t-0 mx-2 md:mx-0 ${s?"border-l-4 border-l-red-400":"border-l-4 border-l-transparent hover:border-l-indigo-300"} ${l?"bg-indigo-50/40 ring-1 ring-indigo-200 border-indigo-200":""} cursor-pointer active:scale-[0.99] md:active:scale-100" data-action="open-modal" data-id="${a.id}">
            
            <div class="flex justify-between items-start md:hidden mb-2 relative">
                <div class="absolute -top-1 -right-1 z-20">
                    <input type="checkbox" value="${a.id}" class="item-checkbox w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${l?"checked":""} data-action-stop-propagation="true">
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl ${s?"bg-red-50 text-red-600 border border-red-100":"bg-slate-100 text-slate-600 border border-slate-200"} flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm">
                        ${is(a.name)}
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
                    ${is(a.name)}
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
                    <i class="bi bi-calendar-check text-slate-400"></i> ${r}
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
        `}).join("")}function cd(){Qt&&fa.removeEventListener("click",Qt),Qt=o=>{const i=o.target;if(i.classList.contains("item-checkbox")){const u=i.value;i.checked?E.selectedIds.add(u):E.selectedIds.delete(u),ia();const c=i.closest('div[data-action="open-modal"]');i.checked?c.classList.add("bg-indigo-50/40","ring-1","ring-indigo-200","border-indigo-200"):c.classList.remove("bg-indigo-50/40","ring-1","ring-indigo-200","border-indigo-200"),o.stopPropagation();return}if(i.dataset.actionStopPropagation==="true"&&o.stopPropagation(),i.id==="select-all-toggle"){const u=i.checked,c=document.querySelectorAll(".item-checkbox");E.selectedIds.clear(),c.forEach(p=>{p.checked=u,u&&E.selectedIds.add(p.value);const b=p.closest('div[data-action="open-modal"]');u?b.classList.add("bg-indigo-50/40","ring-1","ring-indigo-200","border-indigo-200"):b.classList.remove("bg-indigo-50/40","ring-1","ring-indigo-200","border-indigo-200")}),ia(),o.stopPropagation();return}const n=i.closest("[data-sort]");if(n){const u=n.dataset.sort;E.sortConfig.key===u?E.sortConfig.direction=E.sortConfig.direction==="asc"?"desc":"asc":(E.sortConfig.key=u,E.sortConfig.direction="asc"),Te();return}const l=i.closest("[data-action]");if(l){const u=l.dataset.action,c=l.dataset.id;if(u==="new-client"){Js(null);return}if(u==="open-modal"){Js(c);return}if(u==="close-detail-screen"){_e();return}if(u==="whatsapp"){o.stopPropagation();const p=l.dataset.phone;window.open(`https://wa.me/55${p}`,"_blank");return}if(u==="export-excel"){vd();return}}if(i.id==="clients-layout-detail"){_e();return}const d=i.closest("[data-filter]");d&&(document.querySelectorAll("[data-filter]").forEach(u=>u.classList.remove("ring-2","ring-offset-1","ring-indigo-400","border-indigo-300")),d.classList.add("ring-2","ring-offset-1","ring-indigo-400","border-indigo-300"),E.filters.status=d.dataset.filter,Te())},fa.addEventListener("click",Qt);const t=document.getElementById("cancel-selection-btn");t&&t.addEventListener("click",()=>{E.selectedIds.clear();const o=document.getElementById("select-all-toggle");o&&(o.checked=!1),document.querySelectorAll(".item-checkbox").forEach(i=>{i.checked=!1,i.closest('div[data-action="open-modal"]').classList.remove("bg-indigo-50/40","ring-1","ring-indigo-200","border-indigo-200")}),ia()});const e=document.getElementById("batch-delete-btn");e&&e.addEventListener("click",ud),document.querySelectorAll(".est-filter-checkbox").forEach(o=>{o.addEventListener("change",i=>{const n=i.target.closest("label");i.target.checked?(E.filterEstablishmentIds.add(i.target.value),n.classList.add("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),n.classList.remove("border-slate-200","text-slate-600")):(E.filterEstablishmentIds.delete(i.target.value),n.classList.remove("border-indigo-500","ring-1","ring-indigo-500","bg-indigo-50/20","text-indigo-700"),n.classList.add("border-slate-200","text-slate-600")),Is()})});const a=document.getElementById("search-input");a&&a.addEventListener("input",o=>{E.filters.search=o.target.value,Te()});const s=document.getElementById("filter-inactive");s&&s.addEventListener("input",o=>{E.filters.inactiveDays=o.target.value,Te()});const r=document.getElementById("filter-loyalty");r&&r.addEventListener("change",o=>{E.filters.hasLoyalty=o.target.checked,Te()})}function ia(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count");if(!t||!e)return;const a=E.selectedIds.size;e.textContent=a,a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex"))}async function ud(){const t=E.selectedIds.size;if(!(t===0||!await Q("Excluir Clientes",`Deseja realmente excluir permanentemente ${t} cliente(s)? O histórico de agendamentos será mantido, mas o cadastro será apagado.`)))try{const a=Array.from(E.selectedIds).map(r=>To(r));await Promise.all(a),f("Sucesso",`${t} cliente(s) excluído(s) com sucesso.`,"success"),E.selectedIds.clear(),ia();const s=document.getElementById("select-all-toggle");s&&(s.checked=!1),await Is()}catch{f("Erro ao Excluir","Ocorreu um erro ao excluir alguns clientes.","error")}}function Js(t=null){t?(E.selectedClient=E.clients.find(a=>a.id===t),E.selectedClient.isNew=!1):E.selectedClient={isNew:!0,id:"",name:"",phone:"",email:"",cpf:"",gender:"",dobDay:"",dobMonth:"",source:"",notes:"",loyaltyPoints:0,totalDebt:0},E.historyData={appointments:[],sales:[],loyaltyLog:[]};const e=document.getElementById("client-modal-content")||document.getElementById("client-modal-inner");e&&(pd(e,E.selectedClient),id(),E.selectedClient.isNew||gd(E.selectedClient))}function pd(t,e){const a=e.isNew,s=v(e.name||""),r=`
        <div class="p-4 md:p-5 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition-colors active:scale-95 mr-4 flex-shrink-0">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            
            <div class="w-10 h-10 md:w-12 md:h-12 rounded-full ${e.totalDebt>0?"bg-red-50 text-red-600 border-red-200":"bg-indigo-50 text-indigo-600 border-indigo-200"} border flex items-center justify-center font-black text-sm md:text-base mr-3 flex-shrink-0 shadow-sm">
                ${a?'<i class="bi bi-person-plus"></i>':is(e.name)}
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
            <button class="tab-link active whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors uppercase tracking-widest" data-tab="tab-profile">1. Ficha e Perfil</button>
            ${a?"":`
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="tab-appointments">2. Agendamentos</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="tab-history">3. Finanças</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="tab-loyalty">4. Fidelidade</button>
            `}
        </div>
    `;t.innerHTML=`
        ${r}
        ${o}
        
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 p-3 md:p-6 relative">
            <form id="form-edit-client" class="h-full w-full mx-auto max-w-4xl">
                
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

            </form>
        </div>

        <footer class="p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] w-full flex-shrink-0 z-50 flex gap-3 justify-end md:rounded-b-3xl">
            <button type="button" data-action="close-detail-screen" class="hidden md:block py-3 px-6 bg-slate-100 border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors shadow-sm active:scale-95">Cancelar</button>
            <button type="submit" form="form-edit-client" class="w-full md:w-auto md:px-8 py-3 bg-indigo-600 text-white font-black text-xs md:text-sm rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider border border-indigo-600">
                <i class="bi bi-save2 text-lg pointer-events-none"></i> Salvar Cliente
            </button>
        </footer>
    `,t.querySelectorAll(".tab-link").forEach(l=>{l.addEventListener("click",d=>{d.preventDefault(),t.querySelectorAll(".tab-link").forEach(u=>{u.classList.remove("active","border-indigo-600","text-indigo-600"),u.classList.add("border-transparent","text-slate-400")}),l.classList.add("active","border-indigo-600","text-indigo-600"),l.classList.remove("border-transparent","text-slate-400"),t.querySelectorAll(".tab-content").forEach(u=>u.classList.add("hidden")),t.querySelector("#"+l.dataset.tab).classList.remove("hidden")})});const i=t.querySelector("#form-edit-client");i&&(i.onsubmit=fd);const n=t.querySelector('[data-action="delete-client"]');n&&(n.onclick=xd)}function bd(t){return t.sort((e,a)=>new Date(a.startTime)-new Date(e.startTime)),`
        <div class="space-y-3">
            ${t.length?t.map(e=>{const a=new Date(e.startTime);let r=a<new Date?'<span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[9px] font-black uppercase border border-slate-200">Concluído</span>':'<span class="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md text-[9px] font-black uppercase border border-emerald-200">Agendado</span>';return e.status==="cancelled"&&(r='<span class="bg-red-50 text-red-600 px-2 py-0.5 rounded-md text-[9px] font-black uppercase border border-red-200">Cancelado</span>'),`
                <div class="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4 shadow-sm items-center cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all active:scale-[0.98]" data-go-agenda="true" data-id="${e.id}" data-date="${e.startTime}">
                    <div class="flex-shrink-0 text-center w-12 border-r border-slate-100 pr-3">
                        <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">${a.toLocaleDateString("pt-BR",{month:"short"})}</span>
                        <span class="block text-xl font-black text-slate-800 leading-none mt-1">${a.getDate()}</span>
                    </div>
                    <div class="flex-grow min-w-0">
                        <p class="font-black text-sm text-slate-800 truncate">${v(e.serviceName||"Serviço Variado")}</p>
                        <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate mt-1.5 flex items-center gap-1.5"><i class="bi bi-person-fill bg-slate-100 p-1 rounded"></i> ${v(e.professionalName||"N/A")} <span class="mx-1 text-slate-300">•</span> <i class="bi bi-clock-fill bg-slate-100 p-1 rounded"></i> ${a.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</p>
                    </div>
                    <div class="flex-shrink-0 text-right">
                        ${r}
                    </div>
                </div>`}).join(""):`
                <div class="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
                    <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3"><i class="bi bi-calendar-x text-xl text-slate-300"></i></div>
                    <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Nenhum agendamento encontrado.</p>
                </div>
            `}
        </div>
    `}function md(t){t.sort((s,r)=>new Date(r.date)-new Date(s.date));const e=t.reduce((s,r)=>s+(Number(r.totalAmount)||0),0),a=t.length>0?e/t.length:0;return`
        <div class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-emerald-50 p-4 md:p-5 rounded-2xl border border-emerald-100 shadow-sm flex flex-col text-center justify-center">
                    <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex justify-center items-center gap-1"><i class="bi bi-graph-up-arrow"></i> LTV (Valor Vitalício)</span>
                    <span class="text-2xl md:text-3xl font-black text-emerald-700 mt-1">${ja(e)}</span>
                </div>
                <div class="bg-white p-4 md:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col text-center justify-center">
                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex justify-center items-center gap-1"><i class="bi bi-receipt"></i> Ticket Médio</span>
                    <span class="text-2xl md:text-3xl font-black text-slate-800 mt-1">${ja(a)}</span>
                </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div class="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2">
                    <i class="bi bi-cart-check text-indigo-500 text-lg"></i>
                    <h4 class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Histórico de Compras e Comandas</h4>
                </div>
                <div class="p-3 space-y-2">
                    ${t.length?t.map(s=>`
                    <div class="bg-white border border-slate-100 rounded-xl p-4 flex justify-between items-center shadow-sm hover:border-indigo-200 cursor-pointer transition-all active:scale-[0.98]" data-go-comanda="true" data-id="${s.id}">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 text-sm shadow-sm"><i class="bi bi-receipt-cutoff"></i></div>
                            <div>
                                <p class="font-black text-slate-800 text-xs uppercase tracking-wider">Comanda #${s.id.slice(-5).toUpperCase()}</p>
                                <p class="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">${new Date(s.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-black text-emerald-600 text-sm bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">${ja(s.totalAmount)}</p>
                            <p class="text-[9px] text-indigo-500 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1 justify-end">Abrir Comanda <i class="bi bi-chevron-right"></i></p>
                        </div>
                    </div>`).join(""):`
                        <div class="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200 m-2">
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhum histórico financeiro.</p>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `}function gr(t,e){return e.sort((a,s)=>new Date(s.date)-new Date(a.date)),`
        <div class="space-y-6">
            <div class="bg-amber-400 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col items-center justify-center text-center shadow-amber-500/30">
                <div class="absolute -right-4 -top-4 opacity-20 transform rotate-12"><i class="bi bi-star-fill text-9xl"></i></div>
                <p class="text-amber-100 font-bold uppercase tracking-widest text-[10px] mb-2 z-10">Saldo de Pontos de Fidelidade</p>
                <h1 class="text-6xl font-black z-10 drop-shadow-md tracking-tighter">${t.loyaltyPoints||0}</h1>
                
                <button type="button" data-action="manual-redeem" class="mt-6 bg-white text-amber-600 text-[10px] font-black uppercase tracking-widest py-2.5 px-6 rounded-xl transition hover:bg-amber-50 shadow-lg active:scale-95 flex items-center gap-2 z-10 border border-white">
                    <i class="bi bi-sliders"></i> Ajuste Manual
                </button>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div class="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2">
                    <i class="bi bi-card-list text-indigo-500 text-lg"></i>
                    <h4 class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Extrato de Movimentações</h4>
                </div>
                <div class="p-3 space-y-1 max-h-80 overflow-y-auto custom-scrollbar">
                    ${e.length>0?e.map(a=>{const s=a.type==="redemption";return`
                        <div class="flex justify-between items-center py-3 px-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors rounded-xl">
                            <div>
                                <p class="text-[10px] font-black text-slate-800 uppercase tracking-wider">${v(a.description||(s?"Resgate":"Acúmulo"))}</p>
                                <p class="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">${new Date(a.date).toLocaleDateString()}</p>
                            </div>
                            <span class="font-black text-sm px-3 py-1 rounded-lg border ${s?"text-red-600 bg-red-50 border-red-100":"text-amber-600 bg-amber-50 border-amber-100"} shadow-sm">
                                ${s?"-":"+"}${a.points}
                            </span>
                        </div>`}).join(""):`
                        <div class="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200 m-2">
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sem movimentações de pontos.</p>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `}async function gd(t){if(!t||!t.phone)return;const e=mr(t.phone);try{const a=new Date;a.setMonth(a.getMonth()+12);const s=new Date;s.setFullYear(s.getFullYear()-5);let r=`/api/appointments/${g.establishmentId}?startDate=${s.toISOString()}&endDate=${a.toISOString()}&clientPhone=${encodeURIComponent(e)}&limit=100`;const o=await L(r);E.historyData.appointments=o,E.historyData.sales=o.filter(u=>u.status==="completed").map(u=>({id:u.id,date:u.startTime,totalAmount:u.totalAmount||0,items:u.comandaItems||u.services||[]}));const i=[];o.forEach(u=>{u.status==="completed"&&u.loyaltyPointsEarned>0&&i.push({type:"earn",points:u.loyaltyPointsEarned,date:u.startTime,description:"Serviço / Venda concluída"}),u.loyaltyRedemption&&i.push({type:"redemption",points:u.loyaltyRedemption.cost||0,date:u.startTime,description:`Resgate: ${u.loyaltyRedemption.name}`})}),E.historyData.loyaltyLog=i;const n=document.getElementById("historico-agendamentos-container");n&&(n.innerHTML=bd(E.historyData.appointments));const l=document.getElementById("historico-financeiro-container");l&&(l.innerHTML=md(E.historyData.sales));const d=document.getElementById("historico-fidelidade-container");d&&(d.innerHTML=gr(t,E.historyData.loyaltyLog)),fr(t)}catch(a){console.error("Erro ao buscar histórico via telefone",a);const s='<div class="text-center py-6 text-red-500 font-bold text-[10px] uppercase bg-red-50 rounded-xl m-2 border border-red-100">Falha na busca. O Telefone está preenchido corretamente?</div>',r=document.getElementById("historico-agendamentos-container");r&&(r.innerHTML=s);const o=document.getElementById("historico-financeiro-container");o&&(o.innerHTML=s);const i=document.getElementById("historico-fidelidade-container");i&&(i.innerHTML=s)}}function fr(t){const e=document.getElementById("client-modal-inner");if(!e)return;e.querySelectorAll("[data-go-agenda]").forEach(s=>{s.onclick=()=>{_e(),oe("agenda-section",{targetDate:new Date(s.dataset.date),scrollToAppointmentId:s.dataset.id})}}),e.querySelectorAll("[data-go-comanda]").forEach(s=>{s.onclick=()=>{_e(),oe("comandas-section",{selectedAppointmentId:s.dataset.id,initialFilter:"finalizadas"})}});const a=e.querySelector('[data-action="manual-redeem"]');a&&(a.onclick=s=>{s.preventDefault(),hd(t)})}async function fd(t){t.preventDefault();const e=t.target.querySelector('button[type="submit"]'),a=e.innerHTML;e.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> Gravando...',e.disabled=!0;const s=new FormData(t.target),r=Object.fromEntries(s.entries());r.establishmentId=g.establishmentId,r.dobDay&&(r.dobDay=parseInt(r.dobDay)),r.dobMonth&&(r.dobMonth=parseInt(r.dobMonth));try{if(E.selectedClient.isNew){const o=await Do(r);E.clients.unshift(o),f("Sucesso","Cliente cadastrado com sucesso!","success"),_e()}else{await Po(E.selectedClient.id,r),Object.assign(E.selectedClient,r);const o=E.clients.findIndex(i=>i.id===E.selectedClient.id);o!==-1&&(E.clients[o]=E.selectedClient),f("Sucesso","Dados salvos com sucesso!","success"),_e()}Es(),Te()}catch(o){f("Erro",o.message,"error"),e.innerHTML=a,e.disabled=!1}}async function xd(t){if(t.preventDefault(),!!await Q("Excluir Cliente","Tem certeza? O histórico financeiro será mantido de forma anônima, mas a ficha cadastral será perdida permanentemente."))try{await To(E.selectedClient.id),E.clients=E.clients.filter(a=>a.id!==E.selectedClient.id),f("Sucesso","Cliente removido com sucesso.","success"),_e(),Es(),Te()}catch(a){f("Erro",a.message,"error")}}function hd(t){const e=t.loyaltyPoints||0,a=`
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
    `,{modalElement:s,close:r}=Ne({title:"Ajuste de Pontos",contentHTML:a,maxWidth:"max-w-xs"});s.querySelector("form").onsubmit=async o=>{o.preventDefault();const i=document.getElementById("redeem-action").value,n=parseInt(document.getElementById("redeem-points").value,10),l=document.getElementById("redeem-reason").value;if(!n||n<=0)return f("Erro","Qtd inválida.","error");if(i==="debit"&&n>e)return f("Erro","Saldo insuficiente na carteira do cliente.","error");const d=o.target.querySelector('button[type="submit"]'),u=d.innerHTML;d.innerHTML='<span class="spinner-border spinner-border-sm"></span>',d.disabled=!0;try{let c=e;i==="debit"?(await _i(g.establishmentId,t.phone,n,l),c-=n):(c+=n,await Po(t.id,{loyaltyPoints:c})),E.selectedClient.loyaltyPoints=c,E.historyData.loyaltyLog.unshift({type:i==="debit"?"redemption":"earn",points:n,date:new Date().toISOString(),description:l+" (Ajuste Manual)"}),f("Sucesso","Saldo de pontos atualizado.","success"),r();const p=document.getElementById("historico-fidelidade-container");p&&(p.innerHTML=gr(E.selectedClient,E.historyData.loyaltyLog)),fr(E.selectedClient),Te()}catch(c){f("Erro",c.message,"error"),d.innerHTML=u,d.disabled=!1}}}function vd(){if(typeof XLSX>"u")return f("Erro","Biblioteca de exportação não carregada. Atualize a página.","error");if(E.clients.length===0)return f("Aviso","Nenhum cliente para exportar.","info");const t=E.clients.map(e=>({Nome:e.name,Telefone:e.phone||"","E-mail":e.email||"",CPF:e.cpf||"",Gênero:e.gender==="M"?"Masculino":e.gender==="F"?"Feminino":e.gender==="O"?"Outro":"",Aniversário:e.dobDay&&e.dobMonth?`${e.dobDay}/${e.dobMonth}`:"",Origem:e.source||"",Cadastro:rs(e.createdAt),"Última Visita":rs(e.lastVisit),"Pontos Fidelidade":e.loyaltyPoints||0,"Débito/Fiado (R$)":e.totalDebt||0,Anotações:e.notes||""}));try{const e=XLSX.utils.json_to_sheet(t),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,e,"Clientes"),XLSX.writeFile(a,`KAIROS_Clientes_${new Date().toISOString().split("T")[0]}.xlsx`),f("Sucesso","Exportação gerada e descarregada.","success")}catch{f("Erro","Falha ao gerar o ficheiro Excel.","error")}}const Oe=document.getElementById("content"),Ha={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},de=[{id:"clean-modern",name:"Clean Moderno",bg:"#f8fafc",text:"#4b5563",titleColor:"#0f172a",primary:"#2563eb",font:"Inter",btn:"rounded",cardBg:"#ffffff",cardBorder:"#e2e8f0"},{id:"dark-premium",name:"Dark Premium",bg:"#0f172a",text:"#9ca3af",titleColor:"#f8fafc",primary:"#f59e0b",font:"'Playfair Display'",btn:"square",cardBg:"#1e293b",cardBorder:"#334155"},{id:"spa-zen",name:"Spa & Wellness",bg:"#f0fdf4",text:"#166534",titleColor:"#064e3b",primary:"#10b981",font:"Poppins",btn:"pill",cardBg:"#ffffff",cardBorder:"#d1fae5"},{id:"neo-brutalism",name:"Neobrutalismo",bg:"#ffffff",text:"#000000",titleColor:"#000000",primary:"#ef4444",font:"Inter",btn:"square",cardBg:"#ffffff",cardBorder:"#000000"},{id:"tech-cyan",name:"Tech Night",bg:"#020617",text:"#94a3b8",titleColor:"#f1f5f9",primary:"#06b6d4",font:"Roboto",btn:"rounded",cardBg:"#0f172a",cardBorder:"#1e293b"},{id:"sunset-glam",name:"Sunset Glam",bg:"#fff7ed",text:"#831843",titleColor:"#4c0519",primary:"#f43f5e",font:"Poppins",btn:"pill",cardBg:"#ffffff",cardBorder:"#fce7f3"},{id:"luxury-mono",name:"Luxo Minimal",bg:"#fafafa",text:"#525252",titleColor:"#171717",primary:"#404040",font:"'Playfair Display'",btn:"square",cardBg:"#ffffff",cardBorder:"#e5e5e5"},{id:"deep-ocean",name:"Oceano Profundo",bg:"#172554",text:"#bfdbfe",titleColor:"#eff6ff",primary:"#3b82f6",font:"Montserrat",btn:"pill",cardBg:"#1e3a8a",cardBorder:"#1e40af"},{id:"rustic-vintage",name:"Rústico Vintage",bg:"#1c1917",text:"#a8a29e",titleColor:"#fafaf9",primary:"#ea580c",font:"Montserrat",btn:"rounded",cardBg:"#292524",cardBorder:"#44403c"},{id:"vibrant-purple",name:"Estúdio Criativo",bg:"#fdf4ff",text:"#701a75",titleColor:"#4a044e",primary:"#c026d3",font:"Inter",btn:"rounded",cardBg:"#ffffff",cardBorder:"#fae8ff"}];let K=null,se=null;function xr(){return[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais da Unidade"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"whatsapp-bot",icon:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",label:"Atendente Virtual (WhatsApp)"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"support",icon:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",label:"Suporte e Ajuda"},{id:"cancellation",icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",label:"Cancelar Assinatura"}]}function Qs(t,e,a){return new Promise((s,r)=>{const o=new FileReader;o.readAsDataURL(t),o.onload=i=>{const n=new Image;n.src=i.target.result,n.onload=()=>{const l=document.createElement("canvas");let d=n.width,u=n.height;d>e&&(u*=e/d,d=e),l.width=d,l.height=u,l.getContext("2d").drawImage(n,0,0,d,u);const p=t.type==="image/png"&&e<500?"image/png":"image/jpeg";s(l.toDataURL(p,a))},n.onerror=l=>r(l)},o.onerror=i=>r(i)})}function We(t,e=null){let a='<option value="">-- Selecione (Opcional) --</option>';const s=i=>{const n=new Map,l=[];return i&&(i.forEach(d=>n.set(d.id,{...d,children:[]})),n.forEach(d=>{d.parentId&&n.has(d.parentId)?n.get(d.parentId).children.push(d):l.push(d)})),l},r=(i,n="")=>{const l=i.id===e?"selected":"";a+=`<option value="${i.id}" ${l}>${n}${v(i.name)}</option>`,i.children.forEach(d=>r(d,n+"— "))};return s(t).forEach(i=>r(i)),a}async function bt(t,e){const a=e.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const s=[],{ownerName:r,...o}=t;if(r&&r!==g.userName){const n=ye.currentUser;n&&s.push(Fr(n,{displayName:r}).then(()=>{g.userName=r}))}const i={...K,...o};s.push(ps(se,i)),await Promise.all(s),K=i,f("Sucesso","Definições salvas com sucesso!","success"),o.themeColor&&se===g.establishmentId&&setTimeout(()=>window.location.reload(),1500)}catch(s){f("Erro",`Não foi possível salvar: ${s.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function yd(t,e){const a=v(t.name||""),s=v(t.phone||""),r=v(t.cnpj||""),o=v(t.email||""),i=v(t.address||""),n=v(t.website||""),l=v(g.userName||"");e.innerHTML=`
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
    `,e.querySelector("#personal-data-form").addEventListener("submit",d=>{d.preventDefault();const u={ownerName:e.querySelector("#ownerName").value,name:e.querySelector("#establishmentName").value,phone:e.querySelector("#establishmentPhone").value,cnpj:e.querySelector("#establishmentCnpjCpf").value,email:e.querySelector("#establishmentEmail").value,address:e.querySelector("#establishmentAddress").value,website:e.querySelector("#establishmentWebsite").value};bt(u,d)})}function wd(t,e){e.innerHTML=`
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
    `,e.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const s=e.querySelector("#newPassword").value,r=e.querySelector("#confirmPassword").value;if(s!==r){f("Erro","As senhas não coincidem.","error");return}const o=e.querySelector('button[form="change-password-form"]');o.disabled=!0,o.textContent="A Salvar...";try{const i=ye.currentUser;if(i)await Nr(i,s),f("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum utilizador logado encontrado.")}catch(i){f("Erro",`Não foi possível alterar a senha: ${i.message}`,"error")}finally{o.disabled=!1,o.textContent="Salvar Nova Senha"}})}function kd(t,e){e.innerHTML=`
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
    `,e.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const s=e.querySelector("#newEmail").value,r=e.querySelector("#currentPassword").value,o=e.querySelector('button[form="change-email-form"]');o.disabled=!0,o.textContent="A verificar...";try{const i=ye.currentUser,n=Br.credential(i.email,r);await jr(i,n),await qr(i,s),await mi(se,s),f("Sucesso","Link de verificação enviado! Verifique o seu novo e-mail.","success"),a.target.reset()}catch(i){f("Erro",i.message,"error")}finally{o.disabled=!1,o.textContent="Salvar Novo E-mail"}})}function Sd(t,e){const a=v(t.welcomeMessage||"Agende o seu horário de forma rápida e fácil."),s=t.socialLinks||{},r=v(s.instagram||""),o=v(s.facebook||""),i=v(s.whatsapp||"");let n=t.primaryColor||t.themeColor||de[0].primary,l=t.backgroundColor||de[0].bg,d=t.textColor||de[0].text,u=t.titleColor||de[0].titleColor,c=t.buttonStyle||de[0].btn,p=t.typography||de[0].font,b=t.templateId?de.findIndex(W=>W.id===t.templateId):0;b===-1&&(b=0);const m=W=>W==="pill"?"9999px":W==="square"?"0.25rem":"0.75rem";e.innerHTML=`
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
    `;const h=e.querySelector("#mockup-screen-wrapper"),y=e.querySelector("#mockup-screen"),k=e.querySelector("#previewPrimaryColorInput"),A=e.querySelector("#previewBgColorInput"),P=e.querySelector("#previewTextColorInput"),S=e.querySelector("#previewTitleColorInput"),I=e.querySelector("#typographyInput"),N=e.querySelector("#establishmentWelcomeMessage"),U=e.querySelector("#mockup-welcome"),C=e.querySelector("#socialInstagram"),D=e.querySelector("#socialWhatsapp"),V=e.querySelector("#socialFacebook"),T=e.querySelector("#prevTemplate"),M=e.querySelector("#nextTemplate"),R=e.querySelector("#templateNameDisplay"),X=e.querySelector("#selectedTemplateId"),te=W=>{const G=de[W];h.style.opacity="0.3",h.style.transform="scale(0.96)",setTimeout(()=>{k.value=G.primary,A.value=G.bg,P.value=G.text,S.value=G.titleColor||G.text,I.value=G.font,e.querySelectorAll('input[name="buttonStyle"]').forEach(ge=>{ge.checked=ge.value===G.btn}),X.value=G.id,R.textContent=G.name,y.style.setProperty("--preview-primary",G.primary),y.style.setProperty("--preview-bg",G.bg),y.style.setProperty("--preview-text",G.text),y.style.setProperty("--preview-title-color",G.titleColor||G.text),y.style.setProperty("--preview-font",G.font),y.style.setProperty("--preview-btn-radius",m(G.btn)),y.style.setProperty("--preview-card-bg",G.cardBg),y.style.setProperty("--preview-card-border",G.cardBorder),h.style.opacity="1",h.style.transform="scale(1)"},300)};T.addEventListener("click",()=>{b=(b-1+de.length)%de.length,te(b)}),M.addEventListener("click",()=>{b=(b+1)%de.length,te(b)}),k.addEventListener("input",W=>y.style.setProperty("--preview-primary",W.target.value)),A.addEventListener("input",W=>y.style.setProperty("--preview-bg",W.target.value)),P.addEventListener("input",W=>y.style.setProperty("--preview-text",W.target.value)),S.addEventListener("input",W=>y.style.setProperty("--preview-title-color",W.target.value)),I.addEventListener("change",W=>y.style.setProperty("--preview-font",W.target.value)),e.querySelectorAll('input[name="buttonStyle"]').forEach(W=>{W.addEventListener("change",G=>{G.target.checked&&y.style.setProperty("--preview-btn-radius",m(G.target.value))})}),N.addEventListener("input",W=>U.textContent=W.target.value||"Mensagem...");const ie=()=>{e.querySelector("#mockup-insta-icon").classList.toggle("hidden",!C.value.trim()),e.querySelector("#mockup-whats-icon").classList.toggle("hidden",!D.value.trim()),e.querySelector("#mockup-face-icon").classList.toggle("hidden",!V.value.trim())};[C,D,V].forEach(W=>W.addEventListener("input",ie));const Z=e.querySelector("#establishmentLogoInput"),q=e.querySelector("#establishmentBgInput"),ee=e.querySelector("#establishmentLogoBase64"),le=e.querySelector("#establishmentBackgroundImageBase64");e.querySelector("#triggerLogoUpload").addEventListener("click",W=>{W.target.id!=="establishmentLogoInput"&&Z.click()}),Z.onchange=async W=>{const G=W.target.files[0];if(G){const ge=await Qs(G,300,.9);e.querySelector("#establishmentLogoPreview").src=ge,e.querySelector("#mockup-logo").src=ge,ee.value=ge}},e.querySelector("#triggerBannerUpload").addEventListener("click",W=>{W.target.id!=="establishmentBgInput"&&q.click()}),q.onchange=async W=>{const G=W.target.files[0];if(G){const ge=await Qs(G,1280,.8);e.querySelector("#establishmentBgPreview").src=ge,e.querySelector("#establishmentBgPreview").classList.remove("hidden"),e.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),le.value=ge,e.querySelector("#mockup-banner").src=ge,e.querySelector("#mockup-banner").classList.remove("hidden"),e.querySelector("#mockup-banner-placeholder").classList.add("hidden")}},e.querySelector("#branding-form").addEventListener("submit",W=>{W.preventDefault();let G="rounded";e.querySelectorAll('input[name="buttonStyle"]').forEach(Ds=>{Ds.checked&&(G=Ds.value)});const ge={logo:ee.value,backgroundImage:le.value,welcomeMessage:N.value,templateId:X.value,primaryColor:k.value,backgroundColor:A.value,textColor:P.value,titleColor:S.value,typography:I.value,buttonStyle:G,socialLinks:{instagram:C.value.trim(),whatsapp:D.value.trim(),facebook:V.value.trim()}};bt(ge,W)})}function $d(t,e){const a=t.urlId||se;let s=window.location.origin;(s.includes("localhost")||s.includes("capacitor://")||s.includes("127.0.0.1"))&&(s="https://www.kairosagenda.com.br");const r=v(`${s}/agendar?id=${a}`),o=t.publicBookingEnabled||!1,i=o?"Agendamento Online ATIVO":"Agendamento Online INATIVO",n=o?"text-green-600":"text-red-600";e.innerHTML=`
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
    `,e.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const l=e.querySelector("#publicBookingLink");l.select(),document.execCommand("copy"),l.blur(),f("Sucesso","Link copiado!","success")}),e.querySelector("#publicBookingToggle").addEventListener("change",async l=>{const d=l.target.checked,u=e.querySelector("#publicBookingStatusText");u.textContent=d?"Agendamento Online ATIVO":"Agendamento Online INATIVO",u.className=d?"text-sm font-semibold text-green-600":"text-sm font-semibold text-red-600";try{l.target.disabled=!0,await bi(se,d),K.publicBookingEnabled=d,f("Sucesso",`Agendamento online ${d?"ativado":"desativado"}!`,"success")}catch(c){f("Erro",c.message,"error"),l.target.checked=!d}finally{l.target.disabled=!1}}),Pd(t.slotInterval||30,e),e.querySelector("#booking-form").addEventListener("submit",l=>{l.preventDefault();const d={slotInterval:parseInt(e.querySelector("#establishmentSlotInterval").value,10)};bt(d,l)})}function Id(t,e){e.innerHTML=`
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
    `;const a=e.querySelector("#establishmentTimezone");t.timezone&&(a.value=t.timezone);const s=e.querySelector("#establishmentWorkingHoursContainer"),r=t.workingHours||{};Object.keys(Ha).forEach(o=>{const i=r[o]||{},n=Ha[o],l=i.active!==!1,d=document.createElement("div");d.className=`day-schedule-card p-4 rounded-lg border ${l?"bg-gray-50 border-gray-200":"bg-gray-100 border-gray-100 disabled opacity-60"}`,d.innerHTML=`
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
            </div>`,s.appendChild(d)}),s.addEventListener("change",o=>{const i=o.target.closest('.day-schedule-card input[type="checkbox"]');if(i){const n=i.closest(".day-schedule-card");n.classList.toggle("disabled",!i.checked),n.classList.toggle("opacity-60",!i.checked),n.classList.toggle("bg-gray-50",i.checked),n.classList.toggle("bg-gray-100",!i.checked)}}),e.querySelector("#working-hours-form").addEventListener("submit",o=>{o.preventDefault();const i={};Object.keys(Ha).forEach(l=>{i[l]={active:e.querySelector(`#est-${l}-active`).checked,start:e.querySelector(`#est-${l}-start`).value,end:e.querySelector(`#est-${l}-end`).value,breakStart:e.querySelector(`#est-${l}-breakStart`).value,breakEnd:e.querySelector(`#est-${l}-breakEnd`).value}});const n=e.querySelector("#establishmentTimezone").value;bt({workingHours:i,timezone:n},o)})}function hr(t,e){const a=!!t.whatsappInstance;e.innerHTML=`
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
    `;let s=null;const r=e.querySelector("#btnGenerateQr"),o=e.querySelector("#btnCancelQr");r&&r.addEventListener("click",async()=>{r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gerando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const d=await(await fetch(`${n}/connect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:se})})).json();if(d.qrcode){e.querySelector("#whatsappStatusArea").classList.add("hidden"),e.querySelector("#qrCodeDisplayArea").classList.remove("hidden");const u=d.qrcode.includes("data:image")?d.qrcode:`data:image/png;base64,${d.qrcode}`;e.querySelector("#qrCodeImage").src=u,s=setInterval(async()=>{try{const p=await(await fetch(`${n}/status/${se}`)).json();p.connected&&(clearInterval(s),K.whatsappInstance=p.instanceName,e.querySelector("#qrCodeDisplayArea").classList.add("hidden"),e.querySelector("#connectedStatusArea").classList.remove("hidden"),f("Sucesso","WhatsApp conectado com sucesso!","success"))}catch(c){console.error("Erro ao verificar status do WhatsApp",c)}},5e3)}else f("Erro na API",d.error||"Erro desconhecido","error")}catch(l){console.error(l),f("Erro de Conexão","Não foi possível aceder ao servidor Kairós.","error")}finally{r.disabled=!1,r.innerHTML='<i class="bi bi-phone-vibrate"></i> Gerar QR Code'}}),o&&o.addEventListener("click",()=>{s&&clearInterval(s),e.querySelector("#qrCodeDisplayArea").classList.add("hidden"),e.querySelector("#whatsappStatusArea").classList.remove("hidden")});const i=e.querySelector("#btnDisconnectWhatsapp");i&&i.addEventListener("click",async()=>{if(!confirm("Tem certeza que deseja DESCONECTAR? O bot parará de responder imediatamente."))return;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Desconectando...';const n="https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";try{const d=await(await fetch(`${n}/disconnect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({establishmentId:se})})).json();d.success?(f("Sucesso","WhatsApp desconectado!","success"),K.whatsappInstance=null,hr(K,e)):alert("Erro ao desconectar: "+d.error)}catch(l){console.error(l),f("Erro","Falha ao comunicar com o servidor.","error")}finally{i&&(i.disabled=!1,i.innerHTML='<i class="bi bi-power"></i> Desconectar')}})}async function Ed(t,e){const a=t.loyaltyProgram||{},s=a.pointsPerVisit||1;let r=[],o=[],i=[];try{[r,o,i]=await Promise.all([ut(se),pt(se),ys(se)])}catch(d){console.error("Erro ao carregar dados para fidelidade:",d)}e.innerHTML=`
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
    `;const n=e.querySelector("#loyaltyTiersContainer"),l=(d={})=>{const u=document.createElement("div");u.className="loyalty-tier-row bg-white p-4 border border-gray-200 rounded-lg shadow-sm relative grid grid-cols-1 md:grid-cols-4 gap-4 items-end";const c=d.type||"money",p=d.itemId||"",b=d.reward||"",m=d.discount||"",h=d.points||d.costPoints||"";u.innerHTML=`
            <div>
                <label class="text-xs font-bold text-gray-500 mb-1 block">Custo (Pontos)</label>
                <div class="relative">
                    <input type="number" placeholder="Ex: 100" data-field="points" value="${h}" class="w-full p-2 border border-gray-300 rounded-md font-bold text-gray-800">
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
        `;const y=u.querySelector(".type-select"),k=u.querySelector(".item-select"),A=u.querySelector(".desc-input"),P=u.querySelector(".discount-input"),S=I=>{k.innerHTML='<option value="">Selecione...</option>';let N=[];I==="service"?N=r:I==="product"?N=o:I==="package"&&(N=i),N.forEach(U=>{const C=U.id===p,D=U.name||U.title||"Sem nome",V=U.price||U.salePrice||0;k.innerHTML+=`<option value="${U.id}" data-price="${V}" ${C?"selected":""}>${v(D)}</option>`})};return c!=="money"&&S(c),y.addEventListener("change",I=>{const N=I.target.value;N==="money"?(k.classList.add("hidden"),A.classList.remove("hidden"),A.value="",P.value=""):(k.classList.remove("hidden"),A.classList.add("hidden"),S(N),P.value="")}),k.addEventListener("change",I=>{const N=I.target.selectedOptions[0];if(N&&N.value){A.value=N.text;const U=N.dataset.price;U&&(P.value=parseFloat(U).toFixed(2))}}),u};a.tiers&&a.tiers.length>0?a.tiers.forEach(d=>n.appendChild(l(d))):n.appendChild(l()),e.querySelector("#add-loyalty-tier").addEventListener("click",()=>{n.appendChild(l())}),n.addEventListener("click",d=>{const u=d.target.closest(".remove-loyalty-tier");u&&u.closest(".loyalty-tier-row").remove()}),e.querySelector("#loyalty-form").addEventListener("submit",d=>{d.preventDefault();const u=Array.from(e.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(p=>{const b=p.querySelector(".type-select").value,m=b==="money"?null:p.querySelector(".item-select").value;let h=b==="money"?p.querySelector(".desc-input").value:p.querySelector(".item-select").options[p.querySelector(".item-select").selectedIndex]?.text;return{points:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,costPoints:parseInt(p.querySelector('input[data-field="points"]').value,10)||0,type:b,itemId:m,reward:h,name:h,discount:parseFloat(p.querySelector('input[data-field="discount"]').value)||0}}),c={loyaltyProgram:{enabled:e.querySelector("#loyaltyEnabled").checked,type:"visit",pointsPerVisit:parseInt(e.querySelector("#loyaltyPointsPerVisit").value,10)||1,pointsPerCurrency:0,tiers:u.filter(p=>p.points>0&&p.reward)}};bt(c,d)})}async function Ld(t,e){e.innerHTML=`
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
    `;try{const[a,s]=await Promise.all([Ea(se),ms(se)]),r=t.financialIntegration||{},o=t.commissionConfig||{},i=t.purchaseConfig||{};e.querySelector("#financialNatureId").innerHTML=We(a,r.defaultNaturezaId),e.querySelector("#financialCostCenterId").innerHTML=We(s,r.defaultCentroDeCustoId),e.querySelector("#purchaseNatureId").innerHTML=We(a,i.defaultNatureId),e.querySelector("#purchaseCostCenterId").innerHTML=We(s,i.defaultCostCenterId),e.querySelector("#commissionNatureId").innerHTML=We(a,o.defaultNatureId),e.querySelector("#commissionCostCenterId").innerHTML=We(s,o.defaultCostCenterId)}catch{f("Erro","Não foi possível carregar o plano de contas da unidade.","error")}e.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const s={financialIntegration:{defaultNaturezaId:e.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:e.querySelector("#financialCostCenterId").value||null},purchaseConfig:{defaultNatureId:e.querySelector("#purchaseNatureId").value||null,defaultCostCenterId:e.querySelector("#purchaseCostCenterId").value||null},commissionConfig:{defaultNatureId:e.querySelector("#commissionNatureId").value||null,defaultCostCenterId:e.querySelector("#commissionCostCenterId").value||null}};bt(s,a)})}function Cd(t,e){const a=`https://wa.me/5516997859430?text=Olá, preciso de ajuda com o sistema Kairos (Minha Unidade: ${t.name}).`;e.innerHTML=`
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
    `}function Dd(t,e){const a=`https://wa.me/5516997859430?text=Gostaria de solicitar o cancelamento da assinatura. (Unidade: ${t.name})`;e.innerHTML=`
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
    `}function Pd(t,e){const a=e.querySelector("#slotIntervalContainer"),s=e.querySelector("#establishmentSlotInterval");if(!a||!s)return;const r=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=r.map(o=>{const i=o.value===t;return`<button type="button" data-value="${o.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors shadow-sm
                           ${i?"bg-indigo-600 text-white":"bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}">
                       ${o.label}
                   </button>`}).join(""),s.value=t,a.querySelectorAll(".interval-btn").forEach(o=>{o.addEventListener("click",()=>{s.value=o.dataset.value,a.querySelectorAll(".interval-btn").forEach(i=>{i.classList.remove("bg-indigo-600","text-white"),i.classList.add("bg-white","border","border-gray-300","text-gray-700")}),o.classList.add("bg-indigo-600","text-white"),o.classList.remove("bg-white","border","border-gray-300","text-gray-700")})})}async function Td(t){const a=xr().find(r=>r.id===t);if(!a)return;Oe.innerHTML=`
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
    `,Oe.querySelector('button[data-action="back-to-menu"]').addEventListener("click",r=>{r.preventDefault(),vr({id:se})});const s=document.getElementById("settings-content-detail");switch(t){case"personal-data":yd(K,s);break;case"change-password":wd(K,s);break;case"change-email":kd(K,s);break;case"branding":Sd(K,s);break;case"booking":$d(K,s);break;case"working-hours":Id(K,s);break;case"whatsapp-bot":hr(K,s);break;case"loyalty":await Ed(K,s);break;case"financial":await Ld(K,s);break;case"support":Cd(K,s);break;case"cancellation":Dd(K,s);break;default:s.innerHTML='<div class="p-4 text-center">Módulo em construção.</div>'}}async function vr(t={}){Oe.innerHTML=`
        <div class="flex flex-col justify-center items-center h-64">
            <div class="spinner-border text-indigo-600 border-4 w-12 h-12 mb-4" role="status"></div>
            <p class="text-gray-500 font-medium">A carregar configurações da unidade...</p>
        </div>
    `;try{se=t.id||g.establishmentId,K=await je(se);const e=t.id?`<button onclick="window.navigateTo('establishments-section')" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                   <i class="bi bi-diagram-3"></i> Voltar à Rede
               </button>`:"",a=K.isMatriz||!K.parentId?'<span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded ml-3">🏢 MATRIZ</span>':'<span class="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded ml-3">📍 UNIDADE</span>',s=xr();Oe.innerHTML=`
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
                        ${Md(K.modules||{})}
                    </div>
                </div>
            </div>
        `,Oe.querySelectorAll("div[data-section]").forEach(r=>{r.addEventListener("click",o=>{Td(r.dataset.section)})}),Oe.querySelectorAll(".module-toggle").forEach(r=>{r.addEventListener("change",async()=>{const o=r.dataset.module;try{const n={...(await je(se)).modules,[o]:r.checked};await ps(se,{modules:n}),f("Módulos","Módulos atualizados com sucesso.","success")}catch(i){r.checked=!r.checked,f("Erro",i.message,"error")}})})}catch(e){Oe.innerHTML=`
            <div class="p-8 text-center max-w-md mx-auto">
                <i class="bi bi-exclamation-triangle text-4xl text-red-500 mb-4 block"></i>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Erro ao carregar loja</h2>
                <p class="text-gray-600">${e.message}</p>
                <button onclick="window.navigateTo('establishments-section')" class="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700">Voltar à Rede</button>
            </div>
        `}}function Md(t){return[{key:"agenda-section",label:"Agenda Diária",icon:"bi-calendar"},{key:"comandas-section",label:"Comandas e PDV",icon:"bi-receipt"},{key:"financial-section",label:"Financeiro Completo",icon:"bi-cash-coin"},{key:"reports-section",label:"Relatórios Gerenciais",icon:"bi-graph-up"}].map(a=>`
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
    `).join("")}const It=document.getElementById("content");async function at(t){const e=document.getElementById("blockagesList");if(e){e.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,s=document.getElementById("filterEndDate")?.value,r=await Ca(g.establishmentId,a||new Date().toISOString().split("T")[0],s||new Date().toISOString().split("T")[0],t),o=document.getElementById("filterReason")?.value.toLowerCase(),i=o?r.filter(l=>l.reason&&l.reason.toLowerCase().includes(o)):r,n=i.reduce((l,d)=>{const u=d.reason||"Sem motivo";return l[u]||(l[u]=[]),l[u].push(d),l},{});if(e.innerHTML="",i.length===0){e.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(n).forEach(([l,d])=>{const u=document.createElement("div");u.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let p=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${v(l)} (${d.length})</h4>`;if(d.length>1){const b=JSON.stringify(d.map(m=>m.id));p+=`<button data-action="batch-delete-blockage" data-ids='${b}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}p+="</div>",u.innerHTML=p,d.forEach(b=>{const m=new Date(b.startTime),h=new Date(b.endTime),y=m.toLocaleDateString("pt-BR"),k=h.toLocaleDateString("pt-BR"),P=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${y===k?`${y} | ${m.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${h.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${y} às ${m.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${k} às ${h.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${b.id}">Apagar</button>
                    </div>`;u.innerHTML+=P}),e.appendChild(u)})}catch(a){e.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function Ad(t){t.preventDefault();const e=t.target,a=e.querySelector("#blockageProfId").value,s=e.querySelector("#blockageDate").value,r=e.querySelector("#blockageEndDate").value||s,o=e.querySelector("#blockageStartTime").value,i=e.querySelector("#blockageEndTime").value,n={establishmentId:g.establishmentId,professionalId:a,startTime:new Date(`${s}T${o}:00`).toISOString(),endTime:new Date(`${r}T${i}:00`).toISOString(),reason:e.querySelector("#blockageReason").value};try{await Da(n),e.reset(),f("Sucesso","Bloqueio adicionado com sucesso!","success"),at(a)}catch(l){f("Erro",`Não foi possível criar o bloqueio: ${l.message}`,"error")}}async function Bd(t){t.preventDefault();const e=t.target,a=Array.from(e.querySelectorAll('input[name="batch-professionals"]:checked')).map(u=>u.value);if(a.length===0)return f("Atenção","Selecione pelo menos um profissional.","error");const s=e.querySelector("#batchBlockageDate").value,r=e.querySelector("#batchBlockageEndDate").value||s,o=e.querySelector("#batchBlockageStartTime").value,i=e.querySelector("#batchBlockageEndTime").value,n=e.querySelector("#batchBlockageReason").value,l=e.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="Aguarde...";const d=a.map(u=>{const c={establishmentId:g.establishmentId,professionalId:u,startTime:new Date(`${s}T${o}:00`).toISOString(),endTime:new Date(`${r}T${i}:00`).toISOString(),reason:n};return Da(c)});try{await Promise.all(d),f("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),e.reset(),e.querySelectorAll('input[name="batch-professionals"]:checked').forEach(c=>c.checked=!1);const u=document.getElementById("blockageProfId").value;u&&at(u)}catch(u){f("Erro",`Ocorreu um erro: ${u.message}`,"error")}finally{l.disabled=!1,l.textContent="Adicionar Bloqueio em Lote"}}function jd(t){It.addEventListener("submit",e=>{e.target.id==="blockageForm"&&Ad(e),e.target.id==="batchBlockageForm"&&Bd(e)}),It.addEventListener("input",e=>{e.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&at(t)}),It.addEventListener("click",async e=>{const a=e.target.closest("button[data-action]");if(!a)return;const s=a.dataset.action;if(s==="back-to-professionals")oe("profissionais-section");else if(s==="delete-blockage"){if(await Q("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await fs(a.dataset.id),f("Sucesso","Bloqueio removido.","success"),at(t)}catch(o){f("Erro",`Não foi possível remover o bloqueio: ${o.message}`,"error")}}else if(s==="batch-delete-blockage"){const r=JSON.parse(a.dataset.ids);if(await Q("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${r.length} bloqueios de uma vez?`))try{await Oo(r),f("Sucesso",`${r.length} bloqueios removidos.`,"success"),at(t)}catch(i){f("Erro",`Não foi possível apagar os bloqueios: ${i.message}`,"error")}}})}async function qd(t){const{professionalId:e,professionalName:a}=t;if(!e||!a){It.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}const s=v(a);It.innerHTML=`
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
        </section>`,jd(e),await at(e);const r=document.getElementById("batchProfSelectionContainer");try{const o=await Ee(g.establishmentId);r.innerHTML=o.map(i=>`
            <div class="flex items-center">
                <input id="prof-batch-${i.id}" value="${i.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${i.id}" class="ml-2 text-sm text-gray-700">${v(i.name)}</label>
            </div>`).join("")}catch{r.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Nd=t=>L(`/api/users/${t}`),Fd=t=>L("/api/users",{method:"POST",body:JSON.stringify(t)}),Rd=(t,e)=>L(`/api/users/${t}`,{method:"PUT",body:JSON.stringify(e)}),Hd=t=>L(`/api/users/${t}`,{method:"DELETE"}),Od=(t,e)=>L(`/api/users/${t}/password`,{method:"PUT",body:JSON.stringify({password:e})}),zd=(t,e)=>L(`/api/users/${t}/status`,{method:"PATCH",body:JSON.stringify({status:e})}),mt=document.getElementById("content"),_d={"Operação & Atendimento":{"dashboard-section":"Dashboard","agenda-section":"Agenda","comandas-section":"Comandas","ausencias-section":"Ausências e Bloqueios"},"Financeiro & Vendas":{"financial-section":"Financeiro (ERP)","sales-report-section":"Relatório de Vendas","commissions-section":"Comissões","packages-section":"Planos e Pacotes"},"Cadastros Base":{"clientes-section":"Clientes","profissionais-section":"Profissionais","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores"},Administração:{"relatorios-section":"Relatórios Gerais","estabelecimento-section":"Configurações da Empresa","users-section":"Usuários e Acessos"}},Vd={view:"Visualizar",create:"Criar",edit:"Editar"},Gs={owner:{label:"Proprietário",color:"bg-rose-100 text-rose-700 border-rose-200"},group_admin:{label:"Admin da Rede",color:"bg-purple-100 text-purple-700 border-purple-200"},company_admin:{label:"Gestor Matriz",color:"bg-blue-100 text-blue-700 border-blue-200"},branch_manager:{label:"Gestor Filial",color:"bg-orange-100 text-orange-700 border-orange-200"},professional:{label:"Profissional",color:"bg-slate-100 text-slate-600 border-slate-200"}};let Gt=null,Yt=null,Je=null,st=null;function yr(){const t=document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');return t.length>0?Array.from(t).map(e=>e.value):[g.currentViewContext?.id||g.establishmentId]}function Ud(t){const e=document.getElementById("usersListContainer");if(!e)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(t.length===0){const s=a?"Nenhum usuário encontrado na base.":"Nenhum usuário ativo neste contexto.";e.innerHTML=`
            <div class="col-span-full py-16 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3"><i class="bi bi-people text-3xl text-slate-300"></i></div>
                <h3 class="text-sm font-bold text-slate-700 mb-1">${s}</h3>
                <p class="text-[10px] text-slate-500 max-w-xs">Tente selecionar mais unidades no topo da tela ou exibir inativos.</p>
            </div>`;return}t.sort((s,r)=>s.role==="owner"&&r.role!=="owner"?-1:s.role!=="owner"&&r.role==="owner"?1:(s.status==="active"?-1:1)-(r.status==="active"?-1:1)),e.innerHTML=t.map(s=>{const r=JSON.stringify(s).replace(/'/g,"&apos;"),o=s.status==="active",i=g.professionals?.find(u=>u.id===s.professionalId);i&&i.name;const n=i?i.name.charAt(0):s.name.charAt(0),l=s.photo||i?.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(n)}`,d=Gs[s.role]||Gs.professional;return`
        <div class="user-card-clickable bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between p-4 cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all active:scale-[0.99] ${o?"":"opacity-60 bg-slate-50"}" 
             data-action="edit-user" data-user='${r}'>
            
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
        `}).join("")}function wr(){const e=document.getElementById("showInactiveUsersToggle")?.checked?g.users:g.users.filter(a=>a.status==="active");Ud(e)}function Wd(t={}){let e="",a=!1;for(const[s,r]of Object.entries(_d)){const o=Object.entries(r).filter(([i,n])=>{const l=i.replace("-section","");return!(g.enabledModules&&g.enabledModules[l]===!1)});o.length!==0&&(a=!0,e+=`
        <div class="mb-6 last:mb-0">
            <h4 class="font-black text-[10px] text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2"><i class="bi bi-folder2-open text-indigo-400 mr-1"></i> ${s}</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        `,o.forEach(([i,n])=>{const l=i==="agenda-section"||i==="comandas-section",d=t[i]?.view_all_prof===!0,u=Object.entries(Vd).map(([p,b])=>`
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
            `}),e+="</div></div>")}return a?e:'<div class="p-6 bg-red-50 border border-red-100 rounded-2xl text-center"><p class="text-sm font-bold text-red-600">Sua empresa não possui módulos ativados. Contate o administrador do sistema.</p></div>'}function Ys(t){if(!st||g.userRole==="professional")return"";const e=t?.accessibleEstablishments?.map(o=>o.id)||[],a=t?.accessibleCompanies?.map(o=>o.id)||[],s=t?.role||"professional";if(s==="owner"||s==="group_admin")return'<div class="p-5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-800 text-sm font-black flex items-center justify-center gap-3"><i class="bi bi-shield-check text-2xl"></i> Acesso Total (Toda a Rede)</div>';let r='<div class="space-y-3 max-h-60 overflow-y-auto custom-scrollbar p-1">';return st.companies.forEach(o=>{const i=a.includes(o.id),n=st.branches.filter(l=>l.companyId===o.id);r+=`
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
        `}),r+="</div>",r}async function Xs(t=null){document.getElementById("user-list-view").classList.add("hidden");const e=document.getElementById("user-form-view");e.classList.remove("hidden");let a=g.professionals;if(!a||a.length===0)try{const p=yr().map(h=>Ee(h)),b=await Promise.all(p),m=new Map;b.flat().forEach(h=>m.set(h.id,h)),a=Array.from(m.values()),g.professionals=a}catch(c){console.warn("Profissionais não carregados",c)}if(["owner","group_admin","company_admin"].includes(g.userRole)&&!st)try{const c=await we();c&&(st=c)}catch(c){console.error("Falha ao buscar hierarquia",c),st={companies:[],branches:[]}}const s=t!==null,r=s&&t.role==="owner",o=e.querySelector("#userFormTitle");o.innerHTML=s?`<i class="bi bi-person-lines-fill mr-2 text-indigo-600"></i>Editar Perfil: ${t.name}`:'<i class="bi bi-person-plus-fill mr-2 text-indigo-600"></i>Novo Acesso';const i=e.querySelector("#userForm");i.innerHTML=`
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
                    ${["owner","group_admin","company_admin"].includes(g.userRole)?`
                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 class="font-black text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3 mb-5"><i class="bi bi-diagram-3 text-indigo-500 text-lg"></i> Permissões de Rede</h3>
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <label class="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2 ml-1">Qual o cargo/nível na empresa?</label>
                                <select id="userRole" class="w-full p-3.5 border border-indigo-200 rounded-xl text-sm font-black text-indigo-900 bg-indigo-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-colors" ${r?"disabled":""}>
                                    
                                    ${["owner","group_admin"].includes(g.userRole)?`<option value="group_admin" ${t?.role==="group_admin"?"selected":""}>Administrador Geral (Acesso Total)</option>`:""}
                                    <option value="company_admin" ${t?.role==="company_admin"?"selected":""}>Gestor de Matriz / Empresa</option>
                                    <option value="branch_manager" ${t?.role==="branch_manager"?"selected":""}>Gestor de Filial (Loja)</option>
                                    <option value="professional" ${t?.role==="professional"?"selected":""}>Profissional / Recepção (Padrão)</option>
                                </select>
                            </div>
                            <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <label class="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3 ml-1">Unidades que pode visualizar</label>
                                <div id="hierarchySelectorContainer">
                                    ${Ys(t)}
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
                        ${Wd(t?.permissions)}
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
    `;const n=e.querySelectorAll(".tab-btn"),l=e.querySelectorAll(".tab-content");n.forEach(c=>{c.addEventListener("click",()=>{n.forEach(b=>{b.classList.remove("active","text-indigo-600","border-indigo-600"),b.classList.add("text-slate-400","border-transparent")}),l.forEach(b=>b.classList.add("hidden")),c.classList.add("active","text-indigo-600","border-indigo-600"),c.classList.remove("text-slate-400","border-transparent");const p=c.getAttribute("data-tab");e.querySelector(`#${p}`).classList.remove("hidden")})});const d=i.querySelector("#userRole"),u=i.querySelector("#hierarchySelectorContainer");if(d&&u){d.addEventListener("change",p=>{const b={...t,role:p.target.value};u.innerHTML=Ys(b),c()});const c=()=>{u.querySelectorAll(".company-checkbox").forEach(p=>{p.addEventListener("change",b=>{b.target.closest(".company-block").querySelectorAll(".branch-checkbox").forEach(y=>{y.checked=b.target.checked;const k=y.nextElementSibling.querySelector(".dot");k&&(b.target.checked?k.classList.add("transform","translate-x-4"):k.classList.remove("transform","translate-x-4"))})})})};c()}if(i.querySelectorAll(".permission-checkbox").forEach(c=>{if(c.addEventListener("change",p=>{const b=p.target.nextElementSibling,m=b.nextElementSibling;p.target.checked?(b.classList.replace("bg-slate-200","bg-indigo-500"),m.classList.add("transform","translate-x-4")):(b.classList.replace("bg-indigo-500","bg-slate-200"),m.classList.remove("transform","translate-x-4"))}),c.checked){const p=c.nextElementSibling,b=p.nextElementSibling;p.classList.replace("bg-slate-200","bg-indigo-500"),b.classList.add("transform","translate-x-4")}}),i.onsubmit=async c=>{c.preventDefault();const p=i.querySelector('button[type="submit"]'),b=p.innerHTML;p.disabled=!0,p.innerHTML='<span class="spinner-border spinner-border-sm mr-2"></span> Processando...';const m={};i.querySelectorAll(".permission-checkbox").forEach(S=>{const I=S.dataset.module,N=S.dataset.permission;m[I]||(m[I]={}),m[I][N]=S.checked});const h=i.querySelector("#userProfessionalId").value||null,y=i.querySelector("#userRole")?.value||"professional",k=[],A=[];if(y!=="group_admin"&&y!=="owner"&&i.querySelector(".company-checkbox")&&(i.querySelectorAll(".company-checkbox:checked").forEach(S=>{k.push({id:S.value,name:S.dataset.name})}),i.querySelectorAll(".branch-checkbox:checked").forEach(S=>{A.push({id:S.value,name:S.dataset.name,companyId:S.dataset.companyId})}),A.length===0))return p.disabled=!1,p.innerHTML=b,f("Atenção","Selecione pelo menos uma filial na aba de Acesso.","warning");const P={name:i.querySelector("#userName").value,permissions:m,professionalId:h,role:y,accessibleCompanies:k,accessibleEstablishments:A};try{if(s){const S=i.querySelector("#userEmail").value;t?.email!==S&&!r&&(P.email=S),await Rd(t.id,P),f("Sucesso","Usuário atualizado.","success")}else P.email=i.querySelector("#userEmail").value,P.password=i.querySelector("#userPassword").value,await Fd(P),f("Sucesso","Novo usuário cadastrado na plataforma.","success");xa()}catch(S){f(`Erro: ${S.message}`,"error"),p.disabled=!1,p.innerHTML=b}},s){const c=i.querySelector("#btn-show-password"),p=i.querySelector("#password-form");c&&p&&(c.onclick=()=>{c.classList.add("hidden"),p.classList.remove("hidden")},i.querySelector("#btn-cancel-pwd").onclick=()=>{c.classList.remove("hidden"),p.classList.add("hidden"),p.querySelector("#userNewPassword").value=""},i.querySelector("#btn-save-pwd").onclick=async b=>{const m=b.target,h=p.querySelector("#userNewPassword").value;if(!h||h.length<6)return f("Aviso","Senha deve ter no mínimo 6 caracteres.","warning");if(await Q("Alterar Senha","O usuário usará esta nova senha no próximo acesso. Confirma?"))try{m.disabled=!0,m.textContent="Aguarde...",await Od(t.id,h),f("Sucesso","Senha alterada com segurança.","success"),c.classList.remove("hidden"),p.classList.add("hidden")}catch(y){f("Erro",y.message,"error")}finally{m.disabled=!1,m.textContent="Salvar Senha"}})}}async function Zs(){const t=document.getElementById("usersListContainer");if(t){t.innerHTML='<div class="col-span-full py-16 flex justify-center"><div class="loader"></div></div>';try{const e=yr(),a=e.map(l=>Nd(l)),s=e.map(l=>Ee(l)),r=await Promise.all(a),o=await Promise.all(s),i=new Map;r.flat().forEach(l=>i.set(l.id,l)),g.users=Array.from(i.values());const n=new Map;o.flat().forEach(l=>n.set(l.id,l)),g.professionals=Array.from(n.values()),wr()}catch{f("Erro ao carregar base de usuários.","error"),t.innerHTML='<p class="col-span-full text-center font-bold text-red-500 bg-red-50 p-6 rounded-2xl">Falha de comunicação com o servidor de acessos.</p>'}}}async function xa(){mt.innerHTML=`
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
    `,Gt&&mt.removeEventListener("click",Gt),Yt&&mt.removeEventListener("change",Yt),Je&&(window.removeEventListener("kairos:contextChanged",Je),document.removeEventListener("change",Je)),Je=t=>{(t.type==="kairos:contextChanged"||t.target.closest("#multi-context-list"))&&document.getElementById("user-list-view")&&!document.getElementById("user-list-view").classList.contains("hidden")&&Zs()},window.addEventListener("kairos:contextChanged",Je),document.addEventListener("change",Je),Gt=async t=>{const e=t.target.closest("[data-action]");if(!e)return;switch(e.dataset.action){case"new-user":Xs();break;case"edit-user":const s=JSON.parse(e.dataset.user.replace(/&apos;/g,"'"));Xs(s);break;case"back-to-list":xa();break;case"delete-user":{if(t.stopPropagation(),await Q("Excluir Usuário","O usuário perderá totalmente o acesso ao sistema. Confirma?"))try{await Hd(e.dataset.userId),f("Usuário excluído com sucesso.","success"),xa()}catch(r){f(`Erro: ${r.message}`,"error")}break}}},Yt=async t=>{if(t.target.id==="showInactiveUsersToggle"){const e=t.target.nextElementSibling,a=e.nextElementSibling;t.target.checked?(e.classList.replace("bg-slate-200","bg-indigo-500"),a.classList.add("transform","translate-x-5")):(e.classList.replace("bg-indigo-500","bg-slate-200"),a.classList.remove("transform","translate-x-5")),wr()}else{const e=t.target.closest('input[data-action="toggle-user-status"]');if(e){t.stopPropagation();const a=e.dataset.userId,s=e.checked?"active":"inactive",r=e.nextElementSibling,o=r.nextElementSibling;e.checked?(r.classList.replace("bg-slate-300","bg-emerald-500"),o.classList.add("transform","translate-x-5")):(r.classList.replace("bg-emerald-500","bg-slate-300"),o.classList.remove("transform","translate-x-5"));try{await zd(a,s);const i=g.users.findIndex(n=>n.id===a);if(i>-1){g.users[i].status=s;const n=e.closest(".user-card-clickable");s==="inactive"?n.classList.add("opacity-60","bg-slate-50"):n.classList.remove("opacity-60","bg-slate-50")}}catch(i){f(`Erro: ${i.message}`,"error"),e.checked=!e.checked,e.checked?(r.classList.replace("bg-slate-300","bg-emerald-500"),o.classList.add("transform","translate-x-5")):(r.classList.replace("bg-emerald-500","bg-slate-300"),o.classList.remove("transform","translate-x-5"))}}}},mt.addEventListener("click",Gt),mt.addEventListener("change",Yt),await Zs()}const Jd=document.getElementById("content");let Ks={},ns=null;function Qd(){Object.values(Ks).forEach(t=>t?.destroy()),Ks={}}function Gd(t,e){if(!window.jspdf){f("Erro","Biblioteca PDF não carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a({orientation:"landscape",unit:"px",format:"a4"}),r=document.getElementById("salesReportSummaryCards");if(s.setFontSize(18),s.text(t,s.internal.pageSize.getWidth()/2,40,{align:"center"}),r){const i=[["Receita Total",r.querySelector("#summary-revenue").textContent],["Vendas Totais",r.querySelector("#summary-transactions").textContent],["Ticket Médio",r.querySelector("#summary-avg-ticket").textContent]];s.autoTable({startY:60,head:[["Métrica","Valor"]],body:i,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const o=s.lastAutoTable?s.lastAutoTable.finalY+20:60;s.text("Detalhes das Vendas",20,o),s.autoTable({html:`#${e}`,startY:o+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),s.save(`${t.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function eo(t){const e=document.getElementById("genericModal"),a=v(t.client),s=v(t.items),r=v(t.responsavelCaixa||"N/A"),o=(t.payments||[]).map(i=>`
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
    `,e.style.display="flex"}function Yd(t){const{summary:e,transactions:a}=t;document.getElementById("summary-revenue").textContent=`R$ ${e.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=e.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${e.averageTicket.toFixed(2)}`;const s=document.getElementById("paymentSummaryTableBody"),r=Object.entries(e.paymentMethodTotals).sort(([,n],[,l])=>l-n);s.innerHTML=r.map(([n,l])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${v(n.charAt(0).toUpperCase()+n.slice(1))}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${l.toFixed(2)}</td>
        </tr>
    `).join("");const o=document.getElementById("transactionsTableBody"),i=document.getElementById("mobileTransactionsList");if(a.length===0){const n='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';o.innerHTML=n,i.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}o.innerHTML=a.map((n,l)=>{const d=v(n.client),u=v(n.items),c=v(n.type);return`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${l}">
            <td class="w-24 py-3 px-4">${new Date(n.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${d}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${u}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${c}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${n.total.toFixed(2)}</td>
        </tr>
    `}).join(""),o.querySelectorAll("tr").forEach(n=>{n.addEventListener("dblclick",()=>{const l=n.dataset.transactionIndex,d=ns.transactions[l];d&&eo(d)})}),i.innerHTML=a.map((n,l)=>{const d=v(n.client),u=v(n.items),c=v(n.type);return`
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
    `}).join(""),i.querySelectorAll("div[data-transaction-index]").forEach(n=>{n.addEventListener("click",()=>{const l=n.dataset.transactionIndex,d=ns.transactions[l];d&&eo(d)})})}async function to(){const t=document.getElementById("main-reports-view"),e=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!t||!e||!a)return;const s=e.value,r=a.value;if(!s||!r)return f("Atenção","Por favor, selecione as datas de início e fim.","error");t.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const o=document.getElementById("cashierSessionFilter").value,i=await ca({establishmentId:g.establishmentId,startDate:s,endDate:r,cashierSessionId:o});ns=i,t.innerHTML=`
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
        `,Yd(i)}catch(o){f("Erro",`Não foi possível carregar o relatório: ${o.message}`,"error"),t.innerHTML=`<p class="p-8 text-center text-red-500">${v(o.message)}</p>`}}async function Xd(){Qd();const t=new Date().toISOString().split("T")[0],e=new Date;e.setDate(e.getDate()-30);const a=e.toISOString().split("T")[0];Jd.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",to),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const s=document.getElementById("reportStartDate").value,r=document.getElementById("reportEndDate").value,o=`Relatorio_Vendas_${s}_a_${r}`;Gd(o,"transactionsTable")});try{const s=await Pn(g.establishmentId),r=document.getElementById("cashierSessionFilter");s&&s.length>0&&s.forEach(o=>{const i=new Date(o.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),n=v(o.closedByName||"N/A");r.innerHTML+=`<option value="${o.id}">${n} - ${i}</option>`})}catch{f("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await to()}const Zd=document.getElementById("content");let w={payables:[],receivables:[],natures:[],costCenters:[],establishments:[],suppliers:[],clients:[],professionals:[],currentTab:"receivables",statusFilter:"all",startDate:new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],endDate:new Date(new Date().getFullYear(),new Date().getMonth()+1,0).toISOString().split("T")[0],filterNaturezaId:"all",filterCostCenterId:"all",searchQuery:"",isAdvancedFilterOpen:!1,selectedIds:new Set,isSelectionMode:!1,sortCol:"dueDate",sortAsc:!0},Xt=null,Zt=null;function Ls(t){const e=new Map,a=[];return t&&(t.forEach(s=>e.set(s.id,{...s,children:[]})),e.forEach(s=>{s.parentId&&e.has(s.parentId)?e.get(s.parentId).children.push(s):a.push(s)})),a}function kr(t){if(!t)return{day:"--",month:"---",full:"--/--/----"};const[e,a,s]=t.split("-"),r=new Date(e,a-1,s),o=String(r.getDate()).padStart(2,"0"),i=r.toLocaleString("pt-BR",{month:"short"}).toUpperCase().replace(".","");return{day:o,month:i,full:r.toLocaleDateString("pt-BR")}}function ve(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t)}function nt(t,e){if(e==="paid")return!1;const a=new Date;a.setHours(0,0,0,0);const[s,r,o]=t.split("-");return new Date(s,r-1,o)<a}function Kd(t,e,a){if(!t)return;if(!e||e.length===0){t.innerHTML=`
            <div class="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <i class="bi bi-inbox text-3xl text-gray-300"></i>
                <p class="text-gray-500 text-sm mt-2 font-medium">Nenhum item criado.</p>
            </div>`;return}const s=(r,o=0)=>{const i=o*16,n=o===0,l=n?"bi-folder-fill text-indigo-500":"bi-file-earmark-text text-gray-400",d=n?"bg-white shadow-sm border border-gray-200":"bg-gray-50 border border-gray-100",u=n?"text-sm font-bold text-gray-800":"text-sm font-semibold text-gray-600",c=o>0?'<div class="absolute left-0 top-1/2 w-3 border-t-2 border-gray-200" style="margin-left: -12px;"></div>':"",p=o>0?"border-left: 2px solid #e5e7eb;":"";return`
            <div class="relative flex justify-between items-center ${d} p-3 rounded-xl mb-2 hover:border-indigo-300 transition-all group" style="margin-left: ${i}px; ${p}">
                ${c}
                <span class="${u} flex items-center gap-2">
                    <i class="bi ${l} text-lg"></i>
                    ${v(r.name)}
                </span>
                <button type="button" data-action="delete-${a}" data-id="${r.id}" class="text-gray-400 hover:text-red-600 text-xs w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-red-100" title="Excluir">
                    <i class="bi bi-trash3 text-sm"></i>
                </button>
            </div>
            ${r.children.map(b=>s(b,o+1)).join("")}
        `};t.innerHTML=e.map(r=>s(r)).join("")}async function ao(t){const e=document.getElementById("genericModal"),a=t==="nature",s=a?"Plano de Naturezas":"Centros de Custo",r=a?Ea:ms,o=a?Ui:Wi,i=a?"natures":"costCenters";e.className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 p-0 md:p-6",e.innerHTML=`
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
        </div>`,e.style.display="flex",requestAnimationFrame(()=>{e.classList.remove("opacity-0");const c=e.querySelector("#modal-content-wrapper");c&&(c.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),c.classList.add("translate-y-0","md:scale-100","md:opacity-100"))});const n=e.querySelector("#hierarchyList"),l=e.querySelector("#itemParent"),d=c=>{const p=Ls(c);Kd(n,p,t);const b=l.value;l.innerHTML='<option value="">-- Nível Principal --</option>';const m=(h,y=0)=>{const k="  ".repeat(y)+(y>0?"↳ ":"");l.innerHTML+=`<option value="${h.id}">${k}${v(h.name)}</option>`,h.children.forEach(A=>m(A,y+1))};p.forEach(h=>m(h)),l.value=b};try{const c=await r(g.establishmentId);w[i]=c,d(c)}catch(c){console.error(c)}const u=e.querySelector("#hierarchyForm");u.addEventListener("submit",async c=>{c.preventDefault();const p=e.querySelector("#itemName").value,b=l.value;try{await o({name:p,parentId:b||null,establishmentId:g.establishmentId});const m=await r(g.establishmentId);w[i]=m,d(m),u.reset(),await Me(),f("Sucesso","Item adicionado à estrutura.","success")}catch(m){f("Erro",m.message,"error")}})}function At(){const t=document.getElementById("genericModal");t.classList.add("opacity-0");const e=t.querySelector("#modal-content-wrapper");e&&(e.classList.remove("translate-y-0","md:scale-100","md:opacity-100"),e.classList.add("translate-y-full","md:scale-95","md:opacity-0")),setTimeout(()=>{t.style.display="none",t.className="modal fade fixed inset-0 z-[9999] overflow-y-auto",t.innerHTML=""},300)}async function ec(){try{const e=(await we()).matrizes||[];w.establishments=[],e.forEach(a=>{w.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>w.establishments.push({id:s.id,name:s.name,type:"Filial"}))})}catch(t){console.warn("Erro ao buscar lojas",t)}Sr(),$r(),await Me()}function Sr(){Zd.innerHTML=`
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
                        <button id="tab-receivables" class="flex-1 md:w-40 py-2.5 text-sm font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${w.currentTab==="receivables"?"bg-white md:bg-emerald-50 text-emerald-700 shadow-sm md:shadow-none":"text-gray-500 hover:text-gray-800"}">
                            A Receber
                        </button>
                        <button id="tab-payables" class="flex-1 md:w-40 py-2.5 text-sm font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${w.currentTab==="payables"?"bg-white md:bg-red-50 text-red-700 shadow-sm md:shadow-none":"text-gray-500 hover:text-gray-800"}">
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
                            <input type="text" id="searchInput" value="${w.searchQuery}" placeholder="Procurar por nome ou nota..." class="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 shadow-sm rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                        </div>
                    </div>

                    <div id="filter-panel" class="hidden animate-fade-in-down">
                        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                            <div class="grid grid-cols-2 gap-4 flex-1">
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Inicial</label>
                                    <input type="date" id="filterStartDate" value="${w.startDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Final</label>
                                    <input type="date" id="filterEndDate" value="${w.endDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
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
                        <button data-status="all" class="status-filter-btn px-4 py-2 text-sm font-bold rounded-xl transition whitespace-nowrap shadow-sm ${w.statusFilter==="all"?"bg-gray-900 text-white":"bg-white text-gray-600 hover:bg-gray-50"}">Todos os Status</button>
                        <button data-status="pending" class="status-filter-btn px-4 py-2 text-sm font-bold rounded-xl transition whitespace-nowrap shadow-sm ${w.statusFilter==="pending"?"bg-blue-600 text-white":"bg-white text-gray-600 hover:bg-gray-50"}">Pendente</button>
                        <button data-status="paid" class="status-filter-btn px-4 py-2 text-sm font-bold rounded-xl transition whitespace-nowrap shadow-sm ${w.statusFilter==="paid"?"bg-emerald-600 text-white":"bg-white text-gray-600 hover:bg-gray-50"}">Baixado</button>
                        <button data-status="overdue" class="status-filter-btn px-4 py-2 text-sm font-bold rounded-xl transition whitespace-nowrap shadow-sm ${w.statusFilter==="overdue"?"bg-red-600 text-white":"bg-white text-gray-600 hover:bg-gray-50"}">Atrasado</button>
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
    `,Ir()}function tc(){const t=w.currentTab==="receivables",e=t?w.receivables:w.payables;let a=e;if(w.statusFilter!=="all"&&(a=e.filter(n=>{const l=nt(n.dueDate,n.status);return w.statusFilter==="overdue"?l:w.statusFilter==="pending"?n.status==="pending"&&!l:n.status===w.statusFilter})),w.searchQuery&&(a=a.filter(n=>n.description&&n.description.toLowerCase().includes(w.searchQuery)||n.entity&&n.entity.toLowerCase().includes(w.searchQuery)||n.notes&&n.notes.toLowerCase().includes(w.searchQuery))),a.sort((n,l)=>new Date(n.dueDate)-new Date(l.dueDate)),a.length===0){f("Aviso","Não há dados para exportar com os filtros atuais.","info");return}const s=new Map(w.natures.map(n=>[n.id,n.name])),r=new Map(w.costCenters.map(n=>[n.id,n.name])),o=new Map(w.establishments.map(n=>[n.id,n])),i=a.map(n=>{const l=n.status==="paid",d=nt(n.dueDate,n.status);let u=l?"Baixado":d?"Atrasado":"A Vencer / Pendente";const c=n.naturezaId?s.get(n.naturezaId)||"Não Categorizado":"Geral",p=n.centroDeCustoId?r.get(n.centroDeCustoId)||"Não Categorizado":"Geral",b=o.get(n.establishmentId),m=b?b.name:"Atual",h=n.saleId||n.appointmentId||n.origin==="comanda"?"Comanda / PDV":n.origin==="commission"?"Comissões":"Manual";return{"Data de Vencimento":new Date(n.dueDate).toLocaleDateString("pt-BR"),"Data de Pagamento":n.paymentDate?new Date(n.paymentDate).toLocaleDateString("pt-BR"):"-",Descrição:n.description||"","Favorecido / Pagador":n.entity||"",Unidade:m,Natureza:c,"Centro de Custo":p,Origem:h,"Documento / NFS":n.documentNumber||"",Status:u,"Valor (R$)":n.amount}});try{if(typeof XLSX>"u"){f("Erro","A biblioteca de exportação (XLSX) não foi carregada no sistema.","error");return}const n=XLSX.utils.json_to_sheet(i),l=XLSX.utils.book_new();XLSX.utils.book_append_sheet(l,n,"Financeiro");const u=`Fluxo_${t?"Receitas":"Despesas"}_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(l,u)}catch(n){console.error("Erro ao exportar:",n),f("Erro","Não foi possível exportar para Excel.","error")}}function ac(){document.querySelectorAll(".sort-header").forEach(t=>{const e=t.querySelector("i.bi-chevron-expand, i.bi-chevron-up, i.bi-chevron-down");if(!e)return;t.dataset.sort===w.sortCol?(t.classList.add("text-indigo-700"),t.classList.remove("text-gray-500"),e.className=w.sortAsc?"bi bi-chevron-up ml-1 text-indigo-600 text-[11px] font-black":"bi bi-chevron-down ml-1 text-indigo-600 text-[11px] font-black"):(t.classList.remove("text-indigo-700"),t.classList.add("text-gray-500"),e.className="bi bi-chevron-expand ml-1 opacity-40 text-[10px] font-black")})}function $r(){document.querySelectorAll(".sort-header").forEach(o=>{o.addEventListener("click",i=>{const n=i.currentTarget.dataset.sort;w.sortCol===n?w.sortAsc=!w.sortAsc:(w.sortCol=n,w.sortAsc=!0),Et()})});const t=document.getElementById("select-all-toggle");t&&t.addEventListener("change",o=>{const i=o.target.checked,n=document.querySelectorAll(".item-checkbox");w.selectedIds.clear(),n.forEach(l=>{l.checked=i,i&&w.selectedIds.add(l.value)}),Ke()}),document.getElementById("cancel-selection-btn").addEventListener("click",()=>{w.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(o=>o.checked=!1),Ke()}),document.getElementById("batch-delete-btn").addEventListener("click",async()=>{const o=w.selectedIds.size;if(o===0)return;if(await Q("Excluir Lançamentos",`Deseja realmente apagar ${o} registros financeiros?`))try{const n=w.currentTab==="payables"?"payables":"receivables";await qo(n,Array.from(w.selectedIds)),f("Sucesso",`${o} itens excluídos.`,"success"),w.selectedIds.clear(),Ke(),Me()}catch{f("Erro","Falha ao excluir itens.","error")}}),document.getElementById("custom-date-btn").addEventListener("click",()=>{const o=document.getElementById("filter-panel"),i=document.getElementById("custom-date-btn");w.isAdvancedFilterOpen=!w.isAdvancedFilterOpen,w.isAdvancedFilterOpen?(o.classList.remove("hidden"),i.classList.add("bg-gray-900","text-white","border-gray-900"),i.classList.remove("bg-white","text-gray-600","border-gray-200")):(o.classList.add("hidden"),i.classList.remove("bg-gray-900","text-white","border-gray-900"),i.classList.add("bg-white","text-gray-600","border-gray-200"))});const e=document.getElementById("export-excel-btn");e&&e.addEventListener("click",tc);const a=document.getElementById("settings-btn");a&&a.addEventListener("click",rc),document.querySelectorAll('[data-action="new-financial"]').forEach(o=>{o.addEventListener("click",i=>{navigator.vibrate&&navigator.vibrate(20),oo(i.target.closest("button").dataset.type)})});const s=document.getElementById("tab-receivables"),r=document.getElementById("tab-payables");s.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15),so("receivables")}),r.addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15),so("payables")}),document.querySelectorAll(".status-filter-btn").forEach(o=>{o.addEventListener("click",i=>{navigator.vibrate&&navigator.vibrate(15),document.querySelectorAll(".status-filter-btn").forEach(l=>{l.classList.remove("bg-gray-900","bg-blue-600","bg-emerald-600","bg-red-600","text-white"),l.classList.add("bg-white","text-gray-600")});const n=i.target.dataset.status;n==="all"?i.target.classList.add("bg-gray-900","text-white"):n==="pending"?i.target.classList.add("bg-blue-600","text-white"):n==="paid"?i.target.classList.add("bg-emerald-600","text-white"):n==="overdue"&&i.target.classList.add("bg-red-600","text-white"),i.target.classList.remove("bg-white","text-gray-600"),w.statusFilter=n,Et()})}),document.querySelectorAll(".date-preset-btn").forEach(o=>{o.addEventListener("click",i=>{navigator.vibrate&&navigator.vibrate(15),document.querySelectorAll(".date-preset-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),i.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),i.target.classList.remove("bg-white","text-gray-600","border-gray-200");const n=i.target.dataset.preset,l=new Date;let d,u;n==="month"?(d=new Date(l.getFullYear(),l.getMonth(),1),u=new Date(l.getFullYear(),l.getMonth()+1,0)):n==="last_month"&&(d=new Date(l.getFullYear(),l.getMonth()-1,1),u=new Date(l.getFullYear(),l.getMonth(),0)),document.getElementById("filterStartDate").value=d.toISOString().split("T")[0],document.getElementById("filterEndDate").value=u.toISOString().split("T")[0],w.startDate=d.toISOString().split("T")[0],w.endDate=u.toISOString().split("T")[0],Me()})}),document.getElementById("searchInput").addEventListener("input",o=>{w.searchQuery=o.target.value.toLowerCase(),Et()}),document.getElementById("clear-filters-btn").addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(15);const o=new Date;document.getElementById("filterStartDate").value=new Date(o.getFullYear(),o.getMonth(),1).toISOString().split("T")[0],document.getElementById("filterEndDate").value=new Date(o.getFullYear(),o.getMonth()+1,0).toISOString().split("T")[0],document.getElementById("filterNaturezaId").value="all",document.getElementById("filterCostCenterId").value="all",Sr(),$r(),Me()}),document.getElementById("apply-filter-btn").addEventListener("click",()=>{navigator.vibrate&&navigator.vibrate(20),w.startDate=document.getElementById("filterStartDate").value,w.endDate=document.getElementById("filterEndDate").value,w.filterNaturezaId=document.getElementById("filterNaturezaId").value,w.filterCostCenterId=document.getElementById("filterCostCenterId").value,document.getElementById("custom-date-btn").click(),Me()}),Xt&&document.body.removeEventListener("click",Xt),Xt=o=>{const i=o.target;if(i.classList.contains("item-checkbox")||i.classList.contains("modal-item-checkbox")){const d=i.value||i.dataset.id;i.checked?w.selectedIds.add(d):w.selectedIds.delete(d),Ke(),o.stopPropagation();return}const n=i.closest("button[data-action]");if(n){const{action:d,type:u,id:c}=n.dataset;if(d==="mark-as-paid"){o.stopPropagation(),navigator.vibrate&&navigator.vibrate(20),sc(u,c);return}if(d==="delete"){o.stopPropagation(),navigator.vibrate&&navigator.vibrate(30);const p=n.closest(".financial-row").dataset.item;try{Lr(u,JSON.parse(decodeURIComponent(p)))}catch(b){console.error("Parse error on delete",b)}return}if(d==="manage-natures"){o.stopPropagation(),ao("nature");return}if(d==="manage-cost-centers"){o.stopPropagation(),ao("cost-center");return}if(d==="close-modal"){o.stopPropagation(),At();return}}const l=i.closest(".financial-row");if(l&&document.getElementById("list-container").contains(l)&&!i.closest("button")&&!i.closest(".item-checkbox")){navigator.vibrate&&navigator.vibrate(15);const{type:d}=l.dataset;try{const u=JSON.parse(decodeURIComponent(l.dataset.item));oo(d,u)}catch(u){console.error("Parse error on card click",u),f("Erro","Os dados deste lançamento não puderam ser lidos corretamente.","error")}}},document.body.addEventListener("click",Xt),Zt&&document.getElementById("genericModal").removeEventListener("click",Zt),Zt=o=>{const i=o.target.closest('button[data-action^="delete-"]');if(i){const n=i.dataset.action.split("-")[1];handleDeleteHierarchyItem(n,i.dataset.id)}o.target===document.getElementById("genericModal")&&At()},document.getElementById("genericModal").addEventListener("click",Zt)}function Ke(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=w.selectedIds.size;e.textContent=a,a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex"))}function so(t){w.currentTab=t,w.selectedIds.clear(),Ke(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1);const e=document.getElementById("tab-receivables"),a=document.getElementById("tab-payables");t==="receivables"?(e.classList.add("bg-white","md:bg-emerald-50","text-emerald-700","shadow-sm","md:shadow-none"),e.classList.remove("text-gray-500"),a.classList.remove("bg-white","md:bg-red-50","text-red-700","shadow-sm","md:shadow-none"),a.classList.add("text-gray-500")):(a.classList.add("bg-white","md:bg-red-50","text-red-700","shadow-sm","md:shadow-none"),a.classList.remove("text-gray-500"),e.classList.remove("bg-white","md:bg-emerald-50","text-emerald-700","shadow-sm","md:shadow-none"),e.classList.add("text-gray-500")),Et(),Er()}async function Me(){const t=document.getElementById("list-container");t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-sm">A sincronizar carteira...</p></div>';try{if(w.natures.length===0){const[i,n,l,d,u]=await Promise.all([Ea(g.establishmentId),ms(g.establishmentId),Mt(g.establishmentId).catch(()=>[]),ct(g.establishmentId,"",1e3).catch(()=>[]),Ee(g.establishmentId).catch(()=>[])]);w.natures=i||[],w.costCenters=n||[],w.suppliers=l||[],w.clients=d||[],w.professionals=u||[],Ir()}const a=(g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId]).join(","),s={startDate:w.startDate,endDate:w.endDate,establishmentId:a};w.filterNaturezaId!=="all"&&(s.natureId=w.filterNaturezaId),w.filterCostCenterId!=="all"&&(s.costCenterId=w.filterCostCenterId);const[r,o]=await Promise.all([gs(s),La(s)]);w.payables=r.entries||[],w.receivables=o.entries||[],Er(),Et()}catch(e){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-sm font-bold">Erro ao carregar dados: ${e.message}</p>
            </div>`}}function Ir(){const t=s=>{let r='<option value="all">Todas as categorias</option>';const o=Ls(s),i=(n,l=0)=>{const d="  ".repeat(l)+(l>0?"↳ ":"");r+=`<option value="${n.id}">${d}${v(n.name)}</option>`,n.children.forEach(u=>i(u,l+1))};return o.forEach(n=>i(n)),r},e=document.getElementById("filterNaturezaId"),a=document.getElementById("filterCostCenterId");e&&(e.innerHTML=t(w.natures)),a&&(a.innerHTML=t(w.costCenters))}function Er(){const t=document.getElementById("summary-section");if(!t)return;const e=w.currentTab==="receivables";let s=e?w.receivables:w.payables;w.searchQuery&&(s=s.filter(u=>u.description&&u.description.toLowerCase().includes(w.searchQuery)||u.entity&&u.entity.toLowerCase().includes(w.searchQuery)||u.notes&&u.notes.toLowerCase().includes(w.searchQuery)));const r=s.reduce((u,c)=>u+c.amount,0),o=s.filter(u=>u.status==="paid").reduce((u,c)=>u+c.amount,0),i=s.filter(u=>u.status==="pending"&&!nt(u.dueDate,u.status)).reduce((u,c)=>u+c.amount,0),n=s.filter(u=>nt(u.dueDate,u.status)).reduce((u,c)=>u+c.amount,0),l=e?"emerald":"red",d=e?"bi-arrow-down-left-circle-fill text-emerald-500":"bi-arrow-up-right-circle-fill text-red-500";t.innerHTML=`
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
    `}function Et(){const t=document.getElementById("list-container");if(!t)return;const e=w.currentTab==="receivables",a=e?w.receivables:w.payables;let s=a;if(w.statusFilter!=="all"&&(s=a.filter(c=>{const p=nt(c.dueDate,c.status);return w.statusFilter==="overdue"?p:w.statusFilter==="pending"?c.status==="pending"&&!p:c.status===w.statusFilter})),w.searchQuery&&(s=s.filter(c=>c.description&&c.description.toLowerCase().includes(w.searchQuery)||c.entity&&c.entity.toLowerCase().includes(w.searchQuery)||c.notes&&c.notes.toLowerCase().includes(w.searchQuery))),s.sort((c,p)=>{let b=c[w.sortCol],m=p[w.sortCol];return w.sortCol==="dueDate"?(b=new Date(b).getTime(),m=new Date(m).getTime()):(w.sortCol==="description"||w.sortCol==="status")&&(b=b?b.toLowerCase():"",m=m?m.toLowerCase():""),b<m?w.sortAsc?-1:1:b>m?w.sortAsc?1:-1:0}),ac(),s.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white">
                <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                    <i class="bi bi-wallet2 text-4xl text-gray-300"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-1">Sem resultados</h3>
                <p class="text-sm font-medium text-gray-400 text-center px-4">Não existem lançamentos com os filtros aplicados neste período.</p>
            </div>
        `;return}const r=new Map(w.natures.map(c=>[c.id,c.name])),o=new Map(w.costCenters.map(c=>[c.id,c.name])),i=new Map(w.establishments.map(c=>[c.id,c])),n=e?"receivable":"payable",l=e?"text-emerald-600":"text-red-600",d=e?'<i class="bi bi-arrow-down-left-circle-fill text-emerald-500 text-2xl drop-shadow-sm"></i>':'<i class="bi bi-arrow-up-right-circle-fill text-red-500 text-2xl drop-shadow-sm"></i>',u=e?'<i class="bi bi-arrow-down-left-circle-fill text-emerald-500 text-lg"></i>':'<i class="bi bi-arrow-up-right-circle-fill text-red-500 text-lg"></i>';t.innerHTML=s.map(c=>{const p=kr(c.dueDate),b=c.status==="paid",m=nt(c.dueDate,c.status);let h="";b?h='<span class="text-[9px] md:text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 md:px-2.5 py-1 rounded-lg uppercase tracking-widest"><i class="bi bi-check2-circle"></i> Baixado</span>':m?h='<span class="text-[9px] md:text-[10px] font-black text-red-600 bg-red-50 px-2 md:px-2.5 py-1 rounded-lg uppercase tracking-widest"><i class="bi bi-exclamation-circle"></i> Atraso</span>':h='<span class="text-[9px] md:text-[10px] font-black text-blue-600 bg-blue-50 px-2 md:px-2.5 py-1 rounded-lg uppercase tracking-widest"><i class="bi bi-clock"></i> Pendente</span>';const y=c.naturezaId&&r.get(c.naturezaId)||"Geral",k=c.centroDeCustoId&&o.get(c.centroDeCustoId)||"Geral",A=i.get(c.establishmentId);let P="";if(A){const C=A.type==="Matriz"?"bi-building":"bi-shop";P=`<span class="text-[9px] font-bold text-gray-600 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200 flex items-center max-w-[110px] truncate leading-none shadow-sm" title="${v(A.name)}"><i class="bi ${C} mr-1 opacity-60"></i> ${v(A.name)}</span>`}const S=encodeURIComponent(JSON.stringify(c)),I=w.selectedIds.has(c.id),U=!!c.recurrenceId?'<i class="bi bi-arrow-repeat text-indigo-600 ml-1 text-sm md:text-base bg-indigo-50 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center shadow-sm" title="Recorrente"></i>':"";return`
        <div class="financial-row bg-white border border-gray-100 md:border-0 md:border-b md:border-gray-100 hover:bg-gray-50 transition-all cursor-pointer relative flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center p-3.5 md:px-6 md:py-4 mb-3 md:mb-0 rounded-2xl md:rounded-none ${I?"ring-2 md:ring-0 ring-indigo-500 bg-indigo-50/50 md:bg-indigo-50/50":""} ${b?"opacity-70 md:opacity-100":""}"
             data-type="${n}"
             data-item="${S}">
            
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
                        <p class="font-black text-[16px] leading-none flex-shrink-0 ${b?"text-gray-400":l}">${ve(c.amount)}</p>
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
                                ${P}
                                ${U}
                            </div>
                        </div>
                        <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
                            ${h}
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
                <span class="text-[10px] font-semibold text-gray-500 truncate w-max max-w-full"><i class="bi bi-diagram-3 opacity-50 mr-1.5"></i>${k}</span>
            </div>

            <div class="hidden md:flex md:col-span-1 justify-center items-center">
                ${h}
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
        `}).join("")}async function sc(t,e){const a=new Date().toISOString().split("T")[0];try{await(t==="payable"?Gi(e,a):Ki(e,a)),f("Baixa Realizada","O lançamento foi registado como pago.","success"),await Me()}catch(s){f("Erro",s.message,"error")}}async function Lr(t,e){if(!!!e.recurrenceId){await Q("Excluir Lançamento","Tem certeza? Essa ação apagará o registo do seu fluxo de caixa.")&&await Cr(t,[e.id]);return}oc(t,e)}function oc(t,e){const a=document.getElementById("genericModal"),r=(t==="payable"?w.payables:w.receivables).filter(d=>d.recurrenceId===e.recurrenceId).sort((d,u)=>new Date(d.dueDate)-new Date(u.dueDate));a.className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 p-0 md:p-6",a.innerHTML=`
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
                ${r.map(d=>{const u=d.id===e.id,c=d.status==="paid",p=kr(d.dueDate);return`
                    <label class="flex items-center gap-4 p-4 bg-white rounded-2xl border ${u?"border-red-400 ring-2 ring-red-100 shadow-md bg-red-50/20":"border-gray-200 shadow-sm"} cursor-pointer transition-all hover:bg-gray-50 active:scale-[0.98]">
                        <input type="checkbox" class="modal-item-checkbox w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" value="${d.id}" ${u?"checked":""}>
                        
                        <div class="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex flex-col items-center justify-center border border-gray-200">
                            <span class="text-base font-black text-gray-800 leading-none">${p.day}</span>
                            <span class="text-[9px] font-bold text-gray-500 uppercase leading-none mt-1.5">${p.month}</span>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-bold text-gray-900 truncate">${v(d.description)}</p>
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
    `,a.style.display="flex",requestAnimationFrame(()=>{a.classList.remove("opacity-0");const d=a.querySelector("#modal-content-wrapper");d&&(d.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),d.classList.add("translate-y-0","md:scale-100","md:opacity-100"))});const o=a.querySelector("#modal-select-all"),i=a.querySelectorAll(".modal-item-checkbox"),n=a.querySelector("#confirm-batch-delete");o.addEventListener("change",d=>{i.forEach(u=>u.checked=d.target.checked),l()}),i.forEach(d=>d.addEventListener("change",l));function l(){const d=Array.from(i).filter(u=>u.checked).length;n.innerHTML=d>0?`<i class="bi bi-trash3-fill"></i> Excluir ${d} Parcela(s)`:"Selecione para excluir",n.disabled=d===0,d===0?n.classList.add("opacity-50","bg-gray-400"):n.classList.remove("opacity-50","bg-gray-400")}n.addEventListener("click",async()=>{const d=Array.from(i).filter(c=>c.checked).map(c=>c.value);if(d.length===0)return;At(),await Q("Confirmar Ação",`Tem certeza que deseja apagar estas ${d.length} parcelas permanentemente?`)&&await Cr(t,d)}),l()}async function Cr(t,e){try{e.length===1?t==="payable"?await Qi(e[0]):await Zi(e[0]):await qo(t==="payable"?"payables":"receivables",e),f("Sucesso",`${e.length} registo(s) limpo(s) do sistema.`,"success"),w.selectedIds.clear(),Ke(),await Me()}catch(a){f("Erro",a.message,"error")}}function rc(){const t=document.getElementById("genericModal");t.className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 p-0 md:p-6",t.innerHTML=`
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
    `,t.style.display="flex",requestAnimationFrame(()=>{t.classList.remove("opacity-0");const e=t.querySelector("#modal-content-wrapper");e&&(e.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),e.classList.add("translate-y-0","md:scale-100","md:opacity-100"))})}function oo(t,e=null){const a=document.getElementById("genericModal"),s=t==="payable",r=s?"red":"emerald",o=e?"Editar Lançamento":"Novo Lançamento",i=(C,D)=>{let V='<option value="">-- Categoria --</option>';const T=Ls(C),M=(R,X=0)=>{const te="  ".repeat(X)+(X>0?"↳ ":""),ie=R.id===D?"selected":"";V+=`<option value="${R.id}" ${ie}>${te}${v(R.name)}</option>`,R.children.forEach(Z=>M(Z,X+1))};return T.forEach(R=>M(R)),V},l=[{value:"dinheiro",label:"Dinheiro"},{value:"pix",label:"PIX"},{value:"cartao_credito",label:"Cartão de Crédito"},{value:"cartao_debito",label:"Cartão de Débito"},{value:"transferencia",label:"Transferência Bancária"},{value:"boleto",label:"Boleto"},{value:"outros",label:"Outros"}].map(C=>`<option value="${C.value}" ${e?.paymentMethod===C.value?"selected":""}>${C.label}</option>`).join(""),d=`
        <datalist id="entity-suggestions">
            ${s?w.suppliers.map(C=>`<option value="${v(C.name)}">Fornecedor</option>`).join("")+w.professionals.map(C=>`<option value="${v(C.name)}">Profissional</option>`).join(""):w.clients.map(C=>`<option value="${v(C.name)} ${C.phone?"- "+v(C.phone):""}">Cliente</option>`).join("")}
        </datalist>
    `,u=e?.establishmentId||g.selectedEstablishments&&g.selectedEstablishments[0]||g.establishmentId,c=w.establishments.map(C=>{const D=C.id===u;return`<option value="${C.id}" ${D?"selected":""}>${C.type==="Matriz"?"🏢":"📍"} ${v(C.name)}</option>`}).join("");a.className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 md:p-6",a.innerHTML=`
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
                                value="${e?.description?v(e.description):""}" placeholder="Ex: Fornecedor de Bebidas...">
                        </div>
                        
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">${s?"Fornecedor / Favorecido":"Cliente / Pagador"}</label>
                            <div class="relative">
                                <i class="bi bi-person absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                                <input type="text" name="entity" list="entity-suggestions" 
                                    class="w-full pl-11 pr-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none font-bold text-sm text-gray-900 transition-all shadow-sm" 
                                    value="${e?.entity?v(e.entity):""}" placeholder="Nome da pessoa ou empresa..." autocomplete="off">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-4 md:p-6 md:rounded-3xl border-b md:border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="grid grid-cols-1 md:col-span-2 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Plano de Natureza</label>
                                <select name="naturezaId" class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none text-sm font-bold text-gray-700 transition-all shadow-sm">
                                    ${i(w.natures,e?.naturezaId)}
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Centro de Custo</label>
                                <select name="centroDeCustoId" class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none text-sm font-bold text-gray-700 transition-all shadow-sm">
                                    ${i(w.costCenters,e?.centroDeCustoId)}
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 md:col-span-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Nº Documento</label>
                                <input type="text" name="documentNumber" 
                                    class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${r}-500 outline-none text-sm font-bold text-gray-900 transition-all shadow-sm" 
                                    value="${e?.documentNumber?v(e.documentNumber):""}" placeholder="Opcional">
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
    `,a.style.display="flex",requestAnimationFrame(()=>{a.classList.remove("opacity-0");const C=a.querySelector("#modal-content-wrapper");C&&(C.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),C.classList.add("translate-y-0","md:scale-100","md:opacity-100"))});const p=a.querySelector("#financial-form");let b="single",m=2;const h=p.querySelector("#modal-delete-btn");h&&h.addEventListener("click",C=>{C.preventDefault(),navigator.vibrate&&navigator.vibrate(30),At(),setTimeout(()=>Lr(t,e),300)});const y=p.querySelector('[name="amount"]'),k=p.querySelector("#recurrence-options"),A=p.querySelector("#recurrence-summary"),P=p.querySelector("#installments-input"),S=p.querySelector("#status-toggle"),I=p.querySelector("#payment-date-wrapper"),N=p.querySelector('[name="paymentDate"]'),U=()=>{if(b==="single")return;const C=parseFloat(y.value)||0;if(m=parseInt(P.value)||2,C===0){A.innerHTML='<span class="text-[10px] md:text-xs text-indigo-400 font-bold">Digite o valor total...</span>';return}if(b==="installment"){const D=C/m;A.innerHTML=`
                <div>
                    <span class="block text-[8px] md:text-[10px] text-indigo-400 uppercase tracking-widest font-black mb-0.5">Simulação do Parcelamento</span>
                    <span class="font-black text-sm md:text-base text-indigo-700 block leading-tight">${m}x de ${ve(D)}</span>
                    <span class="text-[9px] md:text-[10px] text-indigo-500 font-bold mt-1 block bg-indigo-50/50 p-1 rounded">Total da Dívida: ${ve(C)}</span>
                </div>
            `}else if(b==="repeat"){const D=C*m;A.innerHTML=`
                <div>
                    <span class="block text-[8px] md:text-[10px] text-indigo-400 uppercase tracking-widest font-black mb-0.5">Geração Recorrente Fixa</span>
                    <span class="font-black text-sm md:text-base text-indigo-700 block leading-tight">${m} meses de ${ve(C)}</span>
                    <span class="text-[9px] md:text-[10px] text-indigo-500 font-bold mt-1 block bg-indigo-50/50 p-1 rounded">Comprometimento: ${ve(D)}</span>
                </div>
            `}};p.addEventListener("click",C=>{const D=C.target.closest(".mode-btn");if(D&&!e)if(C.preventDefault(),navigator.vibrate&&navigator.vibrate(15),p.querySelectorAll(".mode-btn").forEach(M=>{M.classList.remove("bg-white","text-gray-900","shadow-sm"),M.classList.add("text-gray-500")}),D.classList.add("bg-white","text-gray-900","shadow-sm"),D.classList.remove("text-gray-500"),b=D.dataset.mode,b==="single")k.style.display="none";else{k.style.display="block";const M=k.querySelector("#recurrence-label");M&&(M.textContent=b==="installment"?"Número de Parcelas":"Repetir por quantos meses?"),U()}if(C.target.closest("#btn-minus")&&P){C.preventDefault(),navigator.vibrate&&navigator.vibrate(10);let M=parseInt(P.value)||2;M>2&&(P.value=M-1,U())}if(C.target.closest("#btn-plus")&&P){C.preventDefault(),navigator.vibrate&&navigator.vibrate(10);let M=parseInt(P.value)||2;M<60&&(P.value=M+1,U())}}),y.addEventListener("input",U),P&&P.addEventListener("input",U),S.addEventListener("change",()=>{navigator.vibrate&&navigator.vibrate(20),S.checked?(I.classList.remove("hidden"),N.required=!0):(I.classList.add("hidden"),N.required=!1)}),p.addEventListener("submit",async C=>{C.preventDefault();const D=p.querySelector('button[type="submit"]'),V=D.innerHTML;D.disabled=!0,D.innerHTML='<div class="loader mx-auto h-5 w-5 border-2 border-white border-t-transparent"></div>';const T=new FormData(p),M=S.checked,R=parseFloat(T.get("amount"));let X=R,te=1;!e&&b!=="single"&&(te=parseInt(T.get("installments")),b==="repeat"&&(X=R*te));const ie=T.get("establishmentId");if(!ie){f("Atenção","Selecione uma Unidade válida para o lançamento.","warning"),D.disabled=!1,D.innerHTML=V;return}const Z={companyId:g.companyId,establishmentId:ie,description:T.get("description"),amount:X,dueDate:T.get("dueDate"),naturezaId:T.get("naturezaId")||null,centroDeCustoId:T.get("centroDeCustoId")||null,entity:T.get("entity")||null,paymentMethod:T.get("paymentMethod")||null,documentNumber:T.get("documentNumber")||null,notes:T.get("notes"),status:M?"paid":"pending",paymentDate:M?T.get("paymentDate"):null,installments:te};te>1&&!e&&(Z.recurrenceId=self.crypto.randomUUID());try{e?(await(s?Ji(e.id,Z):Xi(e.id,Z)),f("Sucesso","Atualizado com sucesso!","success")):(await(s?Fo(Z):Yi(Z)),f("Sucesso","Lançamento criado!","success")),At(),Me()}catch(q){f("Erro",q.message||"Erro ao salvar","error"),D.disabled=!1,D.innerHTML=V}})}const ic=t=>L("/api/commissions/calculate",{method:"POST",body:JSON.stringify(t)}),nc=t=>L("/api/commissions/save",{method:"POST",body:JSON.stringify(t)}),lc=(t,e)=>{const a=new URLSearchParams({startDate:t,endDate:e}).toString();return L(`/api/commissions/stats?${a}`)},dc=(t={})=>{Object.keys(t).forEach(s=>(t[s]===void 0||t[s]===null||t[s]==="")&&delete t[s]);const e=new URLSearchParams(t).toString(),a=`/api/commissions/history${e?"?"+e:""}`;return L(a)},Dr=t=>L(`/api/commissions/report/${t}`,{method:"DELETE"}),ha=new Date,cc=new Date(ha.getFullYear(),ha.getMonth(),1);let F={professionals:[],reports:[],calculationResult:null,periodString:"",establishmentConfig:null,selectedIds:new Set,isAdvancedFilterOpen:!1,startDate:cc.toISOString().split("T")[0],endDate:new Date(ha.getFullYear(),ha.getMonth()+1,0).toISOString().split("T")[0],professionalId:"all",searchQuery:"",stats:{revenue:0,commissions:0,margin:0,netPaid:0},viewMode:"list"},Kt=null;const uc=document.getElementById("content");function Lt(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function pc(t){return t?new Date(t).toLocaleDateString("pt-BR"):"--/--/----"}function va(t){if(!t)return"PR";const e=t.trim().split(" ");return e.length>=2?(e[0][0]+e[e.length-1][0]).toUpperCase():t.substring(0,2).toUpperCase()}function Pr(){const t=document.getElementById("commissions-layout-main"),e=document.getElementById("commissions-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&(t.style.display="none"),e&&(e.classList.remove("hidden"),e.classList.add("flex")),a&&window.innerWidth<768&&(a.style.display="none")}function Cs(){const t=document.getElementById("commissions-layout-main"),e=document.getElementById("commissions-layout-detail"),a=document.getElementById("mobile-bottom-nav");t&&(t.style.display="flex"),e&&(e.classList.add("hidden"),e.classList.remove("flex")),a&&window.innerWidth<768&&(a.style.display=""),F.viewMode="list"}async function bc(){try{const[t,e]=await Promise.all([Ee(g.establishmentId),je(g.establishmentId).catch(()=>({}))]);F.professionals=t,F.establishmentConfig=e||{}}catch(t){console.error("Erro na inicialização de comissões",t)}F.viewMode="list",mc(),fc(),await lt()}function mc(){const t=F.professionals.map(e=>`<option value="${e.id}">${e.name}</option>`).join("");uc.innerHTML=`
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
                            <input type="text" id="search-input" value="${F.searchQuery}" placeholder="Buscar relatórios..." class="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 shadow-sm rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                        </div>
                    </div>

                    <div id="filter-panel" class="hidden animate-fade-in-down">
                        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                            <div class="grid grid-cols-2 gap-4 flex-1">
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Inicial</label>
                                    <input type="date" id="filter-start" value="${F.startDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Final</label>
                                    <input type="date" id="filter-end" value="${F.endDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
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
    `}async function lt(){const t=document.getElementById("list-container");t&&(t.innerHTML='<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-sm">Carregando comissões...</p></div>');const a=(g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId]).join(",");try{const[s,r]=await Promise.all([dc({startDate:F.startDate,endDate:F.endDate,professionalId:F.professionalId,establishmentId:a}),lc(F.startDate,F.endDate,a)]);F.reports=s||[];const o=F.reports.reduce((i,n)=>i+(n.summary.finalValue||n.summary.totalCommission),0);F.stats={revenue:r.totalRevenue||0,commissions:r.totalCommissionsPaid||0,margin:r.totalRevenue>0?((r.totalRevenue-r.totalCommissionsPaid)/r.totalRevenue*100).toFixed(1):0,netPaid:o},F.selectedIds.clear(),Ct(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),gc(),Tr()}catch(s){console.error(s),t&&(t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-sm font-medium">Erro ao carregar dados.</p>
            </div>`)}}function gc(){const t=document.getElementById("kpi-section");t&&(t.innerHTML=`
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-50 flex items-center justify-center">
                    <i class="bi bi-graph-up-arrow text-indigo-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Faturamento<br class="md:hidden"/> Bruto</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-gray-900">${Lt(F.stats.revenue)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-amber-50 flex items-center justify-center">
                    <i class="bi bi-wallet2 text-amber-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Comissões<br class="md:hidden"/> Pagas</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-amber-600">${Lt(F.stats.commissions)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-50 flex items-center justify-center">
                    <i class="bi bi-pie-chart-fill text-blue-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Retenção<br class="md:hidden"/> Líquida</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-blue-600">${F.stats.margin}%</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                    <i class="bi bi-cash-stack text-emerald-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Líquido<br class="md:hidden"/> Pago</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-emerald-600">${Lt(F.stats.netPaid)}</span>
        </div>
    `)}function Tr(){const t=document.getElementById("list-container");if(!t)return;let e=F.reports;if(F.searchQuery){const a=F.searchQuery.toLowerCase();e=e.filter(s=>s.professionalName.toLowerCase().includes(a)||s.period.toLowerCase().includes(a))}if(e.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-20 bg-white md:bg-transparent text-center rounded-b-2xl">
                <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                    <i class="bi bi-receipt text-4xl text-gray-300"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-1">Nenhum pagamento</h3>
                <p class="text-sm font-medium text-gray-400 max-w-xs px-4">Não há relatórios gerados para este período ou profissional.</p>
            </div>
        `;return}t.innerHTML=e.map(a=>{const s=pc(a.createdAt),r=a.summary.totalCommission,o=a.summary.extraDebit||0,i=a.summary.extraCredit||0,n=a.summary.finalValue||r,l=F.selectedIds.has(a.id);let d="";return o>0&&i>0?d=`<span class="text-red-500">-R$${o.toFixed(2)}</span> / <span class="text-emerald-500">+R$${i.toFixed(2)}</span>`:o>0?d=`<span class="text-red-500">-R$ ${o.toFixed(2)}</span>`:i>0?d=`<span class="text-emerald-500">+R$ ${i.toFixed(2)}</span>`:d='<span class="text-gray-300">--</span>',`
        <div class="bg-white border border-gray-100 md:border-0 md:border-b md:border-gray-100 hover:bg-gray-50 transition-all cursor-pointer relative flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center p-4 md:px-6 md:py-4 mb-3 md:mb-0 rounded-2xl md:rounded-none ${l?"ring-2 md:ring-0 ring-indigo-500 bg-indigo-50/50 md:bg-indigo-50/50":""}">
            
            <div class="absolute right-3 top-3 md:relative md:right-auto md:top-auto md:col-span-3 md:flex md:items-center md:gap-3 z-10">
                <input type="checkbox" value="${a.id}" class="item-checkbox w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm bg-white" ${l?"checked":""}>
                
                <div class="hidden md:flex items-center gap-3 pr-2">
                    <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm border border-indigo-200">
                        ${va(a.professionalName)}
                    </div>
                    <div class="min-w-0">
                        <p class="font-bold text-sm text-gray-900 truncate" title="${a.professionalName}">${a.professionalName}</p>
                        <p class="text-[10px] text-gray-500 font-medium truncate mt-0.5">Gerado: ${s}</p>
                    </div>
                </div>
            </div>

            <div class="md:hidden flex items-center gap-3 w-full pr-8 mb-3">
                <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm border border-indigo-200">
                    ${va(a.professionalName)}
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
                <span class="text-sm font-bold text-gray-700">${Lt(r)}</span>
            </div>
            
            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-2 md:mb-0">
                <span class="md:hidden text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ajustes:</span>
                <span class="text-xs font-bold">${d}</span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block pt-2 md:pt-0 border-t md:border-0 border-gray-100 mt-2 md:mt-0">
                <span class="md:hidden text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Líquido Pago:</span>
                <span class="text-base font-black text-emerald-600">${Lt(n)}</span>
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
        `}).join("")}function fc(){Kt&&document.body.removeEventListener("click",Kt),Kt=o=>{const i=o.target;if(i.classList.contains("item-checkbox")){const l=i.value;i.checked?F.selectedIds.add(l):F.selectedIds.delete(l),Ct(),o.stopPropagation();return}const n=i.closest("button[data-action]");if(n){o.preventDefault();const l=n.dataset.action,d=n.dataset.id;switch(l){case"apply-filters":F.startDate=document.getElementById("filter-start").value,F.endDate=document.getElementById("filter-end").value,F.professionalId=document.getElementById("filter-prof").value,document.getElementById("custom-date-btn")?.click(),lt();break;case"new-calculation":xc();break;case"print-receipt":Ic(d);break;case"delete-report":Lc(d);break;case"view-report-details":Sc(d);break;case"close-detail-screen":Cs();break;case"toggle-all-profs":const u=document.querySelectorAll(".prof-checkbox"),c=Array.from(u).every(h=>h.checked);u.forEach(h=>h.checked=!c);break;case"calculate-preview":hc();break;case"save-final-reports":kc();break;case"toggle-preview-details":const p=n.dataset.idx,b=document.getElementById(`preview-details-${p}`),m=n.querySelector("i");b&&(b.classList.contains("hidden")?(b.classList.remove("hidden"),m&&m.classList.replace("bi-chevron-down","bi-chevron-up")):(b.classList.add("hidden"),m&&m.classList.replace("bi-chevron-up","bi-chevron-down")));break}}},document.body.addEventListener("click",Kt);const t=document.getElementById("search-input");t&&t.addEventListener("input",o=>{F.searchQuery=o.target.value,Tr()}),document.body.addEventListener("input",o=>{(o.target.classList.contains("input-debit")||o.target.classList.contains("input-credit")||o.target.classList.contains("input-notes"))&&yc(o.target.dataset.idx)});const e=document.getElementById("select-all-toggle");e&&e.addEventListener("change",o=>{const i=o.target.checked,n=document.querySelectorAll(".item-checkbox");F.selectedIds.clear(),n.forEach(l=>{l.checked=i,i&&F.selectedIds.add(l.value)}),Ct()});const a=document.getElementById("cancel-selection-btn");a&&a.addEventListener("click",()=>{F.selectedIds.clear(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),document.querySelectorAll(".item-checkbox").forEach(o=>o.checked=!1),Ct()});const s=document.getElementById("batch-delete-btn");s&&s.addEventListener("click",Ec);const r=document.getElementById("export-excel-btn");r&&r.addEventListener("click",$c),document.getElementById("custom-date-btn")?.addEventListener("click",()=>{const o=document.getElementById("filter-panel"),i=document.getElementById("custom-date-btn");F.isAdvancedFilterOpen=!F.isAdvancedFilterOpen,F.isAdvancedFilterOpen?(o.classList.remove("hidden"),i.classList.add("bg-gray-900","text-white","border-gray-900"),i.classList.remove("bg-white","text-gray-600","border-gray-200")):(o.classList.add("hidden"),i.classList.remove("bg-gray-900","text-white","border-gray-900"),i.classList.add("bg-white","text-gray-600","border-gray-200"))}),document.querySelectorAll(".date-preset-btn").forEach(o=>{o.addEventListener("click",i=>{navigator.vibrate&&navigator.vibrate(15),document.querySelectorAll(".date-preset-btn").forEach(c=>{c.classList.remove("bg-indigo-50","text-indigo-700","border-indigo-200"),c.classList.add("bg-white","text-gray-600","border-gray-200")}),i.target.classList.add("bg-indigo-50","text-indigo-700","border-indigo-200"),i.target.classList.remove("bg-white","text-gray-600","border-gray-200");const n=i.target.dataset.preset,l=new Date;let d,u;n==="month"?(d=new Date(l.getFullYear(),l.getMonth(),1),u=new Date(l.getFullYear(),l.getMonth()+1,0)):n==="last_month"&&(d=new Date(l.getFullYear(),l.getMonth()-1,1),u=new Date(l.getFullYear(),l.getMonth(),0)),document.getElementById("filter-start").value=d.toISOString().split("T")[0],document.getElementById("filter-end").value=u.toISOString().split("T")[0],F.startDate=d.toISOString().split("T")[0],F.endDate=u.toISOString().split("T")[0],lt()})})}function Ct(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=F.selectedIds.size;e&&(e.textContent=a),t&&(a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")))}function xc(){F.viewMode="new-calc";const t=document.getElementById("commissions-layout-detail");if(!t)return;const e=new Date().toISOString().split("T")[0],a=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],s=F.professionals.map(o=>`
        <label class="flex items-center p-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-indigo-300 transition-all cursor-pointer group mb-1.5">
            <input type="checkbox" value="${o.id}" class="prof-checkbox w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
            <div class="ml-3 flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg border border-gray-100 bg-gray-50 text-gray-500 flex items-center justify-center text-[10px] font-black group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shadow-sm">${va(o.name)}</div>
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
    `,Pr()}async function hc(){const t=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(u=>u.value);if(t.length===0)return f("Atenção","Selecione pelo menos um profissional.","warning");const a=(g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId]).join(","),s=document.getElementById("calc-start-date"),r=document.getElementById("calc-end-date");if(!s||!r||!s.value||!r.value)return f("Atenção","As datas de início e fim são obrigatórias.","warning");const o={professionalIds:t,startDate:s.value,endDate:r.value,establishmentId:a,calculationTypes:{services:document.getElementById("calc-type-services")?.checked||!1,products:document.getElementById("calc-type-products")?.checked||!1,packages:document.getElementById("calc-type-packages")?.checked||!1}},i=new Date(o.startDate+"T00:00:00").toLocaleDateString("pt-BR"),n=new Date(o.endDate+"T00:00:00").toLocaleDateString("pt-BR");F.periodString=`${i} a ${n}`;const l=document.getElementById("btn-calc-action"),d=l.innerHTML;l.innerHTML='<div class="loader-small border-white mr-2"></div> Processando...',l.disabled=!0;try{const u=await ic(o);F.calculationResult=u.map(c=>({...c,extraDebit:0,extraCredit:0,finalValue:c.summary.totalCommission,notes:""})),vc()}catch(u){f("Erro na Apuração",u.message,"error"),l.innerHTML=d,l.disabled=!1}}function vc(){F.viewMode="preview-calc";const t=F.calculationResult;if(!t||t.length===0||t.every(i=>i.summary.totalCommission===0)){f("Aviso","Nenhuma comissão encontrada para os filtros selecionados.","info");const i=document.getElementById("btn-calc-action");i.innerHTML='<i class="bi bi-calculator text-lg"></i> Calcular Vendas',i.disabled=!1;return}const e=document.getElementById("calc-step-1"),a=document.getElementById("calc-step-2"),s=document.getElementById("btn-calc-action");e&&e.classList.add("hidden"),a&&a.classList.remove("hidden"),s&&(s.dataset.action="save-final-reports",s.className="w-full md:w-auto py-3.5 px-8 bg-emerald-600 text-white font-black text-sm rounded-xl hover:bg-emerald-700 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider",s.innerHTML='<i class="bi bi-check2-circle text-lg"></i> Confirmar Pagtos.',s.disabled=!1);const r=t.reduce((i,n)=>i+n.finalValue,0),o=t.map((i,n)=>{if(i.summary.totalCommission===0)return"";const l=(i.items||[]).map(u=>`
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
                <span class="text-xs font-black bg-white/20 px-3 py-2 rounded-xl border border-white/30 shadow-sm flex items-center gap-2"><i class="bi bi-calendar3"></i> ${F.periodString}</span>
            </div>
        </div>
        ${o}
    `)}function yc(t){const e=document.querySelector(`.input-debit[data-idx="${t}"]`),a=document.querySelector(`.input-credit[data-idx="${t}"]`),s=document.querySelector(`.input-notes[data-idx="${t}"]`);let r=parseFloat(e?.value)||0,o=parseFloat(a?.value)||0,i=s?.value||"";if(F.calculationResult&&F.calculationResult[t]){const n=F.calculationResult[t];n.extraDebit=r,n.extraCredit=o,n.notes=i,n.finalValue=n.summary.totalCommission-r+o;const l=document.querySelector(`.final-value-display[data-idx="${t}"]`);l&&(l.innerText=`R$ ${n.finalValue.toFixed(2)}`),wc()}}function wc(){const t=F.calculationResult.reduce((a,s)=>a+s.finalValue,0),e=document.getElementById("grand-total-preview");e&&(e.innerText=`R$ ${t.toFixed(2)}`)}async function kc(){const t=F.calculationResult.filter(r=>r.summary.totalCommission>0),e=t.length;if(e===0)return f("Aviso","Não há valores para pagar.","info");if(!await Q("Confirmar Pagamentos",`Você está prestes a gerar recibos e marcar as vendas de ${e} profissional(is) como PAGAS. Essa ação lançará a despesa correspondente no Financeiro. Confirmar?`))return;const s=document.getElementById("btn-calc-action");s.innerHTML='<div class="loader-small border-white mr-2"></div> Finalizando...',s.disabled=!0;try{const r=t.map(async o=>{const i=(o.items||[]).map(n=>n.originalSaleId).filter(n=>n!=null);await nc({professionalId:o.professionalId,professionalName:o.professionalName,period:F.periodString,processedSalesIds:i,establishmentId:g.establishmentId,reportData:{...o,summary:{...o.summary,finalValue:o.finalValue,extraDebit:o.extraDebit||0,extraCredit:o.extraCredit||0,notes:o.notes||""}}});try{if(o.finalValue>0){const n=F.establishmentConfig||{},l=n.defaultDespesaNaturezaId||n.financeConfig?.despesaNaturezaId||null,d=n.defaultDespesaCentroCustoId||n.financeConfig?.despesaCentroCustoId||null;await Fo({establishmentId:g.establishmentId,description:`Comissões - ${o.period}`,amount:o.finalValue,dueDate:new Date().toISOString().split("T")[0],naturezaId:l,centroDeCustoId:d,entity:o.professionalName,paymentMethod:"dinheiro",status:"paid",paymentDate:new Date().toISOString().split("T")[0],origin:"commission"})}}catch(n){console.error("Erro ao integrar com financeiro (Despesa):",n)}});await Promise.all(r),f("Sucesso","Pagamentos registrados e integrados ao financeiro!","success"),F.calculationResult=null,Cs(),await lt()}catch(r){f("Erro ao Salvar",r.message,"error"),s.innerHTML='<i class="bi bi-check2-circle text-lg"></i> Confirmar Pagtos.',s.disabled=!1}}function Sc(t){F.viewMode="report-details";const e=document.getElementById("commissions-layout-detail");if(!e)return;const a=F.reports.find(c=>c.id===t);if(!a)return;const s=a.reportData?.items||a.items||[],r=a.summary,o=r.extraDebit||0,i=r.extraCredit||0,n=r.notes||"",l=`
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
                            ${va(a.professionalName)}
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
    `,Pr()}function $c(){if(F.reports.length===0){f("Aviso","Não há dados para exportar com os filtros atuais.","info");return}let t=F.reports;if(F.searchQuery){const a=F.searchQuery.toLowerCase();t=t.filter(s=>s.professionalName.toLowerCase().includes(a)||s.period.toLowerCase().includes(a))}const e=t.map(a=>{const s=a.summary.totalCommission,r=a.summary.extraDebit||0,o=a.summary.extraCredit||0,i=a.summary.finalValue||s;return{"Data da Apuração":new Date(a.createdAt).toLocaleDateString("pt-BR"),Profissional:a.professionalName,"Período Base":a.period,"Itens Calculados":a.summary.totalItems||0,"Valor Bruto (R$)":s,"Bônus (R$)":o,"Descontos (R$)":r,"Líquido Pago (R$)":i,"Observações/Motivo":a.summary.notes||""}});try{if(typeof XLSX>"u"){f("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const a=XLSX.utils.json_to_sheet(e),s=XLSX.utils.book_new();XLSX.utils.book_append_sheet(s,a,"Comissoes");const r=`Relatorio_Comissoes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(s,r)}catch(a){console.error(a),f("Erro","Falha ao exportar Excel.","error")}}function Ic(t){const e=F.reports.find(u=>u.id===t);if(!e)return;if(!window.jspdf){f("Erro","A biblioteca de PDF não foi carregada.","error");return}const{jsPDF:a}=window.jspdf,s=new a;s.setFillColor(79,70,229),s.rect(0,0,210,40,"F"),s.setTextColor(255,255,255),s.setFontSize(22),s.setFont(void 0,"bold"),s.text("RECIBO DE COMISSÕES",105,20,{align:"center"}),s.setFontSize(10),s.text(`Data de Emissão: ${new Date().toLocaleDateString("pt-BR")}`,105,28,{align:"center"}),s.setTextColor(50,50,50),s.setFontSize(11),s.setFont(void 0,"normal"),s.text("Profissional:",15,55),s.setFont(void 0,"bold"),s.text(e.professionalName,40,55),s.setFont(void 0,"normal"),s.text("Período:",130,55),s.setFont(void 0,"bold"),s.text(e.period,147,55);const r=e.reportData?.items||e.items||[];let o=70;if(r.length>0){const u=r.map(c=>[c.item||"Item",c.client||"--",`R$ ${(c.value||0).toFixed(2)}`,`${c.commissionRate||0}%`,`R$ ${(c.commissionValue||0).toFixed(2)}`]);s.autoTable({startY:o,head:[["Serviço/Produto","Cliente","Valor Base","Taxa","Comissão"]],body:u,theme:"striped",headStyles:{fillColor:[249,250,251],textColor:[75,85,99],fontStyle:"bold"},styles:{fontSize:8},columnStyles:{2:{halign:"right"},3:{halign:"center"},4:{halign:"right",fontStyle:"bold",textColor:[5,150,105]}}}),o=s.lastAutoTable.finalY+15}const i=e.summary,n=i.finalValue||i.totalCommission,l=[["Comissões Brutas (Soma dos Itens)",`R$ ${i.totalCommission.toFixed(2)}`]];i.extraCredit>0&&l.push(["(+) Bônus Extras",`R$ ${i.extraCredit.toFixed(2)}`]),i.extraDebit>0&&l.push(["(-) Descontos / Vales",`R$ ${i.extraDebit.toFixed(2)}`]),s.autoTable({startY:o,head:[["Resumo do Fechamento","Valor"]],body:l,theme:"grid",headStyles:{fillColor:[79,70,229],textColor:[255,255,255]},columnStyles:{1:{halign:"right",fontStyle:"bold"}}});const d=s.lastAutoTable.finalY+15;s.setFillColor(236,253,245),s.rect(120,d-8,75,15,"F"),s.setTextColor(5,150,105),s.setFontSize(14),s.setFont(void 0,"bold"),s.text(`Total Líquido: R$ ${n.toFixed(2)}`,190,d,{align:"right"}),i.notes&&(s.setTextColor(100,100,100),s.setFontSize(9),s.setFont(void 0,"normal"),s.text(`Obs/Motivo: ${i.notes}`,15,d+10)),s.setTextColor(150,150,150),s.setFontSize(9),s.line(20,d+40,90,d+40),s.text("Assinatura da Empresa",55,d+45,{align:"center"}),s.line(120,d+40,190,d+40),s.text("Assinatura do Profissional",155,d+45,{align:"center"}),s.save(`Recibo_Comissoes_${e.professionalName.replace(/\s+/g,"_")}.pdf`)}async function Ec(){const t=F.selectedIds.size;if(!(t===0||!await Q("Excluir Recibos",`Deseja excluir e estornar ${t} recibo(s)? As vendas associadas voltarão ao status "A Apurar".`)))try{const a=Array.from(F.selectedIds).map(s=>Dr(s));await Promise.all(a),f("Sucesso",`${t} recibos excluídos com sucesso.`,"success"),F.selectedIds.clear(),Ct(),document.getElementById("select-all-toggle")&&(document.getElementById("select-all-toggle").checked=!1),await lt()}catch{f("Erro ao Excluir","Ocorreu um erro ao excluir alguns recibos.","error")}}async function Lc(t){if(await Q("Excluir Recibo",'ATENÇÃO: Deseja realmente excluir este recibo? As vendas associadas a ele voltarão ao status "A Apurar" e o valor será subtraído dos relatórios. Esta ação não pode ser desfeita.'))try{await Dr(t),f("Sucesso","Recibo cancelado com sucesso. Vendas estornadas para apuração.","success"),Cs(),await lt()}catch(a){f("Erro ao Excluir",a.message,"error")}}const Re=document.getElementById("content");let B={allPackages:[],catalogForModal:{services:[],products:[]},establishments:[],searchQuery:"",statusFilter:"all",viewMode:"list",tempPackage:null,selectedIds:new Set},Qe=null;function dt(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0)}function Cc(){const t=B.allPackages.length,e=B.allPackages.filter(o=>o.status!=="inactive"),a=e.length,s=a>0?e.reduce((o,i)=>o+(i.price||0),0)/a:0;let r=0;return e.forEach(o=>{const i=o.originalPrice||0,n=o.price||0;if(i>0&&i>n){const l=(i-n)/i*100;l>r&&(r=l)}}),{total:t,activeCount:a,avgPrice:s,maxDiscount:r}}function Dc(){const t=document.getElementById("packages-layout-detail");t&&(t.classList.remove("hidden"),t.style.display="flex",requestAnimationFrame(()=>{t.classList.remove("opacity-0");const e=t.querySelector("#modal-content-wrapper");e&&(e.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),e.classList.add("translate-y-0","md:scale-100","md:opacity-100"))}))}function na(){const t=document.getElementById("packages-layout-detail");if(t){t.classList.add("opacity-0");const e=t.querySelector("#modal-content-wrapper");e&&(e.classList.remove("translate-y-0","md:scale-100","md:opacity-100"),e.classList.add("translate-y-full","md:scale-95","md:opacity-0")),setTimeout(()=>{t.classList.add("hidden"),t.style.display="none",t.innerHTML=""},300)}}function Pc(){const t=document.getElementById("packages-layout-detail");if(!t||B.viewMode!=="edit-package"||!B.tempPackage)return;B.tempPackage.name=t.querySelector("#packageName")?.value||"",B.tempPackage.description=t.querySelector("#packageDescription")?.value||"",B.tempPackage.status=t.querySelector("#packageStatus")?.value||"active";const e=parseFloat(t.querySelector("#finalPrice")?.value);B.tempPackage.price=isNaN(e)?"":e;const a=parseFloat(t.querySelector("#commissionRate")?.value);B.tempPackage.commissionRate=isNaN(a)?"":a;const s=parseInt(t.querySelector("#validityDays")?.value,10);B.tempPackage.validityDays=isNaN(s)?"":s,B.tempPackage.sellStartDate=t.querySelector("#sellStartDate")?.value||"",B.tempPackage.sellEndDate=t.querySelector("#sellEndDate")?.value||"";const r=parseInt(t.querySelector("#salesLimit")?.value,10);B.tempPackage.salesLimit=isNaN(r)?"":r;const o=Array.from(t.querySelectorAll(".modal-est-checkbox:checked")).map(i=>i.value);B.tempPackage.establishmentIds=o}async function Tc(){try{const e=(await we().catch(()=>({matrizes:[]}))).matrizes||[];B.establishments=[],e.forEach(a=>{B.establishments.push({id:a.id,name:a.name,type:"Matriz"}),a.branches&&a.branches.forEach(s=>B.establishments.push({id:s.id,name:s.name,type:"Filial"}))})}catch(t){console.error("Erro ao buscar hierarquia de empresas",t)}B.viewMode="list",B.selectedIds.clear(),Mc(),qc(),await ya()}async function ya(){const t=document.getElementById("packagesListContainer");t&&(t.innerHTML='<div class="col-span-full flex justify-center py-20"><div class="loader mx-auto"></div></div>');const e=g.selectedEstablishments&&g.selectedEstablishments.length>0?g.selectedEstablishments:[g.establishmentId];try{const a=e.map(c=>ys(c).catch(()=>[])),s=await Promise.all(a),r=new Map;s.flat().forEach(c=>{r.has(c.id)||r.set(c.id,c)}),B.allPackages=Array.from(r.values());const o=e.map(c=>ut(c).catch(()=>[])),i=e.map(c=>pt(c).catch(()=>[])),[n,l]=await Promise.all([Promise.all(o),Promise.all(i)]),d=new Map;n.flat().forEach(c=>d.set(c.id,c));const u=new Map;l.flat().forEach(c=>u.set(c.id,c)),B.catalogForModal={services:Array.from(d.values()).filter(c=>c.active),products:Array.from(u.values())},Ac(),Xe(),yt()}catch(a){console.error(a),t&&(t.innerHTML=`
                <div class="col-span-full flex flex-col items-center justify-center py-16 text-slate-500">
                    <i class="bi bi-exclamation-triangle text-4xl text-red-400 mb-3"></i>
                    <p class="text-xs font-bold">Erro ao carregar os pacotes. Tente novamente.</p>
                </div>
            `)}}function yt(){const t=document.getElementById("batch-action-bar"),e=document.getElementById("selected-count"),a=B.selectedIds.size;e&&(e.textContent=a),t&&(a>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex")));const s=document.getElementById("select-all-toggle");s&&(s.checked=B.allPackages.length>0&&a===B.allPackages.length)}function Mc(){Re.innerHTML=`
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
    `}function Ac(){const t=Cc(),e=document.getElementById("kpi-container");e&&(e.innerHTML=`
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
            <span class="text-xl md:text-2xl font-black text-indigo-600">${dt(t.avgPrice)}</span>
        </div>
    `)}function Xe(){const t=document.getElementById("packagesListContainer");if(!t)return;let e=B.allPackages;if(B.statusFilter!=="all"){const s=B.statusFilter==="active";e=e.filter(r=>r.status!=="inactive"===s)}if(B.searchQuery){const s=B.searchQuery.toLowerCase();e=e.filter(r=>r.name.toLowerCase().includes(s)||(r.description||"").toLowerCase().includes(s))}if(e.length===0){t.innerHTML=`
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
        `;return}const a=new Map(B.establishments.map(s=>[s.id,s]));t.innerHTML=e.map(s=>{const r=s.status!=="inactive",o=B.selectedIds.has(s.id),i=s.price||0,n=s.originalPrice||0,l=n>0&&n>i?(n-i)/n*100:0,d=v(s.name),u=v(s.description||"Nenhuma descrição detalhada."),c=(s.items||[]).reduce((y,k)=>y+(k.quantity||1),0),p=s.validityDays?`${s.validityDays} dias de uso`:"Uso vitalício",b=s.sellEndDate?`Vendas até ${new Date(s.sellEndDate).toLocaleDateString("pt-BR")}`:"Venda contínua",m=s.establishmentIds||(s.establishmentId?[s.establishmentId]:[]);let h="";if(m.length===1){const y=a.get(m[0]);y&&(h=`<span class="text-[9px] px-2 py-1 rounded-md bg-slate-100 text-slate-600 font-bold border border-slate-200 flex items-center w-max shadow-sm"><i class="bi ${y.type==="Matriz"?"bi-building":"bi-shop"} mr-1 opacity-50"></i> ${y.name}</span>`)}else m.length>1&&(h=`<span class="text-[9px] px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 flex items-center w-max shadow-sm"><i class="bi bi-buildings mr-1 opacity-50"></i> ${m.length} Unidades</span>`);return`
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
                            ${h}
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
                            ${l>0?`<span class="text-[10px] text-slate-400 font-bold line-through mb-0.5">De ${dt(n)}</span>`:'<span class="text-[10px] text-transparent mb-0.5">.</span>'}
                            <span class="text-2xl font-black text-slate-900 leading-none drop-shadow-sm">${dt(i)}</span>
                        </div>
                        <div class="text-right">
                            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md border border-slate-200"><i class="bi bi-calendar-event mr-1"></i>${b}</span>
                        </div>
                    </div>
                </div>
            </div>
        `}).join("")}function Bc(){if(B.allPackages.length===0){f("Aviso","Não há pacotes carregados para exportar.","info");return}let t=B.allPackages;if(B.statusFilter!=="all"){const s=B.statusFilter==="active";t=t.filter(r=>r.status!=="inactive"===s)}if(B.searchQuery){const s=B.searchQuery.toLowerCase();t=t.filter(r=>r.name.toLowerCase().includes(s)||(r.description||"").toLowerCase().includes(s))}if(t.length===0){f("Aviso","Nenhum pacote corresponde aos filtros atuais.","info");return}const e=new Map(B.establishments.map(s=>[s.id,s.name])),a=t.map(s=>{const r=s.originalPrice||0,o=s.price||0,i=r>0?(r-o)/r*100:0,n=(s.items||[]).map(u=>`${u.quantity}x ${u.name}`).join(" | ");return{"Unidade(s)":(s.establishmentIds||(s.establishmentId?[s.establishmentId]:[])).map(u=>e.get(u)).filter(Boolean).join(", ")||"Não identificada","Nome do Pacote":s.name,Status:s.status!=="inactive"?"Ativo":"Inativo",Descrição:s.description||"","Itens Incluídos":n,"Valor Original (R$)":r,"Preço de Venda (R$)":o,"Desconto (%)":i.toFixed(1)+"%","Comissão (%)":s.commissionRate||0,"Validade de Uso (Dias)":s.validityDays||"Vitalício","Vendas Início":s.sellStartDate?new Date(s.sellStartDate).toLocaleDateString("pt-BR"):"-","Vendas Fim":s.sellEndDate?new Date(s.sellEndDate).toLocaleDateString("pt-BR"):"-"}});try{if(typeof XLSX>"u"){f("Erro","A biblioteca XLSX não está disponível no momento.","error");return}const s=XLSX.utils.json_to_sheet(a),r=XLSX.utils.book_new();XLSX.utils.book_append_sheet(r,s,"Pacotes");const o=`Relatorio_Pacotes_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(r,o)}catch(s){console.error(s),f("Erro","Falha ao exportar Excel.","error")}}function ro(t=null){B.viewMode="edit-package",B.tempPackage=t?JSON.parse(JSON.stringify(t)):{id:"",name:"",description:"",status:"active",items:[],price:"",originalPrice:0,commissionRate:0,validityDays:"",sellStartDate:"",sellEndDate:"",salesLimit:"",establishmentIds:[g.establishmentId]},ds(),Dc()}function Mr(){const t=document.getElementById("packages-layout-detail");if(!t)return;const a=(B.tempPackage.items||[]).reduce((n,l)=>n+(l.price||0)*(l.quantity||1),0),s=t.querySelector("#finalPrice"),r=t.querySelector("#discountIndicator"),o=t.querySelector("#originalPrice"),i=parseFloat(s?.value)||0;if(o&&(o.textContent=dt(a)),r)if(a>0&&a>i&&i>0){const n=(a-i)/a*100;r.textContent=`${n.toFixed(0)}% OFF`,r.classList.remove("hidden")}else r.classList.add("hidden")}function ls(){const t=document.getElementById("package-items-list");if(!t)return;const e=B.tempPackage.items||[];e.length===0?t.innerHTML=`
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
                        <p class="font-black text-slate-800 text-sm truncate leading-tight">${v(a.name)}</p>
                    </div>
                </div>
                <div class="flex items-center gap-4 flex-shrink-0 pl-2">
                    <div class="text-right">
                        <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Valor Un.</span>
                        <span class="text-sm font-black text-slate-700">${dt(a.price)}</span>
                    </div>
                    <button type="button" data-action="remove-item" data-index="${s}" class="w-10 h-10 flex items-center justify-center rounded-xl text-red-400 bg-red-50 hover:text-red-600 hover:bg-red-100 transition-colors shadow-sm z-10 cursor-pointer">
                        <i class="bi bi-trash3 pointer-events-none text-base"></i>
                    </button>
                </div>
            </div>
        `}).join(""),Mr()}function io(t){return t?t.includes("T")?t.split("T")[0]:t:""}function ds(){const t=document.getElementById("packages-layout-detail");if(!t)return;const e=B.tempPackage,a=!!e.id,s=v(e.name||""),r=v(e.description||""),o=e.price!==void 0&&e.price!==""?e.price:"",i=e.commissionRate!==void 0&&e.commissionRate!==""?e.commissionRate:"",n=e.validityDays!==void 0&&e.validityDays!==""?e.validityDays:"",l=io(e.sellStartDate),d=io(e.sellEndDate),u=e.salesLimit!==void 0&&e.salesLimit!==""?e.salesLimit:"",c=e.establishmentIds&&e.establishmentIds.length>0?e.establishmentIds:e.establishmentId?[e.establishmentId]:[g.establishmentId],p=B.establishments.map(m=>`
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
    `,ls(),requestAnimationFrame(()=>{const m=t.querySelector("#modal-content-wrapper");m&&(m.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),m.classList.add("translate-y-0","md:scale-100","md:opacity-100"))})}function jc(){B.viewMode="select-item";const t=document.getElementById("packages-layout-detail");if(!t)return;const e=`
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
    `;let a;const s=(o="")=>{const i=o.toLowerCase(),n={service:'<i class="bi bi-scissors text-indigo-600 text-lg"></i>',product:'<i class="bi bi-box-seam text-emerald-600 text-lg"></i>'},l={"catalog-service-list":{items:B.catalogForModal.services,type:"service"},"catalog-product-list":{items:B.catalogForModal.products,type:"product"}};Object.entries(l).forEach(([d,{items:u,type:c}])=>{const p=t.querySelector("#"+d);if(!p)return;const b=u.filter(y=>y.name.toLowerCase().includes(i)).slice(0,50),m=c==="service"?"hover:border-indigo-400 hover:bg-indigo-50/80 hover:shadow-md":"hover:border-emerald-400 hover:bg-emerald-50/80 hover:shadow-md",h=c==="service"?"bg-indigo-100 border-indigo-200 shadow-sm":"bg-emerald-100 border-emerald-200 shadow-sm";p.innerHTML=b.map(y=>y.id?`
                <button data-action="select-catalog-item" data-item-type="${c}" data-item-id="${y.id}" class="flex items-center gap-4 w-full p-3 bg-white border border-slate-200 rounded-2xl ${m} shadow-sm transition-all duration-300 text-left group active:scale-95">
                    <div class="flex-shrink-0 w-12 h-12 rounded-xl ${h} flex items-center justify-center border group-hover:scale-110 transition-transform">${n[c]}</div>
                    <div class="flex-grow min-w-0">
                        <span class="block text-sm font-black text-slate-800 truncate group-hover:text-indigo-900 transition-colors">${v(y.name)}</span>
                        <span class="block font-black text-xs text-slate-500 mt-1">${dt(y.price)}</span>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors shadow-inner flex-shrink-0">
                        <i class="bi bi-plus-lg text-slate-400 group-hover:text-white transition-colors"></i>
                    </div>
                </button>
            `:"").join("")||'<div class="flex flex-col items-center justify-center py-8 text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-slate-50"><i class="bi bi-inbox text-3xl mb-2"></i><p class="text-[10px] font-bold uppercase tracking-widest">Nenhum resultado</p></div>'})};s();const r=t.querySelector("#item-search-input");r&&(r.addEventListener("input",o=>{clearTimeout(a),a=setTimeout(()=>s(o.target.value),300)}),setTimeout(()=>r.focus(),100)),requestAnimationFrame(()=>{const o=t.querySelector("#modal-content-wrapper");o&&(o.classList.remove("translate-y-full","md:scale-95","md:opacity-0"),o.classList.add("translate-y-0","md:scale-100","md:opacity-100"))})}function qc(){Qe&&(Re.removeEventListener("click",Qe),Re.removeEventListener("input",Qe),Re.removeEventListener("change",Qe)),Qe=async e=>{if(e.target.classList.contains("item-checkbox")){const i=e.target.value;e.target.checked?B.selectedIds.add(i):B.selectedIds.delete(i),yt(),Xe(),e.stopPropagation();return}if(e.target.id==="packages-layout-detail"){na(),B.viewMode="list",B.tempPackage=null;return}if(e.target.closest("#batch-delete-btn")){const i=B.selectedIds.size;if(i===0)return;if(await Q("Excluir Pacotes",`Deseja realmente apagar ${i} pacotes selecionados?`))try{const l=Array.from(B.selectedIds).map(d=>Os(d));await Promise.all(l),f("Sucesso",`${i} pacote(s) excluído(s).`,"success"),B.selectedIds.clear(),yt(),await ya()}catch{f("Erro","Ocorreu um erro ao excluir pacotes.","error")}return}if(e.target.closest("#cancel-selection-btn")){B.selectedIds.clear();const i=document.getElementById("select-all-toggle");i&&(i.checked=!1),yt(),Xe();return}const r=e.target.closest("[data-action]");if(!r)return;switch(r.dataset.action){case"new-package":navigator.vibrate&&navigator.vibrate(20),ro(null);break;case"edit-package":navigator.vibrate&&navigator.vibrate(15);const i=r.dataset.id,n=B.allPackages.find(k=>k.id===i);n&&ro(n);break;case"delete-package":e.stopPropagation(),e.preventDefault();const l=r.dataset.id;if(await Q("Excluir Pacote","Tem a certeza que deseja excluir este pacote promocional? Esta ação é irreversível."))try{await Os(l),f("Sucesso!","Pacote excluído.","success"),B.viewMode==="edit-package"&&B.tempPackage?.id===l&&(na(),B.viewMode="list"),await ya()}catch(k){f("Erro",`Não foi possível excluir: ${k.message}`,"error")}break;case"back-to-main":na(),B.viewMode="list",B.tempPackage=null;break;case"add-item-to-package-btn":Pc(),jc();break;case"back-to-editor":ds();break;case"select-catalog-item":navigator.vibrate&&navigator.vibrate(10);const{itemType:u,itemId:c}=r.dataset,b=(B.catalogForModal[u+"s"]||[]).find(k=>k.id===c);if(b){const k=B.tempPackage.items.find(A=>A.id===b.id&&A.type===u);k?k.quantity++:B.tempPackage.items.push({...b,type:u,quantity:1}),ds()}break;case"remove-item":navigator.vibrate&&navigator.vibrate(10);const m=parseInt(r.dataset.index,10);B.tempPackage.items.splice(m,1),ls();break;case"toggle-all-ests":const h=document.querySelectorAll(".modal-est-checkbox"),y=Array.from(h).every(k=>k.checked);h.forEach(k=>k.checked=!y);break;case"save-package":await Nc(r);break}},Re.addEventListener("click",Qe),Re.addEventListener("input",e=>{e.target.id==="search-packages"&&(B.searchQuery=e.target.value,Xe()),e.target.id==="finalPrice"&&Mr()}),Re.addEventListener("change",e=>{if(e.target.id==="select-all-toggle"){const a=e.target.checked;B.selectedIds.clear(),a&&B.allPackages.forEach(s=>B.selectedIds.add(s.id)),yt(),Xe()}if(e.target.id==="filter-status"&&(B.statusFilter=e.target.value,Xe()),e.target.classList.contains("quantity-input")){const a=parseInt(e.target.dataset.index,10),s=parseInt(e.target.value,10);s>0&&B.tempPackage.items[a]&&(B.tempPackage.items[a].quantity=s,ls())}});const t=document.getElementById("export-excel-btn");t&&t.addEventListener("click",Bc)}async function Nc(t){const e=B.tempPackage,a=!!e.id,s=document.getElementById("packages-layout-detail");if(!s)return;const r=Array.from(s.querySelectorAll(".modal-est-checkbox:checked")).map(l=>l.value);if(r.length===0){f("Atenção","Selecione pelo menos uma unidade para o pacote.","warning");return}const o=e.items.reduce((l,d)=>l+d.price*d.quantity,0),i={id:e.id||null,companyId:g.companyId,name:s.querySelector("#packageName").value,description:s.querySelector("#packageDescription").value,status:s.querySelector("#packageStatus").value,items:e.items,originalPrice:o,price:parseFloat(s.querySelector("#finalPrice").value),commissionRate:parseFloat(s.querySelector("#commissionRate").value)||0,validityDays:parseInt(s.querySelector("#validityDays").value,10)||null,sellStartDate:s.querySelector("#sellStartDate").value||null,sellEndDate:s.querySelector("#sellEndDate").value||null,salesLimit:parseInt(s.querySelector("#salesLimit").value,10)||null,establishmentIds:r,establishmentId:r[0]};if(!i.name||isNaN(i.price)){f("Erro","Nome do Pacote e Preço Final são obrigatórios.","warning");return}if(i.items.length===0){f("Erro","Adicione pelo menos um serviço ou produto ao pacote.","warning");return}const n=t.innerHTML;t.disabled=!0,t.innerHTML='<div class="loader-small border-white mr-2"></div> Salvando...';try{a?await An(i.id,i):(delete i.id,await Mn(i)),f("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),na(),B.viewMode="list",B.tempPackage=null,await ya()}catch(l){f("Erro",`Não foi possível salvar o pacote: ${l.message}`,"error"),t.disabled=!1,t.innerHTML=n}}const Fc=document.getElementById("content");async function Rc(){const t=ye.currentUser;if(!t)return;let e={};try{const l=await us(Be(xe,"users",t.uid));l.exists()&&(e=l.data())}catch(l){console.error("Erro ao buscar usuário",l)}let a=null;if(g.userProfessionalId)try{a=await wo(g.userProfessionalId)}catch(l){console.error("Erro ao buscar profissional",l)}const s=v(e.name||t.displayName||"Usuário"),r=v(t.email||"E-mail não disponível"),o=v(e.phone||"");let i=e.photo||"";a&&a.photo&&(i=a.photo);const n=i||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(s.charAt(0))}`;Fc.innerHTML=`
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
    `,Hc(t),Oc(a)}function Hc(t,e){const a=document.getElementById("profile-photo-wrapper"),s=document.getElementById("profile-photo-input"),r=document.getElementById("profile-avatar"),o=document.getElementById("form-user-details");a.addEventListener("click",()=>s.click()),s.addEventListener("change",async i=>{const n=i.target.files[0];if(n)try{const l=await Sa(n,800,800,.8);r.src=l,await Tt(Be(xe,"users",t.uid),{photo:l}),g.userProfessionalId&&await Ua(g.userProfessionalId,{photo:l}),window.dispatchEvent(new CustomEvent("userPhotoUpdated",{detail:l})),f("Sucesso!","Sua foto de perfil foi atualizada.","success")}catch{f("Erro","Não foi possível salvar a imagem. Tente uma menor.","error")}}),o.addEventListener("submit",async i=>{i.preventDefault();const n=o.querySelector("button"),l=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> Salvando...';const d=document.getElementById("input-name").value.trim(),u=document.getElementById("input-phone").value.trim();try{await Tt(Be(xe,"users",t.uid),{name:d,phone:u}),g.userProfessionalId&&await Ua(g.userProfessionalId,{name:d,phone:u}),g.userName=d,document.getElementById("display-name").textContent=d,f("Atualizado!","Seus dados foram salvos com sucesso.","success")}catch{f("Erro","Ocorreu um problema na hora de salvar.","error")}finally{n.disabled=!1,n.innerHTML=l}})}function Oc(t){const e=document.getElementById("professional-section");if(!t){e.innerHTML=`
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
    `;const a=document.getElementById("form-my-blockage");a.addEventListener("submit",async r=>{r.preventDefault();const o=a.querySelector("#b-date-start").value,i=a.querySelector("#b-date-end").value||o,n=a.querySelector("#b-time-start").value,l=a.querySelector("#b-time-end").value,d=a.querySelector("#b-reason").value;if(!o||!n||!l)return f("Atenção","Preencha Data e Horários corretamente.","error");const u=new Date(`${o}T${n}:00`),c=new Date(`${i}T${l}:00`);if(c<=u)return f("Atenção","A data e hora de fim deve ser superior ao início.","warning");const p=a.querySelector('button[type="submit"]'),b=p.innerHTML;p.disabled=!0,p.innerHTML="A bloquear...";try{await Da({establishmentId:g.establishmentId,professionalId:t.id,reason:d||"Indisponível",startTime:u.toISOString(),endTime:c.toISOString()}),f("Sucesso","Agenda bloqueada com êxito.","success"),a.reset();const m=document.getElementById("my-blocks-filter").value;la(t.id,m)}catch(m){f("Erro",`Falha ao bloquear: ${m.message}`,"error")}finally{p.disabled=!1,p.innerHTML=b}}),document.getElementById("my-blocks-filter").addEventListener("change",r=>la(t.id,r.target.value)),la(t.id,"future")}async function la(t,e="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<div class="loader mx-auto mt-6"></div>';try{const s=new Date;let r,o;e==="history"?(o=new Date,r=new Date,r.setFullYear(r.getFullYear()-1)):(r=new Date,o=new Date,o.setFullYear(o.getFullYear()+1));let n=(await Ca(g.establishmentId,r.toISOString(),o.toISOString(),t)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));if(e==="history"?n=n.filter(l=>l.endTime<s).sort((l,d)=>d.startTime-l.startTime):n=n.filter(l=>l.endTime>=s).sort((l,d)=>l.startTime-d.startTime),n.length===0){a.innerHTML=`
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
            `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(l=>{l.addEventListener("click",async d=>{const u=d.currentTarget.dataset.blockId;if(confirm("Deletar e deixar a agenda livre neste horário?"))try{await fs(u),f("Removido","O bloqueio foi deletado.","success"),la(t,e)}catch(c){f("Erro",`Não foi possível remover: ${c.message}`,"error")}})})}catch(s){a.innerHTML=`<p class="text-xs text-red-500 font-bold p-3 bg-red-50 rounded-xl">Erro: ${v(s.message)}</p>`}}let no=!1;async function wa(t){if(!t)return;t.innerHTML=`
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
    `;const e=document.getElementById("hierarchy-list-container"),a=document.getElementById("est-parent");try{const r=(await we()).matrizes||[];if(a&&(a.innerHTML='<option value="">Nenhuma (Criar como Matriz Independente)</option>'),r.length===0)e.innerHTML=`
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
                `}),e.innerHTML=o}no||(zc(),no=!0)}catch(s){console.error("Erro na renderização da rede:",s),e.innerHTML=`
            <div class="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100 text-center">
                <i class="bi bi-exclamation-triangle text-2xl mb-2 block"></i>
                <p class="font-bold text-sm">Não foi possível carregar a estrutura organizacional.</p>
            </div>
        `}}function zc(){const t=document.getElementById("form-create-establishment");t&&t.addEventListener("submit",async e=>{e.preventDefault();const a=t.querySelector('button[type="submit"]'),s=a.innerHTML;a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> A gravar...',a.disabled=!0;const r={name:document.getElementById("est-name").value.trim(),cnpj:document.getElementById("est-cnpj").value.trim(),parentId:document.getElementById("est-parent").value||null,timezone:document.getElementById("est-timezone").value};try{const o=await pi(r);alert(o.message||"Sucesso!"),t.reset();const i=document.getElementById("modal-create-establishment"),n=window.bootstrap?.Modal.getInstance(i);n&&n.hide(),await wa(document.getElementById("content"))}catch(o){console.error("Erro ao criar estabelecimento:",o),alert("Erro: "+(o.message||"Falha ao gravar dados."))}finally{a.innerHTML=s,a.disabled=!1}})}window.loadAndRenderHierarchy=()=>wa(document.getElementById("content"));document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("gesturestart",e=>e.preventDefault()),document.addEventListener("gesturechange",e=>e.preventDefault()),document.addEventListener("gestureend",e=>e.preventDefault());let t=0;document.addEventListener("touchend",function(e){const a=new Date().getTime();a-t<=300&&e.preventDefault(),t=a},!1)});const ue=document.getElementById("loadingScreen"),gt=document.getElementById("dashboardContent"),et=document.getElementById("content"),Oa=document.getElementById("notificationBell"),ea=document.getElementById("notificationBadge"),Ge=document.getElementById("notificationPanel"),za=document.getElementById("notificationList"),Le=document.getElementById("profileMenuButton"),me=document.getElementById("profileDropdown"),lo=document.getElementById("profileName"),co=document.getElementById("profileEmail"),uo=document.getElementById("logoutButton"),po=document.getElementById("myProfileLink"),bo=document.getElementById("hamburger-menu-btn"),be=document.getElementById("sidebar"),he=document.getElementById("mobile-overlay"),mo=document.getElementById("themeToggleBtn"),_a=document.getElementById("themeIcon"),cs=document.getElementById("mobile-bottom-nav"),go=document.getElementById("nav-scroll"),_c=document.querySelectorAll(".bottom-nav-item");function Vc(){if(!go)return;const t=document.querySelector(".bottom-nav-item.active");if(!t)return;const e=go,a=e.getBoundingClientRect(),s=t.getBoundingClientRect(),o=s.left+s.width/2-a.left-a.width/2;e.scrollBy({left:o,behavior:"smooth"})}const Uc={"dashboard-section":en,"agenda-section":Uo,"comandas-section":Yn,"relatorios-section":Zn,"servicos-section":cl,"produtos-section":El,"suppliers-section":Fl,"profissionais-section":Jl,"clientes-section":nd,"estabelecimento-section":t=>vr(t),"ausencias-section":qd,"users-section":xa,"sales-report-section":Xd,"financial-section":ec,"commissions-section":bc,"packages-section":Tc,"my-profile-section":Rc,"hierarquia-section":()=>wa(et),"establishments-section":()=>wa(et)},Wc={"dashboard-section":"Dashboard","agenda-section":"Agenda","comandas-section":"Comandas / PDV","relatorios-section":"Relatórios","servicos-section":"Serviços","produtos-section":"Estoque","suppliers-section":"Parceiros","profissionais-section":"Equipe","clientes-section":"Clientes","estabelecimento-section":"Empresa","ausencias-section":"Ausências","users-section":"Usuários","sales-report-section":"Relatório de Vendas","financial-section":"Financeiro","commissions-section":"Comissões","packages-section":"Pacotes","my-profile-section":"Meu Perfil","hierarquia-section":"Rede / Filiais","establishments-section":"Rede / Filiais"};function da(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("kairos_theme",t),_a&&(t==="dark"?_a.className="bi bi-sun-fill text-lg sm:text-xl text-amber-400":_a.className="bi bi-moon-fill text-lg sm:text-xl text-slate-500")}function Jc(){const t=localStorage.getItem("kairos_theme"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;da(t||(e?"dark":"light"))}let Dt=null,Pt=[];function Ar(){if(!ea||!za)return;const t=Pt.filter(e=>!e.read).length;if(t>0?(ea.textContent=t,ea.classList.remove("hidden")):ea.classList.add("hidden"),Pt.length===0){za.innerHTML='<p class="text-center text-slate-500 p-4 text-sm">Nenhuma notificação.</p>';return}za.innerHTML=Pt.map(e=>`
    <div class="notification-item ${e.read?"":"unread"}">
        <p class="font-semibold text-sm text-slate-800">${e.title}</p>
        <p class="text-xs text-slate-600 mt-0.5">${e.message}</p>
        <p class="text-[10px] text-slate-400 mt-1"><i class="bi bi-clock mr-1"></i>${e.time}</p>
    </div>
    `).join("")}function fo(t){Dt&&Dt();const e=ka(xe,"establishments",t,"notifications"),a=vo(e,yo("timestamp",">=",new Date),Jr("timestamp","desc"));Dt=Qr(a,s=>{s.docChanges().forEach(r=>{if(r.type==="added"){const o=r.doc.data();Pt.unshift({title:o.title,message:o.message,time:o.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),f(o.title,o.message,"info",!0),Ar();const i=document.querySelector(".sidebar-link.active");i&&i.dataset.target==="agenda-section"&&Uo()}})},s=>{console.error("Erro no listener de notificações:",s)})}async function Qc(t){const e=document.getElementById("multi-context-container"),a=document.getElementById("multi-context-btn"),s=document.getElementById("multi-context-label"),r=document.getElementById("multi-context-count"),o=document.getElementById("multi-context-list"),i=document.getElementById("multi-context-apply"),n=document.getElementById("multi-context-dropdown"),l=document.getElementById("multi-context-arrow");if(!(!e||!o))try{const u=(await we()).matrizes||[];let c="",p=0;if(u.forEach(b=>{c+=`
                <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors mb-1">
                    <input type="checkbox" value="${b.id}" class="context-checkbox" data-name="${ta(b.name)}">
                    <span class="text-[13px] sm:text-sm font-bold text-slate-700 truncate">🏢 ${ta(b.name)}</span>
                </label>
            `,p++,b.branches&&b.branches.length>0&&b.branches.forEach(m=>{c+=`
                        <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors ml-4 mb-1 border-l-2 border-slate-100 pl-3">
                            <input type="checkbox" value="${m.id}" class="context-checkbox" data-name="${ta(m.name)}">
                            <span class="text-[12px] sm:text-[13px] font-medium text-slate-600 truncate">📍 ${ta(m.name)}</span>
                        </label>
                    `,p++})}),p>0){o.innerHTML=c,e.style.display="block",(!g.selectedEstablishments||g.selectedEstablishments.length===0)&&(g.selectedEstablishments=[t]);const b=Array.from(o.querySelectorAll('input[type="checkbox"]')),m=()=>{const y=b.filter(k=>k.checked);r.textContent=y.length,y.length===0?s.textContent="Nenhuma selecionada":y.length===1?s.textContent=y[0].dataset.name:s.textContent=`${y.length} Unidades`};let h=!1;b.forEach(y=>{g.selectedEstablishments.includes(y.value)&&(y.checked=!0,h=!0)}),!h&&b.length>0&&(b[0].checked=!0,g.selectedEstablishments=[b[0].value],g.establishmentId=b[0].value),m(),a.addEventListener("click",y=>{y.stopPropagation(),n.classList.toggle("hidden"),l.style.transform=n.classList.contains("hidden")?"rotate(0deg)":"rotate(180deg)"}),document.addEventListener("click",y=>{!e.contains(y.target)&&!n.classList.contains("hidden")&&(n.classList.add("hidden"),l.style.transform="rotate(0deg)",b.forEach(k=>{k.checked=g.selectedEstablishments.includes(k.value)}),m())}),b.forEach(y=>y.addEventListener("change",m)),i.addEventListener("click",async y=>{y.stopPropagation(),ue&&(ue.classList.remove("hidden","fade-out"),ue.style.display="flex");const k=b.filter(P=>P.checked);if(k.length===0){ue&&(ue.classList.add("fade-out"),setTimeout(()=>{ue.style.display="none"},500)),f("Atenção","Selecione pelo menos uma unidade.","warning");return}g.selectedEstablishments=k.map(P=>P.value);const A=g.selectedEstablishments[0];try{const P=await je(A);g.establishmentId=A,g.establishmentName=P.name,g.enabledModules=P.modules,g.currentViewContext={id:A,name:P.name,type:P.parentId?"BRANCH":"GROUP"},fo(A),xo(g.userPermissions),n.classList.add("hidden"),l.style.transform="rotate(0deg)",f("Ambiente Atualizado","Exibindo dados consolidados.","success");const S=document.querySelector(".sidebar-link.active"),I=S?S.getAttribute("data-target"):"dashboard-section";oe(I)}catch{f("Erro","Problema ao trocar a visualização.","error")}finally{ue&&(ue.classList.add("fade-out"),setTimeout(()=>{ue.style.display="none"},500))}});try{const y=await je(g.establishmentId);g.establishmentName=y.name,g.enabledModules=y.modules,g.currentViewContext={id:g.establishmentId,name:y.name,type:y.parentId?"BRANCH":"GROUP"},fo(g.establishmentId),xo(g.userPermissions)}catch{}}else e.style.display="none"}catch{e.style.display="none"}}function oe(t,e={}){const a=t.replace("-section","");if(t!=="my-profile-section"){const r=["hierarquia-section","establishments-section","estabelecimento-section","dashboard-section"].includes(t),o=g.enabledModules?.[a]!==!1,i=g.userPermissions===null||g.userPermissions[t]?.view===!0;if(!r&&(!o||!i)){et&&(et.innerHTML='<div class="p-8 text-center mt-10"><i class="bi bi-shield-lock text-5xl text-rose-500 mb-4 block"></i><h2 class="text-2xl font-bold text-slate-800">Acesso Negado</h2><p class="text-slate-500 mt-2">Você não possui permissão para visualizar esta tela.</p></div>'),document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active")),be&&be.classList.contains("absolute")&&(be.classList.add("hidden"),he&&he.classList.add("hidden"));return}}const s=Uc[t];if(s&&et){const r=document.getElementById("header-page-title");r&&(r.textContent=Wc[t]||"Painel"),document.querySelectorAll(".sidebar-link").forEach(o=>{o.classList.toggle("active",o.getAttribute("data-target")===t)}),cs&&(_c.forEach(o=>{o.classList.toggle("active",o.getAttribute("data-target")===t)}),setTimeout(Vc,50)),t==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(o=>o.classList.remove("active")),et.innerHTML="",window.innerWidth<768&&be&&(be.classList.add("hidden"),he&&he.classList.add("hidden")),s(e)}}window.navigateTo=oe;async function xo(t){const e=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),s=document.getElementById("kpi-today-appointments"),r=document.getElementById("kpi-today-revenue"),o=t===null||t["agenda-section"]?.view===!0,i=t===null||t["financial-section"]?.view===!0;if(o&&e&&(e.classList.remove("hidden"),e.classList.add("inline-flex")),i&&a&&(a.classList.remove("hidden"),a.classList.add("inline-flex")),!(!o&&!i))try{const n=await Eo();o&&s&&(s.textContent=n.todayAppointments.toString()),i&&r&&(r.textContent=`R$ ${n.todayRevenue.toFixed(2).replace(".",",")}`)}catch{}}async function Gc(t){try{Ie.getPlatform()==="android"&&await pe.createChannel({id:"default",name:"Notificações",description:"Alertas",importance:5,visibility:1,vibration:!0});let e=await pe.checkPermissions();if(e.receive==="prompt"&&(e=await pe.requestPermissions()),e.receive!=="granted")return;await pe.register(),pe.addListener("registration",async a=>{try{const s=Be(xe,"users",t);await Tt(s,{fcmTokens:Wr(a.value),platform:"native_mobile"})}catch{}}),pe.addListener("pushNotificationReceived",a=>f(a.title,a.body,"info",!0)),pe.addListener("pushNotificationActionPerformed",()=>oe("agenda-section"))}catch{}}function Yc(){const t=document.getElementById("exitConfirmationModal"),e=document.getElementById("btn-cancel-exit"),a=document.getElementById("btn-confirm-exit"),s=()=>t&&(t.style.display="block"),r=()=>t&&(t.style.display="none"),o=()=>t&&t.style.display==="block";t&&(e.addEventListener("click",()=>{r(),Ie.isNativePlatform()||history.pushState(null,document.title,location.href)}),a.addEventListener("click",()=>{r(),Ie.isNativePlatform()?js.exitApp():history.back()}),Ie.isNativePlatform()?js.addListener("backButton",()=>{if(o())r();else{const i=document.querySelectorAll('.modal[style*="display: block"]'),n=Array.from(i).filter(d=>d.id!=="exitConfirmationModal");if(n.length>0){n.forEach(d=>d.style.display="none");return}if(be&&!be.classList.contains("hidden")&&window.innerWidth<768){be.classList.add("hidden"),he&&he.classList.add("hidden");return}const l=document.querySelector(".sidebar-link.active");l&&l.getAttribute("data-target")==="dashboard-section"?s():oe("dashboard-section")}}):(history.pushState(null,document.title,location.href),window.addEventListener("popstate",()=>{if(o()){r(),history.pushState(null,document.title,location.href);return}const i=document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display: flex"]'),n=Array.from(i).filter(d=>d.id!=="exitConfirmationModal");if(n.length>0){n.forEach(d=>d.style.display="none"),history.pushState(null,document.title,location.href);return}const l=document.querySelector(".sidebar-link.active");l&&l.getAttribute("data-target")==="dashboard-section"?s():(oe("dashboard-section"),history.pushState(null,document.title,location.href))})))}function ta(t){return t?t.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}async function Xc(){try{await Rr(ye,Hr)}catch{}Ie.isNativePlatform()&&document.body.classList.add("is-app-native"),Gr(),Yc(),Jc(),mo&&mo.addEventListener("click",t=>{t.preventDefault();const e=document.documentElement.getAttribute("data-theme")||"light";da(e==="dark"?"light":"dark")}),bo&&bo.addEventListener("click",t=>{t.stopPropagation(),be&&(be.classList.remove("hidden"),be.classList.add("absolute","inset-y-0","left-0","z-40","shadow-xl")),he&&he.classList.remove("hidden")}),cs&&cs.addEventListener("click",t=>{const e=t.target.closest(".bottom-nav-item");if(!e)return;t.preventDefault();const a=e.getAttribute("data-target");oe(a)}),he&&he.addEventListener("click",()=>{be&&(be.classList.add("hidden"),be.classList.remove("absolute","inset-y-0","left-0","z-40","shadow-xl")),he.classList.add("hidden")}),Oa&&Oa.addEventListener("click",t=>{t.stopPropagation(),Ge&&(Ge.classList.toggle("hidden"),Ge.classList.contains("hidden")||(Pt.forEach(e=>e.read=!0),Ar()))}),Le&&Le.addEventListener("click",t=>{t.stopPropagation(),me&&(me.classList.toggle("active"),me.classList.contains("active")?me.classList.remove("hidden"):setTimeout(()=>me.classList.add("hidden"),200))}),po&&po.addEventListener("click",t=>{t.preventDefault(),oe("my-profile-section"),me&&(me.classList.remove("active"),me.classList.add("hidden"))}),window.addEventListener("userPhotoUpdated",t=>{const e=t.detail;Le&&e&&(Le.innerHTML=`<img src="${e}" alt="Avatar" class="w-full h-full rounded-full object-cover">`)}),document.addEventListener("click",t=>{Ge&&!Ge.contains(t.target)&&t.target!==Oa&&Ge.classList.add("hidden"),me&&!me.contains(t.target)&&t.target!==Le&&me.classList.contains("active")&&(me.classList.remove("active"),setTimeout(()=>me.classList.add("hidden"),200))}),Or(ye,async t=>{if(t){if(!Ie.isNativePlatform()&&(Mi(),"Notification"in window&&Notification.permission==="default")){const e=document.getElementById("toast-notification-request"),a=document.getElementById("btn-enable-toast");e&&setTimeout(()=>{e.style.display="block"},3500),a&&a.addEventListener("click",async()=>{await Ai()&&e&&(e.style.display="none")});const s=()=>{e&&(e.style.display="none")},r=document.getElementById("btn-deny-toast"),o=document.getElementById("btn-close-toast");r&&r.addEventListener("click",s),o&&o.addEventListener("click",s)}try{const a=(await t.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="admin"||a.role==="employee")&&a.establishmentId){let s=null,r=t.displayName,o=null,i=null;const n=Be(xe,"users",t.uid),l=await us(n);if(l.exists()){const u=l.data();s=a.role==="employee"?u.permissions||{}:null,r=u.name||r,o=u.professionalId||null,i=u.photo||null}if(g.userProfessionalId=o,o&&!i)try{const u=await wo(o);u&&u.photo&&(i=u.photo)}catch{}Ie.isNativePlatform()&&Gc(t.uid);const d=r||t.email;Zr(a.establishmentId,"Carregando...",s),i?Le&&(Le.innerHTML=`<img src="${i}" class="w-full h-full rounded-full object-cover">`):Le&&(Le.textContent=d.charAt(0).toUpperCase()),lo&&(lo.textContent=d),co&&(co.textContent=t.email),uo&&uo.addEventListener("click",u=>{u.preventDefault(),Dt&&Dt(),zr(ye).then(()=>window.location.href="/login.html")}),await Qc(a.establishmentId),ui(oe,s,g.enabledModules),ue&&(ue.classList.add("fade-out"),setTimeout(()=>{ue.style.display="none"},500)),gt&&(gt.style.display="flex"),setTimeout(()=>{hi()},1500),oe("dashboard-section")}else throw new Error("Permissão ou estabelecimento não configurado.")}catch(e){ue&&(ue.style.display="none"),gt&&(gt.innerHTML=`<div class="w-full h-full flex flex-col items-center justify-center p-4 text-center"><i class="bi bi-x-circle text-5xl text-rose-500 mb-4"></i><h2 class="text-xl font-bold">Erro de Acesso</h2><p class="text-slate-500 mt-2">${e.message}</p></div>`,gt.style.display="flex")}}else window.location.href="/login.html"})}Xc();export{So as W};
