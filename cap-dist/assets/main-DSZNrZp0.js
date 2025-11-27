import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{initializeApp as vo}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import{getAuth as ho,EmailAuthProvider as yo,reauthenticateWithCredential as xo,verifyBeforeUpdateEmail as wo,updatePassword as ko,updateProfile as Eo,onAuthStateChanged as So,signOut as da}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{getFirestore as $o,doc as _a,getDoc as Io,updateDoc as Co,collection as Lo,query as Bo,where as To,orderBy as Mo,onSnapshot as Do}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";const Po={apiKey:"AIzaSyAlJaPEW5-yOb-8wkB8EJZhAML2M2yI8Ao",authDomain:"kairos-system.firebaseapp.com",projectId:"kairos-system",storageBucket:"kairos-system.appspot.com",messagingSenderId:"603994960586",appId:"1:603994960586:web:30d2c030eed3c55eccfa33",measurementId:"G-SVHFXKV5EC"},Wa=vo(Po),V=ho(Wa),Gt=$o(Wa),p={establishmentId:null,establishmentName:null,userName:null,userProfessionalId:null,userPermissions:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function Ao(e,t,a){p.establishmentId=e,p.establishmentName=t,p.userPermissions=a}const At="https://kairos-service-603994960586.southamerica-east1.run.app";console.log("🚀 API configurada para Produção:",At);async function qo(){const e=V.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function y(e,t={}){const a=await qo();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const n=`${At}${e}`;console.log(`AuthenticatedFetch: ${t.method||"GET"} ${n}`);try{const o=await fetch(n,{...t,headers:{...a,...t.headers}});if(!o.ok){const r=(await o.json().catch(()=>({message:o.statusText}))).message||`Erro na API: ${o.status}`;if(r.includes("FAILED_PRECONDITION")&&r.includes("requires an index")){const i=/(https:\/\/[^\s]+)/,d=r.match(i),l=d?d[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${l}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${o.status}) em ${n}:`,r),new Error(r)}return o.json()}catch(o){throw console.error(`Falha de rede ao tentar acessar ${n}:`,o.message),o.message.includes("Failed to fetch")||o.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${At}. Verifique sua conexão com a internet.`):o}}const No=(e,t,a,n=null)=>{let o=`/api/appointments/${e}?startDate=${t}&endDate=${a}`;return n&&(o+=`&professionalId=${n}`),y(o)},Fo=(e,t,a)=>{const n=`/api/appointments/cancelled/${e}?startDate=${t}&endDate=${a}`;return y(n)},Ro=e=>y("/api/appointments",{method:"POST",body:JSON.stringify(e)}),Yt=(e,t)=>y(`/api/appointments/${e}`,{method:"PUT",body:JSON.stringify(t)}),Ho=e=>y(`/api/appointments/${e}`,{method:"DELETE"}),jo=e=>y(`/api/appointments/${e}/reopen`,{method:"POST"}),Oo=(e,t)=>y(`/api/appointments/${e}/checkout`,{method:"POST",body:JSON.stringify(t)});let q;async function zo(){if(!q)try{q=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function Vo(){if(!q){console.warn("AudioContext não inicializado. O som não será tocado.");return}q.state==="suspended"&&q.resume();const e=q.createOscillator(),t=q.createGain();e.connect(t),t.connect(q.destination),e.type="sine",e.frequency.setValueAtTime(800,q.currentTime),t.gain.setValueAtTime(0,q.currentTime),t.gain.linearRampToValueAtTime(.3,q.currentTime+.01),t.gain.exponentialRampToValueAtTime(1e-4,q.currentTime+.2),e.start(q.currentTime),e.stop(q.currentTime+.2)}function g(e,t,a="info",n=!1){const o=document.getElementById("toast-container");if(!o)return;n&&Vo();const s=document.createElement("div"),r={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},i={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},d={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};s.className=`toast ${r[a]||r.info}`,s.innerHTML=`
        <div class="toast-icon">${i[a]||i.info}</div>
        <div class="toast-content">
            <p class="font-bold">${e}</p>
            <p class="text-sm">${t}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${d[a]||d.info}"></div>
        </div>
    `,o.appendChild(s),s.querySelector(".toast-close").addEventListener("click",()=>s.remove()),setTimeout(()=>{s.remove()},4e3)}function T(e,t){const a=document.getElementById("genericModal");return new Promise(n=>{a.innerHTML=`
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
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",n(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",n(!1)}})}function j({title:e,contentHTML:t,maxWidth:a="max-w-4xl",showCloseButton:n=!0}){let o=document.getElementById("genericModal");const s=o.cloneNode(!1);o.parentNode.replaceChild(s,o),o=s;const r=()=>{o.style.display="none"},i=c=>{o.querySelector("#genericModalContentBody").innerHTML=c};o.innerHTML=`
        <div class="modal-content ${a} p-0 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
            
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${e}</h2>
                ${n?'<button data-close-modal class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>':""}
            </header>

            <div id="genericModalContentBody" class="flex-1 overflow-y-auto p-5">
                ${t}
            </div>
            
            <footer id="genericModalFooter" class="hidden"></footer>
        </div>
    `;const d=o.querySelector("[data-close-modal]");d&&(d.onclick=r);const l=o.querySelector('[data-action="close-modal"]');return l&&(l.onclick=r),o.addEventListener("click",c=>{c.target.closest(".modal-content")||r()}),o.style.display="flex",{modalElement:o,close:r,setContent:i}}function Uo(){document.body.addEventListener("click",()=>{q||zo()},{once:!0}),document.addEventListener("click",e=>{const t=e.target.closest('[data-action="close-modal"]');if(t){const n=t.dataset.target;if(n){const o=document.getElementById(n);o&&(o.style.display="none")}}if(e.target.closest("[data-close-modal]")){const n=document.getElementById("genericModal");n&&(n.style.display="none")}})}async function ca(){const e=document.getElementById("cancellationListContainer");if(!e)return;e.innerHTML='<div class="loader mx-auto"></div>';const t=document.getElementById("cancelStartDate").value,a=document.getElementById("cancelEndDate").value;try{const n=await Fo(p.establishmentId,t,a);if(n.length===0){e.innerHTML='<p class="text-center text-gray-500 py-4">Nenhum cancelamento encontrado para este período.</p>';return}e.innerHTML=n.map(o=>`
            <div class="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-bold text-gray-800">${o.clientName}</p>
                        <p class="text-sm text-gray-600">${new Date(o.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})} - ${o.serviceName}</p>
                        <p class="text-xs text-gray-500">com ${o.professionalName}</p>
                    </div>
                </div>
            </div>
        `).join("")}catch(n){e.innerHTML=`<p class="text-red-500 text-center py-4">Erro ao carregar histórico: ${n.message}</p>`}}function _o(){const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const n=`
        <div class="flex flex-col sm:flex-row sm:items-end gap-4 bg-gray-100 p-3 rounded-lg mb-4">
            
            <div class="w-full sm:flex-grow">
                <label for="cancelStartDate" class="text-sm font-medium">De:</label>
                <input type="date" id="cancelStartDate" value="${t.toISOString().split("T")[0]}" class="w-full p-2 border rounded-md">
            </div>
            
            <div class="w-full sm:flex-grow">
                <label for="cancelEndDate" class="text-sm font-medium">Até:</label>
                <input type="date" id="cancelEndDate" value="${e}" class="w-full p-2 border rounded-md">
            </div>
            
            <button id="searchCancellationsBtn" class="w-full sm:w-auto flex-shrink-0 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Buscar</button>
        </div>
        <div id="cancellationListContainer" class="space-y-3 max-h-96 overflow-y-auto pr-2">
            <div class="loader mx-auto"></div>
        </div>
    `,{modalElement:o}=j({title:"Histórico de Cancelamentos",contentHTML:n,maxWidth:"max-w-3xl"});o.querySelector("#searchCancellationsBtn").addEventListener("click",ca),ca()}const R=document.getElementById("sidebar"),ma=document.getElementById("sidebarToggle"),Me=document.getElementById("mainContent"),Wo=document.querySelectorAll(".sidebar-link"),ua=document.getElementById("hamburger-menu-btn"),Se=document.getElementById("mobile-overlay");function rt(e){!R||!Me||(R.classList.toggle("collapsed",e),Me.classList.toggle("sidebar-collapsed-shift",e))}function Jo(){!R||!Se||(R.classList.add("mobile-open"),Se.classList.add("visible"))}function Ze(){!R||!Se||(R.classList.remove("mobile-open"),Se.classList.remove("visible"))}function Go(){rt(!R.classList.contains("collapsed"))}function Yo(e,t,a){if(!R||!Me)return;Me.classList.add("main-content-shift"),window.innerWidth>=768?rt(R.classList.contains("collapsed")):(Me.classList.remove("main-content-shift","sidebar-collapsed-shift"),Ze()),ma&&ma.addEventListener("click",o=>{o.stopPropagation(),Go()}),R.addEventListener("mouseenter",()=>{window.innerWidth>=1024&&R.classList.contains("collapsed")&&rt(!1)}),R.addEventListener("mouseleave",()=>{window.innerWidth>=1024&&(document.querySelector("#sidebarToggle:hover")||rt(!0))}),ua&&ua.addEventListener("click",o=>{o.stopPropagation(),Jo()}),Se&&Se.addEventListener("click",o=>{o.stopPropagation(),Ze()});let n=0;R.addEventListener("touchstart",o=>{n=o.changedTouches[0].screenX},{passive:!0}),R.addEventListener("touchend",o=>{const s=o.changedTouches[0].screenX;n-s>50&&Ze()},{passive:!0}),Wo.forEach(o=>{const s=o.getAttribute("data-target"),r=s.replace("-section",""),i=a?.[r]!==!1,d=t===null||t[s]?.view===!0;if(!i||!d){o.style.display="none";return}o.style.display="flex",o.addEventListener("click",l=>{l.preventDefault(),s&&typeof e=="function"&&e(s),window.innerWidth<768&&Ze()})})}const _e=e=>{const t=e||p.establishmentId;return t?y(`/api/establishments/${t}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Xo=(e,t)=>{const a=e||p.establishmentId;return a?y(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(t)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Qo=(e,t)=>{const a=e||p.establishmentId;return a?y(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Zo=(e,t)=>{const a=e||p.establishmentId;return a?y(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},_=e=>y(`/api/professionals/${e}`),Ko=e=>y(`/api/professionals/details/${e}`),es=e=>y("/api/professionals",{method:"POST",body:JSON.stringify(e)}),ts=(e,t)=>y(`/api/professionals/${e}`,{method:"PUT",body:JSON.stringify(t)}),as=e=>y(`/api/professionals/${e}`,{method:"DELETE"});var $e;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})($e||($e={}));class kt extends Error{constructor(t,a,n){super(t),this.message=t,this.code=a,this.data=n}}const os=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},ss=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},n=a.Plugins=a.Plugins||{},o=()=>t!==null?t.name:os(e),s=()=>o()!=="web",r=m=>{const u=l.get(m);return!!(u?.platforms.has(o())||i(m))},i=m=>{var u;return(u=a.PluginHeaders)===null||u===void 0?void 0:u.find(b=>b.name===m)},d=m=>e.console.error(m),l=new Map,c=(m,u={})=>{const b=l.get(m);if(b)return console.warn(`Capacitor plugin "${m}" already registered. Cannot register plugins twice.`),b.proxy;const f=o(),v=i(m);let k;const $=async()=>(!k&&f in u?k=typeof u[f]=="function"?k=await u[f]():k=u[f]:t!==null&&!k&&"web"in u&&(k=typeof u.web=="function"?k=await u.web():k=u.web),k),S=(L,M)=>{var W,ee;if(v){const te=v?.methods.find(z=>M===z.name);if(te)return te.rtype==="promise"?z=>a.nativePromise(m,M.toString(),z):(z,Xe)=>a.nativeCallback(m,M.toString(),z,Xe);if(L)return(W=L[M])===null||W===void 0?void 0:W.bind(L)}else{if(L)return(ee=L[M])===null||ee===void 0?void 0:ee.bind(L);throw new kt(`"${m}" plugin is not implemented on ${f}`,$e.Unimplemented)}},w=L=>{let M;const W=(...ee)=>{const te=$().then(z=>{const Xe=S(z,L);if(Xe){const Qe=Xe(...ee);return M=Qe?.remove,Qe}else throw new kt(`"${m}.${L}()" is not implemented on ${f}`,$e.Unimplemented)});return L==="addListener"&&(te.remove=async()=>M()),te};return W.toString=()=>`${L.toString()}() { [capacitor code] }`,Object.defineProperty(W,"name",{value:L,writable:!1,configurable:!1}),W},E=w("addListener"),B=w("removeListener"),D=(L,M)=>{const W=E({eventName:L},M),ee=async()=>{const z=await W;B({eventName:L,callbackId:z},M)},te=new Promise(z=>W.then(()=>z({remove:ee})));return te.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await ee()},te},A=new Proxy({},{get(L,M){switch(M){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return v?D:E;case"removeListener":return B;default:return w(M)}}});return n[m]=A,l.set(m,{name:m,proxy:A,platforms:new Set([...Object.keys(u),...v?[f]:[]])}),A};return a.convertFileSrc||(a.convertFileSrc=m=>m),a.getPlatform=o,a.handleError=d,a.isNativePlatform=s,a.isPluginAvailable=r,a.registerPlugin=c,a.Exception=kt,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},ns=e=>e.Capacitor=ss(e),mt=ns(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Xt=mt.registerPlugin;class Ja{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let n=!1;this.listeners[t]||(this.listeners[t]=[],n=!0),this.listeners[t].push(a);const s=this.windowListeners[t];s&&!s.registered&&this.addWindowListener(s),n&&this.sendRetainedArgumentsForEvent(t);const r=async()=>this.removeListener(t,a);return Promise.resolve({remove:r})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,n){const o=this.listeners[t];if(!o){if(n){let s=this.retainedEventArguments[t];s||(s=[]),s.push(a),this.retainedEventArguments[t]=s}return}o.forEach(s=>s(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:n=>{this.notifyListeners(a,n)}}}unimplemented(t="not implemented"){return new mt.Exception(t,$e.Unimplemented)}unavailable(t="not available"){return new mt.Exception(t,$e.Unavailable)}async removeListener(t,a){const n=this.listeners[t];if(!n)return;const o=n.indexOf(a);this.listeners[t].splice(o,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(n=>{this.notifyListeners(t,n)}))}}const pa=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),ga=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class rs extends Ja{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(n=>{if(n.length<=0)return;let[o,s]=n.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");o=ga(o).trim(),s=ga(s).trim(),a[o]=s}),a}async setCookie(t){try{const a=pa(t.key),n=pa(t.value),o=`; expires=${(t.expires||"").replace("expires=","")}`,s=(t.path||"/").replace("path=",""),r=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${n||""}${o}; path=${s}; ${r};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}Xt("CapacitorCookies",{web:()=>new rs});const is=async e=>new Promise((t,a)=>{const n=new FileReader;n.onload=()=>{const o=n.result;t(o.indexOf(",")>=0?o.split(",")[1]:o)},n.onerror=o=>a(o),n.readAsDataURL(e)}),ls=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(o=>o.toLocaleLowerCase()).reduce((o,s,r)=>(o[s]=e[t[r]],o),{})},ds=(e,t=!0)=>e?Object.entries(e).reduce((n,o)=>{const[s,r]=o;let i,d;return Array.isArray(r)?(d="",r.forEach(l=>{i=t?encodeURIComponent(l):l,d+=`${s}=${i}&`}),d.slice(0,-1)):(i=t?encodeURIComponent(r):r,d=`${s}=${i}`),`${n}&${d}`},"").substr(1):null,cs=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),o=ls(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(o.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[r,i]of Object.entries(e.data||{}))s.set(r,i);a.body=s.toString()}else if(o.includes("multipart/form-data")||e.data instanceof FormData){const s=new FormData;if(e.data instanceof FormData)e.data.forEach((i,d)=>{s.append(d,i)});else for(const i of Object.keys(e.data))s.append(i,e.data[i]);a.body=s;const r=new Headers(a.headers);r.delete("content-type"),a.headers=r}else(o.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class ms extends Ja{async request(t){const a=cs(t,t.webFetchExtra),n=ds(t.params,t.shouldEncodeUrlParams),o=n?`${t.url}?${n}`:t.url,s=await fetch(o,a),r=s.headers.get("content-type")||"";let{responseType:i="text"}=s.ok?t:{};r.includes("application/json")&&(i="json");let d,l;switch(i){case"arraybuffer":case"blob":l=await s.blob(),d=await is(l);break;case"json":d=await s.json();break;case"document":case"text":default:d=await s.text()}const c={};return s.headers.forEach((m,u)=>{c[u]=m}),{data:d,headers:c,status:s.status,url:s.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}Xt("CapacitorHttp",{web:()=>new ms});const ae=Xt("PushNotifications",{}),us=(e,t,a)=>y(`/api/analytics/${e}?startDate=${t}&endDate=${a}`),ps=({establishmentId:e,startDate:t,endDate:a,cashierSessionId:n})=>{let o=`/api/reports/sales/${e}?startDate=${t}&endDate=${a}`;return n&&n!=="all"&&(o+=`&cashierSessionId=${n}`),y(o)},gs=(e,t,a)=>y(`/api/analytics/${e}/monthly-details?year=${t}&month=${a}`),fs=(e,t,a,n)=>{const o=`/api/analytics/${e}/daily-details?year=${t}&month=${a}&day=${n}`;return y(o)},bs=(e,t,a,n)=>{const o=`/api/analytics/${e}/professional-details?year=${t}&month=${a}&professionalId=${n}`;return y(o)},vs=()=>y("/api/reports/summary",{method:"GET"}),Ie=e=>y(`/api/services/${e}`),hs=e=>y("/api/services",{method:"POST",body:JSON.stringify(e)}),ys=(e,t)=>y(`/api/services/${e}`,{method:"PUT",body:JSON.stringify(t)}),xs=e=>y(`/api/services/${e}`,{method:"DELETE"}),ws=(e,t)=>y(`/api/services/${e}/status`,{method:"PATCH",body:JSON.stringify({active:t})}),ks=e=>y(`/api/services/stats/most-popular/${e}`),bt=(e,t,a,n="all")=>{const o=`/api/blockages/${e}?startDate=${t}&endDate=${a}&professionalId=${n}`;return y(o)},vt=e=>y("/api/blockages",{method:"POST",body:JSON.stringify(e)}),Qt=e=>y(`/api/blockages/${e}`,{method:"DELETE"}),Ga=e=>y("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:e})}),We=e=>y(`/api/clients/${e}`),Zt=e=>y("/api/clients",{method:"POST",body:JSON.stringify(e)}),Es=(e,t)=>y(`/api/clients/${e}`,{method:"PUT",body:JSON.stringify(t)}),Ss=e=>y(`/api/clients/${e}`,{method:"DELETE"}),$s=(e,t,a)=>{const n=`/api/clients/history/${e}?clientName=${encodeURIComponent(t)}&clientPhone=${encodeURIComponent(a)}`;return y(n)},Is=(e,t,a)=>{const n=`/api/clients/loyalty-history/${e}?clientName=${encodeURIComponent(t)}&clientPhone=${encodeURIComponent(a)}`;return y(n)},Cs=(e,t,a,n)=>y("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:e,clientName:t,clientPhone:a,rewardData:n})}),fa=document.getElementById("content"),Ls=window.location.origin;let ba=!1;const qt=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5"},{bg:"#d1fae5",border:"#059669",main:"#059669"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48"},{bg:"#fef3c7",border:"#d97706",main:"#d97706"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed"},{bg:"#fce7f3",border:"#db2777",main:"#db2777"}];let Je=[],ht=[],je={},Z=[],C={currentView:"list",weekViewDays:7,currentDate:new Date,selectedProfessionalId:"all",profSearchTerm:"",showInactiveProfs:!1,scrollToAppointmentId:null},x={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function Bs(e){return new Intl.DateTimeFormat("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).format(e).replace(/\./g,"")}function Ya(e){const t=new Date(e);if(t.setHours(0,0,0,0),C.currentView==="week"&&C.weekViewDays===7){const a=t.getDay(),n=t.getDate()-a+(a===0?-6:1);return new Date(t.setDate(n))}return t}function ut(){const e=document.getElementById("profSelectorContainer"),t=C.profSearchTerm.toLowerCase();if(!e||!p.professionals)return;let a=p.professionals.filter(s=>C.showInactiveProfs||s.status!=="inactive");t&&(a=a.filter(s=>s.name.toLowerCase().includes(t)));const o=[...[{id:"all",name:"Todos",photo:null,status:"active"}],...a];e.innerHTML=o.map(s=>{const r=C.selectedProfessionalId===s.id,i=s.name==="Todos"?"Todos":s.name.split(" ")[0],d=s.name==="Todos"?"T":s.name.charAt(0).toUpperCase(),l=s.status!=="inactive",c=qt[0],m=s.id!=="all"&&p.professionalColors.get(s.id)||c,u=s.photo||`https://placehold.co/64x64/${m.main?.replace("#","")||"E0E7FF"}/${m.light?.replace("#","")||"4F46E5"}?text=${d}`,b=s.id==="all"?"#e0e7ff":m.light,f=s.id==="all"?"#4f46e5":m.main,k=`border: 3px solid ${r?m.border:"transparent"}; box-shadow: ${r?"0 0 0 2px "+m.border:"none"};`;return`
            <div class="prof-card ${r?"selected":""} ${l?"":"opacity-50"}" 
                 data-action="select-professional" 
                 data-prof-id="${s.id}">
                ${s.id==="all"?`<div class="prof-card-all-placeholder" style="background-color: ${b}; color: ${f}; ${k}">
                           ${d}
                          </div>`:`<img src="${u}" alt="${s.name}" class="prof-card-photo" style="${k}" />`}
                <span class="prof-card-name">${i}</span>
            </div>
        `}).join("")}function Ts(e,t,a,n,o){const s=(e||"").replace(/\D/g,""),r=new Date(o).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),i=new Date(o).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=`Olá, ${t}! Você tem um agendamento de ${a} com o(a) profissional ${n} para o dia ${r} às ${i}. Podemos confirmar? Agradecemos a preferência!`,l=encodeURIComponent(d);return`https://wa.me/${s}?text=${l}`}function Ms(e){const t=document.getElementById("agenda-view");if(e.sort((n,o)=>new Date(n.startTime)-new Date(o.startTime)),e.length===0){t.innerHTML='<div class="text-center p-10 text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum agendamento ou bloqueio</h3><p class="mt-1 text-sm text-gray-500">Não há eventos para o dia e filtros selecionados.</p></div>';return}const a=e.map(n=>{const o=new Date(n.startTime),s=new Date(n.endTime),r=o.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),i=s.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=p.professionalColors.get(n.professionalId)||{};if(n.type==="blockage")return`
                <div class="appointment-list-card bg-red-50" style="border-left-color: ${d.border};">
                    <div class="time-info">
                        <p class="font-bold text-md">${r}</p>
                        <p class="text-xs text-gray-500">${i}</p>
                    </div>
                    <div class="details-info min-w-0">
                        <p class="font-bold text-red-800 truncate">${n.reason}</p>
                        <p class="text-sm text-gray-600 truncate">com ${n.professionalName}</p>
                    </div>
                    <div class="status-info">
                        <span class="status-badge bg-red-100 text-red-800">Bloqueio</span>
                    </div>
                </div>`;const l=n.status==="completed",c=l?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800",m=l?"Finalizado":"Aberto",u=JSON.stringify(n).replace(/'/g,"&apos;"),b=n.redeemedReward?.points>0,f=n.hasRewards&&!b,v=Ts(n.clientPhone,n.clientName,n.serviceName,n.professionalName,n.startTime);return`
            <div class="appointment-list-card" data-appointment='${u}' style="border-left-color: ${d.border};">
                
                <div class="time-info" data-action="open-comanda">
                    <p class="font-bold text-md">${r}</p>
                    <p class="text-xs text-gray-500">${i}</p>
                </div>

                <div class="details-info min-w-0" data-action="open-comanda">
                    <p class="font-bold text-gray-800 truncate">${f?"🎁 ":""}${n.clientName}</p>
                    <p class="text-sm text-gray-600 truncate">${n.serviceName}</p>
                    <p class="text-xs text-gray-500 truncate">com ${n.professionalName||"Indefinido"}</p>
                    
                    ${b?'<p class="text-xs font-semibold text-purple-600">Resgate de Prémio</p>':""}
                </div>

                <div class="status-info">
                    <span class="status-badge ${c} mb-1">${m}</span>
                    <div class="card-actions flex gap-1 items-center">
                        ${l?`
                            <button data-action="edit-appointment" data-appointment='${u}' class="action-btn opacity-40 cursor-not-allowed" title="Finalizado - Não editável" disabled><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `:`
                            <a href="${v}" target="_blank" class="action-btn text-green-500 hover:text-green-700 p-1" title="Enviar Confirmação WhatsApp">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.036 2a10 10 0 100 20 10 10 0 000-20zM17.5 14.8c-.24.125-1.465.716-1.696.804-.23.09-.49.135-.75.045-.26-.09-.982-.322-1.87-.965-.888-.643-1.474-1.442-1.64-1.748-.166-.307-.015-.467.106-.615.116-.149.23-.388.344-.582.113-.193.15-.327.1-.462-.05-.136-.264-.322-.544-.654-.28-.332-.572-.782-.828-.958-.255-.176-.438-.158-.61-.158-.173 0-.374-.022-.574-.022-.2 0-.54.075-.826.375-.285.3-.99.965-.99 2.355 0 1.43 1.018 2.872 1.16 3.072.14.2 2 3.047 4.86 4.218 2.86 1.17 2.86.786 3.376 1.054.516.268 1.49.462 1.696.406.206-.057 1.463-.615 1.67-.887.2-.27.2-.504.14-.615-.058-.11-.23-.166-.48-.306z"/></svg>
                            </a>
                            <button data-action="edit-appointment" data-appointment='${u}' class="action-btn" title="Editar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `}
                        <button data-action="delete-appointment" data-id="${n.id}" class="action-btn" title="Apagar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                </div>
            </div>`}).join("");t.innerHTML=`<div class="list-view-container">${a}</div>`}function Kt(){return window.innerWidth<768&&C.currentView==="week"?3:C.weekViewDays}function Ds(e){const t=document.getElementById("agenda-view"),a=["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],n=Ya(C.currentDate),o=Kt();let s=`<div class="grid divide-x divide-gray-200 min-h-[60vh]" style="grid-template-columns: repeat(${o}, minmax(0, 1fr));">`;for(let r=0;r<o;r++){const i=new Date(n);i.setDate(i.getDate()+r);const d=new Date,l=i.toDateString()===d.toDateString(),c=e.filter(u=>new Date(u.startTime).toDateString()===i.toDateString()).sort((u,b)=>new Date(u.startTime)-new Date(b.startTime));let m='<div class="p-1 space-y-2">';c.length>0?m+=c.map(u=>{const f=new Date(u.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),v=p.professionalColors.get(u.professionalId)||{bg:"#e5e7eb",border:"#9ca3af"};if(u.type==="blockage")return`
                        <div class="p-2 rounded-lg border-l-4 flex flex-col bg-red-100" style="border-left-color: ${v.border};">
                            <span class="font-bold text-xs text-red-900">${f}</span>
                            <div class="mt-1 min-w-0">
                                <p class="font-semibold text-sm text-red-800 truncate">${u.reason}</p>
                                <p class="text-xs text-red-600 truncate">com ${u.professionalName}</p>
                            </div>
                        </div>
                    `;const k=JSON.stringify(u).replace(/'/g,"&apos;"),$=u.redeemedReward?.points>0,S=u.hasRewards&&!$,w=u.status==="completed";return`
                    <div class="p-2 rounded-lg border-l-4 flex flex-col cursor-pointer" 
                         style="background-color: ${v.bg}; border-left-color: ${v.border};"
                         data-action="open-comanda" data-appointment='${k}'>
                        
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-xs text-gray-900">${f}</span>
                            ${w?'<span class="text-[10px] font-semibold bg-green-200 text-green-800 px-1 rounded-sm">OK</span>':""}
                        </div>

                        <div class="mt-1 min-w-0">
                            <p class="font-semibold text-sm text-gray-800 truncate">${S?"🎁 ":""}${u.clientName}</p>
                            <p class="text-xs text-gray-600 truncate">${u.serviceName}</p>
                            <p class="text-xs text-gray-500 truncate">com ${u.professionalName||"Indefinido"}</p>
                            ${$?'<p class="text-xs text-purple-600 truncate">Resgate</p>':""}
                        </div>
                        
                        </div>
                `}).join(""):m+='<div class="text-center text-xs text-gray-400 pt-4">Nenhum evento</div>',m+="</div>",s+=`
            <div class="flex flex-col">
                <div class="text-center py-2 border-b ${l?"bg-indigo-100 text-indigo-700":"bg-gray-50"}">
                    <p class="font-bold">${a[i.getDay()]}</p>
                    <p class="text-sm">${i.getDate()}/${i.getMonth()+1}</p>
                </div>
                <div class="flex-grow overflow-y-auto">${m}</div>
            </div>
        `}s+="</div>",t.innerHTML=s}function Ps(){const e=p.allEvents.filter(t=>C.selectedProfessionalId==="all"||t.professionalId===C.selectedProfessionalId);C.currentView==="list"?Ms(e):Ds(e)}async function G(){const e=document.getElementById("agenda-view");if(!e)return;e.innerHTML='<div class="loader mx-auto my-10"></div>';let t,a;const n=document.getElementById("weekRange");if(C.currentView==="list")t=new Date(C.currentDate),t.setHours(0,0,0,0),a=new Date(C.currentDate),a.setHours(23,59,59,999),n.textContent=Bs(t);else{const o=Kt();t=Ya(new Date(C.currentDate)),a=new Date(t),a.setDate(t.getDate()+(o-1)),a.setHours(23,59,59,999),n.textContent=`${t.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})} - ${a.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})}`}try{const o=await No(p.establishmentId,t.toISOString(),a.toISOString(),C.selectedProfessionalId==="all"?null:C.selectedProfessionalId),r=(await bt(p.establishmentId,t.toISOString(),a.toISOString(),C.selectedProfessionalId)).map(d=>{let l=d.professionalName;if(!l&&d.professionalId){const c=p.professionals?p.professionals.find(m=>m.id===d.professionalId):null;c&&(l=c.name)}return{...d,type:"blockage",professionalName:l||"Não identificado"}}),i=[...o.map(d=>({...d,type:"appointment"})),...r];if(p.allEvents=i,ut(),Ps(),C.scrollToAppointmentId){const d=document.querySelector(`[data-appointment*='"id":"${C.scrollToAppointmentId}"']`);d&&(d.scrollIntoView({behavior:"smooth",block:"center"}),d.style.transition="background-color 0.5s ease-in-out",d.style.backgroundColor="#e0e7ff",setTimeout(()=>{d.style.backgroundColor=""},2500)),C.scrollToAppointmentId=null}}catch(o){g("Erro na Agenda",`Não foi possível carregar a agenda: ${o.message}`,"error"),e.innerHTML='<div class="p-6 text-center text-red-600">Falha ao carregar dados.</div>'}}async function As(){try{const[e,t,a,n]=await Promise.all([p.professionals&&p.professionals.length>0?Promise.resolve(p.professionals):_(p.establishmentId),p.services&&p.services.length>0?Promise.resolve(p.services):Ie(p.establishmentId),Z.length>0?Promise.resolve(Z):We(p.establishmentId),je.enabled!==void 0?Promise.resolve(null):_e(p.establishmentId)]);(!p.professionals||p.professionals.length===0)&&(p.professionals=e||[]),(!p.services||p.services.length===0)&&(p.services=t||[]),Z.length===0&&(Z=a||[]),n&&(je=n.loyaltyProgram||{enabled:!1}),p.professionals.forEach((o,s)=>{p.professionalColors.set(o.id,qt[s%qt.length])}),ut()}catch(e){console.error("Erro ao popular filtros e dependências do modal:",e),g("Atenção","Não foi possível pré-carregar os dados para agendamento. A abertura do modal pode ser lenta.","error")}}function Nt(e){e<1||e>4||(x.step=e,Ft(null,!0))}function Xa(e,t){const a=t.classList.contains("selected"),n=x.data.selectedServiceIds.indexOf(e);a?(t.classList.remove("selected","border-blue-500"),n>-1&&x.data.selectedServiceIds.splice(n,1)):(t.classList.add("selected","border-blue-500"),x.data.selectedServiceIds.push(e))}function Qa(e,t){const a=document.querySelector(".professional-step-cards");if(!a)return;a.querySelectorAll(".professional-modal-card").forEach(o=>o.classList.remove("selected","border-blue-500")),t.classList.add("selected","border-blue-500");const n=ht.find(o=>o.id===e);x.data.professionalId=e,x.data.professionalName=n?n.name:"N/A"}function qs(e,t){const a=document.getElementById("availableTimesContainer");a&&(a.querySelectorAll(".time-slot-card").forEach(n=>n.classList.remove("selected")),t.classList.add("selected"),x.data.time=e)}async function va(){const e=document.getElementById("apptTotalDuration"),t=document.getElementById("availableTimesContainer");if(!e||!t)return;const a=x.data.professionalId,n=x.data.selectedServiceIds,o=document.getElementById("apptDate").value;x.data.date=o;const s=n.reduce((r,i)=>{const d=Je.find(l=>l.id===i);return r+(d?d.duration+(d.bufferTime||0):0)},0);if(e.textContent=`${s} min`,s===0||!a||!o){t.innerHTML='<p class="col-span-full text-center text-gray-500">Selecione serviço, profissional e data.</p>';return}t.innerHTML='<div class="loader mx-auto col-span-full"></div>';try{const r=n.join(","),i=await fetch(`${Ls}/api/availability?establishmentId=${p.establishmentId}&professionalId=${a}&serviceIds=${r}&date=${o}`);if(!i.ok)throw new Error("Falha na resposta da API de disponibilidade");let d=await i.json();const l=new Date;if(new Date(o+"T00:00:00").toDateString()===l.toDateString()){const m=l.getHours()*60+l.getMinutes();d=d.filter(u=>{const[b,f]=u.split(":").map(Number);return b*60+f>=m})}if(t.innerHTML="",d.length>0){if(d.forEach(m=>{const u=document.createElement("button");u.type="button",u.className=`time-slot-card p-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition ${x.data.time===m?"selected":""}`,u.textContent=m,u.addEventListener("click",()=>qs(m,u)),t.appendChild(u)}),x.data.time){const m=t.querySelector(`[data-action="time-slot"][data-time="${x.data.time}"]`);m&&m.classList.add("selected")}}else t.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum horário disponível.</p>'}catch{t.innerHTML='<p class="col-span-full text-center text-red-500">Erro ao buscar horários.</p>'}}function Ns(){const e=document.getElementById("loyaltyRewardsContainer");if(!e)return;const{clientHasRewards:t,clientLoyaltyPoints:a,redeemedReward:n}=x.data,{enabled:o,rewards:s,pointsPerCurrency:r}=je;if(!o||!t||!s||s.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");const i=s.filter(l=>a>=l.points);let d=`
        <h4 class="text-md font-semibold text-gray-700 mb-2">🎁 Prêmios Disponíveis (${a} pontos)</h4>
    `;i.length>0?(d+='<div class="space-y-2">',d+=i.map(l=>{const c=n?.reward===l.reward;return`
                <label class="flex items-center p-3 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="loyaltyReward" class="form-radio text-indigo-600" 
                           value="${l.reward}" 
                           data-points="${l.points}"
                           ${c?"checked":""}>
                    <span class="ml-3">
                        <span class="font-semibold text-gray-800">${l.reward}</span>
                        <span class="text-sm text-gray-600"> (-${l.points} pontos)</span>
                    </span>
                </label>
            `}).join(""),d+="</div>"):d+='<p class="text-sm text-gray-600">Pontos insuficientes para resgatar os prêmios disponíveis.</p>',e.innerHTML=d,e.querySelectorAll('input[name="loyaltyReward"]').forEach(l=>{l.addEventListener("change",c=>{c.target.checked&&(x.data.redeemedReward={reward:c.target.value,points:parseInt(c.target.dataset.points,10)})})}),e.insertAdjacentHTML("beforeend",`
        <label class="flex items-center p-3 mt-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
            <input type="radio" name="loyaltyReward" class="form-radio text-gray-400" 
                   value="none" 
                   ${n?"":"checked"}>
            <span class="ml-3 text-gray-600">Não resgatar prêmio agora</span>
        </label>
    `),e.querySelector('input[value="none"]').addEventListener("change",l=>{l.target.checked&&(x.data.redeemedReward=null)})}async function Fs(e){e.preventDefault();const t=e.target,a=t.querySelector('button[type="submit"]');if(!x.data.time||x.data.selectedServiceIds.length===0||!x.data.professionalId)return g("Erro de Validação","Por favor, selecione o horário, serviço(s) e profissional antes de confirmar.","error");a.disabled=!0,a.textContent="A confirmar...";const n=x.data.selectedServiceIds.map(l=>{const c=Je.find(m=>m.id===l);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[o,s]=x.data.time.split(":"),r=new Date(`${x.data.date}T${o}:${s}:00`),i={establishmentId:p.establishmentId,clientName:x.data.clientName,clientPhone:x.data.clientPhone,services:n,professionalId:x.data.professionalId,startTime:r.toISOString(),redeemedReward:x.data.redeemedReward},d=t.querySelector("#appointmentId").value;d&&(i.id=d);try{d?await Yt(d,i):await Ro(i),g(`Agendamento ${d?"atualizado":"criado"} com sucesso!`,"success"),document.getElementById("appointmentModal").style.display="none",G()}catch(l){g(l.message,"error")}finally{a.disabled=!1,a.textContent="Confirmar Agendamento"}}function Rs(e){return`
        <div class="client-search-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-blue-50 ${x.data.clientName===e.name&&x.data.clientPhone===e.phone?"selected border-blue-500":""}" 
             data-action="select-client" 
             data-client-name="${e.name}" 
             data-client-phone="${e.phone}">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">${e.name.charAt(0).toUpperCase()}</div>
                <div>
                    <p class="font-semibold text-gray-800">${e.name}</p>
                    <p class="text-sm text-gray-500">${e.phone}</p>
                </div>
            </div>
        </div>
    `}async function ha(e){const t=document.getElementById("clientSearchResults");if(!t)return;const a=e.toLowerCase().trim();if(a.length<3){t.innerHTML='<p class="text-sm text-gray-500">Digite pelo menos 3 caracteres para buscar clientes existentes.</p>';return}const n=Z.filter(o=>o.name.toLowerCase().includes(a)||o.phone.includes(a));if(n.length===0){t.innerHTML='<p class="text-sm text-gray-500">Nenhum cliente encontrado com este termo.</p>';return}t.innerHTML=n.map(Rs).join(""),t.querySelectorAll('[data-action="select-client"]').forEach(o=>{o.addEventListener("click",s=>{const r=o.dataset.clientName,i=o.dataset.clientPhone,d=Z.find(l=>l.phone===i&&l.name===r);if(x.data.clientName=r,x.data.clientPhone=i,d){const l=je,c=Math.min(...(l?.rewards||[]).map(m=>m.points));x.data.clientLoyaltyPoints=d.loyaltyPoints||0,x.data.clientHasRewards=l.enabled&&c!==1/0&&x.data.clientLoyaltyPoints>=c}else x.data.clientHasRewards=!1,x.data.clientLoyaltyPoints=0;document.getElementById("apptClientName").value=r,document.getElementById("apptClientPhone").value=i,document.querySelectorAll(".client-search-card").forEach(l=>l.classList.remove("selected","border-blue-500")),o.classList.add("selected","border-blue-500")})})}async function Hs(e){e.preventDefault();const t=document.getElementById("clientRegistrationForm"),a=t.querySelector('button[type="submit"]'),n={establishmentId:p.establishmentId,name:t.querySelector("#regClientName").value.trim(),email:t.querySelector("#regClientEmail").value.trim(),phone:t.querySelector("#regClientPhone").value.trim(),dobDay:t.querySelector("#regClientDobDay").value.trim(),dobMonth:t.querySelector("#regClientDobMonth").value.trim(),notes:t.querySelector("#regClientNotes").value.trim()};if(!n.name||!n.phone)return g("Erro de Validação","Nome e Telefone são obrigatórios.","error");a.disabled=!0,a.textContent="A salvar...";try{await Zt(n),Z.push({name:n.name,phone:n.phone,loyaltyPoints:0}),x.data.clientName=n.name,x.data.clientPhone=n.phone,x.data.clientHasRewards=!1,x.data.clientLoyaltyPoints=0,g("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",Nt(1)}catch(o){g(`Erro ao cadastrar cliente: ${o.message}`,"error")}finally{a.disabled=!1,a.textContent="Salvar"}}function js(){j({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("clientRegistrationForm");t&&t.addEventListener("submit",Hs)}function Os(){js()}function zs(e,t){const a=e?"Editar Agendamento":"Selecionar Cliente",n=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">1. Dados do Cliente</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="apptClientName" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="apptClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="Nome Completo" value="${x.data.clientName}">
                </div>
                <div>
                    <label for="apptClientPhone" class="block text-sm font-medium text-gray-700">Telemóvel</label>
                    <input type="tel" id="apptClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="(XX) XXXXX-XXXX" value="${x.data.clientPhone}">
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
    `;return{title:a,content:n}}function Vs(){const e="Selecionar Serviço",t=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">2. Serviços</h3>
             <div class="flex items-center gap-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
                 <input type="search" id="serviceSearchModalInput" placeholder="Buscar Serviço..." class="flex-grow p-3 pl-10 border rounded-lg">
            </div>
            
            <div id="apptServicesContainer" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-1">
                 ${Je.map(a=>{const n=x.data.selectedServiceIds.includes(a.id),o=a.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
                         <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${n?"selected border-blue-500":""}" data-service-id="${a.id}">
                             <div class="flex items-center">
                                 <img src="${o}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                                 <div class="flex-1">
                                     <p class="font-semibold text-sm text-gray-800">${a.name}</p>
                                     <p class="text-xs text-gray-500">R$ ${a.price.toFixed(2)} (${a.duration} min)</p>
                                 </div>
                             </div>
                         </div>`}).join("")}
            </div>
        </div>
        
        <footer class="p-5 border-t bg-gray-100 flex justify-between gap-3 flex-shrink-0">
            <button type="button" data-action="prev-step" data-current-step="2" class="py-3 px-6 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition shadow-sm">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="2" class="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">Avançar</button>
        </footer>
    `;return{title:e,content:t}}function Us(){const e="Selecionar Profissional",t=`
        <div class="p-5 space-y-6">
             <h3 class="text-xl font-bold text-gray-800">3. Profissional</h3>
             <div id="apptProfessionalContainer" class="mt-4 flex flex-wrap gap-3 max-h-48 overflow-y-auto p-1 professional-step-cards">
                 ${ht.map(a=>{const n=x.data.professionalId===a.id,o=a.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P";return`
                         <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${n?"selected border-blue-500":""}" data-professional-id="${a.id}">
                             <img src="${o}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                             <p class="text-xs font-semibold text-gray-800">${a.name.split(" ")[0]}</p>
                             <p class="text-[10px] text-gray-500">${a.specialty||"Profissional"}</p>
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
    `;return{title:e,content:t}}function _s(e){const t=e?"Confirmar Edição":"Data e Horário",a=new Date,n=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`,o=x.data.date||n,s=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">4. ${t}</h3>

            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 space-y-1">
                <p class="font-bold text-gray-800">${x.data.clientName}</p>
                <p class="text-sm text-gray-700">Serviços: ${x.data.selectedServiceIds.length} selecionado(s)</p>
                <p class="text-sm text-gray-700">Profissional: ${x.data.professionalName}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
                <div>
                    <label for="apptDate" class="block text-sm font-medium text-gray-700">Data</label>
                    <input type="date" id="apptDate" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" value="${o}">
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
    `;return{title:t,content:s}}function Ws(e){const t=document.getElementById("apptServicesContainer");if(!t)return;const a=e.toLowerCase(),n=Je.filter(o=>o.name.toLowerCase().includes(a));t.innerHTML=n.map(o=>{const s=x.data.selectedServiceIds.includes(o.id),r=o.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
            <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${s?"selected border-blue-500":""}" data-service-id="${o.id}">
                <div class="flex items-center">
                    <img src="${r}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-gray-800">${o.name}</p>
                        <p class="text-xs text-gray-500">R$ ${o.price.toFixed(2)} (${o.duration} min)</p>
                    </div>
                </div>
            </div>`}).join(""),t.querySelectorAll(".service-card").forEach(o=>{o.addEventListener("click",()=>Xa(o.dataset.serviceId,o))})}function Js(e){const t=document.getElementById("apptProfessionalContainer");if(!t)return;const a=e.toLowerCase(),n=ht.filter(o=>o.name.toLowerCase().includes(a));t.innerHTML=n.map(o=>{const s=x.data.professionalId===o.id,r=o.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P";return`
             <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${s?"selected border-blue-500":""}" data-professional-id="${o.id}">
                 <img src="${r}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                 <p class="text-xs font-semibold text-gray-800">${o.name.split(" ")[0]}</p>
                 <p class="text-[10px] text-gray-500">${o.specialty||"Profissional"}</p>
             </div>`}).join(""),t.querySelectorAll(".professional-modal-card").forEach(o=>{o.addEventListener("click",()=>Qa(o.dataset.professionalId,o))})}async function Ft(e=null,t=!1){const a=document.getElementById("appointmentModal");if(!t){const s=e?.startTime?new Date(e.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],r=e?.startTime?new Date(e.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null;x={step:1,data:{id:e?.id||null,clientName:e?.clientName||"",clientPhone:e?.clientPhone||"",selectedServiceIds:e?.services?.map(i=>i.id)||[],professionalId:e?.professionalId||null,professionalName:e?.professionalName||"",date:s,time:r,redeemedReward:e?.redeemedReward||null,clientHasRewards:e?.hasRewards||!1,clientLoyaltyPoints:0}}}if(!p.services||!p.professionals||!Z||je.enabled===void 0){g("Erro","Os dados da agenda ainda não foram carregados. Tente novamente em alguns segundos.","error");return}if(Je=p.services,ht=p.professionals.filter(s=>s.status==="active"),x.data.clientName&&x.data.clientPhone){const s=Z.find(r=>r.phone===x.data.clientPhone&&r.name===x.data.clientName);s&&(x.data.clientLoyaltyPoints=s.loyaltyPoints||0)}let n={title:"Erro",content:"<p>Etapa não encontrada.</p>"};switch(x.step){case 1:n=zs(e);break;case 2:n=Vs();break;case 3:n=Us();break;case 4:n=_s(e);break}a.innerHTML=`
        <div class="modal-content max-w-4xl p-0 rounded-xl overflow-hidden shadow-2xl">
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${n.title}</h2>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>
            </header>
            
            <form id="appointmentForm" class="flex flex-col h-full">
                <input type="hidden" id="appointmentId" value="${x.data.id||""}">
                <input type="hidden" id="selectedTime" value="${x.data.time||""}">
                
                <div class="flex-1 overflow-y-auto" style="max-height: 80vh;">
                    ${n.content}
                </div>
                
            </form>
        </div>`,a.querySelectorAll('[data-action="next-step"]').forEach(s=>{s.addEventListener("click",()=>{const r=parseInt(s.dataset.currentStep,10);if(r===1){const i=a.querySelector("#apptClientName"),d=a.querySelector("#apptClientPhone");if(x.data.clientName=i.value.trim(),x.data.clientPhone=d.value.trim(),!x.data.clientName||!x.data.clientPhone)return g("Atenção","Nome e telefone do cliente são obrigatórios.","error")}else if(r===2){if(x.data.selectedServiceIds.length===0)return g("Atenção","Selecione pelo menos um serviço.","error")}else if(r===3&&!x.data.professionalId)return g("Atenção","Selecione um profissional.","error");Nt(r+1)})}),a.querySelectorAll('[data-action="prev-step"]').forEach(s=>{s.addEventListener("click",()=>Nt(parseInt(s.dataset.currentStep,10)-1))});const o=a.querySelector("#appointmentForm");if(x.step===4&&o&&o.addEventListener("submit",Fs),a.style.display="flex",x.step===2){a.querySelector("#apptServicesContainer").querySelectorAll(".service-card").forEach(i=>{i.addEventListener("click",()=>Xa(i.dataset.serviceId,i))});const r=a.querySelector("#serviceSearchModalInput");r&&r.addEventListener("input",i=>Ws(i.target.value))}if(x.step===3){a.querySelector("#apptProfessionalContainer").querySelectorAll(".professional-modal-card").forEach(i=>{i.addEventListener("click",()=>Qa(i.dataset.professionalId,i))});const r=a.querySelector("#professionalSearchModalInput");r&&r.addEventListener("input",i=>Js(i.target.value))}if(x.step===1){const s=a.querySelector("#clientSearchInput");s&&(s.addEventListener("input",i=>ha(i.target.value)),x.data.clientName&&x.data.clientPhone&&ha(`${x.data.clientName} ${x.data.clientPhone}`));const r=a.querySelector('[data-action="open-client-registration"]');r&&r.addEventListener("click",Os)}if(x.step===4){const s=a.querySelector("#apptDate");s&&s.addEventListener("change",va),va(),Ns()}}async function Za(e={}){C.currentDate=e.targetDate?new Date(e.targetDate):C.currentDate||new Date,C.scrollToAppointmentId=e.scrollToAppointmentId||null,C.profSearchTerm="",window.innerWidth<768&&(C.currentView="list"),fa.innerHTML=`
        <section>
            <div class="bg-white p-4 rounded-xl shadow-lg mb-4">
                
                <div class="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between sm:items-center mb-4 gap-4">
                    <span id="weekRange" class="font-semibold text-lg w-full text-left sm:text-right sm:flex-grow order-1 sm:order-2"></span>
                    <div class="flex flex-wrap items-center gap-2 order-2 sm:order-1">
                        <div class="flex items-center gap-1 rounded-lg bg-gray-200 p-1">
                            <button data-view="list" class="view-btn ${C.currentView==="list"?"active":""}">Lista</button>
                            <button data-view="week" class="view-btn ${C.currentView==="week"?"active":""}">Semana</button>
                        </div>
                        <div id="week-days-toggle" class="${C.currentView==="week"?"flex":"hidden"} items-center gap-1 rounded-lg bg-gray-200 p-1">
                            <button data-days="3" class="week-days-btn view-btn">3 dias</button>
                            <button data-days="5" class="week-days-btn view-btn hidden sm:block">5 dias</button>
                            <button data-days="7" class="week-days-btn view-btn active hidden sm:block">7 dias</button>
                        </div>
                        <div class="flex items-center gap-2">
                            <button id="todayBtn" class="p-2 border rounded-md shadow-sm font-semibold">Hoje</button>
                            <button id="prevBtn" data-amount="-1" class="p-2 border rounded-md shadow-sm"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button>
                            <button id="nextBtn" data-amount="1" class="p-2 border rounded-md shadow-sm"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button>
                        </div>
                    </div>
                </div>
                
                <div class="border-t border-gray-200 -mx-4 mb-4"></div>

                <div>
                     <div class="prof-search-bar flex flex-col sm:flex-row sm:items-center gap-4">
                         <input type="search" id="profSearchInput" placeholder="Pesquisar profissional por nome..." class="w-full sm:flex-grow p-2 border rounded-md shadow-sm">
                         <label class="flex items-center space-x-2 cursor-pointer flex-shrink-0 self-start sm:self-center">
                             <div class="relative">
                                 <input type="checkbox" id="showInactiveProfsToggle" class="sr-only">
                                 <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                             </div>
                             <span class="text-sm font-medium text-gray-700">Inativos</span>
                         </label>
                     </div>
                     
                     <div id="profSelectorContainer" class="prof-selector-container mt-2">
                     <div class="loader mx-auto"></div>
                     </div>
                </div>

            </div> <div id="agenda-view" class="bg-white rounded-xl shadow-lg overflow-hidden"></div>
            
            <button data-action="new-appointment" class="fixed bottom-4 right-4 sm:bottom-10 sm:right-10 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:bg-indigo-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </section>`,document.querySelectorAll(".view-btn[data-view]").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".view-btn[data-view]").forEach(o=>o.classList.remove("active")),a.classList.add("active"),C.currentView=a.dataset.view;const n=document.getElementById("week-days-toggle");if(C.currentView==="week"){if(n.style.display="flex",window.innerWidth<768){C.weekViewDays=3,document.querySelectorAll(".week-days-btn").forEach(s=>s.classList.remove("active"));const o=document.querySelector('.week-days-btn[data-days="3"]');o&&o.classList.add("active")}}else n.style.display="none";G()})}),document.querySelectorAll(".week-days-btn").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".week-days-btn").forEach(n=>n.classList.remove("active")),a.classList.add("active"),C.weekViewDays=parseInt(a.dataset.days,10),G()})}),document.getElementById("todayBtn").addEventListener("click",()=>{C.currentDate=new Date,G()});const t=a=>{const n=parseInt(a.currentTarget.dataset.amount,10),o=C.currentView==="week"?Kt():1,s=new Date(C.currentDate);s.setDate(s.getDate()+n*o),C.currentDate=s,G()};document.getElementById("prevBtn").addEventListener("click",t),document.getElementById("nextBtn").addEventListener("click",t),document.getElementById("profSearchInput").addEventListener("input",a=>{C.profSearchTerm=a.target.value,ut()}),document.getElementById("showInactiveProfsToggle").addEventListener("change",a=>{C.showInactiveProfs=a.target.checked,ut(),G()}),ba||(fa.addEventListener("click",async a=>{const n=a.target.closest("[data-action]");if(a.target.closest('[data-action="select-professional"]')){const d=a.target.closest('[data-action="select-professional"]').dataset.profId,l=C.selectedProfessionalId===d&&d!=="all";if(C.selectedProfessionalId=l?"all":d,d!=="all"){const c=document.getElementById("profSearchInput");c&&(c.value=""),C.profSearchTerm=""}await G();return}if(!n)return;const o=n.dataset.action;let s=null;const r=a.target.closest("[data-appointment]");switch(r&&(s=JSON.parse(r.dataset.appointment.replace(/&apos;/g,"'"))),o){case"new-appointment":Ft();break;case"edit-appointment":if(!s)return;if(s.status==="completed"){g("Atenção","Agendamentos finalizados não podem ser editados.","error");return}s.hasRewards&&!s.redeemedReward&&g("🎁 Cliente com Prêmios!","Este cliente tem pontos para resgatar. Verifique a Etapa 4 do agendamento.","info"),Ft(s);break;case"delete-appointment":{const i=n.dataset.id;if(await T("Confirmar Exclusão","Tem a certeza que deseja apagar este agendamento?"))try{await Ho(i),g("Agendamento apagado!","success"),G()}catch(l){g(`Não foi possível apagar: ${l.message}`,"error")}break}case"open-comanda":if(s){s.hasRewards&&!s.redeemedReward&&s.status!=="completed"&&g("🎁 Cliente com Prêmios!","Este cliente tem pontos de fidelidade para resgatar.","info");const i=s.status==="completed"?"finalizadas":"em-atendimento",d={selectedAppointmentId:s.id,initialFilter:i};i==="finalizadas"&&(d.filterDate=s.startTime),F("comandas-section",d)}break}}),ba=!0),await As(),await G()}const Gs=e=>y(`/api/comandas/${e}`),Ys=e=>y("/api/sales",{method:"POST",body:JSON.stringify(e)}),Xs=e=>y(`/api/sales/${e}/reopen`,{method:"POST"}),Qs=e=>y(`/api/sales/${e}`,{method:"DELETE"}),ea=e=>y(`/api/products/${e}`),Zs=e=>y("/api/products",{method:"POST",body:JSON.stringify(e)}),Ks=(e,t)=>y(`/api/products/${e}`,{method:"PUT",body:JSON.stringify(t)}),en=e=>y(`/api/products/${e}`,{method:"DELETE"}),tn=(e,t)=>y(`/api/products/${e}/stock`,{method:"PATCH",body:JSON.stringify(t)}),an=({startDate:e,endDate:t,productId:a,categoryId:n})=>{const o=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&o.append("productId",a),n&&n!=="all"&&o.append("categoryId",n),y(`/api/products/stock-history/report?${o.toString()}`)},Ka=()=>y("/api/cashier/status").catch(e=>{if(e.message.includes("404")||e.message.includes("não encontrada"))return null;throw e}),on=e=>{const t={establishmentId:e.establishmentId,initialAmount:Number(e.initialAmount),notes:e.notes||""};return console.log("Payload enviado para abrir caixa:",t),y("/api/cashier/open",{method:"POST",body:JSON.stringify(t)})},sn=(e,t)=>{const a={finalAmount:Number(t)};return console.log("Payload enviado para fechar caixa:",a),y(`/api/cashier/close/${e}`,{method:"PUT",body:JSON.stringify(a)})},nn=()=>y("/api/cashier/history").then(e=>e||[]).catch(e=>(console.error("Erro ao buscar histórico:",e),[])),rn=e=>y(`/api/cashier/report/${e}`),eo=e=>y(`/api/packages/${e}`),ln=e=>y("/api/packages",{method:"POST",body:JSON.stringify(e)}),dn=(e,t)=>y(`/api/packages/${e}`,{method:"PUT",body:JSON.stringify(t)}),cn=e=>y(`/api/packages/${e}`,{method:"DELETE"});let h={allComandas:[],catalog:{services:[],products:[],packages:[]},clients:[],activeFilter:"atendimento",selectedComandaId:null,isCashierOpen:!1,activeCashierSessionId:null,paging:{page:1,limit:12,total:0}},fe=null,be=null;function mn(){const e=document.getElementById("comandas-layout");if(e){e.classList.add("detail-view-active");const t=document.getElementById("comanda-detail-container");t&&(t.scrollTop=0)}}function ce(){const e=document.getElementById("comandas-layout");e&&e.classList.remove("detail-view-active")}function un(){const e=new Date().toISOString().split("T")[0];be.innerHTML=`
        <section class="h-full flex flex-col">
            <div class="flex flex-wrap justify-between items-center mb-4 gap-4 px-1">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Ponto de Venda</h2>
                <div id="cashier-controls" class="flex items-center gap-2"></div>
            </div>

            ${h.isCashierOpen?"":`
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
                    <div class="flex">
                        <div class="flex-shrink-0">⚠️</div>
                        <div class="ml-3">
                            <p class="text-sm text-yellow-700">
                                <strong>Caixa Fechado!</strong> Abra o caixa para realizar vendas.
                            </p>
                        </div>
                    </div>
                </div>
            `}

            <div id="comandas-layout">
                
                <div id="comandas-list-column">
                    <div class="p-4 pb-2 sticky top-0 bg-white z-10 border-b border-gray-100">
                        <button 
                            data-action="new-sale" 
                            class="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md flex items-center justify-center gap-2 mb-3 ${h.isCashierOpen?"":"opacity-50 cursor-not-allowed"}"
                            ${h.isCashierOpen?"":"disabled"}
                        >
                            <span>+</span> NOVA VENDA
                        </button>
                        
                        <div class="flex bg-gray-100 rounded-lg p-1">
                            <button data-filter="atendimento" class="filter-btn flex-1 text-sm font-medium py-2 rounded-md transition-all">Em Aberto</button>
                            <button data-filter="finalizadas" class="filter-btn flex-1 text-sm font-medium py-2 rounded-md transition-all">Finalizadas</button>
                        </div>
                    </div>

                    <div id="finalizadas-datepicker" class="hidden px-4 py-2 bg-gray-50 border-b">
                        <label for="filter-date" class="text-xs font-semibold text-gray-500 uppercase">Data:</label>
                        <input type="date" id="filter-date" value="${e}" class="w-full mt-1 p-2 border rounded-md bg-white text-sm">
                    </div>

                    <div id="comandas-list" class="p-3 space-y-2 pb-20">
                        <div class="loader mx-auto mt-10"></div>
                    </div>
                </div>

                <div id="comanda-detail-container">
                    <div class="hidden lg:flex flex-col items-center justify-center h-full text-center text-gray-400">
                        <p>Selecione uma venda para ver os detalhes</p>
                    </div>
                </div>

            </div>
        </section>
    `}function pn(){const e=document.getElementById("cashier-controls");e&&(h.isCashierOpen?e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-green-700 bg-green-100 py-1 px-3 rounded-full">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-2 px-4 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 text-sm">Fechar Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm">Relatório</button>
        `:e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-red-700 bg-red-100 py-1 px-3 rounded-full">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-sm">Abrir Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm">Relatório</button>
        `)}function re(){const e=document.getElementById("comandas-list");if(!e)return;if(!h.isCashierOpen&&h.activeFilter==="atendimento"){e.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `;return}const a={atendimento:"confirmed",finalizadas:"completed"}[h.activeFilter],n=h.allComandas.filter(o=>o.status===a);if(n.length===0){e.innerHTML='<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda encontrada.</p>',ya(e);return}e.innerHTML=n.map(o=>{const r=[...o.services||[],...o.comandaItems||[],...o.items||[]].reduce((m,u)=>m+(u.price||0),0),i=o.id===h.selectedComandaId,d=new Date(o.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),c=o.type==="walk-in"||o.id.startsWith("temp-")?'<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">Avulso</span>':'<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">Agendado</span>';return`
            <div data-action="select-comanda" data-comanda-id="${o.id}" 
                 class="comanda-card cursor-pointer ${i?"selected":""}">
                
                <div class="flex justify-between items-start mb-1">
                    <p class="font-bold text-gray-800 truncate max-w-[70%]">${o.clientName}</p>
                    <p class="font-bold text-gray-900">R$ ${r.toFixed(2)}</p>
                </div>
                
                <div class="flex justify-between items-center mt-1">
                    <div class="flex items-center gap-2">
                        ${c}
                        <p class="text-xs text-gray-500 truncate max-w-[100px]">${o.professionalName}</p>
                    </div>
                    <p class="text-xs text-gray-400 font-medium">${d}</p> 
                </div>
            </div>
        `}).join(""),ya(e)}function ya(e){const{page:t,total:a,limit:n}=h.paging,o=Math.ceil((a||0)/n);if(o<=1)return;let s='<div class="flex gap-2 justify-center mt-4 flex-wrap pb-4">';t>1&&(s+=`<button data-page="${t-1}" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">&laquo;</button>`);for(let r=1;r<=o;r++)r===1||r===o||r>=t-2&&r<=t+2?s+=`<button data-page="${r}" class="px-3 py-1 rounded text-sm ${r===t?"bg-indigo-600 text-white font-bold":"bg-gray-200 hover:bg-gray-300"}">${r}</button>`:(r===t-3||r===t+3)&&(s+='<span class="px-2 text-gray-400">...</span>');t<o&&(s+=`<button data-page="${t+1}" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">&raquo;</button>`),s+="</div>",e.innerHTML+=s,e.querySelectorAll("button[data-page]").forEach(r=>{r.onclick=i=>{i.stopPropagation(),h.paging.page=parseInt(r.dataset.page,10),X()}})}function U(){const e=document.getElementById("comanda-detail-container");if(!e)return;const t=`
        <div class="mobile-only-header">
            <button data-action="back-to-list" class="btn-back-mobile">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h3 class="font-bold text-lg text-gray-800 ml-2">Detalhes</h3>
        </div>
    `;if(!h.isCashierOpen){e.innerHTML=`
            ${t}
            <div class="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
                <div class="bg-gray-100 p-4 rounded-full mb-4">🔒</div>
                <p class="font-semibold text-lg">Caixa Fechado</p>
                <p class="text-sm mb-6">Abra o caixa para ver detalhes.</p>
                <button data-action="open-cashier" class="py-2 px-6 bg-green-600 text-white font-bold rounded-lg">Abrir Caixa</button>
            </div>
        `;return}const a=h.allComandas.find(l=>l.id===h.selectedComandaId);if(!a){e.innerHTML=`
            <div class="hidden lg:flex flex-col items-center justify-center h-full text-center text-gray-400">
                <svg class="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
                <p class="text-lg font-medium">Selecione uma venda</p>
                <p class="text-sm">Toque em um item à esquerda para ver os detalhes</p>
            </div>
        `;return}const n=[...a.services||[],...a.comandaItems||[],...a.items||[]],o=a.status==="completed",s=a.type==="walk-in"||a.id.startsWith("temp-"),r=s?"":`<button data-action="go-to-appointment" data-id="${a.id}" data-date="${a.startTime}" 
                class="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1 mt-1">
             Ir para Agendamento <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
           </button>`,i=n.reduce((l,c)=>{const m=`${c.type}-${c.id||c.name}`;if(!l[m]){const u=(a.services||[]).some(b=>b.id===c.id&&b.name===c.name);l[m]={...c,quantity:0,isOriginalService:u&&c.type==="service"}}return l[m].quantity+=1,l},{}),d=Object.values(i).reduce((l,c)=>l+(c.price||0)*c.quantity,0);e.innerHTML=`
        ${t} <div class="flex-grow overflow-y-auto p-4">
            <div class="flex justify-between items-start mb-6 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800 truncate max-w-[200px]">${a.clientName}</h3>
                    <p class="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        ${a.professionalName}
                    </p>
                    ${s?'<span class="mt-2 inline-block px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-md">Venda Avulsa</span>':r}
                </div>
                <div class="flex gap-2">
                    ${o?`<button data-action="reopen-${a.type}" data-id="${a.id}" class="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200" title="Reabrir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>`:""}
                    ${s&&!o?`<button data-action="delete-walk-in" data-id="${a.id}" class="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200" title="Excluir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`:""}
                </div>
            </div>

            <div class="space-y-3">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Itens do Pedido</h4>
                ${Object.values(i).map(l=>`
                    <div class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div class="flex items-center gap-3">
                            <span class="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg">
                                ${l.quantity}x
                            </span>
                            <div>
                                <p class="text-sm font-semibold text-gray-800 line-clamp-1">${l.name}</p>
                                <p class="text-xs text-gray-500">R$ ${(l.price||0).toFixed(2)} un.</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-gray-900">R$ ${(l.price*l.quantity).toFixed(2)}</span>
                            ${o?"":`<button data-action="remove-item" data-item-id="${l.id}" data-item-type="${l.type}" class="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`}
                        </div>
                    </div>
                `).join("")}
                
                ${Object.keys(i).length===0?'<div class="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg text-sm">Nenhum item adicionado</div>':""}
            </div>
        </div>

        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div class="flex justify-between items-end mb-4">
                <span class="text-sm text-gray-500 font-medium">Total a Pagar</span>
                <span class="text-3xl font-extrabold text-gray-900">R$ ${d.toFixed(2)}</span>
            </div>
            
            ${o?`
                <div class="bg-green-50 text-green-700 text-center py-3 rounded-xl font-bold border border-green-200 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Venda Finalizada
                </div>
            `:`
                <div class="grid grid-cols-2 gap-3">
                    <button data-action="add-item" class="py-3.5 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition border border-blue-200">
                        + ADICIONAR
                    </button>
                    <button data-action="checkout" class="py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200">
                        RECEBER
                    </button>
                </div>`}
        </footer>
    `}function gn(){j({title:"Cadastrar Novo Cliente",contentHTML:`
        <form id="comandas_clientRegistrationForm" class="flex flex-col h-full">
            <div class="flex-1 overflow-y-auto p-5 space-y-6" style="max-height: 80vh;">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="regClientName" class="block text-sm font-medium text-gray-700">Nome</label>
                        <input type="text" id="regClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm">
                    </div>
                    <div>
                        <label for="regClientPhone" class="block text-sm font-medium text-gray-700">Telefone</label>
                        <input type="tel" id="regClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm">
                    </div>
                    <div>
                        <label for="regClientEmail" class="block text-sm font-medium text-gray-700">E-mail (Opcional)</label>
                        <input type="email" id="regClientEmail" class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm">
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label for="regClientDobDay" class="block text-sm font-medium text-gray-700">Dia Nasc.</label>
                            <input type="number" id="regClientDobDay" min="1" max="31" class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm">
                        </div>
                        <div>
                            <label for="regClientDobMonth" class="block text-sm font-medium text-gray-700">Mês Nasc.</label>
                            <input type="number" id="regClientDobMonth" min="1" max="12" class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm">
                        </div>
                    </div>
                </div>
                <div>
                    <label for="regClientNotes" class="block text-sm font-medium text-gray-700">Observações</label>
                    <textarea id="regClientNotes" rows="3" class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></textarea>
                </div>
            </div>
            
            <footer class="p-5 border-t bg-gray-100 flex justify-end gap-3 flex-shrink-0">
                <button type="button" data-action="close-modal" data-target="genericModal" class="py-3 px-6 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition shadow-sm">Cancelar</button>
                <button type="submit" class="py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md">Salvar Cliente</button>
            </footer>
        </form>
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("comandas_clientRegistrationForm");t&&t.addEventListener("submit",fn)}async function fn(e){e.preventDefault();const t=document.getElementById("comandas_clientRegistrationForm");if(!t)return;const a=t.querySelector('button[type="submit"]'),n={establishmentId:p.establishmentId,name:t.querySelector("#regClientName").value.trim(),email:t.querySelector("#regClientEmail").value.trim()||null,phone:t.querySelector("#regClientPhone").value.trim(),dob:`${t.querySelector("#regClientDobDay").value.trim()}/${t.querySelector("#regClientDobMonth").value.trim()}`,notes:t.querySelector("#regClientNotes").value.trim()||null};if(!n.name||!n.phone)return g("Erro de Validação","Nome e Telefone são obrigatórios.","error");a.disabled=!0,a.textContent="A salvar...";try{const o=await Zt(n);h.clients.push({id:o.id,...n}),g("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",to(o.id)}catch(o){g(`Erro ao cadastrar cliente: ${o.message}`,"error")}finally{a.disabled=!1,a.textContent="Salvar Cliente"}}function bn(){if(!h.isCashierOpen){g("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");return}const{modalElement:e,close:t}=j({title:"Adicionar Item à Comanda",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-4xl"}),a=()=>{let o="";const s=e.querySelector("#add-item-content"),r={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',package:'<svg class="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'},i=()=>{const d=o.toLowerCase(),l=m=>m.filter(u=>u.name.toLowerCase().includes(d)),c={"modal-service-list":{items:l(h.catalog.services),type:"service"},"modal-product-list":{items:l(h.catalog.products),type:"product"},"modal-package-list":{items:l(h.catalog.packages),type:"package"}};for(const[m,{items:u,type:b}]of Object.entries(c)){const f=s.querySelector(`#${m}`);f&&(f.innerHTML=u.map(v=>`
                        <button data-action="select-item-for-quantity" data-item-type="${b}" data-item-id="${v.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${r[b]}</div>
                            <span class="flex-grow text-left min-w-0 truncate">${v.name}</span>
                            <span class="font-semibold flex-shrink-0">R$ ${v.price.toFixed(2)}</span>
                        </button>
                    `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum item.</p>')}};s.innerHTML=`
            <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 mb-4 border rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-purple-600">Pacotes</h4><div id="modal-package-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
            </div>`,i(),s.querySelector("#item-search-input").addEventListener("input",d=>{o=d.target.value,i()})},n=o=>{let s=1;const r=e.querySelector("#add-item-content"),i=()=>{document.getElementById("quantity-display").textContent=s,document.getElementById("quantity-minus-btn").disabled=s<=1};r.innerHTML=`
            <div class="text-center p-8 relative">
                <button data-action="back-to-catalog" class="absolute top-5 left-5 text-gray-600 hover:text-gray-900">&larr; Voltar</button>
                <h3 class="font-bold text-2xl text-gray-800">${o.name}</h3>
                <p class="text-lg text-gray-500">R$ ${o.price.toFixed(2)}</p>
                <div class="my-8 flex items-center justify-center gap-4">
                    <button id="quantity-minus-btn" class="w-12 h-12 rounded-full bg-gray-200 text-3xl font-bold text-gray-600 hover:bg-gray-300">-</button>
                    <span id="quantity-display" class="text-4xl font-bold w-20 text-center">${s}</span>
                    <button id="quantity-plus-btn" class="w-12 h-12 rounded-full bg-gray-200 text-3xl font-bold text-gray-600 hover:bg-gray-300">+</button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Adicionar à Comanda</button>
            </div>
        `,document.getElementById("quantity-minus-btn").onclick=()=>{s>1&&(s--,i())},document.getElementById("quantity-plus-btn").onclick=()=>{s++,i()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await wn(o,s),t()}};e.addEventListener("click",o=>{const s=o.target.closest('[data-action="select-item-for-quantity"]'),r=o.target.closest('[data-action="back-to-catalog"]');if(s){const{itemType:i,itemId:d}=s.dataset,c=(h.catalog[i+"s"]||[]).find(m=>m.id===d);c&&n({...c,type:i})}else r&&a()}),a()}async function to(e=null){if(!h.isCashierOpen){g("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");return}if(!h.clients||h.clients.length===0)try{h.clients=await We(p.establishmentId)}catch{g("Erro","Não foi possível carregar dados de clientes.","error");return}if(!p.professionals||p.professionals.length===0)try{p.professionals=await _(p.establishmentId)}catch{g("Erro","Não foi possível carregar dados de profissionais.","error");return}const t=h.clients.map(r=>{const i=r.id===e?"selected":"";return`<option value="${r.id}" ${i}>${r.name} - ${r.phone}</option>`}).join(""),a=p.professionals.map(r=>`<option value="${r.id}">${r.name}</option>`).join(""),n=`
        <form id="new-sale-form" class="space-y-4">
            <div>
                <label for="new-sale-client" class="block text-sm font-medium text-gray-700">Cliente</label>
                <select id="new-sale-client" required class="mt-1 w-full p-2 border rounded-md bg-white">
                    <option value="">Selecione um cliente...</option>
                    ${t}
                </select>
                <button type="button" data-action="new-client-from-sale" class="text-sm text-blue-600 hover:underline mt-1">ou Cadastrar Novo Cliente</button>
            </div>
            <div>
                <label for="new-sale-professional" class="block text-sm font-medium text-gray-700">Profissional Responsável</label>
                <select id="new-sale-professional" required class="mt-1 w-full p-2 border rounded-md bg-white">
                    <option value="">Selecione um profissional...</option>
                    ${a}
                </select>
            </div>
             <div class="pt-4 border-t">
                <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">Iniciar Venda</button>
            </div>
        </form>
    `,{modalElement:o}=j({title:"Nova Venda Avulsa",contentHTML:n,maxWidth:"max-w-md"});o.querySelector("#new-sale-form").addEventListener("submit",Sn);const s=o.querySelector('[data-action="new-client-from-sale"]');s&&s.addEventListener("click",r=>{r.preventDefault(),o.style.display="none",gn()})}function vn(){if(!h.isCashierOpen){g("Caixa Fechado","Abra o caixa antes de finalizar pagamentos.","error");return}const e=h.allComandas.find(l=>l.id===h.selectedComandaId);if(!e)return;const a=[...e.services||[],...e.comandaItems||[],...e.items||[]].reduce((l,c)=>l+(c.price||0),0);let n=[],o={remainingAmount:a,selectedMethod:"dinheiro",installments:1,amountReceived:""};const s=()=>{const l=document.getElementById("payment-list"),c=document.getElementById("remaining-amount"),m=document.getElementById("finalize-checkout-btn"),u=document.getElementById("change-container"),b=document.getElementById("installments-container"),f=document.getElementById("payment-value"),v=document.getElementById("payment-controls"),k=n.reduce((S,w)=>S+w.value,0);o.remainingAmount=a-k,l.innerHTML=n.map((S,w)=>`
            <div class="flex justify-between items-center bg-gray-100 p-2 rounded-md animate-fade-in-fast">
                <span class="font-medium text-sm">${S.method.charAt(0).toUpperCase()+S.method.slice(1)} ${S.installments>1?`(${S.installments}x)`:""}</span>
                <div class="flex items-center gap-2">
                    <span class="font-semibold">R$ ${S.value.toFixed(2)}</span>
                    <button data-action="remove-payment" data-payment-index="${w}" class="text-red-500 font-bold">&times;</button>
                </div>
            </div>`).join(""),o.remainingAmount<=.001?(c.textContent="Total Pago!",c.className="text-lg font-bold text-center mb-4 text-green-600",f.value="",m.disabled=!1,v&&(v.style.display="none")):(c.textContent=`Faltam: R$ ${o.remainingAmount.toFixed(2)}`,c.className="text-lg font-bold text-center mb-4 text-red-600",f.value=o.remainingAmount.toFixed(2),m.disabled=!0,v&&(v.style.display="block")),document.querySelectorAll(".payment-method-btn").forEach(S=>{S.classList.toggle("ring-2",S.dataset.method===o.selectedMethod),S.classList.toggle("ring-offset-2",S.dataset.method===o.selectedMethod)}),b.style.display=["credito","crediario"].includes(o.selectedMethod)?"block":"none",u.style.display=o.selectedMethod==="dinheiro"&&o.remainingAmount>0?"block":"none";const $=parseFloat(o.amountReceived)-o.remainingAmount;document.getElementById("change-value").textContent=`R$ ${$>0?$.toFixed(2):"0.00"}`},r=()=>{const l=document.getElementById("payment-value");let c=parseFloat(l.value);if(isNaN(c)||c<=0){g("Valor Inválido","Insira um valor de pagamento válido e maior que zero.","error");return}if(c>o.remainingAmount+.001){g("Valor Inválido","O valor excede o saldo restante.","error");return}const m={method:o.selectedMethod,value:c};["credito","crediario"].includes(o.selectedMethod)&&o.installments>1&&(m.installments=o.installments),n.push(m),o.selectedMethod="dinheiro",o.installments=1,document.getElementById("installments-select").value=1,s()},i=`
        <div class="text-center mb-4">
            <p class="text-lg text-gray-600">Valor Total</p>
            <p class="text-4xl font-bold text-gray-800 my-2">R$ ${a.toFixed(2)}</p>
        </div>
        <div id="payment-list" class="space-y-2 mb-4"></div>
        <div id="remaining-amount"></div>
        
        <div id="payment-controls" class="space-y-4 border-t pt-4">
            <div class="grid grid-cols-3 gap-1">
                <button data-method="dinheiro" class="payment-method-btn flex flex-col items-center p-1 rounded-lg border-2 border-green-400 bg-green-50 ring-green-500">
                    <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span class="text-[11px] mt-0.5 font-semibold">Dinheiro</span>
                </button>
                <button data-method="pix" class="payment-method-btn flex flex-col items-center p-1 rounded-lg border-2 border-cyan-400 bg-cyan-50 ring-cyan-500">
                    <svg class="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <span class="text-[11px] mt-0.5 font-semibold">PIX</span>
                </button>
                <button data-method="debito" class="payment-method-btn flex flex-col items-center p-1 rounded-lg border-2 border-blue-400 bg-blue-50 ring-blue-500">
                    <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    <span class="text-[11px] mt-0.5 font-semibold">Débito</span>
                </button>
                <button data-method="credito" class="payment-method-btn flex flex-col items-center p-1 rounded-lg border-2 border-purple-400 bg-purple-50 ring-purple-500">
                    <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    <span class="text-[11px] mt-0.5 font-semibold">Crédito</span>
                </button>
                <button data-method="crediario" class="payment-method-btn flex flex-col items-center p-1 rounded-lg border-2 border-orange-400 bg-orange-50 ring-orange-500">
                    <svg class="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <span class="text-[11px] mt-0.5 font-semibold">Fiado</span>
                </button>
            </div>
            <div id="installments-container" class="hidden"><label class="text-sm font-medium">Parcelas</label><select id="installments-select" class="w-full p-2 border rounded-md bg-white mt-1">${Array.from({length:12},(l,c)=>`<option value="${c+1}">${c+1}x</option>`).join("")}</select></div>
            <div class="flex items-end gap-2">
                <div class="flex-grow"><label class="text-sm font-medium">Valor a Adicionar</label><input type="number" step="0.01" id="payment-value" class="w-full p-2 border rounded-md text-lg font-bold"></div>
                <button id="add-payment-btn" class="py-2 px-4 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800">Adicionar</button>
            </div>
            <div id="change-container" class="hidden mt-2 p-3 bg-blue-50 rounded-lg"><label class="text-sm">Valor Recebido</label><input type="number" id="amount-received" class="w-full p-2 border rounded-md text-lg" /><p class="flex justify-between mt-2 font-semibold"><span>Troco:</span><strong id="change-value" class="text-blue-600">R$ 0.00</strong></p></div>
        </div>
        <div class="mt-6 pt-4 border-t"><button id="finalize-checkout-btn" class="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled>Finalizar</button></div>
    `,{modalElement:d}=j({title:"Finalizar Pagamento",contentHTML:i,maxWidth:"max-w-md"});document.getElementById("payment-value").value=o.remainingAmount.toFixed(2),d.addEventListener("click",l=>{const c=l.target.closest(".payment-method-btn");c&&(o.selectedMethod=c.dataset.method,o.installments=1,document.getElementById("installments-select").value=1,s()),l.target.closest("#add-payment-btn")&&r(),l.target.closest('[data-action="remove-payment"]')&&(n.splice(parseInt(l.target.closest('[data-action="remove-payment"]').dataset.paymentIndex,10),1),s()),l.target.closest("#finalize-checkout-btn")&&En(e,a,n)}),d.addEventListener("change",l=>{l.target.id==="installments-select"&&(o.installments=parseInt(l.target.value,10))}),d.addEventListener("input",l=>{l.target.id==="amount-received"&&(o.amountReceived=l.target.value,s())}),s()}async function hn(){const e=`
        <form id="open-cashier-form" class="space-y-4">
            <div>
                <label for="initial-amount" class="block text-sm font-medium text-gray-700">Valor Inicial do Caixa</label>
                <div class="mt-1 relative">
                    <span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span>
                    <input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold" placeholder="0.00" value="0.00">
                </div>
                <p class="text-xs text-gray-500 mt-1">Digite o valor inicial disponível no caixa (pode ser R$ 0,00)</p>
            </div>
            <div>
                <label for="cashier-notes" class="block text-sm font-medium text-gray-700">Observações (opcional)</label>
                <textarea id="cashier-notes" rows="3" class="mt-1 w-full p-2 border rounded-md" placeholder="Notas sobre a abertura do caixa..."></textarea>
            </div>
            <div class="pt-4 border-t">
                <button type="submit" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">Abrir Caixa</button>
            </div>
        </form>
    `,{modalElement:t}=j({title:"Abrir Caixa",contentHTML:e,maxWidth:"max-w-md"});t.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const n=document.getElementById("initial-amount"),o=n.value.trim(),s=document.getElementById("cashier-notes").value.trim(),r=parseFloat(o);if(o===""||isNaN(r)||r<0){g("Valor Inválido","Por favor, insira um valor inicial válido (maior ou igual a R$ 0,00).","error"),n.focus();return}try{const i={establishmentId:p.establishmentId,initialAmount:parseFloat(r.toFixed(2))};s&&(i.notes=s);const d=await on(i);h.isCashierOpen=!0,h.activeCashierSessionId=d.id,await ta(),document.getElementById("genericModal").style.display="none",g("Sucesso!",`Caixa aberto com valor inicial de R$ ${r.toFixed(2)}`,"success")}catch(i){g("Erro",`Não foi possível abrir o caixa: ${i.message}`,"error")}})}async function yn(){const e=h.activeCashierSessionId;if(e)try{const t=await rn(e),a=`
            <form id="close-cashier-form" class="space-y-4">
                <div class="grid grid-cols-2 gap-4 text-center">
                    <div class="bg-blue-50 p-3 rounded-lg">
                        <p class="text-sm text-gray-600">Valor de Abertura</p>
                        <p class="text-2xl font-bold text-blue-600">R$ ${t.initialAmount.toFixed(2)}</p>
                    </div>
                    <div class="bg-green-50 p-3 rounded-lg">
                        <p class="text-sm text-gray-600">Vendas em Dinheiro</p>
                        <p class="text-2xl font-bold text-green-600">R$ ${t.cashSales.toFixed(2)}</p>
                    </div>
                </div>
                <div class="bg-gray-100 p-4 rounded-lg text-center">
                    <p class="text-sm font-medium text-gray-700">Valor Esperado em Caixa</p>
                    <p class="text-3xl font-bold text-gray-900">R$ ${t.expectedAmount.toFixed(2)}</p>
                </div>
                <hr>
                <div>
                    <label for="final-amount" class="block text-sm font-medium text-gray-700">Valor Final (Contado no Caixa)</label>
                    <div class="mt-1 relative">
                        <span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span>
                        <input type="number" step="0.01" min="0" id="final-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold" placeholder="0.00" value="${t.expectedAmount.toFixed(2)}">
                    </div>
                </div>
                <div class="pt-4 border-t">
                    <button type="submit" class="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition">Confirmar e Fechar Caixa</button>
                </div>
            </form>
        `,{modalElement:n}=j({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-md"});n.querySelector("#close-cashier-form").addEventListener("submit",async o=>{o.preventDefault();const s=parseFloat(document.getElementById("final-amount").value);if(isNaN(s)||s<0){g("Valor Inválido","Insira um valor final válido.","error");return}try{await sn(e,s),h.isCashierOpen=!1,h.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",await ta(),g("Sucesso!","Caixa fechado com sucesso!","success")}catch(r){g("Erro",`Não foi possível fechar o caixa: ${r.message}`,"error")}})}catch(t){g("Erro",`Não foi possível carregar o relatório de fecho: ${t.message}`,"error")}}async function xn(e){h.activeFilter!==e&&(h.activeFilter=e,h.paging.page=1,document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${e}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",e!=="finalizadas"),ce(),await X(),h.selectedComandaId=null,U())}function Rt(e){h.selectedComandaId=e,re(),mn(),U()}async function wn(e,t){const a=h.allComandas.find(o=>o.id===h.selectedComandaId);if(!a)return;const n=Array(t).fill(0).map(()=>({id:e.id,name:e.name,price:e.price,type:e.type}));if(a.comandaItems=a.comandaItems||[],a.comandaItems.push(...n),a.type==="walk-in"&&a.id.startsWith("temp-")){g("Sucesso",`${t}x ${e.name} adicionado(s)!`,"success"),U(),re();return}try{await Yt(a.id,a),g("Sucesso",`${t}x ${e.name} adicionado(s)!`,"success"),U(),re()}catch(o){g("Erro",`Não foi possível adicionar o item: ${o.message}`,"error"),a.comandaItems.splice(a.comandaItems.length-t,t)}}async function kn(e,t){const a=h.allComandas.find(s=>s.id===h.selectedComandaId);if(!a)return;let n=!1,o=(a.comandaItems||[]).findIndex(s=>s.id===e&&s.type===t);if(o>-1)a.comandaItems.splice(o,1),n=!0;else{let s=(a.services||[]).findIndex(r=>r.id===e);if(s>-1)a.services.splice(s,1),n=!0;else{let r=(a.items||[]).findIndex(i=>i.id===e&&i.type===t);r>-1&&(a.items.splice(r,1),n=!0)}}if(n){if(a.type==="walk-in"&&a.id.startsWith("temp-")){g("Sucesso","Item removido!","success"),U(),re();return}try{await Yt(a.id,a),g("Sucesso","Item removido!","success"),U(),re()}catch(s){g("Erro",`Não foi possível remover o item: ${s.message}`,"error"),await X()}}}async function En(e,t,a){const n=e.type==="appointment",o=[...e.services||[],...e.comandaItems||[],...e.items||[]],s={payments:a,totalAmount:t,items:o,cashierSessionId:h.activeCashierSessionId};try{n?await Oo(e.id,s):(s.clientName=e.clientName,s.professionalId=e.professionalId,s.clientPhone=e.clientPhone,await Ys(s)),g("Sucesso!","Venda finalizada com sucesso!","success"),document.getElementById("genericModal").style.display="none",ce(),h.selectedComandaId=null,await X()}catch(r){g("Erro no Checkout",r.message,"error")}}async function Sn(e){e.preventDefault();const t=document.getElementById("new-sale-client").value,a=document.getElementById("new-sale-professional").value,n=h.clients.find(r=>r.id===t),o=p.professionals.find(r=>r.id===a);if(!n||!o){g("Erro","Selecione um cliente e um profissional válidos.","error");return}const s={id:`temp-${Date.now()}`,type:"walk-in",clientName:n.name,clientPhone:n.phone,professionalId:o.id,professionalName:o.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};h.allComandas.unshift(s),h.selectedComandaId=s.id,document.getElementById("genericModal").style.display="none",Rt(s.id)}async function X(){const e=document.getElementById("comandas-list");e.innerHTML='<div class="loader mx-auto mt-10"></div>';const t=h.activeFilter==="finalizadas"?document.getElementById("filter-date").value:null;try{const a=await Ka();if(h.isCashierOpen=!!a,h.activeCashierSessionId=a?a.id:null,pn(),!h.isCashierOpen&&h.activeFilter==="atendimento"){re(),U();return}const n=await Gs(p.establishmentId,t,h.paging.page,h.paging.limit);if(h.allComandas=n.data||n,h.paging.total=n.total||n.length,h.catalog.services.length===0){const[o,s,r,i,d]=await Promise.all([Ie(p.establishmentId),ea(p.establishmentId),eo(p.establishmentId),We(p.establishmentId),_(p.establishmentId)]);h.catalog={services:o,products:s,packages:r},h.clients=i,p.professionals=d}re(),h.selectedComandaId,U()}catch(a){g("Erro de Carregamento",`Não foi possível carregar os dados: ${a.message}`,"error"),e.innerHTML=`<p class="text-red-500 p-4">${a.message}</p>`}}async function ta(e={}){be=document.getElementById("content");try{const t=await Ka();h.isCashierOpen=!!t,h.activeCashierSessionId=t?t.id:null}catch(t){console.error("Erro ao verificar caixa:",t),h.isCashierOpen=!1}h.selectedComandaId=e.selectedAppointmentId||null,un(),fe&&(be.removeEventListener("click",fe),be.removeEventListener("change",fe)),fe=async t=>{const a=t.target.closest("[data-action], [data-filter], [data-comanda-id], [data-id]");if(t.target.id==="filter-date"&&h.activeFilter==="finalizadas"){h.paging.page=1,await X();return}if(a){if(a.matches("[data-filter]"))xn(a.dataset.filter);else if(a.matches("[data-comanda-id]")){if(t.target.closest('[data-action="go-to-appointment"]')){t.stopPropagation();return}Rt(a.dataset.comandaId)}else if(a.matches("[data-action]")){const n=a.dataset.action,o=a.dataset.id||h.selectedComandaId;switch(n){case"back-to-list":{ce(),h.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach(s=>s.classList.remove("selected")),U();break}case"new-sale":to();break;case"add-item":bn();break;case"checkout":vn();break;case"open-cashier":hn();break;case"close-cashier":await yn();break;case"view-sales-report":F("sales-report-section");break;case"remove-item":await kn(a.dataset.itemId,a.dataset.itemType);break;case"reopen-appointment":{if(await T("Reabrir Comanda","Tem certeza? O pagamento será estornado e os produtos devolvidos ao estoque."))try{await jo(o);const r=h.allComandas.findIndex(i=>i.id===o);r!==-1&&(delete h.allComandas[r].transaction,delete h.allComandas[r].cashierSessionId,delete h.allComandas[r].redeemedReward,h.allComandas[r].status="confirmed"),h.selectedComandaId=null,ce(),g("Sucesso!","Comanda reaberta para edição.","success"),await X()}catch(r){g("Erro",`Não foi possível reabrir: ${r.message}`,"error")}break}case"reopen-walk-in":{if(await T("Reabrir Venda","Tem certeza? A venda será cancelada e os produtos devolvidos ao estoque."))try{await Xs(o),g("Sucesso!","Venda revertida."),ce(),h.selectedComandaId=null,await X()}catch(r){g("Erro",`Não foi possível reabrir: ${r.message}`,"error")}break}case"go-to-appointment":{const s=a.dataset.id,r=a.dataset.date;F("agenda-section",{scrollToAppointmentId:s,targetDate:new Date(r)});break}case"delete-walk-in":{if(await T("Excluir Venda","Tem certeza que deseja excluir esta venda avulsa? O estoque dos produtos será devolvido."))if(o.startsWith("temp-"))h.allComandas=h.allComandas.filter(r=>r.id!==o),h.selectedComandaId=null,re(),U(),g("Sucesso","Venda avulsa removida.","success"),ce();else try{await Qs(o),g("Sucesso","Venda avulsa excluída com sucesso.","success"),h.selectedComandaId=null,ce(),await X()}catch(r){g("Erro",`Não foi possível excluir: ${r.message}`,"error")}break}}}}},be.addEventListener("click",fe),be.addEventListener("change",fe),e.initialFilter&&(h.activeFilter=e.initialFilter==="finalizadas"?"finalizadas":"atendimento"),e.selectedAppointmentId&&(h.selectedComandaId=e.selectedAppointmentId),document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${h.activeFilter}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",h.activeFilter!=="finalizadas"),e.filterDate&&(document.getElementById("filter-date").value=new Date(e.filterDate).toISOString().split("T")[0]),await X(),h.selectedComandaId&&Rt(h.selectedComandaId)}const yt=document.getElementById("content");let ne={},$n=null,In=null,P={year:null,month:null,monthName:null,professionalId:null,professionalName:null},xa=[];const ve=["#4f46e5","#22c55e","#f97316","#06b6d4","#e11d48","#6366f1","#84cc16","#f59e0b"];function aa(){Object.values(ne).forEach(e=>e?.destroy()),ne={}}function Cn(e){const t=document.getElementById("kpi-revenue"),a=document.getElementById("kpi-transactions"),n=document.getElementById("kpi-popular-item");t&&(t.textContent=`R$ ${e.totalRevenue.toFixed(2)}`),a&&(a.textContent=e.totalTransactions),n&&(n.textContent=e.mostPopularItem||"N/A"),document.querySelectorAll(".kpi-loader").forEach(o=>o.classList.add("hidden")),document.querySelectorAll(".kpi-value").forEach(o=>o.classList.remove("hidden"))}function Ln(e){const t="Detalhes da Transação",a=`
        <div class="space-y-3 text-lg">
            <p><strong>Hora:</strong> ${new Date(e.date).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</p>
            <p><strong>Cliente:</strong> ${e.client}</p>
            <p><strong>Profissional:</strong> ${e.professionalName||"N/A"}</p>
            <p><strong>Responsável Caixa:</strong> ${e.responsavelCaixa||"N/A"}</p>
            <p><strong>Valor Total:</strong> <span class="text-green-600 font-bold">R$ ${e.value.toFixed(2)}</span></p>
            <p><strong>Tipo:</strong> <span class="font-semibold">${e.type}</span></p>
        </div>
        <div class="mt-6 p-4 border rounded-lg bg-gray-50">
            <h4 class="font-semibold text-xl mb-2">Serviços/Itens Vendidos</h4>
            <p class="text-gray-700">${e.items.replace(/, /g,"<br>")}</p>
        </div>
    `;j({title:t,contentHTML:a,maxWidth:"max-w-md"})}async function Oe(e,t,a){P={year:e,month:t,monthName:a},yt.innerHTML=`
        <section>
            <div class="flex justify-between items-center mb-6">
                <button id="backToMainBtn" class="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">
                    < Voltar
                </button>
                <h2 class="text-3xl font-bold text-gray-800">Detalhes de ${a}</h2>
                <div></div>
            </div>
            <div class="loader-container p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>
            <div id="monthly-details-view" class="hidden">
                 <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white p-4 rounded-lg shadow-md border">
                        <h3 class="font-semibold text-center mb-2">Receita Diária</h3>
                        <canvas id="monthlyRevenueChart"></canvas>
                        <p class="text-xs text-center text-gray-500 mt-2">Clique nas barras para ver detalhes do dia.</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-md border">
                        <h3 class="font-semibold text-center mb-2">Vendas por Profissional</h3>
                        <canvas id="salesByProfessionalChart"></canvas>
                        <p class="text-xs text-center text-gray-500 mt-2">Clique nas fatias para ver o detalhe do profissional.</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                     <div class="bg-white p-4 rounded-lg shadow-md border">
                        <h3 class="font-semibold text-center mb-2">Itens Mais Vendidos</h3>
                        <canvas id="topItemsChart"></canvas>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-md border">
                        <h3 class="font-semibold text-center mb-2">Tipo de Venda</h3>
                        <canvas id="revenueByTypeChart"></canvas>
                    </div>
                </div>
            </div>
        </section>`,document.getElementById("backToMainBtn").addEventListener("click",Ht);try{const n=await gs(p.establishmentId,e,t);In=n,document.querySelector(".loader-container").classList.add("hidden"),document.getElementById("monthly-details-view").classList.remove("hidden");const o=n.revenueByDay.map(u=>u.day),s=n.revenueByDay.map(u=>u.revenue),r=n.salesByProfessional.map(u=>u.name),i=n.salesByProfessional.map(u=>u.count),d=n.topItems.map(u=>u.name),l=n.topItems.map(u=>u.count),c=["Agendamentos","Vendas Avulsas"],m=[n.revenueByTransactionType.appointment,n.revenueByTransactionType.sales];aa(),ne.monthlyRevenue=new Chart(document.getElementById("monthlyRevenueChart").getContext("2d"),{type:"bar",data:{labels:o,datasets:[{label:"Receita Diária",data:s,backgroundColor:ve[0]}]},options:{responsive:!0,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}},onClick:(u,b)=>{if(b.length>0){const f=o[b[0].index];Bn(e,t,f)}}}}),ne.salesByProfessional=new Chart(document.getElementById("salesByProfessionalChart").getContext("2d"),{type:"pie",data:{labels:r,datasets:[{label:"Vendas",data:i,backgroundColor:ve,hoverOffset:16}]},options:{responsive:!0,plugins:{legend:{position:"right"}},onClick:(u,b)=>{if(b.length>0){const f=b[0].index,v=n.salesByProfessional[f];v&&Tn(e,t,v.id,v.name)}}}}),ne.topItems=new Chart(document.getElementById("topItemsChart").getContext("2d"),{type:"bar",data:{labels:d,datasets:[{label:"Itens Vendidos",data:l,backgroundColor:ve[2]}]},options:{indexAxis:"y",responsive:!0,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0}}}}),ne.revenueByType=new Chart(document.getElementById("revenueByTypeChart").getContext("2d"),{type:"doughnut",data:{labels:c,datasets:[{label:"Receita por Tipo",data:m,backgroundColor:[ve[1],ve[3]],hoverOffset:16}]},options:{responsive:!0,plugins:{legend:{position:"right"}}}})}catch(n){g("Erro",`Não foi possível carregar os detalhes do mês: ${n.message}`,"error"),Ht()}}async function Bn(e,t,a){P={...P,day:a},yt.innerHTML=`
        <section>
            <div class="flex justify-between items-center mb-6">
                <button id="backToMonthlyBtn" class="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">
                    < Voltar
                </button>
                <h2 class="text-3xl font-bold text-gray-800">Detalhes do Dia ${a}/${t+1}/${e}</h2>
                <div></div>
            </div>
            <div class="loader-container p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>
            <div id="daily-details-view" class="hidden">
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mb-6">
                    <div class="bg-blue-50 p-4 rounded-lg shadow-sm"><p class="text-gray-500">Total de Vendas</p><p id="daily-total-transactions" class="text-3xl font-bold text-blue-600"></p></div>
                    <div class="bg-green-50 p-4 rounded-lg shadow-sm"><p class="text-gray-500">Receita Gerada</p><p id="daily-total-revenue" class="text-3xl font-bold text-green-600"></p></div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-md max-h-[60vh] overflow-y-auto overflow-x-auto">
                    <h3 class="font-semibold text-xl mb-4">Detalhes das Transações</h3>
                    
                    <table class="text-sm w-full"> 
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="px-2 py-2 text-left">Hora</th>
                                <th class="px-2 py-2 text-left">Cliente</th>
                                <th class="px-2 py-2 text-left">Profissional</th>
                            </tr>
                        </thead>
                        <tbody id="daily-transactions-list"></tbody>
                    </table>
                </div>
            </div>
        </section>`,document.getElementById("backToMonthlyBtn").addEventListener("click",()=>{Oe(P.year,P.month,P.monthName)});try{const n=await fs(p.establishmentId,e,t,a);xa=n.transactions,document.querySelector(".loader-container").classList.add("hidden"),document.getElementById("daily-details-view").classList.remove("hidden"),document.getElementById("daily-total-transactions").textContent=n.summary.totalTransactions,document.getElementById("daily-total-revenue").textContent=`R$ ${n.summary.totalRevenue.toFixed(2)}`;const o=document.getElementById("daily-transactions-list");o.innerHTML=n.transactions.map((s,r)=>`
            <tr class="border-b hover:bg-gray-50 cursor-pointer" data-index="${r}">
                <td class="px-2 py-2">${new Date(s.date).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</td>
                <td class="px-2 py-2">${s.client}</td>
                <td class="px-2 py-2">${s.professionalName||"N/A"}</td>
            </tr>
        `).join(""),document.querySelectorAll("#daily-transactions-list tr").forEach(s=>{s.addEventListener("click",r=>{const i=r.currentTarget.getAttribute("data-index"),d=xa[i];d&&Ln(d)})})}catch(n){g("Erro",`Não foi possível carregar os detalhes diários: ${n.message}`,"error"),Oe(P.year,P.month,P.monthName)}}async function Tn(e,t,a,n){P={year:e,month:t,professionalId:a,professionalName:n},yt.innerHTML=`
        <section>
            <div class="flex justify-between items-center mb-6">
                <button id="backToMonthlyBtn" class="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">
                    < Voltar
                </button>
                <h2 class="text-3xl font-bold text-gray-800">Relatório de ${n}</h2>
                <div></div>
            </div>
            <div class="loader-container p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>
            <div id="professional-details-view" class="hidden">
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mb-6">
                    <div class="bg-blue-50 p-4 rounded-lg shadow-sm"><p class="text-gray-500">Total de Vendas</p><p id="prof-total-transactions" class="text-3xl font-bold text-blue-600"></p></div>
                    <div class="bg-green-50 p-4 rounded-lg shadow-sm"><p class="text-gray-500">Receita Gerada</p><p id="prof-total-revenue" class="text-3xl font-bold text-green-600"></p></div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-md max-h-[60vh] overflow-y-auto overflow-x-auto">
                    <h3 class="font-semibold text-xl mb-4">Detalhes das Transações</h3>
                    <table class="text-sm w-full"> 
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="px-2 py-2 text-left">Data</th>
                                <th class="px-2 py-2 text-left">Cliente</th>
                                <th class="px-2 py-2 text-left">Serviços/Itens</th>
                                <th class="px-2 py-2 text-right">Valor</th>
                            </tr>
                        </thead>
                        <tbody id="prof-transactions-list"></tbody>
                    </table>
                </div>
            </div>
        </section>`,document.getElementById("backToMonthlyBtn").addEventListener("click",()=>{Oe(P.year,P.month,P.monthName)});try{const o=await bs(p.establishmentId,e,t,a);document.querySelector(".loader-container").classList.add("hidden"),document.getElementById("professional-details-view").classList.remove("hidden"),document.getElementById("prof-total-transactions").textContent=o.summary.totalTransactions,document.getElementById("prof-total-revenue").textContent=`R$ ${o.summary.totalRevenue.toFixed(2)}`;const s=document.getElementById("prof-transactions-list");s.innerHTML=o.transactions.map(r=>`
            <tr class="border-b hover:bg-gray-50">
                <td class="px-2 py-2">${new Date(r.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
                <td class="px-2 py-2">${r.client}</td>
                <td class="px-2 py-2">${r.items}</td>
                <td class="px-2 py-2 text-right">R$ ${r.value.toFixed(2)}</td>
            </tr>
        `).join("")}catch(o){g("Erro",`Não foi possível carregar os detalhes do profissional: ${o.message}`,"error"),Oe(P.year,P.month,P.monthName)}}async function Mn(e,t,a){const n=t.getElementsAtEventForMode(e,"nearest",{intersect:!0},!1);if(n.length>0){const s=n[0].index,r=a[s];r&&await Oe(r.year,r.monthIndex,r.month)}}async function wa(){const e=document.getElementById("main-reports-view"),t=document.getElementById("startDate"),a=document.getElementById("endDate");if(!e||!t||!a){console.error("Elementos essenciais para o relatório não foram encontrados no DOM.");return}e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';const n=t.value,o=a.value;if(!n||!o)return e.innerHTML='<p class="text-red-500 p-8 text-center">Selecione as datas para gerar o relatório.</p>',g("Atenção","Por favor, selecione as datas de início e fim.","error");try{const s=await us(p.establishmentId,n,o);$n=s,e.innerHTML=`
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 class="font-semibold text-gray-500">Receita Total</h3>
                    <p id="kpi-revenue" class="kpi-value text-4xl font-bold text-green-600 hidden"></p>
                    <div class="kpi-loader h-10 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 class="font-semibold text-gray-500">Vendas Totais</h3>
                    <p id="kpi-transactions" class="kpi-value text-4xl font-bold text-blue-600 hidden"></p>
                    <div class="kpi-loader h-10 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-md text-center overflow-hidden">
                    <h3 class="font-semibold text-gray-500">Item Mais Popular</h3>
                    <p id="kpi-popular-item" class="kpi-value text-2xl font-bold text-indigo-600 hidden truncate"></p>
                    <div class="kpi-loader h-8 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md overflow-hidden">
                <h3 class="text-xl font-semibold mb-4 text-gray-700">Receita por Mês</h3>
                <div id="chart-container" class="relative h-96">
                    <canvas id="transactionsByMonthChart"></canvas>
                    <p class="text-xs text-center text-gray-500 mt-2">Clique nas barras para ver detalhes do mês.</p>
                </div>
            </div>`,Cn(s.kpis),setTimeout(()=>{const r=document.getElementById("transactionsByMonthChart");r&&(aa(),ne.main=new Chart(r.getContext("2d"),{type:"bar",data:{labels:s.transactionsByMonth.map(i=>i.month),datasets:[{label:"Receita Total",data:s.transactionsByMonth.map(i=>i.revenue),backgroundColor:ve[0],borderRadius:5}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:i=>`R$ ${i.raw.toFixed(2)}`}}},scales:{y:{beginAtZero:!0}},onClick:(i,d)=>Mn(i,ne.main,s.transactionsByMonth)}}))},50)}catch(s){g("Erro",`Não foi possível carregar os relatórios: ${s.message}`,"error"),e.innerHTML='<p class="text-red-500 p-8 text-center">Erro ao carregar os dados dos relatórios. Por favor, tente novamente.</p>'}}async function Ht(){aa();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];yt.innerHTML=`
        <section>
            <div class="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Dashboard de Analytics</h2>
                
                <div class="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 bg-white p-3 rounded-lg shadow-md w-full sm:w-auto">
                    
                    <div class="flex flex-col">
                        <label for="startDate" class="text-sm font-medium mb-1">De:</label>
                        <input type="date" id="startDate" value="${a}" class="p-2 border rounded-md w-full">
                    </div>
                    
                    <div class="flex flex-col">
                        <label for="endDate" class="text-sm font-medium mb-1">Até:</label>
                        <input type="date" id="endDate" value="${e}" class="p-2 border rounded-md w-full">
                    </div>
                    
                    <button id="generateReportBtn" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 w-full sm:w-auto flex-shrink-0">Gerar Relatório</button>
                </div>
            </div>
            <div id="main-reports-view">
                <div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>
            </div>
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",wa),await wa()}const xt=(e,t="products")=>y(`/api/${t}/categories/${e}`),ao=(e,t="products")=>y(`/api/${t}/categories`,{method:"POST",body:JSON.stringify(e)}),oo=(e,t="products")=>y(`/api/${t}/categories/${e}`,{method:"DELETE"}),de=document.getElementById("content");let oe=null,De="services",ue="all";async function Dn(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),n=a.value;if(n)try{await ao({establishmentId:p.establishmentId,name:n},"services"),a.value="",g("Sucesso","Categoria criada!","success"),await oa(),await Ge()}catch(o){g("Erro",`Não foi possível criar a categoria: ${o.message}`,"error")}}async function Pn(e){if(await T("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await oo(e,"services"),g("Sucesso","Categoria apagada.","success"),await oa(),await Ge()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function oa(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await xt(p.establishmentId,"services");p.serviceCategories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${a.name}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function An(){j({title:"Gerir Categorias de Serviços",contentHTML:`
        <div class="space-y-4">
            <div class="mb-4">
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",Dn),t.addEventListener("click",n=>{const o=n.target.closest('button[data-action="delete-category"]');o&&(n.preventDefault(),Pn(o.dataset.id))}))}oa()}async function qn(e){e.preventDefault();const t=e.target.closest("#serviceModal"),a=t.querySelector("#serviceId").value,n={},o=t.querySelector('input[name="commissionType"]:checked').value;o==="custom"&&t.querySelectorAll(".professional-commission-row").forEach(r=>{const i=r.dataset.profId;if(r.querySelector('input[type="checkbox"]').checked){const l=parseFloat(r.querySelector('input[type="number"]').value);n[i]=isNaN(l)?0:l}});const s={establishmentId:p.establishmentId,name:t.querySelector("#serviceName").value,price:parseFloat(t.querySelector("#servicePrice").value),duration:parseInt(t.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(t.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:t.querySelector("#serviceCategory").value||null,commissionRate:parseFloat(t.querySelector("#serviceCommissionRate").value)||0,active:t.querySelector("#serviceStatus").value==="true",photo:t.querySelector("#servicePhotoBase64").value,notes:t.querySelector("#serviceNotes").value,commissionType:o,professionalCommissions:n};try{a?await ys(a,s):await hs(s),document.getElementById("serviceModal").style.display="none",g("Sucesso",`Serviço ${a?"atualizado":"adicionado"} com sucesso!`,"success"),await Ge()}catch(r){g("Erro",r.message,"error")}}function Nn(e,t=800,a=800,n="image/jpeg",o=.8){return new Promise((s,r)=>{if(!e.type.startsWith("image/"))return r(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=d=>{const l=new Image;l.onload=()=>{let c=l.width,m=l.height;c>m?c>t&&(m*=t/c,c=t):m>a&&(c*=a/m,m=a);const u=document.createElement("canvas");u.width=c,u.height=m,u.getContext("2d").drawImage(l,0,0,c,m);const f=u.toDataURL(n,o);s(f)},l.onerror=c=>r(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},i.onerror=d=>r(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function ka(e=null){const t=document.getElementById("serviceModal"),a=p.serviceCategories||[],n=e?.duration||0,o=e?.bufferTime||0,s=a.map(w=>`<option value="${w.id}" ${e?.categoryId===w.id?"selected":""}>${w.name}</option>`).join("");t.innerHTML=`
    <div class="modal-content max-w-3xl overflow-y-auto max-h-[85vh] my-auto">
        <form id="serviceForm">
            <input type="hidden" id="serviceId" value="${e?.id||""}">
            <input type="hidden" id="servicePhotoBase64" value="${e?.photo||""}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="serviceModalTitle" class="text-2xl font-bold text-gray-800">${e?e.name:"Novo Serviço"}</h2>
                <button type="button" data-action="close-modal" data-target="serviceModal" class="text-2xl font-bold">&times;</button>
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
                        <img id="servicePhotoPreview" src="${e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto"}" alt="Foto do Serviço" class="w-32 h-32 rounded-lg object-cover mb-3 border-4 border-gray-200 bg-gray-50">
                        <input type="file" id="servicePhotoInput" class="hidden" accept="image/*">
                        <button type="button" id="servicePhotoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar Imagem</button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="serviceName" class="block text-sm font-medium text-gray-700">Nome do serviço</label>
                        <input type="text" id="serviceName" value="${e?.name||""}" class="mt-1 w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label for="servicePrice" class="block text-sm font-medium text-gray-700">Preço (a partir de:)</label>
                        <input type="number" id="servicePrice" step="0.01" value="${e?.price||""}" class="mt-1 w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label for="serviceCategory" class="block text-sm font-medium text-gray-700">Categoria</label>
                        <select id="serviceCategory" class="mt-1 w-full p-2 border rounded-md bg-white">
                            <option value="">Sem Categoria</option>
                            ${s}
                        </select>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="serviceDurationMinutes" class="block text-sm font-medium text-gray-700">Duração (minutos)</label>
                            <input type="number" id="serviceDurationMinutes" min="0" value="${n}" class="mt-1 w-full p-2 border rounded-md" required>
                        </div>
                        <div>
                            <label for="serviceBufferTimeMinutes" class="block text-sm font-medium text-gray-700">Minutos Extras</label>
                            <input type="number" id="serviceBufferTimeMinutes" min="0" value="${o}" class="mt-1 w-full p-2 border rounded-md">
                        </div>
                    </div>
                </div>
                <div>
                    <label for="serviceNotes" class="block text-sm font-medium text-gray-700">Observações</label>
                    <textarea id="serviceNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${e?.notes||""}</textarea>
                </div>
                <div>
                    <label for="serviceStatus" class="block text-sm font-medium text-gray-700">Status</label>
                    <select id="serviceStatus" class="mt-1 w-full p-2 border rounded-md bg-white">
                        <option value="true" ${e?.active!==!1?"selected":""}>Ativo</option>
                        <option value="false" ${e?.active===!1?"selected":""}>Inativo</option>
                    </select>
                </div>
            </div>
            
            <div id="tab-content-comissoes" class="tab-content hidden space-y-6">
                <div>
                    <label class="block text-lg font-medium text-gray-800">Tipo de comissão</label>
                    <p class="text-sm text-gray-500">Qual o tipo de comissão que é paga neste serviço?</p>
                    <div class="mt-2 space-y-2">
                        <label class="flex items-center p-3 border rounded-md has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-400 cursor-pointer">
                            <input type="radio" name="commissionType" value="default" class="h-4 w-4 text-indigo-600 border-gray-300" ${e?.commissionType!=="custom"?"checked":""}>
                            <span class="ml-3 text-sm text-gray-700 font-medium">Padrão para todos os profissionais</span>
                        </label>
                        <label class="flex items-center p-3 border rounded-md has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-400 cursor-pointer">
                            <input type="radio" name="commissionType" value="custom" class="h-4 w-4 text-indigo-600 border-gray-300" ${e?.commissionType==="custom"?"checked":""}>
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
                     <p class="text-sm text-gray-500 mb-2">Selecione os profissionais que fazem este serviço e informe a comissão de cada um deles.</p>
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
                
                <button 
                    type="button" 
                    data-action="delete-service" 
                    data-id="${e?.id||""}" 
                    class="w-full sm:w-auto text-red-600 hover:text-red-800 transition-colors ${e?"":"hidden"}"
                    title="Excluir Serviço"
                >
                    <svg class="w-6 h-6 mx-auto sm:mx-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
                
                <div class="flex flex-col-reverse sm:flex-row w-full sm:w-auto gap-3">
                    <button type="button" data-action="close-modal" data-target="serviceModal" class="w-full sm:w-auto py-2 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button type="submit" class="w-full sm:w-auto py-2 px-6 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700">Salvar</button>
                </div>
            </div>
        </form>
    </div>`,t.style.display="flex",t.addEventListener("click",async w=>{const E=w.target.closest("button[data-action]");if(!E)return;const B=E.dataset.action,D=E.dataset.id;if(B==="close-modal"&&(t.style.display="none"),B==="delete-service"){if(!D)return;if(t.style.display="none",await T("Apagar Serviço","Tem a certeza que deseja apagar este serviço?"))try{await xs(D),g("Sucesso","Serviço apagado com sucesso!","success"),await Ge()}catch(L){g("Erro",`Não foi possível apagar o serviço: ${L.message}`,"error")}else t.style.display="flex"}});const r=t.querySelectorAll(".tab-btn"),i=t.querySelectorAll(".tab-content");r.forEach(w=>{w.addEventListener("click",()=>{r.forEach(E=>{E.classList.remove("border-indigo-500","text-indigo-600"),E.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),w.classList.add("border-indigo-500","text-indigo-600"),w.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),i.forEach(E=>E.classList.add("hidden")),document.getElementById(`tab-content-${w.dataset.tab}`).classList.remove("hidden")})});const d=t.querySelectorAll('input[name="commissionType"]'),l=document.getElementById("defaultCommissionRateContainer"),c=document.getElementById("professionalCommissionsContainer");function m(){const w=t.querySelector('input[name="commissionType"]:checked').value;l&&(l.style.display=w==="default"?"block":"none"),c&&(c.style.display=w==="custom"?"block":"none")}d.forEach(w=>w.addEventListener("change",m));const u=document.getElementById("professionalCommissionsList");u&&(u.innerHTML=(p.professionals||[]).map(w=>{const E=e?.professionalCommissions?.[w.id]!==void 0,B=e?.professionalCommissions?.[w.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-md ${E?"bg-blue-50":""}" data-prof-id="${w.id}">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" ${E?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <img src="${w.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${w.name.charAt(0)}`}" class="w-8 h-8 rounded-full object-cover">
                        <span class="text-sm font-medium">${w.name}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${B}" class="w-20 p-1 border rounded-md text-sm text-center" ${E?"":"disabled"}>
                        <span class="text-sm font-semibold">%</span>
                    </div>
                </div>
            `}).join(""),u.querySelectorAll('input[type="checkbox"]').forEach(w=>{w.addEventListener("change",E=>{const B=E.target.closest(".professional-commission-row");B.querySelector('input[type="number"]').disabled=!E.target.checked,B.classList.toggle("bg-blue-50",E.target.checked)})})),m();const b=t.querySelector("#serviceForm"),f=t.querySelector("#servicePhotoInput"),v=t.querySelector("#servicePhotoPreview"),k=t.querySelector("#servicePhotoBase64"),$=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",S=e?.photo||"";t.querySelector("#servicePhotoButton").addEventListener("click",()=>f.click()),f.onchange=async()=>{const w=f.files[0];if(w){v.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const E=await Nn(w,800,800,"image/jpeg",.8),D=E.length*3/4,A=1e3*1024;if(D>A)throw new Error("A imagem é muito grande mesmo após a compressão.");v.src=E,k.value=E}catch(E){console.error("Erro ao processar imagem:",E),g("Erro de Imagem",E.message||"Não foi possível processar a imagem.","error"),v.src=$,k.value=S,f.value=""}}},b.addEventListener("submit",qn)}function he(){const e=document.getElementById("servicesList");if(!e)return;const t=document.getElementById("serviceSearchInput")?.value.toLowerCase()||"",a=document.getElementById("serviceCategoryFilter")?.value||"all",n=new Map((p.serviceCategories||[]).map(s=>[s.id,s.name]));let o=(p.services||[]).filter(Boolean);if(ue!=="all"){const s=ue==="active";o=o.filter(r=>r.active!==!1===s)}o=o.filter(s=>{const r=s.name.toLowerCase().includes(t),i=a==="all"||s.categoryId===a;return r&&i}),e.innerHTML="",o.length>0?o.forEach(s=>{const r=document.createElement("div"),i=JSON.stringify(s).replace(/'/g,"&apos;");r.className=`service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 ${s.active!==!1?"opacity-100":"opacity-50 bg-gray-100"} sm:flex-col`,r.dataset.action="edit-service",r.dataset.service=i;const d=s.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(s.name.charAt(0))}`,l=n.get(s.categoryId)||"N/A";r.innerHTML=`
                <img src="${d}" alt="Imagem de ${s.name}" class="w-20 h-20 object-cover flex-shrink-0 sm:w-full sm:h-24">
                
                <div class="p-3 flex flex-col flex-grow justify-between w-full">
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="text-sm font-bold text-gray-900 flex-1 text-left truncate pr-2">${s.name}</h3>
                        <label class="flex items-center cursor-pointer ml-2" data-action-stop-propagation="true">
                            <div class="relative">
                                <input type="checkbox" data-action="toggle-service-status" data-id="${s.id}" class="sr-only" ${s.active!==!1?"checked":""}>
                                <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                            </div>
                        </label>
                    </div>

                    <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${s.price.toFixed(2)}</p>

                    <div>
                        <div class="hidden sm:block">
                            <p class="text-xs text-gray-500 text-left mb-1 truncate">Categoria: ${l}</p>
                            <p class="text-xs text-gray-500 text-left">Duração: ${s.duration} min (+${s.bufferTime||0} min extra)</p>
                        </div>
                        <div class="flex justify-between items-center sm:hidden mt-2">
                            <p class="text-lg font-bold text-indigo-600 text-left">R$ ${s.price.toFixed(2)}</p>
                            <p class="text-xs text-gray-500 text-right">${s.duration} min</p>
                        </div>
                    </div>
                </div>`,e.appendChild(r)}):e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>'}function sa(){const e={active:0,inactive:0,total:0},t=(p.services||[]).filter(Boolean);t.forEach(r=>{r.active===!1?e.inactive++:e.active++}),e.total=t.length;const a=document.getElementById("indicator-total"),n=document.getElementById("indicator-active"),o=document.getElementById("indicator-inactive"),s=document.getElementById("indicator-popular");a&&(a.textContent=e.total),n&&(n.textContent=e.active),o&&(o.textContent=e.inactive),s&&(p.mostPopularService&&p.mostPopularService.name!=="N/A"?(s.textContent=p.mostPopularService.name,s.closest(".indicator-card").title=`${p.mostPopularService.name} (${p.mostPopularService.count} agendamentos)`):(s.textContent="N/A",s.closest(".indicator-card").title="Nenhum serviço agendado ainda"))}function Fn(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="flex flex-col sm:flex-row gap-4 mb-6">
            <input type="search" id="serviceSearchInput" placeholder="Pesquisar por nome..." class="w-full sm:w-64 p-2 border rounded-md shadow-sm">
            <select id="serviceCategoryFilter" class="w-full sm:w-auto p-2 border rounded-md bg-white shadow-sm">
                <option value="all">Todas as categorias</option>
            </select>
        </div>
        
        <div class="grid grid-cols-2 gap-3 mb-4 lg:grid-cols-4 lg:gap-4">
            <div data-action="filter-service" data-filter-type="total" class="indicator-card bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg flex items-center gap-3 cursor-pointer transition-all lg:p-4 lg:gap-4">
                <div class="bg-blue-100 p-1.5 lg:p-2 rounded-full"><svg class="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M5 11v2m14-2v2"></path></svg></div>
                <div><p class="text-xs text-gray-500">Total de Serviços</p><p id="indicator-total" class="text-lg font-bold text-gray-800 lg:text-2xl">0</p></div>
            </div>
            <div data-action="filter-service" data-filter-type="active" class="indicator-card bg-green-50 border-l-4 border-green-500 p-3 rounded-r-lg flex items-center gap-3 cursor-pointer transition-all lg:p-4 lg:gap-4">
                <div class="bg-green-100 p-1.5 lg:p-2 rounded-full"><svg class="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                <div><p class="text-xs text-gray-500">Serviços Ativos</p><p id="indicator-active" class="text-lg font-bold text-gray-800 lg:text-2xl">0</p></div>
            </div>
            <div data-action="filter-service" data-filter-type="inactive" class="indicator-card bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg flex items-center gap-3 cursor-pointer transition-all lg:p-4 lg:gap-4">
                <div class="bg-red-100 p-1.5 lg:p-2 rounded-full"><svg class="w-5 h-5 lg:w-6 lg:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg></div>
                <div><p class="text-xs text-gray-500">Serviços Inativos</p><p id="indicator-inactive" class="text-lg font-bold text-gray-800 lg:text-2xl">0</p></div>
            </div>
            <div id="popular-card" data-action="filter-service" data-filter-type="popular" class="indicator-card bg-gray-50 border-l-4 border-gray-400 p-3 rounded-r-lg flex items-center gap-3 transition-all opacity-70 lg:p-4 lg:gap-4" title="Carregando...">
                <div class="bg-gray-100 p-1.5 lg:p-2 rounded-full"><svg class="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.05 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg></div>
                <div><p class="text-xs text-gray-500">Mais Usados</p><p id="indicator-popular" class="text-lg font-bold text-gray-800 lg:text-2xl truncate">...</p></div>
            </div>
        </div>

        <div id="servicesList" class="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4">
            <div class="loader col-span-full mx-auto my-10"></div>
        </div>
        
        <button data-action="new-service" class="fixed z-30 bottom-20 right-6 sm:bottom-8 sm:right-8 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        </button>
    `;const t=document.getElementById("serviceCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(p.serviceCategories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${a.name}</option>`)),sa(),he()}function Rn(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="p-8 text-center">
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2">Em breve, aqui poderás ver relatórios detalhados sobre os teus serviços mais rentáveis, mais agendados e muito mais.</p>
        </div>
    `}async function Ge(){const e=document.getElementById("services-content-container");if(e){const t=e.querySelector(".loader");t&&(t.style.display="block")}try{const[t,a,n,o]=await Promise.all([Ie(p.establishmentId),_(p.establishmentId),xt(p.establishmentId,"services"),ks(p.establishmentId)]);p.services=(t||[]).filter(Boolean),p.professionals=(a||[]).filter(Boolean),p.serviceCategories=(n||[]).filter(Boolean),p.mostPopularService=o||{name:"N/A",count:0},p.services.forEach(s=>{s.active===void 0&&(s.active=!0)}),so(De)}catch(t){e&&(e.innerHTML='<p class="text-red-500 col-span-full text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>'),g("Erro",`Não foi possível carregar os dados: ${t.message}`,"error")}}function so(e){if(document.getElementById("services-content-container")){if(De===e&&document.getElementById("services-content-container").children.length>1){De==="services"&&(sa(),he());return}De=e,ue="all",document.querySelectorAll("#services-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="services"?Fn():e==="reports"&&Rn()}}function Hn(){oe&&(de.removeEventListener("click",oe),de.removeEventListener("input",oe),de.removeEventListener("change",oe)),oe=async e=>{const t=e.target;if(t.closest('[data-action="toggle-service-status"]')){e.stopPropagation();const o=t.closest('[data-action="toggle-service-status"]'),s=o.dataset.id,r=o.checked;try{await ws(s,r);const i=p.services.findIndex(d=>d.id===s);i>-1&&(p.services[i].active=r),he(),sa()}catch(i){g("Erro",`Não foi possível atualizar o status: ${i.message}`,"error"),o.checked=!r,he()}return}const a=t.closest("button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]");if(t.id==="serviceSearchInput"||t.id==="serviceCategoryFilter"){he();return}if(!a)return;if(a.hasAttribute("data-view")){so(a.dataset.view);return}switch(a.dataset.action){case"new-service":ka();break;case"edit-service":const o=JSON.parse(a.dataset.service);ka(o);break;case"manage-categories":An();break;case"filter-service":const s=a.dataset.filterType;if(s==="popular")return;ue=s==="total"?"all":s,document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(r=>{const i=r.dataset.filterType,l=i===ue||i==="total"&&ue==="all";r.classList.toggle("ring-2",l),r.classList.toggle("ring-indigo-500",l),r.classList.toggle("shadow-lg",l)}),he();break}},de.addEventListener("click",oe),de.addEventListener("input",oe),de.addEventListener("change",oe)}async function jn(){de.innerHTML=`
        <section class="p-4 sm:p-6">
            <div class="bg-white rounded-lg shadow-md">
                <div id="services-tabs" class="border-b border-gray-200">
                    <nav class="-mb-px flex space-x-6 px-4 sm:px-6 overflow-x-auto" aria-label="Tabs">
                        <button data-view="services" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">
                            Serviços
                        </button>
                        <button data-action="manage-categories" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
                            Categorias
                        </button>
                        <button data-view="reports" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
                            Relatórios
                        </button>
                    </nav>
                </div>
                
                <div id="services-content-container" class="p-4 sm:p-6">
                    <div class="loader mx-auto"></div>
                </div>
            </div>
        </section>`,Hn();try{(!p.professionals||p.professionals.length===0)&&(p.professionals=await _(p.establishmentId)||[])}catch(e){console.error("Falha ao carregar profissionais:",e),g("Erro","Não foi possível carregar a lista de profissionais.","error"),p.professionals=[]}De="services",ue="all",await Ge()}const ie=document.getElementById("content");let se=null,Pe="products",Y="all";async function On(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),n=a.value;if(n)try{await ao({establishmentId:p.establishmentId,name:n},"products"),a.value="",g("Sucesso","Categoria de produto criada!","success"),await na(),await Ye()}catch(o){g("Erro",`Não foi possível criar a categoria: ${o.message}`,"error")}}async function zn(e){if(await T("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await oo(e,"products"),g("Sucesso","Categoria de produto apagada.","success"),await na(),await Ye()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function na(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await xt(p.establishmentId,"products");p.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${a.name}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function Vn(){j({title:"Gerir Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",On),t.addEventListener("click",n=>{const o=n.target.closest('button[data-action="delete-category"]');o&&zn(o.dataset.id)}))}na()}async function Un(e){if(!e)return;if(await T("Apagar Produto","Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida."))try{await en(e),g("Sucesso","Produto apagado com sucesso!","success"),await Ye()}catch(a){g("Erro",`Não foi possível apagar o produto: ${a.message}`,"error")}}async function _n(e){const t=e.querySelector("#productId").value,a=parseInt(e.querySelector("#productCurrentStock").value),n=parseInt(e.querySelector("#productMinStock").value),o=parseInt(e.querySelector("#productMaxStock").value),s={establishmentId:p.establishmentId,name:e.querySelector("#productName").value,price:parseFloat(e.querySelector("#productPrice").value),commissionRate:parseFloat(e.querySelector("#productCommissionRate").value)||0,currentStock:isNaN(a)?0:a,minStock:isNaN(n)?0:n,maxStock:isNaN(o)?0:o,categoryId:e.querySelector("#productCategory").value||null,photo:e.querySelector("#productPhotoBase64").value};try{t?await Ks(t,s):await Zs(s),document.getElementById("productModal").style.display="none",g("Sucesso",`Produto ${t?"atualizado":"adicionado"} com sucesso!`,"success"),await Ye()}catch(r){throw new Error(r.message)}}function Ea(e,t=800,a=800,n="image/jpeg",o=.8){return new Promise((s,r)=>{if(!e.type.startsWith("image/"))return r(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=d=>{const l=new Image;l.onload=()=>{let c=l.width,m=l.height;c>m?c>t&&(m*=t/c,c=t):m>a&&(c*=a/m,m=a);const u=document.createElement("canvas");u.width=c,u.height=m,u.getContext("2d").drawImage(l,0,0,c,m);const f=u.toDataURL(n,o);s(f)},l.onerror=c=>r(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},i.onerror=d=>r(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function Sa(e=null){const t=document.getElementById("productModal"),n=(p.categories||[]).map(f=>`<option value="${f.id}" ${e?.categoryId===f.id?"selected":""}>${f.name}</option>`).join("");t.innerHTML=`
    <div class="modal-content max-w-3xl overflow-y-auto max-h-[90vh]">
        <form id="productForm">
            <input type="hidden" id="productId" value="${e?.id||""}">
            <input type="hidden" id="productPhotoBase64" value="${e?.photo||""}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="productModalTitle" class="text-2xl font-bold text-gray-800">${e?e.name:"Novo Produto"}</h2>
                <button type="button" data-action="close-modal" data-target="productModal" class="text-2xl font-bold">&times;</button>
            </div>

            <div class="p-0">
                <div class="border-b border-gray-200 mb-6">
                    <nav class="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                        <button type="button" data-tab="dados" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">Dados</button>
                        <button type="button" data-tab="stock" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 ${e?"":"hidden"}">Ajustar Estoque</button>
                    </nav>
                </div>

                <div id="tab-content-dados" class="tab-content space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="md:col-span-1 space-y-4">
                            <div class="form-group"><label>Imagem do Produto</label><div class="mt-1 flex flex-col items-center"><img id="productPhotoPreview" src="${e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto"}" alt="Foto do Produto" class="w-32 h-32 rounded-lg object-cover mb-3 border-4 border-gray-200 bg-gray-50"><input type="file" id="productPhotoInput" class="hidden" accept="image/*"><button type="button" id="productPhotoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar Imagem</button></div></div>
                        </div>
                        <div class="md:col-span-2"><div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                            <div class="form-group sm:col-span-2"><label for="productName">Nome do Produto</label><input type="text" id="productName" value="${e?.name||""}" required class="mt-1 w-full p-2 border rounded-md"></div>
                            <div class="form-group sm:col-span-2"><label for="productCategory">Categoria</label><select id="productCategory" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Sem categoria</option>${n}</select></div>
                            <div class="form-group"><label for="productPrice">Preço (R$)</label><input type="number" id="productPrice" step="0.01" value="${e?.price||""}" required class="mt-1 w-full p-2 border rounded-md"></div>
                            <div class="form-group"><label for="productCommissionRate">Comissão (%)</label><input type="number" id="productCommissionRate" placeholder="Ex: 10" value="${e?.commissionRate||""}" class="mt-1 w-full p-2 border rounded-md"></div>
                        </div></div>
                    </div>
                    <div class="mt-6 pt-6 border-t"><h3 class="text-lg font-semibold text-gray-700 text-left mb-4">Controlo de Stock (Definições)</h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div class="form-group"><label for="productCurrentStock">Atual</label><input type="number" id="productCurrentStock" value="${e?.currentStock||0}" readonly class="mt-1 w-full p-2 border rounded-md bg-gray-100"></div>
                        <div class="form-group"><label for="productMinStock">Mínimo</label><input type="number" id="productMinStock" value="${e?.minStock||0}" class="mt-1 w-full p-2 border rounded-md"></div>
                        <div class="form-group"><label for="productMaxStock">Máximo</label><input type="number" id="productMaxStock" value="${e?.maxStock||0}" class="mt-1 w-full p-2 border rounded-md"></div>
                    </div></div>
                </div>

                <div id="tab-content-stock" class="tab-content hidden space-y-6">
                    <p class="text-sm text-gray-600">Use esta secção para registar entradas (compras) ou saídas (perdas) manuais. O estoque atual é <strong id="currentStockDisplay" class="text-lg">${e?.currentStock||0}</strong>.</p>
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
    </div>`;const o=t.querySelector("#productCategory"),s=t.querySelector("#productPhotoInput");t.querySelector("#productPhotoButton").addEventListener("click",()=>s.click()),o.innerHTML='<option value="">Sem categoria</option>'+(p.categories||[]).map(f=>`<option value="${f.id}" ${e?.categoryId===f.id?"selected":""}>${f.name}</option>`).join(""),e&&(o.value=e.categoryId||"");const r=t.querySelector("#productPhotoPreview"),i=t.querySelector("#productPhotoBase64"),d=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",l=e?.photo||"";s.onchange=async()=>{const f=s.files[0];if(f){r.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const v=await Ea(f,800,800,"image/jpeg",.8),$=v.length*3/4,S=1e3*1024;if($>S)throw new Error("A imagem é muito grande mesmo após a compressão.");r.src=v,i.value=v}catch(v){console.error("Erro ao processar imagem:",v),g("Erro de Imagem",v.message||"Não foi possível processar a imagem.","error"),r.src=d,i.value=l,s.value=""}}};const c=t.cloneNode(!0);t.parentNode.replaceChild(c,t),c.addEventListener("click",async f=>{const v=f.target.closest("button[data-action]");if(!v)return;const k=v.dataset.action,$=c.querySelector("#productId").value;if(k==="close-modal"&&(c.style.display="none"),k==="delete-product"){if(!$)return;c.style.display="none",await Un($)}if(k==="save-product-modal"){const S=c.querySelector("#productForm");if(S){if(!S.querySelector("#productName").value||!S.querySelector("#productPrice").value){g("Erro","Nome e Preço de Venda são obrigatórios.","error");return}const w=v.closest('button[data-action="save-product-modal"]');w.disabled=!0,w.textContent="A salvar...";try{await _n(S)}catch(E){g("Erro",`Falha ao salvar: ${E.message}`,"error"),w.disabled=!1,w.textContent="Salvar Alterações"}}}if(k==="adjust-stock-modal"){f.preventDefault();const S=c.querySelector("#stockAdjustmentAmount"),w=c.querySelector("#stockAdjustmentReason"),E=parseInt(S.value,10),B=parseInt(v.dataset.change,10);if(!E||E<=0){g("Erro","Por favor, insira uma quantidade válida.","error");return}const D=E*B,A=w.value||(D>0?"Entrada manual":"Saída manual");try{await tn($,{change:D,reason:A});const L=p.products.findIndex(M=>M.id===$);if(L>-1){const M=p.products[L].currentStock+D;p.products[L].currentStock=M,c.querySelector("#currentStockDisplay").textContent=M,c.querySelector("#productCurrentStock").value=M,S.value="",w.value="",g("Sucesso","Estoque atualizado!","success"),ra(),ze()}}catch(L){g("Erro de Stock",L.message,"error")}}});const m=c.querySelectorAll(".tab-btn"),u=c.querySelectorAll(".tab-content");m.forEach(f=>{f.addEventListener("click",v=>{v.preventDefault(),m.forEach(k=>{k.classList.remove("border-indigo-500","text-indigo-600"),k.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),f.classList.add("border-indigo-500","text-indigo-600"),f.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),u.forEach(k=>k.classList.add("hidden")),document.getElementById(`tab-content-${f.dataset.tab}`).classList.remove("hidden")})});const b=c.querySelector("#productPhotoInput");c.querySelector("#productPhotoButton").addEventListener("click",()=>b.click()),b.onchange=async()=>{const f=b.files[0];if(!f)return;const v=c.querySelector("#productPhotoPreview"),k=c.querySelector("#productPhotoBase64");v.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const $=await Ea(f,800,800,"image/jpeg",.8),w=$.length*3/4,E=1e3*1024;if(w>E)throw new Error("A imagem é muito grande mesmo após a compressão.");v.src=$,k.value=$}catch($){console.error("Erro ao processar imagem:",$),g("Erro de Imagem",$.message||"Não foi possível processar a imagem.","error"),v.src=d,k.value=l,b.value=""}},c.style.display="flex"}function Wn(){const e=document.getElementById("products-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("productCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(p.categories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${a.name}</option>`)),ra(),ze()}function Jn(){const e=document.getElementById("products-content-container"),t=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const n=a.toISOString().split("T")[0];e.innerHTML=`
        <div class="space-y-6">
             <div class="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 items-end bg-white p-4 rounded-lg shadow-sm">
                <div class="col-span-1"><label for="reportStartDate" class="block text-xs font-medium text-gray-700">De</label><input type="date" id="reportStartDate" value="${n}" class="mt-1 w-full p-2 border rounded-md text-sm"></div>
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
        </div>`;const o=document.getElementById("productFilterReport"),s=document.getElementById("categoryFilterReport");o&&p.products&&(o.innerHTML+=p.products.map(r=>`<option value="${r.id}">${r.name}</option>`).join("")),s&&p.categories&&(s.innerHTML+=p.categories.map(r=>`<option value="${r.id}">${r.name}</option>`).join(""))}async function Gn(){const e=document.getElementById("report-results");e.innerHTML='<div class="loader mx-auto my-8"></div>';const t={startDate:document.getElementById("reportStartDate").value,endDate:document.getElementById("reportEndDate").value,productId:document.getElementById("productFilterReport").value,categoryId:document.getElementById("categoryFilterReport").value};try{const a=await an(t);if(a.length===0){e.innerHTML=`
                <div class="bg-white border rounded-lg shadow-sm p-8">
                    <p class="text-center text-gray-500">Nenhuma movimentação encontrada para este período.</p>
                </div>`;return}const n=`
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
                        ${a.map(s=>`
                            <tr class="hover:bg-gray-50">
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600">${new Date(s.date).toLocaleString("pt-BR")}</td>
                                <td class="px-4 py-3 whitespace-nowrap font-semibold text-gray-800">${s.productName}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center font-bold ${s.change>0?"text-green-600":"text-red-600"}">
                                    ${s.change>0?"+":""}${s.change}
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-500">${s.oldStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-800 font-medium">${s.newStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600 truncate max-w-xs" title="${s.reason}">${s.reason}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600">${s.user}</td>
                            </tr>`).join("")}
                    </tbody>
                </table>
            </div>`,o=`
            <div class="md:hidden space-y-3 pb-20">
                ${a.map(s=>`
                    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <span class="text-xs text-gray-400 font-medium">${new Date(s.date).toLocaleString("pt-BR")}</span>
                                <h4 class="font-bold text-gray-800 text-base line-clamp-1">${s.productName}</h4>
                            </div>
                            <span class="text-lg font-bold ${s.change>0?"text-green-600":"text-red-600"}">
                                ${s.change>0?"+":""}${s.change}
                            </span>
                        </div>
                        
                        <div class="flex items-center justify-between bg-gray-50 p-2 rounded mb-3 text-sm border border-gray-100">
                            <span class="text-gray-500">Estoque:</span>
                            <div class="flex items-center gap-2 font-mono">
                                <span class="text-gray-400">${s.oldStock}</span>
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                <span class="text-gray-800 font-bold">${s.newStock}</span>
                            </div>
                        </div>

                        <div class="flex justify-between items-center text-xs border-t pt-2 border-dashed border-gray-200">
                            <span class="text-gray-600 truncate max-w-[60%] font-medium" title="${s.reason}">
                                ${s.reason||"Sem motivo"}
                            </span>
                            <span class="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                ${s.user||"Sistema"}
                            </span>
                        </div>
                    </div>
                `).join("")}
            </div>`;e.innerHTML=n+o}catch(a){g("Erro",`Não foi possível gerar o relatório: ${a.message}`,"error"),e.innerHTML=`<div class="bg-white border border-red-200 rounded-lg p-8 text-center text-red-500">${a.message}</div>`}}function ra(){const e={ok:0,near_min:0,at_min:0,empty:0};if(!p.products)return;p.products.forEach(s=>{if(!s)return;const r=s.currentStock,i=s.minStock;r<=0?e.empty++:i>0&&r<=i?e.at_min++:i>0&&r<=i*1.2?e.near_min++:e.ok++});const t=document.getElementById("indicator-ok"),a=document.getElementById("indicator-near-min"),n=document.getElementById("indicator-at-min"),o=document.getElementById("indicator-empty");t&&(t.textContent=e.ok),a&&(a.textContent=e.near_min),n&&(n.textContent=e.at_min),o&&(o.textContent=e.empty)}function ze(){const e=document.getElementById("productsList");if(!e)return;const t=document.getElementById("productSearchInput")?.value.toLowerCase()||"",a=document.getElementById("productCategoryFilter")?.value||"all",n=new Map((p.categories||[]).map(s=>[s.id,s.name]));let o=(p.products||[]).filter(Boolean);Y!=="all"&&(o=o.filter(s=>{const r=s.currentStock,i=s.minStock;switch(Y){case"ok":return r>0&&(i===0||r>i*1.2);case"near_min":return i>0&&r>i&&r<=i*1.2;case"at_min":return i>0&&r>0&&r<=i;case"empty":return r<=0;default:return!0}})),o=o.filter(s=>{const r=s.name.toLowerCase().includes(t),i=a==="all"||s.categoryId===a;return r&&i}),e.innerHTML="",o.length>0?(e.className="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 sm:space-y-0",o.forEach(s=>{const r=document.createElement("div"),i=JSON.stringify(s).replace(/'/g,"&apos;");r.className=`product-card bg-white rounded-lg shadow-md flex items-center gap-3 p-3 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 
                              sm:flex-col sm:p-0 sm:items-stretch sm:gap-0`,r.dataset.action="edit-product",r.dataset.product=i;const d=s.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(s.name.charAt(0))}`,l=n.get(s.categoryId)||"N/A";let c="",m="text-gray-500";const u=s.currentStock,b=s.minStock;u<=0?(c='<span class="text-xs font-semibold text-red-600">Esgotado</span>',m="text-red-600 font-semibold"):b>0&&u<=b?(c='<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>',m="text-orange-600 font-semibold"):b>0&&u<=b*1.2?(c='<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>',m="text-blue-600 font-semibold"):(c='<span class="text-xs font-semibold text-green-600">Em Estoque</span>',m="text-green-600 font-semibold"),r.innerHTML=`
                <img src="${d}" alt="Imagem de ${s.name}" class="w-16 h-16 rounded-md object-cover flex-shrink-0 sm:w-full sm:h-24 sm:rounded-b-none">
                
                <div class="flex-1 sm:p-3 sm:flex sm:flex-col sm:flex-grow">
                    <div class="sm:flex-grow">
                        <div class="flex justify-between items-start mb-1 gap-2">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${s.name}</h3>
                            <div class="hidden sm:block">${c}</div>
                        </div>
                        
                        <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${s.price.toFixed(2)}</p>
                        
                        <p class="text-xs text-gray-500 text-left mb-2 hidden sm:block">Categoria: ${l}</p>
                    </div>

                    <div class="flex justify-between items-center mt-2 sm:mt-0">
                        <p class="text-lg font-bold text-indigo-600 text-left sm:hidden">R$ ${s.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-right sm:text-left">
                            Estoque: <span class="font-bold text-base ${m}">${s.currentStock}</span>
                        </p>
                    </div>
                </div>`,e.appendChild(r)})):(e.className="",e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>')}async function Ye(){const e=document.getElementById("products-content-container");e&&(e.innerHTML='<div class="loader col-span-full mx-auto my-8"></div>');try{const[t,a]=await Promise.all([ea(p.establishmentId),xt(p.establishmentId,"products")]);p.products=(t||[]).filter(Boolean),p.categories=(a||[]).filter(Boolean),no(Pe)}catch(t){e&&(e.innerHTML=`<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados: ${t.message}</p>`)}}function no(e){if(document.getElementById("products-content-container")){if(Pe===e&&document.getElementById("products-content-container").children.length>1){Pe==="products"&&(ra(),ze());return}Pe=e,Y="all",document.querySelectorAll("#products-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="products"?Wn():e==="movements"&&Jn()}}async function Yn(){ie.innerHTML=`
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
        </section>`,se&&(ie.removeEventListener("click",se),ie.removeEventListener("input",se),ie.removeEventListener("change",se)),se=async e=>{const t=e.target;if(t.id==="productSearchInput"||t.id==="productCategoryFilter"){ze();return}const a=e.target.closest("button[data-action], button[data-view], .indicator-card[data-action], .product-card[data-action]");if(!a||e.target.closest('[data-action-stop-propagation="true"]'))return;if(a.hasAttribute("data-view")){no(a.dataset.view);return}switch(a.dataset.action){case"new-product":Sa();break;case"edit-product":Sa(JSON.parse(a.dataset.product));break;case"manage-product-categories":Vn();break;case"generate-report":await Gn();break;case"filter-stock":const o=a.dataset.filterType;Y=Y===o?"all":o,document.querySelectorAll(".indicator-card").forEach(s=>{s.classList.toggle("ring-2",s.dataset.filterType===Y),s.classList.toggle("ring-indigo-500",s.dataset.filterType===Y),s.classList.toggle("shadow-lg",s.dataset.filterType===Y)}),ze();break}},ie.addEventListener("click",se),ie.addEventListener("input",se),ie.addEventListener("change",se),Pe="products",Y="all",await Ye()}const Et=document.getElementById("content"),$a={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let K=new Set,Ke=null,ye=null;function Xn(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function Qn(e){return e.length===0?'<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>':e.map(t=>{const a=t.status==="inactive",n=t.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,o=JSON.stringify(t).replace(/'/g,"&apos;");return`
            <div class="professional-card bg-white rounded-lg shadow-md flex items-center gap-4 p-3 cursor-pointer transition-transform transform hover:shadow-lg hover:bg-gray-50
                        sm:flex-col sm:items-stretch sm:p-0 sm:gap-0 ${a?"opacity-50 bg-gray-100":""}" 
                 data-action="open-professional-modal" data-professional='${o}'>
                
                <img src="${n}" alt="Foto de ${t.name}" class="w-16 h-16 rounded-full object-cover flex-shrink-0
                            sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg">
                
                <div class="flex-1 sm:p-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-sm font-bold text-gray-900 text-left sm:text-base">${t.name}</h3>
                            <p class="text-xs text-gray-500 text-left sm:text-sm">${t.specialty||"Especialidade"}</p>
                        </div>
                        <span class="text-xs font-semibold py-1 px-2 rounded-full hidden sm:inline-block ${a?"bg-red-100 text-red-700":"bg-green-100 text-green-700"}">
                            ${a?"Inativo":"Ativo"}
                        </span>
                    </div>
                    <div class="mt-2 pt-2 border-t sm:hidden">
                        <span class="text-xs font-semibold ${a?"text-red-700":"text-green-700"}">${a?"Inativo":"Ativo"}</span>
                    </div>
                    <div class="hidden sm:block mt-3 pt-3 border-t">
                        <p class="text-xs text-gray-600">Serviços: <span class="font-semibold">${t.services?.length||0}</span></p>
                    </div>
                </div>
            </div>`}).join("")}function St(){const e=document.getElementById("genericModal");e.style.display="none",ye&&e.removeEventListener("click",ye)}async function Zn(e){const t=document.getElementById("genericModal"),a=e.id?e:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},n=p.services||await Ie(p.establishmentId),o=p.professionals||await _(p.establishmentId),s=`
        <div class="modal-content max-w-5xl p-0 overflow-y-auto max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b">
                <h2 class="text-2xl font-bold text-gray-800">${a.name}</h2>
                <button data-action="close-modal" class="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
            </div>
            <div class="modal-tabs px-6 border-b flex items-center overflow-x-auto">
                <button class="tab-link active whitespace-nowrap" data-tab="cadastro">Cadastro</button>
                <button class="tab-link whitespace-nowrap" data-tab="jornada">Jornada</button>
                <button class="tab-link whitespace-nowrap" data-tab="bloqueios">Bloqueios</button>
            </div>
            <div class="modal-body p-6 bg-gray-50 flex-1 overflow-y-auto"> 
                <div id="cadastro" class="tab-content active"><form id="professionalForm" class="space-y-6"></form></div>
                <div id="jornada" class="tab-content hidden"></div>
                <div id="bloqueios" class="tab-content hidden"></div>
            </div>
            <div class="modal-footer px-6 py-4 bg-gray-100 flex justify-between items-center">
                
                <button 
                    type="button" 
                    data-action="delete-professional" 
                    data-id="${a.id||""}" 
                    class="text-red-600 hover:text-red-800 transition-colors ${a.id?"":"hidden"}" 
                    title="Excluir Profissional"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>

                <div class="flex gap-2">
                    <button data-action="close-modal" class="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                    <button type="button" data-action="save-professional" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar</button>
                </div>
            </div>
        </div>`;t.innerHTML=s,t.style.display="flex",Kn(a,n),tr(a),ar(a,o),sr(a)}function Kn(e,t){const a=document.getElementById("professionalForm"),n=e.dob?e.dob.split("/"):["",""],o=Array.from({length:12},(u,b)=>{const f=b+1,v=f==n[1]?"selected":"",k=new Date(0,b).toLocaleString("pt-BR",{month:"long"});return`<option value="${f}" ${v}>${k.charAt(0).toUpperCase()+k.slice(1)}</option>`}).join(""),s=e.status||"active";a.innerHTML=`
        <input type="hidden" id="professionalId" value="${e.id||""}">
        <input type="hidden" id="profPhotoBase64" value="${e.photo||""}">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-1 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Foto de Perfil</label>
                    <div class="mt-1 flex flex-col items-center">
                        <img id="profPhotoPreview" src="${e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`}" alt="Foto de Perfil" class="w-32 h-32 rounded-full object-cover mb-3 border-4 border-gray-200">
                        <input type="file" id="profPhotoInput" class="hidden" accept="image/*">
                        <button type="button" id="profPhotoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar Foto</button>
                    </div>
                </div>
                 <div class="form-group">
                    <label for="profStatus">Status</label>
                    <select id="profStatus" class="mt-1 w-full p-2 border rounded-md bg-white">
                        <option value="active" ${s!=="inactive"?"selected":""}>Ativo</option>
                        <option value="inactive" ${s==="inactive"?"selected":""}>Inativo</option>
                    </select>
                </div>
            </div>

            <div class="md:col-span-2 space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="form-group"><label for="profName">Nome</label><input type="text" id="profName" value="${e.name||""}" required class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profSpecialty">Especialidade</label><input type="text" id="profSpecialty" value="${e.specialty||""}" required class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profPhone">Número de telefone</label><input type="tel" id="profPhone" value="${e.phone||""}" class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profDobDay">Aniversário (Dia)</label><input type="number" id="profDobDay" value="${n[0]}" min="1" max="31" class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profDobMonth">Aniversário (Mês)</label><select id="profDobMonth" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Selecione...</option>${o}</select></div>
                    <div class="form-group"><label for="profOrderOnAgenda">Ordem na agenda</label><input type="number" id="profOrderOnAgenda" value="${e.orderOnAgenda||"1"}" min="1" class="mt-1 w-full p-2 border rounded-md"></div>
                </div>
                 <div class="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div class="form-group"><label for="profCommission">Recebe comissão?</label><select id="profCommission" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="sim" ${e.receivesCommission?"selected":""}>Sim</option><option value="nao" ${e.receivesCommission?"":"selected"}>Não</option></select></div>
                    <div class="form-group"><label for="profShowOnAgenda">Mostrar na agenda</label><select id="profShowOnAgenda" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="sim" ${e.showOnAgenda!==!1?"selected":""}>Sim</option><option value="nao" ${e.showOnAgenda===!1?"selected":""}>Não</option></select></div>
                </div>
            </div>
        </div>

        <div><label class="block text-sm font-medium text-gray-700">Serviços Realizados</label><div id="profServicesContainer" class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-md bg-white max-h-48 overflow-y-auto">${t.map(u=>`<label class="flex items-center space-x-2"><input type="checkbox" value="${u.id}" class="rounded" ${e.services?.includes(u.id)?"checked":""}><span>${u.name}</span></label>`).join("")}</div></div>
        <div class="form-group"><label for="profNotes">Observações</label><textarea id="profNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${e.notes||""}</textarea></div>`;const r=document.getElementById("profPhotoInput"),i=document.getElementById("profPhotoButton"),d=document.getElementById("profPhotoPreview"),l=document.getElementById("profPhotoBase64"),c=e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,m=e.photo||"";i&&i.addEventListener("click",()=>r.click()),r&&(r.onchange=async()=>{const u=r.files[0];if(u){d.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const b=await er(u,800,800,"image/jpeg",.8);d.src=b,l.value=b}catch(b){g("Erro de Imagem",b.message||"Não foi possível processar a imagem.","error"),d.src=c,l.value=m,r.value=""}}})}function er(e,t=800,a=800,n="image/jpeg",o=.8){return new Promise((s,r)=>{if(!e.type.startsWith("image/"))return r(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=d=>{const l=new Image;l.onload=()=>{let c=l.width,m=l.height;c>m?c>t&&(m*=t/c,c=t):m>a&&(c*=a/m,m=a);const u=document.createElement("canvas");u.width=c,u.height=m,u.getContext("2d").drawImage(l,0,0,c,m);const f=u.toDataURL(n,o);s(f)},l.onerror=c=>r(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},i.onerror=d=>r(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function tr(e){const t=document.getElementById("jornada");t.innerHTML='<div><h3 class="text-xl font-semibold mb-4">Jornada de Trabalho Semanal</h3><p class="text-sm text-gray-600 mb-4">Defina os horários de trabalho padrão para este profissional.</p><div id="profScheduleContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div></div>',or(t.querySelector("#profScheduleContainer"),e.workingHours||{})}async function ar(e,t){const a=document.getElementById("bloqueios");a.innerHTML=`
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h3 class="text-xl font-semibold mb-4">Lançamento de Bloqueios</h3>
                <form id="batchBlockageForm" class="p-4 bg-white rounded-lg shadow-inner space-y-3 mb-4">
                    <h4 class="font-semibold text-gray-800">Selecione os Profissionais</h4>
                    <div id="batchProfSelectionContainer" class="max-h-32 overflow-y-auto p-2 border rounded-md space-y-2">
                        ${t.map(s=>`<label class="flex items-center"><input type="checkbox" name="batch-professionals" value="${s.id}" class="rounded mr-2" ${s.id===e.id?"checked":""}><span>${s.name}</span></label>`).join("")}
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div><label for="batchBlockageStartDate" class="text-sm">Data Início</label><input type="date" id="batchBlockageStartDate" required class="w-full p-2 border rounded-md"></div>
                        <div><label for="batchBlockageEndDate" class="text-sm">Data Fim (Opcional)</label><input type="date" id="batchBlockageEndDate" class="w-full p-2 border rounded-md"></div>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div><label class="text-sm">Início</label><input type="time" id="batchBlockageStartTime" required class="w-full p-2 border rounded-md"></div>
                        <div><label class="text-sm">Fim</label><input type="time" id="batchBlockageEndTime" required class="w-full p-2 border rounded-md"></div>
                    </div>
                    <div><label class="text-sm">Motivo</label><input type="text" id="batchBlockageReason" placeholder="Ex: Feriado, Evento" class="w-full p-2 border rounded-md"></div>
                    <button type="submit" class="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600">Lançar Bloqueio em Lote</button>
                </form>
            </div>
            <div>
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold">Bloqueios de ${e.name}</h3>
                    <select id="prof-blockages-filter" class="p-1 border rounded text-sm bg-white">
                        <option value="future">Futuros</option>
                        <option value="history">Histórico</option>
                    </select>
                </div>
                <div id="blockagesList" class="space-y-2 max-h-96 overflow-y-auto pr-2"></div>
            </div>
        </div>`;const n=document.getElementById("batchBlockageForm");n&&n.addEventListener("submit",async s=>{s.preventDefault();const r=Array.from(s.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(b=>b.value);if(r.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const i=s.target.batchBlockageStartDate.value,d=s.target.batchBlockageEndDate.value||i,l=s.target.batchBlockageStartTime.value,c=s.target.batchBlockageEndTime.value,m=s.target.batchBlockageReason.value;if(!i||!l||!c)return g("Atenção","Preencha Data de Início, Início e Fim.","error");const u=r.map(b=>{const f={professionalId:b,establishmentId:p.establishmentId,startTime:new Date(`${i}T${l}`).toISOString(),endTime:new Date(`${d}T${c}`).toISOString(),reason:m};return vt(f)});try{await Promise.all(u),g("Sucesso!",`${r.length} bloqueios foram criados.`);const b=document.getElementById("prof-blockages-filter").value;Ae(e.id,b)}catch(b){g("Erro",b.message,"error")}}),document.getElementById("prof-blockages-filter").addEventListener("change",s=>Ae(e.id,s.target.value)),await Ae(e.id,"future")}function or(e,t){e.innerHTML=Object.keys($a).map(a=>{const n=t[a]||{},o=n.active!==!1;return`
            <div class="day-schedule-card p-3 rounded-lg ${o?"bg-white":"bg-gray-100 disabled"} border">
                 <div class="flex justify-between items-center"><span class="font-semibold text-gray-800">${$a[a]}</span><label class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" data-day="${a}" data-field="active" class="sr-only" ${o?"checked":""}><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div></label></div>
                <div class="time-inputs grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><label>Início:</label><input type="time" data-day="${a}" data-field="start" value="${n.start||"09:00"}" class="w-full p-1 border rounded" ${o?"":"disabled"}></div>
                    <div><label>Fim:</label><input type="time" data-day="${a}" data-field="end" value="${n.end||"18:00"}" class="w-full p-1 border rounded" ${o?"":"disabled"}></div>
                    <div><label>Intervalo:</label><input type="time" data-day="${a}" data-field="breakStart" value="${n.breakStart||"12:00"}" class="w-full p-1 border rounded" ${o?"":"disabled"}></div>
                    <div><label>Fim Int.:</label><input type="time" data-day="${a}" data-field="breakEnd" value="${n.breakEnd||"13:00"}" class="w-full p-1 border rounded" ${o?"":"disabled"}></div>
                </div>
            </div>`}).join(""),e.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",n=>{const o=n.target.closest(".day-schedule-card"),s=!n.target.checked;o.classList.toggle("bg-white",!s),o.classList.toggle("bg-gray-100",s),o.classList.toggle("disabled",s),o.querySelectorAll(".time-inputs input").forEach(r=>r.disabled=s)})})}async function Ae(e,t="future"){const a=document.getElementById("blockagesList");if(a){a.innerHTML='<div class="loader mx-auto"></div>';try{const n=new Date;let o,s;t==="history"?(s=new Date,o=new Date,o.setFullYear(o.getFullYear()-2)):(o=new Date,s=new Date,s.setFullYear(s.getFullYear()+2));let i=(await bt(p.establishmentId,o.toISOString(),s.toISOString(),e)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));t==="history"?i=i.filter(l=>l.endTime<n).sort((l,c)=>c.startTime-l.startTime):i=i.filter(l=>l.endTime>=n).sort((l,c)=>l.startTime-c.startTime);const d=i.reduce((l,c)=>{const m=c.reason||"Sem motivo";return l[m]||(l[m]=[]),l[m].push(c),l},{});if(Object.keys(d).length===0){a.innerHTML=`<p class="text-center text-gray-500 text-sm py-4">Nenhum bloqueio ${t==="history"?"no histórico":"futuro"}.</p>`;return}a.innerHTML=Object.entries(d).map(([l,c])=>`
            <div class="bg-gray-100 rounded-lg p-3 my-2 space-y-2">
                <div class="flex justify-between items-center pb-2 border-b">
                    <h4 class="font-bold text-gray-700">${l} (${c.length})</h4>
                    ${c.length>1?`<button data-action="batch-delete-blockage" data-ids='${JSON.stringify(c.map(m=>m.id))}' class="text-xs text-red-600 font-semibold hover:underline">Apagar Todos (${c.length})</button>`:""}
                </div>
                ${c.map(m=>`
                    <div class="flex justify-between items-center bg-white p-2 rounded-md text-sm border">
                        <p class="text-xs text-gray-500">
                           ${m.startTime.toLocaleDateString("pt-BR")} 
                           <span class="text-gray-400 mx-1">|</span> 
                           ${m.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${m.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}
                        </p>
                        <button data-action="delete-blockage" data-id="${m.id}" class="text-red-500 p-1 rounded-full hover:bg-red-100" title="Apagar">&times;</button>
                    </div>
                `).join("")}
            </div>
        `).join("")}catch(n){a.innerHTML=`<p class="text-red-500">${n.message}</p>`}}}function sr(e){const t=document.getElementById("genericModal");ye&&t.removeEventListener("click",ye),ye=async a=>{const n=a.target.closest("button[data-action]");if(!n){const s=a.target.closest(".tab-link");s&&(t.querySelectorAll(".tab-link").forEach(r=>r.classList.remove("active")),s.classList.add("active"),t.querySelectorAll(".tab-content").forEach(r=>r.classList.add("hidden")),document.getElementById(s.dataset.tab).classList.remove("hidden"));return}const o=n.dataset.action;switch(a.stopPropagation(),o){case"close-modal":St();break;case"delete-professional":const s=n.dataset.id;if(await T("Excluir Profissional",`Tem certeza que deseja excluir ${e.name}? Esta ação não pode ser desfeita.`))try{await as(s),g("Sucesso!","Profissional excluído.","success"),St(),pt()}catch(v){g("Erro",`Não foi possível excluir: ${v.message}`,"error")}break;case"save-professional":const i=document.getElementById("professionalForm"),d=n,l=document.getElementById("profScheduleContainer"),c=Array.from(i.querySelectorAll("#profServicesContainer input:checked")).map(v=>v.value),m={};l&&l.querySelectorAll(".day-schedule-card").forEach(v=>{const k=v.querySelector('[data-field="active"]').dataset.day;m[k]={active:v.querySelector('[data-field="active"]').checked,start:v.querySelector('[data-field="start"]').value,end:v.querySelector('[data-field="end"]').value,breakStart:v.querySelector('[data-field="breakStart"]').value,breakEnd:v.querySelector('[data-field="breakEnd"]').value}});const u={...e,id:i.querySelector("#professionalId").value||void 0,name:i.querySelector("#profName").value,specialty:i.querySelector("#profSpecialty").value,photo:i.querySelector("#profPhotoBase64").value,services:c,workingHours:m,phone:i.querySelector("#profPhone").value,dob:`${i.querySelector("#profDobDay").value}/${i.querySelector("#profDobMonth").value}`,receivesCommission:i.querySelector("#profCommission").value==="sim",showOnAgenda:i.querySelector("#profShowOnAgenda").value==="sim",orderOnAgenda:parseInt(i.querySelector("#profOrderOnAgenda").value)||1,notes:i.querySelector("#profNotes").value,status:i.querySelector("#profStatus").value};d.disabled=!0,d.textContent="A salvar...";try{u.id?(await ts(u.id,u),g("Sucesso!","Profissional atualizado.","success")):(delete u.id,await es(u),g("Sucesso!","Profissional criado.","success")),St(),pt()}catch(v){g("Erro",v.message,"error"),d.disabled=!1,d.textContent="Salvar"}break;case"delete-blockage":const b=n.dataset.id;if(await T("Apagar Bloqueio","Tem certeza?"))try{await Qt(b),g("Bloqueio removido.","success");const v=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";Ae(e.id,v)}catch(v){g("Erro",v.message,"error")}break;case"batch-delete-blockage":const f=JSON.parse(n.dataset.ids);if(await T("Apagar em Lote",`Tem certeza que deseja apagar ${f.length} bloqueios com este motivo?`))try{await Ga(f),g("Bloqueios removidos.","success");const v=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";Ae(e.id,v)}catch(v){g("Erro",v.message,"error")}break}},t.addEventListener("click",ye)}function jt(){const e=document.getElementById("batch-actions-container"),t=document.getElementById("selected-count");!e||!t||(K.size>0?(t.textContent=`${K.size} selecionado(s)`,e.classList.remove("hidden")):e.classList.add("hidden"))}function nr(){T("Excluir em Lote",`Tem certeza que deseja excluir ${K.size} profissionais? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{await(void 0)(Array.from(K)),g("Sucesso!",`${K.size} profissionais foram excluídos.`,"success"),K.clear(),jt(),pt()}catch(t){g("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}function Le(){const e=document.getElementById("professionalsList");if(!e)return;if(!p.professionals){e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Xn();return}const t=document.getElementById("showInactiveProfToggle").checked,a=document.getElementById("profSearchInput").value.toLowerCase(),n=p.professionals.filter(o=>{const s=o.name.toLowerCase().includes(a),r=t||o.status!=="inactive";return s&&r});e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Qn(n)}async function pt(){K.clear(),Et.innerHTML=`
        <section id="professional-list-view" class="p-4 sm:p-6">
            <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div class="sticky top-0 z-10 bg-white pt-2 pb-4 mb-6 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 px-4 sm:px-6 rounded-t-lg border-b border-gray-200">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">Sua Equipe</h2>
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                        <input type="search" id="profSearchInput" placeholder="Pesquisar por nome..." class="w-full md:w-64 p-2 border rounded-md shadow-sm">
                        
                        <div class="flex items-center gap-4">
                            <label class="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" id="showInactiveProfToggle" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                                <span class="text-sm font-medium text-gray-700">Mostrar Inativos</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div id="batch-actions-container" class="hidden bg-indigo-600 text-white p-3 rounded-lg shadow-md mb-6 flex justify-between items-center">
                    <span id="selected-count" class="font-semibold"></span>
                    <div>
                        <button data-action="batch-delete" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Excluir Selecionados</button>
                    </div>
                </div>

                <div id="professionalsList" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
                    </div>
            </div>
            
            <button data-action="open-professional-modal" data-professional="{}" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>`,Ke&&Et.removeEventListener("click",Ke),Ke=t=>{const a=t.target.closest('[data-action="open-professional-modal"]'),n=t.target.closest('[data-action="batch-delete"]');if(a){t.preventDefault();let s={};if(a.dataset.professional)try{s=JSON.parse(a.dataset.professional)}catch(r){console.error("Erro ao fazer parse do professional data:",r);return}Zn(s);return}if(n){nr();return}const o=t.target.closest(".professional-checkbox");if(o){const s=o.dataset.id;o.checked?K.add(s):K.delete(s),Le(),jt();return}},Et.addEventListener("click",Ke),document.getElementById("profSearchInput").addEventListener("input",Le),document.getElementById("showInactiveProfToggle").addEventListener("change",Le);const e=document.getElementById("professionalsList");p.professionals=null,p.services=null,Le();try{const[t,a]=await Promise.all([_(p.establishmentId),Ie(p.establishmentId)]);p.professionals=t,p.services=a,Le(),jt()}catch{e.innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar dados da página.</p>'}}const $t=document.getElementById("content");let Q=[],qe={},N=null,Ot="list",O="all",zt="O Estabelecimento";const rr=(e,t)=>`Olá, ${e}! Nós da ${t} desejamos a você um Feliz Aniversário! Esperamos que seu dia seja maravilhoso. Venha comemorar conosco! 🎉🎂`,ir=(e,t)=>`Oi, ${e}! Faz um tempo que não te vemos aqui no(a) ${t}. Sentimos sua falta! Temos novidades/ofertas especiais para você. Que tal agendar seu horário?`,lr=[{value:30,label:"30 dias"},{value:60,label:"60 dias"},{value:90,label:"90 dias"},{value:120,label:"120 dias"}];function dr(){return Math.floor(Math.random()*140)+10}function cr(e){if(!e.dob)return!1;const t=e.dob.split("/");if(t.length!==2)return!1;const a=new Date,n=a.getDate(),o=a.getMonth()+1,s=parseInt(t[0],10),r=parseInt(t[1],10);return s===n&&r===o}const mr=[{value:99,label:"Aniversariantes de Hoje"},{value:0,label:"Todos os meses (com DOB)"},{value:1,label:"Janeiro"},{value:2,label:"Fevereiro"},{value:3,label:"Março"},{value:4,label:"Abril"},{value:5,label:"Maio"},{value:6,label:"Junho"},{value:7,label:"Julho"},{value:8,label:"Agosto"},{value:9,label:"Setembro"},{value:10,label:"Outubro"},{value:11,label:"Novembro"},{value:12,label:"Dezembro"}];function Ia(){return mr.map(e=>{let t="";return e.value===99&&(t="selected"),`<option value="${e.value}" ${t}>${e.label}</option>`}).join("")}function Ca(){return lr.map(e=>{const t=e.value===90?"selected":"";return`<option value="${e.value}" ${t}>${e.label}</option>`}).join("")}function ur(e,t){const a=`w-5 h-5 ${t} mr-2`;switch(e){case"cadastro":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`;case"agendamentos":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`;case"historico":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2h-2.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-1.414 0l-1.414-1.414A1 1 0 009.586 17H7a2 2 0 01-2-2v-2a2 2 0 012-2h12z" /></svg>`;case"fidelidade":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.5a9.5 9.5 0 1019 0 9.5 9.5 0 00-19 0z" /></svg>`;default:return""}}function pr(e="cadastro"){const t=[{id:"cadastro",label:"Cadastro"},{id:"agendamentos",label:"Próximos Agend."},{id:"historico",label:"Histórico"},{id:"fidelidade",label:"Fidelidade"}],a=document.getElementById("client-detail-tabs");a&&(a.innerHTML=t.map(n=>{const o=e===n.id,s=o?"text-indigo-600":"text-gray-500";return`
            <button data-tab="${n.id}" class="tab-btn whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors flex items-center ${o?"border-indigo-500 text-indigo-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}">
                ${ur(n.id,s)}
                ${n.label}
            </button>
        `}).join(""),a.querySelectorAll(".tab-btn").forEach(n=>{n.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),Vt(n.dataset.tab)})}))}async function Vt(e){pr(e);const t=document.getElementById("client-detail-content");if(t)switch(t.innerHTML='<form id="client-form" class="p-6 space-y-4"><div class="loader mx-auto my-8"></div></form>',e){case"cadastro":t.innerHTML=gr(N);break;case"agendamentos":case"historico":try{const n=await $s(p.establishmentId,N.name,N.phone);t.innerHTML=fr(n,e)}catch(n){console.error("Erro ao carregar histórico do cliente:",n),t.innerHTML=`<form id="client-form" class="p-6 space-y-4"><p class="text-center text-red-500">Erro ao carregar o histórico: ${n.message}</p></form>`}break;case"fidelidade":const a=await Is(p.establishmentId,N.name,N.phone);t.innerHTML=br(N,a);break;default:t.innerHTML='<form id="client-form" class="p-6 space-y-4"><p class="p-4 text-center text-gray-500">Secção não implementada.</p></form>'}}function gr(e){const t=e?.dob?e.dob.split("/"):["",""];return`
        <form id="client-form" class="p-6 space-y-4">
            <input type="hidden" id="clientId" value="${e?.id||""}">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="clientName" class="block text-sm font-medium text-gray-700">Nome</label>
                    <input type="text" id="clientName" value="${e?.name||""}" class="mt-1 w-full p-2 border border-gray-300 rounded-md" required>
                </div>
                <div>
                    <label for="clientEmail" class="block text-sm font-medium text-gray-700">E-mail</label>
                    <input type="email" id="clientEmail" value="${e?.email||""}" class="mt-1 w-full p-2 border border-gray-300 rounded-md">
                </div>
                <div>
                    <label for="clientPhone" class="block text-sm font-medium text-gray-700">Telefone</label>
                    <input type="tel" id="clientPhone" value="${e?.phone||""}" class="mt-1 w-full p-2 border border-gray-300 rounded-md" required>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label for="clientDobDay" class="block text-sm font-medium text-gray-700">Aniversário (dia)</label>
                        <input type="number" id="clientDobDay" value="${t[0]}" min="1" max="31" class="mt-1 w-full p-2 border border-gray-300 rounded-md">
                    </div>
                    <div>
                        <label for="clientDobMonth" class="block text-sm font-medium text-gray-700">(mês)</label>
                        <input type="number" id="clientDobMonth" value="${t[1]}" min="1" max="12" class="mt-1 w-full p-2 border border-gray-300 rounded-md">
                    </div>
                </div>
            </div>
            <div>
                <label for="clientNotes" class="block text-sm font-medium text-gray-700">Observações</label>
                <textarea id="clientNotes" rows="4" class="mt-1 w-full p-2 border border-gray-300 rounded-md">${e?.notes||""}</textarea>
            </div>
        </form>
    `}function fr(e,t){const a=t==="agendamentos"?"Próximos Agendamentos":"Histórico de Visitas",n=t==="agendamentos"?"Nenhum agendamento futuro.":"Nenhum histórico de visitas.",o=new Date;o.setHours(0,0,0,0);const s=t==="agendamentos",r=(e||[]).filter(i=>{const d=new Date(i.date);return s?d>=o:d<o});return r.sort((i,d)=>s?new Date(i.date).getTime()-new Date(d.date).getTime():new Date(d.date).getTime()-new Date(i.date).getTime()),r.length===0?`<form id="client-form" class="p-6 space-y-4"><p class="p-4 text-center text-gray-500">${n}</p></form>`:`
        <form id="client-form" class="p-6 space-y-4">
            <div class="space-y-3 max-h-96 overflow-y-auto">
                <h4 class="font-semibold text-lg mb-2">${a}</h4>
                ${r.map(i=>{const d=new Date(i.date)<o;return`
                        <div class="bg-gray-50 p-3 rounded-lg cursor-pointer flex justify-between items-center ${d?"hover:bg-indigo-50":""}"
                            data-action="${d?"open-comanda-from-history":"view-appointment"}" 
                            data-appointment-id="${i.id}"
                            data-appointment-date="${i.date}"> 
                            
                            <div>
                                <p class="font-semibold text-gray-800">${i.serviceName}</p>
                                <p class="text-sm text-gray-500">${new Date(i.date).toLocaleDateString("pt-BR",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
                            </div>

                            ${d?`
                                <span class="text-xs font-semibold text-indigo-600">VER GASTOS</span>
                            `:`
                                <span class="text-xs font-semibold text-green-600">VER DETALHES</span>
                            `}
                        </div>
                    `}).join("")}
            </div>
        </form>
    `}function br(e,t){const a=e.loyaltyPoints||0;let n='<p class="text-sm text-gray-500">O programa de fidelidade não está ativo.</p>';qe.enabled&&qe.tiers&&(n=qe.tiers.map(s=>{const r=a>=s.points;return`
                <div class="flex justify-between items-center p-3 rounded-lg ${r?"bg-green-50":"bg-gray-100"}">
                    <div>
                        <p class="font-semibold ${r?"text-green-800":"text-gray-800"}">${s.reward}</p>
                        <p class="text-sm ${r?"text-green-600":"text-gray-500"}">${s.points} Pontos</p>
                    </div>
                    <button data-action="redeem-reward" data-points="${s.points}" data-reward="${s.reward}" ${r?"":"disabled"}
                        class="py-1 px-3 text-sm font-semibold rounded-lg ${r?"bg-green-600 text-white hover:bg-green-700":"bg-gray-300 text-gray-500 cursor-not-allowed"}">
                        Resgatar
                    </button>
                </div>`}).join(""));const o=t.length>0?t.map(s=>`
        <div class="text-sm flex justify-between items-center">
            <div>
                <p class="font-medium text-gray-700">${s.type==="earn"?"Ganhou por visita":`Resgatou: ${s.reward}`}</p>
                <p class="text-xs text-gray-500">${s.timestamp}</p>
            </div>
            <p class="font-bold ${s.type==="earn"?"text-green-600":"text-red-600"}">${s.points} pts</p>
        </div>
    `).join('<hr class="my-2">'):'<p class="text-sm text-gray-500">Nenhum histórico de pontos.</p>';return`
        <form id="client-form" class="p-6 space-y-4">
            <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 class="font-semibold text-lg mb-2">Pontos e Prémios</h4>
                    <div class="text-center bg-indigo-50 p-4 rounded-lg mb-4">
                        <p class="text-indigo-900 font-bold text-4xl">${a}</p>
                        <p class="text-indigo-700 font-semibold">Pontos Atuais</p>
                    </div>
                    <div class="space-y-2 max-h-64 overflow-y-auto">${n}</div>
                </div>
                <div>
                    <h4 class="font-semibold text-lg mb-2">Histórico de Pontos</h4>
                    <div class="space-y-2 max-h-80 overflow-y-auto">${o}</div>
                </div>
            </div>
        </form>
    `}function Ut(e){N=e,Ot="detail";const t=e!==null,a=t?"Editar Cliente":"Adicionar Cliente",n=`
        <div class="flex flex-col h-full">
            <div id="client-detail-tabs" class="flex flex-row overflow-x-auto bg-gray-50 border-b border-gray-200">
                </div>
            
            <div id="client-detail-content" class="flex-1 overflow-y-auto">
                </div>
            
            <footer class="p-4 bg-gray-50 border-t flex justify-between items-center flex-shrink-0">
                
                <button 
                    type="button" 
                    id="deleteClientBtn" 
                    data-action="delete-client" 
                    class="text-red-600 hover:text-red-800 transition-colors ${t?"":"hidden"}"
                    title="Excluir Cliente"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>

                <div class="flex gap-3">
                    <button type="button" id="cancelDetailViewBtn" data-action="close-detail-view" class="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button type="submit" form="client-form" data-action="save-client" class="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">Salvar</button>
                </div>
            </footer>
        </div>
    `,o=window.innerWidth<768,s=o?"max-w-full":"max-w-3xl";if(j({title:a,contentHTML:n,maxWidth:s}),o){const c=document.getElementById("genericModal");if(c){const m=c.querySelector(`.${s.replace(":","\\:")}`);m&&(m.style.height="auto",m.style.maxHeight="85vh",m.style.borderRadius="1rem")}}const r=document.getElementById("genericModal");r&&r.addEventListener("click",async c=>{const m=c.target.closest("[data-action]");if(!m)return;switch(m.dataset.action){case"redeem-reward":{const b=parseInt(m.dataset.points,10),f=m.dataset.reward;if(await T("Confirmar Resgate",`Deseja resgatar "${f}" por ${b} pontos?`))try{await Cs(p.establishmentId,N.name,N.phone,{points:b,reward:f}),g("Prémio resgatado com sucesso!","success"),Q=await We(p.establishmentId);const $=Q.find(S=>S.id===N.id);$&&(N=$),Vt("fidelidade")}catch(k){g(`Erro ao resgatar: ${k.message}`,"error")}break}case"open-comanda-from-history":{const b=m.dataset.appointmentId;b&&(document.getElementById("genericModal").style.display="none",F("comandas-section",{selectedAppointmentId:b,initialFilter:"finalizada"}));break}case"view-appointment":{const b=m.dataset.appointmentId,f=m.dataset.appointmentDate;b&&f&&(document.getElementById("genericModal").style.display="none",F("agenda-section",{targetDate:f,scrollToAppointmentId:b}));break}}}),Vt("cadastro");const i=document.getElementById("client-form");i&&i.addEventListener("submit",c=>{c.preventDefault(),vr()});const d=document.getElementById("cancelDetailViewBtn");d&&d.addEventListener("click",c=>{c.preventDefault(),document.getElementById("genericModal").style.display="none",wt()});const l=document.getElementById("deleteClientBtn");l&&l.addEventListener("click",async()=>{await hr()})}async function vr(){const e=document.getElementById("client-form");if(!e)return;const t=e.querySelector("#clientId").value,a={name:e.querySelector("#clientName").value,email:e.querySelector("#clientEmail").value,phone:e.querySelector("#clientPhone").value,dob:`${e.querySelector("#clientDobDay").value}/${e.querySelector("#clientDobMonth").value}`,notes:e.querySelector("#clientNotes").value,establishmentId:p.establishmentId};if(!a.name||!a.phone){g("Erro","Nome e Telefone são obrigatórios.","error");return}try{t?(await Es(t,a),g("Sucesso","Cliente atualizado com sucesso!","success")):(await Zt(a),g("Sucesso","Cliente cadastrado com sucesso!","success")),document.getElementById("genericModal").style.display="none",await wt()}catch(n){g("Erro",`Não foi possível salvar: ${n.message}`,"error")}}async function hr(){if(!N||!N.id)return;if(await T("Excluir Cliente",`Tem certeza que deseja excluir ${N.name}? Esta ação é irreversível.`))try{await Ss(N.id),g("Sucesso","Cliente excluído.","success"),document.getElementById("genericModal").style.display="none",await wt()}catch(t){g("Erro",`Não foi possível excluir: ${t.message}`,"error")}}function it(e,t){const a=document.getElementById("clientsList");if(a)if(a.innerHTML="",document.getElementById("client-count").textContent=`${e.length} cliente${e.length!==1?"s":""} | Total: ${t}`,e.length>0){const n=O==="inactive",o=O==="birthdays";e.forEach(s=>{const r=document.createElement("div");r.className="client-card bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer",r.dataset.clientId=s.id;const i=s.loyaltyPoints||0,d=qe.enabled?`${i} pts`:`R$ ${i.toFixed(2)}`;let l="";const m=`https://wa.me/55${s.phone?s.phone.replace(/\D/g,""):""}?text=`;if(n){const u=encodeURIComponent(ir(s.name,zt));l=`
                    <a href="${m+u}" target="_blank" title="Enviar Mensagem de Recuperação (WhatsApp)" class="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full flex-shrink-0 ml-2 shadow-md">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                    </a>`}else if(o&&cr(s)){const b=encodeURIComponent(rr(s.name,zt));l=`
                        <a href="${m+b}" target="_blank" title="Enviar Parabéns por WhatsApp" class="text-white bg-green-500 hover:bg-green-600 p-2 rounded-full flex-shrink-0 ml-2 shadow-md">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.333 0 2-1 2-2s-.667-2-2-2-2 1-2 2 .667 2 2 2zM2 15h20M7 15l2 6h6l2-6M7 15a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2"/></svg>
                        </a>`}r.innerHTML=`
                <div class="flex items-center mb-3">
                    <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl flex-shrink-0">
                        ${s.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="ml-4 flex-grow min-w-0">
                        <p class="font-bold text-gray-800 truncate">${s.name}</p>
                        <p class="text-sm text-gray-500 md:hidden">${s.phone}</p>
                    </div>
                    ${l}
                </div>
                
                <div class="flex md:grid md:grid-cols-[1fr_1fr_3rem] items-center text-sm pt-2 border-t">
                    <div class="flex-1 md:w-auto">
                        <span class="font-semibold text-gray-700">Saldo/Pontos:</span>
                        <span class="font-bold text-indigo-600 ml-1">${d}</span>
                    </div>
                    <div class="hidden md:flex justify-start md:justify-end items-center">
                        <span class="font-semibold text-gray-700">Telefone:</span>
                        <span class="text-gray-600 ml-1">${s.phone}</span>
                    </div>
                    <button class="text-gray-500 hover:text-indigo-600 p-1 rounded-full justify-self-end ml-2 md:ml-0" title="Ação">
                         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M18 12a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
                    </button>
                </div>
            `,r.addEventListener("click",()=>Ut(s)),a.appendChild(r)})}else a.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum cliente encontrado com os filtros aplicados.</p>'}function lt(e="",t="all"){const a=e.toLowerCase(),n=a.length>0;let o=0,s=90;const r=window.innerWidth<768;if(t==="birthdays"){const d=r?"mobileBirthMonthFilter":"birthMonthFilter",l=document.getElementById(d);l&&(o=parseInt(l.value,10))}else if(t==="inactive"){const d=r?"mobileInactiveDaysFilter":"inactiveDaysFilter",l=document.getElementById(d);l&&(s=parseInt(l.value,10))}let i=Q.filter(d=>!n||d.name.toLowerCase().includes(a)||(d.phone||"").includes(a));switch(t){case"birthdays":const d=new Date,l=d.getDate(),c=d.getMonth()+1;return i.filter(m=>{if(!m.dob)return!1;const u=m.dob.split("/");if(u.length!==2)return!1;const b=parseInt(u[0],10),f=parseInt(u[1],10);return o===99?b===l&&f===c:o===0?f>=1&&f<=12:f===o});case"inactive":return i.filter(m=>(m.lastAppointmentDaysAgo||dr())>s);case"scheduled":return i.filter(m=>m.loyaltyPoints>50);case"credit":return i.filter(m=>(m.loyaltyPoints||0)>0);case"debit":return i.filter(m=>!1);case"package":return i.filter(m=>!1);case"all":default:return i}}async function yr(e){const t=document.getElementById("birthMonthFilterContainer"),a=document.getElementById("mobileBirthMonthFilterContainer"),n=document.getElementById("inactiveDaysFilterContainer"),o=document.getElementById("mobileInactiveDaysFilterContainer");if(e==="birthdays"){if(t?.classList.remove("hidden"),a?.classList.remove("hidden"),n?.classList.add("hidden"),o?.classList.add("hidden"),O!=="birthdays"){const d=document.getElementById("birthMonthFilter");d&&(d.value=99);const l=document.getElementById("mobileBirthMonthFilter");l&&(l.value=99)}}else if(e==="inactive"){if(n?.classList.remove("hidden"),o?.classList.remove("hidden"),t?.classList.add("hidden"),a?.classList.add("hidden"),O!=="inactive"){const d=document.getElementById("inactiveDaysFilter");d&&(d.value=90);const l=document.getElementById("mobileInactiveDaysFilter");l&&(l.value=90)}}else t?.classList.add("hidden"),a?.classList.add("hidden"),n?.classList.add("hidden"),o?.classList.add("hidden");if(O===e&&e!=="birthdays"&&e!=="inactive")return;O=e,document.querySelectorAll(".client-filter-btn").forEach(d=>{d.classList.remove("bg-white","text-indigo-600","shadow"),d.classList.add("bg-gray-100","text-gray-600")}),document.querySelectorAll(`[data-filter-key="${e}"]`).forEach(d=>{d&&(d.classList.remove("bg-gray-100","text-gray-600"),d.classList.add("bg-white","text-indigo-600","shadow"))});const r=document.getElementById("clientSearchInput").value,i=lt(r,O);it(i,Q.length)}async function wt(){Ot="list",$t.innerHTML=`
        <section id="client-list-view" class="flex flex-col h-full">
            
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-white md:bg-transparent md:shadow-none shadow-sm">
                <div class="flex-grow">
                    <input type="text" id="clientSearchInput" placeholder="Pesquisar por nome ou telefone..." class="w-full p-3 border border-gray-300 rounded-lg text-sm">
                </div>
                <div class="flex gap-2">
                    <button id="openFilterSheetBtn" class="flex-1 md:hidden py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                        Filtros
                    </button>
                    <button data-action="new-client" class="flex-1 py-3 px-4 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                        <span class="hidden md:inline">Adicionar cliente</span>
                    </button>
                    <button data-action="print-list" class="hidden md:flex py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 whitespace-nowrap items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0v2a2 2 0 002 2h6a2 2 0 002-2v-2M9 17h6" /></svg>
                        Imprimir
                    </button>
                </div>
            </div>

            <div id="desktop-filter-bar" class="hidden md:flex flex-wrap gap-2 p-4 bg-gray-100 border-b">
                <button data-filter-key="all" class="client-filter-btn bg-white text-indigo-600 shadow font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    Total de clientes
                </button>
                <button data-filter-key="scheduled" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Agendados
                </button>
                <button data-filter-key="credit" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.5a9.5 9.5 0 1019 0 9.5 9.5 0 00-19 0z" /></svg>
                    Clientes com crédito
                </button>
                <div class="flex items-center gap-2">
                    <button data-filter-key="birthdays" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.333 0 2-1 2-2s-.667-2-2-2-2 1-2 2 .667 2 2 2zM2 15h20M7 15l2 6h6l2-6M7 15a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2"/></svg>
                        Aniversariantes
                    </button>
                    <span id="birthMonthFilterContainer" class="hidden">
                        <select id="birthMonthFilter" class="p-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 font-semibold shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            ${Ia()}
                        </select>
                    </span>
                </div>
                <div class="flex items-center gap-2">
                    <button data-filter-key="inactive" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Clientes Inativos
                    </button>
                    <span id="inactiveDaysFilterContainer" class="hidden">
                        <select id="inactiveDaysFilter" class="p-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 font-semibold shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            ${Ca()}
                        </select>
                    </span>
                </div>
                <button data-filter-key="debit" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    Clientes em débito
                </button>
                <button data-filter-key="package" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                    Clientes com pacote
                </button>
            </div>
            
            <div class="px-4 md:px-1">
                <p id="client-count" class="text-sm text-gray-500 my-4">A carregar clientes...</p>
            </div>
            
            <div class="hidden md:grid grid-cols-[3rem_2fr_1fr_1fr_3rem] gap-4 p-2 font-semibold text-xs text-gray-500 uppercase border-b mb-3">
                <span>Foto</span>
                <span>Nome</span>
                <span>Saldo/Pontos</span>
                <span>Telefone</span>
                <span>Ação</span>
            </div>

            <div id="clientsList" class="flex-1 overflow-y-auto space-y-3 p-2 md:p-0">
                <div class="loader col-span-full mx-auto"></div>
            </div>
        </section>

        <div id="filter-overlay" class="fixed inset-0 bg-black bg-opacity-50 hidden" style="z-index: 39;"></div>
        
        <div id="filter-sheet" class="fixed bottom-0 left-0 right-0 p-4 bg-white rounded-t-2xl shadow-lg" style="z-index: 40;">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold text-gray-800">Filtrar por</h3>
                <button id="closeFilterSheetBtn" class="text-gray-500 hover:text-gray-800">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div id="mobile-filter-list" class="space-y-2 max-h-[60vh] overflow-y-auto">
                <button data-filter-key="all" class="client-filter-btn bg-white text-indigo-600 shadow font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    Total de clientes
                </button>
                <button data-filter-key="scheduled" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Agendados
                </button>
                <button data-filter-key="credit" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.5a9.5 9.5 0 1019 0 9.5 9.5 0 00-19 0z" /></svg>
                    Clientes com crédito
                </button>
                <div class="flex items-center gap-2">
                    <button data-filter-key="birthdays" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.333 0 2-1 2-2s-.667-2-2-2-2 1-2 2 .667 2 2 2zM2 15h20M7 15l2 6h6l2-6M7 15a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2"/></svg>
                        Aniversariantes
                    </button>
                    <span id="mobileBirthMonthFilterContainer" class="hidden">
                        <select id="mobileBirthMonthFilter" class="p-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 font-semibold shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            ${Ia()}
                        </select>
                    </span>
                </div>
                <div class="flex items-center gap-2">
                    <button data-filter-key="inactive" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Clientes Inativos
                    </button>
                    <span id="mobileInactiveDaysFilterContainer" class="hidden">
                        <select id="mobileInactiveDaysFilter" class="p-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 font-semibold shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            ${Ca()}
                        </select>
                    </span>
                </div>
                <button data-filter-key="debit" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    Clientes em débito
                </button>
                <button data-filter-key="package" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                    Clientes com pacote
                </button>
            </div>
        </div>
    `;try{const[c,m]=await Promise.all([We(p.establishmentId),_e(p.establishmentId)]);Q=c,qe=m.loyaltyProgram||{enabled:!1},zt=m.name||"O Estabelecimento";const u=lt("",O);it(u,Q.length)}catch{document.getElementById("clientsList").innerHTML='<p class="text-red-500 col-span-full text-center">Erro ao carregar dados dos clientes.</p>'}const e=document.getElementById("filter-sheet"),t=document.getElementById("filter-overlay"),a=document.getElementById("openFilterSheetBtn"),n=document.getElementById("closeFilterSheetBtn"),o=()=>{e.classList.add("show"),t.classList.remove("hidden")},s=()=>{e.classList.remove("show"),t.classList.add("hidden")};a&&a.addEventListener("click",o),n&&n.addEventListener("click",s),t&&t.addEventListener("click",s);const r=c=>{const m=c.target.closest(".client-filter-btn");m&&(yr(m.dataset.filterKey),window.innerWidth<768&&s())},i=document.getElementById("desktop-filter-bar"),d=document.getElementById("mobile-filter-list");i&&i.addEventListener("click",r),d&&d.addEventListener("click",r);const l=c=>{const m=document.getElementById(c);m&&m.addEventListener("change",()=>{if(O==="birthdays"||O==="inactive"){const u=document.getElementById("clientSearchInput").value,b=lt(u,O);it(b,Q.length)}})};l("birthMonthFilter"),l("mobileBirthMonthFilter"),l("inactiveDaysFilter"),l("mobileInactiveDaysFilter"),$t.addEventListener("click",async c=>{const m=c.target.closest("[data-action]"),u=c.target.closest(".client-card");if(Ot==="list"){if(m){const b=m.dataset.action;b==="new-client"?Ut(null):b==="print-list"&&window.print()}else if(u){const b=u.dataset.clientId,f=Q.find(v=>v.id===b);f&&Ut(f)}}}),$t.addEventListener("input",c=>{if(c.target.id==="clientSearchInput"){const m=c.target.value,u=lt(m,O);it(u,Q.length)}})}const Ve=()=>y("/api/financial/natures"),xr=e=>y("/api/financial/natures",{method:"POST",body:JSON.stringify(e)}),wr=e=>y(`/api/financial/natures/${e}`,{method:"DELETE"}),Ue=()=>y("/api/financial/cost-centers"),kr=e=>y("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(e)}),Er=e=>y(`/api/financial/cost-centers/${e}`,{method:"DELETE"}),ro=(e,t)=>y(`/api/financial/${e}`,{method:"POST",body:JSON.stringify(t)}),io=(e,t={})=>{let a=`/api/financial/${e}`;const n=new URLSearchParams;t.startDate&&n.append("startDate",t.startDate),t.endDate&&n.append("endDate",t.endDate),t.natureId&&n.append("natureId",t.natureId),t.costCenterId&&n.append("costCenterId",t.costCenterId);const o=n.toString();return o&&(a+=`?${o}`),y(a)},lo=(e,t,a)=>y(`/api/financial/${e}/${t}`,{method:"PUT",body:JSON.stringify(a)}),co=(e,t)=>y(`/api/financial/${e}/${t}`,{method:"DELETE"}),mo=(e,t,a)=>y(`/api/financial/${e}/${t}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),Sr=e=>ro("payables",e),$r=e=>io("payables",e),Ir=(e,t)=>lo("payables",e,t),Cr=e=>co("payables",e),Lr=(e,t)=>mo("payables",e,t),Br=e=>ro("receivables",e),Tr=e=>io("receivables",e),Mr=(e,t)=>lo("receivables",e,t),Dr=e=>co("receivables",e),Pr=(e,t)=>mo("receivables",e,t),Ar=(e,t)=>y(`/api/financial/cash-flow?startDate=${e}&endDate=${t}`),qr=()=>y("/api/financial/today-summary"),me=document.getElementById("content"),It={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},Nr={indigo:{name:"Padrão (Índigo)",main:"#4f46e5",light:"#e0e7ff",text:"#ffffff"},rose:{name:"Rosa",main:"#e11d48",light:"#ffe4e6",text:"#ffffff"},green:{name:"Verde",main:"#16a34a",light:"#d1fae5",text:"#ffffff"},sky:{name:"Azul Céu",main:"#0284c7",light:"#e0f2fe",text:"#ffffff"},amber:{name:"Âmbar",main:"#d97706",light:"#fef3c7",text:"#1f2937"}},uo=[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"delete-account",icon:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m-7-10V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v3M4 7h16",label:"Excluir conta"}];let H=null;function La(e,t=null){let a='<option value="">-- Selecione (Opcional) --</option>';const n=r=>{const i=new Map,d=[];return r&&(r.forEach(l=>i.set(l.id,{...l,children:[]})),i.forEach(l=>{l.parentId&&i.has(l.parentId)?i.get(l.parentId).children.push(l):d.push(l)})),d},o=(r,i="")=>{const d=r.id===t?"selected":"";a+=`<option value="${r.id}" ${d}>${i}${r.name}</option>`,r.children.forEach(l=>o(l,i+"— "))};return n(e).forEach(r=>o(r)),a}async function Ce(e,t){const a=t.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const n=H||await _e(p.establishmentId),o=[],{ownerName:s,...r}=e;if(s&&s!==p.userName){const l=V.currentUser;l&&o.push(Eo(l,{displayName:s}).then(()=>{p.userName=s}))}const i={...n,...r};o.push(Xo(p.establishmentId,i)),await Promise.all(o),H=i,g("Sucesso","Definições salvas com sucesso!","success");const d=document.getElementById("panelEstablishmentName");r.name&&d&&(d.textContent=r.name,p.establishmentName=r.name)}catch(n){g("Erro",`Não foi possível salvar: ${n.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function Fr(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Dados Gerais e de Contato</h3>
                <button type="submit" form="personal-data-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
            </div>
            <form id="personal-data-form" class="space-y-4">
                <div>
                    <label for="ownerName" class="block text-sm font-medium text-gray-700">Seu nome (Dono)</label>
                    <input type="text" id="ownerName" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${p.userName||""}">
                </div>
                <div>
                    <label for="establishmentName" class="block text-sm font-medium text-gray-700">Nome do Salão ou Barbearia</label>
                    <input type="text" id="establishmentName" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${e.name||""}">
                </div>
                <div>
                    <label for="establishmentPhone" class="block text-sm font-medium text-gray-700">Telefone Principal</label>
                    <input type="tel" id="establishmentPhone" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${e.phone||""}">
                </div>
                <div>
                    <label for="establishmentCnpjCpf" class="block text-sm font-medium text-gray-700">CNPJ / CPF</label>
                    <input type="text" id="establishmentCnpjCpf" value="${e.document||""}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="establishmentEmail" class="block text-sm font-medium text-gray-700">E-mail de Contato</label>
                    <input type="email" id="establishmentEmail" value="${e.email||""}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="establishmentAddress" class="block text-sm font-medium text-gray-700">Endereço Completo</label>
                    <input type="text" id="establishmentAddress" value="${e.address||""}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="establishmentWebsite" class="block text-sm font-medium text-gray-700">Website</label>
                    <input type="url" id="establishmentWebsite" value="${e.website||""}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
            </form>
        </div>
    `,t.querySelector("#personal-data-form").addEventListener("submit",a=>{a.preventDefault();const n={ownerName:t.querySelector("#ownerName").value,name:t.querySelector("#establishmentName").value,phone:t.querySelector("#establishmentPhone").value,document:t.querySelector("#establishmentCnpjCpf").value,email:t.querySelector("#establishmentEmail").value,address:t.querySelector("#establishmentAddress").value,website:t.querySelector("#establishmentWebsite").value};Ce(n,a)})}function Rr(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Alterar Senha</h3>
                <button type="submit" form="change-password-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar Nova Senha</button>
            </div>
            <form id="change-password-form" class="space-y-4">
                <div>
                    <label for="newPassword" class="block text-sm font-medium text-gray-700">Nova Senha</label>
                    <input type="password" id="newPassword" class="mt-1 w-full p-2 border border-gray-300 rounded-md" required minlength="6">
                </div>
                <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
                    <input type="password" id="confirmPassword" class="mt-1 w-full p-2 border border-gray-300 rounded-md" required>
                </div>
            </form>
        </div>
    `,t.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const n=t.querySelector("#newPassword").value,o=t.querySelector("#confirmPassword").value;if(n!==o){g("Erro","As senhas não coincidem.","error");return}const s=t.querySelector('button[form="change-password-form"]');s.disabled=!0,s.textContent="A Salvar...";try{const r=V.currentUser;if(r)await ko(r,n),g("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum usuário autenticado encontrado.")}catch(r){g("Erro",`Não foi possível alterar a senha: ${r.message}`,"error")}finally{s.disabled=!1,s.textContent="Salvar Nova Senha"}})}function Hr(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Alterar E-mail de Acesso</h3>
                <button type="submit" form="change-email-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar Novo E-mail</button>
            </div>
            <form id="change-email-form" class="space-y-4">
                <p class="text-sm text-gray-600">Para alterar seu e-mail de login, por favor, confirme sua senha atual. Um e-mail de verificação será enviado para o seu **novo** endereço.</p>
                <div>
                    <label for="newEmail" class="block text-sm font-medium text-gray-700">Novo E-mail</label>
                    <input type="email" id="newEmail" class="mt-1 w-full p-2 border border-gray-300 rounded-md" required>
                </div>
                <div>
                    <label for="currentPassword" class="block text-sm font-medium text-gray-700">Senha Atual</label>
                    <input type="password" id="currentPassword" class="mt-1 w-full p-2 border border-gray-300 rounded-md" required>
                </div>
            </form>
        </div>
    `,t.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const n=t.querySelector("#newEmail").value,o=t.querySelector("#currentPassword").value;if(!n||!o){g("Erro","Preencha todos os campos.","error");return}const s=t.querySelector('button[form="change-email-form"]');s.disabled=!0,s.textContent="A verificar...";try{const r=V.currentUser;if(!r)throw new Error("Usuário não autenticado.");const i=yo.credential(r.email,o);await xo(r,i),s.textContent="A enviar link...",await wo(r,n),s.textContent="A atualizar BD...",await Zo(p.establishmentId,n),g("Sucesso","Link de verificação enviado! Por favor, verifique seu **novo e-mail** para confirmar a alteração.","success"),a.target.reset()}catch(r){let i="Não foi possível alterar o e-mail.";r.code==="auth/wrong-password"?i="A senha atual está incorreta.":r.code==="auth/email-already-in-use"?i="Este e-mail já está sendo usado por outra conta.":r.code==="auth/operation-not-allowed"?i="A troca de e-mail precisa ser habilitada no console do Firebase.":i=r.message,g("Erro",i,"error")}finally{s.disabled=!1,s.textContent="Salvar Novo E-mail"}})}function jr(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Identidade Visual e Cores</h3>
                <button type="submit" form="branding-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
            </div>
            <form id="branding-form" class="space-y-8">
                <input type="hidden" id="establishmentLogoBase64">
                <input type="hidden" id="establishmentBackgroundImageBase64">
                <input type="hidden" id="establishmentThemeColor">
                
                <div class="flex flex-col md:flex-row items-center gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Logotipo</label>
                        <img id="establishmentLogoPreview" src="${e.logo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Logo"}" class="mt-2 h-24 w-24 rounded-lg object-contain border p-1 bg-gray-50">
                    </div>
                    <div class="flex-grow">
                        <input type="file" id="establishmentLogoInput" class="hidden" accept="image/*">
                        <button type="button" id="establishmentLogoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar Logotipo</button>
                        <p class="text-xs text-gray-500 mt-2">Recomendado: PNG com fundo transparente.</p>
                    </div>
                </div>

                <div class="border-t pt-4 mt-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Personalização do Link de Agendamento</h4>
                    
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Imagem de Fundo</label>
                        <div class="mt-2 flex items-center gap-4">
                            <div class="h-32 w-20 bg-gray-100 border rounded-lg overflow-hidden relative group">
                                 <img id="establishmentBgPreview" src="${e.backgroundImage||""}" class="w-full h-full object-cover ${e.backgroundImage?"":"hidden"}">
                                 <div id="establishmentBgPlaceholder" class="${e.backgroundImage?"hidden":"flex"} w-full h-full items-center justify-center text-gray-400 text-xs text-center p-1">Sem Imagem</div>
                            </div>
                            <div class="flex-grow">
                                <input type="file" id="establishmentBgInput" class="hidden" accept="image/*">
                                <button type="button" id="establishmentBgButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Carregar Imagem</button>
                                <button type="button" id="establishmentBgRemoveBtn" class="ml-2 text-red-600 text-sm hover:underline">Remover</button>
                                <p class="text-xs text-gray-500 mt-2">Aparecerá no fundo do agendamento online.</p>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Cor Principal (Botões/Ícones)</label>
                            <div class="flex items-center gap-3">
                                <input type="color" id="establishmentPrimaryColorInput" value="${e.primaryColor||e.themeColor||"#4f46e5"}" class="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Cor do Texto (Nome/Mensagem)</label>
                            <div class="flex items-center gap-3">
                                <input type="color" id="establishmentTextColorInput" value="${e.textColor||"#111827"}" class="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer">
                                <span class="text-xs text-gray-500">Ajuste para melhorar a leitura sobre a imagem.</span>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <label for="establishmentWelcomeMessage" class="block text-sm font-medium text-gray-700">Mensagem de Boas-Vindas</label>
                        <input type="text" id="establishmentWelcomeMessage" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Simples, rápido e à sua medida." value="${e.welcomeMessage||""}">
                    </div>
                </div>

                <div class="border-t pt-4 mt-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">Tema do Painel (Sistema)</h4>
                    <p class="text-sm text-gray-600 mb-4">Escolha a cor dos menus e botões do <strong>seu</strong> painel de gestão.</p>
                    <div id="color-palette-container" class="flex flex-wrap gap-4"></div>
                </div>
            </form>
        </div>
    `,t.querySelector("#establishmentLogoBase64").value=e.logo||"",t.querySelector("#establishmentBackgroundImageBase64").value=e.backgroundImage||"",po(e.themeColor||"indigo",t),t.querySelector("#establishmentLogoButton").onclick=()=>t.querySelector("#establishmentLogoInput").click(),t.querySelector("#establishmentLogoInput").onchange=a=>{const n=a.target.files[0];if(n){const o=new FileReader;o.onload=s=>{t.querySelector("#establishmentLogoPreview").src=s.target.result,t.querySelector("#establishmentLogoBase64").value=s.target.result},o.readAsDataURL(n)}},t.querySelector("#establishmentBgButton").onclick=()=>t.querySelector("#establishmentBgInput").click(),t.querySelector("#establishmentBgInput").onchange=a=>{const n=a.target.files[0];if(n){const o=new FileReader;o.onload=s=>{t.querySelector("#establishmentBgPreview").src=s.target.result,t.querySelector("#establishmentBgPreview").classList.remove("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=s.target.result},o.readAsDataURL(n)}},t.querySelector("#establishmentBgRemoveBtn").onclick=()=>{t.querySelector("#establishmentBgPreview").src="",t.querySelector("#establishmentBgPreview").classList.add("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.remove("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=""},t.querySelector("#branding-form").addEventListener("submit",a=>{a.preventDefault();const n={logo:t.querySelector("#establishmentLogoBase64").value,welcomeMessage:t.querySelector("#establishmentWelcomeMessage").value,backgroundImage:t.querySelector("#establishmentBackgroundImageBase64").value,primaryColor:t.querySelector("#establishmentPrimaryColorInput").value,textColor:t.querySelector("#establishmentTextColorInput").value,themeColor:t.querySelector("#establishmentThemeColor").value};Ce(n,a)})}function Or(e,t){const a=e.urlId||p.establishmentId,n="https://kairos-service-603994960586.southamerica-east1.run.app";let o=window.location.origin;(o.includes("localhost")||o.includes("capacitor://")||o.includes("127.0.0.1")||o.includes("192.168"))&&(o=n);const s=`${o}/agendar?id=${a}`,r=e.publicBookingEnabled||!1,i=r?"Agendamento Online ATIVO":"Agendamento Online INATIVO",d=r?"text-green-600":"text-red-600";t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-8">
            <div>
                <div class="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 class="text-xl font-bold text-gray-800">Link Público de Agendamento</h3>
                </div>
                <p class="text-sm text-gray-600 mb-4">
                    Este é o link exclusivo que você pode partilhar com os seus clientes para que eles façam agendamentos online.
                </p>
                <div class="flex flex-col sm:flex-row gap-2">
                    <input 
                        type="text" 
                        id="publicBookingLink" 
                        value="${s}" 
                        readonly 
                        class="flex-1 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                    >
                    <button 
                        type="button" 
                        id="copyBookingLinkBtn"
                        class="py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                    >
                        Copiar Link
                    </button>
                </div>
            </div>

            <div>
                <h3 class="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Status do Agendamento Online</h3>
                <p class="text-sm text-gray-600 mb-4">
                    Se o agendamento online estiver inativo, os clientes que tentarem aceder ao link verão uma mensagem a informar que o estabelecimento não está a aceitar agendamentos no momento.
                </p>
                <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <label for="publicBookingToggle" class="flex items-center cursor-pointer">
                        <div class="relative">
                            <input type="checkbox" id="publicBookingToggle" class="sr-only" ${r?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                        </div>
                    </label>
                    <span id="publicBookingStatusText" class="text-sm font-semibold ${d}">
                        ${i}
                    </span>
                </div>
            </div>

            <div class="pt-8 border-t">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800">Intervalo de Horários</h3>
                    <button type="submit" form="booking-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar Intervalo</button>
                </div>
                <form id="booking-form" class="space-y-4">
                    <input type="hidden" id="establishmentSlotInterval">
                    <h4 class="text-md font-semibold text-gray-800 mb-2">Intervalo entre agendamentos</h4>
                    <p class="text-sm text-gray-600 mb-4">Defina o intervalo de tempo entre os horários disponíveis na agenda online.</p>
                    <div id="slotIntervalContainer" class="flex flex-wrap gap-2"></div>
                </form>
            </div>
        </div>
    `,t.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const l=t.querySelector("#publicBookingLink");if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(l.value).then(()=>{g("Sucesso","Link copiado para a área de transferência!","success")}).catch(c=>{g("Erro","Não foi possível copiar o link.","error")});else try{l.select(),document.execCommand("copy"),l.blur(),g("Sucesso","Link copiado para a área de transferência!","success")}catch{g("Erro","Não foi possível copiar o link. Por favor, copie manualmente.","error")}}),t.querySelector("#publicBookingToggle").addEventListener("change",async l=>{const c=l.target.checked,m=t.querySelector("#publicBookingStatusText");c?(m.textContent="Agendamento Online ATIVO",m.className="text-sm font-semibold text-green-600"):(m.textContent="Agendamento Online INATIVO",m.className="text-sm font-semibold text-red-600");try{l.target.disabled=!0,await Qo(p.establishmentId,c),H.publicBookingEnabled=c,g("Sucesso",`Agendamento online ${c?"ativado":"desativado"}!`,"success")}catch(u){g("Erro",`Não foi possível alterar o status: ${u.message}`,"error"),l.target.checked=!c,c?(m.textContent="Agendamento Online ATIVO",m.className="text-sm font-semibold text-green-600"):(m.textContent="Agendamento Online INATIVO",m.className="text-sm font-semibold text-red-600")}finally{l.target.disabled=!1}}),Wr(e.slotInterval||30,t),t.querySelector("#booking-form").addEventListener("submit",l=>{l.preventDefault();const c={slotInterval:parseInt(t.querySelector("#establishmentSlotInterval").value,10)};Ce(c,l)})}function zr(e,t){t.innerHTML=`
         <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
             <div class="flex justify-between items-center mb-6">
                 <h3 class="text-xl font-bold text-gray-800">Horário de Funcionamento</h3>
                 <button type="submit" form="working-hours-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar Horários</button>
             </div>
             <form id="working-hours-form">
                 <div id="establishmentWorkingHoursContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div>
             </form>
         </div>
    `;const a=t.querySelector("#establishmentWorkingHoursContainer"),n=e.workingHours||{};Object.keys(It).forEach(o=>{const s=n[o]||{},r=It[o],i=s.active!==!1,d=document.createElement("div");d.className=`day-schedule-card p-4 rounded-lg ${i?"bg-gray-50":"bg-gray-100 disabled"}`,d.innerHTML=`
            <div class="flex justify-between items-center mb-3">
                <span class="font-bold text-gray-800">${r}</span>
                <label class="flex items-center cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" id="est-${o}-active" class="sr-only" ${i?"checked":""}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                </label>
            </div>
            <div class="time-inputs space-y-2">
                <div class="flex items-center gap-2"><label class="w-16">Início:</label><input type="time" id="est-${o}-start" value="${s.start||"09:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Fim:</label><input type="time" id="est-${o}-end" value="${s.end||"18:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Intervalo:</label><input type="time" id="est-${o}-breakStart" value="${s.breakStart||"12:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Fim Int.:</label><input type="time" id="est-${o}-breakEnd" value="${s.breakEnd||"13:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
            </div>`,a.appendChild(d)}),a.addEventListener("change",o=>{const s=o.target.closest('.day-schedule-card input[type="checkbox"]');s&&s.closest(".day-schedule-card").classList.toggle("disabled",!s.checked)}),t.querySelector("#working-hours-form").addEventListener("submit",o=>{o.preventDefault();const s={};Object.keys(It).forEach(r=>{s[r]={active:t.querySelector(`#est-${r}-active`).checked,start:t.querySelector(`#est-${r}-start`).value,end:t.querySelector(`#est-${r}-end`).value,breakStart:t.querySelector(`#est-${r}-breakStart`).value,breakEnd:t.querySelector(`#est-${r}-breakEnd`).value}}),Ce({workingHours:s},o)})}function Vr(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
             <div class="flex justify-between items-center mb-6">
                 <h3 class="text-xl font-bold text-gray-800">Plano de Fidelidade</h3>
                 <button type="submit" form="loyalty-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
             </div>
             <form id="loyalty-form" class="space-y-4">
                 <div class="flex items-center">
                     <label for="loyaltyEnabled" class="flex items-center cursor-pointer">
                         <div class="relative"><input type="checkbox" id="loyaltyEnabled" class="sr-only"><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div>
                         <span class="ml-3 font-medium text-gray-700">Habilitar Programa de Fidelidade</span>
                     </label>
                 </div>
                 <div>
                     <label for="loyaltyPointsPerCurrency" class="block text-sm font-medium text-gray-700">Pontos Ganhos</label>
                     <div class="mt-1 flex items-center gap-2">
                         <span>1 Ponto a cada R$</span>
                         <input type="number" id="loyaltyPointsPerCurrency" value="10" class="w-24 p-2 border rounded-md">
                     </div>
                 </div>
                 <div>
                     <label class="block text-sm font-medium text-gray-700 mb-2">Prémios (Níveis de Pontuação)</label>
                     
                     <div class="hidden md:grid grid-cols-[1fr_2fr_1fr_auto] items-center gap-2 mb-1 text-xs font-bold text-gray-500 px-2">
                         <span>Pontos</span>
                         <span>Descrição do Prémio</span>
                         <span>Valor do Desconto (R$)</span>
                         <span></span>
                     </div>
                     
                     <div id="loyaltyTiersContainer" class="space-y-4 md:space-y-2"></div>
                     
                     <button type="button" id="add-loyalty-tier" class="mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800">+ Adicionar Prémio</button>
                 </div>
             </form>
        </div>
    `;const a=e.loyaltyProgram||{};t.querySelector("#loyaltyEnabled").checked=a.enabled||!1,t.querySelector("#loyaltyPointsPerCurrency").value=a.pointsPerCurrency||10;const n=t.querySelector("#loyaltyTiersContainer"),o=(s={})=>{const r=document.createElement("div");return r.className="loyalty-tier-row",r.innerHTML=`
            <div>
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Pontos</label>
                <input type="number" placeholder="Pontos" data-field="points" value="${s.points||""}" class="w-full p-2 border rounded-md">
            </div>
            <div>
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Descrição do Prémio</label>
                <input type="text" placeholder="Descrição do Prémio" data-field="reward" value="${s.reward||""}" class="w-full p-2 border rounded-md">
            </div>
            <div>
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Valor do Desconto (R$)</label>
                <div class="flex items-center"><span class="mr-1">R$</span><input type="number" placeholder="Valor" data-field="discount" value="${s.discount||""}" class="w-full p-2 border rounded-md"></div>
            </div>
            <button type="button" class="remove-loyalty-tier bg-red-100 text-red-700 p-2 rounded-md hover:bg-red-200 md:bg-transparent md:text-red-500 md:hover:bg-red-100">&times;</button>
        `,r};(a.tiers||[]).forEach(s=>{n.appendChild(o(s))}),t.querySelector("#add-loyalty-tier").addEventListener("click",()=>{n.appendChild(o())}),n.addEventListener("click",s=>{const r=s.target.closest(".remove-loyalty-tier");r&&r.closest(".loyalty-tier-row").remove()}),t.querySelector("#loyalty-form").addEventListener("submit",s=>{s.preventDefault();const r=Array.from(t.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(d=>({points:parseInt(d.querySelector('input[data-field="points"]').value,10)||0,reward:d.querySelector('input[data-field="reward"]').value,discount:parseFloat(d.querySelector('input[data-field="discount"]').value)||0})),i={loyaltyProgram:{enabled:t.querySelector("#loyaltyEnabled").checked,pointsPerCurrency:parseFloat(t.querySelector("#loyaltyPointsPerCurrency").value)||1,tiers:r.filter(d=>d.points>0&&d.reward)}};Ce(i,s)})}async function Ur(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Integração Financeira Padrão</h3>
                <button type="submit" form="financial-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
            </div>
            <form id="financial-form" class="space-y-4">
                <p class="text-sm text-gray-600">Selecione as Naturezas e Centros de Custo padrões para serem aplicados automaticamente em todas as vendas (Contas a Receber).</p>
                <div>
                    <label for="financialNatureId" class="block text-sm font-medium text-gray-700">Natureza Padrão (Receita)</label>
                    <select id="financialNatureId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                        <option value="">A carregar...</option>
                    </select>
                </div>
                <div>
                    <label for="financialCostCenterId" class="block text-sm font-medium text-gray-700">Centro de Custo Padrão</label>
                    <select id="financialCostCenterId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                        <option value="">A carregar...</option>
                    </select>
                </div>
            </form>
        </div>
    `;try{const[a,n]=await Promise.all([Ve(),Ue()]),o=e.financialIntegration||{};t.querySelector("#financialNatureId").innerHTML=La(a,o.defaultNaturezaId),t.querySelector("#financialCostCenterId").innerHTML=La(n,o.defaultCentroDeCustoId)}catch{g("Erro","Não foi possível carregar os dados para a integração financeira.","error")}t.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const n={financialIntegration:{defaultNaturezaId:t.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:t.querySelector("#financialCostCenterId").value||null}};Ce(n,a)})}function _r(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-gray-800">${e}</h3>
            <p class="mt-4 text-gray-500">Esta secção ainda não foi implementada.</p>
        </div>
    `}function po(e="indigo",t){const a=t.querySelector("#color-palette-container"),n=t.querySelector("#establishmentThemeColor");!a||!n||(a.innerHTML="",Object.entries(Nr).forEach(([o,s])=>{const r=o===e,i=document.createElement("div");i.className="w-24 text-center cursor-pointer",i.innerHTML=`
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${r?"border-blue-500":"border-transparent"} p-1">
                <div class="w-full h-full rounded-full" style="background-color: ${s.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${r?"text-blue-600":"text-gray-600"}">${s.name}</p>
        `,i.addEventListener("click",()=>{n.value=o,po(o,t)}),a.appendChild(i)}),n.value=e)}function Wr(e,t){const a=t.querySelector("#slotIntervalContainer"),n=t.querySelector("#establishmentSlotInterval");if(!a||!n)return;const o=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=o.map(s=>{const r=s.value===e;return`<button type="button" data-value="${s.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors 
                            ${r?"bg-indigo-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}">
                       ${s.label}
                   </button>`}).join(""),n.value=e,a.querySelectorAll(".interval-btn").forEach(s=>{s.addEventListener("click",()=>{n.value=s.dataset.value,a.querySelectorAll(".interval-btn").forEach(r=>{r.classList.remove("bg-indigo-600","text-white"),r.classList.add("bg-gray-200","text-gray-700")}),s.classList.add("bg-indigo-600","text-white"),s.classList.remove("bg-gray-200","text-gray-700")})})}async function Jr(e){const t=uo.find(n=>n.id===e);if(!t){console.error("Secção de definições não encontrada:",e);return}me.innerHTML=`
        <div class="bg-white p-4 shadow-md sticky top-0 z-10 md:relative">
            <button data-action="back-to-list" class="flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                Voltar
            </button>
        </div>
        
        <div id="settings-content-detail" class="p-4">
            <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
        </div>
    `,me.querySelector('button[data-action="back-to-list"]').addEventListener("click",n=>{n.preventDefault(),go()});const a=document.getElementById("settings-content-detail");switch(e){case"personal-data":Fr(H,a);break;case"change-password":Rr(H,a);break;case"change-email":Hr(H,a);break;case"branding":jr(H,a);break;case"booking":Or(H,a);break;case"working-hours":zr(H,a);break;case"loyalty":Vr(H,a);break;case"financial":await Ur(H,a);break;default:_r(t?t.label:"Definições",a)}}async function go(){if(me.innerHTML=`
        <div class="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>
                Definições
            </h2>
        </div>
        <div class="flex justify-center items-center h-64"><div class="loader"></div></div>
    `,!H)try{H=await _e(p.establishmentId)}catch{g("Erro Fatal","Não foi possível carregar os dados do estabelecimento.","error"),me.innerHTML='<p class="text-red-500">Erro ao carregar dados.</p>';return}const e=p.userName||V.currentUser.email,t=e?e.charAt(0).toUpperCase():"U";me.innerHTML=`
        <div class="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>
                Definições
            </h2>
        </div>
        
        <div data-action="go-to-my-profile" class="bg-white p-4 rounded-lg shadow-md mb-6 cursor-pointer hover:bg-gray-50 transition-all">
            <div class="text-center relative">
                
                <div class="absolute top-0 right-0 p-2 text-gray-400 hover:text-indigo-600" title="Ver Meu Perfil">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                 </div>

                 <div class="relative w-24 h-24 mx-auto">
                    <img id="user-avatar" src="https://placehold.co/96x96/E2E8F0/4A5568?text=${t}" class="w-24 h-24 rounded-full object-cover">
                 </div>
                 <h3 class="font-bold mt-2 text-lg truncate">${e}</h3>
                 ${p.userName&&p.userName!==V.currentUser.email?`<p class="text-sm text-gray-500">${V.currentUser.email||"Não disponível"}</p>`:""}
                 
                 <p class="text-xs text-indigo-600 font-semibold mt-2">VER MEU PERFIL / MEUS BLOQUEIOS</p>
            </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <nav id="settings-menu-list" class="space-y-1">
                ${uo.map(n=>`
                    <button data-section="${n.id}" class="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold text-sm">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${n.icon}"></path></svg>
                        <span class="flex-1 text-left">${n.label}</span>
                        <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                `).join("")}
            </nav>
        </div>
    `,me.querySelector("#settings-menu-list").addEventListener("click",n=>{const o=n.target.closest("button[data-section]");o&&(n.preventDefault(),Jr(o.dataset.section))});const a=me.querySelector('[data-action="go-to-my-profile"]');a&&a.addEventListener("click",n=>{n.preventDefault(),F("my-profile-section")})}const Ne=document.getElementById("content");async function ke(e){const t=document.getElementById("blockagesList");if(t){t.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,n=document.getElementById("filterEndDate")?.value,o=await bt(p.establishmentId,a||new Date().toISOString().split("T")[0],n||new Date().toISOString().split("T")[0],e),s=document.getElementById("filterReason")?.value.toLowerCase(),r=s?o.filter(d=>d.reason&&d.reason.toLowerCase().includes(s)):o,i=r.reduce((d,l)=>{const c=l.reason||"Sem motivo";return d[c]||(d[c]=[]),d[c].push(l),d},{});if(t.innerHTML="",r.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(i).forEach(([d,l])=>{const c=document.createElement("div");c.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let m=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${d} (${l.length})</h4>`;if(l.length>1){const u=JSON.stringify(l.map(b=>b.id));m+=`<button data-action="batch-delete-blockage" data-ids='${u}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}m+="</div>",c.innerHTML=m,l.forEach(u=>{const b=new Date(u.startTime),f=new Date(u.endTime),v=b.toLocaleDateString("pt-BR"),k=f.toLocaleDateString("pt-BR"),S=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${v===k?`${v} | ${b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${f.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${v} às ${b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${k} às ${f.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${u.id}">Apagar</button>
                    </div>`;c.innerHTML+=S}),t.appendChild(c)})}catch(a){t.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function Gr(e){e.preventDefault();const t=e.target,a=t.querySelector("#blockageProfId").value,n=t.querySelector("#blockageDate").value,o=t.querySelector("#blockageEndDate").value||n,s=t.querySelector("#blockageStartTime").value,r=t.querySelector("#blockageEndTime").value,i={establishmentId:p.establishmentId,professionalId:a,startTime:new Date(`${n}T${s}:00`).toISOString(),endTime:new Date(`${o}T${r}:00`).toISOString(),reason:t.querySelector("#blockageReason").value};try{await vt(i),t.reset(),g("Sucesso","Bloqueio adicionado com sucesso!","success"),ke(a)}catch(d){g("Erro",`Não foi possível criar o bloqueio: ${d.message}`,"error")}}async function Yr(e){e.preventDefault();const t=e.target,a=Array.from(t.querySelectorAll('input[name="batch-professionals"]:checked')).map(c=>c.value);if(a.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const n=t.querySelector("#batchBlockageDate").value,o=t.querySelector("#batchBlockageEndDate").value||n,s=t.querySelector("#batchBlockageStartTime").value,r=t.querySelector("#batchBlockageEndTime").value,i=t.querySelector("#batchBlockageReason").value,d=t.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="Aguarde...";const l=a.map(c=>{const m={establishmentId:p.establishmentId,professionalId:c,startTime:new Date(`${n}T${s}:00`).toISOString(),endTime:new Date(`${o}T${r}:00`).toISOString(),reason:i};return vt(m)});try{await Promise.all(l),g("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),t.reset(),t.querySelectorAll('input[name="batch-professionals"]:checked').forEach(m=>m.checked=!1);const c=document.getElementById("blockageProfId").value;c&&ke(c)}catch(c){g("Erro",`Ocorreu um erro: ${c.message}`,"error")}finally{d.disabled=!1,d.textContent="Adicionar Bloqueio em Lote"}}function Xr(e){Ne.addEventListener("submit",t=>{t.target.id==="blockageForm"&&Gr(t),t.target.id==="batchBlockageForm"&&Yr(t)}),Ne.addEventListener("input",t=>{t.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&ke(e)}),Ne.addEventListener("click",async t=>{const a=t.target.closest("button[data-action]");if(!a)return;const n=a.dataset.action;if(n==="back-to-professionals")F("profissionais-section");else if(n==="delete-blockage"){if(await T("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await Qt(a.dataset.id),g("Sucesso","Bloqueio removido.","success"),ke(e)}catch(s){g("Erro",`Não foi possível remover o bloqueio: ${s.message}`,"error")}}else if(n==="batch-delete-blockage"){const o=JSON.parse(a.dataset.ids);if(await T("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${o.length} bloqueios de uma vez?`))try{await Ga(o),g("Sucesso",`${o.length} bloqueios removidos.`,"success"),ke(e)}catch(r){g("Erro",`Não foi possível apagar os bloqueios: ${r.message}`,"error")}}})}async function Qr(e){const{professionalId:t,professionalName:a}=e;if(!t||!a){Ne.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}Ne.innerHTML=`
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
                        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Bloqueio para <span class="text-indigo-600">${a}</span></h3>
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
                        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Bloqueios de ${a}</h3>
                        <div id="blockage-filters" class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div><label for="filterStartDate" class="block text-sm font-medium text-gray-700">De</label><input type="date" id="filterStartDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            <div><label for="filterEndDate" class="block text-sm font-medium text-gray-700">Até</label><input type="date" id="filterEndDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            <div><label for="filterReason" class="block text-sm font-medium text-gray-700">Motivo</label><input type="text" id="filterReason" placeholder="Pesquisar motivo..." class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                        </div>
                        <div id="blockagesList" class="space-y-4 max-h-[60vh] overflow-y-auto pr-2"></div>
                    </div>
                </div>
            </div>
        </section>`,Xr(t),await ke(t);const n=document.getElementById("batchProfSelectionContainer");try{const o=await _(p.establishmentId);n.innerHTML=o.map(s=>`
            <div class="flex items-center">
                <input id="prof-batch-${s.id}" value="${s.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${s.id}" class="ml-2 text-sm text-gray-700">${s.name}</label>
            </div>`).join("")}catch{n.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Zr=e=>y(`/api/users/${e}`),Kr=e=>y("/api/users",{method:"POST",body:JSON.stringify(e)}),ei=(e,t)=>y(`/api/users/${e}`,{method:"PUT",body:JSON.stringify(t)}),ti=e=>y(`/api/users/${e}`,{method:"DELETE"}),ai=(e,t)=>y(`/api/users/${e}/password`,{method:"PUT",body:JSON.stringify({password:t})}),oi=(e,t)=>y(`/api/users/${e}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),le=document.getElementById("content"),si={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","profissionais-section":"Profissionais","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},ni={view:"Visualizar",create:"Criar",edit:"Editar"};let Be=null,Te=null;function ri(e){const t=document.getElementById("usersListContainer");if(!t)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(e.length===0){const n=a?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";t.innerHTML=`<p class="col-span-full text-center text-gray-500">${n}</p>`;return}e.sort((n,o)=>(n.status==="active"?-1:1)-(o.status==="active"?-1:1)),t.innerHTML=e.map(n=>{const o=JSON.stringify(n).replace(/'/g,"&apos;"),s=n.status==="active",r=p.professionals.find(c=>c.id===n.professionalId),i=r?r.name:"N/A",d=r?r.name.charAt(0):n.name.charAt(0),l=r?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(d)}`;return`
        <div class="user-card-clickable bg-white rounded-lg shadow-sm border overflow-hidden flex cursor-pointer ${s?"":"opacity-60"}" 
             data-action="edit-user" 
             data-user='${o}'>
            
            <img src="${l}" alt="Foto de Perfil" class="w-16 h-16 object-cover flex-shrink-0 pointer-events-none">
            
            <div class="p-3 flex-grow flex flex-col justify-between">
                
                <div class="pointer-events-none">
                    <p class="font-bold text-gray-800 text-sm truncate">${n.name}</p>
                    <p class="text-xs text-gray-500 truncate">${n.email}</p>
                    <p class="text-xs text-gray-400 mt-1">Prof: <span class="font-semibold text-gray-700">${i}</span></p>
                </div>
                
                <div class="mt-2 flex items-center justify-start gap-2">
                    <label class="flex items-center cursor-pointer" title="${s?"Ativo":"Inativo"}">
                        <div class="relative">
                            <input type="checkbox" data-action="toggle-user-status" data-user-id="${n.id}" class="sr-only" ${s?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                        </div>
                    </label>
                    
                    <button data-action="delete-user" data-user-id="${n.id}" class="text-gray-500 hover:text-red-600 p-2 rounded-full transition-colors action-btn-delete" title="Excluir Usuário">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `}).join("")}function dt(){const e=document.getElementById("showInactiveUsersToggle")?.checked;let t;e?t=p.users:t=p.users.filter(a=>a.status==="active"),ri(t)}function ii(e={}){return Object.entries(si).map(([t,a])=>{const n=t==="agenda-section"||t==="comandas-section",o=e[t]?.view_all_prof===!0,s=Object.entries(ni).map(([i,d])=>`
             <label class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${t}" data-permission="${i}" class="sr-only" 
                        ${e[t]?.[i]?"checked":""}>
                    <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                </div>
                <span class="text-xs text-gray-600">${d}</span>
            </label>
        `).join(""),r=n?`
            <div class="col-span-full pt-2 mt-2 border-t border-gray-200">
                <label class="flex items-center space-x-3 cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" data-module="${t}" data-permission="view_all_prof" class="sr-only" 
                            ${o?"checked":""}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                    <span class="text-sm font-semibold text-indigo-600">Ver todos os dados da Equipe</span>
                </label>
            </div>
        `:"";return`
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-3">
            <h4 class="font-bold text-gray-800 border-b pb-2">${a}</h4>
            <div class="grid grid-cols-3 gap-2">
                ${s}
            </div>
            ${r}
        </div>
    `}).join("")}async function Ba(e=null){document.getElementById("user-list-view").classList.add("hidden");const t=document.getElementById("user-form-view");t.classList.remove("hidden");let a=p.professionals;if(!a||a.length===0)try{a=await _(p.establishmentId),p.professionals=a}catch{g("Erro","Não foi possível carregar a lista de profissionais.","error")}const n=$=>a.find(S=>S.id===$),o=($,S)=>{const E=n($)?.photo,B=S.charAt(0).toUpperCase();return{photoSrc:E||`https://placehold.co/128x128/E2E8F0/4A5568?text=${B}`,initials:B,photoUrl:E||""}},s=e?.professionalId,r=e?.name||"Novo Usuário",i=o(s,r),d=n(s),l=$=>{let S='<option value="">-- Não Associado a um Profissional --</option>';return S+=a.map(w=>`<option value="${w.id}" ${w.id===$?"selected":""}>${w.name} (${w.specialty||"N/A"})</option>`).join(""),S},c=e!==null;t.querySelector("#userFormTitle").textContent=c?`Editar Usuário: ${e.name}`:"Novo Usuário";const m=t.querySelector("#userForm");m.innerHTML=`
        <div class="bg-white p-4 sm:p-6 rounded-xl shadow-2xl space-y-4">
            
            <div class="flex flex-col items-center mb-4">
                 <img id="userPhotoPreview" src="${i.photoSrc}" alt="Foto de Perfil do Profissional" class="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-gray-200 object-cover">
                 <p id="profPhotoName" class="text-sm text-gray-500">${d?d.name:"Selecione um profissional"}</p>
                 <input type="hidden" id="professionalPhotoUrl" value="${i.photoUrl}">
            </div>

            <div class="bg-blue-50 p-4 rounded-lg space-y-3">
                 <h3 class="font-bold text-lg text-blue-800">Dados de Acesso</h3>
                <div class="form-group">
                    <label for="userName">Nome Completo</label>
                    <input type="text" id="userName" required value="${e?.name||""}">
                </div>
                <div class="form-group">
                    <label for="userEmail">Email</label>
                    <input type="email" id="userEmail" required value="${e?.email||""}">
                    ${c?'<p class="text-xs text-gray-700 mt-1"></p>':""}
                </div>
            </div>

            <div class="bg-yellow-50 p-4 rounded-lg space-y-3">
                 <h3 class="font-bold text-lg text-yellow-800">Associação (Agenda)</h3>
                <div class="form-group">
                    <label for="userProfessionalId">Associar a Profissional (Opcional)</label>
                    <select id="userProfessionalId" class="mt-1 block w-full">
                        ${l(e?.professionalId)}
                    </select>
                    <p class="text-xs text-gray-700 mt-1">Define qual profissional este usuário representa na Agenda/Comandas.</p>
                </div>
            </div>
            
            ${c?"":`
            <div class="bg-red-50 p-4 rounded-lg space-y-3">
                 <h3 class="font-bold text-lg text-red-800">Senha Provisória</h3>
                 <div class="form-group">
                     <label for="userPassword">Senha Provisória</label>
                     <input type="password" id="userPassword" required placeholder="Mínimo 6 caracteres">
                 </div>
            </div>
            `}

            ${c?`
            <div class="border-t pt-6 bg-gray-50 p-4 rounded-lg">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Segurança</h3>
                <div id="password-change-container" class="mt-4">
                    <button type="button" data-action="show-password-form" class="py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition">Alterar Senha</button>
                    <div id="password-form" class="hidden mt-4 space-y-4 max-w-xs">
                        <div class="form-group">
                            <label for="userNewPassword">Nova Senha</label>
                            <input type="password" id="userNewPassword" placeholder="Nova Senha">
                        </div>
                        <div class="flex gap-2">
                             <button type="button" data-action="cancel-password-change" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700">Cancelar</button>
                             <button type="button" data-action="save-password" class="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">Salvar Nova Senha</button>
                        </div>
                    </div>
                </div>
            </div>
            `:""}

            <div class="border-t pt-6">
                <h3 class="text-xl font-semibold mb-4 text-gray-900">Permissões de Acesso (Módulos)</h3>
                <div class="space-y-3">
                    ${ii(e?.permissions)}
                </div>
            </div>

            <div class="flex gap-4 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-3 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                <button type="submit" class="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar Alterações</button>
            </div>
        </div>
    `;const u=window.innerWidth<768,b=m.querySelector(".bg-white");if(u&&b){b.classList.remove("rounded-xl","shadow-2xl","sm:p-6");const $=m.closest("section");$&&($.style.padding="0",$.style.margin="0"),b.classList.add("p-4")}const f=m.querySelector("#userProfessionalId"),v=m.querySelector("#userPhotoPreview"),k=m.querySelector("#profPhotoName");if(f.addEventListener("change",$=>{const S=$.target.value,w=n(S),E=w?w.name:"Selecione um profissional",B=o(S,r);v.src=B.photoSrc,k.textContent=E,m.querySelector("#professionalPhotoUrl").value=B.photoUrl}),m.addEventListener("submit",async $=>{$.preventDefault();const S=e?.email,w=m.querySelector("#userEmail").value,E={};m.querySelectorAll('input[type="checkbox"]').forEach(A=>{const L=A.dataset.module,M=A.dataset.permission;E[L]||(E[L]={}),E[L][M]=A.checked});const B=m.querySelector("#userProfessionalId").value||null,D={name:m.querySelector("#userName").value,permissions:E,professionalId:B};try{c?(S!==w&&(D.email=w),await ei(e.id,D),g("Usuário atualizado com sucesso!","success")):(D.email=m.querySelector("#userEmail").value,D.password=m.querySelector("#userPassword").value,await Kr(D),g("Usuário criado com sucesso!","success")),gt()}catch(A){g(`Erro: ${A.message}`,"error")}}),c){const $=m.querySelector("#password-change-container"),S=$.querySelector('[data-action="show-password-form"]'),w=$.querySelector("#password-form"),E=w.querySelector('[data-action="save-password"]'),B=w.querySelector('[data-action="cancel-password-change"]');S.addEventListener("click",()=>{S.classList.add("hidden"),w.classList.remove("hidden")}),B.addEventListener("click",()=>{S.classList.remove("hidden"),w.classList.add("hidden"),w.querySelector("#userNewPassword").value=""}),E.addEventListener("click",async()=>{const D=w.querySelector("#userNewPassword").value;if(!D||D.length<6){g("Senha inválida","A nova senha deve ter pelo menos 6 caracteres.","error");return}if(await T("Alterar Senha","Tem a certeza que deseja alterar a senha deste usuário?"))try{E.disabled=!0,E.textContent="Aguarde...",await ai(e.id,D),g("Sucesso!","A senha do usuário foi alterada.","success"),S.classList.remove("hidden"),w.classList.add("hidden"),w.querySelector("#userNewPassword").value=""}catch(L){g("Erro",`Não foi possível alterar a senha: ${L.message}`,"error")}finally{E.disabled=!1,E.textContent="Salvar Nova Senha"}})}}async function li(){const e=document.getElementById("usersListContainer");e.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[t,a]=await Promise.all([Zr(p.establishmentId),_(p.establishmentId)]);p.users=t,p.professionals=a,dt()}catch{g("Erro ao carregar usuários.","error"),e.innerHTML='<p class="col-span-full text-center text-red-500">Não foi possível carregar os usuários.</p>'}}async function gt(){le.innerHTML=`
        <div id="user-list-view" class="relative min-h-full" style="padding-bottom: 6rem;">
            <section>
                <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <h2 class="text-3xl font-bold text-gray-800">Usuários e Acessos</h2>
                    <div class="flex items-center gap-4">
                        <label class="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" id="showInactiveUsersToggle" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                            <span class="text-sm font-medium text-gray-700">Mostrar Todos (inclui inativos)</span>
                        </label>
                        </div>
                </div>
                <div id="usersListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"></div>
            </section>
            
            <button id="fab-new-user" data-action="new-user" title="Novo Usuário">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
            </div>
        <div id="user-form-view" class="hidden">
             <section>
                <div class="flex justify-between items-center mb-6">
                    <h2 id="userFormTitle" class="text-3xl font-bold text-gray-800"></h2>
                    <button data-action="back-to-list" class="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition">Voltar</button>
                </div>
                <form id="userForm"></form>
            </section>
        </div>
    `,Be&&le.removeEventListener("click",Be),Te&&le.removeEventListener("change",Te),Be=async e=>{if(!document.getElementById("user-list-view")){le.removeEventListener("click",Be);return}const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"new-user":Ba();break;case"edit-user":const n=JSON.parse(t.dataset.user.replace(/&apos;/g,"'"));Ba(n);break;case"back-to-list":gt();break;case"delete-user":{e.stopPropagation();const o=t.dataset.userId;if(await T("Excluir Usuário","Tem certeza que deseja excluir este usuário? Esta ação é irreversível."))try{await ti(o),g("Usuário excluído com sucesso!","success"),gt()}catch(r){g(`Erro ao excluir: ${r.message}`,"error")}break}}},Te=async e=>{if(!document.getElementById("user-list-view")){le.removeEventListener("change",Te);return}const t=e.target.closest('input[data-action="toggle-user-status"]');if(e.target.id==="showInactiveUsersToggle")dt();else if(t){e.stopPropagation();const a=t.dataset.userId,n=t.checked?"active":"inactive";try{await oi(a,n),g(`Usuário ${n==="active"?"ativado":"inativado"} com sucesso.`,"success");const o=p.users.findIndex(s=>s.id===a);o>-1&&(p.users[o].status=n,dt())}catch(o){g(`Erro ao atualizar status: ${o.message}`,"error"),t.checked=!t.checked,dt()}}},le.addEventListener("click",Be),le.addEventListener("change",Te),await li()}const di=document.getElementById("content");let Ta={},_t=null;function ci(){Object.values(Ta).forEach(e=>e?.destroy()),Ta={}}function mi(e,t){const{jsPDF:a}=window.jspdf,n=new a({orientation:"landscape",unit:"px",format:"a4"}),o=document.getElementById("salesReportSummaryCards");if(n.setFontSize(18),n.text(e,n.internal.pageSize.getWidth()/2,40,{align:"center"}),o){const r=[["Receita Total",o.querySelector("#summary-revenue").textContent],["Vendas Totais",o.querySelector("#summary-transactions").textContent],["Ticket Médio",o.querySelector("#summary-avg-ticket").textContent]];n.autoTable({startY:60,head:[["Métrica","Valor"]],body:r,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const s=n.lastAutoTable?n.lastAutoTable.finalY+20:60;n.text("Detalhes das Vendas",20,s),n.autoTable({html:`#${t}`,startY:s+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),n.save(`${e.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function Ma(e){const t=document.getElementById("genericModal"),a=(e.payments||[]).map(n=>`
        <div class="flex justify-between text-sm">
            <span>${n.method.charAt(0).toUpperCase()+n.method.slice(1)}</span>
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
                    <p class="font-semibold text-gray-800">${e.client}</p>
                </div>
                 <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm font-medium text-gray-600">Itens</p>
                    <p class="font-semibold text-gray-800">${e.items}</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm font-medium text-gray-600">Responsável pelo Caixa</p>
                    <p class="font-semibold text-gray-800">${e.responsavelCaixa||"N/A"}</p>
                </div>
                 <div class="border-t pt-4 mt-4">
                     <h3 class="font-semibold mb-2">Pagamento</h3>
                     <div class="space-y-1">
                        ${a}
                     </div>
                     <div class="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                         <span>TOTAL</span>
                         <span>R$ ${e.total.toFixed(2)}</span>
                     </div>
                </div>
            </div>
        </div>
    `,t.style.display="flex"}function ui(e){const{summary:t,transactions:a}=e;document.getElementById("summary-revenue").textContent=`R$ ${t.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=t.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${t.averageTicket.toFixed(2)}`;const n=document.getElementById("paymentSummaryTableBody"),o=Object.entries(t.paymentMethodTotals).sort(([,i],[,d])=>d-i);n.innerHTML=o.map(([i,d])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${i.charAt(0).toUpperCase()+i.slice(1)}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${d.toFixed(2)}</td>
        </tr>
    `).join("");const s=document.getElementById("transactionsTableBody"),r=document.getElementById("mobileTransactionsList");if(a.length===0){const i='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';s.innerHTML=i,r.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}s.innerHTML=a.map((i,d)=>`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${d}">
            <td class="w-24 py-3 px-4">${new Date(i.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${i.client}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${i.items}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${i.type}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${i.total.toFixed(2)}</td>
        </tr>
    `).join(""),s.querySelectorAll("tr").forEach(i=>{i.addEventListener("dblclick",()=>{const d=i.dataset.transactionIndex,l=_t.transactions[d];l&&Ma(l)})}),r.innerHTML=a.map((i,d)=>`
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 active:bg-gray-50 cursor-pointer transition-colors" data-transaction-index="${d}">
            <div class="flex justify-between items-start mb-2">
                <div class="flex flex-col">
                    <span class="text-xs text-gray-500 font-medium">${new Date(i.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</span>
                    <span class="font-bold text-gray-800 text-lg">${i.client}</span>
                </div>
                <div class="text-right">
                    <span class="block font-bold text-green-600 text-lg">R$ ${i.total.toFixed(2)}</span>
                    <span class="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200">${i.type}</span>
                </div>
            </div>
            <div class="mt-2 pt-2 border-t border-dashed border-gray-200">
                <p class="text-sm text-gray-600 line-clamp-2">${i.items}</p>
            </div>
            <p class="text-xs text-blue-500 mt-2 text-center font-medium">Toque para ver detalhes</p>
        </div>
    `).join(""),r.querySelectorAll("div[data-transaction-index]").forEach(i=>{i.addEventListener("click",()=>{const d=i.dataset.transactionIndex,l=_t.transactions[d];l&&Ma(l)})})}async function Da(){const e=document.getElementById("main-reports-view"),t=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!e||!t||!a)return;const n=t.value,o=a.value;if(!n||!o)return g("Atenção","Por favor, selecione as datas de início e fim.","error");e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const s=document.getElementById("cashierSessionFilter").value,r=await ps({establishmentId:p.establishmentId,startDate:n,endDate:o,cashierSessionId:s});_t=r,e.innerHTML=`
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
        `,ui(r)}catch(s){g("Erro",`Não foi possível carregar o relatório: ${s.message}`,"error"),e.innerHTML=`<p class="p-8 text-center text-red-500">${s.message}</p>`}}async function pi(){ci();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];di.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",Da),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const n=document.getElementById("reportStartDate").value,o=document.getElementById("reportEndDate").value,s=`Relatorio_Vendas_${n}_a_${o}`;mi(s,"transactionsTable")});try{const n=await nn(),o=document.getElementById("cashierSessionFilter");n.forEach(s=>{const r=new Date(s.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),i=s.closedByName||"N/A";o.innerHTML+=`<option value="${s.id}">${i} - ${r}</option>`})}catch{g("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await Da()}const gi=document.getElementById("content");let I={payables:[],receivables:[],natures:[],costCenters:[],currentFilter:"pending",startDate:new Date(new Date().getFullYear(),new Date().getMonth()-1,1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],previousBalance:0,filterNaturezaId:"all",filterCostCenterId:"all",currentListView:"receivables"},Ct=null,et=null,tt=null;function ia(e){const t=new Map,a=[];return e&&(e.forEach(n=>t.set(n.id,{...n,children:[]})),t.forEach(n=>{n.parentId&&t.has(n.parentId)?t.get(n.parentId).children.push(n):a.push(n)})),a}function fo(e,t,a){if(!t||t.length===0){e.innerHTML='<p class="text-center text-gray-500">Nenhum item criado.</p>';return}const n=(o,s=0)=>{const r="— ".repeat(s);return`
            <div style="margin-left: ${s*20}px;" class="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>${r}${o.name}</span>
                <button data-action="delete-${a}" data-id="${o.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
            </div>
            ${o.children.map(i=>n(i,s+1)).join("")}
        `};e.innerHTML=t.map(o=>n(o)).join("")}async function Pa(e){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const t=document.getElementById("genericModal"),a=e==="nature",n=`Gerir ${a?"Naturezas Financeiras":"Centros de Custo"}`,o=a?Ve:Ue,s=a?"natures":"costCenters";t.innerHTML=`
        <div class="modal-content max-w-lg">
            <h2 class="text-2xl font-bold mb-6">${n}</h2>
            <form id="hierarchyForm" class="space-y-3 mb-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" id="itemName" placeholder="Nome do novo item" required class="p-2 border rounded-md w-full">
                    <select id="itemParent" class="p-2 border rounded-md bg-white w-full"><option value="">-- Nível Principal --</option></select>
                </div>
                <button type="submit" class="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg">Adicionar</button>
            </form>
            <div id="hierarchyList" class="space-y-1 max-h-64 overflow-y-auto p-2 border rounded-md"><div class="loader mx-auto"></div></div>
            <div class="mt-6"><button type="button" data-action="close-modal" data-target="genericModal" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg">Fechar</button></div>
        </div>`,t.style.display="flex";const r=t.querySelector("#hierarchyList"),i=t.querySelector("#itemParent"),d=c=>{const m=ia(c);fo(r,m,e),i.innerHTML='<option value="">-- Nível Principal --</option>';const u=(b,f="",v=0)=>{const k=v>0?"— ".repeat(v):"";i.innerHTML+=`<option value="${b.id}">${k}${b.name}</option>`,b.children.forEach($=>u($,f+"— "))};m.forEach(b=>u(b))},l=await o();I[s]=l,d(l),t.querySelector("#hierarchyForm").addEventListener("submit",async c=>{c.preventDefault();const m=t.querySelector("#itemName").value,u=i.value,b=a?xr:kr;try{await b({name:m,parentId:u||null});const f=await o();I[s]=f,d(f),t.querySelector("#hierarchyForm").reset(),await pe()}catch(f){g("Erro",`Não foi possível criar: ${f.message}`,"error")}})}function fi(e){const t=document.getElementById("cashFlowChart");if(!t)return;const a=t.getContext("2d");Ct&&Ct.destroy();const n=e.payables.map(o=>o*-1);Ct=new Chart(a,{type:"bar",data:{labels:e.labels,datasets:[{label:"Receitas",data:e.receivables,backgroundColor:"rgba(74, 222, 128, 0.6)",borderColor:"rgba(34, 197, 94, 1)",borderWidth:1,yAxisID:"y"},{label:"Despesas",data:n,backgroundColor:"rgba(248, 113, 113, 0.6)",borderColor:"rgba(239, 68, 68, 1)",borderWidth:1,yAxisID:"y"},{label:"Saldo Acumulado",data:e.expectedBalance,type:"line",borderColor:"rgba(59, 130, 246, 1)",backgroundColor:"rgba(59, 130, 246, 0.2)",borderWidth:3,pointRadius:4,pointBackgroundColor:"rgba(59, 130, 246, 1)",fill:!0,tension:.1,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{stacked:!0},y:{type:"linear",display:!0,position:"left",stacked:!0,title:{display:!0,text:"Movimentações (R$)"}},y1:{type:"linear",display:!0,position:"right",title:{display:!0,text:"Saldo Acumulado (R$)"},grid:{drawOnChartArea:!1}}},plugins:{tooltip:{callbacks:{label:function(o){let s=o.dataset.label||"";if(s&&(s+=": "),o.parsed.y!==null){const r=Math.abs(o.parsed.y);s+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(r)}return s}}}}}})}async function Aa(){const e=document.getElementById("cash-flow-chart-container"),t=document.getElementById("cashFlowStartDate").value,a=document.getElementById("cashFlowEndDate").value;if(!t||!a){g("Atenção","Por favor, selecione as datas de início e fim.","error");return}e.innerHTML='<div class="loader mx-auto my-10"></div>';try{const n=await Ar(t,a);e.innerHTML='<canvas id="cashFlowChart"></canvas>',fi(n)}catch(n){e.innerHTML=`<p class="text-red-500 text-center">Erro ao carregar dados do gráfico: ${n.message}</p>`}}function qa(){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const e=document.getElementById("genericModal"),t=new Date,a=new Date(t.getFullYear(),t.getMonth(),1).toISOString().split("T")[0],n=t.toISOString().split("T")[0];e.innerHTML=`
        <div class="modal-content max-w-4xl">
             <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-800">Fluxo de Caixa</h2>
                <button type="button" data-action="close-modal" data-target="genericModal" class="text-2xl font-bold">&times;</button>
            </div>
            <div class="flex flex-wrap items-end gap-4 mb-4 bg-gray-50 p-3 rounded-lg">
                <div>
                    <label for="cashFlowStartDate" class="text-sm font-medium">De:</label>
                    <input type="date" id="cashFlowStartDate" value="${a}" class="p-2 border rounded-md">
                </div>
                <div>
                    <label for="cashFlowEndDate" class="text-sm font-medium">Até:</label>
                    <input type="date" id="cashFlowEndDate" value="${n}" class="p-2 border rounded-md">
                </div>
                <button id="generateCashFlowBtn" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Gerar Gráfico</button>
            </div>
            <div id="cash-flow-chart-container" class="relative h-96">
                <canvas id="cashFlowChart"></canvas>
            </div>
        </div>
    `,e.style.display="flex",e.querySelector("#generateCashFlowBtn").addEventListener("click",Aa),Aa()}function bi(){const e=document.getElementById("genericModal"),t=I.payables.filter(m=>m.status==="pending").reduce((m,u)=>m+u.amount,0),a=I.receivables.filter(m=>m.status==="pending").reduce((m,u)=>m+u.amount,0),n=a-t,o=I.payables.filter(m=>m.status==="paid").reduce((m,u)=>m+u.amount,0),s=I.receivables.filter(m=>m.status==="paid").reduce((m,u)=>m+u.amount,0),r=s-o,i=I.previousBalance||0,d=i+r,l=m=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(m),c=m=>m>=0?"text-green-600":"text-red-600";e.innerHTML=`
        <div class="modal-content max-w-4xl max-h-[90vh] flex flex-col">
             <div class="flex justify-between items-center p-6 border-b">
                <h2 class="text-2xl font-bold text-gray-800">Painel de Indicadores Financeiros</h2>
                <button type="button" data-action="close-modal" data-target="genericModal" class="text-2xl font-bold text-gray-500 hover:text-gray-800">&times;</button>
            </div>
            <div class="p-6 overflow-y-auto space-y-8">
                
                <p class="text-center text-sm text-gray-500 mb-6 bg-yellow-50 p-2 rounded-md">
                    Análise do período: ${new Date(I.startDate+"T00:00:00").toLocaleDateString("pt-BR")} a ${new Date(I.endDate+"T00:00:00").toLocaleDateString("pt-BR")}.
                </p>
                
                <!-- BLOCO 1: SALDO DE PERÍODO (REALIZADO) -->
                <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 class="text-xl font-semibold text-indigo-700 mb-4 border-b pb-2">Realizado no Período (Fechado)</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-green-400">
                            <p class="text-gray-500 text-sm">Total Recebido</p>
                            <p class="text-2xl font-bold text-green-600">${l(s)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-red-400">
                            <p class="text-gray-500 text-sm">Total Pago</p>
                            <p class="text-2xl font-bold text-red-600">${l(o)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 ${c(r)==="text-green-600"?"border-green-600":"border-red-600"}">
                            <p class="text-gray-700 text-sm font-medium">Saldo do Período</p>
                            <p class="text-2xl font-bold ${c(r)}">${l(r)}</p>
                        </div>
                    </div>
                </div>

                <!-- BLOCO 2: FLUXO E SALDO ACUMULADO -->
                <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Balanço Patrimonial e Acumulado</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-indigo-400">
                            <p class="text-gray-500 text-sm">Saldo Inicial (Realizado)</p>
                            <p class="text-2xl font-bold ${c(i)}">${l(i)}</p>
                            <p class="text-xs text-gray-400 mt-1">Acumulado antes do período</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 border-blue-600">
                            <p class="text-gray-700 text-sm font-medium">Saldo Final Acumulado</p>
                            <p class="text-2xl font-bold ${c(d)}">${l(d)}</p>
                            <p class="text-xs text-gray-400 mt-1">Inicial + Saldo do Período</p>
                        </div>
                    </div>
                </div>

                <!-- BLOCO 3: ANÁLISE FUTURA (PENDENTE) -->
                <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Previsão (Abertos no Período)</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                         <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-green-400">
                            <p class="text-gray-500 text-sm">A Receber (Pendente)</p>
                            <p class="text-2xl font-bold text-green-600">${l(a)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-red-400">
                            <p class="text-gray-500 text-sm">A Pagar (Pendente)</p>
                            <p class="text-2xl font-bold text-red-600">${l(t)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 ${c(n)==="text-green-600"?"border-green-600":"border-red-600"}">
                            <p class="text-gray-700 text-sm font-medium">Saldo Previsto</p>
                            <p class="text-2xl font-bold ${c(n)}">${l(n)}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `,e.style.display="flex"}function vi(){const e=document.getElementById("genericModal");e.innerHTML=`
        <div class="modal-content max-w-lg">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">Configurações</h2>
                <button type="button" data-action="close-modal" data-target="genericModal" class="text-2xl font-bold text-gray-500 hover:text-gray-800">&times;</button>
            </div>
            <div class="space-y-4">
                <button data-action="manage-natures" class="w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-4">
                    <svg class="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h.01M7 11h.01M16 7h.01M16 3h.01M16 11h.01M12 21V3m0 18H9m3 0h3m-3 0V3m0 0H9m3 0h3m0 18v-3.07a3.001 3.001 0 00-1.7-2.684l-3.398-1.963a3.001 3.001 0 00-3.8 0l-3.398 1.963A3.001 3.001 0 003 17.93V21h9z" /></svg>
                    <div>
                        <p class="font-semibold text-gray-800">Gerir Naturezas Financeiras</p>
                        <p class="text-sm text-gray-600">Organize suas categorias de receita/despesa.</p>
                    </div>
                </button>
                <button data-action="manage-cost-centers" class="w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-4">
                    <svg class="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    <div>
                        <p class="font-semibold text-gray-800">Gerir Centros de Custo</p>
                        <p class="text-sm text-gray-600">Atribua lançamentos a departamentos ou projetos.</p>
                    </div>
                </button>
            </div>
        </div>
    `,e.style.display="flex"}function at(e,t="all"){let a='<option value="all">Todos</option>';const n=r=>{const i=new Map,d=[];return r&&(r.forEach(l=>i.set(l.id,{...l,children:[]})),i.forEach(l=>{l.parentId&&i.has(l.parentId)?i.get(l.parentId).children.push(l):d.push(l)})),d},o=(r,i=0)=>{const d=i>0?"— ".repeat(i):"",l=r.id===t?"selected":"";a+=`<option value="${r.id}" ${l}>${d}${r.name}</option>`,r.children.forEach(c=>o(c,i+1))};return n(e).forEach(r=>o(r)),a}async function pe(){const e=document.getElementById("financial-content"),t=document.getElementById("filterStartDate")?.value,a=document.getElementById("filterEndDate")?.value,n=document.getElementById("filterNaturezaId")?.value,o=document.getElementById("filterCostCenterId")?.value;if(!t||!a){try{const[i,d]=await Promise.all([Ve(),Ue()]);I={...I,natures:i,costCenters:d},document.getElementById("filterNaturezaId")&&(document.getElementById("filterNaturezaId").innerHTML=at(I.natures)),document.getElementById("filterCostCenterId")&&(document.getElementById("filterCostCenterId").innerHTML=at(I.costCenters))}catch(i){g("Erro",`Não foi possível carregar os dados base: ${i.message}`,"error")}Wt(),Fa();return}const s=document.getElementById("payables-list"),r=document.getElementById("receivables-list");s&&(s.innerHTML='<div class="loader mx-auto"></div>'),r&&(r.innerHTML='<div class="loader mx-auto"></div>');try{const i={startDate:t,endDate:a};n&&n!=="all"&&(i.natureId=n),o&&o!=="all"&&(i.costCenterId=o);const[d,l,c,m]=await Promise.all([$r(i),Tr(i),Ve(),Ue()]),u=l.previousBalance-d.previousBalance;I={...I,payables:d.entries,receivables:l.entries,natures:c,costCenters:m,previousBalance:u,filterNaturezaId:n,filterCostCenterId:o},document.getElementById("filterNaturezaId")&&(document.getElementById("filterNaturezaId").innerHTML=at(I.natures,I.filterNaturezaId)),document.getElementById("filterCostCenterId")&&(document.getElementById("filterCostCenterId").innerHTML=at(I.costCenters,I.filterCostCenterId)),Wt(),Fa()}catch(i){g("Erro",`Não foi possível carregar os dados: ${i.message}`,"error"),e&&(e.innerHTML='<p class="text-red-500 text-center">Falha ao carregar dados.</p>')}}async function hi(e,t,a=null){e.preventDefault();const n=e.target,o=n.querySelector('[name="status"]').checked,s=n.querySelector('[name="paymentDate"]').value,r=parseFloat(n.querySelector('[name="amount"]').value),i=parseInt(n.querySelector('[name="installments"]')?.value,10)||1;if(isNaN(r)){g("Erro de Validação","O valor inserido é inválido.","error");return}if(o&&!s){g("Erro de Validação","Por favor, forneça a data de pagamento para um lançamento pago.","error");return}const d={description:n.querySelector('[name="description"]').value,amount:r,dueDate:n.querySelector('[name="dueDate"]').value,naturezaId:n.querySelector('[name="naturezaId"]').value||null,centroDeCustoId:n.querySelector('[name="centroDeCustoId"]').value||null,notes:n.querySelector('[name="notes"]').value,status:o?"paid":"pending",paymentDate:o?s:null,installments:a?1:i};try{a?(await(t==="payable"?Ir(a,d):Mr(a,d)),g("Sucesso","Lançamento atualizado!","success")):(await(t==="payable"?Sr(d):Br(d)),g("Sucesso","Lançamento adicionado!","success")),document.getElementById("genericModal").style.display="none",await pe()}catch(l){g("Erro",`Não foi possível salvar: ${l.message}`,"error")}}async function yi(e,t){if(await T("Confirmar Exclusão","Tem certeza? Esta ação é irreversível."))try{await(e==="payable"?Cr(t):Dr(t)),g("Sucesso","Lançamento excluído!","success"),await pe()}catch(n){g("Erro",`Falha ao excluir: ${n.message}`,"error")}}async function xi(e,t){const a=new Date().toISOString().split("T")[0];try{await(e==="payable"?Lr(t,a):Pr(t,a)),g("Sucesso","Lançamento atualizado!","success"),await pe()}catch(n){g("Erro",`Falha ao atualizar status: ${n.message}`,"error")}}function Na(e){const t=I.currentFilter;return t==="all"?e:e.filter(a=>a.status===t)}function Wt(){const e=document.getElementById("payables-list"),t=document.getElementById("receivables-list");if(!e||!t)return;const a=new Map(I.natures.map(i=>[i.id,i.name])),n=new Map(I.costCenters.map(i=>[i.id,i.name])),o=Na(I.payables),s=Na(I.receivables),r=(i,d)=>{const l=i.status==="paid",c=JSON.stringify(i).replace(/'/g,"&apos;"),m=i.naturezaId?a.get(i.naturezaId):"N/A",u=i.centroDeCustoId?n.get(i.centroDeCustoId):"N/A";let b=d==="payable"?"text-red-600":"text-green-600";const f=l?"bg-gray-200 text-gray-600":d==="payable"?"bg-red-100 text-red-700":"bg-yellow-100 text-yellow-700",v=l?"Finalizado":"Pendente";return l&&(b="text-gray-500"),`
        <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 ${l?"border-gray-300 opacity-70":d==="payable"?"border-red-400":"border-green-400"}">
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-bold">${i.description}</p>
                    <p class="text-sm text-gray-500">Vence em: ${new Date(i.dueDate+"T00:00:00").toLocaleDateString("pt-BR")}</p>
                    <div class="flex flex-wrap gap-2 mt-1">
                        <span class="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">Natureza: ${m}</span>
                        <span class="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">C. Custo: ${u}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-right">
                    <p class="font-bold text-lg ${b}">R$ ${i.amount.toFixed(2)}</p>
                    <div class="flex flex-col items-center gap-1">
                        <span class="text-xs font-semibold px-2 py-1 rounded-full ${f}">${v}</span>
                        <div class="flex">
                            ${l?"":`<button data-action="mark-as-paid" data-type="${d}" data-id="${i.id}" class="text-gray-500 hover:text-green-500 p-1" title="Marcar como pago/recebido"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>`}
                            <button data-action="edit" data-type="${d}" data-item='${c}' class="text-gray-400 hover:text-blue-500 p-1" title="Editar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                            <button data-action="delete" data-type="${d}" data-id="${i.id}" class="text-gray-400 hover:text-red-500 p-1" title="Apagar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`};e.innerHTML=o.map(i=>r(i,"payable")).join("")||'<p class="text-center text-gray-500 py-4">Nenhuma conta a pagar.</p>',t.innerHTML=s.map(i=>r(i,"receivable")).join("")||'<p class="text-center text-gray-500 py-4">Nenhuma conta a receber.</p>'}function Fa(){const e=I.payables.filter(o=>o.status==="pending").reduce((o,s)=>o+s.amount,0),t=I.receivables.filter(o=>o.status==="pending").reduce((o,s)=>o+s.amount,0),a=t-e;document.getElementById("summary-pending-receivables").textContent=`R$ ${t.toFixed(2)}`,document.getElementById("summary-pending-payables").textContent=`R$ ${e.toFixed(2)}`,document.getElementById("summary-pending-balance").textContent=`R$ ${a.toFixed(2)}`;const n=document.getElementById("summary-pending-balance");n&&(n.className=`text-2xl font-bold ${a>=0?"text-green-600":"text-red-600"}`)}function Lt(e,t=null){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const a=document.getElementById("genericModal"),n=`${t?"Editar":"Nova"} ${e==="payable"?"Despesa":"Receita"}`,o=e==="payable"?"bg-red-600 hover:bg-red-700":"bg-green-600 hover:bg-green-700",s=u=>{let b='<option value="">-- Selecione (Opcional) --</option>';const f=ia(u),v=(k,$="",S=0)=>{const w=S>0?"— ".repeat(S):"";b+=`<option value="${k.id}">${w}${k.name}</option>`,k.children.forEach(E=>v(E,$+"— "))};return f.forEach(k=>v(k)),b},r=s(I.natures),i=s(I.costCenters),d=t?"":`
        <div>
            <label>Número de Parcelas</label>
            <input type="number" name="installments" class="w-full p-2 border rounded-md" value="1" min="1" max="36">
        </div>
    `;a.innerHTML=`
        <div class="modal-content max-w-lg">
            <h2 class="text-2xl font-bold mb-6">${n}</h2>
            <form id="financial-form" class="space-y-4">
                <div><label>Descrição</label><input type="text" name="description" required class="w-full p-2 border rounded-md" value="${t?.description||""}"></div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="md:col-span-1"><label>Valor Total (R$)</label><input type="number" step="0.01" name="amount" required class="w-full p-2 border rounded-md" value="${t?.amount||""}"></div>
                    <div class="md:col-span-1"><label>1º Vencimento</label><input type="date" name="dueDate" required class="w-full p-2 border rounded-md" value="${t?.dueDate||""}"></div>
                    <div class="md:col-span-1">${d}</div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div><label>Natureza</label><select name="naturezaId" class="w-full p-2 border rounded-md bg-white">${r}</select></div>
                    <div><label>Centro de Custo</label><select name="centroDeCustoId" class="w-full p-2 border rounded-md bg-white">${i}</select></div>
                </div>
                <div><label>Observações</label><textarea name="notes" class="w-full p-2 border rounded-md">${t?.notes||""}</textarea></div>
                <div class="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <label for="status" class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" id="status" name="status" class="sr-only"><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div><span class="ml-3 font-semibold text-gray-700">Marcar como Pago/Recebido</span></label>
                    <div id="payment-date-container" class="hidden"><label>Data Pgto.</label><input type="date" name="paymentDate" class="p-2 border rounded-md"></div>
                </div>
                <div class="flex gap-4 pt-4"><button type="button" data-action="close-modal" data-target="genericModal" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg">Cancelar</button><button type="submit" class="w-full py-2 px-4 text-white font-semibold rounded-lg ${o}">Salvar</button></div>
            </form>
        </div>`,a.style.display="flex",t&&(a.querySelector('[name="naturezaId"]').value=t.naturezaId||"",a.querySelector('[name="centroDeCustoId"]').value=t.centroDeCustoId||"");const l=a.querySelector("#status"),c=a.querySelector("#payment-date-container"),m=a.querySelector('[name="paymentDate"]');t?.status==="paid"&&(l.checked=!0,c.classList.remove("hidden"),m.value=t.paymentDate||new Date().toISOString().split("T")[0]),l.addEventListener("change",()=>{c.classList.toggle("hidden",!l.checked),m.required=l.checked}),a.querySelector("#financial-form").addEventListener("submit",u=>hi(u,e,t?.id))}async function wi(){const e=new Date,a=new Date(e.getFullYear(),e.getMonth()-1,1).toISOString().split("T")[0],n=e.toISOString().split("T")[0];I.startDate=a,I.endDate=n,I.currentFilter="pending",I.filterNaturezaId="all",I.filterCostCenterId="all",gi.innerHTML=`
        <section>
            <div class="flex flex-wrap gap-4 justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Módulo Financeiro</h2>
                <div class="flex items-center gap-2 flex-wrap">
                    <!-- Mobile Toggle Buttons (visível apenas em telas pequenas) -->
                    <button data-action="toggle-filters" class="md:hidden py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 flex items-center gap-2">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                        Filtros
                    </button>
                    <button data-action="open-indicators-modal" class="md:hidden py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 flex items-center gap-2">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6a1 1 0 011-1h4a1 1 0 011 1v13m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0H9"/></svg>
                        Indicadores
                    </button>
                    <!-- NOVO BOTÃO DE CONFIGURAÇÕES (MOBILE) -->
                    <button data-action="open-settings-modal" class="md:hidden py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 flex items-center gap-2">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        Config.
                    </button>
                    
                    <!-- Desktop Buttons (visível em telas médias e maiores) -->
                    <div class="hidden md:flex items-center gap-2 flex-wrap">
                        <button data-action="open-cash-flow-modal" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            Fluxo de Caixa
                        </button>
                        <button data-action="manage-natures" class="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">Gerir Naturezas</button>
                        <button data-action="manage-cost-centers" class="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">Gerir Centros de Custo</button>
                        
                        <!-- Botão de Indicadores para Desktop -->
                        <button data-action="open-indicators-modal" class="py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 flex items-center gap-2">
                             <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6a1 1 0 011-1h4a1 1 0 011 1v13m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0H9"/></svg>
                            Indicadores
                        </button>
                    </div>
                </div>
            </div>

            <div id="financial-content">
                <!-- Indicadores do Dia (Compactados e Mantidos sempre visíveis) -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div class="bg-red-50 border-l-4 border-red-400 p-3 rounded-lg shadow">
                        <p class="text-gray-500 font-semibold text-sm">A Pagar Hoje (Pendente)</p>
                        <p id="summary-today-payables" class="text-2xl font-bold text-red-600">R$ 0,00</p>
                    </div>
                    <div class="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow">
                        <p class="text-gray-500 font-semibold text-sm">A Receber Hoje (Pendente)</p>
                        <p id="summary-today-receivables" class="text-2xl font-bold text-green-600">R$ 0,00</p>
                    </div>
                </div>

                <!-- BLOCO DE FILTROS AVANÇADOS (Oculto em mobile por padrão - hidden md:block) -->
                <div id="advanced-filters" class="hidden md:block bg-white p-3 rounded-lg shadow-md mb-4">
                    <h3 class="text-lg font-semibold text-gray-700 mb-3">Filtrar Período e Critérios</h3>
                    <div class="grid grid-cols-2 md:flex md:flex-wrap items-end gap-3 mb-3">
                        <div class="w-full md:w-auto">
                            <label for="filterStartDate" class="text-xs font-medium">De:</label>
                            <input type="date" id="filterStartDate" value="${I.startDate}" class="w-full p-1 border rounded-md text-sm">
                        </div>
                        <div class="w-full md:w-auto">
                            <label for="filterEndDate" class="text-xs font-medium">Até:</label>
                            <input type="date" id="filterEndDate" value="${I.endDate}" class="w-full p-1 border rounded-md text-sm">
                        </div>
                        
                        <div class="w-full md:w-48">
                            <label for="filterNaturezaId" class="text-xs font-medium">Natureza:</label>
                            <select id="filterNaturezaId" class="w-full p-1 border rounded-md bg-white text-sm">
                                <option value="all">A carregar...</option>
                            </select>
                        </div>
                        
                        <div class="w-full md:w-48">
                            <label for="filterCostCenterId" class="text-xs font-medium">Centro de Custo:</label>
                            <select id="filterCostCenterId" class="w-full p-1 border rounded-md bg-white text-sm">
                                <option value="all">A carregar...</option>
                            </select>
                        </div>
                        
                        <!-- Botão explícito para aplicar filtro -->
                        <button id="applyDateFilterBtn" class="w-full md:w-auto py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 col-span-2 md:col-span-auto">Aplicar Filtro</button>
                    </div>
                    
                    <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3 border-t pt-3 mt-3">
                        <button data-status-filter="pending" class="filter-btn py-1 px-3 rounded-full text-xs font-semibold transition-colors bg-gray-100 text-gray-600">Aberto/Pendente</button>
                        <button data-status-filter="paid" class="filter-btn py-1 px-3 rounded-full text-xs font-semibold transition-colors bg-gray-100 text-gray-600">Pago/Finalizado</button>
                        <button data-status-filter="all" class="filter-btn py-1 px-3 rounded-full text-xs font-semibold transition-colors bg-gray-100 text-gray-600">Todos os Lançamentos</button>
                    </div>
                </div>
                
                <!-- OCULTO: Resumo Previsto (Movido para o modal de Indicadores) -->
                <div class="hidden">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Resumo Previsto (No Período)</h3>
                    <!-- Resumo Previsto (Compactado e ajustado para 2 colunas no mobile) -->
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 text-center">
                        <div class="bg-white p-3 rounded-lg shadow">
                            <p class="text-gray-500 text-sm">A Receber (Pendente)</p>
                            <p id="summary-pending-receivables" class="text-2xl font-bold text-green-600">R$ 0.00</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow">
                            <p class="text-gray-500 text-sm">A Pagar (Pendente)</p>
                            <p id="summary-pending-payables" class="text-2xl font-bold text-red-600">R$ 0.00</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow col-span-2 md:col-span-1">
                            <p class="text-gray-500 text-sm">Saldo Previsto</p>
                            <p id="summary-pending-balance" class="text-2xl font-bold text-gray-800">R$ 0.00</p>
                        </div>
                    </div>
                </div>

                <!-- Botoes de alternancia de lista para mobile -->
                <div id="list-toggle-buttons" class="grid grid-cols-2 gap-3 mb-4 md:hidden">
                    <button data-action="toggle-list-view" data-list="payables" id="btn-payables-view" class="py-2 px-4 font-semibold rounded-lg shadow-md bg-gray-200 text-red-700">Contas a Pagar</button>
                    <button data-action="toggle-list-view" data-list="receivables" id="btn-receivables-view" class="py-2 px-4 font-semibold rounded-lg shadow-md bg-green-100 text-green-700 border border-green-500">Contas a Receber</button>
                </div>


                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Contas a Pagar -->
                    <div id="payables-container" class="lg:col-span-1">
                        <h3 class="text-xl font-semibold text-red-700 mb-4">Contas a Pagar</h3>
                        <div id="payables-list" class="space-y-3"></div>
                    </div>
                    <!-- Contas a Receber -->
                    <div id="receivables-container" class="lg:col-span-1">
                        <h3 class="text-xl font-semibold text-green-700 mb-4">Contas a Receber</h3>
                        <div id="receivables-list" class="space-y-3"></div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- FLOATING ACTION BUTTON (FAB) -->
        <div id="main-fab-container" class="fixed bottom-6 right-6 z-50">
            <!-- FAB Menu -->
            <div id="fab-menu" class="flex flex-col items-end space-y-3 mb-3 hidden">
                <!-- BOTÃO FLUXO DE CAIXA (NOVO) -->
                <button data-action="open-cash-flow-modal" class="p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 flex items-center gap-2 transition-transform transform hover:scale-105 text-sm">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    Fluxo de Caixa
                </button>
                <button data-action="open-modal" data-type="receivable" class="p-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 flex items-center gap-2 transition-transform transform hover:scale-105 text-sm">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                    Nova Receita
                </button>
                <button data-action="open-modal" data-type="payable" class="p-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 flex items-center gap-2 transition-transform transform hover:scale-105 text-sm">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                    Nova Despesa
                </button>
            </div>
            <!-- Main FAB Button -->
            <button data-action="toggle-fab-menu" id="main-fab-btn" class="w-14 h-14 bg-indigo-600 text-white font-bold text-3xl rounded-full shadow-xl hover:bg-indigo-700 flex items-center justify-center transition-transform duration-200">
                <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
            </button>
        </div>
    `;const o=document.getElementById("main-fab-btn"),s=document.getElementById("fab-menu");if(o&&s){o.addEventListener("click",v=>{v.stopPropagation(),s.classList.toggle("hidden"),o.classList.toggle("rotate-45")});const u=s.querySelector('button[data-action="open-modal"][data-type="receivable"]'),b=s.querySelector('button[data-action="open-modal"][data-type="payable"]'),f=s.querySelector('button[data-action="open-cash-flow-modal"]');u&&u.addEventListener("click",v=>{v.stopPropagation(),Lt("receivable")}),b&&b.addEventListener("click",v=>{v.stopPropagation(),Lt("payable")}),f&&f.addEventListener("click",v=>{v.stopPropagation(),qa()})}et&&document.body.removeEventListener("click",et),tt&&document.getElementById("genericModal").removeEventListener("click",tt);const r=()=>{const u=document.getElementById("filterStartDate"),b=document.getElementById("filterEndDate"),f=document.getElementById("filterNaturezaId"),v=document.getElementById("filterCostCenterId");I.startDate=u.value,I.endDate=b.value,I.filterNaturezaId=f.value,I.filterCostCenterId=v.value;const k=document.getElementById("advanced-filters");k&&k.classList.contains("hidden")===!1&&window.innerWidth<768&&k.classList.add("hidden"),pe()},i=u=>{const b=u.target.closest("[data-status-filter]");if(!b)return;const f=b.dataset.statusFilter;I.currentFilter=f,document.querySelectorAll("[data-status-filter]").forEach(v=>{v.classList.remove("bg-blue-100","text-blue-800"),v.classList.add("bg-gray-100","text-gray-600")}),b.classList.remove("bg-gray-100","text-gray-600"),b.classList.add("bg-blue-100","text-blue-800"),Wt()},d=u=>{const b=document.getElementById("payables-container"),f=document.getElementById("receivables-container"),v=document.getElementById("btn-payables-view"),k=document.getElementById("btn-receivables-view");window.innerWidth>=1024&&I.currentListView===u||(u==="payables"?(b.classList.remove("hidden"),f.classList.add("hidden"),v&&(v.classList.remove("bg-gray-200"),v.classList.add("bg-red-100","border","border-red-500")),k&&(k.classList.remove("bg-green-100","border","border-green-500"),k.classList.add("bg-gray-200"))):(b.classList.add("hidden"),f.classList.remove("hidden"),v&&(v.classList.remove("bg-red-100","border","border-red-500"),v.classList.add("bg-gray-200")),k&&(k.classList.remove("bg-gray-200"),k.classList.add("bg-green-100","border","border-green-500"))),I.currentListView=u)};document.getElementById("applyDateFilterBtn").addEventListener("click",r),document.getElementById("filterNaturezaId").addEventListener("change",()=>{I.filterNaturezaId=document.getElementById("filterNaturezaId").value}),document.getElementById("filterCostCenterId").addEventListener("change",()=>{I.filterCostCenterId=document.getElementById("filterCostCenterId").value}),document.querySelectorAll("[data-status-filter]").forEach(u=>{u.addEventListener("click",i)}),et=u=>{const b=u.target.closest("button[data-action]");if(!b)return;const{action:f,type:v,id:k}=b.dataset;f==="edit"?Lt(v,JSON.parse(b.dataset.item.replace(/&apos;/g,"'"))):f==="delete"?yi(v,k):f==="mark-as-paid"?xi(v,k):f==="manage-natures"?Pa("nature"):f==="manage-cost-centers"?Pa("cost-center"):f==="open-cash-flow-modal"?qa():f==="toggle-filters"?document.getElementById("advanced-filters")?.classList.toggle("hidden"):f==="open-indicators-modal"?bi():f==="open-settings-modal"?vi():f==="toggle-list-view"&&d(b.dataset.list)},tt=u=>{const b=u.target.closest('button[data-action^="delete-"]');if(b){const f=b.dataset.action.split("-")[1];l(f,b.dataset.id)}},document.body.addEventListener("click",et),document.getElementById("genericModal").addEventListener("click",tt);async function l(u,b){const f=u==="nature",v=f?wr:Er,k=f?Ve:Ue,$=f?"natures":"costCenters",S=document.getElementById("hierarchyList");if(await T("Apagar Item","Tem a certeza? Apagar um item principal também apagará os seus sub-itens."))try{await v(b);const E=await k();I[$]=E,fo(S,ia(E),u),await pe()}catch(E){g("Erro",`Não foi possível apagar: ${E.message}`,"error")}}const c=()=>{const u=window.innerWidth<1024,b=document.getElementById("payables-container"),f=document.getElementById("receivables-container"),v=document.getElementById("list-toggle-buttons");b&&f&&(b.classList.remove("hidden"),f.classList.remove("hidden"),u?(b.classList.remove("lg:col-span-1"),f.classList.remove("lg:col-span-1"),v?.classList.remove("hidden"),d(I.currentListView)):(b.classList.add("lg:col-span-1"),f.classList.add("lg:col-span-1"),v?.classList.add("hidden"),b.classList.remove("hidden"),f.classList.remove("hidden")))};c(),window.addEventListener("resize",c);const m=document.querySelector(`[data-status-filter="${I.currentFilter}"]`);m&&(document.querySelectorAll("[data-status-filter]").forEach(u=>{u.classList.remove("bg-blue-100","text-blue-800"),u.classList.add("bg-gray-100","text-gray-600")}),m.classList.remove("bg-gray-100","text-gray-600"),m.classList.add("bg-blue-100","text-blue-800"));try{const u=await qr(),b=document.getElementById("summary-today-payables");b&&(b.textContent=`R$ ${u.totalPayables.toFixed(2)}`);const f=document.getElementById("summary-today-receivables");f&&(f.textContent=`R$ ${u.totalReceivables.toFixed(2)}`)}catch{g("Erro","Não foi possível carregar o resumo do dia.","error")}await pe()}const ki=e=>y("/api/commissions/calculate",{method:"POST",body:JSON.stringify(e)}),Ei=e=>y("/api/commissions/save",{method:"POST",body:JSON.stringify(e)}),Si=(e={})=>{const t=new URLSearchParams(e).toString(),a=`/api/commissions/history${t?"?"+t:""}`;return y(a)},$i=e=>y(`/api/commissions/report/${e}`,{method:"DELETE"}),Ee=document.getElementById("content");let Fe=[],bo="",ot=null,xe={};function Ii(e){const{jsPDF:t}=window.jspdf,a=new t;a.setFontSize(18),a.text(`Recibo de Comissão - ${e.professionalName}`,105,20,null,null,"center"),a.setFontSize(12),a.text(`Período: ${e.period}`,105,30,null,null,"center"),a.autoTable({startY:40,head:[["Descrição","Valor (R$)"]],body:[["Total Comissionável",`R$ ${e.summary.totalCommissionableValue.toFixed(2)}`],["Total de Itens",e.summary.totalItems]],theme:"striped"});const n=a.lastAutoTable.finalY+20;a.setFontSize(14),a.setFont(void 0,"bold"),a.text("Valor Total da Comissão:",14,n),a.text(`R$ ${e.summary.totalCommission.toFixed(2)}`,190,n,null,null,"right");const o=n+80;a.line(40,o,170,o),a.setFontSize(10),a.setFont(void 0,"normal"),a.text(e.professionalName,105,o+10,null,null,"center"),a.save(`recibo_comissao_${e.professionalName}_${e.period.replace(/\//g,"-")}.pdf`)}function Ci(){const e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1).toISOString().split("T")[0],a=e.toISOString().split("T")[0],o=`
        <form id="calculation-form" class="space-y-6">
            
            <div>
                <label class="block text-sm font-bold text-gray-800 mb-3">Profissionais Selecionados</label>
                <div class="mb-3">
                    <label class="flex items-center p-3 bg-indigo-50 rounded-lg border border-indigo-300 cursor-pointer hover:bg-indigo-100 transition shadow-sm">
                        <input type="checkbox" id="calc-professionals-all" class="h-5 w-5 text-indigo-700 border-indigo-400 rounded focus:ring-indigo-600">
                        <span class="ml-4 text-md font-semibold text-indigo-800">Selecionar Todos</span>
                    </label>
                </div>

                <div id="professionals-cards-container" class="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg bg-gray-50">
                    ${p.professionals.map(l=>`
        <label class="flex items-center p-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-indigo-50 transition">
            <input type="checkbox" value="${l.id}" class="professional-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
            <span class="ml-3 text-sm font-medium text-gray-700">${l.name}</span>
        </label>
    `).join("")}
                </div>
            </div>

            <div>
                <label class="block text-sm font-bold text-gray-800">Período de Cálculo</label>
                <div class="mt-2 grid grid-cols-2 gap-4">
                    <input type="date" id="calc-start-date" value="${t}" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm">
                    <input type="date" id="calc-end-date" value="${a}" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm">
                </div>
            </div>
            
            <div class="p-4 bg-gray-100 rounded-lg border">
                <label class="block text-sm font-bold text-gray-800 mb-2">Itens para Incluir</label>
                <div class="mt-2 space-y-2">
                    <label class="flex items-center text-sm font-medium text-gray-700">
                        <input type="checkbox" id="calc-type-services" checked class="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"> 
                        <span class="ml-2">Serviços</span>
                    </label>
                    <label class="flex items-center text-sm font-medium text-gray-700">
                        <input type="checkbox" id="calc-type-products" checked class="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"> 
                        <span class="ml-2">Produtos</span>
                    </label>
                    <label class="flex items-center text-sm font-medium text-gray-700">
                        <input type="checkbox" id="calc-type-packages" class="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"> 
                        <span class="ml-2">Pacotes</span>
                    </label>
                </div>
            </div>
            
            <div class="pt-4 border-t">
                <button type="submit" class="w-full bg-indigo-600 text-white font-extrabold py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:scale-[1.01] flex items-center justify-center gap-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m-3 3v6m-3-9h6m-6 9h6m3-9a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Calcular Previsão
                </button>
            </div>
        </form>
    `,{modalElement:s}=j({title:"✨ Novo Cálculo de Comissões",contentHTML:o,maxWidth:"max-w-xl"}),r=s.querySelector("#calculation-form"),i=s.querySelector("#calc-professionals-all"),d=s.querySelectorAll(".professional-checkbox");i.addEventListener("change",l=>{d.forEach(c=>{c.checked=l.target.checked})}),d.forEach(l=>{l.addEventListener("change",()=>{l.checked?Array.from(d).every(m=>m.checked)&&(i.checked=!0):i.checked=!1})}),r.addEventListener("submit",l=>{l.preventDefault();const c=Array.from(d).filter(u=>u.checked).map(u=>u.value);if(c.length===0){g("Atenção","Selecione pelo menos um profissional para o cálculo.","error");return}Bi({professionalIds:c});const m=s.querySelector("[data-close-modal]");m?m.click():s.style.display="none"})}async function Li(e){if(await T("Excluir Relatório","Tem a certeza que deseja excluir permanentemente este relatório de comissão? Esta ação não pode ser desfeita."))try{await $i(e),g("Sucesso!","Relatório de comissão excluído.","success"),ct()}catch(a){g("Erro",`Não foi possível excluir: ${a.message}`,"error")}}async function Bi(e){const{professionalIds:t}=e,a=document.getElementById("calc-start-date")?.value,n=document.getElementById("calc-end-date")?.value,o={services:document.getElementById("calc-type-services")?.checked,products:document.getElementById("calc-type-products")?.checked,packages:document.getElementById("calc-type-packages")?.checked};if(!a||!n){g("Erro","As datas não foram capturadas corretamente.","error");return}F("commissions-section",{view:"results",isLoading:!0});try{const s=await ki({professionalIds:t,startDate:a,endDate:n,calculationTypes:o});Fe=s;const r=`${new Date(a+"T00:00:00").toLocaleDateString("pt-BR")} a ${new Date(n+"T00:00:00").toLocaleDateString("pt-BR")}`;bo=r,Di(s,r)}catch(s){g("Erro",`Não foi possível calcular: ${s.message}`,"error"),F("commissions-section",{view:"history"})}}async function Ti(){if(Fe.length===0){g("Erro","Não há resultados para salvar.","error");return}const e=bo;if(await T("Salvar Relatórios",`Tem a certeza que deseja salvar ${Fe.length} relatório(s) de comissão para o período de ${e}?`))try{const a=Fe.map(n=>Ei({professionalId:n.professionalId,professionalName:n.professionalName,period:e,reportData:n}));await Promise.all(a),g("Sucesso!","Relatórios de comissão salvos.","success"),F("commissions-section",{view:"history"})}catch(a){g("Erro",`Não foi possível salvar: ${a.message}`,"error")}}async function ct(){const e=document.getElementById("commissionHistory");if(!e)return;const t=document.getElementById("filter-professional")?.value||"",a=document.getElementById("filter-month")?.value||"";xe={},t&&t!=="all"&&(xe.professionalId=t),a&&(xe.period=a),e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const n=await Si(xe);if(n.length===0){e.innerHTML='<p class="text-center text-gray-500 py-8">Nenhum relatório de comissão salvo encontrado para os filtros.</p>';return}e.innerHTML=`
            <div class="space-y-3">
                ${n.map(o=>`
                    <div class="bg-white p-4 rounded-lg shadow-sm border" data-id="${o.id}">
                        <div class="flex flex-row justify-between items-start gap-4"> 
                            
                            <div class="flex-shrink min-w-0">
                                <p class="font-bold text-gray-800 truncate">${o.professionalName}</p>
                                <p class="text-sm text-gray-500">Período: ${o.period}</p>
                                <p class="text-xs text-gray-600 mt-1 hidden sm:block">Salvo em: ${new Date(o.createdAt).toLocaleDateString("pt-BR")}</p>
                            </div>
                            
                            <div class="text-right flex flex-col items-end gap-2 flex-shrink-0">
                                <p class="text-lg font-bold text-green-600">R$ ${o.summary.totalCommission.toFixed(2)}</p>
                                
                                <div class="flex gap-2"> 
                                    <button data-action="generate-receipt" data-report='${JSON.stringify(o).replace(/'/g,"&apos;")}' class="py-1 px-3 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg hover:bg-indigo-200">Recibo</button>
                                    <button data-action="delete-report" data-id="${o.id}" class="py-1 px-3 bg-red-100 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-200">Excluir</button>
                                </div>
                            </div>
                        </div>
                    </div>`).join("")}
            </div>`}catch(n){e.innerHTML=`<p class="text-red-500 text-center">Erro ao carregar histórico: ${n.message}</p>`}}function Mi(){if(!p.professionals){Ee.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A carregar dados...</p></div>';return}const e=p.professionals.map(s=>`<option value="${s.id}">${s.name}</option>`).join(""),t=[],a=new Date;for(let s=0;s<12;s++){const r=new Date(a.getFullYear(),a.getMonth()-s,1),i=r.getFullYear(),l=(r.getMonth()+1).toString().padStart(2,"0"),c=`${i}-${l}`,m=r.toLocaleDateString("pt-BR",{month:"long",year:"numeric"});t.push(`<option value="${c}">${m}</option>`)}const n=xe.professionalId||"all",o=xe.period||"";Ee.innerHTML=`
        <section class="space-y-6">
            <div class="flex justify-between items-center">
                <h2 class="text-3xl font-bold text-gray-800">Comissões</h2>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4">
                <div class="flex-1">
                    <label for="filter-professional" class="block text-sm font-medium text-gray-700">Filtrar por Profissional</label>
                    <select id="filter-professional" class="mt-1 w-full p-2 border rounded-md">
                        <option value="all">Todos os Profissionais</option>
                        ${e}
                    </select>
                </div>
                <div class="flex-1">
                    <label for="filter-month" class="block text-sm font-medium text-gray-700">Filtrar por Mês</label>
                    <select id="filter-month" class="mt-1 w-full p-2 border rounded-md">
                        <option value="">Todos os Meses</option>
                        ${t.join("")}
                    </select>
                </div>
            </div>
            <div id="commissionHistory" class="bg-gray-50 p-4 rounded-lg"></div>
            <button data-action="open-calculator" class="fixed bottom-10 right-10 bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-indigo-700 transition transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
            </button>
        </section>
    `,document.getElementById("filter-professional").value=n,document.getElementById("filter-month").value=o,document.getElementById("filter-professional").addEventListener("change",ct),document.getElementById("filter-month").addEventListener("change",ct),ct()}function Di(e,t){Fe=e;const a=e.reduce((n,o)=>n+o.summary.totalCommission,0);Ee.innerHTML=`
        <section>
            <div class="flex flex-wrap justify-between items-center mb-6 gap-2"> 
                <button data-action="back-to-history" class="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300"> < Voltar </button>
                <h2 class="text-2xl font-bold text-gray-800 text-center flex-grow">Previsão de Comissão</h2>
                <button data-action="save-reports" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Salvar Relatórios</button>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md">
                <p class="text-center text-gray-500 mb-4">Período: <strong>${t}</strong></p>
                <div class="text-center mb-6"><p class="text-lg font-semibold">Total Geral de Comissões:</p><p class="text-4xl font-bold text-green-600">R$ ${a.toFixed(2)}</p></div>
                
                <div class="space-y-4">
                ${e.map(n=>`
                    <details class="bg-gray-50 p-3 rounded-lg border">
                        <summary class="flex justify-between items-center cursor-pointer">
                            <p class="font-bold text-gray-800">${n.professionalName}</p>
                            <p class="text-lg font-bold text-green-600">R$ ${n.summary.totalCommission.toFixed(2)}</p>
                        </summary>
                        <div class="mt-4 pt-4 border-t overflow-x-auto">
                            <table class="min-w-full text-xs"> 
                                <thead class="bg-gray-100"><tr>
                                    <th class="px-2 py-1 text-left">Data</th><th class="px-2 py-1 text-left">Item</th>
                                    <th class="px-2 py-1 text-right">Valor</th><th class="px-2 py-1 text-right">Taxa</th><th class="px-2 py-1 text-right">Comissão</th>
                                </tr></thead>
                                <tbody class="divide-y">
                                ${n.items.map(o=>`
                                    <tr>
                                        <td class="px-2 py-1">${new Date(o.date).toLocaleDateString("pt-BR")}</td>
                                        <td class="px-2 py-1">${o.item}</td>
                                        <td class="px-2 py-1 text-right">R$ ${o.value.toFixed(2)}</td>
                                        <td class="px-2 py-1 text-right">${o.commissionRate}%</td>
                                        <td class="px-2 py-1 text-right font-semibold">R$ ${o.commissionValue.toFixed(2)}</td>
                                    </tr>`).join("")}
                                </tbody>
                            </table>
                        </div>
                    </details>
                `).join("")}
                </div>
            </div>
        </section>
    `}async function Pi(e={}){const{view:t="history",isLoading:a=!1}=e;if(ot&&Ee.removeEventListener("click",ot),ot=n=>{const o=n.target.closest("button[data-action]");if(!o)return;switch(o.dataset.action){case"open-calculator":Ci();break;case"back-to-history":F("commissions-section",{view:"history"});break;case"save-reports":Ti();break;case"generate-receipt":const r=JSON.parse(o.dataset.report.replace(/&apos;/g,"'"));Ii(r);break;case"delete-report":const i=o.dataset.id;Li(i);break}},Ee.addEventListener("click",ot),a){Ee.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A calcular comissões...</p></div>';return}if(!p.professionals||p.professionals.length===0)try{p.professionals=await _(p.establishmentId)}catch{g("Erro","Não foi possível carregar a lista de profissionais.","error"),p.professionals=[]}(t==="history"||t==="main")&&Mi()}const Bt=document.getElementById("content");let ge={allPackages:[],catalogForModal:{services:[],products:[]}},st=null,we=null;function Ai(e=6){let t="";for(let a=0;a<e;a++)t+=`
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
        `;return t}function qi(){const e=document.getElementById("packagesListContainer");if(e){if(ge.allPackages.length===0){e.innerHTML=`
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
            </div>`;return}e.innerHTML=ge.allPackages.map(t=>{const a=t.status==="active",n=JSON.stringify(t).replace(/'/g,"&apos;"),o=t.price||0,s=t.originalPrice||0;t.commissionRate;const r=s>o?s-o:0,i=s>0?(s-o)/s*100:0;return`
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col cursor-pointer"
                 data-action="edit-package" data-package='${n}'>
                
                <div class="p-4 flex-grow">
                    <div class="flex justify-between items-start">
                        <div class="min-w-0 pr-2">
                            <h3 class="text-base font-bold text-gray-900 truncate">${t.name}</h3>
                            <p class="text-xs text-gray-500 truncate">${t.description||"Sem descrição"}</p>
                        </div>
                        <span class="text-xs font-semibold py-0.5 px-2 rounded-full flex-shrink-0 ${a?"bg-green-100 text-green-700":"bg-gray-100 text-gray-700"}">
                            ${a?"Ativo":"Inativo"}
                        </span>
                    </div>

                    <div class="mt-3 pt-3 border-t flex justify-between items-end">
                        <div>
                            <p class="text-2xl font-extrabold text-indigo-600">R$ ${o.toFixed(2)}</p>
                            ${r>0?`<p class="text-xs text-gray-500 line-through">De R$ ${s.toFixed(2)}</p>
                                 <span class="text-xs font-semibold text-red-600 bg-red-100 px-1.5 rounded">${i.toFixed(0)}% OFF</span>`:'<p class="text-xs text-gray-500 line-through">Valor integral</p>'}
                        </div>
                        
                        <div class="text-right flex flex-col items-end">
                            <!-- (MODIFICADO) 'services' -> 'items' -->
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
        `}).join("")}}function Ra(){const e=document.getElementById("genericModal");e.style.display="none",we&&e.removeEventListener("click",we)}async function Ha(e=null){const t=document.getElementById("genericModal"),a=!!e,n=e?JSON.parse(JSON.stringify(e.items||[])):[],o=`
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
                                <input type="text" id="packageName" value="${e?.name||""}" class="mt-1 w-full p-2 border rounded-md" required>
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
                            <textarea id="packageDescription" rows="2" class="mt-1 w-full p-2 border rounded-md">${e?.description||""}</textarea>
                        </div>
                    </div>

                    <div class="border-t pt-6">
                        <div class="flex justify-between items-center mb-2">
                            <!-- (MODIFICADO) Título e ID do botão -->
                            <h3 class="text-lg font-semibold text-gray-800">Itens Incluídos</h3>
                            <button type="button" id="add-item-to-package-btn" class="py-1 px-3 bg-indigo-600 text-white font-semibold rounded-lg text-sm hover:bg-indigo-700 transition shadow-sm">+ Adicionar Item</button>
                        </div>
                        <!-- (MODIFICADO) ID do container da lista -->
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
                                <input type="number" step="0.01" id="finalPrice" value="${e?.price||""}" class="mt-1 w-full p-2 border rounded-md" required>
                            </div>
                            <div>
                                <label for="commissionRate" class="block text-sm font-medium text-gray-700">Comissão (%)</label>
                                <input type="number" id="commissionRate" value="${e?.commissionRate||0}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: 10">
                            </div>
                            <div>
                                <label for="validityDays" class="block text-sm font-medium text-gray-700">Validade (dias)</label>
                                <input type="number" id="validityDays" value="${e?.validityDays||30}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: 30, 60, 90">
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
    `;t.innerHTML=o,t.style.display="flex";const s=t.querySelector("#package-items-list"),r=(d,l)=>{const c=l.querySelector("#originalPrice"),m=d.reduce((u,b)=>u+b.price*b.quantity,0);c&&(c.textContent=`R$ ${m.toFixed(2)}`)},i=d=>{d.length===0?s.innerHTML='<p class="text-center text-gray-500 p-4">Nenhum item adicionado.</p>':s.innerHTML=d.map((l,c)=>{const m=l.type==="service",u=m?"Serviço":"Produto",b=m?"bg-indigo-100 text-indigo-800":"bg-green-100 text-green-800";return`
                <div class="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-200">
                    <div class="flex items-center gap-3 min-w-0">
                        <input type="number" value="${l.quantity}" min="1" class="w-12 p-1 border rounded-md text-sm quantity-input flex-shrink-0" data-index="${c}">
                        <!-- (NOVO) Selo de Tipo -->
                        <span class="text-xs font-medium px-2 py-0.5 rounded-full ${b}">${u}</span>
                        <span class="font-medium text-gray-800 truncate">${l.name}</span>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="text-sm text-gray-600">R$ ${l.price.toFixed(2)}</span>
                        <!-- (MODIFICADO) Classe do botão de remover -->
                        <button type="button" class="text-red-500 hover:text-red-700 remove-item-btn font-bold" data-index="${c}">&times;</button>
                    </div>
                </div>
            `}).join(""),r(d,t)};i(n),s.addEventListener("change",d=>{if(d.target.classList.contains("quantity-input")){const l=parseInt(d.target.dataset.index,10),c=parseInt(d.target.value,10);c>0&&n[l]&&(n[l].quantity=c,i(n))}}),s.addEventListener("click",d=>{if(d.target.classList.contains("remove-item-btn")){const l=parseInt(d.target.dataset.index,10);n.splice(l,1),i(n)}}),t.querySelector("#add-item-to-package-btn").onclick=()=>Ni(d=>{const l=n.find(c=>c.id===d.id&&c.type===d.type);l?l.quantity++:n.push({...d,quantity:1}),i(n)}),we&&t.removeEventListener("click",we),we=async d=>{const l=d.target.closest("button[data-action]");if(!l)return;const c=l.dataset.action;if(d.stopPropagation(),c==="close-modal"&&Ra(),c==="save-package"){const m=l,u={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:n,originalPrice:n.reduce((b,f)=>b+f.price*f.quantity,0),price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null};if(!u.name||!u.price){g("Erro","Nome do Pacote e Preço Final são obrigatórios.","error");return}if(u.items.length===0){g("Erro","Adicione pelo menos um item ao pacote.","error");return}m.disabled=!0,m.textContent="A salvar...";try{a?await dn(u.id,u):(delete u.id,await ln(u)),g("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),Ra(),await la()}catch(b){g("Erro",`Não foi possível salvar o pacote: ${b.message}`,"error"),m.disabled=!1,m.textContent="Salvar Pacote"}}},t.addEventListener("click",we)}function Ni(e){let t="";const a=document.createElement("div");a.id="item-selection-modal",a.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[110]";const n={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'},o=d=>{const l=t.toLowerCase(),c=ge.catalogForModal.services.filter(f=>f.name.toLowerCase().includes(l)),m=ge.catalogForModal.products.filter(f=>f.name.toLowerCase().includes(l)),u=c.map(f=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${n.service}</div>
                <span class="flex-grow text-left min-w-0 truncate">${f.name}</span>
                <span class="font-semibold flex-shrink-0">R$ ${f.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum serviço encontrado.</p>',b=m.map(f=>`
            <button data-action="select-item" data-item-type="product" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${n.product}</div>
                <span class="flex-grow text-left min-w-0 truncate">${f.name}</span>
                <span class="font-semibold flex-shrink-0">R$ ${f.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum produto encontrado.</p>';d.innerHTML=`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto">${u}</div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-96 overflow-y-auto">${b}</div></div>
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
                <!-- Conteúdo será renderizado por renderLists -->
            </div>
        </div>
    `,document.body.appendChild(a);const s=a.querySelector("#item-selection-list"),r=a.querySelector("#item-search-input"),i=()=>{a.remove()};o(s),r.addEventListener("input",()=>{t=r.value,o(s)}),a.addEventListener("click",d=>{const l=d.target.closest('[data-action="select-item"]'),c=d.target.closest('[data-action="close-selection-modal"]');if(l){const{itemType:m,itemId:u}=l.dataset,f=(ge.catalogForModal[m+"s"]||[]).find(v=>v.id===u);f&&(e({...f,type:m}),i())}else(c||d.target===a)&&i()})}async function la(){Bt.innerHTML=`
        <section id="packages-page" class="p-4 sm:p-6">
             <div class="sticky top-0 z-10 bg-gray-100 sm:bg-transparent pt-3 pb-4 mb-6 -mx-4 -mt-4 sm:mx-0 sm:mt-0 sm:bg-transparent sm:pt-0 sm:pb-0 sm:static">
                <div class="flex justify-between items-center px-4 sm:px-0">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                </div>
            </div>
            
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20">
                ${Ai()}
            </div>
            
            <button data-action="new-package" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>
    `,st&&Bt.removeEventListener("click",st),st=e=>{if(e.target.closest('[data-action-stop-propagation="true"]')){e.stopPropagation();const n=e.target.closest('[data-action="delete-package"]');if(n){const o=n.dataset.id;T("Excluir Pacote","Tem a certeza que deseja excluir este pacote? Esta ação é irreversível.").then(async s=>{if(s)try{await cn(o),g("Sucesso!","Pacote excluído.","success"),await la()}catch(r){g("Erro",`Não foi possível excluir: ${r.message}`,"error")}})}return}const t=e.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!t)return;const a=t.dataset.action;if(a==="new-package")Ha(null);else if(a==="edit-package"){const n=JSON.parse(t.dataset.package);Ha(n)}},Bt.addEventListener("click",st);try{const[e,t,a]=await Promise.all([eo(p.establishmentId),Ie(p.establishmentId),ea(p.establishmentId)]);ge.allPackages=e,ge.catalogForModal={services:t.filter(n=>n.active),products:a},qi()}catch{document.getElementById("packagesListContainer").innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar pacotes.</p>'}}const Fi=document.getElementById("content");let Ri=null;async function Hi(){Fi.innerHTML=`
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
                             src="https://placehold.co/128x128/E2E8F0/4A5568?text=${p.userName?p.userName.charAt(0):"U"}" 
                             alt="Avatar do Usuário" 
                             class="w-32 h-32 rounded-full object-cover border-4 border-indigo-200">
                        <h3 class="text-2xl font-bold text-gray-800 mt-4">${p.userName||"Usuário"}</h3>
                        <p class="text-md text-gray-600">${V.currentUser.email||"E-mail não disponível"}</p>
                    </div>
                </div>
            </div>

            <div class="md:col-span-2">
                 <div id="professional-agenda-block" class="p-4 md:p-6 bg-white rounded-lg shadow-md space-y-6">
                    <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
                </div>
            </div>
        </div>
    `,await ji()}async function ji(){const e=document.getElementById("professional-agenda-block");e.innerHTML="";try{const t=p.userProfessionalId;if(t){const a=await Ko(t);Ri=a,a.photo&&(document.getElementById("user-profile-avatar").src=a.photo),e.innerHTML=`
                <div class="bg-indigo-50 p-4 rounded-lg flex items-center gap-4 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                        <p class="font-semibold text-indigo-800">Você está associado ao profissional: ${a.name}</p>
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
            `,Oi(a.id),document.getElementById("my-blocks-filter").addEventListener("change",o=>ft(a.id,o.target.value)),ft(a.id,"future")}else e.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(t){console.error("Erro ao carregar seção de profissional:",t),e.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${t.message}</p>
            </div>
        `}}function Oi(e){const t=document.getElementById("block-schedule-form");t.addEventListener("submit",async a=>{a.preventDefault();const n=t.querySelector("#blockDate").value,o=t.querySelector("#blockStartTime").value,s=t.querySelector("#blockEndTime").value,r=t.querySelector("#blockReason").value;if(!n||!o||!s){g("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(o>=s){g("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const i=new Date(`${n}T${o}:00`),d=new Date(`${n}T${s}:00`),l=t.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="A bloquear...";try{await vt({establishmentId:p.establishmentId,professionalId:e,reason:r||"Bloqueado (Meu Perfil)",startTime:i.toISOString(),endTime:d.toISOString()}),g("Sucesso","Agenda bloqueada com sucesso!","success"),t.reset();const c=document.getElementById("my-blocks-filter").value;ft(e,c)}catch(c){console.error("Erro ao bloquear agenda:",c),g("Erro",`Não foi possível bloquear a agenda: ${c.message}`,"error")}finally{l.disabled=!1,l.textContent="Bloquear Agenda"}})}async function ft(e,t="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const n=new Date;let o,s;t==="history"?(s=new Date,o=new Date,o.setFullYear(o.getFullYear()-1)):(o=new Date,s=new Date,s.setFullYear(s.getFullYear()+1));let i=(await bt(p.establishmentId,o.toISOString(),s.toISOString(),e)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));t==="history"?i=i.filter(d=>d.endTime<n).sort((d,l)=>l.startTime-d.startTime):i=i.filter(d=>d.endTime>=n).sort((d,l)=>d.startTime-l.startTime),i.length>0?(a.innerHTML=i.map(d=>{const l=d.startTime.toLocaleDateString("pt-BR"),c=`${d.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${d.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`;return`
                    <div class="flex items-center justify-between p-3 ${d.endTime<new Date?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${l} das ${c}</p>
                            <p class="text-sm text-gray-600">${d.reason||"Sem motivo"}</p>
                        </div>
                        <button data-block-id="${d.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(d=>{d.addEventListener("click",async l=>{const c=l.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await Qt(c),g("Sucesso","Bloqueio removido.","success"),ft(e,t)}catch(m){console.error("Erro ao remover bloqueio:",m),g("Erro",`Não foi possível remover o bloqueio: ${m.message}`,"error")}})})):a.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${t==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(n){console.error("Erro ao carregar bloqueios:",n),a.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${n.message}</p>`}}const ja=document.getElementById("loadingScreen"),Tt=document.getElementById("dashboardContent"),Mt=document.getElementById("content"),Oa=document.getElementById("notificationBell"),Dt=document.getElementById("notificationBadge"),nt=document.getElementById("notificationPanel"),za=document.getElementById("notificationList"),Pt=document.getElementById("profileMenuButton"),J=document.getElementById("profileDropdown"),zi=document.getElementById("profileName"),Vi=document.getElementById("profileEmail"),Ui=document.getElementById("logoutButton"),_i=document.getElementById("cancellationHistoryBtn"),Va=document.getElementById("myProfileLink"),Ua={indigo:{main:"#4f46e5",light:"#e0e7ff",text:"white",hover:"#4338ca"},rose:{main:"#e11d48",light:"#ffe4e6",text:"white",hover:"#be123c"},green:{main:"#16a34a",light:"#d1fae5",text:"white",hover:"#15803d"},sky:{main:"#0284c7",light:"#e0f2fe",text:"white",hover:"#0369a1"},amber:{main:"#d97706",light:"#fef3c7",text:"#1f2937",hover:"#b45309"}};let Re=null,He=[];const Wi={"agenda-section":Za,"comandas-section":ta,"relatorios-section":Ht,"servicos-section":jn,"produtos-section":Yn,"profissionais-section":pt,"clientes-section":wt,"estabelecimento-section":go,"ausencias-section":Qr,"users-section":gt,"sales-report-section":pi,"financial-section":wi,"commissions-section":Pi,"packages-section":la,"my-profile-section":Hi};function Ji(e){const t=Ua[e]||Ua.indigo,a=document.getElementById("dynamic-theme-styles"),o=(r=>{const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return i?`${parseInt(i[1],16)}, ${parseInt(i[2],16)}, ${parseInt(i[3],16)}`:null})(t.main),s=e==="amber"?"#1f2937":"white";a.innerHTML=`
        .sidebar-link.active { 
            background-color: ${t.main}; 
            color: ${s}; 
        }
        .sidebar-link:not(.active):hover { 
            background-color: rgba(${o}, 0.2);
        }
    `}function Jt(){const e=He.filter(t=>!t.read).length;if(e>0?(Dt.textContent=e,Dt.classList.remove("hidden")):Dt.classList.add("hidden"),He.length===0){za.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}za.innerHTML=He.map(t=>`
    <div class="notification-item ${t.read?"":"unread"}">
    <p class="font-semibold">${t.title}</p>
    <p class="text-sm text-gray-600">${t.message}</p>
    <p class="text-xs text-gray-400 mt-1">${t.time}</p>
    </div>
    `).join("")}function Gi(e){Re&&Re();const t=Lo(Gt,"establishments",e,"notifications"),a=Bo(t,To("timestamp",">=",new Date),Mo("timestamp","desc"));Re=Do(a,n=>{n.docChanges().forEach(o=>{if(o.type==="added"){const s=o.doc.data();He.unshift({title:s.title,message:s.message,time:s.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),g(s.title,s.message,"info",!0),Jt();const r=document.querySelector(".sidebar-link.active");r&&r.dataset.target==="agenda-section"&&(s.type==="cancellation"||s.type==="new_appointment")&&(console.log("Atualizando agenda em tempo real..."),Za())}})},n=>{console.error("Erro no listener de notificações em tempo real:",n),g("Erro de Conexão","Não foi possível receber atualizações em tempo real. Verifique as regras de segurança do Firestore.","error")})}function F(e,t={}){const a=e.replace("-section","");if(e!=="my-profile-section"){const o=p.enabledModules?.[a]!==!1,s=p.userPermissions===null||p.userPermissions[e]?.view===!0;if(!o||!s){Mt.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>',document.querySelectorAll(".sidebar-link").forEach(r=>r.classList.remove("active"));return}}const n=Wi[e];n?(document.querySelectorAll(".sidebar-link").forEach(o=>{o.classList.toggle("active",o.getAttribute("data-target")===e)}),e==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(o=>o.classList.remove("active")),Mt.innerHTML="",n(t)):(Mt.innerHTML=`<div class="p-8 text-center"><h2 class="text-2xl font-bold">Página em Construção</h2><p class="text-gray-600">O módulo para "${e}" ainda não foi implementado.</p></div>`,console.warn(`Nenhum carregador de página definido para: ${e}`))}async function Yi(e){const t=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),n=document.getElementById("kpi-today-appointments"),o=document.getElementById("kpi-today-revenue"),s=e===null||e["agenda-section"]?.view===!0,r=e===null||e["financial-section"]?.view===!0;if(s&&t&&t.classList.remove("hidden"),r&&a&&a.classList.remove("hidden"),!(!s&&!r))try{const i=await vs();s&&n&&(n.textContent=i.todayAppointments.toString()),r&&o&&(o.textContent=`R$ ${i.todayRevenue.toFixed(2).replace(".",",")}`)}catch(i){console.error("Erro ao carregar KPIs do cabeçalho:",i),s&&n&&(n.textContent="Erro"),r&&o&&(o.textContent="Erro")}}async function Xi(e){try{mt.getPlatform()==="android"&&(await ae.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0}),console.log("Canal de notificação Android criado com sucesso."));let t=await ae.checkPermissions();if(t.receive==="prompt"&&(t=await ae.requestPermissions()),t.receive!=="granted"){console.warn("Permissão de notificação push foi negada pelo utilizador.");return}await ae.register(),ae.addListener("registration",async a=>{console.log("Push Token gerado:",a.value);try{const n=_a(Gt,"users",e);await Co(n,{fcmToken:a.value}),console.log("Token FCM salvo no perfil do utilizador.")}catch(n){console.error("Erro ao salvar token FCM:",n)}}),ae.addListener("registrationError",a=>{console.error("Erro no registo de push notifications:",a)}),ae.addListener("pushNotificationReceived",a=>{console.log("Notificação Push recebida:",a),g(a.title,a.body,"info",!0)}),ae.addListener("pushNotificationActionPerformed",a=>{console.log("Ação na notificação push:",a),F("agenda-section")})}catch(t){console.log("Push Notifications não suportado/inicializado:",t)}}function Qi(){Uo(),Oa.addEventListener("click",e=>{e.stopPropagation(),nt.classList.toggle("hidden"),nt.classList.contains("hidden")||(He.forEach(t=>t.read=!0),Jt())}),_i.addEventListener("click",()=>{_o()}),Pt.addEventListener("click",e=>{e.stopPropagation(),J.classList.toggle("active"),J.classList.contains("active")?J.classList.remove("hidden"):setTimeout(()=>J.classList.add("hidden"),200)}),Va&&Va.addEventListener("click",e=>{e.preventDefault(),F("my-profile-section"),J.classList.remove("active"),J.classList.add("hidden")}),document.addEventListener("click",e=>{!nt.contains(e.target)&&e.target!==Oa&&nt.classList.add("hidden"),!J.contains(e.target)&&e.target!==Pt&&J.classList.contains("active")&&(J.classList.remove("active"),setTimeout(()=>J.classList.add("hidden"),200))}),So(V,async e=>{if(e)try{const a=(await e.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="employee")&&a.establishmentId){const n=await _e(a.establishmentId);p.enabledModules=n.modules,Ji(n.themeColor);let o=null,s=e.displayName,r=null;if(a.role==="employee"||a.role==="owner"){const l=_a(Gt,"users",e.uid),c=await Io(l);if(c.exists()){const m=c.data();o=a.role==="employee"?m.permissions||{}:null,s=m.name||s,r=m.professionalId||null}else if(a.role==="employee")throw new Error("Dados de permissão do funcionário não encontrados.")}p.userProfessionalId=r,Xi(e.uid);const i=s||e.email;Ao(a.establishmentId,n.name,o),Pt.textContent=i.charAt(0).toUpperCase(),zi.textContent=i,Vi.textContent=e.email;const d=()=>{Re&&Re(),da(V).then(()=>window.location.href="/login.html")};Ui.addEventListener("click",l=>{l.preventDefault(),d()}),Yo(F,o,p.enabledModules),Yi(o),Gi(a.establishmentId),Jt(),ja.style.display="none",Tt.style.display="flex",F("agenda-section")}else throw new Error("Utilizador não tem permissão de 'owner' ou 'employee' ou 'establishmentId'.")}catch(t){console.error("Erro crítico na inicialização do painel:",t),ja.style.display="none",Tt.innerHTML=`
                    <div class="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
                        <h2 class="text-2xl font-bold text-red-600 mb-4">Erro de Acesso</h2>
                        <p class="text-gray-700 text-center mb-6">Não foi possível carregar os seus dados ou permissões. Isto pode acontecer se a sua conta foi desativada ou está configurada incorretamente.</p>
                        <p class="text-sm text-gray-500 mb-6">Detalhe do erro: ${t.message}</p>
                        <button id="errorLogoutButton" class="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700">Sair e Tentar Novamente</button>
                    </div>
                `,Tt.style.display="flex",document.getElementById("errorLogoutButton").addEventListener("click",()=>{da(V).then(()=>window.location.href="/login.html")})}else window.location.href="/login.html"})}Qi();
