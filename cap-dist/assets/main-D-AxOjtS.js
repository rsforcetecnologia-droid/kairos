import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{a as J,d as Q}from"./firebase-config-5GGiRrrP.js";import{EmailAuthProvider as Vo,reauthenticateWithCredential as Uo,verifyBeforeUpdateEmail as Jo,updatePassword as _o,updateProfile as Wo,onAuthStateChanged as Go,signOut as Ba}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{addDoc as pa,collection as Te,getDocs as mo,query as po,orderBy as go,doc as Bt,deleteDoc as Yo,updateDoc as bo,getDoc as Xo,where as Qo,onSnapshot as Zo}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";const p={establishmentId:null,establishmentName:null,userName:null,userProfessionalId:null,userPermissions:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function Ko(e,t,a){p.establishmentId=e,p.establishmentName=t,p.userPermissions=a}const Zt="https://kairos-service-603994960586.southamerica-east1.run.app";console.log("🚀 API configurada para Produção:",Zt);async function es(){const e=J.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function k(e,t={}){const a=await es();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const o=`${Zt}${e}`;console.log(`AuthenticatedFetch: ${t.method||"GET"} ${o}`);try{const r=await fetch(o,{...t,headers:{...a,...t.headers}});if(!r.ok){const n=(await r.json().catch(()=>({message:r.statusText}))).message||`Erro na API: ${r.status}`;if(n.includes("FAILED_PRECONDITION")&&n.includes("requires an index")){const i=/(https:\/\/[^\s]+)/,d=n.match(i),l=d?d[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${l}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${r.status}) em ${o}:`,n),new Error(n)}return r.json()}catch(r){throw console.error(`Falha de rede ao tentar acessar ${o}:`,r.message),r.message.includes("Failed to fetch")||r.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${Zt}. Verifique sua conexão com a internet.`):r}}const ts=(e,t,a,o=null)=>{let r=`/api/appointments/${e}?startDate=${t}&endDate=${a}`;return o&&(r+=`&professionalId=${o}`),k(r)},as=(e,t,a)=>{const o=`/api/appointments/cancelled/${e}?startDate=${t}&endDate=${a}`;return k(o)},os=({establishmentId:e,professionalId:t,serviceIds:a,date:o})=>{const r=`/api/availability?establishmentId=${e}&professionalId=${t}&serviceIds=${a.join(",")}&date=${o}`;return k(r)},ss=e=>k("/api/appointments",{method:"POST",body:JSON.stringify(e)}),ga=(e,t)=>k(`/api/appointments/${e}`,{method:"PUT",body:JSON.stringify(t)}),rs=e=>k(`/api/appointments/${e}`,{method:"DELETE"}),ns=e=>k(`/api/appointments/${e}/reopen`,{method:"POST"}),is=(e,t)=>k(`/api/appointments/${e}/checkout`,{method:"POST",body:JSON.stringify(t)});let R;async function ls(){if(!R)try{R=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function ds(){if(!R){console.warn("AudioContext não inicializado. O som não será tocado.");return}R.state==="suspended"&&R.resume();const e=R.createOscillator(),t=R.createGain();e.connect(t),t.connect(R.destination),e.type="sine",e.frequency.setValueAtTime(800,R.currentTime),t.gain.setValueAtTime(0,R.currentTime),t.gain.linearRampToValueAtTime(.3,R.currentTime+.01),t.gain.exponentialRampToValueAtTime(1e-4,R.currentTime+.2),e.start(R.currentTime),e.stop(R.currentTime+.2)}function g(e,t,a="info",o=!1){const r=document.getElementById("toast-container");if(!r)return;o&&ds();const s=document.createElement("div"),n={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},i={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},d={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};s.className=`toast ${n[a]||n.info}`,s.innerHTML=`
        <div class="toast-icon">${i[a]||i.info}</div>
        <div class="toast-content">
            <p class="font-bold">${e}</p>
            <p class="text-sm">${t}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${d[a]||d.info}"></div>
        </div>
    `,r.appendChild(s),s.querySelector(".toast-close").addEventListener("click",()=>s.remove()),setTimeout(()=>{s.remove()},4e3)}function A(e,t){const a=document.getElementById("genericModal");return new Promise(o=>{a.innerHTML=`
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
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",o(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",o(!1)}})}function N({title:e,contentHTML:t,maxWidth:a="max-w-4xl",showCloseButton:o=!0}){let r=document.getElementById("genericModal");const s=r.cloneNode(!1);r.parentNode.replaceChild(s,r),r=s;const n=()=>{r.style.display="none"},i=c=>{r.querySelector("#genericModalContentBody").innerHTML=c};r.innerHTML=`
        <div class="modal-content ${a} p-0 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
            
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${e}</h2>
                ${o?'<button data-close-modal class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>':""}
            </header>

            <div id="genericModalContentBody" class="flex-1 overflow-y-auto p-5">
                ${t}
            </div>
            
            <footer id="genericModalFooter" class="hidden"></footer>
        </div>
    `;const d=r.querySelector("[data-close-modal]");d&&(d.onclick=n);const l=r.querySelector('[data-action="close-modal"]');return l&&(l.onclick=n),r.addEventListener("click",c=>{c.target.closest(".modal-content")||n()}),r.style.display="flex",{modalElement:r,close:n,setContent:i}}function Tt(e){const t=document.getElementById(e);t&&(t.style.display="none")}function cs(){document.body.addEventListener("click",()=>{R||ls()},{once:!0}),document.addEventListener("click",e=>{const t=e.target.closest('[data-action="close-modal"]');if(t){const o=t.dataset.target;if(o){const r=document.getElementById(o);r&&(r.style.display="none")}}if(e.target.closest("[data-close-modal]")){const o=document.getElementById("genericModal");o&&(o.style.display="none")}})}async function Ta(){const e=document.getElementById("cancellationListContainer");if(!e)return;e.innerHTML='<div class="loader mx-auto"></div>';const t=document.getElementById("cancelStartDate").value,a=document.getElementById("cancelEndDate").value;try{const o=await as(p.establishmentId,t,a);if(o.length===0){e.innerHTML='<p class="text-center text-gray-500 py-4">Nenhum cancelamento encontrado para este período.</p>';return}e.innerHTML=o.map(r=>`
            <div class="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-bold text-gray-800">${r.clientName}</p>
                        <p class="text-sm text-gray-600">${new Date(r.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})} - ${r.serviceName}</p>
                        <p class="text-xs text-gray-500">com ${r.professionalName}</p>
                    </div>
                </div>
            </div>
        `).join("")}catch(o){e.innerHTML=`<p class="text-red-500 text-center py-4">Erro ao carregar histórico: ${o.message}</p>`}}function us(){const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const o=`
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
    `,{modalElement:r}=N({title:"Histórico de Cancelamentos",contentHTML:o,maxWidth:"max-w-3xl"});r.querySelector("#searchCancellationsBtn").addEventListener("click",Ta),Ta()}const z=document.getElementById("sidebar"),Da=document.getElementById("sidebarToggle"),Fe=document.getElementById("mainContent"),ms=document.querySelectorAll(".sidebar-link"),Ma=document.getElementById("hamburger-menu-btn"),Ce=document.getElementById("mobile-overlay");function vt(e){!z||!Fe||(z.classList.toggle("collapsed",e),Fe.classList.toggle("sidebar-collapsed-shift",e))}function ps(){!z||!Ce||(z.classList.add("mobile-open"),Ce.classList.add("visible"))}function st(){!z||!Ce||(z.classList.remove("mobile-open"),Ce.classList.remove("visible"))}function gs(){vt(!z.classList.contains("collapsed"))}function bs(e,t,a){if(!z||!Fe)return;Fe.classList.add("main-content-shift"),window.innerWidth>=768?vt(z.classList.contains("collapsed")):(Fe.classList.remove("main-content-shift","sidebar-collapsed-shift"),st()),Da&&Da.addEventListener("click",r=>{r.stopPropagation(),gs()}),z.addEventListener("mouseenter",()=>{window.innerWidth>=1024&&z.classList.contains("collapsed")&&vt(!1)}),z.addEventListener("mouseleave",()=>{window.innerWidth>=1024&&(document.querySelector("#sidebarToggle:hover")||vt(!0))}),Ma&&Ma.addEventListener("click",r=>{r.stopPropagation(),ps()}),Ce&&Ce.addEventListener("click",r=>{r.stopPropagation(),st()});let o=0;z.addEventListener("touchstart",r=>{o=r.changedTouches[0].screenX},{passive:!0}),z.addEventListener("touchend",r=>{const s=r.changedTouches[0].screenX;o-s>50&&st()},{passive:!0}),ms.forEach(r=>{const s=r.getAttribute("data-target"),n=s.replace("-section",""),i=a?.[n]!==!1,d=t===null||t[s]?.view===!0;if(!i||!d){r.style.display="none";return}r.style.display="flex",r.addEventListener("click",l=>{l.preventDefault(),s&&typeof e=="function"&&e(s),window.innerWidth<768&&st()})})}const Qe=e=>{const t=e||p.establishmentId;return t?k(`/api/establishments/${t}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},fs=(e,t)=>{const a=e||p.establishmentId;return a?k(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(t)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},vs=(e,t)=>{const a=e||p.establishmentId;return a?k(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},hs=(e,t)=>{const a=e||p.establishmentId;return a?k(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},_=e=>k(`/api/professionals/${e}`),xs=e=>k(`/api/professionals/details/${e}`),ys=e=>k("/api/professionals",{method:"POST",body:JSON.stringify(e)}),ws=(e,t)=>k(`/api/professionals/${e}`,{method:"PUT",body:JSON.stringify(t)}),ks=e=>k(`/api/professionals/${e}`,{method:"DELETE"});var Ie;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(Ie||(Ie={}));class Ht extends Error{constructor(t,a,o){super(t),this.message=t,this.code=a,this.data=o}}const $s=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},Ss=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},o=a.Plugins=a.Plugins||{},r=()=>t!==null?t.name:$s(e),s=()=>r()!=="web",n=u=>{const m=l.get(u);return!!(m?.platforms.has(r())||i(u))},i=u=>{var m;return(m=a.PluginHeaders)===null||m===void 0?void 0:m.find(b=>b.name===u)},d=u=>e.console.error(u),l=new Map,c=(u,m={})=>{const b=l.get(u);if(b)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),b.proxy;const f=r(),v=i(u);let y;const h=async()=>(!y&&f in m?y=typeof m[f]=="function"?y=await m[f]():y=m[f]:t!==null&&!y&&"web"in m&&(y=typeof m.web=="function"?y=await m.web():y=m.web),y),x=(M,q)=>{var F,O;if(v){const se=v?.methods.find(W=>q===W.name);if(se)return se.rtype==="promise"?W=>a.nativePromise(u,q.toString(),W):(W,at)=>a.nativeCallback(u,q.toString(),W,at);if(M)return(F=M[q])===null||F===void 0?void 0:F.bind(M)}else{if(M)return(O=M[q])===null||O===void 0?void 0:O.bind(M);throw new Ht(`"${u}" plugin is not implemented on ${f}`,Ie.Unimplemented)}},S=M=>{let q;const F=(...O)=>{const se=h().then(W=>{const at=x(W,M);if(at){const ot=at(...O);return q=ot?.remove,ot}else throw new Ht(`"${u}.${M}()" is not implemented on ${f}`,Ie.Unimplemented)});return M==="addListener"&&(se.remove=async()=>q()),se};return F.toString=()=>`${M.toString()}() { [capacitor code] }`,Object.defineProperty(F,"name",{value:M,writable:!1,configurable:!1}),F},E=S("addListener"),T=S("removeListener"),D=(M,q)=>{const F=E({eventName:M},q),O=async()=>{const W=await F;T({eventName:M,callbackId:W},q)},se=new Promise(W=>F.then(()=>W({remove:O})));return se.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await O()},se},H=new Proxy({},{get(M,q){switch(q){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return v?D:E;case"removeListener":return T;default:return S(q)}}});return o[u]=H,l.set(u,{name:u,proxy:H,platforms:new Set([...Object.keys(m),...v?[f]:[]])}),H};return a.convertFileSrc||(a.convertFileSrc=u=>u),a.getPlatform=r,a.handleError=d,a.isNativePlatform=s,a.isPluginAvailable=n,a.registerPlugin=c,a.Exception=Ht,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Es=e=>e.Capacitor=Ss(e),_e=Es(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),ba=_e.registerPlugin;class fo{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let o=!1;this.listeners[t]||(this.listeners[t]=[],o=!0),this.listeners[t].push(a);const s=this.windowListeners[t];s&&!s.registered&&this.addWindowListener(s),o&&this.sendRetainedArgumentsForEvent(t);const n=async()=>this.removeListener(t,a);return Promise.resolve({remove:n})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,o){const r=this.listeners[t];if(!r){if(o){let s=this.retainedEventArguments[t];s||(s=[]),s.push(a),this.retainedEventArguments[t]=s}return}r.forEach(s=>s(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:o=>{this.notifyListeners(a,o)}}}unimplemented(t="not implemented"){return new _e.Exception(t,Ie.Unimplemented)}unavailable(t="not available"){return new _e.Exception(t,Ie.Unavailable)}async removeListener(t,a){const o=this.listeners[t];if(!o)return;const r=o.indexOf(a);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(o=>{this.notifyListeners(t,o)}))}}const Pa=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Aa=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Cs extends fo{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(o=>{if(o.length<=0)return;let[r,s]=o.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=Aa(r).trim(),s=Aa(s).trim(),a[r]=s}),a}async setCookie(t){try{const a=Pa(t.key),o=Pa(t.value),r=`; expires=${(t.expires||"").replace("expires=","")}`,s=(t.path||"/").replace("path=",""),n=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${o||""}${r}; path=${s}; ${n};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}ba("CapacitorCookies",{web:()=>new Cs});const Is=async e=>new Promise((t,a)=>{const o=new FileReader;o.onload=()=>{const r=o.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},o.onerror=r=>a(r),o.readAsDataURL(e)}),Ls=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,s,n)=>(r[s]=e[t[n]],r),{})},Bs=(e,t=!0)=>e?Object.entries(e).reduce((o,r)=>{const[s,n]=r;let i,d;return Array.isArray(n)?(d="",n.forEach(l=>{i=t?encodeURIComponent(l):l,d+=`${s}=${i}&`}),d.slice(0,-1)):(i=t?encodeURIComponent(n):n,d=`${s}=${i}`),`${o}&${d}`},"").substr(1):null,Ts=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),r=Ls(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[n,i]of Object.entries(e.data||{}))s.set(n,i);a.body=s.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const s=new FormData;if(e.data instanceof FormData)e.data.forEach((i,d)=>{s.append(d,i)});else for(const i of Object.keys(e.data))s.append(i,e.data[i]);a.body=s;const n=new Headers(a.headers);n.delete("content-type"),a.headers=n}else(r.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class Ds extends fo{async request(t){const a=Ts(t,t.webFetchExtra),o=Bs(t.params,t.shouldEncodeUrlParams),r=o?`${t.url}?${o}`:t.url,s=await fetch(r,a),n=s.headers.get("content-type")||"";let{responseType:i="text"}=s.ok?t:{};n.includes("application/json")&&(i="json");let d,l;switch(i){case"arraybuffer":case"blob":l=await s.blob(),d=await Is(l);break;case"json":d=await s.json();break;case"document":case"text":default:d=await s.text()}const c={};return s.headers.forEach((u,m)=>{c[m]=u}),{data:d,headers:c,status:s.status,url:s.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}ba("CapacitorHttp",{web:()=>new Ds});const re=ba("PushNotifications",{}),Ms=(e,t,a="all",o="all")=>{const r={startDate:e,endDate:t};a&&a!=="all"&&(r.professionalId=a),o&&o!=="all"&&(r.costCenterId=o);const s=new URLSearchParams(r).toString();return k(`/api/reports/indicators?${s}`)},Ps=(e,t="all")=>{const a={date:e};t&&t!=="all"&&(a.professionalId=t);const o=new URLSearchParams(a).toString();return k(`/api/reports/appointments/list?${o}`)},As=()=>k("/api/financial/cost-centers"),qs=({establishmentId:e,startDate:t,endDate:a,cashierSessionId:o})=>{let r=`/api/reports/sales/${e}?startDate=${t}&endDate=${a}`;return o&&o!=="all"&&(r+=`&cashierSessionId=${o}`),k(r)},Ns=()=>k("/api/reports/summary",{method:"GET"}),De=e=>k(`/api/services/${e}`),Fs=e=>k("/api/services",{method:"POST",body:JSON.stringify(e)}),Rs=(e,t)=>k(`/api/services/${e}`,{method:"PUT",body:JSON.stringify(t)}),js=e=>k(`/api/services/${e}`,{method:"DELETE"}),Hs=(e,t)=>k(`/api/services/${e}/status`,{method:"PATCH",body:JSON.stringify({active:t})}),Os=e=>k(`/api/services/stats/most-popular/${e}`),Dt=(e,t,a,o="all")=>{const r=`/api/blockages/${e}?startDate=${t}&endDate=${a}&professionalId=${o}`;return k(r)},Mt=e=>k("/api/blockages",{method:"POST",body:JSON.stringify(e)}),fa=e=>k(`/api/blockages/${e}`,{method:"DELETE"}),vo=e=>k("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:e})}),Ze=e=>k(`/api/clients/${e}`),va=e=>k("/api/clients",{method:"POST",body:JSON.stringify(e)}),zs=(e,t)=>k(`/api/clients/${e}`,{method:"PUT",body:JSON.stringify(t)}),Vs=e=>k(`/api/clients/${e}`,{method:"DELETE"}),Us=(e,t,a)=>{const o=`/api/clients/history/${e}?clientName=${encodeURIComponent(t)}&clientPhone=${encodeURIComponent(a)}`;return k(o)},Js=(e,t,a)=>{const o=`/api/clients/loyalty-history/${e}?clientName=${encodeURIComponent(t)}&clientPhone=${encodeURIComponent(a)}`;return k(o)},_s=(e,t,a,o)=>k("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:e,clientName:t,clientPhone:a,rewardData:o})}),qa=document.getElementById("content");let Na=!1;const Kt=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5"},{bg:"#d1fae5",border:"#059669",main:"#059669"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48"},{bg:"#fef3c7",border:"#d97706",main:"#d97706"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed"},{bg:"#fce7f3",border:"#db2777",main:"#db2777"}];let Ke=[],Pt=[],We={},ae=[],I={currentView:"list",weekViewDays:7,currentDate:new Date,selectedProfessionalId:"all",profSearchTerm:"",showInactiveProfs:!1,scrollToAppointmentId:null},$={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function Ws(e){return new Intl.DateTimeFormat("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).format(e).replace(/\./g,"")}function ho(e){const t=new Date(e);if(t.setHours(0,0,0,0),I.currentView==="week"&&I.weekViewDays===7){const a=t.getDay(),o=t.getDate()-a+(a===0?-6:1);return new Date(t.setDate(o))}return t}function kt(){const e=document.getElementById("profSelectorContainer"),t=I.profSearchTerm.toLowerCase();if(!e||!p.professionals)return;let a=p.professionals.filter(s=>I.showInactiveProfs||s.status!=="inactive");t&&(a=a.filter(s=>s.name.toLowerCase().includes(t)));const r=[...[{id:"all",name:"Todos",photo:null,status:"active"}],...a];e.innerHTML=r.map(s=>{const n=I.selectedProfessionalId===s.id,i=s.name==="Todos"?"Todos":s.name.split(" ")[0],d=s.name==="Todos"?"T":s.name.charAt(0).toUpperCase(),l=s.status!=="inactive",c=Kt[0],u=s.id!=="all"&&p.professionalColors.get(s.id)||c,m=s.photo||`https://placehold.co/64x64/${u.main?.replace("#","")||"E0E7FF"}/${u.light?.replace("#","")||"4F46E5"}?text=${d}`,b=s.id==="all"?"#e0e7ff":u.light,f=s.id==="all"?"#4f46e5":u.main,y=`border: 3px solid ${n?u.border:"transparent"}; box-shadow: ${n?"0 0 0 2px "+u.border:"none"};`;return`
            <div class="prof-card ${n?"selected":""} ${l?"":"opacity-50"}" 
                 data-action="select-professional" 
                 data-prof-id="${s.id}">
                ${s.id==="all"?`<div class="prof-card-all-placeholder" style="background-color: ${b}; color: ${f}; ${y}">
                           ${d}
                          </div>`:`<img src="${m}" alt="${s.name}" class="prof-card-photo" style="${y}" />`}
                <span class="prof-card-name">${i}</span>
            </div>
        `}).join("")}function Gs(e,t,a,o,r){const s=(e||"").replace(/\D/g,""),n=new Date(r).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),i=new Date(r).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=`Olá, ${t}! Você tem um agendamento de ${a} com o(a) profissional ${o} para o dia ${n} às ${i}. Podemos confirmar? Agradecemos a preferência!`,l=encodeURIComponent(d);return`https://wa.me/${s}?text=${l}`}function Ys(e){const t=document.getElementById("agenda-view");if(e.sort((o,r)=>new Date(o.startTime)-new Date(r.startTime)),e.length===0){t.innerHTML='<div class="text-center p-10 text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum agendamento ou bloqueio</h3><p class="mt-1 text-sm text-gray-500">Não há eventos para o dia e filtros selecionados.</p></div>';return}const a=e.map(o=>{const r=new Date(o.startTime),s=new Date(o.endTime),n=r.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),i=s.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=p.professionalColors.get(o.professionalId)||{};if(o.type==="blockage")return`
                <div class="appointment-list-card bg-red-50" style="border-left-color: ${d.border};">
                    <div class="time-info">
                        <p class="font-bold text-md">${n}</p>
                        <p class="text-xs text-gray-500">${i}</p>
                    </div>
                    <div class="details-info min-w-0">
                        <p class="font-bold text-red-800 truncate">${o.reason}</p>
                        <p class="text-sm text-gray-600 truncate">com ${o.professionalName}</p>
                    </div>
                    <div class="status-info">
                        <span class="status-badge bg-red-100 text-red-800">Bloqueio</span>
                    </div>
                </div>`;const l=o.status==="completed",c=l?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800",u=l?"Finalizado":"Aberto",m=JSON.stringify(o).replace(/'/g,"&apos;"),b=o.redeemedReward?.points>0,f=o.hasRewards&&!b,v=Gs(o.clientPhone,o.clientName,o.serviceName,o.professionalName,o.startTime);return`
            <div class="appointment-list-card" data-appointment='${m}' style="border-left-color: ${d.border};">
                
                <div class="time-info" data-action="open-comanda">
                    <p class="font-bold text-md">${n}</p>
                    <p class="text-xs text-gray-500">${i}</p>
                </div>

                <div class="details-info min-w-0" data-action="open-comanda">
                    <p class="font-bold text-gray-800 truncate">${f?"🎁 ":""}${o.clientName}</p>
                    <p class="text-sm text-gray-600 truncate">${o.serviceName}</p>
                    <p class="text-xs text-gray-500 truncate">com ${o.professionalName||"Indefinido"}</p>
                    
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
                        <button data-action="delete-appointment" data-id="${o.id}" class="action-btn" title="Apagar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                </div>
            </div>`}).join("");t.innerHTML=`<div class="list-view-container">${a}</div>`}function ha(){return window.innerWidth<768&&I.currentView==="week"?3:I.weekViewDays}function Xs(e){const t=document.getElementById("agenda-view"),a=["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],o=ho(I.currentDate),r=ha();let s=`<div class="grid divide-x divide-gray-200 min-h-[60vh]" style="grid-template-columns: repeat(${r}, minmax(0, 1fr));">`;for(let n=0;n<r;n++){const i=new Date(o);i.setDate(i.getDate()+n);const d=new Date,l=i.toDateString()===d.toDateString(),c=e.filter(m=>new Date(m.startTime).toDateString()===i.toDateString()).sort((m,b)=>new Date(m.startTime)-new Date(b.startTime));let u='<div class="p-1 space-y-2">';c.length>0?u+=c.map(m=>{const f=new Date(m.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),v=p.professionalColors.get(m.professionalId)||{bg:"#e5e7eb",border:"#9ca3af"};if(m.type==="blockage")return`
                        <div class="p-2 rounded-lg border-l-4 flex flex-col bg-red-100" style="border-left-color: ${v.border};">
                            <span class="font-bold text-xs text-red-900">${f}</span>
                            <div class="mt-1 min-w-0">
                                <p class="font-semibold text-sm text-red-800 truncate">${m.reason}</p>
                                <p class="text-xs text-red-600 truncate">com ${m.professionalName}</p>
                            </div>
                        </div>
                    `;const y=JSON.stringify(m).replace(/'/g,"&apos;"),h=m.redeemedReward?.points>0,x=m.hasRewards&&!h,S=m.status==="completed";return`
                    <div class="p-2 rounded-lg border-l-4 flex flex-col cursor-pointer" 
                         style="background-color: ${v.bg}; border-left-color: ${v.border};"
                         data-action="open-comanda" data-appointment='${y}'>
                        
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-xs text-gray-900">${f}</span>
                            ${S?'<span class="text-[10px] font-semibold bg-green-200 text-green-800 px-1 rounded-sm">OK</span>':""}
                        </div>

                        <div class="mt-1 min-w-0">
                            <p class="font-semibold text-sm text-gray-800 truncate">${x?"🎁 ":""}${m.clientName}</p>
                            <p class="text-xs text-gray-600 truncate">${m.serviceName}</p>
                            <p class="text-xs text-gray-500 truncate">com ${m.professionalName||"Indefinido"}</p>
                            ${h?'<p class="text-xs text-purple-600 truncate">Resgate</p>':""}
                        </div>
                        
                        </div>
                `}).join(""):u+='<div class="text-center text-xs text-gray-400 pt-4">Nenhum evento</div>',u+="</div>",s+=`
            <div class="flex flex-col">
                <div class="text-center py-2 border-b ${l?"bg-indigo-100 text-indigo-700":"bg-gray-50"}">
                    <p class="font-bold">${a[i.getDay()]}</p>
                    <p class="text-sm">${i.getDate()}/${i.getMonth()+1}</p>
                </div>
                <div class="flex-grow overflow-y-auto">${u}</div>
            </div>
        `}s+="</div>",t.innerHTML=s}function Qs(){const e=p.allEvents.filter(t=>I.selectedProfessionalId==="all"||t.professionalId===I.selectedProfessionalId);I.currentView==="list"?Ys(e):Xs(e)}async function Z(){const e=document.getElementById("agenda-view");if(!e)return;e.innerHTML='<div class="loader mx-auto my-10"></div>';let t,a;const o=document.getElementById("weekRange");if(I.currentView==="list")t=new Date(I.currentDate),t.setHours(0,0,0,0),a=new Date(I.currentDate),a.setHours(23,59,59,999),o.textContent=Ws(t);else{const r=ha();t=ho(new Date(I.currentDate)),a=new Date(t),a.setDate(t.getDate()+(r-1)),a.setHours(23,59,59,999),o.textContent=`${t.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})} - ${a.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})}`}try{const r=await ts(p.establishmentId,t.toISOString(),a.toISOString(),I.selectedProfessionalId==="all"?null:I.selectedProfessionalId),n=(await Dt(p.establishmentId,t.toISOString(),a.toISOString(),I.selectedProfessionalId)).map(d=>{let l=d.professionalName;if(!l&&d.professionalId){const c=p.professionals?p.professionals.find(u=>u.id===d.professionalId):null;c&&(l=c.name)}return{...d,type:"blockage",professionalName:l||"Não identificado"}}),i=[...r.map(d=>({...d,type:"appointment"})),...n];if(p.allEvents=i,kt(),Qs(),I.scrollToAppointmentId){const d=document.querySelector(`[data-appointment*='"id":"${I.scrollToAppointmentId}"']`);d&&(d.scrollIntoView({behavior:"smooth",block:"center"}),d.style.transition="background-color 0.5s ease-in-out",d.style.backgroundColor="#e0e7ff",setTimeout(()=>{d.style.backgroundColor=""},2500)),I.scrollToAppointmentId=null}}catch(r){g("Erro na Agenda",`Não foi possível carregar a agenda: ${r.message}`,"error"),e.innerHTML='<div class="p-6 text-center text-red-600">Falha ao carregar dados.</div>'}}async function Zs(){try{const[e,t,a,o]=await Promise.all([p.professionals&&p.professionals.length>0?Promise.resolve(p.professionals):_(p.establishmentId),p.services&&p.services.length>0?Promise.resolve(p.services):De(p.establishmentId),ae.length>0?Promise.resolve(ae):Ze(p.establishmentId),We.enabled!==void 0?Promise.resolve(null):Qe(p.establishmentId)]);(!p.professionals||p.professionals.length===0)&&(p.professionals=e||[]),(!p.services||p.services.length===0)&&(p.services=t||[]),ae.length===0&&(ae=a||[]),o&&(We=o.loyaltyProgram||{enabled:!1}),p.professionals.forEach((r,s)=>{p.professionalColors.set(r.id,Kt[s%Kt.length])}),kt()}catch(e){console.error("Erro ao popular filtros e dependências do modal:",e),g("Atenção","Não foi possível pré-carregar os dados para agendamento. A abertura do modal pode ser lenta.","error")}}function ea(e){e<1||e>4||($.step=e,ta(null,!0))}function xo(e,t){const a=document.getElementById("multiServiceToggle"),o=a&&a.checked,r=t.classList.contains("selected"),s=$.data.selectedServiceIds.indexOf(e);if(r)t.classList.remove("selected","border-blue-500"),s>-1&&$.data.selectedServiceIds.splice(s,1);else{if(!o){$.data.selectedServiceIds=[];const n=document.getElementById("apptServicesContainer");n&&n.querySelectorAll(".service-card.selected").forEach(i=>{i.classList.remove("selected","border-blue-500")})}t.classList.add("selected","border-blue-500"),$.data.selectedServiceIds.push(e)}}function yo(e,t){const a=document.querySelector(".professional-step-cards");if(!a)return;a.querySelectorAll(".professional-modal-card").forEach(r=>r.classList.remove("selected","border-blue-500")),t.classList.add("selected","border-blue-500");const o=Pt.find(r=>r.id===e);$.data.professionalId=e,$.data.professionalName=o?o.name:"N/A"}function Ks(e,t){const a=document.getElementById("availableTimesContainer");a&&(a.querySelectorAll(".time-slot-card").forEach(o=>o.classList.remove("selected")),t.classList.add("selected"),$.data.time=e)}async function Fa(){const e=document.getElementById("apptTotalDuration"),t=document.getElementById("availableTimesContainer");if(!e||!t)return;const a=$.data.professionalId,o=$.data.selectedServiceIds,r=document.getElementById("apptDate").value;$.data.date=r;const s=o.reduce((n,i)=>{const d=Ke.find(l=>l.id===i);return n+(d?d.duration+(d.bufferTime||0):0)},0);if(e.textContent=`${s} min`,s===0||!a||!r){t.innerHTML='<p class="col-span-full text-center text-gray-500">Selecione serviço, profissional e data.</p>';return}t.innerHTML='<div class="loader mx-auto col-span-full"></div>';try{let n=await os({establishmentId:p.establishmentId,professionalId:a,serviceIds:o,date:r});const i=new Date;if(new Date(r+"T00:00:00").toDateString()===i.toDateString()){const l=i.getHours()*60+i.getMinutes();n=n.filter(c=>{const[u,m]=c.split(":").map(Number);return u*60+m>=l})}if(t.innerHTML="",n.length>0){if(n.forEach(l=>{const c=document.createElement("button");c.type="button",c.className=`time-slot-card p-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition ${$.data.time===l?"selected":""}`,c.textContent=l,c.addEventListener("click",()=>Ks(l,c)),t.appendChild(c)}),$.data.time){const l=t.querySelector(`[data-action="time-slot"][data-time="${$.data.time}"]`);l&&l.classList.add("selected")}}else t.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum horário disponível.</p>'}catch(n){console.error("Erro ao buscar horários:",n),t.innerHTML='<p class="col-span-full text-center text-red-500">Erro ao buscar horários.</p>'}}function er(){const e=document.getElementById("loyaltyRewardsContainer");if(!e)return;const{clientHasRewards:t,clientLoyaltyPoints:a,redeemedReward:o}=$.data,{enabled:r,rewards:s,pointsPerCurrency:n}=We;if(!r||!t||!s||s.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");const i=s.filter(l=>a>=l.points);let d=`
        <h4 class="text-md font-semibold text-gray-700 mb-2">🎁 Prêmios Disponíveis (${a} pontos)</h4>
    `;i.length>0?(d+='<div class="space-y-2">',d+=i.map(l=>{const c=o?.reward===l.reward;return`
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
            `}).join(""),d+="</div>"):d+='<p class="text-sm text-gray-600">Pontos insuficientes para resgatar os prêmios disponíveis.</p>',e.innerHTML=d,e.querySelectorAll('input[name="loyaltyReward"]').forEach(l=>{l.addEventListener("change",c=>{c.target.checked&&($.data.redeemedReward={reward:c.target.value,points:parseInt(c.target.dataset.points,10)})})}),e.insertAdjacentHTML("beforeend",`
        <label class="flex items-center p-3 mt-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
            <input type="radio" name="loyaltyReward" class="form-radio text-gray-400" 
                   value="none" 
                   ${o?"":"checked"}>
            <span class="ml-3 text-gray-600">Não resgatar prêmio agora</span>
        </label>
    `),e.querySelector('input[value="none"]').addEventListener("change",l=>{l.target.checked&&($.data.redeemedReward=null)})}async function tr(e){e.preventDefault();const t=e.target,a=t.querySelector('button[type="submit"]');if(!$.data.time||$.data.selectedServiceIds.length===0||!$.data.professionalId)return g("Erro de Validação","Por favor, selecione o horário, serviço(s) e profissional antes de confirmar.","error");a.disabled=!0,a.textContent="A confirmar...";const o=$.data.selectedServiceIds.map(l=>{const c=Ke.find(u=>u.id===l);return{id:c.id,name:c.name,price:c.price,duration:c.duration,bufferTime:c.bufferTime||0,photo:c.photo||null}}),[r,s]=$.data.time.split(":"),n=new Date(`${$.data.date}T${r}:${s}:00`),i={establishmentId:p.establishmentId,clientName:$.data.clientName,clientPhone:$.data.clientPhone,services:o,professionalId:$.data.professionalId,startTime:n.toISOString(),redeemedReward:$.data.redeemedReward},d=t.querySelector("#appointmentId").value;d&&(i.id=d);try{d?await ga(d,i):await ss(i),g(`Agendamento ${d?"atualizado":"criado"} com sucesso!`,"success"),document.getElementById("appointmentModal").style.display="none",Z()}catch(l){g(l.message,"error")}finally{a.disabled=!1,a.textContent="Confirmar Agendamento"}}function ar(e){return`
        <div class="client-search-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-blue-50 ${$.data.clientName===e.name&&$.data.clientPhone===e.phone?"selected border-blue-500":""}" 
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
    `}async function Ra(e){const t=document.getElementById("clientSearchResults");if(!t)return;const a=e.toLowerCase().trim();if(a.length<3){t.innerHTML='<p class="text-sm text-gray-500">Digite pelo menos 3 caracteres para buscar clientes existentes.</p>';return}const o=ae.filter(r=>r.name.toLowerCase().includes(a)||r.phone.includes(a));if(o.length===0){t.innerHTML='<p class="text-sm text-gray-500">Nenhum cliente encontrado com este termo.</p>';return}t.innerHTML=o.map(ar).join(""),t.querySelectorAll('[data-action="select-client"]').forEach(r=>{r.addEventListener("click",s=>{const n=r.dataset.clientName,i=r.dataset.clientPhone,d=ae.find(l=>l.phone===i&&l.name===n);if($.data.clientName=n,$.data.clientPhone=i,d){const l=We,c=Math.min(...(l?.rewards||[]).map(u=>u.points));$.data.clientLoyaltyPoints=d.loyaltyPoints||0,$.data.clientHasRewards=l.enabled&&c!==1/0&&$.data.clientLoyaltyPoints>=c}else $.data.clientHasRewards=!1,$.data.clientLoyaltyPoints=0;document.getElementById("apptClientName").value=n,document.getElementById("apptClientPhone").value=i,document.querySelectorAll(".client-search-card").forEach(l=>l.classList.remove("selected","border-blue-500")),r.classList.add("selected","border-blue-500")})})}async function or(e){e.preventDefault();const t=document.getElementById("clientRegistrationForm"),a=t.querySelector('button[type="submit"]'),o={establishmentId:p.establishmentId,name:t.querySelector("#regClientName").value.trim(),email:t.querySelector("#regClientEmail").value.trim(),phone:t.querySelector("#regClientPhone").value.trim(),dobDay:t.querySelector("#regClientDobDay").value.trim(),dobMonth:t.querySelector("#regClientDobMonth").value.trim(),notes:t.querySelector("#regClientNotes").value.trim()};if(!o.name||!o.phone)return g("Erro de Validação","Nome e Telefone são obrigatórios.","error");a.disabled=!0,a.textContent="A salvar...";try{await va(o),ae.push({name:o.name,phone:o.phone,loyaltyPoints:0}),$.data.clientName=o.name,$.data.clientPhone=o.phone,$.data.clientHasRewards=!1,$.data.clientLoyaltyPoints=0,g("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",ea(1)}catch(r){g(`Erro ao cadastrar cliente: ${r.message}`,"error")}finally{a.disabled=!1,a.textContent="Salvar"}}function sr(){N({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("clientRegistrationForm");t&&t.addEventListener("submit",or)}function rr(){sr()}function nr(e,t){const a=e?"Editar Agendamento":"Selecionar Cliente",o=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">1. Dados do Cliente</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="apptClientName" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="apptClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="Nome Completo" value="${$.data.clientName}">
                </div>
                <div>
                    <label for="apptClientPhone" class="block text-sm font-medium text-gray-700">Telemóvel</label>
                    <input type="tel" id="apptClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="(XX) XXXXX-XXXX" value="${$.data.clientPhone}">
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
    `;return{title:a,content:o}}function ir(){const e="Selecionar Serviço",a=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">2. Serviços</h3>
             
             <div class="flex flex-col sm:flex-row items-center gap-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
                 <input type="search" id="serviceSearchModalInput" placeholder="Buscar Serviço..." class="w-full sm:flex-grow p-3 pl-10 border rounded-lg">
                 
                 <label class="flex items-center space-x-2 cursor-pointer flex-shrink-0">
                     <div class="relative">
                         <input type="checkbox" id="multiServiceToggle" class="sr-only" ${$.data.selectedServiceIds.length>1?"checked":""}>
                         <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full transition-colors"></div>
                         <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" style="transition: all 0.3s;"></div>
                     </div>
                     <span class="text-sm font-medium text-gray-700">Selecionar Vários</span>
                 </label>
            </div>
            
            <div id="apptServicesContainer" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-1">
                 ${Ke.map(o=>{const r=$.data.selectedServiceIds.includes(o.id),s=o.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
                         <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${r?"selected border-blue-500":""}" data-service-id="${o.id}">
                             <div class="flex items-center">
                                 <img src="${s}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                                 <div class="flex-1">
                                     <p class="font-semibold text-sm text-gray-800">${o.name}</p>
                                     <p class="text-xs text-gray-500">R$ ${o.price.toFixed(2)} (${o.duration} min)</p>
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
    `;return{title:e,content:a}}function lr(){const e="Selecionar Profissional",t=`
        <div class="p-5 space-y-6">
             <h3 class="text-xl font-bold text-gray-800">3. Profissional</h3>
             <div id="apptProfessionalContainer" class="mt-4 flex flex-wrap gap-3 max-h-48 overflow-y-auto p-1 professional-step-cards">
                 ${Pt.map(a=>{const o=$.data.professionalId===a.id,r=a.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P";return`
                         <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${o?"selected border-blue-500":""}" data-professional-id="${a.id}">
                             <img src="${r}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
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
    `;return{title:e,content:t}}function dr(e){const t=e?"Confirmar Edição":"Data e Horário",a=new Date,o=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`,r=$.data.date||o,s=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">4. ${t}</h3>

            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 space-y-1">
                <p class="font-bold text-gray-800">${$.data.clientName}</p>
                <p class="text-sm text-gray-700">Serviços: ${$.data.selectedServiceIds.length} selecionado(s)</p>
                <p class="text-sm text-gray-700">Profissional: ${$.data.professionalName}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
                <div>
                    <label for="apptDate" class="block text-sm font-medium text-gray-700">Data</label>
                    <input type="date" id="apptDate" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" value="${r}">
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
    `;return{title:t,content:s}}function cr(e){const t=document.getElementById("apptServicesContainer");if(!t)return;const a=e.toLowerCase(),o=Ke.filter(r=>r.name.toLowerCase().includes(a));t.innerHTML=o.map(r=>{const s=$.data.selectedServiceIds.includes(r.id),n=r.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
            <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${s?"selected border-blue-500":""}" data-service-id="${r.id}">
                <div class="flex items-center">
                    <img src="${n}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-gray-800">${r.name}</p>
                        <p class="text-xs text-gray-500">R$ ${r.price.toFixed(2)} (${r.duration} min)</p>
                    </div>
                </div>
            </div>`}).join(""),t.querySelectorAll(".service-card").forEach(r=>{r.addEventListener("click",()=>xo(r.dataset.serviceId,r))})}function ur(e){const t=document.getElementById("apptProfessionalContainer");if(!t)return;const a=e.toLowerCase(),o=Pt.filter(r=>r.name.toLowerCase().includes(a));t.innerHTML=o.map(r=>{const s=$.data.professionalId===r.id,n=r.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P";return`
             <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${s?"selected border-blue-500":""}" data-professional-id="${r.id}">
                 <img src="${n}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                 <p class="text-xs font-semibold text-gray-800">${r.name.split(" ")[0]}</p>
                 <p class="text-[10px] text-gray-500">${r.specialty||"Profissional"}</p>
             </div>`}).join(""),t.querySelectorAll(".professional-modal-card").forEach(r=>{r.addEventListener("click",()=>yo(r.dataset.professionalId,r))})}async function ta(e=null,t=!1){const a=document.getElementById("appointmentModal");if(!t){const s=e?.startTime?new Date(e.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],n=e?.startTime?new Date(e.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null;$={step:1,data:{id:e?.id||null,clientName:e?.clientName||"",clientPhone:e?.clientPhone||"",selectedServiceIds:e?.services?.map(i=>i.id)||[],professionalId:e?.professionalId||null,professionalName:e?.professionalName||"",date:s,time:n,redeemedReward:e?.redeemedReward||null,clientHasRewards:e?.hasRewards||!1,clientLoyaltyPoints:0}}}if(!p.services||!p.professionals||!ae||We.enabled===void 0){g("Erro","Os dados da agenda ainda não foram carregados. Tente novamente em alguns segundos.","error");return}if(Ke=p.services,Pt=p.professionals.filter(s=>s.status==="active"),$.data.clientName&&$.data.clientPhone){const s=ae.find(n=>n.phone===$.data.clientPhone&&n.name===$.data.clientName);s&&($.data.clientLoyaltyPoints=s.loyaltyPoints||0)}let o={title:"Erro",content:"<p>Etapa não encontrada.</p>"};switch($.step){case 1:o=nr(e);break;case 2:o=ir();break;case 3:o=lr();break;case 4:o=dr(e);break}a.innerHTML=`
        <div class="modal-content max-w-4xl p-0 rounded-xl overflow-hidden shadow-2xl">
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${o.title}</h2>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>
            </header>
            
            <form id="appointmentForm" class="flex flex-col h-full">
                <input type="hidden" id="appointmentId" value="${$.data.id||""}">
                <input type="hidden" id="selectedTime" value="${$.data.time||""}">
                
                <div class="flex-1 overflow-y-auto" style="max-height: 80vh;">
                    ${o.content}
                </div>
                
            </form>
        </div>`,a.querySelectorAll('[data-action="next-step"]').forEach(s=>{s.addEventListener("click",()=>{const n=parseInt(s.dataset.currentStep,10);if(n===1){const i=a.querySelector("#apptClientName"),d=a.querySelector("#apptClientPhone");if($.data.clientName=i.value.trim(),$.data.clientPhone=d.value.trim(),!$.data.clientName||!$.data.clientPhone)return g("Atenção","Nome e telefone do cliente são obrigatórios.","error")}else if(n===2){if($.data.selectedServiceIds.length===0)return g("Atenção","Selecione pelo menos um serviço.","error")}else if(n===3&&!$.data.professionalId)return g("Atenção","Selecione um profissional.","error");ea(n+1)})}),a.querySelectorAll('[data-action="prev-step"]').forEach(s=>{s.addEventListener("click",()=>ea(parseInt(s.dataset.currentStep,10)-1))});const r=a.querySelector("#appointmentForm");if($.step===4&&r&&r.addEventListener("submit",tr),a.style.display="flex",$.step===2){a.querySelector("#apptServicesContainer").querySelectorAll(".service-card").forEach(i=>{i.addEventListener("click",()=>xo(i.dataset.serviceId,i))});const n=a.querySelector("#serviceSearchModalInput");n&&n.addEventListener("input",i=>cr(i.target.value))}if($.step===3){a.querySelector("#apptProfessionalContainer").querySelectorAll(".professional-modal-card").forEach(i=>{i.addEventListener("click",()=>yo(i.dataset.professionalId,i))});const n=a.querySelector("#professionalSearchModalInput");n&&n.addEventListener("input",i=>ur(i.target.value))}if($.step===1){const s=a.querySelector("#clientSearchInput");s&&(s.addEventListener("input",i=>Ra(i.target.value)),$.data.clientName&&$.data.clientPhone&&Ra(`${$.data.clientName} ${$.data.clientPhone}`));const n=a.querySelector('[data-action="open-client-registration"]');n&&n.addEventListener("click",rr)}if($.step===4){const s=a.querySelector("#apptDate");s&&s.addEventListener("change",Fa),Fa(),er()}}async function wo(e={}){I.currentDate=e.targetDate?new Date(e.targetDate):I.currentDate||new Date,I.scrollToAppointmentId=e.scrollToAppointmentId||null,I.profSearchTerm="",window.innerWidth<768&&(I.currentView="list"),qa.innerHTML=`
        <section>
            <div class="bg-white p-4 rounded-xl shadow-lg mb-4">
                
                <div class="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between sm:items-center mb-4 gap-4">
                    <span id="weekRange" class="font-semibold text-lg w-full text-left sm:text-right sm:flex-grow order-1 sm:order-2"></span>
                    <div class="flex flex-wrap items-center gap-2 order-2 sm:order-1">
                        <div class="flex items-center gap-1 rounded-lg bg-gray-200 p-1">
                            <button data-view="list" class="view-btn ${I.currentView==="list"?"active":""}">Lista</button>
                            <button data-view="week" class="view-btn ${I.currentView==="week"?"active":""}">Semana</button>
                        </div>
                        <div id="week-days-toggle" class="${I.currentView==="week"?"flex":"hidden"} items-center gap-1 rounded-lg bg-gray-200 p-1">
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
        </section>`,document.querySelectorAll(".view-btn[data-view]").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".view-btn[data-view]").forEach(r=>r.classList.remove("active")),a.classList.add("active"),I.currentView=a.dataset.view;const o=document.getElementById("week-days-toggle");if(I.currentView==="week"){if(o.style.display="flex",window.innerWidth<768){I.weekViewDays=3,document.querySelectorAll(".week-days-btn").forEach(s=>s.classList.remove("active"));const r=document.querySelector('.week-days-btn[data-days="3"]');r&&r.classList.add("active")}}else o.style.display="none";Z()})}),document.querySelectorAll(".week-days-btn").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".week-days-btn").forEach(o=>o.classList.remove("active")),a.classList.add("active"),I.weekViewDays=parseInt(a.dataset.days,10),Z()})}),document.getElementById("todayBtn").addEventListener("click",()=>{I.currentDate=new Date,Z()});const t=a=>{const o=parseInt(a.currentTarget.dataset.amount,10),r=I.currentView==="week"?ha():1,s=new Date(I.currentDate);s.setDate(s.getDate()+o*r),I.currentDate=s,Z()};document.getElementById("prevBtn").addEventListener("click",t),document.getElementById("nextBtn").addEventListener("click",t),document.getElementById("profSearchInput").addEventListener("input",a=>{I.profSearchTerm=a.target.value,kt()}),document.getElementById("showInactiveProfsToggle").addEventListener("change",a=>{I.showInactiveProfs=a.target.checked,kt(),Z()}),Na||(qa.addEventListener("click",async a=>{const o=a.target.closest("[data-action]");if(a.target.closest('[data-action="select-professional"]')){const d=a.target.closest('[data-action="select-professional"]').dataset.profId,l=I.selectedProfessionalId===d&&d!=="all";if(I.selectedProfessionalId=l?"all":d,d!=="all"){const c=document.getElementById("profSearchInput");c&&(c.value=""),I.profSearchTerm=""}await Z();return}if(!o)return;const r=o.dataset.action;let s=null;const n=a.target.closest("[data-appointment]");switch(n&&(s=JSON.parse(n.dataset.appointment.replace(/&apos;/g,"'"))),r){case"new-appointment":ta();break;case"edit-appointment":if(!s)return;if(s.status==="completed"){g("Atenção","Agendamentos finalizados não podem ser editados.","error");return}s.hasRewards&&!s.redeemedReward&&g("🎁 Cliente com Prêmios!","Este cliente tem pontos para resgatar. Verifique a Etapa 4 do agendamento.","info"),ta(s);break;case"delete-appointment":{const i=o.dataset.id;if(await A("Confirmar Exclusão","Tem a certeza que deseja apagar este agendamento?"))try{await rs(i),g("Agendamento apagado!","success"),Z()}catch(l){g(`Não foi possível apagar: ${l.message}`,"error")}break}case"open-comanda":if(s){s.hasRewards&&!s.redeemedReward&&s.status!=="completed"&&g("🎁 Cliente com Prêmios!","Este cliente tem pontos de fidelidade para resgatar.","info");const i=s.status==="completed"?"finalizadas":"em-atendimento",d={selectedAppointmentId:s.id,initialFilter:i};if(i==="finalizadas"){let l=s.startTime;if(s.transaction&&s.transaction.paidAt){const c=s.transaction.paidAt;typeof c=="object"&&c._seconds?l=new Date(c._seconds*1e3):l=c}d.filterDate=l}Y("comandas-section",d)}break}}),Na=!0),await Zs(),await Z()}const mr=(e,t=null,a=1,o=12)=>{let r=`/api/comandas/${e}?page=${a}&limit=${o}`;return t&&(r+=`&date=${t}`),k(r)},pr=e=>k("/api/sales",{method:"POST",body:JSON.stringify(e)}),gr=e=>k(`/api/sales/${e}/reopen`,{method:"POST"}),br=e=>k(`/api/sales/${e}`,{method:"DELETE"}),At=e=>k(`/api/products/${e}`),fr=e=>k("/api/products",{method:"POST",body:JSON.stringify(e)}),vr=(e,t)=>k(`/api/products/${e}`,{method:"PUT",body:JSON.stringify(t)}),hr=e=>k(`/api/products/${e}`,{method:"DELETE"}),xr=(e,t)=>k(`/api/products/${e}/stock`,{method:"PATCH",body:JSON.stringify(t)}),yr=({startDate:e,endDate:t,productId:a,categoryId:o})=>{const r=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&r.append("productId",a),o&&o!=="all"&&r.append("categoryId",o),k(`/api/products/stock-history/report?${r.toString()}`)},ko=()=>k("/api/cashier/status").catch(e=>{if(e.message.includes("404")||e.message.includes("não encontrada"))return null;throw e}),wr=e=>{const t={establishmentId:e.establishmentId,initialAmount:Number(e.initialAmount),notes:e.notes||""};return console.log("Payload enviado para abrir caixa:",t),k("/api/cashier/open",{method:"POST",body:JSON.stringify(t)})},kr=(e,t)=>{const a={finalAmount:Number(t)};return console.log("Payload enviado para fechar caixa:",a),k(`/api/cashier/close/${e}`,{method:"PUT",body:JSON.stringify(a)})},$r=()=>k("/api/cashier/history").then(e=>e||[]).catch(e=>(console.error("Erro ao buscar histórico:",e),[])),Sr=e=>k(`/api/cashier/report/${e}`),$o=e=>k(`/api/packages/${e}`),Er=e=>k("/api/packages",{method:"POST",body:JSON.stringify(e)}),Cr=(e,t)=>k(`/api/packages/${e}`,{method:"PUT",body:JSON.stringify(t)}),Ir=e=>k(`/api/packages/${e}`,{method:"DELETE"});let w={allComandas:[],catalog:{services:[],products:[],packages:[]},clients:[],activeFilter:"atendimento",selectedComandaId:null,isCashierOpen:!1,activeCashierSessionId:null,paging:{page:1,limit:12,total:0}},xe=null,ye=null;function Lr(){const e=document.getElementById("comandas-layout");if(e){e.classList.add("detail-view-active");const t=document.getElementById("comanda-detail-container");t&&(t.scrollTop=0)}}function ge(){const e=document.getElementById("comandas-layout");e&&e.classList.remove("detail-view-active")}function Br(){const e=new Date().toISOString().split("T")[0];ye.innerHTML=`
        <section class="h-full flex flex-col">
            <div class="flex flex-wrap justify-between items-center mb-4 gap-4 px-1">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Ponto de Venda</h2>
                <div id="cashier-controls" class="flex items-center gap-2"></div>
            </div>

            ${w.isCashierOpen?"":`
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
                            class="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md flex items-center justify-center gap-2 mb-3 ${w.isCashierOpen?"":"opacity-50 cursor-not-allowed"}"
                            ${w.isCashierOpen?"":"disabled"}
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
    `}function Tr(){const e=document.getElementById("cashier-controls");e&&(w.isCashierOpen?e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-green-700 bg-green-100 py-1 px-3 rounded-full">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-2 px-4 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 text-sm">Fechar Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm">Relatório</button>
        `:e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-red-700 bg-red-100 py-1 px-3 rounded-full">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-sm">Abrir Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm">Relatório</button>
        `)}function de(){const e=document.getElementById("comandas-list");if(!e)return;if(!w.isCashierOpen&&w.activeFilter==="atendimento"){e.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `;return}const a={atendimento:"confirmed",finalizadas:"completed"}[w.activeFilter],o=w.allComandas.filter(r=>r.status===a);if(o.length===0){e.innerHTML='<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda encontrada.</p>',ja(e);return}e.innerHTML=o.map(r=>{const n=[...r.services||[],...r.comandaItems||[],...r.items||[]].reduce((u,m)=>u+(m.price||0),0),i=r.id===w.selectedComandaId,d=new Date(r.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),c=r.type==="walk-in"||r.id.startsWith("temp-")?'<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">Avulso</span>':'<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">Agendado</span>';return`
            <div data-action="select-comanda" data-comanda-id="${r.id}" 
                 class="comanda-card cursor-pointer ${i?"selected":""}">
                
                <div class="flex justify-between items-start mb-1">
                    <p class="font-bold text-gray-800 truncate max-w-[70%]">${r.clientName}</p>
                    <p class="font-bold text-gray-900">R$ ${n.toFixed(2)}</p>
                </div>
                
                <div class="flex justify-between items-center mt-1">
                    <div class="flex items-center gap-2">
                        ${c}
                        <p class="text-xs text-gray-500 truncate max-w-[100px]">${r.professionalName}</p>
                    </div>
                    <p class="text-xs text-gray-400 font-medium">${d}</p> 
                </div>
            </div>
        `}).join(""),ja(e)}function ja(e){const{page:t,total:a,limit:o}=w.paging,r=Math.ceil((a||0)/o);if(r<=1)return;let s='<div class="flex gap-2 justify-center mt-4 flex-wrap pb-4">';t>1&&(s+=`<button data-page="${t-1}" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">&laquo;</button>`);for(let n=1;n<=r;n++)n===1||n===r||n>=t-2&&n<=t+2?s+=`<button data-page="${n}" class="px-3 py-1 rounded text-sm ${n===t?"bg-indigo-600 text-white font-bold":"bg-gray-200 hover:bg-gray-300"}">${n}</button>`:(n===t-3||n===t+3)&&(s+='<span class="px-2 text-gray-400">...</span>');t<r&&(s+=`<button data-page="${t+1}" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">&raquo;</button>`),s+="</div>",e.innerHTML+=s,e.querySelectorAll("button[data-page]").forEach(n=>{n.onclick=i=>{i.stopPropagation(),w.paging.page=parseInt(n.dataset.page,10),ee()}})}function G(){const e=document.getElementById("comanda-detail-container");if(!e)return;const t=`
        <div class="mobile-only-header">
            <button data-action="back-to-list" class="btn-back-mobile">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h3 class="font-bold text-lg text-gray-800 ml-2">Detalhes</h3>
        </div>
    `;if(!w.isCashierOpen){e.innerHTML=`
            ${t}
            <div class="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
                <div class="bg-gray-100 p-4 rounded-full mb-4">🔒</div>
                <p class="font-semibold text-lg">Caixa Fechado</p>
                <p class="text-sm mb-6">Abra o caixa para ver detalhes.</p>
                <button data-action="open-cashier" class="py-2 px-6 bg-green-600 text-white font-bold rounded-lg">Abrir Caixa</button>
            </div>
        `;return}const a=w.allComandas.find(l=>l.id===w.selectedComandaId);if(!a){e.innerHTML=`
            <div class="hidden lg:flex flex-col items-center justify-center h-full text-center text-gray-400">
                <svg class="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
                <p class="text-lg font-medium">Selecione uma venda</p>
                <p class="text-sm">Toque em um item à esquerda para ver os detalhes</p>
            </div>
        `;return}const o=[...a.services||[],...a.comandaItems||[],...a.items||[]],r=a.status==="completed",s=a.type==="walk-in"||a.id.startsWith("temp-"),n=s?"":`<button data-action="go-to-appointment" data-id="${a.id}" data-date="${a.startTime}" 
                class="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1 mt-1">
             Ir para Agendamento <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
           </button>`,i=o.reduce((l,c)=>{const u=`${c.type}-${c.id||c.name}`;if(!l[u]){const m=(a.services||[]).some(b=>b.id===c.id&&b.name===c.name);l[u]={...c,quantity:0,isOriginalService:m&&c.type==="service"}}return l[u].quantity+=1,l},{}),d=Object.values(i).reduce((l,c)=>l+(c.price||0)*c.quantity,0);e.innerHTML=`
        ${t} <div class="flex-grow overflow-y-auto p-4">
            <div class="flex justify-between items-start mb-6 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800 truncate max-w-[200px]">${a.clientName}</h3>
                    <p class="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        ${a.professionalName}
                    </p>
                    ${s?'<span class="mt-2 inline-block px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-md">Venda Avulsa</span>':n}
                </div>
                <div class="flex gap-2">
                    ${r?`<button data-action="reopen-${a.type}" data-id="${a.id}" class="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200" title="Reabrir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>`:""}
                    ${s&&!r?`<button data-action="delete-walk-in" data-id="${a.id}" class="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200" title="Excluir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`:""}
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
                            ${r?"":`<button data-action="remove-item" data-item-id="${l.id}" data-item-type="${l.type}" class="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`}
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
            
            ${r?`
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
    `}function Dr(){N({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("comandas_clientRegistrationForm");t&&t.addEventListener("submit",Mr)}async function Mr(e){e.preventDefault();const t=document.getElementById("comandas_clientRegistrationForm");if(!t)return;const a=t.querySelector('button[type="submit"]'),o={establishmentId:p.establishmentId,name:t.querySelector("#regClientName").value.trim(),email:t.querySelector("#regClientEmail").value.trim()||null,phone:t.querySelector("#regClientPhone").value.trim(),dob:`${t.querySelector("#regClientDobDay").value.trim()}/${t.querySelector("#regClientDobMonth").value.trim()}`,notes:t.querySelector("#regClientNotes").value.trim()||null};if(!o.name||!o.phone)return g("Erro de Validação","Nome e Telefone são obrigatórios.","error");a.disabled=!0,a.textContent="A salvar...";try{const r=await va(o);w.clients.push({id:r.id,...o}),g("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",So(r.id)}catch(r){g(`Erro ao cadastrar cliente: ${r.message}`,"error")}finally{a.disabled=!1,a.textContent="Salvar Cliente"}}function Pr(){if(!w.isCashierOpen){g("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");return}const{modalElement:e,close:t}=N({title:"Adicionar Item à Comanda",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-4xl"}),a=()=>{let r="";const s=e.querySelector("#add-item-content"),n={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',package:'<svg class="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'},i=()=>{const d=r.toLowerCase(),l=u=>u.filter(m=>m.name.toLowerCase().includes(d)),c={"modal-service-list":{items:l(w.catalog.services),type:"service"},"modal-product-list":{items:l(w.catalog.products),type:"product"},"modal-package-list":{items:l(w.catalog.packages),type:"package"}};for(const[u,{items:m,type:b}]of Object.entries(c)){const f=s.querySelector(`#${u}`);f&&(f.innerHTML=m.map(v=>`
                        <button data-action="select-item-for-quantity" data-item-type="${b}" data-item-id="${v.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${n[b]}</div>
                            <span class="flex-grow text-left min-w-0 truncate">${v.name}</span>
                            <span class="font-semibold flex-shrink-0">R$ ${v.price.toFixed(2)}</span>
                        </button>
                    `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum item.</p>')}};s.innerHTML=`
            <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 mb-4 border rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-purple-600">Pacotes</h4><div id="modal-package-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
            </div>`,i(),s.querySelector("#item-search-input").addEventListener("input",d=>{r=d.target.value,i()})},o=r=>{let s=1;const n=e.querySelector("#add-item-content"),i=()=>{document.getElementById("quantity-display").textContent=s,document.getElementById("quantity-minus-btn").disabled=s<=1};n.innerHTML=`
            <div class="text-center p-8 relative">
                <button data-action="back-to-catalog" class="absolute top-5 left-5 text-gray-600 hover:text-gray-900">&larr; Voltar</button>
                <h3 class="font-bold text-2xl text-gray-800">${r.name}</h3>
                <p class="text-lg text-gray-500">R$ ${r.price.toFixed(2)}</p>
                <div class="my-8 flex items-center justify-center gap-4">
                    <button id="quantity-minus-btn" class="w-12 h-12 rounded-full bg-gray-200 text-3xl font-bold text-gray-600 hover:bg-gray-300">-</button>
                    <span id="quantity-display" class="text-4xl font-bold w-20 text-center">${s}</span>
                    <button id="quantity-plus-btn" class="w-12 h-12 rounded-full bg-gray-200 text-3xl font-bold text-gray-600 hover:bg-gray-300">+</button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Adicionar à Comanda</button>
            </div>
        `,document.getElementById("quantity-minus-btn").onclick=()=>{s>1&&(s--,i())},document.getElementById("quantity-plus-btn").onclick=()=>{s++,i()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await Rr(r,s),t()}};e.addEventListener("click",r=>{const s=r.target.closest('[data-action="select-item-for-quantity"]'),n=r.target.closest('[data-action="back-to-catalog"]');if(s){const{itemType:i,itemId:d}=s.dataset,c=(w.catalog[i+"s"]||[]).find(u=>u.id===d);c&&o({...c,type:i})}else n&&a()}),a()}async function So(e=null){if(!w.isCashierOpen){g("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");return}if(!w.clients||w.clients.length===0)try{w.clients=await Ze(p.establishmentId)}catch{g("Erro","Não foi possível carregar dados de clientes.","error");return}if(!p.professionals||p.professionals.length===0)try{p.professionals=await _(p.establishmentId)}catch{g("Erro","Não foi possível carregar dados de profissionais.","error");return}const t=w.clients.map(n=>{const i=n.id===e?"selected":"";return`<option value="${n.id}" ${i}>${n.name} - ${n.phone}</option>`}).join(""),a=p.professionals.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""),o=`
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
    `,{modalElement:r}=N({title:"Nova Venda Avulsa",contentHTML:o,maxWidth:"max-w-md"});r.querySelector("#new-sale-form").addEventListener("submit",Or);const s=r.querySelector('[data-action="new-client-from-sale"]');s&&s.addEventListener("click",n=>{n.preventDefault(),r.style.display="none",Dr()})}function Ar(){if(!w.isCashierOpen){g("Caixa Fechado","Abra o caixa antes de finalizar pagamentos.","error");return}const e=w.allComandas.find(l=>l.id===w.selectedComandaId);if(!e)return;const a=[...e.services||[],...e.comandaItems||[],...e.items||[]].reduce((l,c)=>l+(c.price||0),0);let o=[],r={remainingAmount:a,selectedMethod:"dinheiro",installments:1,amountReceived:""};const s=()=>{const l=document.getElementById("payment-list"),c=document.getElementById("remaining-amount"),u=document.getElementById("finalize-checkout-btn"),m=document.getElementById("change-container"),b=document.getElementById("installments-container"),f=document.getElementById("payment-value"),v=document.getElementById("payment-controls"),y=o.reduce((x,S)=>x+S.value,0);r.remainingAmount=a-y,l.innerHTML=o.map((x,S)=>`
            <div class="flex justify-between items-center bg-gray-100 p-2 rounded-md animate-fade-in-fast">
                <span class="font-medium text-sm">${x.method.charAt(0).toUpperCase()+x.method.slice(1)} ${x.installments>1?`(${x.installments}x)`:""}</span>
                <div class="flex items-center gap-2">
                    <span class="font-semibold">R$ ${x.value.toFixed(2)}</span>
                    <button data-action="remove-payment" data-payment-index="${S}" class="text-red-500 font-bold">&times;</button>
                </div>
            </div>`).join(""),r.remainingAmount<=.001?(c.textContent="Total Pago!",c.className="text-lg font-bold text-center mb-4 text-green-600",f.value="",u.disabled=!1,v&&(v.style.display="none")):(c.textContent=`Faltam: R$ ${r.remainingAmount.toFixed(2)}`,c.className="text-lg font-bold text-center mb-4 text-red-600",f.value=r.remainingAmount.toFixed(2),u.disabled=!0,v&&(v.style.display="block")),document.querySelectorAll(".payment-method-btn").forEach(x=>{x.classList.toggle("ring-2",x.dataset.method===r.selectedMethod),x.classList.toggle("ring-offset-2",x.dataset.method===r.selectedMethod)}),b.style.display=["credito","crediario"].includes(r.selectedMethod)?"block":"none",m.style.display=r.selectedMethod==="dinheiro"&&r.remainingAmount>0?"block":"none";const h=parseFloat(r.amountReceived)-r.remainingAmount;document.getElementById("change-value").textContent=`R$ ${h>0?h.toFixed(2):"0.00"}`},n=()=>{const l=document.getElementById("payment-value");let c=parseFloat(l.value);if(isNaN(c)||c<=0){g("Valor Inválido","Insira um valor de pagamento válido e maior que zero.","error");return}if(c>r.remainingAmount+.001){g("Valor Inválido","O valor excede o saldo restante.","error");return}const u={method:r.selectedMethod,value:c};["credito","crediario"].includes(r.selectedMethod)&&r.installments>1&&(u.installments=r.installments),o.push(u),r.selectedMethod="dinheiro",r.installments=1,document.getElementById("installments-select").value=1,s()},i=`
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
    `,{modalElement:d}=N({title:"Finalizar Pagamento",contentHTML:i,maxWidth:"max-w-md"});document.getElementById("payment-value").value=r.remainingAmount.toFixed(2),d.addEventListener("click",l=>{const c=l.target.closest(".payment-method-btn");c&&(r.selectedMethod=c.dataset.method,r.installments=1,document.getElementById("installments-select").value=1,s()),l.target.closest("#add-payment-btn")&&n(),l.target.closest('[data-action="remove-payment"]')&&(o.splice(parseInt(l.target.closest('[data-action="remove-payment"]').dataset.paymentIndex,10),1),s()),l.target.closest("#finalize-checkout-btn")&&Hr(e,a,o)}),d.addEventListener("change",l=>{l.target.id==="installments-select"&&(r.installments=parseInt(l.target.value,10))}),d.addEventListener("input",l=>{l.target.id==="amount-received"&&(r.amountReceived=l.target.value,s())}),s()}async function qr(){const e=`
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
    `,{modalElement:t}=N({title:"Abrir Caixa",contentHTML:e,maxWidth:"max-w-md"});t.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const o=document.getElementById("initial-amount"),r=o.value.trim(),s=document.getElementById("cashier-notes").value.trim(),n=parseFloat(r);if(r===""||isNaN(n)||n<0){g("Valor Inválido","Por favor, insira um valor inicial válido (maior ou igual a R$ 0,00).","error"),o.focus();return}try{const i={establishmentId:p.establishmentId,initialAmount:parseFloat(n.toFixed(2))};s&&(i.notes=s);const d=await wr(i);w.isCashierOpen=!0,w.activeCashierSessionId=d.id,await xa(),document.getElementById("genericModal").style.display="none",g("Sucesso!",`Caixa aberto com valor inicial de R$ ${n.toFixed(2)}`,"success")}catch(i){g("Erro",`Não foi possível abrir o caixa: ${i.message}`,"error")}})}async function Nr(){const e=w.activeCashierSessionId;if(e)try{const t=await Sr(e),a=`
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
        `,{modalElement:o}=N({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-md"});o.querySelector("#close-cashier-form").addEventListener("submit",async r=>{r.preventDefault();const s=parseFloat(document.getElementById("final-amount").value);if(isNaN(s)||s<0){g("Valor Inválido","Insira um valor final válido.","error");return}try{await kr(e,s),w.isCashierOpen=!1,w.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",await xa(),g("Sucesso!","Caixa fechado com sucesso!","success")}catch(n){g("Erro",`Não foi possível fechar o caixa: ${n.message}`,"error")}})}catch(t){g("Erro",`Não foi possível carregar o relatório de fecho: ${t.message}`,"error")}}async function Fr(e){w.activeFilter!==e&&(w.activeFilter=e,w.paging.page=1,document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${e}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",e!=="finalizadas"),ge(),await ee(),w.selectedComandaId=null,G())}function aa(e){w.selectedComandaId=e,de(),Lr(),G()}async function Rr(e,t){const a=w.allComandas.find(r=>r.id===w.selectedComandaId);if(!a)return;const o=Array(t).fill(0).map(()=>({id:e.id,name:e.name,price:e.price,type:e.type}));if(a.comandaItems=a.comandaItems||[],a.comandaItems.push(...o),a.type==="walk-in"&&a.id.startsWith("temp-")){g("Sucesso",`${t}x ${e.name} adicionado(s)!`,"success"),G(),de();return}try{await ga(a.id,a),g("Sucesso",`${t}x ${e.name} adicionado(s)!`,"success"),G(),de()}catch(r){g("Erro",`Não foi possível adicionar o item: ${r.message}`,"error"),a.comandaItems.splice(a.comandaItems.length-t,t)}}async function jr(e,t){const a=w.allComandas.find(s=>s.id===w.selectedComandaId);if(!a)return;let o=!1,r=(a.comandaItems||[]).findIndex(s=>s.id===e&&s.type===t);if(r>-1)a.comandaItems.splice(r,1),o=!0;else{let s=(a.services||[]).findIndex(n=>n.id===e);if(s>-1)a.services.splice(s,1),o=!0;else{let n=(a.items||[]).findIndex(i=>i.id===e&&i.type===t);n>-1&&(a.items.splice(n,1),o=!0)}}if(o){if(a.type==="walk-in"&&a.id.startsWith("temp-")){g("Sucesso","Item removido!","success"),G(),de();return}try{await ga(a.id,a),g("Sucesso","Item removido!","success"),G(),de()}catch(s){g("Erro",`Não foi possível remover o item: ${s.message}`,"error"),await ee()}}}async function Hr(e,t,a){const o=e.type==="appointment",r=[...e.services||[],...e.comandaItems||[],...e.items||[]],s={payments:a,totalAmount:t,items:r,cashierSessionId:w.activeCashierSessionId};try{o?await is(e.id,s):(s.clientName=e.clientName,s.professionalId=e.professionalId,s.clientPhone=e.clientPhone,await pr(s)),g("Sucesso!","Venda finalizada com sucesso!","success"),document.getElementById("genericModal").style.display="none",ge(),w.selectedComandaId=null,await ee()}catch(n){g("Erro no Checkout",n.message,"error")}}async function Or(e){e.preventDefault();const t=document.getElementById("new-sale-client").value,a=document.getElementById("new-sale-professional").value,o=w.clients.find(n=>n.id===t),r=p.professionals.find(n=>n.id===a);if(!o||!r){g("Erro","Selecione um cliente e um profissional válidos.","error");return}const s={id:`temp-${Date.now()}`,type:"walk-in",clientName:o.name,clientPhone:o.phone,professionalId:r.id,professionalName:r.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};w.allComandas.unshift(s),w.selectedComandaId=s.id,document.getElementById("genericModal").style.display="none",aa(s.id)}async function ee(){const e=document.getElementById("comandas-list");e.innerHTML='<div class="loader mx-auto mt-10"></div>';const t=w.activeFilter==="finalizadas"?document.getElementById("filter-date").value:null;try{const a=await ko();if(w.isCashierOpen=!!a,w.activeCashierSessionId=a?a.id:null,Tr(),!w.isCashierOpen&&w.activeFilter==="atendimento"){de(),G();return}const o=await mr(p.establishmentId,t,w.paging.page,w.paging.limit);if(w.allComandas=o.data||o,w.paging.total=o.total||o.length,w.catalog.services.length===0){const[r,s,n,i,d]=await Promise.all([De(p.establishmentId),At(p.establishmentId),$o(p.establishmentId),Ze(p.establishmentId),_(p.establishmentId)]);w.catalog={services:r,products:s,packages:n},w.clients=i,p.professionals=d}de(),w.selectedComandaId,G()}catch(a){g("Erro de Carregamento",`Não foi possível carregar os dados: ${a.message}`,"error"),e.innerHTML=`<p class="text-red-500 p-4">${a.message}</p>`}}async function xa(e={}){ye=document.getElementById("content");try{const t=await ko();w.isCashierOpen=!!t,w.activeCashierSessionId=t?t.id:null}catch(t){console.error("Erro ao verificar caixa:",t),w.isCashierOpen=!1}w.selectedComandaId=e.selectedAppointmentId||null,Br(),xe&&(ye.removeEventListener("click",xe),ye.removeEventListener("change",xe)),xe=async t=>{const a=t.target.closest("[data-action], [data-filter], [data-comanda-id], [data-id]");if(t.target.id==="filter-date"&&w.activeFilter==="finalizadas"){w.paging.page=1,await ee();return}if(a){if(a.matches("[data-filter]"))Fr(a.dataset.filter);else if(a.matches("[data-comanda-id]")){if(t.target.closest('[data-action="go-to-appointment"]')){t.stopPropagation();return}aa(a.dataset.comandaId)}else if(a.matches("[data-action]")){const o=a.dataset.action,r=a.dataset.id||w.selectedComandaId;switch(o){case"back-to-list":{ge(),w.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach(s=>s.classList.remove("selected")),G();break}case"new-sale":So();break;case"add-item":Pr();break;case"checkout":Ar();break;case"open-cashier":qr();break;case"close-cashier":await Nr();break;case"view-sales-report":Y("sales-report-section");break;case"remove-item":await jr(a.dataset.itemId,a.dataset.itemType);break;case"reopen-appointment":{if(await A("Reabrir Comanda","Tem certeza? O pagamento será estornado e os produtos devolvidos ao estoque."))try{await ns(r);const n=w.allComandas.findIndex(i=>i.id===r);n!==-1&&(delete w.allComandas[n].transaction,delete w.allComandas[n].cashierSessionId,delete w.allComandas[n].redeemedReward,w.allComandas[n].status="confirmed"),w.selectedComandaId=null,ge(),g("Sucesso!","Comanda reaberta para edição.","success"),await ee()}catch(n){g("Erro",`Não foi possível reabrir: ${n.message}`,"error")}break}case"reopen-walk-in":{if(await A("Reabrir Venda","Tem certeza? A venda será cancelada e os produtos devolvidos ao estoque."))try{await gr(r),g("Sucesso!","Venda revertida."),ge(),w.selectedComandaId=null,await ee()}catch(n){g("Erro",`Não foi possível reabrir: ${n.message}`,"error")}break}case"go-to-appointment":{const s=a.dataset.id,n=a.dataset.date;Y("agenda-section",{scrollToAppointmentId:s,targetDate:new Date(n)});break}case"delete-walk-in":{if(await A("Excluir Venda","Tem certeza que deseja excluir esta venda avulsa? O estoque dos produtos será devolvido."))if(r.startsWith("temp-"))w.allComandas=w.allComandas.filter(n=>n.id!==r),w.selectedComandaId=null,de(),G(),g("Sucesso","Venda avulsa removida.","success"),ge();else try{await br(r),g("Sucesso","Venda avulsa excluída com sucesso.","success"),w.selectedComandaId=null,ge(),await ee()}catch(n){g("Erro",`Não foi possível excluir: ${n.message}`,"error")}break}}}}},ye.addEventListener("click",xe),ye.addEventListener("change",xe),e.initialFilter&&(w.activeFilter=e.initialFilter==="finalizadas"?"finalizadas":"atendimento"),e.selectedAppointmentId&&(w.selectedComandaId=e.selectedAppointmentId),document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${w.activeFilter}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",w.activeFilter!=="finalizadas"),e.filterDate&&(document.getElementById("filter-date").value=new Date(e.filterDate).toISOString().split("T")[0]),await ee(),w.selectedComandaId&&aa(w.selectedComandaId)}const oa=document.getElementById("content");let Se={};const rt=["#4f46e5","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4"],B={startDate:new Date(new Date().getFullYear(),0,1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],selectedProfessional:"all",selectedCostCenter:"all",professionalsList:[],costCentersList:[],data:null,currentTab:"dashboards",apptViewMode:"year",apptSelectedMonth:null};async function zr(){if(!window.Chart)return new Promise((e,t)=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js",a.onload=e,a.onerror=t,document.head.appendChild(a)})}async function Vr(){oa.innerHTML='<div class="flex flex-col items-center justify-center h-64"><div class="loader mb-4"></div><p class="text-gray-500">Carregando inteligência de dados...</p></div>';try{await zr();const[e,t]=await Promise.all([_(p.establishmentId),As().catch(()=>[])]);B.professionalsList=e,B.costCentersList=t,Ur(),await Eo()}catch(e){oa.innerHTML=`
            <div class="flex flex-col items-center justify-center h-full text-red-500">
                <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p>Erro ao carregar relatórios: ${e.message}</p>
                <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-gray-200 rounded text-gray-700">Tentar Novamente</button>
            </div>`}}function Ur(){const e=B.professionalsList.map(a=>`<option value="${a.id}">${a.name}</option>`).join(""),t=B.costCentersList.map(a=>`<option value="${a.id}">${a.name}</option>`).join("");oa.innerHTML=`
        <div class="flex flex-col min-h-screen bg-gray-50 pb-20">
            <div class="bg-white shadow-sm border-b sticky top-0 z-20 px-4 py-4">
                <div class="max-w-7xl mx-auto flex flex-col xl:flex-row justify-between items-center gap-4">
                    
                    <div class="flex items-center gap-3 w-full md:w-auto">
                        <div class="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        </div>
                        <h1 class="text-xl font-bold text-gray-800">Relatórios</h1>
                    </div>
                    
                    <div class="flex gap-1 bg-gray-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto shadow-inner">
                        <button data-tab="dashboards" class="tab-btn flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap">Financeiro</button>
                        <button data-tab="appointments" class="tab-btn flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap">Agendamentos</button>
                        <button data-tab="dre" class="tab-btn flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap">DRE Contábil</button>
                    </div>

                    <div class="flex flex-col md:flex-row gap-2 w-full xl:w-auto">
                        <div class="grid grid-cols-2 gap-2">
                            <select id="report-prof" class="border rounded-lg px-2 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none w-full"><option value="all">Todos Profissionais</option>${e}</select>
                            <select id="report-cost" class="border rounded-lg px-2 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none w-full"><option value="all">Todos Centros</option>${t}</select>
                        </div>
                        <div class="flex gap-2">
                            <input type="date" id="report-start" value="${B.startDate}" class="border rounded-lg px-2 py-2 text-sm w-full">
                            <input type="date" id="report-end" value="${B.endDate}" class="border rounded-lg px-2 py-2 text-sm w-full">
                            <button id="btn-filter" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm transition">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <main id="report-content" class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6"></main>
        </div>
    `,document.getElementById("btn-filter").onclick=Jr,document.querySelectorAll(".tab-btn").forEach(a=>{a.onclick=()=>{B.currentTab=a.dataset.tab,Ha(),Co()}}),Ha()}function Ha(){document.querySelectorAll(".tab-btn").forEach(e=>{const t=e.dataset.tab===B.currentTab;e.className=t?"tab-btn flex-1 px-4 py-2 rounded-md text-sm font-bold bg-white text-indigo-600 shadow-sm transition-all whitespace-nowrap":"tab-btn flex-1 px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-all whitespace-nowrap"})}async function Jr(){B.startDate=document.getElementById("report-start").value,B.endDate=document.getElementById("report-end").value,B.selectedProfessional=document.getElementById("report-prof").value,B.selectedCostCenter=document.getElementById("report-cost").value,B.apptViewMode="year",B.apptSelectedMonth=null,await Eo()}async function Eo(){const e=document.getElementById("report-content");e.innerHTML='<div class="flex justify-center py-20"><div class="loader"></div></div>';try{const t=await Ms(B.startDate,B.endDate,B.selectedProfessional,B.selectedCostCenter);B.data=t,Co()}catch(t){console.error(t),e.innerHTML=`
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 text-center">
                <p class="font-bold">Erro ao carregar dados</p>
                <p class="text-sm">${t.message||"Verifique sua conexão."}</p>
            </div>`}}function Co(){const e=document.getElementById("report-content");switch(B.currentTab){case"dashboards":_r(e);break;case"appointments":ya(e);break;case"dre":Xr(e);break}}function _r(e){const{dreSimple:t,charts:a}=B.data,o=t||{grossRevenue:0,netProfit:0,variableCosts:0},r=B.data.totalAppointments||0,s=r>0?o.grossRevenue/r:0;e.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-fade-in">
            
            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-indigo-500">
                <p class="text-xs text-gray-500 font-bold uppercase">Faturamento</p>
                <p class="text-xl xl:text-2xl font-extrabold text-gray-800 mt-1">R$ ${o.grossRevenue.toFixed(2)}</p>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-red-400">
                <p class="text-xs text-gray-500 font-bold uppercase">Comissões Pagas</p>
                <p class="text-xl xl:text-2xl font-extrabold text-red-600 mt-1">R$ ${o.variableCosts.toFixed(2)}</p>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-green-500">
                <p class="text-xs text-gray-500 font-bold uppercase">Lucro Operacional</p>
                <p class="text-xl xl:text-2xl font-extrabold text-green-600 mt-1">R$ ${o.netProfit.toFixed(2)}</p>
                <p class="text-[10px] text-gray-400 mt-1">Faturamento (-) Comissões</p>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
                <p class="text-xs text-gray-500 font-bold uppercase">Atendidos</p>
                <p class="text-xl xl:text-2xl font-extrabold text-blue-600 mt-1">${r}</p>
                <p class="text-[10px] text-gray-400 mt-1">Concluídos no período</p>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-yellow-500">
                <p class="text-xs text-gray-500 font-bold uppercase">Ticket Médio</p>
                <p class="text-xl xl:text-2xl font-extrabold text-yellow-600 mt-1">R$ ${s.toFixed(2)}</p>
                <p class="text-[10px] text-gray-400 mt-1">Por atendimento</p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 animate-fade-in">
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h3 class="font-bold text-gray-700 mb-4">Evolução Mensal</h3>
                <div class="relative h-64"><canvas id="chart-monthly"></canvas></div>
            </div>
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h3 class="font-bold text-gray-700 mb-4">Faturamento por Profissional</h3>
                <div class="relative h-64 flex justify-center"><canvas id="chart-profs"></canvas></div>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 animate-fade-in">
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h3 class="font-bold text-gray-700 mb-4">Vendas Diárias</h3>
                <div class="relative h-64"><canvas id="chart-daily"></canvas></div>
            </div>
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h3 class="font-bold text-gray-700 mb-4">Top Serviços/Produtos</h3>
                <div class="relative h-64"><canvas id="chart-products"></canvas></div>
            </div>
        </div>
    `,nt("chart-monthly","bar","Receita Mensal",a.salesMonthly.labels,a.salesMonthly.data,rt[0]),nt("chart-profs","doughnut","Total Vendas",a.professionals.labels,a.professionals.data,rt),nt("chart-daily","line","Vendas Diárias",a.salesDaily.labels,a.salesDaily.data,rt[4]),nt("chart-products","bar","Total Vendido",a.products.labels,a.products.data,rt[1])}function ya(e){const{charts:t}=B.data;let a='<h3 class="font-bold text-gray-700 text-lg">Visão Anual/Mensal</h3>',o="Clique na barra do Mês para detalhar os dias";B.apptViewMode==="month"&&(a=`
            <div class="flex items-center gap-4">
                <button id="btn-back-year" class="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-bold bg-indigo-50 px-3 py-1 rounded transition hover:bg-indigo-100">
                    ← Voltar
                </button>
                <h3 class="font-bold text-gray-700 text-lg">Detalhes de ${B.apptSelectedMonth}</h3>
            </div>`,o="Clique na barra do Dia para ver a lista de clientes"),e.innerHTML=`
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-fade-in">
            <div class="mb-6 flex justify-between items-center flex-wrap gap-2">
                ${a}
                <div class="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    ${o}
                </div>
            </div>
            <div class="relative h-80">
                <canvas id="chart-appointments"></canvas>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div class="bg-blue-50 p-4 rounded-lg text-center border border-blue-100">
                <span class="block text-2xl font-bold text-blue-600">${t.appointmentsStatus.scheduled||0}</span>
                <span class="text-xs text-blue-400 uppercase font-bold tracking-wider">Agendados</span>
            </div>
            <div class="bg-green-50 p-4 rounded-lg text-center border border-green-100">
                <span class="block text-2xl font-bold text-green-600">${t.appointmentsStatus.completed||0}</span>
                <span class="text-xs text-green-400 uppercase font-bold tracking-wider">Concluídos</span>
            </div>
            <div class="bg-red-50 p-4 rounded-lg text-center border border-red-100">
                <span class="block text-2xl font-bold text-red-600">${t.appointmentsStatus.canceled||0}</span>
                <span class="text-xs text-red-400 uppercase font-bold tracking-wider">Cancelados</span>
            </div>
        </div>
    `,Wr();const r=document.getElementById("btn-back-year");r&&(r.onclick=()=>{B.apptViewMode="year",B.apptSelectedMonth=null,ya(e)})}function Wr(){const e=document.getElementById("chart-appointments").getContext("2d");Se["chart-appointments"]&&Se["chart-appointments"].destroy();const{charts:t}=B.data;let a,o;if(B.apptViewMode==="year")a=t.appointmentsMonthly.labels,o=t.appointmentsMonthly.data;else{const s={jan:"01",fev:"02",mar:"03",abr:"04",mai:"05",jun:"06",jul:"07",ago:"08",set:"09",out:"10",nov:"11",dez:"12"},[n,i]=B.apptSelectedMonth.split("/"),d=s[n.toLowerCase()]||n,l=i.length===2?"20"+i:i,c=Object.entries(t.appointmentsDaily.data).map(([u,m],b)=>{const f=t.appointmentsDaily.labels[b];return f.includes(`/${d}/${l}`)?{label:f,value:m}:null}).filter(Boolean);a=c.map(u=>u.label),o=c.map(u=>u.value)}const r={type:"bar",data:{labels:a,datasets:[{label:"Volume de Agendamentos",data:o,backgroundColor:B.apptViewMode==="year"?"#3b82f6":"#8b5cf6",borderRadius:4,hoverBackgroundColor:"#1e40af"}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(s,n)=>{if(n.length>0){const i=n[0].index,d=a[i];Gr(d)}},plugins:{legend:{display:!1},tooltip:{callbacks:{label:s=>` ${s.raw} Agendamentos`}}}}};Se["chart-appointments"]=new Chart(e,r)}function Gr(e){B.apptViewMode==="year"?(B.apptViewMode="month",B.apptSelectedMonth=e,ya(document.getElementById("report-content"))):B.apptViewMode==="month"&&Yr(e)}async function Yr(e){const[t,a,o]=e.split("/"),r=`${o}-${a}-${t}`;N({title:"Carregando...",contentHTML:'<div class="p-8 text-center"><div class="loader mx-auto"></div></div>',maxWidth:"max-w-md"});try{const s=await Ps(r,B.selectedProfessional);let n="";s.length===0?n='<div class="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">Nenhum agendamento encontrado para este dia.</div>':n=`
                <div class="overflow-hidden border rounded-lg max-h-[60vh] overflow-y-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50 sticky top-0 z-10">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Hora</th>
                                <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Serviço</th>
                                <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200 text-sm">
                            ${s.map(d=>`
                                <tr class="hover:bg-gray-50 transition-colors">
                                    <td class="px-4 py-3 font-bold text-gray-900">${d.time||"--:--"}</td>
                                    <td class="px-4 py-3 text-gray-700">${d.clientName||"Cliente"}</td>
                                    <td class="px-4 py-3 text-gray-500">${d.serviceName||"Serviço"}</td>
                                    <td class="px-4 py-3">
                                        <span class="px-2 py-1 rounded-full text-xs font-bold ${d.status==="completed"?"bg-green-100 text-green-800":d.status==="canceled"?"bg-red-100 text-red-800":"bg-blue-100 text-blue-800"}">
                                            ${d.status==="completed"?"Concluído":d.status==="canceled"?"Cancelado":"Agendado"}
                                        </span>
                                    </td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
            `;const i=document.querySelector(".modal-content-body");i?(i.innerHTML=n,document.querySelector(".modal-title").innerText=`Agendamentos de ${e}`):(document.getElementById("genericModal").style.display="none",N({title:`Agendamentos de ${e}`,contentHTML:n,maxWidth:"max-w-2xl"}))}catch{g("Erro","Não foi possível carregar os detalhes do dia.","error"),document.getElementById("genericModal").style.display="none"}}function Xr(e){const{dreFinancial:t}=B.data,a=Object.entries(t.revenues).map(([r,s])=>`
        <tr class="text-sm text-gray-600 bg-green-50/30 hover:bg-green-50 transition-colors">
            <td class="pl-8 py-2 border-l-4 border-transparent hover:border-green-400">${r}</td>
            <td class="text-right pr-6 py-2 text-green-700 font-medium">R$ ${s.toFixed(2)}</td>
            <td class="text-right pr-4 text-xs text-gray-400">${t.totalRevenues>0?(s/t.totalRevenues*100).toFixed(1):0}%</td>
        </tr>
    `).join(""),o=Object.entries(t.expenses).map(([r,s])=>`
        <tr class="text-sm text-gray-600 bg-red-50/30 hover:bg-red-50 transition-colors">
            <td class="pl-8 py-2 border-l-4 border-transparent hover:border-red-400">${r}</td>
            <td class="text-right pr-6 py-2 text-red-600 font-medium">- R$ ${s.toFixed(2)}</td>
            <td class="text-right pr-4 text-xs text-gray-400">${t.totalRevenues>0?(s/t.totalRevenues*100).toFixed(1):0}%</td>
        </tr>
    `).join("");e.innerHTML=`
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fade-in mb-10">
            <div class="bg-gray-900 text-white p-6 text-center relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <h2 class="text-xl font-bold uppercase tracking-widest">DRE Gerencial Detalhado</h2>
                <p class="text-sm opacity-75 mt-1">
                    ${new Date(B.startDate).toLocaleDateString("pt-BR")} até ${new Date(B.endDate).toLocaleDateString("pt-BR")}
                </p>
            </div>
            
            <table class="w-full">
                <tbody class="divide-y divide-gray-100">
                    
                    <tr class="font-bold text-gray-800 bg-blue-50">
                        <td class="p-4">1. RECEITAS OPERACIONAIS</td>
                        <td class="p-4 text-right text-blue-800 font-extrabold">R$ ${t.totalRevenues.toFixed(2)}</td>
                        <td class="p-4 text-right w-24 text-blue-800">100%</td>
                    </tr>
                    ${a||'<tr><td colspan="3" class="pl-8 py-3 text-sm text-gray-400 italic">Nenhuma receita lançada no financeiro.</td></tr>'}

                    <tr class="font-bold text-gray-800 bg-orange-50 mt-4 border-t border-orange-100">
                        <td class="p-4">2. (-) CUSTOS E DESPESAS</td>
                        <td class="p-4 text-right text-red-600 font-extrabold">- R$ ${t.totalExpenses.toFixed(2)}</td>
                        <td class="p-4 text-right text-xs text-red-600 font-bold">
                            ${t.totalRevenues>0?(t.totalExpenses/t.totalRevenues*100).toFixed(1):0}%
                        </td>
                    </tr>
                    ${o||'<tr><td colspan="3" class="pl-8 py-3 text-sm text-gray-400 italic">Nenhuma despesa lançada no financeiro.</td></tr>'}

                    <tr class="font-extrabold text-white ${t.netResult>=0?"bg-green-600":"bg-red-600"} text-lg border-t-4 border-white shadow-inner">
                        <td class="p-6">3. (=) RESULTADO DO EXERCÍCIO</td>
                        <td class="p-6 text-right">R$ ${t.netResult.toFixed(2)}</td>
                        <td class="p-6 text-right opacity-90">
                            ${t.totalRevenues>0?(t.netResult/t.totalRevenues*100).toFixed(1):0}%
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div class="p-4 bg-gray-50 text-center border-t border-gray-200">
                <p class="text-xs text-gray-500">
                    * Este relatório baseia-se nos lançamentos de Contas a Pagar/Receber e Naturezas Financeiras.
                    Verifique se todos os lançamentos estão categorizados corretamente.
                </p>
            </div>
        </div>
    `}function nt(e,t,a,o,r,s){const n=document.getElementById(e);if(!n)return;const i=n.getContext("2d");Se[e]&&Se[e].destroy();const d={type:t,data:{labels:o,datasets:[{label:a,data:r,backgroundColor:Array.isArray(s)?s:t==="line"?"rgba(79, 70, 229, 0.1)":s,borderColor:Array.isArray(s)?"#fff":s,borderWidth:2,fill:t==="line",tension:.3,borderRadius:t==="bar"?4:0,pointBackgroundColor:"#fff",pointBorderColor:s,pointHoverBackgroundColor:s}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:t==="doughnut",position:"bottom"},tooltip:{backgroundColor:"rgba(17, 24, 39, 0.9)",padding:10,cornerRadius:8,callbacks:{label:l=>{let c=l.dataset.label||"";return c&&(c+=": "),l.parsed.y!==null?c+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(l.parsed.y):c+=l.raw,c}}}},scales:t==="doughnut"?{}:{y:{beginAtZero:!0,grid:{color:"#f3f4f6"},ticks:{font:{size:11}}},x:{grid:{display:!1},ticks:{font:{size:11}}}}}};Se[e]=new Chart(i,d)}const qt=(e,t="products")=>k(`/api/${t}/categories/${e}`),Io=(e,t="products")=>k(`/api/${t}/categories`,{method:"POST",body:JSON.stringify(e)}),Lo=(e,t="products")=>k(`/api/${t}/categories/${e}`,{method:"DELETE"}),Qr="audit_logs",Le=async(e,t,a,o,r,s=null)=>{try{if(!t)return;await pa(Te(Q,Qr),{establishmentId:e,userId:t.uid,userName:t.name||t.email||"Utilizador",module:a,action:o,description:r,details:s,timestamp:new Date})}catch(n){console.error("Falha silenciosa ao registar log:",n)}},pe=document.getElementById("content");let ne=null,Re="services",fe="all";function Be(){const e=J.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}async function Zr(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),o=a.value;if(o)try{await Io({establishmentId:p.establishmentId,name:o},"services"),Le(p.establishmentId,Be(),"Categorias (Serviços)","Criou",`Criou categoria: ${o}`),a.value="",g("Sucesso","Categoria criada!","success"),await wa(),await et()}catch(r){g("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}}async function Kr(e){if(await A("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await Lo(e,"services"),Le(p.establishmentId,Be(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${e})`),g("Sucesso","Categoria apagada.","success"),await wa(),await et()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function wa(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await qt(p.establishmentId,"services");p.serviceCategories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${a.name}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function en(){N({title:"Gerir Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",Zr),t.addEventListener("click",o=>{const r=o.target.closest('button[data-action="delete-category"]');r&&(o.preventDefault(),Kr(r.dataset.id))}))}wa()}async function tn(e){e.preventDefault();const t=e.target.closest("#serviceModal"),a=t.querySelector("#serviceId").value,o={},r=t.querySelector('input[name="commissionType"]:checked').value;r==="custom"&&t.querySelectorAll(".professional-commission-row").forEach(n=>{const i=n.dataset.profId;if(n.querySelector('input[type="checkbox"]').checked){const l=parseFloat(n.querySelector('input[type="number"]').value);o[i]=isNaN(l)?0:l}});const s={establishmentId:p.establishmentId,name:t.querySelector("#serviceName").value,price:parseFloat(t.querySelector("#servicePrice").value),duration:parseInt(t.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(t.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:t.querySelector("#serviceCategory").value||null,commissionRate:parseFloat(t.querySelector("#serviceCommissionRate").value)||0,active:t.querySelector("#serviceStatus").value==="true",photo:t.querySelector("#servicePhotoBase64").value,notes:t.querySelector("#serviceNotes").value,commissionType:r,professionalCommissions:o};try{a?(await Rs(a,s),Le(p.establishmentId,Be(),"Serviços","Editou",`Editou o serviço: ${s.name}`)):(await Fs(s),Le(p.establishmentId,Be(),"Serviços","Criou",`Criou novo serviço: ${s.name}`)),document.getElementById("serviceModal").style.display="none",g("Sucesso",`Serviço ${a?"atualizado":"adicionado"} com sucesso!`,"success"),await et()}catch(n){g("Erro",n.message,"error")}}function an(e,t=800,a=800,o="image/jpeg",r=.8){return new Promise((s,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=d=>{const l=new Image;l.onload=()=>{let c=l.width,u=l.height;c>u?c>t&&(u*=t/c,c=t):u>a&&(c*=a/u,u=a);const m=document.createElement("canvas");m.width=c,m.height=u,m.getContext("2d").drawImage(l,0,0,c,u);const f=m.toDataURL(o,r);s(f)},l.onerror=c=>n(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},i.onerror=d=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function Oa(e=null){const t=document.getElementById("serviceModal"),a=p.serviceCategories||[],o=e?.duration||0,r=e?.bufferTime||0,s=a.map(h=>`<option value="${h.id}" ${e?.categoryId===h.id?"selected":""}>${h.name}</option>`).join("");t.innerHTML=`
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
                            <input type="number" id="serviceDurationMinutes" min="0" value="${o}" class="mt-1 w-full p-2 border rounded-md" required>
                        </div>
                        <div>
                            <label for="serviceBufferTimeMinutes" class="block text-sm font-medium text-gray-700">Minutos Extras</label>
                            <input type="number" id="serviceBufferTimeMinutes" min="0" value="${r}" class="mt-1 w-full p-2 border rounded-md">
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
    </div>`,t.style.display="flex",t.addEventListener("click",async h=>{const x=h.target.closest("button[data-action]");if(!x)return;const S=x.dataset.action,E=x.dataset.id;if(S==="close-modal"&&(t.style.display="none"),S==="delete-service"){if(!E)return;if(t.style.display="none",await A("Apagar Serviço","Tem a certeza que deseja apagar este serviço?"))try{const D=p.services.find(H=>H.id===E)?.name||"Desconhecido";await js(E),Le(p.establishmentId,Be(),"Serviços","Excluiu",`Excluiu o serviço: ${D}`),g("Sucesso","Serviço apagado com sucesso!","success"),await et()}catch(D){g("Erro",`Não foi possível apagar o serviço: ${D.message}`,"error")}else t.style.display="flex"}});const n=t.querySelectorAll(".tab-btn"),i=t.querySelectorAll(".tab-content");n.forEach(h=>{h.addEventListener("click",()=>{n.forEach(x=>{x.classList.remove("border-indigo-500","text-indigo-600"),x.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),h.classList.add("border-indigo-500","text-indigo-600"),h.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),i.forEach(x=>x.classList.add("hidden")),document.getElementById(`tab-content-${h.dataset.tab}`).classList.remove("hidden")})});const d=t.querySelectorAll('input[name="commissionType"]'),l=document.getElementById("defaultCommissionRateContainer"),c=document.getElementById("professionalCommissionsContainer");function u(){const h=t.querySelector('input[name="commissionType"]:checked').value;l&&(l.style.display=h==="default"?"block":"none"),c&&(c.style.display=h==="custom"?"block":"none")}d.forEach(h=>h.addEventListener("change",u));const m=document.getElementById("professionalCommissionsList");m&&(m.innerHTML=(p.professionals||[]).map(h=>{const x=e?.professionalCommissions?.[h.id]!==void 0,S=e?.professionalCommissions?.[h.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-md ${x?"bg-blue-50":""}" data-prof-id="${h.id}">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" ${x?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <img src="${h.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${h.name.charAt(0)}`}" class="w-8 h-8 rounded-full object-cover">
                        <span class="text-sm font-medium">${h.name}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${S}" class="w-20 p-1 border rounded-md text-sm text-center" ${x?"":"disabled"}>
                        <span class="text-sm font-semibold">%</span>
                    </div>
                </div>
            `}).join(""),m.querySelectorAll('input[type="checkbox"]').forEach(h=>{h.addEventListener("change",x=>{const S=x.target.closest(".professional-commission-row");S.querySelector('input[type="number"]').disabled=!x.target.checked,S.classList.toggle("bg-blue-50",x.target.checked)})})),u();const b=t.querySelector("#serviceForm"),f=t.querySelector("#servicePhotoInput"),v=t.querySelector("#servicePhotoPreview"),y=t.querySelector("#servicePhotoBase64");t.querySelector("#servicePhotoButton").addEventListener("click",()=>f.click()),f.onchange=async()=>{const h=f.files[0];if(h){v.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const x=await an(h,800,800,"image/jpeg",.8),E=x.length*3/4,T=1e3*1024;if(E>T)throw new Error("A imagem é muito grande mesmo após a compressão.");v.src=x,y.value=x}catch(x){console.error("Erro ao processar imagem:",x),g("Erro de Imagem",x.message||"Não foi possível processar a imagem.","error"),v.src=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",y.value=e?.photo||"",f.value=""}}},b.addEventListener("submit",tn)}function we(){const e=document.getElementById("servicesList");if(!e)return;const t=document.getElementById("serviceSearchInput")?.value.toLowerCase()||"",a=document.getElementById("serviceCategoryFilter")?.value||"all",o=new Map((p.serviceCategories||[]).map(s=>[s.id,s.name]));let r=(p.services||[]).filter(Boolean);if(fe!=="all"){const s=fe==="active";r=r.filter(n=>n.active!==!1===s)}r=r.filter(s=>{const n=s.name.toLowerCase().includes(t),i=a==="all"||s.categoryId===a;return n&&i}),e.innerHTML="",r.length>0?r.forEach(s=>{const n=document.createElement("div"),i=JSON.stringify(s).replace(/'/g,"&apos;");n.className=`service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 ${s.active!==!1?"opacity-100":"opacity-50 bg-gray-100"} sm:flex-col`,n.dataset.action="edit-service",n.dataset.service=i;const d=s.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(s.name.charAt(0))}`,l=o.get(s.categoryId)||"N/A";n.innerHTML=`
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
                </div>`,e.appendChild(n)}):e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>'}function ka(){const e={active:0,inactive:0,total:0},t=(p.services||[]).filter(Boolean);t.forEach(n=>{n.active===!1?e.inactive++:e.active++}),e.total=t.length;const a=document.getElementById("indicator-total"),o=document.getElementById("indicator-active"),r=document.getElementById("indicator-inactive"),s=document.getElementById("indicator-popular");a&&(a.textContent=e.total),o&&(o.textContent=e.active),r&&(r.textContent=e.inactive),s&&(p.mostPopularService&&p.mostPopularService.name!=="N/A"?(s.textContent=p.mostPopularService.name,s.closest(".indicator-card").title=`${p.mostPopularService.name} (${p.mostPopularService.count} agendamentos)`):(s.textContent="N/A",s.closest(".indicator-card").title="Nenhum serviço agendado ainda"))}function on(){const e=document.getElementById("services-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("serviceCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(p.serviceCategories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${a.name}</option>`)),ka(),we()}function sn(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="p-8 text-center">
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2">Em breve, aqui poderás ver relatórios detalhados sobre os teus serviços mais rentáveis, mais agendados e muito mais.</p>
        </div>
    `}async function et(){const e=document.getElementById("services-content-container");if(e){const t=e.querySelector(".loader");t&&(t.style.display="block")}try{const[t,a,o,r]=await Promise.all([De(p.establishmentId),_(p.establishmentId),qt(p.establishmentId,"services"),Os(p.establishmentId)]);p.services=(t||[]).filter(Boolean),p.professionals=(a||[]).filter(Boolean),p.serviceCategories=(o||[]).filter(Boolean),p.mostPopularService=r||{name:"N/A",count:0},p.services.forEach(s=>{s.active===void 0&&(s.active=!0)}),Bo(Re)}catch(t){e&&(e.innerHTML='<p class="text-red-500 col-span-full text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>'),g("Erro",`Não foi possível carregar os dados: ${t.message}`,"error")}}function Bo(e){if(document.getElementById("services-content-container")){if(Re===e&&document.getElementById("services-content-container").children.length>1){Re==="services"&&(ka(),we());return}Re=e,fe="all",document.querySelectorAll("#services-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="services"?on():e==="reports"&&sn()}}function rn(){ne&&(pe.removeEventListener("click",ne),pe.removeEventListener("input",ne),pe.removeEventListener("change",ne)),ne=async e=>{const t=e.target;if(t.closest('[data-action="toggle-service-status"]')){e.stopPropagation();const r=t.closest('[data-action="toggle-service-status"]'),s=r.dataset.id,n=r.checked;try{await Hs(s,n);const i=p.services.findIndex(d=>d.id===s);i>-1&&(p.services[i].active=n),Le(p.establishmentId,Be(),"Serviços","Atualizou Status",`Alterou status do serviço (ID: ${s}) para ${n?"Ativo":"Inativo"}`),we(),ka()}catch(i){g("Erro",`Não foi possível atualizar o status: ${i.message}`,"error"),r.checked=!n,we()}return}const a=t.closest("button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]");if(t.id==="serviceSearchInput"||t.id==="serviceCategoryFilter"){we();return}if(!a)return;if(a.hasAttribute("data-view")){Bo(a.dataset.view);return}switch(a.dataset.action){case"new-service":Oa();break;case"edit-service":const r=JSON.parse(a.dataset.service);Oa(r);break;case"manage-categories":en();break;case"filter-service":const s=a.dataset.filterType;if(s==="popular")return;fe=s==="total"?"all":s,document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(n=>{const i=n.dataset.filterType,l=i===fe||i==="total"&&fe==="all";n.classList.toggle("ring-2",l),n.classList.toggle("ring-indigo-500",l),n.classList.toggle("shadow-lg",l)}),we();break}},pe.addEventListener("click",ne),pe.addEventListener("input",ne),pe.addEventListener("change",ne)}async function nn(){pe.innerHTML=`
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
        </section>`,rn();try{(!p.professionals||p.professionals.length===0)&&(p.professionals=await _(p.establishmentId)||[])}catch(e){console.error("Falha ao carregar profissionais:",e),g("Erro","Não foi possível carregar a lista de profissionais.","error"),p.professionals=[]}Re="services",fe="all",await et()}const Nt="suppliers",To="purchases",$a=async()=>{try{const e=await mo(Te(Q,Nt)),t=[];return e.forEach(a=>{t.push({id:a.id,...a.data()})}),t}catch(e){throw console.error("Erro ao buscar fornecedores:",e),e}},ln=async e=>{try{return{id:(await pa(Te(Q,Nt),e)).id,...e}}catch(t){throw console.error("Erro ao criar fornecedor:",t),t}},dn=async(e,t)=>{try{const a=Bt(Q,Nt,e);return await bo(a,t),{id:e,...t}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},cn=async e=>{try{const t=Bt(Q,Nt,e);return await Yo(t),!0}catch(t){throw console.error("Erro ao excluir fornecedor:",t),t}},un=async e=>{try{const t={...e,createdAt:new Date};return{id:(await pa(Te(Q,To),t)).id,...t}}catch(t){throw console.error("Erro ao registrar compra:",t),t}},mn=async e=>{try{const t=po(Te(Q,To),go("createdAt","desc")),a=await mo(t),o=[];return a.forEach(r=>{o.push({id:r.id,...r.data()})}),o}catch(t){throw console.error("Erro ao buscar histórico de compras:",t),t}},ce=document.getElementById("content");let ie=null,je="products",K="all";async function pn(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),o=a.value;if(o)try{await Io({establishmentId:p.establishmentId,name:o},"products"),a.value="",g("Sucesso","Categoria de produto criada!","success"),await Sa(),await tt()}catch(r){g("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}}async function gn(e){if(await A("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await Lo(e,"products"),g("Sucesso","Categoria de produto apagada.","success"),await Sa(),await tt()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function Sa(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await qt(p.establishmentId,"products");p.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${a.name}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function bn(){N({title:"Gerir Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",pn),t.addEventListener("click",o=>{const r=o.target.closest('button[data-action="delete-category"]');r&&gn(r.dataset.id)}))}Sa()}async function fn(e){if(!e)return;if(await A("Apagar Produto","Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida."))try{await hr(e),g("Sucesso","Produto apagado com sucesso!","success"),await tt()}catch(a){g("Erro",`Não foi possível apagar o produto: ${a.message}`,"error")}}async function vn(e){const t=e.querySelector("#productId").value,a=parseInt(e.querySelector("#productCurrentStock").value),o=parseInt(e.querySelector("#productMinStock").value),r=parseInt(e.querySelector("#productMaxStock").value),s=e.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),n=Array.from(s).map(d=>d.dataset.id),i={establishmentId:p.establishmentId,name:e.querySelector("#productName").value,price:parseFloat(e.querySelector("#productPrice").value),costPrice:parseFloat(e.querySelector("#productCostPrice").value)||0,commissionRate:parseFloat(e.querySelector("#productCommissionRate").value)||0,currentStock:isNaN(a)?0:a,minStock:isNaN(o)?0:o,maxStock:isNaN(r)?0:r,categoryId:e.querySelector("#productCategory").value||null,photo:e.querySelector("#productPhotoBase64").value,supplierIds:n};try{t?await vr(t,i):await fr(i),document.getElementById("productModal").style.display="none",g("Sucesso",`Produto ${t?"atualizado":"adicionado"} com sucesso!`,"success"),await tt()}catch(d){throw new Error(d.message)}}function za(e,t=800,a=800,o="image/jpeg",r=.8){return new Promise((s,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=d=>{const l=new Image;l.onload=()=>{let c=l.width,u=l.height;c>u?c>t&&(u*=t/c,c=t):u>a&&(c*=a/u,u=a);const m=document.createElement("canvas");m.width=c,m.height=u,m.getContext("2d").drawImage(l,0,0,c,u);const f=m.toDataURL(o,r);s(f)},l.onerror=c=>n(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},i.onerror=d=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function Va(e=null){const t=document.getElementById("productModal"),a=p.categories||[],o=p.suppliers||[],r=a.map(y=>`<option value="${y.id}" ${e?.categoryId===y.id?"selected":""}>${y.name}</option>`).join("");let s=new Set(e?.supplierIds||[]);t.innerHTML=`
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
                        <button type="button" data-tab="suppliers" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Fornecedores</button>
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
                            
                            <div class="form-group"><label for="productPrice">Preço Venda (R$)</label><input type="number" id="productPrice" step="0.01" value="${e?.price||""}" required class="mt-1 w-full p-2 border rounded-md"></div>
                            
                            <div class="form-group"><label for="productCostPrice">Preço de Custo Médio (R$)</label><input type="number" id="productCostPrice" step="0.01" value="${e?.costPrice||""}" class="mt-1 w-full p-2 border rounded-md" placeholder="0.00"></div>
                            
                            <div class="form-group"><label for="productCommissionRate">Comissão (%)</label><input type="number" id="productCommissionRate" placeholder="Ex: 10" value="${e?.commissionRate||""}" class="mt-1 w-full p-2 border rounded-md"></div>
                        </div></div>
                    </div>
                    <div class="mt-6 pt-6 border-t"><h3 class="text-lg font-semibold text-gray-700 text-left mb-4">Controlo de Stock (Definições)</h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div class="form-group"><label for="productCurrentStock">Atual</label><input type="number" id="productCurrentStock" value="${e?.currentStock||0}" readonly class="mt-1 w-full p-2 border rounded-md bg-gray-100"></div>
                        <div class="form-group"><label for="productMinStock">Mínimo (Alerta)</label><input type="number" id="productMinStock" value="${e?.minStock||0}" class="mt-1 w-full p-2 border rounded-md"></div>
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
    </div>`;const n=t.querySelector("#productCategory"),i=t.querySelector("#productPhotoInput");t.querySelector("#productPhotoButton").addEventListener("click",()=>i.click()),n.innerHTML='<option value="">Sem categoria</option>'+(p.categories||[]).map(y=>`<option value="${y.id}" ${e?.categoryId===y.id?"selected":""}>${y.name}</option>`).join(""),e&&(n.value=e.categoryId||"");const d=t.querySelector("#productPhotoPreview");t.querySelector("#productPhotoBase64");const l=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",c=e?.photo||"";i.onchange=async()=>{const y=i.files[0];if(y){d.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const h=await za(y,800,800,"image/jpeg",.8),S=h.length*3/4,E=1e3*1024;if(S>E)throw new Error("A imagem é muito grande mesmo após a compressão.");preview.src=h,base64Input.value=h}catch(h){console.error("Erro ao processar imagem:",h),g("Erro de Imagem",h.message||"Não foi possível processar a imagem.","error"),preview.src=l,base64Input.value=c,v.value=""}}};const u=t.cloneNode(!0);t.parentNode.replaceChild(u,t);const m=()=>{const y=u.querySelector("#modalSupplierSearch"),h=u.querySelector("#supplierSearchResults"),x=u.querySelector("#selectedSuppliersList"),S=y.value.toLowerCase();if(S.length>0){const E=o.filter(T=>T.name.toLowerCase().includes(S)&&!s.has(T.id));E.length>0?(h.classList.remove("hidden"),h.innerHTML=E.map(T=>`
                    <div class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 text-sm flex justify-between items-center" data-add-supplier="${T.id}">
                        <span class="font-medium">${T.name}</span>
                        <span class="text-indigo-600 text-xs">+ Adicionar</span>
                    </div>
                `).join("")):(h.classList.remove("hidden"),h.innerHTML='<div class="p-2 text-xs text-gray-500 text-center">Nenhum resultado disponível.</div>')}else h.classList.add("hidden");s.size>0?(x.innerHTML="",s.forEach(E=>{const T=o.find(D=>D.id===E);T&&(x.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border p-2 rounded shadow-sm" data-id="${T.id}">
                            <div class="text-sm">
                                <p class="font-bold text-gray-800">${T.name}</p>
                                <p class="text-xs text-gray-500">${T.contactName||""} - ${T.phone||""}</p>
                            </div>
                            <button type="button" class="text-red-500 hover:text-red-700 p-1" data-remove-supplier="${T.id}" title="Remover">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    `)})):x.innerHTML='<p class="text-xs text-gray-400 text-center py-2">Nenhum fornecedor selecionado.</p>'};u.querySelector("#modalSupplierSearch").addEventListener("input",m),u.addEventListener("click",y=>{const h=y.target.closest("[data-add-supplier]");if(h){const S=h.dataset.addSupplier;s.add(S),u.querySelector("#modalSupplierSearch").value="",m()}const x=y.target.closest("[data-remove-supplier]");if(x){const S=x.dataset.removeSupplier;s.delete(S),m()}}),m(),u.addEventListener("click",async y=>{const h=y.target.closest("button[data-action]");if(!h)return;const x=h.dataset.action,S=u.querySelector("#productId").value;if(x==="close-modal"&&(u.style.display="none"),x==="delete-product"){if(!S)return;u.style.display="none",await fn(S)}if(x==="save-product-modal"){const E=u.querySelector("#productForm");if(E){if(!E.querySelector("#productName").value||!E.querySelector("#productPrice").value){g("Erro","Nome e Preço de Venda são obrigatórios.","error");return}const T=h.closest('button[data-action="save-product-modal"]');T.disabled=!0,T.textContent="A salvar...";try{await vn(E)}catch(D){g("Erro",`Falha ao salvar: ${D.message}`,"error"),T.disabled=!1,T.textContent="Salvar Alterações"}}}if(x==="adjust-stock-modal"){y.preventDefault();const E=u.querySelector("#stockAdjustmentAmount"),T=u.querySelector("#stockAdjustmentReason"),D=parseInt(E.value,10),H=parseInt(h.dataset.change,10);if(!D||D<=0){g("Erro","Por favor, insira uma quantidade válida.","error");return}const M=D*H,q=T.value||(M>0?"Entrada manual":"Saída manual");try{await xr(S,{change:M,reason:q});const F=p.products.findIndex(O=>O.id===S);if(F>-1){const O=p.products[F].currentStock+M;p.products[F].currentStock=O,u.querySelector("#currentStockDisplay").textContent=O,u.querySelector("#productCurrentStock").value=O,E.value="",T.value="",g("Sucesso","Estoque atualizado!","success"),Ea(),Ge()}}catch(F){g("Erro de Stock",F.message,"error")}}});const b=u.querySelectorAll(".tab-btn"),f=u.querySelectorAll(".tab-content");b.forEach(y=>{y.addEventListener("click",h=>{h.preventDefault(),b.forEach(x=>{x.classList.remove("border-indigo-500","text-indigo-600"),x.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),y.classList.add("border-indigo-500","text-indigo-600"),y.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),f.forEach(x=>x.classList.add("hidden")),document.getElementById(`tab-content-${y.dataset.tab}`).classList.remove("hidden")})});const v=u.querySelector("#productPhotoInput");u.querySelector("#productPhotoButton").addEventListener("click",()=>v.click()),v.onchange=async()=>{const y=v.files[0];if(!y)return;const h=u.querySelector("#productPhotoPreview"),x=u.querySelector("#productPhotoBase64");h.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const S=await za(y,800,800,"image/jpeg",.8),T=S.length*3/4,D=1e3*1024;if(T>D)throw new Error("A imagem é muito grande mesmo após a compressão.");h.src=S,x.value=S}catch(S){console.error("Erro ao processar imagem:",S),g("Erro de Imagem",S.message||"Não foi possível processar a imagem.","error"),h.src=l,x.value=c,v.value=""}},u.style.display="flex"}function hn(){const e=document.getElementById("products-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("productCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(p.categories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${a.name}</option>`)),Ea(),Ge()}function xn(){const e=document.getElementById("products-content-container"),t=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const o=a.toISOString().split("T")[0];e.innerHTML=`
        <div class="space-y-6">
             <div class="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 items-end bg-white p-4 rounded-lg shadow-sm">
                <div class="col-span-1"><label for="reportStartDate" class="block text-xs font-medium text-gray-700">De</label><input type="date" id="reportStartDate" value="${o}" class="mt-1 w-full p-2 border rounded-md text-sm"></div>
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
        </div>`;const r=document.getElementById("productFilterReport"),s=document.getElementById("categoryFilterReport");r&&p.products&&(r.innerHTML+=p.products.map(n=>`<option value="${n.id}">${n.name}</option>`).join("")),s&&p.categories&&(s.innerHTML+=p.categories.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""))}async function yn(){const e=document.getElementById("report-results");e.innerHTML='<div class="loader mx-auto my-8"></div>';const t={startDate:document.getElementById("reportStartDate").value,endDate:document.getElementById("reportEndDate").value,productId:document.getElementById("productFilterReport").value,categoryId:document.getElementById("categoryFilterReport").value};try{const a=await yr(t);if(a.length===0){e.innerHTML=`
                <div class="bg-white border rounded-lg shadow-sm p-8">
                    <p class="text-center text-gray-500">Nenhuma movimentação encontrada para este período.</p>
                </div>`;return}const o=`
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
            </div>`,r=`
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
            </div>`;e.innerHTML=o+r}catch(a){g("Erro",`Não foi possível gerar o relatório: ${a.message}`,"error"),e.innerHTML=`<div class="bg-white border border-red-200 rounded-lg p-8 text-center text-red-500">${a.message}</div>`}}function Ea(){const e={ok:0,near_min:0,at_min:0,empty:0};if(!p.products)return;p.products.forEach(s=>{if(!s)return;const n=s.currentStock,i=s.minStock;n<=0?e.empty++:i>0&&n<=i?e.at_min++:i>0&&n<=i*1.2?e.near_min++:e.ok++});const t=document.getElementById("indicator-ok"),a=document.getElementById("indicator-near-min"),o=document.getElementById("indicator-at-min"),r=document.getElementById("indicator-empty");t&&(t.textContent=e.ok),a&&(a.textContent=e.near_min),o&&(o.textContent=e.at_min),r&&(r.textContent=e.empty)}function Ge(){const e=document.getElementById("productsList");if(!e)return;const t=document.getElementById("productSearchInput")?.value.toLowerCase()||"",a=document.getElementById("productCategoryFilter")?.value||"all",o=new Map((p.categories||[]).map(s=>[s.id,s.name]));let r=(p.products||[]).filter(Boolean);K!=="all"&&(r=r.filter(s=>{const n=s.currentStock,i=s.minStock;switch(K){case"ok":return n>0&&(i===0||n>i*1.2);case"near_min":return i>0&&n>i&&n<=i*1.2;case"at_min":return i>0&&n>0&&n<=i;case"empty":return n<=0;default:return!0}})),r=r.filter(s=>{const n=s.name.toLowerCase().includes(t),i=a==="all"||s.categoryId===a;return n&&i}),e.innerHTML="",r.length>0?(e.className="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 sm:space-y-0",r.forEach(s=>{const n=document.createElement("div"),i=JSON.stringify(s).replace(/'/g,"&apos;");n.className=`product-card bg-white rounded-lg shadow-md flex items-center gap-3 p-3 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 
                              sm:flex-col sm:p-0 sm:items-stretch sm:gap-0`,n.dataset.action="edit-product",n.dataset.product=i;const d=s.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(s.name.charAt(0))}`,l=o.get(s.categoryId)||"N/A";let c="",u="text-gray-500";const m=s.currentStock,b=s.minStock;m<=0?(c='<span class="text-xs font-semibold text-red-600">Esgotado</span>',u="text-red-600 font-semibold"):b>0&&m<=b?(c='<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>',u="text-orange-600 font-semibold"):b>0&&m<=b*1.2?(c='<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>',u="text-blue-600 font-semibold"):(c='<span class="text-xs font-semibold text-green-600">Em Estoque</span>',u="text-green-600 font-semibold"),n.innerHTML=`
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
                            Estoque: <span class="font-bold text-base ${u}">${s.currentStock}</span>
                        </p>
                    </div>
                </div>`,e.appendChild(n)})):(e.className="",e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>')}async function tt(){const e=document.getElementById("products-content-container");e&&(e.innerHTML='<div class="loader col-span-full mx-auto my-8"></div>');try{const[t,a,o]=await Promise.all([At(p.establishmentId),qt(p.establishmentId,"products"),$a()]);p.products=(t||[]).filter(Boolean),p.categories=(a||[]).filter(Boolean),p.suppliers=(o||[]).filter(Boolean),Do(je)}catch(t){e&&(e.innerHTML=`<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados: ${t.message}</p>`)}}function Do(e){if(document.getElementById("products-content-container")){if(je===e&&document.getElementById("products-content-container").children.length>1){je==="products"&&(Ea(),Ge());return}je=e,K="all",document.querySelectorAll("#products-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="products"?hn():e==="movements"&&xn()}}async function wn(){ce.innerHTML=`
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
        </section>`,ie&&(ce.removeEventListener("click",ie),ce.removeEventListener("input",ie),ce.removeEventListener("change",ie)),ie=async e=>{const t=e.target;if(t.id==="productSearchInput"||t.id==="productCategoryFilter"){Ge();return}const a=e.target.closest("button[data-action], button[data-view], .indicator-card[data-action], .product-card[data-action]");if(!a||e.target.closest('[data-action-stop-propagation="true"]'))return;if(a.hasAttribute("data-view")){Do(a.dataset.view);return}switch(a.dataset.action){case"new-product":Va();break;case"edit-product":Va(JSON.parse(a.dataset.product));break;case"manage-product-categories":bn();break;case"generate-report":await yn();break;case"filter-stock":const r=a.dataset.filterType;K=K===r?"all":r,document.querySelectorAll(".indicator-card").forEach(s=>{s.classList.toggle("ring-2",s.dataset.filterType===K),s.classList.toggle("ring-indigo-500",s.dataset.filterType===K),s.classList.toggle("shadow-lg",s.dataset.filterType===K)}),Ge();break}},ce.addEventListener("click",ie),ce.addEventListener("input",ie),ce.addEventListener("change",ie),je="products",K="all",await tt()}const ue=document.getElementById("content");let le=null,ht="list",P={step:1,productsToBuy:[],allSuppliers:[],finalOrders:{},isQuoteMode:!1};async function kn(){ht==="list"?Ft():ht==="purchases"?(P.step=1,He()):ht==="history"&&Ln()}async function $n(){try{const e=await $a();return p.suppliers=e||[],P.allSuppliers=e,!0}catch(e){return console.error(e),!1}}async function Sn(e){if(await A("Excluir Fornecedor","Tem a certeza? Isso removerá o vínculo com os produtos."))try{await cn(e),g("Sucesso","Fornecedor excluído.","success"),Tt("genericModal"),Ft()}catch(t){g("Erro","Erro ao excluir: "+t.message,"error")}}async function En(e){e.preventDefault();const t=e.target,a=t.querySelector("#supId").value,o={name:t.querySelector("#supName").value,contactName:t.querySelector("#supContact").value,email:t.querySelector("#supEmail").value,phone:t.querySelector("#supPhone").value,taxId:t.querySelector("#supTaxId").value,category:t.querySelector("#supCategory").value},r=t.querySelector('button[type="submit"]');r.disabled=!0,r.textContent="A salvar...";try{a?(await dn(a,o),g("Sucesso","Fornecedor atualizado!","success")):(await ln(o),g("Sucesso","Fornecedor criado!","success")),Tt("genericModal"),Ft()}catch(s){g("Erro","Erro ao salvar: "+s.message,"error")}finally{r.disabled=!1,r.textContent="Salvar"}}async function Ft(){const e=document.getElementById("suppliersList");if(!e)return;e.innerHTML='<div class="loader mx-auto my-8"></div>',await $n();const t=document.getElementById("supplierSearchInput")?.value.toLowerCase()||"",a=p.suppliers.filter(s=>s.name.toLowerCase().includes(t)||s.contactName&&s.contactName.toLowerCase().includes(t));if(e.innerHTML="",a.length===0){e.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum fornecedor encontrado.</div>';return}let o='<div class="flex flex-col gap-2 md:hidden">';a.forEach(s=>{const n=JSON.stringify(s).replace(/"/g,"&quot;");o+=`
            <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer supplier-item-mobile" data-supplier="${n}">
                <div class="flex-1 min-w-0 pr-3">
                    <h3 class="font-bold text-gray-900 text-sm truncate">${s.name}</h3>
                    <div class="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <span class="truncate bg-gray-100 px-1.5 py-0.5 rounded">${s.category||"Geral"}</span>
                        ${s.contactName?`<span class="truncate">• ${s.contactName}</span>`:""}
                    </div>
                </div>
                <div class="text-gray-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
            </div>
        `}),o+="</div>";let r=`
        <div class="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fornecedor</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
    `;a.forEach(s=>{const n=JSON.stringify(s).replace(/"/g,"&quot;");r+=`
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${s.name}</div>
                    <div class="text-sm text-gray-500">${s.taxId||"Sem doc."}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${s.email||"-"}</div>
                    <div class="text-sm text-gray-500">${s.phone||"-"}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        ${s.category||"Geral"}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button data-action="edit" data-supplier="${n}" class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                    <button data-action="delete" data-id="${s.id}" class="text-red-600 hover:text-red-900">Excluir</button>
                </td>
            </tr>
        `}),r+="</tbody></table></div>",e.innerHTML=o+r}function Cn(e){const t=e.phone?`https://wa.me/${e.phone.replace(/\D/g,"")}`:"#",a=e.phone?`tel:${e.phone}`:"#",o=e.email?`mailto:${e.email}`:"#",r=JSON.stringify(e).replace(/"/g,"&quot;"),s=`
        <div class="text-center mb-6">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-500 text-2xl font-bold uppercase">
                ${e.name.substring(0,2)}
            </div>
            <h3 class="text-xl font-bold text-gray-900 leading-tight mb-1">${e.name}</h3>
            <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                ${e.category||"Fornecedor"}
            </span>
        </div>

        <div class="space-y-4 mb-8">
            ${e.contactName?`
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                <span class="text-gray-500 text-sm">Contato</span>
                <span class="font-medium text-gray-800">${e.contactName}</span>
            </div>`:""}
            ${e.phone?`
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                <span class="text-gray-500 text-sm">Telefone</span>
                <span class="font-medium text-gray-800">${e.phone}</span>
            </div>`:""}
        </div>

        <div class="grid grid-cols-3 gap-3 mb-6">
            <a href="${t}" target="_blank" class="${e.phone?"":"opacity-50 pointer-events-none"} flex flex-col items-center justify-center p-3 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
                <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.897.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span class="text-xs font-bold">WhatsApp</span>
            </a>
            <a href="${a}" class="${e.phone?"":"opacity-50 pointer-events-none"} flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
                <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span class="text-xs font-bold">Ligar</span>
            </a>
            <a href="${o}" class="${e.email?"":"opacity-50 pointer-events-none"} flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span class="text-xs font-bold">Email</span>
            </a>
        </div>

        <div class="flex flex-col gap-3">
            <button data-action="edit" data-supplier="${r}" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-sm shadow hover:bg-indigo-700 active:scale-[0.98] transition-transform">
                Editar Informações
            </button>
            <button data-action="delete" data-id="${e.id}" class="w-full bg-white text-red-600 border border-red-200 py-3 rounded-lg font-bold text-sm hover:bg-red-50 active:scale-[0.98] transition-transform">
                Excluir Fornecedor
            </button>
        </div>
    `;N({title:"",contentHTML:s,maxWidth:"max-w-md"})}async function He(){const e=document.getElementById("purchasesContainer");if(e)if(P.step===1){e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const[t,a]=await Promise.all([At(p.establishmentId),$a()]);P.allSuppliers=a||[];const o=t.filter(l=>{const c=parseInt(l.currentStock||0),u=parseInt(l.minStock||0);return c<=u});if(P.productsToBuy=o,o.length===0){e.innerHTML=`
                    <div class="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div class="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800">Tudo em ordem!</h3>
                        <p class="text-gray-600">Nenhum produto abaixo do estoque mínimo.</p>
                        <button class="mt-4 text-indigo-600 hover:underline text-sm" onclick="window.location.reload()">Atualizar Dados</button>
                    </div>
                `;return}let r='<div class="flex flex-col gap-3 md:hidden">',s="";o.forEach(l=>{const c=parseInt(l.minStock)||0,u=parseInt(l.currentStock)||0,m=Math.max(c-u,1),b=parseFloat(l.costPrice||0);let f='<option value="">Selecione...</option>';P.allSuppliers.length>0?P.allSuppliers.forEach(v=>{const h=l.supplierIds&&l.supplierIds.includes(v.id)?"selected":"";f+=`<option value="${v.id}" ${h}>${v.name}</option>`}):f='<option value="">Sem fornecedores</option>',r+=`
                    <div class="product-row bg-white p-3 rounded-lg shadow-sm border border-gray-200" data-product-id="${l.id}" data-cost="${b}">
                        <div class="flex justify-between items-start mb-2">
                            <div class="flex items-center gap-2">
                                <input type="checkbox" class="row-select w-5 h-5 text-indigo-600 rounded border-gray-300" checked>
                                <div>
                                    <p class="font-bold text-gray-800 text-sm">${l.name}</p>
                                    <p class="text-xs text-gray-500">Custo: R$ ${b.toFixed(2)}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="text-[10px] text-gray-500 uppercase font-bold tracking-wide block mb-0.5">Estoque</span>
                                <div class="flex items-center justify-end gap-1 text-xs">
                                    <span class="font-bold text-red-600">${u}</span>
                                    <span class="text-gray-400">/</span>
                                    <span class="font-medium text-gray-600">${c} (Mín)</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-3 items-center mt-2">
                            <div>
                                <label class="text-xs text-gray-500 block mb-1">Qtd. a Comprar</label>
                                <input type="number" class="qty-input w-full p-2 border border-gray-300 rounded text-center font-bold text-indigo-700 bg-indigo-50" value="${m}" min="1">
                            </div>
                            <div>
                                <label class="text-xs text-gray-500 block mb-1">Fornecedor</label>
                                <select class="supplier-select w-full p-2 border border-gray-300 rounded bg-white text-xs truncate">
                                    ${f}
                                </select>
                            </div>
                        </div>
                        <div class="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                            <span class="text-xs text-gray-500">Subtotal Previsto:</span>
                            <span class="row-subtotal font-bold text-indigo-600 text-sm">R$ ${(m*b).toFixed(2)}</span>
                        </div>
                    </div>
                `,s+=`
                    <tr class="hover:bg-gray-50 border-b border-gray-100 product-row" data-product-id="${l.id}" data-cost="${b}">
                        <td class="p-3 pl-4 text-center w-10">
                            <input type="checkbox" class="row-select w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" checked>
                        </td>
                        <td class="p-3 font-medium text-gray-800">${l.name}</td>
                        <td class="p-3 text-center text-xs text-gray-600">
                            <div class="flex flex-col items-center">
                                <span class="font-bold text-red-600">${u} <span class="text-gray-400 font-normal">Atual</span></span>
                                <span class="border-t border-gray-200 w-12 my-0.5"></span>
                                <span class="font-medium">${c} <span class="text-gray-400 font-normal">Mínimo</span></span>
                            </div>
                        </td>
                        <td class="p-3 text-center w-24">
                            <input type="number" class="qty-input w-full p-2 border border-gray-300 rounded text-center text-lg font-bold text-indigo-700 bg-indigo-50" value="${m}" min="1">
                        </td>
                        <td class="p-3 text-right text-sm text-gray-600">R$ ${b.toFixed(2)}</td>
                        <td class="p-3 text-right text-sm font-bold text-gray-800 row-subtotal">R$ ${(m*b).toFixed(2)}</td>
                        <td class="p-3 w-48">
                            <select class="supplier-select w-full p-2 border border-gray-300 rounded-md bg-white text-sm">
                                ${f}
                            </select>
                        </td>
                    </tr>
                `}),r+="</div>";const n=P.isQuoteMode?"REVISAR COTAÇÕES":"GERAR PEDIDOS DE COMPRA",i=P.isQuoteMode?"bg-indigo-600 hover:bg-indigo-700":"bg-green-600 hover:bg-green-700",d=P.isQuoteMode?'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>':'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>';e.innerHTML=`
                <div class="space-y-4 animate-fade-in pb-20">
                    <div class="bg-white p-3 md:p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div class="flex flex-col md:flex-row justify-between items-center gap-3">
                            <div class="flex items-center gap-3 w-full md:w-auto">
                                <input type="checkbox" id="toggle-quote-mode" class="w-5 h-5 text-indigo-600 rounded" ${P.isQuoteMode?"checked":""}>
                                <label for="toggle-quote-mode" class="text-sm font-medium text-gray-700 cursor-pointer select-none">
                                    Modo Cotação (Gerar PDF e Enviar)
                                </label>
                            </div>
                            <div class="bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100 text-center w-full md:w-auto flex justify-between md:block items-center">
                                <span class="text-xs text-indigo-600 uppercase font-bold tracking-wide md:block">Total Estimado:</span>
                                <span id="total-purchase-cost" class="text-lg font-bold text-indigo-700">R$ 0,00</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 sticky bottom-4 z-20">
                        <button id="btn-go-to-orders" class="w-full ${i} text-white px-4 py-3 rounded-xl font-bold text-base shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
                            ${n}
                            ${d}
                        </button>
                    </div>

                    ${r}
                    
                    <div class="hidden md:block bg-white border border-gray-200 rounded-lg overflow-x-auto shadow-sm pb-20">
                        <table class="w-full text-left">
                            <thead class="bg-gray-50 text-gray-500 font-semibold text-xs uppercase border-b border-gray-200">
                                <tr>
                                    <th class="p-3 pl-4 w-10 text-center"><input type="checkbox" id="check-all-rows" checked class="w-5 h-5"></th>
                                    <th class="p-3">Produto</th>
                                    <th class="p-3 text-center">Estoque</th>
                                    <th class="p-3 text-center">Qtd. Compra</th>
                                    <th class="p-3 text-right">Custo</th>
                                    <th class="p-3 text-right">Total</th>
                                    <th class="p-3">Fornecedor</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100" id="purchase-table-body">${s}</tbody>
                        </table>
                    </div>
                </div>
            `,sa()}catch(t){console.error(t),e.innerHTML='<p class="text-red-500 text-center">Erro ao calcular compras.</p>'}}else P.step===2&&In(e)}function In(e){if(!P.finalOrders||Object.keys(P.finalOrders).length===0){P.step=1,He();return}const t=P.isQuoteMode;let a="",o=0;const r=t?"border-indigo-100":"border-gray-200",s=t?"bg-indigo-50 border-indigo-100":"bg-gray-50 border-gray-200",n=t?"bg-blue-100 text-blue-700":"bg-green-100 text-green-700",i=t?"hidden":"flex",d=t?"Cotações Prontas":"Pedidos Prontos",l=t?"text-indigo-600":"text-green-600",c=t?"bg-indigo-50 border-indigo-100":"bg-green-50 border-green-100",u=t?"text-indigo-800":"text-green-800";for(const[m,b]of Object.entries(P.finalOrders)){let f=0,v=b.items.map(S=>{const E=S.qty*S.cost;return f+=E,`
            <div class="flex justify-between py-2 border-b border-gray-50 text-sm">
                <span class="text-gray-800 font-medium">${S.name}</span>
                <div class="text-right">
                    <span class="text-gray-500 text-xs block">${S.qty} x R$ ${S.cost.toFixed(2)}</span>
                    <span class="text-indigo-600 font-bold block">R$ ${E.toFixed(2)}</span>
                </div>
            </div>
        `}).join("");o+=f;const y=encodeURIComponent(JSON.stringify({supplierId:m,supplierName:b.info.name,totalAmount:f,items:b.items})),h=encodeURIComponent(JSON.stringify({name:b.info.name,phone:b.info.phone,email:b.info.email})),x=encodeURIComponent(JSON.stringify(b.items));a+=`
            <div class="bg-white border ${r} rounded-xl overflow-hidden shadow-sm supplier-order-card mb-4" data-supplier-id="${m}">
                <div class="${s} p-3 border-b flex justify-between items-center">
                    <div>
                        <h4 class="font-bold text-gray-800 text-base">${b.info.name}</h4>
                        <div class="text-[10px] text-gray-500 flex flex-col">
                            <span>${b.info.email||""}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="${n} text-xs font-bold px-2 py-1 rounded">R$ ${f.toFixed(2)}</span>
                    </div>
                </div>
                <div class="p-3">
                    ${v}
                </div>
                <div class="p-3 bg-gray-50 border-t border-gray-200 grid grid-cols-3 gap-2">
                    <button class="btn-print-order bg-white border border-gray-300 text-gray-700 px-2 py-2.5 rounded-lg hover:bg-gray-50 text-xs font-bold flex items-center justify-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        PDF
                    </button>
                    <button class="btn-send-order bg-green-500 text-white px-2 py-2.5 rounded-lg hover:bg-green-600 text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
                        data-supplier-info="${h}"
                        data-order-items="${x}"
                        data-total="${f}">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.897.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                        Enviar
                    </button>
                    <button class="btn-register-order bg-blue-600 text-white px-2 py-2.5 rounded-lg hover:bg-blue-700 text-xs font-bold items-center justify-center gap-1 shadow-sm ${i}" data-order="${y}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        Salvar
                    </button>
                </div>
            </div>
        `}e.innerHTML=`
        <div class="space-y-4 animate-fade-in pb-24">
            <div class="flex flex-col justify-between items-center gap-3 ${c} p-4 rounded-lg border text-center">
                <div>
                    <h3 class="font-bold ${u} text-lg">${d}</h3>
                    <p class="text-sm ${l}">Valor Estimado: <strong class="text-lg">R$ ${o.toFixed(2)}</strong></p>
                </div>
                <button id="btn-back-step1" class="text-gray-600 hover:text-gray-900 text-sm font-medium underline py-2">
                    ← Voltar e Corrigir
                </button>
            </div>
            <div>
                ${a}
            </div>
        </div>
    `}async function Ln(){const e=document.getElementById("historyContainer");if(e){e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const t=await mn(p.establishmentId);if(t.length===0){e.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum histórico encontrado.</div>';return}let a='<div class="flex flex-col gap-3 md:hidden">';t.forEach(s=>{const n=new Date(s.createdAt.seconds*1e3).toLocaleDateString("pt-BR");a+=`
                <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center active:bg-gray-50 transition-colors">
                    <div>
                        <p class="text-xs text-gray-500 mb-0.5">${n}</p>
                        <p class="font-bold text-gray-800 text-sm">${s.supplierName}</p>
                        <p class="text-xs text-gray-400 mt-0.5">${s.items.length} itens</p>
                    </div>
                    <div class="text-right">
                        <p class="text-indigo-600 font-bold text-sm mb-1">R$ ${parseFloat(s.totalAmount).toFixed(2)}</p>
                        <button class="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 btn-view-purchase" data-purchase='${JSON.stringify(s)}'>
                            Ver
                        </button>
                    </div>
                </div>
            `}),a+="</div>";let r=`
            <div class="hidden md:block bg-white border border-gray-200 rounded-lg overflow-x-auto shadow-sm">
                <table class="min-w-full text-left">
                    <thead class="bg-gray-50 text-gray-500 font-semibold text-xs uppercase border-b border-gray-200">
                        <tr>
                            <th class="p-3 pl-4">Data</th>
                            <th class="p-3">Fornecedor</th>
                            <th class="p-3 text-right">Total</th>
                            <th class="p-3 text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">${t.map(s=>`
            <tr class="hover:bg-gray-50 border-b border-gray-100">
                <td class="p-3 text-sm text-gray-600 whitespace-nowrap">${new Date(s.createdAt.seconds*1e3).toLocaleDateString("pt-BR")}</td>
                <td class="p-3 font-medium text-gray-800">${s.supplierName}</td>
                <td class="p-3 text-right font-bold text-indigo-600 whitespace-nowrap">R$ ${parseFloat(s.totalAmount).toFixed(2)}</td>
                <td class="p-3 text-right">
                    <button class="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-100 btn-view-purchase" data-purchase='${JSON.stringify(s)}'>
                        Ver
                    </button>
                </td>
            </tr>
        `).join("")}</tbody>
                </table>
            </div>
        `;e.innerHTML=a+r}catch(t){console.error(t),e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar histórico.</p>'}}}function Bn(e){const t=new Date(e.createdAt.seconds*1e3).toLocaleString("pt-BR"),a=e.items.map(r=>`
        <li class="flex justify-between py-3 border-b border-gray-100 last:border-0">
            <div>
                <p class="font-medium text-sm text-gray-800">${r.name}</p>
                <p class="text-xs text-gray-500">${r.qty} un. x R$ ${parseFloat(r.cost).toFixed(2)}</p>
            </div>
            <p class="text-sm font-bold text-gray-700">R$ ${(r.qty*r.cost).toFixed(2)}</p>
        </li>
    `).join(""),o=`
        <div class="space-y-4">
            <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <div>
                    <p class="text-xs text-gray-500 uppercase font-bold">Fornecedor</p>
                    <p class="font-bold text-gray-900 text-lg">${e.supplierName}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs text-gray-500 uppercase font-bold">Data</p>
                    <p class="font-medium text-gray-800">${t.split(" ")[0]}</p>
                </div>
            </div>
            
            <div class="border rounded-lg p-0 overflow-hidden">
                <div class="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <h4 class="text-xs font-bold text-gray-500 uppercase">Itens Comprados</h4>
                </div>
                <ul class="max-h-60 overflow-y-auto px-4">${a}</ul>
            </div>

            <div class="flex justify-between items-center pt-2 px-2">
                <p class="text-base text-gray-600 font-medium">Total Pago:</p>
                <p class="text-2xl font-bold text-green-600">R$ ${parseFloat(e.totalAmount).toFixed(2)}</p>
            </div>
            
            <div class="flex justify-end pt-4">
                 <button type="button" class="modal-close w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 active:scale-95 transition-transform">FECHAR</button>
            </div>
        </div>
    `;N({title:"Detalhes da Compra",contentHTML:o,maxWidth:"max-w-md"}),setTimeout(()=>{document.querySelector("#genericModal .modal-close").addEventListener("click",()=>{Tt("genericModal")})},50)}function sa(){const e=document.querySelectorAll(".product-row");let t=0;e.forEach(o=>{if(o.offsetParent===null)return;const r=o.querySelector(".row-select"),s=o.querySelector(".qty-input"),n=o.querySelector(".row-subtotal"),i=parseFloat(o.dataset.cost||0),d=parseInt(s.value||0);if(r.checked){const l=i*d;t+=l,n&&(n.textContent=`R$ ${l.toFixed(2)}`),o.classList.remove("opacity-50","bg-gray-50")}else o.classList.add("opacity-50","bg-gray-50")});const a=document.getElementById("total-purchase-cost");a&&(a.textContent=`R$ ${t.toFixed(2).replace(".",",")}`)}async function Tn(e,t=!1){if(!window.jspdf){alert("Erro: Biblioteca PDF não carregada.");return}const{jsPDF:a}=window.jspdf,o=new a,r=new Date().toLocaleDateString("pt-BR"),s=t?[100,116,139]:[22,163,74];o.setFontSize(22),o.setTextColor(...s),o.setFont("helvetica","bold");const n=t?"SOLICITAÇÃO DE COTAÇÃO":"PEDIDO DE COMPRA";o.text(n,14,20),o.setDrawColor(...s),o.setLineWidth(.5),o.line(14,25,196,25),o.setFontSize(10),o.setTextColor(0),o.setFont("helvetica","bold"),o.text("DE:",14,35),o.setFont("helvetica","normal"),o.text(p.establishmentName||"Nossa Empresa",14,40),o.text(`Data: ${r}`,14,45),o.setFont("helvetica","bold"),o.text("PARA:",110,35),o.setFont("helvetica","normal"),o.text(e.info.name||"Fornecedor",110,40),e.info.email&&o.text(`Email: ${e.info.email}`,110,45),e.info.phone&&o.text(`Tel: ${e.info.phone}`,110,50),o.setFontSize(10),o.setFont("helvetica","italic");const i=t?"Por favor, enviem os vossos melhores preços e condições para os itens listados abaixo.":"Confirmação de pedido de compra conforme os itens e quantidades abaixo.";o.text(i,14,65);const d=t?["Produto","Quantidade Solicitada"]:["Produto","Qtd.","V. Unitário","V. Total"],l=e.items.map(b=>t?[b.name,b.qty.toString()]:[b.name,b.qty.toString(),`R$ ${b.cost.toFixed(2)}`,`R$ ${(b.qty*b.cost).toFixed(2)}`]);o.autoTable({startY:75,head:[d],body:l,theme:"striped",headStyles:{fillColor:s,textColor:[255,255,255],fontStyle:"bold",halign:"left"},styles:{fontSize:10,cellPadding:3,valign:"middle"},columnStyles:t?{}:{1:{halign:"center"},2:{halign:"right"},3:{halign:"right",fontStyle:"bold"}},foot:t?null:[["","","TOTAL DO PEDIDO:",{content:`R$ ${l.reduce((b,f)=>b+parseFloat(f[3].replace("R$ ","")),0).toFixed(2)}`,styles:{halign:"right",fontStyle:"bold",fillColor:[240,240,240],textColor:[0,0,0]}}]]});const c=o.internal.getNumberOfPages();for(let b=1;b<=c;b++)o.setPage(b),o.setFontSize(8),o.setTextColor(150),o.text(`Gerado por Kairos - Página ${b} de ${c}`,196,290,{align:"right"});const u=e.info.name.replace(/[^a-zA-Z0-9]/g,"_"),m=`${t?"Cotacao":"Pedido"}_${u}_${r.replace(/\//g,"-")}.pdf`;o.save(m),g("Sucesso","PDF gerado com sucesso!","success")}function Ua(e=null){const t=`
        <form id="supplierForm" class="space-y-4">
            <input type="hidden" id="supId" value="${e?.id||""}">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="col-span-1 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa *</label>
                    <input type="text" id="supName" value="${e?.name||""}" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow" placeholder="Ex: Distribuidora Beleza">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select id="supCategory" class="w-full p-3 border border-gray-300 rounded-lg outline-none bg-white">
                        <option value="Produtos" ${e?.category==="Produtos"?"selected":""}>Produtos</option>
                        <option value="Equipamentos" ${e?.category==="Equipamentos"?"selected":""}>Equipamentos</option>
                        <option value="Serviços" ${e?.category==="Serviços"?"selected":""}>Serviços</option>
                        <option value="Outros" ${e?.category==="Outros"?"selected":""}>Outros</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome Contato</label>
                    <input type="text" id="supContact" value="${e?.contactName||""}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="Ex: João Silva">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                    <input type="tel" id="supPhone" value="${e?.phone||""}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="(00) 00000-0000">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="supEmail" value="${e?.email||""}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="contato@empresa.com">
                </div>

                <div class="col-span-1 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">CNPJ / CPF</label>
                    <input type="text" id="supTaxId" value="${e?.taxId||""}" class="w-full p-3 border border-gray-300 rounded-lg outline-none">
                </div>
            </div>

            <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" class="modal-close w-full md:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors">Cancelar</button>
                <button type="submit" class="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold shadow-md hover:bg-indigo-700 transition-colors">
                    ${e?"Atualizar Dados":"Salvar Fornecedor"}
                </button>
            </div>
        </form>
    `;N({title:e?"Editar Fornecedor":"Novo Fornecedor",contentHTML:t,maxWidth:"max-w-lg"}),setTimeout(()=>{document.getElementById("supplierForm").addEventListener("submit",En),document.querySelector("#genericModal .modal-close").addEventListener("click",()=>Tt("genericModal"))},50)}function Dn(){ue.innerHTML=`
        <section class="p-4 sm:p-6 pb-24">
            <div class="bg-white rounded-lg shadow-md min-h-[500px]">
                <div class="border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6">
                    <nav class="flex space-x-6 overflow-x-auto w-full sm:w-auto no-scrollbar" aria-label="Tabs">
                        <button id="tab-btn-list" class="tab-btn whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600 transition-colors">Fornecedores</button>
                        <button id="tab-btn-purchases" class="tab-btn whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors">Compras</button>
                        <button id="tab-btn-history" class="tab-btn whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors">Histórico</button>
                    </nav>
                    <button id="btn-new-supplier" class="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm flex items-center justify-center gap-2 my-2 sm:my-3 shadow-sm transition-transform active:scale-95 font-bold">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> 
                        <span>Novo Fornecedor</span>
                    </button>
                </div>
                <div class="p-4 sm:p-6">
                    <div id="tab-content-list" class="block">
                        <div class="mb-4 relative">
                            <input type="text" id="supplierSearchInput" placeholder="Buscar..." class="border border-gray-300 rounded-lg p-3 pl-10 text-sm w-full focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow">
                            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <div id="suppliersList"></div>
                    </div>
                    <div id="tab-content-purchases" class="hidden">
                        <div id="purchasesContainer"></div>
                    </div>
                    <div id="tab-content-history" class="hidden">
                        <div id="historyContainer"></div>
                    </div>
                </div>
            </div>
        </section>
    `,le&&(ue.removeEventListener("click",le),ue.removeEventListener("input",le),ue.removeEventListener("change",le)),le=e=>{if(e.target.closest("#tab-btn-list")&&it("list"),e.target.closest("#tab-btn-purchases")&&it("purchases"),e.target.closest("#tab-btn-history")&&it("history"),e.target.id==="toggle-quote-mode"&&(P.isQuoteMode=e.target.checked,He()),e.target.id==="supplierSearchInput"&&Ft(),e.target.closest("#btn-new-supplier")&&Ua(),e.target.closest(".supplier-item-mobile")){const a=e.target.closest(".supplier-item-mobile"),o=JSON.parse(a.dataset.supplier);Cn(o)}const t=e.target.closest("button[data-action]");if(t){const a=t.dataset.action;a==="delete"&&Sn(t.dataset.id),a==="edit"&&Ua(JSON.parse(t.dataset.supplier))}if((e.target.classList.contains("qty-input")||e.target.classList.contains("row-select"))&&sa(),e.target.id==="check-all-rows"){const a=e.target.checked;document.querySelectorAll(".row-select").forEach(o=>o.checked=a),sa()}if(e.target.closest("#btn-go-to-orders")){const a=document.querySelectorAll(".product-row"),o={};let r=!1;if(a.forEach(s=>{if(s.offsetParent===null||!s.querySelector(".row-select").checked)return;r=!0;let i="Produto";const d=s.querySelector("td:nth-child(2)"),l=s.querySelector(".font-bold");d?i=d.innerText:l&&(i=l.innerText);const c=parseInt(s.querySelector(".qty-input").value),u=parseFloat(s.dataset.cost),b=s.querySelector(".supplier-select").value;if(b){if(!o[b]){const f=P.allSuppliers.find(v=>v.id===b);o[b]={info:f,items:[]}}o[b].items.push({name:i,qty:c,cost:u})}}),!r){g("Atenção","Selecione pelo menos um item para gerar o pedido.","error");return}P.finalOrders=o,P.step=2,He()}if(e.target.closest("#btn-back-step1")&&(P.step=1,He()),e.target.closest(".btn-send-order")){const a=e.target.closest(".btn-send-order"),o=JSON.parse(decodeURIComponent(a.dataset.supplierInfo)),r=JSON.parse(decodeURIComponent(a.dataset.orderItems)),s=parseFloat(a.dataset.total),n=P.isQuoteMode;if(o.phone){const i=o.phone.replace(/\D/g,"");let d="";n?(d=`Olá *${o.name}*, tudo bem?

Gostaria de solicitar uma *cotação* para os seguintes itens:

`,r.forEach(c=>{d+=`- ${c.qty}x ${c.name}
`}),d+=`
Aguardo o retorno. Obrigado!`):(d=`Olá *${o.name}*, gostaria de realizar o seguinte *pedido*:

`,d+=`*ITENS:*
`,r.forEach(c=>{d+=`- ${c.qty}x ${c.name}
`}),d+=`
Aguardo confirmação.`);const l=`https://wa.me/${i}?text=${encodeURIComponent(d)}`;window.open(l,"_blank"),g("Aberto","WhatsApp aberto.","success")}else if(o.email){const i=n?`Solicitação de Cotação - ${p.establishmentName||"Empresa"}`:`Pedido de Compra - ${p.establishmentName||"Empresa"}`;let d=`Olá ${o.name},

`;n?d+=`Gostaria de solicitar uma cotação para os itens abaixo:

`:d+=`Gostaria de realizar o seguinte pedido:

`,r.forEach(c=>{d+=`- ${c.qty}x ${c.name}
`}),n||(d+=`
Valor Total Estimado: R$ ${s.toFixed(2)}`),d+=`

Aguardo retorno.`;const l=`mailto:${o.email}?subject=${encodeURIComponent(i)}&body=${encodeURIComponent(d)}`;window.location.href=l}else g("Erro","Fornecedor sem telefone ou email cadastrado.","error")}if(e.target.closest(".btn-register-order")){const a=e.target.closest(".btn-register-order"),o=JSON.parse(decodeURIComponent(a.dataset.order));o.establishmentId=p.establishmentId,un(o).then(()=>{g("Sucesso","Compra registrada no histórico!","success"),a.disabled=!0,a.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Registrado',a.classList.replace("bg-blue-600","bg-green-600"),a.classList.replace("hover:bg-blue-700","hover:bg-green-700")}).catch(r=>{g("Erro","Falha ao registrar compra: "+r.message,"error")})}if(e.target.closest(".btn-print-order")){const o=e.target.closest(".supplier-order-card").dataset.supplierId,r=P.finalOrders[o];r?Tn(r,P.isQuoteMode):g("Erro","Dados do pedido não encontrados.","error")}if(e.target.closest(".btn-view-purchase")){const a=e.target.closest(".btn-view-purchase"),o=JSON.parse(a.dataset.purchase);Bn(o)}},ue.addEventListener("click",le),ue.addEventListener("input",le),ue.addEventListener("change",le),it("list")}function it(e){ht=e,["list","purchases","history"].forEach(a=>{const o=document.getElementById(`tab-btn-${a}`),r=document.getElementById(`tab-content-${a}`);a===e?(o.classList.add("border-indigo-500","text-indigo-600"),o.classList.remove("border-transparent","text-gray-500"),r.classList.remove("hidden")):(o.classList.remove("border-indigo-500","text-indigo-600"),o.classList.add("border-transparent","text-gray-500"),r.classList.add("hidden"))});const t=document.getElementById("btn-new-supplier");t&&(e==="list"?t.classList.remove("hidden"):t.classList.add("hidden")),kn()}const Ot=document.getElementById("content"),Ja={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let oe=new Set,lt=null,ke=null;function Mn(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function Pn(e){return e.length===0?'<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>':e.map(t=>{const a=t.status==="inactive",o=t.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,r=JSON.stringify(t).replace(/'/g,"&apos;");return`
            <div class="professional-card bg-white rounded-lg shadow-md flex items-center gap-4 p-3 cursor-pointer transition-transform transform hover:shadow-lg hover:bg-gray-50
                        sm:flex-col sm:items-stretch sm:p-0 sm:gap-0 ${a?"opacity-50 bg-gray-100":""}" 
                 data-action="open-professional-modal" data-professional='${r}'>
                
                <img src="${o}" alt="Foto de ${t.name}" class="w-16 h-16 rounded-full object-cover flex-shrink-0
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
            </div>`}).join("")}function zt(){const e=document.getElementById("genericModal");e.style.display="none",ke&&e.removeEventListener("click",ke)}async function An(e){const t=document.getElementById("genericModal"),a=e.id?e:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},o=p.services||await De(p.establishmentId),r=p.professionals||await _(p.establishmentId),s=`
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
        </div>`;t.innerHTML=s,t.style.display="flex",qn(a,o),Fn(a),Rn(a,r),Hn(a)}function qn(e,t){const a=document.getElementById("professionalForm"),o=e.dob?e.dob.split("/"):["",""],r=Array.from({length:12},(m,b)=>{const f=b+1,v=f==o[1]?"selected":"",y=new Date(0,b).toLocaleString("pt-BR",{month:"long"});return`<option value="${f}" ${v}>${y.charAt(0).toUpperCase()+y.slice(1)}</option>`}).join(""),s=e.status||"active";a.innerHTML=`
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
                    <div class="form-group"><label for="profDobDay">Aniversário (Dia)</label><input type="number" id="profDobDay" value="${o[0]}" min="1" max="31" class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profDobMonth">Aniversário (Mês)</label><select id="profDobMonth" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Selecione...</option>${r}</select></div>
                    <div class="form-group"><label for="profOrderOnAgenda">Ordem na agenda</label><input type="number" id="profOrderOnAgenda" value="${e.orderOnAgenda||"1"}" min="1" class="mt-1 w-full p-2 border rounded-md"></div>
                </div>
                 <div class="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div class="form-group"><label for="profCommission">Recebe comissão?</label><select id="profCommission" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="sim" ${e.receivesCommission?"selected":""}>Sim</option><option value="nao" ${e.receivesCommission?"":"selected"}>Não</option></select></div>
                    <div class="form-group"><label for="profShowOnAgenda">Mostrar na agenda</label><select id="profShowOnAgenda" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="sim" ${e.showOnAgenda!==!1?"selected":""}>Sim</option><option value="nao" ${e.showOnAgenda===!1?"selected":""}>Não</option></select></div>
                </div>
            </div>
        </div>

        <div><label class="block text-sm font-medium text-gray-700">Serviços Realizados</label><div id="profServicesContainer" class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-md bg-white max-h-48 overflow-y-auto">${t.map(m=>`<label class="flex items-center space-x-2"><input type="checkbox" value="${m.id}" class="rounded" ${e.services?.includes(m.id)?"checked":""}><span>${m.name}</span></label>`).join("")}</div></div>
        <div class="form-group"><label for="profNotes">Observações</label><textarea id="profNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${e.notes||""}</textarea></div>`;const n=document.getElementById("profPhotoInput"),i=document.getElementById("profPhotoButton"),d=document.getElementById("profPhotoPreview"),l=document.getElementById("profPhotoBase64"),c=e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,u=e.photo||"";i&&i.addEventListener("click",()=>n.click()),n&&(n.onchange=async()=>{const m=n.files[0];if(m){d.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const b=await Nn(m,800,800,"image/jpeg",.8);d.src=b,l.value=b}catch(b){g("Erro de Imagem",b.message||"Não foi possível processar a imagem.","error"),d.src=c,l.value=u,n.value=""}}})}function Nn(e,t=800,a=800,o="image/jpeg",r=.8){return new Promise((s,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=d=>{const l=new Image;l.onload=()=>{let c=l.width,u=l.height;c>u?c>t&&(u*=t/c,c=t):u>a&&(c*=a/u,u=a);const m=document.createElement("canvas");m.width=c,m.height=u,m.getContext("2d").drawImage(l,0,0,c,u);const f=m.toDataURL(o,r);s(f)},l.onerror=c=>n(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},i.onerror=d=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function Fn(e){const t=document.getElementById("jornada");t.innerHTML='<div><h3 class="text-xl font-semibold mb-4">Jornada de Trabalho Semanal</h3><p class="text-sm text-gray-600 mb-4">Defina os horários de trabalho padrão para este profissional.</p><div id="profScheduleContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div></div>',jn(t.querySelector("#profScheduleContainer"),e.workingHours||{})}async function Rn(e,t){const a=document.getElementById("bloqueios");a.innerHTML=`
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
        </div>`;const o=document.getElementById("batchBlockageForm");o&&o.addEventListener("submit",async s=>{s.preventDefault();const n=Array.from(s.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(b=>b.value);if(n.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const i=s.target.batchBlockageStartDate.value,d=s.target.batchBlockageEndDate.value||i,l=s.target.batchBlockageStartTime.value,c=s.target.batchBlockageEndTime.value,u=s.target.batchBlockageReason.value;if(!i||!l||!c)return g("Atenção","Preencha Data de Início, Início e Fim.","error");const m=n.map(b=>{const f={professionalId:b,establishmentId:p.establishmentId,startTime:new Date(`${i}T${l}`).toISOString(),endTime:new Date(`${d}T${c}`).toISOString(),reason:u};return Mt(f)});try{await Promise.all(m),g("Sucesso!",`${n.length} bloqueios foram criados.`);const b=document.getElementById("prof-blockages-filter").value;Oe(e.id,b)}catch(b){g("Erro",b.message,"error")}}),document.getElementById("prof-blockages-filter").addEventListener("change",s=>Oe(e.id,s.target.value)),await Oe(e.id,"future")}function jn(e,t){e.innerHTML=Object.keys(Ja).map(a=>{const o=t[a]||{},r=o.active!==!1;return`
            <div class="day-schedule-card p-3 rounded-lg ${r?"bg-white":"bg-gray-100 disabled"} border">
                 <div class="flex justify-between items-center"><span class="font-semibold text-gray-800">${Ja[a]}</span><label class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" data-day="${a}" data-field="active" class="sr-only" ${r?"checked":""}><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div></label></div>
                <div class="time-inputs grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><label>Início:</label><input type="time" data-day="${a}" data-field="start" value="${o.start||"09:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Fim:</label><input type="time" data-day="${a}" data-field="end" value="${o.end||"18:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Intervalo:</label><input type="time" data-day="${a}" data-field="breakStart" value="${o.breakStart||"12:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Fim Int.:</label><input type="time" data-day="${a}" data-field="breakEnd" value="${o.breakEnd||"13:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                </div>
            </div>`}).join(""),e.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",o=>{const r=o.target.closest(".day-schedule-card"),s=!o.target.checked;r.classList.toggle("bg-white",!s),r.classList.toggle("bg-gray-100",s),r.classList.toggle("disabled",s),r.querySelectorAll(".time-inputs input").forEach(n=>n.disabled=s)})})}async function Oe(e,t="future"){const a=document.getElementById("blockagesList");if(a){a.innerHTML='<div class="loader mx-auto"></div>';try{const o=new Date;let r,s;t==="history"?(s=new Date,r=new Date,r.setFullYear(r.getFullYear()-2)):(r=new Date,s=new Date,s.setFullYear(s.getFullYear()+2));let i=(await Dt(p.establishmentId,r.toISOString(),s.toISOString(),e)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));t==="history"?i=i.filter(l=>l.endTime<o).sort((l,c)=>c.startTime-l.startTime):i=i.filter(l=>l.endTime>=o).sort((l,c)=>l.startTime-c.startTime);const d=i.reduce((l,c)=>{const u=c.reason||"Sem motivo";return l[u]||(l[u]=[]),l[u].push(c),l},{});if(Object.keys(d).length===0){a.innerHTML=`<p class="text-center text-gray-500 text-sm py-4">Nenhum bloqueio ${t==="history"?"no histórico":"futuro"}.</p>`;return}a.innerHTML=Object.entries(d).map(([l,c])=>`
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
        `).join("")}catch(o){a.innerHTML=`<p class="text-red-500">${o.message}</p>`}}}function Hn(e){const t=document.getElementById("genericModal");ke&&t.removeEventListener("click",ke),ke=async a=>{const o=a.target.closest("button[data-action]");if(!o){const s=a.target.closest(".tab-link");s&&(t.querySelectorAll(".tab-link").forEach(n=>n.classList.remove("active")),s.classList.add("active"),t.querySelectorAll(".tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(s.dataset.tab).classList.remove("hidden"));return}const r=o.dataset.action;switch(a.stopPropagation(),r){case"close-modal":zt();break;case"delete-professional":const s=o.dataset.id;if(await A("Excluir Profissional",`Tem certeza que deseja excluir ${e.name}? Esta ação não pode ser desfeita.`))try{await ks(s),g("Sucesso!","Profissional excluído.","success"),zt(),$t()}catch(v){g("Erro",`Não foi possível excluir: ${v.message}`,"error")}break;case"save-professional":const i=document.getElementById("professionalForm"),d=o,l=document.getElementById("profScheduleContainer"),c=Array.from(i.querySelectorAll("#profServicesContainer input:checked")).map(v=>v.value),u={};l&&l.querySelectorAll(".day-schedule-card").forEach(v=>{const y=v.querySelector('[data-field="active"]').dataset.day;u[y]={active:v.querySelector('[data-field="active"]').checked,start:v.querySelector('[data-field="start"]').value,end:v.querySelector('[data-field="end"]').value,breakStart:v.querySelector('[data-field="breakStart"]').value,breakEnd:v.querySelector('[data-field="breakEnd"]').value}});const m={...e,id:i.querySelector("#professionalId").value||void 0,name:i.querySelector("#profName").value,specialty:i.querySelector("#profSpecialty").value,photo:i.querySelector("#profPhotoBase64").value,services:c,workingHours:u,phone:i.querySelector("#profPhone").value,dob:`${i.querySelector("#profDobDay").value}/${i.querySelector("#profDobMonth").value}`,receivesCommission:i.querySelector("#profCommission").value==="sim",showOnAgenda:i.querySelector("#profShowOnAgenda").value==="sim",orderOnAgenda:parseInt(i.querySelector("#profOrderOnAgenda").value)||1,notes:i.querySelector("#profNotes").value,status:i.querySelector("#profStatus").value};d.disabled=!0,d.textContent="A salvar...";try{m.id?(await ws(m.id,m),g("Sucesso!","Profissional atualizado.","success")):(delete m.id,await ys(m),g("Sucesso!","Profissional criado.","success")),zt(),$t()}catch(v){g("Erro",v.message,"error"),d.disabled=!1,d.textContent="Salvar"}break;case"delete-blockage":const b=o.dataset.id;if(await A("Apagar Bloqueio","Tem certeza?"))try{await fa(b),g("Bloqueio removido.","success");const v=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";Oe(e.id,v)}catch(v){g("Erro",v.message,"error")}break;case"batch-delete-blockage":const f=JSON.parse(o.dataset.ids);if(await A("Apagar em Lote",`Tem certeza que deseja apagar ${f.length} bloqueios com este motivo?`))try{await vo(f),g("Bloqueios removidos.","success");const v=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";Oe(e.id,v)}catch(v){g("Erro",v.message,"error")}break}},t.addEventListener("click",ke)}function ra(){const e=document.getElementById("batch-actions-container"),t=document.getElementById("selected-count");!e||!t||(oe.size>0?(t.textContent=`${oe.size} selecionado(s)`,e.classList.remove("hidden")):e.classList.add("hidden"))}function On(){A("Excluir em Lote",`Tem certeza que deseja excluir ${oe.size} profissionais? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{await(void 0)(Array.from(oe)),g("Sucesso!",`${oe.size} profissionais foram excluídos.`,"success"),oe.clear(),ra(),$t()}catch(t){g("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}function Pe(){const e=document.getElementById("professionalsList");if(!e)return;if(!p.professionals){e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Mn();return}const t=document.getElementById("showInactiveProfToggle").checked,a=document.getElementById("profSearchInput").value.toLowerCase(),o=p.professionals.filter(r=>{const s=r.name.toLowerCase().includes(a),n=t||r.status!=="inactive";return s&&n});e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Pn(o)}async function $t(){oe.clear(),Ot.innerHTML=`
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
        </section>`,lt&&Ot.removeEventListener("click",lt),lt=t=>{const a=t.target.closest('[data-action="open-professional-modal"]'),o=t.target.closest('[data-action="batch-delete"]');if(a){t.preventDefault();let s={};if(a.dataset.professional)try{s=JSON.parse(a.dataset.professional)}catch(n){console.error("Erro ao fazer parse do professional data:",n);return}An(s);return}if(o){On();return}const r=t.target.closest(".professional-checkbox");if(r){const s=r.dataset.id;r.checked?oe.add(s):oe.delete(s),Pe(),ra();return}},Ot.addEventListener("click",lt),document.getElementById("profSearchInput").addEventListener("input",Pe),document.getElementById("showInactiveProfToggle").addEventListener("change",Pe);const e=document.getElementById("professionalsList");p.professionals=null,p.services=null,Pe();try{const[t,a]=await Promise.all([_(p.establishmentId),De(p.establishmentId)]);p.professionals=t,p.services=a,Pe(),ra()}catch{e.innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar dados da página.</p>'}}const Vt=document.getElementById("content");let te=[],ze={},j=null,na="list",U="all",ia="O Estabelecimento";const zn=(e,t)=>`Olá, ${e}! Nós da ${t} desejamos a você um Feliz Aniversário! Esperamos que seu dia seja maravilhoso. Venha comemorar conosco! 🎉🎂`,Vn=(e,t)=>`Oi, ${e}! Faz um tempo que não te vemos aqui no(a) ${t}. Sentimos sua falta! Temos novidades/ofertas especiais para você. Que tal agendar seu horário?`,Un=[{value:30,label:"30 dias"},{value:60,label:"60 dias"},{value:90,label:"90 dias"},{value:120,label:"120 dias"}];function Jn(){return Math.floor(Math.random()*140)+10}function _n(e){if(!e.dob)return!1;const t=e.dob.split("/");if(t.length!==2)return!1;const a=new Date,o=a.getDate(),r=a.getMonth()+1,s=parseInt(t[0],10),n=parseInt(t[1],10);return s===o&&n===r}const Wn=[{value:99,label:"Aniversariantes de Hoje"},{value:0,label:"Todos os meses (com DOB)"},{value:1,label:"Janeiro"},{value:2,label:"Fevereiro"},{value:3,label:"Março"},{value:4,label:"Abril"},{value:5,label:"Maio"},{value:6,label:"Junho"},{value:7,label:"Julho"},{value:8,label:"Agosto"},{value:9,label:"Setembro"},{value:10,label:"Outubro"},{value:11,label:"Novembro"},{value:12,label:"Dezembro"}];function _a(){return Wn.map(e=>{let t="";return e.value===99&&(t="selected"),`<option value="${e.value}" ${t}>${e.label}</option>`}).join("")}function Wa(){return Un.map(e=>{const t=e.value===90?"selected":"";return`<option value="${e.value}" ${t}>${e.label}</option>`}).join("")}function Gn(e,t){const a=`w-5 h-5 ${t} mr-2`;switch(e){case"cadastro":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`;case"agendamentos":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`;case"historico":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2h-2.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-1.414 0l-1.414-1.414A1 1 0 009.586 17H7a2 2 0 01-2-2v-2a2 2 0 012-2h12z" /></svg>`;case"fidelidade":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.5a9.5 9.5 0 1019 0 9.5 9.5 0 00-19 0z" /></svg>`;default:return""}}function Yn(e="cadastro"){const t=[{id:"cadastro",label:"Cadastro"},{id:"agendamentos",label:"Próximos Agend."},{id:"historico",label:"Histórico"},{id:"fidelidade",label:"Fidelidade"}],a=document.getElementById("client-detail-tabs");a&&(a.innerHTML=t.map(o=>{const r=e===o.id,s=r?"text-indigo-600":"text-gray-500";return`
            <button data-tab="${o.id}" class="tab-btn whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors flex items-center ${r?"border-indigo-500 text-indigo-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}">
                ${Gn(o.id,s)}
                ${o.label}
            </button>
        `}).join(""),a.querySelectorAll(".tab-btn").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),la(o.dataset.tab)})}))}async function la(e){Yn(e);const t=document.getElementById("client-detail-content");if(t)switch(t.innerHTML='<form id="client-form" class="p-6 space-y-4"><div class="loader mx-auto my-8"></div></form>',e){case"cadastro":t.innerHTML=Xn(j);break;case"agendamentos":case"historico":try{const o=await Us(p.establishmentId,j.name,j.phone);t.innerHTML=Qn(o,e)}catch(o){console.error("Erro ao carregar histórico do cliente:",o),t.innerHTML=`<form id="client-form" class="p-6 space-y-4"><p class="text-center text-red-500">Erro ao carregar o histórico: ${o.message}</p></form>`}break;case"fidelidade":const a=await Js(p.establishmentId,j.name,j.phone);t.innerHTML=Zn(j,a);break;default:t.innerHTML='<form id="client-form" class="p-6 space-y-4"><p class="p-4 text-center text-gray-500">Secção não implementada.</p></form>'}}function Xn(e){const t=e?.dob?e.dob.split("/"):["",""];return`
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
    `}function Qn(e,t){const a=t==="agendamentos"?"Próximos Agendamentos":"Histórico de Visitas",o=t==="agendamentos"?"Nenhum agendamento futuro.":"Nenhum histórico de visitas.",r=new Date;r.setHours(0,0,0,0);const s=t==="agendamentos",n=(e||[]).filter(i=>{const d=new Date(i.date);return s?d>=r:d<r});return n.sort((i,d)=>s?new Date(i.date).getTime()-new Date(d.date).getTime():new Date(d.date).getTime()-new Date(i.date).getTime()),n.length===0?`<form id="client-form" class="p-6 space-y-4"><p class="p-4 text-center text-gray-500">${o}</p></form>`:`
        <form id="client-form" class="p-6 space-y-4">
            <div class="space-y-3 max-h-96 overflow-y-auto">
                <h4 class="font-semibold text-lg mb-2">${a}</h4>
                ${n.map(i=>{const d=new Date(i.date)<r;return`
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
    `}function Zn(e,t){const a=e.loyaltyPoints||0;let o='<p class="text-sm text-gray-500">O programa de fidelidade não está ativo.</p>';ze.enabled&&ze.tiers&&(o=ze.tiers.map(s=>{const n=a>=s.points;return`
                <div class="flex justify-between items-center p-3 rounded-lg ${n?"bg-green-50":"bg-gray-100"}">
                    <div>
                        <p class="font-semibold ${n?"text-green-800":"text-gray-800"}">${s.reward}</p>
                        <p class="text-sm ${n?"text-green-600":"text-gray-500"}">${s.points} Pontos</p>
                    </div>
                    <button data-action="redeem-reward" data-points="${s.points}" data-reward="${s.reward}" ${n?"":"disabled"}
                        class="py-1 px-3 text-sm font-semibold rounded-lg ${n?"bg-green-600 text-white hover:bg-green-700":"bg-gray-300 text-gray-500 cursor-not-allowed"}">
                        Resgatar
                    </button>
                </div>`}).join(""));const r=t.length>0?t.map(s=>`
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
                    <div class="space-y-2 max-h-64 overflow-y-auto">${o}</div>
                </div>
                <div>
                    <h4 class="font-semibold text-lg mb-2">Histórico de Pontos</h4>
                    <div class="space-y-2 max-h-80 overflow-y-auto">${r}</div>
                </div>
            </div>
        </form>
    `}function da(e){j=e,na="detail";const t=e!==null,a=t?"Editar Cliente":"Adicionar Cliente",o=`
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
    `,r=window.innerWidth<768,s=r?"max-w-full":"max-w-3xl";if(N({title:a,contentHTML:o,maxWidth:s}),r){const c=document.getElementById("genericModal");if(c){const u=c.querySelector(`.${s.replace(":","\\:")}`);u&&(u.style.height="auto",u.style.maxHeight="85vh",u.style.borderRadius="1rem")}}const n=document.getElementById("genericModal");n&&n.addEventListener("click",async c=>{const u=c.target.closest("[data-action]");if(!u)return;switch(u.dataset.action){case"redeem-reward":{const b=parseInt(u.dataset.points,10),f=u.dataset.reward;if(await A("Confirmar Resgate",`Deseja resgatar "${f}" por ${b} pontos?`))try{await _s(p.establishmentId,j.name,j.phone,{points:b,reward:f}),g("Prémio resgatado com sucesso!","success"),te=await Ze(p.establishmentId);const h=te.find(x=>x.id===j.id);h&&(j=h),la("fidelidade")}catch(y){g(`Erro ao resgatar: ${y.message}`,"error")}break}case"open-comanda-from-history":{const b=u.dataset.appointmentId;b&&(document.getElementById("genericModal").style.display="none",Y("comandas-section",{selectedAppointmentId:b,initialFilter:"finalizada"}));break}case"view-appointment":{const b=u.dataset.appointmentId,f=u.dataset.appointmentDate;b&&f&&(document.getElementById("genericModal").style.display="none",Y("agenda-section",{targetDate:f,scrollToAppointmentId:b}));break}}}),la("cadastro");const i=document.getElementById("client-form");i&&i.addEventListener("submit",c=>{c.preventDefault(),Kn()});const d=document.getElementById("cancelDetailViewBtn");d&&d.addEventListener("click",c=>{c.preventDefault(),document.getElementById("genericModal").style.display="none",Rt()});const l=document.getElementById("deleteClientBtn");l&&l.addEventListener("click",async()=>{await ei()})}async function Kn(){const e=document.getElementById("client-form");if(!e)return;const t=e.querySelector("#clientId").value,a={name:e.querySelector("#clientName").value,email:e.querySelector("#clientEmail").value,phone:e.querySelector("#clientPhone").value,dob:`${e.querySelector("#clientDobDay").value}/${e.querySelector("#clientDobMonth").value}`,notes:e.querySelector("#clientNotes").value,establishmentId:p.establishmentId};if(!a.name||!a.phone){g("Erro","Nome e Telefone são obrigatórios.","error");return}try{t?(await zs(t,a),g("Sucesso","Cliente atualizado com sucesso!","success")):(await va(a),g("Sucesso","Cliente cadastrado com sucesso!","success")),document.getElementById("genericModal").style.display="none",await Rt()}catch(o){g("Erro",`Não foi possível salvar: ${o.message}`,"error")}}async function ei(){if(!j||!j.id)return;if(await A("Excluir Cliente",`Tem certeza que deseja excluir ${j.name}? Esta ação é irreversível.`))try{await Vs(j.id),g("Sucesso","Cliente excluído.","success"),document.getElementById("genericModal").style.display="none",await Rt()}catch(t){g("Erro",`Não foi possível excluir: ${t.message}`,"error")}}function xt(e,t){const a=document.getElementById("clientsList");if(a)if(a.innerHTML="",document.getElementById("client-count").textContent=`${e.length} cliente${e.length!==1?"s":""} | Total: ${t}`,e.length>0){const o=U==="inactive",r=U==="birthdays";e.forEach(s=>{const n=document.createElement("div");n.className="client-card bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer",n.dataset.clientId=s.id;const i=s.loyaltyPoints||0,d=ze.enabled?`${i} pts`:`R$ ${i.toFixed(2)}`;let l="";const u=`https://wa.me/55${s.phone?s.phone.replace(/\D/g,""):""}?text=`;if(o){const m=encodeURIComponent(Vn(s.name,ia));l=`
                    <a href="${u+m}" target="_blank" title="Enviar Mensagem de Recuperação (WhatsApp)" class="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full flex-shrink-0 ml-2 shadow-md">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                    </a>`}else if(r&&_n(s)){const b=encodeURIComponent(zn(s.name,ia));l=`
                        <a href="${u+b}" target="_blank" title="Enviar Parabéns por WhatsApp" class="text-white bg-green-500 hover:bg-green-600 p-2 rounded-full flex-shrink-0 ml-2 shadow-md">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.333 0 2-1 2-2s-.667-2-2-2-2 1-2 2 .667 2 2 2zM2 15h20M7 15l2 6h6l2-6M7 15a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2"/></svg>
                        </a>`}n.innerHTML=`
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
            `,n.addEventListener("click",()=>da(s)),a.appendChild(n)})}else a.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum cliente encontrado com os filtros aplicados.</p>'}function yt(e="",t="all"){const a=e.toLowerCase(),o=a.length>0;let r=0,s=90;const n=window.innerWidth<768;if(t==="birthdays"){const d=n?"mobileBirthMonthFilter":"birthMonthFilter",l=document.getElementById(d);l&&(r=parseInt(l.value,10))}else if(t==="inactive"){const d=n?"mobileInactiveDaysFilter":"inactiveDaysFilter",l=document.getElementById(d);l&&(s=parseInt(l.value,10))}let i=te.filter(d=>!o||d.name.toLowerCase().includes(a)||(d.phone||"").includes(a));switch(t){case"birthdays":const d=new Date,l=d.getDate(),c=d.getMonth()+1;return i.filter(u=>{if(!u.dob)return!1;const m=u.dob.split("/");if(m.length!==2)return!1;const b=parseInt(m[0],10),f=parseInt(m[1],10);return r===99?b===l&&f===c:r===0?f>=1&&f<=12:f===r});case"inactive":return i.filter(u=>(u.lastAppointmentDaysAgo||Jn())>s);case"scheduled":return i.filter(u=>u.loyaltyPoints>50);case"credit":return i.filter(u=>(u.loyaltyPoints||0)>0);case"debit":return i.filter(u=>!1);case"package":return i.filter(u=>!1);case"all":default:return i}}async function ti(e){const t=document.getElementById("birthMonthFilterContainer"),a=document.getElementById("mobileBirthMonthFilterContainer"),o=document.getElementById("inactiveDaysFilterContainer"),r=document.getElementById("mobileInactiveDaysFilterContainer");if(e==="birthdays"){if(t?.classList.remove("hidden"),a?.classList.remove("hidden"),o?.classList.add("hidden"),r?.classList.add("hidden"),U!=="birthdays"){const d=document.getElementById("birthMonthFilter");d&&(d.value=99);const l=document.getElementById("mobileBirthMonthFilter");l&&(l.value=99)}}else if(e==="inactive"){if(o?.classList.remove("hidden"),r?.classList.remove("hidden"),t?.classList.add("hidden"),a?.classList.add("hidden"),U!=="inactive"){const d=document.getElementById("inactiveDaysFilter");d&&(d.value=90);const l=document.getElementById("mobileInactiveDaysFilter");l&&(l.value=90)}}else t?.classList.add("hidden"),a?.classList.add("hidden"),o?.classList.add("hidden"),r?.classList.add("hidden");if(U===e&&e!=="birthdays"&&e!=="inactive")return;U=e,document.querySelectorAll(".client-filter-btn").forEach(d=>{d.classList.remove("bg-white","text-indigo-600","shadow"),d.classList.add("bg-gray-100","text-gray-600")}),document.querySelectorAll(`[data-filter-key="${e}"]`).forEach(d=>{d&&(d.classList.remove("bg-gray-100","text-gray-600"),d.classList.add("bg-white","text-indigo-600","shadow"))});const n=document.getElementById("clientSearchInput").value,i=yt(n,U);xt(i,te.length)}async function Rt(){na="list",Vt.innerHTML=`
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
                            ${_a()}
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
                            ${Wa()}
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
                            ${_a()}
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
                            ${Wa()}
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
    `;try{const[c,u]=await Promise.all([Ze(p.establishmentId),Qe(p.establishmentId)]);te=c,ze=u.loyaltyProgram||{enabled:!1},ia=u.name||"O Estabelecimento";const m=yt("",U);xt(m,te.length)}catch{document.getElementById("clientsList").innerHTML='<p class="text-red-500 col-span-full text-center">Erro ao carregar dados dos clientes.</p>'}const e=document.getElementById("filter-sheet"),t=document.getElementById("filter-overlay"),a=document.getElementById("openFilterSheetBtn"),o=document.getElementById("closeFilterSheetBtn"),r=()=>{e.classList.add("show"),t.classList.remove("hidden")},s=()=>{e.classList.remove("show"),t.classList.add("hidden")};a&&a.addEventListener("click",r),o&&o.addEventListener("click",s),t&&t.addEventListener("click",s);const n=c=>{const u=c.target.closest(".client-filter-btn");u&&(ti(u.dataset.filterKey),window.innerWidth<768&&s())},i=document.getElementById("desktop-filter-bar"),d=document.getElementById("mobile-filter-list");i&&i.addEventListener("click",n),d&&d.addEventListener("click",n);const l=c=>{const u=document.getElementById(c);u&&u.addEventListener("change",()=>{if(U==="birthdays"||U==="inactive"){const m=document.getElementById("clientSearchInput").value,b=yt(m,U);xt(b,te.length)}})};l("birthMonthFilter"),l("mobileBirthMonthFilter"),l("inactiveDaysFilter"),l("mobileInactiveDaysFilter"),Vt.addEventListener("click",async c=>{const u=c.target.closest("[data-action]"),m=c.target.closest(".client-card");if(na==="list"){if(u){const b=u.dataset.action;b==="new-client"?da(null):b==="print-list"&&window.print()}else if(m){const b=m.dataset.clientId,f=te.find(v=>v.id===b);f&&da(f)}}}),Vt.addEventListener("input",c=>{if(c.target.id==="clientSearchInput"){const u=c.target.value,m=yt(u,U);xt(m,te.length)}})}const Ye=()=>k("/api/financial/natures"),ai=e=>k("/api/financial/natures",{method:"POST",body:JSON.stringify(e)}),oi=e=>k(`/api/financial/natures/${e}`,{method:"DELETE"}),Xe=()=>k("/api/financial/cost-centers"),si=e=>k("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(e)}),ri=e=>k(`/api/financial/cost-centers/${e}`,{method:"DELETE"}),Mo=(e,t)=>k(`/api/financial/${e}`,{method:"POST",body:JSON.stringify(t)}),Po=(e,t={})=>{let a=`/api/financial/${e}`;const o=new URLSearchParams;t.startDate&&o.append("startDate",t.startDate),t.endDate&&o.append("endDate",t.endDate),t.natureId&&o.append("natureId",t.natureId),t.costCenterId&&o.append("costCenterId",t.costCenterId);const r=o.toString();return r&&(a+=`?${r}`),k(a)},Ao=(e,t,a)=>k(`/api/financial/${e}/${t}`,{method:"PUT",body:JSON.stringify(a)}),qo=(e,t)=>k(`/api/financial/${e}/${t}`,{method:"DELETE"}),No=(e,t,a)=>k(`/api/financial/${e}/${t}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),ni=e=>Mo("payables",e),ii=e=>Po("payables",e),li=(e,t)=>Ao("payables",e,t),di=e=>qo("payables",e),ci=(e,t)=>No("payables",e,t),ui=e=>Mo("receivables",e),mi=e=>Po("receivables",e),pi=(e,t)=>Ao("receivables",e,t),gi=e=>qo("receivables",e),bi=(e,t)=>No("receivables",e,t),fi=(e,t)=>k(`/api/financial/cash-flow?startDate=${e}&endDate=${t}`),vi=()=>k("/api/financial/today-summary"),be=document.getElementById("content"),Ut={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},hi={indigo:{name:"Padrão (Índigo)",main:"#4f46e5"},blue:{name:"Azul",main:"#2563eb"},sky:{name:"Céu",main:"#0284c7"},teal:{name:"Verde Água",main:"#0d9488"},emerald:{name:"Esmeralda",main:"#059669"},green:{name:"Verde",main:"#16a34a"},lime:{name:"Lima",main:"#65a30d"},amber:{name:"Âmbar",main:"#d97706"},orange:{name:"Laranja",main:"#ea580c"},red:{name:"Vermelho",main:"#dc2626"},rose:{name:"Rosa",main:"#e11d48"},pink:{name:"Pink",main:"#db2777"},fuchsia:{name:"Fúcsia",main:"#c026d3"},purple:{name:"Roxo",main:"#7c3aed"},violet:{name:"Violeta",main:"#8b5cf6"},gray:{name:"Cinza",main:"#4b5563"},black:{name:"Preto",main:"#111827"}},Fo=[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"}];let V=null;function Ga(e,t,a){return new Promise((o,r)=>{const s=new FileReader;s.readAsDataURL(e),s.onload=n=>{const i=new Image;i.src=n.target.result,i.onload=()=>{const d=document.createElement("canvas");let l=i.width,c=i.height;l>t&&(c*=t/l,l=t),d.width=l,d.height=c,d.getContext("2d").drawImage(i,0,0,l,c);const m=e.type==="image/png"&&t<500?"image/png":"image/jpeg";o(d.toDataURL(m,a))},i.onerror=d=>r(d)},s.onerror=n=>r(n)})}function dt(e,t=null){let a='<option value="">-- Selecione (Opcional) --</option>';const o=n=>{const i=new Map,d=[];return n&&(n.forEach(l=>i.set(l.id,{...l,children:[]})),i.forEach(l=>{l.parentId&&i.has(l.parentId)?i.get(l.parentId).children.push(l):d.push(l)})),d},r=(n,i="")=>{const d=n.id===t?"selected":"";a+=`<option value="${n.id}" ${d}>${i}${n.name}</option>`,n.children.forEach(l=>r(l,i+"— "))};return o(e).forEach(n=>r(n)),a}async function Me(e,t){const a=t.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const o=V||await Qe(p.establishmentId),r=[],{ownerName:s,...n}=e;if(s&&s!==p.userName){const d=J.currentUser;d&&r.push(Wo(d,{displayName:s}).then(()=>{p.userName=s}))}const i={...o,...n};if(r.push(fs(p.establishmentId,i)),await Promise.all(r),V=i,g("Sucesso","Definições salvas com sucesso! A página será recarregada para aplicar o novo tema.","success"),n.themeColor)setTimeout(()=>window.location.reload(),1500);else{const d=document.getElementById("panelEstablishmentName");n.name&&d&&(d.textContent=n.name,p.establishmentName=n.name)}}catch(o){g("Erro",`Não foi possível salvar: ${o.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function xi(e,t){t.innerHTML=`
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
    `,t.querySelector("#personal-data-form").addEventListener("submit",a=>{a.preventDefault();const o={ownerName:t.querySelector("#ownerName").value,name:t.querySelector("#establishmentName").value,phone:t.querySelector("#establishmentPhone").value,document:t.querySelector("#establishmentCnpjCpf").value,email:t.querySelector("#establishmentEmail").value,address:t.querySelector("#establishmentAddress").value,website:t.querySelector("#establishmentWebsite").value};Me(o,a)})}function yi(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const o=t.querySelector("#newPassword").value,r=t.querySelector("#confirmPassword").value;if(o!==r){g("Erro","As senhas não coincidem.","error");return}const s=t.querySelector('button[form="change-password-form"]');s.disabled=!0,s.textContent="A Salvar...";try{const n=J.currentUser;if(n)await _o(n,o),g("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum usuário autenticado encontrado.")}catch(n){g("Erro",`Não foi possível alterar a senha: ${n.message}`,"error")}finally{s.disabled=!1,s.textContent="Salvar Nova Senha"}})}function wi(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const o=t.querySelector("#newEmail").value,r=t.querySelector("#currentPassword").value;if(!o||!r){g("Erro","Preencha todos os campos.","error");return}const s=t.querySelector('button[form="change-email-form"]');s.disabled=!0,s.textContent="A verificar...";try{const n=J.currentUser;if(!n)throw new Error("Usuário não autenticado.");const i=Vo.credential(n.email,r);await Uo(n,i),s.textContent="A enviar link...",await Jo(n,o),s.textContent="A atualizar BD...",await hs(p.establishmentId,o),g("Sucesso","Link de verificação enviado! Por favor, verifique seu **novo e-mail** para confirmar a alteração.","success"),a.target.reset()}catch(n){let i="Não foi possível alterar o e-mail.";n.code==="auth/wrong-password"?i="A senha atual está incorreta.":n.code==="auth/email-already-in-use"?i="Este e-mail já está sendo usado por outra conta.":n.code==="auth/operation-not-allowed"?i="A troca de e-mail precisa ser habilitada no console do Firebase.":i=n.message,g("Erro",i,"error")}finally{s.disabled=!1,s.textContent="Salvar Novo E-mail"}})}function ki(e,t){t.innerHTML=`
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
                        <p class="text-xs text-gray-500 mt-2">Recomendado: PNG ou JPG.</p>
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
                                <p class="text-xs text-gray-500 mt-2">Aparecerá no fundo do agendamento online. Aceita imagens de qualquer tamanho (serão otimizadas automaticamente).</p>
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
    `,t.querySelector("#establishmentLogoBase64").value=e.logo||"",t.querySelector("#establishmentBackgroundImageBase64").value=e.backgroundImage||"",Ro(e.themeColor||"indigo",t),t.querySelector("#establishmentLogoButton").onclick=()=>t.querySelector("#establishmentLogoInput").click(),t.querySelector("#establishmentLogoInput").onchange=async a=>{const o=a.target.files[0];if(o)try{const r=await Ga(o,300,.9);t.querySelector("#establishmentLogoPreview").src=r,t.querySelector("#establishmentLogoBase64").value=r}catch(r){console.error("Erro ao processar logo:",r),g("Erro","Formato de imagem inválido ou corrompido.","error")}},t.querySelector("#establishmentBgButton").onclick=()=>t.querySelector("#establishmentBgInput").click(),t.querySelector("#establishmentBgInput").onchange=async a=>{const o=a.target.files[0];if(o){const r=t.querySelector("#establishmentBgButton"),s=r.textContent;try{r.textContent="A processar...",r.disabled=!0;const n=await Ga(o,1280,.7);t.querySelector("#establishmentBgPreview").src=n,t.querySelector("#establishmentBgPreview").classList.remove("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=n}catch(n){console.error("Erro ao processar fundo:",n),g("Erro","Não foi possível processar esta imagem. Tente outra.","error")}finally{r.textContent=s,r.disabled=!1}}},t.querySelector("#establishmentBgRemoveBtn").onclick=()=>{t.querySelector("#establishmentBgPreview").src="",t.querySelector("#establishmentBgPreview").classList.add("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.remove("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=""},t.querySelector("#branding-form").addEventListener("submit",a=>{a.preventDefault();const o={logo:t.querySelector("#establishmentLogoBase64").value,welcomeMessage:t.querySelector("#establishmentWelcomeMessage").value,backgroundImage:t.querySelector("#establishmentBackgroundImageBase64").value,primaryColor:t.querySelector("#establishmentPrimaryColorInput").value,textColor:t.querySelector("#establishmentTextColorInput").value,themeColor:t.querySelector("#establishmentThemeColor").value};Me(o,a)})}function $i(e,t){const a=e.urlId||p.establishmentId,o="https://www.kairosagenda.com.br";let r=window.location.origin;(r.includes("localhost")||r.includes("capacitor://")||r.includes("127.0.0.1")||r.includes("192.168"))&&(r=o);const s=`${r}/agendar?id=${a}`,n=e.publicBookingEnabled||!1,i=n?"Agendamento Online ATIVO":"Agendamento Online INATIVO",d=n?"text-green-600":"text-red-600";t.innerHTML=`
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
    `,t.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const l=t.querySelector("#publicBookingLink");if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(l.value).then(()=>{g("Sucesso","Link copiado para a área de transferência!","success")}).catch(c=>{g("Erro","Não foi possível copiar o link.","error")});else try{l.select(),document.execCommand("copy"),l.blur(),g("Sucesso","Link copiado para a área de transferência!","success")}catch{g("Erro","Não foi possível copiar o link. Por favor, copie manualmente.","error")}}),t.querySelector("#publicBookingToggle").addEventListener("change",async l=>{const c=l.target.checked,u=t.querySelector("#publicBookingStatusText");c?(u.textContent="Agendamento Online ATIVO",u.className="text-sm font-semibold text-green-600"):(u.textContent="Agendamento Online INATIVO",u.className="text-sm font-semibold text-red-600");try{l.target.disabled=!0,await vs(p.establishmentId,c),V.publicBookingEnabled=c,g("Sucesso",`Agendamento online ${c?"ativado":"desativado"}!`,"success")}catch(m){g("Erro",`Não foi possível alterar o status: ${m.message}`,"error"),l.target.checked=!c,c?(u.textContent="Agendamento Online ATIVO",u.className="text-sm font-semibold text-green-600"):(u.textContent="Agendamento Online INATIVO",u.className="text-sm font-semibold text-red-600")}finally{l.target.disabled=!1}}),Li(e.slotInterval||30,t),t.querySelector("#booking-form").addEventListener("submit",l=>{l.preventDefault();const c={slotInterval:parseInt(t.querySelector("#establishmentSlotInterval").value,10)};Me(c,l)})}function Si(e,t){t.innerHTML=`
         <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
             <div class="flex justify-between items-center mb-6">
                 <h3 class="text-xl font-bold text-gray-800">Horário de Funcionamento</h3>
                 <button type="submit" form="working-hours-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar Horários</button>
             </div>
             
             <form id="working-hours-form">
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
    `;const a=t.querySelector("#establishmentTimezone");if(e.timezone)a.value=e.timezone;else try{const s=Intl.DateTimeFormat().resolvedOptions().timeZone;Array.from(a.options).some(i=>i.value===s)?a.value=s:a.value="America/Sao_Paulo"}catch{a.value="America/Sao_Paulo"}const o=t.querySelector("#establishmentWorkingHoursContainer"),r=e.workingHours||{};Object.keys(Ut).forEach(s=>{const n=r[s]||{},i=Ut[s],d=n.active!==!1,l=document.createElement("div");l.className=`day-schedule-card p-4 rounded-lg ${d?"bg-gray-50":"bg-gray-100 disabled"}`,l.innerHTML=`
            <div class="flex justify-between items-center mb-3">
                <span class="font-bold text-gray-800">${i}</span>
                <label class="flex items-center cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" id="est-${s}-active" class="sr-only" ${d?"checked":""}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                </label>
            </div>
            <div class="time-inputs space-y-2">
                <div class="flex items-center gap-2"><label class="w-16">Início:</label><input type="time" id="est-${s}-start" value="${n.start||"09:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Fim:</label><input type="time" id="est-${s}-end" value="${n.end||"18:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Intervalo:</label><input type="time" id="est-${s}-breakStart" value="${n.breakStart||"12:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Fim Int.:</label><input type="time" id="est-${s}-breakEnd" value="${n.breakEnd||"13:00"}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
            </div>`,o.appendChild(l)}),o.addEventListener("change",s=>{const n=s.target.closest('.day-schedule-card input[type="checkbox"]');n&&n.closest(".day-schedule-card").classList.toggle("disabled",!n.checked)}),t.querySelector("#working-hours-form").addEventListener("submit",s=>{s.preventDefault();const n={};Object.keys(Ut).forEach(d=>{n[d]={active:t.querySelector(`#est-${d}-active`).checked,start:t.querySelector(`#est-${d}-start`).value,end:t.querySelector(`#est-${d}-end`).value,breakStart:t.querySelector(`#est-${d}-breakStart`).value,breakEnd:t.querySelector(`#est-${d}-breakEnd`).value}});const i=t.querySelector("#establishmentTimezone").value;Me({workingHours:n,timezone:i},s)})}function Ei(e,t){t.innerHTML=`
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
    `;const a=e.loyaltyProgram||{};t.querySelector("#loyaltyEnabled").checked=a.enabled||!1,t.querySelector("#loyaltyPointsPerCurrency").value=a.pointsPerCurrency||10;const o=t.querySelector("#loyaltyTiersContainer"),r=(s={})=>{const n=document.createElement("div");return n.className="loyalty-tier-row",n.innerHTML=`
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
        `,n};(a.tiers||[]).forEach(s=>{o.appendChild(r(s))}),t.querySelector("#add-loyalty-tier").addEventListener("click",()=>{o.appendChild(r())}),o.addEventListener("click",s=>{const n=s.target.closest(".remove-loyalty-tier");n&&n.closest(".loyalty-tier-row").remove()}),t.querySelector("#loyalty-form").addEventListener("submit",s=>{s.preventDefault();const n=Array.from(t.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(d=>({points:parseInt(d.querySelector('input[data-field="points"]').value,10)||0,reward:d.querySelector('input[data-field="reward"]').value,discount:parseFloat(d.querySelector('input[data-field="discount"]').value)||0})),i={loyaltyProgram:{enabled:t.querySelector("#loyaltyEnabled").checked,pointsPerCurrency:parseFloat(t.querySelector("#loyaltyPointsPerCurrency").value)||1,tiers:n.filter(d=>d.points>0&&d.reward)}};Me(i,s)})}async function Ci(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Integração Financeira</h3>
                <button type="submit" form="financial-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
            </div>
            <form id="financial-form" class="space-y-8">
                
                <div class="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 class="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path></svg>
                        Vendas (Contas a Receber)
                    </h4>
                    <p class="text-sm text-green-700 mb-4">Defina a classificação automática para vendas realizadas.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="financialNatureId" class="block text-sm font-bold text-gray-700">Natureza Padrão</label>
                            <select id="financialNatureId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                                <option value="">A carregar...</option>
                            </select>
                        </div>
                        <div>
                            <label for="financialCostCenterId" class="block text-sm font-bold text-gray-700">Centro de Custo</label>
                            <select id="financialCostCenterId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                                <option value="">A carregar...</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h4 class="text-lg font-semibold text-red-800 mb-2 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
                        Comissões (Contas a Pagar)
                    </h4>
                    <p class="text-sm text-red-700 mb-4">Defina a classificação automática para comissões geradas.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="commissionNatureId" class="block text-sm font-bold text-gray-700">Natureza Padrão</label>
                            <select id="commissionNatureId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                                <option value="">A carregar...</option>
                            </select>
                        </div>
                        <div>
                            <label for="commissionCostCenterId" class="block text-sm font-bold text-gray-700">Centro de Custo</label>
                            <select id="commissionCostCenterId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                                <option value="">A carregar...</option>
                            </select>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    `;try{const[a,o]=await Promise.all([Ye(),Xe()]),r=e.financialIntegration||{},s=e.commissionConfig||{};t.querySelector("#financialNatureId").innerHTML=dt(a,r.defaultNaturezaId),t.querySelector("#financialCostCenterId").innerHTML=dt(o,r.defaultCentroDeCustoId),t.querySelector("#commissionNatureId").innerHTML=dt(a,s.defaultNatureId),t.querySelector("#commissionCostCenterId").innerHTML=dt(o,s.defaultCostCenterId)}catch{g("Erro","Não foi possível carregar os dados para a integração financeira.","error")}t.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const o={financialIntegration:{defaultNaturezaId:t.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:t.querySelector("#financialCostCenterId").value||null},commissionConfig:{defaultNatureId:t.querySelector("#commissionNatureId").value||null,defaultCostCenterId:t.querySelector("#commissionCostCenterId").value||null}};Me(o,a)})}function Ii(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-gray-800">${e}</h3>
            <p class="mt-4 text-gray-500">Esta secção ainda não foi implementada.</p>
        </div>
    `}function Ro(e="indigo",t){const a=t.querySelector("#color-palette-container"),o=t.querySelector("#establishmentThemeColor");!a||!o||(a.innerHTML="",Object.entries(hi).forEach(([r,s])=>{const n=r===e,i=document.createElement("div");i.className="w-24 text-center cursor-pointer mb-4",i.innerHTML=`
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${n?"border-gray-800 scale-110 shadow-lg":"border-transparent"} p-1 transition-all">
                <div class="w-full h-full rounded-full" style="background-color: ${s.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${n?"text-gray-900 font-bold":"text-gray-500"}">${s.name}</p>
        `,i.addEventListener("click",()=>{o.value=r,Ro(r,t)}),a.appendChild(i)}),o.value=e)}function Li(e,t){const a=t.querySelector("#slotIntervalContainer"),o=t.querySelector("#establishmentSlotInterval");if(!a||!o)return;const r=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=r.map(s=>{const n=s.value===e;return`<button type="button" data-value="${s.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors 
                           ${n?"bg-indigo-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}">
                       ${s.label}
                   </button>`}).join(""),o.value=e,a.querySelectorAll(".interval-btn").forEach(s=>{s.addEventListener("click",()=>{o.value=s.dataset.value,a.querySelectorAll(".interval-btn").forEach(n=>{n.classList.remove("bg-indigo-600","text-white"),n.classList.add("bg-gray-200","text-gray-700")}),s.classList.add("bg-indigo-600","text-white"),s.classList.remove("bg-gray-200","text-gray-700")})})}async function Bi(e){const t=Fo.find(o=>o.id===e);if(!t){console.error("Secção de definições não encontrada:",e);return}be.innerHTML=`
        <div class="bg-white p-4 shadow-md sticky top-0 z-10 md:relative">
            <button data-action="back-to-list" class="flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                Voltar
            </button>
        </div>
        
        <div id="settings-content-detail" class="p-4">
            <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
        </div>
    `,be.querySelector('button[data-action="back-to-list"]').addEventListener("click",o=>{o.preventDefault(),jo()});const a=document.getElementById("settings-content-detail");switch(e){case"personal-data":xi(V,a);break;case"change-password":yi(V,a);break;case"change-email":wi(V,a);break;case"branding":ki(V,a);break;case"booking":$i(V,a);break;case"working-hours":Si(V,a);break;case"loyalty":Ei(V,a);break;case"financial":await Ci(V,a);break;default:Ii(t?t.label:"Definições",a)}}async function jo(){if(be.innerHTML=`
        <div class="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>
                Definições
            </h2>
        </div>
        <div class="flex justify-center items-center h-64"><div class="loader"></div></div>
    `,!V)try{V=await Qe(p.establishmentId)}catch{g("Erro Fatal","Não foi possível carregar os dados do estabelecimento.","error"),be.innerHTML='<p class="text-red-500">Erro ao carregar dados.</p>';return}const e=p.userName||J.currentUser.email,t=e?e.charAt(0).toUpperCase():"U";be.innerHTML=`
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
                 ${p.userName&&p.userName!==J.currentUser.email?`<p class="text-sm text-gray-500">${J.currentUser.email||"Não disponível"}</p>`:""}
                 
                 <p class="text-xs text-indigo-600 font-semibold mt-2">VER MEU PERFIL / MEUS BLOQUEIOS</p>
            </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <nav id="settings-menu-list" class="space-y-1">
                ${Fo.map(o=>`
                    <button data-section="${o.id}" class="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold text-sm">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${o.icon}"></path></svg>
                        <span class="flex-1 text-left">${o.label}</span>
                        <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                `).join("")}
            </nav>
        </div>
    `,be.querySelector("#settings-menu-list").addEventListener("click",o=>{const r=o.target.closest("button[data-section]");r&&(o.preventDefault(),Bi(r.dataset.section))});const a=be.querySelector('[data-action="go-to-my-profile"]');a&&a.addEventListener("click",o=>{o.preventDefault(),Y("my-profile-section")})}const Ve=document.getElementById("content");async function Ee(e){const t=document.getElementById("blockagesList");if(t){t.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,o=document.getElementById("filterEndDate")?.value,r=await Dt(p.establishmentId,a||new Date().toISOString().split("T")[0],o||new Date().toISOString().split("T")[0],e),s=document.getElementById("filterReason")?.value.toLowerCase(),n=s?r.filter(d=>d.reason&&d.reason.toLowerCase().includes(s)):r,i=n.reduce((d,l)=>{const c=l.reason||"Sem motivo";return d[c]||(d[c]=[]),d[c].push(l),d},{});if(t.innerHTML="",n.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(i).forEach(([d,l])=>{const c=document.createElement("div");c.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let u=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${d} (${l.length})</h4>`;if(l.length>1){const m=JSON.stringify(l.map(b=>b.id));u+=`<button data-action="batch-delete-blockage" data-ids='${m}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}u+="</div>",c.innerHTML=u,l.forEach(m=>{const b=new Date(m.startTime),f=new Date(m.endTime),v=b.toLocaleDateString("pt-BR"),y=f.toLocaleDateString("pt-BR"),x=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${v===y?`${v} | ${b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${f.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${v} às ${b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${y} às ${f.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${m.id}">Apagar</button>
                    </div>`;c.innerHTML+=x}),t.appendChild(c)})}catch(a){t.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function Ti(e){e.preventDefault();const t=e.target,a=t.querySelector("#blockageProfId").value,o=t.querySelector("#blockageDate").value,r=t.querySelector("#blockageEndDate").value||o,s=t.querySelector("#blockageStartTime").value,n=t.querySelector("#blockageEndTime").value,i={establishmentId:p.establishmentId,professionalId:a,startTime:new Date(`${o}T${s}:00`).toISOString(),endTime:new Date(`${r}T${n}:00`).toISOString(),reason:t.querySelector("#blockageReason").value};try{await Mt(i),t.reset(),g("Sucesso","Bloqueio adicionado com sucesso!","success"),Ee(a)}catch(d){g("Erro",`Não foi possível criar o bloqueio: ${d.message}`,"error")}}async function Di(e){e.preventDefault();const t=e.target,a=Array.from(t.querySelectorAll('input[name="batch-professionals"]:checked')).map(c=>c.value);if(a.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const o=t.querySelector("#batchBlockageDate").value,r=t.querySelector("#batchBlockageEndDate").value||o,s=t.querySelector("#batchBlockageStartTime").value,n=t.querySelector("#batchBlockageEndTime").value,i=t.querySelector("#batchBlockageReason").value,d=t.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="Aguarde...";const l=a.map(c=>{const u={establishmentId:p.establishmentId,professionalId:c,startTime:new Date(`${o}T${s}:00`).toISOString(),endTime:new Date(`${r}T${n}:00`).toISOString(),reason:i};return Mt(u)});try{await Promise.all(l),g("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),t.reset(),t.querySelectorAll('input[name="batch-professionals"]:checked').forEach(u=>u.checked=!1);const c=document.getElementById("blockageProfId").value;c&&Ee(c)}catch(c){g("Erro",`Ocorreu um erro: ${c.message}`,"error")}finally{d.disabled=!1,d.textContent="Adicionar Bloqueio em Lote"}}function Mi(e){Ve.addEventListener("submit",t=>{t.target.id==="blockageForm"&&Ti(t),t.target.id==="batchBlockageForm"&&Di(t)}),Ve.addEventListener("input",t=>{t.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&Ee(e)}),Ve.addEventListener("click",async t=>{const a=t.target.closest("button[data-action]");if(!a)return;const o=a.dataset.action;if(o==="back-to-professionals")Y("profissionais-section");else if(o==="delete-blockage"){if(await A("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await fa(a.dataset.id),g("Sucesso","Bloqueio removido.","success"),Ee(e)}catch(s){g("Erro",`Não foi possível remover o bloqueio: ${s.message}`,"error")}}else if(o==="batch-delete-blockage"){const r=JSON.parse(a.dataset.ids);if(await A("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${r.length} bloqueios de uma vez?`))try{await vo(r),g("Sucesso",`${r.length} bloqueios removidos.`,"success"),Ee(e)}catch(n){g("Erro",`Não foi possível apagar os bloqueios: ${n.message}`,"error")}}})}async function Pi(e){const{professionalId:t,professionalName:a}=e;if(!t||!a){Ve.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}Ve.innerHTML=`
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
        </section>`,Mi(t),await Ee(t);const o=document.getElementById("batchProfSelectionContainer");try{const r=await _(p.establishmentId);o.innerHTML=r.map(s=>`
            <div class="flex items-center">
                <input id="prof-batch-${s.id}" value="${s.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${s.id}" class="ml-2 text-sm text-gray-700">${s.name}</label>
            </div>`).join("")}catch{o.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Ai=e=>k(`/api/users/${e}`),qi=e=>k("/api/users",{method:"POST",body:JSON.stringify(e)}),Ni=(e,t)=>k(`/api/users/${e}`,{method:"PUT",body:JSON.stringify(t)}),Fi=e=>k(`/api/users/${e}`,{method:"DELETE"}),Ri=(e,t)=>k(`/api/users/${e}/password`,{method:"PUT",body:JSON.stringify({password:t})}),ji=(e,t)=>k(`/api/users/${e}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),me=document.getElementById("content"),Hi={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios Gerais","sales-report-section":"Relatório de Vendas (Caixa)","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores","profissionais-section":"Profissionais","ausencias-section":"Ausências e Bloqueios","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},Oi={view:"Visualizar",create:"Criar",edit:"Editar"};let Ae=null,qe=null;function zi(e){const t=document.getElementById("usersListContainer");if(!t)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(e.length===0){const o=a?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";t.innerHTML=`<p class="col-span-full text-center text-gray-500">${o}</p>`;return}e.sort((o,r)=>(o.status==="active"?-1:1)-(r.status==="active"?-1:1)),t.innerHTML=e.map(o=>{const r=JSON.stringify(o).replace(/'/g,"&apos;"),s=o.status==="active",n=p.professionals.find(c=>c.id===o.professionalId),i=n?n.name:"N/A",d=n?n.name.charAt(0):o.name.charAt(0),l=n?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(d)}`;return`
        <div class="user-card-clickable bg-white rounded-lg shadow-sm border overflow-hidden flex cursor-pointer ${s?"":"opacity-60"}" 
             data-action="edit-user" 
             data-user='${r}'>
            
            <img src="${l}" alt="Foto de Perfil" class="w-16 h-16 object-cover flex-shrink-0 pointer-events-none">
            
            <div class="p-3 flex-grow flex flex-col justify-between">
                
                <div class="pointer-events-none">
                    <p class="font-bold text-gray-800 text-sm truncate">${o.name}</p>
                    <p class="text-xs text-gray-500 truncate">${o.email}</p>
                    <p class="text-xs text-gray-400 mt-1">Prof: <span class="font-semibold text-gray-700">${i}</span></p>
                </div>
                
                <div class="mt-2 flex items-center justify-start gap-2">
                    <label class="flex items-center cursor-pointer" title="${s?"Ativo":"Inativo"}">
                        <div class="relative">
                            <input type="checkbox" data-action="toggle-user-status" data-user-id="${o.id}" class="sr-only" ${s?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                        </div>
                    </label>
                    
                    <button data-action="delete-user" data-user-id="${o.id}" class="text-gray-500 hover:text-red-600 p-2 rounded-full transition-colors action-btn-delete" title="Excluir Usuário">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `}).join("")}function wt(){const e=document.getElementById("showInactiveUsersToggle")?.checked;let t;e?t=p.users:t=p.users.filter(a=>a.status==="active"),zi(t)}function Vi(e={}){return Object.entries(Hi).map(([t,a])=>{const o=t==="agenda-section"||t==="comandas-section",r=e[t]?.view_all_prof===!0,s=Object.entries(Oi).map(([i,d])=>`
             <label class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${t}" data-permission="${i}" class="sr-only" 
                        ${e[t]?.[i]?"checked":""}>
                    <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                </div>
                <span class="text-xs text-gray-600">${d}</span>
            </label>
        `).join(""),n=o?`
            <div class="col-span-full pt-2 mt-2 border-t border-gray-200">
                <label class="flex items-center space-x-3 cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" data-module="${t}" data-permission="view_all_prof" class="sr-only" 
                            ${r?"checked":""}>
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
            ${n}
        </div>
    `}).join("")}async function Ya(e=null){document.getElementById("user-list-view").classList.add("hidden");const t=document.getElementById("user-form-view");t.classList.remove("hidden");let a=p.professionals;if(!a||a.length===0)try{a=await _(p.establishmentId),p.professionals=a}catch{g("Erro","Não foi possível carregar a lista de profissionais.","error")}const o=h=>a.find(x=>x.id===h),r=(h,x)=>{const E=o(h)?.photo,T=x.charAt(0).toUpperCase();return{photoSrc:E||`https://placehold.co/128x128/E2E8F0/4A5568?text=${T}`,initials:T,photoUrl:E||""}},s=e?.professionalId,n=e?.name||"Novo Usuário",i=r(s,n),d=o(s),l=h=>{let x='<option value="">-- Não Associado a um Profissional --</option>';return x+=a.map(S=>`<option value="${S.id}" ${S.id===h?"selected":""}>${S.name} (${S.specialty||"N/A"})</option>`).join(""),x},c=e!==null;t.querySelector("#userFormTitle").textContent=c?`Editar Usuário: ${e.name}`:"Novo Usuário";const u=t.querySelector("#userForm");u.innerHTML=`
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
                    ${Vi(e?.permissions)}
                </div>
            </div>

            <div class="flex gap-4 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-3 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                <button type="submit" class="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar Alterações</button>
            </div>
        </div>
    `;const m=window.innerWidth<768,b=u.querySelector(".bg-white");if(m&&b){b.classList.remove("rounded-xl","shadow-2xl","sm:p-6");const h=u.closest("section");h&&(h.style.padding="0",h.style.margin="0"),b.classList.add("p-4")}const f=u.querySelector("#userProfessionalId"),v=u.querySelector("#userPhotoPreview"),y=u.querySelector("#profPhotoName");if(f.addEventListener("change",h=>{const x=h.target.value,S=o(x),E=S?S.name:"Selecione um profissional",T=r(x,n);v.src=T.photoSrc,y.textContent=E,u.querySelector("#professionalPhotoUrl").value=T.photoUrl}),u.addEventListener("submit",async h=>{h.preventDefault();const x=e?.email,S=u.querySelector("#userEmail").value,E={};u.querySelectorAll('input[type="checkbox"]').forEach(H=>{const M=H.dataset.module,q=H.dataset.permission;E[M]||(E[M]={}),E[M][q]=H.checked});const T=u.querySelector("#userProfessionalId").value||null,D={name:u.querySelector("#userName").value,permissions:E,professionalId:T};try{c?(x!==S&&(D.email=S),await Ni(e.id,D),g("Usuário atualizado com sucesso!","success")):(D.email=u.querySelector("#userEmail").value,D.password=u.querySelector("#userPassword").value,await qi(D),g("Usuário criado com sucesso!","success")),St()}catch(H){g(`Erro: ${H.message}`,"error")}}),c){const h=u.querySelector("#password-change-container"),x=h.querySelector('[data-action="show-password-form"]'),S=h.querySelector("#password-form"),E=S.querySelector('[data-action="save-password"]'),T=S.querySelector('[data-action="cancel-password-change"]');x.addEventListener("click",()=>{x.classList.add("hidden"),S.classList.remove("hidden")}),T.addEventListener("click",()=>{x.classList.remove("hidden"),S.classList.add("hidden"),S.querySelector("#userNewPassword").value=""}),E.addEventListener("click",async()=>{const D=S.querySelector("#userNewPassword").value;if(!D||D.length<6){g("Senha inválida","A nova senha deve ter pelo menos 6 caracteres.","error");return}if(await A("Alterar Senha","Tem a certeza que deseja alterar a senha deste usuário?"))try{E.disabled=!0,E.textContent="Aguarde...",await Ri(e.id,D),g("Sucesso!","A senha do usuário foi alterada.","success"),x.classList.remove("hidden"),S.classList.add("hidden"),S.querySelector("#userNewPassword").value=""}catch(M){g("Erro",`Não foi possível alterar a senha: ${M.message}`,"error")}finally{E.disabled=!1,E.textContent="Salvar Nova Senha"}})}}async function Ui(){const e=document.getElementById("usersListContainer");e.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[t,a]=await Promise.all([Ai(p.establishmentId),_(p.establishmentId)]);p.users=t,p.professionals=a,wt()}catch{g("Erro ao carregar usuários.","error"),e.innerHTML='<p class="col-span-full text-center text-red-500">Não foi possível carregar os usuários.</p>'}}async function St(){me.innerHTML=`
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
    `,Ae&&me.removeEventListener("click",Ae),qe&&me.removeEventListener("change",qe),Ae=async e=>{if(!document.getElementById("user-list-view")){me.removeEventListener("click",Ae);return}const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"new-user":Ya();break;case"edit-user":const o=JSON.parse(t.dataset.user.replace(/&apos;/g,"'"));Ya(o);break;case"back-to-list":St();break;case"delete-user":{e.stopPropagation();const r=t.dataset.userId;if(await A("Excluir Usuário","Tem certeza que deseja excluir este usuário? Esta ação é irreversível."))try{await Fi(r),g("Usuário excluído com sucesso!","success"),St()}catch(n){g(`Erro ao excluir: ${n.message}`,"error")}break}}},qe=async e=>{if(!document.getElementById("user-list-view")){me.removeEventListener("change",qe);return}const t=e.target.closest('input[data-action="toggle-user-status"]');if(e.target.id==="showInactiveUsersToggle")wt();else if(t){e.stopPropagation();const a=t.dataset.userId,o=t.checked?"active":"inactive";try{await ji(a,o),g(`Usuário ${o==="active"?"ativado":"inativado"} com sucesso.`,"success");const r=p.users.findIndex(s=>s.id===a);r>-1&&(p.users[r].status=o,wt())}catch(r){g(`Erro ao atualizar status: ${r.message}`,"error"),t.checked=!t.checked,wt()}}},me.addEventListener("click",Ae),me.addEventListener("change",qe),await Ui()}const Ji=document.getElementById("content");let Xa={},ca=null;function _i(){Object.values(Xa).forEach(e=>e?.destroy()),Xa={}}function Wi(e,t){const{jsPDF:a}=window.jspdf,o=new a({orientation:"landscape",unit:"px",format:"a4"}),r=document.getElementById("salesReportSummaryCards");if(o.setFontSize(18),o.text(e,o.internal.pageSize.getWidth()/2,40,{align:"center"}),r){const n=[["Receita Total",r.querySelector("#summary-revenue").textContent],["Vendas Totais",r.querySelector("#summary-transactions").textContent],["Ticket Médio",r.querySelector("#summary-avg-ticket").textContent]];o.autoTable({startY:60,head:[["Métrica","Valor"]],body:n,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const s=o.lastAutoTable?o.lastAutoTable.finalY+20:60;o.text("Detalhes das Vendas",20,s),o.autoTable({html:`#${t}`,startY:s+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),o.save(`${e.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function Qa(e){const t=document.getElementById("genericModal"),a=(e.payments||[]).map(o=>`
        <div class="flex justify-between text-sm">
            <span>${o.method.charAt(0).toUpperCase()+o.method.slice(1)}</span>
            <span class="font-medium">R$ ${o.value.toFixed(2)}</span>
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
    `,t.style.display="flex"}function Gi(e){const{summary:t,transactions:a}=e;document.getElementById("summary-revenue").textContent=`R$ ${t.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=t.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${t.averageTicket.toFixed(2)}`;const o=document.getElementById("paymentSummaryTableBody"),r=Object.entries(t.paymentMethodTotals).sort(([,i],[,d])=>d-i);o.innerHTML=r.map(([i,d])=>`
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${i.charAt(0).toUpperCase()+i.slice(1)}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${d.toFixed(2)}</td>
        </tr>
    `).join("");const s=document.getElementById("transactionsTableBody"),n=document.getElementById("mobileTransactionsList");if(a.length===0){const i='<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>';s.innerHTML=i,n.innerHTML='<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>';return}s.innerHTML=a.map((i,d)=>`
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${d}">
            <td class="w-24 py-3 px-4">${new Date(i.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${i.client}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${i.items}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${i.type}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${i.total.toFixed(2)}</td>
        </tr>
    `).join(""),s.querySelectorAll("tr").forEach(i=>{i.addEventListener("dblclick",()=>{const d=i.dataset.transactionIndex,l=ca.transactions[d];l&&Qa(l)})}),n.innerHTML=a.map((i,d)=>`
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
    `).join(""),n.querySelectorAll("div[data-transaction-index]").forEach(i=>{i.addEventListener("click",()=>{const d=i.dataset.transactionIndex,l=ca.transactions[d];l&&Qa(l)})})}async function Za(){const e=document.getElementById("main-reports-view"),t=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!e||!t||!a)return;const o=t.value,r=a.value;if(!o||!r)return g("Atenção","Por favor, selecione as datas de início e fim.","error");e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const s=document.getElementById("cashierSessionFilter").value,n=await qs({establishmentId:p.establishmentId,startDate:o,endDate:r,cashierSessionId:s});ca=n,e.innerHTML=`
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
        `,Gi(n)}catch(s){g("Erro",`Não foi possível carregar o relatório: ${s.message}`,"error"),e.innerHTML=`<p class="p-8 text-center text-red-500">${s.message}</p>`}}async function Yi(){_i();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];Ji.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",Za),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const o=document.getElementById("reportStartDate").value,r=document.getElementById("reportEndDate").value,s=`Relatorio_Vendas_${o}_a_${r}`;Wi(s,"transactionsTable")});try{const o=await $r(),r=document.getElementById("cashierSessionFilter");o.forEach(s=>{const n=new Date(s.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),i=s.closedByName||"N/A";r.innerHTML+=`<option value="${s.id}">${i} - ${n}</option>`})}catch{g("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await Za()}const Xi=document.getElementById("content");let C={payables:[],receivables:[],natures:[],costCenters:[],currentFilter:"pending",startDate:new Date(new Date().getFullYear(),new Date().getMonth()-1,1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],previousBalance:0,filterNaturezaId:"all",filterCostCenterId:"all",currentListView:"receivables"},Jt=null,ct=null,ut=null;function Ca(e){const t=new Map,a=[];return e&&(e.forEach(o=>t.set(o.id,{...o,children:[]})),t.forEach(o=>{o.parentId&&t.has(o.parentId)?t.get(o.parentId).children.push(o):a.push(o)})),a}function Ho(e,t,a){if(!t||t.length===0){e.innerHTML='<p class="text-center text-gray-500">Nenhum item criado.</p>';return}const o=(r,s=0)=>{const n="— ".repeat(s);return`
            <div style="margin-left: ${s*20}px;" class="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>${n}${r.name}</span>
                <button data-action="delete-${a}" data-id="${r.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
            </div>
            ${r.children.map(i=>o(i,s+1)).join("")}
        `};e.innerHTML=t.map(r=>o(r)).join("")}async function Ka(e){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const t=document.getElementById("genericModal"),a=e==="nature",o=`Gerir ${a?"Naturezas Financeiras":"Centros de Custo"}`,r=a?Ye:Xe,s=a?"natures":"costCenters";t.innerHTML=`
        <div class="modal-content max-w-lg">
            <h2 class="text-2xl font-bold mb-6">${o}</h2>
            <form id="hierarchyForm" class="space-y-3 mb-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" id="itemName" placeholder="Nome do novo item" required class="p-2 border rounded-md w-full">
                    <select id="itemParent" class="p-2 border rounded-md bg-white w-full"><option value="">-- Nível Principal --</option></select>
                </div>
                <button type="submit" class="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg">Adicionar</button>
            </form>
            <div id="hierarchyList" class="space-y-1 max-h-64 overflow-y-auto p-2 border rounded-md"><div class="loader mx-auto"></div></div>
            <div class="mt-6"><button type="button" data-action="close-modal" data-target="genericModal" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg">Fechar</button></div>
        </div>`,t.style.display="flex";const n=t.querySelector("#hierarchyList"),i=t.querySelector("#itemParent"),d=c=>{const u=Ca(c);Ho(n,u,e),i.innerHTML='<option value="">-- Nível Principal --</option>';const m=(b,f="",v=0)=>{const y=v>0?"— ".repeat(v):"";i.innerHTML+=`<option value="${b.id}">${y}${b.name}</option>`,b.children.forEach(h=>m(h,f+"— "))};u.forEach(b=>m(b))},l=await r();C[s]=l,d(l),t.querySelector("#hierarchyForm").addEventListener("submit",async c=>{c.preventDefault();const u=t.querySelector("#itemName").value,m=i.value,b=a?ai:si;try{await b({name:u,parentId:m||null});const f=await r();C[s]=f,d(f),t.querySelector("#hierarchyForm").reset(),await ve()}catch(f){g("Erro",`Não foi possível criar: ${f.message}`,"error")}})}function Qi(e){const t=document.getElementById("cashFlowChart");if(!t)return;const a=t.getContext("2d");Jt&&Jt.destroy();const o=e.payables.map(r=>r*-1);Jt=new Chart(a,{type:"bar",data:{labels:e.labels,datasets:[{label:"Receitas",data:e.receivables,backgroundColor:"rgba(74, 222, 128, 0.6)",borderColor:"rgba(34, 197, 94, 1)",borderWidth:1,yAxisID:"y"},{label:"Despesas",data:o,backgroundColor:"rgba(248, 113, 113, 0.6)",borderColor:"rgba(239, 68, 68, 1)",borderWidth:1,yAxisID:"y"},{label:"Saldo Acumulado",data:e.expectedBalance,type:"line",borderColor:"rgba(59, 130, 246, 1)",backgroundColor:"rgba(59, 130, 246, 0.2)",borderWidth:3,pointRadius:4,pointBackgroundColor:"rgba(59, 130, 246, 1)",fill:!0,tension:.1,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{stacked:!0},y:{type:"linear",display:!0,position:"left",stacked:!0,title:{display:!0,text:"Movimentações (R$)"}},y1:{type:"linear",display:!0,position:"right",title:{display:!0,text:"Saldo Acumulado (R$)"},grid:{drawOnChartArea:!1}}},plugins:{tooltip:{callbacks:{label:function(r){let s=r.dataset.label||"";if(s&&(s+=": "),r.parsed.y!==null){const n=Math.abs(r.parsed.y);s+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(n)}return s}}}}}})}async function eo(){const e=document.getElementById("cash-flow-chart-container"),t=document.getElementById("cashFlowStartDate").value,a=document.getElementById("cashFlowEndDate").value;if(!t||!a){g("Atenção","Por favor, selecione as datas de início e fim.","error");return}e.innerHTML='<div class="loader mx-auto my-10"></div>';try{const o=await fi(t,a);e.innerHTML='<canvas id="cashFlowChart"></canvas>',Qi(o)}catch(o){e.innerHTML=`<p class="text-red-500 text-center">Erro ao carregar dados do gráfico: ${o.message}</p>`}}function to(){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const e=document.getElementById("genericModal"),t=new Date,a=new Date(t.getFullYear(),t.getMonth(),1).toISOString().split("T")[0],o=t.toISOString().split("T")[0];e.innerHTML=`
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
                    <input type="date" id="cashFlowEndDate" value="${o}" class="p-2 border rounded-md">
                </div>
                <button id="generateCashFlowBtn" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Gerar Gráfico</button>
            </div>
            <div id="cash-flow-chart-container" class="relative h-96">
                <canvas id="cashFlowChart"></canvas>
            </div>
        </div>
    `,e.style.display="flex",e.querySelector("#generateCashFlowBtn").addEventListener("click",eo),eo()}function Zi(){const e=document.getElementById("genericModal"),t=C.payables.filter(u=>u.status==="pending").reduce((u,m)=>u+m.amount,0),a=C.receivables.filter(u=>u.status==="pending").reduce((u,m)=>u+m.amount,0),o=a-t,r=C.payables.filter(u=>u.status==="paid").reduce((u,m)=>u+m.amount,0),s=C.receivables.filter(u=>u.status==="paid").reduce((u,m)=>u+m.amount,0),n=s-r,i=C.previousBalance||0,d=i+n,l=u=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(u),c=u=>u>=0?"text-green-600":"text-red-600";e.innerHTML=`
        <div class="modal-content max-w-4xl max-h-[90vh] flex flex-col">
             <div class="flex justify-between items-center p-6 border-b">
                <h2 class="text-2xl font-bold text-gray-800">Painel de Indicadores Financeiros</h2>
                <button type="button" data-action="close-modal" data-target="genericModal" class="text-2xl font-bold text-gray-500 hover:text-gray-800">&times;</button>
            </div>
            <div class="p-6 overflow-y-auto space-y-8">
                
                <p class="text-center text-sm text-gray-500 mb-6 bg-yellow-50 p-2 rounded-md">
                    Análise do período: ${new Date(C.startDate+"T00:00:00").toLocaleDateString("pt-BR")} a ${new Date(C.endDate+"T00:00:00").toLocaleDateString("pt-BR")}.
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
                            <p class="text-2xl font-bold text-red-600">${l(r)}</p>
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
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 ${c(o)==="text-green-600"?"border-green-600":"border-red-600"}">
                            <p class="text-gray-700 text-sm font-medium">Saldo Previsto</p>
                            <p class="text-2xl font-bold ${c(o)}">${l(o)}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `,e.style.display="flex"}function Ki(){const e=document.getElementById("genericModal");e.innerHTML=`
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
    `,e.style.display="flex"}function mt(e,t="all"){let a='<option value="all">Todos</option>';const o=n=>{const i=new Map,d=[];return n&&(n.forEach(l=>i.set(l.id,{...l,children:[]})),i.forEach(l=>{l.parentId&&i.has(l.parentId)?i.get(l.parentId).children.push(l):d.push(l)})),d},r=(n,i=0)=>{const d=i>0?"— ".repeat(i):"",l=n.id===t?"selected":"";a+=`<option value="${n.id}" ${l}>${d}${n.name}</option>`,n.children.forEach(c=>r(c,i+1))};return o(e).forEach(n=>r(n)),a}async function ve(){const e=document.getElementById("financial-content"),t=document.getElementById("filterStartDate")?.value,a=document.getElementById("filterEndDate")?.value,o=document.getElementById("filterNaturezaId")?.value,r=document.getElementById("filterCostCenterId")?.value;if(!t||!a){try{const[i,d]=await Promise.all([Ye(),Xe()]);C={...C,natures:i,costCenters:d},document.getElementById("filterNaturezaId")&&(document.getElementById("filterNaturezaId").innerHTML=mt(C.natures)),document.getElementById("filterCostCenterId")&&(document.getElementById("filterCostCenterId").innerHTML=mt(C.costCenters))}catch(i){g("Erro",`Não foi possível carregar os dados base: ${i.message}`,"error")}ua(),oo();return}const s=document.getElementById("payables-list"),n=document.getElementById("receivables-list");s&&(s.innerHTML='<div class="loader mx-auto"></div>'),n&&(n.innerHTML='<div class="loader mx-auto"></div>');try{const i={startDate:t,endDate:a};o&&o!=="all"&&(i.natureId=o),r&&r!=="all"&&(i.costCenterId=r);const[d,l,c,u]=await Promise.all([ii(i),mi(i),Ye(),Xe()]),m=l.previousBalance-d.previousBalance;C={...C,payables:d.entries,receivables:l.entries,natures:c,costCenters:u,previousBalance:m,filterNaturezaId:o,filterCostCenterId:r},document.getElementById("filterNaturezaId")&&(document.getElementById("filterNaturezaId").innerHTML=mt(C.natures,C.filterNaturezaId)),document.getElementById("filterCostCenterId")&&(document.getElementById("filterCostCenterId").innerHTML=mt(C.costCenters,C.filterCostCenterId)),ua(),oo()}catch(i){g("Erro",`Não foi possível carregar os dados: ${i.message}`,"error"),e&&(e.innerHTML='<p class="text-red-500 text-center">Falha ao carregar dados.</p>')}}async function el(e,t,a=null){e.preventDefault();const o=e.target,r=o.querySelector('[name="status"]').checked,s=o.querySelector('[name="paymentDate"]').value,n=parseFloat(o.querySelector('[name="amount"]').value),i=parseInt(o.querySelector('[name="installments"]')?.value,10)||1;if(isNaN(n)){g("Erro de Validação","O valor inserido é inválido.","error");return}if(r&&!s){g("Erro de Validação","Por favor, forneça a data de pagamento para um lançamento pago.","error");return}const d={description:o.querySelector('[name="description"]').value,amount:n,dueDate:o.querySelector('[name="dueDate"]').value,naturezaId:o.querySelector('[name="naturezaId"]').value||null,centroDeCustoId:o.querySelector('[name="centroDeCustoId"]').value||null,notes:o.querySelector('[name="notes"]').value,status:r?"paid":"pending",paymentDate:r?s:null,installments:a?1:i};try{a?(await(t==="payable"?li(a,d):pi(a,d)),g("Sucesso","Lançamento atualizado!","success")):(await(t==="payable"?ni(d):ui(d)),g("Sucesso","Lançamento adicionado!","success")),document.getElementById("genericModal").style.display="none",await ve()}catch(l){g("Erro",`Não foi possível salvar: ${l.message}`,"error")}}async function tl(e,t){if(await A("Confirmar Exclusão","Tem certeza? Esta ação é irreversível."))try{await(e==="payable"?di(t):gi(t)),g("Sucesso","Lançamento excluído!","success"),await ve()}catch(o){g("Erro",`Falha ao excluir: ${o.message}`,"error")}}async function al(e,t){const a=new Date().toISOString().split("T")[0];try{await(e==="payable"?ci(t,a):bi(t,a)),g("Sucesso","Lançamento atualizado!","success"),await ve()}catch(o){g("Erro",`Falha ao atualizar status: ${o.message}`,"error")}}function ao(e){const t=C.currentFilter;return t==="all"?e:e.filter(a=>a.status===t)}function ua(){const e=document.getElementById("payables-list"),t=document.getElementById("receivables-list");if(!e||!t)return;const a=new Map(C.natures.map(i=>[i.id,i.name])),o=new Map(C.costCenters.map(i=>[i.id,i.name])),r=ao(C.payables),s=ao(C.receivables),n=(i,d)=>{const l=i.status==="paid",c=JSON.stringify(i).replace(/'/g,"&apos;"),u=i.naturezaId?a.get(i.naturezaId):"N/A",m=i.centroDeCustoId?o.get(i.centroDeCustoId):"N/A";let b=d==="payable"?"text-red-600":"text-green-600";const f=l?"bg-gray-200 text-gray-600":d==="payable"?"bg-red-100 text-red-700":"bg-yellow-100 text-yellow-700",v=l?"Finalizado":"Pendente";return l&&(b="text-gray-500"),`
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
        </div>`};e.innerHTML=r.map(i=>n(i,"payable")).join("")||'<p class="text-center text-gray-500 py-4">Nenhuma conta a pagar.</p>',t.innerHTML=s.map(i=>n(i,"receivable")).join("")||'<p class="text-center text-gray-500 py-4">Nenhuma conta a receber.</p>'}function oo(){const e=C.payables.filter(r=>r.status==="pending").reduce((r,s)=>r+s.amount,0),t=C.receivables.filter(r=>r.status==="pending").reduce((r,s)=>r+s.amount,0),a=t-e;document.getElementById("summary-pending-receivables").textContent=`R$ ${t.toFixed(2)}`,document.getElementById("summary-pending-payables").textContent=`R$ ${e.toFixed(2)}`,document.getElementById("summary-pending-balance").textContent=`R$ ${a.toFixed(2)}`;const o=document.getElementById("summary-pending-balance");o&&(o.className=`text-2xl font-bold ${a>=0?"text-green-600":"text-red-600"}`)}function _t(e,t=null){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const a=document.getElementById("genericModal"),o=`${t?"Editar":"Nova"} ${e==="payable"?"Despesa":"Receita"}`,r=e==="payable"?"bg-red-600 hover:bg-red-700":"bg-green-600 hover:bg-green-700",s=m=>{let b='<option value="">-- Selecione (Opcional) --</option>';const f=Ca(m),v=(y,h="",x=0)=>{const S=x>0?"— ".repeat(x):"";b+=`<option value="${y.id}">${S}${y.name}</option>`,y.children.forEach(E=>v(E,h+"— "))};return f.forEach(y=>v(y)),b},n=s(C.natures),i=s(C.costCenters),d=t?"":`
        <div>
            <label>Número de Parcelas</label>
            <input type="number" name="installments" class="w-full p-2 border rounded-md" value="1" min="1" max="36">
        </div>
    `;a.innerHTML=`
        <div class="modal-content max-w-lg">
            <h2 class="text-2xl font-bold mb-6">${o}</h2>
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
                <div class="flex gap-4 pt-4"><button type="button" data-action="close-modal" data-target="genericModal" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg">Cancelar</button><button type="submit" class="w-full py-2 px-4 text-white font-semibold rounded-lg ${r}">Salvar</button></div>
            </form>
        </div>`,a.style.display="flex",t&&(a.querySelector('[name="naturezaId"]').value=t.naturezaId||"",a.querySelector('[name="centroDeCustoId"]').value=t.centroDeCustoId||"");const l=a.querySelector("#status"),c=a.querySelector("#payment-date-container"),u=a.querySelector('[name="paymentDate"]');t?.status==="paid"&&(l.checked=!0,c.classList.remove("hidden"),u.value=t.paymentDate||new Date().toISOString().split("T")[0]),l.addEventListener("change",()=>{c.classList.toggle("hidden",!l.checked),u.required=l.checked}),a.querySelector("#financial-form").addEventListener("submit",m=>el(m,e,t?.id))}async function ol(){const e=new Date,a=new Date(e.getFullYear(),e.getMonth()-1,1).toISOString().split("T")[0],o=e.toISOString().split("T")[0];C.startDate=a,C.endDate=o,C.currentFilter="pending",C.filterNaturezaId="all",C.filterCostCenterId="all",Xi.innerHTML=`
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
                            <input type="date" id="filterStartDate" value="${C.startDate}" class="w-full p-1 border rounded-md text-sm">
                        </div>
                        <div class="w-full md:w-auto">
                            <label for="filterEndDate" class="text-xs font-medium">Até:</label>
                            <input type="date" id="filterEndDate" value="${C.endDate}" class="w-full p-1 border rounded-md text-sm">
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
    `;const r=document.getElementById("main-fab-btn"),s=document.getElementById("fab-menu");if(r&&s){r.addEventListener("click",v=>{v.stopPropagation(),s.classList.toggle("hidden"),r.classList.toggle("rotate-45")});const m=s.querySelector('button[data-action="open-modal"][data-type="receivable"]'),b=s.querySelector('button[data-action="open-modal"][data-type="payable"]'),f=s.querySelector('button[data-action="open-cash-flow-modal"]');m&&m.addEventListener("click",v=>{v.stopPropagation(),_t("receivable")}),b&&b.addEventListener("click",v=>{v.stopPropagation(),_t("payable")}),f&&f.addEventListener("click",v=>{v.stopPropagation(),to()})}ct&&document.body.removeEventListener("click",ct),ut&&document.getElementById("genericModal").removeEventListener("click",ut);const n=()=>{const m=document.getElementById("filterStartDate"),b=document.getElementById("filterEndDate"),f=document.getElementById("filterNaturezaId"),v=document.getElementById("filterCostCenterId");C.startDate=m.value,C.endDate=b.value,C.filterNaturezaId=f.value,C.filterCostCenterId=v.value;const y=document.getElementById("advanced-filters");y&&y.classList.contains("hidden")===!1&&window.innerWidth<768&&y.classList.add("hidden"),ve()},i=m=>{const b=m.target.closest("[data-status-filter]");if(!b)return;const f=b.dataset.statusFilter;C.currentFilter=f,document.querySelectorAll("[data-status-filter]").forEach(v=>{v.classList.remove("bg-blue-100","text-blue-800"),v.classList.add("bg-gray-100","text-gray-600")}),b.classList.remove("bg-gray-100","text-gray-600"),b.classList.add("bg-blue-100","text-blue-800"),ua()},d=m=>{const b=document.getElementById("payables-container"),f=document.getElementById("receivables-container"),v=document.getElementById("btn-payables-view"),y=document.getElementById("btn-receivables-view");window.innerWidth>=1024&&C.currentListView===m||(m==="payables"?(b.classList.remove("hidden"),f.classList.add("hidden"),v&&(v.classList.remove("bg-gray-200"),v.classList.add("bg-red-100","border","border-red-500")),y&&(y.classList.remove("bg-green-100","border","border-green-500"),y.classList.add("bg-gray-200"))):(b.classList.add("hidden"),f.classList.remove("hidden"),v&&(v.classList.remove("bg-red-100","border","border-red-500"),v.classList.add("bg-gray-200")),y&&(y.classList.remove("bg-gray-200"),y.classList.add("bg-green-100","border","border-green-500"))),C.currentListView=m)};document.getElementById("applyDateFilterBtn").addEventListener("click",n),document.getElementById("filterNaturezaId").addEventListener("change",()=>{C.filterNaturezaId=document.getElementById("filterNaturezaId").value}),document.getElementById("filterCostCenterId").addEventListener("change",()=>{C.filterCostCenterId=document.getElementById("filterCostCenterId").value}),document.querySelectorAll("[data-status-filter]").forEach(m=>{m.addEventListener("click",i)}),ct=m=>{const b=m.target.closest("button[data-action]");if(!b)return;const{action:f,type:v,id:y}=b.dataset;f==="edit"?_t(v,JSON.parse(b.dataset.item.replace(/&apos;/g,"'"))):f==="delete"?tl(v,y):f==="mark-as-paid"?al(v,y):f==="manage-natures"?Ka("nature"):f==="manage-cost-centers"?Ka("cost-center"):f==="open-cash-flow-modal"?to():f==="toggle-filters"?document.getElementById("advanced-filters")?.classList.toggle("hidden"):f==="open-indicators-modal"?Zi():f==="open-settings-modal"?Ki():f==="toggle-list-view"&&d(b.dataset.list)},ut=m=>{const b=m.target.closest('button[data-action^="delete-"]');if(b){const f=b.dataset.action.split("-")[1];l(f,b.dataset.id)}},document.body.addEventListener("click",ct),document.getElementById("genericModal").addEventListener("click",ut);async function l(m,b){const f=m==="nature",v=f?oi:ri,y=f?Ye:Xe,h=f?"natures":"costCenters",x=document.getElementById("hierarchyList");if(await A("Apagar Item","Tem a certeza? Apagar um item principal também apagará os seus sub-itens."))try{await v(b);const E=await y();C[h]=E,Ho(x,Ca(E),m),await ve()}catch(E){g("Erro",`Não foi possível apagar: ${E.message}`,"error")}}const c=()=>{const m=window.innerWidth<1024,b=document.getElementById("payables-container"),f=document.getElementById("receivables-container"),v=document.getElementById("list-toggle-buttons");b&&f&&(b.classList.remove("hidden"),f.classList.remove("hidden"),m?(b.classList.remove("lg:col-span-1"),f.classList.remove("lg:col-span-1"),v?.classList.remove("hidden"),d(C.currentListView)):(b.classList.add("lg:col-span-1"),f.classList.add("lg:col-span-1"),v?.classList.add("hidden"),b.classList.remove("hidden"),f.classList.remove("hidden")))};c(),window.addEventListener("resize",c);const u=document.querySelector(`[data-status-filter="${C.currentFilter}"]`);u&&(document.querySelectorAll("[data-status-filter]").forEach(m=>{m.classList.remove("bg-blue-100","text-blue-800"),m.classList.add("bg-gray-100","text-gray-600")}),u.classList.remove("bg-gray-100","text-gray-600"),u.classList.add("bg-blue-100","text-blue-800"));try{const m=await vi(),b=document.getElementById("summary-today-payables");b&&(b.textContent=`R$ ${m.totalPayables.toFixed(2)}`);const f=document.getElementById("summary-today-receivables");f&&(f.textContent=`R$ ${m.totalReceivables.toFixed(2)}`)}catch{g("Erro","Não foi possível carregar o resumo do dia.","error")}await ve()}const sl=e=>k("/api/commissions/calculate",{method:"POST",body:JSON.stringify(e)}),rl=e=>k("/api/commissions/save",{method:"POST",body:JSON.stringify(e)}),nl=(e,t)=>{const a=new URLSearchParams({startDate:e,endDate:t}).toString();return k(`/api/commissions/stats?${a}`)},il=(e={})=>{Object.keys(e).forEach(o=>(e[o]===void 0||e[o]===null||e[o]==="")&&delete e[o]);const t=new URLSearchParams(e).toString(),a=`/api/commissions/history${t?"?"+t:""}`;return k(a)},ll=e=>k(`/api/commissions/report/${e}`,{method:"DELETE"}),Et=new Date,so=new Date(Et.getFullYear(),Et.getMonth(),1),L={currentTab:"dashboard",professionals:[],calculationResult:null,historyData:[],periodString:"",dashStartDate:so.toISOString().split("T")[0],dashEndDate:Et.toISOString().split("T")[0],dashStats:{revenue:0,commissions:0},histStartDate:so.toISOString().split("T")[0],histEndDate:Et.toISOString().split("T")[0],histProfessionalId:"all"};let pt=null;const Ne=document.getElementById("content");async function dl(){try{L.professionals=await _(p.establishmentId)}catch(e){console.error("Erro profissionais",e)}pl(),cl(),jt(),Ct("dashboard")}function cl(){pt&&Ne.removeEventListener("click",pt),pt=e=>{const t=e.target.closest("button");if(!t)return;const a=t.dataset.action,o=t.dataset.id,r=t.dataset.idx;switch(a){case"tab-nav":Ct(t.dataset.tab);break;case"toggle-all-profs":ul();break;case"back-to-filters":L.calculationResult=null,It(document.getElementById("commissions-content"));break;case"view-preview-items":vl(r);break;case"save-final-report":hl();break;case"start-new-calc":Ct("calculator");break;case"print-receipt":xl(o);break;case"delete-report":yl(o);break;case"filter-dashboard":jt();break;case"filter-history":Ia();break}},Ne.addEventListener("click",pt),Ne.oninput=e=>{if(e.target.classList.contains("input-debit")||e.target.classList.contains("input-credit")){const t=e.target.dataset.idx;bl(t)}},Ne.onsubmit=e=>{e.target.id==="calc-form"&&(e.preventDefault(),ml())}}async function jt(){const e=document.getElementById("dash-start"),t=document.getElementById("dash-end");e&&(L.dashStartDate=e.value),t&&(L.dashEndDate=t.value);const a=document.getElementById("dashboard-stats-container");a&&(a.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>');try{const o=await nl(L.dashStartDate,L.dashEndDate);L.dashStats={revenue:o.totalRevenue||0,commissions:o.totalCommissionsPaid||0},L.currentTab==="dashboard"&&Oo(document.getElementById("commissions-content"))}catch(o){console.error(o),a&&(a.innerHTML='<p class="text-red-500 text-center">Erro ao carregar dados.</p>')}}async function Ia(){const e=document.getElementById("hist-start"),t=document.getElementById("hist-end"),a=document.getElementById("hist-prof");e&&(L.histStartDate=e.value),t&&(L.histEndDate=t.value),a&&(L.histProfessionalId=a.value);const o=document.getElementById("history-list-container");if(o){o.innerHTML='<div class="flex justify-center py-10"><div class="loader"></div></div>';try{const r=await il({startDate:L.histStartDate,endDate:L.histEndDate,professionalId:L.histProfessionalId});L.historyData=r,zo(o,r)}catch{o.innerHTML='<p class="text-red-500 text-center py-4">Erro ao buscar registros.</p>'}}}function ul(){const e=document.querySelectorAll(".prof-checkbox"),t=Array.from(e).every(a=>a.checked);e.forEach(a=>a.checked=!t)}async function ml(){const e=Array.from(document.querySelectorAll(".prof-checkbox:checked")).map(s=>s.value);if(e.length===0)return g("Atenção","Selecione profissionais","error");const t={professionalIds:e,startDate:document.getElementById("start-date").value,endDate:document.getElementById("end-date").value,calculationTypes:{services:document.getElementById("type-services").checked,products:document.getElementById("type-products").checked,packages:document.getElementById("type-packages").checked}},a=new Date(t.startDate+"T00:00:00").toLocaleDateString("pt-BR"),o=new Date(t.endDate+"T00:00:00").toLocaleDateString("pt-BR");L.periodString=`${a} a ${o}`;const r=document.getElementById("commissions-content");r.innerHTML='<div class="flex flex-col items-center justify-center py-20"><div class="loader mb-4"></div><p class="text-gray-500 animate-pulse">Calculando...</p></div>';try{const s=await sl(t);L.calculationResult=s.map(n=>({...n,extraDebit:0,extraCredit:0,finalValue:n.summary.totalCommission,notes:""})),It(r)}catch(s){g("Erro",s.message,"error"),L.calculationResult=null,It(r)}}function pl(){Ne.innerHTML=`
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
    `}function Ct(e){L.currentTab=e,["dashboard","calculator","history"].forEach(a=>{const o=document.getElementById(`tab-${a}`);a===e?o.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold bg-white text-indigo-600 shadow-sm border border-gray-100":o.className="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"});const t=document.getElementById("commissions-content");e==="dashboard"&&Oo(t),e==="calculator"&&It(t),e==="history"&&gl(t)}function Oo(e){const{revenue:t,commissions:a}=L.dashStats,o=t>0?(a/t*100).toFixed(1):0;e.innerHTML=`
        <div class="space-y-6 animate-fade-in">
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-end">
                <div class="flex-1 w-full">
                    <label class="text-xs font-bold text-gray-500 uppercase">Data Inicial</label>
                    <input type="date" id="dash-start" value="${L.dashStartDate}" class="w-full mt-1 rounded-lg border-gray-300">
                </div>
                <div class="flex-1 w-full">
                    <label class="text-xs font-bold text-gray-500 uppercase">Data Final</label>
                    <input type="date" id="dash-end" value="${L.dashEndDate}" class="w-full mt-1 rounded-lg border-gray-300">
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
                                    ${o}%
                                </span>
                            </div>
                        </div>
                        <div class="overflow-hidden h-4 mb-4 text-xs flex rounded bg-indigo-100">
                            <div style="width:${Math.min(o,100)}%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"></div>
                        </div>
                        <p class="text-sm text-gray-500">
                            De cada R$ 100,00 vendidos, <strong>R$ ${o}</strong> foram pagos em comissões neste período.
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
    `}function gl(e){const t=L.professionals.map(a=>`<option value="${a.id}" ${L.histProfessionalId===a.id?"selected":""}>${a.name}</option>`).join("");e.innerHTML=`
        <div class="space-y-6">
            <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    Pesquisar Pagamentos
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">De (Data Pagto)</label>
                        <input type="date" id="hist-start" value="${L.histStartDate}" class="w-full mt-1 rounded-lg border-gray-300">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">Até</label>
                        <input type="date" id="hist-end" value="${L.histEndDate}" class="w-full mt-1 rounded-lg border-gray-300">
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
    `,L.historyData.length>0?zo(document.getElementById("history-list-container"),L.historyData):Ia()}function zo(e,t){if(t.length===0){e.innerHTML=`
            <div class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum registro encontrado</h3>
                <p class="mt-1 text-sm text-gray-500">Tente ajustar os filtros de data.</p>
            </div>`;return}const a=t.map(r=>`
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-3 animate-fade-in">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <p class="text-xs text-gray-400 uppercase">Pago em: ${new Date(r.createdAt).toLocaleDateString("pt-BR")}</p>
                    <h4 class="font-bold text-gray-800 text-lg">${r.professionalName}</h4>
                </div>
                <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Pago</span>
            </div>
            <div class="flex justify-between items-end mb-4">
                <p class="text-sm text-gray-500">Ref: ${r.period}</p>
                <p class="text-xl font-bold text-gray-900">R$ ${(r.summary.finalValue||r.summary.totalCommission).toFixed(2)}</p>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <button data-action="print-receipt" data-id="${r.id}" class="flex items-center justify-center py-2 bg-indigo-50 text-indigo-600 rounded-lg font-bold text-sm hover:bg-indigo-100">
                    📄 Recibo
                </button>
                <button data-action="delete-report" data-id="${r.id}" class="flex items-center justify-center py-2 bg-red-50 text-red-600 rounded-lg font-bold text-sm hover:bg-red-100">
                    🗑️ Excluir
                </button>
            </div>
        </div>
    `).join(""),o=t.map(r=>`
        <tr class="hover:bg-gray-50 border-b border-gray-100">
            <td class="px-6 py-4 text-sm text-gray-500">${new Date(r.createdAt).toLocaleDateString("pt-BR")}</td>
            <td class="px-6 py-4 font-bold text-gray-900">${r.professionalName}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${r.period}</td>
            <td class="px-6 py-4 text-right font-bold text-green-600">R$ ${(r.summary.finalValue||r.summary.totalCommission).toFixed(2)}</td>
            <td class="px-6 py-4 text-right space-x-2">
                <button data-action="print-receipt" data-id="${r.id}" class="text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded">Recibo</button>
                <button data-action="delete-report" data-id="${r.id}" class="text-red-600 hover:bg-red-50 px-3 py-1 rounded">Excluir</button>
            </td>
        </tr>
    `).join("");e.innerHTML=`
        <div class="block md:hidden pb-20">${a}</div>
        <div class="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table class="min-w-full text-left">
                <thead class="bg-gray-50 text-gray-500 uppercase text-xs">
                    <tr><th class="px-6 py-3">Data Pagto</th><th class="px-6 py-3">Profissional</th><th class="px-6 py-3">Ref. Período</th><th class="px-6 py-3 text-right">Valor Pago</th><th class="px-6 py-3 text-right">Ações</th></tr>
                </thead>
                <tbody>${o}</tbody>
            </table>
        </div>
    `}function bl(e){const t=document.querySelectorAll(`.input-debit[data-idx="${e}"]`),a=document.querySelectorAll(`.input-credit[data-idx="${e}"]`);let o=0,r=0;if(t.forEach(s=>{s.value&&(o=parseFloat(s.value))}),a.forEach(s=>{s.value&&(r=parseFloat(s.value))}),L.calculationResult&&L.calculationResult[e]){const s=L.calculationResult[e];s.extraDebit=o,s.extraCredit=r,s.finalValue=s.summary.totalCommission-o+r,t.forEach(i=>{i!==document.activeElement&&(i.value=o||"")}),a.forEach(i=>{i!==document.activeElement&&(i.value=r||"")}),document.querySelectorAll(`.final-value-display[data-idx="${e}"]`).forEach(i=>i.innerText=`R$ ${s.finalValue.toFixed(2)}`),fl()}}function fl(){const e=L.calculationResult.reduce((a,o)=>a+o.finalValue,0);document.querySelectorAll("#grand-total-display").forEach(a=>a.innerText=`R$ ${e.toFixed(2)}`)}function vl(e){const t=L.calculationResult[e];if(!t)return;const a=t.items.map(o=>`
        <div class="flex justify-between items-center p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50">
            <div class="flex-1">
                <p class="text-sm font-bold text-gray-800">${o.item}</p>
                <p class="text-xs text-gray-500">${new Date(o.date).toLocaleDateString("pt-BR")} • ${o.client}</p>
            </div>
            <div class="text-right">
                <p class="text-sm font-bold text-green-600">R$ ${o.commissionValue.toFixed(2)}</p>
                <p class="text-xs text-gray-400">${o.commissionRate}% de R$ ${o.value.toFixed(2)}</p>
            </div>
        </div>
    `).join("");N({title:"Detalhes da Comissão",contentHTML:`<div class="bg-gray-50 p-3 rounded-lg mb-4 flex justify-between items-center"><div><p class="text-xs text-gray-500">Profissional</p><p class="font-bold text-gray-800">${t.professionalName}</p></div><div class="text-right"><p class="text-xs text-gray-500">Total Itens</p><p class="font-bold text-gray-800">${t.items.length}</p></div></div><div class="border rounded-lg overflow-hidden max-h-[60vh] overflow-y-auto">${a}</div>`,maxWidth:"max-w-md"})}async function hl(){const e=L.calculationResult.length;if(await A("Confirmar",`Gerar ${e} relatórios?`))try{const a=L.calculationResult.map(o=>rl({professionalId:o.professionalId,professionalName:o.professionalName,period:L.periodString,reportData:{...o,summary:{...o.summary,finalValue:o.finalValue,extraDebit:o.extraDebit||0,extraCredit:o.extraCredit||0,notes:o.notes||""}}}));await Promise.all(a),g("Sucesso","Pagamentos registrados!","success"),L.calculationResult=null,jt(),Ct("history")}catch(a){g("Erro",a.message,"error")}}function xl(e){const t=L.historyData.find(a=>a.id===e);t&&wl(t)}async function yl(e){if(await A("Excluir","Deseja remover este registro?"))try{await ll(e),g("Sucesso","Registro removido.","success"),Ia(),jt()}catch(a){g("Erro",a.message,"error")}}function wl(e){const{jsPDF:t}=window.jspdf;if(!t)return g("Erro","PDF lib não carregada.","error");const a=new t,o=a.internal.pageSize.getWidth()/2;a.setFontSize(18),a.setFont(void 0,"bold"),a.text("RECIBO DE PAGAMENTO DE COMISSÃO",o,20,{align:"center"}),a.setFontSize(12),a.setFont(void 0,"normal"),a.text(`Profissional: ${e.professionalName}`,15,40),a.text(`Período: ${e.period}`,15,48);const r=[["Comissão Bruta",`R$ ${e.summary.totalCommission.toFixed(2)}`]];e.summary.extraCredit>0&&r.push(["(+) Bônus",`R$ ${e.summary.extraCredit.toFixed(2)}`]),e.summary.extraDebit>0&&r.push(["(-) Descontos",`R$ ${e.summary.extraDebit.toFixed(2)}`]),a.autoTable({startY:60,head:[["Descrição","Valor"]],body:r,theme:"grid"});const s=a.lastAutoTable.finalY+10;a.setFontSize(14),a.setFont(void 0,"bold"),a.text(`Total Líquido: R$ ${(e.summary.finalValue||e.summary.totalCommission).toFixed(2)}`,190,s,{align:"right"}),a.save(`Recibo_${e.professionalName}.pdf`)}function It(e){if(L.calculationResult){const t=L.calculationResult,a=t.reduce((s,n)=>s+n.finalValue,0),o=t.map((s,n)=>`
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
                <div class="flex justify-between items-start mb-3 border-b border-gray-100 pb-2">
                    <div><h4 class="font-bold text-gray-900 text-lg">${s.professionalName}</h4><p class="text-xs text-gray-500">${s.summary.totalItems} itens</p></div>
                    <div class="text-right"><p class="text-xs text-gray-500">Bruto</p><p class="font-bold text-gray-700">R$ ${s.summary.totalCommission.toFixed(2)}</p></div>
                </div>
                <div class="grid grid-cols-2 gap-3 mb-3">
                    <div><label class="text-xs font-bold text-red-500 uppercase">Desc.</label><input type="number" step="0.01" data-idx="${n}" class="input-debit w-full mt-1 p-2 border border-red-200 rounded-lg bg-red-50 font-bold text-red-700" value="${s.extraDebit||""}"></div>
                    <div><label class="text-xs font-bold text-green-500 uppercase">Bônus</label><input type="number" step="0.01" data-idx="${n}" class="input-credit w-full mt-1 p-2 border border-green-200 rounded-lg bg-green-50 font-bold text-green-700" value="${s.extraCredit||""}"></div>
                </div>
                <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg"><span class="text-sm font-medium">Líquido</span><span class="text-xl font-bold text-indigo-700 final-value-display" data-idx="${n}">R$ ${s.finalValue.toFixed(2)}</span></div>
                <button data-action="view-preview-items" data-idx="${n}" class="w-full mt-3 py-2 text-indigo-600 font-medium text-sm border border-indigo-100 rounded-lg">Ver Detalhes</button>
            </div>`).join(""),r=t.map((s,n)=>`
            <tr class="hover:bg-gray-50"><td class="px-6 py-4 font-bold text-gray-900">${s.professionalName}</td><td class="px-6 py-4 text-right">R$ ${s.summary.totalCommission.toFixed(2)}</td>
            <td class="px-6 py-4 text-right"><input type="number" step="0.01" data-idx="${n}" class="input-debit w-24 text-right border-gray-300 rounded bg-red-50 text-red-700" value="${s.extraDebit||""}"></td>
            <td class="px-6 py-4 text-right"><input type="number" step="0.01" data-idx="${n}" class="input-credit w-24 text-right border-gray-300 rounded bg-green-50 text-green-700" value="${s.extraCredit||""}"></td>
            <td class="px-6 py-4 text-right font-bold text-indigo-700 final-value-display" data-idx="${n}">R$ ${s.finalValue.toFixed(2)}</td>
            <td class="px-6 py-4 text-center"><button data-action="view-preview-items" data-idx="${n}" class="text-indigo-600 hover:underline text-sm">Ver Itens</button></td></tr>`).join("");e.innerHTML=`
            <div class="space-y-4 animate-fade-in pb-20">
                <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 sticky top-0 z-10 flex justify-between items-center">
                    <div><button data-action="back-to-filters" class="text-sm text-gray-500 hover:text-indigo-600">← Voltar</button><h2 class="text-lg md:text-2xl font-bold text-gray-800">Prévia</h2></div>
                    <div class="text-right"><p class="text-xs uppercase font-bold text-gray-500">Total a Pagar</p><p id="grand-total-display" class="text-2xl md:text-3xl font-extrabold text-green-600">R$ ${a.toFixed(2)}</p></div>
                </div>
                <div class="block md:hidden space-y-4">${o}</div>
                <div class="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-bold uppercase">Profissional</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">Bruto</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">(-) Desc.</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">(+) Bônus</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">Líquido</th><th class="px-6 py-3 text-center text-xs font-bold uppercase">Ações</th></tr></thead><tbody>${r}</tbody></table></div>
                <div class="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-200 shadow-lg md:static md:bg-transparent md:border-0 md:shadow-none z-30 flex justify-end gap-3">
                    <button data-action="back-to-filters" class="hidden md:block px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-bold">Cancelar</button>
                    <button data-action="save-final-report" class="w-full md:w-auto px-6 py-4 md:py-3 bg-green-600 text-white rounded-xl font-bold shadow-md hover:bg-green-700 transition">Finalizar Apuração</button>
                </div>
            </div>`}else{const t=new Date().toISOString().split("T")[0],a=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0],o=L.professionals.map(r=>`
            <label class="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm active:bg-indigo-50 transition cursor-pointer">
                <input type="checkbox" value="${r.id}" class="prof-checkbox w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500">
                <span class="ml-3 font-medium text-gray-700">${r.name}</span>
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
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">${o}</div>
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
            </form>`}}const Wt=document.getElementById("content");let he={allPackages:[],catalogForModal:{services:[],products:[]}},gt=null,$e=null;function kl(e=6){let t="";for(let a=0;a<e;a++)t+=`
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
        `;return t}function $l(){const e=document.getElementById("packagesListContainer");if(e){if(he.allPackages.length===0){e.innerHTML=`
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
            </div>`;return}e.innerHTML=he.allPackages.map(t=>{const a=t.status==="active",o=JSON.stringify(t).replace(/'/g,"&apos;"),r=t.price||0,s=t.originalPrice||0;t.commissionRate;const n=s>r?s-r:0,i=s>0?(s-r)/s*100:0;return`
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col cursor-pointer"
                 data-action="edit-package" data-package='${o}'>
                
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
                            <p class="text-2xl font-extrabold text-indigo-600">R$ ${r.toFixed(2)}</p>
                            ${n>0?`<p class="text-xs text-gray-500 line-through">De R$ ${s.toFixed(2)}</p>
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
        `}).join("")}}function ro(){const e=document.getElementById("genericModal");e.style.display="none",$e&&e.removeEventListener("click",$e)}async function no(e=null){const t=document.getElementById("genericModal"),a=!!e,o=e?JSON.parse(JSON.stringify(e.items||[])):[],r=`
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
    `;t.innerHTML=r,t.style.display="flex";const s=t.querySelector("#package-items-list"),n=(d,l)=>{const c=l.querySelector("#originalPrice"),u=d.reduce((m,b)=>m+b.price*b.quantity,0);c&&(c.textContent=`R$ ${u.toFixed(2)}`)},i=d=>{d.length===0?s.innerHTML='<p class="text-center text-gray-500 p-4">Nenhum item adicionado.</p>':s.innerHTML=d.map((l,c)=>{const u=l.type==="service",m=u?"Serviço":"Produto",b=u?"bg-indigo-100 text-indigo-800":"bg-green-100 text-green-800";return`
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
            `}).join(""),n(d,t)};i(o),s.addEventListener("change",d=>{if(d.target.classList.contains("quantity-input")){const l=parseInt(d.target.dataset.index,10),c=parseInt(d.target.value,10);c>0&&o[l]&&(o[l].quantity=c,i(o))}}),s.addEventListener("click",d=>{if(d.target.classList.contains("remove-item-btn")){const l=parseInt(d.target.dataset.index,10);o.splice(l,1),i(o)}}),t.querySelector("#add-item-to-package-btn").onclick=()=>Sl(d=>{const l=o.find(c=>c.id===d.id&&c.type===d.type);l?l.quantity++:o.push({...d,quantity:1}),i(o)}),$e&&t.removeEventListener("click",$e),$e=async d=>{const l=d.target.closest("button[data-action]");if(!l)return;const c=l.dataset.action;if(d.stopPropagation(),c==="close-modal"&&ro(),c==="save-package"){const u=l,m={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:o,originalPrice:o.reduce((b,f)=>b+f.price*f.quantity,0),price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null};if(!m.name||!m.price){g("Erro","Nome do Pacote e Preço Final são obrigatórios.","error");return}if(m.items.length===0){g("Erro","Adicione pelo menos um item ao pacote.","error");return}u.disabled=!0,u.textContent="A salvar...";try{a?await Cr(m.id,m):(delete m.id,await Er(m)),g("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),ro(),await La()}catch(b){g("Erro",`Não foi possível salvar o pacote: ${b.message}`,"error"),u.disabled=!1,u.textContent="Salvar Pacote"}}},t.addEventListener("click",$e)}function Sl(e){let t="";const a=document.createElement("div");a.id="item-selection-modal",a.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[110]";const o={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'},r=d=>{const l=t.toLowerCase(),c=he.catalogForModal.services.filter(f=>f.name.toLowerCase().includes(l)),u=he.catalogForModal.products.filter(f=>f.name.toLowerCase().includes(l)),m=c.map(f=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${o.service}</div>
                <span class="flex-grow text-left min-w-0 truncate">${f.name}</span>
                <span class="font-semibold flex-shrink-0">R$ ${f.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum serviço encontrado.</p>',b=u.map(f=>`
            <button data-action="select-item" data-item-type="product" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${o.product}</div>
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
    `,document.body.appendChild(a);const s=a.querySelector("#item-selection-list"),n=a.querySelector("#item-search-input"),i=()=>{a.remove()};r(s),n.addEventListener("input",()=>{t=n.value,r(s)}),a.addEventListener("click",d=>{const l=d.target.closest('[data-action="select-item"]'),c=d.target.closest('[data-action="close-selection-modal"]');if(l){const{itemType:u,itemId:m}=l.dataset,f=(he.catalogForModal[u+"s"]||[]).find(v=>v.id===m);f&&(e({...f,type:u}),i())}else(c||d.target===a)&&i()})}async function La(){Wt.innerHTML=`
        <section id="packages-page" class="p-4 sm:p-6">
             <div class="sticky top-0 z-10 bg-gray-100 sm:bg-transparent pt-3 pb-4 mb-6 -mx-4 -mt-4 sm:mx-0 sm:mt-0 sm:bg-transparent sm:pt-0 sm:pb-0 sm:static">
                <div class="flex justify-between items-center px-4 sm:px-0">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                </div>
            </div>
            
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20">
                ${kl()}
            </div>
            
            <button data-action="new-package" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>
    `,gt&&Wt.removeEventListener("click",gt),gt=e=>{if(e.target.closest('[data-action-stop-propagation="true"]')){e.stopPropagation();const o=e.target.closest('[data-action="delete-package"]');if(o){const r=o.dataset.id;A("Excluir Pacote","Tem a certeza que deseja excluir este pacote? Esta ação é irreversível.").then(async s=>{if(s)try{await Ir(r),g("Sucesso!","Pacote excluído.","success"),await La()}catch(n){g("Erro",`Não foi possível excluir: ${n.message}`,"error")}})}return}const t=e.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!t)return;const a=t.dataset.action;if(a==="new-package")no(null);else if(a==="edit-package"){const o=JSON.parse(t.dataset.package);no(o)}},Wt.addEventListener("click",gt);try{const[e,t,a]=await Promise.all([$o(p.establishmentId),De(p.establishmentId),At(p.establishmentId)]);he.allPackages=e,he.catalogForModal={services:t.filter(o=>o.active),products:a},$l()}catch{document.getElementById("packagesListContainer").innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar pacotes.</p>'}}const El=document.getElementById("content");let Cl=null;async function Il(){El.innerHTML=`
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
                        <p class="text-md text-gray-600">${J.currentUser.email||"E-mail não disponível"}</p>
                    </div>
                </div>
            </div>

            <div class="md:col-span-2">
                 <div id="professional-agenda-block" class="p-4 md:p-6 bg-white rounded-lg shadow-md space-y-6">
                    <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
                </div>
            </div>
        </div>
    `,await Ll()}async function Ll(){const e=document.getElementById("professional-agenda-block");e.innerHTML="";try{const t=p.userProfessionalId;if(t){const a=await xs(t);Cl=a,a.photo&&(document.getElementById("user-profile-avatar").src=a.photo),e.innerHTML=`
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
            `,Bl(a.id),document.getElementById("my-blocks-filter").addEventListener("change",r=>Lt(a.id,r.target.value)),Lt(a.id,"future")}else e.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(t){console.error("Erro ao carregar seção de profissional:",t),e.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${t.message}</p>
            </div>
        `}}function Bl(e){const t=document.getElementById("block-schedule-form");t.addEventListener("submit",async a=>{a.preventDefault();const o=t.querySelector("#blockDate").value,r=t.querySelector("#blockStartTime").value,s=t.querySelector("#blockEndTime").value,n=t.querySelector("#blockReason").value;if(!o||!r||!s){g("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(r>=s){g("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const i=new Date(`${o}T${r}:00`),d=new Date(`${o}T${s}:00`),l=t.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="A bloquear...";try{await Mt({establishmentId:p.establishmentId,professionalId:e,reason:n||"Bloqueado (Meu Perfil)",startTime:i.toISOString(),endTime:d.toISOString()}),g("Sucesso","Agenda bloqueada com sucesso!","success"),t.reset();const c=document.getElementById("my-blocks-filter").value;Lt(e,c)}catch(c){console.error("Erro ao bloquear agenda:",c),g("Erro",`Não foi possível bloquear a agenda: ${c.message}`,"error")}finally{l.disabled=!1,l.textContent="Bloquear Agenda"}})}async function Lt(e,t="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const o=new Date;let r,s;t==="history"?(s=new Date,r=new Date,r.setFullYear(r.getFullYear()-1)):(r=new Date,s=new Date,s.setFullYear(s.getFullYear()+1));let i=(await Dt(p.establishmentId,r.toISOString(),s.toISOString(),e)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));t==="history"?i=i.filter(d=>d.endTime<o).sort((d,l)=>l.startTime-d.startTime):i=i.filter(d=>d.endTime>=o).sort((d,l)=>d.startTime-l.startTime),i.length>0?(a.innerHTML=i.map(d=>{const l=d.startTime.toLocaleDateString("pt-BR"),c=`${d.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${d.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`;return`
                    <div class="flex items-center justify-between p-3 ${d.endTime<new Date?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${l} das ${c}</p>
                            <p class="text-sm text-gray-600">${d.reason||"Sem motivo"}</p>
                        </div>
                        <button data-block-id="${d.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(d=>{d.addEventListener("click",async l=>{const c=l.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await fa(c),g("Sucesso","Bloqueio removido.","success"),Lt(e,t)}catch(u){console.error("Erro ao remover bloqueio:",u),g("Erro",`Não foi possível remover o bloqueio: ${u.message}`,"error")}})})):a.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${t==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(o){console.error("Erro ao carregar bloqueios:",o),a.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${o.message}</p>`}}const bt=document.getElementById("loadingScreen"),Gt=document.getElementById("dashboardContent"),Yt=document.getElementById("content"),io=document.getElementById("notificationBell"),Xt=document.getElementById("notificationBadge"),ft=document.getElementById("notificationPanel"),lo=document.getElementById("notificationList"),Qt=document.getElementById("profileMenuButton"),X=document.getElementById("profileDropdown"),Tl=document.getElementById("profileName"),Dl=document.getElementById("profileEmail"),Ml=document.getElementById("logoutButton"),Pl=document.getElementById("cancellationHistoryBtn"),co=document.getElementById("myProfileLink"),uo={indigo:{main:"#4f46e5",hover:"#4338ca",light:"#e0e7ff",text:"#ffffff"},blue:{main:"#2563eb",hover:"#1d4ed8",light:"#dbeafe",text:"#ffffff"},sky:{main:"#0284c7",hover:"#0369a1",light:"#e0f2fe",text:"#ffffff"},teal:{main:"#0d9488",hover:"#0f766e",light:"#ccfbf1",text:"#ffffff"},emerald:{main:"#059669",hover:"#047857",light:"#d1fae5",text:"#ffffff"},green:{main:"#16a34a",hover:"#15803d",light:"#dcfce7",text:"#ffffff"},lime:{main:"#65a30d",hover:"#4d7c0f",light:"#ecfccb",text:"#ffffff"},amber:{main:"#d97706",hover:"#b45309",light:"#fef3c7",text:"#1f2937"},orange:{main:"#ea580c",hover:"#c2410c",light:"#ffedd5",text:"#ffffff"},red:{main:"#dc2626",hover:"#b91c1c",light:"#fee2e2",text:"#ffffff"},rose:{main:"#e11d48",hover:"#be123c",light:"#ffe4e6",text:"#ffffff"},pink:{main:"#db2777",hover:"#be185d",light:"#fce7f3",text:"#ffffff"},fuchsia:{main:"#c026d3",hover:"#a21caf",light:"#fae8ff",text:"#ffffff"},purple:{main:"#7c3aed",hover:"#6d28d9",light:"#ede9fe",text:"#ffffff"},violet:{main:"#8b5cf6",hover:"#7c3aed",light:"#ddd6fe",text:"#ffffff"},gray:{main:"#4b5563",hover:"#374151",light:"#f3f4f6",text:"#ffffff"},black:{main:"#111827",hover:"#000000",light:"#e5e7eb",text:"#ffffff"}};let Ue=null,Je=[];const Al={"agenda-section":wo,"comandas-section":xa,"relatorios-section":Vr,"servicos-section":nn,"produtos-section":wn,"suppliers-section":Dn,"profissionais-section":$t,"clientes-section":Rt,"estabelecimento-section":jo,"ausencias-section":Pi,"users-section":St,"sales-report-section":Yi,"financial-section":ol,"commissions-section":dl,"packages-section":La,"my-profile-section":Il};function ql(e){const t=uo[e]||uo.indigo,o=(s=>{const n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(s);return n?`${parseInt(n[1],16)}, ${parseInt(n[2],16)}, ${parseInt(n[3],16)}`:"79, 70, 229"})(t.main);document.body.style.setProperty("--theme-main",t.main);const r=document.getElementById("dynamic-theme-styles");r.innerHTML=`
        :root {
            --theme-color-main: ${t.main};
            --theme-color-hover: ${t.hover};
            --theme-color-light: ${t.light};
            --theme-rgb: ${o};
        }

        /* 1. Sidebar Links Ativos */
        .sidebar-link.active { 
            background-color: var(--theme-color-main) !important; 
            color: ${t.text} !important; 
        }
        .sidebar-link:not(.active):hover { 
            background-color: rgba(var(--theme-rgb), 0.1) !important;
            color: var(--theme-color-main) !important;
        }

        /* 2. Sobrescrevendo Botões e Textos 'Indigo' Padrão do Tailwind */
        .bg-indigo-600 { background-color: var(--theme-color-main) !important; }
        .hover\\:bg-indigo-700:hover { background-color: var(--theme-color-hover) !important; }
        .hover\\:bg-indigo-50:hover { background-color: rgba(var(--theme-rgb), 0.1) !important; }
        
        .text-indigo-600 { color: var(--theme-color-main) !important; }
        .hover\\:text-indigo-800:hover { color: var(--theme-color-hover) !important; }
        .hover\\:text-indigo-600:hover { color: var(--theme-color-main) !important; }

        .border-indigo-600 { border-color: var(--theme-color-main) !important; }
        .focus\\:ring-indigo-500:focus { --tw-ring-color: rgba(var(--theme-rgb), 0.5) !important; }
        
        /* 3. Elementos Específicos do Sistema */
        .loading-bar-fill { background-color: var(--theme-color-main) !important; }
        .time-slot-card.selected { background-color: var(--theme-color-main) !important; border-color: var(--theme-color-main) !important; }
        
        /* Checkboxes e Toggles */
        input:checked + .toggle-bg { background-color: var(--theme-color-main) !important; }
        
        /* Badges e Tags */
        .bg-indigo-100 { background-color: var(--theme-color-light) !important; }
        .text-indigo-800 { color: var(--theme-color-hover) !important; }
    `}function ma(){const e=Je.filter(t=>!t.read).length;if(e>0?(Xt.textContent=e,Xt.classList.remove("hidden")):Xt.classList.add("hidden"),Je.length===0){lo.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}lo.innerHTML=Je.map(t=>`
    <div class="notification-item ${t.read?"":"unread"}">
    <p class="font-semibold">${t.title}</p>
    <p class="text-sm text-gray-600">${t.message}</p>
    <p class="text-xs text-gray-400 mt-1">${t.time}</p>
    </div>
    `).join("")}function Nl(e){Ue&&Ue();const t=Te(Q,"establishments",e,"notifications"),a=po(t,Qo("timestamp",">=",new Date),go("timestamp","desc"));Ue=Zo(a,o=>{o.docChanges().forEach(r=>{if(r.type==="added"){const s=r.doc.data();Je.unshift({title:s.title,message:s.message,time:s.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),g(s.title,s.message,"info",!0),ma();const n=document.querySelector(".sidebar-link.active");n&&n.dataset.target==="agenda-section"&&(s.type==="cancellation"||s.type==="new_appointment")&&(console.log("Atualizando agenda em tempo real..."),wo())}})},o=>{console.error("Erro no listener de notificações em tempo real:",o),g("Erro de Conexão","Não foi possível receber atualizações em tempo real. Verifique as regras de segurança do Firestore.","error")})}function Y(e,t={}){const a=e.replace("-section","");if(e!=="my-profile-section"){const r=p.enabledModules?.[a]!==!1,s=p.userPermissions===null||p.userPermissions[e]?.view===!0;if(!r||!s){Yt.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>',document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active"));return}}const o=Al[e];o?(document.querySelectorAll(".sidebar-link").forEach(r=>{r.classList.toggle("active",r.getAttribute("data-target")===e)}),e==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(r=>r.classList.remove("active")),Yt.innerHTML="",o(t)):(Yt.innerHTML=`<div class="p-8 text-center"><h2 class="text-2xl font-bold">Página em Construção</h2><p class="text-gray-600">O módulo para "${e}" ainda não foi implementado.</p></div>`,console.warn(`Nenhum carregador de página definido para: ${e}`))}async function Fl(e){const t=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),o=document.getElementById("kpi-today-appointments"),r=document.getElementById("kpi-today-revenue"),s=e===null||e["agenda-section"]?.view===!0,n=e===null||e["financial-section"]?.view===!0;if(s&&t&&t.classList.remove("hidden"),n&&a&&a.classList.remove("hidden"),!(!s&&!n))try{const i=await Ns();s&&o&&(o.textContent=i.todayAppointments.toString()),n&&r&&(r.textContent=`R$ ${i.todayRevenue.toFixed(2).replace(".",",")}`)}catch(i){console.error("Erro ao carregar KPIs do cabeçalho:",i),s&&o&&(o.textContent="Erro"),n&&r&&(r.textContent="Erro")}}async function Rl(e){try{_e.getPlatform()==="android"&&(await re.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0}),console.log("Canal de notificação Android criado com sucesso."));let t=await re.checkPermissions();if(t.receive==="prompt"&&(t=await re.requestPermissions()),t.receive!=="granted"){console.warn("Permissão de notificação push foi negada pelo utilizador.");return}await re.register(),re.addListener("registration",async a=>{console.log("Push Token gerado:",a.value);try{const o=Bt(Q,"users",e);await bo(o,{fcmToken:a.value}),console.log("Token FCM salvo no perfil do utilizador.")}catch(o){console.error("Erro ao salvar token FCM:",o)}}),re.addListener("registrationError",a=>{console.error("Erro no registo de push notifications:",a)}),re.addListener("pushNotificationReceived",a=>{console.log("Notificação Push recebida:",a),g(a.title,a.body,"info",!0)}),re.addListener("pushNotificationActionPerformed",a=>{console.log("Ação na notificação push:",a),Y("agenda-section")})}catch(t){console.log("Push Notifications não suportado/inicializado:",t)}}function jl(){_e.isNativePlatform()&&(document.body.classList.add("is-app-native"),console.log("Modo App Nativo detectado: Layout ajustado para Safe Areas.")),cs(),io.addEventListener("click",e=>{e.stopPropagation(),ft.classList.toggle("hidden"),ft.classList.contains("hidden")||(Je.forEach(t=>t.read=!0),ma())}),Pl.addEventListener("click",()=>{us()}),Qt.addEventListener("click",e=>{e.stopPropagation(),X.classList.toggle("active"),X.classList.contains("active")?X.classList.remove("hidden"):setTimeout(()=>X.classList.add("hidden"),200)}),co&&co.addEventListener("click",e=>{e.preventDefault(),Y("my-profile-section"),X.classList.remove("active"),X.classList.add("hidden")}),document.addEventListener("click",e=>{!ft.contains(e.target)&&e.target!==io&&ft.classList.add("hidden"),!X.contains(e.target)&&e.target!==Qt&&X.classList.contains("active")&&(X.classList.remove("active"),setTimeout(()=>X.classList.add("hidden"),200))}),Go(J,async e=>{if(e)try{const a=(await e.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="employee")&&a.establishmentId){const o=await Qe(a.establishmentId);p.enabledModules=o.modules,ql(o.themeColor||"indigo");let r=null,s=e.displayName,n=null;if(a.role==="employee"||a.role==="owner"){const l=Bt(Q,"users",e.uid),c=await Xo(l);if(c.exists()){const u=c.data();r=a.role==="employee"?u.permissions||{}:null,s=u.name||s,n=u.professionalId||null}else if(a.role==="employee")throw new Error("Dados de permissão do funcionário não encontrados.")}p.userProfessionalId=n,Rl(e.uid);const i=s||e.email;Ko(a.establishmentId,o.name,r),Qt.textContent=i.charAt(0).toUpperCase(),Tl.textContent=i,Dl.textContent=e.email;const d=()=>{Ue&&Ue(),Ba(J).then(()=>window.location.href="/login.html")};Ml.addEventListener("click",l=>{l.preventDefault(),d()}),bs(Y,r,p.enabledModules),Fl(r),Nl(a.establishmentId),ma(),bt.classList.add("fade-out"),Gt.style.display="flex",setTimeout(()=>{bt.style.display="none"},500),Y("agenda-section")}else throw new Error("Utilizador não tem permissão de 'owner' ou 'employee' ou 'establishmentId'.")}catch(t){console.error("Erro crítico na inicialização do painel:",t),bt.classList.add("fade-out"),setTimeout(()=>{bt.style.display="none"},500),Gt.innerHTML=`
                    <div class="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
                        <h2 class="text-2xl font-bold text-red-600 mb-4">Erro de Acesso</h2>
                        <p class="text-gray-700 text-center mb-6">Não foi possível carregar os seus dados ou permissões. Isto pode acontecer se a sua conta foi desativada ou está configurada incorretamente.</p>
                        <p class="text-sm text-gray-500 mb-6">Detalhe do erro: ${t.message}</p>
                        <button id="errorLogoutButton" class="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700">Sair e Tentar Novamente</button>
                    </div>
                `,Gt.style.display="flex",document.getElementById("errorLogoutButton").addEventListener("click",()=>{Ba(J).then(()=>window.location.href="/login.html")})}else window.location.href="/login.html"})}jl();
