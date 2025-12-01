import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{initializeApp as Ro}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import{getAuth as jo,EmailAuthProvider as Ho,reauthenticateWithCredential as Oo,verifyBeforeUpdateEmail as zo,updatePassword as Vo,updateProfile as Uo,onAuthStateChanged as Jo,signOut as Sa}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{getFirestore as _o,addDoc as io,collection as Ke,getDocs as lo,query as co,orderBy as uo,doc as la,deleteDoc as Wo,getDoc as Go,updateDoc as Yo,where as Xo,onSnapshot as Qo}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";const Zo={apiKey:"AIzaSyAlJaPEW5-yOb-8wkB8EJZhAML2M2yI8Ao",authDomain:"kairos-system.firebaseapp.com",projectId:"kairos-system",storageBucket:"kairos-system.appspot.com",messagingSenderId:"603994960586",appId:"1:603994960586:web:30d2c030eed3c55eccfa33",measurementId:"G-SVHFXKV5EC"},mo=Ro(Zo),J=jo(mo),de=_o(mo),p={establishmentId:null,establishmentName:null,userName:null,userProfessionalId:null,userPermissions:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function Ko(e,t,a){p.establishmentId=e,p.establishmentName=t,p.userPermissions=a}const Wt="https://kairos-service-603994960586.southamerica-east1.run.app";console.log("🚀 API configurada para Produção:",Wt);async function es(){const e=J.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function w(e,t={}){const a=await es();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const s=`${Wt}${e}`;console.log(`AuthenticatedFetch: ${t.method||"GET"} ${s}`);try{const r=await fetch(s,{...t,headers:{...a,...t.headers}});if(!r.ok){const n=(await r.json().catch(()=>({message:r.statusText}))).message||`Erro na API: ${r.status}`;if(n.includes("FAILED_PRECONDITION")&&n.includes("requires an index")){const i=/(https:\/\/[^\s]+)/,d=n.match(i),l=d?d[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${l}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${r.status}) em ${s}:`,n),new Error(n)}return r.json()}catch(r){throw console.error(`Falha de rede ao tentar acessar ${s}:`,r.message),r.message.includes("Failed to fetch")||r.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${Wt}. Verifique sua conexão com a internet.`):r}}const ts=(e,t,a,s=null)=>{let r=`/api/appointments/${e}?startDate=${t}&endDate=${a}`;return s&&(r+=`&professionalId=${s}`),w(r)},as=(e,t,a)=>{const s=`/api/appointments/cancelled/${e}?startDate=${t}&endDate=${a}`;return w(s)},os=({establishmentId:e,professionalId:t,serviceIds:a,date:s})=>{const r=`/api/availability?establishmentId=${e}&professionalId=${t}&serviceIds=${a.join(",")}&date=${s}`;return w(r)},ss=e=>w("/api/appointments",{method:"POST",body:JSON.stringify(e)}),da=(e,t)=>w(`/api/appointments/${e}`,{method:"PUT",body:JSON.stringify(t)}),rs=e=>w(`/api/appointments/${e}`,{method:"DELETE"}),ns=e=>w(`/api/appointments/${e}/reopen`,{method:"POST"}),is=(e,t)=>w(`/api/appointments/${e}/checkout`,{method:"POST",body:JSON.stringify(t)});let F;async function ls(){if(!F)try{F=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function ds(){if(!F){console.warn("AudioContext não inicializado. O som não será tocado.");return}F.state==="suspended"&&F.resume();const e=F.createOscillator(),t=F.createGain();e.connect(t),t.connect(F.destination),e.type="sine",e.frequency.setValueAtTime(800,F.currentTime),t.gain.setValueAtTime(0,F.currentTime),t.gain.linearRampToValueAtTime(.3,F.currentTime+.01),t.gain.exponentialRampToValueAtTime(1e-4,F.currentTime+.2),e.start(F.currentTime),e.stop(F.currentTime+.2)}function g(e,t,a="info",s=!1){const r=document.getElementById("toast-container");if(!r)return;s&&ds();const o=document.createElement("div"),n={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},i={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},d={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};o.className=`toast ${n[a]||n.info}`,o.innerHTML=`
        <div class="toast-icon">${i[a]||i.info}</div>
        <div class="toast-content">
            <p class="font-bold">${e}</p>
            <p class="text-sm">${t}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${d[a]||d.info}"></div>
        </div>
    `,r.appendChild(o),o.querySelector(".toast-close").addEventListener("click",()=>o.remove()),setTimeout(()=>{o.remove()},4e3)}function M(e,t){const a=document.getElementById("genericModal");return new Promise(s=>{a.innerHTML=`
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
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",s(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",s(!1)}})}function N({title:e,contentHTML:t,maxWidth:a="max-w-4xl",showCloseButton:s=!0}){let r=document.getElementById("genericModal");const o=r.cloneNode(!1);r.parentNode.replaceChild(o,r),r=o;const n=()=>{r.style.display="none"},i=u=>{r.querySelector("#genericModalContentBody").innerHTML=u};r.innerHTML=`
        <div class="modal-content ${a} p-0 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
            
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${e}</h2>
                ${s?'<button data-close-modal class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>':""}
            </header>

            <div id="genericModalContentBody" class="flex-1 overflow-y-auto p-5">
                ${t}
            </div>
            
            <footer id="genericModalFooter" class="hidden"></footer>
        </div>
    `;const d=r.querySelector("[data-close-modal]");d&&(d.onclick=n);const l=r.querySelector('[data-action="close-modal"]');return l&&(l.onclick=n),r.addEventListener("click",u=>{u.target.closest(".modal-content")||n()}),r.style.display="flex",{modalElement:r,close:n,setContent:i}}function It(e){const t=document.getElementById(e);t&&(t.style.display="none")}function cs(){document.body.addEventListener("click",()=>{F||ls()},{once:!0}),document.addEventListener("click",e=>{const t=e.target.closest('[data-action="close-modal"]');if(t){const s=t.dataset.target;if(s){const r=document.getElementById(s);r&&(r.style.display="none")}}if(e.target.closest("[data-close-modal]")){const s=document.getElementById("genericModal");s&&(s.style.display="none")}})}async function Ea(){const e=document.getElementById("cancellationListContainer");if(!e)return;e.innerHTML='<div class="loader mx-auto"></div>';const t=document.getElementById("cancelStartDate").value,a=document.getElementById("cancelEndDate").value;try{const s=await as(p.establishmentId,t,a);if(s.length===0){e.innerHTML='<p class="text-center text-gray-500 py-4">Nenhum cancelamento encontrado para este período.</p>';return}e.innerHTML=s.map(r=>`
            <div class="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-bold text-gray-800">${r.clientName}</p>
                        <p class="text-sm text-gray-600">${new Date(r.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})} - ${r.serviceName}</p>
                        <p class="text-xs text-gray-500">com ${r.professionalName}</p>
                    </div>
                </div>
            </div>
        `).join("")}catch(s){e.innerHTML=`<p class="text-red-500 text-center py-4">Erro ao carregar histórico: ${s.message}</p>`}}function us(){const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const s=`
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
    `,{modalElement:r}=N({title:"Histórico de Cancelamentos",contentHTML:s,maxWidth:"max-w-3xl"});r.querySelector("#searchCancellationsBtn").addEventListener("click",Ea),Ea()}const z=document.getElementById("sidebar"),$a=document.getElementById("sidebarToggle"),Fe=document.getElementById("mainContent"),ms=document.querySelectorAll(".sidebar-link"),Ia=document.getElementById("hamburger-menu-btn"),Le=document.getElementById("mobile-overlay");function ft(e){!z||!Fe||(z.classList.toggle("collapsed",e),Fe.classList.toggle("sidebar-collapsed-shift",e))}function ps(){!z||!Le||(z.classList.add("mobile-open"),Le.classList.add("visible"))}function it(){!z||!Le||(z.classList.remove("mobile-open"),Le.classList.remove("visible"))}function gs(){ft(!z.classList.contains("collapsed"))}function bs(e,t,a){if(!z||!Fe)return;Fe.classList.add("main-content-shift"),window.innerWidth>=768?ft(z.classList.contains("collapsed")):(Fe.classList.remove("main-content-shift","sidebar-collapsed-shift"),it()),$a&&$a.addEventListener("click",r=>{r.stopPropagation(),gs()}),z.addEventListener("mouseenter",()=>{window.innerWidth>=1024&&z.classList.contains("collapsed")&&ft(!1)}),z.addEventListener("mouseleave",()=>{window.innerWidth>=1024&&(document.querySelector("#sidebarToggle:hover")||ft(!0))}),Ia&&Ia.addEventListener("click",r=>{r.stopPropagation(),ps()}),Le&&Le.addEventListener("click",r=>{r.stopPropagation(),it()});let s=0;z.addEventListener("touchstart",r=>{s=r.changedTouches[0].screenX},{passive:!0}),z.addEventListener("touchend",r=>{const o=r.changedTouches[0].screenX;s-o>50&&it()},{passive:!0}),ms.forEach(r=>{const o=r.getAttribute("data-target"),n=o.replace("-section",""),i=a?.[n]!==!1,d=t===null||t[o]?.view===!0;if(!i||!d){r.style.display="none";return}r.style.display="flex",r.addEventListener("click",l=>{l.preventDefault(),o&&typeof e=="function"&&e(o),window.innerWidth<768&&it()})})}const et=e=>{const t=e||p.establishmentId;return t?w(`/api/establishments/${t}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},fs=(e,t)=>{const a=e||p.establishmentId;return a?w(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(t)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},vs=(e,t)=>{const a=e||p.establishmentId;return a?w(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},hs=(e,t)=>{const a=e||p.establishmentId;return a?w(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},G=e=>w(`/api/professionals/${e}`),ys=e=>w(`/api/professionals/details/${e}`),xs=e=>w("/api/professionals",{method:"POST",body:JSON.stringify(e)}),ws=(e,t)=>w(`/api/professionals/${e}`,{method:"PUT",body:JSON.stringify(t)}),ks=e=>w(`/api/professionals/${e}`,{method:"DELETE"});var Be;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(Be||(Be={}));class qt extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const Ss=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},Es=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},r=()=>t!==null?t.name:Ss(e),o=()=>r()!=="web",n=c=>{const m=l.get(c);return!!(m?.platforms.has(r())||i(c))},i=c=>{var m;return(m=a.PluginHeaders)===null||m===void 0?void 0:m.find(b=>b.name===c)},d=c=>e.console.error(c),l=new Map,u=(c,m={})=>{const b=l.get(c);if(b)return console.warn(`Capacitor plugin "${c}" already registered. Cannot register plugins twice.`),b.proxy;const f=r(),v=i(c);let k;const h=async()=>(!k&&f in m?k=typeof m[f]=="function"?k=await m[f]():k=m[f]:t!==null&&!k&&"web"in m&&(k=typeof m.web=="function"?k=await m.web():k=m.web),k),y=(T,P)=>{var A,O;if(v){const ae=v?.methods.find(_=>P===_.name);if(ae)return ae.rtype==="promise"?_=>a.nativePromise(c,P.toString(),_):(_,rt)=>a.nativeCallback(c,P.toString(),_,rt);if(T)return(A=T[P])===null||A===void 0?void 0:A.bind(T)}else{if(T)return(O=T[P])===null||O===void 0?void 0:O.bind(T);throw new qt(`"${c}" plugin is not implemented on ${f}`,Be.Unimplemented)}},E=T=>{let P;const A=(...O)=>{const ae=h().then(_=>{const rt=y(_,T);if(rt){const nt=rt(...O);return P=nt?.remove,nt}else throw new qt(`"${c}.${T}()" is not implemented on ${f}`,Be.Unimplemented)});return T==="addListener"&&(ae.remove=async()=>P()),ae};return A.toString=()=>`${T.toString()}() { [capacitor code] }`,Object.defineProperty(A,"name",{value:T,writable:!1,configurable:!1}),A},$=E("addListener"),L=E("removeListener"),B=(T,P)=>{const A=$({eventName:T},P),O=async()=>{const _=await A;L({eventName:T,callbackId:_},P)},ae=new Promise(_=>A.then(()=>_({remove:O})));return ae.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await O()},ae},H=new Proxy({},{get(T,P){switch(P){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return v?B:$;case"removeListener":return L;default:return E(P)}}});return s[c]=H,l.set(c,{name:c,proxy:H,platforms:new Set([...Object.keys(m),...v?[f]:[]])}),H};return a.convertFileSrc||(a.convertFileSrc=c=>c),a.getPlatform=r,a.handleError=d,a.isNativePlatform=o,a.isPluginAvailable=n,a.registerPlugin=u,a.Exception=qt,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},$s=e=>e.Capacitor=Es(e),We=$s(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),ca=We.registerPlugin;class po{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const o=this.windowListeners[t];o&&!o.registered&&this.addWindowListener(o),s&&this.sendRetainedArgumentsForEvent(t);const n=async()=>this.removeListener(t,a);return Promise.resolve({remove:n})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const r=this.listeners[t];if(!r){if(s){let o=this.retainedEventArguments[t];o||(o=[]),o.push(a),this.retainedEventArguments[t]=o}return}r.forEach(o=>o(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new We.Exception(t,Be.Unimplemented)}unavailable(t="not available"){return new We.Exception(t,Be.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const r=s.indexOf(a);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const Ca=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),La=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Is extends po{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[r,o]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=La(r).trim(),o=La(o).trim(),a[r]=o}),a}async setCookie(t){try{const a=Ca(t.key),s=Ca(t.value),r=`; expires=${(t.expires||"").replace("expires=","")}`,o=(t.path||"/").replace("path=",""),n=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${r}; path=${o}; ${n};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}ca("CapacitorCookies",{web:()=>new Is});const Cs=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const r=s.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},s.onerror=r=>a(r),s.readAsDataURL(e)}),Ls=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,o,n)=>(r[o]=e[t[n]],r),{})},Bs=(e,t=!0)=>e?Object.entries(e).reduce((s,r)=>{const[o,n]=r;let i,d;return Array.isArray(n)?(d="",n.forEach(l=>{i=t?encodeURIComponent(l):l,d+=`${o}=${i}&`}),d.slice(0,-1)):(i=t?encodeURIComponent(n):n,d=`${o}=${i}`),`${s}&${d}`},"").substr(1):null,Ts=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),r=Ls(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const o=new URLSearchParams;for(const[n,i]of Object.entries(e.data||{}))o.set(n,i);a.body=o.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const o=new FormData;if(e.data instanceof FormData)e.data.forEach((i,d)=>{o.append(d,i)});else for(const i of Object.keys(e.data))o.append(i,e.data[i]);a.body=o;const n=new Headers(a.headers);n.delete("content-type"),a.headers=n}else(r.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class Ms extends po{async request(t){const a=Ts(t,t.webFetchExtra),s=Bs(t.params,t.shouldEncodeUrlParams),r=s?`${t.url}?${s}`:t.url,o=await fetch(r,a),n=o.headers.get("content-type")||"";let{responseType:i="text"}=o.ok?t:{};n.includes("application/json")&&(i="json");let d,l;switch(i){case"arraybuffer":case"blob":l=await o.blob(),d=await Cs(l);break;case"json":d=await o.json();break;case"document":case"text":default:d=await o.text()}const u={};return o.headers.forEach((c,m)=>{u[m]=c}),{data:d,headers:u,status:o.status,url:o.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}ca("CapacitorHttp",{web:()=>new Ms});const oe=ca("PushNotifications",{}),Ds=(e,t,a)=>w(`/api/analytics/${e}?startDate=${t}&endDate=${a}`),Ps=({establishmentId:e,startDate:t,endDate:a,cashierSessionId:s})=>{let r=`/api/reports/sales/${e}?startDate=${t}&endDate=${a}`;return s&&s!=="all"&&(r+=`&cashierSessionId=${s}`),w(r)},As=(e,t,a)=>w(`/api/analytics/${e}/monthly-details?year=${t}&month=${a}`),qs=(e,t,a,s)=>{const r=`/api/analytics/${e}/daily-details?year=${t}&month=${a}&day=${s}`;return w(r)},Ns=(e,t,a,s)=>{const r=`/api/analytics/${e}/professional-details?year=${t}&month=${a}&professionalId=${s}`;return w(r)},Fs=()=>w("/api/reports/summary",{method:"GET"}),De=e=>w(`/api/services/${e}`),Rs=e=>w("/api/services",{method:"POST",body:JSON.stringify(e)}),js=(e,t)=>w(`/api/services/${e}`,{method:"PUT",body:JSON.stringify(t)}),Hs=e=>w(`/api/services/${e}`,{method:"DELETE"}),Os=(e,t)=>w(`/api/services/${e}/status`,{method:"PATCH",body:JSON.stringify({active:t})}),zs=e=>w(`/api/services/stats/most-popular/${e}`),Ct=(e,t,a,s="all")=>{const r=`/api/blockages/${e}?startDate=${t}&endDate=${a}&professionalId=${s}`;return w(r)},Lt=e=>w("/api/blockages",{method:"POST",body:JSON.stringify(e)}),ua=e=>w(`/api/blockages/${e}`,{method:"DELETE"}),go=e=>w("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:e})}),tt=e=>w(`/api/clients/${e}`),ma=e=>w("/api/clients",{method:"POST",body:JSON.stringify(e)}),Vs=(e,t)=>w(`/api/clients/${e}`,{method:"PUT",body:JSON.stringify(t)}),Us=e=>w(`/api/clients/${e}`,{method:"DELETE"}),Js=(e,t,a)=>{const s=`/api/clients/history/${e}?clientName=${encodeURIComponent(t)}&clientPhone=${encodeURIComponent(a)}`;return w(s)},_s=(e,t,a)=>{const s=`/api/clients/loyalty-history/${e}?clientName=${encodeURIComponent(t)}&clientPhone=${encodeURIComponent(a)}`;return w(s)},Ws=(e,t,a,s)=>w("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:e,clientName:t,clientPhone:a,rewardData:s})}),Ba=document.getElementById("content");let Ta=!1;const Gt=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5"},{bg:"#d1fae5",border:"#059669",main:"#059669"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48"},{bg:"#fef3c7",border:"#d97706",main:"#d97706"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed"},{bg:"#fce7f3",border:"#db2777",main:"#db2777"}];let at=[],Bt=[],Ge={},ee=[],C={currentView:"list",weekViewDays:7,currentDate:new Date,selectedProfessionalId:"all",profSearchTerm:"",showInactiveProfs:!1,scrollToAppointmentId:null},S={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function Gs(e){return new Intl.DateTimeFormat("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).format(e).replace(/\./g,"")}function bo(e){const t=new Date(e);if(t.setHours(0,0,0,0),C.currentView==="week"&&C.weekViewDays===7){const a=t.getDay(),s=t.getDate()-a+(a===0?-6:1);return new Date(t.setDate(s))}return t}function kt(){const e=document.getElementById("profSelectorContainer"),t=C.profSearchTerm.toLowerCase();if(!e||!p.professionals)return;let a=p.professionals.filter(o=>C.showInactiveProfs||o.status!=="inactive");t&&(a=a.filter(o=>o.name.toLowerCase().includes(t)));const r=[...[{id:"all",name:"Todos",photo:null,status:"active"}],...a];e.innerHTML=r.map(o=>{const n=C.selectedProfessionalId===o.id,i=o.name==="Todos"?"Todos":o.name.split(" ")[0],d=o.name==="Todos"?"T":o.name.charAt(0).toUpperCase(),l=o.status!=="inactive",u=Gt[0],c=o.id!=="all"&&p.professionalColors.get(o.id)||u,m=o.photo||`https://placehold.co/64x64/${c.main?.replace("#","")||"E0E7FF"}/${c.light?.replace("#","")||"4F46E5"}?text=${d}`,b=o.id==="all"?"#e0e7ff":c.light,f=o.id==="all"?"#4f46e5":c.main,k=`border: 3px solid ${n?c.border:"transparent"}; box-shadow: ${n?"0 0 0 2px "+c.border:"none"};`;return`
            <div class="prof-card ${n?"selected":""} ${l?"":"opacity-50"}" 
                 data-action="select-professional" 
                 data-prof-id="${o.id}">
                ${o.id==="all"?`<div class="prof-card-all-placeholder" style="background-color: ${b}; color: ${f}; ${k}">
                           ${d}
                          </div>`:`<img src="${m}" alt="${o.name}" class="prof-card-photo" style="${k}" />`}
                <span class="prof-card-name">${i}</span>
            </div>
        `}).join("")}function Ys(e,t,a,s,r){const o=(e||"").replace(/\D/g,""),n=new Date(r).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),i=new Date(r).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=`Olá, ${t}! Você tem um agendamento de ${a} com o(a) profissional ${s} para o dia ${n} às ${i}. Podemos confirmar? Agradecemos a preferência!`,l=encodeURIComponent(d);return`https://wa.me/${o}?text=${l}`}function Xs(e){const t=document.getElementById("agenda-view");if(e.sort((s,r)=>new Date(s.startTime)-new Date(r.startTime)),e.length===0){t.innerHTML='<div class="text-center p-10 text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum agendamento ou bloqueio</h3><p class="mt-1 text-sm text-gray-500">Não há eventos para o dia e filtros selecionados.</p></div>';return}const a=e.map(s=>{const r=new Date(s.startTime),o=new Date(s.endTime),n=r.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),i=o.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=p.professionalColors.get(s.professionalId)||{};if(s.type==="blockage")return`
                <div class="appointment-list-card bg-red-50" style="border-left-color: ${d.border};">
                    <div class="time-info">
                        <p class="font-bold text-md">${n}</p>
                        <p class="text-xs text-gray-500">${i}</p>
                    </div>
                    <div class="details-info min-w-0">
                        <p class="font-bold text-red-800 truncate">${s.reason}</p>
                        <p class="text-sm text-gray-600 truncate">com ${s.professionalName}</p>
                    </div>
                    <div class="status-info">
                        <span class="status-badge bg-red-100 text-red-800">Bloqueio</span>
                    </div>
                </div>`;const l=s.status==="completed",u=l?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800",c=l?"Finalizado":"Aberto",m=JSON.stringify(s).replace(/'/g,"&apos;"),b=s.redeemedReward?.points>0,f=s.hasRewards&&!b,v=Ys(s.clientPhone,s.clientName,s.serviceName,s.professionalName,s.startTime);return`
            <div class="appointment-list-card" data-appointment='${m}' style="border-left-color: ${d.border};">
                
                <div class="time-info" data-action="open-comanda">
                    <p class="font-bold text-md">${n}</p>
                    <p class="text-xs text-gray-500">${i}</p>
                </div>

                <div class="details-info min-w-0" data-action="open-comanda">
                    <p class="font-bold text-gray-800 truncate">${f?"🎁 ":""}${s.clientName}</p>
                    <p class="text-sm text-gray-600 truncate">${s.serviceName}</p>
                    <p class="text-xs text-gray-500 truncate">com ${s.professionalName||"Indefinido"}</p>
                    
                    ${b?'<p class="text-xs font-semibold text-purple-600">Resgate de Prémio</p>':""}
                </div>

                <div class="status-info">
                    <span class="status-badge ${u} mb-1">${c}</span>
                    <div class="card-actions flex gap-1 items-center">
                        ${l?`
                            <button data-action="edit-appointment" data-appointment='${m}' class="action-btn opacity-40 cursor-not-allowed" title="Finalizado - Não editável" disabled><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `:`
                            <a href="${v}" target="_blank" class="action-btn text-green-500 hover:text-green-700 p-1" title="Enviar Confirmação WhatsApp">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.036 2a10 10 0 100 20 10 10 0 000-20zM17.5 14.8c-.24.125-1.465.716-1.696.804-.23.09-.49.135-.75.045-.26-.09-.982-.322-1.87-.965-.888-.643-1.474-1.442-1.64-1.748-.166-.307-.015-.467.106-.615.116-.149.23-.388.344-.582.113-.193.15-.327.1-.462-.05-.136-.264-.322-.544-.654-.28-.332-.572-.782-.828-.958-.255-.176-.438-.158-.61-.158-.173 0-.374-.022-.574-.022-.2 0-.54.075-.826.375-.285.3-.99.965-.99 2.355 0 1.43 1.018 2.872 1.16 3.072.14.2 2 3.047 4.86 4.218 2.86 1.17 2.86.786 3.376 1.054.516.268 1.49.462 1.696.406.206-.057 1.463-.615 1.67-.887.2-.27.2-.504.14-.615-.058-.11-.23-.166-.48-.306z"/></svg>
                            </a>
                            <button data-action="edit-appointment" data-appointment='${m}' class="action-btn" title="Editar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `}
                        <button data-action="delete-appointment" data-id="${s.id}" class="action-btn" title="Apagar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                </div>
            </div>`}).join("");t.innerHTML=`<div class="list-view-container">${a}</div>`}function pa(){return window.innerWidth<768&&C.currentView==="week"?3:C.weekViewDays}function Qs(e){const t=document.getElementById("agenda-view"),a=["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],s=bo(C.currentDate),r=pa();let o=`<div class="grid divide-x divide-gray-200 min-h-[60vh]" style="grid-template-columns: repeat(${r}, minmax(0, 1fr));">`;for(let n=0;n<r;n++){const i=new Date(s);i.setDate(i.getDate()+n);const d=new Date,l=i.toDateString()===d.toDateString(),u=e.filter(m=>new Date(m.startTime).toDateString()===i.toDateString()).sort((m,b)=>new Date(m.startTime)-new Date(b.startTime));let c='<div class="p-1 space-y-2">';u.length>0?c+=u.map(m=>{const f=new Date(m.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),v=p.professionalColors.get(m.professionalId)||{bg:"#e5e7eb",border:"#9ca3af"};if(m.type==="blockage")return`
                        <div class="p-2 rounded-lg border-l-4 flex flex-col bg-red-100" style="border-left-color: ${v.border};">
                            <span class="font-bold text-xs text-red-900">${f}</span>
                            <div class="mt-1 min-w-0">
                                <p class="font-semibold text-sm text-red-800 truncate">${m.reason}</p>
                                <p class="text-xs text-red-600 truncate">com ${m.professionalName}</p>
                            </div>
                        </div>
                    `;const k=JSON.stringify(m).replace(/'/g,"&apos;"),h=m.redeemedReward?.points>0,y=m.hasRewards&&!h,E=m.status==="completed";return`
                    <div class="p-2 rounded-lg border-l-4 flex flex-col cursor-pointer" 
                         style="background-color: ${v.bg}; border-left-color: ${v.border};"
                         data-action="open-comanda" data-appointment='${k}'>
                        
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-xs text-gray-900">${f}</span>
                            ${E?'<span class="text-[10px] font-semibold bg-green-200 text-green-800 px-1 rounded-sm">OK</span>':""}
                        </div>

                        <div class="mt-1 min-w-0">
                            <p class="font-semibold text-sm text-gray-800 truncate">${y?"🎁 ":""}${m.clientName}</p>
                            <p class="text-xs text-gray-600 truncate">${m.serviceName}</p>
                            <p class="text-xs text-gray-500 truncate">com ${m.professionalName||"Indefinido"}</p>
                            ${h?'<p class="text-xs text-purple-600 truncate">Resgate</p>':""}
                        </div>
                        
                        </div>
                `}).join(""):c+='<div class="text-center text-xs text-gray-400 pt-4">Nenhum evento</div>',c+="</div>",o+=`
            <div class="flex flex-col">
                <div class="text-center py-2 border-b ${l?"bg-indigo-100 text-indigo-700":"bg-gray-50"}">
                    <p class="font-bold">${a[i.getDay()]}</p>
                    <p class="text-sm">${i.getDate()}/${i.getMonth()+1}</p>
                </div>
                <div class="flex-grow overflow-y-auto">${c}</div>
            </div>
        `}o+="</div>",t.innerHTML=o}function Zs(){const e=p.allEvents.filter(t=>C.selectedProfessionalId==="all"||t.professionalId===C.selectedProfessionalId);C.currentView==="list"?Xs(e):Qs(e)}async function X(){const e=document.getElementById("agenda-view");if(!e)return;e.innerHTML='<div class="loader mx-auto my-10"></div>';let t,a;const s=document.getElementById("weekRange");if(C.currentView==="list")t=new Date(C.currentDate),t.setHours(0,0,0,0),a=new Date(C.currentDate),a.setHours(23,59,59,999),s.textContent=Gs(t);else{const r=pa();t=bo(new Date(C.currentDate)),a=new Date(t),a.setDate(t.getDate()+(r-1)),a.setHours(23,59,59,999),s.textContent=`${t.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})} - ${a.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})}`}try{const r=await ts(p.establishmentId,t.toISOString(),a.toISOString(),C.selectedProfessionalId==="all"?null:C.selectedProfessionalId),n=(await Ct(p.establishmentId,t.toISOString(),a.toISOString(),C.selectedProfessionalId)).map(d=>{let l=d.professionalName;if(!l&&d.professionalId){const u=p.professionals?p.professionals.find(c=>c.id===d.professionalId):null;u&&(l=u.name)}return{...d,type:"blockage",professionalName:l||"Não identificado"}}),i=[...r.map(d=>({...d,type:"appointment"})),...n];if(p.allEvents=i,kt(),Zs(),C.scrollToAppointmentId){const d=document.querySelector(`[data-appointment*='"id":"${C.scrollToAppointmentId}"']`);d&&(d.scrollIntoView({behavior:"smooth",block:"center"}),d.style.transition="background-color 0.5s ease-in-out",d.style.backgroundColor="#e0e7ff",setTimeout(()=>{d.style.backgroundColor=""},2500)),C.scrollToAppointmentId=null}}catch(r){g("Erro na Agenda",`Não foi possível carregar a agenda: ${r.message}`,"error"),e.innerHTML='<div class="p-6 text-center text-red-600">Falha ao carregar dados.</div>'}}async function Ks(){try{const[e,t,a,s]=await Promise.all([p.professionals&&p.professionals.length>0?Promise.resolve(p.professionals):G(p.establishmentId),p.services&&p.services.length>0?Promise.resolve(p.services):De(p.establishmentId),ee.length>0?Promise.resolve(ee):tt(p.establishmentId),Ge.enabled!==void 0?Promise.resolve(null):et(p.establishmentId)]);(!p.professionals||p.professionals.length===0)&&(p.professionals=e||[]),(!p.services||p.services.length===0)&&(p.services=t||[]),ee.length===0&&(ee=a||[]),s&&(Ge=s.loyaltyProgram||{enabled:!1}),p.professionals.forEach((r,o)=>{p.professionalColors.set(r.id,Gt[o%Gt.length])}),kt()}catch(e){console.error("Erro ao popular filtros e dependências do modal:",e),g("Atenção","Não foi possível pré-carregar os dados para agendamento. A abertura do modal pode ser lenta.","error")}}function Yt(e){e<1||e>4||(S.step=e,Xt(null,!0))}function fo(e,t){const a=document.getElementById("multiServiceToggle"),s=a&&a.checked,r=t.classList.contains("selected"),o=S.data.selectedServiceIds.indexOf(e);if(r)t.classList.remove("selected","border-blue-500"),o>-1&&S.data.selectedServiceIds.splice(o,1);else{if(!s){S.data.selectedServiceIds=[];const n=document.getElementById("apptServicesContainer");n&&n.querySelectorAll(".service-card.selected").forEach(i=>{i.classList.remove("selected","border-blue-500")})}t.classList.add("selected","border-blue-500"),S.data.selectedServiceIds.push(e)}}function vo(e,t){const a=document.querySelector(".professional-step-cards");if(!a)return;a.querySelectorAll(".professional-modal-card").forEach(r=>r.classList.remove("selected","border-blue-500")),t.classList.add("selected","border-blue-500");const s=Bt.find(r=>r.id===e);S.data.professionalId=e,S.data.professionalName=s?s.name:"N/A"}function er(e,t){const a=document.getElementById("availableTimesContainer");a&&(a.querySelectorAll(".time-slot-card").forEach(s=>s.classList.remove("selected")),t.classList.add("selected"),S.data.time=e)}async function Ma(){const e=document.getElementById("apptTotalDuration"),t=document.getElementById("availableTimesContainer");if(!e||!t)return;const a=S.data.professionalId,s=S.data.selectedServiceIds,r=document.getElementById("apptDate").value;S.data.date=r;const o=s.reduce((n,i)=>{const d=at.find(l=>l.id===i);return n+(d?d.duration+(d.bufferTime||0):0)},0);if(e.textContent=`${o} min`,o===0||!a||!r){t.innerHTML='<p class="col-span-full text-center text-gray-500">Selecione serviço, profissional e data.</p>';return}t.innerHTML='<div class="loader mx-auto col-span-full"></div>';try{let n=await os({establishmentId:p.establishmentId,professionalId:a,serviceIds:s,date:r});const i=new Date;if(new Date(r+"T00:00:00").toDateString()===i.toDateString()){const l=i.getHours()*60+i.getMinutes();n=n.filter(u=>{const[c,m]=u.split(":").map(Number);return c*60+m>=l})}if(t.innerHTML="",n.length>0){if(n.forEach(l=>{const u=document.createElement("button");u.type="button",u.className=`time-slot-card p-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition ${S.data.time===l?"selected":""}`,u.textContent=l,u.addEventListener("click",()=>er(l,u)),t.appendChild(u)}),S.data.time){const l=t.querySelector(`[data-action="time-slot"][data-time="${S.data.time}"]`);l&&l.classList.add("selected")}}else t.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum horário disponível.</p>'}catch(n){console.error("Erro ao buscar horários:",n),t.innerHTML='<p class="col-span-full text-center text-red-500">Erro ao buscar horários.</p>'}}function tr(){const e=document.getElementById("loyaltyRewardsContainer");if(!e)return;const{clientHasRewards:t,clientLoyaltyPoints:a,redeemedReward:s}=S.data,{enabled:r,rewards:o,pointsPerCurrency:n}=Ge;if(!r||!t||!o||o.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");const i=o.filter(l=>a>=l.points);let d=`
        <h4 class="text-md font-semibold text-gray-700 mb-2">🎁 Prêmios Disponíveis (${a} pontos)</h4>
    `;i.length>0?(d+='<div class="space-y-2">',d+=i.map(l=>{const u=s?.reward===l.reward;return`
                <label class="flex items-center p-3 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="loyaltyReward" class="form-radio text-indigo-600" 
                           value="${l.reward}" 
                           data-points="${l.points}"
                           ${u?"checked":""}>
                    <span class="ml-3">
                        <span class="font-semibold text-gray-800">${l.reward}</span>
                        <span class="text-sm text-gray-600"> (-${l.points} pontos)</span>
                    </span>
                </label>
            `}).join(""),d+="</div>"):d+='<p class="text-sm text-gray-600">Pontos insuficientes para resgatar os prêmios disponíveis.</p>',e.innerHTML=d,e.querySelectorAll('input[name="loyaltyReward"]').forEach(l=>{l.addEventListener("change",u=>{u.target.checked&&(S.data.redeemedReward={reward:u.target.value,points:parseInt(u.target.dataset.points,10)})})}),e.insertAdjacentHTML("beforeend",`
        <label class="flex items-center p-3 mt-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
            <input type="radio" name="loyaltyReward" class="form-radio text-gray-400" 
                   value="none" 
                   ${s?"":"checked"}>
            <span class="ml-3 text-gray-600">Não resgatar prêmio agora</span>
        </label>
    `),e.querySelector('input[value="none"]').addEventListener("change",l=>{l.target.checked&&(S.data.redeemedReward=null)})}async function ar(e){e.preventDefault();const t=e.target,a=t.querySelector('button[type="submit"]');if(!S.data.time||S.data.selectedServiceIds.length===0||!S.data.professionalId)return g("Erro de Validação","Por favor, selecione o horário, serviço(s) e profissional antes de confirmar.","error");a.disabled=!0,a.textContent="A confirmar...";const s=S.data.selectedServiceIds.map(l=>{const u=at.find(c=>c.id===l);return{id:u.id,name:u.name,price:u.price,duration:u.duration,bufferTime:u.bufferTime||0,photo:u.photo||null}}),[r,o]=S.data.time.split(":"),n=new Date(`${S.data.date}T${r}:${o}:00`),i={establishmentId:p.establishmentId,clientName:S.data.clientName,clientPhone:S.data.clientPhone,services:s,professionalId:S.data.professionalId,startTime:n.toISOString(),redeemedReward:S.data.redeemedReward},d=t.querySelector("#appointmentId").value;d&&(i.id=d);try{d?await da(d,i):await ss(i),g(`Agendamento ${d?"atualizado":"criado"} com sucesso!`,"success"),document.getElementById("appointmentModal").style.display="none",X()}catch(l){g(l.message,"error")}finally{a.disabled=!1,a.textContent="Confirmar Agendamento"}}function or(e){return`
        <div class="client-search-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-blue-50 ${S.data.clientName===e.name&&S.data.clientPhone===e.phone?"selected border-blue-500":""}" 
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
    `}async function Da(e){const t=document.getElementById("clientSearchResults");if(!t)return;const a=e.toLowerCase().trim();if(a.length<3){t.innerHTML='<p class="text-sm text-gray-500">Digite pelo menos 3 caracteres para buscar clientes existentes.</p>';return}const s=ee.filter(r=>r.name.toLowerCase().includes(a)||r.phone.includes(a));if(s.length===0){t.innerHTML='<p class="text-sm text-gray-500">Nenhum cliente encontrado com este termo.</p>';return}t.innerHTML=s.map(or).join(""),t.querySelectorAll('[data-action="select-client"]').forEach(r=>{r.addEventListener("click",o=>{const n=r.dataset.clientName,i=r.dataset.clientPhone,d=ee.find(l=>l.phone===i&&l.name===n);if(S.data.clientName=n,S.data.clientPhone=i,d){const l=Ge,u=Math.min(...(l?.rewards||[]).map(c=>c.points));S.data.clientLoyaltyPoints=d.loyaltyPoints||0,S.data.clientHasRewards=l.enabled&&u!==1/0&&S.data.clientLoyaltyPoints>=u}else S.data.clientHasRewards=!1,S.data.clientLoyaltyPoints=0;document.getElementById("apptClientName").value=n,document.getElementById("apptClientPhone").value=i,document.querySelectorAll(".client-search-card").forEach(l=>l.classList.remove("selected","border-blue-500")),r.classList.add("selected","border-blue-500")})})}async function sr(e){e.preventDefault();const t=document.getElementById("clientRegistrationForm"),a=t.querySelector('button[type="submit"]'),s={establishmentId:p.establishmentId,name:t.querySelector("#regClientName").value.trim(),email:t.querySelector("#regClientEmail").value.trim(),phone:t.querySelector("#regClientPhone").value.trim(),dobDay:t.querySelector("#regClientDobDay").value.trim(),dobMonth:t.querySelector("#regClientDobMonth").value.trim(),notes:t.querySelector("#regClientNotes").value.trim()};if(!s.name||!s.phone)return g("Erro de Validação","Nome e Telefone são obrigatórios.","error");a.disabled=!0,a.textContent="A salvar...";try{await ma(s),ee.push({name:s.name,phone:s.phone,loyaltyPoints:0}),S.data.clientName=s.name,S.data.clientPhone=s.phone,S.data.clientHasRewards=!1,S.data.clientLoyaltyPoints=0,g("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",Yt(1)}catch(r){g(`Erro ao cadastrar cliente: ${r.message}`,"error")}finally{a.disabled=!1,a.textContent="Salvar"}}function rr(){N({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("clientRegistrationForm");t&&t.addEventListener("submit",sr)}function nr(){rr()}function ir(e,t){const a=e?"Editar Agendamento":"Selecionar Cliente",s=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">1. Dados do Cliente</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="apptClientName" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="apptClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="Nome Completo" value="${S.data.clientName}">
                </div>
                <div>
                    <label for="apptClientPhone" class="block text-sm font-medium text-gray-700">Telemóvel</label>
                    <input type="tel" id="apptClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="(XX) XXXXX-XXXX" value="${S.data.clientPhone}">
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
    `;return{title:a,content:s}}function lr(){const e="Selecionar Serviço",a=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">2. Serviços</h3>
             
             <div class="flex flex-col sm:flex-row items-center gap-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
                 <input type="search" id="serviceSearchModalInput" placeholder="Buscar Serviço..." class="w-full sm:flex-grow p-3 pl-10 border rounded-lg">
                 
                 <label class="flex items-center space-x-2 cursor-pointer flex-shrink-0">
                     <div class="relative">
                         <input type="checkbox" id="multiServiceToggle" class="sr-only" ${S.data.selectedServiceIds.length>1?"checked":""}>
                         <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full transition-colors"></div>
                         <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" style="transition: all 0.3s;"></div>
                     </div>
                     <span class="text-sm font-medium text-gray-700">Selecionar Vários</span>
                 </label>
            </div>
            
            <div id="apptServicesContainer" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-1">
                 ${at.map(s=>{const r=S.data.selectedServiceIds.includes(s.id),o=s.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
                         <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${r?"selected border-blue-500":""}" data-service-id="${s.id}">
                             <div class="flex items-center">
                                 <img src="${o}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                                 <div class="flex-1">
                                     <p class="font-semibold text-sm text-gray-800">${s.name}</p>
                                     <p class="text-xs text-gray-500">R$ ${s.price.toFixed(2)} (${s.duration} min)</p>
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
    `;return{title:e,content:a}}function dr(){const e="Selecionar Profissional",t=`
        <div class="p-5 space-y-6">
             <h3 class="text-xl font-bold text-gray-800">3. Profissional</h3>
             <div id="apptProfessionalContainer" class="mt-4 flex flex-wrap gap-3 max-h-48 overflow-y-auto p-1 professional-step-cards">
                 ${Bt.map(a=>{const s=S.data.professionalId===a.id,r=a.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P";return`
                         <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${s?"selected border-blue-500":""}" data-professional-id="${a.id}">
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
    `;return{title:e,content:t}}function cr(e){const t=e?"Confirmar Edição":"Data e Horário",a=new Date,s=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`,r=S.data.date||s,o=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">4. ${t}</h3>

            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 space-y-1">
                <p class="font-bold text-gray-800">${S.data.clientName}</p>
                <p class="text-sm text-gray-700">Serviços: ${S.data.selectedServiceIds.length} selecionado(s)</p>
                <p class="text-sm text-gray-700">Profissional: ${S.data.professionalName}</p>
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
    `;return{title:t,content:o}}function ur(e){const t=document.getElementById("apptServicesContainer");if(!t)return;const a=e.toLowerCase(),s=at.filter(r=>r.name.toLowerCase().includes(a));t.innerHTML=s.map(r=>{const o=S.data.selectedServiceIds.includes(r.id),n=r.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
            <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${o?"selected border-blue-500":""}" data-service-id="${r.id}">
                <div class="flex items-center">
                    <img src="${n}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-gray-800">${r.name}</p>
                        <p class="text-xs text-gray-500">R$ ${r.price.toFixed(2)} (${r.duration} min)</p>
                    </div>
                </div>
            </div>`}).join(""),t.querySelectorAll(".service-card").forEach(r=>{r.addEventListener("click",()=>fo(r.dataset.serviceId,r))})}function mr(e){const t=document.getElementById("apptProfessionalContainer");if(!t)return;const a=e.toLowerCase(),s=Bt.filter(r=>r.name.toLowerCase().includes(a));t.innerHTML=s.map(r=>{const o=S.data.professionalId===r.id,n=r.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P";return`
             <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${o?"selected border-blue-500":""}" data-professional-id="${r.id}">
                 <img src="${n}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                 <p class="text-xs font-semibold text-gray-800">${r.name.split(" ")[0]}</p>
                 <p class="text-[10px] text-gray-500">${r.specialty||"Profissional"}</p>
             </div>`}).join(""),t.querySelectorAll(".professional-modal-card").forEach(r=>{r.addEventListener("click",()=>vo(r.dataset.professionalId,r))})}async function Xt(e=null,t=!1){const a=document.getElementById("appointmentModal");if(!t){const o=e?.startTime?new Date(e.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],n=e?.startTime?new Date(e.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null;S={step:1,data:{id:e?.id||null,clientName:e?.clientName||"",clientPhone:e?.clientPhone||"",selectedServiceIds:e?.services?.map(i=>i.id)||[],professionalId:e?.professionalId||null,professionalName:e?.professionalName||"",date:o,time:n,redeemedReward:e?.redeemedReward||null,clientHasRewards:e?.hasRewards||!1,clientLoyaltyPoints:0}}}if(!p.services||!p.professionals||!ee||Ge.enabled===void 0){g("Erro","Os dados da agenda ainda não foram carregados. Tente novamente em alguns segundos.","error");return}if(at=p.services,Bt=p.professionals.filter(o=>o.status==="active"),S.data.clientName&&S.data.clientPhone){const o=ee.find(n=>n.phone===S.data.clientPhone&&n.name===S.data.clientName);o&&(S.data.clientLoyaltyPoints=o.loyaltyPoints||0)}let s={title:"Erro",content:"<p>Etapa não encontrada.</p>"};switch(S.step){case 1:s=ir(e);break;case 2:s=lr();break;case 3:s=dr();break;case 4:s=cr(e);break}a.innerHTML=`
        <div class="modal-content max-w-4xl p-0 rounded-xl overflow-hidden shadow-2xl">
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${s.title}</h2>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>
            </header>
            
            <form id="appointmentForm" class="flex flex-col h-full">
                <input type="hidden" id="appointmentId" value="${S.data.id||""}">
                <input type="hidden" id="selectedTime" value="${S.data.time||""}">
                
                <div class="flex-1 overflow-y-auto" style="max-height: 80vh;">
                    ${s.content}
                </div>
                
            </form>
        </div>`,a.querySelectorAll('[data-action="next-step"]').forEach(o=>{o.addEventListener("click",()=>{const n=parseInt(o.dataset.currentStep,10);if(n===1){const i=a.querySelector("#apptClientName"),d=a.querySelector("#apptClientPhone");if(S.data.clientName=i.value.trim(),S.data.clientPhone=d.value.trim(),!S.data.clientName||!S.data.clientPhone)return g("Atenção","Nome e telefone do cliente são obrigatórios.","error")}else if(n===2){if(S.data.selectedServiceIds.length===0)return g("Atenção","Selecione pelo menos um serviço.","error")}else if(n===3&&!S.data.professionalId)return g("Atenção","Selecione um profissional.","error");Yt(n+1)})}),a.querySelectorAll('[data-action="prev-step"]').forEach(o=>{o.addEventListener("click",()=>Yt(parseInt(o.dataset.currentStep,10)-1))});const r=a.querySelector("#appointmentForm");if(S.step===4&&r&&r.addEventListener("submit",ar),a.style.display="flex",S.step===2){a.querySelector("#apptServicesContainer").querySelectorAll(".service-card").forEach(i=>{i.addEventListener("click",()=>fo(i.dataset.serviceId,i))});const n=a.querySelector("#serviceSearchModalInput");n&&n.addEventListener("input",i=>ur(i.target.value))}if(S.step===3){a.querySelector("#apptProfessionalContainer").querySelectorAll(".professional-modal-card").forEach(i=>{i.addEventListener("click",()=>vo(i.dataset.professionalId,i))});const n=a.querySelector("#professionalSearchModalInput");n&&n.addEventListener("input",i=>mr(i.target.value))}if(S.step===1){const o=a.querySelector("#clientSearchInput");o&&(o.addEventListener("input",i=>Da(i.target.value)),S.data.clientName&&S.data.clientPhone&&Da(`${S.data.clientName} ${S.data.clientPhone}`));const n=a.querySelector('[data-action="open-client-registration"]');n&&n.addEventListener("click",nr)}if(S.step===4){const o=a.querySelector("#apptDate");o&&o.addEventListener("change",Ma),Ma(),tr()}}async function ho(e={}){C.currentDate=e.targetDate?new Date(e.targetDate):C.currentDate||new Date,C.scrollToAppointmentId=e.scrollToAppointmentId||null,C.profSearchTerm="",window.innerWidth<768&&(C.currentView="list"),Ba.innerHTML=`
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
        </section>`,document.querySelectorAll(".view-btn[data-view]").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".view-btn[data-view]").forEach(r=>r.classList.remove("active")),a.classList.add("active"),C.currentView=a.dataset.view;const s=document.getElementById("week-days-toggle");if(C.currentView==="week"){if(s.style.display="flex",window.innerWidth<768){C.weekViewDays=3,document.querySelectorAll(".week-days-btn").forEach(o=>o.classList.remove("active"));const r=document.querySelector('.week-days-btn[data-days="3"]');r&&r.classList.add("active")}}else s.style.display="none";X()})}),document.querySelectorAll(".week-days-btn").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".week-days-btn").forEach(s=>s.classList.remove("active")),a.classList.add("active"),C.weekViewDays=parseInt(a.dataset.days,10),X()})}),document.getElementById("todayBtn").addEventListener("click",()=>{C.currentDate=new Date,X()});const t=a=>{const s=parseInt(a.currentTarget.dataset.amount,10),r=C.currentView==="week"?pa():1,o=new Date(C.currentDate);o.setDate(o.getDate()+s*r),C.currentDate=o,X()};document.getElementById("prevBtn").addEventListener("click",t),document.getElementById("nextBtn").addEventListener("click",t),document.getElementById("profSearchInput").addEventListener("input",a=>{C.profSearchTerm=a.target.value,kt()}),document.getElementById("showInactiveProfsToggle").addEventListener("change",a=>{C.showInactiveProfs=a.target.checked,kt(),X()}),Ta||(Ba.addEventListener("click",async a=>{const s=a.target.closest("[data-action]");if(a.target.closest('[data-action="select-professional"]')){const d=a.target.closest('[data-action="select-professional"]').dataset.profId,l=C.selectedProfessionalId===d&&d!=="all";if(C.selectedProfessionalId=l?"all":d,d!=="all"){const u=document.getElementById("profSearchInput");u&&(u.value=""),C.profSearchTerm=""}await X();return}if(!s)return;const r=s.dataset.action;let o=null;const n=a.target.closest("[data-appointment]");switch(n&&(o=JSON.parse(n.dataset.appointment.replace(/&apos;/g,"'"))),r){case"new-appointment":Xt();break;case"edit-appointment":if(!o)return;if(o.status==="completed"){g("Atenção","Agendamentos finalizados não podem ser editados.","error");return}o.hasRewards&&!o.redeemedReward&&g("🎁 Cliente com Prêmios!","Este cliente tem pontos para resgatar. Verifique a Etapa 4 do agendamento.","info"),Xt(o);break;case"delete-appointment":{const i=s.dataset.id;if(await M("Confirmar Exclusão","Tem a certeza que deseja apagar este agendamento?"))try{await rs(i),g("Agendamento apagado!","success"),X()}catch(l){g(`Não foi possível apagar: ${l.message}`,"error")}break}case"open-comanda":if(o){o.hasRewards&&!o.redeemedReward&&o.status!=="completed"&&g("🎁 Cliente com Prêmios!","Este cliente tem pontos de fidelidade para resgatar.","info");const i=o.status==="completed"?"finalizadas":"em-atendimento",d={selectedAppointmentId:o.id,initialFilter:i};if(i==="finalizadas"){let l=o.startTime;if(o.transaction&&o.transaction.paidAt){const u=o.transaction.paidAt;typeof u=="object"&&u._seconds?l=new Date(u._seconds*1e3):l=u}d.filterDate=l}j("comandas-section",d)}break}}),Ta=!0),await Ks(),await X()}const pr=(e,t=null,a=1,s=12)=>{let r=`/api/comandas/${e}?page=${a}&limit=${s}`;return t&&(r+=`&date=${t}`),w(r)},gr=e=>w("/api/sales",{method:"POST",body:JSON.stringify(e)}),br=e=>w(`/api/sales/${e}/reopen`,{method:"POST"}),fr=e=>w(`/api/sales/${e}`,{method:"DELETE"}),Tt=e=>w(`/api/products/${e}`),vr=e=>w("/api/products",{method:"POST",body:JSON.stringify(e)}),hr=(e,t)=>w(`/api/products/${e}`,{method:"PUT",body:JSON.stringify(t)}),yr=e=>w(`/api/products/${e}`,{method:"DELETE"}),xr=(e,t)=>w(`/api/products/${e}/stock`,{method:"PATCH",body:JSON.stringify(t)}),wr=({startDate:e,endDate:t,productId:a,categoryId:s})=>{const r=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&r.append("productId",a),s&&s!=="all"&&r.append("categoryId",s),w(`/api/products/stock-history/report?${r.toString()}`)},yo=()=>w("/api/cashier/status").catch(e=>{if(e.message.includes("404")||e.message.includes("não encontrada"))return null;throw e}),kr=e=>{const t={establishmentId:e.establishmentId,initialAmount:Number(e.initialAmount),notes:e.notes||""};return console.log("Payload enviado para abrir caixa:",t),w("/api/cashier/open",{method:"POST",body:JSON.stringify(t)})},Sr=(e,t)=>{const a={finalAmount:Number(t)};return console.log("Payload enviado para fechar caixa:",a),w(`/api/cashier/close/${e}`,{method:"PUT",body:JSON.stringify(a)})},Er=()=>w("/api/cashier/history").then(e=>e||[]).catch(e=>(console.error("Erro ao buscar histórico:",e),[])),$r=e=>w(`/api/cashier/report/${e}`),xo=e=>w(`/api/packages/${e}`),Ir=e=>w("/api/packages",{method:"POST",body:JSON.stringify(e)}),Cr=(e,t)=>w(`/api/packages/${e}`,{method:"PUT",body:JSON.stringify(t)}),Lr=e=>w(`/api/packages/${e}`,{method:"DELETE"});let x={allComandas:[],catalog:{services:[],products:[],packages:[]},clients:[],activeFilter:"atendimento",selectedComandaId:null,isCashierOpen:!1,activeCashierSessionId:null,paging:{page:1,limit:12,total:0}},ye=null,xe=null;function Br(){const e=document.getElementById("comandas-layout");if(e){e.classList.add("detail-view-active");const t=document.getElementById("comanda-detail-container");t&&(t.scrollTop=0)}}function ge(){const e=document.getElementById("comandas-layout");e&&e.classList.remove("detail-view-active")}function Tr(){const e=new Date().toISOString().split("T")[0];xe.innerHTML=`
        <section class="h-full flex flex-col">
            <div class="flex flex-wrap justify-between items-center mb-4 gap-4 px-1">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Ponto de Venda</h2>
                <div id="cashier-controls" class="flex items-center gap-2"></div>
            </div>

            ${x.isCashierOpen?"":`
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
                            class="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md flex items-center justify-center gap-2 mb-3 ${x.isCashierOpen?"":"opacity-50 cursor-not-allowed"}"
                            ${x.isCashierOpen?"":"disabled"}
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
    `}function Mr(){const e=document.getElementById("cashier-controls");e&&(x.isCashierOpen?e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-green-700 bg-green-100 py-1 px-3 rounded-full">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-2 px-4 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 text-sm">Fechar Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm">Relatório</button>
        `:e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-red-700 bg-red-100 py-1 px-3 rounded-full">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-sm">Abrir Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm">Relatório</button>
        `)}function le(){const e=document.getElementById("comandas-list");if(!e)return;if(!x.isCashierOpen&&x.activeFilter==="atendimento"){e.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `;return}const a={atendimento:"confirmed",finalizadas:"completed"}[x.activeFilter],s=x.allComandas.filter(r=>r.status===a);if(s.length===0){e.innerHTML='<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda encontrada.</p>',Pa(e);return}e.innerHTML=s.map(r=>{const n=[...r.services||[],...r.comandaItems||[],...r.items||[]].reduce((c,m)=>c+(m.price||0),0),i=r.id===x.selectedComandaId,d=new Date(r.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),u=r.type==="walk-in"||r.id.startsWith("temp-")?'<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">Avulso</span>':'<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">Agendado</span>';return`
            <div data-action="select-comanda" data-comanda-id="${r.id}" 
                 class="comanda-card cursor-pointer ${i?"selected":""}">
                
                <div class="flex justify-between items-start mb-1">
                    <p class="font-bold text-gray-800 truncate max-w-[70%]">${r.clientName}</p>
                    <p class="font-bold text-gray-900">R$ ${n.toFixed(2)}</p>
                </div>
                
                <div class="flex justify-between items-center mt-1">
                    <div class="flex items-center gap-2">
                        ${u}
                        <p class="text-xs text-gray-500 truncate max-w-[100px]">${r.professionalName}</p>
                    </div>
                    <p class="text-xs text-gray-400 font-medium">${d}</p> 
                </div>
            </div>
        `}).join(""),Pa(e)}function Pa(e){const{page:t,total:a,limit:s}=x.paging,r=Math.ceil((a||0)/s);if(r<=1)return;let o='<div class="flex gap-2 justify-center mt-4 flex-wrap pb-4">';t>1&&(o+=`<button data-page="${t-1}" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">&laquo;</button>`);for(let n=1;n<=r;n++)n===1||n===r||n>=t-2&&n<=t+2?o+=`<button data-page="${n}" class="px-3 py-1 rounded text-sm ${n===t?"bg-indigo-600 text-white font-bold":"bg-gray-200 hover:bg-gray-300"}">${n}</button>`:(n===t-3||n===t+3)&&(o+='<span class="px-2 text-gray-400">...</span>');t<r&&(o+=`<button data-page="${t+1}" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">&raquo;</button>`),o+="</div>",e.innerHTML+=o,e.querySelectorAll("button[data-page]").forEach(n=>{n.onclick=i=>{i.stopPropagation(),x.paging.page=parseInt(n.dataset.page,10),Z()}})}function W(){const e=document.getElementById("comanda-detail-container");if(!e)return;const t=`
        <div class="mobile-only-header">
            <button data-action="back-to-list" class="btn-back-mobile">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h3 class="font-bold text-lg text-gray-800 ml-2">Detalhes</h3>
        </div>
    `;if(!x.isCashierOpen){e.innerHTML=`
            ${t}
            <div class="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
                <div class="bg-gray-100 p-4 rounded-full mb-4">🔒</div>
                <p class="font-semibold text-lg">Caixa Fechado</p>
                <p class="text-sm mb-6">Abra o caixa para ver detalhes.</p>
                <button data-action="open-cashier" class="py-2 px-6 bg-green-600 text-white font-bold rounded-lg">Abrir Caixa</button>
            </div>
        `;return}const a=x.allComandas.find(l=>l.id===x.selectedComandaId);if(!a){e.innerHTML=`
            <div class="hidden lg:flex flex-col items-center justify-center h-full text-center text-gray-400">
                <svg class="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
                <p class="text-lg font-medium">Selecione uma venda</p>
                <p class="text-sm">Toque em um item à esquerda para ver os detalhes</p>
            </div>
        `;return}const s=[...a.services||[],...a.comandaItems||[],...a.items||[]],r=a.status==="completed",o=a.type==="walk-in"||a.id.startsWith("temp-"),n=o?"":`<button data-action="go-to-appointment" data-id="${a.id}" data-date="${a.startTime}" 
                class="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1 mt-1">
             Ir para Agendamento <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
           </button>`,i=s.reduce((l,u)=>{const c=`${u.type}-${u.id||u.name}`;if(!l[c]){const m=(a.services||[]).some(b=>b.id===u.id&&b.name===u.name);l[c]={...u,quantity:0,isOriginalService:m&&u.type==="service"}}return l[c].quantity+=1,l},{}),d=Object.values(i).reduce((l,u)=>l+(u.price||0)*u.quantity,0);e.innerHTML=`
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
                    ${r?`<button data-action="reopen-${a.type}" data-id="${a.id}" class="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200" title="Reabrir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>`:""}
                    ${o&&!r?`<button data-action="delete-walk-in" data-id="${a.id}" class="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200" title="Excluir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`:""}
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("comandas_clientRegistrationForm");t&&t.addEventListener("submit",Pr)}async function Pr(e){e.preventDefault();const t=document.getElementById("comandas_clientRegistrationForm");if(!t)return;const a=t.querySelector('button[type="submit"]'),s={establishmentId:p.establishmentId,name:t.querySelector("#regClientName").value.trim(),email:t.querySelector("#regClientEmail").value.trim()||null,phone:t.querySelector("#regClientPhone").value.trim(),dob:`${t.querySelector("#regClientDobDay").value.trim()}/${t.querySelector("#regClientDobMonth").value.trim()}`,notes:t.querySelector("#regClientNotes").value.trim()||null};if(!s.name||!s.phone)return g("Erro de Validação","Nome e Telefone são obrigatórios.","error");a.disabled=!0,a.textContent="A salvar...";try{const r=await ma(s);x.clients.push({id:r.id,...s}),g("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",wo(r.id)}catch(r){g(`Erro ao cadastrar cliente: ${r.message}`,"error")}finally{a.disabled=!1,a.textContent="Salvar Cliente"}}function Ar(){if(!x.isCashierOpen){g("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");return}const{modalElement:e,close:t}=N({title:"Adicionar Item à Comanda",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-4xl"}),a=()=>{let r="";const o=e.querySelector("#add-item-content"),n={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',package:'<svg class="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'},i=()=>{const d=r.toLowerCase(),l=c=>c.filter(m=>m.name.toLowerCase().includes(d)),u={"modal-service-list":{items:l(x.catalog.services),type:"service"},"modal-product-list":{items:l(x.catalog.products),type:"product"},"modal-package-list":{items:l(x.catalog.packages),type:"package"}};for(const[c,{items:m,type:b}]of Object.entries(u)){const f=o.querySelector(`#${c}`);f&&(f.innerHTML=m.map(v=>`
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
            </div>`,i(),o.querySelector("#item-search-input").addEventListener("input",d=>{r=d.target.value,i()})},s=r=>{let o=1;const n=e.querySelector("#add-item-content"),i=()=>{document.getElementById("quantity-display").textContent=o,document.getElementById("quantity-minus-btn").disabled=o<=1};n.innerHTML=`
            <div class="text-center p-8 relative">
                <button data-action="back-to-catalog" class="absolute top-5 left-5 text-gray-600 hover:text-gray-900">&larr; Voltar</button>
                <h3 class="font-bold text-2xl text-gray-800">${r.name}</h3>
                <p class="text-lg text-gray-500">R$ ${r.price.toFixed(2)}</p>
                <div class="my-8 flex items-center justify-center gap-4">
                    <button id="quantity-minus-btn" class="w-12 h-12 rounded-full bg-gray-200 text-3xl font-bold text-gray-600 hover:bg-gray-300">-</button>
                    <span id="quantity-display" class="text-4xl font-bold w-20 text-center">${o}</span>
                    <button id="quantity-plus-btn" class="w-12 h-12 rounded-full bg-gray-200 text-3xl font-bold text-gray-600 hover:bg-gray-300">+</button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Adicionar à Comanda</button>
            </div>
        `,document.getElementById("quantity-minus-btn").onclick=()=>{o>1&&(o--,i())},document.getElementById("quantity-plus-btn").onclick=()=>{o++,i()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await jr(r,o),t()}};e.addEventListener("click",r=>{const o=r.target.closest('[data-action="select-item-for-quantity"]'),n=r.target.closest('[data-action="back-to-catalog"]');if(o){const{itemType:i,itemId:d}=o.dataset,u=(x.catalog[i+"s"]||[]).find(c=>c.id===d);u&&s({...u,type:i})}else n&&a()}),a()}async function wo(e=null){if(!x.isCashierOpen){g("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");return}if(!x.clients||x.clients.length===0)try{x.clients=await tt(p.establishmentId)}catch{g("Erro","Não foi possível carregar dados de clientes.","error");return}if(!p.professionals||p.professionals.length===0)try{p.professionals=await G(p.establishmentId)}catch{g("Erro","Não foi possível carregar dados de profissionais.","error");return}const t=x.clients.map(n=>{const i=n.id===e?"selected":"";return`<option value="${n.id}" ${i}>${n.name} - ${n.phone}</option>`}).join(""),a=p.professionals.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""),s=`
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
    `,{modalElement:r}=N({title:"Nova Venda Avulsa",contentHTML:s,maxWidth:"max-w-md"});r.querySelector("#new-sale-form").addEventListener("submit",zr);const o=r.querySelector('[data-action="new-client-from-sale"]');o&&o.addEventListener("click",n=>{n.preventDefault(),r.style.display="none",Dr()})}function qr(){if(!x.isCashierOpen){g("Caixa Fechado","Abra o caixa antes de finalizar pagamentos.","error");return}const e=x.allComandas.find(l=>l.id===x.selectedComandaId);if(!e)return;const a=[...e.services||[],...e.comandaItems||[],...e.items||[]].reduce((l,u)=>l+(u.price||0),0);let s=[],r={remainingAmount:a,selectedMethod:"dinheiro",installments:1,amountReceived:""};const o=()=>{const l=document.getElementById("payment-list"),u=document.getElementById("remaining-amount"),c=document.getElementById("finalize-checkout-btn"),m=document.getElementById("change-container"),b=document.getElementById("installments-container"),f=document.getElementById("payment-value"),v=document.getElementById("payment-controls"),k=s.reduce((y,E)=>y+E.value,0);r.remainingAmount=a-k,l.innerHTML=s.map((y,E)=>`
            <div class="flex justify-between items-center bg-gray-100 p-2 rounded-md animate-fade-in-fast">
                <span class="font-medium text-sm">${y.method.charAt(0).toUpperCase()+y.method.slice(1)} ${y.installments>1?`(${y.installments}x)`:""}</span>
                <div class="flex items-center gap-2">
                    <span class="font-semibold">R$ ${y.value.toFixed(2)}</span>
                    <button data-action="remove-payment" data-payment-index="${E}" class="text-red-500 font-bold">&times;</button>
                </div>
            </div>`).join(""),r.remainingAmount<=.001?(u.textContent="Total Pago!",u.className="text-lg font-bold text-center mb-4 text-green-600",f.value="",c.disabled=!1,v&&(v.style.display="none")):(u.textContent=`Faltam: R$ ${r.remainingAmount.toFixed(2)}`,u.className="text-lg font-bold text-center mb-4 text-red-600",f.value=r.remainingAmount.toFixed(2),c.disabled=!0,v&&(v.style.display="block")),document.querySelectorAll(".payment-method-btn").forEach(y=>{y.classList.toggle("ring-2",y.dataset.method===r.selectedMethod),y.classList.toggle("ring-offset-2",y.dataset.method===r.selectedMethod)}),b.style.display=["credito","crediario"].includes(r.selectedMethod)?"block":"none",m.style.display=r.selectedMethod==="dinheiro"&&r.remainingAmount>0?"block":"none";const h=parseFloat(r.amountReceived)-r.remainingAmount;document.getElementById("change-value").textContent=`R$ ${h>0?h.toFixed(2):"0.00"}`},n=()=>{const l=document.getElementById("payment-value");let u=parseFloat(l.value);if(isNaN(u)||u<=0){g("Valor Inválido","Insira um valor de pagamento válido e maior que zero.","error");return}if(u>r.remainingAmount+.001){g("Valor Inválido","O valor excede o saldo restante.","error");return}const c={method:r.selectedMethod,value:u};["credito","crediario"].includes(r.selectedMethod)&&r.installments>1&&(c.installments=r.installments),s.push(c),r.selectedMethod="dinheiro",r.installments=1,document.getElementById("installments-select").value=1,o()},i=`
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
            <div id="installments-container" class="hidden"><label class="text-sm font-medium">Parcelas</label><select id="installments-select" class="w-full p-2 border rounded-md bg-white mt-1">${Array.from({length:12},(l,u)=>`<option value="${u+1}">${u+1}x</option>`).join("")}</select></div>
            <div class="flex items-end gap-2">
                <div class="flex-grow"><label class="text-sm font-medium">Valor a Adicionar</label><input type="number" step="0.01" id="payment-value" class="w-full p-2 border rounded-md text-lg font-bold"></div>
                <button id="add-payment-btn" class="py-2 px-4 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800">Adicionar</button>
            </div>
            <div id="change-container" class="hidden mt-2 p-3 bg-blue-50 rounded-lg"><label class="text-sm">Valor Recebido</label><input type="number" id="amount-received" class="w-full p-2 border rounded-md text-lg" /><p class="flex justify-between mt-2 font-semibold"><span>Troco:</span><strong id="change-value" class="text-blue-600">R$ 0.00</strong></p></div>
        </div>
        <div class="mt-6 pt-4 border-t"><button id="finalize-checkout-btn" class="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled>Finalizar</button></div>
    `,{modalElement:d}=N({title:"Finalizar Pagamento",contentHTML:i,maxWidth:"max-w-md"});document.getElementById("payment-value").value=r.remainingAmount.toFixed(2),d.addEventListener("click",l=>{const u=l.target.closest(".payment-method-btn");u&&(r.selectedMethod=u.dataset.method,r.installments=1,document.getElementById("installments-select").value=1,o()),l.target.closest("#add-payment-btn")&&n(),l.target.closest('[data-action="remove-payment"]')&&(s.splice(parseInt(l.target.closest('[data-action="remove-payment"]').dataset.paymentIndex,10),1),o()),l.target.closest("#finalize-checkout-btn")&&Or(e,a,s)}),d.addEventListener("change",l=>{l.target.id==="installments-select"&&(r.installments=parseInt(l.target.value,10))}),d.addEventListener("input",l=>{l.target.id==="amount-received"&&(r.amountReceived=l.target.value,o())}),o()}async function Nr(){const e=`
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
    `,{modalElement:t}=N({title:"Abrir Caixa",contentHTML:e,maxWidth:"max-w-md"});t.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const s=document.getElementById("initial-amount"),r=s.value.trim(),o=document.getElementById("cashier-notes").value.trim(),n=parseFloat(r);if(r===""||isNaN(n)||n<0){g("Valor Inválido","Por favor, insira um valor inicial válido (maior ou igual a R$ 0,00).","error"),s.focus();return}try{const i={establishmentId:p.establishmentId,initialAmount:parseFloat(n.toFixed(2))};o&&(i.notes=o);const d=await kr(i);x.isCashierOpen=!0,x.activeCashierSessionId=d.id,await ga(),document.getElementById("genericModal").style.display="none",g("Sucesso!",`Caixa aberto com valor inicial de R$ ${n.toFixed(2)}`,"success")}catch(i){g("Erro",`Não foi possível abrir o caixa: ${i.message}`,"error")}})}async function Fr(){const e=x.activeCashierSessionId;if(e)try{const t=await $r(e),a=`
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
        `,{modalElement:s}=N({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-md"});s.querySelector("#close-cashier-form").addEventListener("submit",async r=>{r.preventDefault();const o=parseFloat(document.getElementById("final-amount").value);if(isNaN(o)||o<0){g("Valor Inválido","Insira um valor final válido.","error");return}try{await Sr(e,o),x.isCashierOpen=!1,x.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",await ga(),g("Sucesso!","Caixa fechado com sucesso!","success")}catch(n){g("Erro",`Não foi possível fechar o caixa: ${n.message}`,"error")}})}catch(t){g("Erro",`Não foi possível carregar o relatório de fecho: ${t.message}`,"error")}}async function Rr(e){x.activeFilter!==e&&(x.activeFilter=e,x.paging.page=1,document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${e}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",e!=="finalizadas"),ge(),await Z(),x.selectedComandaId=null,W())}function Qt(e){x.selectedComandaId=e,le(),Br(),W()}async function jr(e,t){const a=x.allComandas.find(r=>r.id===x.selectedComandaId);if(!a)return;const s=Array(t).fill(0).map(()=>({id:e.id,name:e.name,price:e.price,type:e.type}));if(a.comandaItems=a.comandaItems||[],a.comandaItems.push(...s),a.type==="walk-in"&&a.id.startsWith("temp-")){g("Sucesso",`${t}x ${e.name} adicionado(s)!`,"success"),W(),le();return}try{await da(a.id,a),g("Sucesso",`${t}x ${e.name} adicionado(s)!`,"success"),W(),le()}catch(r){g("Erro",`Não foi possível adicionar o item: ${r.message}`,"error"),a.comandaItems.splice(a.comandaItems.length-t,t)}}async function Hr(e,t){const a=x.allComandas.find(o=>o.id===x.selectedComandaId);if(!a)return;let s=!1,r=(a.comandaItems||[]).findIndex(o=>o.id===e&&o.type===t);if(r>-1)a.comandaItems.splice(r,1),s=!0;else{let o=(a.services||[]).findIndex(n=>n.id===e);if(o>-1)a.services.splice(o,1),s=!0;else{let n=(a.items||[]).findIndex(i=>i.id===e&&i.type===t);n>-1&&(a.items.splice(n,1),s=!0)}}if(s){if(a.type==="walk-in"&&a.id.startsWith("temp-")){g("Sucesso","Item removido!","success"),W(),le();return}try{await da(a.id,a),g("Sucesso","Item removido!","success"),W(),le()}catch(o){g("Erro",`Não foi possível remover o item: ${o.message}`,"error"),await Z()}}}async function Or(e,t,a){const s=e.type==="appointment",r=[...e.services||[],...e.comandaItems||[],...e.items||[]],o={payments:a,totalAmount:t,items:r,cashierSessionId:x.activeCashierSessionId};try{s?await is(e.id,o):(o.clientName=e.clientName,o.professionalId=e.professionalId,o.clientPhone=e.clientPhone,await gr(o)),g("Sucesso!","Venda finalizada com sucesso!","success"),document.getElementById("genericModal").style.display="none",ge(),x.selectedComandaId=null,await Z()}catch(n){g("Erro no Checkout",n.message,"error")}}async function zr(e){e.preventDefault();const t=document.getElementById("new-sale-client").value,a=document.getElementById("new-sale-professional").value,s=x.clients.find(n=>n.id===t),r=p.professionals.find(n=>n.id===a);if(!s||!r){g("Erro","Selecione um cliente e um profissional válidos.","error");return}const o={id:`temp-${Date.now()}`,type:"walk-in",clientName:s.name,clientPhone:s.phone,professionalId:r.id,professionalName:r.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};x.allComandas.unshift(o),x.selectedComandaId=o.id,document.getElementById("genericModal").style.display="none",Qt(o.id)}async function Z(){const e=document.getElementById("comandas-list");e.innerHTML='<div class="loader mx-auto mt-10"></div>';const t=x.activeFilter==="finalizadas"?document.getElementById("filter-date").value:null;try{const a=await yo();if(x.isCashierOpen=!!a,x.activeCashierSessionId=a?a.id:null,Mr(),!x.isCashierOpen&&x.activeFilter==="atendimento"){le(),W();return}const s=await pr(p.establishmentId,t,x.paging.page,x.paging.limit);if(x.allComandas=s.data||s,x.paging.total=s.total||s.length,x.catalog.services.length===0){const[r,o,n,i,d]=await Promise.all([De(p.establishmentId),Tt(p.establishmentId),xo(p.establishmentId),tt(p.establishmentId),G(p.establishmentId)]);x.catalog={services:r,products:o,packages:n},x.clients=i,p.professionals=d}le(),x.selectedComandaId,W()}catch(a){g("Erro de Carregamento",`Não foi possível carregar os dados: ${a.message}`,"error"),e.innerHTML=`<p class="text-red-500 p-4">${a.message}</p>`}}async function ga(e={}){xe=document.getElementById("content");try{const t=await yo();x.isCashierOpen=!!t,x.activeCashierSessionId=t?t.id:null}catch(t){console.error("Erro ao verificar caixa:",t),x.isCashierOpen=!1}x.selectedComandaId=e.selectedAppointmentId||null,Tr(),ye&&(xe.removeEventListener("click",ye),xe.removeEventListener("change",ye)),ye=async t=>{const a=t.target.closest("[data-action], [data-filter], [data-comanda-id], [data-id]");if(t.target.id==="filter-date"&&x.activeFilter==="finalizadas"){x.paging.page=1,await Z();return}if(a){if(a.matches("[data-filter]"))Rr(a.dataset.filter);else if(a.matches("[data-comanda-id]")){if(t.target.closest('[data-action="go-to-appointment"]')){t.stopPropagation();return}Qt(a.dataset.comandaId)}else if(a.matches("[data-action]")){const s=a.dataset.action,r=a.dataset.id||x.selectedComandaId;switch(s){case"back-to-list":{ge(),x.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach(o=>o.classList.remove("selected")),W();break}case"new-sale":wo();break;case"add-item":Ar();break;case"checkout":qr();break;case"open-cashier":Nr();break;case"close-cashier":await Fr();break;case"view-sales-report":j("sales-report-section");break;case"remove-item":await Hr(a.dataset.itemId,a.dataset.itemType);break;case"reopen-appointment":{if(await M("Reabrir Comanda","Tem certeza? O pagamento será estornado e os produtos devolvidos ao estoque."))try{await ns(r);const n=x.allComandas.findIndex(i=>i.id===r);n!==-1&&(delete x.allComandas[n].transaction,delete x.allComandas[n].cashierSessionId,delete x.allComandas[n].redeemedReward,x.allComandas[n].status="confirmed"),x.selectedComandaId=null,ge(),g("Sucesso!","Comanda reaberta para edição.","success"),await Z()}catch(n){g("Erro",`Não foi possível reabrir: ${n.message}`,"error")}break}case"reopen-walk-in":{if(await M("Reabrir Venda","Tem certeza? A venda será cancelada e os produtos devolvidos ao estoque."))try{await br(r),g("Sucesso!","Venda revertida."),ge(),x.selectedComandaId=null,await Z()}catch(n){g("Erro",`Não foi possível reabrir: ${n.message}`,"error")}break}case"go-to-appointment":{const o=a.dataset.id,n=a.dataset.date;j("agenda-section",{scrollToAppointmentId:o,targetDate:new Date(n)});break}case"delete-walk-in":{if(await M("Excluir Venda","Tem certeza que deseja excluir esta venda avulsa? O estoque dos produtos será devolvido."))if(r.startsWith("temp-"))x.allComandas=x.allComandas.filter(n=>n.id!==r),x.selectedComandaId=null,le(),W(),g("Sucesso","Venda avulsa removida.","success"),ge();else try{await fr(r),g("Sucesso","Venda avulsa excluída com sucesso.","success"),x.selectedComandaId=null,ge(),await Z()}catch(n){g("Erro",`Não foi possível excluir: ${n.message}`,"error")}break}}}}},xe.addEventListener("click",ye),xe.addEventListener("change",ye),e.initialFilter&&(x.activeFilter=e.initialFilter==="finalizadas"?"finalizadas":"atendimento"),e.selectedAppointmentId&&(x.selectedComandaId=e.selectedAppointmentId),document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${x.activeFilter}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",x.activeFilter!=="finalizadas"),e.filterDate&&(document.getElementById("filter-date").value=new Date(e.filterDate).toISOString().split("T")[0]),await Z(),x.selectedComandaId&&Qt(x.selectedComandaId)}const Mt=document.getElementById("content");let ie={},Vr=null,Ur=null,q={year:null,month:null,monthName:null,professionalId:null,professionalName:null},Aa=[];const we=["#4f46e5","#22c55e","#f97316","#06b6d4","#e11d48","#6366f1","#84cc16","#f59e0b"];function ba(){Object.values(ie).forEach(e=>e?.destroy()),ie={}}function Jr(e){const t=document.getElementById("kpi-revenue"),a=document.getElementById("kpi-transactions"),s=document.getElementById("kpi-popular-item");t&&(t.textContent=`R$ ${e.totalRevenue.toFixed(2)}`),a&&(a.textContent=e.totalTransactions),s&&(s.textContent=e.mostPopularItem||"N/A"),document.querySelectorAll(".kpi-loader").forEach(r=>r.classList.add("hidden")),document.querySelectorAll(".kpi-value").forEach(r=>r.classList.remove("hidden"))}function _r(e){const t="Detalhes da Transação",a=`
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
    `;N({title:t,contentHTML:a,maxWidth:"max-w-md"})}async function Ye(e,t,a){q={year:e,month:t,monthName:a},Mt.innerHTML=`
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
        </section>`,document.getElementById("backToMainBtn").addEventListener("click",Zt);try{const s=await As(p.establishmentId,e,t);Ur=s,document.querySelector(".loader-container").classList.add("hidden"),document.getElementById("monthly-details-view").classList.remove("hidden");const r=s.revenueByDay.map(m=>m.day),o=s.revenueByDay.map(m=>m.revenue),n=s.salesByProfessional.map(m=>m.name),i=s.salesByProfessional.map(m=>m.count),d=s.topItems.map(m=>m.name),l=s.topItems.map(m=>m.count),u=["Agendamentos","Vendas Avulsas"],c=[s.revenueByTransactionType.appointment,s.revenueByTransactionType.sales];ba(),ie.monthlyRevenue=new Chart(document.getElementById("monthlyRevenueChart").getContext("2d"),{type:"bar",data:{labels:r,datasets:[{label:"Receita Diária",data:o,backgroundColor:we[0]}]},options:{responsive:!0,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}},onClick:(m,b)=>{if(b.length>0){const f=r[b[0].index];Wr(e,t,f)}}}}),ie.salesByProfessional=new Chart(document.getElementById("salesByProfessionalChart").getContext("2d"),{type:"pie",data:{labels:n,datasets:[{label:"Vendas",data:i,backgroundColor:we,hoverOffset:16}]},options:{responsive:!0,plugins:{legend:{position:"right"}},onClick:(m,b)=>{if(b.length>0){const f=b[0].index,v=s.salesByProfessional[f];v&&Gr(e,t,v.id,v.name)}}}}),ie.topItems=new Chart(document.getElementById("topItemsChart").getContext("2d"),{type:"bar",data:{labels:d,datasets:[{label:"Itens Vendidos",data:l,backgroundColor:we[2]}]},options:{indexAxis:"y",responsive:!0,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0}}}}),ie.revenueByType=new Chart(document.getElementById("revenueByTypeChart").getContext("2d"),{type:"doughnut",data:{labels:u,datasets:[{label:"Receita por Tipo",data:c,backgroundColor:[we[1],we[3]],hoverOffset:16}]},options:{responsive:!0,plugins:{legend:{position:"right"}}}})}catch(s){g("Erro",`Não foi possível carregar os detalhes do mês: ${s.message}`,"error"),Zt()}}async function Wr(e,t,a){q={...q,day:a},Mt.innerHTML=`
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
        </section>`,document.getElementById("backToMonthlyBtn").addEventListener("click",()=>{Ye(q.year,q.month,q.monthName)});try{const s=await qs(p.establishmentId,e,t,a);Aa=s.transactions,document.querySelector(".loader-container").classList.add("hidden"),document.getElementById("daily-details-view").classList.remove("hidden"),document.getElementById("daily-total-transactions").textContent=s.summary.totalTransactions,document.getElementById("daily-total-revenue").textContent=`R$ ${s.summary.totalRevenue.toFixed(2)}`;const r=document.getElementById("daily-transactions-list");r.innerHTML=s.transactions.map((o,n)=>`
            <tr class="border-b hover:bg-gray-50 cursor-pointer" data-index="${n}">
                <td class="px-2 py-2">${new Date(o.date).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</td>
                <td class="px-2 py-2">${o.client}</td>
                <td class="px-2 py-2">${o.professionalName||"N/A"}</td>
            </tr>
        `).join(""),document.querySelectorAll("#daily-transactions-list tr").forEach(o=>{o.addEventListener("click",n=>{const i=n.currentTarget.getAttribute("data-index"),d=Aa[i];d&&_r(d)})})}catch(s){g("Erro",`Não foi possível carregar os detalhes diários: ${s.message}`,"error"),Ye(q.year,q.month,q.monthName)}}async function Gr(e,t,a,s){q={year:e,month:t,professionalId:a,professionalName:s},Mt.innerHTML=`
        <section>
            <div class="flex justify-between items-center mb-6">
                <button id="backToMonthlyBtn" class="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">
                    < Voltar
                </button>
                <h2 class="text-3xl font-bold text-gray-800">Relatório de ${s}</h2>
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
        </section>`,document.getElementById("backToMonthlyBtn").addEventListener("click",()=>{Ye(q.year,q.month,q.monthName)});try{const r=await Ns(p.establishmentId,e,t,a);document.querySelector(".loader-container").classList.add("hidden"),document.getElementById("professional-details-view").classList.remove("hidden"),document.getElementById("prof-total-transactions").textContent=r.summary.totalTransactions,document.getElementById("prof-total-revenue").textContent=`R$ ${r.summary.totalRevenue.toFixed(2)}`;const o=document.getElementById("prof-transactions-list");o.innerHTML=r.transactions.map(n=>`
            <tr class="border-b hover:bg-gray-50">
                <td class="px-2 py-2">${new Date(n.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
                <td class="px-2 py-2">${n.client}</td>
                <td class="px-2 py-2">${n.items}</td>
                <td class="px-2 py-2 text-right">R$ ${n.value.toFixed(2)}</td>
            </tr>
        `).join("")}catch(r){g("Erro",`Não foi possível carregar os detalhes do profissional: ${r.message}`,"error"),Ye(q.year,q.month,q.monthName)}}async function Yr(e,t,a){const s=t.getElementsAtEventForMode(e,"nearest",{intersect:!0},!1);if(s.length>0){const o=s[0].index,n=a[o];n&&await Ye(n.year,n.monthIndex,n.month)}}async function qa(){const e=document.getElementById("main-reports-view"),t=document.getElementById("startDate"),a=document.getElementById("endDate");if(!e||!t||!a){console.error("Elementos essenciais para o relatório não foram encontrados no DOM.");return}e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';const s=t.value,r=a.value;if(!s||!r)return e.innerHTML='<p class="text-red-500 p-8 text-center">Selecione as datas para gerar o relatório.</p>',g("Atenção","Por favor, selecione as datas de início e fim.","error");try{const o=await Ds(p.establishmentId,s,r);Vr=o,e.innerHTML=`
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
            </div>`,Jr(o.kpis),setTimeout(()=>{const n=document.getElementById("transactionsByMonthChart");n&&(ba(),ie.main=new Chart(n.getContext("2d"),{type:"bar",data:{labels:o.transactionsByMonth.map(i=>i.month),datasets:[{label:"Receita Total",data:o.transactionsByMonth.map(i=>i.revenue),backgroundColor:we[0],borderRadius:5}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:i=>`R$ ${i.raw.toFixed(2)}`}}},scales:{y:{beginAtZero:!0}},onClick:(i,d)=>Yr(i,ie.main,o.transactionsByMonth)}}))},50)}catch(o){g("Erro",`Não foi possível carregar os relatórios: ${o.message}`,"error"),e.innerHTML='<p class="text-red-500 p-8 text-center">Erro ao carregar os dados dos relatórios. Por favor, tente novamente.</p>'}}async function Zt(){ba();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];Mt.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",qa),await qa()}const Dt=(e,t="products")=>w(`/api/${t}/categories/${e}`),ko=(e,t="products")=>w(`/api/${t}/categories`,{method:"POST",body:JSON.stringify(e)}),So=(e,t="products")=>w(`/api/${t}/categories/${e}`,{method:"DELETE"}),Xr="audit_logs",Te=async(e,t,a,s,r,o=null)=>{try{if(!t)return;await io(Ke(de,Xr),{establishmentId:e,userId:t.uid,userName:t.name||t.email||"Utilizador",module:a,action:s,description:r,details:o,timestamp:new Date})}catch(n){console.error("Falha silenciosa ao registar log:",n)}},pe=document.getElementById("content");let se=null,Re="services",fe="all";function Me(){const e=J.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}async function Qr(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),s=a.value;if(s)try{await ko({establishmentId:p.establishmentId,name:s},"services"),Te(p.establishmentId,Me(),"Categorias (Serviços)","Criou",`Criou categoria: ${s}`),a.value="",g("Sucesso","Categoria criada!","success"),await fa(),await ot()}catch(r){g("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}}async function Zr(e){if(await M("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await So(e,"services"),Te(p.establishmentId,Me(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${e})`),g("Sucesso","Categoria apagada.","success"),await fa(),await ot()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function fa(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await Dt(p.establishmentId,"services");p.serviceCategories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${a.name}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function Kr(){N({title:"Gerir Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",Qr),t.addEventListener("click",s=>{const r=s.target.closest('button[data-action="delete-category"]');r&&(s.preventDefault(),Zr(r.dataset.id))}))}fa()}async function en(e){e.preventDefault();const t=e.target.closest("#serviceModal"),a=t.querySelector("#serviceId").value,s={},r=t.querySelector('input[name="commissionType"]:checked').value;r==="custom"&&t.querySelectorAll(".professional-commission-row").forEach(n=>{const i=n.dataset.profId;if(n.querySelector('input[type="checkbox"]').checked){const l=parseFloat(n.querySelector('input[type="number"]').value);s[i]=isNaN(l)?0:l}});const o={establishmentId:p.establishmentId,name:t.querySelector("#serviceName").value,price:parseFloat(t.querySelector("#servicePrice").value),duration:parseInt(t.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(t.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:t.querySelector("#serviceCategory").value||null,commissionRate:parseFloat(t.querySelector("#serviceCommissionRate").value)||0,active:t.querySelector("#serviceStatus").value==="true",photo:t.querySelector("#servicePhotoBase64").value,notes:t.querySelector("#serviceNotes").value,commissionType:r,professionalCommissions:s};try{a?(await js(a,o),Te(p.establishmentId,Me(),"Serviços","Editou",`Editou o serviço: ${o.name}`)):(await Rs(o),Te(p.establishmentId,Me(),"Serviços","Criou",`Criou novo serviço: ${o.name}`)),document.getElementById("serviceModal").style.display="none",g("Sucesso",`Serviço ${a?"atualizado":"adicionado"} com sucesso!`,"success"),await ot()}catch(n){g("Erro",n.message,"error")}}function tn(e,t=800,a=800,s="image/jpeg",r=.8){return new Promise((o,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=d=>{const l=new Image;l.onload=()=>{let u=l.width,c=l.height;u>c?u>t&&(c*=t/u,u=t):c>a&&(u*=a/c,c=a);const m=document.createElement("canvas");m.width=u,m.height=c,m.getContext("2d").drawImage(l,0,0,u,c);const f=m.toDataURL(s,r);o(f)},l.onerror=u=>n(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},i.onerror=d=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function Na(e=null){const t=document.getElementById("serviceModal"),a=p.serviceCategories||[],s=e?.duration||0,r=e?.bufferTime||0,o=a.map(h=>`<option value="${h.id}" ${e?.categoryId===h.id?"selected":""}>${h.name}</option>`).join("");t.innerHTML=`
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
                            <input type="number" id="serviceDurationMinutes" min="0" value="${s}" class="mt-1 w-full p-2 border rounded-md" required>
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
    </div>`,t.style.display="flex",t.addEventListener("click",async h=>{const y=h.target.closest("button[data-action]");if(!y)return;const E=y.dataset.action,$=y.dataset.id;if(E==="close-modal"&&(t.style.display="none"),E==="delete-service"){if(!$)return;if(t.style.display="none",await M("Apagar Serviço","Tem a certeza que deseja apagar este serviço?"))try{const B=p.services.find(H=>H.id===$)?.name||"Desconhecido";await Hs($),Te(p.establishmentId,Me(),"Serviços","Excluiu",`Excluiu o serviço: ${B}`),g("Sucesso","Serviço apagado com sucesso!","success"),await ot()}catch(B){g("Erro",`Não foi possível apagar o serviço: ${B.message}`,"error")}else t.style.display="flex"}});const n=t.querySelectorAll(".tab-btn"),i=t.querySelectorAll(".tab-content");n.forEach(h=>{h.addEventListener("click",()=>{n.forEach(y=>{y.classList.remove("border-indigo-500","text-indigo-600"),y.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),h.classList.add("border-indigo-500","text-indigo-600"),h.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),i.forEach(y=>y.classList.add("hidden")),document.getElementById(`tab-content-${h.dataset.tab}`).classList.remove("hidden")})});const d=t.querySelectorAll('input[name="commissionType"]'),l=document.getElementById("defaultCommissionRateContainer"),u=document.getElementById("professionalCommissionsContainer");function c(){const h=t.querySelector('input[name="commissionType"]:checked').value;l&&(l.style.display=h==="default"?"block":"none"),u&&(u.style.display=h==="custom"?"block":"none")}d.forEach(h=>h.addEventListener("change",c));const m=document.getElementById("professionalCommissionsList");m&&(m.innerHTML=(p.professionals||[]).map(h=>{const y=e?.professionalCommissions?.[h.id]!==void 0,E=e?.professionalCommissions?.[h.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-md ${y?"bg-blue-50":""}" data-prof-id="${h.id}">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" ${y?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <img src="${h.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${h.name.charAt(0)}`}" class="w-8 h-8 rounded-full object-cover">
                        <span class="text-sm font-medium">${h.name}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${E}" class="w-20 p-1 border rounded-md text-sm text-center" ${y?"":"disabled"}>
                        <span class="text-sm font-semibold">%</span>
                    </div>
                </div>
            `}).join(""),m.querySelectorAll('input[type="checkbox"]').forEach(h=>{h.addEventListener("change",y=>{const E=y.target.closest(".professional-commission-row");E.querySelector('input[type="number"]').disabled=!y.target.checked,E.classList.toggle("bg-blue-50",y.target.checked)})})),c();const b=t.querySelector("#serviceForm"),f=t.querySelector("#servicePhotoInput"),v=t.querySelector("#servicePhotoPreview"),k=t.querySelector("#servicePhotoBase64");t.querySelector("#servicePhotoButton").addEventListener("click",()=>f.click()),f.onchange=async()=>{const h=f.files[0];if(h){v.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const y=await tn(h,800,800,"image/jpeg",.8),$=y.length*3/4,L=1e3*1024;if($>L)throw new Error("A imagem é muito grande mesmo após a compressão.");v.src=y,k.value=y}catch(y){console.error("Erro ao processar imagem:",y),g("Erro de Imagem",y.message||"Não foi possível processar a imagem.","error"),v.src=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",k.value=e?.photo||"",f.value=""}}},b.addEventListener("submit",en)}function ke(){const e=document.getElementById("servicesList");if(!e)return;const t=document.getElementById("serviceSearchInput")?.value.toLowerCase()||"",a=document.getElementById("serviceCategoryFilter")?.value||"all",s=new Map((p.serviceCategories||[]).map(o=>[o.id,o.name]));let r=(p.services||[]).filter(Boolean);if(fe!=="all"){const o=fe==="active";r=r.filter(n=>n.active!==!1===o)}r=r.filter(o=>{const n=o.name.toLowerCase().includes(t),i=a==="all"||o.categoryId===a;return n&&i}),e.innerHTML="",r.length>0?r.forEach(o=>{const n=document.createElement("div"),i=JSON.stringify(o).replace(/'/g,"&apos;");n.className=`service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 ${o.active!==!1?"opacity-100":"opacity-50 bg-gray-100"} sm:flex-col`,n.dataset.action="edit-service",n.dataset.service=i;const d=o.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(o.name.charAt(0))}`,l=s.get(o.categoryId)||"N/A";n.innerHTML=`
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
                </div>`,e.appendChild(n)}):e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>'}function va(){const e={active:0,inactive:0,total:0},t=(p.services||[]).filter(Boolean);t.forEach(n=>{n.active===!1?e.inactive++:e.active++}),e.total=t.length;const a=document.getElementById("indicator-total"),s=document.getElementById("indicator-active"),r=document.getElementById("indicator-inactive"),o=document.getElementById("indicator-popular");a&&(a.textContent=e.total),s&&(s.textContent=e.active),r&&(r.textContent=e.inactive),o&&(p.mostPopularService&&p.mostPopularService.name!=="N/A"?(o.textContent=p.mostPopularService.name,o.closest(".indicator-card").title=`${p.mostPopularService.name} (${p.mostPopularService.count} agendamentos)`):(o.textContent="N/A",o.closest(".indicator-card").title="Nenhum serviço agendado ainda"))}function an(){const e=document.getElementById("services-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("serviceCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(p.serviceCategories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${a.name}</option>`)),va(),ke()}function on(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="p-8 text-center">
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2">Em breve, aqui poderás ver relatórios detalhados sobre os teus serviços mais rentáveis, mais agendados e muito mais.</p>
        </div>
    `}async function ot(){const e=document.getElementById("services-content-container");if(e){const t=e.querySelector(".loader");t&&(t.style.display="block")}try{const[t,a,s,r]=await Promise.all([De(p.establishmentId),G(p.establishmentId),Dt(p.establishmentId,"services"),zs(p.establishmentId)]);p.services=(t||[]).filter(Boolean),p.professionals=(a||[]).filter(Boolean),p.serviceCategories=(s||[]).filter(Boolean),p.mostPopularService=r||{name:"N/A",count:0},p.services.forEach(o=>{o.active===void 0&&(o.active=!0)}),Eo(Re)}catch(t){e&&(e.innerHTML='<p class="text-red-500 col-span-full text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>'),g("Erro",`Não foi possível carregar os dados: ${t.message}`,"error")}}function Eo(e){if(document.getElementById("services-content-container")){if(Re===e&&document.getElementById("services-content-container").children.length>1){Re==="services"&&(va(),ke());return}Re=e,fe="all",document.querySelectorAll("#services-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="services"?an():e==="reports"&&on()}}function sn(){se&&(pe.removeEventListener("click",se),pe.removeEventListener("input",se),pe.removeEventListener("change",se)),se=async e=>{const t=e.target;if(t.closest('[data-action="toggle-service-status"]')){e.stopPropagation();const r=t.closest('[data-action="toggle-service-status"]'),o=r.dataset.id,n=r.checked;try{await Os(o,n);const i=p.services.findIndex(d=>d.id===o);i>-1&&(p.services[i].active=n),Te(p.establishmentId,Me(),"Serviços","Atualizou Status",`Alterou status do serviço (ID: ${o}) para ${n?"Ativo":"Inativo"}`),ke(),va()}catch(i){g("Erro",`Não foi possível atualizar o status: ${i.message}`,"error"),r.checked=!n,ke()}return}const a=t.closest("button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]");if(t.id==="serviceSearchInput"||t.id==="serviceCategoryFilter"){ke();return}if(!a)return;if(a.hasAttribute("data-view")){Eo(a.dataset.view);return}switch(a.dataset.action){case"new-service":Na();break;case"edit-service":const r=JSON.parse(a.dataset.service);Na(r);break;case"manage-categories":Kr();break;case"filter-service":const o=a.dataset.filterType;if(o==="popular")return;fe=o==="total"?"all":o,document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(n=>{const i=n.dataset.filterType,l=i===fe||i==="total"&&fe==="all";n.classList.toggle("ring-2",l),n.classList.toggle("ring-indigo-500",l),n.classList.toggle("shadow-lg",l)}),ke();break}},pe.addEventListener("click",se),pe.addEventListener("input",se),pe.addEventListener("change",se)}async function rn(){pe.innerHTML=`
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
        </section>`,sn();try{(!p.professionals||p.professionals.length===0)&&(p.professionals=await G(p.establishmentId)||[])}catch(e){console.error("Falha ao carregar profissionais:",e),g("Erro","Não foi possível carregar a lista de profissionais.","error"),p.professionals=[]}Re="services",fe="all",await ot()}const $o="suppliers",Io="purchases",ha=async()=>{try{const e=await lo(Ke(de,$o)),t=[];return e.forEach(a=>{t.push({id:a.id,...a.data()})}),t}catch(e){throw console.error("Erro ao buscar fornecedores:",e),e}},nn=async e=>{try{const t=la(de,$o,e);return await Wo(t),!0}catch(t){throw console.error("Erro ao excluir fornecedor:",t),t}},ln=async e=>{try{const t={...e,createdAt:new Date};return{id:(await io(Ke(de,Io),t)).id,...t}}catch(t){throw console.error("Erro ao registrar compra:",t),t}},dn=async e=>{try{const t=co(Ke(de,Io),uo("createdAt","desc")),a=await lo(t),s=[];return a.forEach(r=>{s.push({id:r.id,...r.data()})}),s}catch(t){throw console.error("Erro ao buscar histórico de compras:",t),t}},ce=document.getElementById("content");let re=null,je="products",Q="all";async function cn(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),s=a.value;if(s)try{await ko({establishmentId:p.establishmentId,name:s},"products"),a.value="",g("Sucesso","Categoria de produto criada!","success"),await ya(),await st()}catch(r){g("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}}async function un(e){if(await M("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await So(e,"products"),g("Sucesso","Categoria de produto apagada.","success"),await ya(),await st()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function ya(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await Dt(p.establishmentId,"products");p.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${a.name}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function mn(){N({title:"Gerir Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",cn),t.addEventListener("click",s=>{const r=s.target.closest('button[data-action="delete-category"]');r&&un(r.dataset.id)}))}ya()}async function pn(e){if(!e)return;if(await M("Apagar Produto","Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida."))try{await yr(e),g("Sucesso","Produto apagado com sucesso!","success"),await st()}catch(a){g("Erro",`Não foi possível apagar o produto: ${a.message}`,"error")}}async function gn(e){const t=e.querySelector("#productId").value,a=parseInt(e.querySelector("#productCurrentStock").value),s=parseInt(e.querySelector("#productMinStock").value),r=parseInt(e.querySelector("#productMaxStock").value),o=e.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),n=Array.from(o).map(d=>d.dataset.id),i={establishmentId:p.establishmentId,name:e.querySelector("#productName").value,price:parseFloat(e.querySelector("#productPrice").value),costPrice:parseFloat(e.querySelector("#productCostPrice").value)||0,commissionRate:parseFloat(e.querySelector("#productCommissionRate").value)||0,currentStock:isNaN(a)?0:a,minStock:isNaN(s)?0:s,maxStock:isNaN(r)?0:r,categoryId:e.querySelector("#productCategory").value||null,photo:e.querySelector("#productPhotoBase64").value,supplierIds:n};try{t?await hr(t,i):await vr(i),document.getElementById("productModal").style.display="none",g("Sucesso",`Produto ${t?"atualizado":"adicionado"} com sucesso!`,"success"),await st()}catch(d){throw new Error(d.message)}}function Fa(e,t=800,a=800,s="image/jpeg",r=.8){return new Promise((o,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=d=>{const l=new Image;l.onload=()=>{let u=l.width,c=l.height;u>c?u>t&&(c*=t/u,u=t):c>a&&(u*=a/c,c=a);const m=document.createElement("canvas");m.width=u,m.height=c,m.getContext("2d").drawImage(l,0,0,u,c);const f=m.toDataURL(s,r);o(f)},l.onerror=u=>n(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},i.onerror=d=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function Ra(e=null){const t=document.getElementById("productModal"),a=p.categories||[],s=p.suppliers||[],r=a.map(k=>`<option value="${k.id}" ${e?.categoryId===k.id?"selected":""}>${k.name}</option>`).join("");let o=new Set(e?.supplierIds||[]);t.innerHTML=`
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
    </div>`;const n=t.querySelector("#productCategory"),i=t.querySelector("#productPhotoInput");t.querySelector("#productPhotoButton").addEventListener("click",()=>i.click()),n.innerHTML='<option value="">Sem categoria</option>'+(p.categories||[]).map(k=>`<option value="${k.id}" ${e?.categoryId===k.id?"selected":""}>${k.name}</option>`).join(""),e&&(n.value=e.categoryId||"");const d=t.querySelector("#productPhotoPreview");t.querySelector("#productPhotoBase64");const l=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",u=e?.photo||"";i.onchange=async()=>{const k=i.files[0];if(k){d.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const h=await Fa(k,800,800,"image/jpeg",.8),E=h.length*3/4,$=1e3*1024;if(E>$)throw new Error("A imagem é muito grande mesmo após a compressão.");preview.src=h,base64Input.value=h}catch(h){console.error("Erro ao processar imagem:",h),g("Erro de Imagem",h.message||"Não foi possível processar a imagem.","error"),preview.src=l,base64Input.value=u,v.value=""}}};const c=t.cloneNode(!0);t.parentNode.replaceChild(c,t);const m=()=>{const k=c.querySelector("#modalSupplierSearch"),h=c.querySelector("#supplierSearchResults"),y=c.querySelector("#selectedSuppliersList"),E=k.value.toLowerCase();if(E.length>0){const $=s.filter(L=>L.name.toLowerCase().includes(E)&&!o.has(L.id));$.length>0?(h.classList.remove("hidden"),h.innerHTML=$.map(L=>`
                    <div class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 text-sm flex justify-between items-center" data-add-supplier="${L.id}">
                        <span class="font-medium">${L.name}</span>
                        <span class="text-indigo-600 text-xs">+ Adicionar</span>
                    </div>
                `).join("")):(h.classList.remove("hidden"),h.innerHTML='<div class="p-2 text-xs text-gray-500 text-center">Nenhum resultado disponível.</div>')}else h.classList.add("hidden");o.size>0?(y.innerHTML="",o.forEach($=>{const L=s.find(B=>B.id===$);L&&(y.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border p-2 rounded shadow-sm" data-id="${L.id}">
                            <div class="text-sm">
                                <p class="font-bold text-gray-800">${L.name}</p>
                                <p class="text-xs text-gray-500">${L.contactName||""} - ${L.phone||""}</p>
                            </div>
                            <button type="button" class="text-red-500 hover:text-red-700 p-1" data-remove-supplier="${L.id}" title="Remover">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    `)})):y.innerHTML='<p class="text-xs text-gray-400 text-center py-2">Nenhum fornecedor selecionado.</p>'};c.querySelector("#modalSupplierSearch").addEventListener("input",m),c.addEventListener("click",k=>{const h=k.target.closest("[data-add-supplier]");if(h){const E=h.dataset.addSupplier;o.add(E),c.querySelector("#modalSupplierSearch").value="",m()}const y=k.target.closest("[data-remove-supplier]");if(y){const E=y.dataset.removeSupplier;o.delete(E),m()}}),m(),c.addEventListener("click",async k=>{const h=k.target.closest("button[data-action]");if(!h)return;const y=h.dataset.action,E=c.querySelector("#productId").value;if(y==="close-modal"&&(c.style.display="none"),y==="delete-product"){if(!E)return;c.style.display="none",await pn(E)}if(y==="save-product-modal"){const $=c.querySelector("#productForm");if($){if(!$.querySelector("#productName").value||!$.querySelector("#productPrice").value){g("Erro","Nome e Preço de Venda são obrigatórios.","error");return}const L=h.closest('button[data-action="save-product-modal"]');L.disabled=!0,L.textContent="A salvar...";try{await gn($)}catch(B){g("Erro",`Falha ao salvar: ${B.message}`,"error"),L.disabled=!1,L.textContent="Salvar Alterações"}}}if(y==="adjust-stock-modal"){k.preventDefault();const $=c.querySelector("#stockAdjustmentAmount"),L=c.querySelector("#stockAdjustmentReason"),B=parseInt($.value,10),H=parseInt(h.dataset.change,10);if(!B||B<=0){g("Erro","Por favor, insira uma quantidade válida.","error");return}const T=B*H,P=L.value||(T>0?"Entrada manual":"Saída manual");try{await xr(E,{change:T,reason:P});const A=p.products.findIndex(O=>O.id===E);if(A>-1){const O=p.products[A].currentStock+T;p.products[A].currentStock=O,c.querySelector("#currentStockDisplay").textContent=O,c.querySelector("#productCurrentStock").value=O,$.value="",L.value="",g("Sucesso","Estoque atualizado!","success"),xa(),Xe()}}catch(A){g("Erro de Stock",A.message,"error")}}});const b=c.querySelectorAll(".tab-btn"),f=c.querySelectorAll(".tab-content");b.forEach(k=>{k.addEventListener("click",h=>{h.preventDefault(),b.forEach(y=>{y.classList.remove("border-indigo-500","text-indigo-600"),y.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),k.classList.add("border-indigo-500","text-indigo-600"),k.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),f.forEach(y=>y.classList.add("hidden")),document.getElementById(`tab-content-${k.dataset.tab}`).classList.remove("hidden")})});const v=c.querySelector("#productPhotoInput");c.querySelector("#productPhotoButton").addEventListener("click",()=>v.click()),v.onchange=async()=>{const k=v.files[0];if(!k)return;const h=c.querySelector("#productPhotoPreview"),y=c.querySelector("#productPhotoBase64");h.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const E=await Fa(k,800,800,"image/jpeg",.8),L=E.length*3/4,B=1e3*1024;if(L>B)throw new Error("A imagem é muito grande mesmo após a compressão.");h.src=E,y.value=E}catch(E){console.error("Erro ao processar imagem:",E),g("Erro de Imagem",E.message||"Não foi possível processar a imagem.","error"),h.src=l,y.value=u,v.value=""}},c.style.display="flex"}function bn(){const e=document.getElementById("products-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("productCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(p.categories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${a.name}</option>`)),xa(),Xe()}function fn(){const e=document.getElementById("products-content-container"),t=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const s=a.toISOString().split("T")[0];e.innerHTML=`
        <div class="space-y-6">
             <div class="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 items-end bg-white p-4 rounded-lg shadow-sm">
                <div class="col-span-1"><label for="reportStartDate" class="block text-xs font-medium text-gray-700">De</label><input type="date" id="reportStartDate" value="${s}" class="mt-1 w-full p-2 border rounded-md text-sm"></div>
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
        </div>`;const r=document.getElementById("productFilterReport"),o=document.getElementById("categoryFilterReport");r&&p.products&&(r.innerHTML+=p.products.map(n=>`<option value="${n.id}">${n.name}</option>`).join("")),o&&p.categories&&(o.innerHTML+=p.categories.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""))}async function vn(){const e=document.getElementById("report-results");e.innerHTML='<div class="loader mx-auto my-8"></div>';const t={startDate:document.getElementById("reportStartDate").value,endDate:document.getElementById("reportEndDate").value,productId:document.getElementById("productFilterReport").value,categoryId:document.getElementById("categoryFilterReport").value};try{const a=await wr(t);if(a.length===0){e.innerHTML=`
                <div class="bg-white border rounded-lg shadow-sm p-8">
                    <p class="text-center text-gray-500">Nenhuma movimentação encontrada para este período.</p>
                </div>`;return}const s=`
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
            </div>`,r=`
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
            </div>`;e.innerHTML=s+r}catch(a){g("Erro",`Não foi possível gerar o relatório: ${a.message}`,"error"),e.innerHTML=`<div class="bg-white border border-red-200 rounded-lg p-8 text-center text-red-500">${a.message}</div>`}}function xa(){const e={ok:0,near_min:0,at_min:0,empty:0};if(!p.products)return;p.products.forEach(o=>{if(!o)return;const n=o.currentStock,i=o.minStock;n<=0?e.empty++:i>0&&n<=i?e.at_min++:i>0&&n<=i*1.2?e.near_min++:e.ok++});const t=document.getElementById("indicator-ok"),a=document.getElementById("indicator-near-min"),s=document.getElementById("indicator-at-min"),r=document.getElementById("indicator-empty");t&&(t.textContent=e.ok),a&&(a.textContent=e.near_min),s&&(s.textContent=e.at_min),r&&(r.textContent=e.empty)}function Xe(){const e=document.getElementById("productsList");if(!e)return;const t=document.getElementById("productSearchInput")?.value.toLowerCase()||"",a=document.getElementById("productCategoryFilter")?.value||"all",s=new Map((p.categories||[]).map(o=>[o.id,o.name]));let r=(p.products||[]).filter(Boolean);Q!=="all"&&(r=r.filter(o=>{const n=o.currentStock,i=o.minStock;switch(Q){case"ok":return n>0&&(i===0||n>i*1.2);case"near_min":return i>0&&n>i&&n<=i*1.2;case"at_min":return i>0&&n>0&&n<=i;case"empty":return n<=0;default:return!0}})),r=r.filter(o=>{const n=o.name.toLowerCase().includes(t),i=a==="all"||o.categoryId===a;return n&&i}),e.innerHTML="",r.length>0?(e.className="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 sm:space-y-0",r.forEach(o=>{const n=document.createElement("div"),i=JSON.stringify(o).replace(/'/g,"&apos;");n.className=`product-card bg-white rounded-lg shadow-md flex items-center gap-3 p-3 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 
                              sm:flex-col sm:p-0 sm:items-stretch sm:gap-0`,n.dataset.action="edit-product",n.dataset.product=i;const d=o.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(o.name.charAt(0))}`,l=s.get(o.categoryId)||"N/A";let u="",c="text-gray-500";const m=o.currentStock,b=o.minStock;m<=0?(u='<span class="text-xs font-semibold text-red-600">Esgotado</span>',c="text-red-600 font-semibold"):b>0&&m<=b?(u='<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>',c="text-orange-600 font-semibold"):b>0&&m<=b*1.2?(u='<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>',c="text-blue-600 font-semibold"):(u='<span class="text-xs font-semibold text-green-600">Em Estoque</span>',c="text-green-600 font-semibold"),n.innerHTML=`
                <img src="${d}" alt="Imagem de ${o.name}" class="w-16 h-16 rounded-md object-cover flex-shrink-0 sm:w-full sm:h-24 sm:rounded-b-none">
                
                <div class="flex-1 sm:p-3 sm:flex sm:flex-col sm:flex-grow">
                    <div class="sm:flex-grow">
                        <div class="flex justify-between items-start mb-1 gap-2">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${o.name}</h3>
                            <div class="hidden sm:block">${u}</div>
                        </div>
                        
                        <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${o.price.toFixed(2)}</p>
                        
                        <p class="text-xs text-gray-500 text-left mb-2 hidden sm:block">Categoria: ${l}</p>
                    </div>

                    <div class="flex justify-between items-center mt-2 sm:mt-0">
                        <p class="text-lg font-bold text-indigo-600 text-left sm:hidden">R$ ${o.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-right sm:text-left">
                            Estoque: <span class="font-bold text-base ${c}">${o.currentStock}</span>
                        </p>
                    </div>
                </div>`,e.appendChild(n)})):(e.className="",e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>')}async function st(){const e=document.getElementById("products-content-container");e&&(e.innerHTML='<div class="loader col-span-full mx-auto my-8"></div>');try{const[t,a,s]=await Promise.all([Tt(p.establishmentId),Dt(p.establishmentId,"products"),ha()]);p.products=(t||[]).filter(Boolean),p.categories=(a||[]).filter(Boolean),p.suppliers=(s||[]).filter(Boolean),Co(je)}catch(t){e&&(e.innerHTML=`<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados: ${t.message}</p>`)}}function Co(e){if(document.getElementById("products-content-container")){if(je===e&&document.getElementById("products-content-container").children.length>1){je==="products"&&(xa(),Xe());return}je=e,Q="all",document.querySelectorAll("#products-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="products"?bn():e==="movements"&&fn()}}async function hn(){ce.innerHTML=`
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
        </section>`,re&&(ce.removeEventListener("click",re),ce.removeEventListener("input",re),ce.removeEventListener("change",re)),re=async e=>{const t=e.target;if(t.id==="productSearchInput"||t.id==="productCategoryFilter"){Xe();return}const a=e.target.closest("button[data-action], button[data-view], .indicator-card[data-action], .product-card[data-action]");if(!a||e.target.closest('[data-action-stop-propagation="true"]'))return;if(a.hasAttribute("data-view")){Co(a.dataset.view);return}switch(a.dataset.action){case"new-product":Ra();break;case"edit-product":Ra(JSON.parse(a.dataset.product));break;case"manage-product-categories":mn();break;case"generate-report":await vn();break;case"filter-stock":const r=a.dataset.filterType;Q=Q===r?"all":r,document.querySelectorAll(".indicator-card").forEach(o=>{o.classList.toggle("ring-2",o.dataset.filterType===Q),o.classList.toggle("ring-indigo-500",o.dataset.filterType===Q),o.classList.toggle("shadow-lg",o.dataset.filterType===Q)}),Xe();break}},ce.addEventListener("click",re),ce.addEventListener("input",re),ce.addEventListener("change",re),je="products",Q="all",await st()}const ue=document.getElementById("content");let ne=null,vt="list",D={step:1,productsToBuy:[],allSuppliers:[],finalOrders:{},isQuoteMode:!1};async function yn(){vt==="list"?Pt():vt==="purchases"?(D.step=1,He()):vt==="history"&&$n()}async function xn(){try{const e=await ha();return p.suppliers=e||[],D.allSuppliers=e,!0}catch(e){return console.error(e),!1}}async function wn(e){if(await M("Excluir Fornecedor","Tem a certeza? Isso removerá o vínculo com os produtos."))try{await nn(e),g("Sucesso","Fornecedor excluído.","success"),It("genericModal"),Pt()}catch(t){g("Erro","Erro ao excluir: "+t.message,"error")}}async function kn(e){e.preventDefault();const t=e.target,a=t.querySelector("#supId").value,s={name:t.querySelector("#supName").value,contactName:t.querySelector("#supContact").value,email:t.querySelector("#supEmail").value,phone:t.querySelector("#supPhone").value,taxId:t.querySelector("#supTaxId").value,category:t.querySelector("#supCategory").value},r=t.querySelector('button[type="submit"]');r.disabled=!0,r.textContent="A salvar...";try{a?(await(void 0)(a,s),g("Sucesso","Fornecedor atualizado!","success")):(await(void 0)(s),g("Sucesso","Fornecedor criado!","success")),It("genericModal"),Pt()}catch(o){g("Erro","Erro ao salvar: "+o.message,"error")}finally{r.disabled=!1,r.textContent="Salvar"}}async function Pt(){const e=document.getElementById("suppliersList");if(!e)return;e.innerHTML='<div class="loader mx-auto my-8"></div>',await xn();const t=document.getElementById("supplierSearchInput")?.value.toLowerCase()||"",a=p.suppliers.filter(o=>o.name.toLowerCase().includes(t)||o.contactName&&o.contactName.toLowerCase().includes(t));if(e.innerHTML="",a.length===0){e.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum fornecedor encontrado.</div>';return}let s='<div class="flex flex-col gap-2 md:hidden">';a.forEach(o=>{const n=JSON.stringify(o).replace(/"/g,"&quot;");s+=`
            <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer supplier-item-mobile" data-supplier="${n}">
                <div class="flex-1 min-w-0 pr-3">
                    <h3 class="font-bold text-gray-900 text-sm truncate">${o.name}</h3>
                    <div class="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <span class="truncate bg-gray-100 px-1.5 py-0.5 rounded">${o.category||"Geral"}</span>
                        ${o.contactName?`<span class="truncate">• ${o.contactName}</span>`:""}
                    </div>
                </div>
                <div class="text-gray-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
            </div>
        `}),s+="</div>";let r=`
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
    `;a.forEach(o=>{const n=JSON.stringify(o).replace(/"/g,"&quot;");r+=`
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${o.name}</div>
                    <div class="text-sm text-gray-500">${o.taxId||"Sem doc."}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${o.email||"-"}</div>
                    <div class="text-sm text-gray-500">${o.phone||"-"}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        ${o.category||"Geral"}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button data-action="edit" data-supplier="${n}" class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                    <button data-action="delete" data-id="${o.id}" class="text-red-600 hover:text-red-900">Excluir</button>
                </td>
            </tr>
        `}),r+="</tbody></table></div>",e.innerHTML=s+r}function Sn(e){const t=e.phone?`https://wa.me/${e.phone.replace(/\D/g,"")}`:"#",a=e.phone?`tel:${e.phone}`:"#",s=e.email?`mailto:${e.email}`:"#",r=JSON.stringify(e).replace(/"/g,"&quot;"),o=`
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
            <a href="${s}" class="${e.email?"":"opacity-50 pointer-events-none"} flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
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
    `;N({title:"",contentHTML:o,maxWidth:"max-w-md"})}async function He(){const e=document.getElementById("purchasesContainer");if(e)if(D.step===1){e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const[t,a]=await Promise.all([Tt(p.establishmentId),ha()]);D.allSuppliers=a||[];const s=t.filter(i=>{const d=parseInt(i.currentStock||0),l=parseInt(i.minStock||0);return d<=l});if(D.productsToBuy=s,s.length===0){e.innerHTML=`
                    <div class="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div class="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800">Tudo em ordem!</h3>
                        <p class="text-gray-600">Nenhum produto abaixo do estoque mínimo.</p>
                        <button class="mt-4 text-indigo-600 hover:underline text-sm" onclick="window.location.reload()">Atualizar Dados</button>
                    </div>
                `;return}let r='<div class="flex flex-col gap-3 md:hidden">',o="";s.forEach(i=>{const d=parseInt(i.minStock)||0,l=parseInt(i.currentStock)||0,u=Math.max(d-l,1),c=parseFloat(i.costPrice||0);let m='<option value="">Selecione...</option>';D.allSuppliers.length>0?D.allSuppliers.forEach(b=>{const v=i.supplierIds&&i.supplierIds.includes(b.id)?"selected":"";m+=`<option value="${b.id}" ${v}>${b.name}</option>`}):m='<option value="">Sem fornecedores</option>',r+=`
                    <div class="product-row bg-white p-3 rounded-lg shadow-sm border border-gray-200" data-product-id="${i.id}" data-cost="${c}">
                        <div class="flex justify-between items-start mb-2">
                            <div class="flex items-center gap-2">
                                <input type="checkbox" class="row-select w-5 h-5 text-indigo-600 rounded border-gray-300" checked>
                                <div>
                                    <p class="font-bold text-gray-800 text-sm">${i.name}</p>
                                    <p class="text-xs text-gray-500">Custo: R$ ${c.toFixed(2)}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="text-[10px] text-gray-500 uppercase font-bold tracking-wide block mb-0.5">Estoque</span>
                                <div class="flex items-center justify-end gap-1 text-xs">
                                    <span class="font-bold text-red-600">${l}</span>
                                    <span class="text-gray-400">/</span>
                                    <span class="font-medium text-gray-600">${d} (Mín)</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-3 items-center mt-2">
                            <div>
                                <label class="text-xs text-gray-500 block mb-1">Qtd. a Comprar</label>
                                <input type="number" class="qty-input w-full p-2 border border-gray-300 rounded text-center font-bold text-indigo-700 bg-indigo-50" value="${u}" min="1">
                            </div>
                            <div>
                                <label class="text-xs text-gray-500 block mb-1">Fornecedor</label>
                                <select class="supplier-select w-full p-2 border border-gray-300 rounded bg-white text-xs truncate">
                                    ${m}
                                </select>
                            </div>
                        </div>
                        <div class="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                            <span class="text-xs text-gray-500">Subtotal Previsto:</span>
                            <span class="row-subtotal font-bold text-indigo-600 text-sm">R$ ${(u*c).toFixed(2)}</span>
                        </div>
                    </div>
                `,o+=`
                    <tr class="hover:bg-gray-50 border-b border-gray-100 product-row" data-product-id="${i.id}" data-cost="${c}">
                        <td class="p-3 pl-4 text-center w-10">
                            <input type="checkbox" class="row-select w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" checked>
                        </td>
                        <td class="p-3 font-medium text-gray-800">${i.name}</td>
                        <td class="p-3 text-center text-xs text-gray-600">
                            <div class="flex flex-col items-center">
                                <span class="font-bold text-red-600">${l} <span class="text-gray-400 font-normal">Atual</span></span>
                                <span class="border-t border-gray-200 w-12 my-0.5"></span>
                                <span class="font-medium">${d} <span class="text-gray-400 font-normal">Mínimo</span></span>
                            </div>
                        </td>
                        <td class="p-3 text-center w-24">
                            <input type="number" class="qty-input w-full p-2 border border-gray-300 rounded text-center text-lg font-bold text-indigo-700 bg-indigo-50" value="${u}" min="1">
                        </td>
                        <td class="p-3 text-right text-sm text-gray-600">R$ ${c.toFixed(2)}</td>
                        <td class="p-3 text-right text-sm font-bold text-gray-800 row-subtotal">R$ ${(u*c).toFixed(2)}</td>
                        <td class="p-3 w-48">
                            <select class="supplier-select w-full p-2 border border-gray-300 rounded-md bg-white text-sm">
                                ${m}
                            </select>
                        </td>
                    </tr>
                `}),r+="</div>";const n=D.isQuoteMode?"flex":"hidden";e.innerHTML=`
                <div class="space-y-4 animate-fade-in pb-20">
                    <div class="bg-white p-3 md:p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div class="flex flex-col md:flex-row justify-between items-center gap-3">
                            <div class="flex items-center gap-3 w-full md:w-auto">
                                <input type="checkbox" id="toggle-quote-mode" class="w-5 h-5 text-indigo-600 rounded" ${D.isQuoteMode?"checked":""}>
                                <label for="toggle-quote-mode" class="text-sm font-medium text-gray-700 cursor-pointer select-none">
                                    Modo Cotação (Gerar PDF)
                                </label>
                            </div>
                            <div class="bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100 text-center w-full md:w-auto flex justify-between md:block items-center">
                                <span class="text-xs text-indigo-600 uppercase font-bold tracking-wide md:block">Total Estimado:</span>
                                <span id="total-purchase-cost" class="text-lg font-bold text-indigo-700">R$ 0,00</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 sticky bottom-4 z-20">
                        <button id="btn-generate-quotes" class="${n} w-full items-center justify-center gap-2 bg-white border-2 border-indigo-600 text-indigo-600 px-4 py-3 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            BAIXAR PDFs DE COTAÇÃO
                        </button>

                        <button id="btn-go-to-orders" class="w-full bg-green-600 text-white px-4 py-3 rounded-xl font-bold text-base shadow-lg hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-2">
                            GERAR PEDIDOS DE COMPRA
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
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
                            <tbody class="divide-y divide-gray-100" id="purchase-table-body">${o}</tbody>
                        </table>
                    </div>
                </div>
            `,Kt()}catch(t){console.error(t),e.innerHTML='<p class="text-red-500 text-center">Erro ao calcular compras.</p>'}}else D.step===2&&En(e)}function En(e){if(!D.finalOrders||Object.keys(D.finalOrders).length===0){D.step=1,He();return}let t="",a=0;for(const[s,r]of Object.entries(D.finalOrders)){let o=0,n=r.items.map(u=>{const c=u.qty*u.cost;return o+=c,`
            <div class="flex justify-between py-2 border-b border-gray-50 text-sm">
                <span class="text-gray-800 font-medium">${u.name}</span>
                <div class="text-right">
                    <span class="text-gray-500 text-xs block">${u.qty} x R$ ${u.cost.toFixed(2)}</span>
                    <span class="text-indigo-600 font-bold block">R$ ${c.toFixed(2)}</span>
                </div>
            </div>
        `}).join("");a+=o;const i=encodeURIComponent(JSON.stringify({supplierId:s,supplierName:r.info.name,totalAmount:o,items:r.items})),d=encodeURIComponent(JSON.stringify({name:r.info.name,phone:r.info.phone,email:r.info.email})),l=encodeURIComponent(JSON.stringify(r.items));t+=`
            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm supplier-order-card mb-4" data-supplier-name="${r.info.name}">
                <div class="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h4 class="font-bold text-gray-800 text-base">${r.info.name}</h4>
                        <div class="text-[10px] text-gray-500 flex flex-col">
                            <span>${r.info.email||""}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded">R$ ${o.toFixed(2)}</span>
                    </div>
                </div>
                <div class="p-3">
                    ${n}
                </div>
                <div class="p-3 bg-gray-50 border-t border-gray-200 grid grid-cols-3 gap-2">
                    <button class="btn-print-order bg-white border border-gray-300 text-gray-700 px-2 py-2.5 rounded-lg hover:bg-gray-50 text-xs font-bold flex items-center justify-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        PDF
                    </button>
                    <button class="btn-send-order bg-green-500 text-white px-2 py-2.5 rounded-lg hover:bg-green-600 text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
                        data-supplier-info="${d}"
                        data-order-items="${l}"
                        data-total="${o}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                        Enviar
                    </button>
                    <button class="btn-register-order bg-blue-600 text-white px-2 py-2.5 rounded-lg hover:bg-blue-700 text-xs font-bold flex items-center justify-center gap-1 shadow-sm" data-order="${i}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        Salvar
                    </button>
                </div>
            </div>
        `}e.innerHTML=`
        <div class="space-y-4 animate-fade-in pb-24">
            <div class="flex flex-col justify-between items-center gap-3 bg-green-50 p-4 rounded-lg border border-green-100 text-center">
                <div>
                    <h3 class="font-bold text-green-800 text-lg">Pedidos Prontos</h3>
                    <p class="text-sm text-green-600">Valor Total: <strong class="text-lg">R$ ${a.toFixed(2)}</strong></p>
                </div>
                <button id="btn-back-step1" class="text-gray-600 hover:text-gray-900 text-sm font-medium underline py-2">
                    ← Voltar e Corrigir
                </button>
            </div>
            <div>
                ${t}
            </div>
        </div>
    `}async function $n(){const e=document.getElementById("historyContainer");if(e){e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const t=await dn(p.establishmentId);if(t.length===0){e.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum histórico encontrado.</div>';return}let a='<div class="flex flex-col gap-3 md:hidden">';t.forEach(o=>{const n=new Date(o.createdAt.seconds*1e3).toLocaleDateString("pt-BR");a+=`
                <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center active:bg-gray-50 transition-colors">
                    <div>
                        <p class="text-xs text-gray-500 mb-0.5">${n}</p>
                        <p class="font-bold text-gray-800 text-sm">${o.supplierName}</p>
                        <p class="text-xs text-gray-400 mt-0.5">${o.items.length} itens</p>
                    </div>
                    <div class="text-right">
                        <p class="text-indigo-600 font-bold text-sm mb-1">R$ ${parseFloat(o.totalAmount).toFixed(2)}</p>
                        <button class="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 btn-view-purchase" data-purchase='${JSON.stringify(o)}'>
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
                    <tbody class="divide-y divide-gray-100">${t.map(o=>`
            <tr class="hover:bg-gray-50 border-b border-gray-100">
                <td class="p-3 text-sm text-gray-600 whitespace-nowrap">${new Date(o.createdAt.seconds*1e3).toLocaleDateString("pt-BR")}</td>
                <td class="p-3 font-medium text-gray-800">${o.supplierName}</td>
                <td class="p-3 text-right font-bold text-indigo-600 whitespace-nowrap">R$ ${parseFloat(o.totalAmount).toFixed(2)}</td>
                <td class="p-3 text-right">
                    <button class="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-100 btn-view-purchase" data-purchase='${JSON.stringify(o)}'>
                        Ver
                    </button>
                </td>
            </tr>
        `).join("")}</tbody>
                </table>
            </div>
        `;e.innerHTML=a+r}catch(t){console.error(t),e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar histórico.</p>'}}}function In(e){const t=new Date(e.createdAt.seconds*1e3).toLocaleString("pt-BR"),a=e.items.map(r=>`
        <li class="flex justify-between py-3 border-b border-gray-100 last:border-0">
            <div>
                <p class="font-medium text-sm text-gray-800">${r.name}</p>
                <p class="text-xs text-gray-500">${r.qty} un. x R$ ${parseFloat(r.cost).toFixed(2)}</p>
            </div>
            <p class="text-sm font-bold text-gray-700">R$ ${(r.qty*r.cost).toFixed(2)}</p>
        </li>
    `).join(""),s=`
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
    `;N({title:"Detalhes da Compra",contentHTML:s,maxWidth:"max-w-md"}),setTimeout(()=>{document.querySelector("#genericModal .modal-close").addEventListener("click",()=>{It("genericModal")})},50)}function Kt(){const e=document.querySelectorAll(".product-row");let t=0;e.forEach(s=>{if(s.offsetParent===null)return;const r=s.querySelector(".row-select"),o=s.querySelector(".qty-input"),n=s.querySelector(".row-subtotal"),i=parseFloat(s.dataset.cost||0),d=parseInt(o.value||0);if(r.checked){const l=i*d;t+=l,n&&(n.textContent=`R$ ${l.toFixed(2)}`),s.classList.remove("opacity-50","bg-gray-50")}else s.classList.add("opacity-50","bg-gray-50")});const a=document.getElementById("total-purchase-cost");a&&(a.textContent=`R$ ${t.toFixed(2).replace(".",",")}`)}async function ja(e,t,a,s=!1){if(!window.jspdf){alert("Erro: Biblioteca PDF não carregada.");return}const{jsPDF:r}=window.jspdf,o=new r,n=new Date().toLocaleDateString("pt-BR");o.setFontSize(18),o.text(e,14,20),o.setFontSize(10),o.setTextColor(100),o.text(`Data: ${n}`,14,28),o.setTextColor(0),o.setFontSize(12),o.text(`Destinatário: ${t}`,14,38),s&&(o.setFontSize(10),o.text("Por favor, enviem a vossa melhor cotação para os itens abaixo.",14,45));const i=a.map(l=>[l.name,l.qty.toString()]);o.autoTable({startY:s?50:45,head:[["Produto","Quantidade Solicitada"]],body:i,theme:"striped",headStyles:{fillColor:s?[100,116,139]:[22,163,74]},styles:{fontSize:10,cellPadding:3}});const d=`${s?"Cotacao":"Pedido"}_${t.replace(/\s+/g,"_")}_${n.replace(/\//g,"-")}.pdf`;o.save(d),g("Sucesso","PDF gerado!","success")}function Ha(e=null){const t=`
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
    `;N({title:e?"Editar Fornecedor":"Novo Fornecedor",contentHTML:t,maxWidth:"max-w-lg"}),setTimeout(()=>{document.getElementById("supplierForm").addEventListener("submit",kn),document.querySelector("#genericModal .modal-close").addEventListener("click",()=>It("genericModal"))},50)}function Cn(){ue.innerHTML=`
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
    `,ne&&(ue.removeEventListener("click",ne),ue.removeEventListener("input",ne),ue.removeEventListener("change",ne)),ne=e=>{if(e.target.closest("#tab-btn-list")&&lt("list"),e.target.closest("#tab-btn-purchases")&&lt("purchases"),e.target.closest("#tab-btn-history")&&lt("history"),e.target.id==="toggle-quote-mode"&&(D.isQuoteMode=e.target.checked,He()),e.target.id==="supplierSearchInput"&&Pt(),e.target.closest("#btn-new-supplier")&&Ha(),e.target.closest(".supplier-item-mobile")){const a=e.target.closest(".supplier-item-mobile"),s=JSON.parse(a.dataset.supplier);Sn(s)}const t=e.target.closest("button[data-action]");if(t){const a=t.dataset.action;a==="delete"&&wn(t.dataset.id),a==="edit"&&Ha(JSON.parse(t.dataset.supplier))}if((e.target.classList.contains("qty-input")||e.target.classList.contains("row-select"))&&Kt(),e.target.id==="check-all-rows"){const a=e.target.checked;document.querySelectorAll(".row-select").forEach(s=>s.checked=a),Kt()}if(e.target.closest("#btn-generate-quotes")){const a=document.querySelectorAll(".product-row"),s={};if(a.forEach(r=>{if(r.offsetParent===null||!r.querySelector(".row-select").checked)return;let n="Produto";const i=r.querySelector("td:nth-child(2)"),d=r.querySelector(".font-bold");i?n=i.innerText:d&&(n=d.innerText);const l=r.querySelector(".qty-input").value,c=r.querySelector(".supplier-select").value;if(c){if(!s[c]){const m=D.allSuppliers.find(b=>b.id===c);s[c]={name:m.name,items:[]}}s[c].items.push({name:n,qty:l})}}),Object.keys(s).length===0){g("Erro","Nenhum item com fornecedor selecionado.","error");return}Object.values(s).forEach(r=>{ja("Solicitação de Cotação",r.name,r.items,!0)})}if(e.target.closest("#btn-go-to-orders")){const a=document.querySelectorAll(".product-row"),s={};let r=!1;if(a.forEach(o=>{if(o.offsetParent===null||!o.querySelector(".row-select").checked)return;r=!0;let i="Produto";const d=o.querySelector("td:nth-child(2)"),l=o.querySelector(".font-bold");d?i=d.innerText:l&&(i=l.innerText);const u=parseInt(o.querySelector(".qty-input").value),c=parseFloat(o.dataset.cost),b=o.querySelector(".supplier-select").value;if(b){if(!s[b]){const f=D.allSuppliers.find(v=>v.id===b);s[b]={info:f,items:[]}}s[b].items.push({name:i,qty:u,cost:c})}}),!r){g("Atenção","Selecione pelo menos um item para gerar o pedido.","error");return}D.finalOrders=s,D.step=2,He()}if(e.target.closest("#btn-back-step1")&&(D.step=1,He()),e.target.closest(".btn-send-order")){const a=e.target.closest(".btn-send-order"),s=JSON.parse(decodeURIComponent(a.dataset.supplierInfo)),r=JSON.parse(decodeURIComponent(a.dataset.orderItems)),o=parseFloat(a.dataset.total);if(s.phone){const n=s.phone.replace(/\D/g,"");let i=`Olá *${s.name}*, gostaria de realizar o seguinte pedido:

`;i+=`*ITENS:*
`,r.forEach(l=>{i+=`- ${l.qty}x ${l.name}
`}),i+="Aguardo confirmação.";const d=`https://wa.me/${n}?text=${encodeURIComponent(i)}`;window.open(d,"_blank"),g("Aberto","WhatsApp aberto com o pedido.","success")}else if(s.email){const n=`Pedido de Compra - ${p.establishmentName||"Empresa"}`;let i=`Olá ${s.name},

Gostaria de realizar o seguinte pedido:

`;r.forEach(l=>{i+=`- ${l.qty}x ${l.name}
`}),i+=`
Valor Total Estimado: R$ ${o.toFixed(2)}

Aguardo confirmação.`;const d=`mailto:${s.email}?subject=${encodeURIComponent(n)}&body=${encodeURIComponent(i)}`;window.location.href=d}else g("Erro","Fornecedor sem telefone ou email cadastrado.","error")}if(e.target.closest(".btn-register-order")){const a=e.target.closest(".btn-register-order"),s=JSON.parse(decodeURIComponent(a.dataset.order));s.establishmentId=p.establishmentId,ln(s).then(()=>{g("Sucesso","Compra registrada no histórico!","success"),a.disabled=!0,a.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Registrado',a.classList.replace("bg-blue-600","bg-green-600"),a.classList.replace("hover:bg-blue-700","hover:bg-green-700")}).catch(r=>{g("Erro","Falha ao registrar compra: "+r.message,"error")})}if(e.target.closest(".btn-print-order")){const a=e.target.closest(".supplier-order-card"),s=a.dataset.supplierName,r=[];a.querySelectorAll(".border-b").forEach(n=>{const i=n.querySelector(".text-gray-800"),d=n.querySelector(".text-gray-600");if(i&&d){const l=i.innerText,u=d.innerText.split(" x ")[0];r.push({name:l,qty:u})}}),ja("Pedido de Compra",s,r,!1)}if(e.target.closest(".btn-view-purchase")){const a=e.target.closest(".btn-view-purchase"),s=JSON.parse(a.dataset.purchase);In(s)}},ue.addEventListener("click",ne),ue.addEventListener("input",ne),ue.addEventListener("change",ne),lt("list")}function lt(e){vt=e,["list","purchases","history"].forEach(a=>{const s=document.getElementById(`tab-btn-${a}`),r=document.getElementById(`tab-content-${a}`);a===e?(s.classList.add("border-indigo-500","text-indigo-600"),s.classList.remove("border-transparent","text-gray-500"),r.classList.remove("hidden")):(s.classList.remove("border-indigo-500","text-indigo-600"),s.classList.add("border-transparent","text-gray-500"),r.classList.add("hidden"))});const t=document.getElementById("btn-new-supplier");t&&(e==="list"?t.classList.remove("hidden"):t.classList.add("hidden")),yn()}const Nt=document.getElementById("content"),Oa={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let te=new Set,dt=null,Se=null;function Ln(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function Bn(e){return e.length===0?'<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>':e.map(t=>{const a=t.status==="inactive",s=t.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,r=JSON.stringify(t).replace(/'/g,"&apos;");return`
            <div class="professional-card bg-white rounded-lg shadow-md flex items-center gap-4 p-3 cursor-pointer transition-transform transform hover:shadow-lg hover:bg-gray-50
                        sm:flex-col sm:items-stretch sm:p-0 sm:gap-0 ${a?"opacity-50 bg-gray-100":""}" 
                 data-action="open-professional-modal" data-professional='${r}'>
                
                <img src="${s}" alt="Foto de ${t.name}" class="w-16 h-16 rounded-full object-cover flex-shrink-0
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
            </div>`}).join("")}function Ft(){const e=document.getElementById("genericModal");e.style.display="none",Se&&e.removeEventListener("click",Se)}async function Tn(e){const t=document.getElementById("genericModal"),a=e.id?e:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},s=p.services||await De(p.establishmentId),r=p.professionals||await G(p.establishmentId),o=`
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
        </div>`;t.innerHTML=o,t.style.display="flex",Mn(a,s),Pn(a),An(a,r),Nn(a)}function Mn(e,t){const a=document.getElementById("professionalForm"),s=e.dob?e.dob.split("/"):["",""],r=Array.from({length:12},(m,b)=>{const f=b+1,v=f==s[1]?"selected":"",k=new Date(0,b).toLocaleString("pt-BR",{month:"long"});return`<option value="${f}" ${v}>${k.charAt(0).toUpperCase()+k.slice(1)}</option>`}).join(""),o=e.status||"active";a.innerHTML=`
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
                    <div class="form-group"><label for="profDobDay">Aniversário (Dia)</label><input type="number" id="profDobDay" value="${s[0]}" min="1" max="31" class="mt-1 w-full p-2 border rounded-md"></div>
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
        <div class="form-group"><label for="profNotes">Observações</label><textarea id="profNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${e.notes||""}</textarea></div>`;const n=document.getElementById("profPhotoInput"),i=document.getElementById("profPhotoButton"),d=document.getElementById("profPhotoPreview"),l=document.getElementById("profPhotoBase64"),u=e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,c=e.photo||"";i&&i.addEventListener("click",()=>n.click()),n&&(n.onchange=async()=>{const m=n.files[0];if(m){d.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const b=await Dn(m,800,800,"image/jpeg",.8);d.src=b,l.value=b}catch(b){g("Erro de Imagem",b.message||"Não foi possível processar a imagem.","error"),d.src=u,l.value=c,n.value=""}}})}function Dn(e,t=800,a=800,s="image/jpeg",r=.8){return new Promise((o,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=d=>{const l=new Image;l.onload=()=>{let u=l.width,c=l.height;u>c?u>t&&(c*=t/u,u=t):c>a&&(u*=a/c,c=a);const m=document.createElement("canvas");m.width=u,m.height=c,m.getContext("2d").drawImage(l,0,0,u,c);const f=m.toDataURL(s,r);o(f)},l.onerror=u=>n(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},i.onerror=d=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function Pn(e){const t=document.getElementById("jornada");t.innerHTML='<div><h3 class="text-xl font-semibold mb-4">Jornada de Trabalho Semanal</h3><p class="text-sm text-gray-600 mb-4">Defina os horários de trabalho padrão para este profissional.</p><div id="profScheduleContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div></div>',qn(t.querySelector("#profScheduleContainer"),e.workingHours||{})}async function An(e,t){const a=document.getElementById("bloqueios");a.innerHTML=`
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
        </div>`;const s=document.getElementById("batchBlockageForm");s&&s.addEventListener("submit",async o=>{o.preventDefault();const n=Array.from(o.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(b=>b.value);if(n.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const i=o.target.batchBlockageStartDate.value,d=o.target.batchBlockageEndDate.value||i,l=o.target.batchBlockageStartTime.value,u=o.target.batchBlockageEndTime.value,c=o.target.batchBlockageReason.value;if(!i||!l||!u)return g("Atenção","Preencha Data de Início, Início e Fim.","error");const m=n.map(b=>{const f={professionalId:b,establishmentId:p.establishmentId,startTime:new Date(`${i}T${l}`).toISOString(),endTime:new Date(`${d}T${u}`).toISOString(),reason:c};return Lt(f)});try{await Promise.all(m),g("Sucesso!",`${n.length} bloqueios foram criados.`);const b=document.getElementById("prof-blockages-filter").value;Oe(e.id,b)}catch(b){g("Erro",b.message,"error")}}),document.getElementById("prof-blockages-filter").addEventListener("change",o=>Oe(e.id,o.target.value)),await Oe(e.id,"future")}function qn(e,t){e.innerHTML=Object.keys(Oa).map(a=>{const s=t[a]||{},r=s.active!==!1;return`
            <div class="day-schedule-card p-3 rounded-lg ${r?"bg-white":"bg-gray-100 disabled"} border">
                 <div class="flex justify-between items-center"><span class="font-semibold text-gray-800">${Oa[a]}</span><label class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" data-day="${a}" data-field="active" class="sr-only" ${r?"checked":""}><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div></label></div>
                <div class="time-inputs grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><label>Início:</label><input type="time" data-day="${a}" data-field="start" value="${s.start||"09:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Fim:</label><input type="time" data-day="${a}" data-field="end" value="${s.end||"18:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Intervalo:</label><input type="time" data-day="${a}" data-field="breakStart" value="${s.breakStart||"12:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Fim Int.:</label><input type="time" data-day="${a}" data-field="breakEnd" value="${s.breakEnd||"13:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                </div>
            </div>`}).join(""),e.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",s=>{const r=s.target.closest(".day-schedule-card"),o=!s.target.checked;r.classList.toggle("bg-white",!o),r.classList.toggle("bg-gray-100",o),r.classList.toggle("disabled",o),r.querySelectorAll(".time-inputs input").forEach(n=>n.disabled=o)})})}async function Oe(e,t="future"){const a=document.getElementById("blockagesList");if(a){a.innerHTML='<div class="loader mx-auto"></div>';try{const s=new Date;let r,o;t==="history"?(o=new Date,r=new Date,r.setFullYear(r.getFullYear()-2)):(r=new Date,o=new Date,o.setFullYear(o.getFullYear()+2));let i=(await Ct(p.establishmentId,r.toISOString(),o.toISOString(),e)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));t==="history"?i=i.filter(l=>l.endTime<s).sort((l,u)=>u.startTime-l.startTime):i=i.filter(l=>l.endTime>=s).sort((l,u)=>l.startTime-u.startTime);const d=i.reduce((l,u)=>{const c=u.reason||"Sem motivo";return l[c]||(l[c]=[]),l[c].push(u),l},{});if(Object.keys(d).length===0){a.innerHTML=`<p class="text-center text-gray-500 text-sm py-4">Nenhum bloqueio ${t==="history"?"no histórico":"futuro"}.</p>`;return}a.innerHTML=Object.entries(d).map(([l,u])=>`
            <div class="bg-gray-100 rounded-lg p-3 my-2 space-y-2">
                <div class="flex justify-between items-center pb-2 border-b">
                    <h4 class="font-bold text-gray-700">${l} (${u.length})</h4>
                    ${u.length>1?`<button data-action="batch-delete-blockage" data-ids='${JSON.stringify(u.map(c=>c.id))}' class="text-xs text-red-600 font-semibold hover:underline">Apagar Todos (${u.length})</button>`:""}
                </div>
                ${u.map(c=>`
                    <div class="flex justify-between items-center bg-white p-2 rounded-md text-sm border">
                        <p class="text-xs text-gray-500">
                           ${c.startTime.toLocaleDateString("pt-BR")} 
                           <span class="text-gray-400 mx-1">|</span> 
                           ${c.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${c.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}
                        </p>
                        <button data-action="delete-blockage" data-id="${c.id}" class="text-red-500 p-1 rounded-full hover:bg-red-100" title="Apagar">&times;</button>
                    </div>
                `).join("")}
            </div>
        `).join("")}catch(s){a.innerHTML=`<p class="text-red-500">${s.message}</p>`}}}function Nn(e){const t=document.getElementById("genericModal");Se&&t.removeEventListener("click",Se),Se=async a=>{const s=a.target.closest("button[data-action]");if(!s){const o=a.target.closest(".tab-link");o&&(t.querySelectorAll(".tab-link").forEach(n=>n.classList.remove("active")),o.classList.add("active"),t.querySelectorAll(".tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(o.dataset.tab).classList.remove("hidden"));return}const r=s.dataset.action;switch(a.stopPropagation(),r){case"close-modal":Ft();break;case"delete-professional":const o=s.dataset.id;if(await M("Excluir Profissional",`Tem certeza que deseja excluir ${e.name}? Esta ação não pode ser desfeita.`))try{await ks(o),g("Sucesso!","Profissional excluído.","success"),Ft(),St()}catch(v){g("Erro",`Não foi possível excluir: ${v.message}`,"error")}break;case"save-professional":const i=document.getElementById("professionalForm"),d=s,l=document.getElementById("profScheduleContainer"),u=Array.from(i.querySelectorAll("#profServicesContainer input:checked")).map(v=>v.value),c={};l&&l.querySelectorAll(".day-schedule-card").forEach(v=>{const k=v.querySelector('[data-field="active"]').dataset.day;c[k]={active:v.querySelector('[data-field="active"]').checked,start:v.querySelector('[data-field="start"]').value,end:v.querySelector('[data-field="end"]').value,breakStart:v.querySelector('[data-field="breakStart"]').value,breakEnd:v.querySelector('[data-field="breakEnd"]').value}});const m={...e,id:i.querySelector("#professionalId").value||void 0,name:i.querySelector("#profName").value,specialty:i.querySelector("#profSpecialty").value,photo:i.querySelector("#profPhotoBase64").value,services:u,workingHours:c,phone:i.querySelector("#profPhone").value,dob:`${i.querySelector("#profDobDay").value}/${i.querySelector("#profDobMonth").value}`,receivesCommission:i.querySelector("#profCommission").value==="sim",showOnAgenda:i.querySelector("#profShowOnAgenda").value==="sim",orderOnAgenda:parseInt(i.querySelector("#profOrderOnAgenda").value)||1,notes:i.querySelector("#profNotes").value,status:i.querySelector("#profStatus").value};d.disabled=!0,d.textContent="A salvar...";try{m.id?(await ws(m.id,m),g("Sucesso!","Profissional atualizado.","success")):(delete m.id,await xs(m),g("Sucesso!","Profissional criado.","success")),Ft(),St()}catch(v){g("Erro",v.message,"error"),d.disabled=!1,d.textContent="Salvar"}break;case"delete-blockage":const b=s.dataset.id;if(await M("Apagar Bloqueio","Tem certeza?"))try{await ua(b),g("Bloqueio removido.","success");const v=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";Oe(e.id,v)}catch(v){g("Erro",v.message,"error")}break;case"batch-delete-blockage":const f=JSON.parse(s.dataset.ids);if(await M("Apagar em Lote",`Tem certeza que deseja apagar ${f.length} bloqueios com este motivo?`))try{await go(f),g("Bloqueios removidos.","success");const v=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";Oe(e.id,v)}catch(v){g("Erro",v.message,"error")}break}},t.addEventListener("click",Se)}function ea(){const e=document.getElementById("batch-actions-container"),t=document.getElementById("selected-count");!e||!t||(te.size>0?(t.textContent=`${te.size} selecionado(s)`,e.classList.remove("hidden")):e.classList.add("hidden"))}function Fn(){M("Excluir em Lote",`Tem certeza que deseja excluir ${te.size} profissionais? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{await(void 0)(Array.from(te)),g("Sucesso!",`${te.size} profissionais foram excluídos.`,"success"),te.clear(),ea(),St()}catch(t){g("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}function Ae(){const e=document.getElementById("professionalsList");if(!e)return;if(!p.professionals){e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Ln();return}const t=document.getElementById("showInactiveProfToggle").checked,a=document.getElementById("profSearchInput").value.toLowerCase(),s=p.professionals.filter(r=>{const o=r.name.toLowerCase().includes(a),n=t||r.status!=="inactive";return o&&n});e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Bn(s)}async function St(){te.clear(),Nt.innerHTML=`
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
        </section>`,dt&&Nt.removeEventListener("click",dt),dt=t=>{const a=t.target.closest('[data-action="open-professional-modal"]'),s=t.target.closest('[data-action="batch-delete"]');if(a){t.preventDefault();let o={};if(a.dataset.professional)try{o=JSON.parse(a.dataset.professional)}catch(n){console.error("Erro ao fazer parse do professional data:",n);return}Tn(o);return}if(s){Fn();return}const r=t.target.closest(".professional-checkbox");if(r){const o=r.dataset.id;r.checked?te.add(o):te.delete(o),Ae(),ea();return}},Nt.addEventListener("click",dt),document.getElementById("profSearchInput").addEventListener("input",Ae),document.getElementById("showInactiveProfToggle").addEventListener("change",Ae);const e=document.getElementById("professionalsList");p.professionals=null,p.services=null,Ae();try{const[t,a]=await Promise.all([G(p.establishmentId),De(p.establishmentId)]);p.professionals=t,p.services=a,Ae(),ea()}catch{e.innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar dados da página.</p>'}}const Rt=document.getElementById("content");let K=[],ze={},R=null,ta="list",U="all",aa="O Estabelecimento";const Rn=(e,t)=>`Olá, ${e}! Nós da ${t} desejamos a você um Feliz Aniversário! Esperamos que seu dia seja maravilhoso. Venha comemorar conosco! 🎉🎂`,jn=(e,t)=>`Oi, ${e}! Faz um tempo que não te vemos aqui no(a) ${t}. Sentimos sua falta! Temos novidades/ofertas especiais para você. Que tal agendar seu horário?`,Hn=[{value:30,label:"30 dias"},{value:60,label:"60 dias"},{value:90,label:"90 dias"},{value:120,label:"120 dias"}];function On(){return Math.floor(Math.random()*140)+10}function zn(e){if(!e.dob)return!1;const t=e.dob.split("/");if(t.length!==2)return!1;const a=new Date,s=a.getDate(),r=a.getMonth()+1,o=parseInt(t[0],10),n=parseInt(t[1],10);return o===s&&n===r}const Vn=[{value:99,label:"Aniversariantes de Hoje"},{value:0,label:"Todos os meses (com DOB)"},{value:1,label:"Janeiro"},{value:2,label:"Fevereiro"},{value:3,label:"Março"},{value:4,label:"Abril"},{value:5,label:"Maio"},{value:6,label:"Junho"},{value:7,label:"Julho"},{value:8,label:"Agosto"},{value:9,label:"Setembro"},{value:10,label:"Outubro"},{value:11,label:"Novembro"},{value:12,label:"Dezembro"}];function za(){return Vn.map(e=>{let t="";return e.value===99&&(t="selected"),`<option value="${e.value}" ${t}>${e.label}</option>`}).join("")}function Va(){return Hn.map(e=>{const t=e.value===90?"selected":"";return`<option value="${e.value}" ${t}>${e.label}</option>`}).join("")}function Un(e,t){const a=`w-5 h-5 ${t} mr-2`;switch(e){case"cadastro":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`;case"agendamentos":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`;case"historico":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2h-2.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-1.414 0l-1.414-1.414A1 1 0 009.586 17H7a2 2 0 01-2-2v-2a2 2 0 012-2h12z" /></svg>`;case"fidelidade":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.5a9.5 9.5 0 1019 0 9.5 9.5 0 00-19 0z" /></svg>`;default:return""}}function Jn(e="cadastro"){const t=[{id:"cadastro",label:"Cadastro"},{id:"agendamentos",label:"Próximos Agend."},{id:"historico",label:"Histórico"},{id:"fidelidade",label:"Fidelidade"}],a=document.getElementById("client-detail-tabs");a&&(a.innerHTML=t.map(s=>{const r=e===s.id,o=r?"text-indigo-600":"text-gray-500";return`
            <button data-tab="${s.id}" class="tab-btn whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors flex items-center ${r?"border-indigo-500 text-indigo-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}">
                ${Un(s.id,o)}
                ${s.label}
            </button>
        `}).join(""),a.querySelectorAll(".tab-btn").forEach(s=>{s.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),oa(s.dataset.tab)})}))}async function oa(e){Jn(e);const t=document.getElementById("client-detail-content");if(t)switch(t.innerHTML='<form id="client-form" class="p-6 space-y-4"><div class="loader mx-auto my-8"></div></form>',e){case"cadastro":t.innerHTML=_n(R);break;case"agendamentos":case"historico":try{const s=await Js(p.establishmentId,R.name,R.phone);t.innerHTML=Wn(s,e)}catch(s){console.error("Erro ao carregar histórico do cliente:",s),t.innerHTML=`<form id="client-form" class="p-6 space-y-4"><p class="text-center text-red-500">Erro ao carregar o histórico: ${s.message}</p></form>`}break;case"fidelidade":const a=await _s(p.establishmentId,R.name,R.phone);t.innerHTML=Gn(R,a);break;default:t.innerHTML='<form id="client-form" class="p-6 space-y-4"><p class="p-4 text-center text-gray-500">Secção não implementada.</p></form>'}}function _n(e){const t=e?.dob?e.dob.split("/"):["",""];return`
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
    `}function Wn(e,t){const a=t==="agendamentos"?"Próximos Agendamentos":"Histórico de Visitas",s=t==="agendamentos"?"Nenhum agendamento futuro.":"Nenhum histórico de visitas.",r=new Date;r.setHours(0,0,0,0);const o=t==="agendamentos",n=(e||[]).filter(i=>{const d=new Date(i.date);return o?d>=r:d<r});return n.sort((i,d)=>o?new Date(i.date).getTime()-new Date(d.date).getTime():new Date(d.date).getTime()-new Date(i.date).getTime()),n.length===0?`<form id="client-form" class="p-6 space-y-4"><p class="p-4 text-center text-gray-500">${s}</p></form>`:`
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
    `}function Gn(e,t){const a=e.loyaltyPoints||0;let s='<p class="text-sm text-gray-500">O programa de fidelidade não está ativo.</p>';ze.enabled&&ze.tiers&&(s=ze.tiers.map(o=>{const n=a>=o.points;return`
                <div class="flex justify-between items-center p-3 rounded-lg ${n?"bg-green-50":"bg-gray-100"}">
                    <div>
                        <p class="font-semibold ${n?"text-green-800":"text-gray-800"}">${o.reward}</p>
                        <p class="text-sm ${n?"text-green-600":"text-gray-500"}">${o.points} Pontos</p>
                    </div>
                    <button data-action="redeem-reward" data-points="${o.points}" data-reward="${o.reward}" ${n?"":"disabled"}
                        class="py-1 px-3 text-sm font-semibold rounded-lg ${n?"bg-green-600 text-white hover:bg-green-700":"bg-gray-300 text-gray-500 cursor-not-allowed"}">
                        Resgatar
                    </button>
                </div>`}).join(""));const r=t.length>0?t.map(o=>`
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
                    <div class="space-y-2 max-h-64 overflow-y-auto">${s}</div>
                </div>
                <div>
                    <h4 class="font-semibold text-lg mb-2">Histórico de Pontos</h4>
                    <div class="space-y-2 max-h-80 overflow-y-auto">${r}</div>
                </div>
            </div>
        </form>
    `}function sa(e){R=e,ta="detail";const t=e!==null,a=t?"Editar Cliente":"Adicionar Cliente",s=`
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
    `,r=window.innerWidth<768,o=r?"max-w-full":"max-w-3xl";if(N({title:a,contentHTML:s,maxWidth:o}),r){const u=document.getElementById("genericModal");if(u){const c=u.querySelector(`.${o.replace(":","\\:")}`);c&&(c.style.height="auto",c.style.maxHeight="85vh",c.style.borderRadius="1rem")}}const n=document.getElementById("genericModal");n&&n.addEventListener("click",async u=>{const c=u.target.closest("[data-action]");if(!c)return;switch(c.dataset.action){case"redeem-reward":{const b=parseInt(c.dataset.points,10),f=c.dataset.reward;if(await M("Confirmar Resgate",`Deseja resgatar "${f}" por ${b} pontos?`))try{await Ws(p.establishmentId,R.name,R.phone,{points:b,reward:f}),g("Prémio resgatado com sucesso!","success"),K=await tt(p.establishmentId);const h=K.find(y=>y.id===R.id);h&&(R=h),oa("fidelidade")}catch(k){g(`Erro ao resgatar: ${k.message}`,"error")}break}case"open-comanda-from-history":{const b=c.dataset.appointmentId;b&&(document.getElementById("genericModal").style.display="none",j("comandas-section",{selectedAppointmentId:b,initialFilter:"finalizada"}));break}case"view-appointment":{const b=c.dataset.appointmentId,f=c.dataset.appointmentDate;b&&f&&(document.getElementById("genericModal").style.display="none",j("agenda-section",{targetDate:f,scrollToAppointmentId:b}));break}}}),oa("cadastro");const i=document.getElementById("client-form");i&&i.addEventListener("submit",u=>{u.preventDefault(),Yn()});const d=document.getElementById("cancelDetailViewBtn");d&&d.addEventListener("click",u=>{u.preventDefault(),document.getElementById("genericModal").style.display="none",At()});const l=document.getElementById("deleteClientBtn");l&&l.addEventListener("click",async()=>{await Xn()})}async function Yn(){const e=document.getElementById("client-form");if(!e)return;const t=e.querySelector("#clientId").value,a={name:e.querySelector("#clientName").value,email:e.querySelector("#clientEmail").value,phone:e.querySelector("#clientPhone").value,dob:`${e.querySelector("#clientDobDay").value}/${e.querySelector("#clientDobMonth").value}`,notes:e.querySelector("#clientNotes").value,establishmentId:p.establishmentId};if(!a.name||!a.phone){g("Erro","Nome e Telefone são obrigatórios.","error");return}try{t?(await Vs(t,a),g("Sucesso","Cliente atualizado com sucesso!","success")):(await ma(a),g("Sucesso","Cliente cadastrado com sucesso!","success")),document.getElementById("genericModal").style.display="none",await At()}catch(s){g("Erro",`Não foi possível salvar: ${s.message}`,"error")}}async function Xn(){if(!R||!R.id)return;if(await M("Excluir Cliente",`Tem certeza que deseja excluir ${R.name}? Esta ação é irreversível.`))try{await Us(R.id),g("Sucesso","Cliente excluído.","success"),document.getElementById("genericModal").style.display="none",await At()}catch(t){g("Erro",`Não foi possível excluir: ${t.message}`,"error")}}function ht(e,t){const a=document.getElementById("clientsList");if(a)if(a.innerHTML="",document.getElementById("client-count").textContent=`${e.length} cliente${e.length!==1?"s":""} | Total: ${t}`,e.length>0){const s=U==="inactive",r=U==="birthdays";e.forEach(o=>{const n=document.createElement("div");n.className="client-card bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer",n.dataset.clientId=o.id;const i=o.loyaltyPoints||0,d=ze.enabled?`${i} pts`:`R$ ${i.toFixed(2)}`;let l="";const c=`https://wa.me/55${o.phone?o.phone.replace(/\D/g,""):""}?text=`;if(s){const m=encodeURIComponent(jn(o.name,aa));l=`
                    <a href="${c+m}" target="_blank" title="Enviar Mensagem de Recuperação (WhatsApp)" class="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full flex-shrink-0 ml-2 shadow-md">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                    </a>`}else if(r&&zn(o)){const b=encodeURIComponent(Rn(o.name,aa));l=`
                        <a href="${c+b}" target="_blank" title="Enviar Parabéns por WhatsApp" class="text-white bg-green-500 hover:bg-green-600 p-2 rounded-full flex-shrink-0 ml-2 shadow-md">
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
            `,n.addEventListener("click",()=>sa(o)),a.appendChild(n)})}else a.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum cliente encontrado com os filtros aplicados.</p>'}function yt(e="",t="all"){const a=e.toLowerCase(),s=a.length>0;let r=0,o=90;const n=window.innerWidth<768;if(t==="birthdays"){const d=n?"mobileBirthMonthFilter":"birthMonthFilter",l=document.getElementById(d);l&&(r=parseInt(l.value,10))}else if(t==="inactive"){const d=n?"mobileInactiveDaysFilter":"inactiveDaysFilter",l=document.getElementById(d);l&&(o=parseInt(l.value,10))}let i=K.filter(d=>!s||d.name.toLowerCase().includes(a)||(d.phone||"").includes(a));switch(t){case"birthdays":const d=new Date,l=d.getDate(),u=d.getMonth()+1;return i.filter(c=>{if(!c.dob)return!1;const m=c.dob.split("/");if(m.length!==2)return!1;const b=parseInt(m[0],10),f=parseInt(m[1],10);return r===99?b===l&&f===u:r===0?f>=1&&f<=12:f===r});case"inactive":return i.filter(c=>(c.lastAppointmentDaysAgo||On())>o);case"scheduled":return i.filter(c=>c.loyaltyPoints>50);case"credit":return i.filter(c=>(c.loyaltyPoints||0)>0);case"debit":return i.filter(c=>!1);case"package":return i.filter(c=>!1);case"all":default:return i}}async function Qn(e){const t=document.getElementById("birthMonthFilterContainer"),a=document.getElementById("mobileBirthMonthFilterContainer"),s=document.getElementById("inactiveDaysFilterContainer"),r=document.getElementById("mobileInactiveDaysFilterContainer");if(e==="birthdays"){if(t?.classList.remove("hidden"),a?.classList.remove("hidden"),s?.classList.add("hidden"),r?.classList.add("hidden"),U!=="birthdays"){const d=document.getElementById("birthMonthFilter");d&&(d.value=99);const l=document.getElementById("mobileBirthMonthFilter");l&&(l.value=99)}}else if(e==="inactive"){if(s?.classList.remove("hidden"),r?.classList.remove("hidden"),t?.classList.add("hidden"),a?.classList.add("hidden"),U!=="inactive"){const d=document.getElementById("inactiveDaysFilter");d&&(d.value=90);const l=document.getElementById("mobileInactiveDaysFilter");l&&(l.value=90)}}else t?.classList.add("hidden"),a?.classList.add("hidden"),s?.classList.add("hidden"),r?.classList.add("hidden");if(U===e&&e!=="birthdays"&&e!=="inactive")return;U=e,document.querySelectorAll(".client-filter-btn").forEach(d=>{d.classList.remove("bg-white","text-indigo-600","shadow"),d.classList.add("bg-gray-100","text-gray-600")}),document.querySelectorAll(`[data-filter-key="${e}"]`).forEach(d=>{d&&(d.classList.remove("bg-gray-100","text-gray-600"),d.classList.add("bg-white","text-indigo-600","shadow"))});const n=document.getElementById("clientSearchInput").value,i=yt(n,U);ht(i,K.length)}async function At(){ta="list",Rt.innerHTML=`
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
                            ${za()}
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
                            ${Va()}
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
                            ${za()}
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
                            ${Va()}
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
    `;try{const[u,c]=await Promise.all([tt(p.establishmentId),et(p.establishmentId)]);K=u,ze=c.loyaltyProgram||{enabled:!1},aa=c.name||"O Estabelecimento";const m=yt("",U);ht(m,K.length)}catch{document.getElementById("clientsList").innerHTML='<p class="text-red-500 col-span-full text-center">Erro ao carregar dados dos clientes.</p>'}const e=document.getElementById("filter-sheet"),t=document.getElementById("filter-overlay"),a=document.getElementById("openFilterSheetBtn"),s=document.getElementById("closeFilterSheetBtn"),r=()=>{e.classList.add("show"),t.classList.remove("hidden")},o=()=>{e.classList.remove("show"),t.classList.add("hidden")};a&&a.addEventListener("click",r),s&&s.addEventListener("click",o),t&&t.addEventListener("click",o);const n=u=>{const c=u.target.closest(".client-filter-btn");c&&(Qn(c.dataset.filterKey),window.innerWidth<768&&o())},i=document.getElementById("desktop-filter-bar"),d=document.getElementById("mobile-filter-list");i&&i.addEventListener("click",n),d&&d.addEventListener("click",n);const l=u=>{const c=document.getElementById(u);c&&c.addEventListener("change",()=>{if(U==="birthdays"||U==="inactive"){const m=document.getElementById("clientSearchInput").value,b=yt(m,U);ht(b,K.length)}})};l("birthMonthFilter"),l("mobileBirthMonthFilter"),l("inactiveDaysFilter"),l("mobileInactiveDaysFilter"),Rt.addEventListener("click",async u=>{const c=u.target.closest("[data-action]"),m=u.target.closest(".client-card");if(ta==="list"){if(c){const b=c.dataset.action;b==="new-client"?sa(null):b==="print-list"&&window.print()}else if(m){const b=m.dataset.clientId,f=K.find(v=>v.id===b);f&&sa(f)}}}),Rt.addEventListener("input",u=>{if(u.target.id==="clientSearchInput"){const c=u.target.value,m=yt(c,U);ht(m,K.length)}})}const Qe=()=>w("/api/financial/natures"),Zn=e=>w("/api/financial/natures",{method:"POST",body:JSON.stringify(e)}),Kn=e=>w(`/api/financial/natures/${e}`,{method:"DELETE"}),Ze=()=>w("/api/financial/cost-centers"),ei=e=>w("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(e)}),ti=e=>w(`/api/financial/cost-centers/${e}`,{method:"DELETE"}),Lo=(e,t)=>w(`/api/financial/${e}`,{method:"POST",body:JSON.stringify(t)}),Bo=(e,t={})=>{let a=`/api/financial/${e}`;const s=new URLSearchParams;t.startDate&&s.append("startDate",t.startDate),t.endDate&&s.append("endDate",t.endDate),t.natureId&&s.append("natureId",t.natureId),t.costCenterId&&s.append("costCenterId",t.costCenterId);const r=s.toString();return r&&(a+=`?${r}`),w(a)},To=(e,t,a)=>w(`/api/financial/${e}/${t}`,{method:"PUT",body:JSON.stringify(a)}),Mo=(e,t)=>w(`/api/financial/${e}/${t}`,{method:"DELETE"}),Do=(e,t,a)=>w(`/api/financial/${e}/${t}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),ai=e=>Lo("payables",e),oi=e=>Bo("payables",e),si=(e,t)=>To("payables",e,t),ri=e=>Mo("payables",e),ni=(e,t)=>Do("payables",e,t),ii=e=>Lo("receivables",e),li=e=>Bo("receivables",e),di=(e,t)=>To("receivables",e,t),ci=e=>Mo("receivables",e),ui=(e,t)=>Do("receivables",e,t),mi=(e,t)=>w(`/api/financial/cash-flow?startDate=${e}&endDate=${t}`),pi=()=>w("/api/financial/today-summary"),be=document.getElementById("content"),jt={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},gi={indigo:{name:"Padrão (Índigo)",main:"#4f46e5",light:"#e0e7ff",text:"#ffffff"},rose:{name:"Rosa",main:"#e11d48",light:"#ffe4e6",text:"#ffffff"},green:{name:"Verde",main:"#16a34a",light:"#d1fae5",text:"#ffffff"},sky:{name:"Azul Céu",main:"#0284c7",light:"#e0f2fe",text:"#ffffff"},amber:{name:"Âmbar",main:"#d97706",light:"#fef3c7",text:"#1f2937"}},Po=[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"}];let V=null;function Ua(e,t=null){let a='<option value="">-- Selecione (Opcional) --</option>';const s=n=>{const i=new Map,d=[];return n&&(n.forEach(l=>i.set(l.id,{...l,children:[]})),i.forEach(l=>{l.parentId&&i.has(l.parentId)?i.get(l.parentId).children.push(l):d.push(l)})),d},r=(n,i="")=>{const d=n.id===t?"selected":"";a+=`<option value="${n.id}" ${d}>${i}${n.name}</option>`,n.children.forEach(l=>r(l,i+"— "))};return s(e).forEach(n=>r(n)),a}async function Pe(e,t){const a=t.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const s=V||await et(p.establishmentId),r=[],{ownerName:o,...n}=e;if(o&&o!==p.userName){const l=J.currentUser;l&&r.push(Uo(l,{displayName:o}).then(()=>{p.userName=o}))}const i={...s,...n};r.push(fs(p.establishmentId,i)),await Promise.all(r),V=i,g("Sucesso","Definições salvas com sucesso!","success");const d=document.getElementById("panelEstablishmentName");n.name&&d&&(d.textContent=n.name,p.establishmentName=n.name)}catch(s){g("Erro",`Não foi possível salvar: ${s.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function bi(e,t){t.innerHTML=`
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
    `,t.querySelector("#personal-data-form").addEventListener("submit",a=>{a.preventDefault();const s={ownerName:t.querySelector("#ownerName").value,name:t.querySelector("#establishmentName").value,phone:t.querySelector("#establishmentPhone").value,document:t.querySelector("#establishmentCnpjCpf").value,email:t.querySelector("#establishmentEmail").value,address:t.querySelector("#establishmentAddress").value,website:t.querySelector("#establishmentWebsite").value};Pe(s,a)})}function fi(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#newPassword").value,r=t.querySelector("#confirmPassword").value;if(s!==r){g("Erro","As senhas não coincidem.","error");return}const o=t.querySelector('button[form="change-password-form"]');o.disabled=!0,o.textContent="A Salvar...";try{const n=J.currentUser;if(n)await Vo(n,s),g("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum usuário autenticado encontrado.")}catch(n){g("Erro",`Não foi possível alterar a senha: ${n.message}`,"error")}finally{o.disabled=!1,o.textContent="Salvar Nova Senha"}})}function vi(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#newEmail").value,r=t.querySelector("#currentPassword").value;if(!s||!r){g("Erro","Preencha todos os campos.","error");return}const o=t.querySelector('button[form="change-email-form"]');o.disabled=!0,o.textContent="A verificar...";try{const n=J.currentUser;if(!n)throw new Error("Usuário não autenticado.");const i=Ho.credential(n.email,r);await Oo(n,i),o.textContent="A enviar link...",await zo(n,s),o.textContent="A atualizar BD...",await hs(p.establishmentId,s),g("Sucesso","Link de verificação enviado! Por favor, verifique seu **novo e-mail** para confirmar a alteração.","success"),a.target.reset()}catch(n){let i="Não foi possível alterar o e-mail.";n.code==="auth/wrong-password"?i="A senha atual está incorreta.":n.code==="auth/email-already-in-use"?i="Este e-mail já está sendo usado por outra conta.":n.code==="auth/operation-not-allowed"?i="A troca de e-mail precisa ser habilitada no console do Firebase.":i=n.message,g("Erro",i,"error")}finally{o.disabled=!1,o.textContent="Salvar Novo E-mail"}})}function hi(e,t){t.innerHTML=`
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
    `,t.querySelector("#establishmentLogoBase64").value=e.logo||"",t.querySelector("#establishmentBackgroundImageBase64").value=e.backgroundImage||"",Ao(e.themeColor||"indigo",t),t.querySelector("#establishmentLogoButton").onclick=()=>t.querySelector("#establishmentLogoInput").click(),t.querySelector("#establishmentLogoInput").onchange=a=>{const s=a.target.files[0];if(s){const r=new FileReader;r.onload=o=>{t.querySelector("#establishmentLogoPreview").src=o.target.result,t.querySelector("#establishmentLogoBase64").value=o.target.result},r.readAsDataURL(s)}},t.querySelector("#establishmentBgButton").onclick=()=>t.querySelector("#establishmentBgInput").click(),t.querySelector("#establishmentBgInput").onchange=a=>{const s=a.target.files[0];if(s){const r=new FileReader;r.onload=o=>{t.querySelector("#establishmentBgPreview").src=o.target.result,t.querySelector("#establishmentBgPreview").classList.remove("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=o.target.result},r.readAsDataURL(s)}},t.querySelector("#establishmentBgRemoveBtn").onclick=()=>{t.querySelector("#establishmentBgPreview").src="",t.querySelector("#establishmentBgPreview").classList.add("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.remove("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=""},t.querySelector("#branding-form").addEventListener("submit",a=>{a.preventDefault();const s={logo:t.querySelector("#establishmentLogoBase64").value,welcomeMessage:t.querySelector("#establishmentWelcomeMessage").value,backgroundImage:t.querySelector("#establishmentBackgroundImageBase64").value,primaryColor:t.querySelector("#establishmentPrimaryColorInput").value,textColor:t.querySelector("#establishmentTextColorInput").value,themeColor:t.querySelector("#establishmentThemeColor").value};Pe(s,a)})}function yi(e,t){const a=e.urlId||p.establishmentId,s="https://www.kairosagenda.com.br";let r=window.location.origin;(r.includes("localhost")||r.includes("capacitor://")||r.includes("127.0.0.1")||r.includes("192.168"))&&(r=s);const o=`${r}/agendar?id=${a}`,n=e.publicBookingEnabled||!1,i=n?"Agendamento Online ATIVO":"Agendamento Online INATIVO",d=n?"text-green-600":"text-red-600";t.innerHTML=`
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
    `,t.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const l=t.querySelector("#publicBookingLink");if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(l.value).then(()=>{g("Sucesso","Link copiado para a área de transferência!","success")}).catch(u=>{g("Erro","Não foi possível copiar o link.","error")});else try{l.select(),document.execCommand("copy"),l.blur(),g("Sucesso","Link copiado para a área de transferência!","success")}catch{g("Erro","Não foi possível copiar o link. Por favor, copie manualmente.","error")}}),t.querySelector("#publicBookingToggle").addEventListener("change",async l=>{const u=l.target.checked,c=t.querySelector("#publicBookingStatusText");u?(c.textContent="Agendamento Online ATIVO",c.className="text-sm font-semibold text-green-600"):(c.textContent="Agendamento Online INATIVO",c.className="text-sm font-semibold text-red-600");try{l.target.disabled=!0,await vs(p.establishmentId,u),V.publicBookingEnabled=u,g("Sucesso",`Agendamento online ${u?"ativado":"desativado"}!`,"success")}catch(m){g("Erro",`Não foi possível alterar o status: ${m.message}`,"error"),l.target.checked=!u,u?(c.textContent="Agendamento Online ATIVO",c.className="text-sm font-semibold text-green-600"):(c.textContent="Agendamento Online INATIVO",c.className="text-sm font-semibold text-red-600")}finally{l.target.disabled=!1}}),Ei(e.slotInterval||30,t),t.querySelector("#booking-form").addEventListener("submit",l=>{l.preventDefault();const u={slotInterval:parseInt(t.querySelector("#establishmentSlotInterval").value,10)};Pe(u,l)})}function xi(e,t){t.innerHTML=`
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
    `;const a=t.querySelector("#establishmentTimezone");if(e.timezone)a.value=e.timezone;else try{const o=Intl.DateTimeFormat().resolvedOptions().timeZone;Array.from(a.options).some(i=>i.value===o)?a.value=o:a.value="America/Sao_Paulo"}catch{a.value="America/Sao_Paulo"}const s=t.querySelector("#establishmentWorkingHoursContainer"),r=e.workingHours||{};Object.keys(jt).forEach(o=>{const n=r[o]||{},i=jt[o],d=n.active!==!1,l=document.createElement("div");l.className=`day-schedule-card p-4 rounded-lg ${d?"bg-gray-50":"bg-gray-100 disabled"}`,l.innerHTML=`
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
            </div>`,s.appendChild(l)}),s.addEventListener("change",o=>{const n=o.target.closest('.day-schedule-card input[type="checkbox"]');n&&n.closest(".day-schedule-card").classList.toggle("disabled",!n.checked)}),t.querySelector("#working-hours-form").addEventListener("submit",o=>{o.preventDefault();const n={};Object.keys(jt).forEach(d=>{n[d]={active:t.querySelector(`#est-${d}-active`).checked,start:t.querySelector(`#est-${d}-start`).value,end:t.querySelector(`#est-${d}-end`).value,breakStart:t.querySelector(`#est-${d}-breakStart`).value,breakEnd:t.querySelector(`#est-${d}-breakEnd`).value}});const i=t.querySelector("#establishmentTimezone").value;Pe({workingHours:n,timezone:i},o)})}function wi(e,t){t.innerHTML=`
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
    `;const a=e.loyaltyProgram||{};t.querySelector("#loyaltyEnabled").checked=a.enabled||!1,t.querySelector("#loyaltyPointsPerCurrency").value=a.pointsPerCurrency||10;const s=t.querySelector("#loyaltyTiersContainer"),r=(o={})=>{const n=document.createElement("div");return n.className="loyalty-tier-row",n.innerHTML=`
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
        `,n};(a.tiers||[]).forEach(o=>{s.appendChild(r(o))}),t.querySelector("#add-loyalty-tier").addEventListener("click",()=>{s.appendChild(r())}),s.addEventListener("click",o=>{const n=o.target.closest(".remove-loyalty-tier");n&&n.closest(".loyalty-tier-row").remove()}),t.querySelector("#loyalty-form").addEventListener("submit",o=>{o.preventDefault();const n=Array.from(t.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(d=>({points:parseInt(d.querySelector('input[data-field="points"]').value,10)||0,reward:d.querySelector('input[data-field="reward"]').value,discount:parseFloat(d.querySelector('input[data-field="discount"]').value)||0})),i={loyaltyProgram:{enabled:t.querySelector("#loyaltyEnabled").checked,pointsPerCurrency:parseFloat(t.querySelector("#loyaltyPointsPerCurrency").value)||1,tiers:n.filter(d=>d.points>0&&d.reward)}};Pe(i,o)})}async function ki(e,t){t.innerHTML=`
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
    `;try{const[a,s]=await Promise.all([Qe(),Ze()]),r=e.financialIntegration||{};t.querySelector("#financialNatureId").innerHTML=Ua(a,r.defaultNaturezaId),t.querySelector("#financialCostCenterId").innerHTML=Ua(s,r.defaultCentroDeCustoId)}catch{g("Erro","Não foi possível carregar os dados para a integração financeira.","error")}t.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const s={financialIntegration:{defaultNaturezaId:t.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:t.querySelector("#financialCostCenterId").value||null}};Pe(s,a)})}function Si(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-gray-800">${e}</h3>
            <p class="mt-4 text-gray-500">Esta secção ainda não foi implementada.</p>
        </div>
    `}function Ao(e="indigo",t){const a=t.querySelector("#color-palette-container"),s=t.querySelector("#establishmentThemeColor");!a||!s||(a.innerHTML="",Object.entries(gi).forEach(([r,o])=>{const n=r===e,i=document.createElement("div");i.className="w-24 text-center cursor-pointer",i.innerHTML=`
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${n?"border-blue-500":"border-transparent"} p-1">
                <div class="w-full h-full rounded-full" style="background-color: ${o.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${n?"text-blue-600":"text-gray-600"}">${o.name}</p>
        `,i.addEventListener("click",()=>{s.value=r,Ao(r,t)}),a.appendChild(i)}),s.value=e)}function Ei(e,t){const a=t.querySelector("#slotIntervalContainer"),s=t.querySelector("#establishmentSlotInterval");if(!a||!s)return;const r=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=r.map(o=>{const n=o.value===e;return`<button type="button" data-value="${o.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors 
                           ${n?"bg-indigo-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}">
                       ${o.label}
                   </button>`}).join(""),s.value=e,a.querySelectorAll(".interval-btn").forEach(o=>{o.addEventListener("click",()=>{s.value=o.dataset.value,a.querySelectorAll(".interval-btn").forEach(n=>{n.classList.remove("bg-indigo-600","text-white"),n.classList.add("bg-gray-200","text-gray-700")}),o.classList.add("bg-indigo-600","text-white"),o.classList.remove("bg-gray-200","text-gray-700")})})}async function $i(e){const t=Po.find(s=>s.id===e);if(!t){console.error("Secção de definições não encontrada:",e);return}be.innerHTML=`
        <div class="bg-white p-4 shadow-md sticky top-0 z-10 md:relative">
            <button data-action="back-to-list" class="flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                Voltar
            </button>
        </div>
        
        <div id="settings-content-detail" class="p-4">
            <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
        </div>
    `,be.querySelector('button[data-action="back-to-list"]').addEventListener("click",s=>{s.preventDefault(),qo()});const a=document.getElementById("settings-content-detail");switch(e){case"personal-data":bi(V,a);break;case"change-password":fi(V,a);break;case"change-email":vi(V,a);break;case"branding":hi(V,a);break;case"booking":yi(V,a);break;case"working-hours":xi(V,a);break;case"loyalty":wi(V,a);break;case"financial":await ki(V,a);break;default:Si(t?t.label:"Definições",a)}}async function qo(){if(be.innerHTML=`
        <div class="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>
                Definições
            </h2>
        </div>
        <div class="flex justify-center items-center h-64"><div class="loader"></div></div>
    `,!V)try{V=await et(p.establishmentId)}catch{g("Erro Fatal","Não foi possível carregar os dados do estabelecimento.","error"),be.innerHTML='<p class="text-red-500">Erro ao carregar dados.</p>';return}const e=p.userName||J.currentUser.email,t=e?e.charAt(0).toUpperCase():"U";be.innerHTML=`
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
                ${Po.map(s=>`
                    <button data-section="${s.id}" class="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold text-sm">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${s.icon}"></path></svg>
                        <span class="flex-1 text-left">${s.label}</span>
                        <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                `).join("")}
            </nav>
        </div>
    `,be.querySelector("#settings-menu-list").addEventListener("click",s=>{const r=s.target.closest("button[data-section]");r&&(s.preventDefault(),$i(r.dataset.section))});const a=be.querySelector('[data-action="go-to-my-profile"]');a&&a.addEventListener("click",s=>{s.preventDefault(),j("my-profile-section")})}const Ve=document.getElementById("content");async function Ie(e){const t=document.getElementById("blockagesList");if(t){t.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,s=document.getElementById("filterEndDate")?.value,r=await Ct(p.establishmentId,a||new Date().toISOString().split("T")[0],s||new Date().toISOString().split("T")[0],e),o=document.getElementById("filterReason")?.value.toLowerCase(),n=o?r.filter(d=>d.reason&&d.reason.toLowerCase().includes(o)):r,i=n.reduce((d,l)=>{const u=l.reason||"Sem motivo";return d[u]||(d[u]=[]),d[u].push(l),d},{});if(t.innerHTML="",n.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(i).forEach(([d,l])=>{const u=document.createElement("div");u.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let c=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${d} (${l.length})</h4>`;if(l.length>1){const m=JSON.stringify(l.map(b=>b.id));c+=`<button data-action="batch-delete-blockage" data-ids='${m}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`}c+="</div>",u.innerHTML=c,l.forEach(m=>{const b=new Date(m.startTime),f=new Date(m.endTime),v=b.toLocaleDateString("pt-BR"),k=f.toLocaleDateString("pt-BR"),y=`
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${v===k?`${v} | ${b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${f.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`:`De ${v} às ${b.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}<br>Até ${k} às ${f.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${m.id}">Apagar</button>
                    </div>`;u.innerHTML+=y}),t.appendChild(u)})}catch(a){t.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function Ii(e){e.preventDefault();const t=e.target,a=t.querySelector("#blockageProfId").value,s=t.querySelector("#blockageDate").value,r=t.querySelector("#blockageEndDate").value||s,o=t.querySelector("#blockageStartTime").value,n=t.querySelector("#blockageEndTime").value,i={establishmentId:p.establishmentId,professionalId:a,startTime:new Date(`${s}T${o}:00`).toISOString(),endTime:new Date(`${r}T${n}:00`).toISOString(),reason:t.querySelector("#blockageReason").value};try{await Lt(i),t.reset(),g("Sucesso","Bloqueio adicionado com sucesso!","success"),Ie(a)}catch(d){g("Erro",`Não foi possível criar o bloqueio: ${d.message}`,"error")}}async function Ci(e){e.preventDefault();const t=e.target,a=Array.from(t.querySelectorAll('input[name="batch-professionals"]:checked')).map(u=>u.value);if(a.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const s=t.querySelector("#batchBlockageDate").value,r=t.querySelector("#batchBlockageEndDate").value||s,o=t.querySelector("#batchBlockageStartTime").value,n=t.querySelector("#batchBlockageEndTime").value,i=t.querySelector("#batchBlockageReason").value,d=t.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="Aguarde...";const l=a.map(u=>{const c={establishmentId:p.establishmentId,professionalId:u,startTime:new Date(`${s}T${o}:00`).toISOString(),endTime:new Date(`${r}T${n}:00`).toISOString(),reason:i};return Lt(c)});try{await Promise.all(l),g("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),t.reset(),t.querySelectorAll('input[name="batch-professionals"]:checked').forEach(c=>c.checked=!1);const u=document.getElementById("blockageProfId").value;u&&Ie(u)}catch(u){g("Erro",`Ocorreu um erro: ${u.message}`,"error")}finally{d.disabled=!1,d.textContent="Adicionar Bloqueio em Lote"}}function Li(e){Ve.addEventListener("submit",t=>{t.target.id==="blockageForm"&&Ii(t),t.target.id==="batchBlockageForm"&&Ci(t)}),Ve.addEventListener("input",t=>{t.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&Ie(e)}),Ve.addEventListener("click",async t=>{const a=t.target.closest("button[data-action]");if(!a)return;const s=a.dataset.action;if(s==="back-to-professionals")j("profissionais-section");else if(s==="delete-blockage"){if(await M("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await ua(a.dataset.id),g("Sucesso","Bloqueio removido.","success"),Ie(e)}catch(o){g("Erro",`Não foi possível remover o bloqueio: ${o.message}`,"error")}}else if(s==="batch-delete-blockage"){const r=JSON.parse(a.dataset.ids);if(await M("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${r.length} bloqueios de uma vez?`))try{await go(r),g("Sucesso",`${r.length} bloqueios removidos.`,"success"),Ie(e)}catch(n){g("Erro",`Não foi possível apagar os bloqueios: ${n.message}`,"error")}}})}async function Bi(e){const{professionalId:t,professionalName:a}=e;if(!t||!a){Ve.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}Ve.innerHTML=`
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
        </section>`,Li(t),await Ie(t);const s=document.getElementById("batchProfSelectionContainer");try{const r=await G(p.establishmentId);s.innerHTML=r.map(o=>`
            <div class="flex items-center">
                <input id="prof-batch-${o.id}" value="${o.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${o.id}" class="ml-2 text-sm text-gray-700">${o.name}</label>
            </div>`).join("")}catch{s.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Ti=e=>w(`/api/users/${e}`),Mi=e=>w("/api/users",{method:"POST",body:JSON.stringify(e)}),Di=(e,t)=>w(`/api/users/${e}`,{method:"PUT",body:JSON.stringify(t)}),Pi=e=>w(`/api/users/${e}`,{method:"DELETE"}),Ai=(e,t)=>w(`/api/users/${e}/password`,{method:"PUT",body:JSON.stringify({password:t})}),qi=(e,t)=>w(`/api/users/${e}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),me=document.getElementById("content"),Ni={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios Gerais","sales-report-section":"Relatório de Vendas (Caixa)","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","suppliers-section":"Fornecedores","profissionais-section":"Profissionais","ausencias-section":"Ausências e Bloqueios","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},Fi={view:"Visualizar",create:"Criar",edit:"Editar"};let qe=null,Ne=null;function Ri(e){const t=document.getElementById("usersListContainer");if(!t)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(e.length===0){const s=a?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";t.innerHTML=`<p class="col-span-full text-center text-gray-500">${s}</p>`;return}e.sort((s,r)=>(s.status==="active"?-1:1)-(r.status==="active"?-1:1)),t.innerHTML=e.map(s=>{const r=JSON.stringify(s).replace(/'/g,"&apos;"),o=s.status==="active",n=p.professionals.find(u=>u.id===s.professionalId),i=n?n.name:"N/A",d=n?n.name.charAt(0):s.name.charAt(0),l=n?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(d)}`;return`
        <div class="user-card-clickable bg-white rounded-lg shadow-sm border overflow-hidden flex cursor-pointer ${o?"":"opacity-60"}" 
             data-action="edit-user" 
             data-user='${r}'>
            
            <img src="${l}" alt="Foto de Perfil" class="w-16 h-16 object-cover flex-shrink-0 pointer-events-none">
            
            <div class="p-3 flex-grow flex flex-col justify-between">
                
                <div class="pointer-events-none">
                    <p class="font-bold text-gray-800 text-sm truncate">${s.name}</p>
                    <p class="text-xs text-gray-500 truncate">${s.email}</p>
                    <p class="text-xs text-gray-400 mt-1">Prof: <span class="font-semibold text-gray-700">${i}</span></p>
                </div>
                
                <div class="mt-2 flex items-center justify-start gap-2">
                    <label class="flex items-center cursor-pointer" title="${o?"Ativo":"Inativo"}">
                        <div class="relative">
                            <input type="checkbox" data-action="toggle-user-status" data-user-id="${s.id}" class="sr-only" ${o?"checked":""}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                        </div>
                    </label>
                    
                    <button data-action="delete-user" data-user-id="${s.id}" class="text-gray-500 hover:text-red-600 p-2 rounded-full transition-colors action-btn-delete" title="Excluir Usuário">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `}).join("")}function xt(){const e=document.getElementById("showInactiveUsersToggle")?.checked;let t;e?t=p.users:t=p.users.filter(a=>a.status==="active"),Ri(t)}function ji(e={}){return Object.entries(Ni).map(([t,a])=>{const s=t==="agenda-section"||t==="comandas-section",r=e[t]?.view_all_prof===!0,o=Object.entries(Fi).map(([i,d])=>`
             <label class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${t}" data-permission="${i}" class="sr-only" 
                        ${e[t]?.[i]?"checked":""}>
                    <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                </div>
                <span class="text-xs text-gray-600">${d}</span>
            </label>
        `).join(""),n=s?`
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
                ${o}
            </div>
            ${n}
        </div>
    `}).join("")}async function Ja(e=null){document.getElementById("user-list-view").classList.add("hidden");const t=document.getElementById("user-form-view");t.classList.remove("hidden");let a=p.professionals;if(!a||a.length===0)try{a=await G(p.establishmentId),p.professionals=a}catch{g("Erro","Não foi possível carregar a lista de profissionais.","error")}const s=h=>a.find(y=>y.id===h),r=(h,y)=>{const $=s(h)?.photo,L=y.charAt(0).toUpperCase();return{photoSrc:$||`https://placehold.co/128x128/E2E8F0/4A5568?text=${L}`,initials:L,photoUrl:$||""}},o=e?.professionalId,n=e?.name||"Novo Usuário",i=r(o,n),d=s(o),l=h=>{let y='<option value="">-- Não Associado a um Profissional --</option>';return y+=a.map(E=>`<option value="${E.id}" ${E.id===h?"selected":""}>${E.name} (${E.specialty||"N/A"})</option>`).join(""),y},u=e!==null;t.querySelector("#userFormTitle").textContent=u?`Editar Usuário: ${e.name}`:"Novo Usuário";const c=t.querySelector("#userForm");c.innerHTML=`
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
                    ${u?'<p class="text-xs text-gray-700 mt-1"></p>':""}
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
            
            ${u?"":`
            <div class="bg-red-50 p-4 rounded-lg space-y-3">
                 <h3 class="font-bold text-lg text-red-800">Senha Provisória</h3>
                 <div class="form-group">
                     <label for="userPassword">Senha Provisória</label>
                     <input type="password" id="userPassword" required placeholder="Mínimo 6 caracteres">
                 </div>
            </div>
            `}

            ${u?`
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
                    ${ji(e?.permissions)}
                </div>
            </div>

            <div class="flex gap-4 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-3 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                <button type="submit" class="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar Alterações</button>
            </div>
        </div>
    `;const m=window.innerWidth<768,b=c.querySelector(".bg-white");if(m&&b){b.classList.remove("rounded-xl","shadow-2xl","sm:p-6");const h=c.closest("section");h&&(h.style.padding="0",h.style.margin="0"),b.classList.add("p-4")}const f=c.querySelector("#userProfessionalId"),v=c.querySelector("#userPhotoPreview"),k=c.querySelector("#profPhotoName");if(f.addEventListener("change",h=>{const y=h.target.value,E=s(y),$=E?E.name:"Selecione um profissional",L=r(y,n);v.src=L.photoSrc,k.textContent=$,c.querySelector("#professionalPhotoUrl").value=L.photoUrl}),c.addEventListener("submit",async h=>{h.preventDefault();const y=e?.email,E=c.querySelector("#userEmail").value,$={};c.querySelectorAll('input[type="checkbox"]').forEach(H=>{const T=H.dataset.module,P=H.dataset.permission;$[T]||($[T]={}),$[T][P]=H.checked});const L=c.querySelector("#userProfessionalId").value||null,B={name:c.querySelector("#userName").value,permissions:$,professionalId:L};try{u?(y!==E&&(B.email=E),await Di(e.id,B),g("Usuário atualizado com sucesso!","success")):(B.email=c.querySelector("#userEmail").value,B.password=c.querySelector("#userPassword").value,await Mi(B),g("Usuário criado com sucesso!","success")),Et()}catch(H){g(`Erro: ${H.message}`,"error")}}),u){const h=c.querySelector("#password-change-container"),y=h.querySelector('[data-action="show-password-form"]'),E=h.querySelector("#password-form"),$=E.querySelector('[data-action="save-password"]'),L=E.querySelector('[data-action="cancel-password-change"]');y.addEventListener("click",()=>{y.classList.add("hidden"),E.classList.remove("hidden")}),L.addEventListener("click",()=>{y.classList.remove("hidden"),E.classList.add("hidden"),E.querySelector("#userNewPassword").value=""}),$.addEventListener("click",async()=>{const B=E.querySelector("#userNewPassword").value;if(!B||B.length<6){g("Senha inválida","A nova senha deve ter pelo menos 6 caracteres.","error");return}if(await M("Alterar Senha","Tem a certeza que deseja alterar a senha deste usuário?"))try{$.disabled=!0,$.textContent="Aguarde...",await Ai(e.id,B),g("Sucesso!","A senha do usuário foi alterada.","success"),y.classList.remove("hidden"),E.classList.add("hidden"),E.querySelector("#userNewPassword").value=""}catch(T){g("Erro",`Não foi possível alterar a senha: ${T.message}`,"error")}finally{$.disabled=!1,$.textContent="Salvar Nova Senha"}})}}async function Hi(){const e=document.getElementById("usersListContainer");e.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[t,a]=await Promise.all([Ti(p.establishmentId),G(p.establishmentId)]);p.users=t,p.professionals=a,xt()}catch{g("Erro ao carregar usuários.","error"),e.innerHTML='<p class="col-span-full text-center text-red-500">Não foi possível carregar os usuários.</p>'}}async function Et(){me.innerHTML=`
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
    `,qe&&me.removeEventListener("click",qe),Ne&&me.removeEventListener("change",Ne),qe=async e=>{if(!document.getElementById("user-list-view")){me.removeEventListener("click",qe);return}const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"new-user":Ja();break;case"edit-user":const s=JSON.parse(t.dataset.user.replace(/&apos;/g,"'"));Ja(s);break;case"back-to-list":Et();break;case"delete-user":{e.stopPropagation();const r=t.dataset.userId;if(await M("Excluir Usuário","Tem certeza que deseja excluir este usuário? Esta ação é irreversível."))try{await Pi(r),g("Usuário excluído com sucesso!","success"),Et()}catch(n){g(`Erro ao excluir: ${n.message}`,"error")}break}}},Ne=async e=>{if(!document.getElementById("user-list-view")){me.removeEventListener("change",Ne);return}const t=e.target.closest('input[data-action="toggle-user-status"]');if(e.target.id==="showInactiveUsersToggle")xt();else if(t){e.stopPropagation();const a=t.dataset.userId,s=t.checked?"active":"inactive";try{await qi(a,s),g(`Usuário ${s==="active"?"ativado":"inativado"} com sucesso.`,"success");const r=p.users.findIndex(o=>o.id===a);r>-1&&(p.users[r].status=s,xt())}catch(r){g(`Erro ao atualizar status: ${r.message}`,"error"),t.checked=!t.checked,xt()}}},me.addEventListener("click",qe),me.addEventListener("change",Ne),await Hi()}const Oi=document.getElementById("content");let _a={},ra=null;function zi(){Object.values(_a).forEach(e=>e?.destroy()),_a={}}function Vi(e,t){const{jsPDF:a}=window.jspdf,s=new a({orientation:"landscape",unit:"px",format:"a4"}),r=document.getElementById("salesReportSummaryCards");if(s.setFontSize(18),s.text(e,s.internal.pageSize.getWidth()/2,40,{align:"center"}),r){const n=[["Receita Total",r.querySelector("#summary-revenue").textContent],["Vendas Totais",r.querySelector("#summary-transactions").textContent],["Ticket Médio",r.querySelector("#summary-avg-ticket").textContent]];s.autoTable({startY:60,head:[["Métrica","Valor"]],body:n,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const o=s.lastAutoTable?s.lastAutoTable.finalY+20:60;s.text("Detalhes das Vendas",20,o),s.autoTable({html:`#${t}`,startY:o+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),s.save(`${e.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function Wa(e){const t=document.getElementById("genericModal"),a=(e.payments||[]).map(s=>`
        <div class="flex justify-between text-sm">
            <span>${s.method.charAt(0).toUpperCase()+s.method.slice(1)}</span>
            <span class="font-medium">R$ ${s.value.toFixed(2)}</span>
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
    `,t.style.display="flex"}function Ui(e){const{summary:t,transactions:a}=e;document.getElementById("summary-revenue").textContent=`R$ ${t.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=t.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${t.averageTicket.toFixed(2)}`;const s=document.getElementById("paymentSummaryTableBody"),r=Object.entries(t.paymentMethodTotals).sort(([,i],[,d])=>d-i);s.innerHTML=r.map(([i,d])=>`
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
    `).join(""),o.querySelectorAll("tr").forEach(i=>{i.addEventListener("dblclick",()=>{const d=i.dataset.transactionIndex,l=ra.transactions[d];l&&Wa(l)})}),n.innerHTML=a.map((i,d)=>`
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
    `).join(""),n.querySelectorAll("div[data-transaction-index]").forEach(i=>{i.addEventListener("click",()=>{const d=i.dataset.transactionIndex,l=ra.transactions[d];l&&Wa(l)})})}async function Ga(){const e=document.getElementById("main-reports-view"),t=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!e||!t||!a)return;const s=t.value,r=a.value;if(!s||!r)return g("Atenção","Por favor, selecione as datas de início e fim.","error");e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const o=document.getElementById("cashierSessionFilter").value,n=await Ps({establishmentId:p.establishmentId,startDate:s,endDate:r,cashierSessionId:o});ra=n,e.innerHTML=`
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
        `,Ui(n)}catch(o){g("Erro",`Não foi possível carregar o relatório: ${o.message}`,"error"),e.innerHTML=`<p class="p-8 text-center text-red-500">${o.message}</p>`}}async function Ji(){zi();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];Oi.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",Ga),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const s=document.getElementById("reportStartDate").value,r=document.getElementById("reportEndDate").value,o=`Relatorio_Vendas_${s}_a_${r}`;Vi(o,"transactionsTable")});try{const s=await Er(),r=document.getElementById("cashierSessionFilter");s.forEach(o=>{const n=new Date(o.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),i=o.closedByName||"N/A";r.innerHTML+=`<option value="${o.id}">${i} - ${n}</option>`})}catch{g("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await Ga()}const _i=document.getElementById("content");let I={payables:[],receivables:[],natures:[],costCenters:[],currentFilter:"pending",startDate:new Date(new Date().getFullYear(),new Date().getMonth()-1,1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],previousBalance:0,filterNaturezaId:"all",filterCostCenterId:"all",currentListView:"receivables"},Ht=null,ct=null,ut=null;function wa(e){const t=new Map,a=[];return e&&(e.forEach(s=>t.set(s.id,{...s,children:[]})),t.forEach(s=>{s.parentId&&t.has(s.parentId)?t.get(s.parentId).children.push(s):a.push(s)})),a}function No(e,t,a){if(!t||t.length===0){e.innerHTML='<p class="text-center text-gray-500">Nenhum item criado.</p>';return}const s=(r,o=0)=>{const n="— ".repeat(o);return`
            <div style="margin-left: ${o*20}px;" class="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>${n}${r.name}</span>
                <button data-action="delete-${a}" data-id="${r.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
            </div>
            ${r.children.map(i=>s(i,o+1)).join("")}
        `};e.innerHTML=t.map(r=>s(r)).join("")}async function Ya(e){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const t=document.getElementById("genericModal"),a=e==="nature",s=`Gerir ${a?"Naturezas Financeiras":"Centros de Custo"}`,r=a?Qe:Ze,o=a?"natures":"costCenters";t.innerHTML=`
        <div class="modal-content max-w-lg">
            <h2 class="text-2xl font-bold mb-6">${s}</h2>
            <form id="hierarchyForm" class="space-y-3 mb-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" id="itemName" placeholder="Nome do novo item" required class="p-2 border rounded-md w-full">
                    <select id="itemParent" class="p-2 border rounded-md bg-white w-full"><option value="">-- Nível Principal --</option></select>
                </div>
                <button type="submit" class="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg">Adicionar</button>
            </form>
            <div id="hierarchyList" class="space-y-1 max-h-64 overflow-y-auto p-2 border rounded-md"><div class="loader mx-auto"></div></div>
            <div class="mt-6"><button type="button" data-action="close-modal" data-target="genericModal" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg">Fechar</button></div>
        </div>`,t.style.display="flex";const n=t.querySelector("#hierarchyList"),i=t.querySelector("#itemParent"),d=u=>{const c=wa(u);No(n,c,e),i.innerHTML='<option value="">-- Nível Principal --</option>';const m=(b,f="",v=0)=>{const k=v>0?"— ".repeat(v):"";i.innerHTML+=`<option value="${b.id}">${k}${b.name}</option>`,b.children.forEach(h=>m(h,f+"— "))};c.forEach(b=>m(b))},l=await r();I[o]=l,d(l),t.querySelector("#hierarchyForm").addEventListener("submit",async u=>{u.preventDefault();const c=t.querySelector("#itemName").value,m=i.value,b=a?Zn:ei;try{await b({name:c,parentId:m||null});const f=await r();I[o]=f,d(f),t.querySelector("#hierarchyForm").reset(),await ve()}catch(f){g("Erro",`Não foi possível criar: ${f.message}`,"error")}})}function Wi(e){const t=document.getElementById("cashFlowChart");if(!t)return;const a=t.getContext("2d");Ht&&Ht.destroy();const s=e.payables.map(r=>r*-1);Ht=new Chart(a,{type:"bar",data:{labels:e.labels,datasets:[{label:"Receitas",data:e.receivables,backgroundColor:"rgba(74, 222, 128, 0.6)",borderColor:"rgba(34, 197, 94, 1)",borderWidth:1,yAxisID:"y"},{label:"Despesas",data:s,backgroundColor:"rgba(248, 113, 113, 0.6)",borderColor:"rgba(239, 68, 68, 1)",borderWidth:1,yAxisID:"y"},{label:"Saldo Acumulado",data:e.expectedBalance,type:"line",borderColor:"rgba(59, 130, 246, 1)",backgroundColor:"rgba(59, 130, 246, 0.2)",borderWidth:3,pointRadius:4,pointBackgroundColor:"rgba(59, 130, 246, 1)",fill:!0,tension:.1,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{stacked:!0},y:{type:"linear",display:!0,position:"left",stacked:!0,title:{display:!0,text:"Movimentações (R$)"}},y1:{type:"linear",display:!0,position:"right",title:{display:!0,text:"Saldo Acumulado (R$)"},grid:{drawOnChartArea:!1}}},plugins:{tooltip:{callbacks:{label:function(r){let o=r.dataset.label||"";if(o&&(o+=": "),r.parsed.y!==null){const n=Math.abs(r.parsed.y);o+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(n)}return o}}}}}})}async function Xa(){const e=document.getElementById("cash-flow-chart-container"),t=document.getElementById("cashFlowStartDate").value,a=document.getElementById("cashFlowEndDate").value;if(!t||!a){g("Atenção","Por favor, selecione as datas de início e fim.","error");return}e.innerHTML='<div class="loader mx-auto my-10"></div>';try{const s=await mi(t,a);e.innerHTML='<canvas id="cashFlowChart"></canvas>',Wi(s)}catch(s){e.innerHTML=`<p class="text-red-500 text-center">Erro ao carregar dados do gráfico: ${s.message}</p>`}}function Qa(){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const e=document.getElementById("genericModal"),t=new Date,a=new Date(t.getFullYear(),t.getMonth(),1).toISOString().split("T")[0],s=t.toISOString().split("T")[0];e.innerHTML=`
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
                    <input type="date" id="cashFlowEndDate" value="${s}" class="p-2 border rounded-md">
                </div>
                <button id="generateCashFlowBtn" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Gerar Gráfico</button>
            </div>
            <div id="cash-flow-chart-container" class="relative h-96">
                <canvas id="cashFlowChart"></canvas>
            </div>
        </div>
    `,e.style.display="flex",e.querySelector("#generateCashFlowBtn").addEventListener("click",Xa),Xa()}function Gi(){const e=document.getElementById("genericModal"),t=I.payables.filter(c=>c.status==="pending").reduce((c,m)=>c+m.amount,0),a=I.receivables.filter(c=>c.status==="pending").reduce((c,m)=>c+m.amount,0),s=a-t,r=I.payables.filter(c=>c.status==="paid").reduce((c,m)=>c+m.amount,0),o=I.receivables.filter(c=>c.status==="paid").reduce((c,m)=>c+m.amount,0),n=o-r,i=I.previousBalance||0,d=i+n,l=c=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(c),u=c=>c>=0?"text-green-600":"text-red-600";e.innerHTML=`
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
                            <p class="text-2xl font-bold text-red-600">${l(r)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 ${u(n)==="text-green-600"?"border-green-600":"border-red-600"}">
                            <p class="text-gray-700 text-sm font-medium">Saldo do Período</p>
                            <p class="text-2xl font-bold ${u(n)}">${l(n)}</p>
                        </div>
                    </div>
                </div>

                <!-- BLOCO 2: FLUXO E SALDO ACUMULADO -->
                <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Balanço Patrimonial e Acumulado</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-indigo-400">
                            <p class="text-gray-500 text-sm">Saldo Inicial (Realizado)</p>
                            <p class="text-2xl font-bold ${u(i)}">${l(i)}</p>
                            <p class="text-xs text-gray-400 mt-1">Acumulado antes do período</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 border-blue-600">
                            <p class="text-gray-700 text-sm font-medium">Saldo Final Acumulado</p>
                            <p class="text-2xl font-bold ${u(d)}">${l(d)}</p>
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
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 ${u(s)==="text-green-600"?"border-green-600":"border-red-600"}">
                            <p class="text-gray-700 text-sm font-medium">Saldo Previsto</p>
                            <p class="text-2xl font-bold ${u(s)}">${l(s)}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `,e.style.display="flex"}function Yi(){const e=document.getElementById("genericModal");e.innerHTML=`
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
    `,e.style.display="flex"}function mt(e,t="all"){let a='<option value="all">Todos</option>';const s=n=>{const i=new Map,d=[];return n&&(n.forEach(l=>i.set(l.id,{...l,children:[]})),i.forEach(l=>{l.parentId&&i.has(l.parentId)?i.get(l.parentId).children.push(l):d.push(l)})),d},r=(n,i=0)=>{const d=i>0?"— ".repeat(i):"",l=n.id===t?"selected":"";a+=`<option value="${n.id}" ${l}>${d}${n.name}</option>`,n.children.forEach(u=>r(u,i+1))};return s(e).forEach(n=>r(n)),a}async function ve(){const e=document.getElementById("financial-content"),t=document.getElementById("filterStartDate")?.value,a=document.getElementById("filterEndDate")?.value,s=document.getElementById("filterNaturezaId")?.value,r=document.getElementById("filterCostCenterId")?.value;if(!t||!a){try{const[i,d]=await Promise.all([Qe(),Ze()]);I={...I,natures:i,costCenters:d},document.getElementById("filterNaturezaId")&&(document.getElementById("filterNaturezaId").innerHTML=mt(I.natures)),document.getElementById("filterCostCenterId")&&(document.getElementById("filterCostCenterId").innerHTML=mt(I.costCenters))}catch(i){g("Erro",`Não foi possível carregar os dados base: ${i.message}`,"error")}na(),Ka();return}const o=document.getElementById("payables-list"),n=document.getElementById("receivables-list");o&&(o.innerHTML='<div class="loader mx-auto"></div>'),n&&(n.innerHTML='<div class="loader mx-auto"></div>');try{const i={startDate:t,endDate:a};s&&s!=="all"&&(i.natureId=s),r&&r!=="all"&&(i.costCenterId=r);const[d,l,u,c]=await Promise.all([oi(i),li(i),Qe(),Ze()]),m=l.previousBalance-d.previousBalance;I={...I,payables:d.entries,receivables:l.entries,natures:u,costCenters:c,previousBalance:m,filterNaturezaId:s,filterCostCenterId:r},document.getElementById("filterNaturezaId")&&(document.getElementById("filterNaturezaId").innerHTML=mt(I.natures,I.filterNaturezaId)),document.getElementById("filterCostCenterId")&&(document.getElementById("filterCostCenterId").innerHTML=mt(I.costCenters,I.filterCostCenterId)),na(),Ka()}catch(i){g("Erro",`Não foi possível carregar os dados: ${i.message}`,"error"),e&&(e.innerHTML='<p class="text-red-500 text-center">Falha ao carregar dados.</p>')}}async function Xi(e,t,a=null){e.preventDefault();const s=e.target,r=s.querySelector('[name="status"]').checked,o=s.querySelector('[name="paymentDate"]').value,n=parseFloat(s.querySelector('[name="amount"]').value),i=parseInt(s.querySelector('[name="installments"]')?.value,10)||1;if(isNaN(n)){g("Erro de Validação","O valor inserido é inválido.","error");return}if(r&&!o){g("Erro de Validação","Por favor, forneça a data de pagamento para um lançamento pago.","error");return}const d={description:s.querySelector('[name="description"]').value,amount:n,dueDate:s.querySelector('[name="dueDate"]').value,naturezaId:s.querySelector('[name="naturezaId"]').value||null,centroDeCustoId:s.querySelector('[name="centroDeCustoId"]').value||null,notes:s.querySelector('[name="notes"]').value,status:r?"paid":"pending",paymentDate:r?o:null,installments:a?1:i};try{a?(await(t==="payable"?si(a,d):di(a,d)),g("Sucesso","Lançamento atualizado!","success")):(await(t==="payable"?ai(d):ii(d)),g("Sucesso","Lançamento adicionado!","success")),document.getElementById("genericModal").style.display="none",await ve()}catch(l){g("Erro",`Não foi possível salvar: ${l.message}`,"error")}}async function Qi(e,t){if(await M("Confirmar Exclusão","Tem certeza? Esta ação é irreversível."))try{await(e==="payable"?ri(t):ci(t)),g("Sucesso","Lançamento excluído!","success"),await ve()}catch(s){g("Erro",`Falha ao excluir: ${s.message}`,"error")}}async function Zi(e,t){const a=new Date().toISOString().split("T")[0];try{await(e==="payable"?ni(t,a):ui(t,a)),g("Sucesso","Lançamento atualizado!","success"),await ve()}catch(s){g("Erro",`Falha ao atualizar status: ${s.message}`,"error")}}function Za(e){const t=I.currentFilter;return t==="all"?e:e.filter(a=>a.status===t)}function na(){const e=document.getElementById("payables-list"),t=document.getElementById("receivables-list");if(!e||!t)return;const a=new Map(I.natures.map(i=>[i.id,i.name])),s=new Map(I.costCenters.map(i=>[i.id,i.name])),r=Za(I.payables),o=Za(I.receivables),n=(i,d)=>{const l=i.status==="paid",u=JSON.stringify(i).replace(/'/g,"&apos;"),c=i.naturezaId?a.get(i.naturezaId):"N/A",m=i.centroDeCustoId?s.get(i.centroDeCustoId):"N/A";let b=d==="payable"?"text-red-600":"text-green-600";const f=l?"bg-gray-200 text-gray-600":d==="payable"?"bg-red-100 text-red-700":"bg-yellow-100 text-yellow-700",v=l?"Finalizado":"Pendente";return l&&(b="text-gray-500"),`
        <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 ${l?"border-gray-300 opacity-70":d==="payable"?"border-red-400":"border-green-400"}">
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-bold">${i.description}</p>
                    <p class="text-sm text-gray-500">Vence em: ${new Date(i.dueDate+"T00:00:00").toLocaleDateString("pt-BR")}</p>
                    <div class="flex flex-wrap gap-2 mt-1">
                        <span class="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">Natureza: ${c}</span>
                        <span class="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">C. Custo: ${m}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-right">
                    <p class="font-bold text-lg ${b}">R$ ${i.amount.toFixed(2)}</p>
                    <div class="flex flex-col items-center gap-1">
                        <span class="text-xs font-semibold px-2 py-1 rounded-full ${f}">${v}</span>
                        <div class="flex">
                            ${l?"":`<button data-action="mark-as-paid" data-type="${d}" data-id="${i.id}" class="text-gray-500 hover:text-green-500 p-1" title="Marcar como pago/recebido"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>`}
                            <button data-action="edit" data-type="${d}" data-item='${u}' class="text-gray-400 hover:text-blue-500 p-1" title="Editar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                            <button data-action="delete" data-type="${d}" data-id="${i.id}" class="text-gray-400 hover:text-red-500 p-1" title="Apagar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`};e.innerHTML=r.map(i=>n(i,"payable")).join("")||'<p class="text-center text-gray-500 py-4">Nenhuma conta a pagar.</p>',t.innerHTML=o.map(i=>n(i,"receivable")).join("")||'<p class="text-center text-gray-500 py-4">Nenhuma conta a receber.</p>'}function Ka(){const e=I.payables.filter(r=>r.status==="pending").reduce((r,o)=>r+o.amount,0),t=I.receivables.filter(r=>r.status==="pending").reduce((r,o)=>r+o.amount,0),a=t-e;document.getElementById("summary-pending-receivables").textContent=`R$ ${t.toFixed(2)}`,document.getElementById("summary-pending-payables").textContent=`R$ ${e.toFixed(2)}`,document.getElementById("summary-pending-balance").textContent=`R$ ${a.toFixed(2)}`;const s=document.getElementById("summary-pending-balance");s&&(s.className=`text-2xl font-bold ${a>=0?"text-green-600":"text-red-600"}`)}function Ot(e,t=null){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const a=document.getElementById("genericModal"),s=`${t?"Editar":"Nova"} ${e==="payable"?"Despesa":"Receita"}`,r=e==="payable"?"bg-red-600 hover:bg-red-700":"bg-green-600 hover:bg-green-700",o=m=>{let b='<option value="">-- Selecione (Opcional) --</option>';const f=wa(m),v=(k,h="",y=0)=>{const E=y>0?"— ".repeat(y):"";b+=`<option value="${k.id}">${E}${k.name}</option>`,k.children.forEach($=>v($,h+"— "))};return f.forEach(k=>v(k)),b},n=o(I.natures),i=o(I.costCenters),d=t?"":`
        <div>
            <label>Número de Parcelas</label>
            <input type="number" name="installments" class="w-full p-2 border rounded-md" value="1" min="1" max="36">
        </div>
    `;a.innerHTML=`
        <div class="modal-content max-w-lg">
            <h2 class="text-2xl font-bold mb-6">${s}</h2>
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
        </div>`,a.style.display="flex",t&&(a.querySelector('[name="naturezaId"]').value=t.naturezaId||"",a.querySelector('[name="centroDeCustoId"]').value=t.centroDeCustoId||"");const l=a.querySelector("#status"),u=a.querySelector("#payment-date-container"),c=a.querySelector('[name="paymentDate"]');t?.status==="paid"&&(l.checked=!0,u.classList.remove("hidden"),c.value=t.paymentDate||new Date().toISOString().split("T")[0]),l.addEventListener("change",()=>{u.classList.toggle("hidden",!l.checked),c.required=l.checked}),a.querySelector("#financial-form").addEventListener("submit",m=>Xi(m,e,t?.id))}async function Ki(){const e=new Date,a=new Date(e.getFullYear(),e.getMonth()-1,1).toISOString().split("T")[0],s=e.toISOString().split("T")[0];I.startDate=a,I.endDate=s,I.currentFilter="pending",I.filterNaturezaId="all",I.filterCostCenterId="all",_i.innerHTML=`
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
    `;const r=document.getElementById("main-fab-btn"),o=document.getElementById("fab-menu");if(r&&o){r.addEventListener("click",v=>{v.stopPropagation(),o.classList.toggle("hidden"),r.classList.toggle("rotate-45")});const m=o.querySelector('button[data-action="open-modal"][data-type="receivable"]'),b=o.querySelector('button[data-action="open-modal"][data-type="payable"]'),f=o.querySelector('button[data-action="open-cash-flow-modal"]');m&&m.addEventListener("click",v=>{v.stopPropagation(),Ot("receivable")}),b&&b.addEventListener("click",v=>{v.stopPropagation(),Ot("payable")}),f&&f.addEventListener("click",v=>{v.stopPropagation(),Qa()})}ct&&document.body.removeEventListener("click",ct),ut&&document.getElementById("genericModal").removeEventListener("click",ut);const n=()=>{const m=document.getElementById("filterStartDate"),b=document.getElementById("filterEndDate"),f=document.getElementById("filterNaturezaId"),v=document.getElementById("filterCostCenterId");I.startDate=m.value,I.endDate=b.value,I.filterNaturezaId=f.value,I.filterCostCenterId=v.value;const k=document.getElementById("advanced-filters");k&&k.classList.contains("hidden")===!1&&window.innerWidth<768&&k.classList.add("hidden"),ve()},i=m=>{const b=m.target.closest("[data-status-filter]");if(!b)return;const f=b.dataset.statusFilter;I.currentFilter=f,document.querySelectorAll("[data-status-filter]").forEach(v=>{v.classList.remove("bg-blue-100","text-blue-800"),v.classList.add("bg-gray-100","text-gray-600")}),b.classList.remove("bg-gray-100","text-gray-600"),b.classList.add("bg-blue-100","text-blue-800"),na()},d=m=>{const b=document.getElementById("payables-container"),f=document.getElementById("receivables-container"),v=document.getElementById("btn-payables-view"),k=document.getElementById("btn-receivables-view");window.innerWidth>=1024&&I.currentListView===m||(m==="payables"?(b.classList.remove("hidden"),f.classList.add("hidden"),v&&(v.classList.remove("bg-gray-200"),v.classList.add("bg-red-100","border","border-red-500")),k&&(k.classList.remove("bg-green-100","border","border-green-500"),k.classList.add("bg-gray-200"))):(b.classList.add("hidden"),f.classList.remove("hidden"),v&&(v.classList.remove("bg-red-100","border","border-red-500"),v.classList.add("bg-gray-200")),k&&(k.classList.remove("bg-gray-200"),k.classList.add("bg-green-100","border","border-green-500"))),I.currentListView=m)};document.getElementById("applyDateFilterBtn").addEventListener("click",n),document.getElementById("filterNaturezaId").addEventListener("change",()=>{I.filterNaturezaId=document.getElementById("filterNaturezaId").value}),document.getElementById("filterCostCenterId").addEventListener("change",()=>{I.filterCostCenterId=document.getElementById("filterCostCenterId").value}),document.querySelectorAll("[data-status-filter]").forEach(m=>{m.addEventListener("click",i)}),ct=m=>{const b=m.target.closest("button[data-action]");if(!b)return;const{action:f,type:v,id:k}=b.dataset;f==="edit"?Ot(v,JSON.parse(b.dataset.item.replace(/&apos;/g,"'"))):f==="delete"?Qi(v,k):f==="mark-as-paid"?Zi(v,k):f==="manage-natures"?Ya("nature"):f==="manage-cost-centers"?Ya("cost-center"):f==="open-cash-flow-modal"?Qa():f==="toggle-filters"?document.getElementById("advanced-filters")?.classList.toggle("hidden"):f==="open-indicators-modal"?Gi():f==="open-settings-modal"?Yi():f==="toggle-list-view"&&d(b.dataset.list)},ut=m=>{const b=m.target.closest('button[data-action^="delete-"]');if(b){const f=b.dataset.action.split("-")[1];l(f,b.dataset.id)}},document.body.addEventListener("click",ct),document.getElementById("genericModal").addEventListener("click",ut);async function l(m,b){const f=m==="nature",v=f?Kn:ti,k=f?Qe:Ze,h=f?"natures":"costCenters",y=document.getElementById("hierarchyList");if(await M("Apagar Item","Tem a certeza? Apagar um item principal também apagará os seus sub-itens."))try{await v(b);const $=await k();I[h]=$,No(y,wa($),m),await ve()}catch($){g("Erro",`Não foi possível apagar: ${$.message}`,"error")}}const u=()=>{const m=window.innerWidth<1024,b=document.getElementById("payables-container"),f=document.getElementById("receivables-container"),v=document.getElementById("list-toggle-buttons");b&&f&&(b.classList.remove("hidden"),f.classList.remove("hidden"),m?(b.classList.remove("lg:col-span-1"),f.classList.remove("lg:col-span-1"),v?.classList.remove("hidden"),d(I.currentListView)):(b.classList.add("lg:col-span-1"),f.classList.add("lg:col-span-1"),v?.classList.add("hidden"),b.classList.remove("hidden"),f.classList.remove("hidden")))};u(),window.addEventListener("resize",u);const c=document.querySelector(`[data-status-filter="${I.currentFilter}"]`);c&&(document.querySelectorAll("[data-status-filter]").forEach(m=>{m.classList.remove("bg-blue-100","text-blue-800"),m.classList.add("bg-gray-100","text-gray-600")}),c.classList.remove("bg-gray-100","text-gray-600"),c.classList.add("bg-blue-100","text-blue-800"));try{const m=await pi(),b=document.getElementById("summary-today-payables");b&&(b.textContent=`R$ ${m.totalPayables.toFixed(2)}`);const f=document.getElementById("summary-today-receivables");f&&(f.textContent=`R$ ${m.totalReceivables.toFixed(2)}`)}catch{g("Erro","Não foi possível carregar o resumo do dia.","error")}await ve()}const el=e=>w("/api/commissions/calculate",{method:"POST",body:JSON.stringify(e)}),tl=e=>w("/api/commissions/save",{method:"POST",body:JSON.stringify(e)}),al=(e={})=>{const t=new URLSearchParams(e).toString(),a=`/api/commissions/history${t?"?"+t:""}`;return w(a)},ol=e=>w(`/api/commissions/report/${e}`,{method:"DELETE"}),Ce=document.getElementById("content");let Ue=[],Fo="",pt=null,Ee={};function sl(e){const{jsPDF:t}=window.jspdf,a=new t;a.setFontSize(18),a.text(`Recibo de Comissão - ${e.professionalName}`,105,20,null,null,"center"),a.setFontSize(12),a.text(`Período: ${e.period}`,105,30,null,null,"center"),a.autoTable({startY:40,head:[["Descrição","Valor (R$)"]],body:[["Total Comissionável",`R$ ${e.summary.totalCommissionableValue.toFixed(2)}`],["Total de Itens",e.summary.totalItems]],theme:"striped"});const s=a.lastAutoTable.finalY+20;a.setFontSize(14),a.setFont(void 0,"bold"),a.text("Valor Total da Comissão:",14,s),a.text(`R$ ${e.summary.totalCommission.toFixed(2)}`,190,s,null,null,"right");const r=s+80;a.line(40,r,170,r),a.setFontSize(10),a.setFont(void 0,"normal"),a.text(e.professionalName,105,r+10,null,null,"center"),a.save(`recibo_comissao_${e.professionalName}_${e.period.replace(/\//g,"-")}.pdf`)}function rl(){const e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1).toISOString().split("T")[0],a=e.toISOString().split("T")[0],r=`
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
    `,{modalElement:o}=N({title:"✨ Novo Cálculo de Comissões",contentHTML:r,maxWidth:"max-w-xl"}),n=o.querySelector("#calculation-form"),i=o.querySelector("#calc-professionals-all"),d=o.querySelectorAll(".professional-checkbox");i.addEventListener("change",l=>{d.forEach(u=>{u.checked=l.target.checked})}),d.forEach(l=>{l.addEventListener("change",()=>{l.checked?Array.from(d).every(c=>c.checked)&&(i.checked=!0):i.checked=!1})}),n.addEventListener("submit",l=>{l.preventDefault();const u=Array.from(d).filter(m=>m.checked).map(m=>m.value);if(u.length===0){g("Atenção","Selecione pelo menos um profissional para o cálculo.","error");return}il({professionalIds:u});const c=o.querySelector("[data-close-modal]");c?c.click():o.style.display="none"})}async function nl(e){if(await M("Excluir Relatório","Tem a certeza que deseja excluir permanentemente este relatório de comissão? Esta ação não pode ser desfeita."))try{await ol(e),g("Sucesso!","Relatório de comissão excluído.","success"),wt()}catch(a){g("Erro",`Não foi possível excluir: ${a.message}`,"error")}}async function il(e){const{professionalIds:t}=e,a=document.getElementById("calc-start-date")?.value,s=document.getElementById("calc-end-date")?.value,r={services:document.getElementById("calc-type-services")?.checked,products:document.getElementById("calc-type-products")?.checked,packages:document.getElementById("calc-type-packages")?.checked};if(!a||!s){g("Erro","As datas não foram capturadas corretamente.","error");return}j("commissions-section",{view:"results",isLoading:!0});try{const o=await el({professionalIds:t,startDate:a,endDate:s,calculationTypes:r});Ue=o;const n=`${new Date(a+"T00:00:00").toLocaleDateString("pt-BR")} a ${new Date(s+"T00:00:00").toLocaleDateString("pt-BR")}`;Fo=n,cl(o,n)}catch(o){g("Erro",`Não foi possível calcular: ${o.message}`,"error"),j("commissions-section",{view:"history"})}}async function ll(){if(Ue.length===0){g("Erro","Não há resultados para salvar.","error");return}const e=Fo;if(await M("Salvar Relatórios",`Tem a certeza que deseja salvar ${Ue.length} relatório(s) de comissão para o período de ${e}?`))try{const a=Ue.map(s=>tl({professionalId:s.professionalId,professionalName:s.professionalName,period:e,reportData:s}));await Promise.all(a),g("Sucesso!","Relatórios de comissão salvos.","success"),j("commissions-section",{view:"history"})}catch(a){g("Erro",`Não foi possível salvar: ${a.message}`,"error")}}async function wt(){const e=document.getElementById("commissionHistory");if(!e)return;const t=document.getElementById("filter-professional")?.value||"",a=document.getElementById("filter-month")?.value||"";Ee={},t&&t!=="all"&&(Ee.professionalId=t),a&&(Ee.period=a),e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const s=await al(Ee);if(s.length===0){e.innerHTML='<p class="text-center text-gray-500 py-8">Nenhum relatório de comissão salvo encontrado para os filtros.</p>';return}e.innerHTML=`
            <div class="space-y-3">
                ${s.map(r=>`
                    <div class="bg-white p-4 rounded-lg shadow-sm border" data-id="${r.id}">
                        <div class="flex flex-row justify-between items-start gap-4"> 
                            
                            <div class="flex-shrink min-w-0">
                                <p class="font-bold text-gray-800 truncate">${r.professionalName}</p>
                                <p class="text-sm text-gray-500">Período: ${r.period}</p>
                                <p class="text-xs text-gray-600 mt-1 hidden sm:block">Salvo em: ${new Date(r.createdAt).toLocaleDateString("pt-BR")}</p>
                            </div>
                            
                            <div class="text-right flex flex-col items-end gap-2 flex-shrink-0">
                                <p class="text-lg font-bold text-green-600">R$ ${r.summary.totalCommission.toFixed(2)}</p>
                                
                                <div class="flex gap-2"> 
                                    <button data-action="generate-receipt" data-report='${JSON.stringify(r).replace(/'/g,"&apos;")}' class="py-1 px-3 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg hover:bg-indigo-200">Recibo</button>
                                    <button data-action="delete-report" data-id="${r.id}" class="py-1 px-3 bg-red-100 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-200">Excluir</button>
                                </div>
                            </div>
                        </div>
                    </div>`).join("")}
            </div>`}catch(s){e.innerHTML=`<p class="text-red-500 text-center">Erro ao carregar histórico: ${s.message}</p>`}}function dl(){if(!p.professionals){Ce.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A carregar dados...</p></div>';return}const e=p.professionals.map(o=>`<option value="${o.id}">${o.name}</option>`).join(""),t=[],a=new Date;for(let o=0;o<12;o++){const n=new Date(a.getFullYear(),a.getMonth()-o,1),i=n.getFullYear(),l=(n.getMonth()+1).toString().padStart(2,"0"),u=`${i}-${l}`,c=n.toLocaleDateString("pt-BR",{month:"long",year:"numeric"});t.push(`<option value="${u}">${c}</option>`)}const s=Ee.professionalId||"all",r=Ee.period||"";Ce.innerHTML=`
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
    `,document.getElementById("filter-professional").value=s,document.getElementById("filter-month").value=r,document.getElementById("filter-professional").addEventListener("change",wt),document.getElementById("filter-month").addEventListener("change",wt),wt()}function cl(e,t){Ue=e;const a=e.reduce((s,r)=>s+r.summary.totalCommission,0);Ce.innerHTML=`
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
                ${e.map(s=>`
                    <details class="bg-gray-50 p-3 rounded-lg border">
                        <summary class="flex justify-between items-center cursor-pointer">
                            <p class="font-bold text-gray-800">${s.professionalName}</p>
                            <p class="text-lg font-bold text-green-600">R$ ${s.summary.totalCommission.toFixed(2)}</p>
                        </summary>
                        <div class="mt-4 pt-4 border-t overflow-x-auto">
                            <table class="min-w-full text-xs"> 
                                <thead class="bg-gray-100"><tr>
                                    <th class="px-2 py-1 text-left">Data</th><th class="px-2 py-1 text-left">Item</th>
                                    <th class="px-2 py-1 text-right">Valor</th><th class="px-2 py-1 text-right">Taxa</th><th class="px-2 py-1 text-right">Comissão</th>
                                </tr></thead>
                                <tbody class="divide-y">
                                ${s.items.map(r=>`
                                    <tr>
                                        <td class="px-2 py-1">${new Date(r.date).toLocaleDateString("pt-BR")}</td>
                                        <td class="px-2 py-1">${r.item}</td>
                                        <td class="px-2 py-1 text-right">R$ ${r.value.toFixed(2)}</td>
                                        <td class="px-2 py-1 text-right">${r.commissionRate}%</td>
                                        <td class="px-2 py-1 text-right font-semibold">R$ ${r.commissionValue.toFixed(2)}</td>
                                    </tr>`).join("")}
                                </tbody>
                            </table>
                        </div>
                    </details>
                `).join("")}
                </div>
            </div>
        </section>
    `}async function ul(e={}){const{view:t="history",isLoading:a=!1}=e;if(pt&&Ce.removeEventListener("click",pt),pt=s=>{const r=s.target.closest("button[data-action]");if(!r)return;switch(r.dataset.action){case"open-calculator":rl();break;case"back-to-history":j("commissions-section",{view:"history"});break;case"save-reports":ll();break;case"generate-receipt":const n=JSON.parse(r.dataset.report.replace(/&apos;/g,"'"));sl(n);break;case"delete-report":const i=r.dataset.id;nl(i);break}},Ce.addEventListener("click",pt),a){Ce.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A calcular comissões...</p></div>';return}if(!p.professionals||p.professionals.length===0)try{p.professionals=await G(p.establishmentId)}catch{g("Erro","Não foi possível carregar a lista de profissionais.","error"),p.professionals=[]}(t==="history"||t==="main")&&dl()}const zt=document.getElementById("content");let he={allPackages:[],catalogForModal:{services:[],products:[]}},gt=null,$e=null;function ml(e=6){let t="";for(let a=0;a<e;a++)t+=`
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
        `;return t}function pl(){const e=document.getElementById("packagesListContainer");if(e){if(he.allPackages.length===0){e.innerHTML=`
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
            </div>`;return}e.innerHTML=he.allPackages.map(t=>{const a=t.status==="active",s=JSON.stringify(t).replace(/'/g,"&apos;"),r=t.price||0,o=t.originalPrice||0;t.commissionRate;const n=o>r?o-r:0,i=o>0?(o-r)/o*100:0;return`
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col cursor-pointer"
                 data-action="edit-package" data-package='${s}'>
                
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
        `}).join("")}}function eo(){const e=document.getElementById("genericModal");e.style.display="none",$e&&e.removeEventListener("click",$e)}async function to(e=null){const t=document.getElementById("genericModal"),a=!!e,s=e?JSON.parse(JSON.stringify(e.items||[])):[],r=`
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
    `;t.innerHTML=r,t.style.display="flex";const o=t.querySelector("#package-items-list"),n=(d,l)=>{const u=l.querySelector("#originalPrice"),c=d.reduce((m,b)=>m+b.price*b.quantity,0);u&&(u.textContent=`R$ ${c.toFixed(2)}`)},i=d=>{d.length===0?o.innerHTML='<p class="text-center text-gray-500 p-4">Nenhum item adicionado.</p>':o.innerHTML=d.map((l,u)=>{const c=l.type==="service",m=c?"Serviço":"Produto",b=c?"bg-indigo-100 text-indigo-800":"bg-green-100 text-green-800";return`
                <div class="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-200">
                    <div class="flex items-center gap-3 min-w-0">
                        <input type="number" value="${l.quantity}" min="1" class="w-12 p-1 border rounded-md text-sm quantity-input flex-shrink-0" data-index="${u}">
                        <!-- (NOVO) Selo de Tipo -->
                        <span class="text-xs font-medium px-2 py-0.5 rounded-full ${b}">${m}</span>
                        <span class="font-medium text-gray-800 truncate">${l.name}</span>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="text-sm text-gray-600">R$ ${l.price.toFixed(2)}</span>
                        <!-- (MODIFICADO) Classe do botão de remover -->
                        <button type="button" class="text-red-500 hover:text-red-700 remove-item-btn font-bold" data-index="${u}">&times;</button>
                    </div>
                </div>
            `}).join(""),n(d,t)};i(s),o.addEventListener("change",d=>{if(d.target.classList.contains("quantity-input")){const l=parseInt(d.target.dataset.index,10),u=parseInt(d.target.value,10);u>0&&s[l]&&(s[l].quantity=u,i(s))}}),o.addEventListener("click",d=>{if(d.target.classList.contains("remove-item-btn")){const l=parseInt(d.target.dataset.index,10);s.splice(l,1),i(s)}}),t.querySelector("#add-item-to-package-btn").onclick=()=>gl(d=>{const l=s.find(u=>u.id===d.id&&u.type===d.type);l?l.quantity++:s.push({...d,quantity:1}),i(s)}),$e&&t.removeEventListener("click",$e),$e=async d=>{const l=d.target.closest("button[data-action]");if(!l)return;const u=l.dataset.action;if(d.stopPropagation(),u==="close-modal"&&eo(),u==="save-package"){const c=l,m={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:s,originalPrice:s.reduce((b,f)=>b+f.price*f.quantity,0),price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null};if(!m.name||!m.price){g("Erro","Nome do Pacote e Preço Final são obrigatórios.","error");return}if(m.items.length===0){g("Erro","Adicione pelo menos um item ao pacote.","error");return}c.disabled=!0,c.textContent="A salvar...";try{a?await Cr(m.id,m):(delete m.id,await Ir(m)),g("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),eo(),await ka()}catch(b){g("Erro",`Não foi possível salvar o pacote: ${b.message}`,"error"),c.disabled=!1,c.textContent="Salvar Pacote"}}},t.addEventListener("click",$e)}function gl(e){let t="";const a=document.createElement("div");a.id="item-selection-modal",a.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[110]";const s={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'},r=d=>{const l=t.toLowerCase(),u=he.catalogForModal.services.filter(f=>f.name.toLowerCase().includes(l)),c=he.catalogForModal.products.filter(f=>f.name.toLowerCase().includes(l)),m=u.map(f=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${s.service}</div>
                <span class="flex-grow text-left min-w-0 truncate">${f.name}</span>
                <span class="font-semibold flex-shrink-0">R$ ${f.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum serviço encontrado.</p>',b=c.map(f=>`
            <button data-action="select-item" data-item-type="product" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${s.product}</div>
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
    `,document.body.appendChild(a);const o=a.querySelector("#item-selection-list"),n=a.querySelector("#item-search-input"),i=()=>{a.remove()};r(o),n.addEventListener("input",()=>{t=n.value,r(o)}),a.addEventListener("click",d=>{const l=d.target.closest('[data-action="select-item"]'),u=d.target.closest('[data-action="close-selection-modal"]');if(l){const{itemType:c,itemId:m}=l.dataset,f=(he.catalogForModal[c+"s"]||[]).find(v=>v.id===m);f&&(e({...f,type:c}),i())}else(u||d.target===a)&&i()})}async function ka(){zt.innerHTML=`
        <section id="packages-page" class="p-4 sm:p-6">
             <div class="sticky top-0 z-10 bg-gray-100 sm:bg-transparent pt-3 pb-4 mb-6 -mx-4 -mt-4 sm:mx-0 sm:mt-0 sm:bg-transparent sm:pt-0 sm:pb-0 sm:static">
                <div class="flex justify-between items-center px-4 sm:px-0">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                </div>
            </div>
            
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20">
                ${ml()}
            </div>
            
            <button data-action="new-package" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>
    `,gt&&zt.removeEventListener("click",gt),gt=e=>{if(e.target.closest('[data-action-stop-propagation="true"]')){e.stopPropagation();const s=e.target.closest('[data-action="delete-package"]');if(s){const r=s.dataset.id;M("Excluir Pacote","Tem a certeza que deseja excluir este pacote? Esta ação é irreversível.").then(async o=>{if(o)try{await Lr(r),g("Sucesso!","Pacote excluído.","success"),await ka()}catch(n){g("Erro",`Não foi possível excluir: ${n.message}`,"error")}})}return}const t=e.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!t)return;const a=t.dataset.action;if(a==="new-package")to(null);else if(a==="edit-package"){const s=JSON.parse(t.dataset.package);to(s)}},zt.addEventListener("click",gt);try{const[e,t,a]=await Promise.all([xo(p.establishmentId),De(p.establishmentId),Tt(p.establishmentId)]);he.allPackages=e,he.catalogForModal={services:t.filter(s=>s.active),products:a},pl()}catch{document.getElementById("packagesListContainer").innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar pacotes.</p>'}}const bl=document.getElementById("content");let fl=null;async function vl(){bl.innerHTML=`
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
    `,await hl()}async function hl(){const e=document.getElementById("professional-agenda-block");e.innerHTML="";try{const t=p.userProfessionalId;if(t){const a=await ys(t);fl=a,a.photo&&(document.getElementById("user-profile-avatar").src=a.photo),e.innerHTML=`
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
            `,yl(a.id),document.getElementById("my-blocks-filter").addEventListener("change",r=>$t(a.id,r.target.value)),$t(a.id,"future")}else e.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(t){console.error("Erro ao carregar seção de profissional:",t),e.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${t.message}</p>
            </div>
        `}}function yl(e){const t=document.getElementById("block-schedule-form");t.addEventListener("submit",async a=>{a.preventDefault();const s=t.querySelector("#blockDate").value,r=t.querySelector("#blockStartTime").value,o=t.querySelector("#blockEndTime").value,n=t.querySelector("#blockReason").value;if(!s||!r||!o){g("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(r>=o){g("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const i=new Date(`${s}T${r}:00`),d=new Date(`${s}T${o}:00`),l=t.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="A bloquear...";try{await Lt({establishmentId:p.establishmentId,professionalId:e,reason:n||"Bloqueado (Meu Perfil)",startTime:i.toISOString(),endTime:d.toISOString()}),g("Sucesso","Agenda bloqueada com sucesso!","success"),t.reset();const u=document.getElementById("my-blocks-filter").value;$t(e,u)}catch(u){console.error("Erro ao bloquear agenda:",u),g("Erro",`Não foi possível bloquear a agenda: ${u.message}`,"error")}finally{l.disabled=!1,l.textContent="Bloquear Agenda"}})}async function $t(e,t="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const s=new Date;let r,o;t==="history"?(o=new Date,r=new Date,r.setFullYear(r.getFullYear()-1)):(r=new Date,o=new Date,o.setFullYear(o.getFullYear()+1));let i=(await Ct(p.establishmentId,r.toISOString(),o.toISOString(),e)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));t==="history"?i=i.filter(d=>d.endTime<s).sort((d,l)=>l.startTime-d.startTime):i=i.filter(d=>d.endTime>=s).sort((d,l)=>d.startTime-l.startTime),i.length>0?(a.innerHTML=i.map(d=>{const l=d.startTime.toLocaleDateString("pt-BR"),u=`${d.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${d.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`;return`
                    <div class="flex items-center justify-between p-3 ${d.endTime<new Date?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${l} das ${u}</p>
                            <p class="text-sm text-gray-600">${d.reason||"Sem motivo"}</p>
                        </div>
                        <button data-block-id="${d.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(d=>{d.addEventListener("click",async l=>{const u=l.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await ua(u),g("Sucesso","Bloqueio removido.","success"),$t(e,t)}catch(c){console.error("Erro ao remover bloqueio:",c),g("Erro",`Não foi possível remover o bloqueio: ${c.message}`,"error")}})})):a.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${t==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(s){console.error("Erro ao carregar bloqueios:",s),a.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${s.message}</p>`}}const ao=document.getElementById("loadingScreen"),Vt=document.getElementById("dashboardContent"),Ut=document.getElementById("content"),oo=document.getElementById("notificationBell"),Jt=document.getElementById("notificationBadge"),bt=document.getElementById("notificationPanel"),so=document.getElementById("notificationList"),_t=document.getElementById("profileMenuButton"),Y=document.getElementById("profileDropdown"),xl=document.getElementById("profileName"),wl=document.getElementById("profileEmail"),kl=document.getElementById("logoutButton"),Sl=document.getElementById("cancellationHistoryBtn"),ro=document.getElementById("myProfileLink"),no={indigo:{main:"#4f46e5",light:"#e0e7ff",text:"white",hover:"#4338ca"},rose:{main:"#e11d48",light:"#ffe4e6",text:"white",hover:"#be123c"},green:{main:"#16a34a",light:"#d1fae5",text:"white",hover:"#15803d"},sky:{main:"#0284c7",light:"#e0f2fe",text:"white",hover:"#0369a1"},amber:{main:"#d97706",light:"#fef3c7",text:"#1f2937",hover:"#b45309"}};let Je=null,_e=[];const El={"agenda-section":ho,"comandas-section":ga,"relatorios-section":Zt,"servicos-section":rn,"produtos-section":hn,"suppliers-section":Cn,"profissionais-section":St,"clientes-section":At,"estabelecimento-section":qo,"ausencias-section":Bi,"users-section":Et,"sales-report-section":Ji,"financial-section":Ki,"commissions-section":ul,"packages-section":ka,"my-profile-section":vl};function $l(e){const t=no[e]||no.indigo,a=document.getElementById("dynamic-theme-styles"),r=(n=>{const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);return i?`${parseInt(i[1],16)}, ${parseInt(i[2],16)}, ${parseInt(i[3],16)}`:null})(t.main),o=e==="amber"?"#1f2937":"white";a.innerHTML=`
        .sidebar-link.active { 
            background-color: ${t.main}; 
            color: ${o}; 
        }
        .sidebar-link:not(.active):hover { 
            background-color: rgba(${r}, 0.2);
        }
    `}function ia(){const e=_e.filter(t=>!t.read).length;if(e>0?(Jt.textContent=e,Jt.classList.remove("hidden")):Jt.classList.add("hidden"),_e.length===0){so.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}so.innerHTML=_e.map(t=>`
    <div class="notification-item ${t.read?"":"unread"}">
    <p class="font-semibold">${t.title}</p>
    <p class="text-sm text-gray-600">${t.message}</p>
    <p class="text-xs text-gray-400 mt-1">${t.time}</p>
    </div>
    `).join("")}function Il(e){Je&&Je();const t=Ke(de,"establishments",e,"notifications"),a=co(t,Xo("timestamp",">=",new Date),uo("timestamp","desc"));Je=Qo(a,s=>{s.docChanges().forEach(r=>{if(r.type==="added"){const o=r.doc.data();_e.unshift({title:o.title,message:o.message,time:o.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),g(o.title,o.message,"info",!0),ia();const n=document.querySelector(".sidebar-link.active");n&&n.dataset.target==="agenda-section"&&(o.type==="cancellation"||o.type==="new_appointment")&&(console.log("Atualizando agenda em tempo real..."),ho())}})},s=>{console.error("Erro no listener de notificações em tempo real:",s),g("Erro de Conexão","Não foi possível receber atualizações em tempo real. Verifique as regras de segurança do Firestore.","error")})}function j(e,t={}){const a=e.replace("-section","");if(e!=="my-profile-section"){const r=p.enabledModules?.[a]!==!1,o=p.userPermissions===null||p.userPermissions[e]?.view===!0;if(!r||!o){Ut.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>',document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active"));return}}const s=El[e];s?(document.querySelectorAll(".sidebar-link").forEach(r=>{r.classList.toggle("active",r.getAttribute("data-target")===e)}),e==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(r=>r.classList.remove("active")),Ut.innerHTML="",s(t)):(Ut.innerHTML=`<div class="p-8 text-center"><h2 class="text-2xl font-bold">Página em Construção</h2><p class="text-gray-600">O módulo para "${e}" ainda não foi implementado.</p></div>`,console.warn(`Nenhum carregador de página definido para: ${e}`))}async function Cl(e){const t=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),s=document.getElementById("kpi-today-appointments"),r=document.getElementById("kpi-today-revenue"),o=e===null||e["agenda-section"]?.view===!0,n=e===null||e["financial-section"]?.view===!0;if(o&&t&&t.classList.remove("hidden"),n&&a&&a.classList.remove("hidden"),!(!o&&!n))try{const i=await Fs();o&&s&&(s.textContent=i.todayAppointments.toString()),n&&r&&(r.textContent=`R$ ${i.todayRevenue.toFixed(2).replace(".",",")}`)}catch(i){console.error("Erro ao carregar KPIs do cabeçalho:",i),o&&s&&(s.textContent="Erro"),n&&r&&(r.textContent="Erro")}}async function Ll(e){try{We.getPlatform()==="android"&&(await oe.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0}),console.log("Canal de notificação Android criado com sucesso."));let t=await oe.checkPermissions();if(t.receive==="prompt"&&(t=await oe.requestPermissions()),t.receive!=="granted"){console.warn("Permissão de notificação push foi negada pelo utilizador.");return}await oe.register(),oe.addListener("registration",async a=>{console.log("Push Token gerado:",a.value);try{const s=la(de,"users",e);await Yo(s,{fcmToken:a.value}),console.log("Token FCM salvo no perfil do utilizador.")}catch(s){console.error("Erro ao salvar token FCM:",s)}}),oe.addListener("registrationError",a=>{console.error("Erro no registo de push notifications:",a)}),oe.addListener("pushNotificationReceived",a=>{console.log("Notificação Push recebida:",a),g(a.title,a.body,"info",!0)}),oe.addListener("pushNotificationActionPerformed",a=>{console.log("Ação na notificação push:",a),j("agenda-section")})}catch(t){console.log("Push Notifications não suportado/inicializado:",t)}}function Bl(){We.isNativePlatform()&&(document.body.classList.add("is-app-native"),console.log("Modo App Nativo detectado: Layout ajustado para Safe Areas.")),cs(),oo.addEventListener("click",e=>{e.stopPropagation(),bt.classList.toggle("hidden"),bt.classList.contains("hidden")||(_e.forEach(t=>t.read=!0),ia())}),Sl.addEventListener("click",()=>{us()}),_t.addEventListener("click",e=>{e.stopPropagation(),Y.classList.toggle("active"),Y.classList.contains("active")?Y.classList.remove("hidden"):setTimeout(()=>Y.classList.add("hidden"),200)}),ro&&ro.addEventListener("click",e=>{e.preventDefault(),j("my-profile-section"),Y.classList.remove("active"),Y.classList.add("hidden")}),document.addEventListener("click",e=>{!bt.contains(e.target)&&e.target!==oo&&bt.classList.add("hidden"),!Y.contains(e.target)&&e.target!==_t&&Y.classList.contains("active")&&(Y.classList.remove("active"),setTimeout(()=>Y.classList.add("hidden"),200))}),Jo(J,async e=>{if(e)try{const a=(await e.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="employee")&&a.establishmentId){const s=await et(a.establishmentId);p.enabledModules=s.modules,$l(s.themeColor);let r=null,o=e.displayName,n=null;if(a.role==="employee"||a.role==="owner"){const l=la(de,"users",e.uid),u=await Go(l);if(u.exists()){const c=u.data();r=a.role==="employee"?c.permissions||{}:null,o=c.name||o,n=c.professionalId||null}else if(a.role==="employee")throw new Error("Dados de permissão do funcionário não encontrados.")}p.userProfessionalId=n,Ll(e.uid);const i=o||e.email;Ko(a.establishmentId,s.name,r),_t.textContent=i.charAt(0).toUpperCase(),xl.textContent=i,wl.textContent=e.email;const d=()=>{Je&&Je(),Sa(J).then(()=>window.location.href="/login.html")};kl.addEventListener("click",l=>{l.preventDefault(),d()}),bs(j,r,p.enabledModules),Cl(r),Il(a.establishmentId),ia(),ao.style.display="none",Vt.style.display="flex",j("agenda-section")}else throw new Error("Utilizador não tem permissão de 'owner' ou 'employee' ou 'establishmentId'.")}catch(t){console.error("Erro crítico na inicialização do painel:",t),ao.style.display="none",Vt.innerHTML=`
                    <div class="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
                        <h2 class="text-2xl font-bold text-red-600 mb-4">Erro de Acesso</h2>
                        <p class="text-gray-700 text-center mb-6">Não foi possível carregar os seus dados ou permissões. Isto pode acontecer se a sua conta foi desativada ou está configurada incorretamente.</p>
                        <p class="text-sm text-gray-500 mb-6">Detalhe do erro: ${t.message}</p>
                        <button id="errorLogoutButton" class="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700">Sair e Tentar Novamente</button>
                    </div>
                `,Vt.style.display="flex",document.getElementById("errorLogoutButton").addEventListener("click",()=>{Sa(J).then(()=>window.location.href="/login.html")})}else window.location.href="/login.html"})}Bl();
