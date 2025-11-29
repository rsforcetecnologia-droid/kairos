import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{initializeApp as jo}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";import{getAuth as Oo,EmailAuthProvider as lo,reauthenticateWithCredential as co,deleteUser as zo,verifyBeforeUpdateEmail as Vo,updatePassword as Uo,updateProfile as _o,onAuthStateChanged as Jo,signOut as Sa}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";import{getFirestore as Wo,addDoc as la,collection as De,getDocs as uo,query as mo,orderBy as po,doc as It,deleteDoc as Go,updateDoc as go,getDoc as Yo,where as Xo,onSnapshot as Qo}from"https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";const Zo={apiKey:"AIzaSyAlJaPEW5-yOb-8wkB8EJZhAML2M2yI8Ao",authDomain:"kairos-system.firebaseapp.com",projectId:"kairos-system",storageBucket:"kairos-system.appspot.com",messagingSenderId:"603994960586",appId:"1:603994960586:web:30d2c030eed3c55eccfa33",measurementId:"G-SVHFXKV5EC"},bo=jo(Zo),U=Oo(bo),X=Wo(bo),p={establishmentId:null,establishmentName:null,userName:null,userProfessionalId:null,userPermissions:null,enabledModules:{agenda:!0,comandas:!0,relatorios:!0,commissions:!0,packages:!0,financial:!0,servicos:!0,produtos:!0,profissionais:!0,clientes:!0,users:!0,estabelecimento:!0},professionals:[],services:[],professionalColors:new Map,allEvents:[]};function Ko(e,t,a){p.establishmentId=e,p.establishmentName=t,p.userPermissions=a}const Wt="https://kairos-service-603994960586.southamerica-east1.run.app";console.log("🚀 API configurada para Produção:",Wt);async function es(){const e=U.currentUser;return e?{"Content-Type":"application/json",Authorization:`Bearer ${await e.getIdToken()}`}:(console.warn("Usuário não logado, tentando redirecionar para /login"),window.location.href="/login",null)}async function w(e,t={}){const a=await es();if(!a)throw new Error("Utilizador não autenticado. A requisição foi cancelada.");const o=`${Wt}${e}`;console.log(`AuthenticatedFetch: ${t.method||"GET"} ${o}`);try{const r=await fetch(o,{...t,headers:{...a,...t.headers}});if(!r.ok){const n=(await r.json().catch(()=>({message:r.statusText}))).message||`Erro na API: ${r.status}`;if(n.includes("FAILED_PRECONDITION")&&n.includes("requires an index")){const i=/(https:\/\/[^\s]+)/,d=n.match(i),l=d?d[0]:"URL não encontrada na mensagem de erro.";console.warn(`%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${e}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${l}%c
                    
--------------------------------------------------------------------`,"background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;","color: #663300; font-size: 12px;","color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;","color: #663300; font-size: 12px;")}throw console.error(`Erro na API (${r.status}) em ${o}:`,n),new Error(n)}return r.json()}catch(r){throw console.error(`Falha de rede ao tentar acessar ${o}:`,r.message),r.message.includes("Failed to fetch")||r.message.includes("NetworkError")?new Error(`Não foi possível conectar ao servidor em ${Wt}. Verifique sua conexão com a internet.`):r}}const ts=(e,t,a,o=null)=>{let r=`/api/appointments/${e}?startDate=${t}&endDate=${a}`;return o&&(r+=`&professionalId=${o}`),w(r)},as=(e,t,a)=>{const o=`/api/appointments/cancelled/${e}?startDate=${t}&endDate=${a}`;return w(o)},os=e=>w("/api/appointments",{method:"POST",body:JSON.stringify(e)}),da=(e,t)=>w(`/api/appointments/${e}`,{method:"PUT",body:JSON.stringify(t)}),ss=e=>w(`/api/appointments/${e}`,{method:"DELETE"}),rs=e=>w(`/api/appointments/${e}/reopen`,{method:"POST"}),ns=(e,t)=>w(`/api/appointments/${e}/checkout`,{method:"POST",body:JSON.stringify(t)});let N;async function is(){if(!N)try{N=new(window.AudioContext||window.webkitAudioContext)}catch(e){console.error("Não foi possível inicializar o áudio:",e)}}function ls(){if(!N){console.warn("AudioContext não inicializado. O som não será tocado.");return}N.state==="suspended"&&N.resume();const e=N.createOscillator(),t=N.createGain();e.connect(t),t.connect(N.destination),e.type="sine",e.frequency.setValueAtTime(800,N.currentTime),t.gain.setValueAtTime(0,N.currentTime),t.gain.linearRampToValueAtTime(.3,N.currentTime+.01),t.gain.exponentialRampToValueAtTime(1e-4,N.currentTime+.2),e.start(N.currentTime),e.stop(N.currentTime+.2)}function g(e,t,a="info",o=!1){const r=document.getElementById("toast-container");if(!r)return;o&&ls();const s=document.createElement("div"),n={success:"bg-green-50 border-green-400 text-green-700",error:"bg-red-50 border-red-400 text-red-700",info:"bg-blue-50 border-blue-400 text-blue-700"},i={success:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',error:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',info:'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'},d={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500"};s.className=`toast ${n[a]||n.info}`,s.innerHTML=`
        <div class="toast-icon">${i[a]||i.info}</div>
        <div class="toast-content">
            <p class="font-bold">${e}</p>
            <p class="text-sm">${t}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${d[a]||d.info}"></div>
        </div>
    `,r.appendChild(s),s.querySelector(".toast-close").addEventListener("click",()=>s.remove()),setTimeout(()=>{s.remove()},4e3)}function M(e,t){const a=document.getElementById("genericModal");return new Promise(o=>{a.innerHTML=`
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
            </div>`,a.style.display="flex",document.getElementById("genericModalConfirmBtn").onclick=()=>{a.style.display="none",o(!0)},document.getElementById("genericModalCancelBtn").onclick=()=>{a.style.display="none",o(!1)}})}function H({title:e,contentHTML:t,maxWidth:a="max-w-4xl",showCloseButton:o=!0}){let r=document.getElementById("genericModal");const s=r.cloneNode(!1);r.parentNode.replaceChild(s,r),r=s;const n=()=>{r.style.display="none"},i=u=>{r.querySelector("#genericModalContentBody").innerHTML=u};r.innerHTML=`
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
    `;const d=r.querySelector("[data-close-modal]");d&&(d.onclick=n);const l=r.querySelector('[data-action="close-modal"]');return l&&(l.onclick=n),r.addEventListener("click",u=>{u.target.closest(".modal-content")||n()}),r.style.display="flex",{modalElement:r,close:n,setContent:i}}function ds(e){const t=document.getElementById(e);t&&(t.style.display="none")}function cs(){document.body.addEventListener("click",()=>{N||is()},{once:!0}),document.addEventListener("click",e=>{const t=e.target.closest('[data-action="close-modal"]');if(t){const o=t.dataset.target;if(o){const r=document.getElementById(o);r&&(r.style.display="none")}}if(e.target.closest("[data-close-modal]")){const o=document.getElementById("genericModal");o&&(o.style.display="none")}})}async function $a(){const e=document.getElementById("cancellationListContainer");if(!e)return;e.innerHTML='<div class="loader mx-auto"></div>';const t=document.getElementById("cancelStartDate").value,a=document.getElementById("cancelEndDate").value;try{const o=await as(p.establishmentId,t,a);if(o.length===0){e.innerHTML='<p class="text-center text-gray-500 py-4">Nenhum cancelamento encontrado para este período.</p>';return}e.innerHTML=o.map(r=>`
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
    `,{modalElement:r}=H({title:"Histórico de Cancelamentos",contentHTML:o,maxWidth:"max-w-3xl"});r.querySelector("#searchCancellationsBtn").addEventListener("click",$a),$a()}const V=document.getElementById("sidebar"),Ia=document.getElementById("sidebarToggle"),Re=document.getElementById("mainContent"),ms=document.querySelectorAll(".sidebar-link"),Ca=document.getElementById("hamburger-menu-btn"),Le=document.getElementById("mobile-overlay");function bt(e){!V||!Re||(V.classList.toggle("collapsed",e),Re.classList.toggle("sidebar-collapsed-shift",e))}function ps(){!V||!Le||(V.classList.add("mobile-open"),Le.classList.add("visible"))}function nt(){!V||!Le||(V.classList.remove("mobile-open"),Le.classList.remove("visible"))}function gs(){bt(!V.classList.contains("collapsed"))}function bs(e,t,a){if(!V||!Re)return;Re.classList.add("main-content-shift"),window.innerWidth>=768?bt(V.classList.contains("collapsed")):(Re.classList.remove("main-content-shift","sidebar-collapsed-shift"),nt()),Ia&&Ia.addEventListener("click",r=>{r.stopPropagation(),gs()}),V.addEventListener("mouseenter",()=>{window.innerWidth>=1024&&V.classList.contains("collapsed")&&bt(!1)}),V.addEventListener("mouseleave",()=>{window.innerWidth>=1024&&(document.querySelector("#sidebarToggle:hover")||bt(!0))}),Ca&&Ca.addEventListener("click",r=>{r.stopPropagation(),ps()}),Le&&Le.addEventListener("click",r=>{r.stopPropagation(),nt()});let o=0;V.addEventListener("touchstart",r=>{o=r.changedTouches[0].screenX},{passive:!0}),V.addEventListener("touchend",r=>{const s=r.changedTouches[0].screenX;o-s>50&&nt()},{passive:!0}),ms.forEach(r=>{const s=r.getAttribute("data-target"),n=s.replace("-section",""),i=a?.[n]!==!1,d=t===null||t[s]?.view===!0;if(!i||!d){r.style.display="none";return}r.style.display="flex",r.addEventListener("click",l=>{l.preventDefault(),s&&typeof e=="function"&&e(s),window.innerWidth<768&&nt()})})}const Ke=e=>{const t=e||p.establishmentId;return t?w(`/api/establishments/${t}`):Promise.reject(new Error("ID do estabelecimento não fornecido."))},fs=(e,t)=>{const a=e||p.establishmentId;return a?w(`/api/establishments/${a}`,{method:"PUT",body:JSON.stringify(t)}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},vs=(e,t)=>{const a=e||p.establishmentId;return a?w(`/api/establishments/${a}/booking-status`,{method:"PATCH",body:JSON.stringify({publicBookingEnabled:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},hs=(e,t)=>{const a=e||p.establishmentId;return a?w(`/api/establishments/${a}/owner-email`,{method:"PATCH",body:JSON.stringify({newEmail:t})}):Promise.reject(new Error("ID do estabelecimento não fornecido."))},G=e=>w(`/api/professionals/${e}`),ys=e=>w(`/api/professionals/details/${e}`),xs=e=>w("/api/professionals",{method:"POST",body:JSON.stringify(e)}),ws=(e,t)=>w(`/api/professionals/${e}`,{method:"PUT",body:JSON.stringify(t)}),ks=e=>w(`/api/professionals/${e}`,{method:"DELETE"});var Be;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(Be||(Be={}));class qt extends Error{constructor(t,a,o){super(t),this.message=t,this.code=a,this.data=o}}const Es=e=>{var t,a;return e?.androidBridge?"android":!((a=(t=e?.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},Ss=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},o=a.Plugins=a.Plugins||{},r=()=>t!==null?t.name:Es(e),s=()=>r()!=="web",n=c=>{const m=l.get(c);return!!(m?.platforms.has(r())||i(c))},i=c=>{var m;return(m=a.PluginHeaders)===null||m===void 0?void 0:m.find(b=>b.name===c)},d=c=>e.console.error(c),l=new Map,u=(c,m={})=>{const b=l.get(c);if(b)return console.warn(`Capacitor plugin "${c}" already registered. Cannot register plugins twice.`),b.proxy;const f=r(),v=i(c);let k;const h=async()=>(!k&&f in m?k=typeof m[f]=="function"?k=await m[f]():k=m[f]:t!==null&&!k&&"web"in m&&(k=typeof m.web=="function"?k=await m.web():k=m.web),k),y=(T,P)=>{var A,O;if(v){const oe=v?.methods.find(J=>P===J.name);if(oe)return oe.rtype==="promise"?J=>a.nativePromise(c,P.toString(),J):(J,st)=>a.nativeCallback(c,P.toString(),J,st);if(T)return(A=T[P])===null||A===void 0?void 0:A.bind(T)}else{if(T)return(O=T[P])===null||O===void 0?void 0:O.bind(T);throw new qt(`"${c}" plugin is not implemented on ${f}`,Be.Unimplemented)}},S=T=>{let P;const A=(...O)=>{const oe=h().then(J=>{const st=y(J,T);if(st){const rt=st(...O);return P=rt?.remove,rt}else throw new qt(`"${c}.${T}()" is not implemented on ${f}`,Be.Unimplemented)});return T==="addListener"&&(oe.remove=async()=>P()),oe};return A.toString=()=>`${T.toString()}() { [capacitor code] }`,Object.defineProperty(A,"name",{value:T,writable:!1,configurable:!1}),A},$=S("addListener"),L=S("removeListener"),B=(T,P)=>{const A=$({eventName:T},P),O=async()=>{const J=await A;L({eventName:T,callbackId:J},P)},oe=new Promise(J=>A.then(()=>J({remove:O})));return oe.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await O()},oe},j=new Proxy({},{get(T,P){switch(P){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return v?B:$;case"removeListener":return L;default:return S(P)}}});return o[c]=j,l.set(c,{name:c,proxy:j,platforms:new Set([...Object.keys(m),...v?[f]:[]])}),j};return a.convertFileSrc||(a.convertFileSrc=c=>c),a.getPlatform=r,a.handleError=d,a.isNativePlatform=s,a.isPluginAvailable=n,a.registerPlugin=u,a.Exception=qt,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},$s=e=>e.Capacitor=Ss(e),wt=$s(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),ca=wt.registerPlugin;class fo{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let o=!1;this.listeners[t]||(this.listeners[t]=[],o=!0),this.listeners[t].push(a);const s=this.windowListeners[t];s&&!s.registered&&this.addWindowListener(s),o&&this.sendRetainedArgumentsForEvent(t);const n=async()=>this.removeListener(t,a);return Promise.resolve({remove:n})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,o){const r=this.listeners[t];if(!r){if(o){let s=this.retainedEventArguments[t];s||(s=[]),s.push(a),this.retainedEventArguments[t]=s}return}r.forEach(s=>s(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:o=>{this.notifyListeners(a,o)}}}unimplemented(t="not implemented"){return new wt.Exception(t,Be.Unimplemented)}unavailable(t="not available"){return new wt.Exception(t,Be.Unavailable)}async removeListener(t,a){const o=this.listeners[t];if(!o)return;const r=o.indexOf(a);this.listeners[t].splice(r,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(o=>{this.notifyListeners(t,o)}))}}const La=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ba=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Is extends fo{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(o=>{if(o.length<=0)return;let[r,s]=o.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=Ba(r).trim(),s=Ba(s).trim(),a[r]=s}),a}async setCookie(t){try{const a=La(t.key),o=La(t.value),r=`; expires=${(t.expires||"").replace("expires=","")}`,s=(t.path||"/").replace("path=",""),n=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${o||""}${r}; path=${s}; ${n};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}ca("CapacitorCookies",{web:()=>new Is});const Cs=async e=>new Promise((t,a)=>{const o=new FileReader;o.onload=()=>{const r=o.result;t(r.indexOf(",")>=0?r.split(",")[1]:r)},o.onerror=r=>a(r),o.readAsDataURL(e)}),Ls=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(r=>r.toLocaleLowerCase()).reduce((r,s,n)=>(r[s]=e[t[n]],r),{})},Bs=(e,t=!0)=>e?Object.entries(e).reduce((o,r)=>{const[s,n]=r;let i,d;return Array.isArray(n)?(d="",n.forEach(l=>{i=t?encodeURIComponent(l):l,d+=`${s}=${i}&`}),d.slice(0,-1)):(i=t?encodeURIComponent(n):n,d=`${s}=${i}`),`${o}&${d}`},"").substr(1):null,Ts=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),r=Ls(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(r.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[n,i]of Object.entries(e.data||{}))s.set(n,i);a.body=s.toString()}else if(r.includes("multipart/form-data")||e.data instanceof FormData){const s=new FormData;if(e.data instanceof FormData)e.data.forEach((i,d)=>{s.append(d,i)});else for(const i of Object.keys(e.data))s.append(i,e.data[i]);a.body=s;const n=new Headers(a.headers);n.delete("content-type"),a.headers=n}else(r.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class Ms extends fo{async request(t){const a=Ts(t,t.webFetchExtra),o=Bs(t.params,t.shouldEncodeUrlParams),r=o?`${t.url}?${o}`:t.url,s=await fetch(r,a),n=s.headers.get("content-type")||"";let{responseType:i="text"}=s.ok?t:{};n.includes("application/json")&&(i="json");let d,l;switch(i){case"arraybuffer":case"blob":l=await s.blob(),d=await Cs(l);break;case"json":d=await s.json();break;case"document":case"text":default:d=await s.text()}const u={};return s.headers.forEach((c,m)=>{u[m]=c}),{data:d,headers:u,status:s.status,url:s.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}ca("CapacitorHttp",{web:()=>new Ms});const se=ca("PushNotifications",{}),Ds=(e,t,a)=>w(`/api/analytics/${e}?startDate=${t}&endDate=${a}`),Ps=({establishmentId:e,startDate:t,endDate:a,cashierSessionId:o})=>{let r=`/api/reports/sales/${e}?startDate=${t}&endDate=${a}`;return o&&o!=="all"&&(r+=`&cashierSessionId=${o}`),w(r)},As=(e,t,a)=>w(`/api/analytics/${e}/monthly-details?year=${t}&month=${a}`),qs=(e,t,a,o)=>{const r=`/api/analytics/${e}/daily-details?year=${t}&month=${a}&day=${o}`;return w(r)},Ns=(e,t,a,o)=>{const r=`/api/analytics/${e}/professional-details?year=${t}&month=${a}&professionalId=${o}`;return w(r)},Fs=()=>w("/api/reports/summary",{method:"GET"}),Pe=e=>w(`/api/services/${e}`),Rs=e=>w("/api/services",{method:"POST",body:JSON.stringify(e)}),Hs=(e,t)=>w(`/api/services/${e}`,{method:"PUT",body:JSON.stringify(t)}),js=e=>w(`/api/services/${e}`,{method:"DELETE"}),Os=(e,t)=>w(`/api/services/${e}/status`,{method:"PATCH",body:JSON.stringify({active:t})}),zs=e=>w(`/api/services/stats/most-popular/${e}`),Ct=(e,t,a,o="all")=>{const r=`/api/blockages/${e}?startDate=${t}&endDate=${a}&professionalId=${o}`;return w(r)},Lt=e=>w("/api/blockages",{method:"POST",body:JSON.stringify(e)}),ua=e=>w(`/api/blockages/${e}`,{method:"DELETE"}),vo=e=>w("/api/blockages/batch-delete",{method:"POST",body:JSON.stringify({ids:e})}),et=e=>w(`/api/clients/${e}`),ma=e=>w("/api/clients",{method:"POST",body:JSON.stringify(e)}),Vs=(e,t)=>w(`/api/clients/${e}`,{method:"PUT",body:JSON.stringify(t)}),Us=e=>w(`/api/clients/${e}`,{method:"DELETE"}),_s=(e,t,a)=>{const o=`/api/clients/history/${e}?clientName=${encodeURIComponent(t)}&clientPhone=${encodeURIComponent(a)}`;return w(o)},Js=(e,t,a)=>{const o=`/api/clients/loyalty-history/${e}?clientName=${encodeURIComponent(t)}&clientPhone=${encodeURIComponent(a)}`;return w(o)},Ws=(e,t,a,o)=>w("/api/clients/redeem",{method:"POST",body:JSON.stringify({establishmentId:e,clientName:t,clientPhone:a,rewardData:o})}),Ta=document.getElementById("content"),Gs=window.location.origin;let Ma=!1;const Gt=[{bg:"#e0e7ff",border:"#4f46e5",main:"#4f46e5"},{bg:"#d1fae5",border:"#059669",main:"#059669"},{bg:"#ffe4e6",border:"#e11d48",main:"#e11d48"},{bg:"#fef3c7",border:"#d97706",main:"#d97706"},{bg:"#cffafe",border:"#0e7490",main:"#0e7490"},{bg:"#e0f2fe",border:"#0284c7",main:"#0284c7"},{bg:"#ede9fe",border:"#7c3aed",main:"#7c3aed"},{bg:"#fce7f3",border:"#db2777",main:"#db2777"}];let tt=[],Bt=[],Ge={},te=[],C={currentView:"list",weekViewDays:7,currentDate:new Date,selectedProfessionalId:"all",profSearchTerm:"",showInactiveProfs:!1,scrollToAppointmentId:null},E={step:1,data:{id:null,clientName:"",clientPhone:"",selectedServiceIds:[],professionalId:null,professionalName:"",date:null,time:null,redeemedReward:null,clientHasRewards:!1,clientLoyaltyPoints:0}};function Ys(e){return new Intl.DateTimeFormat("pt-BR",{weekday:"short",day:"2-digit",month:"short"}).format(e).replace(/\./g,"")}function ho(e){const t=new Date(e);if(t.setHours(0,0,0,0),C.currentView==="week"&&C.weekViewDays===7){const a=t.getDay(),o=t.getDate()-a+(a===0?-6:1);return new Date(t.setDate(o))}return t}function kt(){const e=document.getElementById("profSelectorContainer"),t=C.profSearchTerm.toLowerCase();if(!e||!p.professionals)return;let a=p.professionals.filter(s=>C.showInactiveProfs||s.status!=="inactive");t&&(a=a.filter(s=>s.name.toLowerCase().includes(t)));const r=[...[{id:"all",name:"Todos",photo:null,status:"active"}],...a];e.innerHTML=r.map(s=>{const n=C.selectedProfessionalId===s.id,i=s.name==="Todos"?"Todos":s.name.split(" ")[0],d=s.name==="Todos"?"T":s.name.charAt(0).toUpperCase(),l=s.status!=="inactive",u=Gt[0],c=s.id!=="all"&&p.professionalColors.get(s.id)||u,m=s.photo||`https://placehold.co/64x64/${c.main?.replace("#","")||"E0E7FF"}/${c.light?.replace("#","")||"4F46E5"}?text=${d}`,b=s.id==="all"?"#e0e7ff":c.light,f=s.id==="all"?"#4f46e5":c.main,k=`border: 3px solid ${n?c.border:"transparent"}; box-shadow: ${n?"0 0 0 2px "+c.border:"none"};`;return`
            <div class="prof-card ${n?"selected":""} ${l?"":"opacity-50"}" 
                 data-action="select-professional" 
                 data-prof-id="${s.id}">
                ${s.id==="all"?`<div class="prof-card-all-placeholder" style="background-color: ${b}; color: ${f}; ${k}">
                           ${d}
                          </div>`:`<img src="${m}" alt="${s.name}" class="prof-card-photo" style="${k}" />`}
                <span class="prof-card-name">${i}</span>
            </div>
        `}).join("")}function Xs(e,t,a,o,r){const s=(e||"").replace(/\D/g,""),n=new Date(r).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}),i=new Date(r).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=`Olá, ${t}! Você tem um agendamento de ${a} com o(a) profissional ${o} para o dia ${n} às ${i}. Podemos confirmar? Agradecemos a preferência!`,l=encodeURIComponent(d);return`https://wa.me/${s}?text=${l}`}function Qs(e){const t=document.getElementById("agenda-view");if(e.sort((o,r)=>new Date(o.startTime)-new Date(r.startTime)),e.length===0){t.innerHTML='<div class="text-center p-10 text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum agendamento ou bloqueio</h3><p class="mt-1 text-sm text-gray-500">Não há eventos para o dia e filtros selecionados.</p></div>';return}const a=e.map(o=>{const r=new Date(o.startTime),s=new Date(o.endTime),n=r.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),i=s.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),d=p.professionalColors.get(o.professionalId)||{};if(o.type==="blockage")return`
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
                </div>`;const l=o.status==="completed",u=l?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800",c=l?"Finalizado":"Aberto",m=JSON.stringify(o).replace(/'/g,"&apos;"),b=o.redeemedReward?.points>0,f=o.hasRewards&&!b,v=Xs(o.clientPhone,o.clientName,o.serviceName,o.professionalName,o.startTime);return`
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
                        <button data-action="delete-appointment" data-id="${o.id}" class="action-btn" title="Apagar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                </div>
            </div>`}).join("");t.innerHTML=`<div class="list-view-container">${a}</div>`}function pa(){return window.innerWidth<768&&C.currentView==="week"?3:C.weekViewDays}function Zs(e){const t=document.getElementById("agenda-view"),a=["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],o=ho(C.currentDate),r=pa();let s=`<div class="grid divide-x divide-gray-200 min-h-[60vh]" style="grid-template-columns: repeat(${r}, minmax(0, 1fr));">`;for(let n=0;n<r;n++){const i=new Date(o);i.setDate(i.getDate()+n);const d=new Date,l=i.toDateString()===d.toDateString(),u=e.filter(m=>new Date(m.startTime).toDateString()===i.toDateString()).sort((m,b)=>new Date(m.startTime)-new Date(b.startTime));let c='<div class="p-1 space-y-2">';u.length>0?c+=u.map(m=>{const f=new Date(m.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),v=p.professionalColors.get(m.professionalId)||{bg:"#e5e7eb",border:"#9ca3af"};if(m.type==="blockage")return`
                        <div class="p-2 rounded-lg border-l-4 flex flex-col bg-red-100" style="border-left-color: ${v.border};">
                            <span class="font-bold text-xs text-red-900">${f}</span>
                            <div class="mt-1 min-w-0">
                                <p class="font-semibold text-sm text-red-800 truncate">${m.reason}</p>
                                <p class="text-xs text-red-600 truncate">com ${m.professionalName}</p>
                            </div>
                        </div>
                    `;const k=JSON.stringify(m).replace(/'/g,"&apos;"),h=m.redeemedReward?.points>0,y=m.hasRewards&&!h,S=m.status==="completed";return`
                    <div class="p-2 rounded-lg border-l-4 flex flex-col cursor-pointer" 
                         style="background-color: ${v.bg}; border-left-color: ${v.border};"
                         data-action="open-comanda" data-appointment='${k}'>
                        
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-xs text-gray-900">${f}</span>
                            ${S?'<span class="text-[10px] font-semibold bg-green-200 text-green-800 px-1 rounded-sm">OK</span>':""}
                        </div>

                        <div class="mt-1 min-w-0">
                            <p class="font-semibold text-sm text-gray-800 truncate">${y?"🎁 ":""}${m.clientName}</p>
                            <p class="text-xs text-gray-600 truncate">${m.serviceName}</p>
                            <p class="text-xs text-gray-500 truncate">com ${m.professionalName||"Indefinido"}</p>
                            ${h?'<p class="text-xs text-purple-600 truncate">Resgate</p>':""}
                        </div>
                        
                        </div>
                `}).join(""):c+='<div class="text-center text-xs text-gray-400 pt-4">Nenhum evento</div>',c+="</div>",s+=`
            <div class="flex flex-col">
                <div class="text-center py-2 border-b ${l?"bg-indigo-100 text-indigo-700":"bg-gray-50"}">
                    <p class="font-bold">${a[i.getDay()]}</p>
                    <p class="text-sm">${i.getDate()}/${i.getMonth()+1}</p>
                </div>
                <div class="flex-grow overflow-y-auto">${c}</div>
            </div>
        `}s+="</div>",t.innerHTML=s}function Ks(){const e=p.allEvents.filter(t=>C.selectedProfessionalId==="all"||t.professionalId===C.selectedProfessionalId);C.currentView==="list"?Qs(e):Zs(e)}async function Q(){const e=document.getElementById("agenda-view");if(!e)return;e.innerHTML='<div class="loader mx-auto my-10"></div>';let t,a;const o=document.getElementById("weekRange");if(C.currentView==="list")t=new Date(C.currentDate),t.setHours(0,0,0,0),a=new Date(C.currentDate),a.setHours(23,59,59,999),o.textContent=Ys(t);else{const r=pa();t=ho(new Date(C.currentDate)),a=new Date(t),a.setDate(t.getDate()+(r-1)),a.setHours(23,59,59,999),o.textContent=`${t.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})} - ${a.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})}`}try{const r=await ts(p.establishmentId,t.toISOString(),a.toISOString(),C.selectedProfessionalId==="all"?null:C.selectedProfessionalId),n=(await Ct(p.establishmentId,t.toISOString(),a.toISOString(),C.selectedProfessionalId)).map(d=>{let l=d.professionalName;if(!l&&d.professionalId){const u=p.professionals?p.professionals.find(c=>c.id===d.professionalId):null;u&&(l=u.name)}return{...d,type:"blockage",professionalName:l||"Não identificado"}}),i=[...r.map(d=>({...d,type:"appointment"})),...n];if(p.allEvents=i,kt(),Ks(),C.scrollToAppointmentId){const d=document.querySelector(`[data-appointment*='"id":"${C.scrollToAppointmentId}"']`);d&&(d.scrollIntoView({behavior:"smooth",block:"center"}),d.style.transition="background-color 0.5s ease-in-out",d.style.backgroundColor="#e0e7ff",setTimeout(()=>{d.style.backgroundColor=""},2500)),C.scrollToAppointmentId=null}}catch(r){g("Erro na Agenda",`Não foi possível carregar a agenda: ${r.message}`,"error"),e.innerHTML='<div class="p-6 text-center text-red-600">Falha ao carregar dados.</div>'}}async function er(){try{const[e,t,a,o]=await Promise.all([p.professionals&&p.professionals.length>0?Promise.resolve(p.professionals):G(p.establishmentId),p.services&&p.services.length>0?Promise.resolve(p.services):Pe(p.establishmentId),te.length>0?Promise.resolve(te):et(p.establishmentId),Ge.enabled!==void 0?Promise.resolve(null):Ke(p.establishmentId)]);(!p.professionals||p.professionals.length===0)&&(p.professionals=e||[]),(!p.services||p.services.length===0)&&(p.services=t||[]),te.length===0&&(te=a||[]),o&&(Ge=o.loyaltyProgram||{enabled:!1}),p.professionals.forEach((r,s)=>{p.professionalColors.set(r.id,Gt[s%Gt.length])}),kt()}catch(e){console.error("Erro ao popular filtros e dependências do modal:",e),g("Atenção","Não foi possível pré-carregar os dados para agendamento. A abertura do modal pode ser lenta.","error")}}function Yt(e){e<1||e>4||(E.step=e,Xt(null,!0))}function yo(e,t){const a=t.classList.contains("selected"),o=E.data.selectedServiceIds.indexOf(e);a?(t.classList.remove("selected","border-blue-500"),o>-1&&E.data.selectedServiceIds.splice(o,1)):(t.classList.add("selected","border-blue-500"),E.data.selectedServiceIds.push(e))}function xo(e,t){const a=document.querySelector(".professional-step-cards");if(!a)return;a.querySelectorAll(".professional-modal-card").forEach(r=>r.classList.remove("selected","border-blue-500")),t.classList.add("selected","border-blue-500");const o=Bt.find(r=>r.id===e);E.data.professionalId=e,E.data.professionalName=o?o.name:"N/A"}function tr(e,t){const a=document.getElementById("availableTimesContainer");a&&(a.querySelectorAll(".time-slot-card").forEach(o=>o.classList.remove("selected")),t.classList.add("selected"),E.data.time=e)}async function Da(){const e=document.getElementById("apptTotalDuration"),t=document.getElementById("availableTimesContainer");if(!e||!t)return;const a=E.data.professionalId,o=E.data.selectedServiceIds,r=document.getElementById("apptDate").value;E.data.date=r;const s=o.reduce((n,i)=>{const d=tt.find(l=>l.id===i);return n+(d?d.duration+(d.bufferTime||0):0)},0);if(e.textContent=`${s} min`,s===0||!a||!r){t.innerHTML='<p class="col-span-full text-center text-gray-500">Selecione serviço, profissional e data.</p>';return}t.innerHTML='<div class="loader mx-auto col-span-full"></div>';try{const n=o.join(","),i=await fetch(`${Gs}/api/availability?establishmentId=${p.establishmentId}&professionalId=${a}&serviceIds=${n}&date=${r}`);if(!i.ok)throw new Error("Falha na resposta da API de disponibilidade");let d=await i.json();const l=new Date;if(new Date(r+"T00:00:00").toDateString()===l.toDateString()){const c=l.getHours()*60+l.getMinutes();d=d.filter(m=>{const[b,f]=m.split(":").map(Number);return b*60+f>=c})}if(t.innerHTML="",d.length>0){if(d.forEach(c=>{const m=document.createElement("button");m.type="button",m.className=`time-slot-card p-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition ${E.data.time===c?"selected":""}`,m.textContent=c,m.addEventListener("click",()=>tr(c,m)),t.appendChild(m)}),E.data.time){const c=t.querySelector(`[data-action="time-slot"][data-time="${E.data.time}"]`);c&&c.classList.add("selected")}}else t.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum horário disponível.</p>'}catch{t.innerHTML='<p class="col-span-full text-center text-red-500">Erro ao buscar horários.</p>'}}function ar(){const e=document.getElementById("loyaltyRewardsContainer");if(!e)return;const{clientHasRewards:t,clientLoyaltyPoints:a,redeemedReward:o}=E.data,{enabled:r,rewards:s,pointsPerCurrency:n}=Ge;if(!r||!t||!s||s.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");const i=s.filter(l=>a>=l.points);let d=`
        <h4 class="text-md font-semibold text-gray-700 mb-2">🎁 Prêmios Disponíveis (${a} pontos)</h4>
    `;i.length>0?(d+='<div class="space-y-2">',d+=i.map(l=>{const u=o?.reward===l.reward;return`
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
            `}).join(""),d+="</div>"):d+='<p class="text-sm text-gray-600">Pontos insuficientes para resgatar os prêmios disponíveis.</p>',e.innerHTML=d,e.querySelectorAll('input[name="loyaltyReward"]').forEach(l=>{l.addEventListener("change",u=>{u.target.checked&&(E.data.redeemedReward={reward:u.target.value,points:parseInt(u.target.dataset.points,10)})})}),e.insertAdjacentHTML("beforeend",`
        <label class="flex items-center p-3 mt-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
            <input type="radio" name="loyaltyReward" class="form-radio text-gray-400" 
                   value="none" 
                   ${o?"":"checked"}>
            <span class="ml-3 text-gray-600">Não resgatar prêmio agora</span>
        </label>
    `),e.querySelector('input[value="none"]').addEventListener("change",l=>{l.target.checked&&(E.data.redeemedReward=null)})}async function or(e){e.preventDefault();const t=e.target,a=t.querySelector('button[type="submit"]');if(!E.data.time||E.data.selectedServiceIds.length===0||!E.data.professionalId)return g("Erro de Validação","Por favor, selecione o horário, serviço(s) e profissional antes de confirmar.","error");a.disabled=!0,a.textContent="A confirmar...";const o=E.data.selectedServiceIds.map(l=>{const u=tt.find(c=>c.id===l);return{id:u.id,name:u.name,price:u.price,duration:u.duration,bufferTime:u.bufferTime||0,photo:u.photo||null}}),[r,s]=E.data.time.split(":"),n=new Date(`${E.data.date}T${r}:${s}:00`),i={establishmentId:p.establishmentId,clientName:E.data.clientName,clientPhone:E.data.clientPhone,services:o,professionalId:E.data.professionalId,startTime:n.toISOString(),redeemedReward:E.data.redeemedReward},d=t.querySelector("#appointmentId").value;d&&(i.id=d);try{d?await da(d,i):await os(i),g(`Agendamento ${d?"atualizado":"criado"} com sucesso!`,"success"),document.getElementById("appointmentModal").style.display="none",Q()}catch(l){g(l.message,"error")}finally{a.disabled=!1,a.textContent="Confirmar Agendamento"}}function sr(e){return`
        <div class="client-search-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-blue-50 ${E.data.clientName===e.name&&E.data.clientPhone===e.phone?"selected border-blue-500":""}" 
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
    `}async function Pa(e){const t=document.getElementById("clientSearchResults");if(!t)return;const a=e.toLowerCase().trim();if(a.length<3){t.innerHTML='<p class="text-sm text-gray-500">Digite pelo menos 3 caracteres para buscar clientes existentes.</p>';return}const o=te.filter(r=>r.name.toLowerCase().includes(a)||r.phone.includes(a));if(o.length===0){t.innerHTML='<p class="text-sm text-gray-500">Nenhum cliente encontrado com este termo.</p>';return}t.innerHTML=o.map(sr).join(""),t.querySelectorAll('[data-action="select-client"]').forEach(r=>{r.addEventListener("click",s=>{const n=r.dataset.clientName,i=r.dataset.clientPhone,d=te.find(l=>l.phone===i&&l.name===n);if(E.data.clientName=n,E.data.clientPhone=i,d){const l=Ge,u=Math.min(...(l?.rewards||[]).map(c=>c.points));E.data.clientLoyaltyPoints=d.loyaltyPoints||0,E.data.clientHasRewards=l.enabled&&u!==1/0&&E.data.clientLoyaltyPoints>=u}else E.data.clientHasRewards=!1,E.data.clientLoyaltyPoints=0;document.getElementById("apptClientName").value=n,document.getElementById("apptClientPhone").value=i,document.querySelectorAll(".client-search-card").forEach(l=>l.classList.remove("selected","border-blue-500")),r.classList.add("selected","border-blue-500")})})}async function rr(e){e.preventDefault();const t=document.getElementById("clientRegistrationForm"),a=t.querySelector('button[type="submit"]'),o={establishmentId:p.establishmentId,name:t.querySelector("#regClientName").value.trim(),email:t.querySelector("#regClientEmail").value.trim(),phone:t.querySelector("#regClientPhone").value.trim(),dobDay:t.querySelector("#regClientDobDay").value.trim(),dobMonth:t.querySelector("#regClientDobMonth").value.trim(),notes:t.querySelector("#regClientNotes").value.trim()};if(!o.name||!o.phone)return g("Erro de Validação","Nome e Telefone são obrigatórios.","error");a.disabled=!0,a.textContent="A salvar...";try{await ma(o),te.push({name:o.name,phone:o.phone,loyaltyPoints:0}),E.data.clientName=o.name,E.data.clientPhone=o.phone,E.data.clientHasRewards=!1,E.data.clientLoyaltyPoints=0,g("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",Yt(1)}catch(r){g(`Erro ao cadastrar cliente: ${r.message}`,"error")}finally{a.disabled=!1,a.textContent="Salvar"}}function nr(){H({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("clientRegistrationForm");t&&t.addEventListener("submit",rr)}function ir(){nr()}function lr(e,t){const a=e?"Editar Agendamento":"Selecionar Cliente",o=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">1. Dados do Cliente</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="apptClientName" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="apptClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="Nome Completo" value="${E.data.clientName}">
                </div>
                <div>
                    <label for="apptClientPhone" class="block text-sm font-medium text-gray-700">Telemóvel</label>
                    <input type="tel" id="apptClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="(XX) XXXXX-XXXX" value="${E.data.clientPhone}">
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
    `;return{title:a,content:o}}function dr(){const e="Selecionar Serviço",t=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">2. Serviços</h3>
             <div class="flex items-center gap-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
                 <input type="search" id="serviceSearchModalInput" placeholder="Buscar Serviço..." class="flex-grow p-3 pl-10 border rounded-lg">
            </div>
            
            <div id="apptServicesContainer" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-1">
                 ${tt.map(a=>{const o=E.data.selectedServiceIds.includes(a.id),r=a.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
                         <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${o?"selected border-blue-500":""}" data-service-id="${a.id}">
                             <div class="flex items-center">
                                 <img src="${r}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
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
    `;return{title:e,content:t}}function cr(){const e="Selecionar Profissional",t=`
        <div class="p-5 space-y-6">
             <h3 class="text-xl font-bold text-gray-800">3. Profissional</h3>
             <div id="apptProfessionalContainer" class="mt-4 flex flex-wrap gap-3 max-h-48 overflow-y-auto p-1 professional-step-cards">
                 ${Bt.map(a=>{const o=E.data.professionalId===a.id,r=a.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P";return`
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
    `;return{title:e,content:t}}function ur(e){const t=e?"Confirmar Edição":"Data e Horário",a=new Date,o=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`,r=E.data.date||o,s=`
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">4. ${t}</h3>

            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 space-y-1">
                <p class="font-bold text-gray-800">${E.data.clientName}</p>
                <p class="text-sm text-gray-700">Serviços: ${E.data.selectedServiceIds.length} selecionado(s)</p>
                <p class="text-sm text-gray-700">Profissional: ${E.data.professionalName}</p>
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
    `;return{title:t,content:s}}function mr(e){const t=document.getElementById("apptServicesContainer");if(!t)return;const a=e.toLowerCase(),o=tt.filter(r=>r.name.toLowerCase().includes(a));t.innerHTML=o.map(r=>{const s=E.data.selectedServiceIds.includes(r.id),n=r.photo||"https://placehold.co/40x40/E0E7FF/4F46E5?text=S";return`
            <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${s?"selected border-blue-500":""}" data-service-id="${r.id}">
                <div class="flex items-center">
                    <img src="${n}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-gray-800">${r.name}</p>
                        <p class="text-xs text-gray-500">R$ ${r.price.toFixed(2)} (${r.duration} min)</p>
                    </div>
                </div>
            </div>`}).join(""),t.querySelectorAll(".service-card").forEach(r=>{r.addEventListener("click",()=>yo(r.dataset.serviceId,r))})}function pr(e){const t=document.getElementById("apptProfessionalContainer");if(!t)return;const a=e.toLowerCase(),o=Bt.filter(r=>r.name.toLowerCase().includes(a));t.innerHTML=o.map(r=>{const s=E.data.professionalId===r.id,n=r.photo||"https://placehold.co/60x60/E0E7FF/4F46E5?text=P";return`
             <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${s?"selected border-blue-500":""}" data-professional-id="${r.id}">
                 <img src="${n}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                 <p class="text-xs font-semibold text-gray-800">${r.name.split(" ")[0]}</p>
                 <p class="text-[10px] text-gray-500">${r.specialty||"Profissional"}</p>
             </div>`}).join(""),t.querySelectorAll(".professional-modal-card").forEach(r=>{r.addEventListener("click",()=>xo(r.dataset.professionalId,r))})}async function Xt(e=null,t=!1){const a=document.getElementById("appointmentModal");if(!t){const s=e?.startTime?new Date(e.startTime).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],n=e?.startTime?new Date(e.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1}):null;E={step:1,data:{id:e?.id||null,clientName:e?.clientName||"",clientPhone:e?.clientPhone||"",selectedServiceIds:e?.services?.map(i=>i.id)||[],professionalId:e?.professionalId||null,professionalName:e?.professionalName||"",date:s,time:n,redeemedReward:e?.redeemedReward||null,clientHasRewards:e?.hasRewards||!1,clientLoyaltyPoints:0}}}if(!p.services||!p.professionals||!te||Ge.enabled===void 0){g("Erro","Os dados da agenda ainda não foram carregados. Tente novamente em alguns segundos.","error");return}if(tt=p.services,Bt=p.professionals.filter(s=>s.status==="active"),E.data.clientName&&E.data.clientPhone){const s=te.find(n=>n.phone===E.data.clientPhone&&n.name===E.data.clientName);s&&(E.data.clientLoyaltyPoints=s.loyaltyPoints||0)}let o={title:"Erro",content:"<p>Etapa não encontrada.</p>"};switch(E.step){case 1:o=lr(e);break;case 2:o=dr();break;case 3:o=cr();break;case 4:o=ur(e);break}a.innerHTML=`
        <div class="modal-content max-w-4xl p-0 rounded-xl overflow-hidden shadow-2xl">
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${o.title}</h2>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>
            </header>
            
            <form id="appointmentForm" class="flex flex-col h-full">
                <input type="hidden" id="appointmentId" value="${E.data.id||""}">
                <input type="hidden" id="selectedTime" value="${E.data.time||""}">
                
                <div class="flex-1 overflow-y-auto" style="max-height: 80vh;">
                    ${o.content}
                </div>
                
            </form>
        </div>`,a.querySelectorAll('[data-action="next-step"]').forEach(s=>{s.addEventListener("click",()=>{const n=parseInt(s.dataset.currentStep,10);if(n===1){const i=a.querySelector("#apptClientName"),d=a.querySelector("#apptClientPhone");if(E.data.clientName=i.value.trim(),E.data.clientPhone=d.value.trim(),!E.data.clientName||!E.data.clientPhone)return g("Atenção","Nome e telefone do cliente são obrigatórios.","error")}else if(n===2){if(E.data.selectedServiceIds.length===0)return g("Atenção","Selecione pelo menos um serviço.","error")}else if(n===3&&!E.data.professionalId)return g("Atenção","Selecione um profissional.","error");Yt(n+1)})}),a.querySelectorAll('[data-action="prev-step"]').forEach(s=>{s.addEventListener("click",()=>Yt(parseInt(s.dataset.currentStep,10)-1))});const r=a.querySelector("#appointmentForm");if(E.step===4&&r&&r.addEventListener("submit",or),a.style.display="flex",E.step===2){a.querySelector("#apptServicesContainer").querySelectorAll(".service-card").forEach(i=>{i.addEventListener("click",()=>yo(i.dataset.serviceId,i))});const n=a.querySelector("#serviceSearchModalInput");n&&n.addEventListener("input",i=>mr(i.target.value))}if(E.step===3){a.querySelector("#apptProfessionalContainer").querySelectorAll(".professional-modal-card").forEach(i=>{i.addEventListener("click",()=>xo(i.dataset.professionalId,i))});const n=a.querySelector("#professionalSearchModalInput");n&&n.addEventListener("input",i=>pr(i.target.value))}if(E.step===1){const s=a.querySelector("#clientSearchInput");s&&(s.addEventListener("input",i=>Pa(i.target.value)),E.data.clientName&&E.data.clientPhone&&Pa(`${E.data.clientName} ${E.data.clientPhone}`));const n=a.querySelector('[data-action="open-client-registration"]');n&&n.addEventListener("click",ir)}if(E.step===4){const s=a.querySelector("#apptDate");s&&s.addEventListener("change",Da),Da(),ar()}}async function wo(e={}){C.currentDate=e.targetDate?new Date(e.targetDate):C.currentDate||new Date,C.scrollToAppointmentId=e.scrollToAppointmentId||null,C.profSearchTerm="",window.innerWidth<768&&(C.currentView="list"),Ta.innerHTML=`
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
        </section>`,document.querySelectorAll(".view-btn[data-view]").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".view-btn[data-view]").forEach(r=>r.classList.remove("active")),a.classList.add("active"),C.currentView=a.dataset.view;const o=document.getElementById("week-days-toggle");if(C.currentView==="week"){if(o.style.display="flex",window.innerWidth<768){C.weekViewDays=3,document.querySelectorAll(".week-days-btn").forEach(s=>s.classList.remove("active"));const r=document.querySelector('.week-days-btn[data-days="3"]');r&&r.classList.add("active")}}else o.style.display="none";Q()})}),document.querySelectorAll(".week-days-btn").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".week-days-btn").forEach(o=>o.classList.remove("active")),a.classList.add("active"),C.weekViewDays=parseInt(a.dataset.days,10),Q()})}),document.getElementById("todayBtn").addEventListener("click",()=>{C.currentDate=new Date,Q()});const t=a=>{const o=parseInt(a.currentTarget.dataset.amount,10),r=C.currentView==="week"?pa():1,s=new Date(C.currentDate);s.setDate(s.getDate()+o*r),C.currentDate=s,Q()};document.getElementById("prevBtn").addEventListener("click",t),document.getElementById("nextBtn").addEventListener("click",t),document.getElementById("profSearchInput").addEventListener("input",a=>{C.profSearchTerm=a.target.value,kt()}),document.getElementById("showInactiveProfsToggle").addEventListener("change",a=>{C.showInactiveProfs=a.target.checked,kt(),Q()}),Ma||(Ta.addEventListener("click",async a=>{const o=a.target.closest("[data-action]");if(a.target.closest('[data-action="select-professional"]')){const d=a.target.closest('[data-action="select-professional"]').dataset.profId,l=C.selectedProfessionalId===d&&d!=="all";if(C.selectedProfessionalId=l?"all":d,d!=="all"){const u=document.getElementById("profSearchInput");u&&(u.value=""),C.profSearchTerm=""}await Q();return}if(!o)return;const r=o.dataset.action;let s=null;const n=a.target.closest("[data-appointment]");switch(n&&(s=JSON.parse(n.dataset.appointment.replace(/&apos;/g,"'"))),r){case"new-appointment":Xt();break;case"edit-appointment":if(!s)return;if(s.status==="completed"){g("Atenção","Agendamentos finalizados não podem ser editados.","error");return}s.hasRewards&&!s.redeemedReward&&g("🎁 Cliente com Prêmios!","Este cliente tem pontos para resgatar. Verifique a Etapa 4 do agendamento.","info"),Xt(s);break;case"delete-appointment":{const i=o.dataset.id;if(await M("Confirmar Exclusão","Tem a certeza que deseja apagar este agendamento?"))try{await ss(i),g("Agendamento apagado!","success"),Q()}catch(l){g(`Não foi possível apagar: ${l.message}`,"error")}break}case"open-comanda":if(s){s.hasRewards&&!s.redeemedReward&&s.status!=="completed"&&g("🎁 Cliente com Prêmios!","Este cliente tem pontos de fidelidade para resgatar.","info");const i=s.status==="completed"?"finalizadas":"em-atendimento",d={selectedAppointmentId:s.id,initialFilter:i};i==="finalizadas"&&(d.filterDate=s.startTime),R("comandas-section",d)}break}}),Ma=!0),await er(),await Q()}const gr=e=>w(`/api/comandas/${e}`),br=e=>w("/api/sales",{method:"POST",body:JSON.stringify(e)}),fr=e=>w(`/api/sales/${e}/reopen`,{method:"POST"}),vr=e=>w(`/api/sales/${e}`,{method:"DELETE"}),Tt=e=>w(`/api/products/${e}`),hr=e=>w("/api/products",{method:"POST",body:JSON.stringify(e)}),yr=(e,t)=>w(`/api/products/${e}`,{method:"PUT",body:JSON.stringify(t)}),xr=e=>w(`/api/products/${e}`,{method:"DELETE"}),wr=(e,t)=>w(`/api/products/${e}/stock`,{method:"PATCH",body:JSON.stringify(t)}),kr=({startDate:e,endDate:t,productId:a,categoryId:o})=>{const r=new URLSearchParams({startDate:e,endDate:t});return a&&a!=="all"&&r.append("productId",a),o&&o!=="all"&&r.append("categoryId",o),w(`/api/products/stock-history/report?${r.toString()}`)},ko=()=>w("/api/cashier/status").catch(e=>{if(e.message.includes("404")||e.message.includes("não encontrada"))return null;throw e}),Er=e=>{const t={establishmentId:e.establishmentId,initialAmount:Number(e.initialAmount),notes:e.notes||""};return console.log("Payload enviado para abrir caixa:",t),w("/api/cashier/open",{method:"POST",body:JSON.stringify(t)})},Sr=(e,t)=>{const a={finalAmount:Number(t)};return console.log("Payload enviado para fechar caixa:",a),w(`/api/cashier/close/${e}`,{method:"PUT",body:JSON.stringify(a)})},$r=()=>w("/api/cashier/history").then(e=>e||[]).catch(e=>(console.error("Erro ao buscar histórico:",e),[])),Ir=e=>w(`/api/cashier/report/${e}`),Eo=e=>w(`/api/packages/${e}`),Cr=e=>w("/api/packages",{method:"POST",body:JSON.stringify(e)}),Lr=(e,t)=>w(`/api/packages/${e}`,{method:"PUT",body:JSON.stringify(t)}),Br=e=>w(`/api/packages/${e}`,{method:"DELETE"});let x={allComandas:[],catalog:{services:[],products:[],packages:[]},clients:[],activeFilter:"atendimento",selectedComandaId:null,isCashierOpen:!1,activeCashierSessionId:null,paging:{page:1,limit:12,total:0}},ye=null,xe=null;function Tr(){const e=document.getElementById("comandas-layout");if(e){e.classList.add("detail-view-active");const t=document.getElementById("comanda-detail-container");t&&(t.scrollTop=0)}}function ge(){const e=document.getElementById("comandas-layout");e&&e.classList.remove("detail-view-active")}function Mr(){const e=new Date().toISOString().split("T")[0];xe.innerHTML=`
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
    `}function Dr(){const e=document.getElementById("cashier-controls");e&&(x.isCashierOpen?e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-green-700 bg-green-100 py-1 px-3 rounded-full">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-2 px-4 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 text-sm">Fechar Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm">Relatório</button>
        `:e.innerHTML=`
            <span class="hidden sm:inline-block text-sm font-medium text-red-700 bg-red-100 py-1 px-3 rounded-full">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-sm">Abrir Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm">Relatório</button>
        `)}function de(){const e=document.getElementById("comandas-list");if(!e)return;if(!x.isCashierOpen&&x.activeFilter==="atendimento"){e.innerHTML=`
            <div class="text-center py-10 opacity-60">
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `;return}const a={atendimento:"confirmed",finalizadas:"completed"}[x.activeFilter],o=x.allComandas.filter(r=>r.status===a);if(o.length===0){e.innerHTML='<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda encontrada.</p>',Aa(e);return}e.innerHTML=o.map(r=>{const n=[...r.services||[],...r.comandaItems||[],...r.items||[]].reduce((c,m)=>c+(m.price||0),0),i=r.id===x.selectedComandaId,d=new Date(r.startTime).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),u=r.type==="walk-in"||r.id.startsWith("temp-")?'<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">Avulso</span>':'<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">Agendado</span>';return`
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
        `}).join(""),Aa(e)}function Aa(e){const{page:t,total:a,limit:o}=x.paging,r=Math.ceil((a||0)/o);if(r<=1)return;let s='<div class="flex gap-2 justify-center mt-4 flex-wrap pb-4">';t>1&&(s+=`<button data-page="${t-1}" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">&laquo;</button>`);for(let n=1;n<=r;n++)n===1||n===r||n>=t-2&&n<=t+2?s+=`<button data-page="${n}" class="px-3 py-1 rounded text-sm ${n===t?"bg-indigo-600 text-white font-bold":"bg-gray-200 hover:bg-gray-300"}">${n}</button>`:(n===t-3||n===t+3)&&(s+='<span class="px-2 text-gray-400">...</span>');t<r&&(s+=`<button data-page="${t+1}" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">&raquo;</button>`),s+="</div>",e.innerHTML+=s,e.querySelectorAll("button[data-page]").forEach(n=>{n.onclick=i=>{i.stopPropagation(),x.paging.page=parseInt(n.dataset.page,10),K()}})}function W(){const e=document.getElementById("comanda-detail-container");if(!e)return;const t=`
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
        `;return}const o=[...a.services||[],...a.comandaItems||[],...a.items||[]],r=a.status==="completed",s=a.type==="walk-in"||a.id.startsWith("temp-"),n=s?"":`<button data-action="go-to-appointment" data-id="${a.id}" data-date="${a.startTime}" 
                class="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1 mt-1">
             Ir para Agendamento <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
           </button>`,i=o.reduce((l,u)=>{const c=`${u.type}-${u.id||u.name}`;if(!l[c]){const m=(a.services||[]).some(b=>b.id===u.id&&b.name===u.name);l[c]={...u,quantity:0,isOriginalService:m&&u.type==="service"}}return l[c].quantity+=1,l},{}),d=Object.values(i).reduce((l,u)=>l+(u.price||0)*u.quantity,0);e.innerHTML=`
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
    `}function Pr(){H({title:"Cadastrar Novo Cliente",contentHTML:`
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
    `,maxWidth:"max-w-2xl"});const t=document.getElementById("comandas_clientRegistrationForm");t&&t.addEventListener("submit",Ar)}async function Ar(e){e.preventDefault();const t=document.getElementById("comandas_clientRegistrationForm");if(!t)return;const a=t.querySelector('button[type="submit"]'),o={establishmentId:p.establishmentId,name:t.querySelector("#regClientName").value.trim(),email:t.querySelector("#regClientEmail").value.trim()||null,phone:t.querySelector("#regClientPhone").value.trim(),dob:`${t.querySelector("#regClientDobDay").value.trim()}/${t.querySelector("#regClientDobMonth").value.trim()}`,notes:t.querySelector("#regClientNotes").value.trim()||null};if(!o.name||!o.phone)return g("Erro de Validação","Nome e Telefone são obrigatórios.","error");a.disabled=!0,a.textContent="A salvar...";try{const r=await ma(o);x.clients.push({id:r.id,...o}),g("Cliente cadastrado com sucesso!","success"),document.getElementById("genericModal").style.display="none",So(r.id)}catch(r){g(`Erro ao cadastrar cliente: ${r.message}`,"error")}finally{a.disabled=!1,a.textContent="Salvar Cliente"}}function qr(){if(!x.isCashierOpen){g("Caixa Fechado","Abra o caixa antes de adicionar itens.","error");return}const{modalElement:e,close:t}=H({title:"Adicionar Item à Comanda",contentHTML:'<div id="add-item-content"></div>',maxWidth:"max-w-4xl"}),a=()=>{let r="";const s=e.querySelector("#add-item-content"),n={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',package:'<svg class="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'},i=()=>{const d=r.toLowerCase(),l=c=>c.filter(m=>m.name.toLowerCase().includes(d)),u={"modal-service-list":{items:l(x.catalog.services),type:"service"},"modal-product-list":{items:l(x.catalog.products),type:"product"},"modal-package-list":{items:l(x.catalog.packages),type:"package"}};for(const[c,{items:m,type:b}]of Object.entries(u)){const f=s.querySelector(`#${c}`);f&&(f.innerHTML=m.map(v=>`
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
        `,document.getElementById("quantity-minus-btn").onclick=()=>{s>1&&(s--,i())},document.getElementById("quantity-plus-btn").onclick=()=>{s++,i()},document.querySelector('[data-action="confirm-add-item"]').onclick=async()=>{await jr(r,s),t()}};e.addEventListener("click",r=>{const s=r.target.closest('[data-action="select-item-for-quantity"]'),n=r.target.closest('[data-action="back-to-catalog"]');if(s){const{itemType:i,itemId:d}=s.dataset,u=(x.catalog[i+"s"]||[]).find(c=>c.id===d);u&&o({...u,type:i})}else n&&a()}),a()}async function So(e=null){if(!x.isCashierOpen){g("Caixa Fechado","Abra o caixa antes de criar uma nova venda.","error");return}if(!x.clients||x.clients.length===0)try{x.clients=await et(p.establishmentId)}catch{g("Erro","Não foi possível carregar dados de clientes.","error");return}if(!p.professionals||p.professionals.length===0)try{p.professionals=await G(p.establishmentId)}catch{g("Erro","Não foi possível carregar dados de profissionais.","error");return}const t=x.clients.map(n=>{const i=n.id===e?"selected":"";return`<option value="${n.id}" ${i}>${n.name} - ${n.phone}</option>`}).join(""),a=p.professionals.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""),o=`
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
    `,{modalElement:r}=H({title:"Nova Venda Avulsa",contentHTML:o,maxWidth:"max-w-md"});r.querySelector("#new-sale-form").addEventListener("submit",Vr);const s=r.querySelector('[data-action="new-client-from-sale"]');s&&s.addEventListener("click",n=>{n.preventDefault(),r.style.display="none",Pr()})}function Nr(){if(!x.isCashierOpen){g("Caixa Fechado","Abra o caixa antes de finalizar pagamentos.","error");return}const e=x.allComandas.find(l=>l.id===x.selectedComandaId);if(!e)return;const a=[...e.services||[],...e.comandaItems||[],...e.items||[]].reduce((l,u)=>l+(u.price||0),0);let o=[],r={remainingAmount:a,selectedMethod:"dinheiro",installments:1,amountReceived:""};const s=()=>{const l=document.getElementById("payment-list"),u=document.getElementById("remaining-amount"),c=document.getElementById("finalize-checkout-btn"),m=document.getElementById("change-container"),b=document.getElementById("installments-container"),f=document.getElementById("payment-value"),v=document.getElementById("payment-controls"),k=o.reduce((y,S)=>y+S.value,0);r.remainingAmount=a-k,l.innerHTML=o.map((y,S)=>`
            <div class="flex justify-between items-center bg-gray-100 p-2 rounded-md animate-fade-in-fast">
                <span class="font-medium text-sm">${y.method.charAt(0).toUpperCase()+y.method.slice(1)} ${y.installments>1?`(${y.installments}x)`:""}</span>
                <div class="flex items-center gap-2">
                    <span class="font-semibold">R$ ${y.value.toFixed(2)}</span>
                    <button data-action="remove-payment" data-payment-index="${S}" class="text-red-500 font-bold">&times;</button>
                </div>
            </div>`).join(""),r.remainingAmount<=.001?(u.textContent="Total Pago!",u.className="text-lg font-bold text-center mb-4 text-green-600",f.value="",c.disabled=!1,v&&(v.style.display="none")):(u.textContent=`Faltam: R$ ${r.remainingAmount.toFixed(2)}`,u.className="text-lg font-bold text-center mb-4 text-red-600",f.value=r.remainingAmount.toFixed(2),c.disabled=!0,v&&(v.style.display="block")),document.querySelectorAll(".payment-method-btn").forEach(y=>{y.classList.toggle("ring-2",y.dataset.method===r.selectedMethod),y.classList.toggle("ring-offset-2",y.dataset.method===r.selectedMethod)}),b.style.display=["credito","crediario"].includes(r.selectedMethod)?"block":"none",m.style.display=r.selectedMethod==="dinheiro"&&r.remainingAmount>0?"block":"none";const h=parseFloat(r.amountReceived)-r.remainingAmount;document.getElementById("change-value").textContent=`R$ ${h>0?h.toFixed(2):"0.00"}`},n=()=>{const l=document.getElementById("payment-value");let u=parseFloat(l.value);if(isNaN(u)||u<=0){g("Valor Inválido","Insira um valor de pagamento válido e maior que zero.","error");return}if(u>r.remainingAmount+.001){g("Valor Inválido","O valor excede o saldo restante.","error");return}const c={method:r.selectedMethod,value:u};["credito","crediario"].includes(r.selectedMethod)&&r.installments>1&&(c.installments=r.installments),o.push(c),r.selectedMethod="dinheiro",r.installments=1,document.getElementById("installments-select").value=1,s()},i=`
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
    `,{modalElement:d}=H({title:"Finalizar Pagamento",contentHTML:i,maxWidth:"max-w-md"});document.getElementById("payment-value").value=r.remainingAmount.toFixed(2),d.addEventListener("click",l=>{const u=l.target.closest(".payment-method-btn");u&&(r.selectedMethod=u.dataset.method,r.installments=1,document.getElementById("installments-select").value=1,s()),l.target.closest("#add-payment-btn")&&n(),l.target.closest('[data-action="remove-payment"]')&&(o.splice(parseInt(l.target.closest('[data-action="remove-payment"]').dataset.paymentIndex,10),1),s()),l.target.closest("#finalize-checkout-btn")&&zr(e,a,o)}),d.addEventListener("change",l=>{l.target.id==="installments-select"&&(r.installments=parseInt(l.target.value,10))}),d.addEventListener("input",l=>{l.target.id==="amount-received"&&(r.amountReceived=l.target.value,s())}),s()}async function Fr(){const e=`
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
    `,{modalElement:t}=H({title:"Abrir Caixa",contentHTML:e,maxWidth:"max-w-md"});t.querySelector("#open-cashier-form").addEventListener("submit",async a=>{a.preventDefault();const o=document.getElementById("initial-amount"),r=o.value.trim(),s=document.getElementById("cashier-notes").value.trim(),n=parseFloat(r);if(r===""||isNaN(n)||n<0){g("Valor Inválido","Por favor, insira um valor inicial válido (maior ou igual a R$ 0,00).","error"),o.focus();return}try{const i={establishmentId:p.establishmentId,initialAmount:parseFloat(n.toFixed(2))};s&&(i.notes=s);const d=await Er(i);x.isCashierOpen=!0,x.activeCashierSessionId=d.id,await ga(),document.getElementById("genericModal").style.display="none",g("Sucesso!",`Caixa aberto com valor inicial de R$ ${n.toFixed(2)}`,"success")}catch(i){g("Erro",`Não foi possível abrir o caixa: ${i.message}`,"error")}})}async function Rr(){const e=x.activeCashierSessionId;if(e)try{const t=await Ir(e),a=`
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
        `,{modalElement:o}=H({title:"Fechar Caixa",contentHTML:a,maxWidth:"max-w-md"});o.querySelector("#close-cashier-form").addEventListener("submit",async r=>{r.preventDefault();const s=parseFloat(document.getElementById("final-amount").value);if(isNaN(s)||s<0){g("Valor Inválido","Insira um valor final válido.","error");return}try{await Sr(e,s),x.isCashierOpen=!1,x.activeCashierSessionId=null,document.getElementById("genericModal").style.display="none",await ga(),g("Sucesso!","Caixa fechado com sucesso!","success")}catch(n){g("Erro",`Não foi possível fechar o caixa: ${n.message}`,"error")}})}catch(t){g("Erro",`Não foi possível carregar o relatório de fecho: ${t.message}`,"error")}}async function Hr(e){x.activeFilter!==e&&(x.activeFilter=e,x.paging.page=1,document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${e}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",e!=="finalizadas"),ge(),await K(),x.selectedComandaId=null,W())}function Qt(e){x.selectedComandaId=e,de(),Tr(),W()}async function jr(e,t){const a=x.allComandas.find(r=>r.id===x.selectedComandaId);if(!a)return;const o=Array(t).fill(0).map(()=>({id:e.id,name:e.name,price:e.price,type:e.type}));if(a.comandaItems=a.comandaItems||[],a.comandaItems.push(...o),a.type==="walk-in"&&a.id.startsWith("temp-")){g("Sucesso",`${t}x ${e.name} adicionado(s)!`,"success"),W(),de();return}try{await da(a.id,a),g("Sucesso",`${t}x ${e.name} adicionado(s)!`,"success"),W(),de()}catch(r){g("Erro",`Não foi possível adicionar o item: ${r.message}`,"error"),a.comandaItems.splice(a.comandaItems.length-t,t)}}async function Or(e,t){const a=x.allComandas.find(s=>s.id===x.selectedComandaId);if(!a)return;let o=!1,r=(a.comandaItems||[]).findIndex(s=>s.id===e&&s.type===t);if(r>-1)a.comandaItems.splice(r,1),o=!0;else{let s=(a.services||[]).findIndex(n=>n.id===e);if(s>-1)a.services.splice(s,1),o=!0;else{let n=(a.items||[]).findIndex(i=>i.id===e&&i.type===t);n>-1&&(a.items.splice(n,1),o=!0)}}if(o){if(a.type==="walk-in"&&a.id.startsWith("temp-")){g("Sucesso","Item removido!","success"),W(),de();return}try{await da(a.id,a),g("Sucesso","Item removido!","success"),W(),de()}catch(s){g("Erro",`Não foi possível remover o item: ${s.message}`,"error"),await K()}}}async function zr(e,t,a){const o=e.type==="appointment",r=[...e.services||[],...e.comandaItems||[],...e.items||[]],s={payments:a,totalAmount:t,items:r,cashierSessionId:x.activeCashierSessionId};try{o?await ns(e.id,s):(s.clientName=e.clientName,s.professionalId=e.professionalId,s.clientPhone=e.clientPhone,await br(s)),g("Sucesso!","Venda finalizada com sucesso!","success"),document.getElementById("genericModal").style.display="none",ge(),x.selectedComandaId=null,await K()}catch(n){g("Erro no Checkout",n.message,"error")}}async function Vr(e){e.preventDefault();const t=document.getElementById("new-sale-client").value,a=document.getElementById("new-sale-professional").value,o=x.clients.find(n=>n.id===t),r=p.professionals.find(n=>n.id===a);if(!o||!r){g("Erro","Selecione um cliente e um profissional válidos.","error");return}const s={id:`temp-${Date.now()}`,type:"walk-in",clientName:o.name,clientPhone:o.phone,professionalId:r.id,professionalName:r.name,startTime:new Date,status:"confirmed",services:[],comandaItems:[]};x.allComandas.unshift(s),x.selectedComandaId=s.id,document.getElementById("genericModal").style.display="none",Qt(s.id)}async function K(){const e=document.getElementById("comandas-list");e.innerHTML='<div class="loader mx-auto mt-10"></div>';const t=x.activeFilter==="finalizadas"?document.getElementById("filter-date").value:null;try{const a=await ko();if(x.isCashierOpen=!!a,x.activeCashierSessionId=a?a.id:null,Dr(),!x.isCashierOpen&&x.activeFilter==="atendimento"){de(),W();return}const o=await gr(p.establishmentId,t,x.paging.page,x.paging.limit);if(x.allComandas=o.data||o,x.paging.total=o.total||o.length,x.catalog.services.length===0){const[r,s,n,i,d]=await Promise.all([Pe(p.establishmentId),Tt(p.establishmentId),Eo(p.establishmentId),et(p.establishmentId),G(p.establishmentId)]);x.catalog={services:r,products:s,packages:n},x.clients=i,p.professionals=d}de(),x.selectedComandaId,W()}catch(a){g("Erro de Carregamento",`Não foi possível carregar os dados: ${a.message}`,"error"),e.innerHTML=`<p class="text-red-500 p-4">${a.message}</p>`}}async function ga(e={}){xe=document.getElementById("content");try{const t=await ko();x.isCashierOpen=!!t,x.activeCashierSessionId=t?t.id:null}catch(t){console.error("Erro ao verificar caixa:",t),x.isCashierOpen=!1}x.selectedComandaId=e.selectedAppointmentId||null,Mr(),ye&&(xe.removeEventListener("click",ye),xe.removeEventListener("change",ye)),ye=async t=>{const a=t.target.closest("[data-action], [data-filter], [data-comanda-id], [data-id]");if(t.target.id==="filter-date"&&x.activeFilter==="finalizadas"){x.paging.page=1,await K();return}if(a){if(a.matches("[data-filter]"))Hr(a.dataset.filter);else if(a.matches("[data-comanda-id]")){if(t.target.closest('[data-action="go-to-appointment"]')){t.stopPropagation();return}Qt(a.dataset.comandaId)}else if(a.matches("[data-action]")){const o=a.dataset.action,r=a.dataset.id||x.selectedComandaId;switch(o){case"back-to-list":{ge(),x.selectedComandaId=null,document.querySelectorAll(".comanda-card").forEach(s=>s.classList.remove("selected")),W();break}case"new-sale":So();break;case"add-item":qr();break;case"checkout":Nr();break;case"open-cashier":Fr();break;case"close-cashier":await Rr();break;case"view-sales-report":R("sales-report-section");break;case"remove-item":await Or(a.dataset.itemId,a.dataset.itemType);break;case"reopen-appointment":{if(await M("Reabrir Comanda","Tem certeza? O pagamento será estornado e os produtos devolvidos ao estoque."))try{await rs(r);const n=x.allComandas.findIndex(i=>i.id===r);n!==-1&&(delete x.allComandas[n].transaction,delete x.allComandas[n].cashierSessionId,delete x.allComandas[n].redeemedReward,x.allComandas[n].status="confirmed"),x.selectedComandaId=null,ge(),g("Sucesso!","Comanda reaberta para edição.","success"),await K()}catch(n){g("Erro",`Não foi possível reabrir: ${n.message}`,"error")}break}case"reopen-walk-in":{if(await M("Reabrir Venda","Tem certeza? A venda será cancelada e os produtos devolvidos ao estoque."))try{await fr(r),g("Sucesso!","Venda revertida."),ge(),x.selectedComandaId=null,await K()}catch(n){g("Erro",`Não foi possível reabrir: ${n.message}`,"error")}break}case"go-to-appointment":{const s=a.dataset.id,n=a.dataset.date;R("agenda-section",{scrollToAppointmentId:s,targetDate:new Date(n)});break}case"delete-walk-in":{if(await M("Excluir Venda","Tem certeza que deseja excluir esta venda avulsa? O estoque dos produtos será devolvido."))if(r.startsWith("temp-"))x.allComandas=x.allComandas.filter(n=>n.id!==r),x.selectedComandaId=null,de(),W(),g("Sucesso","Venda avulsa removida.","success"),ge();else try{await vr(r),g("Sucesso","Venda avulsa excluída com sucesso.","success"),x.selectedComandaId=null,ge(),await K()}catch(n){g("Erro",`Não foi possível excluir: ${n.message}`,"error")}break}}}}},xe.addEventListener("click",ye),xe.addEventListener("change",ye),e.initialFilter&&(x.activeFilter=e.initialFilter==="finalizadas"?"finalizadas":"atendimento"),e.selectedAppointmentId&&(x.selectedComandaId=e.selectedAppointmentId),document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("bg-white","text-indigo-600","shadow")),document.querySelector(`[data-filter="${x.activeFilter}"]`).classList.add("bg-white","text-indigo-600","shadow"),document.getElementById("finalizadas-datepicker").classList.toggle("hidden",x.activeFilter!=="finalizadas"),e.filterDate&&(document.getElementById("filter-date").value=new Date(e.filterDate).toISOString().split("T")[0]),await K(),x.selectedComandaId&&Qt(x.selectedComandaId)}const Mt=document.getElementById("content");let le={},Ur=null,_r=null,q={year:null,month:null,monthName:null,professionalId:null,professionalName:null},qa=[];const we=["#4f46e5","#22c55e","#f97316","#06b6d4","#e11d48","#6366f1","#84cc16","#f59e0b"];function ba(){Object.values(le).forEach(e=>e?.destroy()),le={}}function Jr(e){const t=document.getElementById("kpi-revenue"),a=document.getElementById("kpi-transactions"),o=document.getElementById("kpi-popular-item");t&&(t.textContent=`R$ ${e.totalRevenue.toFixed(2)}`),a&&(a.textContent=e.totalTransactions),o&&(o.textContent=e.mostPopularItem||"N/A"),document.querySelectorAll(".kpi-loader").forEach(r=>r.classList.add("hidden")),document.querySelectorAll(".kpi-value").forEach(r=>r.classList.remove("hidden"))}function Wr(e){const t="Detalhes da Transação",a=`
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
    `;H({title:t,contentHTML:a,maxWidth:"max-w-md"})}async function Ye(e,t,a){q={year:e,month:t,monthName:a},Mt.innerHTML=`
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
        </section>`,document.getElementById("backToMainBtn").addEventListener("click",Zt);try{const o=await As(p.establishmentId,e,t);_r=o,document.querySelector(".loader-container").classList.add("hidden"),document.getElementById("monthly-details-view").classList.remove("hidden");const r=o.revenueByDay.map(m=>m.day),s=o.revenueByDay.map(m=>m.revenue),n=o.salesByProfessional.map(m=>m.name),i=o.salesByProfessional.map(m=>m.count),d=o.topItems.map(m=>m.name),l=o.topItems.map(m=>m.count),u=["Agendamentos","Vendas Avulsas"],c=[o.revenueByTransactionType.appointment,o.revenueByTransactionType.sales];ba(),le.monthlyRevenue=new Chart(document.getElementById("monthlyRevenueChart").getContext("2d"),{type:"bar",data:{labels:r,datasets:[{label:"Receita Diária",data:s,backgroundColor:we[0]}]},options:{responsive:!0,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}},onClick:(m,b)=>{if(b.length>0){const f=r[b[0].index];Gr(e,t,f)}}}}),le.salesByProfessional=new Chart(document.getElementById("salesByProfessionalChart").getContext("2d"),{type:"pie",data:{labels:n,datasets:[{label:"Vendas",data:i,backgroundColor:we,hoverOffset:16}]},options:{responsive:!0,plugins:{legend:{position:"right"}},onClick:(m,b)=>{if(b.length>0){const f=b[0].index,v=o.salesByProfessional[f];v&&Yr(e,t,v.id,v.name)}}}}),le.topItems=new Chart(document.getElementById("topItemsChart").getContext("2d"),{type:"bar",data:{labels:d,datasets:[{label:"Itens Vendidos",data:l,backgroundColor:we[2]}]},options:{indexAxis:"y",responsive:!0,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0}}}}),le.revenueByType=new Chart(document.getElementById("revenueByTypeChart").getContext("2d"),{type:"doughnut",data:{labels:u,datasets:[{label:"Receita por Tipo",data:c,backgroundColor:[we[1],we[3]],hoverOffset:16}]},options:{responsive:!0,plugins:{legend:{position:"right"}}}})}catch(o){g("Erro",`Não foi possível carregar os detalhes do mês: ${o.message}`,"error"),Zt()}}async function Gr(e,t,a){q={...q,day:a},Mt.innerHTML=`
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
        </section>`,document.getElementById("backToMonthlyBtn").addEventListener("click",()=>{Ye(q.year,q.month,q.monthName)});try{const o=await qs(p.establishmentId,e,t,a);qa=o.transactions,document.querySelector(".loader-container").classList.add("hidden"),document.getElementById("daily-details-view").classList.remove("hidden"),document.getElementById("daily-total-transactions").textContent=o.summary.totalTransactions,document.getElementById("daily-total-revenue").textContent=`R$ ${o.summary.totalRevenue.toFixed(2)}`;const r=document.getElementById("daily-transactions-list");r.innerHTML=o.transactions.map((s,n)=>`
            <tr class="border-b hover:bg-gray-50 cursor-pointer" data-index="${n}">
                <td class="px-2 py-2">${new Date(s.date).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</td>
                <td class="px-2 py-2">${s.client}</td>
                <td class="px-2 py-2">${s.professionalName||"N/A"}</td>
            </tr>
        `).join(""),document.querySelectorAll("#daily-transactions-list tr").forEach(s=>{s.addEventListener("click",n=>{const i=n.currentTarget.getAttribute("data-index"),d=qa[i];d&&Wr(d)})})}catch(o){g("Erro",`Não foi possível carregar os detalhes diários: ${o.message}`,"error"),Ye(q.year,q.month,q.monthName)}}async function Yr(e,t,a,o){q={year:e,month:t,professionalId:a,professionalName:o},Mt.innerHTML=`
        <section>
            <div class="flex justify-between items-center mb-6">
                <button id="backToMonthlyBtn" class="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">
                    < Voltar
                </button>
                <h2 class="text-3xl font-bold text-gray-800">Relatório de ${o}</h2>
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
        </section>`,document.getElementById("backToMonthlyBtn").addEventListener("click",()=>{Ye(q.year,q.month,q.monthName)});try{const r=await Ns(p.establishmentId,e,t,a);document.querySelector(".loader-container").classList.add("hidden"),document.getElementById("professional-details-view").classList.remove("hidden"),document.getElementById("prof-total-transactions").textContent=r.summary.totalTransactions,document.getElementById("prof-total-revenue").textContent=`R$ ${r.summary.totalRevenue.toFixed(2)}`;const s=document.getElementById("prof-transactions-list");s.innerHTML=r.transactions.map(n=>`
            <tr class="border-b hover:bg-gray-50">
                <td class="px-2 py-2">${new Date(n.date).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
                <td class="px-2 py-2">${n.client}</td>
                <td class="px-2 py-2">${n.items}</td>
                <td class="px-2 py-2 text-right">R$ ${n.value.toFixed(2)}</td>
            </tr>
        `).join("")}catch(r){g("Erro",`Não foi possível carregar os detalhes do profissional: ${r.message}`,"error"),Ye(q.year,q.month,q.monthName)}}async function Xr(e,t,a){const o=t.getElementsAtEventForMode(e,"nearest",{intersect:!0},!1);if(o.length>0){const s=o[0].index,n=a[s];n&&await Ye(n.year,n.monthIndex,n.month)}}async function Na(){const e=document.getElementById("main-reports-view"),t=document.getElementById("startDate"),a=document.getElementById("endDate");if(!e||!t||!a){console.error("Elementos essenciais para o relatório não foram encontrados no DOM.");return}e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';const o=t.value,r=a.value;if(!o||!r)return e.innerHTML='<p class="text-red-500 p-8 text-center">Selecione as datas para gerar o relatório.</p>',g("Atenção","Por favor, selecione as datas de início e fim.","error");try{const s=await Ds(p.establishmentId,o,r);Ur=s,e.innerHTML=`
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
            </div>`,Jr(s.kpis),setTimeout(()=>{const n=document.getElementById("transactionsByMonthChart");n&&(ba(),le.main=new Chart(n.getContext("2d"),{type:"bar",data:{labels:s.transactionsByMonth.map(i=>i.month),datasets:[{label:"Receita Total",data:s.transactionsByMonth.map(i=>i.revenue),backgroundColor:we[0],borderRadius:5}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:i=>`R$ ${i.raw.toFixed(2)}`}}},scales:{y:{beginAtZero:!0}},onClick:(i,d)=>Xr(i,le.main,s.transactionsByMonth)}}))},50)}catch(s){g("Erro",`Não foi possível carregar os relatórios: ${s.message}`,"error"),e.innerHTML='<p class="text-red-500 p-8 text-center">Erro ao carregar os dados dos relatórios. Por favor, tente novamente.</p>'}}async function Zt(){ba();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];Mt.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",Na),await Na()}const Dt=(e,t="products")=>w(`/api/${t}/categories/${e}`),$o=(e,t="products")=>w(`/api/${t}/categories`,{method:"POST",body:JSON.stringify(e)}),Io=(e,t="products")=>w(`/api/${t}/categories/${e}`,{method:"DELETE"}),Qr="audit_logs",Te=async(e,t,a,o,r,s=null)=>{try{if(!t)return;await la(De(X,Qr),{establishmentId:e,userId:t.uid,userName:t.name||t.email||"Utilizador",module:a,action:o,description:r,details:s,timestamp:new Date})}catch(n){console.error("Falha silenciosa ao registar log:",n)}},pe=document.getElementById("content");let re=null,He="services",fe="all";function Me(){const e=U.currentUser;return e?{uid:e.uid,name:e.displayName||e.email}:{uid:"unknown",name:"Desconhecido"}}async function Zr(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),o=a.value;if(o)try{await $o({establishmentId:p.establishmentId,name:o},"services"),Te(p.establishmentId,Me(),"Categorias (Serviços)","Criou",`Criou categoria: ${o}`),a.value="",g("Sucesso","Categoria criada!","success"),await fa(),await at()}catch(r){g("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}}async function Kr(e){if(await M("Apagar Categoria","Tem a certeza? Os serviços nesta categoria ficarão sem categoria."))try{await Io(e,"services"),Te(p.establishmentId,Me(),"Categorias (Serviços)","Excluiu",`Excluiu uma categoria (ID: ${e})`),g("Sucesso","Categoria apagada.","success"),await fa(),await at()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function fa(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await Dt(p.establishmentId,"services");p.serviceCategories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${a.name}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria criada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function en(){H({title:"Gerir Categorias de Serviços",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",Zr),t.addEventListener("click",o=>{const r=o.target.closest('button[data-action="delete-category"]');r&&(o.preventDefault(),Kr(r.dataset.id))}))}fa()}async function tn(e){e.preventDefault();const t=e.target.closest("#serviceModal"),a=t.querySelector("#serviceId").value,o={},r=t.querySelector('input[name="commissionType"]:checked').value;r==="custom"&&t.querySelectorAll(".professional-commission-row").forEach(n=>{const i=n.dataset.profId;if(n.querySelector('input[type="checkbox"]').checked){const l=parseFloat(n.querySelector('input[type="number"]').value);o[i]=isNaN(l)?0:l}});const s={establishmentId:p.establishmentId,name:t.querySelector("#serviceName").value,price:parseFloat(t.querySelector("#servicePrice").value),duration:parseInt(t.querySelector("#serviceDurationMinutes").value,10),bufferTime:parseInt(t.querySelector("#serviceBufferTimeMinutes").value,10)||0,categoryId:t.querySelector("#serviceCategory").value||null,commissionRate:parseFloat(t.querySelector("#serviceCommissionRate").value)||0,active:t.querySelector("#serviceStatus").value==="true",photo:t.querySelector("#servicePhotoBase64").value,notes:t.querySelector("#serviceNotes").value,commissionType:r,professionalCommissions:o};try{a?(await Hs(a,s),Te(p.establishmentId,Me(),"Serviços","Editou",`Editou o serviço: ${s.name}`)):(await Rs(s),Te(p.establishmentId,Me(),"Serviços","Criou",`Criou novo serviço: ${s.name}`)),document.getElementById("serviceModal").style.display="none",g("Sucesso",`Serviço ${a?"atualizado":"adicionado"} com sucesso!`,"success"),await at()}catch(n){g("Erro",n.message,"error")}}function an(e,t=800,a=800,o="image/jpeg",r=.8){return new Promise((s,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=d=>{const l=new Image;l.onload=()=>{let u=l.width,c=l.height;u>c?u>t&&(c*=t/u,u=t):c>a&&(u*=a/c,c=a);const m=document.createElement("canvas");m.width=u,m.height=c,m.getContext("2d").drawImage(l,0,0,u,c);const f=m.toDataURL(o,r);s(f)},l.onerror=u=>n(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},i.onerror=d=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function Fa(e=null){const t=document.getElementById("serviceModal"),a=p.serviceCategories||[],o=e?.duration||0,r=e?.bufferTime||0,s=a.map(h=>`<option value="${h.id}" ${e?.categoryId===h.id?"selected":""}>${h.name}</option>`).join("");t.innerHTML=`
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
    </div>`,t.style.display="flex",t.addEventListener("click",async h=>{const y=h.target.closest("button[data-action]");if(!y)return;const S=y.dataset.action,$=y.dataset.id;if(S==="close-modal"&&(t.style.display="none"),S==="delete-service"){if(!$)return;if(t.style.display="none",await M("Apagar Serviço","Tem a certeza que deseja apagar este serviço?"))try{const B=p.services.find(j=>j.id===$)?.name||"Desconhecido";await js($),Te(p.establishmentId,Me(),"Serviços","Excluiu",`Excluiu o serviço: ${B}`),g("Sucesso","Serviço apagado com sucesso!","success"),await at()}catch(B){g("Erro",`Não foi possível apagar o serviço: ${B.message}`,"error")}else t.style.display="flex"}});const n=t.querySelectorAll(".tab-btn"),i=t.querySelectorAll(".tab-content");n.forEach(h=>{h.addEventListener("click",()=>{n.forEach(y=>{y.classList.remove("border-indigo-500","text-indigo-600"),y.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),h.classList.add("border-indigo-500","text-indigo-600"),h.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),i.forEach(y=>y.classList.add("hidden")),document.getElementById(`tab-content-${h.dataset.tab}`).classList.remove("hidden")})});const d=t.querySelectorAll('input[name="commissionType"]'),l=document.getElementById("defaultCommissionRateContainer"),u=document.getElementById("professionalCommissionsContainer");function c(){const h=t.querySelector('input[name="commissionType"]:checked').value;l&&(l.style.display=h==="default"?"block":"none"),u&&(u.style.display=h==="custom"?"block":"none")}d.forEach(h=>h.addEventListener("change",c));const m=document.getElementById("professionalCommissionsList");m&&(m.innerHTML=(p.professionals||[]).map(h=>{const y=e?.professionalCommissions?.[h.id]!==void 0,S=e?.professionalCommissions?.[h.id]||0;return`
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-md ${y?"bg-blue-50":""}" data-prof-id="${h.id}">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" ${y?"checked":""} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <img src="${h.photo||`https://placehold.co/40x40/E2E8F0/4A5568?text=${h.name.charAt(0)}`}" class="w-8 h-8 rounded-full object-cover">
                        <span class="text-sm font-medium">${h.name}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${S}" class="w-20 p-1 border rounded-md text-sm text-center" ${y?"":"disabled"}>
                        <span class="text-sm font-semibold">%</span>
                    </div>
                </div>
            `}).join(""),m.querySelectorAll('input[type="checkbox"]').forEach(h=>{h.addEventListener("change",y=>{const S=y.target.closest(".professional-commission-row");S.querySelector('input[type="number"]').disabled=!y.target.checked,S.classList.toggle("bg-blue-50",y.target.checked)})})),c();const b=t.querySelector("#serviceForm"),f=t.querySelector("#servicePhotoInput"),v=t.querySelector("#servicePhotoPreview"),k=t.querySelector("#servicePhotoBase64");t.querySelector("#servicePhotoButton").addEventListener("click",()=>f.click()),f.onchange=async()=>{const h=f.files[0];if(h){v.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const y=await an(h,800,800,"image/jpeg",.8),$=y.length*3/4,L=1e3*1024;if($>L)throw new Error("A imagem é muito grande mesmo após a compressão.");v.src=y,k.value=y}catch(y){console.error("Erro ao processar imagem:",y),g("Erro de Imagem",y.message||"Não foi possível processar a imagem.","error"),v.src=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",k.value=e?.photo||"",f.value=""}}},b.addEventListener("submit",tn)}function ke(){const e=document.getElementById("servicesList");if(!e)return;const t=document.getElementById("serviceSearchInput")?.value.toLowerCase()||"",a=document.getElementById("serviceCategoryFilter")?.value||"all",o=new Map((p.serviceCategories||[]).map(s=>[s.id,s.name]));let r=(p.services||[]).filter(Boolean);if(fe!=="all"){const s=fe==="active";r=r.filter(n=>n.active!==!1===s)}r=r.filter(s=>{const n=s.name.toLowerCase().includes(t),i=a==="all"||s.categoryId===a;return n&&i}),e.innerHTML="",r.length>0?r.forEach(s=>{const n=document.createElement("div"),i=JSON.stringify(s).replace(/'/g,"&apos;");n.className=`service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 ${s.active!==!1?"opacity-100":"opacity-50 bg-gray-100"} sm:flex-col`,n.dataset.action="edit-service",n.dataset.service=i;const d=s.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(s.name.charAt(0))}`,l=o.get(s.categoryId)||"N/A";n.innerHTML=`
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
                </div>`,e.appendChild(n)}):e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>'}function va(){const e={active:0,inactive:0,total:0},t=(p.services||[]).filter(Boolean);t.forEach(n=>{n.active===!1?e.inactive++:e.active++}),e.total=t.length;const a=document.getElementById("indicator-total"),o=document.getElementById("indicator-active"),r=document.getElementById("indicator-inactive"),s=document.getElementById("indicator-popular");a&&(a.textContent=e.total),o&&(o.textContent=e.active),r&&(r.textContent=e.inactive),s&&(p.mostPopularService&&p.mostPopularService.name!=="N/A"?(s.textContent=p.mostPopularService.name,s.closest(".indicator-card").title=`${p.mostPopularService.name} (${p.mostPopularService.count} agendamentos)`):(s.textContent="N/A",s.closest(".indicator-card").title="Nenhum serviço agendado ainda"))}function on(){const e=document.getElementById("services-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("serviceCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(p.serviceCategories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${a.name}</option>`)),va(),ke()}function sn(){const e=document.getElementById("services-content-container");e.innerHTML=`
        <div class="p-8 text-center">
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2">Em breve, aqui poderás ver relatórios detalhados sobre os teus serviços mais rentáveis, mais agendados e muito mais.</p>
        </div>
    `}async function at(){const e=document.getElementById("services-content-container");if(e){const t=e.querySelector(".loader");t&&(t.style.display="block")}try{const[t,a,o,r]=await Promise.all([Pe(p.establishmentId),G(p.establishmentId),Dt(p.establishmentId,"services"),zs(p.establishmentId)]);p.services=(t||[]).filter(Boolean),p.professionals=(a||[]).filter(Boolean),p.serviceCategories=(o||[]).filter(Boolean),p.mostPopularService=r||{name:"N/A",count:0},p.services.forEach(s=>{s.active===void 0&&(s.active=!0)}),Co(He)}catch(t){e&&(e.innerHTML='<p class="text-red-500 col-span-full text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>'),g("Erro",`Não foi possível carregar os dados: ${t.message}`,"error")}}function Co(e){if(document.getElementById("services-content-container")){if(He===e&&document.getElementById("services-content-container").children.length>1){He==="services"&&(va(),ke());return}He=e,fe="all",document.querySelectorAll("#services-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="services"?on():e==="reports"&&sn()}}function rn(){re&&(pe.removeEventListener("click",re),pe.removeEventListener("input",re),pe.removeEventListener("change",re)),re=async e=>{const t=e.target;if(t.closest('[data-action="toggle-service-status"]')){e.stopPropagation();const r=t.closest('[data-action="toggle-service-status"]'),s=r.dataset.id,n=r.checked;try{await Os(s,n);const i=p.services.findIndex(d=>d.id===s);i>-1&&(p.services[i].active=n),Te(p.establishmentId,Me(),"Serviços","Atualizou Status",`Alterou status do serviço (ID: ${s}) para ${n?"Ativo":"Inativo"}`),ke(),va()}catch(i){g("Erro",`Não foi possível atualizar o status: ${i.message}`,"error"),r.checked=!n,ke()}return}const a=t.closest("button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]");if(t.id==="serviceSearchInput"||t.id==="serviceCategoryFilter"){ke();return}if(!a)return;if(a.hasAttribute("data-view")){Co(a.dataset.view);return}switch(a.dataset.action){case"new-service":Fa();break;case"edit-service":const r=JSON.parse(a.dataset.service);Fa(r);break;case"manage-categories":en();break;case"filter-service":const s=a.dataset.filterType;if(s==="popular")return;fe=s==="total"?"all":s,document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(n=>{const i=n.dataset.filterType,l=i===fe||i==="total"&&fe==="all";n.classList.toggle("ring-2",l),n.classList.toggle("ring-indigo-500",l),n.classList.toggle("shadow-lg",l)}),ke();break}},pe.addEventListener("click",re),pe.addEventListener("input",re),pe.addEventListener("change",re)}async function nn(){pe.innerHTML=`
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
        </section>`,rn();try{(!p.professionals||p.professionals.length===0)&&(p.professionals=await G(p.establishmentId)||[])}catch(e){console.error("Falha ao carregar profissionais:",e),g("Erro","Não foi possível carregar a lista de profissionais.","error"),p.professionals=[]}He="services",fe="all",await at()}const Pt="suppliers",Lo="purchases",ha=async()=>{try{const e=await uo(De(X,Pt)),t=[];return e.forEach(a=>{t.push({id:a.id,...a.data()})}),t}catch(e){throw console.error("Erro ao buscar fornecedores:",e),e}},ln=async e=>{try{return{id:(await la(De(X,Pt),e)).id,...e}}catch(t){throw console.error("Erro ao criar fornecedor:",t),t}},dn=async(e,t)=>{try{const a=It(X,Pt,e);return await go(a,t),{id:e,...t}}catch(a){throw console.error("Erro ao atualizar fornecedor:",a),a}},cn=async e=>{try{const t=It(X,Pt,e);return await Go(t),!0}catch(t){throw console.error("Erro ao excluir fornecedor:",t),t}},un=async e=>{try{const t={...e,createdAt:new Date};return{id:(await la(De(X,Lo),t)).id,...t}}catch(t){throw console.error("Erro ao registrar compra:",t),t}},mn=async e=>{try{const t=mo(De(X,Lo),po("createdAt","desc")),a=await uo(t),o=[];return a.forEach(r=>{o.push({id:r.id,...r.data()})}),o}catch(t){throw console.error("Erro ao buscar histórico de compras:",t),t}},ce=document.getElementById("content");let ne=null,je="products",Z="all";async function pn(e){e.preventDefault();const a=e.target.closest("#categoryForm").querySelector("#categoryName"),o=a.value;if(o)try{await $o({establishmentId:p.establishmentId,name:o},"products"),a.value="",g("Sucesso","Categoria de produto criada!","success"),await ya(),await ot()}catch(r){g("Erro",`Não foi possível criar a categoria: ${r.message}`,"error")}}async function gn(e){if(await M("Apagar Categoria","Tem a certeza? Os produtos nesta categoria ficarão sem categoria."))try{await Io(e,"products"),g("Sucesso","Categoria de produto apagada.","success"),await ya(),await ot()}catch{g("Erro","Não foi possível apagar a categoria.","error")}}async function ya(){const e=document.getElementById("categoryList");if(e){e.innerHTML='<div class="loader mx-auto my-4"></div>';try{const t=await Dt(p.establishmentId,"products");p.categories=t,e.innerHTML="",t.length>0?e.innerHTML=t.map(a=>`
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${a.name}</span>
                    <button data-action="delete-category" data-id="${a.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join(""):e.innerHTML='<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>'}catch{e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar categorias.</p>'}}}function bn(){H({title:"Gerir Categorias de Produtos",contentHTML:`
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
    `,maxWidth:"max-w-xl"});const t=document.getElementById("genericModal");if(t){const a=t.querySelector("#categoryForm");a&&(a.addEventListener("submit",pn),t.addEventListener("click",o=>{const r=o.target.closest('button[data-action="delete-category"]');r&&gn(r.dataset.id)}))}ya()}async function fn(e){if(!e)return;if(await M("Apagar Produto","Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida."))try{await xr(e),g("Sucesso","Produto apagado com sucesso!","success"),await ot()}catch(a){g("Erro",`Não foi possível apagar o produto: ${a.message}`,"error")}}async function vn(e){const t=e.querySelector("#productId").value,a=parseInt(e.querySelector("#productCurrentStock").value),o=parseInt(e.querySelector("#productMinStock").value),r=parseInt(e.querySelector("#productMaxStock").value),s=e.querySelectorAll("#selectedSuppliersList .selected-supplier-item"),n=Array.from(s).map(d=>d.dataset.id),i={establishmentId:p.establishmentId,name:e.querySelector("#productName").value,price:parseFloat(e.querySelector("#productPrice").value),costPrice:parseFloat(e.querySelector("#productCostPrice").value)||0,commissionRate:parseFloat(e.querySelector("#productCommissionRate").value)||0,currentStock:isNaN(a)?0:a,minStock:isNaN(o)?0:o,maxStock:isNaN(r)?0:r,categoryId:e.querySelector("#productCategory").value||null,photo:e.querySelector("#productPhotoBase64").value,supplierIds:n};try{t?await yr(t,i):await hr(i),document.getElementById("productModal").style.display="none",g("Sucesso",`Produto ${t?"atualizado":"adicionado"} com sucesso!`,"success"),await ot()}catch(d){throw new Error(d.message)}}function Ra(e,t=800,a=800,o="image/jpeg",r=.8){return new Promise((s,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=d=>{const l=new Image;l.onload=()=>{let u=l.width,c=l.height;u>c?u>t&&(c*=t/u,u=t):c>a&&(u*=a/c,c=a);const m=document.createElement("canvas");m.width=u,m.height=c,m.getContext("2d").drawImage(l,0,0,u,c);const f=m.toDataURL(o,r);s(f)},l.onerror=u=>n(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},i.onerror=d=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function Ha(e=null){const t=document.getElementById("productModal"),a=p.categories||[],o=p.suppliers||[],r=a.map(k=>`<option value="${k.id}" ${e?.categoryId===k.id?"selected":""}>${k.name}</option>`).join("");let s=new Set(e?.supplierIds||[]);t.innerHTML=`
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
    </div>`;const n=t.querySelector("#productCategory"),i=t.querySelector("#productPhotoInput");t.querySelector("#productPhotoButton").addEventListener("click",()=>i.click()),n.innerHTML='<option value="">Sem categoria</option>'+(p.categories||[]).map(k=>`<option value="${k.id}" ${e?.categoryId===k.id?"selected":""}>${k.name}</option>`).join(""),e&&(n.value=e.categoryId||"");const d=t.querySelector("#productPhotoPreview");t.querySelector("#productPhotoBase64");const l=e?.photo||"https://placehold.co/128x128/E2E8F0/4A5568?text=Foto",u=e?.photo||"";i.onchange=async()=>{const k=i.files[0];if(k){d.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const h=await Ra(k,800,800,"image/jpeg",.8),S=h.length*3/4,$=1e3*1024;if(S>$)throw new Error("A imagem é muito grande mesmo após a compressão.");preview.src=h,base64Input.value=h}catch(h){console.error("Erro ao processar imagem:",h),g("Erro de Imagem",h.message||"Não foi possível processar a imagem.","error"),preview.src=l,base64Input.value=u,v.value=""}}};const c=t.cloneNode(!0);t.parentNode.replaceChild(c,t);const m=()=>{const k=c.querySelector("#modalSupplierSearch"),h=c.querySelector("#supplierSearchResults"),y=c.querySelector("#selectedSuppliersList"),S=k.value.toLowerCase();if(S.length>0){const $=o.filter(L=>L.name.toLowerCase().includes(S)&&!s.has(L.id));$.length>0?(h.classList.remove("hidden"),h.innerHTML=$.map(L=>`
                    <div class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 text-sm flex justify-between items-center" data-add-supplier="${L.id}">
                        <span class="font-medium">${L.name}</span>
                        <span class="text-indigo-600 text-xs">+ Adicionar</span>
                    </div>
                `).join("")):(h.classList.remove("hidden"),h.innerHTML='<div class="p-2 text-xs text-gray-500 text-center">Nenhum resultado disponível.</div>')}else h.classList.add("hidden");s.size>0?(y.innerHTML="",s.forEach($=>{const L=o.find(B=>B.id===$);L&&(y.innerHTML+=`
                        <div class="selected-supplier-item flex items-center justify-between bg-white border p-2 rounded shadow-sm" data-id="${L.id}">
                            <div class="text-sm">
                                <p class="font-bold text-gray-800">${L.name}</p>
                                <p class="text-xs text-gray-500">${L.contactName||""} - ${L.phone||""}</p>
                            </div>
                            <button type="button" class="text-red-500 hover:text-red-700 p-1" data-remove-supplier="${L.id}" title="Remover">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    `)})):y.innerHTML='<p class="text-xs text-gray-400 text-center py-2">Nenhum fornecedor selecionado.</p>'};c.querySelector("#modalSupplierSearch").addEventListener("input",m),c.addEventListener("click",k=>{const h=k.target.closest("[data-add-supplier]");if(h){const S=h.dataset.addSupplier;s.add(S),c.querySelector("#modalSupplierSearch").value="",m()}const y=k.target.closest("[data-remove-supplier]");if(y){const S=y.dataset.removeSupplier;s.delete(S),m()}}),m(),c.addEventListener("click",async k=>{const h=k.target.closest("button[data-action]");if(!h)return;const y=h.dataset.action,S=c.querySelector("#productId").value;if(y==="close-modal"&&(c.style.display="none"),y==="delete-product"){if(!S)return;c.style.display="none",await fn(S)}if(y==="save-product-modal"){const $=c.querySelector("#productForm");if($){if(!$.querySelector("#productName").value||!$.querySelector("#productPrice").value){g("Erro","Nome e Preço de Venda são obrigatórios.","error");return}const L=h.closest('button[data-action="save-product-modal"]');L.disabled=!0,L.textContent="A salvar...";try{await vn($)}catch(B){g("Erro",`Falha ao salvar: ${B.message}`,"error"),L.disabled=!1,L.textContent="Salvar Alterações"}}}if(y==="adjust-stock-modal"){k.preventDefault();const $=c.querySelector("#stockAdjustmentAmount"),L=c.querySelector("#stockAdjustmentReason"),B=parseInt($.value,10),j=parseInt(h.dataset.change,10);if(!B||B<=0){g("Erro","Por favor, insira uma quantidade válida.","error");return}const T=B*j,P=L.value||(T>0?"Entrada manual":"Saída manual");try{await wr(S,{change:T,reason:P});const A=p.products.findIndex(O=>O.id===S);if(A>-1){const O=p.products[A].currentStock+T;p.products[A].currentStock=O,c.querySelector("#currentStockDisplay").textContent=O,c.querySelector("#productCurrentStock").value=O,$.value="",L.value="",g("Sucesso","Estoque atualizado!","success"),xa(),Xe()}}catch(A){g("Erro de Stock",A.message,"error")}}});const b=c.querySelectorAll(".tab-btn"),f=c.querySelectorAll(".tab-content");b.forEach(k=>{k.addEventListener("click",h=>{h.preventDefault(),b.forEach(y=>{y.classList.remove("border-indigo-500","text-indigo-600"),y.classList.add("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300")}),k.classList.add("border-indigo-500","text-indigo-600"),k.classList.remove("border-transparent","text-gray-500","hover:text-gray-700","hover:border-gray-300"),f.forEach(y=>y.classList.add("hidden")),document.getElementById(`tab-content-${k.dataset.tab}`).classList.remove("hidden")})});const v=c.querySelector("#productPhotoInput");c.querySelector("#productPhotoButton").addEventListener("click",()=>v.click()),v.onchange=async()=>{const k=v.files[0];if(!k)return;const h=c.querySelector("#productPhotoPreview"),y=c.querySelector("#productPhotoBase64");h.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const S=await Ra(k,800,800,"image/jpeg",.8),L=S.length*3/4,B=1e3*1024;if(L>B)throw new Error("A imagem é muito grande mesmo após a compressão.");h.src=S,y.value=S}catch(S){console.error("Erro ao processar imagem:",S),g("Erro de Imagem",S.message||"Não foi possível processar a imagem.","error"),h.src=l,y.value=u,v.value=""}},c.style.display="flex"}function hn(){const e=document.getElementById("products-content-container");e.innerHTML=`
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
    `;const t=document.getElementById("productCategoryFilter");t&&(t.innerHTML='<option value="all">Todas as categorias</option>',(p.categories||[]).forEach(a=>t.innerHTML+=`<option value="${a.id}">${a.name}</option>`)),xa(),Xe()}function yn(){const e=document.getElementById("products-content-container"),t=new Date().toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-30);const o=a.toISOString().split("T")[0];e.innerHTML=`
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
        </div>`;const r=document.getElementById("productFilterReport"),s=document.getElementById("categoryFilterReport");r&&p.products&&(r.innerHTML+=p.products.map(n=>`<option value="${n.id}">${n.name}</option>`).join("")),s&&p.categories&&(s.innerHTML+=p.categories.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""))}async function xn(){const e=document.getElementById("report-results");e.innerHTML='<div class="loader mx-auto my-8"></div>';const t={startDate:document.getElementById("reportStartDate").value,endDate:document.getElementById("reportEndDate").value,productId:document.getElementById("productFilterReport").value,categoryId:document.getElementById("categoryFilterReport").value};try{const a=await kr(t);if(a.length===0){e.innerHTML=`
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
            </div>`;e.innerHTML=o+r}catch(a){g("Erro",`Não foi possível gerar o relatório: ${a.message}`,"error"),e.innerHTML=`<div class="bg-white border border-red-200 rounded-lg p-8 text-center text-red-500">${a.message}</div>`}}function xa(){const e={ok:0,near_min:0,at_min:0,empty:0};if(!p.products)return;p.products.forEach(s=>{if(!s)return;const n=s.currentStock,i=s.minStock;n<=0?e.empty++:i>0&&n<=i?e.at_min++:i>0&&n<=i*1.2?e.near_min++:e.ok++});const t=document.getElementById("indicator-ok"),a=document.getElementById("indicator-near-min"),o=document.getElementById("indicator-at-min"),r=document.getElementById("indicator-empty");t&&(t.textContent=e.ok),a&&(a.textContent=e.near_min),o&&(o.textContent=e.at_min),r&&(r.textContent=e.empty)}function Xe(){const e=document.getElementById("productsList");if(!e)return;const t=document.getElementById("productSearchInput")?.value.toLowerCase()||"",a=document.getElementById("productCategoryFilter")?.value||"all",o=new Map((p.categories||[]).map(s=>[s.id,s.name]));let r=(p.products||[]).filter(Boolean);Z!=="all"&&(r=r.filter(s=>{const n=s.currentStock,i=s.minStock;switch(Z){case"ok":return n>0&&(i===0||n>i*1.2);case"near_min":return i>0&&n>i&&n<=i*1.2;case"at_min":return i>0&&n>0&&n<=i;case"empty":return n<=0;default:return!0}})),r=r.filter(s=>{const n=s.name.toLowerCase().includes(t),i=a==="all"||s.categoryId===a;return n&&i}),e.innerHTML="",r.length>0?(e.className="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 sm:space-y-0",r.forEach(s=>{const n=document.createElement("div"),i=JSON.stringify(s).replace(/'/g,"&apos;");n.className=`product-card bg-white rounded-lg shadow-md flex items-center gap-3 p-3 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 
                              sm:flex-col sm:p-0 sm:items-stretch sm:gap-0`,n.dataset.action="edit-product",n.dataset.product=i;const d=s.photo||`https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(s.name.charAt(0))}`,l=o.get(s.categoryId)||"N/A";let u="",c="text-gray-500";const m=s.currentStock,b=s.minStock;m<=0?(u='<span class="text-xs font-semibold text-red-600">Esgotado</span>',c="text-red-600 font-semibold"):b>0&&m<=b?(u='<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>',c="text-orange-600 font-semibold"):b>0&&m<=b*1.2?(u='<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>',c="text-blue-600 font-semibold"):(u='<span class="text-xs font-semibold text-green-600">Em Estoque</span>',c="text-green-600 font-semibold"),n.innerHTML=`
                <img src="${d}" alt="Imagem de ${s.name}" class="w-16 h-16 rounded-md object-cover flex-shrink-0 sm:w-full sm:h-24 sm:rounded-b-none">
                
                <div class="flex-1 sm:p-3 sm:flex sm:flex-col sm:flex-grow">
                    <div class="sm:flex-grow">
                        <div class="flex justify-between items-start mb-1 gap-2">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${s.name}</h3>
                            <div class="hidden sm:block">${u}</div>
                        </div>
                        
                        <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${s.price.toFixed(2)}</p>
                        
                        <p class="text-xs text-gray-500 text-left mb-2 hidden sm:block">Categoria: ${l}</p>
                    </div>

                    <div class="flex justify-between items-center mt-2 sm:mt-0">
                        <p class="text-lg font-bold text-indigo-600 text-left sm:hidden">R$ ${s.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-right sm:text-left">
                            Estoque: <span class="font-bold text-base ${c}">${s.currentStock}</span>
                        </p>
                    </div>
                </div>`,e.appendChild(n)})):(e.className="",e.innerHTML='<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>')}async function ot(){const e=document.getElementById("products-content-container");e&&(e.innerHTML='<div class="loader col-span-full mx-auto my-8"></div>');try{const[t,a,o]=await Promise.all([Tt(p.establishmentId),Dt(p.establishmentId,"products"),ha()]);p.products=(t||[]).filter(Boolean),p.categories=(a||[]).filter(Boolean),p.suppliers=(o||[]).filter(Boolean),Bo(je)}catch(t){e&&(e.innerHTML=`<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados: ${t.message}</p>`)}}function Bo(e){if(document.getElementById("products-content-container")){if(je===e&&document.getElementById("products-content-container").children.length>1){je==="products"&&(xa(),Xe());return}je=e,Z="all",document.querySelectorAll("#products-tabs button.tab-button").forEach(t=>{const a=t.dataset.view===e;t.classList.toggle("border-indigo-500",a),t.classList.toggle("text-indigo-600",a),t.classList.toggle("border-transparent",!a),t.classList.toggle("text-gray-500",!a)}),e==="products"?hn():e==="movements"&&yn()}}async function wn(){ce.innerHTML=`
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
        </section>`,ne&&(ce.removeEventListener("click",ne),ce.removeEventListener("input",ne),ce.removeEventListener("change",ne)),ne=async e=>{const t=e.target;if(t.id==="productSearchInput"||t.id==="productCategoryFilter"){Xe();return}const a=e.target.closest("button[data-action], button[data-view], .indicator-card[data-action], .product-card[data-action]");if(!a||e.target.closest('[data-action-stop-propagation="true"]'))return;if(a.hasAttribute("data-view")){Bo(a.dataset.view);return}switch(a.dataset.action){case"new-product":Ha();break;case"edit-product":Ha(JSON.parse(a.dataset.product));break;case"manage-product-categories":bn();break;case"generate-report":await xn();break;case"filter-stock":const r=a.dataset.filterType;Z=Z===r?"all":r,document.querySelectorAll(".indicator-card").forEach(s=>{s.classList.toggle("ring-2",s.dataset.filterType===Z),s.classList.toggle("ring-indigo-500",s.dataset.filterType===Z),s.classList.toggle("shadow-lg",s.dataset.filterType===Z)}),Xe();break}},ce.addEventListener("click",ne),ce.addEventListener("input",ne),ce.addEventListener("change",ne),je="products",Z="all",await ot()}const ue=document.getElementById("content");let ie=null,ft="list",D={step:1,productsToBuy:[],allSuppliers:[],finalOrders:{},isQuoteMode:!1};async function kn(){ft==="list"?wa():ft==="purchases"?(D.step=1,Oe()):ft==="history"&&Cn()}async function En(){try{const e=await ha();return p.suppliers=e||[],D.allSuppliers=e,!0}catch(e){return console.error(e),!1}}async function Sn(e){if(await M("Excluir Fornecedor","Tem a certeza? Isso removerá o vínculo com os produtos."))try{await cn(e),g("Sucesso","Fornecedor excluído.","success"),wa()}catch(t){g("Erro","Erro ao excluir: "+t.message,"error")}}async function $n(e){e.preventDefault();const t=e.target,a=t.querySelector("#supId").value,o={name:t.querySelector("#supName").value,contactName:t.querySelector("#supContact").value,email:t.querySelector("#supEmail").value,phone:t.querySelector("#supPhone").value,taxId:t.querySelector("#supTaxId").value};try{a?(await dn(a,o),g("Sucesso","Fornecedor atualizado!","success")):(await ln(o),g("Sucesso","Fornecedor criado!","success")),ds("genericModal"),wa()}catch(r){g("Erro","Erro ao salvar: "+r.message,"error")}}async function wa(){const e=document.getElementById("suppliersList");if(!e)return;e.innerHTML='<div class="loader mx-auto my-8"></div>',await En();const t=document.getElementById("supplierSearchInput")?.value.toLowerCase()||"",a=p.suppliers.filter(o=>o.name.toLowerCase().includes(t)||o.contactName&&o.contactName.toLowerCase().includes(t));if(e.innerHTML="",a.length===0){e.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum fornecedor encontrado.</div>';return}e.className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",a.forEach(o=>{const r=document.createElement("div");r.className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow";const s=JSON.stringify(o).replace(/"/g,"&quot;");r.innerHTML=`
            <div>
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-gray-800 text-lg">${o.name}</h3>
                    <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Fornecedor</span>
                </div>
                <div class="space-y-1 text-sm text-gray-600 mb-4">
                    <p class="flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> ${o.contactName||"Sem contato"}</p>
                    <p class="flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> ${o.phone||"-"}</p>
                    <p class="flex items-center gap-2 truncate"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> ${o.email||"-"}</p>
                </div>
            </div>
            <div class="flex justify-end gap-2 border-t pt-3 mt-2">
                <button data-action="edit" data-supplier="${s}" class="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded text-sm font-medium">Editar</button>
                <button data-action="delete" data-id="${o.id}" class="text-red-600 hover:bg-red-50 px-3 py-1 rounded text-sm font-medium">Excluir</button>
            </div>
        `,e.appendChild(r)})}async function Oe(){const e=document.getElementById("purchasesContainer");if(e)if(D.step===1){e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const[t,a]=await Promise.all([Tt(p.establishmentId),ha()]);D.allSuppliers=a||[];const o=t.filter(n=>{const i=parseInt(n.currentStock||0),d=parseInt(n.minStock||0),l=n.supplierIds&&Array.isArray(n.supplierIds)&&n.supplierIds.length>0;return i<=d&&l});if(D.productsToBuy=o,o.length===0){e.innerHTML=`
                    <div class="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div class="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800">Tudo em ordem!</h3>
                        <p class="text-gray-600">Nenhum produto está abaixo do estoque mínimo com fornecedor vinculado.</p>
                        <button class="mt-4 text-indigo-600 hover:underline text-sm" onclick="window.location.reload()">Atualizar Dados</button>
                    </div>
                `;return}let r=o.map(n=>{const i=parseInt(n.minStock),d=parseInt(n.currentStock),l=i-d+5,u=parseFloat(n.costPrice||0);let c="";return n.supplierIds&&n.supplierIds.length>0?n.supplierIds.forEach((m,b)=>{const f=D.allSuppliers.find(v=>v.id===m);if(f){const v=b===0?"selected":"";c+=`<option value="${f.id}" ${v}>${f.name}</option>`}}):c='<option value="">Sem fornecedor</option>',`
                    <tr class="hover:bg-gray-50 border-b border-gray-100 product-row" data-product-id="${n.id}" data-cost="${u}">
                        <td class="p-3 pl-4 text-center">
                            <input type="checkbox" class="row-select w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" checked>
                        </td>
                        <td class="p-3 font-medium text-gray-800">${n.name}</td>
                        <td class="p-3 text-center text-xs text-gray-500">
                            <span class="bg-red-100 text-red-700 px-2 py-1 rounded">${d}</span> / ${i}
                        </td>
                        <td class="p-3 text-center font-bold text-indigo-600">
                            <input type="number" class="qty-input w-16 p-1 border rounded text-center" value="${l}" min="1">
                        </td>
                        <td class="p-3 text-right text-sm text-gray-600">R$ ${u.toFixed(2)}</td>
                        <td class="p-3 text-right text-sm font-bold text-gray-800 row-subtotal">R$ ${(l*u).toFixed(2)}</td>
                        <td class="p-3">
                            <select class="supplier-select w-full p-2 border rounded-md bg-white text-sm">
                                ${c}
                            </select>
                        </td>
                    </tr>
                `}).join("");const s=D.isQuoteMode?"flex":"hidden";e.innerHTML=`
                <div class="space-y-4 animate-fade-in">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-center">
                            <div class="flex items-center gap-3">
                                <input type="checkbox" id="toggle-quote-mode" class="w-4 h-4 text-indigo-600 rounded" ${D.isQuoteMode?"checked":""}>
                                <label for="toggle-quote-mode" class="text-sm font-medium text-gray-700 cursor-pointer select-none">
                                    Realizar Cotação Prévia?
                                </label>
                            </div>
                            <p class="text-xs text-gray-500 mt-1 ml-7">Se marcado, permite gerar PDF de cotação antes do pedido.</p>
                        </div>

                        <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100 shadow-sm flex items-center justify-between">
                            <div>
                                <h3 class="font-bold text-indigo-900">Impacto no Caixa</h3>
                                <p class="text-xs text-indigo-600">Custo estimado dos itens selecionados</p>
                            </div>
                            <div class="text-right">
                                <p id="total-purchase-cost" class="text-2xl font-bold text-indigo-700">R$ 0,00</p>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end gap-2">
                        <button id="btn-generate-quotes" class="${s} items-center gap-2 bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 font-medium text-sm transition-all shadow-sm">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Gerar PDFs de Cotação
                        </button>

                        <button id="btn-go-to-orders" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium text-sm transition-colors flex items-center gap-2 shadow-sm">
                            Gerar Pedidos de Compra
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </button>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        <table class="w-full text-left">
                            <thead class="bg-gray-50 text-gray-500 font-semibold text-xs uppercase border-b border-gray-200">
                                <tr>
                                    <th class="p-3 pl-4 w-10 text-center"><input type="checkbox" id="check-all-rows" checked></th>
                                    <th class="p-3">Produto</th>
                                    <th class="p-3 text-center">Estoque</th>
                                    <th class="p-3 text-center">Qtd.</th>
                                    <th class="p-3 text-right">Custo Unit.</th>
                                    <th class="p-3 text-right">Subtotal</th>
                                    <th class="p-3">Fornecedor</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100" id="purchase-table-body">${r}</tbody>
                        </table>
                    </div>
                </div>
            `,Kt()}catch(t){console.error(t),e.innerHTML='<p class="text-red-500 text-center">Erro ao calcular compras.</p>'}}else D.step===2&&In(e)}function In(e){if(!D.finalOrders||Object.keys(D.finalOrders).length===0){D.step=1,Oe();return}let t="",a=0;for(const[o,r]of Object.entries(D.finalOrders)){let s=0,n=r.items.map(d=>{const l=d.qty*d.cost;return s+=l,`
            <tr class="border-b last:border-0 border-gray-100">
                <td class="p-2 pl-4 text-sm text-gray-800">${d.name}</td>
                <td class="p-2 text-right text-sm text-gray-600">${d.qty} un. x R$ ${d.cost.toFixed(2)}</td>
                <td class="p-2 pr-4 text-right text-sm font-bold text-indigo-600">R$ ${l.toFixed(2)}</td>
            </tr>
        `}).join("");a+=s;const i=encodeURIComponent(JSON.stringify({supplierId:o,supplierName:r.info.name,totalAmount:s,items:r.items}));t+=`
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm supplier-order-card" data-supplier-name="${r.info.name}">
                <div class="bg-gray-50 p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                        <h4 class="font-bold text-gray-800 text-lg">${r.info.name}</h4>
                        <div class="text-xs text-gray-500 flex gap-4 mt-1">
                            <span>${r.info.email||"Sem email"}</span>
                            <span>${r.info.phone||"Sem telefone"}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-gray-500 uppercase">Valor do Pedido</p>
                        <p class="font-bold text-lg text-indigo-700">R$ ${s.toFixed(2)}</p>
                    </div>
                </div>
                <table class="w-full text-left">
                    <tbody class="divide-y divide-gray-50">${n}</tbody>
                </table>
                <div class="p-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
                    <button class="btn-register-order bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 text-sm flex items-center gap-2" data-order="${i}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                        Registrar Compra
                    </button>
                    <button class="btn-print-order bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 text-sm flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Imprimir
                    </button>
                </div>
            </div>
        `}e.innerHTML=`
        <div class="space-y-4 animate-fade-in">
            <div class="flex flex-col sm:flex-row justify-between items-center gap-4 bg-green-50 p-4 rounded-lg border border-green-100">
                <div>
                    <h3 class="font-bold text-green-800 text-lg">Etapa 2: Pedidos Prontos</h3>
                    <p class="text-sm text-green-600">Valor Total de Compras: <strong>R$ ${a.toFixed(2)}</strong></p>
                </div>
                <button id="btn-back-step1" class="text-gray-600 hover:text-gray-900 text-sm font-medium underline">
                    Voltar / Corrigir
                </button>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                ${t}
            </div>
        </div>
    `}async function Cn(){const e=document.getElementById("historyContainer");if(e){e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const t=await mn(p.establishmentId);if(t.length===0){e.innerHTML='<div class="text-center text-gray-500 py-8">Nenhum histórico de compras encontrado.</div>';return}const a=t.map(o=>`
            <tr class="hover:bg-gray-50 border-b border-gray-100">
                <td class="p-3 text-sm text-gray-600">${new Date(o.createdAt.seconds*1e3).toLocaleDateString("pt-BR")}</td>
                <td class="p-3 font-medium text-gray-800">${o.supplierName}</td>
                <td class="p-3 text-sm text-gray-600">${o.items.length} itens</td>
                <td class="p-3 text-right font-bold text-indigo-600">R$ ${parseFloat(o.totalAmount).toFixed(2)}</td>
                <td class="p-3 text-right">
                    <button class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 btn-view-purchase" data-purchase='${JSON.stringify(o)}'>
                        Ver Detalhes
                    </button>
                </td>
            </tr>
        `).join("");e.innerHTML=`
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <table class="w-full text-left">
                    <thead class="bg-gray-50 text-gray-500 font-semibold text-xs uppercase border-b border-gray-200">
                        <tr>
                            <th class="p-3 pl-4">Data</th>
                            <th class="p-3">Fornecedor</th>
                            <th class="p-3">Qtd. Itens</th>
                            <th class="p-3 text-right">Total</th>
                            <th class="p-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">${a}</tbody>
                </table>
            </div>
        `}catch(t){console.error(t),e.innerHTML='<p class="text-red-500 text-center">Erro ao carregar histórico.</p>'}}}function Ln(e){const t=new Date(e.createdAt.seconds*1e3).toLocaleString("pt-BR"),a=e.items.map(r=>`
        <li class="flex justify-between py-2 border-b border-gray-100 last:border-0">
            <div>
                <p class="font-medium text-sm text-gray-800">${r.name}</p>
                <p class="text-xs text-gray-500">${r.qty} un. x R$ ${parseFloat(r.cost).toFixed(2)}</p>
            </div>
            <p class="text-sm font-bold text-gray-700">R$ ${(r.qty*r.cost).toFixed(2)}</p>
        </li>
    `).join(""),o=`
        <div class="space-y-4">
            <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <div>
                    <p class="text-xs text-gray-500">Fornecedor</p>
                    <p class="font-bold text-gray-800">${e.supplierName}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs text-gray-500">Data</p>
                    <p class="font-medium text-gray-800">${t}</p>
                </div>
            </div>
            
            <div class="border rounded-lg p-3">
                <h4 class="text-sm font-semibold text-gray-600 mb-2 border-b pb-1">Itens Comprados</h4>
                <ul class="max-h-60 overflow-y-auto">${a}</ul>
            </div>

            <div class="flex justify-between items-center pt-2">
                <p class="text-sm text-gray-600">Total Pago:</p>
                <p class="text-xl font-bold text-green-600">R$ ${parseFloat(e.totalAmount).toFixed(2)}</p>
            </div>
        </div>
    `;H({title:"Detalhes da Compra",contentHTML:o,maxWidth:"max-w-md"})}function Kt(){const e=document.querySelectorAll(".product-row");let t=0;e.forEach(o=>{const r=o.querySelector(".row-select"),s=o.querySelector(".qty-input"),n=o.querySelector(".row-subtotal"),i=parseFloat(o.dataset.cost||0),d=parseInt(s.value||0);if(r.checked){const l=i*d;t+=l,n.textContent=`R$ ${l.toFixed(2)}`,o.classList.remove("opacity-50","bg-gray-50")}else o.classList.add("opacity-50","bg-gray-50")});const a=document.getElementById("total-purchase-cost");a&&(a.textContent=`R$ ${t.toFixed(2).replace(".",",")}`)}async function ja(e,t,a,o=!1){if(!window.jspdf){alert("Erro: Biblioteca PDF não carregada.");return}const{jsPDF:r}=window.jspdf,s=new r,n=new Date().toLocaleDateString("pt-BR");s.setFontSize(18),s.text(e,14,20),s.setFontSize(10),s.setTextColor(100),s.text(`Data: ${n}`,14,28),s.setTextColor(0),s.setFontSize(12),s.text(`Destinatário: ${t}`,14,38),o&&(s.setFontSize(10),s.text("Por favor, enviem a vossa melhor cotação para os itens abaixo.",14,45));const i=a.map(l=>[l.name,l.qty.toString()]);s.autoTable({startY:o?50:45,head:[["Produto","Quantidade Solicitada"]],body:i,theme:"striped",headStyles:{fillColor:o?[100,116,139]:[22,163,74]},styles:{fontSize:10,cellPadding:3}});const d=`${o?"Cotacao":"Pedido"}_${t.replace(/\s+/g,"_")}_${n.replace(/\//g,"-")}.pdf`;s.save(d),g("Sucesso","PDF gerado!","success")}function Oa(e=null){const t=`
        <form id="supplierForm" class="space-y-4">
            <input type="hidden" id="supId" value="${e?.id||""}">
            <div><label class="block text-sm font-medium text-gray-700">Nome da Empresa *</label><input type="text" id="supName" value="${e?.name||""}" required class="w-full p-2 border rounded mt-1"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-gray-700">Nome Contato</label><input type="text" id="supContact" value="${e?.contactName||""}" class="w-full p-2 border rounded mt-1"></div>
                <div><label class="block text-sm font-medium text-gray-700">Telefone</label><input type="text" id="supPhone" value="${e?.phone||""}" class="w-full p-2 border rounded mt-1"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-gray-700">Email</label><input type="email" id="supEmail" value="${e?.email||""}" class="w-full p-2 border rounded mt-1"></div>
                <div><label class="block text-sm font-medium text-gray-700">CNPJ / NIF</label><input type="text" id="supTaxId" value="${e?.taxId||""}" class="w-full p-2 border rounded mt-1"></div>
            </div>
            <div class="flex justify-end gap-3 pt-4">
                <button type="button" onclick="document.getElementById('genericModal').style.display='none'" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancelar</button>
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Salvar</button>
            </div>
        </form>
    `;H({title:e?"Editar Fornecedor":"Novo Fornecedor",contentHTML:t,maxWidth:"max-w-lg"}),setTimeout(()=>{document.getElementById("supplierForm").addEventListener("submit",$n)},50)}function Bn(){ue.innerHTML=`
        <section class="p-4 sm:p-6 pb-24">
            <div class="bg-white rounded-lg shadow-md">
                <div class="border-b border-gray-200 flex justify-between items-center px-4 sm:px-6 overflow-x-auto">
                    <nav class="-mb-px flex space-x-6" aria-label="Tabs">
                        <button id="tab-btn-list" class="tab-btn whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">Lista de Fornecedores</button>
                        <button id="tab-btn-purchases" class="tab-btn whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Gestão de Compras</button>
                        <button id="tab-btn-history" class="tab-btn whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Histórico</button>
                    </nav>
                    <button id="btn-new-supplier" class="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 text-sm flex items-center justify-center gap-2 my-2 flex-shrink-0">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> <span class="hidden sm:inline">Novo</span>
                    </button>
                </div>
                <div class="p-4 sm:p-6">
                    <div id="tab-content-list" class="block">
                        <div class="mb-4"><input type="text" id="supplierSearchInput" placeholder="Pesquisar fornecedor..." class="border rounded-md p-2 text-sm w-full sm:w-64"></div>
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
    `,ie&&(ue.removeEventListener("click",ie),ue.removeEventListener("input",ie),ue.removeEventListener("change",ie)),ie=e=>{e.target.closest("#tab-btn-list")&&it("list"),e.target.closest("#tab-btn-purchases")&&it("purchases"),e.target.closest("#tab-btn-history")&&it("history"),e.target.id==="toggle-quote-mode"&&(D.isQuoteMode=e.target.checked,Oe()),e.target.id==="supplierSearchInput"&&renderSuppliersList(),e.target.closest("#btn-new-supplier")&&Oa();const t=e.target.closest("button[data-action]");if(t){const a=t.dataset.action;a==="delete"&&Sn(t.dataset.id),a==="edit"&&Oa(JSON.parse(t.dataset.supplier))}if((e.target.classList.contains("qty-input")||e.target.classList.contains("row-select"))&&Kt(),e.target.id==="check-all-rows"){const a=e.target.checked;document.querySelectorAll(".row-select").forEach(o=>o.checked=a),Kt()}if(e.target.closest("#btn-generate-quotes")){const a=document.querySelectorAll(".product-row"),o={};if(a.forEach(r=>{if(!r.querySelector(".row-select").checked)return;const n=r.querySelector("td:nth-child(2)").innerText,i=r.querySelector(".qty-input").value,d=r.querySelector(".supplier-select");Array.from(d.options).forEach(l=>{if(l.value){if(!o[l.value]){const u=D.allSuppliers.find(c=>c.id===l.value);o[l.value]={name:u.name,items:[]}}o[l.value].items.push({name:n,qty:i})}})}),Object.keys(o).length===0){g("Erro","Nenhum item selecionado para cotação.","error");return}Object.values(o).forEach(r=>{ja("Solicitação de Cotação",r.name,r.items,!0)})}if(e.target.closest("#btn-go-to-orders")){const a=document.querySelectorAll(".product-row"),o={};let r=!1;if(a.forEach(s=>{if(!s.querySelector(".row-select").checked)return;r=!0;const i=s.querySelector("td:nth-child(2)").innerText,d=s.querySelector(".qty-input").value,l=parseFloat(s.dataset.cost),c=s.querySelector(".supplier-select").value;if(c){if(!o[c]){const m=D.allSuppliers.find(b=>b.id===c);o[c]={info:m,items:[]}}o[c].items.push({name:i,qty:d,cost:l})}}),!r){g("Atenção","Selecione pelo menos um item para gerar o pedido.","error");return}D.finalOrders=o,D.step=2,Oe()}if(e.target.closest("#btn-back-step1")&&(D.step=1,Oe()),e.target.closest(".btn-register-order")){const a=e.target.closest(".btn-register-order"),o=JSON.parse(decodeURIComponent(a.dataset.order));o.establishmentId=p.establishmentId,un(o).then(()=>{g("Sucesso","Compra registrada no histórico!","success"),a.disabled=!0,a.textContent="Registrado ✓",a.classList.replace("bg-blue-600","bg-gray-400"),a.classList.replace("hover:bg-blue-700","hover:bg-gray-400")}).catch(r=>{g("Erro","Falha ao registrar compra: "+r.message,"error")})}if(e.target.closest(".btn-print-order")){const a=e.target.closest(".supplier-order-card"),o=a.dataset.supplierName,r=[];a.querySelectorAll("tbody tr").forEach(s=>{const n=s.children[0].innerText,i=s.children[1].innerText.split(" un.")[0];r.push({name:n,qty:i})}),ja("Pedido de Compra",o,r,!1)}if(e.target.closest(".btn-view-purchase")){const a=e.target.closest(".btn-view-purchase"),o=JSON.parse(a.dataset.purchase);Ln(o)}},ue.addEventListener("click",ie),ue.addEventListener("input",ie),ue.addEventListener("change",ie),it("list")}function it(e){ft=e,["list","purchases","history"].forEach(a=>{const o=document.getElementById(`tab-btn-${a}`),r=document.getElementById(`tab-content-${a}`);a===e?(o.classList.add("border-indigo-500","text-indigo-600"),o.classList.remove("border-transparent","text-gray-500"),r.classList.remove("hidden")):(o.classList.remove("border-indigo-500","text-indigo-600"),o.classList.add("border-transparent","text-gray-500"),r.classList.add("hidden"))});const t=document.getElementById("btn-new-supplier");e==="list"?t.classList.remove("hidden"):t.classList.add("hidden"),kn()}const Nt=document.getElementById("content"),za={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"};let ae=new Set,lt=null,Ee=null;function Tn(e=8){let t="";for(let a=0;a<e;a++)t+=`
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;return t}function Mn(e){return e.length===0?'<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>':e.map(t=>{const a=t.status==="inactive",o=t.photo||`https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(t.name?t.name.charAt(0):"P")}`,r=JSON.stringify(t).replace(/'/g,"&apos;");return`
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
            </div>`}).join("")}function Ft(){const e=document.getElementById("genericModal");e.style.display="none",Ee&&e.removeEventListener("click",Ee)}async function Dn(e){const t=document.getElementById("genericModal"),a=e.id?e:{name:"Novo Profissional",specialty:"",status:"active",workingHours:{},services:[]},o=p.services||await Pe(p.establishmentId),r=p.professionals||await G(p.establishmentId),s=`
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
        </div>`;t.innerHTML=s,t.style.display="flex",Pn(a,o),qn(a),Nn(a,r),Rn(a)}function Pn(e,t){const a=document.getElementById("professionalForm"),o=e.dob?e.dob.split("/"):["",""],r=Array.from({length:12},(m,b)=>{const f=b+1,v=f==o[1]?"selected":"",k=new Date(0,b).toLocaleString("pt-BR",{month:"long"});return`<option value="${f}" ${v}>${k.charAt(0).toUpperCase()+k.slice(1)}</option>`}).join(""),s=e.status||"active";a.innerHTML=`
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
        <div class="form-group"><label for="profNotes">Observações</label><textarea id="profNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${e.notes||""}</textarea></div>`;const n=document.getElementById("profPhotoInput"),i=document.getElementById("profPhotoButton"),d=document.getElementById("profPhotoPreview"),l=document.getElementById("profPhotoBase64"),u=e.photo||`https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(e.name?e.name.charAt(0):"P")}`,c=e.photo||"";i&&i.addEventListener("click",()=>n.click()),n&&(n.onchange=async()=>{const m=n.files[0];if(m){d.src="https://placehold.co/128x128/E2E8F0/4A5568?text=...";try{const b=await An(m,800,800,"image/jpeg",.8);d.src=b,l.value=b}catch(b){g("Erro de Imagem",b.message||"Não foi possível processar a imagem.","error"),d.src=u,l.value=c,n.value=""}}})}function An(e,t=800,a=800,o="image/jpeg",r=.8){return new Promise((s,n)=>{if(!e.type.startsWith("image/"))return n(new Error("O ficheiro selecionado não é uma imagem."));const i=new FileReader;i.onload=d=>{const l=new Image;l.onload=()=>{let u=l.width,c=l.height;u>c?u>t&&(c*=t/u,u=t):c>a&&(u*=a/c,c=a);const m=document.createElement("canvas");m.width=u,m.height=c,m.getContext("2d").drawImage(l,0,0,u,c);const f=m.toDataURL(o,r);s(f)},l.onerror=u=>n(new Error("Não foi possível carregar a imagem.")),l.src=d.target.result},i.onerror=d=>n(new Error("Não foi possível ler o ficheiro.")),i.readAsDataURL(e)})}function qn(e){const t=document.getElementById("jornada");t.innerHTML='<div><h3 class="text-xl font-semibold mb-4">Jornada de Trabalho Semanal</h3><p class="text-sm text-gray-600 mb-4">Defina os horários de trabalho padrão para este profissional.</p><div id="profScheduleContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div></div>',Fn(t.querySelector("#profScheduleContainer"),e.workingHours||{})}async function Nn(e,t){const a=document.getElementById("bloqueios");a.innerHTML=`
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
        </div>`;const o=document.getElementById("batchBlockageForm");o&&o.addEventListener("submit",async s=>{s.preventDefault();const n=Array.from(s.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(b=>b.value);if(n.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const i=s.target.batchBlockageStartDate.value,d=s.target.batchBlockageEndDate.value||i,l=s.target.batchBlockageStartTime.value,u=s.target.batchBlockageEndTime.value,c=s.target.batchBlockageReason.value;if(!i||!l||!u)return g("Atenção","Preencha Data de Início, Início e Fim.","error");const m=n.map(b=>{const f={professionalId:b,establishmentId:p.establishmentId,startTime:new Date(`${i}T${l}`).toISOString(),endTime:new Date(`${d}T${u}`).toISOString(),reason:c};return Lt(f)});try{await Promise.all(m),g("Sucesso!",`${n.length} bloqueios foram criados.`);const b=document.getElementById("prof-blockages-filter").value;ze(e.id,b)}catch(b){g("Erro",b.message,"error")}}),document.getElementById("prof-blockages-filter").addEventListener("change",s=>ze(e.id,s.target.value)),await ze(e.id,"future")}function Fn(e,t){e.innerHTML=Object.keys(za).map(a=>{const o=t[a]||{},r=o.active!==!1;return`
            <div class="day-schedule-card p-3 rounded-lg ${r?"bg-white":"bg-gray-100 disabled"} border">
                 <div class="flex justify-between items-center"><span class="font-semibold text-gray-800">${za[a]}</span><label class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" data-day="${a}" data-field="active" class="sr-only" ${r?"checked":""}><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div></label></div>
                <div class="time-inputs grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><label>Início:</label><input type="time" data-day="${a}" data-field="start" value="${o.start||"09:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Fim:</label><input type="time" data-day="${a}" data-field="end" value="${o.end||"18:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Intervalo:</label><input type="time" data-day="${a}" data-field="breakStart" value="${o.breakStart||"12:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                    <div><label>Fim Int.:</label><input type="time" data-day="${a}" data-field="breakEnd" value="${o.breakEnd||"13:00"}" class="w-full p-1 border rounded" ${r?"":"disabled"}></div>
                </div>
            </div>`}).join(""),e.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(a=>{a.addEventListener("change",o=>{const r=o.target.closest(".day-schedule-card"),s=!o.target.checked;r.classList.toggle("bg-white",!s),r.classList.toggle("bg-gray-100",s),r.classList.toggle("disabled",s),r.querySelectorAll(".time-inputs input").forEach(n=>n.disabled=s)})})}async function ze(e,t="future"){const a=document.getElementById("blockagesList");if(a){a.innerHTML='<div class="loader mx-auto"></div>';try{const o=new Date;let r,s;t==="history"?(s=new Date,r=new Date,r.setFullYear(r.getFullYear()-2)):(r=new Date,s=new Date,s.setFullYear(s.getFullYear()+2));let i=(await Ct(p.establishmentId,r.toISOString(),s.toISOString(),e)).map(l=>({...l,startTime:new Date(l.startTime),endTime:new Date(l.endTime)}));t==="history"?i=i.filter(l=>l.endTime<o).sort((l,u)=>u.startTime-l.startTime):i=i.filter(l=>l.endTime>=o).sort((l,u)=>l.startTime-u.startTime);const d=i.reduce((l,u)=>{const c=u.reason||"Sem motivo";return l[c]||(l[c]=[]),l[c].push(u),l},{});if(Object.keys(d).length===0){a.innerHTML=`<p class="text-center text-gray-500 text-sm py-4">Nenhum bloqueio ${t==="history"?"no histórico":"futuro"}.</p>`;return}a.innerHTML=Object.entries(d).map(([l,u])=>`
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
        `).join("")}catch(o){a.innerHTML=`<p class="text-red-500">${o.message}</p>`}}}function Rn(e){const t=document.getElementById("genericModal");Ee&&t.removeEventListener("click",Ee),Ee=async a=>{const o=a.target.closest("button[data-action]");if(!o){const s=a.target.closest(".tab-link");s&&(t.querySelectorAll(".tab-link").forEach(n=>n.classList.remove("active")),s.classList.add("active"),t.querySelectorAll(".tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(s.dataset.tab).classList.remove("hidden"));return}const r=o.dataset.action;switch(a.stopPropagation(),r){case"close-modal":Ft();break;case"delete-professional":const s=o.dataset.id;if(await M("Excluir Profissional",`Tem certeza que deseja excluir ${e.name}? Esta ação não pode ser desfeita.`))try{await ks(s),g("Sucesso!","Profissional excluído.","success"),Ft(),Et()}catch(v){g("Erro",`Não foi possível excluir: ${v.message}`,"error")}break;case"save-professional":const i=document.getElementById("professionalForm"),d=o,l=document.getElementById("profScheduleContainer"),u=Array.from(i.querySelectorAll("#profServicesContainer input:checked")).map(v=>v.value),c={};l&&l.querySelectorAll(".day-schedule-card").forEach(v=>{const k=v.querySelector('[data-field="active"]').dataset.day;c[k]={active:v.querySelector('[data-field="active"]').checked,start:v.querySelector('[data-field="start"]').value,end:v.querySelector('[data-field="end"]').value,breakStart:v.querySelector('[data-field="breakStart"]').value,breakEnd:v.querySelector('[data-field="breakEnd"]').value}});const m={...e,id:i.querySelector("#professionalId").value||void 0,name:i.querySelector("#profName").value,specialty:i.querySelector("#profSpecialty").value,photo:i.querySelector("#profPhotoBase64").value,services:u,workingHours:c,phone:i.querySelector("#profPhone").value,dob:`${i.querySelector("#profDobDay").value}/${i.querySelector("#profDobMonth").value}`,receivesCommission:i.querySelector("#profCommission").value==="sim",showOnAgenda:i.querySelector("#profShowOnAgenda").value==="sim",orderOnAgenda:parseInt(i.querySelector("#profOrderOnAgenda").value)||1,notes:i.querySelector("#profNotes").value,status:i.querySelector("#profStatus").value};d.disabled=!0,d.textContent="A salvar...";try{m.id?(await ws(m.id,m),g("Sucesso!","Profissional atualizado.","success")):(delete m.id,await xs(m),g("Sucesso!","Profissional criado.","success")),Ft(),Et()}catch(v){g("Erro",v.message,"error"),d.disabled=!1,d.textContent="Salvar"}break;case"delete-blockage":const b=o.dataset.id;if(await M("Apagar Bloqueio","Tem certeza?"))try{await ua(b),g("Bloqueio removido.","success");const v=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";ze(e.id,v)}catch(v){g("Erro",v.message,"error")}break;case"batch-delete-blockage":const f=JSON.parse(o.dataset.ids);if(await M("Apagar em Lote",`Tem certeza que deseja apagar ${f.length} bloqueios com este motivo?`))try{await vo(f),g("Bloqueios removidos.","success");const v=document.getElementById("prof-blockages-filter")?document.getElementById("prof-blockages-filter").value:"future";ze(e.id,v)}catch(v){g("Erro",v.message,"error")}break}},t.addEventListener("click",Ee)}function ea(){const e=document.getElementById("batch-actions-container"),t=document.getElementById("selected-count");!e||!t||(ae.size>0?(t.textContent=`${ae.size} selecionado(s)`,e.classList.remove("hidden")):e.classList.add("hidden"))}function Hn(){M("Excluir em Lote",`Tem certeza que deseja excluir ${ae.size} profissionais? Esta ação não pode ser desfeita.`).then(async e=>{if(e)try{await(void 0)(Array.from(ae)),g("Sucesso!",`${ae.size} profissionais foram excluídos.`,"success"),ae.clear(),ea(),Et()}catch(t){g("Erro",`Não foi possível excluir em lote: ${t.message}`,"error")}})}function qe(){const e=document.getElementById("professionalsList");if(!e)return;if(!p.professionals){e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Tn();return}const t=document.getElementById("showInactiveProfToggle").checked,a=document.getElementById("profSearchInput").value.toLowerCase(),o=p.professionals.filter(r=>{const s=r.name.toLowerCase().includes(a),n=t||r.status!=="inactive";return s&&n});e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20",e.innerHTML=Mn(o)}async function Et(){ae.clear(),Nt.innerHTML=`
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
        </section>`,lt&&Nt.removeEventListener("click",lt),lt=t=>{const a=t.target.closest('[data-action="open-professional-modal"]'),o=t.target.closest('[data-action="batch-delete"]');if(a){t.preventDefault();let s={};if(a.dataset.professional)try{s=JSON.parse(a.dataset.professional)}catch(n){console.error("Erro ao fazer parse do professional data:",n);return}Dn(s);return}if(o){Hn();return}const r=t.target.closest(".professional-checkbox");if(r){const s=r.dataset.id;r.checked?ae.add(s):ae.delete(s),qe(),ea();return}},Nt.addEventListener("click",lt),document.getElementById("profSearchInput").addEventListener("input",qe),document.getElementById("showInactiveProfToggle").addEventListener("change",qe);const e=document.getElementById("professionalsList");p.professionals=null,p.services=null,qe();try{const[t,a]=await Promise.all([G(p.establishmentId),Pe(p.establishmentId)]);p.professionals=t,p.services=a,qe(),ea()}catch{e.innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar dados da página.</p>'}}const Rt=document.getElementById("content");let ee=[],Ve={},F=null,ta="list",_="all",aa="O Estabelecimento";const jn=(e,t)=>`Olá, ${e}! Nós da ${t} desejamos a você um Feliz Aniversário! Esperamos que seu dia seja maravilhoso. Venha comemorar conosco! 🎉🎂`,On=(e,t)=>`Oi, ${e}! Faz um tempo que não te vemos aqui no(a) ${t}. Sentimos sua falta! Temos novidades/ofertas especiais para você. Que tal agendar seu horário?`,zn=[{value:30,label:"30 dias"},{value:60,label:"60 dias"},{value:90,label:"90 dias"},{value:120,label:"120 dias"}];function Vn(){return Math.floor(Math.random()*140)+10}function Un(e){if(!e.dob)return!1;const t=e.dob.split("/");if(t.length!==2)return!1;const a=new Date,o=a.getDate(),r=a.getMonth()+1,s=parseInt(t[0],10),n=parseInt(t[1],10);return s===o&&n===r}const _n=[{value:99,label:"Aniversariantes de Hoje"},{value:0,label:"Todos os meses (com DOB)"},{value:1,label:"Janeiro"},{value:2,label:"Fevereiro"},{value:3,label:"Março"},{value:4,label:"Abril"},{value:5,label:"Maio"},{value:6,label:"Junho"},{value:7,label:"Julho"},{value:8,label:"Agosto"},{value:9,label:"Setembro"},{value:10,label:"Outubro"},{value:11,label:"Novembro"},{value:12,label:"Dezembro"}];function Va(){return _n.map(e=>{let t="";return e.value===99&&(t="selected"),`<option value="${e.value}" ${t}>${e.label}</option>`}).join("")}function Ua(){return zn.map(e=>{const t=e.value===90?"selected":"";return`<option value="${e.value}" ${t}>${e.label}</option>`}).join("")}function Jn(e,t){const a=`w-5 h-5 ${t} mr-2`;switch(e){case"cadastro":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`;case"agendamentos":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`;case"historico":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2h-2.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-1.414 0l-1.414-1.414A1 1 0 009.586 17H7a2 2 0 01-2-2v-2a2 2 0 012-2h12z" /></svg>`;case"fidelidade":return`<svg xmlns="http://www.w3.org/2000/svg" class="${a}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.5a9.5 9.5 0 1019 0 9.5 9.5 0 00-19 0z" /></svg>`;default:return""}}function Wn(e="cadastro"){const t=[{id:"cadastro",label:"Cadastro"},{id:"agendamentos",label:"Próximos Agend."},{id:"historico",label:"Histórico"},{id:"fidelidade",label:"Fidelidade"}],a=document.getElementById("client-detail-tabs");a&&(a.innerHTML=t.map(o=>{const r=e===o.id,s=r?"text-indigo-600":"text-gray-500";return`
            <button data-tab="${o.id}" class="tab-btn whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors flex items-center ${r?"border-indigo-500 text-indigo-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}">
                ${Jn(o.id,s)}
                ${o.label}
            </button>
        `}).join(""),a.querySelectorAll(".tab-btn").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),oa(o.dataset.tab)})}))}async function oa(e){Wn(e);const t=document.getElementById("client-detail-content");if(t)switch(t.innerHTML='<form id="client-form" class="p-6 space-y-4"><div class="loader mx-auto my-8"></div></form>',e){case"cadastro":t.innerHTML=Gn(F);break;case"agendamentos":case"historico":try{const o=await _s(p.establishmentId,F.name,F.phone);t.innerHTML=Yn(o,e)}catch(o){console.error("Erro ao carregar histórico do cliente:",o),t.innerHTML=`<form id="client-form" class="p-6 space-y-4"><p class="text-center text-red-500">Erro ao carregar o histórico: ${o.message}</p></form>`}break;case"fidelidade":const a=await Js(p.establishmentId,F.name,F.phone);t.innerHTML=Xn(F,a);break;default:t.innerHTML='<form id="client-form" class="p-6 space-y-4"><p class="p-4 text-center text-gray-500">Secção não implementada.</p></form>'}}function Gn(e){const t=e?.dob?e.dob.split("/"):["",""];return`
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
    `}function Yn(e,t){const a=t==="agendamentos"?"Próximos Agendamentos":"Histórico de Visitas",o=t==="agendamentos"?"Nenhum agendamento futuro.":"Nenhum histórico de visitas.",r=new Date;r.setHours(0,0,0,0);const s=t==="agendamentos",n=(e||[]).filter(i=>{const d=new Date(i.date);return s?d>=r:d<r});return n.sort((i,d)=>s?new Date(i.date).getTime()-new Date(d.date).getTime():new Date(d.date).getTime()-new Date(i.date).getTime()),n.length===0?`<form id="client-form" class="p-6 space-y-4"><p class="p-4 text-center text-gray-500">${o}</p></form>`:`
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
    `}function Xn(e,t){const a=e.loyaltyPoints||0;let o='<p class="text-sm text-gray-500">O programa de fidelidade não está ativo.</p>';Ve.enabled&&Ve.tiers&&(o=Ve.tiers.map(s=>{const n=a>=s.points;return`
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
    `}function sa(e){F=e,ta="detail";const t=e!==null,a=t?"Editar Cliente":"Adicionar Cliente",o=`
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
    `,r=window.innerWidth<768,s=r?"max-w-full":"max-w-3xl";if(H({title:a,contentHTML:o,maxWidth:s}),r){const u=document.getElementById("genericModal");if(u){const c=u.querySelector(`.${s.replace(":","\\:")}`);c&&(c.style.height="auto",c.style.maxHeight="85vh",c.style.borderRadius="1rem")}}const n=document.getElementById("genericModal");n&&n.addEventListener("click",async u=>{const c=u.target.closest("[data-action]");if(!c)return;switch(c.dataset.action){case"redeem-reward":{const b=parseInt(c.dataset.points,10),f=c.dataset.reward;if(await M("Confirmar Resgate",`Deseja resgatar "${f}" por ${b} pontos?`))try{await Ws(p.establishmentId,F.name,F.phone,{points:b,reward:f}),g("Prémio resgatado com sucesso!","success"),ee=await et(p.establishmentId);const h=ee.find(y=>y.id===F.id);h&&(F=h),oa("fidelidade")}catch(k){g(`Erro ao resgatar: ${k.message}`,"error")}break}case"open-comanda-from-history":{const b=c.dataset.appointmentId;b&&(document.getElementById("genericModal").style.display="none",R("comandas-section",{selectedAppointmentId:b,initialFilter:"finalizada"}));break}case"view-appointment":{const b=c.dataset.appointmentId,f=c.dataset.appointmentDate;b&&f&&(document.getElementById("genericModal").style.display="none",R("agenda-section",{targetDate:f,scrollToAppointmentId:b}));break}}}),oa("cadastro");const i=document.getElementById("client-form");i&&i.addEventListener("submit",u=>{u.preventDefault(),Qn()});const d=document.getElementById("cancelDetailViewBtn");d&&d.addEventListener("click",u=>{u.preventDefault(),document.getElementById("genericModal").style.display="none",At()});const l=document.getElementById("deleteClientBtn");l&&l.addEventListener("click",async()=>{await Zn()})}async function Qn(){const e=document.getElementById("client-form");if(!e)return;const t=e.querySelector("#clientId").value,a={name:e.querySelector("#clientName").value,email:e.querySelector("#clientEmail").value,phone:e.querySelector("#clientPhone").value,dob:`${e.querySelector("#clientDobDay").value}/${e.querySelector("#clientDobMonth").value}`,notes:e.querySelector("#clientNotes").value,establishmentId:p.establishmentId};if(!a.name||!a.phone){g("Erro","Nome e Telefone são obrigatórios.","error");return}try{t?(await Vs(t,a),g("Sucesso","Cliente atualizado com sucesso!","success")):(await ma(a),g("Sucesso","Cliente cadastrado com sucesso!","success")),document.getElementById("genericModal").style.display="none",await At()}catch(o){g("Erro",`Não foi possível salvar: ${o.message}`,"error")}}async function Zn(){if(!F||!F.id)return;if(await M("Excluir Cliente",`Tem certeza que deseja excluir ${F.name}? Esta ação é irreversível.`))try{await Us(F.id),g("Sucesso","Cliente excluído.","success"),document.getElementById("genericModal").style.display="none",await At()}catch(t){g("Erro",`Não foi possível excluir: ${t.message}`,"error")}}function vt(e,t){const a=document.getElementById("clientsList");if(a)if(a.innerHTML="",document.getElementById("client-count").textContent=`${e.length} cliente${e.length!==1?"s":""} | Total: ${t}`,e.length>0){const o=_==="inactive",r=_==="birthdays";e.forEach(s=>{const n=document.createElement("div");n.className="client-card bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer",n.dataset.clientId=s.id;const i=s.loyaltyPoints||0,d=Ve.enabled?`${i} pts`:`R$ ${i.toFixed(2)}`;let l="";const c=`https://wa.me/55${s.phone?s.phone.replace(/\D/g,""):""}?text=`;if(o){const m=encodeURIComponent(On(s.name,aa));l=`
                    <a href="${c+m}" target="_blank" title="Enviar Mensagem de Recuperação (WhatsApp)" class="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full flex-shrink-0 ml-2 shadow-md">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                    </a>`}else if(r&&Un(s)){const b=encodeURIComponent(jn(s.name,aa));l=`
                        <a href="${c+b}" target="_blank" title="Enviar Parabéns por WhatsApp" class="text-white bg-green-500 hover:bg-green-600 p-2 rounded-full flex-shrink-0 ml-2 shadow-md">
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
            `,n.addEventListener("click",()=>sa(s)),a.appendChild(n)})}else a.innerHTML='<p class="col-span-full text-center text-gray-500">Nenhum cliente encontrado com os filtros aplicados.</p>'}function ht(e="",t="all"){const a=e.toLowerCase(),o=a.length>0;let r=0,s=90;const n=window.innerWidth<768;if(t==="birthdays"){const d=n?"mobileBirthMonthFilter":"birthMonthFilter",l=document.getElementById(d);l&&(r=parseInt(l.value,10))}else if(t==="inactive"){const d=n?"mobileInactiveDaysFilter":"inactiveDaysFilter",l=document.getElementById(d);l&&(s=parseInt(l.value,10))}let i=ee.filter(d=>!o||d.name.toLowerCase().includes(a)||(d.phone||"").includes(a));switch(t){case"birthdays":const d=new Date,l=d.getDate(),u=d.getMonth()+1;return i.filter(c=>{if(!c.dob)return!1;const m=c.dob.split("/");if(m.length!==2)return!1;const b=parseInt(m[0],10),f=parseInt(m[1],10);return r===99?b===l&&f===u:r===0?f>=1&&f<=12:f===r});case"inactive":return i.filter(c=>(c.lastAppointmentDaysAgo||Vn())>s);case"scheduled":return i.filter(c=>c.loyaltyPoints>50);case"credit":return i.filter(c=>(c.loyaltyPoints||0)>0);case"debit":return i.filter(c=>!1);case"package":return i.filter(c=>!1);case"all":default:return i}}async function Kn(e){const t=document.getElementById("birthMonthFilterContainer"),a=document.getElementById("mobileBirthMonthFilterContainer"),o=document.getElementById("inactiveDaysFilterContainer"),r=document.getElementById("mobileInactiveDaysFilterContainer");if(e==="birthdays"){if(t?.classList.remove("hidden"),a?.classList.remove("hidden"),o?.classList.add("hidden"),r?.classList.add("hidden"),_!=="birthdays"){const d=document.getElementById("birthMonthFilter");d&&(d.value=99);const l=document.getElementById("mobileBirthMonthFilter");l&&(l.value=99)}}else if(e==="inactive"){if(o?.classList.remove("hidden"),r?.classList.remove("hidden"),t?.classList.add("hidden"),a?.classList.add("hidden"),_!=="inactive"){const d=document.getElementById("inactiveDaysFilter");d&&(d.value=90);const l=document.getElementById("mobileInactiveDaysFilter");l&&(l.value=90)}}else t?.classList.add("hidden"),a?.classList.add("hidden"),o?.classList.add("hidden"),r?.classList.add("hidden");if(_===e&&e!=="birthdays"&&e!=="inactive")return;_=e,document.querySelectorAll(".client-filter-btn").forEach(d=>{d.classList.remove("bg-white","text-indigo-600","shadow"),d.classList.add("bg-gray-100","text-gray-600")}),document.querySelectorAll(`[data-filter-key="${e}"]`).forEach(d=>{d&&(d.classList.remove("bg-gray-100","text-gray-600"),d.classList.add("bg-white","text-indigo-600","shadow"))});const n=document.getElementById("clientSearchInput").value,i=ht(n,_);vt(i,ee.length)}async function At(){ta="list",Rt.innerHTML=`
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
                            ${Va()}
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
                            ${Ua()}
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
                            ${Va()}
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
                            ${Ua()}
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
    `;try{const[u,c]=await Promise.all([et(p.establishmentId),Ke(p.establishmentId)]);ee=u,Ve=c.loyaltyProgram||{enabled:!1},aa=c.name||"O Estabelecimento";const m=ht("",_);vt(m,ee.length)}catch{document.getElementById("clientsList").innerHTML='<p class="text-red-500 col-span-full text-center">Erro ao carregar dados dos clientes.</p>'}const e=document.getElementById("filter-sheet"),t=document.getElementById("filter-overlay"),a=document.getElementById("openFilterSheetBtn"),o=document.getElementById("closeFilterSheetBtn"),r=()=>{e.classList.add("show"),t.classList.remove("hidden")},s=()=>{e.classList.remove("show"),t.classList.add("hidden")};a&&a.addEventListener("click",r),o&&o.addEventListener("click",s),t&&t.addEventListener("click",s);const n=u=>{const c=u.target.closest(".client-filter-btn");c&&(Kn(c.dataset.filterKey),window.innerWidth<768&&s())},i=document.getElementById("desktop-filter-bar"),d=document.getElementById("mobile-filter-list");i&&i.addEventListener("click",n),d&&d.addEventListener("click",n);const l=u=>{const c=document.getElementById(u);c&&c.addEventListener("change",()=>{if(_==="birthdays"||_==="inactive"){const m=document.getElementById("clientSearchInput").value,b=ht(m,_);vt(b,ee.length)}})};l("birthMonthFilter"),l("mobileBirthMonthFilter"),l("inactiveDaysFilter"),l("mobileInactiveDaysFilter"),Rt.addEventListener("click",async u=>{const c=u.target.closest("[data-action]"),m=u.target.closest(".client-card");if(ta==="list"){if(c){const b=c.dataset.action;b==="new-client"?sa(null):b==="print-list"&&window.print()}else if(m){const b=m.dataset.clientId,f=ee.find(v=>v.id===b);f&&sa(f)}}}),Rt.addEventListener("input",u=>{if(u.target.id==="clientSearchInput"){const c=u.target.value,m=ht(c,_);vt(m,ee.length)}})}const Qe=()=>w("/api/financial/natures"),ei=e=>w("/api/financial/natures",{method:"POST",body:JSON.stringify(e)}),ti=e=>w(`/api/financial/natures/${e}`,{method:"DELETE"}),Ze=()=>w("/api/financial/cost-centers"),ai=e=>w("/api/financial/cost-centers",{method:"POST",body:JSON.stringify(e)}),oi=e=>w(`/api/financial/cost-centers/${e}`,{method:"DELETE"}),To=(e,t)=>w(`/api/financial/${e}`,{method:"POST",body:JSON.stringify(t)}),Mo=(e,t={})=>{let a=`/api/financial/${e}`;const o=new URLSearchParams;t.startDate&&o.append("startDate",t.startDate),t.endDate&&o.append("endDate",t.endDate),t.natureId&&o.append("natureId",t.natureId),t.costCenterId&&o.append("costCenterId",t.costCenterId);const r=o.toString();return r&&(a+=`?${r}`),w(a)},Do=(e,t,a)=>w(`/api/financial/${e}/${t}`,{method:"PUT",body:JSON.stringify(a)}),Po=(e,t)=>w(`/api/financial/${e}/${t}`,{method:"DELETE"}),Ao=(e,t,a)=>w(`/api/financial/${e}/${t}/status`,{method:"PATCH",body:JSON.stringify({status:"paid",paymentDate:a})}),si=e=>To("payables",e),ri=e=>Mo("payables",e),ni=(e,t)=>Do("payables",e,t),ii=e=>Po("payables",e),li=(e,t)=>Ao("payables",e,t),di=e=>To("receivables",e),ci=e=>Mo("receivables",e),ui=(e,t)=>Do("receivables",e,t),mi=e=>Po("receivables",e),pi=(e,t)=>Ao("receivables",e,t),gi=(e,t)=>w(`/api/financial/cash-flow?startDate=${e}&endDate=${t}`),bi=()=>w("/api/financial/today-summary"),be=document.getElementById("content"),Ht={monday:"Segunda",tuesday:"Terça",wednesday:"Quarta",thursday:"Quinta",friday:"Sexta",saturday:"Sábado",sunday:"Domingo"},fi={indigo:{name:"Padrão (Índigo)",main:"#4f46e5",light:"#e0e7ff",text:"#ffffff"},rose:{name:"Rosa",main:"#e11d48",light:"#ffe4e6",text:"#ffffff"},green:{name:"Verde",main:"#16a34a",light:"#d1fae5",text:"#ffffff"},sky:{name:"Azul Céu",main:"#0284c7",light:"#e0f2fe",text:"#ffffff"},amber:{name:"Âmbar",main:"#d97706",light:"#fef3c7",text:"#1f2937"}},qo=[{id:"personal-data",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",label:"Dados Gerais"},{id:"branding",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",label:"Identidade e Cores"},{id:"booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",label:"Agendamento Online"},{id:"working-hours",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Horário de Funcionamento"},{id:"loyalty",icon:"M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z",label:"Plano de Fidelidade"},{id:"financial",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z",label:"Integração Financeira"},{id:"change-password",icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",label:"Alterar senha"},{id:"change-email",icon:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",label:"Alterar E-mail de Acesso"},{id:"delete-account",icon:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m-7-10V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v3M4 7h16",label:"Excluir conta"}];let z=null;function _a(e,t=null){let a='<option value="">-- Selecione (Opcional) --</option>';const o=n=>{const i=new Map,d=[];return n&&(n.forEach(l=>i.set(l.id,{...l,children:[]})),i.forEach(l=>{l.parentId&&i.has(l.parentId)?i.get(l.parentId).children.push(l):d.push(l)})),d},r=(n,i="")=>{const d=n.id===t?"selected":"";a+=`<option value="${n.id}" ${d}>${i}${n.name}</option>`,n.children.forEach(l=>r(l,i+"— "))};return o(e).forEach(n=>r(n)),a}async function Ae(e,t){const a=t.target.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="A Salvar...");try{const o=z||await Ke(p.establishmentId),r=[],{ownerName:s,...n}=e;if(s&&s!==p.userName){const l=U.currentUser;l&&r.push(_o(l,{displayName:s}).then(()=>{p.userName=s}))}const i={...o,...n};r.push(fs(p.establishmentId,i)),await Promise.all(r),z=i,g("Sucesso","Definições salvas com sucesso!","success");const d=document.getElementById("panelEstablishmentName");n.name&&d&&(d.textContent=n.name,p.establishmentName=n.name)}catch(o){g("Erro",`Não foi possível salvar: ${o.message}`,"error")}finally{a&&(a.disabled=!1,a.textContent="Salvar")}}function vi(e,t){t.innerHTML=`
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
    `,t.querySelector("#personal-data-form").addEventListener("submit",a=>{a.preventDefault();const o={ownerName:t.querySelector("#ownerName").value,name:t.querySelector("#establishmentName").value,phone:t.querySelector("#establishmentPhone").value,document:t.querySelector("#establishmentCnpjCpf").value,email:t.querySelector("#establishmentEmail").value,address:t.querySelector("#establishmentAddress").value,website:t.querySelector("#establishmentWebsite").value};Ae(o,a)})}function hi(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-password-form").addEventListener("submit",async a=>{a.preventDefault();const o=t.querySelector("#newPassword").value,r=t.querySelector("#confirmPassword").value;if(o!==r){g("Erro","As senhas não coincidem.","error");return}const s=t.querySelector('button[form="change-password-form"]');s.disabled=!0,s.textContent="A Salvar...";try{const n=U.currentUser;if(n)await Uo(n,o),g("Sucesso","Senha alterada com sucesso!","success"),a.target.reset();else throw new Error("Nenhum usuário autenticado encontrado.")}catch(n){g("Erro",`Não foi possível alterar a senha: ${n.message}`,"error")}finally{s.disabled=!1,s.textContent="Salvar Nova Senha"}})}function yi(e,t){t.innerHTML=`
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
    `,t.querySelector("#change-email-form").addEventListener("submit",async a=>{a.preventDefault();const o=t.querySelector("#newEmail").value,r=t.querySelector("#currentPassword").value;if(!o||!r){g("Erro","Preencha todos os campos.","error");return}const s=t.querySelector('button[form="change-email-form"]');s.disabled=!0,s.textContent="A verificar...";try{const n=U.currentUser;if(!n)throw new Error("Usuário não autenticado.");const i=lo.credential(n.email,r);await co(n,i),s.textContent="A enviar link...",await Vo(n,o),s.textContent="A atualizar BD...",await hs(p.establishmentId,o),g("Sucesso","Link de verificação enviado! Por favor, verifique seu **novo e-mail** para confirmar a alteração.","success"),a.target.reset()}catch(n){let i="Não foi possível alterar o e-mail.";n.code==="auth/wrong-password"?i="A senha atual está incorreta.":n.code==="auth/email-already-in-use"?i="Este e-mail já está sendo usado por outra conta.":n.code==="auth/operation-not-allowed"?i="A troca de e-mail precisa ser habilitada no console do Firebase.":i=n.message,g("Erro",i,"error")}finally{s.disabled=!1,s.textContent="Salvar Novo E-mail"}})}function xi(e,t){t.innerHTML=`
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
    `,t.querySelector("#delete-account-form").addEventListener("submit",async a=>{a.preventDefault();const o=t.querySelector("#deletePasswordConfirmation").value,r=t.querySelector("#confirmDeleteCheckbox").checked;if(!o||!r){g("Erro","Por favor, confirme sua senha e marque a caixa de confirmação.","error");return}if(!confirm("Tem a certeza absoluta? Todos os dados serão perdidos para sempre."))return;const s=t.querySelector('button[type="submit"]');s.disabled=!0,s.textContent="A excluir...";try{const n=U.currentUser;if(!n)throw new Error("Usuário não autenticado.");const i=lo.credential(n.email,o);await co(n,i),await zo(n),g("Conta Excluída","Sua conta foi excluída com sucesso. Redirecionando...","success"),setTimeout(()=>{window.location.href="/index.html"},2e3)}catch(n){console.error(n);let i="Não foi possível excluir a conta.";n.code==="auth/wrong-password"?i="A senha informada está incorreta.":n.code==="auth/requires-recent-login"?i="Por segurança, faça login novamente e tente excluir a conta em seguida.":i=n.message,g("Erro",i,"error"),s.disabled=!1,s.textContent="Excluir Definitivamente"}})}function wi(e,t){t.innerHTML=`
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
    `,t.querySelector("#establishmentLogoBase64").value=e.logo||"",t.querySelector("#establishmentBackgroundImageBase64").value=e.backgroundImage||"",No(e.themeColor||"indigo",t),t.querySelector("#establishmentLogoButton").onclick=()=>t.querySelector("#establishmentLogoInput").click(),t.querySelector("#establishmentLogoInput").onchange=a=>{const o=a.target.files[0];if(o){const r=new FileReader;r.onload=s=>{t.querySelector("#establishmentLogoPreview").src=s.target.result,t.querySelector("#establishmentLogoBase64").value=s.target.result},r.readAsDataURL(o)}},t.querySelector("#establishmentBgButton").onclick=()=>t.querySelector("#establishmentBgInput").click(),t.querySelector("#establishmentBgInput").onchange=a=>{const o=a.target.files[0];if(o){const r=new FileReader;r.onload=s=>{t.querySelector("#establishmentBgPreview").src=s.target.result,t.querySelector("#establishmentBgPreview").classList.remove("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.add("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=s.target.result},r.readAsDataURL(o)}},t.querySelector("#establishmentBgRemoveBtn").onclick=()=>{t.querySelector("#establishmentBgPreview").src="",t.querySelector("#establishmentBgPreview").classList.add("hidden"),t.querySelector("#establishmentBgPlaceholder").classList.remove("hidden"),t.querySelector("#establishmentBackgroundImageBase64").value=""},t.querySelector("#branding-form").addEventListener("submit",a=>{a.preventDefault();const o={logo:t.querySelector("#establishmentLogoBase64").value,welcomeMessage:t.querySelector("#establishmentWelcomeMessage").value,backgroundImage:t.querySelector("#establishmentBackgroundImageBase64").value,primaryColor:t.querySelector("#establishmentPrimaryColorInput").value,textColor:t.querySelector("#establishmentTextColorInput").value,themeColor:t.querySelector("#establishmentThemeColor").value};Ae(o,a)})}function ki(e,t){const a=e.urlId||p.establishmentId,o="https://kairos-service-603994960586.southamerica-east1.run.app";let r=window.location.origin;(r.includes("localhost")||r.includes("capacitor://")||r.includes("127.0.0.1")||r.includes("192.168"))&&(r=o);const s=`${r}/agendar?id=${a}`,n=e.publicBookingEnabled||!1,i=n?"Agendamento Online ATIVO":"Agendamento Online INATIVO",d=n?"text-green-600":"text-red-600";t.innerHTML=`
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
    `,t.querySelector("#copyBookingLinkBtn").addEventListener("click",()=>{const l=t.querySelector("#publicBookingLink");if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(l.value).then(()=>{g("Sucesso","Link copiado para a área de transferência!","success")}).catch(u=>{g("Erro","Não foi possível copiar o link.","error")});else try{l.select(),document.execCommand("copy"),l.blur(),g("Sucesso","Link copiado para a área de transferência!","success")}catch{g("Erro","Não foi possível copiar o link. Por favor, copie manualmente.","error")}}),t.querySelector("#publicBookingToggle").addEventListener("change",async l=>{const u=l.target.checked,c=t.querySelector("#publicBookingStatusText");u?(c.textContent="Agendamento Online ATIVO",c.className="text-sm font-semibold text-green-600"):(c.textContent="Agendamento Online INATIVO",c.className="text-sm font-semibold text-red-600");try{l.target.disabled=!0,await vs(p.establishmentId,u),z.publicBookingEnabled=u,g("Sucesso",`Agendamento online ${u?"ativado":"desativado"}!`,"success")}catch(m){g("Erro",`Não foi possível alterar o status: ${m.message}`,"error"),l.target.checked=!u,u?(c.textContent="Agendamento Online ATIVO",c.className="text-sm font-semibold text-green-600"):(c.textContent="Agendamento Online INATIVO",c.className="text-sm font-semibold text-red-600")}finally{l.target.disabled=!1}}),Ci(e.slotInterval||30,t),t.querySelector("#booking-form").addEventListener("submit",l=>{l.preventDefault();const u={slotInterval:parseInt(t.querySelector("#establishmentSlotInterval").value,10)};Ae(u,l)})}function Ei(e,t){t.innerHTML=`
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
    `;const a=t.querySelector("#establishmentTimezone");if(e.timezone)a.value=e.timezone;else try{const s=Intl.DateTimeFormat().resolvedOptions().timeZone;Array.from(a.options).some(i=>i.value===s)?a.value=s:a.value="America/Sao_Paulo"}catch{a.value="America/Sao_Paulo"}const o=t.querySelector("#establishmentWorkingHoursContainer"),r=e.workingHours||{};Object.keys(Ht).forEach(s=>{const n=r[s]||{},i=Ht[s],d=n.active!==!1,l=document.createElement("div");l.className=`day-schedule-card p-4 rounded-lg ${d?"bg-gray-50":"bg-gray-100 disabled"}`,l.innerHTML=`
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
            </div>`,o.appendChild(l)}),o.addEventListener("change",s=>{const n=s.target.closest('.day-schedule-card input[type="checkbox"]');n&&n.closest(".day-schedule-card").classList.toggle("disabled",!n.checked)}),t.querySelector("#working-hours-form").addEventListener("submit",s=>{s.preventDefault();const n={};Object.keys(Ht).forEach(d=>{n[d]={active:t.querySelector(`#est-${d}-active`).checked,start:t.querySelector(`#est-${d}-start`).value,end:t.querySelector(`#est-${d}-end`).value,breakStart:t.querySelector(`#est-${d}-breakStart`).value,breakEnd:t.querySelector(`#est-${d}-breakEnd`).value}});const i=t.querySelector("#establishmentTimezone").value;Ae({workingHours:n,timezone:i},s)})}function Si(e,t){t.innerHTML=`
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
        `,n};(a.tiers||[]).forEach(s=>{o.appendChild(r(s))}),t.querySelector("#add-loyalty-tier").addEventListener("click",()=>{o.appendChild(r())}),o.addEventListener("click",s=>{const n=s.target.closest(".remove-loyalty-tier");n&&n.closest(".loyalty-tier-row").remove()}),t.querySelector("#loyalty-form").addEventListener("submit",s=>{s.preventDefault();const n=Array.from(t.querySelectorAll("#loyaltyTiersContainer .loyalty-tier-row")).map(d=>({points:parseInt(d.querySelector('input[data-field="points"]').value,10)||0,reward:d.querySelector('input[data-field="reward"]').value,discount:parseFloat(d.querySelector('input[data-field="discount"]').value)||0})),i={loyaltyProgram:{enabled:t.querySelector("#loyaltyEnabled").checked,pointsPerCurrency:parseFloat(t.querySelector("#loyaltyPointsPerCurrency").value)||1,tiers:n.filter(d=>d.points>0&&d.reward)}};Ae(i,s)})}async function $i(e,t){t.innerHTML=`
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
    `;try{const[a,o]=await Promise.all([Qe(),Ze()]),r=e.financialIntegration||{};t.querySelector("#financialNatureId").innerHTML=_a(a,r.defaultNaturezaId),t.querySelector("#financialCostCenterId").innerHTML=_a(o,r.defaultCentroDeCustoId)}catch{g("Erro","Não foi possível carregar os dados para a integração financeira.","error")}t.querySelector("#financial-form").addEventListener("submit",a=>{a.preventDefault();const o={financialIntegration:{defaultNaturezaId:t.querySelector("#financialNatureId").value||null,defaultCentroDeCustoId:t.querySelector("#financialCostCenterId").value||null}};Ae(o,a)})}function Ii(e,t){t.innerHTML=`
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-gray-800">${e}</h3>
            <p class="mt-4 text-gray-500">Esta secção ainda não foi implementada.</p>
        </div>
    `}function No(e="indigo",t){const a=t.querySelector("#color-palette-container"),o=t.querySelector("#establishmentThemeColor");!a||!o||(a.innerHTML="",Object.entries(fi).forEach(([r,s])=>{const n=r===e,i=document.createElement("div");i.className="w-24 text-center cursor-pointer",i.innerHTML=`
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${n?"border-blue-500":"border-transparent"} p-1">
                <div class="w-full h-full rounded-full" style="background-color: ${s.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${n?"text-blue-600":"text-gray-600"}">${s.name}</p>
        `,i.addEventListener("click",()=>{o.value=r,No(r,t)}),a.appendChild(i)}),o.value=e)}function Ci(e,t){const a=t.querySelector("#slotIntervalContainer"),o=t.querySelector("#establishmentSlotInterval");if(!a||!o)return;const r=[{label:"10 min",value:10},{label:"15 min",value:15},{label:"20 min",value:20},{label:"30 min",value:30},{label:"45 min",value:45},{label:"1 hora",value:60}];a.innerHTML=r.map(s=>{const n=s.value===e;return`<button type="button" data-value="${s.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors 
                           ${n?"bg-indigo-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}">
                       ${s.label}
                   </button>`}).join(""),o.value=e,a.querySelectorAll(".interval-btn").forEach(s=>{s.addEventListener("click",()=>{o.value=s.dataset.value,a.querySelectorAll(".interval-btn").forEach(n=>{n.classList.remove("bg-indigo-600","text-white"),n.classList.add("bg-gray-200","text-gray-700")}),s.classList.add("bg-indigo-600","text-white"),s.classList.remove("bg-gray-200","text-gray-700")})})}async function Li(e){const t=qo.find(o=>o.id===e);if(!t){console.error("Secção de definições não encontrada:",e);return}be.innerHTML=`
        <div class="bg-white p-4 shadow-md sticky top-0 z-10 md:relative">
            <button data-action="back-to-list" class="flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                Voltar
            </button>
        </div>
        
        <div id="settings-content-detail" class="p-4">
            <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
        </div>
    `,be.querySelector('button[data-action="back-to-list"]').addEventListener("click",o=>{o.preventDefault(),Fo()});const a=document.getElementById("settings-content-detail");switch(e){case"personal-data":vi(z,a);break;case"change-password":hi(z,a);break;case"change-email":yi(z,a);break;case"delete-account":xi(z,a);break;case"branding":wi(z,a);break;case"booking":ki(z,a);break;case"working-hours":Ei(z,a);break;case"loyalty":Si(z,a);break;case"financial":await $i(z,a);break;default:Ii(t?t.label:"Definições",a)}}async function Fo(){if(be.innerHTML=`
        <div class="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>
                Definições
            </h2>
        </div>
        <div class="flex justify-center items-center h-64"><div class="loader"></div></div>
    `,!z)try{z=await Ke(p.establishmentId)}catch{g("Erro Fatal","Não foi possível carregar os dados do estabelecimento.","error"),be.innerHTML='<p class="text-red-500">Erro ao carregar dados.</p>';return}const e=p.userName||U.currentUser.email,t=e?e.charAt(0).toUpperCase():"U";be.innerHTML=`
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
                 ${p.userName&&p.userName!==U.currentUser.email?`<p class="text-sm text-gray-500">${U.currentUser.email||"Não disponível"}</p>`:""}
                 
                 <p class="text-xs text-indigo-600 font-semibold mt-2">VER MEU PERFIL / MEUS BLOQUEIOS</p>
            </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <nav id="settings-menu-list" class="space-y-1">
                ${qo.map(o=>`
                    <button data-section="${o.id}" class="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold text-sm">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${o.icon}"></path></svg>
                        <span class="flex-1 text-left">${o.label}</span>
                        <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                `).join("")}
            </nav>
        </div>
    `,be.querySelector("#settings-menu-list").addEventListener("click",o=>{const r=o.target.closest("button[data-section]");r&&(o.preventDefault(),Li(r.dataset.section))});const a=be.querySelector('[data-action="go-to-my-profile"]');a&&a.addEventListener("click",o=>{o.preventDefault(),R("my-profile-section")})}const Ue=document.getElementById("content");async function Ie(e){const t=document.getElementById("blockagesList");if(t){t.innerHTML='<div class="loader mx-auto"></div>';try{const a=document.getElementById("filterStartDate")?.value,o=document.getElementById("filterEndDate")?.value,r=await Ct(p.establishmentId,a||new Date().toISOString().split("T")[0],o||new Date().toISOString().split("T")[0],e),s=document.getElementById("filterReason")?.value.toLowerCase(),n=s?r.filter(d=>d.reason&&d.reason.toLowerCase().includes(s)):r,i=n.reduce((d,l)=>{const u=l.reason||"Sem motivo";return d[u]||(d[u]=[]),d[u].push(l),d},{});if(t.innerHTML="",n.length===0){t.innerHTML='<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';return}Object.entries(i).forEach(([d,l])=>{const u=document.createElement("div");u.className="bg-gray-100 rounded-lg p-3 my-2 space-y-2";let c=`<div class="flex justify-between items-center pb-2 border-b border-gray-200">
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
                    </div>`;u.innerHTML+=y}),t.appendChild(u)})}catch(a){t.innerHTML=`<p class="text-center text-red-500">Erro: ${a.message}</p>`}}}async function Bi(e){e.preventDefault();const t=e.target,a=t.querySelector("#blockageProfId").value,o=t.querySelector("#blockageDate").value,r=t.querySelector("#blockageEndDate").value||o,s=t.querySelector("#blockageStartTime").value,n=t.querySelector("#blockageEndTime").value,i={establishmentId:p.establishmentId,professionalId:a,startTime:new Date(`${o}T${s}:00`).toISOString(),endTime:new Date(`${r}T${n}:00`).toISOString(),reason:t.querySelector("#blockageReason").value};try{await Lt(i),t.reset(),g("Sucesso","Bloqueio adicionado com sucesso!","success"),Ie(a)}catch(d){g("Erro",`Não foi possível criar o bloqueio: ${d.message}`,"error")}}async function Ti(e){e.preventDefault();const t=e.target,a=Array.from(t.querySelectorAll('input[name="batch-professionals"]:checked')).map(u=>u.value);if(a.length===0)return g("Atenção","Selecione pelo menos um profissional.","error");const o=t.querySelector("#batchBlockageDate").value,r=t.querySelector("#batchBlockageEndDate").value||o,s=t.querySelector("#batchBlockageStartTime").value,n=t.querySelector("#batchBlockageEndTime").value,i=t.querySelector("#batchBlockageReason").value,d=t.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="Aguarde...";const l=a.map(u=>{const c={establishmentId:p.establishmentId,professionalId:u,startTime:new Date(`${o}T${s}:00`).toISOString(),endTime:new Date(`${r}T${n}:00`).toISOString(),reason:i};return Lt(c)});try{await Promise.all(l),g("Sucesso",`${a.length} bloqueios foram criados com sucesso!`,"success"),t.reset(),t.querySelectorAll('input[name="batch-professionals"]:checked').forEach(c=>c.checked=!1);const u=document.getElementById("blockageProfId").value;u&&Ie(u)}catch(u){g("Erro",`Ocorreu um erro: ${u.message}`,"error")}finally{d.disabled=!1,d.textContent="Adicionar Bloqueio em Lote"}}function Mi(e){Ue.addEventListener("submit",t=>{t.target.id==="blockageForm"&&Bi(t),t.target.id==="batchBlockageForm"&&Ti(t)}),Ue.addEventListener("input",t=>{t.target.matches("#filterStartDate, #filterEndDate, #filterReason")&&Ie(e)}),Ue.addEventListener("click",async t=>{const a=t.target.closest("button[data-action]");if(!a)return;const o=a.dataset.action;if(o==="back-to-professionals")R("profissionais-section");else if(o==="delete-blockage"){if(await M("Apagar Bloqueio","Tem a certeza que deseja apagar este bloqueio?"))try{await ua(a.dataset.id),g("Sucesso","Bloqueio removido.","success"),Ie(e)}catch(s){g("Erro",`Não foi possível remover o bloqueio: ${s.message}`,"error")}}else if(o==="batch-delete-blockage"){const r=JSON.parse(a.dataset.ids);if(await M("Apagar Lote de Bloqueios",`Tem certeza que deseja apagar ${r.length} bloqueios de uma vez?`))try{await vo(r),g("Sucesso",`${r.length} bloqueios removidos.`,"success"),Ie(e)}catch(n){g("Erro",`Não foi possível apagar os bloqueios: ${n.message}`,"error")}}})}async function Di(e){const{professionalId:t,professionalName:a}=e;if(!t||!a){Ue.innerHTML='<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>';return}Ue.innerHTML=`
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
        </section>`,Mi(t),await Ie(t);const o=document.getElementById("batchProfSelectionContainer");try{const r=await G(p.establishmentId);o.innerHTML=r.map(s=>`
            <div class="flex items-center">
                <input id="prof-batch-${s.id}" value="${s.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${s.id}" class="ml-2 text-sm text-gray-700">${s.name}</label>
            </div>`).join("")}catch{o.innerHTML='<p class="text-red-500">Erro ao carregar profissionais.</p>'}}const Pi=e=>w(`/api/users/${e}`),Ai=e=>w("/api/users",{method:"POST",body:JSON.stringify(e)}),qi=(e,t)=>w(`/api/users/${e}`,{method:"PUT",body:JSON.stringify(t)}),Ni=e=>w(`/api/users/${e}`,{method:"DELETE"}),Fi=(e,t)=>w(`/api/users/${e}/password`,{method:"PUT",body:JSON.stringify({password:t})}),Ri=(e,t)=>w(`/api/users/${e}/status`,{method:"PATCH",body:JSON.stringify({status:t})}),me=document.getElementById("content"),Hi={"agenda-section":"Agenda","comandas-section":"Comandas","relatorios-section":"Relatórios","financial-section":"Financeiro","servicos-section":"Serviços","produtos-section":"Produtos","profissionais-section":"Profissionais","clientes-section":"Clientes","packages-section":"Pacotes","commissions-section":"Comissões","estabelecimento-section":"Configurações do Estabelecimento","users-section":"Usuários e Acessos"},ji={view:"Visualizar",create:"Criar",edit:"Editar"};let Ne=null,Fe=null;function Oi(e){const t=document.getElementById("usersListContainer");if(!t)return;const a=document.getElementById("showInactiveUsersToggle")?.checked;if(e.length===0){const o=a?"Nenhum usuário encontrado.":"Nenhum usuário ativo cadastrado.";t.innerHTML=`<p class="col-span-full text-center text-gray-500">${o}</p>`;return}e.sort((o,r)=>(o.status==="active"?-1:1)-(r.status==="active"?-1:1)),t.innerHTML=e.map(o=>{const r=JSON.stringify(o).replace(/'/g,"&apos;"),s=o.status==="active",n=p.professionals.find(u=>u.id===o.professionalId),i=n?n.name:"N/A",d=n?n.name.charAt(0):o.name.charAt(0),l=n?.photo||`https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(d)}`;return`
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
    `}).join("")}function yt(){const e=document.getElementById("showInactiveUsersToggle")?.checked;let t;e?t=p.users:t=p.users.filter(a=>a.status==="active"),Oi(t)}function zi(e={}){return Object.entries(Hi).map(([t,a])=>{const o=t==="agenda-section"||t==="comandas-section",r=e[t]?.view_all_prof===!0,s=Object.entries(ji).map(([i,d])=>`
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
    `}).join("")}async function Ja(e=null){document.getElementById("user-list-view").classList.add("hidden");const t=document.getElementById("user-form-view");t.classList.remove("hidden");let a=p.professionals;if(!a||a.length===0)try{a=await G(p.establishmentId),p.professionals=a}catch{g("Erro","Não foi possível carregar a lista de profissionais.","error")}const o=h=>a.find(y=>y.id===h),r=(h,y)=>{const $=o(h)?.photo,L=y.charAt(0).toUpperCase();return{photoSrc:$||`https://placehold.co/128x128/E2E8F0/4A5568?text=${L}`,initials:L,photoUrl:$||""}},s=e?.professionalId,n=e?.name||"Novo Usuário",i=r(s,n),d=o(s),l=h=>{let y='<option value="">-- Não Associado a um Profissional --</option>';return y+=a.map(S=>`<option value="${S.id}" ${S.id===h?"selected":""}>${S.name} (${S.specialty||"N/A"})</option>`).join(""),y},u=e!==null;t.querySelector("#userFormTitle").textContent=u?`Editar Usuário: ${e.name}`:"Novo Usuário";const c=t.querySelector("#userForm");c.innerHTML=`
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
                    ${zi(e?.permissions)}
                </div>
            </div>

            <div class="flex gap-4 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-3 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                <button type="submit" class="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar Alterações</button>
            </div>
        </div>
    `;const m=window.innerWidth<768,b=c.querySelector(".bg-white");if(m&&b){b.classList.remove("rounded-xl","shadow-2xl","sm:p-6");const h=c.closest("section");h&&(h.style.padding="0",h.style.margin="0"),b.classList.add("p-4")}const f=c.querySelector("#userProfessionalId"),v=c.querySelector("#userPhotoPreview"),k=c.querySelector("#profPhotoName");if(f.addEventListener("change",h=>{const y=h.target.value,S=o(y),$=S?S.name:"Selecione um profissional",L=r(y,n);v.src=L.photoSrc,k.textContent=$,c.querySelector("#professionalPhotoUrl").value=L.photoUrl}),c.addEventListener("submit",async h=>{h.preventDefault();const y=e?.email,S=c.querySelector("#userEmail").value,$={};c.querySelectorAll('input[type="checkbox"]').forEach(j=>{const T=j.dataset.module,P=j.dataset.permission;$[T]||($[T]={}),$[T][P]=j.checked});const L=c.querySelector("#userProfessionalId").value||null,B={name:c.querySelector("#userName").value,permissions:$,professionalId:L};try{u?(y!==S&&(B.email=S),await qi(e.id,B),g("Usuário atualizado com sucesso!","success")):(B.email=c.querySelector("#userEmail").value,B.password=c.querySelector("#userPassword").value,await Ai(B),g("Usuário criado com sucesso!","success")),St()}catch(j){g(`Erro: ${j.message}`,"error")}}),u){const h=c.querySelector("#password-change-container"),y=h.querySelector('[data-action="show-password-form"]'),S=h.querySelector("#password-form"),$=S.querySelector('[data-action="save-password"]'),L=S.querySelector('[data-action="cancel-password-change"]');y.addEventListener("click",()=>{y.classList.add("hidden"),S.classList.remove("hidden")}),L.addEventListener("click",()=>{y.classList.remove("hidden"),S.classList.add("hidden"),S.querySelector("#userNewPassword").value=""}),$.addEventListener("click",async()=>{const B=S.querySelector("#userNewPassword").value;if(!B||B.length<6){g("Senha inválida","A nova senha deve ter pelo menos 6 caracteres.","error");return}if(await M("Alterar Senha","Tem a certeza que deseja alterar a senha deste usuário?"))try{$.disabled=!0,$.textContent="Aguarde...",await Fi(e.id,B),g("Sucesso!","A senha do usuário foi alterada.","success"),y.classList.remove("hidden"),S.classList.add("hidden"),S.querySelector("#userNewPassword").value=""}catch(T){g("Erro",`Não foi possível alterar a senha: ${T.message}`,"error")}finally{$.disabled=!1,$.textContent="Salvar Nova Senha"}})}}async function Vi(){const e=document.getElementById("usersListContainer");e.innerHTML='<div class="loader col-span-full mx-auto"></div>';try{const[t,a]=await Promise.all([Pi(p.establishmentId),G(p.establishmentId)]);p.users=t,p.professionals=a,yt()}catch{g("Erro ao carregar usuários.","error"),e.innerHTML='<p class="col-span-full text-center text-red-500">Não foi possível carregar os usuários.</p>'}}async function St(){me.innerHTML=`
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
    `,Ne&&me.removeEventListener("click",Ne),Fe&&me.removeEventListener("change",Fe),Ne=async e=>{if(!document.getElementById("user-list-view")){me.removeEventListener("click",Ne);return}const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"new-user":Ja();break;case"edit-user":const o=JSON.parse(t.dataset.user.replace(/&apos;/g,"'"));Ja(o);break;case"back-to-list":St();break;case"delete-user":{e.stopPropagation();const r=t.dataset.userId;if(await M("Excluir Usuário","Tem certeza que deseja excluir este usuário? Esta ação é irreversível."))try{await Ni(r),g("Usuário excluído com sucesso!","success"),St()}catch(n){g(`Erro ao excluir: ${n.message}`,"error")}break}}},Fe=async e=>{if(!document.getElementById("user-list-view")){me.removeEventListener("change",Fe);return}const t=e.target.closest('input[data-action="toggle-user-status"]');if(e.target.id==="showInactiveUsersToggle")yt();else if(t){e.stopPropagation();const a=t.dataset.userId,o=t.checked?"active":"inactive";try{await Ri(a,o),g(`Usuário ${o==="active"?"ativado":"inativado"} com sucesso.`,"success");const r=p.users.findIndex(s=>s.id===a);r>-1&&(p.users[r].status=o,yt())}catch(r){g(`Erro ao atualizar status: ${r.message}`,"error"),t.checked=!t.checked,yt()}}},me.addEventListener("click",Ne),me.addEventListener("change",Fe),await Vi()}const Ui=document.getElementById("content");let Wa={},ra=null;function _i(){Object.values(Wa).forEach(e=>e?.destroy()),Wa={}}function Ji(e,t){const{jsPDF:a}=window.jspdf,o=new a({orientation:"landscape",unit:"px",format:"a4"}),r=document.getElementById("salesReportSummaryCards");if(o.setFontSize(18),o.text(e,o.internal.pageSize.getWidth()/2,40,{align:"center"}),r){const n=[["Receita Total",r.querySelector("#summary-revenue").textContent],["Vendas Totais",r.querySelector("#summary-transactions").textContent],["Ticket Médio",r.querySelector("#summary-avg-ticket").textContent]];o.autoTable({startY:60,head:[["Métrica","Valor"]],body:n,theme:"striped",headStyles:{fillColor:[79,70,229]}})}const s=o.lastAutoTable?o.lastAutoTable.finalY+20:60;o.text("Detalhes das Vendas",20,s),o.autoTable({html:`#${t}`,startY:s+10,theme:"grid",headStyles:{fillColor:[22,163,74]}}),o.save(`${e.replace(/[\s/]/g,"_").toLowerCase()}.pdf`)}function Ga(e){const t=document.getElementById("genericModal"),a=(e.payments||[]).map(o=>`
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
    `,t.style.display="flex"}function Wi(e){const{summary:t,transactions:a}=e;document.getElementById("summary-revenue").textContent=`R$ ${t.totalRevenue.toFixed(2)}`,document.getElementById("summary-transactions").textContent=t.totalTransactions,document.getElementById("summary-avg-ticket").textContent=`R$ ${t.averageTicket.toFixed(2)}`;const o=document.getElementById("paymentSummaryTableBody"),r=Object.entries(t.paymentMethodTotals).sort(([,i],[,d])=>d-i);o.innerHTML=r.map(([i,d])=>`
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
    `).join(""),s.querySelectorAll("tr").forEach(i=>{i.addEventListener("dblclick",()=>{const d=i.dataset.transactionIndex,l=ra.transactions[d];l&&Ga(l)})}),n.innerHTML=a.map((i,d)=>`
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
    `).join(""),n.querySelectorAll("div[data-transaction-index]").forEach(i=>{i.addEventListener("click",()=>{const d=i.dataset.transactionIndex,l=ra.transactions[d];l&&Ga(l)})})}async function Ya(){const e=document.getElementById("main-reports-view"),t=document.getElementById("reportStartDate"),a=document.getElementById("reportEndDate");if(!e||!t||!a)return;const o=t.value,r=a.value;if(!o||!r)return g("Atenção","Por favor, selecione as datas de início e fim.","error");e.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>';try{const s=document.getElementById("cashierSessionFilter").value,n=await Ps({establishmentId:p.establishmentId,startDate:o,endDate:r,cashierSessionId:s});ra=n,e.innerHTML=`
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
        `,Wi(n)}catch(s){g("Erro",`Não foi possível carregar o relatório: ${s.message}`,"error"),e.innerHTML=`<p class="p-8 text-center text-red-500">${s.message}</p>`}}async function Gi(){_i();const e=new Date().toISOString().split("T")[0],t=new Date;t.setDate(t.getDate()-30);const a=t.toISOString().split("T")[0];Ui.innerHTML=`
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
        </section>`,document.getElementById("generateReportBtn").addEventListener("click",Ya),document.getElementById("exportPdfBtn").addEventListener("click",()=>{const o=document.getElementById("reportStartDate").value,r=document.getElementById("reportEndDate").value,s=`Relatorio_Vendas_${o}_a_${r}`;Ji(s,"transactionsTable")});try{const o=await $r(),r=document.getElementById("cashierSessionFilter");o.forEach(s=>{const n=new Date(s.openTime).toLocaleString("pt-BR",{dateStyle:"short"}),i=s.closedByName||"N/A";r.innerHTML+=`<option value="${s.id}">${i} - ${n}</option>`})}catch{g("Erro","Não foi possível carregar o histórico de caixas para o filtro.","error")}await Ya()}const Yi=document.getElementById("content");let I={payables:[],receivables:[],natures:[],costCenters:[],currentFilter:"pending",startDate:new Date(new Date().getFullYear(),new Date().getMonth()-1,1).toISOString().split("T")[0],endDate:new Date().toISOString().split("T")[0],previousBalance:0,filterNaturezaId:"all",filterCostCenterId:"all",currentListView:"receivables"},jt=null,dt=null,ct=null;function ka(e){const t=new Map,a=[];return e&&(e.forEach(o=>t.set(o.id,{...o,children:[]})),t.forEach(o=>{o.parentId&&t.has(o.parentId)?t.get(o.parentId).children.push(o):a.push(o)})),a}function Ro(e,t,a){if(!t||t.length===0){e.innerHTML='<p class="text-center text-gray-500">Nenhum item criado.</p>';return}const o=(r,s=0)=>{const n="— ".repeat(s);return`
            <div style="margin-left: ${s*20}px;" class="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>${n}${r.name}</span>
                <button data-action="delete-${a}" data-id="${r.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
            </div>
            ${r.children.map(i=>o(i,s+1)).join("")}
        `};e.innerHTML=t.map(r=>o(r)).join("")}async function Xa(e){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const t=document.getElementById("genericModal"),a=e==="nature",o=`Gerir ${a?"Naturezas Financeiras":"Centros de Custo"}`,r=a?Qe:Ze,s=a?"natures":"costCenters";t.innerHTML=`
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
        </div>`,t.style.display="flex";const n=t.querySelector("#hierarchyList"),i=t.querySelector("#itemParent"),d=u=>{const c=ka(u);Ro(n,c,e),i.innerHTML='<option value="">-- Nível Principal --</option>';const m=(b,f="",v=0)=>{const k=v>0?"— ".repeat(v):"";i.innerHTML+=`<option value="${b.id}">${k}${b.name}</option>`,b.children.forEach(h=>m(h,f+"— "))};c.forEach(b=>m(b))},l=await r();I[s]=l,d(l),t.querySelector("#hierarchyForm").addEventListener("submit",async u=>{u.preventDefault();const c=t.querySelector("#itemName").value,m=i.value,b=a?ei:ai;try{await b({name:c,parentId:m||null});const f=await r();I[s]=f,d(f),t.querySelector("#hierarchyForm").reset(),await ve()}catch(f){g("Erro",`Não foi possível criar: ${f.message}`,"error")}})}function Xi(e){const t=document.getElementById("cashFlowChart");if(!t)return;const a=t.getContext("2d");jt&&jt.destroy();const o=e.payables.map(r=>r*-1);jt=new Chart(a,{type:"bar",data:{labels:e.labels,datasets:[{label:"Receitas",data:e.receivables,backgroundColor:"rgba(74, 222, 128, 0.6)",borderColor:"rgba(34, 197, 94, 1)",borderWidth:1,yAxisID:"y"},{label:"Despesas",data:o,backgroundColor:"rgba(248, 113, 113, 0.6)",borderColor:"rgba(239, 68, 68, 1)",borderWidth:1,yAxisID:"y"},{label:"Saldo Acumulado",data:e.expectedBalance,type:"line",borderColor:"rgba(59, 130, 246, 1)",backgroundColor:"rgba(59, 130, 246, 0.2)",borderWidth:3,pointRadius:4,pointBackgroundColor:"rgba(59, 130, 246, 1)",fill:!0,tension:.1,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{stacked:!0},y:{type:"linear",display:!0,position:"left",stacked:!0,title:{display:!0,text:"Movimentações (R$)"}},y1:{type:"linear",display:!0,position:"right",title:{display:!0,text:"Saldo Acumulado (R$)"},grid:{drawOnChartArea:!1}}},plugins:{tooltip:{callbacks:{label:function(r){let s=r.dataset.label||"";if(s&&(s+=": "),r.parsed.y!==null){const n=Math.abs(r.parsed.y);s+=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(n)}return s}}}}}})}async function Qa(){const e=document.getElementById("cash-flow-chart-container"),t=document.getElementById("cashFlowStartDate").value,a=document.getElementById("cashFlowEndDate").value;if(!t||!a){g("Atenção","Por favor, selecione as datas de início e fim.","error");return}e.innerHTML='<div class="loader mx-auto my-10"></div>';try{const o=await gi(t,a);e.innerHTML='<canvas id="cashFlowChart"></canvas>',Xi(o)}catch(o){e.innerHTML=`<p class="text-red-500 text-center">Erro ao carregar dados do gráfico: ${o.message}</p>`}}function Za(){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const e=document.getElementById("genericModal"),t=new Date,a=new Date(t.getFullYear(),t.getMonth(),1).toISOString().split("T")[0],o=t.toISOString().split("T")[0];e.innerHTML=`
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
    `,e.style.display="flex",e.querySelector("#generateCashFlowBtn").addEventListener("click",Qa),Qa()}function Qi(){const e=document.getElementById("genericModal"),t=I.payables.filter(c=>c.status==="pending").reduce((c,m)=>c+m.amount,0),a=I.receivables.filter(c=>c.status==="pending").reduce((c,m)=>c+m.amount,0),o=a-t,r=I.payables.filter(c=>c.status==="paid").reduce((c,m)=>c+m.amount,0),s=I.receivables.filter(c=>c.status==="paid").reduce((c,m)=>c+m.amount,0),n=s-r,i=I.previousBalance||0,d=i+n,l=c=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(c),u=c=>c>=0?"text-green-600":"text-red-600";e.innerHTML=`
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
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 ${u(o)==="text-green-600"?"border-green-600":"border-red-600"}">
                            <p class="text-gray-700 text-sm font-medium">Saldo Previsto</p>
                            <p class="text-2xl font-bold ${u(o)}">${l(o)}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `,e.style.display="flex"}function Zi(){const e=document.getElementById("genericModal");e.innerHTML=`
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
    `,e.style.display="flex"}function ut(e,t="all"){let a='<option value="all">Todos</option>';const o=n=>{const i=new Map,d=[];return n&&(n.forEach(l=>i.set(l.id,{...l,children:[]})),i.forEach(l=>{l.parentId&&i.has(l.parentId)?i.get(l.parentId).children.push(l):d.push(l)})),d},r=(n,i=0)=>{const d=i>0?"— ".repeat(i):"",l=n.id===t?"selected":"";a+=`<option value="${n.id}" ${l}>${d}${n.name}</option>`,n.children.forEach(u=>r(u,i+1))};return o(e).forEach(n=>r(n)),a}async function ve(){const e=document.getElementById("financial-content"),t=document.getElementById("filterStartDate")?.value,a=document.getElementById("filterEndDate")?.value,o=document.getElementById("filterNaturezaId")?.value,r=document.getElementById("filterCostCenterId")?.value;if(!t||!a){try{const[i,d]=await Promise.all([Qe(),Ze()]);I={...I,natures:i,costCenters:d},document.getElementById("filterNaturezaId")&&(document.getElementById("filterNaturezaId").innerHTML=ut(I.natures)),document.getElementById("filterCostCenterId")&&(document.getElementById("filterCostCenterId").innerHTML=ut(I.costCenters))}catch(i){g("Erro",`Não foi possível carregar os dados base: ${i.message}`,"error")}na(),eo();return}const s=document.getElementById("payables-list"),n=document.getElementById("receivables-list");s&&(s.innerHTML='<div class="loader mx-auto"></div>'),n&&(n.innerHTML='<div class="loader mx-auto"></div>');try{const i={startDate:t,endDate:a};o&&o!=="all"&&(i.natureId=o),r&&r!=="all"&&(i.costCenterId=r);const[d,l,u,c]=await Promise.all([ri(i),ci(i),Qe(),Ze()]),m=l.previousBalance-d.previousBalance;I={...I,payables:d.entries,receivables:l.entries,natures:u,costCenters:c,previousBalance:m,filterNaturezaId:o,filterCostCenterId:r},document.getElementById("filterNaturezaId")&&(document.getElementById("filterNaturezaId").innerHTML=ut(I.natures,I.filterNaturezaId)),document.getElementById("filterCostCenterId")&&(document.getElementById("filterCostCenterId").innerHTML=ut(I.costCenters,I.filterCostCenterId)),na(),eo()}catch(i){g("Erro",`Não foi possível carregar os dados: ${i.message}`,"error"),e&&(e.innerHTML='<p class="text-red-500 text-center">Falha ao carregar dados.</p>')}}async function Ki(e,t,a=null){e.preventDefault();const o=e.target,r=o.querySelector('[name="status"]').checked,s=o.querySelector('[name="paymentDate"]').value,n=parseFloat(o.querySelector('[name="amount"]').value),i=parseInt(o.querySelector('[name="installments"]')?.value,10)||1;if(isNaN(n)){g("Erro de Validação","O valor inserido é inválido.","error");return}if(r&&!s){g("Erro de Validação","Por favor, forneça a data de pagamento para um lançamento pago.","error");return}const d={description:o.querySelector('[name="description"]').value,amount:n,dueDate:o.querySelector('[name="dueDate"]').value,naturezaId:o.querySelector('[name="naturezaId"]').value||null,centroDeCustoId:o.querySelector('[name="centroDeCustoId"]').value||null,notes:o.querySelector('[name="notes"]').value,status:r?"paid":"pending",paymentDate:r?s:null,installments:a?1:i};try{a?(await(t==="payable"?ni(a,d):ui(a,d)),g("Sucesso","Lançamento atualizado!","success")):(await(t==="payable"?si(d):di(d)),g("Sucesso","Lançamento adicionado!","success")),document.getElementById("genericModal").style.display="none",await ve()}catch(l){g("Erro",`Não foi possível salvar: ${l.message}`,"error")}}async function el(e,t){if(await M("Confirmar Exclusão","Tem certeza? Esta ação é irreversível."))try{await(e==="payable"?ii(t):mi(t)),g("Sucesso","Lançamento excluído!","success"),await ve()}catch(o){g("Erro",`Falha ao excluir: ${o.message}`,"error")}}async function tl(e,t){const a=new Date().toISOString().split("T")[0];try{await(e==="payable"?li(t,a):pi(t,a)),g("Sucesso","Lançamento atualizado!","success"),await ve()}catch(o){g("Erro",`Falha ao atualizar status: ${o.message}`,"error")}}function Ka(e){const t=I.currentFilter;return t==="all"?e:e.filter(a=>a.status===t)}function na(){const e=document.getElementById("payables-list"),t=document.getElementById("receivables-list");if(!e||!t)return;const a=new Map(I.natures.map(i=>[i.id,i.name])),o=new Map(I.costCenters.map(i=>[i.id,i.name])),r=Ka(I.payables),s=Ka(I.receivables),n=(i,d)=>{const l=i.status==="paid",u=JSON.stringify(i).replace(/'/g,"&apos;"),c=i.naturezaId?a.get(i.naturezaId):"N/A",m=i.centroDeCustoId?o.get(i.centroDeCustoId):"N/A";let b=d==="payable"?"text-red-600":"text-green-600";const f=l?"bg-gray-200 text-gray-600":d==="payable"?"bg-red-100 text-red-700":"bg-yellow-100 text-yellow-700",v=l?"Finalizado":"Pendente";return l&&(b="text-gray-500"),`
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
        </div>`};e.innerHTML=r.map(i=>n(i,"payable")).join("")||'<p class="text-center text-gray-500 py-4">Nenhuma conta a pagar.</p>',t.innerHTML=s.map(i=>n(i,"receivable")).join("")||'<p class="text-center text-gray-500 py-4">Nenhuma conta a receber.</p>'}function eo(){const e=I.payables.filter(r=>r.status==="pending").reduce((r,s)=>r+s.amount,0),t=I.receivables.filter(r=>r.status==="pending").reduce((r,s)=>r+s.amount,0),a=t-e;document.getElementById("summary-pending-receivables").textContent=`R$ ${t.toFixed(2)}`,document.getElementById("summary-pending-payables").textContent=`R$ ${e.toFixed(2)}`,document.getElementById("summary-pending-balance").textContent=`R$ ${a.toFixed(2)}`;const o=document.getElementById("summary-pending-balance");o&&(o.className=`text-2xl font-bold ${a>=0?"text-green-600":"text-red-600"}`)}function Ot(e,t=null){document.getElementById("fab-menu")?.classList.add("hidden"),document.getElementById("main-fab-btn")?.classList.remove("rotate-45");const a=document.getElementById("genericModal"),o=`${t?"Editar":"Nova"} ${e==="payable"?"Despesa":"Receita"}`,r=e==="payable"?"bg-red-600 hover:bg-red-700":"bg-green-600 hover:bg-green-700",s=m=>{let b='<option value="">-- Selecione (Opcional) --</option>';const f=ka(m),v=(k,h="",y=0)=>{const S=y>0?"— ".repeat(y):"";b+=`<option value="${k.id}">${S}${k.name}</option>`,k.children.forEach($=>v($,h+"— "))};return f.forEach(k=>v(k)),b},n=s(I.natures),i=s(I.costCenters),d=t?"":`
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
        </div>`,a.style.display="flex",t&&(a.querySelector('[name="naturezaId"]').value=t.naturezaId||"",a.querySelector('[name="centroDeCustoId"]').value=t.centroDeCustoId||"");const l=a.querySelector("#status"),u=a.querySelector("#payment-date-container"),c=a.querySelector('[name="paymentDate"]');t?.status==="paid"&&(l.checked=!0,u.classList.remove("hidden"),c.value=t.paymentDate||new Date().toISOString().split("T")[0]),l.addEventListener("change",()=>{u.classList.toggle("hidden",!l.checked),c.required=l.checked}),a.querySelector("#financial-form").addEventListener("submit",m=>Ki(m,e,t?.id))}async function al(){const e=new Date,a=new Date(e.getFullYear(),e.getMonth()-1,1).toISOString().split("T")[0],o=e.toISOString().split("T")[0];I.startDate=a,I.endDate=o,I.currentFilter="pending",I.filterNaturezaId="all",I.filterCostCenterId="all",Yi.innerHTML=`
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
    `;const r=document.getElementById("main-fab-btn"),s=document.getElementById("fab-menu");if(r&&s){r.addEventListener("click",v=>{v.stopPropagation(),s.classList.toggle("hidden"),r.classList.toggle("rotate-45")});const m=s.querySelector('button[data-action="open-modal"][data-type="receivable"]'),b=s.querySelector('button[data-action="open-modal"][data-type="payable"]'),f=s.querySelector('button[data-action="open-cash-flow-modal"]');m&&m.addEventListener("click",v=>{v.stopPropagation(),Ot("receivable")}),b&&b.addEventListener("click",v=>{v.stopPropagation(),Ot("payable")}),f&&f.addEventListener("click",v=>{v.stopPropagation(),Za()})}dt&&document.body.removeEventListener("click",dt),ct&&document.getElementById("genericModal").removeEventListener("click",ct);const n=()=>{const m=document.getElementById("filterStartDate"),b=document.getElementById("filterEndDate"),f=document.getElementById("filterNaturezaId"),v=document.getElementById("filterCostCenterId");I.startDate=m.value,I.endDate=b.value,I.filterNaturezaId=f.value,I.filterCostCenterId=v.value;const k=document.getElementById("advanced-filters");k&&k.classList.contains("hidden")===!1&&window.innerWidth<768&&k.classList.add("hidden"),ve()},i=m=>{const b=m.target.closest("[data-status-filter]");if(!b)return;const f=b.dataset.statusFilter;I.currentFilter=f,document.querySelectorAll("[data-status-filter]").forEach(v=>{v.classList.remove("bg-blue-100","text-blue-800"),v.classList.add("bg-gray-100","text-gray-600")}),b.classList.remove("bg-gray-100","text-gray-600"),b.classList.add("bg-blue-100","text-blue-800"),na()},d=m=>{const b=document.getElementById("payables-container"),f=document.getElementById("receivables-container"),v=document.getElementById("btn-payables-view"),k=document.getElementById("btn-receivables-view");window.innerWidth>=1024&&I.currentListView===m||(m==="payables"?(b.classList.remove("hidden"),f.classList.add("hidden"),v&&(v.classList.remove("bg-gray-200"),v.classList.add("bg-red-100","border","border-red-500")),k&&(k.classList.remove("bg-green-100","border","border-green-500"),k.classList.add("bg-gray-200"))):(b.classList.add("hidden"),f.classList.remove("hidden"),v&&(v.classList.remove("bg-red-100","border","border-red-500"),v.classList.add("bg-gray-200")),k&&(k.classList.remove("bg-gray-200"),k.classList.add("bg-green-100","border","border-green-500"))),I.currentListView=m)};document.getElementById("applyDateFilterBtn").addEventListener("click",n),document.getElementById("filterNaturezaId").addEventListener("change",()=>{I.filterNaturezaId=document.getElementById("filterNaturezaId").value}),document.getElementById("filterCostCenterId").addEventListener("change",()=>{I.filterCostCenterId=document.getElementById("filterCostCenterId").value}),document.querySelectorAll("[data-status-filter]").forEach(m=>{m.addEventListener("click",i)}),dt=m=>{const b=m.target.closest("button[data-action]");if(!b)return;const{action:f,type:v,id:k}=b.dataset;f==="edit"?Ot(v,JSON.parse(b.dataset.item.replace(/&apos;/g,"'"))):f==="delete"?el(v,k):f==="mark-as-paid"?tl(v,k):f==="manage-natures"?Xa("nature"):f==="manage-cost-centers"?Xa("cost-center"):f==="open-cash-flow-modal"?Za():f==="toggle-filters"?document.getElementById("advanced-filters")?.classList.toggle("hidden"):f==="open-indicators-modal"?Qi():f==="open-settings-modal"?Zi():f==="toggle-list-view"&&d(b.dataset.list)},ct=m=>{const b=m.target.closest('button[data-action^="delete-"]');if(b){const f=b.dataset.action.split("-")[1];l(f,b.dataset.id)}},document.body.addEventListener("click",dt),document.getElementById("genericModal").addEventListener("click",ct);async function l(m,b){const f=m==="nature",v=f?ti:oi,k=f?Qe:Ze,h=f?"natures":"costCenters",y=document.getElementById("hierarchyList");if(await M("Apagar Item","Tem a certeza? Apagar um item principal também apagará os seus sub-itens."))try{await v(b);const $=await k();I[h]=$,Ro(y,ka($),m),await ve()}catch($){g("Erro",`Não foi possível apagar: ${$.message}`,"error")}}const u=()=>{const m=window.innerWidth<1024,b=document.getElementById("payables-container"),f=document.getElementById("receivables-container"),v=document.getElementById("list-toggle-buttons");b&&f&&(b.classList.remove("hidden"),f.classList.remove("hidden"),m?(b.classList.remove("lg:col-span-1"),f.classList.remove("lg:col-span-1"),v?.classList.remove("hidden"),d(I.currentListView)):(b.classList.add("lg:col-span-1"),f.classList.add("lg:col-span-1"),v?.classList.add("hidden"),b.classList.remove("hidden"),f.classList.remove("hidden")))};u(),window.addEventListener("resize",u);const c=document.querySelector(`[data-status-filter="${I.currentFilter}"]`);c&&(document.querySelectorAll("[data-status-filter]").forEach(m=>{m.classList.remove("bg-blue-100","text-blue-800"),m.classList.add("bg-gray-100","text-gray-600")}),c.classList.remove("bg-gray-100","text-gray-600"),c.classList.add("bg-blue-100","text-blue-800"));try{const m=await bi(),b=document.getElementById("summary-today-payables");b&&(b.textContent=`R$ ${m.totalPayables.toFixed(2)}`);const f=document.getElementById("summary-today-receivables");f&&(f.textContent=`R$ ${m.totalReceivables.toFixed(2)}`)}catch{g("Erro","Não foi possível carregar o resumo do dia.","error")}await ve()}const ol=e=>w("/api/commissions/calculate",{method:"POST",body:JSON.stringify(e)}),sl=e=>w("/api/commissions/save",{method:"POST",body:JSON.stringify(e)}),rl=(e={})=>{const t=new URLSearchParams(e).toString(),a=`/api/commissions/history${t?"?"+t:""}`;return w(a)},nl=e=>w(`/api/commissions/report/${e}`,{method:"DELETE"}),Ce=document.getElementById("content");let _e=[],Ho="",mt=null,Se={};function il(e){const{jsPDF:t}=window.jspdf,a=new t;a.setFontSize(18),a.text(`Recibo de Comissão - ${e.professionalName}`,105,20,null,null,"center"),a.setFontSize(12),a.text(`Período: ${e.period}`,105,30,null,null,"center"),a.autoTable({startY:40,head:[["Descrição","Valor (R$)"]],body:[["Total Comissionável",`R$ ${e.summary.totalCommissionableValue.toFixed(2)}`],["Total de Itens",e.summary.totalItems]],theme:"striped"});const o=a.lastAutoTable.finalY+20;a.setFontSize(14),a.setFont(void 0,"bold"),a.text("Valor Total da Comissão:",14,o),a.text(`R$ ${e.summary.totalCommission.toFixed(2)}`,190,o,null,null,"right");const r=o+80;a.line(40,r,170,r),a.setFontSize(10),a.setFont(void 0,"normal"),a.text(e.professionalName,105,r+10,null,null,"center"),a.save(`recibo_comissao_${e.professionalName}_${e.period.replace(/\//g,"-")}.pdf`)}function ll(){const e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1).toISOString().split("T")[0],a=e.toISOString().split("T")[0],r=`
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
    `,{modalElement:s}=H({title:"✨ Novo Cálculo de Comissões",contentHTML:r,maxWidth:"max-w-xl"}),n=s.querySelector("#calculation-form"),i=s.querySelector("#calc-professionals-all"),d=s.querySelectorAll(".professional-checkbox");i.addEventListener("change",l=>{d.forEach(u=>{u.checked=l.target.checked})}),d.forEach(l=>{l.addEventListener("change",()=>{l.checked?Array.from(d).every(c=>c.checked)&&(i.checked=!0):i.checked=!1})}),n.addEventListener("submit",l=>{l.preventDefault();const u=Array.from(d).filter(m=>m.checked).map(m=>m.value);if(u.length===0){g("Atenção","Selecione pelo menos um profissional para o cálculo.","error");return}cl({professionalIds:u});const c=s.querySelector("[data-close-modal]");c?c.click():s.style.display="none"})}async function dl(e){if(await M("Excluir Relatório","Tem a certeza que deseja excluir permanentemente este relatório de comissão? Esta ação não pode ser desfeita."))try{await nl(e),g("Sucesso!","Relatório de comissão excluído.","success"),xt()}catch(a){g("Erro",`Não foi possível excluir: ${a.message}`,"error")}}async function cl(e){const{professionalIds:t}=e,a=document.getElementById("calc-start-date")?.value,o=document.getElementById("calc-end-date")?.value,r={services:document.getElementById("calc-type-services")?.checked,products:document.getElementById("calc-type-products")?.checked,packages:document.getElementById("calc-type-packages")?.checked};if(!a||!o){g("Erro","As datas não foram capturadas corretamente.","error");return}R("commissions-section",{view:"results",isLoading:!0});try{const s=await ol({professionalIds:t,startDate:a,endDate:o,calculationTypes:r});_e=s;const n=`${new Date(a+"T00:00:00").toLocaleDateString("pt-BR")} a ${new Date(o+"T00:00:00").toLocaleDateString("pt-BR")}`;Ho=n,pl(s,n)}catch(s){g("Erro",`Não foi possível calcular: ${s.message}`,"error"),R("commissions-section",{view:"history"})}}async function ul(){if(_e.length===0){g("Erro","Não há resultados para salvar.","error");return}const e=Ho;if(await M("Salvar Relatórios",`Tem a certeza que deseja salvar ${_e.length} relatório(s) de comissão para o período de ${e}?`))try{const a=_e.map(o=>sl({professionalId:o.professionalId,professionalName:o.professionalName,period:e,reportData:o}));await Promise.all(a),g("Sucesso!","Relatórios de comissão salvos.","success"),R("commissions-section",{view:"history"})}catch(a){g("Erro",`Não foi possível salvar: ${a.message}`,"error")}}async function xt(){const e=document.getElementById("commissionHistory");if(!e)return;const t=document.getElementById("filter-professional")?.value||"",a=document.getElementById("filter-month")?.value||"";Se={},t&&t!=="all"&&(Se.professionalId=t),a&&(Se.period=a),e.innerHTML='<div class="loader mx-auto my-8"></div>';try{const o=await rl(Se);if(o.length===0){e.innerHTML='<p class="text-center text-gray-500 py-8">Nenhum relatório de comissão salvo encontrado para os filtros.</p>';return}e.innerHTML=`
            <div class="space-y-3">
                ${o.map(r=>`
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
            </div>`}catch(o){e.innerHTML=`<p class="text-red-500 text-center">Erro ao carregar histórico: ${o.message}</p>`}}function ml(){if(!p.professionals){Ce.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A carregar dados...</p></div>';return}const e=p.professionals.map(s=>`<option value="${s.id}">${s.name}</option>`).join(""),t=[],a=new Date;for(let s=0;s<12;s++){const n=new Date(a.getFullYear(),a.getMonth()-s,1),i=n.getFullYear(),l=(n.getMonth()+1).toString().padStart(2,"0"),u=`${i}-${l}`,c=n.toLocaleDateString("pt-BR",{month:"long",year:"numeric"});t.push(`<option value="${u}">${c}</option>`)}const o=Se.professionalId||"all",r=Se.period||"";Ce.innerHTML=`
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
    `,document.getElementById("filter-professional").value=o,document.getElementById("filter-month").value=r,document.getElementById("filter-professional").addEventListener("change",xt),document.getElementById("filter-month").addEventListener("change",xt),xt()}function pl(e,t){_e=e;const a=e.reduce((o,r)=>o+r.summary.totalCommission,0);Ce.innerHTML=`
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
                ${e.map(o=>`
                    <details class="bg-gray-50 p-3 rounded-lg border">
                        <summary class="flex justify-between items-center cursor-pointer">
                            <p class="font-bold text-gray-800">${o.professionalName}</p>
                            <p class="text-lg font-bold text-green-600">R$ ${o.summary.totalCommission.toFixed(2)}</p>
                        </summary>
                        <div class="mt-4 pt-4 border-t overflow-x-auto">
                            <table class="min-w-full text-xs"> 
                                <thead class="bg-gray-100"><tr>
                                    <th class="px-2 py-1 text-left">Data</th><th class="px-2 py-1 text-left">Item</th>
                                    <th class="px-2 py-1 text-right">Valor</th><th class="px-2 py-1 text-right">Taxa</th><th class="px-2 py-1 text-right">Comissão</th>
                                </tr></thead>
                                <tbody class="divide-y">
                                ${o.items.map(r=>`
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
    `}async function gl(e={}){const{view:t="history",isLoading:a=!1}=e;if(mt&&Ce.removeEventListener("click",mt),mt=o=>{const r=o.target.closest("button[data-action]");if(!r)return;switch(r.dataset.action){case"open-calculator":ll();break;case"back-to-history":R("commissions-section",{view:"history"});break;case"save-reports":ul();break;case"generate-receipt":const n=JSON.parse(r.dataset.report.replace(/&apos;/g,"'"));il(n);break;case"delete-report":const i=r.dataset.id;dl(i);break}},Ce.addEventListener("click",mt),a){Ce.innerHTML='<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A calcular comissões...</p></div>';return}if(!p.professionals||p.professionals.length===0)try{p.professionals=await G(p.establishmentId)}catch{g("Erro","Não foi possível carregar a lista de profissionais.","error"),p.professionals=[]}(t==="history"||t==="main")&&ml()}const zt=document.getElementById("content");let he={allPackages:[],catalogForModal:{services:[],products:[]}},pt=null,$e=null;function bl(e=6){let t="";for(let a=0;a<e;a++)t+=`
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
        `;return t}function fl(){const e=document.getElementById("packagesListContainer");if(e){if(he.allPackages.length===0){e.innerHTML=`
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
        `}).join("")}}function to(){const e=document.getElementById("genericModal");e.style.display="none",$e&&e.removeEventListener("click",$e)}async function ao(e=null){const t=document.getElementById("genericModal"),a=!!e,o=e?JSON.parse(JSON.stringify(e.items||[])):[],r=`
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
    `;t.innerHTML=r,t.style.display="flex";const s=t.querySelector("#package-items-list"),n=(d,l)=>{const u=l.querySelector("#originalPrice"),c=d.reduce((m,b)=>m+b.price*b.quantity,0);u&&(u.textContent=`R$ ${c.toFixed(2)}`)},i=d=>{d.length===0?s.innerHTML='<p class="text-center text-gray-500 p-4">Nenhum item adicionado.</p>':s.innerHTML=d.map((l,u)=>{const c=l.type==="service",m=c?"Serviço":"Produto",b=c?"bg-indigo-100 text-indigo-800":"bg-green-100 text-green-800";return`
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
            `}).join(""),n(d,t)};i(o),s.addEventListener("change",d=>{if(d.target.classList.contains("quantity-input")){const l=parseInt(d.target.dataset.index,10),u=parseInt(d.target.value,10);u>0&&o[l]&&(o[l].quantity=u,i(o))}}),s.addEventListener("click",d=>{if(d.target.classList.contains("remove-item-btn")){const l=parseInt(d.target.dataset.index,10);o.splice(l,1),i(o)}}),t.querySelector("#add-item-to-package-btn").onclick=()=>vl(d=>{const l=o.find(u=>u.id===d.id&&u.type===d.type);l?l.quantity++:o.push({...d,quantity:1}),i(o)}),$e&&t.removeEventListener("click",$e),$e=async d=>{const l=d.target.closest("button[data-action]");if(!l)return;const u=l.dataset.action;if(d.stopPropagation(),u==="close-modal"&&to(),u==="save-package"){const c=l,m={id:document.getElementById("packageId").value||null,name:document.getElementById("packageName").value,description:document.getElementById("packageDescription").value,status:document.getElementById("packageStatus").value,items:o,originalPrice:o.reduce((b,f)=>b+f.price*f.quantity,0),price:parseFloat(document.getElementById("finalPrice").value),commissionRate:parseFloat(document.getElementById("commissionRate").value)||0,validityDays:parseInt(document.getElementById("validityDays").value,10)||null};if(!m.name||!m.price){g("Erro","Nome do Pacote e Preço Final são obrigatórios.","error");return}if(m.items.length===0){g("Erro","Adicione pelo menos um item ao pacote.","error");return}c.disabled=!0,c.textContent="A salvar...";try{a?await Lr(m.id,m):(delete m.id,await Cr(m)),g("Sucesso!",`Pacote ${a?"atualizado":"criado"} com sucesso.`,"success"),to(),await Ea()}catch(b){g("Erro",`Não foi possível salvar o pacote: ${b.message}`,"error"),c.disabled=!1,c.textContent="Salvar Pacote"}}},t.addEventListener("click",$e)}function vl(e){let t="";const a=document.createElement("div");a.id="item-selection-modal",a.className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[110]";const o={service:'<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',product:'<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'},r=d=>{const l=t.toLowerCase(),u=he.catalogForModal.services.filter(f=>f.name.toLowerCase().includes(l)),c=he.catalogForModal.products.filter(f=>f.name.toLowerCase().includes(l)),m=u.map(f=>`
            <button data-action="select-item" data-item-type="service" data-item-id="${f.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${o.service}</div>
                <span class="flex-grow text-left min-w-0 truncate">${f.name}</span>
                <span class="font-semibold flex-shrink-0">R$ ${f.price.toFixed(2)}</span>
            </button>
        `).join("")||'<p class="text-xs text-gray-400 text-center p-4">Nenhum serviço encontrado.</p>',b=c.map(f=>`
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
    `,document.body.appendChild(a);const s=a.querySelector("#item-selection-list"),n=a.querySelector("#item-search-input"),i=()=>{a.remove()};r(s),n.addEventListener("input",()=>{t=n.value,r(s)}),a.addEventListener("click",d=>{const l=d.target.closest('[data-action="select-item"]'),u=d.target.closest('[data-action="close-selection-modal"]');if(l){const{itemType:c,itemId:m}=l.dataset,f=(he.catalogForModal[c+"s"]||[]).find(v=>v.id===m);f&&(e({...f,type:c}),i())}else(u||d.target===a)&&i()})}async function Ea(){zt.innerHTML=`
        <section id="packages-page" class="p-4 sm:p-6">
             <div class="sticky top-0 z-10 bg-gray-100 sm:bg-transparent pt-3 pb-4 mb-6 -mx-4 -mt-4 sm:mx-0 sm:mt-0 sm:bg-transparent sm:pt-0 sm:pb-0 sm:static">
                <div class="flex justify-between items-center px-4 sm:px-0">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                </div>
            </div>
            
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20">
                ${bl()}
            </div>
            
            <button data-action="new-package" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>
    `,pt&&zt.removeEventListener("click",pt),pt=e=>{if(e.target.closest('[data-action-stop-propagation="true"]')){e.stopPropagation();const o=e.target.closest('[data-action="delete-package"]');if(o){const r=o.dataset.id;M("Excluir Pacote","Tem a certeza que deseja excluir este pacote? Esta ação é irreversível.").then(async s=>{if(s)try{await Br(r),g("Sucesso!","Pacote excluído.","success"),await Ea()}catch(n){g("Erro",`Não foi possível excluir: ${n.message}`,"error")}})}return}const t=e.target.closest('[data-action="new-package"], [data-action="edit-package"]');if(!t)return;const a=t.dataset.action;if(a==="new-package")ao(null);else if(a==="edit-package"){const o=JSON.parse(t.dataset.package);ao(o)}},zt.addEventListener("click",pt);try{const[e,t,a]=await Promise.all([Eo(p.establishmentId),Pe(p.establishmentId),Tt(p.establishmentId)]);he.allPackages=e,he.catalogForModal={services:t.filter(o=>o.active),products:a},fl()}catch{document.getElementById("packagesListContainer").innerHTML='<p class="text-red-500 col-span-full">Erro ao carregar pacotes.</p>'}}const hl=document.getElementById("content");let yl=null;async function xl(){hl.innerHTML=`
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
                        <p class="text-md text-gray-600">${U.currentUser.email||"E-mail não disponível"}</p>
                    </div>
                </div>
            </div>

            <div class="md:col-span-2">
                 <div id="professional-agenda-block" class="p-4 md:p-6 bg-white rounded-lg shadow-md space-y-6">
                    <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
                </div>
            </div>
        </div>
    `,await wl()}async function wl(){const e=document.getElementById("professional-agenda-block");e.innerHTML="";try{const t=p.userProfessionalId;if(t){const a=await ys(t);yl=a,a.photo&&(document.getElementById("user-profile-avatar").src=a.photo),e.innerHTML=`
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
            `,kl(a.id),document.getElementById("my-blocks-filter").addEventListener("change",r=>$t(a.id,r.target.value)),$t(a.id,"future")}else e.innerHTML=`
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `}catch(t){console.error("Erro ao carregar seção de profissional:",t),e.innerHTML=`
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${t.message}</p>
            </div>
        `}}function kl(e){const t=document.getElementById("block-schedule-form");t.addEventListener("submit",async a=>{a.preventDefault();const o=t.querySelector("#blockDate").value,r=t.querySelector("#blockStartTime").value,s=t.querySelector("#blockEndTime").value,n=t.querySelector("#blockReason").value;if(!o||!r||!s){g("Erro","Por favor, preencha a data e os horários de início e fim.","error");return}if(r>=s){g("Erro","A hora de início deve ser anterior à hora de fim.","error");return}const i=new Date(`${o}T${r}:00`),d=new Date(`${o}T${s}:00`),l=t.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="A bloquear...";try{await Lt({establishmentId:p.establishmentId,professionalId:e,reason:n||"Bloqueado (Meu Perfil)",startTime:i.toISOString(),endTime:d.toISOString()}),g("Sucesso","Agenda bloqueada com sucesso!","success"),t.reset();const u=document.getElementById("my-blocks-filter").value;$t(e,u)}catch(u){console.error("Erro ao bloquear agenda:",u),g("Erro",`Não foi possível bloquear a agenda: ${u.message}`,"error")}finally{l.disabled=!1,l.textContent="Bloquear Agenda"}})}async function $t(e,t="future"){const a=document.getElementById("my-blocks-list");a.innerHTML='<p class="text-gray-500">A carregar bloqueios...</p>';try{const o=new Date;let r,s;t==="history"?(s=new Date,r=new Date,r.setFullYear(r.getFullYear()-1)):(r=new Date,s=new Date,s.setFullYear(s.getFullYear()+1));let i=(await Ct(p.establishmentId,r.toISOString(),s.toISOString(),e)).map(d=>({...d,startTime:new Date(d.startTime),endTime:new Date(d.endTime)}));t==="history"?i=i.filter(d=>d.endTime<o).sort((d,l)=>l.startTime-d.startTime):i=i.filter(d=>d.endTime>=o).sort((d,l)=>d.startTime-l.startTime),i.length>0?(a.innerHTML=i.map(d=>{const l=d.startTime.toLocaleDateString("pt-BR"),u=`${d.startTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})} - ${d.endTime.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`;return`
                    <div class="flex items-center justify-between p-3 ${d.endTime<new Date?"bg-gray-100 opacity-75":"bg-white border border-gray-200"} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${l} das ${u}</p>
                            <p class="text-sm text-gray-600">${d.reason||"Sem motivo"}</p>
                        </div>
                        <button data-block-id="${d.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `}).join(""),a.querySelectorAll(".remove-block-btn").forEach(d=>{d.addEventListener("click",async l=>{const u=l.currentTarget.dataset.blockId;if(confirm("Tem certeza que deseja remover este bloqueio?"))try{await ua(u),g("Sucesso","Bloqueio removido.","success"),$t(e,t)}catch(c){console.error("Erro ao remover bloqueio:",c),g("Erro",`Não foi possível remover o bloqueio: ${c.message}`,"error")}})})):a.innerHTML=`<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${t==="history"?"no histórico recente":"futuro agendado"}.</p>`}catch(o){console.error("Erro ao carregar bloqueios:",o),a.innerHTML=`<p class="text-red-500">Erro ao carregar bloqueios: ${o.message}</p>`}}const oo=document.getElementById("loadingScreen"),Vt=document.getElementById("dashboardContent"),Ut=document.getElementById("content"),so=document.getElementById("notificationBell"),_t=document.getElementById("notificationBadge"),gt=document.getElementById("notificationPanel"),ro=document.getElementById("notificationList"),Jt=document.getElementById("profileMenuButton"),Y=document.getElementById("profileDropdown"),El=document.getElementById("profileName"),Sl=document.getElementById("profileEmail"),$l=document.getElementById("logoutButton"),Il=document.getElementById("cancellationHistoryBtn"),no=document.getElementById("myProfileLink"),io={indigo:{main:"#4f46e5",light:"#e0e7ff",text:"white",hover:"#4338ca"},rose:{main:"#e11d48",light:"#ffe4e6",text:"white",hover:"#be123c"},green:{main:"#16a34a",light:"#d1fae5",text:"white",hover:"#15803d"},sky:{main:"#0284c7",light:"#e0f2fe",text:"white",hover:"#0369a1"},amber:{main:"#d97706",light:"#fef3c7",text:"#1f2937",hover:"#b45309"}};let Je=null,We=[];const Cl={"agenda-section":wo,"comandas-section":ga,"relatorios-section":Zt,"servicos-section":nn,"produtos-section":wn,"suppliers-section":Bn,"profissionais-section":Et,"clientes-section":At,"estabelecimento-section":Fo,"ausencias-section":Di,"users-section":St,"sales-report-section":Gi,"financial-section":al,"commissions-section":gl,"packages-section":Ea,"my-profile-section":xl};function Ll(e){const t=io[e]||io.indigo,a=document.getElementById("dynamic-theme-styles"),r=(n=>{const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);return i?`${parseInt(i[1],16)}, ${parseInt(i[2],16)}, ${parseInt(i[3],16)}`:null})(t.main),s=e==="amber"?"#1f2937":"white";a.innerHTML=`
        .sidebar-link.active { 
            background-color: ${t.main}; 
            color: ${s}; 
        }
        .sidebar-link:not(.active):hover { 
            background-color: rgba(${r}, 0.2);
        }
    `}function ia(){const e=We.filter(t=>!t.read).length;if(e>0?(_t.textContent=e,_t.classList.remove("hidden")):_t.classList.add("hidden"),We.length===0){ro.innerHTML='<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';return}ro.innerHTML=We.map(t=>`
    <div class="notification-item ${t.read?"":"unread"}">
    <p class="font-semibold">${t.title}</p>
    <p class="text-sm text-gray-600">${t.message}</p>
    <p class="text-xs text-gray-400 mt-1">${t.time}</p>
    </div>
    `).join("")}function Bl(e){Je&&Je();const t=De(X,"establishments",e,"notifications"),a=mo(t,Xo("timestamp",">=",new Date),po("timestamp","desc"));Je=Qo(a,o=>{o.docChanges().forEach(r=>{if(r.type==="added"){const s=r.doc.data();We.unshift({title:s.title,message:s.message,time:s.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),read:!1}),g(s.title,s.message,"info",!0),ia();const n=document.querySelector(".sidebar-link.active");n&&n.dataset.target==="agenda-section"&&(s.type==="cancellation"||s.type==="new_appointment")&&(console.log("Atualizando agenda em tempo real..."),wo())}})},o=>{console.error("Erro no listener de notificações em tempo real:",o),g("Erro de Conexão","Não foi possível receber atualizações em tempo real. Verifique as regras de segurança do Firestore.","error")})}function R(e,t={}){const a=e.replace("-section","");if(e!=="my-profile-section"){const r=p.enabledModules?.[a]!==!1,s=p.userPermissions===null||p.userPermissions[e]?.view===!0;if(!r||!s){Ut.innerHTML='<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>',document.querySelectorAll(".sidebar-link").forEach(n=>n.classList.remove("active"));return}}const o=Cl[e];o?(document.querySelectorAll(".sidebar-link").forEach(r=>{r.classList.toggle("active",r.getAttribute("data-target")===e)}),e==="my-profile-section"&&document.querySelectorAll(".sidebar-link").forEach(r=>r.classList.remove("active")),Ut.innerHTML="",o(t)):(Ut.innerHTML=`<div class="p-8 text-center"><h2 class="text-2xl font-bold">Página em Construção</h2><p class="text-gray-600">O módulo para "${e}" ainda não foi implementado.</p></div>`,console.warn(`Nenhum carregador de página definido para: ${e}`))}async function Tl(e){const t=document.getElementById("kpi-appointments-wrapper"),a=document.getElementById("kpi-financial-wrapper"),o=document.getElementById("kpi-today-appointments"),r=document.getElementById("kpi-today-revenue"),s=e===null||e["agenda-section"]?.view===!0,n=e===null||e["financial-section"]?.view===!0;if(s&&t&&t.classList.remove("hidden"),n&&a&&a.classList.remove("hidden"),!(!s&&!n))try{const i=await Fs();s&&o&&(o.textContent=i.todayAppointments.toString()),n&&r&&(r.textContent=`R$ ${i.todayRevenue.toFixed(2).replace(".",",")}`)}catch(i){console.error("Erro ao carregar KPIs do cabeçalho:",i),s&&o&&(o.textContent="Erro"),n&&r&&(r.textContent="Erro")}}async function Ml(e){try{wt.getPlatform()==="android"&&(await se.createChannel({id:"default",name:"Notificações Gerais",description:"Alertas de agendamentos e avisos",importance:5,visibility:1,vibration:!0}),console.log("Canal de notificação Android criado com sucesso."));let t=await se.checkPermissions();if(t.receive==="prompt"&&(t=await se.requestPermissions()),t.receive!=="granted"){console.warn("Permissão de notificação push foi negada pelo utilizador.");return}await se.register(),se.addListener("registration",async a=>{console.log("Push Token gerado:",a.value);try{const o=It(X,"users",e);await go(o,{fcmToken:a.value}),console.log("Token FCM salvo no perfil do utilizador.")}catch(o){console.error("Erro ao salvar token FCM:",o)}}),se.addListener("registrationError",a=>{console.error("Erro no registo de push notifications:",a)}),se.addListener("pushNotificationReceived",a=>{console.log("Notificação Push recebida:",a),g(a.title,a.body,"info",!0)}),se.addListener("pushNotificationActionPerformed",a=>{console.log("Ação na notificação push:",a),R("agenda-section")})}catch(t){console.log("Push Notifications não suportado/inicializado:",t)}}function Dl(){cs(),so.addEventListener("click",e=>{e.stopPropagation(),gt.classList.toggle("hidden"),gt.classList.contains("hidden")||(We.forEach(t=>t.read=!0),ia())}),Il.addEventListener("click",()=>{us()}),Jt.addEventListener("click",e=>{e.stopPropagation(),Y.classList.toggle("active"),Y.classList.contains("active")?Y.classList.remove("hidden"):setTimeout(()=>Y.classList.add("hidden"),200)}),no&&no.addEventListener("click",e=>{e.preventDefault(),R("my-profile-section"),Y.classList.remove("active"),Y.classList.add("hidden")}),document.addEventListener("click",e=>{!gt.contains(e.target)&&e.target!==so&&gt.classList.add("hidden"),!Y.contains(e.target)&&e.target!==Jt&&Y.classList.contains("active")&&(Y.classList.remove("active"),setTimeout(()=>Y.classList.add("hidden"),200))}),Jo(U,async e=>{if(e)try{const a=(await e.getIdTokenResult(!0)).claims;if((a.role==="owner"||a.role==="employee")&&a.establishmentId){const o=await Ke(a.establishmentId);p.enabledModules=o.modules,Ll(o.themeColor);let r=null,s=e.displayName,n=null;if(a.role==="employee"||a.role==="owner"){const l=It(X,"users",e.uid),u=await Yo(l);if(u.exists()){const c=u.data();r=a.role==="employee"?c.permissions||{}:null,s=c.name||s,n=c.professionalId||null}else if(a.role==="employee")throw new Error("Dados de permissão do funcionário não encontrados.")}p.userProfessionalId=n,Ml(e.uid);const i=s||e.email;Ko(a.establishmentId,o.name,r),Jt.textContent=i.charAt(0).toUpperCase(),El.textContent=i,Sl.textContent=e.email;const d=()=>{Je&&Je(),Sa(U).then(()=>window.location.href="/login.html")};$l.addEventListener("click",l=>{l.preventDefault(),d()}),bs(R,r,p.enabledModules),Tl(r),Bl(a.establishmentId),ia(),oo.style.display="none",Vt.style.display="flex",R("agenda-section")}else throw new Error("Utilizador não tem permissão de 'owner' ou 'employee' ou 'establishmentId'.")}catch(t){console.error("Erro crítico na inicialização do painel:",t),oo.style.display="none",Vt.innerHTML=`
                    <div class="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
                        <h2 class="text-2xl font-bold text-red-600 mb-4">Erro de Acesso</h2>
                        <p class="text-gray-700 text-center mb-6">Não foi possível carregar os seus dados ou permissões. Isto pode acontecer se a sua conta foi desativada ou está configurada incorretamente.</p>
                        <p class="text-sm text-gray-500 mb-6">Detalhe do erro: ${t.message}</p>
                        <button id="errorLogoutButton" class="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700">Sair e Tentar Novamente</button>
                    </div>
                `,Vt.style.display="flex",document.getElementById("errorLogoutButton").addEventListener("click",()=>{Sa(U).then(()=>window.location.href="/login.html")})}else window.location.href="/login.html"})}Dl();
