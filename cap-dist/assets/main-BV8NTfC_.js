import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{initializeApp as yo}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import{getAuth as xo,EmailAuthProvider as _a,reauthenticateWithCredential as Ja,deleteUser as wo,verifyBeforeUpdateEmail as ko,updatePassword as Eo,updateProfile as So,onAuthStateChanged as $o,signOut as da}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{getFirestore as Io,doc as Wa,getDoc as Co,updateDoc as Lo,collection as Bo,query as To,where as Do,orderBy as Mo,onSnapshot as Po}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";const Ao={apiKey:"AIzaSyAlJaPEW5-yOb-8wkB8EJZhAML2M2yI8Ao",authDomain:"kairos-system.firebaseapp.com",projectId:"kairos-system",storageBucket:"kairos-system.appspot.com",messagingSenderId:"603994960586",appId:"1:603994960586:web:30d2c030eed3c55eccfa33",measurementId:"G-SVHFXKV5EC"},Ga=yo(Ao),z=xo(Ga),Gt=Io(Ga),p={establishmentId:null,establishmentName:null,userName:null,userProfessionalId:null,userPermissions:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function qo(e,t,a){p.establishmentId=e,p.establishmentName=t,p.userPermissions=a}const At="https://kairos-service-603994960586.southamerica-east1.run.app";console.log("🚀 API configurada para Produção:",At);async function No(){const e=z.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function y(e,t={}){const a=await No();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const r=`${At}${e}`;console.log(`AuthenticatedFetch: ${t.method||"GET"} ${r}`);try{const s=await fetch(r,{...t,headers:{...a,...t.headers}});if(!s.ok){const n=(await s.json().catch(()=>({message:s.statusText}))).message||`Erro na API: ${s.status}`;if(n.includes("FAILED_PRECONDITION")&&n.includes("requires an index")){const i=/(https:\/\/[^\s]+)/,d=n.match(i),l=d?d[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${l}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${s.status}) em ${r}:`,n),new Error(n)}return s.json()}catch(s){throw console.error(`Falha de rede ao tentar acessar ${r}:`,s.message),s.message.includes("Failed to fetch")||s.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${At}. Verifique sua conexão com a internet.`):s}}const Fo=(e,t,a,r=null)=>{let s=`/api/appointments/${e}?startDate=${t}&endDate=${a}`;return r&&(s+=`&professionalId=${r}`),y(s)},Ro=(e,t,a)=>{const r=`/api/appointments/cancelled/${e}?startDate=${t}&endDate=${a}`;return y(r)},Ho=e=>y("/api/appointments",{method:"POST",body:JSON.stringify(e)}),Yt=(e,t)=>y(`/api/appointments/${e}`,{method:"PUT",body:JSON.stringify(t)}),jo=e=>y(`/api/appointments/${e}`,{method:"DELETE"}),Oo=e=>y(`/api/appointments/${e}/reopen`,{method:"POST"}),zo=(e,t)=>y(`/api/appointments/${e}/checkout`,{method:"POST",body:JSON.stringify(t)});let q;async function Vo(){if(!q)try{q=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function Uo(){if(!q){console.warn("AudioContext não inicializado. O som não será tocado.");return}q.state==="suspended"&&q.resume();const e=q.createOscillator(),t=q.createGain();e.connect(t),t.connect(q.destination),e.type="sine",e.frequency.setValueAtTime(800,q.currentTime),t.gain.setValueAtTime(0,q.currentTime),t.gain.linearRampToValueAtTime(.3,q.currentTime+.01),t.gain.exponentialRampToValueAtTime(1e-4,q.currentTime+.2),e.start(q.currentTime),e.stop(q.currentTime+.2)}function g(e,t,a="info",r=!1){const s=document.getElementById("toast-container");if(!s)return;r&&Uo();const o=document.createElement("div"),n={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},i={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},d={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};o.className=`toast ${n[a]||n.info}`,o.innerHTML=`
        <div class="toast-icon">${i[a]||i.info}</div>
        <div class="toast-content">
            <p class="font-bold">${e}</p>
            <p class="text-sm">${t}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${d[a]||d.info}"></div>
        </div>
    `,s.appendChild(o),o.querySelector(".toast-close").addEventListener("click",()=>o.remove()),setTimeout(()=>{o.remove()},4e3)}function T(e,t){const a=document.getElementById("genericModal");return new Promise(r=>{a.innerHTML=`
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
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",r(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",r(!1)}})}function j({title:e,contentHTML:t,maxWidth:a="max-w-4xl",showCloseButton:r=!0}){let s=document.getElementById("genericModal");const o=s.cloneNode(!1);s.parentNode.replaceChild(o,s),s=o;const n=()=>{s.style.display="none"},i=c=>{s.querySelector("#genericModalContentBody").innerHTML=c};s.innerHTML=`
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
    `;const d=s.querySelector("[data-close-modal]");d&&(d.onclick=n);const l=s.querySelector('[data-action="close-modal"]');return l&&(l.onclick=n),s.addEventListener("click",c=>{c.target.closest(".modal-content")||n()}),s.style.display="flex",{modalElement:s,close:n,setContent:i}}function _o(){document.body.addEventListener("click",()=>{q||Vo()},{once:!0}),document.addEventListener("click",e=>{const t=e.target.closest('[data-action="close-modal"]');if(t){const r=t.dataset.target;if(r){const s=document.getElementById(r);s&&(s.style.display="none")}}if(e.target.closest("[data-close-modal]")){const r=document.getElementById("genericModal");r&&(r.style.display="none")}})}async function ca(){const e=document.getElementById("cancellationListContainer");if(!e)return;e.innerHTML='<div class="loader mx-auto"></div>';const t=document.getElementById("cancelStartDate").value,a=document.getElementById("cancelEndDate").value;try{const r=await Ro(p.establishmentId,t,a);if(r.length===0){e.innerHTML='<p class="text-center text-gray-500 py-4">Nenhum cancelamento encontrado para este período.</p>';return}e.innerHTML=r.map(s=>`
            <div class="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-bold text-gray-800">${s.clientName}</p>
                        <p class="text-sm text-gray-600">${new Date(s.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})} - ${s.serviceName}</p>
                        <p class="text-xs text-gray-500">com ${s.professionalName}</p>
                    </div>
                </div>
            </div>
        `).join("")}catch(r){e.innerHTML=`<p class="text-red-500 text-center py-4">Erro ao carregar histórico: ${r.message}</p>`}}function Jo(){const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const r=`
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
    `,{modalElement:s}=j({title:"Histórico de Cancelamentos",contentHTML:r,maxWidth:"max-w-3xl"});s.querySelector("#searchCancellationsBtn").addEventListener("click",ca),ca()}const H=document.getElementById("sidebar"),ua=document.getElementById("sidebarToggle"),De=document.getElementById("mainContent"),Wo=document.querySelectorAll(".sidebar-link"),ma=document.getElementById("hamburger-menu-btn"),Se=document.getElementById("mobile-overlay");function nt(e){!H||!De||(H.classList.toggle("collapsed",e),De.classList.toggle("sidebar-collapsed-shift",e))}function Go(){!H||!Se||(H.classList.add("mobile-open"),Se.classList.add("visible"))}function Ze(){!H||!Se||(H.classList.remove("mobile-open"),Se.classList.remove("visible"))}function Yo(){nt(!H.classList.contains("collapsed"))}function Xo(e,t,a){if(!H||!De)return;De.classList.add("main-content-shift"),window.innerWidth>=768?nt(H.classList.contains("collapsed")):(De.classList.remove("main-content-shift","sidebar-collapsed-shift"),Ze()),ua&&ua.addEventListener("click",s=>{s.stopPropagation(),Yo()}),H.addEventListener("mouseenter",()=>{window.innerWidth>=1024&&H.classList.contains("collapsed")&&nt(!1)}),H.addEventListener("mouseleave",()=>{window.innerWidth>=1024&&(document.querySelector("#sidebarToggle:hover")||nt(!0))}),ma&&ma.addEventListener("click",s=>{s.stopPropagation(),Go()}),Se&&Se.addEventListener("click",s=>{s.stopPropagation(),Ze()});let r=0;H.addEventListener("touchstart",s=>{r=s.changedTouches[0].screenX},{passive:!0}),H.addEventListener("touchend",s=>{const o=s.changedTouches[0].screenX;r-o>50&&Ze()},{passive:!0}),Wo.forEach(s=>{const o=s.getAttribute("data-target"),n=o.replace("-section",""),i=a?.[n]!==!1,d=t===null||t[o]?.view===!0;if(!i||!d){s.style.display="none";return}s.style.display="flex",s.addEventListener("click",l=>{l.preventDefault(),o&&typeof e=="function"&&e(o),window.innerWidth<768&&Ze()})})}const _e=e=>{const t=e||p.establishmentId;return t?y(`/api/establishments/${t}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Qo=(e,t)=>{const a=e||p.establishmentId;return a?y(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(t)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Zo=(e,t)=>{const a=e||p.establishmentId;return a?y(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},Ko=(e,t)=>{const a=e||p.establishmentId;return a?y(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},_=e=>y(`/api/professionals/${e}`),es=e=>y(`/api/professionals/details/${e}`),ts=e=>y("/api/professionals",{method:"POST",body:JSON.stringify(e)}),as=(e,t)=>y(`/api/professionals/${e}`,{method:"PUT",body:JSON.stringify(t)}),os=e=>y(`/api/professionals/${e}`,{method:"DELETE"});var $e;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})($e||($e={}));class kt extends Error{constructor(t,a,r){super(t),this.message=t,this.code=a,this.data=r}}const ss=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},rs=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},r=a.Plugins=a.Plugins||{},s=()=>t!==null?t.name:ss(e),o=()=>s()!=="web",n=u=>{const m=l.get(u);return!!(m?.platforms.has(s())||i(u))},i=u=>{var m;return(m=a.PluginHeaders)===null||m===void 0?void 0:m.find(b=>b.name===u)},d=u=>e.console.error(u),l=new Map,c=(u,m={})=>{const b=l.get(u);if(b)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),b.proxy;const f=s(),v=i(u);let k;const $=async()=>(!k&&f in m?k=typeof m[f]=="function"?k=await m[f]():k=m[f]:t!==null&&!k&&"web"in m&&(k=typeof m.web=="function"?k=await m.web():k=m.web),k),S=(L,D)=>{var J,ee;if(v){const te=v?.methods.find(V=>D===V.name);if(te)return te.rtype==="promise"?V=>a.nativePromise(u,D.toString(),V):(V,Xe)=>a.nativeCallback(u,D.toString(),V,Xe);if(L)return(J=L[D])===null||J===void 0?void 0:J.bind(L)}else{if(L)return(ee=L[D])===null||ee===void 0?void 0:ee.bind(L);throw new kt(`"${u}" plugin is not implemented on ${f}`,$e.Unimplemented)}},w=L=>{let D;const J=(...ee)=>{const te=$().then(V=>{const Xe=S(V,L);if(Xe){const Qe=Xe(...ee);return D=Qe?.remove,Qe}else throw new kt(`"${u}.${L}()" is not implemented on ${f}`,$e.Unimplemented)});return L==="addListener"&&(te.remove=async()=>D()),te};return J.toString=()=>`${L.toString()}() { [capacitor code] }`,Object.defineProperty(J,"name",{value:L,writable:!1,configurable:!1}),J},E=w("addListener"),B=w("removeListener"),M=(L,D)=>{const J=E({eventName:L},D),ee=async()=>{const V=await J;B({eventName:L,callbackId:V},D)},te=new Promise(V=>J.then(()=>V({remove:ee})));return te.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await ee()},te},A=new Proxy({},{get(L,D){switch(D){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return v?M:E;case"removeListener":return B;default:return w(D)}}});return r[u]=A,l.set(u,{name:u,proxy:A,platforms:new Set([...Object.keys(m),...v?[f]:[]])}),A};return a.convertFileSrc||(a.convertFileSrc=u=>u),a.getPlatform=s,a.handleError=d,a.isNativePlatform=o,a.isPluginAvailable=n,a.registerPlugin=c,a.Exception=kt,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},ns=e=>e.Capacitor=rs(e),ut=ns(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Xt=ut.registerPlugin;class Ya{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let r=!1;this.listeners[t]||(this.listeners[t]=[],r=!0),this.listeners[t].push(a);const o=this.windowListeners[t];o&&!o.registered&&this.addWindowListener(o),r&&this.sendRetainedArgumentsForEvent(t);const n=async()=>this.removeListener(t,a);return Promise.resolve({remove:n})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,r){const s=this.listeners[t];if(!s){if(r){let o=this.retainedEventArguments[t];o||(o=[]),o.push(a),this.retainedEventArguments[t]=o}return}s.forEach(o=>o(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:r=>{this.notifyListeners(a,r)}}}unimplemented(t="not implemented"){return new ut.Exception(t,$e.Unimplemented)}unavailable(t="not available"){return new ut.Exception(t,$e.Unavailable)}async removeListener(t,a){const r=this.listeners[t];if(!r)return;const s=r.indexOf(a);this.listeners[t].splice(s,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(r=>{this.notifyListeners(t,r)}))}}const pa=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),ga=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class is extends Ya{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(r=>{if(r.length<=0)return;let[s,o]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=ga(s).trim(),o=ga(o).trim(),a[s]=o}),a}async setCookie(t){try{const a=pa(t.key),r=pa(t.value),s=`; expires=${(t.expires||"").replace("expires=","")}`,o=(t.path||"/").replace("path=",""),n=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${r||""}${s}; path=${o}; ${n};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}Xt("CapacitorCookies",{web:()=>new is});const ls=async e=>new Promise((t,a)=>{const r=new FileReader;r.onload=()=>{const s=r.result;t(s.indexOf(",")>=0?s.split(",")[1]:s)},r.onerror=s=>a(s),r.readAsDataURL(e)}),ds=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(s=>s.toLocaleLowerCase()).reduce((s,o,n)=>(s[o]=e[t[n]],s),{})},cs=(e,t=!0)=>e?Object.entries(e).reduce((r,s)=>{const[o,n]=s;let i,d;return Array.isArray(n)?(d="",n.forEach(l=>{i=t?encodeURIComponent(l):l,d+=`${o}=${i}&`}),d.slice(0,-1)):(i=t?encodeURIComponent(n):n,d=`${o}=${i}`),`${r}&${d}`},"").substr(1):null,us=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),s=ds(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(s.includes("application/x-www-form-urlencoded")){const o=new URLSearchParams;for(const[n,i]of Object.entries(e.data||{}))o.set(n,i);a.body=o.toString()}else if(s.includes("multipart/form-data")||e.data instanceof FormData){const o=new FormData;if(e.data instanceof FormData)e.data.forEach((i,d)=>{o.append(d,i)});else for(const i of Object.keys(e.data))o.append(i,e.data[i]);a.body=o;const n=new Headers(a.headers);n.delete("content-type"),a.headers=n}else(s.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class ms extends Ya{async request(t){const a=us(t,t.webFetchExtra),r=cs(t.params,t.shouldEncodeUrlParams),s=r?`${t.url}?${r}`:t.url,o=await fetch(s,a),n=o.headers.get("content-type")||"";let{responseType:i="text"}=o.ok?t:{};n.includes("application/json")&&(i="json");let d,l;switch(i){case"arraybuffer":case"blob":l=await o.blob(),d=await ls(l);break;case"json":d=await o.json();break;case"document":case"text":default:d=await o.text()}const c={};return o.headers.forEach((u,m)=>{c[m]=u}),{data:d,headers:c,status:o.status,url:o.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}Xt("CapacitorHttp",{web:()=>new ms});const ae=Xt("PushNotifications",{}),ps=(e,t,a)=>y(`/api/analytics/${e}?startDate=${t}&endDate=${a}`),gs=({establishmentId:e,startDate:t,endDate:a,cashierSessionId:r})=>{let s=`/api/reports/sales/${e}?startDate=${t}&endDate=${a}`;return r&&r!=="all"&&(s+=`&cashierSessionId=${r}`),y(s)},fs=(e,t,a)=>y(`/api/analytics/${e}/monthly-details?year=${t}&month=${a}`),bs=(e,t,a,r)=>{const s=`/api/analytics/${e}/daily-details?year=${t}&month=${a}&day=${r}`;return y(s)},vs=(e,t,a,r)=>{const s=`/api/analytics/${e}/professional-details?year=${t}&month=${a}&professionalId=${r}`;return y(s)},hs=()=>y("/api/reports/summary",{method:"GET"}),Ie=e=>y(`/api/services/${e}`),ys=e=>y("/api/services",{method:"POST",body:JSON.stringify(e)}),xs=(e,t)=>y(`/api/services/${e}`,{method:"PUT",body:JSON.stringify(t)}),ws=e=>y(`/api/services/${e}`,{method:"DELETE"}),ks=(e,t)=>y(`/api/services/${e}/status`,{method:"PATCH",body:JSON.stringify({active:t})}),Es=e=>y(`/api/services/stats/most-popular/${e}`),bt=(e,t,a,r="all")=>{const s=`/api/blockages/${e}?startDate=${t}&endDate=${a}&professionalId=${r}`;return y(s)},vt=e=>y("/api/blockages",{method:"POST",body:JSON.stringify(e)}),Qt=e=>y(`/api/blockages/${e}`,{method:"DELETE"}),Xa=e=>y("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:e})}),Je=e=>y(`/api/clients/${e}`),Zt=e=>y("/api/clients",{method:"POST",body:JSON.stringify(e)}),Ss=(e,t)=>y(`/api/clients/${e}`,{method:"PUT",body:JSON.stringify(t)}),$s=e=>y(`/api/clients/${e}`,{method:"DELETE"}),Is=(e,t,a)=>{const r=`/api/clients/history/${e}?clientName=${encodeURIComponent(t)}&clientPhone=${encodeURIComponent(a)}`;return y(r)},Cs=(e,t,a)=>{const r=`/api/clients/loyalty-history/${e}?clientName=${encodeURIComponent(t)}&clientPhone=${encodeURIComponent(a)}`;return y(r)},Ls=(e,t,a,r)=>y("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:e,clientName:t,clientPhone:a,rewardData:r})}),fa=document.getElementById("content"),Bs=window.location.origin;let ba=!1;const qt=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5"},{bg:"#d1fae5",border:"#059669",main:"#059669"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48"},{bg:"#fef3c7",border:"#d97706",main:"#d97706"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed"},{bg:"#fce7f3",border:"#db2777",main:"#db2777"}];let We=[],ht=[],je={},Z=[],C={currentView:"list",weekViewDays:7,currentDate:new Date,selectedProfessionalId:"all",profSearchTerm:"",showInactiveProfs:!1,scrollToAppointmentId:null},x={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function Ts(e){return new Intl.DateTimeFormat("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).format(e).replace(/\./g,"")}function Qa(e){const t=new Date(e);if(t.setHours(0,0,0,0),C.currentView==="week"&&C.weekViewDays===7){const a=t.getDay(),r=t.getDate()-a+(a===0?-6:1);return new Date(t.setDate(r))}return t}function mt(){const e=document.getElementById("profSelectorContainer"),t=C.profSearchTerm.toLowerCase();if(!e||!p.professionals)return;let a=p.professionals.filter(o=>C.showInactiveProfs||o.status!=="inactive");t&&(a=a.filter(o=>o.name.toLowerCase().includes(t)));const s=[...[{id:"all",name:"Todos",photo:null,status:"active"}],...a];e.innerHTML=s.map(o=>{const n=C.selectedProfessionalId===o.id,i=o.name==="Todos"?"Todos":o.name.split(" ")[0],d=o.name==="Todos"?"T":o.name.charAt(0).toUpperCase(),l=o.status!=="inactive",c=qt[0],u=o.id!=="all"&&p.professionalColors.get(o.id)||c,m=o.photo||`https://placehold.co/64x64/${u.main?.replace("#","")||"E0E7FF"}/${u.light?.replace("#","")||"4F46E5"}?text=${d}`,b=o.id==="all"?"#e0e7ff":u.light,f=o.id==="all"?"#4f46e5":u.main,k=`border: 3px solid ${n?u.border:"transparent"}; box-shadow: ${n?"0 0 0 2px "+u.border:"none"};`;return`
            <div class="prof-card ${n?"selected":""} ${l?"":"opacity-50"}" 
                 data-action="select-professional" 
                 data-prof-id="${o.id}">
                ${o.id==="all"?`<div class="prof-card-all-placeholder" style="background-color: ${b}; color: ${f}; ${k}">
                           ${d}
                          </div>`:`<img src="${m}" alt="${o.name}" class="prof-card-photo" style="${k}" />`}
                <span class="prof-card-name">${i}</span>
            </div>
        `}).join("")}function Ds(e,t,a,r,s){const o=(e||"").replace(/\D/g,""),n=new Date(s).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),i=new Date(s).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=`Olá, ${t}! Você tem um agendamento de ${a} com o(a) profissional ${r} para o dia ${n} às ${i}. Podemos confirmar? Agradecemos a preferência!`,l=encodeURIComponent(d);return`https://wa.me/${o}?text=${l}`}function Ms(e){const t=document.getElementById("agenda-view");if(e.sort((r,s)=>new Date(r.startTime)-new Date(s.startTime)),e.length===0){t.innerHTML='<div class="text-center p-10 text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum agendamento ou bloqueio</h3><p class="mt-1 text-sm text-gray-500">Não há eventos para o dia e filtros selecionados.</p></div>';return}const a=e.map(r=>{const s=new Date(r.startTime),o=new Date(r.endTime),n=s.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),i=o.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=p.professionalColors.get(r.professionalId)||{};if(r.type==="blockage")return`
                <div class="appointment-list-card bg-red-50" style="border-left-color: ${d.border};">
                    <div class="time-info">
                        <p class="font-bold text-md">${n}</p>
                        <p class="text-xs text-gray-500">${i}</p>
                    </div>
                    <div class="details-info min-w-0">
                        <p class="font-bold text-red-800 truncate">${r.reason}</p>
                        <p class="text-sm text-gray-600 truncate">com ${r.professionalName}</p>
                    </div>
                    <div class="status-info">
                        <span class="status-badge bg-red-100 text-red-800">Bloqueio</span>
                    </div>
                </div>`;const l=r.status==="completed",c=l?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800",u=l?"Finalizado":"Aberto",m=JSON.stringify(r).replace(/'/g,"&apos;"),b=r.redeemedReward?.points>0,f=r.hasRewards&&!b,v=Ds(r.clientPhone,r.clientName,r.serviceName,r.professionalName,r.startTime);return`
            <div class="appointment-list-card" data-appointment='${m}' style="border-left-color: ${d.border};">
                
                <div class="time-info" data-action="open-comanda">
                    <p class="font-bold text-md">${n}</p>
                    <p class="text-xs text-gray-500">${i}</p>
                </div>

                <div class="details-info min-w-0" data-action="open-comanda">
                    <p class="font-bold text-gray-800 truncate">${f?"🎁 ":""}${r.clientName}</p>
                    <p class="text-sm text-gray-600 truncate">${r.serviceName}</p>
                    <p class="text-xs text-gray-500 truncate">com ${r.professionalName||"Indefinido"}</p>
                    
                    ${b?'<p class="text-xs font-semibold text-purple-600">Resgate de Prémio</p>':""}
                </div>

                <div class="status-info">
                    <span class="status-badge ${c} mb-1">${u}</span>
                    <div class="card-actions flex gap-1 items-center">
                        ${l?`
                            <button data-action="edit-appointment" data-appointment='${m}' class="action-btn opacity-40 cursor-not-allowed" title="Finalizado - Não editável" disabled><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `:`
                            <a href="${v}" target="_blank" class="action-btn text-green-500 hover:text-green-700 p-1" title="Enviar Confirmação WhatsApp">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.036 2a10 10 0 100 20 10 10 0 000-20zM17.5 14.8c-.24.125-1.465.716-1.696.804-.23.09-.49.135-.75.045-.26-.09-.982-.322-1.87-.965-.888-.643-1.474-1.442-1.64-1.748-.166-.307-.015-.467.106-.615.116-.149.23-.388.344-.582.113-.193.15-.327.1-.462-.05-.136-.264-.322-.544-.654-.28-.332-.572-.782-.828-.958-.255-.176-.438-.158-.61-.158-.173 0-.374-.022-.574-.022-.2 0-.54.075-.826.375-.285.3-.99.965-.99 2.355 0 1.43 1.018 2.872 1.16 3.072.14.2 2 3.047 4.86 4.218 2.86 1.17 2.86.786 3.376 1.054.516.268 1.49.462 1.696.406.206-.057 1.463-.615 1.67-.887.2-.27.2-.504.14-.615-.058-.11-.23-.166-.48-.306z"/></svg>
                            </a>
                            <button data-action="edit-appointment" data-appointment='${m}' class="action-btn" title="Editar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `}
                        <button data-action="delete-appointment" data-id="${r.id}" class="action-btn" title="Apagar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                </div>
            </div>`}).join("");t.innerHTML=`<div class="list-view-container">${a}</div>`}function Kt(){return window.innerWidth<768&&C.currentView==="week"?3:C.weekViewDays}function Ps(e){const t=document.getElementById("agenda-view"),a=["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],r=Qa(C.currentDate),s=Kt();let o=`<div class="grid divide-x divide-gray-200 min-h-[60vh]" style="grid-template-columns: repeat(${s}, minmax(0, 1fr));">`;for(let n=0;n<s;n++){const i=new Date(r);i.setDate(i.getDate()+n);const d=new Date,l=i.toDateString()===d.toDateString(),c=e.filter(m=>new Date(m.startTime).toDateString()===i.toDateString()).sort((m,b)=>new Date(m.startTime)-new Date(b.startTime));let u='<div class="p-1 space-y-2">';c.length>0?u+=c.map(m=>{const f=new Date(m.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),v=p.professionalColors.get(m.professionalId)||{bg:"#e5e7eb",border:"#9ca3af"};if(m.type==="blockage")return`
                        <div class="p-2 rounded-lg border-l-4 flex flex-col bg-red-100" style="border-left-color: ${v.border};">
                            <span class="font-bold text-xs text-red-900">${f}</span>
                            <div class="mt-1 min-w-0">
                                <p class="font-semibold text-sm text-red-800 truncate">${m.reason}</p>
                                <p class="text-xs text-red-600 truncate">com ${m.professionalName}</p>
                            </div>
                        </div>
                    `;const k=JSON.stringify(m).replace(/'/g,"&apos;"),$=m.redeemedReward?.points>0,S=m.hasRewards&&!$,w=m.status==="completed";return`
                    <div class="p-2 rounded-lg border-l-4 flex flex-col cursor-pointer" 
                         style="background-color: ${v.bg}; border-left-color: ${v.border};"
                         data-action="open-comanda" data-appointment='${k}'>
                        
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-xs text-gray-900">${f}</span>
                            ${w?'<span class="text-[10px] font-semibold bg-green-200 text-green-800 px-1 rounded-sm">OK</span>':""}
                        </div>

                        <div class="mt-1 min-w-0">
                            <p class="font-semibold text-sm text-gray-800 truncate">${S?"🎁 ":""}${m.clientName}</p>
                            <p class="text-xs text-gray-600 truncate">${m.serviceName}</p>
                            <p class="text-xs text-gray-500 truncate">com ${m.professionalName||"Indefinido"}</p>
                            ${$?'<p class="text-xs text-purple-600 truncate">Resgate</p>':""}
                        </div>
                        
                        </div>
                `}).join(""):u+='<div class="text-center text-xs text-gray-400 pt-4">Nenhum evento</div>',u+="</div>",o+=`
            <div class="flex flex-col">
                <div class="text-center py-2 border-b ${l?"bg-indigo-100 text-indigo-700":"bg-gray-50"}">
                    <p class="font-bold">${a[i.getDay()]}</p>
                    <p class="text-sm">${i.getDate()}/${i.getMonth()+1}</p>
                </div>
                <div class="flex-grow overflow-y-auto">${u}</div>
            </div>
        `}o+="</div>",t.innerHTML=o}function As(){const e=p.allEvents.filter(t=>C.selectedProfessionalId==="all"||t.professionalId===C.selectedProfessionalId);C.currentView==="list"?Ms(e):Ps(e)}async function G(){const e=document.getElementById("agenda-view");if(!e)return;e.innerHTML='<div class="loader mx-auto my-10"></div>';let t,a;const r=document.getElementById("weekRange");if(C.currentView==="list")t=new Date(C.currentDate),t.setHours(0,0,0,0),a=new Date(C.currentDate),a.setHours(23,59,59,999),r.textContent=Ts(t);else{const s=Kt();t=Qa(new Date(C.currentDate)),a=new Date(t),a.setDate(t.getDate()+(s-1)),a.setHours(23,59,59,999),r.textContent=`${t.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})} - ${a.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})}`}try{const s=await Fo(p.establishmentId,t.toISOString(),a.toISOString(),C.selectedProfessionalId==="all"?null:C.selectedProfessionalId),n=(await bt(p.establishmentId,t.toISOString(),a.toISOString(),C.selectedProfessionalId)).map(d=>{let l=d.professionalName;if(!l&&d.professionalId){const c=p.professionals?p.professionals.find(u=>u.id===d.professionalId):null;c&&(l=c.name)}return{...d,type:"blockage",professionalName:l||"Não identificado"}}),i=[...s.map(d=>({...d,type:"appointment"})),...n];if(p.allEvents=i,mt(),As(),C.scrollToAppointmentId){const d=document.querySelector(`[data-appointment*='"id":"${C.scrollToAppointmentId}"']`);d&&(d.scrollIntoView({behavior:"smooth",block:"center"}),d.style.transition="background-color 0.5s ease-in-out",d.style.backgroundColor="#e0e7ff",setTimeout(()=>{d.style.backgroundColor=""},2500)),C.scrollToAppointmentId=null}}catch(s){g("Erro na Agenda",`Não foi possível carregar a agenda: ${s.message}`,"error"),e.innerHTML='<div class="p-6 text-center text-red-600">Falha ao carregar dados.</div>'}}async function qs(){try{const[e,t,a,r]=await Promise.all([p.professionals&&p.professionals.length>0?Promise.resolve(p.professionals):_(p.establishmentId),p.services&&p.services.length>0?Promise.resolve(p.services):Ie(p.establishmentId),Z.length>0?Promise.resolve(Z):Je(p.establishmentId),je.enabled!==void 0?Promise.resolve(null):_e(p.establishmentId)]);(!p.professionals||p.professionals.length===0)&&(p.professionals=e||[]),(!p.services||p.services.length===0)&&(p.services=t||[]),Z.length===0&&(Z=a||[]),r&&(je=r.loyaltyProgram||{enabled:!1}),p.professionals.forEach((s,o)=>{p.professionalColors.set(s.id,qt[o%qt.length])}),mt()}catch(e){console.error("Erro ao popular filtros e dependências do modal:",e),g("Atenção","Não foi possível pré-carregar os dados para agendamento. A abertura do modal pode ser lenta.","error")}}function Nt(e){e<1||e>4||(x.step=e,Ft(null,!0))}function Za(e,t){const a=t.classList.contains("selected"),r=x.data.selectedServiceIds.indexOf(e);a?(t.classList.remove("selected","border-blue-500"),r>-1&&x.data.selectedServiceIds.splice(r,1)):(t.classList.add("selected","border-blue-500"),x.data.selectedServiceIds.push(e))}function Ka(e,t){const a=document.querySelector(".professional-step-cards");if(!a)return;a.querySelectorAll(".professional-modal-card").forEach(s=>s.classList.remove("selected","border-blue-500")),t.classList.add("selected","border-blue-500");const r=ht.find(s=>s.id===e);x.data.professionalId=e,x.data.professionalName=r?r.name:"N/A"}function Ns(e,t){const a=document.getElementById("availableTimesContainer");a&&(a.querySelectorAll(".time-slot-card").forEach(r=>r.classList.remove("selected")),t.classList.add("selected"),x.data.time=e)}async function va(){const e=document.getElementById("apptTotalDuration"),t=document.getElementById("availableTimesContainer");if(!e||!t)return;const a=x.data.professionalId,r=x.data.selectedServiceIds,s=document.getElementById("apptDate").value;x.data.date=s;const o=r.reduce((n,i)=>{const d=We.find(l=>l.id===i);return n+(d?d.duration+(d.bufferTime||0):0)},0);if(e.textContent=`${o} min`,o===0||!a||!s){t.innerHTML='<p class="col-span-full text-center text-gray-500">Selecione serviço, profissional e data.</p>';return}t.innerHTML='<div class="loader mx-auto col-span-full"></div>';try{const n=r.join(","),i=await fetch(`${Bs}/api/availability?establishmentId=${p.establishmentId}&professionalId=${a}&serviceIds=${n}&date=${s}`);if(!i.ok)throw new Error("Falha na resposta da API de disponibilidade");let d=await i.json();const l=new Date;if(new Date(s+"T00:00:00").toDateString()===l.toDateString()){const u=l.getHours()*60+l.getMinutes();d=d.filter(m=>{const[b,f]=m.split(":").map(Number);return b*60+f>=u})}if(t.innerHTML="",d.length>0){if(d.forEach(u=>{const m=document.createElement("button");m.type="button",m.className=`time-slot-card p-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition ${x.data.time===u?"selected":""}`,m.textContent=u,m.addEventListener("click",()=>Ns(u,m)),t.appendChild(m)}),x.data.time){const u=t.querySelector(`[data-action="time-slot"][data-time="${x.data.time}"]`);u&&u.classList.add("selected")}}else t.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum horário disponível.</p>'}catch{t.innerHTML='<p class="col-span-full text-center text-red-500">Erro ao buscar horários.</p>'}}function Fs(){const e=document.getElementById("loyaltyRewardsContainer");if(!e)return;const{clientHasRewards:t,clientLoyaltyPoints:a,redeemedReward:r}=x.data,{enabled:s,rewards:o,pointsPerCurrency:n}=je;if(!s||!t||!o||o.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");const i=o.filter(l=>a>=l.points);let d=`
        <h4 class="text-md font-semibold text-gray-700 mb-2">🎁 Prêmios Disponíveis (${a} pontos)</h4>
    `;i.length>0?(d+='<div class="space-y-2">',d+=i.map(l=>{const c=r?.reward===l.reward;return`
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
                   ${r?"":"checked"}>
            <span class="ml-3 text-gray-600">Não resgatar prêmio agora</span>
        </label>
    `),e.querySelector('input[value="none"]').addEventListener("change",l=>{l.target.checked&&(x.data.redeemedReward=null)})}async function Rs(e){e.preventDefault();const t=e.target,a=t.querySelector('button[type="submit"]');if(!x.data.time||x.data.selectedServiceIds.length===0||!x.data.professionalId)return g("Erro de Validação","Por favor, selecione o horário, serviço(s) e profissional antes de confirmar.","error");a.disabled=!0,a.textContent="A confirmar...";const r=x.data.selectedServiceIds.map(l=>{const c=We.find(u=>u.id===l);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[s,o]=x.data.time.split(":"),n=new Date(`${x.data.date}T${s}:${o}:00`),i={establishmentId:p.establishmentId,clientName:x.data.clientName,clientPhone:x.data.clientPhone,services:r,professionalId:x.data.professionalId,startTime:n.toISOString(),redeemedReward:x.data.redeemedReward},d=t.querySelector("#appointmentId").value;d&&(i.id=d);try{d?await Yt(d,i):await Ho(i),g(`Agendamento ${d?"atualizado":"criado"} com sucesso!`,"success"),document.getElementById("appointmentModal").style.display="none",G()}catch(l){g(l.message,"error")}finally{a.disabled=!1,a.textContent="Confirmar Agendamento"}}function Hs(e){return`
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
    `}async function ha(e){const t=document.getElementById("clientSearchResults");if(!t)return;const a=e.toLowerCase().trim();if(a.length<3){t.innerHTML='<p class="text-sm text-gray-500">Digite pelo menos 3 caracteres para buscar clientes existentes.</p>';return}const r=Z.filter(s=>s.name.toLowerCase().includes(a)||s.phone.includes(a));if(r.length===0){t.innerHTML='<p class="text-sm text-gray-500">Nenhum cliente encontrado com este termo.</p>';return}t.innerHTML=r.map(Hs).join(""),t.querySelectorAll('[data-action="select-client"]').forEach(s=>{s.addEventListener("click",o=>{const n=s.dataset.clientName,i=s.dataset.clientPhone,d=Z.find(l=>l.phone===i&&l.name===n);if(x.data.clientName=n,x.data.clientPhone=i,d){const l=je,c=Math.min(...(l?.rewards||[]).map(u=>u.points));x.data.clientLoyaltyPoints=d.loyaltyPoints||0,x.data.clientHasRewards=l.enabled&&c!==1/0&&x.data.clientLoyaltyPoints>=c}else x.data.clientHasRewards=!1,x.data.clientLoyaltyPoints=0;document.getElementById("apptClientName").value=n,document.getElementById("apptClientPhone").value=i,document.querySelectorAll(".client-search-card").forEach(l=>l.classList.remove("selected","border-blue-500")),s.classList.add("selected","border-blue-500")})})}async function js(e){e.preventDefault();const t=document.getElementById("clientRegistrationForm"),a=t.querySelector('button[type="submit"]'),r={establishmentId:p.establishmentId,name:t.querySelector("#regClientName").value.trim(),email:t.querySelector("#regClientEmail").value.trim(),phone:t.querySelector("#regClientPhone").value.trim(),dobDay:t.querySelector("#regClientDobDay").value.trim(),dobMonth:t.querySelector("#regClientDobMonth").value.trim(),notes:t.querySelector("#regClientNotes").value.trim()};if(!r.name||!r.phone)return g("Erro de Validação","Nome e Telefone são obrigatórios.","error");a.disabled=!0,a.textContent="A salvar...";try{await Zt(r),Z.push({name:r.name,phone:r.phone,loyaltyPoints:0}),x.data.clientName=r.name,x.data.clientPhone=r.phone,x.data.clientHasRewards=!1,x.data.clientLoyaltyPoints=0,g("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",Nt(1)}catch(s){g(`Erro ao cadastrar cliente: ${s.message}`,"error")}finally{a.disabled=!1,a.textContent="Salvar"}}function Os(){j({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("clientRegistrationForm");t&&t.addEventListener("submit",js)}function zs(){Os()}function Vs(e,t){const a=e?"Editar Agendamento":"Selecionar Cliente",r=`
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
    `;return{title:a,content:r}}function Us(){const e="Selecionar Serviço",t=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">2. Serviços</h3>
             <div class="flex items-center gap-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
                 <input type="search" id="serviceSearchModalInput" placeholder="Buscar Serviço..." class="flex-grow p-3 pl-10 border rounded-lg">
            </div>
            
            <div id="apptServicesContainer" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-1">
                 ${We.map(a=>{const r=x.data.selectedServiceIds.includes(a.id),s=a.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
                         <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${r?"selected border-blue-500":""}" data-service-id="${a.id}">
                             <div class="flex items-center">
                                 <img src="${s}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
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
    `;return{title:e,content:t}}function _s(){const e="Selecionar Profissional",t=`
        <div class="p-5 space-y-6">
             <h3 class="text-xl font-bold text-gray-800">3. Profissional</h3>
             <div id="apptProfessionalContainer" class="mt-4 flex flex-wrap gap-3 max-h-48 overflow-y-auto p-1 professional-step-cards">
                 ${ht.map(a=>{const r=x.data.professionalId===a.id,s=a.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P";return`
                         <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${r?"selected border-blue-500":""}" data-professional-id="${a.id}">
                             <img src="${s}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
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
    `;return{title:e,content:t}}function Js(e){const t=e?"Confirmar Edição":"Data e Horário",a=new Date,r=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`,s=x.data.date||r,o=`
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
    `;return{title:t,content:o}}function Ws(e){const t=document.getElementById("apptServicesContainer");if(!t)return;const a=e.toLowerCase(),r=We.filter(s=>s.name.toLowerCase().includes(a));t.innerHTML=r.map(s=>{const o=x.data.selectedServiceIds.includes(s.id),n=s.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
            <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${o?"selected border-blue-500":""}" data-service-id="${s.id}">
                <div class="flex items-center">
                    <img src="${n}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-gray-800">${s.name}</p>
                        <p class="text-xs text-gray-500">R$ ${s.price.toFixed(2)} (${s.duration} min)</p>
                    </div>
                </div>
            </div>`}).join(""),t.querySelectorAll(".service-card").forEach(s=>{s.addEventListener("click",()=>Za(s.dataset.serviceId,s))})}function Gs(e){const t=document.getElementById("apptProfessionalContainer");if(!t)return;const a=e.toLowerCase(),r=ht.filter(s=>s.name.toLowerCase().includes(a));t.innerHTML=r.map(s=>{const o=x.data.professionalId===s.id,n=s.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P";return`
             <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${o?"selected border-blue-500":""}" data-professional-id="${s.id}">
                 <img src="${n}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                 <p class="text-xs font-semibold text-gray-800">${s.name.split(" ")[0]}</p>
                 <p class="text-[10px] text-gray-500">${s.specialty||"Profissional"}</p>
             </div>`}).join(""),t.querySelectorAll(".professional-modal-card").forEach(s=>{s.addEventListener("click",()=>Ka(s.dataset.professionalId,s))})}async function Ft(e=null,t=!1){const a=document.getElementById("appointmentModal");if(!t){const o=e?.startTime?new Date(e.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],n=e?.startTime?new Date(e.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null;x={step:1,data:{id:e?.id||null,clientName:e?.clientName||"",clientPhone:e?.clientPhone||"",selectedServiceIds:e?.services?.map(i=>i.id)||[],professionalId:e?.professionalId||null,professionalName:e?.professionalName||"",date:o,time:n,redeemedReward:e?.redeemedReward||null,clientHasRewards:e?.hasRewards||!1,clientLoyaltyPoints:0}}}if(!p.services||!p.professionals||!Z||je.enabled===void 0){g("Erro","Os dados da agenda ainda não foram carregados. Tente novamente em alguns segundos.","error");return}if(We=p.services,ht=p.professionals.filter(o=>o.status==="active"),x.data.clientName&&x.data.clientPhone){const o=Z.find(n=>n.phone===x.data.clientPhone&&n.name===x.data.clientName);o&&(x.data.clientLoyaltyPoints=o.loyaltyPoints||0)}let r={title:"Erro",content:"<p>Etapa não encontrada.</p>"};switch(x.step){case 1:r=Vs(e);break;case 2:r=Us();break;case 3:r=_s();break;case 4:r=Js(e);break}a.innerHTML=`
        <div class="modal-content max-w-4xl p-0 rounded-xl overflow-hidden shadow-2xl">
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${r.title}</h2>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>
            </header>
            
            <form id="appointmentForm" class="flex flex-col h-full">
                <input type="hidden" id="appointmentId" value="${x.data.id||""}">
                <input type="hidden" id="selectedTime" value="${x.data.time||""}">
                
                <div class="flex-1 overflow-y-auto" style="max-height: 80vh;">
                    ${r.content}
                </div>
                
            </form>
        </div>`,a.querySelectorAll('[data-action="next-step"]').forEach(o=>{o.addEventListener("click",()=>{const n=parseInt(o.dataset.currentStep,10);if(n===1){const i=a.querySelector("#apptClientName"),d=a.querySelector("#apptClientPhone");if(x.data.clientName=i.value.trim(),x.data.clientPhone=d.value.trim(),!x.data.clientName||!x.data.clientPhone)return g("Atenção","Nome e telefone do cliente são obrigatórios.","error")}else if(n===2){if(x.data.selectedServiceIds.length===0)return g("Atenção","Selecione pelo menos um serviço.","error")}else if(n===3&&!x.data.professionalId)return g("Atenção","Selecione um profissional.","error");Nt(n+1)})}),a.querySelectorAll('[data-action="prev-step"]').forEach(o=>{o.addEventListener("click",()=>Nt(parseInt(o.dataset.currentStep,10)-1))});const s=a.querySelector("#appointmentForm");if(x.step===4&&s&&s.addEventListener("submit",Rs),a.style.display="flex",x.step===2){a.querySelector("#apptServicesContainer").querySelectorAll(".service-card").forEach(i=>{i.addEventListener("click",()=>Za(i.dataset.serviceId,i))});const n=a.querySelector("#serviceSearchModalInput");n&&n.addEventListener("input",i=>Ws(i.target.value))}if(x.step===3){a.querySelector("#apptProfessionalContainer").querySelectorAll(".professional-modal-card").forEach(i=>{i.addEventListener("click",()=>Ka(i.dataset.professionalId,i))});const n=a.querySelector("#professionalSearchModalInput");n&&n.addEventListener("input",i=>Gs(i.target.value))}if(x.step===1){const o=a.querySelector("#clientSearchInput");o&&(o.addEventListener("input",i=>ha(i.target.value)),x.data.clientName&&x.data.clientPhone&&ha(`${x.data.clientName} ${x.data.clientPhone}`));const n=a.querySelector('[data-action="open-client-registration"]');n&&n.addEventListener("click",zs)}if(x.step===4){const o=a.querySelector("#apptDate");o&&o.addEventListener("change",va),va(),Fs()}}async function eo(e={}){C.currentDate=e.targetDate?new Date(e.targetDate):C.currentDate||new Date,C.scrollToAppointmentId=e.scrollToAppointmentId||null,C.profSearchTerm="",window.innerWidth<768&&(C.currentView="list"),fa.innerHTML=`
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
        </section>`,document.querySelectorAll(".view-btn[data-view]").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".view-btn[data-view]").forEach(s=>s.classList.remove("active")),a.classList.add("active"),C.currentView=a.dataset.view;const r=document.getElementById("week-days-toggle");if(C.currentView==="week"){if(r.style.display="flex",window.innerWidth<768){C.weekViewDays=3,document.querySelectorAll(".week-days-btn").forEach(o=>o.classList.remove("active"));const s=document.querySelector('.week-days-btn[data-days="3"]');s&&s.classList.add("active")}}else r.style.display="none";G()})}),document.querySelectorAll(".week-days-btn").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".week-days-btn").forEach(r=>r.classList.remove("active")),a.classList.add("active"),C.weekViewDays=parseInt(a.dataset.days,10),G()})}),document.getElementById("todayBtn").addEventListener("click",()=>{C.currentDate=new Date,G()});const t=a=>{const r=parseInt(a.currentTarget.dataset.amount,10),s=C.currentView==="week"?Kt():1,o=new Date(C.currentDate);o.setDate(o.getDate()+r*s),C.currentDate=o,G()};document.getElementById("prevBtn").addEventListener("click",t),document.getElementById("nextBtn").addEventListener("click",t),document.getElementById("profSearchInput").addEventListener("input",a=>{C.profSearchTerm=a.target.value,mt()}),document.getElementById("showInactiveProfsToggle").addEventListener("change",a=>{C.showInactiveProfs=a.target.checked,mt(),G()}),ba||(fa.addEventListener("click",async a=>{const r=a.target.closest("[data-action]");if(a.target.closest('[data-action="select-professional"]')){const d=a.target.closest('[data-action="select-professional"]').dataset.profId,l=C.selectedProfessionalId===d&&d!=="all";if(C.selectedProfessionalId=l?"all":d,d!=="all"){const c=document.getElementById("profSearchInput");c&&(c.value=""),C.profSearchTerm=""}await G();return}if(!r)return;const s=r.dataset.action;let o=null;const n=a.target.closest("[data-appointment]");switch(n&&(o=JSON.parse(n.dataset.appointment.replace(/&apos;/g,"'"))),s){case"new-appointment":Ft();break;case"edit-appointment":if(!o)return;if(o.status==="completed"){g("Atenção","Agendamentos finalizados não podem ser editados.","error");return}o.hasRewards&&!o.redeemedReward&&g("🎁 Cliente com Prêmios!","Este cliente tem pontos para resgatar. Verifique a Etapa 4 do agendamento.","info"),Ft(o);break;case"delete-appointment":{const i=r.dataset.id;if(await T("Confirmar Exclusão","Tem a certeza que deseja apagar este agendamento?"))try{await jo(i),g("Agendamento apagado!","success"),G()}catch(l){g(`Não foi possível apagar: ${l.message}`,"error")}break}case"open-comanda":if(o){o.hasRewards&&!o.redeemedReward&&o.status!=="completed"&&g("🎁 Cliente com Prêmios!","Este cliente tem pontos de fidelidade para resgatar.","info");const i=o.status==="completed"?"finalizadas":"em-atendimento",d={selectedAppointmentId:o.id,initialFilter:i};i==="finalizadas"&&(d.filterDate=o.startTime),F("comandas-section",d)}break}}),ba=!0),await qs(),await G()}const Ys=e=>y(`/api/comandas/${e}`),Xs=e=>y("/api/sales",{method:"POST",body:JSON.stringify(e)}),Qs=e=>y(`/api/sales/${e}/reopen`,{method:"POST"}),Zs=e=>y(`/api/sales/${e}`,{method:"DELETE"}),ea=e=>y(`/api/products/${e}`),Ks=e=>y("/api/products",{method:"POST",body:JSON.stringify(e)}),er=(e,t)=>y(`/api/products/${e}`,{method:"PUT",body:JSON.stringify(t)}),tr=e=>y(`/api/products/${e}`,{method:"DELETE"}),ar=(e,t)=>y(`/api/products/${e}/stock`,{method:"PATCH",body:JSON.stringify(t)}),or=({startDate:e,endDate:t,productId:a,categoryId:r})=>{const s=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&s.append("productId",a),r&&r!=="all"&&s.append("categoryId",r),y(`/api/products/stock-history/report?${s.toString()}`)},to=()=>y("/api/cashier/status").catch(e=>{if(e.message.includes("404")||e.message.includes("não encontrada"))return null;throw e}),sr=e=>{const t={establishmentId:e.establishmentId,initialAmount:Number(e.initialAmount),notes:e.notes||""};return console.log("Payload enviado para abrir caixa:",t),y("/api/cashier/open",{method:"POST",body:JSON.stringify(t)})},rr=(e,t)=>{const a={finalAmount:Number(t)};return console.log("Payload enviado para fechar caixa:",a),y(`/api/cashier/close/${e}`,{method:"PUT",body:JSON.stringify(a)})},nr=()=>y("/api/cashier/history").then(e=>e||[]).catch(e=>(console.error("Erro ao buscar histórico:",e),[])),ir=e=>y(`/api/cashier/report/${e}`),ao=e=>y(`/api/packages/${e}`),lr=e=>y("/api/packages",{method:"POST",body:JSON.stringify(e)}),dr=(e,t)=>y(`/api/packages/${e}`,{method:"PUT",body:JSON.stringify(t)}),cr=e=>y(`/api/packages/${e}`,{method:"DELETE"});let h={allComandas:[],catalog:{services:[],products:[],packages:[]},clients:[],activeFilter:"atendimento",selectedComandaId:null,isCashierOpen:!1,activeCashierSessionId:null,paging:{page:1,limit:12,total:0}},fe=null,be=null;function ur(){const e=document.getElementById("comandas-layout");if(e){e.classList.add("detail-view-active");const t=document.getElementById("comanda-detail-container");t&&(t.scrollTop=0)}}function ce(){const e=document.getElementById("comandas-layout");e&&e.classList.remove("detail-view-active")}function mr(){const e=new Date().toISOString().split("T")[0];be.innerHTML=`
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
    `}function pr(){const e=document.getElementById("cashier-controls");e&&(h.isCashierOpen?e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-green-700 bg-green-100 py-1 px-3 rounded-full">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-2 px-4 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 text-sm">Fechar Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm">Relatório</button>
        `:e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-red-700 bg-red-100 py-1 px-3 rounded-full">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-sm">Abrir Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm">Relatório</button>
        `)}function ne(){const e=document.getElementById("comandas-list");if(!e)return;if(!h.isCashierOpen&&h.activeFilter==="atendimento"){e.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `;return}const a={atendimento:"confirmed",finalizadas:"completed"}[h.activeFilter],r=h.allComandas.filter(s=>s.status===a);if(r.length===0){e.innerHTML='<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda encontrada.</p>',ya(e);return}e.innerHTML=r.map(s=>{const n=[...s.services||[],...s.comandaItems||[],...s.items||[]].reduce((u,m)=>u+(m.price||0),0),i=s.id===h.selectedComandaId,d=new Date(s.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),c=s.type==="walk-in"||s.id.startsWith("temp-")?'<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">Avulso</span>':'<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">Agendado</span>';return`
            <div data-action="select-comanda" data-comanda-id="${s.id}" 
                 class="comanda-card cursor-pointer ${i?"selected":""}">
                
                <div class="flex justify-between items-start mb-1">
                    <p class="font-bold text-gray-800 truncate max-w-[70%]">${s.clientName}</p>
                    <p class="font-bold text-gray-900">R$ ${n.toFixed(2)}</p>
                </div>
                
                <div class="flex justify-between items-center mt-1">
                    <div class="flex items-center gap-2">
                        ${c}
                        <p class="text-xs text-gray-500 truncate max-w-[100px]">${s.professionalName}</p>
                    </div>
                    <p class="text-xs text-gray-400 font-medium">${d}</p> 
                </div>
            </div>
        `}).join(""),ya(e)}function ya(e){const{page:t,total:a,limit:r}=h.paging,s=Math.ceil((a||0)/r);if(s<=1)return;let o='<div class="flex gap-2 justify-center mt-4 flex-wrap pb-4">';t>1&&(o+=`<button data-page="${t-1}" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">&laquo;</button>`);for(let n=1;n<=s;n++)n===1||n===s||n>=t-2&&n<=t+2?o+=`<button data-page="${n}" class="px-3 py-1 rounded text-sm ${n===t?"bg-indigo-600 text-white font-bold":"bg-gray-200 hover:bg-gray-300"}">${n}</button>`:(n===t-3||n===t+3)&&(o+='<span class="px-2 text-gray-400">...</span>');t<s&&(o+=`<button data-page="${t+1}" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">&raquo;</button>`),o+="</div>",e.innerHTML+=o,e.querySelectorAll("button[data-page]").forEach(n=>{n.onclick=i=>{i.stopPropagation(),h.paging.page=parseInt(n.dataset.page,10),X()}})}function U(){const e=document.getElementById("comanda-detail-container");if(!e)return;const t=`
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
        `;return}const r=[...a.services||[],...a.comandaItems||[],...a.items||[]],s=a.status==="completed",o=a.type==="walk-in"||a.id.startsWith("temp-"),n=o?"":`<button data-action="go-to-appointment" data-id="${a.id}" data-date="${a.startTime}" 
                class="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1 mt-1">
             Ir para Agendamento <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
           </button>`,i=r.reduce((l,c)=>{const u=`${c.type}-${c.id||c.name}`;if(!l[u]){const m=(a.services||[]).some(b=>b.id===c.id&&b.name===c.name);l[u]={...c,quantity:0,isOriginalService:m&&c.type==="service"}}return l[u].quantity+=1,l},{}),d=Object.values(i).reduce((l,c)=>l+(c.price||0)*c.quantity,0);e.innerHTML=`
        ${t} <div class="flex-grow overflow-y-auto p-4">
            <div class="flex justify-between items-start mb-6 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800 truncate max-w-[200px]">${a.clientName}</h3>
                    <p class="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        ${a.professionalName}
                    </p>
                    ${o?'<span class="mt-2 inline-block px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-md">Venda Avulsa</span>':n}
                </div>
                <div class="flex gap-2">
                    ${s?`<button data-action="reopen-${a.type}" data-id="${a.id}" class="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200" title="Reabrir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>`:""}
                    ${o&&!s?`<button data-action="delete-walk-in" data-id="${a.id}" class="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200" title="Excluir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`:""}
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
                            ${s?"":`<button data-action="remove-item" data-item-id="${l.id}" data-item-type="${l.type}" class="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`}
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
            
            ${s?`
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
    `}function gr(){j({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("comandas_clientRegistrationForm");t&&t.addEventListener("submit",fr)}async function fr(e){e.preventDefault();const t=document.getElementById("comandas_clientRegistrationForm");if(!t)return;const a=t.querySelector('button[type="submit"]'),r={establishmentId:p.establishmentId,name:t.querySelector("#regClientName").value.trim(),email:t.querySelector("#regClientEmail").value.trim()||null,phone:t.querySelector("#regClientPhone").value.trim(),dob:`${t.querySelector("#regClientDobDay").value.trim()}/${t.querySelector("#regClientDobMonth").value.trim()}`,notes:t.querySelector("#regClientNotes").value.trim()||null};if(!r.name||!r.phone)return g("Erro de Validação","Nome e Telefone são obrigatórios.","error");a.disabled=!0,a.textContent="A salvar...";try{const s=await Zt(r);h.clients.push({id:s.id,...r}),g("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",oo(s.id)}catch(s){g(`Erro ao cadastrar cliente: ${s.message}`,"error")}finally{a.disabled=!1,a.textContent="Salvar Cliente"}}function br(){if(!h.isCashierOpen){g("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");return}const{modalElement:e,close:t}=j({title:"Adicionar Item à Comanda",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-4xl"}),a=()=>{let s="";const o=e.querySelector("#add-item-content"),n={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',package:'<svg class="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'},i=()=>{const d=s.toLowerCase(),l=u=>u.filter(m=>m.name.toLowerCase().includes(d)),c={"modal-service-list":{items:l(h.catalog.services),type:"service"},"modal-product-list":{items:l(h.catalog.products),type:"product"},"modal-package-list":{items:l(h.catalog.packages),type:"package"}};for(const[u,{items:m,type:b}]of Object.entries(c)){const f=o.querySelector(`#${u}`);f&&(f.innerHTML=m.map(v=>`
                        <button data-action="select-item-for-quantity" data-item-type="${b}" data-item-id="${v.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${n[b]}</div>
                            <span class="flex-grow text-left min-w-0 truncate">${v.name}</span>
                            <span class="font-semibold flex-shrink-0">R$ ${v.price.toFixed(2)}</span>
                        </button>
                    `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum item.</p>')}};o.innerHTML=`
            <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 mb-4 border rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-purple-600">Pacotes</h4><div id="modal-package-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
            </div>`,i(),o.querySelector("#item-search-input").addEventListener("input",d=>{s=d.target.value,i()})},r=s=>{let o=1;const n=e.querySelector("#add-item-content"),i=()=>{document.getElementById("quantity-display").textContent=o,document.getElementById("quantity-minus-btn").disabled=o<=1};n.innerHTML=`
            <div class="text-center p-8 relative">
                <button data-action="back-to-catalog" class="absolute top-5 left-5 text-gray-600 hover:text-gray-900">&larr; Voltar</button>
                <h3 class="font-bold text-2xl text-gray-800">${s.name}</h3>
                <p class="text-lg text-gray-500">R$ ${s.price.toFixed(2)}</p>
                <div class="my-8 flex items-center justify-center gap-4">
                    <button id="quantity-minus-btn" class="w-12 h-12 rounded-full bg-gray-200 text-3xl font-bold text-gray-600 hover:bg-gray-300">-</button>
                    <span id="quantity-display" class="text-4xl font-bold w-20 text-center">${o}</span>
                    <button id="quantity-plus-btn" class="w-12 h-12 rounded-full bg-gray-200 text-3xl font-bold text-gray-600 hover:bg-gray-300">+</button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Adicionar à Comanda</button>
            </div>
        `,document.getElementById("quantity-minus-btn").onclick=()=>{o>1&&(o--,i())},document.getElementById("quantity-plus-btn").onclick=()=>{o++,i()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await wr(s,o),t()}};e.addEventListener("click",s=>{const o=s.target.closest('[data-action="select-item-for-quantity"]'),n=s.target.closest('[data-action="back-to-catalog"]');if(o){const{itemType:i,itemId:d}=o.dataset,c=(h.catalog[i+"s"]||[]).find(u=>u.id===d);c&&r({...c,type:i})}else n&&a()}),a()}async function oo(e=null){if(!h.isCashierOpen){g("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");return}if(!h.clients||h.clients.length===0)try{h.clients=await Je(p.establishmentId)}catch{g("Erro","Não foi possível carregar dados de clientes.","error");return}if(!p.professionals||p.professionals.length===0)try{p.professionals=await _(p.establishmentId)}catch{g("Erro","Não foi possível carregar dados de profissionais.","error");return}const t=h.clients.map(n=>{const i=n.id===e?"selected":"";return`<option value="${n.id}" ${i}>${n.name} - ${n.phone}</option>`}).join(""),a=p.professionals.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""),r=`
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
    `,{modalElement:s}=j({title:"Nova Venda Avulsa",contentHTML:r,maxWidth:"max-w-md"});s.querySelector("#new-sale-form").addEventListener("submit",Sr);const o=s.querySelector('[data-action="new-client-from-sale"]');o&&o.addEventListener("click",n=>{n.preventDefault(),s.style.display="none",gr()})}function vr(){if(!h.isCashierOpen){g("Caixa Fechado","Abra o caixa antes de finalizar pagamentos.","error");return}const e=h.allComandas.find(l=>l.id===h.selectedComandaId);if(!e)return;const a=[...e.services||[],...e.comandaItems||[],...e.items||[]].reduce((l,c)=>l+(c.price||0),0);let r=[],s={remainingAmount:a,selectedMethod:"dinheiro",installments:1,amountReceived:""};const o=()=>{const l=document.getElementById("payment-list"),c=document.getElementById("remaining-amount"),u=document.getElementById("finalize-checkout-btn"),m=document.getElementById("change-container"),b=document.getElementById("installments-container"),f=document.getElementById("payment-value"),v=document.getElementById("payment-controls"),k=r.reduce((S,w)=>S+w.value,0);s.remainingAmount=a-k,l.innerHTML=r.map((S,w)=>`
            <div class="flex justify-between items-center bg-gray-100 p-2 rounded-md animate-fade-in-fast">
                <span class="font-medium text-sm">${S.method.charAt(0).toUpperCase()+S.method.slice(1)} ${S.installments>1?`(${S.installments}x)`:""}</span>
                <div class="flex items-center gap-2">
                    <span class="font-semibold">R$ ${S.value.toFixed(2)}</span>
                    <button data-action="remove-payment" data-payment-index="${w}" class="text-red-500 font-bold">&times;</button>
                </div>
            </div>`).join(""),s.remainingAmount<=.001?(c.textContent="Total Pago!",c.className="text-lg font-bold text-center mb-4 text-green-600",f.value="",u.disabled=!1,v&&(v.style.display="none")):(c.textContent=`Faltam: R$ ${s.remainingAmount.toFixed(2)}`,c.className="text-lg font-bold text-center mb-4 text-red-600",f.value=s.remainingAmount.toFixed(2),u.disabled=!0,v&&(v.style.display="block")),document.querySelectorAll(".payment-method-btn").forEach(S=>{S.classList.toggle("ring-2",S.dataset.method===s.selectedMethod),S.classList.toggle("ring-offset-2",S.dataset.method===s.selectedMethod)}),b.style.display=["credito","crediario"].includes(s.selectedMethod)?"block":"none",m.style.display=s.selectedMethod==="dinheiro"&&s.remainingAmount>0?"block":"none";const $=parseFloat(s.amountReceived)-s.remainingAmount;document.getElementById("change-value").textContent=`R$ ${$>0?$.toFixed(2):"0.00"}`},n=()=>{const l=document.getElementById("payment-value");let c=parseFloat(l.value);if(isNaN(c)||c<=0){g("Valor Inválido","Insira um valor de pagamento válido e maior que zero.","error");return}if(c>s.remainingAmount+.001){g("Valor Inválido","O valor excede o saldo restante.","error");return}const u={method:s.selectedMethod,value:c};["credito","crediario"].includes(s.selectedMethod)&&s.installments>1&&(u.installments=s.installments),r.push(u),s.selectedMethod="dinheiro",s.installments=1,document.getElementById("installments-select").value=1,o()},i=`
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
    `,{modalElement:d}=j({title:"Finalizar Pagamento",contentHTML:i,maxWidth:"max-w-md"});document.getElementById("payment-value").value=s.remainingAmount.toFixed(2),d.addEventListener("click",l=>{const c=l.target.closest(".payment-method-btn");c&&(s.selectedMethod=c.dataset.method,s.installments=1,document.getElementById("installments-select").value=1,o()),l.target.closest("#add-payment-btn")&&n(),l.target.closest('[data-action="remove-payment"]')&&(r.splice(parseInt(l.target.closest('[data-action="remove-payment"]').dataset.paymentIndex,10),1),o()),l.target.closest("#finalize-checkout-btn")&&Er(e,a,r)}),d.addEventListener("change",l=>{l.target.id==="installments-select"&&(s.installments=parseInt(l.target.value,10))}),d.addEventListener("input",l=>{l.target.id==="amount-received"&&(s.amountReceived=l.target.value,o())}),o()}async function hr(){const e=`
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
    `,{modalElement:t}=j({title:"Abrir Caixa",contentHTML:e,maxWidth:"max-w-md"});t.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const r=document.getElementById("initial-amount"),s=r.value.trim(),o=document.getElementById("cashier-notes").value.trim(),n=parseFloat(s);if(s===""||isNaN(n)||n<0){g("Valor Inválido","Por favor, insira um valor inicial válido (maior ou igual a R$ 0,00).","error"),r.focus();return}try{const i={establishmentId:p.establishmentId,initialAmount:parseFloat(n.toFixed(2))};o&&(i.notes=o);const d=await sr(i);h.isCashierOpen=!0,h.activeCashierSessionId=d.id,await ta(),document.getElementById("genericModal").style.display="none",g("Sucesso!",`Caixa aberto com valor inicial de R$ ${n.toFixed(2)}`,"success")}catch(i){g("Erro",`Não foi possível abrir o caixa: ${i.message}`,"error")}})}async function yr(){const e=h.activeCashierSessionId;if(e)try{const t=await ir(e),a=`
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
        `,{modalElement:r}=j({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-md"});r.querySelector("#close-cashier-form").addEventListener("submit",async s=>{s.preventDefault();const o=parseFloat(document.getElementById("final-amount").value);if(isNaN(o)||o<0){g("Valor Inválido","Insira um valor final válido.","error");return}try{await rr(e,o),h.isCashierOpen=!1,h.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",await ta(),g("Sucesso!","Caixa fechado com sucesso!","success")}catch(n){g("Erro",`Não foi possível fechar o caixa: ${n.message}`,"error")}})}catch(t){g("Erro",`Não foi possível carregar o relatório de fecho: ${t.message}`,"error")}}async function xr(e){h.activeFilter!==e&&(h.activeFilter=e,h.paging.page=1,document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${e}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",e!=="finalizadas"),ce(),await X(),h.selectedComandaId=null,U())}function Rt(e){h.selectedComandaId=e,ne(),ur(),U()}async function wr(e,t){const a=h.allComandas.find(s=>s.id===h.selectedComandaId);if(!a)return;const r=Array(t).fill(0).map(()=>({id:e.id,name:e.name,price:e.price,type:e.type}));if(a.comandaItems=a.comandaItems||[],a.comandaItems.push(...r),a.type==="walk-in"&&a.id.startsWith("temp-")){g("Sucesso",`${t}x ${e.name} adicionado(s)!`,"success"),U(),ne();return}try{await Yt(a.id,a),g("Sucesso",`${t}x ${e.name} adicionado(s)!`,"success"),U(),ne()}catch(s){g("Erro",`Não foi possível adicionar o item: ${s.message}`,"error"),a.comandaItems.splice(a.comandaItems.length-t,t)}}async function kr(e,t){const a=h.allComandas.find(o=>o.id===h.selectedComandaId);if(!a)return;let r=!1,s=(a.comandaItems||[]).findIndex(o=>o.id===e&&o.type===t);if(s>-1)a.comandaItems.splice(s,1),r=!0;else{let o=(a.services||[]).findIndex(n=>n.id===e);if(o>-1)a.services.splice(o,1),r=!0;else{let n=(a.items||[]).findIndex(i=>i.id===e&&i.type===t);n>-1&&(a.items.splice(n,1),r=!0)}}if(r){if(a.type==="walk-in"&&a.id.startsWith("temp-")){g("Sucesso","Item removido!","success"),U(),ne();return}try{await Yt(a.id,a),g("Sucesso","Item removido!","success"),U(),ne()}catch(o){g("Erro",`Não foi possível remover o item: ${o.message}`,"error"),await X()}}}async function Er(e,t,a){const r=e.type==="appointment",s=[...e.services||[],...e.comandaItems||[],...e.items||[]],o={payments:a,totalAmount:t,items:s,cashierSessionId:h.activeCashierSessionId};try{r?await zo(e.id,o):(o.clientName=e.clientName,o.professionalId=e.professionalId,o.clientPhone=e.clientPhone,await Xs(o)),g("Sucesso!","Venda finalizada com sucesso!","success"),document.getElementById("genericModal").style.display="none",ce(),h.selectedComandaId=null,await X()}catch(n){g("Erro no Checkout",n.message,"error")}}async function Sr(e){e.preventDefault();const t=document.getElementById("new-sale-client").value,a=document.getElementById("new-sale-professional").value,r=h.clients.find(n=>n.id===t),s=p.professionals.find(n=>n.id===a);if(!r||!s){g("Erro","Selecione um cliente e um profissional válidos.","error");return}const o={id:`temp-${Date.now()}`,type:"walk-in",clientName:r.name,clientPhone:r.phone,professionalId:s.id,professionalName:s.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};h.allComandas.unshift(o),h.selectedComandaId=o.id,document.getElementById("genericModal").style.display="none",Rt(o.id)}async function X(){const e=document.getElementById("comandas-list");e.innerHTML='<div class="loader mx-auto mt-10"></div>';const t=h.activeFilter==="finalizadas"?document.getElementById("filter-date").value:null;try{const a=await to();if(h.isCashierOpen=!!a,h.activeCashierSessionId=a?a.id:null,pr(),!h.isCashierOpen&&h.activeFilter==="atendimento"){ne(),U();return}const r=await Ys(p.establishmentId,t,h.paging.page,h.paging.limit);if(h.allComandas=r.data||r,h.paging.total=r.total||r.length,h.catalog.services.length===0){const[s,o,n,i,d]=await Promise.all([Ie(p.establishmentId),ea(p.establishmentId),ao(p.establishmentId),Je(p.establishmentId),_(p.establishmentId)]);h.catalog={services:s,products:o,packages:n},h.clients=i,p.professionals=d}ne(),h.selectedComandaId,U()}catch(a){g("Erro de Carregamento",`Não foi possível carregar os dados: ${a.message}`,"error"),e.innerHTML=`<p class="text-red-500 p-4">${a.message}</p>`}}async function ta(e={}){be=document.getElementById("content");try{const t=await to();h.isCashierOpen=!!t,h.activeCashierSessionId=t?t.id:null}catch(t){console.error("Erro ao verificar caixa:",t),h.isCashierOpen=!1}h.selectedComandaId=e.selectedAppointmentId||null,mr(),fe&&(be.removeEventListener("click",fe),be.removeEventListener("change",fe)),fe=async t=>{const a=t.target.closest("[data-action], [data-filter], [data-comanda-id], [data-id]");if(t.target.id==="filter-date"&&h.activeFilter==="finalizadas"){h.paging.page=1,await X();return}if(a){if(a.matches("[data-filter]"))xr(a.dataset.filter);else if(a.matches("[data-comanda-id]")){if(t.target.closest('[data-action="go-to-appointment"]')){t.stopPropagation();return}Rt(a.dataset.comandaId)}else if(a.matches("[data-action]")){const r=a.dataset.action,s=a.dataset.id||h.selectedComandaId;switch(r){case"back-to-list":{ce(),h.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach(o=>o.classList.remove("selected")),U();break}case"new-sale":oo();break;case"add-item":br();break;case"checkout":vr();break;case"open-cashier":hr();break;case"close-cashier":await yr();break;case"view-sales-report":F("sales-report-section");break;case"remove-item":await kr(a.dataset.itemId,a.dataset.itemType);break;case"reopen-appointment":{if(await T("Reabrir Comanda","Tem certeza? O pagamento será estornado e os produtos devolvidos ao estoque."))try{await Oo(s);const n=h.allComandas.findIndex(i=>i.id===s);n!==-1&&(delete h.allComandas[n].transaction,delete h.allComandas[n].cashierSessionId,delete h.allComandas[n].redeemedReward,h.allComandas[n].status="confirmed"),h.selectedComandaId=null,ce(),g("Sucesso!","Comanda reaberta para edição.","success"),await X()}catch(n){g("Erro",`Não foi possível reabrir: ${n.message}`,"error")}break}case"reopen-walk-in":{if(await T("Reabrir Venda","Tem certeza? A venda será cancelada e os produtos devolvidos ao estoque."))try{await Qs(s),g("Sucesso!","Venda revertida."),ce(),h.selectedComandaId=null,await X()}catch(n){g("Erro",`Não foi possível reabrir: ${n.message}`,"error")}break}case"go-to-appointment":{const o=a.dataset.id,n=a.dataset.date;F("agenda-section",{scrollToAppointmentId:o,targetDate:new Date(n)});break}case"delete-walk-in":{if(await T("Excluir Venda","Tem certeza que deseja excluir esta venda avulsa? O estoque dos produtos será devolvido."))if(s.startsWith("temp-"))h.allComandas=h.allComandas.filter(n=>n.id!==s),h.selectedComandaId=null,ne(),U(),g("Sucesso","Venda avulsa removida.","success"),ce();else try{await Zs(s),g("Sucesso","Venda avulsa excluída com sucesso.","success"),h.selectedComandaId=null,ce(),await X()}catch(n){g("Erro",`Não foi possível excluir: ${n.message}`,"error")}break}}}}},be.addEventListener("click",fe),be.addEventListener("change",fe),e.initialFilter&&(h.activeFilter=e.initialFilter==="finalizadas"?"finalizadas":"atendimento"),e.selectedAppointmentId&&(h.selectedComandaId=e.selectedAppointmentId),document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${h.activeFilter}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",h.activeFilter!=="finalizadas"),e.filterDate&&(document.getElementById("filter-date").value=new Date(e.filterDate).toISOString().split("T")[0]),await X(),h.selectedComandaId&&Rt(h.selectedComandaId)}const yt=document.getElementById("content");let re={},$r=null,Ir=null,P={year:null,month:null,monthName:null,professionalId:null,professionalName:null},xa=[];const ve=["#4f46e5","#22c55e","#f97316","#06b6d4","#e11d48","#6366f1","#84cc16","#f59e0b"];function aa(){Object.values(re).forEach(e=>e?.destroy()),re={}}function Cr(e){const t=document.getElementById("kpi-revenue"),a=document.getElementById("kpi-transactions"),r=document.getElementById("kpi-popular-item");t&&(t.textContent=`R$ ${e.totalRevenue.toFixed(2)}`),a&&(a.textContent=e.totalTransactions),r&&(r.textContent=e.mostPopularItem||"N/A"),document.querySelectorAll(".kpi-loader").forEach(s=>s.classList.add("hidden")),document.querySelectorAll(".kpi-value").forEach(s=>s.classList.remove("hidden"))}function Lr(e){const t="Detalhes da Transação",a=`
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
        </section>`,document.getElementById("backToMainBtn").addEventListener("click",Ht);try{const r=await fs(p.establishmentId,e,t);Ir=r,document.querySelector(".loader-container").classList.add("hidden"),document.getElementById("monthly-details-view").classList.remove("hidden");const s=r.revenueByDay.map(m=>m.day),o=r.revenueByDay.map(m=>m.revenue),n=r.salesByProfessional.map(m=>m.name),i=r.salesByProfessional.map(m=>m.count),d=r.topItems.map(m=>m.name),l=r.topItems.map(m=>m.count),c=["Agendamentos","Vendas Avulsas"],u=[r.revenueByTransactionType.appointment,r.revenueByTransactionType.sales];aa(),re.monthlyRevenue=new Chart(document.getElementById("monthlyRevenueChart").getContext("2d"),{type:"bar",data:{labels:s,datasets:[{label:"Receita Diária",data:o,backgroundColor:ve[0]}]},options:{responsive:!0,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}},onClick:(m,b)=>{if(b.length>0){const f=s[b[0].index];Br(e,t,f)}}}}),re.salesByProfessional=new Chart(document.getElementById("salesByProfessionalChart").getContext("2d"),{type:"pie",data:{labels:n,datasets:[{label:"Vendas",data:i,backgroundColor:ve,hoverOffset:16}]},options:{responsive:!0,plugins:{legend:{position:"right"}},onClick:(m,b)=>{if(b.length>0){const f=b[0].index,v=r.salesByProfessional[f];v&&Tr(e,t,v.id,v.name)}}}}),re.topItems=new Chart(document.getElementById("topItemsChart").getContext("2d"),{type:"bar",data:{labels:d,datasets:[{label:"Itens Vendidos",data:l,backgroundColor:ve[2]}]},options:{indexAxis:"y",responsive:!0,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0}}}}),re.revenueByType=new Chart(document.getElementById("revenueByTypeChart").getContext("2d"),{type:"doughnut",data:{labels:c,datasets:[{label:"Receita por Tipo",data:u,backgroundColor:[ve[1],ve[3]],hoverOffset:16}]},options:{responsive:!0,plugins:{legend:{position:"right"}}}})}catch(r){g("Erro",`Não foi possível carregar os detalhes do mês: ${r.message}`,"error"),Ht()}}async function Br(e,t,a){P={...P,day:a},yt.innerHTML=`
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
        </section>`,document.getElementById("backToMonthlyBtn").addEventListener("click",()=>{Oe(P.year,P.month,P.monthName)});try{const r=await bs(p.establishmentId,e,t,a);xa=r.transactions,document.querySelector(".loader-container").classList.add("hidden"),document.getElementById("daily-details-view").classList.remove("hidden"),document.getElementById("daily-total-transactions").textContent=r.summary.totalTransactions,document.getElementById("daily-total-revenue").textContent=`R$ ${r.summary.totalRevenue.toFixed(2)}`;const s=document.getElementById("daily-transactions-list");s.innerHTML=r.transactions.map((o,n)=>`
            <tr class="border-b hover:bg-gray-50 cursor-pointer" data-index="${n}">
                <td class="px-2 py-2">${new Date(o.date).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</td>
                <td class="px-2 py-2">${o.client}</td>
                <td class="px-2 py-2">${o.professionalName||"N/A"}</td>
            </tr>
        `).join(""),document.querySelectorAll("#daily-transactions-list tr").forEach(o=>{o.addEventListener("click",n=>{const i=n.currentTarget.getAttribute("data-index"),d=xa[i];d&&Lr(d)})})}catch(r){g("Erro",`Não foi possível carregar os detalhes diários: ${r.message}`,"error"),Oe(P.year,P.month,P.monthName)}}async function Tr(e,t,a,r){P={year:e,month:t,professionalId:a,professionalName:r},yt.innerHTML=`
        <section>
            <div class="flex justify-between items-center mb-6">
                <button id="backToMonthlyBtn" class="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">
                    < Voltar
                </button>
                <h2 class="text-3xl font-bold text-gray-800">Relatório de ${r}</h2>
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
        </section>`,document.getElementById("backToMonthlyBtn").addEventListener("click",()=>{Oe(P.year,P.month,P.monthName)});try{const s=await vs(p.establishmentId,e,t,a);document.querySelector(".loader-container").classList.add("hidden"),document.getElementById("professional-details-view").classList.remove("hidden"),document.getElementById("prof-total-transactions").textContent=s.summary.totalTransactions,document.getElementById("prof-total-revenue").textContent=`R$ ${s.summary.totalRevenue.toFixed(2)}`;const o=document.getElementById("prof-transactions-list");o.innerHTML=s.transactions.map(n=>`
            <tr class="border-b hover:bg-gray-50">
                <td class="px-2 py-2">${new Date(n.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
                <td class="px-2 py-2">${n.client}</td>
                <td class="px-2 py-2">${n.items}</td>
                <td class="px-2 py-2 text-right">R$ ${n.value.toFixed(2)}</td>
            </tr>
        `).join("")}catch(s){g("Erro",`Não foi possível carregar os detalhes do profissional: ${s.message}`,"error"),Oe(P.year,P.month,P.monthName)}}async function Dr(e,t,a){const r=t.getElementsAtEventForMode(e,"nearest",{intersect:!0},!1);if(r.length>0){const o=r[0].index,n=a[o];n&&await Oe(n.year,n.monthIndex,n.month)}}async function wa(){const e=document.getElementById("main-reports-view"),t=document.getElementById("startDate"),a=document.getElementById("endDate");if(!e||!t||!a){console.error("Elementos essenciais para o relatório não foram encontrados no DOM.");return}e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';const r=t.value,s=a.value;if(!r||!s)return e.innerHTML='<p class="text-red-500 p-8 text-center">Selecione as datas para gerar o relatório.</p>',g("Atenção","Por favor, selecione as datas de início e fim.","error");try{const o=await ps(p.establishmentId,r,s);$r=o,e.innerHTML=`
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
            </div>`,Cr(o.kpis),setTimeout(()=>{const n=document.getElementById("transactionsByMonthChart");n&&(aa(),re.main=new Chart(n.getContext("2d"),{type:"bar",data:{labels:o.transactionsByMonth.map(i=>i.month),datasets:[{label:"Receita Total",data:o.transactionsByMonth.map(i=>i.revenue),backgroundColor:ve[0],borderRadius:5}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:i=>`R$ ${i.raw.toFixed(2)}`}}},scales:{y:{beginAtZero:!0}},onClick:(i,d)=>Dr(i,re.main,o.transactionsByMonth)}}))},50)}catch(o){g("Erro",`Não foi possível carregar os relatórios: ${o.message}`,"error"),e.innerHTML='<p class="text-red-500 p-8 text-center">Erro ao carregar os dados dos relatórios. Por favor, tente novamente.</p>'}}async function Ht(){aa();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];yt.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",wa),await wa()}const xt=(e,t="products")=>y(`/api/${t}/categories/${e}`),so=(e,t="products")=>y(`/api/${t}/categories`,{method:"POST",body:JSON.stringify(e)}),ro=(e,t="products")=>y(`/api/${t}/categories/${e}`,{method:"DELETE"}),de=document.getElementById("content");let oe=null,Me="services",me="all";async function Mr(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),r=a.value;if(r)try{await so({establishmentId:p.establishmentId,name:r},"services"),a.value="",g("Sucesso","Categoria criada!","success"),await oa(),await Ge()}catch(s){g("Erro",`Não foi possível criar a categoria: ${s.message}`,"error")}}async function Pr(e){if(await T("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await ro(e,"services"),g("Sucesso","Categoria apagada.","success"),await oa(),await Ge()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function oa(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await xt(p.establishmentId,"services");p.serviceCategories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${a.name}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function Ar(){j({title:"Gerir Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",Mr),t.addEventListener("click",r=>{const s=r.target.closest('button[data-action="delete-category"]');s&&(r.preventDefault(),Pr(s.dataset.id))}))}oa()}async function qr(e){e.preventDefault();const t=e.target.closest("#serviceModal"),a=t.querySelector("#serviceId").value,r={},s=t.querySelector('input[name="commissionType"]:checked').value;s==="custom"&&t.querySelectorAll(".professional-commission-row").forEach(n=>{const i=n.dataset.profId;if(n.querySelector('input[type="checkbox"]').checked){const l=parseFloat(n.querySelector('input[type="number"]').value);r[i]=isNaN(l)?0:l}});const o={establishmentId:p.establishmentId,name:t.querySelector("#serviceName").value,price:parseFloat(t.querySelector("#servicePrice").value),duration:parseInt(t.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(t.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:t.querySelector("#serviceCategory").value||null,commissionRate:parseFloat(t.querySelector("#serviceCommissionRate").value)||0,active:t.querySelector("#serviceStatus").value==="true",photo:t.querySelector("#servicePhotoBase64").value,notes:t.querySelector("#serviceNotes").value,commissionType:s,professionalCommissions:r};try{a?await xs(a,o):await ys(o),document.getElementById("serviceModal").style.display="none",g("Sucesso",`Serviço ${a?"atualizado":"adicionado"} com sucesso!`,"success"),await Ge()}catch(n){g("Erro",n.message,"error")}}function Nr(e,t=800,a=800,r="image/jpeg",s=.8){return new Promise((o,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=d=>{const l=new Image;l.onload=()=>{let c=l.width,u=l.height;c>u?c>t&&(u*=t/c,c=t):u>a&&(c*=a/u,u=a);const m=document.createElement("canvas");m.width=c,m.height=u,m.getContext("2d").drawImage(l,0,0,c,u);const f=m.toDataURL(r,s);o(f)},l.onerror=c=>n(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},i.onerror=d=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function ka(e=null){const t=document.getElementById("serviceModal"),a=p.serviceCategories||[],r=e?.duration||0,s=e?.bufferTime||0,o=a.map(w=>`<option value="${w.id}" ${e?.categoryId===w.id?"selected":""}>${w.name}</option>`).join("");t.innerHTML=`
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
                            ${o}
                        </select>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="serviceDurationMinutes" class="block text-sm font-medium text-gray-700">Duração (minutos)</label>
                            <input type="number" id="serviceDurationMinutes" min="0" value="${r}" class="mt-1 w-full p-2 border rounded-md" required>
                        </div>
                        <div>
                            <label for="serviceBufferTimeMinutes" class="block text-sm font-medium text-gray-700">Minutos Extras</label>
                            <input type="number" id="serviceBufferTimeMinutes" min="0" value="${s}" class="mt-1 w-full p-2 border rounded-md">
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
    </div>`,t.style.display="flex",t.addEventListener("click",async w=>{const E=w.target.closest("button[data-action]");if(!E)return;const B=E.dataset.action,M=E.dataset.id;if(B==="close-modal"&&(t.style.display="none"),B==="delete-service"){if(!M)return;if(t.style.display="none",await T("Apagar Serviço","Tem a certeza que deseja apagar este serviço?"))try{await ws(M),g("Sucesso","Serviço apagado com sucesso!","success"),await Ge()}catch(L){g("Erro",`Não foi possível apagar o serviço: ${L.message}`,"error")}else t.style.display="flex"}});const n=t.querySelectorAll(".tab-btn"),i=t.querySelectorAll(".tab-content");n.forEach(w=>{w.addEventListener("click",()=>{n.forEach(E=>{E.classList.remove("border-indigo-500","text-indigo-600"),E.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),w.classList.add("border-indigo-500","text-indigo-600"),w.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),i.forEach(E=>E.classList.add("hidden")),document.getElementById(`tab-content-${w.dataset.tab}`).classList.remove("hidden")})});const d=t.querySelectorAll('input[name="commissionType"]'),l=document.getElementById("defaultCommissionRateContainer"),c=document.getElementById("professionalCommissionsContainer");function u(){const w=t.querySelector('input[name="commissionType"]:checked').value;l&&(l.style.display=w==="default"?"block":"none"),c&&(c.style.display=w==="custom"?"block":"none")}d.forEach(w=>w.addEventListener("change",u));const m=document.getElementById("professionalCommissionsList");m&&(m.innerHTML=(p.professionals||[]).map(w=>{const E=e?.professionalCommissions?.[w.id]!==void 0,B=e?.professionalCommissions?.[w.id]||0;return`
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
            `}).join(""),m.querySelectorAll('input[type="checkbox"]').forEach(w=>{w.addEventListener("change",E=>{const B=E.target.closest(".professional-commission-row");B.querySelector('input[type="number"]').disabled=!E.target.checked,B.classList.toggle("bg-blue-50",E.target.checked)})})),u();const b=t.querySelector("#serviceForm"),f=t.querySelector("#servicePhotoInput"),v=t.querySelector("#servicePhotoPreview"),k=t.querySelector("#servicePhotoBase64"),$=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",S=e?.photo||"";t.querySelector("#servicePhotoButton").addEventListener("click",()=>f.click()),f.onchange=async()=>{const w=f.files[0];if(w){v.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const E=await Nr(w,800,800,"image/jpeg",.8),M=E.length*3/4,A=1e3*1024;if(M>A)throw new Error("A imagem é muito grande mesmo após a compressão.");v.src=E,k.value=E}catch(E){console.error("Erro ao processar imagem:",E),g("Erro de Imagem",E.message||"Não foi possível processar a imagem.","error"),v.src=$,k.value=S,f.value=""}}},b.addEventListener("submit",qr)}function he(){const e=document.getElementById("servicesList");if(!e)return;const t=document.getElementById("serviceSearchInput")?.value.toLowerCase()||"",a=document.getElementById("serviceCategoryFilter")?.value||"all",r=new Map((p.serviceCategories||[]).map(o=>[o.id,o.name]));let s=(p.services||[]).filter(Boolean);if(me!=="all"){const o=me==="active";s=s.filter(n=>n.active!==!1===o)}s=s.filter(o=>{const n=o.name.toLowerCase().includes(t),i=a==="all"||o.categoryId===a;return n&&i}),e.innerHTML="",s.length>0?s.forEach(o=>{const n=document.createElement("div"),i=JSON.stringify(o).replace(/'/g,"&apos;");n.className=`service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 ${o.active!==!1?"opacity-100":"opacity-50 bg-gray-100"} sm:flex-col`,n.dataset.action="edit-service",n.dataset.service=i;const d=o.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(o.name.charAt(0))}`,l=r.get(o.categoryId)||"N/A";n.innerHTML=`
                <img src="${d}" alt="Imagem de ${o.name}" class="w-20 h-20 object-cover flex-shrink-0 sm:w-full sm:h-24">
                
                <div class="p-3 flex flex-col flex-grow justify-between w-full">
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="text-sm font-bold text-gray-900 flex-1 text-left truncate pr-2">${o.name}</h3>
                        <label class="flex items-center cursor-pointer ml-2" data-action-stop-propagation="true">
                            <div class="relative">
                                <input type="checkbox" data-action="toggle-service-status" data-id="${o.id}" class="sr-only" ${o.active!==!1?"checked":""}>
                                <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                            </div>
                        </label>
                    </div>

                    <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${o.price.toFixed(2)}</p>

                    <div>
                        <div class="hidden sm:block">
                            <p class="text-xs text-gray-500 text-left mb-1 truncate">Categoria: ${l}</p>
                            <p class="text-xs text-gray-500 text-left">Duração: ${o.duration} min (+${o.bufferTime||0} min extra)</p>
                        </div>
                        <div class="flex justify-between items-center sm:hidden mt-2">
                            <p class="text-lg font-bold text-indigo-600 text-left">R$ ${o.price.toFixed(2)}</p>
                            <p class="text-xs text-gray-500 text-right">${o.duration} min</p>
                        </div>
                    </div>
                </div>`,e.appendChild(n)}):e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>'}function sa(){const e={active:0,inactive:0,total:0},t=(p.services||[]).filter(Boolean);t.forEach(n=>{n.active===!1?e.inactive++:e.active++}),e.total=t.length;const a=document.getElementById("indicator-total"),r=document.getElementById("indicator-active"),s=document.getElementById("indicator-inactive"),o=document.getElementById("indicator-popular");a&&(a.textContent=e.total),r&&(r.textContent=e.active),s&&(s.textContent=e.inactive),o&&(p.mostPopularService&&p.mostPopularService.name!=="N/A"?(o.textContent=p.mostPopularService.name,o.closest(".indicator-card").title=`${p.mostPopularService.name} (${p.mostPopularService.count} agendamentos)`):(o.textContent="N/A",o.closest(".indicator-card").title="Nenhum serviço agendado ainda"))}function Fr(){const e=document.getElementById("services-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("serviceCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(p.serviceCategories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${a.name}</option>`)),sa(),he()}function Rr(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="p-8 text-center">
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2">Em breve, aqui poderás ver relatórios detalhados sobre os teus serviços mais rentáveis, mais agendados e muito mais.</p>
        </div>
    `}async function Ge(){const e=document.getElementById("services-content-container");if(e){const t=e.querySelector(".loader");t&&(t.style.display="block")}try{const[t,a,r,s]=await Promise.all([Ie(p.establishmentId),_(p.establishmentId),xt(p.establishmentId,"services"),Es(p.establishmentId)]);p.services=(t||[]).filter(Boolean),p.professionals=(a||[]).filter(Boolean),p.serviceCategories=(r||[]).filter(Boolean),p.mostPopularService=s||{name:"N/A",count:0},p.services.forEach(o=>{o.active===void 0&&(o.active=!0)}),no(Me)}catch(t){e&&(e.innerHTML='<p class="text-red-500 col-span-full text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>'),g("Erro",`Não foi possível carregar os dados: ${t.message}`,"error")}}function no(e){if(document.getElementById("services-content-container")){if(Me===e&&document.getElementById("services-content-container").children.length>1){Me==="services"&&(sa(),he());return}Me=e,me="all",document.querySelectorAll("#services-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="services"?Fr():e==="reports"&&Rr()}}function Hr(){oe&&(de.removeEventListener("click",oe),de.removeEventListener("input",oe),de.removeEventListener("change",oe)),oe=async e=>{const t=e.target;if(t.closest('[data-action="toggle-service-status"]')){e.stopPropagation();const s=t.closest('[data-action="toggle-service-status"]'),o=s.dataset.id,n=s.checked;try{await ks(o,n);const i=p.services.findIndex(d=>d.id===o);i>-1&&(p.services[i].active=n),he(),sa()}catch(i){g("Erro",`Não foi possível atualizar o status: ${i.message}`,"error"),s.checked=!n,he()}return}const a=t.closest("button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]");if(t.id==="serviceSearchInput"||t.id==="serviceCategoryFilter"){he();return}if(!a)return;if(a.hasAttribute("data-view")){no(a.dataset.view);return}switch(a.dataset.action){case"new-service":ka();break;case"edit-service":const s=JSON.parse(a.dataset.service);ka(s);break;case"manage-categories":Ar();break;case"filter-service":const o=a.dataset.filterType;if(o==="popular")return;me=o==="total"?"all":o,document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(n=>{const i=n.dataset.filterType,l=i===me||i==="total"&&me==="all";n.classList.toggle("ring-2",l),n.classList.toggle("ring-indigo-500",l),n.classList.toggle("shadow-lg",l)}),he();break}},de.addEventListener("click",oe),de.addEventListener("input",oe),de.addEventListener("change",oe)}async function jr(){de.innerHTML=`
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
        </section>`,Hr();try{(!p.professionals||p.professionals.length===0)&&(p.professionals=await _(p.establishmentId)||[])}catch(e){console.error("Falha ao carregar profissionais:",e),g("Erro","Não foi possível carregar a lista de profissionais.","error"),p.professionals=[]}Me="services",me="all",await Ge()}const ie=document.getElementById("content");let se=null,Pe="products",Y="all";async function Or(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),r=a.value;if(r)try{await so({establishmentId:p.establishmentId,name:r},"products"),a.value="",g("Sucesso","Categoria de produto criada!","success"),await ra(),await Ye()}catch(s){g("Erro",`Não foi possível criar a categoria: ${s.message}`,"error")}}async function zr(e){if(await T("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await ro(e,"products"),g("Sucesso","Categoria de produto apagada.","success"),await ra(),await Ye()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function ra(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await xt(p.establishmentId,"products");p.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${a.name}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function Vr(){j({title:"Gerir Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",Or),t.addEventListener("click",r=>{const s=r.target.closest('button[data-action="delete-category"]');s&&zr(s.dataset.id)}))}ra()}async function Ur(e){if(!e)return;if(await T("Apagar Produto","Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida."))try{await tr(e),g("Sucesso","Produto apagado com sucesso!","success"),await Ye()}catch(a){g("Erro",`Não foi possível apagar o produto: ${a.message}`,"error")}}async function _r(e){const t=e.querySelector("#productId").value,a=parseInt(e.querySelector("#productCurrentStock").value),r=parseInt(e.querySelector("#productMinStock").value),s=parseInt(e.querySelector("#productMaxStock").value),o={establishmentId:p.establishmentId,name:e.querySelector("#productName").value,price:parseFloat(e.querySelector("#productPrice").value),commissionRate:parseFloat(e.querySelector("#productCommissionRate").value)||0,currentStock:isNaN(a)?0:a,minStock:isNaN(r)?0:r,maxStock:isNaN(s)?0:s,categoryId:e.querySelector("#productCategory").value||null,photo:e.querySelector("#productPhotoBase64").value};try{t?await er(t,o):await Ks(o),document.getElementById("productModal").style.display="none",g("Sucesso",`Produto ${t?"atualizado":"adicionado"} com sucesso!`,"success"),await Ye()}catch(n){throw new Error(n.message)}}function Ea(e,t=800,a=800,r="image/jpeg",s=.8){return new Promise((o,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=d=>{const l=new Image;l.onload=()=>{let c=l.width,u=l.height;c>u?c>t&&(u*=t/c,c=t):u>a&&(c*=a/u,u=a);const m=document.createElement("canvas");m.width=c,m.height=u,m.getContext("2d").drawImage(l,0,0,c,u);const f=m.toDataURL(r,s);o(f)},l.onerror=c=>n(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},i.onerror=d=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function Sa(e=null){const t=document.getElementById("productModal"),r=(p.categories||[]).map(f=>`<option value="${f.id}" ${e?.categoryId===f.id?"selected":""}>${f.name}</option>`).join("");t.innerHTML=`
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
                            <div class="form-group sm:col-span-2"><label for="productCategory">Categoria</label><select id="productCategory" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Sem categoria</option>${r}</select></div>
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
    </div>`;const s=t.querySelector("#productCategory"),o=t.querySelector("#productPhotoInput");t.querySelector("#productPhotoButton").addEventListener("click",()=>o.click()),s.innerHTML='<option value="">Sem categoria</option>'+(p.categories||[]).map(f=>`<option value="${f.id}" ${e?.categoryId===f.id?"selected":""}>${f.name}</option>`).join(""),e&&(s.value=e.categoryId||"");const n=t.querySelector("#productPhotoPreview"),i=t.querySelector("#productPhotoBase64"),d=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",l=e?.photo||"";o.onchange=async()=>{const f=o.files[0];if(f){n.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const v=await Ea(f,800,800,"image/jpeg",.8),$=v.length*3/4,S=1e3*1024;if($>S)throw new Error("A imagem é muito grande mesmo após a compressão.");n.src=v,i.value=v}catch(v){console.error("Erro ao processar imagem:",v),g("Erro de Imagem",v.message||"Não foi possível processar a imagem.","error"),n.src=d,i.value=l,o.value=""}}};const c=t.cloneNode(!0);t.parentNode.replaceChild(c,t),c.addEventListener("click",async f=>{const v=f.target.closest("button[data-action]");if(!v)return;const k=v.dataset.action,$=c.querySelector("#productId").value;if(k==="close-modal"&&(c.style.display="none"),k==="delete-product"){if(!$)return;c.style.display="none",await Ur($)}if(k==="save-product-modal"){const S=c.querySelector("#productForm");if(S){if(!S.querySelector("#productName").value||!S.querySelector("#productPrice").value){g("Erro","Nome e Preço de Venda são obrigatórios.","error");return}const w=v.closest('button[data-action="save-product-modal"]');w.disabled=!0,w.textContent="A salvar...";try{await _r(S)}catch(E){g("Erro",`Falha ao salvar: ${E.message}`,"error"),w.disabled=!1,w.textContent="Salvar Alterações"}}}if(k==="adjust-stock-modal"){f.preventDefault();const S=c.querySelector("#stockAdjustmentAmount"),w=c.querySelector("#stockAdjustmentReason"),E=parseInt(S.value,10),B=parseInt(v.dataset.change,10);if(!E||E<=0){g("Erro","Por favor, insira uma quantidade válida.","error");return}const M=E*B,A=w.value||(M>0?"Entrada manual":"Saída manual");try{await ar($,{change:M,reason:A});const L=p.products.findIndex(D=>D.id===$);if(L>-1){const D=p.products[L].currentStock+M;p.products[L].currentStock=D,c.querySelector("#currentStockDisplay").textContent=D,c.querySelector("#productCurrentStock").value=D,S.value="",w.value="",g("Sucesso","Estoque atualizado!","success"),na(),ze()}}catch(L){g("Erro de Stock",L.message,"error")}}});const u=c.querySelectorAll(".tab-btn"),m=c.querySelectorAll(".tab-content");u.forEach(f=>{f.addEventListener("click",v=>{v.preventDefault(),u.forEach(k=>{k.classList.remove("border-indigo-500","text-indigo-600"),k.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),f.classList.add("border-indigo-500","text-indigo-600"),f.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),m.forEach(k=>k.classList.add("hidden")),document.getElementById(`tab-content-${f.dataset.tab}`).classList.remove("hidden")})});const b=c.querySelector("#productPhotoInput");c.querySelector("#productPhotoButton").addEventListener("click",()=>b.click()),b.onchange=async()=>{const f=b.files[0];if(!f)return;const v=c.querySelector("#productPhotoPreview"),k=c.querySelector("#productPhotoBase64");v.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const $=await Ea(f,800,800,"image/jpeg",.8),w=$.length*3/4,E=1e3*1024;if(w>E)throw new Error("A imagem é muito grande mesmo após a compressão.");v.src=$,k.value=$}catch($){console.error("Erro ao processar imagem:",$),g("Erro de Imagem",$.message||"Não foi possível processar a imagem.","error"),v.src=d,k.value=l,b.value=""}},c.style.display="flex"}function Jr(){const e=document.getElementById("products-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("productCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(p.categories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${a.name}</option>`)),na(),ze()}function Wr(){const e=document.getElementById("products-content-container"),t=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const r=a.toISOString().split("T")[0];e.innerHTML=`
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
        </div>`;const s=document.getElementById("productFilterReport"),o=document.getElementById("categoryFilterReport");s&&p.products&&(s.innerHTML+=p.products.map(n=>`<option value="${n.id}">${n.name}</option>`).join("")),o&&p.categories&&(o.innerHTML+=p.categories.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""))}async function Gr(){const e=document.getElementById("report-results");e.innerHTML='<div class="loader mx-auto my-8"></div>';const t={startDate:document.getElementById("reportStartDate").value,endDate:document.getElementById("reportEndDate").value,productId:document.getElementById("productFilterReport").value,categoryId:document.getElementById("categoryFilterReport").value};try{const a=await or(t);if(a.length===0){e.innerHTML=`
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
                                <td class="px-4 py-3 whitespace-nowrap font-semibold text-gray-800">${o.productName}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center font-bold ${o.change>0?"text-green-600":"text-red-600"}">
                                    ${o.change>0?"+":""}${o.change}
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-500">${o.oldStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-800 font-medium">${o.newStock}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600 truncate max-w-xs" title="${o.reason}">${o.reason}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-600">${o.user}</td>
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
                                <h4 class="font-bold text-gray-800 text-base line-clamp-1">${o.productName}</h4>
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
                            <span class="text-gray-600 truncate max-w-[60%] font-medium" title="${o.reason}">
                                ${o.reason||"Sem motivo"}
                            </span>
                            <span class="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                ${o.user||"Sistema"}
                            </span>
                        </div>
                    </div>
                `).join("")}
            </div>`;e.innerHTML=r+s}catch(a){g("Erro",`Não foi possível gerar o relatório: ${a.message}`,"error"),e.innerHTML=`<div class="bg-white border border-red-200 rounded-lg p-8 text-center text-red-500">${a.message}</div>`}}function na(){const e={ok:0,near_min:0,at_min:0,empty:0};if(!p.products)return;p.products.forEach(o=>{if(!o)return;const n=o.currentStock,i=o.minStock;n<=0?e.empty++:i>0&&n<=i?e.at_min++:i>0&&n<=i*1.2?e.near_min++:e.ok++});const t=document.getElementById("indicator-ok"),a=document.getElementById("indicator-near-min"),r=document.getElementById("indicator-at-min"),s=document.getElementById("indicator-empty");t&&(t.textContent=e.ok),a&&(a.textContent=e.near_min),r&&(r.textContent=e.at_min),s&&(s.textContent=e.empty)}function ze(){const e=document.getElementById("productsList");if(!e)return;const t=document.getElementById("productSearchInput")?.value.toLowerCase()||"",a=document.getElementById("productCategoryFilter")?.value||"all",r=new Map((p.categories||[]).map(o=>[o.id,o.name]));let s=(p.products||[]).filter(Boolean);Y!=="all"&&(s=s.filter(o=>{const n=o.currentStock,i=o.minStock;switch(Y){case"ok":return n>0&&(i===0||n>i*1.2);case"near_min":return i>0&&n>i&&n<=i*1.2;case"at_min":return i>0&&n>0&&n<=i;case"empty":return n<=0;default:return!0}})),s=s.filter(o=>{const n=o.name.toLowerCase().includes(t),i=a==="all"||o.categoryId===a;return n&&i}),e.innerHTML="",s.length>0?(e.className="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 sm:space-y-0",s.forEach(o=>{const n=document.createElement("div"),i=JSON.stringify(o).replace(/'/g,"&apos;");n.className=`product-card bg-white rounded-lg shadow-md flex items-center gap-3 p-3 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 
                              sm:flex-col sm:p-0 sm:items-stretch sm:gap-0`,n.dataset.action="edit-product",n.dataset.product=i;const d=o.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(o.name.charAt(0))}`,l=r.get(o.categoryId)||"N/A";let c="",u="text-gray-500";const m=o.currentStock,b=o.minStock;m<=0?(c='<span class="text-xs font-semibold text-red-600">Esgotado</span>',u="text-red-600 font-semibold"):b>0&&m<=b?(c='<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>',u="text-orange-600 font-semibold"):b>0&&m<=b*1.2?(c='<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>',u="text-blue-600 font-semibold"):(c='<span class="text-xs font-semibold text-green-600">Em Estoque</span>',u="text-green-600 font-semibold"),n.innerHTML=`
                <img src="${d}" alt="Imagem de ${o.name}" class="w-16 h-16 rounded-md object-cover flex-shrink-0 sm:w-full sm:h-24 sm:rounded-b-none">
                
                <div class="flex-1 sm:p-3 sm:flex sm:flex-col sm:flex-grow">
                    <div class="sm:flex-grow">
                        <div class="flex justify-between items-start mb-1 gap-2">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${o.name}</h3>
                            <div class="hidden sm:block">${c}</div>
                        </div>
                        
                        <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${o.price.toFixed(2)}</p>
                        
                        <p class="text-xs text-gray-500 text-left mb-2 hidden sm:block">Categoria: ${l}</p>
                    </div>

                    <div class="flex justify-between items-center mt-2 sm:mt-0">
                        <p class="text-lg font-bold text-indigo-600 text-left sm:hidden">R$ ${o.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-right sm:text-left">
                            Estoque: <span class="font-bold text-base ${u}">${o.currentStock}</span>
                        </p>
                    </div>
                </div>`,e.appendChild(n)})):(e.className="",e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>')}async function Ye(){const e=document.getElementById("products-content-container");e&&(e.innerHTML='<div class="loader col-span-full mx-auto my-8"></div>');try{const[t,a]=await Promise.all([ea(p.establishmentId),xt(p.establishmentId,"products")]);p.products=(t||[]).filter(Boolean),p.categories=(a||[]).filter(Boolean),io(Pe)}catch(t){e&&(e.innerHTML=`<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados: ${t.message}</p>`)}}function io(e){if(document.getElementById("products-content-container")){if(Pe===e&&document.getElementById("products-content-container").children.length>1){Pe==="products"&&(na(),ze());return}Pe=e,Y="all",document.querySelectorAll("#products-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="products"?Jr():e==="movements"&&Wr()}}async function Yr(){ie.innerHTML=`
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
        </section>`,se&&(ie.removeEventListener("click",se),ie.removeEventListener("input",se),ie.removeEventListener("change",se)),se=async e=>{const t=e.target;if(t.id==="productSearchInput"||t.id==="productCategoryFilter"){ze();return}const a=e.target.closest("button[data-action], button[data-view], .indicator-card[data-action], .product-card[data-action]");if(!a||e.target.closest('[data-action-stop-propagation="true"]'))return;if(a.hasAttribute("data-view")){io(a.dataset.view);return}switch(a.dataset.action){case"new-product":Sa();break;case"edit-product":Sa(JSON.parse(a.dataset.product));break;case"manage-product-categories":Vr();break;case"generate-report":await Gr();break;case"filter-stock":const s=a.dataset.filterType;Y=Y===s?"all":s,document.querySelectorAll(".indicator-card").forEach(o=>{o.classList.toggle("ring-2",o.dataset.filterType===Y),o.classList.toggle("ring-indigo-500",o.dataset.filterType===Y),o.classList.toggle("shadow-lg",o.dataset.filterType===Y)}),ze();break}},ie.addEventListener("click",se),ie.addEventListener("input",se),ie.addEventListener("change",se),Pe="products",Y="all",await Ye()}const Et=document.getElementById("content"),$a={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let K=new Set,Ke=null,ye=null;function Xr(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function Qr(e){return e.length===0?'<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>':e.map(t=>{const a=t.status==="inactive",r=t.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,s=JSON.stringify(t).replace(/'/g,"&apos;");return`
            <div class="professional-card bg-white rounded-lg shadow-md flex items-center gap-4 p-3 cursor-pointer transition-transform transform hover:shadow-lg hover:bg-gray-50
                        sm:flex-col sm:items-stretch sm:p-0 sm:gap-0 ${a?"opacity-50 bg-gray-100":""}" 
                 data-action="open-professional-modal" data-professional='${s}'>
                
                <img src="${r}" alt="Foto de ${t.name}" class="w-16 h-16 rounded-full object-cover flex-shrink-0
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
            </div>`}).join("")}function St(){const e=document.getElementById("genericModal");e.style.display="none",ye&&e.removeEventListener("click",ye)}async function Zr(e){const t=document.getElementById("genericModal"),a=e.id?e:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},r=p.services||await Ie(p.establishmentId),s=p.professionals||await _(p.establishmentId),o=`
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
        </div>`;t.innerHTML=o,t.style.display="flex",Kr(a,r),tn(a),an(a,s),sn(a)}function Kr(e,t){const a=document.getElementById("professionalForm"),r=e.dob?e.dob.split("/"):["",""],s=Array.from({length:12},(m,b)=>{const f=b+1,v=f==r[1]?"selected":"",k=new Date(0,b).toLocaleString("pt-BR",{month:"long"});return`<option value="${f}" ${v}>${k.charAt(0).toUpperCase()+k.slice(1)}</option>`}).join(""),o=e.status||"active";a.innerHTML=`
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
                        <option value="active" ${o!=="inactive"?"selected":""}>Ativo</option>
                        <option value="inactive" ${o==="inactive"?"selected":""}>Inativo</option>
                    </select>
                </div>
            </div>

            <div class="md:col-span-2 space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="form-group"><label for="profName">Nome</label><input type="text" id="profName" value="${e.name||""}" required class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profSpecialty">Especialidade</label><input type="text" id="profSpecialty" value="${e.specialty||""}" required class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profPhone">Número de telefone</label><input type="tel" id="profPhone" value="${e.phone||""}" class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profDobDay">Aniversário (Dia)</label><input type="number" id="profDobDay" value="${r[0]}" min="1" max="31" class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profDobMonth">Aniversário (Mês)</label><select id="profDobMonth" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Selecione...</option>${s}</select></div>
                    <div class="form-group"><label for="profOrderOnAgenda">Ordem na agenda</label><input type="number" id="profOrderOnAgenda" value="${e.orderOnAgenda||"1"}" min="1" class="mt-1 w-full p-2 border rounded-md"></div>
                </div>
                 <div class="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div class="form-group"><label for="profCommission">Recebe comissão?</label><select id="profCommission" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="sim" ${e.receivesCommission?"selected":""}>Sim</option><option value="nao" ${e.receivesCommission?"":"selected"}>Não</option></select></div>
                    <div class="form-group"><label for="profShowOnAgenda">Mostrar na agenda</label><select id="profShowOnAgenda" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="sim" ${e.showOnAgenda!==!1?"selected":""}>Sim</option><option value="nao" ${e.showOnAgenda===!1?"selected":""}>Não</option></select></div>
                </div>
            </div>
        </div>

        <div><label class="block text-sm font-medium text-gray-700">Serviços Realizados</label><div id="profServicesContainer" class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-md bg-white max-h-48 overflow-y-auto">${t.map(m=>`<label class="flex items-center space-x-2"><input type="checkbox" value="${m.id}" class="rounded" ${e.services?.includes(m.id)?"checked":""}><span>${m.name}</span></label>`).join("")}</div></div>
        <div class="form-group"><label for="profNotes">Observações</label><textarea id="profNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${e.notes||""}</textarea></div>`;const n=document.getElementById("profPhotoInput"),i=document.getElementById("profPhotoButton"),d=document.getElementById("profPhotoPreview"),l=document.getElementById("profPhotoBase64"),c=e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,u=e.photo||"";i&&i.addEventListener("click",()=>n.click()),n&&(n.onchange=async()=>{const m=n.files[0];if(m){d.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const b=await en(m,800,800,"image/jpeg",.8);d.src=b,l.value=b}catch(b){g("Erro de Imagem",b.message||"Não foi possível processar a imagem.","error"),d.src=c,l.value=u,n.value=""}}})}function en(e,t=800,a=800,r="image/jpeg",s=.8){return new Promise((o,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=d=>{const l=new Image;l.onload=()=>{let c=l.width,u=l.height;c>u?c>t&&(u*=t/c,c=t):u>a&&(c*=a/u,u=a);const m=document.createElement("canvas");m.width=c,m.height=u,m.getContext("2d").drawImage(l,0,0,c,u);const f=m.toDataURL(r,s);o(f)},l.onerror=c=>n(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},i.onerror=d=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function tn(e){const t=document.getElementById("jornada");t.innerHTML='<div><h3 class="text-xl font-semibold mb-4">Jornada de Trabalho Semanal</h3><p class="text-sm text-gray-600 mb-4">Defina os horários de trabalho padrão para este profissional.</p><div id="profScheduleContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div></div>',on(t.querySelector("#profScheduleContainer"),e.workingHours||{})}async function an(e,t){const a=document.getElementById("bloqueios");a.innerHTML=`
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h3 class="text-xl font-semibold mb-4">Lançamento de Bloqueios</h3>
                <form id="batchBlockageForm" class="p-4 bg-white rounded-lg shadow-inner space-y-3 mb-4">
                    <h4 class="font-semibold text-gray-800">Selecione os Profissionais</h4>
                    <div id="batchProfSelectionContainer" class="max-h-32 overflow-y-auto p-2 border rounded-md space-y-2">
                        ${t.map(o=>`<label class="flex items-center"><input type="checkbox" name="batch-professionals" value="${o.id}" class="rounded mr-2" ${o.id===e.id?"checked":""}><span>${o.name}</span></label>`).join("")}
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
        </div>`;const r=document.getElementById("batchBlockageForm");r&&r.addEventListener("submit",async o=>{o.preventDefault();const n=Array.from(o.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(b=>b.value);if(n.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const i=o.target.batchBlockageStartDate.value,d=o.target.batchBlockageEndDate.value||i,l=o.target.batchBlockageStartTime.value,c=o.target.batchBlockageEndTime.value,u=o.target.batchBlockageReason.value;if(!i||!l||!c)return g("Atenção","Preencha Data de Início, Início e Fim.","error");const m=n.map(b=>{const f={professionalId:b,establishmentId:p.establishmentId,startTime:new Date(`${i}T${l}`).toISOString(),endTime:new Date(`${d}T${c}`).toISOString(),reason:u};return vt(f)});try{await Promise.all(m),g("Sucesso!",`${n.length} bloqueios foram criados.`);const b=document.getElementById("prof-blockages-filter").value;Ae(e.id,b)}catch(b){g("Erro",b.message,"error")}}),document.getElementById("prof-blockages-filter").addEventListener("change",o=>Ae(e.id,o.target.value)),await Ae(e.id,"future")}function on(e,t){e.innerHTML=Object.keys($a).map(a=>{const r=t[a]||{},s=r.active!==!1;return`
            <div class="day-schedule-card p-3 rounded-lg ${s?"bg-white":"bg-gray-100 disabled"} border">
                 <div class="flex justify-between items-center"><span class="font-semibold text-gray-800">${$a[a]}</span><label class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" data-day="${a}" data-field="active" class="sr-only" ${s?"checked":""}><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div></label></div>
                <div class="time-inputs grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><label>Início:</label><input type="time" data-day="${a}" data-field="start" value="${r.start||"09:00"}" class="w-full p-1 border rounded" ${s?"":"disabled"}></div>
                    <div><label>Fim:</label><input type="time" data-day="${a}" data-field="end" value="${r.end||"18:00"}" class="w-full p-1 border rounded" ${s?"":"disabled"}></div>
                    <div><label>Intervalo:</label><input type="time" data-day="${a}" data-field="breakStart" value="${r.breakStart||"12:00"}" class="w-full p-1 border rounded" ${s?"":"disabled"}></div>
                    <div><label>Fim Int.:</label><input type="time" data-day="${a}" data-field="breakEnd" value="${r.breakEnd||"13:00"}" class="w-full p-1 border rounded" ${s?"":"disabled"}></div>
                </div>
            </div>`}).join(""),e.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",r=>{const s=r.target.closest(".day-schedule-card"),o=!r.target.checked;s.classList.toggle("bg-white",!o),s.classList.toggle("bg-gray-100",o),s.classList.toggle("disabled",o),s.querySelectorAll(".time-inputs input").forEach(n=>n.disabled=o)})})}async function Ae(e,t="future"){const a=document.getElementById("blockagesList");if(a){a.innerHTML='<div class="loader mx-auto"></div>';try{const r=new Date;let s,o;t==="history"?(o=new Date,s=new Date,s.setFullYear(s.getFullYear()-2)):(s=new Date,o=new Date,o.setFullYear(o.getFullYear()+2));let i=(await bt(p.establishmentId,s.toISOString(),o.toISOString(),e)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));t==="history"?i=i.filter(l=>l.endTime<r).sort((l,c)=>c.startTime-l.startTime):i=i.filter(l=>l.endTime>=r).sort((l,c)=>l.startTime-c.startTime);const d=i.reduce((l,c)=>{const u=c.reason||"Sem motivo";return l[u]||(l[u]=[]),l[u].push(c),l},{});if(Object.keys(d).length===0){a.innerHTML=`<p class="text-center text-gray-500 text-sm py-4">Nenhum bloqueio ${t==="history"?"no histórico":"futuro"}.</p>`;return}a.innerHTML=Object.entries(d).map(([l,c])=>`
            <div class="bg-gray-100 rounded-lg p-3 my-2 space-y-2">
                <div class="flex justify-between items-center pb-2 border-b">
                    <h4 class="font-bold text-gray-700">${l} (${c.length})</h4>
                    ${c.length>1?`<button data-action="batch-delete-blockage" data-ids='${JSON.stringify(c.map(u=>u.id))}' class="text-xs text-red-600 font-semibold hover:underline">Apagar Todos (${c.length})</button>`:""}
                </div>
                ${c.map(u=>`
                    <div class="flex justify-between items-center bg-white p-2 rounded-md text-sm border">
                        <p class="text-xs text-gray-500">
                           ${u.startTime.toLocaleDateString("pt-BR")} 
                           <span class="text-gray-400 mx-1">|</span> 
                           ${u.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${u.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}
                        </p>
                        <button data-action="delete-blockage" data-id="${u.id}" class="text-red-500 p-1 rounded-full hover:bg-red-100" title="Apagar">&times;</button>
                    </div>
                `).join("")}
            </div>
        `).join("")}catch(r){a.innerHTML=`<p class="text-red-500">${r.message}</p>`}}}function sn(e){const t=document.getElementById("genericModal");ye&&t.removeEventListener("click",ye),ye=async a=>{const r=a.target.closest("button[data-action]");if(!r){const o=a.target.closest(".tab-link");o&&(t.querySelectorAll(".tab-link").forEach(n=>n.classList.remove("active")),o.classList.add("active"),t.querySelectorAll(".tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(o.dataset.tab).classList.remove("hidden"));return}const s=r.dataset.action;switch(a.stopPropagation(),s){case"close-modal":St();break;case"delete-professional":const o=r.dataset.id;if(await T("Excluir Profissional",`Tem certeza que deseja excluir ${e.name}? Esta ação não pode ser desfeita.`))try{await os(o),g("Sucesso!","Profissional excluído.","success"),St(),pt()}catch(v){g("Erro",`Não foi possível excluir: ${v.message}`,"error")}break;case"save-professional":const i=document.getElementById("professionalForm"),d=r,l=document.getElementById("profScheduleContainer"),c=Array.from(i.querySelectorAll("#profServicesContainer input:checked")).map(v=>v.value),u={};l&&l.querySelectorAll(".day-schedule-card").forEach(v=>{const k=v.querySelector('[data-field="active"]').dataset.day;u[k]={active:v.querySelector('[data-field="active"]').checked,start:v.querySelector('[data-field="start"]').value,end:v.querySelector('[data-field="end"]').value,breakStart:v.querySelector('[data-field="breakStart"]').value,breakEnd:v.querySelector('[data-field="breakEnd"]').value}});const m={...e,id:i.querySelector("#professionalId").value||void 0,name:i.querySelector("#profName").value,specialty:i.querySelector("#profSpecialty").value,photo:i.querySelector("#profPhotoBase64").value,services:c,workingHours:u,phone:i.querySelector("#profPhone").value,dob:`${i.querySelector("#profDobDay").value}/${i.querySelector("#profDobMonth").value}`,receivesCommission:i.querySelector("#profCommission").value==="sim",showOnAgenda:i.querySelector("#profShowOnAgenda").value==="sim",orderOnAgenda:parseInt(i.querySelector("#profOrderOnAgenda").value)||1,notes:i.querySelector("#profNotes").value,status:i.querySelector("#profStatus").value};d.disabled=!0,d.textContent="A salvar...";try{m.id?(await as(m.id,m),g("Sucesso!","Profissional atualizado.","success")):(delete m.id,await ts(m),g("Sucesso!","Profissional criado.","success")),St(),pt()}catch(v){g("Erro",v.message,"error"),d.disabled=!1,d.textContent="Salvar"}break;case"delete-blockage":const b=r.dataset.id;if(await T("Apagar Bloqueio","Tem certeza?"))try{await Qt(b),g("Bloqueio removido.","success");const v=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";Ae(e.id,v)}catch(v){g("Erro",v.message,"error")}break;case"batch-delete-blockage":const f=JSON.parse(r.dataset.ids);if(await T("Apagar em Lote",`Tem certeza que deseja apagar ${f.length} bloqueios com este motivo?`))try{await Xa(f),g("Bloqueios removidos.","success");const v=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";Ae(e.id,v)}catch(v){g("Erro",v.message,"error")}break}},t.addEventListener("click",ye)}function jt(){const e=document.getElementById("batch-actions-container"),t=document.getElementById("selected-count");!e||!t||(K.size>0?(t.textContent=`${K.size} selecionado(s)`,e.classList.remove("hidden")):e.classList.add("hidden"))}function rn(){T("Excluir em Lote",`Tem certeza que deseja excluir ${K.size} profissionais? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{await(void 0)(Array.from(K)),g("Sucesso!",`${K.size} profissionais foram excluídos.`,"success"),K.clear(),jt(),pt()}catch(t){g("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}function Le(){const e=document.getElementById("professionalsList");if(!e)return;if(!p.professionals){e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Xr();return}const t=document.getElementById("showInactiveProfToggle").checked,a=document.getElementById("profSearchInput").value.toLowerCase(),r=p.professionals.filter(s=>{const o=s.name.toLowerCase().includes(a),n=t||s.status!=="inactive";return o&&n});e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Qr(r)}async function pt(){K.clear(),Et.innerHTML=`
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
        </section>`,Ke&&Et.removeEventListener("click",Ke),Ke=t=>{const a=t.target.closest('[data-action="open-professional-modal"]'),r=t.target.closest('[data-action="batch-delete"]');if(a){t.preventDefault();let o={};if(a.dataset.professional)try{o=JSON.parse(a.dataset.professional)}catch(n){console.error("Erro ao fazer parse do professional data:",n);return}Zr(o);return}if(r){rn();return}const s=t.target.closest(".professional-checkbox");if(s){const o=s.dataset.id;s.checked?K.add(o):K.delete(o),Le(),jt();return}},Et.addEventListener("click",Ke),document.getElementById("profSearchInput").addEventListener("input",Le),document.getElementById("showInactiveProfToggle").addEventListener("change",Le);const e=document.getElementById("professionalsList");p.professionals=null,p.services=null,Le();try{const[t,a]=await Promise.all([_(p.establishmentId),Ie(p.establishmentId)]);p.professionals=t,p.services=a,Le(),jt()}catch{e.innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar dados da página.</p>'}}const $t=document.getElementById("content");let Q=[],qe={},N=null,Ot="list",O="all",zt="O Estabelecimento";const nn=(e,t)=>`Olá, ${e}! Nós da ${t} desejamos a você um Feliz Aniversário! Esperamos que seu dia seja maravilhoso. Venha comemorar conosco! 🎉🎂`,ln=(e,t)=>`Oi, ${e}! Faz um tempo que não te vemos aqui no(a) ${t}. Sentimos sua falta! Temos novidades/ofertas especiais para você. Que tal agendar seu horário?`,dn=[{value:30,label:"30 dias"},{value:60,label:"60 dias"},{value:90,label:"90 dias"},{value:120,label:"120 dias"}];function cn(){return Math.floor(Math.random()*140)+10}function un(e){if(!e.dob)return!1;const t=e.dob.split("/");if(t.length!==2)return!1;const a=new Date,r=a.getDate(),s=a.getMonth()+1,o=parseInt(t[0],10),n=parseInt(t[1],10);return o===r&&n===s}const mn=[{value:99,label:"Aniversariantes de Hoje"},{value:0,label:"Todos os meses (com DOB)"},{value:1,label:"Janeiro"},{value:2,label:"Fevereiro"},{value:3,label:"Março"},{value:4,label:"Abril"},{value:5,label:"Maio"},{value:6,label:"Junho"},{value:7,label:"Julho"},{value:8,label:"Agosto"},{value:9,label:"Setembro"},{value:10,label:"Outubro"},{value:11,label:"Novembro"},{value:12,label:"Dezembro"}];function Ia(){return mn.map(e=>{let t="";return e.value===99&&(t="selected"),`<option value="${e.value}" ${t}>${e.label}</option>`}).join("")}function Ca(){return dn.map(e=>{const t=e.value===90?"selected":"";return`<option value="${e.value}" ${t}>${e.label}</option>`}).join("")}function pn(e,t){const a=`w-5 h-5 ${t} mr-2`;switch(e){case"cadastro":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`;case"agendamentos":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`;case"historico":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2h-2.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-1.414 0l-1.414-1.414A1 1 0 009.586 17H7a2 2 0 01-2-2v-2a2 2 0 012-2h12z" /></svg>`;case"fidelidade":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.5a9.5 9.5 0 1019 0 9.5 9.5 0 00-19 0z" /></svg>`;default:return""}}function gn(e="cadastro"){const t=[{id:"cadastro",label:"Cadastro"},{id:"agendamentos",label:"Próximos Agend."},{id:"historico",label:"Histórico"},{id:"fidelidade",label:"Fidelidade"}],a=document.getElementById("client-detail-tabs");a&&(a.innerHTML=t.map(r=>{const s=e===r.id,o=s?"text-indigo-600":"text-gray-500";return`
            <button data-tab="${r.id}" class="tab-btn whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors flex items-center ${s?"border-indigo-500 text-indigo-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}">
                ${pn(r.id,o)}
                ${r.label}
            </button>
        `}).join(""),a.querySelectorAll(".tab-btn").forEach(r=>{r.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),Vt(r.dataset.tab)})}))}async function Vt(e){gn(e);const t=document.getElementById("client-detail-content");if(t)switch(t.innerHTML='<form id="client-form" class="p-6 space-y-4"><div class="loader mx-auto my-8"></div></form>',e){case"cadastro":t.innerHTML=fn(N);break;case"agendamentos":case"historico":try{const r=await Is(p.establishmentId,N.name,N.phone);t.innerHTML=bn(r,e)}catch(r){console.error("Erro ao carregar histórico do cliente:",r),t.innerHTML=`<form id="client-form" class="p-6 space-y-4"><p class="text-center text-red-500">Erro ao carregar o histórico: ${r.message}</p></form>`}break;case"fidelidade":const a=await Cs(p.establishmentId,N.name,N.phone);t.innerHTML=vn(N,a);break;default:t.innerHTML='<form id="client-form" class="p-6 space-y-4"><p class="p-4 text-center text-gray-500">Secção não implementada.</p></form>'}}function fn(e){const t=e?.dob?e.dob.split("/"):["",""];return`
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
    `}function bn(e,t){const a=t==="agendamentos"?"Próximos Agendamentos":"Histórico de Visitas",r=t==="agendamentos"?"Nenhum agendamento futuro.":"Nenhum histórico de visitas.",s=new Date;s.setHours(0,0,0,0);const o=t==="agendamentos",n=(e||[]).filter(i=>{const d=new Date(i.date);return o?d>=s:d<s});return n.sort((i,d)=>o?new Date(i.date).getTime()-new Date(d.date).getTime():new Date(d.date).getTime()-new Date(i.date).getTime()),n.length===0?`<form id="client-form" class="p-6 space-y-4"><p class="p-4 text-center text-gray-500">${r}</p></form>`:`
        <form id="client-form" class="p-6 space-y-4">
            <div class="space-y-3 max-h-96 overflow-y-auto">
                <h4 class="font-semibold text-lg mb-2">${a}</h4>
                ${n.map(i=>{const d=new Date(i.date)<s;return`
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
    `}function vn(e,t){const a=e.loyaltyPoints||0;let r='<p class="text-sm text-gray-500">O programa de fidelidade não está ativo.</p>';qe.enabled&&qe.tiers&&(r=qe.tiers.map(o=>{const n=a>=o.points;return`
                <div class="flex justify-between items-center p-3 rounded-lg ${n?"bg-green-50":"bg-gray-100"}">
                    <div>
                        <p class="font-semibold ${n?"text-green-800":"text-gray-800"}">${o.reward}</p>
                        <p class="text-sm ${n?"text-green-600":"text-gray-500"}">${o.points} Pontos</p>
                    </div>
                    <button data-action="redeem-reward" data-points="${o.points}" data-reward="${o.reward}" ${n?"":"disabled"}
                        class="py-1 px-3 text-sm font-semibold rounded-lg ${n?"bg-green-600 text-white hover:bg-green-700":"bg-gray-300 text-gray-500 cursor-not-allowed"}">
                        Resgatar
                    </button>
                </div>`}).join(""));const s=t.length>0?t.map(o=>`
        <div class="text-sm flex justify-between items-center">
            <div>
                <p class="font-medium text-gray-700">${o.type==="earn"?"Ganhou por visita":`Resgatou: ${o.reward}`}</p>
                <p class="text-xs text-gray-500">${o.timestamp}</p>
            </div>
            <p class="font-bold ${o.type==="earn"?"text-green-600":"text-red-600"}">${o.points} pts</p>
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
                    <div class="space-y-2 max-h-64 overflow-y-auto">${r}</div>
                </div>
                <div>
                    <h4 class="font-semibold text-lg mb-2">Histórico de Pontos</h4>
                    <div class="space-y-2 max-h-80 overflow-y-auto">${s}</div>
                </div>
            </div>
        </form>
    `}function Ut(e){N=e,Ot="detail";const t=e!==null,a=t?"Editar Cliente":"Adicionar Cliente",r=`
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
    `,s=window.innerWidth<768,o=s?"max-w-full":"max-w-3xl";if(j({title:a,contentHTML:r,maxWidth:o}),s){const c=document.getElementById("genericModal");if(c){const u=c.querySelector(`.${o.replace(":","\\:")}`);u&&(u.style.height="auto",u.style.maxHeight="85vh",u.style.borderRadius="1rem")}}const n=document.getElementById("genericModal");n&&n.addEventListener("click",async c=>{const u=c.target.closest("[data-action]");if(!u)return;switch(u.dataset.action){case"redeem-reward":{const b=parseInt(u.dataset.points,10),f=u.dataset.reward;if(await T("Confirmar Resgate",`Deseja resgatar "${f}" por ${b} pontos?`))try{await Ls(p.establishmentId,N.name,N.phone,{points:b,reward:f}),g("Prémio resgatado com sucesso!","success"),Q=await Je(p.establishmentId);const $=Q.find(S=>S.id===N.id);$&&(N=$),Vt("fidelidade")}catch(k){g(`Erro ao resgatar: ${k.message}`,"error")}break}case"open-comanda-from-history":{const b=u.dataset.appointmentId;b&&(document.getElementById("genericModal").style.display="none",F("comandas-section",{selectedAppointmentId:b,initialFilter:"finalizada"}));break}case"view-appointment":{const b=u.dataset.appointmentId,f=u.dataset.appointmentDate;b&&f&&(document.getElementById("genericModal").style.display="none",F("agenda-section",{targetDate:f,scrollToAppointmentId:b}));break}}}),Vt("cadastro");const i=document.getElementById("client-form");i&&i.addEventListener("submit",c=>{c.preventDefault(),hn()});const d=document.getElementById("cancelDetailViewBtn");d&&d.addEventListener("click",c=>{c.preventDefault(),document.getElementById("genericModal").style.display="none",wt()});const l=document.getElementById("deleteClientBtn");l&&l.addEventListener("click",async()=>{await yn()})}async function hn(){const e=document.getElementById("client-form");if(!e)return;const t=e.querySelector("#clientId").value,a={name:e.querySelector("#clientName").value,email:e.querySelector("#clientEmail").value,phone:e.querySelector("#clientPhone").value,dob:`${e.querySelector("#clientDobDay").value}/${e.querySelector("#clientDobMonth").value}`,notes:e.querySelector("#clientNotes").value,establishmentId:p.establishmentId};if(!a.name||!a.phone){g("Erro","Nome e Telefone são obrigatórios.","error");return}try{t?(await Ss(t,a),g("Sucesso","Cliente atualizado com sucesso!","success")):(await Zt(a),g("Sucesso","Cliente cadastrado com sucesso!","success")),document.getElementById("genericModal").style.display="none",await wt()}catch(r){g("Erro",`Não foi possível salvar: ${r.message}`,"error")}}async function yn(){if(!N||!N.id)return;if(await T("Excluir Cliente",`Tem certeza que deseja excluir ${N.name}? Esta ação é irreversível.`))try{await $s(N.id),g("Sucesso","Cliente excluído.","success"),document.getElementById("genericModal").style.display="none",await wt()}catch(t){g("Erro",`Não foi possível excluir: ${t.message}`,"error")}}function it(e,t){const a=document.getElementById("clientsList");if(a)if(a.innerHTML="",document.getElementById("client-count").textContent=`${e.length} cliente${e.length!==1?"s":""} | Total: ${t}`,e.length>0){const r=O==="inactive",s=O==="birthdays";e.forEach(o=>{const n=document.createElement("div");n.className="client-card bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer",n.dataset.clientId=o.id;const i=o.loyaltyPoints||0,d=qe.enabled?`${i} pts`:`R$ ${i.toFixed(2)}`;let l="";const u=`https://wa.me/55${o.phone?o.phone.replace(/\D/g,""):""}?text=`;if(r){const m=encodeURIComponent(ln(o.name,zt));l=`
                    <a href="${u+m}" target="_blank" title="Enviar Mensagem de Recuperação (WhatsApp)" class="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full flex-shrink-0 ml-2 shadow-md">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                    </a>`}else if(s&&un(o)){const b=encodeURIComponent(nn(o.name,zt));l=`
                        <a href="${u+b}" target="_blank" title="Enviar Parabéns por WhatsApp" class="text-white bg-green-500 hover:bg-green-600 p-2 rounded-full flex-shrink-0 ml-2 shadow-md">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.333 0 2-1 2-2s-.667-2-2-2-2 1-2 2 .667 2 2 2zM2 15h20M7 15l2 6h6l2-6M7 15a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2"/></svg>
                        </a>`}n.innerHTML=`
                <div class="flex items-center mb-3">
                    <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl flex-shrink-0">
                        ${o.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="ml-4 flex-grow min-w-0">
                        <p class="font-bold text-gray-800 truncate">${o.name}</p>
                        <p class="text-sm text-gray-500 md:hidden">${o.phone}</p>
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
                        <span class="text-gray-600 ml-1">${o.phone}</span>
                    </div>
                    <button class="text-gray-500 hover:text-indigo-600 p-1 rounded-full justify-self-end ml-2 md:ml-0" title="Ação">
                         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M18 12a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
                    </button>
                </div>
            `,n.addEventListener("click",()=>Ut(o)),a.appendChild(n)})}else a.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum cliente encontrado com os filtros aplicados.</p>'}function lt(e="",t="all"){const a=e.toLowerCase(),r=a.length>0;let s=0,o=90;const n=window.innerWidth<768;if(t==="birthdays"){const d=n?"mobileBirthMonthFilter":"birthMonthFilter",l=document.getElementById(d);l&&(s=parseInt(l.value,10))}else if(t==="inactive"){const d=n?"mobileInactiveDaysFilter":"inactiveDaysFilter",l=document.getElementById(d);l&&(o=parseInt(l.value,10))}let i=Q.filter(d=>!r||d.name.toLowerCase().includes(a)||(d.phone||"").includes(a));switch(t){case"birthdays":const d=new Date,l=d.getDate(),c=d.getMonth()+1;return i.filter(u=>{if(!u.dob)return!1;const m=u.dob.split("/");if(m.length!==2)return!1;const b=parseInt(m[0],10),f=parseInt(m[1],10);return s===99?b===l&&f===c:s===0?f>=1&&f<=12:f===s});case"inactive":return i.filter(u=>(u.lastAppointmentDaysAgo||cn())>o);case"scheduled":return i.filter(u=>u.loyaltyPoints>50);case"credit":return i.filter(u=>(u.loyaltyPoints||0)>0);case"debit":return i.filter(u=>!1);case"package":return i.filter(u=>!1);case"all":default:return i}}async function xn(e){const t=document.getElementById("birthMonthFilterContainer"),a=document.getElementById("mobileBirthMonthFilterContainer"),r=document.getElementById("inactiveDaysFilterContainer"),s=document.getElementById("mobileInactiveDaysFilterContainer");if(e==="birthdays"){if(t?.classList.remove("hidden"),a?.classList.remove("hidden"),r?.classList.add("hidden"),s?.classList.add("hidden"),O!=="birthdays"){const d=document.getElementById("birthMonthFilter");d&&(d.value=99);const l=document.getElementById("mobileBirthMonthFilter");l&&(l.value=99)}}else if(e==="inactive"){if(r?.classList.remove("hidden"),s?.classList.remove("hidden"),t?.classList.add("hidden"),a?.classList.add("hidden"),O!=="inactive"){const d=document.getElementById("inactiveDaysFilter");d&&(d.value=90);const l=document.getElementById("mobileInactiveDaysFilter");l&&(l.value=90)}}else t?.classList.add("hidden"),a?.classList.add("hidden"),r?.classList.add("hidden"),s?.classList.add("hidden");if(O===e&&e!=="birthdays"&&e!=="inactive")return;O=e,document.querySelectorAll(".client-filter-btn").forEach(d=>{d.classList.remove("bg-white","text-indigo-600","shadow"),d.classList.add("bg-gray-100","text-gray-600")}),document.querySelectorAll(`[data-filter-key="${e}"]`).forEach(d=>{d&&(d.classList.remove("bg-gray-100","text-gray-600"),d.classList.add("bg-white","text-indigo-600","shadow"))});const n=document.getElementById("clientSearchInput").value,i=lt(n,O);it(i,Q.length)}async function wt(){Ot="list",$t.innerHTML=`
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
    `;try{const[c,u]=await Promise.all([Je(p.establishmentId),_e(p.establishmentId)]);Q=c,qe=u.loyaltyProgram||{enabled:!1},zt=u.name||"O Estabelecimento";const m=lt("",O);it(m,Q.length)}catch{document.getElementById("clientsList").innerHTML='<p class="text-red-500 col-span-full text-center">Erro ao carregar dados dos clientes.</p>'}const e=document.getElementById("filter-sheet"),t=document.getElementById("filter-overlay"),a=document.getElementById("openFilterSheetBtn"),r=document.getElementById("closeFilterSheetBtn"),s=()=>{e.classList.add("show"),t.classList.remove("hidden")},o=()=>{e.classList.remove("show"),t.classList.add("hidden")};a&&a.addEventListener("click",s),r&&r.addEventListener("click",o),t&&t.addEventListener("click",o);const n=c=>{const u=c.target.closest(".client-filter-btn");u&&(xn(u.dataset.filterKey),window.innerWidth<768&&o())},i=document.getElementById("desktop-filter-bar"),d=document.getElementById("mobile-filter-list");i&&i.addEventListener("click",n),d&&d.addEventListener("click",n);const l=c=>{const u=document.getElementById(c);u&&u.addEventListener("change",()=>{if(O==="birthdays"||O==="inactive"){const m=document.getElementById("clientSearchInput").value,b=lt(m,O);it(b,Q.length)}})};l("birthMonthFilter"),l("mobileBirthMonthFilter"),l("inactiveDaysFilter"),l("mobileInactiveDaysFilter"),$t.addEventListener("click",async c=>{const u=c.target.closest("[data-action]"),m=c.target.closest(".client-card");if(Ot==="list"){if(u){const b=u.dataset.action;b==="new-client"?Ut(null):b==="print-list"&&window.print()}else if(m){const b=m.dataset.clientId,f=Q.find(v=>v.id===b);f&&Ut(f)}}}),$t.addEventListener("input",c=>{if(c.target.id==="clientSearchInput"){const u=c.target.value,m=lt(u,O);it(m,Q.length)}})}const Ve=()=>y("/api/financial/natures"),wn=e=>y("/api/financial/natures",{method:"POST",body:JSON.stringify(e)}),kn=e=>y(`/api/financial/natures/${e}`,{method:"DELETE"}),Ue=()=>y("/api/financial/cost-centers"),En=e=>y("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(e)}),Sn=e=>y(`/api/financial/cost-centers/${e}`,{method:"DELETE"}),lo=(e,t)=>y(`/api/financial/${e}`,{method:"POST",body:JSON.stringify(t)}),co=(e,t={})=>{let a=`/api/financial/${e}`;const r=new URLSearchParams;t.startDate&&r.append("startDate",t.startDate),t.endDate&&r.append("endDate",t.endDate),t.natureId&&r.append("natureId",t.natureId),t.costCenterId&&r.append("costCenterId",t.costCenterId);const s=r.toString();return s&&(a+=`?${s}`),y(a)},uo=(e,t,a)=>y(`/api/financial/${e}/${t}`,{method:"PUT",body:JSON.stringify(a)}),mo=(e,t)=>y(`/api/financial/${e}/${t}`,{method:"DELETE"}),po=(e,t,a)=>y(`/api/financial/${e}/${t}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),$n=e=>lo("payables",e),In=e=>co("payables",e),Cn=(e,t)=>uo("payables",e,t),Ln=e=>mo("payables",e),Bn=(e,t)=>po("payables",e,t),Tn=e=>lo("receivables",e),Dn=e=>co("receivables",e),Mn=(e,t)=>uo("receivables",e,t),Pn=e=>mo("receivables",e),An=(e,t)=>po("receivables",e,t),qn=(e,t)=>y(`/api/financial/cash-flow?startDate=${e}&endDate=${t}`),Nn=()=>y("/api/financial/today-summary"),ue=document.getElementById("content"),It={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},Fn={indigo:{name:"Padrão (Índigo)",main:"#4f46e5",light:"#e0e7ff",text:"#ffffff"},rose:{name:"Rosa",main:"#e11d48",light:"#ffe4e6",text:"#ffffff"},green:{name:"Verde",main:"#16a34a",light:"#d1fae5",text:"#ffffff"},sky:{name:"Azul Céu",main:"#0284c7",light:"#e0f2fe",text:"#ffffff"},amber:{name:"Âmbar",main:"#d97706",light:"#fef3c7",text:"#1f2937"}},go=[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"delete-account",icon:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m-7-10V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v3M4 7h16",label:"Excluir conta"}];let R=null;function La(e,t=null){let a='<option value="">-- Selecione (Opcional) --</option>';const r=n=>{const i=new Map,d=[];return n&&(n.forEach(l=>i.set(l.id,{...l,children:[]})),i.forEach(l=>{l.parentId&&i.has(l.parentId)?i.get(l.parentId).children.push(l):d.push(l)})),d},s=(n,i="")=>{const d=n.id===t?"selected":"";a+=`<option value="${n.id}" ${d}>${i}${n.name}</option>`,n.children.forEach(l=>s(l,i+"— "))};return r(e).forEach(n=>s(n)),a}async function Ce(e,t){const a=t.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const r=R||await _e(p.establishmentId),s=[],{ownerName:o,...n}=e;if(o&&o!==p.userName){const l=z.currentUser;l&&s.push(So(l,{displayName:o}).then(()=>{p.userName=o}))}const i={...r,...n};s.push(Qo(p.establishmentId,i)),await Promise.all(s),R=i,g("Sucesso","Definições salvas com sucesso!","success");const d=document.getElementById("panelEstablishmentName");n.name&&d&&(d.textContent=n.name,p.establishmentName=n.name)}catch(r){g("Erro",`Não foi possível salvar: ${r.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function Rn(e,t){t.innerHTML=`
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
    `,t.querySelector("#personal-data-form").addEventListener("submit",a=>{a.preventDefault();const r={ownerName:t.querySelector("#ownerName").value,name:t.querySelector("#establishmentName").value,phone:t.querySelector("#establishmentPhone").value,document:t.querySelector("#establishmentCnpjCpf").value,email:t.querySelector("#establishmentEmail").value,address:t.querySelector("#establishmentAddress").value,website:t.querySelector("#establishmentWebsite").value};Ce(r,a)})}function Hn(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const r=t.querySelector("#newPassword").value,s=t.querySelector("#confirmPassword").value;if(r!==s){g("Erro","As senhas não coincidem.","error");return}const o=t.querySelector('button[form="change-password-form"]');o.disabled=!0,o.textContent="A Salvar...";try{const n=z.currentUser;if(n)await Eo(n,r),g("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum usuário autenticado encontrado.")}catch(n){g("Erro",`Não foi possível alterar a senha: ${n.message}`,"error")}finally{o.disabled=!1,o.textContent="Salvar Nova Senha"}})}function jn(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const r=t.querySelector("#newEmail").value,s=t.querySelector("#currentPassword").value;if(!r||!s){g("Erro","Preencha todos os campos.","error");return}const o=t.querySelector('button[form="change-email-form"]');o.disabled=!0,o.textContent="A verificar...";try{const n=z.currentUser;if(!n)throw new Error("Usuário não autenticado.");const i=_a.credential(n.email,s);await Ja(n,i),o.textContent="A enviar link...",await ko(n,r),o.textContent="A atualizar BD...",await Ko(p.establishmentId,r),g("Sucesso","Link de verificação enviado! Por favor, verifique seu **novo e-mail** para confirmar a alteração.","success"),a.target.reset()}catch(n){let i="Não foi possível alterar o e-mail.";n.code==="auth/wrong-password"?i="A senha atual está incorreta.":n.code==="auth/email-already-in-use"?i="Este e-mail já está sendo usado por outra conta.":n.code==="auth/operation-not-allowed"?i="A troca de e-mail precisa ser habilitada no console do Firebase.":i=n.message,g("Erro",i,"error")}finally{o.disabled=!1,o.textContent="Salvar Novo E-mail"}})}function On(e,t){t.innerHTML=`
        <div class="bg-red-50 p-4 md:p-6 rounded-lg shadow-md border border-red-200">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-red-700">Excluir Conta</h3>
                <button type="submit" form="delete-account-form" class="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">Excluir Definitivamente</button>
            </div>
            <form id="delete-account-form" class="space-y-6">
                <div class="bg-white p-4 rounded-md border border-red-100">
                    <p class="text-red-600 font-medium mb-2">Atenção: Esta ação é irreversível.</p>
                    <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>Todos os dados do estabelecimento serão apagados permanentemente.</li>
                        <li>O histórico de agendamentos, clientes e finanças será perdido.</li>
                        <li>A sua assinatura será cancelada imediatamente.</li>
                        <li>Não será possível recuperar o acesso a esta conta.</li>
                    </ul>
                </div>
                
                <div>
                    <label for="deletePasswordConfirmation" class="block text-sm font-medium text-gray-700">Confirme sua senha para continuar</label>
                    <input type="password" id="deletePasswordConfirmation" class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:border-red-500 focus:ring-red-500 outline-none transition-colors" required placeholder="Sua senha atual">
                </div>
                
                <div class="flex items-center gap-2">
                    <input type="checkbox" id="confirmDeleteCheckbox" class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" required>
                    <label for="confirmDeleteCheckbox" class="text-sm text-gray-700 cursor-pointer select-none">Eu entendo as consequências e quero excluir minha conta.</label>
                </div>
            </form>
        </div>
    `,t.querySelector("#delete-account-form").addEventListener("submit",async a=>{a.preventDefault();const r=t.querySelector("#deletePasswordConfirmation").value,s=t.querySelector("#confirmDeleteCheckbox").checked;if(!r||!s){g("Erro","Por favor, confirme sua senha e marque a caixa de confirmação.","error");return}if(!confirm("Tem a certeza absoluta? Todos os dados serão perdidos para sempre."))return;const o=t.querySelector('button[type="submit"]');o.disabled=!0,o.textContent="A excluir...";try{const n=z.currentUser;if(!n)throw new Error("Usuário não autenticado.");const i=_a.credential(n.email,r);await Ja(n,i),await wo(n),g("Conta Excluída","Sua conta foi excluída com sucesso. Redirecionando...","success"),setTimeout(()=>{window.location.href="/index.html"},2e3)}catch(n){console.error(n);let i="Não foi possível excluir a conta.";n.code==="auth/wrong-password"?i="A senha informada está incorreta.":n.code==="auth/requires-recent-login"?i="Por segurança, faça login novamente e tente excluir a conta em seguida.":i=n.message,g("Erro",i,"error"),o.disabled=!1,o.textContent="Excluir Definitivamente"}})}function zn(e,t){t.innerHTML=`
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
    `,t.querySelector("#establishmentLogoBase64").value=e.logo||"",t.querySelector("#establishmentBackgroundImageBase64").value=e.backgroundImage||"",fo(e.themeColor||"indigo",t),t.querySelector("#establishmentLogoButton").onclick=()=>t.querySelector("#establishmentLogoInput").click(),t.querySelector("#establishmentLogoInput").onchange=a=>{const r=a.target.files[0];if(r){const s=new FileReader;s.onload=o=>{t.querySelector("#establishmentLogoPreview").src=o.target.result,t.querySelector("#establishmentLogoBase64").value=o.target.result},s.readAsDataURL(r)}},t.querySelector("#establishmentBgButton").onclick=()=>t.querySelector("#establishmentBgInput").click(),t.querySelector("#establishmentBgInput").onchange=a=>{const r=a.target.files[0];if(r){const s=new FileReader;s.onload=o=>{t.querySelector("#establishmentBgPreview").src=o.target.result,t.querySelector("#establishmentBgPreview").classList.remove("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=o.target.result},s.readAsDataURL(r)}},t.querySelector("#establishmentBgRemoveBtn").onclick=()=>{t.querySelector("#establishmentBgPreview").src="",t.querySelector("#establishmentBgPreview").classList.add("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.remove("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=""},t.querySelector("#branding-form").addEventListener("submit",a=>{a.preventDefault();const r={logo:t.querySelector("#establishmentLogoBase64").value,welcomeMessage:t.querySelector("#establishmentWelcomeMessage").value,backgroundImage:t.querySelector("#establishmentBackgroundImageBase64").value,primaryColor:t.querySelector("#establishmentPrimaryColorInput").value,textColor:t.querySelector("#establishmentTextColorInput").value,themeColor:t.querySelector("#establishmentThemeColor").value};Ce(r,a)})}function Vn(e,t){const a=e.urlId||p.establishmentId,r="https://kairos-service-603994960586.southamerica-east1.run.app";let s=window.location.origin;(s.includes("localhost")||s.includes("capacitor://")||s.includes("127.0.0.1")||s.includes("192.168"))&&(s=r);const o=`${s}/agendar?id=${a}`,n=e.publicBookingEnabled||!1,i=n?"Agendamento Online ATIVO":"Agendamento Online INATIVO",d=n?"text-green-600":"text-red-600";t.innerHTML=`
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
                        value="${o}" 
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
                            <input type="checkbox" id="publicBookingToggle" class="sr-only" ${n?"checked":""}>
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
    `,t.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const l=t.querySelector("#publicBookingLink");if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(l.value).then(()=>{g("Sucesso","Link copiado para a área de transferência!","success")}).catch(c=>{g("Erro","Não foi possível copiar o link.","error")});else try{l.select(),document.execCommand("copy"),l.blur(),g("Sucesso","Link copiado para a área de transferência!","success")}catch{g("Erro","Não foi possível copiar o link. Por favor, copie manualmente.","error")}}),t.querySelector("#publicBookingToggle").addEventListener("change",async l=>{const c=l.target.checked,u=t.querySelector("#publicBookingStatusText");c?(u.textContent="Agendamento Online ATIVO",u.className="text-sm font-semibold text-green-600"):(u.textContent="Agendamento Online INATIVO",u.className="text-sm font-semibold text-red-600");try{l.target.disabled=!0,await Zo(p.establishmentId,c),R.publicBookingEnabled=c,g("Sucesso",`Agendamento online ${c?"ativado":"desativado"}!`,"success")}catch(m){g("Erro",`Não foi possível alterar o status: ${m.message}`,"error"),l.target.checked=!c,c?(u.textContent="Agendamento Online ATIVO",u.className="text-sm font-semibold text-green-600"):(u.textContent="Agendamento Online INATIVO",u.className="text-sm font-semibold text-red-600")}finally{l.target.disabled=!1}}),Gn(e.slotInterval||30,t),t.querySelector("#booking-form").addEventListener("submit",l=>{l.preventDefault();const c={slotInterval:parseInt(t.querySelector("#establishmentSlotInterval").value,10)};Ce(c,l)})}function Un(e,t){t.innerHTML=`
         <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
             <div class="flex justify-between items-center mb-6">
                 <h3 class="text-xl font-bold text-gray-800">Horário de Funcionamento</h3>
                 <button type="submit" form="working-hours-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar Horários</button>
             </div>
             
             <form id="working-hours-form">
                 <!-- SELEÇÃO DE FUSO HORÁRIO INTEGRADA -->
                 <div class="mb-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <label for="establishmentTimezone" class="block text-sm font-bold text-gray-700 mb-2">Fuso Horário da Região</label>
                    <p class="text-sm text-gray-600 mb-3">Defina o fuso horário correto para que os agendamentos e notificações coincidam com a hora local dos seus clientes.</p>
                    <select id="establishmentTimezone" class="block w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="" disabled>Selecione a região...</option>
                        <optgroup label="Brasil">
                            <option value="America/Sao_Paulo">Horário de Brasília (SP, RJ, MG, Sul, NE, GO, DF)</option>
                            <option value="America/Manaus">Horário do Amazonas (Manaus)</option>
                            <option value="America/Cuiaba">Horário do Mato Grosso / MS</option>
                            <option value="America/Rio_Branco">Horário do Acre</option>
                            <option value="America/Noronha">Fernando de Noronha</option>
                        </optgroup>
                        <optgroup label="Internacional">
                            <option value="Europe/Lisbon">Portugal (Lisboa)</option>
                            <option value="Europe/London">Reino Unido (Londres)</option>
                            <option value="America/New_York">Estados Unidos (Nova Iorque)</option>
                            <option value="UTC">UTC (Universal)</option>
                        </optgroup>
                    </select>
                 </div>

                 <div id="establishmentWorkingHoursContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div>
             </form>
         </div>
    `;const a=t.querySelector("#establishmentTimezone");if(e.timezone)a.value=e.timezone;else try{const o=Intl.DateTimeFormat().resolvedOptions().timeZone;Array.from(a.options).some(i=>i.value===o)?a.value=o:a.value="America/Sao_Paulo"}catch{a.value="America/Sao_Paulo"}const r=t.querySelector("#establishmentWorkingHoursContainer"),s=e.workingHours||{};Object.keys(It).forEach(o=>{const n=s[o]||{},i=It[o],d=n.active!==!1,l=document.createElement("div");l.className=`day-schedule-card p-4 rounded-lg ${d?"bg-gray-50":"bg-gray-100 disabled"}`,l.innerHTML=`
            <div class="flex justify-between items-center mb-3">
                <span class="font-bold text-gray-800">${i}</span>
                <label class="flex items-center cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" id="est-${o}-active" class="sr-only" ${d?"checked":""}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                </label>
            </div>
            <div class="time-inputs space-y-2">
                <div class="flex items-center gap-2"><label class="w-16">Início:</label><input type="time" id="est-${o}-start" value="${n.start||"09:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Fim:</label><input type="time" id="est-${o}-end" value="${n.end||"18:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Intervalo:</label><input type="time" id="est-${o}-breakStart" value="${n.breakStart||"12:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Fim Int.:</label><input type="time" id="est-${o}-breakEnd" value="${n.breakEnd||"13:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
            </div>`,r.appendChild(l)}),r.addEventListener("change",o=>{const n=o.target.closest('.day-schedule-card input[type="checkbox"]');n&&n.closest(".day-schedule-card").classList.toggle("disabled",!n.checked)}),t.querySelector("#working-hours-form").addEventListener("submit",o=>{o.preventDefault();const n={};Object.keys(It).forEach(d=>{n[d]={active:t.querySelector(`#est-${d}-active`).checked,start:t.querySelector(`#est-${d}-start`).value,end:t.querySelector(`#est-${d}-end`).value,breakStart:t.querySelector(`#est-${d}-breakStart`).value,breakEnd:t.querySelector(`#est-${d}-breakEnd`).value}});const i=t.querySelector("#establishmentTimezone").value;Ce({workingHours:n,timezone:i},o)})}function _n(e,t){t.innerHTML=`
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
    `;const a=e.loyaltyProgram||{};t.querySelector("#loyaltyEnabled").checked=a.enabled||!1,t.querySelector("#loyaltyPointsPerCurrency").value=a.pointsPerCurrency||10;const r=t.querySelector("#loyaltyTiersContainer"),s=(o={})=>{const n=document.createElement("div");return n.className="loyalty-tier-row",n.innerHTML=`
            <div>
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Pontos</label>
                <input type="number" placeholder="Pontos" data-field="points" value="${o.points||""}" class="w-full p-2 border rounded-md">
            </div>
            <div>
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Descrição do Prémio</label>
                <input type="text" placeholder="Descrição do Prémio" data-field="reward" value="${o.reward||""}" class="w-full p-2 border rounded-md">
            </div>
            <div>
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Valor do Desconto (R$)</label>
                <div class="flex items-center"><span class="mr-1">R$</span><input type="number" placeholder="Valor" data-field="discount" value="${o.discount||""}" class="w-full p-2 border rounded-md"></div>
            </div>
            <button type="button" class="remove-loyalty-tier bg-red-100 text-red-700 p-2 rounded-md hover:bg-red-200 md:bg-transparent md:text-red-500 md:hover:bg-red-100">&times;</button>
        `,n};(a.tiers||[]).forEach(o=>{r.appendChild(s(o))}),t.querySelector("#add-loyalty-tier").addEventListener("click",()=>{r.appendChild(s())}),r.addEventListener("click",o=>{const n=o.target.closest(".remove-loyalty-tier");n&&n.closest(".loyalty-tier-row").remove()}),t.querySelector("#loyalty-form").addEventListener("submit",o=>{o.preventDefault();const n=Array.from(t.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(d=>({points:parseInt(d.querySelector('input[data-field="points"]').value,10)||0,reward:d.querySelector('input[data-field="reward"]').value,discount:parseFloat(d.querySelector('input[data-field="discount"]').value)||0})),i={loyaltyProgram:{enabled:t.querySelector("#loyaltyEnabled").checked,pointsPerCurrency:parseFloat(t.querySelector("#loyaltyPointsPerCurrency").value)||1,tiers:n.filter(d=>d.points>0&&d.reward)}};Ce(i,o)})}async function Jn(e,t){t.innerHTML=`
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
    `;try{const[a,r]=await Promise.all([Ve(),Ue()]),s=e.financialIntegration||{};t.querySelector("#financialNatureId").innerHTML=La(a,s.defaultNaturezaId),t.querySelector("#financialCostCenterId").innerHTML=La(r,s.defaultCentroDeCustoId)}catch{g("Erro","Não foi possível carregar os dados para a integração financeira.","error")}t.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const r={financialIntegration:{defaultNaturezaId:t.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:t.querySelector("#financialCostCenterId").value||null}};Ce(r,a)})}function Wn(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-gray-800">${e}</h3>
            <p class="mt-4 text-gray-500">Esta secção ainda não foi implementada.</p>
        </div>
    `}function fo(e="indigo",t){const a=t.querySelector("#color-palette-container"),r=t.querySelector("#establishmentThemeColor");!a||!r||(a.innerHTML="",Object.entries(Fn).forEach(([s,o])=>{const n=s===e,i=document.createElement("div");i.className="w-24 text-center cursor-pointer",i.innerHTML=`
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${n?"border-blue-500":"border-transparent"} p-1">
                <div class="w-full h-full rounded-full" style="background-color: ${o.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${n?"text-blue-600":"text-gray-600"}">${o.name}</p>
        `,i.addEventListener("click",()=>{r.value=s,fo(s,t)}),a.appendChild(i)}),r.value=e)}function Gn(e,t){const a=t.querySelector("#slotIntervalContainer"),r=t.querySelector("#establishmentSlotInterval");if(!a||!r)return;const s=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=s.map(o=>{const n=o.value===e;return`<button type="button" data-value="${o.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors 
                           ${n?"bg-indigo-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}">
                       ${o.label}
                   </button>`}).join(""),r.value=e,a.querySelectorAll(".interval-btn").forEach(o=>{o.addEventListener("click",()=>{r.value=o.dataset.value,a.querySelectorAll(".interval-btn").forEach(n=>{n.classList.remove("bg-indigo-600","text-white"),n.classList.add("bg-gray-200","text-gray-700")}),o.classList.add("bg-indigo-600","text-white"),o.classList.remove("bg-gray-200","text-gray-700")})})}async function Yn(e){const t=go.find(r=>r.id===e);if(!t){console.error("Secção de definições não encontrada:",e);return}ue.innerHTML=`
        <div class="bg-white p-4 shadow-md sticky top-0 z-10 md:relative">
            <button data-action="back-to-list" class="flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                Voltar
            </button>
        </div>
        
        <div id="settings-content-detail" class="p-4">
            <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
        </div>
    `,ue.querySelector('button[data-action="back-to-list"]').addEventListener("click",r=>{r.preventDefault(),bo()});const a=document.getElementById("settings-content-detail");switch(e){case"personal-data":Rn(R,a);break;case"change-password":Hn(R,a);break;case"change-email":jn(R,a);break;case"delete-account":On(R,a);break;case"branding":zn(R,a);break;case"booking":Vn(R,a);break;case"working-hours":Un(R,a);break;case"loyalty":_n(R,a);break;case"financial":await Jn(R,a);break;default:Wn(t?t.label:"Definições",a)}}async function bo(){if(ue.innerHTML=`
        <div class="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>
                Definições
            </h2>
        </div>
        <div class="flex justify-center items-center h-64"><div class="loader"></div></div>
    `,!R)try{R=await _e(p.establishmentId)}catch{g("Erro Fatal","Não foi possível carregar os dados do estabelecimento.","error"),ue.innerHTML='<p class="text-red-500">Erro ao carregar dados.</p>';return}const e=p.userName||z.currentUser.email,t=e?e.charAt(0).toUpperCase():"U";ue.innerHTML=`
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
                 ${p.userName&&p.userName!==z.currentUser.email?`<p class="text-sm text-gray-500">${z.currentUser.email||"Não disponível"}</p>`:""}
                 
                 <p class="text-xs text-indigo-600 font-semibold mt-2">VER MEU PERFIL / MEUS BLOQUEIOS</p>
            </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <nav id="settings-menu-list" class="space-y-1">
                ${go.map(r=>`
                    <button data-section="${r.id}" class="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold text-sm">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${r.icon}"></path></svg>
                        <span class="flex-1 text-left">${r.label}</span>
                        <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                `).join("")}
            </nav>
        </div>
    `,ue.querySelector("#settings-menu-list").addEventListener("click",r=>{const s=r.target.closest("button[data-section]");s&&(r.preventDefault(),Yn(s.dataset.section))});const a=ue.querySelector('[data-action="go-to-my-profile"]');a&&a.addEventListener("click",r=>{r.preventDefault(),F("my-profile-section")})}const Ne=document.getElementById("content");async function ke(e){const t=document.getElementById("blockagesList");if(t){t.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,r=document.getElementById("filterEndDate")?.value,s=await bt(p.establishmentId,a||new Date().toISOString().split("T")[0],r||new Date().toISOString().split("T")[0],e),o=document.getElementById("filterReason")?.value.toLowerCase(),n=o?s.filter(d=>d.reason&&d.reason.toLowerCase().includes(o)):s,i=n.reduce((d,l)=>{const c=l.reason||"Sem motivo";return d[c]||(d[c]=[]),d[c].push(l),d},{});if(t.innerHTML="",n.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(i).forEach(([d,l])=>{const c=document.createElement("div");c.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let u=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${d} (${l.length})</h4>`;if(l.length>1){const m=JSON.stringify(l.map(b=>b.id));u+=`<button data-action="batch-delete-blockage" data-ids='${m}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}u+="</div>",c.innerHTML=u,l.forEach(m=>{const b=new Date(m.startTime),f=new Date(m.endTime),v=b.toLocaleDateString("pt-BR"),k=f.toLocaleDateString("pt-BR"),S=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${v===k?`${v} | ${b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${f.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${v} às ${b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${k} às ${f.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${m.id}">Apagar</button>
                    </div>`;c.innerHTML+=S}),t.appendChild(c)})}catch(a){t.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function Xn(e){e.preventDefault();const t=e.target,a=t.querySelector("#blockageProfId").value,r=t.querySelector("#blockageDate").value,s=t.querySelector("#blockageEndDate").value||r,o=t.querySelector("#blockageStartTime").value,n=t.querySelector("#blockageEndTime").value,i={establishmentId:p.establishmentId,professionalId:a,startTime:new Date(`${r}T${o}:00`).toISOString(),endTime:new Date(`${s}T${n}:00`).toISOString(),reason:t.querySelector("#blockageReason").value};try{await vt(i),t.reset(),g("Sucesso","Bloqueio adicionado com sucesso!","success"),ke(a)}catch(d){g("Erro",`Não foi possível criar o bloqueio: ${d.message}`,"error")}}async function Qn(e){e.preventDefault();const t=e.target,a=Array.from(t.querySelectorAll('input[name="batch-professionals"]:checked')).map(c=>c.value);if(a.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const r=t.querySelector("#batchBlockageDate").value,s=t.querySelector("#batchBlockageEndDate").value||r,o=t.querySelector("#batchBlockageStartTime").value,n=t.querySelector("#batchBlockageEndTime").value,i=t.querySelector("#batchBlockageReason").value,d=t.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="Aguarde...";const l=a.map(c=>{const u={establishmentId:p.establishmentId,professionalId:c,startTime:new Date(`${r}T${o}:00`).toISOString(),endTime:new Date(`${s}T${n}:00`).toISOString(),reason:i};return vt(u)});try{await Promise.all(l),g("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),t.reset(),t.querySelectorAll('input[name="batch-professionals"]:checked').forEach(u=>u.checked=!1);const c=document.getElementById("blockageProfId").value;c&&ke(c)}catch(c){g("Erro",`Ocorreu um erro: ${c.message}`,"error")}finally{d.disabled=!1,d.textContent="Adicionar Bloqueio em Lote"}}function Zn(e){Ne.addEventListener("submit",t=>{t.target.id==="blockageForm"&&Xn(t),t.target.id==="batchBlockageForm"&&Qn(t)}),Ne.addEventListener("input",t=>{t.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&ke(e)}),Ne.addEventListener("click",async t=>{const a=t.target.closest("button[data-action]");if(!a)return;const r=a.dataset.action;if(r==="back-to-professionals")F("profissionais-section");else if(r==="delete-blockage"){if(await T("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await Qt(a.dataset.id),g("Sucesso","Bloqueio removido.","success"),ke(e)}catch(o){g("Erro",`Não foi possível remover o bloqueio: ${o.message}`,"error")}}else if(r==="batch-delete-blockage"){const s=JSON.parse(a.dataset.ids);if(await T("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${s.length} bloqueios de uma vez?`))try{await Xa(s),g("Sucesso",`${s.length} bloqueios removidos.`,"success"),ke(e)}catch(n){g("Erro",`Não foi possível apagar os bloqueios: ${n.message}`,"error")}}})}async function Kn(e){const{professionalId:t,professionalName:a}=e;if(!t||!a){Ne.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}Ne.innerHTML=`
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
        </section>`,Zn(t),await ke(t);const r=document.getElementById("batchProfSelectionContainer");try{const s=await _(p.establishmentId);r.innerHTML=s.map(o=>`
            <div class="flex items-center">
                <input id="prof-batch-${o.id}" value="${o.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${o.id}" class="ml-2 text-sm text-gray-700">${o.name}</label>
            </div>`).join("")}catch{r.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const ei=e=>y(`/api/users/${e}`),ti=e=>y("/api/users",{method:"POST",body:JSON.stringify(e)}),ai=(e,t)=>y(`/api/users/${e}`,{method:"PUT",body:JSON.stringify(t)}),oi=e=>y(`/api/users/${e}`,{method:"DELETE"}),si=(e,t)=>y(`/api/users/${e}/password`,{method:"PUT",body:JSON.stringify({password:t})}),ri=(e,t)=>y(`/api/users/${e}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),le=document.getElementById("content"),ni={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","profissionais-section":"Profissionais","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},ii={view:"Visualizar",create:"Criar",edit:"Editar"};let Be=null,Te=null;function li(e){const t=document.getElementById("usersListContainer");if(!t)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(e.length===0){const r=a?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";t.innerHTML=`<p class="col-span-full text-center text-gray-500">${r}</p>`;return}e.sort((r,s)=>(r.status==="active"?-1:1)-(s.status==="active"?-1:1)),t.innerHTML=e.map(r=>{const s=JSON.stringify(r).replace(/'/g,"&apos;"),o=r.status==="active",n=p.professionals.find(c=>c.id===r.professionalId),i=n?n.name:"N/A",d=n?n.name.charAt(0):r.name.charAt(0),l=n?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(d)}`;return`
        <div class="user-card-clickable bg-white rounded-lg shadow-sm border overflow-hidden flex cursor-pointer ${o?"":"opacity-60"}" 
             data-action="edit-user" 
             data-user='${s}'>
            
            <img src="${l}" alt="Foto de Perfil" class="w-16 h-16 object-cover flex-shrink-0 pointer-events-none">
            
            <div class="p-3 flex-grow flex flex-col justify-between">
                
                <div class="pointer-events-none">
                    <p class="font-bold text-gray-800 text-sm truncate">${r.name}</p>
                    <p class="text-xs text-gray-500 truncate">${r.email}</p>
                    <p class="text-xs text-gray-400 mt-1">Prof: <span class="font-semibold text-gray-700">${i}</span></p>
                </div>
                
                <div class="mt-2 flex items-center justify-start gap-2">
                    <label class="flex items-center cursor-pointer" title="${o?"Ativo":"Inativo"}">
                        <div class="relative">
                            <input type="checkbox" data-action="toggle-user-status" data-user-id="${r.id}" class="sr-only" ${o?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                        </div>
                    </label>
                    
                    <button data-action="delete-user" data-user-id="${r.id}" class="text-gray-500 hover:text-red-600 p-2 rounded-full transition-colors action-btn-delete" title="Excluir Usuário">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `}).join("")}function dt(){const e=document.getElementById("showInactiveUsersToggle")?.checked;let t;e?t=p.users:t=p.users.filter(a=>a.status==="active"),li(t)}function di(e={}){return Object.entries(ni).map(([t,a])=>{const r=t==="agenda-section"||t==="comandas-section",s=e[t]?.view_all_prof===!0,o=Object.entries(ii).map(([i,d])=>`
             <label class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${t}" data-permission="${i}" class="sr-only" 
                        ${e[t]?.[i]?"checked":""}>
                    <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                </div>
                <span class="text-xs text-gray-600">${d}</span>
            </label>
        `).join(""),n=r?`
            <div class="col-span-full pt-2 mt-2 border-t border-gray-200">
                <label class="flex items-center space-x-3 cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" data-module="${t}" data-permission="view_all_prof" class="sr-only" 
                            ${s?"checked":""}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                    <span class="text-sm font-semibold text-indigo-600">Ver todos os dados da Equipe</span>
                </label>
            </div>
        `:"";return`
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-3">
            <h4 class="font-bold text-gray-800 border-b pb-2">${a}</h4>
            <div class="grid grid-cols-3 gap-2">
                ${o}
            </div>
            ${n}
        </div>
    `}).join("")}async function Ba(e=null){document.getElementById("user-list-view").classList.add("hidden");const t=document.getElementById("user-form-view");t.classList.remove("hidden");let a=p.professionals;if(!a||a.length===0)try{a=await _(p.establishmentId),p.professionals=a}catch{g("Erro","Não foi possível carregar a lista de profissionais.","error")}const r=$=>a.find(S=>S.id===$),s=($,S)=>{const E=r($)?.photo,B=S.charAt(0).toUpperCase();return{photoSrc:E||`https://placehold.co/128x128/E2E8F0/4A5568?text=${B}`,initials:B,photoUrl:E||""}},o=e?.professionalId,n=e?.name||"Novo Usuário",i=s(o,n),d=r(o),l=$=>{let S='<option value="">-- Não Associado a um Profissional --</option>';return S+=a.map(w=>`<option value="${w.id}" ${w.id===$?"selected":""}>${w.name} (${w.specialty||"N/A"})</option>`).join(""),S},c=e!==null;t.querySelector("#userFormTitle").textContent=c?`Editar Usuário: ${e.name}`:"Novo Usuário";const u=t.querySelector("#userForm");u.innerHTML=`
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
                    ${di(e?.permissions)}
                </div>
            </div>

            <div class="flex gap-4 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-3 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                <button type="submit" class="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar Alterações</button>
            </div>
        </div>
    `;const m=window.innerWidth<768,b=u.querySelector(".bg-white");if(m&&b){b.classList.remove("rounded-xl","shadow-2xl","sm:p-6");const $=u.closest("section");$&&($.style.padding="0",$.style.margin="0"),b.classList.add("p-4")}const f=u.querySelector("#userProfessionalId"),v=u.querySelector("#userPhotoPreview"),k=u.querySelector("#profPhotoName");if(f.addEventListener("change",$=>{const S=$.target.value,w=r(S),E=w?w.name:"Selecione um profissional",B=s(S,n);v.src=B.photoSrc,k.textContent=E,u.querySelector("#professionalPhotoUrl").value=B.photoUrl}),u.addEventListener("submit",async $=>{$.preventDefault();const S=e?.email,w=u.querySelector("#userEmail").value,E={};u.querySelectorAll('input[type="checkbox"]').forEach(A=>{const L=A.dataset.module,D=A.dataset.permission;E[L]||(E[L]={}),E[L][D]=A.checked});const B=u.querySelector("#userProfessionalId").value||null,M={name:u.querySelector("#userName").value,permissions:E,professionalId:B};try{c?(S!==w&&(M.email=w),await ai(e.id,M),g("Usuário atualizado com sucesso!","success")):(M.email=u.querySelector("#userEmail").value,M.password=u.querySelector("#userPassword").value,await ti(M),g("Usuário criado com sucesso!","success")),gt()}catch(A){g(`Erro: ${A.message}`,"error")}}),c){const $=u.querySelector("#password-change-container"),S=$.querySelector('[data-action="show-password-form"]'),w=$.querySelector("#password-form"),E=w.querySelector('[data-action="save-password"]'),B=w.querySelector('[data-action="cancel-password-change"]');S.addEventListener("click",()=>{S.classList.add("hidden"),w.classList.remove("hidden")}),B.addEventListener("click",()=>{S.classList.remove("hidden"),w.classList.add("hidden"),w.querySelector("#userNewPassword").value=""}),E.addEventListener("click",async()=>{const M=w.querySelector("#userNewPassword").value;if(!M||M.length<6){g("Senha inválida","A nova senha deve ter pelo menos 6 caracteres.","error");return}if(await T("Alterar Senha","Tem a certeza que deseja alterar a senha deste usuário?"))try{E.disabled=!0,E.textContent="Aguarde...",await si(e.id,M),g("Sucesso!","A senha do usuário foi alterada.","success"),S.classList.remove("hidden"),w.classList.add("hidden"),w.querySelector("#userNewPassword").value=""}catch(L){g("Erro",`Não foi possível alterar a senha: ${L.message}`,"error")}finally{E.disabled=!1,E.textContent="Salvar Nova Senha"}})}}async function ci(){const e=document.getElementById("usersListContainer");e.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[t,a]=await Promise.all([ei(p.establishmentId),_(p.establishmentId)]);p.users=t,p.professionals=a,dt()}catch{g("Erro ao carregar usuários.","error"),e.innerHTML='<p class="col-span-full text-center text-red-500">Não foi possível carregar os usuários.</p>'}}async function gt(){le.innerHTML=`
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
    `,Be&&le.removeEventListener("click",Be),Te&&le.removeEventListener("change",Te),Be=async e=>{if(!document.getElementById("user-list-view")){le.removeEventListener("click",Be);return}const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"new-user":Ba();break;case"edit-user":const r=JSON.parse(t.dataset.user.replace(/&apos;/g,"'"));Ba(r);break;case"back-to-list":gt();break;case"delete-user":{e.stopPropagation();const s=t.dataset.userId;if(await T("Excluir Usuário","Tem certeza que deseja excluir este usuário? Esta ação é irreversível."))try{await oi(s),g("Usuário excluído com sucesso!","success"),gt()}catch(n){g(`Erro ao excluir: ${n.message}`,"error")}break}}},Te=async e=>{if(!document.getElementById("user-list-view")){le.removeEventListener("change",Te);return}const t=e.target.closest('input[data-action="toggle-user-status"]');if(e.target.id==="showInactiveUsersToggle")dt();else if(t){e.stopPropagation();const a=t.dataset.userId,r=t.checked?"active":"inactive";try{await ri(a,r),g(`Usuário ${r==="active"?"ativado":"inativado"} com sucesso.`,"success");const s=p.users.findIndex(o=>o.id===a);s>-1&&(p.users[s].status=r,dt())}catch(s){g(`Erro ao atualizar status: ${s.message}`,"error"),t.checked=!t.checked,dt()}}},le.addEventListener("click",Be),le.addEventListener("change",Te),await ci()}const ui=document.getElementById("content");let Ta={},_t=null;function mi(){Object.values(Ta).forEach(e=>e?.destroy()),Ta={}}function pi(e,t){const{jsPDF:a}=window.jspdf,r=new a({orientation:"landscape",unit:"px",format:"a4"}),s=document.getElementById("salesReportSummaryCards");if(r.setFontSize(18),r.text(e,r.internal.pageSize.getWidth()/2,40,{align:"center"}),s){const n=[["Receita Total",s.querySelector("#summary-revenue").textContent],["Vendas Totais",s.querySelector("#summary-transactions").textContent],["Ticket Médio",s.querySelector("#summary-avg-ticket").textContent]];r.autoTable({startY:60,head:[["Métrica","Valor"]],body:n,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const o=r.lastAutoTable?r.lastAutoTable.finalY+20:60;r.text("Detalhes das Vendas",20,o),r.autoTable({html:`#${t}`,startY:o+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),r.save(`${e.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function Da(e){const t=document.getElementById("genericModal"),a=(e.payments||[]).map(r=>`
        <div class="flex justify-between text-sm">
            <span>${r.method.charAt(0).toUpperCase()+r.method.slice(1)}</span>
            <span class="font-medium">R$ ${r.value.toFixed(2)}</span>
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
    `,t.style.display="flex"}function gi(e){const{summary:t,transactions:a}=e;document.getElementById("summary-revenue").textContent=`R$ ${t.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=t.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${t.averageTicket.toFixed(2)}`;const r=document.getElementById("paymentSummaryTableBody"),s=Object.entries(t.paymentMethodTotals).sort(([,i],[,d])=>d-i);r.innerHTML=s.map(([i,d])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${i.charAt(0).toUpperCase()+i.slice(1)}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${d.toFixed(2)}</td>
        </tr>
    `).join("");const o=document.getElementById("transactionsTableBody"),n=document.getElementById("mobileTransactionsList");if(a.length===0){const i='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';o.innerHTML=i,n.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}o.innerHTML=a.map((i,d)=>`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${d}">
            <td class="w-24 py-3 px-4">${new Date(i.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${i.client}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${i.items}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${i.type}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${i.total.toFixed(2)}</td>
        </tr>
    `).join(""),o.querySelectorAll("tr").forEach(i=>{i.addEventListener("dblclick",()=>{const d=i.dataset.transactionIndex,l=_t.transactions[d];l&&Da(l)})}),n.innerHTML=a.map((i,d)=>`
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
    `).join(""),n.querySelectorAll("div[data-transaction-index]").forEach(i=>{i.addEventListener("click",()=>{const d=i.dataset.transactionIndex,l=_t.transactions[d];l&&Da(l)})})}async function Ma(){const e=document.getElementById("main-reports-view"),t=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!e||!t||!a)return;const r=t.value,s=a.value;if(!r||!s)return g("Atenção","Por favor, selecione as datas de início e fim.","error");e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const o=document.getElementById("cashierSessionFilter").value,n=await gs({establishmentId:p.establishmentId,startDate:r,endDate:s,cashierSessionId:o});_t=n,e.innerHTML=`
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
        `,gi(n)}catch(o){g("Erro",`Não foi possível carregar o relatório: ${o.message}`,"error"),e.innerHTML=`<p class="p-8 text-center text-red-500">${o.message}</p>`}}async function fi(){mi();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];ui.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",Ma),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const r=document.getElementById("reportStartDate").value,s=document.getElementById("reportEndDate").value,o=`Relatorio_Vendas_${r}_a_${s}`;pi(o,"transactionsTable")});try{const r=await nr(),s=document.getElementById("cashierSessionFilter");r.forEach(o=>{const n=new Date(o.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),i=o.closedByName||"N/A";s.innerHTML+=`<option value="${o.id}">${i} - ${n}</option>`})}catch{g("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await Ma()}const bi=document.getElementById("content");let I={payables:[],receivables:[],natures:[],costCenters:[],currentFilter:"pending",startDate:new Date(new Date().getFullYear(),new Date().getMonth()-1,1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],previousBalance:0,filterNaturezaId:"all",filterCostCenterId:"all",currentListView:"receivables"},Ct=null,et=null,tt=null;function ia(e){const t=new Map,a=[];return e&&(e.forEach(r=>t.set(r.id,{...r,children:[]})),t.forEach(r=>{r.parentId&&t.has(r.parentId)?t.get(r.parentId).children.push(r):a.push(r)})),a}function vo(e,t,a){if(!t||t.length===0){e.innerHTML='<p class="text-center text-gray-500">Nenhum item criado.</p>';return}const r=(s,o=0)=>{const n="— ".repeat(o);return`
            <div style="margin-left: ${o*20}px;" class="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>${n}${s.name}</span>
                <button data-action="delete-${a}" data-id="${s.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
            </div>
            ${s.children.map(i=>r(i,o+1)).join("")}
        `};e.innerHTML=t.map(s=>r(s)).join("")}async function Pa(e){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const t=document.getElementById("genericModal"),a=e==="nature",r=`Gerir ${a?"Naturezas Financeiras":"Centros de Custo"}`,s=a?Ve:Ue,o=a?"natures":"costCenters";t.innerHTML=`
        <div class="modal-content max-w-lg">
            <h2 class="text-2xl font-bold mb-6">${r}</h2>
            <form id="hierarchyForm" class="space-y-3 mb-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" id="itemName" placeholder="Nome do novo item" required class="p-2 border rounded-md w-full">
                    <select id="itemParent" class="p-2 border rounded-md bg-white w-full"><option value="">-- Nível Principal --</option></select>
                </div>
                <button type="submit" class="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg">Adicionar</button>
            </form>
            <div id="hierarchyList" class="space-y-1 max-h-64 overflow-y-auto p-2 border rounded-md"><div class="loader mx-auto"></div></div>
            <div class="mt-6"><button type="button" data-action="close-modal" data-target="genericModal" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg">Fechar</button></div>
        </div>`,t.style.display="flex";const n=t.querySelector("#hierarchyList"),i=t.querySelector("#itemParent"),d=c=>{const u=ia(c);vo(n,u,e),i.innerHTML='<option value="">-- Nível Principal --</option>';const m=(b,f="",v=0)=>{const k=v>0?"— ".repeat(v):"";i.innerHTML+=`<option value="${b.id}">${k}${b.name}</option>`,b.children.forEach($=>m($,f+"— "))};u.forEach(b=>m(b))},l=await s();I[o]=l,d(l),t.querySelector("#hierarchyForm").addEventListener("submit",async c=>{c.preventDefault();const u=t.querySelector("#itemName").value,m=i.value,b=a?wn:En;try{await b({name:u,parentId:m||null});const f=await s();I[o]=f,d(f),t.querySelector("#hierarchyForm").reset(),await pe()}catch(f){g("Erro",`Não foi possível criar: ${f.message}`,"error")}})}function vi(e){const t=document.getElementById("cashFlowChart");if(!t)return;const a=t.getContext("2d");Ct&&Ct.destroy();const r=e.payables.map(s=>s*-1);Ct=new Chart(a,{type:"bar",data:{labels:e.labels,datasets:[{label:"Receitas",data:e.receivables,backgroundColor:"rgba(74, 222, 128, 0.6)",borderColor:"rgba(34, 197, 94, 1)",borderWidth:1,yAxisID:"y"},{label:"Despesas",data:r,backgroundColor:"rgba(248, 113, 113, 0.6)",borderColor:"rgba(239, 68, 68, 1)",borderWidth:1,yAxisID:"y"},{label:"Saldo Acumulado",data:e.expectedBalance,type:"line",borderColor:"rgba(59, 130, 246, 1)",backgroundColor:"rgba(59, 130, 246, 0.2)",borderWidth:3,pointRadius:4,pointBackgroundColor:"rgba(59, 130, 246, 1)",fill:!0,tension:.1,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{stacked:!0},y:{type:"linear",display:!0,position:"left",stacked:!0,title:{display:!0,text:"Movimentações (R$)"}},y1:{type:"linear",display:!0,position:"right",title:{display:!0,text:"Saldo Acumulado (R$)"},grid:{drawOnChartArea:!1}}},plugins:{tooltip:{callbacks:{label:function(s){let o=s.dataset.label||"";if(o&&(o+=": "),s.parsed.y!==null){const n=Math.abs(s.parsed.y);o+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(n)}return o}}}}}})}async function Aa(){const e=document.getElementById("cash-flow-chart-container"),t=document.getElementById("cashFlowStartDate").value,a=document.getElementById("cashFlowEndDate").value;if(!t||!a){g("Atenção","Por favor, selecione as datas de início e fim.","error");return}e.innerHTML='<div class="loader mx-auto my-10"></div>';try{const r=await qn(t,a);e.innerHTML='<canvas id="cashFlowChart"></canvas>',vi(r)}catch(r){e.innerHTML=`<p class="text-red-500 text-center">Erro ao carregar dados do gráfico: ${r.message}</p>`}}function qa(){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const e=document.getElementById("genericModal"),t=new Date,a=new Date(t.getFullYear(),t.getMonth(),1).toISOString().split("T")[0],r=t.toISOString().split("T")[0];e.innerHTML=`
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
                    <input type="date" id="cashFlowEndDate" value="${r}" class="p-2 border rounded-md">
                </div>
                <button id="generateCashFlowBtn" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Gerar Gráfico</button>
            </div>
            <div id="cash-flow-chart-container" class="relative h-96">
                <canvas id="cashFlowChart"></canvas>
            </div>
        </div>
    `,e.style.display="flex",e.querySelector("#generateCashFlowBtn").addEventListener("click",Aa),Aa()}function hi(){const e=document.getElementById("genericModal"),t=I.payables.filter(u=>u.status==="pending").reduce((u,m)=>u+m.amount,0),a=I.receivables.filter(u=>u.status==="pending").reduce((u,m)=>u+m.amount,0),r=a-t,s=I.payables.filter(u=>u.status==="paid").reduce((u,m)=>u+m.amount,0),o=I.receivables.filter(u=>u.status==="paid").reduce((u,m)=>u+m.amount,0),n=o-s,i=I.previousBalance||0,d=i+n,l=u=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(u),c=u=>u>=0?"text-green-600":"text-red-600";e.innerHTML=`
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
                            <p class="text-2xl font-bold text-green-600">${l(o)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-red-400">
                            <p class="text-gray-500 text-sm">Total Pago</p>
                            <p class="text-2xl font-bold text-red-600">${l(s)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 ${c(n)==="text-green-600"?"border-green-600":"border-red-600"}">
                            <p class="text-gray-700 text-sm font-medium">Saldo do Período</p>
                            <p class="text-2xl font-bold ${c(n)}">${l(n)}</p>
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
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 ${c(r)==="text-green-600"?"border-green-600":"border-red-600"}">
                            <p class="text-gray-700 text-sm font-medium">Saldo Previsto</p>
                            <p class="text-2xl font-bold ${c(r)}">${l(r)}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `,e.style.display="flex"}function yi(){const e=document.getElementById("genericModal");e.innerHTML=`
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
    `,e.style.display="flex"}function at(e,t="all"){let a='<option value="all">Todos</option>';const r=n=>{const i=new Map,d=[];return n&&(n.forEach(l=>i.set(l.id,{...l,children:[]})),i.forEach(l=>{l.parentId&&i.has(l.parentId)?i.get(l.parentId).children.push(l):d.push(l)})),d},s=(n,i=0)=>{const d=i>0?"— ".repeat(i):"",l=n.id===t?"selected":"";a+=`<option value="${n.id}" ${l}>${d}${n.name}</option>`,n.children.forEach(c=>s(c,i+1))};return r(e).forEach(n=>s(n)),a}async function pe(){const e=document.getElementById("financial-content"),t=document.getElementById("filterStartDate")?.value,a=document.getElementById("filterEndDate")?.value,r=document.getElementById("filterNaturezaId")?.value,s=document.getElementById("filterCostCenterId")?.value;if(!t||!a){try{const[i,d]=await Promise.all([Ve(),Ue()]);I={...I,natures:i,costCenters:d},document.getElementById("filterNaturezaId")&&(document.getElementById("filterNaturezaId").innerHTML=at(I.natures)),document.getElementById("filterCostCenterId")&&(document.getElementById("filterCostCenterId").innerHTML=at(I.costCenters))}catch(i){g("Erro",`Não foi possível carregar os dados base: ${i.message}`,"error")}Jt(),Fa();return}const o=document.getElementById("payables-list"),n=document.getElementById("receivables-list");o&&(o.innerHTML='<div class="loader mx-auto"></div>'),n&&(n.innerHTML='<div class="loader mx-auto"></div>');try{const i={startDate:t,endDate:a};r&&r!=="all"&&(i.natureId=r),s&&s!=="all"&&(i.costCenterId=s);const[d,l,c,u]=await Promise.all([In(i),Dn(i),Ve(),Ue()]),m=l.previousBalance-d.previousBalance;I={...I,payables:d.entries,receivables:l.entries,natures:c,costCenters:u,previousBalance:m,filterNaturezaId:r,filterCostCenterId:s},document.getElementById("filterNaturezaId")&&(document.getElementById("filterNaturezaId").innerHTML=at(I.natures,I.filterNaturezaId)),document.getElementById("filterCostCenterId")&&(document.getElementById("filterCostCenterId").innerHTML=at(I.costCenters,I.filterCostCenterId)),Jt(),Fa()}catch(i){g("Erro",`Não foi possível carregar os dados: ${i.message}`,"error"),e&&(e.innerHTML='<p class="text-red-500 text-center">Falha ao carregar dados.</p>')}}async function xi(e,t,a=null){e.preventDefault();const r=e.target,s=r.querySelector('[name="status"]').checked,o=r.querySelector('[name="paymentDate"]').value,n=parseFloat(r.querySelector('[name="amount"]').value),i=parseInt(r.querySelector('[name="installments"]')?.value,10)||1;if(isNaN(n)){g("Erro de Validação","O valor inserido é inválido.","error");return}if(s&&!o){g("Erro de Validação","Por favor, forneça a data de pagamento para um lançamento pago.","error");return}const d={description:r.querySelector('[name="description"]').value,amount:n,dueDate:r.querySelector('[name="dueDate"]').value,naturezaId:r.querySelector('[name="naturezaId"]').value||null,centroDeCustoId:r.querySelector('[name="centroDeCustoId"]').value||null,notes:r.querySelector('[name="notes"]').value,status:s?"paid":"pending",paymentDate:s?o:null,installments:a?1:i};try{a?(await(t==="payable"?Cn(a,d):Mn(a,d)),g("Sucesso","Lançamento atualizado!","success")):(await(t==="payable"?$n(d):Tn(d)),g("Sucesso","Lançamento adicionado!","success")),document.getElementById("genericModal").style.display="none",await pe()}catch(l){g("Erro",`Não foi possível salvar: ${l.message}`,"error")}}async function wi(e,t){if(await T("Confirmar Exclusão","Tem certeza? Esta ação é irreversível."))try{await(e==="payable"?Ln(t):Pn(t)),g("Sucesso","Lançamento excluído!","success"),await pe()}catch(r){g("Erro",`Falha ao excluir: ${r.message}`,"error")}}async function ki(e,t){const a=new Date().toISOString().split("T")[0];try{await(e==="payable"?Bn(t,a):An(t,a)),g("Sucesso","Lançamento atualizado!","success"),await pe()}catch(r){g("Erro",`Falha ao atualizar status: ${r.message}`,"error")}}function Na(e){const t=I.currentFilter;return t==="all"?e:e.filter(a=>a.status===t)}function Jt(){const e=document.getElementById("payables-list"),t=document.getElementById("receivables-list");if(!e||!t)return;const a=new Map(I.natures.map(i=>[i.id,i.name])),r=new Map(I.costCenters.map(i=>[i.id,i.name])),s=Na(I.payables),o=Na(I.receivables),n=(i,d)=>{const l=i.status==="paid",c=JSON.stringify(i).replace(/'/g,"&apos;"),u=i.naturezaId?a.get(i.naturezaId):"N/A",m=i.centroDeCustoId?r.get(i.centroDeCustoId):"N/A";let b=d==="payable"?"text-red-600":"text-green-600";const f=l?"bg-gray-200 text-gray-600":d==="payable"?"bg-red-100 text-red-700":"bg-yellow-100 text-yellow-700",v=l?"Finalizado":"Pendente";return l&&(b="text-gray-500"),`
        <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 ${l?"border-gray-300 opacity-70":d==="payable"?"border-red-400":"border-green-400"}">
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-bold">${i.description}</p>
                    <p class="text-sm text-gray-500">Vence em: ${new Date(i.dueDate+"T00:00:00").toLocaleDateString("pt-BR")}</p>
                    <div class="flex flex-wrap gap-2 mt-1">
                        <span class="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">Natureza: ${u}</span>
                        <span class="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">C. Custo: ${m}</span>
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
        </div>`};e.innerHTML=s.map(i=>n(i,"payable")).join("")||'<p class="text-center text-gray-500 py-4">Nenhuma conta a pagar.</p>',t.innerHTML=o.map(i=>n(i,"receivable")).join("")||'<p class="text-center text-gray-500 py-4">Nenhuma conta a receber.</p>'}function Fa(){const e=I.payables.filter(s=>s.status==="pending").reduce((s,o)=>s+o.amount,0),t=I.receivables.filter(s=>s.status==="pending").reduce((s,o)=>s+o.amount,0),a=t-e;document.getElementById("summary-pending-receivables").textContent=`R$ ${t.toFixed(2)}`,document.getElementById("summary-pending-payables").textContent=`R$ ${e.toFixed(2)}`,document.getElementById("summary-pending-balance").textContent=`R$ ${a.toFixed(2)}`;const r=document.getElementById("summary-pending-balance");r&&(r.className=`text-2xl font-bold ${a>=0?"text-green-600":"text-red-600"}`)}function Lt(e,t=null){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const a=document.getElementById("genericModal"),r=`${t?"Editar":"Nova"} ${e==="payable"?"Despesa":"Receita"}`,s=e==="payable"?"bg-red-600 hover:bg-red-700":"bg-green-600 hover:bg-green-700",o=m=>{let b='<option value="">-- Selecione (Opcional) --</option>';const f=ia(m),v=(k,$="",S=0)=>{const w=S>0?"— ".repeat(S):"";b+=`<option value="${k.id}">${w}${k.name}</option>`,k.children.forEach(E=>v(E,$+"— "))};return f.forEach(k=>v(k)),b},n=o(I.natures),i=o(I.costCenters),d=t?"":`
        <div>
            <label>Número de Parcelas</label>
            <input type="number" name="installments" class="w-full p-2 border rounded-md" value="1" min="1" max="36">
        </div>
    `;a.innerHTML=`
        <div class="modal-content max-w-lg">
            <h2 class="text-2xl font-bold mb-6">${r}</h2>
            <form id="financial-form" class="space-y-4">
                <div><label>Descrição</label><input type="text" name="description" required class="w-full p-2 border rounded-md" value="${t?.description||""}"></div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="md:col-span-1"><label>Valor Total (R$)</label><input type="number" step="0.01" name="amount" required class="w-full p-2 border rounded-md" value="${t?.amount||""}"></div>
                    <div class="md:col-span-1"><label>1º Vencimento</label><input type="date" name="dueDate" required class="w-full p-2 border rounded-md" value="${t?.dueDate||""}"></div>
                    <div class="md:col-span-1">${d}</div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div><label>Natureza</label><select name="naturezaId" class="w-full p-2 border rounded-md bg-white">${n}</select></div>
                    <div><label>Centro de Custo</label><select name="centroDeCustoId" class="w-full p-2 border rounded-md bg-white">${i}</select></div>
                </div>
                <div><label>Observações</label><textarea name="notes" class="w-full p-2 border rounded-md">${t?.notes||""}</textarea></div>
                <div class="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <label for="status" class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" id="status" name="status" class="sr-only"><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div><span class="ml-3 font-semibold text-gray-700">Marcar como Pago/Recebido</span></label>
                    <div id="payment-date-container" class="hidden"><label>Data Pgto.</label><input type="date" name="paymentDate" class="p-2 border rounded-md"></div>
                </div>
                <div class="flex gap-4 pt-4"><button type="button" data-action="close-modal" data-target="genericModal" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg">Cancelar</button><button type="submit" class="w-full py-2 px-4 text-white font-semibold rounded-lg ${s}">Salvar</button></div>
            </form>
        </div>`,a.style.display="flex",t&&(a.querySelector('[name="naturezaId"]').value=t.naturezaId||"",a.querySelector('[name="centroDeCustoId"]').value=t.centroDeCustoId||"");const l=a.querySelector("#status"),c=a.querySelector("#payment-date-container"),u=a.querySelector('[name="paymentDate"]');t?.status==="paid"&&(l.checked=!0,c.classList.remove("hidden"),u.value=t.paymentDate||new Date().toISOString().split("T")[0]),l.addEventListener("change",()=>{c.classList.toggle("hidden",!l.checked),u.required=l.checked}),a.querySelector("#financial-form").addEventListener("submit",m=>xi(m,e,t?.id))}async function Ei(){const e=new Date,a=new Date(e.getFullYear(),e.getMonth()-1,1).toISOString().split("T")[0],r=e.toISOString().split("T")[0];I.startDate=a,I.endDate=r,I.currentFilter="pending",I.filterNaturezaId="all",I.filterCostCenterId="all",bi.innerHTML=`
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
    `;const s=document.getElementById("main-fab-btn"),o=document.getElementById("fab-menu");if(s&&o){s.addEventListener("click",v=>{v.stopPropagation(),o.classList.toggle("hidden"),s.classList.toggle("rotate-45")});const m=o.querySelector('button[data-action="open-modal"][data-type="receivable"]'),b=o.querySelector('button[data-action="open-modal"][data-type="payable"]'),f=o.querySelector('button[data-action="open-cash-flow-modal"]');m&&m.addEventListener("click",v=>{v.stopPropagation(),Lt("receivable")}),b&&b.addEventListener("click",v=>{v.stopPropagation(),Lt("payable")}),f&&f.addEventListener("click",v=>{v.stopPropagation(),qa()})}et&&document.body.removeEventListener("click",et),tt&&document.getElementById("genericModal").removeEventListener("click",tt);const n=()=>{const m=document.getElementById("filterStartDate"),b=document.getElementById("filterEndDate"),f=document.getElementById("filterNaturezaId"),v=document.getElementById("filterCostCenterId");I.startDate=m.value,I.endDate=b.value,I.filterNaturezaId=f.value,I.filterCostCenterId=v.value;const k=document.getElementById("advanced-filters");k&&k.classList.contains("hidden")===!1&&window.innerWidth<768&&k.classList.add("hidden"),pe()},i=m=>{const b=m.target.closest("[data-status-filter]");if(!b)return;const f=b.dataset.statusFilter;I.currentFilter=f,document.querySelectorAll("[data-status-filter]").forEach(v=>{v.classList.remove("bg-blue-100","text-blue-800"),v.classList.add("bg-gray-100","text-gray-600")}),b.classList.remove("bg-gray-100","text-gray-600"),b.classList.add("bg-blue-100","text-blue-800"),Jt()},d=m=>{const b=document.getElementById("payables-container"),f=document.getElementById("receivables-container"),v=document.getElementById("btn-payables-view"),k=document.getElementById("btn-receivables-view");window.innerWidth>=1024&&I.currentListView===m||(m==="payables"?(b.classList.remove("hidden"),f.classList.add("hidden"),v&&(v.classList.remove("bg-gray-200"),v.classList.add("bg-red-100","border","border-red-500")),k&&(k.classList.remove("bg-green-100","border","border-green-500"),k.classList.add("bg-gray-200"))):(b.classList.add("hidden"),f.classList.remove("hidden"),v&&(v.classList.remove("bg-red-100","border","border-red-500"),v.classList.add("bg-gray-200")),k&&(k.classList.remove("bg-gray-200"),k.classList.add("bg-green-100","border","border-green-500"))),I.currentListView=m)};document.getElementById("applyDateFilterBtn").addEventListener("click",n),document.getElementById("filterNaturezaId").addEventListener("change",()=>{I.filterNaturezaId=document.getElementById("filterNaturezaId").value}),document.getElementById("filterCostCenterId").addEventListener("change",()=>{I.filterCostCenterId=document.getElementById("filterCostCenterId").value}),document.querySelectorAll("[data-status-filter]").forEach(m=>{m.addEventListener("click",i)}),et=m=>{const b=m.target.closest("button[data-action]");if(!b)return;const{action:f,type:v,id:k}=b.dataset;f==="edit"?Lt(v,JSON.parse(b.dataset.item.replace(/&apos;/g,"'"))):f==="delete"?wi(v,k):f==="mark-as-paid"?ki(v,k):f==="manage-natures"?Pa("nature"):f==="manage-cost-centers"?Pa("cost-center"):f==="open-cash-flow-modal"?qa():f==="toggle-filters"?document.getElementById("advanced-filters")?.classList.toggle("hidden"):f==="open-indicators-modal"?hi():f==="open-settings-modal"?yi():f==="toggle-list-view"&&d(b.dataset.list)},tt=m=>{const b=m.target.closest('button[data-action^="delete-"]');if(b){const f=b.dataset.action.split("-")[1];l(f,b.dataset.id)}},document.body.addEventListener("click",et),document.getElementById("genericModal").addEventListener("click",tt);async function l(m,b){const f=m==="nature",v=f?kn:Sn,k=f?Ve:Ue,$=f?"natures":"costCenters",S=document.getElementById("hierarchyList");if(await T("Apagar Item","Tem a certeza? Apagar um item principal também apagará os seus sub-itens."))try{await v(b);const E=await k();I[$]=E,vo(S,ia(E),m),await pe()}catch(E){g("Erro",`Não foi possível apagar: ${E.message}`,"error")}}const c=()=>{const m=window.innerWidth<1024,b=document.getElementById("payables-container"),f=document.getElementById("receivables-container"),v=document.getElementById("list-toggle-buttons");b&&f&&(b.classList.remove("hidden"),f.classList.remove("hidden"),m?(b.classList.remove("lg:col-span-1"),f.classList.remove("lg:col-span-1"),v?.classList.remove("hidden"),d(I.currentListView)):(b.classList.add("lg:col-span-1"),f.classList.add("lg:col-span-1"),v?.classList.add("hidden"),b.classList.remove("hidden"),f.classList.remove("hidden")))};c(),window.addEventListener("resize",c);const u=document.querySelector(`[data-status-filter="${I.currentFilter}"]`);u&&(document.querySelectorAll("[data-status-filter]").forEach(m=>{m.classList.remove("bg-blue-100","text-blue-800"),m.classList.add("bg-gray-100","text-gray-600")}),u.classList.remove("bg-gray-100","text-gray-600"),u.classList.add("bg-blue-100","text-blue-800"));try{const m=await Nn(),b=document.getElementById("summary-today-payables");b&&(b.textContent=`R$ ${m.totalPayables.toFixed(2)}`);const f=document.getElementById("summary-today-receivables");f&&(f.textContent=`R$ ${m.totalReceivables.toFixed(2)}`)}catch{g("Erro","Não foi possível carregar o resumo do dia.","error")}await pe()}const Si=e=>y("/api/commissions/calculate",{method:"POST",body:JSON.stringify(e)}),$i=e=>y("/api/commissions/save",{method:"POST",body:JSON.stringify(e)}),Ii=(e={})=>{const t=new URLSearchParams(e).toString(),a=`/api/commissions/history${t?"?"+t:""}`;return y(a)},Ci=e=>y(`/api/commissions/report/${e}`,{method:"DELETE"}),Ee=document.getElementById("content");let Fe=[],ho="",ot=null,xe={};function Li(e){const{jsPDF:t}=window.jspdf,a=new t;a.setFontSize(18),a.text(`Recibo de Comissão - ${e.professionalName}`,105,20,null,null,"center"),a.setFontSize(12),a.text(`Período: ${e.period}`,105,30,null,null,"center"),a.autoTable({startY:40,head:[["Descrição","Valor (R$)"]],body:[["Total Comissionável",`R$ ${e.summary.totalCommissionableValue.toFixed(2)}`],["Total de Itens",e.summary.totalItems]],theme:"striped"});const r=a.lastAutoTable.finalY+20;a.setFontSize(14),a.setFont(void 0,"bold"),a.text("Valor Total da Comissão:",14,r),a.text(`R$ ${e.summary.totalCommission.toFixed(2)}`,190,r,null,null,"right");const s=r+80;a.line(40,s,170,s),a.setFontSize(10),a.setFont(void 0,"normal"),a.text(e.professionalName,105,s+10,null,null,"center"),a.save(`recibo_comissao_${e.professionalName}_${e.period.replace(/\//g,"-")}.pdf`)}function Bi(){const e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1).toISOString().split("T")[0],a=e.toISOString().split("T")[0],s=`
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
    `,{modalElement:o}=j({title:"✨ Novo Cálculo de Comissões",contentHTML:s,maxWidth:"max-w-xl"}),n=o.querySelector("#calculation-form"),i=o.querySelector("#calc-professionals-all"),d=o.querySelectorAll(".professional-checkbox");i.addEventListener("change",l=>{d.forEach(c=>{c.checked=l.target.checked})}),d.forEach(l=>{l.addEventListener("change",()=>{l.checked?Array.from(d).every(u=>u.checked)&&(i.checked=!0):i.checked=!1})}),n.addEventListener("submit",l=>{l.preventDefault();const c=Array.from(d).filter(m=>m.checked).map(m=>m.value);if(c.length===0){g("Atenção","Selecione pelo menos um profissional para o cálculo.","error");return}Di({professionalIds:c});const u=o.querySelector("[data-close-modal]");u?u.click():o.style.display="none"})}async function Ti(e){if(await T("Excluir Relatório","Tem a certeza que deseja excluir permanentemente este relatório de comissão? Esta ação não pode ser desfeita."))try{await Ci(e),g("Sucesso!","Relatório de comissão excluído.","success"),ct()}catch(a){g("Erro",`Não foi possível excluir: ${a.message}`,"error")}}async function Di(e){const{professionalIds:t}=e,a=document.getElementById("calc-start-date")?.value,r=document.getElementById("calc-end-date")?.value,s={services:document.getElementById("calc-type-services")?.checked,products:document.getElementById("calc-type-products")?.checked,packages:document.getElementById("calc-type-packages")?.checked};if(!a||!r){g("Erro","As datas não foram capturadas corretamente.","error");return}F("commissions-section",{view:"results",isLoading:!0});try{const o=await Si({professionalIds:t,startDate:a,endDate:r,calculationTypes:s});Fe=o;const n=`${new Date(a+"T00:00:00").toLocaleDateString("pt-BR")} a ${new Date(r+"T00:00:00").toLocaleDateString("pt-BR")}`;ho=n,Ai(o,n)}catch(o){g("Erro",`Não foi possível calcular: ${o.message}`,"error"),F("commissions-section",{view:"history"})}}async function Mi(){if(Fe.length===0){g("Erro","Não há resultados para salvar.","error");return}const e=ho;if(await T("Salvar Relatórios",`Tem a certeza que deseja salvar ${Fe.length} relatório(s) de comissão para o período de ${e}?`))try{const a=Fe.map(r=>$i({professionalId:r.professionalId,professionalName:r.professionalName,period:e,reportData:r}));await Promise.all(a),g("Sucesso!","Relatórios de comissão salvos.","success"),F("commissions-section",{view:"history"})}catch(a){g("Erro",`Não foi possível salvar: ${a.message}`,"error")}}async function ct(){const e=document.getElementById("commissionHistory");if(!e)return;const t=document.getElementById("filter-professional")?.value||"",a=document.getElementById("filter-month")?.value||"";xe={},t&&t!=="all"&&(xe.professionalId=t),a&&(xe.period=a),e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const r=await Ii(xe);if(r.length===0){e.innerHTML='<p class="text-center text-gray-500 py-8">Nenhum relatório de comissão salvo encontrado para os filtros.</p>';return}e.innerHTML=`
            <div class="space-y-3">
                ${r.map(s=>`
                    <div class="bg-white p-4 rounded-lg shadow-sm border" data-id="${s.id}">
                        <div class="flex flex-row justify-between items-start gap-4"> 
                            
                            <div class="flex-shrink min-w-0">
                                <p class="font-bold text-gray-800 truncate">${s.professionalName}</p>
                                <p class="text-sm text-gray-500">Período: ${s.period}</p>
                                <p class="text-xs text-gray-600 mt-1 hidden sm:block">Salvo em: ${new Date(s.createdAt).toLocaleDateString("pt-BR")}</p>
                            </div>
                            
                            <div class="text-right flex flex-col items-end gap-2 flex-shrink-0">
                                <p class="text-lg font-bold text-green-600">R$ ${s.summary.totalCommission.toFixed(2)}</p>
                                
                                <div class="flex gap-2"> 
                                    <button data-action="generate-receipt" data-report='${JSON.stringify(s).replace(/'/g,"&apos;")}' class="py-1 px-3 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg hover:bg-indigo-200">Recibo</button>
                                    <button data-action="delete-report" data-id="${s.id}" class="py-1 px-3 bg-red-100 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-200">Excluir</button>
                                </div>
                            </div>
                        </div>
                    </div>`).join("")}
            </div>`}catch(r){e.innerHTML=`<p class="text-red-500 text-center">Erro ao carregar histórico: ${r.message}</p>`}}function Pi(){if(!p.professionals){Ee.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A carregar dados...</p></div>';return}const e=p.professionals.map(o=>`<option value="${o.id}">${o.name}</option>`).join(""),t=[],a=new Date;for(let o=0;o<12;o++){const n=new Date(a.getFullYear(),a.getMonth()-o,1),i=n.getFullYear(),l=(n.getMonth()+1).toString().padStart(2,"0"),c=`${i}-${l}`,u=n.toLocaleDateString("pt-BR",{month:"long",year:"numeric"});t.push(`<option value="${c}">${u}</option>`)}const r=xe.professionalId||"all",s=xe.period||"";Ee.innerHTML=`
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
    `,document.getElementById("filter-professional").value=r,document.getElementById("filter-month").value=s,document.getElementById("filter-professional").addEventListener("change",ct),document.getElementById("filter-month").addEventListener("change",ct),ct()}function Ai(e,t){Fe=e;const a=e.reduce((r,s)=>r+s.summary.totalCommission,0);Ee.innerHTML=`
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
                ${e.map(r=>`
                    <details class="bg-gray-50 p-3 rounded-lg border">
                        <summary class="flex justify-between items-center cursor-pointer">
                            <p class="font-bold text-gray-800">${r.professionalName}</p>
                            <p class="text-lg font-bold text-green-600">R$ ${r.summary.totalCommission.toFixed(2)}</p>
                        </summary>
                        <div class="mt-4 pt-4 border-t overflow-x-auto">
                            <table class="min-w-full text-xs"> 
                                <thead class="bg-gray-100"><tr>
                                    <th class="px-2 py-1 text-left">Data</th><th class="px-2 py-1 text-left">Item</th>
                                    <th class="px-2 py-1 text-right">Valor</th><th class="px-2 py-1 text-right">Taxa</th><th class="px-2 py-1 text-right">Comissão</th>
                                </tr></thead>
                                <tbody class="divide-y">
                                ${r.items.map(s=>`
                                    <tr>
                                        <td class="px-2 py-1">${new Date(s.date).toLocaleDateString("pt-BR")}</td>
                                        <td class="px-2 py-1">${s.item}</td>
                                        <td class="px-2 py-1 text-right">R$ ${s.value.toFixed(2)}</td>
                                        <td class="px-2 py-1 text-right">${s.commissionRate}%</td>
                                        <td class="px-2 py-1 text-right font-semibold">R$ ${s.commissionValue.toFixed(2)}</td>
                                    </tr>`).join("")}
                                </tbody>
                            </table>
                        </div>
                    </details>
                `).join("")}
                </div>
            </div>
        </section>
    `}async function qi(e={}){const{view:t="history",isLoading:a=!1}=e;if(ot&&Ee.removeEventListener("click",ot),ot=r=>{const s=r.target.closest("button[data-action]");if(!s)return;switch(s.dataset.action){case"open-calculator":Bi();break;case"back-to-history":F("commissions-section",{view:"history"});break;case"save-reports":Mi();break;case"generate-receipt":const n=JSON.parse(s.dataset.report.replace(/&apos;/g,"'"));Li(n);break;case"delete-report":const i=s.dataset.id;Ti(i);break}},Ee.addEventListener("click",ot),a){Ee.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A calcular comissões...</p></div>';return}if(!p.professionals||p.professionals.length===0)try{p.professionals=await _(p.establishmentId)}catch{g("Erro","Não foi possível carregar a lista de profissionais.","error"),p.professionals=[]}(t==="history"||t==="main")&&Pi()}const Bt=document.getElementById("content");let ge={allPackages:[],catalogForModal:{services:[],products:[]}},st=null,we=null;function Ni(e=6){let t="";for(let a=0;a<e;a++)t+=`
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
        `;return t}function Fi(){const e=document.getElementById("packagesListContainer");if(e){if(ge.allPackages.length===0){e.innerHTML=`
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
            </div>`;return}e.innerHTML=ge.allPackages.map(t=>{const a=t.status==="active",r=JSON.stringify(t).replace(/'/g,"&apos;"),s=t.price||0,o=t.originalPrice||0;t.commissionRate;const n=o>s?o-s:0,i=o>0?(o-s)/o*100:0;return`
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col cursor-pointer"
                 data-action="edit-package" data-package='${r}'>
                
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
                            <p class="text-2xl font-extrabold text-indigo-600">R$ ${s.toFixed(2)}</p>
                            ${n>0?`<p class="text-xs text-gray-500 line-through">De R$ ${o.toFixed(2)}</p>
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
        `}).join("")}}function Ra(){const e=document.getElementById("genericModal");e.style.display="none",we&&e.removeEventListener("click",we)}async function Ha(e=null){const t=document.getElementById("genericModal"),a=!!e,r=e?JSON.parse(JSON.stringify(e.items||[])):[],s=`
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
    `;t.innerHTML=s,t.style.display="flex";const o=t.querySelector("#package-items-list"),n=(d,l)=>{const c=l.querySelector("#originalPrice"),u=d.reduce((m,b)=>m+b.price*b.quantity,0);c&&(c.textContent=`R$ ${u.toFixed(2)}`)},i=d=>{d.length===0?o.innerHTML='<p class="text-center text-gray-500 p-4">Nenhum item adicionado.</p>':o.innerHTML=d.map((l,c)=>{const u=l.type==="service",m=u?"Serviço":"Produto",b=u?"bg-indigo-100 text-indigo-800":"bg-green-100 text-green-800";return`
                <div class="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-200">
                    <div class="flex items-center gap-3 min-w-0">
                        <input type="number" value="${l.quantity}" min="1" class="w-12 p-1 border rounded-md text-sm quantity-input flex-shrink-0" data-index="${c}">
                        <!-- (NOVO) Selo de Tipo -->
                        <span class="text-xs font-medium px-2 py-0.5 rounded-full ${b}">${m}</span>
                        <span class="font-medium text-gray-800 truncate">${l.name}</span>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="text-sm text-gray-600">R$ ${l.price.toFixed(2)}</span>
                        <!-- (MODIFICADO) Classe do botão de remover -->
                        <button type="button" class="text-red-500 hover:text-red-700 remove-item-btn font-bold" data-index="${c}">&times;</button>
                    </div>
                </div>
            `}).join(""),n(d,t)};i(r),o.addEventListener("change",d=>{if(d.target.classList.contains("quantity-input")){const l=parseInt(d.target.dataset.index,10),c=parseInt(d.target.value,10);c>0&&r[l]&&(r[l].quantity=c,i(r))}}),o.addEventListener("click",d=>{if(d.target.classList.contains("remove-item-btn")){const l=parseInt(d.target.dataset.index,10);r.splice(l,1),i(r)}}),t.querySelector("#add-item-to-package-btn").onclick=()=>Ri(d=>{const l=r.find(c=>c.id===d.id&&c.type===d.type);l?l.quantity++:r.push({...d,quantity:1}),i(r)}),we&&t.removeEventListener("click",we),we=async d=>{const l=d.target.closest("button[data-action]");if(!l)return;const c=l.dataset.action;if(d.stopPropagation(),c==="close-modal"&&Ra(),c==="save-package"){const u=l,m={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:r,originalPrice:r.reduce((b,f)=>b+f.price*f.quantity,0),price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null};if(!m.name||!m.price){g("Erro","Nome do Pacote e Preço Final são obrigatórios.","error");return}if(m.items.length===0){g("Erro","Adicione pelo menos um item ao pacote.","error");return}u.disabled=!0,u.textContent="A salvar...";try{a?await dr(m.id,m):(delete m.id,await lr(m)),g("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),Ra(),await la()}catch(b){g("Erro",`Não foi possível salvar o pacote: ${b.message}`,"error"),u.disabled=!1,u.textContent="Salvar Pacote"}}},t.addEventListener("click",we)}function Ri(e){let t="";const a=document.createElement("div");a.id="item-selection-modal",a.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[110]";const r={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'},s=d=>{const l=t.toLowerCase(),c=ge.catalogForModal.services.filter(f=>f.name.toLowerCase().includes(l)),u=ge.catalogForModal.products.filter(f=>f.name.toLowerCase().includes(l)),m=c.map(f=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${r.service}</div>
                <span class="flex-grow text-left min-w-0 truncate">${f.name}</span>
                <span class="font-semibold flex-shrink-0">R$ ${f.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum serviço encontrado.</p>',b=u.map(f=>`
            <button data-action="select-item" data-item-type="product" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${r.product}</div>
                <span class="flex-grow text-left min-w-0 truncate">${f.name}</span>
                <span class="font-semibold flex-shrink-0">R$ ${f.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum produto encontrado.</p>';d.innerHTML=`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto">${m}</div></div>
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
    `,document.body.appendChild(a);const o=a.querySelector("#item-selection-list"),n=a.querySelector("#item-search-input"),i=()=>{a.remove()};s(o),n.addEventListener("input",()=>{t=n.value,s(o)}),a.addEventListener("click",d=>{const l=d.target.closest('[data-action="select-item"]'),c=d.target.closest('[data-action="close-selection-modal"]');if(l){const{itemType:u,itemId:m}=l.dataset,f=(ge.catalogForModal[u+"s"]||[]).find(v=>v.id===m);f&&(e({...f,type:u}),i())}else(c||d.target===a)&&i()})}async function la(){Bt.innerHTML=`
        <section id="packages-page" class="p-4 sm:p-6">
             <div class="sticky top-0 z-10 bg-gray-100 sm:bg-transparent pt-3 pb-4 mb-6 -mx-4 -mt-4 sm:mx-0 sm:mt-0 sm:bg-transparent sm:pt-0 sm:pb-0 sm:static">
                <div class="flex justify-between items-center px-4 sm:px-0">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                </div>
            </div>
            
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20">
                ${Ni()}
            </div>
            
            <button data-action="new-package" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>
    `,st&&Bt.removeEventListener("click",st),st=e=>{if(e.target.closest('[data-action-stop-propagation="true"]')){e.stopPropagation();const r=e.target.closest('[data-action="delete-package"]');if(r){const s=r.dataset.id;T("Excluir Pacote","Tem a certeza que deseja excluir este pacote? Esta ação é irreversível.").then(async o=>{if(o)try{await cr(s),g("Sucesso!","Pacote excluído.","success"),await la()}catch(n){g("Erro",`Não foi possível excluir: ${n.message}`,"error")}})}return}const t=e.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!t)return;const a=t.dataset.action;if(a==="new-package")Ha(null);else if(a==="edit-package"){const r=JSON.parse(t.dataset.package);Ha(r)}},Bt.addEventListener("click",st);try{const[e,t,a]=await Promise.all([ao(p.establishmentId),Ie(p.establishmentId),ea(p.establishmentId)]);ge.allPackages=e,ge.catalogForModal={services:t.filter(r=>r.active),products:a},Fi()}catch{document.getElementById("packagesListContainer").innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar pacotes.</p>'}}const Hi=document.getElementById("content");let ji=null;async function Oi(){Hi.innerHTML=`
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
                        <p class="text-md text-gray-600">${z.currentUser.email||"E-mail não disponível"}</p>
                    </div>
                </div>
            </div>

            <div class="md:col-span-2">
                 <div id="professional-agenda-block" class="p-4 md:p-6 bg-white rounded-lg shadow-md space-y-6">
                    <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
                </div>
            </div>
        </div>
    `,await zi()}async function zi(){const e=document.getElementById("professional-agenda-block");e.innerHTML="";try{const t=p.userProfessionalId;if(t){const a=await es(t);ji=a,a.photo&&(document.getElementById("user-profile-avatar").src=a.photo),e.innerHTML=`
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
            `,Vi(a.id),document.getElementById("my-blocks-filter").addEventListener("change",s=>ft(a.id,s.target.value)),ft(a.id,"future")}else e.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(t){console.error("Erro ao carregar seção de profissional:",t),e.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${t.message}</p>
            </div>
        `}}function Vi(e){const t=document.getElementById("block-schedule-form");t.addEventListener("submit",async a=>{a.preventDefault();const r=t.querySelector("#blockDate").value,s=t.querySelector("#blockStartTime").value,o=t.querySelector("#blockEndTime").value,n=t.querySelector("#blockReason").value;if(!r||!s||!o){g("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(s>=o){g("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const i=new Date(`${r}T${s}:00`),d=new Date(`${r}T${o}:00`),l=t.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="A bloquear...";try{await vt({establishmentId:p.establishmentId,professionalId:e,reason:n||"Bloqueado (Meu Perfil)",startTime:i.toISOString(),endTime:d.toISOString()}),g("Sucesso","Agenda bloqueada com sucesso!","success"),t.reset();const c=document.getElementById("my-blocks-filter").value;ft(e,c)}catch(c){console.error("Erro ao bloquear agenda:",c),g("Erro",`Não foi possível bloquear a agenda: ${c.message}`,"error")}finally{l.disabled=!1,l.textContent="Bloquear Agenda"}})}async function ft(e,t="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const r=new Date;let s,o;t==="history"?(o=new Date,s=new Date,s.setFullYear(s.getFullYear()-1)):(s=new Date,o=new Date,o.setFullYear(o.getFullYear()+1));let i=(await bt(p.establishmentId,s.toISOString(),o.toISOString(),e)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));t==="history"?i=i.filter(d=>d.endTime<r).sort((d,l)=>l.startTime-d.startTime):i=i.filter(d=>d.endTime>=r).sort((d,l)=>d.startTime-l.startTime),i.length>0?(a.innerHTML=i.map(d=>{const l=d.startTime.toLocaleDateString("pt-BR"),c=`${d.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${d.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`;return`
                    <div class="flex items-center justify-between p-3 ${d.endTime<new Date?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${l} das ${c}</p>
                            <p class="text-sm text-gray-600">${d.reason||"Sem motivo"}</p>
                        </div>
                        <button data-block-id="${d.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(d=>{d.addEventListener("click",async l=>{const c=l.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await Qt(c),g("Sucesso","Bloqueio removido.","success"),ft(e,t)}catch(u){console.error("Erro ao remover bloqueio:",u),g("Erro",`Não foi possível remover o bloqueio: ${u.message}`,"error")}})})):a.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${t==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(r){console.error("Erro ao carregar bloqueios:",r),a.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${r.message}</p>`}}const ja=document.getElementById("loadingScreen"),Tt=document.getElementById("dashboardContent"),Dt=document.getElementById("content"),Oa=document.getElementById("notificationBell"),Mt=document.getElementById("notificationBadge"),rt=document.getElementById("notificationPanel"),za=document.getElementById("notificationList"),Pt=document.getElementById("profileMenuButton"),W=document.getElementById("profileDropdown"),Ui=document.getElementById("profileName"),_i=document.getElementById("profileEmail"),Ji=document.getElementById("logoutButton"),Wi=document.getElementById("cancellationHistoryBtn"),Va=document.getElementById("myProfileLink"),Ua={indigo:{main:"#4f46e5",light:"#e0e7ff",text:"white",hover:"#4338ca"},rose:{main:"#e11d48",light:"#ffe4e6",text:"white",hover:"#be123c"},green:{main:"#16a34a",light:"#d1fae5",text:"white",hover:"#15803d"},sky:{main:"#0284c7",light:"#e0f2fe",text:"white",hover:"#0369a1"},amber:{main:"#d97706",light:"#fef3c7",text:"#1f2937",hover:"#b45309"}};let Re=null,He=[];const Gi={"agenda-section":eo,"comandas-section":ta,"relatorios-section":Ht,"servicos-section":jr,"produtos-section":Yr,"profissionais-section":pt,"clientes-section":wt,"estabelecimento-section":bo,"ausencias-section":Kn,"users-section":gt,"sales-report-section":fi,"financial-section":Ei,"commissions-section":qi,"packages-section":la,"my-profile-section":Oi};function Yi(e){const t=Ua[e]||Ua.indigo,a=document.getElementById("dynamic-theme-styles"),s=(n=>{const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);return i?`${parseInt(i[1],16)}, ${parseInt(i[2],16)}, ${parseInt(i[3],16)}`:null})(t.main),o=e==="amber"?"#1f2937":"white";a.innerHTML=`
        .sidebar-link.active { 
            background-color: ${t.main}; 
            color: ${o}; 
        }
        .sidebar-link:not(.active):hover { 
            background-color: rgba(${s}, 0.2);
        }
    `}function Wt(){const e=He.filter(t=>!t.read).length;if(e>0?(Mt.textContent=e,Mt.classList.remove("hidden")):Mt.classList.add("hidden"),He.length===0){za.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}za.innerHTML=He.map(t=>`
    <div class="notification-item ${t.read?"":"unread"}">
    <p class="font-semibold">${t.title}</p>
    <p class="text-sm text-gray-600">${t.message}</p>
    <p class="text-xs text-gray-400 mt-1">${t.time}</p>
    </div>
    `).join("")}function Xi(e){Re&&Re();const t=Bo(Gt,"establishments",e,"notifications"),a=To(t,Do("timestamp",">=",new Date),Mo("timestamp","desc"));Re=Po(a,r=>{r.docChanges().forEach(s=>{if(s.type==="added"){const o=s.doc.data();He.unshift({title:o.title,message:o.message,time:o.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),g(o.title,o.message,"info",!0),Wt();const n=document.querySelector(".sidebar-link.active");n&&n.dataset.target==="agenda-section"&&(o.type==="cancellation"||o.type==="new_appointment")&&(console.log("Atualizando agenda em tempo real..."),eo())}})},r=>{console.error("Erro no listener de notificações em tempo real:",r),g("Erro de Conexão","Não foi possível receber atualizações em tempo real. Verifique as regras de segurança do Firestore.","error")})}function F(e,t={}){const a=e.replace("-section","");if(e!=="my-profile-section"){const s=p.enabledModules?.[a]!==!1,o=p.userPermissions===null||p.userPermissions[e]?.view===!0;if(!s||!o){Dt.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>',document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active"));return}}const r=Gi[e];r?(document.querySelectorAll(".sidebar-link").forEach(s=>{s.classList.toggle("active",s.getAttribute("data-target")===e)}),e==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(s=>s.classList.remove("active")),Dt.innerHTML="",r(t)):(Dt.innerHTML=`<div class="p-8 text-center"><h2 class="text-2xl font-bold">Página em Construção</h2><p class="text-gray-600">O módulo para "${e}" ainda não foi implementado.</p></div>`,console.warn(`Nenhum carregador de página definido para: ${e}`))}async function Qi(e){const t=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),r=document.getElementById("kpi-today-appointments"),s=document.getElementById("kpi-today-revenue"),o=e===null||e["agenda-section"]?.view===!0,n=e===null||e["financial-section"]?.view===!0;if(o&&t&&t.classList.remove("hidden"),n&&a&&a.classList.remove("hidden"),!(!o&&!n))try{const i=await hs();o&&r&&(r.textContent=i.todayAppointments.toString()),n&&s&&(s.textContent=`R$ ${i.todayRevenue.toFixed(2).replace(".",",")}`)}catch(i){console.error("Erro ao carregar KPIs do cabeçalho:",i),o&&r&&(r.textContent="Erro"),n&&s&&(s.textContent="Erro")}}async function Zi(e){try{ut.getPlatform()==="android"&&(await ae.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0}),console.log("Canal de notificação Android criado com sucesso."));let t=await ae.checkPermissions();if(t.receive==="prompt"&&(t=await ae.requestPermissions()),t.receive!=="granted"){console.warn("Permissão de notificação push foi negada pelo utilizador.");return}await ae.register(),ae.addListener("registration",async a=>{console.log("Push Token gerado:",a.value);try{const r=Wa(Gt,"users",e);await Lo(r,{fcmToken:a.value}),console.log("Token FCM salvo no perfil do utilizador.")}catch(r){console.error("Erro ao salvar token FCM:",r)}}),ae.addListener("registrationError",a=>{console.error("Erro no registo de push notifications:",a)}),ae.addListener("pushNotificationReceived",a=>{console.log("Notificação Push recebida:",a),g(a.title,a.body,"info",!0)}),ae.addListener("pushNotificationActionPerformed",a=>{console.log("Ação na notificação push:",a),F("agenda-section")})}catch(t){console.log("Push Notifications não suportado/inicializado:",t)}}function Ki(){_o(),Oa.addEventListener("click",e=>{e.stopPropagation(),rt.classList.toggle("hidden"),rt.classList.contains("hidden")||(He.forEach(t=>t.read=!0),Wt())}),Wi.addEventListener("click",()=>{Jo()}),Pt.addEventListener("click",e=>{e.stopPropagation(),W.classList.toggle("active"),W.classList.contains("active")?W.classList.remove("hidden"):setTimeout(()=>W.classList.add("hidden"),200)}),Va&&Va.addEventListener("click",e=>{e.preventDefault(),F("my-profile-section"),W.classList.remove("active"),W.classList.add("hidden")}),document.addEventListener("click",e=>{!rt.contains(e.target)&&e.target!==Oa&&rt.classList.add("hidden"),!W.contains(e.target)&&e.target!==Pt&&W.classList.contains("active")&&(W.classList.remove("active"),setTimeout(()=>W.classList.add("hidden"),200))}),$o(z,async e=>{if(e)try{const a=(await e.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="employee")&&a.establishmentId){const r=await _e(a.establishmentId);p.enabledModules=r.modules,Yi(r.themeColor);let s=null,o=e.displayName,n=null;if(a.role==="employee"||a.role==="owner"){const l=Wa(Gt,"users",e.uid),c=await Co(l);if(c.exists()){const u=c.data();s=a.role==="employee"?u.permissions||{}:null,o=u.name||o,n=u.professionalId||null}else if(a.role==="employee")throw new Error("Dados de permissão do funcionário não encontrados.")}p.userProfessionalId=n,Zi(e.uid);const i=o||e.email;qo(a.establishmentId,r.name,s),Pt.textContent=i.charAt(0).toUpperCase(),Ui.textContent=i,_i.textContent=e.email;const d=()=>{Re&&Re(),da(z).then(()=>window.location.href="/login.html")};Ji.addEventListener("click",l=>{l.preventDefault(),d()}),Xo(F,s,p.enabledModules),Qi(s),Xi(a.establishmentId),Wt(),ja.style.display="none",Tt.style.display="flex",F("agenda-section")}else throw new Error("Utilizador não tem permissão de 'owner' ou 'employee' ou 'establishmentId'.")}catch(t){console.error("Erro crítico na inicialização do painel:",t),ja.style.display="none",Tt.innerHTML=`
                    <div class="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
                        <h2 class="text-2xl font-bold text-red-600 mb-4">Erro de Acesso</h2>
                        <p class="text-gray-700 text-center mb-6">Não foi possível carregar os seus dados ou permissões. Isto pode acontecer se a sua conta foi desativada ou está configurada incorretamente.</p>
                        <p class="text-sm text-gray-500 mb-6">Detalhe do erro: ${t.message}</p>
                        <button id="errorLogoutButton" class="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700">Sair e Tentar Novamente</button>
                    </div>
                `,Tt.style.display="flex",document.getElementById("errorLogoutButton").addEventListener("click",()=>{da(z).then(()=>window.location.href="/login.html")})}else window.location.href="/login.html"})}Ki();
